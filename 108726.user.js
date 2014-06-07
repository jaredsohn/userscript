// ==UserScript==
// @name           My Personal Spinchat - Home
// @namespace      http://spin.jpr0g.info/
// @description    Erlaubt das Anpassen und Designen der spinchat.com Home-Seite
// @include        http://*.spinchat.com/home*
// @include        http://*.spinchat.com/home
// ==/UserScript==
//
//By C.Bachmann - verändert von Pat Mindless
//Vers. 0.110 - 1
//Last-Update: 2011-03-09 - 2011-05-21

//Define vars
//var version left to 107 cause of compatibility
var version = "0.107";

var auth = "user";

function MPS_LIBARY() {
		
	this.SCRIPT = "Home";
	this.VERSION = "0.110";	
	
	this.init = function() {		
		this.URL = window.location.pathname;
		var pattern = /[\?|&]{1}([a-z0-9]+)=?([^=&?]*)/gi;
		this.URL_PARAMETER = new Array();
		var tmp;
		while(tmp = pattern.exec(window.location.search)) {
			this.URL_PARAMETER[tmp[1]] = tmp[2];
		}
		this.checkUpdate();
	}
	
	this.isParameter = function(param) {
		if(!this.URL_PARAMETER)
			return false;
		for(var name in this.URL_PARAMETER) {
			if(name == param)
				return true;
		}
		return false;
	}
	
	this.getParameter = function(name) {
		return this.URL_PARAMETER[name];
	}

	this.isPage = function(page) {
		return this.URL.substr(0,page.length) == page;
	}
	
	this.getUserInfo = function(name,f) {
		unsafeWindow.top.$.get("/api/userinfo",{hexlogin:name.hexencode(),'utf8':1},function(json){f(json);},"json");
	}
	
	this.checkUpdate = function() {
		if(!unsafeWindow.top['MPS_UPDATE_'+this.SCRIPT]) {
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://spin.jpr0g.info/server/check_update.php",
				data: "s="+this.SCRIPT+"&v="+this.VERSION,
				headers: {
					"User-Agent": "MyPersonalSPiN",
					"Accept": "text/plain",
					"Connection": "close",
					'Content-type': 'application/x-www-form-urlencoded'
				},
				onload: function(response) {
					if(response.responseText == "1") {
						unsafeWindow.top['MPS_UPDATE_'+MPS.SCRIPT] = true;
						var wrapper = document.createElement("div");
						wrapper.setAttribute("style","font-size: 10px; position: absolute; top: 0; border-bottom: 1px solid #000; left: 0; width: 100%; background: #ffffe1; z-index: 100; padding: 5px;");
						wrapper.setAttribute("id","mps_update_"+MPS.SCRIPT);
						var text = document.createElement("div");
						text.setAttribute("style","width: 70%; float: left; padding: 2px;");
						text.innerHTML = "Es ist ein Update für MyPersonalSpin :: "+MPS.SCRIPT+" verfügbar!"
						wrapper.appendChild(text);
						var buttons = document.createElement("div");
						buttons.setAttribute("style","width: 25%; float: left; text-align: right;");
						var update = document.createElement("button");
						update.innerHTML = "Update installieren";
						update.addEventListener("click",function() {GM_openInTab('http://spin.jpr0g.info/userscripts/'+MPS.SCRIPT+'/mypersonalspin__'+MPS.SCRIPT.toLowerCase()+'.user.js');this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);},true);
						var website = document.createElement("button");
						website.innerHTML = "zur Website";
						website.addEventListener("click",function() {GM_openInTab('http://spin.jpr0g.info/mps_'+MPS.SCRIPT.toLowerCase()+'.php');this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);},true);
						var close = document.createElement("button");
						close.innerHTML = "ausblenden";
						close.addEventListener("click",function() {this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);},true);
						buttons.appendChild(update);
						buttons.appendChild(website);
						buttons.appendChild(close);
						wrapper.appendChild(buttons);
						var body = unsafeWindow.top.document.getElementsByTagName("body")[0];
						body.appendChild(wrapper);
					}
				} 
			});
		}
	}
	
	this.safeWrap = function(f) {
		return function() {
			setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
		};
	}
}
var MPS = new MPS_LIBARY();
MPS.init();

var userbox, roomsbox, googlebox, notebox, friendbox, messagebox, linksbox, announcementbox, suggestionbox;

var crow = new Array();
var row = null;

var content = null;
var divs = null;

var topdiv;
var cleardiv;

var icselect;

var cboxes = Array();

if (!GM_setValue) {
	alert('Please upgrade to the latest version of Greasemonkey to store config.');
	return;
}

//Define grafics
var cbuttonGIF = ''+
'R0lGODlhyAAoAMQAAP//9/7/3f7/3/399v7/4/z96vz95fz89vHy3+7v2+vr6+Xl5ePj4+Li4t/f'+
'397e3t3d3d3d29LS0sTExL29vbu7u6ysrKampqWlpf///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEH'+
'ABkALAAAAADIACgAAAX/YJYVQWmeaKqubOu+cCzPdG2bhKgLd+//wKBwmBroFMSkcslsvgAKEcNJ'+
'rVqvMgBD5MB6v+AmwMENm89o2lj0SLvf8ADgIYLE73gsAFLP+/9Ke32AhIU3ghl2houMLoiKjZGS'+
'cnyJk5eMj5ibhJqcn3ieoKNuoqSnYaaoq1eqrK9ilZCwtEuutbhAt7m8Nru9wDG/wcQsw8XIJ8fJ'+
'ycvMxc7PwdHSvdTVudfYtdrbsI883s8HlQ4I4swEDWQZDBMJ4ejABhETWxkKEhUWFxj+/wADChxI'+
'sKDBgwgTKlzIsKHDhhcsVJAQRcQCCRMoVNjIsaPHjyBDihxJsqTJkyhTRapcqZLCBAkLdIhQwMAB'+
'hJs4c+rcybOnz59AgwodSrSo0aNGHTCoKLOp06dQo0qdSrWq1atYs2rdyrWr169gw4odSzZDCAA7';

