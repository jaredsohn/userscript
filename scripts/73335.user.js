// ==UserScript==
// @name            Popmundo Expand Names
// @namespace       http://popodeus.com
// @description     Converts short names (from format "J. Doe" to "John Doe") in certain views and adds a convenient Auto-interact for the telephone.
// @include         http://*.popmundo.com/Common/CharacterDetails.asp?action=Relations&CharacterID=*
// @include         http://*.popmundo.com/Common/Telephone.asp
// @include         http://*.popmundo.com/Common/Telephone.asp?action=PhoneBook
// @copyright       http://popodeus.com/
// @version         2.6
// @require         http://usocheckup.redirectme.net/73335.js
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @grant           GM_log
// @grant           GM_addStyle
// ==/UserScript==

function $xx(root, xpath) {
	if (!xpath) {
		xpath = root;
		root = document;
	}
	//GM_log('XX! ' + xpath);
	return document.evaluate(xpath, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function $x(root, xpath) {
	var elem = $xx(root, xpath);
	if (elem) return elem.snapshotItem(0);
	return null;
}

var W_SCRIPT_NOT_RUNNING_INIT = 'Script not running. Click button to start or <a target="_blank" href="http://userscripts.org/scripts/show/73335">read the script help</a>.'
var W_AUTOINTERACT = 'Auto-interact';
var W_SCRIPT_RUNNING = "Script is running... Press button to pause.";
var W_SCRIPT_NOT_RUNNING = "Script is not running. Press button to resume.";
var W_SCRIPT_FINISHED = "Script has finished. Come back tomorrow!";
var W_DISABLE = 'Disable Auto-interact features';
var W_ENABLE = 'Enable Auto-interact features';
var W_INTERACTION_DELAY = 'second delay between phone calls';
var W_CALL_SAME_CITY = 'Call characters in the same city';

function getWord(word) {
	return word;
}

function getInteractUrl(othercharacter, interactiontype) {
	var server = document.location.href.match(/www(\d+)\.popmundo/)[1];
	return 'http://www'+server+'.popmundo.com/Common/Interact.asp?action=PhoneInteract&LocaleID=0' +
		   '&CharacterID='+othercharacter+
		   '&InteractionTypeID='+interactiontype;
	
}
function prepare() { 
	var sel;
	var idx = 0;
	var theselects = $xx('//form//select[@title]');
	while (sel = theselects.snapshotItem(idx++)) {
		var parent = sel.parentNode.parentNode;
		var color = window.getComputedStyle(sel, null).color;
		var rgbacolor = color.replace(/rgb\(/, 'rgba(').replace(/\)/, ', .2)');
		var bgcolor = '-moz-linear-gradient(left, rgba(255, 255, 255, 0), ' + rgbacolor + ')';
		
		if (sel.value > 0) {
			var hasBolds = parent.parentNode.cells[1].getElementsByTagName('b').length;
			
			var sc = $x('//input[@name="samecity"]').checked;
			parent.style.background = bgcolor; 
			parent.style.borderRight = '1px dotted ' + color; 
			if (hasBolds) {
				//parent.style.background = 'rgba(255, 255, 255, .3)'; 
			}
		} else {
			parent.style.backgroundColor = 'transparent';
		}
		//parent.parentNode.style.border = '1px solid orange';
	}
}

var b1, b2;

GM_addStyle('a div.city { color:black } ' +
			'#ai-delayer {  } ' +
			'.iid-0 { color: #888 } ' +
			'.iid-24 { color: #080 } ' + 
			'.iid-61 { color: #080 } ' +
			'.iid-25 { color: #828 } ' +
			'.iid-73 { color: #628 } ' +
			'.iid-74 { color: #628 } ' +
			'.iid-58 { color: #080 } ' +
			'.iid-26 { color: #080 } ' +
			'.iid-121 { color: #080 } ' +
			'.iid-46 { color: #800 } ' +
			'.iid-157 { color: #633 } ' +
			'select.ai { border: 1px solid #908F8D } ' 
		);
var curr = $x('//td[@width="353" and @colspan="2" and @valign="top"]/a[position() = last()]/b');
var currentCity = curr ? curr.textContent : '';
var nodes = $xx('//a[contains(@href, "action=view&CharacterID=") and @title]')
var pos = 0;
while (n = nodes.snapshotItem(pos++)) {
	var title = n.title;
	if (title.indexOf(" (") > 0) {
		var mmmbop = title.match(/(.+)\s+\(([^)]+)\)/);
		if (mmmbop) {
			if (currentCity == mmmbop[2]) {
				b1 = '<b>';
				b2 = '</b>'
			} else { b1 = b2 = '' }
			n.innerHTML = b1 + mmmbop[1] + b2 + '<div class="city">' + b1 + mmmbop[2] + b2 + '</div>';
			n.title = '';
		} else {
			n.innerHTML = n.title;
		}
	}
}

// for Telephone.asp
if (location.href.indexOf('elephone.asp') > 0) {
	var isEnabled = GM_getValue('enabled', true);

	var interacts = {
		0: '- no action -',
		24: 'Wazzup',
		61: 'Friendly text',
		25: 'Lovercall',
		73: 'Flirty phone call',
		74: 'Flirty text',
		58: 'Funny pics MMS',
		26: 'Prank Call',
		121: 'Gossip',
		46: 'Kiss my ass call',
		157: "It's not you, it's me"
	}
	var opthtml = '';
	for (var i in interacts) {
		opthtml += '<option class="iid-'+i+'" value="'+i+'">' + interacts[i] + '</option>\n';
	}

	nodes = $xx('//a[@href="javascript:void(0)"]');
	pos = 0;
	while (n = nodes.snapshotItem(pos++)) {
		var charid = n.getAttribute('onClick').match(/meny\('X(\d+)'\)/)[1];
		var name = n.title.split(" - ", 2)[0];
		n.innerHTML = name;
		
		if (isEnabled) {
			var span = document.createElement('div');
			span.innerHTML = '<select class="ai" name="'+charid+'" title="'+name+'">' + opthtml + '</select>';
			n.parentNode.appendChild(span);
		}
	}
	
	if (isEnabled) {
		// When the Popmundo game form is submitted, remove any select components we've added to the page
		// so we don't disrupt any of the normal operation
		$x('//input[@type="submit"]').addEventListener('click', function() { 
			i = 0;
			var sel, sels = $xx('//select[@title]');
			while (sel = sels.snapshotItem(i++)) {
				sel.parentNode.removeChild(sel);
			}
		}, true);
		
		function valueChanged(boo) {
			var sel = boo.target;
			GM_log(sel.name + ' => ' + sel.value);
			var key = 'autointeract,' + sel.name;
			if (sel.value == 0) {
				GM_deleteValue(key)
			} else {
				GM_setValue(key, sel.value)
			}
			sel.setAttribute('class', 'ai iid-'+sel.value);
			prepare();
		}
		
		i = 0;
		var sel, sels = $xx('//select[@title]');
		while (sel = sels.snapshotItem(i++)) {
			var presel = GM_getValue('autointeract,' + sel.name, 0);
			sel.value = presel;
			sel.setAttribute('class', 'ai iid-'+presel);
			sel.addEventListener('change', valueChanged, false);
		}
	}
	
	var table = $x('//table[@width="469"]');
	if (table) {
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		td.setAttribute('colspan', 4);
	
		var enableDisable = document.createElement('a');
		enableDisable.style.background = 'rgba(255, 255, 255, .4)';
		enableDisable.style.marginTop = '1em';
		enableDisable.style.display = 'block';
		enableDisable.style.borderLeft = '5px solid ' + (isEnabled ? 'magenta' : 'lime');
		enableDisable.style.paddingLeft = '5px';
		enableDisable.href = 'Telephone.asp';
		enableDisable.innerHTML = isEnabled ? getWord(W_DISABLE) : getWord(W_ENABLE); 
		enableDisable.addEventListener('click', function() {
			GM_setValue('enabled', !isEnabled);
		}, false);

		td.appendChild(enableDisable);
		tr.appendChild(td);
		table.appendChild(tr);

		if (isEnabled) {
			var button = document.createElement('button');
			button.innerHTML = getWord(W_AUTOINTERACT);
			button.style.marginTop = '1em';

			var delayer = document.createElement('select');
			delayer.setAttribute('class', 'ai');
			delayer.id = 'ai-delayer';
			delayer.options[delayer.options.length] = new Option(5);
			delayer.options[delayer.options.length] = new Option(7);
			delayer.options[delayer.options.length] = new Option(10);
			delayer.options[delayer.options.length] = new Option(15);
			delayer.options[delayer.options.length] = new Option(20);
			delayer.options[delayer.options.length] = new Option(30);
			delayer.value = GM_getValue('delay', 10);
			delayer.addEventListener('change', function() {
				GM_setValue('delay', delayer.value);
			}, false);
			
			var samecity = document.createElement('input');
			samecity.type = 'checkbox';
			samecity.name = 'samecity';
			samecity.addEventListener('click', prepare, false);

			var settings = document.createElement('div');
			settings.style.background = 'rgba(200, 255, 200, .4) top left repeat-y';
			settings.style.paddingLeft = '16px';
			
			settings.appendChild(samecity);
			settings.appendChild(document.createTextNode(' '));
			settings.appendChild(document.createTextNode(getWord(W_CALL_SAME_CITY)));
			settings.appendChild(document.createElement('br'));

			settings.appendChild(delayer);
			settings.appendChild(document.createTextNode(' '));
			settings.appendChild(document.createTextNode(getWord(W_INTERACTION_DELAY)));
			settings.appendChild(document.createElement('br'));
			settings.appendChild(button);
			
			td.appendChild(settings);
			td.appendChild(enableDisable);
			
			var infodiv = document.createElement('div');
			infodiv.style.border = '1px solid black';
			infodiv.style.backgroundColor = 'white';
			infodiv.style.color = '#444';
			infodiv.style.width = '98%';
			infodiv.style.height = '2.1em';
			infodiv.style.padding = '1px';
			infodiv.innerHTML = getWord(W_SCRIPT_NOT_RUNNING_INIT);
	
			var isLooping = false;
			var theindex = 0;
			var theselects = $xx('//form//select[@title]');
			var iframe = document.createElement('iframe');
			iframe.style.position = 'fixed';
			iframe.style.top= '20px';
			iframe.style.right= '50px';
			iframe.style.width= '350px';
			iframe.style.height= '450px';
		
			function end() {
				isLooping = false;
				document.body.removeChild(iframe);
				infodiv.innerHTML = getWord(W_SCRIPT_FINISHED);
				// theindex = 0;
			}
			function pause() {
				isLooping = false;
				document.body.removeChild(iframe);
				infodiv.innerHTML = getWord(W_SCRIPT_NOT_RUNNING);
			}
			
			function advanceOne() {
				if (isLooping) {
					var sel;
					while (sel = theselects.snapshotItem(theindex++)) {
						if (sel.value > 0) {
							var y = sel.parentNode.parentNode.offsetTop;
							self.scrollTo(0, y);
							var parent = sel.parentNode;
							var hasBolds = parent.parentNode.parentNode.cells[1].getElementsByTagName('b').length;
							var sc = $x('//input[@name="samecity"]').checked;
							if (!hasBolds || (hasBolds && sc)) {
								parent.style.borderLeft = '6px solid lime';
								infodiv.innerHTML = sel.title + " => " + interacts[sel.value] + ".";
								iframe.src = getInteractUrl(sel.name, sel.value);
								break;
							} else {
								parent.style.borderLeft = '6px solid magenta';
								setTimeout(advanceOne, 200);
								break;
							}
						}
					}
					if (theindex >= theselects.snapshotLength) {
						end();
					}
				}
			}
				
			iframe.addEventListener('load', function() {
				if (theindex < theselects.snapshotLength) {
					var del = 1000 * delayer.value + Math.random() * 500;
					setTimeout(advanceOne, del);
				} else {
					end();
				}
			}, false);
				
			button.addEventListener('click', function(e) {
				e.preventDefault();
				isLooping = !isLooping;
				infodiv.innerHTML = isLooping ? getWord(W_SCRIPT_RUNNING) : getWord(W_SCRIPT_NOT_RUNNING);
				if (isLooping) {
					document.body.appendChild(iframe);
					setTimeout(advanceOne, 500);
				} else {
					pause();
				}
			}, false);

			prepare();
		}
	}
		
}
