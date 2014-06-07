// Based on the original script by miss.mika (http://chrispy-cookies.blogspot.com/) 
// Modified by  ( ur site ) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           smilies
// @namespace      http://www.choi--heartxxx.blogspot.com/
// @description    You can use emoticons in Blogger. by chrispy-cookies.blogspot.com
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";

buttons += emoticonButton(":01:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bgtsgz.gif");
buttons += emoticonButton(":02:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/71s106.gif");
buttons += emoticonButton(":03:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/5zkymx.gif");
buttons += emoticonButton(":04:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/5vtb8k.gif");
buttons += emoticonButton(":05:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/135.gif");
buttons += emoticonButton(":06:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/133.gif");
buttons += emoticonButton(":07:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/132.gif");
buttons += emoticonButton(":08:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/127.gif");
buttons += emoticonButton(":09:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/124.gif");
buttons += emoticonButton(":010:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/123.gif");
	
buttons += emoticonButton(":1:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/030gif.gif");
buttons += emoticonButton(":2:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/048gif.gif");
buttons += emoticonButton(":3:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/087gif.gif");
buttons += emoticonButton(":4:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/82jpg.jpg");
buttons += emoticonButton(":5:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/950ac92cjpg.jpg");
buttons += emoticonButton(":6:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/th2lxusjgif.gif");
buttons += emoticonButton(":7:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/x45-1jpg.jpg");
buttons += emoticonButton(":8:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/019gif.gif");
buttons += emoticonButton(":9:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/025gif.gif");
buttons += emoticonButton(":10:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/036gif.gif");
buttons += emoticonButton(":11:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/045gif.gif");

buttons += emoticonButton(":12:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/047gif.gif");
buttons += emoticonButton(":13:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/051gif.gif");
buttons += emoticonButton(":14:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/053gif.gif");
buttons += emoticonButton(":15:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/058gif.gif");
buttons += emoticonButton(":16:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/060gif.gif");
buttons += emoticonButton(":17:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/063gif.gif");
buttons += emoticonButton(":18:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/065gif.gif");
buttons += emoticonButton(":19:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/066gif.gif");
buttons += emoticonButton(":20:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/070gif.gif");
buttons += emoticonButton(":21:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/074-1.gif");
buttons += emoticonButton(":22:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/075gif.gif");
buttons += emoticonButton(":23:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/080gif.gif");

buttons += emoticonButton(":24:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/085gif.gif");
buttons += emoticonButton(":25:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/086gif.gif");
buttons += emoticonButton(":26:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/088gif.gif");
buttons += emoticonButton(":27:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/090gif.gif");
buttons += emoticonButton(":28:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/091gif.gif");
buttons += emoticonButton(":29:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/092gif.gif");
buttons += emoticonButton(":30:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/104gif.gif");
buttons += emoticonButton(":31:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/108gif.gif");
buttons += emoticonButton(":32:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/111gif.gif");
buttons += emoticonButton(":33:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/116gif.gif");
buttons += emoticonButton(":34:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/119gif.gif");
buttons += emoticonButton(":35:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/131gif.gif");


buttons += emoticonButton(":36:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/m11.png");
buttons += emoticonButton(":37:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/m4.png");
buttons += emoticonButton(":38:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/a10.png");
buttons += emoticonButton(":39:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/a9.png");
buttons += emoticonButton(":40:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/a7.png");
buttons += emoticonButton(":41:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/a5.png");
buttons += emoticonButton(":42:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/a1.png");
buttons += emoticonButton(":43:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/17-3.png");
buttons += emoticonButton(":44:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/16-3.png");
buttons += emoticonButton(":45:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/15-4.png");
buttons += emoticonButton(":46:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/14-4.png");
buttons += emoticonButton(":47:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/13-1.png");	
buttons += emoticonButton(":48:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/12-1.png");
buttons += emoticonButton(":49:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/11-4.png");
buttons += emoticonButton(":50:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/10-1.png");

buttons += emoticonButton(":501:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/9-4.png");
buttons += emoticonButton(":502:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/8-4.png");
buttons += emoticonButton(":503:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/7-4.png");
buttons += emoticonButton(":504:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/6-4.png");
buttons += emoticonButton(":505:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/5-4.png");
buttons += emoticonButton(":506:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/4-1.png");
buttons += emoticonButton(":507:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/3-4.png");
buttons += emoticonButton(":508:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/2-1.png");
buttons += emoticonButton(":509:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/1-4.png");

