// ==UserScript==
// @name           Antidote [PC] [By Sunsky]
// @namespace      http://hordes.sunsky.fr
// @description    L'indispensable pour bien utiliser le pc
// @include        http://www.hordes.fr/*
// ==/UserScript==

// whatsnew
// - corrections mineures
// /whatsnew

// Options

var version = "V00R08";
var disclaimer_pc_id=4;
var tagl_list = new Array("liezon");
var tagl_tag = '';


//-----------------------------
// TOOLS
//-----------------------------
    function addGlobalStyle(css) {
    	var head, style;
    	head = document.getElementsByTagName('head')[0];
    	if (!head) { return; }
    	style = document.createElement('style');
    	style.type = 'text/css';
    	style.innerHTML = css;
    	head.appendChild(style);
    }

    function addListener(element, type, expression, bubbling)
    {
    	bubbling = bubbling || false;
    	if(window.addEventListener) { // Standard
    		element.addEventListener(type, expression, bubbling);
    		return true;
    	} else if(window.attachEvent) { // IE
    		element.attachEvent('on' + type, expression);
    		return true;
    	} else return false;
    }

//-----------------------------
// INCLUDE EXTERN JS FOR EASY DEV AND FUNCTIONS THAT CAN BE USED IN PAGE
//-----------------------------
	function pc_add() {
		var pc_menu = document.createElement("div");
		
		script='\n';
		script+='function pc_box_switch(cible) {\n';
		script+='    document.getElementById("pc_box_home").style.display="none";\n';
		script+='    document.getElementById("pc_box_about").style.display="none";\n';
		script+='    document.getElementById("pc_box_security").style.display="none";\n';
		script+='    document.getElementById("pc_box_"+cible).style.display="block";\n';
		script+='    pc_show_caution();\n';
	    script+='}\n';
	    script+='function pc_hide_caution() {\n';
		script+='    document.getElementById("pc_caution").style.display="none";\n';
		script+='    document.getElementById("pc_caution_hide").style.display="block";\n';
		script+='}\n';
	    script+='function pc_show_caution() {\n';
		script+='    document.getElementById("pc_caution").style.display="block";\n';
		script+='    document.getElementById("pc_caution_hide").style.display="none";\n';
	    script+='}\n';
    	
    	pc_menu.id = 'PC_js_include';
		pc_menu.innerHTML = '<script type="text/javascript">var pc_core_version = "'+version+'";'+script+'</script>';
		document.body.insertBefore(pc_menu, document.body.firstChild);
	}
	
    function pc_page_periodic() {
		update_forum();
		update_ghost();
		update_outside();
	}



//-----------------------------
// GENERAL
//-----------------------------
	var usr_key;
	function get_key() {
	    usr_key="";
        url_disclaimer = 'http://www.hordes.fr/disclaimer?id=' + disclaimer_pc_id + ';rand='  + Math.random();
	    GM_xmlhttpRequest({ 
	        method: 'GET', 
	        url: url_disclaimer, 
	        onload: function(responseDetails) { 
	            
	            node='<input type="hidden" name="key" value="';
	            a=responseDetails.responseText.indexOf(node);
	            if(a>0) {
	                begin = a+node.length;
	                end = responseDetails.responseText.indexOf('"/>',begin);
	                usr_key = responseDetails.responseText.substr(begin, (end-begin) );
	                
	            }else{
	                usr_key = "?";
	            }       
	            
            }
        });
	}


