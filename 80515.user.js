// ==UserScript==
// @name           WHMGApps
// @namespace      mweir.mattweir.com
// @description    Intended for hosting resellers and other people who use WHM often; this fills out the WHM "Edit DNS Zone" form with the CNAME and MX records required to use Google Apps.  It also removes any existing records that might conflict.  Requires WHM 11.25
// @include        http://*:2086/*
// @include        https://*:2087/*
// ==/UserScript==

document.addEventListener("load", function(){
        document = unsafeWindow.frames ? unsafeWindow.frames[2].document : document;
	if(document.title.match(/Edit DNS Zone/) && (document.forms[0].id.match(/zoneform/))){
		//obtain the domain name by looking at line 2 in the zone, which should contain 
		//the comment "; Zone file for domain.com" by default  
		var domainRegEx = /[a-z0-9][a-z0-9\-]+[a-z0-9](\.[a-z0-9][a-z0-9\-]+[a-z0-9])*(\.[a-z]+)+/i;
		var comment = document.forms[0].elements.namedItem("line-2-1").value;
		var matches = domainRegEx.exec(comment);
		var domain = matches[0];
		
		//Get the base URL for the API request
		var https = /^https/.test(document.URL) ? true : false;
		var baseURL = https ? 'https://' + document.domain + ':2087' : 'http://' + document.domain + ':2086';
		
		//create and insert the button
		var button = document.createElement("a");
		button.setAttribute("id", "gapps");
		var text = "Add Google Apps to " + domain ; 
		button.appendChild(document.createTextNode(text));
		document.forms[0].insertBefore(button, document.forms[0].childNodes[0]);

		//Add the gapps functions to run when the link is clicked
		document.getElementById('gapps').addEventListener('click', function(){
		        var zonedump = null;
			GM_xmlhttpRequest({
			  method: "GET",
			  url: baseURL + '/json-api/dumpzone?domain=' + domain,
			  onload: function(response){
			  	//Just in case.  :)
			  	if(!confirm("Are you sure you want to add Google Apps DNS records to " + domain + "?  " +
			  		    "This script will remove existing DNS records with the same name as Google's " + 
			  		    "records.")){
			  		return false;
			  	}
			  	//The onload function here is the workhorse of the script; it will use the contents
			  	//of the zone file on the server to modify the form on the page, automatically removing
			  	//existing records that share names with the Google records to be added, then adding
			  	//the Google replacements in the new record fields at the bottom of the page. Since WHM 
			  	//only includes 5 such fields, it will also generate 5 new fields.
			  	var zonedump = JSON.parse(response.responseText);
			  	if(zonedump.result.status == 0){ 
			  		//a 0 status indicates a failure to retreive the zone data
			  		alert('Error retrieving zone data!  This could indicate a problem with the zone file. Error message is: ' + zonedump.result.statusmsg);
			  	}
			  	else{
			  		//If the result is successful, check current zone records and remove existing
			  		//MX records, along with any mail, calendar, docs, start, and sites records.
			  		var zone = zonedump.result[0].record;
			  		var theForm = document.getElementById('zoneform');
					//The actual zone file format has the SOA record across 6 lines; however, the 
					//Edit DNS Zone page has that all structured as one line in the form structure;
					//thus, the post-SOA records are 5 off from their actual DNS zone line numbers.  
					//Kinda wish that had been mentioned in the API docs. Also, if the close paren
					//for the SOA record is located on a different line from the MinTTL, the offset 
					//increases again, since that one line will be counted as part of the SOA. 
					//However, the line also appears as a raw data line, so at least it can be tested
					//for.  The offset var is meant to account for that; subtracting it from the 
					//line number that shows in the API results gives the actual line number in the form.
					var offset = 6;
					for(var line in zone){
						if(zone[line].Line == 10 && zone[line].type == ":RAW"){
							offset = 5;
						}
					}
			  		for(var line in zone){
			  			if(zone[line].type == 'MX' && zone[line].name == domain + '.'){ 
			  				var linenumber = zone[line].Line - offset;
			  				theForm.elements['line-' + linenumber + '-1'].value="";
			  				theForm.elements['line-' + linenumber + '-2'].value="";
			  				theForm.elements['line-' + linenumber + '-5'].value="";
			  				theForm.elements['line-' + linenumber + '-6'].value="";
			  			}
			  			if(zone[line].name == 'mail.' + domain + '.' ||
			  			   zone[line].name == 'calendar.' + domain + '.' ||
			  			   zone[line].name == 'docs.' + domain + '.' ||
			  			   zone[line].name == 'start.' + domain + '.' ||
			  			   zone[line].name == 'sites.' + domain + '.' ){
			  			   	//This part assumes that the existing record is an A record or CNAME record,
			  			   	//since those are the most common types of records with these names.
			  			   	//Additional changes might be needed if it's not one of those types.
			  				var linenumber = zone[line].Line - offset;
			  				theForm.elements['line-' + linenumber + '-1'].value="";
			  				theForm.elements['line-' + linenumber + '-2'].value="";
			  				theForm.elements['line-' + linenumber + '-5'].value="";			  							  				
			  			}
			  		}
			  		//Now that the existing records have been removed, we add the new Google equivalents.
			  		//WHM adds an additional, hidden line input to the form under the last record, and 5
			  		//new record fields; when taking the SOA record line differences in to account, this 
			  		//means that the last 'current' form field ID is exactly the number of lines returned 
			  		//by the API call.
			  		var lastField = zonedump.result[0].record.length;
			  		var theTable = theForm.getElementsByTagName('tbody')[0];
			  		var hostArray = new Array('mail', 'docs', 'start', 'calendar', 'sites');
			  		var mxArray = new Array(new Array(1, 'aspmx.l.google.com.'),
			  					new Array(5, 'alt1.aspmx.l.google.com.'),
			  					new Array(5, 'alt2.aspmx.l.google.com.'),
			  					new Array(10, 'aspmx2.googlemail.com.'),
			  					new Array(10, 'aspmx3.googlemail.com.'));
			  		//Create the new fields; we'll set these to CNAMEs with value of ghs.google.com
			  		//On each iteration, we shift an entry off the hostArray to finish the CNAME
			  		for(var i = lastField + 7; i <= lastField + 11; i++){
			  			var newField = document.createElement('tr');
			  			newField.setAttribute('id', 'new'+i);
			  			theTable.appendChild(newField);
			  			newField.innerHTML = '<td><input name="line-' + i + '-1" size="30" type="text"></td><td><input name="line-' + i + '-2" size="6" value="14400" type="text"></td><td><input name="line-' + i + '-3" value="IN" type="hidden"><pre>IN</pre></td><td><select name="line-' + i + '-4" onchange="setfields(this.name,this.value);"><option value="">Select</option><option value="A">A</option><option value="A6">A6</option><option value="AAAA">AAAA</option><option value="AFSDB">AFSDB</option><option value="CNAME" selected="selected">CNAME</option><option value="DNAME">DNAME</option><option value="DS">DS</option><option value="HINFO">HINFO</option><option value="LOC">LOC</option><option value="MX">MX</option><option value="NAPTR">NAPTR</option><option value="NS">NS</option><option value="PTR">PTR</option><option value="RP">RP</option><option value="SRV">SRV</option><option value="TXT">TXT</option></select></td><td colspan="2"><input value="ghs.google.com." size="9" name="line-' + i + '-5"></td>';
			  			theForm.elements['line-' + i + '-1'].value = hostArray.shift();
			  		}
			  		//Now we'll set the type on the original fields to MX and trigger WHM's built-in event handler
			  		//to create the MX fields.  Finally, we shift a new entry off of mxArray and enter the values
			  		for(var i = lastField +2; i<= lastField + 6; i++){
			  			theForm.elements['line-' + i + '-1'].value = domain + '.';
			  			theForm.elements['line-' + i + '-4'].options[10].setAttribute('selected','selected');
			  			var e = document.createEvent('HTMLEvents');
			  			e.initEvent('change', true, false);
			  			theForm.elements['line-' + i + '-4'].dispatchEvent(e);
			  			var newMX = mxArray.shift();
			  			theForm.elements['line-' + i + '-5'].value = newMX[0];
			  			theForm.elements['line-' + i + '-6'].value = newMX[1];
			  		}
			  		//And, as the very last step, we make sure to select the Remote Mail Exchanger option
			  		document.getElementById('mxcheck_remote').checked = true;
			  	}
			  }
			  
			});
			return false;
		}, false);
	}
}, true);