// mondo_image.user.js
//
// Copyright 2006-2007, Michael Devore
// This file is licensed under the terms of the Artistic License.
// See http://www.opensource.org/licenses/artistic-license.php for the license itself.
//
// This is a Greasemonkey script.
// See http:http://www.greasespot.net/ for more information on Greasemonkey.
//
// ==UserScript==
// @name          Mondo Image
// @namespace     http://www.devoresoftware.com/gm/mi
// @description	Control inline image display on MetaFilter
// @include       http://*.metafilter.com/*
// @include       http://www.devoresoftware.com/*
// @include       http://*.backpage.com/*
// ==/UserScript==
//
// Based on Mondo Meta script
// Work begun, December 2006
// Version 1.0 (beta), released January 2007
// Version 1.0a (beta), released January 2007
// Version 1.1, released January 2007
// Version 1.2, released early February 2007
// Version 1.3, released late May 2007
//

//String.prototype.trim = function()
//{
//	return this.replace(/^\s*|\s*$/g,'');
//}

var mondoImageVersion = "Version 1.3, Mondo Image";
var aDefaultSites = [ "*.flickr.com", "*.imageshack.us", "*.photobucket.com" ];
var aDefaultExtensions = [ ".png", ".jpg", ".gif", ".jpeg" ];
var defaultLimitMaxWidth = "550px";
var defaultLimitMaxHeight = "550px";
var miBottomPos = "5px";
var miLeftPos = "280px";
var miFontSize = "12px";
var miFontWeight = "bold";
var miColor = "darkblue";
var miOpacity = ".85";
var miBackgroundColor = "#FFCFCF";

