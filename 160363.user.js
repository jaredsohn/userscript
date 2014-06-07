// ==UserScript==
// @name             GunPic [GW] 
// @namespace        
// @description      Подсветка именных и аренды, картинка оружия рядом с именем.
// @include          http://www.ganjawars.ru/wargroup.php*
// @version          1.0
// @author           sixis
// ==/UserScript==

(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

function load(func) {
    
    var obj = /opera/i.test(navigator.userAgent) ? root.document : root;
        
    if (obj.addEventListener) {
        
        obj.addEventListener('load', func, false);
        
    } else {
        
        if (/Maxthon/i.test(navigator.userAgent)) {
            
            func();
            
        } else {
            
            obj.attachEvent('onload', func);
            
        }
        
    }
    
}

if (root.location.href.indexOf('http://www.ganjawars.ru/wargroup.php') >= 0) {
    
  //  load(function() {
        
        var a = document.getElementsByTagName('a');
        var snip ='L96 A1 Vapensmia 149-F1 CZ 527 Varmint Винтовка M40 Police Rifle Mauser M-86 Remington 700 VTR PSG-1 SSG 550 M-76 СВД OM50 Nemesis SSG 2000 B-94 SSG 3000 Black Falcon FR-F2 M-24 Light Savage 10FP Steyr IWS-2007 Savage 100FP Tikka T3 Tactical CZ 700 M1 Barret M99 BFG-50 Tactical M-600 PGM Mini-Hecate .338 TEI M89-SR Barrett M107 ВССК "Выхлоп" RT-20 Silent Shot Barret XM500 Parker-Hale M-85 Steyr Scout Tactical RPA Rangemaster ';    
        var auto ='Schmeisser MKb42 АК-74 M-16 Enfield L1A1 АКС HK-53 SG 541 XM8 Steyr AUG TRW LMR SIG-550 STG-44 M14 SAR-5.56 CZ SA Vz.58 Винтовка G3 FARA 83 G3-AA Beretta ARX-160 CIS SR-88 FN-FAL M-82 Valmet Винтовка FS2000 FN SCAR Mk.16 Bofors AK-5 Bushmaster M17s HK 417 АН-94 Винтовка F2000 FN FNC HK416 Гроза-1 KA-90 АБ-762 Тайга XCR 5.56 ТКБ-517 AK-103 HK G36 HK G41 OICW 5.56 АКС SG-552 SWAT ';
        var pest ='Ruger BeerCat 22lr Пистолет ТТ Desert Eagle .50 Desert Eagle .50 Gold Пистолет 9мм ПП Узи Calico M960 LF-57 UMP GG-95 M-4 Спектр MAS-38 ПП Каштан Suomi M-1931 Ingram M6 Colt 633 Walther MPL FMK-3 ПП Вихрь S.A.F Steyr Mpi 81 Agram 2000 ПП-19 Бизон ПП Кедр Colt m636 MP-5 Beretta M12 Scorpion Kinetics CPW P-90 ПП-90М1 HK MP-7 TDI Kriss V2 ';
        var puli ='FN-Minimi Lewis MG Type 95 MG Пулемёт FN MAG Брен L4 LSW L-86 M16A2 Heavy Gun Пулемёт MG-3 Rising Sun T62 AR70/84 "Beretta" Печенег M249 SAW пулемет ZB 53 НСВ Type 67 HMG АRM "Галил" SIG MG 710 M-60 Vickers MG Light VZ-59 Heavy Gun HK MG-36 M-61 Volcano AAT m.52 XM-312 Амели HK-21 Wiper РПК ПКМ Colt M16 LMG АА-52 Attaque HK MG-43 ПССГ FN BRG-17 Spitfire ПКМС 7,62 MiniGun 7.62 MG-50 ПК 7,62 АRM "Галил" Ultimax HMG ';    
        var gren ='РПГ Гранатомёт GRG-48 PAW-20 РПГ-У РПГ-16 "Гром" АГС-30 ГМ-94 GL-06 40mm HK GMG ';
        var drob ='Дробовик Hunter Remington 870 Nova Tactical M-37 ТОЗ-194 Jackhammer SPAS 12 Страйкер Сайга Рысь Neostead XM-26 LSS HAWK 97 Benelli M4 Mossberg 590 Вепрь-12 MAG-7 USAS-12 USAS-15 ';
        var spec ='Рогатка SAW Airsoft MG Пейнтбольный маркер Картофелемёт #2 ';
        var rentm ='Heavy Minigun SIG MG-50 ';
        var renta ='Colt M4 Extreme LR-300 5.56 ';
        var rents ='Blaser Light Blaser 93 Blaser Tactical ';
            for (i = 0, l = a.length; i < l; i++) {
                
                var title = a[i].getAttribute('title');
                
                if (title != null) {
                 var tm=title.split('(');
                 tmp=tm[0].split(" [");
                 
                 var character = new RegExp(tmp[0]);
       
                if(tm[0].length<1) {
                //если рука пустаю ничего не меняется
                //если хотите чтоб отображались как пистолеты снимите коментарий со след. строки
                //a[i].innerHTML='<img style="border: none;" src="http://images.ganjawars.ru/i/wargroup/skill_combat_pistols.gif" />'+ a[i].innerHTML;
                 } else if(character.test(snip)) {
                a[i].innerHTML='<img style="border: none;" src="http://images.ganjawars.ru/i/wargroup/skill_combat_snipe.gif" />'+ a[i].innerHTML;
                } else if(character.test(auto)) {                                                                                                                    
                a[i].innerHTML='<img style="border: none;" src="http://images.ganjawars.ru/i/wargroup/skill_combat_auto.gif" />'+ a[i].innerHTML;
                } else if(character.test(pest)) {
                a[i].innerHTML='<img style="border: none;" src="http://images.ganjawars.ru/i/wargroup/skill_combat_pistols.gif" />'+ a[i].innerHTML;
                } else if(character.test(puli)) {
                a[i].innerHTML='<img style="border: none;" src="http://images.ganjawars.ru/i/wargroup/skill_combat_heavy.gif" />'+ a[i].innerHTML;
                } else if(character.test(gren)) {
                a[i].innerHTML='<img style="border: none;" src="http://images.ganjawars.ru/i/wargroup/skill_combat_explosives.gif" />'+ a[i].innerHTML;
                } else if(character.test(drob)) {
                a[i].innerHTML='<img style="border: none;" src="http://images.ganjawars.ru/i/wargroup/skill_combat_sgun.gif" />'+ a[i].innerHTML;
                } else if(character.test(spec)) {
                a[i].innerHTML='<img style="border: none;" src="http://images.ganjawars.ru/i/home/syndicate.gif" />'+ a[i].innerHTML;
                } else if(character.test(rentm)) {
                a[i].innerHTML='<img style="border: none;" src="http://images.ganjawars.ru/i/wargroup/skill_combat_heavy.gif" />'+ a[i].innerHTML;
                a[i].setAttribute('style','color:#FF9900');    
                } else if(character.test(renta)) {
                a[i].innerHTML='<img style="border: none;" src="http://images.ganjawars.ru/i/wargroup/skill_combat_auto.gif" />'+ a[i].innerHTML;
                a[i].setAttribute('style','color:#FF9900');    
                } else if(character.test(rents)) {
                a[i].innerHTML='<img style="border: none;" src="http://images.ganjawars.ru/i/wargroup/skill_combat_snipe.gif" />'+ a[i].innerHTML;
                a[i].setAttribute('style','color:#FF9900');    
                } else {    
                temp=/\d+\)/.exec(title);
                temp=/\d+/.exec(temp);
                if (temp>=15)
                    {
                    a[i].setAttribute('style','color:#CCCC00');
                    }
                }
                
                }
            }
        
  //  });
}

})();