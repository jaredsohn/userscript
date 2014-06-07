// ==UserScript==
// @name            Face Book Mafia Gift Acceptor
// @description     Will Accept all Mafia Wars and FaceBook Gift Request, friend invites, and can ignore EVERYTHING else.
// @namespace       MafiaWars
// @include         http://www.facebook.com/*
// @include         http://facebook.mafiawars.com/mwfb/*
// @exclude         http://apps.facebook.com/*
// @exclude         http://www.facebook.com/extern/*
// @exclude         http://www.facebook.com/connect/*
// @exclude         http://www.facebook.com/login.php*
// @version         0.8.18
// @contributor     Shrubber
// ==/UserScript==

//  Variables for Event trigger
var pass 			= 0,
    change_count	= 0,
    notify_count	= 0,
    scheduled 		= false;

//  Process Variables
var strVersion 		= '0.8.18';

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
    bAutoRunHold	= false,
    bShowLog        = false;

var oLogDiv;

var aParams         = new Array();

var strGroups;

var local_xw_sig, local_xw_time, xw_sig_valid;
var FB_user_id;

var iRequestCurrent     = 0,
    iWallCurrent        = 0,
    iRespectCurrent     = 0,
    iRequestTimer       = 0,
    iWallTimer          = 0,
    iRespectTimer       = 0,
    iMW_XW_Timer        = 0,
    iFB_XW_Timer        = 0;

var bInitialized = false;

/*****  Icons   *****/
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


/*****  Engine for Processing Wall posting, Requests, and Respect    *****/


var iRequestNum     =   0,
    iWallNum        =   0,
    iNow            =   0;

var oForms, oForm, oFormInputs, oFormInput, oInputs, oInput;

var strConfirmBoxes =   '//div[@class="confirm_boxes"]',
    strFormInputs   =   './form',
    strFormInputs1  =   './/form',
    strEvent        =   './input',
    strInput        =   './/input',
    strReqTypes     =   '//span[contains(@id,"_label")]';

var strBase         =   'http://www.facebook.com/ajax/reqs.php?__a=1',
    strAccept       =   '&actions[accept]=Confirm',
    strReject       =   '&actions[reject]=Ignore';

var i,j,k;

var FirstRequest    = null,
    LastRequest     = null,
    FirstWall       = null,
    LastWall        = null,
    FirstRespect    = null,
    LastRespect     = null;

var Wall_Data = {
        NeedHelp:       {test:  /helpneeded_newyork|moscow|helpneeded_cuba|bangkok_social/i},
        Achievement:    {test:  /socialachievement|social_achievement/i},
        BossBonus:      {test:  /boss/i},
        IcedBonus:      {test:  /nothingpersonal/i},
        LevelUp:        {test:  /leveledup/i},
        BonusLoot:      {test:  /bonusloot/i},
        SupplyParts:    {test:  /white_big_item|feed_props_chopshop_incomplete/i},
        NextTarget:     {test:  /target/i},
        Bounty:         {test:  /bounty/i},
        FriendofFriend: {test:  /socialjobagain/i},
        LaunderMoney:   {test:  /money/i},
        ChopShop:       {test:  /chopshop/i},
        Rewards:        {test:  /feat/i},
        Stash:          {test:  /feed_gift/i},
        Robbing:        {test:  /robbinglevel_feed/i}
    }
    
var aStrLookUp = {
	1:	{	de_DE:"Diese Aufgabe erfordert",
			en_US:"This job requires",
			es_ES:"Este trabajo requiere",
			es_MX:"Este trabajo requiere",
			fr_FR:"Cette mission requiÃƒÂ¨re",
			id_ID:"Pekerjaan ini memerlukan"},
	2:	{	de_DE:"Steal from other people's properties",
			en_US:"Steal from other people's properties",
			es_ES:"Steal from other people's properties",
			es_MX:"Steal from other people's properties",
			fr_FR:"Steal from other people's properties",
			id_ID:"Steal from other people's properties"},
	3:	{	de_DE:"Only your top 501 Mafia members can help in a fight",
			en_US:"Only your top 501 Mafia members can help in a fight",
			es_ES:"Only your top 501 Mafia members can help in a fight",
			es_MX:"Only your top 501 Mafia members can help in a fight",
			fr_FR:"Only your top 501 Mafia members can help in a fight",
			id_ID:"Only your top 501 Mafia members can help in a fight"},
	4:	{	de_DE:"Die StraÃƒÅ¸en von Bangkok rot mit Blut, wie die Triaden und Yakuza fÃƒÂ¼r Vorherrschaft",
			en_US:"The streets of Bangkok run red with blood as the Triads and Yakuza struggle",
			es_ES:"Las calles de Bangkok se tiÃƒÂ±en de sangre mientras las Triadas y el Yakuza luchan por el poder",
			es_MX:"Las calles de Bangkok se tiÃƒÂ±en de sangre mientras las Triadas y el Yakuza luchan por el poder",
			fr_FR:"Les rues de Bangkok sont inondÃƒÂ©es de sang par les Triades et les Yakuza",
			id_ID:"Jalanan Bangkok bersimbah darah sementara Triad dan Yakuza berjuang untuk dominasi"},
	5:	{	de_DE:"Um einen Benutzer auf die Trefferliste zu setzen, besuchen Sie Ihre Mafia Wars Profil Seite",
			en_US:"To put a user on the hitlist, visit their Mafia Wars profile page,",
			es_ES:"Para poner un usuario en la Lista Negra, visita su pÃƒÂ¡gina de perfil de Mafia Wars",
			es_MX:"Para poner un usuario en la Lista Negra, visita su pÃƒÂ¡gina de perfil de Mafia Wars",
			fr_FR:"Pour mettre un utilisateur sur une liste de combat, visite la page de son profil sur Mafia Wars",
			id_ID:"Untuk menaruh seorang pengguna dalam daftar sasaran, kunjungi profil Mafia Wars mereka"},
	6:	{	de_DE:"Social Jobs",
			en_US:"Social Jobs",
			es_ES:"Social Jobs",
			es_MX:"Social Jobs",
			fr_FR:"Social Jobs",
			id_ID:"Social Jobs"},
	7:	{	de_DE:"You just accepted",
			en_US:"You just accepted",
			es_ES:"You just accepted",
			es_MX:"You just accepted",
			fr_FR:"You just accepted",
			id_ID:"You just accepted"},
	8:	{	de_DE:"a thank you gift!",
			en_US:"a thank you gift!",
			es_ES:"a thank you gift!",
			es_MX:"a thank you gift!",
			fr_FR:"a thank you gift!",
			id_ID:"a thank you gift!"},
	9:	{	de_DE:"This gift has expired! Make sure to accept your gifts right away",
			en_US:"This gift has expired! Make sure to accept your gifts right away",
			es_ES:"This gift has expired! Make sure to accept your gifts right away",
			es_MX:"This gift has expired! Make sure to accept your gifts right away",
			fr_FR:"This gift has expired! Make sure to accept your gifts right away",
			id_ID:"This gift has expired! Make sure to accept your gifts right away"},
	10:	{	de_DE:"Your friend has sent you more than 1 free gift in a day",
			en_US:"Your friend has sent you more than 1 free gift in a day",
			es_ES:"Your friend has sent you more than 1 free gift in a day",
			es_MX:"Your friend has sent you more than 1 free gift in a day",
			fr_FR:"Your friend has sent you more than 1 free gift in a day",
			id_ID:"Your friend has sent you more than 1 free gift in a day"}
}

function RespectItem(){
    this.Action     =   '';;
    this.Next       =   null;
}

RespectItem.prototype.AddNode = function() {
    if (FirstRespect == null)
        FirstRespect       =   this
    else
        LastRespect.Next   =   this;
    LastRespect    =   this;
}

