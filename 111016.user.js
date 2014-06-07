// ==UserScript==
// @name           Devsidebar
// @description    Deviantart
// @namespace      devbars
// @include        *
// @include        about:blank
// @include        about:newtab
// @exclude        *.deviantart.*
// @exclude        /\.(gif)|(jpg)|(png)/i
// @version        2.43
// @contributor    Dediggefedde
// @grant		   GM_registerMenuCommand
// @grant		   GM_setValue
// @grant		   GM_getValue
// @grant		   GM_xmlhttpRequest
// @grant		   GM_log
// ==/UserScript==


(function(){
if(document.getElementsByTagName("head").length==0)return;

var alt="";
var wartezeit = 10000;
var akthigh=true;
var akthighcol="#ff7878";
var textcol="#BBD99C";
var hauptlink="http://www.deviantart.com";
var ins = true;
var userid;
var neu=false;	
var linksanz=false;

// function verschw(){}
// function optionwindow(){}
// GM_registerMenuCommand("Disable/Enable Devbar", verschw,"N","","D");
// GM_registerMenuCommand("Configurate Devbar", optionwindow);

//All Icons Copyright to DeviantArt
var backico="url(data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%00H%00H%00%00%FF%FE%00%13Created%20with%20GIMP%FF%DB%00C%00%05%03%04%04%04%03%05%04%04%04%05%05%05%06%07%0C%08%07%07%07%07%0F%0B%0B%09%0C%11%0F%12%12%11%0F%11%11%13%16%1C%17%13%14%1A%15%11%11%18!%18%1A%1D%1D%1F%1F%1F%13%17%22%24%22%1E%24%1C%1E%1F%1E%FF%DB%00C%01%05%05%05%07%06%07%0E%08%08%0E%1E%14%11%14%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%FF%C0%00%11%08%00%14%00%01%03%01%22%00%02%11%01%03%11%01%FF%C4%00%17%00%01%00%03%00%00%00%00%00%00%00%00%00%00%00%00%00%00%04%05%07%FF%C4%00%17%10%01%01%01%01%00%00%00%00%00%00%00%00%00%00%00%00%00%14a%01%FF%C4%00%16%01%01%01%01%00%00%00%00%00%00%00%00%00%00%00%00%00%01%03%04%FF%C4%00%15%11%01%01%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%11%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%CD%E6%C1w6tJ%B1T%F0%00%7F%FF%D9)";
var varbackico="url(data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F4QKtRXhpZgAATU0AKgAAAAgAAAAAAA4AAgIBAAQAAAABAAAALAICAAQAAAABAAACeQAAAAD%2F2P%2FgABBKRklGAAEBAAABAAEAAP%2FbAEMACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0Mv%2FbAEMBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv%2FAABEIAAEAAQMBIgACEQEDEQH%2FxAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv%2FxAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5%2Bjp6vHy8%2FT19vf4%2Bfr%2FxAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv%2FxAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4%2BTl5ufo6ery8%2FT19vf4%2Bfr%2F2gAMAwEAAhEDEQA%2FAPPKKKK4z6I%2F%2F9n%2F%2FgATQ3JlYXRlZCB3aXRoIEdJTVD%2F2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7%2F2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7%2FwAARCAAUAAEDASIAAhEBAxEB%2F8QAFwABAAMAAAAAAAAAAAAAAAAAAAQFB%2F%2FEABgQAQADAQAAAAAAAAAAAAAAAAABE2Gh%2F8QAFwEAAwEAAAAAAAAAAAAAAAAAAwQFB%2F%2FEABYRAQEBAAAAAAAAAAAAAAAAAAASFP%2FaAAwDAQACEQMRAD8AxyjJFtRnRGtpOdNACPv%2F2Q%3D%3D)";
var barhotico="data:image/gif,GIF89a%12%00%13%00%A5%26%00%00%00%00%E2S%1C%E6l'%82%87%82%8C%8C%8C%EC%80(%93%94%93%EB%874%F1%8C%25%9A%9C%9A%EA%8FC%E7%90C%EE%957%A3%A3%A3%F3%98-%AD%AD%AD%F1%A7A%B5%B5%B5%F2%B1M%BA%BA%BA%C0%C0%C0%BE%C5%BE%CB%CB%CB%D5%D5%D5%DA%DA%DA%DE%DE%DE%E2%E2%E2%E4%E4%E4%F4%E8%9D%E6%E6%E6%E8%E8%E8%EA%EA%EA%F8%ED%A7%ED%ED%ED%F7%F0%B2%FC%F3%A4%F3%F3%F3%FD%FA%FA%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%0A%00%3F%00%2C%00%00%00%00%12%00%13%00%00%06%B4%C0%9Fp%F8%03%10%8F%C8%A21y4%02%10K%A6%10P%A0%3A%01%D8%2Cv%EA%80%40%1CYR%C9D.c%05%12%91H%E2%80%5E%3C%A4P%E8%E3%A1%60%0B%A0%3C%88%01%A8%5C%3Art%1D%13g%20%23%23%20%07%00%16%19%1Fs%1E%1D%1B%11X%01%0A%1C%1C%0B%02%8B%1A%8F%91%1A%0FN%01%02%02%01%00%14%16%1A%82%1B%1A%19%A0SY%A7%19%1D%90%AB%19%19%0DK%00%19%16%BC%B2%B4%AC%19%18%B8S%24%AB%1A%B3%9E%B6%18%18%09%B9%26%81%BF%CA%18%17%06%CE%9D%B5%C1%D3%D4%CE%AA%C0%CB%17%E0%04%CE%D1%D9%E0%E1%B9%16%14%13%11%0F%0F%0D%0D%09%06%06%04%04%03QZ%F8%F8%3FA%00%3B";
var bardevico="data:image/gif,GIF89a%0E%00%0F%00%84%1E%005%1F%0DI-%10J8)%84A%00bJ2jR%40%92M%00%99V%01v%5B%3E%88kN%CA%60%00%D5n%00%DCu%00%A0%80Y%E9x%01%B1%90l%C9%92Y%C5%A2r%CB%A9%82%F6%A6G%D5%B9%85%EC%B8%8F%CE%C5%99%D4%CA%A5%E5%D2%A8%DD%D5%AB%E7%E0%B7%F1%E6%B8%EF%EA%C8%F6%EF%CB%FF%FF%FF%FF%FF%FF!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%0E%00%0F%00%00%05%88%E0%24%8Edy%9Chz%3A%D3!I%14%D54%0Fg%1F%ECAi%14A%08%82%C6%8D%D1%A2p%12%89%0E%26%20%C0t%0CD%9DF%90%E0P%12%01%84%C6%B0hI4%81%C4%A3%82%00%142%DC%D6%C3%02%D0%3C6%11%80%E0%92%3E%3C%24%E1%7B%02%10%B8%0C%BAv%3DT%09%3F%01%12%7Fj%0F%3E%09%18%0F%05%04%11%03%0A%89%04%08%10p%08%05%91%93v%08%90%1D%1D%10%08%08%0F%92-%06%A8%A9%03%AB%AB%0A%0C%0C%0E%AF%0B%B3%0A%B5%B6!%00%3B";
var barmesico="data:image/gif,GIF89a%10%00%0C%00%E3%08%00%00%00%00%00%15%B1%20)6%007%E0%3CGLX%86xl%81x%00%D3%EA%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%0A%00%08%00%2C%00%00%00%00%10%00%0C%00%00%04L%10I%04%AA%AC%60j%20z%EDB%B6%19%A4%D1%95%86H%19DKt.%91%5E%AF%D0%C25%91%01%FA%97%87%95%1E%A0%40%E4%80%86%C5J%E10%08%14%8CC%A6S9%A8%3E1%85%EA%E0Z%084%9F%97%EEwG%04O%90f%8AE%A3%16E%00%00%3B";
var barcomico="data:image/gif,GIF89a%10%00%0F%00%84%13%00%00%00%00%A9%9Ao%B1%A3%7B%B6%A8%86%BE%B3%92%D6%C9%AD%D7%CB%B0%D9%CD%B4%DB%D0%B8%DC%D2%BA%DD%D3%BC%DE%D4%BE%DF%D5%C0%E0%D7%C2%E2%D9%C5%E3%DB%C8%F7%F3%E3%F9%F6%E9%FA%F7%EC%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%10%00%0F%00%00%05d%E0'~%40i%96%E3XJ%2C%1B%BD%A8%08%B0%CF%E38%0D%B3(0)%D56%9CN%91%40%1C%04%AB%DA-%B7%2B%1E%8EIG%89QJ%94%9E%C8%D9%AD%B4(!%AE%86%C0J%D84%3E%0D%05%F1%8CI4%1F%D0i%00%89%40h%3F%DF%85%B8%0A0%E8%0B%04pb)2'%10z%83%88%00%10%82%88%89%8C%8D%831%1F!%00%3B";
var barnotico="data:image/gif,GIF89a%10%00%0F%00%84%01%00%00%00%00%10%0E%10%AC%03%00%A0%80Y%DB%AE%00%EA%B2%00%F8%AEg%DB%CC%00%FF%C3%03%F9%C8s%DC%D6%5B%FE%D5%03%D9%D9%D9%ED%E3c%FB%E0n%FE%F0%07%FD%EBy%EF%EA%C8%F9%F4c%F6%EF%CB%F8%F6%D6%FB%F8%CC%10%0E%10%10%0E%10%10%0E%10%10%0E%10%10%0E%10%10%0E%10%10%0E%10%10%0E%10%10%0E%10%10%0E%10!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%10%00%0F%00%00%05m%E0'%8E%22%60%0C%00%F9%01l%0BT%83%E0~%01e%DB%00%05%25%00%13M%94%40MB%CC%ED%00%0AEC%B2%10R%24%0Fc%22p%20%14%88%CDan%C0%3B%1C%96X%A7%040p%20%95%C4%B0%96U-%20%1E%08%F5S%A2%F0.%88%8F%87%3C%0DN%A7%B3s%08o%82pqLbxzyP%7B~%8Ej%0B%91%92%93%93%014B%98%99%99%1F!%00%3B";
var barhauptico="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%0B%08%06%00%00%00%A0G%D7%5C%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%DB%03%06%10%24%2B%97%94%D8%D6%00%00%00%1DiTXtComment%00%00%00%00%00Created%20with%20GIMPd.e%07%00%00%02%20IDAT(%CF5%92KHTa%00F%CF%BD%FFu%AE%F8%E86%9AY%C3LHB%A0%ADB%B2%89%22%0A%8B%16B%12%E1F%91%04i%D3%A2MR%90%ABZ%B8%EAAd%09%11%09S!%ED%CA20%8BB%0CLZ%B4J%09m%C4nNS%A9%F3%BA%93%F7%F9%B7%98%3C%9B%C3%B7%3E%9F%D2z%0Afg%00%B6%E8(%B9(%01P%191Q%A4%8D*%01%01%5E%00%AA%04%D7%01O%02%EB%C4%0F%80%86%A4%84%C8E%E7%3Eq%A3%B8%81%DE%DD%BBrk%FEk%BD%89%9A%A6%BE%16%D6s%E0X%06%B0%15%02%DBF%C5%C4%C7%D6D%00%80%8E%5B%D981i5%C7%E3%C4%9E%26%88%D9N%DA%CC%17%A8%F3%5C%D0C%98%95UY%BBP%C8%EA%D3%1F%60j%9A%9B%99%3C3%22%D2%88%5Ec%10%7F%92p%2F%EDi%A4%26%080%7C%89%7B%A4%8D7%D1%9D%EC%5BIQ%D5%7F%85%C4%EDa%7Dt1%E9%CF%F5%F5%D2v%E28-%2F%C6%99%11%DBb4%3C~%C4%A0%B7A%A4%FB%1CC%15%3AFs%13%BB*%CA1%8A%1B%ACvv%12%AD%AEf%FB%D4%FB%D8%E7%E5%E5L%CEq%A8%3At%90%DD%CF_2%A1)%A0%5B%16%B5c%AFXH.%84%DF%5D%1Bt%16%CF%9C%B6%86%BA%BA%08%1F%3B%C9%B3%9E%1E%8C%8EvZ%8E%1E%5E%BA%1E%0E%93%B4%1DB%96%C5%9A%12%E0h(%A0%AA%AC-%24y%BD%A3~%BD%BCu%3Fz*%0D%86AmO%17%7B%EF%DEc%F2%C2y%8A%1Fg)L%BE%E5%CE%97y~%14%0A%D8%CDM%7C%D7P%20%08%A8%BB%3A%40%BFZFFz%FC%F9%BDF%FE%DB%12%F9%90%A08%94%A8%1B%1D%19Q%1F%A2%E0%23m%13%E9%DB%88%3C%8A%82%D4%00%3B%14%C2%CC%E6i%18%1Bg%F9%FE%03%86s%05-EP.A%B3P%DC%14%02%F7%7FP%09%02%A1%96%86V%A6a%B6wp%F1g%3A%12%02%F9%17%E9%AC%80%E7%94%DA%03%BE%DC%7CB%09%15%7C_%03%3CTOb%F7%9De%11%F9kN%C8%D4%92%60%D5%16d%252%2B%85%9F%91%82%2C%82%2Cl%3A%B0%18%B8%EC%E1%B8%F0%0F%14%FB%F7E%E4%E6%FE%06%00%00%00%00IEND%AEB%60%82";
var devgreatico ="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%0F%08%06%00%00%00%3B%D6%95J%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%DB%08%15%12%0D%1A%B4%F4Z%09%00%00%00%1DiTXtComment%00%00%00%00%00Created%20with%20GIMPd.e%07%00%00%03%10IDAT(%CF%85S%5BLS%07%00%3D%F7%D1%7B%2F%A5r%D7%5B)i%A1%3C%CAKh%22Q%09a%C1!%1B%233%F3c%10%C2%0F%84%04c%DC%AF%3F%EA%87%FAS%13%FD%F2%B5%95%040%FBB%E72%F61%07%DBDF%90%B9%CA%EA%A0%B5%04%E4!tUZ%A8%0AB%E9m%2F%BD%7D%DC%BB%8Fe%0B%1F%1A%CF%D79%C999%3F%E7P%F8%0F%C6%2C%16%3A%B9%10Z%080%9A%25%84%C54%DE%03%FA%7FFE%F2%E6%A7pU%8A%83%ED%E8Z%BB%BE%B0%93%13%04%F9%0A9%06%60%2B%02%24%E2%3C%80%0F%00E%96A%BE%0C%E25d%E2%DFV%B0P2%8F%DC%B8%12%EB%AE%AD%85%25%83%85ON%20(F%91%9DJ%02%2C%83%60%A6%0Er4%0A%D6%F9%08x%E8%C4%B5%B0%08%17Us%14%AC%C0%A3%F6%DB%FE%E4%D9%B2b%08%8A%02%3E%AD%22Y%DF%88%D1%3C%13%0E%AC%85%A0%3B%7D%0E%FD_%F5%B0%DF%F9%FC%E9%F9%13%5Dhl%FA%14%87%86~%81%8B%DAkA%E1%ED%5B%B8%9C%8A%C3%DCq%12%DDZ%16%7Ce%05%F2%B5%1Cx)%8E7mm%C8%DB%B3%07%C6%87%E3%16%EF%CAJ8%92H%40W%F7!%AC%3F%FD%8C%FB4%01%B0%B1%18%0C%83%BFb%D9%BF%AC%7Fp%F1r%C2%D7%DA%12%EBno%87%FE%E3%CFp%B7%B3%13%FC%17%C7p%A8%E1%F0%F3%2Bz%3D%FCr%02L%2C%86MBA%82%06%01%90%246%97%FD%18%C9%C9%DE%D2%EE%B7i%84%D5%10%A0%D7%C3%D0%D9%0E%DB%D7%0E%8C~y%9C%94%5D%8F%95%ED%D118%E6%16%B0%1A%8DB%AE%AC%40%80%06%01(%0A%B2%ED%E7q%3A*%11%E2%F8%BDR%DD%F2%5CR%C3%F1%BE%00C)%D2%BDA%EBh%24PEG%C4%E8%8B%BF%A6%A6%BC15%B5%0EJ%C4%E40T%1A%80%CC0%08n%8B(%1C%F8%01A%23%D7%B6%CFj%AA%CE%9EtOz%C6%87%87%1F%E4%1B%94%F5%D6%96%96F%BD%A0%CF%9D%9B%7B%BAo%F8%B7%91%3Bc%F7%C7%FE%04%90%A2%2Ce%90zn%C2%E5%E81%DF%9D%F5r%BF7%D57%7C%DE%DC%DCl%B1%D9l%E5e%D6%92%1A%0DK%9B%0B%F2%0BJ%0E%D7%D5%99%8A%AD%25%07sM%A6O%2C%05yY%14I%07%A85%1F%D2%A7%CE%60%EB%0F%E7%CEFs%C3%D1%9D%A2%A2%A2%CE%AA%AA%AA%5C%8A%A2%08k%915KI)%C5%0C%C3%F0%E6%5C%B3F%C3%D0dii9%2F%8Ab%F5%8E%2C%05H%00%B8t%06*6R%EA%91%FA%864ES*%C3%B0%D8X%DFH%BB%DD%9E%C7%DE%E9'%DF%10%04%B1%92%C1i%D5%AD%CD%ED%84%DB%EDv%CE%2F.%5E%20U%FA%7Bz%F7V%8DF%23%82%A1%A02%3D3%BD%E4%F5x%86%FE%F6%3D%BF%25%08%82%B4%1D%0E%7F%E4v%7B%E6gfg~%5C%F2%2F%DD%11t%C2Boo%AFB%EC%0EOLLd%F4%DF%EE%EF%E2%B4%9C%8F%CF%E4%9Dv%BB%5Dr8%1C%86Ph%B55%9DN%3E%E38%9D%CBn%B7%C7%DF%F9%94%81%81%01f%B7VU%95%E8%EB%EB%D3%BC%CD%FB%0F%3C%B4J%A5%DAt%0C%7B%00%00%00%00IEND%AEB%60%82";
var devsmallico ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABmJLR0QAAAAAAAD5Q7t%2FAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QwGEScgkvPOCwAAAolJREFUOMu9k8tLVGEYxp%2FvO7eZ850zzng7Z2y6yOjkgGY6Zko6EEEQbdNFZSGBLapdF2wR0oVa1CL6CwJpVWYTQoRSi8JyFuElLIpKJcvRacg8c46OztdmkAK7QNAL7%2Bb38Fu97wP8h6EA3L%2FgHvEPIsutA8DOcQWAN5dDWEMkHo%2FuUhTFV1RUXB2J1HbMJZOPZFkGIcSglG7w%2B%2F2BurpIx%2Bxs4gn50QyFQjLn3GtZ1vpgeWmbxrQOAJmR4bEttm17KKVSOLx5v6ZrxwghK6%2FH35RTAIhGo7S5Oeq1bSfsN80Dddtq%2B7bX17ffj%2FW5JVmSKKXeioryHQ0N9bHK6qqjvXfvuQRBEAy%2FCbG1pdU3Oja6IbAxEIrubDpT4Msv7eo67%2FN4PIRnOZjKxKbmxhtM02ouX7rCfPn5hGc5VFWFKMgQDb%2FhKiz2ndN0fdepk6dZnscrOks2rIUFqCqDrmtCV9eFxsKCAtFZclY50xgKfG5Q0zDhVl1e1e2SZhIz3HbSsKxv%2BPI1CUIAXdezM4nP3Fm0kU5bSOU4U1UYpglqmuZMuKKqxbLSnT13br9%2F2P9g3u1iKDEDoFSArEi8t7fnbXf3TVuWlFXuZm4YhgEhFovxWCxmd3aeHS4x190aezkqvRofqxQlkRcXG9JQ%2FHmmpjoSWVrJvBt89rRpbnaWBoNl4tDQ4HJZMHT9pzPG43ECcJZO24UvRuIXNcZashyZrZW1QQ5Qa3lBSSWSx1Op5ImpqY98z%2B69pWStF5ycnKTgPO%2FD9MSmx%2F39Vw8fOrKPA%2FMEnPEs1OlPE2b%2FwMC1trb2g%2BR3JXAWF2UC7gWQURRXCgBs2xEAaABX%2F7pNnHNlDUY45%2Fo%2FV%2FU7ujXpRQjhP4oAAAAASUVORK5CYII%3D";
//"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%0F%08%06%00%00%00%3B%D6%95J%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%DB%08%15%14%118%83n%3A%02%00%00%00%1DiTXtComment%00%00%00%00%00Created%20with%20GIMPd.e%07%00%00%03%0BIDAT(%CF%85S%5BHS%01%00%3D%F7%DE%ED%DE6%E7%EE%1E%B5%E5%DA%A2%B4%82%94%5E%13u%3D%A8l%A5EEH%24%E6%03%84%E8'%A2%AF(%0A%FC%F1%23%FA%E8IZ%F4%DB%83%C0(%CC%EC%A1E%8A-%F4%CE%B0%07%D5%B2%DD%B1%E1%A6%3D%CD%CDm%B7%DD%7B%B7%7B%FB%88%A4%E8%A3%F3u~%0E%E7%C09%87%C2o%D8%8C%0C%0C%E2%02%E8a%81%CD!%20%9E%CC%E1%3F%D0%CC0j%DA%19x%8E%D3B%06LC%F3%C4%D9%F7%3F%EC1%90%9Fa%B7%02S%D3%80%94a%01%98%00E%14A~%8A%E1%0BD%E2%97%2B%18(y%1B%CE%9DJ%B7y%3Cp%E9%18%84D%09%B1d%0As%B22%C0%D0%88%E5%19%20%A6R%60%7C%CF%80%01%1F%CE%C4%93%18%A2%CA%B7%82%B1%B0%F0%5C%BF%22%1FYR%04%8B%A2%80%CD%A9%90%D7%7B%F1%D8Y%80U%13%1Fa8%7C%1CW%CE_bn%84%C2%B9%C0%BEfx%B7lF%E9%DD%7B%18%A2f%BB%B0%E0%DAU%9C%C8f%E0h%D8%8F6%3D%03%B6x)%E6%EBg%81%152%98%DC%B3%07%CE%FC%7C%D8%06%FA%5D%2F%C7%C6%E2%D3%92%04%C3%DA%D5(%BC%D3%8D%1E%0D%010%E94%AC%5D%F7%C1%87ys_%EB%09)%B4%BB%26%DDV_%0Fse5%3A%9B%9A%C0%EE%DA%8E%D2%8D%EB%22%A7%CCf%84E%09t%3A%8D%EF%84%02I%03%02%20I%7C%E7%C3%E8%9Dk%9F%9AU%5E%06%266%01%98%CD%B06%D5%A3%A4%FD%22%1E%1D%3A%00a%88C%AA%A7%17%ED%A3%3C%A2%A9%14%C4%E2%A5%88%12%2B%BD(%BE%D4%86%ABz%06F%95D%FC%E3%98N%88D%D8y%D0~%15%82%C1%1Cw%E6%C2%9C%F6%7C%1D%C3%94%14%16%96%24%BE%7D%1E%09%8CO%BC%02%95%04%BEA%D5%00%10i%1A%B1%D88Yt%E7v%91%3A%CFZG%AB%0A%99%E9%E8%ECl%7D%17%0A%BD%DER%B1%CC%E9Y%BD%A6%8E5%B2%D5%0Fz%1E%B6%04%DE%8C%BE%9Ci%17%80%E2%EB%5B!%2B%99Fk%E5%9A%E6%B2%9D%3Bv%15%D2%B46%FDbd%E4%D1%B6M%95%9Bjjv%1F%F5z%BD%9B%EDv%3B%FB%D4%E7%EB%E2%83%FC%AB%99%91%EC%AC%DAw%B0%AA%AA%BA%D1%BD%CA%BD%88eYJUUB%92%E5%D9%7B%EB%EAZ*%CA%2B%16%17%14%CC%D5%11%24A%24%E2%09EG%D3%EA_%0B3%99%2C%06c%BEQG%D34%A9%D5j%A1%AA%0A%B4%1A-E%D3t%9EN%AF%D3P%94%06%04I%00%04%01%96e%B3%7F%8A%A9Rw%E9p%24%12%0A%82%A0%A8l.%E7%B4X%AC%CC%E4%E4d%B4%AF%FF%C9IY%CA%F2%82%20%CC%B7%D9l%86D%3CA%04%3E%BC%BB5%CC%3D%7F3%23%F6%FB%FD%E2%E0%20%17pot%3F%E6%06%B8%2F%B9%ACl%8AF%C7%185G%9Cs%148n%3E%B8%DF%3D*K%12%C5%87%F8%85%89%A9x%17%C7%F9%DF%FEs%8Cc%07%8EMutt%5C%E6%B8%E1%BE%AC%9A%5D%EE)%F3%8C%D7%D6%D6J%00%BAM%26%AB_%10%93%5D.%97%E3%C5%9F%B1%7F%02%DF%CDE%8E%C3%26%9E%A7%00%00%00%00IEND%AEB%60%82";


function getDOC(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
          var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');
            body = doc.createElement('body');
			body.innerHTML =  responseDetails.responseText;
			html.appendChild(body);
          doc.appendChild(html);
          callback(doc);
        }
    });
}


