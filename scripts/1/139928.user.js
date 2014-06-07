// ==UserScript==
// @name		Mediafire Linker Plus
// Last Edited		December 2013

// @include		http://*
// @include		https://*
// @exclude		http://www.mediafire.com/?*
// ==/UserScript==

/*
This script was modified in December 2013.
While the original version is I do not know anymore who the creator.
I'm Sorry...!
*/

const thisURL = window.location.href;
const thisDomain = GetDomain(thisURL);

function GetDomain(url) {
	return url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/)[2];
}
var script_updater = {
    default_options : {
        script_name:"Mediafire Linker Plus",
        script_version:"1.0.0",
        script_id:"139928",
        script_update_reason:""
    },
    check_version:function(src_version,dest_version){
        src_version = parseFloat(src_version);
        dest_version = parseFloat(dest_version);
        console.log(src_version,dest_version,src_version<dest_version);
        return src_version < dest_version;
    },
    update:function(options){
		var d = new Date();
		var dy = d.getFullYear();
		var dm = d.getMonth() + 1;
		var dd = d.getDate();
		var ys = new String(dy);
		var ms = new String(dm);
		var ds = new String(dd);
		if ( ms.length == 1 ) ms = "0" + ms;
		if ( ds.length == 1 ) ds = "0" + ds;
		ys = parseFloat(ys + ms + ds);

		var upd = GM_getValue("checked_for_new_version", 0);
	  if(ys > upd){
		GM_setValue("checked_for_new_version", ys);
        var opt = options || this.default_options;
        var ret = {},_this = this;
        GM_xmlhttpRequest({
            method:'GET',
            url:"http://userscripts.org/scripts/source/"+opt.script_id+".meta.js",
            onload:function(xmlHttp){
                if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
                    if(/\/\/\s*@version\s*(\d.*)/.test(xmlHttp.responseText)){
                        var new_version = RegExp.$1;
                        if(_this.check_version(opt.script_version,new_version)){
							var rex = [/Reason\s:([^\n]+)/g,/Info\s:([^\n]+)/g]
							var reason = rex[0].exec(xmlHttp.responseText)
							var info = rex[1].exec(xmlHttp.responseText)                         
                            message = "Update for: "+opt.script_name +"\nVersion: "+new_version+"\n"+reason[0]+"\n"+info[0]+"\nThanks for using my script";
                            alert(message);
                            window.location.href = "http://userscripts.org/scripts/source/"+opt.script_id+".user.js";
                        }
                    }
                }
            },
            synchronous:false
        });
		
	  }
    }    
};
script_updater.update();

