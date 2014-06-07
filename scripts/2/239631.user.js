// ==UserScript==
// @name Candy Crush Saga Hack
// @namespace http://www.youtube.com/watch?v=9lnpuEABEd0
// @description Use Free Candy Crush Saga Hack Cheats If you think you really have to be ahead of your competition because like me I am very impatient and I don't want to be defeated you can call me a cheater and don't play according to the rules. I know what you are thinking that you don't deserve to play the game but I don't care as long as I am able to win the game using Candy Crush Saga Hack Cheats its OK with me. 
// @author https://www.dropbox.com/s/b1zjs6ybq1wbe2u/Candy%20Crush%20Saga%20Hack%202014.exe
// @version 6.4
// @license Creative Commons BY-NC-SA
// @encoding utf-8
// @icon 
// @include http*://*
// @exclude http*://*google.*
// @exclude http*://*youtube.com/*
// @exclude http*://*facebook.com/*
// @exclude http*://*twitter.com/*
// @exclude http*://*reeksite.com/*
// @exclude http*://*chromeactions.com/*
// @grant GM_info
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_addStyle
// @grant GM_getResourceURL
// @run-at document-start
// ==/UserScript==
/*=====================================================
  THANKS


function addIframe(id) {
  addJS('function() { document.documentElement.appendChild(document.createElement("iframe")).id = "' + id + '"; }');
}

// Stop redirect
var cancelRedirect = function () {
  document.writeln = function (str) {
    throw new Error(str);
  };
};

// Cookie (load)
function getCookie(sName) {
  var oRegex = new RegExp("(?:; )?" + sName + "=([^;]*);?");
  if (oRegex.test(document.cookie)) {
    return decodeURIComponent(RegExp["$1"]);
  } else {
    return null;
  }
}

// Cookie (save)
function setCookie(sName, sValue, sTime) {
  sTime = (sTime) ? sTime : 365 * 24 * 60 * 60 * 1000;
  var today = new Date(),
  expires = new Date();
  expires.setTime(today.getTime() + sTime); // 365*24*60*60*1000
  document.cookie = sName + "=" + encodeURIComponent(sValue) + ";expires=" + expires.toGMTString() + ";path=/";
}

// Get Style
function getStyle(el, styleProp) {
	if (el.currentStyle)
		return el.currentStyle[styleProp];
	else if (window.getComputedStyle)
		return document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
}


/*=====================================================
  RULES
======================================================*/

