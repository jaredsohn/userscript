/*//////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            Multiple Windows Live ID's
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @homepage        http://userscripts.org/users/31497
// @description     Multiple accounts to login for all Windows Live services.
// @description     Multiple Windows Live ID's v2.8 RC4
// @copyright       2007 - 2008 Jerone
// @version         v2.8 RC4
// @versiontext     Updated framework.
// @browser         FF3
// @include         http://login.live.com/*
// @include         https://login.live.com/*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////
// ToC:
// - Copyrights
// - History
// - Todo
// - Note
// - Framework
// - Default Settings
// - User Script
// - Statistics
////////////////////////////////////////////////////////////////////////////
THIS  SCRIPT  IS  PROVIDED BY THE AUTHOR `AS IS' AND ANY EXPRESS OR IMPLIED
WARRANTIES,  INCLUDING, BUT  NOT  LIMITED  TO, THE  IMPLIED  WARRANTIES  OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO
EVENT  SHALL  THE  AUTHOR  BE  LIABLE  FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;  LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER  CAUSED  AND  ON  ANY THEORY OF LIABILITY,
WHETHER  IN  CONTRACT, STRICT  LIABILITY, OR  TORT  (INCLUDING NEGLIGENCE OR
OTHERWISE)  ARISING  IN  ANY  WAY  OUT  OF  THE  USE OF THIS SCRIPT, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
////////////////////////////////////////////////////////////////////////////
// History:
// [+] = added; [-] = removed; [/] = fixed; [*] = updated;
// - 02-12-2007 15:00 [v1 Alpha]:
//   [+] initial release;
// - 03-12-2007 01:00 [v1.1 Beta]:
//   [/] fixed bug when user is remembered;
// - 03-12-2007 14:00 [v1.2 Beta]:
//   [*] improved code;
// - 04-02-2008 10:00 [v1.3 Beta]:
//   [*] cleaned code;
//   [+] added US_functions;
// - 19-04-2008 16:00 [v1.4 Beta]:
//   [/] fixed bug;
//   [+] added multilingual support;
//   [*] converted password to normal text;
// - 22-04-2008 16:00 [v1.5 Beta]:
//   [+] added hide/show parts;
// - 24-04-2008 18:30 [v1.6 Beta]:
//   [+] added custom avatars;
//   [+] added show/hide password option;
//   [+] added hide/show parts options;
//   [/] fixed several bugs;
// - 25-04-2008 16:30 [v1.7 Beta]:
//   [/] fixed login with old system;
//   [*] updated style on old system;
// - 27-04-2008 12:30 [v2.0 Beta]:
//   [/] fixed bug with remembered accounts;
//   [/] fixed submit button;
//   [/] fixed small bugs;
//   [+] added remember options;
// - 04-05-2008 19:00 [v2.1 Beta]:
//   [+] added framework check;
//   [+] added US_language;
//   [+] added US_updater;
// - 30-05-2008 19:00 [v2.2 Beta]:
//   [/] fixed framework check;
// - 31-05-2008 10:00 [v2.3 Beta]:
//   [*] cleaned up code;
// - 20-06-2008 13:00 [v2.4 Beta]:
//   [/] fix to many accounts;
//   [+] added default dp image;
// - 23-06-2008 12:00 [v2.5 Beta]:
//   [/] fixed old login link;
// - 30-07-2008 12:00 [v2.5.1 Beta]:
//   [/] fixed bug with login button not working;
// - 08-08-2008 13:00 [v2.6 Alpha]:
//   [+] added settings window;
//   [+] added nickname;
//   [*] improved multiple ids on old login;
//   [/] fixed arrow rotate when hidden;
//   [*] minor updates;
// - 09-08-2008 16:00 [v2.6.1 Alpha]:
//   [*] minor corrections;
// - 16-08-2008 20:30 [v2.6.2 Beta]:
//   [+] added override settings;
//   [*] minor changes;
// - 17-08-2008 16:00 [v2.7 Beta]:
//   [+] added titles for buttons;
//   [+] added auto fill in account;
// - 18-08-2008 12:00 [v2.7.1 Beta]:
//   [/] fixed the old login;
// - 18-08-2008 14:00 [v2.7.2 Beta]:
//   [+] added support for new US_functions;
//   [+] added support for new US_options;
// - 19-08-2008 16:30 [v2.7.3 Beta]:
//   [*] minor improvements;
//   [*] cleaned up code a lot;
// - 02-09-2008 17:30 [v2.7.4 Beta]:
//   [*] cleaned up code;
// - 16-09-2008 15:30 [v2.7.5 RC1]:
//   [/] fixed bug in reset settings;
//   [*] added titles to elements;
// - 17-09-2008 11:15 [v2.7.6 RC2]:
//   [*] more explanation and different cursors;
//   [*] minor improvements;
// - 23-09-2008 16:00 [v2.7.7 RC3]:
//   [/] fixed bug with to long dp name;
//   [+] added Spanish translation;
// - 21-11-2008 21:15 [v2.7.8 RC3];
//   [/] fixed small bug in framework check;
// - 22-11-2008 16:00 [v2.7.9 RC3];
//   [/] fixed small bug in load execution;
// - 14-01-2009 23:00 [v2.8 RC4];
//   [*] updated framework;
////////////////////////////////////////////////////////////////////////////
// Todo:
// - when old login link clicked, set that values into the old login page;
// - regornize when a wrong id/ww is filled in;
// - also hide parts on the old login;
////////////////////////////////////////////////////////////////////////////
// Note:
// - This script does NOT work without it's framework:
//   - US Framework => http://userscripts.org/scripts/show/39678
//   - US Functions => http://userscripts.org/scripts/show/16142
//   - US Language => http://userscripts.org/scripts/show/16143
//   - US Options => http://userscripts.org/scripts/show/31458
//   - US Update => http://userscripts.org/scripts/show/16144
/*//////////////////////////////////////////////////////////////////////////



//*** FRAMEWORK ***//
if(!window.US||!window.US.Framework){if(window.US!==null&&confirm(String.fromCharCode(83,111,109,101,116,104,105,110,103,32,119,101,110,116,32,119,114,111,110,103,32,119,105,116,104,32,116,104,101,32,85,83,32,70,114,97,109,101,119,111,114,107,46,32,92,110,77,97,107,101,32,115,117,114,101,32,105,116,32,105,115,32,105,110,115,116,97,108,108,101,100,32,99,111,114,114,101,99,116,108,121,32,111,114,32,114,101,105,110,115,116,97,108,108,32,116,104,101,32,115,99,114,105,112,116,46,32,92,110,92,110,68,111,32,121,111,117,32,119,97,110,116,32,116,111,32,103,111,32,116,111,32,116,104,101,32,115,99,114,105,112,116,115,32,104,111,109,101,112,97,103,101,63).replace(/\\n/g,"\n")))GM_openInTab("http://userscripts.org/scripts/show/39678");window.US=null;return;}else if(!window.US.Framework())return;

