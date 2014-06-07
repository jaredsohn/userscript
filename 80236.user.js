// ==UserScript==
// @name           Facil uso del WildGuns (ESPAÑOL)
// @namespace      http://www.defhoboz.biz/
// @description    hace mas facil usar el WildGuns(ESPAÑOL)
// @include        http://s*.wildguns.*/*
// @include        http://s1.wildguns.*/*
// @include        http://s2.wildguns.*/*
// @include        http://s3.wildguns.*/*
// @include        http://s4.wildguns.*/*
// @include        http://s5.wildguns.*/*
// @include        http://s201.wildguns.*/*
// ==/UserScript==
var snapshotToArray = function(snapshot){var ar = new Array();for (var i = 0; i < snapshot.snapshotLength; i++) {ar.push(snapshot.snapshotItem(i));} return ar; }
var $ = function(element) {return document.getElementById(element);}
var $x = function(xpath, node){ if (!node) node = document;	var result = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); return snapshotToArray(result); }
function comma(number) { number = '' + number;if (number.length > 3) {var mod = number.length % 3;var output = (mod > 0 ? (number.substring(0,mod)) : '');for (i=0 ; i < Math.floor(number.length / 3); i++) { if ((mod == 0) && (i == 0)) output += number.substring(mod+ 3 * i, mod + 3 * i + 3); else output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3); }; return (output); } else return number; }
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}
var $c = function(oElm, strTagName, strClassName) {
      var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
	    var arrReturnElements = new Array();
	    strClassName = strClassName.replace(/\-/g, "\\-");
	    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	    var oElement;
	    for(var i=0; i<arrElements.length; i++) {
	        oElement = arrElements[i];
	        if (oRegExp.test(oElement.className)) {
	            arrReturnElements.push(oElement);
	        }
	    }
	    return (arrReturnElements)
	}
 
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

