// ==UserScript==
// @name       HS-AlbSig Klausuraktualisierer
// @namespace  https://qis.hs-albsig.de/*
// @version    1.0
// @description  enter something useful
// @match      https://qis.hs-albsig.de/*
// @copyright  2012+, Christopher Koch
// ==/UserScript==

examList = new Array();
modulList = new Array();
notes = "Achtung! \r\nBestandene Leistungen werden erst miteinberechnet wenn das komplette Modul bestanden ist!";
klausurInfos = "";

function initModul(){
    elements = document.getElementsByTagName('tr');
    for(i=10; i < elements.length; i++){
        isIn = 0;
        try{
            fachNr = elements[i].getElementsByTagName('td')[0].innerHTML;
            fachNr = fachNr.replace('<b>', '');
            fachNr = fachNr.replace('&nbsp;</b>','');
            fachNr = fachNr.replace(/\s/g, "");
            
            fach = elements[i].getElementsByTagName('td')[1].innerHTML;
            fach = fach.replace('<font color="green">','');
            fach = fach.replace('<b>&nbsp;','');
            fach = fach.replace('</b>','');
            fach = fach.replace('</font>','');
            fach = fach.replace(/\s/g, "");
            try{
                fach = fach.replace('<font>','');
            }catch(e){}
            try{
                fach = fach.replace('<b>','');
            }catch(e){}
            try{
                fach = fach.replace('<font color="red">','');
            }catch(e){}
            
            modul = elements[i].getElementsByTagName('td')[6].innerHTML;
            modul = modul.replace(/\s/g, "");
            modul = modul.replace('<b>&nbsp;','');
            modul = modul.replace('</b>','');
            if(modul == "MO"){
                
                failed = elements[i].getElementsByTagName('td')[4].innerHTML;
                failed = failed.replace('<font color="green">','');
                failed = failed.replace('<b>&nbsp;','');
                failed = failed.replace('</b>','');
                failed = failed.replace('</font>','');
                failed = failed.replace(/\s/g, "");
                try{
                    failed = failed.replace('<font>','');
                }catch(e){}
                try{
                    failed = failed.replace('<font color="red">','');
                }catch(e){}
                
                if(failed == "bestanden"){
                    note = elements[i].getElementsByTagName('td')[3].innerHTML;
                    note = note.replace("<b>&nbsp;", "");
                    note = note.replace("</b>", "");
                    note = note.replace(/\s/g, "");
                    note = note.slice(0, 3);
                
                    ects = elements[i].getElementsByTagName('td')[5].innerHTML;
                    ects = ects.replace(/\s/g, "");
                    ects = ects.replace('<b>','');
                    ects = ects.replace('&nbsp;</b>','');
                
                	modulList.push(new Array(fachNr, fach, ects, note));
                }
                
            }
            
        }catch (e){}
    }
    createSchnitt();
    createModulInfos();
}

function init(){
    elements = document.getElementsByTagName('tr');
    tmpList = new Array();
    for(i=10; i < elements.length; i++){
        isIn = 0;
        try{
            fachNr = elements[i].getElementsByTagName('td')[0].innerHTML;
            fachNr = fachNr.replace('<b>', '');
            fachNr = fachNr.replace('&nbsp;</b>','');
            fachNr = fachNr.replace(/\s/g, "");
            
            failed = elements[i].getElementsByTagName('td')[4].innerHTML;
            failed = failed.replace('<font color="green">','');
            failed = failed.replace('<b>&nbsp;','');
            failed = failed.replace('</b>','');
            failed = failed.replace('</font>','');
            failed = failed.replace(/\s/g, "");
            try{
                failed = failed.replace('<font>','');
            }catch(e){}
            try{
                failed = failed.replace('<font color="red">','');
            }catch(e){}
            
            if(failed == "Prüfungvorhanden"){
                tmpList.push(fachNr);
            }
            
        }catch (e){}
    }
    examList = tmpList;
    localStorage.setItem("examList", tmpList.toString());
}

