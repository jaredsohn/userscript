// ==UserScript==
// @name           JvKickPlus
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



function addKick(forum,pseudo,profil,titre,message) {
	GM_log("addKick for "+forum+" "+pseudo+" "+profil+" "+titre);
	GM_setValue("kick_profil#"+forum+"#"+pseudo.toLowerCase(),profil);
	GM_setValue("kick_topic#"+forum+"#"+pseudo.toLowerCase(),titre);
	GM_setValue("kick_message#"+forum+"#"+pseudo.toLowerCase(),message);
	GM_log("topic = "+GM_getValue("kick_topic#"+forum+"#"+pseudo.toLowerCase()));
	GM_log("profil = "+GM_getValue("kick_profil#"+forum+"#"+pseudo.toLowerCase(),""));
	GM_log("message = "+GM_getValue("kick_message#"+forum+"#"+pseudo.toLowerCase(),""));
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
	GM_log("removeKick for "+forum+" "+pseudo);
	GM_deleteValue("kick_profil#"+forum+"#"+pseudo.toLowerCase());
	GM_deleteValue("kick_topic#"+forum+"#"+pseudo.toLowerCase());
	GM_deleteValue("kick_message#"+forum+"#"+pseudo.toLowerCase());
}

function getKick(forum, pseudo) {
	GM_log("getKick for "+forum+" "+pseudo);
	var kick_profil = GM_getValue("kick_profil#"+forum+"#"+pseudo.toLowerCase(),"");
	var kick_topic = GM_getValue("kick_topic#"+forum+"#"+pseudo.toLowerCase(),"");
	var kick_message = GM_getValue("kick_message#"+forum+"#"+pseudo.toLowerCase(),"");
	GM_log("topic = "+kick_topic);
	GM_log("profil = "+kick_profil);
	GM_log("message = "+kick_message);
	if (kick_profil == "" || kick_topic == "") {
		return "";
	} else {
		GM_log("ok "+kick_profil+"#"+kick_topic+"#msg#"+kick_message);
		return kick_profil+"#"+kick_topic+"#msg#"+kick_message;
	}
}


function isBanned(profileURL, memberID) {
	GM_xmlhttpRequest( {
		method: 'GET',
		url : profileURL,
		onload: function(reponse) {
				var ban='';
				ban=reponse.responseText;
				ban=ban.match(/">Ce pseudo a été banni\.<\/p>/);
				if(ban!=null && ban.length!=0){
				changeBanFlag(memberID);
			}
		}
	});
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
			var regProfilKey = /http:\/\/www\.jeuxvideo\.com\/cgi-bin\/jvforums\/forums_profil\.cgi\?pxo(.*)\" title=\"/.exec(reponse.responseText)[1];
			regProfilKey = regProfilKey.replace(/amp;/g, '');
			var regTitre = /<h4 class=\"sujet\"><span>Sujet : <\/span>&laquo;&nbsp;(.*)&nbsp;&raquo;<\/h4>/.exec(reponse.responseText)[1];  
			var regMemberID = /\?pxo=(.*)&amp;dxo=/.exec(reponse.responseText)[1];
			var lienProfil= "http://www.jeuxvideo.com/cgi-bin/jvforums/forums_profil.cgi?pxo"+regProfilKey;
			var lienSupp = "http://www.jeuxvideo.com/forums/4-" + regDel;
			regKick = regKick.replace(/amp;/g, '');
			var lienKick = "http://www.jeuxvideo.com/cgi-bin/jvforums/kick_user.cgi?"+regKick+"&Valider=Dargor&motif=Flood";

			GM_log("Lien Supp "+lienSupp);
			GM_log("Lien Kick "+lienKick);
			GM_log("Lien Profil "+lienProfil);
			GM_log("Titre Topic "+regTitre);
			GM_log("Pseudo membre "+regMemberID);
			addKick(forumID,regMemberID,lienProfil,regTitre,"");
			goURL(lienKick);
			window.location.href = lienSupp;
			goURL(lienSupp);
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
					col_kickPlus.innerHTML = '&nbsp;';
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
								if (confirm("Voulez-vous supprimer le topic et kicker l'auteur ?")) {                                                 superKickTopic(this.getAttribute("forumID"),this.getAttribute("topicID"),this.getAttribute("topicKey"));
								}}, false);
						var kickPlusImage = document.createElement('img');
						kickPlusImage.src = "http://image.jeuxvideo.com/pics/forums/bt_forum_bann_48h.gif";
						kickPlusLink.appendChild(kickPlusImage);
						col_kickPlusCase.appendChild(kickPlusLink);
					} 
					// Gestion des topics normaux et splittés
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
		var titreTopic = document.getElementsByTagName("h4")[0].innerHTML.split("&nbsp;")[1];       
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

							elem[i].setAttribute("memberID",memberID);
							elem[i].setAttribute("message",message);
							elem[i].setAttribute("profileLink",profileLink);
							elem[i].addEventListener("click",
								function foo(e) {
									addKick(forumID,this.getAttribute("memberID"),this.getAttribute("profileLink"),titreTopic,this.getAttribute("message"));
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

	// Ajout des informations supplémentaires pour chaque ligne du tableau des kicks

	if (document.getElementsByTagName('tr')) {           
		var kicks = document.getElementsByTagName('tr');
		var c = kicks.length;
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
                                                GM_log(kickLinkHref);
						var memberID = kickLinkHref.split("pseudo=")[1];
                                                GM_log(memberID);
						cases[i].setAttribute("memberID",memberID);
						cases[i].getElementsByTagName('a')[0].addEventListener("click", function foo(e) {
								removeKick(forumID,this.getAttribute("memberID"));}, false);
						callKickInfo = getKick(forumID, memberID);
						isBanned(callKickInfo.split("#")[0],memberID);
					}
					if (callKickInfo!="") {
						if (i==1) cases[i].innerHTML += '<br/><a href="'+callKickInfo.split("#")[0]+'" target="_blank">Profil</a>';
						if (i==3) {
                                                   cases[i].innerHTML += '<br/><b>Topic : </b>'+callKickInfo.split("#")[1];                 
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