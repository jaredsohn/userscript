// ==UserScript==
// @name           GAP Picker
// @namespace      KoLCtH
// @description    Kingdom of Loathing UI Enhancement. Makes choosing powers from the Greatest American Pants a breeze
// @include        *kingdomofloathing.com/inventory.php*
// @include        http://127.0.0.1*inventory.php*
// ==/UserScript==
if (!$('#curequip'))
	return;
var activateLink = $('[href *= activatesuperpants]');
if (!activateLink)
	return;
activateLink.addEventListener('click', buildDropdown, false);

function buildDropdown(e)
{
	e.preventDefault();
	e.stopPropagation();
	var GAPChoice = $('#GAPChoice');
	if (GAPChoice)
	{
		GAPChoice.style.display = GAPChoice.style.display == 'none' ? 'block' : 'none';
		return;
	}
	var offset = getOffset(this);
	var holder = document.body.appendChild(CE('div', 'id|GAPChoice', 'style|position:absolute; top:' + (offset[1] + 20) + 'px; left:' + (offset[0] - 250) + 'px; border:blue 2px solid; outline:white 1px solid; background-color:white; text-align:center;'));
	holder.appendChild(CE('div', 'style|background-color:blue; color:white; font-weight:bold', 'text|Choose your power wisely'));
	var buttonClose = holder.appendChild(CE('div', 'class|closeButton', 'text|×', 'style|position:absolute; top:0px; right:-1px; cursor:default; font-size:28pt; font-weight:bold; line-height:.4; height:.45em; width:.6em; background-color:white; border:black 1px solid; overflow:hidden; z-index:55;'));
	buttonClose.addEventListener('click', function () {this.parentNode.style.display = 'none';}, false);	
	var rollover = window.top.frames[1].wrappedJSObject.rollover;
	//console.log(unsafeWindow.top.frames[1].rollover)
	if (rollover > GM_getValue('rollover', 0))
	{
		GM_setValue('limit', 5);
		GM_setValue('rollover', rollover);
	}
	var limit = GM_getValue('limit', 5);
	for (var n=0;n<limit;n++)
	{
		holder.appendChild(CE('img', 'src|http://images.kingdomofloathing.com/itemimages/karma.gif'));
	}
	holder.appendChild(CE('br'));
	var DDL = holder.appendChild(CE('select', 'style|margin:15px 20px;'));
	var choices = [null, "Skill: Combat skills/spells cost 0 MP (5 adv)", "Structure: +500 DA, Superhuman resistance (10 adv)", "Vision: +25% item drop (20 adv)", "Speed: +100 Moxie (20 adv)", "Accuracy: 5x chance of critical (10 adv)"];
	for (var n=1;n<6;n++)
	{
		DDL.appendChild(CE('option', 'value|' + n, 'text|Super ' + choices[n]));
	}
	holder.appendChild(CE('br'));
	var button = holder.appendChild(CE('input', 'type|button', 'class|button', 'value|Activate!', 'style|margin-bottom:10px'));
	button.addEventListener('click', activate, false);

	function activate()
	{
		if (limit == 0)
			return alert("Your pants are drained, try again tomorrow.");
		var thisChoice = this.previousSibling.previousSibling.value;
		$('#GAPChoice').firstChild.textContent = 'Loading...';
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://' + window.location.host + '/inventory.php?action=activatesuperpants',
			onload: function (resp)
			{
				var limitText = resp.responseText.match(/There are (\d) little glowing/);
				if (limitText)
					var limit = --limitText[1];
				else
				{
					limitText = resp.responseText.match(/There's one little lightning/);
					var limit = limitText ? 1 : 0;
				}
				GM_setValue('limit', limit);
				var esca = $('img', false, holder);
				esca.parentNode.removeChild(esca);
				if (limit == 0)
				{
					thisChoice = 6;
					alert("Your pants are drained, try again tomorrow.");
				}
				$('#GAPChoice').style.display = 'none';
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://' + window.location.host + '/choice.php?whichchoice=508&pwd=' + unsafeWindow.pwd + '&option=' + thisChoice,
					onload: function (resp)
					{
						window.top.frames[1].location.reload();
						$('#GAPChoice').firstChild.textContent = 'Choose your power wisely';
					}
				});
			}
		});
	}
}

function getOffset(node)
{
	var X = 0, Y = 0;
	while (node.offsetParent)
	{
		X += node.offsetLeft;
		Y += node.offsetTop;
		node = node.offsetParent;
	}
	return [X, Y];
}

function CE(tag/*,attributes*/)
{
	var node = document.createElement(tag);
	for (var i=1,len=arguments.length;i<len;i++)
	{
		var attr = arguments[i].split('|');
		if (attr[0] == 'text')
			node.textContent = attr[1];
		else
			node.setAttribute(attr[0], attr[1]);
	}
	return node;
}

function $(selector, all, scope)
{
	scope = scope || document;
	return scope.querySelector(selector);
}