var dojo
var buildQueue
var hiddenTownList = "vSelectList"
var visibleTownDisplay = "villageSelect"
if (document.location.href.match("user.php")) {
  function displayBuildQueue() {
    $(visibleTownDisplay).style.width="668px";
    $(hiddenTownList).style.width="650px";
    //var aDiv=document.createElement('div');
    //aDiv.style.overflow="auto";
    //var bDiv=document.createElement('div');
    var needswriting=false;
    //var bor=" style='border-bottom-style: solid;border-bottom-color: black;border-bottom-width: 1px;'";
    //html="<table style='margin:2px;'><tr><th"+bor+">Type</th><th"+bor+">Lvl</th><th nowrap"+bor+">Finish Time</th><th"+bor+">Town</th></tr>";
    var iter=1;
    var totals=new Array(0,0,0,0,0,0);
    for(var server in buildQueue) {
      if (!document.location.href.match(server)) continue;
      try {
        var maxw
        var maxb
        var maxo
        var maxf
        var zw = 0;var zb = 0;var zo = 0;var zf = 0;
        for(var cord in buildQueue[server]) {
          if (parseInt(buildQueue[server][cord]['Resources']['Wood'])>zw) {
            zw=parseInt(buildQueue[server][cord]['Resources']['Wood'])
            maxw=cord
          }
          
          if (parseInt(buildQueue[server][cord]['Resources']['Brick'])>zb) {
            zb=parseInt(buildQueue[server][cord]['Resources']['Brick'])
            maxb=cord
          }
          
          if (parseInt(buildQueue[server][cord]['Resources']['Ore'])>zo) {
            zo=parseInt(buildQueue[server][cord]['Resources']['Ore'])
            maxo=cord
          }
          
          if (parseInt(buildQueue[server][cord]['Resources']['Food'])>zf) {
            zf=parseInt(buildQueue[server][cord]['Resources']['Food'])
            maxf=cord
          }
        }
      } catch (e) { }
      
      for(var cord in buildQueue[server]) {
        var t=buildQueue[server][cord];
        // First remove all expired buildings from queue
        for (var building in t["Building"]) {
          try {
            var d=dojo.date.stamp.fromISOString(t["Building"][building][1]);
            if (dojo.date.compare(d)==-1) {
              GM_log("Removing expired " + building + " from "+ t["Name"])
              delete t["Building"][building];
              needswriting=true;        
              continue;
            }
          } catch (e) {}
        }
        // then figure out if this town is the right town (based on coordinates not names)
        var villages=$x("//ul[@id='"+hiddenTownList+"']/li",document.getElementById(hiddenTownList))
        for(var coord in villages) {
          var cordTxt = cord.split('|')[0] + " / " + cord.split('|')[1]
          if (villages[coord].childNodes[0].innerHTML.match(cordTxt)) {
            // setup military numbers
            var m = document.createElement("span");
            m.style.fontSize="0.7em";
            m.fontWeight="bold"; 
            // if we don't have military for this town yet, don't error out.
            try {
              var offensetxt= "<span style='color:#FC5580;font-size:1.6em'>"+comma(t["Military"]["Offensive"])+"</span>"
              var defensetxt= "<span style='color:#8EE3F7;font-size:1.6em'>"+comma(t["Military"]["Defensive"])+"</span>"
              m.innerHTML =  offensetxt+ "-" + defensetxt
              totals[4]+=parseInt(t["Military"]["Offensive"]) // color:#FC5580
              totals[5]+=parseInt(t["Military"]["Offensive"]) // color:#8EE3F7
            } catch (e) { }
            // setup building queue display
            var b = document.createElement("span")
            b.style.fontSize="1.1em";
            b.fontWeight="bold";
            for(var a in t["Building"]) {
              var btype=a.replace(/[0-9]+/g,"");
              try {
                var bdate=dojo.date.locale.format(dojo.date.stamp.fromISOString(t["Building"][a][1]));
              } catch (e) {
                GM_log("Error formatting date: " + e)
                var bdate=t["Building"][a][1];
              }
              
              b.innerHTML += btype + t["Building"][a][0] +" - " + bdate + "&nbsp;&nbsp;"
            }
            // if we don't have resources for this town yet, don't error out.
            try {
              totals[0]+=parseInt(t['Resources']['Wood'])  // wood total
              totals[1]+=parseInt(t['Resources']['Brick'])  // brick total
              totals[2]+=parseInt(t['Resources']['Ore']) // ore total
              totals[3]+=parseInt(t['Resources']['Food'])  // food total
              var wtxt,btxt,otxt,ftxt;
              var maxtxt="font-size:1.4em;font-weight:bold"
              var regtxt="font-size:1.2em"
              if (cord==maxw) {
                wtxt="<span style='color:#BF8D4E;"+maxtxt+"'>"+comma(t['Resources']['Wood'])+"</span>"
              } else {
                wtxt="<span style='color:#BF8D4E;"+regtxt+"'>"+comma(t['Resources']['Wood'])+"</span> "
              }
              if (cord==maxb) {
                btxt="<span style='color:#CA7166;"+maxtxt+"'>"+comma(t['Resources']['Brick'])+"</span>"
              } else {
                btxt="<span style='color:#CA7166;"+regtxt+"'>"+comma(t['Resources']['Brick'])+"</span> "
              }
              if (cord==maxo) {
                otxt="<span style='color:#756B61;"+maxtxt+"'>"+comma(t['Resources']['Ore'])+"</span>"
              } else {
                otxt="<span style='color:#756B61;"+regtxt+"'>"+comma(t['Resources']['Ore'])+"</span> "
              }
              if (cord==maxf) {
                ftxt="<span style='color:#D2B04B;"+maxtxt+"'>"+comma(t['Resources']['Food'])+"</span>"
              } else {
                ftxt="<span style='color:#D2B04B;"+regtxt+"'>"+comma(t['Resources']['Food'])+"</span>&nbsp;"
              }  
              b.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;"+wtxt+" / "+btxt+" / "+otxt+" / "+ftxt;
            } catch (e) {}
            villages[coord].appendChild(m)
            villages[coord].childNodes[0].insertBefore(b,villages[coord].childNodes[0].childNodes[0])            
          }
        }
      }
    }
    
    var totalLi = document.createElement('li')
    //totalLi.style.fontSize="0.8em"
    var regt="font-size:0.9em"
    totalLi.innerHTML="<span style='"+regt+"'>Totals</span> - <span style='color:#FC5580;"+regt+"'>"+comma(totals[4])+"</span> --- <span style='color:#8EE3F7;"+regt+"'>"+comma(totals[5])+"</span> --- <span style='color:#BF8D4E;"+regt+"'>"+comma(totals[0])+"</span> --- <span style='color:#CA7166;"+regt+"'>"+comma(totals[1])+"</span> --- <span style='color:#756B61;"+regt+"'>"+comma(totals[2])+"</span> --- <span style='color:#D2B04B;"+regt+"'>"+comma(totals[3])
    $('vSelect').appendChild(totalLi);
    if (needswriting) {
      GM_setValue("buildQueue",dojo.toJson(buildQueue,false));
    }
    
    //html+="</table>"
    //bDiv.innerHTML+=html
    //aDiv.appendChild(bDiv);
    var expand=0;
    if ($('buildLoop').innerHTML.match(/No construction going on/)) {
      $('buildLoop').style.height="56px"
      expand++;
    } 
    if ($('runningAttacks').innerHTML.match(/No troop movements/)) {
      $('runningAttacks').style.height="46px"
      expand++;
    }
    if (expand==2) {
      var m=$x("//div[@id='militaryScrollable']",document.getElementById('military'))
      if (m.length > 0) {
       m[0].style.height="410px"
      } else {
       document.getElementById('military').style.height="148px"
      }
    }
    if (expand==1) {
      var m=$x("//div[@id='militaryScrollable']",document.getElementById('military'))
      if (m.length > 0) {
       m[0].style.height="350px"
      } else {
       document.getElementById('military').style.height="148px"
      }
    }
    //document.getElementById('attacks').parentNode.insertBefore(aDiv,document.getElementById('attacks'))
  }
  
  function appendScript(href) {
    var script = document.createElement("script");
    
    if (href) {  
      script.setAttribute("src", href);
    }
    script.setAttribute("type", "text/javascript");
    head.appendChild(script);
  }
  
  var head = document.body.previousSibling;
  
  while (head && head.tagName != "HEAD") {
    head = head.previousSibling;
  }
  
  unsafeWindow.djConfig = {afterOnLoad: true};
  var dojoPath = "http://ajax.googleapis.com/ajax/libs/dojo/1.2/"
  appendScript(dojoPath + "dojo/dojo.xd.js");
  appendScript(dojoPath + "dojo/date.js");
  appendScript(dojoPath + "dojo/date/locale.js");
  appendScript(dojoPath + "dojo/date/stamp.js");
  
  var waiter = function(){
    if (unsafeWindow.dojo && unsafeWindow.dojo.date && unsafeWindow.dojo.date.locale) {
      clearInterval(waitInterval);
      startitup();
    }
  }
  
  var waitInterval = setInterval(waiter, 400);
  
  //Include the Tundra Theme CSS file
  var link = document.createElement('link');
  link.rel = "stylesheet";
  link.type= "text/css";
  link.href="http://o.aolcdn.com/dojo/1.0.0/dijit/themes/tundra/tundra.css";
  document.getElementsByTagName('head')[0].appendChild(link);
  
  //Wait until everything is loaded before trying to do anything
  
  function startitup() {
    dojo = unsafeWindow.dojo;
    var rawval = GM_getValue('buildQueue',"").trim();
    var curTownNode=$x("//ul[@id='vSelectList']/li[@class='vselectActive']")[0]
    var curTownName=trim(curTownNode.childNodes[1].nodeValue)    
    var curTownLoc=trim(curTownNode.childNodes[0].innerHTML).split("/")
    var curTownCord=trim(curTownLoc[0]) + "|" + trim(curTownLoc[1])
    var curTownMilitary = $x("//div[@id='militaryScrollable']/div");
    var curTownWood = $x("//div[@id='ressources']/div/span[@id='ressourceWood']")[0];
    var curTownBrick = $x("//div[@id='ressources']/div/span[@id='ressourceBrick']")[0];
    var curTownOre = $x("//div[@id='ressources']/div/span[@id='ressourceOre']")[0];
    var curTownFood = $x("//div[@id='ressources']/div/span[@id='ressourceFood']")[0];
    var curTownServer = document.location.href.replace(/http:\/\/(.+)\/.*/g,"$1");
    //alert(curTownWood + " - " + curTownBrick + " - " + curTownOre + " - " + curTownFood)
    //GM_log(curTownName + " - " + curTownMilitary.length+ " - "+curTownServer + " - " + curTownCord )
    if (rawval == "") {
      buildQueue = new Object();
    } else {
      buildQueue=dojo.fromJson(rawval)    
    }
    if (buildQueue[curTownServer] == null)
      buildQueue[curTownServer] = new Object();
    if (buildQueue[curTownServer][curTownCord] == null) 
      buildQueue[curTownServer][curTownCord] = new Object(); 
    
    buildQueue[curTownServer][curTownCord]['Name']=curTownName

    // then try to get the building items for the town.
    try {
      var bq = $x("//div[@id='buildLoop']/div[@class='loopItem']");
      if (bq.length > 0) {
        for (var item in bq) {
          var buildType=$x("//img[@class='miniimg']",bq[item])[0].getAttribute("alt") + (Math.floor(Math.random()*11)*Math.floor(Math.random()*11)*Math.floor(Math.random()*11)+Math.floor(Math.random()*11)*1000);
          var buildLevel=$x("//div[@class='buildloopLevel']",bq[item])[0].innerHTML;
          var buildTime=$x("//span[@class='buildloopCountdown']",bq[item])[0].innerHTML.split(":");
          var futureTime = new Date();
          eval("futureTime=dojo.date.add(futureTime,'hour',"+buildTime[0]+")");
          eval("futureTime=dojo.date.add(futureTime,'minute',"+buildTime[1]+")");        
          eval("futureTime=dojo.date.add(futureTime,'second',"+buildTime[2]+")");
          buildQueue[curTownServer][curTownCord]['Building']=new Object();
          buildQueue[curTownServer][curTownCord]['Building'][buildType]=new Object();
          buildQueue[curTownServer][curTownCord]['Building'][buildType][0]=buildLevel;
          buildQueue[curTownServer][curTownCord]['Building'][buildType][1]=dojo.date.stamp.toISOString(futureTime);
        }
      } else {
        buildQueue[curTownServer][curTownCord]['Building']=new Object();
      }
    } catch(e) { }
    
    // grab resources
    try {
      buildQueue[curTownServer][curTownCord]['Resources']=new Object();
      buildQueue[curTownServer][curTownCord]['Resources']['Wood']=curTownWood.innerHTML
      buildQueue[curTownServer][curTownCord]['Resources']['Brick']=curTownBrick.innerHTML
      buildQueue[curTownServer][curTownCord]['Resources']['Ore']=curTownOre.innerHTML
      buildQueue[curTownServer][curTownCord]['Resources']['Food']=curTownFood.innerHTML
    } catch(e) {
    }
      
    // then try to get the military for the town
    try {
      var def=0;
      var off=0;
      for(var m in curTownMilitary) {
        var amt=parseInt($x("div[1]",curTownMilitary[m])[0].innerHTML)
        var txt=$x("//img[1]",curTownMilitary[m])[m].alt
        // 1 offensive (girl)
        if (txt.match(/Arquero|Poncho|Granjero/)) off=off+amt;
        // 2 defensive
        if (txt.match(/Fusilero|Pistolero|Soldado/)) def=def+amt;
        // 3 offensive
        if (txt.match(/Luchador tomahawk|El Mariachi|Francotirador/)) off=off+amt;
        // 4 info don't add for this
        // 5 defensive
        if (txt.match(/Arquero montado|Caballeria|Cowboy/)) def=def+amt;
        // 6 offensive
        if (txt.match(/Trabuco|Conquistador|Fanfarrón/)) off=off+amt;
        // 7 offensive
        if (txt.match(/Demonio de fuego|Bombolero|Blaster/)) off=off+amt;
        // 8 offensive
        if (txt.match(/Flecha ardiente|Cañon|Cañon/)) off=off+amt;
        // 9 offensive
        if (txt.match(/Portador de aguardiente|Portador de tequila|Portador de Whisky/)) off=off+amt;
        // 10 settler don't add for this
      }
      buildQueue[curTownServer][curTownCord]["Military"]=new Object();
      buildQueue[curTownServer][curTownCord]["Military"]["Offensive"]=off;
      buildQueue[curTownServer][curTownCord]["Military"]["Defensive"]=def;      
    } catch(e) { } 
    
    //GM_log(dojo.toJson(buildQueue,false))
    GM_setValue("buildQueue",dojo.toJson(buildQueue,false));
    displayBuildQueue();
  }  
}

