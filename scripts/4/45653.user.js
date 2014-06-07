// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to 'Install User Script'.
// Accept the default configuration and install.
//
// THANK YOU TO http://blog.persistent.info/2007/11/mac ? gmail.html for keyboard listening script

//9  = Tab  
//11 = Home  
//13 = Enter
//32  = Space Bar  
//33  =   !     34  =   '
//35  =   #     36  =   $     37  =   %
//38  =   &     39  =   '     40  =   (
//41  =   )     42  =   *     43  =   +
//44  =   ,     45  =   -     46  =   .
//47  =   /     48  =   0     49  =   1
//50  =   2     51  =   3     52  =   4
//53  =   5     54  =   6     55  =   7
//56  =   8     57  =   9     58  =   :
//59  =   ;     60  =   <     61  =   =
//62  =   >     63  =   ?     64  =   @
//65  =   A     66  =   B     67  =   C
//68  =   D     69  =   E     70  =   F
//71  =   G     72  =   H     73  =   I
//74  =   J     75  =   K     76  =   L
//77  =   M     78  =   N     79  =   O
//80  =   P     81  =   Q     82  =   R
//83  =   S     84  =   T     85  =   U
//86  =   V     87  =   W     88  =   X
//89  =   Y     90  =   Z     91  =   [
//92  =   \     93  =   ]     94  =   ^
//95  =   -     96  =   `     97  =   a
//98  =   b     99  =   c     100  =   d
//101  =   e     102  =   f     103  =   g
//104  =   h     105  =   i     106  =   j
//107  =   k     108  =   l     109  =   m
//110  =   n     111  =   o     112  =   p
//113  =   q     114  =   r     115  =   s
//116  =   t     117  =   u     118  =   v
//119  =   w     120  =   x     121  =   y
//122  =   z     123  =   {     124  =   |
//125  =   }     126  =   ~
//
// A - Hunt 65
// B - Fishing 66
// C – Drake 67
// D – Equipment 68
// E - Players On line 69
// F – 70
// G -  71
// H -  72
// I – inventory 73
// J - 74
// K - Vai 75
// L - Location Clear 76
// M - Pray 77
// N – Mining 78
// O – Others here 79
// P –  80
// Q -  Hunt 81
// R - Forgaging 82
// S – Rat 83
// T -  Weaponcraft - Small Knife 84
// U -  85
// V - Zap 86
// W - Warhorse 87
// X -  Pray 88
// Y -  City 89
// Z -  Heal 90

// 1 - Flee 49
// 2 - Woods of Vai 50
// 3 - Heal  51
// 4 –  52
// 5 -  Woods of Vai 53 
// 6 -  Nerlan 54
// 7 -  Mountains 55
// 8 -  Fields 56
// 9 -  Town of Spuun 57
// 0 -  Pray 48

// Enter –  13

// Space - Char page 32

// ; - 59


// Change 2090 to whatever your character number is
// MADE BY AZNCHONG91
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          DicingDangers Shortcuts
// @namespace     http://diveintogreasemonkey.org/download/
// @description   example script to alert 'Hello world!' on every page
// @include       http://www.dicingdangers.com/fantasy3/*
// @include       http://www.dicingdangers.com/fantasy3/*
//
// ==/UserScript==

document.addEventListener('keydown', keyHandler, false);
function keyHandler(event) {

  if (event.altKey || event.ctrlKey || event.metaKey) return;

  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == 'textarea' ||
        (targetNodeName == 'input' && event.target.type &&
         (event.target.type.toLowerCase() == 'text' ||
          event.target.type.toLowerCase() == 'file'))) {
      return;
    }
  }

  var k = event.keyCode;

  if (k == 65) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=hunting&a=hunt';
  }
if (k == 66) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=fishing';
  } if (k == 67) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=inventory&command=equip&var1=2082';
  } if (k == 68) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=equipment';
  } if (k == 69) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=home';
  } if (k == 70) {
    document.location.href = '';
  } if (k == 71) {
    document.location.href = '';
  } if (k == 72) {
    document.location.href = '';
  } if (k == 73) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=inventory';
  } if (k == 74) {
    document.location.href = '';
  } if (k == 75) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=location&command=Move&var1=Woods%20of%20Vai';
  } if (k == 76) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=location';
  } if (k == 77) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=location&command=pray';
  } if (k == 78) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=mining';
  } if (k == 79) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=others';
  } if (k == 80) {
    document.location.href = '';
  } if (k == 81) {
    document.location.href = '';
  } if (k == 82) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=foraging';
  } if (k == 83) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=inventory&command=use&var1=2095&varbox=1';
  } if (k == 84) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=weaponcrafting&command=craft&var1=1079';
  } if (k == 85) {
    document.location.href = '';
  } if (k == 86) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=combat&var1=257141&a=soz';
  } if (k == 87) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=inventory&command=equip&var1=2085';
  } if (k == 88) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=location&command=pray';
  } if (k == 89) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=location&command=Move&var1=City%20of%20Nerlan';
  } if (k == 90) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=location&command=rest';
  } if (k == 49) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=combat&a=flee';
  } if (k == 50) {
    document.location.href = '';
  } if (k == 51) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=location&command=pray';
  } if (k == 52) {
    document.location.href = '';
  } if (k == 53) {
    document.location.href = '';
  } if (k == 54) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=location&command=Move&var1=Nerlan%20Swamp';
  } if (k == 55) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=location&command=Move&var1=Dark%20Mountains';
  } if (k == 56) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=location&command=Move&var1=Forest%20of%20Dooom';
  } if (k == 57) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=location&command=Move&var1=Town%20of%20Spuun';
  }if (k == 59) {
    document.location.href = '';
  } if (k == 48) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=location&command=pray';
  } if (k == 32) {
    document.location.href = 'http://www.dicingdangers.com/fantasy3/game.php?s=character';
  } if (k == 13) {
    document.location.href = '';
  }if (k == 46) {
    document.location.href = '';
}
}