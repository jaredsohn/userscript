// ==UserScript==
// @name           Index fórum
// @description    Index fórumok modositasara
// @version        0.2.7
// @author         serenic
// @include        http://forum.index.hu/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.1/jquery-ui.min.js
// @resource       jqueryuicss http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.1/themes/ui-lightness/jquery-ui.css
// ==/UserScript==

// Ez a szoftver GNU licensz alatt szabadon terjeszthető, módosítható. Információk: serenic@gmail.com

var igen = true, ok = true, rendben = true, van = true, nem = false, nincs = false,

// ------------- A következő változók értékét szabadon változtathatod: 

atalakitasElrejtese = nem, // Ha beállítjuk, akkor a fórum letöltése és átrendezése a "színfalak" mögött megy végbe, ha nem-re állítjuk, akkor pedig esetenként az eredeti fórum is megjelenhet 
betoltesKepernyo = nem, // Ha értéke igen vagy ok, rendben, van, akkor az oldalak újratöltésénél eltűnik a fórum, csak a betöltés felirat látszik

trolList = [ "troll1", "troll2", "troll3", "troll4", "troll5" ],
// A trollistában szereplő nickek hozzászólásai teljesen eltűnnek

ignoreList = [ "nick1", "nick2", "nick3", "nick4", "nick5" ],
// Az ignore listában szereplő nickek hozzászólásai helyén csak egy tájékoztató szöveg lesz

ellensegek = [ "ellenseg1", "ellenseg2", "ellenseg3" ],
// Az ellenségek listában szereplő nickek hozzászólásait megjelöli

baratok = [ "barat1", "barat2", "barat3", "barat4", "barat5" ],
// A barátok listában szereplő nickek hozzászólásait kiemeli

baratokKeretszin = "red",
baratokKeretstilus = "dotted", // Lehetséges értékek: "none",  "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"
baratokKeretvastagsag = "3px", // Mértékegységek: "px" - pixel, "pt" - point, "pc" - pica

trollszuro = van, // Ha értéke igen, ok, rendben vagy van, akkor szűri a trollokat, ha nem vagy nincs, akkor nem
ignoralas = van, // Ha értéke igen, ok, rendben vagy van, akkor ignorálja a listában lévőket, ha nem vagy nincs, akkor nem
ellensegszuro = van, // Ha értéke igen, ok, rendben vagy van, akkor megjelöli az ellenségeket, ha nem vagy nincs, akkor nem
baratokjelzes = igen, // Ha értéke igen, ok, rendben vagy van, akkor kiemeli a barátokat, ha nem vagy nincs, akkor nem
ignoreSzoveg = "moderálva", // Ez jelenik meg az ignorált hozzászólás helyén

szin_1 = "#FEF2C8", // A "twin" és "serenic" kinézetek egyik színe
szin_2 = "#FFE2A2", // A "twin" és "serenic" kinézetek másik színe
fejlecszin = "#fecd81", // A "serenic" kinézet fejléc színe
hatterszin = "#FFFFDD", // A "twin", "serenic" és színkódos kinézetek háttérszíne
megjelenes = "serenic", // Lehetséges nevek: "index" (Az eredeti index színharmónia), "twin", "serenic", v.milyen szín név (pld. "lightgreen") vagy v.milyen színkód (pl. "#FFCC99")

figyelmeztetoSzoveg = "Az én index fórumom :-)",
figyelmeztetesStilus = 'style="margin-top: 3px; margin-bottom: 3px; background: #990000; text-align: center; color: white; font-size: 12pt; font-weight: bold; font-family: Arial, Helvetica, sans-serif"',

csupaszIndex = igen, // Ha értéke igen, ok, rendben vagy van, akkor az index fórumok kinézetéből kiveszi a felesleges dolgokat, ha nem vagy nincs, akkor nem
loginBoxAthelyezes = igen, // Ha értéke igen, ok, rendben vagy van, akkor a bejelentkező formot átrakja a jobb oldalra. 
// Ha a csupaszIndex be van állítva, akkor enélkül a bejelentkező doboz eltűnik. 
ujKeresoAthelyezes = igen, // ugyanúgy értelmezendő, mint a loginBoxAthelyezes
regiKeresoAthelyezes = igen, // ugyanúgy értelmezendő, mint a loginBoxAthelyezes
kedvencekAthelyezes = igen, // ugyanúgy értelmezendő, mint a loginBoxAthelyezes

hozzaszolasStilus = "sereinput", // A hozzászólás mező kinézete. Lehetséges értékek: "sereinput", "index" (ez ez eredeti)

rangokMegjelenitese = van, // Ha értéke igen, ok, rendben vagy van, akkor a nicknevek mellett a rangok is kijelzésre kerülnek
rangok_hszam = [ 10, 500, 2000, 5000, 10000, 20000, 40000, 80000, 150000, 300000, 500000, 1000000 ], // Az egyes rangokat mennyi hozzászólásra emelje meg 
rangok_jel = [ "új felhasználó", "kezdő fórumozó", "*", "**", "***", "****", "5*", "6*", "7*", "8*", "9*", "10*", "11*" ], // Az egyes rangok elnevezései
maxRangBeolvasas = 30, // maximum hány user adatlapját nézze át egy betöltésnél? Fontos biztonsági szelep, hogy ne dolgozza túl magát a böngésző

hosszuSzovegekKezelese = van, // Ha értéke igen, ok, rendben vagy van, akkor a nagyon hosszú szövegeket megvágjuk.
hosszuSzoveg = 2000, // Hány karakter felett nyilvánítsuk hosszú szövegnek a hozzászólást.
maxSor = 20, // Hány sor felett legyen ugyancsak hosszú szövegnek nyilvánítva?

elozmenyekMegjelenitese = igen, // Ha értéke igen, ok, rendben vagy van, akkor az előzmények megjelennek külön is az egyes hozzászólásoknál
elozmenyekForma = "hozzászólásban", // Értéke lehet: "hozzászólásban" vagy "ablakban". Csak akkor érdekes, ha az elozmenyekMegjelenitese értéke igen, ok, rendben vagy van
elozmenyekStilus = "background-color: none; color: #777; border-style: dashed; border-color: #777; border-width: 1px; font-size: 10px; padding: 10px",
elozmenyekAblakStilus = "", // fejlesztés alatt!
elozmenyekSzoveg = "Erre válaszol: ",
elozmenyekbenMultimedia = nem, // Ha igen, akkor megjelennek az előzményekben is a videók, képek. Ha nem, akkor csak egy link jelenik meg helyettük. Alapértelmezés: nem.
maxElozmenySzam = 100, // Mennyi előzményt jelenítsen meg maximálisan? Ha túl magas ez a szám, akkor a böngészőt túlzott munkára késztethetjük, ami nem várt jelenségeket idézhet elő

videoBeagyazas = igen, // A youtube videólinkek helyére betegye-e magát a videót?
maxVideo = 5, // Biztonsági szelep, hogy a böngésző ne dolgozza túl magát
hibasLinkekJavitasa = igen, // A csak sima szövegként szereplő webcímeket linkké alakítsa?

figyelhetoTopicok = igen, // Meg lehessen-e jelölni figyelhető topikokat?
felugroAblakValtozaskor = nem, // Figyelmeztessen-e, ha történt változás?

legyenMenu = igen, // legyen-e bal oldali menü?
menuSzelesseg = 190, // a bal menü szélessége pixelben
elozmenyekMaxSzama = 100, // Hány előzményt őrizzen meg? Ha ez 0, akkor letiltjuk az előzmények kiírását.

autoMentes = igen, // Szerkesztésnél legyen-e automatikus mentés?
mentesValtozatokSzama = 60, // Maximum hány változatot őrizzen meg? Mivel esetenkén apróbb változások is mentésre kerülhetnek, nem érdemes túl kis számot megadni

elonezet = "automatikus", /* Szerkesztésnél az előnézet ablak viselkedése. Lehetséges értékek: "automatikus" - a program dönti el, mikor jelenjen meg,
							"mindig" - állandóan látszik, "soha" - egyáltalán nem látszik, de egy kattintással ekkor is előhozható  */

szintaxis = "bbcode", // lehetséges értékek: bbcode (vagy bb, bbkod) - azaz csak egyfajta, de természetesen ez bővülni fog

taroltAdatokTorlese = nem; // Ha be van állítva, törli az eddig tárolt adatokat a böngészőből.
// --------------------------------------------------------------------------------------------------
// Innentől kezdve NE MÓDOSITSD!

var firstH1 = $("h1:first");
if (firstH1 != undefined)
	if (firstH1.text().indexOf("500") > -1 || firstH1.text().indexOf("Service Temporarily Unavailable") > -1) {
		document.body.innerHTML = '<h1>Újratöltöm, kis türelmet...</h1>';
		location.reload();
	} // end if

if (legyenMenu && location.href == "http://forum.index.hu/Topic/showTopicList")
	window.location = "http://forum.index.hu/Topic/showTopicList?t=9111312";

if (atalakitasElrejtese) {
	$(function() {
		$("a[href*='showArticle'], a[href*='showTopicList']").click(function(event) {
			event.preventDefault();
			if (window.name != "elotolto") {
				$("body").append('<iframe id="elotolto" name="elotolto"></iframe>');
				$("#elotolto").css({'width': '0', 'height': '0'});
				$("#elotolto").attr('src', $(this).attr('href'));
				$("#elotolto").load(function() {
					var elotolto = $("#elotolto").get(0);
		//			document.body.innerHTML = elotolto.contentWindow.document.body.innerHTML;
				});
			} // end if
			if (betoltesKepernyo) {
				$("body").append('<div id="loaderScreen"><span style="font-size: 16pt">Index fórum</span><br /><br />Betöltés...</div>');
				$("#loaderScreen").css({'position': 'absolute', 'width': '100%', 'height': '100%', 'left': '0', 'top': '0', 'z-index': '9999', 'background-color': '#E0E0FF', 'text-align': 'center', 'color': '#A0A0A0', 'padding-top': '100px'});
			} // end if
		});
	});
}
	
function getMousePos(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
// idióta egy dolog, de működik...
} // end function

var	firstColor, secondColor, backColor, skin, alert_, alertStyle, inputTextSkin, mouseX, mouseY, mBoxes, msgHContents, msgHContents2, msgHeaders,
	msgHInforms, msgCBoxes, msgContBoxes, msgFooters, toc, tocElements1, tocElements2, userNames, userCodes, savedTexts, actualTextIndex,
	hozzaszolasok, elozmenyek, multimediaTags, figyeltTopicok, betoltottTopicok, legutobbiLatogatasok, olvasottTopicok, rightcolId, activeMenu,
	tagLista_bb, tagLista_textile, tagLista_texy, tagLista_serenic, noAutoSave, indapass;

function _init() {
	firstColor = szin_1; secondColor = szin_2; backColor = hatterszin; skin = megjelenes; alert_ = figyelmeztetoSzoveg; alertStyle = figyelmeztetesStilus;
	inputTextSkin = hozzaszolasStilus;
	document.addEventListener('mousemove',getMousePos,true);
	mBoxes = $(".art"); msgHContents = $(".art_h_l"); msgHContents2 = $(".art_h_m"); msgHeaders = $(".art_h"); msgHInforms = $(".art_h_r");	rightcolId = "#rightcol";
	msgCBoxes = $(".art_b"); msgContBoxes = $(".art_b"); msgFooters = $(".art_f"); toc = $("#content1col");	tocElements1 = $(".tl_elem_0");	tocElements2 = $(".tl_elem_1");
	userNames = [];	userCodes = [];	hozzaszolasok = [];	elozmenyek = []; multimediaTags = ["object", "img"]; figyeltTopicok = []; betoltottTopicok = [];
	legutobbiLatogatasok = [];	olvasottTopicok = []; savedTexts = [];
	alertText = document.createElement("div");
	alertText.innerHTML = '<div ' + alertStyle +'><p>' + alert_ + '</p></div';
	document.body.insertBefore(alertText, document.body.firstChild);
	activeMenu = -1; noAutoSave = false;
	indapass = eval(GM_getValue('indapass', '[]')); 
} // end function

// insert jquery-ui css
var jquicss = GM_getResourceText("jqueryuicss");
var absImgPath = "http://jquery-ui.googlecode.com/svn/tags/1.7/themes/ui-lightness/images/";
var r = new RegExp("images/", "g");
jquicss = jquicss.replace(r, absImgPath);
$("head").append('<style type="text/css">\n' + jquicss + '</style>');

$("head").append('<style type="text/css">div.color_picker {\n\
  height: 16px;\n\
  width: 24px;\n\
  padding: 0;\n\
  vertical-align: middle;\n\
  -moz-border-radius: 3px;\n\
  -webkit-border-radius: 3px;\n\
  border: 1px solid #ccc;\n\
  cursor: pointer;\n\
//  line-height: 16px;\n\
	z-index: 9999; \n\
}\n\
\n\
div#color_selector {\n\
  width: 245px;\n\
  position: absolute;\n\
  border: 1px solid #598FEF;\n\
  background-color: #EFEFEF;\n\
  padding: 2px;\n\
	z-index: 9999; \n\
}\n\
  div#color_custom {width: 100%; float:left }\n\
  div#color_custom label {font-size: 95%; color: #2F2F2F; margin: 5px 2px; width: 25%}\n\
  div#color_custom input {margin: 5px 2px; padding: 0; font-size: 95%; border: 1px solid #000; width: 65%; }\n\
\n\
div.color_swatch {\n\
  height: 12px;\n\
  width: 12px;\n\
  border: 1px solid #000;\n\
  margin: 1px;\n\
  float: left;\n\
  cursor: pointer;\n\
  line-height: 12px;\n\
	z-index: 9999; \n\
}</style>');

/**
 * Really Simple Color Picker in jQuery
 * 
 * Copyright (c) 2008 Lakshan Perera (www.laktek.com)
 * Licensed under the MIT (MIT-LICENSE.txt)  licenses.
 * 
 */

var colorPickerNum;
 