var language=new US.Language({langMod:"browser",locals:{
	'en':{
		'MWLID':{
			'accounts'		: 'Accounts',
			'login'			: 'Login',
			'loginlong'		: 'Click here to login instantly.',

			'settingslong'	: 'Click here to open the settings window.',
			'display'		: 'Display',
			'showpass'		: 'Show passwords as normal text.',
			'showpasshelp'	: 'Enabling this feature let\'s everyone read your password. Be sure to be alone.',
			'showinfo'		: 'Show Windows Live info field.',
			'hideinfo'		: 'Hide Windows Live info field.',
			'showlogin'		: 'Show normal login field.',
			'hidelogin'		: 'Hide normal login field.',
			'showusers'		: 'Show users list.',
			'hideusers'		: 'Hide users list.',
			'info'			: 'Selected = visible and unselected = hidden',

			'wlids'			: 'Windows Live ID\'s',
			'ids'			: 'ID\'s',
			'name'			: 'Name',
			'mail'			: 'E-mail',
			'pass'			: 'Password',
			'image'			: 'Image',  // max 6 characters;
			'dp'			: 'Display Picture',
			'newaccount'	: 'New Account',
			'active'		: 'Active',

			'resetConfirm'	: "This will reset all settings you\'ve made on all tabs!\n\nAre you sure you want to reset all settings?",
			'help'			: 'Help'}},
	'nl':{'MWLID':{'accounts':'Accounten','login':'Aanmelden','loginlong':'Klik hier om meteen in te loggen.','settingslong':'Klik hier om het instellingen venster te openen.','display':'Weergave','showpass':'Geef wachtwoord als normale tekst weer.','showpasshelp':'Activeren van deze optie zorgt ervoor dat iedereen uw wachtwoord kan lezen. Zorg ervoor dat je alleen bent.','showinfo':'Windows Live info veld weergeven.','hideinfo':'Windows Live info veld verbergen.','showlogin':'Normale aanmeld veld weergeven.','hidelogin':'Normale aanmeld veld verbergen.','showusers':'Gebruikerslijst weergeven.','hideusers':'Gebruikerslijst verbergen.','info':'Geselecteerd = zichtbaar en niet geselecteerd = verborgen','wlids':'Windows Live ID\'s','ids':'ID\'s','name':'Naam','mail':'E-mail','pass':'Wachtwoord','image':'Foto','dp':'Display Picture','newaccount':'Nieuw Account','active':'Actief','resetConfirm':"Dit zal alle instellingen op alle tabbladen herstellen!\n\nWeet u zeker dat u alle instellingen wilt herstellen?",'help':'Help'}},
	'es':{'MWLID':{'accounts':'Cuentas','login':'Iniciar Sesión','loginlong':'Haz click aquí para iniciar sesión de inmediato.','settingslong':'Haz click aquí para abrir la ventana de configuración.','display':'Apariencia','showpass':'Mostrar la contraseña como texto normal.','showpasshelp':'Activando esta opción cualquiera puede leer tu contraseña. Asegurate de estar solo.','showinfo':'Mostrar el campo de información de Windows Live.','hideinfo':'Ocultar el campo de información de Windows Live.','showlogin':'Mostrar el campo de inicio de sesión normal.','hidelogin':'Ocultar el campo de inicio de sesión normal.','showusers':'Mostrar la lista de usuarios.','hideusers':'Ocultar la lista de usuarios.','info':'Selecionado = visible ; no seleccionado = oculto','wlids':'ID\'s de Windows Live','ids':'ID\'s','name':'Nombre','pass':'Contraseña','image':'Imagen','dp':'Avatar','newaccount':'Nueva cuenta','active':'Activa','resetConfirm':"Esto reiniciará todas las modificaciones que haz hecho en cada pestaña!\n\nEstás seguro de que quieres reiniciar todas las modificaciones?",'help':'Ayuda'
}}}});

new US.Update({check4Update:true,updateTime:1*60*60*1000,language:"browser",title:"Multiple Windows Live ID's",thisVersion:'v2.8 RC4',versionUrl:15390,updateUrl:15390});

eval(US.Functions.prototype({Array:['switch','clone'],Object:['clone']}));



//*** DEFAULT SETTINGS ***//
const showPassDefault		= false;									// [Boolean] show passwords as normal text;
const showInfoDefault		= true;										// [Boolean] show Windows Live info field;
const showInlogDefault		= true;										// [Boolean] show the normal inlog field;
const showUsersDefault		= true;										// [Boolean] show the users list;
const accountNamesDefault = [											// [Array [String,String,String,String URL]] ([name,mail,password,displayPicture]);
	["account1", "mail1@live.com", "pass1" ,"http://my.picture.png"],		// name				[String] name of account;
	["account2", "mail2@live.com", "pass2" ,"data:image/gif;base64,"],		// mail				[String] e-mail address;
	["account3", "mail3@live.com", "pass3" ,""],							// password			[String] login password;
	["account4", "mail4@live.com", "pass4" ,""],							// displayPicture	[String URL] personal picture;
	["account5", "mail5@live.com", "pass5" ,""]];
const accountActiveDefault	= false;									// [Integer][^false] auto fill in active account (counts from 0);
// [String URL] default personal picture;
const dpDefault				= "data:image/gif;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAg"+
							  "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAwADADAREAAhEBAxEB/8QAGwAAAwADAQEAAAAAAAAAAAAABAUGAQMHAAL/xAAwEAABAwIDBgQFBQAAAAAAAAABAgMEABEFEiETFCIxQWEGMkJRYoGRoc"+
							  "EjUoLC8P/EABoBAAIDAQEAAAAAAAAAAAAAAAMEAQIFAAb/xAAgEQADAAICAwADAAAAAAAAAAAAAQIDERIhBDFBE3GR/9oADAMBAAIRAxEAPwDp6nq9BxMLYM67REijZ8mFLUnPlyp+LSo/IieDFU2Tuq7PDh/enX6jQ0aWDcmpbqVJBSbp"+
							  "OoI5URAmCuqoiBsdJl360twGORpOJMImttrUL88vXU2GlQ4eiVRatKbLIsL6czWcx9En4sgIXHcWjhV0Ip3x6+CuZa7IHBZ0tuU/CdWSkfqN9tbKH3FPzItm9bGxdUeZq+hbZ5zEleVs2+KoUEuxU9JWzibMi972F+6Tf81NIJj7R0XCMd"+
							  "beZSCrW1ZeTDoex5TTjUxK2yknSrYpK5KIPdw3irjg6IIP8iD/AFrRkTuutBOer6Age0ohTZkR1zLtIQV21Kh6O96HbSC40/aHWEQp8YAOMOPt9Ho9lfVPMUrdJjan6H4ztEsBbMNxvTielEJSPlck0PH+/wCE2iWLpCjm86tSffvWghGt"+
							  "mdrU6KbAs6jZKNXFHKgdzVn0dC5PR07wzDZw3DUMnicVxOr91GsTPXKjYxJJDJcSI9dQGRR9SdD9qFyaL8UwGVgsFwjeMzyR6VqJFEnK/hR40T3izAoW4baC3sls62TTPj5XvsFkhEVHlbRF+vJQ71prszckca0F4GEqxNClcmRnt3Og/N"+
							  "CzvoN40+2XcacT1rNqR1UMESeC96FxCcjS7MPvVlJV0LcQmBTakHVKhY0WJBtnMrmPismP6TxJ/wB860cT70C8ydyqP//ZAA==";



