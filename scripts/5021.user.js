// ==UserScript==
// @name            Monkeyspaw Console
// @namespace       http://security.tippingpoint.com/
// @include         http://*
// @exclude					http://www.dnsstuff.com/*
// @exclude					http://*.netcraft.com/*
// @exclude					http://*.siteadvisor.com/*
// @exclude					http://*.hostip.info/*
// @exclude					http://www.castlecops.com/*
// @exclude					*.js
// @exclude					*.css
// @description			Provides data about the current website by asking a bunch of other websites.
// @author					Tod Beardsley, Tippingpoint
// ==/UserScript==

/* Shoutz to Mark Pilgrim and his most excellent implementatons at:
   http://diveintomark.org/projects/greasemonkey/ and his
   _Greasemonkey Hacks: Tips & Tools for Remixing the Web with Firefox,
   published by O'Reilly, ISBN: 0596101651. (Tip: use BookBurro
   [http://www.bookburro.org] to find the best price!) */

/* Notes on usage:
	If you find the Console portion annoying, you can make it invisible by setting
	the MonkeyspawConsoleOpacity to '0.0'. All the accesskeys will still function.
	This is typically how I use it myself.
	https:// sites are not @included by default just to be friendly -- turn 
	it on if you like.
	Bugs and large Paypal donations should be sent to: todb@planb-security.net
*/	
   
