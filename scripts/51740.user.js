// ==UserScript==
// @name           [HFR] Smart Auto Rehost
// @version        4.0.6
// @namespace      http://mycrub.info
// @include        http://forum.hardware.fr/*
// ==/UserScript==

var img, src;
var rehost = GM_getValue("ar_rehost_site", "http://hfr-rehost.net/");

function processNode(node) {
  var cmpt = 0;
  var toRehost = getRehostableRegExps();
  var startTime = new Date().valueOf();
  var imgs = node.getElementsByTagName('img');
  for (var i = 0; i < imgs.length; ++i) {
  	img = imgs[i];
  	src = img.getAttribute('src');
  	for (var j = 0; j < toRehost.length; j++) {
  	 	if (src && (src.match(toRehost[j]))) {
    		img.setAttribute('src', rehost + src);
    		img.setAttribute('alt', 'Rehosted: '+ src);
    		img.setAttribute('title', 'Rehosted: ' + src);
    		cmpt++;
    	}
  	}
  }
  GM_log(cmpt + " images en " + (new Date().valueOf() - startTime) + " ms");
}

function getRehostableRegExps() {
  var rehostables = getCurrentRehostables().split("\n");
  var result = [];
  for (var i = 0; i < rehostables.length; i++) {
    if (rehostables[i] && rehostables[i].length>0) {
      result[result.length] = '^http://([^/:])*' + rehostables[i] + '/.*';
    }
  }
  return result;
}

