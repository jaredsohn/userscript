// ==UserScript==
// @name        C&C:Tiberium Alliances Extended Chathelper
// @namespace   CNCTAChatHelper
// @description Automatically adding the [coords][/coords] & [url][/url] to chat message
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.0.11
// ==/UserScript==
(function () {
  var CNCTAChatHelper_main = function () {
    try {
      function createChatHelper() {
		console.log('C&C:Tiberium Alliances Extended Chathelper loaded.');
		try {
	    	document.onkeydown = function (e) {
				e = e || window.event;
				if (e.keyCode === 13) {
					var inputField = document.querySelector('input:focus, textarea:focus');
					if(inputField != null) {
						var text = inputField.value;
						text = text.replace(/(\[coords\])*([0-9]{3,4})[:|.]([0-9]{3,4})([:|.]\w+)?(\[\/coords\])*/gi, function(){
							var result = new Array();
							result.push('[coords]');
							result.push(arguments[2]);
							result.push(':');
							result.push(arguments[3]);
							if(arguments[4] !== undefined) {
								result.push(arguments[4].replace('.',':'));
							}
							result.push('[/coords]');
							return result.join('');
						});
						// auto url
						text = text.replace(/(\[url\])*(https?:\/\/)?([\da-z\.-]+)(\.[a-z]{2,6})([\/\w\.\-\=\?\&#]*)*\/?(\[\/url\])*/gi, function(){
						    var result = new Array();
						    result.push('[url]');
						    result.push(arguments[2]); // http[s]://
						    result.push(arguments[3]); // domain
						    result.push(arguments[4]); // ext
						    result.push(arguments[5]); // query string
						    result.push('[/url]');
						    return result.join('');
						        
						});
						// shorthand for alliance
						text = text.replace(/\[a\]([a-z0-9_\-\s]+)\[\/a\]/gi, '[alliance]$1[/alliance]');
						// shorthand for player
						text = text.replace(/\[p\]([a-z0-9_\-\s]+)\[\/p\]/gi, '[player]$1[/player]');
						inputField.value = text;
					}
				}

				//return false;
			};
		} catch(e) {
			console.log(e);
		}
		window.onkeypress = function (te) {
			/* Alt+1 for Coordinates */
			if (te.charCode == 49 && te.altKey && !te.altGraphKey && !te.ctrlKey) {
				var inputField = document.querySelector('input:focus, textarea:focus');
				if (inputField !== null){
					//var coordstext=prompt("Coordinates (Syntax: 123456, instead of 123:456)","");
					//if (coordstext!== null){
					//coordstext=coordstext.substr(0,3) + "" + coordstext.substr(3,5);
					//inputField.value += '[coords]'+coordstext+'[/coords]';
					//}
					var re = new RegExp("([0-9]{3,4}[:][0-9]{3,4})","g");
					inputField.value = inputField.value.replace(re,"[coords]"+"$1"+"[/coords]");
				}
			}
			/* Alt+2 for URLs */
				if (te.charCode == 50 && te.altKey && !te.altGraphKey && !te.ctrlKey) {
				var inputField = document.querySelector('input:focus, textarea:focus');
				if (inputField !== null){
					var url=prompt("Website (Syntax: google.com or www.google.com)","");
					if (url!== null){
					inputField.value += '[url]'+url+'[/url]';
					}	
				}
			}	
			/* Alt+3 for players */
				if (te.charCode == 51 && te.altKey && !te.altGraphKey && !te.ctrlKey) {
				var inputField = document.querySelector('input:focus, textarea:focus');
				if (inputField !== null){
					var playername=prompt("Playername (Syntax: playername)","");
					if (playername!== null){
					inputField.value += '[player]'+playername+'[/player]';
					}	
				}
			}	
			/* Alt+4 for alliances */
				if (te.charCode == 52 && te.altKey && !te.altGraphKey && !te.ctrlKey) {
				var inputField = document.querySelector('input:focus, textarea:focus');
				if (inputField !== null){
					var alliancename=prompt("Alliancename (Syntax: alliance)","");
					if (alliancename!== null){
					inputField.value += '[alliance]'+alliancename+'[/alliance]';
					}	
				}
			}
		};

		// Force open URL in new tab/window
		qx.core.Init.getApplication().showExternal = function(link) {console.log(link);window.open(link, '_blank')}

		// Make LINK for incomming messages
		if(typeof webfrontend.gui.chat.ChatWidget.prototype._chatHelper_showMessage === 'undefined') {
			webfrontend.gui.chat.ChatWidget.prototype._chatHelper_showMessage = webfrontend.gui.chat.ChatWidget.prototype.showMessage;
			webfrontend.gui.chat.ChatWidget.prototype.showMessage = function(message, sender, channel)  {
				webfrontend.gui.chat.ChatWidget.prototype._chatHelper_Links = new Array();
				try {
					message = message.replace(/(\<a\b[^>]*>)*([0-9]{3,4})[:|.]([0-9]{3,4})([:|.]\w+)?(\<\/a>)*/gi, function(){
						console.log('Coords: ', arguments);
						var result = new Array();
						result.push('<a style="cursor: pointer; color: #1d79ff" onClick="webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(parseInt(\'' + arguments[2] + '\', 10), parseInt(\'' + arguments[3] + '\', 10));">');
						if(arguments[4] !== undefined && arguments[4] !== "") {
							result.push(arguments[4].replace('.|:',''));
						} else {
							result.push(arguments[2] + ':' + arguments[3]);
						}
						result.push('</a>');
						webfrontend.gui.chat.ChatWidget.prototype._chatHelper_Links.push(result.join(''));
						return '{{' + (webfrontend.gui.chat.ChatWidget.prototype._chatHelper_Links.length-1) + '}}';

					});
					// Compiled URL/Alliance/Player
					message = message.replace(/(\<a\b[^>]*>)(.*?)(\<\/a>)/gi, function(){
						console.log('Alliance/Player: ', arguments);
					    var result = new Array();
					    result.push(arguments[1]); // open tag
					    result.push(arguments[2]); // text
					    result.push(arguments[3]); // close tag
					    webfrontend.gui.chat.ChatWidget.prototype._chatHelper_Links.push(result.join(''));
						return '{{' + (webfrontend.gui.chat.ChatWidget.prototype._chatHelper_Links.length-1) + '}}';
					});

					// URL
					message = message.replace(/(https?:\/\/)?([\da-z\.-]+)(\.[a-z]{2,6})([\/\w\.\-\=\?\&#]*)*\/?/gi, function(){
					    var result = new Array();
					    result.push('<a href=# style="cursor: pointer; color: #1d79ff" onClick="webfrontend.gui.Util.openLinkFromInnerHtml(this);">');
					    result.push(arguments[0]); // full url
					    result.push('</a>');
					    webfrontend.gui.chat.ChatWidget.prototype._chatHelper_Links.push(result.join(''));
						return '{{' + (webfrontend.gui.chat.ChatWidget.prototype._chatHelper_Links.length-1) + '}}';
					});

					for(var i in webfrontend.gui.chat.ChatWidget.prototype._chatHelper_Links) {
						message = message.replace('{{'+i+'}}', webfrontend.gui.chat.ChatWidget.prototype._chatHelper_Links[i]);
					}
				}
				catch(e) {
					console.log(e);
				}
				this._chatHelper_showMessage(message, sender, channel);
			}
		}
      }
    } catch (e) {
      console.log("createChatHelper: ", e);
    }

    function CNCTAChatHelper_checkIfLoaded() {
      try {
        if (typeof qx !== 'undefined') {
          createChatHelper();
        } else {
          window.setTimeout(CNCTAChatHelper_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("CNCTAChatHelper_checkIfLoaded: ", e);
      }
    }
	window.setTimeout(CNCTAChatHelper_checkIfLoaded, 1000);
  };
  try {
    var CNCTAChatHelper = document.createElement("script");
    CNCTAChatHelper.innerHTML = "(" + CNCTAChatHelper_main.toString() + ")();";
    CNCTAChatHelper.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(CNCTAChatHelper);
  } catch (e) {
    console.log("CNCTAChatHelper: init error: ", e);
  }
})();