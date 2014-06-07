// ==UserScript==
// @name	        * Tribalwars Farm
// @namespace		* Tribalwars Farm
// @description		* Farm script for iMacros with anticaptcha
// @author		Spieler84
// ==/UserScript==


// Задержки - Delays
var delay_cycle = 1200;			// пауза между циклами фарма, с. delay between cycles, seconds
var delay_cycle_delta = [300, 1200];	// доп. пауза между циклами, с. additional delay, seconds
var delay_village = 2;			// пауза между деревнями, с. delay between villages, seconds
var delay_village_delta = [1, 2];	// доп. пауза между деревнями, с. additional delay, seconds
var delay_btn = 300;			// пауза между кликами, мс. delay between FA clicks, milliseconds
var delay_btn_delta = [50, 300];	// доп. пауза между кликами, мс. additional delay, milliseconds

// Настройки военного советника - FA setup
var max_btn_count = 100;		// количество деревень на страницу в настройках ВС, number of villages per FA page
var max_FA_depth = 1;			// на сколько страниц можно углубиться (0 - без переходов), number of FA pages to dive in
var light_farm_size = 10;		// размер отряда ЛК. number of Light Cavalry set at button "A"
var Next_btn_txt = "Дальше";		// текст на кнопке ввода капчи. Text of the capcha submit button


// Настройки сервиса antigate - antigate setup
var api_key = "f488ea8a1f6803aca999809788bf874e";	// ваш api-ключ, antigate key
var captcha_min_len = 6;	// минимальный размер капчи, min size of capcha
var captcha_max_len = 6;	// максимальный размер капчи, max size of capcha

// Общие настройки - General setup
const base_url = "http://ru22.voyna-plemyon.ru/game.php?"; // для присмотра добавится параметр t, например
							   // "http://ru23.voyna-plemyon.ru/game.php?t=2342321&" (for sitter)
//const base_url = "ru22.voyna-plemyon.ru/game.php?t=589108&";

var start_type = 2;	// 1 - автоматически фармит со всех деревень. start from any page - farm from all villages
			// 2 - нужно вручную перейти в Обзор-Комбинированный и выбрать группу деревень, start from overview
			// 3 - вручную указываются ссылки на советника, manual FA setup

var res = "";
var jsNewLine="\n";
var i=0;
var num_villages = 0;
var href_villages = [];
var dd;

const XMLHttpRequest = Components.Constructor("@mozilla.org/xmlextras/xmlhttprequest;1");

var xmlHttp=createXmlHttpRequestObject();
function createXmlHttpRequestObject()
{
	var xmlHttp;
	
	try
	{
		xmlHttp=new XMLHttpRequest();
	}
	catch(e)
	{
		var XMLHttpVersions = new Array("MSXML2.XMLHTTP.6.0",
									  "MSXML2.XMLHTTP.5.0",
									  "MSXML2.XMLHTTP.4.0",
									  "MSXML2.XMLHTTP.3.0",
									  "MSXML2.XMLHTTP",
									  "Microsoft.XMLHTTP");
								 
		for (var i=0; i < 6 && !xmlHttp; i++)
		{
			try
			{
				xmlHttp= new ActiveXObject(XmlHttpVersions[i]);
			}
			catch(e) {}
		}
	}
	if (!xmlHttp)
		alert("error of creating XMLHttpRequest");
	else
		return xmlHttp;
}

function postUrl(path, params)
{
  res = "";
  var req = new XMLHttpRequest();
    if (xmlHttp)
    {    
        try
        {
            req.open("POST", path, false); // синхронно и не паримся
            req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            req.send(params);   
            res = req.responseText;
        }
        catch (e)
        {
            alert("Не удалось соединиться с сервером:\n" + e.toString());    
        }  
    }
}


function getBase64Image(img) 
{
    // создаем канвас
    var canvas = window.content.document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Копируем изображение на канвас
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Получаем data-URL отформатированную строку
    var dataURL = canvas.toDataURL("image/png");

    return encodeURIComponent(dataURL.replace(/^data:image\/(png);base64,/, ""));
}

function getBase64ImageById(id)
{
   return getBase64Image(window.content.document.getElementById(id));
}

function send_captcha()
{
var base64_value = getBase64ImageById('bot_check_image'); 

do 
{
var data = "method=base64&key=" + api_key + "&soft_id=490&body=" + base64_value + 
	"&min_len=" + captcha_min_len + "&max_len=" + captcha_max_len;

postUrl("http://antigate.com/in.php", data);

iimDisplay("Ответ от сервера: " + res);

if (res.substring(0, 2) == "OK") { var cap_id = res.substring(3); } 

doSleep(5); // ждём 
} while (res.substring(0, 2) != "OK");

do
{
	doSleep(5);
	data = "key=" + api_key + "&action=get&id=" +cap_id,
	postUrl("http://antigate.com/res.php", data);
	iimDisplay("Текст капчи: " + res);
} while ((res == "CAPCHA_NOT_READY")&&(res.substring(0, 5)!="ERROR"))

if (res.substring(0, 5)!="ERROR")
	{
	// вводим текст и клацаем кнопку
	var code = "CODE:" + jsNewLine;
	code = code + "TAG POS=1 TYPE=INPUT:TEXT ATTR=NAME:code CONTENT=" + res.substring(3) + jsNewLine;
	code = code + "TAG POS=1 TYPE=INPUT:SUBMIT ATTR=VALUE:" + Next_btn_txt;
	iimPlay(code);
	} else {solve_captcha();};

}

