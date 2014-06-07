// ==UserScript==
// @name	Makaze Scripts Options Menu
// @namespace	Makaze
// @include	*
// @grant	none
// @version	1.0.2
// ==/UserScript==

var MakazeScriptStyles,
styleElem,
opts,
opt,
optsMenu,
i = 0;

function createElement(type, callback) {
	var element = document.createElement(type);

	callback(element);

	return element;
}

function empty(elem) {
	while (elem.hasChildNodes()) {
		elem.removeChild(elem.lastChild);
	}
}

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

function fade(elem, type, speed) {
	var defaultOpacity,
	currentDisplay = elem.style.display || window.getComputedStyle(elem).display;

	elem.style.opacity = '';
	defaultOpacity = window.getComputedStyle(elem).opacity;
	elem.style.opacity = 0;

	// Default values:

	switch (arguments.length) {
		case 1:
			type = 'toggle';
		case 2:
			speed = 300;
		break;
	}

	switch (type) {
		case 'in':
			elem.style.display = '';
			setTimeout(function() {
				elem.style.transition = 'all ' + speed + 'ms ease-in-out';
				elem.style.opacity = defaultOpacity;
				setTimeout(function() {
					elem.style.transition = '';
					elem.style.opacity = '';
				}, speed + 10);
			}, 1);
		break;
		case 'out':
			elem.style.transition = '';
			elem.style.opacity = defaultOpacity;
			elem.style.transition = 'all ' + speed + 'ms ease-in-out';
			elem.style.opacity = 0;
			setTimeout(function() {
				elem.style.display = 'none';
				elem.style.transition = '';
				elem.style.opacity = '';
			}, speed + 10);
		break;
		case 'toggle':
		default:
			if (currentDisplay === 'none') {
				elem.style.display = '';
				setTimeout(function() {
					elem.style.transition = 'all ' + speed + 'ms ease-in-out';
					elem.style.opacity = defaultOpacity;
					setTimeout(function() {
						elem.style.transition = '';
						elem.style.opacity = '';
					}, speed + 10);
				}, 1);
			} else {
				elem.style.transition = '';
				elem.style.opacity = defaultOpacity;
				elem.style.transition = 'all ' + speed + 'ms ease-in-out';
				elem.style.opacity = 0;
				setTimeout(function() {
					elem.style.display = 'none';
					elem.style.transition = '';
					elem.style.opacity = '';
				}, speed + 10);
			}
	}
}

