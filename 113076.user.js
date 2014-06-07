// ==UserScript==
// @name          InciReserved
// @namespace     InciReserved
// @description   Reserved edilen basliklari saklar
// @include       http://ccc.incisozluk.cc/ss_entry.php*
// @include       http://inci.sozlukspot.com/ss_entry.php*
// @include       http://ccc.incisozluk.cc/w/*
// @include       http://inci.sozlukspot.com/w/*
// @include       http://ccc.incisozluk.cc*
// @include       http://inci.sozlukspot.com*
// inci sozluk reserved eklentisi - super siksonik
// ==/UserScript==

// 0-20 degerleri eger set edilmemisse ""'a set edelim.
for (var k = 0; k < 21; k++)
{
	if (!GM_getValue(k))
	{
		GM_setValue(k, "")
	}
}

// o an acýk olan basligi alalim, ileride cok kullanicaz.
var alltitles, thistitle;
alltitles = document.getElementsByTagName('title');
    thistitle = alltitles[0];
    title = thistitle.innerHTML;
	title = title.substring(0, title.length-14);

// sagdaki timer'in yerine sourmonkey'i sokalim.
var everybody, areyouready;
everybody = document.evaluate(
    "//td[@class='ucubekisim4']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < everybody.snapshotLength; i++) {
    areyouready = everybody.snapshotItem(i);
	content = "<form name=favoform><select onChange='document.location.href=document.favoform.favosel.options[document.favoform.favosel.selectedIndex].value' name=favosel style='width:120px;'><option>sourmonkey</option>";
	
	for (var j = 0; j < 21; j++)
	{
		if (GM_getValue(j))
		{
			content = content+"<option value='show.asp?t="+GM_getValue(j)+"'>"+GM_getValue(j)+"</option>";
		}
	}
	
	content = content+"</form>";
	areyouready.innerHTML = content;
}

// su an acik olan baslik sourmonkey listemizde kayitlý mi degil mi bakalim.
var exists = 0;
for (var k = 0; k < 21; k++)
{
	if (GM_getValue(k) == title)
	{
		exists = 1;
	}
}

// bos yerimiz var mi ona bakalim.
var hede = 0;
for (var k = 0; k < 21; k++)
{
	if (GM_getValue(k) == "")
	{
		hede = hede+1;
	}
}

// eger listemizde yoksa ve bos yerimiz varsa [f+] seysini cikaralim.
if (exists == 0 && hede > 0)
{
	var allh1, thish1;
	allh1 = document.evaluate(
    "//h1[@class='title']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

	thish1 = allh1.snapshotItem(0);
	eklestir = document.createElement('a');
	eklestir.innerHTML = "[f+]";
	eklestir.href = "#";
	thish1.parentNode.insertBefore(eklestir, thish1.nextSibling);
	
	eklestir.addEventListener('click', function(event) {

	// buna gerek yok aslinda, onceki versiyondan kalma, ama dursa da bisi degismez.
	if (hede == 0) { alert("20 tane favorin var zaten"); }
	
	// ekleme dugmesine basildi, ekleyelim.
	else
	{
		var hrr = 0;
		for (var n = 0; n < 21 && hrr == 0; n++)
		{
			if (GM_getValue(n) == "")
			{
				hrr = 1;
				GM_setValue(n, title);
				window.location.reload();
			}
		}
		
	}
	
	event.stopPropagation();
    event.preventDefault();
	}, true);
}

// eger su an acik olan baslik zaten listemizde varsa [f-] olayini yapalim.
if (exists == 1)
{
	var allh1, thish1;
	allh1 = document.evaluate(
    "//h1[@class='title']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

	thish1 = allh1.snapshotItem(0);
	cikistir = document.createElement('a');
	cikistir.innerHTML = "[f-]";
	cikistir.href = "#";
	thish1.parentNode.insertBefore(cikistir, thish1.nextSibling);
	
	cikistir.addEventListener('click', function(event) {
	
	// listeden cikarma dugmesine basildi, cikaralim.
	for (var k = 0; k < 21; k++)
	{
		if (GM_getValue(k) == title)
		{
			GM_setValue(k, "");
			window.location.reload();
		}
	}
	
	event.stopPropagation();
    event.preventDefault();
	}, true);
}