//-----------------------------
// HEADER
//-----------------------------
	function add_top_panel() {
		var div_event = document.evaluate("//div[@class='eventInfos']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if(div_event.snapshotLength>0) {
			var pc_panel = document.createElement("div");
			pc_panel.innerHTML = '<div style="position:absolute;width:100%; font-size:12px;"> <div style="padding-top:100px;width:300px;margin:auto;text-align:center;"><div style="height:150px;width:320px;position:absolute;margin:-100px 0px 0px -320px;cursor:pointer;" onclick="js.Js.reboot(); return false;"></div> <a href="http://forum.hordesmap.com/" class="button" style="width:300px;text-align:center"><img src="http://www.hordesmap.com/misc/favicon.gif" alt="" /> Oh ! Et si j\'allais sur le Forum HordesM@p !</a> </div></div>';
			document.body.insertBefore(pc_panel, document.body.firstChild);
			addGlobalStyle("div.event { float:left; margin-left:10px; } div.eventInfos { float:right; margin-right:20px; margin-top:-10px; }");
		} else {
			var pc_panel = document.createElement("div");
			pc_panel.innerHTML = '<div id="div_compteur" style="position:absolute;width:100%; font-size:12px;"> <div style="width:622px;margin:auto;padding: 30px 8px 0px 320px;"> <div style="height:150px;width:320px;position:absolute;margin:-30px 0px 0px -320px;cursor:pointer;" onclick="js.Js.reboot(); return false;"></div> <div style="text-align:right;color:#7E4D2A"><h3 style="margin:50px 0 0 0;padding:0;font-size:25px;color:#6A2B20;"><img src="http://www.hordesmap.com/mix/alarm.png" alt="" /> <span id="compteur">00:00:00</span></h3>Avant le passage de la Horde ... </div> </div></div>';
			document.body.insertBefore(pc_panel, document.body.firstChild);
		}
	}
    
	
	
	function pc_add_caution() {
	    var pc_caution = document.createElement("div");
	    caution='';
	    
		var div_event = document.evaluate("//div[@class='eventInfos']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if(div_event.snapshotLength<1) {	
			if(usr_key=='' || usr_key==undefined) {
			    setTimeout(pc_add_caution,500);	
			    return ;
			}
			if (usr_key!='?')
			    pc_link='http://hordes.sunsky.fr?key='+usr_key
			else
			    pc_link='http://hordes.sunsky.fr'
			caution+='<div id="pc_caution" style="margin-left:-100px;font-size:10px;background-color:#524053;position:absolute;border:#FFFFFF solid 1px;outline:#000000 solid 1px;height:100px;width:350px;left:50%;top:10px;padding:5px;z-index:100;">';
			caution+=  '<span style="float:right;">';
			caution+=    '<a href="#" onclick="pc_box_switch(\'home\');"><img src="http://data.hordes.fr/gfx/icons/small_archive.gif" alt="??" title="Informations" /></a>';
			caution+=    '<a href="#" onclick="pc_box_switch(\'security\');"><img src="http://www.hordes.fr/gfx/forum/smiley/h_warning.gif" alt="??" title="Consignes de sÃ©curitÃ©" /></a>';
			caution+=    '<a href="#" onclick="pc_box_switch(\'about\');"><img src="http://data.hordes.fr/gfx/icons/small_help.gif" alt="??" title="A propos ..." /></a>';
			caution+=    '<a href="#" onclick="pc_hide_caution();"><img src="http://data.sunsky.fr/hordes/skin/icons/small_less.gif" alt="??" title="Masquer" /></a>';			
			caution+=  '</span>';
			caution+=  '<h2 style="background:none;margin:0;padding:0;"><img src="http://data.sunsky.fr/hordes/skin/icons/antidote.png" alt="??" /> Antidote [Poste de ContrÃ´le]</h2>';
			caution+=  '<div id="pc_box_home" style="margin-top:3px"><p>Ce script, en s\'insÃ©rant dans l\'interface de hordes.fr, facilite l\'utilisation du <a target="_blank" href="'+pc_link+'">Poste de ContrÃ´le</a>.</p><p> Certaines fonctions affichÃ©es sur le site sont indÃ©pendantes de Hordes.fr et de MotionTwin.</p></div>';
			caution+=  '<div id="pc_box_about" style="display:none;margin-top:3px"><p>Version '+version+'<br /><br />Script crÃ©Ã© par Ma c\'hi, adaptÃ© par Sunsky (mt@sunsky.fr) pour http://hordes.sunsky.fr</p></div>';
			caution+=  '<div id="pc_box_security" style="display:none;margin-top:3px"><p>Pour des raisons de sÃ©curitÃ©, veuillez Ã©viter de manipuler toutes informations sensibles (mot de passe par exemple) sans avoir prÃ©alablement <strong>dÃ©sactivÃ© ce script</strong>.</p><p>L\'activation et la dÃ©activation se situe au niveau de la tÃªte de singe situÃ©e en bas Ã  droite de votre navigateur.</div>';
			caution+='</div>';
			
			
			caution+='<div id="pc_caution_hide" style="display:none;margin-left:-100px;font-size:10px;background-color:#524053;position:absolute;border:#FFFFFF solid 1px;outline:#000000 solid 1px;height:15px;width:350px;left:50%;top:10px;padding:5px;z-index:100;">';
			caution+=  '<span style="float:right;">';
			caution+=    '<a href="#" onclick="pc_box_switch(\'home\');"><img src="http://data.hordes.fr/gfx/icons/small_archive.gif" alt="??" title="Informations" /></a>';
			caution+=    '<a href="#" onclick="pc_box_switch(\'security\');"><img src="http://www.hordes.fr/gfx/forum/smiley/h_warning.gif" alt="??" title="Consignes de sÃ©curitÃ©" /></a>';
			caution+=    '<a href="#" onclick="pc_box_switch(\'about\');"><img src="http://data.hordes.fr/gfx/icons/small_help.gif" alt="??" title="A propos ..." /></a>';
			caution+=    '<a href="#" onclick="pc_show_caution();"><img src="http://data.sunsky.fr/hordes/skin/icons/small_more.gif" alt="??" title="Afficher" /></a>';
			caution+=  '<div id="pc_box_about" style="display:none;"><p>Version '+version+'</p><p>Script crÃ©Ã© par Ma c\'hi, adaptÃ© par Sunsky (mt@sunsky.fr) pour http://hordes.sunsky.fr</p></div>';
			caution+=  '</span>';
			caution+=  '<h2 style="background:none;margin:0;padding:0;"><img src="http://data.sunsky.fr/hordes/skin/icons/antidote.png" alt="??" /> Antidote [Poste de ContrÃ´le]</h2>';
			caution+='</div>';

		}else{
		    caution+='<div id="pc_caution" style="margin-left:-100px;font-size:10px;background-color:#993333;position:absolute;border:#FFFFFF solid 1px;outline:#000000 solid 1px;height:100px;width:350px;left:50%;top:10px;padding:5px;z-index:100;">';
			caution+=  '<span style="float:right;">';
			caution+=    '<a href="#" onclick="pc_box_switch(\'home\');"><img src="http://data.hordes.fr/gfx/icons/small_archive.gif" alt="??" title="Informations" /></a>';
			caution+=    '<a href="#" onclick="pc_box_switch(\'security\');"><img src="http://www.hordes.fr/gfx/forum/smiley/h_warning.gif" alt="??" title="Consignes de sÃ©curitÃ©" /></a>';
			caution+=    '<a href="#" onclick="pc_box_switch(\'about\');"><img src="http://data.hordes.fr/gfx/icons/small_help.gif" alt="??" title="A propos ..." /></a>';
			caution+=    '<a href="#" onclick="pc_hide_caution();"><img src="http://data.sunsky.fr/hordes/skin/icons/small_less.gif" alt="??" title="Masquer" /></a>';
			caution+=  '</span>';
			caution+=  '<h2 style="background:none;margin:0;padding:0;"><img src="http://data.sunsky.fr/hordes/skin/icons/antidote.png" alt="??" /> Antidote [Poste de ContrÃ´le]</h2>';
			caution+=  '<div id="pc_box_home" style="margin-top:3px"><p>Ce script facilite l\'utilisation du <a target="_blank" href="http://hordes.sunsky.fr">Poste de ContrÃ´le</a> directement depuis l\'interface de hordes.fr.</p><p> Le script est activÃ© : certaines fonctions affichÃ©es sur le site sont indÃ©pendantes de Hordes.fr et de MotionTwin.</p></div>';
			caution+=  '<div id="pc_box_about" style="display:none;margin-top:3px"><p>Version '+version+'<br /><br />Script crÃ©Ã© par Ma c\'hi, adaptÃ© par Sunsky (mt@sunsky.fr) pour http://hordes.sunsky.fr</p></div>';
			caution+=  '<div id="pc_box_security" style="display:none;margin-top:3px"><p>Pour des raisons de sÃ©curitÃ©, veuillez Ã©viter de manipuler toutes informations sensibles (mot de passe par exemple) sans avoir prÃ©alablement <strong>dÃ©sactivÃ© ce script</strong>.</p><p>L\'activation et la dÃ©activation se situe au niveau de la tÃªte de singe situÃ©e en bas Ã  droite de votre navigateur.</div>';
			caution+='</div>';			
			
			caution+='<div id="pc_caution_hide" style="display:none;margin-left:-100px;font-size:10px;background-color:#524053;position:absolute;border:#FFFFFF solid 1px;outline:#000000 solid 1px;height:15px;width:350px;left:50%;top:10px;padding:5px;z-index:100;">';
			caution+=  '<span style="float:right;">';
			caution+=    '<a href="#" onclick="pc_box_switch(\'home\');"><img src="http://data.hordes.fr/gfx/icons/small_archive.gif" alt="??" title="Informations" /></a>';
			caution+=    '<a href="#" onclick="pc_box_switch(\'security\');"><img src="http://www.hordes.fr/gfx/forum/smiley/h_warning.gif" alt="??" title="Consignes de sÃ©curitÃ©" /></a>';
			caution+=    '<a href="#" onclick="pc_box_switch(\'about\');"><img src="http://data.hordes.fr/gfx/icons/small_help.gif" alt="??" title="A propos ..." /></a>';
			caution+=    '<a href="#" onclick="pc_show_caution();"><img src="http://data.sunsky.fr/hordes/skin/icons/small_more.gif" alt="??" title="Afficher" /></a>';
			caution+=  '<div id="pc_box_about" style="display:none;"><p>Version '+version+'</p><p>Script crÃ©Ã© par Ma c\'hi, adaptÃ© par Sunsky (mt@sunsky.fr) pour http://hordes.sunsky.fr</p></div>';
			caution+=  '</span>';
			caution+=  '<h2 style="background:none;margin:0;padding:0;"><img src="http://data.sunsky.fr/hordes/skin/icons/antidote.png" alt="??" /> Antidote [Poste de ContrÃ´le]</h2>';
			caution+='</div>';
		}
		
		
		pc_caution.innerHTML = caution;
        document.body.insertBefore(pc_caution, document.body.firstChild);
	}	
	
