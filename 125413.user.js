// ==UserScript==
// @name           Menu WOS
// @namespace      http://worldofshinobi.eu/
// @description    Petit script Greasemonkey pour se simplifier la vie sur WOS
// @include        http://worldofshinobi.eu/*
// @include        http://s1.worldofshinobi.eu/*
// @include        http://www.worldofshinobi.eu/*
// ==/UserScript==

(
        function (){
                
                var sVersion = "version 1.0";
                var sDomain1 = "s1.worldofshinobi.eu";
                var sDomain2 = "www.worldofshinobi.eu";
                var sDomain3 = "worldofshinobi.eu";
                var sURL1    = "http://" + sDomain1 + "/";
                var sURL2    = "http://" + sDomain2 + "/";
                var sURL3    = "http://" + sDomain3 + "/";
                var iModeAtk = 2;
                var iModePil = 3;
                
                // =======================================================================================
                // Fonctions generiques pour recuperer des valeurs
                // =======================================================================================
                
                var WOS_DelVar = function ( VarLbl ){ GM_deleteValue( "WOS_"+VarLbl ); };
                var WOS_SetStr = function ( VarLbl, VarValue ){ GM_setValue("WOS_"+VarLbl, VarValue); };
                var WOS_SetInt = function ( VarLbl, VarValue ){ GM_setValue("WOS_"+VarLbl, VarValue); };
                
                var WOS_GetStr = function ( VarLbl ) {
                        var sRetValue = GM_getValue("WOS_"+VarLbl, sRetValue);
                        return (( sRetValue != null ) ? sRetValue : "" );
                };
                
                var WOS_GetInt = function ( VarLbl, VarDefValue) {
                        var sRetValue = GM_getValue("WOS_"+VarLbl, VarDefValue);
                        return (( sRetValue != null ) ? parseInt(sRetValue) : VarDefValue );
                };
                
                var WOS_Survey_CLEAN = function (){
                	var i;
                        var sList = new Array();
                        for each (var val in GM_listValues()) {
                                if ( val.match(/SURVEY_ID_/) != null ){ sList.push(val); }
                        }
                        for ( i=0; i < sList.length; i++) { GM_deleteValue(sList[i]); }
                        alert("nettoyage termin\351");
                };
                
                var WOS_Clean_ALL = function (){
                        var sList = new Array();
                        if ( confirm(" R\351initialiser le script ? ") ){
                        	for each (var val in GM_listValues()) { sList.push(val); }
                        	for ( var i=0; i < sList.length; i++) { GM_deleteValue(sList[i]); }
                        	alert("nettoyage termin\351");
                        }
                        gm_menu_hide( 0, 0, 'GmOptions', false);
                };
                
                var WOS_Info = function (){
                        var sDebug = "";
                        var sKey = [];
                        for each (var sKey in GM_listValues()) {
                                if ( sKey.match(/WOS_(ATK_VIL_|ATK_URL_|CLEAN_VIL_|SURVEY_ID_|LOG|ATK_LIST)/) == null ){ 
                                        sDebug = sDebug + sKey + ":" + GM_getValue(sKey) + "\n";
                                }
                        }
                        alert(sDebug);
                };
                
                var WOS_Request = function (details) {
                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.onreadystatechange = function() {
                                var responseState = {
                                        responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
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
                
                var WOS_Log = function (){ if(!confirm(WOS_GetStr("LOG"))){ WOS_SetStr("LOG", ""); }};
                
                var WOS_Post = function ( message ){
                        var dtLog = new Date();
                        var sMonth = dtLog.getMonth() + 1;
                        var sHour = dtLog.toLocaleTimeString() + " " + dtLog.getDate() + "/" + ((sMonth < 10) ? '0' : '' ) + sMonth ;
                        WOS_SetStr("LOG", WOS_GetStr("LOG") + "\n" + sHour + " " + message );
                };
                
                var WOS_Debug = function ( message ){
                        var dtLog = new Date();
                        var sMonth = dtLog.getMonth() + 1;
                        var sHour = dtLog.toLocaleTimeString() + " " + dtLog.getDate() + "/" + ((sMonth < 10) ? '0' : '' ) + sMonth ;
                        opera.postError( sHour + " " + message );
                };
                
                // =======================================================================================
                // Fonctions des flags
                // =======================================================================================                
                
                var WOS_SetFlag = function ( bTest, MsgText, VarLbl ){
                        WOS_SetInt(VarLbl, 1 - bTest);
                        WOS_Post(MsgText + " est " + (( bTest == 1 ) ? "D\351sactiv\351(e) " : "Activ\351(e) " ));
                };
                
                var GetSonde       = function () { return WOS_GetInt("SONDE_FLAG", 0); };
                
                // =======================================================================================
                // Fonctions generiques
                // =======================================================================================
                
                var autoreload    = function () { document.location.reload(); };
                var autoback      = function () { window.history.back(); };
                var WOS_openInTab = function ( sURL ) { window.open( sURL ); }
                
   
                
                // =======================================================================================
                // Fonctions generiques pour le mode SURVEILLANCE
                // =======================================================================================
                
                var WOS_CE = function(iSpeed){
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
                }
                
                var WOS_Survey_Alert = function( mName, mID, Duree){
                        WOS_Request({ method: "GET", 
                                        url: sURL1+"index.php?page=14&id=" + mID,
                                        onload: function(response) {
                                                var mText = response.responseText;
                                                var rRegV = new RegExp(/Distance:\s(\d+)[\.]{0,1}(\d*)\sKm/);
                                                if( rRegV.exec(mText) != null ){
                                                        var iDistance = parseInt(RegExp.$1);
                                                        if ( RegExp.$2 != "" ){ iDistance = iDistance + parseInt(RegExp.$2)/10 ; }
                                                        var sMessage = "Village : "+ mName +" CE <= "+WOS_CE(Duree/iDistance);
                                                        sMessage = sMessage +" Dur\351e : "+ Duree +" ID : "+ mID +"\nDistance : "+ iDistance ;
                                                        WOS_Post(sMessage);
                                                        if ( GetSilent() == 0 ){ alert(sMessage); }                                                        
                                                }
                                        }
                        });
                }
                
                var WOS_Survey_AUTO = function (){
                        
                        var dtTG = new Date();
                        var dtTGCurrent = dtTG.getTime();
                        var sTGNext = WOS_GetStr("SURVEY_DATE");
                        var sURLTG  = WOS_GetStr("SURVEY_URL");
                        
                        if (( sTGNext.match(/\D/) != null ) || (sTGNext == "")) { 
                                WOS_SetStr("SURVEY_DATE", "0"); 
                                sTGNext = "0";
                        }
                        var dtTGNext = parseInt(sTGNext);
                        if ( sURLTG == "" ){
                                WOS_Request({ method: "GET", 
                                                url: sURL1 + "index.php?page=2",
                                                onload: function(response) {
                                                        var mText = response.responseText;
                                                        var lTG   = mText.match(/href="[^"]+".*"Tour\sde\sgarde/ )[0];
                                                        var sTG   = lTG.match(/"[^"]+"/)[0];
                                                        WOS_SetStr( "SURVEY_URL", sURL1 + sTG.match(/[^"]+/)[0] );
                                                }
                                });
                        } else if (( dtTGCurrent > dtTGNext ) && ( GetSurvey() == 1 )){
                                dtTGNext =  dtTGCurrent + GetDelayS();
                                WOS_SetStr("SURVEY_DATE", ""+ dtTGNext );
                                WOS_Request({ method: "GET", 
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
                                                                                bListed = WOS_GetInt( "SURVEY_ID_"+mID, 0 );
                                                                                if ( bListed < dNow ){
                                                                                        WOS_SetStr( "SURVEY_ID_"+mID, ""+dEnd );
                                                                                        WOS_Survey_Alert(mName, mID, Duree);
                                                                                }
                                                                        }
                                                        }
                                                }
                                });
                        }
                        setTimeout(WOS_Survey_AUTO, GetDelayS());
                };
                
                var GetSurvey       = function () { return WOS_GetInt("SURVEY_FLAG", 0); };
                var GetSilent       = function () { return WOS_GetInt("SILENT_FLAG", 0); };
                var GetAttack       = function () { return WOS_GetInt("ATTACK_FLAG", 0); };
                var WOS_Flag_Attack = function () { 
                        var isAtk = GetAttack();
                        WOS_SetFlag( isAtk, "la surveillance des attaques", "ATTACK_FLAG");
                        SetReport_Last((isAtk == 0 ) ? ">First<" : ">Last<" );
                };
                
                var GetReport_Last = function ()     { return WOS_GetStr( "ATTACK_STR"); };
                var SetReport_Last = function (sVal) { WOS_SetStr( "ATTACK_STR", sVal); };
                
                var WOS_Report_AUTO = function (){
                        var dtTG = new Date();
                        var dtTGCurrent  = dtTG.getTime();
                        var sTGNext  = WOS_GetStr("ATK_DATE");
                        
                        if (( sTGNext.match(/\D/) != null ) || (sTGNext == "")) { 
                                WOS_SetStr("ATK_DATE", "0"); 
                                sTGNext = "0";
                        }
                        var dtTGNext = parseInt(sTGNext);
                        if (( dtTGCurrent > dtTGNext ) && ( GetAttack() == 1 )){
                                dtTGNext =  dtTGCurrent + GetDelayA();
                                WOS_SetStr("ATK_DATE", ""+ dtTGNext );
                                WOS_Request({ method: "GET", 
                                                url:  sURL1 +"index.php?page=20",
                                                onload: function(response) {
                                                        var mText = response.responseText;
                                                        var mReg  = new RegExp(/page=20.*id=(\d+)\".*color\s*:\s*red.*>.*>(.*)<\/span/);
                                                        if( mReg.exec(mText) != null ){
                                                                var LastLine = RegExp.$1;
                                                                var PrevLine = GetReport_Last();
                                                                if ( GetAttack() == 1){
                                                                	SetReport_Last(LastLine);
                                                                	if (( PrevLine != LastLine ) && ( PrevLine != ">First<" )){
                                                                		WOS_Report_Info(LastLine, dtTGCurrent, RegExp.$2);
                                                                	}
                                                                }
                                                        }
                                                }
                                });
                        }
                        setTimeout(WOS_Report_AUTO, GetDelayA());
                };
                
                var WOS_Report_Info = function( mReportID, DateAtk, sName){
                        WOS_Request({ method: "GET", 
                                        url: sURL1+"index.php?page=20&id=" + mReportID,
                                        onload: function(response) {
                                                var mText = response.responseText;
                                                var rRegV = new RegExp(/page=14.*id=(\d+)\"/);
                                                if( rRegV.exec(mText) != null ){
                                                        var nID = parseInt(RegExp.$1);
                                                        WOS_Report_Alert(nID, DateAtk, sName);
                                                }
                                        }
                        });
                }
                
                var WOS_Report_Date = function ( nDate, nDist, nCE){
                	if      ( nCE == 20 ){ iSpeed =  5.2; }
                	else if ( nCE == 19 ){ iSpeed = 10.4; }
                	else if ( nCE == 18 ){ iSpeed = 20.8; }
                	else if ( nCE == 17 ){ iSpeed = 31.2; }
                	else if ( nCE == 16 ){ iSpeed = 41.6; }
                	else if ( nCE == 15 ){ iSpeed =   52; }
                	else                 { iSpeed =    0; }
                	var dDate = new Date(nDate + nDist*iSpeed*1000);
                	var sMonth = dDate.getMonth() + 1;
                        var sHour = dDate.toLocaleTimeString() + " " + dDate.getDate() + "/" + ((sMonth < 10) ? '0' : '' ) + sMonth ;
			return sHour;                	
                };
                
                var WOS_Report_Alert = function( nID, dDate, sName){
                        WOS_Request({ method: "GET", 
                                        url: sURL1+"index.php?page=14&id=" + nID,
                                        onload: function(response) {
                                                var mText = response.responseText;
                                                var rRegV = new RegExp(/Distance:\s(\d+)[\.]{0,1}(\d*)\sKm/);
                                                if( rRegV.exec(mText) != null ){
                                                        var iDist = parseInt(RegExp.$1);
                                                        if ( RegExp.$2 != "" ){ iDistance = iDistance + parseInt(RegExp.$2)/10 ; }
                                                        var sMsg = "Village : "+ sName +" ID : "+ nID +" Km : "+ iDist;
                                                        sMsg = sMsg +"\n retour CE 20 : "+WOS_Report_Date(dDate, iDist, 20);
                                                        sMsg = sMsg +"\n retour CE 19 : "+WOS_Report_Date(dDate, iDist, 19);
                                                        sMsg = sMsg +"\n retour CE 18 : "+WOS_Report_Date(dDate, iDist, 18);
                                                        sMsg = sMsg +"\n retour CE 17 : "+WOS_Report_Date(dDate, iDist, 17);
                                                        sMsg = sMsg +"\n retour CE 16 : "+WOS_Report_Date(dDate, iDist, 16);
                                                        sMsg = sMsg +"\n retour CE 15 : "+WOS_Report_Date(dDate, iDist, 15);
                                                        WOS_Post(sMsg);
                                                        if ( GetSilent() == 0 ){ alert(sMsg); }                                                        
                                                }
                                        }
                        });
                }
                
                
                // =======================================================================================
                // Fonctions generiques pour positionner le mode FRIGO
                // =======================================================================================
                
                var GetFrigo_ID    = function () { return WOS_GetInt("FRIGO_ID", 0); };
                var GetFrigo_Mode  = function () { return WOS_GetInt("FRIGO_MODE", iModePil); };
                var GetFrigo       = function () { return WOS_GetInt("FRIGO_FLAG", 0); };
                
                var Set_Frigo_Mode = function ( iMode ) {
                	var sMode = ( iMode == iModePil ) ? "Pillage" : "combat";
                	if ( confirm("Enregistrer ce village comme abris pour vos troupes ? (en mode "+sMode+")")){
                                var mTmpID = document.location.href.match(/id=\d+/)[0];
                                var mID = parseInt(mTmpID.match(/\d+/)[0]);
                                WOS_SetInt("FRIGO_ID", mID );
                                WOS_SetInt("FRIGO_MODE", iMode );
                                WOS_Post("Cible pour protection en mode "+sMode+" enregistr\351e");
                        }
                };
                
                var WOS_Protect_AUTO = function () {
                        var dtFRIGO = new Date();
                        var dtFRIGOCurrent  = dtFRIGO.getTime();
                        var dtFRIGONext = WOS_GetInt( "FRIGO_DT", 0 );
                        
                        if (( dtFRIGOCurrent > dtFRIGONext ) && ( GetFrigo() != 0 )){
                                dtFRIGONext =  dtFRIGOCurrent + GetDelayP();
                                WOS_SetStr( "FRIGO_DT", ""+ dtFRIGONext );
                                WOS_Request({ method: "GET", 
                                                url:    sURL1 + "index.php?page=17&idv=" + GetFrigo_ID() + "&type=1",
                                                onload: function(response) {
                                                        var mText = response.responseText;
                                                        var nbTotalNinjas = 0;
                                                        var mG = new RegExp(/name="genin".*wos_limit\(this.value,\'(\d+)\'/);
                                                        	var mC = new RegExp(/name="chuunin".*wos_limit\(this.value,\'(\d+)\'/);
                                                        		var mJ = new RegExp(/name="jounin".*wos_limit\(this.value,\'(\d+)\'/);
                                                        			var mW = new RegExp(/attendre\s15\ssecondes/);
                                                        			if  ( mW.exec(mText) == null ) {
                                                        				var nbG = ( mG.exec(mText) != null ) ? parseInt(RegExp.$1) : 0;
                                                        				var nbC = ( mC.exec(mText) != null ) ? parseInt(RegExp.$1) : 0;
                                                        				var nbJ = ( mJ.exec(mText) != null ) ? parseInt(RegExp.$1) : 0;
                                                        				if ((nbG + nbC + nbJ) > WOS_GetInt( "PROTECT_QT", 4 ) ){ 
                                                        					WOS_Request({ method: "POST", 
                                                        							url:  sURL1+"pages/form/envoi_troupes.php?idv="+GetFrigo_ID(),
                                                        							data: "genin="+nbG+"&chuunin="+nbC+"&jounin="+nbJ+"&type_attaque="+GetFrigo_Mode(),
                                                        							headers: { 'Content-Type':'application/x-www-form-urlencoded' }
                                                        					});
                                                        				}
                                                        			}
                                                        			setTimeout(WOS_Protect_AUTO, GetDelayP());
                                                }
                                }); 
                        } else {
                                setTimeout(WOS_Protect_AUTO, GetDelayP() );
                        }
                };
                
                // =======================================================================================
                // Fonction de gestion des attaques
                // =======================================================================================
                var WOS_Page_ATK = function (){
                        var mG = new RegExp(/name="genin".*wos_limit\(this.value,\'(\d+)\'/);
                        var mC = new RegExp(/name="chuunin".*wos_limit\(this.value,\'(\d+)\'/);
                        var mJ = new RegExp(/name="jounin".*wos_limit\(this.value,\'(\d+)\'/);
                        
                        var nAtkTeamG = 0;
                        var nAtkTeamC = 0;
                        var nAtkTeamJ = 0;
                        var nAtkTeamM = "Aucune";
                        var sHTML = document.body.innerHTML;
                        var mRefresh = sHTML.match(/attendre/g);
                        
                        if  ( mRefresh != null ) {
                        	setTimeout(autoreload,15000);
                        } else {
                        	var mIDVillage = document.location.href.match(/idv=\d+/)[0];
                        	var bSonde     = WOS_GetInt( "SONDE_"+mIDVillage, 0 );
                        	var nVTeamG = ( mG.exec(sHTML) != null ) ? parseInt(RegExp.$1) : 0;
                        	var nVTeamC = ( mC.exec(sHTML) != null ) ? parseInt(RegExp.$1) : 0;
                        	var nVTeamJ = ( mJ.exec(sHTML) != null ) ? parseInt(RegExp.$1) : 0;
                        	
                        	if ( bSonde ){
                        		// On a defini une equipe de pillage donc on peut positionner 
                        		var nTeamSG  = GetTeam_nbG("SONDE");
                        		var nTeamSC  = GetTeam_nbC("SONDE");
                        		var nTeamSJ  = GetTeam_nbJ("SONDE");
                        		if (( nVTeamJ >= nTeamSJ ) && ( nVTeamC >= nTeamSC ) && ( nVTeamG >= nTeamSG )){
                        			nAtkTeamG = nTeamSG;
                        			nAtkTeamC = nTeamSC;
                        			nAtkTeamJ = nTeamSJ;
                        			nAtkTeamM = "Sonde";
                        			window.focus();
                        			WOS_DelVar( "SONDE_"+mIDVillage );
                        		}
                        	} else if ( mIDVillage == "idv=" + GetFrigo_ID()) {
                        		nAtkTeamG = nVTeamG;
                        		nAtkTeamC = nVTeamC;
                        		nAtkTeamJ = nVTeamJ;
                        		nAtkTeamM = ( GetFrigo_Mode() == iModePil ) ? "Pillage" : "Sonde";
                        	} else {
                        		var nTeamPG  = GetTeam_nbG("PILLAGE");
                        		var nTeamPC  = GetTeam_nbC("PILLAGE");
                        		var nTeamPJ  = GetTeam_nbJ("PILLAGE");
                        		if (( nVTeamJ >= nTeamPJ ) && ( nVTeamC >= nTeamPC ) && ( nVTeamG >= nTeamPG )){
                        			nAtkTeamG = nTeamPG;
                        			nAtkTeamC = nTeamPC;
                        			nAtkTeamJ = nTeamPJ;
                        			nAtkTeamM = "Pillage";
                        			if(GetSonde() == 1){
                        				WOS_SetInt( "SONDE_"+mIDVillage, 1 );
                        				WOS_openInTab( document.location.href );
                        			}
                        		}
                        	}
                        	
                        	var form = document.forms[0];
                        	if ( nAtkTeamG > 0 ) { form.elements[0].value = nAtkTeamG; } 
                        	if ( nAtkTeamC > 0 ) { form.elements[1].value = nAtkTeamC; }
                        	if ( nAtkTeamJ > 0 ) { form.elements[2].value = nAtkTeamJ; }
                        	if ( nAtkTeamM == "Sonde" ){
                        		form.elements[3].checked=true;
                        	} else if ( nAtkTeamM == "Pillage" ){
                        		form.elements[4].checked=true;
                        	}
                        	if ( mIDVillage == "idv=" + GetFrigo_ID()){
                        		form.submit();
                        	}
                        }
                };
                
                var WOS_extract = function (){
                	WOS_Post("D\351but extraction");
                	WOS_SetInt("ID_MAX", 0);
                	WOS_Map(7,7);
                };
                
                var WOS_Map = function (x, y){
                        WOS_Request({ method: "GET", 
                                        url:    sURL1 + "index.php?page=37&x=" + x + "&y=" + y,
                                        onload: function(response) {
                                                var mTxt     = response.responseText;
                                                var mRefresh = mTxt.match(/onclick\="show_infos\(.*\);">/g);
                                                var sText, sID, sData, iMax, coordX, coordY, Kage, Village, Pop, Points;
                                                var reg  = new RegExp(";", "g");
                                                var rReg = new RegExp(/show_infos\('(\d+)',\s'(\d+)',\s'(\d+)',\s'(.*)',\s'\d*',\s'(.*)',\s'',\s'\d*',\s'(.*)',\s'',\s'(\d+)',\s'(\d+)'\);">/);
                                                if ( mRefresh != null ){
                                                        for ( var i = 0; sText = mRefresh[i]; i++){
                                                                if( rReg.exec(sText) != null ){
                                                                	sID     = RegExp.$1;
                                                                	coordX  = RegExp.$2;
                                                                	coordY  = RegExp.$3;
                                                                	Village = RegExp.$4;
                                                                	Kage    = RegExp.$5;
                                                                	Clan    = RegExp.$6;
                                                                	Pop     = RegExp.$7;
                                                                	Points  = RegExp.$8;
                                                                	iMax  = WOS_GetInt("ID_MAX", 0);
                                                                	sData = WOS_GetStr("DATA_"+sID);
                                                                	if (sData == "") {
                                                                		sData = sURL1 + "index.php?page=17&idv=" + sID + "&type=1;" + coordX + ";" + coordY + ";" + Village.replace(reg, "") + ";" ;
                                                                		sData = sData + Kage.replace(reg, "") + ";" +Clan.replace(reg, "") + ";" + Pop + ";" + Points + "<br />";
                                                                		WOS_SetStr("DATA_"+sID, sData);
                                                                		if ( sID > iMax ) { WOS_SetInt("ID_MAX", sID); }
                                                                	}
                                                                }
                                                        }
                                                        if ( y == 7 ){
                                                                WOS_Map(x, 22);
                                                        } else {
                                                                WOS_Map(x + 15, 7);
                                                        }
                                                } else {
                                                	WOS_Post("Fin extraction");
                                                	WOS_openInTab(sURL1 + "index.php?page=32");
                                                        // Fini
                                                }
                                        }
                        });
                };
                
                var WOS_SetConfig = function (){
                	var m = document.getElementById('GmOptions');
                	if ( m != null ){
                		var lVarList = document.getElementsByName('gm_options_vars');
                		for ( var i = 0; i < lVarList.length; i++ ){
                			WOS_SetInt(lVarList[i].id, parseInt(lVarList[i].value));
                		}
                	}
                	gm_menu_hide( 0, 0, 'GmOptions', false);
                };
                
                var WOS_Sonde_Send = function(iMode){
                        var mTmpID = document.location.href.match(/id=\d+/)[0];
                        var mID = parseInt(mTmpID.match(/\d+/)[0]);
                        WOS_Request({ method: "POST", 
                                        url:  sURL1+"pages/form/envoi_troupes.php?idv="+mID,
                                        data: "genin=1&chuunin=0&jounin=0&type_attaque="+iMode,
                                        headers: { 'Content-Type':'application/x-www-form-urlencoded' }
                        });
                };
                
                var WOS_Get_Sondes = function(){ return WOS_GetStr("SONDE_LIST"); };
                
                var WOS_Add_Sonde  = function(nID) { 
                        var sSondes = WOS_Get_Sondes();
                        if ( sSondes.indexOf(";"+nID+";") == -1 ){
                                WOS_SetStr("SONDE_LIST", ((sSondes == "") ? ";" : sSondes) +nID + ";" );
                        }
                };
                
                var WOS_Del_Sonde = function(nID) { 
                        var sSondes = WOS_Get_Sondes();
                        var reg = new RegExp( ";"+nID+";", "g");
                        var sDest = sSondes.replace(reg, ";");
                        WOS_SetStr("SONDE_LIST", sDest );
                };
                
                var WOS_Is_Sonde = function (){
                        var mTmpID = document.location.href.match(/id=\d+/)[0];
                        var mID = parseInt(mTmpID.match(/\d+/)[0]);
                        var sIDs = WOS_GetStr("SONDE_LIST");
                        return (( sIDs.indexOf(";"+mID+";") == -1 ) ? 0 : 1 );
                }
                
                var WOS_Sonde_Vil = function (){
                        var mTmpID = document.location.href.match(/id=\d+/)[0];
                        var nID = parseInt(mTmpID.match(/\d+/)[0]); 
                        if ( WOS_Is_Sonde() != 1 ){    
                                WOS_Add_Sonde(nID);
                        } else {
                                WOS_Del_Sonde(nID);
                        }
                        
                };
                
                var WOS_Clan_Convert = function ( sList, iMode){
                        var rReg = new RegExp(/(\d+);(.*)$/);
                        if( rReg.exec(sList) != null ){
                                sID       = RegExp.$1;
                                sListNext = RegExp.$2;
                                WOS_Request({ method: "GET", 
                                                url: sURL1+"index.php?page=16&id=" + sID,
                                                onload: function(response) {
                                                        var mText = response.responseText;
                                                        var rRegV = new RegExp(/page=14.*id=(\d+)"/);
                                                        if( rRegV.exec(mText) != null ){
                                                                var sTmp = WOS_GetStr("TEMP_LIST");
                                                                WOS_SetStr("TEMP_LIST", sTmp + RegExp.$1 + ";" );
                                                        }
                                                        WOS_Clan_Convert(sListNext, iMode);
                                                }
                                });
                        } else {
                                //On est ici donc TEMP_LIST contient les villages a sonder
                                var sTmp = WOS_GetStr("TEMP_LIST");
                                WOS_List_Send( sTmp, iMode);
                                WOS_DelVar("TEMP_LIST");
                        }
                }
                
                var WOS_Clan_Send = function (iMode){
                        var mVillages = document.body.innerHTML.match(/page=16.*id=[0-9]+\"/g );
                        var sText, ID;
                        var sList = "";
                        if ( mVillages != null ){
                                for ( var i = 0; sText = mVillages[i]; i++){
                                        ID = sText.match(/\d+/g)[1];
                                        sList = sList + ID + ";";
                                }
                                WOS_DelVar("TEMP_LIST");
                                WOS_Clan_Convert(sList, iMode);
                        }                        
                };
                
                var WOS_List_Send = function ( sList, iMode){
                        var rReg = new RegExp(/(\d+);(.*)$/);
                        if( rReg.exec(sList) != null ){
                                sID       = RegExp.$1;
                                sListNext = RegExp.$2;
                                WOS_Request({ method: "POST", 
                                                url:  sURL1+"pages/form/envoi_troupes.php?idv="+sID,
                                                data: "genin=1&chuunin=0&jounin=0&type_attaque="+iMode,
                                                headers: { 'Content-Type':'application/x-www-form-urlencoded' },
                                                onload:function(response) {
                                                        var mText = response.responseText;
                                                        WOS_List_Send( sListNext, iMode);
                                                }
                                });
                        } else {
                                alert("Fin des envoi de sondes");
                                WOS_Post("Fin des envoi de sondes");
                        }
                };
                
                var WOS_List_Sonde = function ( sList, sMode){
                        var rReg = new RegExp(/(\d+);(.*)$/);
                        if( rReg.exec(sList) != null ){
                                sID       = RegExp.$1;
                                sListNext = RegExp.$2;
                                WOS_Request({ method: "GET", 
                                                url: sURL1+"index.php?page=16&id=" + sID,
                                                onload: function(response) {
                                                        var mText = response.responseText;
                                                        var rRegV = new RegExp(/page=14.*id=(\d+)"/);
                                                        if( rRegV.exec(mText) != null ){
                                                                if ( sMode == "add" ){
                                                                        WOS_Add_Sonde(RegExp.$1);
                                                                } else {
                                                                        WOS_Del_Sonde(RegExp.$1);
                                                                }
                                                        }
                                                        WOS_List_Sonde(sListNext, sMode);
                                                }
                                });
                        } else {
                                WOS_Post((( sMode ==1 ) ? "Ajout" : "Retrait" ) + " termin\351");
                        }
                };
                
                var WOS_List_Clan = function( iMode ){
                        var mVillages = document.body.innerHTML.match(/page=16.*id=[0-9]+\"/g );
                        var sText, ID, sList;
                        if ( mVillages != null ){
                                for ( var i = 0; sText = mVillages[i]; i++){
                                        ID = sText.match(/\d+/g)[1];
                                        sList = sList + ID + ";";
                                }
                                WOS_List_Sonde(sList, iMode);
                        }
                };
                                
                // =======================================================================================
                // Fonctions generiques pour definir les equipes
                // =======================================================================================
                
                var GetTeam_nbG = function ( type ) { return WOS_GetInt( type + "_TEAM_1", 0); };
                var GetTeam_nbC = function ( type ) { return WOS_GetInt( type + "_TEAM_2", 0); };
                var GetTeam_nbJ = function ( type ) { return WOS_GetInt( type + "_TEAM_3", 0); };
                
                var GetDelayP = function () { return WOS_GetInt("PROTECT_DELAY", 10000 ); };
                var GetDelayS = function () { return WOS_GetInt("SURVEY_DELAY",  10000 ); };
                var GetDelayR = function () { return WOS_GetInt("REPORT_DELAY",    500 ); };
                var GetDelayC = function () { return WOS_GetInt("CNX_DELAY",      5000 ); };
                var GetDelayA = function () { return WOS_GetInt("ATTACK_DELAY",    500 ); };
                
                var inHours = function () { 
                        var dtCurrent = new Date();
                        var nStart = WOS_GetInt("SCRIPT_HH_START", 360 );
                        var nEnd   = WOS_GetInt("SCRIPT_HH_END",   0 );
                        var nDate  = 60 * dtCurrent.getHours() + dtCurrent.getMinutes();
                        if (( nDate >= nEnd ) && ( nDate < nStart )){
                                return false;
                        }
                        return  true;
                };
                
                var gm_show_options = function (x, y) {
                        var aOpt = new Array();
                        aOpt[1] =  [ "Interval de Surveillance",          "SURVEY_DELAY",  10000 ];
                        aOpt[2] =  [ "Interval de Protection",            "PROTECT_DELAY", 10000 ];
                        aOpt[3] =  [ "Ninjas \340 prot\351ger",           "PROTECT_QT",        4 ];
                        aOpt[4] =  [ "Dur\351 avant Connexion",           "CNX_DELAY",      5000 ];
                        aOpt[5] =  [ "Dur\351e d'affichage des rapports", "REPORT_DELAY",    500 ];
                        aOpt[6] =  [ "Inteval de controle des attaques",  "ATTACK_DELAY",    500 ];                        
                        aOpt[7] =  [ "Combat  : Effectif genins",         "SONDE_TEAM_1",      0 ];
                        aOpt[8] =  [ "Combat  : Effectif chuunins",       "SONDE_TEAM_2",      0 ];
                        aOpt[9] =  [ "Combat  : Effectif jounins",        "SONDE_TEAM_3",      0 ];
                        aOpt[10] = [ "Pillage : Effectif genins",         "PILLAGE_TEAM_1",    0 ];
                        aOpt[11] = [ "Pillage : Effectif chuunins",       "PILLAGE_TEAM_2",    0 ];
                        aOpt[12] = [ "Pillage : Effectif jounins",        "PILLAGE_TEAM_3",    0 ];
                        aOpt[13] = [ "Heure de d\351but du script",       "SCRIPT_HH_START", 360 ];
                        aOpt[14] = [ "Heure de fin du script",            "SCRIPT_HH_END",     0 ];
                        var html = '<style>.menLink, div.menLink a {color: #FFF; text-align: left; padding: 0; margin: 0; font-size: 12px; display: inline;}</style>\n<center>';
                        html += '<a href="javascript:void(document.getElementById(\'GmOptions\').style.display=\'none\')" class="menLink" id="gm_id_0">[Log]</a> ';
                        html += '<a href="javascript:void(document.getElementById(\'GmOptions\').style.display=\'none\')" class="menLink" id="gm_id_D">' + sVersion + '</a>\n';
                        html += '<a href="javascript:void(document.getElementById(\'GmOptions\').style.display=\'none\')" class="menLink">[Close]</a></center>\n';
                        html += '<hr width=95%>\n<table><col width="200"><col>';
                        
                        // Rajout des options
                        for ( var i= 1; i < aOpt.length ; i++ ){
                        	html += '<tr><td>&nbsp; '+ aOpt[i][0] +'</td><td><input type="text" name="gm_options_vars" id="'+ aOpt[i][1] +'" size="6" value="'+ WOS_GetInt(aOpt[i][1], aOpt[i][2]) +'"/></td></tr>\n';
                        }
                        html += '</tr><tr><td>\n&nbsp;<button type="button" id="gm_id_C">Nettoyer</button></td><td>\n<button type="button" id="gm_id_O">Valider</button></td></tr>\n</table></hr>';
                        
                        if (x == '' || !isFinite(x)) {x = 200;}
                        if (y == '' || !isFinite(y)) {y = 200+window.scrollY;}
                        
                        if (document.getElementById('GmOptions')) {
                                div = document.getElementById('GmOptions');
                                if (html) {div.innerHTML = html;}
                        } else {
                                div = document.createElement('DIV');
                                div.setAttribute('ID',    'GmOptions');
                                div.setAttribute('name',  'GmOptions');
                                div.setAttribute('class', 'menLink');
                                div.setAttribute('style', 'position: absolute; z-Index: 999; width: 235px; background: rgba(0, 0, 0, 0.6); border: #333 solid 2px; margin: 2px; color: #FFF; font-size: 12px; padding: 2px;');
                                div.innerHTML = html;
                                document.body.insertBefore(div, document.body.firstChild);
                        }
                        div.style.left = x + "px";
                        div.style.top  = y + "px";
                        div.style.display = "block";
                }
                
                // =======================================================================================
                // Gestion du menu principal
                // =======================================================================================
                
                var WOS_Menu = function ( sID ){
                    var nID = sID.substring(6);
                    
                    switch (nID) {
                    case "D"  : WOS_Info()               ; break;
                    case "O"  : WOS_SetConfig()          ; break;
                    case "C"  : WOS_Clean_ALL()          ; break;
                    case "0"  : WOS_Log()                ; break;
                    case "1"  : WOS_Survey_CLEAN()       ; break;
                    case "2"  : Set_Frigo_Mode(iModeAtk) ; break;
                    case "3"  : Set_Frigo_Mode(iModePil) ; break;
                    case "4"  : WOS_SetFlag( GetSonde(), "les sondes automatiques", "SONDE_FLAG")       ; break;
                    case "5"  : WOS_SetFlag( GetSurvey(), "la surveillance automatique", "SURVEY_FLAG") ; break;
                    case "6"  : WOS_SetFlag( GetFrigo(), "la protection automatique", "FRIGO_FLAG")     ; break;
                    case "7"  : WOS_Flag_Cnx()           ; break;
                    case "8"  : WOS_SetFlag( GetSilent(), "la surveillance silencieuse", "SILENT_FLAG") ; break;
                    case "9"  : WOS_extract()            ; break;
                    case "10" : WOS_Sonde_Send(iModeAtk) ; break;
                    case "11" : WOS_Sonde_Send(iModePil) ; break;
                    case "12" : WOS_Sonde_Vil()          ; break;
                    case "13" : WOS_Clan_Send(iModeAtk)  ; break;
                    case "14" : WOS_Clan_Send(iModePil)  ; break;
                    case "15" : WOS_List_Clan("add")     ; break;
                    case "16" : WOS_List_Clan("remove")  ; break;
                    case "17" : WOS_List_Send( WOS_Get_Sondes(), iModeAtk) ; break;
                    case "18" : WOS_List_Send( WOS_Get_Sondes(), iModePil) ; break;
                    case "19" : WOS_Flag_Attack()        ; break;
                    }
                		
                }
                
                var gm_show_menu = function ( x, y) {
                    var aOpt = new Array();
                    aOpt[1] =  [ 0, " "      , "Nettoyer la surveillance automatique"  ];
                    aOpt[2] =  [ 0, " "      , "Frigo par d\351faut (en mode attaque)" ];
                    aOpt[3] =  [ 0, " "      , "Frigo par d\351faut (en mode pillage)" ];
                    aOpt[4]  = [ 0, "&radic;", "Sonde automatique"                     ];
                    aOpt[5]  = [ 0, "&radic;", "Surveillance automatique"              ];
                    aOpt[6]  = [ 0, "&radic;", "Protection automatique"                ];
                    aOpt[7]  = [ 0, "&radic;", "Connexion automatique"                 ];
                    aOpt[8]  = [ 0, "&radic;", "Surveillance silencieuse"              ];
                    aOpt[9]  = [ 0, ""       , "Extraction des villages"               ];
                    aOpt[10] = [ 0, " "      , "Sonder le village (en mode attaque)"   ];
                    aOpt[11] = [ 0, " "      , "Sonder le village (en mode pillage)"   ];
                    aOpt[12] = [ 0, "&radic;", "Village a sonder"                      ];
                    aOpt[13] = [ 0, " "      , "Sonder le clan (en mode attaque)"      ];
                    aOpt[14] = [ 0, " "      , "Sonder le clan (en mode pillage)"      ];
                    aOpt[15] = [ 0, " "      , "Ajouter le clan aux sondes"            ];
                    aOpt[16] = [ 0, " "      , "Retirer le clan aux sondes"            ];
                    aOpt[17] = [ 0, " "      , "Sonder la liste (en mode attaque)"     ];
                    aOpt[18] = [ 0, " "      , "Sonder la liste (en mode pillage)"     ];
                    aOpt[19] = [ 0, "&radic;", "Surveillance des rapports"             ];
                    
                    var mURL = document.location.href;
                    if (( mURL == (sURL2+"connexion.html")) || ( mURL == (sURL3+"connexion.html"))){
                        aOpt[7][0] = 1;
                        if ( GetCnx_LOGIN() == "" ) { aOpt[7][1] = "&times;"; }
                    } else if ( mURL.indexOf( sDomain1 ) != -1 ){
                        if ( mURL == WOS_GetStr("SURVEY_URL") ) { 
                            // On est sur la tour de garde
                            aOpt[1][0]  = 1; 
                            aOpt[8][0]  = 1;
                        }
                        
                        // Critere pour savoir si on est sur la page d'un village
                        if ( mURL.match( /index.php\?page\=14\&id\=\d+/ ) != null ){
                            aOpt[2][0]  = 1;
                            aOpt[3][0]  = 1;
                            aOpt[10][0]  = 1;
                            aOpt[11][0]  = 1; 
                            aOpt[12][0]  = 1;
                            if ( WOS_Is_Sonde() == 0 ) { aOpt[12][1] = "&times;"; }
                            // Critere pour savoir si on est sur la carte
                        } else if ( mURL.match( /index.php\?page\=15\&id\=\d+/ ) != null ){
                            aOpt[13][0]  = 1;
                            aOpt[14][0]  = 1;
                            aOpt[15][0]  = 1;
                            aOpt[16][0]  = 1;
                        } else if ( mURL.match( /index.php\?page\=37/ ) != null ){
                            aOpt[9][0] = 1;
                        } else {
                            if ( GetCnx_LOGIN() != "" ) { aOpt[7][0] = 1; }
                            // Positionnement de la sonde automatique
                            if ( GetTeam_nbG("SONDE") > 0 || GetTeam_nbC("SONDE") > 0 || GetTeam_nbJ("SONDE") > 0 ){ 
                                aOpt[4][0] = 1; 
                                if ( GetSonde() == 0 ) { aOpt[4][1] = "&times;"; }
                            }
                            // Positionnement de la surveillance automatique
                            aOpt[5][0] = 1;
                            if ( GetSurvey()   == 0 ) { aOpt[5][1] = "&times;"; }
                            // Si on a defini son frigo, on peut activer le mode protection automatique
                            if ( GetFrigo_ID() != 0 ) { aOpt[6][0] = 1; }
                            if ( GetFrigo()    == 0 ) { aOpt[6][1] = "&times;"; }
                            // Configuration de la deconnexion
                            aOpt[17][0] = 1;
                            aOpt[18][0] = 1;
                            aOpt[19][0] = 1;
                            if ( GetSilent()   == 0 ) { aOpt[8][1]  = "&times;"; }
                            if ( GetAttack()   == 0 ) { aOpt[19][1] = "&times;"; }
                        }
                    }
                    
                    var html = '<style>.menLink, div.menLink a {color: #FFF; text-align: left; padding: 0; margin: 0; font-size: 12px; display: inline; }</style>\n';
                    html += '<center><a id="gm_id_0" href="javascript:void()">[Log]</a> <a id="gm_id_D" href="javascript:void()">' + sVersion + '</a> \n';
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
                            WOS_Menu( sId );
                        }
                    }
                    
                    gm_menu_hide(e.clientX+window.scrollX, e.clientY + window.scrollY, 'GmMenu', false);
                    gm_menu_hide(e.clientX+window.scrollX, e.clientY + window.scrollY, 'GmOptions', true);
                    return true;
                };
                
                var gm_menu = function (e) {
                    if ( e.ctrlKey ){
                        return true;
                    } else if ( e.shiftKey ) {
                        gm_menu_hide(e.clientX+window.scrollX, e.clientY+window.scrollY, 'GmMenu', false);
                        gm_show_options(e.clientX+window.scrollX, e.clientY+window.scrollY);
                    } else {
                        gm_menu_hide(e.clientX + window.scrollX, e.clientY+window.scrollY, 'GmOptions', false);
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
                    var mURL  = new String(document.location.href);
                    var sBody = new String(document.body.innerHTML);
                    var sHostname = document.location.hostname;
                    
                    if ( sBody.match(/Probl.me\sde\sconnexion/) != null ){ 
                        document.location.assign(sURL2+"connexion.html"); 
                    } else if (( sHostname == sDomain2 ) || ( sHostname == sDomain3 )){
                        if (( mURL == sURL2 ) || ( mURL == sURL3 )) {
                            document.location.assign(sURL2+"connexion.html");
                        } else if (( mURL == (sURL2+"connexion.html")) || ( mURL == (sURL3+"connexion.html"))){
                            if ( inHours() ){
                                var nDelay = GetDelayC();
                                setTimeout(WOS_Page_CNX, nDelay );
                                if ( nDelay > 5000 ){ WOS_Post("Attente pendant "+ nDelay/1000 + " secondes"); }
                            } else {
                                setTimeout(autoreload, 600000); 
                            }
                        }
                        //Si il y'a un probleme de deconnexion
                    } else if ( sHostname == sDomain1 ){
                        if (( mURL.match( /index.php\?page\=8\&id=1/ ) != null ) && ( window.history.length == 2 )){
                            window.close();
                        } else {
                            if ( inHours() ){
                                setTimeout(WOS_Survey_AUTO, 1050);
                                setTimeout(WOS_Protect_AUTO, 500);
                                setTimeout(WOS_Report_AUTO,   50);
                                
                                // Critere pour savoir si on est sur l ecran d'attaque
                                if ( mURL.match( /index.php\?page\=17\&idv=\d+\&type\=1/ ) != null ){   
                                    WOS_Page_ATK();
                                } else if ( mURL.match( /index.php\?page\=20\&maj=1\&id\=\d+/ ) != null ){
                                    setTimeout(autoback, GetDelayR());
                                } else if ( mURL.match( /index.php\?page\=32/ ) != null ){
                                    var div = document.createElement('DIV');
                                    div.setAttribute('style', 'background: #FFF;color: #000;');
                                    var sData = "URL;X;Y;Village;Kage;Clan;Pop;Points<br />";
                                    var sTmp  = "";
                                    var iMax = WOS_GetInt("ID_MAX");
                                    for( var i = 1; i <= iMax; i++ ){
                                        sTmp = WOS_GetStr("DATA_"+i);
                                        if ( sTmp != "" ){ 
                                            sData = sData + sTmp;
                                            WOS_DelVar("DATA_"+i);
                                        }
                                    }
                                    div.innerHTML = sData;
                                    document.body.insertBefore(div, document.body.firstChild);
                                }
                            }
                        }
                    }
                };
                
                var mURL  = new String(document.location.href);
                var sHostname = document.location.hostname;
                
                if (( sHostname == sDomain1 ) || ( sHostname == sDomain2 ) || ( sHostname == sDomain3 )){
                    // On est forcement sur la page du jeu
                    window.addEventListener("contextmenu", gm_menu, true);
                    window.addEventListener("mouseup", gm_menu_clear, false);
                    document.addEventListener("DOMContentLoaded", mainScript, false);
                }
        })();
        
        // FIN DU SCRIPT -- DES CARACTERES SONT NECESSAIRES
