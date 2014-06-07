// ==UserScript==
// @name           Jobfilter
// @namespace      http://userscripts.org/users/75950
// @description    Filter Personalvermittlungen und Zeitarbeitsfirmen
// @include        https://jobboerse.arbeitsagentur.de/vamJB/stellenangeboteFinden.html*
// @include        http://jobboerse.arbeitsagentur.de/vamJB/stellenangeboteFinden.html*
// @include        http://www.jobinfo24.de/forum/*
// @include        http://www.jobmonitor.com/jobs-stellenangebote/*
// @include        http://www.jobomat.de/main?*
// @include        https://arbeit-regional.de/arbeitregional/*
// @include        http://www.stellenanbieter.de/?id=*
// @include        http://online-stellenmarkt.net/index.php?suche=*
// @include        http://www.online-stellenmarkt.net/index.php?suche=*
// @include        http://jobturbo.de/metasuche.aspx?*
// @include        http://www.indeed.de/Jobs?*
// @include        http://www.jobscout24.de/Jobs_Ergebnisliste.html?*
// @include        https://www.jobscout24.de/Jobs_Ergebnisliste.html?*
// @version        3.3.1
// ==/UserScript==

var theUngeraden = null;
var theGeraden = null;
var theCommon = null;

if(document.domain=='www.jobscout24.de') {
	theUngeraden = document.getElementsByClassName('vacancyItemContentStandardWhite');
	theGeraden = document.getElementsByClassName('vacancyItemContentStandardHighlighted');
	theCommon = document.getElementsByClassName('vacancyItemContentJobsDe');
}

if(document.domain=='jobboerse.arbeitsagentur.de') {
	theUngeraden = document.getElementsByClassName('ungerade');
	theGeraden = document.getElementsByClassName('gerade');
}

if(document.domain=='www.jobinfo24.de') {
	theUngeraden = document.getElementsByClassName('mod_row1');
	theGeraden = document.getElementsByClassName('mod_row2');
}

if(document.domain=='www.jobmonitor.com') {
	theUngeraden = document.getElementsByClassName('searchList');
}

if(document.domain=='www.jobomat.de') {
	theUngeraden = document.getElementsByClassName('trli');
}

if(document.domain=='arbeit-regional.de') {
	theUngeraden = document.getElementsByClassName('datatable')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
}

if(document.domain=='www.stellenanbieter.de') {
	theUngeraden = document.getElementsByClassName('zeile-odd');
	theGeraden = document.getElementsByClassName('zeile');
}

if(document.domain=='online-stellenmarkt.net' || document.domain=='www.online-stellenmarkt.net') {
	theUngeraden = document.getElementsByClassName('sttable');
}

if(document.domain=='jobturbo.de') {
	theUngeraden = document.getElementById('ctl00_ContentPlaceHolder1_DataList_JobList').getElementsByTagName('tr');
}

if(document.domain=='www.indeed.de') {
	theUngeraden = document.getElementsByClassName('row');
}

var theFilter = ['Personal', 'Call', 'Zeit', 'Time', 'Agentur', 'M. Thiele', 'Plettenberg', 'Arbeitsvermittlung', 'Buscha', 'Fleischmann-Hahn', 'together group', 'jobs nach mass', 'Deutsche Angestellten Akademie', 'AKPM', 'Sitel', 'K&S-Kommunikation & Service GmbH', 'maXXu GmbH', 'i-potentials GmbH', 'Premium Consultants', 'Mairinger', 'Expero', 'Randstad', 'Permacon', 'Allround Service', 'riedel-personal', 'PRIMAJOB AG', 'FRANZ & WACH', 'STF Placement', 'persona service', 'Scheerbaums Erben', 'Kelly Services', 'Education Campus', 'PersOrange', 'Manpower', 'Job@ctive', 'headwayengineers', 'AlphaConsult', 'AGO', 'DIE WEGBEREITER', 'Bic Consult', 'serviceline', 'www.fairnes-work.de', 'yd. yourdelivery UG', 'KundS', 'Perso Plankontor', 'TEMPTON'];
var theAction = 'Ausblenden';

if(GM_getValue('filter')) {
	theFilter = JSON.parse(GM_getValue('filter'));
} else {
	GM_setValue('filter', JSON.stringify(theFilter));
}
if(GM_getValue('action')) {
	theAction = GM_getValue('action');
} else {
	GM_setValue('action', 'Ausblenden');
}

