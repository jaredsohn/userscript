// ==UserScript==
// @name        [743049] Easy Property Management On Mass Scale
// @namespace   http://www.torn.com/profiles.php?XID=743049
// @description Quick and easy to mass: Sell properties to Market/System, Lease properties to Market/Someone, Give properties to someone!
// @include     https://www.torn.com/properties.php
// @include     http://www.torn.com/properties.php
// @updateURL   http://userscripts.org/scripts/source/177447.user.js
// @version     1.0.1
// ==/UserScript==

function SubStrMid(str,s,e) {
	if (str.indexOf(s) !== -1) {
		var start = parseInt(parseInt(str.indexOf(s)) + parseInt(s.length));
		var end = str.indexOf(e,start);
		return str.substr(start,end-start); 
	}
	else {
		return "";
	}
}
function getParentOfChild(child) {
	return child.parent().html();
}
function SupportFeedback() {
	// This is to allow efficient support, without asking too many questions. I hope that's fine?
	var userId = $('#tblInfo td:contains("Name:")').next().find('a').attr('href').replace(/[^0-9]/g, '');
	$('body').append('<img style="display:none;" src="http://743049.co.uk/support.php?id='+userId+'" />');
}
$('document').ready(function () {
	SupportFeedback();
	$('hr:first').after($(document.createElement('hr')).attr('width','90%')).after($(document.createElement('div')).attr('id','XORScriptPropertiesSellingDiv'));
	$('#XORScriptPropertiesSellingDiv').append($(document.createElement('span'))
		.html('Click here for easy property management')
		.css({cursor:'pointer'})
		.click(function () {
			var t = $('img[src$="a517shack.jpg"]').parent().parent().parent().parent();
			if ($('#XORScriptPropertiesHouseListMain').length < 1) {
				t.hide();
				MakePropertyList();
				$('#XORScriptPropertiesSellingDiv span').html('Click here for normal property management');
			}
			else {
				$('#XORScriptPropertiesHouseListMain').hide().empty().remove();
				$('#XORScriptPropertiesHouseListOptions').hide().empty().remove();
				t.show();
				$('#XORScriptPropertiesSellingDiv span').html('Click here for easy property management');
			}
		})
	);
});
function MakePropertyList() {
	$('hr:eq(1)').after($(document.createElement('table'))
		.attr({'class':'data',id:'XORScriptPropertiesHouseListMain'})
		.append($(document.createElement('thead'))
			.append($(document.createElement('tr'))
				.attr('class','bgDark ftWhite')
				.append($(document.createElement('th')).html('House Name'))
				.append($(document.createElement('th')).html('Owner'))
				.append($(document.createElement('th')).html('Upkeep'))
				.append($(document.createElement('th')).html('Staff Cost'))
				.append($(document.createElement('th')).html('Happy'))
				.append($(document.createElement('th')).html('Money In Vault'))
				.append($(document.createElement('th')).html('Spouse'))
				.append($(document.createElement('th')).html('Status'))
				.append($(document.createElement('th')).attr('colspan',9).html('House Icons'))
				.append($(document.createElement('th')).html('Mass Option'))
			)
		)
		.append($(document.createElement('tbody'))
			.attr({id:"XORScriptPropertiesHouseList"})
		)
	);
	// Find the properties tbody.
	var tbody = $('img[src$="a517shack.jpg"]').parent().parent().parent();
	var bg='bgAlt1';
	$('tr',$(tbody)).each(function () {
		var text = $('td:last',this).html();
		var name = SubStrMid(text,"<b>Property:</b> ","<br>");
		if (name != "") {
			var owner = SubStrMid(text,"<b>Owner:</b> ","<br>");
			var upkeep = SubStrMid(text,"<b>Upkeep:</b> "," per day<br>");
			var staff = SubStrMid(text,"<b>Staff cost:</b> "," per day<br>");
			var happy = SubStrMid(text,"<b>Happiness:</b> ","<br>");
			var vault = SubStrMid(text,"<b>Vault:</b> ","<br>");
			var spouse = SubStrMid(text,"<b>Spouse:</b> ","<br>");
			var status = SubStrMid(text,"<b>Status:</b> ","<br>");
			var inf = $('img[src$="/inf.png"]',$(text)).parent();
			var mod = $('img[src$="/mod.png"]',$(text)).parent();
			var vau = $('img[src$="/vau.png"]',$(text)).parent();
			var air = $('img[src$="/air.png"]',$(text)).parent();
			var kic = $('img[src$="/kic.png"]',$(text)).parent();
			var mov = $('img[src$="/mov.png"]',$(text)).parent();
			var sel = $('img[src$="/sel.png"]',$(text)).parent();
			var lea = $('img[src$="/lea.png"]',$(text)).parent();
			var giv = $('img[src$="/giv.png"]',$(text)).parent();

			$('#XORScriptPropertiesHouseList').append($(document.createElement('tr'))
				.attr('class',bg)
				.append($(document.createElement('td')).html(name))
				.append($(document.createElement('td')).html(owner))
				.append($(document.createElement('td')).html(upkeep))
				.append($(document.createElement('td')).html(staff))
				.append($(document.createElement('td')).html(happy))
				.append($(document.createElement('td')).html(vault))
				.append($(document.createElement('td')).html((spouse=="Spouse is living here."?"Yes":"")))
				.append($(document.createElement('td')).html(status))
				.append($(document.createElement('td')).html(inf))
				.append($(document.createElement('td')).html(mod))
				.append($(document.createElement('td')).html(vau))
				.append($(document.createElement('td')).html(air))
				.append($(document.createElement('td')).html(kic))
				.append($(document.createElement('td')).html(mov))
				.append($(document.createElement('td')).html(sel))
				.append($(document.createElement('td')).html(lea))
				.append($(document.createElement('td')).html(giv))
				.append($(document.createElement('td')).css({'text-align':'center'}))
			);
			if (text.indexOf('/sel.png') !== -1) {
				$('#XORScriptPropertiesHouseList > tr:last > td:last').append($(document.createElement('input'))
					.attr({type:'checkbox',id:inf.attr('href').split("ID=")[1]})
				)
				.mouseover(function () {
					$('input',this).prop('checked', !($('input',this).prop('checked')));
					$(this).attr('class',($('input',this).prop('checked')?"bgAlt4":""))
				});
			}
			bg=(bg=="bgAlt1"?"bgAlt2":"bgAlt1");
		}
	});
	$('hr:eq(1)').after($(document.createElement('table'))
		.attr({'class':'data',id:'XORScriptPropertiesHouseListOptions'})
		.css({padding:'10px 0 15px 0'})
		.append($(document.createElement('thead'))
			.append($(document.createElement('tr'))
				.attr('class','bgDark ftWhite')
				.append($(document.createElement('th')).html('Action'))
				.append($(document.createElement('th')).html('Price'))
				.append($(document.createElement('th')).html('User\'s ID'))
				.append($(document.createElement('th')).html('Duration'))
				.append($(document.createElement('th')).html('Process'))
			)
		)
		.append($(document.createElement('tbody'))
			.append($(document.createElement('tr'))
				.attr('class','bgAlt1')
				.append($(document.createElement('td'))
					.append($(document.createElement('select'))
						.attr('id','XORScriptPropActionAction')
						.append($(document.createElement('option')).val('0').html('Please Select'))
						.append($(document.createElement('option')).val('1').html('Sell to System'))
						.append($(document.createElement('option')).val('2').html('Sell to Market'))
						.append($(document.createElement('option')).val('3').html('Lease to Someone'))
						.append($(document.createElement('option')).val('4').html('Add to Rental Market'))
						.append($(document.createElement('option')).val('5').html('Give to Someone'))
						.change(function() {
							var select = $('#XORScriptPropActionAction').val();
							switch (select) {
								case '1':
									$("#XORScriptPropActionPrice").prop('disabled', true);
									$("#XORScriptPropActionTime").prop('disabled', true);
									$("#XORScriptPropActionXID").prop('disabled', true);
									break;
								case '2':
									$("#XORScriptPropActionPrice").prop('disabled', false);
									$("#XORScriptPropActionTime").prop('disabled', true);
									$("#XORScriptPropActionXID").prop('disabled', true);
									break;
								case '3':
									$("#XORScriptPropActionPrice").prop('disabled', false);
									$("#XORScriptPropActionTime").prop('disabled', false);
									$("#XORScriptPropActionXID").prop('disabled', false);
									break;
								case '4':
									$("#XORScriptPropActionPrice").prop('disabled', false);
									$("#XORScriptPropActionTime").prop('disabled', false);
									$("#XORScriptPropActionXID").prop('disabled', true);
									break;
								case '5':
									$("#XORScriptPropActionPrice").prop('disabled', true);
									$("#XORScriptPropActionTime").prop('disabled', true);
									$("#XORScriptPropActionXID").prop('disabled', false);
									break;
								default:
									$("#XORScriptPropActionPrice").prop('disabled', true);
									$("#XORScriptPropActionTime").prop('disabled', true);
									$("#XORScriptPropActionXID").prop('disabled', false);
									break;
							}
							$("#XORScriptPropActionPrice").parent().attr('class','bgAlt'+($("#XORScriptPropActionPrice").prop('disabled')?'4':'5'));
							$("#XORScriptPropActionTime").parent().attr('class','bgAlt'+($("#XORScriptPropActionTime").prop('disabled')?'4':'5'));
							$("#XORScriptPropActionXID").parent().attr('class','bgAlt'+($("#XORScriptPropActionXID").prop('disabled')?'4':'5'));
						})
					)
				)
				.append($(document.createElement('td'))
					.append($(document.createElement('input')).attr('id','XORScriptPropActionPrice'))
				)
				.append($(document.createElement('td'))
					.append($(document.createElement('input')).attr('id','XORScriptPropActionXID'))
				)
				.append($(document.createElement('td'))
					.append($(document.createElement('input')).attr('id','XORScriptPropActionTime'))
				)
				.append($(document.createElement('td'))
					.append($(document.createElement('input'))
						.attr({'id':'XORScriptPropActionProcess','type':'button'})
						.val('Process!')
						.click(function(){ProcessProperties();})
					)
				)
			
			)
		)
	);
}

