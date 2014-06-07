// ==UserScript==
// @name           KoC Premium Kit
// @namespace      KoC Premium Kit
// @description    Kingdoms of Camelot kit including an Attack Informer, Build Helper (which thanks to Haydius can now queue builds) and the loved WideMap-Feature
// @version        21122010
// @include       *kingdomsofcamelot*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js 
// ==/UserScript==

/*
 * Based on Build Helper => All credit to nites
 * SPECIAL THX to all the other Developers too :-)
 */
////////////////////////////////////////////////////////////////////////////////////
// DISPLAY
////////////////////////////////////////////////////////////////////////////////////

//modifys Display
modifyDisplay();

////////////////////////////////////////////////////////////////////////////////////
// RUNTIME
////////////////////////////////////////////////////////////////////////////////////

var a = '' + document.location;
if (a.indexOf('src/main_src.php') != -1) {
    $(document).ready(function(){
        if (a.match('src/main_src.php') || a.match('debugger.html')) {
            //
            addScript(DD_GLOBAL_INIT);
            
            //
            addScript(DD_MAIN_APP);
            
            //
            addScript(DD_KOC_FUNCTIONS);
            
            //
            addScript(DD_POC_GUI);
            addScript(DD_POC_FUNCTIONS);
            addScript(DD_POC_VARIABLES);
            addScript(DD_POC_DATA);
            addScript(DD_CHATCENTER);
            
            //
            addScript(DD_DATA_HANDLER);
            
            //
            addScript(DD_SERIALIZER);
            
        }
        window.setTimeout('DD_GLOBAL_INIT();', 2000);
    });
}

function DD_GLOBAL_INIT(){

    DD_MAIN_APP();
    DD_KOC_FUNCTIONS();
    DD_POC_GUI();
    DD_CHATCENTER();
    
    try {
        GUI.build();
    } 
    catch (e) {
        GUI.modalmessage('ERROR while building GUI <br><br> errortext: ' + e);
        console.error("ERRR: " + e);
    }
    
    if (GUI.usechat == true && GUI.chatchannel != "") {
        try {
            CHAT.start_nz();
        } 
        catch (e) {
            GUI.modalmessage('ERROR while building CHAT <br><br> errortext: ' + e);
            console.error("ERRR: " + e);
        }
    }
    
    DD_MAIN_APP = null;
    DD_KOC_FUNCTIONS = null;
    DD_POC_GUI = null;
    DD_CHATCENTER = null;
    
    window.setTimeout('MAIN.update();', 2000); // starten
}

////////////////////////////////////////////////////////////////////////////////////
// SCRIPTS
////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
function DD_MAIN_APP(){

    window.MAIN = new Object();
    
    window.DEBUG = false; //turn on for debugging with firebug plugin
    window.updateIntervall = 10000;
    
    // periodical Updates
    window.MAIN.update = function(){
    window.setTimeout('MAIN.update();', updateIntervall);
        
        //GUI PREPARATION
        try {
            GUI.logattack.clear();
            GUI.logscout.clear();
            GUI.logfake.clear();
        } 
        catch (e) {
            GUI.modalmessage('ERROR while clearing logs <br><br> errortext: ' + e);
            console.error("ERROR: " + e);
        }
        /*
         //POPUP BLOCKER
         try {
         GUI.hidePopups();
         } catch (e){
         GUI.modalmessage('ERROR while hidePopups <br><br> errortext: ' + e);
         console.error("ERROR: " + e);
         }
         */
        //BUILDER
        try {
            GUI.checkAutoBuild();
        } 
        catch (e) {
            GUI.modalmessage('ERROR while checkAutoBuild <br><br> errortext: ' + e);
            console.error("ERROR: " + e);
        }
        
        //ALERTER
        try {
            KOC.checkImpendingAttack();
        } 
        catch (e) {
            GUI.modalmessage('ERROR while checkImpendingAttack <br><br> errortext: ' + e);
            console.error("ERROR: " + e);
        }
    }
}

/**
 *
 */
function DD_POC_GUI(){
    //UNCOMMENT NEXT LINE FOR FORCE SAVADATA REBUILD
    //localStorage.clear();
    //UNCOMMENT THE LINE BEFORE FOR FORCE SAVADATA REBUILD
    
    window.GUI = new Object();
    
    window.GUI.clearstorage = function(){
        if (confirm("Toolkit data will be cleared!!! Are you sure?")) {
            tk_data = "";
            window.tk_data = new DD_POC_DATA();
            handler.saveObject(tk_data); 
            alert("Toolkit data has been cleared!");
			
            if (confirm("KoC Toolkit needs to be restarted! Proceed refresh...?")) {
                location.reload(true);
            }
            else {
                return;
            }
			
        }
        else {
            alert("Toolkit data has NOT been cleared!");
        }
        
    }
	
	    GUI.showLocalStorage = function(){
        var storageContent = ""; //the variable that will hold our html
        var i = 0;
        var storageLength = localStorage.length - 1; //how many items are in the database starting with zero
        //now we are going to loop through each item in the database

        for (i = 0; i <= storageLength; i++) {

            //lets setup some variables for the key and values
            var itemKey = localStorage.key(i);
            var values = localStorage.getItem(itemKey);
            values = values.split(";"); //create an array of the values
            var j = 0;
			//increase with care
			var max_storage_lines = 100;
            for (j = 0; j <= values.length; j++) {
				if (j <= max_storage_lines) {
					t = j;
					var t = values[j];
					storageContent += '<br>' + t + '<br>';
				} else {
					storageContent += '<br>maximum lines reached ....';
				}
			}

			
            
            //now that we have the item, lets add it as a list item
           // storageContent += 'LOCALSTORAGE:<br><br>' + data + '<br>' + attack + '<br>' + scout + '<br>' + next1 + '<br>' + next2 + '<br>' + next3 + '<br>' + next4;
        }
        
        //if there were no items in the database
        if (storageContent == "") 
            storageContent = '<li class="empty">Log Currently Empty</li>';
        //GUI.modalmessage(storageContent, false);
         GUI.poclog.add(storageContent);
        $("#theLog").html(storageContent); //update the ul with the list items
    }
    
    window.GUI.modalmessage = function(message){
		var timeout = 10000;
        var content = "autoclose after 10sec...<br><br>"
		content += message;
		Modal.showAlert(content);
        window.setTimeout('Modal.hideModal();', timeout);
        GUI.poclog.add(message);
    }
    
    window.GUI.build = function(){
		window.player = seed.player.name;
		window.domain = domainName;
		window.storagename = domain + "_" + player;
        
		window.handler = new DD_DATA_HANDLER(storagename, 'tk_data');
        
        var data = handler.getObject('window.tk_data');
        
        if (data == null) {
            alert('Toolkit data does not exist. Creating...');
            window.tk_data = new DD_POC_DATA();
            
            var s = tk_data.states = new Object();
            
            //default values
            s.ScriptVersion = '18122010 Build 03';
            s.details = false;
            s.tabselected = 'log';
            s.mode = 0;
            s.pocbuildaction = false;
            s.isnotrunning = true;
            s.ispaused = true;
            s.alerterOn = false;
            s.ask4help = false;
            
            var o = tk_data.options = new Object();
            
            //default options
            o.widemap = false;
            o.onattack = true;
            o.minattack = 10000;
            o.onscouts = false;
            o.minscouts = 1000;
            o.usechat = false;
            o.chatchannel = "";
            
            handler.saveObject(tk_data);
        }
        else {
            eval(data);
        }
		//alert(data);
        if (typeof tk_data.states.ScriptVersion == 'undefined' || typeof tk_data.states.details == 'undefined' || typeof tk_data.states.tabselected == 'undefined' || typeof tk_data.states.mode == 'undefined' || typeof tk_data.states.pocbuildaction == 'undefined' || typeof tk_data.states.isnotrunning == 'undefined' || typeof tk_data.states.ispaused == 'undefined' || typeof tk_data.states.alerterOn == 'undefined' || typeof tk_data.states.ask4help == 'undefined' || typeof tk_data.options.widemap == 'undefined' || typeof tk_data.options.onattack == 'undefined' || typeof tk_data.options.minattack == 'undefined' || typeof tk_data.options.onscouts == 'undefined' || typeof tk_data.options.minscouts == 'undefined' || typeof tk_data.options.usechat == 'undefined' || typeof tk_data.options.chatchannel == 'undefined') {
            alert('Toolkit data seems to be incomplete maybe you downloaded a new version. Recreating...');
			tk_data = "";

            alert('Toolkit data seems to be incomplete maybe you downloaded a new version. Recreating...');
            window.tk_data = new DD_POC_DATA();
            
            var s = tk_data.states = new Object();
            
            //default values
            s.ScriptVersion = '18122010 Build 03';
            s.details = false;
            s.tabselected = 'log';
            s.mode = 0;
            s.pocbuildaction = false;
            s.isnotrunning = true;
            s.ispaused = true;
            s.alerterOn = false;
            s.ask4help = false;
            
            var o = tk_data.options = new Object();
            
            //default options
            o.widemap = false;
            o.onattack = true;
            o.minattack = 10000;
            o.onscouts = false;
            o.minscouts = 1000;
            o.usechat = false;
            o.chatchannel = "";
            
            handler.saveObject(tk_data);
            window.handler = new DD_DATA_HANDLER(storagename, 'tk_data');
            
            var data = handler.getObject('window.tk_data');

            location.reload(true);
        }
        //STATES
        window.GUI.details = tk_data.states.details;
        window.GUI.tabselected = tk_data.states.tabselected;
        window.GUI.mode = tk_data.states.mode;
        window.GUI.pocbuildaction = tk_data.states.pocbuildaction;
        window.GUI.isnotrunning = tk_data.states.isnotrunning;
        window.GUI.ispaused = tk_data.states.ispaused;
        window.GUI.alerterOn = tk_data.states.alerterOn;
        window.GUI.ask4help = tk_data.states.ask4help;
        //OPTIONS
        window.GUI.widemap = tk_data.options.widemap;
        window.GUI.onattack = tk_data.options.onattack;
        window.GUI.minattack = tk_data.options.minattack;
        window.GUI.onscouts = tk_data.options.onscouts;
        window.GUI.minscouts = tk_data.options.minscouts;
        window.GUI.usechat = tk_data.options.usechat;
        window.GUI.chatchannel = tk_data.options.chatchannel;
		
		//BUILDHELPER
		window.GUI.currentbuildMode = "off";
		window.GUI.nextBuildMode = "build";
		window.GUI.koc_buildslot = window.buildslot; //SAVE THE ORIGINAL CONTENT OF THE KOC FUNCTION
		window.GUI.totaltime = 0;
    
        
        //RUNTIME VALUES
        window.GUI.playername = seed.player.name;
        window.GUI.prefix = seed.player.prefix;
        
        if (window.DEBUG) {
            console.info("Details: " + GUI.details);
            console.info("tabselecet: " + GUI.tabselected);
            console.info("mode: " + GUI.mode);
            console.info("pocbuildingaction: " + GUI.pocbuildaction);
            console.info("isnotrunning: " + GUI.isnotrunning);
            console.info("ispaused: " + GUI.ispaused);
            console.info("alerterOn: " + GUI.alerterOn);
            console.info("widemap: " + GUI.widemap);
            console.info("ask4help: " + GUI.ask4help);
        };
        
        
        DD_POC_VARIABLES();
        DD_POC_FUNCTIONS();
        
        //now remove it
        DD_POC_VARIABLES = null;
        DD_POC_FUNCTIONS = null;
        
        //creategui
        GUI.pocgui.addtobody(pochtmls.mainbody);
        
        //dirty inserts
        document.getElementById('build_times').innerHTML += '<div id="info_build"></div>';
        document.getElementById('pocinfobox').innerHTML += '<div id="info_log"></div>';
        document.getElementById('pocinfobox').innerHTML += '<div id="info_attack"></div>';
        document.getElementById('pocinfobox').innerHTML += '<div id="info_scout"></div>';
        document.getElementById('pocinfobox').innerHTML += '<div id="info_fake"></div>';
        document.getElementById('pocinfobox').innerHTML += '<div id="info_options"></div>';
        
        if (GUI.widemap == true) {
            //Make the map wider
            document.getElementById('mapwindow').style.height = "485px";
            document.getElementById('mapwindow').style.width = "1220px";
            document.getElementById('mapwindow').style.zIndex = "10";
            document.getElementById('kocmain_bottom').style.zIndex = "20";
            
            //Move coordinate box
            //$('#maparea_map div.mod_coord').css('left', '760px');
            //$('#maparea_map div.mod_coord').css('top', '485px');
            //$('#maparea_map div.mod_coord').css('width', '250px');
            //document.getElementById('maparea_map div.mod_coord').style.left = "760px";
            //document.getElementById('maparea_map div.mod_coord').style.top = "485px";
            //document.getElementById('maparea_map div.mod_coord').style.width = "250px";	
        
            //manipulate coordinate box
            //$('.coords').css('width', '200px');
            //$('.coords').css('overflow', 'hidden');
            //document.getElementByClass('coords').style.overflow = "hidden";
            //document.getElementByClass('coords').style.width = "200px";	
        }
        
        GUI.poclog.clear();
        GUI.logattack.clear();
        GUI.logscout.clear();
        GUI.logfake.clear();
        
        GUI.poclog.add("<b>Installed Version: 18122010 Build 03</b><br><br>");
        /*
		GUI.poclog.add('<b>IMPORTANT:</b>');
        GUI.poclog.add('Please try clearing local Storage when Script does not work as expected!');
        GUI.poclog.add('<b>Reset worked out only if the follwing messages appears after refresh: </b>');
        GUI.poclog.add('>>> Toolkit data does not exist. Creating...');
        GUI.poclog.add('If not just reset a second time until the message appears.');
        */
        
        GUI.logattack.add('Checking for Attacks!');
        GUI.logscout.add('Checking for Scouts!');
        GUI.logfake.add('Checking for Fakeattacks!');
        
        
        
    }
    
    window.GUI.hidePopups = function(){
    
        if (document.getElementsByTagName('body')[0].innerHTML.indexOf('Send a Travelling Faire to a Friend') > 0) {
            GUI.poclog.add('Travelling Faire blocked');
            Modal.hideModal();
        }
        
        if (document.getElementsByTagName('body')[0].innerHTML.indexOf('has cordially invited you to visit their Court') > 0 || document.getElementsByTagName('body')[0].innerHTML.indexOf('herzlich eingeladen sie an ihren Hof zu besuchen') > 0) {
            GUI.poclog.add('Invitation blocked');
            Modal.hideModal();
        }
    }
	
	window.GUI.createWindow = function (url, name, width, height) {
	  	w = window.open(url, name, 'width='+width+',height='+height);
	  	return w;
	}
   window.GUI.debugWin = function (){
	var winDebug = null;
	var debugTA = null;
	// if (!winDebug || winDebug.closed){
  	  document.winDebug = GUI.createWindow ('', 'debug', 900, 700);
  	  winDebug.document.write ('<BR><TEXTAREA readonly id=debugTA cols=100 rows=40></textarea><BR>');
  	  debugTA = winDebug.document.getElementById ('debugTA');
 	// }
  	winDebug.focus();
}

}

