// ==UserScript==
// @name barbars.ru bot v 0.06
// @namespace http://doromones.clan.su/
// @author doromones doromones@gmail.com
// @version 0.06
// @source http://doromones.clan.su/
// @description this a small bot
// @include http://br.spaces.ru/*
// @include http://*barbars.ru/*
// @exclude http://*waplog.net.ru/*
// ==/UserScript==


var SetStorona=true //true - северяне false - южане
var SetMantikora=false;
var SetPochinka=false; // чинить вещи (не работает)
var SetAltar=false; // не работает
var SetAltarZaJelezo=true; // тоже не работает
var SetAltarZaSerebro=false; // и ето тоже не работает
var SetUvorot=true; // использовать уворот
var setUvorotHPlvl=1300; // уровень жизни для уворота
var otklonyat=true; //отклонять приглашения в другие кланы? если не хотите отклонять вместо true поставьте false
var scrivat=false;	//если вы не хотите автоматически скрывать гильд-нотайсы, вместо true поставьте false
var razbirat=true;	// если вы не хотите автоматически разбирать весчи(надевать лучшие весчи), вместо true поставьте false
var SetBerserk=true;// если вы не хотите использовать умение берсерк, вместо true поставьте false
var SetDrinkButtleHP=false;// пить бутылку
var SetDrinkHPlvl=666; // уровень здоровья для использования бутылки
var SetKritomania=true;//использовать критоманию
var SetKammenniyShit=true; //использовать каменный щит
var setKamShitHPlvl=666; //уровень здоровья для использования каменного щита
var SetTimeReset=true;
var time_ResetLocation=70; // промежуток времени через который бот сам выйдет на башни
var CoolDownTime=Math.random()*(10000 - 4000)+4000; //время между ударами/кастами
var SetPolySrajeniy=true; // ходить на поля сражений
var CoolDownTimeInEvents=Math.random()*(5000 - 4000)+4000; //время между ударами/кастами на полях сражений
var timeOfPolyaSrajeniy=30; // время похода на поля сражений (не работает)
var searchPointTime=Math.random()*(2000 - 800)+800;	//время между переходами по локации
var resurectionTower=5;		// 0 - Курган
							// 1 - Лагерь викингов/лагерь орды
							// 2 - Дельта реки/устье реки
							// 3 - Ледник/горное озеро
							// 4 - Северная пустошь/южная пустошь
							// 5 - Розенгард/марроканд
							// 6 - Город мертвых
							// 7 - арена

var kritHP=444	// критический уровень жизней для осуществления "бегства" с локации,
				// если стоит 0 то бегство с локации не работает 
var SetAttackTower=true; //атаковать башни, true - атаковать, false - не атаковать
var SetHealSouznik=false; // лечить союзников, true -  лечить, false - не  лечить

}
var Barbars_Page='barbars.ru';
							
///////// переменные
{
	temp_date = new Date();
	hours=temp_date.getHours();
	minutes=temp_date.getMinutes();
	
  {
  var altarZAjelezo='';
  var altarZAserebro='';
  var altar_='';
  var uvorot='';
  var pochinit='';
  var buttle='';
  var kritomania='';
  var kamShit='';
  var berserk='';
  var vernutsyaVigru='';
  var bag_better=false;
  var clothes_broken=false;
  var fullBag=false; 
  var otklonit='';
  var skrit='';
  var obnovit='';
  var attack='';
  var attackTowers='';
  var attackDobivat='';
  var heal='';
  var healYourself='';
  var healSoyznika='';
  var healEnd=true;
  var destroyMana='';
  var resurection='';
  var zaityValtar='';
  var vstatVochered='';
  var noviuBoy='';
  var pokinutOchered='';
  
  
  var naGlavnuy='';
  var bashni='';
  var polyaSrajeniy='';
  var DND='';
  var zamki='';
  
  var nextTower=false;
  var kurgan='';
  var mitgard='';
  }
  {// лагерь викингов
	var lagerVikingov='';
	var lagerOrdi='';
  }
  {// дельта реки
	var deltaReki='';
	var leviyBereg='';
	var praviuBereg='';
	var usteReki='';
  }
  {// ледник
	var lednik='';
	var ledyaniePesheri='';
	var verhniuPereval='';
	var nijniuPereval='';
	var kamenniePesheri='';
	var gornoeOzero='';
  }
  {// северная пустошь
	var severnayaPustosh='';
	var sevVostPustosh='';
	var vostochnayaPustosh='';
	var ygoVostochnayaPustosh='';
	var sevZapadbayaPustosh='';
	var zapadnayaPustosh='';
	var ygoZapadnayaPustosh='';
	var ygnayaPustosh='';
	var perekrestok='';
  }
  {// розенгард
	var rosengard='';
	var marrokand='';
	var vostMarrokand='';
	var zapadMarrokand='';
	var zapadRosengard='';
	var vostRosengard='';
	var bolshoyKurgan='';
  }
  {// город мертвых
	var gorodMertvih='';
	var kladbisheGeroev='';
	var fontanSvobody='';
	var plshadVostaniya='';
	var pamyatbikPobedy='';
	var hramSkorbi='';
	//NEW
	var stenaVrajdy='';
	var mostSpasenia='';
	var kamennayaAlleya='';
	/////
  }
  ////////////////
}

if (Number(getCookie("lvlPoint"))>resurectionTower)
	{
		resurectionTower=Number(getCookie("lvlPoint"))
	}
{ // вызов функций

//opera.postError(document.getElementsByTagName('h1')[0].textContent)
if (localStorage.settings==undefined)
{
	if (location.href.match('www'))
	{
		Barbars_Page='www.barbars.ru';
	}
	if (location.href.match('188.138.18.40'))
	{
		Barbars_Page='188.138.18.40';
	}
	if ((sessionStorage.nextLVLpoint!=undefined)&&(sessionStorage.nextLVLpoint>resurectionTower))
	{
		resurectionTower=sessionStorage.nextLVLpoint;
	}
	try
	{
		if (document.getElementsByClassName('feedbackPanelERROR')[0].text.match("Чтобы двигаться дальше"))
		{
			location.href=location.href;
			return;
		} 
	}
	catch(err){}
	if ((sessionStorage.polySrajeniy=='1')||
		(sessionStorage.polySrajeniy=='2')||
		(document.getElementsByTagName('h1')[0].textContent=='Арена')||
		(document.getElementsByTagName('h1')[0].textContent=="Пещера мантикоры"))
	{
		CoolDownTime=CoolDownTimeInEvents;
		//opera.postError("CoolDownTime "+CoolDownTime)
	}
	var trayStatus =window.defaultStatus;
	trayStatus=CoolDownTime.toFixed(1);
	window.defaultStatus='Время до следующего удара/каста='+trayStatus+'мс';
	zapolneniePeremennih();
	otklonit_();
	skrit_();
	if (SetAltar)
	{
		altar();
	}
	if ((SetTimeReset)&&
		(document.getElementsByTagName('h1')[0].textContent!='Арена')&&
		(sessionStorage.polySrajeniy==undefined)&&
		(document.getElementsByTagName('h1')[0].textContent!="Пещера мантикоры")&&
		(document.getElementsByTagName('div')[2].textContent!="Пустая пещера"))
	{
		location_reset()
	}
	if (SetPochinka)
	{
		pochinka_veschey();
	}

	if (SetPolySrajeniy)
	{
		polyaSrajeniu();
	}
	if (razbirat)
	{
		razobratVeshi();
	}
	if ((SetMantikora)&&(Number(resurectionTower)>=4)&&(
		(document.getElementsByTagName('span')[3].textContent=="Лагерь викингов")||
		(document.getElementsByTagName('span')[3].textContent=="Лагерь орды")||
		(document.getElementsByTagName('span')[3].textContent=="Дельта реки")||
		(document.getElementsByTagName('span')[3].textContent=="Левый берег")||
		(document.getElementsByTagName('span')[3].textContent=="Правый берег")||
		(document.getElementsByTagName('span')[3].textContent=="Устье реки")||
		(document.getElementsByTagName('span')[3].textContent=="Ледник")||
		(document.getElementsByTagName('span')[3].textContent=="Ледяные пещеры")||
		(document.getElementsByTagName('span')[3].textContent=="Каменные пещеры")||
		(document.getElementsByTagName('span')[3].textContent=="Верхний перевал")||
		(document.getElementsByTagName('span')[3].textContent=="Нижний перевал")||
		(document.getElementsByTagName('span')[3].textContent=="Горное озеро")||
		(document.getElementsByTagName('span')[3].textContent=="Северная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Северо-восточная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Восточная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Юго-восточная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Перекрёсток")||
		(document.getElementsByTagName('span')[3].textContent=="Северо-западная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Западная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Юго-западная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Южная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Мароканд")||
		(document.getElementsByTagName('span')[3].textContent=="Восточный Мароканд")||
		(document.getElementsByTagName('span')[3].textContent=="Западный Мароканд")||
		(document.getElementsByTagName('span')[3].textContent=="Западный Розенгард")||
		(document.getElementsByTagName('span')[3].textContent=="Восточный Розенгард")||
		(document.getElementsByTagName('span')[3].textContent=="Розенгард")||
		(document.getElementsByTagName('span')[3].textContent=="Большой курган")||
		(document.getElementsByTagName('span')[3].textContent=="Мертвый город")||
		(document.getElementsByTagName('span')[3].textContent=="Храм скорби")||
		(document.getElementsByTagName('span')[3].textContent=="Памятник победы")||
		(document.getElementsByTagName('span')[3].textContent=="Кладбище героев")||
		(document.getElementsByTagName('span')[3].textContent=="Фонтан свободы")||
		(document.getElementsByTagName('span')[3].textContent=="Площадь восстания")||
		(document.getElementsByTagName('span')[4].textContent=="Лагерь викингов")||
		(document.getElementsByTagName('span')[4].textContent=="Лагерь орды")||
		(document.getElementsByTagName('span')[4].textContent=="Дельта реки")||
		(document.getElementsByTagName('span')[4].textContent=="Левый берег")||
		(document.getElementsByTagName('span')[4].textContent=="Правый берег")||
		(document.getElementsByTagName('span')[4].textContent=="Устье реки")||
		(document.getElementsByTagName('span')[4].textContent=="Ледник")||
		(document.getElementsByTagName('span')[4].textContent=="Ледяные пещеры")||
		(document.getElementsByTagName('span')[4].textContent=="Каменные пещеры")||
		(document.getElementsByTagName('span')[4].textContent=="Верхний перевал")||
		(document.getElementsByTagName('span')[4].textContent=="Нижний перевал")||
		(document.getElementsByTagName('span')[4].textContent=="Горное озеро")||
		(document.getElementsByTagName('span')[4].textContent=="Северная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Северо-восточная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Восточная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Юго-восточная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Перекрёсток")||
		(document.getElementsByTagName('span')[4].textContent=="Северо-западная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Западная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Юго-западная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Южная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Мароканд")||
		(document.getElementsByTagName('span')[4].textContent=="Восточный Мароканд")||
		(document.getElementsByTagName('span')[4].textContent=="Западный Мароканд")||
		(document.getElementsByTagName('span')[4].textContent=="Западный Розенгард")||
		(document.getElementsByTagName('span')[4].textContent=="Восточный Розенгард")||
		(document.getElementsByTagName('span')[4].textContent=="Розенгард")||
		(document.getElementsByTagName('span')[4].textContent=="Большой курган")||
		(document.getElementsByTagName('span')[4].textContent=="Мертвый город")||
		(document.getElementsByTagName('span')[4].textContent=="Храм скорби")||
		(document.getElementsByTagName('span')[4].textContent=="Памятник победы")||
		(document.getElementsByTagName('span')[4].textContent=="Кладбище героев")||
		(document.getElementsByTagName('span')[4].textContent=="Фонтан свободы")||
		(document.getElementsByTagName('span')[4].textContent=="Площадь восстания")||
		(document.getElementsByTagName('div')[2].textContent.match("Пустая пещера"))))
	{
		mantikora();
	}
	nextLvlPoint();
	resurection_();
	searchPoint();
    
	
	select_event();
	refresh_page()
}
}

