// ==UserScript==
// @name       Auto Puas Script 
// @namespace  http://kartalonus.blogspot.com/
// @version    1
// @description  enter something useful
// @match      http://academic.ittelkom.ac.id/survey/*
// @copyright  2013, usr.agung/Kartalonus
// ==/UserScript==

body = document.body;

if(body != null){
	pilihContainer = document.createElement("div");
    pilihContainer.id = "pilihContainer";
    pilihContainer.style.position = "fixed";
    pilihContainer.style.display = "block";
    pilihContainer.style.width = "130px";
    pilihContainer.style.height = "100px";
    pilihContainer.style.bottom = "75px";
    pilihContainer.style.right = "15px";
    pilihContainer.style.textAlign = "center";
    pilihContainer.style.backgroundColor = "red";
    body.appendChild(pilihContainer);
    
    var pilihan = new Array();
    
    for(var i=0;i<5;i++){
    	pilihan[i] = document.createElement("div");
        pilihan[i].style.height = "20px";
        pilihan[i].style.bottom = (i * 20) + "px"; 
        pilihan[i].style.paddingTop = "7px";
        
        if(i==0){
        	pilihan[i].style.backgroundColor = "#55FF55";
			pilihan[i].innerHTML = "<a onclick='pilih(0)'>Sangat Puas</a>";
        }else if(i==1){
        	pilihan[i].style.backgroundColor = "#C4F7A2";
			pilihan[i].innerHTML = "<a onclick='pilih(1)'>Puas</a>";
        }else if(i==2){
        	pilihan[i].style.backgroundColor = "#FFFF7F";
			pilihan[i].innerHTML = "<a onclick='pilih(2)'>Cukup</a>";
        }else if(i==3){
        	pilihan[i].style.backgroundColor = "#FF2A7F";
			pilihan[i].innerHTML = "<a onclick='pilih(3)'>Tidak Puas</a>";
        }else{
        	pilihan[i].style.backgroundColor = "#E84940";
			pilihan[i].innerHTML = "<a onclick='pilih(4)'>Sangat Tidak Puas</a>";
        }
        
    	pilihContainer.appendChild(pilihan[i]);
    }
    
    unsafeWindow.pilih = function(pilihan){
    	var allElems = document.getElementsByTagName('input');
		
        for (i = 0; i < allElems.length; i++) {
			if (allElems[i].type == 'radio' && allElems[i].className == 'styled') {
        		for(var j = pilihan; j < answerList.length; j += 5){
					if(allElems[i].value == answerList[j]){
                    	allElems[i].checked = true;
					}
				}
			}
		}
        
        var answer20 = document.getElementsByName("Answer20");
        if(answer20[0] != null){
            answer20[0].value = "Auto Survey by PointPoint :3";
        }
        
        var check = document.getElementById("form2");
        if(check == null){
            var check = document.getElementById("form1");
        }
    	check.submit();
    }
   
    var checkUpdate = document.getElementById("form2");
    
	if(checkUpdate != null){
		checkUpdate.submit();
    }
    
    var answerList = new Array();
    var x = 0;
    
	var radioElems = document.getElementsByTagName('input');
	for (i = 0; i < radioElems.length; i++) {
        if(radioElems[i].type == 'radio' && radioElems[i].className == 'styled'){
            answerList[x] = radioElems[i].value;
            x++;
        }
    }
}