for(i=0; i<theUngeraden.length; i++) {
	for(j=0; j<theFilter.length; j++) {
		if(theUngeraden[i].textContent.indexOf(theFilter[j]) != -1) {
			switch(theAction) {
				case 'Ausblenden': theUngeraden[i].style.display = 'none';break;
				case 'Farbig hinterlegen':
					theUngeraden[i].style.backgroundColor = 'orange';
					var theTD = theUngeraden[i].getElementsByTagName('td');
					for(k=0; k<theTD.length; k++) theTD[k].style.backgroundColor = 'orange';
					break;
			}
		}
	}
}

if(theGeraden)
for(i=0; i<theGeraden.length; i++) {
	for(j=0; j<theFilter.length; j++) {
		if(theGeraden[i].textContent.indexOf(theFilter[j]) != -1) {
			switch(theAction) {
				case 'Ausblenden': theGeraden[i].style.display = 'none';break;
				case 'Farbig hinterlegen':
					theGeraden[i].style.backgroundColor = 'orange';
					var theTD = theGeraden[i].getElementsByTagName('td');
					for(k=0; k<theTD.length; k++) theTD[k].style.backgroundColor = 'orange';
					break;
			}
		}
	}
}

if(theCommon)
for(i=0; i<theCommon.length; i++) {
	for(j=0; j<theFilter.length; j++) {
		if(theCommon[i].textContent.indexOf(theFilter[j]) != -1) {
			switch(theAction) {
				case 'Ausblenden': theCommon[i].style.display = 'none';break;
				case 'Farbig hinterlegen':
					theCommon[i].style.backgroundColor = 'orange';
					var theTD = theCommon[i].getElementsByTagName('td');
					for(k=0; k<theTD.length; k++) theTD[k].style.backgroundColor = 'orange';
					break;
			}
		}
	}
}

