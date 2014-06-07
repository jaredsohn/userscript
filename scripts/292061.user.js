// ==UserScript==
// @name           Includes : SamsungTV
// @namespace      http://gm.wesley.eti.br
// @description    SamsungTV Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2014+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.6
// @language       en
// @include        /userscripts\.org\/scripts\/review\/292061$/
// @grant          GM_xmlhttpRequest
// @icon           http://gm.wesley.eti.br/icon.php?desc=292061
// @require        /scripts/source/292725.user.js
// @require        /scripts/source/288385.user.js
// @debug          true
// @uso:author     55607
// @uso:script     292061
// ==/UserScript==

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

function SamsungTVException (message) {
	this.name = "SamsungTVException";
	this.message = message;
}

function SamsungTV (endpoint) {
	if (!endpoint) {
		throw new SamsungTVException("Endpoint is required.");
	}

	this.set = function (obj) {
		var urn = "urn:" + obj.service.urn + ":service:" + obj.service.name + ":1",
		content = (function r (v) {
			if (typeof v == "object") {
				var output = "";

				for (var i in v) {
					output += "<" + i + ">" + r(v[i]) + "</" + i + ">";
				}

				return output;
			} else {
				return v;
			}
		}(obj.content)),
		xhr = GM_xmlhttpRequest({
			method	: "POST",
			url		: "http://" + endpoint + obj.service.url + "/control/" + obj.service.name,
			data	: '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:' + obj.action + ' xmlns:u="' + urn + '">' + content + '</u:' + obj.action + '></s:Body></s:Envelope>',
			synchronous : !!obj.sync,
			headers	: {
				"SOAPAction"	: urn + "#" + obj.action,
				"Content-Type"	: "text/xml; charset=utf-8",
				"Connection"	: "close",
			},
		});

		return new DOMParser().parseFromString(xhr.responseText || "", "text/xml");
	};
	this.get = function (obj) {
		obj.sync = true;

		return (function r (xml) {
			var output = {};

			if (!xml.firstChild || 3 == xml.firstChild.nodeType) {
				output = xml.textContent;
			} else {
				for each (var n in Array.prototype.slice.apply(xml.childNodes)) {
					output[n.nodeName] = r(n);
				}
			}
			
			return output;
		}(this.set(obj).querySelector(obj.node)));
	}
};