/**
 *
 */
function DD_POC_FUNCTIONS(){
    window.GUI.pocinterval = new Array();
    window.GUI.poccontrols = new Array();
    
    //BUILD
    window.GUI.pocbuild = new Object();
    window.GUI.pocbuild.add = function(c, a){
		
        var h = c.id.split("_")[1];
        var l = 0;
        for (var i = 0; i < tk_data.build.length; i++) {
            var m = tk_data.build[i].slot;
            var n = tk_data.build[i].city;
            if (m == h && n == currentcityid) {
                l += 1;
            }
        }
        var o = seed.buildings["city" + currentcityid]["pos" + h];
        var B = o[0];
        var w = parseInt(o[1]) + l;
        if (window.DEBUG) {
            console.info("current building level" + w)
        }; //
        

    if (GUI.currentBuildMode == "build") {  
        if( w >= 9) {  
            GUI.modalmessage('Due to building requirements (DI), buildings above level 9\nshould be manualy built.');  
            return;  
        }  
    }


        var e = Math.pow(2, w);
        var d = seed.knights["city" + currentcityid];
        var p = 0;
        if (d) {
            d = d["knt" + seed.leaders["city" + currentcityid].politicsKnightId];
            if (d) {
                p = parseInt(d.politics);
                if ((parseInt(d.politicsBoostExpireUnixtime) - unixtime()) > 0) {
                    p = parseInt(p * 1.25)
                }
            }
        }
        var a = buildingcost["bdg" + B][7] * e;
        if (parseInt(B) < 6 && parseInt(B) > 0 && e == 1) {
            a = 15;
        }
        a = parseInt(a / (1 + 0.005 * p + 0.1 * parseInt(seed.tech.tch16))); //build time calculation
		GUI.totaltime = GUI.totaltime + a;
        var q = new Object();
        q.status = 0;
        q.slot = h;
        q.city = currentcityid;
        q.type = B;
        q.timetobuild = a;
        q.level = w;
		q.attempts = 0;
		if (GUI.currentBuildMode == "destruct") {
		q.mode = "destruct";
		} 
		if (GUI.currentBuildMode == "build") {
		q.mode = "build";
		}
        tk_data.build.push(q);
        handler.saveObject(tk_data);
        GUI.pocupdatedisplay();
    };
    window.GUI.pocbuild.remove = function(h){
        if ((typeof h) == 'object') {
            var a = h.id.split('_')[1]
        }
        else {
            var a = parseInt(h);
        }

        //'queuecancel_';
        
        tk_data.build.splice(a, 1);
        GUI.pocupdatedisplay();
        handler.saveObject(tk_data);
    };
    window.GUI.pocbuild.movetolast = function(c){
        var q = tk_data.build[c];
		tk_data.build[c].attempts = tk_data.build[c].attempts + 1; //updates retry count
        if (!q.count) {
            q.count = 1;
        }
        else {
            q.count += 1;
        }
        tk_data.build.splice(c, 1);
        //TODO maybe a future feature to set delete after x count
		/*if (q.count > 5) {
            return;
        }
        else {*/
            tk_data.build.push(q);
        //}
        GUI.pocupdatedisplay();
        handler.saveObject(tk_data);
        return;
    };
    window.GUI.pocbuild.destruct = function(c){
		//bdgid, curlvl, citpos, gethelp
			if(window.DEBUG) {
			console.info("GUI.pocbuildaction " + GUI.pocbuildaction); //
		}	
        if (GUI.pocbuildaction) {
            return;
        }
		GUI.pocbuildaction = true;
        var pocbuildindex = parseInt(c);
        var a = tk_data.build[c];
        cityid = a.city;
        bdgid = a.type;
        curlvl = a.level;
        citpos = a.slot;
        //if (GUI.ask4help) {
        //    gethelp = true;
        //}
        //else {
            gethelp = false;
        //}
		
		
        var mult = 0;
        var pollv = 0;
        var time = 0;
        var knt = seed.knights["city" + cityid];
        if (knt) {
            knt = knt["knt" + seed.leaders["city" + cityid].politicsKnightId];
            if (knt) {
                pollv = parseInt(knt.politics);
            }
        }
        if (curlvl > 1) {
            mult = Math.pow(2, curlvl - 1);
            time = buildingcost["bdg" + bdgid][7] * mult;
        }
        if (parseInt(bdgid) < 6 && parseInt(bdgid) > 0 && mult == 1) {
            time = 15;
        }
        time = time / (1 + 0.005 * pollv + 0.1 * parseInt(seed.tech.tch16));
        if (time % 1 > 0) {
            time = parseInt(time);
        }
        var params = Object.clone(g_ajaxparams);
        params.cid = cityid;
        params.bid = "";
        params.pos = citpos;
        params.lv = curlvl - 1;
        if (curlvl > 0) {
            params.bid = seed.buildings["city" + cityid]["pos" + citpos];
        }
        params.type = bdgid;
        new (Ajax.Request)(g_ajaxpath + ("ajax/destruct.php" + g_ajaxsuffix), {
            method: "post",
            parameters: params,
            onSuccess: function(transport){
			 GUI.pocbuildaction = false;
                var rslt = eval("(" + transport.responseText + ")");
                if (rslt.ok) {
					GUI.pocbuild.remove(pocbuildindex);
                    time = rslt.timeNeeded;
                    seed.queue_con["city" + cityid].push([bdgid, 0, parseInt(rslt.buildingId), unixtime(), unixtime() + time, 0, time, parseInt(citpos)]);
                    Modal.hideModalAll();
                    update_bdg();
                    queue_changetab_building();
                    if (rslt.updateSeed) {
                        update_seed(rslt.updateSeed);
                    }
                }
                else {
                    //var msg = rslt.msg ? rslt.msg : g_js_strings.deleteaction.somethingwentwrong;
                    //Modal.showAlert(msg);
					//GUI.pocbuild.remove(pocbuildindex);
					GUI.pocbuild.movetolast(c);
					GUI.pocbuildaction = false;		
                }
            },
            onFailure: function(){
				alert("Connection Error! Please try later again");
            }
        })
    };
    window.GUI.pocbuild.action = function(c){
		if(window.DEBUG) {
			console.info("GUI.pocbuildaction " + GUI.pocbuildaction); //
		}	
        if (GUI.pocbuildaction) {
            return;
        }
        GUI.pocbuildaction = true;
        var pocbuildindex = parseInt(c);
        var a = tk_data.build[c];
        cityid = a.city;
        bdgid = a.type;
        curlvl = a.level;
        citpos = a.slot;
        if (GUI.ask4help) {
            gethelp = true;
        }
        else {
            gethelp = false;
        }
        var mult = Math.pow(2, curlvl);
        var chk = checkreq("bdg", bdgid, curlvl);

		if(window.DEBUG) {
			console.info("chk " + chk); //
		};	
		var invalid = false;
       for (var i = 0; i < chk.length; i++) {
            if (chk[i] == 0) {
                invalid = true;
                break
            }
        }
        if (seed.queue_con["city" + cityid].length > 0) {
            invalid = true
        }
		      
        if (invalid) {

		if(window.DEBUG) {
			console.info("invalid " + invalid); //
		};		          
			GUI.modalmessage(g_js_strings.buildaction.cannotbuild);
			GUI.pocbuild.remove(pocbuildindex);
			GUI.pocbuild.movetolast(c);
            GUI.pocbuildaction = false;
            return false
        }
        else {
			var pollv = 0;
            var knt = seed.knights["city" + cityid];
            if (knt) {
                knt = knt["knt" + seed.leaders["city" + cityid].politicsKnightId];
                if (knt) {
                    pollv = parseInt(knt.politics)
                }
            }
            var time = buildingcost["bdg" + bdgid][7] * mult;
            if (parseInt(bdgid) < 6 && parseInt(bdgid) > 0 && mult == 1) {
                time = 15
            }
            time = time / (1 + 0.005 * pollv + 0.1 * parseInt(seed.tech.tch16));
            if (time % 1 > 0) {
                time = parseInt(time)
            }
            var params = Object.clone(g_ajaxparams);
            params.cid = cityid;
            params.bid = "";
            params.pos = citpos;
            params.lv = curlvl + 1;
            if (params.lv > 1) {
                params.bid = seed.buildings["city" + cityid]["pos" + citpos][3]
            }
			if (window.DEBUG) {
                console.info("cid" + params.cid); //
                console.info("bid" + params.bid); //
                console.info("pos" + params.pos); //
                console.info("lv" + params.lv); //
                console.info("bid_new" + params.bid); //
				console.info("attempts");
				console.info("mode");
            };
            params.type = bdgid;

            new Ajax.Request(g_ajaxpath + "ajax/construct.php" + g_ajaxsuffix, {
                method: "post",
                parameters: params,
                onSuccess: function(transport){
                    var rslt = eval("(" + transport.responseText + ")");
                    GUI.pocbuildaction = false;
					if (rslt.ok) {
                        GUI.pocbuild.remove(pocbuildindex);
                        var y = new Array();
                        var q = parseInt(a.level) + 1;
                        y.push('Building <b>' + buildingcost['bdg' + a.type][0] + ' lvl' + q + '</b> in');
                        for (var i = 0; i < seed['cities'].length; i++) {
                            if (seed['cities'][i][0] == params.cid) {
                                y.push('<b> ' + seed['cities'][i][1] + '</b>');
                            }
                        }
                        GUI.poclog.add(y.join(''));
                        seed.resources["city" + cityid].rec1[0] -= parseInt(buildingcost["bdg" + bdgid][1]) * mult * 3600;
                        seed.resources["city" + cityid].rec2[0] -= parseInt(buildingcost["bdg" + bdgid][2]) * mult * 3600;
                        seed.resources["city" + cityid].rec3[0] -= parseInt(buildingcost["bdg" + bdgid][3]) * mult * 3600;
                        seed.resources["city" + cityid].rec4[0] -= parseInt(buildingcost["bdg" + bdgid][4]) * mult * 3600;
                        seed.citystats["city" + cityid].gold[0] -= parseInt(buildingcost["bdg" + bdgid][5]) * mult;
                        seed.queue_con["city" + cityid].push([bdgid, curlvl + 1, parseInt(rslt.buildingId), unixtime(), unixtime() + time, 0, time, parseInt(citpos)]);
                        if (curlvl == 0) {
                            seed.buildings["city" + cityid]["pos" + citpos] = [bdgid, 0, citpos, rslt.buildingId]
                        }
                        var helpstr = "no";
                        if (gethelp) {
							window.build_gethelp_koc = window.build_gethelp;
							window.build_gethelp = GUI.pocbuild.help;
						    build_gethelp(params.bid, cityid);
							window.build_gethelp = window.build_gethelp_koc;
                            helpstr = "yes"
                        }
                        Modal.hideModalAll();
                        update_bdg();
                        queue_changetab_building();
                        if (parseInt(seed.tutorial.t1) == 7 && parseInt(bdgid) == 5) {
                            tutorialAdvance(1, 8);
                            seed.tutorial.t1 = 8
                        }
                        else {
                            if (parseInt(seed.tutorial.t1) == 15) {
                                $("arrowtip").innerHTML = "<div class='arrowdown'></div>";
                                $("arrowtip").style.top = "370px";
                                $("arrowtip").style.left = "500px";
                                $("arrowtip").show()
                            }
                            else {
                                if (parseInt(seed.tutorial.t1) == 21) {
                                    seed.tutorial.t1 = 22;
                                    tutorialCheck(22)
                                }
                            }
                        }
                        if (rslt.updateSeed) {
                            update_seed(rslt.updateSeed)
                        }
                    }
                    else {
						//Modal.showAlert(printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null));
						GUI.pocbuild.movetolast(c);
						//GUI.pocbuild.remove(pocbuildindex);
						GUI.pocbuildaction = false;				
                    }
                },
                onFailure: function(){
					alert("Connection Error! Please try later again");
                }
            })
        }
    };
	window.GUI.pocbuild.help = function(g, cid) {
        var b = qlist = seed.queue_con["city" + cid];
        var e = 0;
        var d = 0;
        for (var c = 0; c < b.length; c++) {
            if (parseInt(b[c][2]) == parseInt(g)) {
                e = parseInt(b[c][0]);
                d = parseInt(b[c][1]);
                break;
            }
        }
        var a = new Array;
        a.push(["REPLACE_LeVeLbUiLdInG", d]);
        a.push(["REPLACE_BuIlDiNgNaMe", buildingcost["bdg" + e][0]]);
        a.push(["REPLACE_LeVeLiD", d]);
        a.push(["REPLACE_AsSeTiD", g]);
        var f = function (i, h) {continuation_95(i, h);if (!i) {var j = d > 1 ? cm.SpeedUpType.upgrade : cm.SpeedUpType.build;cm.ClientSideCookieManager.setCookie(j, false);}};
        common_postToProfile("95", Object.cloneFeed(template_data_95), Object.cloneFeed(actionlink_data_95), f, a);
	};
    window.GUI.pocbuild.check = function(a){
        var ret = new Object();
        if (seed.queue_con["city" + a].length > 0) {
            ret.from = 'seed'
            ret.msg = 'Currently Building.'
            ret.data = seed.queue_con["city" + a];
            return ret;
        }
        else {
            for (var i = 0; i < tk_data.build.length; i++) {
                if (tk_data.build[i].city == a) {
                    ret.from = 'queue';
                    ret.msg = 'Ready to Build.'
                    ret.data = i;
                    return ret;
                }
            }
            return null;
        }
    };
    window.GUI.pocbuild.display = function(a){
        var c = tk_data.build[a]
		mode = c.mode;
		attempts = c.attempts;
        var y = new Array();
        y.push('<table width="100%" border="0"><tr><td width="5%">');
        y.push(a);
        y.push('</td><td><table border="0"><tr><td>');
        if (mode == "build") {
		y.push(' <img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_prod.png">');//image goes here
		}
		if (mode == "destruct") {
		y.push(' <img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_att.png">');//image goes here
        }
		y.push('</td><td width="100%">');
        for (var i = 0; i < seed['cities'].length; i++) {
            if (seed['cities'][i][0] == c.city) {
                y.push('<b>[' + seed['cities'][i][1] + ']</b>');
            }
        }
        var level = (parseInt(c.level) + 1);
		if (mode == "build") {
        y.push('  <span style="color: #060;"><b>' + buildingcost['bdg' + c.type][0] + ' lvl' + level);
		}
		if (mode == "destruct") {
        y.push('  <span style="color: #060;"><b>' + buildingcost['bdg' + c.type][0] + ' lvl0');
        }

        y.push('</b></span> (' + timestr(c.timetobuild) + ')');
		y.push('<span> => '+ attempts +'</span>');
        if (window.GUI.details) {
            var A = checkreq("bdg", c.type, (c.level + 1));
            y.push('<table>')
            for (var i = 0; i < A.length - 2; i++) {
                var B = A[i];
                y.push('<tr>')
                for (var j = 0; j < B.length; j++) {
                    y.push('<td><span style="font-style: italic; color: ')
                    if (A[3][j] == 0) {
                        y.push('#F00')
                    }
                    else {
                        y.push('#000')
                    }
                    y.push('"> ' + A[i][j] + '</span></td>')
                }
                y.push('</tr>');
            }
            y.push('</table>');
        }
        y.push('</td></tr></table></td><td>')
        y.push('<a class="button20" id="queuecancel_' + a + '" onclick="GUI.pocbuild.remove(this);"><span>cancel</span></a>');
        y.push('</td></tr></table>');
        return y.join('');
    };
    window.GUI.pocbuild.show = function(a, b){
        var y = new Array();
        y.push('<b style="font-style:italic">');
        y.push(a[1]);
        y.push('<span style="color: #060">');
        y.push(buildingcost['bdg' + b[0]][0] + ' lvl' + b[1]);
        y.push('</span> <span style="color: #F00">');
        y.push(timestr(parseInt(b[4]) - parseInt(unixtime())));
        y.push('</span></b><br />');
        return y.join('');
    };
	window.GUI.pocbuild.showtotaltime = function(a){
        var y = new Array();
        y.push('<b style="font-style:italic">');
		y.push(a[1]);
        y.push('<span style="color: #060">');
        y.push('</span> <span style="color: #F00">');
		y.push(timestr(GUI.totaltime));
        y.push("test");
        y.push('</span></b><br />');
        return y.join('');
    };
    window.GUI.pocbuild.sortbybuildtime = function(){
        tk_data.build.sort(GUI.pocsortBuildByTime);
        GUI.pocupdatedisplay();
        handler.saveObject(tk_data);
    };
	window.GUI.pocbuild.sortbycity = function(){
	tk_data.build.sort(GUI.pocsortBuildByCity);
	GUI.pocupdatedisplay();
	handler.saveObject(tk_data);
    };
    window.GUI.pocbuild.interval = function(i){
        var a = seed['cities'][i];
        var c = GUI.pocbuild.check(a[0]);
		//IF CITY HAS NOTHING TO BUILD C = NULL
		//GUI.pocgui.info('build_' + a[0], GUI.pocbuild.showtotaltime(a));
		if (c != null) {

			if(window.DEBUG) {
				console.info("c.from " + c.from); //
				console.info("c.data " + c.data); //
			};		}
        if (c != null) {
            switch (c.from) {
                case 'queue':
					try {
						var a = tk_data.build[c.data];
						mode = a.mode;
						if (mode == "build") {
							var ret = GUI.pocbuild.action(c.data);
						}
						if (mode == "destruct") {
							var ret = GUI.pocbuild.destruct(c.data);
						}
					} catch (e) {
					  	GUI.modalmessage('ERROR while Building <br><br> errortext: ' + e);
            			console.error("ERROR: " + e);
					}
                    break;
                case 'seed':
                    var d = c.data[0];
                    var e = d[4];
                    if ((parseInt(e) - parseInt(unixtime())) < (-10)) {
                        seed.queue_con["city" + a[0]] = new Array();
                        GUI.pocgui.info('build_' + a[0], '')
                    }
                    else {
                        GUI.pocgui.info('build_' + a[0], GUI.pocbuild.show(a, c.data[0]))
                    }
                    break;
            }
        }
        else {
            //no build
        }
    };
    
    window.GUI.poccontrols['sortBT'] = function(){
        GUI.pocbuild.sortbybuildtime();
		//GUI.pocbuild.sortbycity();
    };
	    window.GUI.poccontrols['sortBC'] = function(){
        //GUI.pocbuild.sortbybuildtime();
		GUI.pocbuild.sortbycity();
    };
    window.GUI.pocinterval.push(GUI.pocbuild.interval);
    
    //LOG
    window.GUI.poclog = new Object();
    window.GUI.poclog.log = function(a){
        GUI.poclog.add(a);
        handler.saveObject(tk_data);
    };
    window.GUI.poclog.add = function(a){
        var added = false;
        var d = tk_data.log;
        var i = (d.length - 1);
        if (d.length > 0) {
            if (d[i].data == a) {
                if (tk_data.log[i].count) {
                    tk_data.log[i].count += 1;
                }
                else {
                    tk_data.log[i].count = 2;
                }
                added = true;
            }
        }
        if (!added) {
            var c = new Object();
            //c.time = unixtime();
            c.data = a;
            tk_data.log.push(c);
        }
        //handler.saveObject(tk_data);
        GUI.pocupdatedisplay();
    };
    window.GUI.poclog.clear = function(){
        tk_data.log = new Array();
        handler.saveObject(tk_data);
        GUI.pocupdatedisplay();
    };
    window.GUI.poclog.display = function(a){
        var y = new Array();
        y.push('<table width="450" border="0"><tr><td>')
        y.push('<td>');
        y.push(tk_data.log[a].data);
        if (tk_data.log[a].count) {
            y.push(' (' + tk_data.log[a].count + ')');
        }
        y.push('</td></tr></table>');
        return y.join('');
    };
    window.GUI.poccontrols['clearlog'] = function(){
        GUI.poclog.clear();
    }
    
    //ATTACK
    window.GUI.logattack = new Object();
    window.GUI.logattack.log = function(a){
        GUI.log_attack.add(a);
        handler.saveObject(tk_data);
    };
    window.GUI.logattack.add = function(a){
        var added = false;
        var d = tk_data.attack;
        var i = (d.length - 1);
        if (d.length > 0) {
            if (d[i].data == a) {
                if (tk_data.attack[i].count) {
                    tk_data.attack[i].count += 1;
                }
                else {
                    tk_data.attack[i].count = 2;
                }
                added = true;
            }
        }
        if (!added) {
            var c = new Object();
            //c.time = unixtime();
            c.data = a;
            tk_data.attack.push(c);
        }
        //handler.saveObject(tk_data);
        GUI.pocupdatedisplay();
    };
    window.GUI.logattack.clear = function(){
        tk_data.attack = new Array();
        handler.saveObject(tk_data);
        GUI.pocupdatedisplay();
    };
    window.GUI.logattack.display = function(a){
        var y = new Array();
        y.push('<table width="450" border="0"><tr><td>')
        y.push('<td>');
        y.push(tk_data.attack[a].data);
        if (tk_data.attack[a].count) {
            y.push(' (' + tk_data.attack[a].count + ')');
        }
        y.push('</td></tr></table>');
        return y.join('');
    };
    
    window.GUI.poccontrols['clearattack'] = function(){
        GUI.logattack.clear();
    }
    
    
    
    
    //SCOUT
    window.GUI.logscout = new Object();
    window.GUI.logscout.log = function(a){
        GUI.log_scout.add(a);
        handler.saveObject(tk_data);
    };
    window.GUI.logscout.add = function(a){
        var added = false;
        var d = tk_data.scout;
        var i = (d.length - 1);
        if (d.length > 0) {
            if (d[i].data == a) {
                if (tk_data.scout[i].count) {
                    tk_data.scout[i].count += 1;
                }
                else {
                    tk_data.scout[i].count = 2;
                }
                added = true;
            }
        }
        if (!added) {
            var c = new Object();
            //c.time = unixtime();
            c.data = a;
            tk_data.scout.push(c);
        }
        //handler.saveObject(tk_data);
        GUI.pocupdatedisplay();
    };
    window.GUI.logscout.clear = function(){
        tk_data.scout = new Array();
        handler.saveObject(tk_data);
        GUI.pocupdatedisplay();
    };
    window.GUI.logscout.display = function(a){
        var y = new Array();
        y.push('<table width="450" border="0"><tr><td>')
        y.push('<td>');
        y.push(tk_data.scout[a].data);
        if (tk_data.scout[a].count) {
            y.push(' (' + tk_data.scout[a].count + ')');
        }
        y.push('</td></tr></table>');
        return y.join('');
    };
    window.GUI.poccontrols['clearscout'] = function(){
        GUI.logscout.clear();
    }
    
    window.GUI.poccontrols['refresh'] = function(){
        if (confirm("KoC Toolkit needs to be restarted to apply your settings! Proceed refresh...?")) {
            location.reload(true);
        }
    }
    
    //FAKE
    window.GUI.logfake = new Object();
    window.GUI.logfake.log = function(a){
        GUI.log_fake.add(a);
        handler.saveObject(tk_data);
    };
    window.GUI.logfake.add = function(a){
        var added = false;
        var d = tk_data.fake;
        var i = (d.length - 1);
        if (d.length > 0) {
            if (d[i].data == a) {
                if (tk_data.fake[i].count) {
                    tk_data.fake[i].count += 1;
                }
                else {
                    tk_data.fake[i].count = 2;
                }
                added = true;
            }
        }
        if (!added) {
            var c = new Object();
            //c.time = unixtime();
            c.data = a;
            tk_data.fake.push(c);
        }
        //handler.saveObject(tk_data);
        GUI.pocupdatedisplay();
    };
    window.GUI.logfake.clear = function(){
        tk_data.fake = new Array();
        handler.saveObject(tk_data);
        GUI.pocupdatedisplay();
    };
    window.GUI.logfake.display = function(a){
        var y = new Array();
        y.push('<table width="450" border="0"><tr><td>')
        y.push('<td>');
        y.push(tk_data.fake[a].data);
        if (tk_data.fake[a].count) {
            y.push(' (' + tk_data.fake[a].count + ')');
        }
        y.push('</td></tr></table>');
        return y.join('');
    };
    window.GUI.poccontrols['clearfake'] = function(){
        GUI.logfake.clear();
    }
    
    //OPTIONS
    window.GUI.options = new Object();
    window.GUI.options.display = function(a){
        var y = new Array();
        y.push('<table width="100%" border="0"><tr>');
        
        y.push('<td width="100%">');
        y.push('<b>Widemap</b>');
        y.push('</td><td><td>')
        if (GUI.widemap == false) {
            y.push('<a class="gem_button" id="widemap" onclick="GUI.togglewidemap();"><span>OFF</span></a>');
        }
        else {
            y.push('<a class="button20" id="widemap" onclick="GUI.togglewidemap();"><span>ON</span></a>');
        }
        y.push('</td></tr>');
        
        y.push('<tr><td>');
        y.push('<b>>>> Attack Informer Options<<<</b>');
        y.push('</td></tr>');
        /*
         y.push('</tr>');
         y.push('<tr><td width="100%">');
         y.push('<b>Real attack above</b></td><td><input id="realattack" type="text" size="7" maxlength="7" value=' + GUI.realattack + ' >');
         y.push('</td><td>')
         y.push('<a class="gem_button" onclick="GUI.setrealattack();"><span>SAVE</span></a>');
         y.push('</td></tr>');
         */
        y.push('<td width="100%">');
        y.push('<b>Alert on Attacks above ...</b>');
        if (GUI.onattack == false) {
            y.push('</td><td><input id="minattack" type="text" size="7" maxlength="7" value=' + GUI.minattack + '></td><td>');
            y.push('<a class="gem_button" id="alertOnAttack" onclick="GUI.toggleonattack();"><span>OFF</span></a>');
        }
        else {
            y.push('</td><td><input id="minattack" type="text" size="7" maxlength="7" disabled="disabled" value=' + GUI.minattack + '></td><td>');
            y.push('<a class="button20" id="alertOnAttack" onclick="GUI.toggleonattack();"><span>ON</span></a>');
        }
        y.push('</td></tr>');
        
        
        
        y.push('<td width="100%">');
        y.push('<b>Alert on Scouts above ...</b>');
        
        if (GUI.onscouts == false) {
            y.push('</td><td><input id="minscouts" type="text" size="7" maxlength="7" value=' + GUI.minscouts + '></td><td>');
            y.push('<a class="gem_button" id="alertOnScouts" onclick="GUI.toggleonscouts();"><span>OFF</span></a>');
        }
        else {
            y.push('</td><td><input id="minscouts" type="text" size="7" maxlength="7" disabled="disabled" value=' + GUI.minscouts + '></td><td>');
            y.push('<a class="button20" id="alertOnScouts" onclick="GUI.toggleonscouts();"><span>ON</span></a>');
        }
        y.push('</td></tr>');
        y.push('<tr><td>');
        y.push('<b>>>> Chat Options<<<</b>');
        y.push('</td></tr>');
        y.push('<td width="100%">');
        y.push('<b>Chatchannel (deactivated)</b>');
        if (GUI.usechat == false) {
            y.push('</td><td><input id="chatchannel" type="text" size="20" maxlength="20" value=' + GUI.chatchannel + '></td><td>');
            y.push('<a class="gem_button" onclick="GUI.togglechat();"><span>OFF</span></a>');
        }
        else {
            y.push('</td><td><input id="chatchannel" type="text" size="20" maxlength="20"  disabled="disabled" value=' + GUI.chatchannel + '></td><td>');
            y.push('<a class="button20" onclick="GUI.togglechat();"><span>ON</span></a>');
        }
        y.push('</td></tr>');
        
        y.push('</table>');
        return y.join('');
    };
    
    //window.GUI
    window.GUI.pocgui = new Object();
    
    window.GUI.pocgui.getdisplay = new Array();
    
    //BUILD
    window.GUI.pocgui.getdisplay['build'] = function(){
        var ret = new Array();
        var a = tk_data.build
        if (a.length > 0) {
            for (var i = (a.length - 1); i >= 0; i--) {
                ret.push(GUI.pocbuild.display(i));
            }
        }
        else {
            ret.push('<div align="center"> <b> No Build</b></div>');
        }
        return ret.join('');
    }
    
    
    //LOG
    window.GUI.pocgui.getdisplay['log'] = function(){
        var ret = new Array();
        if (tk_data.log.length > 0) {
            for (i = 0; i < tk_data.log.length; i++) {
                ret.push(GUI.poclog.display(i));
            }
        }
        else {
            ret.push('<div align="center"> <b>No Logs</b></div>');
        }
        return ret.join('');
    };
    //ATTACK
    window.GUI.pocgui.getdisplay['attack'] = function(){
        var ret = new Array();
        if (tk_data.attack.length > 0) {
            for (i = 0; i < tk_data.attack.length; i++) {
                ret.push(GUI.logattack.display(i));
            }
        }
        else {
            ret.push('<div align="center"> <b>No Attacks</b></div>');
        }
        return ret.join('');
    };
    //SCOUT
    window.GUI.pocgui.getdisplay['scout'] = function(){
        var ret = new Array();
        if (tk_data.scout.length > 0) {
            for (i = 0; i < tk_data.scout.length; i++) {
                ret.push(GUI.logscout.display(i));
            }
        }
        else {
            ret.push('<div align="center"> <b>No Scouting</b></div>');
        }
        return ret.join('');
    };
    //FAKE
    window.GUI.pocgui.getdisplay['fake'] = function(){
        var ret = new Array();
        if (tk_data.fake.length > 0) {
            for (i = 0; i < tk_data.fake.length; i++) {
                ret.push(GUI.logfake.display(i));
            }
        }
        else {
            ret.push('<div align="center"> <b>No Fake Attacks</b></div>');
        }
        return ret.join('');
    };
    
    //OPTIONS
    window.GUI.pocgui.getdisplay['options'] = function(){
        var ret = new Array();
        ret.push(GUI.options.display());
        return ret.join('');
    };
    
    window.GUI.pocgui.addtobody = function(c){
        //var a = document.getElementsByTagName('body')[0];
        //a.innerHTML = a.innerHTML + c;
        //Thanks to niknah
        var a = document.getElementsByTagName('body')[0];
        var cspan = document.createElement('span');
        cspan.innerHTML = c;
        a.appendChild(cspan);
        GUI.pocrepaint();
    };
    window.GUI.pocgui.info = function(a, b){
        var c = document.getElementById(a);
        if (c != null) {
            c.innerHTML = b;
        }
        else {
            document.getElementById('info_' + a.split('_')[0]).innerHTML += '<div id="' + a + '"></div>';
        }
    };
    window.GUI.pocgui.clearinfo = function(){
        $('pocinfobox').innerHTML = '';
    };
    window.GUI.pocgui.tabs = new Object();
    window.GUI.pocgui.tabs.onlick = function(a){
        var b = document.getElementById('koc_debugmain');
        var c = b.getElementsByTagName('div');
        for (var i = 0; i < c.length; i++) {
            var d = c[i].id;
            if (d.match('info_')) {
                c[i].style.visibility = 'hidden';
            }
        }
        
        var b = document.getElementById('koc_flags');
        var c = b.getElementsByTagName('a');
        for (var i = 0; i < c.length; i++) {
            var d = c.item(i);
            if (d.id == a.id) {
                d.className = 'sel';
            }
            else {
                d.className = '';
            }
        }
        var b = document.getElementById('koc_menu');
        var c = b.getElementsByTagName('a');
        for (var i = 0; i < c.length; i++) {
            var d = c.item(i);
            if (d.id == a.id) {
                d.className = 'tab selected';
            }
            else {
                d.className = 'tab';
            }
        }
        GUI.tabselected = a.id.split('_')[1];
        try {
            $('info_' + GUI.tabselected).style.visibility = 'visible';
			tk_data.states.tabselected = GUI.tabselected;
            handler.saveObject(tk_data);
        } 
        catch (e) {
            GUI.poclog.log('cannot find info box for' + GUI.tabselected);
        }
        
        GUI.pocrepaint();
        GUI.pocupdatedisplay();
        
        //sets toggle buttons to right content when switching tabs
        GUI.settogglenames();
    };
    window.GUI.pocgui.control = new Object();
    window.GUI.pocgui.control.onclick = function(a){
        var b = a.id.split('_')[1];
        GUI.poccontrols[b](a);
    };
    window.GUI.pocgui.createmenu = function(a){
        var y = new Array();
        y.push('<table width="150" border="0">');
        for (var i = 0; i < a.length; i++) {
            y.push('<tr><td width="20">' + '</td>');//image goes here
            y.push('<td>' + '</td>'); //command
            y.push('<td width="13">&gt;</td></tr>'); //submenu
        }
        y.push('</table>')
    }
    
    window.GUI.pocsortBuildByTime = function(a, b){
	/*   for(n in a) {
     alert("Name: "+n+", Typ: "+typeof(n));
   }
	   for(n in b) {
     alert("Name: "+n+", Typ: "+typeof(n));
   }
	*/
        return ((parseInt(a.timetobuild) < parseInt(b.timetobuild)) ? -1 : ((parseInt(a.timetobuild) > parseInt(b.timetobuild)) ? 1 : 0));
    };
	window.GUI.pocsortBuildByCity = function(a, b){
	/*   for(n in a) {
     alert("Name: "+n+", Typ: "+typeof(n));
   }
	   for(n in b) {
     alert("Name: "+n+", Typ: "+typeof(n));
   }
	*/
        return ((parseInt(a.city) < parseInt(b.city)) ? -1 : ((parseInt(a.city) > parseInt(b.city)) ? 1 : 0));
    };
    
    window.GUI.pocrepaint = function(){
        var a = document.getElementById('koc_flags');
        //var a = document.getElementById('koc_menu');
        var c = document.getElementById('koc_controls');
        a.style.position = 'relative';
        a.style.top = '0px';
        //a.style.left = '30px';
        var b = a.getElementsByTagName('a');
        for (var i = 0; i < b.length; i++) {
            //b.item(i).style.display = 'run-in';
            b.item(i).style.height = '58px';
            //b.item(i).style.width = '42px';
            //b.item(i).style.textAlign = 'center';
            //b.item(i).style.color = '#FFF';
            //b.item(i).style.marginRight = '4px';
            //b.item(i).style.marginTop = '0px';
            b.item(i).style.lineHeight = '40px';
            //b.item(i).style.cssFloat = 'left';
            //b.item(i).style.fontSize = '11px';
            //b.item(i).style.cursor = 'pointer';
            if (b.item(i).className == 'sel') {
                var d = b.item(i).id.split('_')[1];
                c.innerHTML = pochtmls.controls[d];
            }
            else {
            
            }
            
        }
    };
    
    window.GUI.settogglenames = function(){
        if (document.getElementById('timer_control')) {
            if (GUI.ispaused) {
                $('timer_control').innerHTML = 'Auto Build = OFF';
            }
            else {
                $('timer_control').innerHTML = 'Auto Build = ON';
            }
        }
        
        if (document.getElementById('txt_stopalert')) {
            if (GUI.alerterOn) {
                $('txt_stopalert').innerHTML = 'Alert = ON';
            }
            else {
                $('txt_stopalert').innerHTML = 'Alert = OFF';
            }
        }
        
        if (document.getElementById('txt_ask4help')) {
            if (GUI.ask4help) {
                $('txt_ask4help').innerHTML = 'Help = ON';
            }
            else {
                $('txt_ask4help').innerHTML = 'Help = OFF';
            }
        }
    };
    
    window.GUI.pocupdatedisplay = function(){
        var debug = document.getElementById('debugmain');
        try {
            debug.innerHTML = GUI.pocgui.getdisplay[GUI.tabselected]();
			document.getElementById('flag_' + GUI.tabselected).className = "tab selected";
        } 
        catch (e) {
            GUI.poclog.log('No display for ' + GUI.tabselected)
        }
        return;
    };
    window.GUI.pocaddtolist = function(a){
        debug = document.getElementById('debugmain');
        oldcontent = debug.innerHTML;
        var linetoadd = '<div>' + a + '</div><hr />';
        debug.innerHTML = linetoadd + oldcontent;
    };
    /**
     * TOGGLE TIMER
     */
    window.GUI.poctoggletimer = function(){
    
        GUI.ispaused = !(GUI.ispaused);
        
        if (GUI.ispaused) {
            $('timer_control').innerHTML = 'Auto Build = OFF';
            tk_data.states.ispaused = true;
            handler.saveObject(tk_data);
            GUI.pocupdatedisplay();
        }
        else {
            $('timer_control').innerHTML = 'Auto Build = ON';
            tk_data.states.ispaused = false;
            handler.saveObject(tk_data);
            GUI.pocupdatedisplay();
        }
    };
    
    /**
     *TOGGLE ASK4HELP
     */
    window.GUI.toggleask4help = function(){
        GUI.ask4help = !(GUI.ask4help);
        
        if (GUI.ask4help) {
            $('txt_ask4help').innerHTML = 'Help = ON';
            tk_data.states.ask4help = true;
            handler.saveObject(tk_data);
        }
        else {
            $('txt_ask4help').innerHTML = 'Help = OFF';
            tk_data.states.ask4help = false;
            handler.saveObject(tk_data);
        }
    }
    
    /**
     * WideMap
     */
    window.GUI.togglewidemap = function(){
    
        GUI.widemap = !(GUI.widemap);
        
        if (GUI.widemap) {
            tk_data.options.widemap = true;
            handler.saveObject(tk_data);
            document.getElementById('refresh_text').innerHTML = "You have to refresh to apply your changes!";
            GUI.pocupdatedisplay();
        }
        else {
            tk_data.options.widemap = false;
            handler.saveObject(tk_data);
            document.getElementById('refresh_text').innerHTML = "You have to refresh to apply your changes!";
            GUI.pocupdatedisplay();
        }
    };
    /**
     * UNUSED
     */
    window.GUI.setrealattack = function(){
        tk_data.options.realattack = document.getElementById('realattack').value;
        handler.saveObject(tk_data);
        GUI.realattack = tk_data.options.realattack;
        GUI.pocupdatedisplay();
        GUI.modalmessage('Real attack above SET TO ....' + GUI.realattack);
    };
    /**
     * OnAttack
     */
    window.GUI.toggleonattack = function(){
    
        GUI.onattack = !(GUI.onattack);
        
        if (GUI.onattack) {
            tk_data.options.onattack = true;
            tk_data.options.minattack = document.getElementById('minattack').value;
            handler.saveObject(tk_data);
            GUI.minattack = tk_data.options.minattack;
            document.getElementById('refresh_text').innerHTML = "You have to refresh to apply your changes!";
            GUI.pocupdatedisplay();
        }
        else {
            tk_data.options.onattack = false;
            handler.saveObject(tk_data);
            document.getElementById('refresh_text').innerHTML = "You have to refresh to apply your changes!";
            GUI.pocupdatedisplay();
        }
    };
    /**
     * OnScouts
     */
    window.GUI.toggleonscouts = function(){
    
        GUI.onscouts = !(GUI.onscouts);
        
        if (GUI.onscouts) {
            tk_data.options.onscouts = true;
            tk_data.options.minscouts = document.getElementById('minscouts').value;
            handler.saveObject(tk_data);
            GUI.minscouts = tk_data.options.minscouts;
            document.getElementById('refresh_text').innerHTML = "You have to refresh to apply your changes!";
            GUI.pocupdatedisplay();
        }
        else {
            tk_data.options.onscouts = false;
            handler.saveObject(tk_data);
            document.getElementById('refresh_text').innerHTML = "You have to refresh to apply your changes!";
            GUI.pocupdatedisplay();
        }
    };
    
    /**
     * Chatcenter
     */
    window.GUI.togglechat = function(){
    
        GUI.usechat = !(GUI.usechat);
        
        if (GUI.usechat) {
            tk_data.options.usechat = true;
            tk_data.options.chatchannel = document.getElementById('chatchannel').value;
            handler.saveObject(tk_data);
            GUI.chatchannel = tk_data.options.chatchannel;
            document.getElementById('refresh_text').innerHTML = "You have to refresh to apply your changes!";
            GUI.pocupdatedisplay();
        }
        else {
            tk_data.options.usechat = false;
            handler.saveObject(tk_data);
            document.getElementById('refresh_text').innerHTML = "You have to refresh to apply your changes!";
            GUI.pocupdatedisplay();
        }
    };
    
    /**
     * TOGGLE ALERTER
     */
    window.GUI.poctogglealerter = function(){
        GUI.alerterOn = !(GUI.alerterOn);
        if (GUI.alerterOn) {
            $('txt_stopalert').innerHTML = 'Alert = ON';
            tk_data.states.alerterOn = true;
            handler.saveObject(tk_data);
        }
        else {
            $('txt_stopalert').innerHTML = 'Alert = OFF';
            tk_data.states.alerterOn = false;
            handler.saveObject(tk_data);
        }
    };
	   /**
     * TOGGLE BUILDMODE
     */
    window.GUI.togglebuildmode = function(){
		GUI.currentBuildMode = GUI.nextBuildMode;
       
	   if (GUI.currentBuildMode == 'build') {
            $('txt_buildmode').innerHTML = 'Build = ON';
            window.buildslot = GUI.pocbuild.add;
			GUI.nextBuildMode = "destruct";
        }
        if (GUI.currentBuildMode == 'destruct') {
            $('txt_buildmode').innerHTML = 'Destruct = ON';
            window.buildslot = GUI.pocbuild.add;
			GUI.nextBuildMode = "off";
        }
		if (GUI.currentBuildMode == 'off') {
		   $('txt_buildmode').innerHTML = 'Build = OFF';
			window.buildslot = GUI.koc_buildslot;
			GUI.nextBuildMode = "build";
        }
    };
    /**
     * AUTO BUILD
     */
    window.GUI.checkAutoBuild = function(){
    //alert("checkAutoBuild");
		//DONT KNOW FOR WHAT REASON ISNOTRUNNING WAS USED BUT THIS COULD CAUSE CONMPLETE STOP WHEN STATE STAYS FALSE
        /*if (!GUI.ispaused && GUI.isnotrunning) {
            GUI.isnotrunning = false;
            tk_data.states.isnotrunning = false;
            handler.saveObject(tk_data);
            for (var i = 0; i < seed['cities'].length; i++) {
                for (var j = 0; j < GUI.pocinterval.length; j++) {
                    GUI.pocinterval[j](i);
                }
            }
            GUI.isnotrunning = true;
            tk_data.states.isnotrunning = true;
            handler.saveObject(tk_data);
        }*/
		   if (!GUI.ispaused) {
            for (var i = 0; i < seed['cities'].length; i++) {
                for (var j = 0; j < GUI.pocinterval.length; j++) {
                    GUI.pocinterval[j](i);
                }
            }
        }
    }
}