(function () {
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//    Inline Images + GM Styles
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var dead_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjlJREFUeNqkU0toE1EUvTP5EvIFU5vREu3CLiKFpEoQQUgXUnCnoCKIK9uFVhd26WdTRBFBl4qCLl2IG1t3dafQRqVdpLGR1kojJabqDDr/5Hlm5qW0YFd5cOfd9+65593fCIwx6maJ1OXyO58XgkAC0QjUSX7/vk00bkHROSjo7TngTkEtQKZPM/bYJbA9p8mzExNDuqaxz3NzmcXZ2SNI7lDnJeh3KRg8bpnmT5Dcx9Ub515wavAMEWCNAjSaKxYz+3M5yVBVqzwz8+VHo3E+EY9fTkvSsa/V6iKQlwJEq47HOfhuEjilNImGEPoZqMPFUqk/mkwmliuV76FwmKrz8x8R7hic1wPOyzsQuDm3QATAo8F8foBEMVSrVJY0TTsoeKm4azcncGuwur0taVze6JekPbosB5fq9WoqFkuotr3wx7IGTV6zxtY26lwsz3h9Xzp9uMfn66nU6zXZMB6uNJsfQoFABLbp9v/moEMA9rHeWOzEAVGU1hRlfcMwniPkp3A8+U1Vp6J+fxb6bYunu0lge3lnDaKLR8PhrGaaf8uy/AnnJwpsbQ9zdc22X+KhApxL2wicA8Dj+UgkE221/FOKsoLzLdTm1wPY7kDeeSQ3QVCGbUTnQ0hOF3qxX4Chlkq1X0WjTej3MjuMbsHDXsPYFlinjYIg7IVheIDoCsL9/RZ5osrLwKpecG4WPogzAsE+or4k0a4Fxl53COJ83AP8oRbPzOI647Pj2yIifDeEbn/nfwIMAHRw8IEoeC1+AAAAAElFTkSuQmCC';
	var live_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhxJREFUeNpi/P//PwMlgImBQsACIhhnCAFZjEAGkANy0B8gwQ00m5kRogpEMYHl5YF4LZBXw/D3/47/Ea/xuOD7PwaGX1AMMvDvfwGGf/8nprkkGQPZLUAVHqR4gY3hH0Ofoby+6ZcvXxjinWL0Gf4wtMC9QAAwAjXXK0jIO8gLyUl9/Pzx98Fjh24AXdOA7gIPoP/PwJwGdvoPoNP/MGQIcwkGq4mrKHz5+uXf0UtH7wBdMRGodgvCgP9ATX/+tyT5JxqCaDAfIu7DwcSWJckjqfzgwQOGU5dP3f3w4cNSoJq5DL//I0Xjn38tMX4xes+ePWOK8IowAPGBmnNZ/jPVS4vLqH7985Xl5YcXDz99+rAJGIDtQAxxIcKA/zVLViy8xM7J9uvU7VPMDnaOOkAb4sVkxTV+sPxgf/fhzdOP797vZ/gLjD4GBojObT8gAQRKiYx9/AxADaAwaDF2NtN6+vMZpwCnAMP7b+8Zfrz49vrj3fdHGJgZkhhYmT4w7P4J1wzWCyY8OBgY5JiBmBFsiLSdvMYP3l/cv1/+/PD57Psz/5kYEhgO/H4K1owEEAYwQlOcAtAQc2YPBmnGFi4TfpnvFz7d+f/wXyrD8T/XGR79w4hfZANAYcELxAJAzMdgzGTJoMOQxnDmfyfD1f9XgGIgq39AaRD+xQDyNBDADAA5gR2IOaA0MzRX/IPiP1D8F4n+BzeAEgAQYAC7HATaTnWSLQAAAABJRU5ErkJggg==';
	var live_pass_png = 'data:;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAASQSURBVHjaxFVpaFRXFP7ue2/WTMxETcZMYhLNYnCLmjbVdLPVH2JtqYiplEAgP1IRrGhrKTSglaEWSoVQSltLhZbaFooI1mVcMGijKSGWxJCaaJaJcdJMZpLMTGZ/797X+yZTyTQKLf3hhe+d++52lvudc4mqqniSTfo/my8ffn7OGHdogSCJ+/UG3btcEkEkUBJKjxxT9kEgrdqSTR+0pBtAvpzPe4R3tGkOhX8yBEAkM6s0ISTnizhO8b8mUNV5CRX/1J9BCPmlsGzhhqWr8iBl6ACZYtobXtvTMXo9FIhuJQJxprQkm/BY96IMSKSgGURVK5ja3Li5oYr3HXzFFpUxzAb39K38spx15dVLIBn0uHFlYKpx7/mTF38dubuiuggmi/Eooyx7thrhX0ZbD4Zja4sqnw6FQqh/ua4SChyEOzIbjMo1+aU2A4ieG0Mwcnf8zp+eYF1fp/ukaZ4ZGfOMlVRmmf+VA4QrP1S8qGhj0fxCe2A6IF+7eb2XR+MwEdPtJ6IUJQrlARa5awasrylZXroQp61581dCiCA+PQklGmSPM2ALd8KRvF/AmQw9EzRu7F6Qlb2j3FZaHAqHWMfdjn4um/n4WTkupxkgxxWV8ggBdgjchsJVZdZFG958XZ9ZCEFPkbPsHIwLvY/IApUrV1RHw46GtSdOnXCkKOLkcptR0O/Js+SVuFwujAXGBoLR4Ekek2+Sa6icFJx4XAqiSqlB1Rkhjw1BsuaA5m7Gtd9VdPe2w2TUwSLmdoPYwpVzOKAwR91rdatHR0eFXVt3rdH++Yl7JVU4lG8rKAsrYcnjHxsOBv1nOAGPcsyQ82HqQaKUfWQvyak1Z5khmUQoHjeGJuy41j6EN15cMmm3yLc7h6OlXs8I5pJQUZu+/+nb2waTPtF+r13c+MJLKyGr9bmLbRUxKWaY9PvcgcmpFtDk9cxoPh/7WzkoN8qWn/XeuueKYLQyjHtC8PoJIq52FAt31Ej/hXstP3z4tehp9W0z/VibxhutEpJjWfwC1SQHqjZVL3fHR01WkxVTkSnExiLewMBUK0Q0QCf4cTn+UPm5g2s05Z/aCuYdWFVTAP94BEKCordrHD+3uc8e3K5/xZodIze7QrAvsqJ8sYhBF8OKd4ZJegQu8UMHqJOHvumW87c/RErCXuJFNBT2B/smuzjj9+Jywo/9gYfKU/Xpi1y7+UDFaitMZgW+YR/2HGn77sjpwfc/v+LeFzdnkKydO9Hn0+Gej8C07VWEBWN8LgkvpsaKRSeeEeH2DzjMT2UVRDuD/eowexttihv32dziYBJ3V9XkQjIK8AwGQBLALXf4+PBE7MbHtZn26SAfGBlH/fZl0Ek8LR6MIxaJPfIt0CKRCRe1crhRJRyPTPga0aE2oyeZEks5tJ3xFBJa1kWjcqTlwoieF0FY9CI+OeP6bNQfb+dPACoW64UH9ycUz1dXIelE7Y0AvdqHhMKUuRzQ8ggwcBhTUkzVa5aCkgKdJZnFKD7LqJq8RlEkUihGu/mmZKJbjMTAT1jPWPpzyx8nNh1lrWkGPMn2lwADADGYJrXfOg/sAAAAAElFTkSuQmCC';
	var live_authorize_png = 'data:;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKiSURBVHjapJPNTxNBGId/uzvb3ZaWbum2pKSlUGkxVApIImCUAxqIRiQavXDiZuIfgAc9edCzJhgjGo+KF00kXowHMIgKQdpSkRK+v1MIrYF+2O6s2wNIE2/8ZvImc3ifed5JhlFVFccJyZeec17kOYQw0OtTYBhAoQxMRbSps4V95nWmfb+TYvLNELk3Psv0Czxyr4fn/gEOkrcxCUbo+TiSabb4/Cn1gf+kOZCllZDIjNjVnHrod0shnqMjBQZHAbZiOySeR5ZGbBa5w8k5OmDQ1v7ePER23lyVnigjnAH/ByCvruAPtWONCrvqlnv9NO/w6UQBnKkc01Em/iI6tRKTKN4fBShUhbYhErZJ0+hTcrRCMAi7i7F1Mh0OwV7CQckKGE2sMEO8YuNzSqGBxaBDjlKHwyL1GUVTo6idM5s7VhMULKhxKBzBWMoAZ9cFc+u4+ujzt7GE1jZ8CAiUUu2GdI1cXVVb5fejTNZhYTmBtY0lnJBy8NXfQCzyBFNZwGl3V/bIO/1aW/UhYHzPhWQqE+3UmyK1AU8DK+hhcTGQ5uIwu7wQ9UnUGBsxvz6F76s87tsFX8EIHzLXsRITCGaXcWZ6EsQgIZXcBrFIkGSC8OBTeJs6YfuxCPuc71WmQv5UANhOF8k+r/PxxdvdDe9ys1jSQC3qKC7XlYFRotDxu2D0Ozjr70L5/sBHnrG9PACw+XLLF3zee9N4ZV0UMZGtBSd5Uefkweu1B0wtwiAR0FQQcqURouS5s7n601UAuBv4chUbIQQjKbBpoDU+AE/9JZAiJ4jUBr6kHZyxGaLVA0fjtWpesPYWjJAwVHRvTYbbZn6F2q1uuVTHf0XwbRjZbBoszVFCoCyPZCnoIChlOSWdbDgAMMf9jSyOmb8CDACmK/+HE4KjKwAAAABJRU5ErkJggg==';
	var live_folder_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACJElEQVR42r2TzWsTURTFz5tMZibJJM1Xo7UVEiUqtlLQGou0xbpwJ7Rrd/4Fiit3IgpubP8AVwV3FfELtEFRjBtx4ULFhdJiFSSQNCaTSSYzb97zZaZox3ZX8K0eM3N+995z7hDs8pD/Bli6NqNQl6viygkBuXi9YgQA9y7tG+YgDPyvyKEuJify4cLp6WUgUgLffCkIIMZncmjxqAegd0ffNmm8xDkPVGW2hejoSTDJBbOaW+px6MkM5ON3iPdk/Va62zQsLSCmFImDRWTGS6CtqtCGAvCYJkGdeugDVm/n2uH9x2J8swLjDNFUDtFMHL3aFxBJ3uZJVA1Bm1nxAfzDBf6rviEu9M+MzO54XQj1jqbGVQna2Tc+oPvyBDc67J94iG/WDkd2GcykjpHpiv+F+XxsG8CHiKGEsWxLF6pIZj2XwMpwFWll7zMfUD7AjW4wgX5kfVlD15FtNeGEZCGm+JrLorynCUJ7iCq47AFaT4cEINiBKtp8UMxjTWnjXF3FxPc1vB/Jo5zqwmEO5hoOTp354Y/QfqxwwwqaFWYclVQMrxMDkImCQmgQ39w6bG5hvt7ApG1CmXcIWb7/pDDQe3UziU9zjIf6ecnepgBShDGsKjpepD+iv6SMuJhqjNMxy3Sq0pFHjfDsFbKwsKils0ODkVgirqmqLrYxzMH7S+UtlswIXGJIZf3G1aI9u3TYOf+ubZvdjtkyNmo/a7v+G38D/DXbTCEFnt0AAAAASUVORK5CYII=';
	var live_preview_png = 'data:;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAQCAYAAABz9a1kAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAPvSURBVHjazFZdTFtlGH5Oz2lpy09/GEPG1rKxKZnKjyjGoAhOk0GMMdkNIySbXBhDnDEm3JGwiyYmXGi4MybuJ5mJXmwGotBp4n4QJ92muMSEKZAyLL9be1pOOef0/Pke2jVOysC4C9/k6fd+PW/P93zP+77fV8YwDPwfjHsULxkZGdl0Nw6HA6Ionmlra3trsxhTjHUizCdeosSQY35LUOkj3wKwTDrSHCzrz/2E8zTrhWYEjfaV7MtaW1tzEURjYyNCodDx4eFhPIyMZdNtijqQysAkphlu6MbA26921ZMfoIjD21HLarWioaEBRUVFJpnT/57Ig2aDjo/q/DXPCYKAY6901kBFYLupu0+G7Ph/qRGGSPRVPOZv9nt9u+KrceXKj1cnSZ2TW/3Q6/VifHwcoqyATwiQkwlsR5HDVB83spKbKZEoJSreKXZ6jjxeur9CSAr62K2xKVJlgGK/3orIvgMHIXI7sCQXYpmwIBfh3d6Bj492n3TnVsSgxVUj0HWkq+7U+VMBpHsgSOPrdoutu6ygrDIcDmMxvjidEBOfk0afIUefXP55KuunFAWKakGxtxRPeMrgtNswOxfBWsr6vpC8XkshLRsVUfVA5xud1fPz85b2tvZac04LneAMS1956e4DSTXJLfGLs4kEP0SF+iEhrdg/rPmZ/VmYRPfu8aG8xI0dLify7Rw8hQ4ceqkRrhJ/89HuvjdzEDF6z31x9laew5YK/RFim5tanoJiHNu5p7RK4qS8KH83Eo/GLkGjtgXSDIalnIrch5CUYbMy0DQZSVGGeW7qmoYStwM1T9eB5bjaXKkJ0sIYvHAhUH+o4eDk6m1H1ctP1sfWYpAWhZV4JBYCiw/oLJHWCeQgYVpT7b6sf3bwBxQX5sGSqUKN6LMs7VkDPK582O32HDXyrQz42CB8DG4GfwqUN/mrVpiVfEWQ+dXbsV9JtxP4XuHxnfzQ4rw6MZP1V+7dg5ySYOUspAaDPJuN6oRdJyaKq+ac30jkYmaBCiLzPIsIPx1wPuvaLU4kpoxZ/T1cUyO4o2/Z5y9WV2T9tXgUv/w2iddeqKYDwIKUCiSTEhhdwNydKT7f6TyTq33N0YWw5seXqQiuKJ+uXbz7p/GNPEBzEAlT812EYkLB+gGXPvgflJfjsmhraUAsGsO5ocv4PbyAuaUookRk7Noozy+F3dM3g6d7enqybcyYFw5DRn4ewZ4Z2cyto2egZqD9bdSNzNU9NDRkzMzMQJI21o5isGBsBZQiDpoiQbfv9Oz1qF+Njo428zw/4fP5Wvr7+3nmUfwNSO9j+9bR0eGurKy8tLy8XLuwsDAxODhY95cAAwCxBbmV9CJLDQAAAABJRU5ErkJggg==';

	GM_addStyle("#live_link {background:#CCFFCC url("+live_png+") no-repeat scroll 100% 50%;padding-right:18px;-moz-border-radius:3px;-khtml-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;}");
	GM_addStyle("#live_authorize_link {background:#CCFFCC url("+live_authorize_png+") no-repeat scroll 100% 50%;padding-right:18px;-moz-border-radius:3px;-khtml-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;}");
	GM_addStyle("#live_folder_link {background:#CCFFCC url("+live_folder_png+") no-repeat scroll 100% 50%;padding-right:18px;-moz-border-radius:3px;-khtml-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;}");
	GM_addStyle("#live_pass_link {background:#CCFFCC url("+live_pass_png+") no-repeat scroll 100% 50%;padding-right:34px;-moz-border-radius:3px;-khtml-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;}");
	GM_addStyle("#live_preview_link {background:#CCFFCC url("+live_preview_png+") no-repeat scroll 100% 50%;padding-right:34px;-moz-border-radius:3px;-khtml-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;}");
	GM_addStyle("#live_link:hover,#live_pass_link:hover,#live_folder_link:hover,#live_authorize_link:hover,#live_preview_png:hover {background-color:#99FF99;}");
	GM_addStyle("#dead_link {background:#FFDFE0 url("+dead_png+") no-repeat scroll 100% 50%;padding-right:18px;-moz-border-radius:3px;-khtml-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;}");
	GM_addStyle("#dead_link:hover {background-color:#FFC4C5;}");

//##################################################
//# Auto add referrer and ##########################
//# Get Direct link to mediafire link ##############
//##################################################
var thisLink;

var	referrer = "http://anonymz.com/?"; //http://anonym.to/?
var	onsite = "vn-zoom.com";

linkify();
var allLinks = document.evaluate(
	'//a['+
		'starts-with(@href, "http://mediafire.com/") '+
		'or starts-with(@href, "http://www.mediafire.com/") '+
		'or starts-with(@href, "http://anonymz.com/?http://mediafire.com/") '+
		'or starts-with(@href, "http://anonymz.com/?http://www.mediafire.com/") '+
	']',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (i = 0; i < allLinks.snapshotLength; i++){
		thisLink = allLinks.snapshotItem(i);
		makeDirect(thisLink);
}

function makeDirect(a)
{
	url = a.getAttribute("href");
	url = url.replace(/http\:\/\/anonymz.com\/\?/ig,"");
	a.setAttribute("target", "");
	if(onsite.indexOf(thisDomain)>-1)
		a.setAttribute("onclick", "window.open('" + referrer + url + "','_blank');return false;");
	else
		a.setAttribute("onclick", "window.open('" + url + "','_blank');return false;");
	
	GM_xmlhttpRequest({
        	method: 'GET',
                url: url,
                headers: {
                	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                        'Accept': 'application/atom+xml,application/xml,text/xml',
                        'Referrer' : "http://mediafire.com/"
                },
                onload: function(res) {
                	var txt = res.responseText;
                	var dlink = txt.match(/http:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\/.+/gi) + '';
                	
					if(dlink != 'null'){
                		dlink = dlink.replace(/\";/gi, '');
                		a.setAttribute("id", "live_link");
                		//a.setAttribute("href", dlink);
                		//a.innerHTML = dlink;
						//a.setAttribute("onclick", "document.location.href('" + dlink + "');return false;");
					}else if(txt.indexOf("Authorize Download") > -1 || txt.indexOf("Enter the two words then click the authorize button to download.") > -1){
                		a.setAttribute("id", "live_authorize_link");	
                	}else if(txt.indexOf("Unlock File") > -1 && txt.indexOf("Enter Password") > -1 && txt.indexOf("filePreview") == -1){
						a.setAttribute("id", "live_pass_link");
                	}else if(txt.indexOf("filePreview") > -1){
						a.setAttribute("id", "live_preview_link");
                	}else if(txt.indexOf("Folders") > -1 && txt.indexOf("Sort:") > -1 && txt.indexOf("Password Protect") > -1 && txt.indexOf("homeBackground") == -1){
                		a.setAttribute("id", "live_folder_link");	
                	}else if(txt.indexOf("File Removed for Violation.") > -1 || txt.indexOf("Invalid or Deleted File") > -1 || txt.indexOf("File Blocked for Violation.") > -1){
						a.setAttribute("id", "dead_link");
                		a.setAttribute("title", "Link Dead!");
                		a.setAttribute("style", "color:#9F0000;text-decoration:line-through;");
						a.setAttribute("onclick", "alert('Link Dead!');return false;");
                	}
                }
        });
	
}
function linkify()
{ 
        try
        {
        	var regex = /http:\/\/[www\.]{0,}mediafire\.com\/[download\.php]{0,}\?\w+/gi
              	var altText, tekst, muligtLink;
              	//This array contains the html tags to ignore when evaluating the function
              	var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'textarea'];
              	var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") +")]";
              	altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
              	for(var i=0;i<altText.snapshotLength;i++)
              	{
              		tekst = altText.snapshotItem(i);
              		muligtLink = tekst.nodeValue;
              		if(regex.test(muligtLink))
              		{
              			var span = document.createElement('span');		
              			var lastLastIndex = 0;
              			regex.lastIndex = 0;
              			for(myArray = null; myArray = regex.exec(muligtLink); )
              			{
              				var link = myArray[0];
              				span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index))); 		
              				var href = link;
              				var prefix = '';
              				if(href.length > 7)
              				{
              					prefix = href.substring(0,7);
              				}
              				if(prefix.toLowerCase() != 'http://')
              				{
              					href = 'http://' + href;
              				}
              				var a = document.createElement('a');
              				a.setAttribute('href', href);
              				a.appendChild(document.createTextNode(link));
              				span.appendChild(a);
              				//links.push(a);			
              				lastLastIndex = regex.lastIndex;
              			}
              			span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex))); 
              			tekst.parentNode.replaceChild(span, tekst);
              		}	
      		}
        } 
        catch(e)
        {
        }

}


//################################
//# No Adf link ##################
//################################
function remove_adfly()
{
	element = document.getElementsByTagName("a");
	for(var i = 0; i < element.length; i++)
	{
		if(element[i].href.match("http://adf.ly/(.*)/"))
		{
			element[i].href = element[i].href.substr(element[i].href.lastIndexOf("http://"));
		}
	}
}
remove_adfly();

})();