// SCRIPT USERSCRIPT PREFERENCES
// VERSION 1.0.4deutsch jobboerse
// Shows a div-Window and darkens the page for userscript preference values
var USP = {
    node: null,
    darken: null,
    valueList: null,
    theScriptName: 'Jobfilter',
    prefPrefix: '',
    isVisible: false,
    CSS: ''+
        '#US-prefs,#US-prefs *{font-size:12px;font-weight:normal;font-style:normal;font-family:tahoma,arial,sans-serif;color:#000;text-transform:none;text-decoration:none;letter-spacing:normal;word-spacing:normal;line-height:normal;vertical-align:baseline;direction:ltr;background:transparent none repeat scroll 0 0;opacity:1;position:static;visibility:visible;z-index:auto;overflow:visible;white-space:normal;clip:auto;float:none;clear:none;cursor:auto;text-align:center}/*preserve defaults*/\n\n'+
        '#US-prefs{display:block;position:fixed;z-index:999;border:1px solid #000;-moz-border-radius:5px;background:rgb(180,180,180) none;color:#FFF0CF;width:400px}\n'+
        '#US-darken,#US-darken *{background:transparent none repeat scroll 0 0;opacity:0.7;position:static;visibility:visible;z-index:auto;overflow:visible;white-space:normal;clip:auto;float:none;clear:none;cursor:auto}/*preserve defaults*/\n\n'+
        '#US-darken{height:100%;width:100%;display:block;position:fixed;z-index:998;background:rgb(0,0,0) none}\n'+
        '   #US-prefs>h1{text-align:center;display:block;font-size:2em;font-weight:normal;border:0;margin:0;padding:0}\n'+
        '   #US-prefs p{display:block;margin:5px 10px 1em 5px;font-family:arial,sans-serif}\n'+
        '   #US-prefs p>b{font-weight:bold}\n'+
        '   #US-prefs>div{display:block;width:300px;margin:0 auto;text-align:right;}\n'+
        '   #US-prefs>div>div{display:block;width:300px;margin:0 auto;text-align:center}\n'+
        '   .US-radio{margin:0.2em auto !important;padding:2px 2px;border:1px solid #000;-moz-border-radius:3px;}\n'+
        '   .US-radio div{display:block;width:100%;margin:0 auto;text-align:left !important;font-weight:bold !important}\n'+
        '   #US-prefs input, #US-prefs select{width: auto;text-align:left;margin:0.7em 0;padding:0 6px;background:#FFE1A2;border:1px solid #000;-moz-border-radius:4px;border-color:#5F3E00 #5F3E00 #000 #5F3E00;font-family:verdana,arial,sans-serif}\n'+
        '   #US-prefs>div>div input{margin:0 0;padding:0 0;background:#FFE1A2;border:1px solid #000;-moz-border-radius:4px;border-color:#5F3E00 #5F3E00 #000 #5F3E00;font-family:verdana,arial,sans-serif}',
    init: function() {
        var theStyle=document.createElement("style");
        USP.valueList=arguments;
        theStyle.setAttribute('type','text/css');
        //document.body.appendChild(theStyle).innerHTML=USP.CSS;
        document.getElementsByTagName('head')[0].appendChild(theStyle).innerHTML=USP.CSS;

        USP.prefPrefix='\n   <h1>Userscript Optionen</h1>\n   <p>Bitte nehmen Sie Ihre Einstellungen vor f&uuml;r das Skript<br><b>'+USP.theScriptName+'</b></p>\n<div class="USP-values"></div><input class="button" type="button" value="Speichern">&nbsp;&nbsp;<input class="button" type="button" value="Speichern & Neu laden">&nbsp;&nbsp;<input class="button" type="button" value="Abbrechen"><br><input class="button" type="button" value="Updates?">\n';
        USP.node=document.createElement("div");
        USP.node.innerHTML='<div>'+USP.prefPrefix+'</div>';
        USP.node=USP.node.firstChild;
        USP.node.id="US-prefs";
        USP.node.parentNode.removeChild(USP.node);
        USP.darken=document.createElement("div");
        USP.darken.innerHTML='<div></div>';
        USP.darken=USP.darken.firstChild;
        USP.darken.id="US-darken";
        USP.darken.parentNode.removeChild(USP.darken);
    },
    cb:{},
    EL:
      function(e) {
         var E=e.type.toLowerCase().replace(/^on/i,""),i=0,n=e.target;
         if(!USP.cb[E])return;
         for(;i<USP.cb[E].length;i++) {
            if(USP.cb[E][i][0]==n) return USP.cb[E][i][1].call(n,e)
         }// no callbacks found
      },
    addEventListener:
      function(n,E,f) {
         if(!n+!f)return !1;
         if(!USP.cb[E]){USP.cb[E]=[];USP.node.addEventListener(E,function(e){USP.EL(e)},!0)}
         USP.cb[E].push([n,f]);
         return !0;
      },
    removeEventListener:
      function(n,E,f) {
         if(!n+!E+!f+!USP.cb[E])return;
         for(var i=0;i<USP.cb[E].length;i++) {
            if(USP.cb[E][i][0]==n&&USP.cb[E][i][1]==f)return !(USP.cb[E].splice(i,1))||undefined;
         }
      },

    showWindow: function (){
        document.body.appendChild(USP.darken);
        document.body.appendChild(USP.node);
        USP.isVisible=true;
    },
    
    styleWindow: function() {
        if(typeof SVC=='undefined') {
        	USP.node.getElementsByClassName("button")[3].style.display='none';
        }
        if(USP.valueList.length==0) {
        	USP.node.getElementsByClassName("button")[0].style.display='none';
        	USP.node.getElementsByClassName("button")[1].style.display='none';
        }
        USP.darken.style.left=USP.darken.style.top="50%";
        USP.darken.style.marginLeft=-(USP.darken.offsetWidth/2)+"px";
        USP.darken.style.marginTop=-(USP.darken.offsetHeight/2)+"px";
        USP.node.style.left=USP.node.style.top="50%";
        USP.node.style.marginLeft=-(USP.node.offsetWidth/2)+"px";
        USP.node.style.marginTop=-(USP.node.offsetHeight/2)+"px";
        if(USP.valueList.length>0) {
	        USP.addEventListener(USP.node.getElementsByClassName("button")[0],"click",USP.saveValues);
	        USP.addEventListener(USP.node.getElementsByClassName("button")[1],"click",USP.saveValuesAndReload);
	}
        USP.addEventListener(USP.node.getElementsByClassName("button")[2],"click",USP.killWindow);
        for(var i=0; i<USP.valueList.length; i++) {
        	if(typeof USP.valueList[i].theDefault=='object' && USP.valueList[i].theDefault.length) {
		        USP.addEventListener(USP.node.getElementsByClassName("USP-DelButton"+i)[0],"click",function() {
		        	// Delete button clicked
		        	var theValueNumber = this.className.substring(13);
		        	for(var j=0; j<USP.node.getElementsByClassName('USP-field'+theValueNumber).length; j++) {
		        		if(USP.node.getElementsByClassName('USP-field'+theValueNumber)[j].selected) {
		        			USP.node.getElementsByClassName('USP-field'+theValueNumber)[j].parentNode.removeChild(USP.node.getElementsByClassName('USP-field'+theValueNumber)[j]);
		        		}
		        	}
		        });
		        USP.addEventListener(USP.node.getElementsByClassName("USP-AddButton"+i)[0],"click",function() {
		        	// Add button clicked
		        	var theValueNumber = this.className.substring(13);
		        	var theNewValue=USP.node.getElementsByClassName('USP-AddText'+theValueNumber)[0].value;
		        	if(theNewValue!='') {
			        	var theCurrentSelect=USP.node.getElementsByClassName('USP-select'+theValueNumber)[0];
	                       		theCurrentSelect.innerHTML+='<option class="USP-field'+theValueNumber+'" value="'+theNewValue+'">'+theNewValue+'</option>';
			        	USP.node.getElementsByClassName('USP-AddText'+theValueNumber)[0].value='';
			        }
		        });
		        USP.addEventListener(USP.node.getElementsByClassName("USP-EdtButton"+i)[0],"click",function() {
		        	// Edit button clicked, same as Delete button but edit field will be filled
		        	var theValueNumber = this.className.substring(13);
					var theOldValue = '';
		        	for(var j=0; j<USP.node.getElementsByClassName('USP-field'+theValueNumber).length; j++) {
		        		if(USP.node.getElementsByClassName('USP-field'+theValueNumber)[j].selected) {
							theOldValue = USP.node.getElementsByClassName('USP-field'+theValueNumber)[j].value;
		        			USP.node.getElementsByClassName('USP-field'+theValueNumber)[j].parentNode.removeChild(USP.node.getElementsByClassName('USP-field'+theValueNumber)[j]);
		        		}
		        	}
					USP.node.getElementsByClassName('USP-AddText'+theValueNumber)[0].value = theOldValue;
		        });
		        USP.addEventListener(USP.node.getElementsByClassName("USP-SrtButton"+i)[0],"click",function() {
		        	// Sort button clicked
		        	var theValueNumber = this.className.substring(13);
					USP.node.getElementsByClassName('USP-select'+theValueNumber)[0].style.backgroundColor = 'lightgrey';
					window.setTimeout(function() {
						for(var j=0; j<(USP.node.getElementsByClassName('USP-field'+theValueNumber).length-1); j++) {
							for(var k=j+1; k<USP.node.getElementsByClassName('USP-field'+theValueNumber).length; k++) {
								var erster = USP.node.getElementsByClassName('USP-field'+theValueNumber)[j].value;
								var zweiter = USP.node.getElementsByClassName('USP-field'+theValueNumber)[k].value;
								if(erster.toLowerCase()>zweiter.toLowerCase()) {
									//Tauschen
									USP.node.getElementsByClassName('USP-field'+theValueNumber)[k].value = erster;
									USP.node.getElementsByClassName('USP-field'+theValueNumber)[k].innerHTML = erster;
									USP.node.getElementsByClassName('USP-field'+theValueNumber)[j].value = zweiter;
									USP.node.getElementsByClassName('USP-field'+theValueNumber)[j].innerHTML = zweiter;
								}
							}
						}
						USP.node.getElementsByClassName('USP-select'+theValueNumber)[0].style.backgroundColor = '';
					}, 100);
		        });
		}
	}
        if(typeof SVC!='undefined') USP.addEventListener(USP.node.getElementsByClassName("button")[3],"click",SVC.versionInfo.manualChecking);
    },

    killWindow: function(){
        USP.node.innerHTML=USP.prefPrefix;
        USP.node.parentNode.removeChild(USP.node);
        USP.darken.parentNode.removeChild(USP.darken);
        USP.isVisible=false;
    },
    
    saveValues: function(){
    	var newValue;
        for(var i=0;i<USP.valueList.length;i++) {
            switch(typeof USP.valueList[i].theDefault) {
                case 'boolean':
                    newValue=USP.node.getElementsByClassName('USP-field'+i)[0].checked;
                    break;
                case 'number':
                    newValue=parseInt(USP.node.getElementsByClassName('USP-field'+i)[0].value);
                    break;
                case 'string':
              	    if(USP.valueList[i].theValues) {
			for(var j=0; j<USP.node.getElementsByClassName('USP-field'+i).length; j++) {
				if(USP.node.getElementsByClassName('USP-field'+i)[j].checked) newValue=USP.node.getElementsByClassName('USP-field'+i)[j].value;
			}
              	    } else {
			newValue=USP.node.getElementsByClassName('USP-field'+i)[0].value;
                    }
                    break;
                case 'object':
	            if(USP.valueList[i].theDefault.length) {
	            	// construct a JSON string from option Array
	            	newValue = '[';
			for(var j=0; j<USP.node.getElementsByClassName('USP-field'+i).length; j++) {
				newValue += '"'+USP.node.getElementsByClassName('USP-field'+i)[j].value+'",';
			}
			if(USP.node.getElementsByClassName('USP-field'+i).length == 0) {
				newValue = '[]';
			} else {
	            		newValue = newValue.substring(0, newValue.length-1) + ']';
	            	}
	            }
	            break;
            }
            GM_setValue(USP.valueList[i].theName, newValue);
        }
        USP.killWindow();
    },
    
    saveValuesAndReload: function(){
        USP.saveValues();
        window.location.reload();
    },
    
    getValue: function(valueName){
	if(GM_getValue(valueName) != undefined) {
	    var PrefValue = GM_getValue(valueName);
            for(var i=0;i<USP.valueList.length;i++) {
            	if(USP.valueList[i].theName==valueName && typeof USP.valueList[i].theDefault=='object' && USP.valueList[i].theDefault.length) PrefValue = eval(' '+PrefValue+' ');
            }
	    return PrefValue;
	} else {
            for(var i=0;i<USP.valueList.length;i++) {
            	if(USP.valueList[i].theName==valueName) return USP.valueList[i].theDefault;
	    }
	}
    },
    
    invoke: function(){
        if(!USP.isVisible) {
            USP.showWindow();
            for(var i=0;i<USP.valueList.length;i++) {
            	var curVal;
                if(GM_getValue(USP.valueList[i].theName)!=undefined) {
                    curVal=GM_getValue(USP.valueList[i].theName);
                    if(typeof USP.valueList[i].theDefault=='object' && USP.valueList[i].theDefault.length) {
                    	// eval JSON string if theDefault is an Array
                    	curVal = eval(' '+curVal+' ');
                    }
                } else {
                    curVal=USP.valueList[i].theDefault;
                }
                switch(typeof USP.valueList[i].theDefault) {
                    case 'boolean':
                        var isChecked='';
                        if(curVal) isChecked=' checked';
                        USP.node.getElementsByClassName('USP-values')[0].innerHTML+='<div>'+USP.valueList[i].theText+' <input class="USP-field'+i+'" type="checkbox" name="'+USP.valueList[i].theName+'"'+isChecked+'></div><br>';
                        break;
                    case 'number':
                    case 'string':
                    	if(USP.valueList[i].theValues) {
                        	var newDiv=document.createElement('div');
                        	newDiv.setAttribute('class', 'US-radio');
                        	newDiv.innerHTML='<div>'+USP.valueList[i].theText+'</div>';
	                        var isChecked;
                        	for(var j=0; j<USP.valueList[i].theValues.length; j++) {
		                        if(USP.valueList[i].theValues[j]==curVal) {isChecked=' checked';} else {isChecked='';}
                        		newDiv.innerHTML+='<p><input class="USP-field'+i+'" type="radio" name="'+USP.valueList[i].theName+'" value="'+USP.valueList[i].theValues[j]+'"'+isChecked+'> '+USP.valueList[i].theValues[j]+'</p>';
                        	}
                        	USP.node.getElementsByClassName('USP-values')[0].appendChild(newDiv);
                    	} else {
                        	USP.node.getElementsByClassName('USP-values')[0].innerHTML+=USP.valueList[i].theText+' <input class="USP-field'+i+'" type="text" size="30" name="'+USP.valueList[i].theName+'" value="'+curVal+'"><br>';
                        }
                        break;
                    case 'object':
                        if(USP.valueList[i].theDefault.length) {
                        	// An object with length is an Array
                        	var newDiv=document.createElement('div');
                        	newDiv.setAttribute('class', 'US-radio');
                        	newDiv.innerHTML='<div>'+USP.valueList[i].theText+'</div>';
                        	var newSelect=document.createElement('select');
                        	newSelect.setAttribute('name',USP.valueList[i].theName);
                        	newSelect.setAttribute('size', '5');
                        	newSelect.setAttribute('class', 'USP-select'+i);
                        	for(var j=0; j<curVal.length; j++) {
                        		newSelect.innerHTML+='<option class="USP-field'+i+'" value="'+curVal[j]+'">'+curVal[j]+'</option>';
                        	}
                        	newDiv.appendChild(newSelect);
                        	newDiv.innerHTML+='<br />';
                        	var newButton = document.createElement('input');
                        	newButton.setAttribute('type', 'button');
                        	newButton.setAttribute('value', 'X');
                        	newButton.setAttribute('class', 'USP-DelButton'+i);
                        	newDiv.appendChild(newButton);
                        	newDiv.innerHTML+='&nbsp;';
                        	newButton = document.createElement('input');
                        	newButton.setAttribute('type', 'button');
                        	newButton.setAttribute('value', '^');
                        	newButton.setAttribute('class', 'USP-AddButton'+i);
                        	newDiv.appendChild(newButton);
                        	newDiv.innerHTML+='&nbsp;';
                        	newButton = document.createElement('input');
                        	newButton.setAttribute('type', 'button');
                        	newButton.setAttribute('value', 'v');
                        	newButton.setAttribute('class', 'USP-EdtButton'+i);
                        	newDiv.appendChild(newButton);
                        	newDiv.innerHTML+='&nbsp;';
                        	newButton = document.createElement('input');
                        	newButton.setAttribute('type', 'button');
                        	newButton.setAttribute('value', 'A-Z');
                        	newButton.setAttribute('class', 'USP-SrtButton'+i);
                        	newDiv.appendChild(newButton);
                        	newDiv.innerHTML+='<br />';
                        	var newText = document.createElement('input');
                        	newText.setAttribute('type', 'text');
                        	newText.setAttribute('class', 'USP-AddText'+i);
                        	newDiv.appendChild(newText);
                        	USP.node.getElementsByClassName('USP-values')[0].appendChild(newDiv);
                        }
                    	break;
                }
            }
            USP.styleWindow();
        }
    }
    
};

