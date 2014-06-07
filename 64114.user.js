// KingsAge Farmer user script
// version 1.05
// kingsage version 1.1.8
// 2011-02-16
// Copyright (c) 2009, 2010, 2011 Arxleol
// http://www.axino.net
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "KingsAge Farmer", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name KingsAge Farmer
// @namespace http://axino.net/code/
// @description Auto-farmer for the kingsage
// @version 1.05
// @author Arxleol
// @copyright Axino.net (http://www.axino.net/)
// @include http://*.kingsage.*/*
// @include http://*.kingsage.*.*/*
// ==/UserScript==

//this function check if there is new version of script available
window.checkVersion = function(){

	var tmp = new Date().getTime();

	var tm = GM_getValue("kaf", 0);

	if(tm == 0){
		
		GM_setValue("kaf", parseInt(tmp/1000));

	}else{

		if(tmp/1000 - parseInt(tm) >= 45000){

			GM_setValue("kaf", parseInt(tmp/1000));

			GM_xmlhttpRequest({
			    method: 'GET',
			    url: 'http://userscripts.org/scripts/source/64114.meta.js',
			    headers: {
			        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			        'Accept': 'application/html,application/xml,text/xml',
			    },
			    onload: function(responseDetails) {
			    	
			    	var text = responseDetails.responseText;
			    	vs=text.split("\n");
			    	vers = vs[4].substring(12);
	
			    	if(version < parseFloat(vers)){
			    		
			    		alert("New version of KingsAge Farmer is out!");

			    		window.location = "http://userscripts.org/scripts/source/64114.user.js";
			    		
						window.reload();
			
			    	}
			    	
			    	
			    	
			    }
			});		
			
		}
		
	}

}

//The following code shows left panel
window.showPanel = function() {

	var findPattern = "/html/body/div[5]/a";
	var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	var rst=resultLinks.iterateNext();

	if(GM_getValue('panel1', 1)){
	
		GM_addStyle("#toppanel { top: 0px;}");
		GM_addStyle("#opentoppanel { top: 500px;}");
		
		GM_setValue('panel1', 0);
		
	}else{
		
		GM_setValue('panel1', 1);
		
		GM_addStyle("#toppanel { top: -500px;}");
		GM_addStyle("#opentoppanel { top: 0px;}");
		
	}
	
}

window.prePanel = function() {

	var findPattern = "/html/body/div[5]/a";
	var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	var rst=resultLinks.iterateNext();

	if(!GM_getValue('panel1', 1)){
	
		GM_addStyle("#toppanel { top: 0px;}");
		GM_addStyle("#opentoppanel { top: 500px;}");
		
	}else{

		GM_addStyle("#toppanel { top: -500px;}");
		GM_addStyle("#opentoppanel { top: 0px;}");
		
	}
	
}

//Function tests how many units is present.
//Currently if there are more then 100 units attack will be sent.
window.testUnits = function(){
	
	var findPattern = '//*[@id="settlement"]';
	var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	var rst=resultLinks.iterateNext();		
	
	var sps = rst.innerHTML;
	
	list = sps.split('|');

	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");
	var xmlObj=xmlDoc.documentElement;

	var i = 0;

        var suma = 0;

        //This loop is used for calculating available units. It takes into consideration limitations set by user using settings.
	while(i<xmlObj.childNodes.length){
	
            
            if(xmlObj.childNodes[i].getAttribute("id")==qs['village']){

                var j = 0;

                while(j < xmlObj.childNodes[i].childNodes[0].childNodes.length){

                    if(xmlObj.childNodes[i].childNodes[0].childNodes[j].textContent == "yes"){

                        if(j == 0){

                            suma += parseInt(list[4]);

                        }else if(j == 1){

                            suma += parseInt(list[5]);

                        }else if(j == 2){

                            suma += parseInt(list[6]);

                        }else if(j == 3){

                            suma += parseInt(list[7]);

                        }else if(j == 4){

                            suma += parseInt(list[9]);

                        }else if(j == 5){

                            suma += parseInt(list[10]);

                        }

                    }

                    j++;

                }

            }

            i++;

        }

	if(suma >= 100){
	
		return true;
		
	}else{
	
		return false;
		
	}
	
}

window.timeChange = function(){

	if(testUnits()){

		performAttackS1();
			
	}else{
		
		var locs = window.location.toString();
		
		var ls = locs.split("/");
		
		var linky = ls[2];
			
		window.location = "http://"+linky+"/game.php?village="+qs['village']+"&s=overview";
			
		window.reload();
		
	}
	
}

//Function performs first stage of attack
//entering barracks and setting coordinates.
window.performAttackS1 = function(){
		
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");
	//GM_setValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>");
	var xmlObj=xmlDoc.documentElement;
	
	var i = 0;
	var j = 1;

	while(i<xmlObj.childNodes.length){
	
		if(xmlObj.childNodes[i].getAttribute("id")==qs['village']){
			
			while(j<xmlObj.childNodes[i].childNodes.length){
	
				if(parseInt(xmlObj.childNodes[i].childNodes[j].childNodes[2].textContent)==0){

					var locs = window.location.toString();
					
					var ls = locs.split("/");
					
					var linky = ls[2];
						
					window.location = "http://"+linky+"/game.php?village="+qs['village']+"&s=build_barracks&m=command&target="+xmlObj.childNodes[i].childNodes[j].childNodes[1].textContent+"&stageFarm=2";
						
					window.reload();
					
				}
				
				j++;
				
			}
			
		}
		
		i++;
		
		j = 1;
		
	}
		
}     
	