RespectItem.prototype.ActionRequest = function() {
    var iHoldEvent;
    var xmlhttp;
    var myUrl;
    var nextParms;

    var Self;

    function NextRequest(_delay1,_delay2) {
        if (Self.Next != null) {
            iRespectCurrent = setTimeout(function (e) { Self.Next.ActionRequest();}, getRandRange(_delay1*750,_delay1*1250));
            if (iRespectCurrent < iHoldEvent ) clearTimeout(iRespectCurrent);
        } else {
            if( _delay2 > 0) {
                iRespectTimer = setTimeout(function (e) { CycleRespect();}, getRandRange(_delay2*750,_delay2*1250));
                if (iRespectTimer < iHoldEvent ) clearTimeout(iRespectTimer);
            }
        }
    }

    // stop processing if autorun turned off
    if (!bAutoRun) return;

    iHoldEvent = iRespectCurrent;
    Self = this;

    local_xw_sig        =   GM_getValue('local_xw_sig');
    
    //stop the this cycle is mafia wars xw_sig is invalid
    if (xw_sig_valid == false) {
	    GM_log('aborting Respect cycle.  XW_SIG is invalid');
        if( aParams[6] > 0) {
            iRespectTimer = setTimeout(function (e) { CycleRespect();}, getRandRange(aParams[6]*750,aParams[6]*1250));
            if (iRespectTimer < iHoldEvent ) clearTimeout(iRespectTimer);
        }
	    return;
    }
    
    var iCurrentJob, iWatchDog;
    
    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
    iWatchDog = setTimeout(function (e) {
        iCurrentJob.abort();
        GM_log('WatchDog Current Respect Level 1 job.');
        
		NextRequest(aParams[5],aParams[6]);
        
    }, 30000);

    iCurrentJob = GM_xmlhttpRequest({
        method: 'GET',
        url:  Self.Action,
        headers: {
            'Host':            'facebook.mafiawars.com',
            'User-agent':       navigator.userAgent,
            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Accept-Encoding': 'gzip,deflate',
            'Accept-Charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
        },
        onload: function(_responseDetails) {
            var i1,i2, myUrl;
            var xmlhttp
            
            clearTimeout(iWatchDog);

            if (_responseDetails.status != 200) {
                GM_log('Error Trying to Accept Respect Gift');
                NextRequest(aParams[5],aParams[6]);
            } else {

                //<script type="text/javascript">top.location.href = "http://www.facebook.com/login.php?api_key=63eade489b31633f81a5cd776197cc65&v=1.0&next=http%3A%2F%2Ffacebook.mafiawars.com%2Fmwfb%2Fremote%2Fhtml_server.php%3Fxw_controller%3Dsafehouse%26xw_action%3Dopen_gift_free%26xw_city%3D1%26tmp%3Dc889d4cda9d34c617f285b408801e48f%26cb%3D1000002829717491269439882%26box_num%3D0&canvas=1";</script>
                strTemp = _responseDetails.responseText;
                i1 = strTemp.indexOf('href = "')
                i2 = strTemp.indexOf('</script>',i1);

                myUrl  = strTemp.slice(i1+8,i2-3);

                // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
			    iWatchDog = setTimeout(function (e) {
			        iCurrentJob.abort();
			        GM_log('WatchDog Current Respect Level 2 job.');
					NextRequest(aParams[5],aParams[6]);
			        
			    }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
                    method: 'HEAD',
                    url:  myUrl,
                    headers: {
                        'Host':            'www.facebook.com',
                        'User-agent':       navigator.userAgent,
                        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5',
                        'Accept-Encoding': 'gzip,deflate',
                        'Accept-Charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
                    },
                    onload: function(_responseDetails) {
                        var strTemp;
                        var i1,i2,myUrl;

                        clearTimeout(iWatchDog);

                        if (_responseDetails.status != 200) {
                            GM_log('Error Trying to Accept Respect Gift');
                            NextRequest(aParams[5],aParams[6]);
                        } else {
                            var strTemp;
                            var i1,i2,myUrl;

                            strTemp = _responseDetails.responseText;
                            i1      = strTemp.indexOf('window.location.replace(');
                            i2      = strTemp.indexOf('");</script>',i1);
                            myUrl   = strTemp.slice(i1+25,i2);

                            try {
	                            eval('myUrl = "'+myUrl+'"');
	                        } catch (err) {
	                            GM_log('Eval Error: '+Self.type);
	                            GM_log('Response: '+strTemp);
								NextRequest(aParams[5],aParams[6]);
	                            return;
	                        }

                            // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
						    iWatchDog = setTimeout(function (e) {
						        iCurrentJob.abort();
						        GM_log('WatchDog Current Respect Level 3 job.');
						        
								NextRequest(aParams[5],aParams[6]);
						        
						    }, 30000);

                            iCurrentJob = GM_xmlhttpRequest({
                                method: 'GET',
                                url:  myUrl,
                                headers: {
                                    'Host':            'apps.facebook.com',
                                    'User-agent':       navigator.userAgent,
                                    'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                                    'Accept-Language': 'en-us,en;q=0.5',
                                    'Accept-Encoding': 'gzip,deflate',
                                    'Accept-Charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
                                },
                                onload: function(_responseDetails) {
	                                
	                                clearTimeout(iWatchDog);
	                                
                                    if (_responseDetails.status != 200) {
                                        GM_log('Error Trying to Accept Respect Gift');
                                        NextRequest(aParams[5],aParams[6]);
                                    } else {
                                        var strTemp;
                                        var i1,i2,myUrl;

                                        myUrl    =  'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=safehouse&xw_action=open_gift_free&xw_city=&skip_req_frame=1';
                                        myUrl   +=  '&sf_xw_user_id='+FB_user_id+'&sf_xw_sig='+local_xw_sig;

			                            // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
									    iWatchDog = setTimeout(function (e) {
									        iCurrentJob.abort();
									        GM_log('WatchDog Current Respect Level 4 job.');
									        
											NextRequest(aParams[5],aParams[6]);
									        
									    }, 30000);
									    
                                        iCurrentJob = GM_xmlhttpRequest({
                                            method: 'GET',
                                            url:  myUrl,
                                            headers: {
                                                'Host':            'facebook.mafiawars.com',
                                                'User-agent':       navigator.userAgent,
                                                'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                                                'Accept-Language': 'en-us,en;q=0.5',
                                                'Accept-Encoding': 'gzip,deflate',
                                                'Accept-Charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
                                            },
                                            onload: function(_responseDetails) {
                                    			
	                                            clearTimeout(iWatchDog);
	                                            
                                    			if (_responseDetails.status != 200) {
                                                    GM_log('Error Trying to Accept Respect Gift');
                                                    NextRequest(aParams[5],aParams[6]);
                                                } else {
                                                    var strTemp;
                                                    var i1,i2,strDetails;

                                                    strTemp     = _responseDetails.responseText;
                                                    i1          = strTemp.indexOf('<td class="message_body">');
                                                    i2          = strTemp.indexOf('<script',i1);
                                                    strDetails  = strTemp.slice(i1,i2);

                                                    LogPush('<strong>Accepting Respect Gift</strong><br><table>'+strDetails+'</table>');
                                                    NextRequest(aParams[5],aParams[6]);
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });

};


function WallItem () {
    this.Action     =   '';
    this.srcImg     =   '';
    this.Type       =   '';
    this.AppId      =   '';
    this.Next       =   null;
}

WallItem.prototype.AddNode = function() {
    if (FirstWall == null)
        FirstWall       =   this
    else
        LastWall.Next   =   this;
    LastWall    =   this;
}

WallItem.prototype.ActionRequest = function() {
    var iHoldEvent;
    var xmlhttp;
    var myUrl;
    var nextParms;

    var Self;

    function NextRequest(_delay1, _delay2) {
        if (Self.Next != null) {
            iWallCurrent = setTimeout(function (e) { Self.Next.ActionRequest();}, getRandRange(_delay1*750,_delay1*1250));
            if (iWallCurrent < iHoldEvent ) clearTimeout(iWallCurrent);
        } else {
            if( _delay2 > 0) {
                iWallTimer = setTimeout(function (e) { CycleWall();}, getRandRange(_delay2*750,_delay2*1250));
                if (iWallTimer < iHoldEvent ) clearTimeout(iWallTimer);
            }
        }
    }

    // stop processing if autorun turned off
    if (!bAutoRun) return;

    iHoldEvent = iWallCurrent;
    Self = this;
    
    // ignore things if MW is not valid
    
    if (xw_sig_valid == false) {
	    GM_log('Ignoring Wall notices.  Mafia Wars does not appear to be working');
	    if( aParams[3] > 0) {
        	iWallTimer = setTimeout(function (e) { CycleWall();}, getRandRange(aParams[3]*750,aParams[3]*1250));
            if (iWallTimer < iHoldEvent ) clearTimeout(iWallTimer);
       	}
	    return;
    }

    local_xw_sig        =   GM_getValue('local_xw_sig');

    //Ignore some types of jobs based on settings

    switch (Self.Type) {
        case 'Ignore':
            NextRequest(1,aParams[3]);
            break;
        case 'NeedHelp':
            if (aParams[204]==false) {
                LogPush('Skipping Need Help notice');
                NextRequest(1,aParams[3]);
                return;
            }
            break;
        case 'FriendofFriend':
            if (aParams[205]==false) {
                LogPush('Skipping Help Friend of Friend notice');
                NextRequest(1,aParams[3]);
                return;
            }
            break;
        case 'NextTarget':
            if (aParams[206]==false) {
                LogPush('Skipping Next Target notice');
                NextRequest(1,aParams[3]);
                return;
            }
            break;
        case 'Bounty':
            if (aParams[207]==false) {
                LogPush('Skipping Bounty notice');
                NextRequest(1,aParams[3]);
                return;
            }
            break;
        case 'LaunderMoney':
            if (aParams[209]==false) {
                LogPush('Skipping Money Laundering notice');
                NextRequest(1,aParams[3]);
                return;
            }
            break;
        case 'SupplyParts':
            if (aParams[210]==false) {
                LogPush('Skipping Supply Parts notice');
                NextRequest(1,aParams[3]);
                return;
            }
        case 'Achievement':
        case 'BossBonus':
        case 'IcedBonus':
        case 'LevelUp':
        case 'BonusLoot':
        case 'ChopShop':
        case 'Rewards':
        case 'Stash':
        case 'Robbing':
            if (aParams[208]==false) {
                LogPush('Skipping Bonus/Reward/Stash notice');
                NextRequest(1,aParams[3]);
                return;
        }
            break;
    }
    var iCurrentJob, iWatchDog;
    
    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
    iWatchDog = setTimeout(function (e) {
        iCurrentJob.abort();
        GM_log('WatchDog Current Wall Level 1 job.');
        
		NextRequest(aParams[2],aParams[3]);
        
    }, 30000);
    
    iCurrentJob = GM_xmlhttpRequest({
        method: 'GET',
        url:  Self.Action,
        headers: {
            'Host':            'apps.facebook.com',
            'User-agent':       navigator.userAgent,
            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Accept-Encoding': 'gzip,deflate',
            'Accept-Charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
        },
        onload: function(_responseDetails) {
            var myUrl, myUrl2, strTemp, i1, i2;

            clearTimeout(iWatchDog);
            if (_responseDetails.status != 200) {
                GM_log('Error with Wall Notification:'+Self.Type);
                NextRequest(aParams[2],aParams[3]);
            } else {

                strTemp = _responseDetails.responseText;
                myUrl = "http://facebook.mafiawars.com/mwfb/remote/html_server.php?"

                i1 = strTemp.indexOf('next_controller=');
                i2 = strTemp.indexOf('&amp',i1);
                myUrl += 'xw_controller='+strTemp.slice(i1+16,i2);
                i1 = strTemp.indexOf('next_action=',i1);
                i2 = strTemp.indexOf('&amp',i1);
                myUrl += '&xw_action='+strTemp.slice(i1+12,i2)
                myUrl += '&xw_city=&skip_req_frame=1';
                myUrl += '&sf_xw_user_id='+FB_user_id+'&sf_xw_sig='+local_xw_sig;

                switch (Self.Type) {

                    case 'Robbing':
                       	//sendtime=1269542364&amp;friend=100000346121744&amp;next_params=%7B%22target%22%3A%22100000346121744%22%7D&amp;ref=nf&amp;_fb_noscript=1
                        //&target=1643777273&sendtime=1269527447&friend=1643777273 HTTP/1.1
                        i1 = strTemp.indexOf('sendtime=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        myUrl += '&sendtime='+strTemp.slice(i1+9,i2);
                        i1 = strTemp.indexOf('friend=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        myUrl += '&friend='+strTemp.slice(i1+7,i2);
                        i1 = strTemp.indexOf('next_params=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        try {
                            eval('nextParms = '+decodeStrings(strTemp.slice(i1+12,i2)));
                        } catch (err) {
                            GM_log('Eval Error: '+Self.type);
                            GM_log('Response: '+strTemp);
                            NextRequest(aParams[2],aParams[3]);
                            return;
                        }
                        for (var strItem in nextParms)
                            myUrl += '&'+strItem+'='+nextParms[strItem];
                        break;
                    case 'BossBonus':
                        //&target_id=100000055148422&job_city=3&job_id=56&sendtime=1269456131&friend=100000055148422
                        i1 = strTemp.indexOf('from=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        myUrl += '&target_id='+strTemp.slice(i1+5,i2);
                        i1 = strTemp.indexOf('cityId=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        myUrl += '&job_city='+strTemp.slice(i1+7,i2);
                        i1 = strTemp.indexOf('jobId=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        myUrl += '&job_id='+strTemp.slice(i1+7,i2);
                        i1 = strTemp.indexOf('sendtime=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        myUrl += '&sendtime='+strTemp.slice(i1+9,i2);
                        i1 = strTemp.indexOf('friend=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        myUrl += '&friend='+strTemp.slice(i1+7,i2);
                        break;
                    case 'NeedHelp':
                    case 'FriendofFriend':
                        // &target_id=100000481505667&job_city=2&sendtime=1268920698&friend=817233325
                        i1 = strTemp.indexOf('from=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        myUrl += '&target_id='+strTemp.slice(i1+5,i2);
                        i1 = strTemp.indexOf('cityId=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        myUrl += '&job_city='+strTemp.slice(i1+7,i2);
                        i1 = strTemp.indexOf('sendtime=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        myUrl += '&sendtime='+strTemp.slice(i1+9,i2);
                        i1 = strTemp.indexOf('friend=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        myUrl += '&friend='+strTemp.slice(i1+7,i2);
                        break;
                    case 'BonusLoot':
                        // next_params=%7B%22loot_time%22%3A%221268920359%22%2C%22friend%22%3A%22100000274594500%22%7D&amp;feed_target=1577252059&
                        // &loot_time=1268920359&friend=100000274594500&feed_target=1577252059
                        i1 = strTemp.indexOf('next_params=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        try {
                            eval('nextParms = '+decodeStrings(strTemp.slice(i1+12,i2)))
                        } catch (err) {
                            GM_log('Eval Error: '+Self.type);
                            GM_log('Response: '+strTemp);
                            NextRequest(aParams[2],aParams[3]);
                            return;
                        }
                        for (var strItem in nextParms)
                            myUrl += '&'+strItem+'='+nextParms[strItem];
                        i1 = strTemp.indexOf('feed_target=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        myUrl += '&feed_target='+strTemp.slice(i1+12,i2);
                        break;
                    case 'Rewards':
                    case 'SupplyParts':
                    case 'ChopShop':
                    case 'LaunderMoney':
                        
                        // &item=534&type=1&target=1665273341
                        // next_params=%7B%22item%22%3A%22534%22%2C%22type%22%3A%221%22%2C%22target%22%3A%221665273341%22%7D
                        // &FEATJB=abe053e82ded2d1d90ff9f4a6ea7ab78&friend=713270380
                        // next_params=%7B%22FEATJB%22%3A%22abe053e82ded2d1d90ff9f4a6ea7ab78%22%2C+%22friend%22%3A%22713270380%22%7D
                        i1 = strTemp.indexOf('next_params=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        try {
                            eval('nextParms = '+decodeStrings(strTemp.slice(i1+12,i2)));
                        } catch (err) {
                            GM_log('Eval Error: '+Self.type);
                            GM_log('Response: '+strTemp);
                            NextRequest(aParams[2],aParams[3]);
                            return;
                        }
                        for (var strItem in nextParms)
                            myUrl += '&'+strItem+'='+nextParms[strItem];
                        break;
                    case 'Achievement':
                    case 'NextTarget':
                    case 'IcedBonus':
                    case 'LevelUp':

                        // sendtime=1268920244&amp;friend=100000654713603&amp;next_params=%7B%22friend_id%22%3A%22100000654713603%22%7D&amp;ref=nf&amp;_fb_noscript=1"
                        // &friend_id=100000654713603&sendtime=1268920244&friend=100000654713603
                        // sendtime=1268921179&amp;friend=627128711&amp;next_params=%7B%22sharer%22%3A%22627128711%22%2C%22aid%22%3A%2254%22%7D&amp;
                        // &sharer=627128711&aid=54&sendtime=1268921179&friend=627128711 HTTP/1.1
                        i1 = strTemp.indexOf('sendtime=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        myUrl += '&sendtime='+strTemp.slice(i1+9,i2);
                        i1 = strTemp.indexOf('friend=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        myUrl += '&friend='+strTemp.slice(i1+7,i2);
                        i1 = strTemp.indexOf('next_params=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        try {
                            eval('nextParms = '+decodeStrings(strTemp.slice(i1+12,i2)));
                        } catch (err) {
                            GM_log('Eval Error: '+Self.type);
                            GM_log('Response: '+strTemp);
                            NextRequest(aParams[2],aParams[3]);
                            return;
                        }
                        for (var strItem in nextParms)
                            myUrl += '&'+strItem+'='+nextParms[strItem];
                        break;
                    case 'Stash':
                        //sendtime=1268919851&amp;friend=100000343149490&amp;next_params=%7B%22sender%22%3A%22100000343149490%22%2C%22time%22%3A%221268919851%22%7D&amp;ref=nf&amp;_fb_noscript=1" /> </noscript>
                        //sender=100000343149490&time=1268919851&sendtime=1268919851&friend=100000343149490 HTTP/1.1
                        i1 = strTemp.indexOf('sendtime=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        myUrl += '&sendtime='+strTemp.slice(i1+9,i2);
                        i1 = strTemp.indexOf('next_params=',i1);
                        i2 = strTemp.indexOf('&amp',i1);
                        try {
                            eval('nextParms = '+decodeStrings(strTemp.slice(i1+12,i2)));
                        } catch (err) {
                            GM_log('Eval Error: '+Self.type);
                            GM_log('Response: '+strTemp);
                            NextRequest(aParams[2],aParams[3]);
                            return;
                        }
                        for (var strItem in nextParms)
                            myUrl += '&'+strItem+'='+nextParms[strItem];
                        break;
                    case 'Ignore':
                        break;
                }
                //LogPush(myUrl);

                i1 = strTemp.indexOf('window.location.replace(');
                i2 = strTemp.indexOf(');</script>',i1);
                
                try {
	                eval('myUrl2 = '+strTemp.slice(i1+24,i2))
                } catch (err) {
                    GM_log('Eval Error: '+Self.type);
                    GM_log('Response: '+strTemp);
					NextRequest(aParams[2],aParams[3]);
                    return;
                }
    
			    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
			    iWatchDog = setTimeout(function (e) {
			        iCurrentJob.abort();
			        GM_log('WatchDog Current Wall Level 2 job.');
			        
					NextRequest(aParams[2],aParams[3]);
			        
			    }, 30000);
			    
                GM_log('myUrl2 = '+myUrl2);
                
                iCurrentJob = GM_xmlhttpRequest({

                    method: 'GET',
                    url:  myUrl2,
                    headers: {
                        'Host':            'apps.facebook.com',
                        'User-agent':       navigator.userAgent,
                        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5',
                        'Accept-Encoding': 'gzip,deflate',
                        'Accept-Charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
                    },
                    onload: function(_responseDetails) {
	                    
			            clearTimeout(iWatchDog);
	                    
                        if (_responseDetails.status != 200) {
                            GM_log('Error with Wall Notification:'+Self.Type);
                            NextRequest(aParams[2],aParams[3]);
                        } else {
	                        
				            // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
						    iWatchDog = setTimeout(function (e) {
						        iCurrentJob.abort();
						        GM_log('WatchDog Current Wall Level 3 job.');
						        
								NextRequest(aParams[2],aParams[3]);
						        
						    }, 30000);
						                
                            iCurrentJob = GM_xmlhttpRequest({

                                method: 'GET',
                                url:  myUrl,
                                headers: {
                                    'Host':            'facebook.mafiawars.com',
                                    'User-agent':       navigator.userAgent,
                                    'Content-Type':    'application/x-www-form-urlencoded',
                                    'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                                    'Accept-Language': 'en-us,en;q=0.5',
                                    'Accept-Encoding': 'gzip,deflate',
                                    'Accept-Charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
                                },
                                onload: function(_responseDetails) {

                                    var strTemp;
                                    var strNotice;

                                    var i1,i2,i3;

                                    clearTimeout(iWatchDog);

                                    if (_responseDetails.status != 200) {
                                        GM_log('Error with Wall Notification:'+Self.Type);
                                        NextRequest(aParams[2],aParams[3]);
                                    } else {

                                        strTemp =   _responseDetails.responseText;

                                        // examine output locations

                                        //GM_log(strTemp);
                                        //GM_log(Self.srcImg);


                                        var stopit = false;
                                        
                                        var strLang = checkLanguage(strTemp);
                                        
                                        if (Self.srcImg.indexOf('social_achievement')!=-1) {
                                            //process Pop message
                                            GM_log('social achiecement');

                                            i1 = strTemp.indexOf('<div class="ach_celeb_message">');
                                            if (i1!= -1) {
                                                i2=i1;
                                                i3=i1;
                                                do {
                                                    i3 = strTemp.indexOf('<div class="ach_celeb_block">',i2+1);
                                                    if(i3!=-1) i2=i3;
                                                } while (i3!= -1)
                                                strNotice = strTemp.slice(i1,i2);
                                            } else {
                                                i1 = strTemp.indexOf('<td class="message_body">');
                                                i2 = strTemp.indexOf('</td>',i1);
                                                strNotice = strTemp.slice(i1,i2);
                                            }
                                        } else if (Self.srcImg.indexOf('money_laundering')!=-1) {
                                            //process money laundering
                                            
                                            GM_log('money laundering');

                                            i1 = strTemp.indexOf('<div style="text-align:center;width:380px;">');
                                            i2 = strTemp.indexOf('<br/>',i1);
                                            strNotice = strTemp.slice(i1,i2);

                                            i1 = strTemp.indexOf("<div id='msg_box_div_contents_1");
                                            i2 = strTemp.indexOf("<div id='msg_box_div_contents_2");
                                            if (i2=-1) i2 = strTemp.indexOf("<script",i1);
                                            if (strTemp.slice(i1,i2).indexOf('collect_launder')!=-1 ) {
                                                GM_log('found dirty laundy');
                                                i1 = strTemp.indexOf("<table>",i1);
                                                i2 = strTemp.indexOf("</table>",i1);
                                                strNotice += '<br>' + strTemp.slice(i1,i2+8);
                                                strNotice = strNotice.replace('color: white;','');
                                                strNotice = strNotice.replace('height: 120px;','');
                                            }

                                        } else if (strTemp.indexOf('flash_content_propertiesV2')!=-1) {
                                            // on the property page
                                            GM_log('property');

                                            i1 = strTemp.indexOf('<td class="message_body">');
                                            i2 = strTemp.indexOf('</td>',i1);
                                            i2 = strTemp.slice(i1,i2).lastIndexOf('<div');
                                            strNotice = strTemp.slice(i1,i1+i2);

                                        } else if (strTemp.indexOf(aStrLookUp[1][strLang])!=-1) {
                                            // on the Jobs Page
                                            GM_log('Job Page');
                                            i1 = strTemp.indexOf('<td class="message_body">');
                                            i2 = strTemp.indexOf('</tr>',i1);
                                            strNotice = strTemp.slice(i1,i2);
                                        } else if (strTemp.indexOf(aStrLookUp[2][strLang])!=-1) {
                                            // on the Robbing Page
                                            GM_log('Robbing page');
                                            i1 = strTemp.indexOf('<td class="message_body');
                                            i2 = strTemp.indexOf('</tr>',i1);
                                            strNotice = strTemp.slice(i1,i2);
                                        } else if (strTemp.indexOf(aStrLookUp[3][strLang])!=-1) {
                                            // on the Fight Page
                                            GM_log('Fight page 1');
                                            i1 = strTemp.indexOf('<td class="message_body');
                                            i2 = strTemp.indexOf('</tr>',i1);
                                            strNotice = strTemp.slice(i1,i2);

                                         } else if (strTemp.indexOf(aStrLookUp[4][strLang])!=-1) {
                                            // on the Fight Page
                                            GM_log('Fight page 2');
                                            i1 = strTemp.indexOf('<td class="message_body');
                                            i2 = strTemp.indexOf('</tr>',i1);
                                            strNotice = strTemp.slice(i1,i2);

                                        } else if (strTemp.indexOf(aStrLookUp[5][strLang])!=-1) {
                                            // on the HitList Page
                                            GM_log('HitList page');
                                            i1 = strTemp.indexOf('<td class="message_body">');
                                            i2 = strTemp.indexOf('</td>',i1);
                                            strNotice = strTemp.slice(i1+25,i2);
                                        } else if (strTemp.indexOf('<div id="message_box_container"')!=-1) {
                                            // Main Page
                                            GM_log('Main Page');
                                            i1 = strTemp.indexOf('<div class="mbox_title">');
                                            if (i1!= -1) {
                                                GM_log("found message_box_generics");
                                                i2 = strTemp.indexOf("</div>",i1);
                                                if (strTemp.slice(i1,i2).indexOf(aStrLookUp[6][strLang])!=-1 ) {
                                                    GM_log('found social job');
                                                    i1 = strTemp.indexOf('<div style="width: 60%; ',i1);
                                                    i2 = strTemp.indexOf('<div style="float: left; margin',i1);
                                                    strNotice = strTemp.slice(i1,i2);
                                                    
                                                } else {
                                                    i1 = strTemp.indexOf('<td class="message_body');
                                                    i2 = strTemp.indexOf('</tr>',i1);
                                                    strNotice = strTemp.slice(i1,i2);
                                                }

                                            } else {
	                                            GM_log('main page other');
                                                i1 = strTemp.indexOf('<td class="message_body');
                                                i2 = strTemp.indexOf('</tr>',i1);
                                                strNotice = strTemp.slice(i1,i2);
                                            }

                                        } else {
                                            // Other
                                            GM_log('Other Page');
                                            i1 = strTemp.indexOf('<td class="message_body');
                                            i2 = strTemp.indexOf('</tr>',i1);
                                            strNotice = strTemp.slice(i1,i2);
                                            stopit = true;

                                        }
                                        //remove any SCRIPT stuff before posting

                                        strNotice = strNotice.replace(/<script(.|\s)*?\/script>/g, '');

                                        GM_log(strNotice);

                                        LogPush('<strong>'+Self.Type+'</strong><br><table>'+strNotice+'</table>');
                                        NextRequest(aParams[2],aParams[3]);

                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}

/****   Request Engine  ****/

function RequestItem () {
    this.Action     =   '';
    this.Reject     =   '';
    this.Parms      =   '';
    this.From       =   '';
    this.Giftname   =   '';
    this.Gifttype   =   '';
    this.Next       =   null;
}

RequestItem.prototype.AddNode = function() {
    if (FirstRequest == null)
        FirstRequest       =   this
    else
        LastRequest.Next   =   this;
    LastRequest    =   this;
}

RequestItem.prototype.ActionRequest = function() {

    var iHoldEvent;

    var aCat;
    var xmlhttp;
    var myURL;

    var i1,i2,i3,i4;
    var strTemp;

    var Self;
    
    var iWatchDog, iCurrentJob;
    
    function NextRequest(_delay1, _delay2) {
        if (Self.Next != null) {
            iRequestCurrent = setTimeout(function (e) { Self.Next.ActionRequest();}, getRandRange(_delay1*750,_delay1*1250));
            if (iRequestCurrent < iHoldEvent ) clearTimeout(iRequestCurrent);
        } else {
            if( _delay2 > 0) {
                LogPush('<strong>Finished processing requests.  Checking again in about '+_delay2+' minutes.</strong>');
                iRequestTimer = setTimeout(function (e) { CycleRequest();},getRandRange(_delay2*50000,_delay2*70000));
                if (iRequestTimer < iHoldEvent ) clearTimeout(iRequestTimer);
            }
        }
    }

    /***** Start Specific Processing Area *****/

    function FaceBookSend(_strTemp1,_strTemp2, _strParams) {
	    
	    var iWatchDog, iCurrentJob;
	    
		// start the WatchDog Timer to catch hung requests.  15 seconds maximum.
	    iWatchDog = setTimeout(function (e) {
	        iCurrentJob.abort();
	        GM_log('WatchDog Current FB Send job.');
	        
			NextRequest(aParams[0],aParams[1]);
	        
	    }, 30000);
	    
        iCurrentJob = new XMLHttpRequest();
        iCurrentJob.open('POST',                             strBase, false);
        iCurrentJob.setRequestHeader('Host',                'www.facebook.com');
        iCurrentJob.setRequestHeader('User-agent',           navigator.userAgent);
        iCurrentJob.setRequestHeader('Accept',              'text/html,application/xhtml+xml,application/xml;q=0.9,*//*;q=0.8');
        iCurrentJob.setRequestHeader('Accept-Language',     'en-us,en;q=0.5');
        iCurrentJob.setRequestHeader('Accept-Encoding',     'gzip,deflate');
        iCurrentJob.setRequestHeader('Accept-Charset',      'ISO-8859-1,utf-8;q=0.7,*;q=0.7');
        iCurrentJob.setRequestHeader('Content-Type',        'application/x-www-form-urlencoded; charset=UTF-8');
        iCurrentJob.setRequestHeader('Referer',             'http://www.facebook.com/note.php?note_id=115795065101656');
        iCurrentJob.setRequestHeader('X-SVN-Rev',           '221836');
        //You have requested to add
        iCurrentJob.onload = function(_responseDetails) {
            var strTemp, i1, i2;
            
            clearTimeout(iWatchDog);
            
            if (iCurrentJob.status == 200) {
                // You ignored a suggestion to add <a href=\\\"http:\\\/\\\/www.facebook.com\\\/profile.php?id=100000199047756\\\">John Van Alst<\\\/a> as a friend
                strTemp = iCurrentJob.responseText;
                if (strTemp.indexOf(_strTemp1)!=-1) {
                    i1 = strTemp.indexOf(_strTemp1);
                    i2 = strTemp.indexOf('a>',i1);
                    
                    try {
	                    strTemp = eval("'"+strTemp.slice(i1,i2+2)+_strTemp2+"'");
    	                LogPush('<strong>'+strTemp+'</strong>');
                    } catch (err) {
                        GM_log('Eval Error: Send Face Book');
                        GM_log('Response: '+strTemp);
						NextRequest(aParams[0],aParams[1]);
                        return;
                    }
                }
  	            NextRequest(aParams[0],aParams[1]);
            } else {
	            GM_log('Error with FaceBook Send');
	            NextRequest(aParams[0],aParams[1]);
			}
        }
        iCurrentJob.send(_strParams);
    }

    function MW_AcceptGift() {
	    
	    var iWatchDog, iCurrentJob;
		
	    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
	    iWatchDog = setTimeout(function (e) {
	        iCurrentJob.abort();
	        GM_log('WatchDog Current MW Accept Level 1 job.');
	        
			NextRequest(aParams[0],aParams[1]);
	        
	    }, 30000);
	    
        iCurrentJob = new XMLHttpRequest();
        iCurrentJob.open('POST',                             strBase, false);
        iCurrentJob.setRequestHeader('Host',                'www.facebook.com');
        iCurrentJob.setRequestHeader('User-agent',           navigator.userAgent);
        iCurrentJob.setRequestHeader('Accept',              'text/html,application/xhtml+xml,application/xml;q=0.9,*//*;q=0.8');
        iCurrentJob.setRequestHeader('Accept-Language',     'en-us,en;q=0.5');
        iCurrentJob.setRequestHeader('Accept-Encoding',     'gzip,deflate');
        iCurrentJob.setRequestHeader('Accept-Charset',      'ISO-8859-1,utf-8;q=0.7,*;q=0.7');
        iCurrentJob.setRequestHeader('Content-Type',        'application/x-www-form-urlencoded; charset=UTF-8');
        iCurrentJob.setRequestHeader('Referer',             'http://www.facebook.com/reqs.php');
        iCurrentJob.setRequestHeader('X-SVN-Rev',           '221836');
        iCurrentJob.onload = function(_responseDetails) {
	        
       	    clearTimeout(iWatchDog);

            if (iCurrentJob.status == 200) {

                //extract the embeded URL from responce
                var myUrl;
                var i1, i2, i3, i4;

                myUrl   =   iCurrentJob.responseText;
                i1      =   myUrl.indexOf('goURI');
                if (i1 !=   -1) {
                    GM_log('processing a normal Gift');
                    i2      =   myUrl.indexOf(');"]',i1);
                    myUrl   =   myUrl.slice(i1+6,i2);

                    try {
                    	eval("myUrl = '"+ myUrl +"'");
                    	eval('myUrl = '+ myUrl);
                	} catch (err) {
               	    	GM_log('Eval Error: '+Self.type);
                	    GM_log('myUrl: '+myUrl);
						NextRequest(aParams[0],aParams[1]);
                    	return;
                	}

                    myUrl = decodeStrings(myUrl);
                    //GM_log(myUrl);

                    // find items need for post
                    i1 = myUrl.indexOf('"from_user"');
                    i2 = myUrl.indexOf('"',i1+13);
                    from_user = myUrl.slice(i1+13,i2);
                    i1 = myUrl.indexOf('"time_id"');
                    i2 = myUrl.indexOf('"',i1+11);
                    time_id = myUrl.slice(i1+11,i2);
                    i1 = myUrl.indexOf('"loop"');
                    i2 = myUrl.indexOf('"',i1+8);
                    loop = myUrl.slice(i1+8,i2);
                    i1 = myUrl.indexOf('"item_cat"');
                    i2 = myUrl.indexOf('"',i1+12);
                    item_cat = myUrl.slice(i1+12,i2);
                    i1 = myUrl.indexOf('"item_id"');
                    i2 = myUrl.indexOf('"',i1+11);
                    item_id = myUrl.slice(i1+11,i2);
                    i1 = myUrl.indexOf('"gkey"');
                    i2 = myUrl.indexOf('"',i1+8);
                    gkey = myUrl.slice(i1+8,i2);

                    local_xw_sig        =   GM_getValue('local_xw_sig');

                    myUrl  = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=interstitial&xw_action=accept_gift&xw_city=&skip_req_frame=1';
                    myUrl += '&sf_xw_user_id='+FB_user_id+'&sf_xw_sig='+local_xw_sig;
                    myUrl += '&from_user='+from_user+'&time_id='+time_id;
                    myUrl += '&loop='+loop+'&item_cat='+item_cat;
                    myUrl += '&item_id='+item_id+'&gkey='+gkey;

                    //GM_log(myUrl);
                    
              	    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
				    iWatchDog = setTimeout(function (e) {
				        iCurrentJob.abort();
	       				GM_log('WatchDog Current MW Accept Level 2 job.');
				        
						NextRequest(aParams[0],aParams[1]);
				        
				    }, 30000);

                    iCurrentJob = GM_xmlhttpRequest({

                        method: 'GET', url:  myUrl,
                        headers: {
                            'Host':            'facebook.mafiawars.com',
                            'User-agent':       navigator.userAgent,
                            'Content-Type':    'application/x-www-form-urlencoded',
                            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'en-us,en;q=0.5',
                            'Accept-Encoding': 'gzip,deflate',
                            'Accept-Charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
                        },
                        onload: function(_responseDetails) {

                            var i1, i2, tmpText;
                            var oDiv, oDom;
                                                        
                            clearTimeout(iWatchDog);
                            
                            /*****	Inline function to open Mystery Bags	*****/
                            
                            function Accept_MysteryBag(_oDiv) {

                                var i1,i2,i3;
                                var iCurrentJob, iWatchDog;
                                
                                var myUrl;
                                var MyParams;

                                //GM_log(_oDiv.innerHTML);

                                if(_oDiv.id == undefined) {
                                    GM_log('Id undefined');
                                    if (_oDiv.nextSibling != null ) {
                                    	Accept_MysteryBag(_oDiv.nextSibling);
                                    } else {
                                        NextRequest(aParams[0],aParams[1]);
                                    }
                                } else {
	                                
	                                //GM_log(_oDiv.id);

                                    if (_oDiv.innerHTML.indexOf('Mystery Bag')!=-1) {
                                        GM_log('accepting Mystery Bag');

                                        // Process 1


                                        myUrl 		= 'http://facebook.mafiawars.com/mwfb/ztrack_ajax.php';
                                        MyParams 	= 'ajax=1';
                                        
                                        i1 = _oDiv.innerHTML.indexOf('ztrack_ajax')
                                        i1 = _oDiv.innerHTML.indexOf("'",i1) + 1
                                        i2 = _oDiv.innerHTML.indexOf("'",i1)
                                        MyParams += '&fname='+_oDiv.innerHTML.slice(i1,i2);
                                        i1 = i2+1;

                                        i1 = _oDiv.innerHTML.indexOf("'",i1) + 1
                                        i2 = _oDiv.innerHTML.indexOf("'",i1)
                                        MyParams += '&uid='+_oDiv.innerHTML.slice(i1,i2);
                                        i1 = i2+1;

                                        i1 = _oDiv.innerHTML.indexOf("'",i1) + 1
                                        i2 = _oDiv.innerHTML.indexOf("'",i1)
                                        MyParams += '&secret='+_oDiv.innerHTML.slice(i1,i2);
                                        i1 = i2+1
                                        for (var i=0; i<6; i++) {

                                            i1 = _oDiv.innerHTML.indexOf("'",i1) + 1
                                            i2 = _oDiv.innerHTML.indexOf("'",i1)
                                            MyParams += '&params['+_oDiv.innerHTML.slice(i1,i2)+']=';
                                            i1 = i2+1
                                            if ((i==0)||(i==2)) {
                                                i1 = _oDiv.innerHTML.indexOf(" ",i1) + 1
                                                i2 = _oDiv.innerHTML.indexOf(",",i1)
                                                MyParams += _oDiv.innerHTML.slice(i1,i2);
                                                i1=i2
                                            } else {
                                                i1 = _oDiv.innerHTML.indexOf("'",i1) + 1
                                                i2 = _oDiv.innerHTML.indexOf("'",i1)
                                                MyParams += _oDiv.innerHTML.slice(i1,i2);
                                                i1 = i2+1
                                            }
                                        }

                                        // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
									    iWatchDog = setTimeout(function (e) {
									        iCurrentJob.abort();
									        GM_log('WatchDog Mystery Gift Level 1 job.');
									        
											Accept_MysteryBag(_oDiv.nextSibling)
									        
									    }, 30000);
						
						                iCurrentJob = GM_xmlhttpRequest({
                                            method: 'POST',
                                            url:  myUrl,
                                            data: MyParams,
                                            headers: {
                                                'Host':             'facebook.mafiawars.com',
                                                'User-agent':       navigator.userAgent,
                                                'Accept':           'text/plain, */*',
                                                'Accept-Language':  'en-us,en;q=0.5',
                                                'Accept-Encoding':  'gzip,deflate',
                                                'Accept-Charset':   'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
                                                'Content-Type':     'application/x-www-form-urlencoded; charset=UTF-8',
                                                'X-Requested-With': 'XMLHttpRequest'
                                            },
                                            onload: function(_responseDetails) {
                                                
                                                clearTimeout(iWatchDog);
                                                
                                                var myUrl;
                                                var myParams;

                                                // Process 2
                                                i1 = _oDiv.innerHTML.indexOf('xw_controller=freegifts');
                                                i2 = _oDiv.innerHTML.indexOf(');',i1);

                                                // look for local_xw_sig
                                                local_xw_sig = GM_getValue('local_xw_sig');

                                                myUrl  = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?'
                                                myUrl += _oDiv.innerHTML.slice(i1,i2-1) + '&xw_client_id=8';
                                                myParams = 'ajax=1&liteload=1'
                                                myParams += '&sf_xw_sig=' + local_xw_sig;
                                                myParams += '&sf_xw_user_id=' + FB_user_id;

                                                myUrl = myUrl.replace(/&amp;/g,'&');
                                                //GM_log('MyURL = '+myUrl);


                                                // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
											    iWatchDog = setTimeout(function (e) {
											        iCurrentJob.abort();
										        	GM_log('WatchDog Mystery Gift Level 2 job.');
											        
													Accept_MysteryBag(_oDiv.nextSibling)
											        
											    }, 30000);
							
							                    iCurrentJob = GM_xmlhttpRequest({
                                                    method: 'POST',
                                                    url:  myUrl,
                                                    data: myParams,
                                                    headers: {
                                                        'Host':             'facebook.mafiawars.com',
                                                        'User-agent':       navigator.userAgent,
                                                        'Content-Type':     'application/x-www-form-urlencoded; charset=UTF-8',
                                                        'Accept':           '*/*',
                                                        'Accept-Language':  'en-us,en;q=0.5',
                                                        'Accept-Encoding':  'gzip,deflate',
                                                        'Accept-Charset':   'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
                                                        'X-Requested-With': 'XMLHttpRequest'
                                                    },
                                                    onload: function(_responseDetails) {

                                                        clearTimeout(iWatchDog);
                                                        
                                                        //GM_log(_responseDetails.responseText);

                                                        var MysteryGift;
                                                        
                                                        i1 = _responseDetails.responseText.indexOf("You got...");
                                                        i1 = _responseDetails.responseText.indexOf("<div",i1);
                                                        i2 = _responseDetails.responseText.indexOf('<div style="float: left;',i1);

                                                        MysteryGift = '<table>'+_responseDetails.responseText.slice(i1,i2)+'</table>';
                                                        
                                                        LogPush('<strong>Accepting Mystery Bag</strong><br>'+MysteryGift);

                                                        if (_oDiv.nextSibling != null ) {
                                                            Accept_MysteryBag(_oDiv.nextSibling);
                                                        }
                                                    }
                                                });
                                            }
                                        });

                                    } else if (_oDiv.nextSibling != null ) {
                                        Accept_MysteryBag(_oDiv.nextSibling);
                                    } else {
                                        NextRequest(aParams[0],aParams[1]);
                                    }
                                }
                            }
                            
                            /*****	End Inline function to open Mystery Bags	*****/
                            
                            tmpText = _responseDetails.responseText;

                            var strLang = checkLanguage(tmpText);
                            
 
                            if (tmpText.indexOf(aStrLookUp[9][strLang])>-1) {
	                            //GM_log('item 9');
	                            //GM_log(tmpText)
	                            
	                            LogPush(aStrLookUp[10][strLang]);
                                NextRequest(aParams[0],aParams[1]);
	                            
                        	} else if (tmpText.indexOf(aStrLookUp[10][strLang])>-1) {
	                        	//GM_log('item 10');
	                        	//GM_log(tmpText)

	                        	LogPush(aStrLookUp[9][strLang]);
                                NextRequest(aParams[0],aParams[1]);
                                
                        	} else if (tmpText.indexOf('<span class="good">Mystery Bag')!=-1){
                                
                                GM_log('Mystery bags... open them!!');

                                oDom = document.createElement('div');
                                
                                //GM_log('tmpText = '+tmpText);
                                
                                i1 = tmpText.indexOf("<div id='msg_box_div_contents_1");
                                i2 = tmpText.indexOf("<div id='message_box_div_success_black",i1);
                                oDom.innerHTML = tmpText.slice(i1,i2);
                                
                                //GM_log('i1 = '+i1);
                                //GM_log('i2 = '+i2);
                                //GM_log(oDom.childNodes.length);
                                
                        		if (oDom.childNodes.length >0) {
	                                GM_log('Have Status message to look at for Mystery Bags');
                                    Accept_MysteryBag(oDom.firstChild)
                                }
                                                            
                            } else {
	                            
	                            GM_log('normal');
	                            //GM_log(tmpText)
	                           // GM_log(tmpText.length);
	                            
	                            // Show a Normal Gift.

                                var GiftItem;
                                
                                var strLang = checkLanguage(tmpText);
								// <div style="float: left;"> You just accepted: Cement Block!</div>
                                i1 = tmpText.indexOf(aStrLookUp[7][strLang]);
                                i2 = tmpText.indexOf('</div>',i1);

                                GiftItem     =	'<b>'+tmpText.slice(i1,i2)+'</b><br>'
                                GiftItem	+=	'<table><div style="width: 100px; float: left; text-align: center; margin-left: 10px;">';
                                                                
                                i1 = tmpText.indexOf('<img', i2);
                                i2 = tmpText.indexOf('<div', i1)
                                i2 = tmpText.indexOf('<div', i2+1)

                                GiftItem    +=	tmpText.slice(i1,i2)+'</div>';
                                GiftItem	+=	'<div style="width: 100px; float: left; text-align: center; margin-left: 10px; padding-top: 20px;">';
                                
                                i1 = tmpText.indexOf('<a', i2);
                                i2 = tmpText.indexOf('</div', i1)
                                i2 = tmpText.indexOf('</div', i2+1)
                                
                                GiftItem    +=	tmpText.slice(i1,i2)+'</div></table>';
                                                                
                                LogPush(GiftItem);

                                NextRequest(aParams[0],aParams[1]);

                            }
                        }
                    });

                } else {
                    GM_log('Error in Response');
                    NextRequest(aParams[0],aParams[1]);
                }
            }
        }
        iCurrentJob.send(Self.Parms+Self.Action+'&post_form_id_source=AsyncRequest');
    }

    function MW_SendGift() {
        GM_log('Send Gift');
        
         var iWatchDog, iCurrentJob;
		
	    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
	    iWatchDog = setTimeout(function (e) {
	        iCurrentJob.abort();
	        GM_log('WatchDog Current MW Send Level 1 job.');
	        
			NextRequest(aParams[0],aParams[1]);
	        
	    }, 30000);
	    
        iCurrentJob = new XMLHttpRequest();

        iCurrentJob.open('POST',                             strBase, false);
        iCurrentJob.setRequestHeader('Host',                'www.facebook.com');
        iCurrentJob.setRequestHeader('User-agent',           navigator.userAgent);
        iCurrentJob.setRequestHeader('Accept',              'text/html,application/xhtml+xml,application/xml;q=0.9,*//*;q=0.8');
        iCurrentJob.setRequestHeader('Accept-Language',     'en-us,en;q=0.5');
        iCurrentJob.setRequestHeader('Accept-Encoding',     'gzip,deflate');
        iCurrentJob.setRequestHeader('Accept-Charset',      'ISO-8859-1,utf-8;q=0.7,*;q=0.7');
        iCurrentJob.setRequestHeader('Content-Type',        'application/x-www-form-urlencoded; charset=UTF-8');
        iCurrentJob.setRequestHeader('Referer',             'http://www.facebook.com/reqs.php');
        iCurrentJob.setRequestHeader('X-SVN-Rev',           '221836');
        iCurrentJob.onload = function(_responseDetails) {
            if (iCurrentJob.status == 200) {

                //extract the embeded URL from responce
                var myUrl;
                var i1, i2, strName;
                var from_user, time_id, gkey;

                var iErrors;
                
                clearTimeout(iWatchDog);

                myUrl   =   iCurrentJob.responseText;
                i1      =   myUrl.indexOf('goURI');
                if (i1 != -1) {
                    i2      =   myUrl.indexOf(');"]',i1);
                    myUrl   =   myUrl.slice(i1+6,i2);
                    eval("myUrl = '"+ myUrl +"'");
                    eval('myUrl = '+ myUrl);

                    // find items need for post
                    i1 = myUrl.indexOf('"from_user"');
                    i2 = myUrl.indexOf('"',i1+13);
                    from_user = myUrl.slice(i1+13,i2);
                    i1 = myUrl.indexOf('"time_id"');
                    i2 = myUrl.indexOf('"',i1+11);
                    time_id = myUrl.slice(i1+11,i2);
                    i1 = myUrl.indexOf('"gkey"');
                    i2 = myUrl.indexOf('"',i1+8);
                    gkey = myUrl.slice(i1+8,i2);

                    local_xw_sig        =   GM_getValue('local_xw_sig');

                    myUrl  = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=safehouse&xw_action=answer_gift&xw_city=&skip_req_frame=1';
                    myUrl += '&sf_xw_user_id='+FB_user_id+'&sf_xw_sig='+local_xw_sig;
                    myUrl += '&from_user='+from_user+'&time_id='+time_id+'&gkey='+gkey;

                    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
				    iWatchDog = setTimeout(function (e) {
				        iCurrentJob.abort();
				        GM_log('WatchDog Current MW Send Level 2 job.');
				        
						NextRequest(aParams[0],aParams[1]);
				        
				    }, 30000);
				    
			        iCurrentJob = GM_xmlhttpRequest({
                        method: 'GET',
                        url:    myUrl,
                        headers: {
                            'Host':            'facebook.mafiawars.com',
                            'User-agent':       navigator.userAgent,
                            'Content-Type':    'application/x-www-form-urlencoded',
                            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'en-us,en;q=0.5',
                            'Accept-Encoding': 'gzip,deflate',
                            'Accept-Charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
                        },
                        onload: function(_responseDetails) {

                            var strText, strTemp;
                            var i1, i2, i3, i4;
                            var strName;

                            var oDiv;
                            var myURL;
                            var bLookmore;
                            
                            clearTimeout(iWatchDog);

                            if (_responseDetails.status != 200) {
                                GM_log('Error with Gift');
                                GM_log(myUrl);
                                GM_log(_responseDetails.responseText);
                                    NextRequest(aParams[0],aParams[1]);
                            } else {

                                strText = _responseDetails.responseText;
                                // look for a valid response
                                if (strText.indexOf('</span> Select a gift for') == -1) {
                                    GM_log('Error with Gift');
                                    GM_log(strText);
                                    GM_log(strText.length);
                                    LogPush('Ignoring Send Request.  User has too many unopened gifts');
                                    NextRequest(aParams[0],aParams[1]);
                                } else {
                                    // used to import <input> statement
                                    oDiv    =   document.createElement('div');
                                    local_xw_sig     =   GM_getValue('local_xw_sig');
                                    myUrl            = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=safehouse&xw_action=answer_send&xw_city=1&skip_req_frame=1';
                                    myUrl           += '&ajax=1&liteload=1&sf_xw_user_id='+FB_user_id+'&sf_xw_sig='+local_xw_sig;
                                    myUrl           += '&target='+from_user+'&time_id='+time_id+'&gkey='+gkey;
                                    myUrl           += '&gift_box='+aParams[202];

                                    //find the person's name
                                    i1 = strText.indexOf('</span> Select a gift for');
                                    i2 = strText.indexOf('</h2>',i1);
                                    strName = strText.slice(i1+26,i2);

                                    if (strText.indexOf("You have already answered to 5 requests for gifts in 24 hours.")!=-1) {
                                        GM_log('You have already answered to 5 requests for gifts in 24 hours.');
                                        LogPush('<strong>You have sent a gift to '+strName+'.</strong><br>You have already answered to 5 requests for gifts in 24 hours.');
                                    } else {
                                        LogPush('<strong>You have sent a gift to '+strName+'.</strong><br>Reward has been claimed.');
                                    }

                                    // find the value Item ID
                                    i1  =   0;
                                    do {
                                        i1  = strText.indexOf('<input type="hidden"',i1);
                                        if (i1 != -1) {
                                            i2              = strText.indexOf('>',i1);
                                            oDiv.innerHTML  = strText.slice(i1,i2+1);
                                            if (oDiv.childNodes[0].name == 'value_item_id')
                                                myUrl += '&gift_id='+oDiv.childNodes[0].value;
                                            i1 = i2+2;
                                        }
                                    } while (i1!=-1);

                                    myUrl += '&xw_client_id=8';

                                    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
								    iWatchDog = setTimeout(function (e) {
								        iCurrentJob.abort();
	        							GM_log('WatchDog Current MW Send Level 3 job.');
								        
										NextRequest(aParams[0],aParams[1]);
								        
								    }, 30000);
								    
							        iCurrentJob = GM_xmlhttpRequest({
                                        method: 'POST', url:  myUrl,
                                        headers: {
                                            'Host':             'facebook.mafiawars.com',
                                            'User-agent':       navigator.userAgent,
                                            'Content-Type':     'application/x-www-form-urlencoded; charset=UTF-8',
                                            'Accept':           '*/*',
                                            'Accept-Language':  'en-us,en;q=0.5',
                                            'Accept-Encoding':  'gzip,deflate',
                                            'Accept-Charset':   'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
                                            'X-Requested-With': 'XMLHttpRequest'
                                        },
                                        onload: function(_responseDetails) {
	                                        
	                                        clearTimeout(iWatchDog);

                                            GM_log('Gift Send and rewarded claimed');
                                            NextRequest(aParams[0],aParams[1]);

                                        }
                                    });

                                }
                            }
                        }
                    });

                } else {
                    NextRequest(aParams[0],aParams[1]);
                }

            } else {
                GM_log('Send Gift Invalid');
                   NextRequest(aParams[0],aParams[1]);

            }
        }
        iCurrentJob.send(Self.Parms+Self.Action+'&post_form_id_source=AsyncRequest');

    }

    function FV_AcceptGift() {
	    
	    var iCurrentJob, iWatchDog;
	    
        // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
	    iWatchDog = setTimeout(function (e) {
	        iCurrentJob.abort();
	        GM_log('WatchDog Current FV Accept Level 1 job.');
	        
			NextRequest(aParams[0],aParams[1]);
	        
	    }, 30000);
	    
        iCurrentJob = new XMLHttpRequest();
        iCurrentJob.open('POST',                             strBase, false);
        iCurrentJob.setRequestHeader('Host',                'www.facebook.com');
        iCurrentJob.setRequestHeader('User-agent',           navigator.userAgent);
        iCurrentJob.setRequestHeader('Accept',              'text/html,application/xhtml+xml,application/xml;q=0.9,*//*;q=0.8');
        iCurrentJob.setRequestHeader('Accept-Language',     'en-us,en;q=0.5');
        iCurrentJob.setRequestHeader('Accept-Encoding',     'gzip,deflate');
        iCurrentJob.setRequestHeader('Accept-Charset',      'ISO-8859-1,utf-8;q=0.7,*;q=0.7');
        iCurrentJob.setRequestHeader('Content-Type',        'application/x-www-form-urlencoded; charset=UTF-8');
        iCurrentJob.setRequestHeader('Referer',             'http://www.facebook.com/reqs.php');
        iCurrentJob.setRequestHeader('X-SVN-Rev',           '221836');
        iCurrentJob.onload = function(_responseDetails) {
            if (iCurrentJob.status == 200) {

                //extract the embeded URL from responce
                var myUrl;
                var i1, i2, i3, i4;
                
                clearTimeout(iWatchDog);

                myUrl   =   iCurrentJob.responseText;
                i1      =   myUrl.indexOf('goURI');
                if (i1 !=   -1) {
                    GM_log('processing a normal Gift');
                    i2      =   myUrl.indexOf(');"]',i1);
                    myUrl   =   myUrl.slice(i1+6,i2);

                    eval("myUrl = '"+ myUrl +"'");
                    eval('myUrl = '+ myUrl);

                    //GM_log(myUrl);

                    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
				    iWatchDog = setTimeout(function (e) {
				        iCurrentJob.abort();
	     			    GM_log('WatchDog Current FV Accept Level 2 job.');
				        
						NextRequest(aParams[0],aParams[1]);
				        
				    }, 30000);
				    
			        iCurrentJob = GM_xmlhttpRequest({

                        method: 'GET', url:  myUrl,
                        headers: {
                            'Host':            'apps.facebook.com',
                            'User-agent':       navigator.userAgent,
                            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'en-us,en;q=0.5',
                            'Accept-Encoding': 'gzip,deflate',
                            'Accept-Charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
                        },
                        onload: function(_responseDetails) {

                            var tmpText;
                            var i1, i2;
                            var strImg, strName, strFrom;
                            var GiftItem;
                            
                            clearTimeout(iWatchDog);

                            tmpText =   _responseDetails.responseText;

                            if (tmpText.indexOf('gifterror.php?type=notfound')!=-1) {
	                            LogPush('An error occured while accepting this FarmVille gift. The gift data was not found.  Please remember to accept each gift right away.');
	                            NextRequest(aParams[0],aParams[1]);
	                            
                            } else {
	                            
	                            i1      = tmpText.indexOf('<div class="giftConfirm_img">');
	                            i2      = tmpText.indexOf('</div>',i1);
	                            strImg  = tmpText.slice(i1+29,i2);
	
	                            i1      = tmpText.indexOf('<div class="giftConfirm_name">',i1);
	                            i2      = tmpText.indexOf('</div>',i1);
	                            strName = tmpText.slice(i1+30,i2);
	
	                            i1      = tmpText.indexOf('<div class="giftFrom_name">',i1);
	                            i2      = tmpText.indexOf('</div>',i1);
	                            strFrom = tmpText.slice(i1+27,i2);
	
	                            if (strName.length>50) {
	                                GM_log('something bad has happended: '+tmpText);
	                                NextRequest(aParams[0],aParams[1]);
	                            } else {
	                                GiftItem    =   '<b>You just accepted a '+strName+' from '+strFrom+'</b><br>'+strImg;
	                                LogPush(GiftItem);
	                                NextRequest(aParams[0],aParams[1]);
	                            }
                            }

                        }
                    });

                } else {
                    GM_log('Error in Response');
                    NextRequest(aParams[0],aParams[1]);
                }
            }
        }
        iCurrentJob.send(Self.Parms+Self.Action+'&post_form_id_source=AsyncRequest');
    }

    function FV_SendGift() {
        GM_log('FV Send Gift');
        
        var iCurrentJob, iWatchDog;
	    
        // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
	    iWatchDog = setTimeout(function (e) {
	        iCurrentJob.abort();
	        GM_log('WatchDog Current FV Send Level 1 job.');
	        
			NextRequest(aParams[0],aParams[1]);
	        
	    }, 30000);
	    
        iCurrentJob = new XMLHttpRequest();

        iCurrentJob.open('POST',                             strBase, false);
        iCurrentJob.setRequestHeader('Host',                'www.facebook.com');
        iCurrentJob.setRequestHeader('User-agent',           navigator.userAgent);
        iCurrentJob.setRequestHeader('Accept',              'text/html,application/xhtml+xml,application/xml;q=0.9,*//*;q=0.8');
        iCurrentJob.setRequestHeader('Accept-Language',     'en-us,en;q=0.5');
        iCurrentJob.setRequestHeader('Accept-Encoding',     'gzip,deflate');
        iCurrentJob.setRequestHeader('Accept-Charset',      'ISO-8859-1,utf-8;q=0.7,*;q=0.7');
        iCurrentJob.setRequestHeader('Content-Type',        'application/x-www-form-urlencoded; charset=UTF-8');
        iCurrentJob.setRequestHeader('Referer',             'http://www.facebook.com/reqs.php');
        iCurrentJob.setRequestHeader('X-SVN-Rev',           '221836');
        iCurrentJob.onload = function(_responseDetails) {
            if (iCurrentJob.status == 200) {

                //extract the embeded URL from responce
                var myUrl;
                var i1, i2, strName;
                var from_user, time_id, gkey;

                var iErros;
                
                clearTimeout(iWatchDog);

                myUrl   =   iCurrentJob.responseText;
                i1      =   myUrl.indexOf('goURI');
                if (i1 != -1) {
                    i2      =   myUrl.indexOf(');"]',i1);
                    myUrl   =   myUrl.slice(i1+6,i2);
                    eval("myUrl = '"+ myUrl +"'");
                    eval('myUrl = '+ myUrl);
                    
                    GM_log('myUrl = '+myUrl);

                    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
				    iWatchDog = setTimeout(function (e) {
				        iCurrentJob.abort();
	     			    GM_log('WatchDog Current FV Send Level 2 job.');
				        
						NextRequest(aParams[0],aParams[1]);
				        
				    }, 30000);
				    
			        iCurrentJob = GM_xmlhttpRequest({
                        method: 'GET',
                        url:    myUrl,
                        headers: {
                            'Host':            'apps.facebook.com',
                            'User-agent':       navigator.userAgent,
                            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'en-us,en;q=0.5',
                            'Accept-Encoding': 'gzip,deflate',
                            'Accept-Charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
                        },
                        onload: function(_responseDetails) {

                            var strText, strName, strValue;
                            var i1, i2;
                            var myUrl;
                            
                            clearTimeout(iWatchDog);

                            if (_responseDetails.status != 200) {
                                GM_log('Error with Gift');
                                    NextRequest(aParams[0],aParams[1]);
                            } else {

                                strText = _responseDetails.responseText;

 
                                i1 = strText.indexOf('<div class="main_gift_cont');
                                i1 = strText.indexOf('action=',i1)+8;
                                i2 = strText.indexOf('"',i1);
                                
                                myUrl = strText.slice(i1,i2)+'?';
                                
                                for (var i=0;i<16;i++) {
                                    i1 = strText.indexOf('name="',i1)+6;
                                    i2 = strText.indexOf('"',i1);
                                    strName = strText.slice(i1,i2);
                                    i1 = strText.indexOf('value="',i1)+7;
                                    i2 = strText.indexOf('"',i1);
                                    strValue = strText.slice(i1,i2);
                                    if (strName == 'gift')  strValue= strValue.slice(0,-1)+aParams[302];
                                    if (strName == 'fb_sig_ext_perms') strValue = codeStrings(strValue);
                                    if (i>0) myUrl += '&';
                                    myUrl += strName +'='+strValue;
                                }
                                
                                myUrl += '&send_gift=Send';
                                
                                GM_log('myUrl = '+myUrl);

                                // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
							    iWatchDog = setTimeout(function (e) {
							        iCurrentJob.abort();
	       							GM_log('WatchDog Current FV Send Level 3 job.');
							        
									NextRequest(aParams[0],aParams[1]);
							        
							    }, 30000);
							    
						        iCurrentJob = GM_xmlhttpRequest({
                                    method: 'GET', url:  myUrl,
                                    headers: {
                                        'Host':             'apps.facebook.com',
                                        'User-agent':       navigator.userAgent,
                                        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                                        'Accept-Language':  'en-us,en;q=0.5',
                                        'Accept-Encoding':  'gzip,deflate',
                                        'Accept-Charset':   'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
                                    },
                                    onload: function(_responseDetails) {
                                        var myUrl, strText;
                                        
                                        clearTimeout(iWatchDog);                                    

                                        if (_responseDetails.status != 200) {
                                            GM_log('Error with Gift');
                                            NextRequest(aParams[0],aParams[1]);
                                        } else {

                                            LogPush('<strong>You have sent a farmville gift (max 10 per day).<strong>');

                                            NextRequest(aParams[0],aParams[1]);
                                        }
                                           
                                    }
                                });
                            }
                        }
                    });

                } else {
                    NextRequest(aParams[0],aParams[1]);
                }

            } else {
                GM_log('Send Gift Invalid');
                   NextRequest(aParams[0],aParams[1]);

            }
        }
        iCurrentJob.send(Self.Parms+Self.Action+'&post_form_id_source=AsyncRequest');

    }


    /***** End Specific Processing Area *****/

	var iCurrentJob, iWatchDog;
	
    // stop processing if autorun turned off
    if (!bAutoRun) return;

    iHoldEvent = iRequestCurrent;
    Self = this;

    aCat    = Self.Gifttype.split('_');
    GM_log('Self.Gifttype = '+Self.Gifttype);

    switch (aCat[0]) {
        case 'friend':
            switch (aCat[1]) {
                case 'suggestion':
                    if (aParams[100]==2) {
                        
	                    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
					    iWatchDog = setTimeout(function (e) {
					        iCurrentJob.abort();
					        GM_log('WatchDog Accept Friend job.');
					        
							NextRequest(aParams[0],aParams[1]);
					        
					    }, 30000);
					    
				        iCurrentJob = new XMLHttpRequest();
                        iCurrentJob.open('POST',                             strBase, false);
                        iCurrentJob.setRequestHeader('Host',                'www.facebook.com');
                        iCurrentJob.setRequestHeader('User-agent',           navigator.userAgent);
                        iCurrentJob.setRequestHeader('Accept',              'text/html,application/xhtml+xml,application/xml;q=0.9,*//*;q=0.8');
                        iCurrentJob.setRequestHeader('Accept-Language',     'en-us,en;q=0.5');
                        iCurrentJob.setRequestHeader('Accept-Encoding',     'gzip,deflate');
                        iCurrentJob.setRequestHeader('Accept-Charset',      'ISO-8859-1,utf-8;q=0.7,*;q=0.7');
                        iCurrentJob.setRequestHeader('Content-Type',        'application/x-www-form-urlencoded; charset=UTF-8');
                        iCurrentJob.setRequestHeader('Referer',             'http://www.facebook.com/reqs.php');
                        iCurrentJob.setRequestHeader('X-SVN-Rev',           '221836');
                        //You have requested to add
                        iCurrentJob.onload = function(_responseDetails) {
	                        
	                        var strTemp, i1, i2;
	                        
	                        clearTimeout(iWatchDog);
	                        
                            if (iCurrentJob.status == 200) {
                                // You ignored a suggestion to add <a href=\\\"http:\\\/\\\/www.facebook.com\\\/profile.php?id=100000199047756\\\">John Van Alst<\\\/a> as a friend
                                strTemp = iCurrentJob.responseText;
                                if (strTemp.indexOf('You have requested to add')!=-1) {
                                    i1 = strTemp.indexOf('You have requested to add');
                                    i2 = strTemp.indexOf('a>',i1);
                                    strTemp = eval("'"+strTemp.slice(i1,i2+2)+"'");
                                    LogPush('<strong>'+strTemp+'</strong>');
                                }
                            }
                            NextRequest(aParams[0],aParams[1]);
                        }
                        if (aParams[101]=='0')
                            iCurrentJob.send(strAccept+Self.Parms+'&params[lists]=&post_form_id_source=AsyncRequest')
                        else
                            iCurrentJob.send(strAccept+Self.Parms+'&params[lists]=[' + aParams[101]+']' + '&post_form_id_source=AsyncRequest');

                    } else if (aParams[100]==1) {
                        FaceBookSend('You ignored a suggestion to add',' as a friend',strReject+Self.Parms);

                    } else {
                        LogPush('Skipping Friend Suggestion');
                        NextRequest(1,aParams[1]);
                    }
                    break;
                case 'connect':
                    GM_log('Found Friend Connect');
                    if (aParams[102]==2) {
	                    
                        // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
					    iWatchDog = setTimeout(function (e) {
					        iCurrentJob.abort();
					        GM_log('WatchDog Current Connect job.');
					        
							NextRequest(aParams[0],aParams[1]);
					        
					    }, 30000);
					    
				        iCurrentJob = xmlhttp = new XMLHttpRequest();
                        iCurrentJob.open('POST',                             strBase, false);
                        iCurrentJob.setRequestHeader('Host',                'www.facebook.com');
                        iCurrentJob.setRequestHeader('User-agent',           navigator.userAgent);
                        iCurrentJob.setRequestHeader('Accept',              'text/html,application/xhtml+xml,application/xml;q=0.9,*//*;q=0.8');
                        iCurrentJob.setRequestHeader('Accept-Language',     'en-us,en;q=0.5');
                        iCurrentJob.setRequestHeader('Accept-Encoding',     'gzip,deflate');
                        iCurrentJob.setRequestHeader('Accept-Charset',      'ISO-8859-1,utf-8;q=0.7,*;q=0.7');
                        iCurrentJob.setRequestHeader('Content-Type',        'application/x-www-form-urlencoded; charset=UTF-8');
                        iCurrentJob.setRequestHeader('Referer',             'http://www.facebook.com/reqs.php');
                        iCurrentJob.setRequestHeader('X-SVN-Rev',           '221836');
                        //You have requested to add
                        iCurrentJob.onload = function(_responseDetails) {
	                        
	                        clearTimeout(iWatchDog);
	                        
                            //GM_log(xmlhttp.responseText);
                            var strTemp, i1, i2;
                            if (iCurrentJob.status == 200) {
                                // You ignored a suggestion to add <a href=\\\"http:\\\/\\\/www.facebook.com\\\/profile.php?id=100000199047756\\\">John Van Alst<\\\/a> as a friend
                                strTemp = iCurrentJob.responseText;
                                if (strTemp.indexOf('You are now friends with')!=-1) {
                                    //GM_log('We are fiends now');
                                    i1 = strTemp.indexOf('You are now friends with');
                                    i2 = strTemp.indexOf('a>',i1);
                                    strTemp = eval("'"+strTemp.slice(i1,i2+2)+"'");
                                    LogPush('<strong>'+strTemp+'</strong>');
                                }
                            }
                            NextRequest(aParams[0],aParams[1]);
                        }
                        //GM_log('Sending Send Command: '+aParams[103]);

                        if (aParams[103]=='0') {
                            //GM_log(strAccept+Self.Parms+'&params[lists]&post_form_id_source=AsyncRequest');
                            iCurrentJob.send(strAccept+Self.Parms+'&params[lists]&post_form_id_source=AsyncRequest');
                        } else {
                            //GM_log(strAccept+Self.Parms+'&params[lists]=[' + aParams[103]+']&post_form_id_source=AsyncRequest');

                            iCurrentJob.send(strAccept+Self.Parms+'&params[lists]=[' + aParams[103]+']&post_form_id_source=AsyncRequest');
                        }

                    } else if (aParams[102]==1) {
                        FaceBookSend('You ignored a friend request from','',strReject+Self.Parms);

                    } else {
                        LogPush('Skipping Friend Request');
                        NextRequest(1,aParams[1]);
                    }
                    break;
            }
            break;

        case 'event':
            if (aParams[104]==1) {
                FaceBookSend('You have removed the event','',Self.Parms+'&post_form_id_source=AsyncRequest');
            } else {
                LogPush('Skipping Event');
                NextRequest(1,aParams[1]);
            }
            break;

        case 'group':
            if (aParams[105]==1) {
                FaceBookSend('You ignored an invitation to join the group','',strReject+Self.Parms+'&post_form_id_source=AsyncRequest');
            } else {
                LogPush('Skipping Group Invitation');
                NextRequest(1,aParams[1]);
            }
            break;

        case 'cause':
            if (aParams[107]==1) {
                FaceBookSend('You ignored a request from','',strReject+Self.Parms+'&post_form_id_source=AsyncRequest');
            } else {
                LogPush('Skipping Cause Invitation');
                NextRequest(1,aParams[1]);
            }
            break;

        case 'fbpage':
            if (aParams[106]==1) {
        
                // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
			    iWatchDog = setTimeout(function (e) {
			        iCurrentJob.abort();
			        GM_log('WatchDog Current FBPage job.');
			        
					NextRequest(aParams[0],aParams[1]);
			        
			    }, 30000);
			    
		        iCurrentJob = new XMLHttpRequest();
                iCurrentJob.open('POST',                             strBase, false);
                iCurrentJob.setRequestHeader('Host',                'www.facebook.com');
                iCurrentJob.setRequestHeader('User-agent',           navigator.userAgent);
                iCurrentJob.setRequestHeader('Accept',              'text/html,application/xhtml+xml,application/xml;q=0.9,*//*;q=0.8');
                iCurrentJob.setRequestHeader('Accept-Language',     'en-us,en;q=0.5');
                iCurrentJob.setRequestHeader('Accept-Encoding',     'gzip,deflate');
                iCurrentJob.setRequestHeader('Accept-Charset',      'ISO-8859-1,utf-8;q=0.7,*;q=0.7');
                iCurrentJob.setRequestHeader('Content-Type',        'application/x-www-form-urlencoded; charset=UTF-8');
                iCurrentJob.setRequestHeader('Referer',             'http://www.facebook.com/reqs.php');
                iCurrentJob.setRequestHeader('X-SVN-Rev',           '221836');
                //You have requested to add
                iCurrentJob.onload = function(_responseDetails) {
	                
                    clearTimeout(iWatchDog);
                    
                    var strTemp, i1, i2;
                    if (iCurrentJob.status == 200) {
                        strTemp = iCurrentJob.responseText;
                        if (strTemp.indexOf('You have ignored this')!=-1) {
                            strTemp = 'You have ignored a Page suggestion';
                            LogPush('<strong>'+strTemp+'</strong>');
                        }
                    }
                    NextRequest(aParams[0],aParams[1]);
                }
                iCurrentJob.send(strReject+Self.Parms+'&post_form_id_source=AsyncRequest');
            } else {
                LogPush('Skipping Page Suggestion');
                NextRequest(1,aParams[1]);
            }
            break;

        case 'confirm':
            switch (aCat[1]) {
                case '10979261223':
                    // Mafiawars
                    if (xw_sig_valid == false) {
                    	LogPush('Skipping Mafia Wars item.  Mafia wars does not appear to be working.');
                        NextRequest(1,aParams[1]);
                	} else if (Self.Action.indexOf('accept_gift') != -1) {
                        //Accept Gifts
                        if (aParams[200]==2) {
                            MW_AcceptGift();
                        } else if (aParams[200]==1) {
                            FaceBookSend('You ignored a request from','',strReject+Self.Parms+'&post_form_id_source=AsyncRequest');
                        } else {
                            LogPush('Skipping Mafia Wars Accept Gift Request');
                            NextRequest(1,aParams[1]);
                        }
                    } else if (Self.Action.indexOf('answer_gift') != -1) {
                        //Send Gifts
                        if (aParams[201]==2) {
                            MW_SendGift();
                        } else if (aParams[201]==1) {
                            FaceBookSend('You ignored a request from','',strReject+Self.Parms+'&post_form_id_source=AsyncRequest');
                        } else {
                            LogPush('Skipping Mafia Wars Send Gift Request');
                            NextRequest(1,aParams[1]);
                        }
                    } else {
                        //join
                        if (aParams[203]==1) {
                            FaceBookSend('You ignored a request from','',strReject+Self.Parms+'&post_form_id_source=AsyncRequest');
                        } else {
                            LogPush('Skipping Mafia Wars Join Request');
                            NextRequest(1,aParams[1]);
                        }
                    }
                    break;

                case '102452128776':
                    // FarmVille
                    GM_log('FarmVille => '+Self.Action)
                    if (Self.Action.indexOf('giftaccept') != -1) {
                        //Accept Gifts
                        if (aParams[300]==2) {
                            FV_AcceptGift();
                        } else if (aParams[200]==1) {
                            FaceBookSend('You ignored a request from','',strReject+Self.Parms+'&post_form_id_source=AsyncRequest');
                        } else {
                            LogPush('Skipping FarmVille Accept Gift Request');
                            NextRequest(1,aParams[1]);
                        }
                    } else if (Self.Action.indexOf('sendcredits') != -1) {
                        //Send Gifts
                        if (aParams[301]==2) {
                            FV_SendGift();
                        } else if (aParams[201]==1) {
                            FaceBookSend('You ignored a request from','',strReject+Self.Parms+'&post_form_id_source=AsyncRequest');
                        } else {
                            LogPush('Skipping FarmVille Send Gift Request');
                            NextRequest(1,aParams[1]);
                        }
                    } else {
                        if (aParams[303]==1) {
                            FaceBookSend('You ignored a request from','',strReject+Self.Parms+'&post_form_id_source=AsyncRequest');
                        } else {
                            LogPush('Skipping FarmVille Join Request');
                            NextRequest(1,aParams[1]);
                        }
                    }
                    break;
                default:
                    GM_log('Ignoring Other Request');

                    if (aParams[400]==1) {
                        FaceBookSend('You ignored a request from','',strReject+Self.Parms+'&post_form_id_source=AsyncRequest');
                    } else {
                        LogPush('Skipping Other Request');
                        NextRequest(1,aParams[1]);
                    }
                    break;
            }
            break;
    }
}

function CycleRespect() {
	
	var iWatchDog;
	
    //read request from web pag
    ReadRespect();
}

function CycleWall(){
	
	var iWatchDog;

    //read request from web pag
    ReadWall();
    // start processing the requests
    if (FirstWall != null) {
        iCurrentWall = setTimeout(function (e) { FirstWall.ActionRequest();}, getRandRange(aParams[2]*750,aParams[2]*1250));
    } else {
        if( aParams[3] > 0) {
            iWallTimer = setTimeout(function (e) { CycleWall();},getRandRange(aParams[3]*750,aParams[3]*1250));
        }
    }

}

function CycleRequest() {
	
	var iWatchDog;
	
    //read request from web pag
    ReadRequests();
    // start processing the requests
    if (FirstRequest != null) {
        iRequestCurrent = setTimeout(function (e) { FirstRequest.ActionRequest();}, getRandRange(aParams[0]*750,aParams[0]*1250));
    } else {
        if( aParams[1] > 0) {
            LogPush('<strong>Finished processing requests.  Checking again in '+aParams[1]+' minutes.</strong>');
            iRequestTimer = setTimeout(function (e) { CycleRequest();},getRandRange(aParams[1]*50000,aParams[1]*70000));
        }
    }

}

function StartProcessing() {
    LogPush('<span style="color:green"><strong>Starting Automatic Request processing</strong></span>');

    bAutoRun = true;
    iRequestNum = 0;
    FirstRequest = null;
    LastRequest = null;

    if (aParams[1] == null) aParams[1] = 0;
    if (aParams[3] == null) aParams[3] = 0;
    if (aParams[6] == null) aParams[6] = 0;


    if( aParams[1] > 0) {
        CycleRequest();
    } else {
        LogPush('Request Processing is Disabled');
    }
    if( aParams[3] > 0) {
        CycleWall();
    } else {
        LogPush('Wall Processing is Disabled');
    }
    if( aParams[6] > 0) {
        CycleRespect();
    } else {
        LogPush('Respect Processing is Disabled');
    }

}

function StopProcessing() {

    bAutoRun = false;
    clearTimeout(iRespectTimer);
    clearTimeout(iRequestTimer);
    clearTimeout(iWallTimer);
    LogPush('<span style="color:red"><strong>Stopping Automatic Request Processing</strong></span>');
}

//Read Respect
function ReadRespect() {

    var myUrl;
    
    var iCurrentJob;
    var iWatchDog;
    
    // stop processing if autorun turned off
    if (!bAutoRun) return;

    FirstRespect    = null;
    LastRespect     = null;
    
    if (xw_sig_valid == false) {
        if( aParams[6] > 0) {
            LogPush('<strong>Ignoring Respect Gifts.  Mafia Wars does not appear to be working.  Checking again in '+aParams[6]+' minutes.</strong>');
            iRespectTimer = setTimeout(function (e) { CycleRespect();},getRandRange(aParams[6]*50000,aParams[6]*70000));
        }
        return;
    }

    local_xw_sig         =   GM_getValue('local_xw_sig');

    myUrl                =  'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=safehouse&xw_action=view&xw_city=1&skip_req_frame=1'
    myUrl               +=  '&sf_xw_user_id='+FB_user_id+'&sf_xw_sig='+local_xw_sig;

    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
    iWatchDog = setTimeout(function (e) {
        iCurrentJob.abort();
        GM_log('WatchDog timer killing Read Respect job.');
        
        //zero out the found list
        FirstRespect    = null;
		LastRespect     = null;

        LogPush('<strong>Finished processing respect gifts.  Checking again in '+aParams[6]+' minutes.</strong>');
		iRespectTimer = setTimeout(function (e) { CycleRespect();},getRandRange(aParams[6]*50000,aParams[6]*70000));
        
    }, 15000);
    
    // check for respect
    iCurrentJob = GM_xmlhttpRequest({
        method: 'GET',
        url:  myUrl,
        headers: {
            'Host':            'facebook.mafiawars.com',
            'User-agent':       navigator.userAgent,
            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Accept-Encoding': 'gzip,deflate',
            'Accept-Charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
        },
        onload: function(_responseDetails) {
            var strTemp;
            var i1,i2;
            var oDiv,oButton, oSnapShot;

            var oRespect;

            // clear watch dog timer
            clearTimeout(iWatchDog);
            
            if (_responseDetails.status != 200) {
                GM_log('Error checking for Respect Gifts');
            } else {
                oDiv = document.createElement('div');

                strTemp = _responseDetails.responseText;

                i1 = strTemp.indexOf('<div class="gift_safehouse_giftbox_cont">');
                i2 = strTemp.indexOf('<script type="text/javascript">',i1);

                oDiv.innerHTML = strTemp.slice(i1,i2);

                oSnapShot = getSnapshot('//div[@class="gift_safehouse_open_link"]/a',oDiv);

                if(oSnapShot.snapshotLength>0) {
                    LogPush('<strong>Found '+oSnapShot.snapshotLength+' respect gifts</strong>');

                    for (var i=0;i<oSnapShot.snapshotLength;i++) {
                        oButton         =   oSnapShot.snapshotItem(i);
                        oRespect        =   new RespectItem();
                        oRespect.Action =   oButton.href;
                        oRespect.AddNode();
                    }
                }


                // start processing the requests

                if (FirstRespect != null) {
                     iRespectCurrent = setTimeout(function (e) { FirstRespect.ActionRequest();}, getRandRange(aParams[5]*750,aParams[5]*1250));
                } else {
                    LogPush('<strong>Finished processing respect gifts.  Checking again in '+aParams[6]+' minutes.</strong>');
                    iRespectTimer = setTimeout(function (e) { CycleRespect();},getRandRange(aParams[6]*50000,aParams[6]*70000));
                }
           }
        }
    });
}



//Read Wall Posting
function ReadWall() {

	var iWatchDog;
    var iCurrentJob;
    var iNewNow = Math.floor(new Date().valueOf()/1000);
    var oDom = document.createElement('div');

    // stop processing if autorun turned off
    if (!bAutoRun) return;
    
    FirstWall       = null;
    LastWall        = null;
    
    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
    iWatchDog = setTimeout(function (e) {
        iCurrentJob.abort();
        GM_log('WatchDog timer killing Read Wall job.');
        
        //zero out the found list
        FirstWall       = null;
    	LastWall        = null;
        
    }, 15000);


    iWallNum     = 0;

    MyUrl = 'http://www.facebook.com/ajax/intent.php?__a=1&newest='+iNow+'&ignore_self=true&load_newer=true&request_type=2';

    iCurrentJob = new XMLHttpRequest();
    iCurrentJob.open('GET',                              MyUrl, false);
    iCurrentJob.setRequestHeader('Host',                'www.facebook.com');
    iCurrentJob.setRequestHeader('User-agent',           navigator.userAgent);
    iCurrentJob.setRequestHeader('Accept',              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
    iCurrentJob.setRequestHeader('Accept-Language',     'en-us,en;q=0.5');
    iCurrentJob.setRequestHeader('Accept-Encoding',     'gzip,deflate');
    iCurrentJob.setRequestHeader('Accept-Charset',      'ISO-8859-1,utf-8;q=0.7,*;q=0.7');
    iCurrentJob.setRequestHeader('X-SVN-Rev',           '227460');

    iCurrentJob.onload = function(_responseDetails) {

        var i, j;
        var i1,i2, strTemp;
        var iNumStories,strHTML;

        var oWall;

        var link_data, myImg;

        var re = /10979261223/i;

        var oInput, oButtons, oButton;
        
        // clear watch dog timer
        clearTimeout(iWatchDog);
            
        strTemp = iCurrentJob.responseText;

        i1      = strTemp.indexOf('"num_stories":')
        i2      = strTemp.indexOf(',',i1);
        iNumStories     = strTemp.slice(i1+14,i2);

        if (iNumStories > 0) {
            iNow = iNewNow;

            i1      = strTemp.indexOf('"html":"')
            i2      = strTemp.indexOf('","',i1);

            oDom.innerHTML = eval('"'+strTemp.slice(i1+8,i2) +'"');

            //GM_log('oDom.innerHTML = '+oDom.innerHTML);

            for (var i=0;i<oDom.childNodes.length;i++){
                oDiv = oDom.childNodes[i]

                link_data = oDiv.getAttribute('data-ft');

                if (link_data != null) eval('link_data = '+link_data);

                oDiv.id = "Ignore";

                if (link_data == null) {
                    LogPush('Link Data is Null');
                } else {
                    // Mafia Wars and Farmville only
                    if ( re.test(link_data.app_id)) {
                        switch (oDiv.tagName) {
                            case 'DIV':
                                myImg = getSnapshot('.//div[@class="UIMediaItem_Wrapper"]/img',oDiv).snapshotItem(0).src;
                                for (var name in Wall_Data) {
                                    if(Wall_Data[name]['test'].test(myImg)) {
                                        oButtons        =   getSnapshot(".//span[contains(@class,'UIActionLinks')]/a",oDiv);
                                        oButton         =   oButtons.snapshotItem(oButtons.snapshotLength-1);
                                        oWall           =   new WallItem();
                                        oWall.Type      =   name
                                        oWall.Action    =   oButton.href;
                                        oWall.AppId     =   link_data.app_id;
                                        oWall.srcImg    =   myImg;
                                        oWall.AddNode();
                                        iWallNum        =   iWallNum + 1;
                                        break;
                                    }
                                }
                                break
                            case 'LI':
                                myImg = getSnapshot('.//a[contains(@class,"external UIImageBlock_Image")]/img',oDiv).snapshotItem(0).src;
                                for (var name in Wall_Data) {
                                    if(Wall_Data[name]['test'].test(myImg)) {
                                        oButtons        =   getSnapshot('.//span[contains(@class,"UIActionLinks UIActionLinks_bottom")]/a',oDiv);
                                        oButton         =   oButtons.snapshotItem(oButtons.snapshotLength-1);
                                        oWall           =   new WallItem();
                                        oWall.Type      =   name
                                        oWall.Action    =   oButton.href;
                                        oWall.AppId     =   link_data.app_id;
                                        oWall.srcImg    =   myImg;
                                        oWall.AddNode();
                                        iWallNum        =   iWallNum + 1;
                                        break;
                                    }
                                }
                                break

                        }
                    }
                }
            }
        } else {
            // found nothing
        }
        if (iWallNum>0) LogPush( '<strong>'+iWallNum +' wall notification(s) have been found and will be processed</strong>');

    }
    iCurrentJob.send(null);
}


// Read request
function ReadRequests() {

    var iCurrentJob;
    var iWatchDog;
    
    // stop processing if autorun turned off
    if (!bAutoRun) return;

    local_xw_sig        =   GM_getValue('local_xw_sig');

    FirstRequest           = null;
    LastRequest            = null;

    iRequestNum     = 0;

    GM_log('Reading the available requests');
    LogPush('<strong>Reading available requests</strong>');

    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
    iWatchDog = setTimeout(function (e) {
        iCurrentJob.abort();
        GM_log('WatchDog timer killing Request job.');
        
        //zero out the found list
        FirstRequest       = null;
    	LastRequest        = null;
        
    }, 15000);
    
    
    iCurrentJob = new XMLHttpRequest();

    iCurrentJob.open('GET',                             'http://www.facebook.com/reqs.php', false);
    iCurrentJob.setRequestHeader('Host',                'www.facebook.com');
    iCurrentJob.setRequestHeader('User-agent',           navigator.userAgent);
    iCurrentJob.setRequestHeader('Accept',              'text/html,application/xhtml+xml,application/xml;q=0.9,*//*;q=0.8');
    iCurrentJob.setRequestHeader('Accept-Language',     'en-us,en;q=0.5');
    iCurrentJob.setRequestHeader('Accept-Encoding',     'gzip,deflate');
    iCurrentJob.setRequestHeader('Accept-Charset',      'ISO-8859-1,utf-8;q=0.7,*;q=0.7');
    iCurrentJob.setRequestHeader('Content-Type',        'application/x-www-form-urlencoded; charset=UTF-8');
    iCurrentJob.onload = function(_responseDetails) {
        var i1;
        var i2;
        var oDOM, oForms, oForm, oFormInputs, oFormInput, oInputs, oInput, oRequest;
        var oSpan;
        var strTemp, strTempGift;
        var iButtons;

        // clear watch dog timer
        clearTimeout(iWatchDog);

        strTemp = iCurrentJob.responseText;
        //GM_log(strTemp);

        i1 = strTemp.indexOf('<div class="UITwoColumnLayout_Container');
        if (i1 == -1) {
            GM_log('no Request have been found');
            return
        } else {

            i2 = strTemp.indexOf('<div class="UITwoColumnLayout_NarrowContent',i1);
            oDOM = document.createElement('div');
            oDOM.innerHTML = strTemp.slice(i1,i2);

            // find all the catagories

            //oSpan = getSnapshot(strReqTypes, oDOM);
            //for(i=0;i<oSpan.snapshotLength;i++) LogPush(oSpan.snapshotItem(i).id.slice(0,oSpan.snapshotItem(i).id.lastIndexOf('_'))+'    :'+requestName(oSpan.snapshotItem(i).textContent));


            // find all the requests
            oForms = getSnapshot(strConfirmBoxes, oDOM);

            for(i=0; i < oForms.snapshotLength; i++) {

                oForm       =   oForms.snapshotItem(i);
                switch (oForm.id) {
                    case 'friend_suggestion':
                        oFormInputs =   getSnapshot(strFormInputs1, oForm);
                        for ( j=0; j<oFormInputs.snapshotLength; j++) {

                            oFormInput      =   oFormInputs.snapshotItem(j);
                            oInputs         =   getSnapshot(strInput,oFormInput);
                            oRequest        =   new RequestItem();
                            oRequest.Gifttype   = oForm.id;

                            for ( k=0; k < oInputs.snapshotLength; k++) {
                                oInput      =   oInputs.snapshotItem(k);
                                switch (oInput.type) {
                                    case 'hidden':
                                        // grab the parameters need to action the item
                                        if (oInput.name != 'params[lists]') oRequest.Parms += "&"+oInput.name+"="+oInput.value;
                                        break;
                                   case 'submit':
                                        // grab the name of what we are actioning, and the http action request
                                        if (oInput.name.match(/actions\[reject\]/i) != null) {
                                            oRequest.Reject     = /actions\[([^\]]+)\]/.exec(oInput.name)[1];
                                        } else {
                                            oRequest.Giftname   = oInput.value.trim();
                                            oRequest.Action     = /actions\[([^\]]+)\]/.exec(oInput.name)[1]
                                        }
                                }
                            }

                            oRequest.Parms += '';

                            oRequest.Giftname           = oRequest.Giftname.replace('!','');
                            oRequest.AddNode();
                            iRequestNum                 =   iRequestNum + 1;
                        }
                        break;

                    case 'friend_connect':
                        oFormInputs =   getSnapshot(strFormInputs1, oForm);
                        for ( j=0; j<oFormInputs.snapshotLength; j++) {

                            oFormInput      =   oFormInputs.snapshotItem(j);
                            oInputs         =   getSnapshot(strInput,oFormInput);
                            oRequest        =   new RequestItem();
                            oRequest.Gifttype   = oForm.id;

                            for ( k=0; k < oInputs.snapshotLength; k++) {
                                oInput      =   oInputs.snapshotItem(k);
                                switch (oInput.type) {
                                    case 'hidden':
                                        // grab the parameters need to action the item
                                        if (oInput.name != 'params[lists]') oRequest.Parms += "&"+oInput.name+"="+oInput.value;
                                        break;
                                   case 'submit':
                                        // grab the name of what we are actioning, and the http action request
                                        if (oInput.name.match(/actions\[reject\]/i) != null) {
                                            oRequest.Reject     = /actions\[([^\]]+)\]/.exec(oInput.name)[1];
                                        } else {
                                            oRequest.Giftname   = oInput.value.trim();
                                            oRequest.Action     = /actions\[([^\]]+)\]/.exec(oInput.name)[1]
                                        }
                                }
                            }

                            oRequest.Parms += '';

                            oRequest.Giftname           = oRequest.Giftname.replace('!','');
                            oRequest.AddNode();
                            iRequestNum                 =   iRequestNum + 1;
                        }

                        break;

                    case 'event_invite':
                        oFormInputs =   getSnapshot(strFormInputs1, oForm);
                        for ( j=0; j<oFormInputs.snapshotLength; j++) {

                            oFormInput      =   oFormInputs.snapshotItem(j);
                            oInputs         =   getSnapshot(strEvent,oFormInput);
                            oRequest        =   new RequestItem();
                            oRequest.Gifttype   = oForm.id;

                            oRequest.Parms  =   '&ok=Okay&__d=1&action=remove';

                            for ( k=0; k < oInputs.snapshotLength; k++) {
                                oInput      =   oInputs.snapshotItem(k);
                                if (oInput.type == 'hidden') {
                                    switch (oInput.name) {
                                        case 'id':oRequest.Parms += "&"+oInput.name+"="+oInput.value; break;
                                        case 'type':oRequest.Parms += "&"+oInput.name+"="+oInput.value; break;
                                        case 'status_div_id':oRequest.Parms += "&"+oInput.name+"="+oInput.value; break;
                                        case 'post_form_id':oRequest.Parms += "&"+oInput.name+"="+oInput.value; break;
                                        case 'fb_dtsg':oRequest.Parms += "&"+oInput.name+"="+oInput.value; break;
                                    }
                                }
                            }

                            GM_log('oRequest.Parms = '+oRequest.Parms);

                            oRequest.AddNode();
                            iRequestNum                 =   iRequestNum + 1;
                        }

                        // Deal with them seperately
                        break;

                    default:
                        oFormInputs =   getSnapshot(strFormInputs, oForm);

                        for ( j=0; j<oFormInputs.snapshotLength; j++) {

                            oFormInput      =   oFormInputs.snapshotItem(j);
                            oInputs         =   getSnapshot(strInput,oFormInput);

                            oRequest    = new RequestItem();

                            oRequest.Gifttype   = oFormInput.parentNode.id;
                            GM_log(oRequest.Gifttype);

                            iButtons = 0;

                            for ( k=0; k < oInputs.snapshotLength; k++) {
                                oInput      =   oInputs.snapshotItem(k);
                                switch (oInput.type) {
                                    case 'hidden':
                                        // grab the parameters need to action the item
                                        if(oInput.name == 'charset_test')
                                            oRequest.Parms += "&"+oInput.name+"=%E2%82%AC%2C%C2%B4%2C%E2%82%AC%2C%C2%B4%2C%E6%B0%B4%2C%D0%94%2C%D0%84"
                                        else
                                            oRequest.Parms += "&"+oInput.name+"="+oInput.value;
                                        break;
                                    case 'submit':
                                        // grab the name of what we are actioning, and the http action request
                                        iButtons += 1;
                                        if (oInput.name.match(/actions\[reject\]/i) != null) {
                                            oRequest.Reject     = /actions\[([^\]]+)\]/.exec(oInput.name)[1];
                                        } else {
                                            oRequest.Giftname   = oInput.value;
                                            oRequest.Action     = "&"+codeStrings(oInput.name)+"="+codeStrings(oInput.value);
                                        }
                                }
                            }

                            oRequest.Parms += '';

                            //oRequest.Giftname   = oRequest.Giftname.replace('!','');

                            if (iButtons>1) {
                                oRequest.AddNode();
                                iRequestNum                 =   iRequestNum + 1;
                            } else {
                                LogPush('Ignoring malformed gift request. (no Accept button)');
                                GM_log('Ignoring malformed gift request. (no Accept button)');
                                oRequest = undefined;
                            }
                        }

                    }
            }
            GM_log('data has been read in.  We had '+ iRequestNum +' records to process');
            LogPush( '<strong>'+iRequestNum +' record(s) have been found and will be processed</strong>');

        }

    }
    iCurrentJob.send(null);
}


/*****  Initialization Routine  *****/

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
        
             //set Up Log File

            oLogDiv = document.createElement('div');
            oLogDiv.setAttribute('style',"width: 770px; height: 250px; overflow: auto; border: 1px solid rgb(204, 204, 204);padding-bottom: 2px;");

            oLogDiv.innerHTML = GM_getValue('LogDiv','');
            GM_setValue('LogDiv',oLogDiv.innerHTML);

            //set the time for wall processing
            iNow = Math.floor(new Date().valueOf()/1000)-60*5;

            // fb user id
            if(unsafeWindow.self.Env.user == undefined)
                FB_user_id = GM_getvalue('FB_user_id',0)
            else
                FB_user_id = unsafeWindow.self.Env.user;
            GM_setValue('FB_user_id',FB_user_id+'');
            GM_log('FB_user_id = '+FB_user_id);

            //set up the group Names
            strGroups       =   '<option value="0">-</option>';
            getGroupNames();

            // start a routine to keep the xw_sig current
            xw_sig_valid = false;
            FB_xw_sig_update();

            bAutoRun    = GM_getValue('bAutoRun',false);
            bShowLog    = GM_getValue('bShowLog',false);

            //read running parameters
            for (var i=0;i<5;i++) {
                switch (i) {
                    case 0:
                        strPara = GM_getValue('FBAA-Form'+i,'5;30;5;10;100;5;30');
                        GM_setValue('FBAA-Form'+i,strPara);
                        break;
                    case 1:
                        strPara = GM_getValue('FBAA-Form'+i,'0;;0;;0;0;0;0');
                        GM_setValue('FBAA-Form'+i,strPara);
                        break;
                    case 2:
                        strPara = GM_getValue('FBAA-Form'+i,'0;0;1;0;false;false;false;false;false;false;false;false;false;false;false;false;false;false');
                        GM_setValue('FBAA-Form'+i,strPara);
                        break;
                    case 3:
                        strPara = GM_getValue('FBAA-Form'+i,'0;0;1;0');
                        GM_setValue('FBAA-Form'+i,strPara);
                        break;
                    case 4:
                        strPara = GM_getValue('FBAA-Form'+i,'0');
                        GM_setValue('FBAA-Form'+i,strPara);
                        break;

                }
                GM_log('FBAA-Form['+i+']= '+strPara);
                aTempPara = strPara.split(';');
                for (var j=0;j<aTempPara.length;j++)

                    if (aTempPara[j]=='true')
                        aParams[i*100+j] = true
                    else if (aTempPara[j]=='false')
                        aParams[i*100+j] = false
                    else
                        aParams[i*100+j] = aTempPara[j];
            }

            GM_setValue('bAutoRun',bAutoRun);
            GM_getValue('bShowLog',bShowLog);

            if (bAutoRun) iRequestTimer = setTimeout(function (e) { StartProcessing();}, 15000)

            //setup display
            createDisplay();

            break;
    }
}

//***** Create Auto Accept Display  *****/
function createDisplay() {

    var oDom;
    var oDiv, oDiv1, oDiv2, oTable, oTr, oTd, oForm, oInput, oImg, oH, oP;
    var oHeader;

    oDom = document.getElementById('contentCol');

    if ((oDom !=null) && (document.getElementById(strFBAutoAccept)==null)) {
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
                    oH.appendChild(document.createTextNode("  Mafia Wars and FarmVille Request Processor"));
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
                        oTd.setAttribute('width',"200px");
                            oSpan = document.createElement('span');
                            oSpan.innerHTML = '<font style="color: rgb(59, 89, 152); font-size: 13px; font-weight: normal; cursor: pointer;"><a>Settings</a></font>';
                            oSpan.addEventListener("click",  click_ShowSetting, false);
                        oTd.appendChild(oSpan);
                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
                            oFont = document.createElement('font');
                            oFont.setAttribute('style',"color: rgb(0, 0, 0); font-size: 13px; font-weight: normal;");
                            oFont.appendChild(document.createTextNode("Version: "+strVersion));
                        oTd.appendChild(oFont);
                    oTr.appendChild(oTd);
                oTbody.appendChild(oTr);
            oTable.appendChild(oTbody);
        oDiv.appendChild(oTable);
        oHeader.appendChild(oDiv);


        // Add Settings Floating Window
        oDom = document.createElement('div');
        oDom.id = strFBAASettings;
        oDom.setAttribute('style',"display:none; border: 5px solid rgb(104, 104, 104); padding: 5px; overflow: auto; margin-top: -30px; margin-left: 20px; background-color: white; width: 500px; height: 310px; position: absolute; z-index: 100;");
            oDiv = document.createElement('div');
                oTable = document.createElement('table');
                oTable.setAttribute('width','100%');
                oTable.setAttribute('style','border-bottom:1px solid black');
                    oTbody = document.createElement('tbody');
                        oTr = AddTabs(strFBAASetTabs,'General;FaceBook;MafiaWars;Farmville;Others');
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody);
            oDiv.appendChild(oTable);
        oDom.appendChild(oTable);
        oDom.appendChild(CreateGeneralTab(0));
        oDom.appendChild(CreateFaceBookTab(1));
        oDom.appendChild(CreateMafiaWarsTab(2));
        oDom.appendChild(CreateFarmVilleTab(3));
        oDom.appendChild(CreateOtherTab(4));
           oDiv = document.createElement('div');
                oTable = document.createElement('table');
                oTable.setAttribute('width','100%');
                    oTbody = document.createElement('tbody');
                        oTr = document.createElement('tr');
                            oTd = document.createElement('td');
                            oTd.setAttribute('width',"50%");
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
                            oTd.setAttribute('width',"50%");
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
                    oButton.textContent = "Clear Log";
                    oButton.addEventListener("click", click_ClearLog, false);
                oFont.appendChild(oButton);
            oP.appendChild(oFont);
        oDom.appendChild(oP);
            oDiv = document.createElement('div');
            oDiv.setAttribute('style',"width: 770px; height: 250px; overflow: auto; border: 1px solid rgb(204, 204, 204);padding-bottom: 2px;");
        oDom.appendChild(oDiv);
        oHeader.appendChild(oDom);

        oDom.replaceChild(oLogDiv,oDiv);
        if (bShowLog)
            oLogDiv.parentNode.style.display = ""
        else
            oLogDiv.parentNode.style.display = "none"

    }

    function AddTabs(_id, _strTabs) {
        var aTabs = new Array();
        var oTr, oTd, oFont, oSpan, oButton;
        var iWidth;

        aTabs = _strTabs.split(';');
        iWidth = Math.floor(100/aTabs.length) + "%";

        oTr = document.createElement('tr');

        for (var i=0;i<aTabs.length;i++) {
            GM_log('i = '+i);
            oTd = document.createElement('td');
            if (i!=0) oTd.width = iWidth;
                oSpan = document.createElement('span');
                oSpan.id = _id+i;
                if (i==0) {
                    oFont = document.createElement('font');
                    oFont.setAttribute('style',' font-size: 13px; color:black');
                    oFont.innerHTML = '<b>'+aTabs[i]+'</b>';
                    oSpan.appendChild(oFont);
                } else {
                    oFont = document.createElement('font');
                    oFont.setAttribute('style',' font-size: 13px; color: rgb(59, 89, 152); cursor: pointer;');
                    oFont.innerHTML = '<a>'+aTabs[i]+'</a>';
                    oSpan.appendChild(oFont);
                }

                oSpan.addEventListener("click", click_ShowSettingsTab(i), false);
            oTd.appendChild(oSpan);
            oTr.appendChild(oTd);
        }

        return oTr;
    }

    function createCheckBox(_oTr, _iPar,_strName) {
        var oTd, oInput, oText;

        oTd = document.createElement('td');
            oInput = document.createElement('input');
            oInput.name = "FBAA-Para-"+_iPar;
            oInput.type = "checkbox";
        oTd.appendChild(oInput);
            oText = document.createTextNode(_strName);
        oTd.appendChild(oText);
        _oTr.appendChild(oTd);
    }

    function createDropDownList(_oTr, _iPar,_strName, _strOptions, _strValues) {
        var oTd, oSelect, oOption;
        var aOptions = new Array();
        var aValues = new Array();

        aOptions = _strOptions.split(';');
        aValues = _strValues.split(';');

        oTd = document.createElement('td');
        oTd.setAttribute('style',"width: 120px; text-align: right;");
        oTd.textContent = _strName+":";

        _oTr.appendChild(oTd);

        oTd = document.createElement('td');
        oTd.setAttribute('style',"width: 120px;");
            oSelect = document.createElement('select');
            oSelect.name = "FBAA-Para-"+_iPar;
            oSelect.setAttribute('style',"width: 120px;");
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
        var oDom;
        oDom = document.createElement('div');
        if (_id==0)
            oDom.setAttribute('style','display: ;height:260px; width:500px')
        else
            oDom.setAttribute('style','display:none ;height:260px; width:500px');
        oDom.id = strFBAASetDivs+_id;
        //oDom.innerHTML='Tab = '+_id;
            // create form
            oForm = document.createElement('form');
            oForm.name = 'FBAA-Form'+_id;

            // create layout;
            oTable = document.createElement('table');
            oTable.setAttribute('width','100%');
                oTbody = document.createElement('table');
                    oTr = document.createElement('tr');
                        oTh = document.createElement('th');
                        oTh.setAttribute('style',"");
                        oTh.setAttribute('colspan',"4");
                        oTh.textContent = "Request Settings";
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
                        oTh.textContent = "Wall Settings";
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
                        oTh.textContent = "Respect Settings";
                    oTr.appendChild(oTh);
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createDropDownList(oTr, 5,'Processing Interval','1 seconds;2 seconds;3 seconds;4 seconds;5 seconds;6 seconds;7 seconds;8 seconds;9 seconds;10 seconds','1;2;3;4;5;6;7;8;9;10');
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createDropDownList(oTr, 6,'Cycle Period','DISABLE; 1 minute;5 minutes;15 mintues;30 minutes;1 hour;3 hours;6 hours;12 hours;1 day','0;1;5;15;30;60;180;360;720;1440');
                oTbody.appendChild(oTr);

            oTable.appendChild(oTbody);
                    oTr = document.createElement('tr');
                        oTh = document.createElement('th');
                        oTh.setAttribute('style',"");
                        oTh.setAttribute('colspan',"4");
                        oTh.textContent = "Log";
                    oTr.appendChild(oTh);
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createDropDownList(oTr, 4,'Log Length','25 items; 50 items; 100 items; 150 items; 200 items','25;50;100;150;200');
                oTbody.appendChild(oTr);
            oForm.appendChild(oTable);
        oDom.appendChild(oForm);
        return oDom;
    };

    function CreateFaceBookTab(_id) {
        var oDom, oTable, oTbody, oTr, oTh, oTd, oForm;
        oDom = document.createElement('div');
               if (_id==0)
            oDom.setAttribute('style','display: ;height:260px; width:500px')
        else
            oDom.setAttribute('style','display:none ;height:260px; width:500px');
        oDom.id = strFBAASetDivs+_id;
        //oDom.innerHTML='Tab = '+_id;
            // create form
            oForm = document.createElement('form');
            oForm.name = 'FBAA-Form'+_id;

            // create layout
            oTable = document.createElement('table');
            oTable.setAttribute('width','100%');
                oTbody = document.createElement('table');
                    oTr = document.createElement('tr');
                        oTh = document.createElement('th');
                        oTh.setAttribute('style',"");
                        oTh.setAttribute('colspan',"4");
                        oTh.textContent = "Friends";
                    oTr.appendChild(oTh);
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createDropDownList(oTr, 100,'Friend Suggestions','Confirm;Ignore;Do Nothing','2;1;0');
                        oTd = document.createElement('td');
                        oTd.setAttribute('style',"width: 120px; text-align: right;");
                        oTd.textContent = "Add to List:";
                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
                        oTd.setAttribute('style',"width: 120px;");
                            oSelect = document.createElement('select');
                            oSelect.name = "FBAA-Para-101";
                            oSelect.setAttribute('style',"width: 120px;");
                            oSelect.innnerHTML = strGroups;
                        oTd.appendChild(oSelect);
                    oTr.appendChild(oTd);
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createDropDownList(oTr, 102,'Friend Invitation','Confirm;Ignore;Do Nothing','2;1;0');
                        oTd = document.createElement('td');
                        oTd.setAttribute('style',"width: 120px; text-align: right;");
                        oTd.textContent = "Add to List:";
                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
                        oTd.setAttribute('style',"width: 120px;");
                            oSelect = document.createElement('select');
                            oSelect.name = "FBAA-Para-103";
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
                    oTr.appendChild(oTh);
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createDropDownList(oTr, 104,'Event Invitations','Remove;Do Nothing','1;0');
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createDropDownList(oTr, 105,'Page Suggestions','Ignore;Do Nothing','1;0');
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createDropDownList(oTr, 106,'Group Invitations','Ignore;Do Nothing','1;0');
                oTbody.appendChild(oTr);
            oTable.appendChild(oTbody);

            oForm.appendChild(oTable);
        oDom.appendChild(oForm);
        return oDom;
    };

    function CreateMafiaWarsTab(_id) {
        var oDom, oTable, oTbody, oTr, oTh, oTd, oForm;
        oDom = document.createElement('div');
                if (_id==0)
            oDom.setAttribute('style','display: ;height:260px; width:500px')
        else
            oDom.setAttribute('style','display:none ;height:260px; width:500px');
        oDom.id = strFBAASetDivs+_id;
        //oDom.innerHTML='Tab = '+_id;
            // create form
            oForm = document.createElement('form');
            oForm.name = 'FBAA-Form'+_id;

            // create layout;
            oTable = document.createElement('table');
            oTable.setAttribute('width','100%');
                oTbody = document.createElement('table');
                    oTr = document.createElement('tr');
                        oTh = document.createElement('th');
                        oTh.setAttribute('style',"");
                        oTh.setAttribute('colspan',"4");
                        oTh.textContent = "Request Settings";
                    oTr.appendChild(oTh);
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createDropDownList(oTr, 200,'Accept Gifts','Confirm;Ignore;Do Nothing','2;1;0');
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createDropDownList(oTr, 201,'Send Gifts','Confirm;Ignore;Do Nothing','2;1;0');
                    createDropDownList(oTr, 202,'Reward','Experience;Energy;Stamina','1;2;3');
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createDropDownList(oTr, 203,'Join','Ignore;Do Nothing','1;0');
                oTbody.appendChild(oTr);

                    oTr = document.createElement('tr');
                        oTh = document.createElement('th');
                        oTh.setAttribute('style',"");
                        oTh.setAttribute('colspan',"4");
                        oTh.textContent = "Wall Settings";
                    oTr.appendChild(oTh);
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createCheckBox(oTr,204,"Help on jobs");
                    createCheckBox(oTr,205,"Help friend's friend");
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createCheckBox(oTr,206,"Next Target");
                    createCheckBox(oTr,207,"Hit List Bounty");
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createCheckBox(oTr,208,"BonusLootReward");
                    createCheckBox(oTr,209,"Money launder");
                    createCheckBox(oTr,210,"Supply Parts");
                oTbody.appendChild(oTr);

            oTable.appendChild(oTbody);

            oForm.appendChild(oTable);
        oDom.appendChild(oForm);
        return oDom;
    };

    function CreateFarmVilleTab(_id) {

        var oDom, oTable, oTbody, oTr, oTh, oTd, oForm;
        oDom = document.createElement('div');
                if (_id==0)
            oDom.setAttribute('style','display: ;height:260px; width:500px')
        else
            oDom.setAttribute('style','display:none ;height:260px; width:500px');
        oDom.id = strFBAASetDivs+_id;
        //oDom.innerHTML='Tab = '+_id;
            // create form
            oForm = document.createElement('form');
            oForm.name = 'FBAA-Form'+_id;

            // create layout;
            oTable = document.createElement('table');
            oTable.setAttribute('width','100%');
                oTbody = document.createElement('table');
                    oTr = document.createElement('tr');
                        oTh = document.createElement('th');
                        oTh.setAttribute('style',"");
                        oTh.setAttribute('colspan',"4");
                        oTh.textContent = "Request Settings";
                    oTr.appendChild(oTh);
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createDropDownList(oTr, 300,'Accept Gifts','Confirm;Ignore;Do Nothing','2;1;0');
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createDropDownList(oTr, 301,'Send Gifts','Confirm;Ignore;Do Nothing','2;1;0');
                    createDropDownList(oTr, 302,'Reward','Small Can of Fuel;Mystery Gift;20 Free XP;1,000 Free Coins;Red Spring Egg','1;2;3;4;5');
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createDropDownList(oTr, 303,'Join','Ignore;Do Nothing','1;0');
                oTbody.appendChild(oTr);
            oTable.appendChild(oTbody);

            oForm.appendChild(oTable);
        oDom.appendChild(oForm);
        return oDom;
    };

    function CreateOtherTab(_id) {
        var oDom, oTable, oTbody, oTr, oTh, oTd, oForm;
        oDom = document.createElement('div');
                if (_id==0)
            oDom.setAttribute('style','display: ;height:260px; width:500px')
        else
            oDom.setAttribute('style','display:none ;height:260px; width:500px');
        oDom.id = strFBAASetDivs+_id;
        //oDom.innerHTML='Tab = '+_id;
            // create form
            oForm = document.createElement('form');
            oForm.name = 'FBAA-Form'+_id;

            // create layout;
            oTable = document.createElement('table');
            oTable.setAttribute('width','100%');
                oTbody = document.createElement('table');
                    oTr = document.createElement('tr');
                        oTh = document.createElement('th');
                        oTh.setAttribute('style',"");
                        oTh.setAttribute('colspan',"4");
                        oTh.textContent = "Request Settings";
                    oTr.appendChild(oTh);
                oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                    createDropDownList(oTr, 400,'Everyting','Ignore;Do Nothing','1;0');
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
        GM_log('removing node');
        oLogDiv.removeChild(oLogDiv.lastChild);
    }

    GM_setValue('LogDiv',oLogDiv.innerHTML);
}

//***** Main Loop *****//

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

//***** DOM Notify and Change Code *****//

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


//***** Start Main Code *****//

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

    try {
        document.addEventListener("DOMNodeInserted", function (e) {
            change_count++;
            if (!scheduled && change_count > 2 ) schedNotify();
        },
        false);
    } catch(_errObj) {
        GM_log('Something bad has happend');
    }

    window.addEventListener("unload", function (e) {
        try {
            clearTimeout(iRequestCurrent);
            clearTimeout(iRequestTimer);
            clearTimeout(iRespectTimer);
            clearTimeout(iMW_XW_Timer);
            clearTimeout(iFB_XW_Timer);
            GM_log('Scripts are unloading.  Frame = '+strFrameId);
        } catch(_errObj) {
            GM_log('Something bad has happend');
        }
    },
    false);
} else {

    // for MW window when it opens

    Initialize();
}

/*****  xw_sig Update Routines  *****/

function MW_xw_sig_update() {

    var iHoldEvent

    iHoldEvent = iMW_XW_Timer;

    // if MW is open extract the current XW_SIG, and save it and the time.
    if (unsafeWindow.local_xw_sig != undefined) {
        // read the local_sw_sig value and save it
        GM_setValue('local_xw_sig', unsafeWindow.local_xw_sig);
        GM_setValue('local_xw_time',getCurrentTime());

        GM_log('Saving local_xw_sig, and local_xw_time from MW tab');

        // run every 5 minutes
        iMW_XW_Timer = setTimeout(function (e) { MW_xw_sig_update(); },300000);
        if (iMW_XW_Timer < iHoldEvent ) clearTimeout(iMW_XW_Timer);

    }
}

function FB_xw_sig_update() {

    var iHoldEvent, myUrl;

    iHoldEvent = iFB_XW_Timer;

    // this will keep the xw_sig_uptodate

    local_xw_sig        =   GM_getValue('local_xw_sig');
    local_xw_time       =   GM_getValue('local_xw_time',0);

    // check the age of the xw_sig
    if ((getCurrentTime()-local_xw_time) > 10) {
	    
	    myUrl = 'http://apps.facebook.com/inthemafia/?zy_link=appage';
	    LogPush('<strong>Mafia Wars credential are out of date.  Attempting to refresh</strong>');

		GM_xmlhttpRequest({
		    method: 'GET',
            url:  myUrl,
            headers: {
                'Host':            'apps.facebook.com',
                'User-agent':       navigator.userAgent,
                'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-us,en;q=0.5',
                'Accept-Encoding': 'gzip,deflate',
                'Accept-Charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
            },
            onload: function(_responseDetails) {
	            
	            var i1, i2, strTemp, myUrl;
	            
                if (_responseDetails.status == 200) {
	                strTemp = _responseDetails.responseText;
	                
	                i1=0;
	                myUrl = '';
	                
	                do {
			            i1 = strTemp.indexOf('<iframe',i1);
			            if (i1 == -1) {
				            break;
			            } else {
					        i1 = strTemp.indexOf('src="',i1);
			                i2 = strTemp.indexOf('"',i1+5);
			                myUrl = strTemp.slice(i1+5,i2);
			                myUrl = myUrl.replace(/&amp;/g,'&');
			                
			                if (myUrl.match(/facebook.mafiawars.com/i) == null) {
			                	myUrl = '';
		                	} else {
			                	break;
		                	}	
			            }    
	                } while (true)
	                
	              
	                if (myUrl != '') {
		                
	    				GM_xmlhttpRequest({
						
				            method: 'HEAD',
				            url:  myUrl,
				            headers: {
				                'Host':            'facebook.mafiawars.com',
				                'User-agent':       navigator.userAgent,
				                'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				                'Accept-Language': 'en-us,en;q=0.5',
				                'Accept-Encoding': 'gzip,deflate',
				                'Accept-Charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
				            },
				            onload: function(_responseDetails) {
					            var i1, i2, strTemp, myUrl;
					            
				                if (_responseDetails.status == 200) {
					                
					                strTemp = _responseDetails.responseText;
					                i1 = strTemp.indexOf("var local_xw_sig = '");
					                if (i1 !=-1) {
						                i2 = strTemp.indexOf("';",i1);
						                local_xw_sig		= strTemp.slice(i1+20,i2);
						                local_xw_time       = getCurrentTime();
						                xw_sig_valid 		= true;
						                
                                    	GM_setValue('local_xw_sig',local_xw_sig);
				                        GM_setValue('local_xw_time',local_xw_time);
				
				                        GM_log('local_xw_sig = '+local_xw_sig+', local_xw_time = '+local_xw_time);
				                        
				                        LogPush('Mafia Wars crentials have been sucessfully renewed');
				                        
				                        iFB_XW_Timer = setTimeout(function (e) { FB_xw_sig_update(); }, 300000);
                				    	if (iFB_XW_Timer < iHoldEvent ) clearTimeout(iFB_XW_Timer);
                				    	
                				    	// check Languague
                				    	
                				    	checkLanguage(strTemp)

					                } else {
						             	GM_log('Mafia War does not appear to be working');
                    					LogPush('Cannot Update Mafia Wars credentials.  Mafia Wars may be down<br>Attempting again in 5 minutes'); 
 					                   	xw_sig_valid 		= false;
                    			    	local_xw_time       = 0;
                        				GM_setValue('local_xw_time',local_xw_time);
                        				
				                   	 	iFB_XW_Timer = setTimeout(function (e) { FB_xw_sig_update(); }, 300000);
                				   		if (iFB_XW_Timer < iHoldEvent ) clearTimeout(iFB_XW_Timer);
					                }
				                } else {
		   		                    GM_log('Error loading FB/Mafia Wars Page');
				                    LogPush('Cannot Update Mafia Wars credentials<br>Attempting again in 5 minutes');
				                   	xw_sig_valid 		= false;
    			    				local_xw_time       = 0;
        							GM_setValue('local_xw_time',local_xw_time);
        							
        							iFB_XW_Timer = setTimeout(function (e) { FB_xw_sig_update(); }, 300000);
                				   	if (iFB_XW_Timer < iHoldEvent ) clearTimeout(iFB_XW_Timer);
				                }
			                }
			        	});
		                
	                } else {
	                    GM_log('Cannot find Mafia Wars iFrame');
	                    LogPush('Cannot Update Mafia Wars credentials<br>Attempting again in 5 minutes');
	                	xw_sig_valid 		= false;
    			    	local_xw_time       = 0;
        				GM_setValue('local_xw_time',local_xw_time);

        				iFB_XW_Timer = setTimeout(function (e) { FB_xw_sig_update(); }, 300000);
                		if (iFB_XW_Timer < iHoldEvent ) clearTimeout(iFB_XW_Timer);
					}               
                } else {
	                GM_log('Error loading FB/Mafia Wars Page');
                    LogPush('Cannot Update Mafia Wars credentials<br>Attempting again in 5 minutes');
                   	xw_sig_valid 		= false;
   			    	local_xw_time       = 0;
       				GM_setValue('local_xw_time',local_xw_time);
       				
	   				iFB_XW_Timer = setTimeout(function (e) { FB_xw_sig_update(); }, 300000);
               		if (iFB_XW_Timer < iHoldEvent ) clearTimeout(iFB_XW_Timer);
   				}
            }
        });
	    
    } else {

        GM_xmlhttpRequest({

            method: 'POST',
            url:  'http://facebook.mafiawars.com/mwfb/sf_updater.php ',
            data: 'sf_xw_user_id='+FB_user_id+'&sf_xw_sig='+local_xw_sig+'&skip_req_frame=1',
            headers: {
                'Host':            'facebook.mafiawars.com',
                'User-agent':       navigator.userAgent,
                'Content-Type':    'application/x-www-form-urlencoded',
                'Accept':          '*/*',
                'Accept-Language': 'en-us,en;q=0.5',
                'Accept-Encoding': 'gzip,deflate',
                'Accept-Charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
                'X-Requested-With':'XMLHttpRequest'
            },
            onload: function(_responseDetails) {

                var strText;
                var i1, i2;
                strText = _responseDetails.responseText;

                if (_responseDetails.status == 200) {
                    if (strText.indexOf('local_xw_sig') != -1) {
                        i1 = strText.indexOf('local_xw_sig')
                        i2 = strText.indexOf("';",i1)
                        local_xw_sig        = strText.slice(i1+16,i2);
                        local_xw_time       = getCurrentTime();
                        xw_sig_valid = true;

                        GM_setValue('local_xw_sig',local_xw_sig);
                        GM_setValue('local_xw_time',local_xw_time);

                        GM_log('local_xw_sig = '+local_xw_sig+', local_xw_time = '+local_xw_time);

                        //repeat every 10 minutes
                        iFB_XW_Timer = setTimeout(function (e) { FB_xw_sig_update(); }, 600000);
                        if (iFB_XW_Timer < iHoldEvent ) clearTimeout(iFB_XW_Timer);
                    } else {
                        xw_sig_valid 		= false;
                        local_xw_time       = 0;
                        GM_setValue('local_xw_time',local_xw_time);
                        
                        GM_log('Error renewing XW_SIG');

                        iFB_XW_Timer = setTimeout(function (e) { FB_xw_sig_update(); }, 1000);
                        if (iFB_XW_Timer < iHoldEvent ) clearTimeout(iFB_XW_Timer);
                    }

                } else {
	                xw_sig_valid 		= false;
                    local_xw_time       = 0;
                    GM_setValue('local_xw_time',local_xw_time);
                        
                    GM_log('Error renewing XW_SIG');
                    iFB_XW_Timer = setTimeout(function (e) { FB_xw_sig_update(); }, 1000);
                    if (iFB_XW_Timer < iHoldEvent ) clearTimeout(iFB_XW_Timer);
                }
            }
        });
    }
}

/**** Utility functions *****/

// gets the current timestamp in minutes
function getCurrentTime() {
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

    var strTemp = '';
    var i;

    for (i=0; i<_str.length; i++) {
        switch (_str[i]) {
            case ' ':
                strTemp += '%20'; break
            case ':':
                strTemp += '%3A'; break
            case '/':
                strTemp += '%2F'; break
            case '?':
                strTemp += '%3F'; break
            case '=':
                strTemp += '%3D'; break
            case '&':
                strTemp += '%26'; break
            case ':':
                strTemp += '%22'; break
            case ',':
                strTemp += '%2C'; break
            default:
                strTemp += _str[i];
        }
    }
    return strTemp;
}

function decodeStrings(_str) {

    var strTemp = '';
    var i;

    for (i=0; i<_str.length; i++) {
        if (_str[i] != '+')
        switch (_str.slice(i,i+3)) {
            case '%20':
                strTemp += ' '; i +=2; break
            case '%2C':
                strTemp += ','; i +=2; break
            case '%3A':
                strTemp += ':'; i +=2; break
            case '%2F':
                strTemp += '/'; i +=2; break
            case '%3F':
                strTemp += '?'; i +=2; break
            case '%3D':
                strTemp += '='; i +=2; break
            case '%26':
                strTemp += '&'; i +=2; break
            case '%22':
                strTemp += '"'; i +=2; break
            case '%7B':
                strTemp += '{'; i +=2; break
            case '%7D':
                strTemp += '}'; i +=2; break
            default:
                strTemp += _str[i];
        }
    }
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
        url:"http://www.facebook.com/friends/?ref=tn",
        method:'get',
        onload: function(resp){
            var i1, i2, i3, i4;
            var strTemp, strDiv, strId, strName;

            strTemp = resp.responseText;
            i1 = 0;
            do {
                i1 = strTemp.indexOf('<div class="UIFilterList_Item', i1);
                if (i1!= -1) {
                    i2 = strTemp.indexOf('<div class="UIFilterList_Item',i1+1);
                    if (i2==-1) i2 = strTemp.indexOf('</span',i1+1);
                    strDiv = strTemp.slice(i1,i2);
                    i3 = strDiv.indexOf('filter=flp_');
                    if ( i3 != -1) {
                        i4 = strDiv.indexOf('"',i3+11);
                        strId = strDiv.slice(i3+11,i4);
                        i3 = strDiv.indexOf('title="');
                        i4 = strDiv.indexOf('"',i3+7);
                        strName = strDiv.slice(i3+7,i4);

                        strGroups       +=  '<option value="';
                        strGroups       +=  '%22'+codeStrings(strId+'='+strName)+'%22';
                        strGroups       +=  '">'+strName+'</option>';
                    }
                    i1=i2;
                }
            } while (i1 != -1)

            // try to update display
            oForm = document.forms.namedItem('FBAA-Form1');
            if (oForm != null) {
                oForm.elements.namedItem('FBAA-Para-101').innerHTML = strGroups;
                oForm.elements.namedItem('FBAA-Para-101').value = aParams[101];
                oForm.elements.namedItem('FBAA-Para-103').innerHTML = strGroups;
                oForm.elements.namedItem('FBAA-Para-103').value = aParams[103];


            }
        }
    });
}

function checkLanguage(_strHTML) {
	
	var i1, i2;
	var strLang
	
	//<input type=hidden name ="mw_locale" id="mw_locale" value="en_US">
	
	strLang = GM_getValue('Language','en_US');
	
	i1	=	_strHTML.indexOf('id="mw_locale"');
	if (i1!=-1) {
		i1		=	_strHTML.indexOf('value="',i1) + 7 ;
		i2		=	_strHTML.indexOf('"',i1);
		strLang	=	_strHTML.slice(i1,i2);

	    GM_setValue('Language',strLang);
	}		
	
	return strLang;
}


/*****  Listner *****/

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

        var oSpan, oDiv;
        
        for (var i=0;i<5;i++) {
            oSpan = document.getElementById(strFBAASetTabs+i);
            oDiv = document.getElementById(strFBAASetDivs+i);
            if (i==iButton) {
                oSpan.childNodes[0].setAttribute('style',' font-size: 13px; color:black');
                oSpan.childNodes[0].innerHTML = '<b>'+oSpan.childNodes[0].childNodes[0].textContent+'</b>';
                oDiv.style.display = "";
            } else {
                oSpan.childNodes[0].setAttribute('style',' font-size: 13px; color: rgb(59, 89, 152); cursor: pointer;');
                oSpan.childNodes[0].innerHTML = '<a>'+oSpan.childNodes[0].childNodes[0].textContent+'</a>';
                oDiv.style.display = "none";
            }
        }
    }
}

function click_CloseSettings(iButton) {
    return function () {
        var oForm, oItem;
        var oDiv, strTemp;

        if (iButton == 0) {

            for (var i=0;i<5;i++) {
                strTemp = '';
                oForm = document.forms.namedItem('FBAA-Form'+i);
                for (var j=0; j<oForm.length; j++) {
                    if (j>0) strTemp +=';';
                    oItem = oForm.elements.namedItem('FBAA-Para-'+(i*100+j));
                    if (oItem.type == 'checkbox') {
                        strTemp             += oItem.checked;
                        aParams[i*100+j]     = oItem.checked;
                    } else {
                        strTemp             += oItem.value+'';
                        aParams[i*100+j]     = oItem.value;
                    }
                }

                GM_log('FBAA-Form'+i+' = '+strTemp);
                GM_setValue('FBAA-Form'+i,strTemp);
            }
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
    oForm.elements.namedItem('FBAA-Para-101').innerHTML = strGroups;
    oForm.elements.namedItem('FBAA-Para-103').innerHTML = strGroups;
    GM_log(oForm.elements.namedItem('FBAA-Para-101').innerHTML);

    // plug in saved values;
    for (var i=0;i<5;i++) {
        oForm = document.forms.namedItem('FBAA-Form'+i);
        for (var j=0; j<oForm.length; j++) {
            oItem = oForm.elements.namedItem('FBAA-Para-'+(i*100+j));
            if (oItem.type == 'checkbox')
                oItem.checked   = aParams[i*100+j]
            else
                oItem.value     = aParams[i*100+j];
        }
     }

    oDiv = document.getElementById(strFBAASettings);
    oDiv.style.display="";