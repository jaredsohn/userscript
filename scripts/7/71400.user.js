// ==UserScript==
// @name           map-key-moving-tribalwars-plapl.com
// @namespace      Die Stämme
// @description    Ermöglicht das Bewegen der Karte mit den Pfeiltasten
// @include        http://*.die-staemme.*/game.php*screen=map*
// @include        http://*.tribalwars.*/game.php*screen=map*
// ==/UserScript==

var world = location.href.split(".")[0].split("//")[1];

function showLegend(left,right,up,down,language){
	left = String.fromCharCode(left);
	right = String.fromCharCode(right);
	up = String.fromCharCode(up);
	down = String.fromCharCode(down);
	var ger = (language=="arabic");
	
	var table = document.createElement("table");
	table.setAttribute("style","border: 1px solid; background-color: rgb(221, 204, 170); margin-left: 2px; margin-top: 4px; margin-bottom: 4px; width:300px");
	var tr = document.createElement("tr");
	var th = document.createElement("th");
	th.setAttribute("style","font-size:11px; font-style:italic");
	th.innerHTML = ger ? "خريطة التحرك مع لوحة المفاتيح" : "Move map with the keyboard";
	var td0 = document.createElement("td");
	td0.setAttribute("style","font-size:10px;");
	td0.innerHTML = '<a href="'+location.href+'&clearSettings">('+(ger ? "عدل" : "edit")+')</a>';
	tr.appendChild(th);
	tr.appendChild(td0);
	table.appendChild(tr);
	
	var tr2 = document.createElement("tr");
	var tr3 = document.createElement("tr");
	var tr4= document.createElement("tr");
	for(var i=1;i<=5;i++){
		eval('var td'+i+' = document.createElement("td")');
		eval('td'+i+'.setAttribute("style","font-size:10px")');
	}
	td1.innerHTML = (ger ? "شمال" : "North")+": <strong>"+up+"</strong>";
	td2.innerHTML = (ger ? "شرق" : "east")+": <strong>"+right+"</strong>";
	td3.innerHTML = (ger ? "الجنوب" : "South")+": <strong>"+down+"</strong>";
	td4.innerHTML = (ger ? "الغرب" : "west")+": <strong>"+left+"</strong>";
	td5.innerHTML = (ger ? "<a href=http://www.plapl.com/forum.php>>>>>بلابل<<<<</a>" : "<a href=http://www.plapl.com/forum.php>>>>>plapl<<<<</a>");
	tr2.appendChild(td1);
	tr2.appendChild(td2);
	tr3.appendChild(td3);
	tr3.appendChild(td4);
	tr4.appendChild(td5);
	table.appendChild(tr2);
	table.appendChild(tr3);
	table.appendChild(tr4);
	
	var lgTable = document.getElementsByTagName("table");
	if(document.body.innerHTML.match(/graphic\/villages\.png/)){
		lgTable = lgTable[lgTable.length-2];
	}
	else{
		lgTable = lgTable[lgTable.length-1];
	}
	lgTable.parentNode.insertBefore(table,lgTable.nextSibling);
}

function clearSettings(){
	GM_deleteValue("DS_"+world+"_left_ASCII");
	GM_deleteValue("DS_"+world+"_right_ASCII");
	GM_deleteValue("DS_"+world+"_up_ASCII");
	GM_deleteValue("DS_"+world+"_down_ASCII");
	GM_deleteValue("DS_language");
	location.href = location.href.substr(0,location.href.indexOf("clearSettings"));
}

