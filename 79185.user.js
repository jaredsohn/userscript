// ==UserScript==
// @name	PassThePopcorn.org - Front Page Fixer
// @author	applebananas
// @namespace	http://userscripts.org/scripts/show/68418
// @include	http://*passthepopcorn.me/index.php
// @include	https://*passthepopcorn.me/index.php
// @version	0.01
// @date	2010-02-15
// ==/UserScript==

/*------------------------------------------\
CHANGELOG:
0.01:	Initial release

\------------------------------------------*/

var fullActiveURL = document.URL;
var site_base_url = fullActiveURL.match(/^(https:\/\/www\.passthepopcorn\.org|http:\/\/www\.passthepopcorn\.org)/)[1];

// Preference window stuff stolen from here: http://userscripts.org/scripts/show/45988
var USP = {
    node: null,
    darken: null,
    valueList: null,
    theScriptName: 'Testscript',
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
        '   #US-prefs input, #US-prefs select{text-align:left;margin:0.7em 0;padding:0 6px;background:#FFE1A2;border:1px solid #000;-moz-border-radius:4px;border-color:#5F3E00 #5F3E00 #000 #5F3E00;font-family:verdana,arial,sans-serif}\n'+
        '   #US-prefs>div>div input{margin:0 0;padding:0 0;background:#FFE1A2;border:1px solid #000;-moz-border-radius:4px;border-color:#5F3E00 #5F3E00 #000 #5F3E00;font-family:verdana,arial,sans-serif}',
    init: function() {
        var theStyle=document.createElement("style");
        USP.valueList=arguments;
        theStyle.setAttribute('type','text/css');
        //document.body.appendChild(theStyle).innerHTML=USP.CSS;
        document.getElementsByTagName('head')[0].appendChild(theStyle).innerHTML=USP.CSS;

        USP.prefPrefix='\n   <h1>PTP - Front Page Fixer: Preferences</h1>\n<div class="USP-values"></div><input class="button" type="button" value="Save">&nbsp;&nbsp;<input class="button" type="button" value="Save & Reload">&nbsp;&nbsp;<input class="button" type="button" value="Cancel"><br><input class="button" type="button" value="Check for update">\n';
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
                        	newButton.setAttribute('value', 'v');
                        	newButton.setAttribute('class', 'USP-DelButton'+i);
                        	newDiv.appendChild(newButton);
                        	newDiv.innerHTML+='&nbsp;';
                        	newButton = document.createElement('input');
                        	newButton.setAttribute('type', 'button');
                        	newButton.setAttribute('value', '^');
                        	newButton.setAttribute('class', 'USP-AddButton'+i);
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

window.addEventListener('load', function () {

	USP.theScriptName = 'PassThePopcorn.org - Front Page Fixer: Preferences';
	/*USP.init({theName:'OneOfMany', theText:'Which values should be displayed?', 
				theValues:['All','None'], theDefault:'All'},
			 {theName:'intValue', theText:'Integer:', theDefault:100},
			 {theName:'stringValue', theText:'String:', theDefault:'Testvalue'},
			 {theName:'boolValue', theText:'Boolean?', theDefault:true}
		);*/
	USP.init(
		{theName:'ALTorText', theText:'Extra info for "(5) Latest Sites Torrents" displayed how:', theValues:['Text on Screen','Hover','PTP Default'], theDefault:'Text on Screen'},
		//{theName:'theFirst', theText:'What do you want displayed in the top right corner?', theValues:['Donations','Staff Recommendations','Latest (10) Movies', 'Polls', 'Seeding Opportunities'], theDefault:'Donations'},
		//{theName:'theSecond', theText:'What do you want displayed below the top right Corner?', theValues:['Donations','Staff Recommendations','Latest (10) Movies', 'Polls', 'User Stats', 'Class Stats', 'Torrent Stats', 'Forum Stats', 'Seeding Opportunities'], theDefault:'Staff Recommendations'},
		{theName:'hideDonations', theText:'Hide Donations? [1]', theDefault:false},
		{theName:'hideStaffRecc', theText:'Hide Staff Recommendations? [2]', theDefault:false},
		{theName:'hideLatestTen', theText:'Hide Latest (10) Movies? [3]', theDefault:false},
		{theName:'hidePolls', theText:'Hide Polls? [4]', theDefault:false},
		{theName:'hideUserStats', theText:'Hide User Stats? [5]', theDefault:false},
		{theName:'hideClassStats', theText:'Hide Class Stats? [6]', theDefault:false},
		{theName:'hideTorrentStats', theText:'Hide Torrent Stats? [7]', theDefault:false},
		{theName:'hideForumStats', theText:'Hide Forum Stats? [8]', theDefault:false},
		{theName:'hideSeedingOpportunities', theText:'Hide Seeding Opportunities? [9]', theDefault:false},
		{theName:'hideLatestFive', theText:'Hide (5) Latest Site Torrents?', theDefault:false},
		{theName:'theFirst', theText:'Enter # for item to be displayed in the top right [eg. 1 = Donations, ...]', theDefault:1},
		//{theName:'theFirst', theText:'Enter # to be displayed in top right (#s located in [x]):', theDefault:1},
		{theName:'theSecond', theText:'2nd item:', theDefault:2},
		{theName:'theThird', theText:'3rd item:', theDefault:3},
		{theName:'theFourth', theText:'4th item:', theDefault:4},
		{theName:'theFifth', theText:'5th item:', theDefault:5}
	);

	GM_registerMenuCommand(USP.theScriptName, USP.invoke);
}, true);


	/*/ Option to hide "Latest Movies" box
GM_registerMenuCommand("passthepopcorn.org - Latest Site Torrents fixer - Hover or Text", function() {
	//var ALTorTextNum;
	for (var i=1;i<=3 && isNaN(ALTorTextNum);i++) {
		ALTorTextNum = prompt("Info on Hover or Text on Screen?\n1: Hover\n0: Text on Screen\ncurrent: " + GM_getValue("ALTorText", "0"));
		if (ALTorTextNum != null && ALTorTextNum != '') {
			ALTorTextNum = parseInt(ALTorTextNum);
			if (isNaN(ALTorTextNum)) { 
				if (i==3) { alert("Try harder!  Better luck next time!"); }
				else { alert("Please pick a valid number!"); }
			}
			else if (ALTorTextNum == 1 || ALTorTextNum == 0) {
				GM_setValue("ALTorText", ALTorTextNum);
				window.location.reload();
			}
			else { alert("pick 0 or 1"); }
		}
	}
});*/
/*
var boxOne = document.createElement("input");
boxOne.type = "radio";
boxOne.id = "FIRST";
boxOne.name = "theName";
boxOne.value = "1";
//boxOne.appendChild(boxOne);
var boxTwo = document.createElement("radio");
boxTwo.id = "Second";
var boxThree = document.createElement("p");
//boxThree.innerHTML = "LADFLLAFLAF";
boxThree.appendChild(boxOne);
//boxThree.appendChild(boxOne);
document.body.appendChild(boxThree);*/

/*function getStyleObject(objectId) {
	var theObject = null;

	// cross-browser function to get an object given its id
	if(document.getElementById && document.getElementById(objectId)) {
		// W3C DOM
		theObject= document.getElementById(objectId);
	} 
	else if (document.all && document.all(objectId)) {
		// MSIE 4 DOM
		theObject= document.all(objectId);
	} 
	else if (document.layers && document.layers[objectId]) {
		// NN 4 DOM.. note: this won't find nested layers
		theObject = document.layers[objectId];
	} 
	else {
		 theObject=false;
	}

	return theObject;
}*/ 
/*function drawRadios(LOL){
	var p = LOL.createElement("p");
	var ul = LOL.createElement('ul');

	p.innerHTML ='';
	ul.style.display='block';
	p.appendChild(ul);


	for(var i=1;i<3;i++){
		var li = LOL.createElement('li');
		var tn = LOL.createTextNode('radio button '+i);
		var rdo = LOL.createElement('input');



		ul.appendChild(li);	



		// try/catch: try works in IE 6 (maybe 7) catch works in ff/ns browsers 
		// however, no error is thrown in opera 8 (in the try), but no radio is drawn in opera 8 either.
		//try{
		//	rdo = LOL.createElement('<input type="radio" name="fldID" checked />');
		//}catch(err){
		//	rdo = LOL.createElement('input');
		//}
		rdo.setAttribute('type','radio');
		rdo.setAttribute('name','fldID');
		rdo.id = 'folder'+i;
		rdo.value = i;

		var lbl = LOL.createElement('label');
		// set the label in IE..
		lbl.setAttribute('htmlFor','folder'+i);
		// set the label for other browsers
		lbl.setAttribute('for','folder'+i);
		lbl.appendChild(tn);
		li.appendChild(rdo);

		li.appendChild(lbl);
		return p;
					
	}

	return false;
}
//var doc = document;
//var theP = drawRadios(doc);
//alert(theP);
//document.body.appendChild(theP);*/
/*
function drawRadiosLOL(){
	var p = document.createElement("p");
	var ul = document.createElement('ul');

	p.innerHTML ='';
	ul.style.display='block';
	p.appendChild(ul);


	for(var i=1;i<3;i++){
		var li = document.createElement('li');
		var tn = document.createTextNode('radio button '+i);
		var rdo = document.createElement('input');



		ul.appendChild(li);	



		// try/catch: try works in IE 6 (maybe 7) catch works in ff/ns browsers 
		// however, no error is thrown in opera 8 (in the try), but no radio is drawn in opera 8 either.
		//try{
		//	rdo = document.createElement('<input type="radio" name="fldID" checked />');
		//}catch(err){
		//	rdo = document.createElement('input');
		//}
		rdo.setAttribute('type','radio');
		rdo.setAttribute('name','fldID');
		rdo.id = 'folder'+i;
		rdo.value = i;

		var lbl = document.createElement('label');
		// set the label in IE..
		lbl.setAttribute('htmlFor','folder'+i);
		// set the label for other browsers
		lbl.setAttribute('for','folder'+i);
		lbl.appendChild(tn);
		li.appendChild(rdo);

		li.appendChild(lbl);
		document.body.appendChild(p);
					
	}

	return false;
}
//drawRadiosLOL();*/

/*
createOptions();
function createOptions() {
	var newDiv = document.createElement('div');
	var inner = newDiv.appendChild(document.createElement('div'));
	newDiv.setAttribute('id', 'imdbEnlarge');
	newDiv.setAttribute('style', 'padding:3px;display:none;position:fixed;z-index:1337;top:20px;left:20px;background-color:#f7f3b6;');
	newDiv.addEventListener('mouseover', function(event) {
		this.style.display = "inline";
	}, true);
	newDiv.addEventListener('mouseout', function(event) {
		//window.clearTimeout(2500);
		this.style.display = "none";
	}, true);
	newDiv.addEventListener('mousemove', function(e) {
		;
	}, true);
	var newP = document.createElement('p');
	newDiv.appendChild(newP);
	inner.innerHTML = "LOL";

}*/

//createDivPopup('sdfsdg','','','!important');
//createDivPopup('sdfsdg');
//createDivPopup('sdfsdg','#GM_divPopupContentHolder{background-color:white}','','!important');
//createDivPopup('sdfsdg','#GM_divPopupContentHolder{background-color:white}','data:image/png;base64,iVBORw0...');

function getDOC(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
            var doc = document.implementation.createDocument('', '', null),
                html = document.createElement('html');
            html.innerHTML = responseDetails.responseText;
            doc.appendChild(html);
            callback(doc);
        }
    });
}