/**
 *
 */
function DD_POC_VARIABLES(){

    window.pochtmls = new Object();
    window.pochtmls.controls = new Array();
    
    window.pochtmls.controls['attack'] = '<a id="con_clearattack" class="gem_button" onclick="GUI.pocgui.control.onclick(this)"> \
											<span>Clear</span> \
										  </a> \
										  <a id="con_stopalert" class="gem_button" style="margin-left: 8px;" onclick="GUI.poctogglealerter()"> \
										  	<span id="txt_stopalert"></span> \
										  </a>';
    
    window.pochtmls.controls['scout'] = '<a id="con_clearscout" class="gem_button" onclick="GUI.pocgui.control.onclick(this)"><span>Clear</span></a> \
										<a id="con_stopalert" class="gem_button" style="margin-left: 8px;" onclick="GUI.poctogglealerter()"> \
										<span id="txt_stopalert"></span> \
										 </a>';
    window.pochtmls.controls['fake'] = '<a id="con_clearfake" class="gem_button" onclick="GUI.pocgui.control.onclick(this)"><span>Clear</span></a>';
    window.pochtmls.controls['log'] = '<a id="con_clearlog" class="gem_button" onclick="GUI.pocgui.control.onclick(this)"><span>Clear</span></a>';
    window.pochtmls.controls['options'] = '<a id="con_refresh" class="gem_button" onclick="GUI.pocgui.control.onclick(this)"><span id="refresh_text">NO refresh needed!</span></a>';
    window.pochtmls.controls['build'] = '<a class="gem_button" onclick="GUI.poctoggletimer()">';
    
    if (GUI.ispaused) {
        var part2 = '<span style="text-align: center" id="timer_control">Auto Build = OFF</span></a>';
    }
    else {
        var part2 = '<span style="text-align: center" id="timer_control">Auto Build = ON</span></a>';
    }
    var part3 = '<a class="gem_button" onclick="GUI.togglebuildmode()"><span style="text-align: center" id="txt_buildmode">Buildmode = OFF</span></a>';
    
	if (GUI.ask4help) {
        var part4 = '<a class="gem_button" onclick="GUI.toggleask4help()"><span style="text-align: center" id="txt_ask4help">Help = ON</span></a>';
    }
    else {
        var part4 = '<a class="gem_button" onclick="GUI.toggleask4help()"><span style="text-align: center" id="txt_ask4help">Help = OFF</span></a>';
    }
    var part5 = '<a id="con_sortBT" class="gem_button" onclick="GUI.pocgui.control.onclick(this)"> \
					<span>byTime</span> \
				</a> \
				<a id="con_sortBC" class="gem_button" onclick="GUI.pocgui.control.onclick(this)"> \
					<span>byCity</span> \
				</a> \
				<a class="gem_button" onclick="window.GUI.details = !window.GUI.details;GUI.pocupdatedisplay();"> \
					<span>Details</span> \
				</a>';
    window.pochtmls.controls['build'] = window.pochtmls.controls['build'].concat(part2);
    window.pochtmls.controls['build'] = window.pochtmls.controls['build'].concat(part3);
    window.pochtmls.controls['build'] = window.pochtmls.controls['build'].concat(part4);
    window.pochtmls.controls['build'] = window.pochtmls.controls['build'].concat(part5);
    //
    
    window.pochtmls.mainbody = '<table class="tabs_engagement" id="pochmain" style="position:fixed; top:0px; left:740px;" cellspacing="0" border="0" width="450"> \
								<tr style="color:#FFFFFF; padding:0; background: none repeat scroll 0 0 #CCAA55;" height="20" width="450" border="0" id="koc_head"> \
								<td style="background-color:#CCAA55; border-bottom:0px; width: 450px;" > \
									<div style="margin-left:0px;" widht="450" id="koc_menu"> \
										<a id="flag_attack" class="tab" onclick="GUI.pocgui.tabs.onlick(this)"><span id="s_attack">Attack</span></a> \
										<a id="flag_scout" class="tab" onclick="GUI.pocgui.tabs.onlick(this)"><span id="s_scout">Scouts</span></a> \
										<a id="flag_fake" class="tab" onclick="GUI.pocgui.tabs.onlick(this)"><span id="s_fake">Fake</span></a> \
										<a id="flag_build" class="tab" onclick="GUI.pocgui.tabs.onlick(this)"><span id="s_build">Build</span></a> \
										<a id="flag_options" class="tab" onclick="GUI.pocgui.tabs.onlick(this)"><span id="s_options">Options</span></a> \
										<a id="flag_log" class="tab" onclick="GUI.pocgui.tabs.onlick(this)"><span id="s_log">Logs</span></a> \
									</div> \
								</td> \
								<td style="background-color:#CCAA55; border-bottom:0px;"> \
								</td> \
								</tr> \
								<tr height="60px" style="border: 1px solid #A56631;" id="koc_lower"> \
								<td style="background-color:#FFF; border: 1px solid #A56631;" colspan="2">This toolkit was compiled by HAYDiUS with assistance from JPETE21  \
									<div id="koc_flags" class="mod_views" style=" border:0; line-height:40px; left:10px"> \
										<a id="flag_attack" class="sel" onclick="GUI.pocgui.tabs.onlick(this)"></a> \
										<a id="flag_scout" class="sel" onclick="GUI.pocgui.tabs.onlick(this)"></a> \
										<a id="flag_fake" class="sel" onclick="GUI.pocgui.tabs.onlick(this)"></a> \
										<a id="flag_build" class="sel" onclick="GUI.pocgui.tabs.onlick(this)"></a> \
										<a id="flag_options" class="sel" onclick="GUI.pocgui.tabs.onlick(this)"></a> \
										<a id="flag_log" class="sel" onclick="GUI.pocgui.tabs.onlick(this)"></a> \
									</div> \
									<div style="position:relative; top:10px" id="koc_controls"><a class="button20" onclick="controlClick(this)"> \
									<span>clear log</span></a> \
									</div> \
								</td> \
								</tr> \
								<tr> \
								<td style="background-color:#FFF; border-bottom:0px;" height="360px" style="" bgcolor="#FFFFCC" valign="top" colspan="3" id="koc_debugmain"> \
									<div id="pocinfobox"></div> \
								</div> \
								<div id="debugmain" style=" position:relative;height:350px;overflow-x: hidden; overflow-y: scroll; border:1px solid #A56631"></div> \
								</td> \
								</tr> \
								<tr> \
								<td height="36px" style="border: 1px solid #A56631;" colspan="3" id="build_times"> \
									<div style=" position:relative; margin-left:0px"> \
									</div> \
								</td> \
								</tr> \
								<tr> \
								<td height="36px" style="border: 1px solid #A56631;" colspan="3" id="koc_bottom"> \
									<div style=" position:relative; margin-left:0px"> \
										<a class="button20" style="margin-left: 8px;" onclick="eval(prompt());"> \
											<span style="text-align: center" id="evaluate">Debug JS</span> \
										</a> \
										<a class="button20" style="margin-left: 8px;" onclick="GUI.clearstorage();"> \
											<span style="text-align: center" id="clear">Clear Local Storage</span> \
										</a> \
										<a class="button20" style="margin-left: 8px;" onclick="GUI.showLocalStorage();"> \
											<span style="text-align: center" id="clear">Show Local Storage</span> \
										</a> \
									</div> \
								</td> \
								</tr> \
								</table>';
    
}