var getElementByXpath = function (path, element)
{
	var arr = Array(), xpr = document.evaluate(path, element, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	for (;item = xpr.iterateNext();) arr.push(item);
	return arr;
}

var cssManager = 
{
	cssContent : '',
	
	addCssProperties : function (properties)
	{
		cssManager.cssContent += properties;
	},
	
	insertStyle : function()
	{
		GM_addStyle(cssManager.cssContent);
		cssManager.cssContent = '';
	}
}

function getCurrentImgUrl() {
  return GM_getValue("ar_icon", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAMAAAAs2N9uAAAAAXNSR0IArs4c6QAAAwBQTFRFAAAAgAAAAIAAgIAAAACAgACAAICAgICAwMDA/wAAAP8A//8AAAD//wD/AP//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzAABmAACZAADMAAD/ADMAADMzADNmADOZADPMADP/AGYAAGYzAGZmAGaZAGbMAGb/AJkAAJkzAJlmAJmZAJnMAJn/AMwAAMwzAMxmAMyZAMzMAMz/AP8AAP8zAP9mAP+ZAP/MAP//MwAAMwAzMwBmMwCZMwDMMwD/MzMAMzMzMzNmMzOZMzPMMzP/M2YAM2YzM2ZmM2aZM2bMM2b/M5kAM5kzM5lmM5mZM5nMM5n/M8wAM8wzM8xmM8yZM8zMM8z/M/8AM/8zM/9mM/+ZM//MM///ZgAAZgAzZgBmZgCZZgDMZgD/ZjMAZjMzZjNmZjOZZjPMZjP/ZmYAZmYzZmZmZmaZZmbMZmb/ZpkAZpkzZplmZpmZZpnMZpn/ZswAZswzZsxmZsyZZszMZsz/Zv8AZv8zZv9mZv+ZZv/MZv//mQAAmQAzmQBmmQCZmQDMmQD/mTMAmTMzmTNmmTOZmTPMmTP/mWYAmWYzmWZmmWaZmWbMmWb/mZkAmZkzmZlmmZmZmZnMmZn/mcwAmcwzmcxmmcyZmczMmcz/mf8Amf8zmf9mmf+Zmf/Mmf//zAAAzAAzzABmzACZzADMzAD/zDMAzDMzzDNmzDOZzDPMzDP/zGYAzGYzzGZmzGaZzGbMzGb/zJkAzJkzzJlmzJmZzJnMzJn/zMwAzMwzzMxmzMyZzMzMzMz/zP8AzP8zzP9mzP+ZzP/MzP///wAA/wAz/wBm/wCZ/wDM/wD//zMA/zMz/zNm/zOZ/zPM/zP//2YA/2Yz/2Zm/2aZ/2bM/2b//5kA/5kz/5lm/5mZ/5nM/5n//8wA/8wz/8xm/8yZ/8zM/8z///8A//8z//9m//+Z///M////RGKwUAAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QYQCDgpfYIwVwAAAKJJREFUGNN10DEOwyAMBdBIHXo/OvUisOC74C5JlpyiWcBdwj1KF8ga22nVdsiXkNCTsWW67jA35Aw/AJg4jSj/QSm1tXed8yHFWJSy2ugw3IVqbeuqBBbnOcWnFi0gdHEoVmJphBayEqD2D54DD6azMXL31vKhLDReh2nqvfF46pes1AGAD/KU++8ThfZm9UWflRzPxDklRPru7ByPpeNP2QA+xXyJjelK2QAAAABJRU5ErkJggg==");
}

function getCurrentRehostables() {
  return GM_getValue("ar_rehost_hostnames", "xs.to\nebaumsworld.com\nexplosm.net\ntinypic.com\nthreadbombing.com\nnoelshack.com\nggpht.com\nmyspacecdn.com\nmegaportail.com\nimagup.com\nxkcd.com\nskyrock.com\nytmnd.com\ni.pbase.com\nencyclopediadramatica.com\nlivejournal.com\nmuchosucko.com\ntinypic.com\nmoviesmedia.ign.com\ndvdrama.com\nsmugmug.com\nimagup.com\nhotflick.net\nchickencrap.com\nkoreus.com\nworldofwarcraft.com\njeuxvideo.com\njoystiq.com\nstereomaker.net\nimageshack.us\nwordpress.com\nbouletcorp.com\ndeviantart.com\nnofrag.com\nalkaspace.com\njj.am\ninexes.com\nmmo-champion.com\nlolpix.com\ngiftube.com\nflickr.com\nfacebook.com\nphotobucket.com\nnnm.ru\nse7en.ru\nb3ta.com\nimagehaven.net\nzimagez.com\nafrojacks.com\ncanardpc.com\ngopix.fr\njudgehype.com\nfohguild.org\nno-ip.org\narchive-host.com\nlelombrik.net\nhaluze.sk\nhostingpics.net\nfbcdn.net\nseries-80.net\ndrugs-plaza.com\nfree.fr\ndynamictic.info\nratemyeverything.net\nsmog.pl\nuppix.net\necho.cx\ntuxboard.com\nhumour.com\nmac.com\ntbn..google.com\n4gifs.com\nleboncoin.fr");
}

function getCurrentBl() {
  return GM_getValue("ar_bl_hostnames", "hardware.fr\nhfr-rehost.net");
}

var hostRegExp = new RegExp("^http://([^/]*\\.)*([^\\./]+\\.[^\./]+)/.*", "i");
function getHostname(url) {
  var ex = hostRegExp.exec(url);
  return (ex && ex.length > 0) ? ex[2] : null;
}

function resetHostnames() {
  GM_setValue("ar_rehost_hostnames", "xs.to;ebaumsworld.com;explosm.net;tinypic.com;threadbombing.com;noelshack.com;ggpht.com;myspacecdn.com;megaportail.com;imagup.com;xkcd.com;skyrock.com;ytmnd.com;i.pbase.com;encyclopediadramatica.com;livejournal.com;muchosucko.com;tinypic.com;moviesmedia.ign.com;dvdrama.com;smugmug.com;imagup.com;hotflick.net;chickencrap.com;koreus.com;worldofwarcraft.com;jeuxvideo.com;joystiq.com;stereomaker.net;imageshack.us;wordpress.com;bouletcorp.com;deviantart.com;nofrag.com;alkaspace.com;jj.am;inexes.com;mmo-champion.com;lolpix.com;giftube.com;flickr.com;facebook.com;photobucket.com;nnm.ru;se7en.ru;b3ta.com;imagehaven.net;zimagez.com;afrojacks.com;canardpc.com;gopix.fr;judgehype.com;fohguild.org;no-ip.org;archive-host.com;lelombrik.net;haluze.sk;hostingpics.net;fbcdn.net;series-80.net;drugs-plaza.com;free.fr;dynamictic.info;ratemyeverything.net;smog.pl;uppix.net;echo.cx;tuxboard.com;humour.com;mac.com;tbn..google.com;4gifs.com;leboncoin.fr");
}

function addHostname() {
  var newHostname = prompt("Ajouter un nom de domaine (et tous ses sous-domaines) à rehoster.\nExemple : imageshack.us");
  if (newHostname && newHostname.length > 0) {
    GM_setValue("ar_rehost_hostnames", getCurrentRehostables() + ";" + newHostname);
  }
}

function blHostname() {
  var bl = prompt("Liste des noms de domaine à ne JAMAIS rehoster (séparateur ';')\nExemple : hardware.fr;hfr-rehost.net", GM_getValue("blHostnames", ""));
  if (bl) {
    GM_setValue("ar_bl_hostnames", bl);
  }
}

function debug() {
  var hn = prompt("Liste des noms de domaine à rehoster (séparateur ';')\nExemple : imageshack.us;imagup.com", GM_getValue("hostnames", ""));
  if (hn) {
    GM_setValue("ar_rehost_hostnames", hn);
  }
}

// **********************************************
// Commandes de menu
// **********************************************
//GM_registerMenuCommand("[HFR] Auto Rehost -> Reset", this.resetHostnames);
//GM_registerMenuCommand("[HFR] Auto Rehost -> Ajouter un nom de domaine", this.addHostname);
//GM_registerMenuCommand("[HFR] Auto Rehost -> Ne pas rehoster", this.blHostname);
//GM_registerMenuCommand("[HFR] Auto Rehost -> Debug", this.debug);

var cmScript =
{
	backgroundDiv : null,
	
	configDiv : null,
	
	timer : null,
	
	setDivsPosition : function ()
	{		
		cmScript.setBackgroundPosition();
		cmScript.setConfigWindowPosition();
	},
	
	setBackgroundPosition : function ()
	{				
		cmScript.backgroundDiv.style.width = document.documentElement.clientWidth + 'px';	
		cmScript.backgroundDiv.style.height = document.documentElement.clientHeight + 'px';
		cmScript.backgroundDiv.style.top = window.scrollY + 'px';
	},

	setConfigWindowPosition : function ()
	{
		cmScript.configDiv.style.left = (document.documentElement.clientWidth / 2) - (parseInt(cmScript.configDiv.style.width) / 2) + window.scrollX + 'px';
		cmScript.configDiv.style.top = (document.documentElement.clientHeight / 2) - (parseInt(cmScript.configDiv.clientHeight) / 2) + window.scrollY + 'px';
	},	
	
	disableKeys : function (event)
	{
		var key = event.which;
		if (key == 27)
		{
			clearInterval(cmScript.timer);
			cmScript.hideConfigWindow();
		}
		//else if (key == 13) cmScript.validateConfig();
		else if (event.altKey || (event.target.nodeName.toLowerCase() != 'input' && key >= 33 && key <= 40)) event.preventDefault();
	},
	
	disableTabUp : function (elt)
	{
		elt.addEventListener('keydown', function(event)
		{
			var key = event.which;
			if (key == 9 && event.shiftKey) event.preventDefault();
		}
		, false);
	},
	
	disableTabDown : function (elt)
	{
		elt.addEventListener('keydown', function(event)
		{
			var key = event.which;
			if (key == 9 && !event.shiftKey) event.preventDefault();
		}
		, false);
	},
	
	disableScroll : function ()
	{
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', cmScript.disableKeys, false);
	},
	
	enableScroll : function ()
	{
		document.body.style.overflow = 'visible';
		window.removeEventListener('keydown', cmScript.disableKeys, false);
	},
	
	alterWindow : function (opening)
	{
		if (opening)
		{
			// On fige la fenêtre
			cmScript.disableScroll();
			// A chaque resize, repositionnement des divs
			window.addEventListener('resize', cmScript.setDivsPosition, false);
			// On cache les iframes de m%$!§
			getElementByXpath('//iframe', document.body).forEach(function(iframe){ iframe.style.visibility = 'hidden'; });		
		}
		else
		{
			cmScript.enableScroll();
			window.removeEventListener('resize', cmScript.setDivsPosition, false);
			getElementByXpath('//iframe', document.body).forEach(function(iframe){ iframe.style.visibility = 'visible'; });
		}
	},
	
	buildBackground : function ()
	{
		if (!document.getElementById('ar_back'))
		{
			cmScript.backgroundDiv = document.createElement("div");
			cmScript.backgroundDiv.id = 'ar_back';
			cmScript.backgroundDiv.addEventListener('click', function()
			{
				clearInterval(cmScript.timer);
				cmScript.hideConfigWindow();
			}
			, false);
			cssManager.addCssProperties("#ar_back { display: none; position: absolute; left: 0px; top: 0px; background-color: #242424; z-index: 1001;}");
			document.body.appendChild(cmScript.backgroundDiv);
		}
	},
	
	buildConfigWindow : function ()
	{
	  if (top.location != self.document.location) {
      return;
    }
	
		if (!document.getElementById('ar_front'))
		{	
			cmScript.configDiv = document.createElement("div");
			cmScript.configDiv.id = 'ar_front';
			cmScript.configDiv.style.width = '400px'; 
			cssManager.addCssProperties("#ar_front { display: none; vertical-align: bottom; position: absolute; background-color: #F7F7F7; z-index: 1003; border: 1px dotted #000; padding: 8px; text-align: center; font-family: Verdana;}");
			cssManager.addCssProperties("#ar_front span { font-size: 0.8em;}");
			cssManager.addCssProperties("#ar_front select { border: 1px solid black; font-family: Verdana; font-size: 0.75em;}");
			cssManager.addCssProperties("#ar_front img { display: block; margin-top: 10px; margin-left: auto; margin-right: auto;}");
			cssManager.addCssProperties("#ar_front div { position: absolute; bottom: 8px; right: 8px;}");
			cssManager.addCssProperties("#ar_front input[type=image] { margin: 2px; }");
			
			var label = document.createElement('span');
			label.innerHTML = "<b>Configuration du script Auto Rehost :</b>";
			cmScript.configDiv.appendChild(label);
						
      var iconContainer = document.createElement('p');
      var iconLabel = document.createElement('span');
      iconLabel.innerHTML = "Icone du bouton : ";
      iconContainer.appendChild(iconLabel);
      var inputIcon = document.createElement('input');
			inputIcon.type = 'text';
			inputIcon.id = 'ar_icon';
			inputIcon.size = '50';
			inputIcon.value= getCurrentImgUrl();
			iconContainer.appendChild(inputIcon);
      cmScript.configDiv.appendChild(iconContainer);
						
      var rehostSiteContainer = document.createElement('p');
      var rehostSiteLabel = document.createElement('span');
      rehostSiteLabel.innerHTML = "Site de rehost : ";
      rehostSiteContainer.appendChild(rehostSiteLabel);
      var inputRehostSite = document.createElement('input');
			inputRehostSite.type = 'text';
			inputRehostSite.id = 'ar_rehost_site';
			inputRehostSite.size = '50';
			inputRehostSite.value= GM_getValue("ar_rehost_site", "http://hfr-rehost.net/");
			rehostSiteContainer.appendChild(inputRehostSite);
      cmScript.configDiv.appendChild(rehostSiteContainer);
			
			var rehostListContainer = document.createElement('p');
      var rehostListLabel = document.createElement('span');
      rehostListLabel.innerHTML = "Noms de domaine à rehoster : ";
      rehostListContainer.appendChild(rehostListLabel);
      var inputRehostList = document.createElement('textarea');
			inputRehostList.id = 'ar_rehost_hostnames';
			inputRehostList.cols = '40';
			inputRehostList.rows = '8';
			inputRehostList.value= getCurrentRehostables();
			rehostListContainer.appendChild(inputRehostList);
      cmScript.configDiv.appendChild(rehostListContainer);
			
			var blackListContainer = document.createElement('p');
      var blackListLabel = document.createElement('span');
      blackListLabel.innerHTML = "Noms de domaine à <b>NE PAS</b> rehoster : ";
      blackListContainer.appendChild(blackListLabel);
      var blackRehostList = document.createElement('textarea');
			blackRehostList.id = 'ar_bl_hostnames';
			blackRehostList.cols = '40';
			blackRehostList.rows = '3';
			blackRehostList.value= getCurrentBl();
			blackListContainer.appendChild(blackRehostList);
      cmScript.configDiv.appendChild(blackListContainer);
			
			var buttonsContainer = document.createElement('div');
			var inputOk = document.createElement('input');
			inputOk.type = 'image';
			inputOk.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%9FIDAT8%CB%A5%93%EBKSa%1C%C7%FD%3Bv%CEvl%03%09dD!%82%84P%7B%15%24%12%3B%9A%0D%C5%BC%2CK%D3%DD%BD%D26c%D8L%8B2r%5E%C6H)-%B3%D4jsNm%EA%D4%E6%D6%942q%D9QB%CC%BD%E9B%B5at%B1o%E7%EC%C5L%12%23z%E0%0B%0F%0F%CF%E7%F3%7B%AEq%00%E2%FE'%7F%0C%14%F8%0E%89r%A7%0F%EA%B3%3D)L%C6%E3%FDa%E9%888%2Cu%252Rg%A2%3E%DD%BEW%B4%AB%20%CF%9BJ%CB%3C%C9!%9DG%86%9BA%0B%FA%96%BB%A2%E9%5ClF%89%EB%18%24%BDTH%D2C%D1%3B%0A%D8%AAt%E6xR%E4%EA%9C%11%CE%D5~%D8%5E%5E%83i%AE2%1A%AE%EFX%EDC%E3L%15%0E%D8%F8%91d%1B%9F%DE%26%C8%F1%A4%083%DDI%EB%1C%CCM%AC%09%94%A1%C2_%02%CD%CC%19%E8%D8%94%B3%A9%F6%9D%85%FD%F5%3D%5C%9C%AA%80%D8B%AE%8B%AF%93%C2%98%40%E6N2%A8%C6%B2%A2%959%98%03U%DESPL%17B1U%00%F5T!%DCk%830x%95p%B0%92%DC%9E%23H%B8B%1Ab%82%8C%111%D3%19l%865%D8%84%0A_1%94O%E4%2C%98%0F%E5%24%1BO%3E%C6%DF%B8%C0%B5Pd%0Dm%CF%1Ba%9BkD%7C%3D%C9%C4%04G%ED%09%1B%0FVn%A36%A0%81%D6%5B%C4%AEd%00%8B%1F%E6%A1%9A(%C4%D8%DAP%14%FE%B1%F9%1Dm%CF.%C10Q%8C%BE%60'%04Fb%23%26%90%DC%A76%FA%97%BBa%F4%ABP%EB%D7%E2%D3%D7%8FQ%E8%FD%97%B71%D82%5B%0F%B5%2B%1Bz%F7i%F4%07%3B%20%A8%F9%5D%D0C17%E6%9B%D0%BEp%19%BAI9%CC%BEjD%BE%7D%8E%C2%9B%3F7ayz%01e%CE%2ChXAK%A0%0E%ED%5E3%A8*bk%0B%A9%B7%04%06%F9%40%1A%EC%2BwQ%3D!%87%DA%7D%12u%D3%E5Xz%B7%80%B6%D9%06%94%0E%1E%87%C2q%02%3Ag%0E%EC%AF%BA%91n%3D%0C%AA%92%D8%3A%C4d%2B_%B8%8F%BD%1A%B3G%83%87%CC%1DT%8E%E6A%3B%9C%03%D5%90%0CJ%07%17%0E%CE%C6%A3%A5.%18%87%8A!P%F3%D6)5!%DC%F6%90%12%9BH%3A%BE%81%88%98%DCep%B0%92%D6%80%19%FA%D1%22%9C%1B%96%A3%95%DD%82%9D%85%F5%CE%22%F0Ky%11%16%A6w%7C%CA%7B%1AH%9A2%11!i%87%04%ED~3z_X%D1%3Bo%85%C5kBZK*%04%0A%5E%88R%11%F4%AE%9F%89%3AO%8A(%03%A1%A7j%08F%A0%E5%85%05*%5E%98%AD%C8%B0%D1S%A5%84%E8%AF%BF%F1_%F3%0Bg%D0%AC%E5y%BA%D4c%00%00%00%00IEND%AEB%60%82";
			inputOk.alt = 'Valider';
			inputOk.addEventListener('click', cmScript.validateConfig, false);
			
			var inputCancel = document.createElement('input');
			inputCancel.type = 'image';
			inputCancel.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02!IDAT8%CB%95%93%EBN%13Q%14%85%89%89%C9%89%CF%A0V%89%86%C8%91%80%C4%1BB%5B%06(%AD%0D%08%26%D0%FB%85%5E%A4%80%B4%A5%ED%A4M%A16%EA%0FM%7C%12%9F%0BD%C5%DE%B0%D2%99v%3A%D3%E5%AE%98J-%25%E1%C7N%CEd%CE%FA%F6%AC%B5%F7%0C%00%18%B8L%D5%D7B%D7%CE%3Ew_%103%3A*%DEW%EC%0Fr%D9%ED%8D%D7lNC%2F%A0-%CE%EC%A2%95%CEB%8B'%7B%20u_%80%D7%03a46%B6%F0%EB%E5%CA%E7%EA%E2%D2%BD%7F%80%BFb%E4%DF%A1E%A5%25D47%B7%3B%10%D9%BB%C6%A9%3B%9A%D18%90%CB%A3%7D%3E6%5B%E3%E5%19%D3%95S%40*%CDZ%09Qk%ED%BE%01%3E~%82%96%CD%B5%01h%04B%5C%F6%F89u%87%B2%1D%03%E8%BD%EC%0F%E0x%FE%B9Z%16%E6%AEvY%D0b%09%A6%BE%8E%A9%9A%98%01%DE%7F%80%9AJ%A3%1E%0C%83%BAC%D9%8A%02%D9%BD%3F%E7%8A%C9B%E2Yvn%88%CD%C8%26k%84%D6%D5ft%87%EC%BC%05%F6%F2%24%CC%01%99%2Cd%8F%0F%959%B3Z%9E%9Ea%FD%A7p%1A%16%93%5C%5E%0DY%B2%E3%F6%01%0E7%20%A6Q%99%9D%D7JF%81%FD%7F%BF%07%209%3D%EDQ%014%0D%D8%9C%C0%8A%1D%D8I%92o%0B%0A%13S%FCB%80%E4ps%C9%E5%81%12%8E%00I%91%84)%20Fv(%40y%D5%8E%B2%DE%88%EFc%E3%FC%5C%40%CD%EE%E2%92%D3%0D%25%B4%0E%D0%18%25%87%0B%14%96Z%9C2h'%8B%CB%40d%03%B5%17%CB(%3C%7C%8C%C3%A1a%DE%05%A0%CD%E2%D4%1DJ%F0%15uM%40%A2O%A7%B0%D4%E2%A4%81%15%9EL%B0%A3%F1Gj%D5d%06%82!%9CX%AC8%1A%19%C5%C1%ADA%DE%01%D0f%095%9B%03J%20%04i%D5%01%0AK-%3E%D3w%02%FB62%C6%BE%0E%DFW%7F%1A%05H%D6%05%FC%18%7D%80%FD%1B%3A%A1%CB%02m%96P%5DXB%C90%ADQX%3Di%1F%DE%1Db_%06%EF%A8g%C5%3D!%96%F4F%A1%F0t%92%F5%FB%99%0Et%B7%D9%FE%F5%9B%C2%85c%BCl%FD%06r%BB%A4%C7%DB%ED%BE%14%00%00%00%00IEND%AEB%60%82";
			inputCancel.alt = 'Annuler';
			inputCancel.addEventListener('click', cmScript.hideConfigWindow, false);
			cmScript.disableTabDown(inputCancel);
			
			buttonsContainer.appendChild(inputOk);
			buttonsContainer.appendChild(inputCancel);
			cmScript.configDiv.appendChild(buttonsContainer);

			document.body.appendChild(cmScript.configDiv);
		}
	},
	
	validateConfig : function()
	{
	  
		getElementByXpath('.//*[starts-with(@id, "ar_")]', document.getElementById('ar_front')).forEach(function(input)
		{
			GM_setValue(input.id, input.value);
		}
		);
		cmScript.hideConfigWindow();	
	},
	
	initBackAndFront : function()
	{
		if (document.getElementById('ar_back'))
		{
			cmScript.setBackgroundPosition();
			cmScript.backgroundDiv.style.opacity = 0;
			cmScript.backgroundDiv.style.display = 'block';
		}
		
		if (document.getElementById('ar_front'))
		{
			//document.getElementById('ar_alias_url').value = sleathRehost.currentAliasUrl;
		}
	},
	
	showConfigWindow : function ()
	{
		cmScript.alterWindow(true);
		cmScript.initBackAndFront();
		var opacity = 0;
		cmScript.timer = setInterval(function()
		{
			opacity = Math.round((opacity + 0.1) * 100) / 100;
			cmScript.backgroundDiv.style.opacity = opacity;
			if (opacity >= 0.8)
			{
				clearInterval(cmScript.timer);
				cmScript.configDiv.style.display = 'block';
				cmScript.setConfigWindowPosition();
			}
		}
		, 1);
	},
	
	hideConfigWindow : function ()
	{
		cmScript.configDiv.style.display = 'none';
		var opacity = cmScript.backgroundDiv.style.opacity;
		cmScript.timer = setInterval(function()
		{
			opacity = Math.round((opacity - 0.1) * 100) / 100;
			cmScript.backgroundDiv.style.opacity = opacity;
			if (opacity <= 0)
			{
				clearInterval(cmScript.timer);
				cmScript.backgroundDiv.style.display = 'none';
				cmScript.alterWindow(false);
			}
		}
		, 1);
	},
	
	setUp : function()
	{
		// On construit l'arrière plan
		cmScript.buildBackground();
		// On construit la fenêtre de config
		cmScript.buildConfigWindow();
		// On ajoute la css
		cssManager.insertStyle();
	},
	
	createConfigMenu : function ()
	{
		GM_registerMenuCommand("[HFR] Auto Rehost -> Configuration", this.showConfigWindow);
	}
};

cmScript.setUp();
cmScript.createConfigMenu();

// **********************************************
// Traitement de la page
// **********************************************
processNode(document);

// **********************************************
// Spécifique MesDiscussions.net
// **********************************************
var root = document.getElementById('mesdiscussions');
getElementByXpath('//table//tr[contains(@class, "message")]//div[contains(@class, "toolbar")]', root).filter(function(toolbar)
{	
	var newImg = document.createElement('img');
	newImg.src = getCurrentImgUrl();
	newImg.alt = newImg.title = 'Rehoster les images';
	newImg.style.cursor = 'pointer';
	newImg.style.marginRight = '3px';
  newImg.addEventListener('click', function(event)
	{
	  var knownHosts = getCurrentRehostables().split("\n");
	  var blHosts = getCurrentBl().split("\n");
    var imgs = toolbar.nextSibling.getElementsByTagName('img')	;
	  var hostnames = [];
	  for (var i = 0; i < imgs.length; i++) {
      var host = getHostname(imgs[i].src)
      var isKnown = false;
      for (var j = 0; j < blHosts.length && !isKnown; j++) {
        if (blHosts[j] == host) {
          isKnown = true;
        }
      }
      for (var j = 0; j < knownHosts.length && !isKnown; j++) {
        if (knownHosts[j] == host) {
          isKnown = true;
        }
      }
      if (!isKnown) {
        hostnames[hostnames.length] = host;
        knownHosts[knownHosts.length] = host;
      }
    }
	
	  if (hostnames.length > 0) {
      if (confirm("Voulez-vous rehoster les serveurs suivants :\n" + hostnames.join("\n"))) {
        GM_setValue("ar_rehost_hostnames", knownHosts.join("\n"));
        processNode(toolbar.nextSibling);
      }
    }
    else {
      alert("Rien de neuf à rehoster");
    }
	}
	, false);

	var newDiv = document.createElement('div');
	newDiv.className = 'right';
	newDiv.appendChild(newImg);
  toolbar.insertBefore(newDiv, toolbar.lastChild);
}
);