function getElementsByClassName(classname, node) {
    if(!node){node = document.getElementsByTagName("body")[0];}
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++){
		if(re.test(els[i].className)){a.push(els[i]);}
	}
    return a;
}

function addGlobalStyle(css) {
    var head = document.getElementsByTagName("head")[0];
    if (!head){return;}
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    head.insertBefore(style, document.head.firstChild);
	return style
}
var sty
function layouter(){ 
		if(sty){sty.innerHTML="";}
		var newdiv=document.createElement('div');
		newdiv.id="devbar";
		newdiv.height='20px;'
		var linkscss1;
		var linkscss2;
		if(linksanz){linkscss1="left";linkscss2="right";}else{linkscss1="right";linkscss2="left";}
	if(GM_getValue('devein')==""){
		newdiv.innerHTML="<ul><a id='devsidesize'><li class='devbreit'><img src=\""+ devgreatico +"\" /></li></a></ul>";
		sty = addGlobalStyle("body {height:100%;}" +
			"#devbar {position:fixed!important;bottom:0px!important;"+linkscss1+":0px!important;z-index:999999!important;}\n"+
			"#devbar div {line-height:12pt!important;color:"+ textcol +"!important;list-style-image:none!important;}\n"+
			"#devbar ul {list-style-type:none!important;border-top-"+linkscss2+"-radius:25px!important;"+
			"background-image:" + backico + "!important;background-repeat:repeat-x!important;font:bold 14px Helvetica!important;margin:0 0 0 0px!important;"+
			"padding:5px!important;height:10px!important;}\n"+
			"#devbar ul li{padding-right:7px!important;float:left!important;margin:0!important;font:bold 14px Helvetica!important;list-style-image:none!important;}\n"+
			"#devbar ul li:hover ul, #devbar ul a:hover ul{visibility:visible!important;}\n"+
			"#devbar ul ul{visibility:hidden!important;position:absolute!important;height:0px!important;right:0px!important;}\n"+
			"#devbar ul ul li{margin-top:-42px!important; float:none!important;margin-bottom:5px!important;"+
			"background-image:"+ backico +"; border-color:"+ textcol +"!important;border-radius: 25px!important; border-style:solid!important;"+
			"border-width: 1px 2px 2px 1px!important; color:"+ textcol +"!important;}"+
			"#devbar ul ul li:hover{border-color:#C00!important;color:#92b89e!important;}\n"+
			"#devbar a{cursor:pointer;color:"+ textcol +"!important;text-decoration:none!important;}\n"+
			"#devbar a:hover{color:#e1ef46!important;background:none!important;}\n"+
			"#devbar ul li a{padding-top:5px!important;}"+
			"#devbar ul li a img{border-style:none!important;height:15px!important;margin-bottom:-1px!important;margin-top:-2px!important;}\n"+
			".devam {margin-left:5px!important;font-weight:bold!important; color:"+ textcol +"!important;}"+
			"#devnote{color:"+ textcol +" !important;}#devdev{color:"+ textcol +" !important;}#devmes{color:"+ textcol +" !important;}#devfeed{color:"+ textcol +" !important;}#devnach{color:" + textcol + " !important;}");
	}else{
		newdiv.innerHTML=""+
			"<ul><a id='devsidesize'><li class='devbreit'><img style='display:inline;' src=\""+ devsmallico +"\" /></li></a><a href='"+ hauptlink +"'><li class='devbreit'><img style='display:inline;' src=\""+ barhauptico +"\" /></li></a><li class='devbreit'><a href='http://www.deviantart.com/messages/#view=notices'>" +
			"<img style='display:inline;' src=\""+ barhotico +"\"> <span class='devam' id='devnote' >0</span></a>"+
			"<ul><li><a href='http://www.deviantart.com/messages/#view=hottopics'><div id=\"devnote1\">Hot topics</div></a></li>"+
			"<li><a href='http://www.deviantart.com/messages/#view=contests'><div id=\"devnote2\">Contests</div></a></li>"+
			"<li><a href='http://www.deviantart.com/messages/#view=bulletins'><div id=\"devnote3\">Bulletins</div></a></li></ul>"+
			"</li><li class='devbreit'><a href='http://www.deviantart.com/messages/#view=deviations'>" +
			"<img style='display:inline;' src=\""+ bardevico +"\"> <span class='devam' id='devdev'>0</span></a>"+
			"</li><li class='devbreit'><a href='http://www.deviantart.com/messages/#view=deviantwatch'>" +
			"<img style='display:inline;' src=\""+ barmesico +"\"> <span class='devam' id='devmes' >0</span></a>"+
			"<ul><li><a href='http://www.deviantart.com/messages/#view=journals'><div id=\"devmes1\">Journals</div></a></li>"+
			"<li><a href='http://www.deviantart.com/messages/#view=critiques'><div id=\"devmes2\">Critiques</div></a></li>"+
			"<li><a href='http://www.deviantart.com/messages/#view=forums'><div id=\"devmes3\">Forums</div></a></li>"+
			"<li><a href='http://www.deviantart.com/messages/#view=polls'><div id=\"devmes4\">Polls</div></a></li>"+
			"</ul>"+
			"</li><li class='devbreit'><a href='http://www.deviantart.com/messages/#view=feedback'>" +
			"<img style='display:inline;' src=\""+ barcomico +"\"> <span class='devam' id='devfeed'>0</span></a>"+
			"<ul><li><a href='http://www.deviantart.com/messages/#view=comments'><div id=\"devfeed1\">Comments</div></a></li>"+
			"<li><a href='http://www.deviantart.com/messages/#view=replies'><div id=\"devfeed2\">Replies</div></a></li>"+
			"<li><a href='http://www.deviantart.com/messages/#view=activity'><div id=\"devfeed3\">Activities</div></a></li>"+
			"<li><a href='http://www.deviantart.com/messages/#view=activity'><div id=\"devfeed4\">Own Critiques</div></a></li>"+
			"<li><a href='http://www.deviantart.com/messages/#view=correspondence'><div id=\"devfeed5\">Correspondence</div></a></li></ul>"+
			"</li><li class='devbreit'><a href='http://www.deviantart.com/messages/notes/'>" +
			"<img style='display:inline;' src=\""+ barnotico +"\"> <span class='devam' id='devnach'>0</span></a>"+
			"<ul><li><a href='http://www.deviantart.com/messages/notes/#1_0'><div id='devnach1'>Inbox</div></a></li>"+
			"<li><a href='http://www.deviantart.com/messages/notes/#2_0'><div id='devnach2'>Send Notes</div></a></li>"+
			"<li><a href='http://www.deviantart.com/messages/notes/#new-note'><div id='devnach3'>Create new Note</div></a></li>"+
			"</ul></li></ul>";
		sty = addGlobalStyle("body {height:100%;}" +
			"#devbar {margin:0 0 0 0px!important;position:fixed!important;bottom:0px!important;"+linkscss1+":0px!important;z-index:999999!important;}\n"+
			"#devbar div {line-height:12pt!important;color:"+ textcol +"!important;list-style-image:none!important;}\n"+
			"#devbar ul {text-align:center!important;list-style-type:none!important;border-top-"+linkscss2+"-radius:25px!important;"+
			"background-image:" + backico + "!important;background-repeat:repeat-x!important;font:bold 14px Helvetica!important;margin:0 0 0 0px!important;"+
			"width:500px!important;padding:5px!important;height:10px!important;}\n"+
			"#devbar ul li{padding-left:7px!important;float:left!important;margin:0!important;font:bold 14px Helvetica!important;list-style-image:none!important;}\n"+
			"#devbar ul li:hover ul, #devbar ul a:hover ul{visibility:visible!important;}\n"+
			"#devbar ul ul{visibility:hidden!important;position:absolute!important;height:0px!important;right:0px!important;}\n"+
			"#devbar ul ul li{margin-top:-42px!important; float:none!important;margin-bottom:5px!important;"+
			"background-image:"+ backico +"; border-color:"+ textcol +"!important;border-radius: 25px!important; border-style:solid!important;"+
			"border-width: 1px 2px 2px 1px!important; color:"+ textcol +"!important;}"+
			"#devbar ul ul li:hover{border-color:#C00!important;color:#92b89e!important;}\n"+
			"#devbar a{cursor:pointer;color:"+ textcol +"!important;text-decoration:none!important;}\n"+
			"#devbar a:hover{color:#e1ef46!important;background:none!important;}\n"+
			"#devbar ul li a{padding-top:5px!important;}"+
			"#devbar ul li a img{border-style:none!important;height:15px!important;margin-bottom:-1px!important;margin-top:-2px!important;}\n"+
			".devam {margin-left:5px!important;font-weight:bold!important; color:"+ textcol +"!important;}"+
			"#devnote{color:"+ textcol +" !important;}#devdev{color:"+ textcol +" !important;}#devmes{color:"+ textcol +" !important;}#devfeed{color:"+ textcol +" !important;}#devnach{color:" + textcol + " !important;}");
	}
	if(document.getElementById("devbar")){document.getElementById("devbar").innerHTML=newdiv.innerHTML;}else{document.body.insertBefore(newdiv, document.body.firstChild);}
	verschw();
	verschw();
	setTimeout(su, 100);
	document.getElementById('devsidesize').addEventListener('click', sidum,false);
	if(neu){document.getElementById('devbar').getElementsByTagName("ul")[0].style.cssText="background-image:" + varbackico + "!important;";}
	einsetz();
	su();
}

