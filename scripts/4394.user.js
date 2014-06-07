// ==UserScript==
// @name          Gozgormez
// @namespace     
// @description   eski hafif.org  ozelliklerinden gozum gormesinin amator versiyonudur
// @include      http://www.hafif.org/*
// @include      http://www.hafif.org/gundem
// @include      http://www.hafif.org/serbest
// @include      http://www.hafif.org/yazi/*
// @include      http://hafif.org/
// @include      http://hafif.org/gundem
// @include      http://hafif.org/serbest
// @include      http://hafif.org/yazi/*
// ==/UserScript==

/* Goz Gormez -  gozgormez.user.js version 0.0.0.3
* version 0.0.0.0.3  -  Temmuz 7, 2006
*
* Hosunuza gitmeyen yorumlara ve bloglara astalavista yavrucugum demek icin yapmaniz gerekenler;
* ornek adli kullanici deneme amacli olarak tanimlanmistir gormek istemediginiz kullanicinin adini yazin. 
*  sistem buyuk harf/kucuk harf duyarlidir yani kullanici adi deNEmE ise aynen yazmaniz gerekmektedir. 
*
* ORNEKLER;
* gozgormez[0] = "birinci kullanici adi";
* gozgormez[1] = "ikinci kullanici adi";
* gozgormez[2] = "ucuncu kullanici adi";
* vb.vb.vb.
*
* isterseniz sadece okudugunuz makaleye ve yapilan yorumlari da makale yazari ve yorum yapanin adinin yaninda bulunan [ @ ] tiklayarak devre disi birakabilirsiniz
* ancak bu sadece o ana ozeldir yani sayfayi refresh ettiginizde onceki hali tekrar aktif olacaktir, 
* yukarida belirtildigi gibi surekli bir ucus istiyorsaniz kisinin adini gozgormez[x] = xxxx  olarak tanimlamaniz gerekmektedir. 
* 
* bu scriptin amaci ise sadece tek tarafli bir ego tatminidir sinirli iken tiklarsaniz alacaginiz zevk ikiye katlanacaktir.
* bu script asil olarak http://userscripts.org/scripts/show/3999 adresinde ikamet eden TrollBlocker adli scriptin hafif 'e gore modifiye edilmis halidir.
* scriptin asil yazari Mittineague olup kendisine haber vermeden caldim. :P
* $aka $aka open source saolsun sonuna kadar destekliyoruz :P
*/

var gozgormez = new Array() 
gozgormez[0] = "ornek";
gozgormez[1] = "ornek";
gozgormez[2] = "ornek";

/* ornek  kelimesini gormek istemediginiz kullanici adi ile degistirin daha fazla kullanici eklemek icin ayni formatta sadece numaralarý arttirarak yazin*/


var main, newElement;
	main = document.getElementById('son-ahkâmlar');
	if (main) {
		newElement = document.createElement('p');
		var bbg = document.createTextNode( "üstün zekalar;    " );
		newElement.appendChild( bbg );
		newElement.style.marginBottom = "10px";
		newElement.style.color = "#806666";
		newElement.style.textAlign = "left";
		newElement.style.fontSize = "17pt";
		newElement.style.fontFamily = "Georgia";
		newElement.style.textDecoration = "none";
		var content = document.createElement("span" );
		content.style.marginBottom = "10px";
		content.style.color = "#996666";
		content.style.textAlign = "left";
		content.style.fontSize = "8pt";
		content.style.fontFamily = "helvatica, arial, verdana";
		content.style.textDecoration = "none";
		content.innerHTML = gozgormez;
		newElement.appendChild( content );
		main.parentNode.insertBefore(newElement, main);
		}


		
		
