// ==UserScript==
// @name       Kaskus Spam Killer - FJB Handphone
// @namespace  http://www.code-latte.com/
// @version    0.1
// @description  kill spam threads on FJB Handphone
// @match      http://www.kaskus.co.id/*
// @copyright  2013, www.code-latte.com
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

var SPAM_DB_TEXT = [
	'DI JUAL APPLE IPHONE 5 16GB, 32GB, 64GB call/sms',
    'JUAL APPLE IPHONE 4S 16 GB SPECIAL BM',
    'DI JUAL IPHONE 4S DAN 5S BM TERSEGEL FULLSET',
    'APPLE IPHONE:4s 16 GB HRG SPECIAL',
    'APPLE iPHONE4S & 5 NEW FULLSET (BM)',
    'DI JUAL IPHONE4S DAN 5S BM TERSEGEL FULLSET',
    'BINTANG ELEKTRONIK:menawarkan',
    'WAHYU PHONSEL MENAWARKAN',
    'APPLE IPHONE4S 16GB BNIB NEW HRG PROMO BM',
    'JUAL APPLE IPHONE5S-4S&5 16GB 32G 64GB&BLACKBERRY Z10/Q10 FU/GSM',
    'OKE SHOP BNIB APPLE IPHONE',
    'APPLE IPHONE5 16GB>SONY XPERIA>SAMSUNG S4>BB Q10> FULLSET GSM ORIGINAL GRANSI RESMI',
    'JUAL APPLE IPHONE5S-4S&5 16GB 32G 64GB&BLACKBERRY Z10/Q10',
    'DI JUAL APPLE IPHONE5 16GB, 32GB, 64GB',
    'iPhone4S 16GB-32GB-64GB New Original Termurah Se-KASKUSER',
    'iPhone5 16GB-32GB-64GB New Original Termurah Se-KASKUSER'
];

var i;

for(i=0; i<SPAM_DB_TEXT.length; i++){
    $('.post-title a:contains("'+SPAM_DB_TEXT[i]+'")').hide();
}