function loadSettings()
{
	/*  document.getElementById("SetStorona").selectedIndex=Number(localStorage.SetStorona); 
	 document.getElementById("resurection").selectedIndex=Number(localStorage.SetResurection); 
	 document.getElementById("CoolDownTimeMin").value=localStorage.CoolDownTimeMin; \
	 document.getElementById("CoolDownTimeMax").value=localStorage.CoolDownTimeMax; \
	 document.getElementById("CoolDownTimeInEventsMin").value=localStorage.CoolDownTimeInEventsMin; \
	 document.getElementById("CoolDownTimeInEventsMax").value=localStorage.CoolDownTimeInEventsMax; \
	 document.getElementById("searchPointTimeMin").value=localStorage.searchPointTimeMin; \
	 document.getElementById("searchPointTimeMax").value=localStorage.searchPointTimeMax; \
	 document.getElementById("SetKritomania").checked=StrToBool(localStorage.SetKritomania); \
	 document.getElementById("SetBerserk").checked=StrToBool(localStorage.SetBerserk); \
	 document.getElementById("SetKamenniyShit").checked=StrToBool(localStorage.SetKamenniyShit); \
	 document.getElementById("SetKamenniyShitHP").value=localStorage.SetKamenniyShitHP; \
	 document.getElementById("SetUvorot").checked=StrToBool(localStorage.SetUvorot); \
	 document.getElementById("SetUvorotHP").value=localStorage.SetUvorotHP; \
	 document.getElementById("SetButtle").checked=StrToBool(localStorage.SetButtle); \
	 document.getElementById("SetButtleHP").value=localStorage.SetButtleHP; \
	 document.getElementById("SetTimeReset").checked=StrToBool(localStorage.SetTimeReset); \
	 document.getElementById("SetTimeResetTime").value=localStorage.SetTimeResetTime; \
	 document.getElementById("SetAttackTowers").checked=StrToBool(localStorage.SetAttackTowers); \
	 document.getElementById("SetHealSouznik").checked=StrToBool(localStorage.SetHealSouznik); \
	 document.getElementById("SetKritHP").value=localStorage.SetKritHP; \
	 document.getElementById("SetPolySrajeniy").checked=StrToBool(localStorage.SetPolySrajeniy); \
	 document.getElementById("SetPolySrajeniyTimeMin").value=localStorage.SetPolySrajeniyTimeMin; \
	 document.getElementById("SetPolySrajeniyTimeMax").value=localStorage.SetPolySrajeniyTimeMax; \
	 document.getElementById("SetOtklonyat").checked=StrToBool(localStorage.SetOtklonyat); \
	 document.getElementById("SetScrivat").checked=StrToBool(localStorage.SetScrivat); \
	 document.getElementById("SetRazbirat").checked=StrToBool(localStorage.SetRazbirat); \
	 document.getElementById("SetPochinka").checked=StrToBool(localStorage.SetPochinka); \
	 document.getElementById("SetAltar").checked=StrToBool(localStorage.SetAltar); \
	 document.getElementById("SetAltarZaJelezo").checked=StrToBool(localStorage.SetAltarZaJelezo); \
	 document.getElementById("SetAltarZaSerebro").checked=StrToBool(localStorage.SetAltarZaSerebro); \ */
}

function mantikora()
{
	var Digital=new Date();
	var hours=Digital.getHours();
	var minutes=Digital.getMinutes();
	var reg=/(\d+):(\d+):(\d+)/;
	var reg2=/(\d+):(\d+)/;
	if (sessionStorage.mantikora==undefined)
	{
		//sessionStorage.mantikora=hours+':'+minutes;
		location.href='http://'+Barbars_Page+'/game/manticora';
		if (document.getElementsByTagName('div')[2].textContent.match('Пустая пещера'))
		{
			try{
				var arr=reg.exec(document.getElementsByTagName('div')[7].textContent);
				if (Number(minutes)+Number(arr[2])>=60)
			{
				SetHours=hours+1+Number(arr[1]);
				SetMinutes=Number(minutes)+Number(arr[2])-60+2;
				sessionStorage.mantikora=SetHours+':'+SetMinutes;
			}
			else 
			{
				var SetHours=Number(hours)+Number(arr[1]);
				var SetMinutes=Number(minutes)+Number(arr[2])+2;
			}
				}
				catch(err){
				var arr=reg.exec(document.getElementsByTagName('div')[8].textContent);
				if (Number(minutes)+Number(arr[2])>=60)
			{
				SetHours=hours+1+Number(arr[1]);
				SetMinutes=Number(minutes)+Number(arr[2])-60+2;
				sessionStorage.mantikora=SetHours+':'+SetMinutes;
			}
			else 
			{
				var SetHours=Number(hours)+Number(arr[1]);
				var SetMinutes=Number(minutes)+Number(arr[2])+2;
			}
				}
			//alert(arr[1]);
			
			
			sessionStorage.mantikora=SetHours+':'+SetMinutes;
			location.href='http://'+Barbars_Page+'/';
			return;
		}
	}
	else
	{
		//sessionStorage.removeItem('mantikora');
		var arr2=reg2.exec(sessionStorage.mantikora)
		if ((arr2[1]<=hours)&&(arr2[2]<=minutes))
		{
			sessionStorage.removeItem('mantikora');
			//opera.postError('Mantikora time:'+hours+':'+minutes);
			location.href='http://'+Barbars_Page+'/game/manticora';
		}

	}
}

function location_reset()
{
	var Digital=new Date();
	var hours=Digital.getHours();
	var minutes=Digital.getMinutes();
	if (sessionStorage.time_reset==undefined)
	{
		if (time_ResetLocation+minutes>=60)
		{
			hours=hours+1;
			minutes=time_ResetLocation+minutes-60;
			sessionStorage.time_reset=hours+':'+minutes;
		}
		else
		{
			minutes=time_ResetLocation+minutes;
			sessionStorage.time_reset=hours+':'+minutes;
		}
	}
	else
	{
		var reg=/(\d+):(\d+)/;
		var arr=reg.exec(sessionStorage.time_reset);
		if ((arr[1]<=hours)&&(arr[2]<=minutes))
		{
			sessionStorage.removeItem('polySrajeniy');
			sessionStorage.removeItem('time_reset');
			//opera.postError('Poly Srajeniy time:'+hours+':'+minutes);
			setTimeout(function(){location.href='http://'+Barbars_Page+'/';},1000);
		}
		
	}
}