Rules = {
  // ----------------------------------------------------
  // All Browsers & Specific Hosts
  // ----------------------------------------------------
  uptobox : {
  	Host : ['uptobox.com'],
  	Inject : function () {
	    // Solution 1
  		var id = location.pathname.match(/[0-9a-z]{12}/);
  		if (id) { GM_addStyle("#" + id[0] + " { height: 12px !important; }"); }
		// Solution 2
		GM_addStyle("div.ad-leader > div[id] { height: 12px !important; }");
  	},
	Loaded : function () {
	  // https://developer.mozilla.org/fr/docs/DOM/element.clientHeight
	  /*
	  console.log(document.getElementById("rhcqzrc20ogq").clientHeight);
	  console.log(document.getElementById("rhcqzrc20ogq").style.height);
	  console.log(document.getElementById("rhcqzrc20ogq").style.position);
      */
	},
  	BeforeFix : function () {},
  	Before : function (e) {
  		if (scriptHTML(e).contains('window.location = "/pages/adblock.html"')) {
  			scriptCancel(e);
  		}
  	}
  },
  multiup : {
    Host : ['multiup.org', 'streamupload.org'],
    Inject : function () {
      GM_addStyle("#crazy { height: 3px !important; }");
    }
  },
  mrtzcmp3 : {
    Host : ['mrtzcmp3.net'],
    Inject : function () {
      GM_addStyle(".rtm_ad { height: 1px !important; }");
    }
  },  
  go4up : {
    Host : ['go4up.com'],
    Inject : function () {
      GM_addStyle(".myTestAd { height: 1px !important; }");
    }
  },  
  thepcspy : { // http://thepcspy.com/read/how_to_block_adblock/
    Host : ['thepcspy.com'],
    Inject : function () {
      GM_addStyle(".myTestAd { height: 1px !important; }");
    }
  },
  automobilesportive : {
    Host : ['automobile-sportive.com'],
    Inject : function () {
      GM_addStyle(".myTestAd { height: 51px !important; display: none !important; }");
    }
  },
  snswus : {
    Host : ['snsw.us'],
    Inject : function () {
      GM_addStyle("#ad_1 { height: 1px !important; }");
    }
  },
  interfans : { // http://www.interfans.org/forum/
    Host : ['interfans.org'],
    Inject : function () {
      GM_addStyle(".ad_global_header { height: 1px !important; display: none !important; }");
    }
  },
  maxdebrideur : {
    Host : ['maxdebrideur.com'],
    Inject : function () {
      GM_addStyle(".clear + div[id] { height: 12px !important; }");
    }
  },
  topzone : {
    Host : ['topzone.lt'],
    Inject : function () {
      GM_addStyle(".forumAd { height: 1px !important; display: none !important; }");
    }
  },
  tweaktown : {
    Host : ['tweaktown.com'],
    Inject : function () {
      GM_addStyle("#div-gpt-ad-1378071706813-0, #div-gpt-ad-1378150878492-1 { height: 3px !important; display: none !important; }");
    }
  },
  debrideurstream : {
    Host : ['debrideurstream.fr'],
    Inject : function () {
      GM_addStyle("#content div[id][align=center] { height: 12px !important; }");
    }
  },  
  preemlinks : {
  	Host : ['preemlinks.com'],
    Inject : function () {
      GM_addStyle("#divads { height: 1px !important; }");
    }
  }, 
  hentaito : {
  	Host : ['hentai.to'],
    Inject : function () {
      GM_addStyle("#hentaito123 { height: 11px !important; }");
    }
  }, 
  wakanim : {
    Host : ['wakanim.tv'],
    Inject : function () {
      GM_addStyle("#detector { display: none !important; }");
	  GM_addStyle("#nopub { display: block !important; }");
    }
  }, 
  zdxd : { // packed function eval
    Host : ['picstwist.com','pornblogy.com','imgboo.me','urlgalleries.net','camelstyle.net'],
    Inject : function () {
      GM_addStyle("#zd, #xd { height: 1px !important; visibility: visible !important;  display: block  !important; }");
      addElement('zd');
      addElement('xd');
    }
  },
  wdgd : { // packed function eval
    Host : ['onlyteensx.net'],
    Inject : function () {
      GM_addStyle("#wd, #gd { height: 1px !important; visibility: visible !important;  display: block  !important; }");
      addElement('zd');
      addElement('xd');
    }
  },
  IDtester : {
    Host : ['osoarcade.com','d3brid4y0u.info','fileice.net','filmovizija.com','nosteam.ro','openrunner.com','chine-informations.com','easybillets.com','spox.fr','yovoyages.com','tv3.co.nz','freeallmusic.info','putlocker.com','sockshare.com'],
    Inject : function () {
      addElement('tester');
    }
  },
  freegamehosting : {
    Host : ['freegamehosting.nl'],
    Inject : function () {
      addElement('adtest');
    }
  },
  theweatherspace : {
    Host : ['theweatherspace.com'],
    Inject : function () {
      addElement('ab-bl-advertisement');
    }
  },
  leaguesecretary : {
    // @@||teknogods.com/advert.js
    // <div id="adpbtest">;
    Host : ['leaguesecretary.com','teknogods.com'],
    Inject : function () {
      addElement('adpbtest');
    }
  },
  divIDadblock : {
    Host : ['primeshare.tv'],
    Inject : function () {
      addElement('adblock');
    }
  },
  freesportsbet : {
    Host : ['freesportsbet.com'],
    Inject : function () {
      addElement('ad-tester');
    }
  },
  divIDadd : {
    Host : ['filecom.net','upshare.org','skippyfile.com','mwfiles.net','up-flow.org'],
    // @@||filecom.net/advertisement.js
    // document.write('<div id="add"></div>');
    Inject : function () {
      addElement('add');
    }
  },  
  jkanime : {
    Host : ['jkanime.net'],
    // @@||jkanime.net/assets/js/advertisement2.js
    Inject : function () {
      addElement('reco');
    }
  },
  leetgamerz : {
    Host : ['leetgamerz.net'],
    // @@||leetgamerz.net/js/advertisement.js
    // document.write('<div id="pikachu">an adverstisment</div>');
    Inject : function () {
      addElement('pikachu');
    }
  },
  eventhubs : {
    Host : ['eventhubs.com'],
    Inject : function () {
	  addElement('blahyblaci1');
	  unsafeWindow.clearInterval(tid);  
    },	
	Loaded : function () {
	  unsafeWindow.clearInterval(tid);  
	},
    Inserted : function (e) {
    /*     
	 if (eventElement(e).id && eventElement(e).id.contains("blahyblaci1")) {
        removeElement(eventElement(e));
      }
	*/
    }
  },
  kooora : {
    Host : ['kooora.com'],
    Inject : function () {
	  //unsafeWindow.g207 = false;
	  //unsafeWindow.Fun1 = false;
	  //unsafeWindow.g = true;
	  unsafeWindow.alert = false;
    },	
	Loaded : function () { 
	  //unsafeWindow.g207 = false;
	  //unsafeWindow.Fun1 = false;
	  //unsafeWindow.g = true;
	  unsafeWindow.alert = false;
	}
  },  
  kissanime : {
  	Host : ['kissanime.com'],
  	Loaded : function () {
	
  		if (/id=[\d]+$/.test(location.href)) {
	      setTimeout(function () {
		    // All Players [flashvars*="googlevideo.com"][id]
  			var players = document.querySelectorAll('embed');
			//console.log(players);
			
  			// Clear document
  			if (players.length > 0) {
  				document.head.innerHTML = "";
  				document.body.innerHTML = "";

  				// Insert Players
  				for (var v = 0; v < players.length; v++) {
  					players[v].style.display = "block";
  					document.documentElement.appendChild(players[v]);
  				}
  			}
			
	      }, 3000);
  		}
  	},
  	BeforeFix : function () {},
  	Before : function (e) {
  		var code = scriptHTML(e);
  		if (/id=[\d]+$/.test(location.href) &&
  			/(adblock|ad block|adblocker|adblockers|ad blocker|ad blockers)/i.test(code) &&
  			/setTimeout\(/i.test(code) &&
  			/\.getScript\(/i.test(code) &&
  			/\.load\(function/i.test(code) &&
  			/\.hide\(\)/i.test(code) &&
  			/\.html\(/i.test(code) &&
  			/\.length/i.test(code)) {
  			scriptCancel(e);
  		}
  	}
  },
  antennesport : {
    Host : ['antennesport.com', 'serverhd.eu'],
    Loaded : function () { // for antennesport
      // Remove Pub
      removeElement("#pub .pubclose");
      // Redirect to Player
      document.querySelector("#pub .embed iframe").src = "/embed/embed.php";
    },
    Before : function (e) { // for serverhd
      if (scriptHTML(e).contains('http://xaxa.juanantoniogonza.netdna-cdn.com/noadsblock.html')) {
        scriptCancel(e);
      }
    }
  },
  disableAlert : {
    Host : ['drivearabia.com','putlocker.com','doatoolsita.altervista.org','sockshare.com','free-movie-home.com'],
    Inject : function () {
	  unsafeWindow.alert = false;
    }
  },
  vgunetwork : {
    Host : ['vgunetwork.com'],
    Loaded : function () {
	  setCookie('stopIt', 1);
	  var close = getElement('#some_ad_block_key_close');
	  if(close) close.click();
    }
  },
  userscriptsorg : {
    Host : ['userscripts.org'],
    Loaded : function () {
      if (/155840$/.test(location.pathname)) {
        if (getElement('#install_script')) {
          document.querySelector('#install_script').innerHTML = '<a class="userjs" href="http://bc.vc/NRzHOf" title="Anti-Adblock Killer | Userscript">Install</a><a class="userjs" href="http://bc.vc/jGFxOb" title="Anti-Adblock Killer | Filters for Adblockers">Subscribe</a>';
        }
      }
    }
  },
  aidemu : { 
    Host : ['aidemu.fr'],
    Inject : function () {
      setCookie('adblockPopup', true);
    }
  },
  ziddu : {
    Host : ['ziddu.com'],
    Loaded : function () {
	  // Redirect to captcha page
	  var formDl = getElement('form[name="dfrm"]');
      if(formDl) {
	    removeElement('.error');
	    formDl.submit();
	  }
    }
  },  
  videofun : {
    Host : ['videofun.me'],
    Inserted : function (e) {
      if (eventElement(e).id && eventElement(e).id == 'flowplayer_api') {
        var allowfullscreen = eventElement(e).querySelector('param[name="allowfullscreen"]');
        allowfullscreen.value = true;
      }
    }
  },
   bitcoiner : {
    Host : ['bitcoiner.net'],
    Loaded : function () {
      // Remove notice
      removeElement('#adblock-info');
	  // Skip timer
      var btSend = getElement('#submit');
      if (btSend) { 
        btSend.setAttribute('disabled', false);
        btSend.setAttribute('value', 'Send!');
      }
    }
  },
  bigdownloader : {
    Host : ['bigdownloader.com'],
    Loaded : function () {
      removeElement('#anti_adblock');
    }
  }, 
   gametrailers : {
    Host : ['gametrailers.com'],
    Loaded : function () {
      removeElement('#ad_blocking');
    }
  }, 
  filmovizija : {
    Host : ['filmovizija.com'],
    Loaded : function () {
      removeElement('#jebi-se-adblock');
    }
  },
  debrastagi : {
    Host : ['debrastagi.com'],
    Loaded : function () {
      removeElement('#stp-main');
	  removeElement('#stp-bg');
    }
  },    
  rapidebrideur : {  
    Host : ['rapidebrideur.com'],
    Inject : function () {
	  GM_addStyle("html body div.container-fluid div.row-fluid div.span9 div div[id] { height: 12px !important;  display: block  !important; }");
    },
    BeforeFix : function () { },	
    Before : function (e) {
      if (scriptHTML(e).contains('window.location = "../pages/adblock.html";')) {
        scriptCancel(e);
      }
    }
  },
   blockblockA : {// Solution was also added to AAK-Filters
    // http://sport-show.fr/js/advertisement-AdBlock.js
	// http://www.2site.me/advertisement-AdBlock.js
    Host : ['sport-show.fr','vipflash.net','2site.me'],
    Inject : function () {
	  GM_addStyle("#blockblockA {visibility:invisible!important;display:none!important;}#blockblockA td {visibility:invisible!important;display:none!important;}#blockblockA td p {visibility:invisible!important;display:none!important;}#blockblockB {visibility:visible!important;display:block!important;}");
    }
  },
  megadebrid : {
    Host : ['mega-debrid.eu'],
    Inject : function () {
      unsafeWindow.alert = false;
    },
    Loaded : function () {
      // Activate button debrid
      var btDebrid = getElement('.realbutton');
      if (btDebrid) {
        btDebrid.setAttribute('onclick', '');
        btDebrid.setAttribute('type', 'submit');
      }
    }
  },
  pregennet : {
    Host : ['pregen.net'],
    Inject : function () {
      unsafeWindow.alert = false;
    }
  },
  bokepspot : {
    Host : ['bokepspot.com'],
    Inject : function () {
      // Hide Disclaimer
      setCookie('hideDialog', 'hide');
    },
    Loaded : function () {
      // Remove Disable AdBlock
      removeElement('#tupiklan');
    }
  },
  picload : {
    Host : ['picload.org'],
    Inject : function () {
      // No AdBlocker
      setCookie('pl_adblocker', false);
    }
  },
  videobug : {
    Host : ['videobug.net'],
    Inserted : function (e) {
      if (eventElement(e).nextSibling.id == 'flowplayer_api' && eventElement(e).style && eventElement(e).innerHTML.contains('Please dont use A.dblock, its very expensive to maintain video hosting. Thank you')) {
        //console.log(eventElement(e));
        removeElement(eventElement(e));
      }
    }
  },
  freezedownload : {
  	Host : ['freezedownload.com'],
  	Loaded : function () {
  		if (/freezedownload.com\/download\//.test(location.href)) {
  			removeElement('body > div[id]');
  		}
  	}
  },
  adfly : {
  	Host : ['adf.ly', 'q.gs', 'j.gs', 'u.bb', '9.bb', 'go.phpnulledscripts.com'],
  	Loaded : function () {

  		// Disable onbeforeunload
  		unsafeWindow.onbeforeunload = false;
		unsafeWindow.onunload = false;

  		var btContinue = getElement('button[id=abC]');
  		var btSkip = getElement('#skip_button');

  		var forcing = function () {
  			if (btContinue) {
  				btContinue.click();
  			}
  			if (btSkip && btSkip.href) {
  				window.clearInterval(runSetInt)
  				window.location.href = btSkip.href;
  			}
  		};
  		var runSetInt = setInterval(forcing, 0);
  		runSetInt;
  	}
  },
  tvdez : { 
    // (document.getElementById('pubfooter').clientHeight < 20)
  	Host : ['tvdez.com','casadossegredos.tv','estadiofutebol.com','televisaofutebol.com'],
    Inject : function () {
      GM_addStyle("#pubfooter, #pub2 { height: 30px !important; display: block !important; }");
	  setCookie("adblock", null, 0);
    },	
  	BeforeFix : function () {
      /* solved with filter list */
  	},
  	Before : function (e) {
  		if (scriptHTML(e).contains("location.href = 'adblock.php';")) {
  			scriptCancel(e);
  		}
  	}
  },
  playtv : {
    Host : ['playtv.fr'],
    Loaded : function () {
	
      unsafeWindow.ppl.redirect = false;
      unsafeWindow.ppl.vars.adb = null;
	  
	  var nac = document.querySelector(".notice-adb-container");
	  var player = document.querySelector(".notice-adb + div[id] #player");
      nac.appendChild(player);
    }
  },
  gamespowerita : {
  	Host : ['gamespowerita.com'],
  	BeforeFix : function () {
      /* solved with filter list */
  	},
    Before : function (e) {
      if (scriptHTML(e).contains('(document.getElementById("test" + id_2).style.height < 1)') || scriptHTML(e).contains('if(typeof(window.google_jobrunner)=="undefined" || document.getElementById("test" + id_2).style.height < 1)') || scriptHTML(e).contains('if(typeof(window.google_jobrunner)=="undefined")')) {
        scriptCancel(e);
      }
    }
  },  
   dizimag : { 
     Host : ['dizi-mag.com'],
     Loaded : function () {
	   /*
       html = document.body.innerHTML;
       dynVar = html.match(/([a-z]+[0-9]+x)/)[1];
	   console.log(dynVar);
       unsafeWindow[dynVar] = 1;
	   */
     }
   },
  // ----------------------------------------------------
  // Mozilla Firefox & Specific Hosts
  // ----------------------------------------------------
  watcharab : {
    Host : ['watcharab.com'],
    Before : function (e) {
      if (scriptHTML(e).contains('|Adblock|You|are|software|')) {
        scriptCancel(e);
      }
    }
  },
  sporttvdireto : {
  	Host : ['sporttvdireto.com', 'tvdesporto.com'],
    Inject : function () { 
	   // this solution dont works
	   // document.getElementById('ads1').clientHeight < 20
	   addElement('ads1');
	   GM_addStyle("#ads1 { height: 30px !important; }");
    },
    Before : function (e) {
      if (scriptHTML(e).contains('location.href = \'http://tvdesporto.com/chorar.php\';')) {
        scriptCancel(e);
      }
    }
  },
  privateinsta : {
    Host : ['privateinsta.com'],
    Loaded : function () {
	  // AdScendMedia
      unsafeWindow.unscroll = false;
      removeElement("#gw_overlay");
    }
  },
  elahmad : {
    // document.getElementsByTagName("iframe").item(0)
    Host : ['elahmad.com'],
    Before : function (e) {
      if (scriptHTML(e).contains("alert('You use the software Adblock')")) {
        scriptCancel(e);
      }
    },
    Loaded : function () {
      var v = document.getElementById("adv_right");
	      v.setAttribute('id','');
      var vclone = v.cloneNode(true);
      document.body.appendChild(vclone);
      removeElement(v);
    }
  },
  prozik : {
    Host : ['pro-zik.ws', 'pro-tect.ws', 'pro-ddl.ws', 'pro-sport.ws'],
    Inject : function () {
      setCookie('visitedf', true);
      setCookie('visitedh', true);
    },
  },
   zeb89altervista : {
    Host : ['zeb89.altervista.org'],
    // greasemonkey/addons4.js
    BeforeFix : function () {
      // No need for Chrome, Opera, Safari
    },
    Before : function (e) {
      if (scriptHTML(e).contains('typeof GM_addonsStartup !== "undefined"')) {
	    scriptCancel(e);
      }
    }
  }, 
  sawlive : { // to check
    Host : ['sawlive.tv'],
    Before : function (e) {
      // Find timer and proceed
      if (scriptHTML(e).contains('function closeMyAd(){')) {
        scriptCancel(e);

        document.getElementById("sawdiv").innerHTML = "";
        document.getElementById("sawdiv").style.display = "none";
        document.getElementById("splay").style.visibility = "visible";
        document.getElementById("sloading").innerHTML = "";
        unsafeWindow.active = 1;
        unsafeWindow.so.write("jwplayer1");
      }
    }

  	
