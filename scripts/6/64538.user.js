// Based on the original emoticonsforblogger by Eun Sara
// Modified by Eun Sara Hyun (http://frankymuffins.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// Saranggie cute smiley
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           EveryThings2 Emoticons (Eun Sara Hyun) 
// @namespace      http://frankymuffins.blogspot.com/)
// @description    Emoticons in Blogger Only by Frankymuffins.com 
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
                buttons += emoticonButton("divider4", "http://choco-milk.img.jugem.jp/20080704_481616.gif");
        buttons += emoticonButton(":)", "http://picto0.jugem.jp/y/u/u/yuupan/be41dcf023eb14098e733aa997d2e1fc.gif");
	buttons += emoticonButton(":(", "http://picto0.jugem.jp/c/h/o/choco-milk/d1f98e3ecc90a52b10979216d9d07505.gif");
	buttons += emoticonButton("Yay", "http://picto0.jugem.jp/m/a/c/machibana/994ee0fa684782accf472234efd5fac4.gif");
	buttons += emoticonButton("Lub", "http://picto0.jugem.jp/y/u/u/yuupan/fd8e8432293a7499157d32c651c8d688.gif");
	buttons += emoticonButton("Hehe", "http://picto0.jugem.jp/k/o/m/koma-cm/71b18ad2601028c7e640331072735b6b.gif");
	buttons += emoticonButton("Glide", "http://picto0.jugem.jp/k/o/h/kohl/00b84ac6baf58e339af6fab8487fbe16.gif");
	buttons += emoticonButton("Smirk", "http://picto0.jugem.jp/s/a/y/saya70/4dcb02fffe6134651090e237697d5819.gif");
	buttons += emoticonButton("o.o", "http://picto0.jugem.jp/c/h/o/choco-milk/205d8b9e8cf93bbb2d7c4419f97f0458.gif");
	buttons += emoticonButton("Sparkle", "http://picto0.jugem.jp/c/h/o/choco-milk/572b3bb4ad2364492a58819792d7a337.gif");
	buttons += emoticonButton("Peace", "http://picto0.jugem.jp/c/h/o/choco-milk/a9593363a9061124fdf8354dad4c4a4e.gif");
	buttons += emoticonButton("Rub", "http://picto0.jugem.jp/j/m/a/jmax/2f8e05c22a2d834211dbb1d991ebbcc5.gif");
	buttons += emoticonButton("Dizzy", "http://picto0.jugem.jp/c/h/o/choco-milk/e03889775fb61cabb0d38c9dee7b7518.gif");
	buttons += emoticonButton("Question", "http://picto0.jugem.jp/y/u/u/yuupan/d9faf16cc4bf4cbfbbefe9bd7be356e6.gif");
	buttons += emoticonButton("Write", "http://picto0.jugem.jp/s/n/o/snow72/9c9708314b054d19162769c09e79d84a.gif");
	buttons += emoticonButton("LMAO", "http://picto0.jugem.jp/s/n/o/snow72/b93f1246da15cca2da849600dbc82214.gif");
	buttons += emoticonButton("Cheer", "http://picto0.jugem.jp/r/e/l/rely-do/0e456a163af74ead4e44c4f03db3283a.gif");
	buttons += emoticonButton("Smoke", "http://picto0.jugem.jp/k/i/8/ki8sa/864a28a67667541adec47ada21e90e6c.gif");
	buttons += emoticonButton("Yawn", "http://picto0.jugem.jp/p/e/k/peko11/f2ae503336bc37795fb077ed9f1c8503.gif");
	buttons += emoticonButton("Clap", "http://picto0.jugem.jp/m/e/r/merisuga/684b6812f5620fcd8e0d1f0c2ae560d4.gif");
	buttons += emoticonButton("News", "http://picto0.jugem.jp/c/h/o/choco-milk/408541b96ef4c8d08e823982e555036d.gif");
	buttons += emoticonButton("Wave", "http://picto0.jugem.jp/n/i/k/nikunakatani/a119ee9097ba7f511ff1d285cbda07c6.gif");
	buttons += emoticonButton("Grad", "http://picto0.jugem.jp/t/s/u/tsuna0605/d9f22118dbf3ee2b94a71e0efd7656ad.gif");
	buttons += emoticonButton("Xmas", "http://picto0.jugem.jp/c/h/a/cha-me/30efa8e4b5cec1148b73ec05dd49e77f.gif");
        buttons += emoticonButton("star", "http://picto0.jugem.jp/n/a/t/natsukimax/5307b29a34d4b2578cb7d26e406e9a02.gif");
	buttons += emoticonButton("love", "http://picto0.jugem.jp/p/o/m/pomeyuu/33bd05e77c674a67c73a891b6f8aba6e.gif");
        buttons += emoticonButton("surat", "http://picto0.jugem.jp/y/u/u/yuupan/a3e2a642df0983fe9a4f45b1886586c8.gif");
        buttons += emoticonButton("duh", "http://picto0.jugem.jp/s/u/z/suzusa/40cef3c1288c9e3aaba255adce72e0ed.gif");
        buttons += emoticonButton("ape", "http://img529.imageshack.us/img529/4128/f20dq7.gif");
        buttons += emoticonButton("ribenatas", "http://picto0.jugem.jp/m/i/s/misa-526/780ce8173e049bbcbb87664d92b9b711.gif");
        buttons += emoticonButton("ribenbawah", "http://picto0.jugem.jp/m/i/s/misa-526/403c7c8ec61df3e06166c9b61c04f4a0.gif");
        buttons += emoticonButton("bunga", "http://picto0.jugem.jp/t/s/u/tsuna0605/173fe8b8f68c7884c5a75c2b6728bcc8.gif");
        buttons += emoticonButton("hati", "http://picto0.jugem.jp/t/a/k/takenaka-sei/224ee5cbaa4804e433e241d15edabccc.gif");
        buttons += emoticonButton("ntah", "http://picto0.jugem.jp/k/t/8/kt814/aec5d3d6ee722e68430c5399bef5ac67.gif");
        buttons += emoticonButton("huhu", "http://picto0.jugem.jp/y/u/u/yuupan/9739f0167138a7589c77b52876d2f719.gif");
        buttons += emoticonButton("soal", "http://picto0.jugem.jp/b/e/r/berry-jewel/7860cb148605cdd07e196ee73d8dde62.gif");
        buttons += emoticonButton("luv", "http://picto0.jugem.jp/c/h/1/ch1kaboo/95ba8f9b86f90d3fcd7984dc213a5e03.gif");
        buttons += emoticonButton("?", "http://picto0.jugem.jp/y/u/u/yuupan/97d4be3b15933f012d17c26960373a87.gif");
        buttons += emoticonButton("btng", "http://picto0.jugem.jp/a/o/u/aoume226/3df8318c0c38a857609426879cd45ba5.gif");
        buttons += emoticonButton("good", "http://picto0.jugem.jp/y/u/u/yuupan/e3d8da886eb4e74eb40d600e79fcaab4.gif");
        buttons += emoticonButton("heart", "http://picto0.jugem.jp/t/s/u/tsuna0605/b65a21ae966a092749f6c0ece234f346.gif");
        buttons += emoticonButton("serulove", "http://picto0.jugem.jp/a/n/d/andncnd/9e3692d2d14f94a6db341c191b9c75f7.gif");
        buttons += emoticonButton("smile3", "http://picto0.jugem.jp/c/a/z/cazsoul/e4f07deda18760286950ddc46731c52f.gif");
        buttons += emoticonButton("smilelove", "http://picto0.jugem.jp/k/7/1/k71117/8fe8d4a23ba13d838625eb9aa2ccc2ab.gif");
        buttons += emoticonButton("seru5", "http://picto0.jugem.jp/m/u/n/muneyuka/3818df21376d9cdc6defac5698c7ecf9.gif");
        buttons += emoticonButton("love6", "http://picto0.jugem.jp/h/a/r/haru--days/0bcf67fded2e0560a29b775c27a8f96d.gif");
        buttons += emoticonButton("rama2", "http://picto0.jugem.jp/a/m/a/amariege-blog/6f5af3c08e69746c5eb5ca08a941b5e2.gif");
        buttons += emoticonButton("jemur", "http://picto0.jugem.jp/c/o/u/countryzanmai/1183b6024886eaf56d4e0668861d738f.gif");
        buttons += emoticonButton("berair", "http://picto0.jugem.jp/j/m/a/jmax/4bcc3568a9aafe094f06f6655f44314c.gif");
        buttons += emoticonButton("kenyit", "http://picto0.jugem.jp/t/s/u/tsuna0605/27e7b8651fb2a0cd69bdb13f1756845d.gif");
        buttons += emoticonButton("tido", "http://picto0.jugem.jp/c/h/o/choco-milk/03123dc41a41c071ecf023ec11e21645.gif");
        buttons += emoticonButton("kilat3", "http://picto0.jugem.jp/s/m/a/small-black/0b86c67b5dddb82bd0a420b1d7d6a88c.gif");
        buttons += emoticonButton("zirafah", "http://picto0.jugem.jp/h/a/r/harumain/f5895956cf6c73bbd29812751a55cefc.gif");
