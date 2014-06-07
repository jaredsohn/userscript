// ==UserScript==
// @name				TravianDS
// @namespace			TravianDS
// @description			TravianDS
// @include				http://*.travian.*/*
// @exclude				http://*.travian.*/manual.php*
// @exclude				http://help.travian.*/*
// @exclude				http://forum.travian.*/*
// @version				0.0.1-3
// ==/UserScript==


var TravianDS = {
	version : "0.0.1-3"
}

function log(o) { alert(typeof o + ': ' + o); }

function $id(str) { return document.getElementById(str); }
function $class(str,m) { if (typeof m == 'undefined') { var m = document; } return m.getElementsByClassName(str); }
function $tag(str,m) { if (typeof m == 'undefined') { var m = document; } return m.getElementsByTagName(str); }
function $xpath(xpath) {
	var xp = document.evaluate(xpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var r = new Array();
	for (var i = 0; i < xp.snapshotLength; i++) {
		r[i] = xp.snapshotItem(i);
	}
	return r;
}

var Xpaths = {
	vlist  : '//html/body/div/div[3]/div[3]/table/tbody/tr[*]/td[2]/div/a',
	maxR   : '//td[@id="l4"]',
	maxC   : '//td[@id="l1"]',
	lumber : '//td[@id="l4"]',
	clay   : '//td[@id="l3"]',
	iron   : '//td[@id="l2"]',
	crop   : '//td[@id="l1"]',
	
	currentVillage : '//td[@class="dot hl"]/../td[2]/div/a',
	
	profileID : '//div[@id="side_navi"]/p[1]/a[3]'
}

var DataImages = {
	dockBackground : "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%01%00%00%00%14%08%06%00%00%00L%0EW%A1%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00)IDAT%08%D7cHMM%FD%CFp%FA%F4%E9%FFL%0C%0C%0C%0C%E4%12%BF~%FDb%60z%F9%F2%25%03%D3%EB%D7%AF%D1e%01%D5%17%0E%1DC3%E7P%00%00%00%00IEND%AEB%60%82",
	//configure      : "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%10%06%00%00%00Oc%23%22%00%00%00%09pHYs%00%007%5C%00%007%5C%01%CB%C7%A4%B9%00%00%00%09vpAg%00%00%00%10%00%00%00%10%00%5C%C6%AD%C3%00%00%00%06bKGD%FF%FF%FF%FF%FF%FF%09X%F7%DC%00%00%04eIDATx%DA%8D%CFyP%D4u%1C%C6%F1g%F7%A7%B0%E1EZ%93M%CC(%969fv%98%A3dZ%0E%96%93%84i%08%98%14%AC%B5n%B0%1C%0A%2C%C7%98%A2%89r%C4%B5%C8%B1%182%B9l%2C%9A%0A%C8%86N%A9x%24%88%A9%A5%90%93%17%E7%10S%99Z3%3A2%AB%E8'%9E%D9%A5%A6%1C'%DE%AF%3F%9E%F9%FD%F3%FD~%7F%18l%FAJ%02R%2F%13%94%D63m%C6v%03%90_%B7y%C2%E6%3B*%7Duvu%E1%1E%2F%60Y%EB%B2%CB!%93%17%A7%7D%E2%BF%C1%9A%BA%E5l%7D%5E%8A%C9%C7d%12)%B1%97%AC%2CY%F8%E1%81%A23EaE%13%01%B3%D9%1Co%5E%3E4%08%83-ZK%40%9C%9E%80%C4%B4%C4%F8%C4%60uD%8C9fQt%3B%A0%EF%D2%EF%D7'j7Z%22-u%E53D%AA.%D4d%D7%1AEv%ED%D8%3Dk%F7%7B%1F%F7%26%DCN%FA%25%F9-%C0%14%9E%3F%3F%BFLY%96%9B%9C%F3n%F6Uxb%B0%E9%BA%09%98%3D%9E%D0%84%7F5%22%CCVn%B3%DA*%DA%7Fn%CBnKoK%111O%2F%EE-%3EQr%D4%D4%DC%7Fa%22%90%F3Z%CE%91%9C%BBC%7B%E0%AAto%E9%9A%D20%5D%CE%FF%FF%F9%12%02%12%3A%08%08%9FIj%F7%05%DF%10%F0%CE%E1~G%A6O%3A%D9B%F7%D6%3Bb%1C%2B%1D%B1%22%96.%CB%EF%96%1B5%5BE%18%90%1E%9Cy%3Dk%0AP%7D%AB%26%BD%A6bM%D2%E6%DC%82%F9%05%DBD%F0%A0b%83%080%5C%26%A8%93%84%80%A4%40RU%BE%ECC%80%EE%92%EE%A2%EE%A2%B7%DB%A1%0E%EA-%B8VE%22Wb%AF%AC%BA%B2J%C4Zb%B5Zw%D6%B4%9A7%98%E7%98%3D%B6%98%AB%8B%F7%BCi%7FN%24%F5%F9%8Dk7%C5%9FZ%80%FF%96%90A%80a%2BA%1D%18C%18%C8%BB%A1%8B%94%B4%86%AB%04T%1C%A5%E4%25%0D%AF%92H%E7%2C%BA%AB%B9%96%DF%CF%24%8F9%AC%8E%2F%1C6)l%EDjmk%FDQ%A4lt%99%AE%EC%BAH%88o%88_%C8%E7A%A31P%AA%0F%01%C6)%04Up%3Da%A01%8D%0BH%A9%3C%EDK%C0%EE%3CJ8%5C%7B%94D%BA'%D1%DD%F6%13%0FS%9F%B2%F7O%EA%D5%9D%8A%ECg%10%B1e%D9%B2m%B9%BF%CE%D1%9E%D3n%D7%BE%BF%7CB%9AWZOF%00%80%F4%F5%04%C4%97%12T%0B%BD%08%03i%BE-%26e_%D3%DB%04TwR%EC!%BB%86D%3A%03%E8va%E3%26%12%89x%89V%2F%0E%5DGc%B7%07%5D%A0%99%B9%23%8F%D0%A8%E3%9E%3Fx%9E%F7%BC%04%04%DC%0Eh%0F8%A7%3A%08C%1BA%E5%93%40%80%08%03%F6%2F%25%E5%D8%E1%60%02%ECy%14%DDh%F7'%91%8E%7Bt%C7%FD%F8o%24%12n%A1%A4Oks%098QJ%AA%8C%81%F3%EA%FD%EA%03%EBW%60%B5%B1%CC%98i4%A8W%C1%99'%DC%CF%D2%3F%17%EFi!%A5%B9%DE%8D%80%BA%24%8A%B8V%3B%99D%DA%BF%A7%3B%A9M%FE%24%12%F1%22%C5%FB%7C%19J%C0go%90%92%17%FD%15%A9%0A%A2%23H%3D%D5%F7kBKh%0A%01%2B%1C%84!%7F_l%0D%25%E5%9E%BD%87%80%AA%0E%D2%7B%EEz%96D.%5E%A5%3E%CDwO%90H%D4%0C%8A%F9c%C7%0D%02%CC%3F%91R%0Bg%CF%8Ck%26%60%DA%5C%82%FA%15%7F%C2%FD%E5%E4%91%12W%11F%C0%B6%ED%F4A%A0%A5%98DZB%A8%AF%E8x8%89%24%CC!%C3%C9%CA%B1%04%98O%93r%10%CE%BC%1E%5DD%C0%D4%06%82z%F6p%C2%83%1B8(7%8E%22G%14f%93HS%1D%F55%1E%F2%23%918%23%7D4l%EB%EB%04dT%D3%90'%E1%CC%0F%99%A0y8%03%F2%85%B3%17%5C%EB%ED%DAG%5C%ABq%AD%1A%FA%0E%9AW%BF%F6%18%D9%BC%F7e%D1%CD%B9%F6%5E%12%89%3C%40ZSf%0F%01U%9D%A4%0E%E8%1CC%80%08%BBo%07%DF%F2%9D%94%AC%89%CA%22%20EK%95%A7%C3%CA)nT%CDB%02%9En%A2%91Q%00%F3(%C2S%E41%11%0A%3D4%0F%60%EE%7D%CEuKs%EE%90%5B%CEUb%9C%AB%1E%06g%DD%AE%9D%8A%A8Yd%EA%F6%5BG%EBNN%B9IK%7D%016%AE%D9m%03%F94%01lf9%3Ch%86%07%C0%A6%85%BA%CEY%E2%DCI%AE%EF%F1%E7%9D%FB%B8%EBAc4%CE%1D%EE%EF%DC%A1%AE%87%A9%96%FE%05%CE%1A%011%96%9D%3E%C8%00%00%00%22zTXtSoftware%00%00x%DA%2B%2F%2F%D7%CB%CC%CB.NN%2CH%D5%CB%2FJ%07%006%D8%06X%10S%CA%5C%00%00%00%00IEND%AEB%60%82"
	configure : "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%03%8BIDATx%DA%5C%D2%DFO%D5u%1C%C7%F1%E7%E7%7B%BE%9Cs%04%0C%E47%C2%81%83%B2%A1%E2%B4%E6%AC%8E%15%06%07tC%40V%B1%8C.jK%A2QSS%195%A2%1B%B6%1A%06E-%2Fr%F3%A2%D648a%E1%8F%02%2F%00%97%C1%E9%8C%B0%BAP%14Q%01%0F%1C%D08%81%9C%C3%E1%D7%F7%DD%05%EB%A6%E7%3F%F0%DAc%7B%A9smm%9D%BA%C9%E4%2C)-%B5%02%CB%00JS%7C%FEi3%82%81%18%C2%91%A3G%CD5%D5%D5%AE%C2%7DE%25%A1%85%10%81%60%E0%A3%7B%C3wj%DF%3Dv%0C%95n%B3%7D%7C%7D%F0%C6%7Bm%AD%AD%BE%A7%9E%DC%99%1C%9C%9F%C70%0C%AE%FE%EAF%001%0C%CCVKoUU%95%C3%EB%F5%F2N%D5%DB%E7%9Fx%7C%5B%D9%5C0%98%F8Ic%D3%03-6*%FA%FDM%99%995%D3%D3%FE%24D%CE%A2%40C%F1%ACc%07yN'gZ%BE%CB-%2F%2Fw%84B!%5C.%17%B9%B9%CE%EC%EC%EC%ED%0B%1B6f%B6%95%95%95%BD%A1i%9A%90%14%1Bs%E2T%E3%89%14Wk%EB%01%0D%BE%04A%04%0E%D55%11%1F%17%97%0E0%3B%3B%8B%C3%B1%8B%F5ii%1B%C7''%A9%A8%A8%D8933%B3%A8%9B%C4%400P%CA%18o9%7D%CA*b%84%8A%8BK%FC%9A%A2Ni%8A%C1%9B%B7%86%A6%A7%A7%E9%EB%EB%C3%E9t%92%9A%9ABD%C4n%06%06%06B%1E%8F%E77m%EA%9F9%7C%FEYD4t%3Dl%01P%E7%DB%7F%F8%20%2B%10%3A%DC)~*%B7%E5_%B5%A7%A7%03%D0%D5%D5%85%C5b%C1%EB%F5R__%FF%95%DF%EF%FFK%17%0C%94%08%0A%00%83%D5%94%0A%F4_%93E1%9A%B3%3C%ED%18%8B%9F%D1%E6%EA%B90%E6%BD%7F%AF%A3%A3%23%D9%EDv_%1E%1A%1A%FA%06%40%0F%BDx%09%7B%92%99%F9%A5%05t%5D%F1%93%06%23%01%9D%97N%16%92%DA%DC%C8%A2%C7%C3i%5B%9A%BB%DBV%1Bt%24%7B%0F%F1%BFT%E2%E1kd%24Z%08.-%60%B5j%98%80%3F%AF%9B%A4%AC%F5i%8E'%AF%C3%FE%C5I%BA%0F%BE%C52%B4%C7%F9%C6K%C3S%D6b%8D_%C3%D6%3F%A6%10%11t%05%88%80Z50%3E*%B2%3E%3D%86%AF%1D%DDD%15%84%87%F6%1D%CC%B7%E6460%F7%FD%B9%FD%17%7B%7B%25)%CCd%CAd%C5%18%CE%B5%01%A0%AD%AC%C8%EAa%04%26FD%C2b%E3%19v%FB%D8%B27%83%B3%DF%BA%06%1E%0A%C7%7B%AAk%88oj%A487%8F%DB%81%E5%95%FBZ%F8%8E%FF%08%9AR%AB%EB%93%23%22%E1%89I%0C%F7N%B2%E9y%1Bw.%5Cn%B1g%98%9F%B1MN4%CD%88%F1%E1%CF%CF%E5%10%D7%D0%C0%AB%25%A5%0C%8E%05%FA%BDXl%00%9A!01j%CC%AD%DB%90%C2%CD%EE16%E7%DB%B8%DB%D1%DD%13eW%07VU%0A%BBo%B2~%CE0%F8%7DO%011u%B5%BC%5C%BC%9F%91%1Bs%A3%00%FA%A3%11%AE%24%ECJ%8C%18%EC%1Ae%CB%1E%3B%B7%3B%FB%FA%A3%ED*%D7%7F%E6%15%1Eh%B0%DB%AC%10%CD%CA%15%9FO%8D(%25%E1%85%85l%BEx%89%BC%60%80%5By9%3F%A2'%14%BC%9EPqW%B67%3D%14%F3%D6%BA%BF%D7%02%11%260%EB%A0%99%01%B3%02%AB%15%AC%91%10%16%C5%91%A8%A8%99%B1%A2%22%99%A8%AC%94%D7%22%23%E3UD%D6%5E%96%86%BA%DF%C4%1CmS%A1%A96%E01%DD%C4%9A%25%C5%D2%B2%C6%B2%81%02%CDb%02%DD%CC%8A%E9Q%D8%F2%ECD%8CR%2FL%8B%FC%B2h%18%9E%7F%07%00%E0%F5%8B%A9woep%00%00%00%00IEND%AEB%60%82"
}

function floatToDate(num) {
	num = Math.abs(num);
	var hours = parseInt(num);
	var fract = num - hours;
	var milisecs = parseInt(1000 * 60 * 60 * fract)
	var secs = parseInt(milisecs / 1000);
	var mins = parseInt(secs / 60)
	secs -= (mins * 60)
	if (mins < 10) mins = "0" + mins;
	if (secs < 10) secs = "0" + secs;
	return hours + ':' + mins + ':' + secs;
}


/** CONFIG **/
var Config = {
	name : (function() { return $tag('title')[0].textContent.split(' ')[1] +'_'+ $xpath(Xpaths.profileID)[0].href.split('=')[1]; })(),
	showStorageTime : 1,
	showShortKilo   : 1,
	
	
	
	
	
	
	displayForm : function() {
		$id('ce').innerHTML = '<div class="popup3">'+'<a href="#" onclick="Close(); return false;"><img src="img/x.gif" border="1" class="popup4" alt="Move"></a>'+'<div id="_configFormDiv">Hello fuckers</div>'+'</div>';
		$id('_configFormDiv').innerHTML = 
					'<form action="" id="_configForm" method="" onsubmit="return false">'+
						'<input type="checkbox" name="showStorageTime" /> Show storage time'+
					'</form>';
		unsafeWindow.vc();
		$id('_configForm').addEventListener('change',function() { Config.change() },false);
		return false;
	},
	
	change : function() {
		var form = $id('_configForm');
		alert(form['showStorageTime']);
		for (x in form) {
			log(form[x]);
		}
	
	},
	save : function() {
		var save = '';
		for (x in this) {
			var type = typeof this[x];
			if (type == 'string' || type == 'number' && type != 'undefined') {
				save += x +':'+ this[x] +'\n';
			}
		}
		GM_setValue(this.name,save);
	},
	load : function() {
		var save = GM_getValue(this.name);
		if (typeof save == 'undefined') return;
		save = save.split('\n');
		for(var i = 0; i < save.length; i++) {
			var k = save[i].split(':')[0];
			var v = save[i].split(':')[1];
			this[k] = v;
		}
	}
}

Config.load();








var dock = document.createElement('div');
dock.setAttribute('id','_dock');
dock.setAttribute('style','overflow:-moz-scrollbars-vertical;position:fixed;bottom:0px;height:100px;background:#fcfcfc;width:100%;font-size:9px;z-index:1000');
dock.addEventListener('DOMMouseScroll', scrollDock, false);

var dockHead = document.createElement('div');
dockHead.setAttribute('id','_dockHead');
dockHead.setAttribute('style','height:20px;width:100%;background: url("'+DataImages.dockBackground+'") repeat-x;text-align:right;padding:1px 15px 0 0;position:fixed;bottom:99px;z-index:1002;font-size:10px;font-weight:bold');
dockHead.innerHTML = '';

$tag('body')[0].appendChild(dockHead);
$tag('body')[0].appendChild(dock);

(function() {
	var config = document.createElement('a');
	config.setAttribute('href','#');
	config.addEventListener('click',function() { return Config.displayForm() },false);
	config.innerHTML = '<img src="'+DataImages.configure+'" alt="Configure" title="Configure" />';
	
	//dockHead.appendChild(config);
})()


$class('copyright')[0].style.height = '120px';








var style = document.createElement('style');
style.textContent = '#_dock td {font-size:9px;padding:0px 4px;background:transparent;text-align:right}#_dock table {border-collapse:collapse;background:transparent;border:0}';
$tag('head')[0].appendChild(style);



/** ONE WHEEL TURN SCROLLING **/
function scrollDock(e,el) {
	var dock = $id('_dock');
	//alert(dock.scrollTop);

	return;
	var delta = e.detail;
	if (delta > 0) {
	}
	else if (delta < 0) {
	}
//	e.preventDefault();
}//*/




var currentURL = window.location.toString().split('/')[3].split('?')[0];


var now = Date.parse(new Date())/1000;
function clock() {
	now++;
}
window.setInterval(clock,1000);

function Village(id) {
	var self = this; // used for updating
	this.id = id;
	this.name = '???';
	this.displayName = '';
	this.updated = 0;

	this.lumber = 0;
	this.clay = 0;
	this.iron = 0;
	this.crop = 0;

	this.lumberPH = 0;
	this.clayPH = 0;
	this.ironPH = 0;
	this.cropPH = 0;

	this.lumberPS = 0;
	this.clayPS = 0;
	this.ironPS = 0;
	this.cropPS = 0;

	this.maxR = 0;
	this.maxC = 0;

	this.originalResources = new Array('0','0','0','0');
	
	
	/** Buldings **/
	this.market = 0;
	this.bookmark = 0;
	
	this.barracks = 0;
	this.stable = 0;
	this.workshop = 0;

	this.setDisplayName = function() {
		this.displayName = prompt('New DN?');
	}
	this.getProduction = function() {
		var p = $id('production');

		this.lumberPH = parseInt($class('num',p)[0].textContent);
		this.clayPH   = parseInt($class('num',p)[1].textContent);
		this.ironPH   = parseInt($class('num',p)[2].textContent);
		this.cropPH   = parseInt($class('num',p)[3].textContent);

		this.lumberPS = Math.round(this.lumberPH / 0.036) / 100000;  // PH / 3600 = PS
		this.clayPS   = Math.round(this.clayPH   / 0.036) / 100000;  // *100k => round => /100k
		this.ironPS   = Math.round(this.ironPH   / 0.036) / 100000;  // = PS with 5 decimal
		this.cropPS   = Math.round(this.cropPH   / 0.036) / 100000;  // there are 5 zeros in 100k
	}

	this.getMaxs = function() {
		this.maxR = $xpath(Xpaths.maxR)[0].textContent.split('/')[1];
		this.maxC = $xpath(Xpaths.maxC)[0].textContent.split('/')[1];
	}

	this.getResources = function() {
		this.lumber = parseInt($xpath(Xpaths.lumber)[0].textContent.split('/')[0]);
		this.clay = parseInt($xpath(Xpaths.clay)[0].textContent.split('/')[0]);
		this.iron = parseInt($xpath(Xpaths.iron)[0].textContent.split('/')[0]);
		this.crop = parseInt($xpath(Xpaths.crop)[0].textContent.split('/')[0]);

	}

	this.show = function(isCurrent) {
		var bg = '';
		if (isCurrent) { bg = 'background:#dededf;-moz-border-radius:10px'; }
		var name = (this.displayName == '') ? this.name : this.displayName;
		var innerHTML =
				'<h4 style="margin:0;text-align:center">' + name + '</h4>'+
				'<table class="_dynamic">'+
				'</table>'+
				'<a title="Overview" href="/dorf1.php?newdid='+this.id+'">1</a> '+
				'<a title="Center" href="/dorf2.php?newdid='+this.id+'">2</a> '+
				'<a title="Rally Point" href="/build.php?newdid='+this.id+'&id=39">R</a> ';
				
		if (this.market != 0) {
			innerHTML += '<a title="Market" href="/build.php?newdid='+this.id+'&id='+this.market+'">M</a> ';
		}
		/*if (this.bookmark != 0) {
			innerHTML += '<a title="Market" href="/build.php?newdid='+this.id+'&id='+this.bookmark+'">M</a> ';
		}*/
		if (this.barracks != 0) {
			innerHTML += '<a title="Barracks" href="/build.php?newdid='+this.id+'&id='+this.barracks+'">B</a> ';
		}
		if (this.stable != 0) {
			innerHTML += '<a title="Stable" href="/build.php?newdid='+this.id+'&id='+this.stable+'">S</a> ';
		}
		if (this.workshop != 0) {
			innerHTML += '<a title="Workshop" href="/build.php?newdid='+this.id+'&id='+this.workshop+'">W</a> ';
		}
		
		
		
		var village = document.createElement('div');
		village.setAttribute('style','float:left;margin:2px 5px;text-align:center;height:95px;'+bg);
		village.setAttribute('id','_village' + this.id);
		village.setAttribute('class','_village')
		village.innerHTML = innerHTML;
		$id('_dock').appendChild(village);
		this.update();
	}

	this.update = function() {
		var sinceLastUpdate = now - self.updated;
		self.lumber = Math.round(parseInt(self.originalResources[0]) + (sinceLastUpdate * self.lumberPS));
		self.clay   = Math.round(parseInt(self.originalResources[1]) + (sinceLastUpdate * self.clayPS));
		self.iron   = Math.round(parseInt(self.originalResources[2]) + (sinceLastUpdate * self.ironPS));
		self.crop   = Math.round(parseInt(self.originalResources[3]) + (sinceLastUpdate * self.cropPS));
		
		var t = $id('_village'+self.id);
		
		var dynamic = $class('_dynamic',t)[0];
		dynamic.innerHTML = self.dynamicRow(self.lumber,self.maxR,self.lumberPH);
		dynamic.innerHTML += self.dynamicRow(self.clay,self.maxR,self.clayPH);
		dynamic.innerHTML += self.dynamicRow(self.iron,self.maxR,self.ironPH);
		dynamic.innerHTML += self.dynamicRow(self.crop,self.maxC,self.cropPH);
	}
	
	this.dynamicRow = function(res,max,resPH) {
		var out = '';
		out += '<tr><td>' + Math.floor(res * 100 / max) + '%</td>';
		
		mres = max - res;
		
		if (res > 10000) {
			out += '<td title="-'+mres+'" style="color:#963660;">'+Math.round(res / 100) / 10 + 'k</td>';
		}
		else {
			out += '<td title="-'+mres+'">'+res+'</td>';
		}
		
		var bg = '';
		if (resPH > 0) {
			var time = (max - res) / resPH;
			if (time < 5) bg = ' style="color:red"';
			else if(time < 8) bg = ' style="color:orange"';
		}
		else {
			time = res / resPH;
			if (time > -5) bg = ' style="background:red"';
			else if(time > -8) bg = ' style="background:orange"';
			else { bg = ' style="background:yellow"'; }
		}
		return out + '<td'+bg+'>' + floatToDate(time) +'</td></tr>';
	}

	this.updateInterval = function() {
		this.originalResources[0] = this.lumber;
		this.originalResources[1] = this.clay;
		this.originalResources[2] = this.iron;
		this.originalResources[3] = this.crop;
		window.setInterval(self.update, 10000);
	}

	this.save = function() {
		var save = '';
		for (x in this) {
			var type = typeof this[x];
			if (type == 'string' || type == 'number' && type != 'undefined') {
				save += x +':'+ this[x] +'\n';
			}
		}
		GM_setValue(this.id,save);
	}
	this.load = function() {
		var save = GM_getValue(this.id);
		if (typeof save == 'undefined') return;
		save = save.split('\n');
		for(var i = 0; i < save.length; i++) {
			var k = save[i].split(':')[0];
			var v = save[i].split(':')[1];
			this[k] = v;
		}
	}
}

currentVillageEl = $xpath(Xpaths.currentVillage)[0];

if (typeof currentVillageEl === 'undefined') return;

var currentVillageId = parseInt(currentVillageEl.href.split('newdid=')[1].split('&')[0]);

var current = new Village(currentVillageId);

current.load();


if (currentURL == 'dorf1.php') {
	current.getProduction();
	current.name = $tag('h1')[0].textContent.replace(/\n/g,'');
}

if (currentURL == 'dorf2.php') {
	var marketEl = $class('g17')[0];
	if (typeof marketEl !== 'undefined') {
		current.market = parseInt(marketEl.className.split(' d')[1].split(' ')[0]) + 18; 
	}

	var barracksEl = $class('g19')[0];
	if (typeof barracksEl !== 'undefined') {
		current.barracks = parseInt(barracksEl.className.split(' d')[1].split(' ')[0]) + 18; 
	}
	
	var stableEl = $class('g20')[0];
	if (typeof stableEl !== 'undefined') {
		current.stable = parseInt(stableEl.className.split(' d')[1].split(' ')[0]) + 18; 
	}
	
	var workshopEl = $class('g21')[0];
	if (typeof workshopEl !== 'undefined') {
		current.workshop = parseInt(workshopEl.className.split(' d')[1].split(' ')[0]) + 18; 
	}
	
}

current.getMaxs();
current.getResources();
//current.setDisplayName();
current.updateInterval();
current.updated = now;
current.save();


var vs = $xpath(Xpaths.vlist);
for (var i = 0; i < vs.length; i++) {
	var id = vs[i].toString().split('newdid=')[1].split('&')[0];
	if (current.id != id) {
		var obj = new Village(id);
		obj.load();
		obj.updateInterval();
		obj.show();
	}
	else {
		current.show(true);
	}
}


























