// ==UserScript==
// @name	Facebook Spam Bomber
// @namespace	Facebook Spam Bomber
// @description	Mengirim banyak pesan di wall dengan pesan sampah
// @include 	http://www.facebook.com/*
// ==/UserScript==

function sendclick(el){
var clickevent=document.createEvent("MouseEvents");
clickevent.initEvent("click", true, true);
el.dispatchEvent(clickevent);}

function spamtastic(){
var ray = ["I am very like it..","Keren...sangggaaaaadddd....","Hebaaatt....saaaannnnggggaaaaddd...","Lumayan menghibur pengungsi Merapi...","Aduh.... aku lupa passwordmu...","Ahhh... jangan suka bikin gosip to mas'e....","Monggo dilanjut...","sungguh hebat..","pollaaaaahhhhmmmuuuuuu...deeeeeeee","Saya selalu suka status Anda...","i am very like it..","Anda sangat berbakat,teman...","Berhentilah mengeluh, sobat...","Sangat suka sekali dengan cihuy...","heeeemmmmmfffzzz....marai kopyor dengkulku","Saya sependapat dengan Anda...","Wis wayahe tobat...","Permisi, apakah anda butuh calon suami yang hipersex??","hiiiiyyyyooooohhhhh...","i am very like it..","Keren...sangggaaaaadddd....","Hebaaatt....saaaannnnggggaaaaddd...","Lumayan menghibur pengungsi Merapi...","Aduh.... aku lupa passwordmu...","Ahhh... jangan suka bikin gosip to mas'e....","Monggo dilanjut...","Sungguh hebat engkau malam ini...","Pollaaaaahhhhmmmuuuuuu...deeeeeeee","Status Anda sangat bermutu dan berbobot","Mungkin Anda saat ini memang belum beruntung...","Berhentilah membuat status sampah...","Facebook ki apa to??","Mari membuat perubahan yang nyata...","Remove me from your friends list..","Yes, I am a bastard...","Bodoh sekali bila kau percaya aku...","Semua itu bermula dari cemoohanmu..."].sort(function() {return 0.5 - Math.random()});

ii=0;
function a(){
var mytxt=ray.pop();
var UIComposer=unsafeWindow["UIComposer"];
for(var i in UIComposer.instances){if(UIComposer.instances[i].root.className.indexOf("UIComposer_STATE_INPUT_DISABLED")==-1){ii++;
UIComposer.instances[i].setMessage(mytxt);UIComposer.instances[i].focusInput();UIComposer.instances[i].post();}}
if(ray.length<=1)
ray = ["Saya selalu suka status Anda...","I am very like it..","Anda sangat berbakat,teman...","Berhentilah mengeluh, sobat...","Sangat suka sekali dengan cihuy...","heeeemmmmmfffzzz....marai kopyor dengkulku","Saya sependapat dengan Anda...","Wis wayahe tobat...","Permisi,kamar mandi sebelah mana ya??","hiiiiyyyyooooohhhhh...","I am very like it..","Keren...sangggaaaaadddd....","Hebaaatt....saaaannnnggggaaaaddd...","Lumayan menghibur pengungsi Merapi...","Aduh.... aku lupa passwordmu...","Ahhh... jangan suka bikin gosip to mas'e....","Monggo dilanjut...","Sungguh hebat engkau malam ini...","Pollaaaaahhhhmmmuuuuuu...deeeeeeee","Status Anda sangat bermutu dan berbobot","Mungkin Anda saat ini memang belum beruntung...","Berhentilah membuat status sampah...","Facebook ki apa to??","Mari membuat perubahan yang nyata...","Remove me from your friends list..","Yes, I am a bastard...","Bodoh sangat bila kau percaya aku...","Semua itu bermula dari cemoohanmu","Status ini hanya untukmu...","Bot?","Maafkan aku yang telah menyusahkanmu","Account ini telah dikuasai Si Zuckenberg","Max Cavalera ki pancen idolaku...","Account ini telah diambil alih sebuah bot...","Ketik UNREG(spasi)BANJIR untuk berhenti berlangganan spam... (melu2 bot'e MarahMerah)","Berhentilah menghakimi aku...","Aku nyaman didekatmu...(Bullshiiiit!)","Mulakno rasah macem2..."].sort(function() {return 0.5 - Math.random()});
setTimeout(a,500);

}
a();

}

GM_registerMenuCommand("::spam bomber by boy.nck::",function(){spamtastic()});
