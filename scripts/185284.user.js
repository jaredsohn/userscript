// ==UserScript==
// @name        Netsuite Item Search
// @namespace   Seifer - http://userscripts.org/users/33118
// @include     https://system.netsuite.com/app/accounting/transactions/salesord.nl*
// @include     https://system.netsuite.com/app/common/item/item.nl*
// @include     https://system.netsuite.com/app/accounting/transactions/purchord.nl*
// @include     https://system.netsuite.com/app/accounting/transactions/estimate.nl*
// @include     https://system.netsuite.com/app/accounting/transactions/custcred.nl*
// @include     https://system.netsuite.com/app/accounting/transactions/trnfrord.nl*
// @include     https://system.netsuite.com/app/accounting/transactions/rtnauth.nl*
// @include     https://system.netsuite.com/app/accounting/transactions/vendbill.nl*
// @version     1.93
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @grant    	GM_info
// @grant    	GM_getValue
// @grant    	GM_setValue
// ==/UserScript==

CommonItemsFormId = "218";

ItemSearchForms = [];

ItemSearchForms[224] = {
    "Name": "Website Item Search",
    "URL": "https://system.netsuite.com/app/common/search/search.nl?id=224&e=T",
    "Field": "STOREDESCRIPTION",
    "type_title": "has keywords",
    "type_num_value": "3",
    "type_value": "KEYWORDS",
	"Display": true};
ItemSearchForms[151] = {
    "Name": "Full Item Search",
    "URL": "https://system.netsuite.com/app/common/search/search.nl?id=151&e=T",
    "Field": "STOREDESCRIPTION",
    "type_title": "has keywords",
    "type_num_value": "3",
    "type_value": "KEYWORDS",
	"Display": true};
ItemSearchForms[214] = {
    "Name": "Vendor Item Code",
    "URL": "https://system.netsuite.com/app/common/search/search.nl?id=214&e=T",
    "Field": "VENDORCODE",
    "type_title": "contains",
    "type_num_value": "4",
    "type_value": "CONTAINS",
	"Display": true};
ItemSearchForms[218] = {
    "Name": "Common Items",
    "URL": "https://system.netsuite.com/app/common/search/search.nl?id=218&e=T",
	"Display": false};
ItemSearchForms[217] = {
    "Name": "Core Deposits",
    "URL": "https://system.netsuite.com/app/common/search/search.nl?id=217&e=T",
    "Field": "DESCRIPTION",
    "type_title": "contains",
    "type_num_value": "3",
	"type_value": "CONTAINS",
	"Display": true};
	
$SearchSelect = $('<select id="GM_SearchSelect"></select>');
$.each(ItemSearchForms,function(id,form) {
	if(typeof form != "undefined") {
		if(form['Display'] == true) {
			if(GM_getValue('Search') == id) {
			   $SearchSelect.append($('<option selected="selected" value="'+id+'">'+form['Name']+'</option>'));
			} else {
			   $SearchSelect.append($('<option value="'+id+'">'+form['Name']+'</option>'));
			}
		}
	}
});