buttons += emoticonButton(":51:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_001.jpg");
buttons += emoticonButton(":52:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_002.jpg");
buttons += emoticonButton(":53:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_003.jpg");
buttons += emoticonButton(":54:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_004.jpg");
buttons += emoticonButton(":55:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_005.jpg");
buttons += emoticonButton(":56:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_006.jpg");
buttons += emoticonButton(":57:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_007.jpg");
buttons += emoticonButton(":58:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_008.jpg");
buttons += emoticonButton(":59:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_009.jpg");    
buttons += emoticonButton(":60:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_010.jpg");
buttons += emoticonButton(":61:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_011.jpg");
buttons += emoticonButton(":62:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_012.jpg");
buttons += emoticonButton(":63:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_013.jpg");
buttons += emoticonButton(":64:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_014.jpg");
buttons += emoticonButton(":65:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_015.jpg");
buttons += emoticonButton(":66:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_016.jpg");
buttons += emoticonButton(":67:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_017.jpg");
buttons += emoticonButton(":68:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_018.jpg"); 
buttons += emoticonButton(":69:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_019.jpg");
buttons += emoticonButton(":70:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_020.jpg");
buttons += emoticonButton(":71:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_021.jpg");
buttons += emoticonButton(":72:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_022.jpg");
buttons += emoticonButton(":73:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_023.jpg");
buttons += emoticonButton(":74:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/bibi1004_024.jpg");
buttons += emoticonButton(":75:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/creambunny_ring.gif");
buttons += emoticonButton(":76:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/creambunny_cup.gif");
buttons += emoticonButton(":77:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/creambunny_fork.gif"); 
buttons += emoticonButton(":78:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/creambunny_flower.gif");
buttons += emoticonButton(":79:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/creambunny_mp3.gif");
buttons += emoticonButton(":80:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/creambunny_note.gif");
buttons += emoticonButton(":81:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/122.gif");
buttons += emoticonButton(":82:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/27.gif");
buttons += emoticonButton(":83:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/favicon.png");
buttons += emoticonButton(":84:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/1512.gif");
buttons += emoticonButton(":85:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/1537.gif");    
buttons += emoticonButton(":86:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/1540.gif");
buttons += emoticonButton(":87:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/ase.gif");
buttons += emoticonButton(":88:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/camera.gif");
buttons += emoticonButton(":89:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/342.gif");
buttons += emoticonButton(":90:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/00215.gif");
buttons += emoticonButton(":91:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/creambunny_starb.gif");
buttons += emoticonButton(":92:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/02_01gif.gif");
buttons += emoticonButton(":93:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/02_02gif.gif");
buttons += emoticonButton(":94:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/02_08gif.gif"); 
buttons += emoticonButton(":95:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/02_13gif.gif");
buttons += emoticonButton(":96:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/mini01_01gif.gif");
buttons += emoticonButton(":97:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/tea_b05gif.gif");
buttons += emoticonButton(":98:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/121.gif"); 
buttons += emoticonButton(":99:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/118.gif");
buttons += emoticonButton(":100:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/115.gif");

buttons += emoticonButton(":101:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/111.gif");
buttons += emoticonButton(":102:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/109.gif"); 
buttons += emoticonButton(":103:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/107.gif");
buttons += emoticonButton(":104:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/099.gif");
buttons += emoticonButton(":105:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/098.gif");

buttons += emoticonButton(":106:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/097.gif");
buttons += emoticonButton(":107:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/096.gif"); 
buttons += emoticonButton(":108:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/094.gif");
buttons += emoticonButton(":109:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/089.gif");
buttons += emoticonButton(":110:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/079.gif");

buttons += emoticonButton(":111:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/076.gif");
buttons += emoticonButton(":112:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/072.gif"); 
buttons += emoticonButton(":113:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/071.gif");
buttons += emoticonButton(":114:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/069.gif");
buttons += emoticonButton(":115:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/067.gif");

buttons += emoticonButton(":116:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/064.gif");
buttons += emoticonButton(":117:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/062.gif"); 
buttons += emoticonButton(":118:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/061.gif");
buttons += emoticonButton(":119:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/057.gif");
buttons += emoticonButton(":120:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/056.gif");

