// ==UserScript==
// @name           JvKickPlusBeta
// @namespace       
// @description    Projet d'amélioration de la page de gestion des kicks sur JV.com
// @include        http://www.jeuxvideo.com/cgi-bin/jvforums/kick_user.cgi?forum=*
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==


function toggle(object_id){
        var obj=document.getElementById(object_id)	
        if(obj.style.display == 'block')
            obj.style.display='none'
        else
            obj.style.display='block'
 }

function cache(object_id){
       if (document.getElementById(object_id)!=null)
       document.getElementById(object_id).style.display='none';
}

function addKick(forumID,pseudo,profilKey, profilDate,topicID,pageID,messageID,lienSupp) {
        var modoKey = GM_getValue("modoKey","");
        var modoPseudo = GM_getValue("modoPseudo","");
        GM_log('http://silvermo.free.fr/jvkickplus/kick.php?action=newKick&forumID='+forumID+'&pageID='+pageID+'&topicID='+topicID+'&messageID='+messageID+'&profilKey='+profilKey+'&profilDate='+profilDate+'&modoPseudo='+modoPseudo+'&modoKey='+modoKey+'&badguyPseudo='+pseudo);
        var urlPage = 'http://silvermo.free.fr/jvkickplus/kick.php?action=newKick&forumID='+forumID+'&pageID='+pageID+'&topicID='+topicID+'&messageID='+messageID+'&profilKey='+profilKey+'&profilDate='+profilDate+'&modoPseudo='+modoPseudo+'&modoKey='+modoKey+'&badguyPseudo='+pseudo;


	GM_xmlhttpRequest( {
		method: 'GET',
		url : urlPage,
		onreadystatechange : function(reponse) {
                                GM_log("Result : >"+reponse.responseText+"<");
                                if (reponse.responseText!="" && lienSupp!="") {
                                      GM_log("suppression");
	                              window.location.href = lienSupp;
                                      goURL(lienSupp);
                                }
			}
	});

      /*var result = goAndGetURL(urlPage);
        GM_log("Result : >"+result+"<");
        if (result!="" && lienSupp!="") {
              GM_log("suppression");
	      window.location.href = lienSupp;
	      goURL(lienSupp);
        }
*/	GM_log("addKick for "+forumID+" "+topicID+" "+messageID+" "+pseudo+" "+profilKey+" "+profilDate);

}

function changeBanFlag(memberID) {
	var kicks = document.getElementsByTagName('tr');
	var c = kicks.length;
	for (var kickL = 0; kickL < c; kickL++) {
		if (kicks[kickL].className == 'tr2' || kicks[kickL].className == 'tr1') {
			if (kicks[kickL].getElementsByTagName('td')[0].getElementsByTagName("a")[0].href.split("pseudo=")[1] == memberID)
				kicks[kickL].getElementsByTagName('td')[0].getElementsByTagName('img')[0].src="http://www.noelshack.com/uploads/10062009/banIcon082649.png";
		}
	}
}

function removeKick(forum,pseudo) {
        var modoKey = GM_getValue("modoKey","");
        var modoPseudo = GM_getValue("modoPseudo","");
	goURL('http://silvermo.free.fr/jvkickplus/kick.php?action=removeKick&forumID='+forum+'&modoPseudo='+modoPseudo+'&modoKey='+modoKey+'&badguyPseudo='+pseudo);
	GM_log("removeKick for "+forum+" "+pseudo);
}

function getKick(forum) {
        var modoKey = GM_getValue("modoKey","");
        var modoPseudo = GM_getValue("modoPseudo","");
      //  GM_deleteValue("test");
        GM_xmlhttpRequest( {
	                method: 'GET',
			url : 'http://silvermo.free.fr/jvkickplus/kick.php?action=getKick&forumID='+forum+'&modoPseudo='+modoPseudo+'&modoKey='+modoKey,
			onload: function(reponse) {
					GM_log("Infos getKick "+reponse.responseText);
					GM_setValue("test",reponse.responseText);
				}
	          	});
	return GM_getValue("test","");
}