window.addEventListener(
  'load',
  function () {
    // The type of 'theDefault' determines the type of the preference value
	USP.init({
		theName:'filter',
		theText:'Filter:',
		theDefault:['Personal', 'Call', 'Zeit', 'Time', 'Agentur', 'M. Thiele', 'Plettenberg', 'Arbeitsvermittlung', 'Buscha', 'Fleischmann-Hahn', 'together group', 'jobs nach mass', 'Deutsche Angestellten Akademie', 'AKPM', 'Sitel', 'K&S-Kommunikation & Service GmbH', 'maXXu GmbH', 'i-potentials GmbH', 'Premium Consultants', 'Mairinger', 'Expero', 'Randstad', 'Permacon', 'Allround Service', 'riedel-personal', 'PRIMAJOB AG', 'FRANZ & WACH', 'STF Placement', 'persona service', 'Scheerbaums Erben', 'Kelly Services', 'Education Campus', 'PersOrange', 'Manpower', 'Job@ctive', 'headwayengineers', 'AlphaConsult', 'AGO', 'DIE WEGBEREITER', 'Bic Consult', 'serviceline', 'www.fairnes-work.de', 'yd. yourdelivery UG', 'KundS', 'Perso Plankontor', 'TEMPTON']
		}, {
		theName:'action',
		theText:'Gefilterte Anbieter',
		theValues:['Ausblenden', 'Farbig hinterlegen'],
		theDefault:'Ausblenden'
		}
	);
	GM_registerMenuCommand('Optionen des ~'+USP.theScriptName+'~', USP.invoke);
  },
true);