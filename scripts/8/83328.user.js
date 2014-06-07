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
// A - Add Soul 65
// B - Bank 66
// C – Convert 67
// D – Drink Rat blood 68
// E - hellkat 69
// F – Friends 70
// G - Gold Market 71
// H - Vlad Status 72
// I – inventory 73
// J - Use escape preference 74
// K - Capture List 75
// L - Lair 76
// M - Mining 77
// N – North 78
// O – Occult shop 79
// P – Prowl 80    
// Q - Soul collector Quests 81
// R - Train Labor 82
// S – Sent message 83
// T - Training Gym x 1 84
// U - Trade Centre 85
// V - Events 86
// W - Wolf Venom 87
// X - souls market 88
// Y - Add item to trade box 89
// Z - Mining and Misc Shop 90

// 1 - Energy refill 49
// 2 - Venom 50
// 3 - Training Speed 51
// 4 – Intensive Training 52
// 5 - Med Garnet 53
// 6 - Med Sapphire 54
// 7 - Gold Fragments 55
// 8 - Boa 56
// 9 - Attack Vickor 57
// 0 - Ghost 48

// Enter – HOF labour  13

// Space - Mail Box 32

// ; Stinging Nettles - 59


// Change 2090 to whatever your character number is
// MADE BY Dragged to Hell [477927]
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          IN12DEF
// @namespace     http://diveintogreasemonkey.org/download/
// @description   example script to alert 'Hello world!' on every page
// @include       http://www.immortalnight.com/*
// @include       http://www.immortalnight.com/*
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
    document.location.href = 'http://www.immortalnight.com/soulcollector.php?action=add';
  }
if (k == 66) {
    document.location.href = 'http://www.immortalnight.com/bank.php';
  } if (k == 67) {
    document.location.href = 'http://www.immortalnight.com/citygrid.php?action=convert';
  } if (k == 68) {
    document.location.href = 'http://www.immortalnight.com/itmuse.php?ID=27';
  } if (k == 69) {
    document.location.href = 'http://www.immortalnight.com/viewuser.php?u=588745';
  } if (k == 70) {
    document.location.href = 'http://www.immortalnight.com/friendslist.php';
  } if (k == 71) {
    document.location.href = 'http://www.immortalnight.com/cmarket.php';
  } if (k == 72) {
    document.location.href = 'http://www.immortalnight.com/viewuser.php?u=477927';
  } if (k == 73) {
    document.location.href = 'http://www.immortalnight.com/inventory.php';
  } if (k == 74) {
    document.location.href = 'http://www.immortalnight.com/itmuse.php?ID=34';
  } if (k == 75) {
    document.location.href = 'http://www.immortalnight.com/capture.php';
  } if (k == 76) {
    document.location.href = 'http://www.immortalnight.com/index.php';
  } if (k == 77) {
    document.location.href = 'http://www.immortalnight.com/mine.php';
  } if (k == 78) {
    document.location.href = 'http://www.immortalnight.com/citygrid.php?action=north';
  } if (k == 79) {
    document.location.href = 'http://www.immortalnight.com/shops.php?shop=3';
  } if (k == 80) {
    document.location.href = 'http://www.immortalnight.com/prowl.php';
  } if (k == 81) {
    document.location.href = 'http://www.immortalnight.com/quests.php';
  } if (k == 82) {
    document.location.href = 'http://www.immortalnight.com/gym.php?stat=Labour&amnt=36';
  } if (k == 83) {
    document.location.href = 'http://www.immortalnight.com/mailbox.php?action=outbox';
  } if (k == 84) {
    document.location.href = 'http://www.immortalnight.com/gym.php?stat=Labour&amnt=1';
  } if (k == 85) {
    document.location.href = 'http://www.immortalnight.com/trading.php';
  } if (k == 86) {
    document.location.href = 'http://www.immortalnight.com/events.php';
  } if (k == 87) {
    document.location.href = 'http://www.immortalnight.com/venom.php?id=46';
  } if (k == 88) {
    document.location.href = 'http://www.immortalnight.com/soulmarket.php';
  } if (k == 89) {
    document.location.href = 'http://www.immortalnight.com/trading.php?action=add';
  } if (k == 90) {
    document.location.href = 'http://www.immortalnight.com/shops.php?shop=5';
    } if (k == 49) {
    document.location.href = 'http://www.immortalnight.com/goldexchange.php?spend=refill';
  } if (k == 50) {
    document.location.href = 'http://www.immortalnight.com/venom.php?id=745';
  } if (k == 51) {
    document.location.href = 'http://www.immortalnight.com/gym.php?stat=Defense&amnt=34';
  } if (k == 52) {
    document.location.href = 'http://www.immortalnight.com/powergym.php?stat=Accuracy&amnt=40';
  } if (k == 53) {
    document.location.href = 'http://www.immortalnight.com/gym.php?stat=Strength&amnt=40';
  } if (k == 54) {
    document.location.href = 'http://www.immortalnight.com/itemmarket.php?type=182';
  } if (k == 55) {
    document.location.href = 'http://www.immortalnight.com/itemmarket.php?type=191';
  } if (k == 56) {
    document.location.href = 'http://www.immortalnight.com/itemmarket.php?type=49';
  } if (k == 57) {
    document.location.href = 'http://www.immortalnight.com/attack.php?nextstep=1&ID=16&wepid=118&btent=Yes&ds=8&rt=1';
  }if (k == 59) {
    document.location.href = 'http://www.immortalnight.com/itmuse.php?ID=30';
  } if (k == 48) {
    document.location.href = 'http://www.immortalnight.com/donator.php';
  } if (k == 32) {
    document.location.href = 'http://www.immortalnight.com/mailbox.php?action=viewmore';
  } if (k == 13) {
    document.location.href = 'http://www.immortalnight.com/halloffame.php?action=labour&filter=all&pfilter=all&rfilter=novice';
  }if (k == 46) {
    document.location.href = '';
}
}