function zapolneniePeremennih()
{
for (var i=0;i<document.links.length;i++)
    {	
		if (document.links[i].href.match("sacrifaceMoneyLink"))
		{
			altarZAserebro=document.links[i].href;
		}
		if (document.links[i].href.match("sacrifaceIronLink"))
		{
			altarZAjelezo=document.links[i].href;
		}
		if (document.links[i].href.match("http://"+Barbars_Page+"/?wicket:bookmarkablePage=:com.overmobile.combats.wicket.pages.guild.AltarPage"))
		{
			altar_=document.links[i].href;
		}
		if (document.links[i].text.match("починить за "))
		{
			pochinit=document.links[i].href;
		}
		if ((document.links[i].text.match("Уворот"))&&(document.links[i].text.match('готово')))
		{
			uvorot=document.links[i].href;
		}
		if ((document.links[i].text.match("Каменный щит"))&&(document.links[i].text.match('готово')))
		{
			kamShit=document.links[i].href;
		}
		if ((document.links[i].text.match("Критомания"))&&(document.links[i].text.match('готово')))
		{
			kritomania=document.links[i].href;
		}
		if ((document.links[i].text.match("Пить бутылочку"))&&(document.links[i].text.match('шт')))
		{
			buttle=document.links[i].href;
		}
		if (document.links[i].text.match("Каменная аллея"))
		{
			kamennayaAlleya=document.links[i].href;
		}
		if (document.links[i].text.match("Стена вражды"))
		{
			stenaVrajdy=document.links[i].href;
		}
		if (document.links[i].text.match("Мост спасения"))
		{
			mostSpasenia=document.links[i].href;
		}
		if (document.links[i].text.match("Храм скорби"))
		{
			hramSkorbi=document.links[i].href;
		}
		if (document.links[i].text.match("Памятник победы"))
		{
			pamyatbikPobedy=document.links[i].href;
		}
		if (document.links[i].text.match("Площадь восстания"))
		{
			plshadVostaniya=document.links[i].href;
		}
		if (document.links[i].text.match("Фонтан свободы"))
		{
			fontanSvobody=document.links[i].href;
		}
		if (document.links[i].text.match("Кладбище героев"))
		{
			kladbisheGeroev=document.links[i].href;
		}
		if (document.links[i].text.match("Мертвый город"))
		{
			gorodMertvih=document.links[i].href;
		}
		if ((document.links[i].text.match("Берсерк"))&&(document.links[i].text.match('готово')))
		{
			berserk=document.links[i].href;
		}
		if (document.links[i].text.match("Вернуться в игру"))
		{
			vernutsyaVigru=document.links[i].href;
		}
		if (document.links[i].text.match("Покинуть очередь"))
		{
			pokinutOchered=document.links[i].href;
		}
		if (document.links[i].text.match("Новый бой"))
		{
			noviuBoy=document.links[i].href;
		}
		if (document.links[i].text.match("Встать в очередь"))
		{
			vstatVochered=document.links[i].href;
		}
		if (document.links[i].text.match("Зайти в алтарь"))
		{
			zaityValtar=document.links[i].href;
		}
		if (document.links[i].text.match("Большой курган"))
		{
			bolshoyKurgan=document.links[i].href;
		}
		if (document.links[i].text.match("Восточный Розенгард"))
		{
			vostRosengard=document.links[i].href;
		}
		if (document.links[i].text.match("Западный Розенгард"))
		{
			zapadRosengard=document.links[i].href;
		}
		if (document.links[i].text.match("Западный Мароканд"))
		{
			zapadMarrokand=document.links[i].href;
		}
		if (document.links[i].text.match("Восточный Мароканд"))
		{
			vostMarrokand=document.links[i].href;
		}
		if (document.links[i].text.match("Мароканд"))
		{
			marrokand=document.links[i].href;
		}
		if (document.links[i].text.match("Розенгард"))
		{
			rosengard=document.links[i].href;
		}
		if (document.links[i].text.match("Перекрёсток"))
		{
			perekrestok=document.links[i].href;
		}
		if (document.links[i].text.match("Южная пустошь"))
		{
			ygnayaPustosh=document.links[i].href;
		}
		if (document.links[i].text.match("Юго-западная пустошь"))
		{
			ygoZapadnayaPustosh=document.links[i].href;
		}
		if (document.links[i].text.match("Западная пустошь"))
		{
			zapadnayaPustosh=document.links[i].href;
		}
		if (document.links[i].text.match("Северо-западная пустошь"))
		{
			sevZapadbayaPustosh=document.links[i].href;
		}
		if (document.links[i].text.match("Юго-восточная пустошь"))
		{
			ygoVostochnayaPustosh=document.links[i].href;
		}
		if (document.links[i].text.match("Восточная пустошь"))
		{
			vostochnayaPustosh=document.links[i].href;
		}
		if (document.links[i].text.match("Северо-восточная пустошь"))
		{
			sevVostPustosh=document.links[i].href;
		}
		if (document.links[i].text.match("Северная пустошь"))
		{
			severnayaPustosh=document.links[i].href;
		}
		if (document.links[i].text.match("Мидгард, столица Севера"))
		{
			mitgard=document.links[i].href;
		}
		if (document.links[i].text.match("Горное озеро"))
		{
			gornoeOzero=document.links[i].href;
		}
		if (document.links[i].text.match("Нижний перевал"))
		{
			nijniuPereval=document.links[i].href;
		}
		if (document.links[i].text.match("Каменные пещеры"))
		{
			kamenniePesheri=document.links[i].href;
		}
		if (document.links[i].text.match("Верхний перевал"))
		{
			verhniuPereval=document.links[i].href;
		}
		if (document.links[i].text.match("Ледяные пещеры"))
		{
			ledyaniePesheri=document.links[i].href;
		}
		if (document.links[i].text.match("Лагерь орды"))
		{
			lagerOrdi=document.links[i].href;
		}
		if (document.links[i].text.match("Лагерь викингов"))
		{
			lagerVikingov=document.links[i].href;
		}
		if (document.links[i].text.match("Устье реки"))
		{
			usteReki=document.links[i].href;
		}
		if (document.links[i].text.match("Правый берег"))
		{
			praviuBereg=document.links[i].href;
		}
		if (document.links[i].text.match("Левый берег"))
		{
			leviyBereg=document.links[i].href;
		}
		if (document.links[i].text.match("Дельта реки"))
		{
			deltaReki=document.links[i].href;
		}
		if (document.links[i].text.match("Отклонить"))
		{
			otklonit=document.links[i].href;
		}
		if (document.links[i].text.match("скрыть"))
		{
			
			skrit=document.links[i].href;
		}
		if (document.links[i].text.match("Бить "))
		{
			attack=document.links[i].href;
		}
		if (document.links[i].text.match("Бить башню"))
		{
			attackTowers=document.links[i].href;
		}
		if (document.links[i].text.match("Добивать"))
		{
			attackDobivat=document.links[i].href;
		}
		if (document.links[i].text.match("Лечить союзников"))
		{
			heal=document.links[i].href;
		}
		if ((document.links[i].text.match("Лечить "))&&(document.links[i].text.match("% хп")))
		{
			healSoyznika=document.links[i].href;
		}
		if (document.links[i].text.match("Лечить себя"))
		{
			healYourself=document.links[i].href;
		}
		if (document.links[i].text.match("(200% хп)"))
		{
			healEnd=false;
		}
		if (document.links[i].text.match("Жечь энергию врагам"))
		{
			destroyMana=document.links[i].href;
		}
		if (document.links[i].text.match("Обновить"))
		{
			obnovit=document.links[i].href;
		}
		if (document.links[i].text.match("Воскреснуть в столице"))
		{
			resurection=document.links[i].href;
		}
		if (document.links[i].text.match("На главную"))
		{
			naGlavnuy=document.links[i].href;
		}
		if (document.links[i].text.match("Башни"))
		{
			bashni=document.links[i].href;
		}
		if (document.links[i].text.match("Поля сражений"))
		{
			polyaSrajeniy=document.links[i].href;
		}
		if (document.links[i].text.match("Пещеры и драконы"))
		{
			DND=document.links[i].href;
		}
		if (document.links[i].text.match("Замки"))
		{
			zamki=document.links[i].href;
		}
		if (document.links[i].text.match("Курган"))
		{
			kurgan=document.links[i].href;
		}
		if (document.links[i].text.match("Лагерь викингов"))
		{
			lagerVikingov=document.links[i].href;
		}
		if (document.links[i].text.match("Дельта реки"))
		{
			deltaReki=document.links[i].href;
		}
		if (document.links[i].text.match("Ледник"))
		{
			lednik=document.links[i].href;
		}
    }
for (var i=0;i<document.getElementsByTagName('img').length;i++)
	    {
			if (document.getElementsByTagName('img')[i].src=="http://"+Barbars_Page+"/images/icons/blue_tower.png")
			{
				if(SetStorona)
				{
					nextTower=true;
				}
				
			}
			if (document.getElementsByTagName('img')[i].src=="http://"+Barbars_Page+"/images/icons/red_tower.png")
			{
				if(SetStorona)
				{
				 
				}else{nextTower=true;}
			}
			if (document.getElementsByTagName('img')[i].src=="http://"+Barbars_Page+"/images/icons/bag_full.gif")
			{
				fullBag=true;
			}
			if (document.getElementsByTagName('img')[i].src=="http://"+Barbars_Page+"/images/icons/bag_better.gif")
			{
				bag_better=true;
			}
			if (document.getElementsByTagName('img')[i].src=="http://"+Barbars_Page+"/images/icons/clothes_broken.gif")
			{
				clothes_broken=true;
			}
			
	    }

}

function altar()
{
	if (altar_!='')
	{
			location.href=altar;
		return;
	}
	else if (SetAltarZaJelezo)
	{
		location.href=altarZAjelezo;
		return;
	}
	else if (SetAltarZaSerebro)
	{
		location.href=altarZAserebro;
		return;
	}
}

