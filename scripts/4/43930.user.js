// ==UserScript==
// @name           Kaspersky.pl Captchar Killer
// @namespace      kaspersky
// @include        http://www.kaspersky.pl/mag/pcwk/kav2009.html
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    }
    else {
        $ = unsafeWindow.jQuery;
        main();
    }
}

GM_wait();

// All your GM code must be inside this function
function main()
	{
		if ($("font[color*='#007700']").length>0)
		{
			var captchars = $("img[src*='cap_1']");
			var capText='';
			$("img[src*='slow_1']").each(function(){capText+= GetCapchar(captchars		[GetImgNumber(this.src)-1].src);});
			$("[onpaste*='return false;']").attr('onpaste','return true;')
			$("input[name*='kod']").attr('value','KAV2009-999513');
			$("input[name*='captcha']").attr('value',capText);
			$("input[name*='zatwierdz']").attr('value','Register');
			$("textarea[name*='adres']").attr('value','Wydział do spraw Foresight\r\nul. Wspólna 1/3\r\n00-529 Warszawa 53');
			$($("b")[2]).html('Code');
			$($("b")[3]).html('Your Name');
			$($("b")[4]).html('<span>Your Email address</span><font color="red">*</font>');
			$($("small")[0]).html('This e-mail will be used to send the activation code');
			$($("b")[5]).html('Your address');
			$($("tr")[23]).hide();
			$($("tr")[24]).hide();
			$($("tr")[25]).hide();
			$($("tr")[26]).hide();
		}
	}

function GetCapchar(imgUrl)
{
    var returnValue ='';
    switch(imgUrl)
    {
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_50440.png' : returnValue ='A'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_51282.png' : returnValue ='B'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_52126.png' : returnValue ='C'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_52972.png' : returnValue ='D'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_53820.png' : returnValue ='E'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_54670.png' : returnValue ='F'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_55522.png' : returnValue ='G'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_56376.png' : returnValue ='H'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_57232.png' : returnValue ='I'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_58090.png' : returnValue ='J'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_58950.png' : returnValue ='K'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_59812.png' : returnValue ='L'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_60676.png' : returnValue ='M'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_61542.png' : returnValue ='N'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_62410.png' : returnValue ='O'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_63280.png' : returnValue ='P'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_64152.png' : returnValue ='Q'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_65026.png' : returnValue ='R'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_65902.png' : returnValue ='S'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_66780.png' : returnValue ='T'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_67660.png' : returnValue ='U'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_68542.png' : returnValue ='V'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_69426.png' : returnValue ='W'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_70312.png' : returnValue ='X'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_71200.png' : returnValue ='Y'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_72090.png' : returnValue ='Z'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_119140.png' : returnValue ='Ś'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_122122.png' : returnValue ='Ź'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_142462.png' : returnValue ='Ł'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_144540.png' : returnValue ='Ą'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_155050.png' : returnValue ='Ż'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_179982.png' : returnValue ='Ć'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_184426.png' : returnValue ='Ę'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_192280.png' : returnValue ='Ń'; break;
            case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/cap_1_194542.png' : returnValue ='Ó'; break;
    }
    return returnValue;
}

function GetImgNumber(receptors)
{
    var returnValue =0;
    switch(receptors)
    {
	case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/slowa/slow_1_712.png' : returnValue =1; break;
	case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/slowa/slow_1_1426.png' : returnValue =2; break;
	case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/slowa/slow_1_2142.png' : returnValue =3; break;
	case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/slowa/slow_1_2860.png' : returnValue =4; break;
	case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/slowa/slow_1_3580.png' : returnValue =5; break;
	case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/slowa/slow_1_4302.png' : returnValue =6; break;
	case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/slowa/slow_1_5026.png' : returnValue =7; break;
	case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/slowa/slow_1_5752.png' : returnValue =8; break;
	case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/slowa/slow_1_6480.png' : returnValue =9; break;
	case 'http://www.kaspersky.pl/mag/pcwk/images/captcha/slowa/slow_1_7210.png' : returnValue =10; break;
    }
    return returnValue;
}