(function($){
  var p_id, pickerType;
  $.fn.colorPicker = function(p_id_, pickerType_){
	p_id = p_id_;
	pickerType = pickerType_;
    if(this.length > 0) buildSelector();
    return this.each(function(i) { buildPicker(this)}); 
  };
  
  var selectorOwner;
  var selectorShowing = false;
  
  buildPicker = function(element){
    //build color picker
	if (pickerType == 'div') {
		control = $("<div id='" + p_id + "' class='color_picker'>&nbsp;</div>");
    	control.css('background-color', $(element).val());
	} 
	if (pickerType == 'button')
		control = $("<button type='button' id='" + p_id + "'><span style='color:red; font-style: bold;'>a</span><span style='color:green; font-style: bold;'>a</span><span style='color:blue; font-style: bold;'>a</span></button>");
    
    //bind click event to color picker
    control.bind("click", toggleSelector);
    
    //add the color picker section
    $(element).after(control);
    
    //hide the input box
    $(element).hide();
  };
  
  buildSelector = function(){
    selector = $("<div id='color_selector'></div>");

     //add color pallete
     $.each($.fn.colorPicker.defaultColors, function(i){
      swatch = $("<div class='color_swatch'>&nbsp;</div>")
      swatch.css("background-color", "#" + this);
      swatch.bind("click", function(e){ changeColor($(this).css("background-color")); });
      swatch.bind("mouseover", function(e){ 
        $(this).css("border-color", "#598FEF"); 
        $("input#color_value").val(toHex($(this).css("background-color")));    
        }); 
      swatch.bind("mouseout", function(e){ 
        $(this).css("border-color", "#000");
        $("input#color_value").val(toHex($(selectorOwner).css("background-color")));
        });
      
     swatch.appendTo(selector);
     });
  
     //add HEX value field
     hex_field = $("<label for='color_value'>Hex</label><input type='text' size='8' id='color_value'/>");
     hex_field.bind("keydown", function(event){
      if(event.keyCode == 13) {changeColor($(this).val());}
      if(event.keyCode == 27) {toggleSelector()}
     });
     
     $("<div id='color_custom'></div>").append(hex_field).appendTo(selector);

     $("body").append(selector); 
     selector.hide();

  };
  
  checkMouse = function(event){
    //check the click was on selector itself or on selectorOwner
    var selector = "div#color_selector";
    var selectorParent = $(event.target).parents(selector).length;
    if(event.target == $(selector)[0] || event.target == selectorOwner || selectorParent > 0) return
    
    hideSelector();   
  }
  
  hideSelector = function(){
    var selector = $("div#color_selector");
    
    $(document).unbind("mousedown", checkMouse);
    selector.hide();
    selectorShowing = false
  }
  
  showSelector = function(){
    var selector = $("div#color_selector");
    
    //alert($(selectorOwner).offset().top);
    
    selector.css({
      top: $(selectorOwner).offset().top + ($(selectorOwner).outerHeight()),
      left: $(selectorOwner).offset().left
    }); 
    hexColor = $(selectorOwner).prev("input").val();
    $("input#color_value").val(hexColor);
    selector.show();
    
    //bind close event handler
    $(document).bind("mousedown", checkMouse);
    selectorShowing = true 
   }
  
  toggleSelector = function(event){
    selectorOwner = this; 
    selectorShowing ? hideSelector() : showSelector();
  }
  
  changeColor = function(value){
    if(selectedValue = toHex(value)){
	  if (pickerType == 'div')
		  $(selectorOwner).css("background-color", selectedValue);
      //$(selectorOwner).prev("input").val(selectedValue).change();

      //close the selector
      hideSelector();
	  if (colorPickerNum == 0) { // Szerkesztéshez
		formaz('textarea_obj', 'color:' + selectedValue.replace("#", ""), '/color');
		createPreview();		  
	  }
    }
  };
  
  //converts RGB string to HEX - inspired by http://code.google.com/p/jquery-color-utils
  toHex = function(color){
    //valid HEX code is entered
    if(color.match(/[0-9a-fA-F]{3}$/) || color.match(/[0-9a-fA-F]{6}$/)){
      color = (color.charAt(0) == "#") ? color : ("#" + color);
    }
    //rgb color value is entered (by selecting a swatch)
    else if(color.match(/^rgb\(([0-9]|[1-9][0-9]|[1][0-9]{2}|[2][0-4][0-9]|[2][5][0-5]),[ ]{0,1}([0-9]|[1-9][0-9]|[1][0-9]{2}|[2][0-4][0-9]|[2][5][0-5]),[ ]{0,1}([0-9]|[1-9][0-9]|[1][0-9]{2}|[2][0-4][0-9]|[2][5][0-5])\)$/)){
      var c = ([parseInt(RegExp.$1),parseInt(RegExp.$2),parseInt(RegExp.$3)]);
      
      var pad = function(str){
            if(str.length < 2){
              for(var i = 0,len = 2 - str.length ; i<len ; i++){
                str = '0'+str;
              }
            }
            return str;
      }

      if(c.length == 3){
        var r = pad(c[0].toString(16)),g = pad(c[1].toString(16)),b= pad(c[2].toString(16));
        color = '#' + r + g + b;
      }
    }
    else color = false;
    
    return color
  }

  
  //public methods
  $.fn.colorPicker.addColors = function(colorArray){
    $.fn.colorPicker.defaultColors = $.fn.colorPicker.defaultColors.concat(colorArray);
  };
  
  $.fn.colorPicker.defaultColors = 
	[ '190707','2a0a0a','3b0b0b','610b0b','8a0808','b40404','df0101','ff0000','fe2e2e','fa5858','f78181','f5a9a9','f6cece','f8e0e0','fbefef','191007','2a1b0a','3b240b','61380b','8a4b08','b45f04','df7401','ff8000','fe9a2e','faac58','f7be81','f5d0a9','f6e3ce','f8ece0','fbf5ef','181907','292a0a','393b0b','5e610b','868a08','aeb404','d7df01','ffff00','f7fe2e','f4fa58','f3f781','f2f5a9','f5f6ce','f7f8e0','fbfbef','101907','1b2a0a','243b0b','38610b','4b8a08','5fb404','74df00','80ff00','9afe2e','acfa58','bef781','d0f5a9','e3f6ce','ecf8e0','f5fbef','071907','0a2a0a','0b3b0b','0b610b','088a08','04b404','01df01','00ff00','2efe2e','58fa58','81f781','a9f5a9','cef6ce','e0f8e0','effbef','071910','0a2a1b','0b3b24','0b6138','088a4b','04b45f','01df74','00ff80','2efe9a','58faac','81f7be','a9f5d0','cef6e3','e0f8ec','effbf5','071918','0a2a29','0b3b39','0b615e','088a85','04b4ae','01dfd7','00ffff','2efef7','58faf4','81f7f3','a9f5f2','cef6f5','e0f8f7','effbfb','071019','0a1b2a','0b243b','0b3861','084b8a','045fb4','0174df','0080ff','2e9afe','58acfa','81bef7','a9d0f5','cee3f6','e0ecf8','eff5fb','070719','0a0a2a','0b0b3b','0b0b61','08088a','0404b4','0101df','0000ff','2e2efe','5858fa','8181f7','a9a9f5','cecef6','e0e0f8','efeffb','100719','1b0a2a','240b3b','380b61','4b088a','5f04b4','7401df','8000ff','9a2efe','ac58fa','be81f7','d0a9f5','e3cef6','ece0f8','f5effb','190718','2a0a29','3b0b39','610b5e','8a0886','b404ae','df01d7','ff00ff','fe2ef7','fa58f4','f781f3','f5a9f2','f6cef5','f8e0f7','fbeffb','190710','2a0a1b','3b0b24','610b38','8a084b','b4045f','df0174','ff0080','fe2e9a','fa58ac','f781be','f5a9d0','f6cee3','f8e0ec','fbeff5','000000','0b0b0b','151515','1c1c1c','2e2e2e','424242','585858','6e6e6e','848484','a4a4a4','bdbdbd','d8d8d8','e6e6e6','f2f2f2','ffffff' ];
  
})(jQuery);

function messageContent(messageHeaderContent) {
	return $(messageHeaderContent).parent().next().children().children().children();
} // end function

function messageContentBox(messageHeaderContent) {
	return $(messageHeaderContent).parent().next().children();
} // end function

function getLinksFromText(text, kezdPos, vegPos, tipus) {
	text = text.substring(kezdPos, vegPos);
	pc1 = text.split('<a href="');
	pc1.splice(0, 1);
	for (var i=0; i<pc1.length; i++) {
		pc1[i] = pc1[i].replace('/Topic/showTopicList?t=', '');
		pc1[i] = pc1[i].replace('"><strong>','¤');
		pc1[i] = pc1[i].replace('</span></li><li class="hi">', '');
		pc1[i] = pc1[i].replace('</span></li><li class="lo">', '');
		if (tipus == 0) {
			pc1[i] = pc1[i].replace('</strong></a><br /><span class="small"><b>', '¤');
			pc1[i] = pc1[i].replace('</strong></a><br /><span class="small">', '¤');
			pc1[i] = pc1[i].replace('</b>, ', '¤');
		} // end if
		if (tipus == 1) {
			pc1[i] = pc1[i].replace('</strong></a><br /><span class="small">', '¤');
		} // end if		
		if (i == pc1.length-1)
			pc1[i] = pc1[i].substring(0, pc1[i].indexOf('</span>'));
	} // end for
	return pc1;
} // end function

function getFriss_and_Porgos() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://forum.index.hu/Topic/showTopicList',
		onload: function(responseDetails) {	
			var htmlText = responseDetails.responseText;
			var poz1_1 = htmlText.indexOf('id="friss"');
			var poz1_2 = htmlText.indexOf('id="hot"');
			frissLinkek = []; porgosLinkek = [];
			if (activeMenu == 1)
				frissLinkek = getLinksFromText(htmlText, poz1_1, poz1_2, 0);
			htmlText = htmlText.substring(poz1_2);
			if (activeMenu == 2)	
				porgosLinkek = getLinksFromText(htmlText, 0, htmlText.indexOf('</ul>'), 1);
			htmlText = '';
			for (var i=0; i<frissLinkek.length; i++) {
				linkReszek = frissLinkek[i].split('¤');
				if (linkReszek[3] == undefined) {
					linkReszek.push(linkReszek[2].substring(linkReszek[2].length-5));
					linkReszek[2] = linkReszek[2].substring(0, linkReszek[2].length-7);
				}
				htmlText = htmlText + '<li class="slider"><a class="menulink" style="text-decoration: none; border-bottom-style: none" title="Hol: ' + linkReszek[2] + ', Utolsó frissítés: ' + linkReszek[3] + '-kor" href="http://forum.index.hu/Topic/showTopicList?t=' + linkReszek[0] + '">' + linkReszek[1] + '</a></li>\n';
			} // end for
			if (frissLinkek.length > 0)
				$("#leftslider div").eq(2).next().html(htmlText);
			htmlText = '';
			for (var i=0; i<porgosLinkek.length; i++) {
				linkReszek = porgosLinkek[i].split('¤');
				if (linkReszek[3] == undefined) {
					linkReszek.push(linkReszek[2].substring(linkReszek[2].length-5));
					linkReszek[2] = linkReszek[2].substring(0, linkReszek[2].length-7);
				}
				if (linkReszek[2].indexOf('<b>') > -1)
					linkReszek[2] = linkReszek[2].replace('<b>', '');
				if (linkReszek[2].indexOf('</b>') > -1)
					linkReszek[2] = linkReszek[2].replace('</b>', '');
				htmlText = htmlText + '<li class="slider"><a class="menulink" style="text-decoration: none; border-bottom-style: none" title="Hol: ' + linkReszek[2] + ', Utolsó frissítés: ' + linkReszek[3] + '-kor" href="http://forum.index.hu/Topic/showTopicList?t=' + linkReszek[0] + '">' + linkReszek[1] + '</a></li>\n';
			} // end for
			if (porgosLinkek.length > 0)
				$("#leftslider div").eq(3).next().html(htmlText);
		} // onload
	}); // ajax-get
} // end function

