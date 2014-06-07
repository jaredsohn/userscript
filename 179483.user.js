// ==UserScript==
// @name       	Vault.X
// @namespace   Mafiawars
// @description tmp vault.it hosting
// @version     
// ==/UserScript==
//Version 


	try {
		if (localStorage.getItem) {
			storage = localStorage;
		}
		else if (window.localStorage.getItem) {
			storage = window.localStorage;
		}
	}
	catch(e) {}
	
	var VaultThis;
	var VaultSpeed;
	var VaultRT;
	var VaultARS;
	
	var CollectionList = new Array(
		{name: "-- New York Collections --", value: 0},
		{name: "Diamond Flush Collection", value: 6},
		{name: "Heart Flush Collection", value: 7},
//		{name: "Sculptures Collection", value: 0},
		{name: "Poker Chips Collection", value: 5},
//		{name: "Club Flush Collection", value: 0},
//		{name: "Boxing Collection", value: 0},
//		{name: "Cigars Collection", value: 0},
		{name: "Spade Flush Collection", value: 9},
		{name: "Billiards Collection", value: 14},
		{name: "Rings Collection", value: 2},
		{name: "Ties Collection", value: 10},
		{name: "Paintings Collection", value: 3},
		{name: "Cufflinks Collection", value: 11},
//		{name: "Barber Collection", value: 0},
		{name: "Great Race Horses Collection", value: 12},
		{name: "Money Laundering Collection", value: 17}
	);
	
	ReVaultIt = {
		Version: '1.00',
		iLike: '<iframe src="http://www.facebook.com/plugins/like.php?app_id=219527258096177&amp;href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FGuessX-Scripts%2F131414080285469&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:20px;" allowTransparency="true"></iframe>',
		Images: {
			Stop: 'data:image/gif;base64,R0lGODlhEAAQANUAAP8A//////9fX/+Pj/9/f/93d/+Ojv9wcP90dP+Vlf97e/9tbf+Rkf+YmP+cnP+amv9paf9qav+EhP+Kiv+Cgv9nZ/+vr/+hof+Wlv+fn/+1tf+qqv+lpf+8vP+0tP91df+UlP/Bwf9lZf94eP9zc/+Dg/9xcf+2tv/Z2f/Y2P/V1f+Li/+dnf9ubv/X1/+Zmf/Nzf+AgP+Hh/9kZP+/v//Q0P+mpgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAaOQIAQMBAYjYOhEiDwoFIuVc0iWDJhHZujgXlYaNWhIHTKbBMMw+SyCQ9emkwggDbMKQ9CUnDhOOYBdnMEEgVVAixngIMKBQiHDw11gASNCAeHGJOLjgcLhyBplICeEFUDJQMTjAVzCxAzSUwrMhSVna8VYUICEjGWnhG6VgIkIx8mLREiu0tFRwKyVtNWQQA7'
		},
		Storing: {
			CMenu: 10,
			RSMenu: 3,
			VSMenu: 2,
			isAutoRun: false
		}
	}
	
	function create_collection_div() {
		if(document.getElementById('rEvDiv')) {
			document.getElementById('rEvDiv').innerHTML = RevaultConfigHtml;
        } else {
			var rEvDiv=document.createElement("div");
            rEvDiv.id = 'rEvDiv';
            content.insertBefore(rEvDiv, content.firstChild);
            document.getElementById('rEvDiv').innerHTML = RevaultConfigHtml;
        }
    }
	
	readVaultSettings();
	var content=document.getElementById('content_row');
    var RevaultConfigHtml = '<div class="messages" style="border: 3px solid #a99e9e;-moz-border-radius: 7px;margin:5px">'+
	'<div><span style="float: left; width: 40%; text-align: left;">'+ReVaultIt.iLike+'</span><span style="float: center; width: 40%; text-align: right;"><font size="5" color="white">Re-Vault It.&#12324;</font></span><span style="float:right; width: 23%; text-align: right;">'+ReVaultIt.Version+' - <img width="16" height="16" title="Close" src="'+ReVaultIt.Images.Stop+'" id="close"> </span></div>'+
    '<div>';
	RevaultConfigHtml += '&nbsp;Pick Collection to Revault:&nbsp;<select id="CollectionCat">';
		for (i = 0; i < CollectionList.length; i++) {
		    RevaultConfigHtml += '<option value="' + CollectionList[i].value + '">' + CollectionList[i].name + "</option>"
        }
	RevaultConfigHtml += '</select>';
	RevaultConfigHtml += '&nbsp;&nbsp;<a href="#" id="VaultItNow" class="sexy_button_new short gold"><span><span>Start Vaulting</span></span></a><br>';
	RevaultConfigHtml += '&nbsp;Autostart&nbsp;<input type="checkbox" id="VIautoruning" >&nbsp;Restart Every:&nbsp;<select id="VaultRS">'+