function GM_main ($) {
    addGlobalStyle('#gm_awesomesearch * { font-size:8pt } #gm_awesomesearch { width: 70%; z-index: 9999; position: absolute; background-color:#F2F2F2 } #gm_awesomesearch .gm_results { overflow-x: scroll; max-height:400px } #gm_awesomesearch table { width: 100% } #gm_awesomesearch .gm_results td { cursor: pointer } #gm_awesomesearch tr.selected td.listtexthl, #gm_awesomesearch tr.selected { background-color: yellow } #gm_awesomesearch tr.selected td.listtext { background-color: transparent }');
	
    if($('#item_splits').length || $('#members_form').length) {  
		$.each(ItemSearchForms,function(id,form) {
			if(typeof form != "undefined") {
				$('body').append($('<iframe style="display:none" id="gm_searchframe_'+id+'" src="'+form['URL']+'"/>'));
			}
		});
    }
    
	if($('#item_splits').length) {
		// We're on the sales orders page
		var $table = $('<table></table>');
		var $tr = $('<tr></tr>');
		var $td = $('<td class="smallgraytextnolink" style="line-height: 20px">Item search</td>');
		var $td1 = $('<td></td>');
		var $input = $('<input id="item_awesome_search" type="text" style="width:500px;height:20px" class="input rtpadding"/>');
		$tr.append($td);
		$td1.append($input);
		$tr.append($td1);
		$table.append($tr);
		
		$('#item_form').append($table);
		
		search_field_holder = $('#item_form');
		search_field = '#item_awesome_search';
		item_transaction_table = "#item_splits";
		
		$commonItemsButton = $('<td><table cellspacing="0" cellpadding="0" border="0" style="margin-right:6px;cursor:hand;" id="GM_tbl_CommonItems"><tr class="tabBnt"> <td><img width="10" border="0" height="50%" class="bntLT" src="/images/nav/ns_x.gif"> <img width="10" border="0" height="50%" class="bntLB" src="/images/nav/ns_x.gif"> </td> <td nowrap="" valign="top" height="20" class="bntBgB"> <input type="button" onmouseover="if(this.getAttribute(\'_mousedown\')==\'T\') setButtonDown(true, true, this);" onmouseout="if(this.getAttribute(\'_mousedown\')==\'T\') setButtonDown(false, true, this);" onmouseup="this.setAttribute(\'_mousedown\',\'F\'); setButtonDown(false, true, this);" onmousedown="this.setAttribute(\'_mousedown\',\'T\'); setButtonDown(true, true, this);" value="Common Items" class="rndbuttoninpt bntBgT" _mousedown="F" id="GM_CommonItemsBtn"></td><td><img width="10" border="0" height="50%" class="bntRT" src="/images/nav/ns_x.gif"> <img width="10" border="0" height="50%" class="bntRB" src="/images/nav/ns_x.gif"></td></tr></table></td>');
		
		$('#tbl_item_addmultiple').closest('tr').append($commonItemsButton);
		
		$('#GM_CommonItemsBtn').on('click',function(){
			$searchfield = $('#item_awesome_search');
			$awesomefield = $searchfield.closest('td');
			$('#gm_awesomesearch').remove();
			$awesomefield.append($gm_awesomesearch);
			AwesomeItemSearch($awesomefield,CommonItemsFormId);
		});
		
	} else if($('#members_form').length) { // We're in the item kit building page
		var $table = $('<table></table>');
		var $tr = $('<tr></tr>');
		var $td = $('<td class="smallgraytextnolink" style="">Item search</td>');
		var $td1 = $('<td></td>');
		var $input = $('<input id="item_awesome_search" type="text" style="width:500px;height:20px" class="input rtpadding"/>');
		$input.addClass('textbox');
		$tr.append($td);
		$td1.append($input);
		$tr.append($td1);
		$table.append($tr);
		$('#members_form').closest('div').append($table);
		search_field_holder = $('#members_form').closest('div');
		search_field = '#item_awesome_search';
		item_transaction_table = "#member_splits";
	} else {
		return false;
	}
	
	$(search_field_holder).delegate(search_field,'keydown',function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		var $this = $(this);
		if (code==13) { // Enter
			e.preventDefault(); e.stopPropagation();
			if($(this).val().length >= 3) {
				if($(this).val() == $('#gm_awesomesearch').data('last') && $('#gm_awesomesearch').find('tr.selected').length > 0) {
					AwesomeItemSearch_Submit(e);
				} else {
					AwesomeItemSearch($(this));
				}
			}
		} else if (code==38) { // Up arrow
			e.preventDefault(); e.stopPropagation();
			if($('#gm_awesomesearch').length) {
				$('#item_awesome_search').val($('#gm_awesomesearch').data('last'));
				if($('#gm_awesomesearch').find('tr.srchres').length) {
					var $tr = $('#gm_awesomesearch').find('tr.selected');
					if($tr.length == 0) {
						$('#gm_awesomesearch').find('tr.srchres:last').addClass('selected');
					} else if($tr.prev().hasClass('srchres')) {
						$tr.removeClass('selected');
						$tr.prev().addClass('selected');
					}
				}
			}
		} else if (code==40) { // down arrow
			e.preventDefault(); e.stopPropagation();
			if($('#gm_awesomesearch').length) {
				$('#item_awesome_search').val($('#gm_awesomesearch').data('last'));
				var $tr = $('#gm_awesomesearch').find('tr.selected');
				if($('#gm_awesomesearch').find('tr.srchres').length) {
					var $tr = $('#gm_awesomesearch').find('tr.selected');
					if($tr.length == 0) {
						$('#gm_awesomesearch').find('tr.srchres:first').addClass('selected');
					} else if($tr.next().hasClass('srchres')) {
						$tr.removeClass('selected');
						$tr.next().addClass('selected');
					}
				}
			}
		}
	});
	
	$(search_field_holder).delegate(search_field,'keyup',function(e) {
		try { window.clearTimeout(gm_AwesomeSearchTimer); } catch(err) {}
		var code = (e.keyCode ? e.keyCode : e.which);
		var $this = $(this);
		if (code==13) { // Enter
			return false;
		}
		if($(this).val().length >= 3 && $(this).val() != $('#gm_awesomesearch').data('last')) {
			gm_AwesomeSearchTimer = window.setTimeout(AwesomeItemSearch,1000,$(this));
		}
	});
	$(search_field_holder).delegate(search_field,'blur',function(e) {
		if(!$('#gm_awesomesearch')) {
			try { window.clearTimeout(gm_AwesomeSearchTimer); } catch(err) {}
			var $this = $(this);
			AwesomeItemSearch($(this));
		}
	});
	
	// Create Search Table Holder for use in functions
	var $searchHolderTable = $('<table></table>');
	var $tr = $('<tr></tr>');
	var $td = $('<td align="left" style="font-size:8pt"><b>Choose Item</b></td>');
	var $td1 = $('<td align="right" style="font-size:8pt"><img style="cursor:pointer" class="gm_closebutton" border="0" title="Close" alt="Close" src="/images/forms/hide.gif"></td>');
	$tr.append($td);
	$tr.append($td1);
	$searchHolderTable.append($tr);
	$tr = $('<tr></tr>');
	$td = $('<td colspan="2"></td>');
	$div = $('<div class="gm_results">Searching...</td>');
	$td.append($div);
	$tr.append($td);
	$searchHolderTable.append($tr);
    $tr = $('<tr></tr>');
    $td = $('<td colspan="2"><span>Search Type: </span></td>');
    $td.append($SearchSelect);
	
	if(GM_getValue('SearchPartWords')) {
		var checked = 'checked="checked"';
	} else {
		var checked = '';
	}
	$td.append($('<span style="margin-left: 10px">Search Part Words: <input '+checked+' type="checkbox" id="GM_SearchTypePartWords"/></span>'));
	
    $tr.append($td);
    $searchHolderTable.append($tr);
	$gm_awesomesearch = $('<div></div>');
	$gm_awesomesearch.append($searchHolderTable);
	$gm_awesomesearch.attr('id','gm_awesomesearch');
	
	function AwesomeItemSearch_Submit(evt) {
		try { window.clearTimeout(gm_AwesomeSearchTimer); } catch(err) {}
		var $tr = $('#gm_awesomesearch').find('tr.selected');
		var itemname = $tr.find('td.gm_itemname').text();
		var sku = $tr.find('td.gm_sku').text();
		if($('#item_item_display').length) {
			$itemfield = $('#item_item_display').parent();
		}
		if($('#member_item_display').length) {
			$itemfield = $('#member_item_display').parent();
		}
		$itemfield.triggerHandler('focus');
		$itemfield.find('input').focus();
		$itemfield.find('input').val(sku+" "+itemname);
		$itemfield.find('input').triggerHandler("change");
		$itemfield.find('input').triggerHandler("blur");
		
		if(typeof evt != 'undefined') {
			if(!evt.ctrlKey) {
				$('#gm_awesomesearch').remove();
				$('#item_awesome_search').val('');
			}
		}
	}
	
	function AwesomeItemSearch($this,searchtype) {
		$searchfield = $this;
		$itemfield = $searchfield.closest('td').next('td');
		$awesomefield = $searchfield.closest('td');
		
		$('#gm_awesomesearch').remove();
		$awesomefield.append($gm_awesomesearch);
		$('#gm_awesomesearch .gm_results').html("<p>Loading...</p>");
		$('#gm_awesomesearch').on('click','.gm_closebutton',function() {
			try { window.clearTimeout(gm_AwesomeSearchTimer); } catch(err) {}
			$('#gm_awesomesearch').remove();
		});
        $('#gm_awesomesearch').on('change','#GM_SearchSelect',function() {
            GM_setValue('Search',$(this).val());
            if($('#item_awesome_search').val().length >= 3) {
               AwesomeItemSearch($('#item_awesome_search'));
            }
        });
		$('#gm_awesomesearch').on('change','#GM_SearchTypePartWords',function() {
            GM_setValue('SearchPartWords',$(this).val());
            if($('#item_awesome_search').val().length >= 3) {
               AwesomeItemSearch($('#item_awesome_search'));
            }
        });

		if(typeof searchtype == 'undefined') {
			var searchtype = $('#GM_SearchSelect').val();
		}
		var searchstr = $this.val();
		$('#gm_awesomesearch').data('last',searchstr);
		if($('#GM_SearchTypePartWords')[0]['checked']) {
			searchstr = "%"+searchstr+"%";
			searchstr = searchstr = searchstr.replace(/ /mg, "% %");
		}
  		var $searchform = $('#gm_searchframe_'+searchtype).contents().find('#main_form')
		$searchform.find('#_multibtnstate_').val('SRCH_ITEM:csv:csvdata');
		if(typeof ItemSearchForms[searchtype]['Field'] != 'undefined'){
			$searchform.find('[name="inpt_Item_'+ItemSearchForms[searchtype]['Field']+'type"]').attr('title',ItemSearchForms[searchtype]['type_title']);
			$searchform.find('[name="inpt_Item_'+ItemSearchForms[searchtype]['Field']+'type"]').val(ItemSearchForms[searchtype]['type_title']);
			$searchform.find('[name="Item_'+ItemSearchForms[searchtype]['Field']+'type"]').val(ItemSearchForms[searchtype]['type_value']);
			$searchform.find('[id^="indx_Item_'+ItemSearchForms[searchtype]['Field']+'type"]').val(ItemSearchForms[searchtype]['type_num_value']);
			$searchform.find('[name="Item_'+ItemSearchForms[searchtype]['Field']+'"]').val(searchstr);
		}

		$searchform.attr('action','/app/common/search/searchresults.csv');
		var formdata = $searchform.serialize();
		formdata += "&csvdata=Export+Data+Only";
		var doSearch = $.post($searchform.attr('action'),formdata)
		.done(function(data) {
			var $searchTable = $('<table class="listtable listborder"></table>');
			var $tr = $('<tr></tr>');
			var $th = $('<th class="listheadertd listheadertextb">SKU</th>');
			var $th1 = $('<th class="listheadertd listheadertextb">Description</th>');
			var $th2 = $('<th class="listheadertd listheadertextb">Price</th>');
			var $th3 = $('<th class="listheadertd listheadertextb">Unit</th>');
			var $th4 = $('<th class="listheadertd listheadertextb">Action</th>');
			var $th5 = $('<th class="listheadertd listheadertextb" style="display:none">Item Name</th>');
			$tr.append($th);
			$tr.append($th1);
			$tr.append($th2);
			$tr.append($th3);
			$tr.append($th4);
			$tr.append($th5);
			$searchTable.append($tr);
			var result = $.csv.toObjects(data);
			var i=0;

			$.each(result,function(index,value){
				var myregexp = /.*[\s\-](\S+)/;
				var match = myregexp.exec(value['Name']);
				if (match != null) {
					var sku = match[1];
				} else {
					var sku = value['Name'];
				}
				var $tr = $('<tr class="srchres"></tr>');
				var $td = $('<td></td>');
				var $td1 = $('<td></td>');
				var $td2 = $('<td></td>');
				var $td3 = $('<td></td>');
				var $td4 = $('<td></td>');
				var $td5 = $('<td style="display:none"></td>');
				if(isEven(i)) {
					$td.addClass('gm_sku listtexthl');
					$td1.addClass('gm_description listtexthl');
					$td2.addClass('gm_price listtexthl');
					$td3.addClass('gm_unit listtexthl');
					$td4.addClass('gm_action listtexthl');
					$td5.addClass('gm_itemname listtexthl');
				} else {
					$td.addClass('gm_sku listtext');
					$td1.addClass('gm_description listtext');
					$td2.addClass('gm_price listtext');
					$td3.addClass('gm_unit listtext');
					$td4.addClass('gm_action listtext');
					$td5.addClass('gm_itemname listtext');
				}
				$td.text(sku);
				$td1.text(value['Description']);
				$td2.text(value['Base Price']);
				$td3.text(value['Sale Unit']);
				$td4.html('<a href="https://system.netsuite.com/app/common/item/item.nl?id='+value['Internal ID']+'" target="_blank">Open</a>&nbsp;|&nbsp;<a href="https://system.netsuite.com/app/common/item/item.nl?id='+value['Internal ID']+'&e=T" target="_blank">Edit</a>');
				$td5.text(value['Display Name']);
				$tr.append($td);
				$tr.append($td1);
				$tr.append($td2);
				$tr.append($td3);
				$tr.append($td4);
				$tr.append($td5);
				if(value['Sale Unit'] != "" || value['Base Price'] != "" || typeof ItemSearchForms[searchtype]['Field'] == 'undefined') {
					$searchTable.append($tr);
					i++;
				}
			});
			
			$('#gm_awesomesearch .gm_results').html("");
			
			if($searchTable.find('tr:nth-child(2)').length > 0) { // Show the results
				$('#gm_awesomesearch .gm_results').append($searchTable);
				$('#gm_awesomesearch .gm_results').off('click','td');
				$('#gm_awesomesearch .gm_results').on('click','td:not(.gm_action)',function(evt) {
					$(this).closest('table').find('tr').removeClass('selected');
					$(this).closest('tr').addClass('selected');
					AwesomeItemSearch_Submit(evt);
				});
			} else { // no results to display
				$searchTable.append($('<tr><td colspan="5" align="center">Search returned no results.</td></tr>'));
				$('#gm_awesomesearch .gm_results').append($searchTable);
			}
			
		})
		.fail(function() {
			alert('error');
		})
		.always(function() {
			//alert('finished');
		});
	}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
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

