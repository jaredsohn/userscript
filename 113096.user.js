// ==UserScript==
// @name           Mon2Uni5.1 Converter
// @namespace      Monglish System
// @description     JavaScript Document Reordering By HV-986.iblogger.org if you got problem mail me talachanmon[at] google mail com.
// @include        http*
// @include	  https://*
// @include	  file:///*
// ==/UserScript==
function Mon_Uni(input)
{
  var output=input;
   var tallAA = "\u102B";
   var AA = "\u102C";
   var vi = "\u102D";
   // up-media
   var ii = "\u102E";
   var u = "\u102F";
   var uu = "\u1030";
   var ve = "\u1031";
   var ai = "\u1032";
   var ans = "\u1036";
   var db = "\u1037";
   var visarga = "\u1038";
   var asat = "\u103A";
   var ya = "\u103B";
   var ra = "\u103C";
   var zero = "\u1040";
   output =  output.replace( /\u106A/g, "\u1009");
   output =  output.replace( /\u1025(?=[\u1039\u102C])/g, "\u1009"); //new
   output =  output.replace( /\u1025\u102E/g, "\u1026"); //new
   output =  output.replace( /\u106B/g, "\u100A");
   output =  output.replace( /\u1090/g, "\u101B");
   output =  output.replace( /\u1040/g, zero);
   output =  output.replace( /\u108F/g, "\u1014");
   output =  output.replace( /\u1012/g, "\u1012");
   /////////////
   output =  output.replace ( /\u105E/g, "\u1039\u105C"); // kwat BBA
   output =  output.replace ( /\u103E/g, "\u105E"); // Media NA
   output =  output.replace ( /\u103D/g, "\u103E");  // kwatHa
   output =  output.replace ( /\u103C/g, "\u103D");  // kwatwa
   output =  output.replace( /[\u103B\u107E\u107F\u1080\u1081\u1082\u1083\u1084]/g, ra);
   // kwatya & kwartra
   output =  output.replace( /(\u103C)([\u1000-\u1021])(\u1039[\u1000-\u1021])?/g, "$2$3$1");
   // reordering ra
   output =  output.replace ( /\u1007\u103A/g, "\u105B");  // JHA
   output =  output.replace( /[\u103A\u107D]/g, ya);
   output =  output.replace( /\u1039/g, "\u103A");
   // ya
   ////////////////////// Reordering
   
   output =  output.replace( /(\u1031)?(\u103C)?([\u1000-\u1021])\u1064/g, "\u1064$1$2$3");
   // reordering kinzi
   output =  output.replace( /(\u1031)?(\u103C)?([\u1000-\u1021])\u108B/g, "\u1064$1$2$3\u102D");
   // reordering kinzi lgt
   output =  output.replace( /(\u1031)?(\u103C)?([\u1000-\u1021])\u108C/g, "\u1064$1$2$3\u102E");
   // reordering kinzi lgtsk
   output =  output.replace( /(\u1031)?(\u103C)?([\u1000-\u1021])\u108D/g, "\u1064$1$2$3\u1036");
   // reordering kinzi ttt
   ////////////////////////////////////////
   output =  output.replace( /\u105A/g, tallAA + asat);
   output =  output.replace( /\u108E/g, vi + ans);
   // umd ttt
   output =  output.replace( /\u1033/g, u);
   output =  output.replace( /\u1034/g, uu);
   ///////////////////////////////////////Pasint order human error
  output =  output.replace( /([\u1000-\u1060\u])([\u102B\u102C\u102D\u102E\u1032\u1035\u1036\u1039\u1089\u1098\u109D]){1,2}([\u103C\u1060\u1061\u1062\u1063\u105B\u105E\u1065\u1066\u1067\u1068\u1069\u1070\u1071\u1072\u1073\u1074\u1075\u1076\u1077\u1078\u1079\u107A\u107B\u107C\u1085])/g, "$1$3$2");  //new
   /////////////
   output =  output.replace( /(\u1031)?(\u103C)?([\u1000-\u1021])\u109A/g, "\u1064$1$2$3\u1033"); // Mon kinzi aii
   output =  output.replace( /\u1064/g, "\u1004\u103A\u1039");
   output =  output.replace( /\u104E/g, "\u104E\u1004\u103A\u1038");
   output =  output.replace( /\u1060/g, '\u1039\u1000');
   output =  output.replace( /\u1061/g, '\u1039\u1001');
   output =  output.replace( /\u1062/g, '\u1039\u1002');
   output =  output.replace( /\u1063/g, '\u1039\u1003');
   output =  output.replace( /\u1065/g, '\u1039\u1005');
   output =  output.replace( /[\u1066\u1067]/g, '\u1039\u1006');
   output =  output.replace( /\u1068/g, '\u1039\u1007');
   output =  output.replace( /\u1069/g, '\u1039\u1008');
   output =  output.replace( /\u106C/g, '\u1039\u100B');
   output =  output.replace( /\u1070/g, '\u1039\u100F');
   output =  output.replace( /[\u1071\u1072]/g, '\u1039\u1010');
   output =  output.replace( /[\u1073\u1074]/g, '\u1039\u1011');
   output =  output.replace( /\u1075/g, '\u1039\u1012');
   output =  output.replace( /\u1076/g, '\u1039\u1013');
   output =  output.replace( /\u1077/g, '\u1039\u1014');
   output =  output.replace( /\u1078/g, '\u1039\u1015');
   output =  output.replace( /\u1079/g, '\u1039\u1016');
   output =  output.replace( /\u107A/g, '\u1039\u1017');
   output =  output.replace( /\u107B/g, '\u1039\u1018');
   output =  output.replace( /\u107C/g, '\u1039\u1019');
   output =  output.replace( /\u1085/g, '\u1039\u101C');
   output =  output.replace( /\u106D/g, '\u1039\u100C');
   output =  output.replace( /\u1091/g, '\u100F\u1039\u100D');
   output =  output.replace( /\u1092/g, '\u100B\u1039\u100C');
   output =  output.replace( /\u1097/g, '\u100B\u1039\u100B');
   output =  output.replace( /\u106F/g, '\u100D\u1039\u100E');
   output =  output.replace( /\u106E/g, '\u100D\u1039\u100D');
   //Mon output.replace
   var bba = "\u105C"; // BBA
   var bee = "\u105D"; // BEE
   var Me = "\u1028"; // E
   var kwatHa = "\u103E";
   var kna = "\u105E"; // Media NA
   var myie = "\u1035"; // Myanmar E
   var kwatBBA = "\u1039\u105C"; // kwatBBA
   var kwatWa = "\u103D"; // kwatwa
   var Pole = '\u102D\u1032'; //pole
   var Aao = '\u1029';
   output =  output.replace ( /\u1004\u105B/g, "\u105A");  // NGA
   output =  output.replace ( /\u105B/g, "\u1039\u105A"); // kwat NGA
   output =  output.replace ( /\u105C/g, "\u1060");  // Media LA
   output =  output.replace ( /\u1050/g, "\u105C"); // BBA
   output =  output.replace ( /\u1022/g, "\u105D");        // BEE
   output =  output.replace ( /\u103F/g, "\u105F");  // Media Ma
   output =  output.replace ( /\u1086/g, "\u103F"); // Media SSa
   output =  output.replace ( /\u1035/g, "\u1034"); // Mon O
   output =  output.replace ( /\u1098/g, "\u1033"); // Mon II
   output =  output.replace ( /\u109D/g, "\u1035"); // My ie
   output =  output.replace ( /\u109B/g, "\u1039\u100A"); // kwat Nya
   output =  output.replace ( /\u109C/g, "\u1039\u100D"); // kwat Dat
   output =  output.replace ( /\u1099/g, "\u102D\u1032"); // correct Pol
   output =  output.replace ( /\u103A\u1060/g, "\u1039\u105C"); // kwat bba
   output =  output.replace ( /\u1088/g, "\u103E\u102F"); // kwat hmu
   output =  output.replace(/\u1099/g, Pole);
   output =  output.replace( /\u103E\u103B/g, ya + kwatHa);
   /////////////////////////////////////////////////////////
   output = output.replace(/(([\u1000-\u101C\u101E-\u102A\u102C\u102E-\u103F\u104C-\u109F]))(\u1040)(?=\u0020)?/g, function($0, $1)
   {
      return $1 ? $1 + '\u101D' : $0 + $1;
   }
   );
   // zero and wa
    output = output.replace(/((\u101D))(\u1040)(?=\u0020)?/g, function($0, $1)
   {
      return $1 ? $1 + '\u101D' : $0 + $1;
   }
   );
   // zero and wa
    output = output.replace(/(([\u1000-\u101C\u101E-\u102A\u102C\u102E-\u103F\u104C-\u109F\u0020]))(\u1047)/g, function($0, $1)
   {
      return $1 ? $1 + '\u101B' : $0 + $1;
   }
   );
   // seven and ra

   output =  output.replace( /(\u1047)( ? = [\u1000 - \u101C\u101E - \u102A\u102C\u102E - \u103F\u104C - \u109F\u0020])/g, "\u101B");
   // seven and ra
   
  /* output =  output.replace( /(\u1031)?([\u1000-\u1021])(\u1039[\u1000-\u1021])?([\u102D\u102E\u1032])?([\u1036\u1037\u1038]{0,2})([\u103B-\u103C]{0,3})([\u102F\u1030])?([\u102D\u102E\u1032])?/g, "$2$3$6$1$4$8$7$5");
   // reordering storage order*/
   
   output =  output.replace( /(\u1031)?([\u1000-\u1021])(\u1039[\u1000-\u1021\u105A\u105C])?([\u102D\u102E\u1032\u1033\u1034\u1035])?([\u1036\u1037\u1038]{0,2})([\u103B-\u103C]{0,3})([\u102F\u1030])?([\u1036\u1037\u1038]{0,2})([\u102D\u102E\u1032])?/g, "$2$3$6$1$4$9$7$5$8");
   // reordering storage order (\u105E\u105F\u1060)
   output = output.replace(ans+u, u+ans);
    output =  output.replace ( /\u1007\u103A/g, "\u1007\u103A"); // kwat rat
    output =  output.replace( /(\u1029)( ? = [\u1000 - \u101C\u101E - \u102A\u102C\u102E - \u103F\u104C - \u109F\u0020])/g, Aao); /// Aao reorder
    output =  output.replace( /(\u1004)/g, "\u105A"); // Mon Nga
    output =  output.replace( /(\u103A)(\u1037)/g, "$2$1");
    output =  output.replace( /(\u102F)(\u1035)/g, "$2$1");  // Mon reorder
    output =  output.replace( /(\u1032)(\u102F)/g, "$2$1");  // Mon reorder
    output =  output.replace( /(\u102F)(\u1033)/g, "$2$1");  // Mon reorder
    output =  output.replace( /(\u102F)(\u102D)/g, "$2$1");  // Mon reorder
    output =  output.replace( /(\u102F)(\u102E)/g, "$2$1");  // Mon reorder
    output =  output.replace( /(\u102F)(\u1033)/g, "$2$1");  // Mon reorder
    output =  output.replace( /(\u102F)(\u1035)/g, "$2$1");  // Mon reorder
    output =  output.replace( /(\u1032)(\u103D)/g, "$2$1");  // Mon reorder
    output =  output.replace( /(\u103A)(\u103E)/g, "$2$1");  // Mon reorder
    /////////Mon re-order-Media
    output =  output.replace( /([\u102D\u102E\u1032-\u1036])([\u105E\u105F\u1060\u103D\u103E])/g, '$2$1');
    output =  output.replace( /([\u102D\u102E\u1032-\u1035])(\u1039[\u1000-\u1021\u105A\u105C])/g, '$2$1');
    output =  output.replace( /\u1031([\u103A\u103B-\u103E\u105C-\u105F\u1060]+)/g, '$1\u1031');             /// Mon reorder
    output =  output.replace( /\u1031(\u1039[\u1000-\u1021\u105A\u105C])/g, "$1\u1031");
    output =  output.replace( /([\u1000-\u1021\u105A\u105C])(\u103C)(\u105A\u103A\u1039)/g, "$3$1$2");
    output =  output.replace( /\u1031([u105B\u105D])/g, "$1\u1031");
    //// Double error2one
    output =  output.replace ( /\u102B\u102B/g, "\u102B");
    output =  output.replace ( /\u102C\u102C/g, "\u102C");
    output =  output.replace ( /\u102D\u102D/g, "\u102D");
    output =  output.replace ( /\u102E\u102E/g, "\u102E");
    output =  output.replace ( /\u102F\u102F/g, "\u102F");
    output =  output.replace ( /\u1030\u1030/g, "\u1030");
    output =  output.replace ( /\u1032\u1032/g, "\u1032");
    output =  output.replace ( /\u1033\u1033/g, "\u1033");
    output =  output.replace ( /\u1034\u1034/g, "\u1034");
    output =  output.replace ( /\u1035\u1035/g, "\u1035");
    output =  output.replace ( /\u1036\u1036/g, "\u1036");
    output =  output.replace ( /\u1038\u1038/g, "\u1038");
    output =  output.replace ( /\u103A\u103A/g, "\u103A");
    output =  output.replace ( /\u103B\u103B/g, "\u103B");
    output =  output.replace ( /\u103C\u103C/g, "\u103C");
    output =  output.replace ( /\u103D\u103D/g, "\u103D");
    output =  output.replace ( /\u103E\u103E/g, "\u103E");
    output =  output.replace ( /\u1039\u105A\u1039\u105A/g, "\u1039\u105A");
    output =  output.replace ( /\u105E\u105E/g, "\u105E");
    output =  output.replace ( /\u105F\u105F/g, "\u105F");
    output =  output.replace ( /\u1060\u1060/g, "\u1060");
    output =  output.replace( /\u0020\u102D/g, '\u102D'); //REMOVE-SPACE
    output =  output.replace( /\u0020\u102E/g, '\u102E'); //REMOVE-SPACE
    output =  output.replace( /\u0020\u102F/g, '\u102F'); //REMOVE-SPACE
    output =  output.replace( /\u0020\u1030/g, '\u1030'); //REMOVE-SPACE
    output =  output.replace( /\u0020\u1032/g, '\u1032'); //REMOVE-SPACE
    output =  output.replace( /\u0020\u1033/g, '\u1033'); //REMOVE-SPACE
    output =  output.replace( /\u0020\u1034/g, '\u1034'); //REMOVE-SPACE
    output =  output.replace( /\u0020\u1035/g, '\u1035'); //REMOVE-SPACE
    output =  output.replace( /\u0020\u1036/g, '\u1036'); //REMOVE-SPACE
    output =  output.replace( /\u0020\u1038/g, '\u1038'); //REMOVE-SPACE
    output =  output.replace( /\u0020\u103A/g, '\u103A'); //REMOVE-SPACE
    output =  output.replace( /\u0020\u103D/g, '\u103D'); //REMOVE-SPACE
    output =  output.replace( /\u0020\u103E/g, '\u103E'); //REMOVE-SPACE
    output =  output.replace( /\u0020\u105E/g, '\u105E'); //REMOVE-SPACE
    output =  output.replace( /\u0020\u105F/g, '\u105F'); //REMOVE-SPACE
    output =  output.replace( /\u0020\u1060/g, '\u1060'); //REMOVE-SPACE
   // For Latest Unicode Font only Mon.
   return output;
}//Mon_Uni
document.body.innerHTML=Mon_Uni(document.body.innerHTML);