// ==UserScript==
// @name        Anti-AntiBlock Plus
// @description Skip a lot of anti-adblock.
// @author		floxflob
// @homepageURL	http://userscripts.org/scripts/show/158054
// @updateURL 	http://userscripts.org/scripts/source/158054.meta.js
// @downloadURL	http://userscripts.org/scripts/source/158054.user.js
// @license	GPL version 3
// @include     *
// @exclude http*://*google.*
// @exclude http*://*.gmail.* 
// @grant unsafeWindow
// @grant GM_addStyle
// @version     2.1.2
// @run-at         document-start
// ==/UserScript==

/*========================================================

	Thanks to InfinityCoding for developping this script.
		Script created for www.antipubfirefox.org

========================================================*/

// *** General purpose functions ***

// Test if a string is part of another one
String.prototype.contains = function(testString) {return this.indexOf(testString) != -1;};

// Delete a DOM element
function removeElement(element) {
    return element.parentNode.removeChild(element);
}

function stopEvt(e) {
	e.preventDefault();
	e.stopPropagation();
	e.returnValue = false;
}

function isDef(elem) {
	return elem != null && elem != 'undefined';
}

function evtHtml(e) {
	if (ua == 'opera') {
		return e.element.text;
	} else {
		return e.target.innerHTML;
	}
}

// *** Patterns to match ***

