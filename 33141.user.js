// ==UserScript==
// @name            السيرفر الفرنسي beta
// @namespace      translated ترجمة السيرفر الفرنسي
// @include        http://*.travian.fr/*
// ==/UserScript==

var loc=window.location.href; // the current page href
var keys, str;
var lang_from = new Array();
var lang_hu = new Array();
var lang = loc.match(/travian(\.[a-zA-Z]{2,3})+/ );

//alert('fos');

if(!lang) {
  lang = loc.match(/travian3(\.[a-zA-Z]{2,3})+/ ).pop(); 
} else {
  lang=loc.match(/travian(\.[a-zA-Z]{2,3})+/ ).pop();
}

switch(lang){
case '.fr':
lang_from[1] = 'Prétoriens';
lang_from[2] = 'Bûcherons';
lang_from[3] = 'Mine de fer';
lang_from[4] = 'Carrière de terre';
lang_from[5] = 'Production au';
lang_from[6] = 'Production actuelle';
lang_from[7] = 'حقل القمح حقل القمح';
lang_from[8] = 'Production';
lang_from[9] = 'Prétoriens';
lang_from[10] = 'Prétoriens';
lang_from[11] = 'Bois';
lang_from[12] = 'Terre';
lang_from[13] = 'Fer';
lang_from[14] = 'Céréales';
lang_from[15] = 'par heure';
lang_from[16] = 'KAKA_22';
lang_from[17] = 'attaque';
lang_from[18] = 'espionne';
lang_from[19] = 'livre';
lang_from[20] = 'Tous';
lang_from[21] = 'Commerce';
lang_from[22] = 'Assistance';
lang_from[23] = 'Attaques';
lang_from[24] = 'Divers';
lang_from[25] = 'Rapports';
lang_from[26] = 'niveau';
lang_from[27] = 'production actuelle';
lang_from[28] = 'Production au';
lang_from[29] = 'Bâtiment Principal';
lang_from[30] = 'Augmenter au';
lang_from[31] = 'Attaque';
lang_from[33] = 'accueil';
lang_from[32] = 'page accueil';
lang_from[33] = 'Mode';
lang_from[34] = 'emploi';
lang_from[35] = 'Profil';
lang_from[36] = 'Profil du joueur';
lang_from[37] = 'Vue globale';
lang_from[38] = 'Equites Legati';
lang_from[39] = 'Equites Imperatoris';
lang_from[40] = 'Déconnexion';
lang_from[41] = 'Forum';
lang_from[42] = 'Chat';
lang_from[43] = 'Travian Plus';
lang_from[44] = 'Support';
lang_from[45] = 'الدليل d السريع';
lang_from[46] = 'Page d';
lang_from[47] = 'accueil';
lang_from[49] = 'Mode d';
lang_from[48] = 'emploi';
lang_from[50] = 'Les arbres sont coupés par des bûcherons pour récupérer le bois. Plus ';
lang_from[51] = 'vous développez le المستوى, plus vous produirez de bois.';
lang_from[52] = 'La terre est extraite ici. Plus la carrière est développée, plus vous disposerez de terre pour construire des bâtiments ou produire des unités.';
lang_from[53] = 'par';
lang_from[54] = 'Coûts';
lang_from[55] = 'au';
lang_from[56] = 'pour passer';
lang_from[57] = 'Mouvements de troupes';
lang_from[58] = 'إلىcune';
lang_from[59] = 'Troupes';
lang_from[60] = 'heure';
lang_from[61] = 'fini';
lang_from[62] = 'Place de rassemblement';
lang_from[63] = 'Envoyer des troupes';
lang_from[64] = 'Envoi';
lang_from[65] = 'Simulateur de combat';
lang_from[66] = 'de troupes';
lang_from[67] = 'Normal';
lang_from[68] = 'pillage';
lang_from[69] = 'Bûcheron';
lang_from[70] = 'Les ouvriers sont déjà إلى travail';
lang_from[71] = 'Résidence';
lang_from[72] = '';
lang_from[73] = 'Mouvements de troupes';
lang_from[74] = 'Mouvements de troupes';
lang_from[75] = 'Mouvements de troupes';
lang_from[76] = 'Mouvements de troupes';
lang_from[77] = 'Mouvements de troupes';
lang_from[78] = 'Mouvements de troupes';
lang_from[79] = 'Mouvements de troupes';

break;
}
lang_hu[1] = 'حراس الأمبراطور';
lang_hu[2] = 'الــحطاب';
lang_hu[3] = 'مـنجم الحديد';
lang_hu[4] = 'حـفرة الطين';
lang_hu[5] = 'الإنـتاج الحالي';
lang_hu[6] = 'الإنـتاج في';
lang_hu[7] = 'حقل القمح';
lang_hu[8] = 'الإنــتاج للمواد الخام';
lang_hu[9] = 'حراس الأمبراطور';
lang_hu[10] = 'حراس الأمبراطور';
lang_hu[11] = 'الــخشب';
lang_hu[12] = 'الـــطين';
lang_hu[13] = 'الـحديد';
lang_hu[14] = 'الــقمح';
lang_hu[15] = 'في الساعة';
lang_hu[16] = 'سـعودي وأفتخر';
lang_hu[17] = 'يـهجم على';
lang_hu[18] = 'يـتجسس على';
lang_hu[19] = 'يـمون';
lang_hu[20] = 'الـكل';
lang_hu[21] = 'الـتجارة';
lang_hu[22] = 'تـعزيزات';
lang_hu[23] = 'الـهجـمات';
lang_hu[24] = 'تــقارير';
lang_hu[25] = 'تــقارير';
lang_hu[26] = 'المستوى';