function leftSlider() {
	$("head").append('<style type="text/css">\n\
	div.slider {\n\
		border-style: solid;\n\
		border-width: 1px; \n\
		border-top-color: white;\n\
		border-left-color: brown;\n\
		border-right-color: brown;\n\
		border-bottom-color: brown;\n\
		cursor: pointer;\n\
		padding: 5px;\n\
		margin: 0;\n\
		background: ' + secondColor + ';\n\
	}\n\
	ul.slider {\n\
		border-style: solid;\n\
		border-top-width: 0; \n\
		border-bottom-width: 1px; \n\
		border-left-width: 1px; \n\
		border-right-width: 1px; \n\
		border-left-color: brown;\n\
		border-right-color: brown;\n\
		border-bottom-color: brown;\n\
		text-indent: 0;\n\
		text-decoration: none;\n\
		list-style: none;\n\
		cursor: pointer;\n\
		text-align: left;\n\
		margin: 0;\n\
		padding: 0;\n\
		line-height: 25px;\n\
		background: ' + firstColor + ';\n\
		overflow-x: hidden;\n\
		overflow-y: auto;\n\
	}\n\
	#closing, #closing_right {\n\
		background: none;\n\
		cursor: pointer;\n\
		border-style: none;\n\
	}\n\
	.menulink {\n\
		display: list-item;\n\
		text-decoration: none;\n\
		border-bottom-style: none;\n\
		padding-left: 5px;\n\
		width: 100%;\n\
		white-space: nowrap;\n\
		font-size: 12px;\n\
	}\n\
	link.menulink:hover {\n\
		text-decoration: none;\n\
		border-bottom-style: none;\n\
	}\n\
	li.slider:hover {\n\
		background: ' + secondColor + ';\n\
		text-decoration: none;\n\
		border-bottom-style: none;\n\
	}\n\
	</style>');
	$("#leftcoltd").html('<div id="leftslider"><div id="closingButton" style="border-bottom-style: solid; border-bottom-width: 1px; border-bottom-color: brown; text-align: right"><span style="font-weight: bold; font-size: 14px">Menü</span><input id="closing" style="margin-right: -10px" type="button" value="<<" /></div></div>');
	$("#leftslider").show();
	$("#leftslider").css('width', menuSzelesseg + 'px').css('visibility', 'hidden');
	$("#leftslider").append('<div class="slider">Előzményeim</div><ul class="slider" style="max-height: 300px"><li>.üres</li></ul>\n\
	<div class="slider">Legfrissebbek</div><ul class="slider"><li>.betöltés...</li></ul>\n\
	<div class="slider">Legpörgősebbek</div><ul class="slider"><li>.betöltés...</li></ul>\n\
	<div class="slider">Általános társalgás</div>\n\
	<ul class="slider"><li>A Törzsasztal&1&Az első és legnagyobb a fórumok között, ezzel kezdődött a mi kis történelmünk, minden más ebből nőtte ki magát</li>\n\
	<li>Index kávéház&47&Laza duma, csettelés, vagy amit akartok - az index alig moderált fóruma azoknak, akik inkább könnyed csevegésre vágynak mintsem arra, hogy témáról témára megváltsák a világot</li>\n\
	<li>iNteRNeTTo&53&Itt nem ajánlatos politizálás!</li>\n\
	<li>Iskolák, évszámok, horoszkópok&31&Jé, te is...?</li>\n\
	<li>Metakazamata&55&A tömegkultúrától és tömegizléstől való elhatárolódás kísérlete - extrém tartalmak és formák keresése</li>\n\
	<li>Moderáció&9111367&Moderációs topicok</li>\n\
	<li>Társalgási klubcsoport&9120049&Klubfórumok, melyekbe csak tagok írhatnak</li></ul>\n\
	<div class="slider">Életmód</div><ul class="slider">\n\
	<li>Velvet&57&Csevegés divatról és mindenfélékről csajoknak, de hapsiknak is</li>\n\
	<li>Babaszobák&9169755&Találkozóhely kisebb-nagyobb gyerekek összetartó anyukáinak, apukáinak</li>\n\
	<li>Celeb&9131998&Magyar hírességek topikjai a Velvet celebhatározójában</li>\n\
	<li>Életmód klubcsoport&9120231&A nyílt jelentkezések és a Szexi képek topikjai fórum kivételével olyan topicok, melyek kívülről olvashatók, de ott csak klubtagok írhatnak</li>\n\
	<li>Házasélet, családi élet&9111339&Házasság, család, örömök és gondok</li>\n\
	<li>Házépítés, lakásügyek&52&Új és régi otthonok, vásárlás és eladás, hitelek és törlesztések</li>\n\
	<li>HUSZ - Vigalmi Negyed&9134200&A népszerű Hölgyek, urak, szex kísérleti alfóruma: Hölgyek, urak, cset! Belefáradtál a szexbe? Ha azt hallod hogy fakanál, akkor nem az jut először az eszedbe, hogy miért nem magyarul mondja? Gyere, beszéljük meg!</li>\n\
	<li>Hölgyek, urak, szex&19&Nők, férfiak, szex, szerelem, udvarlás, ismerkedés, érzelemek, történetek, kalandok, hihetetlen és hihető esetek</li>\n\
	<li>Konyhaasztal&39&Főzőcske, még okosabban</li>\n\
	<li>Moderáció&9111324&Életmód móderációs topicok</li>\n\
	<li>Szülői munkaközösség&44&A nagysikerű Hölgyek, urak, szex folytatása! A teherbe esés után hőseinkre új kalandok várnak...</li>\n\
	<li>Társasházak, lakóparkok&9169757&Te is ott laksz?</li></ul>\n\
	<div class="slider">Filosz</div><ul class="slider">\n\
	<li>Alternatív elméletek&9148227&A hivatalostól eltérő - elsősorban - történelmi és nyelvészeti kérdések fóruma</li>\n\
	<li>Klubfórumok&9121860&A FILOSZ-klubok gyűjtőfóruma</li>\n\
	<li>Magyarulez&15&Nyelvről, nyelvészetről emberközelben Simonyi Zsigmond, Gombocz Zoltán, Pais Dezső, Antal László, Papp Ferenc nyomdokain</li>\n\
	<li>Moderáció&9111330&FILOSZ moderációs fórum</li>\n\
	<li>Nyelvtudor&9112599&Idegennyelvek, tanulás, gyakorlás, használat</li>\n\
	<li>Rejtélyes dolgok&9113446&A tudomány határvidékei, rejtélyek, legendák, alternatív kutatók</li>\n\
	<li>Tudomány&26&Mi a tudomány? A tudomány - fórum!</li>\n\
	<li>Történelem&9111340&Agyalgás a múltról</li>\n\
	<li>Új fizika&9173831&Fizika az új elméletek tükrében</li>\n\
	<li>Vallás, Filozófia&6&Hit, remény, szeretet. Érvek, vélemények ezeréves kérdésekről, aktuális problémákról.</li>\n\
	</ul>\n\
	<div class="slider">Gazdaság, üzlet, karrier</div><ul class="slider">\n\
	<li>Bank&9111828&Bankok, pénzintézetek, hitelek</li>\n\
	<li>Karrier, munka&58&Karrier, munka topicok</li>\n\
	<li>Moderáció&9111350&A gazdaság, munka topicok moderációja</li>\n\
	<li>Tőzsde, befektetés, adó&32&Tőzsde, befektetés, adó, kisebb-nagyobb cég- és egyéni gondok</li></ul>\n\
	<div class="slider">Hobbi, szabadidő</div><ul class="slider">\n\
	<li>Utazás&48&Utazók és utazni vágyók fóruma</li>\n\
	<li>Állati!&45&Házikedvenceinkről fajra, nemre, lábak számára való tekintet nélkül</li>\n\
	<li>Gamez&7&Tippek és tanácsok, súgások és csalások. Vérbeli játékos természetesen csak friss hírekért és tapasztalatokért jár ide.</li>\n\
	<li>Kertészet&17&Sárgul a muskátlija? Kopottas a gyepszőnyege? Aki tud, segít, tanácsot ad, elmondja tapasztalatait</li>\n\
	<li>Klubfórumok&9157692&Hobbi, szabadidő klubfórumok</li>\n\
	<li>Kreatív és technikai hobbik&9128487&Kreatív és technikai hobbik fóruma, modellezés, makettezés, művészi hobbik, festés, meg még sok minden más.</li>\n\
	<li>Moderáció&9111359&Hobbi, szabadidő moderációs topicjai</li>\n\
	<li>Törzsasztal-játékok&30&Virtuális játékok a fórumban, asszociáljunk és egyéb formabontó műfajok</li></ul>\n\
	<div class="slider">Index szerkesztőség</div><ul class="slider">\n\
	<li>Online interjúk&29&Vendégek a fórumban, akikre kíváncsiak vagyunk, akikre haragszunk, akiktől most kérdezhetünk, akikkel vitatkozhatunk. Politikusok, zenészek, színészek, playboy-sztárok és tsaik.</li>\n\
	<li>T. szerk!&9&Írja meg, hogy mit gondol rólunk. Minden ötletet, javaslatot örömmel várunk. A szerkesztők néha még be is néznek ide.</li></ul>\n\
	<div class="slider">Kultúra</div><ul class="slider">\n\
	<li>Cinematrix&9119072&Mozi</li>\n\
	<li>Kultúra&2&Ha ihlete van, írja ki magából! Írjon kritikát, dicsérjen-szidjon, a szalonban minden vélemény szent.</li>\n\
	<li>Irodalom&9111820&Könyvekről, irodalomról</li>\n\
	<li>Klubfórumok&9122489&A Kultúra-klubok gyűjtőfóruma</li>\n\
	<li>Moderáció&9111364&Kultúra moderációs topicok</li>\n\
	<li>Pepsi Sziget&28&Európa legnagyobb és legszínesebb fesztiválja, idén is ott leszünk!</li>\n\
	<li>Sci-fi és Fantasy&9119072&Mozi</li>\n\
	<li>Színház&9111515&Színház az egész világ</li>\n\
	<li>TV és Rádió&60&Mindent (vagy semmit) a televíziókról, rádiókról, müsorokról</li>\n\
	<li>Zene&9111347&Zene, zenészek, zenekarok</li></ul>\n\
	<div class="slider">Közlekedés</div><ul class="slider">\n\
	<li>TotalCar - autó-motor&24&Járgányok és úrvezetők, féltengelyek, téli gumik, nosztalgia és futurisztika</li>\n\
	<li>Hajók, búvárok, hidroplánok&9148502&Minden ami vízen, víz alatt vagy éppen ideiglenesen a víz fölött közlekedik. Ja, és persze, még a tengerelattjárók is...:-)</li>\n\
	<li>Kerékpáros fórum&9111344&Kerékpár, bicikli, bringa, bike</li>\n\
	<li>Közlekedési Klubfórumok&9116244&ZÁRT klubfórumok a közlekedés témakörében</li>\n\
	<li>Lóerő Klub&56& </li>\n\
	<li>Moderáció&9111365&A közlekedés fórumok moderációja</li>\n\
	<li>Tömegközlekedés&9111341&Mindannyian utazunk</li>\n\
	<li>Utak, hidak, műtárgyak&9165949&Amin közlekedünk és kapcsolt részei - kivéve amivel közlekedünk</li>\n\
	<li>Vasutas fórum&9111343&A vasút, a vasutasok és a vasútbarátok fóruma</li></ul>\n\
	<div class="slider">Politika, közélet</div><ul class="slider">\n\
	<li>A Polidili&3&Igazi PoliDili, festői aknákkal és remekbeszabott ágyútűzzel - csak elszántaknak!</li>\n\
	<li>Klubfórumok&9121750&A politikához kapcsolódó klubok gyűjtőfóruma</li>\n\
	<li>Moderáció&9111337&A politika, közélet moderációs topicjai</li></ul>\n\
	<div class="slider">Regionális közösségek</div><ul class="slider">\n\
	<li>Amerika&9111807&Amerika, amerikaiak, magyarok Amerikában</li>\n\
	<li>Bajai régió&25&Egy város, amely felfedezte magát a Törzsasztalban</li>\n\
	<li>Balaton&9112038&Mindenki Balatonja</li>\n\
	<li>Budapest részben és egészben&9111401&Kerületek és városrészek, helyek és témák a Nagyfaluval kapcsolatban</li>\n\
	<li>Duna TV&9129001&A külföldön is fogható magyar tévé</li>\n\
	<li>Erdély&9112039& </li>\n\
	<li>Érdiek fóruma&9118198&Önálló fórum érdiek számára</li>\n\
	<li>Hírös&42&Kecskemét és vidéke...</li>\n\
	<li>Index Kelet&23&Az Index-Kelet a Kelet-magyarországi régió (első sorban Szabolcs-Szatmár-Bereg megye) internetes újsága</li>\n\
	<li>Magyarok külföldön&9112040&Magyarok a nagyvilágban</li>\n\
	<li>Mijo Baja Klubja&9111348&Zárt klub Muity Mijo vendégei számára, Bajával és a Bajai Régióval kapcsolatos kérdések megbeszélésére</li>\n\
	<li>Moderáció&9111369&A regionális közösségek moderációs topicjai</li>\n\
	<li>Regionális klubok&9186755&Regionális klubok, belépés előtt tájékozódj!</li>\n\
	<li>Regionális topikok&9111755&Regionális topikok vegyesen, idővel bármelyik fórummá fejlődhet</li>\n\
	<li>Sopronnet&49&Sopron és vidéke</li>\n\
	<li>Szolnoki fórum&5000& </li></ul>\n\
	<div class="slider">S.O.S. fórumcsoport</div><ul class="slider">\n\
	<li>Egészségügyi fórumok&9122900&Egészségügyi probléma van? Kérdezzen!</li>\n\
	<li>Egyéb problémák&9122908&Attól, hogy nem egészségügyi vagy jogi a probléma, még jól jöhet néhány tanács! Akár panaszkönyv helyett is: kiszolgálgatott a szoltáltatónak vagy csak simán átverték? Fojtott szitkok és panaszáradat - írja le itt, hogy mi a hiba!</li>\n\
	<li>Jogi problémák&9122907&Ha nem SZTK, akkor PTK! A BTK már komolyabb műfaj, de lehet kérdezni Munkajogtól a TB-ig bármiről. Alkotmányjog csak ínyenceknek!</li>\n\
	<li>Moderáció&9122985&Az S.O.S. fórumok moderációja</li></ul>\n\
	<div class="slider">Sport</div><ul class="slider">\n\
	<li>Drukkerkocsma&33&A sportrovat focifóruma. Sportszeru szurkolás és barátságos poharazgatás, moderátori felügyelet mellett.</li>\n\
	<li>Egyéb csapatsportok&9118048&Különböző csapat-sportágak</li>\n\
	<li>Egyéni sportágak&9118045&Sportok, sportolók, bajnokságok, versenyek</li>\n\
	<li>Jégkorong és műkorcsolya&9118043&Jégkorong csapatok, jétékosok, műkorcsolyázók</li>\n\
	<li>Kézilabda&9118041&Kézilabda csapatok és játékosok</li>\n\
	<li>Kispad&9118049&Sporttal és nem csak sporttal kapcsolatos beszélgetések, viták</li>\n\
	<li>Klubtopicok fóruma - Sport&9123088&Gyűjtőfórum a sport témájú klubtopicoknak</li>\n\
	<li>Kosárlabda&9118042&Kosárlabda csapatok és játékosok</li>\n\
	<li>Moderáció&9111368&A sport fórumok moderációs topicjai</li>\n\
	<li>NBA&10&Az amerikai profi kosárlabdabajnokság nemhivatalos fóruma</li>\n\
	<li>Olimpia&34&Olimpiai esélyleső, döntők utáni bosszankodó</li>\n\
	<li>Technikai sportok&9118047& </li>\n\
	<li>Téli sportok&9118046& </li>\n\
	<li>Vízilabda&9118044&Mindent a vízilabdáról</li></ul>\n\
	<div class="slider">Technika és használata</div><ul class="slider">\n\
	<li>Audioland&61&A hifi, a mid-fi és a high-end országa</li>\n\
	<li>Béta&21&Az index fórum technikai homokozója</li>\n\
	<li>Fegyverek, emberek, félelmek&43&Minden, ami a fegyverekkel kapcsolatosan megvitatható</li>\n\
	<li>Fotó-videó&46&Fotózásról, videózásról mindent: digitális, analóg, fényképezők, filmek, albumok, képek, kiállítások, pályázatok, és még sok egyéb, kattints ide!</li>\n\
	<li>GPS, PDA, térképszoftverek, egyéb bigyók&9147505&GPS, PDA, térképszoftverek és egyéb bigyók topikjainak fóruma</li>\n\
	<li>Honlap&9111827&Honlapok, honlapkészítés, web-design</li>\n\
	<li>Internet&9111345&Netezés, szolgáltatók és szolgáltatások, problémák, kérdések, tanácsok és javaslatok</li>\n\
	<li>Klubfórumok - Technika&9116696&A Technika fórumcsoport klubtopicjainak gyűjtőhelye</li>\n\
	<li>Matáv és vezetékes telefónia&9112042&Mindannyiunk MaTávja, mindannyiunk ezernyi gondja, baja a telefonálással és internetezéssel</li>\n\
	<li>MIDI&14&Aki kérdez: bárki. Aki válaszol: szintén bárki.</li>\n\
	<li>Mobil telefónia&9111346&Szolgáltatók és kiszolgált(atott)ak, készülékek, tippek és történetek</li>\n\
	<li>Moderáció&9111366&A technikai fórumok moderációja</li>\n\
	<li>MP3&16&Zene a hálón</li>\n\
	<li>Rádiók és elektronikák&9173043&Minden ami nem műsor hanem igazi, azaz nem fogható hanem megfogható: alapvetően gyantaszagú és felvillanyozott kis bigyókból áll. Fejlesztők, készítők, javítók, buherálók és használók fóruma.</li>\n\
	<li>Számítástechnika&9119849&Számítógépek, operációs rendszerek, programok</li>\n\
	<li>TV és házimozi, CD és DVD lejátszó&9111624&TV és Környéke Fülműves Szövetkezet. Azaz cuccok, használat, problémák, tapasztalatok</li></ul>\n\
	');
	$("#leftslider li").each(function(i, lista_elem) {
		szovegElemek = $(lista_elem).text().split('&');
		leiras = ' * ' + szovegElemek[2];
		if (!szovegElemek[2])
			leiras = '';
		if ($(lista_elem).text() != ".üres" && $(lista_elem).text() != ".betöltés...")
			$(lista_elem).html('<a class="menulink" style="text-decoration: none; border-bottom-style: none" title="' + szovegElemek[0] + leiras + '" href="http://forum.index.hu/Topic/showTopicList?t=' + szovegElemek[1] + '">' + szovegElemek[0] + '</a>');
	});
	getFriss_and_Porgos();
	$("#leftslider li").addClass("slider");
	$("#leftslider").css('margin-left', GM_getValue('menuMargin', 0)+'px');
	if ($("#leftslider").css('margin-left').replace('px', '')*1 != 0) {
		$("#closing").attr('value', '>>');
	}
	$("div.slider").each(function(i, element) {
		$(element).attr('id', String(i));
	});
	$("#leftslider > ul").slideUp(0);
	activeMenu = GM_getValue('activeMenu', -1);
	if (activeMenu > -1)
		$("#leftslider > ul").eq(activeMenu).slideDown(0);
	$("#closing").click(function() {
		if ($("#leftslider").css('margin-left').replace('px', '')*1 == 0) {
			var minuszMargo = (parseInt($("#leftslider").css('width').replace('px'))-5)*-1;
			$("#leftslider").animate({ marginLeft: String(minuszMargo) + 'px'}, 1000);
			$("#closing").attr('value', '>>');
			GM_setValue('menuMargin', minuszMargo);
		}
		else {
			$("#leftslider").animate({ marginLeft: '0px'}, 1000);
			$("#closing").attr('value', '<< ');	
			GM_setValue('menuMargin', 0);
		} // end if
	});
	$("div.slider").click(function(e) {
		var clo = $(e.target);
		if (activeMenu == -1) {
			clo.next("ul").slideDown('slow');
			activeMenu = clo.attr('id')*1;
		}
		else {
			if (clo.attr('id')*1 != activeMenu) {
				$("#leftslider > ul").eq(activeMenu).slideUp('slow');
				activeMenu = clo.attr('id')*1;
			}
			else {
				activeMenu = -1;
			} // end if
			clo.next("ul").slideToggle('slow');
		} // end if
		GM_setValue('activeMenu', activeMenu);
		if (activeMenu == 1 || activeMenu == 2) {
			if ($(this).next().text() == ".betöltés...")
				getFriss_and_Porgos();
		} // end if
	});
	$("#leftslider").css('visibility', 'visible');
} // end function

