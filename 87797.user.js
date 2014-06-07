// ==UserScript==
// @name          Nesto za borbe
// @namespace     http://www.erepublik.com/en/military/battlefield/*
// @description   proba za borbe
// @include       http://www.erepublik.com/en/military/battlefield/*
// ==/UserScript==


var currURL = location.href;
var arrURL = currURL.split('/');
var battleID = arrURL[6];
var old_att_arr = [];
var old_def_arr = [];
var new_att_arr = [];
var new_def_arr = [];
var firstRun = 1;
var att_dif;
var def_dif;
var old_domin;
var new_domin;
var monToggled=1;
var monInterval;

function getErepJSON() {
GM_xmlhttpRequest({
     method: "GET",
     url: "http://www.erepublik.com/en/military/battle-log/"+battleID,
     onload: function(xhr) {
      var data = eval("(" + xhr.responseText + ")");
      // use data ...
      //document.getElementById("promo").innerHTML = data["domination"];
      //document.getElementById("promo").innerHTML = "";
      for (i=0;i<data["attackers"].length;i++) {
      	  //document.getElementById("promo").innerHTML += data["attackers"][i]["damage"] + ", ";
      	  new_att_arr[i] = data["attackers"][i]["damage"];
      }
      for (i=0;i<data["defenders"].length;i++) {
      	  //document.getElementById("promo").innerHTML += data["defenders"][i]["damage"] + ", ";
      	  new_def_arr[i] = data["attackers"][i]["damage"];
      }
      if (firstRun==1) {
      	  new_domin = data["domination"]/100;
      	  for (i=0;i<new_att_arr.length;i++) {
      	  	  old_att_arr[i] = new_att_arr[i];
      	  }
      	  for (i=0;i<new_def_arr.length;i++) {
      	  	  old_def_arr[i] = new_def_arr[i];
      	  }
      	  firstRun = 0;
      } else {
      	  new_domin = data["domination"]/100;
      	  att_dif=0;
      	  for (i=0;i<new_att_arr.length;i++) {
      	  	  if(old_att_arr[i] != new_att_arr[i]) {
      	  	  	  att_dif+=parseInt(new_att_arr[i]);
      	  	  } else {
      	  	  	  if(old_att_arr[i+1] == new_att_arr[i+1]) {
      	  	  	  	  if(old_att_arr[i+2] == new_att_arr[i+2]) {
      	  	  	  	  	  if(old_att_arr[i+3] == new_att_arr[i+3]) {
      	  	  	  	  	  	  break;
      	  	  	  	  	  }
      	  	  	  	  }
      	  	  	  }
      	  	  }
      	  }
      	  
      	  def_dif=0;
      	  for (i=0;i<new_def_arr.length;i++) {
      	  	  if(old_def_arr[i] != new_def_arr[i]) {
      	  	  	  def_dif+=parseInt(new_def_arr[i]);
      	  	  } else {
      	  	  	  if(old_def_arr[i+1] == new_def_arr[i+1]) {
      	  	  	  	  if(old_def_arr[i+2] == new_def_arr[i+2]) {
      	  	  	  	  	  if(old_def_arr[i+3] == new_def_arr[i+3]) {
      	  	  	  	  	  	  break;
      	  	  	  	  	  }
      	  	  	  	  }
      	  	  	  }
      	  	  }
      	  }
      	  for (i=0;i<new_att_arr.length;i++) {
      	  	  old_att_arr[i] = new_att_arr[i];
      	  }
      	  for (i=0;i<new_def_arr.length;i++) {
      	  	  old_def_arr[i] = new_def_arr[i];
      	  }
      }
      var S2 = (def_dif*(1-old_domin)-att_dif*old_domin)/(new_domin-old_domin);
      var D2 = S2*new_domin;
      var A2 = S2 - D2;
      var W2 = D2 - A2;
      var perc = S2/100;
      //var a2 = (def_dif*(1-old_domin)-att_dif*old_domin);
      if (S2!=0) {
      	  if ((new_domin-old_domin)!=0) {
      	  	  document.getElementById("promo").innerHTML = "<p>Monitor ON</p>";
      	  	  document.getElementById("promo").innerHTML += "<p>Sec:<input type=\"text\" name=\"textfield\" id=\"monSekunde\" value=\"2\" /></p>";
      	  	  document.getElementById("promo").innerHTML += "<p><input type=\"submit\" name=\"button\" id=\"button\" value=\"On/Off\" onClick=\"toggleMonitor();\" /></p>";
	      	  document.getElementById("promo").innerHTML += "<p>Total dmg: " + Math.round(S2) + "</p>";
	      	  document.getElementById("promo").innerHTML += "<p>Def dmg: " + Math.round(D2) + "</p>";
	      	  document.getElementById("promo").innerHTML += "<p>Att dmg: " + Math.round(A2) + "</p>";
	      	  document.getElementById("promo").innerHTML += "<p>Wall: " + Math.round(W2) + "</p>";
	      	  document.getElementById("promo").innerHTML += "<p>Percent value: " + Math.round(perc) + "</p>";
      	  }
      }
      old_domin = new_domin;
      //alert("1");
      //alert(new_att_arr);
      //alert(def_dif);
    }
  });
}

//getErepJSON();
monInterval = setInterval(getErepJSON, 2000);

function toggleMonitor() {
	if (monToggled==1) {
		document.getElementById("promo").innerHTML = "<p>Monitor OFF</p>";
		clearInterval(monInterval);
	} else {
		var sekunde = 1000*parseInt(document.getElementById("monSekunde").value);
		monInterval = setInterval(getErepJSON, sekunde);
	}
}

/*document.getJSON("http://www.erepublik.com/en/military/battle-log/748", function(data) {
	alert("1");
	document.getElementById("sidebar").innerHTML = data["domination"];
	
	
});*/
