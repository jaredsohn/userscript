// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "";
  
        buttons += emoticonButton("bibi1", "http://img101.imageshack.us/img101/4720/bibi1004001.jpg");
        buttons += emoticonButton("bibi2", "http://img718.imageshack.us/img718/9105/bibi1004002.jpg");
        buttons += emoticonButton("bibi3", "http://img696.imageshack.us/img696/3778/bibi1004003.jpg");
        buttons += emoticonButton("bibi4", "http://img13.imageshack.us/img13/1677/bibi1004004.jpg");
        buttons += emoticonButton("bibi5", "http://img718.imageshack.us/img718/1216/bibi1004005.jpg");
        buttons += emoticonButton("bibi6", "http://img44.imageshack.us/img44/7176/bibi1004006.jpg");
        buttons += emoticonButton("bibi7", "http://img707.imageshack.us/img707/6029/bibi1004007.jpg");
        buttons += emoticonButton("bibi8", "http://img69.imageshack.us/img69/3306/bibi1004008.jpg");
        buttons += emoticonButton("bibi9", "http://img291.imageshack.us/img291/6586/bibi1004009.jpg");
        buttons += emoticonButton("bibi10", "http://img691.imageshack.us/img691/7148/bibi1004010.jpg");
        buttons += emoticonButton("bibi11", "http://img101.imageshack.us/img101/4748/bibi1004011.jpg");
        buttons += emoticonButton("bibi12", "http://img692.imageshack.us/img692/5749/bibi1004012.jpg");
        buttons += emoticonButton("bibi13", "http://img28.imageshack.us/img28/9082/bibi1004013.jpg");
        buttons += emoticonButton("bibi14", "http://img171.imageshack.us/img171/8052/bibi1004014.jpg");
        buttons += emoticonButton("bibi15", "http://img101.imageshack.us/img101/5663/bibi1004015.jpg");
        buttons += emoticonButton("bibi16", "http://img139.imageshack.us/img139/4540/bibi1004016.jpg");
        buttons += emoticonButton("bibi17", "http://img62.imageshack.us/img62/3629/bibi1004017.jpg");
        buttons += emoticonButton("bibi18", "http://img9.imageshack.us/img9/5847/bibi1004018.jpg");
        buttons += emoticonButton("bibi19", "http://img11.imageshack.us/img11/2664/bibi1004019o.jpg");
        buttons += emoticonButton("bibi20", "http://img696.imageshack.us/img696/3158/bibi1004020.jpg");
        buttons += emoticonButton("bibi22", "http://img534.imageshack.us/img534/8345/bibi1004022.jpg");
        buttons += emoticonButton("bibi23", "http://img682.imageshack.us/img682/9795/bibi1004023.jpg");
        buttons += emoticonButton("bibi24", "http://img706.imageshack.us/img706/2796/bibi1004024.jpg");
        buttons += emoticonButton("face2", "http://img641.imageshack.us/img641/613/2yxfbsj.jpg");
        buttons += emoticonButton("face3", "http://img693.imageshack.us/img693/9792/28i0so8.jpg");
        buttons += emoticonButton("face4", "http://img294.imageshack.us/img294/4596/28mpmhs.jpg");
        buttons += emoticonButton("face5", "http://img517.imageshack.us/img517/280/91932285.jpg");
        buttons += emoticonButton("face7", "http://img695.imageshack.us/img695/5575/151fq.jpg");
        buttons += emoticonButton("face8", "http://img69.imageshack.us/img69/422/191w.jpg");
        buttons += emoticonButton("face9", "http://img31.imageshack.us/img31/3214/221wj.jpg");
        buttons += emoticonButton("face10", "http://img694.imageshack.us/img694/3678/271po.jpg");
        buttons += emoticonButton("face40", "http://img607.imageshack.us/img607/6526/124u.gif");
        buttons += emoticonButton("face41", "http://img411.imageshack.us/img411/7225/123ky.gif"); 
        buttons += emoticonButton("face42", "http://img27.imageshack.us/img27/7944/018ts.gif");
        buttons += emoticonButton("face17", "http://img203.imageshack.us/img203/6205/531i.jpg");
        buttons += emoticonButton("face18", "http://img716.imageshack.us/img716/9200/561p.jpg");
        buttons += emoticonButton("face19", "http://img175.imageshack.us/img175/2863/581r.jpg");
        buttons += emoticonButton("face20", "http://img688.imageshack.us/img688/1009/611j.jpg");
        buttons += emoticonButton("face21", "http://img169.imageshack.us/img169/9110/631d.jpg");
        buttons += emoticonButton("face22", "http://img85.imageshack.us/img85/8011/751z.jpg");
        buttons += emoticonButton("face23", "http://img169.imageshack.us/img169/7128/781z.jpg");
        buttons += emoticonButton("face24", "http://img412.imageshack.us/img412/2896/4211.jpg");
        buttons += emoticonButton("face25", "http://img268.imageshack.us/img268/2575/1218127127.jpg");
        buttons += emoticonButton("face26", "http://img718.imageshack.us/img718/1969/1218127141.jpg");
        buttons += emoticonButton("face27", "http://img718.imageshack.us/img718/2793/aw7vwy.jpg");
        buttons += emoticonButton("face29", "http://img171.imageshack.us/img171/7041/oax9b7jpg.png");
        buttons += emoticonButton("face30", "http://img28.imageshack.us/img28/1010/ooh.png");
        buttons += emoticonButton("face31", "http://img159.imageshack.us/img159/2809/wtf.gif");
        buttons += emoticonButton("face32", "http://img203.imageshack.us/img203/8019/yummie.gif");
        buttons += emoticonButton("face33", "http://img51.imageshack.us/img51/219/oohs.jpg");
        buttons += emoticonButton("face34", "http://img243.imageshack.us/img243/9652/heeheehee.jpg");
        buttons += emoticonButton("face35", "http://img41.imageshack.us/img41/2647/nosebleedo.jpg");
        buttons += emoticonButton("face36", "http://img130.imageshack.us/img130/273/shygry.jpg");
        buttons += emoticonButton("face37", "http://img837.imageshack.us/img837/4103/kisswz.jpg");
        buttons += emoticonButton("face6", "http://img28.imageshack.us/img28/1672/131k.gif");
        buttons += emoticonButton("face1", "http://img697.imageshack.us/img697/2774/2rxh98y.jpg");
        buttons += emoticonButton("mousse", "http://img574.imageshack.us/img574/867/esearch.gif");
        buttons += emoticonButton("face11", "http://img535.imageshack.us/img535/3531/371f.jpg");
        buttons += emoticonButton("face12", "http://img532.imageshack.us/img532/3087/391c.jpg");
        buttons += emoticonButton("face13", "http://img696.imageshack.us/img696/6596/411aa.jpg");
        buttons += emoticonButton("face14", "http://img708.imageshack.us/img708/4636/copyofeew.jpg");
        buttons += emoticonButton("face15", "http://img707.imageshack.us/img707/462/501sm.jpg");
        buttons += emoticonButton("face16", "http://img199.imageshack.us/img199/8922/511hm.jpg");
        buttons += emoticonButton("colores", "http://img691.imageshack.us/img691/559/128m.gif");
        buttons += emoticonButton("igual", "http://img687.imageshack.us/img687/5458/133n.gif");
        buttons += emoticonButton("erizo", "http://img687.imageshack.us/img687/3526/134t.gif");
        buttons += emoticonButton("planta2", "http://img251.imageshack.us/img251/4136/135k.gif");
        buttons += emoticonButton("vena", "http://img822.imageshack.us/img822/3615/eek.png");
        buttons += emoticonButton("kekeke", "http://img130.imageshack.us/img130/7984/96f88g.jpg");
        buttons += emoticonButton("heart2", "http://img181.imageshack.us/img181/8315/2r77w41.jpg");
	buttons += emoticonButton("exclamation", "http://img35.imageshack.us/img35/9545/119az.gif");
	buttons += emoticonButton("heart", "http://img11.imageshack.us/img11/9312/067x.gif");
	buttons += emoticonButton("down", "http://img121.imageshack.us/img121/1059/122m.gif");
	buttons += emoticonButton("gotas", "http://img718.imageshack.us/img718/614/019c.gif");
	buttons += emoticonButton("puff", "http://img694.imageshack.us/img694/6923/020es.gif");
	buttons += emoticonButton("circulo", "http://img191.imageshack.us/img191/4929/021e.gif");
	buttons += emoticonButton("equis", "http://img411.imageshack.us/img411/5907/022k.gif");
	buttons += emoticonButton("idea", "http://img519.imageshack.us/img519/6386/023o.gif");
	buttons += emoticonButton("cel", "http://img716.imageshack.us/img716/9755/024.gif");
	buttons += emoticonButton("ok", "http://img121.imageshack.us/img121/41/025c.gif");
	buttons += emoticonButton("sol", "http://img235.imageshack.us/img235/6639/026x.gif");
	buttons += emoticonButton("flash", "http://img62.imageshack.us/img62/6858/029e.gif");
	buttons += emoticonButton("prohibido", "http://img86.imageshack.us/img86/9521/030.gif");
	buttons += emoticonButton("fruta", "http://img716.imageshack.us/img716/9136/033.gif");
	buttons += emoticonButton("frutilla", "http://img717.imageshack.us/img717/515/034.gif");
	buttons += emoticonButton("cereza", "http://img138.imageshack.us/img138/9059/035m.gif");
	buttons += emoticonButton("hongo", "http://img683.imageshack.us/img683/250/036j.gif");
        buttons += emoticonButton("te", "http://img46.imageshack.us/img46/2595/037i.gif");
        buttons += emoticonButton("tetera", "http://img214.imageshack.us/img214/4770/038w.gif");
        buttons += emoticonButton("manzana", "http://img534.imageshack.us/img534/8489/041.gif");
        buttons += emoticonButton("porcion", "http://img192.imageshack.us/img192/2707/043ez.gif");
        buttons += emoticonButton("torta", "http://img689.imageshack.us/img689/6752/044b.gif");
        buttons += emoticonButton("cubiertos", "http://img693.imageshack.us/img693/7710/045m.gif");
        buttons += emoticonButton("cacerola", "http://img519.imageshack.us/img519/4342/046j.gif");
        buttons += emoticonButton("lapiz", "http://img697.imageshack.us/img697/857/047l.gif");
        buttons += emoticonButton("corona", "http://img716.imageshack.us/img716/1583/048.gif");
        buttons += emoticonButton("skull", "http://img175.imageshack.us/img175/9288/049.gif");
        buttons += emoticonButton("auto", "http://img697.imageshack.us/img697/7999/050i.gif");
        buttons += emoticonButton("camara", "http://img695.imageshack.us/img695/6919/051s.gif");
        buttons += emoticonButton("poop", "http://img707.imageshack.us/img707/5538/052b.gif");
        buttons += emoticonButton("casa", "http://img600.imageshack.us/img600/2985/053.gif");
        buttons += emoticonButton("mail", "http://img532.imageshack.us/img532/6285/054b.gif");
        buttons += emoticonButton("ropa", "http://img341.imageshack.us/img341/123/055l.gif");
        buttons += emoticonButton("arbol", "http://img828.imageshack.us/img828/7871/056l.gif");
        buttons += emoticonButton("planta", "http://img717.imageshack.us/img717/8481/057.gif");
        buttons += emoticonButton("flor", "http://img638.imageshack.us/img638/4207/060.gif");
        buttons += emoticonButton("insecto", "http://img291.imageshack.us/img291/8554/061w.gif");
        buttons += emoticonButton("mariposa", "http://img62.imageshack.us/img62/9700/062e.gif");
        buttons += emoticonButton("star", "http://img85.imageshack.us/img85/2843/063l.gif");
        buttons += emoticonButton("paraguas", "http://img9.imageshack.us/img9/6558/064j.gif");
        buttons += emoticonButton("flecha", "http://img641.imageshack.us/img641/3501/065.gif");
        buttons += emoticonButton("flecha2", "http://img641.imageshack.us/img641/2681/066.gif");
        buttons += emoticonButton("panda", "http://img291.imageshack.us/img291/4118/069.gif");
        buttons += emoticonButton("abeja", "http://img695.imageshack.us/img695/686/070x.gif");
        buttons += emoticonButton("pato", "http://img69.imageshack.us/img69/9426/071m.gif");
        buttons += emoticonButton("conejo", "http://img696.imageshack.us/img696/6372/072.gif");
        buttons += emoticonButton("musica", "http://img412.imageshack.us/img412/8480/074y.gif");
        buttons += emoticonButton("musica2", "http://img101.imageshack.us/img101/5140/075t.gif");
        buttons += emoticonButton("rana", "http://img130.imageshack.us/img130/3972/077.gif");
        buttons += emoticonButton("huella", "http://img697.imageshack.us/img697/4103/079.gif");
        buttons += emoticonButton("reloj", "http://img59.imageshack.us/img59/7306/080z.gif");
        buttons += emoticonButton("nube", "http://img25.imageshack.us/img25/2017/085ml.gif");
        buttons += emoticonButton("arcoiris", "http://img15.imageshack.us/img15/641/086a.gif");
        buttons += emoticonButton("nube2", "http://img692.imageshack.us/img692/6731/087r.gif");
        buttons += emoticonButton("moño", "http://img96.imageshack.us/img96/3928/088b.gif");
        buttons += emoticonButton("gusano", "http://img35.imageshack.us/img35/6775/089h.gif");
        buttons += emoticonButton("libro", "http://img97.imageshack.us/img97/2083/090c.gif");
        buttons += emoticonButton("gato", "http://img171.imageshack.us/img171/4376/091u.gif");
        buttons += emoticonButton("perro", "http://img341.imageshack.us/img341/9360/092n.gif");
        buttons += emoticonButton("nena", "http://img85.imageshack.us/img85/5067/094.gif");
        buttons += emoticonButton("nena2", "http://img704.imageshack.us/img704/9609/095w.gif");
        buttons += emoticonButton("nene", "http://img697.imageshack.us/img697/1047/096a.gif");
        buttons += emoticonButton("nene2", "http://img268.imageshack.us/img268/7086/097i.gif");
        buttons += emoticonButton("hot", "http://img651.imageshack.us/img651/2717/098.gif");
        buttons += emoticonButton("click", "http://img412.imageshack.us/img412/3779/099.gif");
        buttons += emoticonButton("flor", "http://img11.imageshack.us/img11/6393/101b.gif");
        buttons += emoticonButton("tren", "http://img684.imageshack.us/img684/3593/102g.gif");
        buttons += emoticonButton("fantasma", "http://img718.imageshack.us/img718/5289/104j.gif");
        buttons += emoticonButton("santa", "http://img42.imageshack.us/img42/9571/107ff.gif");
        buttons += emoticonButton("regalo", "http://img707.imageshack.us/img707/3601/108o.gif");
        buttons += emoticonButton("media", "http://img718.imageshack.us/img718/7619/109b.gif");
        buttons += emoticonButton("cristalnieve", "http://img684.imageshack.us/img684/8375/111aj.gif");
        buttons += emoticonButton("mano", "http://img341.imageshack.us/img341/6808/116q.gif");
        buttons += emoticonButton("enojo", "http://img696.imageshack.us/img696/3461/118t.gif");
        buttons += emoticonButton("pregunta", "http://img714.imageshack.us/img714/3831/120zn.gif");
        buttons += emoticonButton("avion", "http://img96.imageshack.us/img96/7909/121xl.gif");
        buttons += emoticonButton("perro2", "http://img199.imageshack.us/img199/6940/127uq.gif");
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"auto\\\" height=\\\"auto\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);