var cFormGIF = ''+
'R0lGODlhXgHCAeYAAP////f39+34/vb29vX19fT09Or2/fPz8/Ly8vHx8eb0/O/v7+Lx+u7u7uDw'+
'+uzs7N/v+evr69zt99vu+erq6unp6ejo6Ofn5+bm5tjq9eXl5dXn8+Li4tjl7tLl8eHh4dXj7ODg'+
'4NLi7M/j8N/f39Hh68/f6svg7dvb28zd6NnZ2cjd69fX18Xb6cja5dTU1MHY5sXY5NPT08PW49LS'+
'0sLV4b/V5MDT4L3S37vT4rnS4M3NzczMzMrKysfHx8DJz7HJ2cXFxcTExKzH2KLJ4cLCwsHBwcDA'+
'wL+/v5/F3bW+xLy8vLu7u7m5ubW1ta+vr6urq6mpqaOjo56enp2dnZiYmJeXl5KSkoyMjG6LnoaG'+
'hmqImoGBgYCAgG+EkXp6enR6fnh4eG11eWx0eWhoaGJpblRXWVNWWFFUVlBUV1BUVk9TVk9TVVBT'+
'VTMzMwszPP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5'+
'BAEHAHAALAAAAABeAcIBAAf/gHCCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmagwednp+goaKjpKWm'+
'p6ipqqusra6vsLGys7Sthg0HAwG7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLHAwcNhBELutPc3d7f'+
'4OHi4+TkAwsRgyTb5e3u7/Dx8vPSAySCETL0+/z9/v/0iPzgQbCgQYI/iPySkQ5DD4AQI0qcSBFY'+
'kiETBGjcyFHjhCFJfPXAAIeDkIooU6pcGU6JAwMwY8qU6UCJLyEc4HwowrKnz59AgTFRQLSo0aMK'+
'mPgq8gFOCCNBo0qdGtEJg6tXO2BloHWrE19GQjiFSrWs2bPknkBYCwGMGRBr/0GYAcMWwhOwYp+i'+
'ffOmJ9++aAODiyKhsIgzbs6UKIH4jIjCEqLgHWsMMC/Lv/7yhbd519/LmgN0Ft0LM7HPyTaPFsw6'+
'mpQMsDOYQIwGTWITsTNImay32OjVvjoDHyccsPHjwS2bFiY89fLW0JtR2UCdego1btyoSVGdOhXe'+
'ZE+rLu65L/nQos2rL87+N2rypY+7N34MOHrN8lGn1x+9f7AqHgQYoAttZNeGCwIGWAV4laXn4IPj'+
'lXcefphNWF5yD+4HmoTKObgcfxlCqN6FHiIXon8o8nLFCCyOEEMabrDBhhtpxNDiCFcw6FuJoLW3'+
'3mfzRcijiECa5mOG8tVXIf9y8AkJX4pQBoDFCVTWAGMaM8xwZQ1UnoCFjqfF16OJJG6IoYVDOkni'+
'ar+Z6Rt9aMZJZpQoarHCnSuMscYNd96wxhh4rqAFmMMsKWaZHI7I4Zhr5qeohoi2eRky+t1nopD7'+
'DUcndF204KmnOHzaQqiidkFoM5puyk2qqgb2BQywxirrrDB8ceoyrLbqDHq6RieGDjYEK+yww+og'+
'xq29JqtsO1l4AUQO0EYrLbRAeJEFsstmq203W5RBxrfghvttGVv8EhZl26arbj/n9rbuu/C20254'+
'8dZrLzfz3qvvvs7ky++/ABPjb8AEFxzAwAYnvC/CvQxAgMIQb0oAO8gOUED/AgBkrPHGHHfs8ccg'+
'hyzyyCSXbPLJKKes8sost+zyyzAnUADFvDC8CwEJUADzzjz37PPPQAct9NA/U5DAw+bmRS8vBTzw'+
'AdFQRy311FRXbTXKHzxQADA2B3BABShcLfbYZJdt9tkao1DBAVwrDQwCF7CA9tx012333SGzcAEC'+
'baPrSwIavID34IQXbjjRL2iQQN/u9gK44IdHLvnklIOc+OJJ++144JV37vnnd1/O+NK7PA766ain'+
'PrXomTfOi+mqxy777C2zjizstOeu++4c295L17jzLvzwqftes9u/BE/88sxLbvwuwHPe/PTUD/78'+
'wcj/LX313Hdf9vXRQ+79//jkSw1+9puLX/767Pd8vuavb9/+/PSr/L7rpctf//78W6746MBQXv8G'+
'OMD7kS4AAiSgAulnwADqb4EQZF8Dk/fACFrQexPUnvouyEHuZTB9HQyhB//XugMmUIQo3N0H47fB'+
'FLowdyvMXwtfSEPVxRCBFayhDj93wxPu8IeT62EOgUhEwwlxhkVMovVIeLshKvGJczsiFKeINylS'+
'8YpRZOLv0MdCLHrRbFb8ohitFsYxmjFqZTyjGoOWxjW6kWdtfKMca6fF48FPhnPM48viqMc+koyP'+
'fgzkxwApyEJqjJCGLCQiExnIRTKyj458ZB4jKUk5UrKSbrwkJtWoyU2asf+TnhQjKEPpxVGS8oqm'+
'POUUU6nKJ7KylUl8JSyJKMtZ/rCWttQhLnNJw13y0oW+/CUKgynMEBKzmBw8JjItqMxlQrCZzlQg'+
'NKNZwDpCj4t4pOYXp6nN/XGzmwy0JvbuiEMkgrOI3zynBMUZPnVSMZ3uJB8844lBdmKznPR0pT3J'+
'6cN89nKf+MOnP9EJUBM6caApnCdCm6fQhS6voQ4dHkQjyruJUlR3Fr0o7TKqUdlxtKM2LKgDzQnS'+
'CH60pKc7KUp5KFIKknSlBFQpTCsn05kGsaUatGkycQpCnTKTp130qUmBmk2hLrCmRiUcUpNaRaIK'+
'lKnVxFwTXwrV8i21qnT/uypW0abVrYLRqf30aj2lukV+HlSsIySrHQMaVrRWr6tuvRpc41q1udJ1'+
'dWA9610fmleq7pV4dv0r4voq2PEFtrBsJCxi0wpAly6WsSUc6WPfqtjJMrSyluWrWq9pVr9mNnaH'+
'/eweMSvaipK2tBg9LWo3qtrVerS1rg3pZsfJVr3G1nOhve3JcqvbkvG2tyP7LXBDJtzhDhK2xqUp'+
'cpN709m2k7moKy50D7nc6RqxutZVKnaz21Tn3rOt3O1uY3MaXuV6t7PlNe94e5pe5223vVx9L3y/'+
'et7aena+9F1vUPFbOOla17/TBTB0BcxcAifXwMZF8HAVDFwG99bBuoXw/20lHFsKu9bCq8UwajVc'+
'Wg6L1sOfBXFmRWxZEk/WxI9F8WJVjFgWF9bFgoXxX2W8Vxrf1cZ0xXFcdexWHqPVx2IFsleFvFUi'+
'Y9XIVUUyVJXMVCYn1clGhbJQpexTKuvUyjbF8ky1DFMur9TLKAVzScUMUjJ31MwaRfNF1UxRNkfU'+
'zQ6F80LljFA6D9TO/sRzPvVMTz7H08/uBLQ6BX1OQoPT0N1EtDYVTU1GR9PRzoT0MiWNTEoX09LC'+
'xPQvNc1LTufS07YE9SxFDUtSt9LUqkT1KVVNSlaH0tWehPUmZY1JWlfS1pLE9SN1zUheJ9LXhgS2'+
'IuXLX7EJW5DHbiSxi/9NxmUzm2rJ9mO0IensZ5uv2taG2rT1uO1JYjvbQ+v2HMVtyW+DO7H1Neh9'+
'z33tdEuW3Vl0t2PhHV95k5fe+Y3svPH9PXPzG2bkfmPAM+nvf7ts4GtEOCcLbnCWKfyMD/8kwxtu'+
'v4lTHGURH2PGRWnxi5ts49vsuMf/KPKRiwzkpSy5yf1nb/auXNsqf3nHUI5FmqMy5jLfmM3fifOc'+
'Z2znq+y5z4EORaLrs+X79Tm69VtUpQPN6EqEeiyFnnOpExTpTXe6z6xOS6rLnOtABPstvf5yse/Q'+
'7Lok+8rRXkO2/xPrT9X61tVucre/0O7ApPvI8Z5QvXuc78P0+8UBL0L/whtT8BQ3fAcVv1O4g1fu'+
'KWP8BSX/U8fbFvK7RXzDKT9Uy68b8yT3POjdp3mDc/6Zpf/36Y+aen6vXpqtx/frYxp7es8+qkyP'+
'++gPXnt4375/v+df8L3Ze3YPv37HD6fodw/w4p87+fODfvukv87lM5/31r++w50Pbuqvz/tW5X62'+
'wS9P8Vub/IY1/7PRP9bcP177LHf/5eHvMfZ3z/6QnSr9t5/9/We+//7nW+rHbPhHWQAYgME1gMVW'+
'gNTDgNPjgJd1gAhIXArIXxDIPBeoWfL3eQiYgYBVgfjlgRIFgvMlgsJjgqYlgRN4XCq4gjNHgvCF'+
'girkVHAjNy5IMnrD/zf65gtfgwI+0ARPAAVCOIREWIRGeIRImIRKuIRM2IRO+IRQGIVSOIVUWIVW'+
'eIVYOIVP0AQ+oDZss4O90DQfQAM+cARLcIZomIZquIZs2IZu+IZwGIdyOId0WId2eId4mId6uId8'+
'2Id4eAQ+QANZszVgyAs4QwEfgAIs8AKM2IiO+IiQGImSOImUWImWeImYmImauImc2Ime+ImgGIqi'+
'2IksgAIfYDRIUzEX8wAVcAEa8IqwGIuyOIu0WIu2eIu4mIu6uIu82Iu++IvAGIzCOIzEWIzAeAEV'+
'8AAyQzOcFVAB4DAFcAAIkADUWI3WeI3YmI3auI3c2I3e+I3gGI7iOP+O5FiO5niO6JiO6liOCHAA'+
'BTAxwdA1ETOP2iKP9HiPvWKP+LiPdKKP/PiP/nEuHBAEAFmQmxIEOYEBOwAFV8AFYfCQEBmREjmR'+
'FFmRFnmRGJmRGrmRHNmRHvmRIBmSIjmSJFmSJrmRXHAFULADJPEAKoAEUDAFVjCTNFmTNnmTOJmT'+
'OrmTPNmTPvmTQBmUQjmURFmURnmUSJmUSvmTUwAFSKACDyAIFqACOxAERnCVWJmVWrmVXNmVXvmV'+
'YBmWYjmWZFmWZnmWaJmWarmWbNmWbjmWQbADKmABhPAAGMABIZCXermXfNmXfvmXgBmYgjmYhFmY'+
'hnmYiJmYirmYjNkemI75mJBZmByAAVG5CZZ5mZiZmZq5mZzZmZ7pmYEAADs=';

var cSaveButton = ''+
'R0lGODlhZAAZANUAAP////7+/v39/fz8/Pv7+/v8/Pn5+fj4+Pf39/X19fT09PLy8vHy8vHx8e/v'+
'7+7u7u3t7ezs7Ovr6+Tk5ePj4+Pk5eLi4uLj4+Hi4s3P0MfJy7e6vLa5u7KztLGysqqtr6aoqqGk'+
'pp2gopmcnZWYmZeYmZGTlZGTk42PkYiLjISHiICDhHx/gHh6e3R2d3Byc2xub21ub19hYgszPP//'+
'/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHADQALAAAAABkABkAAAb/QJpw'+
'SCwaj8ikcslsNhkZjnRKrVqv2Kx2y81mGMjGplIAmM/otHrNbrvf8HWhsmkcNZiAfs/v+/+AgYKD'+
'hIMYGkcfBgKMjY6PkJGSk5SVlpUGH0cgA52en6ChoqOkpaanqCBHIQStrq+wsbKztLW2t7ghRyIG'+
'vb6/wMHCw8S+MzPFycrDIkcjB9DR0tPTxzPU2NDH2dvZ3t/g0CNHJAjm5+jp6MfmM+rv8Ofs8fT1'+
'9CRHJgn7/P3+/ccAWpvBb2CCgPsMDiSY0NpBggsR/pvoz8QRFAoyatzIkaO1jMdAzlAQkuRHkxtL'+
'hlQZkWXHlx1RHEmxoKbNmzhzLji2c0ZN654tffa8yXNoUJtFi+pcWjPFERUNokqdSnXqjKjHGmTV'+
'enUr1qtcrYLN6jXs17NV01JVcWSF2rdSrX2VO3dgXLlb80a8ixZu2hVHWDgYTLiw4cOFjyFezLix'+
'48eIWRxpAfmx4sqYM2t20OKIiwegQ4seTbq06dOoU6te7eLICwiwY8ueTbu27du4c+ve/eIIjAkR'+
'ggsfTry48ePIkytfrnwCjCMlOjCfTr269ekdShy5EMMDBQngw4sfT768+fPo06svT8FDjAtILJyQ'+
'Qb++/fv48+vfz7+///0nWODEgAQWaOCBCCao4IIIBgEAOw==';


//Define objects
//Used to print an element (see configuration) - defines width, height and colors for background and border
function Box(name) {
	this.name = name;
 	elem = document.createElement('div');
	this.elem = elem;
	this.height = 0;
	this.heightunit = "";
	this.width = 0;
	this.widthunit = "";
	this.style = "";
	this.color = "";
	this.size = 0;
	this.sizeunit = "";
	this.bgc = "";
	this.bgf = "";
	this.bdc = "";
	this.bds = "";
	this.bdw = 0;
	this.bdwu = "";
	this.bgr = "";
	this.bgph = "";
	this.bgpv = "";
}
//Used like Box but for two elements, so you can set them together in one cell
function ComboBox(elems) {
	var w;
	this.elem = document.createElement("div");
	for (var i = 0; i < elems.length; i++) {
	if(elems[i].elem != null) {
		this.elem.appendChild(elems[i].elem);
		var patPadding = /padding/i;
		var patMargin = /margin/i;
		var add = 2*elems[i].bdw;
		if(patMargin.test(elems[i].style) || patPadding.test(elems[i].style)) {
			var s = elems[i].style.split(";");
			for(var j=0;j<s.length;j++) {
			        var fak = 0;
			        if(s[j][0] == " ")
			                s[j] = s[j].substr(1);
				if(s[j].substring(0,11).toLowerCase() == "margin-left" || s[j].substring(0,11).toLowerCase() == "margin-right")
				        fak = 1;
				else if(s[j].substring(0,6).toLowerCase() == "margin" && (s[j].substring(0,13).toLowerCase() != "margin-bottom" || s[j].substring(0,10).toLowerCase() != "margin-top"))
					fak = 2;
                                if(s[j].substring(0,12).toLowerCase() == "padding-left" || s[j].substring(0,12).toLowerCase() == "padding-right")
				        fak = 1;
				else if(s[j].substring(0,7).toLowerCase() == "padding" && (s[j].substring(0,14).toLowerCase() != "padding-bottom" || s[j].substring(0,11).toLowerCase() != "padding-top"))
					fak = 2;
				if(fak > 0) {
					var p = s[j].split(" ");
					p[1] = p[1].replace(/px/i,"");
					p[1] = p[1].replace(/\s/i,"");
					p[1] = p[1].replace(/em/i,"");
					p[1] = p[1].replace(/%/i,"");
					add += fak*p[1];
				} else if(s[j] != "") {
                                        alert("failed margin "+s[j]);
				}
			}
		}
		if(elems[i].widthunit == elems[i].bdwu) {
            if(w == null || w < (1*elems[i].width + add)) {
			  	w = 1*elems[i].width + add;
				this.widthunit = elems[i].widthunit;
			}
		}
		}
	}
	this.elem.setAttribute("class","ps_cb_"+cboxes.length);
	this.width = w;
	this.height = "";
	cboxes.push(this);
}

//Declare support functions
function setStyleClasses() {
	for(i = 0; i < boxes.length;i++) {
			if(boxes[i].elem != null)
		        boxes[i].elem.setAttribute("class","ps_"+boxes[i].name);
	}
}
function hex2dec(hex) {
	var c = Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
	var r = 0;
	for(var i=0;i<hex.length;i++) {
		for(j=0;j<c.length;j++)
		        if(c[j] == hex[hex.length-1-i].toUpperCase()) {
		                r += j * Math.pow(16,i);
			}
	}
	return r;
}