lang_hu[27] = 'الإنتاج الحالي';
lang_hu[28] = 'الإنتاج في';
lang_hu[29] = 'المبنى الرئيسي';
lang_hu[30] = 'الإرتقاء إلى';
lang_hu[31] = 'هـجوم';




lang_hu[32] = 'الصفحة الرئيسية';
lang_hu[33] = 'الدليل';
lang_hu[34] = 'السريع';
lang_hu[35] = 'بطاقة العضوية';
lang_hu[36] = 'عضوية الاعب';
lang_hu[37] = 'نظرة عامه';
lang_hu[38] = 'فرقة تجسس';
lang_hu[39] = 'سلاح الفرسان';
lang_hu[40] = 'خروج';
lang_hu[41] = 'المنتدى';
lang_hu[42] = 'المحادثة';
lang_hu[43] = 'ترافيان بلاس';
lang_hu[44] = 'الدعــم';
lang_hu[45] = 'الدليل السريع';
lang_hu[46] = 'الصفحة';
lang_hu[47] = 'الرئيسية';
lang_hu[48] = 'السريع';
lang_hu[49] = 'الدليل';
lang_hu[50] = 'الحطاب يقوم بقطع الأشجار لإنتاج الخشب. كلما تم تطوير الحطاب كلما ازداد';
lang_hu[51] = 'أنتاجه من الخشب';
lang_hu[52] = 'تكلفة الإرتقاء إلى ';
lang_hu[52] = 'الطين يستخرج من حفرة الطين. كلما تم تطوير حفرة الطين كلما إزداد إنتاج الطين. ';
lang_hu[53] = 'في';
lang_hu[54] = 'تكلفة';
lang_hu[55] = 'إلى';
lang_hu[56] = 'الإرتقاء';
lang_hu[57] = 'تحركات القوات';
lang_hu[58] = 'لا شيء';
lang_hu[59] = 'الوحدات';
lang_hu[60] = 'الساعة';
lang_hu[61] = 'ينتهي في';
lang_hu[62] = 'نقطة التجمع';
lang_hu[63] = 'إرسال قوات';
lang_hu[64] = 'إرسال';
lang_hu[65] = 'محاكي المعركة';
lang_hu[66] = 'قوات';
lang_hu[67] = 'هجوم كامل';
lang_hu[68] = 'هجوم للنهب';
lang_hu[69] = 'الحطاب';
lang_hu[70] = 'العمال مشغولون الآن';
lang_hu[71] = 'السكن';
lang_hu[72] = '';
lang_hu[73] = 'تحركات القوات';
lang_hu[74] = 'تحركات القوات';
lang_hu[75] = 'تحركات القوات';
lang_hu[76] = 'تحركات القوات';
lang_hu[77] = 'تحركات القوات';
lang_hu[78] = 'تحركات القوات';


//lang_


var textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var titlenodes = document.evaluate(
    "//area[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    str = node.data;



    for (keys in lang_from) {
			  if (str == lang_from[keys]){
          str = str.replace(lang_from[keys],lang_hu[keys]);
        }
    }    
    node.data = str;
}

for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    str = node.data;
    for (keys in lang_from) {
          str = str.replace(lang_from[keys],lang_hu[keys]);
    }    
    node.data = str;
}


for (var i = 0; i < titlenodes.snapshotLength; i++) {
    node = titlenodes.snapshotItem(i);
    str = node.getAttribute("title");
    //alert(str);
    for (keys in lang_from) {
        if (str == lang_from[keys]){
          str = str.replace(lang_from[keys],lang_hu[keys]);
        }  
    }    
    node.setAttribute("title",str);
}

for (var i = 0; i < titlenodes.snapshotLength; i++) {

    node = titlenodes.snapshotItem(i);
    str = node.getAttribute("title");
    //alert(str);
    for (keys in lang_from) {
          str = str.replace(lang_from[keys],lang_hu[keys]);
    }    
    node.setAttribute("title",str);
}


var links = [
    ['تحديث سكربت مترجم ترافيان'    , 'http://userscripts.org/scripts/source/33141.user.js'],
    ['للاقتراح'    , 'http://userscripts.org/scripts/show/33141'],
];

//Code
var menu = document.getElementById('lright1');
if(menu == null) { //Just one village
  menu = document.createElement('div');
  menu.setAttribute('id','lright1');
  document.getElementById('lmidall').appendChild(menu);
}
menu.appendChild(document.createElement('br'));

var elemB, elemUL, elemLI, elemA;

/* Links Menu */
elemB  = document.createElement('b');
elemB.appendChild(document.createTextNode('JOKER تعريب'));
menu.appendChild(elemB)

elemUL = document.createElement('ul');
elemUL.setAttribute('class','dl');
menu.appendChild(elemUL)

for each ( var link in links ){
    elemLI = document.createElement('li');
    elemLI.setAttribute('class','dl');

    elemA = document.createElement('a');
    elemA.href = link[1];
    elemA.appendChild(document.createTextNode(link[0]));

    elemLI.appendChild(elemA);
    elemUL.appendChild(elemLI);
}