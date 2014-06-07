// ==UserScript==
// @name           Facebook - Ghost Trappers autohunt
// @namespace      Beruksakti
// @description    A smart autohunt script for the Ghost Trppers Facebook App
// @include        http://www.ghost-trappers.com/fb/*
// @exclude        http://www.ghost-trappers.com/fb/inc/*
// @exclude        http://www.ghost-trappers.com/fb/social-network/*
// @exclude        http://www.ghost-trappers.com/fb/js/*
// @exclude        http://www.connect.facebook.com/*
// @exclude	   http://applifier.com/*
// @versions       1.1 Add wisky check, script will stop and play "shiphorn" like captcha did, rewrite script
// @versions       1.0 Initial Release
// @issues         Does not stop attempting to refresh when you run out of whiskey.
// ==/UserScript==
/************ main ***********/
var nyangkut = 0;
var peringatan = true;
tunjuk = document.getElementById("topHuntActive").innerHTML;//href;
letak = tunjuk.substring(tunjuk.indexOf("\"")+1,tunjuk.indexOf("#"));
linklocation = document.body.innerHTML.search(/secondsUntilHunt/);
lokasi = document.body.innerHTML.substring(linklocation + "secondsUntilHunt".length+4, linklocation + "secondsUntilHunt".length + 10);
capcha= document.body.innerHTML.search(/captcha_image.php/);
wisky = document.getElementById("profile_whisky_quantity").innerHTML;
data = parseInt(lokasi);
if (tunjuk.length >5){
	if(isNaN(data)==false){
		if(data < 0 )
		{	
			if (capcha != -1 || wisky < 2){ cekdulu();}
			if (capcha == -1 && wisky > 1){aksi();}
			
		}
	else
		data = data + Math.floor((Math.random() * 5));
		if (capcha != -1 || wisky < 2){ cekdulu();}
		if (capcha == -1 && wisky > 1){blow();}
		
	}
}
else
{nyangkut = 1; stuck();}
/******* end of main *********/
function cekdulu()
{
	if(wisky > 1 ){
	window.document.title= "Captcha detected !!!";
	}
	var kerasukan = document.createElement("div");
   kerasukan.innerHTML = "<embed name=\"captcha\" src=\"http://www.dieselairhorns.com/sounds/BM_RS-3B.mp3\" type=\"audio/mpeg\" autostart=\"true\" hidden=\"true\" loop=\"true\" mastersound enablejavascript=\"true\"></embed>";
   
   if (peringatan == true)
   {	   
      document.body.appendChild(kerasukan);
   }
  if(wisky < 2)
  {
	  alert("your potion in critical number !!!");
  }
   kerasukan=null;
}


function blow()
	{
		if (data > 0 )
		{
			document.title =  itung(data--) + " | Ghost Trappers |";
			window.setTimeout(function () { (blow)() }, 990);
		}
		if (data <= 1)
			{
				aksi();
			}
	}
	
function itung (data)
	{
	var menit = Math.floor(data / 60);
	var detik = data % 60;
	var tunjuk = "";
		if (menit > 0)
			{
				tunjuk = menit + " m " + detik + " s";
			}
		else
			{
				if (detik >0)
					{
						tunjuk = detik + " s";
					}
		
			}
	menit = null;detik=null;
	return tunjuk;
	}
	
function aksi()
{
	nyangkut = 1;
	stuck();
	setTimeout(function() {document.location = 'http://www.ghost-trappers.com/fb/'+letak;} , 1000);
	
}

function stuck()
{
	if (nyangkut == 1){
		document.title = "Reloading....";
		setTimeout(function() {document.location = 'http://www.ghost-trappers.com/fb/index.php';} , 8000);
		setTimeout(stuck,10000);
	}
}