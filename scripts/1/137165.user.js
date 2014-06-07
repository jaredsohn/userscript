// ==UserScript==
// @name        Grepolis World Wonder Extension
// @namespace   http://roymerritt.de/scripts
// @description Automatic resource selection and transport for Grepolis world wonders.
// @include     http://*.grepolis.*/game*
// @copyright   Roy Merritt
// @version     1.2
// ==/UserScript==

var uW = (typeof unsafeWindow === 'object' ? unsafeWindow : window);
if (typeof $ == "undefined") {
	var $ = uW.jQuery
}

(function() {
	var uW = (typeof unsafeWindow === 'object' ? unsafeWindow : window);

	// console log function
	var error_log = function(msg) {
		try {
			uW.console.log(msg);
			if (typeof GM_log !== 'undefined') {
				GM_log(msg);
			} else {
				if (typeof opera.postError !== 'undefined') {
					opera.postError(msg);
				} else {
					uW.console.log(msg);
				}
			}
		} catch (e) {
			;
		}
	}

	uW.WndHandlerWonders.prototype.fillResourcesMax = function() {
		var left = parseInt($(".wonder_free_trade_capacity span").html());
		error_log("WndHandlerWonders: fillResourcesMax left=" + left);

		var wood = 0;
		var stone = 0;
		var iron = 0;
		var step = 500;

		var capacity = $("#ww_town_capacity_wood .amounts");
		var woodCount = parseInt($(capacity).find(".curr").html());
		var woodArriving = parseInt($(capacity).find(".curr2").html().replace(
				"+", ""));
		var woodNeeded = parseInt($(capacity).find(".max").html());
		var woodAvailable = parseInt($("#res_wrapper #wood_count").html());

		capacity = $("#ww_town_capacity_stone .amounts");
		var stoneCount = parseInt($(capacity).find(".curr").html());
		var stoneArriving = parseInt($(capacity).find(".curr2").html().replace(
				"+", ""));
		var stoneNeeded = parseInt($(capacity).find(".max").html());
		var stoneAvailable = parseInt($("#res_wrapper #stone_count").html());

		capacity = $("#ww_town_capacity_iron .amounts");
		var ironCount = parseInt($(capacity).find(".curr").html());
		var ironArriving = parseInt($(capacity).find(".curr2").html().replace(
				"+", ""));
		var ironNeeded = parseInt($(capacity).find(".max").html());
		var ironAvailable = parseInt($("#res_wrapper #iron_count").html());

		woodNeeded -= woodArriving;
		stoneNeeded -= stoneArriving;
		ironNeeded -= ironArriving;

		// error_log("WndHandlerWonders: fillResourcesMax woodCount=" +
		// woodCount);
		// error_log("WndHandlerWonders: fillResourcesMax woodArriving=" +
		// woodArriving);
		// error_log("WndHandlerWonders: fillResourcesMax woodNeeded=" +
		// woodNeeded);
		// error_log("WndHandlerWonders: fillResourcesMax woodAvailable=" +
		// woodAvailable);

		while (left > 0) {
			var anything = 0;
			if ((left > 0) && (woodCount >= step) && (woodAvailable >= step)) {
				wood += step;
				woodCount -= step;
				woodNeeded -= step;
				woodAvailable -= step;
				anything += step;
				left -= step;
			}
			if ((left > 0) && (stoneCount >= step) && (stoneAvailable >= step)) {
				stone += step;
				stoneCount -= step;
				stoneNeeded -= step;
				stoneAvailable -= step;
				anything += step;
				left -= step;
			}
			if ((left > 0) && (ironCount >= step) && (ironAvailable >= step)) {
				iron += step;
				ironCount -= step;
				ironNeeded -= step;
				ironAvailable -= step;
				anything += step;
				left -= step;
			}

			if (anything == 0)
				break;
		}

		// error_log("WndHandlerWonders: fillResourcesMax wood=" + wood);
		// error_log("WndHandlerWonders: fillResourcesMax stone=" + stone);
		// error_log("WndHandlerWonders: fillResourcesMax iron=" + iron);

		$("#ww_trade_type_wood :text").val(wood);
		$("#ww_trade_type_stone :text").val(stone);
		$("#ww_trade_type_iron :text").val(iron);
	}

	uW.WndHandlerWonders.prototype.sendResources = function() {
		var root = this.wnd.getJQElement();
		var wood = root.find('#ww_trade_type_wood :text').val();
		var stone = root.find('#ww_trade_type_stone :text').val();
		var iron = root.find('#ww_trade_type_iron :text').val();

		error_log("WndHandlerWonders: sendResources wood=" + wood);
		error_log("WndHandlerWonders: sendResources stone=" + stone);
		error_log("WndHandlerWonders: sendResources iron=" + iron);

		if ((wood == 0 && stone == 0 && iron == 0) || (wood == '' && stone == '' && iron == '')) {
			if (this.startId == -1)
				uW.HumanMessage.error('No resource has been selected');
		} else {
			this.wnd
			.requestContentPost(
					'wonders',
					'send_resources',
					{
						wood : wood,
						stone : stone,
						iron : iron,
						island_x : this.island_x,
						island_y : this.island_y
					},
					function(arg1, arg2) {
					});
		}
	};

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	uW.WndHandlerWonders.prototype.next = function() {
		var delay = getRandomInt(1, 4);
		if ( this.fgaDelay == 1) {
			error_log("WndHandlerWonders: next delay="+delay);
			setTimeout(function() {
				window.location.href = 'javascript:Layout.townSwitch(ITowns.getNextTownId(Game.townId))';
			}, delay * 1000);
		} else {
			window.location.href = 'javascript:Layout.townSwitch(ITowns.getNextTownId(Game.townId))';
		}
	}

	uW.WndHandlerWonders.prototype.fillSendNextMax = function() {
		error_log("WndHandlerWonders: fillSendNext");
		this.fillResourcesMax();
		this.sendResources();
		this.next();
	}

	uW.WndHandlerWonders.prototype.fillAutomatic = function() {
		error_log("WndHandlerWonders: fillAutomatic");
		this.startId = uW.Game.townId;
		if ($("#fgaDelay").attr('checked')) 
			this.fgaDelay = 1;
		else
			this.fgaDelay = 0;
		error_log("WndHandlerWonders: fillAutomatic startId=" + this.startId);
		error_log("WndHandlerWonders: fillAutomatic fgaDelay=" + this.fgaDelay);
		this.fillSendNextMax();
	}

	uW.WndHandlerWonders.prototype.startId = -1;
	uW.WndHandlerWonders.prototype.fgaDelay = 0;

	error_log("WndHandlerWonders: hook @ onRcvData");

	uW.WndHandlerWonders.prototype.onRcvDataWWExt = uW.WndHandlerWonders.prototype.onRcvData;
	uW.WndHandlerWonders.prototype.onRcvData = function(data, controller,
			action) {
		error_log("WndHandlerWonders: onRcvData(" + controller + ", " + action
				+ ")");

		this.onRcvDataWWExt(data, controller, action);

		if (this.startId > -1) {
			if (uW.Game.townId != this.startId) {
				this.fillSendNextMax();
			} else {
				this.startId = -1;
				error_log("WndHandlerWonders: fillAutomatic stopped");
			}
		}

		if (action == "index") {
			$(".send_resources_btn .middle").html("Send").css("min-width","50px");
			$(".wonder_res_container .button")
			.after(
					'<a id="fillandgo" onclick="w(this).call(\'fillSendNextMax\')" href="#" class="button" class="fill"><span class="left"><span class="right"><span class="middle">Fill&Go</span></span></span></a>' + 
					'<a id="fillauto" onclick="w(this).call(\'fillAutomatic\')" href="#" class="button "><span class="left"><span class="right"><span class="middle">Automatic</span></span></span></a>' +
					'<input type="checkbox" ' + (this.fgaDelay==1 ? 'checked="checked" ' : '') + 'name="delay" id="fgaDelay">Delay<br>');
			$("#fillandgo .middle").css("min-width","50px");
			$("#fillauto .middle").css("min-width","50px");
		}
	}
}());