function sidum(){
	if(GM_getValue('devein')==""){GM_setValue('devein',"1");}else{GM_setValue('devein',"");}
	layouter();
}
function pInt(zahl){
	var a = parseInt(zahl);
	if(a*0!=0){a=0;}
	return a;
}

function verschw(){

	if(pInt(GM_getValue('devvisib'))!=0){
		document.getElementById('devbar').style.height="20px";
		GM_setValue('devvisib',0);

	}else{
		document.getElementById('devbar').style.height="0px";
		GM_setValue('devvisib',1);
	}
}
function su(){
	if(GM_getValue('devein')==""){return;}
	if(alt==""){setTimeout(su,500);return;}

	var newwidth = 10;
	var a =alt;
	// var a =getElementsByClassName('devbreit',document);
	for (var i =0;i< a.length;i++){
	// newwidth += a[i].offsetWidth;
	newwidth += ((pInt(a[i])>9)?Math.floor(Math.log(pInt(a[i]))/Math.log(10)):1)*4;
	}
	newwidth+=15*(a.length-1);
	// GM_log(newwidth);
	var labst = (window.innerWidth -newwidth)/ 2-20;
	sty.innerHTML=sty.innerHTML.replace(/center!important;width:\d+px!important;margin:0 0 0 .+?px!important;/,"center!important;width:" + newwidth+ "px!important;margin:0 0 0 "+ labst + "px!important;");
	sty.innerHTML=sty.innerHTML.replace(/Helvetica!important;margin:0 0 0 0px!important;width:\d+/,"Helvetica!important;margin:0 0 0 0px!important;width:" + newwidth);
}

