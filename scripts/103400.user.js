// ==UserScript==
// @name          Yahoo Answers Signature
// @namespace     http://userscripts.org/scripts/show/103400
// @description	  Menambahkan signature di setiap jawaban
// @author        gun_gun
// @version       0.2.1
// @include       http://answers.yahoo.com/question/answer*
// @include       http://*.answers.yahoo.com/question/answer*
// ==/UserScript==

// Edit nilai signaturemu
// Gunakan \n untuk ganti baris (enter)
var signature = "\ntertanda\n(gun_gun)";
var reference = "http://kikils.blogspot.com/";

// Signature di jawaban
var answerText = document.getElementById("yan-answer-answer");
answerText.value = signature;

// Signature di materi referensi
var answerSource = document.getElementById("yan-answer-source");
answerSource.value = reference;
