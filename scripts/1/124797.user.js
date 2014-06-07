// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Jan Di (http://momoiro-box.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kawaii Emoticons for Blogger
// @namespace      http://momoiro-box.blogspot.com
// @description    You can use emoticons in Blogger by momoiro-box.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";


buttons += emoticonButton(":a:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/a.png");
buttons += emoticonButton(":b:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/b.jpg");
buttons += emoticonButton(":c:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/c.gif");
buttons += emoticonButton(":d:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/d.gif");
buttons += emoticonButton(":e:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/e.gif");
buttons += emoticonButton(":f:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/f.jpg");
buttons += emoticonButton(":g:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/g.jpg");
buttons += emoticonButton(":h:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/h.jpg");
buttons += emoticonButton(":i:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/i.jpg");
buttons += emoticonButton(":j:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/j.jpg");
buttons += emoticonButton(":k:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/k.jpg");
buttons += emoticonButton(":l:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/l.jpg");
buttons += emoticonButton(":m:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/m.gif");
buttons += emoticonButton(":n:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/n.gif");
buttons += emoticonButton(":o:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/o.gif");
buttons += emoticonButton(":p:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/p.gif");
buttons += emoticonButton(":q:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/q.jpg");
buttons += emoticonButton(":r:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/r.gif");
buttons += emoticonButton(":s:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/s.gif");
buttons += emoticonButton(":t:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/t.jpg");
buttons += emoticonButton(":u:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/u.jpg");
buttons += emoticonButton(":v:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/v.gif");
buttons += emoticonButton(":w:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/w.jpg");
buttons += emoticonButton(":x:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/x.gif");
buttons += emoticonButton(":y:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/y.jpg");
buttons += emoticonButton(":z:", 
"http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/z.png");
buttons += emoticonButton(":a1:", 
"http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/a1.gif");
buttons += emoticonButton(":a2:", 
"http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/a2.gif");
buttons += emoticonButton(":a3:", 
"http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/a3.jpg");
buttons += emoticonButton(":1:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/001gif.gif");
buttons += emoticonButton(":2:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/002gif.gif");
buttons += emoticonButton(":3:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/003gif.gif");
buttons += emoticonButton(":4:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/004gif.gif");
buttons += emoticonButton(":5:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/005gif.gif");
buttons += emoticonButton(":6:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/006gif.gif");
buttons += emoticonButton(":7:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/007gif.gif");
buttons += emoticonButton(":8:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/008gif.gif");
buttons += emoticonButton(":9:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/009gif.gif");
buttons += emoticonButton(":10:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/010gif.gif");
buttons += emoticonButton(":11:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/011gif.gif");
buttons += emoticonButton(":12:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/012gif.gif");
buttons += emoticonButton(":13:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/013gif.gif");
buttons += emoticonButton(":14:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/014gif.gif");
buttons += emoticonButton(":15:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/015gif.gif");
buttons += emoticonButton(":16:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/016gif.gif");
buttons += emoticonButton(":17:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/017gif.gif");
buttons += emoticonButton(":18:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/018gif.gif");
buttons += emoticonButton(":19:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/019gif.gif");
buttons += emoticonButton(":20:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/020gif.gif");
buttons += emoticonButton(":21:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/021gif.gif");
buttons += emoticonButton(":22:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/022gif.gif");
buttons += emoticonButton(":23:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/023gif.gif");
buttons += emoticonButton(":24:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/024gif.gif");
buttons += emoticonButton(":25:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/025gif.gif");
buttons += emoticonButton(":26:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/026gif.gif");
buttons += emoticonButton(":27:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/027gif.gif");
buttons += emoticonButton(":29:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/029gif.gif");
buttons += emoticonButton(":30:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/030gif.gif");
buttons += emoticonButton(":31:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/031gif.gif");
buttons += emoticonButton(":32:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/032gif.gif");
buttons += emoticonButton(":33:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/033gif.gif");
buttons += emoticonButton(":34:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/034gif.gif");
buttons += emoticonButton(":35:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/035gif.gif");
buttons += emoticonButton(":36:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/036gif.gif");
buttons += emoticonButton(":37:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/037gif.gif");
buttons += emoticonButton(":38:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/038gif.gif");
buttons += emoticonButton(":39:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/039gif.gif");
buttons += emoticonButton(":40:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/040gif.gif");
buttons += emoticonButton(":41:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/041gif.gif");
buttons += emoticonButton(":42:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/042gif.gif");
buttons += emoticonButton(":43:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/043gif.gif");
buttons += emoticonButton(":44:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/044gif.gif");
buttons += emoticonButton(":45:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/045gif.gif");
buttons += emoticonButton(":46:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/046gif.gif");
buttons += emoticonButton(":47:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/047gif.gif");
buttons += emoticonButton(":48:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/048gif.gif");
buttons += emoticonButton(":49:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/049gif.gif");
buttons += emoticonButton(":50:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/050gif.gif");
buttons += emoticonButton(":51:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/051gif.gif");
buttons += emoticonButton(":52:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/052gif.gif");
buttons += emoticonButton(":53:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/053gif.gif");
buttons += emoticonButton(":54:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/054gif.gif");
buttons += emoticonButton(":55:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/055gif.gif");
buttons += emoticonButton(":56:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/056gif.gif");
buttons += emoticonButton(":57:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/057gif.gif");
buttons += emoticonButton(":58:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/058gif.gif");
buttons += emoticonButton(":59:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/059gif.gif");
buttons += emoticonButton(":60:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/060gif.gif");
buttons += emoticonButton(":61:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/061gif.gif");
buttons += emoticonButton(":62:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/062gif.gif");
buttons += emoticonButton(":63:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/063gif.gif");
buttons += emoticonButton(":64:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/064gif.gif");
buttons += emoticonButton(":65:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/065gif.gif");
buttons += emoticonButton(":66:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/066gif.gif");
buttons += emoticonButton(":67:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/067gif.gif");
buttons += emoticonButton(":68:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/068gif.gif");
buttons += emoticonButton(":69:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/069gif.gif");
buttons += emoticonButton(":70:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/070gif.gif");
buttons += emoticonButton(":71:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/071gif.gif");
buttons += emoticonButton(":72:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/072gif.gif");
buttons += emoticonButton(":73:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/073gif.gif");
buttons += emoticonButton(":74:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/074gif.gif");
buttons += emoticonButton(":75:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/075gif.gif");
buttons += emoticonButton(":76:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/076gif.gif");
buttons += emoticonButton(":77:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/077gif.gif");
buttons += emoticonButton(":78:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/078gif.gif");
buttons += emoticonButton(":79:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/079gif.gif");
buttons += emoticonButton(":80:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/080gif.gif");
buttons += emoticonButton(":81:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/081gif.gif");
buttons += emoticonButton(":82:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/082gif.gif");
buttons += emoticonButton(":83:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/083gif.gif");
buttons += emoticonButton(":84:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/084gif.gif");
buttons += emoticonButton(":85:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/085gif.gif");
buttons += emoticonButton(":86:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/086gif.gif");
buttons += emoticonButton(":87:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/087gif.gif");
buttons += emoticonButton(":88:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/088gif.gif");
buttons += emoticonButton(":89:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/089gif.gif");
buttons += emoticonButton(":90:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/090gif.gif");
buttons += emoticonButton(":91:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/091gif.gif");
buttons += emoticonButton(":92:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/092gif.gif");
buttons += emoticonButton(":93:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/093gif.gif");
buttons += emoticonButton(":94:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/094gif.gif");
buttons += emoticonButton(":95:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/095gif.gif");
buttons += emoticonButton(":96:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/096gif.gif");
buttons += emoticonButton(":97:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/097gif.gif");
buttons += emoticonButton(":98:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/098gif.gif");
buttons += emoticonButton(":99:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/099gif.gif");
buttons += emoticonButton(":100:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/100gif.gif");
buttons += emoticonButton(":101:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/101gif.gif");
buttons += emoticonButton(":102:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/102gif.gif");
buttons += emoticonButton(":103:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/103gif.gif");
buttons += emoticonButton(":104:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/104gif.gif");
buttons += emoticonButton(":105:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/105gif.gif");
buttons += emoticonButton(":106:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/106gif.gif");
buttons += emoticonButton(":107:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/107gif.gif");
buttons += emoticonButton(":108:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/108gif.gif");
buttons += emoticonButton(":109:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/109gif.gif");
buttons += emoticonButton(":110:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/110gif.gif");
buttons += emoticonButton(":111:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/111gif.gif");
buttons += emoticonButton(":112:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/112gif.gif");
buttons += emoticonButton(":113:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/113gif.gif");
buttons += emoticonButton(":114:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/114gif.gif");
buttons += emoticonButton(":115:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/115gif.gif");
buttons += emoticonButton(":116:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/116gif.gif");
buttons += emoticonButton(":117:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/117gif.gif");
buttons += emoticonButton(":118:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/118gif.gif");
buttons += emoticonButton(":119:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/119gif.gif");
buttons += emoticonButton(":120:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/120gif.gif");
buttons += emoticonButton(":121:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/121gif.gif");
buttons += emoticonButton(":122:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/122gif.gif");
buttons += emoticonButton(":123:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/123gif.gif");
buttons += emoticonButton(":124:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/124gif.gif");
buttons += emoticonButton(":125:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/125gif.gif");
buttons += emoticonButton(":126:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/126gif.gif");
buttons += emoticonButton(":127:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/127gif.gif");
buttons += emoticonButton(":128:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/128gif.gif");
buttons += emoticonButton(":129:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/129gif.gif");
buttons += emoticonButton(":130:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/130gif.gif");
buttons += emoticonButton(":131:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/131gif.gif");
buttons += emoticonButton(":132:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/132gif.gif");
buttons += emoticonButton(":133:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/133gif.gif");
buttons += emoticonButton(":134:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/134gif.gif");
buttons += emoticonButton(":135:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/135gif.gif");
buttons += emoticonButton(":face1:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face1.jpg");
buttons += emoticonButton(":face2:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face2.jpg");
buttons += emoticonButton(":face3:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face3.jpg");
buttons += emoticonButton(":face4:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face4.gif");
buttons += emoticonButton(":face5:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face5.gif");
buttons += emoticonButton(":face6:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face6.jpg");
buttons += emoticonButton(":face7:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face7.jpg");
buttons += emoticonButton(":face8:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face8.jpg");
buttons += emoticonButton(":face9:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face9.gif");
buttons += emoticonButton(":face10:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face10.jpg");
buttons += emoticonButton(":face11:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face11.jpg");
buttons += emoticonButton(":face12:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face12.jpg");
buttons += emoticonButton(":face13:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face13.jpg");
buttons += emoticonButton(":face14:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face14.jpg");
buttons += emoticonButton(":face15:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face15.jpg");
buttons += emoticonButton(":face16:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face16.jpg");
buttons += emoticonButton(":face17:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face17.jpg");
buttons += emoticonButton(":face18:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face18.gif");
buttons += emoticonButton(":face19:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face19.jpg");
buttons += emoticonButton(":face20:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face20.jpg");
buttons += emoticonButton(":face21:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face21.jpg");
buttons += emoticonButton(":face22:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face22.jpg");
buttons += emoticonButton(":face23:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face23.jpg");
buttons += emoticonButton(":face24:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face24.jpg");
buttons += emoticonButton(":face25:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face25.jpg");
buttons += emoticonButton(":face26:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face26.jpg");
buttons += emoticonButton(":face27:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face27.jpg");
buttons += emoticonButton(":face28:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face28.jpg");
buttons += emoticonButton(":face29:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face29.jpg");
buttons += emoticonButton(":face30:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face30.jpg");
buttons += emoticonButton(":face31:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face31.jpg");
buttons += emoticonButton(":face32:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face32.jpg");
buttons += emoticonButton(":face33:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face33.jpg");
buttons += emoticonButton(":face34:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face34.jpg");
buttons += emoticonButton(":face35:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face35.jpg");
buttons += emoticonButton(":face36:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face36.jpg");
buttons += emoticonButton(":face37:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face37.jpg");
buttons += emoticonButton(":face38:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face38.gif");
buttons += emoticonButton(":face39:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face39.jpg");
buttons += emoticonButton(":face40:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face40.gif");
buttons += emoticonButton(":face41:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face41.jpg");
buttons += emoticonButton(":face42:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face42.jpg");
buttons += emoticonButton(":face43:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face43.gif");
buttons += emoticonButton(":face44:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face44.gif");
buttons += emoticonButton(":face45:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face45.png");
buttons += emoticonButton(":face46:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face46.jpg");
buttons += emoticonButton(":face47:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face47.jpg");
buttons += emoticonButton(":face48:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face48.gif");
buttons += emoticonButton(":face49:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face49.gif");
buttons += emoticonButton(":face50:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face50.gif");
buttons += emoticonButton(":face51:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face51.jpg");
buttons += emoticonButton(":face52:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face52.jpg");
buttons += emoticonButton(":face53:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face53.jpg");
buttons += emoticonButton(":face54:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face54.jpg");
buttons += emoticonButton(":face55:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face55.jpg");
buttons += emoticonButton(":face56:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face56.jpg");
buttons += emoticonButton(":face57:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face57.jpg");
buttons += emoticonButton(":face58:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face58.jpg");
buttons += emoticonButton(":face59:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face59.jpg");
buttons += emoticonButton(":face60:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face60.png");
buttons += emoticonButton(":face61:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face61.jpg");
buttons += emoticonButton(":face62:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face62.jpg");
buttons += emoticonButton(":face63:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face63.png");
buttons += emoticonButton(":face64:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face64.png");
buttons += emoticonButton(":face65:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face65.png");
buttons += emoticonButton(":face66:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face66.png");
buttons += emoticonButton(":face67:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face67.jpg");
buttons += emoticonButton(":face68:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face68.jpg");
buttons += emoticonButton(":face69:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face69.gif");
buttons += emoticonButton(":face70:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face70.jpg");
buttons += emoticonButton(":face71:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face71-1.png");
buttons += emoticonButton(":face72:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face72-1.png");
buttons += emoticonButton(":face73:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face73.jpg");
buttons += emoticonButton(":face74:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face74.png");
buttons += emoticonButton(":face75:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face75.png");
buttons += emoticonButton(":face76:", "http://i805.photobucket.com/albums/yy331/momoirobox/clickable%20smilies/face76.png");


	
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