function otklonit_()
{
	if ((otklonit!='')&&(otklonyat))
  {
	setTimeout(function(){location.href=otklonit},0);
	return;
  }
}

function skrit_()
{
	if ((skrit!='')&&(scrivat))
  {
	
	setTimeout(function(){location.href=skrit},0);
    return;
  }
}

function pochinka_veschey()
{
	if ((clothes_broken)&&(location.href!='http://'+Barbars_Page+'/user/body'))
	{
		location.href="http://"+Barbars_Page+"/user/body";
		return;
	}
	if (location.href=='http://'+Barbars_Page+'/user/body')
	{
		alert('pochinit '+pochinit)
		if (pochinit!='')
		{
			location.href=pochinit;
			return;
		}
		else 
		{
			location.href=vernutsyaVigru;
			return;
		}
	}
}

function polyaSrajeniu() 
{
	try
	{
		var reg=/(\d+):(\d+):(\d+)/;
		var arr=reg.exec(document.getElementsByTagName('span')[6].textContent);
		if (Number(arr[2])>=10)
		{
			//alert(arr[2]);
			if (sessionStorage.polySrajeniy!=undefined)
			{
				sessionStorage.removeItem('polySrajeniy');
			}
			setTimeout(function(){location.href='http://'+Barbars_Page+'';},500);
			
		}
	}
	catch(err){}
	if ((minutes>=57)&&(minutes<=59)&&(sessionStorage.polySrajeniy==undefined))
	{
		//setCookie('polyaSrajeniu','1')
		sessionStorage.polySrajeniy=1;
		sessionStorage.removeItem('time_reset');
		setTimeout(function(){location.href='http://'+Barbars_Page+'/game/battleGround';},searchPointTime)
		return;
	}
	else if (((sessionStorage.polySrajeniy=='1')||(sessionStorage.polySrajeniy=='2'))&&(leviyBereg!='')&&(praviuBereg!=''))
	{
		// while (getCookie('polyaSrajeniu')==undefined)
		// {
			// delCookie('polyaSrajeniu');
		// }
		sessionStorage.polySrajeniy=2;
				
		// setTimeout(function(){delCookie('polyaSrajeniu');},1000);
		// setTimeout(function(){delCookie('polyaSrajeniu');},1000);
		// setTimeout(function(){delCookie('polyaSrajeniu');},1000);
		// if (getCookie('polyaSrajeniu')=='2')
		// {
			
		// } else
		// {
			// setCookie('polyaSrajeniu','2');
		// }
		
		
		var PSr=Math.floor(Math.random()*2);
		//opera.postError(PSr)
		if (PSr==0)
		{
			setTimeout(function(){location.href=leviyBereg;},searchPointTime);
			return;
		} 
		else
		{
			setTimeout(function(){location.href=praviuBereg;},searchPointTime);
			return;
		}
	}
	else if ((sessionStorage.polySrajeniy=='2')&&((noviuBoy!='')||(vstatVochered!='')))
	{
		sessionStorage.removeItem('polySrajeniy');
		setTimeout(function(){location.href='http://'+Barbars_Page+'/';},5000);
		return;
	}
}


function getCookie(name) {// возвращает cookie если есть или undefined
	var matches = document.cookie.match(new RegExp(
	  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	))
	return matches ? decodeURIComponent(matches[1]) : undefined 
}

function setCookie(name, value, props) {// уcтанавливает cookie
	props = props || {}
	var exp = props.expires
	if (typeof exp == "number" && exp) {
		var d = new Date()
		d.setTime(d.getTime() + exp*1000)
		exp = props.expires = d
	}
	if(exp && exp.toUTCString) { props.expires = exp.toUTCString() }

	value = encodeURIComponent(value)
	var updatedCookie = name + "=" + value
	for(var propName in props){
		updatedCookie += "; " + propName
		var propValue = props[propName]
		if(propValue !== true){ updatedCookie += "=" + propValue }
	}
	document.cookie = updatedCookie

}

function delCookie(name) {// удаляет cookie
	setCookie(name, null, { expires: -1 })
}

function razobratVeshi()
{
	if (sessionStorage.nadet==1)
	{
		
		sessionStorage.removeItem('nadet');
		for (var i=0;i<document.links.length;i++)
		{
			if (document.links[i].href.match("confirmLink"))
			{
				setTimeout(function(){location.href=document.links[i].href;},1000)
				break;
				return;
			}
		}
	}
	try{
	var str=document.getElementsByTagName('div')[2].textContent;
	var mif='http://'+Barbars_Page+'/images/icons/bonusdarkiron.png';
	var legend='http://'+Barbars_Page+'/images/icons/bonuslegendary.png';
	var fiolet='http://'+Barbars_Page+'/images/icons/bonusepic.png';
	var siniy='http://'+Barbars_Page+'/images/icons/bonusrare.png';
	var zelen='http://'+Barbars_Page+'/images/icons/bonusgreen.png';
	var korichneviu='http://'+Barbars_Page+'/images/icons/bonuscopper.png';
	}catch(err){}
	if (((fullBag)||(bag_better))&&(str.match('Рюкзак')!='Рюкзак')&&(str.match('Подтверждение')!='Подтверждение'))
	{
		location.href='http://'+Barbars_Page+'/user/rack';
	}
	if (/*(fullBag)&&*/(str.match('Рюкзак')))
	{
		var shmot_collection = new Array()
		var shmot_lvlError = new Array()
		var shmot_odetRazobrat = new Array()
		var shmot_odetRazobrat_links = new Array()
		var shmot_vsunduk_links = new Array()
		for (var i=0;i<document.getElementsByTagName('img').length;i++)//поиск шмотак по коллекциям
	    {
			if (document.getElementsByTagName('img')[i].src==mif)
			{
				shmot_collection.push('mif');
			}
			if (document.getElementsByTagName('img')[i].src==legend)
			{
				shmot_collection.push('legend');
			}
			if (document.getElementsByTagName('img')[i].src==fiolet)
			{
				shmot_collection.push('fiolet');
			}
			if (document.getElementsByTagName('img')[i].src==siniy)
			{
				shmot_collection.push('siniy');
			}
			if (document.getElementsByTagName('img')[i].src==zelen)
			{
				shmot_collection.push('zelen');
			}
			if (document.getElementsByTagName('img')[i].src==korichneviu)
			{
				shmot_collection.push('korichneviu');
			}
		}
		for (var i=0;i<shmot_collection.length;i++)//поиск шмоток по возможности одевания
		{
			try{
			var itemBad=document.getElementsByClassName('small')[i].getElementsByTagName('*')[0].className;
			}catch(err){}
			if (itemBad.match('itemBad')=='itemBad')
			{
				shmot_lvlError.push('1')
			}
			else {
				shmot_lvlError.push('0')
			} 
		}

		
		for (var i=0;i<document.links.length;i++)
		{
			if (document.links[i].text.match("надеть"))
			{
				shmot_odetRazobrat.push('0')
				shmot_odetRazobrat_links.push(document.links[i].href)
			}
			else if (document.links[i].text.match('разобрать'))
			{
				shmot_odetRazobrat.push('1')
				shmot_odetRazobrat_links.push(document.links[i].href)
			}
			else if (document.links[i].text.match('выкинуть'))
			{
				shmot_odetRazobrat.push('2')
				shmot_odetRazobrat_links.push(document.links[i].href)
			}
			if (document.links[i].href.match('toStoreLink'))
			{
				shmot_vsunduk_links.push(document.links[i].href)
			}
			
		}
		
		for (var i=0;i<shmot_collection.length;i++)// засовывание в сундук и чего то там еще
		{
			if (shmot_collection[i]=='mif')
			{
				setTimeout(function(){location.href=shmot_vsunduk_links[i]},2000)
				break;
			}
			else if (shmot_collection[i]=='legend')
			{
				setTimeout(function(){location.href=shmot_vsunduk_links[i]},2000)
				break;
			}
			else if (shmot_collection[i]=='fiolet')
			{
				setTimeout(function(){location.href=shmot_vsunduk_links[i]},2000)
				break;
			}
			// else if (shmot_collection[i]=='siniy')
			// {
				// setTimeout(function(){location.href=shmot_vsunduk_links[i]},2000)
				// break;
			// }
			else if ((shmot_odetRazobrat[i]=="0")&&(shmot_lvlError[i]!='1'))
			{
				setTimeout(function(){location.href=shmot_odetRazobrat_links[i]},2000)
				sessionStorage.nadet=1;
				break;
			}
			else if ((shmot_odetRazobrat[i]=="0")&&(shmot_lvlError[i]=='1'))
			{
				setTimeout(function(){location.href=shmot_vsunduk_links[i]},2000)
				break;
			}
			else if (shmot_odetRazobrat[i]=="2")
			{
				setTimeout(function(){location.href=shmot_vsunduk_links[i]},2000)
				break;
			}
			else if (shmot_odetRazobrat[i]=="1")
			{
				setTimeout(function(){location.href=shmot_odetRazobrat_links[i]},2000)
				sessionStorage.nadet=1;
				break;
			}
			else
			{
				setTimeout(function(){location.href=vernutsyaVigru},2000);
				return;
			}
			
		}
	}
	try{
	if (shmot_collection.length=='0')
	{
		setTimeout(function(){location.href=vernutsyaVigru},2000);
		return;
	}}catch(err){}
}

