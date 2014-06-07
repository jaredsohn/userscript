// ==UserScript==
                                        // @name           Iconos
                                        // @description    Change the icons guestbook, mail, challenges, 2D games and notes
                                        // @namespace      http://userscripts.org/users/58056
                                        // @include        http://www*.cs-manager.com/csm/*
                                        
                                        
                                        
                                        function addStatus(sType, iNum){
                                        
                                        
                                        if (iNum != 0){
                                        		if (sType == 'guestbook'){
                                        			document.getElementById('status_gb').src = 'http://img22.imageshack.us/img22/5711/19477783.gif';
                                        			document.getElementById('status_gb').setAttribute('title', iNum + ' new');
                                        		} else if (sType == 'mail') {
                                        			document.getElementById('status_mail').setAttribute("src", 'http://img22.imageshack.us/img22/1926/mailusf.gif');
                                        		} else if (sType == 'pcw') {
                                        			document.getElementById('status_pcw').src = 'http://img22.imageshack.us/img22/4991/pcwj.gif';
                                        			document.getElementById('status_pcw').setAttribute('title', iNum + ' new');
                                        		} else if (sType == 'news') {
                                        			var oObj = document.getElementById('clan_news');
                                        			if (oObj != null) {
                                        				oObj.innerHTML += ' (' + iNum + ')';
                                        			}
                                        		}
                                        
                                        	} else if(iNum==0){
                                        		if(sType=="guestbook"){
                                        			document.getElementById("status").getElementsByTagName("img")[0].setAttribute("src","http://img11.imageshack.us/img11/9755/44515600.jpg");
                                        		} else if(sType=="mail"){
                                        			document.getElementById("status").getElementsByTagName("img")[1].setAttribute("src","http://img15.imageshack.us/img15/2873/mailwvm.jpg");
                                        		} else if(sType=="pcw"){
                                        			document.getElementById("status").getElementsByTagName("img")[2].setAttribute("src","http://img360.imageshack.us/img360/1443/pcw.jpg");
                                        		}
                                        		document.getElementById("status").getElementsByTagName("img")[3].setAttribute("src","http://img8.imageshack.us/img8/96/22397165.jpg");
                                        		document.getElementById("status").getElementsByTagName("img")[4].setAttribute("src","http://img179.imageshack.us/img179/5084/notes.jpg");
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

// ==/UserScript==