function aktualisieren(){
	//parsing DIFI
	var inboxId=GM_getValue('devuser');
	queryStr = "?"+
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:fb_comments:0:0:f\"]&"+				// 3.1 main comments
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:fb_replies:0:0:f\"]&"+					// 3.2 main replies
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:notes_unread:0:0:f\"]&"+				// 4 unread notes
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:notices:0:0:f\"]&"+					// 0.1 hot topics
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:contests:0:0:f\"]&"+					// 0.2 contest announcements
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:fb_activity:0:0:f\"]&"+				// 3.3 main activity
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:fb_critiques:0:0:f\"]&"+				// 5->3.5 critiques on your own art
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:correspondence:0:0:f\"]&"+				// 5->3.4 correspondences - people asking for your art in groups/muro "send file"
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:devwatch:0:0:f:tg=deviations\"]&"+		// 1 devWATCH - deviations
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:devwatch:0:0:f:tg=forums\"]&"+			// 2.3 devWATCH - forums responses (no news anymore!)
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:devwatch:0:0:f:tg=journals\"]&"+		// 2.1 devWATCH - journals
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:devwatch:0:0:f:tg=polls\"]&"+			// 2.4 devWATCH - polls
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:devwatch:0:0:f:tg=critiques\"]&"+		// 2.2 devWATCH - watched critiques from people
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:bulletins:0:0:f\"]&"+					// 0.3 bulletins from groups
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:zendesk:0:0:f\"]";					// zendesk replies;	
	var b=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	GM_xmlhttpRequest({
        method: 'GET',
        url: 
		"http://www.deviantart.com/global/difi.php" + queryStr + "&t=json",
        onload: function (responseDetails) {
			if(responseDetails.responseText.search('"status":"FAIL"')!=-1){
				usersearch();
				einsetz(b);
				GM_log("fail");
				GM_setValue('devtext',b.join('+'));
			}else{
				b = responseDetails.responseText.match(/"matches":"\d+"/ig);
				var contr=0;
				for(var i=0;i<b.length;i++){
					b[i]=b[i].substring(11,b[i].length-1);
					contr+=parseInt(b[i]);
				}
				if(contr==0)GM_log(responseDetails.responseText);
				einsetz(b);
				GM_setValue('devtext',b.join('+'));
			}
		}
    });
}

