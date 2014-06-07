// ==UserScript==
// @name           itu sozluk bakın dur fortlaması 
// @namespace      http://www.itusozluk.com/userinfo.php?user=togisama 
// @description    bakın dur fasilitesine allah ne verdiyse ekleyip hiyerarşiye sokan
// @include        http://www.itusozluk.com/goster*
// ==/UserScript==

var i,len;
var bakinOptions=new Array();

optionAyarla();

var bakindur=document.getElementById("ban").firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes[1];

if(bakindur)
{
	bakindur.attributes[0].value="";

	len=bakindur.length;
	for(i=1;i<len;i++)
		bakindur.remove(bakindur.length-1);
	
	for(i=0;i<bakinOptions.length;i+=2)
		bakindur.add(new Option(bakinOptions[i], bakinOptions[i+1]),null);
	
	bakindur.addEventListener('change',bakindurChange,true);
 
}


function bakindurChange(e){ 
 
	var chosenoption=this.options[this.selectedIndex];
 	var i=this.selectedIndex;
	var aranan=baslikbul();
	
	this.selectedIndex=0;

	if (chosenoption.value=="kategori")
		while(this.options[++i].value!="kategori" && i<this.options.length)
			window.open(encodeURI(r(this.options[i].value,'XXXXX',aranan)), "", "");
	else
  		window.open(encodeURI(r(chosenoption.value,'XXXXX',aranan)), "", ""); 

}

function baslikbul()
{
	var baslikAna=document.getElementById("gzl");
	var aranan="";
	baslikAna=baslikAna.parentNode;
	
	for(var i=0;i<baslikAna.childNodes.length;i+=2)
		if(baslikAna.childNodes[i].tagName=="A")
			aranan= aranan+baslikAna.childNodes[i].firstChild.nodeValue+" ";

	aranan=aranan.substring(0,aranan.length-1);

	return aranan;
}

function optionAyarla()
{
	bakinOptions.push("--SÖZLÜKSEL--");
	bakinOptions.push("kategori");
		bakinOptions.push(".....SesliSözlük.....");
		bakinOptions.push("http://www.seslisozluk.com/?word=XXXXX");
		bakinOptions.push(".....EkşiSözlük.....");
		bakinOptions.push("http://sozluk.sourtimes.org/show.asp?t=XXXXX");
		bakinOptions.push(".....Etimolojik.....");
		bakinOptions.push("http://www.nisanyansozluk.com/search.asp?w=XXXXX");
		bakinOptions.push(".....Wikipedia.....");
		bakinOptions.push("http://en.wikipedia.org/wiki/Special:Search?fulltext=Search&search=XXXXX");
		bakinOptions.push(".....Vikipedi.....");
		bakinOptions.push("http://tr.wikipedia.org/wiki/Special:Search?fulltext=Search&search=XXXXX");
		bakinOptions.push(".....TDK.....");
		bakinOptions.push("http://www.tdk.gov.tr/TR/SozBul.aspx?F6E10F8892433CFFAAF6AA849816B2EF4376734BED947CDE&Kelime=XXXXX");

	bakinOptions.push("--GOOGLESAL--");
	bakinOptions.push("kategori");
		bakinOptions.push(".....Google.....");
		bakinOptions.push("http://www.google.com.tr/search?q=XXXXX");
		bakinOptions.push(".....GoogleImage.....");
		bakinOptions.push("http://images.google.com.tr/images?q=XXXXX");
		bakinOptions.push(".....Rapidshare.....");
		bakinOptions.push("http://www.google.com.tr/search?q=XXXXX+intext%3Arapidshare.com");
		bakinOptions.push(".....GoogleVideo.....");
		bakinOptions.push("http://video.google.com/videosearch?q=XXXXX");
		bakinOptions.push(".....GoogleBooks.....");
		bakinOptions.push("http://books.google.com/books?q=XXXXX");

	bakinOptions.push("--SANATSAL--");
	bakinOptions.push("kategori");
		bakinOptions.push(".....AllMusic(Artist).....");
		bakinOptions.push("http://www.allmusic.com/cg/amg.dll?P=amg&opt1=1&sql=XXXXX");
		bakinOptions.push(".....LastFM.....");
		bakinOptions.push("http://www.last.fm/search?m=all&q=XXXXX");
		bakinOptions.push(".....IMDB.....");
		bakinOptions.push("http://www.imdb.com/find?s=all&q=XXXXX&x=0&y=0");
		bakinOptions.push(".....YouTube.....");
		bakinOptions.push("http://www.youtube.com/results?search_type=&search_query=XXXXX&aq=f");
		bakinOptions.push(".....AZLyrics.....");
		bakinOptions.push("http://search.azlyrics.com/search.php?q=XXXXX");
		bakinOptions.push(".....OpenSubtitles.....");
		bakinOptions.push("http://www.opensubtitles.org/en/search2/sublanguageid-all/moviename-XXXXX");

	bakinOptions.push("--GAZETESEL--");
	bakinOptions.push("kategori");
		bakinOptions.push(".....Hürriyet.....");
		bakinOptions.push("http://arama.hurriyet.com.tr/?keyword=XXXXX");
		bakinOptions.push(".....Milliyet.....");
		bakinOptions.push("http://www.milliyet.com.tr/Default.aspx?aType=DetayliAramaArsiv&PAGE=1&ArticleTypeID=&selectedProperty=&Keyword=XXXXX&StartDate=&EndDate=&prmTitle=0&prmSpot=0&OrderType=1");
		bakinOptions.push(".....Sabah.....");
		bakinOptions.push("http://arama.sabah.com.tr/arama/arama.php?query=XXXXX&btnAra.x=0&btnAra.y=0");
		bakinOptions.push(".....Posta.....");
		bakinOptions.push("http://www.google.com.tr/custom?domains=www.gazeteposta.net&hl=tr&q=XXXXX&sa=Ara&sitesearch=www.gazeteposta.net");
		bakinOptions.push(".....Radikal.....");
		bakinOptions.push("http://www.radikal.com.tr/Default.aspx?aType=DetayliArama&ItemsPerPage=10&Keyword=XXXXX&NotKeyword=&startDateNull=&endDateNull=&prmTitle=1&prmSpot=1&prmText=1&prmEk=0&Asc=0");
		bakinOptions.push(".....Cumhuriyet.....");
		bakinOptions.push("http://www.cumhuriyet.com.tr/?im=yhs&aranan=XXXXX");

	bakinOptions.push("--TORRENT--");
	bakinOptions.push("kategori");
		bakinOptions.push(".....Torrentz.....");
		bakinOptions.push("http://www.torrentz.com/search?q=XXXXX");
		bakinOptions.push(".....Mininova.....");
		bakinOptions.push("http://www.mininova.org/search/?search=XXXXX");
		bakinOptions.push(".....ThePirateBay.....");
		bakinOptions.push("http://thepiratebay.org/search/XXXXX");
		bakinOptions.push(".....Demonoid.....");
		bakinOptions.push("http://www.demonoid.com/files/?category=0&subcategory=All&quality=All&seeded=0&external=2&query=XXXXX&uid=0&sort=");

}

function r(dd,s,t) 
{ // Replace search string with translation
	if (s==t) 
		return (dd); 
	
	else 
	{
		var RegExpr = new RegExp(s,"g");
		return (dd.replace(RegExpr,t));
    }
}