var buttonText = "button";
var trueText = "true";
var falseText = "false";
var xText = "x";
var lightgrayColor = "lightgray";
var whiteColor = "white";
var restrictedImage = "data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%01%2C%01%2C%00%00%FF%DB%00C%00%08%06%06%07%06%05%08%07%07%07%09%09%08%0A%0C%14%0D%0C%0B%0B%0C%19%12%13%0F%14%1D%1A%1F%1E%1D%1A%1C%1C%20%24.'%20%22%2C%23%1C%1C(7)%2C01444%1F'9%3D82%3C.342%FF%DB%00C%01%09%09%09%0C%0B%0C%18%0D%0D%182!%1C!22222222222222222222222222222222222222222222222222%FF%C0%00%11%08%00I%00%C5%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1F%00%00%01%05%01%01%01%01%01%01%00%00%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%10%00%02%01%03%03%02%04%03%05%05%04%04%00%00%01%7D%01%02%03%00%04%11%05%12!1A%06%13Qa%07%22q%142%81%91%A1%08%23B%B1%C1%15R%D1%F0%243br%82%09%0A%16%17%18%19%1A%25%26'()*456789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%C4%00%1F%01%00%03%01%01%01%01%01%01%01%01%01%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%11%00%02%01%02%04%04%03%04%07%05%04%04%00%01%02w%00%01%02%03%11%04%05!1%06%12AQ%07aq%13%222%81%08%14B%91%A1%B1%C1%09%233R%F0%15br%D1%0A%16%244%E1%25%F1%17%18%19%1A%26'()*56789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%82%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E2%E3%E4%E5%E6%E7%E8%E9%EA%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%F5%DA(%AC%AF%0Ek%91x%8BC%B7%D4%A3%85%ED%DAE%06H%1C%82%D1%B6%01%C1%F6%20%86%07%8C%AB)%C0%CDcgk%9E%A9%ABEc%E9%3E%22%B6%D5%60%D4%EEv%FD%9E%D6%C6%E1%A2%F3%A5p%16D%08%AF%E6%E7%A0B%1B%20%E7%05p%7B%E0_%87Q%B1%B8%B3%8E%F2%1B%CBy-d%60%892J%A5%19%8Bm%0008%24%B7%1F%5E(i%A0%2C%D1U%ACu%1B%1DN%135%85%E5%BD%DCJ%DB%0B%C1*%C8%A1%B0%0E2%0F%5EG%E7T%ED%BCAc%7F%A9%DB%DA%D8%5C%5B%DEE%2C3Hg%82uuF%8D%A2%1Bx%CF'%CD%07%AF%18%F7%A2%CC%0DZ*%B5%B6%A3c%7B4%F0%DA%DE%5B%CF-%BBl%9D%22%95Y%A2l%91%86%00%F0x%3D%7D%0DCu%AAEg%A9%C3k6%C4%89%EDg%B9y%DD%C2%ACk%13F%0Es%DB%F7%99%CEx%DB%EF%C1g%B0%17%E8%AA%07%5C%D2%15.%9C%EA%96!m%18%25%C97%09%88X%9C%00%FC%FC%A7%20%8E%7B%D4%D2%EA60X%0B%F9o-%E3%B2*%AE.%1EU%11%95lm%3B%B3%8C%1C%8Cz%E6%8B0%2C%D1U%A2%D4lg%B07%F1%5E%5B%C9d%15%9C%DC%24%AAc%0A%B9%DCwg%18%189%F4%C5%16z%8D%8E%A0%9B%EC%AF-%EEWh%7C%C3*%B8%DAI%00%F0zeX%7DT%FAR%B3%02%CD%15Z%C7Q%B1%D4%E13X%5E%5B%DD%C4%AD%B0%BC%12%AC%8A%1B%00%E3%20%F5%E4~tO%A8%D8%DA%CC%90%DC%5E%5B%C5%2B%B2%22%A4%92%AA%B33%92%10%00O%24%EDlz%ED%3E%94Y%81f%8A%AC%9A%8D%8C%97%F2XGyn%F7%B1.%F9-%D6U2%22%F1%C9%5C%E4%0EG%E6)%9F%DA%FAo%F6%97%F6o%F6%85%A7%DB%FF%00%E7%D7%CE_7%A6%EF%B9%9C%F4%E7%A7Ni%D9%81r%8A%C7%B0%F1V%89%A9%5BK%3C%1A%9D%A0H%A4%927%DD%3Aq%B0%BF%CD%C1%E8V6p%7B%A8%CF%AD_%B3%BC%8A%F4J%F0%CBo%2CJ%CA%11%E0%98I%95(%AC%09%C0%E0%9D%D9%03%9C%82%A7%3C%E0%0D5%B8%16h%AC%7B%AF%15h%96%DAj%EA%1F%DAv%92%DA%9B%84%B6%F3b%9D%19C%B1%03%19%CE8%07q%EE%14%13W%1FW%D3b%FB'%99%A8Z'%DB1%F6%5D%D3(%F3%F3%8Cl%E7%E6%FB%C3%A7%A8%F5%A3%95%81r%8A%AD%7D%A8%D8%E9%90%89%AF%EF-%ED%22f%D8%1EyV5-%82q%92z%F0%7F*f%99%7F%FD%A3h%F3%F9~%5E%DB%89%E0%DB%BB9%F2%E5h%F3%F8%ED%CE%3Bf%8B%3B%5C%0B%94QE%20%0A(%A2%80%0A%F3%FB%08%AE%ED%FC%3F%A0Gb%5E5%D6t%DBkY%5D%1Fk%24%81%13.%98%23%12y%1Ey%DCs%FE%A61%D8%2Bz%05f%DDk%D66w%2Fn%E2%EEY%13%1B%C5%B5%9C%D3%84%24g%0CcV%00%E0%83%83%CE%08%3D%08%AB%8Bkd3%9D%F2b%B4%D4.%D8F%91i%96z%D4op%AA%A0G%14Kc%18BTq%B5d%F2%CFL.%D0%DC%05%C8f%AB%F6mP%DF%DCA%E5%5Di7W%1A%5Ce%97%0D%0C%F2%8B%A0%24%3E%8F%F2%18%94%B7%20%ED%DB%9C%A9%03%ABmV%C9%7C%AD%B3y%BEu%BB%DDE%E4%A9%93%CC%89v%E5%97h%3B%BE%FA%E0%0ENx%CD%5C%A7%CFml%07%23%ADC%2C%FA%CE%AC%91%C6%F2%AF%D9t%D6%9A4R%C5%E1%173%19Wh%E5%81%8C8*3%B8q%83%9CUmV%EE%DBY%D6eo%0F%DCEs~%DA%1D%F4Iqj%E3%EF%EE%87%CBQ(%E3%20%92q%9C%AE%E0N7%02%7B%15%BA%85%EFe%B3W%CC%F1F%92%BA%60%F0%AEX)%CFNJ7%E5%F4%A7%CD4V%F0%C94%D2%24qF%A5%DD%DD%80UP2I'%A0%14)%DB%A0%1C%EA%DDi%F7%FA%A6%8B%1E%8A%F17%D8%A4qq%1C%03i%B6%83%C9u%F2%DDx)%F3%F9_%BB89L%E3%E48%A7%E3o%F9z%FF%00%B1%7BS%FF%00%DA%15%D8%D1IJ%CD00g%B4%B6O%17%E8%91%A5%BCJ%96%DA%7D%DF%90%A1%00%11a%AD%D4m%1F%C3%F2%928%ECH%AC4%BC%5B8m%5D%EEll%40%BE%D4%DDoo%C1hc%7F%B58%D8%17z%0F1%836%1B9%0A%AE%00%C36%3By%A5X!%92W%0EU%14%B1%08%85%D8%803%C2%80I%3E%C0d%D3%E8R%03%82%B0%91%1A%5B%9B%C6%BD%96%F7N%83%5CY%AEn%A7U%01%A3%16H%12F%0A%AA%A5%04%866%0C%06%00U%7C%E0n%A2%FEHuk%FD~%5D%11%A2%9CIo%A74%D2%C5%11%95%26U%9E_3%85%C7%9C%3C%B5*UI%DC%14%A7Q%8A%ED%2F%AD%1A%F2%10%89wqk%22%B6%E4%96%06%01%81%C1%1D%18%15a%82x%60G~%A0%10%CB%0D9%2C%BC%C7i%E5%B9%B9%97%1Em%CC%FBw%B8%19%DA%3EP%14%01%93%80%00%19%24%F5bMs%AD%C0%C3%D1f%97P%F1%01%BE%5DZ%C7Q%89-Z%19%25%D3%AD%8ADX%BA%95%0E%FEk%EEa%87!%40%F9C%B18%DC7%5D%B7%86%26%F1%CE%A31%8D%0C%A9%A6%DA%A2%B9Q%B9T%CBpH%07%D0%ED%5C%FD%07%A5l%09T%CC%D1%00%FB%95C%12P%85%C1%24%0C60O%07%20%1C%8E3%D4e%F5%0E%40y%FE%96%2F%9E%CFH%D2%E7%D5lN%A1m42Og%0D%93%7D%AE'V%06Vw3p%1B%2F%BAB%B8q!%C6%EF1C_%FBl67%FF%00%D9%D6%F7%FA%7D%E26%A1%B8%E9r%C0E%DA%B4%93%EFg%E5%FA%231%94%1F%2F%EE(9%FE%3A%ECh%AAs%B8%1C-%9C%D67%B3iVfKy%E5%B7%F1%1D%EB%CB%0E%E5f%89%B3x%C8Y%7B%1E%01%19%F4%C8%AB%97P%CB%3C%5E%25H%E3yW%FBZ%D9%A6%8D%14%B1xDV%A6U%DA9%60c%0E%0A%8C%EE%1C%60%E7%15%D7QK%9F%5B%81%CAk%9A%B6%8Dw%A5%3D%F5%A5%DD%A4%A9%15%E5%87%9Fw%1B%02%81V%E9%08%06A%F2%FC%B9c%8C%FC%A1%B2q%B8f%9D%D5%D3%C7%AAj%AF%26%AB%A4%C5k%A8%F9f%D5.%EC%DA%E4%DEA%E4%A8%DB%11YW%CC%1B%8C%9F%BBPN_8%FD%E0%CFh%25S3D%03%EEU%0CIB%17%04%900%D8%C1%3C%1C%80r8%CFQ%96%5D%DDCce%3D%E5%CB%EC%82%08%DAY%1F%04%EDU%19'%03%93%C0%A1J%DAX%0Ej%CET%D0%EFm%A6%D7o%3C%A4%1A%5D%B5%BCWW%D2*%E6U.f%05%B7%15Wo%DD%127%1D%DBx-%B0%91g%C22%DAC%A0E%1CA-%E2%92%FA%F1-%E1d%F2%8E%3E%D1)%0A%10%80A%0A%0F%CB%8C%80%0F%1CV%FAJ%B2%3C%8A%03%83%1Bmm%C8%40'%00%F0H%E4r9%19%19%C8%EA%0D%3E%93%95%D0%05%14QR%20%A2%8A(%00%AC%7F%0A%7F%C8%A9%A5%EE%FF%00%5D%F6u%FBF~%F7%9D%8F%DE%EF%EF%BF~%ED%D9%E7vs%CEkb%B2%EFtK%0B%9B%87%B8sw%1C%D2%7D%E1k%7B-%BF%98%C0u!%1DC6%00%19%3C%E0%01%9C%01%86%9A%B5%98%9BI%5D%9C%FF%00%89%E6%8A%DC%DCM%A7H%91%98%F4%5DY%D5%ED%D8%0D%B2%87%84%B1%05z0%7C%E7%BEs%DE%B6nc%3A%AF%88.4%E9%E6%B8%8E%D6%DA%D6%19%D5m%A7xY%DEG%95IfB%18%80%23%18%19%03%E69%07%E5%DB4%BAF%9F~%82%16%B4Ak%1D%B4%B6AQ%8A%0F)%F6%87%40%A3%A2%FC%8B%C8%C1%1Bx%E3%AC%97%96v%1A%ABE%E6%B3%EE%40%7C%B9m%EEZ'%C1%EA%A1%A3%60%D8%3BrGC%B4%7Fw%8A%E7VFq%AFM%DB%5D%F6%F3%F4%F2%F39%FDCR%9BE%D7u%26D%96%E6D%D2%ED%1AK%99%10%15%8A5%92%E3%7C%D2m%DA%0E%01%DD%B1p%CD%D1%40%19%2B%7F%C4%F6K%1F%805%9Bw%9E%E2%5D%B63%B9%95%E5!%DD%82%B3d%91%8E%09%FE%11%85%C7%CB%8D%BCV%C5%BD%8D%9D%AD%C3Io%0CqI%E4G%06%D4%E0%2Ch%5Bb%85%E8%00%DC%D8%C0%FET%D3%A5Y%1D%26M%2F%C9%FF%00B%927%89%A1%DCp%11%B3%95%1C%E5F%09%00%0C%000%06%00%14s%2B%A6j%9A%7B%19%22%C9.5ytf%B8%BE%5B%2B%3BX%A7%40%97%B3%09%1D%E4yA%2F%26%ED%E4%01%1F%03v%3Ec%90p%BBmi%AD6%AF%E1%FB%88n.eI%0C%976%86%E2%12%12L%24%AF%10p%40%C0%7C(9%00%0C%F4%00qR%CB%A1YKoo%03%0B%C3%E4%96%092%DE%CA%26P%DC%90e%DF%BC%A9%20q%928%5E8%18%B9m%E4G%1A%DB%5B%A2F%90%A8U%8D%00%0A%8A%09P%00%1C%01%F2%F4%ED%8ANH%978%A9(%B7%AB8%CDOY%BE%D4%B4%3B%E2%93%BD%AD%C6%99%A6%DC%CDt%D6%EE%C8%1A%E0%09%A0%1B%0Erc%0D%14%CD%CE%0EDG%AE%40%D2%D6.n.%7CA%26%9D%F6-N%EA%D6%0BX%A7%DB%A7%5C%AD%BBow%91r%ECdF%20%08%F8%00%E3%96%C8%3F.6.4%EB9%12%EE%D9%ED%B7E%A9%96%17_%BC%23~c%08%7B%E7%95P%3E%5Ct%CD-%DD%85%96%AC%23iL%BB%E3%07d%90N%F0%C8%14%F5%1B%90%86%DAv%83%8C%E0%ED%07%9C%0A%AEx%89U%83%97-%F5%FF%00%86zw%DF%A1%CB%8DsS%B30%C9%23n%BA%BB%B7%9A%DD%23%99%D5%D5%25%8E%E9!%85%9CF%DBA%3Ex%F3v%FF%00s%00%0D%B8%AB%9Am%DD%CBkvZ%24%D7%12%B1%D3%BE%D1%E6K%BC%96%9Fb%C2%22%DEO%DE%CCw*%CD%C0%FD%E2%E4p9%E8%1A%CA%C4%0BQ%E5G%1A%D8%1F2%05S%B5b%F9%19%06%00%E3%1BY%86%3A~T%E6%86%DA%DE%EAk%ED%A0O%24K%1B1lnT%DE%CA98%E3%7B%9F%C7%9E%94%9C%D7a%BA%91I%B6%F69%DF%10%5D%DC%C3%FF%00%09W%95q%2C~F%86%92%C5%B5%C8%F2%DF%FD'%E6_C%F2%AF%23%9F%94zS%E6%D2%CAx%82%CFO%FE%D2%D4%CC%17V%B3%CFs%9B%C7%0D%2B%C6%F1%05%20%83%FB%B1%FB%C6%24E%B0%1E%066%8CV%BD%E5%96%9Bs%15%EC%97%08%AE%B7v%ABo%3F%EF%08%DF%17%CF%B4u%18%FB%EF%C8%C7%5E%BC%0A%B4m%A0%96%F2%2B%C2%87%CF%89%1E%24s%91%85b%A5%86%3D%CA%2F%3E%DCu%A3%9Dt%05R%12%7C%A9%EAr%B1%DEM%3E%9Fmd%ED%A8%5D%1F%B4%5E%A7%D9%ED%25%09%3C%91C9%8DI%99%9D%08%0A%0A%03%F3obT%92F%FC%B2%C6%E7PV%3A%3D%CC%8F%0A%C9%AB%7D%8C%F9wo3%C7%17%D9%04%E4%2C%CE%03%92X%1F%98%F2%03%10%A4aH%E8%A5%D0t%E9bX%FC%B9c%DB%24%92%2B%C1q%24N%0C%8C%5D%C6%F4%60%D8f9%2B%9Cd%0E8%18%AD%3E%83%0D%AE%99%3D%B6%97gn%DE%7C%C2i%E3%9Ei%17%CD%7D%A0o%F3F%E6I%01Tm%F8%24%95%CF%0Cw%0A%E6E%98%D7%D3%DD%E8W%9A%AC6W7%D3%A7%93%A7%AC1I7%9A%F1%99%AE%24%8D%F6%19%0F%2Cz%82%E4%8C%E0%1F%94%00%2F%E8%D2%5D%5B%EB%2Bf%2C%F5%0B%5B9m%E4%94%A6%A3x%93%B9%91Y%001%9F5%DF%18c%BB%3F(!1%82N%E9%B4_%0F%C5l%2F%A7%BA%86%16%92%F9%16%09%E1%135%CA%B2%26%F1%87%92A%BAF%3B%D8%12%C0aB%AE%3E%5C%9D%1B%0D%3A%D3O%DEmD%B24%A7k%CB4%EF3%E1s%80%5D%D8%B6%01%CE%06p%0B%1E94%A5%25%B1%3C%C8%C2%F1%05%DD%CC%3F%F0%95yW%12%C7%E4hi%2C%5B%5C%8F-%FF%00%D2~e%F4%3F*%F29%F9G%A5S%F1%2C%0F%A6%D9jV%A9ww2%5Dhw%F3Nn'i7%C8%820%AC%01%F9S%FDc%F0%81W%9E%9C%0CuW%1Ae%95%E8%BC3%C0%5B%ED%96%FF%00e%9F%2C%CB%BE1%BF%E5%EB%C7%DF~G%3C%F5%E9K%7D%A5Yj%3B%BE%D7%0F%99%BA%DE%5BS%F3%11%98%A4%DB%BDx%3D%F6%AF%3DF8%A1M%2B%0D4%F5G%3B%A8%DC%5D%B4%3A%DCq%DE%DCB%CB%ADYA%1C%91%BF%CD%120%B4%C8%5C%E4c%E7n%08%20%EE9%07%26%99%7Fus%A1M%A9%DAXIw*%08%EC%0Ck%24%E6y%15%E7%B8x%9C%A3J%C7%9D%A1p%18%ED%04d%8ENzW%D2%AC%A4%F3%F7%C3%9F%3E%E2%3B%A9%3Ec%F3K%1E%CD%8D%D7%8Cyi%C7N9%EAi%EF%A7%DAK5%C4%B2%C0%925%CC%2B%04%C1%FEex%D4%B1%0AT%F1%8F%9D%FBs%9EhS_%D7%C8f%1E%8D%25%D5%BE%B2%B6b%CFP%B5%B3%96%DEIJj7%89%3B%99%15%90%03%19%F3%5D%F1%86%3B%B3%F2%82%13%18%24%EE%E9j%9D%86%97k%A6%F9%86%DCJ%CF%267%C9%3C%EF3%903%81%B9%C9l%0C%9C%0C%E0%12OsVa%89%60%868%90%B9TP%A0%BB%97b%00%C7%2CI%24%FB%93%93S'v%03%E8%A2%8A%91%100%FBL%40%10%CA%8C2%19X%1E08%3DA%EA%7DG%1FJ%AD%3C%B3-%D10.%F2%F8C%D0aG%19%07%9E%8C%C7%3C%1Fp%3A%99%9C%07S*d%1C%90%7C%B1%9D%E0%E3%BF%07%A69%07%03%F0%A8diV%DB%CCYa%16%E3%86%12G%F2%14%C0%1F(%07'%9C%E0w%CF%D2%A5%9E%26.M%C5%B4%DD%D6%B7M_N%BA%D9%24%AE%D3%BD%FF%00!b%93%ED%8F4m%10)%9D%8C%C4%02T%82N9%18%20q%EB%83%EA%0Ein%20%F3%A4r%AC%CE%D9%D9%B7qP%87%0A%D9%CE%0F%3C%03%E9%F8%F5%8A%CEcp%C2%06e%05P2%AE%DETt%E0%A9%18%E3%D3%D4%11%C1%C0M%C6%7B%C8%D1%A2u%DD%9C%86%25%86%07'%B8%2B%9D%D8%C1%1F%DD%E3%B5.%87*%AD%1A%B8x%F3%7B%DC%CE%DA%FA%BD%1E%E9Z%FF%00j%F7%BE%DBZ%C3%C7%24k%B5%5D%8BHr%CC%178l%F0~%9C%8E%A7%A2%E3%9Ei%EE%0B%85%8D%D9%C4%81GG*%1C%90x%C8%FAg%81%FA%12)X%C9%1C%A8%AA%A1c%04*%AA%B0%01%BDr%08%E3%03%24c%D2%A9%AF%9F%24%F22%F9%C5%94%EDd%90%82%B9%5D%A7%20%60%0C%9E%DD3%D7%2BM%9Du%EAF%8B%E5Qn%FA%5BV%B4%ED%7D%F5%FF%00%3DV%F6%A5_%9E1%E5%90%D2%1C%BB(%2C%17%8Cu%04%60%F3%8C%FA%7B%0E%1B%2F%98%262%B3%AA%95Q%84%CE%E5%07%91%9E%99%C9%C9%03%18%CE%3A%F3D%C9%13%DC%E2m%C0%90%A1X%26%01%19%FB%A5%BB%E4%F6%3Cr%3B%D4%0A%9Bd%F3%CA%B4%40J%EC2%0E%09%2B%C1%DA%07%3F%A1%CF%1C%9E%A9%93%5En2i%7F7%7D%AD%A5%DD%BF%F0%2B%5D%5E%EF%5E%D6%96hn%03%2F%CE%F1%B6%D3%F7N9%03%8E%3E%A0%F3%EA%7D%0E*y%B2D%7C%BD%AA%F3D%C1%23%DC7%B9%DCO9%CF%1F(%CFo%C0b%A6%24%BA%B4%8C%25%90*%E4%98%81R%FC%F4%EA%08%DB%F3%7C%BE%E3%BD8D%A9%B1U6%04%8C%E2D%8F%2C%08%C08%CE%7B%0F%7C%8F%A7%26%E4%D5%F6%95%AD%2B%FC%D6%ED7%D3%A6%8FT%EFd%D7f%98%DD%CC%D6%F1%A2%B3%15p%0A%9D%8C%EA%E0%93%90%C4%E4%80F%3A%F4%F55%5E%2B%C9f%9D%BF%D0%C2%23%01%E6%E17%EE%1D%8Er20%0Fc%D3%BEj%EC08%80%24%DB%1D%D4%EEB%D9%7C%1C%7B%F3%C1%CE%3D%B1Y%B1%B0i%1E8%B6%A3%95%C2%CB%23%96%DEH%C0%3B%F3%F7%BA%F0%01%E8%C0%1EM%0C%E6%C5%FBjN%95%DD%93%E9%DE%CBn%B6%EB%B3WN%DA%B2%F3I%25%DA%A3%DB%5D%08%A3rv%B6%C0%D9%C7%B1%C1%07%AF%AF%DD%EDLB%C6V%BB%25%DA6P%AE%A8%AD%9D%C1%F00%3A%F1%CEx%19%F4%E7%14%D8%E5E%B6%9F%CD%FD%EB%96Ve%0F%BB9%C0_%BA%07%07%03%8C%1E%3E%B8%A7%EE%96%24%91%9C%C3%14%9B%15%DEO%979%CF%DD%23%3C%8E%08%04%91%D7%EAh5%F6%8A%A3U%24%DBvo%AE%8D%5D-%1B%B4v%92%B5%F5%D5J%5E%EE%B2%3CP%A4%ABs'%C8%E0%03%BANB%0C%9C%8C%E7%FD%A2%3A%E3%A7%A5!%96q%F7%A2%25%9D%89H%F7%80T%00z%91%DB%20w%FE%2C%7Dd%2C%7C%9793%AE%1422%F2%07%19%C8%C7%A1%CE1%9F%CCU4v%8E%E5%93z%89%97%18G%95%D8%1C%9E%E7'%B7%A8%EE%A7%BE)%B3z%F3T%A4%94%3D%D4%FB%5B%5E%F7%D1%A6%DAN%CA%EB%CD%3B%2BMp1%C4bh%9C%ABI%98%E3%DCA%E0%E3%3D9%23%90%3A%9E%FC%F2%F3q%B3%E4P%8D%3B%91%9D%9C%8EN%D2N9%E3%1C%93%8E%9D%BBV%F2%14%A9%F3!%11%BC%E7%CBWE%20%829R%06x%18%03%8E0G%3E%C3K%B4%BD%B4%F0%AA%C7%B4%C6%1A3%922N%40%CFN0B%8C%9E%9C%1E%CA%E7%3A%C4N%12%94%DF%BB%7D%16%FA%3E%97%D2%C9%B5%AD%F6%BB%B6%B6d%CD8%12%0F9%FE%60J%06U%20)%C1%E8%08%3F1%FCx%FF%00%7B%05%90%DE%C92%09%B7%AA%06F%0A%AC%3E%5D%D8%C89%C7%60%1B%3C%F6%ECx%A9e0%B2lc%14J2%AF%93%81%B4q%8E%A0%F4n%3A%81%9F%A5%3A%11%22%A2%15UE*B%C2%13h%CEr%09%3D%86%3D%87_%5E(%D4%D9*%CE%AD%94%FD%DD%F4%BD%FAZ%FA%A7%A7%9E%AFUgm%23_%3EL%CD%E7%5B%AC~_%FA%D49%C3%00G%B0%DA%09'%9C%FF%00%84%EF5%BC%11%A4%926%C0%17%E5g%078%E3%8C%9Es%ED%D4%E2%A9%5C%24%CF%1A%CA%F32%90%BC%E2%1C%A8%C8%C9%047%1D%F1%9C%0C%0C%82je*%F0!%92%17%9E%17!%97z%86*%BBA%F7%CF~%BC%F5%EAq%92%E2%A5%88%9C%1C%A0%96%BB%DEZ%ADz%D9%3B%A5%D3%D6%DA%BBif9KL%F1%12%84%A7'i9%00%F4%C8%FC%FB%F6%1E%BCKUm%F6%B1R'.TmV%0EHu%1D%C8%E8O%3C%91%DF%F2%ABUH%F5%B0%B3%94%E1v%FF%00%E1%BA%7D%DD%FA%EF%B3%0A(%A2%99%D0S*-%E1T(%BEX%60%AD%F2%E0%15%DB%82O%5E%3E%B8%E9%D7%D6TFy%0B6%ED%8D%F3ma%91%9E1%8C%F21%8C%E3%1DMOE%2B%1C%B1%C2%A8%BB_%DD%E8%BF%E0%F6%F2!6%B1%B4%09%0B%B4%8C%AAA%C9s%92Grh%9A%20a%C2%90%81%14%95%DA%B9*GB%00%FCx%EF%D2%A6%A2%8B%1A%3C5.V%94V%D6%F9-%BC%F4)%C2%EFu%F3%98%1A%2C%A0R%5C%90G%3C%808%ED%DF%E9%E9%C4%F1%C2%81%B7l%C1Rv%06%03%E4%18%C7%CB%E8%0E%3FZ%96%8A%2CE%2C2%8AN%A3%E6%97%7B%25%AF%7D%3F%AF%C0)%8D%1A%B2%14%60J%93%92%09%3C%F3%9F%CB%DB%F0%A7%D1L%E8qR%D1%A2%16%85%F6%95I%5B%96%C9%24%F2%BC%93%C7%F2%C1%E3%1F%91U%B7U%2Cw9%2C%A1%09-%CE%018%E7%AF~%B5-%14%ACd%B0%F4%F9%94%AD%B7%F5%FA%90%98%9AT%9E9X%ECpT%60%01%80Go%FE%BF%7C%F6%C5F%D6%F3%C9%92nY%0E%EF%E0%03%A6%E2G_l%0F%E7%9A%B5E%16%26XZr%F8%AF%F7%BF%CE%F7%D2%EE%DEL%80C%22%CA%F2%2B%A6%E7%E0%E5I%E0%7D%D1%F7%BBd%FD%7D%A9%E1%19%1C%EC%DA%15%8E%E2NI%CEy%FD8%F6%C0%EB%DAJ(%B1Q%C3%D3%8F%C3%A7_%BF%7F%BF%AF%DF%B9T%C6w4EVD%91G%9A%03%E0%F3%90N%3D%3F%1E%83%8E%95%26%04m%BF%CAb2%D9%24%EE%2B%F4%1C%F0q%D0%7Bq%E95%14X%98%E1%94uO%D3E%A6%B7%ED%7F%C7%AB%D8%A2R%EE%E1B%CF%1A%AA2%95eW%C1%04%80%09%3D%7F%DA%C7%5E%A3%D3%22T%B5%3C%3C%8E%A6Q%FF%00-%11%02%92q%80O%5C%91%93%ED%CFJ%B3E%163%86%06%9A%7C%D3nO%BB%7F%E5e%FEZ%DBvG%14B5%E3%A9%E4%E38%CEI%24%0C%F1%C95%1BI%2C%2B%92%8A%22H%8B3%17'%0C1%C6q%9Cu%E7%9F%F1%B1E%166%95%1FqF%9B%E5%B6%C6t%B6%92%C9%E5%B2%90dX%F2VL%AA%EF'%EFax%CF%DE%E8x%E2%AC%F9b!%BC%23b%05*%8A%A3%24%AE%07%1Dy%E4%7Bt%FC%ECQE%8C!%80%A5M%B9Gwo%C3o%D2%FEi%15%ED%A1*%81%9D%02%9C%E5c%CE%E1%1F%18%E0%FF%00%87%1E%9E%F6(%A2%99%D3F%94iAB%3F%D7%F5%E5%A7m%02%8A(%A0%D0%FF%D9";

