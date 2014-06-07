// ==UserScript==
// @name Dead Frontier Enhanced UI by TheDarkKRONOS & Haonik
// @include http://fairview.deadfrontier.com/onlinezombiemmo/index.php?page=21
// @version 0.2.2.5
// ==/UserScript==

(function ( window, document, undefined ) {
var debug = false;
var Parameters = function (message)
{
	this.data = {};

	var startIndex = message.indexOf('?') + 1;
	message = message.substring(startIndex);

	var args = message.split('&');
	for (var i = 0; i < args.length; i++)
	{
		var parts = args[i].split('=');
		this.data[parts[0].toLowerCase()] = parts[1];
	}
};

Parameters.prototype.get = function (name, defaultValue)
{
	var key = name.toLowerCase();
	if (!this.data.hasOwnProperty(key)) return defaultValue;

	var value = this.data[key];
	if (value === '') return defaultValue;

	return value;
};
var Control = (function()
{
	function positionedInTable(control, handler)
	{
		return function()
		{
			var gridWidth = Math.floor(container.width / controls.table[control.cellRow].count);

			var left = gridWidth * control.cellColumn + container.left;
			control.element.style.left = left + 'px';

			var top = (control.cellRow == 0 ? container.top : controls.table[control.cellRow - 1].bottom);
			control.element.style.top = top + 'px';

			var width = gridWidth * control.spanCount - container.padding;
			control.element.style.width = width + 'px';

			var height = (controls.table[control.cellRow].height < 0 ? width : controls.table[control.cellRow].height);
			control.element.style.height = height + 'px';

			controls.table[control.cellRow].bottom = top + height + container.padding;

			if (typeof (handler) != 'undefined') handler(control.element, gridWidth, left, top, width, height);
		};
	}

	var Control = function(tagName, parameters)
	{
		this.element = document.createElement(tagName);
		this.element.style.position = 'absolute';
		this.element.style.fontSize = '1.3em';
		container.element.appendChild(this.element);

		this.cellRow = parameters.row || 0;
		this.cellColumn = parameters.column || 0;
		this.spanCount = parameters.spanCount || 1;
		this.resize = positionedInTable(this, parameters.resizeHandler);

		controls.elements.push(this);
	};

	Control.prototype.move = function(column, row, spanCount)
	{
		this.cellRow = row;
		this.cellColumn = column;
		this.spanCount = (typeof (spanCount) == 'undefined' ? 1 : spanCount);
		this.show();

		this.resize();
	};

	Control.prototype.show = function()
	{
		this.element.style.display = 'block';
	};

	Control.prototype.hide = function()
	{
		this.element.style.display = 'none';
	};

	return Control;
})();
function addEvent(element, event, handler)
{
	if (element.addEventListener)
	{
		element.addEventListener(event, handler, false);
	}
	else
	{
		element.attachEvent('on' + event, handler);
	}
}

var main = new function()
{
	var main = this;

	main.manualControl = false;

	main.goToManualControl = function()
	{
		main.manualControl = true;
		ui.manual();
		controls.updateHeight();
		player.disableAutoRefresh();
	};

	main.goToAutomaticControl = function()
	{
		main.manualControl = false;
		ui.automatic();
		controls.updateHeight();
		player.enableAutoRefresh();
	};

	main.updateControl = function()
	{
		if (main.manualControl)
		{
			main.goToManualControl();
		}
		else
		{
			main.goToAutomaticControl();
		}
	}

	main.toggleControl = function()
	{
		if (main.manualControl)
		{
			main.goToAutomaticControl();
		}
		else
		{
			main.goToManualControl();
		}
	}

	main.resize = function()
	{
		container.resize();
		controls.resize();
		map.resize();
		legend.resize();
	};

	main.save = function()
	{
		try
		{
			localStorage.setItem('mapSize', map.size.id);
			localStorage.setItem('mainMode', main.manualControl);
			localStorage.setItem('playerX', player.x);
			localStorage.setItem('playerY', player.y);
			localStorage.setItem('outpost', map.cities[ui.outpostSelect.element.value].id);
		}
		catch (e) { }
	};

	main.load = function()
	{
		try
		{
			var mapSize = localStorage.getItem('mapSize');
			if (mapSize && map.sizes[mapSize]) map.setSize(map.sizes[mapSize]);

			var mainMode = localStorage.getItem('mainMode');
			if (mainMode == 'true')
			{
				main.goToManualControl();
			}
			else
			{
				main.goToAutomaticControl();
			}

			var playerX = localStorage.getItem('playerX');
			if (!!playerX) player.x = parseInt(playerX);

			var playerY = localStorage.getItem('playerY');
			if (!!playerY) player.y = parseInt(playerY);

			map.smoothMove(player.x, player.y);

			var outpost = localStorage.getItem('outpost');
			if (outpost && map.cities[outpost]) ui.outpostSelect.element.value = outpost;
		}
		catch (e) { }
	};
};
var screen = new function ()
{
	var screen = this;

	screen.width = 0;
	screen.height = 0;

	function updateSize()
	{
		screen.oldWidth = screen.width;
		screen.oldHeight = screen.height;
		screen.width = (window.innerWidth || document.documentElement.clientWidth);
		screen.height = (window.innerHeight || document.documentElement.clientHeight);
	}

	updateSize();
	screen.oldWidth = screen.width;
	screen.oldHeight = screen.height;
	//document.getElementsByClassName('design2010').style('display:none');

	screen.onResize = function (handler)
	{
		handler();

		var resizeMode = false;

		function resizeEvent()
		{
			if (resizeMode) return;

			resizeMode = true;

			setTimeout(function ()
			{
				updateSize();
				handler();
				resizeMode = false;
			}, 20);
		}

		addEvent(window, 'resize', resizeEvent);
	}
};
var container = new function()
{
	var container = this;

	container.padding = 10;
	container.left = container.padding;
	container.top = container.padding;

	container.element = document.createElement('div');
	container.element.style.position = 'absolute';
	container.element.style.left = '0px';
	container.element.style.top = '0px';
	container.element.style.overflow = 'hidden';
	document.body.appendChild(container.element);

	container.resize = function()
	{
		container.width = map.size.diameter * map.gridSize + 2;

		var width = container.width + container.padding * 2;
		container.element.style.width = width + 'px';
		container.height = screen.height - container.padding * 2;
		container.element.style.height = screen.height + 'px';

		var dfContainer = document.body.getElementsByTagName('table')[0];
		dfContainer.style.position = 'absolute';
		dfContainer.style.width = (screen.width - width - 10) + 'px';
		dfContainer.style.right = '0px';
	};
};
var player = new function()
{
	var player = this;

	player.id = 0;
	player.x = 1;
	player.y = 19;

	player.health = 0;
	player.maxHealth = 0;
	player.armor = 0;
	player.maxArmor = 0;
	player.hunger = 0;
	player.maxHunger = 0;
	player.usedInventoryCells = 0;
	player.freeInventoryCells = 0;
	player.maxInventoryCells = 0;

	player.autoRefreshEnable = false;

	//#region Find user id

	(function()
	{
		var scripts = document.getElementsByTagName('script');

		for (var i = 0; i < scripts.length; i++)
		{
			var currentScript = scripts[i].innerHTML;

			var startIndex = currentScript.indexOf('"SendUserID"');
			if (startIndex < 0) continue;
			startIndex += 12;

			var startIdIndex = currentScript.indexOf('"', startIndex);
			if (startIdIndex < 0) continue;
			startIdIndex += 1;

			var endIdIndex = currentScript.indexOf('"', startIdIndex);
			if (endIdIndex < 0) continue;

			try { player.id = parseInt(currentScript.substring(startIdIndex, endIdIndex)); }
			catch (e) { }

			return;
		}
	})();

	//#endregion

	player.move = function(x, y)
	{
		player.x = x;
		player.y = y;

		map.smoothMove(player.x, player.y);
	};

	player.add = function(offsetX, offsetY)
	{
		player.x += offsetX;
		player.y += offsetY;

		if (player.x < 0) player.x = 0;
		if (player.x > map.maxX) player.x = map.maxX;
		if (player.y < 0) player.y = 0;
		if (player.y > map.maxY) player.y = map.maxY;

		map.smoothMove(player.x, player.y);
	};

	player.enableAutoRefresh = function()
	{
		player.autoRefreshEnable = true;
	}

	player.disableAutoRefresh = function()
	{
		player.autoRefreshEnable = false;
	}

	player.refresh = function()
	{
		if (!player.autoRefreshEnable) return;

		try
		{
			var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

			xhr.onreadystatechange = function()
			{
				try
				{
					if (xhr.readyState != 4) return;

					var data = new Parameters(xhr.responseText);
					player.health = data.get('df_hpcurrent', 0);
					player.maxHealth = data.get('df_hpmax', 0);
					player.armor = data.get('df_armourhp', 0);
					player.maxArmor = data.get('df_armourhpmax', 0);
					player.hunger = data.get('df_hungerhp', 0);
					player.maxHunger = 100;

					player.maxInventoryCells = data.get('df_invslots', 0);
					player.usedInventoryCells = 0;

					for (var i = 1; i <= player.maxInventoryCells; i++)
						if (data.get('df_inv' + i + '_type', '') != '') player.usedInventoryCells += 1;

					player.freeInventoryCells = player.maxInventoryCells - player.usedInventoryCells;

					ui.playerHPLabel.resize();
					ui.playerAPLabel.resize();
					ui.playerHunLabel.resize();
					ui.playerInvLabel.resize();

					var x = data.get('df_positionx', 0) - 998;
					var y = data.get('df_positiony', 0) - 981;

					if (player.x != x || player.y != y)
					{
						player.x = x;
						player.y = y;
						map.smoothMove(player.x, player.y);
					}

					xhr = null;
				}
				catch (e)
				{
					if (debug) console.log(e.message);
				}
			}

			xhr.open('GET', 'http://fairview.deadfrontier.com/onlinezombiemmo/get_values.php?/userID=' + player.id, true);

			try { xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); }
			catch (e)
			{
				if (debug) console.log(e.message);
			}

			xhr.send(null);
		}
		catch (e)
		{
			if (debug) console.log(e.message);
		}
	};

	setInterval(player.refresh, 10000);
};
var controls = new function()
{
	var controls = this;

	controls.elements = [];
	controls.table = [];

	//#region Create elements

	controls.createLabel = function(text, parameters)
	{
		parameters = parameters || {};

		var control = new Control('input', parameters);
		control.element.type = 'text';
		control.element.disabled = 'disabled';
		control.element.title = parameters.title || '';
		control.element.value = text;

		return control;
	}

	controls.createInput = function(text, placeholder, parameters)
	{
		parameters = parameters || {};

		var control = new Control('input', parameters);
		control.element.type = 'text';
		control.element.placeholder = placeholder;
		control.element.title = parameters.title || placeholder;
		control.element.value = text;

		return control;
	}

	controls.createButton = function(text, clickHandler, parameters)
	{
		parameters = parameters || {};

		var control = new Control('input', parameters);
		control.element.type = 'button';
		control.element.value = text;
		control.element.title = parameters.title || text;
		addEvent(control.element, 'click', clickHandler);

		return control;
	}

	controls.createSelect = function(title, data, defaultValue, changeHandler, parameters)
	{
		parameters = parameters || {};

		var control = new Control('select', parameters);

		for (var item in data)
		{
			if (!data.hasOwnProperty(item)) return;

			var option = document.createElement('option');
			option.innerHTML = data[item].name;
			option.value = data[item].id;

			control.element.appendChild(option);
		}

		control.element.value = defaultValue;
		control.element.title = parameters.title || title;

		addEvent(control.element, 'change', function()
		{
			changeHandler(control.element.value);
		});

		return control;
	}

	//#endregion

	controls.updateHeight = function()
	{
		controls.height = controls.table[controls.table.length - 1].bottom + container.padding;
	}

	controls.resize = function()
	{
		for (var i = 0; i < controls.elements.length; i++) controls.elements[i].resize();

		controls.updateHeight();
	};
};
var map = new function()
{
	var map = this;

	map.marks = [];

	map.gridSize = 50;
	map.minX = 1;
	map.minY = 4;
	map.maxX = 50;
	map.maxY = 39;
	map.offsetX = map.minX * map.gridSize;
	map.offsetY = map.minY * map.gridSize;

	map.cities =
	{
		FortPastor: { id: 'FortPastor', name: "Fort Pastor", x: 31, y: 22 },
		NastyasHoldout: { id: 'NastyasHoldout', name: "Nastya's Holdout", x: 1, y: 19 },
		DoggsStockage: { id: 'DoggsStockage', name: "Dogg's Stockage", x: 7, y: 4 },
		Precint13: { id: 'Precint13', name: "Precint 13", x: 14, y: 38 }
	};

	map.sizes =
	{
		compact: { id: 'compact', name: "Compact", diameter: 3 },
		small: { id: 'small', name: "Small", diameter: 5 },
		s7: { id: 's7', name: "7", diameter: 7 },
		s9: { id: 's9', name: "9", diameter: 9 },
		s11: { id: 's11', name: "11", diameter: 11 },
		big: { id: 'big', name: "Big", diameter: 13 }
	};
	map.sizes.compact.prev = map.sizes.compact;
	map.sizes.small.prev = map.sizes.compact;
	map.sizes.s7.prev = map.sizes.small;
	map.sizes.s9.prev = map.sizes.s7;
	map.sizes.s11.prev = map.sizes.s9;
	map.sizes.big.prev = map.sizes.s11;
	map.size = map.sizes.big;

	map.windowSize = map.size.diameter * map.gridSize;
	map.radius = map.size.diameter / 2 * map.gridSize + map.gridSize / 2;

	map.image = new Image();
	map.image.onload = function()
	{
		map.width = Math.floor(map.image.width / map.gridSize);
		map.height = Math.floor(map.image.height / map.gridSize);

		main.resize();
	};
	map.image.src = (debug ? 'Content/Dfmap.png' : 'http://images.wikia.com/deadfrontier/images/b/bd/Dfmap.png');

	map.element = document.createElement('canvas');
	map.element.style.cssText = '-webkit-touch-callout: none; -moz-user-select: none; -ms-user-select: none; -webkit-user-select: none; -khtml-user-select: none; user-select: none;';
	map.element.style.border = '1px solid silver';
	map.element.style.position = 'absolute';
	map.element.style.left = container.left + 'px';
	container.element.appendChild(map.element);
	addEvent(map.element, 'selectstart', function() { return false; }); // Remove selection

	map.ctx = map.element.getContext('2d');

	map.setSize = function(newSize)
	{
		map.size = newSize;
		ui.mapSizeSelect.element.value = map.size.id;

		main.resize();

		if (main.manualControl)
		{
			main.goToManualControl();
		}
		else
		{
			main.goToAutomaticControl();
		}

		map.smoothMove(player.x, player.y);
	};

	map.resize = function()
	{
		map.windowSize = map.size.diameter * map.gridSize;
		map.radius = map.size.diameter / 2 * map.gridSize + map.gridSize / 2;

		map.element.height = map.element.width = map.windowSize;
		map.element.style.height = map.element.style.width = map.windowSize + 'px';

		var top = (container.height - map.windowSize - controls.height) / 2;
		if (top < 0)
		{
			if (map.size != map.size.prev) map.setSize(map.size.prev);
			top = 0;
		}
		top += controls.height;
		map.element.style.top = top + 'px';

		map.draw();
	};

	//#region Map view

	(function()
	{
		var mouseX = 0, mouseY = 0, userMoveTimer = 0, smoothMoveTimer = 0, userMovingIsDisable = false;

		map.controls =
		{
			enable: false,
			left: 1,
			top: 1,
			right: 1,
			down: 1
		};

		function resetControls()
		{
			map.controls.left = 1;
			map.controls.right = 1;
			map.controls.top = 1;
			map.controls.down = 1;

			checkBorders(map);
			map.draw();
		}

		function activateControls(offsetX, offsetY)
		{
			map.controls.left = 1;
			map.controls.right = 1;
			map.controls.top = 1;
			map.controls.down = 1;

			if (offsetX < -1)
			{
				map.controls.left = 2;
			}
			else if (offsetX > 1)
			{
				map.controls.right = 2;
			}

			if (offsetY < -1)
			{
				map.controls.top = 2;
			}
			else if (offsetY > 1)
			{
				map.controls.down = 2;
			}
		}

		function checkBorders(position)
		{
			if (position.offsetX <= map.minX * map.gridSize + map.radius)
			{
				position.offsetX = map.minX * map.gridSize + map.radius;
				map.controls.left = 0;
			}
			else if (position.offsetX >= (map.maxX + map.minX - map.size.diameter + 1) * map.gridSize + map.radius)
			{
				position.offsetX = (map.maxX + map.minX - map.size.diameter + 1) * map.gridSize + map.radius
				map.controls.right = 0;
			}

			if (position.offsetY <= map.minY * map.gridSize + map.radius)
			{
				position.offsetY = map.minY * map.gridSize + map.radius;
				map.controls.top = 0;
			}
			else if (position.offsetY >= (map.maxY + map.minY - map.size.diameter + 1) * map.gridSize + map.radius)
			{
				position.offsetY = (map.maxY + map.minY - map.size.diameter + 1) * map.gridSize + map.radius;
				map.controls.down = 0;
			}
		}

		map.smoothMove = function(x, y)
		{
			var position =
			{
				offsetX: (x + map.minX + 1) * map.gridSize,
				offsetY: (y + map.minY + 1) * map.gridSize
			};

			checkBorders(position);

			if (userMovingIsDisable) clearInterval(smoothMoveTimer);

			userMovingIsDisable = true;

			smoothMoveTimer = setInterval(function()
			{
				var isEnd = true;
				var distanceX = position.offsetX - map.offsetX;
				var distanceY = position.offsetY - map.offsetY;

				if (Math.abs(distanceX) > 2)
				{
					distanceX /= 15;
					if (Math.abs(distanceX) < 1) distanceX /= Math.abs(distanceX);
					isEnd = false;
				}
				if (Math.abs(distanceY) > 2)
				{
					distanceY /= 15;
					if (Math.abs(distanceY) < 1) distanceY /= Math.abs(distanceY);
					isEnd = false;
				}

				map.move(distanceX, distanceY);
				map.draw();

				if (isEnd)
				{
					clearInterval(smoothMoveTimer);
					resetControls();
					userMovingIsDisable = false;
				}
			}, 20);
		}

		map.move = function(offsetX, offsetY)
		{
			map.offsetX += offsetX;
			map.offsetY += offsetY;

			activateControls(offsetX, offsetY);
			checkBorders(map);
		};

		addEvent(map.element, 'mousedown', function(event)
		{
			mouseX = event.offsetX || event.layerX;
			mouseY = event.offsetY || event.layerY;

			if (userMovingIsDisable) return;

			userMoveTimer = setInterval(function()
			{
				var center = map.size.diameter * map.gridSize / 2;

				map.move(20 / center * (mouseX - center), 20 / center * (mouseY - center));
				map.draw();
			}, 20);
		});

		addEvent(map.element, 'mousemove', function(event)
		{
			mouseX = event.offsetX || event.layerX;
			mouseY = event.offsetY || event.layerY;

			if (!map.controls.enable)
			{
				map.controls.enable = true;
				map.draw();
			}
		});

		addEvent(map.element, 'mouseup', function(event)
		{
			clearInterval(userMoveTimer);
			resetControls();
		});

		addEvent(map.element, 'mouseout', function(event)
		{
			clearInterval(userMoveTimer);
			map.controls.enable = false;
			resetControls();
		});
	})();

	//#endregion

	//#region Render

	function setControlColor2(state1, state2)
	{
		if (state1 == 2 && state2 == 2)
		{
			map.ctx.fillStyle = 'red';
			map.ctx.strokeStyle = 'red';
		}
		else if (state1 == 0 || state2 == 0)
		{
			map.ctx.fillStyle = 'transparent';
			map.ctx.strokeStyle = 'transparent';
		}
		else
		{
			map.ctx.fillStyle = 'white';
			map.ctx.strokeStyle = 'white';
		}
	}

	function setControlColor3(state1, state2, state3)
	{
		if (state1 == 2 && state2 != 2 && state3 != 2)
		{
			map.ctx.fillStyle = 'red';
			map.ctx.strokeStyle = 'red';
		}
		else if (state1 == 0)
		{
			map.ctx.fillStyle = 'transparent';
			map.ctx.strokeStyle = 'transparent';
		}
		else
		{
			map.ctx.fillStyle = 'white';
			map.ctx.strokeStyle = 'white';
		}
	}

	function drawControls()
	{
		if (!map.controls.enable) return;

		var gridSize = Math.floor(map.windowSize / 20);
		var lenght = gridSize;
		var near = gridSize;
		var near2 = gridSize * 2;
		var center = gridSize * 10;
		var far = gridSize * 18;
		var far2 = gridSize * 19;

		map.ctx.lineWidth = 2;
		setControlColor2(map.controls.left, map.controls.top);
		drawArrow(near2, near2, near, near, lenght);
		setControlColor2(map.controls.right, map.controls.down);
		drawArrow(far, far, far2, far2, lenght);
		setControlColor2(map.controls.left, map.controls.down);
		drawArrow(near2, far, near, far2, lenght);
		setControlColor2(map.controls.right, map.controls.top);
		drawArrow(far, near2, far2, near, lenght);
		setControlColor3(map.controls.left, map.controls.top, map.controls.down);
		drawArrow(near2, center, near, center, lenght);
		setControlColor3(map.controls.right, map.controls.top, map.controls.down);
		drawArrow(far, center, far2, center, lenght);
		setControlColor3(map.controls.top, map.controls.left, map.controls.right);
		drawArrow(center, near2, center, near, lenght);
		setControlColor3(map.controls.down, map.controls.left, map.controls.right);
		drawArrow(center, far, center, far2, lenght);
	}

	function drawArrow(x1, y1, x2, y2, lenght)
	{
		var angle = Math.PI / 8;

		map.ctx.beginPath();
		map.ctx.moveTo(x1, y1);
		map.ctx.lineTo(x2, y2);
		map.ctx.closePath();

		var lineangle = Math.atan2(y2 - y1, x2 - x1);
		var h = Math.abs(lenght / Math.cos(angle));

		var angle1 = lineangle + Math.PI + angle;
		var topx = x2 + Math.cos(angle1) * h;
		var topy = y2 + Math.sin(angle1) * h;
		var angle2 = lineangle + Math.PI - angle;
		var botx = x2 + Math.cos(angle2) * h;
		var boty = y2 + Math.sin(angle2) * h;

		var radius = 3;
		var twoPI = 2 * Math.PI;

		map.ctx.beginPath();
		map.ctx.moveTo(topx, topy);
		map.ctx.lineTo(x2, y2);
		map.ctx.lineTo(botx, boty);

		var cp1x, cp1y, cp2x, cp2y, backdist;
		var shiftamt = 5;
		if (botx == topx)
		{
			backdist = boty - topy;
			cp1x = (x2 + topx) / 2;
			cp2x = (x2 + topx) / 2;
			cp1y = y2 + backdist / shiftamt;
			cp2y = y2 - backdist / shiftamt;
		}
		else
		{
			backdist = Math.sqrt(((botx - topx) * (botx - topx)) + ((boty - topy) * (boty - topy)));
			var xback = (topx + botx) / 2;
			var yback = (topy + boty) / 2;
			var xmid = (xback + x2) / 2;
			var ymid = (yback + y2) / 2;

			var m = (boty - topy) / (botx - topx);
			var dx = (backdist / (2 * Math.sqrt(m * m + 1))) / shiftamt;
			var dy = m * dx;
			cp1x = xmid - dx;
			cp1y = ymid - dy;
			cp2x = xmid + dx;
			cp2y = ymid + dy;
		}

		map.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, topx, topy);
		map.ctx.fill();
	}

	function drawCross(x, y, color)
	{
		map.ctx.strokeStyle = color;
		map.ctx.lineWidth = 2;
		map.ctx.beginPath();
		map.ctx.moveTo(x, y);
		map.ctx.lineTo(x + map.gridSize, y + map.gridSize);
		map.ctx.closePath();
		map.ctx.moveTo(x + map.gridSize, y);
		map.ctx.lineTo(x, y + map.gridSize);
		map.ctx.closePath();
		map.ctx.stroke();
	}

	var markType =
	{
		none: 'none',
		player: 'player',
		checked: 'checked',
		cleared: 'cleared'
	}

	function drawMark(x, y, type)
	{
		x = (x + map.minX) * map.gridSize - map.offsetX + map.radius;
		y = (y + map.minY) * map.gridSize - map.offsetY + map.radius;

		if (type == markType.player)
		{
			map.ctx.strokeStyle = 'red';
			map.ctx.lineWidth = 4;
			map.ctx.strokeRect(x, y, map.gridSize, map.gridSize);

			map.ctx.strokeStyle = 'white';
			map.ctx.lineWidth = 2;
			map.ctx.strokeRect(x, y, map.gridSize, map.gridSize);
		}
		else if (type == markType.checked)
		{
			drawCross(x, y, 'yellow');
		}
	}

	map.draw = function()
	{
		map.ctx.drawImage(map.image, -Math.floor(map.offsetX - map.radius), -Math.floor(map.offsetY - map.radius));
		drawControls();

		for (var i = 0; i < map.marks.length; i++) drawMark(map.marks[i].x, map.marks[i].y, map.marks[i].type);

		drawMark(player.x, player.y, markType.player);
	}

	//#endregion

	//#region Marks

	function setMark(x, y, type)
	{
		var newMark = { x: x, y: y, type: type };

		for (var i = 0; i < map.marks.length; i++)
		{
			if (map.marks[i].x == x && map.marks[i].y == y)
			{
				map.marks[i] = newMark;
				map.draw();
				return;
			}
		}

		map.marks.push(newMark);
		map.draw();
	}

	map.clearMarks = function()
	{
		map.marks = [];
		map.draw();
	}

	map.removeMark = function(x, y)
	{
		setMark(x, y, markType.none);
	}

	map.setCheckedMark = function(x, y)
	{
		setMark(x, y, markType.checked);
	}

	//#endregion
};
var legend = new function ()
{
	var legend = this;

	legend.element = document.createElement('canvas');
	legend.element.style.border = '1px solid silver';
	legend.element.style.position = 'absolute';
	legend.element.style.left = container.left + 'px';
	legend.element.style.zIndex = 1;
	legend.element.style.backgroundColor = 'black';
	container.element.appendChild(legend.element);
	addEvent(legend.element, 'click', function ()
	{
		legend.hide();
	});

	legend.ctx = legend.element.getContext('2d');

	legend.show = function ()
	{
		legend.element.style.display = 'block';
		legend.visible = true;
	};

	legend.hide = function ()
	{
		legend.element.style.display = 'none';
		legend.visible = false;
	};

	legend.toggle = function ()
	{
		legend.visible = !legend.visible;
		legend.element.style.display = (legend.visible ? 'block' : 'none');
	};

	legend.hide();

	var data =
	[
		{ x: 1150, y: 0, width: 150, height: 150 },
		{ x: 1300, y: 0, width: 200, height: 150 },
		{ x: 1500, y: 0, width: 200, height: 150 },
		{ x: 1700, y: 0, width: 200, height: 150 },
		{ x: 1900, y: 0, width: 250, height: 150 }
	];

	var pattern = document.createElement('canvas');

	var maxWidth = 250;
	var maxHeight = 750;
	var scale = 1;

	legend.draw = function ()
	{
		var patternSize = Math.floor(50 * scale);
		pattern.height = pattern.width = patternSize;
		pattern.getContext('2d').drawImage(map.image, 2150, 0, 50, 50, 0, 0, patternSize, patternSize);

		legend.ctx.fillStyle = legend.ctx.createPattern(pattern, 'repeat');
		legend.ctx.fillRect(0, 0, container.width, container.height);

		var top = -1;
		var totalWidth = Math.floor(maxWidth * scale);
		var totalHeight = Math.floor(maxHeight * scale);

		for (var i = 0; i < data.length; i++)
		{
			var width = Math.floor(totalWidth / maxWidth * data[i].width);
			var height = Math.floor(totalHeight / maxHeight * data[i].height);
			legend.ctx.drawImage(map.image, data[i].x, data[i].y, data[i].width, data[i].height, 0, top, width, height);
			top += height - 1;
		}
	}

	legend.resize = function ()
	{
		legend.element.width = container.width;
		legend.element.style.width = container.width + 'px';

		var height = container.height;
		legend.element.height = height;
		legend.element.style.height = height + 'px';

		legend.element.style.top = container.top + 'px';

		scale = Math.min(container.width / maxWidth, height / maxHeight)

		legend.draw();
	};
};
var ui = new function()
{
	var ui = this;

	//#region Create elements

	// parameters: { row: 0, column: 0, spanCount: 1, resizeHandler: undefined };

	controls.table = [{ count: 2, height: 30, bottom: 0 }];

	var resize = function(element, gridWidth, left, top, width, height)
	{
		element.style.fontSize = (map.size == map.sizes.compact ? '0.8em' : '1.3em');
	};

	var mapSizeLabel = controls.createLabel('Map size:');
	var mapSizeSelect = controls.createSelect('Choose map size', map.sizes, map.size.id, function(newValue)
	{
		map.setSize(map.sizes[newValue]);
	});
	ui.mapSizeSelect = mapSizeSelect;

	var mapLegendsButton = controls.createButton('Map legends', legend.toggle, {
		resizeHandler: function(element, gridWidth, left, top, width, height)
		{
			element.value = (width < 100 ? '?' : 'Map legends');
		},
		title: 'Show map legend. For close map legeng, click on legend.'
	});

	var modeButton = controls.createButton('Change mode', function()
	{
		main.toggleControl();
	}, {
		resizeHandler: function(element, gridWidth, left, top, width, height)
		{
			element.value = (width < 50 ? 'M' : width < 100 ? 'Mode' : 'Change mode');
		},
		title: 'Change mode script work: Manual or Automatic.'
	});

	var outpostLabel = controls.createLabel('Outpost:');
	var outpostSelect = controls.createSelect('Choose outpost', map.cities, map.cities.NastyasHoldout.id, function(newValue)
	{
		if (main.manualControl)
		{
			player.move(map.cities[newValue].x, map.cities[newValue].y);
		}
		else
		{
			map.smoothMove(map.cities[newValue].x, map.cities[newValue].y);
		}
	});
	ui.outpostSelect = outpostSelect;

	var centerButton = controls.createButton('☻', function()
	{
		map.smoothMove(player.x, player.y);
	},
	{
		resizeHandler: resize,
		title: 'Сentered on player'
	});

	var checkedButton = controls.createButton('Checked', function()
	{
		map.setCheckedMark(player.x, player.y);
	}, {
		resizeHandler: function(element, gridWidth, left, top, width, height)
		{
			element.value = (width < 50 ? 'V' : 'Checked');
		},
		title: 'Set mark on current selected map cell.'
	});
	var clearButton = controls.createButton('Clear', function()
	{
		map.removeMark(player.x, player.y);
	}, {
		resizeHandler: function(element, gridWidth, left, top, width, height)
		{
			element.value = (width < 50 ? 'X' : 'Clear');
		},
		title: 'Clear mark on current selected map cell.'
	});
	var clearAllButton = controls.createButton('ClearAll', function()
	{
		map.clearMarks();
	}, {
		resizeHandler: function(element, gridWidth, left, top, width, height)
		{
			element.value = (width < 50 ? 'C' : 'ClearAll');
		},
		title: 'Clear all marks on map.'
	});

	var playerIdLabel = controls.createLabel('Your player id:', {
		resizeHandler: function(element, gridWidth, left, top, width, height)
		{
			element.value = (width < 100 ? 'Your id:' : 'Your player id:');
		},
		title: 'Show player ID.'
	});
	var playerIdInput = controls.createInput((player.id > 0 ? player.id : ''), 'Enter your player id');

	var playerHPLabel = controls.createLabel('Health', {
		resizeHandler: function(element, gridWidth, left, top, width, height)
		{
			element.value = (width < 100 ? '♥' : 'Health:') + ' ' + player.health + '/' + player.maxHealth;
		},
		title: 'Show health points.'
	});
	ui.playerHPLabel = playerHPLabel;

	var playerAPLabel = controls.createLabel('Armor', {
		resizeHandler: function(element, gridWidth, left, top, width, height)
		{
			element.value = (width < 100 ? 'AP' : 'Armor:') + ' ' + player.armor + '/' + player.maxArmor;
		},
		title: 'Show armor points.'
	});
	ui.playerAPLabel = playerAPLabel;

	var playerHunLabel = controls.createLabel('Hunger', {
		resizeHandler: function(element, gridWidth, left, top, width, height)
		{
			element.value = (width < 100 ? 'H' : 'Hunger:') + ' ' + player.hunger + '/' + player.maxHunger;
		},
		title: 'Show nourishment.'
	});
	ui.playerHunLabel = playerHunLabel;

	var playerInvLabel = controls.createLabel('Inventory', {
		resizeHandler: function(element, gridWidth, left, top, width, height)
		{
			element.value = (width < 100 ? 'I' : 'Inv:') + ' ' + player.freeInventoryCells + '/' + player.maxInventoryCells;
		},
		title: 'Show free inventory cells.'
	});
	ui.playerInvLabel = playerInvLabel;

	var refreshButton = controls.createButton('Refresh', function()
	{
		var newId = parseInt(playerIdInput.element.value);

		if (isNaN(newId))
		{
			alert('Invalid player id!');
		}
		else
		{
			player.id = newId;
		}

		player.refresh();
	}, {
		resizeHandler: function(element, gridWidth, left, top, width, height)
		{
			element.value = (width < 100 ? 'Ѻ' : 'Refresh');
		},
		title: 'Refresh player information.'
	});

	var upButton = controls.createButton('↑',
		function() { player.add(0, -1); },
		{
			resizeHandler: resize,
			title: 'Up'
		});
	var leftButton = controls.createButton('←',
		function() { player.add(-1, 0); },
		{
			resizeHandler: resize,
			title: 'Left'
		});
	var rightButton = controls.createButton('→',
		function() { player.add(1, 0); },
		{
			resizeHandler: resize,
			title: 'Right'
		});
	var downButton = controls.createButton('↓',
		function() { player.add(0, 1); },
		{
			resizeHandler: resize,
			title: 'Down'
		});
	var leftUpButton = controls.createButton('\\',
		function() { player.add(-1, -1); },
		{
			resizeHandler: resize,
			title: 'Left up'
		});
	var leftDownButton = controls.createButton('/',
		function() { player.add(-1, 1); },
		{
			resizeHandler: resize,
			title: 'Left down'
		});
	var rightUpButton = controls.createButton('/',
		function() { player.add(1, -1); },
		{
			resizeHandler: resize,
			title: 'Right up'
		});
	var rightDownButton = controls.createButton('\\',
		function() { player.add(1, 1); },
		{
			resizeHandler: resize,
			title: 'Right down'
		});

	//#endregion

	(function()
	{
		function fullAutomatic()
		{
			controls.table =
			[
				{ count: 2, height: 30, bottom: 0 },
				{ count: 3, height: 30, bottom: 0 },
				{ count: 2, height: 30, bottom: 0 },
				{ count: 2, height: 30, bottom: 0 },
				{ count: 2, height: 30, bottom: 0 },
				{ count: 2, height: 30, bottom: 0 },
				{ count: 4, height: 30, bottom: 0 }
			];

			mapSizeLabel.move(0, 0);
			mapSizeSelect.move(1, 0);
			mapLegendsButton.move(0, 1);
			modeButton.move(1, 1);
			refreshButton.move(2, 1);
			outpostLabel.move(0, 2);
			outpostSelect.move(1, 2);

			playerIdLabel.move(0, 3);
			playerIdInput.move(1, 3);
		}

		function compactAutomatic()
		{
			controls.table =
			[
				{ count: 1, height: 30, bottom: 0 },
				{ count: 3, height: 30, bottom: 0 },
				{ count: 1, height: 30, bottom: 0 },
				{ count: 1, height: 30, bottom: 0 },
				{ count: 2, height: 30, bottom: 0 },
				{ count: 2, height: 30, bottom: 0 },
				{ count: 4, height: 30, bottom: 0 }
			];

			mapSizeLabel.hide();
			mapSizeSelect.move(0, 0);
			mapLegendsButton.move(0, 1);
			modeButton.move(1, 1);
			refreshButton.move(2, 1);
			outpostLabel.hide();
			outpostSelect.move(0, 2);

			playerIdInput.move(0, 3);
		}

		ui.automatic = function()
		{
			if (map.size == map.sizes.compact)
			{
				compactAutomatic();
			}
			else
			{
				fullAutomatic();
			}

			playerHPLabel.move(0, 4);
			playerAPLabel.move(1, 4);
			playerHunLabel.move(0, 5);
			playerInvLabel.move(1, 5);
			checkedButton.move(0, 6);
			clearButton.move(1, 6);
			clearAllButton.move(2, 6);
			centerButton.move(3, 6);

			leftButton.hide();
			rightButton.hide();
			upButton.hide();
			downButton.hide();
			leftUpButton.hide();
			leftDownButton.hide();
			rightUpButton.hide();
			rightDownButton.hide();
		};

		function fullManual()
		{
			controls.table =
			[
				{ count: 2, height: 30, bottom: 0 },
				{ count: 2, height: 30, bottom: 0 },
				{ count: 2, height: 30, bottom: 0 },
				{ count: 5, height: 30, bottom: 0 },
				{ count: 5, height: 30, bottom: 0 },
				{ count: 5, height: 30, bottom: 0 }
			];

			mapSizeLabel.move(0, 0);
			mapSizeSelect.move(1, 0);
			mapLegendsButton.move(0, 1);
			modeButton.move(1, 1);
			outpostLabel.move(0, 2);
			outpostSelect.move(1, 2);

			checkedButton.move(0, 3);
			leftUpButton.move(2, 3);
			upButton.move(3, 3);
			rightUpButton.move(4, 3);
			clearButton.move(0, 4);
			leftButton.move(2, 4);
			centerButton.move(3, 4);
			rightButton.move(4, 4);
			clearAllButton.move(0, 5);
			leftDownButton.move(2, 5);
			downButton.move(3, 5);
			rightDownButton.move(4, 5);
		}

		function compactManual()
		{
			controls.table =
			[
				{ count: 1, height: 30, bottom: 0 },
				{ count: 2, height: 30, bottom: 0 },
				{ count: 1, height: 30, bottom: 0 },
				{ count: 3, height: 30, bottom: 0 },
				{ count: 3, height: 30, bottom: 0 },
				{ count: 3, height: 30, bottom: 0 },
				{ count: 3, height: 30, bottom: 0 }
			];

			mapSizeLabel.hide();
			mapSizeSelect.move(0, 0);
			mapLegendsButton.move(0, 1);
			modeButton.move(1, 1);
			outpostLabel.hide();
			outpostSelect.move(0, 2);

			leftUpButton.move(0, 3);
			upButton.move(1, 3);
			rightUpButton.move(2, 3);
			leftButton.move(0, 4);
			centerButton.move(1, 4);
			rightButton.move(2, 4);
			leftDownButton.move(0, 5);
			downButton.move(1, 5);
			rightDownButton.move(2, 5);

			clearAllButton.move(0, 6);
			clearButton.move(1, 6);
			checkedButton.move(2, 6);
		}

		ui.manual = function()
		{
			if (map.size == map.sizes.compact)
			{
				compactManual();
			}
			else
			{
				fullManual();
			}

			playerIdLabel.hide();
			playerIdInput.hide();
			refreshButton.hide();
			playerHPLabel.hide();
			playerAPLabel.hide();
			playerHunLabel.hide();
			playerInvLabel.hide();
		};
	})();
}

screen.onResize(main.resize);
main.load();

addEvent(window, 'unload', main.save);
var scripts = {};
(function (scripts) {
})(scripts);
})( window, window.document );
