// ==UserScript==
// @name           ARMORED Layout
// @namespace      ochetski
// @description    ARMORED Layout para ARMORED, version 0.3.3
// @version        0.3.3
// @author         Ochetski

// @include        http://*ogame.*/game/index.php?page=*
// @include        http://*nexus*
// @include        about:blank
// @resource       languages http://ligona.org/nexus/js/langs.js
// ==/UserScript==

/****************************************************************/

/******************************************/
/***************** VARS *******************/
/******************************************/
var Version = '0.3.3';
var Author = 'Lord Ochetski';
var Title = 'ARMORED Layout';
var sessid = unsafeWindow.session;
var Sep = "$$";
var ChatPlace = "http://nexus.psicologianaweb.com/";//"http://localhost/ligona.org/nexus/";//
var deflang = "en";

eval(GM_getResourceText("languages"));

var ships_names = eval(GM_getValue("Opt0",deflang)+".ships_names");
var techs_names = eval(GM_getValue("Opt0",deflang)+".techs_names");
var resos_names = eval(GM_getValue("Opt0",deflang)+".resos_names");
var struc_names = eval(GM_getValue("Opt0",deflang)+".struc_names");
var lang = eval("lang"+GM_getValue("Opt0",deflang));


GM_setValue('Version',Version);
if(document.getElementById('playerName')) {
	GM_setValue('Player',document.getElementById('playerName').getElementsByTagName('span').item(0).innerHTML);
}
/******************************************/
/***************** IMGS *******************/
/******************************************/
var Imgs = new Array();
Imgs["arrow_in"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHqSURBVDjL3ZHbThpRFIZ5i3kcLRYPqIgUGcDhNKBAqyKCobTR2NhiKmCstcWmBmtLPaCO4CQ6SBWVKInx0N70KbjhCf7O3ia0ZS686F0vVrL3Xvv7VvIvFQBVuOITQxfe6tj5IEPu9xW/ZxGcu2aJnAksxW9eYP42hmB5oBY48zAjJ240QoP7HH3j8xYhWgwiUgiAyxpFlTxZmL2ewvrPNBJX0wid+TF0zCsEHtEKGcbT4igWK0k8OwzBumGo0uZoeUCYuZzE0vUcVn6k8OSbUyFwyfDbSgKvShOIFsZgWTfU2K96pv5huOSm8KfvS/AXHAqBQ2CxcJFAsjwDe5YFgWkGdzCPoSMXHhed8BXs8B7YFALbVh/6Nx+RyWAzevR91qEu+Jf6XwRuecdkTSRp27YcVtaoCLE33Qn9sha6D+3oSrVB+07zO0RXzsx4chxmT18ifhqjSTcKej5qMbkfRVQM12EqILA8uRaRgnguhRE7mqJrahR0y5MjYgi+TTfsq1a0vVELVODYMVUJ/Lo0jZG8768d/1md71uhS2nBZxwYzwXRn2bxMNksqLgtoxgQ/RjOe2HK9FCrYaVLIehY1KB9oYVpnVfXnKscrMsmqBNNEm2a13ol05c7+L7SzD1gWpLNVXW8SST3X7gvtJUuvnAlAAAAAElFTkSuQmCC";
Imgs["arrow_out"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHkSURBVDjL3ZNvT1JhGMafb3G+TQqKECNFRIEDcvgXmB5IPNJmTdbC1SQ0S1xzZKXyT41TdpCOMyYtiXS9aW2uD8EbPsHV87RRmyLrdc92vbt/1/U8930/ZLYxASbpSwgz9SCin2+CHtJJwYoLgbITvvcOeN7a4S6NgTB45+cmCucvu8JMFOZCZQHpr0tYO12Ga9cKwpJz5xvIfH+GR2dxRGp+uSOs8Jxv39GKV+/gYS2OlXoSfNECMnMSRKw+hdS3BLI/Mlho3MPUR88lE+++ozlfjWG1kYJUCcNRsMCWM4NM02vf/hTgwsf+1uLpfTw4mcOtQ0G9aCDINiWmRiAdiAz+HTC6Nfi3QKx6uckjT3Pi0K1c1QPnzojahtsi3Zr2L/rfDGin5fE3o+pVxeYXRmVw3dA0Pddzfwz8Co82LFVERMuTbEyXJjGUMaqBgoBQ0Qfjmq5lWO3n9E/76IK8s4PCYHCytoDZgwhsWXPzosGNdYPszY1jTonBnxVgSuuhe6KhyfRDJGsJ3P0gQSqLDG7RBeE6PeF6Wie7X/MI5N2YLonoX+oFce1ZsXicQOJoHs68FdbNznBbAytaREthSHIE2lQPCF8cgT0/jLHtIQbD8sqEbrBuWYM+mqx93ANN8hp+AQOPtI0tirA3AAAAAElFTkSuQmCC";
Imgs["help"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKkSURBVDjLpZPdT5JhGMb9W+BPaK3matVqndXWOOigA6fmJ9DUcrUMlrN0mNMsKTUznQpq6pyKAm8CIogmypcg8GIiX8rHRHjhVbPt6o01nMvZWge/k3vP9duuZ/edAyDnf/hjoCMP2Vr3gUDj3CdV6zT1xZ6iFDaKnLEkBFOmPfaZArWT5sw60iFP+BAbOzTcQSqDZzsNRyCNkcVoaGghzDlVQKylOHJrMrUZ2Yf52y6kc36IxpyoH1lHF7EBgyMKV4jCJ5U/1UVscU4IZOYEa3I1HtwI01hwxlDLhDoJD/wxGr5YGmOLAdRIrVCuhmD3JdA6SQabx12srGB0KSpc86ew4olDOGjH4x4z0gdHDD9+c4TaQQtq+k2Yt0egXYugTmoVZgV9cyHSxXTtJjZR3WNCVfcK/NE0ppYDUNu2QTMCtS0IbrsOrVMOWL27eNJtJLOCDoWXdgeTEEosqPxoBK/TwDzWY9rowy51gJ1dGr2zLpS2aVH5QQ+Hbw88sZ7OClrGXbQrkMTTAQu4HXqUv9eh7J0OSfo7tiIU+GItilpUuM/AF2tg98eR36Q+FryQ2kjbVhximQu8dgPKxPMoeTuH4tfqDIWvCBQ2KlDQKEe9dBlGTwR36+THFZg+QoUxAL0jgsoOQzYYS+wjskcjTzSToVAkA7Hqg4Spc6tm4vgT+eIFVvmb+eCSMwLlih/cNg0KmpRoGzdl+BXOb5jAsMYNjSWAm9VjwesPR1knFilPNMu510CkdPZtqK1BvJQsoaRZjqLGaTzv1UNp9EJl9uNqxefU5QdDnFNX+Y5Qxrn9bDLUR6zjqzsMizeWYdG5gy6ZDbk8aehiuYRz5jHdeDTKvlY1IrhSMUxe4g9SuVwpdaFsgDxf2i84V9zH/us1/is/AdevBaK9Tb3EAAAAAElFTkSuQmCC";
Imgs["comment"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ5SURBVDjLfZJtSFNRGMenRkgY1BKiL30yEkqJrCjrgxBB5Qtmyy3NcGoUuqD5skEm+ZZizpTUmZEw33ML06lzGoQKtRRETXM2Z1LOTBs6LNNw9/w7d+IiuevAj3vO4fx/z+E5lweAtxVRvp5Pqaf8psAF3RQfngtBa1OvCet2Bq5Ge/80K5nkCntR7AwhsP0imF8msCwRfF4k+GQlmFxgYF7YEKerDJzV90vKexwHZm0EX2hw6juBaZ6B8RuDsa8MRiwbggL1IP57A7b6NK36kYbH5xiM0vCwhRXYHYKMmnd/gwlH+dvunPTOehy623ZLlrfO9oCVbA72JsMzjEPK2QP5Gb5UGewJxcXtKBLsQ2JKBkR5OkfHq/QfnKKlH2uONd0f/ecVioM8OzXyC+hRRKFAeBC3A3dAfHwn7ob71tCD5rnFlc3gKiVjM+cUlEbsqZ4xqLE81IT3Lx6gXyXDUMsjpGQqRip1Y2zwJ0W6tWfOyZUQQepEYxpZHW8FTFqsGdvRX5dORLlaKw0mcP0vTsHekAYPXkDFE3VxNplU3cREXQrMdRKoCnOI+5Gycu9zlR4uBbvON7l5nNbkykunGL0VkGvfQqo2QFJtwLNhIDHfZHc/UZvpFVThxik4FfEwNS2nDc+NBMkDwI0+4LoeiNQAV+sJcrsIxMnNJDD0noxTMFt4CAPqUiSp5xHbAcRoCIQ1BBFVBGFPAYFiAYPNSkxl+4JTYFYGv6mVxyBU2oe4LiC+GxDrKPR7rQU4G9eBl/ejMVEW1sspMDUk8V+VxPsHRDZkHbjcZvGL7lrxj+pe8xN2rviEa63HLlUVvS6JPWxqlPC5BH8A3ojcdBpMJSoAAAAASUVORK5CYII=";
Imgs["world"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMtSURBVDjLVZNLa1xlAIafc5szk8xkMkkm5MKY2EpT2qa2MTVCmoLS2gq6EKooimAW7iQb/0I2bgTRIog0oFW7KQpCS7VqrSmmJGlSQtswqWlLLmbGmcmcZM6cy/edz00r6bt8eXh4N6+mlGJnxiZHR4APgSNAFjCBKjClInXm05Gzl3by2mPB2OSoCUwAp1/LHbcziSyO24gbgJAegg2urF8UUsifhZBvfvXK99v/C8YmRy3gt8G2/cMv517E8Wx8ApYcjZiyKbkRSgQkcFn3rzG9Nn1LhOLYt2/8UNUfLZkYaN0zfLRrkLIMCHUNIXTqIoZLjLJvU/ASrFQtnko+z2BH38HAD78DMConHh4FPn5nz6vGgqyxTp16JNj2kpR9C8eD/OoW1VoNO1NCS+d5oW0vV27f2PX11MS8MTR6+JOTXUMHNCPBui5AtdMpk8xsGNQ9ndur20TxCnbPIn5TnmJUwaxIDrTm9Jn7d1tM4EiuqZs5d41iXGefsZsIwYNCgOfVSXconJbLLEWb4CuahU2+6HO8d4DQF/0m0NpgNvLAXaPgu6QadrEZpKhUItJZj/aMS1EewvHnsdUWW/+WKG82kEykCAPRbCqlNE1B4DsocpiW5OJfIVoiyfqSQFdNdGXrpLZGcFZDPKYJg2VQCiGEZkoRlZ3A6W41mknFn2WlaOKFFrG4Tbw9wb2/S3g3miHySLdbNDd2kzYKVGpVpIiqugjF7P3yQ55pyLFWmCSyVokZPqHnEoYmsWQGuyWOGdexNIkRFOnqbGN5bRngjh4G4rMLd6+KnmQW012lWrpOJuNjCh9LU9i6gRkEZHIrpNv/QK8vcijXz5lfLijgS+PmuYV75+fPDXr1Wt9znfsouy5x+2miuoltW1iawBJV0o0/wT8lBvbv5WZ+gaWNlasz43MfmQChH777e37uT78eHDx5+BiLBROjqhDaFmGkQ1KS6+mlr7+XX2evc+nWVB54+4kznfr8pZQIxXkRyhPvDb9vIjtQqgFN12hLO2yUZ/ni8o8SuAa8NTM+t/GE4HGGx4del0J+IGXUH8ko86iuAneAszPjc9/s5P8DuO6ZcsXuRqAAAAAASUVORK5CYII=";
Imgs["ship"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHzSURBVHjajFJLSxtRFP7uTH6BdFECLhwJnQgGpYsuKyUtJRtTV/Gx68ZWV7rsX6ha0CG00qUP8BFBDISYoOBaaqGkNJ1xYTbdZCwY3Zh7PPdObGudiPNi5s53zv0eRxAR2h1d8VESkPAqK6ItSDUIuy07Qzv53zT9bo0edg5SO5yBOw4hIhrUvAMT2sDqGaGFuY8o7+fhVqvojEZhsZx7N2icXfAzgkS0DrvjF573mThvNEIZREKpK2+YOOl3YikG0MZr8X8KVjxDzuwiSgcFzL5fZI6X6O9/pJvWff9WIiESTJBaZeeKu+sgaerdAzbGfTxoMi1gZi4bAIwmvhx6gOTYQnQY17RvOMDX9NQbJF+kISWQeGwxkhfpL/vu+LCuEV32MDlOFhOT43rn+Q+fUd7b5vkzlRhU3Z+ondS4NhDhn/rKOGQdB+NvJ1UKQgOdmU8aUNzfRnIghdJeAZLpq1FGq1idid5eWFYMhd0ip0OIeJUloeikXw3pzqpdCw9qcoh6GpVY5aTUAbOt2MjlOJFVoT1wOZpcblNb5Ho/GGNqM4+946BIcDepJsLQ3xtbQfGtFGIPKvh69A0TU6/x7GmKCyRqtRP+I1n7KXy/jpdPLvHvVN0YJCXFbQ2KZY9RoIW0dpelBusj5H1f/hPHlQADAFcv+VoR+XzCAAAAAElFTkSuQmCC";
Imgs["tecs"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGSSURBVCjPVVFNSwJhEF78Ad79Cf6PvXQRsotUlzKICosuRYmR2RJR0KE6lBFFZVEbpFBSqKu2rum6llFS9HHI4iUhT153n6ZtIWMOM+/MM88z7wwH7s9Ub16SJcnbmrNcxVm2q7Z8/QPvEOtntpj92NkCqITLepEpjix7xQtiLOoQ2b6+E7YAN/5nfOEJ2WbKqOIOJ4bYVMEQx4LfBBQDsvFMhUcCVU1/CxVXmDBGA5ZETrhDCQVcYAPbyEJBhvrnBVPiSpNr6cYDNCQwo4zzU/ySckkgDYuNuVpI42T9k4gLKGMPs/xPzzovQiY2hQYe0jlJfyNNhTqiWDYBq/wBMcSRpnyPzu1oS7WtxjVBSthU1vgVksiQ3Dn6Gp5ah2YOKQo5GiuHPA6xT1EKpxQNCNYejgIR457KKio0S56YckjSa9jo//3mrj+BV0QQagqGTOo+Y7gZIf1puP3WHoLhEb2PjTlCTCWGXtbp8DCX3hZuOdaIc9A+aQvWk4ihq95p67a7nP+u+Ws+r0dql9z/zv0NCYhdCPKZ7oYAAAAASUVORK5CYII=";
Imgs["build"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG+SURBVDjLnZNNSwJRFIbfGccPCKJMoqSwdBcEobUQWrmIChJs07pVuA36By0KWrTtB7hqGSQSFBGCbdq0ECkhSmgxldmHOuP9aO4VpSEV6cDhHu7c85z3nLkXnHP048/RKO+0r6JPO9nc7LivCErL8vk8p5SCEILWKlzXdWSzWfj9foRCIcTjcaWVo/2mNRoNBINBGf8GizgWi8k1k8nYFNgAopqwi0KzM2oxKAMYZ5YiYHmGwDCM7gDTNGWV8Fi54yCBof4AudKwrEpYUwGxqjPGkZgjqNfrvQHCFsZfuvzO4d4KxEdx8PLBa/XPpQJGm7PgloKN+UZvBRX6LgGLk3oXBV588c/OgJ1ccso15MEKX7X6ZUilUlBVFYqiyDWRSKBivONxvGgDtG+ilTStOh3IV25lNU3TEA6HEYlEZCyg5VoZrgEX1o6W122A7ezWIKhyPuL04ayUlodFkvCWihqpYv9qFwFfAMSkB0uHsdk2gBKaNEyT3+kFfL9Wkbk5BXMyOByONiR9nYZWd+Ht40VcOD8lbLc9A3rs2ZMPw/IqKAq4l/JKxZKtX68yitenMibMgNtteuJ/HtN/7AcakErwOe40HwAAAABJRU5ErkJggg==";
Imgs["option"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHaSURBVDjLlZO7a1NRHMfzfzhIKQ5OHR1ddRRBLA6lg4iTd5PSas37YR56Y2JiHgg21uoFxSatCVFjbl5iNBBiMmUJgWwZhCB4pR9/V4QKfSQdDufF5/v7nu85xwJYprV0Oq0kk8luIpEw4vG48f/eVDiVSikCTobDIePxmGg0yokEBO4OBgNGoxH5fJ5wOHwygVgsZpjVW60WqqqWzbVgMIjf78fn8xlTBcTy736/T7VaJRQKfQoEArqmafR6Pdxu9/ECkUjkglje63Q6NBoNisUihUKBcrlMpVLB6XR2D4df3VQnmRstsWzU63WazSZmX6vV0HWdUqmEw+GY2Gw25SC8dV1l1wrZNX5s3qLdbpPL5fB6vXumZalq2O32rtVqVQ6GuGnCd+HbFnx9AZrC+MkSHo/np8vlmj/M7f4ks6yysyawgB8fwPv70HgKG8v8cp/7fFRO/+AllewqNJ/DhyBsi9A7J1QTkF4E69mXRws8u6ayvSJwRqoG4K2Md+ygxyF5FdbPaMfdlIXUZfiyAUWx/OY25O4JHBP4CtyZ16a9EwuRi1CXs+5K1ew6lB9DXERX517P8tEsPDzfNIP6C5YeQewSrJyeCd4P0bnwXYISy3MCn5oZNtsf3pH46e7XBJcAAAAASUVORK5CYII=";
try{
GM_addStyle(".none{}\
#ARMOREDBox{ height:160px; position:absolute; width:170px; z-index:18; }\
#ARMRD_Iframe{ height:150px; margin-top:0; position:absolute; width:170px; z-index:18; }\
#ARMRD_Iframe.Small{ height:150px; margin-top:0; width:170px; }\
#ARMRD_Iframe.Big{ margin-top:-300px; height:450px; width:700px; }\
#ARMRD_Menu{ background:#000; border:1px dashed #999; height:16px; padding:1px; margin:0; margin-top:-20px; position:absolute; width:170px; z-index:18; opacity: .85; -moz-border-radius:10px 10px 0 0;}\
#ARMRD_Menu.Small{ margin-top:-20px; width:166px; }\
#ARMRD_Menu.Big{ margin-top:-320px; width:696px; }\
#ARMRD_Menu img{ cursor:pointer; margin:0 1px; opacity:.65; }\
#ARMRD_Menu img:hover{ opacity:1; }");
} catch(e) {}
/******************************************/
/**************** FUNCTS ******************/
/******************************************/
function AjaxGet( file, gets, id, finalefunction ) {
	GM_xmlhttpRequest({
		method: "GET",
		url: ChatPlace+file+"?"+gets+"&amp;"+(new Date().getTime()),
		headers: {
			"User-Agent": "Mozilla/5.0",            // If not specified, navigator.userAgent will be used.
			"Accept": "text/xml"                    // If not specified, browser defaults will be used.
		},
		onload: function(response) {
			// Inject responseXML into existing Object if not present
			//if (!response.responseXML)
			//	response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			/*
			GM_log([
				response.status,
				response.statusText,
				response.readyState,
				response.responseHeaders,
				response.responseText,
				response.finalUrl,
				response.responseXML
			].join("\n"));
			*/
			var finalResult = response.responseText;
			//finalResult = finalResult.replace(regexp,"");
			document.getElementById(id).innerHTML = finalResult;
			eval(finalefunction);
		}
	});
};
function AjaxPost( file, gets, post, finalefunction ) {
	GM_xmlhttpRequest({
		method: "POST",
		url: ChatPlace+arguments[0]+"?"+arguments[1],
		data: arguments[2],
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			eval(finalefunction);
		}
	});
};
function getShipNum() {
	try{
		try{
			return document.getElementById(arguments[0]+arguments[1]).getElementsByTagName('span').item(1).innerHTML.replace(/[^0-9]/g,"");
		} catch(e) {
			return document.getElementById(arguments[0]+arguments[1]).getElementsByTagName('span').item(2).innerHTML.replace(/[^0-9]/g,"");
		};
	} catch(e) {
		return 0;
	}
};
function ShipDetails( dados ) {
	dados = (dados.split("\r\n"));
	var text = "";
	var nomes = new Array();
	var cords = new Array();
	var naves = new Array();
	for(var i=0;i<dados.length-1;i++){
		nomes[i] = dados[i].replace(/^(.*)( (\[[0-9]+\:[0-9]+\:[0-9]+\]) )(.*)$/g,"$1");
		cords[i] = dados[i].replace(/^(.*)( (\[[0-9]+\:[0-9]+\:[0-9]+\]) )(.*)$/g,"$2");
		naves[i] = dados[i].replace(/^(.*)( (\[[0-9]+\:[0-9]+\:[0-9]+\]) )(.*)$/g,"$4").split(" ");
	};
	for(var i=0;i<nomes.length;i++){
		text += "<div class='box'><b>"+nomes[i]+" "+cords[i]+"</b><p>";
		var l=0;
		for(var j=0;j<ships_names.length;j++) {
			text += j%2==0?"<br /><span>":"";
			text += "<label>"+ships_names[j]+":</label>"+naves[i][j]+"<br />";
			text += j%2==0?"</span>":"";
			l+=parseInt(naves[i][j]);
		};
		text += "<label>"+lang.total+":</label>"+l+"</p></div>";
	};
	document.getElementById("ARMOREDDetails").innerHTML = text;
};
function getTechNum() {
	try{
		return document.getElementById(arguments[0]+arguments[1]).getElementsByTagName('span').item(1).childNodes[1].textContent.replace(/[^0-9]/g,"");
	} catch(e) {
		return document.getElementById(arguments[0]+arguments[1]).getElementsByTagName('span').item(2).childNodes[1].textContent.replace(/[^0-9]/g,"");
	};
};
function TechDetails( dados ) {
	dados = (dados.split(Sep));
	var text = "<div class='box'><b>"+lang.tecnologies+"</b><p>";
	var j=0;
	for(var i=0;i<dados.length;i++) {
		text += i%2==0?"<br /><span>":"";
		text += "<label>"+techs_names[i]+":</label>"+dados[i]+"<br />";
		text += i%2==0?"</span>":"";
		j+=parseInt(dados[i]);
	};
	text += "<label>"+lang.total+":</label>"+j+"</p></div>";
	document.getElementById("ARMOREDDetails").innerHTML = text;
};
function getResoNum() {
	try{
		if(document.getElementById(arguments[0]+arguments[1]).getElementsByTagName('span').item(3))
		var returnee = document.getElementById(arguments[0]+arguments[1]).getElementsByTagName('span').item(3).innerHTML.replace(/[^0-9]/g,"");
		if(returnee==""|| parseInt(returnee)>30|| typeof returnee=="undefined")
			return document.getElementById(arguments[0]+arguments[1]).getElementsByTagName('span').item(1).innerHTML.replace(/[^0-9]/g,"");
		else
			return returnee;
	} catch(e) {
		if(document.getElementById(arguments[0]+arguments[1]).getElementsByTagName('span').item(3))
		var returnee = document.getElementById(arguments[0]+arguments[1]).getElementsByTagName('span').item(3).lastChild.textContent.replace(/[^0-9]/g,"");
		if(returnee==""|| parseInt(returnee)>30|| typeof returnee=="undefined")
			return document.getElementById(arguments[0]+arguments[1]).getElementsByTagName('span').item(1).lastChild.textContent.replace(/[^0-9]/g,"");
		else
			return returnee;
	};
};
function ResoDetails( dados ) {
	dados = (dados.split("\r\n"));
	var text = "";
	var nomes = new Array();
	var cords = new Array();
	var resos = new Array();
	for(var i=0;i<dados.length-1;i++){
		nomes[i] = dados[i].replace(/^(.*)( (\[[0-9]+\:[0-9]+\:[0-9]+\]) )(.*)$/g,"$1");
		cords[i] = dados[i].replace(/^(.*)( (\[[0-9]+\:[0-9]+\:[0-9]+\]) )(.*)$/g,"$2");
		resos[i] = dados[i].replace(/^(.*)( (\[[0-9]+\:[0-9]+\:[0-9]+\]) )(.*)$/g,"$4").split(" ");
	};
	for(var i=0;i<nomes.length;i++){
		text += "<div class='box'><b>"+nomes[i]+" "+cords[i]+"</b><p>";
		var l=0;
		for(var j=0;j<resos_names.length;j++) {
			text += j%2==0?"<br /><span>":"";
			text += "<label>"+resos_names[j]+":</label>"+resos[i][j]+"<br />";
			text += j%2==0?"</span>":"";
			l+=parseInt(resos[i][j]);
		};
		text += "<label>"+lang.total+":</label>"+l+"</p></div>";
	};
	document.getElementById("ARMOREDDetails").innerHTML = text;
};
function toTime() {
	var time = "";
	if(Math.floor(arguments[0])=="Infinity"||Math.floor(arguments[0])=="-Infinity")
		return "&infin;";
	time += Math.floor(arguments[0])+"h";
	if(Math.floor(arguments[0])<99)
		time += Math.floor(((arguments[0]*100)-Math.floor(arguments[0]))%60)+"m";
	return time;
};
/******************************************/
/*************** PROGRAMA *****************/
/******************************************/
//CAROLINA DE MIRANDA FIGUEIREDO - VANESSA DE ALMEIDA SILVA
/******************************************/
/*************** IMPERIO! *****************/
/******************************************/
if(location.href.match(/^http:\/\/localhost\/ligona.org\/nexus\/$/g ) || location.href.match(/^http:\/\/(www.)?ligona.org(\/)nexus(\/)?$/g ) || location.href.match(/^http:\/\/nexus.psicologianaweb.com\/$/g )) {
	//unsafeWindow.addEventListener( 'load', function() {
		var u = GM_getValue("Player",lang.undefined);
		var p = GM_getValue("myWorl","").split(Sep);
		var c = GM_getValue("myCord","").split(Sep);
		var t = GM_getValue("myTech","").split(Sep);
		var m = GM_getValue("myImgs","").split(Sep);
		var r = new Array();
		var s = new Array();
		document.childNodes[0].innerHTML = "<html><head><title></title></head><body></body></html>";
		var titulo = lang.imperium+" "+Title+" - "+u;
		document.getElementsByTagName('title').item(0).innerHTML = titulo;
		var ico = document.createElement('link');
		ico.setAttribute("rel","icon");
		ico.setAttribute("type","image/png");
		ico.setAttribute("href",Imgs["world"]);
		document.getElementsByTagName('html').item(0).appendChild( ico );
		try{
			GM_addStyle("*{ margin:0; padding:0; text-decoration:none; }\
			html{  }\
			body{ background:#000 url(http://uni101.ogame.com.br/game/img/background/background_voll_2.jpg) 0 -20px no-repeat fixed; color:#eee; height:100%; padding:10px 30px !important;  }\
			table{ font:normal 11px verdana; margin:0 auto; opacity:.7; -moz-box-shadow:#fff 0 0 20px; -moz-border-radius:7px; }\
			th,b{ background:#469; font:bold 1em arial; padding:1px 5px; -moz-box-shadow:#fff 0 0 1px; text-shadow:1px 1px .3em #000; }\
			td{ background:#000; border-bottom:1px solid #32383e; border-right:1px solid #32383e; padding:1px 2px; text-align:center; }\
			tr:first-child th{ -moz-border-radius:9px 9px 0 0; }\
			tr:last-child td:last-child{ -moz-border-radius:0 0 7px; }\
			th.last{ -moz-border-radius:0 0 0 9px; }\
			b{ display:block; margin:3px 0; }\
			b img{ background:#000; -moz-box-shadow:#fff 0 0 10px; -moz-border-radius:24px; }\
			span{ color:#246; }\
			.r{ text-align:right; }\
			#siteFooter{ font:normal 11px verdana; padding:30px 0 100px 0; text-align:center; }");
		} catch(e) {}
		var f = "<table cellspacing='0'>";
		f += "<tr><th colspan='"+(2+p.length)+"' class='first'>"+titulo+"</th></tr>";
		/*planetas*/
		f += "<tr>";
		f += "<th rowspan='2'>"+lang.planets+":</th>";
		f += "<td class='r'>&nbsp;</td>";
		for(var j=0;j<p.length;j++) {
			r[j] = GM_getValue("myReso"+j,"").split(Sep);
			s[j] = GM_getValue("myShip"+j,"").split(Sep);
			f += "<td><b><img src='http://andromeda.ogame.com.br/game/img/planets/"+m[j]+"' alt='' /><br />"+p[j]+"</b></td>";
		};
		f += "</tr>";
		f += "<tr>";
		f += "<td class='r'>"+lang.coords+":</td>";
		for(var j=0;j<p.length;j++) {
			f += "<td>"+c[j]+"</td>";
		};
		f += "</tr>";
		/* recursos */
		for(var j=0;j<resos_names.length;j++) {
			f += "<tr>";
			if(j==0)
				f += "<th rowspan='"+resos_names.length+"'>"+lang.structures+":</th>";
			f += "<td class='r'>"+resos_names[j].replace(/ /g,"&nbsp;")+":</td>";
			for(var k=0;k<p.length;k++) {
				f += "<td>";
				f += r[k][j]==0?"<span>":"";
				f += r[k][j];
				f += r[k][j]==0?"</span>":"";
				f += "</td>";
			};
			f += "</tr>";
		};
		/* naves */
		//ships_names[ships_names.length] = 'total';
		for(var j=0;j<ships_names.length;j++) {
			f += "<tr>";
			if(j==0)
				f += "<th rowspan='"+ships_names.length+"'>"+lang.ships+":</th>";
			f += "<td class='r'>"+ships_names[j].replace(/ /g,"&nbsp;")+":</td>";
			for(var k=0;k<p.length;k++) {
				f += "<td>";
				f += s[k][j]==0?"<span>":"";
				f += s[k][j];
				f += s[k][j]==0?"</span>":"";
				f += "</td>";
			};
			f += "</tr>";
		};
		/* tecnologias */
		for(var j=0;j<techs_names.length;j++) {
			f += "<tr>";
			if(j==0)
				f += "<th rowspan='"+techs_names.length+"' class='last'>"+lang.tecnologies+":</th>";
				f += "<td class='r'>"+techs_names[j].replace(/ /g,"&nbsp;")+":</td>";
				f += "<td colspan='"+p.length+"'>";
				f += t[j]==0?"<span>":"";
				f += t[j];
				f += t[j]==0?"</span>":"";
				f += "</td>";
			f += "</tr>";
		};
		f += "</table>";
		f += "<div id='siteFooter' class='c'></div>";
		document.getElementsByTagName('body').item(0).innerHTML = f;
	//}, false );
}
/******************************************/
/**************** AMIGOS ******************/
/******************************************/
if(document.getElementById('buddies')) {
	var numbudd = 0;
	var Buddies = new Array();
	var j=0;
	for(var i=1;i<document.getElementsByTagName('table').item(0).getElementsByTagName('tr').length;i++){
		Buddies[j] = document.getElementsByTagName('table').item(0).getElementsByTagName('tr').item(i).getElementsByTagName('td').item(1).innerHTML;
		j++;
	}
	GM_setValue('myBuds',Buddies.join(Sep));
}
/******************************************/
/**************** MUNDOS ******************/
/******************************************/
if(document.getElementById('myWorlds')) {
	var Planets = new Array();
	var Coords = new Array();
	var Images = new Array();
	var p_id = 0; /* planeta ativo */
	var j=0;
	var coord_exp = /^\[([0-9]+)\:([0-9]+)\:([0-9]+)\]$/g;
	for(var i=1;i<document.getElementById('myWorlds').getElementsByTagName('div').length;i++){
		Planets[j] = document.getElementById('myWorlds').getElementsByTagName('div').item(i).getElementsByTagName('span').item(0).innerHTML;
		Coords[j] = document.getElementById('myWorlds').getElementsByTagName('div').item(i).getElementsByTagName('span').item(1).innerHTML;
		Images[j] = document.getElementById('myWorlds').getElementsByTagName('div').item(i).getElementsByTagName('img').item(0).src.replace(/^(.*\/)([^\/]+)$/g,"$2");
		var actions = "";
		actions += '<span style="display:block;float:right;margin:2px 0 0 2px;position:absolute;width:19px;">';
		if(document.getElementById('myWorlds').getElementsByTagName('div').item(i).getElementsByTagName('a').item(0).href.indexOf("#")>-1) {
			actions += '<a href="index.php?page=fleet1&session='+sessid+'&amp;galaxy='+Coords[j].replace(coord_exp,"$1")+'&amp;system='+Coords[j].replace(coord_exp,"$2")+'&amp;position=16&amp;type=1&amp;mission=15"><img src="img/layout/icon-expedition.gif" style="padding:1px;" /></a>';
			actions += '<a href="index.php?page=fleet1&amp;galaxy='+Coords[j].replace(coord_exp,"$1")+'&amp;session='+sessid+'&amp;system='+Coords[j].replace(coord_exp,"$2")+'&amp;position='+Coords[j].replace(coord_exp,"$3")+'&amp;type=2&amp;mission=8"><img src="img/layout/icon-tf-abbauen.gif" style="padding:1px;" /></a><br />';
			p_id = j; //define id do planeta ativo
		} else {
			actions += '<a href="index.php?page=fleet1&amp;galaxy='+Coords[j].replace(coord_exp,"$1")+'&amp;session='+sessid+'&amp;system='+Coords[j].replace(coord_exp,"$2")+'&amp;position='+Coords[j].replace(coord_exp,"$3")+'&amp;type=1&amp;mission=4"><img src="img/layout/icon-stationieren.gif" style="padding:1px;" /></a><br />';
			actions += '<a href="index.php?page=fleet1&amp;galaxy='+Coords[j].replace(coord_exp,"$1")+'&amp;session='+sessid+'&amp;system='+Coords[j].replace(coord_exp,"$2")+'&amp;position='+Coords[j].replace(coord_exp,"$3")+'&amp;type=2&amp;mission=8"><img src="img/layout/icon-tf-abbauen.gif" style="padding:1px;" /></a><br />';
			actions += '<a href="index.php?page=fleet1&amp;galaxy='+Coords[j].replace(coord_exp,"$1")+'&amp;session='+sessid+'&amp;system='+Coords[j].replace(coord_exp,"$2")+'&amp;position='+Coords[j].replace(coord_exp,"$3")+'&amp;type=1&amp;mission=3"><img src="img/layout/icon-transport.gif" style="padding:1px;" /></a>';
		}
		actions += '</span>';
		document.getElementById('myWorlds').getElementsByTagName('div').item(i).innerHTML = actions + document.getElementById('myWorlds').getElementsByTagName('div').item(i).innerHTML;
		j++;
	}
	GM_setValue('myWorl',Planets.join(Sep));
	GM_setValue('myCord',Coords.join(Sep));
	GM_setValue('myImgs',Images.join(Sep));
}
/******************************************/
/***************** NAVES ******************/
/******************************************/
if( /* location.href.match("shipyard") || */ location.href.match("fleet1") ) {
	/* define array dos planetas */
	var Ships = new Array();
	/* define array das naves no planeta */
	for(var i=0;i<Planets.length;i++) {
		try{
			Ships[i] = GM_getValue('myShip'+i).split(Sep);
		} catch(e) {
			Ships[i] = new Array();
		};
	};
	/* codigos das naves */
	var ships_codes = new Array(
		'204',//caca ligeiro
		'205',//caca pesado
		'206',//cruzador
		'207',//Nave de Batalha
		'215',//bombarde
		'211',//intercep
		'213',//destruid
		'214',//estrelad
		'202',//carg_lev
		'203',//carg_pes
		'208',//nave_col
		'209',//reciclad
		'210'/*,//sonda_es
		'212'*///satelite
	);
	/* define o id */
	var t_id = (location.href.match("shipyard")?"details":"button");
	for(var i=0;i<ships_codes.length;i++) {
		Ships[p_id][i] = getShipNum( t_id, ships_codes[i] );
	}
	GM_setValue('myShip'+p_id,Ships[p_id].join(Sep));
}
/* pagina de naves */
if(document.getElementById("ARMOREDShip")) {
	if(GM_getValue('myBuds',"")=="") {
		document.getElementById('ARMOREDShip').innerHTML = '<p style="border:1px dotted #999;border-top:0 none;">'+lang.nobuddy+'</p>';
	} else {
		if(GM_getValue("UpToShip",0) < (new Date().getTime())) {
			/* define array dos planetas */
			var Planets = GM_getValue("myWorl","").split(Sep);
			var Coordes = GM_getValue("myCord","").split(Sep);
			/* define array dos planetas */
			var Ships = new Array();
			/* define array das naves no planeta */
			var ok = true;
			for(var i=0;i<Planets.length;i++) {
				Ships[i] = GM_getValue('myShip'+i,"").split(Sep);
				if(Ships[i]=="") {
					ok = false;
					break;
				}
			};
			//
			if(ok===true) { // se tem todos os dados das naves
				var text = "";
				for(var i=0;i<Ships.length;i++) {
					text += Planets[i]+" "+Coordes[i]+" "+Ships[i].join(" ")+"\r\n";
				}
				AjaxPost(
					"saver.php",
					"u="+GM_getValue('Player',lang.undefined)+"&v="+GM_getValue('Version',0)+"&b="+GM_getValue('myBuds',""),
					"file="+GM_getValue('Player',lang.undefined)+"&data="+text,
					""
				);
				GM_setValue("UpToShip",(parseInt(new Date().getTime()+(15*60000))).toString());
			} else { // se nao tem todos os dados das naves
				document.getElementById("ARMOREDShip").innerHTML = "<p>"+lang.noship+"</p>";
			}
		}
		if(document.getElementById("ARMOREDDetails")) {
			AjaxGet(
				unsafeWindow.ship_file,
				"",
				"ARMOREDDetails",
				"ShipDetails(response.responseText);"
			);
		}
		document.getElementById('ARMOREDShip').innerHTML += '<p>'+lang.shipnum+'</p>';
	}
}
/******************************************/
/***************** TECS *******************/
/******************************************/
if( location.href.match("research") ) {
	/* define array */
	var Techs = new Array();
	/* codigos das tecnologias */
	var techs_codes = new Array(
		'113',// Tecnologia de Energia
		'120',// Tecnologia Laser
		'121',// Tecnologia de Íons
		'114',// Tecnologia de Hiperespaço
		'122',// Tecnologia de Plasma
		//avancadas
		'106',// Tecnologia de Espionagem
		'108',// Tecnologia de Computadores
		'124',// Astrofísica
		'123',// Rede Intergaláctica de Pesquisas
		'199',// Tecnologia de Gravitação
		//motores
		'115',// Motor de Combustão
		'117',// Motor de Impulsão
		'118',// Motor Propulsor de Hiperespaço
		//combate
		'111',// Tecnologia de Blindagem
		'109',// Tecnologia de Armas
		'110' // Tecnologia de Escudo
	);
	for(var i=0;i<techs_codes.length;i++) {
		Techs[i] = getTechNum( "details", techs_codes[i] );
	};
	GM_setValue('myTech',Techs.join(Sep));
}
/* pagina de tecnologias */
if(document.getElementById("ARMOREDTech")) {
	if(document.getElementById("ARMOREDDetails")) {
		AjaxGet(
			unsafeWindow.tech_file,
			"",
			"ARMOREDDetails",
			"TechDetails(response.responseText);"
		);
	} else {
		if(GM_getValue('myBuds',"")=="") {
			document.getElementById('ARMOREDTech').innerHTML = '<p style="border:1px dotted #999;border-top:0 none;">'+lang.nobuddy+'</p>';
		} else if(GM_getValue('myTech',"")=="") {
			document.getElementById("ARMOREDTech").innerHTML = "<p>"+lang.notech+"</p>";
		} else if(GM_getValue('myTech',"") != "" && GM_getValue("UpToTech",0) < (new Date().getTime())) {
			/* define array dos planetas */
			var text = GM_getValue('myTech',"");
			AjaxPost(
				"saver.php",
				"u="+GM_getValue('Player',lang.undefined)+"&v="+GM_getValue('Version',0)+"&b="+GM_getValue('myBuds',""),
				"file=tech/"+GM_getValue('Player',lang.undefined)+"&data="+text,
				""
			);
			GM_setValue("UpToTech",(parseInt(new Date().getTime()+(15*60000))).toString());
		}
	}
}
/******************************************/
/*************** RESOURCES ****************/
/******************************************/
if( location.href.match("resources") && !location.href.match("resourceSettings") ) {
	/* define array dos planetas */
	var Resos = new Array();
	/* define array das construcoes no planeta */
	for(var i=0;i<Planets.length;i++) {
		try{
			Resos[i] = GM_getValue('myReso'+i).split(Sep);
		} catch(e) {
			Resos[i] = new Array();
		};
	};
	/* codigos das construcoes */
	var resos_codes = new Array(
		'1', //Mina de Metal
		'2', //Mina de Cristal
		'3', //Sintetizador de Deutério
		'4', //Planta de Energia Solar
		'5', //Planta de Fusão
		'6', //Satélite Solar
		'7', //Armazém de Metal
		'8', //Armazém de Cristal
		'9' //Tanque de Deutério
	);
	/* define o id */
	for(var i=0;i<resos_codes.length;i++) {
		Resos[p_id][i] = getResoNum( 'button', i+1 );
	}
	GM_setValue('myReso'+p_id,Resos[p_id].join(Sep));
}
/* pagina de recursos */
if(document.getElementById("ARMOREDReso")) {
	if(GM_getValue('myBuds',"")=="") {
		document.getElementById('ARMOREDReso').innerHTML = '<p style="border:1px dotted #999;border-top:0 none;">'+lang.nobuddy+'.</p>';
	} else {
		if(GM_getValue("UpToReso",0) < (new Date().getTime())) {
			/* define array dos planetas */
			var Planets = GM_getValue("myWorl","").split(Sep);
			var Coordes = GM_getValue("myCord","").split(Sep);
			/* define array dos planetas */
			var Resos = new Array();
			/* define array das naves no planeta */
			var ok = true;
			for(var i=0;i<Planets.length;i++) {
				Resos[i] = GM_getValue('myReso'+i,"").split(Sep);
				if(Resos[i]=="") {
					ok = false;
					break;
				}
			};
			//
			if(ok===true) { // se tem todos os dados das naves
				var text = "";
				for(var i=0;i<Resos.length;i++) {
					text += Planets[i]+" "+Coordes[i]+" "+Resos[i].join(" ")+"\r\n";
				}
				AjaxPost(
					"saver.php",
					"u="+GM_getValue('Player',lang.undefined)+"&v="+GM_getValue('Version',0)+"&b="+GM_getValue('myBuds',""),
					"file=reso/"+GM_getValue('Player',lang.undefined)+"&data="+text,
					""
				);
				GM_setValue("UpToReso",(parseInt(new Date().getTime()+(15*60000))).toString());
			} else { // se nao tem todos os dados das naves
				document.getElementById("ARMOREDReso").innerHTML = "<p>"+lang.noreso+"</p>";
			}
		}
		if(document.getElementById("ARMOREDDetails")) {
			AjaxGet(
				unsafeWindow.reso_file,
				"",
				"ARMOREDDetails",
				"ResoDetails(response.responseText);"
			);
		}
	}
}
/******************************************/
/************** STRUCTURES ****************/
/******************************************/
/*
if( location.href.match("station") ) {
	/* define array dos planetas *//*
	var Strus = new Array();
	/* define array das construcoes no planeta *//*
	for(var i=0;i<Planets.length;i++) {
		try{
			Strus[i] = GM_getValue('myStru'+i).split(Sep);
		} catch(e) {
			Strus[i] = new Array();
		};
	};
	/* codigos das construcoes *//*
	var struc_codes = new Array(
		'14', //F&aacute;brica de Rob&ocirc;s
		'21', //Hangar
		'31', //Laborat&oacute;rio de Pesquisas
		'34', //Dep&oacute;sito da Alian&ccedil;a
		'44', //Silo de M&iacute;sseis
		'15', //F&aacute;brica de Nanites
		'33' //Terra-Formador
	);
	/* define o id *//*
	for(var i=0;i<struc_codes.length;i++) {
		Strus[p_id][i] = getResoNum( 'details', struc_codes[i] );
	}
	GM_setValue('myStru'+p_id,Strus[p_id].join(Sep));
}
/* pagina dos recursos *//*
if(document.getElementById("ARMOREDReso")) {
	if(GM_getValue('myBuds',"")=="") {
		//document.getElementById('ARMOREDReso').innerHTML += '<p style="border:1px dotted #999;border-top:0 none;">'+lang.nobuddy+'.</p>';
	} else {
		if(GM_getValue("UpToStru",0) < (new Date().getTime())) {
			/* define array dos planetas *//*
			var Planets = GM_getValue("myWorl","").split(Sep);
			var Coordes = GM_getValue("myCord","").split(Sep);
			/* define array dos planetas *//*
			var Strus = new Array();
			/* define array das naves no planeta *//*
			var ok = true;
			for(var i=0;i<Planets.length;i++) {
				Strus[i] = GM_getValue('myStru'+i,"").split(Sep);
				if(Strus[i]=="") {
					ok = false;
					break;
				}
			};
			//
			if(ok===true) { // se tem todos os dados das naves
				var text = "";
				for(var i=0;i<Strus.length;i++) {
					text += Planets[i]+" "+Coordes[i]+" "+Strus[i].join(" ")+"\r\n";
				}
				AjaxPost(
					"saver.php",
					"u="+GM_getValue('Player',lang.undefined)+"&v="+GM_getValue('Version',0)+"&b="+GM_getValue('myBuds',""),
					"file=stru/"+GM_getValue('Player',lang.undefined)+"&data="+text,
					""
				);
				GM_setValue("UpToStru",(parseInt(new Date().getTime()+(15*60000))).toString());
			} else { // se nao tem todos os dados das naves
				document.getElementById("ARMOREDReso").innerHTML += "<br /><p>"+lang.nostru+"</p>";
			}
		}
		if(document.getElementById("ARMOREDDetails")) {
			AjaxGet(
				unsafeWindow.stru_file,
				"",
				"ARMOREDDetails",
				"StruDetails(response.responseText);"
			);
		}
	}
}
*/
/******************************************/
/**************** OPCOES ******************/
/******************************************/
if(document.getElementById("ARMOREDOptions")) {
	var OptionBody = "";
	//OptionBody += "<label>"+lang.opt1+":</label>";
	//OptionBody += "<input id='OptColo' type='text' value='"+GM_getValue("Opt1","#cccccc")+"' /><br /><br />";
	OptionBody += "<label>"+lang.opt2+":</label>";
	OptionBody += "<input id='OptMeta' type='checkbox'"+(GM_getValue('Opt2',true)?" checked='checked'":"")+" /><br /><br />";
	OptionBody += "<label>"+lang.opt3+":</label>";
	OptionBody += "<input id='OptCris' type='checkbox'"+(GM_getValue('Opt3',true)?" checked='checked'":"")+" /><br /><br />";
	OptionBody += "<label>"+lang.opt4+":</label>";
	OptionBody += "<input id='OptDeut' type='checkbox'"+(GM_getValue('Opt4',true)?" checked='checked'":"")+" /><br /><br />";
	OptionBody += "<label>"+lang.opt5+":</label>";
	OptionBody += "<input id='OptEner' type='checkbox'"+(GM_getValue('Opt5',true)?" checked='checked'":"")+" /><br /><br />";
	OptionBody += "<label id='LangOpt'>"+lang.opt0+":</label>";
	OptionBody += "<select id='OptLang'>";
	OptionBody += "<option value='en'"+(GM_getValue("Opt0",deflang)=='en'?" selected='selected'":"")+">english</option>";
	OptionBody += "<option value='es'"+(GM_getValue("Opt0",deflang)=='es'?" selected='selected'":"")+">espa&ntilde;ol</option>";
	OptionBody += "<option value='br'"+(GM_getValue("Opt0",deflang)=='br'?" selected='selected'":"")+">portugu&ecirc;s</option>";
	OptionBody += "</select><br /><br />";
	document.getElementById("ARMOREDOptions").innerHTML = OptionBody;
	setInterval( function() {
		/* Opt0 > lang */
		if( GM_getValue("Opt0",deflang) != document.getElementById("OptLang").value ) {
			GM_setValue('Opt0',document.getElementById("OptLang").value);
		}
		/* Opt1 > color */
		/*
		if( GM_getValue("Opt1",'#cccccc') != document.getElementById("OptColo").value && document.getElementById("OptColo").value.match(/^((\#([0-9abcdef]{3}|[0-9abcdef]{6}))|(((dark)?(red|blue|green))|pink|lime|yellow|brown|gray|silver|white|black|violet))$/g) ) {
			document.getElementById("OptColo").style.color = document.getElementById("OptColo").value;
			GM_setValue('Opt1',document.getElementById("OptColo").value);
		}
		*/
		/* Opt2 > extra metal */
		if( GM_getValue("Opt2",true) != document.getElementById("OptMeta").checked ) {
			GM_setValue('Opt2',document.getElementById("OptMeta").checked);
		}
		/* Opt3 > extra cristal */
		if( GM_getValue("Opt3",true) != document.getElementById("OptCris").checked ) {
			GM_setValue('Opt3',document.getElementById("OptCris").checked);
		}
		/* Opt4 > extra deuterio */
		if( GM_getValue("Opt4",true) != document.getElementById("OptDeut").checked ) {
			GM_setValue('Opt4',document.getElementById("OptDeut").checked);
		}
		/* Opt4 > extra energia */
		if( GM_getValue("Opt5",true) != document.getElementById("OptEner").checked ) {
			GM_setValue('Opt5',document.getElementById("OptEner").checked);
		}
	}, 100 );
	document.getElementById("OptColo").style.color = document.getElementById("OptColo").value;
}
/******************************************/
/***************** CHAT *******************/
/******************************************/
if(document.getElementById('links')) {
	var ChatBody = "";
	ChatBody += "<div id='ARMOREDBox'>";
	ChatBody += "<div id='ARMRD_Menu' class='Small'>";
	// botoes direita
	ChatBody += "<img src='"+Imgs["help"]+"' alt='"+lang.about+"' title='"+lang.about+"' onclick='fadeBox(\""+Title+" v"+Version+"\",0);' style='float:right;' />";
	ChatBody += "<img src='"+Imgs['arrow_out']+"' alt='"+lang.maximize+"' title='"+lang.maximize+"' id='ARM_MM' onclick=\"OC();\" style='float:right;' />";
	// botoes esquerda
	ChatBody += "<img src='"+Imgs["comment"]+"' alt='"+lang.chat+"' title='"+lang.chat+"' onclick='document.getElementById(\"ARMRD_Iframe\").src=\""+ChatPlace+"chat.php?u="+GM_getValue('Player',lang.undefined)+"&amp;v="+GM_getValue('Version',0)+"&amp;b="+GM_getValue('myBuds','')+"\"' />";
	ChatBody += "<img src='"+Imgs["tecs"]+"' alt='"+lang.tecnologies+"' title='"+lang.tecnologies+"' onclick='document.getElementById(\"ARMRD_Iframe\").src=\""+ChatPlace+"tech.php?u="+GM_getValue('Player',lang.undefined)+"&v="+GM_getValue('Version',0)+"&b="+GM_getValue('myBuds',"")+"\"' />";
	ChatBody += "<img src='"+Imgs["build"]+"' alt='"+lang.structures+"' title='"+lang.structures+"' onclick='document.getElementById(\"ARMRD_Iframe\").src=\""+ChatPlace+"world.php?u="+GM_getValue('Player',lang.undefined)+"&v="+GM_getValue('Version',0)+"&b="+GM_getValue('myBuds',"")+"\"' />";
	ChatBody += "<img src='"+Imgs["ship"]+"' alt='"+lang.ships+"' title='"+lang.ships+"' onclick='document.getElementById(\"ARMRD_Iframe\").src=\""+ChatPlace+"ship.php?u="+GM_getValue('Player',lang.undefined)+"&v="+GM_getValue('Version',0)+"&b="+GM_getValue('myBuds',"")+"\"' />";
	ChatBody += "<img src='"+Imgs["world"]+"' alt='"+lang.imperium+"' title='"+lang.imperium+"' onclick='window.open(\"http://ligona.org/nexus/\");' />";
	ChatBody += "<img src='"+Imgs["option"]+"' alt='"+lang.option+"' title='"+lang.option+"' onclick='document.getElementById(\"ARMRD_Iframe\").src=\""+ChatPlace+"option.php\"' />";
	ChatBody += "</div>";
	ChatBody += "<iframe src='"+ChatPlace+"chat.php?u="+GM_getValue('Player',lang.undefined)+"&amp;v="+GM_getValue('Version',0)+"&amp;b="+GM_getValue('myBuds','')+"' frameborder='0' name='ARMRD_Iframe' id='ARMRD_Iframe' class='Small'></iframe>";
	ChatBody += "</div>";
	ChatBody += "";
	unsafeWindow.working = false;
	unsafeWindow.OC = function() {
		if(unsafeWindow.working===true)
			return false;
		var id1='ARMRD_Menu';
		var id2='ARMRD_Iframe';
		if(parseInt(document.getElementById(id1).style.opacity)!=0) {
			document.getElementById(id1).style.opacity = 1;
			document.getElementById(id2).style.opacity = 1;
			unsafeWindow.FadeOut();
		} else {
			document.getElementById(id1).style.opacity = 0;
			document.getElementById(id2).style.opacity = 0;
			unsafeWindow.FadeIn();
		}
	};
	unsafeWindow.FadeIn = function() {
		unsafeWindow.working = true;
		var id1='ARMRD_Menu';
		var id2='ARMRD_Iframe';
		if((document.getElementById(id1).style.opacity)<1) {
			document.getElementById(id1).style.opacity = ((parseInt(document.getElementById(id1).style.opacity*100)+10)/100);
			document.getElementById(id2).style.opacity = ((parseInt(document.getElementById(id2).style.opacity*100)+10)/100);
			unsafeWindow.time = setTimeout(function(){unsafeWindow.FadeIn();},50);
		} else {
			unsafeWindow.working = false;
		}
	};
	unsafeWindow.FadeOut = function() {
		unsafeWindow.working = true;
		var id1='ARMRD_Menu';
		var id2='ARMRD_Iframe';
		if( (document.getElementById(id1).style.opacity)>0) {
			document.getElementById(id1).style.opacity = ((parseInt(document.getElementById(id1).style.opacity*100)-10)/100);
			document.getElementById(id2).style.opacity = ((parseInt(document.getElementById(id2).style.opacity*100)-10)/100);
			unsafeWindow.time = setTimeout(function(){unsafeWindow.FadeOut();},50);
		} else {
			document.getElementById(id1).style.visibility = "hidden";
			document.getElementById(id2).style.visibility = "hidden";
			if(document.getElementById(id1).offsetWidth>480) {
				document.getElementById(id1).className='Small';
				document.getElementById(id2).className='Small';
				document.getElementById('ARM_MM').src = Imgs['arrow_out'];
				document.getElementById('ARM_MM').alt=lang.maximize;
				document.getElementById('ARM_MM').title=lang.maximize;
			} else {
				document.getElementById(id1).className='Big';
				document.getElementById(id2).className='Big';
				document.getElementById('ARM_MM').src=Imgs['arrow_in'];
				document.getElementById('ARM_MM').alt=lang.minimize;
				document.getElementById('ARM_MM').title=lang.minimize;
			}
			document.getElementById(id1).style.visibility = "visible";
			document.getElementById(id2).style.visibility = "visible";
			unsafeWindow.time = setTimeout(function(){unsafeWindow.FadeIn();},30);
		}
	};
	document.getElementById('links').innerHTML += ChatBody;
}
/******************************************/
/************ INICIALIZACOES **************/
/******************************************/
/* materials */
var pre_color = "<span style='color:#999;'>";
var pos_color = "</span>";
if( document.getElementById("metal_box") && GM_getValue('Opt2',true) ) {
	var metalinfo = document.getElementById("metal_box").title.replace(/(([\>][^\<]*)\/)(.*)(([\<])\/)/g,pre_color+"$3"+pos_color+"$4");
	metalinfo = metalinfo.replace(/\|/g,"");
	document.getElementById("metal_box").innerHTML += "<div style='position:absolute;width:45px;margin:-35px 0 0 53px;font-size:9px !important;'>"+metalinfo+"</div>";
	/* add tempo max */
	document.getElementById("metal_box").getElementsByTagName('div').item(0).innerHTML += "<br />"+toTime(
		(
			parseInt(document.getElementById("metal_box").getElementsByTagName('span').item(3).innerHTML.replace(/[^0-9]/g,"")) - //quantidade maxima
			parseInt(document.getElementById("resources_metal").innerHTML.replace(/[^0-9]/g,"")) //quantidade de metal
		) / parseInt(metalinfo.replace(/^(.*\(\+)((([0-9]+).)?([0-9]+))(\).*)$/g,"$4$5")) //quantidade por hora
	);
}
if( document.getElementById("crystal_box") && GM_getValue('Opt3',true) ) {
	var crystalinfo = document.getElementById("crystal_box").title.replace(/(([\>][^\<]*)\/)(.*)(([\<])\/)/g,pre_color+"$3"+pos_color+"$4");
	crystalinfo = crystalinfo.replace(/\|/g,"");
	document.getElementById("crystal_box").innerHTML += "<div style='position:absolute;width:45px;margin:-35px 0 0 53px;font-size:9px !important;'>"+crystalinfo+"</div>";
	/* add tempo max */
	document.getElementById("crystal_box").getElementsByTagName('div').item(0).innerHTML += "<br />"+toTime(
		(
			parseInt(document.getElementById("crystal_box").getElementsByTagName('span').item(3).innerHTML.replace(/[^0-9]/g,"")) - //quantidade maxima
			parseInt(document.getElementById("resources_crystal").innerHTML.replace(/[^0-9]/g,"")) //quantidade de cristal
		) / parseInt(crystalinfo.replace(/^(.*\(\+)((([0-9]+).)?([0-9]+))(\).*)$/g,"$4$5")) //quantidade por hora
	);
}
if( document.getElementById("deuterium_box") && GM_getValue('Opt4',true) ) {
	var deuteriuminfo = document.getElementById("deuterium_box").title.replace(/(([\>][^\<]*)\/)(.*)(([\<])\/)/g,pre_color+"$3"+pos_color+"$4");
	deuteriuminfo = deuteriuminfo.replace(/\|/g,"");
	document.getElementById("deuterium_box").innerHTML += "<div style='position:absolute;width:45px;margin:-35px 0 0 53px;font-size:9px !important;'>"+deuteriuminfo+"</div>";
	/* add tempo max */
	document.getElementById("deuterium_box").getElementsByTagName('div').item(0).innerHTML += "<br />"+toTime(
		(
			parseInt(document.getElementById("deuterium_box").getElementsByTagName('span').item(3).innerHTML.replace(/[^0-9]/g,"")) - //quantidade maxima
			parseInt(document.getElementById("resources_deuterium").innerHTML.replace(/[^0-9]/g,"")) //quantidade de deuterio
		) / parseInt(deuteriuminfo.replace(/^(.*\(\+)([0-9.]+)(\).*)$/g,"$2")) //quantidade por hora
	);
}
if( document.getElementById("energy_box") && GM_getValue('Opt5',true) ) {
	var energyinfo = document.getElementById("energy_box").title.replace(/^(\|)(.*)( <br>)(.*)(<br>)(.*)(\()/g,"$2$5"+pre_color);
	energyinfo = energyinfo.replace(/([0-9])(\/)([0-9])/g,"$1"+pos_color+"<br>$3");
	energyinfo = energyinfo.replace(/\||\)/g,"");
	document.getElementById("energy_box").innerHTML += "<div style='position:absolute;width:45px;margin:-35px 0 0 53px;font-size:9px !important;'>"+energyinfo+"</div>";
}


/* footer */
if( document.getElementById("siteFooter") ) {
	document.getElementById("siteFooter").style.margin="70px 0 0 0";
	document.getElementById("siteFooter").innerHTML = Title+" - for Planet Killers (by "+Author+") v"+Version;
}


/* coords nas estatisticas */
if( location.href.match("statistics") ) {
	unsafeWindow.setInterval( function() {
		for(var i=0;i<document.getElementsByTagName('a').length;i++) {
			if(document.getElementsByTagName('a').item(i).innerHTML.match(/\[([0-9]+)\:([0-9]+)\:([0-9]+)\]/g))
				break;
			if(document.getElementsByTagName('a').item(i).href.match(/^(.*)(galaxy=([0-9]+)&system=([0-9]+)&position=([0-9]+))(.*)$/g))
				document.getElementsByTagName('a').item(i).innerHTML = document.getElementsByTagName('a').item(i).innerHTML+document.getElementsByTagName('a').item(i).href.replace(/^(.*)(galaxy=([0-9]+)&system=([0-9]+)&position=([0-9]+))(.*)$/g," [$3:$4:$5]");
		};
	}, 1000 );
}


/* reload nos materiais */
if(typeof unsafeWindow.initAjaxResourcebox!="undefined")
	unsafeWindow.initAjaxResourcebox();


/* se for chat.php */
if(document.getElementById('ARMOREDSubLayer')) {
	if(GM_getValue('myBuds',"")=="") {
		document.getElementById('ARMOREDText').innerHTML = '<p style="border:1px dotted #999;border-top:0 none;">'+lang.nobuddy+'</p>';
	} else {
		if(document.getElementById("ARMOREDForm")) {
			document.getElementById("ARMOREDForm").addEventListener("submit",
				function() {
					AjaxPost(
						"text.php",
						"u="+GM_getValue('Player',lang.undefined)+"&v="+GM_getValue('Version',0)+"&b="+GM_getValue('myBuds',""),
						"chat="+document.getElementById('ARMOREDInput').value,
						"document.getElementById('ARMOREDInput').value='';document.getElementById('ARMOREDText').innerHTML=response.responseText;"
					);
				},
				false
			);
			window.addEventListener("load",
				function() {
					AjaxGet(
						"text.php",
						"u="+GM_getValue('Player',lang.undefined)+"&v="+GM_getValue('Version',0)+"&b="+GM_getValue('myBuds',""),
						"ARMOREDText",
						""
					);
				},
				false
			);
		}
		// pega versao
		if(typeof unsafeWindow.version_error != "undefined") {
			GM_setValue("VError",unsafeWindow.version_error);
		}
	}
};


/* se for pagina de mensagens */
if( location.href.match("showmessage") ) {
	/* adiciona botao de espionagem */
	for(var i=0;i<document.getElementsByClassName('attack').length;i++) {
		var url = document.getElementsByClassName('attack').item(i).getElementsByTagName('a').item(0).href.replace("mission=1","mission=6")
		document.getElementsByClassName('attack').item(i).innerHTML += "<a href='"+url+"' class='buttonSave' target='_top'><span>"+lang.respy+"</span></a>";
		break;
	};
}


/* atualizacoes */
if( document.getElementById("siteFooter") ) { // para ver se eh pag do jogo
	if(GM_getValue("Version",0)==0) { // acabou de instalar
	} else {
		if((parseInt(GM_getValue("VError",0).replace(/[^0-9]/g,""))/1000)<=(parseInt(GM_getValue("Version",0).replace(/[^0-9]/g,""))/1000)) { // se versao ok
			GM_setValue("UpToDate",0);
		} else {
			if(GM_getValue("UpToDate",1)==1) { // se for para alertar
				unsafeWindow.errorBoxNotify(lang.acctualization+" "+Title, lang.newver+" "+Title+" "+lang.avaible+"<br /><a href='http://userscripts.org/scripts/source/58844.user.js'>"+lang.clicktoinstal+" v"+GM_getValue("VError",0)+"</a>", "ok");
				GM_setValue("UpToDate",2);
			} else if(GM_getValue("UpToDate",0)==2) { // se ja tiver alertado
				unsafeWindow.fadeBox(lang.newver+" "+Title+" "+lang.avaible+"<br />v"+GM_getValue("VError",0),1);
			} else {
				GM_setValue("UpToDate",1);
			}
		}
	}
}