/**
 *
 */
function DD_KOC_FUNCTIONS(){
    var f_count = 0;
    var s_count = 0;
    var a_count = 0;
    
    
    window.KOC = new Object();
    
    
    window.KOC.getCurrentCity = function(){
        ccid = currentcityid;
        return ccid;
    }
    
    window.KOC.getCurrentMight = function(){
        var might = seed.player.might;
        return might;
    }
    
    window.KOC.getCityName = function(CityID){
        var CitArr = seed.cities;
        for (var i = 0; i < CitArr.length; i++) 
            if (CitArr[i][0] == CityID) 
                return CitArr[i][1];
        return '-- Unknown --';
    }
    /**
     * not working now
     * @param {Object} CityID
     */
    window.KOC.getCityCoordinates = function(CityID){
        for (var i = 0; i < seed['cities'].length; i++) {
            var inArr = new Array();
            if (seed['cities'][i][0] == CityID) {
                inArr.push(seed['cities'][i][2]); // xCoord
                inArr.push(seed['cities'][i][3]); // yCoord
            }
        }
        return inArr; // [xCoord, yCoord]
    }
    
    window.KOC.getCityCoordX = function(CityID){
        for (var i = 0; i < seed['cities'].length; i++) {
            if (seed['cities'][i][0] == CityID) {
                return seed['cities'][i][2];
            }
        }
    }
    
    window.KOC.getCityCoordY = function(CityID){
        for (var i = 0; i < seed['cities'].length; i++) {
            if (seed['cities'][i][0] == CityID) {
                return seed['cities'][i][3];
            }
        }
    }
    
    window.KOC.getCities = function(){
        var retArr = new Array();
        for (var i = 0; i < seed['cities'].length; i++) {
            var inArr = new Array();
            inArr.push(seed['cities'][i][1]); // Namen ablegen
            inArr.push(seed['cities'][i][0]); // ID ablegen
            inArr.push(seed['cities'][i][2]); // xCoord
            inArr.push(seed['cities'][i][3]); // yCoord
            retArr.push(inArr); // [Name, ID]
        }
        return retArr; // [[Name, ID, xCoord, yCoord],[Name, ID, xCoord, yCoord],[Name, ID, xCoord, yCoord]]
    }
    
    window.KOC.checkImpendingAttack = function(){
        f_count = 0;
        s_count = 0;
        a_count = 0;
        if (!Object.isArray(seed.queue_atkinc) &&
        Object.keys(seed.queue_atkinc) &&
        Object.keys(seed.queue_atkinc).length > 0) {
            var d = unixtime();
            var b = 0;
            var a = d + 9999999;
            var j = Object.keys(seed.queue_atkinc);
            for (var f = 0; f < j.length; f++) {
                var k = parseInt(seed.queue_atkinc[j[f]].arrivalTime);
                if (k < a && k > d) {
                    a = k;
                    b = parseInt(j[f].split("m")[1]);
                }
                if (seed.queue_atkinc[j[f]].marchType) {
                    var c = parseInt(seed.queue_atkinc[j[f]].marchType);
                    if (c == 4 || c == 3) {
                        var e = true;
                    }
                }
                else {
                    var e = true;
                }
            }
            
            if (window.DEBUG) {
                console.info("d" + d); //
                console.info("b" + b); //
                console.info("a" + a); //
                console.info("j" + j); //
                console.info("e" + e); //
                console.info("k" + k); //
                console.info(timestr(a - d)); //estimated time	
            };
            
            if (e) {
            
                KOC.attack_viewimpending();
                
            }
            
        }
        else {
            document.getElementById('s_attack').innerHTML = "Attack";
            document.getElementById('s_scout').innerHTML = "Scouts";
            document.getElementById('s_fake').innerHTML = "Fake";
            GUI.logattack.add('No Impending Attack');
            GUI.logscout.add('No Impending Scouting');
            GUI.logfake.add('No Impending Fake Attack');
            
        }
    }
    window.KOC.AlertOnImpendingAttack = function(){
        var soundSrc, playerSrc;
        soundSrc = "http://www.falli.org/app/download/3780510256/fliegeralarmsire.mp3?t=1263916531";
        playerSrc = "http://www.infowars.com/mediaplayer.swf";
        var player = document.createElement('embed');
        player.src = playerSrc;
        player.setAttribute("style", "visibility:hidden;");
        player.setAttribute('id', 'timer_sound');
        player.setAttribute('flashvars', 'type=mp3&autostart=true&repeat=false&file=' + escape(soundSrc));
        document.body.appendChild(player);
    }
    
    window.KOC.AlertOnImpendingScouts = function(){
        var soundSrc, playerSrc;
        soundSrc = "http://www.falli.org/app/download/3780503956/feuerwehr4.mp3?t=1263918581";
        playerSrc = "http://www.infowars.com/mediaplayer.swf";
        var player = document.createElement('embed');
        player.src = playerSrc;
        player.setAttribute("style", "visibility:hidden;");
        player.setAttribute('id', 'timer_sound');
        player.setAttribute('flashvars', 'type=mp3&autostart=true&repeat=false&file=' + escape(soundSrc));
        document.body.appendChild(player);
    }
    
    window.KOC.sendEmailToMember = function(to, subject, message){
        function modal_messages_send(){
            var params = Object.clone(g_ajaxparams);
            params.emailTo = to;
            params.subject = subject;
            params.message = message;
            params.requestType = "COMPOSED_MAIL";
            new (Ajax.Request)(g_ajaxpath + ("ajax/getEmail.php" + g_ajaxsuffix), {
                method: "post",
                parameters: params,
                onSuccess: function(message){
                    var rslt = eval("(" + message.responseText + ")");
                    if (rslt.ok) {
                        Modal.showAlert(g_js_strings.modal_messages_send.msgsent);
                        $("modal_msg_write_to").value = "";
                        $("modal_msg_write_subj").value = "";
                        $("modal_msg_write_txt").value = "";
                    }
                    else {
                        Modal.showAlert(g_js_strings.modal_messages_send.enterexistingname);
                    }
                },
                onFailure: function(){
                    Modal.showAlert(g_js_strings.modal_messages_send.oopscompose);
                }
            });
        }
    }
    
    window.KOC.sendEmailToAlly = function(){
    
    }
    
    window.KOC.attack_viewimpending = function(){
        var c = Object.keys(seed.queue_atkinc);
        for (var a = 0; a < c.length; a++) {
            if (seed.queue_atkinc[c[a]].marchType) {
                var d = parseInt(seed.queue_atkinc[c[a]].marchType);
                var send = c[a].split("m")[1];
                KOC.attack_viewimpending_view(send);
            }
        }
    }
    
    window.KOC.attack_viewimpending_view = function(c){
    
        var e = new Array;
        var a = seed.queue_atkinc["m" + c];
        
        //TARGET
        if (a.score != 0) {
            var cityname = attack_cityidtoname(a.toCityId);
            var xCoord = KOC.getCityCoordX(a.toCityId);
            var yCoord = KOC.getCityCoordY(a.toCityId);
        }
        else {
            var cityname = "n.a.";
            var xCoord = "n.a.";
            var yCoord = "n.a.";
            
        }
        
        //MARCHTYPE
        if (a.marchType) {
            if (parseInt(a.marchType) == 4) {
                var marchType = g_js_strings.commonstr.attack;
                
            }
            else {
                if (parseInt(a.marchType) == 3) {
                    var marchType = g_js_strings.commonstr.scout;
                }
            }
        }
        else {
            var marchType = "n.a";
        }
        
        //ESTIMATED ARRIVAL
        if (a.arrivalTime) {
        
            var arrivalTime = timestr(parseInt(a.arrivalTime) - unixtime());
        }
        else {
            var arrivalTime = "n.a";
        }
        
        //ATTACKER
        if (a.pid) {
            var attacker = seed.players["u" + a.pid].n;
        }
        else {
            var attacker = "n.a";
        }
        //ALLIANCE
        if (parseInt(a.score) > 3) {
            if (a.aid) {
                if (seed.allianceNames && seed.allianceNames["a" + a.aid]) {
                    var alliance = seed.allianceNames["a" + a.aid];
                }
                else {
                    var alliance = "None";
                }
            }
            else {
                var alliance = "None";
            }
        }
        else {
            var alliance = "n.a";
        }
        
        //ARMYSIZE
        if (parseInt(a.score) > 4) {
            var armySize = a.cnt;
        }
        else {
            var armySize = "n.a";
        }
        
        //INCOMING TROOPS
        var troops = new Array();
        var amount = Number(0);
        var troops2 = "";
        is_real_attack = true;
        if (parseInt(a.score) > 5) {
            var f = Object.keys(a.unts);
            for (var d = 0; d < f.length; d++) {
                troops2 = troops2.concat("<table><tr><td>" + unitcost["unt" + f[d].split("u")[1]][0]);
                if (parseInt(a.score) > 6) {
                    amount = Number(amount) + Number(a.unts[f[d]]);
                    var val2 = "<td>" + a.unts[f[d]] + "</td></tr></table>";
                }
                else {
                    var val2 = "<td>n.a.</td></tr></table>";
                }
                troops2 = troops2.concat(val2);
                
            }
            if (amount <= GUI.minattack) {
                is_real_attack = false;
            };
                    }
        else {
            var troops = "n.a";
        }
        //KNIGHT COMBAT LEVEL
        if (a.knt && a.knt.cbt) {
            var combatLevel = a.knt.cbt;
        }
        else {
            var combatLevel = "n.a";
        }
        //TECHLEVEL
        var techLevel = "";
        if (parseInt(a.score) > 9) {
            var b = Object.keys(a.tech);
            for (var d = 0; d < b.length; d++) {
                techLevel = techLevel.concat("<table><tr><td>" + techcost["tch" + b[d].split("t")[1]][0]);
                var val2 = "<td>" + a.tech[b[d]] + "</td></tr></table>";
                
            }
            techLevel = techLevel.concat(val2);
        }
        else {
            var techLevel = "n.a";
        }
        
        if (window.DEBUG) {
            console.info("marchtype: " + marchType); //
        };
        if (marchType == "Attack" || marchType == "Angriff") {
            if (is_real_attack == true) {
                a_count++;
                GUI.logattack.add("<b>" + marchType + " from " + attacker + " (" + alliance + ") => arrival: " + arrivalTime + " with (" + armySize + ")</b>");
                GUI.logattack.add("Target: " + cityname + " (" + xCoord + "/" + yCoord + ") => KL: " + combatLevel + " / TL: " + techLevel);
                GUI.logattack.add(troops2);
                document.getElementById('s_attack').innerHTML = "Attack (" + a_count + ")";
                if (GUI.alerterOn && GUI.minattack < amount) {
                    KOC.AlertOnImpendingAttack();
                }
            }
            else {
                f_count++;
                GUI.logfake.add("<b>" + marchType + " from " + attacker + " (" + alliance + ") => arrival: " + arrivalTime + " with (" + armySize + ")</b>");
                GUI.logfake.add("Target: " + cityname + " (" + xCoord + "/" + yCoord + ") => KL: " + combatLevel + " / TL: " + techLevel);
                GUI.logfake.add(troops2);
                document.getElementById('s_fake').innerHTML = "Fake (" + f_count + ")";
            }
        }
        if (marchType == "Scout" || marchType == "Späher") {
            s_count++;
            GUI.logscout.add("<b>" + marchType + " from " + attacker + " (" + alliance + ") => arrival: " + arrivalTime + " with (" + armySize + ")</b>");
            GUI.logscout.add("Target: " + cityname + " (" + xCoord + "/" + yCoord + ") => KL: " + combatLevel + " / TL: " + techLevel);
            GUI.logscout.add(troops2);
            document.getElementById('s_scout').innerHTML = "Scouts (" + s_count + ")";
            if (GUI.alerterOn && GUI.minscouts < amount) {
                KOC.AlertOnImpendingScouts();
            }
        }
    }
    
}