function isBox(box) {
	ret = null;
	for(var i=0;i<boxes.length;i++) {
	        if(box.toLowerCase() == boxes[i].name) {
			ret = boxes[i];
			break;
		}
	}
	return ret;
}

function getConfigs() {
        GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://spin.jpr0g.info/server/list_configs.php',
		headers: {
			'User-agent': 'MyPersonalSpin Vers. '+version,
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Content-type': 'application/x-www-form-urlencoded',
		},
		data: 'auth='+auth,
		onload: function(responseDetails) {
		        if(responseDetails.status == "200") {
		                var configs = eval('('+responseDetails.responseText+')');
				for(var i = 0; i < configs.files.length; i++) {
				        var icoption = document.createElement("option");
				        icoption.setAttribute("value",configs.files[i].name);
				        icoption.innerHTML = configs.files[i].name;
				        icselect.appendChild(icoption);
				}
			} else {
			        alert("Status: "+responseDetails.status+" "+responseDetails.statusText + '\n\n' +
				'Feed data:\n' + responseDetails.responseText);
				return null;
			}
		}
	});
}

//Define boxes

userbox         = new Box("userbox");
googlebox       = new Box("googlebox");
friendbox       = new Box("friendbox");
roomsbox        = new Box("roomsbox");
linksbox        = new Box("linksbox");
newsbox         = new Box("newsbox");
announcementbox = new Box("announcementbox");
socialstreambox = new Box("messagebox");
notebox         = new Box("notebox");
suggestionbox	= new Box("suggestionbox");

var boxes = Array(userbox,googlebox,friendbox,roomsbox,linksbox,announcementbox,socialstreambox,notebox,suggestionbox);

//Read home content
userbox.elem = document.getElementById("personalareabox");
socialstreambox.elem = document.getElementById("streambox");
friendbox.elem = document.getElementById("friendsbox");
linksbox.elem = document.getElementById("linkbox");
googlebox.elem = document.getElementById("googlesearchbox");
roomsbox.elem = document.getElementById("roombox");
newsbox.elem = document.getElementById("newsbox");
suggestionbox.elem = document.getElementById("suggestionbox");

content = document.getElementById("content");
divs = content.getElementsByTagName("div");
var allDivs, allElements ;
allDivs = document.evaluate("//div[starts-with(@id,'tab-')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<allDivs.snapshotLength;i++) {
	var curdiv = allDivs.snapshotItem(i);
	curdiv.setAttribute("class","");
}

if(document.getElementById("request-list") != null)
	announcementbox.elem = document.getElementById("request-list");
else if(document.getElementById("news-on-spin") != null)
	announcementbox.elem = document.getElementById("news-on-spin");

notebox.elem = document.getElementById("promobox");
var n = 0;
while((notebox.elem.childNodes[n] != null && notebox.elem.childNodes[n].nodeName == "DIV") || (notebox.elem.childNodes[n + 1] != null && notebox.elem.childNodes[n+1].nodeName == "DIV")) {
	if(notebox.elem.childNodes[n + 1] != null && notebox.elem.childNodes[n+1].nodeName == "DIV")
		n++;
	notebox.elem = notebox.elem.childNodes[n];
}
setStyleClasses();

//Define Config-Button
var cbuttonContent = 'My Personal <span style="color: #278FDE;">SPiN</span><br />konfigurieren';
var cbuttonStyleHide = 'position: absolute; top: 5px; right: 5px; height: 20px; width: 20px; margin: 0; padding: 4px; cursor: pointer; font-size: 10px; line-height: 12px;';
var cbuttonStyleShow = cbuttonStyleHide+'height: 30px; width: 192px; color: #000000; background-image: url("data:image/gif;base64,'+cbuttonGIF+'");';

//Define Config-ToolTip
function createConfigToolTip() {
	var tooltip = document.createElement("div");
	tooltip.setAttribute("id","tooltip");
	tooltip.setAttribute("class","ps_tooltip");
	tooltip.innerHTML = "hbn";
	tooltip.addEventListener("click",hideToolTip,true);
	tooltip.setAttribute("style","cursor: default; position: absolute; top: -100; left: -100;");
	document.getElementsByTagName("body")[0].appendChild(tooltip);
}

createConfigToolTip();

function showToolTip(e) {
        var tt = document.getElementById("tooltip");
        tt.style.left = e.pageX + 5 + "px";;
	tt.style.top = e.pageY + 5 + "px";
	tt.style.display = 'block;';
	tt.style.width = '250px;';
}

function setToolTip(tip) {
	var tt = document.getElementById("tooltip");
	tt.innerHTML = tip;
}

function hideToolTip() {
        var tt = document.getElementById("tooltip");
        tt.style.display = 'none;';
	tt.innerHTML = '';
	tt.style.left = '-100px;';
	tt.style.top = '-100px;';
}

//Define Config-Form
var top = window.innerHeight/2 - 225;
if(top < 0) top = 5;
var left = window.innerWidth/2 - 175;
if(left < 0) left = 5;

addGlobalStyle(''+
'.cContent input {font-weight: normal;}'+
'');

function copy2all(e) {
	var box = isBox(e);
	for(var i = 0; i < boxes.length; i++) {
	        if(boxes[i].name != box.name) {
	        	document.getElementById(boxes[i].name+"color").value = document.getElementById(box.name+"color").value;
	        	document.getElementById(boxes[i].name+"size").value = document.getElementById(box.name+"size").value;
	        	document.getElementById(boxes[i].name+"sizeunit").value = document.getElementById(box.name+"sizeunit").value;
	        	document.getElementById(boxes[i].name+"style").value = document.getElementById(box.name+"style").value;
	        	document.getElementById(boxes[i].name+"borderw").value = document.getElementById(box.name+"borderw").value;
	        	document.getElementById(boxes[i].name+"borderwunit").value = document.getElementById(box.name+"borderwunit").value;
	        	document.getElementById(boxes[i].name+"borderstyle").value = document.getElementById(box.name+"borderstyle").value;
	        	document.getElementById(boxes[i].name+"bordercolor").value = document.getElementById(box.name+"bordercolor").value;
	        	document.getElementById(boxes[i].name+"bgc").value = document.getElementById(box.name+"bgc").value;
	        	document.getElementById(boxes[i].name+"bgf").value = document.getElementById(box.name+"bgf").value;
	        	document.getElementById(boxes[i].name+"bgr").value = document.getElementById(box.name+"bgr").value;
	        	document.getElementById(boxes[i].name+"bgph").value = document.getElementById(box.name+"bgph").value;
	        	document.getElementById(boxes[i].name+"bgpv").value = document.getElementById(box.name+"bgpv").value;
		}
	}
}

