// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thejijie (http://itsmejijie.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Random Emoticons
// @namespace     Yllvyre
// @description    Original code came from http://itsmejijie.blogspot.com/ .
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
                      
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
	buttons += emoticonButton("meriah", "http://picto0.jugem.jp/t/s/u/tsuna0605/b2f3412043d99cd48405dd0df9a63c0b.gif");
	buttons += emoticonButton("hah?", "http://picto0.jugem.jp/a/k/o/akonako/beb5e401545ef8812f28e1036b3c9405.gif");
	buttons += emoticonButton("c0mel2", "http://picto0.jugem.jp/n/a/n/nanotuki/9454b7b2ac7724a86a9273a8f53a8c47.gif");
	buttons += emoticonButton("zzz", "http://picto0.jugem.jp/t/s/u/tsuna0605/80fc0df6ace010869e0a38bc5e63492c.gif");
	buttons += emoticonButton("smiley", "http://picto0.jugem.jp/t/s/u/tsuna0605/a14407ab947542a55c4b7adb2a57de3a.gif");
	buttons += emoticonButton("bus", "http://picto0.jugem.jp/t/s/u/tsuna0605/43f643a3042b6e1d867e93cc0aaf832f.gif");
	buttons += emoticonButton("sayang2", "http://picto0.jugem.jp/y/u/u/yuupan/aea4d9ba5076fb5e9ae43ad7a233aac3.gif");
	buttons += emoticonButton("Grad", "http://picto0.jugem.jp/t/s/u/tsuna0605/d9f22118dbf3ee2b94a71e0efd7656ad.gif");
	buttons += emoticonButton("bunga", "http://picto0.jugem.jp/c/h/o/choco-milk/7f2630d1f86a008eaa4a8e2cdc1e7526.gif");
	buttons += emoticonButton("bungak", "http://picto0.jugem.jp/c/h/o/choco-milk/590ab088d4f90eee1731e6a273e8c9ef.gif");
	buttons += emoticonButton("kelip3", "http://picto0.jugem.jp/s/a/y/sayainomata/24ae7cd59087308503e4a015a847144f.gif");
	buttons += emoticonButton("bintang", "http://picto0.jugem.jp/a/r/a/aranao/a6d370405cb04f2d451a5798c74089da.gif");
	buttons += emoticonButton("doreamon", "http://picto0.jugem.jp/t/s/u/tsunanan/22d30637f777d0213398629fc8accb98.gif");
	buttons += emoticonButton("kiss", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/th_mini012.gif");
	buttons += emoticonButton("peace", "http://picto0.jugem.jp/c/h/o/choco-milk/91eb80390c532fac3e34b18d47f40516.gif");
	buttons += emoticonButton("huwa", "http://picto0.jugem.jp/l/u/l/lulin2009/7c3026119571da7f4acb46ad134a9c64.gif");
	buttons += emoticonButton("gitar", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/th_mini056.gif");
	buttons += emoticonButton("arrow", "http://picto0.jugem.jp/y/u/u/yuupan/c609a3eb9d458617faac3ca8532772db.gif");
	buttons += emoticonButton("rama2", "http://picto0.jugem.jp/t/s/u/tsuna0605/e0076f938fb6cbf890f43b0a751eb386.gif");
	buttons += emoticonButton("pulau", "http://picto0.jugem.jp/a/t/m/atmidnight/84c95468284d32a844635950c0db6aac.gif");
	buttons += emoticonButton("nyum", "http://picto0.jugem.jp/y/u/u/yuu0v0/e4b3de6d1c962cc9c82542215969174e.gif");
	buttons += emoticonButton("rain", "http://picto0.jugem.jp/c/h/o/choco-milk/211e906ad8089c7a0da19f4220fc1a6c.gif");
	buttons += emoticonButton("nice", "http://picto0.jugem.jp/m/y/u/myumyu515/44b1142cd22fdd008197f395da883e89.gif");
	buttons += emoticonButton("gemuk", "http://picto0.jugem.jp/k/e/5/ke5362ri/5a064f1395739c46b02d0f513c97863f.gif");
	buttons += emoticonButton("cenyum", "http://picto0.jugem.jp/b/a/h/bahia/321b4e145dbbb7b4402c590550af1c28.gif");
	buttons += emoticonButton("renab", "http://picto0.jugem.jp/m/i/-/mi-taro/31bbe62e9da2c66825d0961d6f59a92d.gif");
	buttons += emoticonButton("inlove", "http://picto0.jugem.jp/a/z/u/azuresandglas/fa7bee86240ec998f0f2e24bb1c9ab31.gif");
	buttons += emoticonButton("duh", "http://picto0.jugem.jp/s/u/z/suzusa/40cef3c1288c9e3aaba255adce72e0ed.gif");
	buttons += emoticonButton("kantoi", "http://picto0.jugem.jp/k/a/s/kasii68/909634a482ac695dccf0b22ac8a79414.gif");
	buttons += emoticonButton("tido", "http://picto0.jugem.jp/1/0/1/101cat/6fb0fde8803e20c4bff9d0fb37a852f8.gif");
	buttons += emoticonButton("mare", "http://picto0.jugem.jp/a/k/o/akonako/964dc9194df3ed0fc70293a6cee9c539.gif");
	buttons += emoticonButton("soalan", "http://picto0.jugem.jp/y/u/u/yuupan/c4f3c9ed3d5ed67591605de81b2f5d5b.gif");
	buttons += emoticonButton("down", "http://picto0.jugem.jp/y/u/u/yuupan/35274686df3bbb970e72c2fb4ed6cd2c.gif");
	buttons += emoticonButton("zero", "http://picto0.jugem.jp/y/u/u/yuupan/1e0eb8950ea22eb58c043d7b6238939a.gif");
	buttons += emoticonButton("one", "http://picto0.jugem.jp/y/u/u/yuupan/863287d81fb051ea1973530885a469fa.gif");
	buttons += emoticonButton("two", "http://picto0.jugem.jp/y/u/u/yuupan/d408702d44383ed4394ce8a19356b435.gif");
	buttons += emoticonButton("tiga", "http://picto0.jugem.jp/y/u/u/yuupan/4199061f501eca26b90b5269a52bb4f5.gif");
	buttons += emoticonButton("Xmas", "http://picto0.jugem.jp/c/h/a/cha-me/30efa8e4b5cec1148b73ec05dd49e77f.gif");
	buttons += emoticonButton("star", "http://picto0.jugem.jp/n/a/t/natsukimax/5307b29a34d4b2578cb7d26e406e9a02.gif");
	buttons += emoticonButton("love", "http://picto0.jugem.jp/p/o/m/pomeyuu/33bd05e77c674a67c73a891b6f8aba6e.gif");
	buttons += emoticonButton("surat", "http://picto0.jugem.jp/y/u/u/yuupan/a3e2a642df0983fe9a4f45b1886586c8.gif");
	buttons += emoticonButton("antu", "http://picto0.jugem.jp/c/h/o/choco-milk/8606f278214c9c2065da55d30c6649ef.gif");
	buttons += emoticonButton("jamlcg", "http://picto0.jugem.jp/f/u/i/fuie/4b79170ca21b60e42f5ad9bcc55623fb.gif");
	buttons += emoticonButton("bearlove", "http://picto0.jugem.jp/o/r/a/orange1124/4879423381b736b68c8ed29bbda140fc.gif");
	buttons += emoticonButton("beger", "http://picto0.jugem.jp/c/h/o/choco-milk/205d8b9e8cf93bbb2d7c4419f97f0458.gif");
	buttons += emoticonButton("riben", "http://picto0.jugem.jp/c/h/o/choco-milk/9f26c05165c6244654d25a59ebb81725.gif");
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
	buttons += emoticonButton("cherry", "http://picto0.jugem.jp/c/h/o/choco-milk/501edac2a0293598059716de4f0e9ca2.gif");
	buttons += emoticonButton("senyum", "http://picto0.jugem.jp/s/l/o/slow23/573eb72b5a3ff3e3de3405165e57d8a9.gif");
	buttons += emoticonButton("lilin", "http://picto0.jugem.jp/m/e/r/mero-mania/c727a0f28710d7f08bc54eb5d8ee6f7c.gif");
	buttons += emoticonButton("bear2", "http://picto0.jugem.jp/t/s/u/tsuna0605/6681629493a79ec8b044bb0a8b1bf52b.gif");
	buttons += emoticonButton("love3", "http://picto0.jugem.jp/l/o/v/love-junkie29/f24814d368650c6ec52a7e327a71181a.gif");
	buttons += emoticonButton("zup", "http://picto0.jugem.jp/y/u/u/yuupan/c9816a3d1b63411b1415e3f413d379b5.gif");
	buttons += emoticonButton("messy", "http://picto0.jugem.jp/1/0/1/101cat/76eacbb37c9c1ca9650deedd888b8254.gif");
	buttons += emoticonButton("hahaa", "http://picto0.jugem.jp/t/u/b/tuboyaki/4f9e935fc07bfc9818380d0164dcdd04.gif");
	buttons += emoticonButton("dvd", "http://picto0.jugem.jp/t/s/u/tsuna0605/6ae6dc6dfc941e320fc9e3670b239ef6.gif");
	buttons += emoticonButton("nganga", "http://picto0.jugem.jp/a/r/a/aranao/0056d52b65dffa2219f200f191bd7ee6.gif");
	buttons += emoticonButton("ikan", "http://picto0.jugem.jp/h/a/r/haruchan2/47d0a99bd4dd4b47e371e57acc830085.gif");
	buttons += emoticonButton("bungaan", "http://picto0.jugem.jp/s/h/o/sho110/7255462afd3173aa8a7961337295cf0d.gif");
	buttons += emoticonButton("suka eh", "http://picto0.jugem.jp/y/u/u/yuupan/95d02c83a9f50da9f8fb46f7e9608649.gif");
	buttons += emoticonButton("sad2", "http://picto0.jugem.jp/t/s/u/tsuna0605/a96358b4cf5a40c20edad543ab9f8307.gif");
	buttons += emoticonButton("idea", "http://picto0.jugem.jp/y/u/u/yuupan/ce4e467c63e43679b3dcb5faad42456b.gif");
	buttons += emoticonButton("teruja", "http://picto0.jugem.jp/y/u/r/yuri/6d9ca78a5aaee9946393dd4d8178ad97.gif");
	buttons += emoticonButton("minah", "http://picto0.jugem.jp/h/i/g/higezura/ea300cb33c85e78d82130c03f151ca1c.gif");
	buttons += emoticonButton("penampo", "http://picto0.jugem.jp/y/u/u/yuupan/f87b4336d13a47e1b5c731ededa6789c.gif");
	buttons += emoticonButton("cium", "http://picto0.jugem.jp/y/u/u/yuupan/da4caa5f30001c60391be533af5c1ec9.gif");
	buttons += emoticonButton("party", "http://picto0.jugem.jp/p/u/r/puratonn/f08fc2aa3d52ecdf401a41830e55b8a4.gif");
	buttons += emoticonButton("senyum2", "http://picto0.jugem.jp/j/e/w/jewelry-5/f21569435ec03deebd369eff9164b2c0.gif");
	buttons += emoticonButton("angau", "http://picto0.jugem.jp/y/u/u/yuupan/d38d89ccdf02c1a627211449f0693b56.gif");
	buttons += emoticonButton("muah", "http://picto0.jugem.jp/y/u/u/yuupan/fb95ab29bf9ba8315ecc55dc9bcf9369.gif");
	buttons += emoticonButton("urgh", "http://picto0.jugem.jp/y/u/u/yuupan/181485789750d55d6f26f7dff03c23ec.gif");
	buttons += emoticonButton("okey", "http://picto0.jugem.jp/c/h/o/choco-milk/1c38b4448b96fe5cdff07f41a86c1046.gif");
	buttons += emoticonButton("tumbuk", "http://picto0.jugem.jp/y/u/u/yuupan/4c12bf494ada4896e82b48fb0857b333.gif");
	buttons += emoticonButton("star4", "http://picto0.jugem.jp/n/a/n/nanotuki/e718cc5edeec62f8be934415d954efce.gif");
	buttons += emoticonButton("oh no", "http://picto0.jugem.jp/y/u/u/yuupan/f75e474b0048c602a158a0cadaa910e7.gif");     
	buttons += emoticonButton("mati", "http://picto0.jugem.jp/y/u/u/yuupan/d981de0b73b6f07465b9a673bc2c7005.gif");
	buttons += emoticonButton("obreket", "http://picto0.jugem.jp/y/u/u/yuupan/33ab97b18b2f240a30d8e8300d885e77.gif");
	buttons += emoticonButton("cbreket", "http://picto0.jugem.jp/y/u/u/yuupan/8accff38bd48d32f40fc4d756bd7148d.gif");
	buttons += emoticonButton("beartido", "http://picto0.jugem.jp/k/u/m/kumaharutan/9aa39c8b0d3e2ead1f9c2f16ab07c730.gif");
	buttons += emoticonButton("cutestar", "http://picto0.jugem.jp/n/a/t/natsukimax/5307b29a34d4b2578cb7d26e406e9a02.gif");
	buttons += emoticonButton("litlap", "http://chun5.img.jugem.jp/20080912_319058.gif");
	buttons += emoticonButton("dvd2", "http://picto0.jugem.jp/i/c/h/ichigo0414/98284d7180bd4d413f474a5f9e196ed3.gif");
	buttons += emoticonButton("suka", "http://picto0.jugem.jp/7/2/3/723nut/30a21bb7e1bd87fe9c33a22ba3deec09.gif");
	buttons += emoticonButton("coklat", "http://picto0.jugem.jp/w/i/n/winky-tinky/7e6341e63da4c31a8416652243ffb835.gif");
	buttons += emoticonButton("sengih2", "http://picto0.jugem.jp/y/u/u/yuupan/d7adeb04262d73f51c9e05e71d7897fa.gif");
	buttons += emoticonButton("ape", "http://img529.imageshack.us/img529/4128/f20dq7.gif");
	buttons += emoticonButton("", "");
	buttons += emoticonButton("rise", "http://picto0.jugem.jp/y/u/u/yuupan/a3ff330570ae32950fa576b1a87d54e8.gif");
	buttons += emoticonButton("shine", "http://picto0.jugem.jp/y/u/u/yuupan/9cf70cf2c34b45de5623e1ee6e40f1ed.gif");
	buttons += emoticonButton("kipas", "http://picto0.jugem.jp/y/u/u/yuupan/e89bbef5e1d9d4e444732f8448c0de23.gif");
	buttons += emoticonButton("abc", "http://picto0.jugem.jp/y/u/u/yuupan/3d3ad4c64b02e2b8b2b532a923236e09.gif");
	buttons += emoticonButton("bunga1", "http://picto0.jugem.jp/y/u/u/yuupan/9fe773fb34bf63b777637f79ac77698e.gif");
	buttons += emoticonButton("bunga2", "http://picto0.jugem.jp/y/u/u/yuupan/c2f3b1b3a12348c12ffbd430eee958d5.gif");
	buttons += emoticonButton("bunga3", "http://picto0.jugem.jp/y/u/u/yuupan/3f08a0c85751f8b7d342eee8fff72589.gif");
	buttons += emoticonButton("ribenatas", "http://picto0.jugem.jp/m/i/s/misa-526/780ce8173e049bbcbb87664d92b9b711.gif");
	buttons += emoticonButton("ribenbawah", "http://picto0.jugem.jp/m/i/s/misa-526/403c7c8ec61df3e06166c9b61c04f4a0.gif");
	buttons += emoticonButton("tulis2", "http://picto0.jugem.jp/a/n/d/andncnd/3af81d01c23fc4c08eb4788dcbb0e6da.gif");
	buttons += emoticonButton("cupcake", "http://picto0.jugem.jp/c/h/o/choco-milk/14fcbbb5f145c4e6a4dbf240538052f1.gif");
	buttons += emoticonButton("cuteboy", "http://picto0.jugem.jp/s/e/i/seizaburou/cc12f48a92ff4bbab59e2447eadb5074.gif");
	buttons += emoticonButton("kucing2", "http://picto0.jugem.jp/n/a/n/nanotuki/b780c690932e716b3164599ee2c58e0a.gif");
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
	buttons += emoticonButton("bling2", "http://picto0.jugem.jp/t/s/u/tsuna0605/409990cb6646362773a42e18a409bb65.gif");
	buttons += emoticonButton("cinta", "http://picto0.jugem.jp/t/s/u/tsuna0605/4cff86ef56f1373f7e041ce7b2c0a747.gif");
	buttons += emoticonButton("hu", "http://picto0.jugem.jp/t/s/u/tsuna0605/e1dd1f5a62062217b431667597373410.gif");
	buttons += emoticonButton("ayo", "http://picto0.jugem.jp/t/s/u/tsuna0605/8e631c88a40073d6b490ae25439e63da.gif");
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
	buttons += emoticonButton("cndawan", "http://picto0.jugem.jp/y/u/k/yuko1130/b36ce49c2e83476ff1b1bbf7567e53d9.gif");
	buttons += emoticonButton("youtube", "http://picto0.jugem.jp/c/h/a/cha-me/d66b475163235c66a05b9c310aefe3a2.gif");
	buttons += emoticonButton("seru2", "http://picto0.jugem.jp/r/e/l/rely-do/f8e9deae69f000c2892276b820757e24.gif");
	buttons += emoticonButton("kejut", "http://picto0.jugem.jp/k/a/s/kasii68/05327923d47d00cf1cb62f686daf52d6.gif");
	buttons += emoticonButton("broken", "http://picto0.jugem.jp/y/u/u/yuupan/71141ddbd338f4811a8050141a37c6de.gif");
	buttons += emoticonButton("2seru", "http://picto0.jugem.jp/y/u/u/yuupan/bd54df5df98f021ccd6db5d4a01b5581.gif");
	buttons += emoticonButton("call", "http://picto0.jugem.jp/c/h/o/choco-milk/0649606f27a472a395efaa66231bcdb5.gif");
	buttons += emoticonButton("coklat", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/th_a_chocolate.gif");
	buttons += emoticonButton("stop", "http://picto0.jugem.jp/k/i/t/kita-yu/b0276da4b233e3129c74f7e79d866a9d.gif");
	buttons += emoticonButton("tq", "http://picto0.jugem.jp/o/s/m/osmelmiki/2347bfe906a2a1717c20faf802452052.gif");
	buttons += emoticonButton("colorlove", "http://picto0.jugem.jp/t/s/u/tsuna0605/1eb97ad0548318cd5c1df22924d71d6e.gif");
	buttons += emoticonButton("satu", "http://picto0.jugem.jp/l/o/n/long---xxx/7a1fba38df26478f594885c8ecc4c25a.gif");
	buttons += emoticonButton("dua", "http://picto0.jugem.jp/l/o/n/long---xxx/12ac4a221edfdea3a6ced82dc19ef091.gif");
	buttons += emoticonButton("tiga", "http://picto0.jugem.jp/l/o/n/long---xxx/dbed44ed38a44260d1b1eb615c8d56c2.gif");
	buttons += emoticonButton("empat", "http://picto0.jugem.jp/l/o/n/long---xxx/8f6fdd9b1defa411d5963f59d283d920.gif");
	buttons += emoticonButton("lima", "http://picto0.jugem.jp/l/o/n/long---xxx/94919cbaf59fba403360a575babe0860.gif");
	buttons += emoticonButton("enam", "http://picto0.jugem.jp/l/o/n/long---xxx/dfd185c963ef2d36759535ce8720de23.gif");
	buttons += emoticonButton("tujuh", "http://picto0.jugem.jp/l/o/n/long---xxx/6c0f41ed2cc05cb2833fc12c5e8e29ef.gif");
	buttons += emoticonButton("lapan", "http://picto0.jugem.jp/l/o/n/long---xxx/08f250ad7b7e449b401e3e5f3f7edc24.gif");
	buttons += emoticonButton("sembilan", "http://picto0.jugem.jp/l/o/n/long---xxx/3976a2d2e54c2795a8cf8b7b83dac58c.gif");
	buttons += emoticonButton("bola", "http://picto0.jugem.jp/c/h/o/choco-milk/18216dfe71f4af9ceb21fac0248ef63d.gif");
	buttons += emoticonButton("tido", "http://picto0.jugem.jp/t/s/u/tsuna0605/40016022aa53f60b01d648d82290eda4.gif");
	buttons += emoticonButton("1soal", "http://picto0.jugem.jp/t/i/r/tirigamikun/efa234c824122711556e24659181bbe3.gif");
	 buttons += emoticonButton("gigi", "http://picto0.jugem.jp/m/a/t/matunagashuko/50f13652ea1203fe6f56f69d60dfbd5a.gif");
	buttons += emoticonButton("boom", "http://picto0.jugem.jp/0/7/-/07-kaori/6a83a455db59ebd53fb5ddaf899cb530.gif");
	buttons += emoticonButton("??", "http://picto0.jugem.jp/t/s/u/tsuna0605/3c7e73c1a6bf45d78cfd05817410916a.gif");
	buttons += emoticonButton("!?", "http://picto0.jugem.jp/t/s/u/tsuna0605/a8a5b7235595bbb516ef351f56241080.gif");
	buttons += emoticonButton("crown", "http://picto0.jugem.jp/m/i/m/mimorisan/2ff9697190b2f4be2ea68a3a06636547.gif");
	buttons += emoticonButton("love5", "http://picto0.jugem.jp/t/s/u/tsuna0605/4cff86ef56f1373f7e041ce7b2c0a747.gif");
	buttons += emoticonButton("star3", "http://picto0.jugem.jp/k/o/m/komorinana/5e9187e7b46ef03cdb0cad510d2b6696.gif");
	buttons += emoticonButton("lakipuan", "http://picto0.jugem.jp/p/o/l/polka-c/0c0f9bdbb6b35d47c96c000aecd9e7fc.gif");
	buttons += emoticonButton("sayang", "http://picto0.jugem.jp/t/s/u/tsuna0605/fea41ee58e3948002ac3da73b833c5ca.gif");
	buttons += emoticonButton("lari", "http://picto0.jugem.jp/m/i/k/mika2296/f1bef1cf4008d525acc4b0289c2560a7.gif");
	buttons += emoticonButton("buku", "http://picto0.jugem.jp/c/h/a/chang-h/97a6efc2f596ed23ddc3bb4fc8e024d8.gif");
	buttons += emoticonButton("serugerak", "http://i84.photobucket.com/albums/k37/syasinclair/Picto/ca5dad22ef9a186bcbbe50eb07117756.gif");
	buttons += emoticonButton("hati", "http://picto0.jugem.jp/t/o/m/tomokunday/e027a83cd6528eb5ceaf83ab87aa8361.gif");
	buttons += emoticonButton("kucing", "http://picto0.jugem.jp/1/0/1/101cat/314add4b6ef3a74fdaa69ab3a89880e3.gif");
	buttons += emoticonButton("peluh", "http://picto0.jugem.jp/n/a/t/nattu-love/ea70dcccae73fc414d0c3d7950637220.gif");
	buttons += emoticonButton("payung2", "http://picto0.jugem.jp/h/a/r/haruchan2/94dacd60fc1f781c88e64200a1290b7b.gif");
	buttons += emoticonButton("no", "http://picto0.jugem.jp/k/a/s/kasii68/8154c9d81309743af5ed3904ecd80def.gif");
	buttons += emoticonButton("nasi", "http://picto0.jugem.jp/t/i/m/time03/9ad60e054d7b893d52378a1e7a1c758f.gif");
	buttons += emoticonButton("frog", "http://picto0.jugem.jp/n/a/n/nanotuki/d0450290825289c56a4c191cb6fccfe9.gif");
	buttons += emoticonButton("tembikai", "http://picto0.jugem.jp/c/h/a/cha-me/8c8a6f99eb6929dfae2c0053c9fff386.gif");
	buttons += emoticonButton("nyum", "http://picto0.jugem.jp/m/t/0/mt008/5339ef62b983ba1535b1a8600aca4634.gif");
	buttons += emoticonButton("lupee", "http://picto0.jugem.jp/t/s/u/tsuna0605/b2f3412043d99cd48405dd0df9a63c0b.gif");
	buttons += emoticonButton("cupcake", "http://picto0.jugem.jp/n/a/n/nanotuki/203ba76b2c1b4613a3aa34c99ee8d9e9.gif");
	buttons += emoticonButton("OK", "http://picto0.jugem.jp/y/u/u/yuupan/3cb2b21c1d3258b172a00eb5ad0ef0ea.gif");
	buttons += emoticonButton("skull", "http://picto0.jugem.jp/r/u/r/ruru-1995/82fc38456a2de8d937f782e37408c45f.gif");
	buttons += emoticonButton("pokok", "http://picto0.jugem.jp/k/e/k/kekiko3134/b8b8fd11fbd9ee5b05b727d8f6adc95c.gif");
	buttons += emoticonButton("lembu", "http://choco-milk.img.jugem.jp/20081231_547008.gif");
	buttons += emoticonButton("makan2", "http://choco-milk.img.jugem.jp/20080605_470165.gif");
	buttons += emoticonButton("beruang", "http://choco-milk.img.jugem.jp/20080601_468517.gif");
	buttons += emoticonButton("demam", "http://choco-milk.img.jugem.jp/20080227_424899.gif");
	buttons += emoticonButton("soal", "http://picto0.jugem.jp/a/n/d/andncnd/9ee39713b720b9dfe159faaf9f21f1db.gif");
	buttons += emoticonButton("tv", "http://picto0.jugem.jp/a/n/d/andncnd/f795a91a8960334382c9535278e0738e.gif");
	buttons += emoticonButton("7e", "http://picto0.jugem.jp/h/-/p/h-p-s/18a46ed0caa25eaf53e892c1f8183782.gif");
	buttons += emoticonButton("mcd", "http://picto0.jugem.jp/h/-/p/h-p-s/87a1bc088fcecfcd1547ab683d081be5.gif");
	buttons += emoticonButton("dress", "http://picto0.jugem.jp/g/a/r/garasuno-kagi/a42732b425b8d08cb8f355de5803cbd2.gif");
	buttons += emoticonButton("beres", "http://picto0.jugem.jp/h/a/r/haruchan2/0073ace31f637926e2469ccabb755628.gif");
	buttons += emoticonButton("mail2", "http://picto0.jugem.jp/y/u/u/yuupan/a3e2a642df0983fe9a4f45b1886586c8.gif");
	buttons += emoticonButton("dseru", "http://picto0.jugem.jp/a/n/d/andncnd/074df2126da6115004e9bcf965add12a.gif");
	buttons += emoticonButton("okey3", "http://picto0.jugem.jp/g/a/r/garasuno-kagi/bd030680d554833d0aabf8818342d3ae.gif");
	buttons += emoticonButton("^^", "http://picto0.jugem.jp/m/i/n/min-chan8/ac9b284aa101805ddec2a2911ae80aba.gif");
	buttons += emoticonButton("hello", "http://picto0.jugem.jp/c/6/2/c629/3a98068725ebe2d6d8520a3738f4a4fc.gif");
	buttons += emoticonButton("keta", "http://picto0.jugem.jp/a/n/d/andncnd/8f43113ec87284a3e0f2a4ac4ce7dcd4.gif");
	buttons += emoticonButton("seruriben", "http://picto0.jugem.jp/a/n/d/andncnd/6da4af45d5c7f195fbb5dab7244dc0b8.gif");
	buttons += emoticonButton("soalbyk", "http://picto0.jugem.jp/a/n/d/andncnd/0426334815e3a9a447fa85dd55b32d3c.gif");
	buttons += emoticonButton("muzik", "http://picto0.jugem.jp/y/u/u/yuupan/350675480d2e8a4501bcb382be9ee2ca.gif");
	buttons += emoticonButton("serubunga", "http://picto0.jugem.jp/a/n/d/andncnd/f58d15aa094da3250ee40de419519a0e.gif");
	buttons += emoticonButton("api", "http://picto0.jugem.jp/a/n/d/andncnd/c67019f42c4af439976bc1946b22d7f0.gif");
	buttons += emoticonButton("pinkskull", "http://picto0.jugem.jp/a/n/d/andncnd/9049e4061beb82cb903f9bf9614131c3.gif");
	buttons += emoticonButton("buka", "http://picto0.jugem.jp/y/u/u/yuupan/135a8ae4fe5e278f44c9779659596e00.gif");
	buttons += emoticonButton("tutup", "http://picto0.jugem.jp/y/u/u/yuupan/8716fbf63952f409f0b65021528531f5.gif");
	buttons += emoticonButton("atas", "http://picto0.jugem.jp/y/u/u/yuupan/9295d7381f98a81c4e71d974e977a8a5.gif");
	buttons += emoticonButton("bawah", "http://picto0.jugem.jp/y/u/u/yuupan/0d9e398d61a9d06c83cc9f967361af56.gif");
        buttons += emoticonButton("rokok", "http://picto0.jugem.jp/c/h/o/choco-milk/3049b5b555b82987d8060cb7b48158bd.gif");
	buttons += emoticonButton("adiah", "http://picto0.jugem.jp/a/n/d/andncnd/1804a64143e8b894f40b46745ba2a00d.gif");
	buttons += emoticonButton("bunga3", "http://choco-milk.img.jugem.jp/20081231_547009.gif");
	buttons += emoticonButton("bukit", "http://choco-milk.img.jugem.jp/20081231_547010.gif");
	buttons += emoticonButton("keta2", "http://choco-milk.img.jugem.jp/20081008_517345.gif");
	buttons += emoticonButton("asap", "http://picto0.jugem.jp/c/h/o/choco-milk/25ed16e13ae43351411dc2b8bad40934.gif");
	buttons += emoticonButton("cumel", "http://picto0.jugem.jp/c/h/o/choco-milk/bc4e917b2508e3a074deb5c7cdb8b966.gif");
	buttons += emoticonButton("sekolah", "http://picto0.jugem.jp/c/h/o/choco-milk/8890a986b9a2decf15b594fccaf8b476.gif");
	buttons += emoticonButton("awansenyum", "http://choco-milk.img.jugem.jp/20080824_500284.gif");
	buttons += emoticonButton("panas", "http://choco-milk.img.jugem.jp/20080824_500310.gif");
	buttons += emoticonButton("pelangi3", "http://choco-milk.img.jugem.jp/20080824_500311.gif");
	buttons += emoticonButton("salji", "http://choco-milk.img.jugem.jp/20080824_500312.gif");
	buttons += emoticonButton("sun2", "http://choco-milk.img.jugem.jp/20080822_499463.gif");
	buttons += emoticonButton("katak3", "http://choco-milk.img.jugem.jp/20080606_470580.gif");
	buttons += emoticonButton("heels", "http://picto0.jugem.jp/a/n/d/andncnd/75ca7cba76a6b79e3afa010cf33827f9.gif");
	buttons += emoticonButton("2love", "http://picto0.jugem.jp/s/k/m/skmtmsyk/fa4ba52064367a10dccd90363a0663bb.gif");
	buttons += emoticonButton("duit", "http://picto0.jugem.jp/t/s/u/tsuna0605/627efbdd2622aa9ef584525db4b29183.gif");
	buttons += emoticonButton("lovegerak", "http://picto0.jugem.jp/y/u/u/yuupan/23c8176ed0d10bafc7a8946a006c2495.gif");
        buttons += emoticonButton("serubyk", "http://picto0.jugem.jp/y/u/u/yuupan/731d33ae1c49c50229c58a866a53f1c4.gif");
	buttons += emoticonButton("hospital", "http://picto0.jugem.jp/c/h/o/choco-milk/240c0fbb8b61a083c12bf3031ee1411c.gif");
	buttons += emoticonButton("ubat", "http://picto0.jugem.jp/c/h/o/choco-milk/d0a527d5bfabf79e6e5f3d7fd7bcee20.gif");
	buttons += emoticonButton("kilat", "http://picto0.jugem.jp/c/h/o/choco-milk/bd2a51f9c596b697945b37394f6fe603.gif");
	buttons += emoticonButton("sedeh", "http://picto0.jugem.jp/y/u/u/yuupan/32adbc203e007005c4a3328dc6d5d7cb.gif");
	buttons += emoticonButton("tulis", "http://picto0.jugem.jp/y/u/u/yuupan/c1386f8df54339dcdba7ae90a68a3d2d.gif");
	buttons += emoticonButton("new", "http://picto0.jugem.jp/y/u/u/yuupan/77497a6667bdad0b0437c26540735125.gif");
	buttons += emoticonButton("cute", "http://picto0.jugem.jp/y/u/u/yuupan/29bdea655265d2d386d73ed5c6e84f9b.gif");
	buttons += emoticonButton("rubish", "http://picto0.jugem.jp/c/h/o/choco-milk/974e8bc83a1200f3879aaa4f4b4ffa8f.gif");
	buttons += emoticonButton("love4", "http://picto0.jugem.jp/c/h/o/choco-milk/c8b88119c210188e685e01e5d8402ec5.gif");
	buttons += emoticonButton("stokin", "http://picto0.jugem.jp/c/h/o/choco-milk/9f0ab3794fe812c038242cd5adb6ccc6.gif");
	buttons += emoticonButton("bowling", "http://picto0.jugem.jp/c/h/o/choco-milk/a6428940f9ae25fdb8354528b49cc230.gif");
	buttons += emoticonButton("gg2", "http://picto0.jugem.jp/c/h/o/choco-milk/3c11f3575577173bb49a388669e5288c.gif");
	buttons += emoticonButton("alan2", "http://picto0.jugem.jp/c/h/o/choco-milk/b4263a6db623b8d7ab849ee43d69c2ec.gif");
	buttons += emoticonButton("gerak2", "http://picto0.jugem.jp/c/o/c/cocoa321/bc715e7c4275addee8a42e782b4bb3da.gif");
	buttons += emoticonButton("ok2", "http://picto0.jugem.jp/t/s/u/tsuna0605/96817baa268440bec9cb3e30a467f3e8.gif");
	buttons += emoticonButton("no2", "http://picto0.jugem.jp/t/s/u/tsuna0605/1b6882b18e45e0bf8639544e45255efd.gif");
	buttons += emoticonButton("home", "http://picto0.jugem.jp/c/h/o/choco-milk/572b3bb4ad2364492a58819792d7a337.gif");
	buttons += emoticonButton("kfc", "http://picto0.jugem.jp/h/-/p/h-p-s/bae30250b1e961d5f8b9a28246c2b3df.gif");
	buttons += emoticonButton("rose", "http://picto0.jugem.jp/s/c/a/scapegoat69/ab6347e244526a92b34ea49e6093b7ba.gif");
	buttons += emoticonButton("mentol", "http://picto0.jugem.jp/y/u/u/yuupan/ce4e467c63e43679b3dcb5faad42456b.gif");
	buttons += emoticonButton("awan3", "http://picto0.jugem.jp/c/h/o/choco-milk/f7315fa93b031ef133a4ff4af5e6b4e8.gif");
	buttons += emoticonButton("flystar", "http://picto0.jugem.jp/t/s/u/tsuna0605/884874836ea2fb300e820cd09f4872d1.gif");
	buttons += emoticonButton("ketagerak", "http://choco-milk.img.jugem.jp/20081008_517346.gif");
	buttons += emoticonButton("tv", "http://picto0.jugem.jp/c/h/o/choco-milk/a9593363a9061124fdf8354dad4c4a4e.gif");
	buttons += emoticonButton("beg", "http://picto0.jugem.jp/c/h/o/choco-milk/e5470bb4b9421d3352449fdde1ad5e97.gif");
	buttons += emoticonButton("pisang", "http://picto0.jugem.jp/c/h/o/choco-milk/ea9479f6abd0fc8ab830d789c6da2d0a.gif");
	buttons += emoticonButton("anggur", "http://picto0.jugem.jp/c/h/o/choco-milk/fb265810d74bbee6650162ec7483cdb0.gif");
	buttons += emoticonButton("lolipop", "http://picto0.jugem.jp/c/h/o/choco-milk/246949c7b3f502c0b4d5ed494f172cb7.gif");
	buttons += emoticonButton("epal", "http://picto0.jugem.jp/c/h/o/choco-milk/98d45eabcd7726628d1d7491009e7716.gif");
	buttons += emoticonButton("kiri", "http://picto0.jugem.jp/c/h/o/choco-milk/9dd6312f4397b49730b213367e519df7.gif");
	buttons += emoticonButton("kanan", "http://picto0.jugem.jp/c/h/o/choco-milk/ec88b2a95bd67735afe2c75bb74c77de.gif");
	buttons += emoticonButton("bola", "http://picto0.jugem.jp/c/h/o/choco-milk/749fdadc10e38ab82bc5398b637b26c1.gif");
	buttons += emoticonButton("seruan", "http://picto0.jugem.jp/c/h/o/choco-milk/c882b49e43557acc83ce017d0d108497.gif");
	buttons += emoticonButton("tulis", "http://picto0.jugem.jp/c/h/o/choco-milk/d04958a3f1b758d92b647e9789c6bd75.gif");
	buttons += emoticonButton("botol", "http://picto0.jugem.jp/c/h/o/choco-milk/5b9cbbdaea93190d082ce9cda398c596.gif");
	buttons += emoticonButton("serumrh", "http://picto0.jugem.jp/c/u/t/cutegazou/79c270084b233f4cd0163dcab71f1810.gif");
	buttons += emoticonButton("pygpink", "http://choco-milk.img.jugem.jp/20080824_500286.gif");
	buttons += emoticonButton("sinar", "http://picto0.jugem.jp/0/1/1/011464-c/dd975b6655b6e9572acb017a57dbc4ea.gif");
	buttons += emoticonButton("serukaler", "http://picto0.jugem.jp/r/y/u/ryufu74/2f4401e4990077803caa9cb67b37bf81.gif");
	buttons += emoticonButton("five", "http://picto0.jugem.jp/m/i/-/mi-nightmare/1a3092bb6c45035042260bd635852383.gif");
	buttons += emoticonButton("daun", "http://picto0.jugem.jp/c/h/o/choco-milk/c8ac73a8ec967c910322611f16a9ee83.gif");
	buttons += emoticonButton("lovelmpt", "http://picto0.jugem.jp/y/u/u/yuupan/341545288dbdbedc75ee4d604624bf1d.gif");
	buttons += emoticonButton("serucomel", "http://chun5.img.jugem.jp/20081104_433891.gif");
	buttons += emoticonButton("loveterbang", "http://chun5.img.jugem.jp/20081104_433884.gif");
	buttons += emoticonButton("gunting", "http://chun5.img.jugem.jp/20081104_433879.gif");
	buttons += emoticonButton("aiskrim", "http://picto0.jugem.jp/t/s/u/tsuna0605/fa4d5e4ed1709f894c5e405e3c3b25e3.gif");
	buttons += emoticonButton("beger", "http://picto0.jugem.jp/c/h/o/choco-milk/205d8b9e8cf93bbb2d7c4419f97f0458.gif");
	buttons += emoticonButton("flag", "http://picto0.jugem.jp/c/h/o/choco-milk/7be8166fef6af49476a8e0d46a2d3872.gif");
	buttons += emoticonButton("smile", "http://picto0.jugem.jp/o/r/a/orangedaysxs/df558436387a49c336040d8e065dce05.gif");
	buttons += emoticonButton("zup3", "http://picto0.jugem.jp/t/s/u/tsuna0605/dfbee6b19b5408a9f5fe0c78a5ef66aa.gif");
	buttons += emoticonButton("segan2", "http://picto0.jugem.jp/a/k/o/akonako/04b8097bbfda153bc7613c00830a32fc.gif");
	buttons += emoticonButton("cium", "http://picto0.jugem.jp/t/a/v/tavico/0d5923dab50cbfa74782a9d34f212d35.gif");
	buttons += emoticonButton("konon", "http://picto0.jugem.jp/t/a/v/tavico/e46760b03fc673b38bc5b9bc36a24391.gif");
	buttons += emoticonButton("takot", "http://picto0.jugem.jp/t/a/v/tavico/e5d55b9b1a8ca180dec258f350ccfa65.gif");
	buttons += emoticonButton(";)", "http://picto0.jugem.jp/t/a/v/tavico/7b63b44420b70cb0ee139821fcb69985.gif");
	buttons += emoticonButton("menanges", "http://picto0.jugem.jp/t/a/v/tavico/80eea06bc2a02803fcf3ff6ab52849b9.gif");
	buttons += emoticonButton("gelak", "http://picto0.jugem.jp/t/a/v/tavico/83c046a0de6a115e01aeae3be41c4da9.gif");
	buttons += emoticonButton("cenyum2", "http://picto0.jugem.jp/y/u/u/yuupan/5869065ed8587ac0f37e901b0888cfbe.gif");
	buttons += emoticonButton("malu", "http://picto0.jugem.jp/y/u/u/yuupan/d3b0c75c5ffbbd7fb33f9b14469699d5.gif");
	buttons += emoticonButton("wek", "http://picto0.jugem.jp/y/u/u/yuupan/f92ea23ca53b3c72906a0b248c3a8753.gif");
	buttons += emoticonButton("divider4", "http://choco-milk.img.jugem.jp/20080704_481616.gif");
      
        
    buttons += separator();
    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"\\\" height=\\\"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);