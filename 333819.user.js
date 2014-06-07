// ==UserScript==
// @name        NetSuite Mods
// @namespace   Seifer - http://userscripts.org/users/seifer
// @include     https://system.netsuite.com/*
// @version     1.91
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @grant    	GM_info
// @grant    	GM_addStyle
// ==/UserScript==

function GM_main($) {
	if(window.location.toString().indexOf('app/common/item/item.nl') > 1) {
		GM_item();
	} else if(window.location.toString().indexOf('app/setup/assistants/matrixitem.nl') > 1) {
		GM_item();
	} else if(window.location.toString().indexOf('app/crm/support/supportcase.nl') > 1) {
		GM_supportcase();
	} else if(window.location.toString().indexOf('app/accounting/transactions/salesord.nl') > 1) {
		GM_salesorder();
	} else if(window.location.toString().indexOf('/app/accounting/print/transactionprinter.nl?hotprinthtmlpt=T') > 1) {
		GM_printpickingticket();
	} else if(window.location.toString().indexOf('app/accounting/print') > 1) {
		GM_printpage();
	} else {
	}
	GM_hoverlinks();
}

categories = {
"": " ",
"117": "Apparel, Merchandise, & Literature (117)",
"114": "Brakes (114)",
"104": "Clutch (104)",
"106": "Electrical (106)",
"107": "Engine (107)",
"120": "Exhaust (120)",
"102": "Front Axle & Suspension (102)",
"108": "Fuel & Air System (108)",
"113": "Heaters & Air-Conditioning (113)",
"115": "Ignition (115)",
"116": "Interior & Exterior (116)",
"101": "Lubrication & Maintenance (101)",
"121": "Nuts, Bolts & Washers (121)",
"105": "Radiator & Cooling (105)",
"103": "Rear Axle (103)",
"119": "Restoration AIDS (119)",
"109": "Spring & Shock Absorber (109)",
"110": "Steering Gear (110)",
"118": "Tools (118)",
"111": "Transmission (111)",
"112": "Wheels & Tyres (112)",
"122": "Hose (122)",
"121": "Nuts, Bolts & Washers, Seals, etc (121)",
"200": "Crate Engine (200)",
"997": "Core Deposits (997)",
"998": "Assembly Services (998)",
"999": "Misc Charges (999)"
};

function makeid(chars,len)
{
    var text = "";
    for( var i=0; i < len; i++ )
        text += chars.charAt(Math.floor(Math.random() * chars.length));

    return text;
}
function GM_salesorder() {
	if($('#printpicktick').length > 0) {
		var url = 'https://system.netsuite.com/app/accounting/print/transactionprinter.nl?hotprinthtmlpt=T&id='+$('#id').val();
		//$('#printpicktick').attr('onclick','window.open("'+url+'")');
	}
}
function GM_hoverlinks() {
console.log('here');
	$links = $('.dottedlink');
	$links.each(function(index){
		$this = $(this);
		if($this.attr('onclick') == undefined && $this.attr('onmouseover') != undefined) {
			// $new = $('<a id="'+$this.attr('id')+'" onmouseover="'+$this.attr('onmouseover')+'" href="'+$this.attr('href')+'"><img border="0" style="margin-right:8px;vertical-align:middle;" src="/images/hover/icon_hover.png?v=2014.1.0"></a>');
			// $this.before($new);
			// $this.removeAttr('id','');
			// $this.removeAttr('onmouseover');
			// $this.removeAttr('href','');
			// $this.removeAttr('class','');
            
            $new = $('<span><a class="tinygraytextnolink" href="'+$this.attr('href')+'">View</a>&nbsp;</span>');
			$this.before($new);
		}
	});
}

function GM_printpage() {
	if($('#loadingBar').hasClass('hidden') && $('.loadingIcon').length == 0) { 
		window.print();
	} else {
		setTimeout(GM_printpage,50);
	}
}