function addFieldset(ttitle,prefix,c,s,st,bd,bg,h,w) {
	var fs = document.createElement("fieldset");
	fs.setAttribute("style","color: #000000");
	var title = document.createElement("span");
	title.setAttribute("style","color: #278FDE;font-size: 15px; font-weight: normal; text-align: left; maring: 0; padding: 0; cursor: help;");
	title.appendChild(document.createTextNode(ttitle));
	title.addEventListener('mousedown',function () {setToolTip(ttitle);},true);
	title.addEventListener('mouseup',showToolTip,true);
	fs.appendChild(title);
	if(ttitle.substring(ttitle.length-3,ttitle.length) == "box") {
	        fs.appendChild(document.createTextNode(" "));
		var button = document.createElement("input");
		button.setAttribute("type","button");
		button.setAttribute("value","copy2all");
		button.addEventListener('click',function() {if(confirm("Willst du wirklich die anderen Styles überschreiben?")) {copy2all(prefix);}},true);
		fs.appendChild(button);
 	}
	fs.appendChild(document.createElement("br"));
	if(c == true) {
		var clabel = document.createElement("label");
		clabel.setAttribute("for",prefix+"color");
		var ctext = document.createTextNode("Farbe: #");
		clabel.appendChild(ctext);
		clabel.addEventListener('mousedown',function () {setToolTip("Hier kannst du die Text-Farbe als Hex-Wert angeben.");},true);
		clabel.addEventListener('mouseup',showToolTip,true);
		clabel.setAttribute("style","cursor: help; color: #000000;");
		fs.appendChild(clabel);
		var cinput = document.createElement("input");
		cinput.setAttribute("type","text");
		cinput.setAttribute("name",prefix+"color");
		cinput.setAttribute("id",prefix+"color");
		cinput.setAttribute("size","7");
		cinput.setAttribute("value","#000000");
		cinput.setAttribute("style","font-weight: normal");
		cinput.addEventListener('change',function() {document.getElementById(prefix+"color").style.backgroundColor=document.getElementById(prefix+"color").value;},true);
		fs.appendChild(cinput);
	}
	if(s == true) {
		var slabel = document.createElement("label");
		slabel.setAttribute("for",prefix+"size");
		var stext = document.createTextNode(" Größe:  ");
		slabel.appendChild(stext);
		slabel.addEventListener('mousedown',function () {setToolTip("Hier kannst du die Schriftgröße in einer beliebigen Einheit angeben.");},true);
		slabel.addEventListener('mouseup',showToolTip,true);
		slabel.setAttribute("style","cursor: help; color: #000000;");
		fs.appendChild(slabel);
		var sinput = document.createElement("input");
		sinput.setAttribute("type","text");
		sinput.setAttribute("name",prefix+"size");
		sinput.setAttribute("id",prefix+"size");
		sinput.setAttribute("size","1");
		sinput.setAttribute("value","");
		sinput.setAttribute("style","font-weight: normal");
		fs.appendChild(sinput);
		fs.appendChild(document.createTextNode(' '));
		var sselect = document.createElement("select");
		sselect.setAttribute('id',prefix+'sizeunit');
		var soptionpx = document.createElement("option");
		soptionpx.setAttribute('value','px');
		soptionpx.setAttribute('selected','selected');
		var soptionpxt = document.createTextNode("px");
		soptionpx.appendChild(soptionpxt);
		var soptionem = document.createElement("option");
		soptionem.setAttribute('value','em');
		var soptionemt = document.createTextNode("em");
		soptionem.appendChild(soptionemt);
		var soptionpz = document.createElement("option");
		soptionpz.setAttribute('value','%');
		var soptionpzt = document.createTextNode("%");
		soptionpz.appendChild(soptionpzt);
		sselect.appendChild(soptionpx);
		sselect.appendChild(soptionem);
		sselect.appendChild(soptionpz);
		fs.appendChild(sselect);
		fs.appendChild(document.createElement("br"));
	}
	if(h == true) {
		var hlabel = document.createElement("label");
		hlabel.setAttribute("for",prefix+"color");
		var htext = document.createTextNode("Höhe: ");
		hlabel.appendChild(htext);
		hlabel.addEventListener('mousedown',function () {setToolTip("Hier kannst du die Höhe der Box angeben. Ist die Box gr&ouml;&szlig;er erscheinen automatisch Scrollbalken.");},true);
		hlabel.addEventListener('mouseup',showToolTip,true);
		hlabel.setAttribute("style","cursor: help; color: #000000;");
		fs.appendChild(hlabel);
		var hinput = document.createElement("input");
		hinput.setAttribute("type","text");
		hinput.setAttribute("name",prefix+"height");
		hinput.setAttribute("id",prefix+"height");
		hinput.setAttribute("size","3");
		hinput.setAttribute("value","");
		hinput.setAttribute("style","font-weight: normal");
		fs.appendChild(hinput);
		fs.appendChild(document.createTextNode(' '));
		var hselect = document.createElement("select");
		hselect.setAttribute('id',prefix+'heightunit');
		var hoptionpx = document.createElement("option");
		hoptionpx.setAttribute('value','px');
		hoptionpx.setAttribute('selected','selected');
		var hoptionpxt = document.createTextNode("px");
		hoptionpx.appendChild(hoptionpxt);
		var hoptionem = document.createElement("option");
		hoptionem.setAttribute('value','em');
		var hoptionemt = document.createTextNode("em");
		hoptionem.appendChild(hoptionemt);
		var hoptionpz = document.createElement("option");
		hoptionpz.setAttribute('value','%');
		var hoptionpzt = document.createTextNode("%");
		hoptionpz.appendChild(hoptionpzt);
		hselect.appendChild(hoptionpx);
		hselect.appendChild(hoptionem);
		hselect.appendChild(hoptionpz);
		fs.appendChild(hselect);
	}
	if(w == true) {
		var wlabel = document.createElement("label");
		wlabel.setAttribute("for",prefix+"size");
		var wtext = document.createTextNode(" Breite:  ");
		wlabel.appendChild(wtext);
		wlabel.addEventListener('mousedown',function () {setToolTip("Hier kannst du die Breite der Box angeben. Ist der Inhalt der Box gr&ouml;&szlig;er erscheinen automatiscj Scrollbalken.");},true);
		wlabel.addEventListener('mouseup',showToolTip,true);
		wlabel.setAttribute("style","cursor: help; color: #000000;");
		fs.appendChild(wlabel);
		var winput = document.createElement("input");
		winput.setAttribute("type","text");
		winput.setAttribute("name",prefix+"width");
		winput.setAttribute("id",prefix+"width");
		winput.setAttribute("size","3");
		winput.setAttribute("value","");
		winput.setAttribute("style","font-weight: normal");
		fs.appendChild(winput);
		fs.appendChild(document.createTextNode(' '));
		var wselect = document.createElement("select");
		wselect.setAttribute('id',prefix+'widthunit');
		var woptionpx = document.createElement("option");
		woptionpx.setAttribute('value','px');
		woptionpx.setAttribute('selected','selected');
		var woptionpxt = document.createTextNode("px");
		woptionpx.appendChild(woptionpxt);
		var woptionem = document.createElement("option");
		woptionem.setAttribute('value','em');
		var woptionemt = document.createTextNode("em");
		woptionem.appendChild(woptionemt);
		var woptionpz = document.createElement("option");
		woptionpz.setAttribute('value','%');
		var woptionpzt = document.createTextNode("%");
		woptionpz.appendChild(woptionpzt);
		wselect.appendChild(woptionpx);
		wselect.appendChild(woptionem);
		wselect.appendChild(woptionpz);
		fs.appendChild(wselect);
		fs.appendChild(document.createElement("br"));
	}

	if(st == true) {
		var stlabel = document.createElement("label");
		stlabel.setAttribute("for",prefix+"style");
		var sttext = document.createTextNode("Style: ");
		stlabel.appendChild(sttext);
		stlabel.addEventListener('mousedown',function () {setToolTip("Hier kannst du zus&auml;tzliche CSS angeben.");},true);
		stlabel.addEventListener('mouseup',showToolTip,true);
		stlabel.setAttribute("style","cursor: help; color: #000000;");
		fs.appendChild(stlabel);
		var stinput = document.createElement("input");
		stinput.setAttribute("type","text");
		stinput.setAttribute("name",prefix+"style");
		stinput.setAttribute("id",prefix+"style");
		stinput.setAttribute("size","40");
		stinput.setAttribute("value","");
		stinput.setAttribute("style","font-weight: normal");
		fs.appendChild(stinput);
	}
	if(bd == true) {
		var bdlabel = document.createElement("label");
		bdlabel.setAttribute("for",prefix+"borderw");
		var bdtext = document.createTextNode("Rahmen: ");
		bdlabel.appendChild(bdtext);
		bdlabel.addEventListener('mousedown',function () {setToolTip("Hier kannst du einen Rahmen f&uml;r die Box angeben (Dicke Art Farbe).");},true);
		bdlabel.addEventListener('mouseup',showToolTip,true);
		bdlabel.setAttribute("style","cursor: help; color: #000000;");
		fs.appendChild(bdlabel);
		var bdinput = document.createElement("input");
		bdinput.setAttribute("type","text");
		bdinput.setAttribute("name",prefix+"borderw");
		bdinput.setAttribute("id",prefix+"borderw");
		bdinput.setAttribute("size","3");
		bdinput.setAttribute("value","");
		bdinput.setAttribute("style","font-weight: normal");
		fs.appendChild(bdinput);
		fs.appendChild(document.createTextNode(' '));
		var bdselect = document.createElement("select");
		bdselect.setAttribute('id',prefix+'borderwunit');
		var bdoptionpx = document.createElement("option");
		bdoptionpx.setAttribute('value','px');
		bdoptionpx.setAttribute('selected','selected');
		var bdoptionpxt = document.createTextNode("px");
		bdoptionpx.appendChild(bdoptionpxt);
		var bdoptionem = document.createElement("option");
		bdoptionem.setAttribute('value','em');
		var bdoptionemt = document.createTextNode("em");
		bdoptionem.appendChild(bdoptionemt);
		var bdoptionpz = document.createElement("option");
		bdoptionpz.setAttribute('value','%');
		var bdoptionpzt = document.createTextNode("%");
		bdoptionpz.appendChild(bdoptionpzt);
		bdselect.appendChild(bdoptionpx);
		bdselect.appendChild(bdoptionem);
		bdselect.appendChild(bdoptionpz);
		fs.appendChild(bdselect);
		var bdsselect = document.createElement("select");
		bdsselect.setAttribute('id',prefix+'borderstyle');
		var bdsoptions = document.createElement("option");
		bdsoptions.setAttribute("value","solid");
		bdsoptions.setAttribute("selected","selected");
		var bdsoptionst = document.createTextNode("solid");
		bdsoptions.appendChild(bdsoptionst);
		bdsselect.appendChild(bdsoptions);
		var bdsoptiond = document.createElement("option");
		bdsoptiond.setAttribute("value","dotted");
		var bdsoptiondt = document.createTextNode("dotted");
		bdsoptiond.appendChild(bdsoptiondt);
		bdsselect.appendChild(bdsoptiond);
		var bdsoptiong = document.createElement("option");
		bdsoptiong.setAttribute("value","grove");
		var bdsoptiongt = document.createTextNode("grove");
		bdsoptiong.appendChild(bdsoptiongt);
		bdsselect.appendChild(bdsoptiong);
		var bdsoptioni = document.createElement("option");
		bdsoptioni.setAttribute("value","inset");
		var bdsoptionit = document.createTextNode("inset");
		bdsoptioni.appendChild(bdsoptionit);
		bdsselect.appendChild(bdsoptioni);
		var bdsoptiono = document.createElement("option");
		bdsoptiono.setAttribute("value","outset");
		var bdsoptionot = document.createTextNode("outset");
		bdsoptiono.appendChild(bdsoptionot);
		bdsselect.appendChild(bdsoptiono);
		fs.appendChild(bdsselect);
		fs.appendChild(document.createTextNode("#"));
		var bdc = document.createElement("input");
		bdc.setAttribute("id",prefix+"bordercolor");
		bdc.setAttribute("size","6");
		fs.appendChild(bdc);
	}
	if(bg == true) {
	        fs.appendChild(document.createElement("br"));
		var bglabel = document.createElement("label");
		bglabel.setAttribute("for",prefix+"bg");
		var bgtext = document.createTextNode("Hintergrund:  ");
		bglabel.appendChild(bgtext);
		bglabel.setAttribute("style","cursor: default;");
		fs.appendChild(bglabel);
		fs.appendChild(document.createElement("br"));
		var bgclabel = document.createElement("label");
		bgclabel.setAttribute("for",prefix+"bgc");
		bgclabel.appendChild(document.createTextNode("Farbe: #"));
		bgclabel.addEventListener('mousedown',function () {setToolTip("Hier kannst du die Farbe des Hintergrunds der Box angeben als Hex-Wert.");},true);
		bgclabel.addEventListener('mouseup',showToolTip,true);
		bgclabel.setAttribute("style","cursor: help; color: #000000;");
		fs.appendChild(bgclabel);
		var bginput = document.createElement("input");
		bginput.setAttribute("type","text");
		bginput.setAttribute("name",prefix+"bgc");
		bginput.setAttribute("id",prefix+"bgc");
		bginput.setAttribute("size","7");
		bginput.setAttribute("value","#");
		bginput.setAttribute("style","font-weight: normal");
		fs.appendChild(bginput);
		var bgflabel = document.createElement("label");
		bgflabel.setAttribute("for",prefix+"bgf");
		bgflabel.appendChild(document.createTextNode(" Url: "));
		bgflabel.addEventListener('mousedown',function () {setToolTip("Hier kannst du die Webadresse eines Hintergrundbildes angeben.");},true);
		bgflabel.addEventListener('mouseup',showToolTip,true);
		bgflabel.setAttribute("style","cursor: help; color: #000000;");
		fs.appendChild(bgflabel);
		var bgfinput = document.createElement("input");
		bgfinput.setAttribute("type","text");
		bgfinput.setAttribute("name",prefix+"bgf");
		bgfinput.setAttribute("id",prefix+"bgf");
		bgfinput.setAttribute("size","22");
		bgfinput.setAttribute("value","");
		bgfinput.setAttribute("style","font-weight: normal");
		fs.appendChild(bgfinput);

		fs.appendChild(document.createElement("br"));

		var bgplabel = document.createElement("label");
		bgplabel.setAttribute("for","bgr");
		bgplabel.appendChild(document.createTextNode("Anordnung: "));
		bgplabel.addEventListener('mousedown',function () {setToolTip("Hier kannst du Optionen f&uuml;r den Hintergrund angeben (Wiederholung und Position).");},true);
		bgplabel.addEventListener('mouseup',showToolTip,true);
		bgplabel.setAttribute("style","cursor: help; color: #000000;");
		fs.appendChild(bgplabel);

		var bgrselect = document.createElement("select");
		bgrselect.setAttribute("id",prefix+"bgr");
		var bgroptionr = document.createElement("option");
		bgroptionr.setAttribute("value","repeat");
		bgroptionr.appendChild(document.createTextNode("repeat"));
		bgrselect.appendChild(bgroptionr);
		var bgroptionn = document.createElement("option");
		bgroptionn.setAttribute("value","no-repeat");
		bgroptionn.appendChild(document.createTextNode("no-repeat"));
		bgrselect.appendChild(bgroptionn);
		var bgroptionx = document.createElement("option");
		bgroptionx.setAttribute("value","repeat-x");
		bgroptionx.appendChild(document.createTextNode("repeat-x"));
		bgrselect.appendChild(bgroptionx);
		var bgroptiony = document.createElement("option");
		bgroptiony.setAttribute("value","repeat-y");
		bgroptiony.appendChild(document.createTextNode("repeat-y"));
		bgrselect.appendChild(bgroptiony);
		fs.appendChild(bgrselect);
		var bgpvselect = document.createElement("select");
		bgpvselect.setAttribute("id",prefix+"bgpv");
		var bgpvoptiont = document.createElement("option");
		bgpvoptiont.setAttribute("value","top");
		bgpvoptiont.appendChild(document.createTextNode("top"));
		bgpvselect.appendChild(bgpvoptiont);
		var bgpvoptionc = document.createElement("option");
		bgpvoptionc.setAttribute("value","center");
		bgpvoptionc.appendChild(document.createTextNode("center"));
		bgpvselect.appendChild(bgpvoptionc);
		var bgpvoptionb = document.createElement("option");
		bgpvoptionb.setAttribute("value","bottom");
		bgpvoptionb.appendChild(document.createTextNode("bottom"));
		bgpvselect.appendChild(bgpvoptionb);
		fs.appendChild(bgpvselect);

		var bgphselect = document.createElement("select");
		bgphselect.setAttribute("id",prefix+"bgph");
		var bgphoptionl = document.createElement("option");
		bgphoptionl.setAttribute("value","left");
		bgphoptionl.appendChild(document.createTextNode("left"));
		bgphselect.appendChild(bgphoptionl);
		var bgphoptionc = document.createElement("option");
		bgphoptionc.setAttribute("value","center");
		bgphoptionc.appendChild(document.createTextNode("center"));
		bgphselect.appendChild(bgphoptionc);
		var bgphoptionr = document.createElement("option");
		bgphoptionr.setAttribute("value","right");
		bgphoptionr.appendChild(document.createTextNode("right"));
		bgphselect.appendChild(bgphoptionr);
		fs.appendChild(bgphselect);
	}
	cContent.appendChild(fs);
}

