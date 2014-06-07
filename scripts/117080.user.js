scr_meta=<><![CDATA[
// ==UserScript==
// @name           Syrnia Auto-Heal
// @include        *syrnia*game.php*
// @version                4.8
// ==/UserScript==
]]></>.toString()
var isTamper = false;
var SYFOOD=new Array("Beet","Radishes","Elven Cocktail","Keg of Rum","Cooked Shrimps","Carrots","Cooked Frog","Cabbage","Bread","Cooked Piranha","Onion","Cooked Sardine","Tomato","Halloween pumpkin","Cooked Catfish","Cooked Herring","Red Easter Egg","Corn","Cooked Mackerel","Cooked Queen spider meat","Strawberry","Cooked Cod","Cooked Trouts","Green pepper","Cooked Pike","Spinach","Cooked Salmon","Green easter egg","Eggplant","Cooked Tuna","Cooked Giant catfish","Cucumber","Cooked Lobster","Pumpkin","Cooked Bass","Blue easter egg","Apple","Cooked Swordfish","Pear","Broccoli","Cooked Saurus meat","Yellow easter egg","Pink easter egg","Black Easter Egg","White Easter Egg","Cooked Shark","Orange easter egg","Purple easter egg");
var SYFOODH=new Array("1","1","1","1","2","2","2","3","3","3","4","4","5","5","5","5","5","6","6","6","7","7","7","8","8","9","9","9","10","10","10","11","12","12","13","13","13","14","14","15","16","17","20","20","20","20","23","26");
var HasFood=new Array();
var chp = 0;
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}
	function checkToHeal() {
              var nchp = chp;
  	  try{
   	     nchp = document.getElementById("statsHPText").outerText + "/" + document.getElementById("statsMaxHPText").outerText;
   	 }catch(err){}
                       var comp = chp == nchp;
   	 if (!comp) {
   	     chp = nchp;
   	     HasFood = [];
			try
 		 {
  	for (var i = 0; i < document.getElementById("playerInventory").childNodes.length; i++) {
  		var indexd = SYFOOD.indexOf(document.getElementById("playerInventory").childNodes[i].getAttribute("title"));
			if (indexd > -1) {
				HasFood.push(SYFOOD[indexd].toString() + ";" + SYFOODH[indexd].toString() + ";" + i);
			}
		}
		HasFood.sort(function(a,b){return b.split(";")[1] - a.split(";")[1]});
		var losthp = document.getElementById("statsMaxHPText").outerText - document.getElementById("statsHPText").outerText;
		for (var i = 0, j = HasFood.length; i < j; i++) {
        if (HasFood[i].toString().split(";")[1] <= losthp) {
            eventFire(document.getElementById("playerInventory").childNodes[HasFood[i].toString().split(";")[2]],'click');
            setTimeout(checkToHeal, 30);
            break;
                }
    }
  }
catch(err)
  {}
setTimeout(checkToHeal, 30);
}else{
     setTimeout(checkToHeal,30);
    	}
}
    checkToHeal();
try{
    var i=GM_installScript;
    isTamper=true;
}catch(e){
    isTamper=false;
        }
