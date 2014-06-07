// ==UserScript==
// @name       Spammer Laknat On Kaskus
// @namespace  noname
// @version    0.1
// @description  enter something useful
// @include        *.kaskus.co.id/*
// @include        *.kaskus.co.id/fjb/*
// @include        *.kaskus.co.id/fjb/buy/*
// @include        *.kaskus.co.id/fjb/sell/*
// @include        *.kaskus.co.id/thread/*
// @include        *.kaskus.co.id/post/*
// @include        *.kaskus.co.id/group/
// @include        *.kaskus.co.id/forum/*
// @include        *.kaskus.co.id/forum/new_thread/*
// @include        *.kaskus.co.id/classified/*
// @include        *.kaskus.co.id/search/*
// @include        *.kaskus.co.id/group/discussion/*
// @include        *.kaskus.co.id/show_post/*
// @include        *.kaskus.co.id/lastpost/*
// @copyright  2013+, zie
// ==/UserScript==

var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    img=ilist[i]
    if(img.src == "http://i50.tinypic.com/4kiot4.png") {
         img.src = "tetekbengek.png";
    }
    if(img.src == "http://i48.tinypic.com/335ceh4.jpg") {
        img.src = "tetekbengek.png";
    }
    if(img.src == "http://kkcdn-static.kaskus.co.id/images/2013/02/03/5143696_20130203104126.jpg") {
        img.src = "tetekbengek.png";
    }
    if(img.src == "http://i49.tinypic.com/fabrpw.jpg") {
        img.src = "tetekbengek.png";
    }
     if(img.src == "http://i48.tinypic.com/16llnyv.jpg") {
        img.src = "tetekbengek.png";
    }
     if(img.src == "http://i45.tinypic.com/24bjkfo.jpg") {
        img.src = "tetekbengek.png";
    }
     if(img.src == "http://i45.tinypic.com/fne4ck.jpg") {
        img.src = "tetekbengek.png";
    }
     if(img.src == "http://i47.tinypic.com/14a8qv6.jpg") {
        img.src = "tetekbengek.png";
    }
     if(img.src == "http://i48.tinypic.com/2rfd2mt.jpg") {
        img.src = "tetekbengek.png";
    }
    
    
}

var words = {  
    "kimpoi": "kawin",
    "krack": "crack",
    "paypai": "paypal",
    "pocongkk": "pocong",
    "rapid*share":"rapidshare",
    "4*shared":"4shared",
    "detik..com":"detik.com",
    "zid*du":"ziddu",
    "inilah..com":"inilah.com",
    "hi permisi agan-agan, mau numpang iklan":"spammer laknatullah",
    
    //obat herbal
    
    "SOLUSI AMAN TUBUH IDEAL":" ",
    "Apakah Anda Bermasalah Dengan Berat Badan Anda??":" ",
    "Sudah Mencoba berbagai Macam Cara tapi tidak terpecahkan??":" ",
    "Sulit Mendapatkan Lawan Jenis yang kalian idamkan??":" ",
    "Sudah Bosan Dan Ingin Segera Mendapatkan solusinya??":" ",
    "SELESAI SUDAH MASALAH ANDA SEKARANG":" ",
    "KARENA KAMI PUNYA JALAN KELUARNYA":" ",
    
    //tukang spammer jersey miskin
    
    "JERSEY GRADE ORIGINAL":" ",
    "Kalian lagi pada nyari jersey??":" ",
	"ingin kualitas terbaik dengan harga termiring??":" ",
	"Atau ingin bisnis Jersey sebagai reseller kami??":" ",
	"SELAMAT !":" ",
	"Karena Sebuah Kebetulan anda berada di zona yang tepat":" ",
    "*Cekidot Dibawah ini":" ",
    "www.kaskus.co.id/post/50a712546012438511000082":" ",
    "*Copy Paste Link diatas ini kemudian Enter ya gan*":" ",
    "Grade Ori emang banyak gan ! Tapi":" ",
    "So tunggu apalagi?? Buruan di order gan":" ",
    "Contact Person:":" ",
    "278048A7":"911",
    "233FC8D1":"008",
    "081977921159":"001",
    
    "":""};
// replace proccess
String.prototype.prepareRegex = function() {
	return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};
// bbcode
function isOkTag(tag) {
	return (new RegExp("(," + tag + ",) | (," + tag + "$)", "g").test(",pre,blockquote,code,input,button,textarea")) == false;
}
// konversi kata
var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
	if(word != "") {
		regexs.push(new RegExp(word.prepareRegex().replace(/(\\)?\*/g, function(e) {return ((e !== "\\*") ? "[^ ]*" : "*");}), "gi"));
		replacements.push(words[word]);
	}
}
//
var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="", len=regexs.length;
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName) && (text=this_text.textContent)) {
		for(var x=0; x<len; x++) text = this_text.textContent = text.replace(regexs[x], replacements[x]);
	}
}
var url1,url2;
url1 = ['www.rapid%2Ashare.com', 'www.4%2Ashared.com', 'www.zid%2Adu.com', 'detik..com', 'inilah..com'];
url2 = ['www.rapidshare.com', 'www.4shared.com', 'www.ziddu.com', 'detik.com', 'inilah.com']; 
var a, links;
var tmp="a";
var p,q;
links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    a = links[i];
    for(var j=0;j<url1.length; j++)
	{
	tmp = a.href+"" ;
	if(tmp.indexOf(url1[j]) != -1)
	{
	p=tmp.indexOf(url1[j]) ;
	q="http://";
	q = q + url2[j] + tmp.substring(p+url1[j].length,tmp.length);
	a.href=q ;
	}
	}
    }