SamsungTV.prototype = {
	_message	: "",
	services	: [{
		name	: "RenderingControl1",
		urn		: "schemas-upnp-org",
		url		: "/upnp",
	}, {
		name	: "ConnectionManager1",
		urn		: "schemas-upnp-org",
		url		: "/upnp",
	}, {
		name	: "AVTransport1",
		urn		: "schemas-upnp-org",
		url		: "/upnp",
	}, {
		name	: "TestRCRService",
		urn		: "samsung.com",
		url		: "/RCR",
	}, {
		name	: "MessageBoxService",
		urn		: "samsung.com",
		url		: "/PMR",
	}],

	set MUTE (value) {
		this.set({
			service	: this.services[0],
			action	: "SetMute",
			content	: '<InstanceID>0</InstanceID><Channel>Master</Channel><DesiredMute>' + (value?1:0) + '</DesiredMute>',
		});
	},
	get MUTE () {
		return (1 == this.get({
			service	: this.services[0],
			action	: "GetMute",
			content	: '<InstanceID>0</InstanceID><Channel>Master</Channel>',
			node	: "CurrentMute",
		}));
	},

	set VOLUME (value) {
		this.set({
			service	: this.services[0],
			action	: "SetVolume",
			content	: '<InstanceID>0</InstanceID><Channel>Master</Channel><DesiredVolume>' + value + '</DesiredVolume>',
		});
	},
	get VOLUME () {
		return this.get({
			service	: this.services[0],
			action	: "GetVolume",
			content	: '<InstanceID>0</InstanceID><Channel>Master</Channel>',
			node	: "CurrentVolume",
		});
	},

	set SHARPNESS (value) {
		this.set({
			service	: this.services[0],
			action	: "SetSharpness",
			content	: '<InstanceID>0</InstanceID><DesiredSharpness>' + value + '</DesiredSharpness>',
		});
	},
	get SHARPNESS () {
		return this.get({
			service	: this.services[0],
			action	: "GetSharpness",
			content	: '<InstanceID>0</InstanceID>',
			node	: "CurrentSharpness",
		});
	},

	set COLOR_TEMPERATURE (value) {
		this.set({
			service	: this.services[0],
			action	: "SetColorTemperature",
			content	: '<InstanceID>0</InstanceID><DesiredColorTemperature>' + value + '</DesiredColorTemperature>',
		});
	},
	get COLOR_TEMPERATURE () {
		return this.get({
			service	: this.services[0],
			action	: "SetColorTemperature",
			content	: '<InstanceID>0</InstanceID>',
			node	: "CurrentColorTemperature",
		});
	},

	set CONTRAST (value) {
		this.set({
			service	: this.services[0],
			action	: "SetContrast",
			content	: '<InstanceID>0</InstanceID><DesiredContrast>' + value + '</DesiredContrast>',
		});
	},
	get CONTRAST () {
		return this.get({
			service	: this.services[0],
			action	: "GetContrast",
			content	: '<InstanceID>0</InstanceID>',
			node	: "CurrentContrast",
		});
	},

	set BRIGHTNESS (value) {
		this.set({
			service	: this.services[0],
			action	: "SetBrightness",
			content	: '<InstanceID>0</InstanceID><DesiredBrightness>' + value + '</DesiredBrightness>',
		});
	},
	get BRIGHTNESS () {
		return this.get({
			service	: this.services[0],
			action	: "GetBrightness",
			content	: '<InstanceID>0</InstanceID>',
			node	: "CurrentBrightness",
		});
	},

	set PRESENTS (value) {
		this.set({
			service	: this.services[0],
			action	: "SelectPreset",
			content	: '<InstanceID>0</InstanceID><PresetName>' + value + '</PresetName>',
		});
	},
	get PRESENTS () {
		return this.get({
			service	: this.services[0],
			action	: "ListPresets",
			content	: '<InstanceID>0</InstanceID>',
			node	: "CurrentPresetNameList",
		});
	},

	set MESSAGE (value) {
		this._message = value;
		
		var x = {
			action	: "RemoveMessage",
			content	: "",
		};

		if (value) {
			var result = (function r (v) {
				if (typeof v == "object") {
					var output = "";

					for (var i in v) {
						output += "<" + i + ">" + r(v[i]) + "</" + i + ">";
					}

					return output;
				} else {
					return v;
				}
			}(value)).replace(/[<>]/g, function ($0) {
				return "&" + (">" == $0?"g":"l") + "t;";
			});

			x = {
				action	: "AddMessage",
				content	: '<MessageType>text/xml; charset=&quot;utf-8&quot;</MessageType><Message>' + result + '</Message>',
			};
		}

		this.set({
			service	: this.services[4],
			action	: x.action,
			content	: '<MessageID>0</MessageID>' + x.content,
		});
	},
	get MESSAGE () {
		return this._message;
	},
	
	get PROTOCOL_INFO () {
		return this.get({
			service	: this.services[1],
			action	: "GetProtocolInfo",
			content	: '',
			node	: "GetProtocolInfoResponse",
		});
	},

	get PAUSE () {
		return this.set({
			service	: this.services[2],
			action	: "Pause",
			content	: '<InstanceID>0</InstanceID>',
			sync	: true,
		});
	},

	set MESSAGE2 (value) {
		this._message2 = value;
		
		var x = {
			action	: "RemoveMessage",
			content	: "",
		};

		if (value) {
			var result = (function r (v) {
				if (typeof v == "object") {
					var output = "";

					for (var i in v) {
						output += "<" + i + ">" + r(v[i]) + "</" + i + ">";
					}

					return output;
				} else {
					return v;
				}
			}(value)).replace(/[<>]/g, function ($0) {
				return "&" + (">" == $0?"g":"l") + "t;";
			});

			x = {
				action	: "AddMessage",
				content	: '<MessageType>text/xml; charset=&quot;utf-8&quot;</MessageType><Message>' + result + '</Message>',
			};
		}

		this.set({
			service	: this.services[3],
			action	: x.action,
			content	: '<MessageID>0</MessageID>' + x.content,
		});
	},
	get MESSAGE2 () {
		return this._message2;
	},

	set SENDKEY (value) {
		this.set({
			service	: this.services[4],
			action	: "SendKeyCode",
			content	: value,
		});
	},
};

Assert.execute(function SamsungTVTest () {
	this.beforeClass = function () {
		this.target = new SamsungTV(prompt("ip:port", "192.168.0.20:52235"));
	};

	this.testShouldShowSmsOnTv = function () {
		this.target.MESSAGE = {
			Category	: "SMS",
			DisplayType	: "Maximum",
			ReceiveTime	: {
				Date	: "2014-01-18",
				Time	: "04:36:00",
			},
			Receiver	: {
				Number	: "PNumber",
				name	: "Name",
			},
			Sender		: {
				Number	: "PNumber",
				name	: "Name",
			},
			Body		: "Test",
		};
	};
	
	this.testShouldReturnSamsungTVException = function () {
		try {
			new SamsungTV();
			fail("Shouldn't reach here.");
		} catch (e) {
			if (e instanceof SamsungTVException) {
				assertEquals("Endpoint is required.", e.message);
			} else {
				throw e;
			}
		}
	};

	this.testShouldReturnVolume = function () {
		assertFalse(isNaN(this.target.VOLUME));
	};

	this.testShouldReturnBrightness = function () {
		assertFalse(isNaN(this.target.BRIGHTNESS));
	};

	this.testShouldReturnSharpness = function () {
		assertFalse(isNaN(this.target.SHARPNESS));
	};
});

/*
console.log(device.PAUSE);
console.log(device.SENDKEY = {KeyCode:,KeyDescription:});
device.VOLUME = 13;
*/