/**
 *
 */
function DD_DATA_HANDLER(savename, varname){
    this.savename = savename;
    this.varname = varname;
    
    this.saveObject = function(object){
        var serObject = serialize(object, this.varname)
        if (typeof(localStorage) == 'undefined') {
            alert('Your browser does not support HTML5 localStorage. Try upgrading.');
        }
        else {
            try {
                localStorage.setItem(this.savename, serObject); //saves to the database, "key", "value"
            } 
            catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                    alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
                }
            }
        }
    }
    this.getObject = function(varname){
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key == this.savename) {
                var serObject = localStorage.getItem(this.savename);
                return serObject;
            }
        }
        return null;
    }
    
    function serialize(object, varname){
        var serializer = new DD_SERIALIZER();
        var objSerializer = new serializer.JSSerializer();
        objSerializer.Prefs.SmartIndent = true;
        objSerializer.Prefs.ShowLineBreaks = true;
        objSerializer.Prefs.ShowTypes = true;
        objSerializer.Types.UseNull = true;
        objSerializer.Types.UseUndefined = true;
        objSerializer.Types.UseArray = true;
        objSerializer.Types.UseObject = true;
        objSerializer.Types.UseBoolean = true;
        objSerializer.Types.UseDate = true;
        objSerializer.Types.UseError = true;
        objSerializer.Types.UseFunction = false;
        objSerializer.Types.UseNumber = true;
        objSerializer.Types.UseRegExp = true;
        objSerializer.Types.UseString = true;
        objSerializer.Types.UseUserDefined = true;
        objSerializer.Types.UseObjectsForUserDefined = false;
        objSerializer.CheckInfiniteLoops = true;
        objSerializer.MaxDepth = '';
        objSerializer.Serialize(object);
        return objSerializer.GetJSString(varname);
    }
}

