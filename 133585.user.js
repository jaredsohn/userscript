// ==UserScript==
// @name			kwik-e-part_digikey
// @namespace		digidescorp.com
// @description		Kwik-e-Part Supplier Script (Digikey)
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js
// @require			http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js
// @include       http://*.digikey.*/product-detail/*
// ==/UserScript==

var Oracle_IP = "10.10.7.68";

unsafeWindow.showjQueryDialog = function() {
        $(dialogContent).dialog("open");
	   //alert('HELLO!');
  } 

  

			//alert('Part Detail Page Found');
			var div_content = document.getElementById('content');
			var top_table = div_content.childNodes[5].childNodes[0].childNodes[7].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
			var bottom_table = div_content.childNodes[5].childNodes[0].childNodes[11].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1];
			var bottom_table_trs = bottom_table.getElementsByTagName('tr');
			
			var mounting_type;
			var operating_temp;
			var package_case;
			var category;
			var real_cat;
			var family;
			
			for(i=0;i<bottom_table_trs.length;i++)
			{
				switch(bottom_table_trs[i].childNodes[0].textContent)
				{
					case 'Mounting Type':
					mounting_type = bottom_table_trs[i].childNodes[1].textContent;
					break;
					case 'Operating Temperature':
					operating_temp = bottom_table_trs[i].childNodes[1].textContent;
					break;
					case 'Package / Case':
					package_case = bottom_table_trs[i].childNodes[1].textContent;
					break;
					case 'Category':
					category = bottom_table_trs[i].childNodes[1].textContent;
					break;
					case 'Family':
					family = bottom_table_trs[i].childNodes[1].textContent;
					break;
					
				}
			}

//			USE THIS FOR PRICE SCRAPING
//			var top_table_trs = top_table.getElementsByTagName('tr');
	
			digikey_part_no = top_table.childNodes[1].childNodes[2].childNodes[1].innerHTML;
			manufacturer = top_table.childNodes[1].childNodes[6].childNodes[1].childNodes[0].textContent;
			//5/17/2012 - Digikey now uses a hyperlink in the MFG field. Need to strip out <a> tags
			mfg_part_no = top_table.childNodes[1].childNodes[8].childNodes[1].textContent;
			description = top_table.childNodes[1].childNodes[10].childNodes[1].innerHTML;
			rohs_status = top_table.childNodes[1].childNodes[12].childNodes[1].innerHTML;
				
			var menu = '<img src="http://www.mazdateam.net/images/57-download.png">&nbsp;<a style="font-family:Arial;font-weight:bold; color: #000000; text-decoration: None;" href="#" onclick="showjQueryDialog();" >Add this part to the DDC Database</a>';
			
			if (menu != '')
			{
				menuobj = document.createElement('div');
				menuobj.style.position = 'absolute';
				menuobj.style.borderRadius = '25px';
				menuobj.style.boxShadow = '7px 7px 8px #818181';
				menuobj.style.top = '130px';
				menuobj.style.left = '500px';
				menuobj.style.padding = '20px';
				menuobj.style.backgroundColor = '#eeeeee';
				menuobj.style.height = '3em';
				menuobj.style.width = '275px';
				menuobj.style.padding = '1em 0 1em 0';
				menuobj.style.textAlign = 'center';
				menuobj.innerHTML = menu;
				body = document.getElementsByTagName('form')[0];
				body.appendChild(menuobj);
			}
			
			dialogContent = document.createElement('div');
			dialogContent.id = 'example';
			dialogContent.class = 'flora';
			dialogContent.title = 'Add Part to DB?';
			dialogContent.innerHTML = 'Verify accuracy of information before submitting:<br><br>Digi-key Part No: ' + 
			digikey_part_no + '<br>Manufacturer: ' +
			manufacturer + '<br>MFG Part No: ' +
			mfg_part_no + '<br>Description: ' +
			description + '<br>ROHS Status: ' +
			rohs_status + '<br>Mounting Type: ' +
			mounting_type + '<br>Operating Temp: ' +
			operating_temp + '<br>Package: ' +
			package_case;
			//"<div id='example' class='flora' title='Add Part to Database?'></div>"
			
			switch(category)
			{
				case 'Capacitors':
				real_cat = 'CAP';
				break;
				case 'Connectors':
				real_cat = 'CON';
				break;
				case 'Battery Products':
				real_cat = 'BAT';
				break;
				case 'Discrete Semiconductor Products':
				real_cat = 'SEMI';
				break;
				case 'Filters':
				real_cat = 'FLT';
				break;
				case 'Integrated Circuits (ICs) ':
				real_cat = "ICT";
				break;
			}
			
			if(real_cat == 'SEMI')
			{
				switch(family)
				{
					case 'Diodes, Rectifiers - Single':
					real_cat = 'DIO';
					break;
					case 'Transistors (BJT) - Single':
					real_cat = 'XSR';
					break;
				}
			}
			
			$(dialogContent).dialog({autoOpen: false,
            buttons: 	{ 	"Ok": function() 	{
							var str = package_case;
							
							window.open("http://"+Oracle_IP+"/kwik-e-part/part_add.php?supplier_id=189&supplier_part_no="+digikey_part_no+
																											"&mfg="+manufacturer+
																											"&mfg_part_no="+mfg_part_no+
																											"&description="+description+
																											"&rohs_status="+rohs_status+
																											"&mounting_type="+mounting_type+
																											"&operating_temp="+operating_temp+
																											"&package_case="+str.replace("\"", "in"));
																										
							$(this).dialog("close");},
							"Cancel": function(){$(this).dialog("close");}
						}
			}); 	
	
	
			/*alert('Add part to DDC database? (Verify accuracy!)\n\nDigikey Part No: ' + digikey_part_no + 
			'\nManufacturer: ' + manufacturer +
			'\nMFG Part No: ' + mfg_part_no +
			'\nDescription: ' + description +
			'\nROHS Status: ' + rohs_status +
			'\nMounting Type: ' + mounting_type +
			'\nOperating Temp: ' + operating_temp +
			'\nPackage: ' + package_case);
			*/
		
		