(function main(){

if(location.href.match(/clearSettings/)){
	clearSettings();
	return;
}

var cook_left = GM_getValue("DS_"+world+"_left_ASCII");
var cook_right = GM_getValue("DS_"+world+"_right_ASCII");
var cook_up = GM_getValue("DS_"+world+"_up_ASCII");
var cook_down = GM_getValue("DS_"+world+"_down_ASCII");
var language = GM_getValue("DS_language");

if(!language){
	alert("الرجاء اختيار اللغة الخاصة بك!\n\nPlease select your language!");
	var arabic = confirm("هل تتكلم العربيه\n(اذا كان كذلك فا اضغط على موافق)\n\nDo you speak arabic?\n(Press Cancel to select English)");
	GM_setValue("DS_language",(arabic ? "arabic" : "english"));
	language = GM_getValue("DS_language");
}

if(language == "arabic"){	// Deutsch
	var MSG_LEFT = "بعد الضغط على موافق ، يرجى ضرب المفتاح الذي تريد لحركة الخريطة إلى الغرب.";
	var MSG_RIGHT = "بعد الضغط على موافق ، يرجى ضرب المفتاح الذي تريد لحركة خريطة للشرق.";
	var MSG_UP = "بعد الضغط على موافق ، يرجى ضرب المفتاح الذي تريد لحركة الخريطة إلى الشمال.";
	var MSG_DOWN = "بعد الضغط على موافق ، يرجى ضرب المفتاح الذي تريد لحركة الخريطة لالجنوب.";
	var CONF_KEYS = "خريطة التحرك مع لوحة المفاتيح\n\nمفاتيح لتحريك الخريطة يتم الآن تعيين.\nاضغط على إلغاء لاستخدام مفاتيح قياسية (w,d,s und a) .";
	var KEY_ERROR = "ويمكن أن المفتاح لا يمكن الاعتراف بها. الرجاء استخدام آخر واحد.";
	var KEY_ERROR2 = "المفتاح هو بالفعل في استخدام.";
	var KEY_SUCCES = "مفاتيح تم حفظها بنجاح.";
}
else{					//Englisch
	var MSG_LEFT = "After you pressed OK, please hit the key you want for a movement of the map to the west.";
	var MSG_RIGHT = "After you pressed OK, please hit the key you want for a movement of the map to the east.";
	var MSG_UP = "After you pressed OK, please hit the key you want for a movement of the map to the north.";
	var MSG_DOWN = "After you pressed OK, please hit the key you want for a movement of the map to the south.";
	var CONF_KEYS = "Move map with the keyboard\n\nThe keys for moving the map are now set.\nPress Cancel to use the standard-keys (w,d,s and a).";
	var KEY_ERROR = "The key couldn't be recognized. Please use another one.";
	var KEY_ERROR2 = "The key is already in use.";
	var KEY_SUCCES = "The keys have been saved succesfully.";
}

if(!(cook_left && cook_right && cook_up && cook_down)){
	if(confirm(CONF_KEYS)){
		var left_ASCII, right_ASCII, up_ASCII, down_ASCII, vals_ASCII="";
		alert(MSG_LEFT);
		left_ASCII = true;
		document.addEventListener("keypress",function(event){
			var key = event.which;
			if(key==0){ alert(KEY_ERROR); return; }
			if(vals_ASCII.indexOf(key) != -1){ alert(KEY_ERROR2); return; }
			
			if(left_ASCII===true){
				left_ASCII = key;
				vals_ASCII += left_ASCII.toString()+",";
				right_ASCII = true;
				alert(MSG_RIGHT);
			}
			else if(right_ASCII===true){
				right_ASCII = key;
				vals_ASCII += right_ASCII.toString()+",";
				up_ASCII = true;
				alert(MSG_UP);
			}
			else if(up_ASCII===true){
				up_ASCII = key;
				vals_ASCII += up_ASCII.toString()+",";
				down_ASCII = true;
				alert(MSG_DOWN);
			}
			else if(down_ASCII===true){
				down_ASCII = key;
				alert("مفاتيح قراءة وقد تم بنجاح.");
				GM_setValue("DS_"+world+"_left_ASCII",left_ASCII);
				GM_setValue("DS_"+world+"_right_ASCII",right_ASCII);
				GM_setValue("DS_"+world+"_up_ASCII",up_ASCII);
				GM_setValue("DS_"+world+"_down_ASCII",down_ASCII);
				location.href = location.href;
			}
			else;
		},false);
	}
	else{
		GM_setValue("DS_"+world+"_left_ASCII",97);
		GM_setValue("DS_"+world+"_right_ASCII",100);
		GM_setValue("DS_"+world+"_up_ASCII",119);
		GM_setValue("DS_"+world+"_down_ASCII",115);
		location.href = location.href;
	}
}
else{
	var left = cook_left;
	var right = cook_right;
	var up = cook_up;
	var down = cook_down;
	showLegend(left,right,up,down,language);
	document.addEventListener("keypress",function(event){
		var key = event.which;
		switch(key){
			case left: location.href = "javascript:startMapScroll('west')"; break;
			case right: location.href = "javascript:startMapScroll('east')"; break;
			case up: location.href = "javascript:startMapScroll('north')"; break;
			case down: location.href = "javascript:startMapScroll('south')"; break;
			default: break;
		}
	},true);
}
})();