function addLines(num) {
	var label, input;
	var fs = document.createElement("fieldset");
	fs.setAttribute("style","color: #000000");
	var title = document.createElement("span");
	title.setAttribute("style","color: #278FDE;font-size: 15px; font-weight: normal; text-align: left; maring: 0; padding: 0; cursor: help;");
	var tt = document.createTextNode("Anordnung");
	title.appendChild(tt);
	title.addEventListener('mousedown',function () {setToolTip("Hier kannst du die Anordnung der Boxen festlegen.<br />Dazu gibst du einfach in jede Zeile die Namen der Boxen mit ',' getrennt ein, die nebeneinander erscheinen sollen. Die Namen der verf&uuml;gbaren Boxen findest du weiter unten.<br />Beispiel: userbox,roomsbox<br />Um mehrere Boxen untereinander neben eine andere zu positionieren kannst du Klammern verwenden.<br />Beispiel: (userbox,googlebox),roomsbox<br /><br />Probier es einfach aus!");},true);
	title.addEventListener('mouseup',showToolTip,true);
	fs.appendChild(title);
	fs.appendChild(document.createElement("br"));
	for(var i=0;i<num;i++) {
		label = document.createElement('label');
		label.setAttribute("for",'row'+i);
		label.appendChild(document.createTextNode('Reihe'+(i+1)+': '));
		input = document.createElement('input');
		input.setAttribute("type","text");
		input.setAttribute("name",'row'+i);
		input.setAttribute("id",'row'+i);
		input.setAttribute("size","40");
		input.setAttribute("value","");
		input.setAttribute("style","font-weight: normal");
		fs.appendChild(label);
		fs.appendChild(input);
	}
	cContent.appendChild(fs);
}

function addHeadline() {
	var fs = document.createElement("fieldset");
	fs.setAttribute("style","color: #000000");
	var title = document.createElement("span");
	title.setAttribute("style","color: #278FDE;font-size: 15px; font-weight: normal; text-align: left; maring: 0; padding: 0; cursor: help;");
	var tt = document.createTextNode("Überschrift");
	title.appendChild(tt);
	title.addEventListener('mousedown',function () {setToolTip("Hier kannst du die &Uuml;berschrift ein- und ausblenden und ver&auml;ndern.");},true);
	title.addEventListener('mouseup',showToolTip,true);
	fs.appendChild(title);
	fs.appendChild(document.createElement("br"));
	var hcbox = document.createElement("input");
	hcbox.setAttribute('type','checkbox');
	hcbox.setAttribute('checked','checked');
	hcbox.setAttribute('name','headlinebox');
	hcbox.setAttribute('id','headlineshow');
	hcbox.setAttribute('value','show');
	fs.appendChild(hcbox);
	var hboxlabel = document.createElement("label");
	hboxlabel.setAttribute('for','headlinebox');
	hboxlabel.appendChild(document.createTextNode("anzeigen"));
	fs.appendChild(hboxlabel);
	fs.appendChild(document.createElement("br"));
	var titleLabel = document.createElement("label");
	titleLabel.setAttribute('for','headlinetitle');
	titleLabel.appendChild(document.createTextNode('Titel: '));
	titleLabel.addEventListener('mousedown',function () {setToolTip("Hier kannst du die &Uuml;berschrift deiner Startseite &auml;ndern.");},true);
	titleLabel.addEventListener('mouseup',showToolTip,true);
	titleLabel.setAttribute("style","cursor: help; color: #000000;");
	fs.appendChild(titleLabel);
	var titleInput = document.createElement('input');
	titleInput.setAttribute('name','headlinetitle');
	titleInput.setAttribute('id','headlinetitle');
	titleInput.setAttribute("size","45");
	titleInput.setAttribute("value","My personal SPiN by BlackScar");
	titleInput.setAttribute("style","font-weight: normal");
	fs.appendChild(titleInput);
	fs.appendChild(document.createElement("br"));
	var hclabel = document.createElement("label");
	hclabel.setAttribute("for","headlinecolor");
	var hctext = document.createTextNode("Farbe: #");
	hclabel.appendChild(hctext);
	hclabel.addEventListener('mousedown',function () {setToolTip("Hier kannst du die &Uuml;berschrift-Farbe als Hex-Wert angeben.");},true);
	hclabel.addEventListener('mouseup',showToolTip,true);
	hclabel.setAttribute("style","cursor: help; color: #000000;");
	fs.appendChild(hclabel);
	var hcinput = document.createElement("input");
	hcinput.setAttribute("type","text");
	hcinput.setAttribute("name","headlinecolor");
	hcinput.setAttribute("id","headlinecolor");
	hcinput.setAttribute("size","7");
	hcinput.setAttribute("value","#000000");
	hcinput.setAttribute("style","font-weight: normal");
	fs.appendChild(hcinput);
	var hslabel = document.createElement("label");
	hslabel.setAttribute("for","headlinesize");
	var hstext = document.createTextNode(" Größe:  ");
	hslabel.appendChild(hstext);
	hslabel.addEventListener('mousedown',function () {setToolTip("Hier kannst du die Gr&ouml;&szlig;e der &Uuml;berschrift angeben.");},true);
	hslabel.addEventListener('mouseup',showToolTip,true);
	hslabel.setAttribute("style","cursor: help; color: #000000;");
	fs.appendChild(hslabel);
	var hsinput = document.createElement("input");
	hsinput.setAttribute("type","text");
	hsinput.setAttribute("name","headlinesize");
	hsinput.setAttribute("id","headlinesize");
	hsinput.setAttribute("size","1");
	hsinput.setAttribute("value","20");
	hsinput.setAttribute("style","font-weight: normal");
	fs.appendChild(hsinput);
	fs.appendChild(document.createTextNode(' '));
	var hsselect = document.createElement("select");
	hsselect.setAttribute('id','headlinesizeunit');
	var hsoptionpx = document.createElement("option");
	hsoptionpx.setAttribute('value','px');
	hsoptionpx.setAttribute('selected','selected');
	var hsoptionpxt = document.createTextNode("px");
	hsoptionpx.appendChild(hsoptionpxt);
	var hsoptionem = document.createElement("option");
	hsoptionem.setAttribute('value','em');
	var hsoptionemt = document.createTextNode("em");
	hsoptionem.appendChild(hsoptionemt);
	var hsoptionpz = document.createElement("option");
	hsoptionpz.setAttribute('value','%');
	var hsoptionpzt = document.createTextNode("%");
	hsoptionpz.appendChild(hsoptionpzt);
	hsselect.appendChild(hsoptionpx);
	hsselect.appendChild(hsoptionem);
	hsselect.appendChild(hsoptionpz);
	fs.appendChild(hsselect);
        fs.appendChild(document.createElement("br"));
	var hstlabel = document.createElement("label");
	hstlabel.setAttribute("for","headlinestyle");
	var hsttext = document.createTextNode("Style: ");
	hstlabel.appendChild(hsttext);
	hstlabel.addEventListener('mousedown',function () {setToolTip("Hier kannst du zus&auml;tzliche CSS angeben.");},true);
	hstlabel.addEventListener('mouseup',showToolTip,true);
	hstlabel.setAttribute("style","cursor: help; color: #000000;");
	fs.appendChild(hstlabel);
	var hstinput = document.createElement("input");
	hstinput.setAttribute("type","text");
	hstinput.setAttribute("name","headlinestyle");
	hstinput.setAttribute("id","headlinestyle");
	hstinput.setAttribute("size","40");
	hstinput.setAttribute("value","");
	hstinput.setAttribute("style","font-weight: normal");
	fs.appendChild(hstinput);
	cContent.appendChild(fs);
}

function addImport() {
	var fs = document.createElement("fieldset");
	fs.setAttribute("style","color: #000000;");
	var title = document.createElement("span");
	title.setAttribute("style","color: #278FDE;font-size: 15px; font-weight: normal; text-align: left; maring: 0; padding: 0; cursor: help;");
	var tt = document.createTextNode("Design importieren");
	title.appendChild(tt);
	title.addEventListener('mousedown',function () {setToolTip("Importiere ein fertiges Design mit einem Klick!");},true);
	title.addEventListener('mouseup',showToolTip,true);
	fs.appendChild(title);
	fs.appendChild(document.createElement("br"));
	var tt = document.createTextNode("Download: ");
	fs.appendChild(tt);
	icselect = document.createElement("select");
	icselect.setAttribute('size','1');
	icselect.setAttribute('name','importconfig');
	icselect.setAttribute('id','importconfig');

	fs.appendChild(icselect);

	var icbutton = document.createElement("input");
	icbutton.setAttribute("type","button");
	icbutton.setAttribute("name","importconfigbutton");
	icbutton.setAttribute("value","importieren");
	icbutton.setAttribute("id","importconfigbutton");
	icbutton.addEventListener('mousedown',function () {importConfig(icselect.value);},true);

	fs.appendChild(icbutton);
	fs.appendChild(document.createElement("br"));
	fs.appendChild(document.createElement("br"));
	var tt = document.createTextNode("Anderes: ");
	fs.appendChild(tt);
	fs.appendChild(document.createElement("br"));

	var iectext = document.createElement("input");
	iectext.setAttribute("type","text");
	iectext.setAttribute("size","32");
	iectext.setAttribute("value","exportiertes Design einfügen...");
	iectext.setAttribute("name","importeconfigtext");
	iectext.setAttribute("id","importeconfigtext");
	iectext.setAttribute("style","color: #999999;");
	iectext.addEventListener('mousedown',function () {if(iectext.value == "exportiertes Design einfügen...") {iectext.value = ""; iectext.style.color = "#000000;";}},true);

	fs.appendChild(iectext);

	var iecbutton = document.createElement("input");
	iecbutton.setAttribute("type","button");
	iecbutton.setAttribute("name","importeconfigbutton");
	iecbutton.setAttribute("value","importieren");
	iecbutton.setAttribute("id","importeconfigbutton");
	iecbutton.addEventListener('mousedown',function () {config.loadJSON(iectext.value);},true);
	
	fs.appendChild(iecbutton);

	cContent.appendChild(fs);
	
	getConfigs();
}

