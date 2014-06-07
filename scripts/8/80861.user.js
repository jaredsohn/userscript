// ==UserScript==
// @name           lu.scio.us thumbs
// @namespace      lu.scio.us
// @description    Changes the album thumbnail pages
// @include        http://lu.scio.us/hentai/albums/*/page/*
// @exclude        http://lu.scio.us/hentai/albums/*/comments/page/*
// ==/UserScript==


String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };

var image_urls = new Object();
image_urls["Images"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00d%08%06%00%00%00%86%AB%10%CC%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%02%C9IDATX%C3%ED%97MHTQ%14%C7%7F%A3%A3%E3d_%0BQ%17%D6%C6%3EV%05%03%05nJ%5B%94B%D16%22Z%B7%0A%82l%15DR%16%04%11T%88%B5n%95A%8B%88%3EA%826IP%90A%8C%94%15%06ec)Y%A9%99%FF%16s%1E%5C%1E%D3%CC%BB9%81%CA%3Bpy%E7%1E%E6%FC8%F7%E3%9Cs%07b%89%25%96XbY%E4%22X%2F%E8%10l%B2%F9N%C13%C1%88%E0%AA%20%E5%0B%EC%13HpH%90%12%7C%B6y0%BA%7C%81C%E6%D8%2Ch%0D%C1%24%18%2C%E4WQ%84%D9d%DFw%D8%B2%81%0B%C0%0E%D3%9B%7D%81I%C7%B1%C5%F4G%C0c%D3%AB%7D%97%3CbK%9Bv%96%B9A%B0%CA%F4%9Co%84%F7C%91%0C'%20%EB%2C%3F%EB%1Ba%A3%A0_0c%07%D4f%F6%F3%16%E1%B9%A5%99-%F5%82%8B%82Wv%B1%13%82%E3%82%D3%82u%BE%B0%3A%C1%1B%F72%9B%BD%C7%E6g%7D%81%97%C2%D9a%F6%ED6%7F%E2%0B%7Ck%8E%FBB%C0%956%1F%F7%05%CE%98c*%04%AC%B2%F9%AC%EF%C5%FEf%DF%86%90%7D%9B%7D%BD%23%BCk%91%DCq%F6%B1S%F0%D1%F4%DB%BE%C0%F6%02%25%CB%1D%ED%FFr%0F%8F%3A%7B%19%8C%19A%E7%DF%7C%12%11%A0k%80%0E%A0%1E%18%05%EE%25%E0%FD%82H%3B%95%18c%82%1B%82%8D%E5%02%06%E3%8B%60m%14%60N%F0%D3%9C~%0B%BE%DAWf%FF%E1%40%7B%A3%00%B7%1A%E4%8C%A0%D6l%B5%82n%C1%B8%A0Ep%CC%80%AF%A3%00%07%EC%C7%E9%90%BD%C6%EC%03%82%0A%83OG%01N%99%E3)%C12%B3%A5%05'%82%E6e%B6%E1%A8%C0Ag%8Ffm%F3g%1D%DBK%2B%14S%82%A1(%C0%5D%A1%16%EA%8EiK%CD6%3B%BC%CBQ%AFN%C6%DE8%A3%16%DD'%C1uAf%F16%B6D%89%25%EF%01%8E%90O%AFt%01%E7%3A%9F%5C%DE-%98%2B%96v%BE%C5%E1A%A9%3C%F6%05%8E%05%95%D9%81%A4%AD%F1g%23%15%84%100%B8%C45%0E0%E9%B4%D1%5B%BE%C0%EF%E6X)%984%BDU%B0%D9%F4I_%60%D6%1C%1B%05%CF%9D%14%FCe%FA%84o_~a%DF%0C%D0gz%A5%F3T%BE%E9%1Ba%93%60%8B%A0AP-%E8%B5R5)%B8%26X%B1%C4RO%F9%FD%3D%0C%1C%B4%FF%2C%C9%F9%A6%DE%C9rg%CA%87r%03%83%9Er%40PU%8E%97%C3S%03.%2F%D7Sd%AF%95%AF%1E%C1%EAr%00%93%82%87%16%E5%9Cu%BD%9C%3B%7C%81%5D%0B%FE%94%83%C7%D0%FE%E0%E50%DF%3D%EC%2F%F7)g%04%13%82%2B%3E%A7%5C%2C%97s%E4%A3K%E5%A7%8C%03s%A5r%B9%18P%11%A2I%F8T%EC%25*%89%02%07%E1%E3%5CW%0A(O%60%7C(%B1%C4%12K%2C%B1%FC7%F9%03%91Whl%03%C1%AA%2F%00%00%00%00IEND%AEB%60%82";
image_urls["Comments"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00d%08%06%00%00%00%86%AB%10%CC%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%03%24IDATX%C3%ED%99MHUA%14%C7%7F%EF%F1%CCH3%2B%B3%90%3E%E8s%17T%B4h%D3%D7%22t%D5%B2%88(%97%AE%22B7%D5F10%82(*%ECc%11%B4n%13A%94RH%D0%26%08%12%B4%12%93%3E5%CC4%8D%D4J%D3%D3%C2%FF%8D%DB%E5y%DF%9B%D75%7C%F1%06%863s%EF%99%FF%3Dg%CE%9Csf%E6%C2%BF*%06%EB%0D*%0C6%AA%BF%C7%E0%A9A%B7%C15%83%7CW%C0%9B%06fPe%90o%F0I%7D%AF%D6%B9%02%BE%D4%C0%B5%06%3B%03%60f%D0%9El%5C%3C%04s%B9%E8%5B%A46p%0E%D8%AD%F6ZW%C0%84o%E06%B5%1F%02%8F%D4%9E%E3%AAr%B7T%FB%E1Ss%83%C1%02%B5%FB%5D%25l%0EH%F2%3A%06%9D%3E%F5%3B%5D%25%5Cf%D0b0%26%03%ED%D2%F3%B3%92%F0%0C%FFW%F1%0C%E1%FA.%1E%B5%20%F1%0C%24%DF%E4%C2%5C%9B%C4%C5%A6%AB%83Q%AB%FC%20%CC%BD%BC2%0A%0C%A8%BDXt%E0O%25%18%91%FBUGf%E5%EC.%B1%10%95%13%40%0D%B0%0F(K2%DF%C4%A0%C4e%0E%CF%A7Z%3A%AEF%E9%8F%1ApT%03%0F%1B%CC%8D%228%DC%17%60aT%D1f%8B%C1%88%C1u%83EQX%B9%1F%98%AF%14%60%C0%100%99%CA%CAa%80%96%864%B1%19%8F%87%D9%9FWJ%0D.%18th%B3%1438ip%CA%60%9D%2BX%89%C1%AB%A0g%184%AA%DF%E0%0Ax1%99%AB%19%ECP%FF%B1%2B%E0%1B%0D%DC%1F%00%2CR%7F%C8%15pL%03%F3%03%80y%EA%FFtMR_E%97%06%9Eo%17u%96%F0%9E%24%B9%EB%9B%C7%1A%83%5E%B5%EF%B8%02%96%A7%88%87%E5%99%AC%C3j%DF%5Czu%CC%A6R%83%5B%B4%F1%81%AE%00*%80R%A0%0Fh%8A%C1%BBY%91%F5%E2%C0%11%E0%90N%04%7F%9D%F5j%A3NR%3DQ%03~%D7%C0%83%06yQ%84%AE'Qg%BD%BD%06%93%0AW%C5Q%00%26%7C%B9y%D2%E0%B3v%13%BF%AB%2B%60%DD%AC%B7%B2%B7%B79%600%2F%8A9l%89%DA%CA%9B%0D%BE%18%5Cu%B1r%AA%BDM!S%97%15%B9%BD%CD%2C9V%E4%02l.%C0%E6%02l.%C0%E6%02%EC%0C%1E%1E%8B%0C%EA%0DZ%0D%3E%88%D6%DB%D4I%DF%19%AC%40%00%C9%BC%A4%D5%A0%C0%150U%C4%AEu%05l%D3%C0%DB%FA%1F%90%10%BD%15%F6%2F%20%1D_.Mr%8E6%83o%AE%87Go%D1%06O%9D%13%E9%1E%9A%82%12%3E%97%247%3C_6(%D6%C5%90%19%BCp%05l%F0%19%60%C2%60P%D42%BD%22(6%E8%9A%C6%C2%5D%19%E5%19%DD%8A%5CQ%F4%1E%17%BD%1C4Tv%FBn%95%E6%A8%CD%92l%8E%B4%B8%DB%BD%BFi%E9%006%89%B92%84%A7R%3C%CD%E9%00%F6%89%B9%2C%84%A7L%3C%7D%E9%00%8E%8B9%2F%84%C7%E9%DEfXtU%C8wW%8A%8E%A4%03%D8!z%2C%04%F0h%807T%E5%E3%3Eoh4X%E3%7B%B7%DA%E0%92%EF%FD%89t%DD%ED%7D%C0%CD%86U%FD%CFz%0C%16%BA%5C7%F7%86D%EA%8F%06%5B%5D%17%F8%12E%9Bg%0A%B4%A3j%9F%CE~%3F%FE%05%F77%26q%BF%DAT%90%00%00%00%00IEND%AEB%60%82";
image_urls["Tags"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00d%08%06%00%00%00%86%AB%10%CC%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%01%F4IDATX%C3%ED%95%3DkTA%14%86%9F%DD%ACI%D6%A06%01S%04%9B%A0V%0A%0B%0A%E9%12%0B%8D%A0%FF%C3%D6%C6V%10%D1B%10A%2C%82%B5%95%11%2C%EC%B4%10%C1*%8D%82%B1%D9%20AH%A3f%FD%80%F5c5%FAZ%F8.%0C%97%90%9D%D1%88%1F%9C%17%869%F7p%CFs%CF%99%3Bg%06B%A1P(%14%0A%85B%E5%12%EC%15%1C%17%1C%F0%F3Q%C1%23%C1%AA%E0%BA%60%A4%14%B8%20%90%E0%94%60D%F0%CA%CF%FDq%AE%14%B8%EC%C0)%C1L%05%26%C1%D2Fq%F5M%98%93%9E%9F%E3%B2%81%2B%C0%11%DBS%A5%C0F%128m%FB%01%F0%D0%F6pi%C9%AB.%AD%97%94%B9O%B0%CB%F6Zi%86w%2B%99%AC%D4%A0%9D%94%DF.%CDpBp_%F0%D9%3Fh%D6%FE%CB%CE%F0%D2%FF%D7)%1A0%3A%82%5B%82%FD%5B%05%EC%8F%D7%82%3D9%C05%C1G%07%7D%15%BC%F1%2C%FB%3F%24%D0%F9%1C%E0aC.%0A%C6%EC%1B%13%5C%10%BC%15L%0B%CE%18%F8%2C%07%B8%E8%97%9B%15%FF%A8%FD%8B%82%BA%E1%BD%1C%E0'%07%9E%17l%B7%AF)8%DB%EF%20%FBVr%81K%C9%1A%AD%7B%F1%D7%13%DFS%C16%7Fx9%07x%AC%D2%C7%E9%E8%09%E6%04%B3%FEy%D7r%B7N%CB%07%EDKg%F7BpS%D0%FAw%3B%AC6%A0%E4%93%C0i~%B4Ws%83%E0%F1%92%5E%3E!%F8%B6Y%DB%95%1E%0E%F7%06%F5q)%B0%E3%C0%B9%04%D2%14%5C%15%B4%B3%0E%84%0A%B0%BF%89G%13%60C%B0%D3%F6%9DR%E0%7B%07%0E%09%BA%B6g%04%07mwK%81m%07N%08%1E'-%F8%C5%F6%BB%D2%5B%EF%89%E7%16%B0%60%7B(%B9%AFo%97f8)8%24%D8-%18%16%CC%FB%A8%EA%0An%08v%FC%B9%8B%E9W%18%F5%ADN%EA%EF%07%D6%AAkh%B3%93%19%3C%9E%0B%CC%CD%A6%F6%DBKn%E4~9%B6M(%14%0A%85B%A1P%E8g%F4%1D%0FSsd%DA%10~%DC%00%00%00%00IEND%AEB%60%82";
image_urls["Related"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00d%08%06%00%00%00%86%AB%10%CC%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%02oIDATX%C3%ED%98%3Fh%14Q%10%C6%7F%97%3B%93%BB%04m%3C%12%11%15%0B%C1.(%D1BD-c%D0%DE%DE%5EP%92%CE%C2%13%04%7B%15%11k%C1B%C5%22%88%8A%08%16%22(%16%82%04%24%88%88%8Dz%26%9A%90%BB%60N%CDgq%B3%F0X%EE%CFN%B8%C2%C47%B0%BC7s7%DF%CE%BE7%F3%E6%DB%85(Q%A2D%89%02%90%0B%15%81%9C%CE%B9%B4%AD%AF%D7%11%16R%FA%7CJ%1F%02%8A%C0%1F%60%09%D8%0C%E4%81%15%A0%E6%BA%93%E0%A0%60AP%11%0C%9Am%D0%F4%9A%E0%B0%17%F0%95%40jF%18%DA%8Bf%7F%ED%05%FCi%8E%15A%C9l%25%C1%05%B3%AFx%01g%CCQ%82%DF%82%EF6%26%B6%19%2F%E0%84%A0%11%00%84WC0%E1N%01%C1%98%E0%9E%A0j%D1U%05w%05c%1B%B4.%05%C3%82%2B%82w%82o%82%9C%E0%BC%E0%92%60%8F%17%AC%2C%F8%10n%86%D9%AF%9B~%D9%0Bx5%BD%BBf%3Fj%FAK%2F%E0Gs%3C%95%02%DCb%FA%82%170%C9%C1%81%14%E0%A6%24%D9%5B%F9u%3A%BE%96l%1CI%D9%8F%D8%E8%8E%F0%91E%F20X%C7)%C1%17%9B%3F%F0%02%8E%B7)%BB%E4%1A_K%1EN%B6%A8%E7%86%60*SOi%03%BA%138%0E%0C%03U%E0q%0E%3E%FD%13e%A7v%5D%B0%D3o%3D%EFz%7Dk%88%7C%9F%E7%CF%95.%A9%12%5E%3Fz%FD%C8O%B34%FA%E5%A0%D9om%D1%FC%05%D4%81%E7%C0d%CFvy%03%D1%B9%16%8F%7D%128%0B%EC%C5%D8C%CA%B9%ECY%C3%13%82%D5N%A9%E3%DD%94'%DDr%D1%0B8%9F%9C%7B%01H%C9%DA%EA%AC%60%97%170!F%C5%00%B0%104%A9i%2F%60%DD%1C%F3F0%258%26%18%B5%B9%9B%C1%CE%9A%E36%C1%9B%80%D6%FD%B2%F9%A2%B7%96%DF%DA%B8%1F%B8c%F3%7CP%AE%F7%BD%11%EE%10%1C%10%8C%08%FA%057%8Cs%D7%04%B7%D4%24%F0%1B%E0Mj%CE%E9%5C%5E%7F%AFf%91cG%8E%1D9%F6%7F%CE%B1%05%87z%054*%98%CE%7C%D4%09%CE%09%DE%DBZ%7D%15%5C%13%0CY%93%BF%19%D2%93%2C%60%A7%DB%EC%E8m%FB%F6%10%DA%3Eg%01%7C%118%D4%05%CB6_%0D%22%AB%09.%AA%F9%19%AB%2B%E0%A29%9D%B1%A3*g%F3%E4%26%CF%04%DB%3D%0B%9ED1%10%D8%FA%03%C0%DD%3D%E1%D5%1E%FAVh%03%3C%97%C5%1E%DBh%94(Q%A2%ACg%F9%0B%A7jU%3A%A5W%DE%60%00%00%00%00IEND%AEB%60%82";

var topmenu = document.getElementById("topmenu");
var logo = document.getElementById("logo");
var header = document.getElementById("header");
var shl = document.getElementById("sh-l");
var shr = document.getElementById("sh-r");
var navigation = document.getElementById("navigation");
var content = document.getElementById("content");
var topwrapper = document.getElementById("top_wrapper");
var wrapper = document.getElementById("wrapper");
var searchtab = document.getElementById("tab1");
var tmp;

navigation.parentNode.removeChild(navigation);
shr.appendChild(topmenu);
topmenu.style.textAlign = "right";
tmp = document.createElement("br");
tmp.className = "clear";
topmenu.insertBefore(tmp,topmenu.children[3]);
document.getElementById("background_layer2").style.height = "75px";
shl.style.width = "50%";
shl.style.height = "75px";
shr.style.height = "75px";
shr.style.textAlign = "right";
header.style.height = "75px";
header.style.width = "90%";
wrapper.style.width = "90%";
content.style.width = "100%";
content.style.minHeight = "0px";
content.style.padding = "0"; 
content.style.border = "0"; 
content.style.cssFloat = "none";

tmp = document.getElementById("tab_menu");
tmp.parentNode.removeChild(tmp);

tmp = document.getElementById("top");
tmp.parentNode.removeChild(tmp);

for (var i = 0; i < wrapper.children.length; ++i)	{
    if (wrapper.children.item(i).className == "footer")    {
        wrapper.removeChild(wrapper.children.item(i));
    }
}

for (var i = 0; i < topwrapper.children.length; ++i)	{
    if (topwrapper.children.item(i).className == "footer_wrapper")    {
        topwrapper.removeChild(topwrapper.children.item(i));
    }
}

var albumrow;
var relatedTags;
var albums;
var commentslist;
for (var i = content.children.length; i--; )	{
    switch (content.children.item(i).className)	{
		case "album_row":
			albumrow = content.children.item(i);
			break;
		case "albums":
			albums = content.children.item(i);
			break;
		case "album_info":
			break;
		case "sub":
			relatedTags = content.children.item(i);
			content.removeChild(relatedTags);
			break;
		case "albumCommentList comments":
			commentslist = content.children.item(i);
			break;
		default:
			content.removeChild(content.children.item(i));
	}
}

var albumheader;
var cpanel;
var infoblock;
var albumbody;
var thumbs;
var pager;
for (var i = albumrow.children.length; i--; )	{
    switch (albumrow.children.item(i).className)	{
		case "album_header":
			albumheader = albumrow.children.item(i);
			break;
		case "album_cpanel":
			cpanel = albumrow.children.item(i);
			infoblock = cpanel.children.item(0);
			break;
		case "album_body":
			albumbody = albumrow.children.item(i);
			thumbs = albumbody.children.item(0);
			pager = albumbody.children.item(1);
			break;
		default:
			albumrow.removeChild(albumrow.children.item(i));
	}
}

infoblock.style.cssFloat = "right";
infoblock.style.width = "20%";
albumheader.style.paddingRight = "0px";
albumheader.insertBefore(infoblock, albumheader.firstChild);
albumrow.removeChild(cpanel);

// parse thumbs
var images = new Array();
for (var i = 0; i < thumbs.children.length; ++i)	{
	images[i] = new Object();
	images[i].page = thumbs.children.item(i).children.item(0).href;
	images[i].thumb = thumbs.children.item(i).children.item(0).children.item(0).src;
	images[i].normal = images[i].thumb.replace("/thumb_100_", "/normal__");
	images[i].full = images[i].thumb.replace("/thumb_100_", "/");
}
albumbody.removeChild(thumbs);

// parse pager
var pagestring = pager.lastChild.wholeText.trim();
albumbody.removeChild(pager);
tmp = pagestring.match(/\d+/);
var firstthumb = eval(tmp[0]);
var lastthumb = eval(tmp[1]);
var imagecount = eval(tmp[2]);

// parse related albums
var related = new Array();
for (var i = 0; i < albums.children.length; ++i)	{
	related[i] = new Object();
	related[i].page = albums.children.item(i).children.item(0).href;
	related[i].title = albums.children.item(i).children.item(0).children.item(0).textContent.trim();
	related[i].thumb = albums.children.item(i).children.item(0).children.item(1).src;
	related[i].normal = related[i].thumb.replace("/thumb_100_", "/normal__");
	related[i].full = related[i].thumb.replace("/thumb_100_", "/");
	var tmp = document.getElementById(albums.children.item(i).id.replace("_aid", "_ainfo"));
	related[i].description = tmp.innerHTML;
	content.removeChild(tmp);
}
content.removeChild(albums);

// parse comments
var comments = new Array();
for (var i = 0; i < commentslist.children.item(0).children.length; ++i)	{
	comments[i] = new Object();
	comments[i].page = commentslist.children.item(0).children.item(i).children.item(0).children.item(0).href;
	comments[i].thumb = commentslist.children.item(0).children.item(i).children.item(0).children.item(0).children.item(0).src;
	comments[i].normal = comments[i].thumb.replace("/thumb_100_", "/normal__");
	comments[i].full = comments[i].thumb.replace("/thumb_100_", "/");
	comments[i].author = commentslist.children.item(0).children.item(i).children.item(1).children.item(0).children.item(0).innerHTML;
	comments[i].date = commentslist.children.item(0).children.item(i).children.item(1).children.item(0).children.item(1).textContent.trim();
	comments[i].body = commentslist.children.item(0).children.item(i).children.item(1).children.item(1).innerHTML;
}
content.removeChild(commentslist);

// create table
// <table width="100%"><tr><td width="20px"><!-- menu --></td><td width="140px"><!-- thumbs --></td><td><!-- content --></td></tr></table>
var maintable = document.createElement("table");
var menuitems = ["Images", "Comments", "Tags", "Related"];

function menuClick(index)	{
	
	var fnc = function(event) {
		if (typeof event != "undefined")	{
			event.stopPropagation();
			event.preventDefault();
		}
		for (var i = menuitems.length; i--; )	{
			document.getElementById("gmMenuItem" + i).children.item(0).style.backgroundColor = "";
			document.getElementById("gm" + menuitems[i]).style.display = "none";
		}
		document.getElementById("gmMenuItem" + index).children.item(0).style.backgroundColor = "#C00000";
		document.getElementById("gm" + menuitems[index]).style.display = "block";
	}
	
	return fnc;
}

function thumbClick(index)	{

	var fnc = function(event) {
		if (typeof event != "undefined")	{
			event.stopPropagation();
			event.preventDefault();
		}
		for (var i = images.length; i--; )	{
			document.getElementById("gmThumbnail" + i).style.backgroundColor = "";
		}
		document.getElementById("gmThumbnail" + index).style.backgroundColor = "#FF0000";
		
		var img = document.createElement("img");
		img.src = images[index].normal;
		img.alt = index+firstthumb;
		
		var contentDiv = document.getElementById("gmContent");
		contentDiv.innerHTML = "";		
		contentDiv.style.textAlign = "center";
		contentDiv.style.verticalAlign = "middle";
		contentDiv.appendChild(img);
		
	}
	
	return fnc;
}

maintable.style.width = "100%";
maintable.style.height = "1000px";
maintable.cellSpacing = "0";
maintable.cellPadding = "0";
maintable.appendChild(document.createElement("tbody"));
maintable.tBodies[0].appendChild(document.createElement("tr"));

maintable.tBodies[0].rows[0].appendChild(document.createElement("td"));
maintable.tBodies[0].rows[0].cells[0].id = "gmmenu";
maintable.tBodies[0].rows[0].cells[0].style.width = "20px";
maintable.tBodies[0].rows[0].cells[0].style.overflow = "hidden";
maintable.tBodies[0].rows[0].cells[0].style.verticalAlign = "top";
maintable.tBodies[0].rows[0].cells[0].style.backgroundColor = "#800000";
for (var i = 0; i < menuitems.length; ++i)	{
	var a = document.createElement("a");
	a.id = "gmMenuItem" + i;
	a.href = "#";
	a.addEventListener("click", menuClick(i), true);
	
	var img = document.createElement("img");
	img.alt = menuitems[i];
	img.src = image_urls[menuitems[i]];
	a.appendChild(img);
	maintable.tBodies[0].rows[0].cells[0].appendChild(a);
}

maintable.tBodies[0].rows[0].appendChild(document.createElement("td"));
maintable.tBodies[0].rows[0].cells[1].style.width = "130px";
maintable.tBodies[0].rows[0].cells[1].style.backgroundColor = "#C00000";
maintable.tBodies[0].rows[0].cells[1].style.position = "relative";
maintable.tBodies[0].rows[0].cells[1].style.overflow = "hidden";

var imagelist = document.createElement("ul");
imagelist.id = "gmImages";
imagelist.style.display = "none";
imagelist.style.width = "130px";
imagelist.style.height = "1px";
imagelist.style.overflow = "auto";
imagelist.style.margin = "0px";
imagelist.style.padding = "0px";
//imagelist.style.position = "relative";
// imagelist.style.left = "0px";
// imagelist.style.top = "0px";
for (var i = 0; i < images.length; ++i)	{
	var item = document.createElement("li");
	item.id = "gmThumbnail" + i;
	
	item.style.listStyleType = "none";
	item.style.textAlign = "center";
	item.style.padding = "5px";
	
	item.style.width = "100px";
	item.style.height = "100px";
	item.style.overflow = "hidden";
	
	item.addEventListener("click", thumbClick(i), true);
	
	var a = document.createElement("a");
	a.href = images[i].full;
	
	var img = document.createElement("img");
	img.src = images[i].thumb;
	img.alt = i+firstthumb;
	
	a.appendChild(img);
	item.appendChild(a);
	imagelist.appendChild(item);
}
maintable.tBodies[0].rows[0].cells[1].appendChild(imagelist);

var commentlist = document.createElement("div");
commentlist.id = "gmComments";
commentlist.style.display = "none";
commentlist.style.width = "130px";
commentlist.style.height = "1px";
commentlist.style.overflow = "auto";
commentlist.style.margin = "0px";
commentlist.style.padding = "0px";
//commentlist.style.position = "relative";
// commentlist.style.left = "0px";
// commentlist.style.top = "0px";
maintable.tBodies[0].rows[0].cells[1].appendChild(commentlist);

var taglist = document.createElement("div");
taglist.id = "gmTags";
taglist.style.display = "none";
taglist.style.width = "130px";
taglist.style.height = "1px";
taglist.style.overflow = "auto";
taglist.style.margin = "0px";
taglist.style.padding = "0px";
//taglist.style.position = "relative";
// taglist.style.left = "0px";
// taglist.style.top = "0px";
maintable.tBodies[0].rows[0].cells[1].appendChild(taglist);

var relatedlist = document.createElement("div");
relatedlist.id = "gmRelated";
relatedlist.style.display = "none";
relatedlist.style.width = "130px";
relatedlist.style.height = "1px";
relatedlist.style.overflow = "auto";
relatedlist.style.margin = "0px";
relatedlist.style.padding = "0px";
//relatedlist.style.position = "relative";
// relatedlist.style.left = "0px";
// relatedlist.style.top = "0px";
maintable.tBodies[0].rows[0].cells[1].appendChild(relatedlist);

maintable.tBodies[0].rows[0].appendChild(document.createElement("td"));
maintable.tBodies[0].rows[0].cells[2].style.backgroundColor = "#FF0000";
maintable.tBodies[0].rows[0].cells[2].style.position = "relative";
maintable.tBodies[0].rows[0].cells[2].style.overflow = "hidden";

var contentDiv = document.createElement("div");
contentDiv.id = "gmContent";
contentDiv.style.display = "block";
contentDiv.style.width = "1px";
contentDiv.style.height = "1px";
contentDiv.style.overflow = "auto";
contentDiv.style.margin = "0px";
contentDiv.style.padding = "0px";
//contentDiv.style.position = "relative";
maintable.tBodies[0].rows[0].cells[2].appendChild(contentDiv);

function adjustElementSize(elm)	{
	var display = elm.style.display;
	elm.style.display = "none";
	elm.style.width = elm.parentNode.clientWidth+"px";
	elm.style.height = elm.parentNode.clientHeight+"px";
	elm.style.display = display;
}

function adjustSize()	{
	var spaceAvailable = window.innerHeight - maintable.offsetTop;
	maintable.style.height = (spaceAvailable - 40) + "px";
	
	var elms = [imagelist, commentlist, taglist, relatedlist, contentDiv];
	var display = new Array();
	
	for (var i = 0; i < elms.length; ++i)	{
		display.push(elms[i].style.display);
		elms[i].style.display = "none";
	}
	
	for (var i = 0; i < elms.length; ++i)	{
		elms[i].style.width = elms[i].parentNode.clientWidth+"px";
		elms[i].style.height = elms[i].parentNode.clientHeight+"px";
	}
	
	for (var i = elms.length; i--; )	{
		elms[i].style.display = display.pop();
	}
	
}

albumbody.parentNode.replaceChild(maintable, albumbody);

unsafeWindow.onresize = adjustSize;

menuClick(0)();
thumbClick(0)();
adjustSize();

