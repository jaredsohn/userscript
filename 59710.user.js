// ==UserScript==
// @name           GayRomeo - genau suchen
// @namespace      meiner
// @description    Im GayRomeo-Suchformular nach exakten Jahren, Größen- und Gewichtsangaben suchen
// @include        http*://www.planetromeo.com*search/*?action=showForm&searchType=userDetail
// @include        http*://www.gayromeo.com*search/*?action=showForm&searchType=userDetail
// @include	   http*://www.gayromeo.com*search/?action=showForm&searchType=picture
// @include	   http*://www.planetromeo.com*search/?action=showForm&searchType=picture

// @version	 $Revision: 1.2  $
// @date	 $Date: 2011/03/23 12:00:00 $
// @author	 burke67 <burke67@hotmail.com>
// @grant        none
// ==/UserScript==

// LeP "GayRomeo - Odd Age Search" - Anpassung/Erweiterung auch auf Größe und Gewicht
// GR: burke67

({	cmtoftin: function(cm) {
                inch = Math.round(cm * 0.393700787);
                return Math.floor(inch/12)+"'"+(inch%12<10?"0":"")+(inch%12)+"\"";
                },

        addOption: function(v,whr,txt) {
        	var newOpt = document.wrappedJSObject.createElement('option');
		newOpt.value = v;
		
		if (txt==" kg") txt += " ("+Math.round(v * 2.20462262)+" lbs)";
		else if (txt==" cm") txt += ""; 
		
		newOpt.innerHTML = ""+v+txt;
		whr.appendChild(newOpt);    
        },

	fillAges: function(sel) {
		var opts = sel.getElementsByTagName('option');
		var n = 18;
		var oldVal = sel.value; 
		for (var i=1; i<opts.length; i++) {
		  var opt = opts[i];
		  opt.value = n;
		  opt.innerHTML = ""+n;
		  n++;
		}
		while (n<=65) {
		  this.addOption(n,sel,"");
		  n++;
		}
		this.addOption(70,sel,"");
		this.addOption(75,sel,"");
		if (opts[i].selectedIndex) opts[selectedIndex].selected = false;
		for (i=1; i<opts.length; i++) {
		  if (opts[i].value == oldVal) opts[i].selected = true;
		} 
	},
	
	fillHeight: function(sel) {
		var opts = sel.getElementsByTagName('option');	
		var n = 160;
		var oldVal = sel.value;
		for (var i=1; i<opts.length; i++) {
		  var opt = opts[i];
	          opt.value = n;
		  opt.innerHTML = ""+n+" cm ("+this.cmtoftin(n)+")";
		  n++;
		}
		while (n<=210) {
		  this.addOption(n,sel," cm ("+this.cmtoftin(n)+")");
		  n++;
		}
		if (opts[i].selectedIndex) opts[selectedIndex].selected = false;
		for (i=1; i<opts.length; i++) {
		  if (opts[i].value == oldVal) opts[i].selected = true;
		} 
	},
	
	fillWeight: function(sel) {
		var opts = sel.getElementsByTagName('option');	
		var n = 60;
		var oldVal = sel.value;
		for (var i=1; i<opts.length; i++) {
		  var opt = opts[i];
	          opt.value = n;
		  opt.innerHTML = ""+n+" kg ("+Math.round(n * 2.20462262)+" lbs)";
		  n++;
		}
		while (n<=125) {
		  this.addOption(n,sel," kg");
		  n++;
		}
		this.addOption(150,sel," kg");
		this.addOption(175,sel," kg");
		this.addOption(200,sel," kg");
		if (opts[i].selectedIndex) opts[selectedIndex].selected = false;
		for (i=1; i<opts.length; i++) {
		  if (opts[i].value == oldVal) opts[i].selected = true;
		} 
	},
	
	init: function() { // geändert für FF4
		var f = unsafeWindow.document.getElementsByName("userDetailSearchForm")[0];
		this.fillAges(document.getElementsByName("alter1")[0]);
		this.fillAges(document.getElementsByName("alter2")[0]);
		
		this.fillHeight(document.getElementsByName("hoehe1")[0]);
		this.fillHeight(document.getElementsByName("hoehe2")[0]);
		
		this.fillWeight(document.getElementsByName("gewicht")[0]);
		this.fillWeight(document.getElementsByName("gewicht2")[0]);
		
	}

}).init();