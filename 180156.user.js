// ==UserScript==
// @name        Replace cashU with onecard
// @include     https://server1.maximuscards.com/gcpayx2.php
// @version     1
// @grant       none
// ==/UserScript==
document.body.innerHTML = document.body.innerHTML.replace( '<input name="paymethod" value="845" type="radio">' , '<input type="radio" name="paymethod" value="onecard"/>');
document.body.innerHTML = document.body.innerHTML.replace( '<img src="https://d1xisgsa7jkz88.cloudfront.net/Images/cashu.jpg" alt="cashU/Ukash voucher Logo">' , '<img src="https://d1xisgsa7jkz88.cloudfront.net/Images/onecard.png" alt="OneCard" />');
document.body.innerHTML = document.body.innerHTML.replace( '<p></p><div class="indented">cashU/Ukash voucher</div><p></p><br>' , '<p></p><div class="indented">Onecard</div><p></p><br>');