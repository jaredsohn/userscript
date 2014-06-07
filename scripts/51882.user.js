// ==UserScript==
// @name           Moj T-Mobile Phonebook (Croatian)
// @namespace      frenky.nn@gmail.com
// @include        https://moj.t-mobile.hr/Websms.aspx
// @include        https://moj.t-mobile.hr/Websms.aspx#
// @include        https://mojt-mobile.t.ht.hr/Websms.aspx
// @include        https://mojt-mobile.t.ht.hr/Websms.aspx#
// ==/UserScript==


var id="ctl00_ContentHolder_webSms1_txtBrojPrimatelja";
var key_phonebook_counter="phonebook-counter";
var key_phonebook_prefix="phonebook-entry#";


/** 
** @phonebook_entry=Ime (prezime); broj telefona
**/	
function addEntry(phonebook_entry){
	if (! checkForDuplicates(phonebook_entry)){
		//GM_log("Entry already exists...");
		return;
	}
	var count=GM_getValue(key_phonebook_counter,-1);
	count++;
	var key_phonebook=key_phonebook_prefix+count;
	GM_setValue(key_phonebook, phonebook_entry);
	GM_setValue(key_phonebook_counter, count);
}

function checkForDuplicates (check_phonebook_entry){
	var count=GM_getValue(key_phonebook_counter,0);
	for (i=0;i<=count;i++){
	  var key_phonebook=key_phonebook_prefix+i;
	  var existing_phonebook_entry=GM_getValue(key_phonebook,"ERROR");
	  //GM_log(existing_phonebook_entry+"<>"+check_phonebook_entry);
	  if(existing_phonebook_entry==check_phonebook_entry){
	  	return false;
	  }
	}
	return true;
}

function getAllEntris (){
	var count=GM_getValue(key_phonebook_counter,0);
	for (i=0;i<=count;i++){
	  var key_phonebook=key_phonebook_prefix+i;
	  var phonebook_entry=GM_getValue(key_phonebook,"ERROR");
	}
}

function deleteSingleEntry(entryId){
	var count=GM_getValue(key_phonebook_counter,0);
	for (i=entryId;i<count;i++){
	  var key_phonebook=key_phonebook_prefix+i;
	  GM_deleteValue(key_phonebook);
	  var j=parseInt(i)+1;
	  var key_phonebook_new=key_phonebook_prefix+j;
	  GM_log("key: '"+key_phonebook_new+"'");
	  var phonebook_entry=GM_getValue(key_phonebook_new,"ERROR:ERROR");
	  GM_setValue(key_phonebook, phonebook_entry);
	}
	GM_setValue(key_phonebook_counter, count-1);
  alert ("Deleted entry with ID '"+entryId+"'.");
}

function buildList (divPhonebook){
	var count=GM_getValue(key_phonebook_counter,0);
	var list="";
	for (i=0;i<=count;i++){
	  var key_phonebook=key_phonebook_prefix+i;
	  var phonebook_entry=GM_getValue(key_phonebook,"ERROR:ERROR");
	  
	  var phonebook_entry_array=phonebook_entry.split(":");

  	var tmpA=document.createElement('a');
	  		tmpA.setAttribute("href","#");
	  		tmpA.setAttribute("title","Umetni kontakt '"+ phonebook_entry_array[0] + "' s brojem telefona '"+phonebook_entry_array[1]+"'");
	  		tmpA.setAttribute("onClick",'document.getElementById("ctl00_ContentHolder_webSms1_txtBrojPrimatelja").value="'+phonebook_entry_array[1]+'";'+"document.getElementById('phonebook_kf').parentNode.removeChild(document.getElementById('phonebook_kf'),true);");
	  		tmpA.innerHTML="&nbsp;&nbsp;"+i+") "+phonebook_entry_array[0]+", "+phonebook_entry_array[1];

  	var tmpB=document.createElement('a');
	  		tmpB.setAttribute("id","deleteEntry"+i);
	  		tmpB.setAttribute("phBookEntry",""+i);
	  		tmpB.setAttribute("onClick","document.getElementById('phonebook_kf').parentNode.removeChild(document.getElementById('phonebook_kf'),true);");
	  		tmpB.setAttribute("href","#"+i);
	  		tmpB.setAttribute("title","Obrisi unos iz imenika");
	  		tmpB.innerHTML="[x]";
	  
	  var tmpLi=document.createElement('li');
	  		tmpLi.setAttribute("id","li"+i);
	  		tmpLi.setAttribute("style","list-style-type: none; width: 100%;");
	  		tmpLi.appendChild(tmpB);
	  		tmpLi.appendChild(tmpA);
	  divPhonebook.appendChild(tmpLi);
	}
	return list;
}