'<option value="5" href="#">5 Minutes</option>'+
'<option value="10" href="#">10 Minutes</option>'+
'<option value="15" href="#">15 Minutes</option>'+
'<option value="30" href="#">30 Minutes</option>'+
'</select>&nbsp;Revault Every:&nbsp;<select id="VaultSS">'+
'<option value="100" href="#">10x Per a second</option>'+
'<option value="200" href="#">5x Per a second</option>'+
'<option value="250" href="#">4x Per a second</option>'+
'<option value="333" href="#">3x Per a second</option>'+
'<option value="500" href="#">2x Per a second</option>'+
'<option value="1000" href="#">1x a second</option>'+
'</select>';
	RevaultConfigHtml += '<div style="text-align:right;vertical-align:top;"><font size="1">*To Stop please close tab!!</font></div></div></div>';
	
		create_collection_div();
		document.getElementById("CollectionCat").options[0].disabled = "disabled";
		document.getElementById("CollectionCat").selectedIndex = ReVaultIt.Storing.CMenu;
		document.getElementById("VaultRS").selectedIndex = ReVaultIt.Storing.RSMenu;
		document.getElementById("VaultSS").selectedIndex = ReVaultIt.Storing.VSMenu;
		document.getElementById("CollectionCat").onchange = VaultItSaveSettings;
		document.getElementById("VaultRS").onchange = VaultItSaveSettings;
		document.getElementById("VaultSS").onchange = VaultItSaveSettings;
		document.getElementById('VIautoruning').addEventListener("click", function(){VaultItAROO()}, false);
		
	function VaultItSaveSettings() {
		ReVaultIt.Storing.CMenu = document.getElementById("CollectionCat").selectedIndex;
		ReVaultIt.Storing.RSMenu = document.getElementById("VaultRS").selectedIndex;
		ReVaultIt.Storing.VSMenu = document.getElementById("VaultSS").selectedIndex;
		VaultThis = document.getElementById("CollectionCat").value;
		VaultSpeed = document.getElementById("VaultSS").value;
		VaultRT = (document.getElementById("VaultRS").value * 60000);
		if (document.getElementById("VIautoruning").checked) { 
			ReVaultIt.Storing.isAutoRun = true;
        }else {
            ReVaultIt.Storing.isAutoRun = false;
        }
//		alert(VaultThis)
		writeVaultSettings();
    }
		
	if (ReVaultIt.Storing.isAutoRun) {
        document.getElementById("VIautoruning").checked = true;
		VaultARS = setTimeout(VaultItAS, 10000);
//		LogErr('Autostart is starting in 10 seconds');
	}
	
	function VaultItAROO() {
		if (document.getElementById("VIautoruning").checked) { 
//			LogErr('Autostart is on');
			ReVaultIt.Storing.isAutoRun = true;
        }else {
//			LogErr('Autostart is Off');
            ReVaultIt.Storing.isAutoRun = false;
        }
	}
	
	function VaultItAS(){
		if(!ReVaultIt.Storing.isAutoRun){
//			LogErr('Autostart was aborted');
			return;
		}
		VaultItNow.click()
	}
	
	$('#VaultItNow').click(function(){
		clearTimeout(VaultARS);
		VaultItSaveSettings();
		VaultingIt();
		writeVaultSettings();
		$('#rEvDiv').remove();
	});
	
	$('#close').click(function(){
		try{
			clearTimeout(VaultARS);
		}catch(err){}
		$('#rEvDiv').remove();
	});  
	
	function VaultingIt(){
		setInterval(vAULTCollection,VaultSpeed);
		setTimeout(xbone,VaultRT);
	}

	function vAULTCollection(){
		window.location='javascript:%28%28function%28%29%7Bdo_ajax%28%27inner_page%27%2C %27remote%2Fhtml_server.php%3Fxw_controller%3Dcollection%26xw_action%3Dvault%26xw_city%3D1%26vault_id%3D'+VaultThis+'%26selected_city%3D1%26filter_col%3D1%27%2C 1%2C 1%2C 0%2C 0%29%3B %7D%29%28%29%29%3B';
	}
	
	function xbone(){
//		LogErr('Window Refreshing!');
		top.location.href=location.protocol+'//facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=collection&xw_action=view&xw_city=1&selected_city=1&filter_col=1';
	}
		
	HTMLElement.prototype.click = function () {
        $(this).click()
    };
	
	function LogErr(msg) {
	//For us to debug out to browser java console
		setTimeout(function() {
			throw new Error(msg);
		}, 0);
	}
	
	function writeVaultSettings(){
		storage.setItem("VaultIt", JSON.stringify(ReVaultIt.Storing));
	}
        
	function readVaultSettings(){
		if (!storage.getItem("VaultIt")) { //no settings
			LogErr('No Settings Detected!');
			writeVaultSettings();
		} else {
                        
			tempsettings = JSON.parse(storage.getItem("VaultIt"));
			if( Object.keys(tempsettings).length != Object.keys(ReVaultIt.Storing).length ) { //make sure no new settings show up!
				LogErr('New Settings Detected, Refreshed all Settings!');
				writeVaultSettings();
			} else{
				ReVaultIt.Storing = tempsettings;
			}
		}
	}
	
	/*add analytics*/
    function loadContent(file) {
		var head=document.getElementsByTagName('head').item(0);
		var scriptTag=document.getElementById('loadScript');
        if(scriptTag)head.removeChild(scriptTag);
		script=document.createElement('script');
        script.src=file;
        script.type='text/javascript';
        script.id='loadScript';
        head.appendChild(script);
        setTimeout(load,1000)
    }
	loadContent('http://www.google-analytics.com/ga.js');
    function load() {
		try {
			var pageTracker=_gat._getTracker("UA-35022618-1");
            pageTracker._trackPageview("/VaultIt")
        } catch(err){}
	}
    /*end analytics*/