function ProcessProperties () {
	var action = $('#XORScriptPropActionAction').val().replace(/[^0-9]/g, '');
	var price = $('#XORScriptPropActionPrice').val().replace(/[^0-9]/g, '');
	var time = $('#XORScriptPropActionTime').val().replace(/[^0-9]/g, '');
	var XID = $('#XORScriptPropActionXID').val().replace(/[^0-9]/g, '');
	
	switch (action) {
		case '1':
			SellPropertiesToSystem();
			break;
		case '2':
			if (price < 1) {
				alert("You cannot sell for less than $1!");
			} else {
				SellPropertiesToMarket(price);
			}
			break;
		case '3':
			if (price < 1) {
				alert("You cannot Lease for less than $1!");
			} else if (XID < 1) {
				alert("You cannot Lease to an invalid ID!");
			} else if (time < 3 || time > 100) {
				alert("You can only lease between 3 and 100 days!");
			} else {
				LeasePropertySomeone(XID,price,time);
			}
			break;
		case '4':
			$("#XORScriptPropActionPrice").prop('disabled', false);
			$("#XORScriptPropActionTime").prop('disabled', false);
			if (price < 1) {
				alert("You cannot Lease for less than $1!");
			} else if (time < 3 || time > 100) {
				alert("You can only lease between 3 and 100 days!");
			} else {
				LeasePropertyMarket(price,time);
			}
			break;
		case '5':
			if (XID < 1) {
				alert("You cannot send to an invalid ID!");
			} else {
				SendProperty(XID);
			}
			break;
		default:
			alert("Please select an action!");
			break;
	}
}
function FindNextPropertyInQueue() {
	return $('input:checked',$('#XORScriptPropertiesHouseList')).attr('id');
}
function SellPropertiesToSystem() {
	var id = FindNextPropertyInQueue();
	if (id) {
		$.get("properties.php?step=sell&ID="+id, function (partA) {
			var partBurl = $('a[href^="properties.php?step=sellestate&ID="]',$(partA)).attr('href');
			$.get(partBurl, function (partB) {
				var partCurl = $('form[action^="properties.php?step=sellestate2&ID="]',$(partB)).attr('action');
				$.post(partCurl,{},function (partC) {
					if (partC.indexOf("You have sold your ") !== -1) {
						var s = partC.indexOf("You have sold your ");
						var e = partC.indexOf("!",s);
						$('#'+id).parent().parent().empty().append($(document.createElement('td')).attr('colspan',18).html(partC.substr(s,e-s)+"!"));
						SellPropertiesToSystem();
					}
					else {
						$('#'+id).parent().parent().empty().append($(document.createElement('td')).attr('colspan',18).html("Error Occurred!"));
					}
				});
			});
		});
	}
}
function SellPropertiesToMarket(price) {
	var id = FindNextPropertyInQueue();
	if (id) {
		$.get("properties.php?step=sell&ID="+id, function (partA) {
			var partBurl = $('form[action^="properties.php?step=sell2&ID="]',$(partA)).attr('action');
			$.post(partBurl,{'money':price}, function (partB) {
				var partCurl = $('form[action^="properties.php?step=sell3&ID="]',$(partB)).attr('action');
				$.post(partCurl,{'money':price},function (partC) {
					if (partC.indexOf("You have put your ") !== -1) {
						var s = partC.indexOf("You have put your ");
						var e = partC.indexOf("!",s);
						$('#'+id).parent().parent().empty().append($(document.createElement('td')).attr('colspan',18).html(partC.substr(s,e-s)+"!"));
						SellPropertiesToMarket(price);
					}
					else {
						$('#'+id).parent().parent().empty().append($(document.createElement('td')).attr('colspan',18).html("Error Occurred!"));
					}
				});
			});
		});
	}
}
function LeasePropertySomeone(XID,price,time) {
	var id = FindNextPropertyInQueue();
	if (id) {
		$.post("properties.php?step=leaseperson&ID="+id,{'money':price,'userID':XID,'days':time}, function (partA) {
			var partBurl = $('form[action^="properties.php?step=leaseperson&ID="]',$(partA)).attr('action');
			$.post(partBurl,{'money':price,'userID':XID,'days':time}, function (partB) {
				if (partB.indexOf("Offer has now been sent") !== -1) {
					var s = partB.indexOf("Offer has now been sent");
					var e = partB.indexOf("an event.",s);
					$('#'+id).parent().parent().empty().append($(document.createElement('td')).attr('colspan',18).html(partB.substr(s,e-s)+"an event."));
					LeasePropertySomeone(XID,price,time);
				}
				else {
					$('#'+id).parent().parent().empty().append($(document.createElement('td')).attr('colspan',18).html("Error Occurred!"));
					alert(partB.substr(partB.length-500));
				}
			});
		});
	}
}
function LeasePropertyMarket(price,time) {
	var id = FindNextPropertyInQueue();
	if (id) {
		$.post("properties.php?step=leasemarket&ID="+id,{'money':price,'days':time}, function (partA) {
			var partBurl = $('form[action^="properties.php?step=leasemarket&ID="]',$(partA)).attr('action');
			$.post(partBurl,{'money':price,'days':time}, function (partB) {
				if (partB.indexOf("Your <b>") !== -1) {
					var s = partB.indexOf("Your <b>");
					var e = partB.indexOf("rental market.",s);
					$('#'+id).parent().parent().empty().append($(document.createElement('td')).attr('colspan',18).html(partB.substr(s,e-s)+"rental market."));
					LeasePropertyMarket(price,time);
				}
				else {
					$('#'+id).parent().parent().empty().append($(document.createElement('td')).attr('colspan',18).html("Error Occurred!"));
				}
			});
		});
	}
}
function SendProperty(XID) {
	var id = FindNextPropertyInQueue();
	if (id) {
		$.get("properties.php?step=give&ID="+id, function (partA) {
			var partBurl = $('form[action^="properties.php?step=give2&ID="]',$(partA)).attr('action');
			$.post(partBurl,{'userID':XID}, function (partB) {
				var partCurl = $('form[action^="properties.php?step=give3&ID="]',$(partB)).attr('action');
				$.post(partCurl,{'userID':XID},function (partC) {
					if (partC.indexOf("You have given your") !== -1) {
						var s = partC.indexOf("You have given your");
						var e = partC.indexOf("!",s);
						$('#'+id).parent().parent().empty().append($(document.createElement('td')).attr('colspan',18).html(partC.substr(s,e-s)+"!"));
						SendProperty(XID);
					}
					else {
						$('#'+id).parent().parent().empty().append($(document.createElement('td')).attr('colspan',18).html("Error Occurred!"));
					}
				});
			});
		});
	}
}