function isBanned(profileURL, memberID) {
	GM_xmlhttpRequest( {
		method: 'GET',
		url : profileURL,
		onload: function(reponse) {
				var ban='';
				ban=reponse.responseText;
				ban=ban.match(/">Ce pseudo a Ã©tÃ© banni\.<\/p>/);
				if(ban!=null && ban.length!=0){
				changeBanFlag(memberID);
			}
		}
	});
}

function goAndGetURL(URLPage) {
        GM_deleteValue("response");
	GM_xmlhttpRequest( {
		method: 'GET',
		url : URLPage,
		onreadystatechange : function(reponse) {
                                GM_log(reponse.responseText);
                                GM_setValue("response",reponse.responseText);
			}
	});
        return GM_getValue("response","");
}

function goURL(URLPage) {
	GM_xmlhttpRequest( {
		method: 'GET',
		url : URLPage
	});
}

function superKickTopic(forumID, topicID, topicKey) {
	GM_log("superKickTopic for "+forumID+" "+topicID+" "+topicKey);
	GM_xmlhttpRequest( {
		method: 'GET',
		url : 'http://www.jeuxvideo.com/forums/1-'+forumID+'-'+topicID+'-1-0-1-0-0.htm',
		onload: function(reponse) {
			var regDel = /<a href=\"http:\/\/www\.jeuxvideo\.com\/forums\/4-(.*)\" onclick=\"/.exec(reponse.responseText)[1];
			var regKick = /http:\/\/www\.jeuxvideo\.com\/cgi-bin\/jvforums\/kick_user\.cgi\?(.*)\" onclick=\"/.exec(reponse.responseText)[1];
			var regProfilKey = /http:\/\/www\.jeuxvideo\.com\/cgi-bin\/jvforums\/forums_profil\.cgi\?pxo=.*dxo=(.*)\" title=\"/.exec(reponse.responseText)[1];
			regProfilKey = regProfilKey.replace(/amp;/g, '');
			var regPseudo = /\?pxo=(.*)&amp;dxo=/.exec(reponse.responseText)[1];
			var lienSupp = "http://www.jeuxvideo.com/forums/4-" + regDel;
			regKick = regKick.replace(/amp;/g, '');
			var lienKick = "http://www.jeuxvideo.com/cgi-bin/jvforums/kick_user.cgi?"+regKick+"&Valider=Dargor&motif=Flood";
			var profilKey = regProfilKey.split('&k=')[1];
			var profilDate = regProfilKey.split('&k=')[0];
			GM_log("Lien Supp "+lienSupp);
			GM_log("Lien Kick "+lienKick);
			GM_log("topicID "+topicID);
			GM_log("Pseudo membre "+regPseudo);
			GM_log("profilKey "+profilKey);
			GM_log("profilDate "+profilDate);
			goURL(lienKick);
			GM_setValue("pageLoaded","false");
			addKick(forumID, regPseudo, profilKey, profilDate, topicID, 1 ,topicID, lienSupp);
			//window.location.href = lienSupp;


		}
	});
}


function improve_page_topics() {
	if (document.getElementById('liste_topics')) {
		var lineTopicTd = document.getElementById('liste_topics').getElementsByTagName('tr');
		var lineTopicTdCount = lineTopicTd.length;
		var jvFoxActivated = (lineTopicTd[0].getElementsByTagName('th')[2].className=="col_moder") ? true : false;
		if (lineTopicTd[0].getElementsByTagName('th')[1].className=="col_moder" || jvFoxActivated) {
			for (var i=0; i<lineTopicTdCount ; i++) {
				if (i==0) { 
					var col_kickPlus = document.createElement('th');
					col_kickPlus.innerHTML = 'Â ';
					col_kickPlus.className = "col_moder";
					var indice = (jvFoxActivated) ? 4 : 3;
					lineTopicTd[i].insertBefore(col_kickPlus,lineTopicTd[i].getElementsByTagName('th')[indice]);
				}
				else if (lineTopicTd[i].className == "tr1" || lineTopicTd[i].className == "tr2") { 

					var topicURL = "";
					var indice = (jvFoxActivated) ? 2 : 1;
					var col_kickPlusCase = document.createElement('td');

					// Gestion des topics normaux
					if (lineTopicTd[i].getElementsByTagName('td')[indice].getElementsByTagName('a').length>0) {
						topicURL = lineTopicTd[i].getElementsByTagName('td')[indice].getElementsByTagName('a')[0].href;

						var forumID = topicURL.split("forums/4-")[1].split("-")[0];

						var topicID = topicURL.split("forums/4-"+forumID+"-")[1].split("-")[1].split("-")[0];              forumID = parseInt(forumID);
						var topicKey = topicURL.split(topicID+"-")[1].split("-1-0")[0];
						topicID = parseInt(topicID);
						var kickPlusLink = document.createElement('a'); 
						kickPlusLink.href="#";
						kickPlusLink.target="_blank";
						kickPlusLink.setAttribute("forumID",forumID);
						kickPlusLink.setAttribute("topicID",topicID);
						kickPlusLink.setAttribute("topicKey",topicKey);
						kickPlusLink.addEventListener("click",function foo(e) {
								if (confirm("Voulez-vous supprimer le topic et kicker l'auteur ?")) {                                                 
								           superKickTopic(this.getAttribute("forumID"),this.getAttribute("topicID"),this.getAttribute("topicKey"));
								}}, false);
						var kickPlusImage = document.createElement('img');
						kickPlusImage.src = "http://image.jeuxvideo.com/pics/forums/bt_forum_bann_48h.gif";
						kickPlusLink.appendChild(kickPlusImage);
						col_kickPlusCase.appendChild(kickPlusLink);
					} 
					// Gestion des topics normaux et splittÃ©s
					var indice = (jvFoxActivated) ? 4 : 3;                            
					lineTopicTd[i].insertBefore(col_kickPlusCase,lineTopicTd[i].getElementsByTagName('td')[indice]);
				}
			}
		}
	}
}

function improve_page_messages() {
	if (document.getElementById('col1')) {
		var lis = document.getElementById('col1').getElementsByTagName("li");
		var c = lis.length;
		var profileLink = ""
		var memberID = "";
                var message = "";
                var elem = null;
		for (var user = 0; user < c; user++) {
			if (lis[user]) {
				if (lis[user].className == 'pseudo') {
					profileLink = lis[user].getElementsByTagName("a")[1].href;                               
					memberID = lis[user].getElementsByTagName("strong")[0].innerHTML;                          
				}
				if (lis[user].className == 'date') {
					elem = lis[user].getElementsByTagName("a");
                                }
                                if (lis[user].className == 'post') {
                                        message = lis[user].innerHTML;
                                       	var i=0;
					var ref = '';
					while (i<elem.length) {
						if (elem[i].target == "kick_user") {
							var hrefLink = elem[i].href.split("forum=")[1];
							var forumID = parseInt(hrefLink.split("&")[0]);
                                                        var topicID = parseInt(hrefLink.split("topic=")[1].split("&")[0]);
							var messageID = parseInt(hrefLink.split("numero=")[1].split("&")[0]);
							var pageID = parseInt(hrefLink.split("page=")[1].split("&")[0]);
							var profilDate = profileLink.split("dxo=")[1].split("&")[0];
							var profilKey = profileLink.split("k=")[1];
							elem[i].setAttribute("memberID",memberID);
							elem[i].setAttribute("topicID",topicID);
							elem[i].setAttribute("messageID",messageID);
							elem[i].setAttribute("profilKey",profilKey);
							elem[i].setAttribute("profilDate",profilDate);
							elem[i].addEventListener("click",
								function foo(e) {
									addKick(forumID,this.getAttribute("memberID"),this.getAttribute("profilKey"),this.getAttribute("profilDate"),topicID,pageID,this.getAttribute("messageID"),"");
								}
							, false);
						}
						i++;
					}
				}
			}
		}
	}
}




function improve_page_kick() {

	// Ajout des informations supplÃ©mentaires pour chaque ligne du tableau des kicks

	if (document.getElementsByTagName('tr')) {           
		var kicks = document.getElementsByTagName('tr');
		var c = kicks.length;
		var kicksInfo = null;
		for (var kickL = 0; kickL < c; kickL++) {
			if (kicks[kickL].className == 'tr2' || kicks[kickL].className == 'tr1') {
				var cases = kicks[kickL].getElementsByTagName('td');
				var casesCount = cases.length;
				var i = 0;
				var callKickInfo = "";
				while (i<casesCount) {
					if (i==0) {
						var kickLinkHref =  cases[i].getElementsByTagName('a')[0].href.split("?")[1];
						var forumID = parseInt(kickLinkHref.split("forum=")[1].split("&")[0]);
						if (kicksInfo == null) kicksInfo = getKick(forumID);
                                                GM_log("Lien de kick " + kickLinkHref);
						var memberID = kickLinkHref.split("pseudo=")[1];
                                                GM_log("membre Ã  kicker "+ memberID);
						cases[i].getElementsByTagName('a')[0].setAttribute("memberID",memberID);
						cases[i].getElementsByTagName('a')[0].addEventListener("click", function foo(e) {
								removeKick(forumID,this.getAttribute("memberID"));}, false);
						if (kicksInfo.indexOf("#newkick#"+memberID+"#")!=-1) {
							callKickInfo = kicksInfo.split("#newkick#"+memberID+"#")[1].split("#newkick")[0];
							isBanned(callKickInfo.split("#")[0],memberID);
						}
					}
					if (callKickInfo!="") {
						if (i==1) cases[i].innerHTML += '<br/><a href="'+callKickInfo.split("#")[0]+'" target="_blank">Profil</a>';
						if (i==3) {
                                                   cases[i].innerHTML += '<br/><b>Topic : </b>'+callKickInfo.split("#")[2];                 
                                                     if (callKickInfo.split("#msg#")[1]!="") {
                                                           var ahref = document.createElement('a');
                                                           ahref.innerHTML = "<br/>Voir / Masquer le message";                                       ahref.setAttribute("poele",kickL);
                                                           ahref.addEventListener("click", function foo(e) {toggle('blocid_'+this.getAttribute("poele"));}, false);
                                                           cases[i].appendChild(ahref);
                                                           var aspan = document.createElement('span');
                                                           aspan.id = 'blocid_'+kickL;
                                                           aspan.innerHTML = '<br/><b>Message : </b>'+callKickInfo.split("#msg#")[1];
                                                           cases[i].appendChild(aspan);
                                                     }
                                                } 
                                                if (i==4) cases[i].innerHTML += '<br/><font color="red">Autres kicks :<b>'+callKickInfo.split("#")[1]+'</b></font>';  
					}
					i++;

				}
			}
                                               cache('blocid_'+kickL);
		}
	}
}

function main() {
	var url = window.location.href;
	if (url.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/1-/)) improve_page_messages();
	if (url.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/3-/)) improve_page_messages();
	if (url.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/0-/)) improve_page_topics();
	else improve_page_kick(); ;
}

main();

