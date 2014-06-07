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
// Q - w/d Lesser Scroll 81
// W - w/d Lesser Shield 87
// E - w/d Goblin Scroll 69
// R - w/d Skeleton Scroll 82
// T - w/d Focus Scroll 84
// Y - Check Battle Rules 89
//
// A - Cast Lesser Focus plyr2 65
// S – Cast Lesser Shield plyr2 83
// D – Cast Summon Goblin 68
// F – Cast Summon Skeleton 70 
// G - Cast Focus plyr2 71
// H - Cast Shield plyr2 72
//
// Z - RippeR swap to VippeR 90
// X - Swap Back to RippeR 88
//
// C – Character View 67 
// V - Equipment View 86
// B - Bank View 66 
// N – Inventory View 78
// J - Others here 74
//
// U - First Aid 85
// I – Explore 73
// O – Battle 79
// P – Pray 80
// [ - Logging 91
// ] - Fishing 93
//
// K - Current Location 75
// L - Battle Boss 76
// M - Monster List 77

// 1 - Lesser Shield 49
// 2 - Lesser Armor 50
// 3 - Summon Goblin 51
// 4 – Summon Skeleton 52
// 5 - Focus 53
// 6 - Shield  54
//
// 7 -  Lesser Healing Potion 55
// 8 -  56
// 9 -  57
// 0 -  48

// Enter – Clan 13

// Space - Hunting Rank 32

// Change 19671 to whatever your character number is
// MADE BY AZNCHONG91
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          DicingDangers Shortcuts
// @namespace     http://diveintogreasemonkey.org/download/
// @description   example script to alert 'Hello world!' on every page
// @include       http://92.48.103.52/fantasy/*
// @include       http://92.48.103.52/fantasy/*
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

  var k = event.keyCode, sCn = '19666';

// WithDraw Scroll

  if (k == 81) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Lesser+Focus+Scroll&command=Inventory&var2=10&Submit=GO&screen=BANK';
  } if (k == 87) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Lesser+Shield+Scroll&command=Inventory&var2=10&Submit=GO&screen=BANK';
  } if (k == 69) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Summon+Goblin&command=Inventory&var2=2&Submit=GO&screen=BANK';
  } if (k == 82) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Summon+Skeleton&command=Inventory&var2=2&Submit=GO&screen=BANK';
  } if (k == 84) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Focus+Scroll&command=Inventory&var2=5&Submit=GO&screen=BANK';
  } if (k == 89) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Shield+Scroll&command=Inventory&var2=5&Submit=GO&screen=BANK';
  } 
  
// Plyr2 Magic Cast
  if (k == 65) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=19671&var1=Lesser+Focus+Scroll&command=use&screen=SCROLLS';
  } if (k == 83) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=19671&var1=Lesser+Shield+Scroll&command=use&screen=SCROLLS';
  } if (k == 68) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=19671&var1=Summon+Goblin&command=use&screen=SCROLLS';
  } if (k == 70) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=19671&var1=Summon+Skeleton&command=use&screen=SCROLLS';
  } if (k == 71) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=19671&var1=Focus+Scroll&command=use&screen=SCROLLS';
  } if (k == 72) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=19671&var1=Shield+Scroll&command=use&screen=SCROLLS';
  } 

// Swap Chharacter
  if (k == 90) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?command=swapcharacter&var1=19671';
  } if (k == 88) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?command=swapcharacter&var1=19666';
  } 

// Menu Action
  if (k == 67) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CHARACTER';
  } if (k == 86) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=EQUIPMENT';
  } if (k == 66) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=BANK';
  } if (k == 78) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=INVENTORY';
  } if (k == 74) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=OTHERS';
  } 

// HP Action
  if (k == 85) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?command=Rest';
  } if (k == 73) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=EXPLORING';
  } if (k == 79) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=TEMPLES&command=pray&var1=Hurn';
  } if (k == 80) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=LOGGING';
  }  

  if (k == 75) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=LOCATION';
  } if (k == 76) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=COMBAT&command=fightboss';
  } if (k == 77) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=STATS';
  } if (k == 58) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=FISHING';
  } if (k == 59) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=FISHING';
  }

//Plyr1 Magic Cast
  if (k == 49) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=19666&var1=Lesser+Focus+Scroll&command=use&screen=SCROLLS';
  } if (k == 50) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=19666&var1=Lesser+Shield+Scroll&command=use&screen=SCROLLS';
  } if (k == 51) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=19666&var1=Summon+Goblin&command=use&screen=SCROLLS';
  } if (k == 52) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=19666&var1=Summon+Skeleton&command=use&screen=SCROLLS';
  } if (k == 53) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=19666&var1=Focus+Scroll&command=use&screen=SCROLLS';
  } if (k == 54) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=19666&var1=Shield+Scroll&command=use&screen=SCROLLS';
  } 

// Reserved
  if (k == 55) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=INVENTORY&command=equip&var1=Lesser%20Healing%20Potion';
  } if (k == 56) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Gold&command=Inventory&var2=500&Submit=GO&screen=BANK';
  } if (k == 57) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Gold&var2=500&var3=19666&Submit=GO&command=Transfer&screen=TRANSFER';
} if (k == 48) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Gold&var2=500&var3=19671&Submit=GO&command=Transfer&screen=TRANSFER';
  } if (k == 32) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=STATS&command=hunting';
  } if (k == 13) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CLAN';
  }if (k == 46) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CHAT&var2=12074';
}
}