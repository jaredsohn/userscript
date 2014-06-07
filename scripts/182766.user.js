// ==UserScript==
// @name        napi.hu
// @namespace   rw
// @description retardáltszűrő a napi.hu online gazdasági lapra
// @grant       none
// @include     http://www.napi.hu/*
// @version     1
// ==/UserScript==
// Előre definiált retardáltak, tetszőlegesen módosítható a tömb
var retardaltak = ['Blama','Kotkodus','newyork12','VoIe','homeros','pop23','hunIand'];
for (var i=0;i<retardaltak.length;i++)
{
    var s = $('div[class=forumtopics] > div > div > b:contains('+retardaltak[i]+')');
    s.parent().parent().parent().remove();
}
for (var i=0;i<retardaltak.length;i++)
{
    var s = $('div[class=forumtopics] > div > b:contains('+retardaltak[i]+')');
    s.parent().parent().remove();
}