function GM_GenerateItemNumber(prefix,$field) {
	var itemnum = prefix+'.'+makeid('0123456789',5);
	var searchurl = 'https://system.netsuite.com/app/common/scripting/nlapijsonhandler.nl?jrr=T&jrid=3&jrmethod=remoteObject.searchGlobal&jrparams=["'+itemnum+'"]';
	$.get(searchurl,function(data) {
		try {
			data = $.parseJSON(data);
		} catch(err) {
			$field.val(itemnum);
			alert("ERR: 001\r\nFAILED to check item number on NetSuite!");
			return false;
		}
		if(data.id != 3) {
			$field.val(itemnum);
			alert("ERR: 002\r\nFAILED to check item number on NetSuite!");
			return false;
		}
		if(data.result != null) {
			GM_GenerateItemNumber(prefix,$field);
		} else {
			$field.val(itemnum);
		}
	});
}

function GM_item() {
	if($('#matrix_layer').length) { // Add internal ID column to 'Matrix Item' list on item page
		var $idheader = $('#matrixmachheader td:first').clone();
		$idheader.html('ID');
		$('#matrixmachheader').prepend($idheader);
		$('tr[id^="matrixmachrow"]').each(function(index) {
		var $idrow = $(this).find('td:first').clone();
		var href = $idrow.find('a').attr('href');
		var myregexp = /.*id=(\d*)/m;
		var match = myregexp.exec(href);
		$idrow.html('<a href="'+href+'">'+match[1]+'</a>');
			$(this).prepend($idrow);
		});
	}
	if($('#itemid').length) { // Item code generator button
		$btn = $('<span class="field_widget_helper_pos effectStatic"><a id="GM_Gen_Item_Code_Btn" class="smalltextul field_widget i_createnew" title="Generate Item Code"></a></span>');
		$('#itemid_fs').append($btn);
		var $genhtml = $('<div id="GM_Gen_Item_Code" style="display:none"><p><span class="smallgraytextnolink">Category: </span><select></select> <button>Generate</button></p></div>');
		$.each(categories,function(k, v) {
			$genhtml.find('select').append('<option value="'+k+'">'+v+'</option>');
		});
		
		var options = $genhtml.find('select option');
		var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
		arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
		options.each(function(i, o) {
		  o.value = arr[i].v;
		  $(o).text(arr[i].t);
		});
		
		$('#itemid_fs').append($genhtml);
		$('#itemid').attr('autocomplete','off');
		$('#GM_Gen_Item_Code').on('click','button',function(e) {
			e.preventDefault();
			prefix = $('#GM_Gen_Item_Code').find('option:selected').val();
			if(prefix == "200") {
				$('#itemid').val(prefix+'.ENGINE-NUMBER-HERE-'+makeid('0123456789',5));
			} else {
				$('#itemid').val('GENERATING...');
				GM_GenerateItemNumber(prefix,$('#itemid'));
			}
			
			$('#GM_Gen_Item_Code').hide();
		});
		$('#GM_Gen_Item_Code_Btn').on('click',function() {
			$('#GM_Gen_Item_Code').show();
			if($('#itemid').val() != "") {
				$('#GM_Gen_Item_Code').find('option').each(function() { this.selected = (this.text.toLowerCase().indexOf($('#itemid').val().toLowerCase()) != -1); });
			}
		});
		$('#itemid').on('keyup',function(event) {
			if(event.which == 32 && event.ctrlKey == true) {
				$('#GM_Item_Code_Hint').remove();
				$('#GM_Gen_Item_Code').find('option')[0].selected = true;
				$('#GM_Gen_Item_Code').find('option').each(function() { this.selected = (this.text.toLowerCase().indexOf($.trim($('#itemid').val().toLowerCase())) != -1); });
				if($('#GM_Gen_Item_Code').find('option:selected').val()) {
					$('#GM_Gen_Item_Code button').trigger('click');
					$hint = $('#itemid_fs').append($('<span id="GM_Item_Code_Hint">'+$('#GM_Gen_Item_Code').find('option:selected').text()+'</span>'));
					$('#GM_Item_Code_Hint').fadeOut(5000,function() { $(this).remove(); });
				} else {
					$('#GM_Gen_Item_Code').show();
				}
			}
		});
	}
}