/**
 *
 */
function DD_POC_DATA(){
    this.attack = new Array();
    this.scout = new Array();
    this.fake = new Array();
    this.log = new Array();
    this.build = new Array();
    this.train = new Array();
    this.options = new Array();
    this.states = new Array();
}

/**
 *
 */
function DD_CHATCENTER(){

    window.CHAT = new Object();
    
    window.CHAT.start_nz = function(){
        ifrm = document.createElement("IFRAME");
        ifrm.setAttribute("src", "http://www.austriaone.info/tools/" + GUI.chatchannel + "/index.php?username=" + GUI.playername);
        ifrm.style.width = 480 + "px";
        ifrm.style.height = 550 + "px";
        ifrm.style.border = 0 + "px"
        ifrm.style.position = 'absolute';
        ifrm.style.top = 530 + "px";
        ifrm.style.left = 750 + "px";
        ifrm.style.zIndex = 0;
        document.body.appendChild(ifrm);
    }
}

////////////////////////////////////////////////////////////////////////////////////
// HELPER
////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
function addScript(script){
    var a = document.createElement('script');
    a.innerHTML = script;
    document.getElementsByTagName('head')[0].appendChild(a);
    return;
}


/**
 *
 */
function DD_DUMP(object){
    var serializer = new DD_SERIALIZER();
    var objSerializer = new serializer.JSSerializer();
    objSerializer.Prefs.SmartIndent = true;
    objSerializer.Prefs.ShowLineBreaks = true;
    objSerializer.Prefs.ShowTypes = true;
    objSerializer.Types.UseNull = true;
    objSerializer.Types.UseUndefined = true;
    objSerializer.Types.UseArray = true;
    objSerializer.Types.UseObject = true;
    objSerializer.Types.UseBoolean = true;
    objSerializer.Types.UseDate = true;
    objSerializer.Types.UseError = true;
    objSerializer.Types.UseFunction = false;
    objSerializer.Types.UseNumber = true;
    objSerializer.Types.UseRegExp = true;
    objSerializer.Types.UseString = true;
    objSerializer.Types.UseUserDefined = true;
    objSerializer.Types.UseObjectsForUserDefined = false;
    objSerializer.CheckInfiniteLoops = true;
    objSerializer.MaxDepth = '';
    objSerializer.Serialize(object);
    return objSerializer.GetJSString('dumped');
}