//-----------------------------
// PAGE AME
//-----------------------------
    function update_ghost() {
         var currentcity = document.evaluate("//div[@class='current']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
         if (currentcity.snapshotLength==0) {return}
         currentcity_node=currentcity.snapshotItem(0);
         currentcity_txt=currentcity_node.innerHTML;
         a=currentcity_txt.indexOf('<strong>')
         if (a>0)
         {
            begin=a+8
            end=currentcity_txt.indexOf('</strong>',begin);
            
    		currentcity=currentcity_txt.substr(begin,end-begin-1).replace(/\n+/g, '');
    		
            //alert(currentcity);
            currentcity='<a target="_blank" href="http://hordes.sunsky.fr?city='+escape(currentcity)+'">'+currentcity+'<img alt="" src="http://hordes.sunsky.fr/favicon.png"/></a>'
            
            currentcity_node.innerHTML=currentcity_txt.substr(0,begin)+currentcity+currentcity_txt.substr(end,currentcity_txt.length-end)
        }
         
        
        currentcity_node.className=currentcity_node.className+' pc_ok';
    }
//-----------------------------
// PAGE FORUM
//-----------------------------
    function update_forum() {
        var posts = document.evaluate("//div[@class='thread']//div[@class='message']|//div[@class='thread']//div[@class='message heroPost']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        
        if (posts.snapshotLength==0) {return}
    	var title = document.evaluate("//div[@class='thread']//h1", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    	title.snapshotItem(0).innerHTML=title.snapshotItem(0).innerHTML+".";
        
    	var pseudos = document.evaluate("//div[@class='thread']//div[@class='message']//div[@class='author']|//div[@class='thread']//div[@class='message heroPost']//div[@class='author']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    	var avatars = document.evaluate("//div[@class='thread']//div[@class='message']//div[@class='infos']//div[@class='avatar']|//div[@class='thread']//div[@class='message heroPost']//div[@class='infos']//div[@class='avatar']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    	var messages = document.evaluate("//div[@class='thread']//div[@class='message']//div[@class='content']|//div[@class='thread']//div[@class='message heroPost']//div[@class='content']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    	var positions = document.evaluate("//div[@class='thread']//div[@class='message']//div[@class='pos']|//div[@class='thread']//div[@class='message']//div[@class='city']|//div[@class='thread']//div[@class='message heroPost']//div[@class='pos']|//div[@class='thread']//div[@class='message heroPost']//div[@class='city']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    	for(var i=0; i<posts.snapshotLength; i++) {
    		var post = posts.snapshotItem(i);
    		var pseudo = pseudos.snapshotItem(i);
    		var avatar = avatars.snapshotItem(i);
    		var message = messages.snapshotItem(i);
    		var position = positions.snapshotItem(i);
    		
    		var pseudoName;
    		var pseudoTxt;
    		pseudoTxt=pseudo.innerHTML;
    		
    		// mort
    		death=pseudoTxt.indexOf('small_death');
    		if (death>0)
    		{   end=pseudoTxt.indexOf('<div class="title">');
    		    pseudoTxt=pseudoTxt.substr(death,end-death);
    		    pseudoName=pseudoTxt.replace(/\s+/g, '').replace(/(<\/?[^>]+>)/gi, '');
    		}else{
    		    pseudoName=pseudo.childNodes[3].innerHTML.replace(/\s+/g, '').replace(/(<\/?[^>]+>)/gi, '');
    		}
    		
    		var tagl = false;
    		for(var j=0; j<tagl_list.length; j++)
    			if(tagl_list[j].toLowerCase()==pseudoName.toLowerCase()) {
    				tagl=true;
    				break;
    			}
            
            cityname=position.innerHTML.replace(/\n+/g, '').replace(/(<\/?[^>]+>)/gi, '');
            
            if (death>0)
            {   
            }
            else if (cityname=='Ancienne CitÃ© OubliÃ©e')
            {   position.innerHTML='<img src="http://www.hordes.fr/gfx/forum/smiley/h_death.gif" alt="">';
            }else if (cityname != 'en ville' && cityname.substring(0,1)!='[') {
                position.innerHTML='<img alt="" src="http://hordes.sunsky.fr/favicon.png"/> <a target="_blank" href="http://hordes.sunsky.fr?city='+escape(cityname)+'">'+cityname+'</a>';
            }
            
    		if(tagl) {
    			avatar.innerHTML='';
    			post.className=post.className+' pc_tagl';
    			position.innerHTML=position.innerHTML+'<a onclick="if(this.parentNode.parentNode.parentNode.parentNode.className==\'message pc_tagl\') { this.parentNode.parentNode.parentNode.parentNode.className=\'message pc_tagl pc_tagl_show\';this.innerHTML=\'<img src=\\\'http://data.sunsky.fr/hordes/skin/icons/small_less.gif\\\' alt=\\\'??\\\' />\'; } else { this.parentNode.parentNode.parentNode.parentNode.className=\'message pc_tagl\';this.innerHTML=\'<img src=\\\'http://data.sunsky.fr/hordes/skin/icons/small_more.gif\\\' alt=\\\'??\\\' />\';}"><img src="http://data.sunsky.fr/hordes/skin/icons/small_more.gif" alt="??" /></a>';
    			pseudo.innerHTML=pseudo.innerHTML+" "+tagl_tag;
    		}else
            {   post.className=post.className+' pc_tagl_ok';    
            }
    	}
    }

//-----------------------------
// PAGE OUTSIDE
//-----------------------------
	function update_outside() {
		var a_itemActionsButton = document.evaluate("//div[@id='itemActions']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if(a_itemActionsButton.snapshotLength>0) {
			// AJOUT BOUTON MAJ
			var pcbtn_isset = document.evaluate("//a[@id='PC_update_btn']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
			if(pcbtn_isset.snapshotLength==0) {
				a_itemActionsButton = a_itemActionsButton.snapshotItem(0);
				var pcbtn = document.createElement('div');
				pcbtn.innerHTML='\n<a class="button" id="PC_update_btn" href="#" style="margin-bottom:-1px;display: block;" onmouseover="js.HordeTip.showSpecialTip(this,\'helpTip\',\'\', \'  			<p>Mettez Ã  jour le <strong>Poste de ContrÃ´le</strong> afin d\\\'informer tout le monde de l\\\'Ã©tat de cette zone.<p><i>(Objets par terre, zombies, ...)</i></p> \');" onmouseout="js.HordeTip.hide()"><img alt="" src="http://hordes.sunsky.fr/favicon.png"/> Mettre Ã  jour le PC</a>\n';
				
				a_itemActionsButton.parentNode.insertBefore(pcbtn, a_itemActionsButton.nextSibling);
			}		
		}
	}
	
	function pc_update(){
	    if(usr_key!=''&&usr_key!=undefined) {
    	    url_update='http://hordes.sunsky.fr/api/update?key='+usr_key;
    	    GM_xmlhttpRequest({ 
    		    method: 'GET', 
    		    url: url_update, 
    		    onload: function(responseDetails) {
    			    
    				switch(responseDetails.responseText.replace(/\n+/g, '')) {
    				    case('PC_OK'):
    				        //document.getElementById('notificationText').innerHTML = "La mise Ã  jour du <strong class='tool'><img src='http://hordes.sunsky.fr/favicon.png' alt='??'/> PC</strong> s'est <strong>bien dÃ©roulÃ©</strong>.";
    				        //document.getElementById('notification').className='showNotif';
    				        var input = document.evaluate("//form[@class='speak']//input[@class='field']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    				        input.snapshotItem(0).value="Le PC vient d'Ãªtre actualisÃ© !";
    				        var form = document.evaluate("//form[@class='speak']//input[@class='button']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    				        form.snapshotItem(0).click();
    				        break;
    					case('PC_WRONG_VERSION'):
    						document.getElementById('notificationText').innerHTML = "La version de l'api a changÃ©.<br>Le <strong class='tool'><img src='http://hordes.sunsky.fr/favicon.png' alt='??'/> PC</strong> n'a pas encore Ã©tÃ© mis Ã  jour";
    						document.getElementById('notification').className='showNotif';
    						break;
    					case('PC_WRONG_KEY'):
    						document.getElementById('notificationText').innerHTML = "Votre clÃ© n'a pas la syntaxe exigÃ©e";
    						document.getElementById('notification').className='showNotif';
    						break;
    					case('PC_ATTACK'):
    						document.getElementById('notificationText').innerHTML = "Ca grogne dehors ! Vous Ãªtes mieux Ã  l'intÃ©rieur.";
    						document.getElementById('notification').className='showNotif';
    						break;
    				    case('PC_WRONG_XML'):
    						document.getElementById('notificationText').innerHTML = "Connexion avec www.hordes.fr <b>hors-service</b>";
    						document.getElementById('notification').className='showNotif';
    						break;
    					default:
    						document.getElementById('notificationText').innerHTML = "<strong class='tool'><img src='http://hordes.sunsky.fr/favicon.png' alt='??'/> PC</strong> Erreur inconnue <br /><strong>"+responseDetails.responseText+"</strong>";
    						document.getElementById('notification').className='showNotif';
    						break;
    					self.header("","Erreur","contentConnect");
    
    				}
    		    }
            });
        }else
	    {
	        setTimeout(pc_update,500);	
        }
	
	}

//-----------------------------
// UPDATE TEST PC
//-----------------------------
	function test_update() {
		url_update = 'http://hordes.sunsky.fr/api/antidote_version?t='+Math.random();
		GM_xmlhttpRequest({ 
		    method: 'GET', 
		    url: url_update, 
		    onload: function(responseDetails) {
				last_version = responseDetails.responseText.replace(/\n+/g, '');
				//if(version<last_version) {
				if(version!=last_version) {
					url_whatsnew = 'http://hordes.sunsky.fr/api/antidote_whatsnew?t='+Math.random();
					GM_xmlhttpRequest({ 
					    method: 'GET', 
					    url: url_whatsnew, 
					    onload: function(responseDetails) {
						    whatsnew = responseDetails.responseText;
						    if(confirm('Une nouvelle version ('+last_version+') de \'Antidote [PC]\'  est disponible !\n\nNouveautÃ©s : \n'+whatsnew+'\nCliquez sur OK pour mettre Ã  jour ...')) {
							    alert('Pensez Ã  actualiser la page aprÃ¨s l\'installation ;)');
							    window.location=("http://hordes.sunsky.fr/antidote-pc.user.js");
						    }
					    }
			        });
				}
		    }
	    });
	}
	
	function pc_test_hs() {
		var is_hs = document.evaluate("//div", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		
		
		if(is_hs.snapshotLength==0) {
			var pc_oups = document.createElement("pre");
			pc_oups.innerHTML = 'hordes est HS';
			document.body.insertBefore(pc_oups, document.body.firstChild);
			return -1;
		}
		
		var attack = document.evaluate("//div[@class='eventInfos']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if(attack.snapshotLength>0) {
			//var pc_oups = document.createElement("pre");
			//pc_oups.innerHTML = 'attack';
			//document.body.insertBefore(pc_oups, document.body.firstChild);
			return 0;
		}       
		
		//var test = document.evaluate("//div[@class='gamebody']//div[@class='content']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		  
		//alert(test.snapshotItem(0).innerHTML);
		return 1;
	}

//-----------------------------
// MAIN
//-----------------------------

    function main() {
        var last_version, whatsnew;
    	
    	test_update();
    	
    	state=pc_test_hs();
    	if(state==0) {
    	    pc_add();
    	    setTimeout(pc_add_caution,100);
    	} else if(state>0) {
    	    
    	    get_key();
    	    addGlobalStyle(".pc_tagl div.content { display:none; } .pc_tagl div.infos { background:#333333 !important; margin-bottom:0px !important; }");
    	    addGlobalStyle(".pc_tagl_show div.content { display:block; } .pc_tagl_show div.infos { margin-bottom:5px !important; }");
    		
    		pc_add();
    	    setTimeout(pc_add_caution,100);
    		
    		
    		setInterval(pc_page_periodic,100);
    		setInterval( function() { if(document.getElementById('PC_update_btn')) addListener(document.getElementById('PC_update_btn'),"click", pc_update) }, 1000);
    	}
    }
(function() {
	setTimeout(main,100)
// ------------------------------------
})(); 
// ------------------------------------