window.performAttackS2 = function(){

	var findPattern = '//*[@id="settlement"]';
	var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	var rst=resultLinks.iterateNext();		
	
	var sps = rst.innerHTML;
	
	list = sps.split('|');
	
	//stop sign is turned off when number of units reaches 100
	var stopsgn = true;
	
	//number of units currently involved
	var nu = 0;

	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");
	var xmlObj=xmlDoc.documentElement;

        var i = 0;

	while(i<xmlObj.childNodes.length){

            if(xmlObj.childNodes[i].getAttribute('id')==qs['village'] && xmlObj.childNodes[i].childNodes[1].childNodes[2].textContent != "2"){

                break;

            }

            i++;

        }

	if(parseInt(list[5])>0 && xmlObj.childNodes[i].childNodes[0].childNodes[0].childNodes[0].nodeValue == "yes"){

	    var findPattern = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/div/div/div[4]/input';
	    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	    var rst=resultLinks.iterateNext();			
		
		if(parseInt(list[5])<100){
		    
		    rst.value = list[5];
		    
		    nu = parseInt(list[5]);
			
		}else{
		
			stopsgn = false;	  
		    
		    rst.value = 100;			
			
		}
		
	}
	
	if(parseInt(list[6])>0 && stopsgn && xmlObj.childNodes[i].childNodes[0].childNodes[1].childNodes[0].nodeValue == "yes"){

	    var findPattern = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/div/div[2]/div[4]/input';
	    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	    var rst=resultLinks.iterateNext();		
		
		if(nu==0 && parseInt(list[6]) > 100){
		    
			stopsgn = false;	  
		    
		    rst.value = 100;
			
		}else{
			
		    if(parseInt(list[6])+nu>100){
		    	
		    	rst.value = 100 - nu;
		    		
		    	stopsgn = false;
		    	
		    }else{
		    
		    	rst.value = parseInt(list[6]);
		    	
		    	nu += parseInt(list[6]);
		    	
		    }					
			
		}
		
	}
	
	if(parseInt(list[7])>0 && stopsgn && xmlObj.childNodes[i].childNodes[0].childNodes[2].childNodes[0].nodeValue == "yes"){
		
	    var findPattern = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/div/div[3]/div[4]/input';
	    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	    var rst=resultLinks.iterateNext();		
		
		if(nu==0 && parseInt(list[7]) > 100){
		    
			stopsgn = false;	  
		    
		    rst.value = 100;
			
		}else{
			
		    if(parseInt(list[7])+nu>100){
		    	
		    	rst.value = 100 - nu;
		    		
		    	stopsgn = false;
		    	
		    }else{
		    
		    	rst.value = parseInt(list[7]);
		    	
		    	nu += parseInt(list[7]);
		    	
		    }					
			
		}
		
	}	
	
	if(parseInt(list[8])>0 && stopsgn && xmlObj.childNodes[i].childNodes[0].childNodes[3].childNodes[0].nodeValue == "yes"){
		
	    var findPattern = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/div/div[4]/div[4]/input';
	    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	    var rst=resultLinks.iterateNext();		
		
		if(nu==0 && parseInt(list[8]) > 100){
		    
			stopsgn = false;	  
		    
		    rst.value = 100;
			
		}else{
			
		    if(parseInt(list[8])+nu>100){
		    	
		    	rst.value = 100 - nu;
		    		
		    	stopsgn = false;
		    	
		    }else{
		    
		    	rst.value = parseInt(list[8]);
		    	
		    	nu += parseInt(list[8]);
		    	
		    }					
			
		}
		
	}
	
	if(parseInt(list[10])>0 && stopsgn && xmlObj.childNodes[i].childNodes[0].childNodes[4].childNodes[0].nodeValue == "yes"){
		
	    var findPattern = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/div/div[6]/div[4]/input';
	    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	    var rst=resultLinks.iterateNext();		
		
		if(nu==0 && parseInt(list[10]) > 100){
		    
			stopsgn = false;	  
		    
		    rst.value = 100;
			
		}else{
			
		    if(parseInt(list[10])+nu>100){
		    	
		    	rst.value = 100 - nu;
		    		
		    	stopsgn = false;
		    	
		    }else{
		    
		    	rst.value = parseInt(list[10]);
		    	
		    	nu += parseInt(list[10]);
		    	
		    }					
			
		}
		
	}	
	
	if(parseInt(list[11])>0 && stopsgn && xmlObj.childNodes[i].childNodes[0].childNodes[5].childNodes[0].nodeValue == "yes"){
		
	    var findPattern = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/div/div[7]/div[4]/input';
	    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	    var rst=resultLinks.iterateNext();		
		
		if(nu==0 && parseInt(list[11]) > 100){
		    
			stopsgn = false;	  
		    
		    rst.value = 100;
			
		}else{
			
		    if(parseInt(list[11])+nu>100){
		    	
		    	rst.value = 100 - nu;
		    		
		    	stopsgn = false;
		    	
		    }else{
		    
		    	rst.value = parseInt(list[11]);
		    	
		    	nu += parseInt(list[11]);
		    	
		    }					
			
		}
		
	}	
	
	if(nu >= 100 || !stopsgn){
		
	    var findPattern = "//*[@id=\"value_attack\"]";
	    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	    var rst=resultLinks.iterateNext();	    
	    
	    rst.value='Attack';

            //both xpath values represent form in which button is.
	    var findPattern = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[4]/div/form";
	    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	    var rst1=resultLinks.iterateNext();   
	    
	    var findPattern = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form";
	    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	    var rst2=resultLinks.iterateNext();  	    
            
	    if(rst1 != null){
	    	
	    	rst1.action = rst1.action + "&stageFarm=3&target="+qs['target'];
	    	
	    	rst1.submit();
	    	
	    }else{
	    	
	    	rst2.action = rst2.action + "&stageFarm=3&target="+qs['target'];
	    	
	    	rst2.submit();
	    	
	    }
	    
	    //rst.submit();
	    
	   //alert("test");
	    
	}else{
	
		var locs = window.location.toString();
		
		var ls = locs.split("/");
		
		var linky = ls[2];		
		//alert("error brate");
		window.location = "http://"+linky+"/game.php?village="+qs['village']+"&s=overview";
		
		window.reload();		
		
	}
	
}

//Third part of attack.
window.performAttackS3 = function(){
	
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");

	var xmlObj=xmlDoc.documentElement;
	
	var i = 0;
	var j = 1;
	
	while(i<xmlObj.childNodes.length){
		
		if(xmlObj.childNodes[i].getAttribute("id")==qs['village']){
			
			while(j<xmlObj.childNodes[i].childNodes.length){

				if(xmlObj.childNodes[i].childNodes[j].getAttribute("id") == qs['target']){

                                    var resultLinks = document.evaluate( "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[3]/td[2]", document, null, XPathResult.ANY_TYPE , null );
                                    var rstUN=resultLinks.iterateNext();
                                    var userName = "";

                                    if(rstUN.innerHTML == ""){

                                        userName = "leave";

                                    }else{

                                        userName = rstUN.innerHTML;

                                    }

                                    if(xmlObj.childNodes[i].childNodes[j].childNodes[0].textContent == "leave"){

                                        if(userName == "leave"){

                                            xmlObj.childNodes[i].childNodes[j].childNodes[2].textContent = "1";
                                            var xmlString = (new XMLSerializer()).serializeToString(xmlObj);
                                            GM_setValue("farmxml", xmlString);
                                            
                                            commitAttack();

                                        }else{

                                            xmlObj.childNodes[i].childNodes[j].childNodes[0].textContent = userName;
                                            xmlObj.childNodes[i].childNodes[j].childNodes[2].textContent = "2";
                                            xmlObj.childNodes[i].childNodes[j].childNodes[3].textContent = "Owner changed";
                                            var xmlString = (new XMLSerializer()).serializeToString(xmlObj);
                                            GM_setValue("farmxml", xmlString);

                                        }

                                    }else if(xmlObj.childNodes[i].childNodes[j].childNodes[0].textContent == userName){

                                        xmlObj.childNodes[i].childNodes[j].childNodes[2].textContent = "1";
                                        var xmlString = (new XMLSerializer()).serializeToString(xmlObj);
                                        GM_setValue("farmxml", xmlString);

                                        commitAttack();

                                    }else{

                                        xmlObj.childNodes[i].childNodes[j].childNodes[0].textContent = userName;
                                        xmlObj.childNodes[i].childNodes[j].childNodes[2].textContent = "2";
                                        xmlObj.childNodes[i].childNodes[j].childNodes[3].textContent = "Owner changed";

                                        var xmlString = (new XMLSerializer()).serializeToString(xmlObj);
                                        GM_setValue("farmxml", xmlString);
                                        
                                    }
					
				}
				
				j++;
				
			}
			
		}
		
		i++;
		
		j = 1;
		
	}
	
}