function einsetz(a){
	alt=GM_getValue('devtext').split('+');
	// GM_log(GM_getValue('devtext'));
	if(!a){a=alt;}else alt=a;
	GM_setValue('devtext',a.join('+'));
	// GM_log(GM_getValue('devtext'));
	if (a.length<13){a=alt;}	
	if(GM_getValue('devein')=="1"){
		document.getElementById('devnote').innerHTML=(parseInt(a[3])+parseInt(a[4])+parseInt(a[13]));
		document.getElementById('devdev').innerHTML=a[8];
		document.getElementById('devmes').innerHTML=(parseInt(a[9])+parseInt(a[10])+parseInt(a[11])+parseInt(a[12]));
		document.getElementById('devfeed').innerHTML=(parseInt(a[0])+parseInt(a[1])+parseInt(a[5])+parseInt(a[6])+parseInt(a[7]));
		document.getElementById('devnach').innerHTML=a[2];
		
		document.getElementById('devnote1').innerHTML='<span style="position:absolute;right:15px;">' + a[3] + "</span>Hot topics";
		document.getElementById('devnote2').innerHTML='<span style="position:absolute;right:15px;">' + a[4] + "</span>Contests";
		document.getElementById('devnote3').innerHTML='<span style="position:absolute;right:15px;">' + a[13] + "</span>Bulletins";

		document.getElementById('devmes1').innerHTML='<span style="position:absolute;right:15px;">' + a[10] + "</span>Journals";
		document.getElementById('devmes2').innerHTML='<span style="position:absolute;right:15px;">' + a[12] + "</span>Critiques";
		document.getElementById('devmes3').innerHTML='<span style="position:absolute;right:15px;">' + a[9] + "</span>Forums";
		document.getElementById('devmes4').innerHTML='<span style="position:absolute;right:15px;">' + a[11] + "</span>Polls";

		document.getElementById('devfeed1').innerHTML='<span style="position:absolute;right:15px;">' + a[0] + "</span>Comments";
		document.getElementById('devfeed2').innerHTML='<span style="position:absolute;right:15px;">' + a[1] + "</span>Replies";
		document.getElementById('devfeed3').innerHTML='<span style="position:absolute;right:15px;">' + a[5] + "</span>Activities";
		document.getElementById('devfeed4').innerHTML='<span style="position:absolute;right:15px;">' + a[6] + "</span>Own Critiques";
		document.getElementById('devfeed5').innerHTML='<span style="position:absolute;right:15px;">' + a[7] + "</span>Correspondence";
		
		su();
		//Farbe
		if (alt == a){return;}//SPEED^^
		if((parseInt(a[3])+parseInt(a[4])+parseInt(a[13]))!=(parseInt(alt[3])+parseInt(alt[4])+parseInt(alt[13]))){document.getElementById('devnote').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[8]!=alt[8]){document.getElementById('devdev').style.cssText='color:'+ akthighcol + '!important;';}
		if((parseInt(a[9])+parseInt(a[10])+parseInt(a[11])+parseInt(a[12]))!=(parseInt(alt[9])+parseInt(alt[10])+parseInt(alt[11])+parseInt(alt[12]))){document.getElementById('devmes').style.cssText='color:'+ akthighcol + '!important;';}
		if((parseInt(a[0])+parseInt(a[1])+parseInt(a[5])+parseInt(a[6])+parseInt(a[7]))!=(parseInt(alt[0])+parseInt(alt[1])+parseInt(alt[5])+parseInt(alt[6])+parseInt(alt[7]))){document.getElementById('devfeed').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[2]!=alt[2]){document.getElementById('devnach').style.cssText='color:'+ akthighcol + '!important;';}
		
		if(a[3]!=alt[3]){document.getElementById('devnote1').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[4]!=alt[4]){document.getElementById('devnote2').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[13]!=alt[13]){document.getElementById('devnote3').style.cssText='color:'+ akthighcol + '!important;';}
		
		if(a[2]!=alt[2]){document.getElementById('devdev').style.cssText='color:'+ akthighcol + '!important;';}
		
		if(a[10]!=alt[10]){document.getElementById('devmes1').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[12]!=alt[12]){document.getElementById('devmes2').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[9]!=alt[9]){document.getElementById('devmes3').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[11]!=alt[11]){document.getElementById('devmes4').style.cssText='color:'+ akthighcol + '!important;';}
		
		if(a[0]!=alt[0]){document.getElementById('devfeed1').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[1]!=alt[1]){document.getElementById('devfeed2').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[5]!=alt[5]){document.getElementById('devfeed3').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[6]!=alt[6]){document.getElementById('devfeed4').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[7]!=alt[7]){document.getElementById('devfeed5').style.cssText='color:'+ akthighcol + '!important;';}
	}
	var i=0;
	while (i<a.length){
		if(a[i]!=alt[i]){document.getElementById('devbar').getElementsByTagName("ul")[0].style.cssText="background-image:" + varbackico + "!important;";neu=true;return}
		if(a[i]!=alt[i]){document.getElementById('devbar').getElementsByTagName("ul")[0].style.cssText="background-image:" + varbackico + "!important;";neu=true;return}
		i++;
	}
}

