// ==UserScript==
// @name           Kaspersky.pl Captchar Killer (CHIP)
// @namespace      kaspersky
// @include        http://www.kaspersky.pl/mag/chip/kav2009.html
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
			var captchars = $("img[src*='cap_']");
			var capText='';
			$("img[src*='slow_1']").each(function(){capText+= GetCapchar(captchars[GetImgNumber(this.src)-1].src);});
			$("[onpaste*='return false;']").attr('onpaste','return true;')
			$("input[name*='kod']").attr('value','KAV2009-377333');
			$("input[name*='captcha']").attr('value',capText);
			$("input[name*='zatwierdz']").attr('value','Register');
			$("textarea[name*='adres']").attr('value','Wydział do Foresight\r\nul. Wspólna 1/2\r\n00-519 Warszawa 52');
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
    var tmp = imgUrl.replace(/(http:\/\/www\.kaspersky\.pl\/mag\/chip\/images\/captcha\/new\/cap_\d_)/g, "");
    switch(tmp)
    {
            case '677504476014.png' : returnValue ='A'; break;
            case '677512876214.png' : returnValue ='B'; break;
            case '677521276614.png' : returnValue ='C'; break;
            case '677529776214.png' : returnValue ='D'; break;
            case '677538276014.png' : returnValue ='E'; break;
            case '677546776014.png' : returnValue ='F'; break;
            case '677555276214.png' : returnValue ='G'; break;
            case '677563776614.png' : returnValue ='H'; break;
            case '677572376214.png' : returnValue ='I'; break;
            case '677580976014.png' : returnValue ='J'; break;
            case '677589576014.png' : returnValue ='K'; break;
            case '677598176214.png' : returnValue ='L'; break;
            case '677606776614.png' : returnValue ='M'; break;
            case '677615476214.png' : returnValue ='N'; break;
            case '677624176014.png' : returnValue ='O'; break;
            case '677632876014.png' : returnValue ='P'; break;
            case '677641576214.png' : returnValue ='Q'; break;
            case '677650276614.png' : returnValue ='R'; break;
            case '677659076214.png' : returnValue ='S'; break;
            case '677667876014.png' : returnValue ='T'; break;
            case '677676676014.png' : returnValue ='U'; break;
            case '677685476214.png' : returnValue ='V'; break;
            case '677694276614.png' : returnValue ='W'; break;
            case '677703176214.png' : returnValue ='X'; break;
            case '677712076014.png' : returnValue ='Y'; break;
            case '677720976014.png' : returnValue ='Z'; break;
            case '6771191764014.png' : returnValue ='Ś'; break;
            case '6771221762214.png' : returnValue ='Ź'; break;
            case '6771424766214.png' : returnValue ='Ł'; break;
            case '6771445764014.png' : returnValue ='Ą'; break;
            case '6771550765014.png' : returnValue ='Ż'; break;
            case '6771799768214.png' : returnValue ='Ć'; break;
            case '6771844762614.png' : returnValue ='Ę'; break;
            case '6771922768014.png' : returnValue ='Ń'; break;
            case '6771945764214.png' : returnValue ='Ó'; break;
    }
    return returnValue;
}

function GetImgNumber(receptors)
{
    var returnValue =0;
    switch(receptors)
    {       	
	case 'http://www.kaspersky.pl/mag/chip/images/captcha/slowa/slow_1_712.png' : returnValue =1; break;
	case 'http://www.kaspersky.pl/mag/chip/images/captcha/slowa/slow_1_1426.png' : returnValue =2; break;
	case 'http://www.kaspersky.pl/mag/chip/images/captcha/slowa/slow_1_2142.png' : returnValue =3; break;
	case 'http://www.kaspersky.pl/mag/chip/images/captcha/slowa/slow_1_2860.png' : returnValue =4; break;
	case 'http://www.kaspersky.pl/mag/chip/images/captcha/slowa/slow_1_3580.png' : returnValue =5; break;
	case 'http://www.kaspersky.pl/mag/chip/images/captcha/slowa/slow_1_4302.png' : returnValue =6; break;
	case 'http://www.kaspersky.pl/mag/chip/images/captcha/slowa/slow_1_5026.png' : returnValue =7; break;
	case 'http://www.kaspersky.pl/mag/chip/images/captcha/slowa/slow_1_5752.png' : returnValue =8; break;
	case 'http://www.kaspersky.pl/mag/chip/images/captcha/slowa/slow_1_6480.png' : returnValue =9; break;
	case 'http://www.kaspersky.pl/mag/chip/images/captcha/slowa/slow_1_7210.png' : returnValue =10; break;
    }
    return returnValue;
}