var mondo_image_control = null;
var mondo_image_paramBox = null;
var boxUp = false;
var limitSites = true;
var allowedSites = new Array();
allowedSites = aDefaultSites.slice(0);
var allowedExtensions = new Array();
allowedExtensions = aDefaultExtensions.slice(0);
var limitUsers = false;
var allowedUsers = new Array();
var limitText = false;
var allowedText = new Array();
var masterSwitchSet = false;
var aSearchSites = new Array();
var aSearchExtensions = new Array();
var aSearchUsers = new Array();
var aSearchText = new Array();
var aSearchBadSites = new Array();
var aSearchBadUsers = new Array();

var cutePinkBoxFromHell = false;
var clickAreaWidth = 20;
var clickAreaOffset = 0;
var clickAreaDirection = "both";
var clickAreaClicks = 2;
var clickAreaSeconds = 3;
var limitMaxWidth = defaultLimitMaxWidth;
var limitMaxHeight = defaultLimitMaxHeight;
var excludeSites = false;
var notAllowedSites = new Array();
var excludeUsers = false;
var notAllowedUsers = new Array();
var flagRestricted = false;

// save custom image settings
function saveInfoToStore()
{
	GM_setValue("allowedExtensions", allowedExtensions.join(","));
	GM_setValue("limitSites", limitSites ? trueText : falseText);
	GM_setValue("allowedSites", allowedSites.join(","));
	GM_setValue("limitUsers", limitUsers ? trueText : falseText);
	GM_setValue("allowedUsers", allowedUsers.join(","));
	GM_setValue("limitText", limitText ? trueText : falseText);
	GM_setValue("allowedText", allowedText.join(","));
	GM_setValue("masterSwitchSet", masterSwitchSet ? trueText : falseText);

	GM_setValue("cutePinkBoxFromHell", cutePinkBoxFromHell ? trueText : falseText);
	GM_setValue("clickAreaWidth", clickAreaWidth);
	GM_setValue("clickAreaOffset", clickAreaOffset);
	GM_setValue("clickAreaDirection", clickAreaDirection);
	GM_setValue("clickAreaClicks", clickAreaClicks);
	GM_setValue("clickAreaSeconds", clickAreaSeconds);
	GM_setValue("limitMaxWidth", limitMaxWidth);
	GM_setValue("limitMaxHeight", limitMaxHeight);
	GM_setValue("excludeSites", excludeSites ? trueText : falseText);
	GM_setValue("notAllowedSites", notAllowedSites.join(","));
	GM_setValue("excludeUsers", excludeUsers ? trueText : falseText);
	GM_setValue("notAllowedUsers", notAllowedUsers.join(","));
	GM_setValue("flagRestricted", flagRestricted ? trueText : falseText);
}