function timer(){	
	if(ins){setTimeout(aktualisieren,0);}else{ins=true;einsetz();}
	GM_setValue('devakt',new Date().getTime()+'');	
}

function keyHandler(e){
	if (e.which ==78 &&e.altKey){verschw();return false;}else{return true;}
}

function optionwindow(){
	var opt = document.createElement('div');
	var colytostr;
	var leftstr="";
	if(linksanz)leftstr='checked="checked"';
	if(akthigh=='true'){colytostr='checked="checked"';}else{colytostr='';}
	opt.id="devopts";
	opt.setAttribute('style',"font:10pt Verdana,Arial,Helvetica,sans-serif!important;background-color:#FFF;left:"+ ((window.innerWidth - 300)/2 - 20) +"px;top:"+ ((window.innerHeight - 350)/2 - 20) +"px;width:300px;height:350px;padding:10px;border:1px double black;position:absolute;");
	opt.innerHTML="<h2 align='center'>Options</h2>"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Time untill reload</div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input type='text' value='"+ wartezeit +"' id='devoptwait' style='width:50px;background-color:#FFFFFF;' /> (min. 5s)<br>10000 -> 10s</div>"+
	"<br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Highlight Changes</div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input type='checkbox' "+ colytostr +"' id='devoptcoly'/></div>"+
	"<br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Highlight Color</div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input type='text' value='"+ akthighcol +"' id='devoptcolc' style='width:70px;background-color:#FFFFFF;' /> <br />(like #123FED)</div>"+
	"<br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Text Color</div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input type='text' value='"+ textcol +"' id='devopttexc' style='width:70px;background-color:#FFFFFF;' /><br />(like #123FED)</div>"+
	"<br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Main-Icon-Link</div>"+
	"<div style='width:280px;padding-bottom:10px;padding-right:10px;float:right;'><input type='text' value='"+ hauptlink +"' id='devoptmain' style='width:280px;background-color:#FFFFFF;' /></div>"+
	"<br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Display on the left?</div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input type='checkbox' "+ leftstr +"' id='devoptleft'/></div>"+
	"<br style='clear:both;' /><br />"+
	"<input type='button' value='Save' id='devoptsav' style='margin-left:30px;' />"+
	"<input type='button' value='Default' id='devoptdef' style='margin-left:30px;' />"+
	"<input type='button' value='Cancel' id='devoptcan' style='margin-left:30px;' />";
	document.body.appendChild(opt);	
	document.getElementById('devoptsav').addEventListener('click', optsav, false);
	 document.getElementById('devoptdef').addEventListener('click', optdef, false);
	 document.getElementById('devoptcan').addEventListener('click', optcan, false);
}