if (document.body.id === 'ipboard_body') {
	opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {};
	optsMenu = createElement('div', function(menu) {
		var evt;

		menu.id = 'MakazeScriptOptions_menu';
		menu.className = 'MakazeScriptMenu';
		menu.style.display = 'none';

		menu.appendChild(createElement('select', function(select) {
			select.id = 'MakazeScriptOptions_menu_opts';

			var onSelectOptHandler = function() {
				var select = this,
				opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
				opt = (opts.hasOwnProperty(select.options[select.selectedIndex].value)) ? opts[select.options[select.selectedIndex].value] : select.options[select.selectedIndex].value,
				content = document.getElementById('MakazeScriptOptions_menu_content');

				empty(content);

				if (opt === 'null') {
					return false;
				}

				if (opt === 'new_option') {
					content.appendChild(createElement('div', function(table) {
						table.style.display = 'table';
						table.style.width = '100%';
						table.style.height = '100%';

						table.appendChild(createElement('span', function(cell) {
							cell.style.display = 'table-cell';
							cell.style.paddingRight = '5px';
							cell.appendChild(createElement('input', function(name) {
								name.id = 'new_option_name';
								name.type = 'text';
								name.placeholder = 'Option name';
							}));
						}));

						table.appendChild(createElement('span', function(cell) {
							cell.style.display = 'table-cell';
							cell.style.paddingRight = '5px';
							cell.appendChild(createElement('select', function(type) {
								type.id = 'new_option_type';
								type.options[0] = new Option('String', 'string');
								type.options[1] = new Option('Boolean', 'boolean');
								type.options[2] = new Option('Number', 'number');

								var newOptChangeHandler = function() {
									var select = this,
									newOptContent = document.getElementById('new_option_content');

									empty(newOptContent);

									switch (select.options[select.selectedIndex].value) {
										case 'string':
											newOptContent.appendChild(createElement('textarea', function(text) {
												text.id = 'new_option_value';
												text.style.width = '100%';
												text.style.height = '100%';
												text.placeholder = 'Option value';
											}));
										break;
										case 'boolean':
											var bool = createElement('input', function(bool) {
												bool.id = 'new_option_value';
												bool.type = 'checkbox';
												bool.style.width = '25px';
												bool.style.height = '25px';
												bool.title = bool.checked.toString().capitalize();
												bool.onclick = function() {
													this.title = this.checked.toString().capitalize();
													this.nextSibling.nodeValue = ' ' + this.checked.toString().capitalize();
												};
											});

											newOptContent.appendChild(bool);
											newOptContent.appendChild(document.createTextNode(' ' + bool.checked.toString().capitalize()));
										break;
										case 'number':
											newOptContent.appendChild(createElement('input', function(num) {
												num.id = 'new_option_value';
												num.type = 'number';
												num.style.width = '100%';
											}));
										break;
									}
								};

								type.addEventListener('change', newOptChangeHandler, false);
							}));
						}));

						table.appendChild(createElement('span', function(cell) {
							cell.style.display = 'table-cell';
							cell.id = 'new_option_content';
							cell.style.width = '100%';
							cell.appendChild(createElement('textarea', function(text) {
								text.id = 'new_option_value';
								text.style.width = '100%';
								text.style.height = '100%';
								text.placeholder = 'Option value';
							}));
						}));
					}));
					return false;
				}

				switch (typeof opt) {
					case 'boolean':
						var check = createElement('input', function(check) {
							check.type = 'checkbox';
							check.style.width = '25px';
							check.style.height = '25px';
							check.checked = opt;
							check.title = check.checked.toString().capitalize();
							check.onclick = function() {
								this.title = this.checked.toString().capitalize();
								this.nextSibling.nodeValue = ' ' + this.checked.toString().capitalize();
							};
						});

						content.appendChild(check);
						content.appendChild(document.createTextNode(' ' + check.checked.toString().capitalize()));
					break;
					case 'string':
						content.appendChild(createElement('textarea', function(text) {
							text.style.width = '100%';
							text.style.height = '100%';
							text.value = opt;
						}));
					break;
					case 'number':
						content.appendChild(createElement('input', function(num) {
							num.type = 'number';
							num.value = opt;
						}));
					break;
					default:
						content.appendChild(document.createTextNode('Available actions: Delete Option'));
				}
			};

			select.addEventListener('change', onSelectOptHandler, false);
		}));

		menu.appendChild(createElement('div', function(buttons) {
			buttons.style.float = 'right';

			buttons.appendChild(createElement('a', function(del) {
				del.id = 'MakazeScriptOptions_menu_deleteopt';
				del.className = 'ipsButton_secondary';
				del.href = 'javascript:void(0)';
				del.style.marginRight = '10px';
				del.appendChild(document.createTextNode('Delete Option'));

				del.onclick = function() {
					var select = document.getElementById('MakazeScriptOptions_menu_opts'),
					opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
					opt = select.options[select.selectedIndex].value,
					i = 0;

					if (opt === 'null') {
						return false;
					}

					if (opt === 'new_option') {
						select.selectedIndex = 0;

						if ("createEvent" in document) {
							evt = document.createEvent("HTMLEvents");
							evt.initEvent("change", false, true);
							select.dispatchEvent(evt);
						} else {
							select.fireEvent("onchange");
						}

						return false;
					}

					delete opts[opt];

					localStorage.setItem('MakazeScriptOptions', JSON.stringify(opts));

					empty(select);

					select.options[i] = new Option('Select an option...', null);
					i++;

					for (opt in opts) {
						if (opts.hasOwnProperty(opt)) {
							optsMenu.getElementsByTagName('select')[0].options[i] = new Option(opt.toString(), opt.toString());
							i++;
						}
					}

					select.options[i] = new Option('New option...', 'new_option');

					select.selectedIndex = 0;

					if ("createEvent" in document) {
						evt = document.createEvent("HTMLEvents");
						evt.initEvent("change", false, true);
						select.dispatchEvent(evt);
					} else {
						select.fireEvent("onchange");
					}
				};
			}));

			buttons.appendChild(createElement('a', function(save) {
				save.id = 'MakazeScriptOptions_menu_saveopt';
				save.className = 'ipsButton_secondary';
				save.href = 'javascript:void(0)';
				save.style.marginRight = '10px';
				save.appendChild(document.createTextNode('Save Option'));

				save.onclick = function() {
					var select = document.getElementById('MakazeScriptOptions_menu_opts'),
					opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
					opt = (opts.hasOwnProperty(select.options[select.selectedIndex].value)) ? opts[select.options[select.selectedIndex].value] : select.options[select.selectedIndex].value,
					content = document.getElementById('MakazeScriptOptions_menu_content'),
					i = 0;

					if (opt === 'null') {
						return false;
					}

					if (opt === 'new_option') {
						switch (document.getElementById('new_option_value').tagName) {
							case 'INPUT':
								switch(document.getElementById('new_option_value').type) {
									case 'checkbox':
										opts[document.getElementById('new_option_name').value] = document.getElementById('new_option_value').checked;
									break;
									case 'number':
										opts[document.getElementById('new_option_name').value] = parseInt(document.getElementById('new_option_value').value);
									break;
								}
							break;
							case 'TEXTAREA':
								opts[document.getElementById('new_option_name').value] = document.getElementById('new_option_value').value;
							break;
						}

						localStorage.setItem('MakazeScriptOptions', JSON.stringify(opts));

						empty(select);

						select.options[i] = new Option('Select an option...', null);
						i++;

						for (opt in opts) {
							if (opts.hasOwnProperty(opt)) {
								optsMenu.getElementsByTagName('select')[0].options[i] = new Option(opt.toString(), opt.toString());
								i++;
							}
						}

						select.options[i] = new Option('New option...', 'new_option');

						select.selectedIndex = 0;

						if ("createEvent" in document) {
							evt = document.createEvent("HTMLEvents");
							evt.initEvent("change", false, true);
							select.dispatchEvent(evt);
						} else {
							select.fireEvent("onchange");
						}

						return false;
					}

					switch (typeof opt) {
						case 'boolean':
							opts[select.options[select.selectedIndex].value] = content.getElementsByTagName('input')[0].checked;
						break;
						case 'string':
							opts[select.options[select.selectedIndex].value] = content.getElementsByTagName('textarea')[0].value;
						break;
						case 'number':
							opts[select.options[select.selectedIndex].value] = parseInt(content.getElementsByTagName('input')[0].value);
						break;
					}

					localStorage.setItem('MakazeScriptOptions', JSON.stringify(opts));
				};
			}));

			buttons.appendChild(createElement('a', function(close) {
				close.id = 'MakazeScriptOptions_menu_close';
				close.className = 'ipsButton_secondary';
				close.href = 'javascript:void(0)';
				close.appendChild(document.createTextNode('Close'));

				close.onclick = function() {
					fade(document.getElementById('MakazeScriptOptions_menu'), 'out');
				};
			}));
		}));

		menu.appendChild(createElement('div', function(table) {
			table.style.display = 'table';
			table.style.width = '100%';
			table.style.height = '100%';
			table.style.marginTop = '1em';

			table.appendChild(createElement('div', function(content) {
				content.id = 'MakazeScriptOptions_menu_content';
				content.style.height = '100px';
				content.style.display = 'table-cell';
				content.style.verticalAlign = 'middle';
				content.style.textAlign = 'center';
			}));
		}));
	});

	i = 0;

	optsMenu.getElementsByTagName('select')[0].options[i] = new Option('Select an option...', null);
	i++;

	for (opt in opts) {
		if (opts.hasOwnProperty(opt)) {
			optsMenu.getElementsByTagName('select')[0].options[i] = new Option(opt.toString(), opt.toString());
			i++;
		}
	}

	optsMenu.getElementsByTagName('select')[0].options[i] = new Option('New option...', 'new_option');

	// Styling

	if (document.getElementById('MakazeScriptStyles') == null) {
		MakazeScriptStyles = createElement('style', function(style) {
			style.id = 'MakazeScriptStyles';
			style.type = 'text/css';
		});
		document.head.appendChild(MakazeScriptStyles);
	}

	styleElem = document.getElementById('MakazeScriptStyles');

	if (styleElem.hasChildNodes()) {
		styleElem.childNodes[0].nodeValue += '\n\n';
	} else {
		styleElem.appendChild(document.createTextNode(''));
	}

	if (!styleElem.childNodes[0].nodeValue.match('.MakazeScriptMenu')) {
		styleElem.childNodes[0].nodeValue += '.MakazeScriptMenu { position: fixed; z-index: 99999; top: 50%; left: 50%; padding: 10px; background-color: rgba(255, 255, 255, .85); box-shadow: 0px 0px 3px #888; border-radius: 5px; }  .MakazeScriptMenu th { font-weight: bolder; }  .MakazeScriptMenu th, .MakazeScriptMenu td { padding: 3px; }  .MakazeScriptMenu .menu-save { text-align: center; margin-top: 6px; }  .MakazeScriptMenu .menu-save > a { padding: 2px 10px; border: 1px solid #ccc; border-radius: 3px; font-weight: bolder; cursor: pointer; }  .MakazeScriptMenu .menuTitle { margin-bottom: 10px; font-weight: bolder; }  .MakazeScriptMenu .scrollableContent { width: 312px; height: 150px; overflow: auto; padding: 2px; }  .MakazeScriptMenu textarea, .MakazeScriptMenu input[type=text], .MakazeScriptMenu input[type=number] { font-family: Consolas, Ubuntu Mono, sans-serif; font-size: 10px; color: #333; padding: 3px; box-sizing: border-box; }\n\n';
	}

	styleElem.childNodes[0].nodeValue +=
		'#MakazeScriptOptions_menu {\n' +
			'width: 500px;\n' +
			'margin-top: -78px;\n' +
			'margin-left: -260px;\n' +
		'}\n\n' +

		'#MakazeScriptOptions_menu_content * {\n' +
			'vertical-align: middle;\n' +
		'}';

	document.body.appendChild(optsMenu);

	var openMenuHandler = function(event) {
		if (event.altKey && event.shiftKey) {
			if (event.keyCode === 79) {
				fade(document.getElementById('MakazeScriptOptions_menu'));
			}
		}
	};

	document.addEventListener('keydown', openMenuHandler, false);
}