//Function for commiting third stage attack
window.commitAttack = function(){

    //Checks if all farms have been used.
    checkUsedFarms();

    var findPattern = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[4]/div/form";
    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    var rst1=resultLinks.iterateNext();

    var findPattern = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form";
    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    var rst2=resultLinks.iterateNext();

    if(rst1 != null){

    	rst1.submit();

    }else{

    	rst2.submit();

    }

}

//Function checks if all farms have been used
window.checkUsedFarms = function(){
	
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");
	//GM_setValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>");
	var xmlObj=xmlDoc.documentElement;
	
	var i = 0;
	var j = 1;
	
	//Checks whether it should start farming again.
	var tmpctrl=true;
	
	while(i<xmlObj.childNodes.length){
		
		if(xmlObj.childNodes[i].getAttribute("id")==qs['village']){
			
			while(j<xmlObj.childNodes[i].childNodes.length){

                                //Checks whether it is equal to one or two if there isn't one then restarts to 0.
				if(xmlObj.childNodes[i].childNodes[j].childNodes[2].textContent == "0" ){

					tmpctrl = false;
					
				}
				
				j++;
				
			}
			
		}
		
		i++;
		
		j = 1;
		
	}
	
	i=0;
	j=1;
	
	while(i<xmlObj.childNodes.length && tmpctrl){
		
		if(xmlObj.childNodes[i].getAttribute("id")==qs['village']){
			
			while(j<xmlObj.childNodes[i].childNodes.length){

                            //Checks if it is regular settlement. If it is it will not be restarted to zero.
                            if(xmlObj.childNodes[i].childNodes[j].childNodes[2].textContent == "1"){

				xmlObj.childNodes[i].childNodes[j].childNodes[2].textContent = "0";

                            }

				j++;
				
			}
			
		}
		
		i++;
		
		j = 1;
		
	}	
	
	var xmlString = (new XMLSerializer()).serializeToString(xmlObj);
	
	GM_setValue("farmxml", xmlString);		
	
}

//Checks current location on which user is. To avoid problems with attack panel in the forums.
window.checkLocation = function(){
	
	var locs = window.location.toString();
	
	var ls = locs.split(".");
	
	if(ls[0]=="http://board" || ls[1]=="board"){
		
		return false;
		
	}else{
	
		return true;
		
	}
	
}

//parses name of player owner of village
window.parsePlayer = function(){

        // xpath leads to player box in table in the info village page.
	var findPattern = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[4]/td[2]";
	var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	var rst=resultLinks.iterateNext();	
	
	if(rst.innerHTML != ''){
		
		return rst.innerHTML;
		
	}else{
	
		return 'leave';
		
	}
	
}

// Function for adding farms.
window.addFarm = function(){
	
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");
	//GM_setValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>");
	var xmlObj=xmlDoc.documentElement;
	
	//alert(GM_getValue("farmxml"));
        
	if(xmlObj.textContent.toString() == "nodata"){
	
		xmlObj.textContent = "<?xml version=\"1.0\" ?><farmer><village id=\""+qs['village']+"\"><settings><templar>yes</templar><squire>yes</squire><berseker>yes</berseker><longbow>yes</longbow><crusader>yes</crusader><blackknight>yes</blackknight></settings>";
		
		xmlObj.textContent += "<farm id=\""+qs['id']+"\"><player>"+parsePlayer()+"</player><target>"+qs['id']+"</target><status>0</status><reason></reason></farm></village></farmer>";
		
		GM_setValue("farmxml", xmlObj.textContent);

                alert("Farm added");
		
	}else{
	
		var i = 0;
		var j = 1;
		// temporary variable that checks whether village is already added or not.
		var tmpbool = true;
		
		//temporery variable that will sign if new village node needs to be created.
		var tmpvil = true;
		
		//alert(xmlObj.childNodes[0].childNodes.length);
		while(i<xmlObj.childNodes.length){
			
			if(xmlObj.childNodes[i].getAttribute("id") == qs['village']){
			
				while(j<xmlObj.childNodes[i].childNodes.length){
				
					if(xmlObj.childNodes[i].childNodes[j].getAttribute("id") == qs['id']){
					
						alert("This farm is already attached to this village.");
						
						tmpbool = false;
						
					}
					
					j++;
					
				}
				
				if(tmpbool){

					//alert('yo');
					
					var newfarm=xmlDoc.createElement("farm");

					xmlObj.childNodes[i].appendChild(newfarm);
					
					xmlObj.childNodes[i].childNodes[j].setAttribute('id', qs['id']);
					
					xmlObj.childNodes[i].childNodes[j].appendChild(xmlDoc.createElement('player'));
					xmlObj.childNodes[i].childNodes[j].appendChild(xmlDoc.createElement('target'));
					xmlObj.childNodes[i].childNodes[j].appendChild(xmlDoc.createElement('status'));
					xmlObj.childNodes[i].childNodes[j].appendChild(xmlDoc.createElement('reason'));
					
					xmlObj.childNodes[i].childNodes[j].childNodes[0].textContent = parsePlayer();
					xmlObj.childNodes[i].childNodes[j].childNodes[1].textContent = qs['id'];
					xmlObj.childNodes[i].childNodes[j].childNodes[2].textContent = '0';
					
					var xmlString = (new XMLSerializer()).serializeToString(xmlObj);
					
					alert("Farm added");
					
					GM_setValue("farmxml", xmlString);
					
				}
				
				tmpvil = false;
				
			}
			
			i++;
			
			j = 1;
			
		}
		
	}

	var xmlString = (new XMLSerializer()).serializeToString(xmlObj);
	//alert(xmlString);	
	
}

//Function displays farm in drop down menu

window.displayFarms = function(){
	
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");
	var xmlObj=xmlDoc.documentElement;
	
	var i = 0;
	var j = 1;
	
	var strout = '<table><tr><td>Player:</td><td>Farm:</td><td>Farm ID:</td><td>Status:</td></tr>';

        if(0==xmlObj.childNodes.length){

            alert('no added farms.');

        }
	
	while(i<xmlObj.childNodes.length){
		
		if(xmlObj.childNodes[i].getAttribute('id')==qs['village']){
			
			while(j<xmlObj.childNodes[i].childNodes.length){
				//alert(xmlObj.childNodes[i].childNodes[j].getAttribute('id'));
				strout += '<tr><td>' + xmlObj.childNodes[i].childNodes[j].childNodes[0].textContent + '</td><td><a href="game.php?village='+qs['village']+'&s=info_village&id='+xmlObj.childNodes[i].childNodes[j].getAttribute('id')+'">link</a></td><td>' + xmlObj.childNodes[i].childNodes[j].getAttribute('id') + '</td><td>'+xmlObj.childNodes[i].childNodes[j].childNodes[2].textContent+'</td></tr>';
				//alert('yo');
				
				j++;
				
			}
			
		}
		
		i++;
		
		j=1;
		
	}
	
	strout += '</table>';
	
    var findPattern = '//*[@id="bt"]';
    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    var rst=resultLinks.iterateNext();	
    rst.innerHTML = strout;
		
}

