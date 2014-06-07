//#special_signs_helpy.user.js
// ==UserScript==
// @name          Special Signs Helper - Forget The Key Codes!
// @author        Motty Katan
// @namespace     http://moppy.4free.co.il
// @description	  Special signs are hard to remember, when writing in a foreign lang or on a different comp. Select the letter(s) and use arrow keys/wheel to switch between available options(shift to change case) Motty Katan(c) 29-09-07 updated at 04-10-07  
// @include       *
// ==/UserScript==
// Build Changes:
// 29-09-2007 now supports more than one character(case and dictionary/class). added french numbers to dictionary.
// 30-09-2007 Support of mouse wheel. Better framework - now supports capital letters in a better neater way. Vocabulary: Added Harry Potter Houses, at=@, (c),(r),tm,1/4,1/2,3/4,oe,ae
// 31-09-2007 better getUnicodeChar function. 
// 04-10-2007 Shift key has other function when you select text, switching to ctrl(when shift isn't click). Load DB only if needed. Added: o,u,i
// 05-10-2007 Fixed the letter "o", added "i"
// 05-10-2007 Added Currency sign: EURO, NIS. "..." and ?=¿
// 15-10-2007 Fixed non issue with scrool bars jumping.
// 20-05-2011 Changing include to all (for https etc.). Adding spanish n (ene)
// 20-05-2011 Adding spanish "!"
// 20-05-2011 Added support for two strings at the same position (un|une). Added dashes/quotation hebrew+french

//it seems that String.fromCharCode is not relaiable
var oText = document.createElement("DIV");
function getUnicodeChar(nCode){
  oText.innerHTML = "&#"+nCode+";";
  return oText.innerHTML; 
}

//array of all characters supported (key=in miniscule)
var aChars = new Array();
//classes contains object stored in the aChars
//to be able to loop per character using the arrows
//key=in miniscule
var aClass = new Array(new Array());

//add a character to characters and character class arrays
function addChar(sMiniscule, sClass, bSkipCapital){
  function addMinisculeChar(sMiniscule){
    var nPosition  = aClass[sClass].length;
    var sMajuscule = sMiniscule.toUpperCase();
    var sCapital   = (bSkipCapital) ? "":getCapital(sMiniscule);
    aChars[sMiniscule] = {sMiniscule:sMiniscule, sMajuscule:sMajuscule, sCapital:sCapital, sClass:sClass, nPos:nPosition, bIsMiniscule:true};  
    return nPosition; 
  }
  function getCapital(sString){
    return sString.charAt(0).toUpperCase()+sString.substring(1);
  }
  
  if (!aClass[sClass]){
    aClass[sClass] = new Array();
  }
  if (!sMiniscule.match(/.+\|.+/g)){
    var nPosition = addMinisculeChar(sMiniscule);
    aClass[sClass][nPosition] = aChars[sMiniscule];
  }else{
    var asWords = sMiniscule.match(/([^|]+)/g);
    var asMiniscule = new Array();
    var nPosition;
    for(var i=0;i<asWords.length;i++){
      nPosition = addMinisculeChar(asWords[i]);
      asMiniscule[i] = aChars[asWords[i]]; 
    }
    aClass[sClass][nPosition] = asMiniscule;
  }
}