function addGoLink(xpList,xpContent,xpPlace) {
  var list=$x(xpList,document)
  for(var i=0;i<list.length;i++) {
    try {
      var content=$x(xpContent,list[i])[i].innerHTML.replace(/.*?([0-9]{1,3})[\|\\\/]([0-9]{1,3}).*/,"$1|$2")
      if (content.match(/[0-9]+\|[0-9]+/)) {
        var cords=content.split('|');
        var newlink = document.createElement('a');
        var spaceTxt = document.createTextNode(" ");
        newlink.href = "http://s201.wildguns.fr/user.php?action=map&mapY="+cords[0]+"&mapX="+cords[1]
        var homecords = GM_getValue("wghome","0|0").split("|")
        var dis = Math.ceil(distance(homecords[1], homecords[0], cords[1], cords[0],'S'))
        newlink.style.backgroundColor="#"+generateColorBasedOnMD5(content);
        newlink.style.fontSize="12px"
        newlink.innerHTML="Abre el mapa en "+content+" (Aproximadamente " + dis + " espacios)"
        var aTD = $x(xpPlace,list[i])[i]
        aTD.appendChild(spaceTxt);
        aTD.appendChild(newlink);
      }
    } catch (e) {}
  }
}

if (document.location.href.match("action=mail&mailaction=inbox&showmail=[0-9]+")) {
	if (top.location != location) {
		var m_id=document.location.search.split("&")[2].split("=")[1]
		var f=document.createElement('form')
		f.method="post"
		f.action="/user.php#newMail"
		f.innerHTML=document.getElementsByTagName('form')[0].innerHTML
		var uname=$x("//div[@id='mailviewInner']/a[1]",document)[0].innerHTML
		var subj=$x("//div[@id='mailviewInner']/h2[1]",document)[0].innerHTML
		f.innerHTML="<input type='hidden' value='"+uname+"' name='username'/>"
		f.innerHTML+="<input type='hidden' value='"+subj+"' name='subject'/>"
		f.innerHTML+="<input type='hidden' value='"+m_id+"' name='deleteId'/>"
		f.innerHTML+="<input type='hidden' value='mail' name='action'/>"
		f.innerHTML+="<input type='hidden' value='new' name='mailaction'/>"
		f.innerHTML+="<input type='submit' value='Responder' name='responder'/>&nbsp;"
		f.innerHTML+="<a class='button lbOn' href='lightbox_content/lb_main.php?action=squeal&igm_id="+m_id+"'>Reportar mensaje</a>"
    document.body.innerHTML=document.getElementById('mailviewInner').innerHTML
		document.body.appendChild(f)
		document.body.style.textAlign="left"
		//document.body.style.backgroundImage="url(http://s201.wildguns.fr/images/style/content/ind_03_inbox.jpg)"
    document.body.style.background="#E8CD90"
	}
}