// load existing image settings and process them
function loadStoredInfo()
{
	var miParam = GM_getValue("limitSites", xText);
	if (miParam != xText)
	{
		limitSites = (miParam === trueText ? true : false);
	}
	miParam = GM_getValue("allowedSites", xText);
	if (miParam != xText)
	{
		allowedSites = miParam.split(",");
	}
	miParam = GM_getValue("allowedExtensions", xText);
	if (miParam != xText)
	{
		allowedExtensions = miParam.split(",");
	}
	miParam = GM_getValue("limitUsers", xText);
	if (miParam != xText)
	{
		limitUsers = (miParam === trueText ? true : false);
	}
	miParam = GM_getValue("allowedUsers", xText);
	if (miParam != xText)
	{
		allowedUsers = miParam.split(",");
	}
	miParam = GM_getValue("limitText", xText);
	if (miParam != xText)
	{
		limitText = (miParam === trueText ? true : false);
	}
	miParam = GM_getValue("allowedText", xText);
	if (miParam != xText)
	{
		allowedText = miParam.split(",");
	}
	miParam = GM_getValue("masterSwitchSet", xText);
	if (miParam != xText)
	{
		masterSwitchSet = (miParam === trueText ? true : false);
	}

	miParam = GM_getValue("cutePinkBoxFromHell", xText);
	if (miParam != xText)
	{
		cutePinkBoxFromHell = (miParam === trueText ? true : false);
	}
	else
	{
		GM_setValue("cutePinkBoxFromHell", cutePinkBoxFromHell);
	}
	miParam = GM_getValue("clickAreaWidth", xText);
	if (miParam != xText)
	{
		clickAreaWidth = miParam;
	}
	else
	{
		GM_setValue("clickAreaWidth", clickAreaWidth);
	}
	miParam = GM_getValue("clickAreaOffset", xText);
	if (miParam != xText)
	{
		clickAreaOffset = miParam;
	}
	else
	{
		GM_setValue("clickAreaOffset", clickAreaOffset);
	}
	miParam = GM_getValue("clickAreaDirection", xText);
	if (miParam != xText)
	{
		clickAreaDirection = miParam;
	}
	else
	{
		GM_setValue("clickAreaDirection", clickAreaDirection);
	}
	miParam = GM_getValue("clickAreaClicks", xText);
	if (miParam != xText)
	{
		clickAreaClicks = miParam;
	}
	else
	{
		GM_setValue("clickAreaClicks", clickAreaClicks);
	}
	miParam = GM_getValue("clickAreaSeconds", xText);
	if (miParam != xText)
	{
		clickAreaSeconds = miParam;
	}
	else
	{
		GM_setValue("clickAreaSeconds", clickAreaSeconds);
	}
	miParam = GM_getValue("limitMaxWidth", xText);
	if (miParam != xText)
	{
		limitMaxWidth = miParam;
	}
	miParam = GM_getValue("limitMaxHeight", xText);
	if (miParam != xText)
	{
		limitMaxHeight = miParam;
	}
	var miParam = GM_getValue("excludeSites", xText);
	if (miParam != xText)
	{
		excludeSites = (miParam === trueText ? true : false);
	}
	miParam = GM_getValue("notAllowedSites", xText);
	if (miParam != xText)
	{
		notAllowedSites = miParam.split(",");
	}
	var miParam = GM_getValue("excludeUsers", xText);
	if (miParam != xText)
	{
		excludeUsers = (miParam === trueText ? true : false);
	}
	miParam = GM_getValue("notAllowedUsers", xText);
	if (miParam != xText)
	{
		notAllowedUsers = miParam.split(",");
	}
	miParam = GM_getValue("flagRestricted", xText);
	if (miParam != xText)
	{
		flagRestricted = (miParam === trueText ? true : false);
	}
}