/*               SET DATA                   */
function setData(){
  
  /****** e class ********/
  addChar("e","e");
  //grave
  addChar(getUnicodeChar(232),"e");
  //acute
  addChar(getUnicodeChar(233),"e");
  //circomflex
  addChar(getUnicodeChar(234),"e");
  //diaeresis
  addChar(getUnicodeChar(235),"e");
  //macron
  addChar(getUnicodeChar(275),"e");
  //breve
  addChar(getUnicodeChar(277),"e");
  //dot
  addChar(getUnicodeChar(279),"e");
  //ogonek
  addChar(getUnicodeChar(281),"e");
  //caron
  addChar(getUnicodeChar(283),"e");

  /****** i class ********/
  addChar("i","i");
  //grave
  addChar(getUnicodeChar(236),"i");
  //acute
  addChar(getUnicodeChar(237),"i");
  //circomflex
  addChar(getUnicodeChar(238),"i");
  //diaeresis
  addChar(getUnicodeChar(239),"i");
  //tilde
  addChar(getUnicodeChar(297),"i");
  //macron
  addChar(getUnicodeChar(299),"i");
  //breve
  addChar(getUnicodeChar(301),"i");
  //ogonek
  addChar(getUnicodeChar(303),"i");
  //dotless
  addChar(getUnicodeChar(305),"i"); 
  
  /****** o class ********/
  addChar("o","o");
  //grave
  addChar(getUnicodeChar(242),"o");
  //acute
  addChar(getUnicodeChar(243),"o");
  //circomflex
  addChar(getUnicodeChar(244),"o");
  //tilde
  addChar(getUnicodeChar(245),"o");
  //diaeresis
  addChar(getUnicodeChar(246),"o");
  //small letter eth
  addChar(getUnicodeChar(240),"o");
  //macron
  addChar(getUnicodeChar(333),"o");
  //breve
  addChar(getUnicodeChar(335),"o");
  //double acute
  addChar(getUnicodeChar(337),"o");
  
  /****** a class ********/
  addChar("a","a");
  //grave
  addChar(getUnicodeChar(224),"a");
  //acute
  addChar(getUnicodeChar(225),"a");
  //circomflex
  addChar(getUnicodeChar(226),"a");
  //tilde
  addChar(getUnicodeChar(227),"a");
  //diaeresis
  addChar(getUnicodeChar(228),"a");
  //ring above
  addChar(getUnicodeChar(229),"a");
  //macron
  addChar(getUnicodeChar(257),"a");
  //breve
  addChar(getUnicodeChar(259),"a");
  //ogonek
  addChar(getUnicodeChar(261),"a");
  //ring and acute
  addChar(getUnicodeChar(507),"a");
  
  
  /****** u class ********/
  addChar("u","u");
  //grave
  addChar(getUnicodeChar(249),"u");
  //acute
  addChar(getUnicodeChar(250),"u");
  //circomflex
  addChar(getUnicodeChar(251),"u");
  //diaeresis
  addChar(getUnicodeChar(252),"u");
  //tilda
  addChar(getUnicodeChar(361),"u");
  //macron
  addChar(getUnicodeChar(363),"u");
  //breve
  addChar(getUnicodeChar(365),"u");
  //ring above
  addChar(getUnicodeChar(367),"u");
  //double acute
  addChar(getUnicodeChar(369),"u");  
  //ogonek
  addChar(getUnicodeChar(371),"u");  
  //horn
  addChar(getUnicodeChar(432),"u");
  //caron
  addChar(getUnicodeChar(468),"u");  
  //diaeresis and macron
  addChar(getUnicodeChar(470),"u");  
  //diaeresis and acute
  addChar(getUnicodeChar(472),"u");  
  //diaeresis and caron
  addChar(getUnicodeChar(474),"u");  
  //diaeresis and grave
  addChar(getUnicodeChar(476),"u");  
    
    
  
  
  
  /****** c class ********/
  addChar("c","c");
  //ccedil
  addChar(getUnicodeChar(231),"c");
  //acute
  addChar(getUnicodeChar(263),"c");
  //circomflex
  addChar(getUnicodeChar(265),"c");
  //weird dot above
  addChar(getUnicodeChar(267),"c");
  //caron
  addChar(getUnicodeChar(269),"c");
  
  /****** n class ********/
  addChar("n","n");
  //tilde aka ene
  addChar(getUnicodeChar(241),"n");      

  /******* counting in french class ********/
  addChar("z"+getUnicodeChar(233)+"ro","counting_in_french");
  addChar("un|une","counting_in_french");
  addChar("deux","counting_in_french");
  addChar("trois","counting_in_french");
  addChar("quatre","counting_in_french");
  addChar("cinq","counting_in_french");
  addChar("six","counting_in_french");
  addChar("sept","counting_in_french");
  addChar("huit","counting_in_french");
  addChar("neuf","counting_in_french");
  addChar("dix","counting_in_french");
  
  /******* Harry Potter: Hogwarts Houses in english class ********/
  addChar("gryffindor","Hogwarts_Houses");
  addChar("slytherin","Hogwarts_Houses");
  addChar("ravenclaw","Hogwarts_Houses");
  addChar("hufflepuff","Hogwarts_Houses");      

  /******* at sign = @ ********/ 
  addChar("at","@_sign");
  addChar("@","@_sign");
  
  /******* (c) = © ********/ 
  addChar("(c)","copyright_sign");
  addChar(getUnicodeChar(169),"copyright_sign"); 

  /******* (r) = © ********/ 
  addChar("(r)","register_sign");
  addChar(getUnicodeChar(174),"register_sign"); 
  
  /******* TM = ™ ********/ 
  addChar("tm","trademark_sign");
  addChar(getUnicodeChar(153),"trademark_sign");

  /******* 1/4 ********/ 
  addChar("1/4","quarter");
  addChar(getUnicodeChar(188),"quarter");

  /******* 1/2 ********/ 
  addChar("1/2","half");
  addChar(getUnicodeChar(189),"half");

  /******* 3/4 ********/ 
  addChar("3/4","three_quarters");
  addChar(getUnicodeChar(190),"three_quarters");

  /******* oe ********/ 
  addChar("oe","oe");
  addChar(getUnicodeChar(339),"oe");
  
  /******* ae ********/ 
  addChar("ae","ae");
  addChar(getUnicodeChar(230),"ae");
  
  /******* ?=¿ ********/ 
  addChar("?","?");
  addChar(getUnicodeChar(191),"?");
  

  /******* ! (thx joshdb) ********/
  addChar("!","!");
  addChar(getUnicodeChar(161),"!");     

  /******* ... chinese/other ********/ 
  addChar("...","...");
  addChar(getUnicodeChar(133),"...");

  /******* Currency sign: Euro ********/ 
  addChar("eur","euro");
  addChar(getUnicodeChar(128),"euro");

  /******* Currency sign: Shekel ********/ 
  addChar("nis","shekel");  
  addChar(getUnicodeChar(8362),"shekel");
  addChar("ils","shekel"); 

  /******* dashes (hebrew included) ********/
  //8210 FIGURE DASH
  addChar("-","-");
  //en dash
  addChar(getUnicodeChar(8211),"-");
  //em dash
  addChar(getUnicodeChar(8212),"-");
  //hebrew makaf
  addChar(getUnicodeChar(1470),"-");
  //horisontal bar
  addChar(getUnicodeChar(8213),"-");
       
   
  /******* << ********/
  addChar("<<","<<");
  addChar(getUnicodeChar(171),"<<");
  
  /******* >> ********/
  addChar(">>",">>");
  addChar(getUnicodeChar(187),">>");
  
  /******* quotation hebrew ********/  
  addChar("\"","\"");
  //gershaiim
  addChar(getUnicodeChar(1524),"\"");
  
  /******* quote hebrew ********/  
  addChar("'","'");
  //geresh
  addChar(getUnicodeChar(1523),"'");
  
  /******* arrows ********/
  //left
  addChar("<-","<-");
    addChar(getUnicodeChar(8592),"<-");
    //left dashed
    addChar(getUnicodeChar(8672),"<-");       
  //right  
  addChar("->","->");
    addChar(getUnicodeChar(8594),"->");
    //right dashed
    addChar(getUnicodeChar(8674),"->");  
  //left+right
  addChar("<->","<->");
    addChar(getUnicodeChar(8596),"<->");
  //left two headed
  addChar("<=","<=");
    addChar(getUnicodeChar(8606),"<="); 
  //right two headed  
  addChar("=>","=>");
    addChar(getUnicodeChar(8608),"=>");
  //left from bar
  addChar("<-|","<-|");
    addChar(getUnicodeChar(8612),"<-|"); 
  //right from bar  
  addChar("|->","|->");
    addChar(getUnicodeChar(8614),"|->");
  //left with tail
  addChar("<-<","<-<");
    addChar(getUnicodeChar(8610),"<-<"); 
  //right with tail  
  addChar(">->",">->");
    addChar(getUnicodeChar(8611),">->");
  //left white 
  addChar("<=|","<=|");
    addChar(getUnicodeChar(8678),"<=|");
  //right white 
  addChar("|=>","|=>");
    addChar(getUnicodeChar(8680),"|=>");
  //left double
  addChar("<==","<==");
    addChar(getUnicodeChar(8656),"<==");
  //right double
  addChar("==>","==>");
    addChar(getUnicodeChar(8658),"==>"); 
}
/*       End  of  SET DATA                   */