function rightSlider() {
	$("#maintable").before('<div id="closingButtonRight" style="text-align: right"><input id="closing_right" type="button" value="Elrejt" /></div>');
	if (!GM_getValue('jobbOszlopLathato', true)) {
		$(rightcolId).slideUp(0);
		$("#closing_right").attr('value', 'Megjelenít');
	} // end if
	$("#closing_right").click(function() {
		$(rightcolId).slideToggle('slow');
		if ($("#closing_right").attr('value') == 'Elrejt') {
			$("#closing_right").attr('value', 'Megjelenít');
			GM_setValue('jobbOszlopLathato', false);
		}
		else {
			$("#closing_right").attr('value', 'Elrejt');
			GM_setValue('jobbOszlopLathato', true);
		} // end if
	});
} // end function

function setSkin(skinName) {
switch (skinName) {
case "index":
	break;
case "twin":
	var color;
	mBoxes.each(function(i, element) {
		color = firstColor;
		if (i%2 == 0)
			color = secondColor;
		$(element).css('backgound-color', color);
		$(element).css('border-color', color);
	});
	msgHeaders.each(function(i, element) {
		color = firstColor;
		if (i%2 == 0)
			color = secondColor;
		$(element).css('background', color);
	});
	msgContBoxes.each(function(i, element) {
		color = firstColor;
		if (i%2 == 0)
			color = secondColor;
		$(element).css('background', color);
	});
	break;
case "serenic":
	var color;
	mBoxes.each(function(i, element) {
		color = firstColor;
		if (i%2 == 0)
			color = secondColor;
		$(element).css('backgound-color', color);
		$(element).css('border-color', color);
	}).css({'-moz-border-radius': '15px', '-webkit-border-radius': '15px', '-moz-border-radius-bottomleft': '0', '-webkit-border-bottom-left-radius': '0', '-moz-border-radius-bottomright': '0', '-webkit-border-bottom-right-radius': '0'});
	$(".art_h_l").css('background', fejlecszin).css({'-moz-border-radius-topleft': '15px', '-webkit-border-top-left-radius': '15px'});
	$(".art_h_m").css('background', fejlecszin).css({'-moz-border-radius': '0', '-webkit-border-radius': '0'});
	$(".art_h_r").css('background', fejlecszin).css({'-moz-border-radius-topright': '15px', '-webkit-border-top-right-radius': '15px'});
	msgHeaders.css({'-moz-border-radius': '15px', '-webkit-border-radius': '15px'});
	msgContBoxes.each(function(i, element) {
		color = firstColor;
		if (i%2 == 0)
			color = secondColor;
		$(element).css('background', color);
	});
	msgFooters.each(function(i, element) {
		color = firstColor;
		if (i%2 == 0)
			color = secondColor;
		$(element).css('background', color);
	});
	tocElements1.each(function(i, element) {
		$(element).css('background', firstColor);
	});
	tocElements2.each(function(i, element) {
		$(element).css('background', secondColor);
	});
	$("head").append('<style type="text/css"> \n\
	a { \n\
		text-decoration: none; \n\
		border-bottom-style: dashed; \n\
		border-bottom-width: 1px; \n\
		color: #813816; \n\
	} \n\
	a:link:hover, #content1col a:link:hover { \n\
		color: #6373FF; \n\
		border-bottom-style: solid; \n\
	} \n\
	a:visited:hover, #content1col a:visited:hover { \n\
		color: #6373FF; \n\
		border-bottom-style: solid; \n\
	} \n\
	a:visited { \n\
		color: #813816; \n\
	} \n\
	a:link { \n\
		color: #813816; \n\
	} \n\
	.art_h_l a, .art_h_r a, .art_f a, .navilinks a, #rightcol a, #content1col a { \n\
		border-bottom-style: none; \n\
	} \n\
	.tl_elem_0 a:visited, .tl_elem_1 a:visited { \n\
		text-decoration: underline; \n\
	} \n\
	#controls a, #controls a:hover, #controls a:link:hover, #controls a:visited:hover { \n\
		text-decoration: none; \n\
		border-bottom-style: none; \n\
	} \n\
	</style>');
	break;
default:
	msgHeaders.css('background', skinName);
	msgBoxes.css('border-color', skinName);
} // end switch
} // end function

// Kigyűjti a user neveket és a user számokat az oldalról
function getUsers() {
	var username, usercode;
	var unique;	
	for (var i=0; i<msgHContents.length; i++) {
		username = msgHContents[i].innerHTML.split('"')[4];
		username = username.replace("<strong>", "");
		username = username.replace("</strong></a>", "");
		username = username.replace(">", "");
		unique = true;
		for (var j=0; j<userNames.length; j++) {
			if (userNames[j] == username)
				unique = false;
		} // end for
		if (unique) {
			userNames[userNames.length] = username;
			usercode = msgHContents[i].innerHTML.split('"')[3];
			usercode = usercode.replace("/User/UserDescription?u=", "");
			userCodes[userCodes.length] = usercode;
		} // end if
	} // end for
} // end function

_init();

switch (inputTextSkin) {
case "sereinput":
	$("head").append(' <style type="text/css"> \n\
  \n\
textarea { \n\
    background-color : #e6e6fa; \n\
    border-bottom-color : #3346f2; \n\
    border-bottom-style : dotted; \n\
    border-left-color : #3346f2; \n\
    border-left-style : dotted; \n\
    border-right-color : #3346f2; \n\
    border-right-style : dotted; \n\
    border-top-color : #3346f2; \n\
    border-top-style : dotted; \n\
    cursor : text; \n\
    font-family : sans-serif; \n\
    font-size : 10pt; \n\
    padding-bottom : 3px; \n\
    padding-left : 3px; \n\
    padding-right : 3px; \n\
    padding-top : 5px; \n\
    width : auto; \n\
	float: left; \n\
  } \n\
#textarea_obj {\n\
	width: 500px;\n\
	margin: 10px;\n\
  } \n\
</style>');
	break;
} // end switch

var viewArticle = location.href.indexOf("viewArticle") > -1;
var registration = location.href.indexOf("Registration") > -1;
var selectorPage = location.href.indexOf("Selector") > -1;
var searchPage = location.href.indexOf("Search") > -1;

if (!viewArticle && !registration && !selectorPage && !searchPage && $("div#wait").length == 0) {
	if (loginBoxAthelyezes || legyenMenu) {
		$(".passbox:first").appendTo(rightcolId).css('width', 'auto');
		$("form[name='loginboxform']").prepend('<div id="logintitle" style="padding: 10px"><span style="font-size: 14px; font-weight: bold">Bejelentkezés</span></div>');
		$(".first").remove();
		$("userselector:first").css('width', 'auto');
		$(".darkbox:first").appendTo(rightcolId).find("select").css('width', 'auto');
		$(".passbox").css('background', firstColor);
	} // end if
	
	if (kedvencekAthelyezes)
		$("#favourite_box").appendTo(rightcolId).css('width', 'auto');
	
	if (ujKeresoAthelyezes || legyenMenu) {
		$("#inda_forumkereso").appendTo(rightcolId).addClass("fs_boxform_login");
		$(".fs_field").css('width', String($(rightcolId).css('width').replace('px','')*1-20) + 'px');
	} // end if
	
	if (regiKeresoAthelyezes || legyenMenu) {
		$(".normalbox:first").appendTo(rightcolId).addClass("normalbox");
		$("input:text").css('width', String($(rightcolId).css('width').replace('px','')*1-20) + 'px');
		$(".boxform").find('select').css('width', String($(rightcolId).css('width').replace('px','')*1-20) + 'px');
		$(".pass-inp").css('width', $(".pass-inpText:first").css('width'));
	} // end if
} // end if not viewArticle

// keymediás reklám eltávolítása
$(function() {
$(document).find("script").filter(function() {
	if ($(this).attr('src'))
		return $(this).attr('src').indexOf('keymedia.hu') > -1;
	else
		return false;
}).remove();
$(document).find("iframe").filter(function() {
	return $(this).attr('name') != 'inda_header' && $(this).attr('id') != 'preview' && $(this).attr('id') != 'elotolto';
}).remove();
});

// adocean eltávolítása
$(function() {
$(document).find("script").filter(function() {
	return $(this).text().indexOf('ado.master') > -1;
}).remove();
});

if (csupaszIndex && !viewArticle && !registration && !selectorPage) {
	$("#site_header").remove();
	$("#header").remove();
	if (!legyenMenu)
		$("#leftcol").remove();	
} // end if

if (!viewArticle)
	rightSlider();

if (legyenMenu && !viewArticle && !registration && !selectorPage && !searchPage && $("div#wait").length == 0) {
	$("a[href='/']").attr('href','http://forum.index.hu/Topic/showTopicList?t=1');
	leftSlider();
} // end if

function getTopicNumberFromUrl(url) {
	var tn = new RegExp('^[0-9]*');
	if (url.indexOf('showArticle') > -1)
		return tn.exec(url.replace("http://forum.index.hu/Article/showArticle?t=", ""));
	else
		return false;
} // end function

if (taroltAdatokTorlese) {
	GM_deleteValue('figyeltTopicok');
	GM_deleteValue('topicLatogatas');
	GM_deleteValue('betoltottTopicok');
	GM_deleteValue('olvasottTopicok');
	GM_deleteValue('menuMargin');
	GM_deleteValue('jobbOszlopLathato');
	GM_deleteValue('savedTexts');
	alert("Tárolt adatok törölve!");
} // end if

var topicNumber = getTopicNumberFromUrl(String(location.href));

// olvasottTopicok beállítása
olvasottTopicok = eval(GM_getValue('olvasottTopicok', '[]'));
if (location.href.indexOf("showArticle") > -1) {
	var topicName = $("#navilast > a").text();
	var latogatasSzam = 0; 
	if (olvasottTopicok.length == 0) {
		olvasottTopicok.push(topicNumber + '¤' + String(latogatasSzam + 1) + '¤' + topicName);
	}
	else {
		// megnézzük, szerepel-e már a listában
		var szerepel = -1;
		for (var i=0; i<olvasottTopicok.length; i++) {
			if (olvasottTopicok[i].split('¤')[0] == topicNumber) {
				latogatasSzam = olvasottTopicok[i].split('¤')[1]*1 + 1;
				olvasottTopicok[i] = topicNumber + '¤' + String(latogatasSzam) + '¤' + topicName;
				szerepel = i;
			} // end if
		}  // end for
		if (szerepel == -1) {
			latogatasSzam = latogatasSzam + 1;
			if (olvasottTopicok.length >= elozmenyekMaxSzama) {
				var torlendoPoz = -1;
				var minLatogatas = olvasottTopicok[olvasottTopicok.length-1].split('¤')[1]*1;
				for (var i=0; i<olvasottTopicok.length; i++) {
					if (torlendoPoz == -1) {
						if (olvasottTopicok[i].split('¤')[1]*1 == minLatogatas) {
							torlendoPoz = i;
						} // end if
					} // end if
				} // end for
				if (torlendoPoz > -1)
					olvasottTopicok.splice(torlendoPoz, 1);
			} // end if
			olvasottTopicok.push(topicNumber + '¤' + String(latogatasSzam) + '¤' + topicName);
		} 
		else {
			// pozíció beállítása
			var nagyobb = true; 
			var pozicio = szerepel;
			while (nagyobb) {
				pozicio = pozicio - 1;
				if (pozicio < 0) {
					nagyobb = false;
				} 
				else {
					if (latogatasSzam < olvasottTopicok[pozicio].split('¤')[1]*1)
						nagyobb = false;
				} // end if		
			} // end while
			pozicio = pozicio + 1;
			if (pozicio != szerepel) {
				var tempArray = [];
				for (var j=0; j<pozicio; j++)
						tempArray.push(olvasottTopicok[j]);
				tempArray.push(olvasottTopicok[szerepel]);
				for (var j=pozicio; j<olvasottTopicok.length; j++)
					if (j != szerepel)
						tempArray.push(olvasottTopicok[j]);
				olvasottTopicok = tempArray;
			} // end if	
		} // end if
	} // end if
	GM_setValue('olvasottTopicok', uneval(olvasottTopicok));
} // end if
var listaText = '';
var topicReszek;
if (elozmenyekMaxSzama > 0) {
	for (var i=0; i<olvasottTopicok.length; i++) {
		var topicReszek = olvasottTopicok[i].split('¤')
		listaText = listaText + '<li class="slider">' + '<a class="menulink" title="Látogatások száma: ' + topicReszek[1] + '" style="text-decoration: none; border-bottom-style: none" href="http://forum.index.hu/Article/showArticle?t=' + topicReszek[0] + '">' + topicReszek[2] + '</a></li>\n';
	} // end for
	$("#leftslider div").eq(1).next().html(listaText);
} // end if