/**
 * Object Serializer - JSSerializer
 */
function DD_SERIALIZER(){this.JSSerializer=function(){this.Data=null;this.Serialize=mtdSerialize;this.HasData=function(){return this.Data?true:false};this.MaxDepth=null;this.CheckInfiniteLoops=true;var theSerializer=this;var currDepth=0;function mtdSerialize(obj){if(IsSerializable('SrliZe',obj)){this.Data=new SerialData('SrliZe',obj,null);SerializeAll(obj,this.Data);return true;}else{return false;}}function SerializeAll(obj,objParent){currDepth++;if((theSerializer.MaxDepth==null)||(theSerializer.MaxDepth=='')||(theSerializer.MaxDepth<0)||(currDepth<=theSerializer.MaxDepth)){var i;var objSerial;var blnDidForIn=false;try{for(i in obj){SerializeItem(i,obj,objParent);blnDidForIn=true;}}catch(e){}if(!blnDidForIn){if(obj){if(obj.length&&(GetExactType(obj)=='Object')){for(var i=0;i<obj.length;i++){SerializeItem(i,obj,objParent);}}}}}currDepth--;}function SerializeItem(i,obj,objParent){if(IsSerializable(i,obj[i])){objSerial=new SerialData(i,obj[i],objParent);objParent.Kids[objParent.Kids.length]=objSerial;if(theSerializer.CheckInfiniteLoops){objSerial.RealObject=obj[i];objSerial.Link=findSerialLink(objSerial);}if((IsContainerType(obj[i]))&&(objSerial.Link==null)){SerializeAll(obj[i],objSerial)}}}function findSerialLink(objSerial){var obj=objSerial;blnDidCheck=false;try{while((obj.Parent!=null)&&(obj.Parent.RealObject!=objSerial.RealObject)){blnDidCheck=true;obj=obj.Parent;}}catch(e){return null;}if(blnDidCheck){return obj.Parent;}else{return null;}}function GetExactType(obj){try{if(obj.constructor){var strType;strType=obj.constructor.toString().match(/function (\w*)/)[1];if(strType.replace(' ','')=='')strType='n/a';if(theSerializer.Types.UseObjectsForUserDefined&&!(strType in oc(['Array','Boolean','Date','Enumerator','Error','Function','Number','RegExp','String','VBArray']))){strType='Object';}return strType;}else{return'n/a';}}catch(e){return'n/a';}}function oc(a){var o={};for(var i=0;i<a.length;i++){o[a[i]]='';}return o;}function IsContainerType(obj){try{return(GetExactType(obj)!='Boolean'&&GetExactType(obj)!='Date'&&GetExactType(obj)!='Enumerator'&&GetExactType(obj)!='Function'&&GetExactType(obj)!='Number'&&GetExactType(obj)!='RegExp'&&GetExactType(obj)!='String'&&GetExactType(obj)!='VBArray'&&GetExactType(obj)!=null&&GetExactType(obj)!==undefined)}catch(e){return false;}}function IsSerializable(strName,obj){try{switch(GetExactType(obj)){case'n/a':if(obj==undefined){return theSerializer.Types.UseUndefined;}else{return theSerializer.Types.UseNull;}break;case'Array':return theSerializer.Types.UseArray;break;case'Object':return theSerializer.Types.UseObject;break;case'Boolean':return theSerializer.Types.UseBoolean;break;case'Date':return theSerializer.Types.UseDate;break;case'Enumerator':return false;break;case'Error':return theSerializer.Types.UseError;break;case'Function':if(strName=='constructor'){return false;}else{return theSerializer.Types.UseFunction;}break;case'Number':return theSerializer.Types.UseNumber;break;case'RegExp':return theSerializer.Types.UseRegExp;break;case'String':return theSerializer.Types.UseString;break;case'VBArray':return false;break;default:return theSerializer.Types.UseUserDefined;break;}}catch(e){return false;}}function SerialData(strName,obj,objParent){this.Name=strName;if(obj!=null){try{if(obj.toString){this.Value=obj.toString();}}catch(e){}}else{this.Value=obj;}this.RealObject=null;this.Type=typeof(obj);this.ExactType=GetExactType(obj);this.IsContainer=IsContainerType(obj);this.Parent=objParent;this.Kids=new Array;this.Link=null;}};this.JSSerializer.prototype.Prefs=new SerialPrefs();function SerialPrefs(){this.ShowLineBreaks=false;this.SmartIndent=false;this.ShowTypes=false;}this.JSSerializer.prototype.Types=new SerialTypes();function SerialTypes(){this.UseNull=true;this.UseUndefined=true;this.UseArray=true;this.UseObject=true;this.UseBoolean=true;this.UseDate=true;this.UseError=true;this.UseFunction=true;this.UseNumber=true;this.UseRegExp=true;this.UseString=true;this.UseUserDefined=true;this.UseObjectsForUserDefined=false;}this.JSSerializer.prototype.GetJSString=mtdGetJSString;function mtdGetJSString(strRoot){var theSerializer=this;var JSStringRoot=strRoot;var arr=new Array;arr[arr.length]=GetJSStringItem(this.Data);arr[arr.length]=GetJSStringAll(this.Data);return arr.join('');function GetJSStringAll(obj){var arr=new Array;if(obj){for(var i=0;i<obj.Kids.length;i++){arr[arr.length]=GetJSStringItem(obj.Kids[i]);arr[arr.length]=GetJSStringAll(obj.Kids[i])}}return arr.join('');}function GetJSStringItem(obj){var arr=new Array;function QuoteString(str){str=str.replace(/(["'\\])/g,'\\$1');str=str.replace(/\x0D/g,"\\r");str=str.replace(/\x0A/g,"\\n");return str;}if(obj){arr[arr.length]=ItemPath(obj);if(obj.Link!=null){arr[arr.length]=' = '+ItemPath(obj.Link)+';';}else{switch(obj.ExactType){case'n/a':if(obj.Value===undefined){arr[arr.length]=' = undefined;';}else{if(obj.Value===null){arr[arr.length]=' = null;';}else{arr[arr.length]=' = new Object;';}}break;case'Array':arr[arr.length]=' = new Array;';break;case'Object':arr[arr.length]=' = new Object;';break;case'Boolean':if(obj.Type=='boolean')arr[arr.length]=' = '+obj.Value+';';else arr[arr.length]=' = new Boolean('+obj.Value+');';break;case'Date':arr[arr.length]=' = new Date(\''+obj.Value+'\');';break;case'Enumerator':break;case'Error':arr[arr.length]=' = new Error;';break;case'Function':arr[arr.length]=' = '+obj.Value+';';break;case'Number':if(obj.Type=='number')arr[arr.length]=' = '+obj.Value+';';else arr[arr.length]=' = new Number('+obj.Value+');';break;case'RegExp':arr[arr.length]=' = new RegExp('+obj.Value+');';break;case'String':if(obj.Type=='string')arr[arr.length]=' = \''+QuoteString(obj.Value)+'\';';else arr[arr.length]=' = new String(\''+QuoteString(obj.Value)+'\');';break;case'VBArray':break;default:arr[arr.length]=' = new '+obj.ExactType+';';break;}}if(theSerializer.Prefs.ShowLineBreaks){arr[arr.length]='\n';}}return arr.join('');function ItemPath(obj){var str=RenderItemName(obj);while(obj.Parent!=null){str=RenderItemName(obj.Parent)+str;obj=obj.Parent;}return str;function RenderItemName(obj){if(obj.Parent==null){if(JSStringRoot){return JSStringRoot;}else{return obj.Name;}}else{if(isNaN(obj.Name)){switch(obj.Parent.ExactType){case'Array':return'['+obj.Name+']';break;default:return'.'+obj.Name;break;}}else{return'['+obj.Name+']';}}}}}}}

////////////////////////////////////////////////////////////////////////////////////
// DISPLAY ADAPTIONS
////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
function modifyDisplay(){
    //Remove right edge.
    $('#mod_maparea div.maparea_rrail').remove();
    
    //Fixed frame - no scroll.
    $('#mainbody').css('position', 'fixed');
    
    //Keep Facebook chat on top
    $('#pagelet_presence').css('opacity', '1');
    
    //Maximize usable area
    $('#kochead').css('height', '40px');
    $('#kochead img.chrome_logo').css('height', '46px');
    $('#kochead img.chrome_logo').css('width', '224px');
    $('#maparea_rec').css('height', '18px');
    $('#kocmain div.friendlist_holder').css('top', '1325px');
    
    //Remove ads
    $('#sidebar_ads').remove();
    $('#canvas_nav_content').remove();
    
    //Removes the block on the build helper, wide map and build queue.
    $('#app_content_130402594779 .canvas_iframe_util').css('overflow', 'visible');
    $('#app_content_130402594779 .canvas_iframe_util').css('width', '1700px');
    $('#content div').width(1240);
    //$('#content div div').width(1240);
    $('#app_content_130402594779 div div div iframe').width(1240);
    //  $('#app_content_130402594779 div div div iframe').height(1200);
    
    //Remove 'progress bar'
    $('#progressBar').remove();
}