function nextChar(sValue, nPosition, nPositionEnd, nDir){
  var sSelectedString = sValue.substring(nPosition,nPositionEnd);
  var oChar = aChars[sSelectedString.toLowerCase()];
  var nNewPos = nPos = oChar.nPos;
  if (aClass[oChar.sClass].length>0){
    //regular state
    nNewPos += nDir;
    //corner state - go to start/end   
    if ((aClass[oChar.sClass].length-1)< nNewPos || nNewPos==-1){
      nNewPos = Math.abs(nPos - (aClass[oChar.sClass].length-1));
    }
    var sChar;     
    var oNewChar = (typeof aClass[oChar.sClass][nNewPos].sMiniscule=="undefined") ? aClass[oChar.sClass][nNewPos][0] : aClass[oChar.sClass][nNewPos];
    switch(sSelectedString){
      case oChar.sMiniscule:
        sChar = oNewChar.sMiniscule;
        break;
      case oChar.sMajuscule:
        sChar = oNewChar.sMajuscule;
        break;
      case oChar.sCapital:
        sChar = oNewChar.sCapital;
        break;      
    }
    //var sChar = (oChar.bIsMiniscule) ? aClass[oChar.sClass][nNewPos].sReplacer.toLowerCase():aClass[oChar.sClass][nNewPos].sReplacer;    
    sValue = swapChar(sValue, nPosition, sChar, nPositionEnd - nPosition);
  }
  return sValue;
}