function addExport() {
	var fs = document.createElement("fieldset");
	fs.setAttribute("style","color: #000000");
	var title = document.createElement("span");
	title.setAttribute("style","color: #278FDE;font-size: 15px; font-weight: normal; text-align: left; maring: 0; padding: 0; cursor: help;");
	var tt = document.createTextNode("Design exportieren");
	title.appendChild(tt);
	title.addEventListener('mousedown',function () {setToolTip("Exportiere dein Design mit einem Klick!");},true);
	title.addEventListener('mouseup',showToolTip,true);
	fs.appendChild(title);
	//fs.appendChild(document.createElement("br"));
	ecform = document.createElement("form");
	ecform.setAttribute("method","post");
	ecform.setAttribute("action","/mail/create");
	ecsubject = document.createElement("input");
	ecsubject.setAttribute("type","hidden");
	ecsubject.setAttribute("name","subject");
	ecsubject.setAttribute("value","MyPersonalSpin Design");
	ecuser = document.createElement("input");
	ecuser.setAttribute("type","hidden");
	ecuser.setAttribute("name","user");
	ecuser.setAttribute("value","Schattenspieler");
	ectext = document.createElement("input");
	ectext.setAttribute("type","hidden");
	ectext.setAttribute("name","ta");
	ectext.setAttribute("id","exportconfigtext");
	ectext.setAttribute("value","test");
	ecname = document.createElement("input");
	ecname.setAttribute("type","text");
	ecname.setAttribute("name","name");
	ecname.setAttribute("id","exportconfigname");
	ecname.setAttribute("value","Designname");
	var ecbutton = document.createElement("input");
	ecbutton.setAttribute("type","submit");
	ecbutton.setAttribute("name","exportconfigbutton");
	ecbutton.setAttribute("value","exportieren");
	ecbutton.setAttribute("id","exportconfigbutton");
	
	ecform.addEventListener('submit',function () {showLoadingScreen(); document.getElementById("exportconfigtext").value = 'Designname: '+document.getElementById("exportconfigname").value+'\n\nKonfiguration:\n<nowiki>'+config.getJSON()+"</nowiki>";},true);
	
	ecform.appendChild(ecsubject);
	ecform.appendChild(ecuser);
	ecform.appendChild(ectext);
	ecform.appendChild(ecname);
	ecform.appendChild(ecbutton);
	
//	icbutton.addEventListener('mousedown',function () {location.href = 'http://www.spin.de/mail/create?subject=MyPersonalSpin%20Design&user=Schattenspieler&ta='+escape('Mein Design:\n\n'+config.getJSON());},true);

	fs.appendChild(ecform);

	cContent.appendChild(fs);
	
}

var loadingdiv;
loadingdiv = document.createElement("div");
loadingdiv.setAttribute("style","position: absolute; top: -100px; left: -100px; z-index: 100; height: 0%; width: 0%; background-image: url('http://im.spin.de/static/profile/personal/semi75.png'); text-align: center; padding-top: 20%; font-weight: bold; color: #ffffff;");
loadingdiv.innerHTML ="loading...";
document.getElementsByTagName("body")[0].appendChild(loadingdiv);

function showLoadingScreen() {
	loadingdiv.style.top = 0;
	loadingdiv.style.left = 0;
	loadingdiv.style.width = "100%";
	loadingdiv.style.height = "50%";
}

function hideLoadingScreen() {
	loadingdiv.style.top = -100;
	loadingdiv.style.left = -100;
	loadingdiv.style.width = "0%";
	loadingdiv.style.height = "0%";
}

var cForm = document.createElement('div');
cForm.setAttribute('style','position: absolute; left: '+left+'px; top: '+top+'px; height: 450px; width: 350px; display: none; background-image: url("data:image/gif;base64,'+cFormGIF+'");');
cForm.setAttribute('id','cForm');
var cTitle = document.createElement('div');
cTitle.setAttribute('style','float: left; width: 320px; height: 30px; cursor: move;');
var cClose = document.createElement('div');
cClose.setAttribute('style','float: left; width: 20px; height: 20px; cursor: pointer;');
cClose.addEventListener('click',function() {document.getElementById('cForm').style.display='none';},true);
var cContent = document.createElement('div');
cContent.setAttribute('style','clear: both; width: 308px; height: 345px; margin-top: 20px; margin-bottom: 10px; padding: 15px; padding-top: 0px; font-size: 10px; line-height: 22px; font-weight: bold; overflow: auto;');
cContent.setAttribute("class","cContent");
var cSave = document.createElement('div');
cSave.setAttribute('style','width: 350px; text-align: center; heigth: 30px;');
var saveButton = document.createElement('input');
saveButton.setAttribute('type','image');
saveButton.setAttribute('src','data:image/gif;base64,'+cSaveButton);
saveButton.addEventListener('click',saveConfig,true);
cSave.appendChild(saveButton);


addImport();
addExport();
addHeadline();
addLines(6);
addFieldset('Body','body',false,false,true,false,true,false,false);
addFieldset('Links','links',true,true,true,false,false,false,false);
addFieldset('Userbox','userbox',true,true,true,true,true,true,true);
addFieldset('Googlebox','googlebox',true,true,true,true,true,true,true);
addFieldset('Roomsbox','roomsbox',true,true,true,true,true,true,true);
addFieldset('Friendbox','friendbox',true,true,true,true,true,true,true);
addFieldset('Linksbox','linksbox',true,true,true,true,true,true,true);
addFieldset('Messagebox','messagebox',true,true,true,true,true,true,true);
addFieldset('Newsbox','newsbox',true,true,true,true,true,true,true);
addFieldset('Notebox','notebox',true,true,true,true,true,true,true);
addFieldset('Announcementbox','announcementbox',true,true,true,true,true,true,true);
addFieldset('Suggestionbox','suggestionbox',true,true,true,true,true,true,true);

cForm.appendChild(cTitle);
cForm.appendChild(cClose);
cForm.appendChild(cContent);
cForm.appendChild(cSave);

document.getElementsByTagName("body")[0].appendChild(cForm);

function checkConfig() {
	//check boxes
	var box,size,color,width,height,bgc,bdw,bds,bdc,title;
	var r = true;
	var num = /^\d*$/;
	var col = /^[0-9a-f]*$/i;
	for(var i=0;i<boxes.length;i++) {
	        box = boxes[i].name;
	        size = document.getElementById(box+"size").value;
	        width = document.getElementById(box+"width").value;
	        height = document.getElementById(box+"height").value;
	        color = document.getElementById(box+"color").value;
	        bgc = document.getElementById(box+"bgc").value;

	        bdw = document.getElementById(box+"borderw").value;
	        bds = document.getElementById(box+"borderstyle").value;
	        bdc = document.getElementById(box+"bordercolor").value;

	        if(!num.test(size)) {
	                alert("Ungueltige Eingabe:\n"+box+" - "+size);
                	document.getElementById(box+"size").focus();
                        r = false;
                        break;
		}
		if(!num.test(width)) {
	                alert("Ungueltige Eingabe:\n"+box+" - "+width);
                	document.getElementById(box+"width").focus();
                        r = false;
                        break;
		}
		if(!num.test(height)) {
	                alert("Ungueltige Eingabe:\n"+box+" - "+height);
                	document.getElementById(box+"height").focus();
                        r = false;
                        break;
		}
		if(color.length != 0) {
			if(color.length != 6 || !col.test(color)) {
		                alert("Ungueltige Eingabe:\n"+box+" - "+color);
	                	document.getElementById(box+"color").focus();
	                        r = false;
	                        break;
			}
		}
		if(bgc.length != 0) {
	        	if(bgc.length != 6 || !col.test(bgc)) {
		                alert("Ungueltige Eingabe:\n"+box+" - "+bgc);
	                	document.getElementById(box+"bgc").focus();
	                        r = false;
	                        break;
			}
		}
		if(!num.test(bdw)) {
	                alert("Ungueltige Eingabe:\n"+box+" - "+bdw);
                	document.getElementById(box+"borderw").focus();
                        r = false;
                        break;
		}
		if(bdc.length != 0) {
	        	if(bdc.length != 6 || !col.test(bdc)) {
		                alert("Ungueltige Eingabe:\n"+box+" - "+bdc);
	                	document.getElementById(box+"bordercolor").focus();
	                        r = false;
	                        break;
			}
		}
	}

	//Check headline
	if(r) {
		if(config.headlineshow) {
			title = document.getElementById("headlinetitle").value;
			color = document.getElementById("headlinecolor").value;
			size = document.getElementById("headlinesize").value;

			if(title.length == 0) {
			        alert("Ungueltige Eingabe:\nUeberschrift - Titel");
	                	document.getElementById("headlinetitle").focus();
				r = false;
			}
			if(r && !num.test(size)) {
		                alert("Ungueltige Eingabe:\nUeberschrift - "+size);
	                	document.getElementById("headlinesize").focus();
	                        r = false;
			}
			if(r && color.length != 0) {
				if(color.length != 6 || !col.test(color)) {
			                alert("Ungueltige Eingabe:\n Ueberschrift - "+color);
		                	document.getElementById("headlinecolor").focus();
		                        r = false;
				}
			}
		}
	}

	//Check body
	if(r) {
		bgc = document.getElementById("bodybgc").value;
		if(bgc.length != 0) {
			if(bgc.length != 6 || !col.test(bgc)) {
		                alert("Ungueltige Eingabe:\n Body - "+bgc);
	                	document.getElementById("bodybgc").focus();
	                        r = false;
			}
		}
	}

	//Check links
        if(r) {
		color = document.getElementById("linkscolor").value;
		size = document.getElementById("linkssize").value;

		if(r && !num.test(size)) {
	                alert("Ungueltige Eingabe:\n Links - "+size);
                	document.getElementById("linkssize").focus();
                        r = false;
		}
		if(r && color.length != 0) {
			if(color.length != 6 || !col.test(color)) {
		                alert("Ungueltige Eingabe:\n Links - "+color);
	                	document.getElementById("linkscolor").focus();
	                        r = false;
			}
		}
	}
	//Parse rows
	if(r) {
	        var row;
	        var oneElement = /[a-z]+/i;
	        var moreElements = /[,]*([\(\)a-z]+)[,]*/gi;
	        var boxedElements = /([\(\)a-z]+)[,]*/gi;
		for(var i=0;i<6;i++) {
		        var box;
			row = document.getElementById("row"+i).value;
			if(row != "") {
				var elems;
				var combo = 0;
				var closebox = false;
				while (elems = moreElements.exec(row)) {
				        while(elems[1].substring(0,1) == "(") {
                                                combo++;
						elems[1] = elems[1].substring(1,elems[1].length);
					}
					while(elems[1].substring(elems[1].length-1,elems[1].length) == ")") {
					    if(combo > 0) {
							combo--;
							elems[1] = elems[1].substring(0,elems[1].length-1);
						} else {
                            alert("Ungueltige Eingabe:\nReihe"+(i+1)+": "+row);
							r = false;
							break;
						}
					}
					if((box = isBox(elems[1])) != null) {
						//alert("thats easy man: "+box.name);
					}
					else {
					        alert("Ungueltige Eingabe:\nReihe"+(i+1)+": "+row);
						r = false;
						break;
					}
				}
				if(combo != 0) {
                    alert("Ungueltige Eingabe:\nReihe"+(i+1)+": "+row);
					r = false;
					break;
				}
			}
		}
	}
	return r;
}


