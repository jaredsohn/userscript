// ==UserScript==
// @name           NMX Menu
// @namespace      http://www.worldofshinobi.eu
// @description    Greasemonkey script to simplify life in NMX
// @include        http://s1-nmx.worldofshinobi.eu/*
// @include        http://nmx.worldofshinobi.eu/*
// ==/UserScript==

(
	function (){
		
		const cVersion = "version 4.5";
		const cDomain1 = "s1-nmx.worldofshinobi.eu";
		const cDomain2 = "nmx.worldofshinobi.eu";
		const cPasswd  = "passe";
		const cLogin   = "login";
		const cURL1	= "http://" + cDomain1 + "/";
		const cURL2	= "http://" + cDomain2 + "/";
		const cModeAtk = 2;
		const cModePil = 3;
		GM_registerMenuCommand("Hello, world (simple)", helloSimple);
		
		// =======================================================================================
		// Fonctions generiques pour recuperer des valeurs
		// =======================================================================================
		
		var rGenin   = new RegExp(/name="genin".*wos_limit\(this.value,\'(\d+)\'/);
		var rChuunin = new RegExp(/name="chuunin".*wos_limit\(this.value,\'(\d+)\'/);
		var rJounin  = new RegExp(/name="jounin".*wos_limit\(this.value,\'(\d+)\'/);
		var rCSV     = new RegExp(/(\d+);(.*)$/);
		var rPage14  = new RegExp(/page=14.*id=(\d+)"/);
		
		var aVillages = new Array();
		
		var fDelVar = function ( VarLbl ){ GM_deleteValue( VarLbl ); };
		var fSetStr = function ( VarLbl, VarValue ){ GM_setValue( VarLbl, VarValue); };
		var fSetInt = function ( VarLbl, VarValue ){ GM_setValue( VarLbl, VarValue); };
		
		var fGetStr = function ( VarLbl ) {
			var sRetValue = GM_getValue( VarLbl, sRetValue);
			return (( sRetValue != null ) ? sRetValue : "" );
		};
		
		var fGetInt = function ( VarLbl, VarDefValue) {
			var sRetValue = GM_getValue( VarLbl, VarDefValue);
			return (( sRetValue != null ) ? parseInt(sRetValue) : VarDefValue );
		};
		
		var fSurvey_CLEAN = function (){
			var i;
			var sList = new Array();
			for each (var val in GM_listValues()) {
				if ( val.match(/SURVEY_ID_/) != null ){ sList.push(val); }
			}
			for ( i=0; i < sList.length; i++) { GM_deleteValue(sList[i]); }
			alert("nettoyage termin\351");
		};
		
		var fClean_ALL = function (){
			var sList = new Array();
			if ( confirm(" R\351initialiser le script ? ") ){
				for each (var val in GM_listValues()) { sList.push(val); }
				for ( var i=0; i < sList.length; i++) { GM_deleteValue(sList[i]); }
				alert("nettoyage termin\351");
			}
			gm_menu_hide( 0, 0, 'GmOptions', false);
		};
		
		var fInfo = function (){
			var sDebug = "";
			var sKey = [];
			for each (var sKey in GM_listValues()) {
				if ( sKey.match(/f(ATK_VIL_|ATK_URL_|CLEAN_VIL_|SURVEY_ID_|LOG|ATK_LIST)/) == null ){ 
					sDebug = sDebug + sKey + ":" + GM_getValue(sKey) + "\n";
				}
			}
			alert(sDebug);
		};
		
		var fRequest = function (details) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					var responseState = {
						responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
						responseXML:(xmlhttp.readyState==4 ? xmlhttp.responseXML : ''),
						readyState:xmlhttp.readyState
					}
					if (xmlhttp.readyState==4) {
						if (details["onload"] && xmlhttp.status>=200 && xmlhttp.status<300) { details["onload"](responseState); }
					}
			}
			
			xmlhttp.open(details.method, details.url);
			if (details.headers) {
				for (var prop in details.headers) { xmlhttp.setRequestHeader(prop, details.headers[prop]); }
			}
			xmlhttp.send((typeof(details.data)!='undefined')?details.data:null);
		};
		
		// =======================================================================================
		// Fonctions generiques pour renvoyer la version du script
		// =======================================================================================
		
		var fLog = function (){ if(!confirm(fGetStr("LOG"))){ fSetStr("LOG", ""); }};
		
		var fPost = function ( message ){
			var dtLog = new Date();
			var sMonth = dtLog.getMonth() + 1;
			var sHour = dtLog.toLocaleTimeString() + " " + dtLog.getDate() + "/" + ((sMonth < 10) ? '0' : '' ) + sMonth ;
			fSetStr("LOG", fGetStr("LOG") + "\n" + sHour + " " + message );
		};
		
		// =======================================================================================
		// Fonctions des flags
		// =======================================================================================				
		
		var fSetFlag = function ( bTest, MsgText, VarLbl ){
			fSetInt(VarLbl, 1 - bTest);
			fPost(MsgText + " est " + (( bTest == 1 ) ? "D\351sactiv\351(e) " : "Activ\351(e) " ));
		};
			
		var fGetSonde = function () { return fGetInt("SONDE_FLAG", 0); };
		
		// =======================================================================================
		// Fonctions generiques
		// =======================================================================================
		
		var fReload	= function () { document.location.reload(); };
		var fBack	= function () { window.history.back(); };
		var fOpen	= function ( sURL ) { window.open( sURL ); };
		

		
		// =======================================================================================
		// Fonctions generiques pour le mode SURVEILLANCE
		// =======================================================================================
		
		var fGetCE = function(iSpeed){
			if      ( iSpeed > 197.6 ){  return  1; } 
			else if ( iSpeed > 187.2 ){  return  2; }
			else if ( iSpeed > 176.8 ){  return  3; }
			else if ( iSpeed > 166.4 ){  return  4; }
			else if ( iSpeed > 154.6 ){  return  5; }
			else if ( iSpeed > 135.2 ){  return  6; }
			else if ( iSpeed > 124.8 ){  return  7; }
			else if ( iSpeed > 114.4 ){  return  8; }
			else if ( iSpeed > 104   ){  return  9; }
			else if ( iSpeed > 93.6  ){  return 10; }
			else if ( iSpeed > 83.2  ){  return 11; }
			else if ( iSpeed > 72.8  ){  return 12; }
			else if ( iSpeed > 62.4  ){  return 13; }
			else if ( iSpeed > 52    ){  return 14; }
			else if ( iSpeed > 41.6  ){  return 15; }
			else if ( iSpeed > 31.2  ){  return 16; }
			else if ( iSpeed > 20.8  ){  return 17; }
			else if ( iSpeed > 10.4  ){  return 18; }
			else if ( iSpeed > 5.2   ){  return 19; }
			else { return 20; }
		};
		
		var fSurvey_Alert = function( mName, mID, Duree){
			fRequest({ method: "GET", 
				url: cURL1+"index.php?page=14&id=" + mID,
				onload: function(response) {
					var rRegV = new RegExp(/Distance:\s(\d+)[\.]{0,1}(\d*)\sKm/);
					if( rRegV.exec(response.responseText) != null ){
						var iDistance = parseInt(RegExp.$1);
						if ( RegExp.$2 != "" ){ iDistance = iDistance + parseInt(RegExp.$2)/10 ; }
						var sMessage = "Village : "+ mName +" CE <= "+fGetCE(Duree/iDistance);
						sMessage += " Dur\351e : "+ Duree +" ID : "+ mID +"\nDistance : "+ iDistance ;
						fPost(sMessage);
						if ( GetSilent() == 0 ){ alert(sMessage); }														
					}
				}
			});
		};
		
		var fSurvey_AUTO = function (){
			var dtTG = new Date();
			var dtTGCurrent = dtTG.getTime();
			var sTGNext = fGetStr("SURVEY_DATE");
			var sURLTG  = fGetStr("SURVEY_URL");
			
			if (( sTGNext.match(/\D/) != null ) || (sTGNext == "")) { 
				fSetStr("SURVEY_DATE", "0"); 
				sTGNext = "0";
			}
			var dtTGNext = parseInt(sTGNext);
			if ( sURLTG == "" ){
				fRequest({ method: "GET", 
					url: cURL1 + "index.php?page=2",
					onload: function(response) {
						var lTG   = response.responseText.match(/href="[^"]+".*"Tour\sde\sgarde/ )[0];
						var sTG   = lTG.match(/"[^"]+"/)[0];
						fSetStr( "SURVEY_URL", cURL1 + sTG.match(/[^"]+/)[0] );
					}
				});
			} else if (( dtTGCurrent > dtTGNext ) && ( fGetSurvey() == 1 )){
				dtTGNext =  dtTGCurrent + GetDelayS();
				fSetStr("SURVEY_DATE", ""+ dtTGNext );
				fRequest({ method: "GET", 
					url: sURLTG,
					onload: function(response) {
						var mText = response.responseText;
						var mID, mName, dNow, dEnd, Duree, bListed, i, mAtk, mDts;
						var mH  = mText.match(/Il\sy\sa\sdes\sninjas\s!/g );
						var mC  = mText.match(/Des\sninjas\smarchent\svers\snotre\svillage/g );
						var nbH = ( mH != null ) ? mH.length : 0;
						if ( mC != null ){
							mAtk = mText.match(/page=14.*id=[0-9]+\">[^<]+</g );
							mDts = mText.match(/wos_Decompte\(\d+,\d+,/g );
							for ( i=nbH; i < mAtk.length ; i++ ){
								mID   = mAtk[i].match(/\d+/g)[1];
								mName = mAtk[i].match(/>[^<]+</)[0];
								dNow  = parseInt( mDts[i-nbH].match(/\d+/g)[0] );
								dEnd  = parseInt( mDts[i-nbH].match(/\d+/g)[1] );
								Duree = dEnd - dNow;
								bListed = fGetInt( "SURVEY_ID_"+mID, 0 );
								if ( bListed < dNow ){
									fSetStr( "SURVEY_ID_"+mID, ""+dEnd );
									fSurvey_Alert(mName, mID, Duree);
								}
							}
						}
					}
				});
			}
			setTimeout(fSurvey_AUTO, GetDelayS());
		};
		
		var fGetSurvey	   = function () { return fGetInt("SURVEY_FLAG", 0); };
		var GetSilent	   = function () { return fGetInt("SILENT_FLAG", 0); };
		var GetAttack	   = function () { return fGetInt("ATTACK_FLAG", 0); };
		
		var fFlag_Attack = function () {
			var isAtk = GetAttack();
			fSetFlag( isAtk, "la surveillance des attaques", "ATTACK_FLAG");
			fSetLastReport((isAtk == 0 ) ? ">First<" : ">Last<" );
		};
		
		var fGetLastReport = function ()	 { return fGetStr( "ATTACK_STR"); };
		var fSetLastReport = function (sVal) { fSetStr( "ATTACK_STR", sVal); };
		
		var fReport_AUTO = function (){
			var dtTG = new Date();
			var dtTGCurrent = dtTG.getTime();
			var sTGNext = fGetStr("ATK_DATE");
		
			if (( sTGNext.match(/\D/) != null ) || (sTGNext == "")) { 
				fSetStr("ATK_DATE", "0"); 
				sTGNext = "0";
			}
			var dtTGNext = parseInt(sTGNext);
			if (( dtTGCurrent > dtTGNext ) && ( GetAttack() == 1 )){
				tTGNext =  dtTGCurrent + GetDelayA();
				SetStr("ATK_DATE", ""+ dtTGNext );
				fRequest({ method: "GET", 
					url:  cURL1 +"index.php?page=20",
					onload: function(response) {
						var mReg  = new RegExp(/page=20.*id=(\d+)\".*color\s*:\s*red.*>.*>(.*)<\/span/);
						if( mReg.exec(response.responseText) != null ){
							var LastLine = RegExp.$1;
							var PrevLine = fGetLastReport();
							if ( GetAttack() == 1){
								fSetLastReport(LastLine);
								if (( PrevLine != LastLine ) && ( PrevLine != ">First<" )){
									fReport_Info(LastLine, dtTGCurrent, RegExp.$2);
								}
							}
						}
					}
				});
			}
			setTimeout(fReport_AUTO, GetDelayA());
		};
		
		var fReport_Info = function( mReportID, DateAtk, sName){
			fRequest({ method: "GET", 
				url: cURL1+"index.php?page=20&id=" + mReportID,
				onload: function(response) {
					if( rPage14.exec(response.responseText) != null ){
						var nID = parseInt(RegExp.$1);
						fReport_Alert(nID, DateAtk, sName);
					}
				}
			});
		};
		
		var fReport_Date = function ( nDate, nDist, nCE){
			if	  ( nCE == 20 ){ iSpeed =  5.2; }
			else if ( nCE == 19 ){ iSpeed = 10.4; }
			else if ( nCE == 18 ){ iSpeed = 20.8; }
			else if ( nCE == 17 ){ iSpeed = 31.2; }
			else if ( nCE == 16 ){ iSpeed = 41.6; }
			else if ( nCE == 15 ){ iSpeed =   52; }
			else				 { iSpeed =	0; }
			var dDate = new Date(nDate + nDist*iSpeed*1000);
			var sMonth = dDate.getMonth() + 1;
			var sHour = dDate.toLocaleTimeString() + " " + dDate.getDate() + "/" + ((sMonth < 10) ? '0' : '' ) + sMonth ;
			return sHour;
		};
		
		var fReport_Alert = function( nID, dDate, sName){
			fRequest({ method: "GET", 
				url: cURL1+"index.php?page=14&id=" + nID,
				onload: function(response) {
					var rRegV = new RegExp(/Distance:\s(\d+)[\.]{0,1}(\d*)\sKm/);
					if( rRegV.exec(response.responseText) != null ){
						var iDist = parseInt(RegExp.$1);
						if ( RegExp.$2 != "" ){ iDistance = iDistance + parseInt(RegExp.$2)/10 ; }
						var sMsg = "Village : "+ sName +" ID : "+ nID +" Km : "+ iDist;
						sMsg += "\n retour CE 20 : "+fReport_Date(dDate, iDist, 20);
						sMsg += "\n retour CE 19 : "+fReport_Date(dDate, iDist, 19);
						sMsg += "\n retour CE 18 : "+fReport_Date(dDate, iDist, 18);
						sMsg += "\n retour CE 17 : "+fReport_Date(dDate, iDist, 17);
						sMsg += "\n retour CE 16 : "+fReport_Date(dDate, iDist, 16);
						sMsg += "\n retour CE 15 : "+fReport_Date(dDate, iDist, 15);
						fPost(sMsg);
						if ( GetSilent() == 0 ){ alert(sMsg); }
					}
				}
			});
		};
		
		var fReportAnalyze = function ( nPos, bCheckAtk, nLast ){
			fRequest({ method: "GET", 
				url: cURL1+"index.php?page=20&start=" + nPos,
				onload: function(response) {
					if ( response.responseText.indexOf("Vous n'avez pas de messages") != -1 ){
						alert("Analyze terminee");
					} else {
						var mReg  = new RegExp(/page=20.*id=(\d+)\".*color\s*:\s*green.*>.*>.*<\/span/);
						if( mReg.exec(response.responseText) != null ){
							var nRepID   = RegExp.$1;
							fReport(nPos, nRepID, bCheckAtk, nLast);
						} else {
							fReportAnalyze(nPos+10, bCheckAtk, nLast);
						}
					}
				}
			});
		};
		
		var fReport = function ( nPos, nRepID, bCheckAtk, nLast ){
			fRequest({ method: "GET", 
				url: cURL1+"index.php?page=20&id=" + nRepID,
				onload: function(response) {
					var sTxt  = response.responseText;
					var mList = sTxt.match(/<td style=[^>]*>([^<]*)<\/td>/g);
					var mReg  = new RegExp(/<td style=[^>]*>(\d+)<\/td>/);
					var mIDs  = sTxt.match(/page=14.*id=[0-9]+\"/g)[1];
					if ((mList != null ) && ( rPage14.exec(mIDs) != null )){
						nID = RegExp.$1;
						if ( nID != nLast ){
							if ( bCheckAtk ){
								nGenin   = (mReg.exec(mList[54]) != null ) ? RegExp.$1 : 0;
								nChuunin = (mReg.exec(mList[55]) != null ) ? RegExp.$1 : 0;
								nJounin  = (mReg.exec(mList[56]) != null ) ? RegExp.$1 : 0;
								if (( nGenin > 1 ) || ( nChuunin > 1 ) || ( nJounin > 1 )){
									fPost(cURL1 + "index.php?page=17&idv=" + nID + "&type=1");
								}
							} else {
								nBouffe = (mReg.exec(mList[47]) != null ) ? RegExp.$1 : 0;
								if ( nBouffe != 0 ){
									fPost(cURL1 + "index.php?page=17&idv=" + nID + "&type=1");
								}							
							}
						}
					}
					fReportAnalyze(nPos+1, bCheckAtk, nID, nLast);
				}
			});
		};
		
		// =======================================================================================
		// Fonctions generiques pour positionner le mode FRIGO
		// =======================================================================================
		
		var fGetFrigo_ID	   = function () { return fGetInt("FRIGO_ID", 0); };
		var fGetFrigo_Mode  = function () { return fGetInt("FRIGO_MODE", cModePil); };
		var fGetFrigo	   = function () { return fGetInt("FRIGO_FLAG", 0); };
		
		var Set_Frigo_Mode = function ( iMode ) {
			var sMode = ( iMode == cModePil ) ? "Pillage" : "combat";
			if ( confirm("Enregistrer ce village comme abris pour vos troupes ? (en mode "+sMode+")")){
				var mTmpID = document.location.href.match(/id=\d+/)[0];
				var mID = parseInt(mTmpID.match(/\d+/)[0]);
				fSetInt("FRIGO_ID", mID );
				fSetInt("FRIGO_MODE", iMode );
				fPost("Cible pour protection en mode "+sMode+" enregistr\351e");
			}
		};
		
		var fProtect_AUTO = function () {
			var dtFRIGO = new Date();
			var dtFRIGOCurrent  = dtFRIGO.getTime();
			var dtFRIGONext = fGetInt( "FRIGO_DT", 0 );
			
			if (( dtFRIGOCurrent > dtFRIGONext ) && ( fGetFrigo() != 0 )){
				dtFRIGONext =  dtFRIGOCurrent + GetDelayP();
				fSetStr( "FRIGO_DT", ""+ dtFRIGONext );
				fRequest({ method: "GET", 
					url:	cURL1 + "index.php?page=17&idv=" + fGetFrigo_ID() + "&type=1",
					onload: function(response) {
						var mText = response.responseText;
						var nbTotalNinjas = 0;
						var mW = new RegExp(/attendre\s15\ssecondes/);
						if  ( mW.exec(mText) == null ) {
							var nbG = ( rGenin.exec(mText)   != null ) ? parseInt(RegExp.$1) : 0;
							var nbC = ( rChuunin.exec(mText) != null ) ? parseInt(RegExp.$1) : 0;
							var nbJ = ( rJounin.exec(mText)  != null ) ? parseInt(RegExp.$1) : 0;
							if ((nbG + nbC + nbJ) > fGetInt( "PROTECT_QT", 4 ) ){ 
								fRequest({ method: "POST", 
									url:  cURL1+"pages/form/envoi_troupes.php?idv="+fGetFrigo_ID(),
									data: "genin="+nbG+"&chuunin="+nbC+"&jounin="+nbJ+"&type_attaque="+fGetFrigo_Mode(),
									headers: { 'Content-Type':'application/x-www-form-urlencoded' }
								});
							}
						}
						setTimeout(fProtect_AUTO, GetDelayP());
					}
				}); 
			} else {
				setTimeout(fProtect_AUTO, GetDelayP() );
			}
		};
		
		// =======================================================================================
		// Fonction de gestion des attaques
		// =======================================================================================
		var fPage_ATK = function (){
			var nAtkTeamG = 0;
			var nAtkTeamC = 0;
			var nAtkTeamJ = 0;
			var nAtkTeamM = 0;
			var sHTML = document.body.innerHTML;
			var mRefresh = sHTML.match(/attendre/g);
			
			if  ( mRefresh != null ) {
				setTimeout(fReload,15000);
			} else {
				var mIDVillage = document.location.href.match(/idv=\d+/)[0];
				var bSonde	 = fGetInt( "SONDE_"+mIDVillage, 0 );
				var nVTeamG = ( rGenin.exec(sHTML)   != null ) ? parseInt(RegExp.$1) : 0;
				var nVTeamC = ( rChuunin.exec(sHTML) != null ) ? parseInt(RegExp.$1) : 0;
				var nVTeamJ = ( rJounin.exec(sHTML)  != null ) ? parseInt(RegExp.$1) : 0;
				
				if ( bSonde ){
					// On a defini une equipe de pillage donc on peut positionner 
					var nTeamSG  = GetTeam_nbG("SONDE");
					var nTeamSC  = GetTeam_nbC("SONDE");
					var nTeamSJ  = GetTeam_nbJ("SONDE");
					if (( nVTeamJ >= nTeamSJ ) && ( nVTeamC >= nTeamSC ) && ( nVTeamG >= nTeamSG )){
						nAtkTeamG = nTeamSG;
						nAtkTeamC = nTeamSC;
						nAtkTeamJ = nTeamSJ;
						nAtkTeamM = cModeAtk;
						window.focus();
						fDelVar( "SONDE_"+mIDVillage );
					}
				} else if ( mIDVillage == "idv=" + fGetFrigo_ID()) {
					nAtkTeamG = nVTeamG;
					nAtkTeamC = nVTeamC;
					nAtkTeamJ = nVTeamJ;
					nAtkTeamM = fGetFrigo_Mode();
				} else {
					var nTeamPG  = GetTeam_nbG("PILLAGE");
					var nTeamPC  = GetTeam_nbC("PILLAGE");
					var nTeamPJ  = GetTeam_nbJ("PILLAGE");
					if (( nVTeamJ >= nTeamPJ ) && ( nVTeamC >= nTeamPC ) && ( nVTeamG >= nTeamPG )){
						nAtkTeamG = nTeamPG;
						nAtkTeamC = nTeamPC;
						nAtkTeamJ = nTeamPJ;
						nAtkTeamM = cModePil;
						if(fGetSonde() == 1){
							fSetInt( "SONDE_"+mIDVillage, 1 );
							fOpen( document.location.href );
						}
					}
				}
				
				var form = document.forms[0];
				if ( nAtkTeamG > 0 ) { form.elements[0].value = nAtkTeamG; } 
				if ( nAtkTeamC > 0 ) { form.elements[1].value = nAtkTeamC; }
				if ( nAtkTeamJ > 0 ) { form.elements[2].value = nAtkTeamJ; }
				if ( nAtkTeamM == cModeAtk ){
					form.elements[3].checked=true;
				} else if ( nAtkTeamM == cModePil ){
					form.elements[4].checked=true;
				}
				if ( mIDVillage == "idv=" + fGetFrigo_ID()){
					form.submit();
				}
			}
		};
		
		var fExtract = function (){
			fPost("D\351but extraction");
			fSetInt("ID_MAX", 0);
			fMap(7,7);
		};
		
		var fMap = function (x, y){
			fRequest({ method: "GET", 
				url:	cURL1 + "index.php?page=37&x=" + x + "&y=" + y,
				onload: function(response) {
					var mRefresh = response.responseText.match(/onclick\="show_infos\(.*\);">/g);
					var sFields, sText, sID, sData;
					var rReg1 = new RegExp(";", "g");
					var rReg2 = new RegExp(/show_infos\('(\d+)',\s'(\d+)',\s'(\d+)',\s'(.*)',\s'\d*',\s'(.*)',\s'',\s'\d*',\s'(.*)',\s'',\s'(\d+)',\s'(\d+)'\)/);
					if (( mRefresh != null ) && ( x < fGetInt("POSX_MAX", 1000) )){
						for ( var i = 0; sText = mRefresh[i]; i++){
							sFields = sText.replace(rReg1, "");
							if( rReg2.exec(sFields) != null ){
								sID	 = RegExp.$1;
								if ( aVillages[sID] == undefined ){
									aVillages[sID] = RegExp.$2 + ";" + RegExp.$3 + ";" + RegExp.$4 + ";" + RegExp.$5 + ";" +RegExp.$6 + ";" + RegExp.$7 + ";" + RegExp.$8;
								}
							}
						}
						if ( y == 7 ){
							fMap(x, 22);
						} else {
							fMap(x + 15, 7);
						}
					} else {
						fPost("Fin extraction");
						var sData = "URL;X;Y;Village;Kage;Clan;Pop;Points<br />";
						for ( var i=0; i < aVillages.length ; i++ ){
							if ( aVillages[i] != undefined ){
								sData += cURL1 + "index.php?page=17&idv=" + i + "&type=1;" + aVillages[i] + "<br />";
							}
						}
						
						var div = document.createElement('DIV');
						div.setAttribute('style', 'background: #FFF;color: #000;');
						div.innerHTML = sData;
						document.body.insertBefore(div, document.body.firstChild);
					}
				}
			});
		};
		
		var fVillages = function (){
			var div = document.createElement('DIV');
			div.setAttribute('style', 'background: #FFF;color: #000;');
			div.innerHTML = fGetStr("DATA_VILLAGES");
			fDelVar("DATA_VILLAGES");
			document.body.insertBefore(div, document.body.firstChild);
		};
		
		var fSetConfig = function (){
			var m = document.getElementById('GmOptions');
			if ( m != null ){
				var lVarList = document.getElementsByName('gm_options_vars');
				for ( var i = 0; i < lVarList.length; i++ ){
					fSetInt(lVarList[i].id, parseInt(lVarList[i].value));
				}
			}
			gm_menu_hide( 0, 0, 'GmOptions', false);
		};
		
		var fSonde_Send = function(iMode){
			var mTmpID = document.location.href.match(/id=\d+/)[0];
			var mID = parseInt(mTmpID.match(/\d+/)[0]);
			fRequest({ method: "POST", 
				url:  cURL1+"pages/form/envoi_troupes.php?idv="+mID,
				data: "genin=1&chuunin=0&jounin=0&type_attaque="+iMode,
				headers: { 'Content-Type':'application/x-www-form-urlencoded' }
			});
		};
		
		var fGet_Sondes = function(){ return fGetStr("SONDE_LIST"); };
		
		var fAdd_Sonde  = function(nID) { 
			var sSondes = fGet_Sondes();
			if ( sSondes.indexOf(";"+nID+";") == -1 ){
				fSetStr("SONDE_LIST", ((sSondes == "") ? ";" : sSondes) +nID + ";" );
			}
		};
		
		var fDel_Sonde = function(nID) { 
			var sSondes = fGet_Sondes();
			var reg = new RegExp( ";"+nID+";", "g");
			var sDest = sSondes.replace(reg, ";");
			fSetStr("SONDE_LIST", sDest );
		};
		
		var fIs_Sonde = function (){
			var mTmpID = document.location.href.match(/id=\d+/)[0];
			var mID = parseInt(mTmpID.match(/\d+/)[0]);
			var sIDs = fGetStr("SONDE_LIST");
			return (( sIDs.indexOf(";"+mID+";") == -1 ) ? 0 : 1 );
		};
		
		var fSonde_Vil = function (){
			var mTmpID = document.location.href.match(/id=\d+/)[0];
			var nID = parseInt(mTmpID.match(/\d+/)[0]); 
			if ( fIs_Sonde() != 1 ){	
				fAdd_Sonde(nID);
			} else {
				fDel_Sonde(nID);
			}
		};
		
		var fClan_Convert = function ( sList, iMode){
			if( rCSV.exec(sList) != null ){
				sID	   = RegExp.$1;
				sListNext = RegExp.$2;
				fRequest({ method: "GET", 
					url: cURL1+"index.php?page=16&id=" + sID,
					onload: function(response) {
						if( rPage14.exec(response.responseText) != null ){
							var sTmp = fGetStr("TEMP_LIST");
							fSetStr("TEMP_LIST", sTmp + RegExp.$1 + ";" );
						}
						fClan_Convert(sListNext, iMode);
					}
				});
			} else {
				//On est ici donc TEMP_LIST contient les villages a sonder
				var sTmp = fGetStr("TEMP_LIST");
				fList_Send( sTmp, iMode);
				fDelVar("TEMP_LIST");
			}
		};
		
		var fClan_Send = function (iMode){
			var mVillages = document.body.innerHTML.match(/page=16.*id=[0-9]+\"/g );
			var sText, ID;
			var sList = "";
			if ( mVillages != null ){
				for ( var i = 0; sText = mVillages[i]; i++){
					ID = sText.match(/\d+/g)[1];
					sList += ID + ";";
				}
				fDelVar("TEMP_LIST");
				fClan_Convert(sList, iMode);
			}						
		};
		
		var fList_Send = function ( sList, iMode){
			if( rCSV.exec(sList) != null ){
				sID	   = RegExp.$1;
				sListNext = RegExp.$2;
				fRequest({ method: "POST", 
					url:  cURL1+"pages/form/envoi_troupes.php?idv="+sID,
					data: "genin=1&chuunin=0&jounin=0&type_attaque="+iMode,
					headers: { 'Content-Type':'application/x-www-form-urlencoded' },
					onload:function(response) { fList_Send( sListNext, iMode); }
				});
			} else {
				alert("Fin des envoi de sondes");
				fPost("Fin des envoi de sondes");
			}
		};
		
		var fList_Sonde = function ( sList, sMode){
			if( rCSV.exec(sList) != null ){
				sID	   = RegExp.$1;
				sListNext = RegExp.$2;
				fRequest({ method: "GET", 
					url: cURL1+"index.php?page=16&id=" + sID,
					onload: function(response) {
						if( rPage14.exec(response.responseText) != null ){
							if ( sMode == "add" ){
								fAdd_Sonde(RegExp.$1);
							} else {
								fDel_Sonde(RegExp.$1);
							}
						}
						fList_Sonde(sListNext, sMode);
					}
				});
			} else {
				fPost((( sMode ==1 ) ? "Ajout" : "Retrait" ) + " termin\351");
			}
		};
		
		var fList_Clan = function( iMode ){
			var mVillages = document.body.innerHTML.match(/page=16.*id=[0-9]+\"/g );
			var sText, ID, sList;
			if ( mVillages != null ){
				for ( var i = 0; sText = mVillages[i]; i++){
					ID = sText.match(/\d+/g)[1];
					sList = sList + ID + ";";
				}
				fList_Sonde(sList, iMode);
			}
		};
		
		// =======================================================================================
		// Fonctions generiques pour definir les equipes
		// =======================================================================================
		
		var GetTeam_nbG = function ( type ) { return fGetInt( type + "_TEAM_1", 0); };
		var GetTeam_nbC = function ( type ) { return fGetInt( type + "_TEAM_2", 0); };
		var GetTeam_nbJ = function ( type ) { return fGetInt( type + "_TEAM_3", 0); };
		
		var GetDelayP = function () { return fGetInt("PROTECT_DELAY", 10000 ); };
		var GetDelayS = function () { return fGetInt("SURVEY_DELAY", 10000 ); };
		var GetDelayR = function () { return fGetInt("REPORT_DELAY", 500 ); };
		var GetDelayC = function () { return fGetInt("CNX_DELAY", 5000 ); };
		var GetDelayA = function () { return fGetInt("ATTACK_DELAY", 500 ); };
		
		var inHours = function () { 
			var dtCurrent = new Date();
			var nStart = fGetInt("SCRIPT_HH_START", 360 );
			var nEnd   = fGetInt("SCRIPT_HH_END",   0 );
			var nDate  = 60 * dtCurrent.getHours() + dtCurrent.getMinutes();
			if (( nDate >= nEnd ) && ( nDate < nStart )){
				return false;
			}
			return  true;
		};
		
		var gm_show_options = function (x, y) {
			var aOpt = new Array();
			aOpt[1] =  [ "Interval de Surveillance", "SURVEY_DELAY", 10000 ];
			aOpt[2] =  [ "Interval de Protection", "PROTECT_DELAY", 10000 ];
			aOpt[3] =  [ "Ninjas \340 prot\351ger", "PROTECT_QT", 4 ];
			aOpt[4] =  [ "Dur\351 avant Connexion", "CNX_DELAY", 5000 ];
			aOpt[5] =  [ "Dur\351e d'affichage des rapports", "REPORT_DELAY", 500 ];
			aOpt[6] =  [ "Inteval de controle des attaques",  "ATTACK_DELAY", 500 ];						
			aOpt[7] =  [ "Combat  : Effectif genins", "SONDE_TEAM_1", 0 ];
			aOpt[8] =  [ "Combat  : Effectif chuunins", "SONDE_TEAM_2", 0 ];
			aOpt[9] =  [ "Combat  : Effectif jounins", "SONDE_TEAM_3", 0 ];
			aOpt[10] = [ "Pillage : Effectif genins", "PILLAGE_TEAM_1",	0 ];
			aOpt[11] = [ "Pillage : Effectif chuunins", "PILLAGE_TEAM_2", 0 ];
			aOpt[12] = [ "Pillage : Effectif jounins", "PILLAGE_TEAM_3", 0 ];
			aOpt[13] = [ "Heure de d\351but du script", "SCRIPT_HH_START", 360 ];
			aOpt[14] = [ "Heure de fin du script", "SCRIPT_HH_END", 0 ];
			aOpt[15] = [ "X Max pour les villages", "POSX_MAX", 1000 ];
			var html = '<style>.menLink, div.menLink a {color: #FFF; text-align: left; padding: 0; margin: 0; font-size: 12px; display: inline;}</style>\n<center>';
			html += '<a href="javascript:void(document.getElementById(\'GmOptions\').style.display=\'none\')" class="menLink" id="gm_id_0">[Log]</a> ';
			html += '<a href="javascript:void(document.getElementById(\'GmOptions\').style.display=\'none\')" class="menLink" id="gm_id_D">' + cVersion + '</a>\n';
			html += '<a href="javascript:void(document.getElementById(\'GmOptions\').style.display=\'none\')" class="menLink">[Close]</a></center>\n';
			html += '<hr width=95%>\n<table><col width="200"><col>';
			
			// Rajout des options
			for ( var i= 1; i < aOpt.length ; i++ ){
				html += '<tr><td>&nbsp; '+ aOpt[i][0] +'</td><td><input type="text" name="gm_options_vars" id="'+ aOpt[i][1] +'" size="6" value="'+ fGetInt(aOpt[i][1], aOpt[i][2]) +'"/></td></tr>\n';
			}
			html += '</tr><tr><td>\n&nbsp;<button type="button" id="gm_id_C">Nettoyer</button></td><td>\n<button type="button" id="gm_id_O">Valider</button></td></tr>\n</table></hr>';
			
			if (x == '' || !isFinite(x)) {x = 200;}
			if (y == '' || !isFinite(y)) {y = 200+window.scrollY;}
			
			if (document.getElementById('GmOptions')) {
				div = document.getElementById('GmOptions');
				if (html) {div.innerHTML = html;}
			} else {
				div = document.createElement('DIV');
				div.setAttribute('ID',	'GmOptions');
				div.setAttribute('name',  'GmOptions');
				div.setAttribute('class', 'menLink');
				div.setAttribute('style', 'position: absolute; z-Index: 999; width: 235px; background: rgba(0, 0, 0, 0.6); border: #333 solid 2px; margin: 2px; color: #FFF; font-size: 12px; padding: 2px;');
				div.innerHTML = html;
				document.body.insertBefore(div, document.body.firstChild);
			}
			div.style.left = x + "px";
			div.style.top  = y + "px";
			div.style.display = "block";
		};
		
		// =======================================================================================
		// Gestion du menu principal
		// =======================================================================================
		
		var fMenu = function ( sID ){
			var nID = sID.substring(6);
			
			switch (nID) {
			case "D"  : fInfo(); break;
			case "O"  : fSetConfig(); break;
			case "C"  : fClean_ALL(); break;
			case "0"  : fLog(); break;
			case "1"  : fSurvey_CLEAN(); break;
			case "2"  : Set_Frigo_Mode(cModeAtk); break;
			case "3"  : Set_Frigo_Mode(cModePil); break;
			case "4"  : fSetFlag( fGetSonde(), "les sondes automatiques", "SONDE_FLAG"); break;
			case "5"  : fSetFlag( fGetSurvey(), "la surveillance automatique", "SURVEY_FLAG"); break;
			case "6"  : fSetFlag( fGetFrigo(), "la protection automatique", "FRIGO_FLAG"); break;
			case "7"  : fFlag_Cnx(); break;
			case "8"  : fSetFlag( GetSilent(), "la surveillance silencieuse", "SILENT_FLAG"); break;
			case "9"  : fExtract(); break;
			case "10" : fSonde_Send(cModeAtk) ; break;
			case "11" : fSonde_Send(cModePil) ; break;
			case "12" : fSonde_Vil(); break;
			case "13" : fClan_Send(cModeAtk); break;
			case "14" : fClan_Send(cModePil); break;
			case "15" : fList_Clan("add"); break;
			case "16" : fList_Clan("remove"); break;
			case "17" : fList_Send( fGet_Sondes(), cModeAtk); break;
			case "18" : fList_Send( fGet_Sondes(), cModePil); break;
			case "19" : fFlag_Attack(); break;
			case "20" : fReportAnalyze(0, true, 0); break;
			case "21" : fReportAnalyze(0, false, 0); break;
			}
		
		};
		
		var gm_show_menu = function ( x, y) {
			var aOpt = new Array();
			aOpt[1] =  [ 0, "", "Nettoyer la surveillance automatique"  ];
			aOpt[2] =  [ 0, "", "Frigo par d\351faut (en mode attaque)" ];
			aOpt[3] =  [ 0, "", "Frigo par d\351faut (en mode pillage)" ];
			aOpt[4]  = [ 0, "&radic;", "Sonde automatique" ];
			aOpt[5]  = [ 0, "&radic;", "Surveillance automatique" ];
			aOpt[6]  = [ 0, "&radic;", "Protection automatique" ];
			aOpt[7]  = [ 0, "&radic;", "Connexion automatique" ];
			aOpt[8]  = [ 0, "&radic;", "Surveillance silencieuse" ];
			aOpt[9]  = [ 0, "", "Extraction des villages" ];
			aOpt[10] = [ 0, "", "Sonder le village (en mode attaque)" ];
			aOpt[11] = [ 0, "", "Sonder le village (en mode pillage)" ];
			aOpt[12] = [ 0, "&radic;", "Village a sonder" ];
			aOpt[13] = [ 0, "", "Sonder le clan (en mode attaque)" ];
			aOpt[14] = [ 0, "", "Sonder le clan (en mode pillage)" ];
			aOpt[15] = [ 0, "", "Ajouter le clan aux sondes" ];
			aOpt[16] = [ 0, "", "Retirer le clan aux sondes" ];
			aOpt[17] = [ 0, "", "Sonder la liste (en mode attaque)" ];
			aOpt[18] = [ 0, "", "Sonder la liste (en mode pillage)" ];
			aOpt[19] = [ 0, "&radic;", "Surveillance des rapports" ];
			aOpt[20] = [ 0, "", "Rapports avec prods" ];
			aOpt[21] = [ 0, "", "Rapports avec nourriture" ];
			
			var mURL = document.location.href;
			if ( mURL.indexOf( cDomain1 ) != -1 ){
				if ( mURL == fGetStr("SURVEY_URL") ) { 
					// On est sur la tour de garde
					aOpt[1][0]  = 1; 
					aOpt[8][0]  = 1;
				}
				
				// Critere pour savoir si on est sur la page d'un village
				if ( mURL.match( /index.php\?page\=14\&id\=\d+/ ) != null ){
					aOpt[2][0]   = 1;
					aOpt[3][0]   = 1;
					aOpt[10][0]  = 1;
					aOpt[11][0]  = 1; 
					aOpt[12][0]  = 1;
					if ( fIs_Sonde() == 0 ) { aOpt[12][1] = "&times;"; }
					// Critere pour savoir si on est sur la carte
				} else if ( mURL.match( /index.php\?page\=15\&id\=\d+/ ) != null ){
					aOpt[13][0]  = 1;
					aOpt[14][0]  = 1;
					aOpt[15][0]  = 1;
					aOpt[16][0]  = 1;
				} else if ( mURL.match( /index.php\?page\=37/ ) != null ){
					aOpt[9][0]  = 1;
					aOpt[20][0] = 1;
					aOpt[21][0] = 1;
				} else {
					if ( fGetLogin() != "" ) { aOpt[7][0] = 1; }
					// Positionnement de la sonde automatique
					if ( GetTeam_nbG("SONDE") > 0 || GetTeam_nbC("SONDE") > 0 || GetTeam_nbJ("SONDE") > 0 ){ 
						aOpt[4][0] = 1; 
						if ( fGetSonde() == 0 ) { aOpt[4][1] = "&times;"; }
					}
					// Positionnement de la surveillance automatique
					aOpt[5][0] = 1;
					if ( fGetSurvey()   == 0 ) { aOpt[5][1] = "&times;"; }
					// Si on a defini son frigo, on peut activer le mode protection automatique
					if ( fGetFrigo_ID() != 0 ) { aOpt[6][0] = 1; }
					if ( fGetFrigo()	== 0 ) { aOpt[6][1] = "&times;"; }
					// Configuration de la deconnexion
					aOpt[17][0] = 1;
					aOpt[18][0] = 1;
					aOpt[19][0] = 1;
					if ( GetSilent()   == 0 ) { aOpt[8][1]  = "&times;"; }
					if ( GetAttack()   == 0 ) { aOpt[19][1] = "&times;"; }
				}
			} else if ( mURL.indexOf( "connexion.html" ) != -1 ) {
				aOpt[7][0] = 1;
				if ( fGetLogin() == "" ) { aOpt[7][1] = "&times;"; }					
			}
			
			var html = '<style>.menLink, div.menLink a {color: #FFF; text-align: left; padding: 0; margin: 0; font-size: 12px; display: inline; }</style>\n';
			html += '<center><a id="gm_id_0" href="javascript:void()">[Log]</a> <a id="gm_id_D" href="javascript:void()">' + cVersion + '</a> \n';
			html += '<a href="javascript:void(document.getElementById(\'GmMenu\').style.display=\'none\')" class="menLink">[Close]</a></center>\n';
			html += '<hr width=95%>\n<table><col width="25" align="center"><col>';
			
			// Rajout des options
			for ( var i= 1; i < aOpt.length ; i++ ){
				if ( aOpt[i][0] == 1 ){ html += '<tr><td> '+ aOpt[i][1] +' </td><td><a id="gm_id_'+i+'" href="javascript:void()" class="menLink">' + aOpt[i][2] + '</a></td></tr>\n'; }
			}
			html += '</table></hr>';
			
			if (x == '' || !isFinite(x)) {x = 200;}
			if (y == '' || !isFinite(y)) {y = 200+window.scrollY;}
			
			if (document.getElementById('GmMenu')) {
				div = document.getElementById('GmMenu');
				if (html) {div.innerHTML = html;}
			} else {
				div = document.createElement('DIV');
				div.setAttribute('ID', 'GmMenu');
				div.setAttribute('name', 'GmMenu');
				div.setAttribute('class', 'menLink');
				div.setAttribute('style', 'position: absolute; z-Index: 999; width: 235px; background: rgba(0, 0, 0, 0.6); border: #333 solid 2px; margin: 2px; color: #FFF; font-size: 12px; padding: 2px;');
				div.innerHTML = html;
				document.body.insertBefore(div, document.body.firstChild);
			}
			div.style.left = x + "px";
			div.style.top  = y + "px";
			div.style.display = "block";
		};
		
		var gm_menu_hide = function (xC, yC, sObjName, bCheck ){
			m = document.getElementById(sObjName);
			if ( m && m.style.display != "none" ){
				// Si le curseur est dans la meme zone ou que on ne check pas
				if ( ! bCheck ){
					m.style.display = "none";
				} else if ( xC < m.offsetLeft || xC > ( m.offsetLeft + m.offsetWidth  ) || yC < m.offsetTop  || yC > ( m.offsetTop  + m.offsetHeight ) ){
					m.style.display = "none";
				}
			}					
		};
		
		var gm_menu_clear = function (e) { 
			if ( e.target && e.target.id ){
				var sId = e.target.id;
				if ( sId.substring(0,6) == "gm_id_" ){  
					fMenu( sId );
				}
			}
			
			gm_menu_hide(e.clientX+window.scrollX, e.clientY + window.scrollY, 'GmMenu', false);
			gm_menu_hide(e.clientX+window.scrollX, e.clientY + window.scrollY, 'GmOptions', true);
			return true;
		};
		
		var gm_menu = function (e) {
			if ( e.ctrlKey ){
				gm_menu_hide(e.clientX+window.scrollX, e.clientY+window.scrollY, 'GmMenu', false);
				gm_show_options(e.clientX+window.scrollX, e.clientY+window.scrollY);
			} else if ( e.shiftKey ) {
				return true;
			} else {
				gm_menu_hide(e.clientX+window.scrollX, e.clientY+window.scrollY, 'GmOptions', false);
				gm_show_menu(e.clientX+window.scrollX, e.clientY+window.scrollY);
			}
			e.preventDefault();
			e.returnValue = false;
			e.stopPropagation();
			return false;
		};
		
		// =======================================================================================
		// Script principal
		// =======================================================================================
		var mainScript = function (){
			var sURL  = document.location.href;
			
			if ( document.body.innerHTML.length < 100 ){ 
				document.location.assign(cURL2+"connexion.html"); 
			} else if ( document.location.hostname == cDomain1 ){
				if ( inHours() ){
					setTimeout(fSurvey_AUTO, 1050);
					setTimeout(fProtect_AUTO, 500);
					setTimeout(fReport_AUTO,   50);
					
					// Critere pour savoir si on est sur l ecran d'attaque
					if ( sURL.match( /index.php\?page\=17\&idv=\d+\&type\=1/ ) != null ){   
						fPage_ATK();
					} else if ( sURL.match( /index.php\?page\=20\&maj=1\&id\=\d+/ ) != null ){
						setTimeout(fBack, GetDelayR());
					}
				} else {
					document.location.assign(cURL2+"connexion.html");
				}
			} else {
				if ( sURL.match( /^http:\/\/.*\/$/ ) != null ) {
					document.location.assign(cURL2+"connexion.html");
				} else if ( sURL.match( /^http:\/\/.*\/connexion\.html$/ ) != null ){
					if ( inHours() ){
						var nDelay = GetDelayC();
						setTimeout(fPage_CNX, nDelay );
						if ( nDelay > 5000 ){ fPost("Attente pendant "+ nDelay/1000 + " secondes"); }
					} else {
						setTimeout(fReload, 600000); 
					}
				}
				//Si il y'a un probleme de deconnexion
			}
		};
		
		// On est forcement sur la page du jeu. On controle si on va fermer la fenetre
		if (( document.location.href == cURL1 + 'index.php?page=8&id=1' ) && ( window.history.length == 2 )){ 
			window.close(); 
		} else {
			window.addEventListener("contextmenu", gm_menu, true);
			window.addEventListener("mousedown", gm_menu_clear, false);
			document.addEventListener("DOMContentLoaded", mainScript, false);
		}
})();

// FIN DU SCRIPT -- DES CARACTERES SONT NECESSAIRES