//*** USER SCRIPT ***//
$addEvent(window,'load',function(){var MWLID={
	init: function(){
		this.loadSettings();
		this.loadSettingsWindow();
		this.fixM$();
		this.removeGarbage();
		this.loadAccounts();
		this.loadToggles();
	},

	fixM$: function(){
		window.setTimeout(function(){if(typeof(unsafeWindow.onForgetMe)=='function'&&$gi('iUserTileDiv9')){unsafeWindow.onForgetMe(0);}},0);  // Important! Forget user when a user is remembered.
		window.setTimeout(function(){if(typeof(unsafeWindow.dLogin_Mode_DiffUser)=='function'){unsafeWindow.dLogin_Mode_DiffUser();}},0);  // Important! Back to normal inlogfield when a user is remembered.
		unsafeWindow.k_iMaxTiles=(this.accountNames.length+1);  // Important! To override M$ limit of 4 big accounts.
	},

	removeGarbage: function(){
		if(rememberWW=$xs("/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[3]/form/table/tbody/tr[7]/td[2]/table/tbody/tr[2]")){
			$re(rememberWW);
		}
		if(rememberID=$xs("/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[3]/form/table/tbody/tr[7]/td[2]/table/tbody/tr")){
			$re(rememberID);
		}
		window.setTimeout(function(){if(rememberWW=$xs("/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[4]/form/table/tbody/tr[7]/td[2]/table/tbody/tr[2]")){$re(rememberWW);}},1);
		window.setTimeout(function(){if(rememberID=$xs("/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[4]/form/table/tbody/tr[7]/td[2]/table/tbody/tr")){$re(rememberID);}},1);
		if($gi('cbImgTD')){
			$re($gi('cbImgTD'));
		}
		if($gi('moreTD')){
			$sa($gi('moreTD'),'style',"width:0px;");  // can't remove: creats errors;
	}	},

	// ACCOUNTS
	loadAccounts: function(){
		if(this.accountActive || this.accountActive===0){
			this.fillIn(this.accountActive);
			window.setTimeout(function(){MWLID.fillIn(MWLID.accountActive);},2);
		}
		if($gi('rightTD')){
			if(!$gi('accountsTD')){
				accountsTD = $ce('TD');
				$sa(accountsTD,'id','accountsTD');
				$ia($gi('rightTD'),accountsTD);
			}
			$sa($gi('accountsTD'),'style','width:350px; padding:0 10px;');
			$ih($gi('accountsTD'),this.importAccounts());
			$sa($gi('rightTD'),'style','border-right:1px solid #DDDDDD;');
			$addEvent($gi('MWLIDsettings'),'click',function(){US_options.open();});
			for(var x=0;x<this.accountNames.length;x++){
				eval('$addEvent($gi("iUserBtn'+x+'"),"click",function(){MWLID.fillIn('+x+')})');
			}
			if(this.accountNames.length<=0){
				this.toggleUsers();
		}	}
		else if(rightTD=$xs("/html/body/table/tbody/tr[2]/td[2]")){
			if(!$gi('accountsTDSmp')){
				accountsTD = $ce('TD');
				$sa(accountsTD,'id','accountsTDSmp');
				$ib(rightTD,accountsTD);
			}
			$sa($gi('accountsTDSmp'),'style','padding:20px 20px 20px 0px; vertical-align:top;');
			$ih($gi('accountsTDSmp'),this.importAccountsSimple());
			$sa($xs('/html/body/table/tbody/tr/td'),'colspan','3');
			$sa($xs('/html/body/table/tbody/tr[3]/td'),'colspan','3');
			$addEvent($gi('MWLIDsettingsSmp'),'click',function(){US_options.open();});
			for(var x=0;x<this.accountNames.length;x++){
				eval('$addEvent($gi("iUserBtnSmp'+x+'"),"click",function(){MWLID.fillIn('+x+')})');
				eval('$addEvent($gi("iUserBtnSmp'+x+'"),"mouseover",function(){$sa($gi("iUserBtnSmp'+x+'"),"style","background-color:#F1F1F1; color:red; cursor:pointer;")})');
				eval('$addEvent($gi("iUserBtnSmp'+x+'"),"mouseout",function(){$sa($gi("iUserBtnSmp'+x+'"),"style","")})');
	}	}	},

	importAccounts: function(){	
		var iUserBtn =	'\n<table cellspacing="0" cellpadding="0" style="width:100%;"><tbody><tr><td align="right" style="padding-bottom:2px;">'+
							'\n<table cellspacing="0" cellpadding="0"><tbody><tr><td class="cssBtnBorder cssBtnDefault"><nobr><input type="submit" class="cssBtn" style="background-image: url(images/utbkgnd.gif);" title="'+language.localise(["MWLID","settingslong"])+'" value="  '+language.localise(["common","settings"])+'  " name="SI" id="MWLIDsettings"/></nobr></td></tr></tbody></table>'+
						'\n</td></tr><tr><td>'+
							'\n<div style="overflow-x:hidden; overflow-y:scroll; display:block; height:270px; border-top:1px solid #DDDDDD; border-bottom:1px solid #DDDDDD;">';
		for(var i=0;i<this.accountNames.length;i++){
			iUserBtn += 
			'\n<div class="cssUserBtn" id="iUserBtn'+i+'" onmouseover="onInUT('+i+');" onmouseout="onOutUT('+i+');" >'+
				'\n<table class="cssUT" id="iUserBtnT'+i+'" cellspacing="0" cellpadding="0">'+
					'<tr><td class="cssImageTD cssIndent" rowspan="5" style="padding:3px 8px 3px 3px;">'+
						'<img id="ut" style="height:48px;width:48px;" title="'+this.accountNames[i][0]+'" alt="'+this.accountNames[i][0]+'" src="'+(this.accountNames[i][3]?this.accountNames[i][3]:dpDefault)+'">'+
					'</td><td>&nbsp;</td></tr><tr>'+
						'<td class="cssUsernameTD" colspan="3">'+
							'<a class="cssUsername" id="SUName'+i+'" href="https://login.live.com/" ><label title="'+this.accountNames[i][1]+'">'+this.accountNames[i][0]+'</label></a>'+
						'</td><td id="idSIBtn'+i+'" style="display:none;">'+
							'<div class="cssBtnBorder cssBtnDefault" id="SIBtnHov'+i+'" style="margin-top:1px; margin-right:5px;">'+
								'<nobr><input type="submit" class="cssBtn" title="'+language.localise(["MWLID","loginlong"])+'" value="   '+language.localise(["MWLID","login"])+'   " name="SI" id="idSIButton'+i+'" onclick="window.setTimeout(\'f1.submit();\',1);" style="background-image: url(http://login.live.com/pp500/images/btnbkgnd_hot.gif);"/></nobr>'+
							'</div>'+ 
						'</td>'+
					'</tr><tr><td colspan="5">&nbsp;</td></tr>'+
				'</table>'+
			'</div>';
		}
		iUserBtn+="\n</td></tr></tbody></table></div>";
		return iUserBtn;
	},

	importAccountsSimple: function(){
		var iUserBtn =	'\n<table class="css0086" cellspacing="0" cellpadding="0"><tr><td class="css0144 css0113 css0002">'+
							'\n<table cellspacing="0" cellpadding="0" class="css0113"><tbody><tr><td class="css0002">'+language.localise(["MWLID","accounts"])+'</td><td valign="middle" align="right" class="css0029"><nobr><a id="MWLIDsettingsSmp" href="javascript:void(0);" title="'+language.localise(["MWLID","settingslong"])+'">'+language.localise(["common","settings"])+'</a></nobr></td></tr></tbody></table>'+
						'\n</td></tr><tr><td class="css0006">'+
							'\n<div style="overflow-y:auto; max-height:200px;"><ul style="margin-bottom:0px; margin-left:22px;">';
		for(var i=0;i<this.accountNames.length;i++){
			iUserBtn += '\n<li id="iUserBtnSmp'+i+'" title="'+this.accountNames[i][1]+'" ><span style="color:black;">'+this.accountNames[i][0]+'</span></li>';
		}
		iUserBtn+='\n</ul></div></td></tr><tr><td class="css0147"><span class="css0175"><a href="http://userscripts.org/scripts/show/15390" title="http://userscripts.org/scripts/show/15390">Multiple Windows Live ID\'s</a></span><br/><span class="css0029"><a href="http://jervw.freehostia.com" title="http://jervw.freehostia.com">&copy; Jerone Productions</a></span></td></tr></table>';
		return iUserBtn;
	},

	fillIn: function(i){
		if($gi("i0116",top.document)){
			$gi("i0116",top.document).value = this.accountNames[i][1];
			$sa($gi("i0116",top.document),'style','border:1px solid #4A95C9; padding:2px 1px;');
		}
		if($gi("i0118",top.document)){
			if(this.showPass===true){
				$sa($gi("i0118",top.document),'type','');
			}
			$gi("i0118",top.document).value = this.accountNames[i][2];
			$sa($gi("i0118",top.document),'style','border:1px solid #4A95C9; padding:2px 1px;');
	}	},

	// TOGGLES
	loadToggles: function(){
		if($gi('leftTD')){
			losseTDinfo=$ce('td');
			$sa(losseTDinfo,'id','losseTDinfo');
			$addEvent(losseTDinfo,'mouseup',function(){MWLID.toggleInfo()});
			$ib($gi('leftTD'),losseTDinfo);
			$ib($gi('moreTD'),$ce('td'));
			if(this.showInfo===false){$hs($gi('leftTD'),0,"",true);}
			else{$hs($gi('leftTD'),1,"",true);}
			this.toggleStyle($gi('leftTD'),$gi('losseTDinfo'),language.localise(["MWLID","hideinfo"]),language.localise(["MWLID","showinfo"]));
		}

		if($gi('rightTD')){
			losseTDinlog=$ce('td');
			$sa(losseTDinlog,'id','losseTDinlog');
			$addEvent(losseTDinlog,'mouseup',function(){MWLID.toggleInlog()});
			$ib($gi('rightTD'),losseTDinlog);
			$ib($gi('moreTD'),$ce('td'));
			if(this.showInlog===false){$hs($gi('rightTD'),0,"",true);}
			else{$hs($gi('rightTD'),1,"",true);}
			this.toggleStyle($gi('rightTD'),$gi('losseTDinlog'),language.localise(["MWLID","hidelogin"]),language.localise(["MWLID","showlogin"]));
		}

		if($gi('accountsTD')){
			losseTDusers=$ce('td');
			$sa(losseTDusers,'id','losseTDusers');
			$addEvent(losseTDusers,'mouseup',function(){MWLID.toggleUsers()});
			$ib($gi('accountsTD'),losseTDusers);
			$ib($gi('moreTD'),$ce('td'));
			if(this.showUsers===false){$hs($gi('accountsTD'),0,"",true);}
			else{$hs($gi('accountsTD'),1,"",true);}
			this.toggleStyle($gi('accountsTD'),$gi('losseTDusers'),language.localise(["MWLID","hideusers"]),language.localise(["MWLID","showusers"]));
	}	},
	
	toggleImg: function(situ){
		var img;
		switch(situ){
			case 1:  // >
				img="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHBJREFUeNpi/P//PwMxgJFYhSzIHK55J8G6vidb8IMoIP4Nk2PCYYAsEHOiiICshmEg4ANibc65J/6DMJTPis1EkHWPsZmM4kagKb+gbpQDUsI4PYMEQIreAvFHqC2owcPIyMgHtY4B6oRPMDmAAAMAEEAoZ2oK7FsAAAAASUVORK5CYIIA";
			break;
			case 2:  // <
				img="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAASUlEQVQYlWNgQAV8QKwNxXz///9ngGEYYIUqkgViA865J/6DMDaFMJMMQIoJKoQpgPJZcVqNpBCnG7GajE8hiskoCpE5+DDRCgEFz5neaP3h7wAAAABJRU5ErkJgggA=";
			break;
			case 3:  // >:hover
				img="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAQklEQVQYlWNgoCn4lmT+H4SBgA+IWYGYAYZxKdSGKsauECqpjc1kdIUgQT5sJuOyWhaIDYhRaABVjNNqPqgpGJ4BAHfEj3aONIOeAAAAAElFTkSuQmCCAA==";
			break;
			case 4:  // <:hover
				img="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAARUlEQVQYlWP4//8/AxLmA2JtKOZjQAZQBaxQRbJAbPAtyfw/CGNTCDPJAKSYoEKYAiifFafVSApxuhGryfgUopjMQFMAAMdyj3Zfq4jkAAAAAElFTkSuQmCCAA==";
			break;
		}
		return img;
	},
	
	toggleStyle: function(node1,node2,hideTxt,showTxt){
		if($hs(node1,1,true,true)){
			$sa(node2,'style','height:100px; width:11px; background:url("'+this.toggleImg(1)+'") center no-repeat; cursor:pointer;');
			$sa(node2,'title',hideTxt);
			$addEvent(node2,'mouseover',function(){$sa(node2,'style','height:100px; width:11px; background:#4A95C9 url("'+MWLID.toggleImg(3)+'") center no-repeat; cursor:pointer;');});
			$addEvent(node2,'mouseout',function(){$sa(node2,'style','height:100px; width:11px; background:url("'+MWLID.toggleImg(1)+'") center no-repeat; cursor:pointer;');});
		}
		else{
			$sa(node2,'style','height:100px; width:11px; background:url("'+this.toggleImg(2)+'") center no-repeat; cursor:pointer;');
			$sa(node2,'title',showTxt);
			$addEvent(node2,'mouseover',function(){$sa(node2,'style','height:100px; width:11px; background:#4A95C9 url("'+MWLID.toggleImg(4)+'") center no-repeat; cursor:pointer;');});
			$addEvent(node2,'mouseout',function(){$sa(node2,'style','height:100px; width:11px; background:url("'+MWLID.toggleImg(2)+'") center no-repeat; cursor:pointer;');});
	}	},

	toggleInfo: function(){
		$hs($gi('leftTD'),3,"",true);
		this.toggleStyle($gi('leftTD'),$gi('losseTDinfo'),language.localise(["MWLID","hideinfo"]),language.localise(["MWLID","showinfo"]));
		this.showInfo=$hs($gi('leftTD'),1,true,true);
		this.saveSettings();
		this.loadSettingsWindowValues();
	},
	toggleInlog: function(){
		$hs($gi('rightTD'),3,"",true);
		this.toggleStyle($gi('rightTD'),$gi('losseTDinlog'),language.localise(["MWLID","hidelogin"]),language.localise(["MWLID","showlogin"]));
		this.showInlog=$hs($gi('rightTD'),1,true,true);
		this.saveSettings();
		this.loadSettingsWindowValues();
	},
	toggleUsers: function(){
		$hs($gi('accountsTD'),3,"",true);
		this.toggleStyle($gi('accountsTD'),$gi('losseTDusers'),language.localise(["MWLID","hideusers"]),language.localise(["MWLID","showusers"]));
		this.showUsers=$hs($gi('accountsTD'),1,true,true);
		this.saveSettings();
		this.loadSettingsWindowValues();
	},

	helpImg: "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKkSURBVDjLpZPdT5JhGMb9W+BPaK3matVqndXWOOigA6fmJ9DUcrUMlrN0mNMsKTUznQpq6pyKAm8CIogmypcg8GIiX8rHRHjhVbPt6o01nMvZWge/k3vP9duuZ/edAyDnf/hjoCMP2Vr3gUDj3CdV6zT1xZ6iFDaKnLEkBFOmPfaZArWT5sw60iFP+BAbOzTcQSqDZzsNRyCNkcVoaGghzDlVQKylOHJrMrUZ2Yf52y6kc36IxpyoH1lHF7EBgyMKV4jCJ5U/1UVscU4IZOYEa3I1HtwI01hwxlDLhDoJD/wxGr5YGmOLAdRIrVCuhmD3JdA6SQabx12srGB0KSpc86ew4olDOGjH4x4z0gdHDD9+c4TaQQtq+k2Yt0egXYugTmoVZgV9cyHSxXTtJjZR3WNCVfcK/NE0ppYDUNu2QTMCtS0IbrsOrVMOWL27eNJtJLOCDoWXdgeTEEosqPxoBK/TwDzWY9rowy51gJ1dGr2zLpS2aVH5QQ+Hbw88sZ7OClrGXbQrkMTTAQu4HXqUv9eh7J0OSfo7tiIU+GItilpUuM/AF2tg98eR36Q+FryQ2kjbVhximQu8dgPKxPMoeTuH4tfqDIWvCBQ2KlDQKEe9dBlGTwR36+THFZg+QoUxAL0jgsoOQzYYS+wjskcjTzSToVAkA7Hqg4Spc6tm4vgT+eIFVvmb+eCSMwLlih/cNg0KmpRoGzdl+BXOb5jAsMYNjSWAm9VjwesPR1knFilPNMu510CkdPZtqK1BvJQsoaRZjqLGaTzv1UNp9EJl9uNqxefU5QdDnFNX+Y5Qxrn9bDLUR6zjqzsMizeWYdG5gy6ZDbk8aehiuYRz5jHdeDTKvlY1IrhSMUxe4g9SuVwpdaFsgDxf2i84V9zH/us1/is/AdevBaK9Tb3EAAAAAElFTkSuQmCCAA==",

	// SETTINGS
	settingsWindowName: 'MWLID',
	settingsWindowNode: function(){return $gi('USOwindow_'+this.settingsWindowName,top.document).contentDocument},
	loadSettingsWindow: function(){
		var settingsContent='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /><title>MWLID Settings Window</title>'+
							'<style type="text/css">'+
								'/* common */ body{color:CaptionText;font-family:Tahoma,Verdana,Arial;font-size:10pt;}input[type=checkbox]{margin-bottom:1px;}fieldset{border:1px solid ThreeDShadow;padding:5px 8px 10px 8px;}select option{height:16px;}a{color:#0088FF;}input[type=text],input[type=number]{border:1px solid ThreeDShadow; padding:2px 1px;}.USOinp{}.USObtn{}.required{background:Menu top right no-repeat url("data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAHklEQVQImWP4z8DwHx0DSSDGKogmgRBEkkAVhEoAAKhbO8Uz7uXSAAAAAElFTkSuQmCCAA==")}'+
								'/*   tabs */ #USOtabs{display:table;width:100%;min-width:444px;height:24px;}.USOtab{display:inline;background:none;padding:5px 15px;border:1px solid ThreeDShadow;border-bottom:1px solid ThreeDShadow;margin-right:-1px;margin-bottom:-1px;float:left;font-size:8pt;font-weight:normal;font-style:normal;text-decoration:none;color:CaptionText;cursor:pointer;}.USOtab:hover{background:Highlight;color:HighlightText;}.USOtabActive{background:ActiveCaption;color:CaptionText;border-bottom:1px solid transparent;float:left;font-weight:bold;}'+
								'/* fields */ #USOfields{padding:15px 10px 12px 10px;border:1px solid ThreeDShadow;border-bottom:0px none;min-width:422px;}'+
								'/*   note */ #USOnote{border-left:1px solid ThreeDShadow;border-right:1px solid ThreeDShadow;background:none;padding:0px 11px 11px 11px;}'+
								'/* submit */ #USOsubmit{border:1px solid ThreeDShadow;border-top:0px none;background:none;text-align:right;padding:0px 11px 11px 11px;min-width:420px;}#USOsubmit input{width:67px;font-size:11px;padding:2px;}'+
							'</style>'+
							'</head><body>'+
								'<div id="USOtabs"></div>'+
								'<div id="USOfields">'+
									'<fieldset id="USOfield1"><legend>'+language.localise(["common","options"])+'</legend><table width="400px" border="0" cellspacing="0" cellpadding="2"><tr><td colspan="2">'+
										'<fieldset><legend>'+language.localise(["MWLID","display"])+':</legend><table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td width="20px" valign="middle">'+
										'<input name="MWLIDshowPass" type="checkbox" id="MWLIDshowPass" class="USOinp" value="MWLIDshowPass" /></td><td valign="middle"><label for="MWLIDshowPass">'+language.localise(["MWLID","showpass"])+'&nbsp;<img src="'+this.helpImg+'" alt="'+language.localise(["MWLID","help"])+'" name="helpImg2" width="16" height="16" title="'+language.localise(["MWLID","showpasshelp"])+'" style="cursor:help;" /></label></td></tr><tr><td colspan="2" valign="middle"><hr /></td></tr><tr><td valign="middle">'+
										'<input name="MWLIDshowInfo" type="checkbox" id="MWLIDshowInfo" class="USOinp" value="MWLIDshowInfo" /></td><td valign="middle"><label for="MWLIDshowInfo">'+language.localise(["MWLID","showinfo"])+'</label></td></tr><tr><td valign="middle">'+
										'<input name="MWLIDshowInlog" type="checkbox" id="MWLIDshowInlog" class="USOinp" value="MWLIDshowInlog" /></td><td valign="middle"><label for="MWLIDshowInlog">'+language.localise(["MWLID","showlogin"])+'</label></td></tr><tr><td valign="middle">'+
										'<input name="MWLIDshowUsers" type="checkbox" id="MWLIDshowUsers" class="USOinp" value="MWLIDshowUsers" /></td><td valign="middle"><label for="MWLIDshowUsers">'+language.localise(["MWLID","showusers"])+'</label></td></tr><tr><td colspan="2" valign="middle"><hr /></td></tr><tr><td colspan="2" valign="middle"><small>'+language.localise(["MWLID","info"])+'</small></td></tr></table></fieldset></td></tr></table>'+
									'</fieldset>'+
									'<fieldset id="USOfield2"><legend>'+language.localise(["MWLID","wlids"])+'</legend><table width="400px" border="0" cellpadding="2" cellspacing="0"><tr><td colspan="2">'+
										'<fieldset><legend>'+language.localise(["MWLID","ids"])+':</legend><table border="0" cellspacing="0" cellpadding="0" style="width:100%;"><tr><td style="width:100%;">'+
											'<select name="MWLIDids" title="'+language.localise(["MWLID","ids"])+'" size="5" id="MWLIDids" class="USOinp" style="width:100%; height:86px;"><option selected="selected">&nbsp;</option></select></td><td align="right">'+
											'<input name="MWLIDtitleUp_btn" title="'+language.localise(["common","up"])+'" type="submit" class="USObtn" id="MWLIDtitleUp_btn" style="width:25px; height:29px;" value="&#8593;" /><br />'+
											'<input name="MWLIDtitleActive_btn" title="'+language.localise(["MWLID","active"])+'" type="submit" class="USObtn" id="MWLIDtitleActive_btn" style="width:25px; height:30px;" value="#" /><br />'+
											'<input name="MWLIDtitleDown_btn" title="'+language.localise(["common","down"])+'" type="submit" class="USObtn" id="MWLIDtitleDown_btn" style="width:25px; height:29px;" value="&#8595;" /></td><td align="right">'+
											'<input name="MWLIDtitleAdd_btn" title="'+language.localise(["common","add"])+'" type="submit" class="USObtn" id="MWLIDtitleAdd_btn" style="width:25px; height:44px;" value="+" /><br />'+
											'<input name="MWLIDtitleRem_btn" title="'+language.localise(["common","remove"])+'" type="submit" class="USObtn" id="MWLIDtitleRem_btn" style="width:25px; height:44px;" value="-" /></td></tr></table>'+
										'</fieldset></td></tr><tr><td colspan="2">'+
										'<fieldset><legend>'+language.localise(["MWLID","name"])+':</legend><input name="MWLIDname_inp" title="'+language.localise(["MWLID","name"])+'" type="text" id="MWLIDname_inp" style="margin-top:1px; width:345px;" class="USOinp" value="&nbsp;" /><input name="MWLIDname_btn" type="submit" class="USObtn" id="MWLIDname_btn" title="'+language.localise(["common","edit"])+'" style="width:25px; height:24px; vertical-align:top;" value="*" /></fieldset></td></tr><tr><td colspan="2">'+
										'<fieldset><legend>'+language.localise(["MWLID","mail"])+':</legend><input name="MWLIDmail_inp" title="'+language.localise(["MWLID","mail"])+'" type="text" id="MWLIDmail_inp" style="margin-top:1px; width:345px;" class="USOinp" value="&nbsp;" /><input name="MWLIDmail_btn" type="submit" class="USObtn" id="MWLIDmail_btn" title="'+language.localise(["common","edit"])+'" style="width:25px; height:24px; vertical-align:top;" value="*" /></fieldset></td></tr><tr><td colspan="2">'+
										'<fieldset><legend>'+language.localise(["MWLID","pass"])+':</legend><input name="MWLIDpass_inp" title="'+language.localise(["MWLID","pass"])+'" type="password" id="MWLIDpass_inp" style="margin-top:1px; width:345px;" class="USOinp" value="" /><input name="MWLIDpass_btn" type="submit" class="USObtn" id="MWLIDpass_btn" title="'+language.localise(["common","edit"])+'" style="width:25px; height:24px; vertical-align:top;" value="*" /></fieldset></td></tr><tr><td align="left" valign="middle">'+
										'<fieldset style="max-width:48px;"><legend>'+language.localise(["MWLID","image"])+':</legend><table border="0" cellspacing="0" cellpadding="0" style="height:48px; width:48px;"><tr><td align="center" valign="middle"><img id="MWLIDimage" title="'+language.localise(["MWLID","image"])+'" src="'+dpDefault+'" alt="dp" style="width:100%; height:100%;" /></td></tr></table></fieldset></td><td valign="top">'+
										'<fieldset><legend>'+language.localise(["MWLID","dp"])+':</legend><textarea name="MWLIDdp_inp" title="'+language.localise(["MWLID","dp"])+'" cols="" rows="1" wrap="off" id="MWLIDdp_inp" class="USOinp" style="margin-top:1px; width:271px; overflow:scroll;">&nbsp;</textarea><input name="MWLIDdp_btn" type="submit" class="USObtn" id="MWLIDdp_btn" title="'+language.localise(["common","edit"])+'" style="width:25px; height:38px; vertical-align:top;" value="*" /></fieldset></td></tr></table>'+
									'</fieldset>'+
								'</div>'+
								'<div id="USOsubmit"><input name="MWLIDreset" type="submit" class="USObtn" id="MWLIDreset" value="'+language.localise(["common","reset"])+'" title="'+language.localise(["common","reset"])+'" style="float:left;" /><input name="MWLIDok" type="submit" class="USObtn" id="MWLIDok" value="'+language.localise(["common","ok"])+'" title="'+language.localise(["common","ok"])+'" />&nbsp;&nbsp;&nbsp;<input name="MWLIDcancel" type="submit" class="USObtn" id="MWLIDcancel" value="'+language.localise(["common","cancel"])+'" title="'+language.localise(["common","cancel"])+' "/>&nbsp;&nbsp;&nbsp;<input name="MWLIDapply" type="submit" class="USObtn" id="MWLIDapply" value="'+language.localise(["common","apply"])+'"title="'+language.localise(["common","apply"])+'"  /></div>'+
							'</body></html>';
		US_options = new US.Options({
				   name : this.settingsWindowName,
				content : settingsContent,
				addFade : true,
				addTabs : true,
			activeTabNr : 0,
			showAtStart : false,
			endFunction : function(){
							MWLID.loadSettingsWindowButtons();
							MWLID.loadSettingsWindowValues();
						  }
		});
	},
	closeSettingsWindow: function(){
		US_options.close();
	},
	loadSettingsWindowButtons: function(){
		$addEvent($gi('MWLIDok',    this.settingsWindowNode()),'click',function(){MWLID.applySettings();MWLID.closeSettingsWindow();});
		$addEvent($gi('MWLIDapply', this.settingsWindowNode()),'click',function(){MWLID.applySettings();});
		$addEvent($gi('MWLIDcancel',this.settingsWindowNode()),'click',function(){MWLID.closeSettingsWindow();MWLID.loadSettings();MWLID.loadSettingsWindowValues();});
		$addEvent($gi('MWLIDreset', this.settingsWindowNode()),'click',function(){MWLID.resetSettings();});

		this.showPass?$sa($gi('MWLIDpass_inp',this.settingsWindowNode()),'type',''):$sa($gi('MWLIDpass_inp',this.settingsWindowNode()),'type','password');

		$addEvent($gi('MWLIDids',this.settingsWindowNode()),'change',function(){
			$gi('MWLIDname_inp',MWLID.settingsWindowNode()).value = ((x=MWLID.accountNamesTemp[MWLID.curIDindex()]) && typeof x!="undefined" && typeof x[0]!="undefined")?x[0]:"";
			$gi('MWLIDmail_inp',MWLID.settingsWindowNode()).value = ((x=MWLID.accountNamesTemp[MWLID.curIDindex()]) && typeof x!="undefined" && typeof x[1]!="undefined")?x[1]:"";
			$gi('MWLIDpass_inp',MWLID.settingsWindowNode()).value = ((x=MWLID.accountNamesTemp[MWLID.curIDindex()]) && typeof x!="undefined" && typeof x[2]!="undefined")?x[2]:"";
			$gi('MWLIDdp_inp',  MWLID.settingsWindowNode()).value = ((x=MWLID.accountNamesTemp[MWLID.curIDindex()]) && typeof x!="undefined" && typeof x[3]!="undefined")?x[3]:"";
			$gi('MWLIDimage',   MWLID.settingsWindowNode()).src   = ((x=MWLID.accountNamesTemp[MWLID.curIDindex()]) && typeof x!="undefined" && typeof x[3]!="undefined" && x[3]!="")?x[3]:dpDefault;
		});

		$addEvent($gi('MWLIDtitleUp_btn',this.settingsWindowNode()),'click',function(){
			var i = MWLID.curIDindex();
			if(i>0){
				MWLID.accountNamesTemp.switch(i,i-1);
				$ib(MWLID.IDoptions()[i-1],$re(MWLID.IDoptions()[i]));
			}
		});
		$addEvent($gi('MWLIDtitleActive_btn',this.settingsWindowNode()),'click',function(){
			var i = MWLID.curIDindex();
			for(var ii=0; ii<MWLID.IDoptions().length; ii++){
				$ra(MWLID.IDoptions()[ii],"style");
			}
			if(i===MWLID.accountActiveTemp){
				MWLID.accountActiveTemp = false;
			}
			else{
				MWLID.accountActiveTemp = i;
				$sa(MWLID.IDoptions()[i],"style","font-weight:bold;");
			}
			MWLID.IDoptions()[0].selected=true;$w.setTimeout(function(){if(MWLID.IDoptions()[i])MWLID.IDoptions()[i].selected=true;},0);  // bug fix, not selecting edited index;
		});
		$addEvent($gi('MWLIDtitleDown_btn',this.settingsWindowNode()),'click',function(){
			var i = MWLID.curIDindex();
			if(i<MWLID.accountNamesTemp.length-1){
				MWLID.accountNamesTemp.switch(i,i+1);
				$ia(MWLID.IDoptions()[i+1],$re(MWLID.IDoptions()[i]));
			}
		});

		$addEvent($gi('MWLIDtitleAdd_btn',this.settingsWindowNode()),'click',function(){
			var i = MWLID.accountNamesTemp.length;
			MWLID.accountNamesTemp[i]=new Array(4);
			MWLID.IDoptions()[i] = new Option(language.localise(["MWLID","newaccount"]),i);
			MWLID.IDoptions()[i].selected=true;
			$gi('MWLIDname_inp',MWLID.settingsWindowNode()).value = "";
			$gi('MWLIDmail_inp',MWLID.settingsWindowNode()).value = "";
			$gi('MWLIDpass_inp',MWLID.settingsWindowNode()).value = "";
			$gi('MWLIDdp_inp',  MWLID.settingsWindowNode()).value = "";
			$gi('MWLIDimage',   MWLID.settingsWindowNode()).src = dpDefault;

			if(MWLID.IDoptions().length>1){
				$gi('MWLIDtitleUp_btn',  MWLID.settingsWindowNode()).disabled=false;
				$gi('MWLIDtitleDown_btn',MWLID.settingsWindowNode()).disabled=false;
			}
			$gi('MWLIDtitleRem_btn',MWLID.settingsWindowNode()).disabled=false;
		});
		$addEvent($gi('MWLIDtitleRem_btn',this.settingsWindowNode()),'click',function(){
			if(MWLID.IDoptions().length>0){
				var i = MWLID.curIDindex();
				MWLID.accountNamesTemp.splice(i,1);
				$re(MWLID.IDoptions()[i]);
				if(MWLID.IDoptions().length>0){
					if(MWLID.IDoptions()[i]){
						var curIDindex=i;
						MWLID.IDoptions()[0].selected=true;$w.setTimeout(function(){if(MWLID.IDoptions()[i])MWLID.IDoptions()[i].selected=true;},0);  // bug fix, not selecting edited index;
					}
					else{
						var curIDindex=i-1;
						MWLID.IDoptions()[0].selected=true;$w.setTimeout(function(){if(MWLID.IDoptions()[i-1])MWLID.IDoptions()[i-1].selected=true;},0);  // bug fix, not selecting edited index;
					}
					if(i===MWLID.accountActiveTemp){
						MWLID.accountActiveTemp=false;
					}
					if(MWLID.IDoptions().length<=1){
						$gi('MWLIDtitleUp_btn',  MWLID.settingsWindowNode()).disabled=true;
						$gi('MWLIDtitleDown_btn',MWLID.settingsWindowNode()).disabled=true;
				}	}
				else{
					$gi('MWLIDtitleRem_btn',MWLID.settingsWindowNode()).disabled=true;
				}
				$gi('MWLIDname_inp',MWLID.settingsWindowNode()).value = ((x=MWLID.accountNamesTemp[curIDindex]) && typeof x!="undefined" && typeof x[0]!="undefined")?x[0]:"";
				$gi('MWLIDmail_inp',MWLID.settingsWindowNode()).value = ((x=MWLID.accountNamesTemp[curIDindex]) && typeof x!="undefined" && typeof x[1]!="undefined")?x[1]:"";
				$gi('MWLIDpass_inp',MWLID.settingsWindowNode()).value = ((x=MWLID.accountNamesTemp[curIDindex]) && typeof x!="undefined" && typeof x[2]!="undefined")?x[2]:"";
				$gi('MWLIDdp_inp',  MWLID.settingsWindowNode()).value = ((x=MWLID.accountNamesTemp[curIDindex]) && typeof x!="undefined" && typeof x[3]!="undefined")?x[3]:"";
				$gi('MWLIDimage',   MWLID.settingsWindowNode()).src   = ((x=MWLID.accountNamesTemp[curIDindex]) && typeof x!="undefined" && typeof x[3]!="undefined" && x[3]!="")?x[3]:dpDefault;
			}
		});

		$addEvent($gi('MWLIDname_btn',this.settingsWindowNode()),'click',function(){
			var i = MWLID.curIDindex();
			MWLID.accountNamesTemp[i][0]=$gi('MWLIDname_inp',MWLID.settingsWindowNode()).value;
			MWLID.IDoptions()[i].innerHTML=$gi('MWLIDname_inp',MWLID.settingsWindowNode()).value;
			MWLID.IDoptions()[0].selected=true;$w.setTimeout(function(){if(MWLID.IDoptions()[i])MWLID.IDoptions()[i].selected=true;},1);  // bug fix, not selecting edited index;
		});
		$addEvent($gi('MWLIDmail_btn',this.settingsWindowNode()),'click',function(){
			MWLID.accountNamesTemp[MWLID.curIDindex()][1]=$gi('MWLIDmail_inp',MWLID.settingsWindowNode()).value;
		});
		$addEvent($gi('MWLIDpass_btn',this.settingsWindowNode()),'click',function(){
			MWLID.accountNamesTemp[MWLID.curIDindex()][2]=$gi('MWLIDpass_inp',MWLID.settingsWindowNode()).value;
		});
		$addEvent($gi('MWLIDdp_btn',  this.settingsWindowNode()),'click',function(){
			MWLID.accountNamesTemp[MWLID.curIDindex()][3]=$gi('MWLIDdp_inp',  MWLID.settingsWindowNode()).value;
			$gi('MWLIDimage',MWLID.settingsWindowNode()).src=((x=$gi('MWLIDdp_inp',MWLID.settingsWindowNode()).value) && typeof x!="undefined" && x!="")?x:dpDefault;
		});
	},
	loadSettingsWindowValues: function(){
		$gi('MWLIDshowPass', this.settingsWindowNode()).checked = this.showPass;
		$gi('MWLIDshowInfo', this.settingsWindowNode()).checked = this.showInfo;
		$gi('MWLIDshowInlog',this.settingsWindowNode()).checked = this.showInlog;
		$gi('MWLIDshowUsers',this.settingsWindowNode()).checked = this.showUsers;

		$gi('MWLIDname_inp', this.settingsWindowNode()).value = "";
		$gi('MWLIDmail_inp', this.settingsWindowNode()).value = "";
		$gi('MWLIDpass_inp', this.settingsWindowNode()).value = "";
		$gi('MWLIDdp_inp',   this.settingsWindowNode()).value = "";

		$gi('MWLIDimage',    this.settingsWindowNode()).src = dpDefault;

		this.accountNamesTemp=this.accountNames.clone();
		$rc($gi('MWLIDids',this.settingsWindowNode()));
		for(var i=0; i<this.accountNamesTemp.length; i++){
			this.IDoptions()[i] = new Option(this.accountNamesTemp[i][0],i);
		}
		this.accountActiveTemp=this.accountActive;
		if((this.accountActiveTemp || this.accountActiveTemp===0) && this.accountNamesTemp.length>this.accountActiveTemp){
			$sa(this.IDoptions()[this.accountActiveTemp],"style","font-weight:bold;");
		}
		else{
			this.accountActiveTemp=false;
		}

		if(this.IDoptions().length>1){
			$gi('MWLIDtitleUp_btn',  this.settingsWindowNode()).disabled=false;
			$gi('MWLIDtitleDown_btn',this.settingsWindowNode()).disabled=false;
		}
		$gi('MWLIDtitleRem_btn',this.settingsWindowNode()).disabled=false;
	},

	loadSettings: function(){
		this.showPass= (typeof(showPassOverRide)=="boolean"? showPassOverRide: GM_getValue("MWLID.showPass", showPassDefault));
		this.showInfo= (typeof(showInfoOverRide)=="boolean"? showInfoOverRide: GM_getValue("MWLID.showInfo", showInfoDefault));
		this.showInlog=(typeof(showInlogOverRide)=="boolean"?showInlogOverRide:GM_getValue("MWLID.showInlog",showInlogDefault));
		this.showUsers=(typeof(showUsersOverRide)=="boolean"?showUsersOverRide:GM_getValue("MWLID.showUsers",showUsersDefault));
		this.accountNames=(typeof(accountNamesOverRide)!="undefined"&&what.type.of(accountNamesOverRide)=="array"?accountNamesOverRide:eval(GM_getValue("MWLID.accountNames",accountNamesDefault.toSource())));
		this.accountActive=(typeof(accountActiveOverRide)=="integer"||typeof(accountActiveOverRide)=="boolean"?accountActiveOverRide:GM_getValue("MWLID.accountActive",accountActiveDefault));
	},
	applySettings: function(){
		this.showPass= $gi('MWLIDshowPass', this.settingsWindowNode()).checked;
		this.showInfo= $gi('MWLIDshowInfo', this.settingsWindowNode()).checked;
		this.showInlog=$gi('MWLIDshowInlog',this.settingsWindowNode()).checked;
		this.showUsers=$gi('MWLIDshowUsers',this.settingsWindowNode()).checked;
		this.accountNames=this.accountNamesTemp;
		this.accountActive=this.accountActiveTemp;

		this.saveSettings();
		this.executeSettings();
	},
	resetSettings: function(){
		if(confirm(language.localise(['MWLID','resetConfirm']))===true){
			this.showPass= (typeof(showPassOverRide)=="boolean"? showPassOverRide: showPassDefault);
			this.showInfo= (typeof(showInfoOverRide)=="boolean"? showInfoOverRide: showInfoDefault);
			this.showInlog=(typeof(showInlogOverRide)=="boolean"?showInlogOverRide:showInlogDefault);
			this.showUsers=(typeof(showUsersOverRide)=="boolean"?showUsersOverRide:showUsersDefault);
			this.accountNames=this.accountNamesTemp=(typeof(accountNamesOverRide)!="undefined"&&what.type.of(accountNamesOverRide)=="array"?accountNamesOverRide:accountNamesDefault);
			this.accountActive=this.accountActiveTemp=(typeof(accountActiveOverRide)=="integer"||typeof(accountActiveOverRide)=="boolean"?accountActiveOverRide:accountActiveDefault);

			this.saveSettings();
			this.loadSettingsWindowValues();
			this.executeSettings();
	}	},
	saveSettings: function(){
		GM_setValue("MWLID.showPass", this.showPass);
		GM_setValue("MWLID.showInfo", this.showInfo);
		GM_setValue("MWLID.showInlog",this.showInlog);
		GM_setValue("MWLID.showUsers",this.showUsers);
		this.accountNames=this.accountNamesTemp.clone();
		GM_setValue("MWLID.accountNames",this.accountNames.toSource());
		this.accountActive=this.accountActiveTemp;
		GM_setValue("MWLID.accountActive",this.accountActive);
	},
	executeSettings: function(){
		if(this.showPass){
			if($gi("i0118",top.document)){
				$sa($gi("i0118",top.document),'type','');
			}
			$sa($gi('MWLIDpass_inp',this.settingsWindowNode()),'type','');
		}
		else{
			if($gi("i0118",top.document)){
				$sa($gi("i0118",top.document),'type','password');
			}
			$sa($gi('MWLIDpass_inp',this.settingsWindowNode()),'type','password');
		}

		if($gi('leftTD')){
			$hs($gi('leftTD'),(this.showInfo?1:0),"",true);
			this.toggleStyle($gi('leftTD'),$gi('losseTDinfo'),language.localise(["MWLID","hideinfo"]),language.localise(["MWLID","showinfo"]));
		}
		if($gi('rightTD')){
			$hs($gi('rightTD'),(this.showInlog?1:0),"",true);
			this.toggleStyle($gi('rightTD'),$gi('losseTDinlog'),language.localise(["MWLID","hidelogin"]),language.localise(["MWLID","showlogin"]));
		}
		if($gi('accountsTD')){
			$hs($gi('accountsTD'),(this.showUsers?1:0),"",true);
			this.toggleStyle($gi('accountsTD'),$gi('losseTDusers'),language.localise(["MWLID","hideusers"]),language.localise(["MWLID","showusers"]));
		}
		
		if(this.accountActive || this.accountActive===0){
			this.fillIn(this.accountActive);
		}
		else{
			if($gi("i0116",top.document)){
				$gi("i0116",top.document).value = "";
			}
			if($gi("i0118",top.document)){
				$gi("i0118",top.document).value = "";
		}	}
		
		this.loadAccounts();
	},

	curIDindex: function(){
		return $gi('MWLIDids',this.settingsWindowNode()).selectedIndex;
	},
	IDoptions: function(){
		return $gi('MWLIDids',this.settingsWindowNode()).options;
}	}

MWLID.init();  // execute;

},true);



//*** STATISTICS ***//
// Chars (exclude spaces): 42.547
// Chars (include spaces): 46.568
// Chars (Chinese): 0
// Words: 2.618
// Lines: 723