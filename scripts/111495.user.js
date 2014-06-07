// ==UserScript==
// @name           kimdir nedir++
// @description    kimdir nedir++
// @version        2.1.2
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://antik.eksisozluk.com/info2.asp*
// ==/UserScript==

var browser = detectBrowser();
var sosyal_knpp_status = false;
var bition_knpp_status = false;
var eksistats_knpp_status = false;
var limon_knpp_status = false;
var bitionapikey = "01001397d7b30a2b1556b3ad1980668601001397d7b30a2b1556b3ad19806686";
var inf_knpp_status = false;
var sosyalmi = false;
var loadingimageurl = "http://i.imgur.com/VkzIw.gif";

var sosyalData = {
		version : "1.0",
		name : "knppoption",
		statusList: [true,true,true,true,true,true,true,true,true,true,true,true,true,false,true,true,true,false,false,false,false,false],
		
		sayfaList : ["sözlükçülerin+facebook+sayfaları",
					 "sözlükçülerin+twitter+sayfaları",
					 "sözlükçülerin+tumblr+sayfaları",
					 "sözlükçülerin+formspring+sayfaları",
					 "sözlükçülerin+last.fm+sayfaları",
					 "sözlükçülerin+google%2B+sayfaları",
					 "sözlükçülerin+deviantart+sayfaları",
					 "sözlükçülerin+myspace+sayfaları",
					 "sözlükçülerin+friendfeed+sayfaları",
					 "sözlükçülerin+blogları",
					 "sözlükçülerin+web+sayfaları",
					 "sözlükçülerin+connected2.me+sayfaları",
					 "sözlükçülerin+soundcloud+sayfaları",
					 "sözlükçülerin+onioning+sayfaları",
					 "sözlükçülerin+about.me+sayfaları",
					 "sözlükçülerin+elestirbeni.com+sayfaları",
					 "sözlükçülerin+flickr+sayfaları",
					 "sözlükçülerin+youtube+sayfaları",
					 "sözlükçülerin+8tracks+sayfaları",
					 "sözlükçülerin+fotokritik+sayfaları",
					 "sözlükçülerin+criticker+sayfaları",
					 "sözlükçülerin+github+sayfaları"],
		
		adresList : ["facebook.com",
					 "twitter.com",
 					 "tumblr.com",
					 "formspring.me",
					 "last",
					 "plus.google.com",
					 "deviantart.com",
					 "myspace.com",
					 "friendfeed.com",
					 "http",
					 "http",
					 "connected2.me",
					 "soundcloud.com",
					 "onioning.com",
					 "about.me",
					 "elestirbeni.com",
					 "flickr.com",
					 "youtube.com",
					 "8tracks.com",
					 "fotokritik.com",
					 "criticker.com",
					 "github.com"],
		
		 titleList : ["facebook'ta",
					 "twitter'da",
 					 "tumblr'da",
					 "formspring'de",
					 "lastfm'de",
					 "google+'ta",
					 "deviantart'ta",
					 "myspace'de",
					 "friendfeed'de",
					 "kişisel blogu",
					 "kişisel web sayfası",
					 "connected2me'de",
					 "soundcloud'da",
					 "onioning'de",
					 "about.me'de",
					 "elestirbeni.com'da",
					 "flickr'da",
					 "youtube'da",
					 "8tracks'te",
					 "fotokritik'te",
					 "criticker'da",
					 "github'da"],
		
		imageList : ["http://i.imgur.com/6mAYq.png",
                  "http://i.imgur.com/VpqK8.png",
                  "http://i.imgur.com/ET3zZ.png",
                  "http://i.imgur.com/h3yUU.png",
                  "http://i.imgur.com/B51ZT.png",
                  "http://i.imgur.com/8HtW2.png",
                  "http://i.imgur.com/qSkiu.png",
                  "http://i.imgur.com/CBYvf.png",
                  "http://i.imgur.com/d1bfA.png",
                  "http://i.imgur.com/ZmW44.png",
                  "http://i.imgur.com/caD1z.png",
                  "http://i.imgur.com/zx7zO.png",
                  "http://i.imgur.com/QFvEZ.png",
                  "http://i.imgur.com/dqZ2c.png",
                  "http://i.imgur.com/XmFVV.png",
                  "http://i.imgur.com/tC2dX.png",
                  "http://i.imgur.com/aoMyC.png",
                  "http://i.imgur.com/PkA3U.png",
                  "http://i.imgur.com/Mi658.png",
                  "http://i.imgur.com/oVsTm.png",
                  "http://i.imgur.com/DrnXE.png",
                  "http://i.imgur.com/BARoU.png"],
		
		 sosyalStatus : false,
		 
		 bitionStatus : false,
		 
		 sourberryStatus : true,
};