var blogs;
	blogs = document.evaluate(
    "//span[@class='kim']/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);


 for (var q = 0; q < blogs.snapshotLength; q++) {
    thisBlog = blogs.snapshotItem(q);
    var newDiv = document.createElement('span');
    var blockText = document.createTextNode("[@]");
    newDiv.appendChild(blockText);
	newDiv.style.margin = "10px";
	newDiv.style.color = "#b79999";
	newDiv.style.textAlign = "center";
	newDiv.style.fontSize = "14pt";
	newDiv.style.fontFamily = "Georgia";
    newDiv.style.textDecoration = "none";
	newDiv.style.padding = "5px";
    newDiv.style.cursor = "pointer";
    newDiv.setAttribute("posterName",thisBlog.innerHTML);
    
	newDiv.addEventListener(
    "mouseover",
    function() {
    this.style.textDecoration = "none";
	this.style.color = "#000000";
	this.style.background = "#FFD484";
	this.style.padding = "5px";
	this.style.fontWeight = "bold";
    },
    true);
    newDiv.addEventListener(
    "mouseout",
    function() {
    this.style.textDecoration = "none";
	this.style.background = "none";
	this.style.color = "#b79999";
	this.style.padding = "5px";
	this.style.fontWeight = "normal";
    },
    true);
    newDiv.addEventListener(
    "click",
    function() {
    var newName = this.getAttribute("posterName");
    hideNewTroll(newName);
    },
    true);
	
    thisBlog.parentNode.appendChild(newDiv);
    for (var w = 0; w < gozgormez.length; w++) {
      if (thisBlog.innerHTML == gozgormez[w]) {
        var newBlog = document.createElement('div');
        newBlog.style.margin = "10px";
		newBlog.style.fontSize = "15pt";
		newBlog.style.textAlign = "center";
		newBlog.style.padding = "10px";
		newBlog.style.fontFamily = "Georgia";
		newBlog.style.color = "#666666";
		newBlog.style.background = "#FFD484";
		var newText = document.createTextNode( "eskiden buralar hep [" + gozgormez[w] + "] idi...");
        newBlog.appendChild(newText);
		var oneUpNode = thisBlog.parentNode;
        var twoUpNode = oneUpNode.parentNode;
		var threeUpNode = twoUpNode.parentNode;
		var fourUpNode = threeUpNode.parentNode;
        fourUpNode.parentNode.replaceChild(newBlog, fourUpNode);
      }
    }
  }

function hideNewTroll(newName){

  newItems = document.evaluate(
  "//span[@class='kim'][a ='" + newName + "']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
  );

  for (var x = 0; x < newItems.snapshotLength; x++) {
    thisNewItem = newItems.snapshotItem(x);
    var newListItem2 = document.createElement('div');
    newListItem2.style.margin = "10px";
	newListItem2.style.fontSize = "15pt";
	newListItem2.style.textAlign = "center";
	newListItem2.style.padding = "10px";
	newListItem2.style.fontFamily = "Georgia";
    newListItem2.style.color = "#666666";
	newListItem2.style.background = "#FFD484";
    var newText2 = document.createTextNode( "[" + newName + "] gitti gider...");
    newListItem2.appendChild(newText2);
	var oneUpNode2 = thisNewItem.parentNode;
    var twoUpNode2 = oneUpNode2.parentNode;
	var threeUpNode2 = twoUpNode2.parentNode;
    threeUpNode2.parentNode.replaceChild(newListItem2, threeUpNode2);

  }
}

var listItems;

  listItems = document.evaluate(
    "//div[@class='alt']/strong/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);

  for (var i = 0; i < listItems.snapshotLength; i++) {
    thisListItem = listItems.snapshotItem(i);
    var newSpan = document.createElement('span');
    var blockText = document.createTextNode("[@]");
    newSpan.appendChild(blockText);
    newSpan.style.color = "#666666";
    newSpan.style.textDecoration = "none";
	newSpan.style.fontFamily = "Georgia";
	newSpan.style.fontWeight = "normal";
	newSpan.style.fontSize = "9pt";
    newSpan.style.cursor = "pointer";
    newSpan.style.padding = "5px";
    newSpan.setAttribute("posterName",thisListItem.innerHTML);
    
	newSpan.addEventListener(
    "mouseover",
    function() {
    this.style.textDecoration = "none";
	this.style.color = "#000000";
	this.style.background = "#FFD484";
	this.style.fontSize = "9pt";
	this.style.fontWeight = "bold";
	this.style.padding = "5px";
    },
    true);
    newSpan.addEventListener(
    "mouseout",
    function() {
    this.style.textDecoration = "none";
	this.style.background = "none";
	this.style.color = "#b79999";
	this.style.fontWeight = "normal";
	this.style.fontSize = "9pt";
	this.style.padding = "5px";
    },
    true);
    newSpan.addEventListener(
    "click",
    function() {
    var newName = this.getAttribute("posterName");
    hideNewTroll1(newName);
    },
    true);
	
    thisListItem.parentNode.appendChild(newSpan);
    for (var j = 0; j < gozgormez.length; j++) {
      if (thisListItem.innerHTML == gozgormez[j]) {
        var newListItem = document.createElement('div');
		newListItem.style.margin = "5px";
		newListItem.style.fontSize = "9pt";
		newListItem.style.textAlign = "center";
		newListItem.style.padding = "0px";
		newListItem.style.fontFamily = "georgia";
		newListItem.style.color = "#666666";
		newListItem.style.background = "#FFD484";
		var newText = document.createTextNode( "[" + gozgormez[j] + "] ucacaksin ucacaksin havalara ucacaksin");
        newListItem.appendChild(newText);
		var oneUpNode = thisListItem.parentNode;
        var twoUpNode = oneUpNode.parentNode;
		var threeUpNode = twoUpNode.parentNode;
        threeUpNode.parentNode.replaceChild(newListItem, threeUpNode);
      }
    }
  }

function hideNewTroll1(newName){

  newItems = document.evaluate(
  "//div[@class='alt']/strong[a ='" + newName + "']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
  );

  for (var k = 0; k < newItems.snapshotLength; k++) {
    thisNewItem = newItems.snapshotItem(k);
    var newListItem2 = document.createElement('div');
    newListItem2.style.margin = "5px";
	newListItem2.style.fontSize = "9pt";
	newListItem2.style.textAlign = "center";
	newListItem2.style.padding = "0px";
	newListItem2.style.fontFamily = "Georgia";
    newListItem2.style.color = "#666666";
	newListItem2.style.background = "#FFD484";
    var newText2 = document.createTextNode( "[" + newName + "] attaaya gittiii.");
    newListItem2.appendChild(newText2);
	var oneUpNode2 = thisNewItem.parentNode;
    var twoUpNode2 = oneUpNode2.parentNode;
    twoUpNode2.parentNode.replaceChild(newListItem2, twoUpNode2);

  }
}