function showActiveStates()
{
	var sNode = document.getElementById("mondo_image_extensionlist");
	sNode.style.backgroundColor = (sNode.disabled ? lightgrayColor : whiteColor);
	var checkNode = document.getElementById("mondo_image_sitefilter");
	sNode = document.getElementById("mondo_image_sitelist");
	checkNode.style.backgroundColor = (checkNode.disabled ? lightgrayColor : whiteColor);
	sNode.style.backgroundColor = (sNode.disabled ? lightgrayColor : whiteColor);
	checkNode = document.getElementById("mondo_image_userfilter");
	sNode = document.getElementById("mondo_image_userlist");
	checkNode.style.backgroundColor = (checkNode.disabled ? lightgrayColor : whiteColor);
	sNode.style.backgroundColor = (sNode.disabled ? lightgrayColor : whiteColor);
	checkNode = document.getElementById("mondo_image_textfilter");
	sNode = document.getElementById("mondo_image_textlist");
	checkNode.style.backgroundColor = (checkNode.disabled ? lightgrayColor : whiteColor);
	sNode.style.backgroundColor = (sNode.disabled ? lightgrayColor : whiteColor);
	checkNode = document.getElementById("mondo_image_stopsitefilter");
	sNode = document.getElementById("mondo_image_stopsitelist");
	checkNode.style.backgroundColor = (checkNode.disabled ? lightgrayColor : whiteColor);
	sNode.style.backgroundColor = (sNode.disabled ? lightgrayColor : whiteColor);
	checkNode = document.getElementById("mondo_image_stopuserfilter");
	sNode = document.getElementById("mondo_image_stopuserlist");
	checkNode.style.backgroundColor = (checkNode.disabled ? lightgrayColor : whiteColor);
	sNode.style.backgroundColor = (sNode.disabled ? lightgrayColor : whiteColor);
}

// input field enabled or disabled according to controlling checkbox
function setInputStatusByCheckBox(checkBox, inputBox)
{
	var checkNode = document.getElementById(checkBox);
	var sNode = document.getElementById(inputBox);
	if (checkNode.checked == true)
	{
		sNode.disabled = false;
	}
	else
	{
		sNode.disabled = true;
	}
}

function setSiteListStatus(event)
{
	if (event != null)
	{
		event.stopPropagation();
	}
	setInputStatusByCheckBox("mondo_image_sitefilter", "mondo_image_sitelist");
	showActiveStates();
}

function setUserListStatus(event)
{
	if (event != null)
	{
		event.stopPropagation();
	}
	setInputStatusByCheckBox("mondo_image_userfilter", "mondo_image_userlist");
	showActiveStates();
}

function setTextListStatus(event)
{
	if (event != null)
	{
		event.stopPropagation();
	}
	setInputStatusByCheckBox("mondo_image_textfilter", "mondo_image_textlist");
	showActiveStates();
}

function setStopSiteListStatus(event)
{
	if (event != null)
	{
		event.stopPropagation();
	}
	setInputStatusByCheckBox("mondo_image_stopsitefilter", "mondo_image_stopsitelist");
	showActiveStates();
}

function setStopUserListStatus(event)
{
	if (event != null)
	{
		event.stopPropagation();
	}
	setInputStatusByCheckBox("mondo_image_stopuserfilter", "mondo_image_stopuserlist");
	showActiveStates();
}

function disableEverything()
{
	var sNode = document.getElementById("mondo_image_extensionlist");
	sNode.disabled = true;
	var checkNode = document.getElementById("mondo_image_sitefilter");
	checkNode.disabled = true;
	sNode = document.getElementById("mondo_image_sitelist");
	sNode.disabled = true;
	checkNode = document.getElementById("mondo_image_userfilter");
	checkNode.disabled = true;
	sNode = document.getElementById("mondo_image_userlist");
	sNode.disabled = true;
	checkNode = document.getElementById("mondo_image_textfilter");
	checkNode.disabled = true;
	sNode = document.getElementById("mondo_image_textlist");
	sNode.disabled = true;

	checkNode = document.getElementById("mondo_image_stopsitefilter");
	checkNode.disabled = true;
	sNode = document.getElementById("mondo_image_stopsitelist");
	sNode.disabled = true;
	checkNode = document.getElementById("mondo_image_stopuserfilter");
	checkNode.disabled = true;
	sNode = document.getElementById("mondo_image_stopuserlist");
	sNode.disabled = true;

	showActiveStates();
}

function enableControls()
{
	var sNode = document.getElementById("mondo_image_extensionlist");
	sNode.disabled = false;
	var checkNode = document.getElementById("mondo_image_sitefilter");
	checkNode.disabled = false;
	checkNode = document.getElementById("mondo_image_userfilter");
	checkNode.disabled = false;
	checkNode = document.getElementById("mondo_image_textfilter");
	checkNode.disabled = false;
	checkNode = document.getElementById("mondo_image_stopsitefilter");
	checkNode.disabled = false;
	checkNode = document.getElementById("mondo_image_stopuserfilter");
	checkNode.disabled = false;
	setInputStatusByCheckBox("mondo_image_sitefilter", "mondo_image_sitelist");
	setInputStatusByCheckBox("mondo_image_userfilter", "mondo_image_userlist");
	setInputStatusByCheckBox("mondo_image_textfilter", "mondo_image_textlist");
	setInputStatusByCheckBox("mondo_image_stopsitefilter", "mondo_image_stopsitelist");
	setInputStatusByCheckBox("mondo_image_stopuserfilter", "mondo_image_stopuserlist");
	showActiveStates();
}

function updateMasterSwitch(event)
{
	if (event != null)
	{
		event.stopPropagation();
	}
	var checkNode = document.getElementById("mondo_image_masterswitch");
	if (checkNode.checked == true)
	{
		// always force restricted image placeholder reset
		checkNode = document.getElementById("mondo_image_flagRestricted");
		checkNode.checked = false;
		disableEverything();
	}
	else
	{
		enableControls();
	}
}

function massageInput(sInput)
{
	if (!sInput.length)
	{
		return [ "" ];
	}
	sInput = sInput.replace(/;/g, ",");	// semicolons to commas
	while (sInput.match(/(,,)|(,\s+)|(\s+,)/) ||
		sInput.match(/(^\s+)|(\s+$)|(^,)|(,$)/))
	{
		sInput = sInput.replace(/(,,)|(,\s+)|(\s+,)/g, ",");
		sInput = sInput.replace(/(^\s+)|(\s+$)|(^,)|(,$)/g, "");
	}
	if (!sInput.length)
	{
		return [ "" ];
	}
	var aHold = sInput.split(",");
	return aHold;
}