function buildPhonebookDiv(){
	var divPhonebook=document.createElement('div');
	divPhonebook.setAttribute("id","phonebook_kf");
	divPhonebook.setAttribute("style","position: absolute; left:50; top:100; overflow: auto;width: 258px; height: 150px; border: 2px #BCBCBC solid;	background-color: #FFFFFF;color: #FFFFFF;");
	buildList(divPhonebook);
	
	divPhonebook.appendChild(document.createElement('br'));
	var centerEl =document.createElement('center');
	var liEl=document.createElement('li');
			liEl.setAttribute("style","list-style-type: none;");
			
	var aEl=document.createElement('a');
			aEl.setAttribute("href","#");
			aEl.setAttribute("onClick","document.getElementById('phonebook_kf').parentNode.removeChild(document.getElementById('phonebook_kf'),true);");
			aEl.innerHTML="[Zatvori imenik]";

	liEl.appendChild(aEl);
	centerEl.appendChild(liEl);
	divPhonebook.appendChild(centerEl);

 	return divPhonebook;
}

function deleteAllEntris(){
	var count=GM_getValue(key_phonebook_counter,0);
	for (i=0;i<=count;i++){
	  var key_phonebook=key_phonebook_prefix+i;
	  GM_deleteValue(key_phonebook);
	}
	GM_setValue(key_phonebook_counter, -1);
	alert("All entris are deleted...");
}

function helloworld() {
    var brojPrimateljaInput = document.getElementById(id);
    var pNode=brojPrimateljaInput.parentNode;
    pNode.innerHTML=brojPrimateljaInput.parentNode.innerHTML+"<a id=\"dodaj_kf\" href=\"#\" onclick=\"document.getElementById('phonebook_kf').parentNode.removeChild(document.getElementById('phonebook_kf'),true);\">[Dodaj]</a> <a id=\"izlistaj_kf\"href=\"#\" onClick=\"\">[Otvori imenik]</a>";
    var aDodaj=document.createElement('a');
    pNode.appendChild(aDodaj);
    
    document.getElementById("dodaj_kf").addEventListener('click', function(event) {
      var ime_prezime = prompt ("Koje ime ide uz broj telefona '"+document.getElementById(id).value+"'");
      var ime_prezime_array=ime_prezime.split(":");
      if (ime_prezime && ime_prezime.length && ime_prezime_array.length==1){
      	addEntry(ime_prezime+":"+document.getElementById(id).value);
      }else{
      	alert ("Morate upisati barem jedan znak i ne koristiti znak dvotocke (:)!");
      }
      //todo dodati lijep button da je dodano u phonebook...
      event.stopPropagation();
      event.preventDefault();
    }, true);
    document.getElementById("izlistaj_kf").addEventListener('click', function(event) {
      getAllEntris ();
      document.getElementById("izlistaj_kf").parentNode.appendChild(buildPhonebookDiv());
      
      for (i=0;i<=GM_getValue(key_phonebook_counter,0);i++){
				document.getElementById("deleteEntry"+i).addEventListener('click', function(event) {
       	  deleteSingleEntry(event.target.getAttribute('phBookEntry'));
    	 }, false);
			}

      
      event.stopPropagation();
      event.preventDefault();
    }, true);

    var count =1;
}


(function(){
	helloworld();
	GM_registerMenuCommand("Delete all phonebook entries...", function() {
 		deleteAllEntris();
	});

})(); 

