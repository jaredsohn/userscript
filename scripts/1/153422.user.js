// ==UserScript==
// @name        Favoriler Listesi Temizleyici
// @namespace   adastra
// @description "Favoriler" bölümünde görmek istemediğiniz yazarları anında ilgili kısımdan uçurur. Cibiliyetsizler listesine eklenmiş ama sağ tarafta gözükmeye devam edenler, favoriler bölümünü kendi reklamı uğruna hunharca kullananlar ya da keyfinize göre engellemek istedikleriniz için birebir.
// @include     http://www.itusozluk.com/*
// @author	adastra
// @version     1.5
// ==/UserScript==



var clock = 500;
var blockList = new Array();


if(GM_getValue("blockListLocal",null) != null){
	var blockList = GM_getValue("blockListLocal").split(",");
}

var intervalTemizleyici = setInterval(favoriTemizle,clock);
dugmeEkle();
favoriTemizle();

function favoriTemizle(){
	var favoriListesi = document.querySelector("#app_9 #favoritesul");
	var targetList = new Array();

	if (favoriListesi == null){
		window.clearInterval(intervalTemizleyici);
		return;
	}
	dugmeEkle();

	//detect
	for(var i=0 ; i<favoriListesi.childNodes.length ; i++){
		try{
			var favoriItem = favoriListesi.childNodes[i].childNodes[0];
			var favoriYazar = favoriItem.title;

			for(var j=0 ; j<blockList.length ; j++){
				if(favoriYazar==blockList[j]){
					 targetList.push(favoriItem.parentNode);
				}
			}
		}
		catch(e){
			
		}
	}
	
	//destroy
	for(var i=0 ; i<targetList.length ; i++){
		targetList[i].parentNode.removeChild(targetList[i]);
	}
}

function dugmeEkle(){
	if(document.getElementById("favoriTemizleyiciAyar") == null){
		var button = new Image();
		button.src = "http://icons.iconarchive.com/icons/pixelmixer/basic-2/32/settings-icon.png";
		button.style.cssFloat = "none";
		button.style.borderStyle = "none";
		button.style.cursor = "pointer";
		button.style.width = "32px";
		button.style.height = "32px";
		button.addEventListener("click",popupSettings,false);
		button.setAttribute("id","favoriTemizleyiciAyar");
		var favoriSection = document.querySelector("#app_9 #favoritesul");
		if(favoriSection != null){
			favoriSection.appendChild(button);
		}
	}
}

function popupSettings(){
	var infoMessage = "Şimdiye dek engelledikleriniz:\n\n";
	
	for(var j=0 ; j<blockList.length ; j++){
		if(blockList[j]!="")
			infoMessage+="\t-"+blockList[j]+"\n";
	}
	
	infoMessage += "\nListeye eklemek istediğiniz kullanıcıyı kutucuğa yazın:\n";
	infoMessage += "(Eğer listeden kullanıcıyı çıkarmak istiyorsanız adını kutucuğa yazın yeni bir pencere açılacak.)\n\n";
	
	var data = prompt(infoMessage,"");
	if(data!=null && data!="")
		checkPopupInput(data);
}


function checkPopupInput(data){
	//delete
	for(var j=0 ; j<blockList.length ; j++){
		if(data==blockList[j]){
			if(confirm(blockList[j]+" adlı yazarı listeden silmek istediğinize emin misiniz?") == true)
			{
				blockList.splice(j,1);
				if(blockList.length==0){
					GM_deleteValue("blockListLocal");
				}
				else{
					GM_setValue("blockListLocal",blockList.toString());
				}
			}
			return;
		}
	}
	
	//add
	blockList.push(data);
	GM_setValue("blockListLocal",blockList.toString());
	alert(data+" adlı yazar sağ taraftan temizlendi!");
}