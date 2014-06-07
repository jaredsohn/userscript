// ==UserScript==
// @name        Başlık Filtreleyici
// @namespace   adastra
// @description Kara listede belirlediğiniz anahtar kelimelerin geçtiği başlıkları sol taraftan temizler, rahat nefes aldırır.
// @include     http://www.itusozluk.com/*
// @author	adastra
// @version     1.2
// ==/UserScript==

var clock = 500;
var blackList = new Array();

if(GM_getValue("blackListLocal",null) != null){
	blackList = GM_getValue("blackListLocal").split(",");
}

var intervalTemizleyici = setInterval(baslikTemizle,clock);
addButton();

function baslikTemizle(){
	var baslikListesi = document.getElementsByClassName("w ajax sf");
	var targetList = new Array();
	if(baslikListesi == null){
		window.clearInterval(intervalTemizleyici);
		return;
	}
	addButton();
	
	//detect
	for(var i=0 ; i<baslikListesi.length ; i++){
		try{
			for(var j=0 ; j<blackList.length ; j++){
				if(baslikListesi[i].innerHTML.search(blackList[j]) > -1){					//found
					targetList.push(baslikListesi[i].parentNode);
					break;
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
function addButton(){
	if(document.getElementById("baslikFiltreleyiciAyar") == null){
		var button = new Image();
		button.src = "http://icons.iconarchive.com/icons/pixelmixer/basic-2/32/settings-icon.png";
		button.style.marginLeft = "40%";
		button.style.borderStyle = "none";
		button.style.cursor = "pointer";
		button.style.width = "32px";
		button.style.height = "32px";
		button.addEventListener("click",popupSettings,false);
		button.setAttribute("id","baslikFiltreleyiciAyar");
		var listItem = document.createElement("li");
		listItem.appendChild(button);
		var solFrame = document.getElementById("solframe");
		if(solFrame != null){
			solFrame.appendChild(listItem);
		}
	}
}

function popupSettings(){
	var infoMessage = "Şimdiye dek filtreledikleriniz:\n\n";
	for(var j=0 ; j<blackList.length ; j++){
		if(blackList[j]!="")
			infoMessage+="\t-"+blackList[j]+"\n";
	}
	infoMessage += "\nFiltreleme listenize eklemek istediğiniz ifadeyi kutucuğa yazın:\n";
	infoMessage += "(Eğer listeden ifadeyi çıkarmak istiyorsanız adını kutucuğa yazın yeni bir pencere açılacak.)\n\n";
	var data = prompt(infoMessage,"");
	if(data!=null && data!="")
		checkPopupInput(data);
}


function checkPopupInput(data){
	//delete
	for(var j=0 ; j<blackList.length ; j++){
		if(data==blackList[j]){
			if(confirm(blackList[j]+" şeklindeki ifadeyi listeden silmek istediğinize emin misiniz?") == true)
			{
				blackList.splice(j,1);
				if(blackList.length==0){
					GM_deleteValue("blackListLocal");
				}
				else{
					GM_setValue("blackListLocal",blackList.toString());
				}
			}
			return;
		}
	}
	
	//add
	blackList.push(data);
	GM_setValue("blackListLocal",blackList.toString());
	alert(data+" şeklindeki ifade başlıklardan temizlendi!");
}