function checkAndReload(examList){
	elements = document.getElementsByTagName('tr');
    for(i=10; i < elements.length; i++){
        isIn = 0;
        try{
            fachNr = elements[i].getElementsByTagName('td')[0].innerHTML;
            fachNr = fachNr.replace('<b>', '');
            fachNr = fachNr.replace('&nbsp;</b>','');
            fachNr = fachNr.replace(/\s/g, "");
            
            for(j = 0; j < examList.length; j++){
                if(examList[j] == fachNr){
                	isIn = 1;
                }
            }
            
            if(isIn == 1){
                failed = elements[i].getElementsByTagName('td')[4].innerHTML;
                failed = failed.replace('<font color="green">','');
                failed = failed.replace('<b>&nbsp;','');
                failed = failed.replace('</b>','');
                failed = failed.replace('</font>','');
                failed = failed.replace(/\s/g, "");
                try{
                    failed = failed.replace('<font>','');
                }catch(e){}
                try{
                    failed = failed.replace('<font color="red">','');
                }catch(e){}
                
                fach = elements[i].getElementsByTagName('td')[1].innerHTML;
                fach = fach.replace('<font color="green">','');
                fach = fach.replace('<b>&nbsp;','');
                fach = fach.replace('</b>','');
                fach = fach.replace('</font>','');
                fach = fach.replace(/\s/g, "");
                try{
                    fach = fach.replace('<font>','');
                }catch(e){}
                try{
                    fach = fach.replace('<b>','');
                }catch(e){}
                try{
                    fach = fach.replace('<font color="red">','');
                }catch(e){}
                    
                if(failed != "Prüfungvorhanden"){
                    note = elements[i].getElementsByTagName('td')[3].innerHTML;
                    note = note.replace("<b>&nbsp;", "");
                    note = note.replace("</b>", "");
                    note = note.replace(/\s/g, "");
                    note = note.slice(0, 3);
                    if(note != ""){
                    	note = " mit " + note;
                    }
                	alert("Du hast " + fach + " " + failed + note);
                    
                    init();
                }
            }
        }catch (e){}
    }
}

function createFrozenMenu(schnittTmp, ectsTmp){
    if(ectsTmp == 0){
        return
    }
	fMenu = document.createElement('div');
	fMenu.id = "fmenu";
    fMenu.style.position = "fixed";
    fMenu.style.width = "90%";
    fMenu.style.top = "5px";
    fMenu.style.left = "5%";
    fMenu.style.background = "url(https://qis.hs-albsig.de/HISinOne/images/icons/gradient_blue.gif)";
    fMenu.style.border = "1px solid #5381BE";
    fMenu.style.boxShadow = "3px 3px 10px rgba(0,0,0,0.5)";
    fMenu.style.borderRadius = "5px 5px 5px 5px";
    fMenu.style.color = "white";
    fMenu.style.padding = "5px";
    fMenu.innerHTML = '<b style="font-size: 12px">Gesamt-ECTS: ' + ectsTmp + '&nbsp;&nbsp;&nbsp;Aktueller Schnitt: ' + schnittTmp
    + '&nbsp;&nbsp;&nbsp;<a href="#" onClick="alert(notes)">Info</a>' + '</b>';
	document.body.appendChild(fMenu);
}

function createSchnitt(){
	ects = 0;
	schnitt = 0;
    noten = 0;
    for(i = 0; i < modulList.length; i++){
        ects += parseFloat(modulList[i][2]);
        noten += parseFloat(modulList[i][3]);
    }
    schnitt = (noten * ects) / (modulList.length * ects);
    createFrozenMenu(schnitt, ects);
}

function createModulInfos(){

    kInfos = "Modulinformationen: \r\n";
    maxLength = 0;
    for(i = 0; i < modulList.length; i++){
        if(modulList[i][1].length > maxLength){
        	maxLength = modulList[i][1].length;
        }
    }
    for(i = 0; i < modulList.length; i++){
    	kInfos += modulList[i][0];
        kInfos += " : ";
        kInfos += modulList[i][1];
        kInfos += " : ";
        for(j = 0; j + modulList[i][1].length < maxLength; j++){
        	kInfos += " ";
        }
        kInfos += modulList[i][2];
        kInfos += " : ";
        kInfos += modulList[i][3];
        kInfos += "\r\n";
    }
    console.log(kInfos);
}

if(localStorage.getItem("examList") != null){
    examList = localStorage.getItem("examList").split(',');
} else {
    init();
}
initModul();
checkAndReload(examList);
window.setInterval(function(){location.reload();}, 100000);