function resetToDefaults(event)
{
	if (event != null)
	{
		event.stopPropagation();
	}
	// force master switch reset
	var checkNode = document.getElementById("mondo_image_masterswitch");
	checkNode.checked = false;
	// force restricted image placeholder reset
	var checkNode = document.getElementById("mondo_image_flagRestricted");
	checkNode.checked = false;
	
	var sNode = document.getElementById("mondo_image_extensionlist");
	sNode.value = aDefaultExtensions.join(",");
	sNode.disabled = false;
	checkNode = document.getElementById("mondo_image_sitefilter");
	checkNode.disabled = false;
	checkNode.checked = true;
	sNode = document.getElementById("mondo_image_sitelist");
	sNode.value = aDefaultSites.join(",");
	sNode.disabled = false;
	checkNode = document.getElementById("mondo_image_userfilter");
	checkNode.disabled = false;
	checkNode.checked = false;
	sNode = document.getElementById("mondo_image_userlist");
	sNode.value = "";
	sNode.disabled = true;
	checkNode = document.getElementById("mondo_image_textfilter");
	checkNode.disabled = false;
	checkNode.checked = false;
	sNode = document.getElementById("mondo_image_textlist");
	sNode.value = "";
	sNode.disabled = true;

	checkNode = document.getElementById("mondo_image_stopsitefilter");
	checkNode.disabled = false;
	checkNode.checked = false;
	sNode = document.getElementById("mondo_image_stopsitelist");
	sNode.value = "";
	sNode.disabled = true;
	checkNode = document.getElementById("mondo_image_stopuserfilter");
	checkNode.disabled = false;
	checkNode.checked = false;
	sNode = document.getElementById("mondo_image_stopuserlist");
	sNode.value = "";
	sNode.disabled = true;
	sNode = document.getElementById("mondo_image_maxHeight");
	sNode.value = defaultLimitMaxHeight;
	sNode = document.getElementById("mondo_image_maxWidth");
	sNode.value = defaultLimitMaxWidth;

	showActiveStates();
}

function gatherInfo()
{
	var sNode = document.getElementById("mondo_image_extensionlist");
	allowedExtensions = massageInput(sNode.value);
	var checkNode = document.getElementById("mondo_image_sitefilter");
	limitSites = checkNode.checked;
	sNode = document.getElementById("mondo_image_sitelist");
	allowedSites = massageInput(sNode.value);
	checkNode = document.getElementById("mondo_image_userfilter");
	limitUsers = checkNode.checked;
	sNode = document.getElementById("mondo_image_userlist");
	allowedUsers = massageInput(sNode.value);
	checkNode = document.getElementById("mondo_image_textfilter");
	limitText = checkNode.checked;
	sNode = document.getElementById("mondo_image_textlist");
	allowedText = massageInput(sNode.value);
	checkNode = document.getElementById("mondo_image_masterswitch");
	masterSwitchSet = checkNode.checked;
	sNode = document.getElementById("mondo_image_maxHeight");
	limitMaxHeight = sNode.value;
	sNode = document.getElementById("mondo_image_maxWidth");
	limitMaxWidth = sNode.value;
	checkNode = document.getElementById("mondo_image_stopsitefilter");
	excludeSites = checkNode.checked;
	sNode = document.getElementById("mondo_image_stopsitelist");
	notAllowedSites = massageInput(sNode.value);
	checkNode = document.getElementById("mondo_image_stopuserfilter");
	excludeUsers = checkNode.checked;
	sNode = document.getElementById("mondo_image_stopuserlist");
	notAllowedUsers = massageInput(sNode.value);
	checkNode = document.getElementById("mondo_image_flagRestricted");
	flagRestricted = checkNode.checked;
}

function saveUserParams(event)
{
	if (event != null)
	{
		event.stopPropagation();
	}
	gatherInfo();
	saveInfoToStore();
	boxUp = false;
//	mondo_image_paramBox.style.width = "0px";
//	mondo_image_paramBox.style.height = "0px";
//	mondo_image_paramBox.style.visibility = "hidden";
	mondo_image_paramBox = mondo_image_paramBox.parentNode.removeChild(mondo_image_paramBox);
}

function cancelParamBox(event)
{
	if (event != null)
	{
		event.stopPropagation();
	}
	showCurrentParams();	// reset to entry status
	boxUp = false;
//	mondo_image_paramBox.style.width = "0px";
//	mondo_image_paramBox.style.height = "0px";
//	mondo_image_paramBox.style.visibility = "hidden";
	mondo_image_paramBox = mondo_image_paramBox.parentNode.removeChild(mondo_image_paramBox);
}

function showCurrentParams()
{
	var sNode = document.getElementById("mondo_image_extensionlist");
	sNode.value = allowedExtensions.join(",");
	var checkNode = document.getElementById("mondo_image_sitefilter");
	checkNode.checked = limitSites;
	sNode = document.getElementById("mondo_image_sitelist");
	sNode.value = allowedSites.join(",");
	checkNode = document.getElementById("mondo_image_userfilter");
	checkNode.checked = limitUsers;
	sNode = document.getElementById("mondo_image_userlist");
	sNode.value = allowedUsers.join(",");
	checkNode = document.getElementById("mondo_image_textfilter");
	checkNode.checked = limitText;
	sNode = document.getElementById("mondo_image_textlist");
	sNode.value = allowedText.join(",");
	sNode = document.getElementById("mondo_image_maxHeight");
	sNode.value = limitMaxHeight;
	sNode = document.getElementById("mondo_image_maxWidth");
	sNode.value = limitMaxWidth;

	checkNode = document.getElementById("mondo_image_stopsitefilter");
	checkNode.checked = excludeSites;
	sNode = document.getElementById("mondo_image_stopsitelist");
	sNode.value = notAllowedSites.join(",");
	checkNode = document.getElementById("mondo_image_stopuserfilter");
	checkNode.checked = excludeUsers;
	sNode = document.getElementById("mondo_image_stopuserlist");
	sNode.value = notAllowedUsers.join(",");
	checkNode = document.getElementById("mondo_image_flagRestricted");
	checkNode.checked = flagRestricted;

	checkNode = document.getElementById("mondo_image_masterswitch");
	checkNode.checked = masterSwitchSet;
	if (masterSwitchSet)
	{
		disableEverything();
	}
	else
	{
		enableControls();
	}
}

function simpleAdvancedSwitch(event)
{
	if (event != null)
	{
		event.stopPropagation();
	}
	var simpleNode = document.getElementById("mondo_image_simple");
	var advancedNode = document.getElementById("mondo_image_advanced");
	var buttonNode = document.getElementById("simpleAdvancedButton");
	var cNode = buttonNode.firstChild;
	if (cNode.nodeValue === "Advanced")
	{
		cNode.nodeValue = "Simple";
		simpleNode.style.width = "0px;"
		simpleNode.style.height = "0px;"
		simpleNode.style.visibility = "hidden";
		advancedNode.style.width = "auto";
		advancedNode.style.height = "auto";
		advancedNode.style.visibility = "visible";
	}
	else
	{
		cNode.nodeValue = "Advanced";
		advancedNode.style.width = "0px;"
		advancedNode.style.height = "0px;"
		advancedNode.style.visibility = "hidden";
		simpleNode.style.width = "auto";
		simpleNode.style.height = "auto";
		simpleNode.style.visibility = "visible";
	}
}