function isEven(n) {
  n = Number(n);
  return n === 0 || !!(n && !(n%2));
}

function isOdd(n) {
  return isEven(Number(n) + 1);
}

RegExp.escape=function(s){return s.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');};(function($){'use strict'
$.csv={defaults:{separator:',',delimiter:'"',headers:true},hooks:{castToScalar:function(value,state){var hasDot=/\./;if(isNaN(value)){return value;}else{if(hasDot.test(value)){return parseFloat(value);}else{var integer=parseInt(value);if(isNaN(integer)){return null;}else{return integer;}}}}},parsers:{parse:function(csv,options){var separator=options.separator;var delimiter=options.delimiter;if(!options.state.rowNum){options.state.rowNum=1;}
if(!options.state.colNum){options.state.colNum=1;}
var data=[];var entry=[];var state=0;var value=''
var exit=false;function endOfEntry(){state=0;value='';if(options.start&&options.state.rowNum<options.start){entry=[];options.state.rowNum++;options.state.colNum=1;return;}
if(options.onParseEntry===undefined){data.push(entry);}else{var hookVal=options.onParseEntry(entry,options.state);if(hookVal!==false){data.push(hookVal);}}
entry=[];if(options.end&&options.state.rowNum>=options.end){exit=true;}
options.state.rowNum++;options.state.colNum=1;}
function endOfValue(){if(options.onParseValue===undefined){entry.push(value);}else{var hook=options.onParseValue(value,options.state);if(hook!==false){entry.push(hook);}}
value='';state=0;options.state.colNum++;}
var escSeparator=RegExp.escape(separator);var escDelimiter=RegExp.escape(delimiter);var match=/(D|S|\n|\r|[^DS\r\n]+)/;var matchSrc=match.source;matchSrc=matchSrc.replace(/S/g,escSeparator);matchSrc=matchSrc.replace(/D/g,escDelimiter);match=RegExp(matchSrc,'gm');csv.replace(match,function(m0){if(exit){return;}
switch(state){case 0:if(m0===separator){value+='';endOfValue();break;}
if(m0===delimiter){state=1;break;}
if(m0==='\n'){endOfValue();endOfEntry();break;}
if(/^\r$/.test(m0)){break;}
value+=m0;state=3;break;case 1:if(m0===delimiter){state=2;break;}
value+=m0;state=1;break;case 2:if(m0===delimiter){value+=m0;state=1;break;}
if(m0===separator){endOfValue();break;}
if(m0==='\n'){endOfValue();endOfEntry();break;}
if(/^\r$/.test(m0)){break;}
throw new Error('CSVDataError: Illegal State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');case 3:if(m0===separator){endOfValue();break;}
if(m0==='\n'){endOfValue();endOfEntry();break;}
if(/^\r$/.test(m0)){break;}
if(m0===delimiter){throw new Error('CSVDataError: Illegal Quote [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}
throw new Error('CSVDataError: Illegal Data [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');default:throw new Error('CSVDataError: Unknown State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}});if(entry.length!==0){endOfValue();endOfEntry();}
return data;},splitLines:function(csv,options){var separator=options.separator;var delimiter=options.delimiter;if(!options.state.rowNum){options.state.rowNum=1;}
var entries=[];var state=0;var entry='';var exit=false;function endOfLine(){state=0;if(options.start&&options.state.rowNum<options.start){entry='';options.state.rowNum++;return;}
if(options.onParseEntry===undefined){entries.push(entry);}else{var hookVal=options.onParseEntry(entry,options.state);if(hookVal!==false){entries.push(hookVal);}}
entry='';if(options.end&&options.state.rowNum>=options.end){exit=true;}
options.state.rowNum++;}
var escSeparator=RegExp.escape(separator);var escDelimiter=RegExp.escape(delimiter);var match=/(D|S|\n|\r|[^DS\r\n]+)/;var matchSrc=match.source;matchSrc=matchSrc.replace(/S/g,escSeparator);matchSrc=matchSrc.replace(/D/g,escDelimiter);match=RegExp(matchSrc,'gm');csv.replace(match,function(m0){if(exit){return;}
switch(state){case 0:if(m0===separator){entry+=m0;state=0;break;}
if(m0===delimiter){entry+=m0;state=1;break;}
if(m0==='\n'){endOfLine();break;}
if(/^\r$/.test(m0)){break;}
entry+=m0;state=3;break;case 1:if(m0===delimiter){entry+=m0;state=2;break;}
entry+=m0;state=1;break;case 2:var prevChar=entry.substr(entry.length-1);if(m0===delimiter&&prevChar===delimiter){entry+=m0;state=1;break;}
if(m0===separator){entry+=m0;state=0;break;}
if(m0==='\n'){endOfLine();break;}
if(m0==='\r'){break;}
throw new Error('CSVDataError: Illegal state [Row:'+options.state.rowNum+']');case 3:if(m0===separator){entry+=m0;state=0;break;}
if(m0==='\n'){endOfLine();break;}
if(m0==='\r'){break;}
if(m0===delimiter){throw new Error('CSVDataError: Illegal quote [Row:'+options.state.rowNum+']');}
throw new Error('CSVDataError: Illegal state [Row:'+options.state.rowNum+']');default:throw new Error('CSVDataError: Unknown state [Row:'+options.state.rowNum+']');}});if(entry!==''){endOfLine();}
return entries;},parseEntry:function(csv,options){var separator=options.separator;var delimiter=options.delimiter;if(!options.state.rowNum){options.state.rowNum=1;}
if(!options.state.colNum){options.state.colNum=1;}
var entry=[];var state=0;var value='';function endOfValue(){if(options.onParseValue===undefined){entry.push(value);}else{var hook=options.onParseValue(value,options.state);if(hook!==false){entry.push(hook);}}
value='';state=0;options.state.colNum++;}
if(!options.match){var escSeparator=RegExp.escape(separator);var escDelimiter=RegExp.escape(delimiter);var match=/(D|S|\n|\r|[^DS\r\n]+)/;var matchSrc=match.source;matchSrc=matchSrc.replace(/S/g,escSeparator);matchSrc=matchSrc.replace(/D/g,escDelimiter);options.match=RegExp(matchSrc,'gm');}
csv.replace(options.match,function(m0){switch(state){case 0:if(m0===separator){value+='';endOfValue();break;}
if(m0===delimiter){state=1;break;}
if(m0==='\n'||m0==='\r'){break;}
value+=m0;state=3;break;case 1:if(m0===delimiter){state=2;break;}
value+=m0;state=1;break;case 2:if(m0===delimiter){value+=m0;state=1;break;}
if(m0===separator){endOfValue();break;}
if(m0==='\n'||m0==='\r'){break;}
throw new Error('CSVDataError: Illegal State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');case 3:if(m0===separator){endOfValue();break;}
if(m0==='\n'||m0==='\r'){break;}
if(m0===delimiter){throw new Error('CSVDataError: Illegal Quote [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}
throw new Error('CSVDataError: Illegal Data [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');default:throw new Error('CSVDataError: Unknown State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}});endOfValue();return entry;}},toArray:function(csv,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;var state=(options.state!==undefined?options.state:{});var options={delimiter:config.delimiter,separator:config.separator,onParseEntry:options.onParseEntry,onParseValue:options.onParseValue,state:state}
var entry=$.csv.parsers.parseEntry(csv,options);if(!config.callback){return entry;}else{config.callback('',entry);}},toArrays:function(csv,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;var data=[];var options={delimiter:config.delimiter,separator:config.separator,onParseEntry:options.onParseEntry,onParseValue:options.onParseValue,start:options.start,end:options.end,state:{rowNum:1,colNum:1}};data=$.csv.parsers.parse(csv,options);if(!config.callback){return data;}else{config.callback('',data);}},toObjects:function(csv,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;config.headers='headers'in options?options.headers:$.csv.defaults.headers;options.start='start'in options?options.start:1;if(config.headers){options.start++;}
if(options.end&&config.headers){options.end++;}
var lines=[];var data=[];var options={delimiter:config.delimiter,separator:config.separator,onParseEntry:options.onParseEntry,onParseValue:options.onParseValue,start:options.start,end:options.end,state:{rowNum:1,colNum:1},match:false};var headerOptions={delimiter:config.delimiter,separator:config.separator,start:1,end:1,state:{rowNum:1,colNum:1}}
var headerLine=$.csv.parsers.splitLines(csv,headerOptions);var headers=$.csv.toArray(headerLine[0],options);var lines=$.csv.parsers.splitLines(csv,options);options.state.colNum=1;if(headers){options.state.rowNum=2;}else{options.state.rowNum=1;}
for(var i=0,len=lines.length;i<len;i++){var entry=$.csv.toArray(lines[i],options);var object={};for(var j in headers){object[headers[j]]=entry[j];}
data.push(object);options.state.rowNum++;}
if(!config.callback){return data;}else{config.callback('',data);}},fromArrays:function(arrays,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;config.escaper='escaper'in options?options.escaper:$.csv.defaults.escaper;config.experimental='experimental'in options?options.experimental:false;if(!config.experimental){throw new Error('not implemented');}
var output=[];for(i in arrays){output.push(arrays[i]);}
if(!config.callback){return output;}else{config.callback('',output);}},fromObjects2CSV:function(objects,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;config.experimental='experimental'in options?options.experimental:false;if(!config.experimental){throw new Error('not implemented');}
var output=[];for(i in objects){output.push(arrays[i]);}
if(!config.callback){return output;}else{config.callback('',output);}}};$.csvEntry2Array=$.csv.toArray;$.csv2Array=$.csv.toArrays;$.csv2Dictionary=$.csv.toObjects;})(jQuery);