function optdef(){
	document.getElementById('devoptwait').value='10000';
	document.getElementById('devoptcoly').checked=true;
	document.getElementById('devoptleft').checked=false;
	document.getElementById('devoptcolc').value="#ff7878";
	document.getElementById('devopttexc').value="#BBD99C";
	document.getElementById('devoptmain').value="http://www.deviantart.com";
}

function optcan(){
	document.body.removeChild(document.getElementById("devopts"));
}

function optsav(){
	var a=[];		
	var wait = document.getElementById('devoptwait');
	var coly = document.getElementById('devoptcoly');
	var colc = document.getElementById('devoptcolc');
	var texc = document.getElementById('devopttexc');
	var maino = document.getElementById('devoptmain');
	var optleft = document.getElementById('devoptleft');
	
	wait.style.backgroundColor = "#FFFFFF";
	colc.style.backgroundColor = "#FFFFFF";
	texc.style.backgroundColor = "#FFFFFF";
	maino.style.backgroundColor = "#FFFFFF";
	
	if (wait.value < 5000){wait.style.backgroundColor = "#FF0000";return;}else{a.push(wait.value);}
	a.push(coly.checked);
	var csspatt = /#(([0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f])|([0-9a-f][0-9a-f][0-9a-f]))/i;
	if (!colc.value.match(csspatt)){colc.style.backgroundColor = "#FF0000";return;}else{a.push(colc.value.match(csspatt)[0]);}
	if (!texc.value.match(csspatt)){texc.style.backgroundColor = "#FF0000";return;}else{a.push(texc.value.match(csspatt)[0]);}
	var httppat=/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;
	if (!maino.value.match(httppat)){maino.style.backgroundColor = "#FF0000";return;}else{a.push(maino.value.match(httppat)[0]);}
	if(optleft.checked)a.push(0);else a.push(1);

	GM_setValue('devconf',a.join(String.fromCharCode(21)));
	optload();
	document.body.removeChild(document.getElementById("devopts"));
	document.body.removeChild(document.getElementById("devbar"));
	layouter();
	// timer();
}