var donations = document.getElementById('donationh_box'),
	staffRecommendations = document.getElementById('recommended'),
	latestTen = document.getElementById('movieimages'),
	polls = document.getElementById('pollbx'),
	userStats = document.getElementById('userbx'),
	classStats,
	forumStats,
	torrentStats = document.getElementById('torrentbx'),
	seedingOpportunities = document.getElementById('reseed_box'),
	latestSiteTorrents = document.getElementById('images');

var check = document.getElementsByTagName('div') 
var i = 0, tempClass = 0, tempForum = 0;
outerClass: for (i in check) {
	if (check[i].innerHTML.match(/<strong>Class Stats</)) {
		tempClass = i;
	}
	else if (check[i].innerHTML.match(/<strong>Forum Stats</)) {
		tempForum = i;
	}
}
	classStats = check[tempClass - 1];
	forumStats = check[tempForum - 1];
var mySelection = new Array(donations, staffRecommendations, latestTen, polls, userStats, classStats, torrentStats, forumStats, seedingOpportunities, latestSiteTorrents);

var sideBar;
sideBarLoop: for (var i in mySelection) {
	if (mySelection[i]) {
		sideBar = mySelection[i].parentNode;
		break sideBarLoop;
	}
}

var arraySelection = new Array(
	GM_getValue('theFirst') - 1, 
	GM_getValue('theSecond') - 1, 
	GM_getValue('theThird') - 1, 
	GM_getValue('theFourth') - 1, 
	GM_getValue('theFifth') - 1  );