function resurection()
{
//система воскрешения
  	if (getCookie("resurection")=='1')
	{
		delCookie("resurection");
		switch(Number(resurectionTower))
		{
		case 0:
		  location.href=kurgan;
		  break;
		case 1:
		if (lagerVikingov!='')
		{
		  location.href=lagerVikingov;
		} else {location.href=lagerOrdi;}
		  break;
		case 2:
		if (deltaReki!='')
		{
		  location.href=deltaReki;
		} else {location.href=usteReki;}
		  break;
		case 3:
		if (lednik!='')
		{
		  location.href=lednik;
		} else {location.href=gornoeOzero;}
		  break;
		case 4:
		if (severnayaPustosh!='')
		{
		  location.href=severnayaPustosh;
		} else {location.href=ygnayaPustosh;}
		  break;
		case 5:
		if (rosengard!='')
		{
		  location.href=rosengard;
		} else {location.href=marrokand;}
		  break;
		case 6:
		  location.href=gorodMertvih;
		  break;
		case 7:
		  location.href='http://'+Barbars_Page+'/game/arena';
		  break;
		default:
		  alert('пожалуста впишите точку воскрешения');
		}
	}
}

function nextLvlPoint()
{
	try{
	var str=document.getElementsByTagName('div')[6].textContent;
	var str1=document.getElementsByTagName('div')[7].textContent;
	var str2=document.getElementsByTagName('div')[8].textContent;
	var str_1=document.getElementsByTagName('div')[2].textContent;
	if ((str.match('Ваш уровень слишком высок '))||(str1.match('Ваш уровень слишком высок '))||(str2.match('Ваш уровень слишком высок ')))
	{
		if (sessionStorage.nextLVLpoint==undefined)
		{
			sessionStorage.nextLVLpoint=Number(resurectionTower)+1;
			setTimeout(function(){location.href='http://'+Barbars_Page+'/'},1000);
			return;
			
		}
		else
		{
			sessionStorage.nextLVLpoint=Number(sessionStorage.nextLVLpoint)+1;
			setTimeout(function(){location.href='http://'+Barbars_Page+'/'},1000);
			return;
		}
	}
	if (document.getElementsByClassName('feedbackPanelERROR')[1].textContent.match('Сюда можно только с'))
	{
		sessionStorage.nextLVLpoint=Number(sessionStorage.nextLVLpoint)-1;
	}
	}catch(err){}
}

function searchPoint()
{
	//opera.postError("searchPoint()");
  //функция брожения по локациям
  try{
	var sev_mech=Number(document.getElementsByTagName('span')[6].textContent); 
	var sev_med=Number(document.getElementsByTagName('span')[7].textContent); 	
	var yg_mech=Number(document.getElementsByTagName('span')[8].textContent); 	
	var yg_med=Number(document.getElementsByTagName('span')[9].textContent);	
	var uroven_HP=Number(document.getElementsByTagName('span')[0].textContent) // получение данных по кол-ву хп
	
	}
	catch(err){};
	
	var krit_massa; 	
	var storona=false;
	if (SetStorona)
	{
		krit_massa=(yg_mech+yg_med)/(sev_mech+sev_med);
		//storona=yg_mech*yg_med;
		if ((yg_mech==0)&&(yg_med==0))
		{
			storona=true;
		}
	}
	else
	{
		krit_massa=(sev_mech+sev_med)/(yg_mech+yg_med);
		//storona=sev_mech*sev_med;
		if ((Number(sev_mech)==0)&&(Number(sev_med)==0))
		{
			storona=true;
		}
	}
	//opera.postError("sev_mech="+sev_mech+" sev_med="+sev_med+" storona="+storona+" attackTowers="+attackTowers+" krit_massa="+krit_massa+" kritHP="+kritHP+" uroven_HP="+uroven_HP);
	if (((storona)&&(attackTowers==''))||(krit_massa>2.5)||((kritHP>=uroven_HP)&&(kritHP!=0)&&(uroven_HP!=0)))
	{
		if ((buttle!='')&&(SetDrinkButtleHP)&&(SetDrinkHPlvl>=uroven_HP))
		  {
			setTimeout(function(){location.href=buttle},500);
			return;
		  }
		if ((kritHP>=uroven_HP)&&(kritHP!=0)&&(uroven_HP!=0))
		{
			location.href='http://'+Barbars_Page+'/';
			return;
		}
		  //opera.postError("search point function");
		  
		switch(Number(resurectionTower))
		{
		case 0:
		  //search_point_Kurgan();
		  break;
		case 1:
		  search_point_Lager_Vikingov();
		  break;
		case 2:
		  search_point_Delta_Reki();
		  break;
		case 3:
		  search_point_Lednik();
		  break;
		case 4:
		  search_point_Severnaya_Pustosh();
		  break;
		case 5:
		  search_point_Rosengard();
		  break;
  		case 6:
		  search_point_GorodMertvih();
		  break;
		default:
		  alert('пожалуста впишите точку поиска. resurectiontower='+resurectionTower);
		}	
	}
}

function search_point_Lager_Vikingov()
{
	
	if (document.getElementsByTagName('span')[3].textContent=="Лагерь викингов")
	{
		setTimeout(function(){location.href=lagerOrdi;},searchPointTime)
		return;
	}
	if (document.getElementsByTagName('span')[3].textContent=="Лагерь орды")
	{
		setTimeout(function(){location.href=lagerVikingov;},searchPointTime)
		return;
	}
}

function search_point_Delta_Reki()
{	
	
	var delta_reki=Math.floor(Math.random()*2);	
	
	if (document.getElementsByTagName('span')[3].textContent=="Дельта реки")
	{
		if ((delta_reki==0)&&(nextTower))
		{
			setTimeout(function(){location.href=leviyBereg;},searchPointTime)
			return;
		}
		if ((delta_reki==1)&&(nextTower))
		{
			setTimeout(function(){location.href=praviuBereg;},searchPointTime)
			return;
		}
	}
	if (document.getElementsByTagName('span')[3].textContent=="Левый берег")
	{
		if ((delta_reki==0)&&(nextTower))
		{
			setTimeout(function(){location.href=deltaReki;},searchPointTime)
			return;
		}
		if ((delta_reki==1)&&(nextTower))
		{
			setTimeout(function(){location.href=usteReki;},searchPointTime)
			return;
		}
		else 
		{
			setTimeout(function(){location.href=deltaReki;},searchPointTime)
			return;
		}
	}
	if (document.getElementsByTagName('span')[3].textContent=="Правый берег")
	{
		if ((delta_reki==0)&&(nextTower))
		{
			setTimeout(function(){location.href=deltaReki;},searchPointTime)
			return;
		}
		if ((delta_reki==1)&&(nextTower))
		{
			setTimeout(function(){location.href=usteReki;},searchPointTime)
			return;
		}
		else 
		{
			setTimeout(function(){location.href=deltaReki;},searchPointTime)
			return;
	    }
	}
	if (document.getElementsByTagName('span')[3].textContent=="Устье реки")
	{
		if (delta_reki==0)
		{
			setTimeout(function(){location.href=leviyBereg;},searchPointTime)
			return;
		}
		if (delta_reki==1)
		{
			setTimeout(function(){location.href=praviuBereg;},searchPointTime)
			return;
		}
	}
}

function search_point_Lednik() 
{
	var lednik_=Math.floor(Math.random()*3);	

	if (document.getElementsByTagName('span')[3].textContent=="Ледник")
	{
		if ((nextTower)&&((lednik==0)||(lednik==1)))
		{
			setTimeout(function(){location.href=ledyaniePesheri;},searchPointTime);
			return;
		}
		if ((nextTower)&&(lednik==2))
		{
			setTimeout(function(){location.href=verhniuPereval;},searchPointTime);
			return;
		}
	}	
	
	if (document.getElementsByTagName('span')[3].textContent=="Ледяные пещеры")
	{
		if ((nextTower)&&(lednik_==0))
		{
			setTimeout(function(){location.href=kamenniePesheri;},searchPointTime);
			return;
		}
		else if ((nextTower)&&(lednik_==1))
		{
			setTimeout(function(){location.href=lednik;},searchPointTime);
			return;
		}
		else if ((nextTower)&&(lednik_==2))
		{
			setTimeout(function(){location.href=nijniuPereval;},searchPointTime);
			return;
		}
		else 
		{
			if (SetStorona)
			{
				location.href=lednik;
				return;
			}
			else 
			{
				location.href=nijniuPereval;
				return;
			}
		}
	}
	
	if (document.getElementsByTagName('span')[3].textContent=="Каменные пещеры")
	{
		if ((nextTower)&&(lednik_==0))
		{
			setTimeout(function(){location.href=ledyaniePesheri;},searchPointTime);
			return;
		}
		else if ((nextTower)&&(lednik_==1))
		{
			setTimeout(function(){location.href=verhniuPereval;},searchPointTime);
			return;
		}
		else if ((nextTower)&&(lednik_==2))
		{
			setTimeout(function(){location.href=gornoeOzero;},searchPointTime);
			return;
		}
		else 
		{
			if (SetStorona)
			{
				location.href=ledyaniePesheri;
				return;
			}
			else 
			{
				location.href=gornoeOzero;
				return;
			}
		}
	}

	if (document.getElementsByTagName('span')[3].textContent=="Верхний перевал")
	{
		if ((nextTower)&&(lednik_==0))
		{
			setTimeout(function(){location.href=lednik;},searchPointTime);
			return;
		}
		else if ((nextTower)&&(lednik_==1))
		{
			setTimeout(function(){location.href=kamenniePesheri;},searchPointTime);
			return;
		}
		else if ((nextTower)&&(lednik_==2))
		{
			setTimeout(function(){location.href=nijniuPereval;},searchPointTime);
			return;
		}
		else 
		{
			if (SetStorona)
			{
				location.href=lednik;
				return;
			}
			else 
			{
				location.href=nijniuPereval;
				return;
			}
		}
	}
	
	if (document.getElementsByTagName('span')[3].textContent=="Нижний перевал")
	{

		if ((nextTower)&&(lednik_==0))
		{
			setTimeout(function(){location.href=ledyaniePesheri;},searchPointTime);
			return;
		}
		else if ((nextTower)&&(lednik_==1))
		{
			setTimeout(function(){location.href=verhniuPereval;},searchPointTime);
			return;
		}
		else if ((nextTower)&&(lednik_==2))
		{
			setTimeout(function(){location.href=gornoeOzero;},searchPointTime);
			return;
		}
		else
		{
			if (SetStorona)
			{
				location.href=ledyaniePesheri;
				return;
			}
			else 
			{
				location.href=gornoeOzero;
				return;
			}
		}
	}
	
	if (document.getElementsByTagName('span')[3].textContent=="Горное озеро")
	{
		//opera.postError("Горное озеро "+lednik+" "+kamenniePesheri+" "+nijniuPereval);
		if ((nextTower)&&((lednik==0)||(lednik==1)))
		{
			setTimeout(function(){location.href=kamenniePesheri;},searchPointTime);
			return;
		}
		if ((nextTower)&&(lednik==2))
		{
			setTimeout(function(){location.href=nijniuPereval;},searchPointTime);
			return;
		}
	}
}