//special functions by ntpl - eksi++

 	function detectBrowser() {
        if (navigator.userAgent.match(/firefox/i))
            return "firefox";
        else if (navigator.userAgent.match(/(chrome|opera)/i))
            return "chrome/opera";
        else
            return "unknown";
    }

	function xpath(xpath, element) {
        if (!element)
            element = document;
        return document.evaluate(xpath, element, null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
	
	function EppAPI_setValue(name, value) {
        if (browser == "firefox") {
            GM_setValue(name, value);
        } else if (browser == "chrome/opera") {
            localStorage.setItem(name, value);
        }
    }

    function EppAPI_getValue(name, defval) {
        if (browser == "firefox") {
            return GM_getValue(name, defval);
        } else if (browser == "chrome/opera") {
            var ret = localStorage.getItem(name);
            return ((ret != null)?ret:defval);
        }
    }

    function tumAyarlariKaydet() {
        var ayarlarJson = JSON.stringify(sosyalData);
        EppAPI_setValue(sosyalData.name, ayarlarJson);
    }
    
    function tumAyarlariSifirla() {
        EppAPI_setValue(sosyalData.name, 0);
    }
    
    function tumAyarlariYukle() {
        var ayarlarJson = EppAPI_getValue(sosyalData.name, 0);
        if (ayarlarJson != 0) { 
            var kayitliAyarlar = JSON.parse(ayarlarJson);
            sosyalData = kayitliAyarlar;
            }
        } 
		
		
	//ayar menüsü
	
	function MenuleriEkle() 
	{
		var elemipleft = document.getElementById('ipright');
		var sosyal_knpp_div_display = "none";
		var bition_knpp_div_display = "none";
		var eksistats_knpp_div_display = "none";
		var limon_knpp_div_display = "none";
		var sourberry_knpp_div_display = "none";
		
		if(sosyalData.sosyalStatus) sosyal_knpp_div_display = "block";
		if(sosyalData.bitionStatus) bition_knpp_div_display = "block";
		if(sosyalData.eksistatsStatus) eksistats_knpp_div_display = "block";
		if(sosyalData.limonStatus) limon_knpp_div_display = "block";
		if(sosyalData.sourberryStatus) sourberry_knpp_div_display = "block";
		
		var menuhtml = "<div class='infopane'><div class='highlight infopanehdr' id='sosyal_knpp' onclick=\"return sc('sosyal_knpp_div')\">&nbsp;sosyal paylaşım bağlantıları &nbsp;</div><div class='infocontent' style='display:"+sosyal_knpp_div_display+"' id='sosyal_knpp_div'></div></div><div class='infopane'><div class='highlight infopanehdr' id='bition_knpp' onclick=\"return sc('bition_knpp_div')\">&nbsp;son ek$ibition eserleri &nbsp;</div><div align='center' class='infocontent' style='display:"+bition_knpp_div_display+"' id='bition_knpp_div'></div></div><div class='infopane'><div class='highlight infopanehdr' id='eksistats_knpp' onclick=\"return sc('eksistats_knpp_div')\">&nbsp;ekşistats bilgileri &nbsp;</div><div align='center' class='infocontent' style='display:"+eksistats_knpp_div_display+"' id='eksistats_knpp_div'></div></div><div class='infopane'><div class='highlight infopanehdr' id='limon_knpp' onclick=\"return sc('limon_knpp_div')\">&nbsp;zirve bilgileri (limon) &nbsp;</div><div align='center' class='infocontent' style='display:"+limon_knpp_div_display+"' id='limon_knpp_div'></div></div><div class='infopane'><div class='highlight infopanehdr' id='inf_knpp' onclick=\"return sc('inf_knpp_div')\">&nbsp;kimdir nedir++ ayarları &nbsp;</div><div  class='infocontent' style='display:none' id='inf_knpp_div'></div></div>";
		elemipleft.innerHTML = menuhtml + elemipleft.innerHTML;
		
		var sosyal_knppBt = document.getElementById('sosyal_knpp');
		sosyal_knppBt.addEventListener("click",function() {
						if(!sosyal_knpp_status) {
							kimdirnedirayarla();
						}
														   },true);

		
		var bition_knppBt = document.getElementById('bition_knpp');
		bition_knppBt.addEventListener("click",function() {
						if(!bition_knpp_status) {
							bition();
						}
														   },true);
		var eksistats_knppBt = document.getElementById('eksistats_knpp');
		eksistats_knppBt.addEventListener("click",function() {
						if(!eksistats_knpp_status) {
							eksistats();
						}
														   },true);
		var limon_knppBt = document.getElementById('limon_knpp');
		limon_knppBt.addEventListener("click",function() {
						if(!limon_knpp_status) {
							limon();
						}
														   },true);
		var inf_knppBt = document.getElementById('inf_knpp');
		inf_knppBt.addEventListener("click",function() {
						if(!inf_knpp_status) {
							AyarMenusuDoldur();
							inf_knpp_status = true;
						}
														   },true);
		
	}
	
		
	function AddEventToSosyalAgButtons() {
		for( var i=0; i<sosyalData.sayfaList.length;i++) {
			 var elembutton = document.getElementById('sosyalag_'+i);
			 elembutton.addEventListener("change",function() {
						tumAyarlariYukle();
						sosyalData.statusList[this.value] = this.checked;
						tumAyarlariKaydet();
														   },true);
			}
		
		 var sosyalag_checkall_el = document.getElementById('sosyalag_checkall');
		 sosyalag_checkall_el.addEventListener("click",function() {
								for( var i=0; i<sosyalData.sayfaList.length;i++) {
									 var elembutton = document.getElementById('sosyalag_'+i);
									 tumAyarlariYukle();
									 sosyalData.statusList[i] = true;
									 elembutton.checked = true;
									 tumAyarlariKaydet();
								 }
																},true);
		 var sosyalag_uncheckall_el = document.getElementById('sosyalag_uncheckall');
		 sosyalag_uncheckall_el.addEventListener("click",function() {
								for( var i=0; i<sosyalData.sayfaList.length;i++) {
									 var elembutton = document.getElementById('sosyalag_'+i);
									 tumAyarlariYukle();
									 sosyalData.statusList[i] = false;
									 elembutton.checked = false;
									 tumAyarlariKaydet();
								 }
																},true);
		 var new_add_el = document.getElementById('new_add');
		 new_add_el.addEventListener("click",function() {
														yeniBaslikEkle();		  
																},true);
		}
	
	function yeniBaslikEkle() {
								var new_baslik_el = document.getElementById('new_baslik');
								var new_img_el = document.getElementById('new_img');
								if(new_baslik_el.value != "" && new_img_el.value != "") {
									for( var i=0; i<sosyalData.sayfaList.length;i++) {
											if(sosyalData.sayfaList[i].replace(/\+/gi, " ") == new_baslik_el.value) {
												alert('iyi de bu zaten var!');
												return;
											}
										}
											tumAyarlariYukle();
											sosyalData.statusList.push(true);
											sosyalData.sayfaList.push(new_baslik_el.value);
											sosyalData.adresList.push("http");
											sosyalData.titleList.push("");
											sosyalData.imageList.push(new_img_el.value);
											tumAyarlariKaydet();
											AyarMenusuDoldur(); 
											
									} else {
										
										alert('cık, olmaz, hayır, boş bırakamazsın!');
										}

			
		}
	function AyarMenusuDoldur() {
		var elemipleft = document.getElementById('inf_knpp_div');
		var menuhtml = "<br /><fieldset><legend><b>Genel Ayarlar</b></legend><input type='checkbox' id='sosyalStatusBt' /> sayfa açılır açılmaz sosyal paylaşım bağlantılarını getir. <br /> <br /><input type='checkbox' id='bitionStatusBt' /> sayfa açılır açılmaz ek$ibition eserlerini getir<br /><br /><input type='checkbox' id='eksistatsStatusBt' /> sayfa açılır açılmaz ekşistats bilgilerini getir<br /><br /><input type='checkbox' id='limonStatusBt' /> sayfa açılır açılmaz limon bilgilerini getir<br /><br /><input type='checkbox' id='sourberryStatusBt' /> \"şu anda sourberry'de yayında mı?\" özelliği aktif olsun<br /></fieldset><br /><fieldset><legend><b>Sadece aşağıdaki başlıkları kontrol etsin</b></legend>";
		
		for( var i=0; i<sosyalData.sayfaList.length;i++) 
		{
			menuhtml += "<input type='checkbox' id='sosyalag_" + i +"' value='"+ i +"' />" + 
			decodeURIComponent(sosyalData.sayfaList[i].replace(/\+/gi, " ")) + "<br />";
		}
		menuhtml += "<br /><input class='but' type='button' id='sosyalag_checkall' value='hespsini seç' /> <input class='but' type='button' id='sosyalag_uncheckall' value='hiçbirini seçme' /><br /><br /><fieldset><legend>yeni ekle</legend><table><tr><td width='40%'> kontrol edilecek başlık  </td><td width='60%'><input type='text' id='new_baslik' size='40' /></td></tr><tr><td width='40%'>gösterilecek icon linki (50x50)   </td><td width='60%'><input type='text' id='new_img' size='40' /></td></tr><tr><td><input class='but' type='button' id='new_add' value='ekle bakalım' /></td></tr></table></fieldset></fieldset>";
		elemipleft.innerHTML = menuhtml;
		//başlangıç ayarlarını yapıyoruz
		tumAyarlariYukle();
		//checked ayarlarini yapıyoruz
		for( var i=0; i<sosyalData.sayfaList.length;i++) {
			 var elembutton = document.getElementById('sosyalag_'+i);
			 elembutton.checked = sosyalData.statusList[i];
			}
		
		var sosyalStatusBtElem = document.getElementById('sosyalStatusBt');
		var bitionStatusBtElem = document.getElementById('bitionStatusBt');
		var eksistatsStatusBtElem = document.getElementById('eksistatsStatusBt');
		var limonStatusBtElem = document.getElementById('limonStatusBt');
		var sourberryStatusBtElem = document.getElementById('sourberryStatusBt');
		sosyalStatusBtElem.checked = sosyalData.sosyalStatus;
		bitionStatusBtElem.checked = sosyalData.bitionStatus;
		eksistatsStatusBtElem.checked = sosyalData.eksistatsStatus;
		limonStatusBtElem.checked = sosyalData.limonStatus;
		sourberryStatusBtElem.checked = sosyalData.sourberryStatus;
		
		//event'leri ekliyoruz
		sosyalStatusBtElem.addEventListener("change",function() {
						tumAyarlariYukle();
						sosyalData.sosyalStatus = this.checked;
						tumAyarlariKaydet();
														   },true);

		bitionStatusBtElem.addEventListener("change",function() {
						tumAyarlariYukle();
						sosyalData.bitionStatus = this.checked;
						tumAyarlariKaydet();
														   },true);
		eksistatsStatusBtElem.addEventListener("change",function() {
						tumAyarlariYukle();
						sosyalData.eksistatsStatus = this.checked;
						tumAyarlariKaydet();
														   },true);
		limonStatusBtElem.addEventListener("change",function() {
						tumAyarlariYukle();
						sosyalData.limonStatus = this.checked;
						tumAyarlariKaydet();
														   },true);
		sourberryStatusBtElem.addEventListener("change",function() {
						tumAyarlariYukle();
						sosyalData.sourberryStatus = this.checked;
						tumAyarlariKaydet();
														   },true);
		
		AddEventToSosyalAgButtons();
	}

    
	
	//sosyal ağ bulma fonksiyonları
	function entryGetir(nick,pagetype,pageurl,retparam) {
        var req =  new XMLHttpRequest();
        var result = "";
		var requrl = "http://antik.eksisozluk.com/show.asp?t="+pagetype+"&kw=%40"+nick;
        req.open("GET", requrl, true);
		req.onreadystatechange = function () {
				if(this.readyState == 4) {
						        var tempDom = document.createElement("div");
        tempDom.innerHTML = req.responseText;
        if (!tempDom.getElementsByTagName("ol").length) {
			sosyalpaylasimbutekle(0,retparam);
            return 0;
		}
        var entryler = tempDom.getElementsByTagName("li");
        
        if (entryler.length > 0) {
			for(var i=0;i<entryler.length;i++) {
				var filtreleaul = xpath(".//div[@class='aul']",entryler[i]);
				var filtrelecheckbox = xpath(".//input[@type='checkbox']",entryler[i]);
				
				//gereksiz elementleri kaldiriyoruz.
				if(filtreleaul.snapshotLength > 0) {
					var filtrelea = filtreleaul.snapshotItem(0);
					filtrelea.parentNode.removeChild(filtrelea);
					}
				if(filtrelecheckbox.snapshotLength > 0) {
					var filtrelecheck = filtrelecheckbox.snapshotItem(0);
					filtrelecheck.parentNode.removeChild(filtrelecheck);
					}
				
					var filterbyurl = xpath(".//a[contains(@href,'"+pageurl+"') and @class='url']",entryler[i]);
					
				
				if(filterbyurl.snapshotLength > 0) { //bu entry'de link var mı, varsa geri gönder
					sosyalpaylasimbutekle(filterbyurl.snapshotItem(0),retparam);
					return filterbyurl.snapshotItem(0);
				}
				
				//result = entryler[0].innerHTML;
			}
			sosyalpaylasimbutekle(0,retparam);
			return 0; //hiçbir entry'sinde link paylasmamis.
        } else {
			sosyalpaylasimbutekle(0,retparam);
            return 0;
        }
					}
			};
        req.send(null);
    }
	
	function sosyalpaylasimbutekle(returnval,i) {
			var sosyal_knpp_loading_img_el = document.getElementById('sosyal_knpp_loading_img');
			if(sosyal_knpp_loading_img_el) sosyal_knpp_loading_img_el.parentNode.removeChild(sosyal_knpp_loading_img_el);
			
			if(returnval) { 
						var sosyal_knpp_div = document.getElementById('sosyal_knpp_div');
						var tempbut = document.createElement('a');
						tempbut.innerHTML = "<img height='50px' width='50px' src='"+sosyalData.imageList[i]+"' />";
						tempbut.style.padding = "3px";
						tempbut.target = "_blank";
						tempbut.title = sosyalData.titleList[i];
						tempbut.href = returnval;
						sosyal_knpp_div.appendChild(tempbut);
						sosyalmi = true;
					}
		}
	
	function kimdirnedirayarla() 
	{
		var loading_ekledikmi = false;
		var buttondiv = document.createElement('div');
		var sosyaldiv = document.getElementById('sosyal_knpp_div');
	    sosyaldiv.innerHTML = "<br />";
		var nickfilter = xpath(".//h1[@class='title']/a");
		var nick = nickfilter.snapshotItem(0).innerHTML;
		var returnval = "ss";
		for(var i in sosyalData.sayfaList) {
			if(sosyalData.statusList[i]) {
				if(!loading_ekledikmi) {
					var loadingimg = document.createElement('img');
					loadingimg.id = "sosyal_knpp_loading_img";
					loadingimg.src = loadingimageurl; 
					sosyaldiv.appendChild(loadingimg);
					loading_ekledikmi = true;
				}
				entryGetir(nick,sosyalData.sayfaList[i],sosyalData.adresList[i],i);
			}
		}
		
		//loadingimg.parentNode.removeChild(loadingimg);
		//if(!sosyalmi) sosyaldiv.innerHTML = '<i style="font-size:11px;">bu yazara ait herhangi bir sosyal paylaşım bağlantısı bulunamadı!</i>';
		sosyal_knpp_status = true;
	}
	
	/*bition */

	function bition() 
	{
		var loadingimg = document.createElement('img');
		loadingimg.src = loadingimageurl;
		var bition_knpp_div = document.getElementById('bition_knpp_div');
		bition_knpp_div.appendChild(loadingimg);
		var nickfilter = xpath(".//h1[@class='title']/a");
		var nick = nickfilter.snapshotItem(0).innerHTML;
		var divbition = document.createElement("div");
		var requrl = "http://www.eksibition.org/ara?key="+nick+"&type=user&do=ara&api_key="+bitionapikey;
		
		if(browser == "firefox") {
						GM_xmlhttpRequest({
								method: 'GET',
								url: requrl,
								headers: {
									 "Content-Type": "application/x-www-form-urlencoded"
								},
								onload: function(responseDetails) {
									if(responseDetails.responseText.match(/s.zl.kten gel!/)) //giriş yapmamış
									{
																				//tekrar giriş yaptırıp en başa dönüyoruz.	
										GM_xmlhttpRequest({
												method: 'GET',
												url: "http://antik.eksisozluk.com/sub_etha.asp?name=eksibition",
												headers: {
													 "Content-Type": "application/x-www-form-urlencoded"
														},
												onload: function(responseDetails) {
												bition_knpp_div.innerHTML = '';
												bition(); 
									
											  }
										});
									} else {
										divbition.innerHTML  = responseDetails.responseText;
										var userlist = xpath(".//div[@class='user_list']/span/a",divbition);
										if(userlist.snapshotLength > 0) {
											for(var i=0;i<userlist.snapshotLength;i++) {
												   var firstuser = userlist.snapshotItem(i);
												   if(firstuser.innerHTML == nick) {
														var profilpage = "http://www.eksibition.org/"+firstuser.href.split("/")[3];
														requrl = "http://www.eksibition.org/"+firstuser.href.split("/")[3]+"?api_key="+bitionapikey;	
														GetBitionImages(requrl,profilpage);
														break;
												   }
												}
										} else {
												var profilpageurllist = xpath(".//span[@class='n1']/a[contains(@href,'donuz')]",divbition);
												if(profilpageurllist.snapshotLength > 0) {
													var profilpage= "http://www.eksibition.org/bitionist"+profilpageurllist.snapshotItem(0).href.split("=")[1]+".html";
												} else 
													var profilpage = "http://www.eksibition.org/ben";
												ShowBitionImages(divbition.innerHTML,profilpage);
										}
									} 
								}
							});
			
			}  else if(browser == "chrome/opera") { 
						var reqbition =  new XMLHttpRequest();
						reqbition.open("GET", requrl, true);
						reqbition.onreadystatechange = function () {
							if(this.readyState == 4) {
									if(reqbition.responseText.match(/s.zl.kten gel!/)) {
										//chrome 13.0.781 or later için geçerli - diğer sürümler için sorunlu
										GM_xmlhttpRequest({
															method: 'GET',
															url: "http://antik.eksisozluk.com/sub_etha.asp?name=eksibition",
															headers: {
																 "Content-Type": "application/x-www-form-urlencoded"
																	},
															onload: function(responseDetails) {
															bition_knpp_div.innerHTML = '';
															bition(); 
												
														  }
													});
			
											//alert("ekşibition'a bir kere giriş yapmanız gereklidir");
											//tekrar giriş yaptırıp en başa dönüyoruz.
											//var reqbition2 =  new XMLHttpRequest();
											//reqbition2.open("POST", "http://antik.eksisozluk.com/sub_etha.asp?name=eksibition", false);
											//reqbition2.send(null);
																	//divbition.innerHTML = reqbition.responseText;
											//var userlist = xpath(".//div[@class='user_list']/span/a",divbition);
											//var firstuser = userlist.snapshotItem(0);	
											//bition();
			
									} else {
										divbition.innerHTML = reqbition.responseText;
										var userlist = xpath(".//div[@class='user_list']/span/a",divbition);
										if(userlist.snapshotLength > 0) {
											for(var i=0;i<userlist.snapshotLength;i++) {
												   var firstuser = userlist.snapshotItem(i);
												   if(firstuser.innerHTML == nick) {
														var profilpage = "http://www.eksibition.org/"+firstuser.href.split("/")[3];
														requrl = "http://www.eksibition.org/"+firstuser.href.split("/")[3]+"?api_key="+bitionapikey;	
														GetBitionImages(requrl,profilpage);
														break;
												   }
												}
											}
											else {
												var profilpageurllist = xpath(".//span[@class='n1']/a[contains(@href,'donuz')]",divbition);
												if(profilpageurllist.snapshotLength > 0) {
													var profilpage= "http://www.eksibition.org/bitionist"+profilpageurllist.snapshotItem(0).href.split("=")[1]+".html";
												} else 
													var profilpage = "http://www.eksibition.org/ben";
												ShowBitionImages(divbition.innerHTML,profilpage);
											}
											
										}
								}
							}; 
						reqbition.send(null);
						
		}
		bition_knpp_status = true;
	}


function GetBitionImages(param,profilpage) {
		if(browser == "firefox") {
						GM_xmlhttpRequest({
								method: 'GET',
								url: param,
								headers: {
									 "Content-Type": "application/x-www-form-urlencoded"
								},
								onload: function(responseDetails) {
									ShowBitionImages(responseDetails.responseText,profilpage);
								}
						});
			
			}  else if(browser == "chrome/opera") { 
						var reqbition =  new XMLHttpRequest();
						reqbition.open("GET", param, true);
						reqbition.onreadystatechange = function() {
								if(this.readyState == 4) {
										ShowBitionImages(reqbition.responseText,profilpage);
									}
							};
						reqbition.send(null);
		}
		
		}
	
	//bition özel fonksiyon
	function getParam(param,list) {
	var reg = new RegExp('([^a-zA-Z]' + param + '|^' + param + ')\\s*=\\s*\\[\\s*(((\\[\\[)|(\\]\\])|([^\\]\\[]))*)\\s*\\]');
	var res = reg.exec(list);
	var returnvar;
	if(res)
		return res[2].replace('[[','[').replace(']]',']');
	else
		return '';
}

	function ShowBitionImages(param,personalpageurl) {
			var divshow = document.createElement("div");
			divshow.innerHTML = param;
			var anchorlist = xpath(".//table[@class='thumb']/tbody/tr/td/a",divshow);
			var bition_div = document.getElementById('bition_knpp_div');
			for(var i = 0; i<anchorlist.snapshotLength; i++) {
					anchorlist.snapshotItem(i).href = "http://www.eksibition.com"+anchorlist.snapshotItem(i).href.replace("http://antik.eksisozluk.com","");
					anchorlist.snapshotItem(i).target = "_blank";
					anchorlist.snapshotItem(i).title = getParam('header',anchorlist.snapshotItem(i).title).replace(/<.*?>/g, '')
													 + " - " + getParam('body',anchorlist.snapshotItem(i).title).replace(/<.*?>/g, '');
					anchorlist.snapshotItem(i).style.paddingRight="10px";
					anchorlist.snapshotItem(i).style.paddingBottom="10px";
					
			  }
			
			bition_div.innerHTML = "<br /><a href='"+personalpageurl+"' target='_blank'>Ek$ibition profil sayfasına götür beni --></a><br /><br />";
			var imglist = xpath(".//table[@class='thumb']/tbody/tr/td",divshow);
			for(var i = 0; i<imglist.snapshotLength; i++) {
				bition_div.innerHTML += imglist.snapshotItem(i).innerHTML;
			   }
			   
			 bition_knpp_status = true;
		}
	
	/*limon */
	function limon() 
	{
		var loadingimg = document.createElement('img');
		loadingimg.src = loadingimageurl;
		var limon_knpp_div = document.getElementById('limon_knpp_div');
		limon_knpp_div.appendChild(loadingimg);
		var nickfilter = xpath(".//h1[@class='title']/a");
		var nick = nickfilter.snapshotItem(0).innerHTML;
		var divlimon = document.createElement("div");
		var requrl = "http://limon.6degreesunder.com/ara/?term="+nick+"&x=g";
		
		if(browser == "firefox") {
						GM_xmlhttpRequest({
								method: 'GET',
								url: requrl,
								headers: {
									 "Content-Type": "application/x-www-form-urlencoded"
								},
								onload: function(responseDetails) {
									if(responseDetails.responseText.match(/login olmam/)) //giriş yapmamış
									{
																				//tekrar giriş yaptırıp en başa dönüyoruz.	
										GM_xmlhttpRequest({
												method: 'GET',
												url: "http://antik.eksisozluk.com/sub_etha.asp?name=limon",
												headers: {
													 "Content-Type": "application/x-www-form-urlencoded"
														},
												onload: function(responseDetails) {
												limon_knpp_div.innerHTML = '';
												limon(); 
									
											  }
										});
									} else {
										divlimon.innerHTML  = responseDetails.responseText;
										var tabel = xpath(".//td[@id='tabscontainer']/a[contains(@href,'zirve')]",divlimon);
										if(tabel.snapshotLength > 0) {
												var firstanchor = tabel.snapshotItem(0);
												firstanchor.href = "http://limon.6degreesunder.com"+ firstanchor.href.replace("http://antik.eksisozluk.com","");
												requrl = firstanchor.href;
												GetLimonData(requrl);
											    
										}
									} 
								}
							});
			
			}  else if(browser == "chrome/opera") { 
						var reqbition =  new XMLHttpRequest();
						reqbition.open("GET", requrl, true);
						reqbition.onreadystatechange = function () {
							if(this.readyState == 4) {
									if(reqbition.responseText.match(/login olmam/)) {
										//chrome 13.0.781 or later için geçerli - diğer sürümler için sorunlu
										GM_xmlhttpRequest({
															method: 'GET',
															url: "http://antik.eksisozluk.com/sub_etha.asp?name=limon",
															headers: {
																 "Content-Type": "application/x-www-form-urlencoded"
																	},
															onload: function(responseDetails) {
															limon_knpp_div.innerHTML = '';
															limon(); 
												
														  }
													});
			
											//alert("ekşibition'a bir kere giriş yapmanız gereklidir");
											//tekrar giriş yaptırıp en başa dönüyoruz.
											//var reqbition2 =  new XMLHttpRequest();
											//reqbition2.open("POST", "http://antik.eksisozluk.com/sub_etha.asp?name=eksibition", false);
											//reqbition2.send(null);
																	//divbition.innerHTML = reqbition.responseText;
											//var userlist = xpath(".//div[@class='user_list']/span/a",divbition);
											//var firstuser = userlist.snapshotItem(0);	
											//bition();
			
									} else {
										divlimon.innerHTML = reqbition.responseText;
										var tabel = xpath(".//td[@id='tabscontainer']/a[contains(@href,'zirve')]",divlimon);
										if(tabel.snapshotLength > 0) {
												var firstanchor = tabel.snapshotItem(0);
												firstanchor.href = "http://limon.6degreesunder.com"+ firstanchor.href.replace("http://antik.eksisozluk.com","");
												requrl = firstanchor.href;
												GetLimonData(requrl); 
										}
										}
								}
							}; 
						reqbition.send(null);
						
		}
		
		limon_knpp_status = true;
	}
	
	function GetLimonData(param) {
			if(browser == "firefox") {
						GM_xmlhttpRequest({
								method: 'GET',
								url: param,
								headers: {
									 "Content-Type": "application/x-www-form-urlencoded"
								},
								onload: function(responseDetails) {
									ShowLimonData(responseDetails.responseText,param);
								}
						});
			
			}  else if(browser == "chrome/opera") { 
						var reqbition =  new XMLHttpRequest();
						reqbition.open("GET", param, true);
						reqbition.onreadystatechange = function() {
								if(this.readyState == 4) {
										ShowLimonData(reqbition.responseText,param);
									}
							};
						reqbition.send(null);
		}

		} 
	
	function ShowLimonData(param,url) {
			var limontemp = document.createElement("div");
			limontemp.innerHTML = param;
			var limondiv = document.getElementById('limon_knpp_div');
			
			var tablelist = xpath(".//div[@id='entry-body-div']/table[2]",limontemp);
			if(tablelist.snapshotLength > 0) {
					var tableel = tablelist.snapshotItem(0);
					var anchorlist = tableel.getElementsByTagName('a');
					for(var i = 0;i<anchorlist.length;i++){
						   anchorlist[i].target = "_blank";
						   anchorlist[i].href = "http://limon.6degreesunder.com"+ anchorlist[i].href.replace("http://antik.eksisozluk.com","");
						}
					limondiv.innerHTML = "";
					limondiv.appendChild(tableel);
				}
		}
	
	
	/*eksistats*/
	function eksistats() {
			var loadingimg = document.createElement('img');
			var eksistatsdiv = document.getElementById('eksistats_knpp_div');
			loadingimg.id = "eksistats_knpp_loading_img";
			loadingimg.src = loadingimageurl; 
			eksistatsdiv.appendChild(loadingimg);
			var nickfilter = xpath(".//h1[@class='title']/a");
			var nick = nickfilter.snapshotItem(0).innerHTML;
			var requrl = "http://www.eksistats.com/index.php?page=tek&nick="+nick;
			if(browser == "firefox") {
						GM_xmlhttpRequest({
								method: 'GET',
								url: requrl,
								headers: {
									 "Content-Type": "application/x-www-form-urlencoded"
								},
								onload: function(responseDetails) {
								
								if(responseDetails.responseText.match(/sadece yazarlara/)) //giriş yapmamış
									{
										//tekrar giriş yaptırıp en başa dönüyoruz.	
										GM_xmlhttpRequest({
												method: 'GET',
												url: "http://antik.eksisozluk.com/sub_etha.asp?name=eksistats",
												headers: {
													 "Content-Type": "application/x-www-form-urlencoded"
														},
												onload: function(responseDetails) {
												eksistatsdiv.innerHTML = '';
												eksistats(); 
											  }
										});
									}
								else {
									ShowEksistatsData(responseDetails.responseText,nick);
									}
								}
						});
			
			}  else if(browser == "chrome/opera") { 
						var reqbition =  new XMLHttpRequest();
						reqbition.open("GET", requrl, true);
						reqbition.onreadystatechange = function() {
							if(this.readyState == 4) {
							
								if(reqbition.responseText.match(/sadece yazarlara/)) {
										//chrome 13.0.781 or later için geçerli - diğer sürümler için sorunlu
										GM_xmlhttpRequest({
															method: 'GET',
															url: "http://antik.eksisozluk.com/sub_etha.asp?name=eksistats",
															headers: {
																 "Content-Type": "application/x-www-form-urlencoded"
																	},
															onload: function(responseDetails) {
															eksistatsdiv.innerHTML = '';
															eksistats(); 
												
														  }
													});
		
									} else {
										ShowEksistatsData(reqbition.responseText,nick);
									}
							}
						};
						reqbition.send(null);
			}

			eksistats_knpp_status = true;
		}
		
		function ShowEksistatsData(p_data,nick) {
			var tempdiv = document.createElement("div");
			var eksistats_knpp_div = document.getElementById('eksistats_knpp_div');
			tempdiv.innerHTML = p_data;
			var trlist = xpath(".//table[@id='kimneplus']",tempdiv);
			var resulttable = trlist.snapshotItem(0);
			var anchorlist = resulttable.getElementsByTagName("a");
			for(var i=0;i<anchorlist.length;i++) {
					anchorlist[i].target = "_blank";
					anchorlist[i].href = "http://www.eksistats.com"+ anchorlist[i].href.replace("http://antik.eksisozluk.com","");
				}
				if(anchorlist.length > 0) 
					nesilekle(anchorlist[0].innerHTML);	
				
				
			var tdlist = resulttable.getElementsByTagName("td");
			for(var i=0;i<tdlist.length;i++){
					tdlist[i].style.color = "";
				}
			
			eksistats_knpp_div.innerHTML = "<br /><a href='http://www.eksistats.com/index.php?page=tek&nick="+nick+"' target='_blank'>Ekşistats profil sayfasına götür beni --></a><br /><br />";
			eksistats_knpp_div.appendChild(resulttable);
			eksistats_knpp_div.innerHTML += "<br /><iframe width='100%' height='200' src='http://www.eksistats.com/karma_puanik.php?nick="+nick+"'></iframe>";
			}
			
	function nesilekle(nesil) {
		if(nesil != "N/A") {
			var badgeparent = document.getElementById('ipleft').parentNode;
			var badgea = document.createElement('a');
			badgea.className = "badge";
			badgea.href = "show.asp?t="+nesil+"%2E nesil yazar";
			badgea.innerHTML = nesil + ". nesil";
			var tableel = xpath(".//table",badgeparent);
			if(tableel.snapshotLength > 0) {
					var insertel = tableel.snapshotItem(0);
					insertel.parentNode.insertBefore(badgea,insertel);
				}
			}
				
		}
	function sourberry() {
			var requrl = "http://api.sourberry.org/status?format=json";
			if(browser == "firefox") {
						GM_xmlhttpRequest({
								method: 'GET',
								url: requrl,
								headers: {
									 "Content-Type": "application/x-www-form-urlencoded"
								},
								onload: function(responseDetails) {
									var sourjson = JSON.parse(responseDetails.responseText);
									SourberryOnlineControl(sourjson);
									}
						});
			
			}  else if(browser == "chrome/opera") { 
						var reqsourberry =  new XMLHttpRequest();
						reqsourberry.open("GET", requrl, true);
						reqsourberry.onreadystatechange = function() {
							if(this.readyState == 4) {
									var sourjson = JSON.parse(reqsourberry.responseText);
									SourberryOnlineControl(sourjson);
							}
						};
						reqsourberry.send(null);
			}
		}	
		
		function SourberryOnlineControl(sourjson) {
			var nickfilter = xpath(".//h1[@class='title']/a");
			var nick = nickfilter.snapshotItem(0).innerHTML;
			if(sourjson.djs) {
			for(var i =0;i<sourjson.djs.length;i++) {
					if(sourjson.djs[i].name == nick) {
							var badgeparent = document.getElementById('ipleft').parentNode;
							var badgea = document.createElement('a');
							badgea.className = "badge";
							badgea.href = "http://www.sourberry.org/onair";
							badgea.target = "_blank";
							badgea.title = "dinlemek için tıklayın";
							badgea.innerHTML = "şu anda sourberry'de yayında";
							var tableel = xpath(".//table",badgeparent);
							if(tableel.snapshotLength > 0) {
									var insertel = tableel.snapshotItem(0);
									insertel.parentNode.insertBefore(badgea,insertel);
							}
						} 
				}
			}
			}
	
	
	/*burda basliyor hersey*/
	tumAyarlariYukle();
	MenuleriEkle();
	AyarMenusuDoldur();
	
	if(sosyalData.sourberryStatus) sourberry();
	if(sosyalData.sosyalStatus) kimdirnedirayarla();
	if(sosyalData.bitionStatus) bition();
	if(sosyalData.eksistatsStatus) eksistats();
	if(sosyalData.limonStatus) limon();
	
	tumAyarlariKaydet();
	//bition();
	