adRules = {
        Uptobox: {
            host: ['uptobox.com'],
            direct: function() {
                css = ".middle-content + .middle-content div[id] {\n    -moz-binding: none !important;\n    display: block !important;\n    visibility: hidden !important;\n    height: 90px !important;\n    margin-top: -90px !important;\n  }";
                GM_addStyle(css);
            },
            scriptexec: function (e) {
				if (evtHtml(e).contains('window.location = "/pages/adblock.html"')) {
					stopEvt(e);
				}
            },
			contentloaded: function() {
			}
        },
        Sawlive: {
            host: ['sawlive.tv'],
            scriptexec: function (e) { 
				// Find timer and proceed
				if (e.target.innerHTML.contains('function closeMyAd(){')) {
					e.preventDefault();
					e.stopPropagation();
					
					document.getElementById("sawdiv").innerHTML = "";
					document.getElementById("sawdiv").style.display = "none";
					document.getElementById("splay").style.visibility = "visible";
					document.getElementById("sloading").innerHTML = "";
					unsafeWindow.active=1;
					unsafeWindow.so.write("jwplayer1");
				}
            },
			contentloaded: function() {
			}
        },
		Afreesms: {
            host: ['afreesms.com'],
            scriptexec: function (e) { 
				if (e.target.innerHTML.contains('var adblock = true;')) {
					e.preventDefault();
					e.stopPropagation();
					
					// Disable the Adblock flag
					unsafeWindow.adblock = false;
				}
            },
			contentloaded: function() {
			}
        },
		AntiBlock: {
			// This can be on any website
            host: ['.*?'],
            scriptexec: function (e) { 
				if (e.target.innerHTML.contains('Math.max(k,parseFloat(this.getStyle(d.childNodes[f]).zIndex)||0))')) {
                    stopEvt(e);
				}
            },
			contentloaded: function() {
				fooStyle = document.getElementsByTagName('style');
				for (i in fooStyle) {
					currStyle = fooStyle[i];
					// Find the style greying the page
					if (currStyle.nodeType == 1) {
    					if (currStyle.innerHTML.contains('top:expression((t=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)+"px"')) {
    						// Get the text warnings (disable adblock & enable javascript)
    						if (currStyle.nextSibling.nextSibling != null) { removeElement(currStyle.nextSibling.nextSibling); }
    						if (currStyle.nextSibling != null) { removeElement(currStyle.nextSibling) };
    						removeElement(currStyle);
    					}
    				}
				}
			},
			dominserted: function (e) {				
			     textTest = /Please disable your ad blocker|Attention désactivez tout bloqueur de pub pour acceder au site|Veuillez désactiver votre bloqueur de publicité|Για τη πλοήγηση σας στο AndroidHellas απαιτείται η απενεργοποίηση του ad blocker στον browser σας!|Por favor, desactive el bloqueador de anuncios|Attention désactivez tout bloqueur de pub pour acceder au débrideur |So please Help us and DISABLE it on our website | You are using an Ad Block on our website !|Si tu ne veux pas regarder mes pubs, tu ne pourra non plus regarder mon site|Vous utilisez un bloqueur de publicités|Fermer Pub|adblocker.png/i;
			     if (textTest.test(e.target.innerHTML)) {
			         removeElement(e.target);
			     }
			}
        },
		Dinozap: {
            host: ['dinozap.tv'],
            scriptexec: function (e) {
				if (e.target.innerHTML.contains('window.location = "http://www.dinozap.tv/noadsblock.html"') || e.target.innerHTML.contains('window.location = "http://cache.hdcastream.com/noadsblock.html"')) {
					stopEvt(e);
				}
            },
			contentloaded: function() {
			}
        },
		Kingofdown: {
            host: ['kingofdown.com','hdstreamium.com'],
            scriptexec: function (e) { 
            },
			contentloaded: function() {
				fooNoscript = document.getElementsByTagName('noscript');
				for (i in fooNoscript) {
					currNoscript = fooNoscript[i];
					// Find the style greying the page
					if (currNoscript.innerHTML.contains('So please Help us and DISABLE it on our website')) {
						// Get the text warnings (disable adblock & enable javascript)
                        removeElement(currNoscript);
					}
				}
			}
        },
        Rapidebrideur: {
            host: ['rapidebrideur.com'],
            scriptexec: function (e) {
				if (e.target.innerHTML.contains('Attention désactivez tout bloqueur de pub pour acceder au site')) {
					e.preventDefault();
					e.stopPropagation();
				}
            },
			contentloaded: function() {
			 document.getElementById("blockblockA").style.display = "none";
			 document.getElementById("blockblockB").style.display = "block";
			}
        },
        Bigdownloader: {
            host: ['bigdownloader.com'],
            scriptexec: function (e) {
				if (e.target.innerHTML.contains('adblockblock = function()')) {
					e.preventDefault();
					e.stopPropagation();
				}
            },
			contentloaded: function() {
			}
        },
        Replay: {
            host: ['replay.fr'],
            scriptexec: function (e) {
			},
			contentloaded: function() {
			     // Redirection to a 3rd party website
			     if (location.pathname.split('/')[1] == "players") {
			         videoURL = unsafeWindow.ads_config.player_url;
			         if (videoURL != null && videoURL != 'undefined') {
			             document.location.href = videoURL;
			         }
			     }
			}
        },
		// Commented because the redirection script is external
        Coder143: {
            host: ['coder143.com'],
            scriptexec: function (e) {
                // Script redirecting to adf.ly and bc.vc
				if (e.target.innerHTML.contains('adfly_id')) {
					e.preventDefault();
					e.stopPropagation();
				}
			},
			contentloaded: function() {
			}
        },
        GNT: {
            host: ['generation-nt.com'],
            scriptexec: function (e) {
			},
			contentloaded: function() {
				clickBody = document.getElementsByTagName('body')[0];
				clickBody.onclick = null;
				clickBody.href = null;
				clickBody.style.cursor = 'default';
			}
        },
        Prozik: {
            host: ['pro-zik.ws'],
            scriptexec: function (e) {
                if  (e.target.innerHTML.contains('window.location = "http://www.pro-zik.ws/ads.php"')) {
                    e.preventDefault();
                    e.stopPropagation();
                }
			},
			contentloaded: function() {
			}
        },
        Skyrock: {
            host: ['skyrock.fm'],
            scriptexec: function (e) {
			},
			contentloaded: function() {
				if (document.location.pathname.split('/')[1] == 'player') {
					redir = document.getElementById('skip').getElementsByTagName('a')[0].href;
					if (redir != null && redir != 'undefined') {
						document.location.href = redir;
					}
				}
			}
        }
}

// *** Runtime variables ***

ua = '';
if (navigator.userAgent.contains('Opera')) { ua = 'opera' };
if (navigator.userAgent.contains('Chrome')) { ua = 'chrome' };

// *** Main Code ***

for (i in adRules) {
	currRule = adRules[i];
	// Create a RegExp to test if we are on this domain
	testHosts = new RegExp(currRule.host.join('|'), 'i');
	// If we are on one of the domains
	if (testHosts.test(document.domain)) {
	    if (isDef(currRule.direct)) { currRule.direct(); }
		if (ua == 'opera') {
			window.opera.addEventListener('BeforeScript', currRule.scriptexec, false);
		} else {
			window.addEventListener('beforescriptexecute', currRule.scriptexec);
		}
		window.addEventListener('DOMContentLoaded', currRule.contentloaded);
		window.addEventListener('DOMNodeInserted', currRule.dominserted);
	}
}