if (figyelhetoTopicok) {
	figyeltTopicok = eval(GM_getValue('figyeltTopicok', '[]')); 
	legutobbiLatogatasok = eval(GM_getValue('topicLatogatas', '[]')); 
	betoltottTopicok = eval(GM_getValue('betoltottTopicok', '[]'));
	var cimsor = $("#navilast");
	if (cimsor && topicNumber) {
		var figyelt = false;
		for (var i=0; i<figyeltTopicok.length; i++)
			if (topicNumber*1 == figyeltTopicok[i]*1) {
				figyelt = true;
				var most = new Date();
				legutobbiLatogatasok[i] = most.getTime();
				GM_setValue('topicLatogatas', uneval(legutobbiLatogatasok));
				for (var j=0; j<betoltottTopicok.length; j++) {
					if (topicNumber == betoltottTopicok[j].split('&')[0]) {
						betoltottTopicok.splice(j,1);
						GM_setValue('betoltottTopicok', uneval(betoltottTopicok));
					} // end if
				} // end for
			} // end if
		if (figyelt) {
			cimsor.append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red; font-weight: bold; font-size: 12px">Figyelt topic</span>&nbsp;&nbsp;<span style="font-size: 10px">(</span><a id="figyelestorlo" style="font-size: 10px; cursor: pointer">Figyelés megszüntetése</a><span style="font-size: 10px">)</span>');
			$("#figyelestorlo").click(function() {
				for (var i=0; i<figyeltTopicok.length; i++) {
					if (figyeltTopicok[i]*1 == topicNumber*1) {
						figyeltTopicok.splice(i, 1);
						legutobbiLatogatasok.splice(i, 1);
					} // end if
				} // end for
				for (var i=0; i<betoltottTopicok.length; i++) {
					if (betoltottTopicok[i].split('&')[0] == topicNumber)
						betoltottTopicok.splice(i, 1);
				} // end for
				GM_setValue('figyeltTopicok', uneval(figyeltTopicok)); 
				GM_setValue('topicLatogatas', uneval(legutobbiLatogatasok)); 
				GM_setValue('betoltottTopicok', uneval(betoltottTopicok));
				location.reload();
			}); // end click event
		}
		else {
			cimsor.append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="topicfigyeles" style="font-size: 10px; cursor: pointer">Topic figyelése</a>');
			$("#topicfigyeles").click(function() {
				var most = new Date();
				figyeltTopicok.push(topicNumber); 
				legutobbiLatogatasok.push(most.getTime());
				GM_setValue('figyeltTopicok', uneval(figyeltTopicok)); 
				GM_setValue('topicLatogatas', uneval(legutobbiLatogatasok)); 
				location.reload();
			}); // end click event
		} // end if
	} // end if
} // end if


if (ignoralas) {
	msgHContents.each(function(i, element) {
		for (var j=0; j<ignoreList.length; j++) {
			if ($(element).html().indexOf('>' + ignoreList[j] + '<') > 0) 
				messageContent(element).html('<p>' + ignoreSzoveg + '</p>');
		} // end for
	});
} // end if

if (trollszuro) {
	var trollBoxes = new Array();
	mBoxes.each(function(i, element) {
		for (var j=0; j<trolList.length; j++) {
			if ($(element).html().indexOf('>' + trolList[j] + '<') > 0)
				trollBoxes.push(element);
		} // end for
	});
	for (var i=0; i<trollBoxes.length; i++)
		$(trollBoxes[i]).css('display', 'none');
} // end if

if (ellensegszuro) {
	mBoxes.each(function(i, element) {
		for (var j=0; j<ellensegek.length; j++) {
			if (msgHContents.eq(i).html().indexOf('>' + ellensegek[j] + '<') > 0)
				$(element).css('width', '70%').css('float', 'right').css('border-style', 'none').css('font-size', '80%');
		} // end for
	});
} // end if

if (hosszuSzovegekKezelese && location.href.indexOf('Search') == -1) {
	var tartalom;
	var sorokSzama;
	var pos;
	var start;
	var maxSorPos;
	var linkHtml;
	var msgHContents2_links;
	msgHContents.each(function(i, element) {
		tartalom = messageContent(element);
		sorokSzama = 0;
		pos = 0;
		maxSorPos = 0;
		start = -1;
		if (tartalom.html() != null) {
			while (pos > -1) {
				pos_br = tartalom.html().toLowerCase().indexOf("<br>", start+1);
				pos_p = tartalom.html().toLowerCase().indexOf("</p>", start+1);
				pos = pos_br;
				if (pos_p > -1 && pos_p < pos_br)
					pos = pos_p;
				if (pos > -1) {
					sorokSzama += 1;
					start = pos;
				} // end if
				if (sorokSzama == maxSor)
					maxSorPos = pos;
			} // end while
			if (tartalom.html().length > hosszuSzoveg || sorokSzama > maxSor) {
				if (msgHContents2.eq(i)) {
					msgHContents2_links = msgHContents2.eq(i).find("a");
					linkHtml = '...&nbsp;&nbsp;&nbsp;<a href="' + msgHContents2_links.eq(1).attr('href') + '" target="_blank">[Teljes&nbsp;szöveg]</a>';
					if (maxSorPos > 0)
						tartalom.html(tartalom.html().substr(0, maxSorPos) + linkHtml);
					else
						tartalom.html(tartalom.html().substr(0, hosszuSzoveg) + linkHtml);
				} // end if
			} // end if
		} // end if
	});
} // end if

setSkin(skin);

/*if (ujBejelentkezes) {
	if ($(".passbox").length > 0) {
		$("form[name='loginboxform']").hide().after('<span id="loginclick" style="font-weight: bold; font-size: 14px; margin: 10px; color: #7070FF; cursor: pointer">Bejelentkezés</span>');
	}
	else {
		$(".darkbox h4").eq(0).css('cursor', 'pointer');
	}
	$("#loginclick, .darkbox h4:first").click(function() {
		if ($("#sereniclogin").length == 0) {
			$('<form id="loginform" name="loginform" action="http://forum.index.hu/Rights/login"><div id="sereniclogin"></div></form>').appendTo("body");
			$('<input type="hidden" name="nickName" id="nickname" value="" /><input type="hidden" name="password" id="password" value="" />').appendTo("#loginform");
			$("#sereniclogin").append('<label for="nick">Nicknév:<br /></label>')
			.append('<input id="nick" name="nick" type="text" value="" /><br />')
			.append('<label for="pass">Jelszó:<br /></label>')
			.append('<input id="pass" name="pass" type="password" value="" />')
		} // end if
		$("#sereniclogin").dialog({ focus: function(event, ui) { $(".ui-dialog-titlebar-close").css({ "display": "none" }); }, 
		open: function(event, ui) { $("#ujnick").hide(); }, modal: true, title: "Bejelentkezés", width: 400,
		buttons: { "Mégsem": function() { $("#nick").attr('value', ''); $("#pass").attr('value', ''); $(this).dialog("close"); },
		"OK": function() {
			$("#nickname").attr('value', $("#nick").attr('value'));
			$("#password").attr('value', $("#pass").attr('value'));
			$("#loginform").submit();
		}
		}}); 
	}); 
} // end if */

if (baratokjelzes) {
	mBoxes.each(function(i, element) {
		for (var j=0; j<baratok.length; j++)
			if (msgHContents.eq(i).html().indexOf('>' + baratok[j] + '<') > 0)
				$(element).css('border-color', baratokKeretszin).css('border-style', baratokKeretstilus).css('border-width', baratokKeretvastagsag);
	});
} // end if

function addValtozottTopic(tSzam, tNev) {
	var elvalaszto = '&nbsp;&nbsp;&#8226;&nbsp;&nbsp;';
	if ($("#figyeltTopicok").text() == "Változott topicok: ")
		elvalaszto = '';
	var zaroTag = '">';
	if (location.href.indexOf('EditArticle') > -1)
		zaroTag = '" target="_blink">';
	$("#figyeltTopicok").append(elvalaszto + '<a href="http://forum.index.hu/Article/showArticle?t=' + tSzam + zaroTag + tNev + '</a>');
} // end function

function topicFigyelo() {
if (figyelhetoTopicok) {
	$("#naviheader").append('<div id="figyeltTopicok" style="color: red"><br />Változott topicok: </div>');
	if (location.href == "http://forum.index.hu/Topic/showTopicList")
		$("#maintable").children().prepend('<tr><td></td><td><div id="figyeltTopicok" style="font-weight: bold; color: red">Változott topicok: </div></td></tr>');
	$("#editorbody").prepend('<div id="editorheader">Szerkesztéskor a változott topicok linkjeire kattintva a tartalom új ablakban jelenik meg.</div>');
	var marBetoltott;
	for (var f=0; f<figyeltTopicok.length; f++) {
		marBetoltott = -1; 
		for (var q=0; q<betoltottTopicok.length; q++)
			if (figyeltTopicok[f] == betoltottTopicok[q].split('&')[0])
				marBetoltott = q;			
		if (marBetoltott < 0) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://forum.index.hu/Article/showArticle?t=' + String(figyeltTopicok[f]),
			onload: function(response) {
				var rText = response.responseText;
				var elsoDatumPoz = rText.indexOf('art_h_r');
				var elsoDatum = rText.substr(elsoDatumPoz + 9, 19);
				var topicDatum = new Date();
				topicDatum.setFullYear(elsoDatum.substr(0,4)*1, (elsoDatum.substr(5,2)*1)-1, elsoDatum.substr(8,2)*1);
				topicDatum.setHours(elsoDatum.substr(11,2)*1, elsoDatum.substr(14,2)*1, elsoDatum.substr(17,2)*1);
				var topicDatumNum = topicDatum.getTime();
				var topicSzamPoz = rText.indexOf('navilast');
				var topicSzam = rText.substr(topicSzamPoz + 42, 10);
				var idezojelPoz = topicSzam.indexOf('"');
				if (idezojelPoz > -1)
					topicSzam = topicSzam.substring(0, idezojelPoz);
				var legutobbiDatumNum;
				for (var lv=0; lv<figyeltTopicok.length; lv++)
					if (figyeltTopicok[lv] == topicSzam)
						legutobbiDatumNum = legutobbiLatogatasok[lv]*1;
				if (topicDatumNum > legutobbiDatumNum) {	
					var titlePoz = rText.indexOf('<title>');
					var titleVegPoz = rText.indexOf('</title>');
					var topicNev = rText.substring(titlePoz + 7, titleVegPoz);
					topicNev = topicNev.replace(" - Index Fórum", "");
					addValtozottTopic(topicSzam, topicNev);
					betoltottTopicok.push(topicSzam + '&' + topicNev);
					GM_setValue('betoltottTopicok', uneval(betoltottTopicok));
					if (felugroAblakValtozaskor)
						alert('Változás történt ' + topicNev + ' topikban.');
				} // end if
			} // end onload function
		}) // end ajax_get
		} else {
			var bTagok = betoltottTopicok[marBetoltott].split('&');
			addValtozottTopic(bTagok[0], bTagok[1]);
		} // end if marBetoltott < 0
	} // end for 
}
else {
    $("#editorbody").prepend('<div id="editorheader"></div>');
} // end if
} // end function

topicFigyelo();

function createLayer(no, x,y,width,height,headerStr,content) {
	var layer = document.createElement("div");
	layer.id = "layer" + String(no);
	layer.style.position = "absolute";
	layer.style.left = String(x);
	layer.style.width = String(width);
	layer.style.maxWidth = String(width);
	layer.style.maxHeight = window.innerHeight-100;
	layer.style.height = "auto";
	layer.style.zIndex = "10";
	layer.style.backgroundColor = "#FFFFAA";
	layer.style.visibility = "visible";
	layer.style.padding = "15px";
	layer.style.borderColor = "white";
	layer.style.borderStyle = "solid";
	layer.style.borderWidth = "5px";
	layer.innerHTML = content;
	document.body.appendChild(layer);
	var header = document.createElement("div");
	header.id = "layer"+ String(no+1);
	header.style.position = "absolute";
	header.style.left = String(x);
	header.style.width = String(width + 24);
	header.style.height = "auto";
	header.style.zIndex = "11";
	header.style.backgroundColor = "lightblue";
	header.style.borderColor = "white";
	header.style.borderStyle = "solid";
	header.style.borderWidth = "5px";
	header.style.borderBottomWidth = "0";
	header.style.padding = "3px";
	header.style.visibility = "visible";
	header.style.fontFamily = "sans-serif";
	header.style.fontSize = "12px";
	header.style.textAlign = "center";
	header.style.top = String(y);
	header.innerHTML = "El&#337;zmény:&nbsp;" + headerStr;
	layer.style.top = String(y + header.offsetHeight + 24);
	document.body.appendChild(header);
	if (layer.offsetTop + layer.offsetHeight > (window.innerHeight + window.pageYOffset)) {
		layer.style.top = layer.offsetTop - (layer.offsetTop + layer.offsetHeight - (window.innerHeight + window.pageYOffset));
		header.style.top = layer.offsetTop - header.offsetHeight;
	} // end if
} // end function

function removeLayer(no) {
	var layer = $("#layer" + String(no));
	var header = $("#layer" + String(no+1));
	if (layer != undefined) {
		layer.css('visibility', 'hidden');
		layer.remove();
	} // end if
	if (header != undefined) {
		header.css('visibility', 'hidden');
		header.remove();
	} // end if
} // end function

var marKeszElozmeny = new Array();