if (sideBar && mySelection[arraySelection[4]]) { sideBar.insertBefore(mySelection[arraySelection[4]], sideBar.firstChild); }
if (sideBar && mySelection[arraySelection[3]]) { sideBar.insertBefore(mySelection[arraySelection[3]], sideBar.firstChild); }
if (sideBar && mySelection[arraySelection[2]]) { sideBar.insertBefore(mySelection[arraySelection[2]], sideBar.firstChild); }
if (sideBar && mySelection[arraySelection[1]]) { sideBar.insertBefore(mySelection[arraySelection[1]], sideBar.firstChild); }
if (sideBar && mySelection[arraySelection[0]]) { sideBar.insertBefore(mySelection[arraySelection[0]], sideBar.firstChild); } 

var check = document.getElementsByTagName('div') 
var i = 0, tempClass = 0, tempForum = 0;
outerClass: for (i in check) {
	if (check[i].innerHTML.match(/<strong>Class Stats</)) {
		tempClass = i;
	}
	if (check[i].innerHTML.match(/<strong>Forum Stats</)) {
		tempForum = i;
	}
}
classStats = check[tempClass - 1];
forumStats = check[tempForum - 1];

if (GM_getValue('hideDonations') == true) { if(mySelection[0]) { mySelection[0].parentNode.removeChild(mySelection[0]); } }
if (GM_getValue('hideStaffRecc') == true) { if(mySelection[1]) { mySelection[1].parentNode.removeChild(mySelection[1]); } }
if (GM_getValue('hideLatestTen') == true) { if(mySelection[2]) { mySelection[2].parentNode.removeChild(mySelection[2]); } }
if (GM_getValue('hidePolls') == true) { if(mySelection[3]) { mySelection[3].parentNode.removeChild(mySelection[3]); } }
if (GM_getValue('hideUserStats') == true) { if(mySelection[4]) { mySelection[4].parentNode.removeChild(mySelection[4]); } }
if (GM_getValue('hideClassStats') == true) { if(mySelection[5]) { mySelection[5].parentNode.removeChild(mySelection[5]); } }
if (GM_getValue('hideTorrentStats') == true) { if(mySelection[6]) { mySelection[6].parentNode.removeChild(mySelection[6]); } }
if (GM_getValue('hideForumStats') == true) { if(mySelection[7]) { mySelection[7].parentNode.removeChild(mySelection[7]); } }
if (GM_getValue('hideSeedingOpportunities') == true) { if(mySelection[8]) { mySelection[8].parentNode.removeChild(mySelection[8]); } }
if (GM_getValue('hideLatestFive') == true) { if(mySelection[9]) { mySelection[9].parentNode.removeChild(mySelection[9]); } }
else if (GM_getValue('ALTorText') != 'PTP Default') {
	getDOC(site_base_url + "/torrents.php", function(doc) {
	var aInDoc = doc.getElementsByTagName('a');
	
	var itemsx = doc.getElementById("torrent_table").getElementsByTagName("tr");
	
	var allItemsInner = new Array();

	outerLoop: for (var z in itemsx) {
		allItemsInner[z] = itemsx[z].innerHTML;
	}
	allItemsInner.shift();
	var groupTime = new Array();
	var groupID = new Array();
	var individualInfo = new Array();
	var individualSize = new Array();
	var individualID = new Array();
	var countGroup = 0;
	// run through all the torrents on torrents.php
	for (var y in allItemsInner) {
		var groupTorrent = allItemsInner[y].match(/artist\.php\?id=/); // match the heading page
		var individualTorrent = allItemsInner[y].match(/torrentid=/);
		if (groupTorrent) {
			var tempCut = allItemsInner[y].substring(allItemsInner[y].indexOf("class=\"nobr")+13);
			groupTime[countGroup] = new RegExp(tempCut.substring(0, tempCut.indexOf("</td>")));
			var matchSecond = allItemsInner[y].match();
			var tempGroupID = allItemsInner[y].substring(allItemsInner[y].indexOf("torrents\.php\?id=")+16);
			tempGroupID = tempGroupID.substring(0, tempGroupID.indexOf("\""));
			groupID[countGroup] = tempGroupID;
			countGroup++;
		}
		if (individualTorrent) {
			
			if (allItemsInner[y].match(groupTime[countGroup-1])) {
				// checkbox
				if (allItemsInner[y].match(/â˜‘/)) {
					var tempInfo = allItemsInner[y].substring(allItemsInner[y].indexOf("â˜‘")+2);
					tempInfo = tempInfo.substring(0, tempInfo.indexOf("<"));
					individualInfo[countGroup-1] = tempInfo;
				}
				// no checkbox
				else if (allItemsInner[y].match(/â˜/)) {
					var tempInfo = allItemsInner[y].substring(allItemsInner[y].indexOf("â˜")+2);
					tempInfo = tempInfo.substring(0, tempInfo.indexOf("<"));
					individualInfo[countGroup-1] = tempInfo;
				}
				
				// store the size
				var tempSize = allItemsInner[y].substring(allItemsInner[y].indexOf("class=\"nobr")+13);
				tempSize = tempSize.substring(tempSize.indexOf("class=\"nobr")+13);
				tempSize = tempSize.substring(0, tempSize.indexOf("<"));
				individualSize[countGroup-1] = tempSize;
				
				// store the torrentID # (for links)
				var tempTorrentID = allItemsInner[y].substring(allItemsInner[y].indexOf("torrentid=")+10);
				tempTorrentID = tempTorrentID.substring(0, tempTorrentID.indexOf("\""));
				individualID[countGroup-1] = tempTorrentID;
			}
		}
	}
	//individualInfo[3] = "DVD9 ISO DVD NTSC Anniversary Edition - 2004";
	
	//change links
	var latestFiveLinks = document.getElementById('last5t').getElementsByTagName("a");		
	for (var j in latestFiveLinks) {
		for (var i = 0; i<10; i++) {
			var regex = new RegExp(groupID[i]);
			if (latestFiveLinks[j].href.match(regex)) { 
				latestFiveLinks[j].href = latestFiveLinks[j].href + "&torrentid=" + individualID[i];
				//if (parseInt(j) > 4) { latestFiveLinks[j].innerHTML = "<b>" + latestFiveLinks[j].innerHTML + "</b><br><br><i>" + individualInfo[i] + "</i><br><br>(" + individualSize[i] + ")";}
			}
		}
	}
	
	

	// change alts
	if (GM_getValue("ALTorText", "Text on Screen") == 'Hover') {
		var latestFiveImages = document.getElementById('last5t').getElementsByTagName("img");

		for (var x in latestFiveImages) { 		
			if (individualInfo[x] != undefined) {latestFiveImages[x].title = individualInfo[x] + " (" + individualSize[x] + ")"; }
			else { latestFiveImages[x].title = "undefined"; }
		}
	}
	// write text to screen	
	else {
	
		var latestFiveLinksNewRow = document.getElementById('last5t').getElementsByTagName("tr");
		latestFiveLinksNewRow[1].style.borderBottom = "none";
		
		var thisRow = document.createElement("tr");
		thisRow.style.borderBottom = "none";
		thisRow.style.borderTop = "none";			
		latestFiveLinksNewRow[1].parentNode.insertBefore(thisRow, latestFiveLinksNewRow[1].nextSibling);
		
		var nextRow = document.createElement("tr");
		latestFiveLinksNewRow[2].parentNode.insertBefore(nextRow, latestFiveLinksNewRow[2].nextSibling);
		
		for (var q = 0; q<5; q++) {
			var thisCell = document.createElement("td");
			thisCell.style.margin = "0";
			thisCell.style.paddingTop = "8px";
			thisCell.style.paddingBottom = "6px";
			thisCell.style.paddingLeft = "1px";
			thisCell.style.paddingRight = "1px";
			thisCell.style.textAlign = "center";
			thisCell.style.borderStyle = "none";
			//thisCell.style.borderBottom = "none";
			//thisCell.style.borderTop = "none";
			thisCell.style.verticalAlign = "top";
			thisRow.appendChild(thisCell);
			
			//var thisText = document.createTextNode(individualInfo[q]);
			if (individualInfo[q] != undefined) { thisCell.innerHTML = individualInfo[q] + "<br>(" + individualSize[q] + ")"; }
		}
		/* New row for size matching up if wanted
		for (var q = 0; q<5; q++) {
			var thisCell = document.createElement("td");
			thisCell.style.margin = "0";
			thisCell.style.padding = "3px";
			thisCell.style.textAlign = "center";
			thisCell.style.borderStyle = "none";
			thisCell.style.borderBottom = "none";
			thisCell.style.borderTop = "none";
			nextRow.appendChild(thisCell);
			thisCell.innerHTML = "(" + individualSize[q] + ")";
		}*/
	}
	/* //Attempt at making pictures bigger (not working, maybe later)
	var latestFiveImages = document.getElementById('last5t').getElementsByTagName("img");

	var allImages = new Array();
	for (var x in latestFiveImages) {
	tempHeight = this.height;
	//allImages[x] = latestFiveImages[x].src;
	latestFiveImages[x].addEventListener('mouseover', function(event) {
		this.height.value = "10";
		//this.width = 'auto';
		//this.setAttribute('origImg', allImages[x]);
		//this.src = "http://icanhascheezburger.files.wordpress.com/2007/12/funny-pictures-lol-squid.jpg";
	}, false);
	latestFiveImages[x].addEventListener('mouseout', function(event) {
	  //this.height = 'auto';
	  //this.width = 'auto';
	  //this.src = this.getAttribute('origImg');
	  this.height.value = "10";
	}, false);

	}*/

	/*
	var latestFiveImages = document.getElementById('last5t').getElementsByTagName("img");

	for (var j in latestFiveImages) {
		//latestFiveImages[j].alt = "LOL";
		var elem = document.createElement("img");
		elem.setAttribute("src", "http://media.kickstatic.com/kickapps/images/user/defaultImage_48x48_C.jpg");
		elem.setAttribute("height", "40");
		elem.setAttribute("width", "120");
		elem.setAttribute("alt", "GiantCo Logo");
		
		//latestFiveImages[j].alt = elem.getAttribute("alt");
		//latestFiveImages[j].src = elem.getAttribute("src");
		//latestFiveImages[j].alt = "trucks";
		//latestFiveImages[j].src = "http://media.kickstatic.com/kickapps/images/user/defaultImage_48x48_C.jpg";
		//alert(latestFiveImages[j].alt);
		//latestFiveImages[j].alt = elem.getAttribute("alt");
		//alert(latestFiveImages[j].alt);
		//		return;
		
		
					//for (var i = 0; i<10; i++) {
					//	var regex = new RegExp(groupID[i]);
					//	if (latestFiveImages[j].href.match(regex)) { 
					//		latestFiveImages[j].href = latestFiveImages[j].href + "&torrentid=" + individualID[i]; 
					//	}
					//}
	}*/
});
}
//update Script yoinked from: http://userscripts.org/scripts/review/20145
function update() {
var SUC_script_num = 68418; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 172800000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
}