buttons += emoticonButton("cinta", "http://picto0.jugem.jp/y/u/u/yuupan/22b18afb8b93719ee5a1ee015a6a743c.gif");
        buttons += emoticonButton("camera3", "http://picto0.jugem.jp/n/a/n/nanotuki/17db235b563840348a1b54b45be78bdb.gif");
        buttons += emoticonButton("gado", "http://picto0.jugem.jp/z/i/d/zidaiha/24fdd731c075f74b351c810b2c1f72c7.gif");
        buttons += emoticonButton("moon", "http://picto0.jugem.jp/c/h/o/choco-milk/902fa728a85add8a4d527f56f532fe41.gif");
        buttons += emoticonButton("gelak", "http://picto0.jugem.jp/t/u/b/tuboyaki/4f9e935fc07bfc9818380d0164dcdd04.gif");
        buttons += emoticonButton("youtube", "http://picto0.jugem.jp/c/h/a/cha-me/d66b475163235c66a05b9c310aefe3a2.gif");
        buttons += emoticonButton("seru2", "http://picto0.jugem.jp/r/e/l/rely-do/f8e9deae69f000c2892276b820757e24.gif");
        buttons += emoticonButton("kejut", "http://picto0.jugem.jp/k/a/s/kasii68/05327923d47d00cf1cb62f686daf52d6.gif");
        buttons += emoticonButton("broken", "http://picto0.jugem.jp/y/u/u/yuupan/71141ddbd338f4811a8050141a37c6de.gif");
        buttons += emoticonButton("2seru", "http://picto0.jugem.jp/y/u/u/yuupan/bd54df5df98f021ccd6db5d4a01b5581.gif");
        buttons += emoticonButton("call", "http://picto0.jugem.jp/c/h/o/choco-milk/0649606f27a472a395efaa66231bcdb5.gif");
        buttons += emoticonButton("coklat", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/th_a_chocolate.gif");
        buttons += emoticonButton("cherry", "http://picto0.jugem.jp/c/h/o/choco-milk/501edac2a0293598059716de4f0e9ca2.gif");
        buttons += emoticonButton("senyum", "http://picto0.jugem.jp/s/l/o/slow23/573eb72b5a3ff3e3de3405165e57d8a9.gif");
        buttons += emoticonButton("lilin", "http://picto0.jugem.jp/m/e/r/mero-mania/c727a0f28710d7f08bc54eb5d8ee6f7c.gif");
        buttons += emoticonButton("bear2", "http://picto0.jugem.jp/t/s/u/tsuna0605/6681629493a79ec8b044bb0a8b1bf52b.gif");
        buttons += emoticonButton("love3", "http://picto0.jugem.jp/l/o/v/love-junkie29/f24814d368650c6ec52a7e327a71181a.gif");
        buttons += emoticonButton("bunga3", "http://picto0.jugem.jp/l/o/v/lovingbee/afcd7470b7108f252498bbc1a9f3fc5c.gif");
        buttons += emoticonButton("zup", "http://picto0.jugem.jp/y/u/u/yuupan/c9816a3d1b63411b1415e3f413d379b5.gif");
        buttons += emoticonButton("messy", "http://picto0.jugem.jp/1/0/1/101cat/76eacbb37c9c1ca9650deedd888b8254.gif");
        buttons += emoticonButton("bintang", "http://picto0.jugem.jp/a/r/a/aranao/a6d370405cb04f2d451a5798c74089da.gif");
        buttons += emoticonButton("doreamon", "http://picto0.jugem.jp/t/s/u/tsunanan/22d30637f777d0213398629fc8accb98.gif");
        buttons += emoticonButton("kiss", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/th_mini012.gif");
        buttons += emoticonButton("peace", "http://picto0.jugem.jp/c/h/o/choco-milk/91eb80390c532fac3e34b18d47f40516.gif");
        buttons += emoticonButton("huwa", "http://picto0.jugem.jp/l/u/l/lulin2009/7c3026119571da7f4acb46ad134a9c64.gif");
        buttons += emoticonButton("gitar", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/th_mini056.gif");
        buttons += emoticonButton("arrow", "http://picto0.jugem.jp/y/u/u/yuupan/c609a3eb9d458617faac3ca8532772db.gif");
        buttons += emoticonButton("rama2", "http://picto0.jugem.jp/t/s/u/tsuna0605/e0076f938fb6cbf890f43b0a751eb386.gif");
        buttons += emoticonButton("pulau", "http://picto0.jugem.jp/a/t/m/atmidnight/84c95468284d32a844635950c0db6aac.gif");
        buttons += emoticonButton("kantoi", "http://picto0.jugem.jp/k/a/s/kasii68/909634a482ac695dccf0b22ac8a79414.gif");
        buttons += emoticonButton("tido", "http://picto0.jugem.jp/1/0/1/101cat/6fb0fde8803e20c4bff9d0fb37a852f8.gif");
        buttons += emoticonButton("mare", "http://picto0.jugem.jp/a/k/o/akonako/964dc9194df3ed0fc70293a6cee9c539.gif");
        buttons += emoticonButton("soalan", "http://picto0.jugem.jp/y/u/u/yuupan/c4f3c9ed3d5ed67591605de81b2f5d5b.gif");
        buttons += emoticonButton("down", "http://picto0.jugem.jp/y/u/u/yuupan/35274686df3bbb970e72c2fb4ed6cd2c.gif");
        buttons += emoticonButton("zero", "http://picto0.jugem.jp/y/u/u/yuupan/1e0eb8950ea22eb58c043d7b6238939a.gif");
        buttons += emoticonButton("one", "http://picto0.jugem.jp/y/u/u/yuupan/863287d81fb051ea1973530885a469fa.gif");
        buttons += emoticonButton("two", "http://picto0.jugem.jp/y/u/u/yuupan/d408702d44383ed4394ce8a19356b435.gif");
        buttons += emoticonButton("tiga", "http://picto0.jugem.jp/y/u/u/yuupan/4199061f501eca26b90b5269a52bb4f5.gif");
        buttons += emoticonButton("four", "http://picto0.jugem.jp/y/u/u/yuupan/4b5fbfda470b94ce413638d9b844d384.gif");
        buttons += emoticonButton("lima", "http://picto0.jugem.jp/y/u/u/yuupan/b24d2d4df87e15282ddae0015c37cb08.gif");
        buttons += emoticonButton("6", "http://picto0.jugem.jp/y/u/u/yuupan/a9017f2016d43e92886505be6e13ce91.gif");
        buttons += emoticonButton("7", "http://picto0.jugem.jp/y/u/u/yuupan/5d6aeee1616b03df739f60030db4aa9f.gif");
        buttons += emoticonButton("8", "http://picto0.jugem.jp/y/u/u/yuupan/20e46b0d052dce749fb7dbfe0ba12cc3.gif");
        buttons += emoticonButton("9", "http://picto0.jugem.jp/y/u/u/yuupan/9599f8fc00f63e21dce2ae3667181d19.gif");
        buttons += emoticonButton("bee", "http://picto0.jugem.jp/t/s/u/tsuna0605/3e1c323c4e045580f179fb47a3128851.gif");
        buttons += emoticonButton("sing", "http://picto0.jugem.jp/y/u/u/yuupan/a2b73817976d86a39a230bddf8cb759c.gif");
        buttons += emoticonButton("rainbow2", "http://picto0.jugem.jp/c/h/o/choco-milk/ce7f707e4540dc15cd094976eb7a84fc.gif");
        buttons += emoticonButton("sengih", "http://picto0.jugem.jp/o/s/h/oshare-suki/9944dd08b548f1bfb612d7df703fe2b1.gif");
        buttons += emoticonButton("camera2", "http://picto0.jugem.jp/x/x/x/xxx24/bcd4c1c5d5d4aa2435efb51bf7a2b82d.gif");
        buttons += emoticonButton("hahaa", "http://picto0.jugem.jp/t/u/b/tuboyaki/4f9e935fc07bfc9818380d0164dcdd04.gif");
        buttons += emoticonButton("dvd", "http://picto0.jugem.jp/t/s/u/tsuna0605/6ae6dc6dfc941e320fc9e3670b239ef6.gif");
        buttons += emoticonButton("nganga", "http://picto0.jugem.jp/a/r/a/aranao/0056d52b65dffa2219f200f191bd7ee6.gif");
        buttons += emoticonButton("ikan", "http://picto0.jugem.jp/h/a/r/haruchan2/47d0a99bd4dd4b47e371e57acc830085.gif");
        buttons += emoticonButton("bungaan", "http://picto0.jugem.jp/s/h/o/sho110/7255462afd3173aa8a7961337295cf0d.gif");
        buttons += emoticonButton("suka eh", "http://picto0.jugem.jp/y/u/u/yuupan/95d02c83a9f50da9f8fb46f7e9608649.gif");
        buttons += emoticonButton("sengih2", "http://picto0.jugem.jp/y/u/u/yuupan/d7adeb04262d73f51c9e05e71d7897fa.gif");
        buttons += emoticonButton("angau", "http://picto0.jugem.jp/y/u/u/yuupan/d38d89ccdf02c1a627211449f0693b56.gif");
        buttons += emoticonButton("muah", "http://picto0.jugem.jp/y/u/u/yuupan/fb95ab29bf9ba8315ecc55dc9bcf9369.gif");
        buttons += emoticonButton("urgh", "http://picto0.jugem.jp/y/u/u/yuupan/181485789750d55d6f26f7dff03c23ec.gif");
        buttons += emoticonButton("oh no", "http://picto0.jugem.jp/y/u/u/yuupan/f75e474b0048c602a158a0cadaa910e7.gif");     
        buttons += emoticonButton("mati", "http://picto0.jugem.jp/y/u/u/yuupan/d981de0b73b6f07465b9a673bc2c7005.gif");
        buttons += emoticonButton("obreket", "http://picto0.jugem.jp/y/u/u/yuupan/33ab97b18b2f240a30d8e8300d885e77.gif");
        buttons += emoticonButton("cbreket", "http://picto0.jugem.jp/y/u/u/yuupan/8accff38bd48d32f40fc4d756bd7148d.gif");
        buttons += emoticonButton("beartido", "http://picto0.jugem.jp/k/u/m/kumaharutan/9aa39c8b0d3e2ead1f9c2f16ab07c730.gif");
        buttons += emoticonButton("cutestar", "http://picto0.jugem.jp/n/a/t/natsukimax/5307b29a34d4b2578cb7d26e406e9a02.gif");
        buttons += emoticonButton("sinchan", "http://chun5.img.jugem.jp/20080919_335672.gif");
        buttons += emoticonButton("litlap", "http://chun5.img.jugem.jp/20080912_319058.gif");
        buttons += emoticonButton("dvd2", "http://picto0.jugem.jp/i/c/h/ichigo0414/98284d7180bd4d413f474a5f9e196ed3.gif");
        buttons += emoticonButton("haih", "http://chun5.jugem.jp/emoji/face_08.gif");
        buttons += emoticonButton("alamak", "http://chun5.jugem.jp/emoji/face_06.gif");
        buttons += emoticonButton("??, "http://picto0.jugem.jp/t/s/u/tsuna0605/3c7e73c1a6bf45d78cfd05817410916a.gif");
        buttons += emoticonButton("!?", "http://picto0.jugem.jp/t/s/u/tsuna0605/a8a5b7235595bbb516ef351f56241080.gif");
        buttons += emoticonButton("bling2", "http://picto0.jugem.jp/t/s/u/tsuna0605/409990cb6646362773a42e18a409bb65.gif");
        buttons += emoticonButton("cinta", "http://picto0.jugem.jp/t/s/u/tsuna0605/4cff86ef56f1373f7e041ce7b2c0a747.gif");
        buttons += emoticonButton("hu", "http://picto0.jugem.jp/t/s/u/tsuna0605/e1dd1f5a62062217b431667597373410.gif");
        buttons += emoticonButton("ayo", "http://picto0.jugem.jp/t/s/u/tsuna0605/8e631c88a40073d6b490ae25439e63da.gif");
        buttons += emoticonButton("sad2", "http://picto0.jugem.jp/t/s/u/tsuna0605/a96358b4cf5a40c20edad543ab9f8307.gif");
        buttons += emoticonButton("idea", "http://picto0.jugem.jp/y/u/u/yuupan/ce4e467c63e43679b3dcb5faad42456b.gif");
        buttons += emoticonButton("teruja", "http://picto0.jugem.jp/y/u/r/yuri/6d9ca78a5aaee9946393dd4d8178ad97.gif");
        buttons += emoticonButton("minah", "http://picto0.jugem.jp/h/i/g/higezura/ea300cb33c85e78d82130c03f151ca1c.gif");
        buttons += emoticonButton("penampo", "http://picto0.jugem.jp/y/u/u/yuupan/f87b4336d13a47e1b5c731ededa6789c.gif");
        buttons += emoticonButton("cium", "http://picto0.jugem.jp/y/u/u/yuupan/da4caa5f30001c60391be533af5c1ec9.gif");
        buttons += emoticonButton("okey", "http://picto0.jugem.jp/c/h/o/choco-milk/1c38b4448b96fe5cdff07f41a86c1046.gif");
        buttons += emoticonButton("tumbuk", "http://picto0.jugem.jp/y/u/u/yuupan/4c12bf494ada4896e82b48fb0857b333.gif");
        buttons += emoticonButton("star4", "http://picto0.jugem.jp/n/a/n/nanotuki/e718cc5edeec62f8be934415d954efce.gif")
        buttons += emoticonButton("party", "http://picto0.jugem.jp/p/u/r/puratonn/f08fc2aa3d52ecdf401a41830e55b8a4.gif");
        buttons += emoticonButton("senyum2", "http://picto0.jugem.jp/j/e/w/jewelry-5/f21569435ec03deebd369eff9164b2c0.gif");
        buttons += emoticonButton("cupcake", "http://picto0.jugem.jp/c/h/o/choco-milk/14fcbbb5f145c4e6a4dbf240538052f1.gif");
        buttons += emoticonButton("cuteboy", "http://picto0.jugem.jp/s/e/i/seizaburou/cc12f48a92ff4bbab59e2447eadb5074.gif");
        buttons += emoticonButton("kucing2", "http://picto0.jugem.jp/n/a/n/nanotuki/b780c690932e716b3164599ee2c58e0a.gif");
        buttons += emoticonButton("coklat", "http://picto0.jugem.jp/w/i/n/winky-tinky/7e6341e63da4c31a8416652243ffb835.gif");
        buttons += emoticonButton("gigi", "http://picto0.jugem.jp/m/a/t/matunagashuko/50f13652ea1203fe6f56f69d60dfbd5a.gif");
        buttons += emoticonButton("cndawan", "http://picto0.jugem.jp/y/u/k/yuko1130/b36ce49c2e83476ff1b1bbf7567e53d9.gif");
        buttons += emoticonButton("crown", "http://picto0.jugem.jp/m/i/m/mimorisan/2ff9697190b2f4be2ea68a3a06636547.gif");
        buttons += emoticonButton("love5", "http://picto0.jugem.jp/t/s/u/tsuna0605/4cff86ef56f1373f7e041ce7b2c0a747.gif");
        buttons += emoticonButton("star3", "http://picto0.jugem.jp/k/o/m/komorinana/5e9187e7b46ef03cdb0cad510d2b6696.gif");
        buttons += emoticonButton("stop", "http://picto0.jugem.jp/k/i/t/kita;
        
     
        buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"50\\\" height=\\\"50\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img width=\"25\" height=\"25\" src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);