CheckForUpdates(/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),"117080");
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj) {
            return i;
        }
    }
    return -1;
  };
}
function eventFire(el, etype){
  if (el.fireEvent) {
  	(el.fireEvent('on' + etype));
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
function CheckForUpdates(name,version,id) {
	var titleHTML = '<b>Update Available</b>';
	var msgHTML =  'Do you want to update the ' + name + ' script? <br><a onclick="$(\'messagePopup\').style.visibility=\'hidden\';return false;" href=\'http://userscripts.org/scripts/source/'+id+'.user.js\'>Install the updated script!</a>'
        var uurl = 'http://userscripts.org/scripts/review/'+id+'?format=txt';
	this.check = function()
	{
		GM_xmlhttpRequest({method:"GET",url:uurl,onreadystatechange:this.doupdate});
	}
	this.doupdate = function(o) {
		if(o.readyState == 4)
		{
			indVer = o.responseText.indexOf('@version');
			checkver = o.responseText.substr(indVer,indVer+50);
			checkver = checkver.split('@version')[1];
			checkver = parseInt(checkver.replace(/\./g,''))+100;
			thisver = parseInt(version.replace(/\./g,''))+100;
			if(checkver>thisver)
			{
				usePopUp(titleHTML,msgHTML);
                        }else{
                            usePopUp("<b>Syrnia Auto-Eat</b>","The script is active and will auto-eat the food you have in your inventory.");
			}
			
		}
	}
this.check();
}
function usePopUp(titleHTML,messageHTML) {
    popBox = document.getElementById('messagePopup');
    popTitle = document.getElementById('popupTitle');
    popMsg = document.getElementById('popupMessage');
    var indo = -1;
    try{
    	indo = popBox.getAttribute('style').indexOf("visibility: visible");
  }catch(err){}
    if (indo > -1) {
        popTitle.innerHTML = "<b>Multi-Message Popup</b>";
        popMsg.innerHTML = popMsg.innerHTML + "<br /><br /><hr><br />" + messageHTML;
    }else{
			   popBox.setAttribute('style','visibility: visible;');
	 		   popTitle.innerHTML = titleHTML;
			   popMsg.innerHTML = messageHTML;
    }
         if(isTamper) {
          modifyUserScriptLinks();
         }
}
var userscript = ".user.js";
var visible = 'position:relative; top: 2px; left: -3px; height: 16px; width: 16px;';
var cvisible = 'position:relative; top: 2px; left: 3px; height: 16px; width: 16px;';
var invisible = 'display: none';        
var tamperScriptClickHandler = function(url, nat, delem, ielem, celem) {
    if (nat) {
        GM_notification("Open script to install as Chrome extension :(", null, "", null, 5000);
        window.location = url;
    } else {
        var cb = function(resp) {
            var msg = '';
            if (resp.found) {
                if (resp.installed) {
                    msg = "Script loaded and installed";
                } else {
                    msg = "Script loaded but not installed :(";
                    if (ielem) ielem.setAttribute('style', visible);
                    if (celem) celem.setAttribute('style', cvisible);
                }
            } else {
                msg = "Error loading script :(";
            }
            GM_notification(msg, null, "", null, 5000);
            if (delem) delem.setAttribute('style', invisible);
        };
        GM_notification("Fetching script...", "TamperScript", "", null, 5000);
        GM_installScript(url, cb);
    }
};

var modifyUserScriptLinks = function() {
   try{
 var aarr = document.getElementsByTagName('a');
    for (var k=0; k<aarr.length; k++) {
        var a = aarr[k];
        if (a.href && a.href.search(userscript) != -1) {
            var d = document.createElement('img');
            d.src = TM_getResourceURL('down');
            d.setAttribute('style', invisible);
            d.setAttribute('id', 'TM_download_' + k);
            var i = document.createElement('img');
            i.src = TM_getResourceURL('icon');
            i.setAttribute('style', visible);
            i.setAttribute('id', 'TM_install_' + k);
            var c = document.createElement('img');
            c.src = 'http://www.google.com/images/icons/product/chrome-16.png';
            c.setAttribute('style', cvisible);
            c.setAttribute('id', 'TM_chrome_' + k);

            var install = function () {
                var d = document.getElementById('TM_download_' + this.idx);
                var i = document.getElementById('TM_install_' + this.idx);
                var c = document.getElementById('TM_chrome_' + this.idx);
                d.setAttribute('style', visible);
                if (i) i.setAttribute('style', invisible);
                if (c) c.setAttribute('style', invisible);
                tamperScriptClickHandler(this.tamper, null, d, i, c);
            };
            var narf = function () {
                tamperScriptClickHandler(this.tamper, true);
            };

            var prepareNode = function(idx, n, fn, comment) {
                if (comment == undefined) comment = 'Tampermonkey! :)';
                n.addEventListener('click', fn);
                n.tamper = a.href;
                n.idx = idx;
                n.title = comment;
            };

            if ((window.location.host == 'userscripts.org' ||
                 window.location.host == 'webcache.googleusercontent.com') &&
                a.getAttribute('class') == 'userjs') {
                var v = document.createElement('span');
                var cn = a.childNodes[0];
                prepareNode(k, v, install, null);
                prepareNode(k, i, install);
                prepareNode(k, c, narf, 'Native Extension :(');
                a.appendChild(d);
                a.appendChild(i);
                a.appendChild(v);
                a.appendChild(c);
                a.removeChild(cn);
                v.appendChild(cn);
            } else {
                prepareNode(k, a, install);
                a.insertBefore(d, a.childNodes[0]);
                a.title = 'Tampermonkey! :)';
            }
            a.href = 'javascript://nop/';
        }
    }
}catch(err){alert(err);}
}