if (document.location.href.match("action=mail&mailaction=reports")) {
  addGoLink("//form/table/tbody/tr","//td[4]/a[1]","//td[4]")
}

if (document.location.href.match("action=mail&mailaction=outbox")) {
  addGoLink("//form/table/tbody/tr","//td[5]/a[1]","//td[5]")
}

if ((document.location.href.match("action=mail&mailaction=inbox$"))||(document.location.href.match("action=mail$"))
      ||(document.location.href.match("action=mail&mailaction=inbox&page=[0-9]+$"))) {
	var mails=$x("//form/table/tbody/tr",document)
	var to_ajaxify=$x("//form/table/tbody/tr/td[4]/a",document)
	
	addGoLink("//form/table/tbody/tr","//td[4]/a[1]","//td[4]")
	document.getElementById('pagination').style.position="static"
	document.getElementById('pagination').style.background="#C5A678"
	document.getElementById('mailbuttons').style.position="static"
	document.getElementById('copyright').style.position="static"
	for(var i=0;i<to_ajaxify.length;i++) {
		to_ajaxify[i].setAttribute("secret",to_ajaxify[i].href)
		to_ajaxify[i].href=to_ajaxify[i].href
		to_ajaxify[i].target="mailframe"+i
		var iffy = document.createElement("iframe")
		iffy.name="mailframe"+i
		iffy.width="100%"
		iffy.height="200px"
		iffy.src="about:blank"
		var trr = document.createElement("tr")
		var tdd = document.createElement("td")
		tdd.setAttribute("colspan","4")
		tdd.appendChild(iffy)
		trr.appendChild(tdd)
		trr.style.display="none"
		to_ajaxify[i].parentNode.parentNode.parentNode.insertBefore(trr,to_ajaxify[i].parentNode.parentNode.nextSibling)
		to_ajaxify[i].addEventListener("click",function(e){
			this.style.fontWeight="normal";
			var nextTR = this.parentNode.parentNode.nextSibling
			if (nextTR.style.display == "none") {
				nextTR.style.display=""
			} else {
				this.parentNode.parentNode.nextSibling.style.display="none"
			}
		},false)
	}
}

if (document.location.href.match("action=map")) {
 var b = document.createElement("a")
 b.innerHTML = "Fije estas coordenadas como tu casa"
 b.href="javascript:// Fije estas coordenadas como tu casa para cálcular la distancia"
 b.addEventListener("click",function(e){
   GM_setValue('wghome',$x('//*[@id="mapCenterY"]',document)[0].value +"|"+ $x('//*[@id="mapCenterX"]',document)[0].value)
 },false);
 $x('//*[@id="mapCoords"]',document)[0].appendChild(b)
}


function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	if (unit!="S") dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}

function generateColorBasedOnMD5(strToHash)
{
	var hashy=MD5(strToHash).toUpperCase();
	var colorhex="";var numf=""
	for(var i=hashy.length-1;i>0;i--) {
		if (colorhex.length==6) break;
			if (hashy[i].match(/[0-1A-F]/)) {
				colorhex+=hashy[i];
			}
	}
	return colorhex;
}

/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/

function MD5(string) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }

    function AddUnsigned(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
     }

     function F(x,y,z) { return (x & y) | ((~x) & z); }
     function G(x,y,z) { return (x & z) | (y & (~z)); }
     function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }

    function FF(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }
    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
    return temp.toLowerCase();
}