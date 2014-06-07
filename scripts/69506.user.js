// ==UserScript==
// @name          French Abreviations
// @author        Motty Katan
// @namespace     http://moppy.4free.co.il
// @description	  Expand French abreviation into the full words. Motty Katan(c) 20-02-10 updated at 20-02-10
// @include       http://*
// ==/UserScript==
//abbreviation.user.js
//based on special_signs_helpy.js Motty Katan (c)
//Build Changes:
//V1: 21 words
//V1.1 : 51 words (adding texto abreviations), better support for uppercase handling

function AbbreviationMng() {
	var self = this;
    var aData = new Array();
	//it seems that String.fromCharCode is not relaiable
	var oText = document.createElement("DIV");

    function construct(){
    	nElements = attachEvent();
        if (nElements){
          setData();
        }
    }

	function getUnicodeChar(nCode){
	  oText.innerHTML = "&#"+nCode+";";
	  return oText.innerHTML;
	}

    //ne pas mettre ici de mots court qu'on veut utiliser
    //tels qu'ils sont comme: min km h etc. p. ex. p. j.
    function setData(){
      //@
      aData["@+"] = getUnicodeChar(224)+" plus";
      aData["@2m1"] = getUnicodeChar(224)+" demain";
      //6
      aData["6n"+getUnicodeChar(233)] = "cin"+getUnicodeChar(233);
      //a
      aData["auj."] = "aujourd'hui";
      aData["a+"] = getUnicodeChar(224)+" plus";
      aData["a2m1"] = getUnicodeChar(224)+" demain";
      //b
      aData["bcp"] = "beaucoup";
      aData["biz"] = "bisous";
      aData["bnjr"] = "bonjour";
      aData["bsr"] = "bon soir";
      //c
      aData["c.-a.-d"] = "c'est-"+getUnicodeChar(224)+"-dire";
      //d
      aData["d'ac"]  = "d'accord";
      aData["dak"]  = "d'accord";
      aData["ds"]  = "dans";
      aData["DSL"]  = "d"+getUnicodeChar(233)+"sol"+getUnicodeChar(233);
      //g
      aData["gd"]  = "grand";
      //j
      aData["jms"]  = "jamais";
      //k
      aData["k"] = "que";
      aData["kan"] = "quand";
      aData["kand"] = "quand";
      aData["k"] = "que";
      aData["kel"] = "quel";
      aData["kelle"] = "quelle";
      aData["koi"] = "quoi";
      aData["koi29"] = "quoi de neuf ?";
      //l
      aData["lut"] = "salut";
      //m
      aData["mal1"] = "malin";
      //n
      aData["ns"]  = "nous";
      //o
      aData["ok1"] = "aucun";
      //p
      aData["pb"]  = "probl"+getUnicodeChar(233)+"me";
      aData["pdt"]  = "pendant";
      aData["pkoi"]  = "pourquoi";
      //q
      aData["queske"] = "qu'est-ce que";
      aData["qq"] = "quelques";
      aData["qqc"] = "quelque chose";
      aData["qqn"] = "quelqu'un";
      //r
      aData["raf"] = "rien "+getUnicodeChar(233)+" faire";
      aData["ras"] = "rien "+getUnicodeChar(233)+" signaler";
      aData["ri1"] = "rien";
      aData["rdv"] = "rendez-vous";
      //s
      aData["s."]  = "si"+getUnicodeChar(233)+"cle";
      aData["SVP"]  = "s'il vous pla"+getUnicodeChar(238)+"t";
      aData["STP"]  = "s'il te pla"+getUnicodeChar(238)+"t";
      //t
      aData["tds"]  = "tout de suite";
      aData["tjs"]  = "toujours";
      aData["tps"]  = "temps";
      aData["tt"] = "tout";
	  aData["tte"] = "toute";
      aData["tts"] = "toutes";
	  aData["ts"] = "tous";
      //v
      aData["vazi"]  = "vas-y";
      aData["vs"]  = "vous";
    }

    function attachEvent(){
	    //No contenteditable in mozilla handle only textarea and input
	    var aResultLinks = document.evaluate( "//body//*[(self::textarea or self::input) and not(@UNSELECTABLE='true') and not(@READONLY='true')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	    var oElement;
	    var nRetVal = aResultLinks.snapshotLength;
	    for (var n = 0; n < aResultLinks.snapshotLength; n++)
	    {
	      oElement = aResultLinks.snapshotItem(n);
	      //attaching
	      oElement.addEventListener("keydown", processKeyPress, true);
	    }
        return nRetVal;
    }
    function findStrTillWhite(sStr, nPos){
       var bNotFound = true;
       var sLastWord="";
       while (!sStr.charAt(nPos).match(/\s|\n|\r/) && nPos>=0){
         sLastWord=sStr.charAt(nPos--)+sLastWord;
       }
       return sLastWord;
    }
    function replaceStr(oSource, sSearchStr, nStrEndPos, sRep)
    {
    	sSource = oSource.value;
        oSource.value = sSource.substr(0, nStrEndPos-sSearchStr.length) + sRep + sSource.substr(nStrEndPos, sSource.length);
        oSource.selectionStart =
        oSource.selectionEnd =
        nStrEndPos+(sRep.length-sSearchStr.length);
    }

    //if exist in the conversion table or has ° the degree symbol at the end
    function getConvertableStr(sStr){
      var sRetStr = "";
      if (typeof(aData[sStr.toLowerCase()])!="undefined"){
        sRetStr = aData[sStr.toLowerCase()];
        //first letter capital! (currently accents not supported)
        var sFirstLetter = sStr.charAt(0);
        if (sFirstLetter == sFirstLetter.toUpperCase()){
          sRetStr = sRetStr.charAt(0).toUpperCase()+sRetStr.substr(1, sRetStr.length);
        }
      }else if (sStr.length>3 && sStr.charCodeAt(sStr.length-1)==176){
      	sRetStr = sStr.substr(0, sStr.length-1)+"tion";
      }

      return sRetStr;
    }

    function processKeyPress(e){
      var bRetVal = false;
      if (e.keyCode==32 && e.target.selectionStart==e.target.selectionEnd){
        var nStrEndPos = e.target.selectionStart;
        sStr = findStrTillWhite(e.target.value, nStrEndPos-1);
        sRepStr = getConvertableStr(sStr);
        if (sRepStr!=""){
          sRepStr += (e.ctrlKey) ? " ":"";
          //if you want a space after the change
          //press ctrl+spacebar
          replaceStr(e.target, sStr, nStrEndPos, sRepStr, e.ctrlKey);
          e.preventDefault();
          return false;
        }
        return true;
      }
    }
    construct();
}
var o = new AbbreviationMng();