function search_point_Severnaya_Pustosh() 
{
	
  var sev_pustosh=Math.floor(Math.random()*4);

	if (document.getElementsByTagName('span')[3].textContent=="Северная пустошь")
	{
		if ((nextTower)&&(sev_pustosh==0)||(sev_pustosh==1))
		{
			location.href=sevZapadbayaPustosh;
		}
		else if ((nextTower)&&(sev_pustosh==2)||(sev_pustosh==3))
		{
			location.href=sevVostPustosh;
		}
		else 
		{
			if ((sev_pustosh==0)||(sev_pustosh==1))
			{
				location.href=sevZapadbayaPustosh;
			}
			else 
			{
				location.href=sevVostPustosh;
			}
		}
	}
	if (document.getElementsByTagName('span')[3].textContent=="Северо-восточная пустошь")
	{
		if ((nextTower)&&(sev_pustosh==0))
		{
			location.href=severnayaPustosh;
		}
		else if ((nextTower)&&(sev_pustosh==2))
		{
			location.href=perekrestok;
		}
		else if ((nextTower)&&((sev_pustosh==1)||(sev_pustosh==3)))
		{
			location.href=vostochnayaPustosh;
		}
		else
		{
			if (SetStorona)
			{
				location.href=severnayaPustosh;
			}
			else 
			{
				location.href=vostochnayaPustosh;
			}
		}
	}
	if (document.getElementsByTagName('span')[3].textContent=="Восточная пустошь")
	{
		if ((nextTower)&&((sev_pustosh==0)||(sev_pustosh==1)))
		{
			location.href=sevVostPustosh;
		}
		else if ((nextTower)&&((sev_pustosh==2)||(sev_pustosh==3)))
		{
			location.href=ygoVostochnayaPustosh;
		}
	    else 
		{
			if (SetStorona)
			{
				location.href=sevVostPustosh;
			}
			else 
			{
				location.href=ygoVostochnayaPustosh;
			}
			
		}
	}
	if (document.getElementsByTagName('span')[3].textContent=="Юго-восточная пустошь")
	{
		if ((nextTower)&&(sev_pustosh==0))
		{
			location.href=ygnayaPustosh;
		}
		else if ((nextTower)&&(sev_pustosh==2))
		{
			location.href=perekrestok;
		}
		else if ((nextTower)&&((sev_pustosh==1)||(sev_pustosh==3)))
		{
			location.href=vostochnayaPustosh;
		}
		else 
		{
			if (SetStorona)
			{
				location.href=location.href=perekrestok;
			}
			else 
			{
				location.href=ygnayaPustosh;
			}
			
		}
	}
	if (document.getElementsByTagName('span')[3].textContent=="Перекрёсток")
	{
		if ((nextTower)&&(sev_pustosh==0))
		{
			location.href=sevZapadbayaPustosh;
		}
		if ((nextTower)&&(sev_pustosh==1))
		{
			location.href=sevVostPustosh;
		}
		if ((nextTower)&&(sev_pustosh==2))
		{
			location.href=ygoZapadnayaPustosh;
		}
		if ((nextTower)&&(sev_pustosh==3))
		{
			location.href=ygoVostochnayaPustosh;
		}
		else 
		{
			if (SetStorona)
			{
				location.href=sevZapadbayaPustosh;
			}
			else 
			{
				location.href=ygoVostochnayaPustosh;
			}
			
		}
	}
	if (document.getElementsByTagName('span')[3].textContent=="Северо-западная пустошь")
	{
		if ((nextTower)&&(sev_pustosh==0))
		{
			location.href=severnayaPustosh;
		}
		if ((nextTower)&&(sev_pustosh==2))
		{
			location.href=perekrestok;
		}
		if ((nextTower)&&((sev_pustosh==1)||(sev_pustosh==3)))
		{
			location.href=zapadnayaPustosh;
		}
		else 
		{
			if (SetStorona)
			{
				location.href=severnayaPustosh;
			}
			else 
			{
				location.href=zapadnayaPustosh;
			}
		}
	}
	if (document.getElementsByTagName('span')[3].textContent=="Западная пустошь")
	{
		if ((nextTower)&&((sev_pustosh==0)||(sev_pustosh==1)))
		{
			location.href=sevZapadbayaPustosh;
		}
		if ((nextTower)&&((sev_pustosh==2)||(sev_pustosh==3)))
		{
			location.href=ygoZapadnayaPustosh;
		}
		else 
		{
			if (SetStorona)
			{
				location.href=sevZapadbayaPustosh;
			}
			else 
			{
				location.href=ygoZapadnayaPustosh;
			}
			
		}
	}
	if (document.getElementsByTagName('span')[3].textContent=="Юго-западная пустошь")
	{
		if ((nextTower)&&(sev_pustosh==0))
		{
			location.href=zapadnayaPustosh;
		}
		if ((nextTower)&&(sev_pustosh==2))
		{
			location.href=perekrestok;
		}
		if ((nextTower)&&((sev_pustosh==3)||(sev_pustosh==1)))
		{
			location.href=ygnayaPustosh;
		}
		else 
		{
			if (SetStorona)
			{
				location.href=perekrestok;
			}
			else 
			{
				location.href=ygnayaPustosh;
			}
			
		}
	}
	if (document.getElementsByTagName('span')[3].textContent=="Южная пустошь")
	{
		if ((nextTower)&&((sev_pustosh==0)||(sev_pustosh==1)))
		{
			location.href=ygoZapadnayaPustosh;
		}
		else if ((nextTower)&&((sev_pustosh==2)||(sev_pustosh==3)))
		{
			location.href=ygoVostochnayaPustosh;
		}
		else 
		{
			if ((sev_pustosh==0)||(sev_pustosh==1))
			{
				location.href=ygoZapadnayaPustosh;
			}
			else 
			{
				location.href=ygoVostochnayaPustosh;
			}
			
		}
	
	}
}

function search_point_Rosengard() 
{
	
	try{
	var sev_mech=Number(document.getElementsByTagName('span')[6].textContent); 
	var sev_med=Number(document.getElementsByTagName('span')[7].textContent); 	
	var yg_mech=Number(document.getElementsByTagName('span')[8].textContent); 	
	var yg_med=Number(document.getElementsByTagName('span')[9].textContent);	
	var uroven_HP=Number(document.getElementsByTagName('span')[0].textContent) // получение данных по кол-ву хп
	var test_=yg_mech+yg_med
	
	}
	catch(err){};
	
  var rosengard_=Math.floor(Math.random()*4);

 if (document.getElementsByTagName('span')[3].textContent=="Мароканд")
	{
		//opera.postError("search point rosengard, lock name marrokand");
		if ((rosengard_==0)||(rosengard_==1))
		{
			location.href=vostMarrokand;
		}
		if ((rosengard_==2)||(rosengard_==3))
		{
			location.href=zapadMarrokand;
		}
	}
 if (document.getElementsByTagName('span')[3].textContent=="Восточный Мароканд")
	{
		//opera.postError("search point rosengard, lock name vost marrokand");
		if ((nextTower)&&((rosengard_==0)||(rosengard_==1)))
		{
			location.href=bolshoyKurgan;
		}
		else if ((nextTower)&&((rosengard_==2)||(rosengard_==3)))
		{
			location.href=marrokand;
		}
		else 
		{
			location.href=bolshoyKurgan;
		}
	}
 if (document.getElementsByTagName('span')[3].textContent=="Западный Мароканд")
	{
		//opera.postError("search point rosengard, lock name zapad marrokand");
		if ((nextTower)&&((rosengard_==0)||(rosengard_==1)))
		{
			location.href=bolshoyKurgan;
		}
		else if ((nextTower)&&((rosengard_==2)||(rosengard_==3)))
		{
			location.href=marrokand;
		}
		else 
		{
			location.href=bolshoyKurgan;
		}
	}
 if (document.getElementsByTagName('span')[3].textContent=="Западный Розенгард")
	{
		//opera.postError("search point rosengard, lock name zapad rosengard");
		if ((nextTower)&&((rosengard_==0)||(rosengard_==1)))
		{
			location.href=rosengard;
		}
		else if ((nextTower)&&((rosengard_==2)||(rosengard_==3)))
		{
			location.href=bolshoyKurgan;
		}
	    else 
		{
			location.href=rosengard;
		}
	}
 if (document.getElementsByTagName('span')[3].textContent=="Восточный Розенгард")
	{
		//opera.postError("search point rosengard, lock name vost rosengard");
		if ((nextTower)&&((rosengard_==0)||(rosengard_==1)))
		{
			location.href=rosengard;
		}
		else if ((nextTower)&&((rosengard_==2)||(rosengard_==3)))
		{
			location.href=bolshoyKurgan;
		}
		else 
		{
			location.href=rosengard;
		}
	}
 if (document.getElementsByTagName('span')[3].textContent=="Розенгард")
	{
		//opera.postError("search point rosengard, lock name rosengard");
		if ((test_==0)&&(nextTower!=true))
		{
			setTimeout(function(){location.href=location.href},500);
			
			return;
		}
		if ((nextTower)&&(rosengard_==0)||(rosengard_==1))
		{
			location.href=zapadRosengard;
		}
		if ((nextTower)&&(rosengard_==2)||(rosengard_==3))
		{
			location.href=vostRosengard;
		}
	}
 if (document.getElementsByTagName('span')[3].textContent=="Большой курган")
	{
		//opera.postError("search point rosengard, lock name kurgan");
		if ((nextTower)&&(rosengard_==0))
		{
			location.href=zapadRosengard;
		}
		else if ((nextTower)&&(rosengard_==1))
		{
			location.href=vostRosengard;
		}
	    else if ((nextTower)&&(rosengard_==2))
		{
			location.href=zapadMarrokand;
		}
	    else if ((nextTower)&&(rosengard_==3))
		{
			location.href=vostMarrokand;
		}
	    else 
		{
			location.href=vostRosengard;
		}
	}
}

