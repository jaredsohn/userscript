// ==UserScript==
        // @name           IkariamFriendList (francais)
        // @version        0.5
        // @namespace      Gorzong
        // @description    Este script agrega un pequeño botón en nuestro juego. Arrastrando el ratón sobre un campo, se ampliará donde se podrá agregar amigos/enemigos/vacas y sus respectivas direcciones URL a una lista que permite un acceso rápido a sus islas.
        // @include        http://*ikariam.*/index.php*
        // ==/UserScript==
        // ===========================================================================
        // This script has been made by Elnaira (c) http://www.arisen-guild.com. 
        // Added on by Gorzong.
        // Traducido por Crom.
        // Aún está en pruebas. Deje su mensaje, consejo o sugerencia en http://userscripts.org/scripts/show/32826
        //
        // 		Beta
        //
        //		v0.5	- Added functionality to list Enemys, and Traders.  Also modified it to recognize the server, and have different lists per server.
        // 		v0.4	- Exporting and importing your friendlist is now possible
        // 				- Made code a bit cleaner
        // 		v0.3	- Able to use current page URL in URL field
        // 				- Removed name check
        //		 		- Improved background image
        //		 		- Improved font color
        //		 		- Changed button style to those of Ikariam buttons
        // 		v0.2	- Added delete function
        // 		v0.1	- Making list appear on mouseover
        // 				- Improved images
        // ===========================================================================
        
        // Function to add styles
        if(!window.addGlobalStyle){
        	function addGlobalStyle(css) {
        		var head, style;
        		head = document.getElementsByTagName('head')[0];
        		if (!head) { return; }
        		style = document.createElement('style');
        		style.type = 'text/css';
        		style.innerHTML = css;
        		head.appendChild(style);
        	}
        }
        
        // The actual styles
        addGlobalStyle(
        '#flBox { height: 29px; width: 29px; position: absolute; margin:0px 29px -18px 945px; z-index:31; }' + 
        '#flHeader { height: 26px; background-image: url(http://img168.imageshack.us/img168/4373/flheadervv3.jpg); background-repeat: no-repeat; font-weight: bold; font-size: 13px; text-align: center; padding-top: 5px; cursor: pointer; }' + 
        '#flHeader2 { height: 26px; width: 26px; background-image: url(http://img529.imageshack.us/img529/4585/flheader2kf8.jpg); background-repeat: no-repeat; background-position: right; font-weight: bold; font-size: 13px; text-align: right; cursor: pointer; }' + 
        '#flContent { height: 395px; background-image: url(http://img187.imageshack.us/img187/5917/flbackgroundum3.jpg); margin-top: -5px; padding: 7px; overflow: auto; display: none; font-family: Arial; font-size: 12px; }' + 
        '#flFooter { background-image: url(http://img297.imageshack.us/img297/7509/flfooterwc5.jpg); height: 5px; display: none;  }' +
        '#flBox ul { margin-left: 25px; } #flBox li { list-style: disc; } #flBox img{ margin-bottom:-3px; } #flBox ul a, #flBox p a { color: #542c0f; text-decoration: none; } #flBox ul a:hover, #flBox p a:hover{ color: #542c0f; text-decoration: underline; }' + 
        '#flBox input[type=text]{ color: #542c0f; background-color: #f3edd3; border: 1px solid #542c0f; font-size: 12px; padding: 1px; width: 100px;}');
        
        var IkariamFriendListSave = "IkariamFriendList" + window.document.location.host;
        var IkariamEnemyListSave = "IkariamEnemyList" + window.document.location.host;
        var IkariamTradeListSave = "IkariamTradeList" + window.document.location.host;
        
        // If the list does not exist make it with value 0
        if(!GM_getValue(IkariamFriendListSave)){
        	GM_setValue(IkariamFriendListSave, "0");
        }
        
        if(!GM_getValue(IkariamEnemyListSave)){
        	GM_setValue(IkariamEnemyListSave, "0");
        }
        
        if(!GM_getValue(IkariamTradeListSave)){
        	GM_setValue(IkariamTradeListSave, "0");
        }
        
        
        
        var IkariamFriendList = GM_getValue(IkariamFriendListSave);
        var IkariamEnemyList = GM_getValue(IkariamEnemyListSave);
        var IkariamTradeList = GM_getValue(IkariamTradeListSave);
        
        // Add friend function
        unsafeWindow.flAddFriend = function(){
        	
        	var flNewName = document.getElementById("flNewName");
        	var flNewLink = document.getElementById("flNewLink");
        	var fltype = document.getElementById("fte").value;
        	
        	if(flNewName.value == "" || flNewName.value == flNewName.defaultValue || flNewLink.value == "" || flNewLink.value == flNewLink.defaultValue){
        		return alert("Remplissez tous les champs.");
        	}
        	
        	var NewFriendListContent = '';
        	
        	if (fltype == "Friend"){
        		if(IkariamFriendList == "0"){
        			NewFriendListContent = flNewName.value + '|' + flNewLink.value + ';';
        		}
        		else{
        			NewFriendListContent = IkariamFriendList + flNewName.value + '|' + flNewLink.value + ';';
        		}
        		IkariamListChange = IkariamFriendListSave;
        	}
        	else if(fltype == "Enemy") {
        		if(IkariamEnemyList == "0"){
        			NewFriendListContent = flNewName.value + '|' + flNewLink.value + ';';
        		}
        		else{
        			NewFriendListContent = IkariamEnemyList + flNewName.value + '|' + flNewLink.value + ';';
        		}
        		IkariamListChange = IkariamEnemyListSave;
        	}
        	else {
        		if(IkariamTradeList == "0"){
        			NewFriendListContent = flNewName.value + '|' + flNewLink.value + ';';
        		}
        		else{
        			NewFriendListContent = IkariamTradeList + flNewName.value + '|' + flNewLink.value + ';';
        		}
        		IkariamListChange = IkariamTradeListSave;
        	}
        
        	window.setTimeout(GM_setValue, 0, IkariamListChange, NewFriendListContent);
        	
        	return window.location.reload();
        	
        	
        };
        
        // Delete friend function
        unsafeWindow.flDeleteFriend = function(FriendName, FriendLink){
        	
        	var flConfirm = confirm("Êtes-vous sûr de vouloir supprimer " + FriendName + "?");
        	
        	if(flConfirm == 1){
        	
        		var NewFriendListContent = '';
        		
        		flFiler = FriendName + '|' + FriendLink + ';';
        		NewFriendListContent = IkariamFriendList.replace(flFiler, '');
        		
        		if(NewFriendListContent == ""){
        			NewFriendListContent = "0";
        		}
        		
        		window.setTimeout(GM_setValue, 0, IkariamFriendListSave, NewFriendListContent);
        		
        		return window.location.reload();
        	
        	}
        
        	return;
        };
        
        // Delete enemy function
        unsafeWindow.flDeleteEnemy = function(EnemyName, EnemyLink){
        	
        	var flConfirm = confirm("Êtes-vous sûr de vouloir supprimer " + EnemyName + "?");
        	
        	if(flConfirm == 1){
        	
        		var NewFriendListContent = '';
        		
        		flFiler = EnemyName + '|' + EnemyLink + ';';
        		NewFriendListContent = IkariamEnemyList.replace(flFiler, '');
        		
        		if(NewFriendListContent == ""){
        			NewFriendListContent = "0";
        		}
        		
        		window.setTimeout(GM_setValue, 0, IkariamEnemyListSave, NewFriendListContent);
        		
        		return window.location.reload();
        	
        	}
        
        	return;
        };
        
        // Delete trader function
        unsafeWindow.flDeleteTrade = function(TradeName, TradeLink){
        	
        	var flConfirm = confirm("Êtes-vous sûr de vouloir supprimer " + TradeName + "?");
        	
        	if(flConfirm == 1){
        	
        		var NewFriendListContent = '';
        		
        		flFiler = TradeName + '|' + TradeLink + ';';
        		NewFriendListContent = IkariamTradeList.replace(flFiler, '');
        		
        		if(NewFriendListContent == ""){
        			NewFriendListContent = "0";
        		}
        		
        		window.setTimeout(GM_setValue, 0, IkariamTradeListSave, NewFriendListContent);
        		
        		return window.location.reload();
        	
        	}
        
        	return;
        };
        
        // Function to open/close the frame
        unsafeWindow.flToggleFrame = function(nr){
        	
        	if(nr == 1){
        		document.getElementById("flButtonArea").innerHTML = '<div id="flHeader" onClick="flToggleFrame(0);">Lista de ciudades</div>';
        		document.getElementById("flContent").style.display = 'block';
        		document.getElementById("flFooter").style.display = 'block';
        		document.getElementById("flBox").style.height = '440px';
        		document.getElementById("flBox").style.width = '150px';
        		document.getElementById("flBox").style.margin = '0px 29px -18px 821px';
        	}
        	else{
        		document.getElementById("flButtonArea").innerHTML = '<div id="flHeader2" onMouseOver="flToggleFrame(1);"></div>';
        		document.getElementById("flContent").style.display = 'none';
        		document.getElementById("flFooter").style.display = 'none';
        		document.getElementById("flBox").style.height = '29px';
        		document.getElementById("flBox").style.width = '29px';
        		document.getElementById("flBox").style.margin = '0px 29px -18px 945px';
        	}
        	
        };
        
        // Function to add the current URL to the Link Field
        unsafeWindow.flInsertCurrentURL = function(){
        	
        	var flNewLink = document.getElementById("flNewLink");
        	var flCurrentURL = window.document.location;
        	
        	return flNewLink.value = flCurrentURL;
        	
        };
        
        // Export function
        unsafeWindow.flExport = function(){
        	
        	if(IkariamFriendList == "0"){
        		return alert("Pas d'amis sur la liste.");
        	}
        	
        	prompt('Copie cette ligne dans le domaine d'importation. ', IkariamFriendList);
        	
        }
        
        // Import function
        unsafeWindow.flImport = function(){
        	var flImportValue = prompt('Indiquez l'adresse URL dans le champ ci-dessous. ');
        	
        	if(flImportValue){
        		if(IkariamFriendList == "0"){
        			NewFriendListContent = flImportValue;
        		}
        		else{
        			NewFriendListContent = IkariamFriendList + flImportValue;
        		}
        		window.setTimeout(GM_setValue, 0, IkariamFriendListSave, NewFriendListContent);
        		alert("String accepted");
        		return window.location.reload();
        	}else{
        		return alert("S'il vous plaît, indiquez une ligne valide. ");
        	}
        	
        	return false;
        }
        
        // Set type function
        unsafeWindow.flSet = function(flsettype){
        	document.getElementById("fte").value = flsettype;
        }
        
        // Time to build the Friendlist in HTML
        var flHTML = '';
        var CurrentIkariamFriendList = '';
        
        if(IkariamFriendList == "0"){
        	
        	flHTML += '<center>Mes Amis</center>';
        
        }
        else{
        	
        	// Slice the last ; of the list
        	CurrentIkariamFriendList = IkariamFriendList.slice(0, -1);
        	// Split the long string up
        	CurrentIkariamFriendList = CurrentIkariamFriendList.split(';');
        	// And sort it alphabetical
        	CurrentIkariamFriendList.sort();
        	
        	var IkariamFriend = '';
        	
        	flHTML += '<center>Liste des Amis</center><ul id="flList">';
        	
        	for(i=0;i<=CurrentIkariamFriendList.length-1;i++){
        		
        		IkariamFriend = CurrentIkariamFriendList[i];
        		
        		// Split every piece to get the name and link
        		IkariamFriend = IkariamFriend.split('|');
        		
        		flFriendName = IkariamFriend[0];
        		flFriendLink = IkariamFriend[1];
        		
        		flHTML += '<li><a href="' + flFriendLink + '">' + flFriendName + '</a> <a href="javascript:flDeleteFriend(\'' + flFriendName + '\', \'' + flFriendLink + '\');"><img src="http://www.sapaccess.com/images/delete_icon.gif"></a></li>';
        		
        	}
        	
        	flHTML += '</ul>';
        }
        
        // Enemy list
        if(IkariamEnemyList == "0"){
        	
        	flHTML += '<center>Mes Enemis</center>';
        
        }
        else{
        	
        	// Slice the last ; of the list
        	CurrentIkariamEnemyList = IkariamEnemyList.slice(0, -1);
        	// Split the long string up
        	CurrentIkariamEnemyList = CurrentIkariamEnemyList.split(';');
        	// And sort it alphabetical
        	CurrentIkariamEnemyList.sort();
        	
        	var IkariamEnemy = '';
        	
        	flHTML += '<center>Pas d'enemis sur la liste</center><ul id="flList">';
        	
        	for(i=0;i<=CurrentIkariamEnemyList.length-1;i++){
        		
        		IkariamEnemy = CurrentIkariamEnemyList[i];
        		
        		// Split every piece to get the name and link
        		IkariamEnemy = IkariamEnemy.split('|');
        		
        		flEnemyName = IkariamEnemy[0];
        		flEnemyLink = IkariamEnemy[1];
        		
        		flHTML += '<li><a href="' + flEnemyLink + '">' + flEnemyName + '</a> <a href="javascript:flDeleteEnemy(\'' + flEnemyName + '\', \'' + flEnemyLink + '\');"><img src="http://www.sapaccess.com/images/delete_icon.gif"></a></li>';
        		
        	}
        	
        	flHTML += '</ul>';
        }
        
        if(IkariamTradeList == "0"){
        	
        	flHTML += '<center>Mes Autres Relations</center>';
        
        }
        else{
        	
        	// Slice the last ; of the list
        	CurrentIkariamTradeList = IkariamTradeList.slice(0, -1);
        	// Split the long string up
        	CurrentIkariamTradeList = CurrentIkariamTradeList.split(';');
        	// And sort it alphabetical
        	CurrentIkariamTradeList.sort();
        	
        	var IkariamTrade = '';
        	
        	flHTML += '<center>Pas D'autres relations sur la Liste</center><ul id="flList">';
        	
        	for(i=0;i<=CurrentIkariamTradeList.length-1;i++){
        		
        		IkariamTrade = CurrentIkariamTradeList[i];
        		
        		// Split every piece to get the name and link
        		IkariamTrade = IkariamTrade.split('|');
        		
        		flTradeName = IkariamTrade[0];
        		flTradeLink = IkariamTrade[1];
        		
        		flHTML += '<li><a href="' + flTradeLink + '">' + flTradeName + '</a> <a href="javascript:flDeleteTrade(\'' + flTradeName + '\', \'' + flTradeLink + '\');"><img src="http://www.sapaccess.com/images/delete_icon.gif"></a></li>';
        		
        	}
        	
        	flHTML += '</ul>';
        }
        
        // Add the HTML for the adding friends part
        flHTML += '<div style="text-align:center;"><hr>Ajouter le Joueur<br><input type="text" name="flNewName" id="flNewName" value="Nombre" onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';" onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;" /><p><a onClick="javascript:flInsertCurrentURL();" style="font-size: 9px; cursor: pointer;">Usar la URL actual</a></p><input type="text" name="flNewLink" id="flNewLink" value="URL" onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';" onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;" /><br /><br /><input type="radio" name="type" onclick="javascript:flSet(this.value);" value="Friend" checked /> Amigo<br /><input type="radio" name="type" onclick="javascript:flSet(this.value);" value="Trader" /> Vaca<br /><input type="radio" name="type" onclick="javascript:flSet(this.value);" value="Enemy" /> Enemigo<br /><input type="hidden" id="fte" value="Friend" /><br /><a href="javascript:flAddFriend();" class="button">&nbsp;&nbsp;&nbsp;Añadir&nbsp;&nbsp;&nbsp;</a></div>';
        
        /*
        // Add the HTML for the adding friends part
        flHTML += '<div style="text-align:center;"><hr>Ajouter le Joueur<br><input type="text" name="flNewName" id="flNewName" value="Nombre" onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';" onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;" /><p><a onClick="javascript:flInsertCurrentURL();" style="font-size: 9px; cursor: pointer;">Usar la URL actual</a></p><input type="text" name="flNewLink" id="flNewLink" value="URL" onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';" onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;" /><br /><br /><input type="radio" name="type" value="Friend" checked /> Amigo<br /><input type="radio" name="type" value="Trader" /> Comerciante<br /><input type="radio" name="type" value="Enemy" /> Enemigo<br /><br /><a href="javascript:flAddFriend();" class="button">&nbsp;&nbsp;&nbsp;Añadir&nbsp;&nbsp;&nbsp;</a><br><p style="padding-top: 8px;"><a href="javascript:flExport();" class="flSmall" style="font-size: 10px;">Exportar</a> | <a href="javascript:flImport();" class="flSmall" style="font-size: 10px;">Importar</a></p></div>';
        */
        
        // And now its time to place it in the right position, before the 'mainview' (playfield) div that is
        var main, newElement;
        main = document.getElementById('mainview');
        if (main) {
            newElement = document.createElement('div');
        	newElement.setAttribute('id', 'flBox');
            main.parentNode.insertBefore(newElement, main);
        }
        
        // And finally put layout + friendlist HTML in it all together, we're done :)
        document.getElementById("flBox").innerHTML = '<div id="flButtonArea"><div id="flHeader2" onMouseOver="flToggleFrame(1);"></div></div><div id="flContent">' + flHTML + '</div><div id="flFooter"></div>';