{\rtf1\ansi\ansicpg1252\deff0\deflang2057{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1507;}\viewkind4\uc1\pard\f0\fs20 <pre>\par
<code><font  size=3 face="Courier New"><font color="#000000">                 \par
\par
<i>/**\par
* This program is copyright Skutter Online, a division of Skutter Industries.\par
* We grant you a licence for personal, private and non-commercial use only.\par
* Please Contact Developer for further information.\par
\par
* This program is distributed in the hope that it will be useful,\par
* No warranties implied or not are not given with this software.  User agrees to use software at their own risk.\par
*/\par
\par
// ==UserScript==\par
// @name        Farmafia\par
// @description Accept Farmville and Mafia Wars gifts from software users news feed.\par
// @namespace   MafiaWars\par
// @include     http://www.facebook.com/*\par
// @exclude     http://apps.facebook.com/*\par
// @exclude     http://www.facebook.com/extern/*\par
// @exclude     http://www.facebook.com/connect/*\par
// @exclude     http://www.facebook.com/plugins/*\par
// @exclude     http://www.facebook.com/login.php*\par
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*\par
// @version     0.1\par
// @author      Skutter\par
// ==/UserScript==\par
\par
</i><b>var </b>aMissionRetry    = <b>new Array</b>();\par
    aMissionRetry[0] = <b>new Array</b>();\par
    aMissionRetry[1] = <b>new Array</b>();\par
\par
<b>var </b>gvar = \{\};\par
\par
<b>var </b>spamItems = \{\par
    item1:  \{<b>text</b>: <font color="#800080">'+2 Mafia Members'</font>,        giftID: <font color="#800080">'5323_2'</font>\},\par
    item2:  \{<b>text</b>: <font color="#800080">'2x mastery boost'</font>,        giftID: <font color="#800080">'2x_mastery_boost'</font>\},\par
    item3:  \{<b>text</b>: <font color="#800080">'Join Mission Crew'</font>,       giftID: <font color="#800080">'3000_Mission'</font>\},\par
    item4:  \{<b>text</b>: <font color="#800080">'Mystery Bag/Bonus'</font>,       giftID: <font color="#800080">'527_Mystery'</font>\},\par
    item5:  \{<b>text</b>: <font color="#800080">'Blue Mystery Bag'</font>,        giftID: <font color="#800080">'527_Blue'</font>\},\par
    item6:  \{<b>text</b>: <font color="#800080">'Red Mystery Bag'</font>,         giftID: <font color="#800080">'736_Red'</font>\},\par
    item7:  \{<b>text</b>: <font color="#800080">'Mystery Shipment'</font>,        giftID: <font color="#800080">'2645_Mystery'</font>\},\par
    item8:  \{<b>text</b>: <font color="#800080">'Special Parts'</font>,           giftID: <font color="#800080">'2319_Special'</font>\},\par
    item9:  \{<b>text</b>: <font color="#800080">'Exotic Animal Feed'</font>,      giftID: <font color="#800080">'4604_Exotic'</font>\},\par
    item10: \{<b>text</b>: <font color="#800080">'Satellite Phone'</font>,         giftID: <font color="#800080">'satellite_phone'</font>\},\par
    item11: \{<b>text</b>: <font color="#800080">'Blackmail Photos'</font>,        giftID: <font color="#800080">'65_Set'</font>\},\par
    item12: \{<b>text</b>: <font color="#800080">'Claymore'</font>,                giftID: <font color="#800080">'264_Claymore'</font>\},\par
    item13: \{<b>text</b>: <font color="#800080">'Aquarium'</font>,                giftID: <font color="#800080">'4605_Aquarium'</font>\},\par
    item14: \{<b>text</b>: <font color="#800080">'Big Cage'</font>,                giftID: <font color="#800080">'4606_Big'</font>\},\par
    item15: \{<b>text</b>: <font color="#800080">'Bird Cage'</font>,               giftID: <font color="#800080">'4607_Bird'</font>\},\par
    item16: \{<b>text</b>: <font color="#800080">'Feeding Trough'</font>,          giftID: <font color="#800080">'4608_Feeding'</font>\},\par
    item17: \{<b>text</b>: <font color="#800080">'Terrarium'</font>,               giftID: <font color="#800080">'4609_Terrarium'</font>\},\par
    item18: \{<b>text</b>: <font color="#800080">'Italian Hardwood'</font>,        giftID: <font color="#800080">'2600_Italian'</font>\},\par
    item19: \{<b>text</b>: <font color="#800080">'Marble Slab'</font>,             giftID: <font color="#800080">'2601_Marble'</font>\},\par
  <i>//item20: \{text: 'Stone Column',            giftID: '2602_Stone'\},\par
  //item21: \{text: 'Set of Terracotta',       giftID: '2603_Set'\},\par
    </i>item22: \{<b>text</b>: <font color="#800080">'Set of Hidden Charges'</font>,   giftID: <font color="#800080">'2610_Set'</font>\},\par
    item23: \{<b>text</b>: <font color="#800080">'Cooked Book'</font>,             giftID: <font color="#800080">'2614_Cooked'</font>\},\par
    item24: \{<b>text</b>: <font color="#800080">'Contruction Worker'</font>,      giftID: <font color="#800080">'2678_Construction'</font>\},\par
    item25: \{<b>text</b>: <font color="#800080">'Brazil Crew'</font>,             giftID: <font color="#800080">'city_crew'</font>\},\par
    item26: \{<b>text</b>: <font color="#800080">'Brazil Cash'</font>,             giftID: <font color="#800080">'1754_'</font>\},\par
    item27: \{<b>text</b>: <font color="#800080">'Gas Can'</font>,                 giftID: <font color="#800080">'2683_'</font>\},\par
    item28: \{<b>text</b>: <font color="#800080">'Button Camera'</font>,           giftID: <font color="#800080">'2681_'</font>\},\par
    item29: \{<b>text</b>: <font color="#800080">'Local Informant'</font>,         giftID: <font color="#800080">'2684_'</font>\},\par
    item30: \{<b>text</b>: <font color="#800080">'Radio Phone'</font>,             giftID: <font color="#800080">'2680_Radio'</font>\},\par
    item31: \{<b>text</b>: <font color="#800080">'Satchel Carge'</font>,           giftID: <font color="#800080">'2682_Satchel'</font>\},\par
    item32: \{<b>text</b>: <font color="#800080">'Secret Stash Help'</font>,       giftID: <font color="#800080">'3004_Stash'</font>\},\par
    item33: \{<b>text</b>: <font color="#800080">'Shotgun Blast'</font>,           giftID: <font color="#800080">'2598_Shotgun'</font>\},\par
  <i>//item34: \{text: 'Hollow Point',            giftID: '32_Hollow'\},\par
  //item35: \{text: 'A19 Riot Shield',         giftID: '35_A19'\},\par
  //item36: \{text: 'Absinthe Shot',           giftID: '87_Absinthe'\},\par
  //item37: \{text: 'Jukebox',                 giftID: '88_Jukebox'\},\par
    </i>item38: \{<b>text</b>: <font color="#800080">'Mystery Boost'</font>,           giftID: <font color="#800080">'1_mystery_boost1'</font>\},\par
    item39: \{<b>text</b>: <font color="#800080">'Rob Squad'</font>,               giftID: <font color="#800080">'98_Rob'</font>\},\par
    item40: \{<b>text</b>: <font color="#800080">'Gold Mystery Bag'</font>,        giftID: <font color="#800080">'1105_Gold'</font>\},\par
    item41: \{<b>text</b>: <font color="#800080">'Life Saver'</font>,              giftID: <font color="#800080">'8026_Life'</font>\},\par
  <i>//item42: \{text: 'Blunderbuss',             giftID: '298_Blunderbuss'\},\par
  //item50: \{text: 'Engine',                  giftID: '1724_Engine'\},\par
  //item51: \{text: 'Ammunition',              giftID: '1723_Ammunition'\},\par
  //item52: \{text: 'Raw Meat',                giftID: '1939_Raw'\},\par
  //item53: \{text: 'Carnaval Mask',           giftID: 'brazil_beta_event'\},\par
  //item54: \{text: 'False Identity',          giftID: '2503_False'\},\par
  //item55: \{text: 'Whetstone',               giftID: '7051_Whetstone'\},\par
  //item56: \{text: 'Camoflauge',              giftID: '7041_Camoflauge'\},\par
  //item57: \{text: 'Lasso',                   giftID: '7046_Lasso'\},\par
  //item70: \{text: 'Forger\\'s Glove',         giftID: '2363_Forgers'\},\par
  //item71: \{text: 'Lightning Defense',       giftID: '99_Lightning'\},\par
  //item72: \{text: 'Protection Money',        giftID: '100_Protection'\},\par
  //item73: \{text: 'Coffin',                  giftID: '5318_Coffin'\},\par
  //item74: \{text: 'Time Capsule',            giftID: '4610_Time'\},\par
  //item75: \{text: 'Hollow Warrior',          giftID: '2675_Hollow'\},\par
  //item76: \{text: 'Ferry Pass',              giftID: '5632_Ferry'\},\par
  //item77: \{text: 'Falling Skies Technical', giftID: '2511_Falling'\},\par
  //item78: \{text: 'Broken Arm',              giftID: '2686_Broken'\},\par
  //item79: \{text: 'Broken Tooth',            giftID: '2687_Broken'\},\par
  //item80: \{text: 'Broken Bose',             giftID: '2688_Broken'\},\par
  //item81: \{text: 'Endangered Animal',       giftID: '3511_Endangered'\},\par
  //item82: \{text: 'Contraband',              giftID: '3516_Contraband'\},\par
  //item83: \{text: 'Weapons Cache',           giftID: '3513_Weapons'\},\par
  //item84: \{text: 'Blank CD Spindle',        giftID: '6012_Blank'\},\par
  //item85: \{text: 'LCD Monitor',             giftID: '6013_LCD'\},\par
  //item86: \{text: 'Box of Computer Parts',   giftID: '6014_Box'\},\par
  //item87: \{text: 'Harmless Spider',         giftID: '2505_Harmless'\},\par
  //item88: \{text: 'I\\'ll be Back',           giftID: '7021_Ill'\},\par
  //item89: \{text: 'Jungle Strike',           giftID: '7022_Jungle'\},\par
  //item90: \{text: 'Magneto\\'s Magnetism',    giftID: '85_Magnetos'\},\par
  //item91: \{text: 'Frost\\'s Diamond Form',   giftID: '84_Frosts'\},\par
  //item92: \{text: 'American Dream',          giftID: '95_American'\},\par
  //item93: \{text: 'Flag Bearer',             giftID: '96_Flag'\},\par
  //item94: \{text: 'Fireworks',               giftID: '97_Fireworks'\},\par
    </i>item95: \{<b>text</b>: <font color="#800080">'Stamina Pack'</font>,            giftID: <font color="#800080">'3009_Stamina'</font>\},\par
    item96: \{<b>text</b>: <font color="#800080">'Power Pack'</font>,              giftID: <font color="#800080">'8035_Power'</font>\},\par
    <i>//item97: \{text: 'Quiver',                  giftID: '105_Quiver'\},\par
    //item98: \{text: 'Arrow Shaft',             giftID: '106_Arrow'\},\par
    </i>item100: \{<b>text</b>: <font color="#800080">'Augmenter'</font>,               giftID: <font color="#800080">'101_Nickys'</font>\},\par
    item101: \{<b>text</b>: <font color="#800080">'Cuban Mercenary'</font>,         giftID: <font color="#800080">'cuban_mercenary'</font>\},\par
    <i>//item102: \{text: 'Vitals Sight',            giftID: '107_Vitals'\},\par
    </i>item103: \{<b>text</b>: <font color="#800080">'Armored Plating'</font>,         giftID: <font color="#800080">'7040_Armored'</font>\}   \}\par
\par
\par
<i>// Variables for Event trigger\par
</i><b>var </b>pass                = 0,\par
    change_count        = 0,\par
    notify_count        = 0,\par
    scheduled           = false;\par
\par
<i>// Process Variables\par
</i><b>var </b>script_version      = <font color="#800080">&quot;0.10.311&quot;</font>,\par
    SUC_script_num      = 70459,\par
    strAutoOn           = <font color="#800080">'FBAA-AutoOn'</font>,\par
    strFBAALog          = <font color="#800080">'FBAA-Log'</font>,\par
    strAutoOff          = <font color="#800080">'FBAA-AutoOff'</font>,\par
    strLogShow          = <font color="#800080">'FBAA-LogShow'</font>,\par
    strLogHide          = <font color="#800080">'FBAA-LogHide'</font>,\par
    strFBAASetTabs      = <font color="#800080">'FBAA-SettingTab'</font>,\par
    strFBAASetDivs      = <font color="#800080">'FBAA-SettingDiv'</font>,\par
    strFBAutoAccept     = <font color="#800080">'FBAA-Header'</font>,\par
    strFBAASettings     = <font color="#800080">'FBAA-Settings'</font>;\par
\par
<b>var </b>iWallCurrent        = 0,\par
    iMW_XW_Timer        = 0,\par
    iFB_XW_Timer        = 0,\par
    iRequestCurrent     = 0,\par
    iRespectCurrent     = 0,\par
    FV_accept_ignore    = 0,\par
    MW_FreeGiftsDelay   = 0,\par
    MW_IcedBonusDelay   = 0,\par
    MW_SendThanksDelay  = 0,\par
    MW_SecretDropDelay  = 0,\par
    MW_LootLadderDelay  = 0;\par
\par
<b>var </b>bAutoRun            = false,\par
    bShowLog            = false,\par
    bAutoRunHold        = false,\par
    bInitialized        = false;\par
\par
<b>var </b>aParams             = <b>new Array</b>(),\par
    aWallNotificationId = <b>new Array</b>();\par
\par
<b>var </b>oLogDiv, FB_dtsg, oWallList, strGroups,\par
    EventSpan, strSaveSet, FB_user_id, strFrameId,\par
    ActionWall, iRequestNum, local_xw_sig, Post_form_id,\par
    xw_sig_valid, oRespectList, oRequestList, local_xw_time,\par
    ActionRequest, ActionRespect, local_xw_user_id;\par
\par
<i>/**** Icons ****/\par
</i><b>var </b>imgLogo = <font color="#800080">'data:image/jpg;base64,'</font>+\par
              <font color="#800080">'/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcG'</font>+\par
              <font color="#800080">'BwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwM'</font>+\par
              <font color="#800080">'DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAoACgDASIA'</font>+\par
              <font color="#800080">'AhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQA'</font>+\par
              <font color="#800080">'AAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3'</font>+\par
              <font color="#800080">'ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWm'</font>+\par
              <font color="#800080">'p6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEA'</font>+\par
              <font color="#800080">'AwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSEx'</font>+\par
              <font color="#800080">'BhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElK'</font>+\par
              <font color="#800080">'U1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3'</font>+\par
              <font color="#800080">'uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0HxJY'</font>+\par
              <font color="#800080">'X2qaPPHpt6LC+KsIZim9AxUgBh1xznI5BAODjaaGk+M7m58XvpWo6XcaRLNa/aLQyMksVyUYrMsc'</font>+\par
              <font color="#800080">'isdwUNEw3BHKuxKDaca93aR6jYzW0jSrHcRtCxjco6qwwSrAgg4JwQQRXA+JPi9dfGzQ7nw5feBm'</font>+\par
              <font color="#800080">'8EeKfDDi80nWdG06AMPskdxbPcGCFjJcRuUhc3E0FvEYnulO1JyT+KUoKSep+gczWttD0guu0k5B'</font>+\par
              <font color="#800080">'PBrkbrxTqviW/wBYsdEspBFaSCzi1SbaLSG4Qt57HDb5hG2I9iKMyRSozxjDj1v4ufsJ6j8P/hB4'</font>+\par
              <font color="#800080">'g1/TPifYpqGk6VNqKXNldXd6dRZA7bLaGUGB5JthSPZvxIwCJJt2N41p3xZgtrq0+F2gfDpLXQ9M'</font>+\par
              <font color="#800080">'ZILnxDdQxtfwNGv2glpmdrq2ZmUQrBLChcJLJ5xaZxWrw0oJ8+gqVeNT4NfwOvt4DbWkcbzSTMig'</font>+\par
              <font color="#800080">'NJIAGc9yQAACTzgAD0opTIQDnB9aK5TUxfiH+0d4E/ZX8A6J4t8W2h1u5m1a7s7rTLu4WO2ghWIy'</font>+\par
              <font color="#800080">'Wr+TJaMk7yOjRmKOdyB5chkgDSrDsfAL9tHxb4x/Zo8a6rP4M0z4bp4nvtP0S2is4pF1DUrL7JdS'</font>+\par
              <font color="#800080">'L5z/ACxiWYRKqR7Q7LJdOAwkLpV8R/GLxB8DtAvvEHhnwxqXjbU0tpLY6DZrI7alCQJZA6xncYo1'</font>+\par
              <font color="#800080">'h81iVkUCIlo2A47D4e3Nj+19bWXgbxv4a8N/DfUvGdoz6LqGmXqam0WqxsksFvJcJBbr88H2kKI1'</font>+\par
              <font color="#800080">'ZWcH5pW2B/Uw8/3a5Wk9vmcVWCV3JX87/oczN8DNb8A/HT4hfE+X9oT4c+JPDOrx+NL7w54S0jVp'</font>+\par
              <font color="#800080">'H1yyvPENv5bKyeWsgMTRWm4y4WMW+7EOWBqfti/8FCtU+Hvijwj4l8S+AtD8YeE/Evhu3utc8RR2'</font>+\par
              <font color="#800080">'ha/0stc3mnRttlV0e3ZtPM8bbdqvcyAbyVEnbaF+wX8U/iV8Vda+G2qeMPBsEPh+20+6125s5JHu'</font>+\par
              <font color="#800080">'zYXst0kTCMAENKlnOwRggIMQLKHfZznxg/aMPwes9Uk+Ffwu0H4heGdEmt9L0VRfC2vNUjgSGJ7m'</font>+\par
              <font color="#800080">'CEWsxujcXKz4VZEaeNwVEjSA1spVFpP3exCUJSXL71vlp6/iZ+mfEXwt8YfA3hzxh4Siks4fEsk8'</font>+\par
              <font color="#800080">'txpcV6b+106FFCRNHN9kgQrKyNIdsjshkWMwptYoVan8VX3jzbreqWt3ZalqccdxcW10GFxaOUA8'</font>+\par
              <font color="#800080">'mTc8jb0ACEtI7EoSXc5YleXVtKba0OqCskiXTdUudF1G3vLK6urG+tJVmhubeZopYHUghlZTkH9C'</font>+\par
              <font color="#800080">'Mg5BIq+3iiPVpHXWdF8M6/FOyyXL3WntDdXDqVZWM1tJEysrKrKybWVgGBDAGiiiNSUfhYnBS1ZW'</font>+\par
              <font color="#800080">'uvGmqazcXX9oaZ4SN1qcU1prXiC1s3g13xRaSEkW95KhVRyVE8keGuggVhEhkSSaPxpfabCI9Mt9'</font>+\par
              <font color="#800080">'G0AqnkifR9PFpctFtC+WZCzkLgdI9mMnGKKKt4mo92JUYLoZMapbQIiIEVFCgDoABiiiisrmh//Z'</font>;\par
\par
<b>var </b>imgCatagory = \{\par
        0:  <font color="#800080">'data:image/gif;base64,'</font>+\par
            <font color="#800080">'R0lGODlhEAAQAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBV'</font>+\par
            <font color="#800080">'ZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDV'</font>+\par
            <font color="#800080">'mQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMr'</font>+\par
            <font color="#800080">'zDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq'</font>+\par
            <font color="#800080">'/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2Yr'</font>+\par
            <font color="#800080">'AGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaq'</font>+\par
            <font color="#800080">'M2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kA'</font>+\par
            <font color="#800080">'ZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmA'</font>+\par
            <font color="#800080">'mZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/'</font>+\par
            <font color="#800080">'zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV'</font>+\par
            <font color="#800080">'/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/'</font>+\par
            <font color="#800080">'AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9V'</font>+\par
            <font color="#800080">'M/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//V'</font>+\par
            <font color="#800080">'Zv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAAAQABAA'</font>+\par
            <font color="#800080">'AAiQAPcJHEiwoEFl9AqiMThQmZiBDxkOyxQmhkBlDCHGuLEPGrGM+5ShESNG2EeQAyPp0ody4DBd'</font>+\par
            <font color="#800080">'61ruy6FmFzB2IDUBSZNmn6J18xgqy5FDBsZktICxLPggDQ4HAxXBLJgjTQ4EBaUGG6gJR1FN++hF'</font>+\par
            <font color="#800080">'q7dPmLB5CUMSHZMp0yRJmdJkUqRoWLSBy1hijJb2rsCAADs='</font>,\par
        1:  <font color="#800080">'data:image/gif;base64,'</font>+\par
            <font color="#800080">'R0lGODlhEAAQAKIAAAAAAOvu9DtZmEVinm2EtGF5rP///wAAACH5BAEHAAAALAAAAAAQABAAAAM+'</font>+\par
            <font color="#800080">'CLrcWiLKGYuiWN5cgjHRhnlfCGRCqZ2ZamJfDAqiFJD32846zNMs30QxIBiPhM9xQEQelUYmAIKS'</font>+\par
            <font color="#800080">'WBzYRQIAOw=='</font>,\par
        2:  <font color="#800080">'data:image/gif;base64,'</font>+\par
            <font color="#800080">'R0lGODlhEAAQAPUAAAAAAAYGBgkJCRERERcXFxsbGx4eHiQkJCoqKi4uLjIyMjQ0NDk5OT4+PkBA'</font>+\par
            <font color="#800080">'QEdHR0pKSlBQUFdXV15eXmJiYmZmZmpqanNzc3R0dH9/f4CAgIWFhYuLi42NjZGRkZeXl5ubm56e'</font>+\par
            <font color="#800080">'nqampqqqqqysrLa2trq6ur+/v8HBwcXFxcjIyM/Pz9PT09fX19ra2t/f3+Pj4+Xl5evr6/Hx8fT0'</font>+\par
            <font color="#800080">'9Pn5+f39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAbQQIOj'</font>+\par
            <font color="#800080">'sVg4DAAAwcFYMByHgCM0In2QSs5oBIIIAAfSaoVaJBUklWqUSIZbLNclWRmvSoekoQR7xUwFAyIv'</font>+\par
            <font color="#800080">'Li4nCHonMjGLEhAtMTAxKmYABik0MzU1IBuaMzMtDW4tNjUnNS4qNCo1NjIPSQguphYsNjYuGDKv'</font>+\par
            <font color="#800080">'DkkLMKYZJbgmFzOvowAOMcIduB4XNDYxygzNNhcSMzQVFdOwSQm0NhYHKy4KFK4yELKl5QIiJQIT'</font>+\par
            <font color="#800080">'0zG+AAzBNhgAFv4sTKMRAUADDB88fODQgEHDDSEianAQBAA7'</font>,\par
        3:  <font color="#800080">'data:image/gif;base64,'</font>+\par
            <font color="#800080">'R0lGODlhEAAQAPMKAAAAABlLGShjKH5+fo5DAMheAESMRHq0eviwFfrybwAAAAAAAAAAAAAAAAAA'</font>+\par
            <font color="#800080">'AAAAACH5BAEAAAoALAAAAAAQABAAAARZUMmpCko0z3GRzpyVeJ80WGIpAYRIlgB6KUYm3KxrBDUF'</font>+\par
            <font color="#800080">'BAFZIvDhBVqXgsFwoPCWBISFsGNKeADAEoXlXQWKgbb1VPyuE62BagADwBl12fwRV4mq8A9PiQAA'</font>+\par
            <font color="#800080">'Ow=='</font>,\par
        4:  <font color="#800080">'data:image/gif;base64,'</font>+\par
            <font color="#800080">'R0lGODlhEAAQAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBV'</font>+\par
            <font color="#800080">'ZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDV'</font>+\par
            <font color="#800080">'mQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMr'</font>+\par
            <font color="#800080">'zDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq'</font>+\par
            <font color="#800080">'/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2Yr'</font>+\par
            <font color="#800080">'AGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaq'</font>+\par
            <font color="#800080">'M2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kA'</font>+\par
            <font color="#800080">'ZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmA'</font>+\par
            <font color="#800080">'mZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/'</font>+\par
            <font color="#800080">'zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV'</font>+\par
            <font color="#800080">'/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/'</font>+\par
            <font color="#800080">'AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9V'</font>+\par
            <font color="#800080">'M/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//V'</font>+\par
            <font color="#800080">'Zv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAAAQABAA'</font>+\par
            <font color="#800080">'AAi6APcJHLhsU6hlAxMOhBMkTqg4cdRsUrhvGRyHm+Bo2nQnYrSB0STGAZUw1EU1A+Nw1LQv2qaJ'</font>+\par
            <font color="#800080">'+14eYblPzcNN0TTFOaJsHyiVOipihBgnCMtoEEPpgKZzU5yLRoWugRhk2KYjcJzGCboPyNQgOoAQ'</font>+\par
            <font color="#800080">'U7YmSMOiToMAWQsWWteiatRm9Go2SA6Bmo6s0QtHoFmvOtIMVBNn75qCQOriSBgtB8QjiQvrWDxQ'</font>+\par
            <font color="#800080">'H94cOtYA0eFgEsWE0IaNpRgQADs='\par
        </font>\}\par
\par
<i>/**** Start of Link List Header ****/\par
</i>List = <b>function</b>(_cycle) \{\par
  <b>var </b>Self   = <b>this</b>;\par
  <b>this</b>.First = null;\par
  <b>this</b>.Last  = null;\par
  <i>// empty list\par
  </i><b>this</b>.Erase = <b>function</b>() \{\par
    <b>var </b>pointer = <b>this</b>.First;\par
    <b>var </b>hold;\par
    <b>while </b>(pointer != null) \{\par
        hold    = pointer.Next;\par
        pointer = null;\par
        pointer = hold;\par
    \}\par
    <b>this</b>.First = null;\par
    <b>this</b>.Last  = null;\par
  \}\par
\par
  <i>// Start to action the data elements in the list\par
  </i><b>this</b>.Run = <b>function</b>() \{\par
    <b>var </b>oHold;\par
    <b>if </b>(<b>this</b>.First == null) \{\par
        <i>// Load List\par
        </i>_cycle();\par
    \} <b>else </b>\{\par
        <i>// Remove the top element from the list and action it\par
        </i>oHold = <b>this</b>.First;\par
        <b>this</b>.First = oHold.Next;\par
        oHold.Process();\par
    \}\par
  \}\par
\par
  <i>// Add to the bottom of the list\par
  </i><b>this</b>.Append = <b>function</b>(_data) \{\par
    <b>if </b>(<b>this</b>.First == null) \{\par
        <b>this</b>.First = _data;\par
        <b>this</b>.Last  = _data;\par
    \} <b>else </b>\{\par
        <b>this</b>.Last.Next = _data;\par
        <b>this</b>.Last      = _data;\par
    \}\par
  \}\par
\par
  <i>// Add to the top of the list\par
  </i><b>this</b>.Insert = <b>function</b>(_data) \{\par
    <b>if </b>(<b>this</b>.First == null) \{\par
        <b>this</b>.First = _data;\par
        <b>this</b>.Last  = _data;\par
    \} <b>else </b>\{\par
        _data.Next = <b>this</b>.First;\par
        <b>this</b>.First = _data;\par
    \}\par
  \}\par
\}\par
<i>/**** End of Link List Header ****/\par
\par
/**** Engine for Processing Wall posting, Requests, and Respect ****/\par
// Regex search items\par
</i><b>var </b>strConfirmBoxes1   = <font color="#800080">'.//div[@class=&quot;requestStatus UIImageBlock_Content UIImageBlock_SMALL_Content&quot;]//form'</font>,\par
<i>//var strConfirmBoxes1   = './/div[@class=&quot;pts  UIImageBlock_Content  UIImageBlock_ICON_Content&quot;]//form',\par
  //strConfirmBoxes1   = './/div[@class=&quot;fbRequestList  mbl&quot;]//form',\par
    </i>strConfirmBoxes2   = <font color="#800080">'.//li[contains(@class,&quot;uiListItem  uiListHorizontalItemBorder  uiListHorizontalItem&quot;)]//form'</font>,\par
  <i>//strConfirmBoxes2   = './/label[contains(@class,&quot;uiButton  uiButtonConfirm&quot;)]//form',\par
    </i>strConfirmBoxes3   = <font color="#800080">'.//li[contains(@class,&quot;uiListItem  uiListVerticalItemBorder&quot;)]//form'</font>,\par
  <i>//strConfirmBoxes3   = './/ul[contains(@class,&quot;uiList  pts  requests&quot;)]//form',\par
\par
    </i>strFormInputs      = <font color="#800080">'.//input'</font>,\par
    strFormId          = <font color="#800080">'.//div'</font>,\par
\par
    strReqTypes        = <font color="#800080">'.//span[contains(@id,&quot;_label&quot;)]'</font>,\par
    strReqTypes1       = <font color="#800080">'.//span[contains(@id,&quot;confirm_&quot;)]'</font>,\par
    strWarBetray       = <font color="#800080">'.//span[contains(text(),&quot;Betray&quot;)]/parent::*'</font>,\par
    strWarAttackBetray = <font color="#800080">'.//div[contains(@style,&quot;position: absolute&quot;)]/a'</font>,\par
  <i>//strWarAttack       = './/div[contains(@style,&quot;float: left&quot;)]/div[contains(@style,&quot;position: absolute&quot;)]/a';\par
    </i>strWarAttack       = <font color="#800080">'.//a'</font>;\par
  <i>//strWarAttack       = './/dd/div/a';\par
\par
</i><b>var </b>strBase            = <font color="#800080">'http://www.facebook.com/ajax/reqs.php?__a=1'</font>,\par
    strAccept          = <font color="#800080">'&amp;actions[accept]=Confirm'</font>,\par
    strReject          = <font color="#800080">'&amp;actions[reject]=Ignore'</font>;\par
\par
<i>// Regex for Wall data\par
</i><b>var </b>Wall_Data = \{\par
    <i>// Mafia Wars\par
    </i>10979261223: \{\par
      MW_WarHelp:         \{<b>text</b>:<font color="#800080">'MW War Help'</font>,                testURL:/next_controller=war&amp;next_action=view&amp;zy_track=feed&amp;sendkey=.\{0,\}/i,                                                                                                                                                                                                        testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_Burner:          \{<b>text</b>:<font color="#800080">'MW Burner'</font>,                  testURL:/next_controller=robbing&amp;next_action=call_for_help_get_phone/i,                                                                                                                                                                                                             testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_FriendofFriend:  \{<b>text</b>:<font color="#800080">'MW Help Friend of Friend'</font>,   testURL:/next_controller=story&amp;next_action=give_help(.)*request_job_help_friend|next_controller=job&amp;next_action=give_help(.)*request_job_help_friend/i,                                                                                                                             testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_NeedHelp_NY:     \{<b>text</b>:<font color="#800080">'MW Help NY'</font>,                 testURL:/next_controller=job&amp;next_action=give_help(.)*cityId=1|next_controller=job&amp;xw_action=give_help(.)*cityId=1|next_controller=<b>index</b>&amp;next_action=socialmission_respond/i,                                                                                                       testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_NeedHelp_Cuba:   \{<b>text</b>:<font color="#800080">'MW Help Cuba'</font>,               testURL:/next_controller=job&amp;next_action=give_help(.)*cityId=2|next_controller=job&amp;xw_action=give_help(.)*cityId=2/i,                                                                                                                                                               testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_NeedHelp_Moscow: \{<b>text</b>:<font color="#800080">'MW Help Moscow'</font>,             testURL:/next_controller=story&amp;next_action=give_help_moscow_social|next_controller=episode&amp;next_action=give_help_moscow_social/i,                                                                                                                                                   testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_NeedHelp_Bangkok:\{<b>text</b>:<font color="#800080">'MW Help Bangkok'</font>,            testURL:/next_controller=story&amp;next_action=give_help_social(.)*cityId=4/i,                                                                                                                                                                                                          testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_NeedHelp_Vegas:  \{<b>text</b>:<font color="#800080">'MW Help Vegas'</font>,              testURL:/next_controller=story&amp;next_action=give_help_social(.)*cityId=5/i,                                                                                                                                                                                                          testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_NeedHelp_Italy:  \{<b>text</b>:<font color="#800080">'MW Help Italy'</font>,              testURL:/next_controller=story&amp;next_action=give_help_social(.)*cityId=6/i,                                                                                                                                                                                                          testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_NeedHelp_Brazil: \{<b>text</b>:<font color="#800080">'MW Help Brazil'</font>,             testURL:/next_controller=job&amp;next_action=give_help(.)*cityId=7/i,                                                                                                                                                                                                                   testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_Achievement:     \{<b>text</b>:<font color="#800080">'MW Achievement'</font>,             testURL:/track.php<font color="#800080">\\?</font>sendkey=.\{0,\}&amp;next_action=ach_celeb/i,                                                                                                                                                                                                                          testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_BossBonus:       \{<b>text</b>:<font color="#800080">'MW Boss Bonus'</font>,              testURL:/next_controller=story&amp;next_action=claim_boss_bonus|next_controller=map&amp;next_action=mapboss_reward_claim/i,                                                                                                                                                                 testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_BrazilBonus:     \{<b>text</b>:<font color="#800080">'MW Brazil Mastery'</font>,          testURL:/next_controller=job&amp;next_action=mastery_feed_claim/i,                                                                                                                                                                                                                      testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_IcedBonus:       \{<b>text</b>:<font color="#800080">'MW Iced Bonus'</font>,              testURL:/next_controller=<b>index</b>&amp;next_action=iced_boost_claim|next_controller=iceevent&amp;next_action=iced_event_boost_claim/i,                                                                                                                                                          testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_LevelUp:         \{<b>text</b>:<font color="#800080">'MW Level Up Bonus'</font>,          testURL:/next_controller=<b>index</b>&amp;next_action=levelup_boost_claim|zy_track=feed&amp;sendkey=.\{0,\}&amp;next_controller=<b>index</b>&amp;next_action=levelUpBonusClaim/i,                                                                                                                                   testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_HolidayBonus:    \{<b>text</b>:<font color="#800080">'MW Holiday Bonus'</font>,           testURL:/next_controller=<b>index</b>&amp;next_action=holiday_feed_reward/i,                                                                                                                                                                                                                   testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_FeedBonus:       \{<b>text</b>:<font color="#800080">'MW Feed Bonus'</font>,              testURL:/zy_track=feed&amp;next_controller=<b>index</b>&amp;next_action=loot_drop_feed_accept/i,                                                                                                                                                                                                   testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_SupplyParts:     \{<b>text</b>:<font color="#800080">'MW Supply Part'</font>,             testURL:/next_controller=propertyV2&amp;next_action=cs_help_item|next_controller=propertyV2&amp;next_action=cs_redeem_special_item_feed|next_controller=propertyV2&amp;next_action=itemFeedHelp|next_controller=propertyV2&amp;next_action=visit|next_controller=propertyV2&amp;next_action=getBoost/i, testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_SupplyEnergy:    \{<b>text</b>:<font color="#800080">'MW Supply Energy'</font>,           testURL:/next_controller=<b>index</b>&amp;next_action=send_energy_mbox/i,                                                                                                                                                                                                                      testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_PowerPack:       \{<b>text</b>:<font color="#800080">'MW Power Pack'</font>,              testURL:/next_controller=<b>index</b>&amp;next_action=power_pack_get/i,                                                                                                                                                                                                                        testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_NextTarget:      \{<b>text</b>:<font color="#800080">'MW Next Target'</font>,             testURL:/next_controller=fight&amp;next_action=social_attack/i,                                                                                                                                                                                                                         testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_Secret_Reward:   \{<b>text</b>:<font color="#800080">'MW Secret Reward'</font>,           testURL:/next_controller=fight&amp;next_action=collect_fight_loot|next_controller=socialmission&amp;next_action=giftAccept/i,                                                                                                                                                               testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_Fight_Event:     \{<b>text</b>:<font color="#800080">'MW Fight Event'</font>,             testURL:/next_controller=<b>index</b>&amp;next_action=fight_event_feed_reward/i,                                                                                                                                                                                                               testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_Bounty:          \{<b>text</b>:<font color="#800080">'MW Bounty'</font>,                  testURL:/next_controller=hitlist&amp;next_action=feed_hit/i,                                                                                                                                                                                                                            testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_LaunderMoney:    \{<b>text</b>:<font color="#800080">'MW Launder Money'</font>,           testURL:/next_controller=launder&amp;next_action=give_help/i,                                                                                                                                                                                                                           testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_ChopShop:        \{<b>text</b>:<font color="#800080">'MW Chop Shop'</font>,               testURL:/next_controller=propertyV2&amp;next_action=cs_help_final.\{0,\}building_type%22%3A%2211%22|next_controller=propertyV2&amp;next_action=cs_help_initial.\{0,\}building_type%22%3A%2211%22/i,                                                                                             testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_WeaponsDepot:    \{<b>text</b>:<font color="#800080">'MW Weapons Depot'</font>,           testURL:/next_controller=propertyV2&amp;next_action=cs_help_final.\{0,\}building_type%22%3A%2212%22|next_controller=propertyV2&amp;next_action=cs_help_initial.\{0,\}building_type%22%3A%2212%22|next_controller=PropertyV2&amp;next_action=PropertyV2EventAskFeed/i,                               testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_Armory:          \{<b>text</b>:<font color="#800080">'MW Armory'</font>,                  testURL:/next_controller=propertyV2&amp;next_action=cs_help_final.\{0,\}building_type%22%3A%2213%22|next_controller=propertyV2&amp;next_action=cs_help_initial.\{0,\}building_type%22%3A%2213%22/i,                                                                                             testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_Zoo:             \{<b>text</b>:<font color="#800080">'MW Zoo'</font>,                     testURL:/next_controller=propertyV2&amp;next_action=cs_help_final.\{0,\}building_type%22%3A%2214%22|next_controller=propertyV2&amp;next_action=cs_help_initial.\{0,\}building_type%22%3A%2214%22/i,                                                                                             testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_Money:           \{<b>text</b>:<font color="#800080">'MW Money'</font>,                   testURL:/next_controller=VegasSlots&amp;next_action=giveMoney/i,                                                                                                                                                                                                                        testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_StashBonus:      \{<b>text</b>:<font color="#800080">'MW Secret Stash Bonus'</font>,      testURL:/next_controller=job&amp;next_action=collect_loot|next_controller=propertyV2&amp;next_action=getBoost/i,                                                                                                                                                                            testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_Robbing:         \{<b>text</b>:<font color="#800080">'MW Robbing'</font>,                 testURL:/next_controller=robbing&amp;next_action=mastery_bonus/i,                                                                                                                                                                                                                       testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_LootDropEvent:   \{<b>text</b>:<font color="#800080">'MW Loot Drop Event'</font>,         testURL:/next_controller=<b>index</b>&amp;next_action=loot_drop_event_feed_reward/i,                                                                                                                                                                                                           testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_ShareRewardEvent:\{<b>text</b>:<font color="#800080">'MW Share Reward Event'</font>,      testURL:/next_controller=quest&amp;next_action=questFeedReward|next_controller=war&amp;next_action=share_reward_feed_click|next_controller=socialmission&amp;next_action=rewardBrag/i,                                                                                                          testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_Missions:        \{<b>text</b>:<font color="#800080">'MW Social Missions'</font>,         testURL:/next_controller=socialmission&amp;next_action=joinMission|next_controller=socialmission&amp;xw_action=joinMission(.)*cityId=1/i,                                                                                                                                                   testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_VegasSlots:      \{<b>text</b>:<font color="#800080">'MW Vegas Slots'</font>,             testURL:/next_controller=stats&amp;next_action=view(.)*vegasslots|next_controller=stats&amp;next_action=view(.)*playslots/i,                                                                                                                                                                testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_FreeGift:        \{<b>text</b>:<font color="#800080">'MW Free Gift'</font>,               testURL:/next_controller=freegifts&amp;next_action=acceptGiftEvent|next_controller=freegifts&amp;next_action=view/i,                                                                                                                                                                        testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_SoccerFan:       \{<b>text</b>:<font color="#800080">'MW Soccer Fan'</font>,              testURL:/next_controller=propertyV2&amp;next_action=getCustomer/i,                                                                                                                                                                                                                      testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_BrazilCityCrew:  \{<b>text</b>:<font color="#800080">'MW Accept Brazil City Crew'</font>, testURL:/next_controller=job&amp;next_action=accept_city_crew/i,                                                                                                                                                                                                                        testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_LootLadder:      \{<b>text</b>:<font color="#800080">'MW Loot Ladder'</font>,             testURL:/next_controller=lootladderevent&amp;next_action=share_feed_click|next_controller=lootladderevent&amp;next_action=ask_feed_click|next_controller=lootladderevent&amp;next_action=brag_feed_click/i,                                                                                     testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_LoyaltyBonus:    \{<b>text</b>:<font color="#800080">'MW Loyalty Status Bonus'</font>,    testURL:/next_controller=<b>index</b>&amp;next_action=crm_levelup_claim/i,                                                                                                                                                                                                                     testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_3xVegasLoot:     \{<b>text</b>:<font color="#800080">'MW 3X Vegas Bonus'</font>,          testURL:/next_controller=<b>index</b>&amp;next_action=city_shutdown_vegas_feed/i,                                                                                                                                                                                                              testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_EpicClanBoss:    \{<b>text</b>:<font color="#800080">'Epic Clan Boss'</font>,             testURL:/next_controller=Epicclanboss&amp;next_action=ask_feed_click/i,                                                                                                                                                                                                                 testIMG:/<font color="#800080">\\</font>B|./i\},\par
      MW_LimitedProperty:    \{<b>text</b>:<font color="#800080">'Limited Property'</font>,          testURL:/next_controller=limitedTimeProperty&amp;next_action=(addPropertyPart|addAnyPropertyPart|upgradeBragFeed)/i,                                                                                                                                                                                                                 testIMG:/<font color="#800080">\\</font>B|./i\},      MW_BossFight:       \{<b>text</b>:<font color="#800080">'Boss Fight'</font>,                 testURL:/next_controller=bossfightv2&amp;next_action=ask_feed_click/i,                                                                                                                                                                                                                  testIMG:/<font color="#800080">\\</font>B|./i\}\par
    \},\par
\par
    <i>// FarmVille\par
    </i>102452128776: \{\par
      <i>// Rewards\par
      </i>FV_MasteryFriendRewad:                  \{testURL:/MasteryFriendRewad/i,                              testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_HorseStableFriendReward:             \{testURL:/HorseStableFriendReward/i,                         testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_FuelDiscoveryFriendReward:           \{testURL:/FuelDiscoveryFriendReward|OilBarronFriendReward/i, testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_FertilizeThankFriendReward:          \{testURL:/FertilizeThankFriendReward/i,                      testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_SocialMissionShareBonusFriendReward: \{testURL:/SocialMissionShareBonusFriendReward/i,             testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_StorageExpansionFriendReward:        \{testURL:/StorageExpansionFriendReward/i,                    testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_WanderingStallionFriendReward:       \{testURL:/WanderingStallionFriendReward/i,                   testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_AchievementFriendReward:             \{testURL:/AchievementFriendReward/i,                         testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_TuscanWeddingRedeemFriendReward:     \{testURL:/TuscanWeddingRedeemFriendReward/i,                 testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_TuscanWeddingFriendReward:           \{testURL:/TuscanWeddingFriendReward/i,                       testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_FlowerFriendReward:                  \{testURL:/FlowerFriendReward/i,                              testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_BushelFriendReward:                  \{testURL:/BushelFriendReward/i,                              testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_StallThankYouFriendReward:           \{testURL:/StallThankYouFriendReward/i,                       testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_lonely_cow:                          \{testURL:/lonely_cow/i,                                      testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_FoalFriendReward:                    \{testURL:/FoalFriendReward/i,                                testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_NurseryBuildingFriendReward:         \{testURL:/NurseryBuildingFriendReward/i,                     testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_EggFriendReward:                     \{testURL:/EggFriendReward/i,                                 testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_CollectionsFriendReward:             \{testURL:/CollectionsFriendReward/i,                         testIMG:/<font color="#800080">\\</font>B|./i\},\par
      FV_ConstructionBuildingFriendReward:    \{testURL:/ConstructionBuildingFriendReward/i,                testIMG:/<font color="#800080">\\</font>B|./i\}\par
    \}\par
  \}\par
\par
<b>var </b>MW_general = \{\par
    2004: \{<b>text</b>:<font color="#800080">&quot;Help on Jobs&quot;</font>\},\par
    2005: \{<b>text</b>:<font color="#800080">&quot;Friend of a Friend&quot;</font>\},\par
    2006: \{<b>text</b>:<font color="#800080">&quot;Next Target&quot;</font>\},\par
    2007: \{<b>text</b>:<font color="#800080">&quot;HitList Bounty&quot;</font>\},\par
    2008: \{<b>text</b>:<font color="#800080">&quot;Bonus, Loot, or Reward&quot;</font>\},\par
    2013: \{<b>text</b>:<font color="#800080">&quot;Boss Bonus&quot;</font>\},\par
    2009: \{<b>text</b>:<font color="#800080">&quot;Money Laundering&quot;</font>\},\par
    2010: \{<b>text</b>:<font color="#800080">&quot;Supply Parts or Energy&quot;</font>\},\par
    2011: \{<b>text</b>:<font color="#800080">&quot;War - Help&quot;</font>\},\par
    2012: \{<b>text</b>:<font color="#800080">&quot;War - Betray Friends&quot;</font>\},\par
    2014: \{<b>text</b>:<font color="#800080">&quot;Secret Stash&quot;</font>\},\par
    2015: \{<b>text</b>:<font color="#800080">&quot;Vegas Slots&quot;</font>\},\par
    2016: \{<b>text</b>:<font color="#800080">&quot;Soccer Fan&quot;</font>\},\par
    2017: \{<b>text</b>:<font color="#800080">&quot;Brazil City Crew&quot;</font>\}\par
  \}\par
\par
<i>// Notes about Secret Stashed\par
/*\par
secret_stash_help\par
&lt;input type=&quot;submit&quot; id=&quot;u805997_89&quot; data-gt=&quot;\{&amp;quot;appid&amp;quot;:&amp;quot;10979261223&amp;quot;\}&quot;\par
  name=&quot;actions[http://apps.facebook.com/inthemafia/track.php?uid=0&amp;amp;code&amp;amp;value=%7B%22from%22%3A%22p%7C45400175%22%2C%22value%22%3A%22secret_stash_help%22%7D&amp;amp;next_controller=secretStash&amp;amp;next_action=respond&amp;amp;next_params=%7B%22fromuidenc%22%3A%22MTY2Nzc5Mjg3Nw%3D%3D%22%2C%22time%22%3A%221304911796%22%2C%22id%22%3A%220%22%2C%22hash%22%3A%22d2a51c717610a836f7f62ff1bb980549%22%7D&amp;amp;zy_track=request&amp;amp;sendkey=0aa9ed263fb1af1509fa5251bc3bd5a3%24%24ciL3U_Q%2C45bZYhg8M-o.%21P%2921PEZcnDuA59D5xbS-dsM6kGnQb68EJAPtYPOdCniSR-UBUQl%2AXk%294VhUEi%28B5i&amp;amp;ztrack_category=free_gift&amp;amp;ztrack_subcategory=3004_Stash&amp;amp;ztrack_creative=free_gift]&quot; value=&quot;Accept&quot;&gt;\par
\par
  pattern is\par
    to steal a Cape Buffalo.\par
\par
  Secret stashed are\par
    Arachnid Cruiser A:65, D:25\par
    Blizzard Cannon A:48, D:84\par
    Cape Buffalo A:76, D:59\par
    Croc Skin Jacket A:55, D:79\par
    Final Word A:35, D:52\par
    Heads Up A:28, D:64\par
    Ice Climber A:54, D:29\par
    Ice Climbing Gear A:28, D:55\par
    Puma A:76, D:59\par
    Savannah Patroller A:82, D:50\par
    Spider Monkey A:42, D:62\par
    Tarantula A:53, D:30\par
    Web Climbing Rope A:60, D:45\par
*/\par
\par
</i><b>var </b>MW_StashList = \{\par
  <i>//2049: \{text:&quot;ALL (Overrides others)&quot;,                          test:&quot;ARANDOMPLACEHOLDERMEANSNOTHING&quot;\},\par
    </i>2049: \{<b>text</b>:<font color="#800080">&quot;ALL (Overrides others)&quot;</font>,                          test:<font color="#800080">&quot;&quot;</font>\},\par
    2050: \{<b>text</b>:<font color="#800080">&quot;Bark Scorpions.                 A:50,   D:32&quot;</font>,    test:<font color="#800080">&quot;Bark Scorpions&quot;</font>\},\par
    2051: \{<b>text</b>:<font color="#800080">&quot;Forest Scorpions.               A:25,   D:37&quot;</font>,    test:<font color="#800080">&quot;Forest Scorpions&quot;</font>\},\par
    2052: \{<b>text</b>:<font color="#800080">&quot;Chain Vipers.                   A:46,   D:33&quot;</font>,    test:<font color="#800080">&quot;Chain Vipers&quot;</font>\},\par
    2053: \{<b>text</b>:<font color="#800080">&quot;Attack Cobras.                  A:24,   D:20&quot;</font>,    test:<font color="#800080">&quot;Attack Cobras&quot;</font>\},\par
    2054: \{<b>text</b>:<font color="#800080">&quot;Anacondas.                      A:42,   D:23&quot;</font>,    test:<font color="#800080">&quot;Anacondas&quot;</font>\},\par
    2055: \{<b>text</b>:<font color="#800080">&quot;Timber Wolves.                  A:41,   D:20&quot;</font>,    test:<font color="#800080">&quot;Timber Wolves&quot;</font>\},\par
    2056: \{<b>text</b>:<font color="#800080">&quot;Snow Leopards.                  A:37,   D:25&quot;</font>,    test:<font color="#800080">&quot;Snow Leopards&quot;</font>\},\par
    2057: \{<b>text</b>:<font color="#800080">&quot;Siberian Tigers.                A:36,   D:14&quot;</font>,    test:<font color="#800080">&quot;Siberian Tigers&quot;</font>\},\par
    2058: \{<b>text</b>:<font color="#800080">&quot;Wild Mustangs.                  A:16,   D:34&quot;</font>,    test:<font color="#800080">&quot;Wild Mustangs&quot;</font>\},\par
    2059: \{<b>text</b>:<font color="#800080">&quot;Shchuka Speed Boats.            A:36,   D:22&quot;</font>,    test:<font color="#800080">&quot;Shchuka Speed Boats&quot;</font>\},\par
    2060: \{<b>text</b>:<font color="#800080">&quot;Orel Armored Helicopters.       A:24,   D:40&quot;</font>,    test:<font color="#800080">&quot;Orel Armored Helicopters&quot;</font>\},\par
    2061: \{<b>text</b>:<font color="#800080">&quot;Raed Armored Sedans.            A:30,   D:47&quot;</font>,    test:<font color="#800080">&quot;Raed Armored Sedans&quot;</font>\},\par
    2062: \{<b>text</b>:<font color="#800080">&quot;Day Rider 2Ks.                  A:44,   D:50&quot;</font>,    test:<font color="#800080">&quot;Day Rider 2Ks&quot;</font>\},\par
    2063: \{<b>text</b>:<font color="#800080">&quot;Lamang Motorcycles.             A:49,   D:34&quot;</font>,    test:<font color="#800080">&quot;Lamang Motorcycles&quot;</font>\},\par
    2064: \{<b>text</b>:<font color="#800080">&quot;Mugati Sports.                  A:35,   D:51&quot;</font>,    test:<font color="#800080">&quot;Mugati Sports&quot;</font>\},\par
    2065: \{<b>text</b>:<font color="#800080">&quot;Konstantin Cargo Carriers.      A:18,   D:44&quot;</font>,    test:<font color="#800080">&quot;Konstantin Cargo Carriers&quot;</font>\},\par
    2066: \{<b>text</b>:<font color="#800080">&quot;Commercial Helicopters.         A:14,   D:40&quot;</font>,    test:<font color="#800080">&quot;Commercial Helicopters&quot;</font>\},\par
    2067: \{<b>text</b>:<font color="#800080">&quot;Grapple Guns.                   A:16,   D:30&quot;</font>,    test:<font color="#800080">&quot;Grapple Guns&quot;</font>\},\par
    2068: \{<b>text</b>:<font color="#800080">&quot;Railguns.                       A:51,   D:24&quot;</font>,    test:<font color="#800080">&quot;Railguns&quot;</font>\},\par
    2069: \{<b>text</b>:<font color="#800080">&quot;Range Finder Rifles.            A:37,   D:54&quot;</font>,    test:<font color="#800080">&quot;Range Finder Rifles&quot;</font>\},\par
    2070: \{<b>text</b>:<font color="#800080">&quot;Bighorn Rams.                   A:37,   D:42&quot;</font>,    test:<font color="#800080">&quot;Bighorn Rams&quot;</font>\},\par
    2071: \{<b>text</b>:<font color="#800080">&quot;Plasma Rifles.                  A:40,   D:47&quot;</font>,    test:<font color="#800080">&quot;Plasma Rifles&quot;</font>\},\par
    2072: \{<b>text</b>:<font color="#800080">&quot;Nguhea Sniper Rifles.           A:21,   D:24&quot;</font>,    test:<font color="#800080">&quot;Nguhea Sniper Rifles&quot;</font>\},\par
    2073: \{<b>text</b>:<font color="#800080">&quot;Big Bad Wolves.                 A:42,   D:25&quot;</font>,    test:<font color="#800080">&quot;Big Bad Wolves&quot;</font>\},\par
    2074: \{<b>text</b>:<font color="#800080">&quot;Gilded RPGs.                    A:29,   D:42&quot;</font>,    test:<font color="#800080">&quot;Gilded RPGs&quot;</font>\},\par
    2075: \{<b>text</b>:<font color="#800080">&quot;Lloyds Spectres.                A:18,   D:45&quot;</font>,    test:<font color="#800080">&quot;Lloyds Spectres&quot;</font>\},\par
    2076: \{<b>text</b>:<font color="#800080">&quot;Riding Elephants.               A:18,   D:30&quot;</font>,    test:<font color="#800080">&quot;Riding Elephants&quot;</font>\},\par
    2077: \{<b>text</b>:<font color="#800080">&quot;Satellite Phones.&quot;</font>,                               test:<font color="#800080">&quot;Satellite Phones&quot;</font>\},\par
    2078: \{<b>text</b>:<font color="#800080">&quot;Blackmail Photos.&quot;</font>,                               test:<font color="#800080">&quot;Blackmail Photos&quot;</font>\},\par
    2079: \{<b>text</b>:<font color="#800080">&quot;Illegal Transaction Records.&quot;</font>,                    test:<font color="#800080">&quot;Illegal Transaction Records&quot;</font>\},\par
    2080: \{<b>text</b>:<font color="#800080">&quot;Car Parts.                     (Chop Shop)&quot;</font>,      test:<font color="#800080">&quot;Car Parts&quot;</font>\},\par
    2081: \{<b>text</b>:<font color="#800080">&quot;Car Lifts.                     (Chop Shop)&quot;</font>,      test:<font color="#800080">&quot;Car Lifts&quot;</font>\},\par
    2082: \{<b>text</b>:<font color="#800080">&quot;Power Tools.                   (Chop Shop)&quot;</font>,      test:<font color="#800080">&quot;Power Tools&quot;</font>\},\par
    2083: \{<b>text</b>:<font color="#800080">&quot;Cement Blocks.                 (Chop Shop)&quot;</font>,      test:<font color="#800080">&quot;Cement Blocks&quot;</font>\},\par
    2084: \{<b>text</b>:<font color="#800080">&quot;Acetylene Torches.             (Chop Shop)&quot;</font>,      test:<font color="#800080">&quot;Acetylene Torches&quot;</font>\},\par
    2085: \{<b>text</b>:<font color="#800080">&quot;Shipping Containers.           (Chop Shop)&quot;</font>,      test:<font color="#800080">&quot;Shipping Containers&quot;</font>\},\par
    2086: \{<b>text</b>:<font color="#800080">&quot;Forge.                         (Weapons Depot)&quot;</font>,  test:<font color="#800080">&quot;Forges&quot;</font>\},\par
    2087: \{<b>text</b>:<font color="#800080">&quot;Buzzsaw.                       (Weapons Depot)&quot;</font>,  test:<font color="#800080">&quot;Buzzsaws&quot;</font>\},\par
    2088: \{<b>text</b>:<font color="#800080">&quot;Gunpowder.                     (Weapons Depot)&quot;</font>,  test:<font color="#800080">&quot;Crates of Gunpowder&quot;</font>\},\par
    2089: \{<b>text</b>:<font color="#800080">&quot;Gun Drill.                     (Weapons Depot)&quot;</font>,  test:<font color="#800080">&quot;Gun Drills&quot;</font>\},\par
    2090: \{<b>text</b>:<font color="#800080">&quot;Arc Welder.                    (Weapons Depot)&quot;</font>,  test:<font color="#800080">&quot;Arc Welders&quot;</font>\},\par
    2091: \{<b>text</b>:<font color="#800080">&quot;Weapon Parts.                  (Weapons Depot)&quot;</font>,  test:<font color="#800080">&quot;Weapon Parts&quot;</font>\},\par
    2092: \{<b>text</b>:<font color="#800080">&quot;Armor Parts.                   (Armor Depot)&quot;</font>,    test:<font color="#800080">&quot;Armor Parts&quot;</font>\},\par
    2093: \{<b>text</b>:<font color="#800080">&quot;Chef.                          (Vegas Property)&quot;</font>, test:<font color="#800080">&quot;Chefs&quot;</font>\},\par
    2094: \{<b>text</b>:<font color="#800080">&quot;Slot Machine.                  (Vegas Property)&quot;</font>, test:<font color="#800080">&quot;Slot Machines&quot;</font>\},\par
    2095: \{<b>text</b>:<font color="#800080">&quot;Casino Dealer.                 (Vegas Property)&quot;</font>, test:<font color="#800080">&quot;Casino Dealers&quot;</font>\},\par
    2096: \{<b>text</b>:<font color="#800080">&quot;Steel Girder.                  (Vegas Property)&quot;</font>, test:<font color="#800080">&quot;Steel Girders&quot;</font>\},\par
    2097: \{<b>text</b>:<font color="#800080">&quot;Cinder Block.                  (Vegas Property)&quot;</font>, test:<font color="#800080">&quot;Cinder Blocks&quot;</font>\},\par
    2098: \{<b>text</b>:<font color="#800080">&quot;Construction Tools.            (Vegas Property)&quot;</font>, test:<font color="#800080">&quot;Construction Tools&quot;</font>\},\par
    2099: \{<b>text</b>:<font color="#800080">&quot;Health Kits.                   (Boss Fights)&quot;</font>,    test:<font color="#800080">&quot;Health Kits&quot;</font>\},\par
    2100: \{<b>text</b>:<font color="#800080">&quot;Stun Guns.                     (Boss Fights)&quot;</font>,    test:<font color="#800080">&quot;Stun Guns&quot;</font>\},\par
    2101: \{<b>text</b>:<font color="#800080">&quot;Plum.                          (Collections)&quot;</font>,    test:<font color="#800080">&quot;Plum&quot;</font>\},\par
    2102: \{<b>text</b>:<font color="#800080">&quot;Lime.                          (Collections)&quot;</font>,    test:<font color="#800080">&quot;Lime&quot;</font>\},\par
    2103: \{<b>text</b>:<font color="#800080">&quot;Cherry.                        (Collections)&quot;</font>,    test:<font color="#800080">&quot;Cherry&quot;</font>\},\par
    2104: \{<b>text</b>:<font color="#800080">&quot;Oranges.                       (Collections)&quot;</font>,    test:<font color="#800080">&quot;Oranges&quot;</font>\},\par
    2105: \{<b>text</b>:<font color="#800080">&quot;Lucky 7.                       (Collections)&quot;</font>,    test:<font color="#800080">&quot;Lucky 7&quot;</font>\},\par
    2106: \{<b>text</b>:<font color="#800080">&quot;Triple Bar.                    (Collections)&quot;</font>,    test:<font color="#800080">&quot;Triple Bar&quot;</font>\},\par
    2107: \{<b>text</b>:<font color="#800080">&quot;Liberty Bell.                  (Collections)&quot;</font>,    test:<font color="#800080">&quot;Liberty Bell&quot;</font>\},\par
    2108: \{<b>text</b>:<font color="#800080">&quot;Plaid Eggs.                    (Collections)&quot;</font>,    test:<font color="#800080">&quot;Plaid Eggs&quot;</font>\},\par
    2109: \{<b>text</b>:<font color="#800080">&quot;French Ball.                   (Collections)&quot;</font>,    test:<font color="#800080">&quot;French Ball&quot;</font>\},\par
    2110: \{<b>text</b>:<font color="#800080">&quot;German Ball.                   (Collections)&quot;</font>,    test:<font color="#800080">&quot;German Ball&quot;</font>\},\par
    2111: \{<b>text</b>:<font color="#800080">&quot;English Ball.                  (Collections)&quot;</font>,    test:<font color="#800080">&quot;English Ball&quot;</font>\},\par
    2112: \{<b>text</b>:<font color="#800080">&quot;Brazilian Ball.                (Collections)&quot;</font>,    test:<font color="#800080">&quot;Brazilian Ball&quot;</font>\},\par
    2113: \{<b>text</b>:<font color="#800080">&quot;Argentinean Ball.              (Collections)&quot;</font>,    test:<font color="#800080">&quot;Argentinean Ball&quot;</font>\},\par
    2114: \{<b>text</b>:<font color="#800080">&quot;Money Iron.                    (Collections)&quot;</font>,    test:<font color="#800080">&quot;Money Iron&quot;</font>\},\par
    2115: \{<b>text</b>:<font color="#800080">&quot;Rolls of Quarter.              (Collections)&quot;</font>,    test:<font color="#800080">&quot;Rolls of Quarter&quot;</font>\},\par
    2116: \{<b>text</b>:<font color="#800080">&quot;Heart Lockets.                 (Collections)&quot;</font>,    test:<font color="#800080">&quot;Heart Lockets&quot;</font>\}\par
\}\par
<b>var </b>MW_WarList = \{\par
  <i>//2200: \{text:&quot;ALL (Overrides others)&quot;,               test:&quot;ARANDOMPLACEHOLDERMEANSNOTHING&quot;\},\par
    </i>2200: \{<b>text</b>:<font color="#800080">&quot;ALL (Overrides others)&quot;</font>,               test:<font color="#800080">&quot;&quot;</font>\},\par
    2201: \{<b>text</b>:<font color="#800080">&quot;Canonazo.               A:42,   D:22&quot;</font>, test:<font color="#800080">&quot;Canonazo&quot;</font>\},\par
    2202: \{<b>text</b>:<font color="#800080">&quot;Big Bad Wolf.           A:42,   D:25&quot;</font>, test:<font color="#800080">&quot;Big Bad Wolf&quot;</font>\},\par
    2203: \{<b>text</b>:<font color="#800080">&quot;Tanto.                  A:43,   D:28&quot;</font>, test:<font color="#800080">&quot;Tanto&quot;</font>\},\par
    2204: \{<b>text</b>:<font color="#800080">&quot;String of Firecrackers. A:33,   D:46&quot;</font>, test:<font color="#800080">&quot;String of Firecrackers&quot;</font>\},\par
    2205: \{<b>text</b>:<font color="#800080">&quot;Raed Armored Sedan.     A:30,   D:47&quot;</font>, test:<font color="#800080">&quot;Raed Armored Sedan&quot;</font>\},\par
    2206: \{<b>text</b>:<font color="#800080">&quot;Deadly Impression.      A:28,   D:47&quot;</font>, test:<font color="#800080">&quot;Deadly Impression&quot;</font>\},\par
    2207: \{<b>text</b>:<font color="#800080">&quot;Cataclysmic.            A:53,   D:26&quot;</font>, test:<font color="#800080">&quot;Cataclysmic&quot;</font>\},\par
    2208: \{<b>text</b>:<font color="#800080">&quot;Savanna Baboon.         A:25,   D:54&quot;</font>, test:<font color="#800080">&quot;Savanna Baboon&quot;</font>\},\par
    2209: \{<b>text</b>:<font color="#800080">&quot;Snapping Turtle.        A:56,   D:25&quot;</font>, test:<font color="#800080">&quot;Snapping Turtle&quot;</font>\},\par
    2210: \{<b>text</b>:<font color="#800080">&quot;Duster.                 A:27,   D:56&quot;</font>, test:<font color="#800080">&quot;Duster&quot;</font>\},\par
    2211: \{<b>text</b>:<font color="#800080">&quot;Spiked Baton.           A:58,   D:28&quot;</font>, test:<font color="#800080">&quot;Spiked Baton&quot;</font>\},\par
    2212: \{<b>text</b>:<font color="#800080">&quot;Armored Biker Boots.    A:27,   D:59&quot;</font>, test:<font color="#800080">&quot;Armored Biker Boots&quot;</font>\},\par
    2213: \{<b>text</b>:<font color="#800080">&quot;Contender.              A:33,   D:63&quot;</font>, test:<font color="#800080">&quot;Contender&quot;</font>\},\par
    2214: \{<b>text</b>:<font color="#800080">&quot;Galapagos Hawk.         A:64,   D:32&quot;</font>, test:<font color="#800080">&quot;Galapagos Hawk&quot;</font>\},\par
    2215: \{<b>text</b>:<font color="#800080">&quot;Growler.                A:33,   D:65&quot;</font>, test:<font color="#800080">&quot;Growler&quot;</font>\},\par
    2216: \{<b>text</b>:<font color="#800080">&quot;Hack N Slash.           A:65,   D:35&quot;</font>, test:<font color="#800080">&quot;Hack N Slash&quot;</font>\},\par
    2217: \{<b>text</b>:<font color="#800080">&quot;Growler Firearm.        A:58,   D:45&quot;</font>, test:<font color="#800080">&quot;Growler Firearm&quot;</font>\},\par
    2218: \{<b>text</b>:<font color="#800080">&quot;Simian Safeguard.       A:43,   D:58&quot;</font>, test:<font color="#800080">&quot;Simian Safeguard&quot;</font>\},\par
    2219: \{<b>text</b>:<font color="#800080">&quot;Heat Seeker.            A:46,   D:60&quot;</font>, test:<font color="#800080">&quot;Heat Seeker&quot;</font>\},\par
    2220: \{<b>text</b>:<font color="#800080">&quot;Bayou Trike.            A:61,   D:48&quot;</font>, test:<font color="#800080">&quot;Bayou Trike&quot;</font>\},\par
    2221: \{<b>text</b>:<font color="#800080">&quot;California Condor.      A:42,   D:62&quot;</font>, test:<font color="#800080">&quot;California Condor&quot;</font>\},\par
    2222: \{<b>text</b>:<font color="#800080">&quot;Hook Sword.             A:72,   D:51&quot;</font>, test:<font color="#800080">&quot;Hook Sword&quot;</font>\},\par
    2223: \{<b>text</b>:<font color="#800080">&quot;Amur River Boat.        A:69,   D:50&quot;</font>, test:<font color="#800080">&quot;Amur River Boat&quot;</font>\},\par
    2224: \{<b>text</b>:<font color="#800080">&quot;Rhino Helmet.           A:71,   D:49&quot;</font>, test:<font color="#800080">&quot;Rhino Helmet&quot;</font>\},\par
    2225: \{<b>text</b>:<font color="#800080">&quot;Rhinoceros Beetle.      A:52,   D:72&quot;</font>, test:<font color="#800080">&quot;Rhinoceros Beetle&quot;</font>\},\par
    2226: \{<b>text</b>:<font color="#800080">&quot;Juvenile Tiger.         A:70,   D:51&quot;</font>, test:<font color="#800080">&quot;Juvenile Tiger&quot;</font>\},\par
    2227: \{<b>text</b>:<font color="#800080">&quot;Curled Horn Helm.       A:71,   D:51&quot;</font>, test:<font color="#800080">&quot;Curled Horn Helm&quot;</font>\},\par
    2228: \{<b>text</b>:<font color="#800080">&quot;Force Fire.             A:52,   D:70&quot;</font>, test:<font color="#800080">&quot;Force Fire&quot;</font>\},\par
    2229: \{<b>text</b>:<font color="#800080">&quot;Roadster Rage.          A:53,   D:72&quot;</font>, test:<font color="#800080">&quot;Roadster Rage&quot;</font>\},\par
    2230: \{<b>text</b>:<font color="#800080">&quot;Scottish Wild Cat.      A:71,   D:50&quot;</font>, test:<font color="#800080">&quot;Scottish Wild Cat&quot;</font>\},\par
    2231: \{<b>text</b>:<font color="#800080">&quot;Snow Crawler.           A:54,   D:72&quot;</font>, test:<font color="#800080">&quot;Snow Crawler&quot;</font>\},\par
    2232: \{<b>text</b>:<font color="#800080">&quot;Juggernaut.             A:65,   D:79&quot;</font>, test:<font color="#800080">&quot;Juggernaut&quot;</font>\},\par
    2233: \{<b>text</b>:<font color="#800080">&quot;King Cobra.             A:80,   D:62&quot;</font>, test:<font color="#800080">&quot;King Cobra&quot;</font>\},\par
    2234: \{<b>text</b>:<font color="#800080">&quot;Pisces Harpoon Gun.     A:64,   D:78&quot;</font>, test:<font color="#800080">&quot;Pisces Harpoon Gun&quot;</font>\},\par
    2235: \{<b>text</b>:<font color="#800080">&quot;Sheet Metal Blade.      A:79,   D:63&quot;</font>, test:<font color="#800080">&quot;Sheet Metal Blade&quot;</font>\},\par
    2236: \{<b>text</b>:<font color="#800080">&quot;Tlingit Parka.          A:64,   D:81&quot;</font>, test:<font color="#800080">&quot;Tlingit Parka&quot;</font>\},\par
    2237: \{<b>text</b>:<font color="#800080">&quot;Deimos Dagger.          A:78,   D:65&quot;</font>, test:<font color="#800080">&quot;Deimos Dagger&quot;</font>\},\par
    2238: \{<b>text</b>:<font color="#800080">&quot;Leg Up.                 A:80,   D:61&quot;</font>, test:<font color="#800080">&quot;Leg Up&quot;</font>\},\par
    2239: \{<b>text</b>:<font color="#800080">&quot;Mud Crawler.            A:60,   D:81&quot;</font>, test:<font color="#800080">&quot;Mud Crawler&quot;</font>\},\par
    2240: \{<b>text</b>:<font color="#800080">&quot;Zorse.                  A:81,   D:66&quot;</font>, test:<font color="#800080">&quot;Zorse&quot;</font>\},\par
    2241: \{<b>text</b>:<font color="#800080">&quot;Orangutan.              A:82,   D:68&quot;</font>, test:<font color="#800080">&quot;Orangutan&quot;</font>\},\par
    2242: \{<b>text</b>:<font color="#800080">&quot;Night on the Town.      A:72,   D:88&quot;</font>, test:<font color="#800080">&quot;Night on the Town&quot;</font>\},\par
    2243: \{<b>text</b>:<font color="#800080">&quot;Huntsman.               A:75,   D:89&quot;</font>, test:<font color="#800080">&quot;Huntsman&quot;</font>\},\par
    2244: \{<b>text</b>:<font color="#800080">&quot;Beluga Jumbo Jet.       A:90,   D:70&quot;</font>, test:<font color="#800080">&quot;Beluga Jumbo Jet&quot;</font>\},\par
    2245: \{<b>text</b>:<font color="#800080">&quot;Longhorn Limo.          A:91,   D:75&quot;</font>, test:<font color="#800080">&quot;Longhorn Limo&quot;</font>\},\par
    2246: \{<b>text</b>:<font color="#800080">&quot;Kaka.                   A:79,   D:92&quot;</font>, test:<font color="#800080">&quot;Kaka&quot;</font>\},\par
    2247: \{<b>text</b>:<font color="#800080">&quot;Speak Quietly.          A:75,   D:90&quot;</font>, test:<font color="#800080">&quot;Speak Quietly&quot;</font>\},\par
    2248: \{<b>text</b>:<font color="#800080">&quot;Personal Shield.        A:92,   D:72&quot;</font>, test:<font color="#800080">&quot;Personal Shield&quot;</font>\},\par
    2249: \{<b>text</b>:<font color="#800080">&quot;Offwhite Rabbit.        A:90,   D:73&quot;</font>, test:<font color="#800080">&quot;Offwhite Rabbit&quot;</font>\},\par
    2250: \{<b>text</b>:<font color="#800080">&quot;Rhino Lifter.           A:76,   D:91&quot;</font>, test:<font color="#800080">&quot;Rhino Lifter&quot;</font>\},\par
    2251: \{<b>text</b>:<font color="#800080">&quot;Emu.                    A:75,   D:92&quot;</font>, test:<font color="#800080">&quot;Emu&quot;</font>\},\par
    2252: \{<b>text</b>:<font color="#800080">&quot;Hybrid Flight.          A:98,   D:81&quot;</font>, test:<font color="#800080">&quot;Hybrid Flight&quot;</font>\},\par
    2253: \{<b>text</b>:<font color="#800080">&quot;Sloth Bear.             A:82,   D:97&quot;</font>, test:<font color="#800080">&quot;Sloth Bear&quot;</font>\},\par
    2254: \{<b>text</b>:<font color="#800080">&quot;Shark Saw.              A:99,   D:81&quot;</font>, test:<font color="#800080">&quot;Shark Saw&quot;</font>\},\par
    2255: \{<b>text</b>:<font color="#800080">&quot;Penguin Tux.            A:98,   D:80&quot;</font>, test:<font color="#800080">&quot;Penguin Tux&quot;</font>\},\par
    2256: \{<b>text</b>:<font color="#800080">&quot;Paraglider.             A:100,  D:79&quot;</font>, test:<font color="#800080">&quot;Paraglider&quot;</font>\}\par
\}\par
\par
<b>var </b>MW_SecretMissions = \{\par
    2301: \{<b>text</b>:<font color="#800080">&quot;Truck Hijacking (Easy)&quot;</font>,               test:<font color="#800080">&quot;Truck Hijacking&quot;</font>\},\par
    2302: \{<b>text</b>:<font color="#800080">&quot;Bribe A Contact (Easy)&quot;</font>,               test:<font color="#800080">&quot;Bribe A Contact&quot;</font>\},\par
    2311: \{<b>text</b>:<font color="#800080">&quot;Narco Trafficking (Easy)&quot;</font>,             test:<font color="#800080">&quot;Narco Trafficking&quot;</font>\},\par
    2315: \{<b>text</b>:<font color="#800080">&quot;Assassinate The Witness (Easy)&quot;</font>,       test:<font color="#800080">&quot;Assassinate The Witness&quot;</font>\},\par
    2303: \{<b>text</b>:<font color="#800080">&quot;Bank Robbery (Medium)&quot;</font>,                test:<font color="#800080">&quot;Bank Robbery&quot;</font>\},\par
    2356: \{<b>text</b>:<font color="#800080">&quot;Kidnap the Governor's Daughter&quot;</font>,      test:<font color="#800080">&quot;Kidnap the Governor's Daughter&quot;</font>\},\par
    2304: \{<b>text</b>:<font color="#800080">&quot;Fight Off A Rival Mafia (Medium)&quot;</font>,     test:<font color="#800080">&quot;Fight Off A Rival Mafia&quot;</font>\},\par
    2305: \{<b>text</b>:<font color="#800080">&quot;Bribe A Government Official (Medium)&quot;</font>, test:<font color="#800080">&quot;Bribe A Government Official&quot;</font>\},\par
    2310: \{<b>text</b>:<font color="#800080">&quot;Hijack An Ocean Liner (Medium)&quot;</font>,       test:<font color="#800080">&quot;Hijack An Ocean Liner&quot;</font>\},\par
    2316: \{<b>text</b>:<font color="#800080">&quot;Take Over Airport Control (Medium)&quot;</font>,   test:<font color="#800080">&quot;Take Over Airport Control&quot;</font>\},\par
    2306: \{<b>text</b>:<font color="#800080">&quot;Steal A Dockyard Shipment (Hard)&quot;</font>,     test:<font color="#800080">&quot;Steal A Dockyard Shipment&quot;</font>\},\par
    2307: \{<b>text</b>:<font color="#800080">&quot;Take Out A Rival Operation (Hard)&quot;</font>,    test:<font color="#800080">&quot;Take Out A Rival Operation&quot;</font>\},\par
    2308: \{<b>text</b>:<font color="#800080">&quot;Transport Stolen Uranium (Hard)&quot;</font>,      test:<font color="#800080">&quot;Transport Stolen Uranium&quot;</font>\},\par
    2309: \{<b>text</b>:<font color="#800080">&quot;Evade The Coast Guard (Hard)&quot;</font>,         test:<font color="#800080">&quot;Evade The Coast Guard&quot;</font>\},\par
    2312: \{<b>text</b>:<font color="#800080">&quot;Frame a Rival Don (Medium)&quot;</font>,           test:<font color="#800080">&quot;Frame a Rival Don&quot;</font>\},\par
    2313: \{<b>text</b>:<font color="#800080">&quot;Steal Government Research (Hard)&quot;</font>,     test:<font color="#800080">&quot;Steal Government Research&quot;</font>\},\par
    2314: \{<b>text</b>:<font color="#800080">&quot;Fix the Triple Crown (Hard)&quot;</font>,          test:<font color="#800080">&quot;Fix the Triple Crown&quot;</font>\},\par
  <i>//2317    \{text:&quot;&quot;,                                     test:&quot;&quot;\},\par
    </i>2350: \{<b>text</b>:<font color="#800080">&quot;Crash the Mayor's Halloween Party&quot;</font>,    test:<font color="#800080">&quot;Crash the Mayor&quot;</font>\},\par
    2351: \{<b>text</b>:<font color="#800080">&quot;Holiday Traffic (Thanksgiving)&quot;</font>,       test:<font color="#800080">&quot;Holiday Traffic&quot;</font>\},\par
    2352: \{<b>text</b>:<font color="#800080">&quot;Stuff The Bird&quot;</font>,                       test:<font color="#800080">&quot;Stuff The Bird&quot;</font>\},\par
    2353: \{<b>text</b>:<font color="#800080">&quot;Secret Santa&quot;</font>,                         test:<font color="#800080">&quot;Secret Santa&quot;</font>\},\par
    2354: \{<b>text</b>:<font color="#800080">&quot;Secure Rudolph (Medium)&quot;</font>,              test:<font color="#800080">&quot;Secure Rudolph&quot;</font>\},\par
    2355: \{<b>text</b>:<font color="#800080">&quot;Steal The Ball&quot;</font>,                       test:<font color="#800080">&quot;Steal The Ball&quot;</font>\},\par
    2399: \{<b>text</b>:<font color="#800080">&quot;Unknown(new or limited) Missions&quot;</font>\}\par
  \}\par
\par
<b>var </b>FV_general = \{\par
    3050: \{<b>text</b>:<font color="#800080">&quot;Bonuses/Coins&quot;</font>,      img_test:/Do you want to collect (.*) Coins|Would you like (.*) coins instead/i\},\par
    3051: \{<b>text</b>:<font color="#800080">&quot;Experience&quot;</font>,         img_test:/consume_xp_icon.png/i\},\par
    3052: \{<b>text</b>:<font color="#800080">&quot;Free Fuel&quot;</font>,          img_test:/equip_gas_can_icon.png|fuelgift1.png|givefuel_feed.png/i\},\par
    3053: \{<b>text</b>:<font color="#800080">&quot;Farmhand&quot;</font>,           img_test:/deco_farmhands_icon.png/i\},\par
    3054: \{<b>text</b>:<font color="#800080">&quot;Arborist&quot;</font>,           img_test:/deco_arborists_icon.png/i\},\par
    3055: \{<b>text</b>:<font color="#800080">&quot;Wandering Stallion&quot;</font>, img_test:/Do you want to give the Wandering Stallion shelter <b>for </b>the night/i\},\par
    3056: \{<b>text</b>:<font color="#800080">&quot;Barn Raising&quot;</font>,       img_test:/Would you like to help (.*) <b>with </b>their barn raising/i\}\par
  \}\par
\par
<b>var </b>FV_eggs = \{\par
    3100: \{<b>text</b>:<font color="#800080">&quot;White Egg&quot;</font>,            img_test:/deco_egg_icon.png/i\},\par
    3101: \{<b>text</b>:<font color="#800080">&quot;Brown Egg&quot;</font>,            img_test:/deco_egg_brown_icon.png/i\},\par
    3102: \{<b>text</b>:<font color="#800080">&quot;Black Egg&quot;</font>,            img_test:/deco_egg_black_icon.png/i\},\par
    3103: \{<b>text</b>:<font color="#800080">&quot;Gold Egg&quot;</font>,             img_test:/deco_egg_gold_icon.png/i\},\par
    3104: \{<b>text</b>:<font color="#800080">&quot;Cornish Egg&quot;</font>,          img_test:/deco_egg_cornish_icon.png/i\},\par
    3105: \{<b>text</b>:<font color="#800080">&quot;Scots Grey Egg&quot;</font>,       img_test:/deco_egg_scots_icon.png/i\},\par
    3106: \{<b>text</b>:<font color="#800080">&quot;Rhode Island Red Egg&quot;</font>, img_test:/deco_egg_rhode_icon.png/i\},\par
    3199: \{<b>text</b>:<font color="#800080">&quot;Unknown&quot;</font>,              img_test:/deco_egg_/i\}\par
  \}\par
\par
<b>var </b>FV_flowers = \{\par
    3201: \{<b>text</b>:<font color="#800080">&quot;Lilac&quot;</font>,            img_test:/flower_iris_icon.png/i\},\par
    3202: \{<b>text</b>:<font color="#800080">&quot;Daffodils&quot;</font>,        img_test:/flower_daffodil_icon.png/i\},\par
    3203: \{<b>text</b>:<font color="#800080">&quot;Morning Glory&quot;</font>,    img_test:/flower_bluemorningglory_icon.png/i\},\par
    3204: \{<b>text</b>:<font color="#800080">&quot;Red Tulips&quot;</font>,       img_test:/flower_tulipred_icon.png/i\},\par
    3205: \{<b>text</b>:<font color="#800080">&quot;Pink Roses&quot;</font>,       img_test:/flower_rosepink_icon.png/i\},\par
    3206: \{<b>text</b>:<font color="#800080">&quot;Sunflowers&quot;</font>,       img_test:/flower_sunflower_icon.png/i\},\par
    3207: \{<b>text</b>:<font color="#800080">&quot;Lavender&quot;</font>,         img_test:/flower_lavender_icon.png/i\},\par
    3208: \{<b>text</b>:<font color="#800080">&quot;Lilies&quot;</font>,           img_test:/flower_lilies_icon.png/i\},\par
    3209: \{<b>text</b>:<font color="#800080">&quot;Purple Poppies&quot;</font>,   img_test:/flower_poppiepurple_icon.png/i\},\par
    3210: \{<b>text</b>:<font color="#800080">&quot;Iris&quot;</font>,             img_test:/flower_iris_icon.png/i\},\par
    3211: \{<b>text</b>:<font color="#800080">&quot;Fire &amp; Ice Roses&quot;</font>, img_test:/flower_fire_ice_rose_icon.png/i\},\par
    3212: \{<b>text</b>:<font color="#800080">&quot;Forget-Me-Not&quot;</font>,    img_test:/flower_forgetmenot_icon.png/i\},\par
    3213: \{<b>text</b>:<font color="#800080">&quot;Golden Poppies&quot;</font>,   img_test:/flower_poppiegolden_icon.png/i\},\par
    3214: \{<b>text</b>:<font color="#800080">&quot;Lotus&quot;</font>,            img_test:/flower_lotus_icon.png/i\},\par
    3215: \{<b>text</b>:<font color="#800080">&quot;Poinsettia&quot;</font>,       img_test:/flower_poinsettia_icon.png/i\},\par
    3216: \{<b>text</b>:<font color="#800080">&quot;White Roses&quot;</font>,      img_test:/flower_rosewhite_icon.png/i\},\par
    3217: \{<b>text</b>:<font color="#800080">&quot;Yellow Roses&quot;</font>,     img_test:/flower_roseyellow_icon.png/i\},\par
    3218: \{<b>text</b>:<font color="#800080">&quot;Green Hellebores&quot;</font>, img_test:/flower_rosehellebores_icon.png/i\},\par
    3219: \{<b>text</b>:<font color="#800080">&quot;Green Roses&quot;</font>,      img_test:/flower_rosegreen_icon.png/i\},\par
    3220: \{<b>text</b>:<font color="#800080">&quot;Saffron&quot;</font>,          img_test:/flower_saffron_icon.png/i\},\par
    3221: \{<b>text</b>:<font color="#800080">&quot;Shamrock&quot;</font>,         img_test:/flower_shamrock_icon.png/i\},\par
    3222: \{<b>text</b>:<font color="#800080">&quot;Pink Hibiscus&quot;</font>,    img_test:/flower_hibiscuspink_icon.png/i\},\par
    3223: \{<b>text</b>:<font color="#800080">&quot;Flamingo&quot;</font>,         img_test:/flower_flamingo_icon.png/i\},\par
    3299: \{<b>text</b>:<font color="#800080">&quot;Unknown&quot;</font>,          img_test:/flower_/i\}\par
  \}\par
\par
<b>var </b>FV_animals = \{\par
    3300: \{<b>text</b>:<font color="#800080">&quot;Alpaca&quot;</font>,               img_test:/animal_alpaca_icon.png/i\},\par
    3301: \{<b>text</b>:<font color="#800080">&quot;Angora Rabbit&quot;</font>,        img_test:/animal_rabbit_angora_icon.png/i\},\par
    3302: \{<b>text</b>:<font color="#800080">&quot;Appaloosa&quot;</font>,            img_test:/animal_appaloosa_icon.png/i\},\par
    3303: \{<b>text</b>:<font color="#800080">&quot;Appaloosa Foal&quot;</font>,       img_test:/animal_foal_appaloosa_icon.png/i\},\par
    3304: \{<b>text</b>:<font color="#800080">&quot;Arapawa Goat&quot;</font>,         img_test:/animal_goat_arapawa_icon.png/i\},\par
    3308: \{<b>text</b>:<font color="#800080">&quot;Baby Turkey&quot;</font>,          img_test:/animal_turkey_baby_icon.png/i\},\par
    3309: \{<b>text</b>:<font color="#800080">&quot;Baby White Tiger&quot;</font>,     img_test:/animal_tiger_white_icon.png/i\},\par
    3311: \{<b>text</b>:<font color="#800080">&quot;Belted Calf&quot;</font>,          img_test:/animal_calf_belted_icon.png|calf_belted_stork.png/i\},\par
    3312: \{<b>text</b>:<font color="#800080">&quot;Belted Cow&quot;</font>,           img_test:/animal_cow_belted_icon.png/i\},\par
    3313: \{<b>text</b>:<font color="#800080">&quot;Big Horn Sheep&quot;</font>,       img_test:/animal_sheep_bighorn_icon.png/i\},\par
    3315: \{<b>text</b>:<font color="#800080">&quot;Black Chicken&quot;</font>,        img_test:/animal_chicken_black_icon.png/i\},\par
    3316: \{<b>text</b>:<font color="#800080">&quot;Black Foal&quot;</font>,           img_test:/animal_foal_black_icon.png/i\},\par
    3317: \{<b>text</b>:<font color="#800080">&quot;Black Horse&quot;</font>,          img_test:/animal_horse_black_icon.png/i\},\par
    3318: \{<b>text</b>:<font color="#800080">&quot;Black Sheep&quot;</font>,          img_test:/sheep_black_sad.png/i\},\par
    3319: \{<b>text</b>:<font color="#800080">&quot;Black Pig&quot;</font>,            img_test:/animal_pig_black_icon.png/i\},\par
    3475: \{<b>text</b>:<font color="#800080">&quot;Black Pony&quot;</font>,           img_test:/animal_pony_swiss_icon.png/i\},\par
    3320: \{<b>text</b>:<font color="#800080">&quot;Black Yak&quot;</font>,            img_test:/animal_yak_black_icon.png/i\},\par
    3321: \{<b>text</b>:<font color="#800080">&quot;Blue Pony Foal&quot;</font>,       img_test:/animal_foal_pony_blue_icon.png/i\},\par
    3322: \{<b>text</b>:<font color="#800080">&quot;Bobcat&quot;</font>,               img_test:/animal_bobcat_icon/i\},\par
    3323: \{<b>text</b>:<font color="#800080">&quot;Boer Goat&quot;</font>,            img_test:/animal_goat_boer_icon.png/i\},\par
    3324: \{<b>text</b>:<font color="#800080">&quot;Brown Calf&quot;</font>,           img_test:/animal_calf_brown_icon.png|calf_brown_stork.png/i\},\par
    3325: \{<b>text</b>:<font color="#800080">&quot;Brown Chicken&quot;</font>,        img_test:/animal_chicken_brown_icon.png/i\},\par
    3326: \{<b>text</b>:<font color="#800080">&quot;Brown Cow&quot;</font>,            img_test:/animal_cow_brown_icon.png/i\},\par
    3327: \{<b>text</b>:<font color="#800080">&quot;Brown Foal&quot;</font>,           img_test:/animal_foal_icon.png/i\},\par
    3328: \{<b>text</b>:<font color="#800080">&quot;Brown Goose&quot;</font>,          img_test:/animal_goose_icon.png/i\},\par
    3329: \{<b>text</b>:<font color="#800080">&quot;Brown Pony&quot;</font>,           img_test:/animal_pony_icon.png/i\},\par
    3330: \{<b>text</b>:<font color="#800080">&quot;Buck&quot;</font>,                 img_test:/animal_deer_icon.png/i\},\par
    3332: \{<b>text</b>:<font color="#800080">&quot;Buffalo&quot;</font>,              img_test:/animal_buffalo_icon.png/i\},\par
    3333: \{<b>text</b>:<font color="#800080">&quot;Bull&quot;</font>,                 img_test:/bull_sad.png/i\},\par
    3334: \{<b>text</b>:<font color="#800080">&quot;Caiman Lizard&quot;</font>,        img_test:/animal_lizard_caiman_icon.png/i\},\par
    3335: \{<b>text</b>:<font color="#800080">&quot;Calf&quot;</font>,                 img_test:/animal_calf_icon.png|calf_stork.png/i\},\par
    3336: \{<b>text</b>:<font color="#800080">&quot;Chicken&quot;</font>,              img_test:/animal_chicken_icon.png/i\},\par
    3339: \{<b>text</b>:<font color="#800080">&quot;Chinchilla&quot;</font>,           img_test:/animal_chinchilla_icon.png/i\},\par
    3340: \{<b>text</b>:<font color="#800080">&quot;Chocolate Calf&quot;</font>,       img_test:/animal_calf_brownchocolate_icon.png/i\},\par
    3341: \{<b>text</b>:<font color="#800080">&quot;Chocolate Cow&quot;</font>,        img_test:/animal_cow_brownchocolate_icon.png/i\},\par
    3342: \{<b>text</b>:<font color="#800080">&quot;Circus Elephant&quot;</font>,      img_test:/animal_elephant_circus_icon.png/i\},\par
    3344: \{<b>text</b>:<font color="#800080">&quot;Clydesdale Horse&quot;</font>,     img_test:/animal_clydesdale_icon.png/i\},\par
    3345: \{<b>text</b>:<font color="#800080">&quot;Clydesdale Foal&quot;</font>,      img_test:/animal_foal_clydesdale_icon.png/i\},\par
    3346: \{<b>text</b>:<font color="#800080">&quot;Cornish Chicken&quot;</font>,      img_test:/animal_chicken_cornish_icon.png/i\},\par
    3347: \{<b>text</b>:<font color="#800080">&quot;Cow&quot;</font>,                  img_test:/cow_sad.png/i\},\par
    3348: \{<b>text</b>:<font color="#800080">&quot;Cream Draft Foal&quot;</font>,     img_test:/animal_foal_clydesdale_cream_icon.png/i\},\par
    3349: \{<b>text</b>:<font color="#800080">&quot;Cream Draft Horse&quot;</font>,    img_test:/animal_clydesdale_cream_icon.png/i\},\par
    3350: \{<b>text</b>:<font color="#800080">&quot;Desert Tortoise&quot;</font>,      img_test:/animal_deserttortoise_icon.png/i\},\par
    3351: \{<b>text</b>:<font color="#800080">&quot;Doe&quot;</font>,                  img_test:/animal_doe_icon.png/i\},\par
    3352: \{<b>text</b>:<font color="#800080">&quot;Donkey&quot;</font>,               img_test:/animal_donkey_icon.png/i\},\par
    3353: \{<b>text</b>:<font color="#800080">&quot;Duck&quot;</font>,                 img_test:/animal_duck_icon.png/i\},\par
    3354: \{<b>text</b>:<font color="#800080">&quot;Dutch Rabbit&quot;</font>,         img_test:/animal_rabbit_dutch_icon.png/i\},\par
    3355: \{<b>text</b>:<font color="#800080">&quot;Elk&quot;</font>,                  img_test:/animal_elk_icon.png/i\},\par
    3356: \{<b>text</b>:<font color="#800080">&quot;Emperor Penguin&quot;</font>,      img_test:/animal_penguin_emperor_icon.png/i\},\par
    3360: \{<b>text</b>:<font color="#800080">&quot;Gazelle&quot;</font>,              img_test:/animal_gazelle_icon.png/i\},\par
    3361: \{<b>text</b>:<font color="#800080">&quot;Giant Panda&quot;</font>,          img_test:/animal_panda_icon.png/i\},\par
    3362: \{<b>text</b>:<font color="#800080">&quot;Gila Monster&quot;</font>,         img_test:/animal_gilamonster_icon.png/i\},\par
    3363: \{<b>text</b>:<font color="#800080">&quot;Goat&quot;</font>,                 img_test:/animal_goat_icon.png/i\},\par
    3364: \{<b>text</b>:<font color="#800080">&quot;Golden Chicken&quot;</font>,       img_test:/animal_chicken_golden_icon.png/i\},\par
    3366: \{<b>text</b>:<font color="#800080">&quot;Gray Horse&quot;</font>,           img_test:/animal_horse_gray_icon.png/i\},\par
    3367: \{<b>text</b>:<font color="#800080">&quot;Gray Rabbit&quot;</font>,          img_test:/animal_rabbit_gray_icon.png/i\},\par
    3368: \{<b>text</b>:<font color="#800080">&quot;Green Calf&quot;</font>,           img_test:/animal_calf_green_icon.png/i\},\par
    3369: \{<b>text</b>:<font color="#800080">&quot;Green Mallard&quot;</font>,        img_test:/animal_duck_green_icon.png/i\},\par
    3370: \{<b>text</b>:<font color="#800080">&quot;Grey Foal&quot;</font>,            img_test:/animal_foal_gray_icon.png/i\},\par
    3371: \{<b>text</b>:<font color="#800080">&quot;Grey Goose&quot;</font>,           img_test:/animal_goose_grey_icon.png/i\},\par
    3372: \{<b>text</b>:<font color="#800080">&quot;Grey Tabby&quot;</font>,           img_test:/animal_cat_grey_icon.png/i\},\par
    3373: \{<b>text</b>:<font color="#800080">&quot;Groovy Calf&quot;</font>,          img_test:/calf_groovy_sad.png|animal_calf_groovy_icon.png/i\},\par
    3374: \{<b>text</b>:<font color="#800080">&quot;Groovy Cow&quot;</font>,           img_test:/cow_groovy_sad.png/i\},\par
    3375: \{<b>text</b>:<font color="#800080">&quot;Groovy Goat&quot;</font>,          img_test:/animal_goat_groovy_icon.png/i\},\par
    3376: \{<b>text</b>:<font color="#800080">&quot;Haflinger Horse&quot;</font>,      img_test:/animal_horse_haflinger_icon.png/i\},\par
    3377: \{<b>text</b>:<font color="#800080">&quot;Haflinger Foal&quot;</font>,       img_test:/animal_foal_haflinger_icon.png/i\},\par
    3380: \{<b>text</b>:<font color="#800080">&quot;Holstein Calf&quot;</font>,        img_test:/animal_calf_holstein_icon.png/i\},\par
    3381: \{<b>text</b>:<font color="#800080">&quot;Holstein Cow&quot;</font>,         img_test:/animal_cow_holstein_icon.png/i\},\par
    3382: \{<b>text</b>:<font color="#800080">&quot;Horse&quot;</font>,                img_test:/animal_horse_icon.png/i\},\par
    3384: \{<b>text</b>:<font color="#800080">&quot;Hot Pink Pig&quot;</font>,         img_test:/animal_pig_hotpink_icon.png/i\},\par
    3386: \{<b>text</b>:<font color="#800080">&quot;Indian Elephant&quot;</font>,      img_test:/animal_elephant_indian_icon.png/i\},\par
    3387: \{<b>text</b>:<font color="#800080">&quot;Indian Yak&quot;</font>,           img_test:/animal_yak_icon.png/i\},\par
    3390: \{<b>text</b>:<font color="#800080">&quot;Jackalope&quot;</font>,            img_test:/animal_jackalope_icon.png/i\},\par
    3391: \{<b>text</b>:<font color="#800080">&quot;Jackrabbit&quot;</font>,           img_test:/animal_jackrabbit_icon.png/i\},\par
    3392: \{<b>text</b>:<font color="#800080">&quot;Kangaroo&quot;</font>,             img_test:/animal_kangaroo_icon.png/i\},\par
    3397: \{<b>text</b>:<font color="#800080">&quot;Light Blue Pony&quot;</font>,      img_test:/animal_pony_blue_icon.png/i\},\par
    3400: \{<b>text</b>:<font color="#800080">&quot;Llama&quot;</font>,                img_test:/animal_lama_icon.png/i\},\par
    3402: \{<b>text</b>:<font color="#800080">&quot;Longhorn Calf&quot;</font>,        img_test:/animal_calf_longhorn_icon.png/i\},\par
    3403: \{<b>text</b>:<font color="#800080">&quot;Longhorn Cow&quot;</font>,         img_test:/animal_cow_longhorn_icon.png/i\},\par
    3409: \{<b>text</b>:<font color="#800080">&quot;Moose&quot;</font>,                img_test:/animal_moose_icon.png/i\},\par
    3411: \{<b>text</b>:<font color="#800080">&quot;Mustang&quot;</font>,              img_test:/animal_mustang_icon.png/i\},\par
    3412: \{<b>text</b>:<font color="#800080">&quot;Mustang Foal&quot;</font>,         img_test:/animal_foal_mustang_icon.png/i\},\par
    3413: \{<b>text</b>:<font color="#800080">&quot;Neapolitan Calf&quot;</font>,      img_test:/animal_calf_neapolitan_icon.png/i\},\par
    3414: \{<b>text</b>:<font color="#800080">&quot;Neapolitan Cow&quot;</font>,       img_test:/animal_cow_neapolitan_icon.png/i\},\par
    3416: \{<b>text</b>:<font color="#800080">&quot;Ossabaw Pig&quot;</font>,          img_test:/animal_pig_ossabaw_icon.png/i\},\par
    3417: \{<b>text</b>:<font color="#800080">&quot;Ox&quot;</font>,                   img_test:/animal_oxen_icon.png/i\},\par
    3418: \{<b>text</b>:<font color="#800080">&quot;Peacock&quot;</font>,              img_test:/animal_peacock_icon.png/i\},\par
    3419: \{<b>text</b>:<font color="#800080">&quot;Peeper Frog&quot;</font>,          img_test:/animal_frog_peeper_icon.png/i\},\par
    3420: \{<b>text</b>:<font color="#800080">&quot;Pelican&quot;</font>,              img_test:/animal_pelican_icon.png/i\},\par
    3421: \{<b>text</b>:<font color="#800080">&quot;Penguin&quot;</font>,              img_test:/animal_penguin_icon.png/i\},\par
    3424: \{<b>text</b>:<font color="#800080">&quot;Pig&quot;</font>,                  img_test:/animal_pig_icon.png/i\},\par
    3425: \{<b>text</b>:<font color="#800080">&quot;Pink Calf&quot;</font>,            img_test:/calf_pink_sad.png|calf_pink_stork.png/i\},\par
    3426: \{<b>text</b>:<font color="#800080">&quot;Pink Cow&quot;</font>,             img_test:/cow_pink_sad.png/i\},\par
    3427: \{<b>text</b>:<font color="#800080">&quot;Pink-Hair Pony&quot;</font>,       img_test:/animal_pony_pink_icon.png/i\},\par
    3428: \{<b>text</b>:<font color="#800080">&quot;Pink Patch Calf&quot;</font>,      img_test:/animal_calf_pinkpatch_icon.png/i\},\par
    3429: \{<b>text</b>:<font color="#800080">&quot;Pink Patch Cow&quot;</font>,       img_test:/animal_cow_pinkpatch_icon.png/i\},\par
    3430: \{<b>text</b>:<font color="#800080">&quot;Pink Pony Foal&quot;</font>,       img_test:/animal_foal_pony_pink_icon.png/i\},\par
    3431: \{<b>text</b>:<font color="#800080">&quot;Pinto Foal&quot;</font>,           img_test:/animal_foal_pinto_icon.png/i\},\par
    3432: \{<b>text</b>:<font color="#800080">&quot;Polar Bear Cub&quot;</font>,       img_test:/animal_polarbear_icon.png/i\},\par
    3433: \{<b>text</b>:<font color="#800080">&quot;Pinto Horse&quot;</font>,          img_test:/animal_horse_pinto_icon.png/i\},\par
    3434: \{<b>text</b>:<font color="#800080">&quot;Pony Foal&quot;</font>,            img_test:/animal_foal_pony_icon.png/i\},\par
    3435: \{<b>text</b>:<font color="#800080">&quot;Porcupine&quot;</font>,            img_test:/animal_porcupine_icon.png/i\},\par
    3436: \{<b>text</b>:<font color="#800080">&quot;Pot Belly Pig&quot;</font>,        img_test:/animal_pig_potbelly_icon.png/i\},\par
    3437: \{<b>text</b>:<font color="#800080">&quot;Prairie Dog&quot;</font>,          img_test:/animal_prairiedog_icon.png/i\},\par
    3439: \{<b>text</b>:<font color="#800080">&quot;Purple Frog&quot;</font>,          img_test:/animal_frog_purple_icon.png/i\},\par
    3440: \{<b>text</b>:<font color="#800080">&quot;Purple Mane Pony&quot;</font>,     img_test:/animal_pony_purple_icon.png/i\},\par
    3441: \{<b>text</b>:<font color="#800080">&quot;Purple Pony Foal&quot;</font>,     img_test:/animal_foal_pony_purple_icon.png/i\},\par
    3442: \{<b>text</b>:<font color="#800080">&quot;Pygmy Goat&quot;</font>,           img_test:/animal_goat_pygmy_icon.png/i\},\par
    3443: \{<b>text</b>:<font color="#800080">&quot;Rabbit&quot;</font>,               img_test:/animal_rabbit_icon.png/i\},\par
    3444: \{<b>text</b>:<font color="#800080">&quot;Reindeer&quot;</font>,             img_test:/animal_reindeer_icon.png/i\},\par
    3445: \{<b>text</b>:<font color="#800080">&quot;Referee Cow&quot;</font>,          img_test:/animal_cow_referee_icon.png/i\},\par
    3446: \{<b>text</b>:<font color="#800080">&quot;Referee Cow (Yellow)&quot;</font>, img_test:/animal_cow_referee_yellow_icon.png/i\},\par
    3447: \{<b>text</b>:<font color="#800080">&quot;Red Panda&quot;</font>,            img_test:/animal_redpanda_icon.png/i\},\par
    3449: \{<b>text</b>:<font color="#800080">&quot;Road Runner&quot;</font>,          img_test:/animal_roadrunner_icon.png/i\},\par
    3450: \{<b>text</b>:<font color="#800080">&quot;Saanens Goat&quot;</font>,         img_test:/animal_goat_saanens_icon.png/i\},\par
    3452: \{<b>text</b>:<font color="#800080">&quot;Scots Grey Chicken&quot;</font>,   img_test:/animal_chicken_scotsgrey_icon.png/i\},\par
    3454: \{<b>text</b>:<font color="#800080">&quot;Sheep&quot;</font>,                img_test:/animal_sheep_icon.png/i\},\par
    3456: \{<b>text</b>:<font color="#800080">&quot;Spaghetti Sheep&quot;</font>,      img_test:/animal_sheep_spaghetti_icon.png/i\},\par
    3459: \{<b>text</b>:<font color="#800080">&quot;Swan&quot;</font>,                 img_test:/animal_swan_icon.png/i\},\par
    3460: \{<b>text</b>:<font color="#800080">&quot;Toggenburg Goat&quot;</font>,      img_test:/animal_goat_toggenburg_icon.png/i\},\par
    3461: \{<b>text</b>:<font color="#800080">&quot;Treasure Seagull&quot;</font>,     img_test:/animal_seagull_icon.png/i\},\par
    3462: \{<b>text</b>:<font color="#800080">&quot;Turkey&quot;</font>,               img_test:/animal_turkey_icon.png/i\},\par
    3463: \{<b>text</b>:<font color="#800080">&quot;Turtle&quot;</font>,               img_test:/animal_turtle_icon.png/i\},\par
    3464: \{<b>text</b>:<font color="#800080">&quot;Tuscan Calf&quot;</font>,          img_test:/animal_calf_tuscan_icon.png|calf_tuscan_stork.png/i\},\par
    3465: \{<b>text</b>:<font color="#800080">&quot;Tuscan Cow&quot;</font>,           img_test:/animal_cow_tuscan_icon.png/i\},\par
    3466: \{<b>text</b>:<font color="#800080">&quot;Ugly Duckling&quot;</font>,        img_test:/uglyduck_sad.png/i\},\par
    3467: \{<b>text</b>:<font color="#800080">&quot;Valley Quail&quot;</font>,         img_test:/animal_quail_icon.png/i\},\par
    3470: \{<b>text</b>:<font color="#800080">&quot;White Peacock&quot;</font>,        img_test:/animal_peacock_white_icon.png/i\},\par
    3471: \{<b>text</b>:<font color="#800080">&quot;White Stallion&quot;</font>,       img_test:/animal_stallion_white_icon.png/i\},\par
    3473: \{<b>text</b>:<font color="#800080">&quot;Woodchuck&quot;</font>,            img_test:/animal_woodchuck_icon.png/i\},\par
    3474: \{<b>text</b>:<font color="#800080">&quot;Party Duck&quot;</font>,           img_test:/birthday_sad.png/i\},\par
    3599: \{<b>text</b>:<font color="#800080">&quot;Unknown&quot;</font>,              img_test:/animal_/i\}\par
   \}\par
\par
<b>var </b>FV_bushels = \{\par
    3600: \{<b>text</b>:<font color="#800080">&quot;Acorn Squash&quot;</font>,    img_test:/bushel_acornsquash_icon.png/i\},\par
    3601: \{<b>text</b>:<font color="#800080">&quot;Aloe Vera&quot;</font>,       img_test:/bushel_aloevera_icon.png/i\},\par
    3602: \{<b>text</b>:<font color="#800080">&quot;Artichokes&quot;</font>,      img_test:/bushel_artichoke_icon.png/i\},\par
    3603: \{<b>text</b>:<font color="#800080">&quot;Asparagus&quot;</font>,       img_test:/bushel_asparagus_icon.png/i\},\par
    3604: \{<b>text</b>:<font color="#800080">&quot;Basil&quot;</font>,           img_test:/bushel_basil_icon.png/i\},\par
    3605: \{<b>text</b>:<font color="#800080">&quot;Bell Peppers&quot;</font>,    img_test:/bushel_bellpepper_icon.png/i\},\par
    3606: \{<b>text</b>:<font color="#800080">&quot;Black Berries&quot;</font>,   img_test:/bushel_blackberries_icon.png/i\},\par
    3607: \{<b>text</b>:<font color="#800080">&quot;Blueberries&quot;</font>,     img_test:/bushel_blueberries_icon.png/i\},\par
    3608: \{<b>text</b>:<font color="#800080">&quot;Broccoli&quot;</font>,        img_test:/bushel_broccoli_icon.png/i\},\par
    3609: \{<b>text</b>:<font color="#800080">&quot;Cabbage&quot;</font>,         img_test:/bushel_cabbage_icon.png/i\},\par
    3610: \{<b>text</b>:<font color="#800080">&quot;Carrots&quot;</font>,         img_test:/bushel_carrot_icon.png/i\},\par
    3611: \{<b>text</b>:<font color="#800080">&quot;Coffee&quot;</font>,          img_test:/bushel_coffee_icon.png/i\},\par
    3612: \{<b>text</b>:<font color="#800080">&quot;Corn&quot;</font>,            img_test:/bushel_corn_icon.png/i\},\par
    3613: \{<b>text</b>:<font color="#800080">&quot;Cotton&quot;</font>,          img_test:/bushel_cotton_icon.png/i\},\par
    3614: \{<b>text</b>:<font color="#800080">&quot;Cranberries&quot;</font>,     img_test:/bushel_cranberry_icon.png/i\},\par
    3615: \{<b>text</b>:<font color="#800080">&quot;Cucumber&quot;</font>,        img_test:/bushel_cucumber_icon.png/i\},\par
    3616: \{<b>text</b>:<font color="#800080">&quot;Daffodils&quot;</font>,       img_test:/bushel_daffodils_icon.png/i\},\par
    3617: \{<b>text</b>:<font color="#800080">&quot;Eggplant&quot;</font>,        img_test:/bushel_eggplant_icon.png/i\},\par
    3618: \{<b>text</b>:<font color="#800080">&quot;Ghost Chilli&quot;</font>,    img_test:/bushel_ghostchili_icon.png/i\},\par
    3619: \{<b>text</b>:<font color="#800080">&quot;Ginger&quot;</font>,          img_test:/bushel_ginger_icon.png/i\},\par
    3620: \{<b>text</b>:<font color="#800080">&quot;Grapes&quot;</font>,          img_test:/bushel_grapes_icon.png/i\},\par
    3621: \{<b>text</b>:<font color="#800080">&quot;Green Tea&quot;</font>,       img_test:/bushel_greentea_icon.png/i\},\par
    3622: \{<b>text</b>:<font color="#800080">&quot;Iris&quot;</font>,            img_test:/bushel_iris_icon.png/i\},\par
    3623: \{<b>text</b>:<font color="#800080">&quot;Lavender&quot;</font>,        img_test:/bushel_lavender_icon.png/i\},\par
    3624: \{<b>text</b>:<font color="#800080">&quot;Lemon Balm&quot;</font>,      img_test:/bushel_lemonbalm_icon.png/i\},\par
    3625: \{<b>text</b>:<font color="#800080">&quot;Lilac&quot;</font>,           img_test:/bushel_lilac_icon.png/i\},\par
    3626: \{<b>text</b>:<font color="#800080">&quot;Lilies&quot;</font>,          img_test:/bushel_lilies_icon.png/i\},\par
    3627: \{<b>text</b>:<font color="#800080">&quot;Morning Glory&quot;</font>,   img_test:/bushel_bluemorningglory_icon.png/i\},\par
    3628: \{<b>text</b>:<font color="#800080">&quot;Oats&quot;</font>,            img_test:/bushel_oats_icon.png/i\},\par
    3629: \{<b>text</b>:<font color="#800080">&quot;Onion&quot;</font>,           img_test:/bushel_onion_icon.png/i\},\par
    3630: \{<b>text</b>:<font color="#800080">&quot;Pattypan Squash&quot;</font>, img_test:/bushel_petitpansquash_icon.png/i\},\par
    3631: \{<b>text</b>:<font color="#800080">&quot;Peanut&quot;</font>,          img_test:/bushel_peanuts_icon.png/i\},\par
    3632: \{<b>text</b>:<font color="#800080">&quot;Peas&quot;</font>,            img_test:/bushel_peas_icon.png/i\},\par
    3633: \{<b>text</b>:<font color="#800080">&quot;Peppers&quot;</font>,         img_test:/bushel_peppers_icon.png/i\},\par
    3634: \{<b>text</b>:<font color="#800080">&quot;Pineapple&quot;</font>,       img_test:/bushel_pineapple_icon.png/i\},\par
    3635: \{<b>text</b>:<font color="#800080">&quot;Pink Roses&quot;</font>,      img_test:/bushel_pinkrose_icon.png/i\},\par
    3636: \{<b>text</b>:<font color="#800080">&quot;Potatoes&quot;</font>,        img_test:/bushel_potatoes_icon.png/i\},\par
    3637: \{<b>text</b>:<font color="#800080">&quot;Pumpkin&quot;</font>,         img_test:/bushel_pumpkin_icon.png/i\},\par
    3638: \{<b>text</b>:<font color="#800080">&quot;Purple Poppies&quot;</font>,  img_test:/bushel_poppypurple_icon.png/i\},\par
    3639: \{<b>text</b>:<font color="#800080">&quot;Raspberries&quot;</font>,     img_test:/bushel_raspberries_icon.png/i\},\par
    3640: \{<b>text</b>:<font color="#800080">&quot;Red Tulips&quot;</font>,      img_test:/bushel_redtulip_icon.png/i\},\par
    3641: \{<b>text</b>:<font color="#800080">&quot;Red Wheat&quot;</font>,       img_test:/bushel_redwheat_icon.png/i\},\par
    3642: \{<b>text</b>:<font color="#800080">&quot;Rice&quot;</font>,            img_test:/bushel_rice_icon.png/i\},\par
    3643: \{<b>text</b>:<font color="#800080">&quot;Soybeans&quot;</font>,        img_test:/bushel_soybeans_icon.png/i\},\par
    3644: \{<b>text</b>:<font color="#800080">&quot;Squash&quot;</font>,          img_test:/bushel_squash_icon.png/i\},\par
    3645: \{<b>text</b>:<font color="#800080">&quot;Strawberries&quot;</font>,    img_test:/bushel_strawberries_icon.png/i\},\par
    3646: \{<b>text</b>:<font color="#800080">&quot;Sugar Cane&quot;</font>,      img_test:/bushel_sugarcane_icon.png/i\},\par
    3647: \{<b>text</b>:<font color="#800080">&quot;Sunflower&quot;</font>,       img_test:/bushel_sunflower_icon.png/i\},\par
    3648: \{<b>text</b>:<font color="#800080">&quot;Tomatoes&quot;</font>,        img_test:/bushel_tomatoes_icon.png/i\},\par
    3649: \{<b>text</b>:<font color="#800080">&quot;Watermelon&quot;</font>,      img_test:/bushel_watermelon_icon.png/i\},\par
    3650: \{<b>text</b>:<font color="#800080">&quot;Wheat&quot;</font>,           img_test:/bushel_wheat_icon.png/i\},\par
    3651: \{<b>text</b>:<font color="#800080">&quot;White Grapes&quot;</font>,    img_test:/bushel_grapewhite_icon.png/i\},\par
    3652: \{<b>text</b>:<font color="#800080">&quot;Yellow Melon&quot;</font>,    img_test:/bushel_yellowwatermelon_icon.png/i\},\par
    3699: \{<b>text</b>:<font color="#800080">&quot;Unknown&quot;</font>,         img_test:/bushel_/i\}\par
  \}\par
\par
<b>var </b>FV_collectables = \{\par
    3700: \{<b>text</b>:<font color="#800080">&quot;Gloves&quot;</font>,                 img_test:/collect_gloves.png/i\},\par
    3701: \{<b>text</b>:<font color="#800080">&quot;Trowels&quot;</font>,                img_test:/Unknown/i\},\par
    3702: \{<b>text</b>:<font color="#800080">&quot;Cultivator&quot;</font>,             img_test:/Unknown/i\},\par
    3703: \{<b>text</b>:<font color="#800080">&quot;Twine&quot;</font>,                  img_test:/collect_gardeningtwine.png/i\},\par
    3704: \{<b>text</b>:<font color="#800080">&quot;Pruning Saw&quot;</font>,            img_test:/collect_pruningsaw.png/i\},\par
    3705: \{<b>text</b>:<font color="#800080">&quot;Shears&quot;</font>,                 img_test:/collect_shears.png/i\},\par
    3706: \{<b>text</b>:<font color="#800080">&quot;Needle Point&quot;</font>,           img_test:/Unknown/i\},\par
    3707: \{<b>text</b>:<font color="#800080">&quot;Spigot&quot;</font>,                 img_test:/Unknown/i\},\par
    3708: \{<b>text</b>:<font color="#800080">&quot;Pocket Watch&quot;</font>,           img_test:/collect_pocketwatch.png/i\},\par
    3709: \{<b>text</b>:<font color="#800080">&quot;Salt Shaker&quot;</font>,            img_test:/collect_roostersaltshaker.png/i\},\par
    3710: \{<b>text</b>:<font color="#800080">&quot;Thimble&quot;</font>,                img_test:/collect_ceramicthimble.png/i\},\par
    3711: \{<b>text</b>:<font color="#800080">&quot;CowBell&quot;</font>,                img_test:/collect_cowbell.png/i\},\par
    3712: \{<b>text</b>:<font color="#800080">&quot;Lady Bug&quot;</font>,               img_test:/collect_shears.png/i\},\par
    3713: \{<b>text</b>:<font color="#800080">&quot;Dragonfly&quot;</font>,              img_test:/collect_dragonfly.png/i\},\par
    3714: \{<b>text</b>:<font color="#800080">&quot;Caterpillar&quot;</font>,            img_test:/collect_caterpillar.png/i\},\par
    3715: \{<b>text</b>:<font color="#800080">&quot;Stick Bug&quot;</font>,              img_test:/collect_stickbug.png/i\},\par
    3716: \{<b>text</b>:<font color="#800080">&quot;Beetle&quot;</font>,                 img_test:/collect_beetle.png/i\},\par
    3717: \{<b>text</b>:<font color="#800080">&quot;Centipede&quot;</font>,              img_test:/collect_centipede.png/i\},\par
    3718: \{<b>text</b>:<font color="#800080">&quot;Emperor Butterfly&quot;</font>,      img_test:/Unknown/i\},\par
    3719: \{<b>text</b>:<font color="#800080">&quot;Painted Lady Butterfly&quot;</font>, img_test:/collect_paintedlady.png/i\},\par
    3720: \{<b>text</b>:<font color="#800080">&quot;Swallowtail Butterfly&quot;</font>,  img_test:/Unknown/i\},\par
    3721: \{<b>text</b>:<font color="#800080">&quot;Zebra Butterfly&quot;</font>,        img_test:/collect_zebralongwing.png/i\},\par
    3722: \{<b>text</b>:<font color="#800080">&quot;Copper Butterfly&quot;</font>,       img_test:/collect_largecopperbutterfly.png/i\},\par
    3723: \{<b>text</b>:<font color="#800080">&quot;Geene Plume&quot;</font>,            img_test:/collect_greenfeather.png/i\},\par
    3724: \{<b>text</b>:<font color="#800080">&quot;Hen Feather&quot;</font>,            img_test:/collect_brownfeather.png/i\},\par
    3725: \{<b>text</b>:<font color="#800080">&quot;Dapple Feather&quot;</font>,         img_test:/Unknown/i\},\par
    3726: \{<b>text</b>:<font color="#800080">&quot;Red Feather&quot;</font>,            img_test:/collect_redfeather.png/i\},\par
    3727: \{<b>text</b>:<font color="#800080">&quot;Banded Quill&quot;</font>,           img_test:/collect_stripedfeather.png/i\},\par
    3728: \{<b>text</b>:<font color="#800080">&quot;Blue Feather&quot;</font>,           img_test:/collect_bluefeather.png/i\},\par
    3729: \{<b>text</b>:<font color="#800080">&quot;Check Button&quot;</font>,           img_test:/Unknown/i\},\par
    3730: \{<b>text</b>:<font color="#800080">&quot;Brass Button&quot;</font>,           img_test:/Unknown/i\},\par
    3731: \{<b>text</b>:<font color="#800080">&quot;White Button&quot;</font>,           img_test:/Unknown/i\},\par
    3732: \{<b>text</b>:<font color="#800080">&quot;Jewel Button&quot;</font>,           img_test:/collect_buttonbejeweled.png/i\},\par
    3733: \{<b>text</b>:<font color="#800080">&quot;Formal Button&quot;</font>,          img_test:/collect_buttonformalblack.png/i\},\par
    3734: \{<b>text</b>:<font color="#800080">&quot;Pearl Button&quot;</font>,           img_test:/collect_buttonabalone.png/i\},\par
    3799: \{<b>text</b>:<font color="#800080">&quot;Unknown&quot;</font>,                img_test:/collect_/i\}\par
  \}\par
\par
<b>var </b>FV_decorations = \{\par
    3800: \{<b>text</b>:<font color="#800080">&quot;Bricks&quot;</font>,             img_test:/deco_brick_icon.png/i\},\par
    3801: \{<b>text</b>:<font color="#800080">&quot;Nails&quot;</font>,              img_test:/deco_nail_icon.png/i\},\par
    3802: \{<b>text</b>:<font color="#800080">&quot;Wooden Boards&quot;</font>,      img_test:/deco_woodenboard_icon.png/i\},\par
    3803: \{<b>text</b>:<font color="#800080">&quot;Horseshoes&quot;</font>,         img_test:/deco_horseshoe_icon.png/i\},\par
    3804: \{<b>text</b>:<font color="#800080">&quot;Harnesses&quot;</font>,          img_test:/deco_harness_icon.png/i\},\par
    3805: \{<b>text</b>:<font color="#800080">&quot;Bottles&quot;</font>,            img_test:/nursery_bottle.png/i\},\par
    3806: \{<b>text</b>:<font color="#800080">&quot;Blankets&quot;</font>,           img_test:/nursery_blanket.png/i\},\par
    3807: \{<b>text</b>:<font color="#800080">&quot;Glass Sheets&quot;</font>,       img_test:/unknown/i\},\par
    3808: \{<b>text</b>:<font color="#800080">&quot;Green Beams&quot;</font>,        img_test:/unknown/i\},\par
    3809: \{<b>text</b>:<font color="#800080">&quot;Floral Brackets&quot;</font>,    img_test:/unknown/i\},\par
    3810: \{<b>text</b>:<font color="#800080">&quot;White Trellises&quot;</font>,    img_test:/unknown/i\},\par
    3811: \{<b>text</b>:<font color="#800080">&quot;Irrigation Pipes&quot;</font>,   img_test:/unknown/i\},\par
    3812: \{<b>text</b>:<font color="#800080">&quot;Tuscany Truffles&quot;</font>,   img_test:/tuscany_truffles_icon.png/i\},\par
    3813: \{<b>text</b>:<font color="#800080">&quot;Tuscany Olives&quot;</font>,     img_test:/tuscany_olives_icon.png/i\},\par
    3814: \{<b>text</b>:<font color="#800080">&quot;Tuscany Goats Milk&quot;</font>, img_test:/tuscany_goatmilk_icon.png/i\},\par
    3815: \{<b>text</b>:<font color="#800080">&quot;Tuscany Eggs&quot;</font>,       img_test:/tuscany_eggs_icon.png/i\},\par
    3816: \{<b>text</b>:<font color="#800080">&quot;Wedding Cake&quot;</font>,       img_test:/tuscany_weddingcake_icon.png/i\},\par
    3818: \{<b>text</b>:<font color="#800080">&quot;Pig High Art&quot;</font>,       img_test:/tuscany_davidpig_icon.png/i\},\par
    3819: \{<b>text</b>:<font color="#800080">&quot;Apollo Butterfly&quot;</font>,   img_test:/unknown/i\},\par
    3820: \{<b>text</b>:<font color="#800080">&quot;Bella Fountain&quot;</font>,     img_test:/unknown/i\},\par
    3821: \{<b>text</b>:<font color="#800080">&quot;Leaning Tower&quot;</font>,      img_test:/building_tuscanypisa_icon.png/i\},\par
    3822: \{<b>text</b>:<font color="#800080">&quot;Double Surfboard&quot;</font>,   img_test:/tiki_surfboarddouble_icon.png/i\},\par
    3823: \{<b>text</b>:<font color="#800080">&quot;Stipe Surfboard&quot;</font>,    img_test:/tiki_surfboardstripe_icon.png/i\},\par
    3824: \{<b>text</b>:<font color="#800080">&quot;Bamboo&quot;</font>,             img_test:/deco_japanesebarnbamboo.png/i\},\par
    3825: \{<b>text</b>:<font color="#800080">&quot;Reed Thatch&quot;</font>,        img_test:/deco_reedthatch.png/i\},\par
    3826: \{<b>text</b>:<font color="#800080">&quot;Japanese Trellis&quot;</font>,   img_test:/japanese_trellis_icon.png/i\},\par
    3899: \{<b>text</b>:<font color="#800080">&quot;Unknown&quot;</font>,            img_test:/decorations%2F/i\}\par
  \}\par
\par
<i>// Collection of all the icon tests.\par
</i>FV_IconTest = \{\};\par
FV_IconTest[0] = FV_general;\par
FV_IconTest[1] = FV_eggs;\par
FV_IconTest[2] = FV_flowers;\par
FV_IconTest[3] = FV_animals;\par
FV_IconTest[4] = FV_bushels;\par
FV_IconTest[5] = FV_collectables;\par
FV_IconTest[6] = FV_decorations;\par
\par
<i>/**** Start MW Respect/CrimeSpree code ****/\par
// Generic Facebook Functions\par
</i><b>function </b>doFBParse(_myResponse)\{\par
    <i>/* Generic FB Parse Function, to grab the remote url, and parameters */\par
    /* No sense doing the same thing in multiple places */\par
    </i><b>var </b>i1, i2, i1b, myUrl, myParms;\par
    <b>var </b>strTemp;\par
    i1 = _myResponse.<b>indexOf</b>(<font color="#800080">'&lt;script&gt;big_pipe.onPageletArrive(\{&quot;phase&quot;:1,&quot;id&quot;:&quot;pagelet_iframe_canvas_content&quot;'</font>);\par
    i1b = _myResponse.<b>indexOf</b>(<font color="#800080">'&lt;script&gt;big_pipe.onPageletArrive(\{&quot;phase&quot;:1,&quot;id&quot;:&quot;pagelet_fbml_canvas_content&quot;'</font>);\par
\par
    <b>if </b>(i1&gt;=0)\{\par
\tab i1 = _myResponse.<b>indexOf</b>(<font color="#800080">'\{'</font>,i1);\par
\tab i2 = _myResponse.<b>indexOf</b>(<font color="#800080">');&lt;/script&gt;'</font>,i1);\par
\tab <b>eval</b>(<font color="#800080">'strTemp = '</font>+_myResponse.slice(i1,i2));\par
\tab strTemp = strTemp.content.pagelet_iframe_canvas_content;\par
\par
    \} <b>else if </b>(i1b&gt;=0) \{\par
\tab i1b = _myResponse.<b>indexOf</b>(<font color="#800080">'\{'</font>,i1b);\par
\tab i2 = _myResponse.<b>indexOf</b>(<font color="#800080">');&lt;/script&gt;'</font>,i1b);\par
\tab <b>eval</b>(<font color="#800080">'strTemp = '</font>+_myResponse.slice(i1b,i2));\par
\tab strTemp = strTemp.content.pagelet_fbml_canvas_content;\par
\par
    \} <b>else </b>\{\par
\tab <i>// Fall back\par
</i>\tab strTemp = _myResponse;\par
    \}\par
\par
    i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div&gt;&lt;form action=&quot;http://facebook.mafiawars.zynga.com/mwfb/'</font>);\par
    <b>if </b>(i1!=-1)\{\par
\tab <i>// Extract MW protected form\par
</i>\tab i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;form'</font>,i1); i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/form&gt;'</font>,i1); strTemp = strTemp.slice(i1,i2);\par
\tab <i>// Find URL\par
</i>\tab i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>)+1; i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
\tab myUrl = strTemp.slice(i1,i2);\par
\tab myUrl = myUrl.<b>replace</b>(/&amp;amp;/g,<font color="#800080">'&amp;'</font>);\par
\tab myParms = <font color="#800080">''</font>;\par
\tab i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input'</font>);\par
\tab <b>while </b>(i1!=-1) \{\par
\tab   <b>if </b>(myParms!=<font color="#800080">''</font>) myParms += <font color="#800080">'&amp;'</font>;\par
\tab   i1 = strTemp.<b>indexOf</b>(<font color="#800080">'name=&quot;'</font>,i1)+6; i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
\tab   myParms += strTemp.slice(i1,i2)+<font color="#800080">'='</font>;\par
\tab   i1 = strTemp.<b>indexOf</b>(<font color="#800080">'value=&quot;'</font>,i1)+7; i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
\tab   myParms += <b>escape</b>(strTemp.slice(i1,i2));\par
\tab   i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input'</font>,i1);\par
\tab\}\par
\tab <i>// Return the extracted url, params, and the text body (In case we need to process it further)\par
</i>\tab <b>return </b>[ myUrl, myParms, strTemp ];\par
    \}\par
    i1 = strTemp.<b>indexOf</b>(<font color="#800080">'goURI('</font>);\par
    <b>if </b>(i1!=-1)\{\par
\tab i1 += 7; i2 = strTemp.<b>indexOf</b>(<font color="#800080">&quot;')&quot;</font>,i1);\par
\tab myUrl = strTemp.slice(i1,i2);\par
\tab myUrl = myUrl.<b>replace</b>(/<font color="#800080">\\\\</font>x26/g,<font color="#800080">'&amp;'</font>);\par
\tab myUrl = myUrl.<b>replace</b>(/&amp;amp;/g,<font color="#800080">'&amp;'</font>);\par
\tab <b>return </b>[ myUrl, <font color="#800080">''</font>, strTemp ];\par
\par
    \}\par
\par
\par
    <b>return </b>[ <font color="#800080">''</font>, <font color="#800080">''</font>, strTemp ];\par
\}\par
<b>function </b>doMWRedirParse(_myResponse)\{\par
    <i>/* Used to have goURI, this changed */\par
    </i><b>var </b>myUrl, i1, i2, strTemp;\par
    i1 = _myResponse.<b>indexOf</b>(<font color="#800080">'href = &quot;'</font>)+8;\par
    i2 = _myResponse.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
    strTemp = _myResponse.slice(i1,i2);\par
    myUrl = strTemp;\par
    myUrl = myUrl.<b>replace</b>(/&amp;amp;/g,<font color="#800080">'&amp;'</font>);\par
    <b>return </b>myUrl;\par
\}\par
<b>function </b>doFBGiftForm (_myResponse, v_app_id, v_post_form_id, v_fb_dtsg)\{\par
    <i>// Used to process the gift fbml form\par
    </i><b>var </b>strTempForm, myUrl, myParms,v_to_id, i1, i2;\par
    myParms      =  <font color="#800080">'app_id='  </font>+v_app_id;\par
    i1 = _myResponse.<b>indexOf</b>(<font color="#800080">'FB.init(\{'</font>);\par
    <b>if </b>(i1 == -1) \{\par
        <i>// Farmville forms are slightly different\par
        </i>i1 = _myResponse.<b>indexOf</b>(<font color="#800080">'&lt;div fb_protected=&quot;true&quot; class=&quot;fb_protected_wrapper&quot;&gt;&lt;form action=&quot;http://apps.facebook.com/onthefarm/gifts_send.php'</font>);\par
        <b>if </b>(i1 == -1)\{\par
            GM_log(_myResponse);\par
            throw \{message:<font color="#800080">&quot;Cannot find FB.Init or FV gift_send form on page&quot;</font>\};\par
        \}\par
        i2 = _myResponse.<b>indexOf</b>(<font color="#800080">'&lt;/form&gt;'</font>, i1);\par
    \} <b>else </b>\{\par
        i1      =  _myResponse.<b>indexOf</b>(<font color="#800080">'&lt;fb:fbml&gt;'</font>, i1);\par
        <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Cannot find FB form in page&quot;</font>\};\par
        i2 = _myResponse.<b>indexOf</b>(<font color="#800080">'&lt;/fb:fbml&gt;'</font>,i1);\par
    \}\par
    <i>// Isolate the form.\par
    </i>strTempForm = _myResponse.slice(i1,i2);\par
    <i>// What is the action URL, aka the url we redirect to after posting the ajax\par
    </i>i1 = strTempForm.<b>indexOf</b>(<font color="#800080">' action=&quot;'</font>);\par
    <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Cannot find action in page&quot;</font>\};\par
    i1+=9;\par
    i2 = strTempForm.<b>indexOf</b>(<font color="#800080">'&quot; '</font>,i1);\par
    myUrl = strTempForm.slice(i1,i2);\par
    <i>// Grab who we are sending the gift to\par
    </i>i1 = strTempForm.<b>indexOf</b>(<font color="#800080">'name=&quot;ids[]&quot; value=&quot;'</font>);\par
    <b>if </b>(i1 == -1) \{\par
        i1 = strTempForm.<b>indexOf</b>(<font color="#800080">'giftRecipient='</font>);\par
        <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Can't find the user to gift to&quot;</font>\};\par
        i2 = strTempForm.<b>indexOf</b>(<font color="#800080">'&amp;'</font>,i1);\par
        v_to_id = strTempForm.slice(i1+14,i2);\par
    \} <b>else </b>\{\par
        i1+=20;\par
        i2 = strTempForm.<b>indexOf</b>(<font color="#800080">'&quot;'</font>, i1);\par
        v_to_id = strTempForm.slice(i1,i2);\par
    \}\par
    myParms     +=  <font color="#800080">'&amp;to_ids[0]='</font>+v_to_id;\par
    <i>// Type of Request\par
    </i>i1 = strTempForm.<b>indexOf</b>(<font color="#800080">'type=&quot;'</font>);\par
    <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Unable to find the request type&quot;</font>\};\par
    i1+=6;\par
    i2 = strTempForm.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
    <b>var </b>v_request_type = strTempForm.slice(i1,i2);\par
    myParms     +=  <font color="#800080">'&amp;request_type=' </font>+<b>escape</b>(v_request_type);\par
    myParms     +=  <font color="#800080">'&amp;invite=false'</font>;\par
    <i>// The content of the message\par
    </i>i1 = strTempForm.<b>indexOf</b>(<font color="#800080">'content=&quot;'</font>,i1);\par
    <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Unable to find the fbml request content&quot;</font>\};\par
    i1+=9;\par
    i2 = strTempForm.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
    <b>var </b>v_content = strTempForm.slice(i1,i2);\par
    myParms     +=  <font color="#800080">'&amp;content=' </font>+encodeURIComponent(v_content);\par
    myParms     +=  <font color="#800080">'&amp;preview=false'</font>;\par
    myParms     +=  <font color="#800080">'&amp;is_multi=false'</font>;\par
    myParms     +=  <font color="#800080">'&amp;is_in_canvas=false'</font>;\par
    <i>// This needs to be fixed maybe?  Or can it be omitted.. should be req_form_something..\par
    //myParms     +=  '&amp;form_id='+v_post_form_id;\par
    </i>myParms     +=  <font color="#800080">'&amp;include_ci=false'</font>;\par
    myParms     +=  <font color="#800080">'&amp;prefill=true&amp;message=&amp;donot_send=false&amp;__d=1'</font>;\par
    myParms    += <font color="#800080">'&amp;post_form_id='</font>+v_post_form_id;;\par
    myParms    += <font color="#800080">'&amp;fb_dtsg='</font>+v_fb_dtsg;\par
    myParms    += <font color="#800080">'&amp;post_form_id_source=AsyncRequest'</font>;\par
    <b>return </b>[ myUrl, myParms, strTempForm ];\par
\}\par
\par
<i>// Respect gift\par
</i><b>function </b>RespectItem()\{\par
  <b>this</b>.Next    = null;\par
  <b>this</b>.Action  = <font color="#800080">''</font>;\par
  <b>this</b>.Process = <b>function</b>() \{\par
    <b>function </b>NextRequest(_delay1, _delay2) \{\par
      <b>if </b>(bAutoRun) \{\par
        <b>if </b>(Self.Next != null) \{\par
          iRespectCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionRespect);\}, getRandRange(_delay1*750,_delay1*1250));\par
        \} <b>else </b>\{\par
          LogPush(<font color="#800080">'&lt;b&gt;Finished processing crime spree gifts.  Checking again in '</font>+ _delay2 +<font color="#800080">' minutes.&lt;/b&gt;'</font>);\par
          iRespectCurrent = <b>setTimeout</b>(<b>function </b>(e)  \{ EventSpan.dispatchEvent(ActionRespect);\}, getRandRange(_delay2*50000,_delay2*70000));\par
        \}\par
        <b>if  </b>(iRespectCurrent &lt; iHoldEvent) \{\par
          <i>// The browser has reset. Cancel runaway jobs;\par
          </i><b>clearTimeout</b>(iRespectCurrent);\par
        \}\par
      \}\par
    \}\par
\par
    <b>function </b>doStep1(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RespectItem doStep 1'</font>);\par
\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[5],aParams[6]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
            <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl;\par
            <b>var </b>strTemp;\par
            <b>var </b>strDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            i1      = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;td class=&quot;message_body&quot;&gt;'</font>);\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Cannot find Message_Body in page&quot;</font>\};\par
            i2      = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;img src=&quot;'</font>,i1);\par
            i2      = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1)+6;\par
            strDetails  = strTemp.slice(i1,i2);\par
            LogPush(<font color="#800080">'&lt;b&gt;Accepting Crime Spree Gift&lt;/b&gt;&lt;br&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;'</font>+strDetails+<font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;'</font>);\par
            NextRequest(aParams[5],aParams[6]);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: RespectItem DoStep 1 - '</font>+err.message);\par
            NextRequest(aParams[5],aParams[6]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    try \{\par
      <b>var </b>myUrl, myParms;\par
      <b>var </b>iErrorCount;\par
      <b>var </b>iHoldEvent;\par
      <b>var </b>Self;\par
      <b>var </b>i1, i2;\par
      Self = <b>this</b>;\par
\par
      <i>// stop processing if autorun turned off\par
      </i><b>if </b>(bAutoRun) \{\par
        iHoldEvent = iRespectCurrent;\par
        <i>// stop the this cycle is mafia wars xw_sig is invalid\par
        </i><b>if </b>(xw_sig_valid == false) \{\par
          GM_log(<font color="#800080">'aborting Respect cycle.  XW_SIG is invalid'</font>);\par
          <i>// requeue the timed jobs for and hope xw_sig get renewed\par
          </i>LogPush(<font color="#800080">'&lt;b&gt;XW_Sig is invalid.  Aborting Crime Spree processing. Checking again in '</font>+aParams[6]+<font color="#800080">' minutes.&lt;/b&gt;'</font>);\par
          iRespectCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ oRespectList.Erase(); EventSpan.dispatchEvent(ActionRespect);\}, getRandRange(aParams[6]*50000,aParams[6]*70000));\par
          <b>if </b>(iRespectCurrent &lt; iHoldEvent) \{\par
            <i>// The browser has reset.  Cancel runaway jobs;\par
            </i><b>clearTimeout</b>(iRespectCurrent);\par
          \}\par
        \} <b>else </b>\{\par
          GM_log(<font color="#800080">'accept Respect'</font>);\par
          myUrl    = <b>this</b>.Action;\par
          myParms  = <font color="#800080">'skip_req_frame=1&amp;first_load=1'</font>;\par
          myParms += <font color="#800080">'&amp;sf_xw_user_id=' </font>+ <b>escape</b>(local_xw_user_id) + <font color="#800080">'&amp;sf_xw_sig=' </font>+ local_xw_sig;\par
          doStep1(myUrl, myParms);\par
        \}\par
      \} <b>else </b>\{\par
          GM_log(<font color="#800080">'RespectItem Some one turned the swith off'</font>);\par
      \}\par
    \} catch(err) \{\par
        GM_log(<font color="#800080">'Error: RespectItem Main - '</font>+err.message);\par
        NextRequest(aParams[5],aParams[6]);\par
    \}\par
  \}\par
\}\par
<i>/**** End MW Respect/CrimeSpree code ****/\par
\par
/**** Start Wall Notification code ****/\par
// Process Wall Item\par
</i><b>function </b>WallItem()\{\par
  <b>this</b>.Next             = null;\par
  <b>this</b>.Action           = <font color="#800080">''</font>;\par
  <b>this</b>.BName            = <font color="#800080">''</font>;\par
  <b>this</b>.ActorName        = <font color="#800080">''</font>;\par
  <b>this</b>.AttachmentTitle  = <font color="#800080">''</font>;\par
  <b>this</b>.AppId            = <font color="#800080">''</font>;\par
  <b>this</b>.Type             = <font color="#800080">''</font>;\par
\par
  <b>this</b>.Process = <b>function</b>() \{\par
    <b>function </b>NextRequest(_delay1, _delay2) \{\par
      <b>if </b>(bAutoRun) \{\par
        <b>if </b>(Self.Next != null) \{\par
          iWallCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionWall);\}, getRandRange(_delay1*750,_delay1*1250));\par
        \} <b>else </b>\{\par
          iWallCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionWall);\}, getRandRange(_delay2*750,_delay2*1250));\par
        \}\par
        <b>if </b>(iWallCurrent &lt; iHoldEvent) \{\par
          <i>// The browser has reset.  Cancel runaway jobs;\par
          </i><b>clearTimeout</b>(iWallCurrent);\par
        \}\par
      \}\par
    \}\par
\par
    <i>// Mafia Wars Wall Code\par
    </i><b>function </b>doMWStep1(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'WallItem ' </font>+ Self.Type + <font color="#800080">' doMWStep 1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
         try \{\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            <b>var </b>param = doFBParse(_responseDetails.responseText);\par
            doMWStep1a(param[0],param[1]);\par
           \} catch(err) \{\par
              GM_log(<font color="#800080">'Error: WallItem ' </font>+ Self.Type + <font color="#800080">' doMWStep 1 - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doMWStep1a(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'WallItem ' </font>+ Self.Type + <font color="#800080">' doMWStep 1a'</font>);\par
\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
            <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp, strTemp_all;\par
            <b>var </b>strDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            myUrl = doMWRedirParse(_responseDetails.responseText);\par
            doMWStep1b(myUrl,<font color="#800080">''</font>);\par
          \} catch(err) \{\par
              GM_log(<font color="#800080">'Error: WallItem ' </font>+ Self.Type + <font color="#800080">' doMWStep 1a - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    <b>function </b>doMWStep1b(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'WallItem ' </font>+ Self.Type + <font color="#800080">' doMWStep 1b'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
         try \{\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            <b>var </b>param = doFBParse(_responseDetails.responseText);\par
            doMWStep2(param[0],param[1]);\par
           \} catch(err) \{\par
              GM_log(<font color="#800080">'Error: WallItem ' </font>+ Self.Type + <font color="#800080">' doMWStep 1b - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doMWStep2(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'WallItem ' </font>+ Self.Type + <font color="#800080">' doMWStep 2'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, strTemp, myUrl, myParms;\par
            <b>var </b>strNotice;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            i1      = strTemp.<b>indexOf</b>(<font color="#800080">'action=&quot;'</font>);\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Cannot find action= in page&quot;</font>\};\par
            <i>// Extract URL\par
            </i>i1     += 8;\par
            i2      = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
            myUrl   = strTemp.slice(i1,i2);\par
            myParms = <font color="#800080">''</font>;\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input'</font>,i1);\par
            <b>while </b>(i1!=-1) \{\par
              <b>if </b>(myParms!=<font color="#800080">''</font>) myParms += <font color="#800080">'&amp;'\par
              </font>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'name=&quot;'</font>,i1)+6; i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
              myParms += strTemp.slice(i1,i2)+<font color="#800080">'='</font>;\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'value=&quot;'</font>,i1)+7; i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
              myParms += <b>escape</b>(strTemp.slice(i1,i2));\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input'</font>,i1);\par
            \}\par
            <b>if </b>(Self.Type == <font color="#800080">'MW_Missions'</font>) \{\par
              GM_log(<font color="#800080">'Doing Missions'</font>);\par
              strNotice   = <font color="#800080">'&lt;b&gt;'</font>+Wall_Data[<font color="#800080">'10979261223'</font>][Self.Type].<b>text</b>+<font color="#800080">': '</font>+ Self.AttachmentTitle+<font color="#800080">'&lt;/b&gt; ('</font>+ Self.ActorName +<font color="#800080">')'</font>;\par
              doMissionStep1(myUrl, myParms, strNotice);\par
            \} <b>else if </b>(Self.Type == <font color="#800080">'MW_WarHelp'</font>) \{\par
              GM_log(<font color="#800080">'Doing Wars'</font>);\par
              strNotice   = <font color="#800080">'&lt;b&gt;'</font>+Wall_Data[<font color="#800080">'10979261223'</font>][Self.Type].<b>text</b>+<font color="#800080">': '</font>+ Self.AttachmentTitle+<font color="#800080">'&lt;/b&gt; ('</font>+ Self.ActorName +<font color="#800080">')'</font>;\par
              doWarStep1(myUrl, myParms, strNotice);\par
            \} <b>else </b>\{\par
              GM_log(<font color="#800080">'Doing Generic'</font>);\par
              doMWStep3(myUrl,myParms);\par
            \}\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: WallItem ' </font>+ Self.Type + <font color="#800080">' doMWStep2 - '</font>+err.message);\par
            NextRequest(aParams[2],aParams[3]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doMWStep3(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'WallItem ' </font>+ Self.Type + <font color="#800080">' doMWStep3'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, i3, i4, myUrl, myParms;\par
            <b>var </b>strTemp;\par
            <b>var </b>strWarMessage, strWarName, strWarNotice;\par
            <b>var </b>strWarReward, strMissionLevel;\par
            <b>var </b>strNotice;\par
            <b>var </b>oDiv, oSnapShot;\par
            <b>var </b>bSkipItem;\par
            <b>var </b>flashvars;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp   = _responseDetails.responseText;\par
            strNotice = <font color="#800080">'&lt;b&gt;'</font>+Wall_Data[<font color="#800080">'10979261223'</font>][Self.Type].<b>text</b>+<font color="#800080">': '</font>+ Self.AttachmentTitle+<font color="#800080">'&lt;/b&gt; ('</font>+ Self.ActorName +<font color="#800080">')'</font>;\par
            <i>// Simple request (ie not a war)\par
            </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;td class=&quot;message_body&quot;&gt;'</font>);\par
            i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=\\\\&quot;color: white; font-size: 18px; margin-bottom: 10px; font-weight: bold\\\\&quot;&gt;'</font>);\par
            i3 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;ach_celeb_message&quot;&gt;'</font>);\par
            <b>if </b>(Self.Type == <font color="#800080">'MW_FreeGift'</font>) \{\par
              <b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'You have already claimed the maximum number of'</font>)!=-1) \{\par
                strNotice += <font color="#800080">'&lt;br&gt;You have already claimed the maximum number of Free Gifts for today.'</font>;\par
              \} <b>else </b>\{\par
                strNotice += <font color="#800080">'&lt;br&gt;Accepting Free Gifts'</font>;\par
              \}\par
              LogPush(strNotice);\par
              NextRequest(aParams[2],aParams[3]);\par
            \} <b>else if </b>(Self.Type == <font color="#800080">'MW_VegasSlots'</font>) \{\par
              GM_log(<font color="#800080">'Doing Slots'</font>);\par
              flashvars = null;\par
              <i>// Find slot values;\par
              </i><b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'var flashvars = \{mw_app:&quot;slotmachine'</font>)!=-1) \{\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'var flashvars = \{mw_app:&quot;slotmachine'</font>);\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">';swfobject'</font>,i1);\par
                strTemp = strTemp.slice(i1,i2);\par
                <b>eval</b>(strTemp);\par
              \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'var flashvars = \{mw_app:\\\\&quot;slotmachine'</font>)!=-1) \{\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'var flashvars = \{mw_app:\\\\&quot;slotmachine'</font>);\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">';swfobject'</font>,i1);\par
                strTemp = strTemp.slice(i1,i2);\par
                strTemp = <b>eval</b>(<font color="#800080">&quot;'&quot;</font>+strTemp+<font color="#800080">&quot;'&quot;</font>);\par
                <b>eval</b>(strTemp);\par
              \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'You can only play your mafia member'</font>)!=-1)\{\par
                strNotice += <font color="#800080">&quot;&lt;br&gt;You can only play your mafia member's slot machines.&quot;</font>;\par
                LogPush(strNotice);\par
              \}\par
              <b>if </b>(flashvars!=null) \{\par
                myUrl  = flashvars.mw_supersecret_url+<font color="#800080">'/'</font>;\par
                myUrl += <b>unescape</b>(flashvars.spinCallback);\par
                myUrl += <font color="#800080">&quot;&amp;uid=&quot;</font>+flashvars.mw_user_id;\par
                myUrl += <font color="#800080">&quot;&amp;betAmt=1&quot;</font>;\par
                <b>if </b>(flashvars.friend_id==undefined) \{\par
                  myUrl += <font color="#800080">&quot;&amp;friend_id=none&quot;</font>;\par
                \} <b>else </b>\{\par
                  myUrl += <font color="#800080">&quot;&amp;friend_id=&quot;</font>+flashvars.friend_id;\par
                \}\par
                myUrl   += <font color="#800080">&quot;&amp;xw_client_id=8&quot;</font>;\par
                myParms  = <font color="#800080">'ajax=1&amp;liteload=1'\par
                </font>myParms += <font color="#800080">'&amp;sf_xw_sig=' </font>+ local_xw_sig;\par
                myParms += <font color="#800080">'&amp;sf_xw_user_id=' </font>+ <b>escape</b>(local_xw_user_id);\par
                GM_log(<font color="#800080">'initial free spins: '</font>+flashvars.freeSpins);\par
                <b>if </b>(flashvars.freeSpins&gt;0) \{\par
                  strNotice += <font color="#800080">'&lt;br&gt;Playing '</font>+flashvars.friend_name+<font color="#800080">&quot;'s slot machine&quot;</font>;\par
                  doSlotsStep1(myUrl, myParms, strNotice);\par
                \} <b>else </b>\{\par
                  strNotice += <font color="#800080">'&lt;br&gt;Skipping Slot machine: No Free Spins'</font>;\par
                  LogPush(strNotice);\par
                  NextRequest(aParams[2],aParams[3]);\par
                \}\par
              \} <b>else </b>\{\par
                strNotice += <font color="#800080">'&lt;br&gt;Error finding slot machine'</font>;\par
                LogPush(strNotice);\par
                NextRequest(aParams[2],aParams[3]);\par
              \}\par
            \} <b>else if </b>(i1 != -1) \{\par
              <i>// Message contains &lt;td class=&quot;message_body&quot;&gt;\par
              </i>i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/td&gt;'</font>,i1);\par
              strTemp = strTemp.slice(i1+25,i2);\par
              <b>if</b>(strTemp.<b>indexOf</b>(<font color="#800080">'You can only receive 10 free iced fight boosts per day'</font>)!=-1) \{\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;fl'</font>);\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&gt;'</font>,i1)+1;\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>);\par
                strNotice += <font color="#800080">'&lt;br&gt;'</font>+strTemp.slice(i1,i2);\par
                MW_IcedBonusDelay = getCurrentTime() + 12*60;\par
                strNotice += <font color="#800080">'&lt;br&gt;Maxium number of Iced Fight Boosts have been accepted for today'</font>;\par
                LogPush(strNotice);\par
                NextRequest(aParams[2],aParams[3]);\par
              \} <b>else if</b>(strTemp.<b>indexOf</b>(<font color="#800080">'You collected the max number of Carnaval Masks from this type of feed. Try again tomorrow.'</font>)!=-1) \{\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;fl'</font>);\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&gt;'</font>,i1)+1;\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>);\par
                strNotice += <font color="#800080">'&lt;br&gt;'</font>+strTemp.slice(i1,i2);\par
                MW_LootLadderDelay = getCurrentTime() + 12*60;\par
                strNotice += <font color="#800080">'&lt;br&gt;Maximum number of Loot Ladder items has been accepted for today'</font>;\par
                LogPush(strNotice);\par
                NextRequest(aParams[2],aParams[3]);\par
              \} <b>else if</b>(strTemp.<b>indexOf</b>(<font color="#800080">'has received all the help allowed for today'</font>)!=-1) \{\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;fl'</font>);\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&gt;'</font>,i1)+1;\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>);\par
                strNotice += <font color="#800080">'&lt;br&gt;'</font>+strTemp.slice(i1,i2);\par
                LogPush(strNotice);\par
                NextRequest(aParams[2],aParams[3]);\par
              \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'has passed out all'</font>)!=-1) \{\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;fl'</font>);\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&gt;'</font>,i1)+1;\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>);\par
                strNotice += <font color="#800080">'&lt;br&gt;'</font>+strTemp.slice(i1,i2);\par
                LogPush(strNotice);\par
                NextRequest(aParams[2],aParams[3]);\par
              \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;ach_celeb_message&quot;&gt;'</font>)!=-1 ) \{\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;ach_celeb_message&quot;&gt;'</font>);\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;clear: both;&quot;&gt;'</font>,i1);\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i2);\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i2);\par
                strNotice += <font color="#800080">'&lt;br&gt;'</font>+strTemp.slice(i1,i2);\par
                LogPush(strNotice);\par
                NextRequest(aParams[2],aParams[3]);\par
              \} <b>else </b>\{\par
                <i>// Remove and scripts and white text colour\par
                </i>strTemp = strTemp.<b>replace</b>(/&lt;script(.|<font color="#800080">\\</font>s)*<font color="#800080">?\\</font>/script&gt;/g, <font color="#800080">''</font>);\par
                strTemp = strTemp.<b>replace</b>(/color: rgb<font color="#800080">\\</font>(255, 255, 255<font color="#800080">\\</font>)/g, <font color="#800080">''</font>);\par
                strTemp = strTemp.<b>replace</b>(/color: <font color="#800080">#</font>fff/g, <font color="#800080">''</font>);\par
                strTemp = strTemp.<b>replace</b>(/&lt;a(.|<font color="#800080">\\</font>s)*<font color="#800080">?\\</font>/a&gt;/g, <font color="#800080">''</font>);\par
                strTemp = strTemp.<b>replace</b>(/float:(.|<font color="#800080">\\</font>s)*<font color="#800080">?\\</font>;/g, <font color="#800080">''</font>);\par
                strTemp = strTemp.<b>replace</b>(/&lt;div style=<font color="#800080">&quot;position: absolute(.|\\s)*?bonus.png&quot;</font>&gt;&lt;<font color="#800080">\\</font>/div&gt;/g, <font color="#800080">''</font>);\par
                strNotice += <font color="#800080">'&lt;br&gt;'</font>+strTemp;\par
                LogPush(strNotice);\par
                NextRequest(aParams[2],aParams[3]);\par
              \}\par
            \} <b>else if </b>(i2 != -1) \{\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&gt;'</font>,i2)+1;\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=\\\\&quot;height:'</font>,i2);\par
              strTemp = strTemp.slice(i1,i2);\par
              strTemp = strTemp.<b>replace</b>(/&lt;div(.*<font color="#800080">?</font>)&gt;/g,<font color="#800080">'&lt;div&gt;'</font>)\par
              strNotice += <font color="#800080">'&lt;br&gt;'</font>+strTemp;\par
              LogPush(strNotice);\par
              NextRequest(aParams[2],aParams[3]);\par
            \} <b>else if </b>(i3 != -1) \{\par
              i1 = i3;\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;clear: both;&quot;&gt;'</font>);\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i2);\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i2+1);\par
              strTemp = strTemp.slice(i1,i2);\par
              strNotice += <font color="#800080">'&lt;br&gt;'</font>+strTemp;\par
              LogPush(strNotice);\par
              NextRequest(aParams[2],aParams[3]);\par
            \} <b>else </b>\{\par
              GM_log(<font color="#800080">'WallItem ' </font>+ Self.Type + <font color="#800080">' doMWStep3 '</font>);\par
              strTemp = <font color="#800080">'Error processing wall notification.  Cannot find results on page'</font>;\par
              GM_log(strTemp);\par
              strNotice += <font color="#800080">'&lt;br&gt;'</font>+strTemp;\par
              LogPush(strNotice);\par
              NextRequest(aParams[2],aParams[3]);\par
            \}\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: WallItem ' </font>+ Self.Type + <font color="#800080">' DoMWStep 3 - '</font>+err.message);\par
            NextRequest(aParams[2],aParams[3]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doSlotsStep1(_myUrl, _myParms, _strNotice) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'WallItem ' </font>+ Self.Type + <font color="#800080">' doSlotsStep1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, i3, i4, myUrl, myParms;\par
            <b>var </b>strTemp;\par
            <b>var </b>strWarMessage, strWarName, strWarNotice;\par
            <b>var </b>strWarReward, strMissionLevel;\par
            <b>var </b>strNotice;\par
            <b>var </b>oDiv, oSnapShot;\par
            <b>var </b>bSkipItem;\par
            <b>var </b>flashvars, slot_data;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            <i>// Find slot data\par
            </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'\{'</font>);\par
            strTemp = <font color="#800080">'var flashvars = '</font>+strTemp.slice(i1);\par
            <b>eval</b>(strTemp);\par
            slot_data = JSON.<b>parse</b>(flashvars.data);\par
            <i>// Update message\par
            </i>strNotice = _strNotice + <font color="#800080">&quot;&lt;br&gt;Pulling the arm&quot;</font>;\par
            <b>if </b>(slot_data.json_data.payout&gt;0) strNotice +=<font color="#800080">&quot;&lt;br&gt;You won &quot; </font>+ slot_data.json_data.payout+<font color="#800080">&quot; coins&quot;</font>;\par
            <b>if </b>(slot_data.json_data.itemName != null ) strNotice +=<font color="#800080">&quot;&lt;br&gt;You Won &quot; </font>+ slot_data.json_data.itemName;\par
            <b>if </b>((slot_data.json_data.msg != undefined) &amp;&amp; (slot_data.json_data.msg != <font color="#800080">&quot;&quot;</font>) ) strNotice +=<font color="#800080">&quot;&lt;br&gt;&quot; </font>+ slot_data.json_data.msg;\par
            GM_log(<font color="#800080">'free spins remaining '</font>+slot_data.json_data.freeSpins);\par
            <i>// Check for free spins\par
            </i><b>if </b>(slot_data.json_data.freeSpins &gt; 0) \{\par
              <i>// Spin the slot machine again.\par
              </i>doSlotsStep1(_myUrl, _myParms, strNotice);\par
            \} <b>else </b>\{\par
              GM_log(<font color="#800080">'Slot machine out of free spins'</font>);\par
              LogPush(strNotice);\par
              NextRequest(aParams[2],aParams[3]);\par
            \}\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: WallItem ' </font>+ Self.Type + <font color="#800080">' doSlotsStep1 - '</font>+err.message);\par
            NextRequest(aParams[2],aParams[3]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doMissionStep1(_myUrl, _myParms, _strNotice) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'WallItem ' </font>+ Self.Type + <font color="#800080">' doMissionStep1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, i3, i4, myUrl, myParms;\par
            <b>var </b>strTemp;\par
            <b>var </b>strMissionName;\par
            <b>var </b>strNotice;\par
            <b>var </b>oDiv, oButton, oBox;\par
            <b>var </b>bSkipItem, bSkipMission, bQueueMission;\par
            <b>var </b>strMissionLevel;\par
            <b>var </b>strMissionJob;\par
            <b>var </b>strEnergy;\par
            <b>var </b>strStamina;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'Operation has expired.'</font>)!=-1) \{\par
              strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Mission has expired.'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[2],aParams[3]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'Sorry, this operation is already full.'</font>)!=-1) \{\par
              strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Sorry, this mission is already full.'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[2],aParams[3]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'Successfully joined the operation'</font>)!=-1) \{\par
              strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Successfully joined the mission.'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[2],aParams[3]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'You are already a member of this operation'</font>)!=-1) \{\par
              strNotice = _strNotice+<font color="#800080">'&lt;br&gt;You are already a member of this mission.'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[2],aParams[3]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'Can only help in 10 operations at a time.'</font>)!=-1) \{\par
              strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Can only help in 10 missions at a time.'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[2],aParams[3]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;doTaskButton&quot;&gt;'</font>)!=-1) \{\par
              <i>// doTaskButton will only show up if you have successfully joined a mission\par
              </i>strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Successfully joined the mission.'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[2],aParams[3]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;missionSelectorButton&quot;&gt;'</font>)!=-1) \{\par
              <i>// Found some select buttons\par
              // Try again notice\par
              </i><b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'Sorry, that position has already been taken. Try another one.'</font>)!=-1) strNotice += _strNotice+<font color="#800080">'&lt;br&gt;Sorry, that position has already been taken. Try another one.'</font>;\par
              <i>// Find the mission's name\par
              </i><b>if </b>( strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;missionSelectHeaderTitle&quot;&gt;'</font>) == -1) throw (<font color="#800080">'Mission name cannot be found'</font>);\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;missionSelectHeaderTitle&quot;&gt;'</font>);\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1);\par
              strMissionName = strTemp.slice(i1+38,i2);\par
              <i>// Find stamina and Energy\par
              </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;span id=&quot;user_energy&quot;&gt;'</font>)+23;\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/span'</font>,i1);\par
              strEnergy = strTemp.slice(i1,i2)*1;\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;span id=&quot;user_stamina&quot;&gt;'</font>)+24;\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/span'</font>,i1);\par
              strStamina = strTemp.slice(i1,i2)*1;\par
              <i>// Test to see if this mission is to be done\par
              </i>bSkipMission = true;\par
              <b>for </b>(iMission <b>in </b>MW_SecretMissions) \{\par
                <b>if </b>(iMission==2399) \{\par
                  GM_log(<font color="#800080">'Processing Unknown Mission'</font>);\par
                  <b>if </b>(aParams[2399]==true) bSkipMission = false;\par
                  <b>break</b>;\par
                \} <b>else if </b>(strMissionName.<b>toUpperCase</b>().<b>indexOf</b>(MW_SecretMissions[iMission].test.<b>toUpperCase</b>()) != -1) \{\par
                  <b>if </b>(aParams[iMission] == true) bSkipMission = false;\par
                  <b>break</b>;\par
                \}\par
              \}\par
              <i>// Was mission type accepted\par
              </i><b>if </b>(!bSkipMission) \{\par
                <i>// Mission was selected for processing\par
                </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div id=&quot;positionSelector&quot;'</font>);\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/table&gt;'</font>)+8;\par
                oDiv = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
                oDiv.innerHTML = strTemp.slice(i1,i2)+<font color="#800080">'&lt;/div&gt;'</font>;\par
                oButton = getSnapshot(<font color="#800080">'.//div[@class=&quot;missionSelectorButton&quot;]'</font>,oDiv);\par
                oBox = getSnapshot(<font color="#800080">'.//div[@class=&quot;missionSelectorBox&quot;]'</font>,oDiv);\par
                <i>// Test number of available slots\par
                </i>bSkipMission = true;\par
                <b>if </b>(oButton.snapshotLength &gt; aParams[2026]) \{\par
                  bQueueMission = true;\par
                \} <b>else </b>\{\par
                  bQueueMission = false;\par
                  <b>for </b>(<b>var </b>i=0;i&lt;oBox.snapshotLength;i++) \{\par
                    <b>if </b>((oBox.snapshotItem(i).innerHTML.<b>indexOf</b>(<font color="#800080">' class=&quot;stamina'</font>)!=-1) &amp;&amp; (oBox.snapshotItem(i).innerHTML.<b>indexOf</b>(<font color="#800080">' class=&quot;energy'</font>)!=-1)) \{\par
                      <i>// Item uses both energy and stamina\par
                      </i><b>if </b>(aParams[2023]==<font color="#800080">'both'</font>) \{\par
                        bQueueMission = true;\par
                        <b>if </b>((strEnergy &gt; aParams[2030])&amp;&amp;(strStamina &gt; aParams[2031])) \{\par
                          bSkipMission = false;\par
                          <b>break</b>;\par
                        \}\par
                      \}\par
                    \} <b>else if </b>(oBox.snapshotItem(i).innerHTML.<b>indexOf</b>(<font color="#800080">' class=&quot;energy'</font>)!=-1) \{\par
                      <i>// Item uses only energy\par
                      </i><b>if </b>((aParams[2023]==<font color="#800080">'both'</font>)||(aParams[2023]==<font color="#800080">'energy'</font>)) \{\par
                        bQueueMission = true;\par
                        <b>if </b>(strEnergy &gt; aParams[2030]) \{\par
                          bSkipMission = false;\par
                          <b>break</b>;\par
                        \}\par
                      \}\par
                    \} <b>else if </b>(oBox.snapshotItem(i).innerHTML.<b>indexOf</b>(<font color="#800080">' class=&quot;stamina'</font>)!=-1) \{\par
                      <i>// Item uses only stamina\par
                        </i><b>if </b>((aParams[2023]==<font color="#800080">'both'</font>)||(aParams[2023]==<font color="#800080">'stamina'</font>)) \{\par
                          bQueueMission = true;\par
                          <b>if </b>(strStamina &gt; aParams[2031]) \{\par
                            bSkipMission = false;\par
                            <b>break</b>;\par
                          \}\par
                        \}\par
                    \} <b>else </b>\{\par
                      <i>// Nothing in here. This box has already been selected\par
                    </i>\}\par
                  \}\par
                \}\par
                <b>if </b>(!bSkipMission) \{\par
                  oSnap = oBox.snapshotItem(i).innerHTML;\par
                  i1 = oSnap.<b>indexOf</b>(<font color="#800080">'inner_page'</font>)+13;\par
                  i2 = oSnap.<b>indexOf</b>(<font color="#800080">&quot;'&quot;</font>,i1);\par
                  i3 = oSnap.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;positionName&quot;'</font>);\par
                  i3 = oSnap.<b>indexOf</b>(<font color="#800080">'http'</font>,i3);\par
                  i4 = oSnap.<b>indexOf</b>(<font color="#800080">')'</font>,i3);\par
                  myUrl  = <font color="#800080">'http://facebook.mafiawars.zynga.com/mwfb/'</font>;\par
                  myUrl += oSnap.slice(i1,i2);\par
                  myUrl += <font color="#800080">'&amp;xw_client_id=8'</font>;\par
                  myUrl  = myUrl.<b>replace</b>(/&amp;amp;/g,<font color="#800080">'&amp;'</font>);\par
                  myParms = <font color="#800080">'ajax=1&amp;liteload=1'</font>;\par
                  myParms += <font color="#800080">'&amp;sf_xw_sig=' </font>+ local_xw_sig;\par
                  myParms += <font color="#800080">'&amp;sf_xw_user_id=' </font>+ local_xw_user_id;\par
                  strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Selecting Mission - &lt;img src=&quot;'</font>+oSnap.slice(i3,i4)+<font color="#800080">'&quot;&gt;'</font>;\par
                  doMissionStep1(myUrl, myParms, strNotice);\par
                \} <b>else if </b>((aParams[2027] == <font color="#800080">'true'</font>)&amp;&amp;(bQueueMission)) \{\par
                  bSkipItem = false;\par
                  <b>for </b>(<b>var </b>p=0;p&lt;aMissionRetry[0].<b>length</b>;p++) \{\par
                      <b>if </b>(aMissionRetry[0][p].Action.<b>indexOf</b>(Self.Action.slice(Self.Action.<b>indexOf</b>(<font color="#800080">'next_params='</font>)))!=-1) \{bSkipItem = true; <b>break</b>;\}\par
                  \}\par
                  <b>if </b>(!bSkipItem) \{\par
                    <b>var </b>iMissionRetry = aMissionRetry[0].<b>length</b>;\par
                    aMissionRetry[0][iMissionRetry] = Self;\par
                    aMissionRetry[0][iMissionRetry].Next = null;\par
                    aMissionRetry[1][iMissionRetry] = getCurrentTime()+2*(oButton.snapshotLength-1);\par
                    strNotice  =  _strNotice;\par
                    strNotice +=  <font color="#800080">'&lt;br&gt;Queuing Mission: &lt;a href=&quot;'</font>+Self.Action+<font color="#800080">'&quot;&gt;' </font>+strMissionName+<font color="#800080">'&lt;/a&gt;'</font>;\par
                    strNotice +=  <font color="#800080">'&lt;br&gt;slots open: '</font>+oButton.snapshotLength;\par
                    strNotice +=  <font color="#800080">'&lt;br&gt;Energy: '</font>+strEnergy;\par
                    strNotice +=  <font color="#800080">'&lt;br&gt;Stamina: '</font>+strStamina;\par
                    strNotice +=  <font color="#800080">'&lt;br&gt;retrying in '</font>+2*(oButton.snapshotLength-1)+<font color="#800080">' mins.'</font>;\par
                    LogPush(strNotice);\par
                    NextRequest(aParams[2],aParams[3]);\par
                  \} <b>else </b>\{\par
                    strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Mission already in queue'</font>;\par
                    LogPush(strNotice);\par
                    NextRequest(aParams[2],aParams[3]);\par
                  \}\par
                \} <b>else </b>\{\par
                  strNotice  =  _strNotice;\par
                  strNotice +=  <font color="#800080">'&lt;br&gt;Skipping Mission:' </font>+strMissionName;\par
                  strNotice +=  <font color="#800080">'&lt;br&gt;slots open: '</font>+oButton.snapshotLength;\par
                  strNotice +=  <font color="#800080">'&lt;br&gt;Energy: '</font>+strEnergy;\par
                  strNotice +=  <font color="#800080">'&lt;br&gt;Stamina: '</font>+strStamina;\par
                  LogPush(strNotice);\par
                  NextRequest(aParams[2],aParams[3]);\par
                \}\par
              \} <b>else </b>\{\par
                <i>// Mission is not to be accepted.\par
                </i>GM_log(<font color="#800080">'Skipping mission.  Type not valid'</font>);\par
                NextRequest(aParams[2],aParams[3]);\par
              \}\par
            \} <b>else </b>\{\par
              GM_log(<font color="#800080">'Error processing Mission'</font>);\par
              strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Error Processing Mission.'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[2],aParams[3]);\par
            \}\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: WallItem ' </font>+ Self.Type + <font color="#800080">' doMissionStep1 - '</font>+err.message);\par
            NextRequest(aParams[2],aParams[3]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doWarStep1(_myUrl, _myParms, _strNotice) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'WallItem ' </font>+ Self.Type + <font color="#800080">' doWarStep1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
           <font color="#800080">'Accept'</font>: <font color="#800080">'*/*'</font>,\par
           <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
           <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
           <font color="#800080">'X-Requested-With'</font>: <font color="#800080">' XMLHttpRequest'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, i3, i4;\par
            <b>var </b>myUrl, strTemp;\par
            <b>var </b>strWarMessage, strWarName;\par
            <b>var </b>strWarReward, strWarNotice;\par
            <b>var </b>strNotice, strDetails;\par
            <b>var </b>oSnapShot, oDiv;\par
            <b>var </b>bSkipItem;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            <i>// All of the responce\par
            </i>strTemp = _responseDetails.responseText;\par
<i>/*\par
            Sample responses\par
            You &lt;span class=&quot;bad&quot;&gt;LOST&lt;/span&gt; the fight but still eliminated ADAM THE HUNTER.  Ichbin Einklon Funf is one step closer to winning this war.\par
            You &lt;span class=&quot;bad&quot;&gt;LOST&lt;/span&gt; the fight but injured \{\{(P) N' (G)\}\}H@G@R. Ichbin Einklon Funf is a little closer closer to winning this war.\par
            You &lt;span class=&quot;bad&quot;&gt;LOST&lt;/span&gt; the fight but still eliminated Mr. Mort. Einklon Ichbin Sechs is one step closer to winning this war.\par
            This war is already over. Start your own war now to earn great rewards.\par
\par
*/\par
            // Done notice\par
            </i><b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'You Have Already Participated'</font>)!=-1) \{\par
              strNotice = _strNotice+<font color="#800080">'&lt;br&gt;You Have Already Participated.'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[2],aParams[3]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'This war is already over'</font>)!=-1) \{\par
              strNotice = _strNotice+<font color="#800080">'&lt;br&gt;This war is already over'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[2],aParams[3]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'You &lt;span class='</font>)!=-1) \{\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'You &lt;span class='</font>);\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'. '</font>,i1)+1;\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'. '</font>,i2)+1;\par
              strNotice = _strNotice+<font color="#800080">'&lt;br&gt;'</font>+strTemp.slice(i1,i2);\par
              LogPush(strNotice);\par
              NextRequest(aParams[2],aParams[3]);\par
            \} <b>else </b>\{\par
              <i>// Look for reward type\par
              </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;helpers_rewards&quot;&gt;'</font>);\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'title=&quot;'</font>,i1)+7;\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
              strWarReward = strTemp.slice(i1,i2);\par
              bSkipItem = true;\par
              <b>if </b>(aParams[2200]==true) \{\par
                <i>// All items option\par
                </i>bSkipItem = false;\par
              \} <b>else </b>\{\par
                <i>// Check reward against those desired\par
                </i><b>for </b>(<b>var </b>warID <b>in </b>MW_WarList) \{\par
                  <b>if </b>((strWarReward.<b>indexOf</b>(MW_WarList[warID].test)!=-1)&amp;&amp;(aParams[warID]==true)) \{\par
                    bSkipItem = false;\par
                    <b>break</b>;\par
                  \}\par
                \}\par
              \}\par
              <b>if </b>(bSkipItem==true) \{\par
                strNotice = _strNotice+<font color="#800080">'&lt;br&gt;War skipped wrong reward offered: '</font>+strWarReward;\par
                LogPush(strNotice);\par
                NextRequest(aParams[2],aParams[3]);\par
              \} <b>else </b>\{\par
                <i>// Look for Message\par
                </i>strWarMessage = <font color="#800080">''</font>;\par
                strWarNotice  = <font color="#800080">''</font>;\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;td class=&quot;message_body&quot;&gt;'</font>);\par
                <b>if </b>(i1 !=-1) \{\par
                  i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/td&gt;'</font>,i1);\par
                  strWarMessage = strTemp.slice(i1+25,i2);\par
                  <i>// Remove any javascript to be safe\par
                  </i>strWarMessage = strWarMessage.<b>replace</b>(/&lt;script(.|<font color="#800080">\\</font>s)*<font color="#800080">?\\</font>/script&gt;/g, <font color="#800080">''</font>);\par
                  strWarMessage = strWarMessage.<b>replace</b>(/color: rgb<font color="#800080">\\</font>(255, 255, 255<font color="#800080">\\</font>)/g, <font color="#800080">''</font>);\par
                  strWarMessage = strWarMessage.<b>replace</b>(/color: <font color="#800080">#</font>ffffff/g, <font color="#800080">''</font>);\par
                  i1 = strWarMessage.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;margin'</font>);\par
                  <b>if </b>(i1 == -1) \{\par
                    strWarNotice = strWarMessage;\par
                  \} <b>else </b>\{\par
                    i1 = strWarMessage.<b>indexOf</b>(<font color="#800080">'&quot;&gt;'</font>,i1)+2;\par
                    i2 = strWarMessage.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1);\par
                    strWarNotice = strWarMessage.slice(i1,i2);\par
                    i2 = strWarNotice.<b>indexOf</b>(<font color="#800080">'&lt;a href'</font>);\par
                    <b>if </b>(i2!=-1) strWarNotice = strWarNotice.slice(0,i2);\par
                  \}\par
                  <i>// Remove any javascript to be safe\par
                  </i>strWarNotice = strWarNotice.<b>replace</b>(/&lt;script(.|<font color="#800080">\\</font>s)*<font color="#800080">?\\</font>/script&gt;/g, <font color="#800080">''</font>);\par
                  strWarNotice = strWarNotice.<b>replace</b>(/color: rgb<font color="#800080">\\</font>(255, 255, 255<font color="#800080">\\</font>)/g, <font color="#800080">''</font>);\par
                  strWarNotice = strWarNotice.<b>replace</b>(/color: <font color="#800080">#</font>ffffff/g, <font color="#800080">''</font>);\par
                \}\par
                <i>// Isolate the part of the web page that has all the attack buttons on it\par
                </i><b>if </b>(aParams[2012]==false) \{\par
                  i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;side right'</font>);\par
                \} <b>else </b>\{\par
                  i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;side left'</font>);\par
                \}\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;war_rewards&quot;&gt;'</font>,i1);\par
                <i>// This should contain all the attack buttons\par
                </i>oDiv = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
                oDiv.innerHTML = strTemp.slice(i1,i2);\par
                <i>// Select who to fight, right side or Both\par
                </i>oSnapShot = getSnapshot(strWarAttack,oDiv);\par
                <b>if </b>(oSnapShot.snapshotLength == 0) \{\par
                  <i>// No one to attack\par
                  </i>GM_log(<font color="#800080">'no one to Attack'</font>);\par
                  <b>if </b>(strWarNotice != <font color="#800080">''</font>) strNotice += <font color="#800080">'&lt;br&gt;'</font>+strWarNotice;\par
                  strNotice = _strNotice+<font color="#800080">'&lt;br&gt;War is over. No one to attack'</font>;\par
                  LogPush(strNotice);\par
                  NextRequest(aParams[2],aParams[3]);\par
                \} <b>else </b>\{\par
                  <i>// Attemp to attack\par
                  </i>GM_log(<font color="#800080">'Attemp to attack'</font>);\par
                  <b>if </b>(strWarNotice != <font color="#800080">''</font>) \{strNotice += <font color="#800080">'&lt;br&gt;'</font>+strWarNotice;\}\par
                  strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Found '</font>+oSnapShot.snapshotLength+<font color="#800080">' Person/People to attack'</font>;\par
                  <i>// Look for local_xw_sig\par
                  </i>myUrl     = oSnapShot.snapshotItem(getRandRange(0,(oSnapShot.snapshotLength-1))).<b>href</b>;\par
                  myUrl    += <font color="#800080">'&amp;xw_client_id=8'</font>;\par
                  myParms   = <font color="#800080">'ajax=1&amp;liteload=1'</font>;\par
                  myParms  += <font color="#800080">'&amp;sf_xw_user_id='</font>+<b>escape</b>(local_xw_user_id);\par
                  myParms  += <font color="#800080">'&amp;sf_xw_sig='</font>+local_xw_sig;\par
                  doWarStep1(myUrl, myParms, strNotice);\par
                \}\par
              \}\par
            \}\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: WallItem ' </font>+ Self.Type + <font color="#800080">' DoWarStep 1 - '</font>+err.message);\par
            NextRequest(aParams[2],aParams[3]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <i>// FarmVille Code Sections\par
    </i><b>function </b>doFVStep1(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'WallItem ' </font>+ Self.Type + <font color="#800080">' doFVStep1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myUrl2;\par
            <b>var </b>strTemp, strTemp_all;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            <i>// find URL\par
</i>\tab     <b>var </b>param = doFBParse(_responseDetails.responseText);\par
            <b>if </b>(!param[0]) throw(<font color="#800080">'Cannot find goURI'</font>);\par
            doFVStep2(param[0],<font color="#800080">''</font>);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: WallItem ' </font>+ Self.Type + <font color="#800080">' DoFVStep 1 - '</font>+err.message);\par
            NextRequest(aParams[2],aParams[3]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doFVStep2(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'WallItem ' </font>+ Self.Type + <font color="#800080">' doFVStep2'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
         <b>method</b>: <font color="#800080">'GET'</font>,\par
         url: _myUrl,\par
         headers: \{\par
           <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
           <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp, strTemp_all, strName, strValue;\par
            <b>var </b>strNotice;\par
            <b>var </b>bProcess;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            strNotice = <font color="#800080">''</font>;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
\tab     <i>/* generic parser */\par
</i>\tab     <b>var </b>param = doFBParse(_responseDetails.responseText);\par
\tab     strTemp = param[2];\par
            <i>// Get URL\par
            </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'href=&quot;'</font>);\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">'Cannot find href=&quot; in page'</font>\};\par
            i1 += 6;\par
            i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
            myUrl = strTemp.slice(i1,i2);\par
            myUrl = myUrl.<b>replace</b>(/&amp;amp;/g,<font color="#800080">'&amp;'</font>);\par
            <i>// Look for gift message\par
            </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;main_giftConfirm_cont&quot;&gt;'</font>);\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">'Cannot fin &lt;div class=&quot;main_giftConfirm_cont&quot;&gt; in page'</font>\};\par
            <i>// Extract Message\par
            </i>i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;gift_box_holder&quot;&gt;'</font>,i1);\par
            <b>if </b>(i2 ==-1) \{\par
              <i>// Text only message\par
              </i>i1 +=35;\par
            \} <b>else </b>\{\par
              <i>// Text with an Icon\par
              </i>i1 = i2;\par
            \}\par
            i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;inner_giftConfirm_cont&quot;&gt;'</font>,i1);\par
            strNotice = strTemp.slice(i1,i2);\par
            strNotice = strNotice.<b>replace</b>(/&lt;<font color="#800080">\\</font>/h3&gt;|&lt;h3&gt;/g,<font color="#800080">''</font>);\par
            bProcess = null;\par
            <i>// test to see if we should continue\par
            // Note this loop no longer works due to the images being hosted on the CDN.\par
            </i><b>for </b>(<b>var </b>GROUP <b>in </b>FV_IconTest) \{\par
              <b>for </b>(<b>var </b>ID <b>in </b>FV_IconTest[GROUP]) \{\par
                <b>if </b>(FV_IconTest[GROUP][ID].img_test(strNotice)) \{\par
                  bProcess = aParams[ID];\par
                  <b>if </b>(bProcess == false) <b>break</b>;\par
                \}\par
              \}\par
              <b>if </b>(bProcess != null) <b>break</b>;\par
            \}\par
            <b>if </b>(bProcess == false) \{\par
              NextRequest(aParams[2],aParams[3]);\par
            \} <b>else </b>\{\par
              <i>// Process this item\par
              // Extract forms\par
              </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;form'</font>,i1);\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;form'</font>,i1+5);\par
              <b>if </b>(i2 != -1) \{\par
                <i>// Two buttons\par
                </i>myParms = <font color="#800080">''</font>;\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input type=&quot;hidden&quot;'</font>,i1);\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/form&gt;'</font>,i1);\par
                strTemp = strTemp.slice(i1,i2);\par
                i1 = 0;\par
                do \{\par
                  i1 = strTemp.<b>indexOf</b>(<font color="#800080">'name=&quot;'</font>,i1);\par
                  <b>if</b>(i1==-1) \{\par
                    <b>break</b>;\par
                  \} <b>else </b>\{\par
                    i1 += 6;\par
                    i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
                    strName = strTemp.slice(i1,i2);\par
                    i1 = strTemp.<b>indexOf</b>(<font color="#800080">'value=&quot;'</font>,i1)+7;\par
                    i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
                    strValue = strTemp.slice(i1,i2);\par
                    <b>if </b>(myParms != <font color="#800080">'' </font>) myParms += <font color="#800080">'&amp;'</font>;\par
                    myParms += strName +<font color="#800080">'='</font>+strValue;\par
                  \}\par
                \} <b>while </b>(true)\par
                myParms = myParms.<b>replace</b>(/,/g,<font color="#800080">'%2C'</font>);\par
                doFVStep3(myUrl,myParms,strNotice);\par
              \} <b>else </b>\{\par
                <i>// Too late\par
                //strNotice += '&lt;br&gt;Already Accepted or Expired';\par
                </i>LogPush(<font color="#800080">'&lt;b&gt;'</font>+Self.Type+<font color="#800080">'&lt;/b&gt;&lt;br&gt;'</font>+strNotice);\par
                NextRequest(aParams[2],aParams[3]);\par
              \}\par
            \}\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: WallItem ' </font>+ Self.Type + <font color="#800080">' DoFVStep 2 - '</font>+err.message);\par
            NextRequest(aParams[2],aParams[3]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doFVStep3(_myUrl, _myParms,_strNotice) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'WallItem ' </font>+ Self.Type + <font color="#800080">' doFVStep3'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
         <b>method</b>: <font color="#800080">'POST'</font>,\par
         url: _myUrl,\par
         data: _myParms,\par
         headers: \{\par
           <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
           <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
           <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl;\par
            <b>var </b>strTemp;\par
            <b>var </b>strNotice;\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            strNotice = <font color="#800080">''</font>;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
\tab     <b>var </b>param = doFBParse(_responseDetails.responseText);\par
            <i>//GM_log(strTemp);\par
</i>\tab     <b>if </b>(param[0].<b>length </b>== 0)\{\par
                LogPush(<font color="#800080">'&lt;b&gt;'</font>+Self.Type+<font color="#800080">'&lt;/b&gt;&lt;br&gt;'</font>+strNotice);\par
                NextRequest(aParams[2],aParams[3]);\par
            \} <b>else </b>\{\par
                doFVStep4(param[0],<font color="#800080">''</font>,_strNotice);\par
            \}\par
          \} catch(err) \{\par
            <b>if </b>(_strNotice != <font color="#800080">''</font>)  strNotice = _strNotice +<font color="#800080">'&lt;br&gt;'</font>;\par
            strNotice += <font color="#800080">'Failed'</font>;\par
            LogPush(<font color="#800080">'&lt;b&gt;'</font>+Self.Type+<font color="#800080">'&lt;/b&gt;&lt;br&gt;'</font>+strNotice);\par
            GM_log(<font color="#800080">'Error: WallItem ' </font>+ Self.Type + <font color="#800080">' DoFVStep 3 - '</font>+err.message);\par
            NextRequest(aParams[2],aParams[3]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doFVStep4(_myUrl, _myParms, _strNotice) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'WallItem doFVStep4'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl;\par
            <b>var </b>strTemp;\par
            <b>var </b>strNotice;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            strNotice = <font color="#800080">''</font>;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            <b>if </b>(_strNotice != <font color="#800080">''</font>)  strNotice = _strNotice +<font color="#800080">'&lt;br&gt;'</font>;\par
            strNotice += <font color="#800080">'&lt;b&gt;&lt;font color=&quot;green&quot;&gt;Actioned&lt;/font&gt;&lt;/b&gt; ('</font>+Self.BName+<font color="#800080">')'</font>;\par
            LogPush(<font color="#800080">'&lt;b&gt;'</font>+Self.Type+<font color="#800080">'&lt;/b&gt;&lt;br&gt;'</font>+strNotice);\par
            NextRequest(aParams[2],aParams[3]);\par
          \} catch(err) \{\par
            <b>if </b>(_strNotice != <font color="#800080">''</font>)  strNotice = _strNotice +<font color="#800080">'&lt;br&gt;'</font>;\par
            strNotice += <font color="#800080">'&lt;b&gt;&lt;font color=&quot;red&quot;&gt;Failed&lt;/font&gt;&lt;/b&gt;'</font>;\par
            LogPush(<font color="#800080">'&lt;b&gt;'</font>+Self.Type+<font color="#800080">'&lt;/b&gt;&lt;br&gt;'</font>+strNotice);\par
            GM_log(<font color="#800080">'Error: WallItem DoFVStep 2 - '</font>+err.message);\par
            NextRequest(aParams[2],aParams[3]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    <i>// Main code\par
    </i><b>var </b>iHoldEvent;\par
    <b>var </b>myUrl;\par
    <b>var </b>nextParms;\par
    <b>var </b>xmlhttp;\par
    <b>var </b>iErrorCount;\par
    <b>var </b>bSkipItem;\par
    <b>var </b>Self;\par
    try \{\par
      Self = <b>this</b>;\par
      bSkipItem = false;\par
      <i>// stop processing if autorun turned off\par
      </i><b>if </b>(bAutoRun) \{\par
        iHoldEvent = iWallCurrent;\par
        <i>// Ignore things if MW is not valid\par
        </i>switch (<b>this</b>.AppId) \{\par
          case 10979261223:\par
            iErrorCount = 0;\par
            GM_log(<font color="#800080">'process Wall Notification'</font>);\par
            <i>// Fixing href\par
            // Remove //apps.facebook.com/inthemafia/http&amp;?ref=nf#58;\par
            </i><b>this</b>.Action = <b>this</b>.Action.<b>replace</b>(/<font color="#800080">\\</font>/<font color="#800080">\\</font>/apps.facebook.com<font color="#800080">\\</font>/inthemafia<font color="#800080">\\</font>/http&amp;<font color="#800080">\\?</font>ref=nf<font color="#800080">#58</font>;/g,<font color="#800080">''</font>);\par
            <b>if </b>(Self.Type == <font color="#800080">&quot;MW_IcedBonus&quot;</font>) \{\par
              <b>if </b>(getCurrentTime()&gt;MW_IcedBonusDelay) \{\par
                doMWStep1(<b>this</b>.Action,<font color="#800080">''</font>);\par
              \} <b>else </b>\{\par
                GM_log(<font color="#800080">'MW skipping Iced Boost'</font>);\par
                NextRequest(aParams[2],aParams[3]);\par
              \}\par
            \} <b>else if </b>(Self.Type == <font color="#800080">&quot;MW_LootLadder&quot;</font>) \{\par
              <b>if </b>(getCurrentTime()&gt;MW_LootLadderDelay) \{\par
                doMWStep1(<b>this</b>.Action,<font color="#800080">''</font>);\par
              \} <b>else </b>\{\par
                GM_log(<font color="#800080">'MW skipping Loot Ladder item'</font>);\par
                NextRequest(aParams[2],aParams[3]);\par
              \}\par
            \} <b>else </b>\{\par
              doMWStep1(<b>this</b>.Action,<font color="#800080">''</font>);\par
            \}\par
            <b>break</b>;\par
          case 102452128776:\par
             <i>// FarmVille\par
            // Ignore some types of jobs based on settings\par
            </i>iErrorCount = 0;\par
            GM_log(<font color="#800080">'process Wall Notification'</font>);\par
            doFVStep1(<b>this</b>.Action,<font color="#800080">''</font>);\par
            <b>break</b>;\par
        \}\par
      \} <b>else </b>\{\par
        GM_log(<font color="#800080">'WallItem: Some one turned the swith off'</font>);\par
      \}\par
    \} catch(err) \{\par
      GM_log(<font color="#800080">'Error: WallItem Main - '</font>+err.message);\par
      NextRequest(aParams[2],aParams[3]);\par
    \}\par
  \}\par
\}\par
\par
<i>// Request Item\par
</i><b>function </b>RequestItem () \{\par
  <b>this</b>.Action     = <font color="#800080">''</font>;\par
  <b>this</b>.Reject     = <font color="#800080">''</font>;\par
  <b>this</b>.Parms      = <font color="#800080">''</font>;\par
  <b>this</b>.From       = <font color="#800080">''</font>;\par
  <b>this</b>.Giftname   = <font color="#800080">''</font>;\par
  <b>this</b>.Gifttype   = <font color="#800080">''</font>;\par
  <b>this</b>.Next       = null;\par
  <b>this</b>.Process    = <b>function</b>() \{\par
  <b>function </b>NextRequest(_delay1, _delay2) \{\par
    <b>if </b>(bAutoRun) \{\par
      <b>if </b>(Self.Next != null) \{\par
        iRequestCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionRequest);\}, getRandRange(_delay1*750,_delay1*1250));\par
      \} <b>else </b>\{\par
        LogPush(<font color="#800080">'&lt;b&gt;Finished processing Requests.  Checking again in '</font>+ _delay2 +<font color="#800080">' minutes.&lt;/b&gt;'</font>);\par
        iRequestCurrent = <b>setTimeout</b>(<b>function </b>(e)  \{ EventSpan.dispatchEvent(ActionRequest);\}, getRandRange(_delay2*50000,_delay2*70000));\par
      \}\par
      <b>if  </b>(iRequestCurrent &lt; iHoldEvent) \{\par
        <i>// The browser has reset.  Cancel runaway jobs;\par
        </i><b>clearTimeout</b>(iRequestCurrent);\par
      \}\par
    \}\par
  \}\par
\par
  <i>// Mafia Wars Code\par
  </i><b>function </b>MW_AcceptMission() \{\par
    <b>function </b>doStep1(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem MW_AcceptMission doStep 1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
          <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl;\par
            <b>var </b>strTemp;\par
            <b>var </b>strDetails;\par
            <b>var </b>oDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'\{'</font>);\par
            oDetails = JSON.<b>parse</b>(strTemp.slice(i1));\par
            <b>if </b>(oDetails.payload.msg == null) \{\par
              myUrl = <font color="#800080">&quot;&quot;</font>;\par
              <b>for </b>(<b>var </b>i=0;i&lt;oDetails.onload.<b>length</b>;i++) \{\par
                <b>if </b>(oDetails.onload[i].<b>indexOf</b>(<font color="#800080">'goURI'</font>)!=-1) <b>eval</b>(<font color="#800080">&quot;myUrl = &quot; </font>+ oDetails.onload[i].slice(6,-2))\par
              \}\par
              <b>if </b>(myUrl == <font color="#800080">&quot;&quot;</font>) throw \{message:<font color="#800080">&quot;Cannot find goURI in page&quot;</font>\};\par
              doStep2(myUrl,<font color="#800080">''</font>);\par
            \} <b>else </b>\{\par
              <i>// and error has occured while trying to process the request.\par
              </i>GM_log(<font color="#800080">'Msg = '</font>+oDetails.payload.msg);\par
              strDetails  = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Mission:&lt;/b&gt;&lt;br&gt;'</font>;\par
              <b>if </b>(typeof(oDetails.payload.msg)==<font color="#800080">'object'</font>) \{\par
                strDetails += oDetails.payload.msg[<font color="#800080">'__html'</font>];\par
              \} <b>else </b>\{\par
                strDetails += oDetails.payload.msg;\par
              \}\par
              LogPush(strDetails);\par
              NextRequest(aParams[0],aParams[1]);\par
            \}\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem Error: MW_AcceptMission DoStep 1 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep2(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem MW_AcceptMission doStep 2'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp, strTemp_all;\par
            <b>var </b>strDetails;\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
\tab     <b>var </b>param = doFBParse(_responseDetails.responseText);\par
            <b>if </b>(param[0].<b>length </b>== 0) throw(<font color="#800080">'Cannot find goURI'</font>);\par
            doStep3(param[0],<font color="#800080">''</font>);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem Error: MW_AcceptMission DoStep 2 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep3(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem MW_AcceptMission doStep 3'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            <b>var </b>param = doFBParse(_responseDetails.responseText);\par
            GM_log(param[0] + <font color="#800080">&quot;\\n&quot; </font>+ param[2])\par
            doStep3a(param[0],param[1]);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem Error: MW_AcceptMission DoStep 3 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep3a(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem MW_AcceptMission doStep 3a'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
            <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, strTemp, myUrl, myParms;\par
            <b>var </b>strNotice;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
                iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            GM_log(strTemp);\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'action=&quot;'</font>);\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Cannot find action= in page&quot;</font>\};\par
            <i>// Extract URL\par
            </i>i1     += 8;\par
            i2      = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
            myUrl   = strTemp.slice(i1,i2);\par
            myParms = <font color="#800080">''</font>;\par
            i1      = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input'</font>,i1);\par
            <b>while </b>(i1!=-1) \{\par
              <b>if </b>(myParms!=<font color="#800080">''</font>) myParms += <font color="#800080">'&amp;'</font>;\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'name=&quot;'</font>,i1)+6; i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
              myParms += strTemp.slice(i1,i2)+<font color="#800080">'='</font>;\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'value=&quot;'</font>,i1)+7; i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
              myParms += <b>escape</b>(strTemp.slice(i1,i2));\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input'</font>,i1);\par
            \}\par
            strNotice   = <font color="#800080">'&lt;b&gt;Mafia Wars Social Mission:&lt;/b&gt;'</font>;\par
            doMissionStep1(myUrl,myParms,strNotice);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem Error: MW_AcceptMission DoStep 3a - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doMissionStep1(_myUrl, _myParms, _strNotice) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem MW_AcceptMission doMissionStep1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
            <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, i3, i4, myUrl, myParms;\par
            <b>var </b>strTemp;\par
            <b>var </b>strMissionName, bSkipMission;\par
            <b>var </b>strNotice;\par
            <b>var </b>oDiv, oButton, oBox;\par
            <b>var </b>bSkipItem;\par
            <b>var </b>strMissionLevel;\par
            <b>var </b>strMissionJob;\par
            <b>var </b>strEnergy;\par
            <b>var </b>strStamina;\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'Operation has expired.'</font>)!=-1) \{\par
              strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Mission has expired.'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[0],aParams[1]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'Sorry, this operation is already full.'</font>)!=-1) \{\par
              strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Sorry, this mission is already full.'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[0],aParams[1]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'Successfully joined the operation'</font>)!=-1) \{\par
              strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Successfully joined the mission.'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[0],aParams[1]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'You are already a member of this operation'</font>)!=-1) \{\par
              strNotice = _strNotice+<font color="#800080">'&lt;br&gt;You are already a member of this mission.'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[0],aParams[1]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'Can only help in 10 operations at a time.'</font>)!=-1) \{\par
              strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Can only help in 10 missions at a time.'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[0],aParams[1]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;doTaskButton&quot;&gt;'</font>)!=-1) \{\par
              <i>// doTaskButton will only show up if you have successfully joined a mission\par
              </i>strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Successfully joined the mission.'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[0],aParams[1]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;missionSelectorButton&quot;&gt;'</font>)!=-1) \{\par
              <i>// found some select buttons\par
              // Try again notice\par
              </i><b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'Sorry, that position has already been taken. Try another one.'</font>)!=-1) strNotice += _strNotice+<font color="#800080">'&lt;br&gt;Sorry, that position has already been taken. Try another one.'</font>;\par
              <i>// Find the mission's name\par
              </i><b>if </b>( strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;missionSelectHeaderTitle&quot;&gt;'</font>) == -1) throw (<font color="#800080">'Mission name cannot be found'</font>);\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;missionSelectHeaderTitle&quot;&gt;'</font>);\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1);\par
              strMissionName = strTemp.slice(i1+38,i2);\par
              <i>// Find stamina and Energy\par
              </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;span id=&quot;user_energy&quot;&gt;'</font>)+23;\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/span'</font>,i1);\par
              strEnergy = strTemp.slice(i1,i2)*1;\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;span id=&quot;user_stamina&quot;&gt;'</font>)+24;\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/span'</font>,i1);\par
              strStamina = strTemp.slice(i1,i2)*1;\par
              <i>// Test to see if this mission is to be done\par
              </i>bSkipMission = true;\par
              <b>for </b>(iMission <b>in </b>MW_SecretMissions) \{\par
                <b>if </b>(iMission==2399) \{\par
                  GM_log(<font color="#800080">'Processing Unknown Mission'</font>);\par
                  <b>if </b>(aParams[2399]==true) bSkipMission = false;\par
                  <b>break</b>;\par
                \} <b>else if </b>(strMissionName.<b>toUpperCase</b>().<b>indexOf</b>(MW_SecretMissions[iMission].test.<b>toUpperCase</b>()) != -1) \{\par
                  <b>if </b>(aParams[iMission] == true) bSkipMission = false;\par
                  <b>break</b>;\par
                \}\par
              \}\par
              <i>// Was mission type accepted\par
              </i><b>if </b>(!bSkipMission) \{\par
                <i>// Mission was selected for processing\par
                </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div id=&quot;positionSelector&quot;'</font>);\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/table&gt;'</font>)+8;\par
                oDiv = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
                oDiv.innerHTML = strTemp.slice(i1,i2)+<font color="#800080">'&lt;/div&gt;'</font>;\par
                oButton = getSnapshot(<font color="#800080">'.//div[@class=&quot;missionSelectorButton&quot;]'</font>,oDiv);\par
                oBox = getSnapshot(<font color="#800080">'.//div[@class=&quot;missionSelectorBox&quot;]'</font>,oDiv);\par
                <i>// Test number of available slots\par
                </i>bSkipMission = true;\par
                <b>if </b>(oButton.snapshotLength &gt; aParams[2026]) \{\par
                  bQueueMission = true;\par
                \} <b>else </b>\{\par
                  <b>for </b>(<b>var </b>i=0;i&lt;oBox.snapshotLength;i++) \{\par
                    <b>if </b>((oBox.snapshotItem(i).innerHTML.<b>indexOf</b>(<font color="#800080">' class=&quot;stamina'</font>)!=-1) &amp;&amp; (oBox.snapshotItem(i).innerHTML.<b>indexOf</b>(<font color="#800080">' class=&quot;energy'</font>)!=-1)) \{\par
                      <i>// Item uses both energy and stamina\par
                      </i><b>if </b>(aParams[2023]==<font color="#800080">'both'</font>) \{\par
                        bQueueMission = true;\par
                        <b>if </b>((strEnergy &gt; aParams[2030])&amp;&amp;(strStamina &gt; aParams[2031])) \{\par
                          bSkipMission = false;\par
                          <b>break</b>;\par
                        \}\par
                      \}\par
                    \} <b>else if </b>(oBox.snapshotItem(i).innerHTML.<b>indexOf</b>(<font color="#800080">' class=&quot;energy'</font>)!=-1) \{\par
                      <i>// Item uses only energy\par
                      </i><b>if </b>((aParams[2023]==<font color="#800080">'both'</font>)||(aParams[2023]==<font color="#800080">'energy'</font>)) \{\par
                        bQueueMission = true;\par
                        <b>if </b>(strEnergy &gt; aParams[2030]) \{\par
                          bSkipMission = false;\par
                          <b>break</b>;\par
                        \}\par
                      \}\par
                    \} <b>else if </b>(oBox.snapshotItem(i).innerHTML.<b>indexOf</b>(<font color="#800080">' class=&quot;stamina'</font>)!=-1) \{\par
                      <i>// Item uses only stamina\par
                      </i><b>if </b>((aParams[2023]==<font color="#800080">'both'</font>)||(aParams[2023]==<font color="#800080">'stamina'</font>)) \{\par
                        bQueueMission = true;\par
                        <b>if </b>(strStamina &gt; aParams[2031]) \{\par
                          bSkipMission = false;\par
                          <b>break</b>;\par
                        \}\par
                      \}\par
                    \} <b>else </b>\{\par
                      <i>// Nothing in here.  This box has already been selected\par
                    </i>\}\par
                  \}\par
                \}\par
                <b>if </b>(!bSkipMission) \{\par
                  oSnap = oBox.snapshotItem(i).innerHTML;\par
                  i1 = oSnap.<b>indexOf</b>(<font color="#800080">'inner_page'</font>)+13;\par
                  i2 = oSnap.<b>indexOf</b>(<font color="#800080">&quot;'&quot;</font>,i1);\par
                  i3 = oSnap.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;positionName&quot;'</font>);\par
                  i3 = oSnap.<b>indexOf</b>(<font color="#800080">'http'</font>,i3);\par
                  i4 = oSnap.<b>indexOf</b>(<font color="#800080">')'</font>,i3);\par
                  myUrl    = <font color="#800080">'http://facebook.mafiawars.zynga.com/mwfb/'</font>;\par
                  myUrl   += oSnap.slice(i1,i2);\par
                  myUrl   +=  <font color="#800080">'&amp;xw_client_id=8'</font>;\par
                  myUrl = myUrl.<b>replace</b>(/&amp;amp;/g,<font color="#800080">'&amp;'</font>);\par
                  myParms = <font color="#800080">'ajax=1&amp;liteload=1'</font>;\par
                  myParms += <font color="#800080">'&amp;sf_xw_sig=' </font>+ local_xw_sig;\par
                  myParms += <font color="#800080">'&amp;sf_xw_user_id=' </font>+ local_xw_user_id;\par
                  strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Selecting Mission - &lt;img src=&quot;'</font>+oSnap.slice(i3,i4)+<font color="#800080">'&quot;&gt;'</font>;\par
                  doMissionStep1(myUrl, myParms, strNotice);\par
                \} <b>else if </b>((aParams[2027] == <font color="#800080">'true'</font>)&amp;&amp;(bQueueMission)) \{\par
                  bSkipItem = false;\par
                  <b>for </b>(<b>var </b>p=0;p&lt;aMissionRetry[0].<b>length</b>;p++) \{\par
                    <b>if </b>(aMissionRetry[0][p].Action.<b>indexOf</b>(Self.Action.slice(Self.Action.<b>indexOf</b>(<font color="#800080">'next_params='</font>)))!=-1) \{bSkipItem = true; <b>break</b>;\}\par
                  \}\par
                  <b>if </b>(!bSkipItem) \{\par
                    <b>var </b>iMissionRetry = aMissionRetry[0].<b>length</b>;\par
                    aMissionRetry[0][iMissionRetry] = Self;\par
                    aMissionRetry[0][iMissionRetry].Next = null;\par
                    aMissionRetry[1][iMissionRetry] = getCurrentTime()+2*(oButton.snapshotLength-1);\par
                    strNotice  = _strNotice;\par
                    strNotice += <font color="#800080">'&lt;br&gt;Queuing Mission: &lt;a href=&quot;'</font>+Self.Action+<font color="#800080">'&quot;&gt;' </font>+strMissionName+<font color="#800080">'&lt;/a&gt;'</font>;\par
                    strNotice += <font color="#800080">'&lt;br&gt;slots open: '</font>+oButton.snapshotLength;\par
                    strNotice += <font color="#800080">'&lt;br&gt;Energy: '</font>+strEnergy;\par
                    strNotice += <font color="#800080">'&lt;br&gt;Stamina: '</font>+strStamina;\par
                    strNotice += <font color="#800080">'&lt;br&gt;retrying in '</font>+2*(oButton.snapshotLength-1)+<font color="#800080">' mins.'</font>;\par
                    LogPush(strNotice);\par
                    NextRequest(aParams[0],aParams[1]);\par
                  \} <b>else </b>\{\par
                    strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Mission already in queue'</font>;\par
                    LogPush(strNotice);\par
                    NextRequest(aParams[0],aParams[1]);\par
                  \}\par
                \} <b>else </b>\{\par
                  strNotice  = _strNotice;\par
                  strNotice += <font color="#800080">'&lt;br&gt;Skipping Mission:' </font>+strMissionName;\par
                  strNotice += <font color="#800080">'&lt;br&gt;slots open: '</font>+oButton.snapshotLength;\par
                  strNotice += <font color="#800080">'&lt;br&gt;Energy: '</font>+strEnergy;\par
                  strNotice += <font color="#800080">'&lt;br&gt;Stamina: '</font>+strStamina;\par
                  LogPush(strNotice);\par
                  NextRequest(aParams[0],aParams[1]);\par
                \}\par
              \} <b>else </b>\{\par
                <i>// Mission is not to be accepted.\par
                </i>GM_log(<font color="#800080">'Skipping mission.  Type not valid'</font>);\par
                NextRequest(aParams[0],aParams[1]);\par
              \}\par
            \} <b>else </b>\{\par
              GM_log(<font color="#800080">'Error processing Mission'</font>);\par
              strNotice = _strNotice+<font color="#800080">'&lt;br&gt;Error Processing Mission.'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[0],aParams[1]);\par
            \}\par
          \} catch(err) \{\par
              GM_log(<font color="#800080">'RequestItem Error: MW_AcceptMission doMissionStep1 - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    try \{\par
      GM_log(<font color="#800080">'MW_AcceptMission Gift Main'</font>);\par
      iErrorCount = 0;\par
      doStep1(strBase,Self.Parms);\par
    \} catch(err) \{\par
      GM_log(<font color="#800080">'Error: MW_AcceptMission main - '</font>+err.message);\par
      NextRequest(aParams[0],aParams[1]);\par
    \}\par
  \}\par
\par
  <b>function </b>MW_AcceptGift() \{\par
    <b>function </b>doStep1(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptGift ' </font>+ Self.Action + <font color="#800080">' doStep 1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
          <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl;\par
            <b>var </b>strTemp;\par
            <b>var </b>strDetails;\par
            <b>var </b>oDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'\{'</font>);\par
            oDetails = JSON.<b>parse</b>(strTemp.slice(i1));\par
            <b>if </b>(oDetails.payload.msg == null) \{\par
              myUrl = <font color="#800080">&quot;&quot;</font>;\par
              <b>for </b>(<b>var </b>i=0;i&lt;oDetails.onload.<b>length</b>;i++) \{\par
                <b>if </b>(oDetails.onload[i].<b>indexOf</b>(<font color="#800080">'goURI'</font>)!=-1) <b>eval</b>(<font color="#800080">&quot;myUrl = &quot; </font>+ oDetails.onload[i].slice(6,-2))\par
              \}\par
              <b>if </b>(myUrl == <font color="#800080">&quot;&quot;</font>) throw \{message:<font color="#800080">&quot;Cannot find goURI in page&quot;</font>\};\par
              doStep2(myUrl,<font color="#800080">''</font>);\par
            \} <b>else </b>\{\par
              <i>// and error has occured while trying to process the request.\par
              </i>GM_log(<font color="#800080">'Msg = '</font>+oDetails.payload.msg);\par
\par
              strDetails  = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Gift:&lt;/b&gt;'</font>;\par
              <b>if </b>(typeof(oDetails.payload.msg)==<font color="#800080">'object'</font>) \{\par
                strDetails += oDetails.payload.msg[<font color="#800080">'__html'</font>];\par
              \} <b>else </b>\{\par
                strDetails += oDetails.payload.msg;\par
              \}\par
              LogPush(strDetails);\par
              NextRequest(aParams[0],aParams[1]);\par
            \}\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_AcceptGift DoStep 1 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    <b>function </b>doStep2(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptGift doStep 2'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            <b>var </b>param = doFBParse(_responseDetails.responseText);\par
            doStep2b(param[0],param[1]);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_AcceptGift DoStep 2 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    <b>function </b>doStep2b(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptGift doMWStep 2b'</font>);\par
\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
            <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp, strTemp_all;\par
            <b>var </b>strDetails;\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            myUrl = doMWRedirParse(_responseDetails.responseText);\par
            doStep3(myUrl,<font color="#800080">''</font>);\par
          \} catch(err) \{\par
              GM_log(<font color="#800080">'Error: MW_AcceptGift doMWStep 2b - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep3(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptGift doStep 3'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            <b>var </b>param = doFBParse(_responseDetails.responseText);\par
            doStep3a(param[0],param[1]);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_AcceptGift DoStep 3 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep3a(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptGift doStep 3a'</font>);\par
      <i>//start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, strTemp, myUrl, myParms;\par
            <b>clearTimeout</b>(iWatchDog);\par
                iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'action=&quot;'</font>);\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Cannot find action= in page&quot;</font>\};\par
            <i>// extract URL\par
            </i>i1 += 8;\par
            i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
            myUrl = strTemp.slice(i1,i2);\par
            myParms = <font color="#800080">''</font>;\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input'</font>,i1);\par
            <b>while </b>(i1!=-1) \{\par
              <b>if </b>(myParms!=<font color="#800080">''</font>) myParms += <font color="#800080">'&amp;'\par
              </font>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'name=&quot;'</font>,i1)+6; i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
              myParms += strTemp.slice(i1,i2)+<font color="#800080">'='</font>;\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'value=&quot;'</font>,i1)+7; i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
              myParms += <b>escape</b>(strTemp.slice(i1,i2));\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input'</font>,i1);\par
            \}\par
            doStep4(myUrl,myParms);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_AcceptGift DoStep 3a - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \})\par
    \}\par
\par
    <b>function </b>doStep4(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptGift doStep 4'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
           <font color="#800080">'Acent-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'</font>,\par
           <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
           <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
           <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, i3, i4, i5, myUrl;\par
            <b>var </b>strTemp;\par
            <b>var </b>strNotice;\par
            <b>var </b>stopit;\par
            <b>var </b>oDiv, oSnapShot;\par
            <b>var </b>GiftItem;\par
            <b>var </b>strAppKey;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">'HTML Page was not read correctly.'</font>\};\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'You cannot accept any more Free Gifts today'</font>)&gt;-1) \{\par
              <i>// You cannot accept any more Free Gifts today You can accept more in 14 hours.\par
              </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'You cannot accept any more Free Gifts today'</font>);\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">' hour'</font>,i1)+5;\par
              <i>// Maybe the problem is here but I am not sure...\par
              </i>strNotice = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Gift:&lt;/b&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;'</font>+strTemp.slice(i1,i2)+<font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;'</font>;\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'more in '</font>,i1)+8;\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">' hour'</font>,i1);\par
              MW_FreeGiftsDelay = getCurrentTime()+60*strTemp.slice(i1,i2);\par
              LogPush(strNotice);\par
              NextRequest(aParams[0],aParams[1]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'This gift has expired! Make sure to accept your gifts right away'</font>)&gt;-1) \{\par
            <i>//GM_log(strTemp);\par
              </i>strNotice = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Gift:&lt;/b&gt;This gift has expired! Make sure to accept your gifts right away'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[0],aParams[1]);\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'Your friend has sent you more than 1 free gift in a day'</font>)&gt;-1) \{\par
              strNotice = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Gift:&lt;/b&gt;Your friend has sent you more than 1 free gift in a day'</font>;\par
              LogPush(strNotice);\par
              NextRequest(aParams[0],aParams[1]);\par
            \} <b>else </b>\{\par
              <i>// Check for Larger Black Gift Screen.\par
              // normal gift\par
              </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;border-bottom: 1px dotted #999; margin: 10px auto; text-align: center; font-size: 20px; padding-bottom: 10px;&quot;&gt;'</font>);\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;border-bottom: 1px dotted #333; margin: 10px auto; text-align: left; font-size: 18px; padding: 10px 0;&quot;&gt;'</font>);\par
              i3 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div id=&quot;asn_social_job_classic_jobs&quot;&gt;'</font>);\par
              i4 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;border: 1px solid #666666; padding:10px; background-color:black;&quot;&gt;'</font>);\par
              i5 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;margin: 10px auto; text-align: center; font-size: 18px; padding-bottom: 10px;&quot;&gt;'</font>); <i>// Stamina boost looked like this\par
              // normal gift\par
              </i><b>if </b>(i1!=-1) \{\par
                <i>// normal gift\par
                </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;float: left;&quot;&gt;'</font>,i1);\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;float: right;&quot;&gt;'</font>,i1);\par
                strNotice  = <font color="#800080">'&lt;table&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td colspan=&quot;3&quot;&gt;'</font>;\par
                strNotice += strTemp.slice(i1,i2);\par
                strNotice += <font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;width: 130px; text-align: center;&quot;&gt;'</font>;\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;img src='</font>,i2);\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1);\par
                strNotice += strTemp.slice(i1,i2+6);\par
                strNotice += <font color="#800080">'&lt;/td&gt;&lt;td width=&quot;50&quot;&gt;&lt;img src=&quot;http://mwfb.static.zynga.com/mwfb/graphics/gift_loop_arrow_green_39x50_01.png&quot;&gt;&lt;/td&gt;&lt;td&gt;'</font>;\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;float: left; text-align: center; width: 200px; padding-top: 55px;&quot;&gt;'</font>,i2);\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;a'</font>,i1)\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;fb:profile-pic'</font>,i1);\par
                strNotice += <font color="#800080">'&lt;div style=&quot;float: left; text-align: center; width: 200px;&quot;&gt;'</font>;\par
                strNotice += strTemp.slice(i1,i2);\par
                strNotice += <font color="#800080">'&lt;img src=&quot;http://static.ak.connect.facebook.com/pics/t_silhouette.jpg&quot;&gt;'</font>;\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/a&gt;'</font>,i2);\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1);\par
                strNotice += strTemp.slice(i1,i2);\par
                strNotice += <font color="#800080">'&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;'</font>;\par
                GiftItem = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Gift:&lt;/b&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;'</font>+strNotice+<font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;'</font>;\par
                <i>// look for regift button\par
                </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;iframe style=&quot;border:0;&quot; id=&quot;giftback_iframe&quot;'</font>);\par
                <b>if </b>( (i1==-1) || (MW_SendThanksDelay &gt; getCurrentTime())) \{\par
                  LogPush(GiftItem);\par
                  NextRequest(aParams[0],aParams[1]);\par
                \} <b>else </b>\{\par
                    <i>//GM_log(&quot;Step4a: &quot; + strTemp);\par
                  </i>myUrl    =  <font color="#800080">'http://facebook.mafiawars.zynga.com/mwfb/'</font>;\par
                  i1       =  strTemp.<b>indexOf</b>(<font color="#800080">'remote/html_server.php'</font>,i1);\par
                  i2       =  strTemp.<b>indexOf</b>(<font color="#800080">&quot;'&quot;</font>,i1);\par
                  myUrl   +=  strTemp.slice(i1,i2);\par
                  myUrl   +=  <font color="#800080">'&amp;xw_client_id=8&amp;ajax=1&amp;liteload=1&amp;fbml_iframe=1'</font>;\par
                  myParms  = <font color="#800080">'&amp;sf_xw_user_id='</font>+<b>escape</b>(local_xw_user_id)+<font color="#800080">'&amp;sf_xw_sig='</font>+local_xw_sig;\par
                  doStep5(myUrl,myParms,GiftItem);\par
                \}\par
              <i>// mystery gift\par
              </i>\} <b>else  if </b>(i2!=-1||i5!=-1) \{\par
                <b>if </b>(i2!=-1)\{\par
                    i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;float: left;&quot;&gt;'</font>,i2);\par
                    i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1);\par
                \} <b>else if </b>(i5!=-1)\{\par
                    i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div id=&quot;accept_gift_which_gift_title&quot; style=&quot;margin:0px 10px; float: left; text-align:left; font-size: 20px; max-width:550px;&quot;&gt;'</font>,i5) +128;\par
                    i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;br /&gt;'</font>, i1) +6;\par
                \}\par
                strNotice  = <font color="#800080">'&lt;table&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td colspan=&quot;3&quot;&gt;'</font>;\par
                strNotice += strTemp.slice(i1,i2);\par
                strNotice += <font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;width: 130px; text-align: center;&quot;&gt;'</font>;\par
                <b>if </b>(i5!=-1)\{\par
                    i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;width: 75px; height: 75px; margin:auto;; clear: none;&quot;&gt;'</font>,i2) +67;\par
                \} <b>else </b>\{\par
                    i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;img src='</font>,i2);\par
                \}\par
\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&gt;'</font>,i1);\par
                strNotice += strTemp.slice(i1,i2+1);\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div'</font>,i2);\par
                <b>if </b>(i5!=-1)\{\par
                    i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div'</font>,i1+1);\par
                \}\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1);\par
                strNotice += strTemp.slice(i1,i2+6);\par
                strNotice += <font color="#800080">'&lt;/td&gt;&lt;td width=&quot;50&quot;&gt;&lt;img src=&quot;http://mwfb.static.zynga.com/mwfb/graphics/gift_loop_arrow_green_39x50_01.png&quot;&gt;&lt;/td&gt;&lt;td&gt;'</font>;\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;float: left; text-align: center; width: 200px; padding-top: 55px;&quot;&gt;'</font>,i2);\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;a'</font>,i1);\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;fb:profile-pic'</font>,i1);\par
                strNotice += <font color="#800080">'&lt;div style=&quot;float: left; text-align: center; width: 200px;&quot;&gt;'</font>;\par
                strNotice += strTemp.slice(i1,i2);\par
                strNotice += <font color="#800080">'&lt;img src=&quot;http://static.ak.connect.facebook.com/pics/t_silhouette.jpg&quot;&gt;'</font>;\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/a&gt;'</font>,i2);\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1);\par
                strNotice += strTemp.slice(i1,i2);\par
                strNotice += <font color="#800080">'&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;'</font>;\par
                GiftItem   = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Gift:&lt;/b&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;'</font>+strNotice+<font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;'</font>;\par
                <i>// look for regift button\par
                </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'html_server.php?xw_controller=freegifts&amp;xw_action=giftback_iframe'</font>);\par
                <b>if </b>( (i1==-1) || (MW_SendThanksDelay &gt; getCurrentTime())) \{\par
                  LogPush(GiftItem);\par
                  NextRequest(aParams[0],aParams[1]);\par
                \} <b>else </b>\{\par
                  <i>//GM_log(&quot;Step4b: &quot; + strTemp);\par
                  </i>myUrl   =  <font color="#800080">'http://facebook.mafiawars.zynga.com/mwfb/remote/'</font>;\par
                  i2      =  strTemp.<b>indexOf</b>(<font color="#800080">&quot;'&quot;</font>,i1);\par
                  myUrl  +=  strTemp.slice(i1,i2);\par
                  myParms = <font color="#800080">'ajax=1&amp;liteload=1&amp;sf_xw_user_id='</font>+<b>escape</b>(local_xw_user_id)+<font color="#800080">'&amp;sf_xw_sig='</font>+local_xw_sig;\par
                  doStep5(myUrl,myParms,GiftItem);\par
                \}\par
              \} <b>else if </b>(i3!=-1) \{\par
                <i>// Social Jobs\par
                </i>i1 = i3;\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;float:right;width:150px;padding'</font>,i1);\par
                strNotice = strTemp.slice(i1,i2);\par
                GiftItem  = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Gift:&lt;/b&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;'</font>+strNotice+<font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;'</font>;\par
                LogPush(GiftItem);\par
                NextRequest(aParams[0],aParams[1]);\par
              \} <b>else if </b>(i4!=-1) \{\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&gt;'</font>,i4)+1;\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style='</font>, i1);\par
                strNotice = strTemp.slice(i1,i2);\par
                GiftItem  = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Gift:&lt;/b&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;'</font>+strNotice+<font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;'</font>;\par
                <i>// test limit on super pignats\par
                </i><b>if </b>(strNotice.<b>indexOf</b>(<font color="#800080">&quot;You've reached your limit for Secret Drops today&quot;</font>) !=-1) \{\par
                  GM_log(<font color="#800080">'Start Delay for accepting Secret Stashes'</font>);\par
                  <i>// Look again in 24 hours\par
                  </i>MW_SecretDropDelay = getCurrentTime()+24*60;\par
                  GiftItem += <font color="#800080">'&lt;br&gt;Maxium number of Secret Drops have been accepted for today'</font>;\par
                \}\par
                LogPush(GiftItem);\par
                NextRequest(aParams[0],aParams[1]);\par
              \} <b>else </b>\{\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;td class=&quot;message_body&quot;&gt;'</font>);\par
                <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Cannot find Message_Body in page&quot;</font>\};\par
                i1 += 25;\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/td&gt;'</font>,i1);\par
                strNotice = strTemp.slice(i1,i2);\par
                GiftItem  = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Gift:&lt;/b&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;'</font>+strNotice+<font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;'</font>;\par
                LogPush(GiftItem);\par
                NextRequest(aParams[0],aParams[1]);\par
              \}\par
            \}\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_AcceptGift DoStep 4 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep5(_myUrl, _myParms, _GiftItem, _formParams) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      <b>var </b>i1, i2, myUrl, myParms;\par
      GM_log(<font color="#800080">'MW_AcceptGift doStep 5'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            <i>// get form data array\par
            </i><b>var </b>param = doFBGiftForm(_responseDetails.responseText,v_app_id, v_post_form_id, v_fb_dtsg);\par
\tab     myUrl=<font color="#800080">'http://apps.facebook.com/fbml/ajax/prompt_send.php?__a=1'</font>;\par
\tab     doStep6(myUrl,param[1],_GiftItem, param[0]);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_AcceptGift DoStep 5 - '</font>+err.message);\par
            LogPush(_GiftItem);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
          \}\par
      \});\par
    \}\par
    <b>function </b>doStep6(_myUrl, _myParms, _GiftItem, _actionURL) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptGift doStep 6'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'</font>,\par
          <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp, strTemp2;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            doStep7(_actionURL,<font color="#800080">''</font>,_GiftItem);\par
          \} catch(err) \{\par
            LogPush(_GiftItem);\par
            GM_log(<font color="#800080">'Error: MW_AcceptGift DoStep 6 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    <b>function </b>doStep7(_myUrl, _myParms, _GiftItem) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptGift doStep 7'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'</font>,\par
          <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp, strTemp2;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'Sorry, you have run out of requests to send with this application. Please try again tomorrow'</font>)!=-1) \{\par
              MW_SendThanksDelay = getCurrentTime()+12*60;\par
              GM_log(<font color="#800080">'MW_AcceptGift aborting Adding Thank you - Limit reached'</font>);\par
              LogPush(_GiftItem );\par
            \} <b>else </b>\{\par
              GM_log(<font color="#800080">'MW_AcceptGift Adding Thank you'</font>);\par
              LogPush(_GiftItem +<font color="#800080">'&lt;br&gt;Thank you gift Sent'</font>);\par
            \}\par
            NextRequest(aParams[0],aParams[1]);\par
          \} catch(err) \{\par
            LogPush(_GiftItem);\par
            GM_log(<font color="#800080">'Error: MW_AcceptGift DoStep 7 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    try \{\par
      GM_log(<font color="#800080">'MW_AcceptGift Gift Main'</font>);\par
      iErrorCount = 0;\par
      doStep1(strBase,Self.Parms);\par
    \} catch(err) \{\par
      GM_log(<font color="#800080">'Error: MW_AcceptGift main - '</font>+err.message);\par
      NextRequest(aParams[0],aParams[1]);\par
    \}\par
  \}\par
\par
  <b>function </b>MW_SendGift() \{\par
    <b>function </b>doStep1(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_SendGift doStep 1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
          <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl;\par
            <b>var </b>strTemp;\par
            <b>var </b>strDetails;\par
            <b>var </b>oDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'\{'</font>);\par
            oDetails = JSON.<b>parse</b>(strTemp.slice(i1));\par
            <b>if </b>(oDetails.payload.msg == null) \{\par
              myUrl = <font color="#800080">&quot;&quot;</font>;\par
              <b>for </b>(<b>var </b>i=0;i&lt;oDetails.onload.<b>length</b>;i++) \{\par
                <b>if </b>(oDetails.onload[i].<b>indexOf</b>(<font color="#800080">'goURI'</font>)!=-1) <b>eval</b>(<font color="#800080">&quot;myUrl = &quot; </font>+ oDetails.onload[i].slice(6,-2))\par
              \}\par
              <b>if </b>(myUrl == <font color="#800080">&quot;&quot;</font>) throw \{message:<font color="#800080">&quot;Cannot find goURI in page&quot;</font>\};\par
              doStep2(myUrl,<font color="#800080">''</font>);\par
            \} <b>else </b>\{\par
              <i>// and error has occured while trying to process the request.\par
              </i>GM_log(<font color="#800080">'Msg = '</font>+oDetails.payload.msg);\par
              strDetails = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Gift:&lt;/b&gt;'</font>;\par
              <b>if </b>(typeof(oDetails.payload.msg)==<font color="#800080">'object'</font>) \{\par
                  strDetails += oDetails.payload.msg[<font color="#800080">'__html'</font>];\par
              \} <b>else </b>\{\par
                  strDetails += oDetails.payload.msg;\par
              \}\par
              LogPush(strDetails);\par
              NextRequest(aParams[0],aParams[1]);\par
            \}\par
          \} catch(err) \{\par
              GM_log(<font color="#800080">'Error: MW_SendGift DoStep 1 - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    <b>function </b>doStep2(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptMission doStep 2'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp, strTemp_all;\par
            <b>var </b>strDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
\tab     <b>var </b>param = doFBParse(_responseDetails.responseText);\par
            <b>if </b>(param[0].<b>length</b>==0) throw(<font color="#800080">'Cannot find goURI'</font>);\par
            doStep3(param[0],<font color="#800080">''</font>);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_AcceptMission DoStep 2 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep3(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_SendGift doStep 3'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            <b>var </b>param = doFBParse(_responseDetails.responseText);\par
            <b>if </b>(param[0].<b>length </b>== 0) \{\par
                GM_log(param[2]);\par
                throw \{message:<font color="#800080">&quot;Could not find next url&quot;</font>\};\par
            \}\par
            doStep3a(param[0],param[1]);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_SendGift DoStep 3 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep3a(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_SendGift doStep 3a'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, strTemp, myUrl, myParms;\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'action=&quot;'</font>);\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Cannot find action= in page&quot;</font>\};\par
            <i>// extract URL\par
            </i>i1 += 8;\par
            i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
            myUrl = strTemp.slice(i1,i2);\par
            myParms = <font color="#800080">''</font>;\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input'</font>,i1);\par
            <b>while </b>(i1!=-1) \{\par
              <b>if </b>(myParms!=<font color="#800080">''</font>) myParms += <font color="#800080">'&amp;'</font>;\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'name=&quot;'</font>,i1)+6; i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
                myParms += strTemp.slice(i1,i2)+<font color="#800080">'='</font>;\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'value=&quot;'</font>,i1)+7; i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
                myParms += <b>escape</b>(strTemp.slice(i1,i2));\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input'</font>,i1);\par
            \}\par
            doStep5(myUrl,myParms);\par
          \} catch(err) \{\par
              GM_log(<font color="#800080">'Error: MW_SendGift DoStep 3a - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \})\par
    \}\par
\par
    <b>function </b>doStep5(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_SendGift doStep 5'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2,i3,i4, myUrl, myUrl2, myParms;\par
            <b>var </b>strTemp;\par
            <b>var </b>iGift;\par
            <b>var </b>strName, strDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">&quot;$('#popup_fodder').html&quot;</font>);\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'(&quot;&lt;div'</font>,i1)+1;\par
            i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;&quot;);'</font>,i1)+7;\par
            <b>eval</b>(<font color="#800080">'strTemp = '</font>+strTemp.slice(i1,i2));\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;gift_popup&quot;&gt;'</font>);\par
            <b>if </b>(i1!=-1) \{\par
              <b>for </b>(<b>var </b>i=0; i&lt;(aParams[2002]*1+2);i++) \{\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input type=&quot;hidden&quot;'</font>,i1);\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'id=&quot;'</font>,i1)+4;\par
                i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
                i3 = strTemp.<b>indexOf</b>(<font color="#800080">'value=&quot;'</font>,i2)+7;\par
                i4 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i3);\par
                <b>if </b>(strTemp.slice(i1,i2) == <font color="#800080">'value_item_id'</font>) iGift = strTemp.slice(i3,i4);\par
              \}\par
              GM_log(<font color="#800080">'Crime Spree Gift = '</font>+iGift );\par
            <i>//value   = &quot;remote/html_server.php?xw_controller=safehouse&amp;xw_action=answer_send&amp;xw_city=1&amp;tmp=1392f19a32e5a6e5d39c060bb5b82556&amp;cb=1000001824540321271674372&amp;target=1253652918     &amp;time_id=1271672934&amp;gkey=8adeaa0754bbfb55ad53c180f8adde85&amp;gift_box=2\par
              </i>myUrl   = <font color="#800080">'http://facebook.mafiawars.zynga.com/mwfb/'</font>;\par
              myUrl  += strTemp.slice(i3,i4);\par
              myUrl  += <font color="#800080">'&amp;gift_id=' </font>+ iGift +<font color="#800080">'&amp;xw_client_id=8'</font>;\par
              myParms = <font color="#800080">'ajax=1&amp;liteload=1&amp;sf_xw_user_id='</font>+<b>escape</b>(local_xw_user_id)+<font color="#800080">'&amp;sf_xw_sig='</font>+local_xw_sig;\par
              <b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">&quot;You have already answered to 5 requests for gifts in 24 hours.&quot;</font>)!=-1) \{\par
                LogPush(<font color="#800080">'&lt;b&gt;MW Crime Spree:&lt;/b&gt; Respect Sent&lt;br&gt;You have already answered to 5 requests for gifts in 24 hours.'</font>);\par
              \} <b>else </b>\{\par
                LogPush(<font color="#800080">'&lt;b&gt;MW Crime Spree:&lt;/b&gt; Respect Sent&lt;br&gt;Reward has been claimed.'</font>);\par
              \}\par
              doStep6(myUrl,myParms);\par
            \} <b>else </b>\{\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;td class=&quot;message_body&quot;&gt;'</font>);\par
              <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Cannot find Message_Body in page&quot;</font>\};\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/td&gt;'</font>,i1);\par
              strDetails = strTemp.slice(i1+25,i2);\par
              LogPush(<font color="#800080">'&lt;b&gt;MW Crime Spree.&lt;/b&gt;&lt;br&gt;'</font>+strDetails);\par
              NextRequest(aParams[0],aParams[1]);\par
            \}\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_SendGift DoStep 5 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \})\par
    \}\par
\par
    <b>function </b>doStep6(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_SendGift doStep 6'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            GM_log(<font color="#800080">'Gift Send and rewarded claimed'</font>);\par
            NextRequest(aParams[0],aParams[1]);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: Request Send MW DoStep 6 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    GM_log(<font color="#800080">'Send MW Gift'</font>);\par
    iErrorCount = 0;\par
    GM_log(<font color="#800080">'Action FB request'</font>);\par
    doStep1(strBase,Self.Parms);\par
  \}\par
\par
  <b>function </b>MW_Join() \{\par
    <b>function </b>doStep1(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_Join doStep 1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
          <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl;\par
            <b>var </b>strTemp;\par
            <b>var </b>strDetails;\par
            <b>var </b>oDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'\{'</font>)\par
            oDetails = JSON.<b>parse</b>(strTemp.slice(i1));\par
            <b>if </b>(oDetails.payload.msg == null) \{\par
              myUrl = <font color="#800080">&quot;&quot;</font>;\par
              <b>for </b>(<b>var </b>i=0;i&lt;oDetails.onload.<b>length</b>;i++) \{\par
                <b>if </b>(oDetails.onload[i].<b>indexOf</b>(<font color="#800080">'goURI'</font>)!=-1) <b>eval</b>(<font color="#800080">&quot;myUrl = &quot; </font>+ oDetails.onload[i].slice(6,-2))\par
              \}\par
              <b>if </b>(myUrl == <font color="#800080">&quot;&quot;</font>) throw \{message:<font color="#800080">&quot;Cannot find goURI in page&quot;</font>\};\par
              doStep2(myUrl,<font color="#800080">''</font>);\par
            \} <b>else </b>\{\par
              <i>// and error has occured while trying to process the request.\par
              </i>GM_log(<font color="#800080">'Msg = '</font>+oDetails.payload.msg);\par
              strDetails  = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Gift:&lt;/b&gt;'\par
              </font><b>if </b>(typeof(oDetails.payload.msg)==<font color="#800080">'object'</font>) \{\par
                  strDetails += oDetails.payload.msg[<font color="#800080">'__html'</font>];\par
              \} <b>else </b>\{\par
                  strDetails += oDetails.payload.msg;\par
              \}\par
              LogPush(strDetails);\par
              NextRequest(aParams[0],aParams[1]);\par
            \}\par
          \} catch(err) \{\par
              GM_log(<font color="#800080">'Error: MW_Join DoStep 1 - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \})\par
    \}\par
    <b>function </b>doStep2(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptMission doStep 2'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
        <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
        <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp, strTemp_all;\par
            <b>var </b>strDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
\tab     <b>var </b>param = doFBParse(_responseDetails.responseText);\par
            <b>if </b>(param[0].<b>length</b>==0) throw(<font color="#800080">'Cannot find goURI'</font>);\par
            doStep3(param[0],<font color="#800080">''</font>);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_AcceptMission DoStep 2 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep3(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_Join doStep 3'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
        <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
        <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            <b>var </b>param = doFBParse(_responseDetails.responseText);\par
            doStep3a(param[0],param[1]);\par
          \} catch(err) \{\par
              GM_log(<font color="#800080">'Error: MW_Join DoStep 3 - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep3a(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_Join doStep 3a'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
          <b>method</b>: <font color="#800080">'POST'</font>,\par
          url: _myUrl,\par
          data: _myParms,\par
          headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, strTemp, myUrl, myParms;\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'action=&quot;'</font>);\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Cannot find action= in page&quot;</font>\};\par
            <i>// extract URL\par
            </i>i1 += 8;\par
            i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
            myUrl = strTemp.slice(i1,i2);\par
            myParms = <font color="#800080">''</font>;\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input'</font>,i1);\par
            <b>while </b>(i1!=-1) \{\par
              <b>if </b>(myParms!=<font color="#800080">''</font>) myParms += <font color="#800080">'&amp;'</font>;\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'name=&quot;'</font>,i1)+6; i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
                myParms += strTemp.slice(i1,i2)+<font color="#800080">'='</font>;\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'value=&quot;'</font>,i1)+7; i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
                myParms += <b>escape</b>(strTemp.slice(i1,i2));\par
                i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input'</font>,i1);\par
            \}\par
            doStep4(myUrl,myParms);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_Join DoStep 3a - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \})\par
    \}\par
\par
    <b>function </b>doStep4(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_Join doStep 4'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, i3, i4, myUrl, myParms;\par
            <b>var </b>strTemp;\par
            <b>var </b>strNotice;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;ul class=&quot;incoming_requests clearfix&quot;&gt;'</font>);\par
            <b>if </b>(i1 == -1) \{\par
              LogPush(<font color="#800080">'&lt;b&gt;MW Join&lt;/b&gt;&lt;br&gt;Could not find user.  Possibly already joined'</font>);\par
              throw \{message:<font color="#800080">'Cannot find &lt;ul class=&quot;incoming_requests clearfix&quot;&gt; in page'</font>\};\par
            \}\par
            i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/ul&gt;'</font>,i1);\par
            strTemp = strTemp.slice(i1,i2);\par
            i1 = 0;\par
            do \{\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;li&gt;'</font>,i1);\par
              <b>if </b>(i1!=-1) \{\par
                strNotice = <font color="#800080">'&lt;b&gt;Mafia Wars Join:&lt;/b&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;'</font>;\par
                i1 = i1+1;\par
                <i>// get user's picture\par
                </i>i3 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;span '</font>,i1);\par
                i4 = strTemp.<b>indexOf</b>(<font color="#800080">'[&lt;a href'</font>,i3);\par
                strNotice += strTemp.slice(i3,i4) + <font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;'</font>;\par
                i3 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;a href=&quot;'</font>,i1);\par
                i4 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot; onclick='</font>,i3);\par
                myUrl       = strTemp.slice(i3+9,i4)+<font color="#800080">'&amp;xw_client_id=8'</font>;\par
                myParms     = <font color="#800080">'ajax=1&amp;liteload=1&amp;sf_xw_user_id='</font>+<b>escape</b>(local_xw_user_id)+<font color="#800080">'&amp;sf_xw_sig='</font>+local_xw_sig;\par
                <b>if </b>(myUrl.<b>indexOf</b>(Join_id) != -1) \{\par
                  GM_log(<font color="#800080">'Found Member to add to mafia'</font>);\par
                  doStep5(myUrl,myParms,strNotice);\par
                  <i>// stop the loop\par
                  </i><b>break</b>;\par
                \}\par
              \} <b>else </b>\{\par
                GM_log(<font color="#800080">'MW_Join Could not find user to Join'</font>);\par
                LogPush(<font color="#800080">'&lt;b&gt;MW Join&lt;/b&gt;&lt;br&gt;Could not find user.  Possibly already joined'</font>);\par
                NextRequest(aParams[0],aParams[1]);\par
              \}\par
            \} <b>while </b>(i1 != -1);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_Join DoStep 4 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \})\par
    \}\par
\par
    <b>function </b>doStep5(_myUrl, _myParms, _strDetails) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_Join doStep 5'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'*/*'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
          <font color="#800080">'X-Requested-With'</font>: <font color="#800080">'XMLHttpRequest'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp;\par
            <b>var </b>strDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp     = _responseDetails.responseText;\par
            i1          = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;td class=&quot;message_body&quot;&gt;'</font>);\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Cannot find Message_Body in page&quot;</font>\};\par
            i2          = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/td&gt;'</font>,i1);\par
            strDetails  = _strDetails + strTemp.slice(i1+25,i2);\par
            LogPush(strDetails);\par
            GM_log(<font color="#800080">'MW Join sucessfull'</font>);\par
            NextRequest(aParams[0],aParams[1]);\par
          \} catch(err) \{\par
              GM_log(<font color="#800080">'Error: MW_Join DoStep 5 - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    try \{\par
      GM_log(<font color="#800080">'Send MW Join'</font>);\par
      <b>var </b>Join_id;\par
      <b>var </b>i1,i2;\par
      i1 = Self.Parms.<b>indexOf</b>(<font color="#800080">'[from_id]='</font>)+10;\par
      i2 = Self.Parms.<b>indexOf</b>(<font color="#800080">'&amp;'</font>,i1);\par
      Join_id = Self.Parms.slice(i1,i2);\par
      iErrorCount = 0;\par
      GM_log(<font color="#800080">'Action FB request'</font>);\par
      doStep1(strBase,Self.Parms);\par
    \} catch(err) \{\par
      GM_log(<font color="#800080">'Error: Request Join MW Main'</font>);\par
      NextRequest(aParams[0],aParams[1]);\par
    \}\par
  \}\par
\par
  <b>function </b>MW_AcceptEnergy() \{\par
    <b>function </b>doStep1(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptEnergy doStep 1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
            <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
            <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl;\par
            <b>var </b>strTemp;\par
            <b>var </b>strDetails;\par
            <b>var </b>oDetails;\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'\{'</font>);\par
            oDetails = JSON.<b>parse</b>(strTemp.slice(i1));\par
            <b>if </b>(oDetails.payload.msg == null) \{\par
              myUrl = <font color="#800080">&quot;&quot;</font>;\par
              <b>for </b>(<b>var </b>i=0;i&lt;oDetails.onload.<b>length</b>;i++) \{\par
                  <b>if </b>(oDetails.onload[i].<b>indexOf</b>(<font color="#800080">'goURI'</font>)!=-1) <b>eval</b>(<font color="#800080">&quot;myUrl = &quot; </font>+ oDetails.onload[i].slice(6,-2))\par
              \}\par
              <b>if </b>(myUrl == <font color="#800080">&quot;&quot;</font>) throw \{message:<font color="#800080">&quot;Cannot find goURI in page&quot;</font>\};\par
              doStep2(myUrl,<font color="#800080">''</font>);\par
            \} <b>else </b>\{\par
              <i>// and error has occured while trying to process the request.\par
              </i>GM_log(<font color="#800080">'Msg = '</font>+oDetails.payload.msg);\par
              strDetails  = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Gift:&lt;/b&gt;'</font>;\par
              <b>if </b>(typeof(oDetails.payload.msg)==<font color="#800080">'object'</font>) \{\par
                  strDetails += oDetails.payload.msg[<font color="#800080">'__html'</font>];\par
              \} <b>else </b>\{\par
                  strDetails += oDetails.payload.msg;\par
              \}\par
              LogPush(strDetails);\par
              NextRequest(aParams[0],aParams[1]);\par
            \}\par
          \} catch(err) \{\par
              GM_log(<font color="#800080">'Error: MW_AcceptEnergy DoStep 1 - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep2(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptMission doStep 2'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
          <b>method</b>: <font color="#800080">'GET'</font>,\par
          url: _myUrl,\par
          headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            <b>var </b>param = doFBParse(_responseDetails.responseText);\par
            doStep2b(param[0],param[1]);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_AcceptMission DoStep 2 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    <b>function </b>doStep2b(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptMission DoStep 2b'</font>);\par
\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
            <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp, strTemp_all;\par
            <b>var </b>strDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            myUrl = doMWRedirParse(_responseDetails.responseText);\par
            doStep3(myUrl,<font color="#800080">''</font>);\par
          \} catch(err) \{\par
              GM_log(<font color="#800080">'MW_AcceptMission DoStep 2b - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep3(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptEnergy doStep 3'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
          <b>method</b>: <font color="#800080">'GET'</font>,\par
          url: _myUrl,\par
          headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            <b>var </b>param = doFBParse(_responseDetails.responseText);\par
            doStep3a(param[0], param[1]);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_SendGift DoStep 3 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep3a(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptEnergy doStep 3a'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
            <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, strTemp, myUrl, myParms;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'action=&quot;'</font>);\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Cannot find action= in page&quot;</font>\};\par
            <i>// extract URL\par
            </i>i1 += 8;\par
            i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
            myUrl = strTemp.slice(i1,i2);\par
            myParms = <font color="#800080">''</font>;\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input'</font>,i1);\par
            <b>while </b>(i1!=-1) \{\par
              <b>if </b>(myParms!=<font color="#800080">''</font>) myParms += <font color="#800080">'&amp;'</font>;\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'name=&quot;'</font>,i1)+6; i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
              myParms += strTemp.slice(i1,i2)+<font color="#800080">'='</font>;\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'value=&quot;'</font>,i1)+7; i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
              myParms += <b>escape</b>(strTemp.slice(i1,i2));\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;input'</font>,i1);\par
            \}\par
            doStep4(myUrl,myParms);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_AcceptEnergy DoStep 3a - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep4(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptEnergy doStep 4'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
         <b>method</b>: <font color="#800080">'POST'</font>,\par
         url: _myUrl,\par
         data: _myParms,\par
         headers: \{\par
           <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
           <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
           <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, i3, i4, myUrl, myParms;\par
            <b>var </b>strTemp;\par
            <b>var </b>strNotice;\par
            <b>var </b>GiftItem;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            <i>// Check for energy popup.\par
            </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;border-bottom: 1px dotted #999; margin: 10px auto; text-align: center; font-size: 20px; padding-bottom: 10px;&quot;&gt;'</font>);\par
            i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;text-align: center; border: 1px solid #666666; padding:10px; background-color:black;&quot;&gt;'</font>);\par
            i4 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;border: 1px solid #666666; padding:10px; background-color:black;&quot;&gt;'</font>);\par
            <b>if </b>(i1!=-1) \{\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;float: left;&quot;&gt;'</font>,i1);\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1);\par
              strNotice  = <font color="#800080">'&lt;table&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td colspan=&quot;3&quot;&gt;'</font>;\par
              strNotice += strTemp.slice(i1,i2);\par
              strNotice += <font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;width: 130px; text-align: center;&quot;&gt;'</font>;\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;img src='</font>,i2);\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1);\par
              strNotice += strTemp.slice(i1,i2+6);\par
              strNotice += <font color="#800080">'&lt;/td&gt;&lt;td width=&quot;50&quot;&gt;&lt;img src=&quot;http://mwfb.static.zynga.com/mwfb/graphics/gift_loop_arrow_green_39x50_01.png&quot;&gt;&lt;/td&gt;&lt;td&gt;'</font>;\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style=&quot;float: left; text-align: center; width: 200px; padding-top: 55px;&quot;&gt;'</font>,i2);\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;a'</font>,i1);\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;fb:profile-pic'</font>,i1);\par
              strNotice += <font color="#800080">'&lt;div style=&quot;float: left; text-align: center; width: 200px;&quot;&gt;'</font>;\par
              strNotice += strTemp.slice(i1,i2);\par
              strNotice += <font color="#800080">'&lt;img src=&quot;http://static.ak.connect.facebook.com/pics/t_silhouette.jpg&quot;&gt;'</font>;\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/a&gt;'</font>,i2);\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1);\par
              strNotice += strTemp.slice(i1,i2);\par
              strNotice += <font color="#800080">'&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;'</font>;\par
              GiftItem   = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Energy:&lt;/b&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;'</font>+strNotice+<font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;'</font>;\par
              <i>// look for button to send energy back\par
              </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;fb:request-form style='</font>);\par
              <b>if </b>( (i1==-1) || (MW_SendThanksDelay &gt; getCurrentTime())) \{\par
                LogPush(GiftItem);\par
                NextRequest(aParams[0],aParams[1]);\par
              \} <b>else </b>\{\par
                myUrl    =  <font color="#800080">'http://www.connect.facebook.com/widgets/serverfbml.php'</font>;\par
                i1       =  strTemp.<b>indexOf</b>(<font color="#800080">'FB.Facebook.init(&quot;'</font>)+18;\par
                i2       =  strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
                myParms  =  <font color="#800080">'app_key='</font>+strTemp.slice(i1,i2);\par
                i1       =  i2 +1;\par
                i1       =  strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1)+1;\par
                i2       =  strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
                myParms +=  <font color="#800080">'&amp;channel_url='</font>+ encodeURIComponent(strTemp.slice(i1,i2));\par
                i1       =  strTemp.<b>indexOf</b>(<font color="#800080">'&lt;fb:fbml&gt;'</font>);\par
                i2       =  strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/script&gt;'</font>,i1);\par
                myParms +=  <font color="#800080">'&amp;fbml='</font>+encodeURIComponent(strTemp.slice(i1,i2));\par
                doStep5(myUrl,myParms,GiftItem);\par
              \}\par
            \} <b>else if </b>(i2!=-1) \{\par
               i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&gt;'</font>,i2)+1;\par
               i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style='</font>, i1);\par
               strNotice = strTemp.slice(i1,i2);\par
               GiftItem    = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Energy:&lt;/b&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;'</font>+strNotice+<font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;'</font>;\par
               LogPush(GiftItem);\par
               NextRequest(aParams[0],aParams[1]);\par
            \} <b>else if </b>(i4!=-1) \{\par
               i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&gt;'</font>,i4)+1;\par
               i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div style='</font>, i1);\par
               strNotice = strTemp.slice(i1,i2);\par
               GiftItem    = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Energy:&lt;/b&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;'</font>+strNotice+<font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;'</font>;\par
               LogPush(GiftItem);\par
               NextRequest(aParams[0],aParams[1]);\par
            \} <b>else </b>\{\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;td class=&quot;message_body&quot;&gt;'</font>);\par
              <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Cannot find Message_Body in page&quot;</font>\};\par
              i1 += 25;\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/td&gt;'</font>,i1);\par
              strNotice = strTemp.slice(i1,i2);\par
              GiftItem    = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Energy:&lt;/b&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;'</font>+strNotice+<font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;'</font>;\par
              LogPush(GiftItem);\par
              NextRequest(aParams[0],aParams[1]);\par
            \}\par
          \} catch(err) \{\par
              GM_log(<font color="#800080">'Error: MW_AcceptEnergy DoStep 4 - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep5(_myUrl, _myParms, _GiftItem) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      <b>var </b>i1, i2;\par
      GM_log(<font color="#800080">'MW_AcceptEnergy doStep 5'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
          <b>method</b>: <font color="#800080">'POST'</font>,\par
          url: _myUrl,\par
          data: _myParms,\par
          headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp, strTemp2;\par
            <b>var </b>aTemp;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            <i>// get form data array\par
            </i>i1 =  strTemp.<b>indexOf</b>(<font color="#800080">'PlatformInvite.sendInvitation'</font>);\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">&quot;Cannot find PlatformInvite.sendInvitation in page&quot;</font>\};\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&amp;quot;request_form'</font>,i1);\par
            i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&amp;#125;);'</font>);\par
            strTemp2 = <font color="#800080">'\{'</font>+strTemp.slice(i1,i2)+<font color="#800080">'\}'</font>;\par
            strTemp2 = strTemp2.<b>replace</b>(/&amp;quot;/g,<font color="#800080">'&quot;'</font>);\par
            aTemp = JSON.<b>parse</b>(strTemp2);\par
            <i>// start URL\par
            </i>myUrl       = <font color="#800080">'http://www.connect.facebook.com/fbml/ajax/prompt_send.php?__a=1'</font>;\par
            myParms     = <font color="#800080">'app_id='</font>+aTemp[<font color="#800080">&quot;app_id&quot;</font>];\par
            myParms    += <font color="#800080">'&amp;to_ids[0]='</font>+aTemp[<font color="#800080">&quot;prefill&quot;</font>];\par
            myParms    += <font color="#800080">'&amp;request_type='</font>+<b>escape</b>(aTemp[<font color="#800080">&quot;request_type&quot;</font>]);\par
            myParms    += <font color="#800080">'&amp;invite='</font>+aTemp[<font color="#800080">&quot;invite&quot;</font>];\par
            i1          = strTemp.<b>indexOf</b>(<font color="#800080">' action=&quot;'</font>);\par
            i1          = strTemp.<b>indexOf</b>(<font color="#800080">'content=&quot;'</font>,i1);\par
            <b>if </b>(i1 == -1) \{GM_log(strTemp);throw \{message:<font color="#800080">&quot;Cannot find content=\\\\ in page&quot;</font>\};\}\par
            i1         += 9;\par
            i2          = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1)-1;\par
            strTemp2    = <b>eval</b>(<font color="#800080">'&quot;'</font>+strTemp.slice(i1,i2)+<font color="#800080">'&quot;'</font>);\par
            myParms    += <font color="#800080">'&amp;content='</font>+encodeURIComponent(strTemp2);\par
            myParms    += <font color="#800080">'&amp;preview=false'</font>;\par
            myParms    += <font color="#800080">'&amp;is_multi='</font>+aTemp[<font color="#800080">&quot;is_multi&quot;</font>];\par
            myParms    += <font color="#800080">'&amp;is_in_canvas='</font>+aTemp[<font color="#800080">&quot;is_in_canvas&quot;</font>];\par
            myParms    += <font color="#800080">'&amp;form_id='</font>+aTemp[<font color="#800080">&quot;request_form&quot;</font>];\par
            myParms    += <font color="#800080">'&amp;include_ci='</font>+aTemp[<font color="#800080">&quot;include_ci&quot;</font>];\par
            myParms    += <font color="#800080">'&amp;prefill=true&amp;message=&amp;donot_send=false&amp;__d=1'</font>;\par
            i1          = strTemp.<b>indexOf</b>(<font color="#800080">'name=&quot;post_form_id&quot; value=&quot;'</font>);\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">'Cannot find name=&quot;post_form_id&quot; value=&quot; in page'</font>\};\par
            i1         += 27;\par
            i2          = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
            myParms    += <font color="#800080">'&amp;post_form_id='</font>+strTemp.slice(i1,i2);\par
            i1          = strTemp.<b>indexOf</b>(<font color="#800080">'fb_dtsg:&quot;'</font>,i1);\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">'Cannot find fb_dtsg:&quot; in page'</font>\};\par
            i1         += 9;\par
            i2          = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
            myParms    += <font color="#800080">'&amp;fb_dtsg='</font>+strTemp.slice(i1,i2);\par
            myParms    += <font color="#800080">'&amp;post_form_id_source=AsyncRequest'</font>;\par
            doStep6(myUrl,myParms,_GiftItem);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: MW_AcceptEnergy DoStep 5 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep6(_myUrl, _myParms, _GiftItem) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'MW_AcceptEnergy doStep 6'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'</font>,\par
          <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
              <b>var </b>i1, i2, myUrl, myParms;\par
              <b>var </b>strTemp, strTemp2;\par
\par
              <b>clearTimeout</b>(iWatchDog);\par
              iErrorCount = 0;\par
\par
              <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
              strTemp = _responseDetails.responseText;\par
              GM_log(strTemp);\par
              <b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'Sorry, you have run out of requests to send with this application'</font>)!=-1) \{\par
                MW_SendThanksDelay = getCurrentTime()+12*60;\par
                GM_log(<font color="#800080">'MW_AcceptEnergy aborting Adding Thank you - Limit reached'</font>);\par
                LogPush(_GiftItem );\par
              \} <b>else </b>\{\par
                GM_log(<font color="#800080">'MW_AcceptEnergy Adding Thank you'</font>);\par
                LogPush(_GiftItem +<font color="#800080">'&lt;br&gt;Thank you Energy Pack Sent'</font>);\par
              \}\par
              NextRequest(aParams[0],aParams[1]);\par
          \} catch(err) \{\par
            LogPush(_GiftItem);\par
            GM_log(<font color="#800080">'Error: MW_AcceptEnergy DoStep 6 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    try \{\par
      GM_log(<font color="#800080">'Accept MW Energy'</font>);\par
      iErrorCount = 0;\par
      GM_log(<font color="#800080">'Action FB request'</font>);\par
      doStep1(strBase,Self.Parms);\par
    \} catch(err) \{\par
      GM_log(<font color="#800080">'Error: Request Accept MW Energy main - '</font>+err.message);\par
      NextRequest(aParams[0],aParams[1]);\par
    \}\par
  \}\par
\par
  <i>// FarmVille Code\par
  </i><b>function </b>FV_AcceptGift() \{\par
    <b>function </b>doStep1(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FV_AcceptGift doStep 1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
          <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'\{'</font>);\par
            oDetails = JSON.<b>parse</b>(strTemp.slice(i1));\par
            <b>if </b>(oDetails.payload.msg == null) \{\par
              myUrl = <font color="#800080">&quot;&quot;</font>;\par
              <b>for </b>(<b>var </b>i=0;i&lt;oDetails.onload.<b>length</b>;i++) \{\par
                <b>if </b>(oDetails.onload[i].<b>indexOf</b>(<font color="#800080">'goURI'</font>)!=-1) \{\par
                  <b>eval</b>(<font color="#800080">&quot;myUrl = &quot; </font>+ oDetails.onload[i].slice(6,-2));\par
                \}\par
              \}\par
              <b>if </b>(myUrl == <font color="#800080">&quot;&quot;</font>) throw \{message:<font color="#800080">&quot;Cannot find goURI in page&quot;</font>\};\par
              doStep2(myUrl,<font color="#800080">''</font>);\par
            \} <b>else </b>\{\par
             <i>// and error has occured while trying to process the request.\par
              </i>GM_log(<font color="#800080">'Msg = '</font>+oDetails.payload.msg);\par
              strDetails  = <font color="#800080">'&lt;b&gt;FarmVille Accept Gift:&lt;/b&gt;&lt;br&gt;'</font>;\par
               <b>if </b>(typeof(oDetails.payload.msg)==<font color="#800080">'object'</font>) \{\par
                strDetails += oDetails.payload.msg[<font color="#800080">'__html'</font>];\par
              \} <b>else </b>\{\par
                strDetails += oDetails.payload.msg;\par
              \}\par
              LogPush(strDetails);\par
              NextRequest(aParams[0],aParams[1]);\par
            \}\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem FV_AcceptGift Error: Request Accept FV DoStep 1 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep2(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FV_AcceptGift doStep 2'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
          <b>method</b>: <font color="#800080">'GET'</font>,\par
          url: _myUrl,\par
          headers: \{\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myUrl2, myParms;\par
            <b>var </b>strTemp,strTemp2, strTemp_all;\par
            <b>var </b>GiftItem;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
\tab     <b>var </b>param = doFBParse(_responseDetails.responseText);\par
\tab     strTemp = param[2];\par
            strTemp_all = param[2];\par
            GiftItem = <font color="#800080">&quot;&lt;b&gt;FarmVille Accept Gift:&lt;/b&gt;&quot;</font>;\par
            <b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;giftLimit&quot;&gt;'</font>)!=-1) \{\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;giftLimit&quot;&gt;'</font>);\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1);\par
              <i>// a little testing\par
              </i><b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'You have already accepted this gift'</font>) != -1) \{\par
                GiftItem += <font color="#800080">'&lt;br&gt;'</font>+strTemp.slice(i1+23,i2);\par
              \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'The gift you tried to accept was LIMITED EDITION and is no longer available'</font>) != -1) \{\par
                GiftItem += <font color="#800080">'&lt;br&gt;'</font>+strTemp.slice(i1+23,i2);\par
              \} <b>else </b>\{\par
                GiftItem += <font color="#800080">'&lt;br&gt;'</font>+strTemp.slice(i1+23,i2)+<font color="#800080">'&lt;br&gt;FV Gift Accepting is being turned off for Two (2) Hour.  Please accept some of your FV gifts.'</font>;\par
                FV_accept_ignore = <b>Math</b>.<b>floor</b>(<b>new Date</b>().<b>valueOf</b>()/1000) + 120*60;\par
              \}\par
              LogPush(GiftItem);\par
              NextRequest(aParams[0],aParams[1]);\par
              <b>return</b>;\par
            \} <b>else if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;giftConfirm_name&quot;&gt;'</font>)!=-1) \{\par
              i1          = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;giftConfirm_name&quot;&gt;'</font>);\par
              i2          = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1);\par
              GiftItem   += <font color="#800080">'&lt;br&gt;You just accepted a '</font>+strTemp.slice(i1+30,i2);\par
              i1          = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;giftFrom_name&quot;&gt;'</font>);\par
              <b>if </b>(i1 == -1) throw \{message:<font color="#800080">'Cannot find &lt;div class=&quot;giftFrom_name&quot;&gt; in page'</font>\};\par
              i2          = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1);\par
              GiftItem   += <font color="#800080">' from '</font>+strTemp.slice(i1+27,i2);\par
              i1          = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;giftConfirm_img&quot;&gt;'</font>);\par
              <b>if </b>(i1 == -1) throw \{message:<font color="#800080">'Cannot find &lt;div class=&quot;giftConfirm_img&quot;&gt; in page'</font>\};\par
              i2          = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1);\par
              GiftItem   += <font color="#800080">'&lt;br&gt;'</font>+strTemp.slice(i1+29,i2);\par
              <i>// check for thank you gift\par
              </i>i1      = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;thank_you_gift&quot;&gt;'</font>);\par
              <b>if </b>(i1==-1) \{\par
                <i>// no thank you gift\par
                </i>LogPush(GiftItem);\par
                NextRequest(aParams[0],aParams[1]);\par
                <b>return</b>;\par
              \} <b>else </b>\{\par
                <i>// found the thank you gift\par
                </i>myUrl    = <font color="#800080">'http://apps.facebook.com/fbml/ajax/prompt_send.php?__a=1'</font>;\par
                <b>var </b>params = doFBGiftForm (strTemp_all, v_app_id, v_post_form_id, v_fb_dtsg)\par
                doStep3(myUrl, params[1], params[0], GiftItem);\par
              \}\par
            \} <b>else </b>\{\par
              GiftItem += <font color="#800080">'&lt;br&gt;An error occured while accepting this FarmVille gift. The gift data was not found.  Please remember to accept each gift right away.'</font>;\par
              LogPush(GiftItem);\par
              NextRequest(aParams[0],aParams[1]);\par
              <b>return</b>;\par
            \}\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem FV_AcceptGift Error: Request Accept FV DoStep 2 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep3(_myUrl, _myParms, _myUrl2, _GiftItem) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FV_AcceptGift doStep 3: ' </font>+ _myUrl);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
          <b>method</b>: <font color="#800080">'POST'</font>,\par
          url: _myUrl,\par
          data: _myParms,\par
          headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
            <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'</font>,\par
            <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
          \},\par
          onload: <b>function</b>(_responseDetails) \{\par
            try \{\par
              <b>var </b>i1, i2, myUrl, myParms;\par
              <b>var </b>strTemp;\par
\par
              <b>clearTimeout</b>(iWatchDog);\par
              iErrorCount = 0;\par
\par
              <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
              doStep3a(_myUrl2,<font color="#800080">''</font>,_GiftItem);\par
            \} catch(err) \{\par
              GM_log(<font color="#800080">'RequestItem FV_AcceptGift Error: Request Accept FV DoStep 3 - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
            \}\par
          \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep3a(_myUrl, _myParms, _GiftItem) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FV_AcceptGift doStep 3a: ' </font>+ _myUrl);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
          <b>method</b>: <font color="#800080">'POST'</font>,\par
          url: _myUrl,\par
          data: _myParms,\par
          headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
            <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'</font>,\par
            <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
          \},\par
          onload: <b>function</b>(_responseDetails) \{\par
            try \{\par
              <b>var </b>i1, i2, myUrl, myParms;\par
              <b>var </b>strTemp;\par
\par
              <b>clearTimeout</b>(iWatchDog);\par
              iErrorCount = 0;\par
\par
              <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
              strTemp = _responseDetails.responseText;\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'window.location.replace(&quot;'</font>)+24;\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;)'</font>,i1);\par
              <b>eval</b>(<font color="#800080">&quot;myUrl = &quot; </font>+ strTemp.slice(i1,i2+1));\par
              LogPush(_GiftItem +<font color="#800080">'&lt;br&gt;Thank you gift Sent'</font>);\par
              doStep4(myUrl,<font color="#800080">''</font>);\par
            \} catch(err) \{\par
              GM_log(<font color="#800080">'RequestItem FV_AcceptGift Error: Request Accept FV DoStep 3a - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
            \}\par
          \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep4(_myUrl, _myParms ) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FV_AcceptGift doStep 4: ' </font>+ _myUrl);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp;\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
\tab     <b>var </b>param = doFBParse(_responseDetails.responseText);\par
\tab     strTemp = param[2];\par
            i1      = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;morePending_bttn&quot;&gt;'</font>);\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">'Cannot find &lt;div class=&quot;morePending_bttn&quot;&gt; in page'</font>\};\par
            i1      = strTemp.<b>indexOf</b>(<font color="#800080">'http:'</font>,i1);\par
            i2      = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
            myUrl   = strTemp.slice(i1,i2);\par
            myUrl   = myUrl.<b>replace</b>(/&amp;amp;/g,<font color="#800080">'&amp;'</font>);\par
            doStep5(myUrl, <font color="#800080">''</font>);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem FV_AcceptGift Error: Request Accept FV DoStep 4 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep5(_myUrl, _myParms ) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FV_AcceptGift doStep 5: ' </font>+ _myUrl);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
<i>//      method: 'HEAD', url: _myUrl, data: _myParms,\par
        </i><b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            GM_log(<font color="#800080">'fv gift sent'</font>);\par
            NextRequest(aParams[0],aParams[1]);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem FV_AcceptGift Error: Request Accept FV DoStep 5 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    try \{\par
      GM_log(<font color="#800080">'FarmVille Accept Gift'</font>);\par
      iErrorCount = 0;\par
      GM_log(<font color="#800080">'Action FB request'</font>);\par
      doStep1(strBase,Self.Parms);\par
    \} catch(err) \{\par
      GM_log(<font color="#800080">'Error: Request Accept FV Main - '</font>+err.message);\par
      NextRequest(aParams[0],aParams[1]);\par
    \}\par
  \}\par
\par
  <b>function </b>FV_SendGift() \{\par
    <b>function </b>doStep1(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FV_SendGift doStep 1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
          <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
              <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'\{'</font>);\par
            oDetails = JSON.<b>parse</b>(strTemp.slice(i1));\par
            <b>if </b>(oDetails.payload.msg == null) \{\par
                myUrl = <font color="#800080">&quot;&quot;</font>;\par
                <b>for </b>(<b>var </b>i=0;i&lt;oDetails.onload.<b>length</b>;i++) \{\par
                  <b>if </b>(oDetails.onload[i].<b>indexOf</b>(<font color="#800080">'goURI'</font>)!=-1) \{\par
                    <b>eval</b>(<font color="#800080">&quot;myUrl = &quot; </font>+ oDetails.onload[i].slice(6,-2));\par
                  \}\par
                \}\par
                <b>if </b>(myUrl == <font color="#800080">&quot;&quot;</font>) throw \{message:<font color="#800080">&quot;Cannot find goURI in page&quot;</font>\};\par
                doStep2(myUrl,<font color="#800080">''</font>);\par
            \} <b>else </b>\{\par
              <i>// and error has occured while trying to process the request.\par
              </i>GM_log(<font color="#800080">'Msg = '</font>+oDetails.payload.msg);\par
              strDetails  = <font color="#800080">'&lt;b&gt;FarmVille Send Gift:&lt;/b&gt;&lt;br&gt;'</font>;\par
              <b>if </b>(typeof(oDetails.payload.msg)==<font color="#800080">'object'</font>) \{\par
              strDetails += oDetails.payload.msg[<font color="#800080">'__html'</font>];\par
            \} <b>else </b>\{\par
              strDetails += oDetails.payload.msg;\par
            \}\par
              LogPush(strDetails);\par
              NextRequest(aParams[0],aParams[1]);\par
            \}\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem FV_SendGift Error: Request FV Send DoStep 1 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep2(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FV_SendGift doStep 2'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp, strTemp_all;\par
            <b>var </b>strName, strValue;\par
            <b>var </b>strNotice;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
\tab     <b>var </b>param = doFBParse(_responseDetails.responseText);\par
\tab     strTemp = param[2];\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;main_giftConfirm_cont&quot;&gt;'</font>);\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">'Cannot find &lt;div class=&quot;main_giftConfirm_cont&quot;&gt; in page'</font>\};\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;h3'</font>,i1);\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&gt;'</font>,i1)+1;\par
            i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/h3'</font>,i1);\par
            strNotice  = <font color="#800080">'&lt;b&gt;FarmVille Send Gift/Help:&lt;/b&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;'</font>;\par
            strNotice += strTemp.slice(i1,i2);\par
            <b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;giftConfirm_img&quot;&gt;'</font>)!=-1) \{\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;giftConfirm_img&quot;&gt;'</font>);\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;/div&gt;'</font>,i1)+6;\par
              strNotice += <font color="#800080">'&lt;br&gt;'</font>+strTemp.slice(i1,i2);\par
            \}\par
            strNotice += <font color="#800080">'&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;'</font>;\par
            LogPush(strNotice);\par
            NextRequest(aParams[0],aParams[1]);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem FV_SendGift Error: Request FV Send DoStep 2 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    try \{\par
      GM_log(<font color="#800080">'FV Send gift'</font>);\par
      iErrorCount = 0;\par
      GM_log(<font color="#800080">'Action FB request'</font>);\par
      doStep1(strBase,Self.Parms);\par
    \} catch(err) \{\par
      GM_log(<font color="#800080">'Error: Request Join FV Send main - '</font>+err.message);\par
      NextRequest(aParams[0],aParams[1]);\par
    \}\par
  \}\par
\par
  <b>function </b>FV_Join() \{\par
    <b>function </b>doStep1(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FV_Join doStep 1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
          <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'\{'</font>);\par
            oDetails = JSON.<b>parse</b>(strTemp.slice(i1));\par
            <b>if </b>(oDetails.payload.msg == null) \{\par
              myUrl = <font color="#800080">&quot;&quot;</font>;\par
              <b>for </b>(<b>var </b>i=0;i&lt;oDetails.onload.<b>length</b>;i++) \{\par
                <b>if </b>(oDetails.onload[i].<b>indexOf</b>(<font color="#800080">'goURI'</font>)!=-1) \{\par
                  <b>eval</b>(<font color="#800080">&quot;myUrl = &quot; </font>+ oDetails.onload[i].slice(6,-2));\par
                \}\par
              \}\par
              <b>if </b>(myUrl == <font color="#800080">&quot;&quot;</font>) throw \{message:<font color="#800080">&quot;Cannot find goURI in page&quot;</font>\};\par
              doStep2(myUrl,<font color="#800080">''</font>);\par
            \} <b>else </b>\{\par
              <i>// and error has occured while trying to process the request.\par
              </i>GM_log(<font color="#800080">'Msg = '</font>+oDetails.payload.msg);\par
              strDetails  = <font color="#800080">'&lt;b&gt;FarmVille Join Gift:&lt;/b&gt;&lt;br&gt;'</font>;\par
              <b>if </b>(typeof(oDetails.payload.msg)==<font color="#800080">'object'</font>) \{\par
              strDetails += oDetails.payload.msg[<font color="#800080">'__html'</font>];\par
            \} <b>else </b>\{\par
              strDetails += oDetails.payload.msg;\par
            \}\par
              LogPush(strDetails);\par
              NextRequest(aParams[0],aParams[1]);\par
            \}\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem FV_Join Error: Request Join FV DoStep 1 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep2(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FV_Join doStep 2'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp;\par
            <b>var </b>strName, strValue;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp = _responseDetails.responseText;\par
            LogPush(<font color="#800080">'&lt;b&gt;FarmVille Join&lt;/b&gt;&lt;br&gt;You have accepted a FarmVille Neighbour request.'</font>);\par
            NextRequest(aParams[0],aParams[1])\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem FV_Join Error: Request Join FV DoStep 2 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    try \{\par
      GM_log(<font color="#800080">'FV Join'</font>);\par
      iErrorCount = 0;\par
      GM_log(<font color="#800080">'Action FB request'</font>);\par
      doStep1(strBase,Self.Parms);\par
    \} catch(err) \{\par
      GM_log(<font color="#800080">'Error: Request Join FV Main - '</font>+err.message);\par
      NextRequest(aParams[0],aParams[1]);\par
    \}\par
  \}\par
\par
  <b>function </b>FV_ClaimBonus() \{\par
    <b>function </b>doStep1(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FV_ClaimBonus doStep 1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
            <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
            <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl;\par
            <b>var </b>strTemp;\par
            <b>var </b>strDetails;\par
            <b>var </b>oDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'\{'</font>);\par
            oDetails = JSON.<b>parse</b>(strTemp.slice(i1));\par
            <b>if </b>(oDetails.payload.msg == null) \{\par
              myUrl = <font color="#800080">&quot;&quot;</font>;\par
              <b>for </b>(<b>var </b>i=0;i&lt;oDetails.onload.<b>length</b>;i++) \{\par
                <b>if </b>(oDetails.onload[i].<b>indexOf</b>(<font color="#800080">'goURI'</font>)!=-1) <b>eval</b>(<font color="#800080">&quot;myUrl = &quot; </font>+ oDetails.onload[i].slice(6,-2));\par
              \}\par
              <b>if </b>(myUrl == <font color="#800080">&quot;&quot;</font>) throw \{message:<font color="#800080">&quot;Cannot find goURI in page&quot;</font>\};\par
              doStep2(myUrl,<font color="#800080">''</font>);\par
            \} <b>else </b>\{\par
              <i>// and error has occured while trying to process the request.\par
              </i>GM_log(<font color="#800080">'Msg = '</font>+oDetails.payload.msg);\par
              strDetails  = <font color="#800080">'&lt;b&gt;Mafia Wars Accept Gift:&lt;/b&gt;'</font>;\par
              <b>if </b>(typeof(oDetails.payload.msg)==<font color="#800080">'object'</font>) \{\par
                  strDetails += oDetails.payload.msg[<font color="#800080">'__html'</font>];\par
              \} <b>else </b>\{\par
                  strDetails += oDetails.payload.msg;\par
              \}\par
              LogPush(strDetails);\par
              NextRequest(aParams[0],aParams[1]);\par
            \}\par
          \} catch(err) \{\par
              GM_log(<font color="#800080">'RequestItem FV_ClaimBonus Error: FV_ClaimBonus DoStep 1 - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep2(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FV_ClaimBonus doStep 2'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
            <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            <b>var </b>param = doFBParse(_responseDetails.responseText);\par
            doStep3(param[0], param[1]);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem FV_ClaimBonus Error: FV_ClaimBonus DoStep 2 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep3(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FV_ClaimBonus doStep 3'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: _myUrl,\par
        headers: \{\par
            <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
            <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp;\par
            <b>var </b>GiftItem;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            strTemp   = _responseDetails.responseText;\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'transparent url(&quot;'</font>)+17;\par
            <b>if </b>(i1 == -1) throw \{message:<font color="#800080">'Cannot find transparent url(&quot; in page'</font>\};\par
            i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>);\par
            GiftItem = strTemp.slice(i1,i2);\par
            LogPush(<font color="#800080">'&lt;b&gt;FarmVille Bonus Claimed&lt;/b&gt;&lt;br&gt;&lt;img width=50% src=&quot;'</font>+GiftItem+<font color="#800080">'&quot;'</font>);\par
            NextRequest(aParams[0],aParams[1]);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem FV_ClaimBonus Error: Request Bonus FV DoStep 3 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    try \{\par
      GM_log(<font color="#800080">'FV Claim Bonus'</font>);\par
      iErrorCount = 0;\par
      doStep1(strBase,Self.Parms);\par
    \} catch(err) \{\par
      GM_log(<font color="#800080">'Error: Request Bonus FV Main - '</font>+err.message);\par
      NextRequest(aParams[0],aParams[1]);\par
    \}\par
  \}\par
\par
  <i>// FaceBook Code\par
  </i><b>function </b>FB_accept_friend() \{\par
    <b>function </b>doStep1(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FB_accept_friend Add Step 1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
         <b>method</b>: <font color="#800080">'POST'</font>,\par
         url: _myUrl,\par
         data: _myParms,\par
         headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
          <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl, myParms;\par
            <b>var </b>strTemp;\par
            <b>var </b>strDetails;\par
            <b>var </b>oDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'\{'</font>);\par
            oDetails = JSON.<b>parse</b>(strTemp.slice(i1));\par
            strDetails  = <font color="#800080">'&lt;b&gt;FaceBook Friend Invitation:&lt;/b&gt;&lt;br&gt;'</font>;\par
            <b>if </b>(typeof(oDetails.payload.msg)==<font color="#800080">'object'</font>) \{\par
              strTemp = oDetails.payload.msg[<font color="#800080">'__html'</font>];\par
            \} <b>else </b>\{\par
              strTemp = oDetails.payload.msg;\par
            \}\par
            strDetails += strTemp;\par
            LogPush(strDetails);\par
            myUrl = <font color="#800080">&quot;http://www.facebook.com/friends/ajax/lists.php?__a=1&quot;</font>;\par
            <i>// Code to move friend into selected group\par
            </i><b>if </b>(Self.Gifttype == <font color="#800080">'friend_connect'</font>) \{\par
              <b>if </b>(aParams[1001]!=0) \{\par
                GM_log(<font color="#800080">'aParams[1001] = '</font>+aParams[1001]);\par
                i1    = strTemp.<b>indexOf</b>(<font color="#800080">'id='</font>)+3;\par
                i2    = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
                myParms    =  <font color="#800080">&quot;flid=&quot;</font>+aParams[1001];\par
                myParms   +=  <font color="#800080">&quot;&amp;id=&quot;</font>+ strTemp.slice(i1,i2);\par
                myParms   +=  <font color="#800080">&quot;&amp;quick=true&amp;add=1&amp;post_form_id=&quot;</font>+Post_form_id;\par
                myParms   +=  <font color="#800080">&quot;&amp;fb_dtsg=&quot;</font>+FB_dtsg;\par
                myParms   +=  <font color="#800080">&quot;&amp;lsd&amp;post_form_id_source=AsyncRequest&quot;</font>;\par
                doStep2(myUrl,myParms);\par
              \} <b>else </b>\{\par
                NextRequest(aParams[0],aParams[1]);\par
              \}\par
            \} <b>else </b>\{\par
              <b>if </b>(aParams[1003]!=0) \{\par
                GM_log(<font color="#800080">'aParams[1003] = '</font>+aParams[1003]);\par
                i1    = strTemp.<b>indexOf</b>(<font color="#800080">'id='</font>)+3;\par
                i2    = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
                myParms    =  <font color="#800080">&quot;flid=&quot;</font>+aParams[1001];\par
                myParms   +=  <font color="#800080">&quot;&amp;id=&quot;</font>+ strTemp.slice(i1,i2);\par
                myParms   +=  <font color="#800080">&quot;&amp;quick=true&amp;add=1&amp;post_form_id=&quot;</font>+Post_form_id;\par
                myParms   +=  <font color="#800080">&quot;&amp;fb_dtsg=&quot;</font>+FB_dtsg;\par
                myParms   +=  <font color="#800080">&quot;&amp;lsd&amp;post_form_id_source=AsyncRequest&quot;</font>;\par
                doStep2(myUrl,myParms);\par
              \} <b>else </b>\{\par
                 NextRequest(aParams[0],aParams[1]);\par
              \}\par
            \}\par
            <i>// NextRequest(aParams[0],aParams[1]);\par
          </i>\} catch(err) \{\par
              GM_log(<font color="#800080">'RequestItem FB_accept_friend Error: Request FB Ignore DoStep 1 - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
\par
    <b>function </b>doStep2(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FB_accept_friend Step 2'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
         <b>method</b>: <font color="#800080">'POST'</font>,\par
         url: _myUrl,\par
         data: _myParms,\par
         headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
          <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl;\par
            <b>var </b>strTemp;\par
            <b>var </b>strDetails;\par
            <b>var </b>oDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            NextRequest(aParams[0],aParams[1]);\par
          \} catch(err) \{\par
              GM_log(<font color="#800080">'RequestItem FB_accept_friend Error: Request FB Ignore DoStep 2 - '</font>+err.message);\par
              NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    try \{\par
      GM_log(<font color="#800080">'FB Accept Friend'</font>);\par
      iErrorCount = 0;\par
      doStep1(strBase,Self.Parms+<font color="#800080">'&amp;post_form_id_source=AsyncRequest'</font>);\par
    \} catch(err) \{\par
      GM_log(<font color="#800080">'Error: FB Accept Friend Main - '</font>+err.message);\par
      NextRequest(aParams[0],aParams[1]);\par
    \}\par
  \}\par
\par
  <b>function </b>FB_ignore()\{\par
    <b>function </b>doStep1(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FB Ignore Step 1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: _myUrl,\par
        data: _myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
          <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl;\par
            <b>var </b>strTemp;\par
            <b>var </b>strDetails;\par
            <b>var </b>oDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'\{'</font>);\par
            oDetails = JSON.<b>parse</b>(strTemp.slice(i1));\par
            strDetails  = <font color="#800080">'&lt;b&gt;FaceBook Request Ignore:&lt;/b&gt;&lt;br&gt;'</font>;\par
            <b>if </b>(typeof(oDetails.payload.msg)==<font color="#800080">'object'</font>) \{\par
              strDetails += oDetails.payload.msg[<font color="#800080">'__html'</font>];\par
            \} <b>else </b>\{\par
              strDetails += oDetails.payload.msg;\par
            \}\par
            LogPush(strDetails);\par
            NextRequest(aParams[0],aParams[1]);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem Error: Request FB Ignore DoStep 1 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    try \{\par
      GM_log(<font color="#800080">'FB Ignore Request'</font>);\par
      iErrorCount = 0;\par
      doStep1(strBase,strReject+Self.Parms+<font color="#800080">'&amp;post_form_id_source=AsyncRequest'</font>);\par
    \} catch(err) \{\par
      GM_log(<font color="#800080">'Error: FB Ignore Request Main - '</font>+err.message);\par
      NextRequest(aParams[0],aParams[1]);\par
    \}\par
  \}\par
\par
  <b>function </b>FB_removeEvent() \{\par
    <b>function </b>doStep1(_myUrl, _myParms) \{\par
      <b>var </b>iCurrentJob, iWatchDog;\par
      GM_log(<font color="#800080">'RequestItem FB_removeEvent Step 1'</font>);\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); \}, 15000);\par
      iCurrentJob = GM_xmlhttpRequest(\{\par
         <b>method</b>: <font color="#800080">'POST'</font>,\par
         url: _myUrl,\par
         data: _myParms,\par
         headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded; charset=UTF-8'</font>,\par
          <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
        \},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>i1, i2, myUrl;\par
            <b>var </b>strTemp;\par
            <b>var </b>strDetails;\par
            <b>var </b>oDetails;\par
\par
            <b>clearTimeout</b>(iWatchDog);\par
            iErrorCount = 0;\par
\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'\{'</font>);\par
            oDetails = JSON.<b>parse</b>(strTemp.slice(i1));\par
            GM_log(<font color="#800080">'Msg = '</font>+oDetails.payload.msg);\par
\par
            strDetails  = <font color="#800080">'&lt;b&gt;FaceBook Request Ignore:&lt;/b&gt;&lt;br&gt;'</font>;\par
            <b>if </b>(typeof(oDetails.payload.msg)==<font color="#800080">'object'</font>) \{\par
              strDetails += oDetails.payload.msg[<font color="#800080">'__html'</font>];\par
            \} <b>else </b>\{\par
              strDetails += oDetails.payload.msg;\par
            \}\par
            LogPush(strDetails);\par
            NextRequest(aParams[0],aParams[1]);\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'RequestItem FB_removeEvent Error: Request FB Remove Event DoStep 1 - '</font>+err.message);\par
            NextRequest(aParams[0],aParams[1]);\par
          \}\par
        \}\par
      \});\par
    \}\par
    try \{\par
      GM_log(<font color="#800080">'FB Remove Event'</font>);\par
      iErrorCount = 0;\par
      doStep1(strBase,Self.Parms+<font color="#800080">'&amp;post_form_id_source=AsyncRequest'</font>);\par
    \} catch(err) \{\par
      GM_log(<font color="#800080">'Error: FB Remove Event Main - '</font>+err.message);\par
      NextRequest(aParams[0],aParams[1]);\par
    \}\par
  \}\par
\par
  <i>// Main Code\par
  </i><b>var </b>iHoldEvent;\par
  <b>var </b>Self;\par
  <b>var </b>i1, i2, i3, i4;\par
  <b>var </b>strTemp;\par
  <b>var </b>aCat;\par
  <b>var </b>xmlhttp;\par
  <b>var </b>myURL;\par
  <b>var </b>iErrorCount;\par
  <i>/* Form vars scoped to this request */\par
  </i><b>var </b>v_fb_dtsg;\par
  <b>var </b>v_post_form_id;\par
  <b>var </b>v_post_req_form;\par
  <b>var </b>v_app_id;\par
\par
  Self = <b>this</b>;\par
  iHoldEvent = iRequestCurrent;\par
  <i>// stop processing if autorun turned off\par
  </i><b>if </b>(bAutoRun) \{\par
  <i>//alert(Self.Gifttype);\par
    // Grab to original form vars here for use later on in gift backs,,\par
    </i>i1 = Self.Parms.<b>indexOf</b>(<font color="#800080">'fb_dtsg='</font>);\par
    <b>if </b>(i1!=-1) \{\par
        i2 = Self.Parms.<b>indexOf</b>(<font color="#800080">'&amp;'</font>,i1);\par
        v_fb_dtsg = Self.Parms.slice(i1+8,i2);\par
    \}\par
    i1 = Self.Parms.<b>indexOf</b>(<font color="#800080">'post_form_id='</font>);\par
    <b>if </b>(i1!=-1) \{\par
        i2 = Self.Parms.<b>indexOf</b>(<font color="#800080">'&amp;'</font>,i1);\par
        v_post_form_id = Self.Parms.slice(i1+13,i2);\par
    \}\par
    i1 = Self.Parms.<b>indexOf</b>(<font color="#800080">'params[app_id]='</font>);\par
    <b>if </b>(i1!=-1) \{\par
        i2 = Self.Parms.<b>indexOf</b>(<font color="#800080">'&amp;'</font>,i1);\par
        v_app_id = Self.Parms.slice(i1+15,i2);\par
    \}\par
\par
    aCat    = Self.Gifttype.<b>split</b>(<font color="#800080">'_'</font>);\par
    switch (aCat[0]) \{\par
      case <font color="#800080">'friend'</font>:\par
        switch (aCat[1]) \{\par
          case <font color="#800080">'suggestion'</font>:\par
            GM_log(<font color="#800080">'Found Friend Suggestion'</font>);\par
            FB_accept_friend();\par
            <b>break</b>;\par
          case <font color="#800080">'connect'</font>:\par
            GM_log(<font color="#800080">'Found Friend Connect'</font>);\par
            FB_accept_friend();\par
            <b>break</b>;\par
        \}\par
        <b>break</b>;\par
      case <font color="#800080">'event'</font>:\par
        FB_removeEvent();\par
        <b>break</b>;\par
      case <font color="#800080">'fbpage'</font>:\par
        FB_ignore();\par
        <b>break</b>;\par
      case <font color="#800080">'group'</font>:\par
        FB_ignore();\par
        <b>break</b>;\par
      case <font color="#800080">'app'</font>:\par
        switch (aCat[1]) \{\par
          case <font color="#800080">'10979261223'</font>:\par
            <i>// Mafiawars\par
            </i><b>if </b>(xw_sig_valid == false) \{\par
              LogPush(<font color="#800080">'Skipping Mafia Wars item.  Mafia wars does not appear to be working.'</font>);\par
              NextRequest(aParams[0],aParams[1]);\par
            \} <b>else if </b>(Self.Action.<b>indexOf</b>(<font color="#800080">'accept_energy_req'</font>) != -1) \{\par
              <i>// Energy\par
              </i>GM_log(<font color="#800080">'MW Energy'</font>);\par
              MW_AcceptEnergy();\par
            \} <b>else if </b>((Self.Action.<b>indexOf</b>(<font color="#800080">'accept_'</font>)!=-1)||(Self.Action.<b>indexOf</b>(<font color="#800080">'secret_stash_help'</font>)!=-1)) \{\par
              GM_log(<font color="#800080">'MW Accept Gift'</font>);\par
              <i>// Super Pignata Test\par
              </i><b>if </b>(MW_FreeGiftsDelay&gt;getCurrentTime()) \{\par
                GM_log(<font color="#800080">'skip accept free gifts.  limit reached'</font>);\par
                NextRequest(10,10);\par
              \} <b>else if </b>(Self.Action.<b>indexOf</b>(<font color="#800080">'Secret%2BDrop'</font>) != -1) \{\par
                <b>if </b>(getCurrentTime()&gt; MW_SecretDropDelay || aParams[2025]!=2) \{\par
                  GM_log(<font color="#800080">'Accept Secret Drop'</font>);\par
                  MW_AcceptGift();\par
                \} <b>else </b>\{\par
                  GM_log(<font color="#800080">'Skip Secret Drop'</font>);\par
                  NextRequest(aParams[0],aParams[1]);\par
                \}\par
              \} <b>else </b>\{\par
                MW_AcceptGift();\par
              \}\par
            \} <b>else if </b>(Self.Action.<b>indexOf</b>(<font color="#800080">'safehouse'</font>) != -1) \{\par
              GM_log(<font color="#800080">'MW Send Respect'</font>);\par
              MW_SendGift();\par
            \} <b>else if </b>(Self.Action.<b>indexOf</b>(<font color="#800080">'socialmission'</font>) != -1) \{\par
              GM_log(<font color="#800080">'MW Accept Mission Respect'</font>);\par
              MW_AcceptMission();\par
            \} <b>else if </b>(Self.Action.<b>indexOf</b>(<font color="#800080">'recruit'</font>) != -1) \{\par
              GM_log(<font color="#800080">'MW Join'</font>);\par
              MW_Join();\par
            \}\par
            <b>break</b>;\par
          case <font color="#800080">'102452128776'</font>:\par
            <i>// FarmVille\par
            </i><b>if </b>(Self.Action.<b>indexOf</b>(<font color="#800080">'giftaccept'</font>) != -1) \{\par
              GM_log(<font color="#800080">'FarmVille Accept Gift'</font>);\par
              <b>if </b>(aParams[3000]&gt;2) \{\par
                <b>if </b>( FV_accept_ignore &lt; (<b>Math</b>.<b>floor</b>(<b>new Date</b>().<b>valueOf</b>()/1000))) \{\par
                  FV_AcceptGift();\par
                \} <b>else </b>\{\par
                  GM_log(<font color="#800080">'Skipped Delay'</font>);\par
                  NextRequest(1,aParams[1]);\par
                \}\par
              \} <b>else </b>\{\par
                FV_AcceptGift();\par
              \}\par
            \} <b>else if </b>((Self.Action.<b>indexOf</b>(<font color="#800080">'sendmats'</font>) != -1) || (Self.Action.<b>indexOf</b>(<font color="#800080">'sendcredits'</font>)!=-1) || (Self.Action.<b>indexOf</b>(<font color="#800080">'confirmfeatureinvite'</font>)!=-1)) \{\par
              GM_log(<font color="#800080">'FV Send Gifts'</font>);\par
              FV_SendGift();\par
            \} <b>else if </b>(Self.Action.<b>indexOf</b>(<font color="#800080">'stimulus'</font>) != -1) \{\par
              GM_log(<font color="#800080">'FV Claim Bonus'</font>);\par
              FV_ClaimBonus();\par
            \} <b>else </b>\{\par
              GM_log(<font color="#800080">'FV Joins'</font>);\par
              FV_Join();\par
            \}\par
            <b>break</b>;\par
          default:\par
            GM_log(<font color="#800080">'Ignoring Other Request'</font>);\par
            <b>if </b>(aParams[4000]==1) \{\par
              FB_ignore();\par
            \} <b>else </b>\{\par
              LogPush(<font color="#800080">'Skipping Other Request'</font>);\par
              NextRequest(1,aParams[1]);\par
            \}\par
            <b>break</b>;\par
        \}\par
        <b>break</b>;\par
      \}\par
    \} <b>else </b>\{\par
      GM_log(<font color="#800080">'Some one turn the switch off'</font>);\par
    \}\par
  \}\par
\}\par
<i>/**** End Wall Notification code ****/\par
\par
</i><b>function </b>StartProcessing() \{\par
  LogPush(<font color="#800080">'&lt;span style=&quot;color:green&quot;&gt;&lt;b&gt;Starting Automatic Request processing&lt;/b&gt;&lt;/span&gt;'</font>);\par
  bAutoRun = true;\par
  iRequestNum = 0;\par
  oRespectList.Erase();\par
  oWallList.Erase();\par
  oRequestList.Erase();\par
\par
  <b>if </b>(aParams[1] == null) aParams[1] = 0;\par
  <b>if </b>(aParams[3] == null) aParams[3] = 0;\par
  <b>if </b>(aParams[6] == null) aParams[6] = 0;\par
  <b>if </b>(aParams[7] == null) aParams[7] = 1;\par
  <b>if </b>(aParams[8] == null) aParams[8] = 1;\par
\par
  <b>if</b>( aParams[1] &gt; 0) \{\par
    EventSpan.dispatchEvent(ActionRequest);\par
  \} <b>else </b>\{\par
    LogPush(<font color="#800080">'Request Processing is Disabled'</font>);\par
  \}\par
  <b>if</b>( aParams[3] &gt; 0) \{\par
    EventSpan.dispatchEvent(ActionWall);\par
  \} <b>else </b>\{\par
    LogPush(<font color="#800080">'Wall Processing is Disabled'</font>);\par
  \}\par
  <b>if</b>( aParams[6] &gt; 0) \{\par
    GM_log(<font color="#800080">'dispatching Event ActionRespect'</font>);\par
    EventSpan.dispatchEvent(ActionRespect);\par
  \} <b>else </b>\{\par
    LogPush(<font color="#800080">'Respect Processing is Disabled'</font>);\par
  \}\par
\}\par
\par
<b>function </b>StopProcessing() \{\par
  bAutoRun = false;\par
  <b>clearTimeout</b>(iRespectCurrent);\par
  <b>clearTimeout</b>(iRequestCurrent);\par
  <b>clearTimeout</b>(iWallCurrent);\par
\par
  LogPush(<font color="#800080">'&lt;span style=&quot;color:red&quot;&gt;&lt;b&gt;Stopping Automatic Request Processing&lt;/b&gt;&lt;/span&gt;'</font>);\par
\}\par
\par
<i>/*** Start section to read in items from MW and FV  ****/\par
//Read Respect\par
</i><b>function </b>ReadRespect() \{\par
  <b>var </b>myUrl, myParms;\par
  <b>var </b>iHoldEvent, iWatchDog, iCurrentJob;\par
  GM_log(<font color="#800080">'ReadRespect Start'</font>);\par
  iHoldEvent = iRespectCurrent;\par
  <i>// stop processing if autorun turned off\par
  </i><b>if </b>(bAutoRun) \{\par
    oRespectList.Erase();\par
    <b>if </b>(xw_sig_valid == false) \{\par
      GM_log(<font color="#800080">'About Read Respect.  MW does not appear to be working'</font>);\par
      LogPush(<font color="#800080">'&lt;b&gt;Ignoring Crime Spree Gifts.  Mafia Wars does not appear to be working.  Checking again in '</font>+aParams[6]+<font color="#800080">' minutes.&lt;/b&gt;'</font>);\par
      iRespectCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionRespect);\},getRandRange(aParams[6]*50000,aParams[6]*70000));\par
      <b>if </b>(iRespectCurrent &lt; iHoldEvent) \{\par
        <i>// The browser has reset.  Cancel runaway jobs;\par
        </i><b>clearTimeout</b>(iRespectCurrent);\par
      \}\par
    \} <b>else </b>\{\par
      GM_log(<font color="#800080">'start'</font>);\par
      myUrl    = <font color="#800080">'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=safehouse&amp;xw_action=view&amp;xw_city=1'</font>;\par
      myParms  = <font color="#800080">'skip_req_frame=1&amp;first_load=1'</font>;\par
      myParms += <font color="#800080">'&amp;sf_xw_user_id='</font>+<b>escape</b>(local_xw_user_id)+<font color="#800080">'&amp;sf_xw_sig='</font>+local_xw_sig;\par
      <i>// start the WatchDog Timer to catch hung requests. 15 seconds maximum.\par
      </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{\par
        iCurrentJob.abort();\par
        GM_log(<font color="#800080">'WatchDog timer killing Read Respect job.'</font>);\par
        <i>// zero out the found list\par
        </i>FirstRespect = null;\par
        LastRespect  = null;\par
        LogPush(<font color="#800080">'&lt;b&gt;Finished processing crime spree gifts.  Checking again in '</font>+aParams[6]+<font color="#800080">' minutes.&lt;/b&gt;'</font>);\par
        iRespectCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionRespect);\},getRandRange(aParams[6]*50000,aParams[6]*70000));\par
        <b>if </b>(iRespectCurrent &lt; iHoldEvent) \{\par
          <i>// The browser has reset. Cancel runaway jobs;\par
          </i><b>clearTimeout</b>(iRespectCurrent);\par
        \}\par
      \}, 15000);;\par
      <i>// check for respect\par
      </i>iCurrentJob = GM_xmlhttpRequest(\{\par
        <b>method</b>: <font color="#800080">'POST'</font>,\par
        url: myUrl,\par
        data: myParms,\par
        headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
        </font>\},\par
        onload: <b>function</b>(_responseDetails) \{\par
          try \{\par
            <b>var </b>strTemp;\par
            <b>var </b>i1,i2;\par
            <b>var </b>oDiv,oButton, oSnapShot;\par
            <b>var </b>oRespect;\par
            <i>// clear watch dog timer\par
\par
            </i><b>clearTimeout</b>(iWatchDog);\par
\par
            <b>if </b>(_responseDetails.<b>status </b>!= 200) \{\par
              GM_log(<font color="#800080">'Error checking for crime spree gifts'</font>);\par
            \} <b>else </b>\{\par
              oDiv = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
              strTemp = _responseDetails.responseText;\par
              i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;gift_safehouse_giftbox_cont&quot;&gt;'</font>);\par
              i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div id=&quot;inner_flag&quot; style=&quot;display: none;&quot;&gt;&lt;/div&gt;'</font>,i1);\par
              oDiv.innerHTML = strTemp.slice(i1,i2);\par
            <i>//oSnapShot = getSnapshot('.//div[@class=&quot;gift_safehouse_open_link&quot;]/a',oDiv);\par
              </i>oSnapShot = getSnapshot(<font color="#800080">'.//div[@class=&quot;gift_safehouse_open_link&quot;]/a/span/span[text()=&quot;Open Safe&quot;]//parent::*//parent::a'</font>,oDiv);\par
              <b>if</b>(oSnapShot.snapshotLength&gt;0) \{\par
                LogPush(<font color="#800080">'&lt;b&gt;Found '</font>+oSnapShot.snapshotLength+<font color="#800080">' crime spree gifts&lt;/b&gt;'</font>);\par
                <b>for </b>(<b>var </b>i=0;i&lt;oSnapShot.snapshotLength;i++) \{\par
                  oButton         = oSnapShot.snapshotItem(oSnapShot.snapshotLength-1-i);\par
                  oRespect        = <b>new </b>RespectItem();\par
                  oRespect.Action = oButton.<b>href</b>;\par
                  oRespectList.Append(oRespect);\par
                \}\par
              \}\par
              <i>// start processing the requests\par
              </i><b>if </b>(oRespectList.First != null) \{\par
                iRespectCurrent = <b>setTimeout</b>(<b>function </b>(e) \{EventSpan.dispatchEvent(ActionRespect);\}, getRandRange(aParams[5]*750,aParams[5]*1250));\par
              \} <b>else </b>\{\par
                LogPush(<font color="#800080">'&lt;b&gt;Finished processing crime spree gifts.  Checking again in '</font>+aParams[6]+<font color="#800080">' minutes.&lt;/b&gt;'</font>);\par
                iRespectCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionRespect);\}, getRandRange(aParams[6]*50000,aParams[6]*70000));\par
              \}\par
              <b>if </b>(iRespectCurrent &lt; iHoldEvent) \{\par
                <i>// The browser has reset.  Cancel runaway jobs;\par
                </i><b>clearTimeout</b>(iRespectCurrent);\par
              \}\par
            \}\par
          \} catch(err) \{\par
            GM_log(<font color="#800080">'Error: Read Respect - '</font>+err.message);\par
            LogPush(<font color="#800080">'&lt;b&gt;Error in Crime Spree Gifts.  Checking again in '</font>+aParams[6]+<font color="#800080">' minutes.&lt;/b&gt;'</font>);\par
            iRespectCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ oRespectList.Erase(); EventSpan.dispatchEvent(ActionRespect);\},getRandRange(aParams[6]*50000,aParams[6]*70000));\par
            <b>if </b>(iRespectCurrent &lt; iHoldEvent) \{\par
              <i>// The browser has reset.  Cancel runaway jobs;\par
              </i><b>clearTimeout</b>(iRespectCurrent);\par
            \}\par
          \}\par
        \}\par
      \});\par
    \}\par
  \} <b>else </b>\{\par
      GM_log(<font color="#800080">'Abort read request.  Switch is off'</font>);\par
  \}\par
\}\par
\par
<i>// Read Wall Posting\par
</i><b>function </b>ReadWall() \{\par
  <b>var </b>myUrl;\par
  <b>var </b>iHoldEvent, iWatchDog, iCurrentJob;\par
  <b>var </b>iNewNow;\par
  <b>var </b>maxstories, app_ids;\par
  <b>var </b>bWallTest;\par
  iHoldEvent = iWallCurrent;\par
  <i>// This controls the maximum number of stories ReadWall will process.\par
  </i>maxstories = 75;\par
  <i>// stop processing if autorun turned off\par
  </i><b>if </b>(bAutoRun &amp;&amp; (aParams[7]==1||aParams[8]==1)) \{\par
    oWallList.Erase();\par
    <i>// Could have pushed/joined to get the appid's, but we only have 2 options.\par
    </i><b>if </b>(aParams[7]==1 &amp;&amp; aParams[8]==1)\{\par
        app_ids = <font color="#800080">'10979261223_102452128776'</font>;\par
    \} <b>else if </b>(aParams[7]==1)\{\par
        app_ids = <font color="#800080">'10979261223'</font>;\par
    \} <b>else if </b>(aParams[8]==1)\{\par
        app_ids = <font color="#800080">'102452128776'</font>;\par
    \}\par
    myUrl = <font color="#800080">'http://www.facebook.com/ajax/apps/app_stories.php?__a=1&amp;is_game=1&amp;app_ids=' </font>+app_ids+<font color="#800080">'&amp;max_stories='</font>+maxstories+<font color="#800080">'&amp;show_hidden=true&amp;ignore_self=true&amp;user_action=1'</font>;\par
<i>/*\par
    Note: It will work for the following Apps (apps_ids= )\par
    10979261223  -&gt; Mafia Wars\par
    102452128776 -&gt; FarmVille\par
*/\par
    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.\par
    </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{\par
        iCurrentJob.abort();\par
        GM_log(<font color="#800080">'WatchDog timer killing ReadWall job. Checking again in '</font>+aParams[3]+<font color="#800080">' seconds.'</font>);\par
        <b>if </b>(typeof( gvar.svn_rev ) == <font color="#800080">'undefined'</font>) \{\par
          LogPush(<font color="#800080">'&lt;b&gt;Wall Read Error. Please Report Env.svn_rev = '</font>+gvar.svn_rev+<font color="#800080">' &lt;/b&gt;'</font>);\par
        \}\par
        iWallCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionWall);\},getRandRange(aParams[3]*750,aParams[3]*1250));\par
        <b>if </b>(iWallCurrent &lt; iHoldEvent) <b>clearTimeout</b>(iWallCurrent);\par
    \}, 15000);\par
    <i>// check for wall notifications\par
    </i>iCurrentJob = GM_xmlhttpRequest(\{\par
      <b>method</b>: <font color="#800080">'GET'</font>,\par
      url: myUrl,\par
      headers: \{\par
          <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
          <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
          <font color="#800080">'X-SVN-Rev'</font>: gvar.svn_rev\par
      \},\par
      onload: <b>function</b>(_responseDetails) \{\par
        try \{\par
          <b>var </b>i1, i2, iNumStories, iWallNum;\par
          <b>var </b>strTemp, strHTML;\par
          <b>var </b>oDom, oDiv, oSnap;\par
          <b>var </b>oButton, oActorName, oAttachmentTitle;\par
          <b>var </b>oUl, oLi;\par
          <b>var </b>oDetail;\par
          <b>var </b>link_data;\par
          <b>var </b>myImg;\par
          <b>var </b>bSkipItem;\par
          <i>// This is for the secret stash glitch\par
          </i><b>var </b>now   = <b>new Date</b>();\par
          <b>var </b>hour  = now.<b>getHours</b>()+now.<b>getTimezoneOffset</b>()/60;\par
          <b>if </b>(hour &gt;= 24) hour -= 24;\par
          <i>// clear watch dog timer\par
          </i><b>clearTimeout</b>(iWatchDog);\par
          strTemp  = _responseDetails.responseText;\par
          iWallNum = 0;\par
          i1       = strTemp.<b>indexOf</b>(<font color="#800080">'\{'</font>);\par
          oDetails = JSON.<b>parse</b>(strTemp.slice(i1));\par
          <b>if </b>(oDetails.payload != null) \{\par
            GM_log(<font color="#800080">'Wall notification: Error Reading Notifications'</font>);\par
          \} <b>else if </b>(oDetails.onload.<b>indexOf</b>(<font color="#800080">'You have no stories for'</font>)!=-1) \{\par
            GM_log(<font color="#800080">'You have no stories/notifications.'</font>);\par
            LogPush(<font color="#800080">'&lt;b&gt;You have no stories/notifications. Please check you FaceBook Settings. (Look on http://www.facebook.com/games for stories for the selected games)&lt;/b&gt;'</font>);\par
          \} <b>else </b>\{\par
            oDom = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
            <b>for </b>(<b>var </b>onloadID = 0; onloadID &lt; oDetails.onload.<b>length</b>; onloadID++) \{\par
              <b>if </b>(oDetails.onload[onloadID].<b>indexOf</b>(<font color="#800080">'&quot;#app_stories&quot;), HTML('</font>)!=-1) \{\par
                strTemp = oDetails.onload[onloadID];\par
                strTemp = strTemp.<b>replace</b>(/<font color="#800080">\\\\</font>u003c/g,<font color="#800080">'&lt;'</font>);\par
                i1      = strTemp.<b>indexOf</b>(<font color="#800080">'HTML('</font>)+5;\par
                i2      = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;));'</font>,i1)+1;\par
                strTemp = strTemp.slice(i1,i2);\par
                <b>eval</b>(<font color="#800080">'oDom.innerHTML ='</font>+strTemp);\par
                <b>break</b>;\par
              \}\par
            \}\par
            oUl = oDom.firstChild;\par
            <b>for </b>(<b>var </b>i=0; i &lt; oUl.childNodes.<b>length</b>; i++)\{\par
              <i>// get one wall notification\par
              </i>oLi = oUl.childNodes[i];\par
              <i>// Thx for the fix _der_\par
              </i><b>if </b>(!oLi.getAttribute) oLi = oLi.parentElement;\par
              link_data = oLi.getAttribute(<font color="#800080">'data-ft'</font>);\par
              <b>if </b>(link_data == null) \{\par
                <i>// skip this item as this is a none game story\par
              //GM_log('Wall notification: Link data is null');\par
                </i><b>continue</b>;\par
              \} <b>else </b>\{\par
                <b>eval</b>(<font color="#800080">'link_data = '</font>+link_data);\par
              \}\par
              <i>// Get image from LI if it exists\par
              </i>oSnap = getSnapshot(<font color="#800080">'.//div[contains(@class,&quot;UIImageBlock clearfix&quot;)]/a/img'</font>,oLi);\par
              <b>if </b>(oSnap.snapshotLength == 0) \{\par
                myImg = <font color="#800080">&quot;&quot;</font>;\par
              \} <b>else </b>\{\par
                myImg = oSnap.snapshotItem(0).<b>src</b>;\par
              \}\par
              <i>// Find the Buttons (Accept, Ignore, Etc)\par
            //GM_log('oLi.innerHTML = '+oLi.innerHTML);\par
              </i>oButton          = getSnapshot(<font color="#800080">'.//span[contains(@class,&quot;UIActionLinks UIActionLinks_bottom&quot;)]/a'</font>,oLi).snapshotItem(0);\par
              oActorName       = getSnapshot(<font color="#800080">'.//div[contains(@class,&quot;actorDescription actorName&quot;)]'</font>,oLi).snapshotItem(0);\par
              oAttachmentTitle = getSnapshot(<font color="#800080">'.//div[contains(@class,&quot;uiAttachmentTitle&quot;)]'</font>,oLi).snapshotItem(0);\par
              <i>// skip this loop if no buttons are found.\par
              </i><b>if </b>(oButton == null) <b>continue</b>;\par
              oWall = <b>new </b>WallItem();\par
              <i>// Cycle through each LI and look for Application specific keys\par
              </i><b>for </b>(<b>var name in </b>Wall_Data[link_data.app_id]) \{\par
                <b>if</b>( (Wall_Data[link_data.app_id][<b>name</b>][<font color="#800080">'testURL'</font>].test(oButton.<b>href</b>)) &amp;&amp; (Wall_Data[link_data.app_id][<b>name</b>][<font color="#800080">'testIMG'</font>].test(myImg)))\{\par
                    oWall.Type            = <b>name</b>;\par
                    oWall.Action          = oButton.<b>href</b>;\par
                    oWall.BName           = oButton.<b>text</b>;\par
                    oWall.ActorName       = (oActorName===null<font color="#800080">?''</font>:oActorName.innerHTML);\par
                    oWall.AttachmentTitle = (oAttachmentTitle===null<font color="#800080">?''</font>:oAttachmentTitle.innerHTML);\par
                    oWall.AppId           = link_data.app_id;\par
                    oWall.srcImg          = myImg;\par
                    <i>// Check to see if we've seen this Wall notification before\par
                    </i><b>for </b>(j=0; j &lt; aWallNotificationId.<b>length</b>; j++) \{\par
                      <b>if </b>(oWall.Action == aWallNotificationId[j]) \{\par
                        bWallTest = true;\par
                        <b>break</b>;\par
                      \}\par
                    \}\par
                    bSkipItem = true;\par
                    <b>if </b>(bWallTest) \{\par
                      bSkipItem = true;\par
                    <i>//GM_log('Wall notification: Skipping item already seen');\par
                    </i>\} <b>else </b>\{\par
                    <i>// test to see if we should process them\par
                    </i>switch (oWall.AppId) \{\par
                      case 10979261223:\par
                        <i>// Mafia Wars\par
                      //GM_log('Mafia Wars');\par
                        </i><b>if </b>(xw_sig_valid == false) \{\par
                          GM_log(<font color="#800080">'Ignoring MW Wall notice. Mafia Wars does not appear to be working.'</font>);\par
                          LogPush(<font color="#800080">'Ignoring MW Wall Notice. Mafia Wars does not appear to be working.'</font>);\par
                        \} <b>else if</b>(oWall.Action.<b>indexOf</b>(local_xw_user_id.slice(2))!=-1) \{\par
                          GM_log(<font color="#800080">'Ignoring MW Wall notice. Cannot process own feeds.'</font>);\par
                        \} <b>else </b>\{\par
                          <i>// Ignore some types of jobs based on settings\par
                          </i>switch (oWall.Type) \{\par
                            case <font color="#800080">'Ignore'</font>:\par
                              bSkipItem = true;\par
                              <b>break</b>;\par
                            case <font color="#800080">'MW_BrazilCityCrew'</font>:\par
                              <b>if </b>(aParams[2017]==true) \{ bSkipItem = false; \} <i>//else LogPush('MW: Skipping Need Help notice');\par
                              </i><b>break</b>;\par
                            case <font color="#800080">'MW_SoccerFan'</font>:\par
                              <b>if </b>(aParams[2016]==true) \{ bSkipItem = false; \} <i>//else LogPush('MW: Skipping Need Help notice');\par
                              </i><b>break</b>;\par
                            case <font color="#800080">'MW_VegasSlots'</font>:\par
                              <b>if </b>(aParams[2015]==true) \{ bSkipItem = false; \} <i>//else LogPush('MW: Skipping Need Help notice');\par
                              </i><b>break</b>;\par
                            case <font color="#800080">'MW_NeedHelp_NY'</font>:\par
                            case <font color="#800080">'MW_NeedHelp_Cuba'</font>:\par
                            case <font color="#800080">'MW_NeedHelp_Moscow'</font>:\par
                            case <font color="#800080">'MW_NeedHelp_Bangkok'</font>:\par
                            case <font color="#800080">'MW_NeedHelp_Vegas'</font>:\par
                            case <font color="#800080">'MW_NeedHelp_Italy'</font>:\par
                            case <font color="#800080">'MW_NeedHelp_Brazil'</font>:\par
                              <b>if </b>(aParams[2004]==true) \{ bSkipItem = false; \} <i>//else LogPush('MW: Skipping Need Help notice');\par
                              </i><b>break</b>;\par
                            case <font color="#800080">'MW_FriendofFriend'</font>:\par
                              <b>if </b>(aParams[2005]==true) \{ bSkipItem = false; \} <i>//else LogPush('MW: Skipping Help Friend of Friend notice');\par
                              </i><b>break</b>;\par
                            case <font color="#800080">'MW_NextTarget'</font>:\par
                              <b>if </b>(aParams[2006]==true) \{ bSkipItem = false; \} <i>//else LogPush('MW: Skipping Next Target notice');\par
                              </i><b>break</b>;\par
                            case <font color="#800080">'MW_Bounty'</font>:\par
                              <b>if </b>(aParams[2007]==true) \{ bSkipItem = false; \} <i>//else LogPush('MW: Skipping Bounty notice');\par
                              </i><b>break</b>;\par
                            case <font color="#800080">'MW_LaunderMoney'</font>:\par
                              <b>if </b>(aParams[2009]==true) \{ bSkipItem = false; \} <i>//else LogPush('MW: Skipping Money Laundering notice');\par
                              </i><b>break</b>;\par
                            case <font color="#800080">'MW_SupplyEnergy'</font>:\par
                            case <font color="#800080">'MW_PowerPack'</font>:\par
                            case <font color="#800080">'MW_SupplyParts'</font>:\par
                              <b>if </b>(aParams[2010]==true) \{ bSkipItem = false; \} <i>//else LogPush('MW: Skipping Supply Parts notice');\par
                              </i><b>break</b>;\par
                            case <font color="#800080">'MW_WarHelp'</font>:\par
                              <b>if </b>(aParams[2011]==true) \{ bSkipItem = false; \} <i>//else LogPush('MW: Skipping War Help Notice');\par
                              </i><b>break</b>;\par
                            case <font color="#800080">'MW_BossBonus'</font>:\par
                              <b>if </b>(aParams[2013]==true) \{ bSkipItem = false; \} <i>//else LogPush('MW: Skipping Boss Bonus');\par
                              </i><b>break</b>;\par
                            case <font color="#800080">'MW_IcedBonus'</font>:\par
                              <b>if </b>(aParams[2008]==true) \{\par
                                <b>if </b>(getCurrentTime()&gt;MW_IcedBonusDelay) \{\par
                                  bSkipItem = false <i>//else LogPush('MW: Skipping Bonus/Reward/Stash/Burner notice');\par
                                </i>\} <b>else </b>\{\par
                                <i>//LogPush('MW Iced Bonus skipped: Daily limit reached');\par
                                </i>\}\par
                              \}\par
                              <b>break</b>;\par
                            case <font color="#800080">'MW_FreeGift'</font>:\par
                            case <font color="#800080">'MW_Achievement'</font>:\par
                            case <font color="#800080">'MW_LevelUp'</font>:\par
                            case <font color="#800080">'MW_Fight_Event'</font>:\par
                            case <font color="#800080">'MW_BonusLoot'</font>:\par
                            case <font color="#800080">'MW_HolidayBonus'</font>:\par
                            case <font color="#800080">'MW_FeedBonus'</font>:\par
                            case <font color="#800080">'MW_WeaponsDepot'</font>:\par
                            case <font color="#800080">'MW_ChopShop'</font>:\par
                            case <font color="#800080">'MW_Armory'</font>:\par
                            case <font color="#800080">'MW_Zoo'</font>:\par
                            case <font color="#800080">'MW_Robbing'</font>:\par
                            case <font color="#800080">'MW_Burner'</font>:\par
                            case <font color="#800080">'MW_LootDropEvent'</font>:\par
                            case <font color="#800080">'MW_ShareRewardEvent'</font>:\par
                            case <font color="#800080">'MW_BrazilBonus'</font>:\par
                            case <font color="#800080">'MW_LoyaltyBonus'</font>:\par
                            case <font color="#800080">'MW_EpicClanBoss'</font>:\par
                            case <font color="#800080">'MW_LimitedProperty'</font>:                            case <font color="#800080">'MW_3xVegasLoot'</font>:\par
                              <b>if </b>(aParams[2008]==true) \{ bSkipItem = false; \} <i>//else LogPush('MW: Skipping Bonus/Reward/Stash/Burner notice');\par
                              </i><b>break</b>;\par
                            case <font color="#800080">'MW_BossFight'</font>:\par
                              <b>if </b>(aParams[2010]==true) \{ bSkipItem = false; \} <i>//else LogPush('MW: Skipping Supply boss fight notice');\par
                              </i><b>break</b>;\par
                            case <font color="#800080">'MW_Secret_Reward'</font>:\par
                              <b>if </b>(aParams[2008]==true) \{\par
                                i1 = oWall.Action.<b>indexOf</b>(<font color="#800080">'feed_target='</font>)+12;\par
                                i2 = oWall.Action.<b>indexOf</b>(<font color="#800080">'&amp;ref=nf'</font>,i1);\par
                                <b>if </b>(oWall.Action.slice(i1,i2) == FB_user_id) \{ bSkipItem = false; \}\par
                              \}\par
                              <b>break</b>;\par
                            case <font color="#800080">'MW_LootLadder'</font>:\par
                              <b>if </b>(oWall.Action.<b>indexOf</b>(<font color="#800080">'help_initial'</font>) != -1) \{\par
                                <b>if </b>(aParams[2008]==true) \{\par
                                  <b>if </b>(getCurrentTime() &gt; MW_LootLadderDelay ) \{\par
                                    bSkipItem = false;\par
                                  \} <b>else </b>\{\par
                                  <i>//LogPush('MW Loot Ladder skipped: Daily limit reached');\par
                                  </i>\}\par
                                \}\par
                              \} <b>else if </b>(aParams[2008]==true) \{\par
                                <b>if </b>(getCurrentTime() &gt;  MW_LootLadderDelay) \{\par
                                  bSkipItem = false;\par
                                \} <b>else </b>\{\par
                                <i>//LogPush('MW Loot Ladder skipped: Daily limit reached');\par
                                </i>\}\par
                              \}\par
                              <b>break</b>;\par
                            case <font color="#800080">'MW_WeaponsDepot'</font>:\par
                            case <font color="#800080">'MW_ChopShop'</font>:\par
                            case <font color="#800080">'MW_Armory'</font>:\par
                              <b>if </b>(oWall.Action.<b>indexOf</b>(<font color="#800080">'help_initial'</font>) != -1) \{\par
                                <b>if </b>(aParams[2010]==true) \{ bSkipItem = false; \} <i>//else LogPush('MW: Skipping initial Armory/CS/WD Parts send');\par
                                  </i><b>break</b>;\par
                                \} <b>else if </b>(aParams[2008]==true) \{\par
                                  bSkipItem = false;\par
                                \}\par
                              <b>break</b>;\par
                            case <font color="#800080">'MW_StashBonus'</font>:\par
                              <b>if </b>(aParams[2014]==true) \{\par
                                <b>if </b>(hour &lt; 7) \{\par
                                  <i>// Secret Stash Glitch\par
                                  </i>bSkipItem = false;\par
                                \} <b>else </b>\{\par
                                  i3 = oLi.innerHTML.<b>indexOf</b>(<font color="#800080">'secret stash of &quot;'</font>);\par
                                  i4 = oLi.innerHTML.<b>indexOf</b>(<font color="#800080">'&quot; in Mafia Wars!'</font>,i3);\par
                                  strTemp = oLi.innerHTML.slice(i3+17,i4);\par
\par
                                  <b>if </b>(aParams[2049]==true) \{\par
                                    bSkipItem = false;\par
                                  \} <b>else </b>\{\par
                                    <b>for </b>(<b>var </b>stashID <b>in </b>MW_StashList) \{\par
                                      <b>if </b>((strTemp == MW_StashList[stashID].test)&amp;&amp;(aParams[stashID]==true)) \{bSkipItem = false; <b>break</b>;\}\par
                                    \}\par
                                  \}\par
                                \}\par
                                <b>if </b>(bSkipItem==true) LogPush(<font color="#800080">'MW Secret Stash skipped: '</font>+strTemp);\par
                              \}\par
                              <b>break</b>;\par
                            case <font color="#800080">'MW_Missions'</font>:\par
                              <b>if </b>(aParams[2022]==2) \{ bSkipItem = false; \}\par
                              <b>break</b>;\par
                          \}\par
                        <i>//GM_log('bSkipItem = '+bSkipItem);\par
                        </i>\}\par
                        <b>break</b>;\par
                      case 102452128776:\par
                        <i>// FarmVille\par
                        // Ignore some types of jobs based on settings\par
                        </i>GM_log(<font color="#800080">'FarmVille - '</font>+oWall.Type);\par
                        switch (oWall.Type) \{\par
                          <i>// rewards\par
                          </i>case <font color="#800080">'Ignore'</font>:\par
                            bSkipItem = true;\par
                            <b>break</b>;\par
                          case <font color="#800080">'FV_Ignore'</font>:\par
                            bSkipItem = true;\par
                            <b>break</b>;\par
                          case <font color="#800080">'FV_MasteryFriendRewad'</font>:\par
                          case <font color="#800080">'FV_HorseStableFriendReward'</font>:\par
                          case <font color="#800080">'FV_FertilizeThankFriendReward'</font>:\par
                          case <font color="#800080">'FV_SocialMissionShareBonusFriendReward'</font>:\par
                          case <font color="#800080">'FV_AchievementFriendReward'</font>:\par
                          case <font color="#800080">'FV_TuscanWeddingRedeemFriendReward'</font>:\par
                          case <font color="#800080">'FV_TuscanWeddingFriendReward'</font>:\par
                          case <font color="#800080">'FV_WanderingStallionFriendReward'</font>:\par
                          case <font color="#800080">'FV_StorageExpansionFriendReward'</font>:\par
                          case <font color="#800080">'FV_FuelDiscoveryFriendReward'</font>:\par
                          case <font color="#800080">'FV_ConstructionBuildingFriendReward'</font>:\par
                            <b>if </b>(aParams[oWall.Type]==true)\{ bSkipItem = false \}\par
                            <b>break</b>;\par
                          default:\par
                          <i>//GM_log('FV MyImg = '+myImg);\par
                          //GM_log('oWall.Type = '+oWall.Type);\par
                          //GM_log(oLi.innerHTML);\par
                            </i><b>if </b>(myImg==<font color="#800080">&quot;&quot;</font>) \{\par
                              <i>// no image = process the item\par
                              </i>bSkipItem = false;\par
                            \} <b>else </b>\{\par
                              switch (oWall.Type) \{\par
                                <i>// flowers\par
                                </i>case <font color="#800080">'FV_FlowerFriendReward'</font>:\par
                                  <i>/*\par
                                  for (var id in FV_flowers) \{\par
                                    if (FV_flowers[id].img_test(myImg)) \{\par
                                      bSkipItem = !aParams[id];\par
                                    \}\par
                                    break;\par
                                  \}*/\par
                                  // Images no longer work, accept these if they have unknown checked.\par
                                  </i><b>if </b>(aParams[3299]==true) \{\par
                                    bSkipItem = false;\par
                                  \}\par
                                  <b>break</b>;\par
                                <i>// bushels\par
                                </i>case <font color="#800080">'FV_BushelFriendReward'</font>:\par
                                case <font color="#800080">'FV_StallThankYouFriendReward'</font>:\par
                                  <i>/*GM_log('img= '+myImg);\par
                                  for (var id in FV_bushels) \{\par
                                    if (FV_bushels[id].img_test(myImg)) \{\par
                                      bSkipItem = !aParams[id];\par
                                    \}\par
                                    break;\par
                                  \}*/\par
                                  </i><b>if </b>(aParams[3699]==true) \{\par
                                    bSkipItem = false;\par
                                  \}\par
\par
                                  <b>break</b>;\par
                                <i>// adopt\par
                                </i>case <font color="#800080">'FV_lonely_cow'</font>:\par
                                case <font color="#800080">'FV_FoalFriendReward'</font>:\par
                                case <font color="#800080">'FV_NurseryBuildingFriendReward'</font>:\par
                                  <b>if </b>(aParams[3599]==true) \{\par
                                    bSkipItem = false;\par
                                  \}\par
                                    <i>/*\par
                                  for (var id in FV_animals) \{\par
                                    if (FV_animals[id].img_test(myImg)) \{\par
                                      bSkipItem = !aParams[id];\par
                                    \}\par
                                    break;\par
                                  \}\par
                                    */\par
                                  </i><b>break</b>;\par
                                <i>// Hatch an Egg\par
                                </i>case <font color="#800080">'FV_EggFriendReward'</font>:\par
                                  <b>if </b>(aParams[3199]==true) \{\par
                                    bSkipItem = false;\par
                                  \}\par
                                <i>/*\par
\par
                                  for (var id in FV_eggs) \{\par
                                    if (FV_eggs[id].img_test(myImg)) \{\par
                                      bSkipItem = !aParams[id];\par
                                    \}\par
                                    break;\par
                                  \}*/\par
                                  </i><b>break</b>;\par
                                <i>// Collections\par
                                </i>case <font color="#800080">'FV_CollectionsFriendReward'</font>:\par
                                  <b>if </b>(oWall.BName.<b>indexOf</b>(<font color="#800080">'Find a collectible'</font>)!=-1) \{\par
                                    <b>if </b>(aParams[3799]==true) \{\par
                                        bSkipItem = false;\par
                                    \}\par
                                    <i>/*\par
                                    for (var id in FV_collectables) \{\par
                                      if (FV_collectables[id].img_test(myImg)) \{\par
                                        bSkipItem = !aParams[id];\par
                                      \}\par
                                      break;\par
                                    \}\par
                                    */\par
\par
                                  </i>\} <b>else </b>\{\par
                                    bSkipItem  =  !aParams[oWall.Type];\par
                                  \}\par
                                  <b>break</b>;\par
                              \}\par
                            \}\par
                        \}\par
                        <b>break</b>;\par
                    \}\par
                  \}\par
                  <i>// end test section\par
                  </i><b>if </b>(!bSkipItem) \{\par
                    aWallNotificationId.unshift(oWall.Action);\par
                    <b>if </b>(aWallNotificationId.<b>length</b>&gt;300) aWallNotificationId.<b>length </b>= 300;\par
                    <b>if </b>(<b>name </b>!= <font color="#800080">&quot;MW_WarHelp&quot; </font>&amp;&amp; <b>name </b>!= <font color="#800080">&quot;MW_Missions&quot;</font>) \{\par
                      <i>// add to bottom\par
                      </i>oWallList.Append(oWall);\par
                    \} <b>else </b>\{\par
                      <i>// add to top\par
                      </i>oWallList.Insert(oWall);\par
                    \}\par
                  <i>//GM_log('iWallNum = '+iWallNum);\par
                    </i>iWallNum = iWallNum+1;\par
                  \}\par
                \}\par
              \}\par
            \}\par
          \}\par
          <i>// adding Queued Mission data back\par
          </i><b>for </b>(<b>var </b>m=0;m&lt;aMissionRetry[0].<b>length</b>;m++) \{\par
            <b>if </b>(aMissionRetry[1][m] &lt; getCurrentTime() &amp;&amp; ((aParams[2021]==2)||(aParams[2022]==2))) \{\par
              <i>// pulls out items from the queue to re-process\par
              </i>oWallList.Insert(aMissionRetry[0][m]);\par
              iWallNum++;\par
              aMissionRetry[0].splice(m,1);\par
              aMissionRetry[1].splice(m,1);\par
              m--;\par
            \}\par
          \}\par
          <b>if </b>(bAutoRun) \{\par
            <b>if </b>(oWallList.First != null) \{\par
              LogPush(<font color="#800080">'&lt;b&gt;'</font>+iWallNum+<font color="#800080">' wall notification(s) have been found and will be processed&lt;/b&gt;&lt;br&gt;'</font>);\par
              iWallCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionWall);\}, getRandRange(aParams[2]*750,aParams[2]*1250));\par
            \} <b>else </b>\{\par
              iWallCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionWall);\}, getRandRange(aParams[3]*750,aParams[3]*1250));\par
            \}\par
            <b>if </b>(iWallCurrent &lt; iHoldEvent) \{\par
              <i>// The browser has reset.  Cancel runaway jobs;\par
              </i><b>clearTimeout</b>(iWallCurrent);\par
            \}\par
          \}\par
        \} catch(err) \{\par
          <b>if </b>(bAutoRun) \{\par
            GM_log(<font color="#800080">'Error: Read Wall - '</font>+err.message);\par
            <b>if </b>(strTemp!=undefined) GM_log(<font color="#800080">'Error: Read Wall 2 - '</font>+strTemp.slice(0,100));\par
            LogPush(<font color="#800080">'&lt;b&gt;Error Reading Wall Notices. Checking again in '</font>+aParams[3]+<font color="#800080">' seconds.&lt;/b&gt;&lt;br&gt;REPORT THIS: '</font>+err.message);\par
            iWallCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionWall);\}, getRandRange(aParams[3]*750,aParams[3]*1250));\par
            <b>if </b>(iRespectCurrent &lt; iHoldEvent) \{\par
              <i>// The browser has reset.  Cancel runaway jobs;\par
              </i><b>clearTimeout</b>(iRespectCurrent);\par
            \}\par
          \}\par
        \}\par
      \}\par
    \})\par
  \} <b>else </b>\{\par
    GM_log(<font color="#800080">'Abort read request. Switch is off'</font>);\par
  \}\par
\}\par
\par
<i>// Read Request from FB\par
</i><b>function </b>Read_FB_Requests()\{\par
  <b>var </b>iHoldEvent, iCurrentJob;\par
  <b>var </b>iWatchDog;\par
  <b>var </b>myUrl;\par
  iRequestNum = 0;\par
  <b>var </b>iNumPigs = 0;\par
  <b>var </b>iNumDrops = 0;\par
  <b>var </b>iNum = <b>new Array</b>();\par
  <b>for </b>(<b>var name in </b>spamItems) \{\par
    iNum[<b>name</b>] = 0;\par
  \}\par
  iHoldEvent = iRequestCurrent;\par
  GM_log(<font color="#800080">'Read_FB_Requests'</font>);\par
  <b>if </b>(bAutoRun) \{\par
    oRequestList.Erase();\par
    <i>// start the WatchDog Timer to catch hung requests.  15 seconds maximum.\par
    </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{\par
      iCurrentJob.abort();\par
      GM_log(<font color="#800080">'WatchDog timer killing Read_FB_Requests'</font>);\par
      iRequestCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionRequest);\}, getRandRange(aParams[1]*750,aParams[1]*1250));\par
      <b>if </b>(iRequestCurrent &lt; iHoldEvent) \{\par
        <i>// The browser has reset.  Cancel runaway jobs;\par
        </i>GM_log(<font color="#800080">'Killed by the Requests Watchdog'</font>);\par
        <b>clearTimeout</b>(iRequestCurrent);\par
      \}\par
    \}, 15000);\par
    myUrl = <font color="#800080">'http://www.facebook.com/reqs.php'</font>;\par
    iCurrentJob = GM_xmlhttpRequest(\{\par
      <b>method</b>: <font color="#800080">'GET'</font>,\par
      url: myUrl,\par
      headers: \{\par
      <i>//'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',\par
      //'Accept-Language': 'en-us,en;q=0.5',\par
      //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'\par
        </i><font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'\par
      </font>\},\par
      onload: <b>function</b>(_responseDetails) \{\par
        try \{\par
          <b>var </b>i1, i2, myUrl, myUrl2;\par
          <b>var </b>oDOM, oForms, oForm, oFormInputs,\par
              oFormInput, oInputs, oInput, oRequest, oRequest2;\par
          <b>var </b>oSpan;\par
          <b>var </b>strTemp, strTempGift;\par
          <b>var </b>iButtons;\par
          <b>var </b>aCat;\par
          <b>var </b>oFormId;\par
\par
          <b>clearTimeout</b>(iWatchDog);\par
\par
          <b>if </b>(_responseDetails.<b>status </b>!= 200) \{\par
            GM_log(<font color="#800080">'Error Read message from MW page'</font>);\par
          \} <b>else </b>\{\par
            strTemp = _responseDetails.responseText;\par
            <b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div id=&quot;contentArea'</font>)==-1) throw \{message:<font color="#800080">&quot;No request have been found&quot;</font>\};\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div id=&quot;contentArea'</font>);\par
            i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div id=&quot;bottomContent'</font>,i1);\par
            oDOM = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
            oDOM.innerHTML = strTemp.slice(i1,i2);\par
            <i>// Step 1 - find all the Friend Add Requests\par
            </i>oForms = getSnapshot(strConfirmBoxes1, oDOM);\par
            GM_log(<font color="#800080">'Friend Requests Found = '</font>+oForms.snapshotLength );\par
            <b>for</b>(i=0; i &lt; oForms.snapshotLength; i++) \{\par
              oForm       =   oForms.snapshotItem(i);\par
              oFormInputs =   getSnapshot(strFormInputs, oForm);\par
              oRequest    =   <b>new </b>RequestItem();\par
              <b>for </b>( j=0; j &lt; oFormInputs.snapshotLength; j++) \{\par
                oFormInput = oFormInputs.snapshotItem(j);\par
                switch (oFormInput.<b>type</b>) \{\par
                  case <font color="#800080">'hidden'</font>:\par
                    <i>// grab the parameters need to action the item\par
                    </i>oRequest.Parms += <font color="#800080">&quot;&amp;&quot;</font>+oFormInput.<b>name</b>+<font color="#800080">&quot;=&quot;</font>+<b>escape</b>(oFormInput.<b>value</b>);\par
                    <b>break</b>;\par
                  case <font color="#800080">'submit'</font>:\par
                    <i>// grab the name of what we are actioning, and the http action request\par
                    </i><b>if </b>(oFormInput.<b>name </b>== <font color="#800080">'actions[hide]'</font>)   oRequest.Gifttype = <font color="#800080">'friend_connect'</font>;\par
                    <b>if </b>(oFormInput.<b>name </b>== <font color="#800080">'actions[reject]'</font>) oRequest.Gifttype = <font color="#800080">'friend_suggestion'</font>;\par
                    <b>break</b>;\par
                \}\par
              \}\par
              <b>if </b>(oRequest.Gifttype ==<font color="#800080">'friend_suggestion'</font>) \{\par
                <b>if </b>(aParams[1000] &gt; 0 ) \{\par
                  switch (aParams[1000]) \{\par
                    case <font color="#800080">'2'</font>: oRequest.Parms += <font color="#800080">'&amp;actions[accept]=Confirm'</font>; <b>break</b>;\par
                    case <font color="#800080">'1'</font>: oRequest.Parms += <font color="#800080">'&amp;actions[reject]=Delete%20Request'</font>; <b>break</b>;\par
                    case <font color="#800080">'3'</font>: oRequest.Parms += <font color="#800080">'&amp;actions[hide]=Not%20Now'</font>; <b>break</b>;\par
                  \}\par
                  oRequestList.Append(oRequest);\par
                  iRequestNum = iRequestNum + 1;\par
                \}\par
              \} <b>else if </b>(oRequest.Gifttype ==<font color="#800080">'friend_connect'</font>) \{\par
                <b>if </b>(aParams[1002] &gt; 0 ) \{\par
                  switch (aParams[1002]) \{\par
                      case <font color="#800080">'2'</font>: oRequest.Parms += <font color="#800080">'&amp;actions[accept]=Confirm'</font>; <b>break</b>;\par
                      case <font color="#800080">'1'</font>: oRequest.Parms += <font color="#800080">'&amp;actions[reject]=Delete%20Request'</font>; <b>break</b>;\par
                      case <font color="#800080">'3'</font>: oRequest.Parms += <font color="#800080">'&amp;actions[hide]=Not%20Now'</font>; <b>break</b>;\par
                  \}\par
                  oRequestList.Append(oRequest);\par
                  iRequestNum = iRequestNum + 1;\par
                \}\par
              \}\par
            \}\par
            <i>// Find all the traditional Requests (ie Non Game Requests)\par
            </i>oForms = getSnapshot(strConfirmBoxes2, oDOM);\par
            GM_log(<font color="#800080">'oForms.snapshotLength = '</font>+oForms.snapshotLength );\par
            <b>for</b>(i=0; i &lt; oForms.snapshotLength; i++) \{\par
              oForm             = oForms.snapshotItem(i);\par
              oFormId           = getSnapshot(strFormId,oForm).snapshotItem(0).id;\par
              aCat              = oFormId.<b>split</b>(<font color="#800080">'_'</font>);\par
              oFormInputs       = getSnapshot(strFormInputs, oForm);\par
              oRequest          = <b>new </b>RequestItem();\par
              oRequest.Gifttype = oFormId;\par
              switch (aCat[0]) \{\par
                case <font color="#800080">'event'</font>:\par
                  <b>if </b>(aParams[1004]&gt;0) \{\par
                    oRequest.Parms = <font color="#800080">'&amp;ok=Okay&amp;__d=1&amp;action=remove'</font>;\par
                    <b>for </b>( k=0; k &lt; oFormInputs.snapshotLength; k++) \{\par
                      oFormInput = oFormInputs.snapshotItem(k);\par
                      <b>if </b>(oFormInput.<b>type </b>== <font color="#800080">'hidden'</font>) \{\par
                        switch (oFormInput.<b>name</b>) \{\par
                          case <font color="#800080">'id'</font>:oRequest.Parms += <font color="#800080">&quot;&amp;&quot;</font>+oFormInput.<b>name</b>+<font color="#800080">&quot;=&quot;</font>+oFormInput.<b>value</b>; <b>break</b>;\par
                          case <font color="#800080">'type'</font>:oRequest.Parms += <font color="#800080">&quot;&amp;&quot;</font>+oFormInput.<b>name</b>+<font color="#800080">&quot;=&quot;</font>+oFormInput.<b>value</b>; <b>break</b>;\par
                          case <font color="#800080">'status_div_id'</font>:oRequest.Parms += <font color="#800080">&quot;&amp;&quot;</font>+oFormInput.<b>name</b>+<font color="#800080">&quot;=&quot;</font>+oFormInput.<b>value</b>; <b>break</b>;\par
                          case <font color="#800080">'post_form_id'</font>:oRequest.Parms += <font color="#800080">&quot;&amp;&quot;</font>+oFormInput.<b>name</b>+<font color="#800080">&quot;=&quot;</font>+oFormInput.<b>value</b>; <b>break</b>;\par
                          case <font color="#800080">'fb_dtsg'</font>:oRequest.Parms += <font color="#800080">&quot;&amp;&quot;</font>+oFormInput.<b>name</b>+<font color="#800080">&quot;=&quot;</font>+oFormInput.<b>value</b>; <b>break</b>;\par
                        \}\par
                      \}\par
                    \}\par
                    oRequest.Parms += <font color="#800080">&quot;&amp;lsd&amp;post_form_id_source=AsyncRequest&quot;</font>;\par
                  <i>//GM_log('oRequest.Parms = '+oRequest.Parms);\par
                    </i>oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \} <b>else </b>\{\par
                    GM_log(<font color="#800080">'Skipping Event'</font>);\par
                  \}\par
                  <b>break</b>;\par
                case <font color="#800080">'group'</font>:\par
                case <font color="#800080">'fbpage'</font>:\par
                  iButtons = 0;\par
                  <b>for </b>( j=0; j&lt;oFormInputs.snapshotLength; j++) \{\par
                    oFormInput = oFormInputs.snapshotItem(j);\par
                    switch (oFormInput.<b>type</b>) \{\par
                      case <font color="#800080">'hidden'</font>:\par
                        <i>// grab the parameters need to action the item\par
                        </i>oRequest.Parms += <font color="#800080">&quot;&amp;&quot;</font>+oFormInput.<b>name</b>+<font color="#800080">&quot;=&quot;</font>+encodeURI(oFormInput.<b>value</b>);\par
                        <b>break</b>;\par
                      case <font color="#800080">'submit'</font>:\par
                        <b>if </b>(oFormInput.<b>name </b>== <font color="#800080">'actions[reject]'</font>)\par
                        oRequest.Reject = <font color="#800080">&quot;&amp;&quot;</font>+oFormInput.<b>name</b>+<font color="#800080">&quot;=&quot;</font>+encodeURI(oFormInput.<b>value</b>);\par
                        iButtons += 1;\par
                    \}\par
                  \}\par
                  oRequest.Parms += <font color="#800080">''</font>;\par
                  <b>if </b>(iButtons&lt;2) \{\par
                    GM_log(<font color="#800080">'Ignoring malformed gift request. (no Accept button)'</font>);\par
                    oRequest = undefined;\par
                  \} <b>else if </b>(aCat[0]==<font color="#800080">'fbpage' </font>) \{\par
                    <b>if </b>(aParams[1005]==0 ) \{\par
                      GM_log(<font color="#800080">'Skipping fbpage Invitation'</font>);\par
                    \} <b>else </b>\{\par
                      oRequest.Parms += <font color="#800080">&quot;&amp;actions[accept]=Ignore&quot;</font>;\par
                      oRequest.Parms += <font color="#800080">&quot;&amp;nctr[_mod]=fbpage_fan_confirm&amp;lsd&amp;post_form_id_source=AsyncRequest&quot;</font>;\par
                      oRequestList.Append(oRequest);\par
                      iRequestNum = iRequestNum + 1;\par
                    \}\par
                  \} <b>else if </b>(aCat[0]==<font color="#800080">'group' </font>) \{\par
                    <b>if </b>(aParams[1006]==0 ) \{\par
                      GM_log(<font color="#800080">'Skipping Group Invitation'</font>);\par
                    \} <b>else </b>\{\par
                      oRequest.Parms += <font color="#800080">&quot;&amp;actions[accept]=Ignore&quot;</font>;\par
                      oRequest.Parms += <font color="#800080">&quot;&amp;lsd&amp;post_form_id_source=AsyncRequest&quot;</font>;\par
                      oRequestList.Append(oRequest);\par
                      iRequestNum = iRequestNum + 1;\par
                    \}\par
                  \}\par
                  <b>break</b>;\par
                  <i>// End read in general postings\par
              </i>\}\par
              <i>// End Switch\par
            </i>\}\par
            <i>// end loop\par
            </i>GM_log(<font color="#800080">'Step 4'</font>);\par
            <i>// find all GAME requests\par
            </i>oForms = getSnapshot(strConfirmBoxes3, oDOM);\par
            GM_log(<font color="#800080">'oForms.snapshotLength = '</font>+oForms.snapshotLength );\par
            <b>for</b>(i=0; i &lt; oForms.snapshotLength; i++) \{\par
              oForm             = oForms.snapshotItem(i);\par
              oFormId           = getSnapshot(strFormId,oForm).snapshotItem(0).id\par
              aCat              = oFormId.<b>split</b>(<font color="#800080">'_'</font>);\par
              oFormInputs       = getSnapshot(strFormInputs, oForm);\par
              oRequest          = <b>new </b>RequestItem();\par
              oRequest.Gifttype = oFormId;\par
              iButtons = 0;\par
              <b>for </b>( j=0; j&lt;oFormInputs.snapshotLength; j++) \{\par
                oFormInput = oFormInputs.snapshotItem(j);\par
                switch (oFormInput.<b>type</b>) \{\par
                  case <font color="#800080">'hidden'</font>:\par
                    <i>// grab the parameters need to action the item\par
                    </i>oRequest.Parms += <font color="#800080">&quot;&amp;&quot;</font>+oFormInput.<b>name</b>+<font color="#800080">&quot;=&quot;</font>+encodeURI(oFormInput.<b>value</b>);\par
                    <b>break</b>;\par
                  case <font color="#800080">'submit'</font>:\par
                    <i>// grab the name of what we are actioning, and the http action request\par
                    </i>iButtons += 1;\par
                    <b>if </b>(oFormInput.<b>name </b>== <font color="#800080">'actions[reject]'</font>) \{\par
                      oRequest.Reject = <font color="#800080">&quot;&amp;&quot;</font>+oFormInput.<b>name</b>+<font color="#800080">&quot;=&quot;</font>+encodeURI(oFormInput.<b>value</b>);\par
                    \} <b>else </b>\{\par
                      oRequest.Action = <font color="#800080">&quot;&amp;&quot;</font>+oFormInput.<b>name</b>.slice(0,8)+encodeURIComponent(oFormInput.<b>name</b>.slice(8,-1))+oFormInput.<b>name</b>.slice(-1)+<font color="#800080">&quot;=&quot;</font>+encodeURI(oFormInput.<b>value</b>);\par
                    \}\par
                \}\par
              \}\par
              oRequest.Parms += <font color="#800080">''</font>;\par
              <i>//GM_log('Request Type- '+ aCat[1]);\par
              </i><b>if </b>(aCat[1] == <font color="#800080">'10979261223' </font>&amp;&amp; aParams[7]==1) \{\par
                <i>//GM_log('Action = '+oRequest.Action);\par
                </i><b>if </b>(oRequest.Action.<b>indexOf</b>(<font color="#800080">'accept_energy_req'</font>)!=-1) \{\par
                  <b>if </b>(aParams[2020]==0) \{\par
                    GM_log(<font color="#800080">'Skipping Mafia Wars Accept Energy Request'</font>);\par
                  \} <b>else if </b>(aParams[2020]==1) \{\par
                    GM_log(<font color="#800080">'Ignoring Mafia Wars Accept Energy Request'</font>);\par
                    oRequest.Parms += oRequest.Reject;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \} <b>else </b>\{\par
                    GM_log(<font color="#800080">'Adding Mafia Wars Accept Energy Request'</font>);\par
                    oRequest.Parms += oRequest.Action;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \}\par
                \} <b>else if </b>((oRequest.Action.<b>indexOf</b>(<font color="#800080">'accept_'</font>)!=-1)||(oRequest.Action.<b>indexOf</b>(<font color="#800080">'secret_stash_help'</font>)!=-1)) \{\par
                  <b>if </b>(MW_FreeGiftsDelay&gt;getCurrentTime()) \{\par
                  <i>//GM_log('Skipping Mafia Wars Accept Gift Request - Max daily limit reached');\par
                  </i>\} <b>else if </b>(oRequest.Action.<b>indexOf</b>(<font color="#800080">'Secret%2BDrop'</font>) != -1) \{\par
                    GM_log(<font color="#800080">'Secret Drops Found: ' </font>+ ++iNumDrops);\par
                    <b>if </b>(aParams[2025]==0) \{\par
                      GM_log(<font color="#800080">'Skipping Mafia Wars Accept Gift Secret Drop Request'</font>);\par
                    \} <b>else if </b>(aParams[2025]==1) \{\par
                      GM_log(<font color="#800080">'Ignoring Mafia Wars Accept Gift Secret Drop Request'</font>);\par
                      oRequest.Parms += oRequest.Reject;\par
                      oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                      oRequestList.Append(oRequest);\par
                      iRequestNum = iRequestNum + 1;\par
                    \} <b>else if </b>(aParams[2025]==3) \{\par
                      GM_log(<font color="#800080">'Adding Mafia Wars Accept Gift Request'</font>);\par
                      oRequest.Parms += oRequest.Action;\par
                      oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                      oRequestList.Append(oRequest);\par
                      iRequestNum = iRequestNum + 1;\par
                    \} <b>else if </b>(aParams[2025]==2) \{\par
                      <b>if </b>(getCurrentTime() &gt; MW_SecretDropDelay) \{\par
                        GM_log(<font color="#800080">'Adding Mafia Wars Accept Gift Request'</font>);\par
                        oRequest.Parms += oRequest.Action;\par
                        oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                        oRequestList.Append(oRequest);\par
                        iRequestNum = iRequestNum + 1;\par
                      \} <b>else </b>\{\par
                        GM_log(<font color="#800080">'Skipping Mafia Wars Accept Gift Secret Drop Request'</font>);\par
                      \}\par
                    \} <b>else if </b>(aParams[2025]==4 &amp;&amp; iNumDrops&gt;3) \{\par
                      GM_log(<font color="#800080">'Adding Mafia Wars Accept Gift Request'</font>);\par
                      oRequest.Parms += oRequest.Action;\par
                      oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                      oRequestList.Append(oRequest);\par
                      iRequestNum = iRequestNum + 1;\par
                    \}\par
                  \} <b>else </b>\{\par
                    <b>var </b>bSkipItem = false;\par
                    <b>for </b>(<b>var name in </b>spamItems) \{\par
                      <b>if </b>(oRequest.Action.<b>indexOf</b>(spamItems[<b>name</b>].giftID) != -1) \{\par
                        iNum[<b>name</b>]++;\par
                        <b>if </b>(aParams[<b>name</b>]==0) \{\par
                          GM_log(<font color="#800080">'Skipping Mafia Wars Accept Spam Gift Request'</font>);\par
                        \} <b>else if </b>(aParams[<b>name</b>]==1) \{\par
                          GM_log(<font color="#800080">'Ignoring Mafia Wars Accept Spam Gift Request'</font>);\par
                          oRequest.Parms += oRequest.Reject;\par
                          oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                          oRequestList.Append(oRequest);\par
                          iRequestNum = iRequestNum + 1;\par
                        \} <b>else if </b>(aParams[<b>name</b>]==2) \{\par
                          GM_log(<font color="#800080">'Adding Mafia Wars Accept Spam Gift Request'</font>);\par
                          oRequest.Parms += oRequest.Action;\par
                          oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                          oRequestList.Append(oRequest);\par
                          iRequestNum = iRequestNum + 1;\par
                        \} <b>else if </b>(aParams[<b>name</b>]==3 &amp;&amp; iNum[<b>name</b>]&gt;aParams[<b>name</b>+<font color="#800080">'keepx'</font>]) \{\par
                          GM_log(<font color="#800080">'Adding Mafia Wars Accept Spam Gift Request'</font>);\par
                          oRequest.Parms += oRequest.Action;\par
                          oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                          oRequestList.Append(oRequest);\par
                          iRequestNum = iRequestNum + 1;\par
                        \}\par
                        bSkipItem = true;\par
                        <b>break</b>;\par
                      \}\par
                    \}\par
                    <b>if </b>(!bSkipItem) \{\par
                      <b>if </b>(aParams[2000]==0) \{\par
                        GM_log(<font color="#800080">'Skipping Mafia Wars Accept Gift Request'</font>);\par
                      \} <b>else if </b>(aParams[2000]==1) \{\par
                        GM_log(<font color="#800080">'Ignoring Mafia Wars Accept Gift Request'</font>);\par
                        oRequest.Parms += oRequest.Reject;\par
                        oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                        oRequestList.Append(oRequest);\par
                        iRequestNum = iRequestNum + 1;\par
                      \} <b>else </b>\{\par
                        GM_log(<font color="#800080">'Adding Mafia Wars Accept Gift Request'</font>);\par
                        oRequest.Parms += oRequest.Action;\par
                        oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                        oRequestList.Append(oRequest);\par
                        iRequestNum = iRequestNum + 1;\par
                      \}\par
                    \}\par
                  \}\par
                \} <b>else if </b>(oRequest.Action.<b>indexOf</b>(<font color="#800080">'safehouse'</font>)!=-1) \{\par
                  <b>if </b>(aParams[2001]==0) \{\par
                    GM_log(<font color="#800080">'Skipping Mafia Wars Send Gift Request'</font>);\par
                  \} <b>else if </b>(aParams[2001]==1) \{\par
                    GM_log(<font color="#800080">'Ignoring Mafia Wars Send Gift Request'</font>);\par
                    oRequest.Parms += oRequest.Reject;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \} <b>else </b>\{\par
                    GM_log(<font color="#800080">'Adding Mafia Wars Send Gift Request'</font>);\par
                    oRequest.Parms += oRequest.Action;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \}\par
                \} <b>else if </b>(oRequest.Action.<b>indexOf</b>(<font color="#800080">'socialmission'</font>)!=-1) \{\par
                  <b>if </b>(aParams[2021]==0) \{\par
                    GM_log(<font color="#800080">'Skipping Mafia Wars Mission Request'</font>);\par
                  \} <b>else if </b>(aParams[2021]==1) \{\par
                    GM_log(<font color="#800080">'Ignoring Mafia Mission Request'</font>);\par
                    oRequest.Parms += oRequest.Reject;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \} <b>else  if </b>(aParams[2021]==2) \{\par
                    GM_log(<font color="#800080">'Adding Mafia Wars Mission Request'</font>);\par
                    oRequest.Parms += oRequest.Action;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \}\par
                \} <b>else if </b>(oRequest.Action.<b>indexOf</b>(<font color="#800080">'recruit'</font>)!=-1) \{\par
                  <b>if </b>(aParams[2003]==0) \{\par
                    GM_log(<font color="#800080">'Skipping Mafia Wars Join Request'</font>);\par
                  \} <b>else if </b>(aParams[2003]==1) \{\par
                    GM_log(<font color="#800080">'Ignoring Mafia Wars Join Request'</font>);\par
                    oRequest.Parms += oRequest.Reject;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \} <b>else </b>\{\par
                    GM_log(<font color="#800080">'Adding Mafia Wars Join Request'</font>);\par
                    oRequest.Parms += oRequest.Action;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \}\par
                \}\par
              \} <b>else if </b>(aCat[1] == <font color="#800080">'102452128776' </font>&amp;&amp; aParams[8]==1) \{\par
                <b>if </b>(oRequest.Action.<b>indexOf</b>(<font color="#800080">'giftaccept'</font>)!=-1) \{\par
                  <b>if </b>(aParams[3000]==0) \{\par
                    GM_log(<font color="#800080">'Skipping FarmVille Accept Gift Request'</font>);\par
                  \} <b>else if </b>(aParams[3000]==1) \{\par
                    GM_log(<font color="#800080">'Ignoring FarmVille Accept Gift Request'</font>);\par
                    oRequest.Parms += oRequest.Reject;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \} <b>else if </b>(aParams[3000]==2) \{\par
                    GM_log(<font color="#800080">'Adding FarmVille Accept Gift Request'</font>);\par
                    oRequest.Parms += oRequest.Action;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \} <b>else </b>\{\par
                    <i>// this is for x2 farmville gift accepting\par
                    // gift one - normal\par
                    </i>GM_log(<font color="#800080">'Adding FarmVille Accept Gift Request x1'</font>);\par
                    oRequest.Parms += oRequest.Action;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                    <i>// gift two\par
                    </i>GM_log(<font color="#800080">'Adding FarmVille Accept Gift Request x2'</font>);\par
                    oRequest2           = <b>new </b>RequestItem();\par
                    oRequest2.Gifttype  = oRequest.Gifttype;\par
                    oRequest2.Action    = oRequest.Action;\par
                    oRequest2.Reject    = oRequest.Reject;\par
                    oRequest2.Parms     = oRequest.Parms;\par
                    oRequestList.Append(oRequest2);\par
                    iRequestNum = iRequestNum + 1;\par
                  \}\par
                \} <b>else if </b>((oRequest.Action.<b>indexOf</b>(<font color="#800080">'sendcredits'</font>)!=-1) || (oRequest.Action.<b>indexOf</b>(<font color="#800080">'sendmats'</font>)!=-1) || (oRequest.Action.<b>indexOf</b>(<font color="#800080">'confirmfeatureinvite'</font>)!=-1)) \{\par
                  <b>if </b>(aParams[3001]==0) \{\par
                    GM_log(<font color="#800080">'Skipping FarmVille Send Gift Request'</font>);\par
                  \} <b>else if </b>(aParams[3001]==1) \{\par
                    GM_log(<font color="#800080">'Ignoring FarmVille Send Gift Request'</font>);\par
                    oRequest.Parms += oRequest.Reject;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \} <b>else </b>\{\par
                    GM_log(<font color="#800080">'Adding FarmVille Send Gift Request'</font>);\par
                    oRequest.Parms += oRequest.Action;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \}\par
                \} <b>else if </b>(oRequest.Action.<b>indexOf</b>(<font color="#800080">'stimulus'</font>)!=-1) \{\par
                  <b>if </b>(aParams[3004]==0) \{\par
                    GM_log(<font color="#800080">'Skipping FarmVille Claim Bonus Request'</font>);\par
                  \} <b>else if </b>(aParams[3004]==1) \{\par
                    GM_log(<font color="#800080">'Ignoring FarmVille Claim Bonus Request'</font>);\par
                    oRequest.Parms += oRequest.Reject;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \} <b>else </b>\{\par
                    GM_log(<font color="#800080">'Adding FarmVille Claim Bonus Request'</font>);\par
                    oRequest.Parms += oRequest.Action;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \}\par
                \} <b>else if </b>(oRequest.Action.<b>indexOf</b>(<font color="#800080">'addneighbor'</font>)!=-1) \{\par
                  <b>if </b>(aParams[3003]==0) \{\par
                    GM_log(<font color="#800080">'Skipping FarmVille Join Request'</font>);\par
                  \} <b>else if </b>(aParams[3003]==1) \{\par
                    GM_log(<font color="#800080">'Ignoring FarmVille Join Request'</font>);\par
                    oRequest.Parms += oRequest.Reject;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \} <b>else </b>\{\par
                    GM_log(<font color="#800080">'Adding FarmVille Join Request'</font>);\par
                    oRequest.Parms += oRequest.Action;\par
                    oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                    oRequestList.Append(oRequest);\par
                    iRequestNum = iRequestNum + 1;\par
                  \}\par
                \}\par
              \} <b>else if </b>(aCat[1] == <font color="#800080">'176611639027113 '</font>) \{\par
                <i>// Rewardville...\par
                </i>GM_log(oRequest.Action);\par
                GM_log(oRequest.Gifttype);\par
                GM_log(oRequest.Parms);\par
\par
\par
\par
              \} <b>else </b>\{\par
                <b>if </b>(aParams[4000]==0) \{\par
                  <i>//GM_log('Skipping Other Request');\par
                </i>\} <b>else </b>\{\par
                  GM_log(<font color="#800080">'Ignoring Other Request'</font>);\par
                  oRequest.Parms += oRequest.Reject;\par
                  oRequest.Parms += <font color="#800080">'&amp;lsd&amp;post_form_id_source=AsyncRequest'</font>;\par
                  oRequestList.Append(oRequest);\par
                  iRequestNum = iRequestNum + 1;\par
                \}\par
              \}\par
            \}\par
            <i>// end loop\par
            </i>GM_log(<font color="#800080">'done: ' </font>+iRequestNum);\par
            <b>var </b>strNotice = <font color="#800080">'&lt;font style=&quot;color: rgb(59, 89, 152);&quot;&gt;&lt;b&gt;Spam Event Items:&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;table&gt;&lt;tr&gt;'</font>;\par
            <b>var </b>iCountSpam = 0;\par
            <b>for </b>(<b>var name in </b>spamItems) \{\par
              <b>if </b>( iCountSpam &lt;= 4 ) \{\par
                strNotice += <font color="#800080">'&lt;td&gt;'</font>+spamItems[<b>name</b>].<b>text</b>+<font color="#800080">': '</font>;\par
                iCountSpam++;\par
              \} <b>else </b>\{\par
                strNotice += <font color="#800080">'&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;'</font>+spamItems[<b>name</b>].<b>text</b>+<font color="#800080">': '</font>;\par
                iCountSpam = 1;\par
              \}\par
              <b>if </b>( iNum[<b>name</b>] &gt; 0 ) \{\par
                strNotice += <font color="#800080">'&lt;font style=&quot;color: rgb(59, 89, 152);&quot;&gt;&lt;b&gt;'</font>+iNum[<b>name</b>]+<font color="#800080">'&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;'</font>;\par
              \} <b>else </b>\{\par
                strNotice += iNum[<b>name</b>]+<font color="#800080">'&lt;/td&gt;'</font>;\par
              \}\par
            \}\par
            strNotice += <font color="#800080">'&lt;/tr&gt;&lt;/table&gt;'</font>;\par
            LogPush(strNotice);\par
            <b>if </b>(bAutoRun) \{\par
              <b>if </b>(oRequestList.First != null) \{\par
                  LogPush(<font color="#800080">'&lt;b&gt;'</font>+iRequestNum +<font color="#800080">' request(s) have been found and will be processed&lt;/b&gt;'</font>);\par
                  iRequestCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionRequest);\}, getRandRange(aParams[0]*750,aParams[0]*1250));\par
              \} <b>else </b>\{\par
                LogPush(<font color="#800080">'&lt;b&gt;No requests have been found.  Checking again in '</font>+ aParams[1] +<font color="#800080">' minutes. &lt;/b&gt;'</font>);\par
                  iRequestCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionRequest);\}, getRandRange(aParams[1]*50000,aParams[1]*70000));\par
              \}\par
              <b>if </b>(iRequestCurrent &lt; iHoldEvent) \{\par
                  <i>// The browser has reset.  Cancel runaway jobs;\par
                  </i>GM_log(<font color="#800080">'test4'</font>);\par
                  <b>clearTimeout</b>(iRequestCurrent);\par
              \}\par
            \}\par
          \}\par
        \} catch(err) \{\par
          <b>if </b>(bAutoRun) \{\par
            GM_log(<font color="#800080">'Error done: ' </font>+iRequestNum);\par
            GM_log(<font color="#800080">'Error: Read FB Requests - '</font>+err.message);\par
            <b>if </b>(oRequestList.First != null) \{\par
              LogPush(<font color="#800080">'&lt;b&gt;'</font>+iRequestNum +<font color="#800080">' request(s) have been found and will be processed&lt;/b&gt;'</font>);\par
              iRequestCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionRequest);\}, getRandRange(aParams[0]*750,aParams[0]*1250));\par
            \} <b>else </b>\{\par
              LogPush(<font color="#800080">'&lt;b&gt;No requests have been found.  Checking again in '</font>+ aParams[1] +<font color="#800080">' minutes. &lt;/b&gt;'</font>);\par
              iRequestCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ EventSpan.dispatchEvent(ActionRequest);\}, getRandRange(aParams[1]*50000,aParams[1]*70000));\par
            \}\par
            <b>if </b>(iRequestCurrent &lt; iHoldEvent) \{\par
                <i>// The browser has reset.  Cancel runaway jobs;\par
                </i><b>clearTimeout</b>(iRequestCurrent);\par
            \}\par
          \}\par
        \}\par
      \}\par
    \});\par
  \} <b>else </b>\{\par
    GM_log(<font color="#800080">'Read Request stopped'</font>);\par
  \}\par
\}\par
\par
<i>/**** Initialization Routine ****/\par
</i><b>function </b>Initialize() \{\par
  <b>var </b>oDom, oDiv, oButton, oText;\par
  <b>var </b>strGMList,strPara;\par
  <b>var </b>aTempPara = <b>new Array</b>();\par
  <i>// Case Specific Initialization\par
  </i>switch (strFrameId) \{\par
    case <font color="#800080">'MafiaWars'</font>:\par
      <i>// nothing in here right now.\par
      </i><b>break</b>;\par
    case <font color="#800080">'FaceBook'</font>:\par
      <i>// create lists\par
      </i>oRespectList = <b>new </b>List(ReadRespect);\par
      oWallList    = <b>new </b>List(ReadWall);\par
      oRequestList = <b>new </b>List(Read_FB_Requests);\par
      <i>// Set up Event handling\par
      </i>EventSpan = <b>document</b>.createElement(<font color="#800080">'span'</font>);\par
      EventSpan.addEventListener(<font color="#800080">&quot;FBAA-ActionRespect&quot;</font>, <b>function</b>(evt) \{oRespectList.Run()\}, false);\par
      EventSpan.addEventListener(<font color="#800080">&quot;FBAA-ActionWall&quot;</font>,    <b>function</b>(evt) \{oWallList.Run()\}, false);\par
      EventSpan.addEventListener(<font color="#800080">&quot;FBAA-ActionRequest&quot;</font>, <b>function</b>(evt) \{oRequestList.Run()\}, false);\par
      ActionRespect = <b>document</b>.createEvent(<font color="#800080">&quot;Events&quot;</font>); ActionRespect.initEvent(<font color="#800080">&quot;FBAA-ActionRespect&quot;</font>, false, false);\par
      ActionWall    = <b>document</b>.createEvent(<font color="#800080">&quot;Events&quot;</font>); ActionWall.initEvent(<font color="#800080">&quot;FBAA-ActionWall&quot;</font>, false, false);\par
      ActionRequest = <b>document</b>.createEvent(<font color="#800080">&quot;Events&quot;</font>); ActionRequest.initEvent(<font color="#800080">&quot;FBAA-ActionRequest&quot;</font>, false, false);\par
      <i>//set Up Log File\par
      </i>oLogDiv = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
      oLogDiv.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'width: 770px; height: 250px; overflow-x: hidden;overflow-y: auto; border: 1px solid rgb(204, 204, 204); padding-bottom: 2px; background-image: url(&quot;http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/fbaa/psfbaa_log.jpg&quot;);'</font>);\par
      oLogDiv.innerHTML = GM_getValue(<font color="#800080">'LogDiv'</font>,<font color="#800080">''</font>);\par
      GM_setValue(<font color="#800080">'LogDiv'</font>,oLogDiv.innerHTML);\par
      <i>//set the time for wall processing (go back 6 hours);\par
      </i>iNow = <b>Math</b>.<b>floor</b>(<b>new Date</b>().<b>valueOf</b>()/1000)-60*60*6;\par
      <i>// set up the FV Delay timer\par
      </i>FV_accept_ignore = 0;\par
      <i>// fb user id\par
      </i>FB_user_id = getFBID();\par
      GM_setValue(<font color="#800080">'FB_user_id'</font>,FB_user_id+<font color="#800080">''</font>);\par
      GM_log(<font color="#800080">'FB_user_id = '</font>+FB_user_id);\par
      <i>// get Save Set\par
      </i>strSaveSet = GM_getValue(<font color="#800080">'FBAA-SaveSet'</font>,<font color="#800080">'A'</font>);\par
      GM_setValue(<font color="#800080">'FBAA-SaveSet'</font>,strSaveSet);\par
      <i>// set up the group Names\par
      </i>strGroups = <font color="#800080">'&lt;option value=&quot;0&quot;&gt;-&lt;/option&gt;'</font>;\par
      getGroupNames();\par
      <i>// start a routine to keep the xw_sig current\par
      </i>xw_sig_valid = false;\par
      local_xw_user_id=<font color="#800080">''</font>;\par
      <i>// get updated NW credentials\par
      </i>FB_xw_sig_update();\par
      <i>// refresh every 5 minutes\par
      </i>iFB_XW_Timer = <b>setInterval</b>(FB_xw_sig_update, 300000);\par
      bAutoRun = GM_getValue(<font color="#800080">'bAutoRun'</font>,false);\par
      bShowLog = GM_getValue(<font color="#800080">'bShowLog'</font>,false);\par
      <i>// check for old settings\par
      </i><b>var </b>keys = GM_listValues();\par
      <b>for </b>(<b>var </b>ID <b>in </b>keys) \{\par
        <b>if </b>(keys[ID] == <font color="#800080">'FBAA-Settings'</font>) \{\par
          GM_setValue(<font color="#800080">'FBAA-Settings-'</font>+strSaveSet,GM_getValue(keys[ID]));\par
          GM_deleteValue(keys[ID]);\par
        \}\par
      \}\par
      <i>// read running parameters\par
      </i>strPara = GM_getValue(<font color="#800080">'FBAA-Settings-'</font>+strSaveSet,<font color="#800080">'\{)'</font>);\par
      try \{\par
        aParams.<b>length </b>= 0;\par
      <i>//GM_log(strPara);\par
        </i><b>eval</b>(<font color="#800080">'aParams = '</font>+strPara);\par
        GM_log(aParams[2005]);\par
      \} catch (ierr) \{\par
        aParams.<b>length </b>= 0;\par
        aParams = \{\};\par
        GM_setValue(<font color="#800080">'FBAA-Settings-'</font>+strSaveSet,<font color="#800080">'\{\}'</font>);\par
      \}\par
      <i>// fix Mission selection\par
      </i><b>if </b>(aParams[2021] == undefined) aParams[2021]=0;\par
      <b>if </b>(aParams[2022] == undefined) aParams[2022]=0;\par
      <b>if </b>(aParams[2023] == undefined) aParams[2023]=0;\par
      <b>if </b>(aParams[2030] == undefined) aParams[2030]=0;\par
      <b>if </b>(aParams[2031] == undefined) aParams[2031]=0;\par
      <i>// add the FV special parameters is needed.\par
      </i><b>if </b>(aParams[<font color="#800080">&quot;FV_MasteryFriendRewad&quot;</font>] == undefined) \{\par
        aParams = \{0:5,1:30,2:5,3:10,4:100,5:5,6:30,1000:0,1001:0,1002:0,1003:0,1004:0,1005:0,1006:0,2000:0,2001:0,2002:1,2003:0,3000:0,3001:0,3002:1,3003:0,3004:0,3005:1,4000:0\};\par
        aParams[<font color="#800080">&quot;FV_MasteryFriendRewad&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_HorseStableFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_FuelDiscoveryFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_FertilizeThankFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_SocialMissionShareBonusFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_StorageExpansionFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_WanderingStallionFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_AchievementFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_TuscanWeddingRedeemFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_TuscanWeddingFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_FlowerFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_BushelFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_StallThankYouFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_lonely_cow&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_FoalFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_NurseryBuildingFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_EggFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_CollectionsFriendReward&quot;</font>] = false;\par
        aParams[<font color="#800080">&quot;FV_ConstructionBuildingFriendReward&quot;</font>] = false;\par
      \}\par
      GM_setValue(<font color="#800080">'bAutoRun'</font>,bAutoRun);\par
      GM_getValue(<font color="#800080">'bShowLog'</font>,bShowLog);\par
      <b>if </b>(bAutoRun) iRequestCurrent = <b>setTimeout</b>(<b>function </b>(e) \{ StartProcessing(); \}, 15000);\par
      <i>// setup display\par
      </i>createDisplay();\par
      <b>break</b>;\par
  \}\par
\}\par
\par
<i>/**** Create Auto Accept Display ****/\par
</i><b>function </b>createDisplay() \{\par
    <b>var </b>oDom, oDom1, oDom2;\par
    <b>var </b>oDiv, oDiv1, oDiv2, oTable, oTr, oTh, oTd, oForm, oInput, oImg, oH, oP, oUl;\par
    <b>var </b>oHeader;\par
    oDom  = <b>document</b>.getElementById(<font color="#800080">'contentCol'</font>);\par
    <b>if </b>(<b>document</b>.getElementById(strFBAutoAccept)) \{\par
      <i>// skip UI is already in place\par
      </i><b>return</b>;\par
    \} <b>else if </b>(<b>document</b>.getElementById(<font color="#800080">'editProfileForm'</font>)) \{\par
      <i>// don't show the UI on the edit profile form\par
      </i><b>return</b>;\par
    \} <b>else if </b>(<b>document</b>.getElementById(<font color="#800080">'pagelet_search_header'</font>)) \{\par
      <i>// don't show the UI on the search page.\par
      </i><b>return</b>;\par
    \} <b>else if </b>(<b>document</b>.getElementById(<font color="#800080">'pagelet_header_personal'</font>)) \{\par
      <i>// don't show the UI on the personal page.\par
      </i><b>return</b>;\par
    \} <b>else if </b>(<b>document</b>.getElementById(<font color="#800080">'pagelet_groups'</font>)) \{\par
      <i>// don't show the UI on the Groups page.\par
      </i><b>return</b>;\par
    \} <b>else if </b>((<b>document</b>.getElementById(<font color="#800080">'pagelet_friends'</font>))&amp;&amp;(!<b>document</b>.getElementById(<font color="#800080">'pagelet_requests'</font>))) \{\par
      <i>// don't show the UI on the friends page.\par
      </i><b>return</b>;\par
    \} <b>else if </b>(<b>document</b>.getElementById(<font color="#800080">'editFriendsHeader'</font>)) \{\par
      <i>// don't show the UI on the friends header page.\par
      </i><b>return</b>;\par
    \} <b>else if </b>(oDom) \{\par
      <i>// adjust the group display header hight\par
      </i><b>if </b>(<b>document</b>.getElementById(<font color="#800080">'headerArea'</font>)!= null) \{\par
        <b>document</b>.getElementById(<font color="#800080">'headerArea'</font>).setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'margin-top:25px; padding-bottom:5px'</font>)\par
      \}\par
      <i>// put the display on any page that uses the column format\par
        </i>GM_log(<font color="#800080">'create Display'</font>);\par
        oHeader = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
        oHeader.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'padding-left: 15px; padding-right: 15px;'</font>);\par
        oHeader.id = strFBAutoAccept;\par
        oDom.insertBefore(oHeader,oDom.firstChild);\par
        <i>// create Title\par
        </i>oDiv = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
        oDiv.setAttribute(<font color="#800080">'class'</font>,<font color="#800080">&quot;uiHeader uiHeader uiHeaderPage ptm pbl&quot;</font>);\par
            oDiv1 = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
            oDiv1.setAttribute(<font color="#800080">'class'</font>,<font color="#800080">&quot;clearfix uiHeaderTop&quot;</font>);\par
            oDiv1.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'height: 10px;'</font>);\par
                oDiv2 = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
                oDiv2.setAttribute(<font color="#800080">'class'</font>,<font color="#800080">&quot;lfloat&quot;</font>);\par
                    oH = <b>document</b>.createElement(<font color="#800080">'h2'</font>);\par
                    oH.setAttribute(<font color="#800080">'class'</font>,<font color="#800080">&quot;uiHeaderTitle&quot;</font>);\par
                        oImg = <b>document</b>.createElement(<font color="#800080">'img'</font>);\par
                        oImg.setAttribute(<font color="#800080">'height'</font>,<font color="#800080">'18px'</font>);\par
                        oImg.<b>src </b>= imgLogo;\par
                    oH.appendChild(oImg);\par
                    oH.appendChild(<b>document</b>.createTextNode(<font color="#800080">&quot;  PS Wall Scrubber (FBAA)&quot;</font>));\par
                oDiv2.appendChild(oH);\par
            oDiv1.appendChild(oDiv2);\par
        oDiv.appendChild(oDiv1);\par
        oHeader.appendChild(oDiv);\par
\par
        <i>// Create Buttons for Header\par
        </i>oDiv = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
        oDiv.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;border-bottom: 1px solid rgb(204, 204, 204); padding-bottom:2px&quot;</font>);\par
            oTable = <b>document</b>.createElement(<font color="#800080">'table'</font>);\par
                oTbody = <b>document</b>.createElement(<font color="#800080">'tbody'</font>);\par
                    oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
                        oTd.setAttribute(<font color="#800080">'width'</font>,<font color="#800080">&quot;200px&quot;</font>);\par
                            oFont = <b>document</b>.createElement(<font color="#800080">'font'</font>);\par
                            oFont.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;color: rgb(0, 0, 0); font-size: 13px; font-weight: normal;&quot;</font>);\par
                            oFont.appendChild(<b>document</b>.createTextNode(<font color="#800080">&quot;Auto Process: &quot;</font>));\par
                                oSpan = <b>document</b>.createElement(<font color="#800080">'span'</font>);\par
                                oSpan.id = strAutoOn;\par
                                oSpan.addEventListener(<font color="#800080">&quot;click&quot;</font>, click_AutoRun(1), false);\par
                                <b>if </b>(bAutoRun) \{\par
                                    oSpan.innerHTML= <font color="#800080">'&lt;b&gt;On&lt;/b&gt;'</font>;\par
                                \} <b>else </b>\{\par
                                    oSpan.innerHTML= <font color="#800080">'&lt;font style=&quot;color: rgb(59, 89, 152); cursor: pointer;&quot;&gt; &lt;a&gt;On&lt;/a&gt; &lt;/font&gt;'</font>;\par
                                \}\par
                            oFont.appendChild(oSpan);\par
                            oFont.appendChild(<b>document</b>.createTextNode(<font color="#800080">&quot; / &quot;</font>));\par
                                oSpan = <b>document</b>.createElement(<font color="#800080">'span'</font>);\par
                                oSpan.id = strAutoOff;\par
                                oSpan.addEventListener(<font color="#800080">&quot;click&quot;</font>, click_AutoRun(0), false);\par
                                <b>if </b>(!bAutoRun) \{\par
                                    oSpan.innerHTML= <font color="#800080">'&lt;b&gt;Off&lt;/b&gt;'</font>;\par
                                \} <b>else </b>\{\par
                                    oSpan.innerHTML= <font color="#800080">'&lt;font style=&quot;color: rgb(59, 89, 152); cursor: pointer;&quot;&gt; &lt;a&gt;Off&lt;/a&gt; &lt;/font&gt;'</font>;\par
                                \}\par
                            oFont.appendChild(oSpan);\par
                        oTd.appendChild(oFont);\par
                    oTr.appendChild(oTd);\par
                        oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
                        oTd.setAttribute(<font color="#800080">'width'</font>,<font color="#800080">&quot;200px&quot;</font>);\par
                            oFont = <b>document</b>.createElement(<font color="#800080">'font'</font>);\par
                            oFont.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;color: rgb(0, 0, 0); font-size: 13px; font-weight: normal;&quot;</font>);\par
                            oFont.appendChild(<b>document</b>.createTextNode(<font color="#800080">&quot;Log: &quot;</font>));\par
                                oSpan = <b>document</b>.createElement(<font color="#800080">'span'</font>);\par
                                oSpan.id = strLogShow;\par
                                oSpan.addEventListener(<font color="#800080">&quot;click&quot;</font>, click_ShowLog(1), false);\par
                                <b>if </b>(bShowLog) \{\par
                                    oSpan.innerHTML= <font color="#800080">'&lt;b&gt;Show&lt;/b&gt;'</font>;\par
                                \} <b>else </b>\{\par
                                    oSpan.innerHTML= <font color="#800080">'&lt;font style=&quot;color: rgb(59, 89, 152); cursor: pointer;&quot;&gt; &lt;a&gt;Show&lt;/a&gt; &lt;/font&gt;'</font>;\par
                                \}\par
                            oFont.appendChild(oSpan);\par
                            oFont.appendChild(<b>document</b>.createTextNode(<font color="#800080">&quot; / &quot;</font>));\par
                                oSpan = <b>document</b>.createElement(<font color="#800080">'span'</font>);\par
                                oSpan.id = strLogHide;\par
                                oSpan.addEventListener(<font color="#800080">&quot;click&quot;</font>, click_ShowLog(0), false);\par
                                <b>if </b>(!bShowLog) \{\par
                                    oSpan.innerHTML= <font color="#800080">'&lt;b&gt;Hide&lt;/b&gt;'</font>;\par
                                \} <b>else </b>\{\par
                                    oSpan.innerHTML= <font color="#800080">'&lt;font style=&quot;color: rgb(59, 89, 152); cursor: pointer;&quot;&gt; &lt;a&gt;Hide&lt;/a&gt; &lt;/font&gt;'</font>;\par
                                \}\par
                            oFont.appendChild(oSpan);\par
                        oTd.appendChild(oFont);\par
                    oTr.appendChild(oTd);\par
                        oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
                        oTd.setAttribute(<font color="#800080">'width'</font>,<font color="#800080">&quot;120px&quot;</font>);\par
                            oSpan = <b>document</b>.createElement(<font color="#800080">'span'</font>);\par
                            oSpan.innerHTML = <font color="#800080">'&lt;font style=&quot;color: rgb(59, 89, 152); font-size: 13px; font-weight: normal; cursor: pointer;&quot;&gt;&lt;a&gt;Settings&lt;/a&gt;&lt;/font&gt;'</font>;\par
                            oSpan.addEventListener(<font color="#800080">&quot;click&quot;</font>,  click_ShowSetting(), false);\par
                        oTd.appendChild(oSpan);\par
                    oTr.appendChild(oTd);\par
                        oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
                        oTd.setAttribute(<font color="#800080">'width'</font>,<font color="#800080">&quot;120px&quot;</font>);\par
                            oSpan = <b>document</b>.createElement(<font color="#800080">'span'</font>);\par
                            oSpan.innerHTML = <font color="#800080">'&lt;font style=&quot;color: rgb(59, 89, 152); font-size: 13px; font-weight: normal; cursor: pointer;&quot;&gt;&lt;a&gt;Check Updates&lt;/a&gt;&lt;/font&gt;'</font>;\par
                            oSpan.addEventListener(<font color="#800080">&quot;click&quot;</font>,  <b>function</b>() \{ updateCheck(true);\}, false);\par
                        oTd.appendChild(oSpan);\par
                    oTr.appendChild(oTd);\par
                        oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
                            oFont = <b>document</b>.createElement(<font color="#800080">'font'</font>);\par
                            oFont.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;color: rgb(0, 0, 0); font-size: 13px; font-weight: normal;&quot;</font>);\par
                            oFont.appendChild(<b>document</b>.createTextNode(<font color="#800080">&quot;Version: &quot;</font>+script_version));\par
                        oTd.appendChild(oFont);\par
                    oTr.appendChild(oTd);\par
                oTbody.appendChild(oTr);\par
            oTable.appendChild(oTbody);\par
        oDiv.appendChild(oTable);\par
        oHeader.appendChild(oDiv);\par
\par
        <i>// Add Settings Floating Window\par
        </i>oDom = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
        oDom.id = strFBAASettings;\par
        oDom.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;display:none; -moz-border-radius: 10px; border: 5px solid rgb(104, 104, 104); padding: 5px; overflow: auto; margin-top: -30px; margin-left: 20px; background-color: white; width: 610px; height: 380px; position: absolute; z-index: 100;&quot;</font>);\par
            oDiv = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
                oTable = <b>document</b>.createElement(<font color="#800080">'table'</font>);\par
                oTable.setAttribute(<font color="#800080">'width'</font>,<font color="#800080">'100%'</font>);\par
              <i>//oTable.setAttribute('style','border-bottom:1px solid black');\par
                    </i>oTbody = <b>document</b>.createElement(<font color="#800080">'tbody'</font>);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.innerHTML = <font color="#800080">'&lt;div&gt;&lt;h1 class=&quot;uiHeaderTitle&quot;&gt;PSFBAA - Settings&lt;/h1&gt;&lt;/div&gt;'</font>;\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;padding-bottom: 10px;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;2&quot;</font>);\par
                        oTr.appendChild(oTh);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.innerHTML = <font color="#800080">'Catagory'</font>;\par
                            oTh.setAttribute(<font color="#800080">'width'</font>,<font color="#800080">&quot;110&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'Style'</font>,<font color="#800080">&quot;border-bottom: 1px solid rgb(204, 204, 204)&quot;</font>);\par
                        oTr.appendChild(oTh);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.innerHTML = <font color="#800080">'Settings'</font>;\par
                            oTh.setAttribute(<font color="#800080">'Style'</font>,<font color="#800080">&quot;border-bottom: 1px solid rgb(204, 204, 204)&quot;</font>);\par
                        oTr.appendChild(oTh);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
                                oDiv1 = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
                                oDiv1.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'border: 0px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 110px; height: 300px;'</font>);\par
                                    oUl = <b>document</b>.createElement(<font color="#800080">'ul'</font>);\par
                                    oUl.setAttribute(<font color="#800080">'class'</font>,<font color="#800080">&quot;uiSideNav&quot;</font>);\par
                                    oUl.appendChild(addMenu(<font color="#800080">&quot;General&quot;</font>,0));\par
                                    oUl.appendChild(addMenu(<font color="#800080">&quot;FaceBook&quot;</font>, 1));\par
                                    oUl.appendChild(addMenu(<font color="#800080">&quot;Mafia Wars&quot;</font>, 2));\par
                                    oUl.appendChild(addMenu(<font color="#800080">&quot;FarmVille&quot;</font>, 3));\par
                                    oUl.appendChild(addMenu(<font color="#800080">&quot;Others&quot;</font>, 4));\par
                                oDiv1.appendChild(oUl);\par
                            oTd.appendChild(oDiv1);\par
                        oTr.appendChild(oTd);\par
                            oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
                                oTd.appendChild(CreateGeneralTab(0));\par
                                oTd.appendChild(CreateFaceBookTab(1));\par
                                oTd.appendChild(CreateMafiaWarsTab(2));\par
                                oTd.appendChild(CreateFarmVilleTab(3));\par
                                oTd.appendChild(CreateOtherTab(4));\par
                              <i>//GM_log('oTd.innerHTML = '+oTd.innerHTML );\par
                        </i>oTr.appendChild(oTd);\par
                    oTbody.appendChild(oTr);\par
                oTable.appendChild(oTbody);\par
           oDiv.appendChild(oTable);\par
        oDom.appendChild(oDiv);\par
           oDiv = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
                oTable = <b>document</b>.createElement(<font color="#800080">'table'</font>);\par
                oTable.setAttribute(<font color="#800080">'width'</font>,<font color="#800080">'100%'</font>);\par
                    oTbody = <b>document</b>.createElement(<font color="#800080">'tbody'</font>);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
                            oTd.setAttribute(<font color="#800080">'width'</font>,<font color="#800080">&quot;150&quot;</font>);\par
                        oTr.appendChild(oTd);\par
                            oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
                            oTd.setAttribute(<font color="#800080">'width'</font>,<font color="#800080">&quot;220&quot;</font>);\par
                            oTd.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'text-align:center'</font>);\par
                                oSpan = <b>document</b>.createElement(<font color="#800080">'span'</font>);\par
                                oSpan.addEventListener(<font color="#800080">&quot;click&quot;</font>, click_CloseSettings(0), false);\par
                                    oFont = <b>document</b>.createElement(<font color="#800080">'font'</font>);\par
                                    oFont.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">' font-size: 13px; color: rgb(59, 89, 152); cursor: pointer;'</font>);\par
                                    oFont.innerHTML = <font color="#800080">'&lt;a&gt;Accept Changes&lt;/a&gt;'</font>;\par
                                oSpan.appendChild(oFont);\par
                            oTd.appendChild(oSpan);\par
                        oTr.appendChild(oTd);\par
                            oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
                            oTd.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'text-align:center'</font>);\par
                                oSpan = <b>document</b>.createElement(<font color="#800080">'span'</font>);\par
                                oSpan.addEventListener(<font color="#800080">&quot;click&quot;</font>, click_CloseSettings(1), false);\par
                                    oFont = <b>document</b>.createElement(<font color="#800080">'font'</font>);\par
                                    oFont.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">' font-size: 13px; color: rgb(59, 89, 152); cursor: pointer;'</font>);\par
                                    oFont.innerHTML = <font color="#800080">'&lt;a&gt;Cancel&lt;/a&gt;'</font>;\par
                                oSpan.appendChild(oFont);\par
                            oTd.appendChild(oSpan);\par
                        oTr.appendChild(oTd);\par
                    oTbody.appendChild(oTr);\par
                oTable.appendChild(oTbody);\par
            oDiv.appendChild(oTable);\par
        oDom.appendChild(oDiv);\par
        oHeader.appendChild(oDom);\par
\par
        <i>// Create Log Window\par
        </i>oDom = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
        oDom.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'display: ;'</font>);\par
        oDom.id = strFBAALog;\par
          oP = <b>document</b>.createElement(<font color="#800080">'p'</font>);\par
          oP.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;text-align: right;&quot;</font>);\par
            oFont = <b>document</b>.createElement(<font color="#800080">'font'</font>);\par
            oFont.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;color: rgb(59, 89, 152); font-size: 13px; font-weight: normal; cursor: pointer;&quot;</font>);\par
              oButton = <b>document</b>.createElement(<font color="#800080">'a'</font>);\par
              oButton.textContent = <font color="#800080">&quot;View Mission Queue&quot;</font>;\par
              oButton.addEventListener(<font color="#800080">&quot;click&quot;</font>, click_MissionQueue, false);\par
            oFont.appendChild(oButton);\par
          oP.appendChild(oFont);\par
            oFont = <b>document</b>.createElement(<font color="#800080">'font'</font>);\par
            oFont.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;color: rgb(255, 255, 255); font-size: 13px; font-weight: normal; cursor: normal;&quot;</font>);\par
            oFont.innerHTML = <font color="#800080">'..........'</font>;\par
          oP.appendChild(oFont);\par
            oFont = <b>document</b>.createElement(<font color="#800080">'font'</font>);\par
            oFont.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;color: rgb(59, 89, 152); font-size: 13px; font-weight: normal; cursor: pointer;&quot;</font>);\par
              oButton = <b>document</b>.createElement(<font color="#800080">'a'</font>);\par
              oButton.textContent = <font color="#800080">&quot;Clear Log&quot;</font>;\par
              oButton.addEventListener(<font color="#800080">&quot;click&quot;</font>, click_ClearLog, false);\par
            oFont.appendChild(oButton);\par
          oP.appendChild(oFont);\par
        oDom.appendChild(oP);\par
          oDiv = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
          oDiv.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'width: 770px; height: 250px; overflow-x: hidden;overflow-y: auto; border: 1px solid rgb(204, 204, 204); padding-bottom: 2px; background-image: url(&quot;http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/fbaa/psfbaa_log.jpg&quot;)'</font>);\par
        oDom.appendChild(oDiv);\par
        <b>var </b>mwapiFrame = makeElement(<font color="#800080">'iframe'</font>, oDom, \{<font color="#800080">'id'</font>:<font color="#800080">'mwapiFrame'</font>,<font color="#800080">'src'</font>:<font color="#800080">'http://playerscripts.com/ps-adbanner/ps-adbanner_ws_horiz.html'</font>,<font color="#800080">'scrolling'</font>:<font color="#800080">'no'</font>,<font color="#800080">'frameborder'</font>:<font color="#800080">'0'</font>,<font color="#800080">'style'</font>:<font color="#800080">'margin:0px auto;padding:0px; border:none; overflow:hidden; width:770px; height:105px;'</font>,<font color="#800080">'allowTransparency'</font>:<font color="#800080">'false'</font>\});\par
\par
        oHeader.appendChild(oDom);\par
        oDom.replaceChild(oLogDiv,oDiv);\par
        <b>if </b>(bShowLog) \{\par
            oLogDiv.parentNode.style.display = <font color="#800080">&quot;&quot;</font>;\par
        \} <b>else </b>\{\par
            oLogDiv.parentNode.style.display = <font color="#800080">&quot;none&quot;\par
        </font>\}\par
    \}\par
\par
    <b>function </b>addMenu( _text, _index) \{\par
        <b>var </b>oLi, oSpan, oImg, oButton, oTxt;\par
        oLi = <b>document</b>.createElement(<font color="#800080">'li'</font>)\par
        oLi.setAttribute(<font color="#800080">'id'</font>,strFBAASetTabs+_index);\par
        <b>if </b>(_index==0) \{\par
            oLi.setAttribute(<font color="#800080">'class'</font>,<font color="#800080">'selected'</font>);\par
        \} <b>else </b>\{\par
            oLi.setAttribute(<font color="#800080">'class'</font>,<font color="#800080">''</font>);\par
        \}\par
            oButton = <b>document</b>.createElement(<font color="#800080">'a'</font>);\par
            oButton.setAttribute(<font color="#800080">'class'</font>,<font color="#800080">'item'</font>);\par
                oSpan = <b>document</b>.createElement(<font color="#800080">'span'</font>);\par
                oSpan.setAttribute(<font color="#800080">'class'</font>,<font color="#800080">'imgWrap'</font>);\par
                    oImg = <b>document</b>.createElement(<font color="#800080">'img'</font>);\par
                    oImg.setAttribute(<font color="#800080">'class'</font>,<font color="#800080">'img'</font>);\par
                    oImg.setAttribute(<font color="#800080">'src'</font>,imgCatagory[_index]);\par
                oSpan.appendChild(oImg);\par
            oButton.appendChild(oSpan);\par
                oTxt = <b>document</b>.createTextNode(_text)\par
            oButton.appendChild(oTxt);\par
            oButton.addEventListener(<font color="#800080">&quot;click&quot;</font>, click_ShowSettingsTab(_index), false);\par
        oLi.appendChild(oButton);\par
        <b>return </b>oLi;\par
    \}\par
\par
    <b>function </b>createCheckBox(_oTr, _iPar,_strName) \{\par
        <b>var </b>oTd, oInput, oText;\par
        oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
            oInput = <b>document</b>.createElement(<font color="#800080">'input'</font>);\par
            oInput.<b>name </b>= <font color="#800080">&quot;FBAA-Para-&quot;</font>+_iPar;\par
            oInput.<b>type </b>= <font color="#800080">&quot;checkbox&quot;</font>;\par
            oInput.<b>checked </b>= false;\par
        oTd.appendChild(oInput);\par
            oText = <b>document</b>.createTextNode(_strName);\par
        oTd.appendChild(oText);\par
        _oTr.appendChild(oTd);\par
    \}\par
\par
    <b>function </b>createCheckBoxList(_oTr,_oList) \{\par
        <b>var </b>oUl, oLi, oTd, oInput, oText, oFont, oButton, oSpan, oBr;\par
        <b>var </b>aNames;\par
        oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
          oTd.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">'2'</font>);\par
              oUl = <b>document</b>.createElement(<font color="#800080">'ul'</font>);\par
              oUl.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'border: 1px solid rgb(204, 204, 204); height: 88px; list-style: none outside none; overflow: auto;'</font>);\par
              <b>for </b>(<b>var </b>ID <b>in </b>_oList ) \{\par
                      oLi = <b>document</b>.createElement(<font color="#800080">'li'</font>);\par
                          oInput = <b>document</b>.createElement(<font color="#800080">'input'</font>);\par
                          oInput.<b>name   </b>= <font color="#800080">&quot;FBAA-Para-&quot;</font>+ID;\par
                          oInput.id   = <font color="#800080">&quot;FBAA-Para-&quot;</font>+ID;\par
                          oInput.<b>type   </b>= <font color="#800080">&quot;checkbox&quot;</font>;\par
                          oInput.<b>checked  </b>= false;\par
                      oLi.appendChild(oInput);\par
                          oText = <b>document</b>.createTextNode(_oList[ID].<b>text</b>);\par
                      oLi.appendChild(oText);\par
                  oUl.appendChild(oLi);\par
              \}\par
          oTd.appendChild(oUl);\par
        _oTr.appendChild(oTd);\par
          oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
          oTd.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'padding-left: 10px;'</font>);\par
            oFont = <b>document</b>.createElement(<font color="#800080">'font'</font>);\par
            oFont.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'font-size: 13px; font-weight: normal; cursor: pointer;'</font>);\par
              oSpan = <b>document</b>.createElement(<font color="#800080">'span'</font>);\par
              oSpan.innerHTML = <font color="#800080">'Accept All'</font>;\par
              oSpan.addEventListener(<font color="#800080">&quot;click&quot;</font>, click_List_Accept_all(_oList), false);\par
            oFont.appendChild(oSpan);\par
          oTd.appendChild(oFont);\par
            oBr = <b>document</b>.createElement(<font color="#800080">'br'</font>);\par
          oTd.appendChild(oBr);\par
            oBr = <b>document</b>.createElement(<font color="#800080">'br'</font>);\par
          oTd.appendChild(oBr);\par
            oFont = <b>document</b>.createElement(<font color="#800080">'font'</font>);\par
            oFont.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'font-size: 13px; font-weight: normal; cursor: pointer;'</font>);\par
              oSpan = <b>document</b>.createElement(<font color="#800080">'span'</font>);\par
              oSpan.innerHTML = <font color="#800080">'Cancel All'</font>;\par
              oSpan.addEventListener(<font color="#800080">&quot;click&quot;</font>, click_List_Cancel_all(_oList), false);\par
            oFont.appendChild(oSpan);\par
          oTd.appendChild(oFont);\par
       _oTr.appendChild(oTd);\par
    \}\par
\par
    <b>function </b>createDropDownList(_oTr, _iPar,_strName, _strOptions, _strValues) \{\par
        <b>var </b>oTd, oSelect, oOption;\par
        <b>var </b>aOptions = <b>new Array</b>();\par
        <b>var </b>aValues = <b>new Array</b>();\par
        aOptions = _strOptions.<b>split</b>(<font color="#800080">';'</font>);\par
        aValues = _strValues.<b>split</b>(<font color="#800080">';'</font>);\par
        oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
        oTd.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;width: 100px; text-align: right;&quot;</font>);\par
        oTd.textContent = _strName+<font color="#800080">&quot;:&quot;</font>;\par
        _oTr.appendChild(oTd);\par
        oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
        oTd.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;width: 100px;&quot;</font>);\par
            oSelect = <b>document</b>.createElement(<font color="#800080">'select'</font>);\par
            oSelect.<b>name </b>= <font color="#800080">&quot;FBAA-Para-&quot;</font>+_iPar;\par
            oSelect.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;width: 100px;&quot;</font>);\par
                <b>for </b>(<b>var </b>i=0;i&lt;aOptions.<b>length</b>;i++) \{\par
                    oOption = <b>document</b>.createElement(<font color="#800080">'option'</font>);\par
                    oOption.<b>value </b>= aValues[i];\par
                    oOption.textContent = aOptions[i];\par
                    oSelect.appendChild(oOption);\par
                \}\par
        oTd.appendChild(oSelect);\par
        _oTr.appendChild(oTd);\par
    \}\par
\par
    <b>function </b>CreateGeneralTab(_id) \{\par
        <b>var </b>oDom, oForm, oTable, oTbody, oTr, oTh, oTd, oHr ;\par
        oDom = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
        <b>if </b>(_id==0) \{\par
            oDom.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'display: ;border: 1px solid rgb(204, 204, 204); overflow: auto;background-image: url(&quot;http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/fbaa/psfbaa_bg.jpg&quot;); width: 480px; height: 300px;'</font>);\par
        \} <b>else </b>\{\par
            oDom.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(&quot;http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/fbaa/psfbaa_bg.jpg&quot;); width: 480px; height: 300px;'</font>);\par
        \}\par
        oDom.id = strFBAASetDivs+_id;\par
            oForm = <b>document</b>.createElement(<font color="#800080">'form'</font>);\par
                oForm.<b>name </b>= <font color="#800080">'FBAA-Form'</font>+_id;\par
                <i>// create layout;\par
                </i>oTable = <b>document</b>.createElement(<font color="#800080">'table'</font>);\par
                oTable.setAttribute(<font color="#800080">'width'</font>,<font color="#800080">'100%'</font>);\par
                    oTbody = <b>document</b>.createElement(<font color="#800080">'tbody'</font>);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;4&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Applications Enabled&quot;</font>;\par
                              oHr = <b>document</b>.createElement(<font color="#800080">'hr'</font>);\par
                          oTh.appendChild(oHr);\par
                        oTr.appendChild(oTh);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 7,<font color="#800080">'Mafia Wars'</font>,<font color="#800080">'Yes;No'</font>,<font color="#800080">'1;0'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 8,<font color="#800080">'Farmville'</font>,<font color="#800080">'Yes;No'</font>,<font color="#800080">'1;0'</font>);\par
                    oTbody.appendChild(oTr);\par
\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;4&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Request Timer&quot;</font>;\par
                              oHr = <b>document</b>.createElement(<font color="#800080">'hr'</font>);\par
                          oTh.appendChild(oHr);\par
                        oTr.appendChild(oTh);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 0,<font color="#800080">'Processing Interval'</font>,<font color="#800080">'1 seconds;2 seconds;3 seconds;4 seconds;5 seconds;6 seconds;7 seconds;8 seconds;9 seconds;10 seconds'</font>,<font color="#800080">'1;2;3;4;5;6;7;8;9;10'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 1,<font color="#800080">'Cycle Period'</font>,<font color="#800080">'DISABLE; 1 minute;5 minutes;15 minutes;30 minutes;1 hour;3 hours;6 hours;12 hours;1 day'</font>,<font color="#800080">'0;1;5;15;30;60;180;360;720;1440'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;4&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Wall Notification Timer&quot;</font>;\par
                              oHr = <b>document</b>.createElement(<font color="#800080">'hr'</font>);\par
                          oTh.appendChild(oHr);\par
                        oTr.appendChild(oTh);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 2,<font color="#800080">'Processing Interval'</font>,<font color="#800080">'0 seconds;1 seconds;2 seconds;3 seconds;4 seconds;5 seconds;6 seconds;7 seconds;8 seconds;9 seconds;10 seconds'</font>,<font color="#800080">'0;1;2;3;4;5;6;7;8;9;10'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 3,<font color="#800080">'Cycle Period'</font>,<font color="#800080">'DISABLE;5 seconds;10 seconds;15 seconds;20 seconds;25 seconds;30 seconds'</font>,<font color="#800080">'0;5;10;15;20;25;30'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;4&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Mafia Wars Crime Spree Timer&quot;</font>;\par
                              oHr = <b>document</b>.createElement(<font color="#800080">'hr'</font>);\par
                          oTh.appendChild(oHr);\par
                        oTr.appendChild(oTh);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 5,<font color="#800080">'Processing Interval'</font>,<font color="#800080">'1 seconds;2 seconds;3 seconds;4 seconds;5 seconds;6 seconds;7 seconds;8 seconds;9 seconds;10 seconds'</font>,<font color="#800080">'1;2;3;4;5;6;7;8;9;10'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 6,<font color="#800080">'Cycle Period'</font>,<font color="#800080">'DISABLE; 1 minute;5 minutes;15 minutes;30 minutes;1 hour;3 hours;6 hours;12 hours;1 day'</font>,<font color="#800080">'0;1;5;15;30;60;180;360;720;1440'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;4&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Log Length&quot;</font>;\par
                              oHr = <b>document</b>.createElement(<font color="#800080">'hr'</font>);\par
                          oTh.appendChild(oHr);\par
                        oTr.appendChild(oTh);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 4,<font color="#800080">'Log Length'</font>,<font color="#800080">'25 items; 50 items; 100 items; 150 items; 200 items; 400 items; 800 items; 1600 items; 3200 items'</font>,<font color="#800080">'25;50;100;150;200;400;800;1600;3200'</font>);\par
                    oTbody.appendChild(oTr);\par
                oTable.appendChild(oTbody)\par
             oForm.appendChild(oTable)\par
         oDom.appendChild(oForm);\par
        <b>return </b>oDom;\par
    \}\par
\par
    <b>function </b>CreateFaceBookTab(_id) \{\par
        <b>var </b>oDom, oForm, oTable, oTbody, oTr, oTh, oTd, oHr ;\par
        oDom = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
        <b>if </b>(_id==0) \{\par
            oDom.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(&quot;http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/fbaa/psfbaa_bg.jpg&quot;); width: 480px; height: 300px;'</font>);\par
        \} <b>else </b>\{\par
            oDom.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(&quot;http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/fbaa/psfbaa_bg.jpg&quot;); width: 480px; height: 300px;'</font>);\par
        \}\par
        oDom.id = strFBAASetDivs+_id;\par
            oForm = <b>document</b>.createElement(<font color="#800080">'form'</font>);\par
                oForm.<b>name </b>= <font color="#800080">'FBAA-Form'</font>+_id;\par
                <i>// create layout;\par
                </i>oTable = <b>document</b>.createElement(<font color="#800080">'table'</font>);\par
                oTable.setAttribute(<font color="#800080">'width'</font>,<font color="#800080">'100%'</font>);\par
                    oTbody = <b>document</b>.createElement(<font color="#800080">'tbody'</font>);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;4&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Friends&quot;</font>;\par
                              oHr = <b>document</b>.createElement(<font color="#800080">'hr'</font>);\par
                          oTh.appendChild(oHr);\par
                        oTr.appendChild(oTh);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 1000,<font color="#800080">'Suggestions'</font>,<font color="#800080">'Confirm;Ignore;Do Nothing'</font>,<font color="#800080">'2;1;0'</font>);\par
                            oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
                            oTd.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;width: 120px; text-align: right;&quot;</font>);\par
                            oTd.textContent = <font color="#800080">&quot;Add to List:&quot;</font>;\par
                        oTr.appendChild(oTd);\par
                            oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
                            oTd.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;width: 120px;&quot;</font>);\par
                                oSelect = <b>document</b>.createElement(<font color="#800080">'select'</font>);\par
                                oSelect.<b>name </b>= <font color="#800080">&quot;FBAA-Para-1001&quot;</font>;\par
                                oSelect.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;width: 120px;&quot;</font>);\par
                                oSelect.innnerHTML = strGroups;\par
                            oTd.appendChild(oSelect);\par
                        oTr.appendChild(oTd);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 1002,<font color="#800080">'Invitation'</font>,<font color="#800080">'Confirm;Ignore;Do Nothing'</font>,<font color="#800080">'2;1;0'</font>);\par
                            oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
                            oTd.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;width: 120px; text-align: right;&quot;</font>);\par
                            oTd.textContent = <font color="#800080">&quot;Add to List:&quot;</font>;\par
                        oTr.appendChild(oTd);\par
                            oTd = <b>document</b>.createElement(<font color="#800080">'td'</font>);\par
                            oTd.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;width: 120px;&quot;</font>);\par
                                oSelect = <b>document</b>.createElement(<font color="#800080">'select'</font>);\par
                                oSelect.<b>name </b>= <font color="#800080">&quot;FBAA-Para-1003&quot;</font>;\par
                                oSelect.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;width: 120px;&quot;</font>);\par
                                oSelect.innnerHTML = strGroups;\par
                            oTd.appendChild(oSelect);\par
                        oTr.appendChild(oTd);\par
                    oTbody.appendChild(oTr);\par
                            oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;4&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Other&quot;</font>;\par
                              oHr = <b>document</b>.createElement(<font color="#800080">'hr'</font>);\par
                          oTh.appendChild(oHr);\par
                        oTr.appendChild(oTh);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 1004,<font color="#800080">'Event Invitations'</font>,<font color="#800080">'Remove;Do Nothing'</font>,<font color="#800080">'1;0'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 1005,<font color="#800080">'Page Suggestions'</font>,<font color="#800080">'Ignore;Do Nothing'</font>,<font color="#800080">'1;0'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 1006,<font color="#800080">'Group Invitations'</font>,<font color="#800080">'Ignore;Do Nothing'</font>,<font color="#800080">'1;0'</font>);\par
                    oTbody.appendChild(oTr);\par
                oTable.appendChild(oTbody)\par
             oForm.appendChild(oTable)\par
         oDom.appendChild(oForm);\par
        <b>return </b>oDom;\par
    \}\par
\par
    <b>function </b>CreateMafiaWarsTab(_id) \{\par
        <b>var </b>oDom, oForm, oTable, oTbody, oTr, oTh, oTd, oHr ;\par
        oDom = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
        <b>if </b>(_id==0) \{\par
            oDom.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(&quot;http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/fbaa/psfbaa_bg.jpg&quot;); width: 480px; height: 300px;'</font>);\par
        \} <b>else </b>\{\par
            oDom.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(&quot;http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/fbaa/psfbaa_bg.jpg&quot;); width: 480px; height: 300px;'</font>);\par
        \}\par
            oDom.id = strFBAASetDivs+_id;\par
            oForm = <b>document</b>.createElement(<font color="#800080">'form'</font>);\par
                oForm.<b>name </b>= <font color="#800080">'FBAA-Form'</font>+_id;\par
                <i>// create layout;\par
                </i>oTable = <b>document</b>.createElement(<font color="#800080">'table'</font>);\par
                oTable.setAttribute(<font color="#800080">'width'</font>,<font color="#800080">'100%'</font>);\par
                    oTbody = <b>document</b>.createElement(<font color="#800080">'tbody'</font>);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;4&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Request Settings&quot;</font>;\par
                              oHr = <b>document</b>.createElement(<font color="#800080">'hr'</font>);\par
                          oTh.appendChild(oHr);\par
                        oTr.appendChild(oTh);\par
                   oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 2000,<font color="#800080">'Accept Gifts'</font>,<font color="#800080">'Confirm;Ignore;Do Nothing'</font>,<font color="#800080">'2;1;0'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 2020,<font color="#800080">'Accept Energy'</font>,<font color="#800080">'Confirm;Ignore;Do Nothing'</font>,<font color="#800080">'2;1;0'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 2025,<font color="#800080">'Accept Secret Drops'</font>,<font color="#800080">'Confirm-Keep3;Confirm-NL;Confirm-L;Ignore;Do Nothing'</font>,<font color="#800080">'4;3;2;1;0'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 2001,<font color="#800080">'Send Crime Spree Gift'</font>,<font color="#800080">'Confirm;Ignore;Do Nothing'</font>,<font color="#800080">'2;1;0'</font>);\par
                        createDropDownList(oTr, 2002,<font color="#800080">'Reward'</font>,<font color="#800080">'Experience;Energy;Stamina'</font>,<font color="#800080">'1;2;3'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 2003,<font color="#800080">'Join'</font>,<font color="#800080">'Confirm;Ignore;Do Nothing'</font>,<font color="#800080">'2;1;0'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;4&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Spam Event Gifts&quot;</font>;\par
                              oHr = <b>document</b>.createElement(<font color="#800080">'hr'</font>);\par
                            oTh.appendChild(oHr);\par
                        oTr.appendChild(oTh);\par
                        oTbody.appendChild(oTr);\par
                            <b>var </b>strKeepX = <font color="#800080">'0'</font>; <b>for </b>(<b>var </b>x=1; x&lt;61; x++) strKeepX = x + <font color="#800080">';' </font>+ strKeepX;\par
                            <b>for </b>(<b>var name in </b>spamItems) \{\par
                                oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                                    createDropDownList(oTr, <b>name</b>,spamItems[<b>name</b>].<b>text</b>,<font color="#800080">'Confirm-KeepX;Confirm-All;Ignore;Do Nothing'</font>,<font color="#800080">'3;2;1;0'</font>);\par
                                    createDropDownList(oTr, <b>name</b>+<font color="#800080">'keepx'</font>,<font color="#800080">'KeepX'</font>,strKeepX,strKeepX);\par
                                    oTbody.appendChild(oTr);\par
                            \}\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;4&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Mission Settings (Request and Wall)&quot;</font>;\par
                              oHr = <b>document</b>.createElement(<font color="#800080">'hr'</font>);\par
                          oTh.appendChild(oHr);\par
                        oTr.appendChild(oTh);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 2021,<font color="#800080">'Request Mission'</font>,<font color="#800080">'Confirm;Ignore;Do Nothing'</font>,<font color="#800080">'2;1;0'</font>);\par
                        createDropDownList(oTr, 2022,<font color="#800080">'Wall Mission'</font>,<font color="#800080">'Confirm;Do Nothing'</font>,<font color="#800080">'2;0'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 2023,<font color="#800080">'Type'</font>,<font color="#800080">'Energy;Stamina;Both'</font>,<font color="#800080">'energy;stamina;both'</font>);\par
                    oTbody.appendChild(oTr);\par
                        <b>var </b>strMReq = <font color="#800080">'0'</font>; <b>for </b>(<b>var </b>x=1; x&lt;1000; x++) strMReq = strMReq + <font color="#800080">';'</font>+x;\par
                        oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 2030,<font color="#800080">'Min Energy'</font>,strMReq,strMReq);\par
                        createDropDownList(oTr, 2031,<font color="#800080">'Min Stamina'</font>,strMReq,strMReq);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 2026,<font color="#800080">'Max Open Slots'</font>,<font color="#800080">'1;2;3;4;5;6;7'</font>,<font color="#800080">'1;2;3;4;5;6;7'</font>);\par
                        createDropDownList(oTr, 2027,<font color="#800080">'ReQueue'</font>,<font color="#800080">'Yes;No'</font>,<font color="#800080">'true;false'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;1&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Operations&quot;</font>;\par
                        oTr.appendChild(oTh);\par
                        createCheckBoxList(oTr,MW_SecretMissions);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;4&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Wall Settings&quot;</font>;\par
                              oHr = <b>document</b>.createElement(<font color="#800080">'hr'</font>);\par
                          oTh.appendChild(oHr);\par
                        oTr.appendChild(oTh);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;1&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;General Settings&quot;</font>;\par
                        oTr.appendChild(oTh);\par
                        createCheckBoxList(oTr,MW_general);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;1&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Stashes to Collect&quot;</font>;\par
                        oTr.appendChild(oTh);\par
                        createCheckBoxList(oTr,MW_StashList);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;1&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;War Rewards to Collect&quot;</font>;\par
                        oTr.appendChild(oTh);\par
                        createCheckBoxList(oTr,MW_WarList);\par
                    oTbody.appendChild(oTr);\par
                oTable.appendChild(oTbody);\par
            oForm.appendChild(oTable);\par
        oDom.appendChild(oForm);\par
        <b>return </b>oDom;\par
    \}\par
\par
    <b>function </b>CreateFarmVilleTab(_id) \{\par
        <b>var </b>oDom, oForm, oTable, oTbody, oTr, oTh, oTd ;\par
        oDom = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
        <b>if </b>(_id==0) \{\par
            oDom.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(&quot;http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/fbaa/psfbaa_bg.jpg&quot;); width: 480px; height: 300px;'</font>);\par
        \} <b>else </b>\{\par
            oDom.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(&quot;http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/fbaa/psfbaa_bg.jpg&quot;); width: 480px; height: 300px;'</font>);\par
        \}\par
        oDom.id = strFBAASetDivs+_id;\par
            oForm = <b>document</b>.createElement(<font color="#800080">'form'</font>);\par
                oForm.<b>name </b>= <font color="#800080">'FBAA-Form'</font>+_id;\par
                <i>// create layout;\par
                </i>oTable = <b>document</b>.createElement(<font color="#800080">'table'</font>);\par
                oTable.setAttribute(<font color="#800080">'width'</font>,<font color="#800080">'100%'</font>);\par
                    oTbody = <b>document</b>.createElement(<font color="#800080">'tbody'</font>);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;4&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Request Settings&quot;</font>;\par
                        oTr.appendChild(oTh);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 3000,<font color="#800080">'Accept Gifts'</font>,<font color="#800080">'Confirm x2;Confirm x1;Ignore;Do Nothing'</font>,<font color="#800080">'3;2;1;0'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 3001,<font color="#800080">'Send Gifts'</font>,<font color="#800080">'Confirm;Ignore;Do Nothing'</font>,<font color="#800080">'2;1;0'</font>);\par
                        createDropDownList(oTr, 3002,<font color="#800080">'Reward'</font>,<font color="#800080">'No Reward'</font>,<font color="#800080">'1'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 3004,<font color="#800080">'Claim Bonus'</font>,<font color="#800080">'Confirm;Ignore;Do Nothing'</font>,<font color="#800080">'2;1;0'</font>);\par
                        createDropDownList(oTr, 3005,<font color="#800080">'Reward'</font>,<font color="#800080">'10x Stable Parts;3x Puppy Kibble;10x Spring Eggs'</font>,<font color="#800080">'1;2;3'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 3003,<font color="#800080">'Join'</font>,<font color="#800080">'Confirm;Ignore;Do Nothing'</font>,<font color="#800080">'2;1;0'</font>);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;4&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Wall Settings&quot;</font>;\par
                        oTr.appendChild(oTh);\par
                    oTbody.appendChild(oTr);\par
                oTable.appendChild(oTbody);\par
                       oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;1&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;General Settings&quot;</font>;\par
                        oTr.appendChild(oTh);\par
                        createCheckBoxList(oTr,FV_general);\par
                    oTbody.appendChild(oTr);\par
               oTable.appendChild(oTbody);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;1&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Hatch an Egg&quot;</font>;\par
                        oTr.appendChild(oTh);\par
                        createCheckBoxList(oTr,FV_eggs);\par
                    oTbody.appendChild(oTr);\par
                oTable.appendChild(oTbody);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;1&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Bouquet or Perfect Bunch&quot;</font>;\par
                        oTr.appendChild(oTh);\par
                        createCheckBoxList(oTr,FV_flowers);\par
                    oTbody.appendChild(oTr);\par
                oTable.appendChild(oTbody);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;1&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Adopt an Animal&quot;</font>;\par
                        oTr.appendChild(oTh);\par
                        createCheckBoxList(oTr,FV_animals);\par
                    oTbody.appendChild(oTr);\par
                oTable.appendChild(oTbody);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;1&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Get a Bushel&quot;</font>;\par
                        oTr.appendChild(oTh);\par
                        createCheckBoxList(oTr,FV_bushels);\par
                    oTbody.appendChild(oTr);\par
                oTable.appendChild(oTbody);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;1&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Find a Collectable&quot;</font>;\par
                        oTr.appendChild(oTh);\par
                        createCheckBoxList(oTr,FV_collectables);\par
                    oTbody.appendChild(oTr);\par
                oTable.appendChild(oTbody);\par
                    oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;1&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Decoration and Building Materials&quot;</font>;\par
                        oTr.appendChild(oTh);\par
                        createCheckBoxList(oTr,FV_decorations);\par
                    oTbody.appendChild(oTr);\par
                oTable.appendChild(oTbody);\par
            oForm.appendChild(oTable);\par
        oDom.appendChild(oForm);\par
        <b>return </b>oDom;\par
    \}\par
\par
    <b>function </b>CreateOtherTab(_id) \{\par
        <b>var </b>oDom, oForm, oTable, oTbody, oTr, oTh, oTd ;\par
        oDom = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
        <b>if </b>(_id==0) \{\par
            oDom.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(&quot;http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/fbaa/psfbaa_bg.jpg&quot;); width: 480px; height: 300px;'</font>);\par
        \} <b>else </b>\{\par
            oDom.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(&quot;http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/fbaa/psfbaa_bg.jpg&quot;); width: 480px; height: 300px;'</font>);\par
        \}\par
        oDom.id = strFBAASetDivs+_id;\par
            oForm = <b>document</b>.createElement(<font color="#800080">'form'</font>);\par
                oForm.<b>name </b>= <font color="#800080">'FBAA-Form'</font>+_id;\par
\par
                <i>// create layout;\par
                </i>oTable = <b>document</b>.createElement(<font color="#800080">'table'</font>);\par
                oTable.setAttribute(<font color="#800080">'width'</font>,<font color="#800080">'100%'</font>);\par
                    oTbody = <b>document</b>.createElement(<font color="#800080">'tbody'</font>);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                            oTh = <b>document</b>.createElement(<font color="#800080">'th'</font>);\par
                            oTh.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">&quot;&quot;</font>);\par
                            oTh.setAttribute(<font color="#800080">'colspan'</font>,<font color="#800080">&quot;4&quot;</font>);\par
                            oTh.textContent = <font color="#800080">&quot;Request Settings&quot;</font>;\par
                        oTr.appendChild(oTh);\par
                    oTbody.appendChild(oTr);\par
                        oTr = <b>document</b>.createElement(<font color="#800080">'tr'</font>);\par
                        createDropDownList(oTr, 4000,<font color="#800080">'Everyting'</font>,<font color="#800080">'Ignore;Do Nothing'</font>,<font color="#800080">'1;0'</font>);\par
                    oTbody.appendChild(oTr);\par
                oTable.appendChild(oTbody);\par
\par
            oForm.appendChild(oTable);\par
        oDom.appendChild(oForm);\par
        <b>return </b>oDom;\par
    \}\par
\par
\}\par
\par
<b>function </b>LogPush(_strTemp) \{\par
  <b>var </b>oDiv;\par
  oDiv = <b>document</b>.createElement(<font color="#800080">'div'</font>);\par
  oDiv.setAttribute(<font color="#800080">'style'</font>,<font color="#800080">'padding-bottom: 4px'</font>);\par
  oDiv.innerHTML = getCalendarDate()+<font color="#800080">', '</font>+getClockTime()+<font color="#800080">': '</font>+_strTemp;\par
  oLogDiv.insertBefore(oDiv,oLogDiv.firstChild);\par
  <b>while </b>(oLogDiv.childNodes.<b>length</b>&gt;aParams[4]) \{\par
  <i>//GM_log('removing node');\par
    </i>oLogDiv.removeChild(oLogDiv.lastChild);\par
  \}\par
  GM_setValue(<font color="#800080">'LogDiv'</font>,oLogDiv.innerHTML);\par
\}\par
\par
<i>/**** Main Loop ****/\par
</i><b>function </b>MainLoop()\{\par
  <b>if </b>(!bInitialized) \{\par
    <b>if </b>(<b>document</b>.getElementById(<font color="#800080">'login_form'</font>)==null) \{\par
      <i>// start things up once they are logged into facebook;\par
      </i>bInitialized = true;\par
      Initialize();\par
    \}\par
  \} <b>else </b>\{\par
    <i>// get the facebook SVN_rev number\par
    </i>gvar.svn_rev = getSVNRev();\par
    <b>if </b>(<b>document</b>.getElementById(<font color="#800080">'login_form'</font>)!=null) \{\par
      <i>// they've logged out of facebook\par
      </i>StopProcessing();\par
      bInitialized = false;\par
    \} <b>else if </b>(<b>document</b>.getElementById(<font color="#800080">'contentCol'</font>) != null ) \{\par
      createDisplay();\par
    \} <b>else </b>\{\par
      GM_log(<font color="#800080">'Ignore this Window'</font>);\par
    \}\par
  \}\par
\}\par
\par
<i>/**** DOM Notify and Change Code ****/\par
</i><b>function </b>notifyChange() \{\par
  <b>if </b>(notify_count == change_count) MainLoop();\par
  <b>if </b>(notify_count != change_count) \{\par
    schedNotify();\par
    <b>return</b>;\par
  \}\par
  scheduled = false;\par
\}\par
\par
<b>function </b>schedNotify() \{\par
  scheduled = true;\par
  notify_count = change_count;\par
  iOnloadEvent = <b>setTimeout</b>(<b>function </b>(e) \{\par
    notifyChange();\par
  \},\par
  250);\par
\}\par
\par
<i>/**** Start Main Code ****/\par
</i><b>function </b>track_Analytics()\{\par
  <b>var </b>newScript = <font color="#800080">'try \{ var pageTracker = _gat._getTracker(&quot;UA-3078135-15&quot;); pageTracker._trackPageview(); \} catch(err) \{ \}'</font>;\par
  makeElement(<font color="#800080">'script'</font>, <b>document</b>.getElementsByTagName(<font color="#800080">'head'</font>)[0], \{<font color="#800080">'type'</font>:<font color="#800080">'text/javascript'</font>\}).appendChild(<b>document</b>.createTextNode(newScript));\par
\}\par
\par
<b>function </b>build_Analytics()\{\par
  <b>function </b>GM_wait() \{\par
    <b>if</b>(typeof unsafeWindow._gat == <font color="#800080">'undefined'</font>) \{ <b>window</b>.<b>setTimeout</b>(GM_wait,250); \}\par
    <b>else </b>\{ track_Analytics(); \}\par
  \}\par
\par
  <b>if</b>(!<b>document</b>.getElementById(<font color="#800080">'mwapAnalytics'</font>))\{\par
    <b>var </b>gaJsHost = ((<font color="#800080">'https:' </font>== <b>document</b>.<b>location</b>.<b>protocol</b>) <font color="#800080">? 'https://ssl.' </font>: <font color="#800080">'http://www.'</font>);\par
    <b>var </b>newScript = gaJsHost + <font color="#800080">'google-analytics.com/ga.js'</font>;\par
    <b>var </b>extElt = makeElement(<font color="#800080">'script'</font>, <b>document</b>.getElementsByTagName(<font color="#800080">'head'</font>)[0], \{<font color="#800080">'id'</font>:<font color="#800080">'mwapAnalytics'</font>, <font color="#800080">'type'</font>:<font color="#800080">'text/javascript'</font>\});\par
    extElt.<b>src </b>= newScript;\par
    extElt.id = <font color="#800080">'mwapAnalytics'</font>;\par
    GM_wait();\par
  \}\par
\}\par
\par
<i>// FB and MW Detection\par
// We are only worried about the URL detection because of the excludes\par
</i><b>if </b>(<b>self</b>.<b>location</b>.<b>href</b>.<b>indexOf</b>(<font color="#800080">'www.facebook.com'</font>)!=-1) \{\par
  strFrameId  = <font color="#800080">'FaceBook'</font>;\par
\} <b>else </b>\{\par
  strFrameId  = <font color="#800080">'MafiaWars'</font>;\par
\}\par
bInitialized = false;\par
build_Analytics();\par
<i>// add event listners for load and unload\par
</i><b>if </b>( strFrameId == <font color="#800080">&quot;FaceBook&quot;</font>) \{\par
  <b>document</b>.addEventListener(<font color="#800080">&quot;DOMNodeInserted&quot;</font>, <b>function </b>(e) \{\par
    change_count++;\par
    <b>if </b>(!scheduled &amp;&amp; change_count &gt; 2 ) schedNotify();\par
  \},\par
  false);\par
  <b>window</b>.addEventListener(<font color="#800080">&quot;unload&quot;</font>, <b>function </b>(e) \{\par
    try \{\par
      bAutoRun = false;\par
      <b>clearTimeout</b>(iRespectCurrent);\par
      <b>clearTimeout</b>(iRequestCurrent);\par
      <b>clearTimeout</b>(iWallCurrent);\par
      <b>clearTimeout</b>(iMW_XW_Timer);\par
      <b>clearTimeout</b>(iFB_XW_Timer);\par
      GM_log(<font color="#800080">'Scripts are unloading.  Frame = '</font>+strFrameId);\par
    \} catch(_errObj) \{\par
      GM_log(<font color="#800080">'Something bad has happend - '</font>+_errObj.message);\par
    \}\par
  \},\par
  false);\par
\} <b>else </b>\{\par
\par
  <i>// for MW window when it opens\par
  </i>Initialize();\par
\}\par
\par
<i>/**** xw_sig Update Routines ****/\par
</i><b>function </b>FB_xw_sig_update(_val) \{\par
  <b>function </b>doStep1(_myUrl, _myParms) \{\par
    <b>var </b>iCurrentJob, iWatchDog;\par
    GM_log(<font color="#800080">'FB_xw_sig_update doStep 1'</font>);\par
    <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
    </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); \}, 15000);\par
    iCurrentJob = GM_xmlhttpRequest(\{\par
      <b>method</b>: <font color="#800080">'GET'</font>,\par
      url: _myUrl,\par
      headers: \{\par
        <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
        <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
      </font>\},\par
      onload: <b>function</b>(_responseDetails) \{\par
        try \{\par
          <b>clearTimeout</b>(iWatchDog);\par
          <b>if </b>(_responseDetails.<b>status </b>!= 200) throw(<font color="#800080">'Status 200 error'</font>);\par
          <b>var </b>param = doFBParse(_responseDetails.responseText);\par
          doStep2(param[0],param[1]);\par
        \} catch(err) \{\par
          GM_log(<font color="#800080">'Error FB_xw_sig_update: do Step 1 - '</font>+err.message);\par
          LogPush(<font color="#800080">'Cannot Update Mafia Wars credentials 1&lt;br&gt;Attempting again in 5 minutes'</font>);\par
          xw_sig_valid  = false;\par
          local_xw_time = 0;\par
        \}\par
      \}\par
    \});\par
  \}\par
\par
  <b>function </b>doStep1a(_myUrl, _myParms) \{\par
    <b>var </b>iCurrentJob, iWatchDog;\par
    GM_log(<font color="#800080">'FB_xw_sig_update doStep 1a'</font>);\par
    <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
    </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); \}, 15000);\par
    iCurrentJob = GM_xmlhttpRequest(\{\par
      <b>method</b>: <font color="#800080">'GET'</font>,\par
      url: _myUrl,\par
      headers: \{\par
        <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
        <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'\par
      </font>\},\par
      onload: <b>function</b>(_responseDetails) \{\par
        try \{\par
          <b>var </b>i1, i2, myUrl, myParms;\par
          <b>var </b>strTemp;\par
          <b>var </b>strDetails;\par
\par
          <b>clearTimeout</b>(iWatchDog);\par
\par
          <b>if </b>(_responseDetails.<b>status </b>!= 200) throw \{message:<font color="#800080">&quot;HTML Page was not read correctly.&quot;</font>\};\par
          strTemp = _responseDetails.responseText;\par
          i1 = strTemp.<b>indexOf</b>(<font color="#800080">'document.location.replace(&quot;'</font>);\par
          <b>if </b>(i1 == -1) \{ GM_log(strTemp); throw \{message:<font color="#800080">'Cannot find document.location.replace'</font>\};\}\par
          i1 += 27;\par
          i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
          <b>eval</b>(<font color="#800080">&quot;myUrl = &quot; </font>+ strTemp.slice(i1-1,i2+1));\par
          doStep2(myUrl,<font color="#800080">''</font>);\par
        \} catch(err) \{\par
          GM_log(<font color="#800080">'Error: FB_xw_sig_update DoStep 1a - '</font>+err.message);\par
          NextRequest(aParams[0],aParams[1]);\par
        \}\par
      \}\par
    \});\par
  \}\par
\par
  <b>function </b>doStep2(_myUrl, _myParms) \{\par
    <b>var </b>iCurrentJob, iWatchDog;\par
    GM_log(<font color="#800080">'FB_xw_sig_update doStep2'</font>);\par
    <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
    </i>iWatchDog = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); \}, 15000);\par
    iCurrentJob = GM_xmlhttpRequest(\{\par
      <b>method</b>: <font color="#800080">'POST'</font>,\par
      url: _myUrl,\par
      data: _myParms,\par
      headers: \{\par
        <font color="#800080">'Accept'</font>: <font color="#800080">'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'</font>,\par
        <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
        <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'\par
      </font>\},\par
      onload: <b>function</b>(_responseDetails) \{\par
        try \{\par
          <b>var </b>i1, i2, strTemp;\par
\par
          <b>clearTimeout</b>(iWatchDog);\par
\par
          <b>if </b>(_responseDetails.<b>status </b>!= 200) throw(<font color="#800080">'Status 200 error'</font>);\par
          strTemp = _responseDetails.responseText;\par
          i1 = strTemp.<b>indexOf</b>(<font color="#800080">'name=&quot;sf_xw_user_id&quot;'</font>);\par
          <b>if </b>(i1==-1) throw (<font color="#800080">'cannot find sf_xw_user_id'</font>);\par
          i1 = strTemp.<b>indexOf</b>(<font color="#800080">'value=&quot;'</font>,i1)+7;\par
          i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
          local_xw_user_id = strTemp.slice(i1,i2);\par
          i1 = strTemp.<b>indexOf</b>(<font color="#800080">'name=&quot;sf_xw_sig&quot;'</font>);\par
          <b>if </b>(i1==-1) throw (<font color="#800080">'cannot find sf_xw_sig'</font>);\par
          i1 = strTemp.<b>indexOf</b>(<font color="#800080">'value=&quot;'</font>,i1)+7;\par
          i2 = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
          local_xw_sig  = strTemp.slice(i1,i2);\par
          local_xw_time = getCurrentTime();\par
          xw_sig_valid  = true;\par
          GM_log(<font color="#800080">'local_xw_sig = '</font>+local_xw_sig+<font color="#800080">', local_xw_user_id = '</font>+local_xw_user_id+<font color="#800080">', local_xw_time = '</font>+local_xw_time);\par
          LogPush(<font color="#800080">'&lt;font style=&quot;color: rgb(89, 152, 59);&quot;&gt;&lt;b&gt;Mafia Wars credentials have been successfully renewed.&lt;/b&gt;&lt;/font&gt;'</font>);\par
        \} catch(err) \{\par
          GM_log(<font color="#800080">'Error FB_xw_sig_update: do Step 2 - '</font>+err.message);\par
          LogPush(<font color="#800080">'&lt;font style=&quot;color: rgb(152, 89, 59);&quot;&gt;&lt;b&gt;Cannot Update Mafia Wars credentials 2&lt;br&gt;Attempting again in 5 minutes.&lt;/b&gt;&lt;/font&gt;'</font>);\par
          xw_sig_valid  = false;\par
          local_xw_time = 0;\par
        \}\par
      \}\par
    \});\par
  \}\par
\par
  <b>function </b>doStep10(myUrl, myParms) \{\par
    <b>var </b>iCurrentJob, iWatchDog;\par
    <i>// start the WatchDog Timer to catch hung requests. 15 seconds.\par
    </i>iWatchDog   = <b>setTimeout</b>(<b>function </b>(e) \{ iCurrentJob.abort(); \}, 15000);\par
    iCurrentJob = GM_xmlhttpRequest(\{\par
      <b>method</b>: <font color="#800080">'POST'</font>,\par
      url: myUrl,\par
      data: myParms,\par
      headers: \{\par
        <font color="#800080">'Content-Type'</font>: <font color="#800080">'application/x-www-form-urlencoded'</font>,\par
        <font color="#800080">'Accept'</font>: <font color="#800080">'*/*'</font>,\par
        <font color="#800080">'Accept-Language'</font>: <font color="#800080">'en-us,en;q=0.5'</font>,\par
        <font color="#800080">'X-Requested-With'</font>:<font color="#800080">'XMLHttpRequest'\par
      </font>\},\par
      onload: <b>function</b>(_responseDetails) \{\par
        <b>var </b>strTemp;\par
        <b>var </b>i1, i2;\par
        <b>clearTimeout</b>(iWatchDog);\par
        strTemp = _responseDetails.responseText;\par
      <i>//GM_log('Xerye 10 = '+strTemp.slice(0,50));\par
        </i><b>if </b>(_responseDetails.<b>status </b>== 200) \{\par
          <b>if </b>(strTemp.<b>indexOf</b>(<font color="#800080">'local_xw_sig'</font>) != -1) \{\par
            i1 = strTemp.<b>indexOf</b>(<font color="#800080">'local_xw_sig'</font>);\par
            i2 = strTemp.<b>indexOf</b>(<font color="#800080">&quot;';&quot;</font>,i1);\par
            local_xw_sig  = strTemp.slice(i1+16,i2);\par
            local_xw_time = getCurrentTime();\par
            xw_sig_valid  = true;\par
            GM_log(<font color="#800080">'local_xw_sig = '</font>+local_xw_sig+<font color="#800080">', local_xw_user_id = '</font>+local_xw_user_id+<font color="#800080">', local_xw_time = '</font>+local_xw_time);\par
          \} <b>else </b>\{\par
            xw_sig_valid  = false;\par
            local_xw_time = 0;\par
            GM_log(<font color="#800080">'Error renewing XW_SIG'</font>);\par
          \}\par
        \} <b>else </b>\{\par
          xw_sig_valid  = false;\par
          local_xw_time = 0;\par
          GM_log(<font color="#800080">'Error renewing XW_SIG'</font>);\par
        \}\par
      \}\par
    \});\par
  \}\par
  <i>// doStep1 and doStep2 will get a brand new set of credentials\par
  // dostep10 will renew the credentials\par
\par
  </i><b>function </b>doDone() \{\par
      <i>// in FF this is empty.\par
  </i>\}\par
  GM_log(<font color="#800080">'FF UPDATE - xw_sig_update'</font>);\par
  <b>var </b>iHoldEvent, myUrl, myParms;\par
  <i>// check the age of the xw_sig\par
  </i><b>if </b>(((getCurrentTime()-local_xw_time) &gt; 10) || (local_xw_user_id==<font color="#800080">''</font>)) \{\par
    myUrl   = <font color="#800080">'http://apps.facebook.com/inthemafia/?zy_link=appage'</font>;\par
  <i>//myUrl   = 'http://apps.facebook.com/inthemafia/?zy_link=appage&amp;ref=bookmarks';\par
    </i>myParms = <font color="#800080">''</font>;\par
    LogPush(<font color="#800080">'&lt;b&gt;Mafia Wars credentials are out of date. Attempting to refresh&lt;/b&gt;'</font>);\par
    GM_log(<font color="#800080">'FB_xw_sig_update: Attempting to get a new set of MW Credentials'</font>);\par
    doStep1(myUrl, myParms);\par
  \} <b>else </b>\{\par
    myUrl   = <font color="#800080">'http://facebook.mafiawars.zynga.com/mwfb/sf_updater.php'</font>;\par
    myParms = <font color="#800080">'sf_xw_user_id='</font>+<b>escape</b>(local_xw_user_id)+<font color="#800080">'&amp;sf_xw_sig='</font>+local_xw_sig+<font color="#800080">'&amp;skip_req_frame=1'</font>;\par
    LogPush(<font color="#800080">'&lt;b&gt;Updating Mafia Wars credentials.&lt;/b&gt;'</font>);\par
    GM_log(<font color="#800080">'FB_xw_sig_update: Attempting to renew set of MW Credentials'</font>);\par
    doStep10(myUrl, myParms);\par
  \}\par
\}\par
\par
<i>/**** Utility functions ****/\par
// gets the current timestamp in minutes\par
</i><b>function </b>getCurrentTime() \{\par
  <i>// returns time in minutes\par
  </i><b>return Math</b>.<b>round</b>(<b>new Date</b>().<b>getTime</b>()/1000/60);\par
\}\par
\par
<i>// gets a random num within a range\par
</i><b>function </b>getRandRange(_iLow, _iHigh) \{\par
  <b>return Math</b>.<b>floor</b>((_iHigh - _iLow)*<b>Math</b>.<b>random</b>())+_iLow;\par
\}\par
\par
<i>// get a Snapshot based on an XPath\par
</i><b>function </b>getSnapshot(_strPattern,_doc) \{\par
  <i>// default is document if _doc is not provided\par
  </i><b>return document</b>.evaluate(_strPattern, (_doc===undefined<font color="#800080">?</font><b>document</b>:_doc), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);\par
\}\par
\par
<i>// remove special characters from strings\par
</i><b>function </b>codeStrings(_str) \{\par
  <b>var </b>strTemp = _str;\par
  strTemp= strTemp.<b>replace</b>(/<font color="#800080">\\</font>s/g, <font color="#800080">'%20'</font>);\par
  strTemp= strTemp.<b>replace</b>(/:/g,  <font color="#800080">'%3A'</font>);\par
  strTemp= strTemp.<b>replace</b>(/<font color="#800080">\\</font><i>//g, '%2F');\par
  </i>strTemp= strTemp.<b>replace</b>(/<font color="#800080">\\?</font>/g, <font color="#800080">'%3F'</font>);\par
  strTemp= strTemp.<b>replace</b>(/=/g,  <font color="#800080">'%3D'</font>);\par
  strTemp= strTemp.<b>replace</b>(/&amp;/g,  <font color="#800080">'%26'</font>);\par
  strTemp= strTemp.<b>replace</b>(/,/g,  <font color="#800080">'%2C'</font>);\par
\par
  <b>return </b>strTemp;\par
\}\par
\par
<b>function </b>decodeStrings(_str) \{\par
  <b>var </b>strTemp = _str;\par
  strTemp= strTemp.<b>replace</b>(/%20/g, <font color="#800080">' '</font>);\par
  strTemp= strTemp.<b>replace</b>(/%22/g, <font color="#800080">'&quot;'</font>);\par
  strTemp= strTemp.<b>replace</b>(/%25/g, <font color="#800080">'%'</font>);\par
  strTemp= strTemp.<b>replace</b>(/%26/g, <font color="#800080">'&amp;'</font>);\par
  strTemp= strTemp.<b>replace</b>(/%2C/g, <font color="#800080">','</font>);\par
  strTemp= strTemp.<b>replace</b>(/%2F/g, <font color="#800080">'/'</font>);\par
  strTemp= strTemp.<b>replace</b>(/%3A/g, <font color="#800080">':'</font>);\par
  strTemp= strTemp.<b>replace</b>(/%3D/g, <font color="#800080">'='</font>);\par
  strTemp= strTemp.<b>replace</b>(/%3F/g, <font color="#800080">'?'</font>);\par
  strTemp= strTemp.<b>replace</b>(/%5B/g, <font color="#800080">'['</font>);\par
  strTemp= strTemp.<b>replace</b>(/%5D/g, <font color="#800080">']'</font>);\par
  strTemp= strTemp.<b>replace</b>(/%7B/g, <font color="#800080">'\{'</font>);\par
  strTemp= strTemp.<b>replace</b>(/%7D/g, <font color="#800080">'\}'</font>);\par
  <b>return </b>strTemp;\par
\}\par
\par
<b>function </b>getCalendarDate() \{\par
  <b>var </b>months = <b>new Array</b>(<font color="#800080">&quot;Jan&quot;</font>,<font color="#800080">&quot;Feb&quot;</font>,<font color="#800080">&quot;Mar&quot;</font>,<font color="#800080">&quot;Apr&quot;</font>,<font color="#800080">&quot;May&quot;</font>,<font color="#800080">&quot;Jun&quot;</font>,<font color="#800080">&quot;Jul&quot;</font>,<font color="#800080">&quot;Aug&quot;</font>,<font color="#800080">&quot;Sep&quot;</font>,<font color="#800080">&quot;Oct&quot;</font>,<font color="#800080">&quot;Nov&quot;</font>,<font color="#800080">&quot;Dec&quot;</font>);\par
  <b>var </b>now         = <b>new Date</b>();\par
  <b>var </b>monthnumber = now.<b>getMonth</b>();\par
  <b>var </b>monthname   = months[monthnumber];\par
  <b>var </b>monthday    = now.<b>getDate</b>();\par
  <b>var </b>year        = now.<b>getYear</b>();\par
  <b>if</b>(year &lt; 2000) \{ year = year + 1900; \}\par
  <b>var </b>dateString = monthname + <font color="#800080">' ' </font>+  monthday;\par
  <b>return </b>dateString;\par
\}\par
\par
<b>function </b>getClockTime() \{\par
  <b>var </b>now    = <b>new Date</b>();\par
  <b>var </b>hour   = now.<b>getHours</b>();\par
  <b>var </b>minute = now.<b>getMinutes</b>();\par
  <b>var </b>second = now.<b>getSeconds</b>();\par
  <b>var </b>ap = <font color="#800080">&quot;AM&quot;</font>;\par
  <b>if </b>(hour   &gt; 11) \{ ap = <font color="#800080">&quot;PM&quot;</font>;             \}\par
  <b>if </b>(hour   &gt; 12) \{ hour = hour - 12;      \}\par
  <b>if </b>(hour   == 0) \{ hour = 12;             \}\par
  <b>if </b>(hour   &lt; 10) \{ hour   = <font color="#800080">&quot;0&quot; </font>+ hour;   \}\par
  <b>if </b>(minute &lt; 10) \{ minute = <font color="#800080">&quot;0&quot; </font>+ minute; \}\par
  <b>if </b>(second &lt; 10) \{ second = <font color="#800080">&quot;0&quot; </font>+ second; \}\par
  <b>var </b>timeString = hour + <font color="#800080">':' </font>+ minute + <font color="#800080">':' </font>+ second + <font color="#800080">&quot; &quot; </font>+ ap;\par
  <b>return </b>timeString;\par
\}\par
\par
<b>function </b>requestName(_strTemp) \{\par
  <b>var </b>i,j;\par
  j = 0;\par
  <b>for </b>(i=0;i&lt;3;i++) j=_strTemp.<b>indexOf</b>(<font color="#800080">' '</font>,j)+1;\par
  <b>return </b>_strTemp.slice(j,j+1).<b>toUpperCase</b>() +  _strTemp.slice(j+1);\par
\}\par
\par
<i>// Retreive the Facebook ID\par
</i><b>function </b>getFBID() \{\par
  <b>var </b>oSnapShot, strText;\par
  <b>var </b>i1, i2;\par
  oSnapShot = getSnapshot(<font color="#800080">'//script[contains(text(),&quot;Env&quot;)]'</font>);\par
  <b>if </b>(oSnapShot.snapshotLength != 0) \{\par
    strText = oSnapShot.snapshotItem(0).innerHTML;\par
    i1 = strText.<b>indexOf</b>(<font color="#800080">'\{user:'</font>) + 6;\par
    <b>if </b>(i1!=-1) \{\par
      i2 = strText.<b>indexOf</b>(<font color="#800080">','</font>,i1);\par
      <b>return </b>strText.slice(i1,i2);\par
    \} <b>else </b>\{\par
      <b>return </b>strText;\par
    \}\par
  \} <b>else </b>\{\par
    <b>return </b>strText;\par
  \}\par
\}\par
\par
<b>function </b>getSVNRev() \{\par
  <b>var </b>oSnapShot, strText;\par
  <b>var </b>i1, i2;\par
  oSnapShot = getSnapshot(<font color="#800080">'//script[contains(text(),&quot;svn&quot;)]'</font>);\par
  <b>if </b>(oSnapShot.snapshotLength != 0) \{\par
    strTemp = oSnapShot.snapshotItem(0).<b>text</b>;\par
    i1 = strTemp.<b>indexOf</b>(<font color="#800080">'svn_rev:'</font>);\par
    <b>if </b>(i1!=-1) \{\par
      i2 = strTemp.<b>indexOf</b>(<font color="#800080">&quot;,&quot;</font>,i1);\par
      <b>return </b>strTemp.slice(i1+8,i2);\par
    \} <b>else </b>\{\par
      <b>return </b>strText;\par
    \}\par
  \} <b>else </b>\{\par
    <b>return </b>strText;\par
  \}\par
\}\par
\par
<b>function </b>getGroupNames()\{\par
  <i>// we are looging to build this\par
  // &amp;params[lists]=[%22100423413310424%3AMafia%20Wars%22]\par
  // &quot;100423413310424=Mafia Wars&quot;\par
  </i>strGroups = <font color="#800080">'&lt;option value=&quot;0&quot;&gt;-&lt;/option&gt;'</font>;\par
  GM_xmlhttpRequest(\{\par
    url:<font color="#800080">&quot;http://www.facebook.com/friends/edit/&quot;</font>,\par
    <b>method</b>:<font color="#800080">'get'</font>,\par
    onload: <b>function</b>(resp)\{\par
      <b>var </b>i1, i2, i3, i4;\par
      <b>var </b>strTemp, strDiv, strId, strName, strParms;\par
      strTemp = resp.responseText;\par
      <i>// get formID\par
      </i>i1 = strTemp.<b>indexOf</b>(<font color="#800080">'post_form_id:&quot;'</font>);\par
      <b>if </b>(i1!=-1) \{\par
        i1  += 14;\par
        i2   = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
        Post_form_id = strTemp.slice(i1,i2);\par
        i1   = strTemp.<b>indexOf</b>(<font color="#800080">'fb_dtsg:&quot;'</font>,i2);\par
        i1  += 9;\par
        i2   = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
        FB_dtsg = strTemp.slice(i1,i2);\par
      \}\par
      i1 = 0;\par
      do \{\par
        i1 = strTemp.<b>indexOf</b>(<font color="#800080">'id=&quot;navItem_fl_'</font>, i1);\par
        <b>if </b>(i1!= -1) \{\par
          i1     += 15;\par
          i2      = strTemp.<b>indexOf</b>(<font color="#800080">'&quot;'</font>,i1);\par
          strId   = strTemp.slice(i1,i2);\par
          i1      = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;div class=&quot;linkWrap noCount&quot;&gt;'</font>,i2);\par
          i2      = strTemp.<b>indexOf</b>(<font color="#800080">'&lt;span'</font>,i1+30);\par
          strName = strTemp.slice(i1+30,i2);\par
          GM_log(<font color="#800080">&quot;strId: &quot; </font>+ strId + <font color="#800080">&quot; strName: &quot; </font>+ strName);\par
          strGroups += <font color="#800080">'&lt;option value=&quot;'</font>+ strId + <font color="#800080">'&quot;&gt;'</font>+strName+<font color="#800080">'&lt;/option&gt;'</font>;\par
          i1=i2;\par
        \}\par
      \} <b>while </b>(i1 != -1);\par
      <i>// reset the selected group in saved parameter if it does not exsist.\par
      </i><b>if </b>(strGroups.<b>indexOf</b>(aParams[1001]) == -1) aParams[1001] = 0;\par
      <b>if </b>(strGroups.<b>indexOf</b>(aParams[1003]) == -1) aParams[1003] = 0;\par
      <i>// try to update display\par
      </i>oForm = <b>document</b>.<b>forms</b>.namedItem(<font color="#800080">'FBAA-Form1'</font>);\par
      <b>if </b>(oForm != null) \{\par
        oForm.<b>elements</b>.namedItem(<font color="#800080">'FBAA-Para-1001'</font>).innerHTML = strGroups;\par
        oForm.<b>elements</b>.namedItem(<font color="#800080">'FBAA-Para-1001'</font>).<b>value </b>= aParams[1001];\par
        oForm.<b>elements</b>.namedItem(<font color="#800080">'FBAA-Para-1003'</font>).innerHTML = strGroups;\par
        oForm.<b>elements</b>.namedItem(<font color="#800080">'FBAA-Para-1003'</font>).<b>value </b>= aParams[1003];\par
      \}\par
    \}\par
  \});\par
\}\par
\par
<i>/**** Listner ****/\par
</i><b>function </b>click_MissionQueue() \{\par
  <b>var </b>iNextTry;\par
  <b>for </b>(i=0;i&lt;aMissionRetry[0].<b>length</b>;i++) \{\par
    iNextTry = aMissionRetry[1][i] - getCurrentTime();\par
    LogPush(<font color="#800080">'&lt;b&gt;Mission Queue Slot '</font>+i+<font color="#800080">': '</font>+ aMissionRetry[0][i].AttachmentTitle+<font color="#800080">'&lt;/b&gt; ('</font>+ aMissionRetry[0][i].ActorName +<font color="#800080">') next retry in '</font>+iNextTry+<font color="#800080">' mins'</font>);\par
  \}\par
\}\par
\par
<b>function </b>click_AutoRun(iButton) \{\par
  <b>return function </b>() \{\par
    <b>var </b>oSpan;\par
    GM_log(<font color="#800080">'the following button was pushed ' </font>+ iButton);\par
    <b>if </b>(iButton == 1) \{\par
      <b>document</b>.getElementById(strAutoOn).innerHTML= <font color="#800080">'&lt;b&gt;On&lt;/b&gt;'</font>;\par
      <b>document</b>.getElementById(strAutoOff).innerHTML= <font color="#800080">'&lt;font style=&quot;color: rgb(59, 89, 152); cursor: pointer;&quot;&gt; &lt;a&gt;Off&lt;/a&gt; &lt;/font&gt;'</font>;\par
      <b>if </b>(!bAutoRun)\{\par
        bAutoRun = true;\par
        GM_setValue(<font color="#800080">'bAutoRun'</font>,bAutoRun);\par
        StartProcessing();\par
      \}\par
    \} <b>else </b>\{\par
      <b>document</b>.getElementById(strAutoOff).innerHTML= <font color="#800080">'&lt;b&gt;Off&lt;/b&gt;'</font>;\par
      <b>document</b>.getElementById(strAutoOn).innerHTML= <font color="#800080">'&lt;font style=&quot;color: rgb(59, 89, 152); cursor: pointer;&quot;&gt; &lt;a&gt;On&lt;/a&gt; &lt;/font&gt;'</font>;\par
      bAutoRun = false;\par
      GM_setValue(<font color="#800080">'bAutoRun'</font>,bAutoRun);\par
      StopProcessing();\par
    \}\par
  \}\par
\}\par
\par
<b>function </b>click_ShowSettingsTab(iButton) \{\par
  <b>return function </b>() \{\par
    <b>var </b>oLi, oDiv;\par
    <b>for </b>(<b>var </b>i=0;i&lt;5;i++) \{\par
      oLi = <b>document</b>.getElementById(strFBAASetTabs+i);\par
      oDiv = <b>document</b>.getElementById(strFBAASetDivs+i);\par
      <b>if </b>(i==iButton) \{\par
        oLi.setAttribute(<font color="#800080">'class'</font>,<font color="#800080">'selected'</font>);\par
        oDiv.style.display = <font color="#800080">&quot;&quot;</font>;\par
      \} <b>else </b>\{\par
        oLi.setAttribute(<font color="#800080">'class'</font>,<font color="#800080">''</font>);\par
        oDiv.style.display = <font color="#800080">&quot;none&quot;</font>;\par
      \}\par
    \}\par
  \}\par
\}\par
\par
<b>function </b>click_CloseSettings(iButton) \{\par
  <b>return function </b>() \{\par
    <b>var </b>oForm, oItem;\par
    <b>var </b>oDiv;\par
    <b>if </b>(iButton == 0) \{\par
      <b>for </b>(<b>var </b>i=0;i&lt;5;i++) \{\par
        oForm = <b>document</b>.<b>forms</b>.namedItem(<font color="#800080">'FBAA-Form'</font>+i);\par
        <b>for </b>(<b>var </b>j=0; j&lt;oForm.<b>length</b>; j++) \{\par
          oItem = oForm.<b>elements</b>[j]\par
          <b>if </b>(oItem != undefined ) \{\par
            <b>if </b>(oItem.<b>type </b>== <font color="#800080">'checkbox'</font>) \{\par
              aParams[oItem.<b>name</b>.<b>split</b>(<font color="#800080">'-'</font>)[2]]    = oItem.<b>checked</b>;\par
            \} <b>else </b>\{\par
              aParams[oItem.<b>name</b>.<b>split</b>(<font color="#800080">'-'</font>)[2]]    = oItem.<b>value</b>;\par
            \}\par
          \}\par
        \}\par
      \}\par
      <i>// Bonus type awards where to rewards can vary\par
      </i>aParams[<font color="#800080">'FV_MasteryFriendRewad'</font>]                  = aParams[3050];\par
      aParams[<font color="#800080">'FV_HorseStableFriendReward'</font>]             = aParams[3050];\par
      aParams[<font color="#800080">'FV_FertilizeThankFriendReward'</font>]          = aParams[3050];\par
      aParams[<font color="#800080">'FV_SocialMissionShareBonusFriendReward'</font>] = aParams[3050];\par
      aParams[<font color="#800080">'FV_AchievementFriendReward'</font>]             = aParams[3050];\par
      aParams[<font color="#800080">'FV_TuscanWeddingRedeemFriendReward'</font>]     = aParams[3050];\par
      aParams[<font color="#800080">'FV_TuscanWeddingFriendReward'</font>]           = aParams[3050];\par
      <i>// Wandering Stallion\par
    //aParams['FV_WanderingStallionFriendReward']       = aParams[3055];\par
      </i>aParams[<font color="#800080">'FV_WanderingStallionFriendReward'</font>]       = false;\par
      <i>// Barn Raising\par
      </i>aParams[<font color="#800080">'FV_StorageExpansionFriendReward'</font>]        = aParams[3056];\par
      <i>// Free Fuel\par
      </i>aParams[<font color="#800080">'FV_FuelDiscoveryFriendReward'</font>]           = aParams[3052];\par
      <i>// flowers\par
      </i>aParams[<font color="#800080">'FV_FlowerFriendReward'</font>]                  = false;\par
      <b>for </b>(<b>var </b>id <b>in </b>FV_flowers) <b>if </b>(aParams[id]==true) aParams[<font color="#800080">'FV_FlowerFriendReward'</font>]      = true;\par
      <i>// bushels\par
      </i>aParams[<font color="#800080">'FV_BushelFriendReward'</font>]                  = false;\par
      aParams[<font color="#800080">'FV_StallThankYouFriendReward'</font>]           = false;\par
      <b>for </b>(<b>var </b>id <b>in </b>FV_bushels)\par
        <b>if </b>(aParams[id]==true)  \{\par
          aParams[<font color="#800080">'FV_BushelFriendReward'</font>]              = true;\par
          aParams[<font color="#800080">'FV_StallThankYouFriendReward'</font>]       = true;\par
        \}\par
      <i>// adopt\par
      </i>aParams[<font color="#800080">'FV_lonely_cow'</font>]                          = false;\par
      aParams[<font color="#800080">'FV_FoalFriendReward'</font>]                    = false;\par
      aParams[<font color="#800080">'FV_NurseryBuildingFriendReward'</font>]         = false;\par
      <b>for </b>(<b>var </b>id <b>in </b>FV_animals)\par
      <b>if </b>(aParams[id]==true)  \{\par
        aParams[<font color="#800080">'FV_lonely_cow'</font>]                        = true;\par
        aParams[<font color="#800080">'FV_FoalFriendReward'</font>]                  = true;\par
        aParams[<font color="#800080">'FV_NurseryBuildingFriendReward'</font>]       = true;\par
      \}\par
      <i>// Hatch an Egg\par
      </i>aParams[<font color="#800080">'FV_EggFriendReward'</font>]                     = false;\par
      <b>for </b>(<b>var </b>id <b>in </b>FV_eggs) <b>if </b>(aParams[id]==true) aParams[<font color="#800080">'FV_EggFriendReward'</font>]       = true;\par
      <i>// Collections\par
      </i>aParams[<font color="#800080">'FV_CollectionsFriendReward'</font>]             = false;\par
      <b>for </b>(<b>var </b>id <b>in </b>FV_collectables) <b>if </b>(aParams[id]==true) aParams[<font color="#800080">'FV_CollectionsFriendReward'</font>]   = true;\par
      <i>// Build Supplies\par
      </i>aParams[<font color="#800080">'FV_ConstructionBuildingFriendReward'</font>]    = false;\par
      <b>for </b>(<b>var </b>id <b>in </b>FV_decorations)\par
        <b>if </b>(aParams[id]==true)\{\par
          aParams[<font color="#800080">'FV_ConstructionBuildingFriendReward'</font>]= true;\par
          aParams[<font color="#800080">'FV_TuscanWeddingRedeemFriendReward'</font>] = true;\par
        \}\par
      <b>if </b>(strSaveSet == <font color="#800080">'A'</font>)\par
        strSaveSet = <font color="#800080">'B'</font>;\par
      <b>else\par
        </b>strSaveSet = <font color="#800080">'A'</font>;\par
      GM_setValue(<font color="#800080">'FBAA-Settings-'</font>+strSaveSet, ArraytoString(aParams));\par
      GM_setValue(<font color="#800080">'FBAA-SaveSet'</font>,strSaveSet);\par
      oDiv = <b>document</b>.getElementById(strFBAASettings);\par
      oDiv.style.display=<font color="#800080">&quot;none&quot;</font>;\par
    \} <b>else </b>\{\par
      oDiv = <b>document</b>.getElementById(strFBAASettings);\par
      oDiv.style.display=<font color="#800080">&quot;none&quot;</font>;\par
    \}\par
    <b>if </b>(bAutoRunHold)\{\par
      StartProcessing();\par
    \}\par
  \}\par
\}\par
\par
<b>function </b>click_ShowLog(iButton) \{\par
  <b>return function </b>() \{\par
    <b>var </b>iBC, oButtons, oButton, iButtons, ODOM;\par
    <b>var </b>oSpan;\par
    GM_log(<font color="#800080">'the following button was pushed ' </font>+ iButton);\par
    <b>if </b>(iButton == 1) \{\par
      <b>document</b>.getElementById(strLogShow).innerHTML= <font color="#800080">'&lt;b&gt;Show&lt;/b&gt;'</font>;\par
      <b>document</b>.getElementById(strLogHide).innerHTML= <font color="#800080">'&lt;font style=&quot;color: rgb(59, 89, 152); cursor: pointer;&quot;&gt; &lt;a&gt;Hide&lt;/a&gt; &lt;/font&gt;'</font>;\par
      bShowLog = true;\par
      GM_setValue(<font color="#800080">'bShowLog'</font>,bShowLog);\par
      oLogDiv.parentNode.style.display = <font color="#800080">&quot;&quot;</font>;\par
    \} <b>else </b>\{\par
      <b>document</b>.getElementById(strLogHide).innerHTML= <font color="#800080">'&lt;b&gt;Hide&lt;/b&gt;'</font>;\par
      <b>document</b>.getElementById(strLogShow).innerHTML= <font color="#800080">'&lt;font style=&quot;color: rgb(59, 89, 152); cursor: pointer;&quot;&gt; &lt;a&gt;Show&lt;/a&gt; &lt;/font&gt;'</font>;\par
      bShowLog = false;\par
      GM_setValue(<font color="#800080">'bShowLog'</font>,bShowLog);\par
      oLogDiv.parentNode.style.display = <font color="#800080">&quot;none&quot;</font>;\par
    \}\par
  \}\par
\}\par
\par
<b>function </b>click_ClearLog() \{\par
  oLogDiv.innerHTML = <font color="#800080">&quot;&quot;</font>;\par
  GM_setValue(<font color="#800080">'LogDiv'</font>,oLogDiv.innerHTML);\par
\}\par
\par
<b>function </b>click_List_Accept_all(_oList) \{\par
  <b>return function </b>() \{\par
      <b>for </b>(<b>var </b>id <b>in </b>_oList) \{\par
    <i>//aParams[id] = true;\par
      </i><b>document</b>.getElementById(<font color="#800080">'FBAA-Para-'</font>+id).<b>checked </b>= true;\par
    \}\par
  \}\par
\}\par
\par
<b>function </b>click_List_Cancel_all(_oList) \{\par
  <b>return function </b>() \{\par
    <b>for </b>(<b>var </b>id <b>in </b>_oList) \{\par
    <i>//aParams[id] = false;\par
      </i><b>document</b>.getElementById(<font color="#800080">'FBAA-Para-'</font>+id).<b>checked </b>= false;\par
    \}\par
  \}\par
\}\par
\par
<b>function </b>click_ShowSetting() \{\par
  <b>return function </b>() \{\par
    <b>var </b>oDiv;\par
    <b>var </b>oForm, oItem;\par
    bAutoRunHold = bAutoRun;\par
    <i>// stop processing\par
    </i><b>if </b>(bAutoRun) StopProcessing();\par
    <i>// get Names\par
    </i>getGroupNames();\par
    <i>// put in group Names\par
    </i>oForm = <b>document</b>.<b>forms</b>.namedItem(<font color="#800080">'FBAA-Form1'</font>);\par
    oForm.<b>elements</b>.namedItem(<font color="#800080">'FBAA-Para-1001'</font>).innerHTML = strGroups;\par
    oForm.<b>elements</b>.namedItem(<font color="#800080">'FBAA-Para-1003'</font>).innerHTML = strGroups;\par
    GM_log(oForm.<b>elements</b>.namedItem(<font color="#800080">'FBAA-Para-1001'</font>).innerHTML);\par
    try\{\par
      <i>// plug in saved values;\par
      </i><b>for </b>(<b>var </b>i=0;i&lt;5;i++) \{\par
        GM_log(<font color="#800080">'i = '</font>+i);\par
          oForm = <b>document</b>.<b>forms</b>.namedItem(<font color="#800080">'FBAA-Form'</font>+i);\par
          GM_log(<font color="#800080">'oForm.length = '</font>+oForm.<b>length</b>);\par
          <b>for </b>(<b>var </b>j=0; j&lt;oForm.<b>length</b>; j++) \{\par
            GM_log(<font color="#800080">'j = '</font>+j);\par
            GM_log(<font color="#800080">'oForm = '</font>+oForm);\par
            GM_log(<font color="#800080">'oForm[j] = '</font>+oForm.<b>elements</b>[j]);\par
              oItem = oForm.<b>elements</b>[j];\par
              <b>if </b>(oItem != undefined) \{\par
                <b>if </b>(oItem.<b>type </b>== <font color="#800080">'checkbox'</font>) \{\par
                  oItem.<b>checked   </b>= aParams[oItem.<b>name</b>.<b>split</b>(<font color="#800080">'-'</font>)[2]];\par
                \} <b>else </b>\{\par
                  oItem.<b>value     </b>= aParams[oItem.<b>name</b>.<b>split</b>(<font color="#800080">'-'</font>)[2]];\par
                \}\par
              \} <b>else </b>\{\par
                <b>if </b>(oItem.<b>type </b>== <font color="#800080">'checkbox'</font>) \{\par
                  oItem.<b>checked   </b>= false;\par
                \} <b>else </b>\{\par
                  oItem.<b>value     </b>= 0;\par
                \}\par
              \}\par
          \}\par
       \}\par
    \} catch(err) \{\par
      GM_log(<font color="#800080">'Settings ERROR :'</font>+err.message);\par
    \}\par
\par
    oDiv = <b>document</b>.getElementById(strFBAASettings);\par
    oDiv.style.display=<font color="#800080">&quot;&quot;</font>;\par
  \}\par
\}\par
\par
<i>// Script Update Update Code\par
</i><b>function </b>updateCheck(forced) \{\par
  <i>// Checks once a day (24 h * 60 m * 60 s * 1000 ms) unless forced\par
  </i><b>if </b>((forced) || (<b>parseInt</b>(GM_getValue(<font color="#800080">'SUC_last_update'</font>, <font color="#800080">'0'</font>)) + 86400000 &lt;= (<b>new Date</b>().<b>getTime</b>()))) \{\par
    try \{\par
      <i>// read the script page on the USERSCRIPT.ORG web page\par
      </i>GM_xmlhttpRequest( \{\par
        <b>method</b>: <font color="#800080">'GET'</font>,\par
        url: <font color="#800080">'http://userscripts.org/scripts/source/'</font>+SUC_script_num+<font color="#800080">'.meta.js?'</font>+<b>new Date</b>().<b>getTime</b>(),\par
        headers: \{<font color="#800080">'Cache-Control'</font>: <font color="#800080">'no-cache'</font>\},\par
        onload: <b>function</b>(resp) \{\par
          <b>var </b>local_version, remote_version, rt, script_name;\par
          rt = resp.responseText;\par
          <i>// set the time of the last successful update\par
          </i>GM_setValue(<font color="#800080">'SUC_last_update'</font>, <b>new Date</b>().<b>getTime</b>()+<font color="#800080">''</font>);\par
          <i>// get the remote version number and save the scripts name\par
          //remote_version=parseInt(/@uso:version\\s*(.*?)\\s*$/m.exec(rt)[1]);\par
          </i>remote_version=/<font color="#800080">@</font>version<font color="#800080">\\</font>s*(.*<font color="#800080">?</font>)<font color="#800080">\\</font>s*$/m.exec(rt)[1];\par
          script_name = (/<font color="#800080">@</font><b>name</b><font color="#800080">\\</font>s*(.*<font color="#800080">?</font>)<font color="#800080">\\</font>s*$/m.exec(rt))[1];\par
          <i>// get the local version number\par
          //local_version=parseInt(GM_getValue('SUC_current_version', '-1'));\par
          </i><b>if</b>(script_version!=-1) \{\par
            <i>// test to see if a new version is available\par
            </i><b>if </b>(remote_version != script_version) \{\par
              <b>if</b>(<b>confirm</b>(<font color="#800080">'There is an update available for the Greasemonkey script &quot;'</font>+script_name+<font color="#800080">'.&quot;\\nWould you like to go to the install page now?'</font>)) \{\par
                <b>if </b>(<b>window</b>.chrome == null) \{\par
                  <b>window</b>.<b>location</b>.<b>href </b>= <font color="#800080">'http://userscripts.org/scripts/source/'</font>+SUC_script_num+<font color="#800080">'.user.js'</font>;\par
                \} <b>else </b>\{\par
                  <b>window</b>.<b>open</b>(<font color="#800080">'http://userscripts.org/scripts/show/'</font>+SUC_script_num,<font color="#800080">'_newtab'</font>);\par
                \}\par
                GM_setValue(<font color="#800080">'SUC_current_version'</font>, remote_version);\par
              \}\par
            \} <b>else if</b>(forced) \{\par
              <b>alert</b>(<font color="#800080">'No update is available for &quot;'</font>+script_name+<font color="#800080">'.&quot;'</font>);\par
            \}\par
          \} <b>else </b>\{\par
            <i>// if the script has never run save the version numnber\par
            </i>GM_setValue(<font color="#800080">'SUC_target_script_name'</font>, script_name+<font color="#800080">''</font>);\par
            GM_setValue(<font color="#800080">'SUC_current_version'</font>, remote_version+<font color="#800080">''</font>);\par
          \}\par
        \}\par
      \});\par
    \} catch (err) \{\par
      <b>if </b>(forced) <b>alert</b>(<font color="#800080">'An error occurred while checking for updates:\\n'</font>+err);\par
    \}\par
  \}\par
\}\par
\par
<b>function </b>SendEncode(_strTemp) \{\par
  <b>var </b>strTemp1;\par
  strTemp1=<font color="#800080">''</font>;\par
  <b>for </b>(i=0; i&lt;_strTemp.<b>length</b>; i++) \{\par
    iTest = _strTemp.charCodeAt(i)\par
    <b>if </b>(iTest == 45 ) \{\par
      strTemp1 += <font color="#800080">'-'</font>;\par
    \} <b>else if </b>(iTest == 32 ) \{\par
      strTemp1 += <font color="#800080">'+'</font>;\par
    \} <b>else if </b>(iTest &lt; 48) \{\par
      strTemp1 += <font color="#800080">'%' </font>+(<font color="#800080">'000'</font>+iTest.<b>toString</b>(16)).slice(-2);\par
    \} <b>else if </b>(iTest&gt;57 &amp;&amp; iTest&lt;65) \{\par
      strTemp1 += <font color="#800080">'%' </font>+(<font color="#800080">'000'</font>+iTest.<b>toString</b>(16)).slice(-2);\par
    \} <b>else if </b>(iTest&gt;90 &amp;&amp; iTest&lt;97) \{\par
      strTemp1 += <font color="#800080">'%' </font>+(<font color="#800080">'000'</font>+iTest.<b>toString</b>(16)).slice(-2);\par
    \} <b>else if </b>(iTest&gt;122 &amp;&amp; iTest&lt;127) \{\par
      strTemp1 += <font color="#800080">'%' </font>+(<font color="#800080">'000'</font>+iTest.<b>toString</b>(16)).slice(-2);\par
    \} <b>else </b>\{\par
      strTemp1 += _strTemp[i];\par
    \}\par
  \}\par
  <b>return </b>strTemp1;\par
\}\par
\par
<i>/**** Extend Array functions *****/\par
</i>ArraytoString = <b>function</b>(_aTemp) \{\par
  <b>var </b>tmp, bstart;\par
  tmp = <font color="#800080">'\{'</font>;\par
  bstart  = false;\par
  <b>for </b>(<b>var name in </b>_aTemp) \{\par
    <b>if </b>(bstart) tmp += <font color="#800080">','</font>;\par
    bstart = true;\par
    tmp += <font color="#800080">&quot;'&quot;</font>+<b>name</b>+<font color="#800080">&quot;'&quot;</font>;\par
    tmp += <font color="#800080">&quot;:&quot;</font>;\par
    <b>if </b>(typeof(_aTemp[<b>name</b>])==<font color="#800080">'string'</font>) \{\par
      tmp += <font color="#800080">&quot;'&quot;</font>+_aTemp[<b>name</b>] +<font color="#800080">&quot;'&quot;\par
    </font>\} <b>else </b>\{\par
      tmp += _aTemp[<b>name</b>];\par
    \}\par
  \}\par
  tmp += <font color="#800080">'\}'</font>;\par
  <b>return </b>tmp;\par
\}\par
\par
<b>function </b>makeElement(<b>type</b>, appendto, attributes, <b>checked</b>, chkdefault) \{\par
  <b>var </b>element = <b>document</b>.createElement(<b>type</b>);\par
  <b>if </b>(attributes != null) \{\par
    <b>for </b>(<b>var </b>i <b>in </b>attributes) \{ element.setAttribute(i, attributes[i]); \}\par
  \}\par
  <b>if </b>(<b>checked </b>!= null) \{\par
    <b>if </b>(GM_getValue(<b>checked</b>, chkdefault) == <font color="#800080">'checked'</font>) \{ element.setAttribute(<font color="#800080">'checked'</font>, <font color="#800080">'checked'</font>); \}\par
  \}\par
  <b>if </b>(appendto) \{ appendto.appendChild(element); \}\par
  <b>return </b>element;\par
\}\par
\par
Because it<font color="#800080">'s your web | Donate\par
\par
</font>Powered by monkeys and unicorns <b>with </b>the help of many friends\par
\par
Policy &amp; Guidelines: DMCA Privacy Policy\par
\par
</font>\par
</code></pre>\par
\par
}