function parseRows() {
	var row;
        var moreElements = /[,]*([\(\)a-z]+)[,]*/gi;
	for(var i=0;i<6;i++) {
	        var boxesinrow = new Array;
	        var box;
		row = document.getElementById("row"+i).value;
		if(row != "") {
			var elems;
			var combo = 0;
			var closebox = false;
			var cbox = new Array;
			var added = false;
			while (elems = moreElements.exec(row)) {
				added = false;
			     while(elems[1].substring(0,1) == "(") {
					combo++;
					cbox[combo] = new Array;
					elems[1] = elems[1].substring(1,elems[1].length);
				}
				if(combo > 0) {
					elemname = elems[1];
					while(elemname.substring(elemname.length-1,elemname.length) == ")")
						elemname = elemname.substring(0,elemname.length-1);
					if((box = isBox(elemname)) != null) {
						cbox[combo][cbox[combo].length] = box;
						added = true;
					} else {
		       			alert("aFehler beim Parsen:\nReihe"+(i+1)+": "+row);
						r = false;
						break;
					}
				}
				
				while(elems[1].substring(elems[1].length-1,elems[1].length) == ")") {
					elems[1] = elems[1].substring(0,elems[1].length - 1);
//					alert(elems[1]+" Combo: "+combo);
					if(combo > 0) {
							if(combo > 1) {
								var p = combo - 1;
								cbox[p][cbox[p].length] = new ComboBox(cbox[combo]);
								added = true;
							} else {
								boxesinrow[boxesinrow.length] = new ComboBox(cbox[combo]);
								added = true;
							}
							combo--;
					} else {
     					alert("bFehler beim Parsen:\nReihe"+(i+1)+": "+row);
						r = false;
						break;
					}
				}
				if(!added) {
					if((box = isBox(elems[1])) != null) {
					    boxesinrow[boxesinrow.length] = box;
					} else {
				        alert("cFehler beim Parsen:\nReihe"+(i+1)+": "+row);
						r = false;
						break;
					}
				}
			}
		}
		crow[i] = boxesinrow;
	}
}

function Config() {

    this.headlineshow     = document.getElementById("headlineshow").checked   = GM_getValue("headlineShow","show");
 	this.headlinetitle    = document.getElementById("headlinetitle").value    = GM_getValue("headlineTitle","My personal SPiN by Schattenspieler");
  	this.headlinecolor    = document.getElementById("headlinecolor").value    = GM_getValue("headlineColor","000033");
  	this.headlinesize     = document.getElementById("headlinesize").value     = GM_getValue("headlineSize","20");
  	this.headlinesizeunit = document.getElementById("headlinesizeunit").value = GM_getValue("headlineSizeUnit","px");
   	this.headlinestyle    = document.getElementById("headlinestyle").value    =  GM_getValue("headlineStyle","");

	this.bodystyle = document.getElementById("bodystyle").value = GM_getValue("bodyStyle","");
 	this.bodybgc   = document.getElementById("bodybgc").value   = GM_getValue("bodyBgC","F8F8F8");
  	this.bodybgf   = document.getElementById("bodybgf").value   = GM_getValue("bodyBgF","");
  	this.bodybgr   = document.getElementById("bodybgr").value   = GM_getValue("bodyBgR","");
  	this.bodybgph  = document.getElementById("bodybgph").value  = GM_getValue("bodyBgPh","");
  	this.bodybgpv  = document.getElementById("bodybgpv").value  = GM_getValue("bodyBgPv","");

	this.linkscolor = document.getElementById("linkscolor").value = GM_getValue("linksColor","");
	this.linkssize  = document.getElementById("linkssize").value  = GM_getValue("linksSize","");
	this.linksstyle = document.getElementById("linksstyle").value = GM_getValue("linksStyle","");

	var box;
	for(var i=0;i<boxes.length;i++) {
	        box = boxes[i];
		box.color = document.getElementById(box.name+"color").value = GM_getValue(box.name+"color","");
		box.size = document.getElementById(box.name+"size").value  = GM_getValue(box.name+"size","");
		box.sizeunit = document.getElementById(box.name+"sizeunit").value  = GM_getValue(box.name+"sizeunit","");
        	box.style = document.getElementById(box.name+"style").value = GM_getValue(box.name+"style","");
        	box.height = document.getElementById(box.name+"height").value = GM_getValue(box.name+"height","");
        	box.heightunit = document.getElementById(box.name+"heightunit").value = GM_getValue(box.name+"heightunit","");
        	box.width = document.getElementById(box.name+"width").value = GM_getValue(box.name+"width","");
        	box.widthunit = document.getElementById(box.name+"widthunit").value = GM_getValue(box.name+"widthunit","");
        	box.bgf = document.getElementById(box.name+"bgf").value   = GM_getValue(box.name+"bgf","");
        	box.bgc = document.getElementById(box.name+"bgc").value   = GM_getValue(box.name+"bgc","");
        	box.bgr = document.getElementById(box.name+"bgr").value   = GM_getValue(box.name+"bgr","");
        	box.bgpv = document.getElementById(box.name+"bgpv").value   = GM_getValue(box.name+"bgpv","");
        	box.bgph = document.getElementById(box.name+"bgph").value   = GM_getValue(box.name+"bgph","");
        	box.bdc = document.getElementById(box.name+"bordercolor").value   = GM_getValue(box.name+"bordercolor","");
        	box.bdw = document.getElementById(box.name+"borderw").value   = GM_getValue(box.name+"borderw","");
        	box.bdwu = document.getElementById(box.name+"borderwunit").value   = GM_getValue(box.name+"borderwunit","");
        	box.bds = document.getElementById(box.name+"borderstyle").value   = GM_getValue(box.name+"borderstyle","");
	}
	
	for(var i=0;i<6;i++) {
	        document.getElementById("row"+i).value = GM_getValue("row"+i,"");
	}
	parseRows();
	
	this.save = function() {
		if(checkConfig()) {
			GM_setValue("headlineShow",document.getElementById("headlineshow").checked);
                	GM_setValue("headlineTitle",document.getElementById("headlinetitle").value);
                	GM_setValue("headlineColor",document.getElementById("headlinecolor").value);
                	GM_setValue("headlineSize",document.getElementById("headlinesize").value);
                	GM_setValue("headlineSizeUnit",document.getElementById("headlinesizeunit").value);
                	GM_setValue("headlineStyle",document.getElementById("headlinestyle").value);

	                GM_setValue("bodyStyle",document.getElementById("bodystyle").value);
	                GM_setValue("bodyBgC",document.getElementById("bodybgc").value);
	                GM_setValue("bodyBgF",document.getElementById("bodybgf").value);
	                GM_setValue("bodyBgR",document.getElementById("bodybgr").value);
	                GM_setValue("bodyBgPv",document.getElementById("bodybgpv").value);
	                GM_setValue("bodyBgPh",document.getElementById("bodybgph").value);

	                GM_setValue("linksColor",document.getElementById("linkscolor").value);
	                GM_setValue("linksSize",document.getElementById("linkssize").value);
	                GM_setValue("linksStyle",document.getElementById("linksstyle").value);

            for(var i=0;i<6;i++) {
			     GM_setValue("row"+i,document.getElementById("row"+i).value);
			}

			var box;
           	for(var i=0;i<boxes.length;i++) {
	        	box = boxes[i];
				GM_setValue(box.name+"color",document.getElementById(box.name+"color").value);
				GM_setValue(box.name+"sizeunit",document.getElementById(box.name+"sizeunit").value);
				GM_setValue(box.name+"size",document.getElementById(box.name+"size").value);
        			GM_setValue(box.name+"style",document.getElementById(box.name+"style").value);
        			GM_setValue(box.name+"bgc",document.getElementById(box.name+"bgc").value);
        			GM_setValue(box.name+"bgf",document.getElementById(box.name+"bgf").value);
        			GM_setValue(box.name+"bgr",document.getElementById(box.name+"bgr").value);
        			GM_setValue(box.name+"bgpv",document.getElementById(box.name+"bgpv").value);
        			GM_setValue(box.name+"bgph",document.getElementById(box.name+"bgph").value);
        			GM_setValue(box.name+"height",document.getElementById(box.name+"height").value);

        			GM_setValue(box.name+"heightunit",document.getElementById(box.name+"heightunit").value);
        			GM_setValue(box.name+"width",document.getElementById(box.name+"width").value);
        			GM_setValue(box.name+"widthunit",document.getElementById(box.name+"widthunit").value);
        			GM_setValue(box.name+"borderw",document.getElementById(box.name+"borderw").value);
        			GM_setValue(box.name+"borderwunit",document.getElementById(box.name+"borderwunit").value);
        			GM_setValue(box.name+"bordercolor",document.getElementById(box.name+"bordercolor").value);
        			GM_setValue(box.name+"borderstyle",document.getElementById(box.name+"borderstyle").value);
			}
                	location.reload();
		}
	}
	
	this.getJSON = function() {
		var json_config = '{version: "'+version+'"';

		json_config += ',headlineShow: "'+config.headlineshow+'"';
		json_config += ',headlineTitle: "'+config.headlinetitle+'"';
		json_config += ',headlineColor: "'+config.headlinecolor+'"';
		json_config += ',headlineSize: "'+config.headlinesize+'"';
		json_config += ',headlineSizeUnit: "'+config.headlinesizeunit+'"';
		json_config += ',headlineStyle: "'+config.headlinestyle+'"';

		json_config += ',bodyStyle: "'+config.bodystyle+'"';
		json_config += ',bodyBgC: "'+config.bodybgc+'"';
		json_config += ',bodyBgF: "'+config.bodybgf+'"';
		json_config += ',bodyBgR: "'+config.bodybgr+'"';
		json_config += ',bodyBgPv: "'+config.bodybgpv+'"';
		json_config += ',bodyBgPh: "'+config.bodybgph+'"';

		json_config += ',linksColor: "'+config.linkscolor+'"';
		json_config += ',linksSize: "'+config.linkssize+'"';
		json_config += ',linksStyle: "'+config.linksstyle+'"';
		
	        var box;
		for(var i=0;i<boxes.length;i++) {
			box = boxes[i];
			json_config += ','+box.name+'color: "'+box.color+'"';
			json_config += ','+box.name+'size: "'+box.size+'"';
			json_config += ','+box.name+'sizeunit: "'+box.sizeunit+'"';
			json_config += ','+box.name+'style: "'+box.style+'"';
			json_config += ','+box.name+'height: "'+box.height+'"';
			json_config += ','+box.name+'heightunit: "'+box.heightunit+'"';
			json_config += ','+box.name+'width: "'+box.width+'"';
			json_config += ','+box.name+'widthunit: "'+box.widthunit+'"';
			json_config += ','+box.name+'bgf: "'+box.bgf+'"';
			json_config += ','+box.name+'bgc: "'+box.bgc+'"';
			json_config += ','+box.name+'bgr: "'+box.bgr+'"';
			json_config += ','+box.name+'bgpv: "'+box.bgpv+'"';
			json_config += ','+box.name+'bgph: "'+box.bgph+'"';
			json_config += ','+box.name+'bordercolor: "'+box.bdc+'"';
			json_config += ','+box.name+'borderw: "'+box.bdw+'"';
			json_config += ','+box.name+'borderwunit: "'+box.bdwu+'"';
			json_config += ','+box.name+'borderstyle: "'+box.bds+'"';
		}
		
		for(var i=0; i < 6; i++) {
			json_config += ',row'+i+': "'+document.getElementById("row"+i).value+'"';	
		}
		
                json_config += '}';
		return json_config;
	}
	
	this.loadJSON = function(json_config) {
	        var obj = eval('('+json_config+')');
	        if(version == obj.version) {
				var hls = true;
				if(obj.headlineShow == "false")
					hls = false;
	        	GM_setValue("headlineShow",hls);
                	GM_setValue("headlineTitle",obj.headlineTitle);
                	GM_setValue("headlineColor",obj.headlineColor);
                	GM_setValue("headlineSize",obj.headlineSize);
                	GM_setValue("headlineSizeUnit",obj.headlineSizeUnit);
                	GM_setValue("headlineStyle",obj.headlineStyle);

	                GM_setValue("bodyStyle",obj.bodyStyle);
	                GM_setValue("bodyBgC",obj.bodyBgC);
	                GM_setValue("bodyBgF",obj.bodyBgF);
	                GM_setValue("bodyBgR",obj.bodyBgR);
	                GM_setValue("bodyBgPv",obj.bodyBgPv);
	                GM_setValue("bodyBgPh",obj.bodyBgPh);

	                GM_setValue("linksColor",obj.linksColor);
	                GM_setValue("linksSize",obj.linksSize);
	                GM_setValue("linksStyle",obj.linksStyle);
	                
	                var box;
					
               	for(var i=0;i<boxes.length;i++) {
	        		box = boxes[i];		
					var n = 0;
					GM_setValue(box.name+"color",obj[box.name+"color"]); n++;
					GM_setValue(box.name+"sizeunit",obj[box.name+"sizeunit"]); n++;
					GM_setValue(box.name+"size",obj[box.name+"size"]); n++;
        			GM_setValue(box.name+"style",obj[box.name+"style"]); n++;
        			GM_setValue(box.name+"bgc",obj[box.name+"bgc"]); n++;
        			GM_setValue(box.name+"bgf",obj[box.name+"bgf"]); n++;
        			GM_setValue(box.name+"bgr",obj[box.name+"bgr"]); n++;
        			GM_setValue(box.name+"bgpv",obj[box.name+"bgpv"]); n++;
        			GM_setValue(box.name+"bgph",obj[box.name+"bgph"]); n++;
        			GM_setValue(box.name+"height",obj[box.name+"height"]); n++;
        			GM_setValue(box.name+"heightunit",obj[box.name+"heightunit"]); n++;
        			GM_setValue(box.name+"width",obj[box.name+"width"]); n++;
        			GM_setValue(box.name+"widthunit",obj[box.name+"widthunit"]); n++;
        			GM_setValue(box.name+"borderw",obj[box.name+"borderw"]);n++;
        			GM_setValue(box.name+"borderwunit",obj[box.name+"borderwunit"]);n++;
        			GM_setValue(box.name+"bordercolor",obj[box.name+"bordercolor"]);n++;
        			GM_setValue(box.name+"borderstyle",obj[box.name+"borderstyle"]);n++;        			
					
					
				}


				for(var i=0; i < 6; i++) {
        			GM_setValue("row"+i,obj["row"+i]);
				}
				hideLoadingScreen();
               	location.reload();
	        } else {
				alert("Die Version des Designs stimmt nicht mit deiner Version überein!");
			}
	}
	
}