function buildParamBox()
{
	var addHeader =
		'td.mondo_image_basicstyle { margin-left: 120px; }' +
		'td.mondo_image_basicstyle INPUT,td.mondo_image_basicstyle DIV,td.mondo_image_basicstyle SPAN' +
		'{ font: 12px Verdana, Arial, Helvetica, sans-serif; }' +
		'td.mondo_image_basicstyle INPUT' +
		'{ background-color: white }' +
		'td.mondo_image_basicstyle SPAN { color: darkblue }' +
		'.mondo_image_title { font-weight: bold !important; font-size: 18px !important; padding-bottom: 8px; margin-left: 30px; }' +
		'.mondo_image_userinput { margin-left: 30px; margin-right: 16px; width: 400px; }' +
		'.mondo_image_limitinput { width: 70px; }' +
		'.mondo_image_checks { margin-left: 5px; }' +
		'.mondo_image_checktext { line-height: 24px !important; }' +
		'button.mondo_image { width: 80px; position: absolute; bottom: 10px; }';
	var test_style = document.createElement("style");
	test_style.setAttribute('type', 'text/css');
	test_style.innerHTML = addHeader;
	document.getElementsByTagName('head')[0].appendChild(test_style);

	mondo_image_paramBox = document.createElement("td");
	mondo_image_paramBox.className = "mondo_image_basicstyle";
	mondo_image_paramBox.style.lineHeight = "26px";
	mondo_image_paramBox.style.color = "darkblue";
	mondo_image_paramBox.style.position = "fixed";
	mondo_image_paramBox.style.bottom = "40px";
	mondo_image_paramBox.style.left = "5px";
	mondo_image_paramBox.style.backgroundColor = "#FFCFCF";
	mondo_image_paramBox.style.borderColor = "black";
	mondo_image_paramBox.style.borderWidth = "1px";
	mondo_image_paramBox.style.borderStyle = "solid";
	mondo_image_paramBox.style.opacity = ".94";

	var paramBoxHtml =
		'<div class="mondo_image_title">Mondo Image</div>' +
		'<div id="mondo_image_simple">' +
		'<div class="mondo_image_checktext"><span class="mondo_image_checks"></span>Only expand images with these extensions:</div>' +
		'<div><input id="mondo_image_extensionlist" class="mondo_image_userinput" type="text"></div>' +
		'<br>' +
		'<div class="mondo_image_checktext"><span class="mondo_image_checks"><input id="mondo_image_sitefilter" type="checkbox"></span>Only expand images from these sites:</div>' +
		'<div><input id="mondo_image_sitelist" class="mondo_image_userinput" type="text"></div>' +
		'<br>' +
		'<div class="mondo_image_checktext"><span class="mondo_image_checks"><input id="mondo_image_userfilter" type="checkbox"></span>Only expand images in messages from these users:</div>' +
		'<div><input id="mondo_image_userlist" class="mondo_image_userinput" type="text"></div>' +
		'<br>' +
		'<div class="mondo_image_checktext"><span class="mondo_image_checks"><input id="mondo_image_textfilter" type="checkbox"></span>Only expand images in messages containing this text:&nbsp;&nbsp</div>' +
		'<div><input id="mondo_image_textlist" class="mondo_image_userinput" type="text"></div>' +
		'<br>' +
		'<div class="mondo_image_checktext"><span class="mondo_image_checks"><input id="mondo_image_masterswitch" type="checkbox"></span>Turn off image expansion - <b>Master Override</b></div>' +
		'</div>' +
		'<div id ="mondo_image_advanced" style="visibility: hidden; width:0px; height:0px;">' +
		'<div><span class="mondo_image_userinput">Maximum image size&nbsp;&nbsp;&nbsp;Height:&nbsp;' +
		'<input id="mondo_image_maxHeight" class="mondo_image_limitinput" type="text">' +
		'&nbsp;&nbsp;Width:&nbsp;<input id="mondo_image_maxWidth" class="mondo_image_limitinput" type="text"></span></div>' +
		'<br>' +
		'<div class="mondo_image_checktext"><span class="mondo_image_checks"><input id="mondo_image_stopsitefilter" type="checkbox"></span>Never expand images from these sites:</div>' +
		'<div><input id="mondo_image_stopsitelist" class="mondo_image_userinput" type="text"></div>' +
		'<br>' +
		'<div class="mondo_image_checktext"><span class="mondo_image_checks"><input id="mondo_image_stopuserfilter" type="checkbox"></span>Never expand images from these users:</div>' +
		'<div><input id="mondo_image_stopuserlist" class="mondo_image_userinput" type="text"></div>' +
		'<br>' +
		'<div class="mondo_image_checktext"><span class="mondo_image_checks"><input id="mondo_image_flagRestricted" type="checkbox"></span>Show restricted images placeholder with inline image link.</b></div>' +
		'</div>' +
		'</div>' +
		'<br><br>';
	mondo_image_paramBox.innerHTML = paramBoxHtml;

	var resetNode = document.createElement(buttonText);
	resetNode.setAttribute("class", "mondo_image");
	resetNode.style.marginLeft = "30px";
	resetNode.appendChild(document.createTextNode("Reset"));
	var simpleAdvancedNode = document.createElement(buttonText);
	simpleAdvancedNode.setAttribute("class", "mondo_image");
	simpleAdvancedNode.setAttribute("id", "simpleAdvancedButton");
	simpleAdvancedNode.style.marginLeft = "130px";
	simpleAdvancedNode.appendChild(document.createTextNode("Advanced"));
	var saveNode = document.createElement(buttonText);
	saveNode.setAttribute("class", "mondo_image");
	saveNode.style.marginLeft = "250px";
	saveNode.appendChild(document.createTextNode("Save"));
	var cancelNode = document.createElement(buttonText);
	cancelNode.setAttribute("class", "mondo_image");
	cancelNode.style.marginLeft = "350px";
	cancelNode.appendChild(document.createTextNode("Cancel"));
	mondo_image_paramBox.appendChild(resetNode);
	mondo_image_paramBox.appendChild(simpleAdvancedNode);
	mondo_image_paramBox.appendChild(saveNode);
	mondo_image_paramBox.appendChild(cancelNode);
	document.getElementsByTagName('body')[0].appendChild(mondo_image_paramBox);
	var checkNode = document.getElementById("mondo_image_sitefilter");
	checkNode.addEventListener('change', setSiteListStatus, true);
	checkNode = document.getElementById("mondo_image_userfilter");
	checkNode.addEventListener('change', setUserListStatus, true);
	checkNode = document.getElementById("mondo_image_textfilter");
	checkNode.addEventListener('change', setTextListStatus, true);
	checkNode = document.getElementById("mondo_image_masterswitch");
	checkNode.addEventListener('change', updateMasterSwitch, true);
	checkNode = document.getElementById("mondo_image_stopsitefilter");
	checkNode.addEventListener('change', setStopSiteListStatus, true);
	checkNode = document.getElementById("mondo_image_stopuserfilter");
	checkNode.addEventListener('change', setStopUserListStatus, true);
	resetNode.addEventListener('click', resetToDefaults, true);
	simpleAdvancedNode.addEventListener('click', simpleAdvancedSwitch, true);
	saveNode.addEventListener('click', saveUserParams, true);
	cancelNode.addEventListener('click', cancelParamBox, true);
}

function showParamBox(event)
{
	if (event != null)
	{
		event.stopPropagation();
	}
	if (boxUp)
	{
		return;
	}
	boxUp = true;

	if (mondo_image_paramBox == null)
	{
		buildParamBox();
	}
	mondo_image_paramBox.style.width = "auto";
	mondo_image_paramBox.style.height = "auto";
	mondo_image_paramBox.style.visibility = "visible";
	document.getElementsByTagName('body')[0].appendChild(mondo_image_paramBox);
	showCurrentParams();
}

function setSearchRegExp()
{
	aSearchExtensions.length = 0;
	aSearchSites.length = 0;
	aSearchUsers.length = 0;
	aSearchText.length = 0;
	aSearchBadSites.length = 0;
	aSearchBadUsers.length = 0;
	for (var i = 0; i < allowedExtensions.length; i++)
	{
		tString = allowedExtensions[i];
		if (tString.substr(0,1) != ".")
		{
			tString = "." + tString;
		}
		// version 1.3, make file extensions case-insensitive
		aSearchExtensions[i] = new RegExp("\\" + tString + "$", "i");
	}
	for (var i = 0; limitSites && i < allowedSites.length; i++)
	{
		var tString = allowedSites[i];
		tString = tString.replace(/\./g, "\\.");	// ensure '.'s are literal, not wildcard
		tString = tString.replace(/^\*(\\\.)?/, "(\\w+\\.)*");	// remember '.'s already escaped per previous line
		aSearchSites[i] = new RegExp("^(http://)?" + tString + "\\b");
	}
	for (var i = 0; limitUsers && i < allowedUsers.length; i++)
	{
		aSearchUsers[i] = allowedUsers[i];	// exact match
	}
	for (var i = 0; limitText && i < allowedText.length; i++)
	{
		tString = allowedText[i];
		aSearchText[i] = new RegExp("\\b" + tString + "\\b", "i");	// case-insensitive, bounded
	}
	for (var i = 0; excludeSites && i < notAllowedSites.length; i++)
	{
		var tString = notAllowedSites[i];
		tString = tString.replace(/\./g, "\\.");	// ensure '.'s are literal, not wildcard
		tString = tString.replace(/^\*(\\\.)?/, "(\\w+\\.)*");	// remember '.'s already escaped per previous line
		aSearchBadSites[i] = new RegExp("^(http://)?" + tString + "\\b");
	}
	for (var i = 0; excludeUsers && i < notAllowedUsers.length; i++)
	{
		aSearchBadUsers[i] = notAllowedUsers[i];	// exact match
	}
}

