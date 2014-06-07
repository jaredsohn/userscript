// ==UserScript==
// @name           stationresources
// @namespace      www.catsonboats.org
// @description    shows whats what
// @include        *war-facts.com/viewstations.php?*
// ==/UserScript==

		// some ajax bullshit

	function load(url, callback) {   
        var xhr;   
           
        if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();   
        else {   
            var versions = ["MSXML2.XmlHttp.5.0",    
                            "MSXML2.XmlHttp.4.0",   
                            "MSXML2.XmlHttp.3.0",    
                            "MSXML2.XmlHttp.2.0",   
                            "Microsoft.XmlHttp"]   
  
             for(var i = 0, len = versions.length; i < len; i++) {   
                try {   
                    xhr = new ActiveXObject(versions[i]);   
                    break;   
                }   
                catch(e){}   
             } // end for   
        }   
           
        xhr.onreadystatechange = ensureReadiness;   
           
        function ensureReadiness() {   
            if(xhr.readyState < 4) {   
                return;   
            }   
               
            if(xhr.status !== 200) {   
                return;   
            }   
  
            // all is well     
            if(xhr.readyState === 4) {   
                callback(xhr);   
            }              
        }   
           
        xhr.open('GET', url, true);   
        xhr.send('');   
    }   
	
	// end ajax bullshit
	http://www.war-facts.com/viewstations.php?ship=55751&colony=44&snum=2&inptiron=566&inptcopper=280&inptsilver=40&inpttitanium=142&inptgold=40&inpturanium=60&inptwater=424
	var geturl= document.location.href;
	var neediron = geturl.indexOf("inptiron=");
	var ire = geturl.indexOf("&", neediron);
	var ironreq = Number(geturl.substring(neediron+9, ire));
	
		var geturl= document.location.href;
	var neediron = geturl.indexOf("inptcopper=");
	var ire = geturl.indexOf("&", neediron);
	var copperreq = Number(geturl.substring(neediron+11, ire));
	
	
		var geturl= document.location.href;
	var neediron = geturl.indexOf("inptsilver=");
	var ire = geturl.indexOf("&", neediron);
	var silverreq = Number(geturl.substring(neediron+11, ire));
	
		var geturl= document.location.href;
	var neediron = geturl.indexOf("inpttitanium=");
	var ire = geturl.indexOf("&", neediron);
	var titaniumreq = Number(geturl.substring(neediron+13, ire));
	
		var geturl= document.location.href;
	var neediron = geturl.indexOf("inptgold=");
	var ire = geturl.indexOf("&", neediron);
	var goldreq = Number(geturl.substring(neediron+9, ire));
	
		var geturl= document.location.href;
	var neediron = geturl.indexOf("inpturanium=");
	var ire = geturl.indexOf("&", neediron);
	var uraniumreq = Number(geturl.substring(neediron+12, ire));
	
		var geturl= document.location.href;
	var neediron = geturl.indexOf("inptplatinum=");
	var ire = geturl.indexOf("&", neediron);
	var platinumreq = Number(geturl.substring(neediron+13, ire));
	
		var geturl= document.location.href;
	var neediron = geturl.indexOf("inptdiamonds=");
	var ire = geturl.indexOf("&", neediron);
	var diamondsreq = Number(geturl.substring(neediron+12, ire));
	
		var geturl= document.location.href;
	var neediron = geturl.indexOf("inptoil=");
	var ire = geturl.indexOf("&", neediron);
	var oilreq = Number(geturl.substring(neediron+8, ire));
	
		var geturl= document.location.href;
	var neediron = geturl.indexOf("inptwater=");
	var waterreq = Number(geturl.substring(neediron+10));
	
	
	
	var newhtml;		
	var snapItem = 1;

	var rows = document.evaluate("/html/body/div/div/center/table/tbody/tr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var stations = document.evaluate("/html/body/div/div/center/table/tbody/tr/td/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var newrows = new Array();
	for (i=0 ; i < stations.snapshotLength; i++ )
	{
			var newRes = new Array();
			var resAm = new Array();
			var stationurl = stations.snapshotItem(i).href;
			if(stationurl.indexOf("worldtrade") != -1){
				load(stationurl, 
					 function(xhr){
						 var bottom = document.evaluate("/html/body/div/div/center", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
						bottom.innerHTML += "<div style=\"display: none\" id=\"datadump\"></div>";
						document.getElementById('datadump').innerHTML = xhr.responseText;
						
						resources = document.evaluate("/html/body/div/div/center/div/div/div/center/form/table/tbody/tr", document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
						for(i2 =0; i2 < resources.snapshotLength; i2++){
							var rescheck = resources.snapshotItem(i2).innerHTML.indexOf("Resource");
							var rescheck2 = resources.snapshotItem(i2).innerHTML.indexOf("Storage");
							if(rescheck == -1 && rescheck2 == -1){
								var reshtm = resources.snapshotItem(i2).innerHTML;
								var rest = (reshtm.indexOf("head")+6);
								var rese = reshtm.indexOf("</td>", rest);
								var res = reshtm.substring(rest, rese);
								newRes[newRes.length] = res;
								var resnums = (reshtm.indexOf("right")+7);
								var resnume = reshtm.indexOf("</td>", resnums);
								var resnum = reshtm.substring(resnums, resnume);
								resnum = resnum.replace(/,/g, "");
								resAm[resAm.length] = resnum;
							}
						}
						
			//alert(newRes.length);
			var end1 = rows.snapshotItem(snapItem).innerHTML.indexOf("</td>")+5;
			//alert(end1);
			var end2 = rows.snapshotItem(snapItem).innerHTML.indexOf("</td>", end1)+5;
			//alert(end2);
			var stationstarts = rows.snapshotItem(snapItem).innerHTML.substring(0, end2);
			newhtml = stationstarts;
			newhtml = newhtml+"<td colspan=\"2\">";
			newhtml = newhtml+"<div class=\"resam\" id=\"resam"+snapItem+"\">Hover over a resource</div>";
			for(u = 0; u< newRes.length;u++){
				if(newRes[u] == "Iron"){
					if(resAm[u] > 0){
					newhtml += "<img";
					if(resAm[u] >= ironreq){
						newhtml += " style=\"background-color: green;\"";
					}
					else if(ironreq > 0){
						newhtml +=" style=\"background-color: red;\"";
					}
					newhtml += " src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+".png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
					else{
					newhtml += "<img id=\""+newRes[u]+"\" src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+"2.png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
				}
				
				
				else if(newRes[u] == "Copper"){
				if(resAm[u] > 0){
					//alert(resAm[u]+" : "+copperreq);
					newhtml += "<img";
					if(resAm[u] >= copperreq){
						newhtml += " style=\"background-color: green;\"";
					}
					else if(copperreq > 0){
						newhtml +=" style=\"background-color: red;\"";
					}
					newhtml += " src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+".png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
					else{
					newhtml += "<img id=\""+newRes[u]+"\" src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+"2.png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
				}
				
				
				else if(newRes[u] == "Silver"){
					if(resAm[u] > 0){
					newhtml += "<img";
					if(resAm[u] >= silverreq){
						newhtml += " style=\"background-color: green;\"";
					}
					else if(silverreq > 0){
						newhtml +=" style=\"background-color: red;\"";
					}
					newhtml += " src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+".png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
					else{
					newhtml += "<img id=\""+newRes[u]+"\" src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+"2.png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
				}
				
				
				else if(newRes[u] == "Titanium"){
					if(resAm[u] > 0){
					newhtml += "<img";
					if(resAm[u] >= titaniumreq){
						newhtml += " style=\"background-color: green;\"";
					}
					else if(titaniumreq > 0){
						newhtml +=" style=\"background-color: red;\"";
					}
					newhtml += " src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+".png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
					else{
					newhtml += "<img id=\""+newRes[u]+"\" src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+"2.png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
				}
				
				
				else if(newRes[u] == "Gold"){
					if(resAm[u] > 0){
					newhtml += "<img";
						if(resAm[u] >= goldreq){
							newhtml += " style=\"background-color: green;\"";
						}
						else if(goldreq > 0){
							newhtml +=" style=\"background-color: red;\"";
						}
					newhtml += " src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+".png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
					else{
					newhtml += "<img id=\""+newRes[u]+"\" src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+"2.png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
				}
				
				
				else if(newRes[u] == "Uranium"){
					if(resAm[u] > 0){
					newhtml += "<img";
					if(resAm[u] >= uraniumreq){
						newhtml += " style=\"background-color: green;\"";
					}
						else if(uraniumreq > 0){
							newhtml +=" style=\"background-color: red;\"";
						}
					newhtml += " src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+".png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
					else{
					newhtml += "<img id=\""+newRes[u]+"\" src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+"2.png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
				}
				
				
				else if(newRes[u] == "Platinum"){
					if(resAm[u] > 0){
					newhtml += "<img";
					if(resAm[u] >= platinumreq){
						newhtml += " style=\"background-color: green;\"";
					}
						else if(platinumreq > 0){
							newhtml +=" style=\"background-color: red;\"";
						}
					newhtml += " src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+".png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
					else{
					newhtml += "<img id=\""+newRes[u]+"\" src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+"2.png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
				}
				
				
				else if(newRes[u] == "Diamonds"){
					if(resAm[u] > 0){
					newhtml += "<img";
					if(resAm[u] >= diamondsreq){
						newhtml += " style=\"background-color: green;\"";
					}
						else if(diamondsreq > 0){
							newhtml +=" style=\"background-color: red;\"";
						}
					newhtml += " src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+".png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
					else{
					newhtml += "<img id=\""+newRes[u]+"\" src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+"2.png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
				}
				
				
				else if(newRes[u] == "Oil"){
					if(resAm[u] > 0){
					newhtml += "<img";
					if(resAm[u] >= oilreq){
						newhtml += " style=\"background-color: green;\"";
					}
						else if(oilreq > 0){
							newhtml +=" style=\"background-color: red;\"";
						}
					newhtml += " src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+".png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
					else{
					newhtml += "<img id=\""+newRes[u]+"\" src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+"2.png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
				}
				
				
				else if(newRes[u] == "Water"){
					if(resAm[u] > 0){
					newhtml += "<img";
					if(resAm[u] >= waterreq){
						newhtml += " style=\"background-color: green;\"";
					}
						else if(waterreq > 0){
							newhtml +=" style=\"background-color: red;\"";
						}
					newhtml += " src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+".png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
					else{
					newhtml += "<img id=\""+newRes[u]+"\" src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+"2.png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
				}
				
				
				else if(newRes[u] == "Food"){
					if(resAm[u] > 0){
					newhtml += "<img";
					newhtml += " src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+".png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
					else{
					newhtml += "<img id=\""+newRes[u]+"\" src='http://www.kickitsfaceoff.com/hosting/images/Duncecap/"+newRes[u]+"2.png' title='"+newRes[u]+":"+resAm[u]+"' alt='"+newRes[u]+":"+resAm[u]+"\"' desc="+newRes[u]+":"+resAm[u]+"' onmouseover=\"document.getElementById('resam"+snapItem+"').innerHTML = '"+newRes[u]+" - "+resAm[u]+"'\" />";
					}
				}
				
			}
			var reshtml;
			//newhtml += reshtml;
			newhtml = newhtml+"</td>";
			newrows[newrows.length] = newhtml;
			var newrow = document.evaluate("/html/body/div/div/center/table/tbody/tr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			newrow.snapshotItem(snapItem).innerHTML = newhtml;
			snapItem ++;
			newhtml = "";
			resAm = [];
			newRes = [];
					});
			
			}
		
	}
	

	var style = document.createElement("style");
	style.appendChild(document.createTextNode("@import url( http://metacynic.com/wf/station.css );"));
	document.getElementsByTagName( "body" ).item(0).appendChild( style );