function search_point_GorodMertvih() 
{
	try{
	var sev_mech=Number(document.getElementsByTagName('span')[6].textContent); 
	var sev_med=Number(document.getElementsByTagName('span')[7].textContent); 	
	var yg_mech=Number(document.getElementsByTagName('span')[8].textContent); 	
	var yg_med=Number(document.getElementsByTagName('span')[9].textContent);	
	var uroven_HP=Number(document.getElementsByTagName('span')[0].textContent) // получение данных по кол-ву хп
	var test_=yg_mech+yg_med
	
	}
	catch(err){};
	
  var gorodMertvih_=Math.floor(Math.random()*4);
   if ((document.getElementsByTagName('span')[3].textContent=="Мертвый город")&&(hramSkorbi!=''))
	{
		if ((gorodMertvih_==0)||(gorodMertvih_==1))
		{
			location.href=hramSkorbi;
		}
		if ((gorodMertvih_==2)||(gorodMertvih_==3))
		{
			location.href=pamyatbikPobedy;
		}
	}

 if (document.getElementsByTagName('span')[3].textContent=="Храм скорби")
	{
		if ((nextTower)&&((gorodMertvih_==0)||(gorodMertvih_==1)))
		{
			//location.href=gorodMertvih;
			location.href=kamennayaAlleya;
		}
		else if ((nextTower)&&((gorodMertvih_==2)||(gorodMertvih_==3)))
		{
			location.href=gorodMertvih;
		}
		else 
		{
			location.href=kamennayaAlleya;
		}
	}
	
 if (document.getElementsByTagName('span')[3].textContent=="Памятник победы")
	{
		if ((nextTower)&&((gorodMertvih_==0)||(gorodMertvih_==1)))
		{
			//location.href=gorodMertvih;
			location.href=gorodMertvih;
		}
		else if ((nextTower)&&((gorodMertvih_==2)||(gorodMertvih_==3)))
		{
			location.href=kamennayaAlleya;
		}
		else 
		{
			location.href=kamennayaAlleya;
		}
	}
 if (document.getElementsByTagName('span')[3].textContent=="Кладбище героев")
	{
		if ((nextTower)&&((gorodMertvih_==0)||(gorodMertvih_==1)))
		{
			location.href=gorodMertvih;
		}
		else if ((nextTower)&&((gorodMertvih_==2)||(gorodMertvih_==3)))
		{
			location.href=plshadVostaniya;
		}
	    else 
		{
			location.href=plshadVostaniya;
		}
	}
 if (document.getElementsByTagName('span')[3].textContent=="Фонтан свободы")
	{
		
		if ((nextTower)&&((gorodMertvih_==0)||(gorodMertvih_==1)))
		{
			location.href=gorodMertvih;
		}
		else if ((nextTower)&&((gorodMertvih_==2)||(gorodMertvih_==3)))
		{
			location.href=plshadVostaniya;
		}
		else 
		{
			location.href=gorodMertvih;
		}
	}
 if ((document.getElementsByTagName('span')[3].textContent=="Мертвый город")&&(fontanSvobody!=''))
	{
		if ((test_==0)&&(nextTower!=true))
		{
			setTimeout(function(){location.href=location.href},500);
			return;
		}
		if ((nextTower)&&(gorodMertvih_==0)||(gorodMertvih_==1))
		{
			location.href=fontanSvobody;
		}
		if ((nextTower)&&(gorodMertvih_==2)||(gorodMertvih_==3))
		{
			location.href=kladbisheGeroev;
		}
	}
 if (document.getElementsByTagName('span')[3].textContent=="Площадь восстания")
	{
		if ((nextTower)&&(gorodMertvih_==0))
		{
			location.href=pamyatbikPobedy;
		}
		else if ((nextTower)&&(gorodMertvih_==1))
		{
			location.href=hramSkorbi;
		}
	    else if ((nextTower)&&(gorodMertvih_==2))
		{
			location.href=stenaVrajdy;
		}
	    else if ((nextTower)&&(gorodMertvih_==3))
		{
			location.href=mostSpasenia;
		}
	    else 
		{
			location.href=mostSpasenia;
		}
	}
	if (document.getElementsByTagName('span')[3].textContent=="Стена вражды")
	{
		if ((nextTower)&&((gorodMertvih_==0)||(gorodMertvih_==1)))
		{
			location.href=gorodMertvih;
		}
		else if ((nextTower)&&((gorodMertvih_==2)||(gorodMertvih_==3)))
		{
			location.href=kamennayaAlleya;
		}
	    else 
		{
			location.href=kamennayaAlleya;
		}
	}
	if (document.getElementsByTagName('span')[3].textContent=="Мост спасения")
	{
		if ((nextTower)&&((gorodMertvih_==0)||(gorodMertvih_==1)))
		{
			location.href=gorodMertvih;
		}
		else if ((nextTower)&&((gorodMertvih_==2)||(gorodMertvih_==3)))
		{
			location.href=kamennayaAlleya;
		}
	    else 
		{
			location.href=kamennayaAlleya;
		}
	}
if (document.getElementsByTagName('span')[3].textContent=="Каменная аллея")
	{
		if ((nextTower)&&(gorodMertvih_==0))
		{
			location.href=fontanSvobody;
		}
		else if ((nextTower)&&(gorodMertvih_==1))
		{
			location.href=kladbisheGeroev;
		}
	    else if ((nextTower)&&(gorodMertvih_==2))
		{
			location.href=stenaVrajdy;
		}
	    else if ((nextTower)&&(gorodMertvih_==3))
		{
			location.href=mostSpasenia;
		}
	    else 
		{
			location.href=mostSpasenia;
		}
	}
	}

function resurection_()
{
	//opera.postError('function resurection_')
  if (resurection!='')
  {
    if (getCookie("totalDeath")==undefined)
	{
	  setCookie("totalDeath","1");
	} else 
	{
		// var totalDeath;
		// totalDeath = Number(getCookie("totalDeath"))+1;
		// setCookie("totalDeath",totalDeath);
	}
    setCookie("resurection","1");
	location.href=resurection;
	return;
  } 
  else if ((getCookie("resurection")=='1')||(sessionStorage.resurection=='1'))
  {


	delCookie("resurection");

switch(Number(resurectionTower))
		{
		case 0:
		  location.href=kurgan;
		  break;
		case 1:
		if (lagerVikingov!='')
		{
		  location.href=lagerVikingov;
		} else {location.href=lagerOrdi;}
		  break;
		case 2:
		if (deltaReki!='')
		{
		  location.href=deltaReki;
		} else {location.href=usteReki;}
		  break;
		case 3:
		if (lednik!='')
		{
		  location.href=lednik;
		} else {location.href=gornoeOzero;}
		  break;
		case 4:
		if (severnayaPustosh!='')
		{
		  location.href=severnayaPustosh;
		} else {location.href=ygnayaPustosh;}
		  break;
		case 5:
		if (rosengard!='')
		{
		  location.href=rosengard;
		} else {location.href=marrokand;}
		  break;
		case 6:
		  location.href=gorodMertvih;
		  break;
		case 7:
		  location.href='http://'+Barbars_Page+'/game/arena';
		  break;
		default:
		  alert('пожалуста впишите точку воскрешения');
		}
	return;
  }
 return;
}