function optload(){
	if (GM_getValue('devconf')){
	var opts = GM_getValue('devconf').split(String.fromCharCode(21));
	wartezeit=opts[0];
	akthigh=opts[1];
	akthighcol=opts[2];	
	textcol=opts[3];
	hauptlink=opts[4];
	linksanz=(opts[5]=='0');
	}
}

function usersearch(){
GM_xmlhttpRequest({
        method: 'GET',
        url: "http://www.deviantart.com/messages/#",
        onload: function (responseDetails) {
			userid = /{"(\d+),oq:/.exec(responseDetails.responseText);
			if(userid!=null){userid=userid[1];}else{return true;}
			GM_setValue('devuser',userid);
			if((pInt(GM_getValue('devakt')) + wartezeit)>pInt(new Date().getTime())){
				einsetz();
				ins=false;
				// timer();
			}else{
			// timer();
			}
		}
    });
}

//######START!

if(window.self == window.top ){
setTimeout(function(){
if(GM_getValue('devvers')!="2.3"){
	GM_setValue('devuser','')
	GM_setValue('devvisib','');
	GM_setValue('devakt','');
	GM_setValue('devtext','');
	GM_setValue('devein','');
	GM_setValue('devconf','');
	GM_setValue('devleft','1');
	GM_setValue('devvers',"2.3");
}},0);

setTimeout(optload,0);

window.addEventListener('keydown', keyHandler, false);
window.addEventListener('resize', su, false);
layouter();
GM_registerMenuCommand("Disable/Enable Devbar", verschw,"N","","D");
GM_registerMenuCommand("Configurate Devbar", optionwindow);

setInterval(timer, wartezeit);
if (GM_getValue('devuser')==''){
	usersearch();
}else{
if((pInt(GM_getValue('devakt')) + wartezeit)>pInt(new Date().getTime())){
	einsetz();
	ins=false;
	// timer();
}else{
// timer();
}
}}
})();