function doInlineImages()
{
	if (masterSwitchSet ||
		allowedExtensions.length == 0 ||
		(limitSites && allowedSites.length == 0) ||
		(limitUsers && allowedUsers.length == 0) ||
		(limitText && allowedText.length == 0))
	{
		return;	// no processing
	}
	setSearchRegExp();

	var xpath = "//div[@class='copy' or @class='comments' or @class='comments best']";
	var divNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	var startNode = null;
	var aPostText = new Array();
	var aPostLinks = new Array();
	var aPostAnchors = new Array();
	var aExpandLinks = new Array();
	var aExpandAnchors = new Array();
	var aRestrictedLinks = new Array();
	var aRestrictedAnchors = new Array();
	for (var parseLoop = 0; parseLoop < divNodes.snapshotLength; parseLoop++)
	{
		var parseMe = false;
		var aNode = divNodes.snapshotItem(parseLoop);
		if (startNode == null && aNode.getAttribute('class') === "copy")
		{
			// main post
			startNode = aNode;
			parseMe = true;
		}
		else if (startNode != null &&
			(aNode.getAttribute('class') === "comments" || aNode.getAttribute('class') === "comments best"))
		{
			parseMe = true;
		}

		if (parseMe)
		{
			aPostText.length = 0;
			aPostLinks.length = 0;
			aPostAnchors.length = 0;
			var userName = null;
			var cNode = aNode.firstChild;
			while (cNode && (cNode.nodeName != "SPAN" || cNode.getAttribute('class') != "smallcopy"))
			{
				// only check children and grandchildren
				//  this may need to nest deeper as an iterative process
				if (cNode.nodeName === "#text" && cNode.nodeValue)
				{
					aPostText.push(cNode.nodeValue);
				}
				else if (cNode.nodeName === "A")
				{
					aPostAnchors.push(cNode);
					aPostLinks.push(cNode.getAttribute('href'));
				}
				var c2Node = cNode.firstChild;
				while (c2Node)
				{
					if (c2Node.nodeName === "#text" && c2Node.nodeValue)
					{
						aPostText.push(c2Node.nodeValue);
					}
					else if (c2Node.nodeName == "A")
					{
						aPostAnchors.push(c2Node);
						aPostLinks.push(c2Node.getAttribute('href'));
					}
					c2Node = c2Node.nextSibling;
				}
				cNode = cNode.nextSibling;
			}

			if (cNode)
			{
				// footer info
				// minor qualification in case of extensions
				var userHrefText = null;
				var c2Node = cNode.firstChild;
				while (c2Node && (c2Node.nodeName != "A" ||
					userHrefText.match("http://www\.metafilter\.com/user/[0-9]+") === null))
				{
					c2Node = c2Node.nextSibling;
					if (c2Node && c2Node.nodeName === "A")
					{
						userHrefText = c2Node.getAttribute('href');
					}
				}
				var tNode = null;
				if (c2Node)
				{
					// got our "A", get the user name text
					tNode = c2Node.firstChild;
					while (tNode && tNode.nodeName != "#text")
					{
						tNode = tNode.nextSibling;
					}
					if (tNode)
					{
						userName = tNode.nodeValue;
					}
				}
			}

			// process potential IMG's based on body info and user from footer
			// check extensions on links
			var newImage = false;
			for (var i = 0; i < aSearchExtensions.length; i++)
			{
				for (var j = 0; j < aPostLinks.length; j++)
				{
					if (aSearchExtensions[i].test(aPostLinks[j]))
					{
						var excludeInclude = false;	// explicitly excluded or included
						// allowed extension, check if site allowed
						var siteAllowed = !limitSites;
						if (limitSites)
						{
							for (var k = 0; k < aSearchSites.length; k++)
							{
								if (aSearchSites[k].test(aPostLinks[j]))
								{
									siteAllowed = true;
									break;
								}
							}
						}
						if (excludeSites)
						{
							// check the bad guy sites
							for (var k = 0; k < aSearchBadSites.length; k++)
							{
								if (aSearchBadSites[k].test(aPostLinks[j]))
								{
									// don't allow this site
									siteAllowed = false;
									aRestrictedLinks.push(aPostLinks[j]);
									aRestrictedAnchors.push(aPostAnchors[j]);
									excludeInclude = true;
									break;
								}
							}
						}
						if (siteAllowed)
						{
							aExpandLinks.push(aPostLinks[j]);
							aExpandAnchors.push(aPostAnchors[j]);
							excludeInclude = true;
							newImage = true;
						}
						if (!excludeInclude)
						{
							// this site was neither explicitly included or excluded
							//  track it as restricted (excluded), because default condition is excluded
								aRestrictedLinks.push(aPostLinks[j]);
								aRestrictedAnchors.push(aPostAnchors[j]);
						}
					}
				}
			}
			if (!newImage)
			{
				continue;	// no allowed extension/site images
			}
			// check for trigger text
			var showImage = !limitText;
			if (limitText)
			{
				var textBlob = aPostText.join(" ");
				for (var i = 0; i < aSearchText.length; i++)
				{
					if (aSearchText[i].test(textBlob))
					{
						showImage = true;
						break;
					}
				}
			}
			if (!showImage)
			{
				aRestrictedLinks.push(aExpandLinks.pop());	// kill saved image info, save as restricted
				aRestrictedAnchors.push(aExpandAnchors.pop());
				continue;	// no trigger text
			}
			// check for users
			var showImage = !limitUsers;
			if (limitUsers)
			{
				for (var i = 0; i < aSearchUsers.length; i++)
				{
					if (aSearchUsers[i] === userName)
					{
						showImage = true;
						break;
					}
				}
			}
			if (showImage && excludeUsers)
			{
				// stop bad guy users
				for (var i = 0; i < aSearchBadUsers.length; i++)
				{
					if (aSearchBadUsers[i] === userName)
					{
						showImage = false;
						break;
					}
				}
			}
			if (!showImage)
			{
				aRestrictedLinks.push(aExpandLinks.pop());	// kill saved image info, save as restricted
				aRestrictedAnchors.push(aExpandAnchors.pop());
				continue;	// no allowed users
			}
		}
	}
	// display images
	for (var i = 0; i < aExpandLinks.length; i++)
	{
		var startBR = document.createElement("BR");
		var endBR = document.createElement("BR");
		var newIMG = document.createElement("IMG");
		newIMG.setAttribute("src", aExpandLinks[i]);
		if (limitMaxWidth)
		{
			newIMG.style.maxWidth = limitMaxWidth;
		}
		if (limitMaxHeight)
		{
			newIMG.style.maxHeight = limitMaxHeight;
		}
		var pNode = aExpandAnchors[i].parentNode;
		var nextChild = aExpandAnchors[i].nextSibling;
		var newNode = pNode.insertBefore(endBR, nextChild);
		newNode = pNode.insertBefore(newIMG, newNode);
		newNode = pNode.insertBefore(startBR, newNode);
	}

	// display restricted image placeholder
	for (var i = 0; flagRestricted && i < aRestrictedLinks.length; i++)
	{
		var startBR = document.createElement("BR");
		var endBR = document.createElement("BR");
		var newIMG = document.createElement("IMG");
		newIMG.setAttribute("src", restrictedImage);
		newIMG.setAttribute("id", "mondo_image_restricted"+i);
		var newAnchor = document.createElement("A");
		newAnchor.setAttribute("href", "javascript:" +
			"var mondo_image_restricted_sourceLink = '" + aRestrictedLinks[i] + "';" +
			"var mondo_image_restricted_imageNode = document.getElementById('mondo_image_restricted" + i + "');" +
			"mondo_image_restricted_imageNode.setAttribute('src', mondo_image_restricted_sourceLink);"
		);
		newAnchor.appendChild(newIMG);
		var pNode = aRestrictedAnchors[i].parentNode;
		var nextChild = aRestrictedAnchors[i].nextSibling;
		var newNode = pNode.insertBefore(endBR, nextChild);
		newNode = pNode.insertBefore(newAnchor, newNode);
		newNode = pNode.insertBefore(startBR, newNode);
	}
}

function createCutePinkBoxFromHell()
{
	mondo_image_control = document.createElement(buttonText);
	mondo_image_control.appendChild(document.createTextNode("Mondo Image"));
	mondo_image_control.style.position = "fixed";
	mondo_image_control.style.bottom = miBottomPos;
	mondo_image_control.style.left = miLeftPos;
	mondo_image_control.style.fontSize = miFontSize;
	mondo_image_control.style.fontWeight = miFontWeight;
	mondo_image_control.style.color = miColor;
	mondo_image_control.style.opacity = miOpacity;
	mondo_image_control.style.backgroundColor = miBackgroundColor;
}

function handleMouseDown(event)
{
	var targetedArea = false;
	if (clickAreaDirection != "right" &&
		event.clientX > clickAreaOffset &&
		event.clientX < clickAreaOffset + clickAreaWidth)
	{
		targetedArea = true;
	}
	if (clickAreaDirection != "left" &&
		event.clientX > document.body.clientWidth - clickAreaOffset - clickAreaWidth &&
		event.clientX < document.body.clientWidth - clickAreaOffset)
	{
		targetedArea = true;
	}
	if (!targetedArea)
	{
		return;
	}

	var rightNow = new Date();
	var lastTime = rightNow.getTime();
	if (handleMouseDown.timeStamp == null)
	{
		handleMouseDown.timeStamp = 0;
	}
	if (handleMouseDown.timeStamp == 0)
	{
		handleMouseDown.timeStamp = lastTime;
	}
	else if (handleMouseDown.timeStamp + clickAreaSeconds * 1000 < lastTime)
	{
		// reset the clock, count
		handleMouseDown.timeStamp = lastTime;
		handleMouseDown.clickCount = 0;
	}

	if (handleMouseDown.clickCount == null)
	{
		handleMouseDown.clickCount = 0;
	}
	handleMouseDown.clickCount++;
	if (handleMouseDown.clickCount < clickAreaClicks)
	{
		return;
	}
	handleMouseDown.clickCount = 0;
	handleMouseDown.timeStamp = 0;
	showParamBox();
}

function init()
{
	mondo_image_control = document.getElementById("mondo_image_control")
	if (mondo_image_control)
	{
		return;
	}
	GM_setValue("Version", mondoImageVersion);
	loadStoredInfo();

	createCutePinkBoxFromHell();
	if (cutePinkBoxFromHell)
	{
		document.getElementsByTagName('body')[0].appendChild(mondo_image_control);
		mondo_image_control.addEventListener('click', showParamBox, true);
	}

	doInlineImages();
}

function main()
{
	if (!GM_setValue)
	{
		return;
	}
	init();
}

//window.addEventListener("load", main, false );
window.addEventListener("mousedown", handleMouseDown, true);
main();Because it's your web | Donate 
Powered by monkeys and unicorns with the help of many friends 

Policy & Guidelines: DMCA Privacy Policy 