function select_event()
{
	////opera.postError("CoolDownTime "+CoolDownTime)
	try{
	var uroven_HP=Number(document.getElementsByTagName('span')[0].textContent) // получение данных по кол-ву хп
	
  if (location.hostname.indexOf('waplog.net')==0)
  {
	location.href="http://"+Barbars_Page+"/game/towers";
	return;
  }
  else if ((buttle!='')&&(SetDrinkButtleHP)&&(SetDrinkHPlvl>=uroven_HP))
  {
	setTimeout(function(){location.href=buttle},500);
	return;
  }
  else if ((kamShit!='')&&(SetKammenniyShit)&&(setKamShitHPlvl>=uroven_HP))
  {
	setTimeout(function(){location.href=kamShit},500);
	return;
  }
  else if ((uvorot!='')&&(SetUvorot)&&(setUvorotHPlvl>=uroven_HP))
  {
	setTimeout(function(){location.href=uvorot},500);
	return;
  }
  else if ((kritomania!='')&&(SetKritomania))
  {
	setTimeout(function(){location.href=kritomania},500);
	return;
  }
  else if ((berserk!='')&&(SetBerserk))
  {
	setTimeout(function(){location.href=berserk},500);
	return;
  }
  else if (healYourself!='')
  {
  	setTimeout(function(){location.href=healYourself},CoolDownTime);
	return;
  }
  else if ((healSoyznika!='')&&(healEnd)&&(SetHealSouznik))
  {
	delCookie("destroyMana");
  	setTimeout(function(){location.href=healSoyznika},CoolDownTime);
    return;
  }
  else if ((heal!='')&&(getCookie("destroyMana")!="1"))
  {	
	setCookie("destroyMana","1")
	setTimeout(function(){location.href=heal},CoolDownTime);
	return;
  }
  else if ((destroyMana!='')&&(getCookie("destroyMana")=="1"))
  {
  	delCookie("destroyMana");
	setTimeout(function(){location.href=destroyMana},CoolDownTime);
	return;
  }
  else if ((attackTowers!='')&&(SetAttackTower))
  {
    setTimeout(function(){location.href=attackTowers},CoolDownTime)
	return;
  }
  else if (attackDobivat!='')
  {
    setTimeout(function(){location.href=attackDobivat},CoolDownTime)
	return;
  }
  else if (attack!='')
  {
	setTimeout(function(){location.href=attack},CoolDownTime)
	return;
  }
   else if (noviuBoy!='')
  {
	setTimeout(function(){location.href=noviuBoy},5000)
	return;
  }
  else if (vstatVochered!='')
  {
	setTimeout(function(){location.href=vstatVochered},5000)
	return;
  }
  else if ((obnovit!='')&&(document.getElementsByTagName('h1')[0].textContent!="Чат клана"))
  {
	setTimeout(function(){location.href=obnovit},4000)
	
	return;
  }
  else if ((document.getElementsByTagName('span')[3].textContent=="Мидгард, столица Севера")||
  (document.getElementsByTagName('span')[4].textContent=="Мидгард, столица Севера")||
  (document.getElementsByTagName('span')[3].textContent=="Каракорум, столица Юга")||
  (document.getElementsByTagName('span')[4].textContent=="Каракорум, столица Юга"))
  {
	//opera.postError("resurection in midgard");
	sessionStorage.removeItem('polySrajeniy');
	setTimeout(function(){test()},10000)
	return;
  }
  else if (document.getElementsByTagName('h1')[0].textContent=="Варвары")
  {
	//opera.postError("barbars.ru page");
	setTimeout(function(){location.href='http://'+Barbars_Page+'/game/towers'},10000)
	return;
  }
  }catch(err){}
}

function test()
{
	//opera.postError("test() function");
	switch(Number(resurectionTower))
		{
		case 0:
		  location.href=kurgan;
		  break;
		case 1:
		if (lagerVikingov!='')
		{
		  location.href=lagerVikingov;
		} else {location.href=lagerOrdi;}
		  break;
		case 2:
		if (deltaReki!='')
		{
		  location.href=deltaReki;
		} else {location.href=usteReki;}
		  break;
		case 3:
		if (lednik!='')
		{
		  location.href=lednik;
		} else {location.href=gornoeOzero;}
		  break;
		case 4:
		if (severnayaPustosh!='')
		{
		  location.href=severnayaPustosh;
		} else {location.href=ygnayaPustosh;}
		  break;
		case 5:
		if (rosengard!='')
		{
		  location.href=rosengard;
		} else {location.href=marrokand;}
		  break;
		case 6:
		  location.href=gorodMertvih;
		  break;
		case 7:
		  location.href='http://'+Barbars_Page+'/game/arena';
		  break;
		default:
		  alert('пожалуста впишите точку воскрешения');
		}
	return;
  }

function refresh_page()
{
	////opera.postError("refresh_page() function");
	sessionStorage.removeItem('polySrajeniy');
	if ((document.getElementsByTagName('span')[3].textContent=="Лагерь викингов")||
		(document.getElementsByTagName('span')[3].textContent=="Лагерь орды")||
		(document.getElementsByTagName('span')[3].textContent=="Дельта реки")||
		(document.getElementsByTagName('span')[3].textContent=="Левый берег")||
		(document.getElementsByTagName('span')[3].textContent=="Правый берег")||
		(document.getElementsByTagName('span')[3].textContent=="Устье реки")||
		(document.getElementsByTagName('span')[3].textContent=="Ледник")||
		(document.getElementsByTagName('span')[3].textContent=="Ледяные пещеры")||
		(document.getElementsByTagName('span')[3].textContent=="Каменные пещеры")||
		(document.getElementsByTagName('span')[3].textContent=="Верхний перевал")||
		(document.getElementsByTagName('span')[3].textContent=="Нижний перевал")||
		(document.getElementsByTagName('span')[3].textContent=="Горное озеро")||
		(document.getElementsByTagName('span')[3].textContent=="Северная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Северо-восточная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Восточная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Юго-восточная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Перекрёсток")||
		(document.getElementsByTagName('span')[3].textContent=="Северо-западная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Западная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Юго-западная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Южная пустошь")||
		(document.getElementsByTagName('span')[3].textContent=="Мароканд")||
		(document.getElementsByTagName('span')[3].textContent=="Восточный Мароканд")||
		(document.getElementsByTagName('span')[3].textContent=="Западный Мароканд")||
		(document.getElementsByTagName('span')[3].textContent=="Западный Розенгард")||
		(document.getElementsByTagName('span')[3].textContent=="Восточный Розенгард")||
		(document.getElementsByTagName('span')[3].textContent=="Розенгард")||
		(document.getElementsByTagName('span')[3].textContent=="Большой курган")||
		(document.getElementsByTagName('span')[3].textContent=="Мертвый город")||
		(document.getElementsByTagName('span')[3].textContent=="Храм скорби")||
		(document.getElementsByTagName('span')[3].textContent=="Памятник победы")||
		(document.getElementsByTagName('span')[3].textContent=="Кладбище героев")||
		(document.getElementsByTagName('span')[3].textContent=="Фонтан свободы")||
		(document.getElementsByTagName('span')[3].textContent=="Площадь восстания")||
		(document.getElementsByTagName('span')[4].textContent=="Лагерь викингов")||
		(document.getElementsByTagName('span')[4].textContent=="Лагерь орды")||
		(document.getElementsByTagName('span')[4].textContent=="Дельта реки")||
		(document.getElementsByTagName('span')[4].textContent=="Левый берег")||
		(document.getElementsByTagName('span')[4].textContent=="Правый берег")||
		(document.getElementsByTagName('span')[4].textContent=="Устье реки")||
		(document.getElementsByTagName('span')[4].textContent=="Ледник")||
		(document.getElementsByTagName('span')[4].textContent=="Ледяные пещеры")||
		(document.getElementsByTagName('span')[4].textContent=="Каменные пещеры")||
		(document.getElementsByTagName('span')[4].textContent=="Верхний перевал")||
		(document.getElementsByTagName('span')[4].textContent=="Нижний перевал")||
		(document.getElementsByTagName('span')[4].textContent=="Горное озеро")||
		(document.getElementsByTagName('span')[4].textContent=="Северная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Северо-восточная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Восточная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Юго-восточная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Перекрёсток")||
		(document.getElementsByTagName('span')[4].textContent=="Северо-западная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Западная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Юго-западная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Южная пустошь")||
		(document.getElementsByTagName('span')[4].textContent=="Мароканд")||
		(document.getElementsByTagName('span')[4].textContent=="Восточный Мароканд")||
		(document.getElementsByTagName('span')[4].textContent=="Западный Мароканд")||
		(document.getElementsByTagName('span')[4].textContent=="Западный Розенгард")||
		(document.getElementsByTagName('span')[4].textContent=="Восточный Розенгард")||
		(document.getElementsByTagName('span')[4].textContent=="Розенгард")||
		(document.getElementsByTagName('span')[4].textContent=="Большой курган")||
		(document.getElementsByTagName('span')[4].textContent=="Мертвый город")||
		(document.getElementsByTagName('span')[4].textContent=="Храм скорби")||
		(document.getElementsByTagName('span')[4].textContent=="Памятник победы")||
		(document.getElementsByTagName('span')[4].textContent=="Кладбище героев")||
		(document.getElementsByTagName('span')[4].textContent=="Фонтан свободы")||
		(document.getElementsByTagName('span')[4].textContent=="Площадь восстания")||
		(document.getElementsByTagName('span')[3].textContent=="Каракорум, столица Юга")||
		(document.getElementsByTagName('span')[4].textContent=="Каракорум, столица Юга")||
		(document.getElementsByTagName('div')[2].textContent.match("Рюкзак")))
	{
		setTimeout(function(){location.href='http://'+Barbars_Page+'/'},30000);
		//setTimeout(function(){alert('ya slomalsya')},30000)
	}
	return;
}

}
)();