//This is function to open IFS
window.openIFS = function(){

    var findPattern = '//*[@id="bt"]';
    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    var rst=resultLinks.iterateNext();

    var ex = 'IFS stands for <strong>Intelligent Farm Search</strong><br />After you turn it on it will take considerable amount of time to find farms in range.<br />IFS will pick up only abandoned farms. It will add all farms in range even if they are already in farmer. Note that this behaviour might change. <br />Also I strongly suggest you do not interfere with IFS running otherwise she might get angry. But always remember IFS is lady so watch your counts.<br />';

    ex += '<br /><br />Radius: <input id="ifsInput" type="text" /> <input type="button" id="ifsButtonSearch" value="Search..."/>';

    ex += '<br /><br />*Radius represents number of fields how far will IFS search for farms. In essance it will draw circle around your settlement.<br />**Always enter integer.';

    ex += '<br /><br /><strong>Example:</strong> If you enter 80 it will take 24 hours until squires reach that farm.';

    rst.innerHTML = ex;

    // Import xml
    buttonImport = document.evaluate('//*[@id="ifsButtonSearch"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
    buttonImport.addEventListener('click',
        function (event) {

            var con = confirm('IFS as any lady takes time to prepare ;) Confirm if you want to start!');

            if(con){

                //alert('farm babe farm.');
                // /html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/p

                var findPattern = '//*[@id="ifsInput"]';
                var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
                var rst=resultLinks.iterateNext();
                //alert(rst.value);
                GM_setValue('radii', rst.value);

                window.location += '&s=info_village&id=1&ifs=true';

            }

    },true);

}

// This function returns options about units
window.getUnitSettings = function(){

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");
    var xmlObj=xmlDoc.documentElement;       

    //This var is used for generating html code
    var unitoptions = "<tr><td colspan='2'>Use settings below to define which troops will KAF use for farming:</td></tr><tr><td>Unit type:</td><td>Current status:</td><td>Switch status:</td></tr>";

    var i = 0;
    var j = 0;

    while(i<xmlObj.childNodes.length){

            if(xmlObj.childNodes[i].getAttribute('id')==qs['village']){

                while(j < 6){
                    
                    unitoptions += "<tr><td>" + xmlObj.childNodes[i].childNodes[0].childNodes[j].tagName + "</td><td>" + xmlObj.childNodes[i].childNodes[0].childNodes[j].childNodes[0].nodeValue + "</td><td><input id=\"" + xmlObj.childNodes[i].childNodes[0].childNodes[j].tagName + "Button\" type=\"button\" value=\"Change\"/></td></tr>";

                    j++;

                }

            }

            i++;

    }

    unitoptions += "<tr><td colspan=\"2\">*Note current status column will only change after you reload page.</td></tr>";

   return unitoptions;

}
// When this function is called it will insert options or settings.
window.setSettings = function(){

    var findPattern = '//*[@id="bt"]';
    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    var rst=resultLinks.iterateNext();	

    rst.innerHTML = "<table><tr><td>Refresh time (seconds) <input id='refreshInput' type=\"text\" /></td><td><input id='refreshButton' type=\"button\" value=\"submit\"/></td></tr><hr /><tr><td>Remove all farms from farm list: </td><td><input id='removeFarmsButton' type=\"button\" value=\"Remove\"/></td></tr><hr /> " + getUnitSettings() + "<hr /><tr><td>Change attacking settlement:</td><td><input id='changeAttackSettlement' type='button' value='Change'/></td></tr><tr><td colspan='2'>*Note: When you have settlement opened click change and attacking settlement will be changed.</td></tr><hr /><tr><td><textarea id='exportimport' name=\"exportimport\" cols=\"25\" rows=\"5\"></textarea></td><td><input type='button' value='Import' id='importbutton'/><br /><input type='button' value='Export' id='exportbutton'/></td></tr><hr /><br/></table>";

        // Export xml
        buttonExport = document.evaluate("//*[@id=\"exportbutton\"]", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
        buttonExport.addEventListener('click',
            function (event) {

                var rstImportExport = document.evaluate( '//*[@id="exportimport"]', document, null, XPathResult.ANY_TYPE , null );
                var rstIE=rstImportExport.iterateNext();

                rstIE.innerHTML = GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>");

            },true);

        // Import xml
        buttonImport = document.evaluate("//*[@id=\"importbutton\"]", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
        buttonImport.addEventListener('click',
            function (event) {

                var rstImportExport = document.evaluate( '//*[@id="exportimport"]', document, null, XPathResult.ANY_TYPE , null );
                var rstIE=rstImportExport.iterateNext();

                if(rstIE.value == ''){

                    alert("import empty");

                }else{
                    alert(rstIE.value);
                    GM_setValue("farmxml", rstIE.value);
                    alert("Import successful");

                }

            },true);

        // Change attacking settlement
        buttonChangeAttackingSettlement = document.evaluate("//*[@id=\"changeAttackSettlement\"]", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
        buttonChangeAttackingSettlement.addEventListener('click',
            function (event) {

                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");
                var xmlObj=xmlDoc.documentElement;

                // Change village id to settlement selected
                if(xmlObj.childNodes[0].getAttribute('id') == qs['village']){

                    alert('Settlement is already attacking settlement!');

                }else{

                    xmlObj.childNodes[0].setAttribute('id', qs['village']);

                }

                //save xml file back to system.
                GM_setValue("farmxml", (new XMLSerializer()).serializeToString(xmlObj));

            },true);


      var buttonsa = document.evaluate("//*[@id=\"refreshButton\"]", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
      buttonfarma=buttonsa.iterateNext();
      buttonfarma.addEventListener('click',
          function (event) {

    	    var findPattern = '//*[@id="refreshInput"]';
    	    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    	    var rst=resultLinks.iterateNext();	
    	  
    	    if(parseInt(rst.value) >= 5){
    	    
    	       GM_setValue('farmtime', parseInt(rst.value));
    	       
    	       alert("time changed to "+parseInt(rst.value) + " seconds.");
    	       
    	    }else{
    	    
    	    	alert("no can do!");
    	    	
    	    }
              
          },true);

      // Adds button event listener which cleans farm list like initially installed kingsage farmer.
      var buttonscf = document.evaluate('//*[@id="removeFarmsButton"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
      buttonfarm1cf=buttonscf.iterateNext();
      buttonfarm1cf.addEventListener('click',
          function (event) {

            var r = confirm("Are you sure you want to remove all farms?");
            if(r){
                GM_setValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>");
                alert("Farm list empty");
            }

          },true);

        // Switch option for templars.
        buttonfarmtemplar = document.evaluate('//*[@id="templarButton"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
        buttonfarmtemplar.addEventListener('click',
            function (event) {

                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");
                var xmlObj=xmlDoc.documentElement;

                var i = 0;

                while(i<xmlObj.childNodes.length){

                        if(xmlObj.childNodes[i].getAttribute('id')==qs['village']){

                            if(xmlObj.childNodes[i].childNodes[0].childNodes[0].childNodes[0].nodeValue == "yes"){

                                xmlObj.childNodes[i].childNodes[0].childNodes[0].childNodes[0].nodeValue = "no";

                            }else{

                                xmlObj.childNodes[i].childNodes[0].childNodes[0].childNodes[0].nodeValue = "yes";

                            }

                            alert("Templar status switched.");

                        }

                        i++;

                }

                //save xml file back to system.
                GM_setValue("farmxml", (new XMLSerializer()).serializeToString(xmlObj));

            },true);

        // Switch option for squires.
        buttonfarmsquires = document.evaluate('//*[@id="squireButton"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
        buttonfarmsquires.addEventListener('click',
            function (event) {

                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");
                var xmlObj=xmlDoc.documentElement;

                var i = 0;

                while(i<xmlObj.childNodes.length){

                        if(xmlObj.childNodes[i].getAttribute('id')==qs['village']){

                            if(xmlObj.childNodes[i].childNodes[0].childNodes[1].childNodes[0].nodeValue == "yes"){

                                xmlObj.childNodes[i].childNodes[0].childNodes[1].childNodes[0].nodeValue = "no";

                            }else{

                                xmlObj.childNodes[i].childNodes[0].childNodes[1].childNodes[0].nodeValue = "yes";

                            }

                            alert("Squire status switched.");

                        }

                        i++;

                }

                //save xml file back to system.
                GM_setValue("farmxml", (new XMLSerializer()).serializeToString(xmlObj));

            },true);

        // Switch option for berseker.
        buttonfarmberseker = document.evaluate('//*[@id="bersekerButton"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
        buttonfarmberseker.addEventListener('click',
            function (event) {

                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");
                var xmlObj=xmlDoc.documentElement;

                var i = 0;

                while(i<xmlObj.childNodes.length){

                        if(xmlObj.childNodes[i].getAttribute('id')==qs['village']){

                            if(xmlObj.childNodes[i].childNodes[0].childNodes[2].childNodes[0].nodeValue == "yes"){

                                xmlObj.childNodes[i].childNodes[0].childNodes[2].childNodes[0].nodeValue = "no";

                            }else{

                                xmlObj.childNodes[i].childNodes[0].childNodes[2].childNodes[0].nodeValue = "yes";

                            }

                            alert("Berseker status switched.");

                        }

                        i++;

                }

                //save xml file back to system.
                GM_setValue("farmxml", (new XMLSerializer()).serializeToString(xmlObj));

            },true);

        // Switch option for Longbow.
        buttonfarmLongbow = document.evaluate('//*[@id="longbowButton"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
        buttonfarmLongbow.addEventListener('click',
            function (event) {

                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");
                var xmlObj=xmlDoc.documentElement;

                var i = 0;

                while(i<xmlObj.childNodes.length){

                        if(xmlObj.childNodes[i].getAttribute('id')==qs['village']){

                            if(xmlObj.childNodes[i].childNodes[0].childNodes[3].childNodes[0].nodeValue == "yes"){

                                xmlObj.childNodes[i].childNodes[0].childNodes[3].childNodes[0].nodeValue = "no";

                            }else{

                                xmlObj.childNodes[i].childNodes[0].childNodes[3].childNodes[0].nodeValue = "yes";

                            }

                            alert("Longbow status switched.");

                        }

                        i++;

                }

                //save xml file back to system.
                GM_setValue("farmxml", (new XMLSerializer()).serializeToString(xmlObj));

            },true);

        // Switch option for Crusader.
        buttonfarmCrusader = document.evaluate('//*[@id="crusaderButton"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
        buttonfarmCrusader.addEventListener('click',
            function (event) {

                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");
                var xmlObj=xmlDoc.documentElement;

                var i = 0;

                while(i<xmlObj.childNodes.length){

                        if(xmlObj.childNodes[i].getAttribute('id')==qs['village']){

                            if(xmlObj.childNodes[i].childNodes[0].childNodes[4].childNodes[0].nodeValue == "yes"){

                                xmlObj.childNodes[i].childNodes[0].childNodes[4].childNodes[0].nodeValue = "no";

                            }else{

                                xmlObj.childNodes[i].childNodes[0].childNodes[4].childNodes[0].nodeValue = "yes";

                            }

                            alert("Crusader status switched.");

                        }

                        i++;

                }

                //save xml file back to system.
                GM_setValue("farmxml", (new XMLSerializer()).serializeToString(xmlObj));

            },true);

        // Switch option for Blackknight.
        buttonfarmBlackknight = document.evaluate('//*[@id="blackknightButton"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
        buttonfarmBlackknight.addEventListener('click',
            function (event) {

                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");
                var xmlObj=xmlDoc.documentElement;

                var i = 0;

                while(i<xmlObj.childNodes.length){

                        if(xmlObj.childNodes[i].getAttribute('id')==qs['village']){

                            if(xmlObj.childNodes[i].childNodes[0].childNodes[5].childNodes[0].nodeValue == "yes"){

                                xmlObj.childNodes[i].childNodes[0].childNodes[5].childNodes[0].nodeValue = "no";

                            }else{

                                xmlObj.childNodes[i].childNodes[0].childNodes[5].childNodes[0].nodeValue = "yes";

                            }

                            alert("Blackknight status switched.");

                        }

                        i++;

                }

                //save xml file back to system.
                GM_setValue("farmxml", (new XMLSerializer()).serializeToString(xmlObj));

            },true);

}

// Prvi red

// /html/body/div[2]/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td[3]

// /html/body/div[2]/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td

// /html/body/div[2]/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td[14]

//Zadnji red

// /html/body/div[2]/table/tbody/tr[2]/td[2]/div/table/tbody/tr[13]/td[2]

// /html/body/div[2]/table/tbody/tr[2]/td[2]/div/table/tbody/tr[13]/td[15]


//
//
//    END OF FUNCTIONS
//
//

//_       _________ _        _______  _______  _______  _______  _______    _______  _______  _______  _______  _______  _______ 
//| \    /\\__   __/( (    /|(  ____ \(  ____ \(  ___  )(  ____ \(  ____ \  (  ____ \(  ___  )(  ____ )(       )(  ____ \(  ____ )
//|  \  / /   ) (   |  \  ( || (    \/| (    \/| (   ) || (    \/| (    \/  | (    \/| (   ) || (    )|| () () || (    \/| (    )|
//|  (_/ /    | |   |   \ | || |      | (_____ | (___) || |      | (__      | (__    | (___) || (____)|| || || || (__    | (____)|
//|   _ (     | |   | (\ \) || | ____ (_____  )|  ___  || | ____ |  __)     |  __)   |  ___  ||     __)| |(_)| ||  __)   |     __)
//|  ( \ \    | |   | | \   || | \_  )      ) || (   ) || | \_  )| (        | (      | (   ) || (\ (   | |   | || (      | (\ (   
//|  /  \ \___) (___| )  \  || (___) |/\____) || )   ( || (___) || (____/\  | )      | )   ( || ) \ \__| )   ( || (____/\| ) \ \__
//|_/    \/\_______/|/    )_)(_______)\_______)|/     \|(_______)(_______/  |/       |/     \||/   \__/|/     \|(_______/|/   \__/
//                                

/*

 _______  _______           _        _______  _______  _       
(  ___  )(  ____ )|\     /|( \      (  ____ \(  ___  )( \      
| (   ) || (    )|( \   / )| (      | (    \/| (   ) || (      
| (___) || (____)| \ (_) / | |      | (__    | |   | || |      
|  ___  ||     __)  ) _ (  | |      |  __)   | |   | || |      
| (   ) || (\ (    / ( ) \ | |      | (      | |   | || |      
| )   ( || ) \ \__( /   \ )| (____/\| (____/\| (___) || (____/\
|/     \||/   \__/|/     \|(_______/(_______/(_______)(_______/


 _______          _________ _        _______     _        _______ _________
(  ___  )|\     /|\__   __/( (    /|(  ___  )   ( (    /|(  ____ \\__   __/
| (   ) |( \   / )   ) (   |  \  ( || (   ) |   |  \  ( || (    \/   ) (   
| (___) | \ (_) /    | |   |   \ | || |   | |   |   \ | || (__       | |   
|  ___  |  ) _ (     | |   | (\ \) || |   | |   | (\ \) ||  __)      | |   
| (   ) | / ( ) \    | |   | | \   || |   | |   | | \   || (         | |   
| )   ( |( /   \ )___) (___| )  \  || (___) | _ | )  \  || (____/\   | |   
|/     \||/     \|\_______/|/    )_)(_______)(_)|/    )_)(_______/   )_(   
                                                                         
 */

//Current scripts version
var version = 1.05;
//GM_setValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>");
//check for new version
window.checkVersion();	

var qs=new Array();
var loc=location.search;
if (loc){loc=loc.substring(1);
var parms=loc.split('&');
for(var i=0;i<parms.length;i++){
    nameValue=parms[i].split('=');
    qs[nameValue[0]]=unescape(nameValue[1]);
    }
}

//Use this to delete farms.
//GM_setValue('farmxml', '<?xml version=\"1.0\" ?><farmer>nodata</farmer>');
//alert('test');

var spears = '<img height="25px" src="' + "data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRFs7SxRDwvwKp9dlg3xK2AycnES0Q2lJOL5OHYop2VvLmzo6KZnZ2au7u6gV03p5Ruam1q7e3tw8K8ZGNcg4J6rZhydHNrrK6spKSgTE1K28GOs7OsWlxZNSgZ/f79x7mlcnJxqqml6s6X2trVgoSC2cq2Ozw7iYqCQ0VDsJx14uPgzraG49rMi42Ku6V6eGtSqoVWbGtje3x3jX5e6eno1byKlINi2dnZe3pzr66ovsC9mZuRKywrMzQy2sWp0rmIOjMoWlpVZGVh8vLxVFRR3d3aUlNOp62kLUNPU0s7ZVpGzc3K6enl2rV3vKaJk5OR5cqUc2dOnItnHRwa7NWpn3VD4ceSqKisSUpH0r+n0dHN3t7c3sSQoo5rjpGNtrm1wsXBJCMidXlzbmNLy7OTzdHN2L6MfYF9gHx4xsXA0dHQcW5q5ubmxcnHhImFFBQTr7Gs2dfR7/Hsy83G3+DfxsfEnIhrzs7M8vTywcK/TVBMlJuYWUEqNC4k8e/r7O3qXmBab3FxKyolz6x01tfWn6KjgXNXZ11Hn6Sc5eXk4+TiW1A9V1lTy7OE5+jmb3dvMDk9k5mT1NXTX1M/eHdyGRkYCgoJkI+FhXdZV1ZUYVZCIxsQ09bTinZaeHp42t7ZwsXE19jVQD8+vad8MzU3OTk3paenZmlhal9J9PTy9PPv6efmvsHAfW9UUE5MKSYhFxIQGBYT09bVt7e1RkdFSUdJFQ4HR0ZFLi4tSElJ69CY58yVt6J448iTx7CCl4Zl5MmT19nZYGBftqF3UFZXR01Vz7eHv62QmJiWb25vyL+uiIeHdnd30M7JZmVnZm5oW11eZ2dlW1hPVVVZk4+QQERJJjJD3N3cLy8y6+vpMTIxiHlbjG9K6c2cNjc1Ojg5vr61x8zMl4JrIyAduaF3XFdNKCkoJiYmtIlcuL25m3lNICIiwcHFrH9SxMPAHx8eDw8PxcO3W2No9t2w7+/v09PS4cyo99mt293gyMnHqKeiy8vH8PT39/j2trGk7dGZT1x8XQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAdwSURBVHjapNd7WJrnFQBwMApWUbCKF8SoxCBolXglKBSvOLHxxkKI4C1UiJpIUnGJRht1jSbeskUgAZ1VjNEmUesghYiXjHbWNDbDtZtVM5Iuz7SZW6QbWRddZrXELUYgPNv79/d73u97z3nPOR9g7f9YgP8FoTjNrC0YgYWSLbTk8dY/WW3Bzc47k7EICygHmtx+pMp6C+Y0puz8Avfqzcls7rmVKDZ9Cx6OrDlbGiAZU5ml9OBGfXsOAQN96cCsaI8xSQEg7KgZyxonXX18Ji26kfMSpmeEuMtLvk7IZpm0EXVxM6uTk0GL2dtCNaJ7zbP6fEN+JMLk5/oElMNW7BWSiG2YjuuxL0049Ew+zzFuqQUtRztcABThiJEk6R4qfhDF4H6Q0B9hJDECqbLwItdiWS+pjm4E0y8t+qe4MXKuwjK26fRu0C79e1yu3V5lMtloegYCm/xTvqwo0fv3vRRwOrQK79QggLkdZvCwxnMbBeepL9r4V+Q4RdVv0Yjx5XKnluKEz5PQRBzCxMVg4RZCcgtcKEEt5dSJFzLyEmaFeST6csoqEg0MNHmrrAcHervy9jJOMY+1Bg5vhhc3l3KtxW+hoCAELYQOm8SqTGETjPm6a4X9+4TGZsNz5L7e47Oz/kuhJ4IosRkIM/eZU79YITj3enGCu61n4w97k6nFvwp38lSW5AVpb8c0my0GwUMeckGAXTXF8y375PW9ydSgrCOnZUi3XdFSzFI2yiymz9MYPWkBhFgKIBHSGEimrhTynR5Qomc6ayrEbM4rytAEkIRB59q6V8fZ28aCQITSGf0TDZcP6JBTXjxp4xiF1TGklFImeEBxEUyBlLc74Zt6rxVOySuW4ahXFkBWHY3CEBe1h2i107KormuJsbEBBdyK2Mv9LAuqZyBQq/agyCBSRVAUPhz/m9/uSnT5BFPTSLak9K5nKaNCoTgf6l7GbGk4hFxdDRWTqvODLavbLBxNTFK6ul1v0IeXyB2ywK5aj9owuoVFfyxmeXHqtVy+3sn9hv0FwkXKgGt9hKUdQzUugvgSZvR6yM0zRQQ/5Jxz7ZjF7YZcn1AOwMfHAxT+M1FcNUlKq0u3EA8HUi8e98XrT8o8ft5wNFSDQYvlQGuURRg1lhx0Iokff7JQccfpPX8Nukf8xanbICN6O1ZZAZM+P4CP/yBX6n+an1MtJcqlcUn/PGNEb8PpIzGybwGJ+vgyijo8HALTEKU9xLsF7f86ABpDvQKnY2MAhYSuWX1nk4Y56zudcB/N0GJgvjO/PPmX5GbzeBROwuN9n2Q9uX4b+TgcUD1A1N7UitNgU7KAopMnNmuLcTwcXEto+DqvDDAZfdst8UGvXLngsUDkZgF8pqKY+Gc2rWQzGDV/41Euv9PtDNh1MiVKwNAuMOZ0RKQd/+m0z6NzzJ1SuLmds5chJQ5Z13MhApmdSw2DKEXzeErMVHkDQPAl/8K7tGBz3zwBFDcdBjwtvZJmH80tlvYgl3TCWvRNWPkq5EqWOwTHModRcBoy9rB759Er4LMuA1K/ZRGNRiR91aMGlBd6AoTd5kNFBsLUoX6n8jofTWoYoRQJNV85d3/hYSzggo1LOXvUPOaABOL7mlDwsUcQ9TRy0GqsiiiVzin97NJKwHwJywhW0TfHmOERmuedHqVi2qej49QBXuYtVDZPKscU+0sXmgjMfKjhOc5I93+GuFvYPvjzMjGRLGDineOkJLQWHYTe6C0I3LIakuaBxlBCHWwMDSMCJyeNbOJm4Ds6wyAS0VeN5694LPF0ukE5MfmHMk1uZbjdFA3SRJpjZbsk61kSwabNHojcxFa0Z3n5fR+z1jgZyga+TROvH5rJrtUBrQzJaA2qlUDHrPp4arfZY+xueHIHP0oI3cScVopdYpcPO1IS9+16Tuqy6WvD9ObuiecHkR4xwUJtvNVDyIl3px/SHp92uEHlbGJUME1waPVoDuWwH/jfzrpMuolJSqJIwl91kL2VdpcX/N/TTh8X1sBcyt55HwwOWY40OcSNDSrcu46HP9XonpdhQ5w5ONrfEvbeCd1rn59hevJVZaBX8E99MbTNLv08SbppVT+DTcMELgvZZgZekM+VolzY5bYhuOoFHMGOqZT8CKamnO2t55icWvuV3DTu735duWeHYdw2YER/m+M334B+/4mGm9LTzzE18eqQ8ri5oao9b/4UKCFvYlbYQ8e/pr6dWim87HcoWsk2OrEjIkUJHvcXRR/90fuNf+zzopINeDR7yHF/6sGDP6lsE5HOO7vmS6yNTOxYUdxdkrAK+BG1LvWNH+/zyuBsYBWWtn9/qveb2Eov0DhI9JVYIO8zEi3owo2loUvNgdS2yla47Xf7PgxjreOxqh2On37mne3oVWWNImdKRENCqMrYL01fmNWt9c4Pqqrc8antd3s+HFnH45WOH3vvhv7Zawi70cxY2PERo2mCUqEMBXbIK+be7t1/vxe2jjMb9xz8DH7PSzdOt+ivajRS1BbzC++3/5C5jsmZdRtrHo5Ys2xxoPMbIJO89r0AAwD/w1lAytnoUgAAAABJRU5ErkJggg==" + '" />';

if(checkLocation()){
    
//Addes top panel
    lp = document.createElement("div");
    lp.setAttribute("id", "toppanel");
    var body = document.getElementsByTagName("body");
    body[0].appendChild(lp);
    
  //Add the style to the panel and put the code into it
    GM_addStyle("#toppanel { width:400px; position: fixed; left: 0px; height:500px; top:-500px; z-index: 50; background: white; overflow:scroll;}");
    GM_addStyle("#toppanel:hover { showPanel();}");  
    
    var lpHTML = "Welcome to Kingsage Farmer (KAF).<br /> If you would like to help and make it better, <a href=\"http://axino.net\" target='_blank'>join discussion</a>.<br/><br/>Kingsage Farmer is running: <span id='farmbabe'>"+ GM_getValue('farmbabe',false) +"</span><br />Farming will begin after you reload page.<br /><br />";
    lpHTML += '<input id="farms" type="button" value="farms"/><input id="onhold" type="button" value="on hold"/><input id="ifsButton" type="button" value="IFS"/><input id="settings" type="button" value="settings"><input id="play" type="button" value="Play"><input id="stop" type="button" value="Stop"><br/><br/><div id="bt"></div>';
    
    document.getElementById("toppanel").innerHTML = lpHTML;  
    
  //Adding another panel for opening or closing previous one
      lp = document.createElement("div");
      lp.setAttribute("id", "opentoppanel");
      var body = document.getElementsByTagName("body");
      body[0].appendChild(lp);     

      //Add the style to the panel and put the code into it
      GM_addStyle("#opentoppanel { width:30px; position: fixed; left: 0px; height:30px; top:0px; z-index: 50; background: transparent;}");
      GM_addStyle("#opentoppanel:hover { showPanel();}");

      var lpHTML = "<a href=\"#\">" + spears + "</a>";
      document.getElementById("opentoppanel").innerHTML = lpHTML;   
      //alert('test');
      var imagexpath ='/html/body/div[5]/a';
      var buttons0 = document.evaluate(imagexpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
      imgsp=buttons0.iterateNext()
      imgsp.addEventListener('click',
          function (event) {

      		showPanel();
              
          },true);
      
      var buttonsfarms = document.evaluate('//*[@id="farms"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
      buttonfarmds=buttonsfarms.iterateNext();
      buttonfarmds.addEventListener('click',
          function (event) {

    	       displayFarms();
              
          },true);  

      var buttonsplay = document.evaluate('//*[@id="play"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
      buttonfarm0=buttonsplay.iterateNext();
      buttonfarm0.addEventListener('click',
          function (event) {

    	       GM_setValue('farmbabe', true);
                var resultLinks = document.evaluate( '//*[@id="farmbabe"]', document, null, XPathResult.ANY_TYPE , null );
                var rst=resultLinks.iterateNext();
                rst.innerHTML = 'true';
               
              
          },true);   
      
      var buttonsstop = document.evaluate('//*[@id="stop"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
      buttonfarm1=buttonsstop.iterateNext();
      buttonfarm1.addEventListener('click',
          function (event) {

    	       GM_setValue('farmbabe', false);

                var resultLinks = document.evaluate( '//*[@id="farmbabe"]', document, null, XPathResult.ANY_TYPE , null );
                var rst=resultLinks.iterateNext();
                rst.innerHTML = 'false';
              
          },true);    

      var buttonssettings = document.evaluate('//*[@id="settings"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
      buttonfarmset=buttonssettings.iterateNext();
      buttonfarmset.addEventListener('click',
          function (event) {

               setSettings();
    	    
          },true);       
      
      //For IFS
      var buttonssettings = document.evaluate('//*[@id="ifsButton"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
      buttonfarmset=buttonssettings.iterateNext();
      buttonfarmset.addEventListener('click',
          function (event) {

               openIFS();

          },true);

      //Open or closes panel depending on the last choice
      prePanel();
      
}

//Detects if in info village if so then adds button for adding village as farm.
if(qs['s']=="info_village"){
	
    var findPattern = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr/th";
    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    var rst=resultLinks.iterateNext();	

    rst.innerHTML = rst.innerHTML + '<input id="addfarm" type="button" value="Add as farm">';
    
    var buttonxpathaf = '//*[@id="addfarm"]';
    var buttonsaf = document.evaluate(buttonxpathaf, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    buttonafr=buttonsaf.iterateNext();
    buttonafr.addEventListener('click',
        function (event) {
            
    		addFarm();

        },true); 
	
}

if(qs['ifs'] === undefined){


}else{

    if(qs['ifs'] == "true"){

        //alert(GM_getValue('radii'));

        var findPattern = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/p';
        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
        var rst=resultLinks.iterateNext();

        if(rst == null){

            var findPattern = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[2]/td[2]/a';
            var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
            var rsat=resultLinks.iterateNext();

            var findPattern = '//*[@id="settlement"]';
            var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
            var rsata=resultLinks.iterateNext();

            tm = rsata.innerHTML.toString().split('|');

            tmp = rsat.innerHTML.toString().split('|');

            r = Math.sqrt(Math.pow(tm[0] - tmp[0], 2)+Math.pow(tm[1] - tmp[1],2));

            if(parsePlayer() == 'leave' && r <= parseFloat(GM_getValue('radii', 100))){

                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(GM_getValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>"), "application/xml");
                //GM_setValue("farmxml", "<?xml version=\"1.0\" ?><farmer>nodata</farmer>");
                var xmlObj=xmlDoc.documentElement;

                //alert(GM_getValue("farmxml"));

                if(xmlObj.textContent.toString() == "nodata"){

                        xmlObj.textContent = "<?xml version=\"1.0\" ?><farmer><village id=\""+qs['village']+"\"><settings><templar>yes</templar><squire>yes</squire><berseker>yes</berseker><longbow>yes</longbow><crusader>yes</crusader><blackknight>yes</blackknight></settings>";

                        xmlObj.textContent += "<farm id=\""+qs['id']+"\"><player>"+parsePlayer()+"</player><target>"+qs['id']+"</target><status>0</status><reason></reason></farm></village></farmer>";

                        GM_setValue("farmxml", xmlObj.textContent);

                }else{

                        var i = 0;
                        var j = 1;
                        // temporary variable that checks whether village is already added or not.
                        var tmpbool = true;

                        //temporery variable that will sign if new village node needs to be created.
                        var tmpvil = true;

                        //alert(xmlObj.childNodes[0].childNodes.length);
                        while(i<xmlObj.childNodes.length){

                                if(xmlObj.childNodes[i].getAttribute("id") == qs['village']){

                                        while(j<xmlObj.childNodes[i].childNodes.length){

                                                if(xmlObj.childNodes[i].childNodes[j].getAttribute("id") == qs['id']){

                                                        tmpbool = false;

                                                }

                                                j++;

                                        }

                                        if(tmpbool){

                                                //alert('yo');

                                                var newfarm=xmlDoc.createElement("farm");

                                                xmlObj.childNodes[i].appendChild(newfarm);

                                                xmlObj.childNodes[i].childNodes[j].setAttribute('id', qs['id']);

                                                xmlObj.childNodes[i].childNodes[j].appendChild(xmlDoc.createElement('player'));
                                                xmlObj.childNodes[i].childNodes[j].appendChild(xmlDoc.createElement('target'));
                                                xmlObj.childNodes[i].childNodes[j].appendChild(xmlDoc.createElement('status'));
                                                xmlObj.childNodes[i].childNodes[j].appendChild(xmlDoc.createElement('reason'));

                                                xmlObj.childNodes[i].childNodes[j].childNodes[0].textContent = parsePlayer();
                                                xmlObj.childNodes[i].childNodes[j].childNodes[1].textContent = qs['id'];
                                                xmlObj.childNodes[i].childNodes[j].childNodes[2].textContent = '0';

                                                var xmlString = (new XMLSerializer()).serializeToString(xmlObj);

                                                GM_setValue("farmxml", xmlString);

                                        }

                                        tmpvil = false;

                                }

                                i++;

                                j = 1;

                        }

                }

            }

            var s = window.location.toString();
            var b = s.split('?');
            s = b[0];
            s += '?village=' + qs['village'] + '&s=info_village' + '&id=' + (parseInt(qs['id']) + 1) + '&ifs=true';
//html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[2]/td[2]/a
            window.location = s;
            window.reload();

        }else{

            if(rst.innerHTML.toString() == 'This settlement doesn\'t exist.'){

                alert('lol');

            }

        }

    }

}

//detects stage of auto-attack

if(qs['stageFarm'] === undefined){

	//Checks whether attack should be performed.
	if(GM_getValue('farmbabe', false)){
	    	
	  window.setTimeout(timeChange, parseInt(GM_getValue("farmtime", "30"))*1000);

	}  	
	
}else{
	
	if(qs['stageFarm'] == "2"){
	
		performAttackS2();
		
	}else if(qs['stageFarm'] == "3"){
	
		performAttackS3();
		
	}
	
}

/* BEGIN SAVED VARIABLES

    farmtime - time which takes to reload page.
    farmxml - xml document in which farms are saved.
        0 - units should be sent
        1 - units sent waiting for new pass
        2 - on hold due changed owner
    kaf - time when last checked for new version on userscripts.org
    radii - radius for IFS performing testing.

// URL VARIABLES

    stageFarm - provides infor for stage of attack.
    ifs - whether IFS is working

// END SAVED VARIABLES */