(function() {	/* Wrapping it all up in one big anonymous function helps stay 
							out of the way of other scripts. */

var MonkeyspawDataBoxArray = ['IP Query','DNS Lookup','Server Info','Report'];
var MonkeyspawConsoleOpacity = '0.90';
var MonkeyspawDataBoxOpacity = '0.90';



// Might not ever use this, but it's handy to have around. From BookBurro.

function str2xml(strXML) {
	//create a DOMParser
	var objDOMParser = new DOMParser();
	//create new document from string
	var objDoc = objDOMParser.parseFromString(strXML, "text/xml");
	return objDoc; 
}

/* Here comes a big ol chunk of data. Don't worry, it's harmless. :)
   Skip by ctrl-f'ing to "SKIP TO HERE" */
	var MonkeyImg = 
 "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%3C%00%00%00F%08"
+"%06%00%00%00%90E%F7%D5%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00"
+"%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D6%06"
+"%16%01%13%1B%18%C9J8%00%00%18VIDATx%DA%ED%9BK%8C%1C%F7%9D%DF%3F%FFzt%BD%FA"
+"%FD%98%99%1E%F6%0C%C5!5%7C%89%22%95P%0F%0Ak%2F%10%E5%60%1Fl%F9%E0%00%7Bp.%"
+"DE%05%16%06%7C%0A%84%0D%82%3C%0E9%C4%F7%DC%12%C0%40r%F3u%B1%06%24%C4X%AC%D"
+"7%D4BthS%16)%3ED%8D%C8!9%E4L%CF%F4%BB%BB%FAQ%D5U%95C%F7%BF%A68%A4V%A4E'p%B"
+"0%0D%FC%D1%3D%DD%D3%5D%FF%EF%FF%F7%FD%BD%7F%05%FF%F4%F8%A7%C7%FFW%0F%F1%FF"
+"%E0ZO%BBf%F4%25%AF%FF%E8%00'A*%07%9E%0F%02N%AE0%F1%FA%8F%02%B0H%2Ce%BE4%40"
+"%9D%2F%F9%1E%09%80!%10%24%96%FC%FB%85%02%17%7F%40%B0%12%9C%06%A4%0E%2C%09%"
+"9E%04%B0)%E0%03%DE%7C%F9%F3%15%BCH%89%3F%1F%E0i%B4%0D%2C%3D%F5%B3(%DA_%D3)"
+"%F8%3Ex%1E%8C%C70%1A!%86C%18%8Df%7FO%260%9D%CE%C4%AF%AAh%BA%8E%9AJ%A1Y%16%"
+"8Ai%82m%13Y%16%A1a%10%1A%06%81%AE%13(%0A%A1%10%84%E2%C9-%87%CF%01A%7B!2%95"
+"%40%C3p%06%D6%F3f%E0%5C%17%FA%7DD%BF%0F%FD%1E%F4%070%1A%22%26%13%94%20%40%"
+"05R%BA%8Ee%18%D8%B6%8D%E38%A4%D2iToB%E8%FB%F8%8E%83O%C4%84%88%91%9Eb%A8(x%"
+"C0T%88%C7%40*%CF%01Z%7B%A1%60%7D%7F%26%C1%E1%10z%3D%E8t%10%ED6t%DA%D0%ED%2"
+"2%FA%7D%C4p%88%EA%FB%A4%00K%D7%C8%98%16%85t%9A%0AP%D242)%1Dm%AC%11i*SM%C1S"
+"%15%FA%AAJKQh%08%8D%06%0A%7D!%98%CCu%E0yA%BF%18%C0I%B0%FD%FE%0Ch%B3%09%CD%"
+"264%1B%D0j%CD%00%0F%87%E8%9E%87%A5(dM%83%92%96a%D1H%B1%E2%D8%14G.%E3%CFn%1"
+"2%8DF%2C%1F%3D%8A%BE%B0%88%91%CD0%0AB%9C%E3%C7iV%AB%DC%0B%15%EEh%0A%F7%A3%"
+"88%86%10%B8%07%40%8BgP%F2%AF%A7%C3I%B0%A3%11%0C%063p%7B%7B%88%DD%3A%EC%EE%"
+"125%1A(%9D%0E%8A%EB%92%0A%02%1C%5D%A3%9C%C9%B0R.%F3R%3E%8F%D1lr%FF%EA'lnn%"
+"E2%FB%3E%D9l%96t%3A%8D%AA%AA%B8%AEK%A7%D3%A1T*%F1%2F%FE%EC%CF8%FA%FD%7F%C5"
+"%E7%B9%1CW%85%C2gBa%1B%9E%00%1D%FE%C1%00'%0D%D4x%BC%0Fvg%07%B1%B3%0D%DB%DB"
+"D%BB%BB(%ED6%CA%D0%C5%08C2%A6I%B5X%E4%F8%E2%22%DA%F6%23%1A%1B%1B%3C%7C%F8%"
+"90F%A3%C1d2!%9B%CD%E28%0E%83%C1%80%5E%AF%87%AA%AA(%8A%82%10%02!%04g%CF%9E%"
+"E5%2F%7F%F2%13%3E%7F%F5%2C%97%10%5CG%B0%03%0C%13%40%BF%CA%94%7F%3DJK%23%25"
+"%A9%3C%97.%3B%3BD%F5%3A%A2%D1%40%19%BA%A4%C2%90%9C%E3%B0R%A9pba%01%ED%DE%2"
+"6%BF%F9%E8%23%5C%D7e0%18%E0y%1E%BA%AE%E3%FB%3Ea%18%12%86!%FD~%1F!%04%A9T%0"
+"A%C30%98L%26%5C%BAt%09%EF%AF%FE%8A%3F%FFo%FF%9D%D7%0E%BF%84%2B%60%14%CD%7C"
+"%D7%E4%19%B7%AC%7C-%BD%0D%82%7D%8B%DC%EBA%B3%89h%EC%11%ED%ED%CD%5E%F7%7Bh%"
+"9EG%C60X%A9T8%5D%2C%D0%B9%F4%11%1F%FD%EAW%EC%ED%ED1%1A%8D%98N%A7%18%86%81%"
+"A6i%98%A6%89%10%02%C30P%14%850%0C%F1%3C%8F%F1x%8C%10%82%D1h%C4%E5K%97%F8%A"
+"F%FF%FA%07%D4v%B6Y%07%CA%02%8C%84S%17_A%5B%E5k%1B%AA%C9dF%E7N%07%DA-%A2f%1"
+"3%DAm%C4%A0%8F%EAyX%9A%C6b%A1%C0z.%C7%A3%7F%F8%07666%E8t%3A%F8%BE%CFd2%C10"
+"%0CJ%A5%12%85B!%06%9AJ%A5%B0m%7B%06%40%08%82%20%20%08%024MC%08%C1%8D%ABW%F"
+"9%F0'%FF%855%22%AA%80s%00%C8%8B%05%2CuWJ%D7uc%17D%BB%3D%7B%EE%F7%11%E31%3A"
+"%90s%1CV%17%16%18%7D%B1%C1%C6%C6%06%CDf%93(%8A(%14%0AT*%15%0A%85%02%BA%AE%"
+"A3i%1A%A9T%0A!%04%9E%E7a%DB6%A9T%0AM%D3%88%A2%08!%04%8A%A20%9DN%F1%7D%9F%F"
+"F%F5%D7%7F%8Dy%ED%1A%87%80%FC%3C%7C%13%2F%9C%D2%07%C1%8EF%FBn%A83%07%DB%EB"
+"!%C6%23%D4%20%C0L%A5(%17%0A%94FC%EE%DC%B8%11S%D8q%1CL%D3%24%9B%CDR%2C%16%0"
+"9%82%80%5E%AFG%B3%D9d8%1C%E2%BA.%BE%EF%A3i%1A%9A%A6%A1%EB%3A%AA%AA%22%84%2"
+"0%8A%22R%A9%14%BD%5E%8F%ED%1B7X%99%D3%DAJ%D0%FA%C5%EAp%D2P%0D%063%FF%DAn%C"
+"F%0CV%A7%83%18%0E%11%BE%8F%A6(%A4%1D%87j%B1%C8xw%8F%F1x%8C%AA%AA8%8E%83a%1"
+"8%A4%D3i%C20d2%99%CC%CF2%A2%DF%EF%D3h4%18%0C%06%0C%06%03%26%93%09%E9t%1A%C"
+"B%B2b%9DV%94%D9%96u%5D%E7%D1%87%17Y%0E%03%16%E7%B4~%F1%80%C3P%3Ca%A8%DA-h5"
+"%89Z%AD%B9t%C7%E8Q%84m%9A%94%0B%05%D6%0Ay%18%8F%B0%2C%8Bt%3AM6%9B%25%9B%CD"
+"%92J%A5%C8d2%B1%A1%02P%14%05%DF%F7%19%8DF%B1%84%97%97%97YZZB%D7u%2C%CB%C2%"
+"B2%2C%7C%DFGQ%14%3E%FC%DB%BF%A5y%F1%22%A59%60%ED%19h%FD%3CnI%3CA%E7%5E%0FZ"
+"%AD%19%D8n%171t%D1%82)%96iR.%16Y%5BZ%A2%AC%E9%D4%85%60%3A%9D%12E%11%8A%A2%"
+"90%C9d(%14%0Ad2%99%99%11%9A%D3%3D%9B%CD2%9DNc%60%F9%7C%9EW%5Ey%85F%A3A%AF%"
+"D7%23%08%02%C6%E31%B6mcY%16Q%14%E1%BB.%F63%82%7D~%3F%9CL%10%C6c%18%BA3Z%F7"
+"z%08w0%8B%915%8Db.%C7%F1%A5%25%8E%A9%0A%25U%E1%9Dw%DE%C1%F3%3Cn%DD%BA%15Ky"
+"aa%01%C30%10B%B0%B0%B0%40%BD%5Eg2%99%F0%F2%CB%2F%93%CF%E79r%E4%08%D5j%95%D"
+"5%D5U%EE%DD%BBG%B7%DB%C5u%5D%BA%DD.A%10%A0%EB%3A%BA%AES)%16%E9%FF%C1%00K%D"
+"0A0wI%DE~%CA%E7y%A8Q%84mYTK%25%8E%09X%2B%97%A9%D5j%E8%BA%CE%D9%B3g%F9%E2%8"
+"B%2Fb%09*%8A%82i%9A%E8%BA%CE%F1%E3%C7%B1m%9B%AD%AD-%1C%C7%E1%FC%F9%F3%9C%3"
+"Au%8AR%A9%84%A2(h%9AF%A7%D3%E1%DA%B5kL%26%13%C20%C4%B2%2C4MC!%22%05%A8%02%"
+"94%E8%AB%E3%E9%E7%97%F0c%16%3B%8C-%B7%98%EB%A0e%9A%1C%B2%2C2%9AF%A5R%A1R%A"
+"9%10%04%01%8E%E3%B0%B2%B2%C2d2%C1%B2%2Cr%B9%1C%AA%AA2%1E%8F%09%82%803g%CE%"
+"F0%EDo%7F%1B%CB%B2%08%C3%90L%26%13%FB_UU%A9%D5j%D8%B6%CDh4%A2%5E%AFs%E7%CE"
+"%1D%3C%CFcsc%03%FB%AD%B7I%3D%C5%17G_%1B%B0%10%B3%A5(%A0%AA%A0%E9%A0%CF%96%"
+"D0t%94%B9%CB%B0%0C%83%DAr%95%7C%3E%CF%EE%EE.%5B%5B%5B%D4j5*%95%0A%EDv%1B%D"
+"B%B6%C9d2%A8%AA%1A%BB%A7%13'N0%1C%0E%09%C3%90%5C.7%FB%1D%CBb8%1C%12%04%01%"
+"B5Z%8D%AD%AD-%A6%D3)7o%DE%A4%DDnS%AF%D71%86C%0C%22R%88%B8v%14%BE0%2B-%C1j%"
+"1A%18%06X%168%CElY%16%22%95B%99%07%0A%CDf%93%ED%EDm%AE%5C%B9%82%10%02%C7q%"
+"B0%2C%8B%E9tJ%BF%DFgoo%8FN%A7C%14E%2C..%D2j%B5%98L%26%D4%EBu%3E%FA%E8%23%3"
+"C%CF%C3%B2%2C%CA%E52B%08.%5E%BC%C8%FB%EF%BF%CF%E6%E6%26%EB%EB%EB%D4j5%DA%E"
+"D6%3B%B7o%93%8A%22%B40DD%D1W%A6%87%CF%23%E1(%06%AC%EB3%B0%E94%E4%F2%88%7C%"
+"0FF%23%22!%08T%95H%D7%C9%15%0A%E4r9VVVx%FD%F5%D7%D9%DC%DC%8C%A5%D5%EDvc%1D"
+"L%A7%D3d2%19%5C%D7%E5%A7%3F%FD)%ADV%8B%DD%DD%5D%86%C3!%DF%FF%FE%F7%B1m%9B%"
+"87%0F%1Fr%ED%DA5.%5D%BA%C4%D5%ABW%F9%D1%8F~D%B9%5Cf0%18%10E%11Z%10%A0G%A0%"
+"22%10%8AB4g%A2xJ%DD%F7%F9)%AD%AA%FB%80s%B9Yuc%E8%C2xL%14%86xQH%23%98%D2%E8"
+"%F7%B1%F6%F6%B0m%9BV%AB%85%AA%AA%D8%B6M%10%04%00%F8%BE%8Fi%9Ad2%19%F2%F9%3"
+"C%00%AE%EB%F2%E0%C1%03l%DBfcc%83%C9d%82i%9A4%1A%0D._%BE%FC%C4%01%05A%C0'%B"
+"F%FD-%FF%BC%DBE3LtEEU%D5Y%FDKQf%A0%0F%00%7F%5E%C0Q%2Ca%D3%84L%26.%E9D%C3!%"
+"C1x%CC%C8%1DP%EF%0F%B8k%18%A4%FB%7Dl%DBfgg%87%AD%AD-z%BD%1E%8E%E3%A0i%1A%B"
+"E%EFs%FB%F6m%06%83%01%E7%CE%9Dcmm%8D%1F%FF%F8%C7%7C%F8%E1%87%D8%B6%CD%B7%B"
+"E%F5-%8A%C5%22%BA%AE%F3%E6%9Bor%EC%D81%AE%5C%B9%C2%E9%D3%A7)%16%8B%5C%BDz%"
+"15%CF%F3%F0%3C%0Fm2%C1%98%06%D8%AA%8A%AD%A7Pt%9D%A9%A6%CD%D8%26D%2Ca%F1%7B"
+"%B9%25)e%A9%C3%E94d%B3D%99%2CA%A7%C3h0%60%AF%DFgCU1%F5%14%A9V%8B%94%AA%D2%"
+"EB%F5%E2%FCVUU%86%C3!%8DF%83z%BDN%ADV%E3%9Dw%DE%E1%FC%F9%F3%1C%3Dz%14%DB%B"
+"61MsVs%98N%C9f%B3%94J%25%CE%9E%3DK%10%04%FC%E2%17%BF%E0%FA%F5%EB%B3%02%81%"
+"AA%22%26%13*%C1%90UU%C32L%FA%A6%89k%18%8C%84%60%2CD%5C%F4%8B~%2FJ%1F4%5E%B"
+"A%0E%A9%14%A4tBMc%12%86t%FA%036%C7c%A2%20%40_Ya%3D5%A3%B0L%F7%E4c0%18%E0%B"
+"A.%BF%FE%F5%AF9v%EC%18%EB%EB%EB%2C..%C6%A1c%10%04L%A7S%82%20%60oo%8Fb%B1%C"
+"8%EE%EE.%9F~%FA)%9DN%07%D34%19%0D%068%AD%16'%2C%8B%AC%F0iG%11%1D%01mM%A5%1"
+"1%AA4%15%85%9E%10%8C%E7%A5%A0%DF%2F%F0HF%5D%B2%10%10%04DA%40%E0%FB%8CG%23Z"
+"%83)J%10%905M%96%8E%AE%11%86!%B6m%A3(%0A%BA%AES%AF%D7%09%82%80%C9d%C2%BD%7"
+"B%F7h6%9Bx%9E%C7p8%C44%CD8%A6%06%F0%3C%8F%5E%AF%17'%0D%B6m%C7%E9%E2%BD%CDM"
+"%FE%F3_%FC9%D5j%95%D2%91%23%94%D7%8F%F3%2F%FF%E4Oh%1E%3D%CA%A3(%E2%3E%11%0"
+"F%81%26%D0%7F%C6%04c%FF%F1%1F%FE%D3%7B%84a%9A%E9t%96%F8%8FF%FB%D9R%B3A%D4l"
+"%12%B5%DB%E0%0Ef%91%97%10d%1D%87%95r%09%3B%0CQ%80%F1x%8C%EF%FB%8C%C7c%1C%C"
+"7aii%89t%3A%CD%D1%A3G9y%F2%24%96e%E1%BA.%E3%F1%18%CF%F3%E2J%87%EF%FB%E8%BA"
+"N%AF%D7%C3u%5D%84%10%BC%FD%F6%DB%E4r%B98X%E9%D4%EB%5C%FC%9B%BF%E1%FD%FF%F9"
+"%3F%D0o%5C%E7%DC%E2%02%EB%2F%BDD%5E%11d%85%C0%16%CF%0Ex%D6%23%FA%F7%FF%F1%"
+"3D%A6%D34%9E7%B3%CE%DD%EE%AC%94%B3%B7%0B%BB%BB%B3zV%B7%8B%18%8F%D1%A2%88%B"
+"4%E3P%ABT%A8*%0Aw%AF_gww%97%C9d%C2t%3A%C5u%DD8%08YXX%A0%D5j%B1%BA%BA%1A%5B"
+"p%80T*E%BB%DD%8E%7D%F2%600%60ee%85%A3G%8Fb%18%06%EB%EB%EB%BC%F1%C6%1B%14%8"
+"BE%8A%C5%22%2F%BD%F4%12%87%0F%1FF%D7u%3E%BF%7D%9BO%FF%EE%EF8%A1%EB%5Cx%F9e"
+"%AA%A6A%F6%19%25%BC%DF%14%FB%B7%FF%EE%DF%E0yi%5Cw%1F%ECn%1D%EAu%A2%DD%5DD%"
+"BB%85%E2%0E%D0%A6Sl%D3d%B1%5C%E6du%89%D1%DD%BB%EC%EE%EC%E0y%5E%9C%12%06A%4"
+"0%B3%D9dgg%870%0C)%95Jq%B6%24%E3g%09ZJ%FB%93O%3Ea0%18P%AF%D7y%FD%F5%D7%09%"
+"C3%90%DF%FE%F6%B7%2C..%C66%A1Z%AD%B2%B6%B6F.%97%23%0CCn%7C%FC1w.%FE%8A%D7T"
+"%95oD%E1W%EAp%B2%03%A83%1A%C54%A6%D1%40%D4w%F6%2B%94%AD%16%CA%C0E%0D%02%2C"
+"%D3%A4T%2C%B2V%ADR%D6S%DCm4%10BP%2C%16%A9%D5j%2C--%B1%B7%B7%87eY%DC%BAu%8B"
+"%DB%B7o%03%90%CB%E5X__G%D34%C6%E31%00%7B%7B%7B%EC%ED%ED1%99L%B8y%F3%26%97."
+"%5D%E2%BD%F7%DE%23%9B%CD%F2%F9%E7%9F%E3y%1E%D5j%95r%B9%1CS%5B%D342%99%0Ckk"
+"k%B1'%F8%E5%2F%7F9%2B%19%3Dc%17P%07Lz%3DA%BF%BF%2F%D9%9D%1D%A2%9D%9DY9%B6%"
+"D7E%F5%3D%ECT%8AJ%3E%CF%FA%CA%0A'%1D%9B%CD%FF%FDk%3A%9D%0E%00%F9%7C%9E%7C%"
+"3E%CF%D2%D2RL%BF3g%CE%F0%FE%FB%EF%F3%F0%E1C%3A%9D%0E%9E%E7q%F3%E6M%A6%D3)%"
+"F7%EE%DD%E3%E2%C5%8BT%ABU%DEx%E3%0D%CA%E52%3F%F8%C1%0F%C8d2%5C%BE%7C%19%D3"
+"4%F9%DE%F7%BE%C7%C7%1F%7F%CC%E1%C3%87%B9p%E1%02%BF%F9%CDo%E8%F7%FBx%9E%87%"
+"E38%B4%DB%ED%D8V%E8%EB%EB_%0A%F8%20X%0BH%D3l*%A2%D3%81z%1Dv%EB%FB%B5%E7%5E"
+"%17%DD%F3%B0%0D%83J%A1%C0%F1Z%8DC%BE%C7%B5%BF%FF%FB%D8%C5%C8%DAT%B3%D9D%D3"
+"4%16%16%168%7C%F80'O%9E%24%08%02._%BE%CC%F6%F66%BD%5E%8Fs%E7%CE%C5%87%B2%B"
+"E%BE%CEh4%E2w%BF%FB%1D%A7O%9F%E6%EE%DD%BB%DC%BAu%8B%E9t%CAw%BF%FB%5Dvww%B1"
+"%2C%8Bj%B5%CA%A3G%8F%F8%F8%E3%8F%E9%F7%FB%94%CBe%1C%C7%E1%9B%7F%FA%A7%BC%F"
+"A%F6%DB%88%97%D7%B9%F3%8FH%F8%20%D8%2CP%10%DB%DB%0A%ED%F6%3E%D8f%13e%D0G%F"
+"7%7D%1C%C3%60%A9Xd%BDV%A3%3A%19%B3u%EDZ%5C%C7%B2m%9BB%A1%C0%A1C%87XXX%40%D"
+"3%B48%99w%1C%87%D7%5E%7B%8DN%A7%C3%C6%C6%06%9F%7C%F2%09%8F%1E%3D%22%97%CB%"
+"91N%A7%19%0C%06%DC%BCy%93%20%088%7F%FE%3C%5B%5B%5B%18%86%C1%BB%EF%BEK%BB%D"
+"D%E6%83%0F%3E%E0%3B%DF%F9%0E%99L%86%9F%FD%ECg%7C%F0%C1%07%5C%B8p%81w%DF%7D"
+"%97%B7%BE%F9M%FC%7C%9E%AEi%F2%10A%FDK%FC%B0Ht%ECM%20%03%14%81%05%1E%3DTh%B"
+"7g-%94%D6%CC%40%A5%C2%90%8Ce%B1T*q%B2V%A3%EA%7B%DC%BD~%1D%CF%F30%0C%23N%FF"
+"%2C%CB%8A%2B%8F%99L%06M%D3PU%15%DF%F7%E36%CA%CA%CA%0A%E7%CE%9Dcee%85%07%0F"
+"%1Ep%E3%C6%0D%86%C3!%F9%7C%9E%E9t%CA%C5%8B%179r%E4%08%C7%8F%1F%A7%D9lr%EB%"
+"D6-L%D3%24%97%CBq%EF%DE%3D%EE%DE%BD%CB%AB%AF%BE%CA%0F%7F%F8C%CE%BF%F1%06z."
+"%C7X%D7%99%20P%80%F4S%00K%B0*%B3%82~%1A(%00%15%A0%CA%A3GJ%D4%E9%A0%B4%DB%A"
+"8C%17%23%8A%C8%D96%B5J%85W%0E%1D%C2j5%D9%FA%E2%0B%06%83%01B%88%B8%F0%B6%B8"
+"%B8%C8%C2%C2%02%B9%5C%8E%7C%3E%FF%18%60%D34%D14%8D0%0C1M%93%13'NP%2C%16I%A"
+"5R%94J%25%06%83%01%A6iR*%95(%16%8B%D4%EBu%3E%FB%EC3z%BD%1E%8DF%83%23G%8E0%"
+"1C%0E%B9r%E5J%9CK%17%0A%05%14UE%09C%9Cy%85%C6%8A%22Ra%F8T%C0%EA%BC%AEm%CF%"
+"A9%5C%02%16%81%A5%A8%BE%A3%8A%81%8B%E2%BA%18%8A%A0%90Nsdi%893%87%96Yp%5Dn%"
+"3Fx%10oP6%C6%96%97%97%E3%CA%A3%2C%BE%01%04A%40%18%86%8C%C7%E3%B8%CE5%99LPU"
+"%15%5D%D79u%EAT%CC%880%0C%99Ng%3DB%C30XXX%608%1C%D2%EDv%19%8F%C7%7C%FA%E9%"
+"A74%9BM%DEz%EB-%8E%1C9%C2%EE%EE.%95J%85%B2%A6%E1%A8*%26%82%AC%D8%9F%B5x%1A"
+"%95%AD9%95K%C0%C2%1C%F0%02%AD%B6%10%DE%04%3D%8A%C8%DAi%0E%2F.%F2%CFVWXS%14"
+"6vw%F1%7D%9FJ%A5%82i%9A%14%E6%F9p.%97%23%93%C9%60%18%06%AA%AA2%1A%8Dp%5D%9"
+"7B%A1%10%EB%B3l%8F%EEW%83%C3%B8%DB%107.%E71u6%9B%25%0CC%1E%3E%7C%18%97%80%"
+"00%1C%C7%E1%ED%B7%DF%E6%F8%F1%E3%08!%B8~%FD%3A%DB%DB%DB%AC%AF%AFc%D96z*%85"
+"%A9(OHX%99K%D7%99w0%CAs%C0%15%A0%A8%B8%03E%13%02%C7%B2%A8%96%CB%9CY%5E%E6%"
+"94ms%F3%FAu%B6%B6%B6%D0u%9D%20%08H%A7%D3%B3%0B%CDk%C8%92%C2A%10p%F8%F0a%B2"
+"%D9%2C%BA%AE%C7%D2%8B%A2%08UU%E3%F6h4%8F%D7%83%20%98%95b%7D%FF%B1%03%08%82"
+"%80j%B5%CA%C2%C2%02%AA%AAR%AF%D7%A9T*%AC%AE%AE%C6Y%D6%C9%93'%F9%F9%CF%7F%C"
+"Et%3Aeii%89T*%F5%84%1F%3E%A8%BB%C59%D0%CA%FCuV%F5%7Da9%0E%E5B%81c%CB%CB%AC"
+"%1B)~w%E5%0A%0F%1E%3C%88%DB%22%CB%CB%CB%AC%AE%AEb%DB6%B6m%C7%EE%C8%F7%7D%D"
+"6%D7%D7%D1u%3D%A6%A8%DC%84%EC%FF%CAV%8Al%99%CA%C3H%82U%14%05UUI%A5R%B1%84W"
+"WWQUuV%C5%9C%F7%9Ft%5D%E7%E5%97_%26%9DN%C7y%B5%A7%AAOPZZfi%ACJ%F3%E7%1C%60"
+"%1B%9A%26%8A%B9%1C%C7%0E%1D%E2%95%B4%C3%9D%CF%3Ecss%93%5E%AFG%B9%5C%26%97%"
+"CB%C5%86*%08%82%B8-%12%86!%87%0E%1D%C2%B6%ED%98%DAB%88%98%C6%12%A8%04%2B%E"
+"9%2B%0B%F7%F2%FF%14E%89%97%2C%ECK%A6%24%E9%2F%0F%CB4M%1C%C7a%1A%048%99%0C%"
+"A1a%C4%80%C5%01%83%95%9E%83%94%CB%06%8C%7C%26%C3%91%E5e%5EYZ%C2%AB%EF%C4z%"
+"94%CDf%E3N%E0%A9S%A7%E2%0B%0E%87C%0A%85%02'N%9C%C0q%9C%18h2%2F%96%14%96FLJ"
+"MJU.9%09%20%0FEJT%F6%A5%82%20x%0C%B4l%C7*%8AB%26%9D%C6%ED%F7%11%BA%FET%A3%"
+"A5%CF%A5l%CFu%D9%9A%D3%5C%5B*%97%C4%A9%A5E%ECV%93%87%3B%3B%2C%2F%2FS%2C%16"
+"%B1m%9Br%B9L%B9%5C%E6%D1%A3G8%8EC.%97%8B%A3)%5D%D7%9F%A0%A6%7C-uT%D2W%1E%9"
+"6%A4%A7%04%9B%D4k%19%B9%25-%B8%B4%01%12%B8%2C%16%023%BD%16%82A%B7%FBT%A3%2"
+"5%23%2Cc%BEt9.%B8%98%CB%F1j.%87U.%E3O%26%E8%BA%CE%F6%F6v%7C%D1v%BB%CD%F6%F"
+"66%AF%BC%F2J%7C%18%D2%8A%CA%0DJ%E9%267%1CEQ%ECv%A4%FF%3E(Q%F9%5DIa%D9M%94%"
+"85%FA%A7%A9E%A7%D3%89%7D%BCe%DB%8C%C6%E3'%24%9C%0C%3C%0E%CEE%8A%BC%93%C6%C"
+"9%E6%98%F4%BA%7C%F1%C5%17%E8%BAN%ADV%A3%5E%AF%D3n%B7%09%C3%90%DB%B7o%D3l69"
+"v%ECXL)I%5D%A9_%B2%AE%25%DD%CDt%3A%7DL%A7%93%FF%2F_%CB%CF%93*%90%9C%0A%10%"
+"F3%86%9D%3C4UUc%3F%1F%04%C1l%D2%AFTzj!%5E%3Ce8T%00%C2%D054s6%96%D0%EB%F5bw"
+"Q%AB%D5%D04%8Dn%B7%CBh4boo%2Fnj'kYR%1A%B2%AB%2F%8D%93%0C6%24-%93%BA(%DF%93"
+"R%97%92%95y%B3%FC%5ErJ%40%16%0B%A3(b4%1A%C56AU%D5%AF%EC%3C%3C%D6%90S%85BJ%"
+"88%C7%CA3%8E%E3%C4%C9%BC%3C%F5%5E%AF%C7%EE%EEn%7C%E2I%09%A5R%A9X%D2%12%AC%"
+"3C%10%B9a%B9%24X)YY%DF%92%92MJ79%DE%24%07dt%5D%A7%DB%ED%CEl%84T%AD%E7-ZFQ%"
+"84i%9A%0C%06%036771%0C%03%CB%B2p%1C%870%0CYZZ%A2%D1h%D0n%B7%E3%C4%40%1A%9C"
+"%E4tNR%2F%93%C6IJC%82%91%40%7D%DF%7F%CC%60%C9%F7%A5%1D%90%BF%9B%04%5D%2C%1"
+"6c%26N%E7%5E%E09G%1E%04%EA%3C%DBQU%95%A5%A5%25%3A%9DN%3C%BB%01%90N%A7)%97%"
+"CB%F1%85%92%A5%1A%B9%A9%24%FD%92%E5%1C%F9%BE%94%A8%04%25%5D%D6A%CA'%A5%9B%"
+"F4%D3%F27d%83%CEu%5D%C20%FC%CAf%DA%13%23%FB%11%11%C1%DC%E2%02%B4Z-%2C%CB%8"
+"A%07%CB%E4%CAd2%0C%06%83%98%BAr%0E%EB%60%9C%9C%04%25%25%954LR%EF%25S%92%DF"
+"9%18l%1C%FC%5C%D7u%16%16%16%A8T*4%1A%0D%A6s%7B%F3%2C%12%8E%1Es%D4aH%B1X%E4"
+"%CC%993%B1%F1%0A%82%80%E5%E5%E58Y%90%C6%2C%8E_%E7%60%A5EN%1A%23y%08%D2u%C9"
+"%0DGQ%84%E7y%B1ON%EA%EC%D3%D5m%3FH%91%87%A6%EB%3Akkk3%16%BA.Q%10%FC%A3%80%"
+"A3'%FF%16%04s%3F%F9%D6%5Bo%91N%A7%E3j%E3p8%A4T*%C5%5DA%19%F6%C9PRZV%99%07%"
+"CB%038%98%3C%24%F55%B9%F9%83%01%8B%B4%0DII%CBP4%19%8E%16%8BE%84%10%3C%7C%F"
+"8%90%E9%C4%7B%FE%B1%251%DF%C8%E2%E2%22'O%9E%24%9B%CDR(%14p%1C%87%9B7o%12E%"
+"11%AF%BD%F6%1A%95J%05%C7q%1Es%23%C9A3%C9%029y''x%3C%CF%7B%8C%01I%1D%3D%982"
+"J5H%FAki%F0%A4%84%15Eamm%8Dv%BBM%D0%ED%3C%3F%60iaUU%E5%DC%B9s%94%CBe%0C%C3"
+"%60kk%8Bt%3A%8D%A2(%B4%DBmN%9F%3E%CDh4%8A%7B%B8R%D2%B2_%94%DC%B0l%ABH%2B%9"
+"B%B4%DAI%7DM%82%3D(%DD%A47x%AC%01%AEi%F1X%E3%F6%F6%F6W%02%0E%93Ke6%CB!%2F%"
+"24%BBz%DDn%97%E9tJ%B5Z%A5V%ABQ%2C%16Y%5C%5C%8Cu%5C%0E%B1%C8%40D%1EZ20%91T%"
+"97%CF%C9P%F1iK%82%3E%A8%C3I%81HIk%9A%C6%EA%EA*%F7%EF%DF%7F*%E0%E8%C0%9D%26"
+"r%F9%86P%225q%E22%00%E8%F5z%1C%3F~%9Co%7C%E3%1B%BC%F9%E6%9B%14%0A%05%EE%DC"
+"%B9%83i%9A4%9B%CDx%9CA%EA%AC%D4%5BI%E7%A4%1B%3A(%A9%2F%03%9Ed%5B%D2%AF%1Fd"
+"%82%CC%C7s%B9%1C%CB%CB%CB%8F%01N%02%95%23%C8%A3%F9%FC%F5%00p%B5T*J%1A%8C(%"
+"8A%B8%7F%FF%3EG%8F%1E%E5%C2%85%0B%F1%E0X%B5Z%25%08%02677%B9w%EF%1E%C3%E1%F"
+"01%9DMZ%E3%83%D1%D5%D3r%DBdR%90%CC%A8%0E%1E%824t%C9%3C%3A%F9%5B%87%0E%1Dz%"
+"2C%D2%92%80%FD9%D0%1E%D0%9E%7B%23%1B%D0l%C7%0E%8DT*%BE%60%AF%D7%A3P(%90%CF"
+"%E7%E3%E0%BD%D5j%C5%83e%1B%1B%1Bq.%7C%10H%D2%20%1D4D%07i%9A%94%F8%D3%AA%20"
+"%D2%CA')-%BF%23-%BD%A6%EB%98%A6%F9%84%84%A7%C0%18%E8%02%7B%C0%23%E0%3E%B0%"
+"09%DC%CD%E4%0B%81%0C%CA%E5F%0A%85%02A%10%F0%F9%E7%9F%C7%A3%BF%AE%EBb%DB6%8"
+"B%8B%8BL%26%93%C7%24t%D0g%1Et%2F%07cc%F9%FFI%16%1C%0CX%92if%D2%A8%25%93%0D"
+"i%B5%B5%03%B7%0AL%E7%14%96%92u%E7%D2%D5%015%5D*%05%BA%BE%9F%E9%A8%AAJ%AB%D"
+"5B%D7u%26%93%09%AE%EB%92%C9d%E8t%3A8%8E%83%EF%FB%14%8B%C58%F08%18%0AJ%1A%C"
+"A%0D(%07%ACp2(%89%E4%F7%13%EE'%C9%96d%95D%86%A31pU%9D%CDn%05%C1c%94%0E%13%"
+"80%99%EBp%3BY%00P%CB%E5ij%3C%8A%A7%00d%B2%DEl6)%95J%F1%BC%86%E38%0CF%23VO%"
+"9C%A0%94%CB%A3%08%08%A6S%94h%16%9A%0E%7D%9Fp%BEyi%F5%95%C4%92%00%83(%22%8C"
+"%22%029%A7%9D%A0%7C%14%86(B%A0%09%81%A1%AA%A8%8A%822O%13%95(%C2%0F%02%A6A%"
+"40%A4%AA%8C%E6%BF%A5%1D(%E2Es%83%E5%CD%C1%8F%E7%D9T%7Cc%E4%F5%85%C5%20%3B%"
+"F5%C8D%11Z%18!%88%B0%AA%CB%2C%87%B3xW%D7t%5C%DBB(%0A%EEx%C2%A0X%E4%BE%A6a%"
+"85!%9A%A2%12%CC%C7%0Ez%11XB%90%16%02%5D%80%26%C4%FE-%A7s%C1%05%F1%CD%87%82"
+"%A9%60%EE%10e%60%1F%81%A2%EE%F7%83%22P%83%10o%16%7D%10%AA%1AS%3D%85%0B%8C%"
+"85%20%24BO%19%EC(%EAS%07P%1FK%FA%BFdH%F5%CB%DE%8B%12%9FE%FC%DF%BB%3F9%FA%8"
+"A%F5%CC%F7-%89gx%3Fz%86%CF%C53%C6%EB%E2K%3E%7F%D6%EF%C3%1F%F8%86%EB%3F%BA%"
+"C7%FF%01O%8CC%95%40%11%09%E8%00%00%00%00IEND%AEB%60%82";
/* END OF IMAGE SKIP TO HERE*/	

/* BEGIN CONSOLE DRAW */

function InsertConsole() {

	var mDiv = document.createElement('div');
	mDiv.id = 'mDiv-monkeyspaw';
	mDiv.setAttribute('style','position:fixed;z-index:99;bottom:0px;' +
        'right:0px;background-color:#ccfcff;border:2px solid #00fcff;border-bottom:0px; border-right:0px;' +
        'overflow:hidden;width:600px;height:30px; -moz-border-radius-topleft: 1em;' +
        'opacity:'+ MonkeyspawConsoleOpacity +';');
  if (MonkeyspawConsoleOpacity == '0.0') {
  	mDiv.style.visibility = 'hidden';
  }
 	document.body.appendChild(mDiv);
  	
  var ImgDiv = document.createElement('div');
  ImgDiv.id = 'ImgDiv-monkeyspaw';
  ImgDiv.setAttribute('style','position:absolute;z-index:10	;'+
  			'margin:0px;padding:0px;right:0px;top:-7px;');
  
  mDiv.appendChild(ImgDiv);

  var mImg = document.createElement('img');
  mImg.id = 'mImg-monkeyspaw';
  mImg.src = MonkeyImg;
  mImg.width = '60';
  mImg.height = '70';
  mImg.title = 'Monkeyspaw: The Greasemonkey Security Pro\'s Auto-WebThinger';
  ImgDiv.appendChild(mImg);

  var mTable = document.createElement('table');
  mTable.id = 'mTable-monkeyspaw';

  mTable.setAttribute('style','position:absolute;'+
  				'width:600px;height:30px;top:0px;');
  mTable.setAttribute('cellpadding','0');
  mTable.setAttribute('cellspacing','0');
  mDiv.appendChild(mTable);
  
  var ConsoleRow = document.createElement('tr');
  ConsoleRow.id = 'monkeyspaw-ConsoleRow';
  mTable.appendChild(ConsoleRow);
  
	for (i=0; i < MonkeyspawDataBoxArray.length; i++) {

	  var mCell = document.createElement('td');
	  mCell.id = 'monkeyspaw-mCell' + i;
	  mCell.width = '100';
	  mCell.style.font = '8pt Veranda';
	  mCell.style.color = 'black';
	  mCell.style.textAlign = 'left';
	  mCell.style.height= '20px';
	  var mInput = document.createElement('input');
	  mInput.id = 'monkeyspaw-checkbox-' + MonkeyspawDataBoxArray[i];
	  mInput.type = 'checkbox';
	  mInput.setAttribute('accesskey',MonkeyspawDataBoxArray[i].substr(0,1).toLowerCase());
		mInput.title = MonkeyspawDataBoxArray[i];
		mCell.appendChild(mInput);
		mInputText = document.createTextNode(MonkeyspawDataBoxArray[i]);
		mCell.appendChild(mInputText);

		switch (i) {
			case 0: //'IP Query'
				mInput.addEventListener ('click', function() {
					if (this.checked) {
						var idSub = this.id.substr(20);
						GM_setValue('pref-' + idSub,'true');
						DoStuff(idSub);
					} else {
						var idSub = this.id.substr(20);
						GM_setValue('pref-' + idSub,'');
						UnDoStuff(idSub);
					}
			}, true);	
				break;
			case 1: //'DNS Lookup'
				mInput.addEventListener ('click', function() {
					if (this.checked) {
						var idSub = this.id.substr(20);
						GM_setValue('pref-' + idSub,'true');
						DoStuff(idSub);
					} else {
						var idSub = this.id.substr(20);
						GM_setValue('pref-' + idSub,'');
						UnDoStuff(idSub);
					}
			}, true);
				break;
			case 2: //'Server Info'
				mInput.addEventListener ('click', function() {
					if (this.checked) {
						var idSub = this.id.substr(20);
						GM_setValue('pref-' + idSub,'true');
						DoStuff(idSub);
					} else {
						var idSub = this.id.substr(20);
						GM_setValue('pref-' + idSub,'');
						UnDoStuff(idSub);
					}
			}, true);
				break;

			case 3: //'Report'			
				mInput.addEventListener ('click', function() {
					if (this.checked) {
						var idSub = this.id.substr(20);
						GM_setValue('pref-' + idSub,'true');
						DoStuff(idSub);
					} else {
						var idSub = this.id.substr(20);
						GM_setValue('pref-' + idSub,'');
						UnDoStuff(idSub);
					}
			}, true);
				break;
			default:
			mInput.addEventListener ('click', function() {
				alert ('Dammit! This is undefined!');
			}, true);
		}
  	if (i % 2 == 1) {
  		mCell.style.backgroundColor = 'cyan';
  	}
  	ConsoleRow.appendChild(mCell);
		if (GM_getValue('pref-'+MonkeyspawDataBoxArray[i])) {
			mInput.click();
		}		
	}
}

InsertConsole();

/* END CONSOLE DRAW */

/* BEGIN DRAGGABLE CODE

This would have been impossible without Mark Pilgrim's draggable element
code in OmniFeedster.

*/


// Clear moving boxes and save position -- without this, boxes float around forever!  // 
document.addEventListener('mouseup', function(event) {
	if (GM_getValue('floater.monkeyspaw-databoxes')) {
			GM_setValue('floater.monkeyspaw-databoxes',0);
		}
}
, true);

// Set up a mousdown and mousemove pair of listeners. //

document.addEventListener('mousedown', function(event) {

    elmDrag = event.target;
    while (elmDrag.nodeName != 'BODY' &&
			elmDrag.className != 'drag' &&
			elmDrag.className != 'nodrag') {
			elmDrag = elmDrag.parentNode;
    }
    if (elmDrag.className != 'drag') { return null; }
 
		GM_setValue('floater.monkeyspaw-databoxes',1);
 
    var style = getComputedStyle(elmDrag, '');
    var iStartElmTop = parseInt(style.top);
    var iStartElmLeft = parseInt(style.left);
    var iStartCursorX = event.clientX;
    var iStartCursorY = event.clientY;
    elmDrag._mousemove = function(event) {
        while (GM_getValue('floater.monkeyspaw-databoxes')) {
        elmDrag.style.top = (event.clientY + iStartElmTop - 
            iStartCursorY) + 'px';
        elmDrag.style.left = (event.clientX + iStartElmLeft - 
            iStartCursorX) + 'px';
        return false;
      };
    };
    document.addEventListener('mousemove', elmDrag._mousemove, true);
    return false;
}, true);

/* END DRAGGABLE CODE - Still a bit buggy but avoidable by adding nodrag classes */

function DoStuff(a) {
	MonkeyspawDrawDataBox(a); // These boxes all look the same, just named, sized, and positioned differently.
	
	switch (a) {
		case 'IP Query':
			XHR_IPLookup(window.location.hostname); 
			break;
		case 'Server Info':
			XHR_BannerGrab(window.location.host);
			break;
		case 'DNS Lookup':
			XHR_DNSLookup(window.location);
			break;
		case 'Report':
			XHR_Report(window.location);
			break;			
		}
	}

GM_setValue('MonkeyspawRight',5); // This is the right margin.
function MonkeyspawDrawDataBox(a) { // a = bare ID.

	var MonkeyspawDataBox = document.createElement('div');
	MonkeyspawDataBox.id = 'monkeyspaw-data-' + a;
	MonkeyspawDataBox.className = 'drag';
	MonkeyspawDataBox.setAttribute('style','border:1px solid #00fcff;width:200px;height:80px;'+
	';color:black;background-color:#ccfcff;overflow: hidden; opacity:'+MonkeyspawDataBoxOpacity);
	MonkeyspawDataBox.style.position = 'fixed';
	MonkeyspawDataBox.style.display = 'block';
	switch (a) {
		case 'IP Query':
			MonkeyspawDataBox.style.right = '0px';
			MonkeyspawDataBox.style.bottom = '30px';
			break;
		case 'DNS Lookup':
			MonkeyspawDataBox.style.right = '200px';
			MonkeyspawDataBox.style.bottom = '30px';
			break;
		case 'Server Info':
			MonkeyspawDataBox.style.right = '400px';
			MonkeyspawDataBox.style.bottom = '30px';
			break;
		case 'Report':
			MonkeyspawDataBox.style.left = '0px';
			MonkeyspawDataBox.style.top = '0px';
			break;
		}

	MonkeyspawDataBox.style.font = '8pt Veranda';
	MonkeyspawDataBox.style.color = 'black';
	MonkeyspawDataBox.style.textAlign = 'left';
	MonkeyspawDataBox.innerHTML = '<span style="background-color: #00fcff;cursor: move;">' + a + ': </span>';
	document.body.appendChild(MonkeyspawDataBox);
}

function XHR_IPLookup(a) {
	var PingURLPrefix = 'http://www.fifi.org/services/ping?hostname=';	// A webified ping host. One of several.
	var PingURLSuffix = '&packetcount=1&packetwait=1&formatted=no&submit=Ping';
	var XHRUrl = PingURLPrefix + a + PingURLSuffix;
	GM_xmlhttpRequest({
    method: 'GET',
    url: XHRUrl,
    headers: {
    	'Host': 'www.fifi.org',
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'text/html',
      'Accept-Language': '*',
      'Connection':'Close'
    },
    onload: function(response) {
    	if (response.status == 200) {
				var r = response.responseText;   		
				var IPAddress = r.match(/PING [0-9]+.[0-9]+.[0-9]+.[0-9]+/)[0].substr(5);
				//GM_log('IP Query: ' + a + ' is ' + IPAddress);
				/* The easiest way to get all this data together is to nest our XHL 
				HTTP requests. It's madness, of course, but easier than handing off the
				return values of the onload callbacks back up the chain to whomever
				asked for them. */
				var URLPrefix = 'http://api.hostip.info/get_html.php?ip=';	// A web IPGeoLocator. It kinda sucks but its free and fast.
				var XHRUrl = URLPrefix + IPAddress;
					GM_xmlhttpRequest({
				    method: 'GET',
				    url: XHRUrl,
				    headers: {
			    	'Host': 'api.hostip.info',
			      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			      'Accept': 'text/html',
			      'Accept-Language': '*',
			      'Connection':'Close'
				    },
				    onload: function(response) {
				    	if (response.status == 200) {
								var r = response.responseText;
								var IPLocation = r;
								IPLocationCountry = IPLocation.substr(9,IPLocation.indexOf('City')-9);
								IPLocationCity = IPLocation.substr(IPLocation.indexOf('City: ')).substr(6);
								///// NOW ACTUALLY WRITE THE DATA TO THE CONSOLE //////
								var MonkeyspawDataBox = document.getElementById('monkeyspaw-data-IP Query');
								var newSpan = document.createElement('span');
								newSpan.id = 'IP Query-response';
								newSpan.className = 'nodrag';
								MonkeyspawDataBox.style.paddingBottom = '5px';
								MonkeyspawDataBox.appendChild(newSpan);
								newSpan.appendChild(document.createElement('br'));
								var imgFlag = document.createElement('img');
								imgFlag.src = 'http://api.hostip.info/flag.php?ip='+IPAddress;
								imgFlag.id = 'monkeyspaw-flag';
								imgFlag.className = 'nodrag';
								imgFlag.width = 51;
								imgFlag.height = 27;
								imgFlag.title = 'Flag courtesy of api.hostip.info';
								imgFlag.setAttribute('style','position:absolute;right:5px;');
								newSpan.appendChild(imgFlag);
								var newResp = document.createTextNode(IPAddress);
								newSpan.appendChild(newResp);
								newSpan.appendChild(document.createElement('br'));
								var newResp = document.createTextNode(IPLocationCountry);
								newSpan.appendChild(newResp);
								newSpan.appendChild(document.createElement('br'));
								var newResp = document.createTextNode(IPLocationCity);
								newSpan.appendChild(newResp);
								newSpan.appendChild(document.createElement('br'));
								var hrefBlacklist = document.createElement('a');
								hrefBlacklist.href = 'http://www.dnsstuff.com/tools/ip4r.ch?ip=' + IPAddress;
								hrefBlacklist.target = '_new';
								hrefBlacklist.setAttribute('style','font: 8pt Veranada;color:blue;text-decoration:underline;');
								hrefBlacklist.appendChild(document.createTextNode('DNSStuff Blacklists'));
								newSpan.appendChild(hrefBlacklist);
								newSpan.appendChild(document.createElement('br'));
								GM_log('\nIP Query: ' + window.location.host + ' is at ' + IPAddress + 
									'\nProbably in ' + IPLocationCity + ', ' + IPLocationCountry + '\n');
								//MonkeyspawDataBox.height = newSpan.offsetHeight + 'px';
				    	} else {
				    		GM_log('Error looking up rDNS for '+a+': IPLocator is down.');
				    	}
				    }
				});

				
				//////////////////////////////////////////////////////////////////
				
    	} else {
    		GM_log('Error looking up IP for '+a+': Fifi is down.');
    	}
    }
});

}

function XHR_BannerGrab(a) {
	XHRUrl = 'http://' + a + '/';
	GM_xmlhttpRequest({
    method: 'HEAD',
    url: XHRUrl,
    headers: {
    	'Host': a,
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'text/html',
      'Accept-Language': '*',
      'Connection':'Close'
    },
    onload: function(response) {
    	if (response.status) {
				var r = response.status + ' ' + response.statusText + '\r\n' + response.responseHeaders;   		
				GM_log('Server Info: ' + a + ' gave:\r\n ' + r);
				// var rServer = r.match(/[^\w]\w+:.*/g);
					rServer = r.split(/\n/);
					var MonkeyspawDataBox = document.getElementById('monkeyspaw-data-Server Info');
					var newSpan = document.createElement('span');
					newSpan.id = 'monkeyspaw-Server Info-response';
					newSpan.className = 'nodrag';
					MonkeyspawDataBox.appendChild(newSpan);
					newSpan.appendChild(document.createElement('br'));
					var newGhettoHeight = 18;
				for (i=0; i < rServer.length; i++) {
					var newResp = document.createTextNode(rServer[i]);
					var newDiv = document.createElement('div');
					if (i % 2 == 1) {
						newDiv.style.backgroundColor = '#E0E0E0';
					}
					newSpan.appendChild(newDiv);
					newDiv.appendChild(newResp);
					if (/^Server:/i.test(rServer[i])) {		// Really care about server banners.
						newDiv.style.color = 'red';
						newDiv.style.fontWeight = 'bold';
					} else if (/^[2345]/.test(rServer[i])) {  // Kinda care about response codes.
						newDiv.style.color = 'blue';
						newDiv.style.fontWeight = 'bold';
					} else if (/^X-/i.test(rServer[i])) { // Kinda don't care about X- headers.
						newDiv.style.color = 'magenta';
						newDiv.style.fontStyle = 'italic';
						if (/^X-(Fry|Bender)/i.test(rServer[i])) { // ...unless it's Futurama!
							newDiv.style.fontWeight = 'bold';
						}
					} else if (/^(Date:|Cache-control:|Pragma:|Connection:|Content-Type:)/i.test(rServer[i])) { // Don't usually care.
						newDiv.style.fontStyle = 'italic';
					} else {															// Care about stuff I don't usually see.
						newDiv.style.fontWeight = 'bold';
					}
					newGhettoHeight = newGhettoHeight + newDiv.offsetHeight;
				}
				
				MonkeyspawDataBox.style.height = newGhettoHeight + 8 + 'px';
    	} else {
    		GM_log('Server Info: Error!');
    	}
    }
});

}

			
function XHR_DNSLookup(a) {
	var DNSURLPrefix = 'http://toolbar.netcraft.com/site_report?url='; // Netcraft's Toolbar web interface.
	var XHRUrl = DNSURLPrefix + a;
	if (/^www\./i.test(window.location.host)) {
		var SiteAdvisorName = window.location.host.substr(4);
	} else {
		var SiteAdvisorName = window.location.host;
	}

	GM_xmlhttpRequest({
    method: 'GET',
    url: XHRUrl,
    headers: {
    	'Host': 'toolbar.netcraft.com',
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'text/html',
      'Accept-Language': '*',
      'Connection':'Close'
    },
    onload: function(response) {
    	if (response.status == 200) {
				var r = response.responseText;  
				var DNSNetblockOwner = r.match(/<a href=\"\/netblock\?q[^>]+>.*?<\/a>/)[0].replace(/.*>(.*?)<\/a>/,"$1");
				var DNSFirstSeen = r.match(/>Date first seen[^\n]+<\/td>/)[0].replace(/.*td>(.*?)<\/td>/,"$1");
				var DNSNameServer = r.match(/>Nameserver[^\n]+<\/td>/)[0].replace(/.*td>(.*?)<\/td>/,"$1");
				GM_log('\r\nDNS Lookup: ' + a + '\r\nNetblock Owner: ' + DNSNetblockOwner +
					'\r\nFirst Seen: ' + DNSFirstSeen + 
					'\r\nNameserver: ' + DNSNameServer +
					'\r\n');
				var MonkeyspawDataBox = document.getElementById('monkeyspaw-data-DNS Lookup');
				var newSpan = document.createElement('span');
				newSpan.id = 'monkeyspaw-DNS Lookup-response';
				newSpan.className = 'nodrag';
				MonkeyspawDataBox.appendChild(newSpan);
				newSpan.innerHTML = '<br><b>Netblock Owner:</b> ' + DNSNetblockOwner +
					'\r\n<br><b>First Seen:</b> ' + DNSFirstSeen + 
					'\r\n<br><b>Nameserver:</b> ' + DNSNameServer +
					'\r\n<br>'+
					'<a target="_new" href="'+XHRUrl+
					'" style = "font: 8pt Veranada;color:blue;text-decoration:underline;">'+
					'Netcraft</a> ' + 
					'<a target="_new" href="http://www.siteadvisor.com/sites/'+
					SiteAdvisorName +
					'" style = "font: 8pt Veranada;color:blue;text-decoration:underline;">'+
					'SiteAdvisor</a>';
				newGhettoHeight = newSpan.offsetHeight + 18;
				MonkeyspawDataBox.style.height = newGhettoHeight + 'px';
			
    	} else {
    		GM_log('Error looking up IP for '+a+': Netcraft is down.');
    	}
    }
});

}

function XHR_Report(a) {
	XHRUrl = 'http://www.castlecops.com/pirt';
	// First, grab a current CastleCops Code number.
	GM_xmlhttpRequest({
    method: 'GET',
    url: XHRUrl,
    headers: {
    	'Host': 'www.castlecops.com',
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'text/html',
      'Accept-Language': '*',
      'Connection':'Close'
    },
    onload: function(response) {

    	if (response.status == 200) {
				var r = response.responseText;
				CastleCopsCaptcha = r.match(
					/<input[^<]+<img[^<]+title=\"Visual Confirmation\".*/i
				)[0];
				CastleCopsCaptcha = CastleCopsCaptcha.replace(/modules\.php/,'http://www.castlecops.com/modules.php');
					GM_log(CastleCopsCaptcha);
					var MonkeyspawDataBox = document.getElementById('monkeyspaw-data-Report');
					var newSpan = document.createElement('span');
					newSpan.id = 'monkeyspaw-Report-response';
					newSpan.className = 'nodrag';
					MonkeyspawDataBox.appendChild(newSpan);
					newSpan.innerHTML = 
					   '<p align="center"><font size="+1"><b>Castle Cops Reporting</b></font>'
					  +'</p><div align="center">'
					  +'<form action="http://www.castlecops.com/modules.php?name=Fried_Phish" method="POST">'
						+'<input type="hidden" name="text" value="">'
						+'Site to Report:<br><textarea cols="30" rows="1" name="url" '
						+'style="font-size:10px;" wrap="off">'
						+window.location+'</textarea><br><br>'
						+CastleCopsCaptcha
						+'<br><input type="submit" value="Report Phish"></form>';
					MonkeyspawDataBox.style.height = '250px';
					MonkeyspawDataBox.style.width = '250px';
				// newGhettoHeight = newSpan.offsetHeight + 18;
				// MonkeyspawDataBox.style.height = newGhettoHeight + 'px';
				
				
    	} else {
    		GM_log('Report: Error! Castlecops is down!');
    	}
    }
});

}

function UnDoStuff(a) {
	var MonkeyspawDataBox = document.getElementById('monkeyspaw-data-' + a);
	MonkeyspawDataBox.style.display = 'none';
}

})();