function GM_supportcase() {
	var $messages = $('#messages__tab').find('tr[id^="messagesrow"]');
	if($messages.length) {
		casenumber = $('#origcasenumber').val();
		$messages.each(function(index, element) {
			var $morepopup = $(element).find('a[onclick*="morepopup"]');
			$td = $morepopup.closest('td');
			if($morepopup.length) {
				var url = $morepopup.attr('onclick');
				var myregexp = /nlOpenWindow\('(.*?)'/m;
				var match = myregexp.exec(url);
				url = match[1];
				url = url.replace('crmmessage','previewcrmmessage');
				GM_supportcase_update($td,url,$morepopup);
			}
		});
	}
}
function GM_supportcase_update($td,url,$morepopup) {
	var morepopup_onclick = $morepopup.attr('onclick');
	$morepopup.text('(Loading...)');
	$.get(url, function(data) {
		var newmsg = data;
		var str = "Update for Case #"+casenumber+" - ";
		var pos = data.indexOf(str);
		if(pos > 0) {
			data = data.substr(0,data.indexOf(str));
			$td.html(data);
			$morepopup.text('(more...)');
			$td.append($morepopup);
		} else {
			$td.html(data);
		}
	});
}

function GM_printpickingticket() {
	GM_addStyle('.kitstart td { font-weight:bold; } tr.kitstart {border-left:3px solid #000;border-top:3px solid #000; border-right:3px solid #000} tr.kitend {border-bottom:3px solid #000} tr.kit { border-left:3px solid #000; border-right:3px solid #000 } .odd { background-color:#ddd}');
	$itemtable = $('body>p>table');
	var cols = $itemtable.find('th').length;
	$template_kitstart = $('<tr><td style="text-align:center" colspan="2">Kit Start</td><td colspan="'+(cols-2)+'">&nbsp;</td></tr>');
	$template_kitend = $('<tr><td style="text-align:center" colspan="2">Kit End</td><td colspan="'+(cols-2)+'">&nbsp;</td></tr>');
	var kit = false;
	$itemtable.find('tr').each(function(index) {
		$row = $(this);
		var text = $row.find('td:first').html();
		if(typeof text == 'undefined') { text=''; }
		if(text.substr(0,6) == "&nbsp;") {
			if(kit) {
				$row.addClass('kit');
			} else {
				$row.addClass('kit');
				$row.prev().addClass('kitstart');
				//$row.prev().before($template_kitstart.clone());
			}
			kit = true;
		} else if(kit) {
			$row.prev().addClass('kitend');
			//$row.before($template_kitend.clone());
			kit = false;
		}
		
		// highlighting
		if (index % 2 === 0) {
			$row.addClass('even');
		} else { 
			$row.addClass('odd');
		}
	});
	//window.print();
}

if (typeof GM_info !== "undefined") {
    console.log ("Running with local copy of jQuery!");
    GM_main ($);
}
else {
    console.log ("fetching jQuery from some 3rd-party server.");
    add_jQuery (GM_main, "1.9.0");
}
function add_jQuery (callbackFn, jqVersion) {
    var jqVersion   = jqVersion || "1.9.0";
    var D           = document;
    var targ        = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    var scriptNode  = D.createElement ('script');
    scriptNode.src  = 'https://ajax.googleapis.com/ajax/libs/jquery/'
                    + jqVersion
                    + '/jquery.min.js'
                    ;
    scriptNode.addEventListener ("load", function () {
        var scriptNode          = D.createElement ("script");
        scriptNode.textContent  =
            'var gm_jQuery  = jQuery.noConflict (true);\n'
            + '(' + callbackFn.toString () + ')(gm_jQuery);'
        ;
        targ.appendChild (scriptNode);
    }, false);
    targ.appendChild (scriptNode);
}

String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}