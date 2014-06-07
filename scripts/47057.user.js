// ==UserScript==
// @name           Island Neopet pet trainer
// @description	   Autotrainer
// @namespace      http://userscripts.org/users/83296
// @include        http://www.neopets.com/safetydeposit.phtml*
// @include		   http://www.neopets.com/island/*
// please store your codestones in safe deposit box (page 1)
// ==/UserScript==
var x = (Math.random() * 500)+1000;  //change the page delay here; 1000 = 1 second
var p = 0;//change to train pet 0-3, note: zero equals pet #1
function delay() {
	if (window.location.href.match('neopets.com/island/')){
        
		if(document.body.innerHTML.indexOf('Start Course') != -1){
        	GM_setValue("stage","1");
        	if (GM_getValue("stats")==0){
				window.location="http://www.neopets.com/island/training.phtml?type=status";
				return;
        	}
				
        		var lists = document.getElementsByTagName("select");for(var i = 0; i < lists.length; i++){if(lists[i].name == "course_type"){lists[i].options[GM_getValue("stats")].selected = true;}}
				var lists2 = document.getElementsByTagName("select");for(var i = 0; i < lists2.length; i++){if(lists2[i].name == "pet_name"){lists2[i].options[p].selected = true;}}
        		var training = document.evaluate('//input[@type = "submit" and @value = "Start Course"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);GM_setValue("stage","2");training.click();
        	}
			
		if(document.body.innerHTML.indexOf('Please increase the level') != -1){
        		GM_setValue("stage","1");
        		GM_setValue("stats",0);
        		window.location="http://www.neopets.com/island/training.phtml?type=status";return;	
			}

			
			
//find stats, goes back to start
		if(GM_getValue("stage")==1){
					if (p==0){
						if(document.body.innerHTML.indexOf('Current Course Status') != -1){
							var button = document.evaluate('//td[@class="content"]//tbody//tr[2]//font[@color="green"]/b',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var lvl = parseInt(button.innerHTML);}
							var button = document.evaluate('//td[@class="content"]//tbody//tr[2]//td[@bgcolor="white"]/b',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var str = parseInt(button.innerHTML)/2;}
							var button = document.evaluate('//td[@class="content"]//tbody//tr[2]//td[@bgcolor="white"]/b[2]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var def = parseInt(button.innerHTML)/2;}
							var button = document.evaluate('//td[@class="content"]//tbody//tr[2]//td[@bgcolor="white"]/b[4]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var hp = parseInt(button.innerHTML.match(/ \d+/))/3;}		
							
							if ((str || def || hp) > lvl)
							{
								GM_setValue("stats","5");
							}
							else 
							{
							if(str <= hp && def){GM_setValue("stats","1");}
							else if(def <= hp){GM_setValue("stats","2");}
							else{GM_setValue("stats","4");}
							}						
						}
					}
					
					if (p==1){
						if(document.body.innerHTML.indexOf('Current Course Status') != -1){
							var button = document.evaluate('//td[@class="content"]//tbody//tr[4]//font[@color="green"]/b',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var lvl = parseInt(button.innerHTML);}
							var button = document.evaluate('//td[@class="content"]//tbody//tr[4]//td[@bgcolor="white"]/b',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var str = parseInt(button.innerHTML);}
							var button = document.evaluate('//td[@class="content"]//tbody//tr[4]//td[@bgcolor="white"]/b[2]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var def = parseInt(button.innerHTML);}
							var button = document.evaluate('//td[@class="content"]//tbody//tr[4]//td[@bgcolor="white"]/b[4]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var hp = parseInt(button.innerHTML.match(/ \d+/));}
							if ((str || def || hp) > lvl)
							{
								GM_setValue("stats","5");
							}
							else 
							{
							if(str <= hp && def){GM_setValue("stats","1");}
							else if(def <= hp){GM_setValue("stats","2");}
							else{GM_setValue("stats","4");}
							}	
						}
					}
					if (p==2){
						if(document.body.innerHTML.indexOf('Current Course Status') != -1){
							var button = document.evaluate('//td[@class="content"]//tbody//tr[6]//font[@color="green"]/b',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var lvl = parseInt(button.innerHTML);}
							var button = document.evaluate('//td[@class="content"]//tbody//tr[6]//td[@bgcolor="white"]/b',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var str = parseInt(button.innerHTML);}
							var button = document.evaluate('//td[@class="content"]//tbody//tr[6]//td[@bgcolor="white"]/b[2]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var def = parseInt(button.innerHTML);}
							var button = document.evaluate('//td[@class="content"]//tbody//tr[6]//td[@bgcolor="white"]/b[4]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var hp = parseInt(button.innerHTML.match(/ \d+/));}
							if ((str || def || hp) > lvl)
							{
								GM_setValue("stats","5");
							}
							else 
							{
							if(str <= hp && def){GM_setValue("stats","1");}
							else if(def <= hp){GM_setValue("stats","2");}
							else{GM_setValue("stats","4");}
							}	
						}
					}
					if (p==3){
						if(document.body.innerHTML.indexOf('Current Course Status') != -1){
							var button = document.evaluate('//td[@class="content"]//tbody//tr[8]//font[@color="green"]/b',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var lvl = parseInt(button.innerHTML);}
							var button = document.evaluate('//td[@class="content"]//tbody//tr[8]//td[@bgcolor="white"]/b',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var str = parseInt(button.innerHTML);}
							var button = document.evaluate('//td[@class="content"]//tbody//tr[8]//td[@bgcolor="white"]/b[2]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var def = parseInt(button.innerHTML);}
							var button = document.evaluate('//td[@class="content"]//tbody//tr[8]//td[@bgcolor="white"]/b[4]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);var hp = parseInt(button.innerHTML.match(/ \d+/));}
							if ((str || def || hp) > lvl)
							{
								GM_setValue("stats","5");
							}
							else 
							{
							if(str <= hp && def){GM_setValue("stats","1");}
							else if(def <= hp){GM_setValue("stats","2");}
							else{GM_setValue("stats","4");}
							}	
						}
					}
        			window.location="http://www.neopets.com/island/training.phtml?type=courses";			
        	}
        	
//finds stones -> safedeposit 
		if(GM_getValue("stage")==2){
        		var code0=0; code1=0; code2=0; code3=0; code4=0; code5=0; code6=0;code7=0;
        		if(document.body.innerHTML.indexOf('Current Course Status') != -1){
					if (p==0){
			        var button = document.evaluate('//td[@class="content"]//tbody//tr[2]//td[@bgcolor="white" and @width="250"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        			if (button.snapshotLength > 0){button = button.snapshotItem(0);}
					}
					if (p==1){
					var button = document.evaluate('//td[@class="content"]//tbody//tr[4]//td[@bgcolor="white" and @width="250"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        			if (button.snapshotLength > 0){button = button.snapshotItem(0);}
					}
					if (p==2){
					var button = document.evaluate('//td[@class="content"]//tbody//tr[6]//td[@bgcolor="white" and @width="250"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        			if (button.snapshotLength > 0){button = button.snapshotItem(0);}
					}
					if (p==3){
					var button = document.evaluate('//td[@class="content"]//tbody//tr[8]//td[@bgcolor="white" and @width="250"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        			if (button.snapshotLength > 0){button = button.snapshotItem(0);}
					}

        			selectedlink1=button.nextSibling.lastChild.firstChild;
        			if (selectedlink1.innerHTML == "Zei Codestone"){code0 =1;}
        			else if (selectedlink1.innerHTML == "Har Codestone"){code0 =2;}
        			else if (selectedlink1.innerHTML == "Orn Codestone"){code0 =3;}
        			else if (selectedlink1.innerHTML == "Bri Codestone"){code0 =4;}
        			else if (selectedlink1.innerHTML == "Main Codestone"){code0 =5;}
        			else if (selectedlink1.innerHTML == "Eo Codestone"){code0 =6;}
        			else if (selectedlink1.innerHTML == "Vo Codestone"){code0 =7;}
        			else if (selectedlink1.innerHTML == "Lu Codestone"){code0 =8;}
        			else if (selectedlink1.innerHTML == "Tai-Kai Codestone"){code0 =9;}
        			else if (selectedlink1.innerHTML == "Mau Codestone"){code0 =10;}
        			else{alert("something is wrong sorry!");}
        			selectedlink2=selectedlink1.nextSibling.nextSibling.nextSibling;
        			if (selectedlink2.innerHTML == "Zei Codestone"){code1 =1;}
        			else if (selectedlink2.innerHTML == "Har Codestone"){code1 =2;}
        			else if (selectedlink2.innerHTML == "Orn Codestone"){code1 =3;}
        			else if (selectedlink2.innerHTML == "Bri Codestone"){code1 =4;}
        			else if (selectedlink2.innerHTML == "Main Codestone"){code1 =5;}
        			else if (selectedlink2.innerHTML == "Eo Codestone"){code1 =6;}
        			else if (selectedlink2.innerHTML == "Vo Codestone"){code1 =7;}
        			else if (selectedlink2.innerHTML == "Lu Codestone"){code1 =8;}
        			else if (selectedlink2.innerHTML == "Tai-Kai Codestone"){code1 =9;}
        			else if (selectedlink2.innerHTML == "Mau Codestone"){code1 =10;}
        			else{
        				var codestones=[code0,code1,code2,code3,code4,code5,code6,code7].join(",");
        				GM_setValue("codestones",codestones);
        				window.location="http://www.neopets.com/safetydeposit.phtml";
        				}	
        			selectedlink3=selectedlink2.nextSibling.nextSibling.nextSibling;
        			if (selectedlink3.innerHTML == "Zei Codestone"){code2 =1;}
        			else if (selectedlink3.innerHTML == "Har Codestone"){code2 =2;}
        			else if (selectedlink3.innerHTML == "Orn Codestone"){code2 =3;}
        			else if (selectedlink3.innerHTML == "Bri Codestone"){code2 =4;}
        			else if (selectedlink3.innerHTML == "Main Codestone"){code2 =5;}
        			else if (selectedlink3.innerHTML == "Eo Codestone"){code2 =6;}
        			else if (selectedlink3.innerHTML == "Vo Codestone"){code2 =7;}
        			else if (selectedlink3.innerHTML == "Lu Codestone"){code2 =8;}
        			else if (selectedlink3.innerHTML == "Tai-Kai Codestone"){code2 =9;}
        			else if (selectedlink3.innerHTML == "Mau Codestone"){code2 =10;}
        			else{
        			var codestones =[code0,code1,code2,code3,code4,code5,code6,code7].join(",");
        			GM_setValue("codestones",codestones);
        			window.location="http://www.neopets.com/safetydeposit.phtml";
        			}
        			selectedlink4=selectedlink3.nextSibling.nextSibling.nextSibling;
        			if (selectedlink4.innerHTML == "Zei Codestone"){code3 =1;}
        			else if (selectedlink4.innerHTML == "Har Codestone"){code3 =2;}
        			else if (selectedlink4.innerHTML == "Orn Codestone"){code3 =3;}
        			else if (selectedlink4.innerHTML == "Bri Codestone"){code3 =4;}
        			else if (selectedlink4.innerHTML == "Main Codestone"){code3 =5;}
        			else if (selectedlink4.innerHTML == "Eo Codestone"){code3 =6;}
        			else if (selectedlink4.innerHTML == "Vo Codestone"){code3 =7;}
        			else if (selectedlink4.innerHTML == "Lu Codestone"){code3 =8;}
        			else if (selectedlink4.innerHTML == "Tai-Kai Codestone"){code3 =9;}
        			else if (selectedlink4.innerHTML == "Mau Codestone"){code3 =10;}
        			else{
        			codestones=[code0,code1,code2,code3,code4,code5,code6,code7].join(",");
        			GM_setValue("codestones",codestones);
        			window.location="http://www.neopets.com/safetydeposit.phtml";
        			}
        			selectedlink5=selectedlink4.nextSibling.nextSibling.nextSibling;
        			if (selectedlink5.innerHTML == "Zei Codestone"){code4 =1;}
        			else if (selectedlink5.innerHTML == "Har Codestone"){code4 =2;}
        			else if (selectedlink5.innerHTML == "Orn Codestone"){code4 =3;}
        			else if (selectedlink5.innerHTML == "Bri Codestone"){code4 =4;}
        			else if (selectedlink5.innerHTML == "Main Codestone"){code4 =5;}
        			else if (selectedlink5.innerHTML == "Eo Codestone"){code4 =6;}
        			else if (selectedlink5.innerHTML == "Vo Codestone"){code4 =7;}
        			else if (selectedlink5.innerHTML == "Lu Codestone"){code4 =8;}
        			else if (selectedlink5.innerHTML == "Tai-Kai Codestone"){code4 =9;}
        			else if (selectedlink5.innerHTML == "Mau Codestone"){code4 =10;}
        			else{
        			codestones=[code0,code1,code2,code3,code4,code5,code6,code7].join(",");
        			GM_setValue("codestones",codestones);
        			window.location="http://www.neopets.com/safetydeposit.phtml";
        			}
        			selectedlink6=selectedlink5.nextSibling.nextSibling.nextSibling;
        			if (selectedlink6.innerHTML == "Zei Codestone"){code5 =1;}
        			else if (selectedlink6.innerHTML == "Har Codestone"){code5 =2;}
        			else if (selectedlink6.innerHTML == "Orn Codestone"){code5 =3;}
        			else if (selectedlink6.innerHTML == "Bri Codestone"){code5 =4;}
        			else if (selectedlink6.innerHTML == "Main Codestone"){code5 =5;}
        			else if (selectedlink6.innerHTML == "Eo Codestone"){code5 =6;}
        			else if (selectedlink6.innerHTML == "Vo Codestone"){code5 =7;}
        			else if (selectedlink6.innerHTML == "Lu Codestone"){code5 =8;}
        			else if (selectedlink6.innerHTML == "Tai-Kai Codestone"){code5 =9;}
        			else if (selectedlink6.innerHTML == "Mau Codestone"){code5 =10;}
        			else{
        			codestones=[code0,code1,code2,code3,code4,code5,code6,code7].join(",");
        			GM_setValue("codestones",codestones);
        			window.location="http://www.neopets.com/safetydeposit.phtml";
        			}
        			selectedlink7=selectedlink6.nextSibling.nextSibling.nextSibling;
        			if (selectedlink7.innerHTML == "Zei Codestone"){code6 =1;}
        			else if (selectedlink7.innerHTML == "Har Codestone"){code6 =2;}
        			else if (selectedlink7.innerHTML == "Orn Codestone"){code6 =3;}
        			else if (selectedlink7.innerHTML == "Bri Codestone"){code6 =4;}
        			else if (selectedlink7.innerHTML == "Main Codestone"){code6 =5;}
        			else if (selectedlink7.innerHTML == "Eo Codestone"){code6 =6;}
        			else if (selectedlink7.innerHTML == "Vo Codestone"){code6 =7;}
        			else if (selectedlink7.innerHTML == "Lu Codestone"){code6 =8;}
        			else if (selectedlink7.innerHTML == "Tai-Kai Codestone"){code6 =9;}
        			else if (selectedlink7.innerHTML == "Mau Codestone"){code6 =10;}
        			else{
        			codestones=[code0,code1,code2,code3,code4,code5,code6,code7].join(",");
        			GM_setValue("codestones",codestones);
        			window.location="http://www.neopets.com/safetydeposit.phtml";
        			}
        			selectedlink8=selectedlink7.nextSibling.nextSibling.nextSibling;
        			if (selectedlink8.innerHTML == "Zei Codestone"){code7 =1;}
        			else if (selectedlink8.innerHTML == "Har Codestone"){code7 =2;}
        			else if (selectedlink8.innerHTML == "Orn Codestone"){code7 =3;}
        			else if (selectedlink8.innerHTML == "Bri Codestone"){code7 =4;}
        			else if (selectedlink8.innerHTML == "Main Codestone"){code7 =5;}
        			else if (selectedlink8.innerHTML == "Eo Codestone"){code7 =6;}
        			else if (selectedlink8.innerHTML == "Vo Codestone"){code7 =7;}
        			else if (selectedlink8.innerHTML == "Lu Codestone"){code7 =8;}
        			else if (selectedlink8.innerHTML == "Tai-Kai Codestone"){code7 =9;}
        			else if (selectedlink8.innerHTML == "Mau Codestone"){code7 =10;}
        			else{
        			codestones=[code0,code1,code2,code3,code4,code5,code6,code7].join(",");
        			GM_setValue("codestones",codestones);
        			window.location="http://www.neopets.com/safetydeposit.phtml";
        			}		
        		}
        	}

//pays for lesson
		if(GM_getValue("stage")==3){
        		if(document.body.innerHTML.indexOf('Current Course Status') != -1){
					if (p==0){
						var links = document.evaluate('//td[@class="content"]//tbody//tr[2]//a[@href]', document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							for (var i = 0; i < links.snapshotLength; ++i){
							here = links.snapshotItem(i);
							if (here.href.match('process_training.phtml.type=pay')){GM_setValue("stage","4");window.location=here.href;return;
							}
						}
					}
					if (p==1){
						var links = document.evaluate('//td[@class="content"]//tbody//tr[4]//a[@href]', document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							for (var i = 0; i < links.snapshotLength; ++i){
							here = links.snapshotItem(i);
							if (here.href.match('process_training.phtml.type=pay')){GM_setValue("stage","4");window.location=here.href;return;
							}
						}
					}
					if (p==2){
						var links = document.evaluate('//td[@class="content"]//tbody//tr[6]//a[@href]', document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							for (var i = 0; i < links.snapshotLength; ++i){
							here = links.snapshotItem(i);
							if (here.href.match('process_training.phtml.type=pay')){GM_setValue("stage","4");window.location=here.href;return;
							}
						}
					}
					if (p==3){
						var links = document.evaluate('//td[@class="content"]//tbody//tr[8]//a[@href]', document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							for (var i = 0; i < links.snapshotLength; ++i){
							here = links.snapshotItem(i);
							if (here.href.match('process_training.phtml.type=pay')){GM_setValue("stage","4");window.location=here.href;return;
							}
						}
					}
				}
			}
        	
		if(GM_getValue("stage")>1){
				
        		if(document.body.innerHTML.indexOf('Complete Course!') != -1){
        			var button = document.evaluate('//input[@type = "submit" and @value = "Complete Course!"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();button.form.submit();return;
        		}
        		
        		if(document.body.innerHTML.indexOf('now has increased') != -1){var button = document.evaluate('//input[@type = "submit" and @value = "Go Back to Training School"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();button.form.submit();return;
        		}
        		
        		if(document.body.innerHTML.indexOf('Choose a menu item from above to continue...') != -1){
        			GM_setValue("stage","1");window.location="http://www.neopets.com/island/training.phtml?type=status";return;
        		}
        		
        		if(document.body.innerHTML.indexOf('That pet is already doing a course') != -1){
        			window.location="http://www.neopets.com/island/training.phtml?type=status";return;
        		}
				if (p==0){
					if(document.body.innerHTML.indexOf('Time till course finishes :') != -1){
						var button = document.evaluate('//td[@class="content"]//tbody//tr[2]//td[2]//b',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);
								var random_min = Math.floor((3-0)*Math.random()+ 1);
								var t = [parseInt(button.innerHTML.match(/\b\d+ hrs\b/)),(parseInt(button.innerHTML.match(/\b\d+ minutes\b/))+random_min)];
								var wait = (t[0]*3600000)+(t[1]*60000);
								window.setTimeout(function(){window.location.reload();},wait);return;
							}		
					}
				}
				if (p==1){
					if(document.body.innerHTML.indexOf('Time till course finishes :') != -1){
						var button = document.evaluate('//td[@class="content"]//tbody//tr[4]//td[2]//b',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);
								var random_min = Math.floor((5-1)*Math.random()+ 2);
								var t = [parseInt(button.innerHTML.match(/\b\d+ hrs\b/)),(parseInt(button.innerHTML.match(/\b\d+ minutes\b/))+random_min)];
								var wait = (t[0]*3600000)+(t[1]*60000);
								window.setTimeout(function(){window.location.reload();},wait);return;
							}		
					}
				}
				if (p==2){
					if(document.body.innerHTML.indexOf('Time till course finishes :') != -1){
						var button = document.evaluate('//td[@class="content"]//tbody//tr[6]//td[2]//b',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);
								var random_min = Math.floor((5-1)*Math.random()+ 2);
								var t = [parseInt(button.innerHTML.match(/\b\d+ hrs\b/)),(parseInt(button.innerHTML.match(/\b\d+ minutes\b/))+random_min)];
								var wait = (t[0]*3600000)+(t[1]*60000);
								window.setTimeout(function(){window.location.reload();},wait);return;
							}		
					}
				}
				if (p==3){
					if(document.body.innerHTML.indexOf('Time till course finishes :') != -1){
						var button = document.evaluate('//td[@class="content"]//tbody//tr[8]//td[2]//b',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (button.snapshotLength > 0){button = button.snapshotItem(0);
								var random_min = Math.floor((5-1)*Math.random()+ 2);
								var t = [parseInt(button.innerHTML.match(/\b\d+ hrs\b/)),(parseInt(button.innerHTML.match(/\b\d+ minutes\b/))+random_min)];
								var wait = (t[0]*3600000)+(t[1]*60000);
								window.setTimeout(function(){window.location.reload();},wait);return;
							}		
					}
				}			
			
			
			}
        
	}
          
	if(document.body.innerHTML.indexOf('Your Safety Deposit Box') != -1){
        	if(GM_getValue("stage")==2){
        		var codestones = GM_getValue("codestones","").split(",");
        		if (codestones[0] ==0 && codestones[1]==0 && codestones[2]==0 && codestones[3]==0 && codestones[4]==0 && codestones[5]==0 && codestones[6]==0 && codestones[7]==0){GM_setValue("stage","3");window.location="http://www.neopets.com/island/training.phtml?type=status";return}
        
        		if (codestones[0]!=0){
        			if (codestones[0]==1){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Zei Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[0]==2){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Har Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[0]==3){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Orn Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[0]==4){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Bri Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[0]==5){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Main Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[0]==6){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Eo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[0]==7){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Vo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[0]==8){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Lu Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[0]==9){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Tai-Kai Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[0]==10){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Mau Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        		}
        		
        		if (codestones[1]!=0){
        			if (codestones[1]==1){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Zei Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[1]==2){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Har Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[1]==3){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Orn Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[1]==4){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Bri Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[1]==5){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Main Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[1]==6){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Eo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[1]==7){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Vo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[1]==8){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Lu Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[1]==9){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Tai-Kai Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[1]==10){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Mau Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        		}
        		
        		if (codestones[2]!=0){
        			if (codestones[2]==1){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Zei Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[2]==2){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Har Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[2]==3){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Orn Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[2]==4){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Bri Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[2]==5){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Main Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[2]==6){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Eo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[2]==7){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Vo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[2]==8){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Lu Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[2]==9){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Tai-Kai Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[2]==10){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Mau Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        		
        			
        			
        		}	
				        		
				if (codestones[3]!=0){
        			if (codestones[3]==1){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Zei Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[3]==2){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Har Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[3]==3){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Orn Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[3]==4){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Bri Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[3]==5){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Main Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[3]==6){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Eo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[3]==7){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Vo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[3]==8){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Lu Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[3]==9){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Tai-Kai Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[3]==10){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Mau Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        		}
        		
        		if (codestones[4]!=0){
        			if (codestones[4]==1){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Zei Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[4]==2){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Har Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[4]==3){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Orn Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[4]==4){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Bri Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[4]==5){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Main Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[4]==6){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Eo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[4]==7){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Vo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[4]==8){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Lu Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[4]==9){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Tai-Kai Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[4]==10){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Mau Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        		}
        		
        		if (codestones[5]!=0){
        			if (codestones[5]==1){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Zei Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[5]==2){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Har Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[5]==3){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Orn Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[5]==4){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Bri Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[5]==5){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Main Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[5]==6){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Eo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[5]==7){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Vo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[5]==8){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Lu Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[5]==9){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Tai-Kai Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[5]==10){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Mau Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[2] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        		
        			
        			
        		}
				
				if (codestones[6]!=0){
        			if (codestones[6]==1){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Zei Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[6]==2){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Har Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[6]==3){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Orn Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[6]==4){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Bri Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[6]==5){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Main Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[6]==6){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Eo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[6]==7){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Vo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[6]==8){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Lu Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[6]==9){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Tai-Kai Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[6]==10){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Mau Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[0] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        		}
        		
        		if (codestones[7]!=0){
        			if (codestones[7]==1){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Zei Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[7]==2){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Har Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[7]==3){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Orn Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[7]==4){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Bri Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[7]==5){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Main Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[7]==6){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Eo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[7]==7){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Vo Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[7]==8){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Lu Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[7]==9){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Tai-Kai Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        			else if (codestones[7]==10){
        				var button = document.evaluate('//table[@cellpadding="4"]//tr[contains(.,"Mau Codestone")]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        					if (button.snapshotLength > 0){button = button.snapshotItem(0);codestones[1] =0;GM_setValue("codestones",codestones.join(","));window.location=button.href;return}
        						}
        		}
       
	   var links = document.evaluate("//td[@align='right']//a[@href]", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
								for (var i = 0; i < links.snapshotLength; ++i){
								next = links.snapshotItem(i);}
								if (next.href.match('category=0&obj_name=&offset')){
								document.location=next.href;return;}
								
					
			}
        }
}window.setTimeout(delay, x)