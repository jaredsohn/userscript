// ==UserScript==
// @name             GunPic [GW] 
// @namespace        
// @description      Подсветка именных и аренды, картинка оружия рядом с ником. 41+ арт другим цветом.
// @include          http://www.ganjawars.ru/wargroup.php*
// @version          2.01
// @author           sixis (редакция sp3ctr3)
// ==/UserScript==

(function() {
    var a = document.getElementsByTagName('a');

    var sim = '<img style="border: none;" src="data:image/gif;base64,R0lGODlhFAAOAIABAABEAP///yH5BAEAAAEALAAAAAAUAA4AAAIgjI+py+0NopRvzneA0dD6fwUg h3xbxJDoSWKsC8eyUwAAOw==" />';
    var dim = '<img style="border: none;" src="data:image/gif;base64,R0lGODlhFAAOAIABAABEAP///yH5BAEAAAEALAAAAAAUAA4AAAIcjI+py+0PYwS02gsC3vVYbWTa5VElZErqyrZsAQA7" />';
    var gim = '<img style="border: none;" src="data:image/gif;base64,R0lGODlhFAAOAIABAABEAP///yH5BAEAAAEALAAAAAAUAA4AAAIcjI+pywxtnpKNgouz3tDtD4Zih3VJaZ7pyrZQAQA7" />';
    var pim = '<img style="border: none;" src="data:image/gif;base64,R0lGODlhDAAKAIABAABEAP///yH5BAEAAAEALAAAAAAMAAoAAAIVjI8Iyx2bDjCtTjifuizxSHXgSIIFADs=" />';
    var aim = '<img style="border: none;" src="data:image/gif;base64,R0lGODlhFAAOAIABAABEAP///yH5BAEAAAEALAAAAAAUAA4AAAIejI+py+0PYwIH2Iuz3pwaW1EYNAagc4YSkq7tCkcFADs=" />';
    var mim = '<img style="border: none;" src="data:image/gif;base64,R0lGODlhFAAOAIABAABEAP///yH5BAEAAAEALAAAAAAUAA4AAAIljI+py+0OXgzTVDaB3rxv64Xi6B0aSC1X9inRZUHpg1SwHNNNAQA7" />';
    var swi = '<img style="border: none;" src="data:image/gif;base64,R0lGODlhDAAKAJECANDu0ABEAP///wAAACH5BAEAAAIALAAAAAAMAAoAAAIXlH+BaeHbnIJC0lrnUlM3TAWAt5EXVQAAOw==" />';

    var mach = ['FN-Minimi','Lewis MG','Type 95 MG','Пулемёт FN MAG','Брен L4','LSW L-86','M16A2 Heavy Gun','Пулемёт MG-3','Rising Sun T62','AR70/84 "Beretta"','Печенег','M249 SAW','пулемет ZB 53','НСВ','Type 67 HMG','АRM "Галил"','SIG MG 710','M-60','Vickers MG Light','VZ-59 Heavy Gun','HK MG-36','M-61 Volcano','AAT m.52','XM-312','Амели','HK-21 Wiper','РПК','ПКМ','Colt M16 LMG','АА-52 Attaque','HK MG-43','ПССГ','FN BRG-17 Spitfire','ПКМС 7,62','MiniGun 7.62','MG-50','ПК 7,62','АRM "Галил"','MG-45 Sturm'];
    var snip = ['L96 A1','Vapensmia 149-F1','CZ 527 Varmint','Винтовка M40','Police Rifle','Mauser M-86','Remington 700 VTR','PSG-1','SSG 550','M-76','СВД','OM50 Nemesis','SSG 2000','B-94','SSG 3000 Black','Falcon','FR-F2','M-24 Light','Savage 10FP','Steyr IWS-2007','Savage 100FP','Tikka T3 Tactical','CZ 700 M1','Barret M99','BFG-50','Tactical M-600','PGM Mini-Hecate .338','TEI M89-SR','Barrett M107','ВССК "Выхлоп"','RT-20 Silent Shot','Barret XM500','Parker-Hale M-85','Steyr Scout Tactical','Bora JNG-90'];
    var auto = ['Schmeisser MKb42','АК-74','M-16','Enfield L1A1','АКС','HK-53','SG 541','XM8','Steyr AUG','TRW LMR','SIG-550','STG-44','M14','SAR-5.56','CZ SA Vz.58','Винтовка G3','FARA 83','G3-AA','Beretta ARX-160','CIS SR-88','FN-FAL','M-82 Valmet','Винтовка FS2000','FN SCAR Mk.16','Bofors AK-5','Bushmaster M17s','HK 417','АН-94','Винтовка F2000','FN FNC','HK416','Гроза-1','KA-90','АБ-762 Тайга','XCR 5.56','ТКБ-517','AK-103','HK G36','HK G41','OICW 5.56','АКС','Vektor R4'];
    var pest = ['Ruger BeerCat 22lr','Пистолет ТТ','Desert Eagle .50','Desert Eagle .50 Gold','Пистолет 9мм','ПП Узи','Calico M960','LF-57','UMP','GG-95','M-4 Спектр','MAS-38','ПП Каштан','Suomi M-1931','Ingram M6','Colt 633','Walther MPL','FMK-3','ПП Вихрь','S.A.F','Steyr Mpi 81','Agram 2000','ПП-19 Бизон','ПП Кедр','Colt m636','MP-5','Beretta M12','Scorpion','Kinetics CPW','P-90','ПП-90М1','HK MP-7','TDI Kriss V2','Scorpion EVO'];
    var gren = ['РПГ','Гранатомёт','GRG-48','PAW-20','РПГ-У','РПГ-16 "Гром"','АГС-30','ГМ-94','GL-06 40mm','HK GMG'];
    var drob = ['Дробовик Hunter','Remington 870','Nova Tactical','M-37','ТОЗ-194','Jackhammer','SPAS 12','Страйкер','Сайга','Рысь','Neostead','XM-26 LSS','HAWK 97','Benelli M4','Mossberg 590','Вепрь-12','MAG-7','USAS-12','Liberator mk3','USAS-15'];
 
    var spec = ['Рогатка','SAW Airsoft MG','Пейнтбольный маркер','Картофелемёт #2'];
    
    var rntm = ['Heavy Minigun','SIG MG-50'];
    var rnta = ['Colt M4 Extreme','LR-300 5.56'];
    var rnts = ['Blaser Light','Blaser 93','Blaser Tactical'];
	
	var newm = ['Ultimax HMG'];
    var newa = ['SG-552 SWAT'];
    var news = ['RPA Rangemaster'];
	var newp = ['MTAR-21'];
    
        for(var i=0;i<a.length;i++){
            var title = a[i].getAttribute('title');
            if (title){
                var tm = title.split(" (");
                var tmp= tm[0].split(" [")[0];
                     if (~snip.indexOf(tmp)) a[i].innerHTML = sim + a[i].innerHTML; 
                else if (~drob.indexOf(tmp)) a[i].innerHTML = dim + a[i].innerHTML; 
                else if (~gren.indexOf(tmp)) a[i].innerHTML = gim + a[i].innerHTML; 
                else if (~pest.indexOf(tmp)) a[i].innerHTML = pim + a[i].innerHTML; 
                else if (~mach.indexOf(tmp)) a[i].innerHTML = mim + a[i].innerHTML; 
                else if (~auto.indexOf(tmp)) a[i].innerHTML = aim + a[i].innerHTML; 
                else if (~spec.indexOf(tmp)) a[i].innerHTML = swi + a[i].innerHTML;
                else if (~rnts.indexOf(tmp)){a[i].innerHTML = sim + a[i].innerHTML; a[i].setAttribute('style','color:#FF9900');}
                else if (~rnta.indexOf(tmp)){a[i].innerHTML = aim + a[i].innerHTML; a[i].setAttribute('style','color:#FF9900');}
                else if (~rntm.indexOf(tmp)){a[i].innerHTML = mim + a[i].innerHTML; a[i].setAttribute('style','color:#FF9900');}
				else if (~news.indexOf(tmp)){a[i].innerHTML = sim + a[i].innerHTML; a[i].setAttribute('style','color:#34c924');}
				else if (~newa.indexOf(tmp)){a[i].innerHTML = aim + a[i].innerHTML; a[i].setAttribute('style','color:#34c924');}
                else if (~newm.indexOf(tmp)){a[i].innerHTML = mim + a[i].innerHTML; a[i].setAttribute('style','color:#34c924');}
				else if (~newp.indexOf(tmp)){a[i].innerHTML = pim + a[i].innerHTML; a[i].setAttribute('style','color:#34c924');}
				else {
					var x = /(\d+)\)/.exec(tm[1]);
					if (x && x[1]>15)
						a[i].setAttribute('style','color:#CCCC00');
				}
            }
        }
})();