function getVillageList() // Сбор информации о деревнях
{
iimDisplay("Getting villages list");
if (start_type == 1) { // автосбор деревень
var code = "CODE:" + jsNewLine;
code = code + "URL GOTO=" + base_url + "screen=overview_villages&mode=combined&group=0" + jsNewLine;
code = code + "TAG POS=1 TYPE=TH ATTR=TXT:Деревня* EXTRACT=TXT"; 
iimPlay(code);
}

if (start_type != 3) { // собираем деревни по списку

var code = "CODE:" + jsNewLine;
code = code + "TAG POS=1 TYPE=TH ATTR=TXT:Деревня* EXTRACT=TXT"; 
iimPlay(code);

num_villages = iimGetLastExtract(1);
num_villages = num_villages.substring(num_villages.indexOf("(")+1);
num_villages = num_villages.substring(0, num_villages.indexOf(")"));
//alert(num_villages);

code = "CODE:" + jsNewLine;
code = code + "TAG POS=2 TYPE=A ATTR=HREF:*screen=overview EXTRACT=HREF" + jsNewLine;
iimPlay(code);

href_villages[1] = iimGetLastExtract(1);

href_villages[1] = href_villages[1].substr(href_villages[1].indexOf("village=")+8);
href_villages[1] = href_villages[1].substr(0, href_villages[1].indexOf("&"));
href_villages[1] = base_url + 'village=' + href_villages[1] + "&order=distance&dir=asc&screen=am_farm";

for (i=2; i<=num_villages; i++)
	{
	// выцепляем ссылки на деревни
	code = "CODE:" + jsNewLine;
	code = code + "TAG POS=" + (i+1) + " TYPE=A ATTR=HREF:*screen=overview EXTRACT=HREF" + jsNewLine;
	iimPlay(code);
	href_villages[i] = iimGetLastExtract(1);
	
	href_villages[i] = href_villages[i].substr(href_villages[i].indexOf("village=")+8);
	href_villages[i] = href_villages[i].substr(0, href_villages[i].indexOf("&"));
	href_villages[i] = base_url + 'village=' + href_villages[i] + "&order=distance&dir=asc&screen=am_farm";
	}
}
if (start_type == 3) { // забиваем вручную, list of FA pages
href_villages = ["",
"http://ru23.voyna-plemyon.ru/game.php?village=123&order=distance&dir=asc&screen=am_farm",
"http://ru23.voyna-plemyon.ru/game.php?village=124&order=distance&dir=asc&screen=am_farm"];
num_villages = 2;
}

}

function click_all(icon, href)
{
// посчитаем количество выходов
var code = "CODE:" + jsNewLine;
code = code + "TAG POS=1 TYPE=TD ATTR=ID:light EXTRACT=TXT"
iimPlay(code);
var light_count = iimGetLastExtract(1);
var btn_count = Math.floor(light_count/light_farm_size);

var FA_depth = Math.floor(btn_count/max_btn_count);

if (FA_depth > max_FA_depth) {FA_depth = max_FA_depth};

btn_count = btn_count - FA_depth*max_btn_count;
if (btn_count > max_btn_count) {btn_count = max_btn_count};

var num_btn = 1;

// жмём кнопочки сколько нужно
for (var j=0; j<=FA_depth; j++) {
	if (j!=0) {
		URL_goto(href + "&Farm_page=" + j);
		doSleep(2);
		solve_captcha();		// проверка на антибота
		}
	if (j==FA_depth) {num_btn = btn_count} else {num_btn = max_btn_count };
	code = "CODE:" + jsNewLine;
	
	for (i=1; i<=num_btn; i++)
		{
		code = code + "TAG POS=" + (i+1) +" TYPE=A ATTR=CLASS:*farm_icon_" + icon + "*" + jsNewLine;
		code = code + "WAIT SECONDS=" + ((delay_btn + getRandomInt(delay_btn_delta[0], delay_btn_delta[1]))/1000) + jsNewLine;
		}
	iimPlay(code);	
	}	
}

function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function doSleep(amount) {
	var tmpCode = "CODE:" + jsNewLine;
	tmpCode += "WAIT SECONDS=" + amount;
	iimPlay(tmpCode);
}

function URL_goto(url)
{
	iimDisplay("GOTO: " + url);
	var code = "CODE:" + jsNewLine;
	code = code + "URL GOTO=" + url;
	iimPlay(code);
}

function solve_captcha()
{
	// если просит капчу - вводим
	var img = window.content.document.getElementById('bot_check_image');
	if (img != null) {send_captcha();} // если видим капчу - решаем
}

function farm_all_villages()
{
for (var v=1; v<=num_villages; v++)
	{
	URL_goto(href_villages[v]);	// идём на страничку советника
	doSleep(3);			// прогрузить капчу
	solve_captcha();		// проверка на антибота
	click_all("a", href_villages[v]);			// кликаем кнопки
	// пауза перед следующей страничкой
	doSleep(delay_village + getRandomInt(delay_village_delta[0], delay_village_delta[1]));
	}
}

// Точка входа

solve_captcha();
getVillageList();

while (true)
{
	farm_all_villages();
	doSleep(delay_cycle+ getRandomInt(delay_cycle_delta[0], delay_cycle_delta[1]));
} 