buttons += emoticonButton(":121:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/055.gif");
buttons += emoticonButton(":122:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/054.gif"); 
buttons += emoticonButton(":123:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/052.gif");
buttons += emoticonButton(":124:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/050.gif");
buttons += emoticonButton(":125:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/049.gif");

buttons += emoticonButton(":126:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/046.gif");
buttons += emoticonButton(":127:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/044.gif"); 
buttons += emoticonButton(":128:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/043.gif");
buttons += emoticonButton(":129:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/041.gif");
buttons += emoticonButton(":130:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/038.gif");

buttons += emoticonButton(":131:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/037.gif");
buttons += emoticonButton(":132:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/034.gif"); 
buttons += emoticonButton(":133:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/033.gif");
buttons += emoticonButton(":134:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/029.gif");
buttons += emoticonButton(":135:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/024.gif");

buttons += emoticonButton(":136:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/023.gif");
buttons += emoticonButton(":137:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/022.gif"); 
buttons += emoticonButton(":138:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/020.gif");
buttons += emoticonButton(":139:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/018.gif");
buttons += emoticonButton(":140:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/017.gif");

buttons += emoticonButton(":141:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/016.gif");
buttons += emoticonButton(":142:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/015.gif"); 
buttons += emoticonButton(":143:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/012.gif");
buttons += emoticonButton(":144:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/011.gif");
buttons += emoticonButton(":145:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/010.gif");

buttons += emoticonButton(":146:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/009.gif");
buttons += emoticonButton(":147:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/007.gif"); 
buttons += emoticonButton(":148:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/006.gif");
buttons += emoticonButton(":149:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/004.gif");
buttons += emoticonButton(":150:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/003.gif");

buttons += emoticonButton(":151:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/002.gif");
buttons += emoticonButton(":152:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/001.gif");
buttons += emoticonButton(":153:", "http://i35.tinypic.com/dg6kpk.jpg");
buttons += emoticonButton(":154:", "http://i33.tinypic.com/zuk39f.jpg");
buttons += emoticonButton(":155:", "http://i38.tinypic.com/2yvwb39.jpg");

buttons += emoticonButton(":156:", "http://i34.tinypic.com/287kswg.jpg");
buttons += emoticonButton(":157:", "http://i34.tinypic.com/2q0ms6c.jpg"); 
buttons += emoticonButton(":158:", "http://i34.tinypic.com/13yjj12.jpg");
buttons += emoticonButton(":159:", "http://i34.tinypic.com/2wbuezn.jpg");
buttons += emoticonButton(":160:", "http://i35.tinypic.com/2ldvk78.jpg");

buttons += emoticonButton(":161:", "http://i34.tinypic.com/2ibhufk.jpg");
buttons += emoticonButton(":162:", "http://i41.tinypic.com/kec4kx.jpg");
buttons += emoticonButton(":163:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/gr0816.gif");
buttons += emoticonButton(":164:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/gr0814.gif");
buttons += emoticonButton(":165:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/gr0810.gif");

buttons += emoticonButton(":166:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/gr0804.gif");
buttons += emoticonButton(":167:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/gr0803.gif"); 
buttons += emoticonButton(":168:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/gr0802.gif");
buttons += emoticonButton(":169:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/gr0801.gif");
buttons += emoticonButton(":170:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/gr0244.gif");

buttons += emoticonButton(":171:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/gr0239.gif");
buttons += emoticonButton(":172:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/gr0238.gif");
buttons += emoticonButton(":173:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/gr0205.gif");
buttons += emoticonButton(":174:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/9-1.gif");
buttons += emoticonButton(":175:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/8-1.gif");

buttons += emoticonButton(":176:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/7-1.gif");
buttons += emoticonButton(":177:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/6-1.gif"); 
buttons += emoticonButton(":178:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/5-1.gif");
buttons += emoticonButton(":179:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/42.gif");
buttons += emoticonButton(":180:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/3-1.gif");

buttons += emoticonButton(":181:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/23-1.gif");
buttons += emoticonButton(":182:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/18-2.gif");
buttons += emoticonButton(":183:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/17-2.gif");
buttons += emoticonButton(":184:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/15-3.gif");
buttons += emoticonButton(":185:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/14-1.gif");

buttons += emoticonButton(":186:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/11-1.gif");
buttons += emoticonButton(":187:", "http://i365.photobucket.com/albums/oo94/Loph_Jonghunnie/stuff/1-1.gif"); 

	buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);