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
// C – logout 67
// D – Login as Vlad 68
// E - Sheild scroll x 3 69
// F – PvM 100% flee 70
// G - Swap to Unc 71
// H - Swap to Vlad 72
// I – Explore 73
// J - Others here 74
// K - Skelies x 3 75
// L - Location clear 76
// M - tf x 100 lhp 77
// N – Remove Alerts 78
// O – Battle 79
// P – Pray 80
// Q - Chat Lil 81
// R - Chat SK 82
// S – 1st Aid 83
// T - Activate Fin 84
// U - use lhp 85
// V - Battle rules 86
// W - Chat Eamane 87
// X - tf Focus x 3 88
// Y - tf x 3 lesser shield Rules 89
// Z - tf x 3 lesser focus 90

// 1 - Lesser Shield 49
// 2 - Lesser Armor 50
// 3 - Summon Skeleton 51
// 4 – Shield 52
// 5 - Focus  53 
// 6 - Scrolls 54
// 7 - Logg 55
// 8 - Darkvale 56
// 9 - Gorin Castle 57
// 0 - Pray at Temple 48

// Enter – Clan 13

// Space - Hunting Rank PvM 30% flee 32

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
    document.location.href = 'http://92.48.103.52/fantasy/game.php?username=Vlada&password=hailmary&Submit=Submit';
  } if (k == 69) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Focus+Scroll&var2=3&var3=6316&Submit=GO&command=Transfer&screen=TRANSFER';
  } if (k == 70) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Flee&var2=None&var3=%3C+100%25&var4=%3E+0&var5=%3E+0&var6=None&var7=PvM&var8=100&var10=&command=updaterule&screen=ADVANCEDCOMBAT&Submit2=Submit';
  } if (k == 71) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?command=swapcharacter&var1=6316';
  } if (k == 72) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?command=swapcharacter&var1=2090';
  } if (k == 73) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=EXPLORING';
  } if (k == 74) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=OTHERS';
  } if (k == 75) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Summon+Skeleton&var2=3&var3=6316&Submit=GO&command=Transfer&screen=TRANSFER';
  } if (k == 76) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=LOCATION';
  } if (k == 77) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Lesser+Healing+Potion&var2=100&var3=6316&Submit=GO&command=Transfer&screen=TRANSFER';
  } if (k == 78) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?command=Removealerts';
  } if (k == 79) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=COMBAT';
  } if (k == 80) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?command=Prayer';
  } if (k == 81) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CHAT&var2=11388';
  } if (k == 82) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CHAT&var2=5287';
  } if (k == 83) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?command=Rest';
  } if (k == 84) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?username=Finduilas+&password=MissBitch1+&Submit=Submit';
  } if (k == 85) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=INVENTORY&command=equip&var1=Lesser%20Healing%20Potion';
  } if (k == 86) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=ADVANCEDCOMBAT';
  } if (k == 87) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CHAT&var2=1602';
  } if (k == 88) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Shield+Scroll&var2=3&var3=6316&Submit=GO&command=Transfer&screen=TRANSFER';
  } if (k == 89) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Lesser+Shield+Scroll&var2=3&var3=6316&Submit=GO&command=Transfer&screen=TRANSFER';
  } if (k == 90) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Lesser+Focus+Scroll&var2=3&var3=6316&Submit=GO&command=Transfer&screen=TRANSFER';
  } if (k == 49) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=6316&var1=Lesser+Shield+Scroll&command=use&screen=SCROLLS';
  } if (k == 50) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=6316&var1=Lesser+Focus+Scroll&command=use&screen=SCROLLS';
  } if (k == 51) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=6316&var1=Summon+Skeleton&command=use&screen=SCROLLS';
  } if (k == 52) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=6316&var1=Shield+Scroll&command=use&screen=SCROLLS';
  } if (k == 53) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var5=6316&var1=Focus+Scroll&command=use&screen=SCROLLS';
  } if (k == 54) {
    document.location.href = ' http://92.48.103.52/fantasy/game.php?screen=SCROLLS';
  } if (k == 55) {
    document.location.href = ' http://92.48.103.52/fantasy/game.php?screen=LOGGING';
  } if (k == 56) {
    document.location.href = ' http://92.48.103.52/fantasy/game.php?screen=LOCATION&command=Move&var1=Darkvale%20of%20Vai';
  } if (k == 57) {
    document.location.href = ' http://92.48.103.52/fantasy/game.php?screen=LOCATION&command=Move&var1=Gorin%20Castle';
}if (k == 59) {
    document.location.href = ' http://92.48.103.52/fantasy/game.php?var1=Flee&var2=None&var3=%3C+100%25&var4=%3E+0&var5=%3E+0&var6=None&var7=PvP&var8=100&var10=&command=updaterule&screen=ADVANCEDCOMBAT&Submit2=Submit';
  } if (k == 48) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=TEMPLES&command=pray&var1=Hurn';
  } if (k == 32) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?var1=Flee&var2=None&var3=%3C+30%25&var4=%3E+0&var5=%3E+0&var6=None&var7=PvM&var8=100&var10=&command=updaterule&screen=ADVANCEDCOMBAT&Submit2=Submit';
  } if (k == 13) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CLAN';
  }if (k == 46) {
    document.location.href = 'http://92.48.103.52/fantasy/game.php?screen=CHAT&var2=12074';
}
}