function elozmenyLetrehozasa(ind) {
	var el_header;
	if (elozmenyLinkek[ind] != undefined) {
		if (marKeszElozmeny[ind] == undefined) {
			if (elozmenyekForma == "ablakban") {
				elozmenyLinkek[ind].hover(function() {
					if (document.getElementById("layer" + this.id) == undefined) {
						var elozmenyekIndex = this.id * 1;
						var headerStr = this.innerHTML;
						var content = elozmenyek[elozmenyekIndex];
						if (content == undefined)
							content = "Betöltés folyamatban...";
						createLayer(this.id, mouseX+10, mouseY+10, 500, 400, headerStr, content); 
					}
					else {	
						$("#layer" + this.id).css('visibility', 'visible');
					} // end if				
				}, function() {
					var layer = $("#layer" + this.id);
					if (layer)
						removeLayer(this.id);
				});
				marKeszElozmeny[ind] = true;
			} // end if
			if (elozmenyekForma == "hozzászólásban") {
				messageContentBox(msgHContents.eq(ind)).prepend('<tr><td><div id="elozmeny' + String(ind) + '" ' + 'style="margin-top: -10px; ' + elozmenyekStilus + '">' + elozmenyek[ind] + '</div></td></tr> <br />\n');
				messageContentBox(msgHContents.eq(ind)).prepend('<tr><td><div id="elozmeny_fejlec' + String(ind) + '" style="' + elozmenyekStilus + '">' + elozmenyekSzoveg +'<a style="border-bottom: none;" href="' + elozmenyLinkek[ind].attr('href') + '">' + elozmenyLinkek[ind].html() + '</a>' + '</div></td></tr>'); 
				$("#elozmeny_fejlec" + String(ind)).css('padding', '2px').css('border-style', 'none').css('width', 'auto');
				marKeszElozmeny[ind] = true;
			} // end if
		} // end if
	} // end if
} // end function

if (elozmenyekMegjelenitese) {
var footers = msgFooters;
var elozmenyLinkek = new Array();
var elozmenyCounter = 0;
footers.each(function(i, element) {
  if (i <= maxElozmenySzam) { // Biztonsági szelep...
	elozmenyLinkek[i] = footers.eq(i).find("a");
	if (elozmenyLinkek[i].html()) {
		msgHInforms.each(function(j, msgInfo) {
			var zarojel1 = $(msgInfo).html().indexOf("(");
			var zarojel2 = $(msgInfo).html().indexOf(")");
			var header_hszam = $(msgInfo).html().substring(zarojel1+1, zarojel2).replace('<strong>','').replace('</strong>','');
			if (header_hszam == 'topiknyito')
				header_hszam = '-';
			zarojel1 = elozmenyLinkek[i].html().indexOf("(");
			zarojel2 = elozmenyLinkek[i].html().indexOf(")");
			var footer_hszam = elozmenyLinkek[i].html().substring(zarojel1+1, zarojel2).replace('<strong>','').replace('</strong>','');
			if (footer_hszam == header_hszam) {
				elozmenyek[i] = messageContent(msgHContents.eq(j)).html().replace('<span id="maskwindow">','').replace('</span>','').replace('<div class="art_t">','').replace('</div>','');
				elozmenyLetrehozasa(i);
			} // end if
		});
	if (elozmenyek[i] == undefined) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://forum.index.hu' + elozmenyLinkek[i].attr('href').replace('jumpTree','viewArticle'),
			onload: function(response) {
				var elozmenyHTML = response.responseText;
				var spliText = elozmenyHTML.split('<div class="art_t">');
				var elozmenyText = spliText[1];
				var spliText1 = elozmenyHTML.split('"><strong>');
				var spliText2 = spliText1[1].split('EditArticle/ReplayEditArticle');
				var userText = spliText2[0].replace('</strong></a></td>', '');
				userText = userText.replace('<td class="art_h_m"><a href="', '');
				userText = userText.replace('\n    /', '');
				spliText1 = elozmenyHTML.split('(<strong>');
				var hsz = spliText1[1].split('</strong>)')[0];
				if (hsz == 'topiknyitó')
					hsz = '-'; 
				for (var q=0;  q<elozmenyLinkek.length; q++) {
					if (elozmenyLinkek[q] != undefined) {
						if (userText+ " (" + hsz +")" == elozmenyLinkek[q].html()) {
							elozmenyek[q] = elozmenyText;
							elozmenyLetrehozasa(q);
						} // end if
						elozmenyLinkek[q].attr('id', String(q));
					} // end if
				} // end for
			} // end onload function
		}) // end ajax_get
	} // end if undefined
	} // end if not undefined :-)
  } // end if - biztonsági szelep
});
msgFooters.each(function(i, element) {
  if (i <= maxElozmenySzam) { // Biztonsági szelep...
	if (elozmenyekForma == "hozzászólásban")
		$(element).remove();
  } // end if
});
} // end if elozmenyekMegjelenitese

if (rangokMegjelenitese) {
getUsers();
var rangOk = new Array();
msgHContents.each(function(i) {
	rangOk[i] = false; // még nincs kész egyetlen rang sem.
});
var userCounter = 0;
for (var i=0; i<userCodes.length; i++) {
  if (i <= maxRangBeolvasas) { // Biztonsági szelep
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://forum.index.hu/User/UserDescription?u=" + userCodes[i],
		onload: function(responseDetails) {
			var userPageHTML;
			userPageHTML = responseDetails.responseText;
			var adminPos = userPageHTML.search('td class="us_label">Adminisztrátor');
			var testStr, spliText1, spliText2;
			var hozzaszolasokPos = userPageHTML.search(">Hozzászólások<");
			testStr = userPageHTML.substr(hozzaszolasokPos, 50);
			spliText1 = testStr.split("(");
			spliText2 = spliText1[1].split(")");
			var hozzaszolasSzam = spliText2[0];
			var nicknamePos = userPageHTML.search(">Nick:<");
			testStr = userPageHTML.substr(nicknamePos, 80);
			spliText1 = testStr.split(">");
			var username = spliText1[3].replace('</td', '');
			for (var u=0; u<userNames.length; u++) {
				if (username == userNames[u])
					var userCount = u;
			} // end for
			hozzaszolasok[userCount] = hozzaszolasSzam;	
				for (var n=0; n<msgHContents.length; n++) {
					var rang = 0;
					var hszam = 0;
					var usercode = 0;
					for (var q=0; q<userNames.length; q++) {
						if (msgHContents.eq(n).html().indexOf('>' + userNames[q] + '<') > 0) {
							usercode = userCodes[q];
							if (hozzaszolasok[q] != undefined) {
								hszam = hozzaszolasok[q] * 1;
								for (var w=0; w<rangok_hszam.length; w++) {
									if (hszam >= rangok_hszam[w]) {
										rang = w + 1;
										if (rang >= rangok_jel.length)
											rang = w;
									} // end if
								} // end for
							} // end if != undefined
						} // end if
					} // end for
					if (hszam > 0 && rangOk[n] == false) {
						var rangStr = rangok_jel[rang];
						if (adminPos > -1)
							rangStr = '<span style="color: red">moderátor</span>';
						msgHContents.eq(n).append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://forum.index.hu/User/UserDescription?u=' + usercode +'" title="Hozzászólások száma: ' + hszam + '">[Rang: ' + rangStr + ']</a>');
						rangOk[n] = true;
					} // end if
				} // end for
				userCounter++;
		} // end onload function
	}) // end ajax_get
  } // end if biztonsági szelep
} // end for
} // end if rangokMegjelenitese

if (hibasLinkekJavitasa) {
	var urlMinta = new RegExp("(http|https)://([a-zA-Z0-9\\~\\!\\@\\#\\$\\%\\^\\&amp;\\*\\(\\)_\\-\\=\\+\\\\\\/\\?\\.\\:\\;\\'\\,]*)?", "g");
	var szoveg = "";
	var linkek, szovegLinkek, kepek, letezik;
	msgHContents.each(function(i, element) {
		szoveg = messageContent(element).html();
		linkek = messageContent(element).find("a");
		kepek = messageContent(element).find("img");
		if (urlMinta.test(szoveg)) {
			szovegLinkek = szoveg.match(urlMinta);
			for (var j=0; j<szovegLinkek.length; j++) {
				letezik = false;
				linkek.each(function(z, link_element) {
					if (szovegLinkek[j].replace(/&amp;/g, "&") == $(link_element).attr('href'))
						letezik = true;
				});
				kepek.each(function(z, kepek_element) {
					if (szovegLinkek[j].replace(/&amp;/g, "&") == $(kepek_element).attr('src'))
						letezik = true;
				});
				if (szovegLinkek[j].indexOf("http://imgfrm.index.hu") > -1)
					letezik = true;
				if (!letezik) {
					messageContent(element).html(szoveg.replace(szovegLinkek[j], '<a target="_blink" href="' + szovegLinkek[j] +'">' + szovegLinkek[j] + '</a>'));
				} // end if
			} // end for
		} // end if
	});
} // end if

var newObject;
if (videoBeagyazas) {
	var linkek = $("a");
	var minta = new RegExp("http://(www.youtube.com/watch?)", "i");
	var tipus = "youtube";
	linkek.each(function(l, link_element) {
		if (minta.test($(link_element).attr('href'))) {
			switch (tipus) {
				case "youtube":
					$(link_element).attr('id', 'youtubelink' + String[l]);
					if (l >= maxVideo) // Biztonsági szelep
						newObject = '<span><br /><br /><object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/' + $(link_element).attr('href').split('?v=')[1] + '&hl=en&fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + $(link_element).attr('href').split('?v=')[1] + '&hl=en&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object><br /></span>';
					break;
			} // end switch
			$(link_element).append(newObject);
		} // end if
	});
} // end if

if (!elozmenyekbenMultimedia) {
var elozmenyBox;
var elozmenyMultimedia = new Array();
var multimElemek;
for (var i=0; i<marKeszElozmeny.length; i++) {
	if (elozmenyekForma == "hozzászólásban") {
		elozmenyBox = $("#elozmeny" + String(i));
		if (elozmenyBox) {
			for (var mtag=0; mtag<multimediaTags.length; mtag++) {
				multimElemek = elozmenyBox.find(multimediaTags[mtag]);
				if (multimElemek.length > 0) {
					for (var me=0; me<multimElemek.length; me++)
						elozmenyMultimedia.push(multimElemek.eq(me));
				} // end if
			} // end for
		} // end if
	} // end if
} // end for
for (var i=0; i<elozmenyMultimedia.length; i++) {
	var htmlText = '';
	if (elozmenyMultimedia[i].is("object"))
		htmlText = '[video]';
	if (elozmenyMultimedia[i].is("img"))
		htmlText = '[kép]';
	elozmenyMultimedia[i].replaceWith('<p>' + htmlText + '</p>');
} // end for
} // end if


function autoSave(id, delay) {
	var text = $(id).attr('value');
	if (text != '') { // Csak akkor vizsgálódunk, ha már van szövegünk...
		if (savedTexts.length == 0 || text != savedTexts[savedTexts.length - 1]) { // Ha még nincs mentmény vagy az aktuális szöveg nem egyezik meg az utolsónak felvittel
			if (actualTextIndex == savedTexts.length || text != savedTexts[actualTextIndex]) { // de csak ha a TextIndex új szövegre utal vagy pedig a visszamenésben már változásunk van
				// És még azt is nézzük meg, különbözik-e az új szöveg az előzőtől minCharSzam mennyiségben...
				var kulonbozik = false;
				if (savedTexts.length == 0) {
					kulonbozik == true;
				}
				else {
					var eltero = 0;
					var poz = actualTextIndex;
					if (actualTextIndex == savedTexts.length)
						poz--;
					for (var i=0; i<text.length; i++)
						if (text.charAt(i) != savedTexts[poz].charAt(i))
							eltero++;
				} // end if
				if (!kulonbozik && actualTextIndex == savedTexts.length && eltero >= minCharSzam)
					kulonbozik = true;
				if (!kulonbozik && actualTextIndex < savedTexts.length && eltero >= minModCharSzam)
					kulonbozik = true;
				if (kulonbozik) { // ajvé!
					savedTexts = eval(GM_getValue('savedTexts', '[]'));
					if (actualTextIndex != savedTexts.length)
						savedTexts.splice(actualTextIndex, savedTexts.length - actualTextIndex); // Az összes következő változat felejtős
					if (savedTexts.length >= mentesValtozatokSzama)
						savedTexts.splice(0, 1);
					savedTexts.push(text);
					actualTextIndex = savedTexts.length;
					GM_setValue('savedTexts', uneval(savedTexts));
				} // end if
			} // end if
		} // end if
	} // end if
	setTimeout(autoSave, delay, id, delay);
} // end function

if (autoMentes && (location.href.indexOf('EditArticle') > -1 || location.href.indexOf('addFirstArticle') > -1)) {
	var minCharSzam = 72; // Legalább ennyi karakterenként kezd újabb mentésbe.
	var minModCharSzam = 3; // Ha nem új szöveget írunk, hanem régit módosítunk, mennyi változás után mentse
	var periodus = 10000; // ennyi (/1000) másodpercenkent nézi meg a változásokat
	savedTexts = eval(GM_getValue('savedTexts', '[]'));
	actualTextIndex = savedTexts.length; 
	$("#naviheader").append('<span style="color: red"><br />Automatikus mentés bekapcsolva</span>');
	$("#editorbody").prepend('<div id="serenic_buttons">\n\
	<input id="undo" type=button value="Vissza" /><input id="redo" type=button value="Előre" /></div>');
	$("#undo").click(function() {
		savedTexts = eval(GM_getValue('savedTexts', '[]'));
		if (savedTexts.length > 0) {
			var text = $("#textarea_obj").attr('value');
			// Lementjük az éppen írt szöveget a vissza gombra
			if (actualTextIndex == savedTexts.length && text != '' && (actualTextIndex == 0 || text != savedTexts[actualTextIndex-1])) {
				savedTexts.push(text);
				GM_setValue('savedTexts', uneval(savedTexts));
				actualTextIndex = savedTexts.length;
			} // end if
			actualTextIndex--;
			if (actualTextIndex < 0)
				actualTextIndex = 0;
			if (actualTextIndex != 0) {
				if ($("#textarea_obj").attr('value') == savedTexts[actualTextIndex])
					actualTextIndex--;
			} // end if
			$("#textarea_obj").attr('value', savedTexts[actualTextIndex]);
			createPreview();
		} // end if
	});
	$("#redo").click(function() {
		actualTextIndex++;
		if (actualTextIndex > savedTexts.length)
			actualTextIndex = savedTexts.length;
		if (actualTextIndex < savedTexts.length)
			$("#textarea_obj").attr('value', savedTexts[actualTextIndex]);
		else
			$("#textarea_obj").attr('value', '');
		createPreview();
	});
	$("#editor_preview input[value='Megnéz']").click(function() {
		var text = $("#textarea_obj").attr('value');
		if (text != '' && !noAutoSave) {
            if (actualTextIndex == 0 || savedTexts[actualTextIndex -1] != text) {
                savedTexts.push(text);
                GM_setValue('savedTexts', uneval(savedTexts));
            } // end if
		} // end if 
		
	});
    $(window).unload(function() {
        var text = $("#textarea_obj").attr('value');
        if (text != '' && !noAutoSave) {
            if (actualTextIndex == 0 || savedTexts[actualTextIndex -1] != text) {
                savedTexts.push(text);
                GM_setValue('savedTexts', uneval(savedTexts));
            } // end if
        } // end if 
    });
	autoSave("#textarea_obj", periodus);
} // end if

