scr_meta=<><![CDATA[
// ==UserScript==
// @name           Syrnia UI Adjustments
// @include        *syrnia*game.php*
// @include        *syrnia*forum.php*viewtopic*
// @version                4.8
// ==/UserScript==
]]></>.toString()
var isTamper = false;
try{
    var i=GM_installScript;
    isTamper=true;
}catch(e){
    isTamper=false;
        }
CheckForUpdates(/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),"117873");
if (document.getElementsByClassName == undefined) {
	document.getElementsByClassName = function(className)
	{
		var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
		var allElements = document.getElementsByTagName("*");
		var results = [];

		var element;
		for (var i = 0; (element = allElements[i]) != null; i++) {
			var elementClass = element.className;
			if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
				results.push(element);
		}

		return results;
	}
}
function FixUI() {
try{
        var sc = false;
var cnt = 0;
for (var i=0; i<=document.getElementsByClassName("leftTD")(1).parentNode.childNodes.length; i++) {
if (sc == true) {
	if (document.getElementsByClassName("leftTD")(1).parentNode.childNodes(i) == document.getElementsByClassName("leftTD")(1)) {
		cnt = Number(cnt) + document.getElementsByClassName("leftTD")(1).offsetHeight;
		break;
	}else{
		cnt = Number(cnt) + document.getElementsByClassName("leftTD")(1).parentNode.childNodes(i).offsetHeight;
	}
}else{
		if (document.getElementsByClassName("leftTD")(1).parentNode.childNodes(i) == document.getElementById("playerInventory")) {
			sc = true;
		}
	}
}
    document.getElementById("playerInventory").style.height=(Number(document.body.clientHeight-cnt)) + "px";
document.getElementById("googleSearchContainer").parentNode.removeChild(document.getElementById("googleSearchContainer"));
setTimeout(FixUI, 30);
}catch(err){
setTimeout(FixUI, 30);
}
}
FixUI();
if (location.href.search(/forum.php/) != -1) {
	var addyRow=document.getElementsByTagName('table')[0].firstChild.childNodes[2];
	addyRow.parentNode.removeChild(addyRow);
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