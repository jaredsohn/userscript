// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by andianka (http://waitwhosaidthat.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Asteeg Smileys
// @namespace      http://andianka.googlepages.com/
// @description    You can use emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton(":001:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/1.jpg");
	buttons += emoticonButton(":002:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/2.jpg");
	buttons += emoticonButton(":003:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/3.jpg");
	buttons += emoticonButton(":004:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/4.jpg");
	buttons += emoticonButton(":005:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/5.jpg");
	buttons += emoticonButton(":006:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/6.jpg");
	buttons += emoticonButton(":007:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/7.jpg");
	buttons += emoticonButton(":008:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/8.jpg");
	buttons += emoticonButton(":009:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/9.jpg");
	buttons += emoticonButton(":010:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/10.jpg");
	buttons += emoticonButton(":011:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/11.jpg");
	buttons += emoticonButton(":012:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/12.jpg");
	buttons += emoticonButton(":013:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/13.jpg");
	buttons += emoticonButton(":014:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/14.jpg");
	buttons += emoticonButton(":015:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/15.jpg");
	buttons += emoticonButton(":016:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/16.jpg");
	buttons += emoticonButton(":017:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/17.jpg");
	buttons += emoticonButton(":018:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/18.jpg");
	buttons += emoticonButton(":019:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/19.jpg");
	buttons += emoticonButton(":020:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/20.jpg");
	buttons += emoticonButton(":021:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/21.jpg");
	buttons += emoticonButton(":022:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/22.jpg");
	buttons += emoticonButton(":023:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/23.jpg");
	buttons += emoticonButton(":024:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/24.jpg");
	buttons += emoticonButton(":025:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/25.jpg");
	buttons += emoticonButton(":026:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/26.jpg");
	buttons += emoticonButton(":027:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/27.jpg");
	buttons += emoticonButton(":028:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/28.jpg");
	buttons += emoticonButton(":029:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/29.jpg");
	buttons += emoticonButton(":030:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/30.jpg");
	buttons += emoticonButton(":031:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/31.jpg");
	buttons += emoticonButton(":032:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/32.jpg");
	buttons += emoticonButton(":033:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/33.jpg");
	buttons += emoticonButton(":034:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/34.jpg");
	buttons += emoticonButton(":035:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/35.jpg");
	buttons += emoticonButton(":036:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/36.jpg");
	buttons += emoticonButton(":037:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/37.jpg");
	buttons += emoticonButton(":038:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/38.jpg");
	buttons += emoticonButton(":039:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/39.jpg");
	buttons += emoticonButton(":040:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/40.jpg");
	buttons += emoticonButton(":041:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/41.jpg");
	buttons += emoticonButton(":042:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/42.jpg");
	buttons += emoticonButton(":043:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/43.jpg");
	buttons += emoticonButton(":044:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/44.jpg");
	buttons += emoticonButton(":045:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/45.jpg");
	buttons += emoticonButton(":046:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/46.jpg");
	buttons += emoticonButton(":047:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/47.jpg");
	buttons += emoticonButton(":048:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/48.jpg");
	buttons += emoticonButton(":049:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/49.jpg");
	buttons += emoticonButton(":050:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/50.jpg");
	buttons += emoticonButton(":051:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/51.jpg");
	buttons += emoticonButton(":052:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/52.jpg");
	buttons += emoticonButton(":053:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/53.jpg");
	buttons += emoticonButton(":054:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/54.jpg");
	buttons += emoticonButton(":055:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/55.jpg");
	buttons += emoticonButton(":056:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/56.jpg");
	buttons += emoticonButton(":057:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/57.jpg");
	buttons += emoticonButton(":058:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/58.jpg");
	buttons += emoticonButton(":059:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/59.jpg");
	buttons += emoticonButton(":060:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/60.jpg");
	buttons += emoticonButton(":061:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/61.jpg");
	buttons += emoticonButton(":062:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/62.jpg");
	buttons += emoticonButton(":063:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/63.jpg");
	buttons += emoticonButton(":064:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/64.jpg");
	buttons += emoticonButton(":065:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/65.jpg");
	buttons += emoticonButton(":066:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/66.jpg");
	buttons += emoticonButton(":067:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/67.jpg");
	buttons += emoticonButton(":068:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/68.jpg");
	buttons += emoticonButton(":069:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/69.jpg");
	buttons += emoticonButton(":070:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/70.jpg");
	buttons += emoticonButton(":071:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/71.jpg");
	buttons += emoticonButton(":072:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/72.jpg");
	buttons += emoticonButton(":073:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/73.jpg");
	buttons += emoticonButton(":074:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/74.jpg");
	buttons += emoticonButton(":075:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/75.jpg");
	buttons += emoticonButton(":076:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/76.jpg");
	buttons += emoticonButton(":077:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/77.jpg");
	buttons += emoticonButton(":078:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/78.jpg");
	buttons += emoticonButton(":079:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/79.jpg");
	buttons += emoticonButton(":080:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/80.jpg");
	buttons += emoticonButton(":081:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/81.jpg");
	buttons += emoticonButton(":082:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/82.jpg");
	buttons += emoticonButton(":083:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/83.jpg");
	buttons += emoticonButton(":084:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/84.jpg");
	buttons += emoticonButton(":085:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/85.jpg");
	buttons += emoticonButton(":086:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/86.jpg");
	buttons += emoticonButton(":087:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/87.jpg");
	buttons += emoticonButton(":088:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/88.jpg");
	buttons += emoticonButton(":089:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/89.jpg");
	buttons += emoticonButton(":090:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/90.jpg");
	buttons += emoticonButton(":091:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/91.jpg");
	buttons += emoticonButton(":092:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/92.jpg");
	buttons += emoticonButton(":093:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/93.jpg");
	buttons += emoticonButton(":094:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/94.jpg");
	buttons += emoticonButton(":095:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/95.jpg");
	buttons += emoticonButton(":096:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/a.jpg");
	buttons += emoticonButton(":097:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/b.jpg");
	buttons += emoticonButton(":098:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/c.jpg");
	buttons += emoticonButton(":099:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/d.jpg");
	buttons += emoticonButton(":100:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/e.jpg");
	buttons += emoticonButton(":101:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/f.jpg");
	buttons += emoticonButton(":102:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/g.jpg");
	buttons += emoticonButton(":103:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/h.jpg");
	buttons += emoticonButton(":104:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/i.jpg");
	buttons += emoticonButton(":105:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/j.jpg");
	buttons += emoticonButton(":250:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/k.jpg");
	buttons += emoticonButton(":251:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/l.jpg");
	buttons += emoticonButton(":252:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/m.jpg");
	buttons += emoticonButton(":253:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/n.jpg");
	buttons += emoticonButton(":254:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/o.jpg");
	buttons += emoticonButton(":255:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/p.jpg");
	buttons += emoticonButton(":256:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/q.jpg");
	buttons += emoticonButton(":257:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/r.jpg");
	buttons += emoticonButton(":258:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/s.jpg");
	buttons += emoticonButton(":259:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/t.jpg");
	buttons += emoticonButton(":260:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/u.jpg");
	buttons += emoticonButton(":261:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/v.jpg");
	buttons += emoticonButton(":262:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/w.jpg");
	buttons += emoticonButton(":263:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/x.jpg");
	buttons += emoticonButton(":264:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/y.jpg");
	buttons += emoticonButton(":265:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/z.jpg");
	buttons += emoticonButton(":266:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/zz.jpg");
	buttons += emoticonButton(":267:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/zzz.jpg");
	buttons += emoticonButton(":268:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/zzzz.jpg");
	buttons += emoticonButton(":269:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/zzzzz.jpg");
	buttons += emoticonButton(":270:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/zzzzzz.jpg");
	buttons += emoticonButton(":271:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/zzzzzzz.jpg");
	buttons += emoticonButton(":272:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/zzzzzzzz.jpg");
	buttons += emoticonButton(":273:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/zzzzzzzzz.jpg");
	buttons += emoticonButton(":274:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperkawaii/zzzzzzzzzzzz.jpg");
    buttons += emoticonButton(":106:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/031.gif");
    buttons += emoticonButton(":107:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/032.gif");
    buttons += emoticonButton(":108:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/039.gif");
    buttons += emoticonButton(":109:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/042.gif");
    buttons += emoticonButton(":110:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/040.gif");
    buttons += emoticonButton(":111:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/073.gif");
    buttons += emoticonButton(":112:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/078.gif");
    buttons += emoticonButton(":113:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/093.gif");
    buttons += emoticonButton(":114:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/105.gif");
    buttons += emoticonButton(":115:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/110.gif");
    buttons += emoticonButton(":116:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/112.gif");
    buttons += emoticonButton(":117:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/125.gif");
    buttons += emoticonButton(":118:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/126.gif");
    buttons += emoticonButton(":119:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/001.gif");
    buttons += emoticonButton(":120:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/002.gif");
    buttons += emoticonButton(":121:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/003.gif");
    buttons += emoticonButton(":122:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/004.gif");
    buttons += emoticonButton(":123:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/006.gif");
    buttons += emoticonButton(":124:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/007.gif");
    buttons += emoticonButton(":125:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/008.gif");
    buttons += emoticonButton(":126:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/009.gif");
    buttons += emoticonButton(":127:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/010.gif");
    buttons += emoticonButton(":128:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/011.gif");
    buttons += emoticonButton(":129:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/012.gif");
    buttons += emoticonButton(":130:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/013.gif");
    buttons += emoticonButton(":131:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/014.gif");
    buttons += emoticonButton(":132:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/015.gif");
    buttons += emoticonButton(":133:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/016.gif");
    buttons += emoticonButton(":134:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/018.gif");
    buttons += emoticonButton(":135:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/11s0djc-2.gif");
    buttons += emoticonButton(":136:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/019.gif");
    buttons += emoticonButton(":137:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/020.gif");
    buttons += emoticonButton(":138:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/022.gif");
    buttons += emoticonButton(":139:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/023.gif");
    buttons += emoticonButton(":140:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/024.gif");
    buttons += emoticonButton(":141:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/025.gif");
    buttons += emoticonButton(":142:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/026.gif");
    buttons += emoticonButton(":143:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/027.gif");
    buttons += emoticonButton(":144:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/028.gif");
    buttons += emoticonButton(":145:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/029.gif");
    buttons += emoticonButton(":146:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/030.gif");
    buttons += emoticonButton(":147:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/033.gif");
    buttons += emoticonButton(":148:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/034.gif");
    buttons += emoticonButton(":149:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/035.gif");
    buttons += emoticonButton(":150:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/036.gif");
    buttons += emoticonButton(":151:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/037.gif");
    buttons += emoticonButton(":152:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/038.gif");
    buttons += emoticonButton(":153:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/041.gif");
    buttons += emoticonButton(":154:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/043.gif");
    buttons += emoticonButton(":155:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/044.gif");
    buttons += emoticonButton(":156:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/045.gif");
    buttons += emoticonButton(":157:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/046.gif");
    buttons += emoticonButton(":158:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/047.gif");
    buttons += emoticonButton(":159:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/048.gif");
    buttons += emoticonButton(":160:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/049.gif");
    buttons += emoticonButton(":161:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/050.gif");
    buttons += emoticonButton(":162:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/051.gif");
    buttons += emoticonButton(":163:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/052.gif");
    buttons += emoticonButton(":164:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/053.gif");
    buttons += emoticonButton(":165:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/054.gif");
    buttons += emoticonButton(":166:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/055.gif");
    buttons += emoticonButton(":167:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/056.gif");
    buttons += emoticonButton(":168:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/057.gif");
    buttons += emoticonButton(":169:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/058.gif");
    buttons += emoticonButton(":170:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/059.gif");
    buttons += emoticonButton(":171:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/060.gif");
    buttons += emoticonButton(":172:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/061.gif");
    buttons += emoticonButton(":173:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/062.gif");
    buttons += emoticonButton(":174:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/063.gif");
    buttons += emoticonButton(":175:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/064.gif");
    buttons += emoticonButton(":176:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/065.gif");
    buttons += emoticonButton(":177:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/066.gif");
    buttons += emoticonButton(":178:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/067.gif");
    buttons += emoticonButton(":179:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/068.gif");
    buttons += emoticonButton(":180:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/069.gif");
    buttons += emoticonButton(":181:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/070.gif");
    buttons += emoticonButton(":182:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/071.gif");
    buttons += emoticonButton(":183:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/072.gif");
    buttons += emoticonButton(":184:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/074.gif");
    buttons += emoticonButton(":185:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/075.gif");
    buttons += emoticonButton(":186:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/076.gif");
    buttons += emoticonButton(":187:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/077.gif");
    buttons += emoticonButton(":188:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/079.gif");
    buttons += emoticonButton(":189:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/080.gif");
    buttons += emoticonButton(":190:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/081.gif");
    buttons += emoticonButton(":191:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/085.gif");
    buttons += emoticonButton(":192:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/086.gif");
    buttons += emoticonButton(":193:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/087.gif");
    buttons += emoticonButton(":194:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/088.gif");
    buttons += emoticonButton(":195:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/089.gif");
    buttons += emoticonButton(":196:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/090.gif");
    buttons += emoticonButton(":197:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/091.gif");
    buttons += emoticonButton(":198:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/092.gif");
    buttons += emoticonButton(":199:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/094.gif");
    buttons += emoticonButton(":200:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/095.gif");
    buttons += emoticonButton(":201:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/0961.gif");
    buttons += emoticonButton(":202:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/097.gif");
    buttons += emoticonButton(":203:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/098.gif");
    buttons += emoticonButton(":204:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/099.gif");
    buttons += emoticonButton(":205:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/101.gif");
    buttons += emoticonButton(":206:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/102.gif");
    buttons += emoticonButton(":207:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/104.gif");
    buttons += emoticonButton(":208:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/107.gif");
    buttons += emoticonButton(":209:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/108.gif");
    buttons += emoticonButton(":210:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/109.gif");
    buttons += emoticonButton(":211:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/111.gif");
    buttons += emoticonButton(":212:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/115.gif");
    buttons += emoticonButton(":213:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/116.gif");
    buttons += emoticonButton(":214:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/118.gif");
    buttons += emoticonButton(":215:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/119.gif");
    buttons += emoticonButton(":216:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/120.gif");
    buttons += emoticonButton(":217:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/121.gif");
    buttons += emoticonButton(":218:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/122.gif");
    buttons += emoticonButton(":219:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/123.gif");
    buttons += emoticonButton(":220:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/124.gif");
    buttons += emoticonButton(":221:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/127.gif");
    buttons += emoticonButton(":222:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/128.gif");
    buttons += emoticonButton(":223:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/131.gif");
    buttons += emoticonButton(":224:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/132.gif");
    buttons += emoticonButton(":225:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/133.gif");
    buttons += emoticonButton(":226:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/134.gif");
    buttons += emoticonButton(":227:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/papernumbers/d37300d0.gif");
    buttons += emoticonButton(":228:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/papernumbers/1.gif");
    buttons += emoticonButton(":229:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/papernumbers/2.gif");
    buttons += emoticonButton(":230:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/papernumbers/3.gif");
    buttons += emoticonButton(":231:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/papernumbers/4.gif");
    buttons += emoticonButton(":232:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/papernumbers/5.gif");
    buttons += emoticonButton(":233:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/papernumbers/6.gif");
    buttons += emoticonButton(":234:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/papernumbers/7.gif");
    buttons += emoticonButton(":235:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/papernumbers/8.gif");
    buttons += emoticonButton(":236:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperbibi/papernumbers/9.gif");
    buttons += emoticonButton(":237:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperpai/Untitled-1.png");
    buttons += emoticonButton(":238:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperpai/Untitled-11.png");
    buttons += emoticonButton(":239:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperpai/Untitled-12.png");
    buttons += emoticonButton(":240:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperpai/Untitled-13.png");
    buttons += emoticonButton(":241:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperpai/Untitled-14.png");
    buttons += emoticonButton(":242:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperpai/Untitled-2.png");
    buttons += emoticonButton(":243:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperpai/Untitled-3.png");
    buttons += emoticonButton(":244:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperpai/Untitled-4.png");
    buttons += emoticonButton(":245:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperpai/Untitled-5.png");
    buttons += emoticonButton(":246:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperpai/Untitled-6.png");
    buttons += emoticonButton(":247:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperpai/Untitled-7.png");
    buttons += emoticonButton(":248:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperpai/Untitled-8.png");
    buttons += emoticonButton(":249:", "http://i603.photobucket.com/albums/tt113/paperpixels/paperpai/Untitled-9.png");
    
	buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img width=\"15\" height=\"15\" src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);