function converttoHTML(id) {
	var html = $("#" + id).attr('value');
	html = html.replace(/\r/gi,"");
	//<,> védése
	html = html.replace(/</gi,"&lt;").replace(/>/gi,"&gt;");
	//igazitasok
	html = html.replace(/\[(left|right|center|justify)\]/gi,"<p align=$1>");
	html = html.replace(/\[\/(left|right|center|justify)\]/gi,"</p>");
	//font meret,szin
	html = html.replace(/\[size([1-5])\]/gi,"<font size=$1>");
	html = html.replace(/\[color:([0-9a-z]{6})\]/gi,"<font color=#$1>");
	html = html.replace(/\[\/(size\d|color)\]/gi,"</font>");
	//megengedett tagek
	html = html.replace(/\[(b|u|i|s|ul|ol|li|sup|sub)\]/gi,"<$1>");
	html = html.replace(/\[\/(b|u|i|s|ul|ol|li|sup|sub)\]/gi,"</$1>");
	html = html.replace(/\n/gi,"<br />");
	// behúzás
	html = html.replace(/\[indent\]/gi, '&emsp;');
	// idézet
	html = html.replace(/\[cite\]/gi, '<font color=#585858>&bdquo;<i>');
	html = html.replace(/\[\/cite\]/gi, '</i>&rdquo;</font>');
	// euro
	html = html.replace(/\[euro\]/gi, '&euro;');
	// link
	html = html.replace(/\[link (http:\/\/[^\[\]]*)\]/gi, '<a href="$1">');
	html = html.replace(/\[\/link\]/gi, '</a>');
	//kepek
	var images = $(document).find("img").filter(function() {
		return $(this).attr('src').indexOf("http://imgfrm.index.hu") > -1;
	});
	images.each(function(i) {
		var re = new RegExp("\\[image"+(1+i)+"\\]","gi");
		html = html.replace(re, '<img src="' + $(this).attr('src') + '" alt="" style="float: left; border: none; margin-right: 5px; margin-bottom: 5px; cursor: pointer; clear: left;" border="0" />');
		var re2 = new RegExp("\\[image"+(1+i)+":(left|center|right)\\]", "gi");
		html = html.replace(re2, '<img src="' + $(this).attr('src') + '" alt="" class=tn_img$1 border=0 />');
	});
	//linkek
	var linkek = $(document).find("input").filter(function() {
		return $(this).attr('name').indexOf("url") > -1 && $(this).attr('value') != "http://";
	});
	var linkszovegek = $(document).find("input").filter(function() {
		return $(this).attr('name').indexOf("linktext") > -1 && $(this).attr('value') != "";
	});
	linkek.each(function(i) {
		var re2 = new RegExp("\\[link"+(1+i)+"\\]","gi");
		if (linkszovegek.eq(i).attr('value') != undefined)
			html = html.replace(re2, '<a href="' + $(this).attr('value') + '" target="_blank">' + linkszovegek.eq(i).attr('value') + '</a>');
		else
			html = html.replace(re2, ''); 
	});
	$
	return '<font size=2 face="Verdana, Arial, Helvetica, sans-serif">' + html + '</font>';
} // end function

var sitexTagCserek = ['/¤/¤<i>¤</i>', '∴¤∴¤<b>¤</b>', '_¤_¤<u>¤</u>', '~¤~¤<s>¤</s>', '▲¤▲¤<sup>¤</sup>', '%¤%¤<sub>¤</sub>',
'bal::¤::¤<p align=left>¤</p>', 'balra::¤::¤<p align=left>¤</p>', 'left::¤::¤<p align=left>¤</p>',
'jobb::¤::¤<p align=right>¤</p>', 'jobbra::¤::¤<p align=right>¤</p>', 'right::¤::¤<p align=right>¤</p>',
'közép::¤::¤<p align=center>¤</p>', 'középre::¤::¤><p align=center>¤</p>', 'center::¤::¤<p align=center>¤</p>',
'sorkizár::¤::¤<p align=justify>¤</p>', 'sorkizárás::¤::¤<p align=justify>¤</p>', 'justify::¤::¤<p align=justify>¤</p>',
'méret[:=]?([1-5])::¤::¤<font size=$1>¤</font>', 'size[:=]?([1-5])::¤::¤<font size=$1>¤</font>']; // a dőltnek kell az elsőnek lennie!
function convertSitexToHTML(id) {
	var html = $("#" + id).attr('value');
	for (var i=0; i<sitexTagCserek.length; i++) {
		var tag1 = sitexTagCserek[i].split('¤')[0];
		var tag2 = sitexTagCserek[i].split('¤')[1];
		var csere1 = sitexTagCserek[i].split('¤')[2];
		var csere2 = sitexTagCserek[i].split('¤')[3];
		var re1 = new RegExp(tag1, '');
		var re2 = new RegExp(tag2, '');
		var vege = false, minta, minta2;
		var poz = 0, poz2 = -1;
//		html = html.replace(/\*/g, '∴'); // csillag helyettesítése
//		html = html.replace(/\^/g, '▲');  // felfelé ék helyettesítése
		while (!vege) {
			var vizsgalando = true; // addig, amíg módosítós vagy vége a stringnek
			while (vizsgalando) {
				mintaTomb = html.substring(poz).match(re1);
				if (mintaTomb != null)
					minta = mintaTomb[0];
				else
					minta = null;
				poz = html.substring(poz).search(minta) + poz;
				if (minta != null && poz > 0) {
					if (html.substr(poz - 1, 1) == '\\' || html.substr(poz - 1, 1) == '!') { // módosítójel esetén továbbmegyünk
						// de még megnézzük, a módosítójel nincs-e módosítva, ha igen, akkor érvénytelen
						if (poz <= 1 || (html.substr(poz - 2, 1) != '\\' && html.substr(poz - 2, 1) != '!')) {
							poz = poz + minta.length;
							vizsgalando = true;
						}
						else
							vizsgalando = false;
					}
					else
						vizsgalando = false;
					if (poz >= html.length)
						vizsgalando = false;
				}
				else 
					vizsgalando = false;
			} // end while
			if (minta != null && poz < html.length - 1) {
				vizsgalando = true;
				var pozMent = poz;
				while (vizsgalando) {
					minta2Tomb = html.substring(poz + minta.length).match(re2);
					if (minta2Tomb != null)
						minta2 = minta2Tomb[0];
					else
						minta2 = null;
					poz2 = html.substring(poz + minta.length).search(re2) + poz + minta.length;
					if (minta2 != null) {
						if (html.substr(poz2 - 1, 1) == '\\' || html.substr(poz2 - 1, 1) == '!') { // módosítójel esetén továbbmegyünk
							// de még megnézzük, a módosítójel nincs-e módosítva, ha igen, akkor érvénytelen
							if (poz2 == 1 || (html.substr(poz2 - 2, 1) != '\\' && html.substr(poz2 - 2, 1) != '!')) {
								poz = poz2;
								vizsgalando = true;
							}
							else
								vizsgalando = false;
						}
						if (!vizsgalando || (html.substr(poz2 - 1, 1) != '\\' && html.substr(poz2 - 1, 1) != '!')) {
							vizsgalando = false;
							origHtml = html;
							csere1 = minta.replace(re1, csere1);
							csere2 = minta2.replace(re2, csere2);
							html = html.substring(0, pozMent) + csere1 + html.substring(pozMent + minta.length, poz2) + csere2 + html.substring(poz2 + minta2.length);
							poz = poz2 + html.length - origHtml.length;
						} // end if
						if (poz >= html.length - 1) {
							vege = true;
							vizsgalando = false;
						} // end if
					}
					else {
						vege = true;
						vizsgalando = false;
					} // end if
				} // end while
			}
			else
				vege = true;
		} // end while
	} // end for 
	// módosítójelek kiszedése
	var modositoMinta, tag;
	for (var i=0; i<sitexTagCserek.length; i++) {
		tag = sitexTagCserek[i].split('¤')[0];
		// 1. \tag
		modositoMinta = new RegExp('\\\\\\' + tag, 'gim');
		html = html.replace(modositoMinta, tag); 
		// 2. !tag
		modositoMinta = new RegExp('\\!\\' + tag, 'gim');
		html = html.replace(modositoMinta, tag);
		// 3. !\\, azaz a \\ jel
		modositoMinta = new RegExp('\\!\\\\\\\\' + tag, 'gim');
		html = html.replace(modositoMinta, '\\\\');
		// 4. \\ minta, kivétel, merad a  \\ jel!
		modositoMinta = new RegExp('\\\\\\\\', 'gim');
		html = html.replace(modositoMinta, '\\\\');
		// 5. \! minta, azaz a !-jel
		modositoMinta = new RegExp('\\\\\\!', 'gim');
		html = html.replace(modositoMinta, '!');
		// 6. !! minta, azaz a !!-jel
		modositoMinta = new RegExp('\\!\\!', 'gim');
		html = html.replace(modositoMinta, '!!');
		// 7. !\, azaz a \ jel
		modositoMinta = new RegExp('\\!\\\\', 'gim');
		html = html.replace(modositoMinta, '\\');
	} // end for
	html = html.replace(/^ /gm, '&nbsp;');
	html = html.replace(/  /gm, '&nbsp;&nbsp;');
/*	html = html.replace(/∴/g, '*');
	html = html.replace(/▲/g, '^'); */
	html = html.replace(/\n/gi, '<br />');
	return '<font size=2 face="Verdana, Arial, Helvetica, sans-serif">' + html + '</font>';
} // end function

var prevText = '';
var animalok = false; // animáció alatt true az értéke
function createPreview() {
	var text = $("#textarea_obj").attr('value');
	var pr_ablak = $("#preview").get(0);
	var megjelenitendo = false;
	if ((szintaxis.indexOf("bb") > -1 && text.search(/\[|\]/g) > -1) || (szintaxis == "sitex" && text.search(sitexTagMinta) > -1) || text.search(/^ /gm) > -1 || text.search(/  /gm) > -1 || text.search(/&nbsp;/gm) > -1) {
		if (elonezet == "automatikus" && !animalok) {
			megjelenitendo = true;
			if ($("#preview").css('opacity') < 1) {
				animalok = true;
				$("#preview").animate({
					opacity: 1.0
				}, 1000, "linear", function() { animalok = false; });
			} // end if
		} // end if
	}
	else {
		if (elonezet == "automatikus" && !animalok)
			if ($("#preview").css('opacity') > 0) {
				animalok = true;
				$("#preview").animate({
					opacity: 0.0
				}, 1000, "linear", function() { animalok = false; pr_ablak.contentWindow.document.body.innerHTML = ''; });
			} // end if
	} // end if
	if (megjelenitendo || $("#preview").css('opacity') > 0) {
		if (text != prevText) {
			if (szintaxis == "sitex")
				pr_ablak.contentWindow.document.body.innerHTML = convertSitexToHTML('textarea_obj');
			else
				pr_ablak.contentWindow.document.body.innerHTML = converttoHTML('textarea_obj');
			prevText = $("#textarea_obj").attr('value');
		} // end if
		if (pr_ablak.contentWindow.document.body.innerHTML == '')
			prevText = '';
	} // end if
} // end function

var sitexTagMinta = new RegExp('[\\*|\\/|\\^|%|_|~|{|}]|::', 'gim');
function formaz(id, bbCodeStart, bbCodeEnd) {
    var editor = $("#" + id);
    var element = editor.get(0);
    var text = editor.attr('value');
    var eleje = text.substr(0, element.selectionStart);
    var selection = text.substr(element.selectionStart, element.selectionEnd - element.selectionStart);  
    var vege = text.substr(element.selectionEnd);
    var elsoTag = '[' + bbCodeStart + ']';
    var masodikTag = '[' + bbCodeEnd + ']';
	if (bbCodeEnd == '')
		masodikTag = '';
	if (bbCodeStart == 'link') {
		if (selection != '')
			selection = '[link ' + selection + ']szöveg[/link]';
		else
			eleje = eleje + '[link http://]szöveg[/link]';
		text = eleje + selection + vege;
		editor.attr('value', text);
		element.focus();
		return true;
	} // end if
    var selectionModositva = false;
    if (selection.substr(0, bbCodeStart.length + 2) == elsoTag)
            elsoTag = ''; // Ha ugyanolyan tag van a kijelölésben, törlendő
    if (selection.substr(selection.length - bbCodeEnd.length - 2) == masodikTag)
            masodikTag = ''; // Ha ugyanolyan tag van a kijelölésben, törlendő
	// colornál bármely color tagot törölni kell a kijelölésben
	if (bbCodeStart.substr(0, 5) == 'color') {
		var colorTag = selection.match(/\[color:[0-9,a-f]{6}\]/ig);
		if (colorTag != null && colorTag != elsoTag) {
			selection = selection.replace(colorTag, '');
			selection = selection.replace('[/color]', '');
			masodikTag = '[/color]';
		} // end if
	} // end if
    if (elsoTag == '' && masodikTag == '' && bbCodeStart != 'li') { // Ha a kijelölésben ugyanolyan tag van, törlendő
            selection = selection.substring(bbCodeStart.length + 2, selection.length - bbCodeEnd.length - 2);
            selectionModositva = true;
    } // end if
    if (eleje != '' && elsoTag != '' && masodikTag != '' && bbCodeStart != 'li') { // Ha a kijelölés elejéhez és végéhez ragadva ugyanolyan tag van, törlendő
            if (eleje.substr(eleje.length - bbCodeStart.length -2) == elsoTag)
                    elsoTag = ''
    } // end if
    if (vege != '' && masodikTag != '' && bbCodeStart != 'li') { // Ha a kijelölés elejéhez és végéhez ragadva ugyanolyan tag van, törlendő
            if (vege.substr(0, bbCodeEnd.length + 2) == masodikTag)
                    masodikTag = '';
    } // end if
    if (!selectionModositva && elsoTag == '' && masodikTag == '' && bbCodeStart != 'li') { // Töröljük akkor a kijelölés elejéhez és végéhez ragadt tagokat....
            eleje = eleje.substring(0, eleje.length - bbCodeStart.length - 2);
            vege = vege.substring(bbCodeEnd.length + 2);
    } // end if
    if (elsoTag == '[ul]' || elsoTag == '[ol]' || elsoTag == '[li]') { // Tegyük be minden bekezdéshez a [li] tagokat
            selection = selection.replace(/\n/g, '\n[li]');
            selection = '[li]' + selection;
    } // end if
    if (elsoTag == '[li]') {
        elsoTag = '';
        masodikTag = '';
    } // end if
    text = eleje + elsoTag + selection + masodikTag + vege;
    editor.attr('value', text);
    element.focus();
} // end function

