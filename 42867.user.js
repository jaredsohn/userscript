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
// A - Gorin Castle 65
// B - Attack Boss 66
// C – Chat 67
// D – DarkVale 68
// E - 100% LHP 69
// F – Chat Flagg 70
// G - W/D 70K 71
// H - Back to Pass 72
// I – Explore 73
// J - Others here 74
// K - Krali Moutains to Pray 75
// L - Location clear 76
// M - Monster List 77
// N – Inventory 78
// O – Battle 79
// P – Pray 80
// Q - Chat Carve 81
// R - Chat Rale 82
// S – 1001 83
// T - Chat Tarrgon 84
// U - First Aid 85
// V - Chat opfobo 86
// W - Chat Racin 87
// X - Swap Back to Vlad 88
// Y - Check Battle Rules 89
// Z - Vlad swap to Gutdrop 90

// 1 - Lesser Shield 49
// 2 - Lesser Armor 50
// 3 - Summon Skeleton 51
// 4 – Shield 52
// 5 - Focus  53 
// 8 - Lesser Healing 56
// 9 - Healing Potion 57
// 0 - Greater Healing Potion 48

// Enter – Clan 13

// Space - Hunting Rank 32

// Change 2090 to whatever your character number is
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

  var k = event.keyCode;

  if (k == 65) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CHAT&var2=2884';
  }
if (k == 66) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=COMBAT&command=fightboss';
  } if (k == 67) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?command=Logout';
  } if (k == 68) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CLANPAGE&var1=1106';
  } if (k == 69) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Focus+Scroll&var2=20&var3=2090&Submit=GO&command=Transfer&screen=TRANSFER';
  } if (k == 70) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CHAT&var2=9519';
  } if (k == 71) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?command=swapcharacter&var1=18645';
  } if (k == 72) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?command=swapcharacter&var1=12073';
  } if (k == 73) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=EXPLORING';
  } if (k == 74) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=OTHERS';
  } if (k == 75) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Summon+Skeleton&var2=20&var3=2090&Submit=GO&command=Transfer&screen=TRANSFER';
  } if (k == 76) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=LOCATION';
  } if (k == 77) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Greater+Healing+Potion&var2=1000&var3=2090&Submit=GO&command=Transfer&screen=TRANSFER';
  } if (k == 78) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=INVENTORY';
  } if (k == 79) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=COMBAT';
  } if (k == 80) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?command=Prayer';
  } if (k == 81) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CHAT&var2=2090';
  } if (k == 82) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CHAT&var2=2850';
  } if (k == 83) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CHAT&var2=5287';
  } if (k == 84) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?username=Finduilas+&password=MissBitch1+&Submit=Submit';
  } if (k == 85) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=INVENTORY&command=equip&var1=Greater%20Healing%20Potion';
  } if (k == 86) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=ADVANCEDCOMBAT';
  } if (k == 87) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CHAT&var2=2854';
  } if (k == 88) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Shield+Scroll&var2=20&var3=2090&Submit=GO&command=Transfer&screen=TRANSFER';
  } if (k == 89) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Lesser+Shield+Scroll&var2=20&var3=2090&Submit=GO&command=Transfer&screen=TRANSFER';
  } if (k == 90) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Lesser+Focus+Scroll&var2=20&var3=2090&Submit=GO&command=Transfer&screen=TRANSFER';
  } if (k == 49) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=12073&var1=Lesser+Shield+Scroll&command=use&screen=SCROLLS';
  } if (k == 50) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=12073&var1=Lesser+Focus+Scroll&command=use&screen=SCROLLS';
  } if (k == 51) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=12073&var1=Summon+Skeleton&command=use&screen=SCROLLS';
  } if (k == 52) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=12073&var1=Shield+Scroll&command=use&screen=SCROLLS';
  } if (k == 53) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=12073&var1=Focus+Scroll&command=use&screen=SCROLLS';
  } if (k == 54) {
    document.location.href = ' http://92.48.103.52/fantasy/game.php?screen=PVP&command=Attack&var1=7593';
  } if (k == 55) {
    document.location.href = ' http://92.48.103.52/fantasy/game.php?screen=PVP&command=Attack&var1=15803';
  } if (k == 56) {
    document.location.href = ' http://92.48.103.52/fantasy/game.php?screen=PVP&command=Attack&var1=12472';
  } if (k == 57) {
    document.location.href = ' http://92.48.103.52/fantasy/game.php?screen=PVP&command=Attack&var1=10375';
}if (k == 59) {
    document.location.href = ' http://92.48.103.52/fantasy/game.php?screen=PVP&command=Attack&var1=12783';
  } if (k == 48) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=PVP&command=Attack&var1=16030';
  } if (k == 32) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=STATS&command=hunting';
  } if (k == 13) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CLAN';
  }if (k == 46) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CHAT&var2=12074';
}
}