function saveConfig(e) {
	config.save();
}

function showConfigButton(e) {
	cbutton.innerHTML = cbuttonContent;
	cbutton.setAttribute("style",cbuttonStyleShow);
}

function hideConfigButton(e) {
	cbutton.innerHTML = "";
	cbutton.setAttribute("style",cbuttonStyleHide);
}

function showConfig(e) {
	hideConfigButton(e);
	cForm.style.display = 'block';
}
function hideConfig(e) {
	cForm.style.display = 'none';
}

var cbutton = document.createElement("div");
cbutton.setAttribute("style",cbuttonStyleHide);
cbutton.addEventListener('mouseover',showConfigButton,true);
cbutton.addEventListener('mouseout',hideConfigButton,true);
cbutton.addEventListener('click',showConfig,true);
document.getElementsByTagName("body")[0].appendChild(cbutton);

var config = new Config();

//Define Functions
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

//Clear Content
var childs = content.childNodes;
for(i = 0; i < childs.length; i++) {
	content.removeChild(childs[i]);
}
content.innerHTML = "";

//Set boxes
/*
crow[0] = new Array(new ComboBox(new Array(userbox,googlebox,friendbox)), new ComboBox(new Array(roomsbox,linksbox)));
crow[1] = new Array(newsbox);
crow[2] = new Array(socialstreambox);
*/
//Set headline
var headline = document.createElement("h1");
headline.setAttribute("class","ps_headline");

//Write new home page
topdiv = document.createElement("div");
topdiv.appendChild(headline);
var cbox = null;
var colors = null;

for(var i=0;i<crow.length;i++) {
	if(crow[i].length > 0) {
        	row = document.createElement("div");
		row.setAttribute("style","clear: both;");
		for(j=0;j<crow[i].length;j++) {
				if(crow[i][j].elem != null) {
			        if(crow[i][j].elem.innerHTML != "") {
			        	cbox = crow[i][j];
					col = document.createElement("div");
					col.appendChild(cbox.elem);
					row.appendChild(col);
				}
			}
		}
		topdiv.appendChild(row);
	}
}

topdiv.setAttribute("style","width: 100%; float: left;");
cleardiv = document.createElement("div");
cleardiv.setAttribute("style","clear: both;");

content.appendChild(topdiv);
content.appendChild(cleardiv);

if(config.headlineshow) {
	//Set headline text
	var text = document.createTextNode(config.headlinetitle);
	headline.appendChild(text);
}

//Set new styles
var css = 'body {background-color: #'+config.bodybgc+' !Important; background-image: url(\''+config.bodybgf+'\'); background-repeat: '+config.bodybgr+'; background-position: '+config.bodybgph+' '+config.bodybgpv+' '+config.bodystyle+'}';
css += '\nh1.ps_headline {color: #'+config.headlinecolor+'; font-size: '+config.headlinesize+config.headlinesizeunit+'; '+config.headlinestyle+'}';
css += '\na {color: #'+config.linkscolor+' !Important; font-size: '+config.linkssize+' !Important; '+config.linksstyle+'}';
css += '\ndiv.newsdivider {border-color: #'+socialstreambox.bdc+' !Important;}';
css += '\na.button {color: #ffffff !Important;}';

var clear;
for(var i=0;i<cboxes.length;i++) {
	clear = document.createElement("div");
	css += "\ndiv.ps_cb_"+i+" {float: left; width: "+cboxes[i].width+cboxes[i].widthunit+";}";
}
var box;
for(var i=0;i<boxes.length;i++) {
	box = boxes[i];
	css += '\ndiv.ps_'+box.name+' a.hl {color: #'+box.color+' !Important;}';
	css += '\ndiv.ps_'+box.name+''+
	' {overflow: auto; margin: 0; padding: 0px; float: left;';
	if(box.height > 0)
		css += ' height: '+box.height+box.heightunit+';';
	if(box.width > 0)
		css += ' width: '+box.width+box.widthunit+'; ';
	if(box.color != "")
		css += ' color: #'+box.color+';';
	if(box.size > 0)
		css += ' font-size: '+box.size+box.sizeunit+';';
	if(box.bgc != "")
		css += ' background-color: #'+box.bgc+';';
	if(box.bgf != "")
		css += ' background-image: url(\''+box.bgf+'\');';
	if(box.bgr != "")
		css += ' background-repeat: '+box.bgr+';';
        if(box.bgph != "")
		css += ' background-position: '+box.bgph+' '+box.bgpv+';';
        if(box.bdw != "")
		css += ' border: '+box.bdw+box.bdwu+' '+box.bds+' #'+box.bdc+';';
	css += box.style;
	css += ' }';
}

for(var i=0;i<cboxes.length;i++) {
	css += "\ndiv.ps_cb_"+i+" {";
	css += "width: "+cboxes[i].width+cboxes[i].widthunit+";";
	css += "float: left; overflow: hidden;";
	css += "}";
}

css += "\ndiv.ps_tooltip {position: absolute; top: -100px; left: -100px; display: none; background-color: #FFFFFF; color: #000000; font-size: 10px; font-family; Arial; border: 1px solid #000000; z-index: 100;}";

function lighterColor(hexc,fak) {
	var r = hex2dec(hexc);
	if(r > 225/2)
		r -= 5*fak;
	else
		r += 5*fak;
	if(r > 255) r = 255;
	if(r < 0) r = 0;
	return r;
}

css += '\n#roomlist tr.odd:hover {background-color: rgb('+lighterColor(roomsbox.bgc.substring(0,2),2)+","+lighterColor(roomsbox.bgc.substring(2,4),2)+","+lighterColor(roomsbox.bgc.substring(4,6),2)+') !Important;}';
css += '\n#roomlist tr.even:hover {background-color: rgb('+lighterColor(roomsbox.bgc.substring(0,2),2)+","+lighterColor(roomsbox.bgc.substring(2,4),2)+","+lighterColor(roomsbox.bgc.substring(4,6),2)+') !Important;}';

addGlobalStyle( '' +
		css +
		'\ntr.odd {background-color: #'+roomsbox.bgc+' !Important;}'+
		'\ntr.even {background-color: rgb('+lighterColor(roomsbox.bgc.substring(0,2),1)+","+lighterColor(roomsbox.bgc.substring(2,4),1)+","+lighterColor(roomsbox.bgc.substring(4,6),1)+') !Important;}'
);

function importConfig(name) {
	showLoadingScreen();
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://spin.jpr0g.info/server/download_config.php',
		headers: {
			'User-agent': 'MyPersonalSpin Vers. '+version,
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Content-type': 'application/x-www-form-urlencoded',
		},
		data: 'auth='+auth+'&name='+name,
		onload: function(responseDetails) {
		    if(responseDetails.status == "200") {
				config.loadJSON(responseDetails.responseText);
			} else {
			        alert("Status: "+responseDetails.status+" "+responseDetails.statusText + '\n\n' +
				'Feed data:\n' + responseDetails.responseText);
					hideLoadingScreen();
			}
		}
	});
}