var modositoJelekMinta = '[\\\\|\\!]';
function sitexFormaz(id, tag1, tag2) {
    var editor = $("#" + id);
    var element = editor.get(0);
    var text = editor.attr('value');
    var eleje = text.substr(0, element.selectionStart);
    var selection = text.substr(element.selectionStart, element.selectionEnd - element.selectionStart);  
    var vege = text.substr(element.selectionEnd);
	var tag;
	for (var i=0; i<2; i++) {
		if (i == 0)
			tag = tag1;
		else
			tag = tag2;
		// Ha a kijelölésben már van ilyen tag, akkor törlendő, kivéve ha az módosítóval el van látva
		var nemTagMinta = new RegExp(modositoJelekMinta + '\\' + tag, 'gim');
		selection = selection.replace(nemTagMinta, '¤¤¤');
		var torlendo = false;
		if (selection.substr(0, tag.length) == tag && selection.substr(selection.length-tag.length) == tag)
			torlendo = true;
		var tagMinta = new RegExp('\\' + tag, 'gim');
		selection = selection.replace(tagMinta, '');
		var segedTagMinta = new RegExp('¤¤¤', 'gim');
		selection = selection.replace(segedTagMinta, '\\' + tag);
		if (torlendo) {
			if (i == 0)
				tag1 = '';
			else
				tag2 = '';
		} // end if
	} // end for
    text = eleje + tag1 + selection + tag2 + vege;
    editor.attr('value', text);
    element.focus();
} // end function

function formazasTorles(id) {
    var editor = $("#" + id);
    var element = editor.get(0);
    var text = editor.attr('value');  
    var sStart = element.selectionStart;
    var sEnd = element.selectionEnd;
	var tagokMinta = new RegExp("\\[\\/?(b|u|i|s|ul|ol|li|sup|sub){1}\\]", "gi");
    var sizeMinta = new RegExp("\\[\\/?size[0-9]\\]", "gi");
    var igazitasMinta = new RegExp("\\[\\/?(left|center|right|justify){1}\\]", "gi");
    var colorMinta = new RegExp("\\[color:[0-9abcdef]{6}\\]", "gi");
    var colorvegMinta = new RegExp("\\[\\/color\\]", "gi");
	var indentMinta = new RegExp("\\[indent\\]", "gi");
	var citeMinta = new RegExp("\\[cite\\]", "gi");
	var citevegMinta = new RegExp("\\[\\/cite\\]", "gi");
	if (sStart != sEnd) { // valami ki van jelölve
        var eleje = text.substr(0, sStart);
        var selection = text.substr(sStart, sEnd - sStart);  
        var vege = text.substr(element.selectionEnd);
    }
    else { // egyébként a kurzor pozíciója
        eleje = '';
        vege = '';
        selection = text;
    } // end if
    // selectionben egyszerű a helyzet: törlünk minden tagot
    selection = selection.replace(tagokMinta, '');
    selection = selection.replace(sizeMinta, '');
    selection = selection.replace(igazitasMinta, '');
    selection = selection.replace(colorMinta, '');
    selection = selection.replace(colorvegMinta, '');
    selection = selection.replace(indentMinta, '');
    selection = selection.replace(citeMinta, '');
    selection = selection.replace(citevegMinta, '');
    editor.attr('value', eleje + selection + vege);
} // end function

function colortoHex(colorCode) {
	var colorStr = String(colorCode.match(/[0-9].+/g));
	var colors = colorStr.split(',');
	colors[2] = colors[2].replace(')', '');
        var red = parseInt(colors[0]).toString(16);
	if (red.length == 1)
		red = '0' + red;
        var green = parseInt(colors[1]).toString(16);
	if (green.length == 1)
		green = '0' + green;
        var blue = parseInt(colors[2]).toString(16);
	if (blue.length == 1)
		blue = '0' + blue;
	return red + green + blue;
} // end function

// szerkesztő
if (location.href.indexOf('EditArticle') > -1 || location.href.indexOf('addFirstArticle') > -1) {
	if ($("div.form_error").text == '')
		$("div.form_error").remove();
	if (String($("#leftslider").css('margin-left')).replace('px', '')*1 >= 0) {
			var minuszMargo = (parseInt($("#leftslider").css('width').replace('px'))-5)*-1;
			$("#leftslider").animate({ marginLeft: String(minuszMargo) + 'px'}, 0);
			$("#closing").attr('value', '>>');
	} // end if
	$("#textarea_obj").after('<iframe id="preview" style="margin-top: 10px; border-style: solid; border-width: 1px; border-color: silver; background: white;"></iframe>');
	if (elonezet == "automatikus" || elonezet == "soha") {
		$("#preview").css('opacity', 0);	
	}// end if
    if (elonezet == "mindig" || elonezet == "soha") {
        var gombSzoveg = "Preview elrejtése";
        if (elonezet == "soha")
            gombSzoveg = "Preview előhozása";
        $("#editorheader").html('<table style="border-style: none; width: 100%"><tr><td>' + $("#editorheader").html() + '</td><td><input id="showpreview" type="button" style="background: none; border-style: none; width: auto; cursor: pointer;" value="' + gombSzoveg + '" /></td></tr></table>');
    } // end if
	var vastag = true, alahuzott = true, dolt = true, vastagdolt= true, athuzott = true, felsoind = true, alsoind = true,
		balra = true, kozepre = true, jobbra = true, sorkizaras = true, betumeret = true, betuszin = true, felsorolas = true, 
		szamozott = true, formazastorles = true, link = true, behuzas = true, idezet = true, euro = true;
	if (!autoMentes)
		$("#editorbody").prepend('<div id="sitex_buttons"></div>');
	bDiv = $("#serenic_buttons");
	if (vastag) {
		bDiv.append('&emsp;<input id="vastag" type=button value="B" style="font-weight: bold; font-size: 13px;" />');
//		$("#vastag").css('background-image', 'url(data:image/png;base64,)');
//		$("#vastag").css('background-position', 'top left').css('background-repeat', 'no-repeat').css('border-style', 'none').css('cursor', 'pointer');
	}
	if (dolt)
		bDiv.append('<input id="dolt" type=button value="I" style="font-style: italic; font-size: 13px;" />');
	if (vastagdolt)
		bDiv.append('<input id="vastagdolt" type=button value="BI" style="font-style: italic; font-weight: bold; font-size: 13px;" />');
	if (alahuzott)
		bDiv.append('<input id="alahuzott" type=button value="U" style="text-decoration: underline; font-size: 13px;" />');
	if (athuzott)
		bDiv.append('<input type="button" id="athuzott" type=button value="S" style="text-decoration: line-through; font-size: 13px;" />');
	if (felsoind)
		bDiv.append('<button type="button" id="felsoind" style="font-size: 12px;">X<sup>2</sup></button>');
	if (alsoind)
		bDiv.append('<button type="button" id="alsoind" style="font-size: 12px;">N<sub>1</sub></button>');
	if (betumeret) {
		bDiv.append('<button type="button" id="nagyobb"><span style="font-size: 16px; font-style: bold;">A</span></button>');
		bDiv.append('<button type="button" id="kisebb"><span style="font-size: 10px; font-style: bold;">A</span></button>');
	} // end if
	if (betuszin) {
		bDiv.append('<input id="betuszin" type="text" value="#000000" />');
		$("#betuszin").colorPicker('colorpicker1', 'button');
		//$("#colorpicker1").attr('value', 'szín');
		$("div.colorpicker").css('height', $("#betuszin").css('height'));
		colorPickerNum = 0;
	} // end if
	if (link)
		bDiv.append('&emsp;<input id="linkgomb" type=button value="link" />');
	if (balra)
		bDiv.append('&emsp;<input id="balra" type=button value="balra" />');
	if (kozepre)
		bDiv.append('<input id="kozepre" type=button value="középre" />');
	if (jobbra)
		bDiv.append('<input id="jobbra" type=button value="jobbra" />');
	if (sorkizaras)
		bDiv.append('<input id="sorkizar" type=button value="sorkizár" />');
	if (behuzas)
		bDiv.append('<input id="behuzas" type=button value="behúzás" />');
	if (idezet)
		bDiv.append('<input id="idezet" type=button value="idézet" />');
	if (felsorolas)
		bDiv.append('<input id="felsorolas" type=button value="felsorolás" />');
	if (szamozott)
		bDiv.append('<input id="szamozott" type=button value="számozott" />');
	if (felsorolas || szamozott)
		bDiv.append('<input id="listasorok" type=button value="listasorok" />');
	if (euro)
		bDiv.append('&emsp;<input id="euro" type=button value="euro" />');   
	if (formazastorles)
		bDiv.append('&emsp;<input id="formazastorles" type=button value="formázások törlése" />');
	$("#editor_preview input[value='Mehet'], .solo_submit input[value='Mehet']").click(function() {
		if (autoMentes) {
			text = $("#textarea_obj").attr('value');
			if (text != '') {
				if (actualTextIndex == 0 || savedTexts[actualTextIndex -1] != text) {
					savedTexts.push(text);
					GM_setValue('savedTexts', uneval(savedTexts));
				} // end if
			} // end if 
		} // end if
		var preview = $("#preview").get(0);
		if (preview.contentWindow.document.body.innerHTML != '') {
			$("input[name='editormode']").attr('value', '1');
			noAutoSave = true;
			var elejeNemKell = new RegExp('<font size=2 face="Verdana, Arial, Helvetica, sans-serif">', '');
			var vegeNemKell = new RegExp('</font>$', '');
			$("#textarea_obj").css('opacity', '0').attr('value', preview.contentWindow.document.body.innerHTML.replace(elejeNemKell, '').replace(vegeNemKell, ''));
		} // end if
	});
	$("#vastag").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', '*', '*');
		else
			formaz('textarea_obj', 'b', '/b');
		createPreview();
	});
	$("#dolt").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', '/', '/');
		else
			formaz('textarea_obj', 'i', '/i');
		createPreview();
	});
	$("#vastagdolt").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', '*/', '/*');
		else
			formaz('textarea_obj', 'b][i', '/i][/b');
		createPreview();
	});
	$("#alahuzott").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', '_', '_');
		else
			formaz('textarea_obj', 'u', '/u');
		createPreview();
	});
	$("#athuzott").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', '~', '~');
		else
			formaz('textarea_obj', 's', '/s');
		createPreview();
	});
	$("#felsoind").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', '^', '^');
		else
			formaz('textarea_obj', 'sup', '/sup');
		createPreview();
	});
	$("#alsoind").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', '%', '%');
		else
			formaz('textarea_obj', 'sub', '/sub');
		createPreview();
	});
	$("#linkgomb").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', 'link::', '::');
		else
			formaz('textarea_obj', 'link', '/link');
		createPreview();
	});
	$("#balra").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', 'left::', '::');
		else
			formaz('textarea_obj', 'left', '/left');
		createPreview();
	});
	$("#kozepre").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', 'center::', '::');
		else
			formaz('textarea_obj', 'center', '/center');
		createPreview();
	});
	$("#jobbra").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', 'right::', '::');
		else
			formaz('textarea_obj', 'right', '/right');
		createPreview();
	});
	$("#sorkizar").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', 'justify::', '::');
		else
			formaz('textarea_obj', 'justify', '/justify');
		createPreview();
	});
	$("#behuzas").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', '>>', '');
		else
			formaz('textarea_obj', 'indent', '');
		createPreview();
	});
	$("#idezet").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', 'cite::', '::');
		else
			formaz('textarea_obj', 'cite', '/cite');
		createPreview();
	});
	$("#nagyobb").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', 'size=4::', '::');
		else
			formaz('textarea_obj', 'size4', '/size4');
		createPreview();
	});
	$("#kisebb").click(function() {
		if (szintaxis == "sitex")
			sitexFormaz('textarea_obj', 'size=1::', '::');
		else
			formaz('textarea_obj', 'size1', '/size1');
		createPreview();
	});
	$("#felsorolas").click(function() {
		formaz('textarea_obj', 'ul', '/ul');
		createPreview();
	});
	$("#szamozott").click(function() {
		formaz('textarea_obj', 'ol', '/ol');
		createPreview();
	});
	$("#listasorok").click(function() {
		formaz('textarea_obj', 'li', '/li');
		createPreview();
	});
	$("#euro").click(function() {
		formaz('textarea_obj', 'euro', '');
		createPreview();
	});
	$("#formazastorles").click(function() {
		formazasTorles('textarea_obj');
		createPreview();
	});
	var editorBodySzel = $("#editor_border").css('width').replace('px', '')*1;
	var elemSzelesseg = String(parseInt((editorBodySzel - 40) / 2)) + 'px';
	$("#textarea_obj").css('width', '48%');
	$("#preview").css('width', '48%').css('height'
	, String($("#textarea_obj").css('height').replace('px', '')*1 + 10) + 'px');
	$("#textarea_obj").keyup(function() { 
		createPreview(); 
	});
    $("#showpreview").click(function() {
        if ($("#preview").css('opacity') > 0)
            $("#showpreview").attr('value', 'Preview előhozása');
        else
            $("#showpreview").attr('value', 'Preview elrejtése');   
        var op = 0;
        if ($("#showpreview").attr('value') == 'Preview elrejtése')
            var op = 1;
        if ($("#preview").css('opacity') == 0)
            $("#preview").css('opacity', 0.01);
        createPreview();
        $("#preview").animate({
					opacity: op
				}, 1000);
    });
    $("a[text='beszúrás']").click(function() { // Amikor képet vagy linket szúrunk be, azt is dolgozza fel a preview ablak...
        createPreview();
    });
    $(function() {
		createPreview(); // Kivédendő a Zindeksz oldalgenerálásait
	});
} // end if

