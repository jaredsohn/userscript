// ==UserScript==
==
          // @name           Icons bluee
          // @description    Change the icons guestbook, mail, challenges, 2D games and notes
          // @namespace      http://userscripts.org/users/58056
          // @include        http://www*.cs-manager.com/csm/*
          // ==/UserScript==
          
          
          
          function addStatus(sType, iNum){
          
          
          if (iNum != 0){
          		if (sType == 'guestbook'){
          			document.getElementById('status_gb').src = 'http://img18.imageshack.us/img18/7628/69321780.gif';
          			document.getElementById('status_gb').setAttribute('title', iNum + ' new');
          		} else if (sType == 'mail') {
          			document.getElementById('status_mail').setAttribute("src", 'http://img22.imageshack.us/img22/4186/mailv.gif');
          		} else if (sType == 'pcw') {
          			document.getElementById('status_pcw').src = 'http://img9.imageshack.us/img9/9057/pcw.gif';
          			document.getElementById('status_pcw').setAttribute('title', iNum + ' new');
          		} else if (sType == 'news') {
          			var oObj = document.getElementById('clan_news');
          			if (oObj != null) {
          				oObj.innerHTML += ' (' + iNum + ')';
          			}
          		}
          
          	} else if(iNum==0){
          		if(sType=="guestbook"){
          			document.getElementById("status").getElementsByTagName("img")[0].setAttribute("src","http://img21.imageshack.us/img21/3152/57059030.png");
          		} else if(sType=="mail"){
          			document.getElementById("status").getElementsByTagName("img")[1].setAttribute("src","http://img219.imageshack.us/img219/1253/mailb.png");
          		} else if(sType=="pcw"){
          			document.getElementById("status").getElementsByTagName("img")[2].setAttribute("src","http://img10.imageshack.us/img10/4276/pcw.png");
          		}
          		document.getElementById("status").getElementsByTagName("img")[3].setAttribute("src","http://img14.imageshack.us/img14/6909/90177832.png");
          		document.getElementById("status").getElementsByTagName("img")[4].setAttribute("src","http://img140.imageshack.us/img140/2585/notet.png");
          	}
          
          
          }
          
          function embedFunction(s) {
          	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
          	var allimgs = document.getElementsByTagName("img");
          
          
          	for(i=0; i<=allimgs.length; i++){
          		if(allimgs[i].getAttribute("src")=="/images/notes.png"){
          			allimgs[i].setAttribute('src','http://img91.imageshack.us/img91/9458/notasplayersbf9.png');
          		}
          
          	}
          }
          
          
          embedFunction(addStatus);
// ==UserScript==