// ==UserScript==
// @name           Kaztorka_main enhanced II
// @namespace      http://kaztorka.org/index*
// @include        http://kaztorka.org/
// @include        http://kaztorka.org/index*
// @include        http://www.kaztorka.org/
// @include        http://www.kaztorka.org/index*
// ==/UserScript==


xpathstr = "//div[@id='tableTorrent']/table/tbody/tr[*]/td[2]";

var elements = document.evaluate(xpathstr,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 1; i < elements.snapshotLength; i++) 
{
	var sitm = elements.snapshotItem(i);
	var categor=sitm.childNodes[0].text;
	//categor=categor.toLowerCase(); 	
	if (
		//(cuko.childNodes[childItem].nodeType == 1)&

////////////////////////////// ЭТО НАМ НЕ НУЖНО /////////////////////////////////
(
(categor.indexOf("Дизайн")>=0)||
(categor.indexOf("омедия")>=0)||
(categor.indexOf("Hip-Hop")>=0)||
(categor.indexOf("мобильного")>=0)||
(categor.indexOf("Pop (")>=0)||
(categor.indexOf("саморазвитие")>=0)||
(categor.indexOf("утбол")>=0)||
(categor.indexOf("гровое видео")>=0)||
(categor.indexOf("олдаты")>=0)||
(categor.indexOf("editative")>=0)||
(categor.indexOf("Казахстанское кино")>=0)||
(categor.indexOf("За гранью")>=0)||
(categor.indexOf("Религия")>=0)||
(categor.indexOf("Юмористы")>=0)||
(categor.indexOf("о спорте")>=0)||
(categor.indexOf("Drum & Bass")>=0)||
(categor.indexOf("Бои без правил")>=0)||
(categor.indexOf("сериалы")>=0)||
(categor.indexOf("Шансон")>=0)||
(categor.indexOf("Авторская песня")>=0)||
(categor.indexOf("Racing - Гонки")>=0)||
(categor.indexOf("Детектив")>=0)||
(categor.indexOf("КПК")>=0)||
(categor.indexOf("Баскетбол")>=0)||
(categor.indexOf("MMORPG")>=0)||
(categor.indexOf("Naruto")>=0)||
(categor.indexOf("Казахстанская музыка")>=0)||
(categor.indexOf("Общественно-политические")>=0)||
(categor.indexOf("lossless")>=0)||
(categor.indexOf("Спортивные")>=0)||
(categor.indexOf("спортивные")>=0)||
(categor.indexOf("Индийские")>=0)||
(categor.indexOf("Культурно-исторические")>=0)||
(categor.indexOf("авто и мото")>=0)||
(categor.indexOf("Боевик")>=0)||
(categor.indexOf("Здоровье и Спорт")>=0)||
(categor.indexOf("Мелодрама")>=0)||
(categor.indexOf("R&B")>=0)||
(categor.indexOf("Авто/Мото")>=0)||
(categor.indexOf("Отчаянные домохозяйки")>=0)||
(categor.indexOf("Дневники вампира")>=0)||
(categor.indexOf("Визитёры")>=0)||
(categor.indexOf("BBC")>=0)||
(categor.indexOf("Непознанное")>=0)||
(categor.indexOf("Аудиокниги")>=0)||
(categor.indexOf("PS3")>=0)||
(categor.indexOf("Олимпиады")>=0)||
(categor.indexOf("Строительство")>=0)||
(categor.indexOf("Юмористические")>=0)||
(categor.indexOf("PSP")>=0)||
(categor.indexOf("Smallville")>=0)||
(categor.indexOf("рыбалке")>=0)||
(categor.indexOf("Мото")>=0)||
(categor.indexOf("страсти")>=0)||
(categor.indexOf("пацаны")>=0)||
(categor.indexOf("Блудливая")>=0)||
(categor.indexOf("Chuck")>=0)||


(categor.indexOf("овинки кинопроката")>=0)
)
	  )
			   {
			   var trow = sitm.parentNode;
			   trow.parentNode.deleteRow(trow.rowIndex);
			   //i--;	
			   }
			if 

////////////////////////////// ЭТО ИНТЕРЕСНО /////////////////////////////////
(
(categor.indexOf("Аниме")>=0)||
(categor.indexOf("аниме")>=0)||
(categor.indexOf("Онгоинги")>=0)||
(categor.indexOf("Джаз")>=0)||
(categor.indexOf("Программирование")>=0)||


(categor.indexOf("Блюз")>=0)
)
			{
			sitm.childNodes[0].style.fontWeight = 'bold';
			sitm.childNodes[0].style.color = '#FF0000';
			}

}