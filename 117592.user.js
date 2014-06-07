// ==UserScript==
// @name           EksiFavori
// @description    Eksi Sozluk'te entry'leri ve basliklari favorilere ekleme ozelligi getirir.
// @namespace      http://userscripts.org/users/ocanal
// @version        0.5.1.2
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://antik.eksisozluk.com/*
// ==/UserScript==


/* Dedicated to Dennis Ritchie */
/* EksiFavori by ocanal */


function EksiFavori() {
	

	var browser = detectBrowser();
	var logPrefix = "EksiFavori >> ";
	var elementPrefix = "eksifavori_";
	var localStoragePrefix = "eksifavori_";
	var patt_Favori_Page = /\/index\.asp\?a=sr&so=y&kw=\*$/;
	var link_Favori_Page = "index.asp?a=sr&so=y&kw=*";
	//var topDocument = (browser == "firefox")?window.top.document:document;
	var favoriNode = {};
	var EksiFavoriStore = {
		name: "EksiFavori",
		entryList:	[/*{title: "d1", entryid: "d2"}*/],
	};
	
	/* FUNCTIONS */
	/* Thanks to ntpl */
	function xpath(xpath, element) {
        if (!element)
            element = document;
        return document.evaluate(xpath, element, null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
	
	function detectBrowser() {
        if (navigator.userAgent.match(/firefox/i))
            return "firefox";
        else if (navigator.userAgent.match(/(chrome|opera)/i))
            return "chrome/opera";
        else
            return "unknown";
    }
	
	function EksiFavori_log(str) {
        if (browser == "firefox")
            GM_log(str);
        else if (browser == "chrome/opera")
            console.log(logPrefix + str);
    }
	
	function EppAPI_setValue(name, value) {
        if (browser == "firefox") {
            GM_setValue(name, value);
        } else if (browser == "chrome/opera") {
            localStorage.setItem(localStoragePrefix + name, value);
        }
    }
	
	function EppAPI_getValue(name, defval) {
        if (browser == "firefox") {
            return GM_getValue(name, defval);
        } else if (browser == "chrome/opera") {
            var ret = localStorage.getItem(localStoragePrefix + name);
            return ((ret != null)?ret:defval);
        }
    }
	
    function tumAyarlariKaydet() {
        var ayarlarJson = JSON.stringify(EksiFavoriStore);
        EppAPI_setValue(EksiFavoriStore.name, ayarlarJson);
    }
	
	function RefreshLeftFrame() {
		/*will be created later*/
	} 
	/* ekşi sözlük top.js functions */
	function EksiFavori_ods(n, s, f) {
		var tempods = ' <select name="' + n + '"><option></option>';
		for (var n = 1; n <= 31; n++) tempods += "<option " + (n == f ? "selected='selected'" : "") + ">" + n + "</option>";
		if (s) for (n = 2; n <= 12; n++) tempods += "<option value=" + (n * 30) + ">" + n + " ay</option>";
		tempods += '</select>';
		return tempods;
	}

	function EksiFavori_oms(n, f) {
		var mo = new Array("ocak", "şubat", "mart", "nisan", "mayıs", "haziran", "temmuz", "ağustos", "eylül", "ekim", "kasım", "aralık");
		var tempoms =' <select name="' + n + '"><option></option>';
		for (var n = 1; n <= 12; n++) tempoms +="<option " + (n == f ? "selected='selected'" : "") + " value='" + n + "'>" + mo[n - 1] + "</option>";
		tempoms +='</select>';
		return tempoms;
	}

	function EksiFavori_oys(n, f) { 
		var tempoys = ' <select name="' + n + '"><option></option>';
		with (new Date()) for (var n = getFullYear(); n >= 1999; n--) tempoys += "<option " + (n == f ? "selected='selected'" : "") + ">" + n + "</option>";
		tempoys += '</select>';
		return tempoys;
	}	
    
    function tumAyarlariSifirla() {
        EppAPI_setValue(EksiFavoriStore.name, 0);
    }
    
    function tumAyarlariYukle() {
        var ayarlarJson = EppAPI_getValue(EksiFavoriStore.name, 0);
        if (ayarlarJson != 0) { 
            var kayitliAyarlar = JSON.parse(ayarlarJson);
            EksiFavoriStore = kayitliAyarlar;
            }
    } 
		
	function yeniEksiTusu(element,id) {
        if (!element)
            element = "span";
        
        var yeniTus = document.createElement(element);
        
        if (element == "input")
            yeniTus.type = "button";
        
		if(id) 
			  yeniTus.id = id;
        yeniTus.className = "but";  
        yeniTus.setAttribute("onmouseover","ov(this)");        
        yeniTus.setAttribute("onmouseout","bn(this)");        
        yeniTus.setAttribute("onmousedown","md(this)");        
        yeniTus.setAttribute("onmouseup","bn(this)");

        return yeniTus;
    }
	function newElem(type) {
    return document.createElement(type);
  }
  
  function idGet(id) {
    return document.getElementById(id);
  }
	/* Specical Functions For EksiFavori */
	
	function IsInFavouriteList(eid) {
		//control by entry if entry exist in database 
			tumAyarlariYukle();
			for(var i=0; i < EksiFavoriStore.entryList.length; i++) {
				if(EksiFavoriStore.entryList[i].entryid == eid) {
					//EksiFavori_log("Evet var, entryid: "+eid);
					return true;
				}
			}
			//EksiFavori_log("Hayır yok, entryid: "+eid);
			return false;
	}
	
	function ShowMessage(elem,message) {
		if(!elem) return;
		
		elem.innerHTML = message;
		var t=setTimeout(function() { elem.innerHTML =""},4000,elem);
	}
	
	function AddToFavourites(etitle,eid) {
			//insert entry into database
			var resultel = idGet('vst'+eid);
			tumAyarlariYukle();
			for(var i=0; i < EksiFavoriStore.entryList.length; i++) {
				if(EksiFavoriStore.entryList[i].entryid == eid) {
					//EksiFavori_log("Zaten var, {baslik: "+etitle+", entryid: "+eid+"}");
					return false;
				}
			}
			EksiFavoriStore.entryList.push({title: etitle, entryid: eid});
			ShowMessage(resultel,"eklendi!");
			//EksiFavori_log("Ekleme islemi basarili, {baslik: "+etitle+", entryid: "+eid+"}");
			tumAyarlariKaydet();
			RefreshLeftFrame();
			return true;
		}
		
	function RemoveFromFavourites(eid) {
			//remove entry from database
			//insert entry into database
			var resultel = idGet('vst'+eid);
			tumAyarlariYukle();
			var tempentryList = new Array();
			var j =0;
			for(var i=0; i < EksiFavoriStore.entryList.length; i++) {
				if(EksiFavoriStore.entryList[i].entryid != eid) {
					tempentryList[j++] = EksiFavoriStore.entryList[i];
				}
			}
			EksiFavoriStore.entryList = tempentryList;
			tumAyarlariKaydet();
			RefreshLeftFrame();
			ShowMessage(resultel,"çıkarıldı!");
			//EksiFavori_log("Silme islemi basarili, entryid: "+eid);
	}
	
	function RemoveAllFromFavourites() {
			tumAyarlariYukle();
			var tempentryList = new Array();
			EksiFavoriStore.entryList = tempentryList;
			RefreshLeftFrame();
			tumAyarlariKaydet();
	}
	
	/* Editing Entries for EksiFavori Buttons */
	function FavoriEditor() {
		var pageTitle = getPageTitle();
		
		function getPageTitle() {
			var titleList = xpath("//h1[@class='title']/a");
			var title ="";
			for(var i=0; i<titleList.snapshotLength;i++) {
				title += titleList.snapshotItem(i).innerHTML;
				if(!((i+1) == titleList.snapshotLength)) title += " ";
			}
			return title;
		}
		
		function getEntryId(entry) {
			var entry_id = xpath(".//div[@class='entrymenu']",entry).snapshotItem(0).id;
			return entry_id.replace(/m/g,"");
		}
		
		function AddFavouriteButton(entry) {
			var entry_id = getEntryId(entry);
			var hidden_div = xpath(".//div[@class='entrymenu']",entry).snapshotItem(0);
			var favoributton = yeniEksiTusu("span",elementPrefix+entry_id);

            favoributton.title = "Favorilere Ekle";
            favoributton.innerHTML = "+";
            favoributton.style.cssFloat = "right";
            favoributton.style.marginLeft = "1em";
            favoributton.style.marginTop = "1px";
            favoributton.style.paddingLeft = "0.5em";
            favoributton.style.paddingRight = "0.5em";

            favoributton.addEventListener("click", (function(etitle,eid) {
                return function() {
                       if(this.innerHTML == "-") {
							RemoveFromFavourites(eid);
							this.innerHTML = "+";
							this.title = "Favorilere Ekle";
						}
						else { 
							AddToFavourites(etitle,eid);
							this.innerHTML = "-";
							this.title = "Favorilerden Cıkar";
						}
                }
            })(pageTitle,entry_id),true);

            hidden_div.insertBefore(favoributton, hidden_div.firstChild.nextSibling);
		}
		
		function AddUnFavouriteButton(entry) {
			var entry_id = getEntryId(entry);
			var hidden_div = xpath(".//div[@class='entrymenu']",entry).snapshotItem(0);
			var favoributton = yeniEksiTusu("span",elementPrefix+entry_id);

            favoributton.title = "Favorilerden Cıkar";
            favoributton.innerHTML = "-";
            favoributton.style.cssFloat = "right";
            favoributton.style.marginLeft = "1em";
            favoributton.style.marginTop = "1px";
            favoributton.style.paddingLeft = "0.5em";
            favoributton.style.paddingRight = "0.5em";

            favoributton.addEventListener("click", (function(etitle,eid) {
                return function() {
						if(this.innerHTML == "+") {
							AddToFavourites(etitle,eid);
							this.innerHTML = "-";
							this.title = "Favorilerden Cıkar";
						}
						else { 
							RemoveFromFavourites(eid);
							this.innerHTML = "+";
							this.title = "Favorilere Ekle";
						}
                }
            })(pageTitle,entry_id),true);

            hidden_div.insertBefore(favoributton, hidden_div.firstChild.nextSibling);
		}
		
		function EditEntryMenus() {
			var entryList = xpath("//ol[@class='eol']/li");
			for(var i = 0; i < entryList.snapshotLength; i++) {
				var entry = entryList.snapshotItem(i);
				if(IsInFavouriteList(getEntryId(entry))) {
					AddUnFavouriteButton(entry);
				}
				else {
					AddFavouriteButton(entry);
				}
			} 
		}
		
		this.main = function() {
			EditEntryMenus();
		}
	}
	
	
	/* List Favourite Entries */
	function FavoriList() {
		var maxEntry = 50;
		var titlehtml = "Eksi Favorilerim Listesi";
		var bodyel = xpath("//body").snapshotItem(0);
		var EksiFavoriListDiv = document.createElement('div');
		var EksiFavoriFooter = document.createElement('div');
    EksiFavoriFooter.setAttribute("align","center");
    var statusDiv = newElem("div");
    EksiFavoriFooter.appendChild(statusDiv);
    
		function ClearPage() {
			/* clearing innerHTML and setting class for body */
			var hayvanarahtml = '<div id="a" class="adiv" style="top:44px"><form action="index.asp" id="sr" method="get">'+
								'<table border="0" cellpadding="0" cellspacing="0" style="width:200px">'+
								'<tr><td class="aup">&nbsp;</td>'+
								'<td id="amain" rowspan="3" class="amain">'+
								'<input type="hidden" name="a" value="sr" />'+
								'<table class="msg" border="0" cellpadding="0" cellspacing="0">'+
								'<tr><td>şey</td><td><input type="text" id="kw" name="kw" size="19" maxlength="100" value=""/></td></tr>'+
								'<tr><td>yazarı</td><td><input type="text" name="au" size="19" maxlength="50" value="" /></td></tr>'+
								'</table>'+
								'<fieldset><legend>sıra şekli</legend>'+
								'<table class="msg"><tr>'+
								'<td style="white-space:nowrap"><input id="ra" type="radio" class="radio" name="so" value="a"  onclick="sch(\'a\')" />'+
								'<label accesskey="a" for="ra"><span style="text-decoration:underline">a</span>lfa-beta</label></td>'+
								'<td style="white-space:nowrap"><input id="rr" type="radio" class="radio" name="so" value="r"  onclick="sch(\'r\')" />'+
								'<label accesskey="r" for="rr"><span style="text-decoration:underline">r</span>';
								for(var n=1;n < 7;n++) hayvanarahtml += String.fromCharCode(Math.round(Math.random()*25)+97);
				hayvanarahtml +='</label></td></tr>'+
								'<tr>'+
								'<td style="white-space:nowrap"><input id="ry" type="radio" class="radio" name="so" value="y" checked=\'checked\' onclick="sch(\'y\')" />'+
								'<label accesskey="y" for="ry"><span style="text-decoration:underline">y</span>eni-eski</label></td>'+
								'<td style="white-space:nowrap"><input id="rg" type="radio" class="radio" name="so" value="g"  onclick="sch(\'g\')" />'+
								'<label accesskey="u" for="rg">g<span style="text-decoration:underline">u</span>dik</label></td>'+
								'</tr></table>'+
								'</fieldset>'+
								'<fieldset style="white-space:nowrap;text-align:center"><legend>şu gün</legend>';
								
								hayvanarahtml += EksiFavori_ods('fd',0,0)+EksiFavori_oms('fm',0)+EksiFavori_oys('fy',0);
				hayvanarahtml += '</fieldset>'+
								'<fieldset><legend>tercihler</legend>'+
								'<input id="cr" accesskey="g" type="checkbox" class="checkbox" name="cr" value="y" /> '+
								'<label for="cr"><span style="text-decoration:underline">g</span>üzelinden olsun</label>'+
								'</fieldset><br />'+
								'<div style="text-align:center">'+
								'<input type="submit" class="but" value="hayvanlar gibi ara" /></div>'+
								'</td></tr>'+
								'<tr><td class="amid" onmouseup="pp()">h<br />a<br />y<br />v<br />a<br />n<br /><br />a<br />r<br />a</td></tr>'+
								'<tr><td class="abot">&nbsp;</td></tr>'+
								'</table></form></div>';
			bodyel.innerHTML = hayvanarahtml;
			var osrscript = document.createElement("script");
			osrscript.innerHTML +="osr();";
			document.getElementsByTagName('head')[0].appendChild(osrscript);
			bodyel.className = "bgleft";
			
			/*changing title tag*/
			/*var titleel = xpath("//title").snapshotItem(0);
			titleel.innerHTML = titlehtml;*/
			bodyel.appendChild(EksiFavoriListDiv);
			bodyel.appendChild(EksiFavoriFooter);
		}
		
		function CreatePager(p,maxp) {
			var divPagi = document.createElement("div");
			divPagi.className= "pagi";
      if(EksiFavoriStore.entryList.length > 0) {
        var hepsiniokubut = yeniEksiTusu();
        hepsiniokubut.style.padding = "3px";
        hepsiniokubut.style.margin = "5px";
        hepsiniokubut.innerHTML = "hepsini okumak istiyorum >>";
        hepsiniokubut.setAttribute("onclick","top.sozmain.location.href='show.asp?t=__eksifavori_listesi__'");
        divPagi.appendChild(hepsiniokubut);
        divPagi.appendChild(newElem("br"));
        divPagi.appendChild(newElem("br"));
      }
			divPagi.innerHTML += 'favori entry\'lerim.. ('+EksiFavoriStore.entryList.length+' entry)<br />';
      	
			if(maxp > 1) {
				var spanPagi = document.createElement("span");
				
				if(p > 1) {
					var preva = document.createElement("a");
					preva.id = elementPrefix + "prev";
					preva.className = "link";
					preva.innerHTML = "&lt;&lt; ";
					preva.title = "onceki sayfa";
					spanPagi.appendChild(preva);
				}
					
				spanPagi.innerHTML +="sayfa";
				
				var tempsel = document.createElement("select");
				tempsel.id = elementPrefix+"pager";
				tempsel.className = "pagis";
				for(var i=0; i <maxp; i++) {
					if((i+1) == p) 
						tempsel.options[i] = new Option((i+1),(i+1),true,true);
					else 
						tempsel.options[i] = new Option((i+1),(i+1));
				} 			
				spanPagi.appendChild(tempsel);				
				spanPagi.innerHTML +=" / ";
				
				var thispage = document.createElement("a");
				thispage.id = elementPrefix + "thispage";
				thispage.className = "link";
				thispage.style.fontSize = "x-small";
				thispage.innerHTML = maxp;
				thispage.title = maxp;
				spanPagi.appendChild(thispage);
				
				if(p < maxp) {
					var nexta = document.createElement("a");
					nexta.id = elementPrefix + "next";
					nexta.className = "link";
					nexta.innerHTML = " &gt;&gt;";
					nexta.title = "sonraki sayfa";
					spanPagi.appendChild(nexta);					
				}
				
				divPagi.appendChild(spanPagi);
				EksiFavoriListDiv.appendChild(divPagi);
				
				var EksiFavoriPager = idGet(elementPrefix+"pager");
				if(EksiFavoriPager) {
				EksiFavoriPager.addEventListener("change", function(){ 
					FillPageByEntrylist((this.selectedIndex+1));
					//EksiFavori_log("Sayfa değişim isteği: p="+(this.selectedIndex+1));
				}, true); }
				
				var EksiFavoriPager_prev = idGet(elementPrefix+"prev");
				if(EksiFavoriPager_prev) {
				EksiFavoriPager_prev.addEventListener("click", function(){ 
					FillPageByEntrylist((EksiFavoriPager.selectedIndex));
					//EksiFavori_log("Sayfa değişim isteği: p="+(EksiFavoriPager.selectedIndex));
				}, true); }

				var EksiFavoriPager_next = idGet(elementPrefix+"next");
				if(EksiFavoriPager_next) {
				EksiFavoriPager_next.addEventListener("click", function(){ 
					FillPageByEntrylist((EksiFavoriPager.selectedIndex+2));
					//EksiFavori_log("Sayfa değişim isteği: p="+(EksiFavoriPager.selectedIndex+2));
				}, true); }
				
				var EksiFavoriPager_thispage = idGet(elementPrefix+"thispage");
				if(EksiFavoriPager_thispage) {
				EksiFavoriPager_thispage.addEventListener("click", function(){ 
					FillPageByEntrylist(this.title);
					//EksiFavori_log("Sayfa değişim isteği: p="+this.title);
				}, true); }
								
			} else {
				EksiFavoriListDiv.appendChild(divPagi);
			}
		}

		function CreateEntryList(p) {
			EksiFavoriListDiv.appendChild(document.createElement("br"));
			var ultemp = document.createElement("ul");
			ultemp.className = "index";
			
			var maxp = Math.ceil(EksiFavoriStore.entryList.length/maxEntry);
			if(p <= 0) p = 1;
			else if(p > maxp) p = maxp;
			var maxlimit = (EksiFavoriStore.entryList.length-1)-((p-1)*maxEntry);
			var limiter = maxEntry;
			for(var i = maxlimit; i >= 0; i--) {
				if(limiter > 0) {
					if(EksiFavoriStore.entryList[i]) {
            var tempLi = newElem("li");
            var tempLink = newElem("a");
            tempLink.target = "sozmain";
            tempLink.href = "show.asp?t=%23"+EksiFavoriStore.entryList[i].entryid;
            tempLink.innerHTML = EksiFavoriStore.entryList[i].title+"/#"+EksiFavoriStore.entryList[i].entryid;
            tempLink.addEventListener("click", function(entryID) { return function(e){
                    if(e.altKey) { 
                       RemoveFromFavourites(entryID);
                       this.parentNode.style.display = "none";
                       e.preventDefault();
                    }	
                }}(EksiFavoriStore.entryList[i].entryid), true);
						tempLi.appendChild(tempLink);
            ultemp.appendChild(tempLi);
					}
				}
				limiter--;
			}
			EksiFavoriListDiv.appendChild(ultemp);
		}
		
		function FillPageByEntrylist(p) {
			tumAyarlariYukle();
			EksiFavoriListDiv.innerHTML = "";
			var maxp = Math.ceil(EksiFavoriStore.entryList.length/maxEntry);
			if(p <= 0) p = 1;
			else if(p > maxp) p = maxp;
			CreatePager(p,maxp);
			CreateEntryList(p);
		}
		
		function CreateRemoveAllButton() {
			if(EksiFavoriStore.entryList.length > 0) {
				var removebutton = yeniEksiTusu();
				removebutton.innerHTML = "Bosalt";
				removebutton.style.padding = "3px";
        removebutton.style.margin = "3px";
				removebutton.addEventListener("click",function(){
					if(confirm("Liste tamamen bosaltilacak, emin misin?")) {
						RemoveAllFromFavourites();
						this.style.display = "none";
						FillPageByEntrylist(0);
					}
				},true);
				EksiFavoriFooter.innerHTML = "<br />";
				EksiFavoriFooter.appendChild(removebutton);
			}
		}
    
    function CreateExportImportButtons() {
      var exportBut = yeniEksiTusu();
      exportBut.innerHTML = "Disari aktar";
      exportBut.style.padding = "3px";
      exportBut.style.margin = "3px";
      
      var importBut = yeniEksiTusu();
      importBut.innerHTML = "Iceri aktar";
      importBut.style.padding = "3px";
      importBut.style.margin = "3px";
      
      exportBut.addEventListener("click", function() {
        prompt("Favori entry listesini almak icin kopyalayip bir yerlere kaydedin:",JSON.stringify(EksiFavoriStore.entryList));
      },true);
      
      importBut.addEventListener("click", function() {
        try {
            var importList = JSON.parse(prompt("Daha once kaydettiginiz favori entryler listenizi yapistirin:",'[{"title": "-baslik-", "entryid": "-2323-"}]'));
            for(var i=0;i<importList.length;i++) {
              AddToFavourites(importList[i].title,importList[i].entryid);
            }
            statusDiv.innerHTML = "<br />(Favori listeniz guncellendi!)";
            FillPageByEntrylist(0);
       }   catch(e) {
            //EksiFavori_log("import listesinde bir sorun var gibi:"+e);
            statusDiv.innerHTML = "<br />(Listede bir sorun var gibi!)";
        }
      },true);
      EksiFavoriFooter.appendChild(exportBut);
      EksiFavoriFooter.appendChild(importBut);
    }
		
		this.main = function() {
			ClearPage();
			FillPageByEntrylist(0);
			CreateRemoveAllButton();
      CreateExportImportButtons();
			/*var EksiFavoriPager = idGet(elementPrefix+"pager");			
			EksiFavoriPager.addEventListener("change", function(){ 
				FillPageByEntrylist((this.selectedIndex+1));
				//EksiFavori_log("Sayfa değişim isteği: p="+(this.selectedIndex+1));
			}, true); */
							
		}
	}
	
	function TopFrame() {
		this.main = function() {
			var fbutton = yeniEksiTusu("td");
			fbutton.setAttribute("onclick","top.sozindex.location.href='"+link_Favori_Page+"'");
			fbutton.innerHTML = "<a title='favori listem' target='sozindex'>f</a>";
			fbutton.style.paddingLeft = "1em";
			fbutton.style.paddingRight = "1em";
			var sukelabutton_a = xpath("//table[@class='nav']/tbody/tr/td/a[contains(@title,'ela') or contains(@title,'ortamlara')]").snapshotItem(0);
			var sukelabutton_td = sukelabutton_a.parentNode;
			var statbutton_a = xpath("//table[@class='nav']/tbody/tr/td/a[@title='rakamlar ve getirdikleri']").snapshotItem(0);
			var statbutton_td = statbutton_a.parentNode;
			var newcolspan = "2";
			if(statbutton_td.getAttribute("colSpan") == "1") newcolspan = "2";
			else if(statbutton_td.getAttribute("colSpan") == "2") newcolspan = "3";
			else if(statbutton_td.getAttribute("colSpan") == "3") newcolspan = "4"; 
			statbutton_td.setAttribute("colSpan",newcolspan);
			
			sukelabutton_td.parentNode.insertBefore(fbutton,sukelabutton_td);
		}
	}
  
  function FavoriShow() {
    var lastIndex = EksiFavoriStore.entryList.length-1;
    
    function entryGetir(entryUrl,entryTitle,pStatus) {
        var olTags = idGet("oltags");
        var loaderImg = idGet("loaderImg");
        var showmorebut = idGet("showmore");
        var req =  new XMLHttpRequest();
        var result = "";
        req.open("GET", entryUrl, true);
        req.onreadystatechange = (function (PStatus) { return function() {
          if(this.readyState == 4) {
            var tempDom = document.createElement("div");
            tempDom.innerHTML = req.responseText;
            if (!tempDom.getElementsByTagName("ol").length) {
                olTags.innerHTML += "Bu entry'de bir sorun var gibi!"
                return 0;
            }
            var baslik = (tempDom.getElementsByTagName("h1"))[0];
            var entryler = tempDom.getElementsByTagName("li");
            var gomEntryLi = 0;
            
            for (var i=0; i<entryler.length; i++) {
                liItem = entryler[i];
                if (liItem.value) {
                    gomEntryLi = liItem;
                    break;
                }
            }
            
            if (gomEntryLi) {
                var entryID = gomEntryLi.id.replace(/\D/g,'');
                var entrySira = gomEntryLi.value;
                if (gomEntryLi.firstChild.nodeName == "input")
                    gomEntryLi.removeChild(gomEntryLi.firstChild);
                //gomEntryLi.lastChild.removeChild(gomEntryLi.lastChild.lastChild);
                var scriptler = xpath(".//script", gomEntryLi)
                for (var i=0; i< scriptler.snapshotLength; i++) {
                    var script = scriptler.snapshotItem(i);
                    script.parentNode.removeChild(script);
                }
                var yazarID = xpath("./a",gomEntryLi.lastChild).snapshotItem(0).innerHTML;
                gomEntryLi.insertBefore(document.createElement("br"), gomEntryLi.lastChild);
                var eksiTuslari =  '<table style="float: right; margin-top: 0.5em;"><tbody><tr><td style="white-space: nowrap;" id="vst__ENTRY-ID__" class="ei">&nbsp;</td>\
                                        <td><span class="but" onclick="mpr(__ENTRY-ID__,1)" title="şükela!" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;:)&nbsp;</span></td>\
                                        <td><span class="but" onclick="mpr(__ENTRY-ID__,0)" title="öeehh" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;:O&nbsp;</span></td>\
                                        <td><span class="but" onclick="mpr(__ENTRY-ID__,-1)" title="çok kötü" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;:(&nbsp;</span></td>\
                                        <td>&nbsp;</td>\
                                        <td><span class="but" onclick="od(\'msg.asp?to=__YAZAR-ID__&amp;re=__ENTRY-ID__\')" title="mesaj at" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;/msg&nbsp;</span></td>\
                                        <td><a class="but" href="javascript:od(\'http://antik.eksisozluk.com/info2.asp?n=__YAZAR-ID__\',800,400)" title="yazar hakkında" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)">&nbsp;?&nbsp;</a></td>\
                                    </tr></tbody></table>';
                eksiTuslari = eksiTuslari.replace(/__ENTRY-ID__/g, entryID);
                eksiTuslari = eksiTuslari.replace(/__YAZAR-ID__/g, yazarID);
                result = "<h2 class='title'>" + baslik.innerHTML + 
                             "<sup><a href='show.asp?t="+encodeURIComponent(baslik.textContent).replace(/[']/g,"%27")+"' title='basliga git' target='_blank' style='text-decoration:underline;'>git</a></sup>"+
                             "<sup><a href='show.asp?t="+encodeURIComponent(baslik.textContent).replace(/[']/g,"%27")+"&i="+entryID+"' title='konulu git' target='_blank' style='text-decoration:underline; margin-left:.5em;'>kit</a></sup>"+
                         "</h2>";
                result += "<ol style='white-space: normal;'><li value='"+entrySira+"' style='margin-left:0;'>";
                result += gomEntryLi.innerHTML;
                result += eksiTuslari;
                result += "<br/>";
                result += "</li></ol>";
            } else {
                result = "Bu entry'de bir sorun var gibi!";
            }
            olTags.innerHTML += result;
             
            if(pStatus)
              loaderImg.style.display = "none";
            }
          };})(pStatus);
        
        req.send(null);
        
    }
    
    function ShowList() {
      var olTags = idGet("oltags");
      if(!olTags) {
        olTags = newElem("div");
        olTags.id = "oltags";
        document.body.innerHTML = "<div align='center'><h1 class='title'><a href='show.asp?t=favori entry%27'lerim>Favori Entry'lerim</a></h1></div>";
        document.body.style.padding = "50px";
        document.body.appendChild(olTags);
      }
      
      var wrappershowbut = idGet("showmore");
      if(!wrappershowbut) {
        var showmorebutton = yeniEksiTusu("div");
        showmorebutton.style.width = "100%";
        //showmorebutton.style.padding = "400px";
        showmorebutton.style.paddingTop = "10px";
        showmorebutton.style.paddingBottom = "10px";
        showmorebutton.style.fontSize = "15px";
        showmorebutton.innerHTML = "daha fazla getir, oh yeah";
        showmorebutton.addEventListener("click", function(){ ShowList(); },true);
        var wrappershowbut = newElem("div");
        wrappershowbut.id = "showmore"; 
        wrappershowbut.style.display = "none";
        wrappershowbut.appendChild(showmorebutton);
        showmorebutton.setAttribute("align","center");
        //olTags.parentNode.innerHTML += "<br /><br />";
        olTags.parentNode.appendChild(wrappershowbut);
      }
      
      var loaderImg = idGet("loaderImg");
      if(!loaderImg) {
        loaderImg = newElem("div");
        loaderImg.setAttribute("align","center");
        loaderImg.id = "loaderImg";
        loaderImg.innerHTML = "<img src='http://i.imgur.com/VkzIw.gif' />";
        olTags.parentNode.appendChild(loaderImg);
      }
      loaderImg.style.display = "";
      if(lastIndex > 10)
        var entrylimiter = lastIndex - 10;
      else 
        var entrylimiter = 0;  
      for(var i=lastIndex; i >=entrylimiter ;i--) {
        var senderStatus = false;
        try { 
          if(i-1 <= entrylimiter) 
            senderStatus = true;
          entryGetir("show.asp?t=%23"+EksiFavoriStore.entryList[i].entryid,EksiFavoriStore.entryList[i].title,senderStatus);
        } catch(e) {
          alert(e);
        }
        lastIndex--;
      }
      if(lastIndex > 0) {
        wrappershowbut.style.display = "";
      } else {
        wrappershowbut.style.display = "none";
      }     
    }
    
    this.main = function() {
      ShowList();
    }
  }

	this.main = function() {
		tumAyarlariYukle();
		tumAyarlariKaydet();

		if (window.location.href.match(/show.asp\?t=__eksifavori_listesi__$/)) {
			var newpage = new FavoriShow();
		} else if (window.location.href.match(/\/show\.asp/)) {
			var newpage = new FavoriEditor();
		} else if(window.location.href.match(patt_Favori_Page)) {
			var newpage = new FavoriList();
		} else if(window.location.href.match(/\/top\.asp/)) {
			var newpage = new TopFrame();
		}
		
		if(newpage) newpage.main();
	}
}
(new EksiFavori).main();
