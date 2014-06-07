// Copyright (c) 2010, Deathalicious
// Released under the BSD license:
// http://www.opensource.org/licenses/bsd-license.php
//
// ==UserScript==
// @name          Gmail Dynamic Signatures
// @namespace     http://www.metafilter.com/user/25038
// @description   Allows you to enter custom signatures for each From: address
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

window.addEventListener('load', function() {
	var gmail_addresses_setting=GM_getValue('gmail_addresses'),
		default_signature_setting=GM_getValue('default_signature'),
		matching_signatures_setting=GM_getValue('matching_signatures'),
		gmail_addresses=gmail_addresses_setting ? eval(gmail_addresses_setting) : [],
		default_signature=default_signature_setting ? eval(default_signature_setting) : null,
		matching_signatures=matching_signatures_setting ? eval(matching_signatures_setting) : [],
		saveSettings = function () {
			GM_setValue('gmail_addresses',uneval(gmail_addresses));
			GM_setValue('default_signature',uneval(default_signature));
			GM_setValue('matching_signatures',uneval(matching_signatures));
		};


  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(gmail) {
		var active_view_element, 
			mailBodyElem, 
			selected_address=-1, 
			address_holder=null, 
			address_select=null,
			setMatchingSig = function(address,sig) {
				var sig_to_set = -1, 
					i = 0;
				if (address.indexOf('@') === -1) {
					throw "The address given wasn't a valid e-mail address.";
				}
				for (i=0; i < gmail_addresses.length; i++) {
					if (gmail_addresses[i]===address) {
						sig_to_set=i;
					}
				}
				for (i=(matching_signatures.length); i < sig_to_set; i++) {
					matching_signatures[i]='';
				}
				matching_signatures[sig_to_set]=sig;
			},
			getMatchingSig = function(selected_address) {
				var sig_to_use = -1, 
					i = 0,
					sig = '';
				for (i=0; i < gmail_addresses.length; i++) {
					if (gmail_addresses[i]===selected_address && i <= matching_signatures.length) {
						sig_to_use=i;
					}
				}
				if (sig_to_use===-1) {
					sig=default_signature;
				} else {
					sig=matching_signatures[sig_to_use];
				}
				return sig;
			},
			updateSettings = function (e) {
				var address=$(this).find("select").val(),
					addresses=$(this).find("select")[0].options,
					sig=$(this).find("textarea").val(),
					matching_address=-1,
					i = 0;
				for (i=0; i < addresses.length; i++) {
					if (addresses[i].value.indexOf('@') !== -1) {
						gmail_addresses[i]=addresses[i].value;
					}
				}
				if (address=='(default)') {
					default_signature=sig;
				} else {
					for (i=0; i < gmail_addresses.length; i++) {
						if (gmail_addresses[i]==address) {
							matching_address=i;
						}
					}
					if (matching_address===-1) {
						matching_address=gmail_addresses.length;
						gmail_addresses[matching_address]=address;
					}
					setMatchingSig(address,sig);
				}
				saveSettings();				
				$(this).hide().empty();
				e.stopPropagation(); 
				return false;
			},
			$settings_element=$("<form method='post'>").submit(updateSettings),
			showSettings = function (e) {
				var i = 0,
					$fieldset=$("<fieldset>").append($("<legend>").html("Custom signature")).appendTo($settings_element),
					$select=$("<select name='setting_address'>").val(" Update Signature ").appendTo($fieldset).change(function (e) {
						var entry=null, 
							selected_idx=this.selectedIndex,
							selected_value=this.options[selected_idx].value,
							$sig_field=$(this).parent().find("textarea");
						if (selected_value==='(new)') {
							entry=window.prompt('New email address:\n(NOTE: If you add an address that isn\'t configured in GMail. It isn\'t going ot work.');
							if (entry && entry.length && entry.indexOf('@')!==-1) {
								this.options[this.selectedIndex] = new Option(entry,entry);
								this.options[this.options.length] = new Option('New address...','(new)');
								this.selectedIndex=selected_idx;
							} else if (entry && entry.length > 0 && entry.indexOf('@') === -1) {
								window.alert("That's not a valid email address.");
								this.selectedIndex=$(this).attr('old_selected_index');
							} else {
								this.selectedIndex=$(this).attr('old_selected_index');
							}
						} else if (selected_value=='(default)') {
							$sig_field.val(default_signature);
						} else {
							$sig_field.val(getMatchingSig(selected_value));
						}
						e.stopPropagation();
						return false;
					}).after('<br>').css({ fontSize: '13px', margin: '0.25em 0'}),
					$sig_entry=$("<textarea name='setting_sig' rows='8' cols='80'>").appendTo($fieldset).css('width','100%').after('<br>'),
					$button=$("<input type='submit'>").val(" Update Signature ").appendTo($fieldset).css({ fontSize: '13px', margin: '0.25em 0'}),
					$cancel=$("<input type='button'>").val(' Cancel ').click(function (e) {
						$settings_element.hide().empty();
						e.stopPropagation(); 
						return false;
					}).appendTo($fieldset).css({ fontSize: '13px', margin: '0.25em 0', float: 'right'});
				$("<div>").css({
					fontFamily: 'verdana,arial,sans-serif',
					fontSize: '11px',
					fontWeight: 'bold',
					color: '#333'
				}).html("Only one signature is saved at a time. If you change one signature and then choose a different address,<br>that signature will not be updated.").appendTo($fieldset);
				$settings_element.show().insertAfter(address_holder).css({
						position: 'fixed',
						top: '25%',
						left: '20%',
						zIndex: 80000,
						background: 'white',
						padding: '0.5em',
						border: '2px solid #006'
					});
				$select.append(new Option('(default)',"[Default signature]"));
				if (gmail_addresses.length) {
					for (i=0; i < gmail_addresses.length; i++) {
						if (gmail_addresses[i] && gmail_addresses[i].length) {
							$select.append(new Option(gmail_addresses[i],gmail_addresses[i]));
						}
					}
				} else if (address_select && address_select.options && address_select.options.length) {
					for (i=0; i < address_select.options.length; i++) {
						$select.append(new Option(address_select.options[i].value,address_select.options[i].value));
					}
				} else {
					$select.append(new Option(selected_address,selected_address));
				}
				$select.append(new Option('New address...','(new)'));
				$select.val(selected_address);
				$select.attr('old_selected_index',$select[0].selectedIndex);
				$sig_entry.val(getMatchingSig($select.val()));
				e.stopPropagation();
				return false;
			},
			$open_settings=$("<a href='Custom Signature'>").html('Custom Signature').css({
				paddingLeft: '1em',
				fontFamily: 'verdana,arial,sans-serif',
				fontSize: '10px',
				color: 'red'
			}).click(showSettings),
			updateSig = function(chosen_address) {
				var sig = '', 
					was_changed=false, 
					updated_content='', 
					replace_expr='', 
					replace_regex=null, 
					current_scroll=mailBodyElem.scrollTop,
					current_slctnstart=0,
					current_slctnend=0,
					i = 0;
				if (selected_address === chosen_address) {
					return true;
				} else {
					selected_address=chosen_address;
				}
				try {
					current_slctnstart=mailBodyElem.selectionStart;
					current_slctnend=mailBodyElem.selectionEnd;
				} catch (e) {
					// do nothing
				}
				sig=getMatchingSig(selected_address);
				if (mailBodyElem && mailBodyElem.value) {
					updated_content=''+mailBodyElem.value+'';
					if (default_signature && default_signature.length) {
						replace_expr=default_signature;
						replace_expr=replace_expr.replace(/([\[\]+*?\{\}])/g,'\\$1'); // escape anything used in RegEx
						replace_expr=replace_expr.replace(/\s+$/g,''); // Trim any whitespace from end
						replace_expr=replace_expr.replace(/\s+/g,'\\s+'); // Replace all instances of whitespace with a whitespace search (deals with line ending issues)
						replace_expr+='\\s*$'; // add a whitespace search at the end (to get rid of excess whitespace at the end and to make sure that we don't replace any mid-body sigs
						replace_regex=new RegExp(replace_expr);
						if (updated_content.match(replace_regex)) {
							updated_content=updated_content.replace(replace_regex,sig);
							was_changed=true;
						}
					}
					if (!was_changed) {
						for (i=0; i < matching_signatures.length; i++) {
							replace_expr=matching_signatures[i];
							replace_expr=replace_expr.replace(/([\[\]+*?\{\}])/g,'\\$1'); // escape anything used in RegEx
							replace_expr=replace_expr.replace(/\s+$/g,''); // Trim any whitespace from end
							if (replace_expr.length) {
								replace_expr=replace_expr.replace(/\s+/g,'\\s+'); // Replace all instances of whitespace with a whitespace search (deals with line ending issues)
								replace_expr+='\\s*$'; // add a whitespace search at the end (to get rid of excess whitespace at the end and to make sure that we don't replace any mid-body sigs
								replace_expr=replace_expr;
								replace_regex=new RegExp(replace_expr);
								if (updated_content.match(replace_regex)) {
									updated_content=updated_content.replace(replace_regex,sig);
									was_changed=true;
									break;
								}
							}
						}
					}
					if (!was_changed) {
						updated_content+=sig;
					}
					if (mailBodyElem.value != updated_content) {
						mailBodyElem.value=updated_content;
						mailBodyElem.scrollTop=current_scroll;
						try {
							mailBodyElem.selectionStart=current_slctnstart >= 0 ? current_slctnstart : 0;
							mailBodyElem.selectionEnd=current_slctnend >= 0 ? current_slctnend : 0;
						} catch (e) {
							//do nothing
						}
					}
				}
				
			},
			chooseSig = function () {
				updateSig(this.options[this.selectedIndex].value);
			}, 
			reset = function () {
				mailBodyElem=null;
				selected_address=-1;
				address_holder=null; 
				address_select=null;
			},
			setup = function() {
				var sels=null,
					txtareas=null,
					inpts=null, 
					chosen_email=-1,
					prnt=null,
					i = 0;
	
				active_view_element=gmail.getActiveViewElement();
				mailBodyElem=null;
				txtareas=active_view_element.getElementsByTagName('textarea');
				for (i=txtareas.length-1; i >= 0 ; i--) {
					if (txtareas[i].name==='body') {
						mailBodyElem=txtareas[i];
						break;
					}
				}
	
				address_holder=null;
				address_select=null;
				sels=active_view_element.getElementsByTagName('select');
				for (i=sels.length-1; i >= 0 ; i--) {
					if (sels[i].name==='from') {
						address_select=sels[i];
						address_select.addEventListener('change',chooseSig,true);
						address_holder=sels[i];
						break;
					}
				}

				if (chosen_email==-1 && address_select) {
					chosen_email=address_select.options[address_select.selectedIndex].value;
				}
	
				if (!address_holder) {
					inpts=active_view_element.getElementsByTagName('input');
					for (i=inpts.length-1; i >= 0 ; i--) {
						if (inpts[i].name==='from') {
							address_holder=inpts[i];
							break;
						}
					}
				}
				if (chosen_email == -1 && address_holder && address_holder.value) {
					chosen_email=address_holder.value;
				}

				if (address_holder) {
					$(address_holder).after($open_settings);
					if (chosen_email.length) {
						updateSig(chosen_email);
					}
				}
			};

		gmail.registerViewChangeCallback(function() {
			var vt=gmail.getActiveViewType();
			reset();
			if (vt==='co' || vt==='cv') {
				setup();
			}
		});
		setup();
		window.setInterval(setup,5000);

    });
  }
}, true);