var g_nLastReplacementLen=0;

function swapChar(sValue, nPos, sReplacer, nReplacedStringLen){
  g_nLastReplacementLen = sReplacer.length; 
  return sValue.substring(0,nPos)+sReplacer+sValue.substring(nPos+nReplacedStringLen,sValue.length);
}

function checkKeyPress(oEvent){
  var oElement = oEvent["target"];//oEvent["currentTarget"];
  var sValue = oElement.value;
	var nSelStart = oElement.selectionStart;
	var nSelEnd = oElement.selectionEnd;
  var sSelectedString = sValue.substring(nSelStart, nSelEnd);
  var bUpdated = false; 
  var sChar;	
	//the selection is only on one character and the key that was pressed was
	//up/down arrow or mouse wheel
	if (!oEvent.shiftKey && (nSelEnd-nSelStart>=1) && (oEvent.detail!==0 || oEvent.which==oEvent.DOM_VK_DOWN || oEvent.which==oEvent.DOM_VK_UP)){
	  //switch to lowercase/upercase using shift+arrow (mouse wheel+shift is a danger)
    if (oEvent.ctrlKey){
      if (aChars[sSelectedString.toLowerCase()]){        
        if (sSelectedString==aChars[sSelectedString.toLowerCase()].sMiniscule){
            sChar = aChars[sSelectedString.toLowerCase()].sMajuscule;
        }else{
            sChar = aChars[sSelectedString.toLowerCase()].sMiniscule;
        }     
        sValue = swapChar(sValue, nSelStart, sChar, sSelectedString.length);
      }else{
        //no object exist use ugly way to swap to lower/upper according to the
        //current char state
        if (sSelectedString == sSelectedString.toLowerCase()){
          sValue = swapChar(sValue,nSelStart, sSelectedString.toUpperCase(), sSelectedString.length);
        }else{
          sValue = swapChar(sValue,nSelStart, sSelectedString.toLowerCase(), sSelectedString.length);
        }
      }
      bUpdated = true;
    }else{
      
      //do we have any data about this character?
      if (aChars[sSelectedString.toLowerCase()]){
        //decide direction according to key pressed
        var nDir = (oEvent.which==oEvent.DOM_VK_DOWN || oEvent.detail>0) ? -1:1;
        //navigate inside character class
        sValue = nextChar(sValue, nSelStart, nSelEnd, nDir);
        bUpdated = true;
      }
    }
    if (bUpdated){
      var sScrollTop = oElement.scrollTop;
      var sScrollLeft = oElement.scrollLeft;
      //setting the value might alter the scrollbar position fix it right after to what it was     
      oElement.value = sValue;
      oElement.scrollTop = sScrollTop;
      oElement.scrollLeft = sScrollLeft;       
      oElement.selectionStart = nSelStart;
      oElement.selectionEnd   = nSelStart + g_nLastReplacementLen;
    }  	  
	  //finally prevent default
	  oEvent.preventDefault();
  }  
}
//No contenteditable in mozilla handle only textarea and input
var aResultLinks = document.evaluate( "//body//*[(self::textarea or self::input) and not(@UNSELECTABLE='true') and not(@READONLY='true')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
var oElement;
if (aResultLinks.snapshotLength){
  //load data only if needed
  setData();
  n=0;
  do
  {
    oElement = aResultLinks.snapshotItem(n);
    //attaching 
    oElement.addEventListener("keydown", checkKeyPress, false);
    oElement.addEventListener('DOMMouseScroll', checkKeyPress, false); 
  }while(++n < aResultLinks.snapshotLength);
}