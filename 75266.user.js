// ==UserScript==
// @name           NYPropbuilder
// @namespace      Dedi NewYork properties builder
// @include        http://facebook.mafiawars.com/*
// ==/UserScript==


function dedi_prop_execute(form)
	{
	var build_type=form.build_type.options[form.build_type.selectedIndex].value;
	if(build_type=="") return alert("Select the Properties you want to build");	
	var total_build=form.total_build.value;
	if (total_build=="") return alert("Type the numbers of Properties you want to build");	
	var build_url='remote/html_server.php?xw_controller=propertyV2&xw_action=buy&xw_city=1&building_type='+build_type;
		
	for(var x=0; x<total_build; x++)
		{
		do_ajax('inner_page',build_url,1,1,0,0);
		}
	return true;
	}

var props='<option style="color:#33FF00;" value="">NY Properties to build'+
        '<option value="2">Flophouse'+
		'<option value="3">Pawnshop'+
		'<option value="4">Tenement'+
		'<option value="5">Warehouse'+
		'<option value="6">Restaurant'+
		'<option value="7">Dockyard'+
		'<option value="8">Office Park'+
		'<option value="9">Uptown Hotel'+
		'<option value="10">Mega Casino';
		
content=document.getElementById('verytop');
  dedi_prop_div=document.createElement("div");
  dedi_prop.id = 'dedi_prop_div';
  dedi_prop.innerHTML = 'Select your properties to build :\n'
+'<form><table><tr><td><select name=\"build_type\">'+props+'</select><input type=\"text\" name=\"total_build\" value=\"Numbers to build\" onfocus=\"if(this.value==\'Numbers to build\') this.value=""\" onblur=\"if (this.value=="") this.value=\'Numbers to build\'\"><input type=\"button\" value=\"Start Building\" onclick="javascript:return dedi_prop_execute(this.form)"></td></tr><tr><td>Dedi Naga - anakmedan\'s Wishlister</td></tr></table></form>';
