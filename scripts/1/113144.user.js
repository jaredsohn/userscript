// ==UserScript==
// @name           SD삼국지 Helper (based 3gokushi-Beyond)
// @namespace      SD3K-HELPER
// @description    SD삼국지 Helper
// @include        http://sdsam*.nexon.com/*
// @include        http://*.3gokushi.jp/*
// ==/UserScript==
// Version 2.0 - 전투결과 가이드 추가
// Version 1.1 - MapStar 개수 설정기능 추가 
// Version 1.0 - 최초 번역 및 MapStar 추가
( function(){
//window.addEventListener("load", function(){

if(document.getElementById("beyond_basepanel") ) return ;

var VERSION_NAME = "SD삼국지 Helper";
var IMG_DIR = "/20100510-01/img/";

///////////////////////////////////////////////
//Chrome용 처리
// @copyright      2009, James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	};

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	};

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	};

	GM_log = function(message) {
		console.log(message);
	};

	 GM_registerMenuCommand = function(name, funk) {
	//todo
	};

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	};
}
///////////////////////////////////////////////


///////////////////////////////////////////////
// 배열의 인덱스 처리
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}


var d = document;
var $ = function(id) { return d.getElementById(id); };
var $x = function(xp,dc) { return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };
var $a = function(xp,dc) { var r = d.evaluate(xp, dc||d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); var a=[]; for(var i=0; i<r.snapshotLength; i++){ a.push(r.snapshotItem(i)); } return a; };
var $e = function(e,t,f) { if (!e) return; e.addEventListener(t, f, false); };

var MAP_X_MIN = -600;
var MAP_X_MAX = 600;
var MAP_Y_MIN = -600;
var MAP_Y_MAX = 600;

var OPT_VILLAGE = 0;
var OPT_BASELINK = 0;
var OPT_MAPLINK = 0;
var OPT_XYLINK = 0;
var OPT_XYLINK_NK = 0;
var OPT_LARGEICON = 0;
var OPT_TTBL = 0;
var OPT_MEMO = 0;

var OPT_DETAILS = 1;
var OPT_DETAILS_UP = 1;
var OPT_DECK = 1;
var OPT_DECK_SET = 0;

var OPT_CTIME_B = 1;
var OPT_CTIME_U = 1;

var OPT_ALLY = 1;
var OPT_ALLY_IS = 1;
var OPT_ALLY_XY = 0;
var OPT_ALLY_CSV = 0;

var OPT_RES_T = 0;
var OPT_RES_TIME = 0;
var OPT_REMOVELIST = 1;
var OPT_MAPLIST = 1;

var OPT_TTDISTANCE = 1;
var OPT_TTDISTANCE_ITEMS = new Array();

var OPT_TTALLYPRSN = 1;

var OPT_MEMO_FONT_SIZE = "10";
var OPT_MEMO_WIDTH = "17";
var OPT_MEMO_HEIGHT = "2";
var OPT_MEMO_COUNT = "1";

var OPT_MAPLINK_FONT_SIZE = "10";

var OPT_USER_STAR = 1;
var OPT_USER_LEVEL = 1;
//var OPT_REPORT_NP = 0;

var OPT_MAPCENTER = 0;
var OPT_TBREST = 0;
var OPT_DELMSG = 0;
var OPT_TSENDTIME = 0;
var OPT_SMALLBTN = 1;
var OPT_SMALLBTN_NY = 1;
var OPT_ATTACKMAP = 0;
var OPT_CARD_CMB = 0;
	
var OPT_PIKA_YOROZU = 0;
var OPT_PIKA_HPREST = 1;
var OPT_PIKA_MAPHELP = 0;
var OPT_PIKA_TRDHELP = 1;
var OPT_PIKA_BLINKBLD = 0;

var OPT_SUZAN_SEISAN = 0;

var OPT_PROFILE_MAPSTAR = 1;
var OPT_AUTO_TROOP = 1;
var OPT_MAPSATR_SIZE = "0";
var OPT_MapStarRecord = "";
var OPT_MapResRecord = "";
var OPT_CX = "";
var OPT_CY = "";

var g_MD;
var g_MX;
var g_MY;

var BASE_X = -9999;
var BASE_Y = -9999;

var USER_ID = "";
var ALLY_ID = "";

var RES_NOW = [];
var RES_MAX = [];
var RES_GROW = [];
var RES_GROW_W = [];
var RES_GROW_B = [];

var Pika_elementQueue = [];

if( !initPanel() ) return;

var URL_PARAM = cencodeParams();
initStyle();
initResources();
getMyInfo();
loadOptions();
initImages();
disp_Options();


if( OPT_VILLAGE )	disp_village();
if( OPT_BASELINK )	disp_baseLink();
if( OPT_MAPLINK )	disp_mapLink();
if( OPT_MEMO )		disp_memo();
if( OPT_ALLY )		disp_AllianceInfo();//XY링크 처리전 호출
if( OPT_XYLINK )	disp_XYLink();
if( OPT_TTBL )		disp_TTable();
if( OPT_DETAILS )	disp_Details();
if( OPT_DECK )		disp_Deck();
if( OPT_CTIME_B )	disp_CompleteTimeBuild();
if( OPT_CTIME_U )	disp_CompleteTimeUnit();
if( OPT_RES_T )		disp_ResourcesTotal();
if( OPT_RES_TIME )	disp_ResourcesTime();
if( OPT_REMOVELIST)	disp_RemoveList();
if( OPT_MAPLIST)	disp_MapList();
if( OPT_TTDISTANCE)	disp_ToolTipsDistance();
if( OPT_TTALLYPRSN)	disp_ToolTipsAllyPerson();
if( OPT_USER_STAR)	disp_UserStar();
if( OPT_USER_LEVEL)	disp_UserLevel();
//if( OPT_REPORT_NP)	disp_ReportNextPrior();
if( OPT_MAPCENTER)	disp_MapCenter();
if( OPT_TBREST)		disp_ToubatsuRestTime();
if( OPT_DELMSG)		disp_DeleteMessages();
if( OPT_TSENDTIME)	disp_TSendTime();
if( OPT_SMALLBTN)	disp_SmallButton();
if( OPT_ATTACKMAP)	disp_AttackMap();
if( OPT_CARD_CMB)	disp_CardCombine();
if( OPT_PIKA_YOROZU ) disp_PikaYorozu();
if( OPT_PIKA_HPREST ) disp_PikaHPRestTime();
if( OPT_PIKA_MAPHELP ) Pika_installMapXYHelper();
if( OPT_PIKA_TRDHELP ) Pika_installTradeHelper();

if( OPT_SUZAN_SEISAN ) disp_SuzanSeisan();
if( OPT_PROFILE_MAPSTAR ) {
	if( location.pathname == "/map.php" )Profile_MapStar();
}

if( location.pathname == "/facility/castle_send_troop.php" )WeWillWin();

if( OPT_AUTO_TROOP ) autoTroop();

csortSideBox();
crenumberSideBox();
Pika_blinkElements();

//////////////////////
// 이미지 초기화
// 수정 내역 없음
//////////////////////
var img_mura, img_map, img_naisei, img_ken, img_hanma, img_user, img_mail;
function initImages()
{
	if( !OPT_LARGEICON ) {
		img_mura = 'data:image/gif;base64,'+
				'R0lGODlhCgAKAKIAAAAAAP/M/7Jlf2YAAMaAoLpxjceAoQAAACH5BAQUAP8ALAAAAAAKAAoAAAMd'+
				'CBDcumE0CeOcI2vJMunYYICgZDalwEFcQSkooyQAOw==';


		img_map = 'data:image/gif;base64,'+
				'R0lGODlhCgAKAJEAAAAAAP//zAAAmSAgGiH5BAQUAP8ALAAAAAAKAAoAAAIaBIJplz0hRItISojx'+
				'tbXuDn3ZFDANMhhnCRQAOw==';


		img_naisei = 'data:image/gif;base64,'+
				'R0lGODlhCgAKALMAAAAAAMPS5HWOi5kAZktYU7yw0BogILmjyMz//8LP4r641MXb6QAAAAAAAAAA'+
				'AAAAACH5BAQUAP8ALAAAAAAKAAoAAAQnEBiEBkUGgGsvqUMockgxKBWnDMewdKA1UkNwJTBMU9vl'+
				'CxofDxABADs=';

		img_ken = 'data:image/gif;base64,'+
				'R0lGODlhCgAKALMAAAAAALS0tE48PP///42NjTMzM+Li4nx8fBgAACYPD5mZmQkJCUZGRru7u+jo'+
				'6AAAACH5BAQUAP8ALAAAAAAKAAoAAAQkECBAq5C1qrEyIMPQUAMZllRwhtlinB4De+ExBFniFKQ3'+
				'+YAIADs=';
		img_hanma = 'data:image/gif;base64,'+
				'R0lGODlhCgAKAOYAAP////7+/v39/fz8/Pv7+/r6+vn5+fj4+Pb29vX19fLy8vHx8fDw8O/v7+/u'+
				'7u3t7ezs7Obm5uLi4tra2tbW1tTU1NPT09LR0cjIyLq6ura0tLKysrCwsKmoqI+JiWxsbGdmZlVV'+
				'VUpKSkhFRUFBQUJBQT8/Py4uLiwsLCgoKCQkJCMjIyIhISoaGhsbGxkZGRkYGBYWFhoWFhkVFRMT'+
				'EyQODhQSEiILCw4ODgsLCwoKCgkJCQcGBgkGBgYGBhgAABYAAAQEBAMDAwEBAQAAAAEAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5'+
				'BAQUAP8ALAAAAAAKAAoAAAdcgEQ3HiAoDwILJjRAMh0XDAgBCRkqRTYpAwCaBxE+REGZmgAFQUND'+
				'oqI7OEM+C5oEsAsnLzkWChAYHxINFCQ8LBUcISIlGxMPNT46LisxMSMaDkQ/RERC1zMtPYEAOw==';
		img_mail = 'data:image/gif;base64,'+
				'R0lGODlhCgAKAMQAAP///5mZmSoaGhoWFhkVFRMTEyQODiILCwsLCwYGBgcGBgkGBhgAABYAAAMD'+
				'AwEBAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAQU'+
				'AP8ALAAAAAAKAAoAAAUvIHREZBkVzWCuQQC8QEsGkRvXz3PL7pO8tNorgoAZARHFERYxLIcRBmTq'+
				'iBAEixAAOw==';
		img_user = 'data:image/gif;base64,'+
				'R0lGODlhCgAKANUAADMAAPr3s+vhKdKwHr6DEal3EPPvPYJCA+XUI/HsLPbwUcejG9m+Mvn3M9m8'+
				'IP//tfj4NvXxMe/oK///M969IfLuMbR4EdzFL86wHv//O+XXKf//u//3tY5JBPj0Ue3iLvTwQu3l'+
				'L9fCIda3IKp4ENnDL+DHIv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUACcALAAAAAAKAAoAAAZTwNMp'+
				'oEgkFAHhEASpVCCgZMAgEFVCDomBCBkBNBqACFJsaAqfD0nTSAhMkYaz7RAoLJhMJJIZEBQbJQcL'+
				'EhIjHRcbJw8XFgQEFgwPShseCAiAQkEAOw==';
	}else{
		img_mura = 'data:image/gif;base64,'+
				'R0lGODlhDgAOAOYAAAAAAP///+Hz/gid8Ame8gmg8gmb7wmc7wqe8gqg8gqb7wqc7wug8gud7wyh'+
				'8gyd7w2i8w2g8g2d7w2d7g6e8A6d7w6e7w6c7g6d7hCg8g+d7w+e7w+d7hWg7hag7huP0RyQ0h2Q'+
				'0h+V1iWq8yaq8yiq9Cis9AorPSms9QoqPCqs9Syu9QsrPS6v9S6t9C+t9DGv9TGw9TOw9Taw9EW3'+
				'9ke39ki49mbE+IXQ+YbQ+aLb+qPb+6Pc+8Ln/MTo/ODz/uL0/guh8g+j8xGj8iCa1yit9Cmt9Cuu'+
				'9C6v9DOx9TSz9Ue59ki59km69sLo/MTp/ODz/f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5'+
				'BAEAAFEALAAAAAAOAA4AAAeXgCkfHBZDK0IQLQ4LFx8pIB4WQUw4Kig5NggKHSAcGBVHPDcoKDc7'+
				'JQYTHBwXD0hAP7GxJQcYGBwNCU0/Ab0BPzUIEhwPCUtOvr49NQQVB0Y8yck6JBUVDEy80sARGxgD'+
				'RdrJUCMUhAVL4r4/NBkbFSbI0r09LxoWJurJAi4bIElPgAgcKNDHjBAsiCiJwZAhjIcyRJwIBAA7';

		img_map = 'data:image/gif;base64,'+
				'R0lGODlhDgAOAMQAAKmLAeHXp76oQP38+My7arSaIe/pz9jKi8SvUeffuK6SEdTFf7mhMci0XPTw'+
				'39zPl+Tbr8OuTcq4ZN7SnOniv72mPf///8++ccm3YdTFgP///wAAAAAAAAAAAAAAAAAAACH5BAEA'+
				'ABoALAAAAAAOAA4AAAVCoAaMZDmKZqqu5EIRVUUqWEkJl6XvkL2POkCmNPkBgpdS8gi0AA6lnfOX'+
				'qDWlOoegN0IMKCRBgRGxsgwPAyuFWmtCADs=';

		img_naisei = 'data:image/gif;base64,'+
				'R0lGODlhDgAOAOYAAAAAAP///zEwMTAvMC8uLy4tLiwrLCsqKzw7PH9+fysrLImKiSkpKCgoJyYm'+
				'JTk5OE5OTdvb2dfX1Xp6eXd3dnV1dGZmZWJiYebm5eLi4d7e3dra2dfX1tTU09PT0tHR0M/Pzs7O'+
				'zc3NzMTEw8PDwsDAv7e3tqOjopKSkff29eLh4NnY19PS0dHQz83My8rJyMfGxcPCwcLBwMC/vr++'+
				'vSkoKCYlJSUkJCsqKjQzM0xLS9DOzsnHx3t6enV0dHRzc1taWuTj4+Hg4N/e3t3c3Nva2tbV1dXU'+
				'1NTT09LR0dHQ0NDPz8/OzsvKysnIyMjHx8HAwMC/v6Cfn9zc3MnJycXFxb+/v729vZ+fn5aWloWF'+
				'hXNzc3FxcWpqalxcXFpaWlZWVlBQUE5OTkdHR0BAQDo6Ojg4ODc3NzExMTAwMC8vLy4uLi0tLSws'+
				'LCsrKygoKCcnJyYmJiUlJSQkJCMjIyIiIiAgIB8fHx4eHv///wAAAAAAAAAAAAAAAAAAAAAAACH5'+
				'BAEAAHkALAAAAAAOAA4AAAewgAKCA4SFhGkDggJuYAkUFT9cPhByBYpzCykYGRpFQhN4bIptZEVE'+
				'RkkfPA9yBopqa1hEK0cfKDUNboppcBcvJCUzX3UMB4psZh8RIU1LVmhxxoJtZR4bHS0gUDkOOKNn'+
				'IFMsTEpXaTYKrzdeIUQcJF93b66CdBYnWls9WFJidziJCAApEkTEmC5JXEDRYSfRABMqkLCAUeVJ'+
				'DCdZ7BAYgGCIBBY7QlAZIYNGlDBsAgEAOw==';

		img_ken = 'data:image/gif;base64,'+
				'R0lGODlhDgAOAMQAAP9MH/9lP/9AEP9ZMP9/X/+Zf/+yn/+lj//Zz//y7/9zUP+AYP+/r/+Lbv/P'+
				'w//q5f+fh//s5/9jPP+NcP/l3//Mv/////8zAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEA'+
				'ABgALAAAAAAOAA4AAAVCIHaNZDmKZqkYqVlZQEsORCBX1YLIhWVRstHB9wheDC8LApiC+HwES+og'+
				'uAAsCcNAcUMIfJVUVEoKpyjMUZWEMmJCADs=';

		img_hanma = 'data:image/gif;base64,'+
				'R0lGODlhDgAOALMAAAAAAP///8zMzL+/v5mZmWZmZjIyMiYmJgwMDP///wAAAAAAAAAAAAAAAAAA'+
				'AAAAACH5BAEAAAkALAAAAAAOAA4AAARF0Eg5yLxTEFE1lkIYCEGBEUMoBqyQqSQ7WlQ4mLFnDKPO'+
				'tyYeifYLEUc3AylkkrR6I+Qr2krRJISWqnlBFQId7kdgEhsiADs='; 
		img_mail = 'data:image/gif;base64,'+
				'R0lGODlhDgAOANUAAP////n6+u3t7ezs7Ojo6Kurq6ampqWkpKCgoJ6enpaWloeHh4SEhHV1dWhn'+
				'Z2dmZioqKiodHR8eHh0cHBsaGiEUFBYTExMTExMSEh4NDRwKChsJCRoICAoKCgcHBwkGBhIDAwUF'+
				'BQUGBhMAAAYEBBIAAAMDAxEAAAICAgQCAgEBAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAQUAP8ALAAAAAAOAA4AAAZxwNVm'+
				's1qxjkiW53I6FZ/Qoud0GACu2OvgUOQmrNhBYnU4Ah4URVZBcQBUKsBhglkIBAvM5PCOAwwTEwwM'+
				'EhIGVyohVwQIEEUQCARXLB1YAQUNDQUBWJRZn50ioKAsGaOfKxqnWSkpIyNQJiskFhEVH0EAOw==';
		img_user = 'data:image/gif;base64,'+
				'R0lGODlhDgAOAPcAAP7+v/3+vf39vf3+ofz6vvz9ofz5u/v8ofn2nv//O/3/Ofn3av76Nfn2af36'+
				'Nf75Nfj6Nvj5Nvj4N/n1U/fzaff4N/f4NPf4Lvfzavf1TPj0Tff3Lvb1NPX0NPb1LfXzNPXwTvXw'+
				'VPXwTfXyNPXyM/XuUPTyNPTyM/TxNPTwPPTwMvTwMfTvPfTvPPPxM/PwMPPwLvPvPfPvMvPwM/Pu'+
				'MvPuMPPuLfLtPfLuNfLuM/LuMvLuLvPtMfLtNfLtM/LtMfLtMPHtMvHsM/HsMfLsLfLsMPLsMfHp'+
				'LPDqKvHqLPDoLu7oLu/nLO3jK/HgNergK+rgKevfK+reKereKuvaM+bWJ+TRJOfOJOTOI+TJLN/K'+
				'IuHCIN3AK9/BH+G/IN6/K+C+H92+IN++INq9Ida1H9W0J9ayHNWxHM+xH8uqHc2kGs2jGs+iF8ug'+
				'GNGeGNCeGMmdF8WRE8SPFcSOFL+FFLt9ELp9EL59EKt0DKRyDKFwC6NpC4hdC4pVCoZQCpNFAJVE'+
				'AHtGCIVBB4A5AHk3BnozADQbAjQOADQOASkQAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAIoALAAAAAAOAA4A'+
				'AAjGABUJJEABBxEiPSgQEMgQQYgUOiLqaBECQcMbMC5wGDLEgoUdNywaAAEDChgsLlyECbPEhggD'+
				'GFhsEJOIDwMGgQxd8RADAw4cEbYg8uPAQZ9DXSCgQHHwwxM3Z0iQMPNmygggQJJYiaKiq9euVbQc'+
				'EdKmjZIKJowYMSGhSRw4PhZ8GYQmQQcZeBWQAcRlgQANegilkVKjBpMxgvBkCKDogJM8he6sWTPn'+
				'zx4qBRgemJBFTp06dMqUGMBQIIAFOZAgCdIAAMOAADs=';
	}
}
//////////////////////
// 스타일 초기화
// 수정내역 없음
//////////////////////
function initStyle()
{
	GM_addStyle("span.beyond_panel_ctlbox {width:35px; height:14px; display:block; position:absolute; right:-5px; top:-4px; }" +
				"span.beyond_panel_ctlbox img {width:8px;height:9px; float:right; }" +
				"div#beyond_basepanel img{vertical-align:middle; margin:1px 1px 1px 0px; padding-left:2px}" +
				 "#beyond_basepanel fieldset{border:groove 1px black; margin:1px; padding:1px;}"
				);
//vertical-align:middle; margin:0px; paddin:1px; float:right; 
}

//////////////////////
// 리소스 초기화
// 수정내역 없음
//////////////////////
function initResources()
{
	RES_NOW["wood"] = parseInt( $("wood").innerHTML, 10 );
	RES_NOW["stone"] = parseInt( $("stone").innerHTML, 10 );
	RES_NOW["iron"] = parseInt( $("iron").innerHTML, 10 );
	RES_NOW["rice"] = parseInt( $("rice").innerHTML, 10 );
	
	RES_MAX["wood"] = parseInt( $("wood_max").innerHTML, 10 );
	RES_MAX["stone"] = parseInt( $("stone_max").innerHTML, 10 );
	RES_MAX["iron"] = parseInt( $("iron_max").innerHTML, 10 );
	RES_MAX["rice"] = parseInt( $("rice_max").innerHTML, 10 );

	RES_GROW["wood"] = parseInt( $("output_wood").innerHTML, 10 );
	RES_GROW["stone"] = parseInt( $("output_stone").innerHTML, 10 );
	RES_GROW["iron"] = parseInt( $("output_iron").innerHTML, 10 );
	RES_GROW["rice"] = parseInt( $("output_rice").innerHTML, 10 );
	
	var spns = $a("//div[@class=\"sideBoxInner\"]/ul/li/span[@class=\"increase\" or @class=\"resource\"]");
	for(var i=0 ; i<spns.length ; i++) {
		var str = spns[i].parentNode.innerHTML.match(/(목|석|철|쌀)\s+(-?[0-9]+)/);
		if( str ) {
			switch( str[1] ) {
			case "목": 
				RES_GROW_W["wood"] = parseInt(str[2], 10);
				RES_GROW_B["wood"] = parseInt(spns[i].innerHTML, 10);
				break;
			case "석":
				RES_GROW_W["stone"] = parseInt(str[2], 10);
				RES_GROW_B["stone"] = parseInt(spns[i].innerHTML, 10);
				break;
			case "철":
				RES_GROW_W["iron"] = parseInt(str[2], 10);
				RES_GROW_B["iron"] = parseInt(spns[i].innerHTML, 10);
				break;
			case "쌀":
				RES_GROW_W["rice"] = parseInt(str[2], 10);
				RES_GROW_B["rice"] = parseInt(spns[i].innerHTML, 10);
				break;
			}
		}
	}
	
	// 명성
	RES_NOW["fame"] = 0;
	RES_MAX["fame"] = 0;
	var stat_left = $("status_left");
	if( stat_left ) {
		var lines = $("status_left").textContent.split("\n");
		if( lines.length >= 6) {
			var tmp = lines[5].match(/\s(\d+)\s\/\s(\d+)/);
			RES_NOW["fame"] = parseInt(tmp[1]);
			RES_MAX["fame"] = parseInt(tmp[2]);
		}
	}
}


//////////////////////
// 베이스패널 초기화
// 수정내역 없음
//////////////////////
function initPanel()
{
	var sidebar = $("sidebar");
	
	if( !sidebar ) return false;
	
	var basepanel = d.createElement("div");
	basepanel.id = "beyond_basepanel";
	
	var fixpanel = d.createElement("div");
	fixpanel.id = "beyond_fixpanel";
	var floatpanel = d.createElement("div");
	floatpanel.id = "beyond_floatpanel";
	var tmppanel = d.createElement("div");
	tmppanel.id = "beyond_tmp";
	tmppanel.style.display = "none";
	
	basepanel.appendChild(fixpanel);
	basepanel.appendChild(floatpanel);
	basepanel.appendChild(tmppanel);
	
	sidebar.appendChild(basepanel);
	
	return true;
}


//////////////////////
// 옵션 처리
// 완료
//////////////////////
function disp_Options()
{
	if( !location.pathname.match(/^(\/user\/|\/bbs\/personal_)/) ) return;
	
	if( location.pathname.match(/ranking\.php/) ) return;
	var ul = $("statMenu");
	if( !ul ) return;
	
	var cl = d.createElement("a");
	cl.href = "javascript:void(0);";
	cl.innerHTML = "삼국지Beyond";
	$e(cl, "click", function() {openOptions()});
	
	var li = d.createElement("li");
	li.appendChild(cl);
	li.className = "last";
	ul.appendChild(li);
	
	var lst = $x("//li[@class=\"last\"]");
	if( lst ) {
		lst.className = "";
	}


}

function loadOptions()
{
	OPT_VILLAGE = cloadData( "OPT_VILLAGE", 1 );
	OPT_BASELINK = cloadData( "OPT_BASELINK", 1 );
	OPT_MAPLINK = cloadData( "OPT_MAPLINK", 1 );
	OPT_XYLINK = cloadData( "OPT_XYLINK", 1 );
	OPT_XYLINK_NK = cloadData( "OPT_XYLINK_NK", 0 );
	OPT_LARGEICON = cloadData( "OPT_LARGEICON", 0 );
	OPT_TTBL = cloadData( "OPT_TTBL", 1 );
	OPT_MEMO = cloadData( "OPT_MEMO", 1 );
	OPT_MEMO_FONT_SIZE = cloadData( "OPT_MEMO_FONT_SIZE", "10" );
	OPT_MEMO_WIDTH = cloadData( "OPT_MEMO_WIDTH", "17" );
	OPT_MEMO_HEIGHT = cloadData( "OPT_MEMO_HEIGHT", "2" );
	OPT_MEMO_COUNT = cloadData( "OPT_MEMO_COUNT", "1" );
	OPT_MAPLINK_FONT_SIZE = cloadData( "OPT_MAPLINK_FONT_SIZE", "10" );
	OPT_DETAILS = cloadData( "OPT_DETAILS", 1 );
	OPT_DETAILS_UP = cloadData( "OPT_DETAILS_UP", 0 );
//	OPT_DECK = cloadData( "OPT_DECK", 1 );
	OPT_DECK_SET = cloadData( "OPT_DECK_SET", 1 );
	OPT_CTIME_B = cloadData( "OPT_CTIME_B", 1 );
	OPT_CTIME_U = cloadData( "OPT_CTIME_U", 1 );
	OPT_ALLY = cloadData( "OPT_ALLY", 1 );
	OPT_ALLY_IS = cloadData( "OPT_ALLY_IS", 1 );
	OPT_ALLY_XY = cloadData( "OPT_ALLY_XY", 0 );
	OPT_ALLY_CSV = cloadData( "OPT_ALLY_CSV", 0 );
	OPT_RES_T = cloadData( "OPT_RES_T", 0 );
	OPT_RES_TIME = cloadData( "OPT_RES_TIME", 1 );
	OPT_REMOVELIST = cloadData( "OPT_REMOVELIST", 1 );
	OPT_MAPLIST = cloadData( "OPT_MAPLIST", 1 );
	OPT_TTDISTANCE = cloadData( "OPT_DISTANCE", 1 );
	OPT_TTDISTANCE_ITEMS = cloadData("OPT_DISTANCE_ITEMS", "[\"검병(6)\", \"창병(7)\", \"궁병(5)\", \"기병(12)\", \"충차(3)\"]", true, true);
	OPT_TTALLYPRSN = cloadData( "OPT_TTALLYPRSN", 1 );
	OPT_USER_STAR = cloadData( "OPT_USER_STAR", 1 );
	OPT_USER_LEVEL = cloadData( "OPT_USER_LEVEL", 1 );
//	OPT_REPORT_NP = cloadData( "OPT_REPORT_NP", 1 );
	OPT_MAPCENTER = cloadData( "OPT_MAPCENTER", 1 );
	OPT_TBREST = cloadData( "OPT_TBREST", 1 );
	OPT_DELMSG = cloadData( "OPT_DELMSG", 1 );
	OPT_TSENDTIME = cloadData( "OPT_TSENDTIME", 1 );
	OPT_SMALLBTN = cloadData( "OPT_SMALLBTN", 1 );
	OPT_SMALLBTN_NY = cloadData( "OPT_SMALLBTN_NY", 1 );
	OPT_ATTACKMAP = cloadData( "OPT_ATTACKMAP", 1 );
	OPT_CARD_CMB = cloadData( "OPT_CARD_CMB", 1 );
	OPT_PIKA_YOROZU = cloadData( "OPT_PIKA_YOROZU", 0 );
	OPT_PIKA_HPREST = cloadData( "OPT_PIKA_HPREST", 1 );
	OPT_PIKA_MAPHELP = cloadData( "OPT_PIKA_MAPHELP", 0 );
	OPT_PIKA_TRDHELP = cloadData( "OPT_PIKA_TRDHELP", 1 );
	OPT_PIKA_BLINKBLD = cloadData( "OPT_PIKA_BLINKBLD", 0 );

	OPT_SUZAN_SEISAN = cloadData( "OPT_SUZAN_SEISAN", 0 );
	OPT_PROFILE_MAPSTAR = cloadData( "OPT_PROFILE_MAPSTAR", 1 );
	OPT_MAPSATR_SIZE = cloadData("OPT_MAPSATR_SIZE", "0");
	OPT_AUTO_TROOP = cloadData("OPT_AUTO_TROOP", 1);

}
function saveOptions()
{
	OPT_VILLAGE = cgetCheckBoxValue("OPT_VILLAGE");
	OPT_BASELINK = cgetCheckBoxValue("OPT_BASELINK");
	OPT_MAPLINK = cgetCheckBoxValue("OPT_MAPLINK");
	OPT_XYLINK = cgetCheckBoxValue("OPT_XYLINK");
	OPT_XYLINK_NK = cgetCheckBoxValue("OPT_XYLINK_NK");
	OPT_LARGEICON = cgetCheckBoxValue("OPT_LARGEICON");
	OPT_TTBL = cgetCheckBoxValue("OPT_TTBL");
	OPT_MEMO = cgetCheckBoxValue("OPT_MEMO");
	OPT_MEMO_FONT_SIZE = cgetTextBoxValue("OPT_MEMO_FONT_SIZE");
	OPT_MEMO_WIDTH = cgetTextBoxValue("OPT_MEMO_WIDTH");
	OPT_MEMO_HEIGHT = cgetTextBoxValue("OPT_MEMO_HEIGHT");
	OPT_MEMO_COUNT = cgetTextBoxValue("OPT_MEMO_COUNT");
	OPT_MAPLINK_FONT_SIZE = cgetTextBoxValue("OPT_MAPLINK_FONT_SIZE");
	OPT_DETAILS = cgetCheckBoxValue("OPT_DETAILS");
	OPT_DETAILS_UP = cgetCheckBoxValue("OPT_DETAILS_UP");
//	OPT_DECK = cgetCheckBoxValue("OPT_DECK");
	OPT_DECK_SET = cgetCheckBoxValue("OPT_DECK_SET");
	OPT_CTIME_B = cgetCheckBoxValue("OPT_CTIME_B");
	OPT_CTIME_U = cgetCheckBoxValue("OPT_CTIME_U");
	OPT_ALLY = cgetCheckBoxValue("OPT_ALLY");
	OPT_ALLY_IS = cgetCheckBoxValue("OPT_ALLY_IS");
	OPT_ALLY_XY = cgetCheckBoxValue("OPT_ALLY_XY");
	OPT_ALLY_CSV = cgetCheckBoxValue("OPT_ALLY_CSV");
	OPT_RES_T = cgetCheckBoxValue("OPT_RES_T");
	OPT_RES_TIME = cgetCheckBoxValue("OPT_RES_TIME");
	OPT_REMOVELIST = cgetCheckBoxValue("OPT_REMOVELIST");
	OPT_MAPLIST = cgetCheckBoxValue("OPT_MAPLIST");
	OPT_TTDISTANCE = cgetCheckBoxValue("OPT_DISTANCE");
	OPT_TTDISTANCE_ITEMS = getDistanceBox(5);
	OPT_TTALLYPRSN = cgetCheckBoxValue("OPT_TTALLYPRSN");
	OPT_USER_STAR = cgetCheckBoxValue("OPT_USER_STAR");
	OPT_USER_LEVEL = cgetCheckBoxValue("OPT_USER_LEVEL");
//	OPT_REPORT_NP = cgetCheckBoxValue("OPT_REPORT_NP");
	OPT_MAPCENTER = cgetCheckBoxValue("OPT_MAPCENTER");
	OPT_TBREST = cgetCheckBoxValue("OPT_TBREST");
	OPT_DELMSG = cgetCheckBoxValue("OPT_DELMSG");
	OPT_TSENDTIME = cgetCheckBoxValue("OPT_TSENDTIME");
	OPT_SMALLBTN = cgetCheckBoxValue("OPT_SMALLBTN");
	OPT_SMALLBTN_NY = cgetCheckBoxValue("OPT_SMALLBTN_NY");
	OPT_ATTACKMAP = cgetCheckBoxValue("OPT_ATTACKMAP");
	OPT_CARD_CMB = cgetCheckBoxValue("OPT_CARD_CMB");
	OPT_PIKA_YOROZU = cgetCheckBoxValue("OPT_PIKA_YOROZU");
	OPT_PIKA_HPREST = cgetCheckBoxValue("OPT_PIKA_HPREST");
	OPT_PIKA_MAPHELP = cgetCheckBoxValue("OPT_PIKA_MAPHELP");
	OPT_PIKA_TRDHELP = cgetCheckBoxValue("OPT_PIKA_TRDHELP");
	OPT_PIKA_BLINKBLD = cgetCheckBoxValue("OPT_PIKA_BLINKBLD");
	OPT_SUZAN_SEISAN = cgetCheckBoxValue("OPT_SUZAN_SEISAN");
	OPT_PROFILE_MAPSTAR = cgetCheckBoxValue("OPT_PROFILE_MAPSTAR");
	OPT_MAPSATR_SIZE = cgetTextBoxValue("OPT_MAPSATR_SIZE");
	OPT_AUTO_TROOP = cgetCheckBoxValue("OPT_AUTO_TROOP");
	
	csaveData( "OPT_VILLAGE", OPT_VILLAGE );
	csaveData( "OPT_BASELINK", OPT_BASELINK );
	csaveData( "OPT_MAPLINK", OPT_MAPLINK );
	csaveData( "OPT_XYLINK", OPT_XYLINK );
	csaveData( "OPT_XYLINK_NK", OPT_XYLINK_NK );
	csaveData( "OPT_LARGEICON", OPT_LARGEICON );
	csaveData( "OPT_TTBL", OPT_TTBL );
	csaveData( "OPT_MEMO", OPT_MEMO );
	csaveData( "OPT_MEMO_FONT_SIZE", OPT_MEMO_FONT_SIZE );
	csaveData( "OPT_MEMO_WIDTH", OPT_MEMO_WIDTH );
	csaveData( "OPT_MEMO_HEIGHT", OPT_MEMO_HEIGHT );
	csaveData( "OPT_MEMO_COUNT", OPT_MEMO_COUNT );
	csaveData( "OPT_MAPLINK_FONT_SIZE", OPT_MAPLINK_FONT_SIZE );
	csaveData( "OPT_DETAILS", OPT_DETAILS );
	csaveData( "OPT_DETAILS_UP", OPT_DETAILS_UP );
//	csaveData( "OPT_DECK", OPT_DECK );
	csaveData( "OPT_DECK_SET", OPT_DECK_SET );
	csaveData( "OPT_CTIME_B", OPT_CTIME_B );
	csaveData( "OPT_CTIME_U", OPT_CTIME_U );
	csaveData( "OPT_ALLY", OPT_ALLY );
	csaveData( "OPT_ALLY_IS", OPT_ALLY_IS );
	csaveData( "OPT_ALLY_XY", OPT_ALLY_XY );
	csaveData( "OPT_ALLY_CSV", OPT_ALLY_CSV );
	csaveData( "OPT_RES_T", OPT_RES_T );
	csaveData( "OPT_RES_TIME", OPT_RES_TIME );
	csaveData( "OPT_REMOVELIST", OPT_REMOVELIST );
	csaveData( "OPT_MAPLIST", OPT_MAPLIST );
	csaveData( "OPT_DISTANCE", OPT_TTDISTANCE );
	csaveData( "OPT_DISTANCE_ITEMS", OPT_TTDISTANCE_ITEMS, true, true );
	csaveData( "OPT_TTALLYPRSN", OPT_TTALLYPRSN );
	csaveData( "OPT_USER_STAR", OPT_USER_STAR );
	csaveData( "OPT_USER_LEVEL", OPT_USER_LEVEL );
//	csaveData( "OPT_REPORT_NP", OPT_REPORT_NP );
	csaveData( "OPT_MAPCENTER", OPT_MAPCENTER );
	csaveData( "OPT_TBREST", OPT_TBREST );
	csaveData( "OPT_DELMSG", OPT_DELMSG );
	csaveData( "OPT_TSENDTIME", OPT_TSENDTIME );
	csaveData( "OPT_SMALLBTN", OPT_SMALLBTN );
	csaveData( "OPT_SMALLBTN_NY", OPT_SMALLBTN_NY );
	csaveData( "OPT_ATTACKMAP", OPT_ATTACKMAP );
	csaveData( "OPT_CARD_CMB", OPT_CARD_CMB );
	csaveData( "OPT_PIKA_YOROZU", OPT_PIKA_YOROZU );
	csaveData( "OPT_PIKA_HPREST", OPT_PIKA_HPREST );
	csaveData( "OPT_PIKA_MAPHELP", OPT_PIKA_MAPHELP );
	csaveData( "OPT_PIKA_TRDHELP", OPT_PIKA_TRDHELP );
	csaveData( "OPT_PIKA_BLINKBLD", OPT_PIKA_BLINKBLD );
	csaveData( "OPT_SUZAN_SEISAN", OPT_SUZAN_SEISAN );
	csaveData( "OPT_PROFILE_MAPSTAR", OPT_PROFILE_MAPSTAR );
	csaveData( "OPT_MAPSATR_SIZE", OPT_MAPSATR_SIZE );
	csaveData( "OPT_AUTO_TROOP", OPT_AUTO_TROOP );
	alert("설정을 저장했습니다.");
	deleteOptionsHtml();
}
function getMyInfo()
{
	if( (location.pathname == "/user/index.php" || location.pathname == "/user/" ) && !URL_PARAM.user_id ) {
		
		var uid=0, aid=0;
		var uidtd = $x("//table[@class=\"commonTables\"]//tr[2]//td[3]");
		if( uidtd ) {
			uid = uidtd.innerHTML.match(/\/bbs\/personal_topic_view\.php\?user_id\=(\d+)/);
		}
		var aidtd = $x("//table[@class=\"commonTables\"]//tr[3]//td[4]");
		if( aidtd ) {
			aid = d.body.innerHTML.match(/\/alliance\/info\.php\?id\=(\d+)/);
		}
		if( uid && aid ) {
			csaveData( "user_id", uid[1], true );
			csaveData( "ally_id", aid[1], true );
		}
	}
	
	USER_ID = cloadData( "user_id", "", true );
	ALLY_ID = cloadData( "ally_id", "", true );
	
}



function resetMapLink() {
	if( !confirm("등록되어 있는 링크를 삭제해도 되겠습니까?") ) return;
	
	var maplinks = cloadData( "links", 0, true );
	for(i=0 ; i<maplinks ; i++) {
		cdelData( "link" + i, true );
	}
	cdelData( "links", true);

	resetMapLinks();
}

function resetUserXY() {
	if( !confirm("동맹원 일람의 좌표정보를 전부 삭제해도 되겠습니까?") ) return;
	cresetUserXY();
}

function resetUserStar() {
	if( !confirm("군주의 ★정보와 영지 레벨 정보를 모두 삭제해도 되겠습니까?") ) return;
	cresetUserStar();
	cdelData("MyLevelList",true);
}

function openOptions() {
	deleteOptionsHtml();
	addOptionsHtml();
}

function deleteOptionsHtml() {
	var elem = $("beyond_OptionsWindow");
	if (!elem ) return;
	$("beyond_floatpanel").removeChild(elem);
}

function addOptionsHtml() {

	var oc = d.createElement("div");
	oc.id = "beyond_OptionsWindow";
	oc.style.position = "absolute";
	oc.style.backgroundColor = "lightblue";
	oc.style.border = "outset 2px lightblue";
	oc.style.fontSize = "12px";
	oc.style.padding = "15px";
	oc.style.zIndex = 9999;
	
	var x = cloadData("config_window_x", 20);
	var y = cloadData("config_window_y", 20);
	if(x < 0) x = 0;
	if(y < 0) y = 0;
	oc.style.left = x + "px";
	oc.style.top = y + "px";
	
	$e(oc, "mousedown", function(event){
				if( event.target != $("beyond_OptionsWindow")) {return false;}
				g_MD="beyond_OptionsWindow";
				g_MX=event.pageX-parseInt(this.style.left);
				g_MY=event.pageY-parseInt(this.style.top);
				event.preventDefault();});
	$e(d, "mousemove", function(event){
				if(g_MD != "beyond_OptionsWindow") return true;
				var oc = $("beyond_OptionsWindow");
				if( !oc ) return true;
				var x = event.pageX - g_MX;
				var y = event.pageY - g_MY;
				oc.style.left = x + "px";
				oc.style.top = y + "px";
				csaveData("config_window_x", x);
				csaveData("config_window_y", y);
				});
	$e(d, "mouseup", function(event){g_MD="";});

	var tx = d.createElement("div");

	var ah = d.createElement("a");
	ah.href = "";
	tx.title = ah.href;
	ah.target = "_blank";
	ah.appendChild(d.createTextNode(VERSION_NAME));
	tx.appendChild(ah);
	tx.style.padding = "4px";
	tx.style.fontSize = "10px";
	tx.style.color = "steelblue";
	oc.appendChild(tx);

	$("beyond_floatpanel").appendChild(oc);
	
	var tbl = d.createElement("table");
	tbl.style.border ="0px";
	var tr = d.createElement("tr");
	var td1 = d.createElement("td");
	td1.style.padding = "15px";
	td1.style.verticalAlign = "top";
	var td2 = d.createElement("td");
	td2.style.padding = "15px";
	td2.style.verticalAlign = "top";
	var td3 = d.createElement("td");
	td3.style.padding = "15px";
	td3.style.verticalAlign = "top";
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tbl.appendChild(tr);
	oc.appendChild(tbl);
	
	
	// 설정 항목
	ccreateCheckBox(td1, "OPT_VILLAGE", OPT_VILLAGE, "건축표시기능","마을표시에서 자원부족으로 건축이 불가능한 경우, Lv표시를 노란색으로 합니다.",0);
	ccreateCheckBox(td1, "OPT_BASELINK", OPT_BASELINK, "거점링크기능","성과 마을 링크에 맵, 내정등의 링크를 추가합니다.",0);
	ccreateCheckBox(td1, "OPT_MAPLINK", OPT_MAPLINK, "영지링크기능","영지와 적지 또는 NPC요새 등으로의 링크",0);
	ccreateTextBox(td1, "OPT_MAPLINK_FONT_SIZE", OPT_MAPLINK_FONT_SIZE, "폰트사이즈","영지링크의 폰트사이즈를 지정합니다. 기본 10", 5, 20);
	ccreateCheckBox(td1, "OPT_LARGEICON", OPT_LARGEICON, "큰 아이콘","거점, 영지링크 등의 아이콘을 14*14사이즈로 설정합니다.(아이콘제공 :ゆう＠てらおとめん님）",0);
	ccreateCheckBox(td1, "OPT_XYLINK", OPT_XYLINK, "좌표링크기능","게시판 등의 (XX,YY)좌표에 링크 기능을 추가합니다.",0);
	ccreateCheckBox(td1, "OPT_XYLINK_NK", OPT_XYLINK_NK, "양끝 괄호 무시","XX,YY만 있어도 링크합니다. 1,000과 같은 숫자도 링크됩니다.",20);
	ccreateCheckBox(td1, "OPT_TTBL", OPT_TTBL, "병력구성기능","게시판에 표시되는 병력을 보여줍니다.",0);
	ccreateCheckBox(td1, "OPT_MEMO", OPT_MEMO, "메모기능","간단한 메모",0);
	ccreateTextBox(td1, "OPT_MEMO_FONT_SIZE", OPT_MEMO_FONT_SIZE, "폰트사이즈","메모 폰트사이즈를 지정합니다. 기본 10",5,20);
	ccreateTextBox(td1, "OPT_MEMO_WIDTH", OPT_MEMO_WIDTH, "메모 폭","메모 공간 폭을 지정합니다. 기본 17",5,20);
	ccreateTextBox(td1, "OPT_MEMO_HEIGHT", OPT_MEMO_HEIGHT, "메모 높이","메모 공간 높이를 지정합니다. 기본 5",5,20);
	ccreateTextBox(td1, "OPT_MEMO_COUNT", OPT_MEMO_COUNT, "메모 수(1~5)","메모 칸 갯수를 지정합니다. 기본 1",5,20);
	ccreateCheckBox(td1, "OPT_DETAILS", OPT_DETAILS, "로그합계 표시기능","동맹 로그의 병력+원군의 합계를 표시합니다.",0);
	ccreateCheckBox(td1, "OPT_DETAILS_UP", OPT_DETAILS_UP, "합계를 위에 표시","합계를 아래가 아닌 위에 표시 합니다.",20);
	ccreateCheckBox(td1, "OPT_DECK_SET", OPT_DECK_SET, "덱 셋트 자동선택","초기 표시 세트를 현재 선택중인 거점으로 합니다.",0);
	ccreateCheckBox(td1, "OPT_PROFILE_MAPSTAR", OPT_PROFILE_MAPSTAR, "★개수 표시","지도화면에서 ★개수를 표시합니다.",0);
	ccreateTextBox(td1, "OPT_MAPSATR_SIZE", OPT_MAPSATR_SIZE, "★무시제한","지정한 개수 이하의 ★은 표시하지 않습니다. 기본 0",5,20);
	ccreateCheckBox(td2, "OPT_CTIME_B", OPT_CTIME_B, "완료시각 표시(건물)","건물 건축 완료 예정시간을 표시합니다.",0);
	ccreateCheckBox(td2, "OPT_CTIME_U", OPT_CTIME_U, "완료시각 표시(유닛)","유닛 생성 완료 예정시간을 표시합니다.",0);
	ccreateCheckBox(td2, "OPT_ALLY", OPT_ALLY, "동맹 표시 개선","동맹원들의 표시를 개선합니다.",0);
	ccreateCheckBox(td2, "OPT_ALLY_IS", OPT_ALLY_IS, "동맹 표시 정렬","동맹원 정보에 정렬을 추가합니다.",20);
	ccreateCheckBox(td2, "OPT_ALLY_XY", OPT_ALLY_XY, "동맹원 좌표 표시","동맹원들의 본 거점(본성) 좌표를 추가합니다.",20);
	ccreateCheckBox(td2, "OPT_ALLY_CSV", OPT_ALLY_CSV, "동맹원 정보 CSV","동맹원 상세 정보를 CSV로 표시합니다.",20);
	ccreateCheckBox(td2, "OPT_RES_T", OPT_RES_T, "자원 생산 합계 표시","자원 생산량의 합계를 표시합니다.",0);
	ccreateCheckBox(td2, "OPT_RES_TIME", OPT_RES_TIME, "자원 시간 표시","자원이 창고 최대량까지 남은 시간을 표시합니다.",0);
	ccreateCheckBox(td2, "OPT_REMOVELIST", OPT_REMOVELIST, "파괴중인 영지 표시","파괴중인 영지를 표시하고, 맵에 표시를 추가합니다.",0);
	ccreateCheckBox(td2, "OPT_MAPLIST", OPT_MAPLIST, "맵 지형 일람","맵 위에 거점 및 영지 리스트를 표시합니다.",0);
	ccreateCheckBox(td2, "OPT_DISTANCE", OPT_TTDISTANCE, "이동시간 표시","모든 [출병] 링크에 툴팁으로 이동 소요시간을 표시합니다.",0);
	createDistanceBox(td2, OPT_TTDISTANCE_ITEMS, 5);
	ccreateCheckBox(td2, "OPT_TTALLYPRSN", OPT_TTALLYPRSN, "동맹/군주 표시","모든 [거점/영지] 링크에 툴 팁으로 동뱅/군주 표시를 표시합니다.",0);
	ccreateCheckBox(td2, "OPT_AUTO_TROOP", OPT_AUTO_TROOP, "Auto Troop","출병 화면에서 지정된 시간에 출병 버튼을 클릭해 줍니다.",0);
	ccreateCheckBox(td3, "OPT_USER_STAR", OPT_USER_STAR, "군주 ★정보 표시","프로필 화면의 영지에 ★표시를 추가합니다.",0);
	ccreateCheckBox(td3, "OPT_USER_LEVEL", OPT_USER_LEVEL, "영지 레벨 표시","프로필 화면의 영지에 레벨 표시를 추가합니다.",0);
	ccreateCheckBox(td3, "OPT_MAPCENTER", OPT_MAPCENTER, "맵 중앙표시","맵 중앙을 확인할 수 있는 표시를 추가합니다.",0);
	ccreateCheckBox(td3, "OPT_TBREST", OPT_TBREST, "토벌 게이지 회복 시간 예측 기능","무장의 토벌 게이지가 300 또는 500이 되는 시간을 표시합니다.",0);
	ccreateCheckBox(td3, "OPT_DELMSG", OPT_DELMSG, "편지/보고서 삭제기능","편지나 보고서의 내용 페이지에 삭제 버튼을 추가합니다.",0);
	ccreateCheckBox(td3, "OPT_TSENDTIME", OPT_TSENDTIME, "출발시간 계산","출병 화면에서 도착 희망시간으로부터 출발시간을 계산해줍니다.",0);
	ccreateCheckBox(td3, "OPT_SMALLBTN", OPT_SMALLBTN, "소형 상황 아이콘","상황 정보 아이콘을 1줄로 표시합니다.",0);
//	한국 서버에는 없는 기능이라 다른 것으로 변경합니다.
	ccreateCheckBox(td3, "OPT_SMALLBTN_NY", OPT_SMALLBTN_NY, "서버이동 버튼","같은 계정의 다른 서버 본성으로 이동하는 버튼을 추가합니다.[1~4서버]",20);
	ccreateCheckBox(td3, "OPT_ATTACKMAP", OPT_ATTACKMAP, "출병 표시기능","맵 위에 현재 출병중 표시를 추가합니다.",0);
	ccreateCheckBox(td3, "OPT_CARD_CMB", OPT_CARD_CMB, "동일 카드 합성 버튼","카드 합성 후에 동일한 카드 합성을 할 수 있는 버튼을 추가합니다.",0);

	td3.appendChild(d.createElement("br"));
	var fs = d.createElement("fieldset");
	var lg = d.createElement("legend");
	lg.appendChild(d.createTextNode("　Present by ピカチュウ　") );
	fs.appendChild(lg);
	td3.appendChild(fs);
	ccreateCheckBox(fs, "OPT_PIKA_YOROZU", OPT_PIKA_YOROZU, "가챠폰 건망 방지기능","가차폰이 리셋되면 알려줍니다. - 현재 가챠폰 없음",0);
	ccreateCheckBox(fs, "OPT_PIKA_HPREST", OPT_PIKA_HPREST, "무장 회복시간 예측 기능","무장 HP가 100이되는 시간을 표시합니다.",0);
	ccreateCheckBox(fs, "OPT_PIKA_MAPHELP", OPT_PIKA_MAPHELP, "맵 화면 검색 개선","X좌표 부분에 999,999 같은 형식으로 입력해도 됩니다.",0);
	ccreateCheckBox(fs, "OPT_PIKA_TRDHELP", OPT_PIKA_TRDHELP, "트레이드 화면 입력 개선","4자리 숫자를 입력하면 카드 No로 검색합니다.",0);
	ccreateCheckBox(fs, "OPT_PIKA_BLINKBLD", OPT_PIKA_BLINKBLD, "도시화면 개선","건설중 표시를 깜빡입니다.",0);

	td3.appendChild(d.createElement("br"));
	var fs = d.createElement("fieldset");
	var lg = d.createElement("legend");
	lg.appendChild(d.createTextNode("　Present by su-zan　") );
	fs.appendChild(lg);
	td3.appendChild(fs);
	ccreateCheckBox(fs, "OPT_SUZAN_SEISAN", OPT_SUZAN_SEISAN, "거점 생산량 표시","거점의 생산량을 표시합니다.",0);
	
	
	ccreateButton(oc, "저장", "설정을 저장합니다.", function() {saveOptions()});
	ccreateButton(oc, "취소", "설정을 저장하지 않고 창을 닫습니다.", function() {deleteOptionsHtml()});
	ccreateButton(oc, "영지 링크 초기화", "영지 및 군주 링크를 초기화합니다.", function() {resetMapLink()});
	ccreateButton(oc, "동맹원 좌표 초기화", "동맹원 좌표를 모두 초기화합니다.", function() {resetUserXY()});
	ccreateButton(oc, "★/레벨 정보 초기화", "군주의 ★ 정보와 영지의 레벨 정보를 모두 초기화합니다.", function() {resetUserStar()});
	ccreateButton(oc, "영지 링크 직접 편집", "영지 링크의 텍스트를 수정합니다.", function(event) {mapLinkList(event) });
}

function createDistanceBox(container, items, num)
{
	var sels = ["기타", "없음", "검병(6)",
				"창병(7)", "궁병(5)", "기병(12)", "척후(9)", "충차(3)", 
				"모창병(10)", "노병(8)", "근위기병(15)", "척후기병(20)", "투석기(6)"];
	for(var i=0 ; i<num ; i++ ) {
		var src = "";
		if( sels.indexOf(items[i]) != -1 ) src = items[i];
		var cb = ccreateComboBox(container, "OPT_DISTANCE_CB" + i , sels, src, "표시" + (i+1), (i+1) + "행 째 표시", 20 );

		var tb = d.createElement("input");
		tb.type = "text";
		tb.id = "OPT_DISTANCE_TX" + i;
		tb.title = "예) 매우빠른 말(50)  과 같이 괄호안에 속도를 입력하세요.";
		if( src == "" ) {
			tb.value = items[i];
		}else{
			tb.disabled ="disabled";
		}
		tb.size = 12;
		
		cb.parentNode.appendChild(d.createTextNode(" "));
		cb.parentNode.appendChild(tb);
		(function(no) {
			$e(cb, "change", function() {
				var cb = $("OPT_DISTANCE_CB" + no);
				var tb = $("OPT_DISTANCE_TX" + no);
				if( !cb || !tb ) return;
				if( cb.value == sels[0] ) {
					tb.disabled ="";
				}else{
					tb.disabled ="disabled";
				}
			});
		})(i);
	}
}
function getDistanceBox(num)
{
	var ret = new Array();
	for(var i=0 ; i<num ; i++ ) {
		var cb = $("OPT_DISTANCE_CB" + i);
		var tb = $("OPT_DISTANCE_TX" + i);
		if( !cb || !tb ) return null;
		if( cb.value == "기타" ) {
			ret.push( tb.value );
		}else if( cb.value == "없음" ) {
			ret.push("");
		}else {
			ret.push( cb.value );
		}
	}
	return ret;
}

//////////////////////
// 건설 표시 처리
// 완료
//////////////////////
function disp_village() {
	if( location.pathname != "/village.php" ) {
		return ;
	}

	//costs
	var cost_wood = [
		[10,35,40,15],
		[25, 88, 100, 38],
		[58, 202, 230, 86],
		[173, 604, 690, 259],
		[431, 1510, 1725, 647],
		[1466, 2847, 3019, 1294],
		[2493, 4839, 5132, 2200],
		[3490, 6775, 7186, 3080],
		[4537, 8807, 9341, 4003],
		[5898, 11450, 12144, 5204],
		[8119, 14434, 15787, 6766],
		[11366, 20207, 22101, 9472],
		[17050, 30311, 33152, 14208],
		[25575, 45467, 49729, 21312],
		[38362, 68199, 74593, 31698]
	];
	var cost_stone= [
		[40, 10, 35, 15],
		[100, 25, 88, 38],
		[230, 58, 202, 86],
		[690, 173, 604, 259],
		[1725, 431, 1510, 647],
		[3019, 1466, 2847, 1294],
		[5132, 2493, 4839, 2200],
		[7186, 3490, 6775, 3080],
		[9341, 4537, 8807, 4003],
		[12144, 5898, 11450, 5204],
		[15787, 8119, 14434, 6766],
		[22101, 11366, 20207, 9472],
		[33152, 17050, 30311, 14208],
		[49729, 25575, 45467, 21312],
		[74593, 38362, 68199, 31968]
	];
	var cost_iron=[
		[35, 40, 10, 15],
		[88, 100, 25, 38],
		[202, 230, 58, 86],
		[604, 690, 173, 259],
		[1510, 1725, 431, 647],
		[2847, 3019, 1466, 1294],
		[4839, 5132, 2493, 2200],
		[6775, 7186, 3490, 3080],
		[8807, 9341, 4537, 4003],
		[11450, 12144, 5898, 5204],
		[14434, 15787, 8119, 6766],
		[20207, 22101, 11366, 9472],
		[30311, 33152, 17050, 14208],
		[45467, 49729, 25575, 21312],
		[68199, 74593, 38362, 31968]
	];
	var cost_rice=[
		[35, 35, 30, 0],
		[88, 88, 75, 0],
		[202, 202, 173, 0],
		[604, 604, 518, 0],
		[1510, 1510, 1294, 0],
		[3019, 3019, 2588, 0],
		[5132, 5132, 4399, 0],
		[7186, 7186, 6159, 0],
		[9341, 9341, 8007, 0],
		[12144, 12144, 10409, 0],
		[15787, 15787, 13532, 0],
		[22101, 22101, 18944, 0],
		[33152, 33152, 28416, 0],
		[49729, 49729, 42625, 0],
		[74593, 74593, 63937, 0]
	];
	var cost_souko=[
		[83, 141, 83, 63],
		[167, 281, 167, 126],
		[300, 506, 300, 226],
		[479, 810, 479, 362],
		[671, 1134, 671, 507],
		[1044, 1253, 1044, 835],
		[1462, 1754, 1462, 1169],
		[1973, 2368, 1973, 1578],
		[2664, 3196, 2664, 2131],
		[3596, 4315, 3596, 2877],
		[4854, 5825, 4854, 3883],
		[6311, 7573, 6311, 5048],
		[8204, 9845, 8204, 6563],
		[10255, 12306, 10255, 8204],
		[12819, 15382, 12819, 10255],
		[15382, 18459, 15382, 12306],
		[18459, 22151, 18459, 14767],
		[21228, 21228, 25473, 16982],
		[24412, 29294, 24412, 19529],
		[28074, 33688, 28074, 22459]
	];
	var cost_syukusya=[
		[35, 20, 35, 80],
		[53, 30, 53, 120],
		[89, 51, 89, 204],
		[147, 84, 147, 337],
		[228, 130, 228, 522],
		[336, 192, 336, 767],
		[476, 272, 476, 1089],
		[653, 373, 653, 1492],
		[868, 496, 868, 1984],
		[1129, 645, 1129, 2580],
		[2032, 1161, 2032, 4644],
		[3658, 2090, 3658, 4644],
		[6951, 3971, 6950, 15882],
		[13205, 7544, 13205, 30177],
		[25090, 14334, 25090, 57336]
	];
	var cost_kojo=[
		[780, 1560, 1560, 3900],
		[1248, 2496, 2496, 6240],
		[1997, 3994, 3994, 9984],
		[4193, 6290, 6290, 11182],
		[5871, 8806, 8806, 15655],
		[10958, 13698, 13698, 16437],
		[15342, 19177, 19177, 23013],
		[19944, 24930, 24930, 29916],
		[25928, 32410, 32410, 38891],
		[33706, 42132, 42132, 50559]
	];
	var cost_suisya=[
		[2940, 980, 980, 4900],
		[4704, 1568, 1568, 7840],
		[7526, 2509, 2509, 12544],
		[10537, 5268, 5268, 14049],
		[14751, 7376, 7376, 19668],
		[20652, 13768, 13768, 20652],
		[28913, 19275, 19275, 28913],
		[37587, 25058, 25058, 37587],
		[48863, 32576, 32576, 48863],
		[63523, 42348, 42348, 63523]
	];
	var cost_ichiba=[
		[100, 100, 50, 50],
		[334, 334, 191, 191],
		[1035, 1035, 592, 592],
		[2795, 2795, 1600, 1600],
		[6328, 6328, 4218, 4218],
		[13288, 13288, 8859, 8859],
		[25248, 25248, 16832, 16832],
		[42921, 42921, 28614, 28614],
		[64381, 64381, 42921, 42921],
		[90134, 90134, 60089, 60089]
	];
	var cost_kenkyu=[
		[275, 110, 110, 55],
		[413, 165, 165, 83],
		[619, 248, 248, 124],
		[1486, 836, 836, 557],
		[2228, 1253, 1253, 836],
		[7521, 6267, 6267, 5015],
		[13538, 11282, 11282, 9025],
		[21436, 17862, 17862, 14290],
		[44675, 37228, 37228, 29784],
		[87725, 73104, 73104, 58483]
	];
	var cost_kunren=[
		[1500, 1600, 2500, 3300],
		[2100, 2240, 3500, 3300],
		[2940, 3136, 4900, 6468],
		[6629, 7326, 13955, 6978],
		[13257, 14653, 27910, 13955],
		[32097, 37679, 55821, 13955],
		[64194, 75358, 111642, 27910],
		[128388, 150716, 223283, 55821],
		[256776, 301432, 446566, 111642],
		[513551, 602865, 893133, 223283]
	];
	var cost_kajiba=[
		[150, 200, 340, 170],
		[400, 300, 680, 340],
		[780, 585, 1326, 663],
		[1482, 1112, 2519, 1260],
		[2742, 2056, 4661, 2330],
		[4935, 3701, 8390, 4195],
		[8636, 6477, 14682, 7341],
		[17640, 14112, 28223, 10584],
		[31566, 25253, 50506, 18940],
		[50506, 40404, 80809, 30303]
	];
	var cost_bougu=[
		[150, 200, 340, 170],
		[300, 400, 680, 340],
		[585, 780, 1326, 663],
		[1112, 1482, 2519, 1260],
		[2056, 2742, 4661, 2330],
		[3701, 4935, 8390, 4195],
		[6477, 8636, 14682, 7341],
		[14112, 17640, 28223, 10584],
		[25253, 31566, 50506, 18940],
		[40404, 50506, 80809, 30303]
	];
	var cost_heiki=[
		[216, 216, 216, 72],
		[432, 432, 432, 144],
		[864, 864, 864, 288],
		[1224, 1224, 1224, 648],
		[1836, 1836, 1836, 972],
		[2662, 2662, 2662, 1409],
		[3860, 3860, 3860, 2044],
		[7357, 7357, 7357, 2452],
		[13242, 13242, 13242, 4414],
		[23836, 23836, 23836, 7945],
		[42905, 42905, 42905, 14302],
		[77229, 77229, 77229, 25743],
		[139013, 139013, 139013, 46338],
		[278026, 278026, 278026, 92675],
		[556051, 556051, 556051, 185350]
	];
	var cost_doujaku=[
		[700, 3500, 2100, 700],
		[1120, 5600, 3360, 1120],
		[1792, 8960, 5376, 1792],
		[3763, 10035, 7526, 3763],
		[5263, 14049, 10537, 5268],
		[9834, 14752, 14752, 9834],
		[13768, 20652, 20652, 13768],
		[17899, 26848, 26848, 17899],
		[23268, 34902, 34902, 23268],
		[30249, 45373, 45373, 30249]
	];
	var cost_renpei=[
		[112, 107, 107, 122],
		[224, 214, 214, 244],
		[448, 428, 428, 488],
		[759, 725, 725, 826],
		[1214, 1160, 1160, 1322],
		[2209, 2110, 2110, 2406],
		[3331, 3182, 3182, 3627],
		[4958, 4736, 4736, 5400],
		[8091, 7729, 7729, 8813],
		[11130, 10632, 10632, 12122]
	];
	var cost_heisya=[
		[72, 360, 72, 216],
		[144, 720, 144, 432],
		[288, 1440, 288, 864],
		[648, 1728, 648, 1296],
		[972, 2592, 972, 1944],
		[1409, 3758, 1409, 2819],
		[2725, 4088, 2725, 4088],
		[6744, 9810, 5518, 2453],
		[12140, 17658, 9933, 4415],
		[21852, 31784, 17879, 7946],
		[39333, 57212, 32182, 14303],
		[70800, 96545, 64364, 25745],
		[127440, 173781, 115854, 46342],
		[254879, 324392, 254879, 92683],
		[509759, 648784, 509759, 185367]
	];
	var cost_yumi=[
		[360, 72, 72, 216],
		[720, 144, 144, 432],
		[1440, 288, 288, 864],
		[1728, 648, 648, 1296],
		[2592, 972, 972, 1944],
		[3758, 1409, 1409, 2819],
		[5450, 2044, 2044, 4087],
		[9810, 6131, 6131, 2453],
		[17658, 12140, 9933, 4415],
		[31784, 21852, 17879, 7946],
		[57212, 39333, 32182, 14303],
		[96545, 70800, 64364, 25745],
		[173781, 127440, 115854, 46342],
		[324392, 254879, 254879, 92683],
		[648784, 509759, 509759, 185367]
	];
	var cost_uma=[
		[72, 72, 360, 216],
		[144, 144, 720, 432],
		[288, 288, 1440, 864],
		[648, 648, 1728, 1296],
		[972, 972, 2592, 1944],
		[1409, 1409, 3758, 2891],
		[2044, 2044, 5450, 4087],
		[5518, 6744, 9810, 2453],
		[9933, 12140, 17658, 4415],
		[17879, 21852, 31784, 7946],
		[32182, 39333, 57212, 14303],
		[64364, 70800, 96545, 25745],
		[115854, 127440, 173781, 46342],
		[254879, 254879, 324392, 92683],
		[509759, 509759, 648784, 185367]
	];

	var cost_shiro=[
		[0, 0, 0, 0],
		[1404, 546, 390, 780],
		[2570, 1000, 714, 1428],
		[4161, 2081, 2081, 2081],
		[7102, 3552, 3552, 3552],
		[9056, 9056, 6037, 6037],
		[14384, 14384, 9589, 9589],
		[22773, 22773, 15183, 15183],
		[33562, 33562, 22374, 22374],
		[44402, 57559, 32890, 29602],
		[65122, 84418, 48239, 43415],
		[95317, 123558, 70605, 63544],
		[113458, 154716, 154716, 92830],
		[150418, 150418, 315878, 135375],
		[219008, 219008, 492770, 164258],
		[294820, 294820, 663345, 221115],
		[488220, 488220, 827854, 318406],
		[839130, 839130, 915414, 457707],
		[1307581, 1307581, 1354280, 700491],
		[1901938, 1901938, 1969864, 1018896]
	];
	var cost_toride=[
		[104, 400, 136, 160],
		[243, 936, 319, 374],
		[438, 1685, 573, 673],
		[1110, 2467, 1357, 1233],
		[1887, 4194, 2307, 2097],
		[3236, 7191, 3954, 3596],
		[5177, 11505, 6327, 5753],
		[10430, 18776, 13560, 9387],
		[18839, 33912, 24492, 16956],
		[33914, 61043, 44087, 30523],
		[66939, 106495, 85196, 45640],
		[119786, 190570, 152456, 81672],
		[213820, 340166, 272133, 145786],
		[423566, 505021, 456148, 244365],
		[708513, 844765, 763014, 408756]
	];
	var cost_mura=[
		[400, 136, 104, 160],
		[936, 319, 243, 374],
		[1685, 573, 438, 673],
		[2467, 1357, 1110, 1233],
		[4194, 2307, 1887, 2097],
		[7191, 3954, 3236, 3596],
		[11505, 6327, 5177, 5753],
		[18776, 13560, 10430, 9387],
		[33912, 24492, 18839, 16956],
		[61043, 44087, 33914, 30523],
		[106495, 85196, 66939, 45640],
		[190570, 152456, 119786, 81672],
		[340166, 272133, 213820, 145786],
		[505021, 456148, 423566, 244365],
		[844765, 763014, 708513, 408756]
	];

	var costs = [];
	costs["벌채소"] = cost_wood;
	costs["채석장"] = cost_stone;
	costs["제철소"] = cost_iron;
	costs["밭"] = cost_rice;
	costs["창고"] = cost_souko;
	costs["숙사"] = cost_syukusya;
	costs["공장"] = cost_kojo;
	costs["수차"] = cost_suisya;
	costs["시장"] = cost_ichiba;
	costs["연구소"] = cost_kenkyu;
	costs["훈련소"] = cost_kunren;
	costs["대장간"] = cost_kajiba;
	costs["방어구공장"] = cost_bougu;
	costs["무기공장"] = cost_heiki;
	costs["동작대"] = cost_doujaku;
	costs["연병소"] = cost_renpei;
	costs["창병사"] = cost_heisya;
	costs["궁병사"] = cost_yumi;
	costs["마구간"] = cost_uma;
	costs["성"] = cost_shiro;
	costs["요새"] = cost_toride;
	costs["마을"] = cost_mura;

	var img_lv = new Array();
/*
	img_lv[0] = 'data:image/gif;base64,'+
				'R0lGODlhFwAWAMQAAKiTADs9BK+dAN7aALGjAMO2QernwPT038CzLOvmANfQgfn577OjDeLbnsjE'+
				'AOXkrrCtALurPsS7FvDtztXOau/qANXRAMf/If/6CLy4ACAgIL+sAGFyB7WdAP///////yH5BAEA'+
				'AB8ALAAAAAAXABYAAAW24PdxZGmepShyWOu+sMutcV3PXKXvSTL8v8Rux9FwLMikxSGhGAwUhxJZ'+
				'5GSu2Azk4el6FJBspropmwmIxUFS6DLMZTJ8Q5gcBPiGpzCXwxFfAhsCCh4IfUZzG20NAI4GBwSI'+
				'HIoMXRQRXAWScH5whV0LBYKTHaanHQARChQMAKinVbCnjo6zpkUjt7uxGhorKBy3Jb4qH77IvrDJ'+
				'xcbOIqgBAc/UxqfS1dkfptja1R3d3tXT2iEAOw==';
	img_lv[1] = 'data:image/gif;base64,'+
				'R0lGODlhFwAWAMQAAEBCAP//IbKcAP7+6mZ5AMjEAPnnRKiTANXRAO3YALy4AP/6CP/zgb+sAO/q'+
				'ACAgIP/6Et7aAP7xV9C2AP///7WdANXRAPLVB6+sALqhAP/7JevmAK2YAP/mAd7aAP///yH5BAEA'+
				'AB8ALAAAAAAXABYAAAWi4PcRZGmepSgSQeu+sEusS23fOD4TTu/7keDm5yM8CJakMlnwaCCFpdJI'+
				'UFivCgxiQJFgsFdqY0xuCBKMrqBMFrPHgo763XC/OXIJh25n47t7b1RgVxwGgIQKfWUcEoB8RxWS'+
				'k5IcExcZHJSTVJuUB6ACnhVGI6OnnA8PKygEoyWqKh+qtKqbtbGyuiKUAAC7wLKTvsHFH5LExsEV'+
				'ycrBv8YhADs=';
	img_lv[2] = 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPz4Lr+vALKcAGZ5AP/5wP//Ie/qAKeSAP/zlenkAP////7xa7y4AP/n'+
				'F//6CP7+6t7aACAgIL+sAPXTBf/zgf/8TdXRAP7zq7WdAKyaAP381v3rQ+XHAMjEAOvmAMKtAPrn'+
				'Bf36VuzXAP/n5//8c/7yl////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAXABYAAAbDwNOJ'+
				'QCwaj0WhkGBoOp9QJ2H5qFqvWOyUcOh6u5Fw+PPtEiSEi3p98ShKGIzFw1afCY28viFa+P0BGnsN'+
				'dxOGhwMVDCMaDgscA4eGhZKGAxqYCRsgkZKUlRkaAhUQjBmVn5IaIQUFIwgIp55ogw0aDAsQFXEY'+
				'gnuphhoFubwmnYd3GcrLGhQdsNADy8rJ08qY0tbTZ0Pa3tZnEktIBN5FEuJK6Ovo1uzoSvHy0wAA'+
				'8vf3y/X4/ErK+/36ZQAYsJ+9gEEAADs=';
	img_lv[3] = 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPXZMcjEAKyaAP7+6mZ5AP//If32lu/qANfBAKeSALy4AP/5wP/8Tfnh'+
				'BP/6CLWdACAgIN7aAL+sAP/5rP3rQ/TXHP/////8Yf381uzXANXRALGjAL2rAPflWuvmAPzpLunk'+
				'AP7xa//WQvzkAv36Vv/0l//nF////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACgALAAAAAAXABYAAAbFQBSq'+
				'QCwaj0WhsGBoOp9QZ2H5qFqvWOy0gOh6u5Jw+PPtFiKFjXq9EYQaJgpGwFafC4u8nlO6+P0gHHp5'+
				'dxOGhxwmIhoDJxcVHIeGhZKGHBwJFRkUAwOVlJWdFH8MHZGHoIggDh0KGn4Op5NogwscJBcHrRUX'+
				'BKaDdxDCwxAMfxcZjMQQwcsQCgEeHhYKCs7Nzp2dzsJnQ9zgw2cRS0gF3EUR5Erq7erL7upK8/TE'+
				'AAD0+fnD9/r+SsL6/fsHQeDAf/gGBgEAOw==';
	img_lv[4] = 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAP/8TbWdALqhAKiTAP381mZ5AP//If32gurlAO/qAL+vAP/6CLy4AP/5'+
				'wP///7+sAOHdANTBAP/7JSAgINXRAP74q7CtAP7xa/LVB7GjAP756sjEAP7xV6yaAOvmAMKtAP//'+
				'/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACEALAAAAAAXABYAAAbAwFDI'+
				'QCwaj0Wh0HBoOp9Qp2HJqFqvWOzUoOh6v4pI5ANWGCiGinq95nACEw5bfTY07vj7JVF4dC55d3UQ'+
				'hIUQGgkbGH4ahoSDjhogDg4ejI4QkIYeGBsSBH4eHgKGmoSIDxsOD6yXhXWBGgsOFhgIDxYdCxp5'+
				'dQK/wAKiHhl+BATBAr7JwAQDGQPIycvMv8fS0xRD1dzAZ9pDSAbVRRTgQubp5snq5krv8MEAAPD1'+
				'9cDz9vpKv/n7+wL8/dtH718QADs=';
	img_lv[5] = 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPXZMbWdAL+pAKeSAP/5wGZ5AP//If/zgb+vAPz3AP/6CP///+/qAPfl'+
				'WrKcAP/5rL+sAN7aACAgIPXTBdXRALy4AKyaAP/7OP/8YdXRAP381v/6EMjEAP/sLOvmANK/APnn'+
				'RP7xa/vuWcKtAP/mAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACYALAAAAAAXABYAAAbHQJPJ'+
				'QCwaj0Wh0HBoOp9Qp2G5qFqvWOzU0Oh6u5Kw+PNtGCaGinpd6Sg4HExG0WFXzgaLfm/RMP4MEBoX'+
				'fBZ4EYiJDx4MJRePFwKJiIeTEQ8iDB4IEAgkD5aVkxcQDAUjpRAXoWiWERcJHgSzf6uTeIUWpBsg'+
				'BCGBhHx4AsTFAgWApgMPxgLDzQIEAQ4OFLPMxs/QkBfYzWdD0OLfExNLSAbiReVKJuXv5c3w7O31'+
				'QsYAAPb77cX5/ABNEPsXkJ8AggX56QsYBAA7';
	img_lv[6] = 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPzlQsjEAKypAP7+6mZ5AP//If/6CP/9iNfTAKeSANfBALy4AP/5rP7x'+
				'a/nhBLWdAL+sAP///yAgIP/5wN7aAO/qAOXHANK/APflWv/zgbKcANXRAP381r+vAPTXHPz3AP37'+
				'luvmAP/mA66eAP/n572fAP/WQv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACgALAAAAAAXABYAAAa/QBSq'+
				'QCwaj0WhsGBoOp9QZ2F5qFqvWOy0YOl6vZWw6OstTAqctDotACESgrXaXGDY7wyShxAa4PF0EYKD'+
				'ESQhBAskioSCgYwbIxIaDg0aCxuMjoSGEhIUHRINJJlnjIWeDwoenaOEdH95BAQYCgESISR/dBC8'+
				'vRC2nZ4eJL4Qu8UQChcZGR8KChvFx8jPz9HIZkPI29ITE0tIBdtF3koo3ujexenl5u5CvgAA7/Tm'+
				'vfL1+Si8+Pr1EP381ZunLwgAOw==';
	img_lv[7] = 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPvkLb2rALGjAP/+wGZ5AP//Ie/qAP/8daiTANC2AP///7y4AP7xV/LV'+
				'B+HdAP/5rP/6CL+sACAgINXRAP756vz3ALWdAK+sAP/6Ev3xlvrtRcjEAPrpbOvmAL2fAKyaAP/s'+
				'LP/mAf/dvda4AMKtAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACYALAAAAAAXABYAAAbBQJOp'+
				'QCwaj0WhsGBoOp9QZ2EZqVqvWOy0cOh6D4+HxxP2fLuFSYHCbnMsCA4nk+G02+kCY8/HQBYEC4IQ'+
				'GHx7eRKJigN/DSIhCw0DiomIlBKMCyAgEBUlk5SWlAMhGwkikSAXl6KjAwMaCwqgoWqGhiACgKq3'+
				'DK2UIAELHSCXlWoXycrJCQoOAgnLynnSywnX1clpQ9nd0xMTS0gF2UXgSibg6uDS6+fo8ELLAADx'+
				'9ujK9Pf7Jsn6/Pcu/AN4rx6/IAA7';
	img_lv[8] = 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPXZMbWdANbSAKiTAP381mZ5AP32lv//IeznAL+vAPv4bf/////+wN7a'+
				'AP/6CLy4APflWtXRAL+sACAgIPnhBP/5rP3xgv/8Ta+dAP7+6u/qAPTXHLGjAP/7OsjEAL2fAOvm'+
				'AP/uV//dvcGuAP/n5//mAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAXABYAAAbPwNPJ'+
				'QCwaj0Wh0IBoOp9Qp2H5qFqvWOzUsOl6u46wOPTdGCgGiXot+XgOlgNm8GFLzgaIft+5MBYRDQwa'+
				'CR17EHgTiosZDAwJJg0FIhmLiomWExkLjgwWJBmVlpiWGQkaGo4WCh2ZpIodChoNChUFDBeii3iH'+
				'EBkVfwQEnAcZvXgCycoZgg2CBQkZysnI08kEARERHAoE1gLV38Lj3+AUQ+XpymfnQ0gG5UUU7ULz'+
				'9vPW9/NK/P3TAAD6CRSoDODAg0qSGUSIUMBChggDMgwCADs=';
	img_lv[9] = 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPXZRbWdANXRAKiTAP7+6mZ5AP//If/5rNC2AL2oAP/6CP3xgv381vTX'+
				'HLy4AN7aAL+sAO/qAP///yAgINXRAK+sAPvuWezXALGjAP/8Tf3xlsjEAOvmAKyaAP/n597aAMGu'+
				'ANa4AP/8Yf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACQALAAAAAAXABYAAAbBQBLJ'+
				'QCwaj0Wh0HBoOp9Qp2G5qFqvWOzUIOl6u5CwuPOVGCiGinpd4YA0CMQIxGFXzoaHfm8ZNBoIBRMI'+
				'Fnt6eBGJihkIDR4eGBMTGYqJiJURGRMNIY+blJWXlYybgRMMoIqiiwoXCBuCA6mWaIZ7jx4Opx4C'+
				'tngCwMHAHgoFBQkZwsC/ysAECQEOBM0CzNQE2NTVFEPa3tvcQ0gG1EUU4ULn6ufK6+dK8PHCAADx'+
				'9vbB9Pf7SsD6/PwE/APIrx7AIAA7';
	img_lv[10]= 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAP/7OsjEALCtAP7+6mZ5AO3YAP37lv//If/6CKiTAP77a7WdAN7aAP/5'+
				'wPLVB/flWr+sAO/qALGjANXRAP/6EiAgIP////z2rsKtANXRAP/8Tf/zgby4AL+vAP381vnnROvm'+
				'AK+dAP/mAfvjGd7aAPXZRdC2AP7xV//n572fANfBAP/7Jf///wAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC0ALAAAAAAXABYAAAbjwFar'+
				'QCwaj0WhsIBoOp9QZ2GZqFqvWOy0IOlKGuCQOAQuh7wFS0HDFpRYFUG7tMFgAnJ2utDpDCgEFygD'+
				'fQMHF4gXC4QdexEREwYcghOQBgQfKyOIGZWOjxObKBOkDh8iqJMjnmqPkKIKCgaCIhEiKBcGrAWu'+
				'oYKxmxyxChgfpBF7fR0iIL8KHoggD4erpHsM2Le0qLiIBCQi2AzX2AonDx4K5Q8QJuni42rww/P0'+
				'8GlD8Pr74mkWS0gK8Cti4Z+SgggL6ktYUInDh/AAAHhIkaI4iRUzKsGGUaNGBh09apzoMQgAOw==';
	img_lv[11]= 'data:image/gif;base64,'+
				'R0lGODlhFwAWAMQAAEBCAP/7JdXRALKcAP7+6mZ5AP//IdC2AKiTAO/qAP7xV7y4APLVB7qhAP/z'+
				'gf/6CCAgIPnnRL+sAP///97aANXRAO3YAK+sAP/6ErWdAMjEAOvmAK2YAP/mAd7aAP///yH5BAEA'+
				'AB8ALAAAAAAXABYAAAW64PcVZGmepSgWRuu+sFusT23fOD4XSd9TwI0vAaQIewVIQcAUaDwBjKb5'+
				'jE6ZycJie6kQJooL1wsWb7OS9MDiAA/UbHdagp4POnI1XvFO19McexxzgWCDfkpzEoUKh4uCc1lb'+
				'WxwRhpOVl2eJhAqGnZ+IBRmkGRwHDA0cpaepq6RZpaQItAOytAi2sBAjsr6/pUm8IyijvyUQwyLJ'+
				'zMm+zckq0tOyAADT2Nil1tndKqTc3t4Z4eLe1+IhADs=';
	img_lv[12]= 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPz4Lr+vAK+sAP/5wGZ5AP//Ie/qAP/zgenkAKeSAP///7WdAP/nF/7z'+
				'q97aAP7xV7y4AP7+6vLVB9XRAP/6CCAgIL+sAP7xa7KcAP3rQ//zldXRAPrnBf381sjEAOvmAOXH'+
				'AN7aAPnnRL2fAP/n5//8TdC2AKyaAO3YAP/mAf/8c//7Jf7yl//6EsKtAP///wAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAXABYAAAbiQBis'+
				'QCwaj0WhsGBoOp9QZ2FZqVqvWOy0cOgeHmCQGAQug7wFS4HC/ohYrk87sXI4THJ2uhCJDDgSCxAD'+
				'fhALh4cBhBF7FxcZKQiCGY8IGCkoDQsalBeNjhkqk6AopRseL52fFygdgiiODCgCCBKYDLirra+O'+
				'rQQEKQoKuAx7fREoI6/IGAsSCHYOKH17xCiGECiyBM7RLRng1bgoJxMC2igTIcLs4Bni46Xu7sT1'+
				'aUP1+frEaRZLSAX2FbHgTwnBgwTzISSopKHDegAAOJw4kVhEihiV4LqYMSMDjh0zSuwYBAA7';
	img_lv[13]= 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPzpLsjEAK+sAP7+6mZ5AO3YAP7xa///If/6CKeSAP/5rN7aALWdAP/6'+
				'EvflWr+sANXRAP/5wO/qACAgILGjAP32lv////LVB/3rQ/XZMdXRANC2AP381r2rALy4AP/zgfTX'+
				'HP7xV//8TenkAOvmAP/7Jf/mAdfBAP/WQqyaAP/8Yb2fAP/0l97aAP/nF////wAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAXABYAAAblQBis'+
				'QCwaj0WhsIBoOp9QZ2GZqFqvWOy0MOlOGOCSuAQul7wFSmHDFrhMDkGbNGotVnJ2uvD5DCIEFyID'+
				'fiIXh4cBhB97EBAVBiCCFY8tBwYqLxcZlBCNjhUnk6AVKBkdCyoqjp+PoiKdqguIEh6UraGCKg0V'+
				'ASceCgaHJ7dqfR8qGboqohbAygS2FXsN1SqGIrsNEogXHQYVFQ3U1hwYHtoKGg8PIQoK1eNq8Q2q'+
				'2tb29PJD+v3+aRSWICnwjwiFgEoOKjyob+FBJRAj0gMAIKJFi/EoXtyopJpGjhwbfATJsSLIIAA7';
	img_lv[14]= 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPnnRL+vALCtAP381mZ5AP//Ie/qAP7xa9C2AKiTAP74q7WdAN7aAP/7'+
				'JfLVB////7y4ANXRAP/6CCAgIL+sAOrlAP/zgf7xV7GjAP/5wNXRAP7+6v/6EsjEAKyaAOvmAL2f'+
				'AN7aAP/8Tf/mAf/n58KtAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAXABYAAAbYwNOp'+
				'QCwaj0WhsGBoOp9QZ2E5qVqvWOy0cOgeGmCQ1xv2FigFidojcnQ86rVn5ICrz4VIZLDhQDADensW'+
				'BH+BengVFRkWF38ZiowcCI+KFYmRJJUZJhoaH5WKmIuaGB8MHwgcCQp/H6cMoxmlrxYQHBoQupV4'+
				'gh8BfwoKAhoLCI4LGAIZGXgMzx8YrtCvD8EKz87PCgkPAtjPDMPe4LFo4eLC6Nvq4WdD6/HyZxRL'+
				'SAXzRBT1Svv+++v+7VNCsCA6AAAKKlQYDuHCh0qeOYQIkcFEihATUgwCADs=';
	img_lv[15]= 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPXZMb+vAK+sAP/5wGZ5AP//If7xa+vmANC2AKeSAP/6Ev///7WdAPfl'+
				'Wv/5rL2fAP/6CPLVB7y4AP/7JSAgIL+sAN7aAO3YAP381tXRANXRAPnnRLKcAPfyAP/zgcjEAP7x'+
				'V//sLP7+6v/mAayaAP/8Yd7aAP/7OPz3AMKtAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACsALAAAAAAXABYAAAbqwNWq'+
				'QCwaj0WhsGBoOp9QZ2EZqVqvWOy0gOgiLmDvF0z2FiqFjRp0oixA69RigTKl4JtzYTIZaEYMIQN9'+
				'GgyGDA8agxN6FhYdGB+BHY8iDCQlmSUNjo2OHSSTjwcMIh8PHyqUFp4WJaEhJa4PDAQhtA+yrGiO'+
				'rrCyJQIiCsSGunp8EyUcgSXKDxkJCsy5fHoN2CUhzdgEh7UCHeLX2QkSApsNCgEODhLE4h3k2Znx'+
				'4sQKHdjYZ0P7/wADnqmwBEmBgA2KVCCoZKHDhQAfLlRCseI/AAAqatS4D+PGj0qweQQJssFIkiAz'+
				'kgwCADs=';
	img_lv[16]= 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPzlQsjEAKypAP7+6mZ5AP//IdfBAP/zgf/6CKeSAP/5rLWdAO/qAP/m'+
				'A7+sAN7aAP////LVB/flWrKcACAgINXRAP/5wNC2AOXHALy4AP37lr+vANXRAPTXHP7xa/381uvm'+
				'APz3AP/7Ja6eAP7xV72fAP/mAf/n5//9jN7aAP/WQv/6Eu3YAP///wAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC4ALAAAAAAXABYAAAbnQJer'+
				'QCwaj0WhsGBoOp9QZ2GZqFqvWOy00Og2IOCQ9xseFyoFi1qgGrEEaotAlFLB4+eCRkPqECIlA3sk'+
				'HAQbgnt7eQ8PFC0IgBSMJBsEBySYjA+LkyeRjQ4RCB8LCAeSm2iaJJ4lJA+UEREXIBELr6kFq62v'+
				'JLMnChyyuHmJJAGAJHwEBBgKyBvKGnkM1SQlydXIsrMcJNXU1QoYEhwK4hkTEx4KChTv4eLt7+/t'+
				'89XgFUP4/P3+Z/qGICngj0GRCgGFIFyIsB9DhEoiSuQHAIDEixfxVcTIUUm1jR07MgAZsqPFkEEA'+
				'ADs=';
	img_lv[17] = 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPvkLb2rAK+sAP/+wP//IWZ5ANC2AP/zge/qAKiTALy4AP////7xV/LV'+
				'B97aALWdAP/7JdXRAP7+6v/5rP/6CCAgIL+sAPrpbO3YAP/6ErGjAPrtRdXRAMjEAOvmAKyaAN7a'+
				'AMKtAP3xlv/8df/mAb2fAP/sLNa4AP/dvf/n5/z3AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAAAXABYAAAbcQBbL'+
				'QCwaj0Wh0FBoOp9Qp2FZqVqvWOzUkOgmHuCPOPwJew0Wg2TtCUU0HolnRfJ4NPC1BG1YLAYdEwwN'+
				'A38UDAQMihSFC3wXFxsZCIMbkYcNJSeVkI+QGyWcG4cgIBQTIpYXnpGhDZYbJxwKriAQt6ygnJEb'+
				'GyMMHaqraX4LIByDIMUgAoi2xXy3ECANydIgAQwYttLRtwoHDgIK0uDi5N1p0hAK7evs7utoQ+/1'+
				'9mgWS0gG90QW+Ur+Cfz3buA/JQgTrgMAIKFDh9IYPpyo5JZEihQhXMRIsSHGIAA7';
	img_lv[18] = 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPnnRMjEAK+sAP381mZ5AOznAP32lv//If/6CKiTAPTXHLWdAN7aAPv4'+
				'bf/////+wL+sAO/qAPLVByAgILGjANXRAP/zgf/5rPXZMfflWv7+6tC2AL+vALy4ANXRAP/mAevm'+
				'AP/7Ov/7Jf7xV//8Tf/6Er2fAP/n58GuAK+dAP/dvd7aAP///wAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC0ALAAAAAAXABYAAAbrwFar'+
				'QCwaj0WhsIBoOp9QZ2GZqFqvWOy0IOlKGuCQOAQuN8YFSsHCFrBGJkFbdMAcSiy5JV3weAYfGw8k'+
				'A38XDw4kEA8bBoV8EREVBockFZIPDwYgEASWkZCRFSCDlxUOmQ8YKSoqoGqRkqSWFZMbgqodlxGh'+
				'soMKCh0bEB0gBA8Xu3x+HioBvwqkDsCoByp+fAzaKiSDrSqLEIsEBhXa2doKHBMdCukZGhoL7doM'+
				'6OnA9QzA/PppQ/oCCqyXhsISJAUGFqFgUAnDhwwDQmSopKJFfQAAWNy4sV5GjiCVaPsYMiQDkiVD'+
				'aiwZBAA7';
	img_lv[19]= 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPnnRLqhAK+sAP381v//IWZ5AOvmAP/zgdXRAKiTAPTXHP///7WdAP/6'+
				'CO3YAP/5rPfyAN7aALy4AP/6EtXRAL+sACAgIP/8Tf7+6rGjANC2APLVB8jEAP7xV//7Jf3xlqya'+
				'AMGuAP/n597aAPXZRf/8Yda4AP/mAb2fAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACoALAAAAAAXABYAAAbeQJXK'+
				'QCwaj0Wh0FBoOp9Qp2HpqFqvWOzUcOgeJGDvF0z2Gi6GirpD+lA6axIGAjGR4JWzYTIZJDIMHgN9'+
				'CQQEEIAQgxN6FhYaDwiBGo8QBCEhDwwMlBaNjhook48MBCKYpZ2fj6IelBoQpYgMCKpojqyjGiIe'+
				'ECCACbZ7fCEBgSHEmAu0IQ3Oes4NIR7H0SECGRkbGtHQzgobHAIK0eAlC+TdaNENCu7s7e/sZ0Pw'+
				'9vdnF0tIBvhEF/qUABwIEB5BgEoSKmQHAIDChw+jNYRIUYmziRUrNsCYsaLDjEEAADs=';
	img_lv[20]= 'data:image/gif;base64,'+
				'R0lGODlhFwAWANUAAEBCAPXZRcjEAKypAP381mZ5AOXHAP37lv//If/6CKShAP/nF/77a////97a'+
				'ALWdAP/5wNXRAPXTBfz2ru/qACAgIP/zgb+sAPz4LrGjAP7+6vflWt7aALy4AL2rAP/8Tf/mAevm'+
				'AMGuANfBAP3rQ6yaAOnkAKeSAOzXAP/n5/vuWc/LAP7yl//8c/v2C72fAP/WQv/7OsaqAP///wAA'+
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADMALAAAAAAXABYAAAb2wNms'+
				'QCwaj0WhsIBoOp9QZ2GZqFqvWOy0QOlSHGBwaBwWjwuVQmQtMLUmk49gJeB84DHBGl3odDIqDYKC'+
				'GAMDB4MNDAMdfBcXGRYMKCULDSQlKBoEIyCCIhmOjxklpSwEIiUQBKUlFg0goWmPFw8lHhYaKCco'+
				'DSolFyWBKLIFtBkgEBC7J54WrROsD3x+GQwNGhZwEx6CARKIscUPthDY2yzCgxoLGRnTaeQlEgYn'+
				'9vbuEhsBHifk8AX+lfpHsFUJgmiGEFzI8B+aCkuQBGRYpAJEJRYzWlyo0aKSjyAJAgAAsmTJfyNN'+
				'qlRCLuXKlQ9cvlxJ8mUQADs=';
*/
	img_lv[0] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWAMQAAKiTADs9BK+dAN7aALGjAMO2QernwPT038CzLOvmANfQgfn577OjDeLbnsjE'+
		'AOXkrrCtALurPsS7FvDtztXOau/qANXRAMf/If/6CLy4ACAgIL+sAGFyB7WdAP///////yH5BAEA'+
		'AB8ALAAAAAAXABYAAAW24PdxZGmepShyWOu+sMutcV3PXKXvSTL8v8Rux9FwLMikxSGhGAwUhxJZ'+
		'5GSu2Azk4el6FJBspropmwmIxUFS6DLMZTJ8Q5gcBPiGpzCXwxFfAhsCCh4IfUZzG20NAI4GBwSI'+
		'HIoMXRQRXAWScH5whV0LBYKTHaanHQARChQMAKinVbCnjo6zpkUjt7uxGhorKBy3Jb4qH77IvrDJ'+
		'xcbOIqgBAc/UxqfS1dkfptja1R3d3tXT2iEAOw==';
	img_lv[1] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWAMQAAEBCAP//IbKcAP7+6mZ5AMjEAPnnRKiTANXRAO3YALy4AP/6CP/zgb+sAO/q'+
		'ACAgIP/6Et7aAP7xV9C2AP///7WdANXRAPLVB6+sALqhAP/7JevmAK2YAP/mAd7aAP///yH5BAEA'+
		'AB8ALAAAAAAXABYAAAWh4PcRZGmepSgSQeu+sEusS23fOD4TTu/7keDm5yM8CJakMlnwaCCFpdJI'+
		'UFivCgxiQJFgsFdqY0xuCBKMrqBMFrPHgo763XC/OXIJh25n47t7b31lHAaAfEd0DRwSh4JHFZGS'+
		'kRwTFxkck5JUmpMHnwKdFUYjoqabDw8rKASiJakqH6mzqZq0sLG5IpMAALq/sZK9wMQfkcPFwBXI'+
		'ycC+xSEAOw==';
	img_lv[2] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPz4Lr+vALKcAGZ5AP/5wP//Ie/qAKeSAP/zlenkAP////7xa7y4AP/n'+
		'F//6CP7+6t7aACAgIL+sAPXTBf/zgf/8TdXRAP7zq7WdAKyaAP381v3rQ+XHAMjEAOvmAMKtAPrn'+
		'Bf36VuzXAP/n5//8c/7yl////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAXABYAAAbDwNOJ'+
		'QCwaj0WhkGBoOp9QJ2H5qFqvWOyUcOh6u5Fw+PPtEiSEi3p98ShKGIzFw1afCY28viFa+P0BGnsN'+
		'dxOGhwMVDCMaDgscA4eGhZKGAxqYCRsgkZKUlRkaAhUQjBmVn5IaIQUFIwgIp55olRMaDAsQFXEY'+
		'Gqi0lRoFubwmnYd3GcrLGhQdsNADy8rJ08qY0tbTZ0Pa3tZnEktIBN5FEuJK6Ovo1uzoSvHy0wAA'+
		'8vf3y/X4/ErK+/36ZQAYsJ+9gEEAADs=';
	img_lv[3] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPXZMcjEAKyaAP7+6mZ5AP//If32lu/qANfBAKeSALy4AP/5wP/8Tfnh'+
		'BP/6CLWdACAgIN7aAL+sAP/5rP3rQ/TXHP/////8Yf381uzXANXRALGjAL2rAPflWuvmAPzpLunk'+
		'AP7xa//WQvzkAv36Vv/0l//nF////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACgALAAAAAAXABYAAAbEQBSq'+
		'QCwaj0WhsGBoOp9QZ2H5qFqvWOy0gOh6u5Jw+PPtFiKFjXq9EYQaJgpGwFafC4u8nlO6+P0gHHp5'+
		'dxOGhxwmIhoDJxcVHIeGhZKGHBwJFRkUAwOVlJWdFH8MHZ9olRMcIA4dChp+DqcFlRwkFweuFRcE'+
		'ppJ3EMHCEAx/FxmMwxDAyhAKAR4eFgoKzczNnZ3NwWdD29/CZxFLSAXbRRHjSuns6crt6Ury88MA'+
		'APP4+ML2+f1Kwfz8+YMQUKC/ewKDAAA7';
	img_lv[4] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAP/8TbWdALqhAKiTAP381mZ5AP//If32gurlAO/qAL+vAP/6CLy4AP/5'+
		'wP///7+sAOHdANTBAP/7JSAgINXRAP74q7CtAP7xa/LVB7GjAP756sjEAP7xV6yaAOvmAMKtAP//'+
		'/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACEALAAAAAAXABYAAAa/wFDI'+
		'QCwaj0Wh0HBoOp9Qp2HJqFqvWOzUoOh6v4pI5ANWGCiGinq95nACEw5bfTY07vj7JVF4dC55d3UQ'+
		'hIUQGgkbGH4ahoSDjhogDg4ejI4QkIYeGBsSBH4eHgKGmoSIDxsOD6yXhaaHCw4WGAgPFh0Lja9o'+
		'Ar6/AqIeGX4EBMACdcjABAMZA8fIysu/xtHSFEPU279n2UNIBtRFFN9C5ejlyOnlSu7vwAAA7/T0'+
		'v/L1+Uq++Pr6Av386ZvnLwgAOw==';
	img_lv[5] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPXZMbWdAL+pAKeSAP/5wGZ5AP//If/zgb+vAPz3AP/6CP///+/qAPfl'+
		'WrKcAP/5rL+sAN7aACAgIPXTBdXRALy4AKyaAP/7OP/8YdXRAP381v/6EMjEAP/sLOvmANK/APnn'+
		'RP7xa/vuWcKtAP/mAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACYALAAAAAAXABYAAAbGQJPJ'+
		'QCwaj0Wh0HBoOp9Qp2G5qFqvWOzU0Oh6u5Kw+PNtGCaGinpd6Sg4HExG0WFXzgaLfm/RMP4MEBoX'+
		'fBZ4EYiJDx4MJRePFwKJiIeTEQ8iDB4IEAgkD5aVkxcQDAUjpRAXoWiWERcJHgSzf6uToomkGyAE'+
		'IYG2iXgCw8QCBYCmAw/FAsLMAgQBDg4Us8vFzs+QF9fMZ0PP4d4TE0tIBuFF5Eom5O7kzO/r7PRC'+
		'xQAA9frsxPj7/yaG+QO4T8BAgvvyAQwCADs=';
	img_lv[6] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPzlQsjEAKypAP7+6mZ5AP//If/6CP/9iNfTAKeSANfBALy4AP/5rP7x'+
		'a/nhBLWdAL+sAP///yAgIP/5wN7aAO/qAOXHANK/APflWv/zgbKcANXRAP381r+vAPTXHPz3AP37'+
		'luvmAP/mA66eAP/n572fAP/WQv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACgALAAAAAAXABYAAAa/QBSq'+
		'QCwaj0WhsGBoOp9QZ2F5qFqvWOy0YOl6vZWw6OstTAqctDotACESgrXaXGDY7wyShxAa4PF0EYKD'+
		'ESQhBAskioSCgYwbIxIaDg0aCxuMjoSGEhIUHRINJJlnjIWeDwoenaOEmoMkBAQYCgESIa2DdBC8'+
		'vRC2nZ4eJL4Qu8UQChcZGR8KChvFx8jPz9HIZkPI29ITE0tIBdtF3koo3ujexenl5u5CvgAA7/Tm'+
		'vfL1+Si8+Pr1EP381ZunLwgAOw==';
	img_lv[7] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPvkLb2rALGjAP/+wGZ5AP//Ie/qAP/8daiTANC2AP///7y4AP7xV/LV'+
		'B+HdAP/5rP/6CL+sACAgINXRAP756vz3ALWdAK+sAP/6Ev3xlvrtRcjEAPrpbOvmAL2fAKyaAP/s'+
		'LP/mAf/dvda4AMKtAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACYALAAAAAAXABYAAAbAQJOp'+
		'QCwaj0WhsGBoOp9QZ2EZqVqvWOy0cOh6D4+HxxP2fLuFSYHCbnMsCA4nk+G02+kCY8/HQBYEC4IQ'+
		'GHx7eRKJigN/DSIhCw0DiomIlBKMCyAgEBUlk5SWlAMhGwkikSAXl6KjAwMaCwqgoWqXiiACgKq3'+
		'rZQgAQsdILcSeRfIycgJCg4CCcrJx9HJCdbUyGlD2NzSExNLSAXYRd9KJt/p39Hq5ufvQsoAAPD1'+
		'58nz9vomyPn79hf8/bNHb18QADs=';
	img_lv[8] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPXZMbWdANbSAKiTAP381mZ5AP32lv//IeznAL+vAPv4bf/////+wN7a'+
		'AP/6CLy4APflWtXRAL+sACAgIPnhBP/5rP3xgv/8Ta+dAP7+6u/qAPTXHLGjAP/7OsjEAL2fAOvm'+
		'AP/uV//dvcGuAP/n5//mAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAXABYAAAbNwNPJ'+
		'QCwaj0Wh0IBoOp9Qp2H5qFqvWOzUsOl6u46wOPTdGCgGiXot+XgOlgNm8GFLzgaIft+5MBYRDQwa'+
		'CR17EHgTiosZDAwJJg0FIhmLiomWExkLjgwWJBmVlpiWGQkaGo4WCh2ZpIodChoNChUFDBeii6+a'+
		'FX8EBJwHupdoAsfIGYINggUJGcjHeNHIBAERERwKBNQC090CwOLgZ0Pg58hnFEtIBuREFOtK8fTx'+
		'1PXxSvr70QAA+wABIvMXsKCSYwQNGhSQUKHBfwqDAAA7';
	img_lv[9] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPXZRbWdANXRAKiTAP7+6mZ5AP//If/5rNC2AL2oAP/6CP3xgv381vTX'+
		'HLy4AN7aAL+sAO/qAP///yAgINXRAK+sAPvuWezXALGjAP/8Tf3xlsjEAOvmAKyaAP/n597aAMGu'+
		'ANa4AP/8Yf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACQALAAAAAAXABYAAAbAQBLJ'+
		'QCwaj0Wh0HBoOp9Qp2G5qFqvWOzUIOl6u5CwuPOVGCiGinpd4YA0CMQIxGFXzoaHfm8ZNBoIBRMI'+
		'Fnt6eBGJihkIDR4eGBMTGYqJiJURGRMNIY+blJWXlYybgRMMoIqiiwoXCBuCA6mWaJiJjx4Opx62'+
		'eAK/wL8eCgUFCRnBv77JvwQJAQ4EzALL0wTX09QUQ9nd2ttDSAbTRRTgQubp5snq5krv8MEAAPD1'+
		'9cDz9vpKv/n7+wL8/dtH718QADs=';
	img_lv[10] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAP/7OsjEALCtAP7+6mZ5AO3YAP37lv//If/6CKiTAP77a7WdAN7aAP/5'+
		'wPLVB/flWr+sAO/qALGjANXRAP/6EiAgIP////z2rsKtANXRAP/8Tf/zgby4AL+vAP381vnnROvm'+
		'AK+dAP/mAfvjGd7aAPXZRdC2AP7xV//n572fANfBAP/7Jf///wAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC0ALAAAAAAXABYAAAbhwFar'+
		'QCwaj0WhsIBoOp9QZ2GZqFqvWOy0IOlKGuCQOAQuh7wFS0HDFpRYFUG7tMFgAnJ2utDpDCgEFygD'+
		'fQMHF4gXC4QdexEREwYcghOQBgQfKyOIGY+OjxObKJUTDh8iqJMjnmqPkKKVBoIiESIoFwasBa6h'+
		'lBGbHArCGB+VEZ+1IL4eiCAPhyPGewzUtrOot4gEJCLUDNPUCicPHgrhDxAm5d7fauzC5t7w8d5p'+
		'Q+z4+fUWFktIBfqK8FPSgp9BfvgODiTIUAg7AAAaSiToDeLEiy2oWcQ4kcFGjhMjYgwCADs=';
	img_lv[11] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWAMQAAEBCAP/7JdXRALKcAP7+6mZ5AP//IdC2AKiTAO/qAP7xV7y4APLVB7qhAP/z'+
		'gf/6CCAgIPnnRL+sAP///97aANXRAO3YAK+sAP/6ErWdAMjEAOvmAK2YAP/mAd7aAP///yH5BAEA'+
		'AB8ALAAAAAAXABYAAAW54PcVZGmepSgWRuu+sFusT23fOD4XSd9TwI0vAaQIewVIQcAUaDwBjKb5'+
		'jE6ZycJie6kQJooL1wsWb7OS9MDiAA/UbHdagp4POnI1XvFO19McexxzgWCDfkpzEoUKh4uCc3+L'+
		'EYaElI2RiYQKlYCcmIgFGaMZHAcMDRykpqiqo1mkowizA7GzCLWvECOxvb6kSbsjKKK+JRDCIsjL'+
		'yL3MyCrR0rEAANLX16TV2Nwqo9vd3Rng4d3W4SEAOw==';
	img_lv[12] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPz4Lr+vAK+sAP/5wGZ5AP//Ie/qAP/zgenkAKeSAP///7WdAP/nF/7z'+
		'q97aAP7xV7y4AP7+6vLVB9XRAP/6CCAgIL+sAP7xa7KcAP3rQ//zldXRAPrnBf381sjEAOvmAOXH'+
		'AN7aAPnnRL2fAP/n5//8TdC2AKyaAO3YAP/mAf/8c//7Jf7yl//6EsKtAP///wAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAXABYAAAbfQBis'+
		'QCwaj0WhsGBoOp9QZ2FZqVqvWOy0cOgeHmCQGAQug7wFS4HC/ohYrk87sXI4THJ2uhCJDDgSCxAD'+
		'fhALh4cBhBF7FxcZKQiCGY8IGCkoDQsajheNjhkqk6AopRseL52fFygdgiiODCgCCBKYqmqdra+O'+
		'rQQEKQoKuAW6I7woGAsSCHYOxAzRKIYQKLIEy84tGdx70bInEwLWKBMhwujcGd7fpSjq6t/yaUPy'+
		'9vffaRZLSAX4RRb2KQlIMKC9ggGVKFwoDwCAhRAhfnMYsaKSaBQtWmSQUaPFhxqDAAA7';
	img_lv[13] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPzpLsjEAK+sAP7+6mZ5AO3YAP7xa///If/6CKeSAP/5rN7aALWdAP/6'+
		'EvflWr+sANXRAP/5wO/qACAgILGjAP32lv////LVB/3rQ/XZMdXRANC2AP381r2rALy4AP/zgfTX'+
		'HP7xV//8TenkAOvmAP/7Jf/mAdfBAP/WQqyaAP/8Yb2fAP/0l97aAP/nF////wAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAXABYAAAblQBis'+
		'QCwaj0WhsIBoOp9QZ2GZqFqvWOy0MOlOGOCSuAQul7wFSmHDFrhMDkGbNGotVnJ2uvD5DCIEFyID'+
		'fiIXh4cBhB97EBAVBiCCFY8tBwYqLxcZlBCNjhUnk6AVKBkdCyoqjp+PoiKdqguIEh6sao6ugqsV'+
		'ASceCgaHJ7cFuSoZuxCiFsDJBLaeag3UKoYiKtQSiBcdBtQNe+AqHBge2Q0KGg8PIQoK4OLjquAN'+
		'qvT1aUP1/P3xFBSWICngrwhAJTAAKgTIb+FBhBCF1AMAIKJFhOAoXtwIg5pGjhcbfAR5sSLHIAA7';
	img_lv[14] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPnnRL+vALCtAP381mZ5AP//Ie/qAP7xa9C2AKiTAP74q7WdAN7aAP/7'+
		'JfLVB////7y4ANXRAP/6CCAgIL+sAOrlAP/zgf7xV7GjAP/5wNXRAP7+6v/6EsjEAKyaAOvmAL2f'+
		'AN7aAP/8Tf/mAf/n58KtAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAXABYAAAbZwNOp'+
		'QCwaj0WhsGBoOp9QZ2E5qVqvWOy0cOgeGmCQ1xv2FigFidojcnQ86rVn5ICrz4VIZLDhQDADensW'+
		'BH+BengVFRkWF38ZiowcCI+KFYmRJJUZJhoaH5WKmIuaGB8VHwgcCQp/H6eXaJYZpacWEBwaELt/'+
		'orKKHwF/ChUCGgsIjgsYAr4FDNAfGK7Rrw/DCtB40AwKCQ8C2dwKAuDiDNvjCufq7GdD3PHy82cU'+
		'S0jP9EQU9kr8//zkAeSnpKDBeAAAGFy4kFtChhCVQHsYMSIDihUjKqwYBAA7';
	img_lv[15] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPXZMb+vAK+sAP/5wGZ5AP//If7xa+vmANC2AKeSAP/6Ev///7WdAPfl'+
		'Wv/5rL2fAP/6CPLVB7y4AP/7JSAgIL+sAN7aAO3YAP381tXRANXRAPnnRLKcAPfyAP/zgcjEAP7x'+
		'V//sLP7+6v/mAayaAP/8Yd7aAP/7OPz3AMKtAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACsALAAAAAAXABYAAAbowNWq'+
		'QCwaj0WhsGBoOp9QZ2EZqVqvWOy0gOgiLmDvF0z2FiqFjRp0oixA69RigTKl4JtzYTIZaEYMIQN9'+
		'GgyGDA8agxN6FhYdGB+BHY8iDCQlmSUNjo2OHSSTjwcMIh8PHyqUFp4WJaEhJa4PDAQhtA+yrGiO'+
		'rrCyJQIiCsSGuq0lHIHADxkJCsq5nWgN1SUhy9UEh7UCHd961Q0lCRICmw0KAQ4OEsTfHeHimvDf'+
		'xAod4g1nQ/r+/+LOVFiCpADAIhUGKknIMKG/hgmVSJyoDwCAiRgxirOYsaOSahw9emwQUqTHiyKD'+
		'AAA7';
	img_lv[16] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPzlQsjEAKypAP7+6mZ5AP//IdfBAP/zgf/6CKeSAP/5rLWdAO/qAP/m'+
		'A7+sAN7aAP////LVB/flWrKcACAgINXRAP/5wNC2AOXHALy4AP37lr+vANXRAPTXHP7xa/381uvm'+
		'APz3AP/7Ja6eAP7xV72fAP/mAf/n5//9jN7aAP/WQv/6Eu3YAP///wAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC4ALAAAAAAXABYAAAblQJer'+
		'QCwaj0WhsGBoOp9QZ2GZqFqvWOy00Og2IOCQ9xseFyoFi1qgGrEEaotAlFLB4+eCRkPqECIlA3sk'+
		'HAQbgnt7eQ8PFC0IgBSMJBsEBySYjA+LkyeRjQ4RCB8LCAeSm2iaJJ4lJA+UEREXIBELr6kFq62v'+
		'JLMnChyyuJywAYC9BAQYCscbxGgM0iQlyNLHsrMcJNJ50gwKGBIcCtIKGRMTHgoKFO7e3+zt7hTy'+
		'7d8MZ0P4/P3fZxWWICngr0iFgEoOKjzIb+FBJRAj4gMAIKJFi98oXtyoRJpGjhwZfATJsSLIIAA7';
	img_lv[17] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPvkLb2rAK+sAP/+wP//IWZ5ANC2AP/zge/qAKiTALy4AP////7xV/LV'+
		'B97aALWdAP/7JdXRAP7+6v/5rP/6CCAgIL+sAPrpbO3YAP/6ErGjAPrtRdXRAMjEAOvmAKyaAN7a'+
		'AMKtAP3xlv/8df/mAb2fAP/sLNa4AP/dvf/n5/z3AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAAAXABYAAAbeQBbL'+
		'QCwaj0Wh0FBoOp9Qp2FZqVqvWOzUkOgmHuCPOPwJew0Wg2TtCUU0HolnRfJ4NPC1BG1YLAYdEwwN'+
		'A38UDAQMihSFC3wXFxsZCIMbkYcNJSeVkI+QGyWcG4cgIBQTIpYXnpGhDZYbJxwKriCQq2m3oJyR'+
		'GxsjDB2quAa3IByDtpAgAojKnWkQ0iANydIQIAEMGCDXEHzXCgcOAgrh4+Xe4OEK5t7t7tdoQ971'+
		'9vIWFktIBvdF+UpY5BuYrx5BgAETCvEGAIDChwGvNYRIkYW0iRUhQsCYEaLDikEAADs=';
	img_lv[18] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPnnRMjEAK+sAP381mZ5AOznAP32lv//If/6CKiTAPTXHLWdAN7aAPv4'+
		'bf/////+wL+sAO/qAPLVByAgILGjANXRAP/zgf/5rPXZMfflWv7+6tC2AL+vALy4ANXRAP/mAevm'+
		'AP/7Ov/7Jf7xV//8Tf/6Er2fAP/n58GuAK+dAP/dvd7aAP///wAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC0ALAAAAAAXABYAAAbowFar'+
		'QCwaj0WhsIBoOp9QZ2GZqFqvWOy0IOlKGuCQOAQuN8YFSsHCFrBGJkFbdMAcSiy5JV3weAYfGw8k'+
		'A38XDw4kEA8bBoV8EREVBockFZIPDwYgEASWkZCRFSCDlxUOmQ8YKSqREaGSpJ+TG4KqHZevaq6j'+
		'pREdGxAdIAQPF7mwKgG+EYgKCqgHrboFDNYqJIMq24sQiwQGFdZ81gwKHBMdCtYKGRoaC+rl5OXP'+
		'6/X29+MUQ+X+/wDT8BuCpFpAIhQGCknIMOG/hgmVSJzoDwCAiRgxlrOYsaMSaxw9emQQUqTHiyKD'+
		'AAA7';
	img_lv[19] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPnnRLqhAK+sAP381v//IWZ5AOvmAP/zgdXRAKiTAPTXHP///7WdAP/6'+
		'CO3YAP/5rPfyAN7aALy4AP/6EtXRAL+sACAgIP/8Tf7+6rGjANC2APLVB8jEAP7xV//7Jf3xlqya'+
		'AMGuAP/n597aAPXZRf/8Yda4AP/mAb2fAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACoALAAAAAAXABYAAAbeQJXK'+
		'QCwaj0Wh0FBoOp9Qp2HpqFqvWOzUcOgeJGDvF0z2Gi6GirpD+lA6axIGAjGR4JWzYTIZJDIMHgN9'+
		'CQQEEIAQgxN6FhYaDwiBGo8QBCEhDwwMlBaNjhook48MBCKYpZ2fj6IelBoQpYgMCKpojqyjGiIe'+
		'ECCACbYGDcQhAYEhxZgLtMnEesQNIR7I0SECGRkbGtHQxAobHAIK0eAlC+TdaNENCu7s7e/sZ0Pw'+
		'9vdnF0tIw/ZFF/qUABwIEB5BgEoSKmQHAIDChw+jNYRIUQmxiRUrNsCYsaLDjEEAADs=';
	img_lv[20] = 'data:image/gif;base64,'+
		'R0lGODlhFwAWANUAAEBCAPXZRcjEAKypAP381mZ5AOXHAP37lv//If/6CKShAP/nF/77a////97a'+
		'ALWdAP/5wNXRAPXTBfz2ru/qACAgIP/zgb+sAPz4LrGjAP7+6vflWt7aALy4AL2rAP/8Tf/mAevm'+
		'AMGuANfBAP3rQ6yaAOnkAKeSAOzXAP/n5/vuWc/LAP7yl//8c/v2C72fAP/WQv/7OsaqAP///wAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADMALAAAAAAXABYAAAb0wNms'+
		'QCwaj0WhsIBoOp9QZ2GZqFqvWOy0QOlSHGBwaBwWjwuVQmQtMLUmk49gJeB84DHBGl3odDIqDYKC'+
		'GAMDB4MNDAMdfBcXGRYMKCULDSQlKBoEIyCCIheOjxklpSwEIiUQBKUlFg0goWmPFw8lHhYaKCco'+
		'DSolFyWBKLIFtBkgEBC7J54WrROsxaMMDRoWcBMeggESiLHFD7YQ1tkswoMaCxkZD3ziJRIGJ/T0'+
		'7BIbAR4n4u5p/aX6CWxVQiCaIQITKuyHpsISJAUWFqngUAnFixQTYqSopKNHgQAAeBw5sl9IkiiV'+
		'iDuZMuUDli1TimwZBAA7';

	Pika_prepareForDisplayBuildStatus();// Lv0표시

	var xybld_a = new Array();
	var allbld = $a("//li/span[@class=\"buildStatus\" and contains(text(),\"건설중\")]/a");
	for(var idx=0 ; idx<allbld.length ; idx++) {
		var tmp = allbld[idx].href.match(/x=([\-0-9]+).*y=([\-0-9]+)/);
		if( tmp != null ) {
			xybld_a.push(tmp);
		}
	}

	allbld = $a("//li[contains(text(), \"삭제중\")]/span[@class=\"buildStatus\"]/a");
	var xybld_d = new Array();
	for(var idx=0 ; idx<allbld.length ; idx++) {
		var tmp = allbld[idx].href.match(/x=([\-0-9]+).*y=([\-0-9]+)/);
		if( tmp != null ) {
			xybld_d.push(tmp);
		}
	}
	var allarea = $a("//area");
	for(var idx=0 ; idx < allarea.length ; idx++) {
		var title = allarea[idx].getAttribute("title").match(/^(.*) LV\.([0-9]+)$/);
		if( !title ) {
			title = [allarea[idx].getAttribute("title"), allarea[idx].getAttribute("title"), 0];
		}
		if( costs[title[1]] ) {
			if(costs[title[1]][title[2]]) {
				var xy = allarea[idx].getAttribute("href").match(/^.*x=([\-0-9]+).*y=([\-0-9]+)+$/);
				var level = parseInt(title[2]);
				var blding = 0;
				var dlting = 0;
				for ( var xxx=0 ; xxx < xybld_a.length ; xxx++){
					if( xy[1] == xybld_a[xxx][1] && xy[2] == xybld_a[xxx][2] ) {
						level ++ ;
						blding += 2;
					}
				}
				for ( var xxx=0 ; xxx < xybld_d.length ; xxx++){
					if( xy[1] == xybld_d[xxx][1] && xy[2] == xybld_d[xxx][2] ) {
						dlting ++;
					}
				}
				try {
					if( costs[title[1]].length <= level || // maxinum level reached 
						RES_NOW.wood < costs[title[1]][level][0] ||
						RES_NOW.stone< costs[title[1]][level][1] ||
						RES_NOW.iron < costs[title[1]][level][2] ||
						RES_NOW.rice < costs[title[1]][level][3] ) {
							//lv을 노란색으로
							var thisimg = getLevelImageHTML(xy[1], xy[2], "mapicon");
							if( thisimg  ) {
								thisimg.src = img_lv[parseInt(title[2])];
							}
					}
				}catch(e) {
					console.log("catched");
				}
				if( (blding || dlting) && !OPT_PIKA_BLINKBLD ) {
					// 건설중
					var thisimg = getLevelImageHTML(xy[1], xy[2], "mapicon");
					if( thisimg  ) {
						thisimg.style.outlineColor = (blding) ? "red" : "blue";
						thisimg.style.outlineStyle = "dotted";
						thisimg.style.outlineWidth = "2px";
					}
				}
			}
		}
	}
	if( OPT_PIKA_BLINKBLD) Pika_displayBuildStatus();
	
	function getLevelImageHTML(x, y, cls) {
		var xdom = "";
		var no = (101 + parseInt(x) * 7 + parseInt(y)).toString().substr(-2);
		xdom = "//img[@class=\"" + cls + no + "\"]";

//		var maps = document.getElementById("maps");
		
		return $x(xdom, $("maps") );
	}
}


//////////////////////
// 메모 처리
// 완료
//////////////////////
function disp_memo()
{
	var icon_memo = 'data:image/gif;base64,'+
					'R0lGODlhEQAPAKIAAP///+np6dXV1VpaWlhYWEVFRURERDMzMyH5BAQUAP8ALAAAAAARAA8AAAM7'+
					'eLrcXGTIOYo7RITNAyEWMwRAaQIj0YynOaAr2aKwKLfvEM+0bvO53Sz4G9YWEMrEcCziLknlwHCp'+
					'NhIAOw==';
					
	var cnt = parseInt(OPT_MEMO_COUNT, 10);
	if( isNaN(cnt) || cnt < 1 ) cnt = 1;
	if( cnt > 5 ) cnt = 5;
	for(var i=0 ; i<cnt ; i++){
		createMemoTab(i);
	}

	function createMemoTab(no)
	{
		if( !no ) no = "";
		
		var title = "메모";
		if( no ) title += (no +1 );
		var elms = ccreateSideBox("beyond_sidebox_memo" + no, icon_memo, title);

		var ta = d.createElement("textarea");
		ta.id = "beyond_memobox" + no;
		ta.rows = OPT_MEMO_HEIGHT;
		ta.cols = OPT_MEMO_WIDTH;
		ta.style.fontSize= OPT_MEMO_FONT_SIZE + "px";
		ta.value= cloadData( "memo" + no, "", true );

		elms.sideBoxInner.appendChild(ta);
		
		
		var sv = d.createElement("a");
		sv.href = "javascript:void(0);";
		sv.innerHTML = "저장";
		$e(sv, "click", function() {
			var memoBox = $("beyond_memobox" + no);
			if( memoBox ) {
				csaveData( "memo" + no, memoBox.value, true );
				alert("저장했습니다.");
			}
		});
		var dv = d.createElement("div");
		dv.appendChild(sv);
		elms.sideBoxInner.appendChild(dv);
	}
}
//////////////////////
// 거점 링크 기능
// 완료
//////////////////////
function disp_baseLink()
{
	var elm = $x("//div[@class=\"sideBoxInner basename\"]");
	if( !elm ) return;
	
	var bases = $a("descendant::a[@href]", elm);
	
	for( var idx=0 ; idx < bases.length ; idx++) {
		addBaseLink(bases[idx]);
	}
	
	var onlis = $a("//li[@class=\"on\"]", elm);
	for(var x=0 ; x < onlis.length ; x++) {
		var sp = $a("descendant::span", onlis[x]);
		for(var y=0 ; y < sp.length ; y++) {
			addBaseLink(sp[y]);
		}
	}
	
	function addBaseLink(elem) {

		var thistitle = elem.title;
		if( !thistitle ) return;
		
		var xy = thistitle.match(/^.*\(([\-0-9]+)\,([\-0-9]+)+\)$/);
		
		if( !xy ) return;
		
		var a_m, a_v, a_n;

		var a_m_img = d.createElement("img");
		a_m_img.style.paddingLeft = "3px";
		a_m_img.src = img_map;
		var a_v_img = d.createElement("img");
		a_v_img.style.paddingLeft = "3px";
		a_v_img.src = img_mura;
		var a_n_img = d.createElement("img");
		a_n_img.style.paddingLeft = "3px";
		a_n_img.src = img_naisei;

		
		a_m = d.createElement("a");
		a_m.href = "/map.php?x=" + xy[1] + "&y=" + xy[2];
		a_m.title = "맵(" + xy[1] + "," + xy[2] + ")" ;
		a_m.appendChild(a_m_img);
		

		a_v = d.createElement("a");
		a_v.title = "표시";
		a_v.appendChild(a_v_img);
		a_n = d.createElement("a");
		a_n.title = "내정";
		a_n.appendChild(a_n_img);
		if( elem.href ) {
			var id = elem.href.match(/^.*\?village_id=([0-9]+).*$/);
			if( id ) {
				a_v.href = "/village_change.php?village_id=" + id[1] + "&from=menu&page=/village.php#ptop";
				a_n.href = "/village_change.php?village_id=" + id[1] + "&from=menu&page=/card/domestic_setting.php#ptop";
			}
		} else {
			a_v.href = "/village.php#ptop";
			a_n.href = "/card/domestic_setting.php#ptop";

		}
		
		var spn = d.createElement("span");
		spn.appendChild(a_v);
		spn.appendChild(a_m);
		spn.appendChild(a_n);
		elem.parentNode.insertBefore(spn, elem.nextSibling);
		
	}
}

//////////////////////
// 영지 링크 기능
// 완료
//////////////////////
function disp_mapLink()
{
	
	// 잠정적으로 split("\n")에서 3이면 영지링크, 4면 군주링크
	if( location.pathname == "/land.php" ) {
		
		var div = $("tMenu");
		if( div ) {
			var lnk = d.createElement("a");
			lnk.href = "javascript:void(0);";
			lnk.innerHTML = "영지링크 추가";
			div.appendChild(lnk);
			$e(lnk, "click", function() {saveMapLink()});

		}
	}else if( location.pathname == "/user/index.php" || location.pathname == "/user/" ) {

		var table = $x("//table[@class=\"commonTables\"]");
		if( table ) {
			var lnk = d.createElement("a");
			lnk.href = "javascript:void(0);";
			lnk.innerHTML = "군주링크 추가";
			$e(lnk, "click", function() {saveMapLink()});
			table.parentNode.insertBefore(lnk, table.nextSibling);
		}
	}


	var icon_map = 'data:image/gif;base64,'+
				'R0lGODlhEQAPALMAANO3SayTQ3drPFxQsFNTUUA3uTMzMxoamBgYnxsNxg0G8ggC9AAA/wAAAAAA'+
				'AAAAACH5BAQUAP8ALAAAAAARAA8AAARL0MhJq50InVsT+wknIctnIhZZmmZYIWy8CAFATLGpADwQ'+
				'TCuGYljo9W4Gz2dnNP4MMNOgaQRKqT3BJJFACLC9C1bLqfWeIpqATIkAADs=';

	var elms = ccreateSideBox("beyond_sidebox_xylink", icon_map, "영지/군주링크");
	elms.sideBoxInner.id = "beyond_sidebox_xylink_inner";

	resetMapLinks();


}

function saveMapLink( )
{
	if( location.pathname == "/land.php" ) {
		var allDivs, thisDiv;
		var v_name = "";
		
		var basename = $x("//span[@class=\"basename\"]");

		var xy = location.search.match(/^\?x=([\-0-9]+)\&y=([\-0-9]+)+$/);
		
		if( basename ) {
			v_name = basename.innerHTML;
			if( v_name =="빈땅" ) {
				v_name += xy[1] + "," + xy[2];
			}
		}
		
		v_name = prompt("이름을 입력해주세요.", v_name);
		if( !v_name ) return;
		
		var maplinks = cloadData( "links", 0, true );
		var value = v_name + "\n" + xy[1] + "\n" + xy[2];
		csaveData( "link" + maplinks  , value, true );
		maplinks++;
		csaveData( "links"  , maplinks, true );
		
		resetMapLinks();

	}else if( location.pathname == "/user/index.php" || location.pathname == "/user/" ) {
		var user_id = URL_PARAM.user_id;
		var tmp = d.body.innerHTML.match(/\<td\>군주\<\/td\>[\s\S]+?<td\>(.+)\<\/td\>/);
		if( !tmp ) return;
		var user_name = tmp[1];

		var comment = "";
		
		disp_name = prompt("이름을 입력해주세요.", user_name);
		if( !disp_name ) return;

		comment = prompt("설명을 입력해주세요.", comment);

		var maplinks = cloadData( "links", 0, true );
		var value = user_id + "\n" + user_name + "\n" + disp_name + "\n" + comment;
		csaveData( "link" + maplinks  , value, true );
		maplinks++;
		csaveData( "links"  , maplinks, true );
		
		resetMapLinks();

	}
}

function configMapLinkClose()
{
	var elem = $("beyond_mapLinkWindow");
	if( !elem ) return;
	$("beyond_floatpanel").removeChild(elem);
}

function configMapLink(n, evt)
{
	var tmp = cloadData( "link" + n , "", true );
	if( !tmp ) return ;

	configMapLinkClose();

	data = tmp.split("\n");

	var lw = d.createElement("div");
	lw.id = "beyond_mapLinkWindow";
	lw.style.position = "absolute";
	if( data.length == 3 ) {
		lw.style.backgroundColor = "thistle";
		lw.style.border = "outset 2px thistle";
	}else if( data.length == 4 ) {
		lw.style.backgroundColor = "lightgreen";
		lw.style.border = "outset 2px lightgreen";
	}
	lw.style.fontSize = "10px";
	lw.style.padding = "10px";
	lw.style.zIndex = 9999;
	lw.style.left = evt.pageX - 176 + "px";
	lw.style.top = evt.pageY - 111 + "px";

	if( data.length == 3 ) {
		ccreateTextBox(lw, "LINK_TITLE", data[0], "명칭","명칭",20, 0);
		ccreateTextBox(lw, "LINK_X", data[1], "X좌표","X좌표",10, 0);
		ccreateTextBox(lw, "LINK_Y", data[2], "Y좌표","Y좌표",10, 0);
	}else if( data.length == 4 ) {
		var dv = d.createElement("div");
		dv.innerHTML = "id=" + data[0] + "　　" + data[1] + "<br>";
		lw.appendChild(dv);
		ccreateTextBox(lw, "LINK_TITLE", data[2], "표시명","표시명",20, 0);
		ccreateTextBox(lw, "LINK_COMMENT", data[3], "설명","설명",20, 0);
	}
	// 설정 버튼
	ccreateButton(lw, "저장", "내용을 저장합니다.", function() {
		var v = "";
		if( data.length == 3 ) {
			v = cgetTextBoxValue("LINK_TITLE") + "\n"
				+ cgetTextBoxValue("LINK_X") + "\n"
				+ cgetTextBoxValue("LINK_Y");
		}else if( data.length == 4 ) {
			v = data[0] + "\n" + data[1] + "\n" 
				+ cgetTextBoxValue("LINK_TITLE") + "\n"
				+ cgetTextBoxValue("LINK_COMMENT");
		}
		csaveData( "link" + n  , v, true );
		configMapLinkClose();
		resetMapLinks();
	});

	// 삭제
	ccreateButton(lw, "삭제", "삭제", function() {
		if(!confirm("삭제해도 됩니까?") ) return false;
	
		var maplinks = cloadData( "links", 0, true );
		for(var i = n+1 ; i < maplinks ; i++) {
			var tmp = cloadData( "link" + i, "", true );
			csaveData( "link" + (i-1), tmp, true );
		}
		csaveData( 'links'  , maplinks-1, true );
		configMapLinkClose();
		resetMapLinks();
	});

	// 위로 이동
	if( n != 0 ) {
		ccreateButton(lw, "▲", "위로 이동", function() {
			var tmp = cloadData( "link" + (n-1), "", true );
			csaveData( "link" + (n-1), cloadData( "link" + n, "", true ), true );
			csaveData( "link" + n, tmp, true );
			configMapLinkClose();
			resetMapLinks();
		});
	}
	// 아래로 이동
	var maplinks = cloadData( "links", 0, true );
	if( n + 1 < maplinks ) {
		ccreateButton(lw, "▼", "아래로 이동", function() {
			var tmp = cloadData( "link" + (n+1), "", true );
			csaveData( "link" + (n+1), cloadData( "link" + n, "", true ), true );
			csaveData( "link" + n, tmp, true );
			configMapLinkClose();
			resetMapLinks();
		});
	}

	// 닫기
	ccreateButton(lw, "닫기", "닫기", function() {configMapLinkClose();});

	$("beyond_floatpanel").appendChild(lw);
}

function resetMapLinks()
{
	var ul = $("beyond_sidebox_xylink_ul");
	if( ul ) {
		ul.parentNode.removeChild(ul);
	}
	ul = d.createElement("ul");
	ul.id = "beyond_sidebox_xylink_ul";

	var maplinks = cloadData( "links", 0, true );
	for(var i=0 ; i<maplinks ; i++) {
		var tmp = cloadData( "link" + i , "", true );
		if( tmp != "" ) {
			var li = d.createElement("li");

			var data = tmp.split("\n");
			
			if( data.length == 3 ) {
				// 영지 링크
				var link1 = d.createElement("a");
				link1.href = "/land.php?x=" + data[1] + "&y=" + data[2] + "#ptop";
				link1.title = "표시(" + data[1] + "," + data[2] + ")";
				link1.innerHTML = data[0];
				link1.style.fontSize = OPT_MAPLINK_FONT_SIZE + "px";
				
				var link2 = d.createElement("a");
				link2.href="/map.php?x=" + data[1] + "&y=" + data[2] + "#ptop";
				link2.title="맵(" + data[1] + "," + data[2] + ")";

				var a_m_img = d.createElement("img");
				a_m_img.src = img_map;
				link2.appendChild(a_m_img);
				
				var m = "";
				var dist = cgetDistanceFromBase(data[1], data[2]);
				if( dist != -1 ) {
					m ="　거리[" + dist.toFixed(2) + "]";
				}
				var link3 = d.createElement("a");
				link3.href="/facility/castle_send_troop.php?x=" + data[1] + "&y=" + data[2] + "#ptop" ;
				link3.title="파병(" + data[1] + "," + data[2] + ")" + m;

				var a_s_img = d.createElement("img");
				a_s_img.src = img_ken;
				link3.appendChild(a_s_img);

				var link4 = d.createElement("a");
				link4.href="javascript:void(0)";
				link4.title="설정";

				var a_d_img = d.createElement("img");
				a_d_img.src = img_hanma;
				link4.appendChild(a_d_img);
				(function(n){
					$e(link4, "click", function(event){configMapLink(n,event)});
				})(i);
				
				li.appendChild(link1);
				li.appendChild(link2);
				li.appendChild(link3);
				li.appendChild(link4);
				ul.appendChild(li);
			}else if( data.length == 4 ) {
				// 군주 링크
				var img = d.createElement("img");
				img.src = img_user;
				li.appendChild(img);
				
				var link1 = d.createElement("a");
				link1.href = "/user/index.php?user_id=" + data[0] + "#ptop";
				link1.title = data[3];
				link1.innerHTML = data[2];
				link1.style.fontSize = OPT_MAPLINK_FONT_SIZE + "px";
				
				var link2 = d.createElement("a");
				link2.href="/message/new.php?user_id=" + data[0] + "#ptop";
				link2.title="[" + data[1] + "]편지 보내기";

				var a_m_img = d.createElement("img");
				a_m_img.src = img_mail;
				link2.appendChild(a_m_img);

				var link3 = d.createElement("a");
				link3.href="javascript:void(0)";
				link3.title="설정";

				var a_d_img = d.createElement("img");
				a_d_img.src = img_hanma;
				link3.appendChild(a_d_img);
				(function(n){
					$e(link3, "click", function(event){configMapLink(n,event)});
				})(i);
				
				li.appendChild(link1);
				li.appendChild(link2);
				li.appendChild(link3);
				ul.appendChild(li);
			}
		}
	}

	$("beyond_sidebox_xylink_inner").appendChild(ul);

}
	
//////////////////////
// 영지 링크 읽기 및 저장 기능
// 완료
//////////////////////
function mapLinkList(evt)
{
	if( $("beyond_SaveMapLinkWindow") ) return;

	var mc = d.createElement("div");
	mc.id = "beyond_SaveMapLinkWindow";
	mc.style.position = "absolute";
	mc.style.backgroundColor = "blueviolet";
	mc.style.border = "outset 2px blueviolet";
	mc.style.fontSize = "12px";
	mc.style.padding = "15px";
	mc.style.zIndex = 9999+1;
	mc.style.left = evt.pageX - 250 + "px";
	mc.style.top = evt.pageY - 220 + "px";
	var ta = d.createElement("textarea");
	ta.id = "beyond_SaveMapLinkWindow_text";
	ta.rows = 10;
	ta.cols = 40;
	var txt = "";
	var maplinks = cloadData( "links", 0, true );
	for(var i=0 ; i<maplinks ; i++) {
		var tmp = cloadData( "link" + i , "", true );
		if( tmp ) {
			txt += tmp.replace(/\n/g, "\t" ) + "\n";
		}
	}
	ta.value = txt;
	
	mc.appendChild(ta);
	$e(ta, "keydown", function(event) {
		// TAB입력
	    var kC = event.keyCode ? event.keyCode : event.charCode ? event.charCode : event.which;
	    if (kC == 9 && !event.shiftKey && !event.ctrlKey && !event.altKey)
	    {
	        var oS = this.scrollTop;
            var sS = this.selectionStart;
            var sE = this.selectionEnd;
            this.value = this.value.substring(0, sS) + "\t" + this.value.substr(sE);
            this.setSelectionRange(sS + 1, sS + 1);
            this.focus();
	        this.scrollTop = oS;
	        if (event.preventDefault)
	        {
	            event.preventDefault();
	        }
	        return false;
	    }
	    return true;
	} );
	
	var sv = d.createElement("a");
	sv.href = "javascript:void(0);";
	sv.innerHTML = "저장";
	$e(sv, "click", function() {
		if( confirm("덮어써도 됩니까?") == false) return;
		var  ta = $("beyond_SaveMapLinkWindow_text");
		if( ta ) {
			var lines = ta.value.split("\n");
			var saveLines = new Array();
			for( var i=0 ; i<lines.length ; i++) {
				if( lines[i] == "" ) continue;
				var dat = lines[i].split("\t");
				if( dat.length != 3 && dat.length != 4 ) {
					alert("파싱 에러입니다. 처리를 중단합니다.\n( " + lines[i] + " )" );
					return;
				}
				// 체크
				if( dat.length == 3 ) {
					if( !dat[1].match(/[\-0-9]+/g)  || !dat[2].match(/[\-0-9]+/g) ) {
						alert("파싱 에러입니다. 처리를 중단합니다.\n( " + lines[i] + " )" );
						return;
					}
				}else if ( dat.length == 4 ) {
					if( dat[3] == "" && dat[1].match(/[\-0-9]+/g) && dat[2].match(/[\-0-9]+/g) ) {
						dat.pop();
					}else  if( !dat[0].match(/[\-0-9]+/g) ) {
						alert("파싱 에러입니다. 처리를 중단합니다.\n( " + lines[i] + " )" );
						return;
					}
				}else{
					alert("파싱 에러입니다. 처리를 중단합니다.\n( " + lines[i] + " )" );
					return;
				}
				var linedata = "";
				for( var j=0 ; j<dat.length ; j++ ){
					dat[j] = dat[j].replace(/(^\s+)|(\s+$)/g, "");
					if( linedata != "" ) {
						linedata += "\n";
					}
					linedata += dat[j];
				}
				saveLines.push(linedata);
			}

			// 삭제
			var maplinks = cloadData( "links", 0, true );
			for(i=0 ; i<maplinks ; i++) {
				cdelData( "link" + i, true );
			}
			// 추가
			for(var i=0 ; i<saveLines.length ; i++ ) {
				csaveData( "link" + i  , saveLines[i], true );
			}
			csaveData( "links"  , saveLines.length, true );
			
			
			alert("덮어 썼습니다.");
			resetMapLinks();
		}
	});

	var cl = d.createElement("a");
	cl.href = "javascript:void(0);";
	cl.innerHTML = "닫기";
	$e(cl, "click", function() {
		var mc = $("beyond_SaveMapLinkWindow");
		if( mc ) {
			mc.parentNode.removeChild(mc);
		}
	});
	var dv = d.createElement("div");
	dv.appendChild(sv);
	dv.appendChild(d.createTextNode(" ") );
	dv.appendChild(cl);
	
	
	mc.appendChild(dv);
	$("beyond_floatpanel").appendChild(mc);
	
}

//////////////////////
// 좌표 링크 처리
// 완료
//////////////////////
function disp_XYLink()
{
	var flg_profile_xy = false;
	var flg_include_a = false;
	
	// 1줄 코멘트
	var comment = $a("//*[@id=\"commentList\"]//tr/td[2]");
	
	for(var i=0 ; i< comment.length ; i++) {
		setXYLink( comment[i] );
	}
	
	// 각 엘리먼트
	var targetPath = new Array();

	if( location.pathname == "/alliance/chat_view.php" ) {
		targetPath.push( "//div[@class=\"hitokotoList\"]/p[2]" );
	}
	if( location.pathname == "/alliance/info.php" ) {
		targetPath.push( "//tr[th[contains(text(),\"코멘트\")]]/td" );
	}
	if( location.pathname == "/message/detail.php" ) {
		targetPath.push( "//tr[th[contains(text(),\"건명\")]]/td" );
		targetPath.push( "//tr[th[contains(text(),\"본문\")]]/td" );
	}
	if( location.pathname == "/bbs/res_view.php" ||
		location.pathname == "/bbs/personal_res_view.php" ) {
		targetPath.push( "//th[@class=\"mainTtl\"]/div[@class=\"threadTtl\"]" );
		targetPath.push( "//td[@class=\"contents\"]" );
		targetPath.push( "//table[@class=\"commonTables\"]//tr[2]/td[1]" );
	}
	if( location.pathname == "/user/index.php" || location.pathname == "/user/" ) {
		if( URL_PARAM.user_id && USER_ID != URL_PARAM.user_id ) {
			targetPath.push( "//table[@class=\"commonTables\"]//tr[position()>12]/td[2]" );
			flg_profile_xy = true;
		}
	}
	
	for(var i=0 ; i< targetPath.length ; i++) {
		var elms = $a(targetPath[i]);
		for(var j=0 ; j<elms.length ; j++) {
			setXYLink(elms[j]);
		}
	}
	
	function setXYLink(elm) {
		var tmpHTML = elm.innerHTML;

		var reg = /[\(|（|【]([\-0-9０-９]+)( *[,&、?，] *)([\-0-9０-９]+)[\)|）|】]/g;
		if(OPT_XYLINK_NK || flg_profile_xy ) {
			reg = /([\-0-9０-９]+)( *[\,&、?，] *)([\-0-9０-９]+)/g;
		}

		var elm_child_a = null;
		if( flg_include_a ) {
			elm_child_a = $x("descendant::a", elm);
		}

		tmpHTML = tmpHTML.replace(reg, XYLinkReg );
		
		elm.innerHTML = tmpHTML;
		
		function XYLinkReg() {

			var img_send = IMG_DIR + "report/icon_go.gif";
			var img_mp = IMG_DIR + "report/icon_scout.gif";
			var m = "";
			var dist = cgetDistanceFromBase(arguments[2], arguments[4]);
			if( dist != -1 ) {
				m = "　거리[" + dist.toFixed(2) + "]";
			}
			var x = toHankaku(arguments[1]);
			var y = toHankaku(arguments[3]);
			var disp = x + arguments[2] + y;
			if( !OPT_XYLINK_NK && !flg_profile_xy) disp = "(" + disp + ")";
			var txt = "<a href='/land.php?x=" + x + "&y=" + y + "#ptop' title='표시' style=\"display:inline;\">" + disp + "</a>";
			txt += "<a href='/map.php?x=" + x + "&y=" + y + "#ptop' title='맵" + x + "," + y + "' style=\"display:inline;\"><img src='" + img_mp + "' style='width:14px; height:14px; vertical-align:middle;'></a>";
			txt += "<a href='/facility/castle_send_troop.php?x=" + x + "&y=" + y + "#ptop' title='파병" + x + "," + y + m + "' style=\"display:inline;\"><img src='" + img_send + "' style='width:14px; height:14px; vertical-align:middle;'></a>";

			// a태그가 붙은 것들 연결 수정
			if( elm_child_a ) {
				txt = "</a> " + txt + " <a href=\"" + elm_child_a.href +  "\" >";
				console.log(txt);
			}
			
			return txt;

			function toHankaku(str) {
				return str.replace(/[０-９]/g, function(str){return String.fromCharCode(str.charCodeAt(0)-65248);});
			}
		}
	}

}

//////////////////////
// 병력 표시 정렬
// 수정 없음
//////////////////////
function disp_TTable()
{
	if( location.pathname == "/message/inbox.php" ||
		location.pathname == "/message/outbox.php"  ||
		location.pathname == "/message/new.php" ||
		location.pathname == "/bbs/topic_view.php"  ||
		location.pathname == "/facility/unit_status.php" ||
		location.pathname == "/facility/castle_send_troop.php") {
		return ;
	}

	//■가처리
	var ta = $a("//textarea");
	for(var i=0 ; i<ta.length ; i++) {
		if( ta[i].innerHTML != "" ) return;
	}
	
	var targetPath = [
		"//div[@id='commentList']",
//		"//td[@class='contents']",
		"//table[@class='commonTables']",
		"//p[@class='hitokoto']",
//		"//span[@class='xy']"
	];
	
	for(var i=0 ; i<targetPath.length ; i++) {
		var elms = $a(targetPath[i]);
		for(var j=0 ; j<elms.length ; j++) {
			setTTable(elms[j]);
		}
	}

	function setTTable(elm) {
			
		var tmpHTML = elm.innerHTML;
	//	tmpHTML = tmpHTML.replace(/[\n\r]/g,"");
		var reg = /검병\s+창병\s+궁병\s+기병\s+모창병\s+노병\s+근위기병\s+척후\s+척후기병\s+충차\s+투석기\s+무장.*(\n병사\s+|\n)(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+).*(\n死傷\s+|\n)(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g;
		tmpHTML = tmpHTML.replace(reg,
			function() {
				var txt = "<table class='tables'><tr><th class='solClass'>　</th>" +
							"<th class='solClass'>검병</th><th class='solClass'>창병</th><th class='solClass'>궁병</th><th class='solClass'>기병</th>" +
							"<th class='solClass'>모창병</th><th class='solClass'>노병</th><th class='solClass'>근위기병</th><th class='solClass'>척후</th>" +
							"<th class='solClass'>척후기병</th><th class='solClass'>충차</th><th class='solClass'>투석기</th><th class='solClass'>무장</th>" +
							"</tr><tr><th class='solClass'>병사</th>";
				for(var i = 2 ; i<= 13 ; i++) {
					txt += "<td>" + arguments[i] + "</td>";
				}
				
				txt += "</tr><tr><th class='solClass'>사상</th>";
				for(var i = 15 ; i<= 26 ; i++) {
					txt += "<td>" + arguments[i] + "</td>";
				}
				txt += "</tr></table>";
				return txt;
			} );
		
		reg = /검병\s+창병\s+궁병\s+기병\s+모창병\s+노병\s+근위기병\s+척후\s+척후기병\s+충차\s+투석기\s+무장.*(\n병사\s+|\n)(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g;
		tmpHTML = tmpHTML.replace(reg ,
			function() {
				var txt = "<table class='tables'><tr><th class='solClass'>　</th>" +
							"<th class='solClass'>검병</th><th class='solClass'>창병</th><th class='solClass'>궁병</th><th class='solClass'>기병</th>" +
							"<th class='solClass'>모창병</th><th class='solClass'>노병</th><th class='solClass'>근위기병</th><th class='solClass'>척후</th>" +
							"<th class='solClass'>척후기병</th><th class='solClass'>충차</th><th class='solClass'>투석기</th><th class='solClass'>무장</th>" +
							"</tr><tr><th class='solClass'>병사</th>";
				for(var i = 2 ; i<= 13 ; i++) {
					txt += "<td>" + arguments[i] + "</td>";
				}
				txt += "</tr></table>";
				
				return txt;
			} );
		
		
		elm.innerHTML = tmpHTML;
	}
}

//////////////////////
// 병력 합계
//////////////////////
function disp_Details()
{
	if( location.pathname != "/alliance/detail.php" &&
		location.pathname != "/report/detail.php") return ;
	
	var troops = [[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0]] ;
	var tbls = $a("//table[@class=\"tables\"][@summary=\"방어자\"]");
	
	if(tbls.length <2 ) return;
	
	for(var i=0 ; i<tbls.length ; i++) {
		var trs = $a("descendant::tr", tbls[i]);
		if( trs.length >=4 ) {
			for(var j=0; j < 2 ; j++) {
				var tds = $a("descendant::td", trs[j+2]);
				if(tds.length != 12) continue;
				for(var k=0 ; k<tds.length ; k++) {
					troops[j][k] += parseInt(tds[k].innerHTML);
				}
			}
		}
	}

	var tbl = d.createElement("table");
	tbl.className = "tables";

	var tr = d.createElement("tr");
	var th = d.createElement("th");
	th.className = "attacker";
	th.appendChild(d.createTextNode("방어합계"));
	tr.appendChild(th);
	th = d.createElement("th");
	th.className = "attackerBase";
	th.setAttribute("colspan","12");
	tr.appendChild(th);
	tbl.appendChild(tr);
	
	var tr = d.createElement("tr");
	var thtxt = ["검병","창병","궁병","기병","모창병","노병","근위기병","척후","척후기병","충차","투석기","무장" ];
	var th = d.createElement("th");
	th.className = "blank";
	tr.appendChild(th);
	for(var i=0; i<12 ; i++){
		th = d.createElement("th");
		th.className = "solClass";
		th.appendChild(d.createTextNode(thtxt[i]));
		tr.appendChild(th);
	}
	tbl.appendChild(tr);
	
	var hd =["병사","사상"];
	for(var i=0 ; i<2 ; i++) {
		var tr = d.createElement("tr");
		var th = d.createElement("th");
		th.className = "blank";
		th.appendChild(d.createTextNode(hd[i]));
		tr.appendChild(th);
		for(var j=0; j<12 ; j++){
			var td = d.createElement("td");
			td.appendChild(d.createTextNode(troops[i][j]));
			tr.appendChild(td);
		}
		tbl.appendChild(tr);
	}
	
	if( OPT_DETAILS_UP == 0 ) {
		tbls[tbls.length-1].parentNode.insertBefore(tbl, tbls[tbls.length-1].nextSibling);
	} else {
		tbls[0].parentNode.insertBefore(tbl, tbls[0]);
	}
}

//////////////////////
// 덱
//////////////////////
function disp_Deck()
{
	if( location.pathname != "/card/deck.php" ) return ;
	
	
	if( OPT_DECK_SET ) dispDeckSet();

	function dispDeckSet() {
		var nam = cgetCurrentBaseName();
		
		var sels = $a("//select",d);
		for(var i=0 ; i<sels.length ; i++) {
			if( !sels[i].id.match(/selected_village_/) ) continue;
			var opts = $a("descendant::option",sels[i]);
			for(var j=0 ; j<opts.length ; j++) {
				if(opts[j].innerHTML == nam ) {
					opts[j].selected = true;
				}
			}
		}
	}
}


//////////////////////
// 완료 시간 표시(건물)
// 수정 완료
//////////////////////
function disp_CompleteTimeBuild()
{
	var lastTime = "";
	
	if( location.pathname == "/village.php" ) {
		// 최종 건설시간 저장

		var addDate = 0;
		var lt = "";
		var now = cgetNow();

		var li = $a("//li");
		for(var i=0 ; i<li.length ; i++) {
			var bs = $x("descendant::span[@class=\"buildStatus\"]", li[i]);
			if( !bs ) continue;
			if( bs.innerHTML.match(/건설중|건설준비 중/) ) {
				var bt = $x("descendant::span[@class=\"buildTime\"]", li[i]);
				if( !bt ) continue;
				var bc = $x("descendant::span[@class=\"buildClock\"]", li[i]);
				if( !bc ) continue;
				var bctim = bc.innerHTML.match(/^([0-9]{2,3}):([0-9]{2}):([0-9]{2})$/);
				if( !bctim ) continue;
				lt = caddDate(now, bc.innerHTML);
			}
		}
		csaveData( "lastBuildTime", lt, true);
		return;
	}
	
	
	var reg = /\/facility\/facility.php|\/facility\/select_facility.php|\/facility\/castle.php/;
	if( location.pathname.match(reg) ) {
		if( d.referrer.match(reg) ) return;

		lastTime = cloadData( "lastBuildTime", lt, true);

		var tds = $a("//td");
		for(var i=0 ; i<tds.length ; i++){
			if( tds[i].innerHTML.match(/^([0-9]{2,3}):([0-9]{2}):([0-9]{2})$/) ) {
				
				var ths = $a("descendant::th", tds[i].parentNode.parentNode);
				var dd = false;
				for(var x =0; x<ths.length; x++ ) {
					if(ths[x].innerHTML.match(/시설건설에 드는 비용|건설에 필요한 식량소비량/) ) {
						dd = true;
						break;
					}
				}
				if( dd ) {
					var spn = d.createElement("span");
					spn.setAttribute("beyond","beyond_complete_build_time");
					tds[i].appendChild(spn);
				}
			}
		}
	}
	else {
		return;
	}
	
	timerfunc();

	function timerfunc() {
		var stime = cgetNow();
		if( lastTime ) {
			lt = lastTime.match(/^(\d+)\-(\d+)\-(\d+) (\d+):(\d+):(\d+)$/);
			if( lt ) {
				var t = new Date(parseInt(lt[1], 10), parseInt(lt[2], 10) - 1, parseInt(lt[3], 10),
								 parseInt(lt[4], 10), parseInt(lt[5], 10), parseInt(lt[6], 10) );
				if( stime < t) {
					t.setMinutes(t.getMinutes() + 1 );
					stime = t;
				}
				
			}
		}

		var spns = $a("//span");
		for(var i = 0 ; i<spns.length ; i++){
			if( spns[i].getAttribute("beyond" ) != "beyond_complete_build_time" ) continue;

			var ctime = caddDate(stime, spns[i].parentNode.innerHTML);
			
			if( ctime ) {
				spns[i].innerHTML = "　(" + ctime + " 완료)";
			}
		}
		window.setTimeout( timerfunc, 1000);
	}
}

//////////////////////
// 완료 시간 표시(유닛)
// 수정 완료
//////////////////////
function disp_CompleteTimeUnit()
{
	
	var lastTime = "";
	

	if( location.pathname == "/facility/facility.php" ) {

		// 유닛 생성 최종 시간 저장
		var trs = $a("//tr");
		var lt = "";
		for(var i=0; i<trs.length ; i++){
			var th = $x("descendant::th",trs[i]);
			if( !th ) continue;
			if( th.innerHTML.match(/소요시간/) ) {
				var td = $x("descendant::td",trs[i]);
				if( !td ) continue;
				if( td.innerHTML.match(/^\d+\-\d+\-\d+ \d+:\d+:\d+$/) ) {
					lt = td.innerHTML;
				}
			}
		}
		csaveData( "lastUnitTime", lt, true);
		
		return;
	}

	if( location.pathname == "/facility/unit_confirm.php" ) {
		lastTime = cloadData( "lastUnitTime", lt, true );
		try {
			var tbl = $x("//table[@class=\"commonTables\"][@summary=\"object\"]");
			var trs = $a("descendant::tr", tbl);
			var td = $x("descendant::td", trs[2] );
			
			var spn = d.createElement("span");
			spn.setAttribute("beyond","beyond_complete_unit_time");
			td.appendChild(spn);
		}catch(e) {
			return;
		}
	}else {
		return;
	}
	
	timerfunc();

	function timerfunc() {
		var stime = cgetNow();
		if( lastTime ) {
			lt = lastTime.match(/^(\d+)\-(\d+)\-(\d+) (\d+):(\d+):(\d+)$/);
			if( lt ) {
				var t = new Date(parseInt(lt[1], 10), parseInt(lt[2], 10) - 1, parseInt(lt[3], 10),
								 parseInt(lt[4], 10), parseInt(lt[5], 10), parseInt(lt[6], 10) );
				if( stime < t) {
					stime = t;
				}
			}
		}

		var spns = $a("//span");
		for(var i=0 ; i<spns.length ; i++){
			if( spns[i].getAttribute("beyond" ) != "beyond_complete_unit_time" ) continue;

			var ctime = caddDate(stime, spns[i].parentNode.innerHTML);
			
			if( ctime ) {
				spns[i].innerHTML = "　(" + ctime + ")";
			}
		}
		window.setTimeout( timerfunc, 1000);
	}
}

//////////////////////
// 동맹 표시 개선
//////////////////////
function disp_AllianceInfo()
{
	if( OPT_ALLY_XY )	allianceXY();
	if( OPT_ALLY_IS )	allianceSort();
	if( OPT_ALLY_CSV )	allianceCSV();


	// 동맹표시 소트
	function allianceSort()
	{
		if( location.pathname != "/alliance/info.php" ) return;
		
		var sort_kind, sort_order;
		
		var sort_list = ["num", "str", "num", "num", "num", "str", "str"];
		
		for(var i=0 ; i<8 ; i++) {
			var th = $x("//table[@summary=\"랭킹\"]//tr[2]//th[" + (i+1) + "]");
			if( th ) {
				
				sort_kind = sort_list[i];
				if( th.id == "beyond_ally_xy" ) sort_kind = "xy";

				th.appendChild(d.createElement("br"));

				var a = d.createElement("a");
				a.href = "javascript:void(0)";
				(function(n, k){
					$e(a, "click", function(){row_sort(n, k, "asc"); } );
				})(i+1, sort_kind);

				var img = d.createElement("img");
				img.src= IMG_DIR + "trade/icon_up.gif";
				img.alt = "오름차순 정렬";
				img.title = img.alt;
				a.appendChild(img);

				th.appendChild(a);
				th.appendChild(d.createTextNode(" "));
				a = d.createElement("a");
				a.href = "javascript:void(0)";
				(function(n, k){
					$e(a, "click", function(){row_sort(n, k, "dsc"); } );
				})(i+1, sort_kind);

				img = d.createElement("img");
				img.src= IMG_DIR + "trade/icon_down.gif";
				img.alt = "내림차순 정렬";
				img.title = img.alt;
				a.appendChild(img);

				th.appendChild(a);
				
			}
		}

		function row_sort(col, kind, order) {
			var tbl = $x("//table[@summary=\"랭킹\"]");
			var trs = $a("descendant::tr[position()>2]", tbl);
			sort_kind = kind;
			sort_order = order;

			var strs = new Array();
			if( col == 2 || kind == "xy" ) {
				// 이름 또는 좌표는 a태그 뒤에
				for(var i=0; i<trs.length ; i++) {
					var td = $x("descendant::td[" + col + "]", trs[i]);
					var a = $x("descendant::a", td);
					if( a ) strs.push({"node":trs[i], "value":a.innerHTML});
					else strs.push({"node":trs[i], "value":""});
				}
			} else {
				for(var i=0; i<trs.length ; i++) {
					var td = $x("descendant::td[" + col + "]", trs[i]);
					strs.push({"node":trs[i], "value":td.innerHTML});
				}
			}

			strs.sort(row_cmp);
			
			for(var i=0 ; i<trs.length ; i++) {
				strs[i].node.parentNode.removeChild(strs[i].node);
				tbl.appendChild(strs[i].node);
			}
		}
		
		function row_cmp(a, b)
		{
			var ret = 0;
			if( sort_kind == "num" ){
				ret = parseInt(a.value, 10) - parseInt(b.value, 10);
			}else if (sort_kind == "xy") {
				// 좌표
				if( !a.value && !b.value ) ret =  0;
				else if( !a.value ) ret = 1;
				else if( !b.value ) ret = -1;
				else {
					var a_xy = a.value.split(",");
					var b_xy = b.value.split(",");
					ret = ( Math.pow(parseInt(a_xy[0], 10), 2) + Math.pow(parseInt(a_xy[1], 10), 2) ) -
						  ( Math.pow(parseInt(b_xy[0], 10), 2) + Math.pow(parseInt(b_xy[1], 10), 2) );
				}
			}else {
				if( a.value == b.value ) {
					ret = 0;
				} else if( a.value > b.value ) {
					ret = 1;
				}else {
					ret = -1;
				}
			}
			if( sort_order == "dsc") {
				ret = 0 - ret;
			}
			return ret;
			
		}
	}

	// 동맹원 좌표 표시
	function allianceXY()
	{
		// 좌표 수집
		if( location.pathname =="/user/" || location.pathname == "/user/index.php" ) {
			if( USER_ID || URLPARAM.user_id ) {
				var uid, aid;
				if( URL_PARAM.user_id ) uid = URL_PARAM.user_id;
				else uid = USER_ID;
				var allytd = $x("//table[@class=\"commonTables\"]//tr[3]//td[4]");
				if( !allytd ) return;
				var aids = allytd.innerHTML.match(/\/alliance\/info\.php\?id\=(\d+)/);
				if( !aids ) return;
				aid = aids[1];
				var table = $x("//table[@class=\"commonTables\"]");
				if( table ) {
					var xy = getXYfromUserHTML(table.innerHTML);
					if( xy ) {
						csetUserXY(aid, uid, xy.x, xy.y);
					}
				}
			}
		}

		// 표시
		if( location.pathname == "/alliance/info.php" ) {
			if( ALLY_ID || URL_PARAM.id ) {
				var aid;
				if( URL_PARAM.id ) aid = URL_PARAM.id;
				else aid = ALLY_ID;

				var head1 = $x("//table[@summary=\"랭킹\"]//tr[1]//th[@class=\"ttl\"]");
				if( head1 ) {
					head1.setAttribute("colspan", parseInt(head1.getAttribute("colspan"),10) + 1 + "");
				}
				var head2 = $x("//table[@summary=\"랭킹\"]//tr[2]");
				if( head2 ) {
					var th = d.createElement("th");
					th.className = "all";
					th.style.width = "110px";
					th.id = "beyond_ally_xy";
					th.innerHTML = "좌표";
					var lnk = d.createElement("a");
					lnk.href = "javascript:void(0)";
					lnk.innerHTML ="(GET)";
					lnk.style.fontSize = "9px";
					
					var running = false;
					
					$e(lnk, "click", function() {
						
						if( running ) return ;
						
						if( confirm("이 작업은 서버에 부하를 줍니다.\n여러 번 반복하면, DoS공격이 되므로 주의하세요.") == false ) return;
						running = true;
//						cdeleteUserXY(aid);
						var trs = $a("//table[@summary=\"랭킹\"]//tr[position()>2]");

						var now_num = 0;
						var all_num = trs.length;
						window.setTimeout(timerFunc, 0);

						function timerFunc()
						{
							var idtd = $x("descendant::td[2]",trs[now_num]);
							if( !idtd ) {
								alert("페이지 포맷이 변경된 것 같습니다.");
								return ;
							}
							var ids = idtd.innerHTML.match(/\/user\/\?user_id\=(\d+)/);
							if( !ids ) {
								alert("페이지 포맷이 변경된 것 같습니다.");
								return ;
							}

							var tmp = $("beyond_xylink_" + ids[1] );
							if( tmp.innerHTML != "　" ) {
								now_num ++;
								if( now_num < all_num ) {
									window.setTimeout(timerFunc, 0);
								}else{
									running = false;
									alert("모든 좌표를 확인했습니다.");
								}
								return ;
							}

							cajaxRequest("/user/?user_id=" + ids[1], "GET", "", function(req) {
								var xytd = $("beyond_xylink_" + ids[1] );
								if(xytd) {
									var xy = getXYfromUserHTML(req.responseText);
									if( xy ) {
										csetUserXY(aid, ids[1], xy.x, xy.y);
										xytd.innerHTML = cgetXYHtml(xy.x, xy.y );
									}
								}
								now_num ++;
								if( now_num < all_num ) {
									window.setTimeout(timerFunc, 0);
								}else{
									running = false;
									alert("모든 좌표를 확인했습니다.");
								}
							});
						}
					});

					th.appendChild(lnk);
					head2.appendChild(th);
				}

				var trs = $a("//table[@summary=\"랭킹\"]//tr[position()>2]");
				var xylists = cloadData( "allyXYList" + aid, "[]", true, true );
				
				// 바꿔쓰기
				var xylist = new Array();
				for(var i=0 ; i<xylists.length ; i++) {
					xylist["id" + xylists[i].id ] = {"x":xylists[i].x, "y":xylists[i].y};
					if( xylist["id" + xylists[i].id].x == null )  xylist["id" + xylists[i].id].x = 0;
					if( xylist["id" + xylists[i].id].y == null )  xylist["id" + xylists[i].id].y = 0;
				}

				for(var i=0; i<trs.length ; i++) {
					var idtd = $x("descendant::td[2]",trs[i]);
					if( !idtd ) continue;
					var ids = idtd.innerHTML.match(/\/user\/\?user_id\=(\d+)/);
					if( !ids ) continue;
					
					var td = d.createElement("td");
					td.id = "beyond_xylink_" + ids[1];
					if( xylist["id" + ids[1] ] ) {
						td.innerHTML = cgetXYHtml(xylist["id" + ids[1] ].x, xylist["id" + ids[1] ].y);
					}else{
						td.innerHTML ="　";
					}
					trs[i].appendChild(td);

					var yaku = $x("descendant::td[7]",trs[i]);
					if( yaku.innerHTML.match(/맹주보좌/) ) {
						// 맹주보좌가 아슬아슬하게 2줄이 되려고 해서 뒤에는 공백으로 처리
						yaku.innerHTML = yaku.innerHTML.replace(/[ 　\t\r\n]+$/g, "");

					}
				}
			}
		}
	}

	function getXYfromUserHTML(html)
	{
		var xy = html.match(/\<\/a\>\(본거지\)\<\/td\>[\s\S]+?\<td\>([\-0-9]+),([\-0-9]+)\<\/td\>/);
		if( xy ) {
			return {"x":parseInt(xy[1],10),"y":parseInt(xy[2],10)};
		}
		return null;
	}

	function getDatafromUserHTML(html)
	{
		var ret = [];
		var tmp = html.match(/\<td\>랭크\<\/td\>[\s\S]+?<td\>([0-9]+)\<\/td\>/);
		if( !tmp ) return null;
		ret["all_rank"] = parseInt(tmp[1] ,10);

		tmp = html.match(/\<td\>총합\<\/td\>[\s\S]+?<td\>([0-9]+)\<\/td\>/);
		if( !tmp ) return null;
		ret["all_point"] = parseInt(tmp[1] ,10);

		tmp = html.match(/\<td\>총인구\<\/td\>[\s\S]+?<td\>([0-9]+)\<\/td\>/);
		if( !tmp ) return null;
		ret["jinko"] = parseInt(tmp[1] ,10);

		tmp = html.match(/\<td\>공격\<\/td\>[\s\S]+?<td\>([0-9]+)\<\/td\>/);
		if( !tmp ) return null;
		ret["attack"] = parseInt(tmp[1] ,10);

		tmp = html.match(/\<td\>방어\<\/td\>[\s\S]+?<td\>([0-9]+)\<\/td\>/);
		if( !tmp ) return null;
		ret["defence"] = parseInt(tmp[1] ,10);

		tmp = html.match(/\<td\>격파스코어\<\/td\>[\s\S]+?<td\>([0-9]+)\<\/td\>/);
		if( !tmp ) return null;
		ret["attack_score"] = parseInt(tmp[1] ,10);

		tmp = html.match(/\<td\>방어스코어\<\/td\>[\s\S]+?<td\>([0-9]+)\<\/td\>/);
		if( !tmp ) return null;
		ret["defence_score"] = parseInt(tmp[1] ,10);

		tmp = html.match(/\<\/a\>\(본거지\)\<\/td\>[\s\S]+?\<td\>([\-0-9]+),([\-0-9]+)\<\/td\>/);
		if ( !tmp ) return null;
		ret["x"] = parseInt(tmp[1],10);
		ret["y"] = parseInt(tmp[2],10);

		return ret;
	}

	function getXYListfromUserHTML(html)
	{
		var ret = new Array();
		var tmp = html.match(/\<td\>군주\<\/td\>[\s\S]+?<td\>(.+)\<\/td\>/);
		if( !tmp ) return null;
		var user_name = tmp[1];
		
		tmp = html.match(/\<td\>동맹\<\/td\>[\s\S]+?<td\>\<a href=\"\.\.\/alliance\/info\.php\?id=[0-9]+\"\>(.+)\<\/a\>\<\/td\>/);
		if( !tmp ) return;
		var ally_name = tmp[1];
		
		var pos;
//		var reg = /\<a href=\"\.\.\/land\.php.*\"\>([\s\S]+?)\<\/a\>[\s\S]+?\<td\>([\-0-9]+),([\-0-9]+)\<\/td\>[\s\S]+?\<td\>([0-9]+|\&nbsp\;)\<\/td\>/;
		var reg = /\<a href=\"(?:\.\.\/land\.php|\.\.\/village_change\.php).*\"\>([\s\S]+?)\<\/a\>[\s\S]+?\<td\>([\-0-9]+),([\-0-9]+)\<\/td\>[\s\S]+?\<td\>([0-9]+|\&nbsp\;)\<\/td\>/;
		var honkyo = 1;
		while((pos = html.search(reg) ) != -1 ) {
			
			html = html.substr(pos);
			
			var dat = html.match(reg);
			if( !dat ) break;
			
			if( dat[4] == "&nbsp;" ) dat[4] = "";
			
			ret.push({"user_name":user_name, "ally_name":ally_name, "area_name":dat[1].replace(/(^\s+|\s+$)/g, ""), "x":dat[2], "y":dat[3], "jinko":dat[4], "honkyo":honkyo});
			honkyo="";
			html = html.substr(dat[0].length);
			
		}

		return ret;
	}

	function allianceCSV()
	{
		if( location.pathname != "/alliance/info.php" ) return;
/*
		if( URL_PARAM.id ) {
			if( ALLY_ID != URL_PARAM.id ) {
				return;
			}
		}
*/
		var aid;
		if( URL_PARAM.id ) aid = URL_PARAM.id;
		else aid = ALLY_ID;

		//CSV 출력용
		var tbl = $x("//table[@summary=\"랭킹\"]");
		if( !tbl ) return;

		var lnk = d.createElement("a");
		lnk.href = "javascript:void(0)";
		lnk.innerHTML ="동맹원상세정보csv";
		tbl.parentNode.insertBefore(lnk, tbl.nextSibling);
		$e(lnk, "click", function() {
			
			if( $("beyond_csvWindow") ) return;

			if( confirm("이 작업은 서버에 부하를 줍니다.\n여러 번 반복하면, DoS공격이 되므로 주의하세요.") == false ) return;
			
			// 윈도 생성
			var elm_xy = cgetElementXY( this );
			var yy = elm_xy.y - 420;
			if( yy < 0 ) yy = 0;
			createCSVWindow(10, yy);

			var trs = $a("//table[@summary=\"랭킹\"]//tr[position()>2]");

			var elm_msg = $("beyond_csvWindow_message");
			if( !elm_msg ) return;
			var elm_csv = $("beyond_csvWindow_csv");
			if( !elm_csv ) return;

			var now_num = 0;
			var all_num = trs.length;
			
			if( all_num == 0 ) return;
			
			var csv_txt = "동맹내랭크\tuser_id\t이름\t동맹내 Point\t기부\t거점\t전체랭크\t전체Point\t인구\t공격\t방어\t격파스코어\t방어스코어\t본거지X좌표\t본거지Y좌표\n";

			window.setTimeout(timerFunc ,0 );
			
			function timerFunc()
			{
				if( !$("beyond_csvWindow") ) return;
				var tds = $a("descendant::td",trs[now_num]);
				if( tds.length < 5 ) {
					alert("페이지 포맷이 바뀐 것 같습니다.");
					return ;
				}

				var ids = tds[1].innerHTML.match(/\/user\/\?user_id\=(\d+).*\"\>(.+)\<\/a\>/);
				if( !ids ) {
					alert("페이지 포맷이 바뀐 것 같습니다.");
					return ;
				}
				
				var uid = parseInt(ids[1], 10);

				cajaxRequest("/user/?user_id=" + uid, "GET", "", function(req) {
					var dt = getDatafromUserHTML(req.responseText);
					if( dt ) {
						csv_txt += parseInt(tds[0].innerHTML, 10) + "\t";
						csv_txt += uid + "\t";
						csv_txt += ids[2]  + "\t";
						csv_txt += parseInt(tds[2].innerHTML, 10)  + "\t";
						csv_txt += parseInt(tds[3].innerHTML, 10)  + "\t";
						csv_txt += parseInt(tds[4].innerHTML, 10)  + "\t";
						csv_txt += dt.all_rank  + "\t";
						csv_txt += dt.all_point  + "\t";
						csv_txt += dt.jinko  + "\t";
						csv_txt += dt.attack  + "\t";
						csv_txt += dt.defence  + "\t";
						csv_txt += dt.attack_score  + "\t";
						csv_txt += dt.defence_score  + "\t";
						csv_txt += dt.x  + "\t";
						csv_txt += dt.y  + "\n";

						var xytd = $("beyond_xylink_" + uid );
						if(xytd) {
							csetUserXY(aid, uid, dt.x, dt.y);
							xytd.innerHTML = cgetXYHtml(dt.x, dt.y );
						}

						now_num ++;
						elm_msg.innerHTML = "불러오는 중... ( " + now_num + " / " + all_num + " )";
						if( now_num < all_num ) {
							window.setTimeout(timerFunc, 0);
						}else{
							elm_msg.innerHTML += ".. 완료했습니다. CTRL+A → CTRL+C로 복사해서 Excel 등에 붙여넣기 하세요.";
							elm_csv.value = csv_txt;
							elm_csv.focus();
						}
					} else {
						alert("불러오기 실패" );
					}
					
				}, function(req){
					alert("서버에서 에러가 발생했습니다." );
				});
			}
		});


		var lnk2 = d.createElement("a");
		lnk2.href = "javascript:void(0)";
		lnk2.innerHTML ="동맹원영지좌표csv";
		tbl.parentNode.insertBefore(lnk2, lnk.nextSibling);
		tbl.parentNode.insertBefore(d.createTextNode("　　"), lnk2);
		$e(lnk2, "click", function() {

			if( $("beyond_csvWindow") ) return;

			if( confirm("이 작업은 서버에 부하를 줍니다.\n여러 번 반복하면, DoS공격이 되므로 주의하세요.") == false ) return;
			
			if( navigator.userAgent.toLowerCase().indexOf('chrome') == -1 ) {
				if( confirm("거대 동맹의 경우 CTRL+A와CTRL+C 작업이 오래 걸릴 수 있습니다.\계속 하시겠습니까?") == false ) return;
			}
			// 윈도 생성
			var elm_xy = cgetElementXY( this );
			var yy = elm_xy.y - 420;
			if( yy < 0 ) yy = 0;
			createCSVWindow(10, yy);

			var trs = $a("//table[@summary=\"랭킹\"]//tr[position()>2]");

			var elm_msg = $("beyond_csvWindow_message");
			if( !elm_msg ) return;
			var elm_csv = $("beyond_csvWindow_csv");
			if( !elm_csv ) return;

			var now_num = 0;
			var all_num = trs.length;

			if( all_num == 0 ) return;
			
			var csv_txt = "동맹\t군주\t영지명\tX\tY\t인구\t본거지\n";

			window.setTimeout(timerFunc ,0 );
			
			function timerFunc()
			{
				if( !$("beyond_csvWindow") ) return;
				var tds = $a("descendant::td",trs[now_num]);
				if( tds.length < 5 ) {
					alert("페이지 포맷이 변경된 것 같습니다.");
					return ;
				}

				var ids = tds[1].innerHTML.match(/\/user\/\?user_id\=(\d+).*\"\>(.+)\<\/a\>/);
				if( !ids ) {
					alert("페이지 포맷이 변경된 것 같습니다.");
					return ;
				}
				
				var uid = parseInt(ids[1], 10);

				cajaxRequest("/user/?user_id=" + uid, "GET", "", function(req) {
					var dt = getXYListfromUserHTML(req.responseText);
					if( dt ) {
						for(var i=0 ; i<dt.length ; i++) {
							csv_txt += dt[i].ally_name  + "\t";
							csv_txt += dt[i].user_name  + "\t";
							csv_txt += dt[i].area_name  + "\t";
							csv_txt += dt[i].x  + "\t";
							csv_txt += dt[i].y  + "\t";
							csv_txt += dt[i].jinko  + "\t";
							csv_txt += dt[i].honkyo  + "\n";
						}

						now_num ++;
						elm_msg.innerHTML = "불러오는 중... ( " + now_num + " / " + all_num + " )";
						if( now_num < all_num ) {
							window.setTimeout(timerFunc, 0);
						}else{
							elm_msg.innerHTML += ".. 완료했습니다. CTRL+A → CTRL+C로 복사해서 Excel 등에 붙여넣기 하세요.";
							elm_csv.value = csv_txt;
							elm_csv.focus();
						}
					} else {
						alert("불러오는데 실패했습니다." );
					}
				}, function(req){
					alert("서버에서 에러가 발생했습니다." );
				});
			}
		});

		function createCSVWindow(x, y)
		{
			var cc = $("beyond_csvWindow");
			if( cc ) $("beyond_floatpanel").removeChild(cc);
			cc = d.createElement("div");
			cc.id = "beyond_csvWindow";
			cc.style.left = x + "px";
			cc.style.top = y + "px";
			cc.style.position = "absolute";
			cc.style.backgroundColor = "lightgray";
			cc.style.border = "outset 2px lightgray";
			cc.style.fontSize = "12px";
			cc.style.padding = "15px";
			cc.style.zIndex = 9999;

			cc.style.padding = "10px";
			var dv = d.createElement("div");
			dv.id = "beyond_csvWindow_message";
			cc.appendChild(dv);
			var tx = d.createElement("textarea");
			tx.id = "beyond_csvWindow_csv";
			tx.rows = 25;
			tx.cols = 140;
			tx.style.overflow = "scroll";
			cc.appendChild(tx);

			cc.appendChild(d.createElement("br") );
			ccreateButton(cc, "닫기", "", function(){
				var cc = $("beyond_csvWindow");
				if( cc ) $("beyond_floatpanel").removeChild(cc);
			});

			$("beyond_floatpanel").appendChild(cc);
		}
		
	}
}

//////////////////////
// 자원 합계
//////////////////////
function disp_ResourcesTotal()
{
	var white_all = RES_GROW_W.wood + RES_GROW_W.stone + RES_GROW_W.iron + RES_GROW_W.rice;
	var blue_all = RES_GROW_B.wood + RES_GROW_B.stone + RES_GROW_B.iron + RES_GROW_B.rice;
	var all_all = RES_GROW.wood + RES_GROW.stone + RES_GROW.iron + RES_GROW.rice;

	var spn = $x("//div[@class=\"sideBoxInner\"]/ul/li/span[@class=\"increase\" or @class=\"resource\"]");
	if( !spn ) return;
	var ul = spn.parentNode.parentNode;

	var li = d.createElement("li");
	li.appendChild(d.createTextNode("합계 " + white_all));
	
	var sp = d.createElement("span");
	sp.className = "increase";
	sp.appendChild(d.createTextNode(" +" + blue_all) );
	li.appendChild(sp);
	li.title = "총합 " + all_all;
	ul.appendChild(li);
}

//////////////////////
// 건설/파괴 일람
//////////////////////
function disp_RemoveList()
{
	var img_x = 'data:image/gif;base64,'+
				'R0lGODlhPAA8AIAAAP/MM////yH5BAUUAAEALAAAAAA8ADwAAAJ4jI+py+0Po5y02ouz3rz7D4bi'+
				'SJbmiabqyrbuC8fyTNf2jef6zvf+DQgGJwCV8PgQro7IRXPJLCqerGjCCmMaotIsVzv7KmtiHNd8'+
				'tpVp4nEsDX6lt+7W/EBNfRl1PZY/ZPTXEOjXR1iIcuiQ+OP4CBkpOUlZWVMAADs=';
	var img_m = 'data:image/gif;base64,'+
				'R0lGODlhPAA8AIAAAP/MM////yH5BAUUAAEALAAAAAA8ADwAAAKpjI+py+0Po5y02ouz3rz7D4bi'+
				'SJbmiabqyrbuC8fyTNf2jef6zvc5AAwKacJiMTZcJFnLRvP0dAZT0wOQcQ1UTVkrAPs1dElbcVjR'+
				'LYuuxmGbfV7D31q6+jM2582JvSdvhBZXRxYHR4gAOIh3luWIqFj4lWYYNnbHKJhoWckVqdToB/Kp'+
				'yQd1uVjHmSrnmNq24saqOlsSpVd7+nbbspvrAxwsPExcbBxQAAA7';
	var img_t = 'data:image/gif;base64,'+
				'R0lGODlhPAA8AIAAAP/MM////yH5BAUUAAEALAAAAAA8ADwAAAKnjI+py+0Po5y02ouz3rz7D4bi'+
				'SJbmiabqyrbuC8fyTNf2jef6zvc5AAwKacJiMTZcJFnLAxDRPA2fTkAiSgpWoVaFVto1JI1ccDhA'+
				'FR+rZ1Hamka3y9m3XBu/5j9x8j265/HW5EfnFhYIkcgxaOTYNydI9UjJVrL39bDYkfn3yBUJ0kh5'+
				'tikJh6qEaHraRYrKyof32qmCpRZbR0tU6eP7CxwsPEz8UAAAOw==';
	var img_lup = 'data:image/gif;base64,'+
				'R0lGODlhPAA8AIAAAP/MM////yH5BAUUAAEALAAAAAA8ADwAAAKfjI+py+0Po5y02ouz3rz7D4bi'+
				'SJbmiabqyrbuC8fyTNf2jef6zvc9APgBg7rhMGc03o7AwJH2bDqlsef0YH1Rr1iiaqsAJ8SfbNi7'+
				'MJfRafaZRK7EOVtw867kiups/DTq5mFlF+SHFyjoRXiVpDcCOFYo2YW4ZqAkyaRYuZZZ+Of3l5IH'+
				'QYpiyoA6qnbJ+pUEO7cS6+pje4ubq7vLi1AAADs=';

	if( location.pathname == "/land.php" && URL_PARAM.x && URL_PARAM.y ) {
		
		var rmtime = d.body.innerHTML.match(/(현재 영지를 파괴 중입니다.|현재 마을을 건설 중입니다.|현재 요새를 건설 중입니다.).*\n(\d+\-\d+\-\d+ \d+:\d+:\d+)/ );
		if( rmtime ) {
			if( rmtime[1] == "현재 영지를 파괴 중입니다." ) {
				addList(rmtime[2], 0, URL_PARAM.x, URL_PARAM.y );
			}else if( rmtime[1] == "현재 마을을 건설 중입니다." ) {
				addList(rmtime[2], 3, URL_PARAM.x, URL_PARAM.y );
			}else if( rmtime[1] == "현재 요새를 건설 중입니다." ) {
				addList(rmtime[2], 4, URL_PARAM.x, URL_PARAM.y );
			}
		}else{
			rmtime = d.body.innerHTML.match(/현재 영지를 레벨업 중입니다.*\n(\d+\-\d+\-\d+ \d+:\d+:\d+)에 완료합니다./ );
			if( rmtime ) {
				addList(rmtime[1], 5, URL_PARAM.x, URL_PARAM.y );
			}else {
				delList(0, URL_PARAM.x, URL_PARAM.y);
			}
		}
	}
	
	if( location.pathname == "/facility/castle.php" ) {
		var xy = cgetCurrentBaseXY()
		var rmtime = d.body.innerHTML.match(/(마을을 파괴 중입니다.|요새를 파괴 중입니다.) (\d+\-\d+\-\d+ \d+:\d+:\d+)에 완료됩니다./ );

		if( rmtime ) {
			if( rmtime[1] == "마을을 파괴 중입니다." ) {
				addList(rmtime[2], 1, xy.x, xy.y );
			}else if( rmtime[1] == "요새를 파괴 중입니다." ) {
				addList(rmtime[2], 2, xy.x, xy.y );
			}
		}else{
			delList(1,xy.x, xy.y);
		}
		
		
	}
	
	
	if( location.pathname == "/map.php" ) {
		// 지도에 표시
		var type = 1;
		if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort15 now\"]") ) type=2;
		else if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort20 now\"]") ) type=3;
		
		var lists = cloadData("RemoveList", "[]", true, true);
		lists = checkList(lists);		// 시간이 지난 것은 삭제

		if( lists.length ) {
			var cx = parseInt(URL_PARAM.x,10);
			var cy = parseInt(URL_PARAM.y,10);
			if( cx > MAP_X_MAX ) cx = MAP_X_MAX;
			if( cx < MAP_X_MIN ) cx = MAP_X_MIN;
			if( cy > MAP_Y_MAX ) cy = MAP_Y_MAX;
			if( cy < MAP_Y_MIN ) cy = MAP_Y_MIN;

			var map = $x("//div[@id=\"mapsAll\"]");
			for(var i=0 ; i<lists.length ; i++) {
				var no = cgetMapNofromXY(lists[i].x, lists[i].y, cx, cy, type );
				if( !no ) continue;
				var img_src;
				if( lists[i].kind == 3) img_src = img_m;
				else if(lists[i].kind == 4 ) img_src = img_t;
				else if(lists[i].kind == 5 ) img_src = img_lup;
				else img_src = img_x;

				var img = document.createElement("img");
				img.className = "mapAll" + no;
				img.src = img_src;
				
				map.appendChild(img);
			}
		}
	}
	

	// 패널 표시
	
	var icon_rl = 'data:image/gif;base64,'+
				'R0lGODlhEQAPALMAAAD/ANO3SQbOKKyTQxqvSjKgYAivNwCZAHdrPBVwFVNTUS1NLTMzMwAAAAAA'+
				'AAAAACH5BAQUAP8ALAAAAAARAA8AAARKkMlJq50npzuXAKDALYsBnoBhHWgrVmyLIkOgSIl8Bnww'+
				'TDpCr3djfHbD4Y9hOhWSQ8kC9YTyEFKBwICw9i5WLKfWW3IYNISYEgEAOw==';
	var elms = ccreateSideBox("beyond_sidebox_removelist", icon_rl, "건설/파괴목록");

	var lists = cloadData("RemoveList", "[]", true, true);
	lists = checkList(lists);		// 시간이 지난 것은 삭제

	if( lists.length == 0 ) return;

	var ul = d.createElement("ul");

	for(var i=0 ; i<lists.length ; i++) {
		var li = d.createElement("li");
		// 아이콘
		var title = "";
		switch(lists[i].kind){
		case 0: title = "영지 파괴"; break;
		case 1: title = "마을 파괴"; break;
		case 2: title = "요새 파괴"; break;
		case 3: title = "마을 건설"; break;
		case 4: title = "요새 건설"; break;
		case 5: title = "영지 레벨업"; break;
		}
		var icon = "";
		if( lists[i].kind == 1 || lists[i].kind == 3 ) {		// 마을 파괴 or 건설
			icon = IMG_DIR + "panel/village_b_l.png";
		}else if( lists[i].kind == 2 || lists[i].kind == 4 ) {	// 요새 파괴 or 건설
			icon = IMG_DIR + "panel/fort_b_l.png";
		}else{
			icon = IMG_DIR + "panel/territory_b_s.png";
		}
		li.innerHTML = "<img src=\"" + icon + "\" style='width:20px; height:20px;' title=\"" + title + "\">";
		var sizestyle = "";
		if( lists[i].kind == 0 || lists[i].kind == 1 || lists[i].kind == 2 ) {		// 영지/마을/요새 파괴
			li.innerHTML += "<img src =\"" + img_x + "\" style='position:relative; left:-20px; width:20px; height:20px;' title=\"" + title + "\">" ;
			sizestyle = "style='position:relative; left:-20px;'";
		}
		if( lists[i].kind == 5 ) {								// 영지 레벨업
			li.innerHTML += "<img src =\"" + img_lup + "\" style='position:relative; left:-20px; width:20px; height:20px;' title=\"" + title + "\">" ;
			sizestyle = "style='position:relative; left:-20px;'";
		}

		li.innerHTML += "<a href=\"/land.php?x=" + lists[i].x + "&y=" + lists[i].y +"#ptop\" title=\"표시\" " + sizestyle + ">" + lists[i].time.substr(-8) + "</a>" +
					"<a href=\"/map.php?x=" + lists[i].x + "&y=" + lists[i].y +"#ptop\" title=\"맵(" + lists[i].x + "," + lists[i].y + ")\" " + sizestyle + ">" +
					"<img src=\"" +  img_map + "\" style=\"padding-left:2px;\" /></a>";
		ul.appendChild(li);
	}
	elms.sideBoxInner.appendChild(ul);
	
	function addList(tim, kind, x, y) //kind=0:영지 파괴  1:마을 파괴  2:요새 파괴  3:마을 건설  4:요새 건설  5:영지 레벨업
	{
		var lists = cloadData("RemoveList", "[]", true, true);

		for(var i=0 ; i<lists.length ; i++) {
			if(lists[i].x == x && lists[i].y == y ) {
				return;
			}
		}
		lists.push({"x":x, "y":y, "time":tim, "kind":kind } );
		lists.sort( function(a,b){

				if(a.time > b.time) return 1;
				if(a.time < b.time) return -1;
				return 0;});
		
		csaveData( "RemoveList", lists, true, true );
	}
	function delList(kind, x, y) //kind=0:마을  1:요새
	{
		var lists = cloadData("RemoveList", "[]", true, true);

		for(var i=0 ; i<lists.length ; i++) {
			if(lists[i].x == x && lists[i].y == y ) {
				if( ( ( lists[i].kind == 1 || lists[i].kind == 2 ) && kind == 1 ) ||
					( ( lists[i].kind == 0 || lists[i].kind == 3 || lists[i].kind == 4 || lists[i].kind == 5 ) && kind == 0 ) ) {
					
					lists.splice(i,1);
					csaveData( "RemoveList", lists, true, true );
					break;
				}
			}
		}
	}

	function checkList(lists)
	{
		var dt = new Date();
		var ntime = dt.getFullYear() + "-" +
					(dt.getMonth()+101).toString().substr(-2) + "-" +
					(dt.getDate()+100).toString().substr(-2) + " " +
					(dt.getHours()+100).toString().substr(-2)  + ":" +
					(dt.getMinutes()+100).toString().substr(-2)  + ":" +
					(dt.getSeconds()+100).toString().substr(-2);
		var str1 = "";
		var str2 = "";
		var str3 = "";
		var str4 = "";
		for(var i=0 ; i<lists.length ; i++) {
			if( lists[i].time < ntime ) {
				if ( lists[i].kind == 1 || lists[i].kind == 2 ) {
					str2 += "(" + lists[i].x + "," + lists[i].y + ")\n";
				}else if ( lists[i].kind == 3 || lists[i].kind == 4 ) {
					str3 += "(" + lists[i].x + "," + lists[i].y + ")\n";
				}else if ( lists[i].kind == 5 ) {
					//LevelUp 완료
					str4 += "(" + lists[i].x + "," + lists[i].y + ")\n";
					csetMyLevel(lists[i].x, lists[i].y, -1);
				}else {
					str1 += "(" + lists[i].x + "," + lists[i].y + ")\n";
				}
				lists.splice(i,1);
				i--;
			}
		}
		/*
		// 메세지 창이 나오고 나서 화면이 비정상적으로 처리되는 문제가 있어서
		// 메세지 창을 출력하지 않도록 변경
		if( str1 || str2 || str3 || str4 ) {
			var msg = "";
			if( str1) msg += "아래 영지가 파괴되었습니다.\n" + str1;
			if( str2) msg += "아래 거점이 파괴되었습니다.\n" + str2;
			if( str3) msg += "아래 거점이 건설되었습니다.\n" + str3;
			if( str4) msg += "아래 거점이 레벨업했습니다.\n" + str4;
			csaveData( "RemoveList", lists, true, true );
			alert(msg);
		}
		*/
		return lists;
	}
}



function WeWillWin(){

	// 출격 확인 창에서만 내용을 보여준다.
	if ( location.hash == "#ptop"){
	  // 시즌1 데이터 준비
		var landData_season1 = [ '1|(1,0,0,0)', '1|(0,1,0,0)', '1|(0,0,1,0)', '1|(0,0,0,1)',
					     '2|(3,0,0,0)', '2|(0,3,0,0)', '2|(0,0,3,0)',
						 '3|(1,1,1,0)', '3|(0,0,0,4)', 
						 '4|(2,2,2,0)', '4|(2,2,2,2)', '4|(0,0,0,8)',
						 '5|(6,0,0,0)', '5|(0,6,0,0)', '5|(0,0,6,0)',
						 '6|(10,0,0,0)', '6|(0,10,0,0)', '6|(0,0,10,0)', 
						 '7|(3,3,3,0)', 
						 '8|(4,4,4,4)',
						 '9|(0,0,0,0)' ];
		 var landInf_season1 =  [ 15, 15, 15, 15,
						 0, 0, 0,
						 0, 0, 
						 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0, 
						 0, 
						 0, 
						 0  ]; 
		var landSpe_season1 =  [ 0, 0, 0, 0,
						 1.5, 12, 1.5,
						 18, 51, 
						 38, 33, 38,
						 30, 123, 30, 
						 46, 230, 46, 
						 0, 
						 0, 
						 0 ]; 
		var landArc_season1 =  [ 0, 0, 0, 0,
						 12, 1.5, 1.5,
						 18, 8, 
						 38, 33, 38,
						 230, 46, 46,
						 0, 0, 0, 
						 0, 
						 0, 
						 0]; 
		var landCav_season1 =  [ 0, 0, 0, 0,
						 1.5, 1.5, 12,
						 18, 8, 
						 38, 33, 38,
						 46, 46, 230, 
						 0, 0, 0,
						 0, 
						 0, 
						 0 ]; 
		var landHal_season1 =  [ 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 
						 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0,
						 154, 
						 308, 
						 461 ]; 
		var landCro_season1 =  [ 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 
						 0, 0, 0,
						 0, 0, 0, 
						 0, 0, 0,
						 154, 
						 308, 
						 461 ]; 
		var landCag_season1 =  [ 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 
						 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0,
						 154, 
						 308, 
						 461 ];
    // 시즌2 데이터 준비
		var landData_season2 = [ '1|(1,0,0,0)', '1|(0,1,0,0)', '1|(0,0,1,0)', '1|(0,0,0,1)',
					     '2|(3,0,0,0)', '2|(0,3,0,0)', '2|(0,0,3,0)',
						 '3|(1,1,1,0)', '3|(0,0,0,4)', '3|(0,0,0,1)',
						 '4|(2,2,2,0)', '4|(0,0,0,8)',
						 '5|(6,0,0,0)', '5|(0,6,0,0)', '5|(0,0,6,0)', '5|(0,0,0,1)',
						 '6|(10,0,0,0)', '6|(0,10,0,0)', '6|(0,0,10,0)', '6|(2,2,2,0)',
						 '7|(2,4,4,0)', '7|(0,0,0,1)', '7|(0,0,0,12)',
						 '8|(1,2,4,0)', '8|(2,4,1,0)', '8|(4,1,2,0)',
						 '9|(4,4,4,4)', '9|(1,1,1,2)', '9|(0,0,0,18)' ];
		 var landInf_season2 =  [ 15, 15, 15, 15,
						 0, 0, 0,
						 0, 0, 0,
						 0, 0,
						 0, 0, 0, 0,
						 0, 0, 0, 0, 
						 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0 ]; 
		var landSpe_season2 =  [ 0, 0, 0, 0,
						 1.5, 18, 1.5,
						 23, 51, 9,
						 42, 45,
						 38, 195, 38, 90,
						 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0 ]; 
		var landArc_season2 =  [ 0, 0, 0, 0,
						 18, 1.5, 1.5,
						 23, 9, 51,
						 42, 45,
						 195, 38, 38, 90,
						 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0 ]; 
		var landCav_season2 =  [ 0, 0, 0, 0,
						 1.5, 1.5, 18,
						 23, 9, 9,
						 42, 45,
						 38, 38, 195, 90,
						 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0 ]; 
		var landHal_season2 =  [ 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0,
						 0, 0,
						 0, 0, 0, 0,
						 38, 180, 38, 83,
						 195, 195, 68,
						 75, 750, 150,
						 600, 570, 525 ]; 
		var landCro_season2 =  [ 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0,
						 0, 0,
						 0, 0, 0, 0,
						 180, 38, 38, 83,
						 68, 195, 195,
						 150, 150, 750,
						 600, 570, 525 ]; 
		var landCag_season2 =  [ 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0,
						 0, 0,
						 0, 0, 0, 0,
						 38, 38, 180, 83,
						 195, 68, 195,
						 750, 75, 75,
						 600, 570, 525 ];
		// 시즌3 데이터 준비
		var landData_season3 = [ '1|(1,0,0,0)', '1|(0,1,0,0)', '1|(0,0,1,0)', '1|(0,0,0,1)',
					     '2|(3,0,0,0)', '2|(0,3,0,0)', '2|(0,0,3,0)',
						 '3|(1,1,1,0)', '3|(0,0,0,4)', '3|(0,0,0,1)',
						 '4|(2,2,2,0)', '4|(0,0,0,8)',
						 '5|(6,0,0,0)', '5|(0,6,0,0)', '5|(0,0,6,0)', '5|(0,0,0,1)','5|(2,2,1,0)','5|(1,1,2,0)',
						 '6|(10,0,0,0)', '6|(0,10,0,0)', '6|(0,0,10,0)', '6|(2,2,2,0)',
						 '7|(2,4,4,0)', '7|(0,0,0,1)', '7|(0,0,0,12)',
						 '8|(4,1,2,0)', '8|(2,4,1,0)', '8|(1,2,4,0)','8|(14,0,0,0)', '8|(0,14,0,0)', '8|(0,0,14,0)',
						 '9|(4,4,4,4)', '9|(1,1,1,2)', '9|(0,0,0,18)','9|(1,0,0,0)', '9|(0,1,0,0)', '9|(0,0,1,0)' ];
		 var landInf_season3 =  [ 15, 15, 15, 15,
						 0, 0, 0,
						 0, 0, 0,
						 0, 0,
						 0, 0, 0, 0, 0, 0,
						 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0, 0, 0, 0,
						 0, 0, 0, 0, 0, 0 ]; 
		var landSpe_season3 =  [ 0, 0, 0, 0,
						 1, 33, 1,
						 29, 66, 23,
						 52, 62,
						 41, 247, 41, 107, 115, 123,
						 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0, 0, 0, 0,
						 0, 0, 0, 0, 0, 0 ]; 
		var landArc_season3 =  [ 0, 0, 0, 0,
						 33, 1, 1,
						 29, 19, 72,
						 52, 62,
						 247, 41, 41, 107, 115, 123,
						 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0, 0, 0, 0,
						 0, 0, 0, 0, 0, 0  ]; 
		var landCav_season3 =  [ 0, 0, 0, 0,
						 1, 1, 33,
						 29, 19, 23,
						 52, 62,
						 41, 41, 247, 107, 115, 123,
						 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0, 0, 0, 0,
						 0, 0, 0, 0, 0, 0 ]; 
		var landHal_season3 =  [ 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0,
						 0, 0,
						 0, 0, 0, 0, 0, 0,
						 66, 297, 66, 132,
						 363, 363, 99,
						 165, 825, 750, 825, 247, 247,
						 990, 825, 660 , 495, 990, 495 ]; 
		var landCro_season3 =  [ 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0,
						 0, 0,
						 0, 0, 0, 0, 0, 0,
						 297, 66, 66, 132,
						 99, 363, 363,
						 825, 165, 750, 247, 825, 247,
						 990, 825, 660 ,990, 495, 495]; 
		var landCag_season3 =  [ 0, 0, 0, 0,
						 0, 0, 0,
						 0, 0, 0,
						 0, 0,
						 0, 0, 0, 0, 0, 0,
						 66, 66, 297, 132,
						 99, 99, 99,
						 82, 82, 825, 247, 247, 825,
						 990, 825, 660 , 495, 495, 990]; 
						 
		//서버별 시즌 설정(현재 1 - 3기 , 2,3,4,5,6,7 - 1기				 
    var landData ;
    var landInf ; 
		var landSpe ; 
		var landArc ; 
		var landCav ; 
		var landHal ; 
		var landCro ; 
		var landCag ;	
    
    if(location.hostname == "sdsam-w1.nexon.com")
    {
  		landData = landData_season3;
      landInf = landInf_season3; 
  		landSpe = landSpe_season3 ; 
  		landArc = landArc_season3; 
  		landCav = landCav_season3; 
  		landHal = landHal_season3; 
  		landCro = landCro_season3; 
      landCag = landCag_season3;	
    }
    else
    {
  		landData = landData_season1;
      landInf = landInf_season1; 
  		landSpe = landSpe_season1 ; 
  		landArc = landArc_season1; 
  		landCav = landCav_season1; 
  		landHal = landHal_season1; 
  		landCro = landCro_season1; 
      landCag = landCag_season1;	
    }
    
							 
		var defInf = [ 15, 10, 10, 10 ];
		var defSpe = [ 50, 40, 25, 55 ];
		var defArc = [ 52, 58, 42, 26 ];
		var defCav = [ 54, 28, 60, 44 ];
		var defHal = [ 200, 100, 63, 137 ];
		var defCro = [ 208, 145, 105, 65 ];
		var defCag = [ 216, 70, 150, 110 ];
		var defSco = [ 10, 10, 5, 5 ];
		var defCas = [ 30, 10, 40, 20 ];		
		var defRem = [ 10, 10, 10, 10 ];
		var defCat = [ 15, 15, 15, 15 ];		
		// 데이터 준비 끝
		
		var tw = d.createElement("div");
		tw.id = "wwwBOX";
		tw.style.position = "absolute";
		tw.style.backgroundColor = "lightgray";
		tw.style.border = "black";
		tw.style.width = "135px";
		tw.style.height = "175px"
		tw.style.fontSize = "11px";
		tw.style.padding = "8px";
		tw.style.zIndex = 9999;
		tw.style.left = "605px";
		tw.style.top = "520px";
		
		var dv = d.createElement("div");
		var powerInfo = $x('//strong[@class="size1"]');
		var nowX = $x('//input[@name="village_x_value"]');
		var nowY = $x('//input[@name="village_y_value"]');
		// 출병 병력 확인
		var tempGen = $x('//span[@class="soltype"]');
		var inf = $x('//input[@name="infantry_count"]');
		var spe = $x('//input[@name="spear_count"]');
		var arc = $x('//input[@name="archer_count"]');
		var cav = $x('//input[@name="cavalry_count"]');
		var hal = $x('//input[@name="halbert_count"]');
		var cro = $x('//input[@name="crossbow_count"]');
		var cag = $x('//input[@name="cavalry_guards_count"]');
		var sco = $x('//input[@name="scout_count"]');
		var cas = $x('//input[@name="cavalry_scout_count"]');
		var ram = $x('//input[@name="ram_count"]');
		var cat = $x('//input[@name="catapult_count"]');
		
		inf = inf.value == '' ? 0 : parseInt(inf.value);
		spe = spe.value == '' ? 0 : parseInt(spe.value);
		arc = arc.value == '' ? 0 : parseInt(arc.value);
		cav = cav.value == '' ? 0 : parseInt(cav.value);
		hal = hal.value == '' ? 0 : parseInt(hal.value);
		cro = cro.value == '' ? 0 : parseInt(cro.value);
		cag = cag.value == '' ? 0 : parseInt(cag.value);
		sco = sco.value == '' ? 0 : parseInt(sco.value);
		cas = cas.value == '' ? 0 : parseInt(cas.value);
		ram = ram.value == '' ? 0 : parseInt(ram.value);
		cat = cat.value == '' ? 0 : parseInt(cat.value);
		nowX = parseInt(nowX.value);
		nowY = parseInt(nowY.value);
		var totalPower = powerInfo.innerHTML;
			totalPower = parseInt(totalPower.replace(/,/gi,""));
		var typeGen = tempGen.innerHTML;
		// 장수도 병종에 따라서 각 병종 병력에 병사 1명으로 포함
		if ( typeGen.indexOf('검') > 0 ) inf = inf + 1;
		if ( typeGen.indexOf('창') > 0 ) spe = spe + 1;
		if ( typeGen.indexOf('궁') > 0 ) arc = arc + 1;
		if ( typeGen.indexOf('기') > 0 ) cav = cav + 1;

		var cx = cloadData("OPT_CX", true);
		var cy = cloadData("OPT_CY", true);
		var stars = cloadData("OPT_MapStarRecord", true);
		var ress = cloadData("OPT_MapResRecord", true); 
		var ressArray = ress.split("|");
		var mapType = stars.length;
		var BasePoint = 5;
		var SeedPoint = 11;
		if (mapType == 225){
			BasePoint = 7;
			SeedPoint = 15;
		}
		if (mapType == 400){
			BasePoint = 9;
			SeedPoint = 20;
		}
		cx = cx - BasePoint;
		cy = cy + BasePoint;
		var totalTroop = 0;

		if ( inf ) totalTroop = totalTroop + 1;
		if ( spe ) totalTroop = totalTroop + 1;
		if ( arc ) totalTroop = totalTroop + 1;
		if ( cav ) totalTroop = totalTroop + 1;
		if ( hal ) totalTroop = totalTroop + 1;
		if ( cro ) totalTroop = totalTroop + 1;
		if ( cag ) totalTroop = totalTroop + 1;
		if ( sco ) totalTroop = totalTroop + 1;
		if ( cas ) totalTroop = totalTroop + 1;
		if ( ram ) totalTroop = totalTroop + 1;
		if ( cat ) totalTroop = totalTroop + 1;

		var starLine = (Math.abs(cx - nowX) * SeedPoint) + (cy - nowY);
		var	stars = stars.substring(starLine, starLine + 1);
		var ress = ressArray[starLine];
		var distance = cgetDistanceFromBase(nowX, nowY);
		var checkPoint = 0;
		
		var resultData = 999;
		for ( var indexData in landData )
		{
			if ( landData[indexData] == stars + "|" + ress )
			{
				resultData = indexData;
				break;
			}
		}
		// 거리 증가분이 포함된 해당 지역의 병력 산출
		var ldInf = landInf[resultData] + ( ( landInf[resultData] / 10) * distance );
		var ldSpe = landSpe[resultData] + ( ( landSpe[resultData] / 10) * distance );
		var ldArc = landArc[resultData] + ( ( landArc[resultData] / 10) * distance );
		var ldCav = landCav[resultData] + ( ( landCav[resultData] / 10) * distance );
		var ldHal = landHal[resultData] + ( ( landHal[resultData] / 10) * distance );
		var ldCro = landCro[resultData] + ( ( landCro[resultData] / 10) * distance );
		var ldCag = landCag[resultData] + ( ( landCag[resultData] / 10) * distance );
		ldInf = ldInf.toFixed(0);
		ldSpe = ldSpe.toFixed(0);
		ldArc = ldArc.toFixed(0);
		ldCav = ldCav.toFixed(0);
		ldHal = ldHal.toFixed(0);				
		ldCro = ldCro.toFixed(0);
		ldCag = ldCag.toFixed(0);
		// 전투결과를 표시할 변수
		var warResult = '';
		// 공격측 총 병력 확인
		var totalMan = inf + spe + arc + cav + hal + cro + cag;

		var totaldefInf = 0;
		var totaldefSpe = 0;
		var totaldefArc = 0;
		var totaldefCav = 0;
		var totaldefHal = 0;
		var totaldefCro = 0;
		var totaldefCag = 0;

		// 검병 총 방어력
		totaldefInf = ( ldInf * defInf[0] * inf ) +
					  ( ldInf * defInf[1] * (spe + hal) ) +
					  ( ldInf * defInf[2] * (arc + cro) ) +
					  ( ldInf * defInf[3] * (cav + cag) ) ;
		// 창병 총 방어력
		totaldefSpe = ( ldSpe * defSpe[0] * inf ) +
					  ( ldSpe * defSpe[1] * (spe + hal) ) +
					  ( ldSpe * defSpe[2] * (arc + cro) ) +
					  ( ldSpe * defSpe[3] * (cav + cag) ) ;
		// 궁병 총 방어력
		totaldefArc = ( ldArc * defArc[0] * inf ) +
					  ( ldArc * defArc[1] * (spe + hal) ) +
					  ( ldArc * defArc[2] * (arc + cro) ) +
					  ( ldArc * defArc[3] * (cav + cag) ) ;
		// 기병 총 방어력
		totaldefCav = ( ldCav * defCav[0] * inf ) +
					  ( ldCav * defCav[1] * (spe + hal) ) +
					  ( ldCav * defCav[2] * (arc + cro) ) +
					  ( ldCav * defCav[3] * (cav + cag) ) ;
		// 모창병 총 방어력
		totaldefHal = ( ldHal * defHal[0] * inf ) +
					  ( ldHal * defHal[1] * (spe + hal) ) +
					  ( ldHal * defHal[2] * (arc + cro) ) +
					  ( ldHal * defHal[3] * (cav + cag) ) ;
		// 노병 총 방어력
		totaldefCro = ( ldCro * defCro[0] * inf ) +
					  ( ldCro * defCro[1] * (spe + hal) ) +
					  ( ldCro * defCro[2] * (arc + cro) ) +
					  ( ldCro * defCro[3] * (cav + cag) ) ;
		// 근위기병 총 방어력
		totaldefCag = ( ldCag * defCag[0] * inf ) +
					  ( ldCag * defCag[1] * (spe + hal) ) +
					  ( ldCag * defCag[2] * (arc + cro) ) +
					  ( ldCag * defCag[3] * (cav + cag) ) ;
		// 총 경험치
		var totalexp = (ldInf*1) + (ldSpe*2) + (ldArc*2) + (ldCav*2) + (ldHal*4) + (ldCro*4) + (ldCag*4);
		// 총 방어력
		var totaldef = totaldefInf + totaldefSpe + totaldefArc + totaldefCav +
									 totaldefHal + totaldefCro + totaldefCag;
		totaldef = totaldef / totalMan;
		totaldef = totaldef;
		// 승패 판단, 적어도 총 방어력보다 총 공격력이 2는 높아야 승리
		// 시뮬레이터에서 확인 결과 [총공격력+2 = 방어력] 인 상황이어야 장수 HP가 1이 남음
		totaldef + 2 < totalPower ? warResult = '<font color="blue">승리</font>' : warResult = '<font color="red">패배</font>';

		totaldef - totaldef.toFixed(0);
		// 공격과 방어 수치를 3자리마다 콤마를 찍어서 표시
		var resultAtt = '';
		var resultDef = '';
		var resultExp = '';
		totalPower = Math.round(totalPower);
		totaldef = Math.round(totaldef);
		resultAtt = dataComma(totalPower.toString());
		resultDef = dataComma(totaldef.toString());
		resultExp = dataComma(totalexp.toString());

		var ch_season = "";
    if(location.hostname == "sdsam-w1.nexon.com")
    {
      ch_season = "3기";
    }
    else
    {
      ch_season = "1기";
    }
		var strInner = "<b>[ 전투 결과 예상("+ch_season+") ]</b></br></br>" +
					   "지형(★) : " + stars + "|" + ress + "</br>" +
					   "거리 : " + distance.toFixed(2) + "</br>" +
					   "- 예상 병력 -</br>" +
					   "검병 : " + ldInf + "</br>" +
					   "기본 : " + ldSpe + "|" + ldArc + "|" + ldCav + "</br>" +
					   "강화 : " + ldHal + "|" + ldCro + "|" + ldCag + "</br></br>" +

					   "공격 : " + resultAtt + "</br>" +
					   "방어 : " + resultDef + "</br>" +
					   "경험치 : " + resultExp + "</br></br>" +
					   "<b>결과 : " + warResult + "</b>";
	    dv.innerHTML = strInner;
		tw.appendChild(dv);
		
		$("beyond_floatpanel").appendChild(tw);

	}	

		

/*
	var base = $("status_left");
	var elm_xy = cgetElementXY( base );
	var dv = d.createElement("div");
	dv.id = "wwwBOX";
	dv.style.top = "0 px";
	dv.style.left = "0 px";
	dv.style.position = "absolute";
	dv.style.color="black";
	dv.innerHTML = "Test";
	base.appendChild( dv );
	document.all[wwwBOX].style.left = "80px";
	document.all[wwwBOX].style.top = "300px";	
	document.all[wwwBOX].visibility = visible;
*/
}
// 3자리마다 콤마 찍어주는 함수;;;;
function dataComma(tmpData)
{
	var result ='';
	for ( var idx = 0; idx < tmpData.length; idx++ )
	{
		var tmp = tmpData.length - ( idx + 1 );
		if ( idx % 3 == 0 && idx != 0 ) result = ',' + result;
		result = tmpData.charAt(tmp) + result;
	}
	return result;
}

//////////////////////
// 자원 남은 시간
//////////////////////
function disp_ResourcesTime()
{
	
	var flag_cost = false;
	if( location.pathname == "/facility/facility.php" ||
		location.pathname == "/facility/select_facility.php" ||
		location.pathname == "/facility/castle.php" ||
		location.pathname == "/facility/map.php" ||
		location.pathname == "/facility/unit_confirm.php") {
		flag_cost = true;
	}
	
	var names = ["wood", "stone", "iron", "rice"];

	// status_left과 status_right의 폭 변경
	var stat_left = $("status_left");
	var stat_right = $("status_right");
	if( stat_left && stat_right ) {
		stat_left.style.width = "720px";	// 670 + 50
		stat_right.style.width = "205px";	// 255 - 50
	}
	
	for(var i=0 ; i< names.length ; i++ ) {
		var base = $(names[i]);
		var elm_xy = cgetElementXY( base );
		var dv = d.createElement("div");
		dv.id = "beyond_restime_" + names[i];
		dv.style.top = (elm_xy.y + 12) + "px";
		dv.style.left = elm_xy.x + "px";
		dv.style.position = "absolute";
		base.parentNode.appendChild( dv );
	}

	// 명성
	var bldtbl = [17, 35, 54, 80, 112, 150, 195, 248, 310, 999];

	for( var i=0 ; i< bldtbl.length ; i++ ){
		if( RES_MAX.fame < bldtbl[i] ) {
			var img = $x("//div[@id=\"status_left\"]/img[5]");
			if( img ) {
				var dv = d.createElement("div");

				var elm_xy = cgetElementXY( img );

				dv.id = "beyond_restime_meisei";
				dv.style.top = (elm_xy.y + 12) + "px";
				dv.style.left = (elm_xy.x + 10) + "px";
				dv.style.position = "absolute";
				dv.style.color="lightgreen";
				if( bldtbl[i] != 999 ) {
					dv.innerHTML = "다음거점:" +  bldtbl[i];
				}

				// basename에서 현재 거점 확인
				var baseelms = $a("//div[@class=\"sideBoxInner basename\"]/ul/li");
				if( baseelms.length < i + 1 ) {
					dv.innerHTML += "(+" + (i + 1 - baseelms.length ) + ")";
				}

				stat_left.appendChild( dv );
			}
			break;
		}
	}

	if( flag_cost ) {
		
		var cst = $a("//td[@class=\"cost\"]");
		for(var i=0 ; i<cst.length ; i++) {
			var spn = $a("descendant::span[@class=\"normal\" or @class=\"max90\"]", cst[i] );
			if( spn.length < 4 ) continue;
			
			for(var j=0 ; j< 4 ; j++ ){
				
				var elm_xy = cgetElementXY( spn[j] );
				var dv = d.createElement("div");
				dv.id = "beyond_restime_" + i + "_" + names[j];
				dv.style.top = (elm_xy.y + 9) + "px";
				dv.style.left = (elm_xy.x - 18 )+ "px";
				dv.style.fontSize = "9px";
				dv.style.position = "absolute";
				cst[i].parentNode.appendChild( dv );
				
			}
			
			
		}
	}

	
	function ResourcesTimer()
	{
		cupdateCurrentResources();
		// 각 자원
		for(var i=0 ; i<names.length ; i++) {
			var dv = $("beyond_restime_" + names[i] );
			var base = $(names[i]);
			if( dv && base ){
				var tim;
				if( RES_GROW[ names[i] ] == 0 ) {
					tim = "XX:XX:XX";
				}else if( RES_GROW[ names[i] ] > 0 ){
					tim = getTime(RES_MAX[ names[i] ] - RES_NOW[ names[i] ], RES_GROW[ names[i] ]);
				}else{
					tim = "-" + getTime(RES_NOW[ names[i] ], 0 - RES_GROW[ names[i] ]);
				}
				if( tim == "00:00:00" || tim.substr(0,1) == "-" ) dv.style.color="red";
				else if( parseInt(tim.substr(0,2), 10) < 1 ) dv.style.color="orange";
				else dv.style.color="lightgreen";

				dv.innerHTML = "(" + tim + ")";
				var elm_xy = cgetElementXY( base );
				dv.style.top = (elm_xy.y + 12) + "px";
				dv.style.left = elm_xy.x + "px";
			}
		}
		
		// 명성
		var img = $x("//div[@id=\"status_left\"]/img[5]");
		if( img ) {
			var dv = $("beyond_restime_meisei");
			if( dv ) {
				var elm_xy = cgetElementXY( img );
				dv.style.top = (elm_xy.y + 12) + "px";
				dv.style.left = (elm_xy.x + 10) + "px";
			}
		}
		
		if( flag_cost ) {
			
			var cst = $a("//td[@class=\"cost\"]");
			for(var i=0 ; i<cst.length ; i++) {
				
				var spn = $a("descendant::span[@class=\"normal\" or @class=\"max90\"]", cst[i] );
				if( spn.length < 4 ) continue;
				var needed = {
					"wood":parseInt(spn[0].innerHTML,10),
					"stone":parseInt(spn[1].innerHTML,10),
					"iron":parseInt(spn[2].innerHTML,10),
					"rice":parseInt(spn[3].innerHTML,10)
				};
				
				for(var j=0 ; j<names.length ; j++ ) {
					var dv = $("beyond_restime_" + i + "_" + names[j] );
					if( !dv ) continue;
					if( needed[ names[j] ] > RES_MAX[ names[j] ] ) {
						dv.style.color="red";
						dv.innerHTML = "창고부족";
					}else if( needed[ names[j] ] > RES_NOW[ names[j] ] ) {
						var tim = getTime(needed[ names[j] ] - RES_NOW[ names[j] ], RES_GROW[ names[j] ]);
						dv.style.color="orange";
						dv.innerHTML = "(" + tim + ")";
					}else{
						dv.style.color="lightgreen";
						dv.innerHTML = "남음 " + (RES_NOW[ names[j] ] - needed[ names[j] ]);
					}
					var elm_xy = cgetElementXY( spn[j] );
					dv.style.top = (elm_xy.y + 9) + "px";
					dv.style.left = (elm_xy.x - 18 )+ "px";
					
				}
				
			}
			
		}
		
		
		window.setTimeout( ResourcesTimer, 1000);
	}
	
	ResourcesTimer();
	
	function getTime(res, grow )
	{
		var tmp = res * 3600 / grow;
		var h = Math.floor(tmp / 3600);
		var m = Math.floor((tmp - h*3600 ) / 60 );
		var s = Math.floor(tmp - h*3600 - m*60 );
		var tim = h + ":" +
				  (m+100).toString().substr(-2)  + ":" +
				  (s+100).toString().substr(-2);
		return tim;
	}
	
}

//////////////////////
// 지형 일람
//////////////////////
function disp_MapList()
{
	if( location.pathname != "/map.php" ) return;
	

	var map_type = 1;
	if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort15 now\"]") ) map_type=2;
	else if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort20 now\"]") ) map_type=3;

	var base = $("mapbox");

	var div =d.createElement("div");
	div.id = "beyond_maplist";
	div.align = "center";
	div.appendChild(d.createElement("br"));
	
	var tmp_t = d.createElement("table");
	var tmp_r = d.createElement("tr");
	var tmp_d1 = d.createElement("td");
	ccreateCheckBox(tmp_d1, "beyond_maplist_kyoten", "1", "거점","거점 포함",0);
	var tmp_d2 = d.createElement("td");
	ccreateCheckBox(tmp_d2, "beyond_maplist_ryouchi", "1", "영지","영지 포함",0);
	var tmp_d3 = d.createElement("td");
	ccreateCheckBox(tmp_d3, "beyond_maplist_akichi", "1", "빈 땅","빈 땅 포함",0);
	var tmp_d4 = d.createElement("td");
	
	var a = d.createElement("a");
	a.href = "javascript:void(0)";
	a.style.color = "black";
	a.appendChild(d.createTextNode("<지형일람 표시>"));
	tmp_d4.appendChild(a);
	
	tmp_r.appendChild(tmp_d1);
	tmp_r.appendChild(tmp_d2);
	tmp_r.appendChild(tmp_d3);
	tmp_r.appendChild(tmp_d4);
	tmp_t.appendChild(tmp_r);
	
	div.appendChild(tmp_t);
	base.appendChild(div);

	var sheet = d.styleSheets[d.styleSheets.length-1];
	sheet.insertRule("table#beyond_maplist_table {border:2px solid black; border-collapse:collapse;}", sheet.cssRules.length);
	sheet.insertRule("table#beyond_maplist_table th {background:lightgray; padding: 5px; text-align:center; border:1px solid black;}", sheet.cssRules.length);
	sheet.insertRule("table#beyond_maplist_table td {padding: 2px; border:1px solid black;}", sheet.cssRules.length);
	
	$e(a, "click", function() {

		var flag_akichi = cgetCheckBoxValue("beyond_maplist_akichi");
		var flag_ryouchi = cgetCheckBoxValue("beyond_maplist_ryouchi");
		var flag_kyoten = cgetCheckBoxValue("beyond_maplist_kyoten");

		var area = $a("//map[@id=\"mapOverlayMap\"]//area");
		var lists = new Array();
		for(var i=0; i<area.length ; i++) {
			var dat = area[i].getAttribute("onmouseover");
			dat = dat.replace(/^.*rewrite/, "getTRData");
			dat = dat.replace(/\); .*$/, ");");
			var trdata;
			eval("trdata = " + dat);
			if( trdata ) {
				lists.push(trdata);
			}
		}

		lists.sort( function(a,b){
				if(a.ally == "" && b.ally != "") return 1;
				else if(a.ally != "" && b.ally == "") return -1;

				if(a.ally > b.ally) return 1;
				else if(a.ally < b.ally) return -1;
				else{
					if( a.user_name > b.user_name) return 1;
					else if(a.user_name < b.user_name) return -1;
					else{
						if( a.kyoten_kind > b.kyoten_kind ) return -1;
						else if( a.kyoten_kind < b.kyoten_kind ) return 1;
						else {
							if( parseInt(a.jinko,10) > parseInt(b.jinko,10) ) return -1;
							else if( parseInt(a.jinko,10) < parseInt(b.jinko,10) ) return 1;
							else {
								if( parseFloat(a.kyori) > parseFloat(b.kyori) ) return 1;
								else if( parseFloat(a.kyori) < parseFloat(b.kyori) ) return -1;
								else {
									if( a.name > b.name ) return 1;
									else if( a.name < b.name ) return -1;
									else return 0;
								}
							}
						}
					}
				}
				return 0;
			});

		var tbl = initTable();

		for(var i=0 ; i<lists.length ; i++) {
			var tr = d.createElement("tr");
			var td;
			td = d.createElement("td");
			td.innerHTML = lists[i].ally;
			tr.appendChild(td);
			td = d.createElement("td");
			td.innerHTML = lists[i].user_name;
			tr.appendChild(td);
			td = d.createElement("td");
			if( lists[i].kyoten_img ) td.innerHTML = "<img src=\"" + lists[i].kyoten_img +  "\" style=\"width:30px; height:30px;\" />";
			tr.appendChild(td);
			td = d.createElement("td");
			td.style.display = "none";
			td.innerHTML = lists[i].kyoten_kind;
			tr.appendChild(td);
			td = d.createElement("td");
			td.innerHTML = lists[i].jinko;
			tr.appendChild(td);
			td = d.createElement("td");
			td.innerHTML = lists[i].name;
			tr.appendChild(td);

			td = d.createElement("td");
			var xy = lists[i].xy.match(/\(([\-0-9]+),([\-0-9]+)\)/);
			if( xy ) td.innerHTML = cgetXYHtml(xy[1], xy[2]);
			else td.innerHTML = lists[i].xy;
			tr.appendChild(td);
			td = d.createElement("td");
			td.innerHTML = lists[i].kyori;
			tr.appendChild(td);
			td = d.createElement("td");
			if( lists[i].npc ) td.style.color = "red";
			td.innerHTML = lists[i].star;
			tr.appendChild(td);

			tbl.appendChild(tr);
		}
		
		if( OPT_TTDISTANCE)	disp_ToolTipsDistance();  // 테스트용
		
		function getTRData(name, user_name, jinko, xy, ally, star, kyori, wood, stone, iron, rice, npc)
		{
			if( !flag_akichi && ally == "" ) return null;
			
			if( jinko == "-") jinko = "";
			var kyoten_img = "";
			var kyoten_kind = 0;
			if( jinko || npc) {
				var tmp = xy.match(/\(([\-0-9]+),([\-0-9]+)\)/);
				if( tmp ) {
					var cx = parseInt(URL_PARAM.x,10);
					var cy = parseInt(URL_PARAM.y,10);
					if( cx > MAP_X_MAX ) cx = MAP_X_MAX;
					if( cx < MAP_X_MIN ) cx = MAP_X_MIN;
					if( cy > MAP_Y_MAX ) cy = MAP_Y_MAX;
					if( cy < MAP_Y_MIN ) cy = MAP_Y_MIN;
					var no = cgetMapNofromXY(parseInt(tmp[1], 10), parseInt(tmp[2], 10), cx, cy, map_type);
					if( no ) {
						var img = $x("//div[@id=\"mapsAll\"]//img[@class=\"mapAll" + no + "\"]");
						if( img ) {
							kyoten_img = img.getAttribute("src");
							if( npc ) kyoten_kind = 4;
							else if( kyoten_img.match(/village/) ) kyoten_kind = 1;
							else if( kyoten_img.match(/fort/) ) kyoten_kind = 2;
							else if( kyoten_img.match(/capital/) ) kyoten_kind = 3;
							
						}
					}
				}
			}

			if( !flag_ryouchi && ally != "" && kyoten_kind == 0 ) return null;
			if( !flag_kyoten && ally != "" && kyoten_kind != 0 ) return null;

			return {"kyoten_kind":kyoten_kind, "kyoten_img":kyoten_img,
					"jinko":jinko , "ally":ally, "user_name":user_name,
					"name":name, "xy":xy, "kyori":kyori, "star":star, "npc":npc};
		}

		var sort_kind, sort_order;

		function row_sort(col, kind, order) {
			var tbl = $("beyond_maplist_table");
			var trs = $a("descendant::tr[position()>1]",tbl);
			sort_kind = kind;
			sort_order = order;

			var strs = new Array();
			if( kind == "xy" ) {
				// 좌표는 a 뒤에
				for(var i=0; i<trs.length ; i++) {
					var td = $x("descendant::td[" + col + "]", trs[i]);
					var a = $x("descendant::a", td);
					if( a ) strs.push({"node":trs[i], "value":a.innerHTML});
					else strs.push({"node":trs[i], "value":""});
				}
			} else {
				for(var i=0; i<trs.length ; i++) {
					var td = $x("descendant::td[" + col + "]", trs[i]);
					if(td.style.color=="red") {
						strs.push({"node":trs[i], "value":"★★★★★★★★★★" + td.innerHTML}); // NPC요새는 특수
					}else{
						strs.push({"node":trs[i], "value":td.innerHTML});
					}
				}
			}

			strs.sort( function(a,b) {
				var ret = 0;
				if( sort_kind == "num" ){
					if( a.value == "" && b.value == "" ) return 0;
					else if( a.value == "" ) return 1;
					else if( b.value == "" ) return -1;
					else ret = parseInt(a.value, 10) - parseInt(b.value, 10);
				}else if( sort_kind == "kyo" ){
					if( parseInt(a.value, 10) == 0 && parseInt(b.value, 10) == 0) return 0;
					else if( parseInt(a.value, 10) == 0 ) return 1;
					else if( parseInt(b.value, 10) == 0 ) return -1;
					else ret = parseInt(a.value, 10) - parseInt(b.value, 10);
				}else if( sort_kind == "float" ){
					ret = parseFloat(a.value, 10) - parseFloat(b.value, 10);
				}else if (sort_kind == "xy") {
					// 좌표
					if( !a.value && !b.value ) ret =  0;
					else if( !a.value ) ret = 1;
					else if( !b.value ) ret = -1;
					else {
						var a_xy = a.value.split(",");
						var b_xy = b.value.split(",");
						ret = ( Math.pow(parseInt(a_xy[0], 10), 2) + Math.pow(parseInt(a_xy[1], 10), 2) ) -
							  ( Math.pow(parseInt(b_xy[0], 10), 2) + Math.pow(parseInt(b_xy[1], 10), 2) );
					}
				}else {
					if( a.value == b.value ) {
						ret = 0;
					}else if( a.value == "" ) {
						return 1;
					}else if( b.value == "" ) {
						return -1;
					}else if( a.value > b.value ) {
						ret = 1;
					}else {
						ret = -1;
					}
				}
				if( sort_order == "dsc") {
					ret = 0 - ret;
				}
				return ret;
			});
			
			tbl = initTable();

			for(var i=0 ; i<trs.length ; i++) {
				tbl.appendChild(strs[i].node);
			}
		}

		function appendSortButton(col, sortcol, kind )
		{
			var tbl = $("beyond_maplist_table");
			var th = $x("descendant::tr[1]//th[" + col + "]", tbl);
			if( !th ) return;
			th.appendChild(d.createElement("br"));

			var a = d.createElement("a");
			a.href = "javascript:void(0);";
			var img = d.createElement("img");
			img.src= IMG_DIR + "trade/icon_up.gif";
			img.alt = "오름차순 정렬";
			img.title = img.alt;
			a.appendChild(img);
			th.appendChild(a);
			
			(function(n, k){
				$e(a, "click", function(){row_sort(n, k, "asc"); } );
			})(sortcol, kind);
			

			th.appendChild(d.createTextNode(" "));
			
			a = d.createElement("a");
			a.href = "javascript:void(0)";
			img = d.createElement("img");
			img.src= IMG_DIR + "trade/icon_down.gif";
			img.alt = "내림차순 정렬";
			img.title = img.alt;

			a.appendChild(img);
			th.appendChild(a);

			(function(n, k){
				$e(a, "click", function(){row_sort(n, k, "dsc"); } );
			})(sortcol, kind);

		}

		function initTable()
		{
			var dv = $("beyond_maplist");

			var tbl = $("beyond_maplist_table");
			if( tbl ) {
				tbl.parentNode.removeChild(tbl);
			}else{
				var a = d.createElement("a");
				a.href = "#ptop";
				a.style.color="black";
				a.appendChild(d.createTextNode("▲맨 위로"));
				a.id = "beyond_maplist_table_gotop";
				dv.appendChild(a);
			}

			tbl = d.createElement("table");
			tbl.id = "beyond_maplist_table";

			tbl.innerHTML = "<tr>" +
					"<th>동맹</th><th>군주</th><th>거점</th><th style=\"display:none;\">거점Kind</th>" +
					"<th>인구</th><th>영지명</th><th>좌표</th><th>거리</th><th>전력</th>" +
					"</tr>";

			dv.insertBefore(tbl, $("beyond_maplist_table_gotop"));

			appendSortButton(1, 1, "str" );
			appendSortButton(2, 2, "str" );
			appendSortButton(3, 4, "kyo" );
			appendSortButton(5, 5, "num" );
			appendSortButton(7, 7, "xy" );
			appendSortButton(8, 8, "float" );
			appendSortButton(9, 9, "str" );
			
			return tbl;
		}
	});
}

//////////////////////
// 거리/시간표시(툴팁)
//////////////////////
function disp_ToolTipsDistance()
{
	if( location.pathname == "/village.php" ) {
		saveTrainingLevel();
	}
	
	var reg = /castle_send_troop\.php\?x=([\-0-9]+)\&y=([\-0-9]+)/;
	
	var r = d.evaluate("//a", d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var links = new Array();
	for(var i=0 ; i<r.snapshotLength; i++) {
		var a = r.snapshotItem(i);
		if( a.href.match(reg) ) {
			if( !a.href.match(/TB_inline/) ) {
				links.push( a );
			}
		}
	}
	if( links.length ) {
		var TL = 0;
		var basename = cgetCurrentBaseName();
		var lists = cloadData("TrainingLevels", "[]", true, true);

		for(var i=0 ; i<lists.length ; i++) {
			if( lists[i].basename == basename ) {
				TL = lists[i].level;
				break;
			}
		}
		
		
		for(var i=0 ; i<links.length ; i++) {
			
			var xy = links[i].href.match( reg );
			if( !xy ) continue;
			
			var distance = cgetDistanceFromBase(xy[1], xy[2] );
			links[i].alt = "";
			links[i].title = "";
			(function(d, t){
				$e(links[i], "mouseover", function(event){showToolTips(event, d, t); } );
			})(distance, TL);
			$e(links[i], "mouseout", function(){hideToolTips(); } );
			
		}
	}

	function showToolTips( evt, distance, trainingLevel )
	{
		hideToolTips();
		var sp = 0.05 * TL + 1;

		var tw = d.createElement("div");
		tw.id = "beyond_ToolTipsWindow";
		tw.style.position = "absolute";
		tw.style.backgroundColor = "lightyellow";
		tw.style.border = "outset 2px lightyellow";
		tw.style.fontSize = "10px";
		tw.style.padding = "10px";
		tw.style.zIndex = 9999;
		var xxx = evt.pageX + 5;
		if( xxx > 700 ) xxx -=175;
		tw.style.left = xxx + "px";
		tw.style.top = (evt.pageY +5) + "px";
		
		var dv = d.createElement("div");
		dv.innerHTML = "시간예상<br>거리 [" + distance.toFixed(2) + "]　훈련소Lv." + trainingLevel + " (+" + (TL*5) + "%)" ;
		tw.appendChild(dv);
		
		var tbl = d.createElement("table");
		tbl.style.border = "2px solid black";
		tbl.style.borderCollapse = "collapse";
		tbl.style.width = "100%";
		
		var now = cgetNow();

		for(var i=0 ; i<OPT_TTDISTANCE_ITEMS.length ; i++){
			
			var tmp = OPT_TTDISTANCE_ITEMS[i].match(/.*\((-?[0-9]+([\.]{1}[0-9]+)?)\)/);
			if( !tmp ) continue;
			var speed = parseFloat(tmp[1]);
			if( speed < 0 ) continue;
			
			var tr = d.createElement("tr");
			var td = d.createElement("td");
			td.style.border = "1px solid black";
			td.style.textAlign = "left";
			td.appendChild(d.createTextNode( OPT_TTDISTANCE_ITEMS[i] ));
			tr.appendChild(td);

			var timeText = getTime(speed * sp, distance);
			
			td = d.createElement("td");
			td.style.border = "1px solid black";
			td.style.textAlign = "right";
			td.appendChild(d.createTextNode(timeText));
			tr.appendChild(td);

			var dayText = caddDate(now, timeText);
			dayText = dayText.substring(5, dayText.length - 3).replace("-", "/");
			

			td = d.createElement("td");
			td.style.border = "1px solid black";
			td.style.textAlign = "right";
			td.appendChild(d.createTextNode(dayText));
			tr.appendChild(td);
			
			tbl.appendChild(tr);
		}

		tw.appendChild(tbl);
		$("beyond_floatpanel").appendChild(tw);
		

		
		function getTime(speed, dist)
		{
			var tmp = dist * 3600 / speed;
			var h = Math.floor(tmp / 3600);
			var m = Math.floor((tmp - h*3600 ) / 60 );
			var s = Math.floor(tmp - h*3600 - m*60 );
			var tim = h + ":" +
					  (m+100).toString().substr(-2)  + ":" +
					  (s+100).toString().substr(-2);
			return tim;
		}
		
	}
	function hideToolTips()
	{
		var tw = $("beyond_ToolTipsWindow");
		if( tw ){
			tw.parentNode.removeChild(tw);
		}
	}


	function saveTrainingLevel()
	{
		var iv = $x("//input[@name=\"village_id\"]");
		if( !iv ) return;
		var bn = $x("//span[@class=\"basename\"]");
		if( !bn ) return;

		var vil_id = iv.value;
		var basename = bn.innerHTML;

		var lists = cloadData("TrainingLevels", "[]", true, true);
		
		
		var level = 0;
		var map = $("mapOverlayMap");
		if( map ) {
			var lv = map.innerHTML.match(/훈련소 LV.([0-9]+)/);
			if( lv ) {
				level = parseInt(lv[1]);
			}
		}
		
		for(var i=0 ; i<lists.length ; i++) {
			if(lists[i].id == vil_id) {
				lists[i].basename = basename;
				lists[i].level = level;
				break;
			}
		}
		if( i == lists.length ) {
			lists.push({"id":vil_id, "basename":basename, "level":level});
		}
		csaveData( "TrainingLevels", lists, true, true );
	}
	
	
}

//////////////////////
// 동맹/군주표시(툴팁)
//////////////////////
function disp_ToolTipsAllyPerson()
{
	var reg = /(\/village_change\.php\?village_id=[0-9]+|\/land\.php\?x=[0-9\-]+\&y=[0-9\-]+)/;
	var r = d.evaluate("//a", d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var links = new Array();
	for(var i=0 ; i<r.snapshotLength; i++) {
		var a = r.snapshotItem(i);
		if( a.href.match(reg) ) {
			if( !a.href.match(/TB_inline/) && !a.href.match(/from/)) {
				links.push( a );
			}
		}
	}

	var selfVillages = new Array();
	var elm = $a("//div[@class=\"sideBoxInner basename\"]/ul/li/a");
	for(var i=0; i<elm.length ; i++) {
		var tmp = elm[i].href.match(/village_id=([0-9]+)/);
		if( tmp ) {
			selfVillages.push(tmp[1]);
			// ■현재 선택중인 마을도 포함하고 싶지만, 일단 보류
		}
	}

	if( links.length ) {
		for(var i=0 ; i<links.length ; i++) {
			var matches = links[i].href.match( reg );
			if( !matches ) continue;
			
			if( links[i].href.match( /village_change\.php/ ) ) {
				var tmp = links[i].href.match(/village_id=([0-9]+)/);
				if( tmp ) {
					if(selfVillages.indexOf(tmp[1]) != -1 ) {
						continue;
					}
				}
			}
			
			links[i].alt = "";
			links[i].title = "";
			(function(url){
				$e(links[i], "mouseover", function(event){showToolTips(event, url); } );
			})(matches[1]);
			$e(links[i], "mouseout", function(){hideToolTips(); } );
		}
	}
	function showToolTips( evt, url )
	{
		hideToolTips();
		var tw = d.createElement("div");
		tw.id = "beyond_ToolTipsWindow";
		tw.style.position = "absolute";
		tw.style.backgroundColor = "lightyellow";
		tw.style.border = "outset 2px lightyellow";
		tw.style.fontSize = "10px";
		tw.style.padding = "10px";
		tw.style.zIndex = 9999;
		var xxx = evt.pageX + 5;
		if( xxx > 700 ) xxx -=50;
		tw.style.left = xxx + "px";
		tw.style.top = (evt.pageY +5) + "px";
		var dv = d.createElement("div");
		dv.id = "beyond_ToolTipsWindow_base";
		dv.appendChild(d.createTextNode("영지 : ..."));
		tw.appendChild( dv );

		dv = d.createElement("div");
		dv.id = "beyond_ToolTipsWindow_ally";
		dv.appendChild(d.createTextNode("동맹 : ..."));
		tw.appendChild( dv );
		
		dv = d.createElement("div");
		dv.id = "beyond_ToolTipsWindow_user";
		dv.appendChild(d.createTextNode("군주 : ..."));
		tw.appendChild( dv );
		$("beyond_floatpanel").appendChild(tw);
		

		cajaxRequest(url, "GET", "", function(req){
			var tw = $("beyond_ToolTipsWindow");
			if( !tw ) return ;

			var dom = d.createElement("html");
			dom.innerHTML = req.responseText;
			if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
				$("beyond_tmp").appendChild(dom);
			}
			var dt = getDatafromLandElm(dom);
			if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
				$("beyond_tmp").removeChild(dom);
			}
			if( !dt ) return ;
			
			if( $("beyond_ToolTipsWindow_base") ) {
				$("beyond_ToolTipsWindow_base").innerHTML = "영지 : " + dt.base + "(" + dt.x + "," + dt.y + ")";
				$("beyond_ToolTipsWindow_ally").innerHTML = "동맹 : " + dt.ally;
				$("beyond_ToolTipsWindow_user").innerHTML = "군주 : " + dt.user;
			}
		}, function(req){
//			alert("서버 에러" );
		});

	}
	function hideToolTips()
	{
		var tw = $("beyond_ToolTipsWindow");
		if( tw ){
			tw.parentNode.removeChild(tw);
		}
	}
	function getDatafromLandElm(dom)
	{
		var ret = new Array();

		var nam = $x("//span[@class=\"basename\"]", dom);

		if( !nam ) return null;
		ret["base"] = nam.innerHTML;
		
		var xy = $x("//span[@class=\"xy\"]", dom);
		if( !xy ) return null;
		xy = xy.innerHTML.match(/([\-0-9]+),([\-0-9]+)/);
		if( !xy ) return null;
		ret["x"] = parseInt(xy[1], 10);
		ret["y"] = parseInt(xy[2], 10);

		var a = $a("//div[@class=\"status\"]//a", dom);
		if( a.length < 2 ) {
			ret["user"] = "";
			ret["ally"] = "";
		}else{
			ret["user"] = a[0].innerHTML;
			ret["ally"] = a[1].innerHTML;
		}
		return ret;
	}

}

	
//////////////////////
// 프로필 화면 표시
//////////////////////
function disp_UserStar()
{
	if( location.pathname == "/user/" || location.pathname == "/user/index.php" ) {
		showProfile();
	}
	

	function showProfile()
	{
		// 군주명 확인
		var uname_td = $x("//table[@class=\"commonTables\"]//tr[2]/td[2]");
		if( !uname_td ) return;
		var uname = uname_td.textContent;
		var uid = USER_ID;
		if( URL_PARAM.user_id ) uid = URL_PARAM.user_id;

		// 테이블에 ★공간 추가
		cappendColumnForProfile("★", "beyond_star" );

		// 내용 초기화 설정
		lists = cloadData( "UserStarList" + uid, "[]", true, true );

		for( var i=0 ; i<lists.length ; i++){
			var td = $("beyond_star_" + lists[i].x + "_" + lists[i].y);
			if( td && td.innerHTML == "" ) {
				if( lists[i].npc ) {
					td.innerHTML = "★" + (lists[i].star/78);
					td.style.color = "red";
				}else{
					td.innerHTML = "★" + (lists[i].star/78) + " (" + lists[i].wood + "," + lists[i].stone + "," + lists[i].iron + "," + lists[i].rice + ")";
				}
				td.style.opacity = (lists[i].star/78) * 0.05 + 0.5;
			}
		}
		// 타이틀에 GET 추가
		var th = $("beyond_star_title");
		if( th ) {
			var lnk = d.createElement("a");
			lnk.href = "javascript:void(0)";
			lnk.innerHTML ="(GET)";
			lnk.style.fontSize = "9px";

			var running = false;
			$e(lnk, "click", function() {
				
				if( running ) return ;
				
				if( confirm("이 작업은 서버에 부하를 줍니다.\n여러 번 반복하면, DoS공격이 되므로 주의하세요.") == false ) return;
				running = true;

				window.setTimeout(timerFunc, 0);

				function timerFunc()
				{
					var tds = $a("//td[contains(@id, \"beyond_star_\")]");
					var targettd = "";
					var targetid = "";
					for( var i=0 ; i< tds.length ; i++) {
						if( tds[i].innerHTML == "" ) {
							targettd = tds[i];
							targetid = tds[i].id;
							break;
						}
					}
					if( !targetid ) {
						alert("모든 ☆정보를 확인했습니다.");
						running = false;
						return;
					}

					var xy = targetid.match(/beyond_star_([\-0-9]+)_([\-0-9]+)/);
					if( !xy ) {
						console.log("err");;
						return ;
					}
					
					cajaxRequest("/map.php?x=" + xy[1] + "&y=" + xy[2], "GET", "", function(req) {
						var dom = d.createElement("html");
						dom.innerHTML = req.responseText;
						if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
							$("beyond_tmp").appendChild(dom);
						}
						
						var area = $a("//map[@id=\"mapOverlayMap\"]//area", dom);
						for(var i=0 ; i<area.length ; i++){
							var dat = area[i].getAttribute("onmouseover");
							dat = dat.replace(/^.*rewrite/, "setStar");
							dat = dat.replace(/\); .*$/, ");");
							// eval 안에는 GM_set/getValue를 사용할 수 없으므로, 변수를 일단 밖으로 처리
							eval("dat = " + dat);
							if( !dat ) continue;

							var td = $("beyond_star_" + dat.x + "_" + dat.y);
							if( !td ) { console.log("td null err?:" + dat.x + "," + dat.y); return;};
							if( td.innerHTML) continue;
							
							csetUserStar( uid, dat.x, dat.y, dat.star.length, dat.wood, dat.stone, dat.iron, dat.rice, dat.npc );
							if( dat.npc ) {
								td.innerHTML = "★" + (dat.star.length/78);
								td.style.color = "red";
							}else{
								td.innerHTML = "★" + (dat.star.length/78) + " (" + dat.wood + "," + dat.stone + "," + dat.iron + "," + dat.rice + ")";
							}
							td.style.opacity = (dat.star.length/78) * 0.05 + 0.5;
						}
						
						if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
							$("beyond_tmp").removeChild(dom);
						}
						
						window.setTimeout(timerFunc, 0);
					
					});
				}
			});

			th.appendChild(lnk);
		}
		function setStar(name, user_name, jinko, xy, ally, star, kyori, wood, stone, iron, rice, npc)
		{
			if( uname == user_name) {
				var tmp = xy.match(/\(([\-0-9]+),([\-0-9]+)\)/);
				if( tmp ) {
					var x = tmp[1];
					var y = tmp[2];
					return {"user_name":user_name, "x":x, "y":y, "star":star, "wood":wood, "stone":stone, "iron":iron, "rice":rice, "npc":npc};
				}
			}
			return null;
		}
	}
}

//////////////////////
// 프로필 화면 레벨 표시
//////////////////////
function disp_UserLevel()
{

	if( location.pathname == "/user/" || location.pathname == "/user/index.php" ) {
		if( !URL_PARAM.user_id || USER_ID == URL_PARAM.user_id ) {
			showProfile();
		}
	}
	if( location.pathname == "/land.php" || location.pathname == "/village.php" ) {
		// 저장
		var spnxy = $x("//span[@class=\"xy\"]");
		if( !spnxy ){
			return;
		}
		var xy = spnxy.innerHTML.match(/\(([\-0-9]+),([\-0-9]+)\)/);
		if( !xy ) {
			return;
		}
		var tmp = spnxy.innerHTML.match(/레벨(\d+)/);
		if( tmp ) {
			console.log("add:" + xy[1] + "," + xy[2]);
			csetMyLevel(xy[1], xy[2], tmp[1] );
		}else {
			console.log("del:" + xy[1] + "," + xy[2]);
			cdelMyLevel(xy[1], xy[2]);
		}
	}
	
	
	function showProfile()
	{
		// 테이블 레벨란 추가
		cappendColumnForProfile("Level", "beyond_level" );
		
		// 내용 초기화 설정
		lists = cloadData( "MyLevelList", "[]", true, true );
		for( var i=0 ; i<lists.length ; i++){
			var td = $("beyond_level_" + lists[i].x + "_" + lists[i].y);
			if( td ) {
				td.innerHTML = lists[i].level;
			}
		}
		updateLevelUp();
		updateLevelUpLink();

		// 타이틀에 GET 추가
		var th = $("beyond_level_title");
		if( th ) {
			var lnk = d.createElement("a");
			lnk.href = "javascript:void(0)";
			lnk.innerHTML ="(GET)";
			lnk.style.fontSize = "9px";

			var running = false;
			$e(lnk, "click", function() {
				if( running ) return ;
				
				if( confirm("이 작업은 서버에 부하를 줍니다.\n여러 번 반복하면, DoS공격이 되므로 주의하세요.") == false ) return;
				running = true;
				window.setTimeout(timerFunc, 0);

				function timerFunc()
				{
					var tds = $a("//td[contains(@id, \"beyond_level_\")]");
					var targettd = "";
					var targetid = "";
					for( var i=0 ; i< tds.length ; i++) {
						if( tds[i].innerHTML == "" ) {
							targettd = tds[i];
							targetid = tds[i].id;
							break;
						}
					}
					if( !targetid ) {
						updateLevelUp();
						updateLevelUpLink();
						running = false;
						alert("모든 레벨 정보를 확인했습니다.");
						return;
					}

					var xy = targetid.match(/beyond_level_([\-0-9]+)_([\-0-9]+)/);
					if( !xy ) {
						console.log("err");;
						return ;
					}
					
					cajaxRequest("/land.php?x=" + xy[1] + "&y=" + xy[2], "GET", "", function(req) {
						var dom = d.createElement("html");
						dom.innerHTML = req.responseText;
						if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
							$("beyond_tmp").appendChild(dom);
						}
						var spnxy = $x("//span[@class=\"xy\"]", dom);
						if( !spnxy ){
							console.log("span class=xy err");
							return;
						}
						var xy = spnxy.innerHTML.match(/\(([\-0-9]+),([\-0-9]+)\)/);
						if( !xy ) {
							console.log("xy match err");
							return;
						}
						var level = 0;
						var tmp = spnxy.innerHTML.match(/레벨(\d+)/);
						if( tmp ) {
							level = tmp[1];
						}
						var td = $("beyond_level_" + xy[1] + "_" + xy[2]);
						if( !td ) { console.log("td null err?:" + xy[1] + "," + xy[2]); return;};
						if( !td.innerHTML ) {
							csetMyLevel(xy[1], xy[2], level)
							td.innerHTML = level;
						}
						if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
							$("beyond_tmp").removeChild(dom);
						}
						
						window.setTimeout(timerFunc, 0);
					
					});
				}
			});

			th.appendChild(lnk);
		
		}
		
		function updateLevelUp()
		{
			// 건설/파괴 리스트에서
			var lists = cloadData("RemoveList", "[]", true, true);
			for(var i=0 ; i<lists.length ; i++) {
				if( lists[i].kind != 5 ) continue;
				var td = $("beyond_level_" + lists[i].x + "_" + lists[i].y);
				if( !td ) continue;
				console.log("td:" + td.innerHTML);
				var level = parseInt(td.innerHTML);
				if( isNaN( level ) ) continue;
				td.innerHTML =  level + " (+)";
			}
		}
		function updateLevelUpLink()
		{
			var img_lvup = 'data:image/gif;base64,'+
				'R0lGODlhFQAVAJEAAIaT6////////wAAACH5BAUUAAIALAAAAAAVABUAAAJDlICpi3YM14u0WhVY'+
				'Rjn4zWlJx4HgiJrooqohm67A+c727GLpp8MhXZORRD4b8NYzQj4k5pDF2/CQl6pVclU4sgBDAQA7';
			var tds = $a("//td[contains(@id, \"beyond_level_\")]");
			for( var i=0 ; i<tds.length ; i++){
				if( "" + parseInt(tds[i].innerHTML) == tds[i].innerHTML ) {
					var lv = parseInt(tds[i].innerHTML);
					if( lv < 1 || lv > 4 ) continue;
					var mtbl = [2, 2, 2, 4];
					var meisei = mtbl[lv - 1];
					if( RES_NOW.fame >= meisei ) {
						var xy = tds[i].id.match(/beyond_level_([\-0-9]+)_([\-0-9]+)/);
						if( xy ) {
							var lnk = " <a href=\"/territory_proc.php?x=" + xy[1] + "&y=" + xy[2] +
									"&mode=lvup\" title='레벨업' onclick=\"return confirm('명성" + meisei + "만큼 사용해서  영지 레벨업을 하겠습니까?');\">" +
									"<img src='" + img_lvup + "' style='width:14px; height:14px; vertical-align:middle;'></a>";
							tds[i].innerHTML += lnk;
						}
					}
				}
			}
		}
	}
}


//////////////////////
// 동맹 보고서 앞/뒤 링크 추가
//////////////////////
/***
function disp_ReportNextPrior()
{
	if( location.pathname == "/alliance/alliance_log.php" ) {
		var elms = $a("//table[@class=\"commonTables\"]//tr/td[2]/a");
		var lists = new Array();
		for( var i=0; i<elms.length ; i++) {
			var ids = elms[i].href.match(/id=(\d+)/);
			if( ids ) {
				lists.push(ids[1]);
			}
		}
		csaveData("AllyReports", lists, true, true);
	}
	if( location.pathname == "/alliance/detail.php" ) {
		var lists = cloadData("AllyReports", "[]", true, true);
		
		var pos =lists.indexOf( URL_PARAM.id );
		if( pos != -1 ) {
			var tbl = d.createElement("table");
			tbl.width = "100%";
			var tmpHTML = "<tr>";
			if( pos < lists.length -1  ) {
				var params = "id=" + lists[pos + 1] +
							"&m=" + ( (URL_PARAM.m) ? URL_PARAM.m : ""  ) +
							"&p=" + ( (URL_PARAM.p) ? URL_PARAM.p : ""  );
				tmpHTML += "<td align=\"left\"><a href=\"/alliance/detail.php?" + params + "\">앞쪽 보고서로</a></td>"
			}
			if( pos > 0 ) {
				var params = "id=" + lists[pos - 1] +
							"&m=" + ( (URL_PARAM.m) ? URL_PARAM.m : ""  ) +
							"&p=" + ( (URL_PARAM.p) ? URL_PARAM.p : ""  );
				tmpHTML += "<td align=\"right\"><a href=\"/alliance/detail.php?" + params + "\">뒤쪽 보고서로</a></td>"
			}
			tmpHTML += "</tr>";
			tbl.innerHTML = tmpHTML;
			var ct = d.createElement("center");
			ct.appendChild(tbl);
			var inspos = $x("//table[@summary=\"제목\"]");
			if( inspos ) {
				inspos.parentNode.insertBefore(ct, inspos);
			}
		}
	}
	
}
***/
//////////////////////
// 맵 중앙표시
//////////////////////
function disp_MapCenter()
{
	if( location.pathname != "/map.php" ) return;
	var cx = parseInt(URL_PARAM.x, 10);
	var cy = parseInt(URL_PARAM.y, 10);
	if( isNaN(cx) ) cx = 0;
	if( isNaN(cy) ) cy = 0;
	if( cx > MAP_X_MAX ) cx = MAP_X_MAX;
	if( cx < MAP_X_MIN ) cx = MAP_X_MIN;
	if( cy > MAP_Y_MAX ) cy = MAP_Y_MAX;
	if( cy < MAP_Y_MIN ) cy = MAP_Y_MIN;
	var area_center = $x("//map[@id=\"mapOverlayMap\"]//area[@href=\"land.php?x=" + cx + "&y=" + cy + "\"]");
	if( !area_center ) return;

	var dat = area_center.getAttribute("onmouseover");
	dat = dat.replace(/^.*overOperation/, "setCenter");
	dat = dat.replace(/\); .*$/, ");");
	eval(dat);
	
	var dv = d.createElement("div");
	dv.style.fontSize= "10px";
	dv.appendChild(d.createTextNode("중앙:( " + cx + " , " + cy + " )"));
	// WeWillWin 에서 사용하기 위해서 저장
	csaveData( "OPT_CX", cx );
	csaveData( "OPT_CY", cy );	
	$("mapXY").appendChild(dv);
	
	function setCenter(act, x, y )
	{
		var rollover = $("rollover");
		var icon_c = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz'+
				'AAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMy8yNi8wOQlCSeUAAAAldEVYdFNv'+
				'ZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIE1YIDIwMDSHdqzPAAAEd0lEQVR4nO3by2+UVRjH'+
				'8U9LC0UUoqIBRAxCQUWRS0mUiBfEe70tdKMb48aYmPCfuDMmxoVrF97AiAFUEF1wURCNEUQTNQXR'+
				'KEpVGMq4eN6XmXlnOk7bGcCX95eckPcy532+55znck5KV7lcdiGp+1wbcLZVAOddBXDeVQDnXQVw'+
				'3lUA510FcN5VAOddBXDeVQDnXQVw3lUA510FcN51wQH31FwdeL5T35mOZbgiaXAUR7Afv3fkq/0v'+
				'1d3qafBaO7UEazEfM9CLruRZGSUcx0/YhL0dtqdjwEsxiEWYVHW/hGMC+lJMxmVJW4Jv8A72dciu'+
				'tgOvxANYqBb0NA7iQ7GEYTluxzWJHd24Lvntt3gXe9psX9uAB/AQrlUbCEcE6CbsFuCptooBWIl7'+
				'0S8GqQeLk+tDAnxnm+ycMPBqAXq1im/CKRzABnwh/LWRTguYXbgp6WuRyowvxAv4ARvxyQTtHRdw'+
				'D9bgfsxWCzqCz/G6CEStqiz8dh+uwhMiqk9K+p+H5/CwWC07RDwYl/GtajLuFFF3jlrQVF1JuxJ/'+
				'4o8x2jM9+W3aT7bvuXhWxIktwiVOjuUDrQBPxjoBOytjyHF8JWZ6rliGK5L2Jt5Q67fN1I178FjV'+
				'vbJYzodxAy5O7s/B08n7W0Q8aAm8GfBFSYd3qBQLqf4RQegtDImltw73Jc+2Cb9sFVby7kcYFtG7'+
				'D+8JoBExqI+KINcnBn4Wnkrs3Ib38Xezj3TV/FFLVFq9wj/XYmbm/WHhoyloVlNFwBqXf1WpV0xG'+
				'I+NT8GWYlnn2ixigTSi1UmlNxTO4Re3SHRYzukFj0FRNR3cMKhl90IbwsgAfFDOegs/EkyLwvSZW'+
				'W42ym4eluLXquiyW5nq8ojns2daQsGm9mIzq1LdapLk6ZYFL6v2uW+OIfL6oS+NdX8P4kV3S+/Gp'+
				'GKG0sxV4Ucz0RufPLM8WhcqAel/eLgqeOmWBT+JV/Cii7uXJ/WkiWg/gM7zt3AatR0QtngX9FZul'+
				'QauBGqWlkghOW0WaWaOSlqbhNgG+R+TaIbGk7hbRPU1Lu0XUHItmiiCUTUun1aelah1VSUt/NftA'+
				'o7SU1RQx23epVEGphsXSmS3Kv+pn4yk8Htda4ZE++1lMzGaNCo8GaakV4FRTBPRa9RVXqlNiE79d'+
				'7JKONeuwgWZggXCf5aN8g6jTPxCl5YlRe5vgiccJlSW2Riz3OZl3usWMHjZ2WMlvhsTslQVw+i+V'+
				'k5HtYnDHrPHslkpiGW0V/vygqKPT9LBKVEEH/ff2MFWXyJuDYkvYm3mebg93jMPeGk10P/xx0lYJ'+
				'Y+cL43txvdjbjnYAQAxQ9gAgVRnfiUE7bw4AUu1M2oDKEU+3AFicXB8Sm4OvBcxisQNboP446IBw'+
				'n11tsu+M2n2mtStpN4vNer8KeL84Akr3yJdkvj8iQP9Xh3ip9ibtRpFT54kipk+cVqY6gd/wvYi4'+
				'X3bInjPq9Ln0/qT1CfhZImcT0fiIOEAY7rAdZ9RV/CePnKsAzrsK4LzrggP+F1IbDJgkELkdAAAA'+
				'AElFTkSuQmCC';
		var img = d.createElement("img");
		img.src = icon_c;
		img.style.zIndex = 200;
		img.style.position = "absolute";

		img.style.left = x;
		img.style.top = y;
		if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort15 now\"]") ) {
			img.style.width = "44px";
			img.style.height = "44px";
		} else if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort20 now\"]") ) {
			img.style.width = "33px";
			img.style.height = "33px";
		} else {
			img.style.width = "60px";
			img.style.height = "60px";
		img.style.zIndex = 121;
		}
		rollover.parentNode.insertBefore(img, rollover.nextSibling);
	}
	
}

//////////////////////
// 토벌게이지 회복 시간 표시
// 완료 - 툴팁에 표시
//////////////////////
function disp_ToubatsuRestTime()
{
	if(location.pathname != "/card/deck.php") return ;

	ToubatsuRecoveryEstimates();

	function ToubatsuRecoveryEstimates()
	{
		var now = cgetNow();
		// 덱
		
		var decks = $a("//div[@id=\"cardListDeck\"]//div[@class=\"control\"]");
		for( var i=0; i<decks.length ; i++ ){
			var stat = $x("descendant::dl/dd[3]", decks[i]);
			if( !stat ) continue;
			if( stat.textContent == "내정세트완료" )  continue;
			
			var tb = $x("descendant::dl/dd[1]/div[1]", decks[i]);
			if( !tb ) continue;
			tb = 500 - parseInt( tb.textContent, 10 );
			
			if( tb != 0 ) {
				var timeText = getTime( tb );
				var dayText = caddDate(now, timeText);
				var txt = "500까지 : " + timeText + "후 (" + dayText + "완료)";
				$x("descendant::dl/dt[1]", decks[i]).title = txt;
				$x("descendant::dl/dd[1]", decks[i]).title = txt;
			}
			
		}
		// 파일(카드표시)
		var files = $a("//div[@id=\"cardFileList\"]//div[@class=\"control\"]");
		for( var i=0; i<files.length ; i++ ){
			var tb = $x("descendant::dl/dd[1]/div[1]", files[i]);
			if( !tb ) continue;
			tb = 300 - parseInt( tb.textContent, 10 );
			
			if( tb != 0 ) {
				var timeText = getTime( tb );
				var dayText = caddDate(now, timeText);
				var txt = "300까지 :" + timeText + "후 (" + dayText + "완료)";
				$x("descendant::dl/dt[1]", files[i]).title = txt;
				$x("descendant::dl/dd[1]", files[i]).title = txt;
			}
			
		}
		// 파일(x매 표시)
		var files = $a("//table[@class=\"statusParameter1\"]//tr[7]");
		for( var i=0; i<files.length ; i++ ){

			var tb = $x("descendant::td[1]", files[i]);
			if( !tb ) continue;
			tb = 300 - parseInt( tb.textContent, 10 );
			
			if( tb != 0 ) {
				var timeText = getTime( tb );
				var dayText = caddDate(now, timeText);
				var txt = "300까지 : " + timeText + "후 (" + dayText + "완료)";
				
				$x("descendant::th[1]", files[i]).title = txt;
				$x("descendant::td[1]", files[i]).title = txt;
			}
			
		}
		
		window.setTimeout(function() { ToubatsuRecoveryEstimates() }, 60*1000);
	}

	function getTime(toubatsu)
	{
		var tmp = toubatsu * 216;
		var h = Math.floor(tmp / 3600);
		var m = Math.floor((tmp - h*3600 ) / 60 );
		var s = Math.floor(tmp - h*3600 - m*60 );
		var tim = h + ":" +
				  (m+100).toString().substr(-2)  + ":" +
				  (s+100).toString().substr(-2);
		return tim;
	}
}

//////////////////////
//書簡/報告書削除機能
//////////////////////
function disp_DeleteMessages()
{
	if( location.pathname == "/message/detail.php" ) {
		//書簡削除ボタン
		addDeleteMessageButton()
	}
	if( location.pathname == "/report/detail.php" ) {
		//報告書削除ボタン
		addDeleteReportButton();
	}
	
	function addDeleteMessageButton()
	{
		var frm = d.createElement("form");
		frm.method = "post";
		frm.action = "/message/delete.php";
		var m = d.createElement("input");
		m.type = "hidden";
		m.name = "mode";
		m.value = URL_PARAM.m;
		var p = d.createElement("input");
		p.type = "hidden";
		p.name = "p";
		p.value = URL_PARAM.p;
		var c = d.createElement("input");
		c.type = "hidden";
		c.name = "chk[]";
		c.value = URL_PARAM.id;
		
		var btn = d.createElement("input");
		btn.type = "submit";
		btn.value = "삭제";
		btn.setAttribute("onClick", "return window.confirm('이 메세지를 삭제하겠습니까?');" );
		frm.appendChild(m);
		frm.appendChild(p);
		frm.appendChild(c);
		frm.appendChild(btn);
		
		var li = d.createElement("li");
		li.className = "last";
		li.appendChild(frm);
		var menu = $x("//ul[@id=\"statMenu\"]");
		menu.appendChild(li);
	}
	function addDeleteReportButton()
	{
		var frm = d.createElement("form");
		frm.method = "post";
		frm.action = "/report/list.php";
		var m = d.createElement("input");
		m.type = "hidden";
		m.name = "m";
		m.value = URL_PARAM.m;
		var p = d.createElement("input");
		p.type = "hidden";
		p.name = "p";
		p.value = URL_PARAM.p;
		var u = d.createElement("input");
		u.type = "hidden";
		u.name = "u";
		u.value = URL_PARAM.u;
		var c = d.createElement("input");
		c.type = "hidden";
		c.name = "chk[]";
		c.value = URL_PARAM.id;
		
		var btn = d.createElement("input");
		btn.type = "submit";
		btn.name = "remove_checked";
		btn.value = "삭제";
		btn.setAttribute("onClick", "return window.confirm('이 메세지를 삭제하겠습니까?');" );
		frm.appendChild(m);
		frm.appendChild(p);
		frm.appendChild(c);
		frm.appendChild(u);
		frm.appendChild(btn);
		console.log("a");
		var h2 = $x("//h2");
		h2.parentNode.insertBefore(frm, h2.nextSibling);
	}
	
}

//////////////////////
//出?時刻計算
//////////////////////
function disp_TSendTime()
{
	if( location.pathname != "/facility/castle_send_troop.php" ) return;
	

	var td = $x("//table[@class=\"fighting_about\"]//tr[1]/td[1]");
	if( !td ) return ;

	var tim = td.textContent.match(/도착까지：　(\d+):(\d+):(\d+)　도착시간/);
	if( !tim ) return;
	
	var area_up_timer = $("area_up_timer0");
	if( !area_up_timer ) return;
	var day = area_up_timer.textContent.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
	if( !day ) return;

	//ベ?ス作成
	var div = d.createElement("div");
	div.style.margin = "5px";
	div.appendChild(d.createTextNode("도착시간："));
	createText(div, "beyond_send_y", day[1]);
	div.appendChild(d.createTextNode("-"));
	createText(div, "beyond_send_m", day[2]);
	div.appendChild(d.createTextNode("-"));
	createText(div, "beyond_send_d", day[3]);
	div.appendChild(d.createTextNode("　"));
	createText(div, "beyond_send_h", "");
	div.appendChild(d.createTextNode(":"));
	createText(div, "beyond_send_mi", "");
	div.appendChild(d.createTextNode(":"));
	createText(div, "beyond_send_s", "");
	div.appendChild(d.createTextNode("　"));
	var btn = d.createElement("input");
	btn.type = "button";
	btn.id = "beyond_send_button";
	btn.value = "출발시간계산";
	div.appendChild(btn);
	
	div.appendChild(d.createElement("br"));
	div.appendChild(d.createTextNode("출발시간："));
	
	var spn = d.createElement("span");
	spn.id = "beyond_send_time";
	div.appendChild(spn);
	
	td.appendChild(div);
	
	$e(btn, "click", function() {
		if( $("beyond_send_y").value == "" ) $("beyond_send_y").value = "0";
		if( $("beyond_send_m").value == "" ) $("beyond_send_m").value = "0";
		if( $("beyond_send_d").value == "" ) $("beyond_send_d").value = "0";
		if( $("beyond_send_h").value == "" ) $("beyond_send_h").value = "0";
		if( $("beyond_send_mi").value == "" ) $("beyond_send_mi").value = "0";
		if( $("beyond_send_s").value == "" ) $("beyond_send_s").value = "0";
		var y = $("beyond_send_y").value;
		var m = $("beyond_send_m").value;
		var d = $("beyond_send_d").value;
		var h = $("beyond_send_h").value;
		var mi =$("beyond_send_mi").value;
		var s = $("beyond_send_s").value;
//		if( !y || !m || !d || !h || !mi || !s ) {
//			alert("모두 입력해 주세요.");
//			return;
//		}
		y = parseInt(y, 10);
		m = parseInt(m, 10);
		d = parseInt(d, 10);
		h = parseInt(h, 10);
		mi =parseInt(mi, 10);
		s = parseInt(s, 10);
		if( isNaN(y) || isNaN(m) || isNaN(d) || isNaN(h) || isNaN(mi) || isNaN(s) ) {
			alert("숫자로 입력해 주세요.");
			return;
		}
		
		

		var dt = new Date(y, m - 1, d, h - parseInt(tim[1],10) , mi - parseInt(tim[2],10), s - parseInt(tim[3],10) );
		
		$("beyond_send_time").innerHTML = 
			dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate() + " " +
			(dt.getHours()+100).toString().substr(-2)  + ":" +
			(dt.getMinutes()+100).toString().substr(-2)  + ":" +
			(dt.getSeconds()+100).toString().substr(-2);
		
		


	} );
	
	function createText(container, id, def)
	{
		var tb = d.createElement("input");
		tb.type = "text";
		tb.value = def;
		tb.id = id;
		tb.size = 3;
		container.appendChild(tb);
	}
	
}
//////////////////////
// 작은버튼 처리 CP 등
//////////////////////
function disp_SmallButton()
{
	var btn_1 = 'data:image/gif;base64,'+
		'R0lGODlhIAAWAOYAAAAAALmjANYAAKQAANanp2YAAJt9ANuPAO//AJt1AIw/IcafTf//md0jI///'+
		'T9VkZNHWKvP2N85aWq0kHLJ/Ovbvo8e8FP8AAGQgDv///zMAAP88OZd5AKlwR/z/KNaFhb0AAP//'+
		'4e/DuW8QCdCxgtvHANZaWqeLAP8YGNG5AJlmM9m/UPcAAP8UFP//bb4vK/T09K+NAO3wF4QAAOLP'+
		'QP9mZrOAWrUAAP+ZmbOIIuYAAP8sK//X13c4F/t9fc+vWsFKSqVVAPz/EMwAAPojGONXABkAAFkA'+
		'AMVVIu7iKuLUEMO1CnkfFc4bG7UPD///tcuNALyPLP//Zr0QENm/XpZQIuyTk/+srP/lyerfQ6OH'+
		'AMwzM9W/AOZqav//ANm/ceUoKHkfAP//e/+1m7mnD+mqhr1XAKoKCv8zM8xmZuOgoOvfAP9HR/+K'+
		'iu8AANWrAMU+Ks+vaf93Y4MwGcUAAN4AAP//Q699BLOASq+VAOWFhe7xK/8fH/9CQv//M////yH5'+
		'BAUUAH8ALAAAAAAgABYAAAf/gACCg4SFhoeGMxeLjI2Oj44zg4p9lZVocgx2m5ybXkV8bJaWF5IA'+
		'FzupqmMhIWKdnikpB0RoqqoXghctvC0bWK2tr5xesrJvRHwobb25p41SwSEMfkLWMjJKXNspWmhX'+
		'GTg6i7qNXtEhTzQ0dn7um0klJScnPBkZMATkz4xeXmIk5hQoMGKBGAUDR/Q4kedEDXBW6Oxz5G8N'+
		'kxF4OowoEKcAEwVMChwJEKMGHx86bkw05yVMgR8uXCyo8qWAjScVChgJkMckizpbVvbzoqGAC05S'+
		'qBRQYKODSJI+60iYyKIqC39GCkjx48GPA6UDl8ZoGFUCC2cX3Kh142/gDwcO0bJU+VFABZUsEfLE'+
		'ONGFj5s6Tdyg1UFYh787BH+smDOCLgUHHizQ4wtGRx0643QJ2CzAC4ISGMIWWLCiQJQ9S05w0MK3'+
		'weYhAtAOma0HQQouJe5UiZJlUw4IZAxwGG6gS4PZs9HSoaMmQ5k3t7flmT5di/DhCZCYaLJ8OVoQ'+
		'Iu5lEAFF1uTz1xPAebBlCoj3INDeuNFcjZMJZlifn2wgyAsJLzgx34DOKDLAAB8ceMYEQKTh4IMQ'+
		'AjHBGQdWWMokkLTAx4YcdtgCJKYgIuKIhQQCADs=';
	var btn_2 = 'data:image/gif;base64,'+
		'R0lGODlhIAAWAOYAAAAAAPG7FKuGFuDczntZAM6/kV0/AJ+PYJ+ER8yZAP///+a9QY1jAM+qOsyz'+
		'eKuLK4tpG9XPvrejYvDv696sEraRIayKR6VvAO3IWL2EANbGqPfFKc+kJr2gRY54R7OokeTh2oxc'+
		'AL2zkq6UWoVnC/XPWnVPAO6zA5x8HaiKR56HQa6bYbSlhdvRvtmyPa6ZW9OhCdXJsq+KF5J0G/PH'+
		'RK95AMa1kca9qHpdG6yceLKXRMCZI97Xw5lmAOfk3L2meKWOWsa8nbORR5NwBrihW+a3KpmEWffW'+
		'Wp1yG3FNAPG+IPXy7LKNIebdxN+2P721paeUatbWvdrOs/bGNMaKAO3n24RaAKV+B6eUW8q3kcOo'+
		'atiqHKaEH8ejOM69nMWdJODVvqt0ANOTALGSNK6VS8y2hbOfZJqKW/zVXbaaWue0GvnMRsGnV7yW'+
		'I6F1G87BqJl3DbKaULqqhbWtkvG8G+vBQpRrGe+2CrSLD5d4HHlSAPHMWff07davPNuzPf///yH5'+
		'BAUUAH8ALAAAAAAgABYAAAf/gACCg4SFhoeGBFOLjI2Oj44Eg4polXsYmJmZJUedJZ+dR58lU5IA'+
		'U2trNAsuDa5dsF0NfU61frdOC3V1tU5rU4JTGxtFHExcKCh5MzN5XEw7X21MTBU7HNg72hvAp0pK'+
		'WxVNbzzl5jxNHQIoKmYFbDICAjpNOkrdU3RqXw8KQSIAffgA6OUBHwUIFZQhomCEGQVm6OALQAGP'+
		'AwUHgrRoMWFChAhe4MRZMaAFiSESFKxYoTIAvjswrkhRcEZBhDkC57RQMIQMlgEDsJBh+OKFghd3'+
		'8J1IMAZhTR8ROkbwoQBFQoRL0hw1iuUEPjEZZiowYvMDCBA6FTCwkkMBCBx60UYoAAKEppivGRzM'+
		'fBp1QosqCnpAoKpgAAS5WLDYxUclwwW5QKAMMAvCRgEtPTQomOBjyQDEdeVQwZfBsdwzHhQ8mRBE'+
		'T4gQQvxtTFFGSBUENaFkwFcjTA+5RgzcQMgiSRICSMpY2cigRw8rSWoCqYHvwoXfCuS8WaKAe5UW'+
		'NpA4BwPGuRsvNmI0vIDPeQ8LCjQskTLCyg8NgC04z5LFORIN5GURQg/tOffagQgmqGCC+Czo4IMI'+
		'dqOIHhRWaOGFGF5YyiSQdOjhIqYgIuKIhQQCADs=';
	var btn_3 = 'data:image/gif;base64,'+
		'R0lGODlhIAAWAOYAAAAAAACy1wd+k62/kQBshGl5Wn22wcbWoylDM0VbQ1h5YF/d77Xe5Sjc/ACM'+
		'rTxaRo6eeFu0xD63y1Gfn////xiBlACfwynT8ABzjElnUSWds36VcpzEzpqleq/Q1hRXXU7m/yeA'+
		'fyqyyc3g5L7OnUbP5nWstaW1igCnzEWlqy1RQ5OrglhzWXi+zgvT9geFm3OMa9zt8cDIlFeLfhJs'+
		'eIeadCTa+g2ctjzg/ldpTk53aRDC4jOCgDqYowiSqy5JOTltYpzU3i9WSCGRmGXs/1qltpqsgwVo'+
		'eoGPahticpXFzimuxVJwVgidt0PG20RcSMTg5QCUtQCEpLbElGKDaSK71nWGZDOGmQB9mwCrz0vd'+
		'9VqMlw6mwu7y8hmKnr/Y3hxyd6KrfThRP9DZpCuntEeovYrFz2V5XDXf/TTc+SOUqDDM5zFKQnGR'+
		'cgCu1kJgS09nTytWTQC13ACJprDFlbvl7GV1VzR9eknX7oyjfWLl9x6kvAijvgBwhwB0kf///yH5'+
		'BAUUAH8ALAAAAAAgABYAAAf/gACCg4SFhoeGBDiLjI2Oj44Eg4pElZVbYk86OjMTExGWoZV6C0Q4'+
		'kgA4IKusYmNjMicnEBssKawgWnh4JU4SEiA4gjhoxcYZNSdjZ0xMJzV3xWlrVSJLGmpeZhLCqQ3f'+
		'F2RADzAPJAckMBsbb29kF1V7Xl4VJl8eDN04NlU8bFQr8hiBUePAARi0ZCkQ0qMOlIcjKHAIou9O'+
		'BoFWFMB4cyKDQRgrmBh5k2xDFwooUUK5oY+NwRMrzlHJk4GOwQPO6FBhMkXFjh1cXlBYqS/EipsG'+
		'jVDZAOMmE4NM2wxx4YJPGQpBuOjzwYSE168sBpjz+oMEnbAqssiRg0UJhbX64gIImfK1LgsjXtmQ'+
		'GLChBhg3blBc6RIjQAB9WcDUqPu1xhkSU+B8FdLEQpQ5EVugQKHPgo8HHQrIGD16CgIZHeCMrpHE'+
		'ggMsBCh4cGDBgr4oUYScSDCF9GgWCRJYGf1AwGsDHJTMwR1FnwMHNM7YQUJ99IkcBTqM7hDnORaU'+
		'Up4/1ydFioAfHRIUCIMEzo8fT7TLeNKnPJYiRcrr14elf5wOYdiBQBw09HeECsKp0N+CDPanjx8Q'+
		'HoEAG0lgAOGFfhzxwREYdghhN4oQIOKIJJZoYomnTALJiiwuggoiMMZYSCAAOw==';
	var btn_4 = 'data:image/gif;base64,'+
		'R0lGODlhIAAWAOYAAAAAANA/AJkzANCbhXwpAZtzP9qcXVEvDPHt66VRKOx4P31YKrGJUeW2cfy5'+
		'gt5tNmhCGfqkbLY3AN7Nxe2NXsxmM9bGvp95RIwqAIVjNsVxRK5PIcWbXnhJIP////3No50/ENKl'+
		'ZN96Sa1mP7uAWdZSGe/FgKUxAIJHKb+CZG05EfusdFw4E+yBTbFlPK5JFutrLI04DplmM9WKaq2F'+
		'Tv7m0NdiKN6va2tJILVoR45PIex0Oeu4caFmQeqgbZtcPb2UWK1dNr05AGJCHMCResiiZ+KulN5h'+
		'JOteGN+IVY5oN8RSGa0yAHVQJdecfsVhMP+ZZtZBALVZLFk1EXs6GIpLLOPJvqV/Sn5YMfWPVpNE'+
		'HqNhOubLv7tLE/7u34tjMuWYZcOPV751SutiHqRbNv29hmY6EZM7D8Y7AOttMJkzAPywebWUUoVS'+
		'KuCVcLWEStalY69qQnVNIuR8SqRVM4ZMIsSEar5fMMRqPOTOw+i7doQoAIwwBKduQ/bw7f///yH5'+
		'BAUUAH8ALAAAAAAgABYAAAf/gACCg4SFhoeGBAqLjI2Oj44Eg4oUlZU/Q0NYWEo9PWKWoaIKkgAK'+
		'LaipLCYmDUVFDFdYQampcyK4cy0Kggo7v8ByNCF/GZscNHUPZCgoZA8VT1J3FTu8pmnZaVIdQwVD'+
		'DX96F1dXbVU5PmAjNlIJWlobadcKMDY6LEpADEAFNH9/LsTaEqfMhzIrbDjJk2cCERj06sgBwkFJ'+
		'hgI4QjQBWADIAhQ+Pnj4sOaIEQ8o/UDsNQVgCCDh9DW5AfDPRzAGEZZY8gLEBA9j6GkBUhNgRRoF'+
		'ai7YMmLFmhVQSnQBccaCByT0JLThwbXrghAQuh4wUGVEkiRkAjhBiTIKvShm2m50nbsgDFcWPMTQ'+
		'aZYgwAwuXBB4cNsrQIw3c7u++cLjxsweKUjEcYFGwokTVgPQqwwBiJIGoEHfONAASJMwJLzUQCjk'+
		'BIY9VtHQEyLEDNgboUFjgYCjQB83Hz44WMEkhxUrgoVklcBHyZdyV0CHWKDvxo8VDoZDYWKH7QAJ'+
		'9JiIZwEEhxJkTaZMwUFxBJQI8LOIv3yZCT36Kih+OaCCz2U+ZnRAhwYEaoAHfQjSI8CCfBzAAgEL'+
		'RrhgDFTEcMaFZ0gY4TWKaOjhhyCSMgkkJJa4SCmIpKhiIYEAADs=';

	var srcbtns = $x("//div[@id=\"sidebar\"]/ul");

	//  일본 서버에서 CP충전, 카드 뽑기 등의 버튼을 작게하는 기능
	//  한국 서버에서는 정상적으로 구현하기가 어려운지라, 아예 원래 버튼을 사용하도록 유도
	//  대신, 서버간 이동을 돕는 버튼을 추가
	srcbtns.style.display = "none";	//원래 버튼을 보이지 않게 가림
	var text = '<a href="https://nxpay.nexon.com/NEXONCASHCHANGE/NxCashPage/PayRequest.aspx" target="_blank"><img src="' + btn_1 + '" alt="CP 구입" title="CP를 구입합니다." /></a>' +
			'<a href="/cp/item_list.php"><img src="' + btn_2 + '" alt="아이템 구입" title="아이템을 구입합니다." /></a>' +
			'<a href="/busyodas/busyodas.php"><img src="' + btn_3 + '" alt="장수 카드 뽑기" title="장수 카드를 뽑습니다." /></a>';
	if( !OPT_SMALLBTN_NY ) {
		text += '<a href="/busyodas/b3kuji.php"><img src="' + btn_4 + '" alt="가챠폰 뽑기" title="가챠폰을 뽑습니다." /></a>';
	}
	// 서버간 이동 지원 버튼 (같은 계정으로 만든 다른 서버 본거지로 이동)
	text += '<br><font color="white" size="2">서버: <a href="http://sdsam-w1.nexon.com/village.php">1</a>&nbsp' +
											'<a href="http://sdsam-w2.nexon.com/village.php">2</a>&nbsp' +
											'<a href="http://sdsam-w3.nexon.com/village.php">3</a>&nbsp' +
											'<a href="http://sdsam-w4.nexon.com/village.php">4</a>&nbsp' +
											'<a href="http://sdsam-w5.nexon.com/village.php">5</a>&nbsp' +
											'<a href="http://sdsam-w6.nexon.com/village.php">6</a>&nbsp' +
											'<a href="http://sdsam-w7.nexon.com/village.php">7</a>&nbsp' +
                    	'<br><font color="yellow"><center><b><a href="http://freel1210.mireene.com/" target="_blank">시뮬레이터</a></b></center></font><br>';
	var spn = d.createElement("span");
	spn.id = "beyond_sidebar_smallbutton";
	spn.innerHTML = text;
	
	srcbtns.parentNode.insertBefore(spn, srcbtns.nextSibling);
	
	// 서버간 이동 지원 버튼 (같은 계정으로 만든 다른 서버 본거지로 이동)

	//상황 축소
	var tr1 = $x("//table[@class=\"situationTable\"]//tr[1]");
	var tr2 = $x("//table[@class=\"situationTable\"]//tr[2]");
	if( tr1 && tr2 ) {
		var td2 = $a("descendant::td", tr2);
		for( var i=0; i< td2.length ; i++) {
			tr1.appendChild(td2[i]);
		}
		var imgs = $a("descendant::td/a/img", tr1);
		for( var i=0; i< imgs.length ; i++) {
			imgs[i].style.width = "20px";
			imgs[i].style.height = "20px";
			if( !imgs[i].src.match(/(_no\.gif|sit_blank\.gif)/) ) {
				Pika_elementQueue.push(imgs[i]);
			}
		}
	}
	// 거점 및 생산창 최소/최대화
	var icon_gif = [ "/common/sidebar/icon_base.gif", "/common/sidebar/icon_production.gif"];
	for( var i=0; i<icon_gif.length ; i++ ) {
		var base_img = null;
		var base_inner = null;
		base_img = $x("//div[@class=\"sideBox\"]/div[@class=\"sideBoxHead\"]//img[contains(@src, \"" + icon_gif[i] + "\")]");
		if( !base_img ) continue;
		base_inner = $x("descendant::div[contains(@class, \"sideBoxInner\")]", base_img.parentNode.parentNode.parentNode.parentNode);
		if( !base_inner ) continue;
		var oc = cloadData( "sidebox_oc" + i , "", true);
		if( oc ) {
			base_inner.style.display = "none";
			base_img.style.opacity = 0.3;
		}
		(function(inner, no) {
			$e(base_img, "click", function() {
				var ocs = "";
				if( inner.style.display == "none" ){
					inner.style.display = "";
					this.style.opacity = 1;
				}else{
					inner.style.display = "none";
					this.style.opacity = 0.3;
					ocs = "1";
				}
				csaveData( "sidebox_oc" + no , ocs, true);
			});
		})(base_inner, i);
	}
	
}

//////////////////////
// 출병 맵 표시
//////////////////////
function disp_AttackMap()
{
	var img_atk = 'data:image/gif;base64,'+
			'R0lGODlhPAA8AIAAAP/M/////yH5BAUUAAEALAAAAAA8ADwAAAJ7jI+py+0Po5y02ouz3rz7D4bi'+
			'SJbmiabqyrbuC8fyTNf2jef6zvc8AATsgsEckYg7Fm9KoPE4XCakMCeDqmpCoSxt0yBsWQNj6bgb'+
			'dmJl6jUN+RSe3+V59ayMYZdwevjQd/c3ZbfiRlaYlXiYcsglFugjOUlZaXmJWVEAADs=';
	var img_mov = 'data:image/gif;base64,'+
			'R0lGODlhPAA8AIAAADP//////yH5BAUUAAEALAAAAAA8ADwAAAJ7jI+py+0Po5y02ouz3rz7D4bi'+
			'SJbmiabqyrbuC8fyTNf2jef6zvc8AATsgsEckYg7Fm9KoPE4XCakMCeDqmpCoSxt0yBsWQNj6bgb'+
			'dmJl6jUN+RSe3+V59ayMYZdwevjQd/c3ZbfiRlaYlXiYcsglFugjOUlZaXmJWVEAADs=';	
	if( location.pathname == "/facility/unit_status.php" ) {
		var tds = $a("//table[@summary=\"출격중인 병사\" or @summary=\"이동중인 병사\"]/tbody/tr[position()>1]/td[1]");

		for(var i=0; i<tds.length ; i+=3) {
			//0：장소　1：시간　２：병종
			console.log(tds[i+0].textContent);
			var xy = tds[i+0].innerHTML.match(/（(-?\d+),(-?\d+)）$/);
			if( !xy ) continue;
			var tim = tds[i+1].innerHTML.match(/(\d+\-\d+\-\d+ \d+:\d+:\d+)/);
			if( !tim ) continue;
			var kind = 0;
			if( tds[i].parentNode.parentNode.parentNode.getAttribute("summary") == "출격중인 병사" )
				kind = 1;
			addList(tim[1], parseInt(xy[1]), parseInt(xy[2]), kind );
			
			var a = $x("descendant::div/a[contains(text(), \"취소\")]", tds[i+1]);
			if( a ) {
				(function(tim, x, y) {
					$e(a, "click", function(){
						var lists = cloadData("AttackList", "[]", true, true);
						for(var i=0 ; i<lists.length ; i++) {
							if( lists[i].x == x && lists[i].y == y && lists[i].time == tim ) {
								lists.splice(i,1);
								csaveData( "AttackList", lists, true, true );
								console.log("deleted");
								break;
							}
						}
					} );
				})(tim[1], parseInt(xy[1]), parseInt(xy[2]));
			}
		}
	}
	
	var lists = cloadData("AttackList", "[]", true, true);

	lists = checkList(lists);		// 시간이 지난 것은 삭제

	if( location.pathname == "/map.php" ) {
		// 지도에 표시
		var type = 1;
		if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort15 now\"]") ) type=2;
		else if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort20 now\"]") ) type=3;
		
		if( lists.length ) {
			var cx = parseInt(URL_PARAM.x,10);
			var cy = parseInt(URL_PARAM.y,10);
			if( cx > MAP_X_MAX ) cx = MAP_X_MAX;
			if( cx < MAP_X_MIN ) cx = MAP_X_MIN;
			if( cy > MAP_Y_MAX ) cy = MAP_Y_MAX;
			if( cy < MAP_Y_MIN ) cy = MAP_Y_MIN;

			var map = $x("//div[@id=\"mapsAll\"]");
			for(var i=0 ; i<lists.length ; i++) {
				var no = cgetMapNofromXY(lists[i].x, lists[i].y, cx, cy, type );
				if( !no ) continue;
				var img = document.createElement("img");
				img.className = "mapAll" + no;
				if( lists[i].kind == 1 ) {
					img.src = img_mov;
				}else{
					img.src = img_atk;
				}
				img.title = lists[i].time;
//				img.style.zIndex = 1000;
				
				map.appendChild(img);
				
				var area = $x("//map[@id=\"mapOverlayMap\"]/area[contains(@href, \"?x=" + lists[i].x + "&y=" + lists[i].y + "\")]");
				if( area ){
					area.title += "　도착예정:" + lists[i].time;
					area.alt += "　도착예정:" + lists[i].time;
				}

			}
		}
	}
	
	
	function addList(tim, x, y, kind) 
	{
		var lists = cloadData("AttackList", "[]", true, true);
		
		var i;
		for(i=0 ; i<lists.length ; i++) {
			if(lists[i].x == x && lists[i].y == y ) {
				if( lists[i].time < tim ) {
					lists[i].time = tim;
					lists[i].kind = kind;
					break;
				}else{
					return;
				}
			}
		}
		if( i == lists.length ) {
			lists.push({"x":x, "y":y, "time":tim, "kind":kind } );
		}
		csaveData( "AttackList", lists, true, true );
	}

	function checkList(lists)
	{
		var dt = new Date();
		var ntime = dt.getFullYear() + "-" +
					(dt.getMonth()+101).toString().substr(-2) + "-" +
					(dt.getDate()+100).toString().substr(-2) + " " +
					(dt.getHours()+100).toString().substr(-2)  + ":" +
					(dt.getMinutes()+100).toString().substr(-2)  + ":" +
					(dt.getSeconds()+100).toString().substr(-2);
		var deleted = false;
		for(var i=0 ; i<lists.length ; i++) {
			if( lists[i].time < ntime ) {
				lists.splice(i,1);
				i--;
				deleted = true;
			}
		}
		if( deleted ) {
			if( lists.length ) {
				csaveData( "AttackList", lists, true, true );
			} else {
				cdelData("AttackList", true );
			}
		}
		return lists;
	}
}

//////////////////////
// 같은 카드 합성 버튼
//////////////////////
function disp_CardCombine()
{
	if( location.pathname != "/union/result_lv.php" &&
		location.pathname != "/union/result_learn.php" &&
		location.pathname != "/union/result_remove.php") {
		return;
	}
	
	var ins = $a("//div[@class=\"back\"]")[1];
	var skill2 = $x("//div[@class=\"skill2\"]");
	var skill3 = $x("//div[@class=\"skill3\"]");
	
	var div1 = d.createElement("div");
	div1.className = "cardColmn";
	div1.align = "center";
	var div2 = d.createElement("div");
	div2.className = "control";
	div1.appendChild(div2);
	
	var a = d.createElement("a");
	a.href = "lvup.php?cid=" + URL_PARAM.cid;
	a.title = "스킬 Lv를 상승";
	a.className = "skillLvUp";
	a.appendChild(d.createTextNode("스킬 Lv를 상승"));
	div2.appendChild(a);
	
	if( !skill3 ) {
		a = d.createElement("a");
		a.href = "learn.php?cid=" + URL_PARAM.cid;
		a.title = "새로운 스킬을 습득";
		a.className = "skillLearn";
		a.appendChild(d.createTextNode("새로운 스킬을 습득"));
		div2.appendChild(a);
	}
	if( skill2 ) {
		a = d.createElement("a");
		a.href = "remove.php?cid=" + URL_PARAM.cid;
		a.title = "스킬을 제거";
		a.className = "skillDelete";
		a.appendChild(d.createTextNode("스킬을 제거"));
		div2.appendChild(a);
	}
	
	ins.parentNode.insertBefore(div1, ins.nextSibling);
}

//////////////////////
// 가챠폰 표시
//////////////////////
function disp_PikaYorozu()
{
	if( location.pathname == "/busyodas/b3kuji.php" ) {
		Pika_updateYorozudasState();
	}
	if( location.pathname == "/busyodas/b3kuji_result.php") {
		Pika_updateYorozudasState2();
	}

    Pika_displayYorozudasState();
}

//////////////////////
// HP 회복시간 표시
//////////////////////
function disp_PikaHPRestTime()
{
	if(location.pathname != "/card/deck.php") return ;
	
	Pika_displayRecoveryEstimates();

}

//////////////////////
// 거점 생산량 표시
//////////////////////
function disp_SuzanSeisan()
{
	var icon = IMG_DIR  + "common/sidebar/icon_production.gif";
	var elms = ccreateSideBox("beyond_sidebox_suzanseisan", icon, "거점생산");

	if(location.pathname == "/village.php") {
		Suzan_Seisan(elms.sideBoxInner);
	}

}


/////////////////////////////////////////////////////////////////////////////
// common functions
/////////////////////////////////////////////////////////////////////////////
function cgetCurrentBaseName()
{
	var onlis = $a("//li[@class=\"on\"]", d);
	for(var i=0 ; i<onlis.length ; i++) {
		var sp = $a("descendant::span", onlis[i]);
		for(var j=0 ; j<sp.length ; j++) {
			return sp[j].innerHTML;
		}
	}
}

function cgetCurrentBaseXY()
{
	var onlis = $a("//li[@class=\"on\"]", d);
	for(var i=0 ; i<onlis.length ; i++) {
		var sp = $a("descendant::span", onlis[i]);
		for(var j=0 ; j<sp.length ; j++) {
			var xy = sp[j].title.match(/^.*\(([\-0-9]+)\,([\-0-9]+)+\)$/);
			if( xy ) {
				return {'x':parseInt(xy[1], 10), 'y':parseInt(xy[2], 10)};
			}
		}
	}
}

function cgetDistanceFromBase(x, y)
{
	if( BASE_X == -9999 ) {
		var xy = cgetCurrentBaseXY();
		if( xy ) {
			BASE_X = xy.x;
			BASE_Y = xy.y;
		}
	}
	if( BASE_X != -9999 ) {
		var a = parseInt(x, 10);
		var b = parseInt(y, 10);
		return Math.sqrt(Math.pow(BASE_X - a, 2) + Math.pow(BASE_Y - b, 2));
	}
	return -1;
}

function cupdateCurrentResources()
{
	RES_NOW["wood"] = parseInt( $("wood").innerHTML, 10 );
	RES_NOW["stone"] = parseInt( $("stone").innerHTML, 10 );
	RES_NOW["iron"] = parseInt( $("iron").innerHTML, 10 );
	RES_NOW["rice"] = parseInt( $("rice").innerHTML, 10 );
}

function cgetNow()
{
	var now = new Date();
	var st = $("server_time_disp");
	if( st ) {
		var nt = st.innerHTML.match(/^(\d+):(\d+):(\d+)$/);
		if( nt ) {
			now.setHours(parseInt(nt[1], 10));
			now.setMinutes(parseInt(nt[2], 10));
			now.setSeconds(parseInt(nt[3], 10));
		}
	}
	return now;
}

function caddDate(baseDate, timetxt)
{
	var tim = timetxt.match(/^(\d+):(\d+):(\d+)/);
	if( !tim ) return "";

	var dt = new Date(baseDate.getFullYear(),
					  baseDate.getMonth(),
					  baseDate.getDate(),
					  baseDate.getHours() + parseInt(tim[1],10),
					  baseDate.getMinutes() + parseInt(tim[2],10),
					  baseDate.getSeconds() + parseInt(tim[3],10) );

	return dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate() + " " +
			(dt.getHours()+100).toString().substr(-2)  + ":" +
			(dt.getMinutes()+100).toString().substr(-2)  + ":" +
			(dt.getSeconds()+100).toString().substr(-2);
}

function cencodeParams()
{
	var obj = new Object();
	var qrs = location.search.split("?");
	if (qrs.length >= 2) {
		var querys = qrs[1].split("&");
		for(var i=0 ; i<querys.length ; i++) {
			var key_val = querys[i].split("=");
			if( key_val.length == 2 ) {
				obj[key_val[0]] = decodeURIComponent(key_val[1]);
			}
		}
	}
	return obj;
}

// 상태보존용 쿠키
function csetCookie(key, data)
{
	sday = new Date();
	sday.setTime(sday.getTime() + (120 * 1000 * 60 * 60 * 24));
	d.cookie = key + "=" + escape(data) + ";expires=" + sday.toGMTString() + "; path=/";
}

function cgetCookie(key)
{
	var data = "";
	var start = d.cookie.indexOf(key + "=");
	if (start != -1){
		var end = d.cookie.indexOf(";", start);
		data = unescape(d.cookie.substring(start + key.length + 1, end));
	}
	return data;
}
function cdelCookie(key)
{
	d.cookie = key + "=;expires=Thu,01-Jan-70 00:00:01 GMT; path=/";
}

function csetUserXY(aid, uid, x, y)
{
	var allylists = cloadData( "allyXYAllyList", "[]", true, true );

	if( allylists.indexOf(aid) == -1 ) {
		allylists.push(aid);
		csaveData( "allyXYAllyList", allylists, true, true );
	}
	
	var lists = cloadData( "allyXYList" + aid, "[]", true, true );

	for(var i=0 ; i<lists.length ; i++) {
		if( lists[i].id == uid ) {
			return;
		}
	}
	lists.push({"id":uid, "x":x, "y":y});
	csaveData( "allyXYList" + aid, lists, true, true );
}

function cdeleteUserXY(aid)
{
	var allylists = cloadData( "allyXYAllyList", "[]", true, true );

	var idx = allylists.indexOf(aid);
	if( idx != -1 ) {
		allylists.splice(idx,1);
		csaveData( "allyXYAllyList", allylists, true, true );
	}
	cdelData( "allyXYList" + aid, true );
	
	
}

function cresetUserXY()
{
	var allylists = cloadData( "allyXYAllyList", "[]", true, true );

	for(var i=0 ; i<allylists.length ; i++) {
		cdelData( "allyXYList" + allylists[i], true );
	}
	cdelData( "allyXYAllyList", true );
}

function cgetXYHtml(x,y)
{
	var img_send = IMG_DIR + "report/icon_go.gif";
	var img_mp = IMG_DIR + "report/icon_scout.gif";
	var m = "";
	var dist = cgetDistanceFromBase(x, y);
	if( dist != -1 ) {
		m = "　거리[" + dist.toFixed(2) + "]";
	}
	var txt = "<a href=\"/land.php?x=" + x + "&y=" + y + "#ptop\" title=\"표시\" style=\"color:#0099cc; text-decoration: none;\" onmouseover=\"this.style.textDecoration='underline';\" onmouseout=\"this.style.textDecoration='none';\" >" + x + "," + y + "</a>";
	txt += "<a href='/map.php?x=" + x + "&y=" + y + "#ptop' title='맵" + x + "," + y + "'><img src='" + img_mp + "' style='width:12px; height:12px; vertical-align:middle;'></a>";
	txt += "<a href='/facility/castle_send_troop.php?x=" + x + "&y=" + y + "#ptop' title='파병" + x + "," + y + m + "'><img src='" + img_send + "' style='width:12px; height:12px; vertical-align:middle;'></a>";
	
	return txt;
}

function cajaxRequest(url, method, param, func_success, func_fail){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200){
			func_success(req);
		}
		else if (req.readyState == 4 && req.status != 200){
			func_fail(req);
		}
	}

	req.open(method, url, true);
	if (method == 'POST'){
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	req.send(param);
}
function str2csvstr(str) {
	var csvstr;
	
	csvstr =  str.replace(/^[\s　]+|[\s　]+$/g, "");
	csvstr = csvstr.replace(/\"/g, "\"\"");
	
	if (csvstr.indexOf(",") != -1) {
		csvstr = "\"" + csvstr + "\"";
	}
	
	return csvstr;
}

function cgetElementXY(elm) {
	if( !elm ) return null;

	var xx = 0;
	var yy = 0;
	while(elm){
		xx += elm.offsetLeft;
		yy += elm.offsetTop;
		elm = elm.offsetParent;
	}
	return {"x":xx, "y":yy};
}

function cgetMapNofromXY(x, y, base_x, base_y, type)
{
	if( isNaN(base_x) ) base_x = 0;
	if( isNaN(base_y) ) base_y = 0;
	
	// map.php 전용 XY좌표→mapAll999
	var sc = 11;
	var hosei = 0;
	if( type == 2 ) {
		sc = 15;
	} else if( type == 3 ) {
		sc = 20;
		hosei = 1;
	}
	var hw = Math.floor( (sc - 1) / 2 );
	var no = "";
	if( x >= base_x - hw && x <= base_x - hw + sc - 1 &&
		y >= base_y - hw - hosei && y <= base_y - hw + sc - 1 - hosei  ) {
		no = (x - base_x + hw) * sc + (base_y + hw - y ) + 1;
		if( no < 10 ) no = "0" + no;
		else no = "" + no;
	}
	return no;
}

function ccreateCheckBox(container, id, def, text, title, left )
{
	left += 2;
	var dv = d.createElement("div");
	dv.style.padding = "2px";
	dv.style.paddingLeft= left + "px";
	dv.title = title;
	var cb = d.createElement("input");
	cb.type = "checkbox";
	cb.id = id;
	cb.value = 1;
	if( def ) cb.checked = true;
	
	var lb = d.createElement("label");
	lb.htmlFor = id;
	
	var tx = d.createTextNode(text);
	lb.appendChild( tx );
	
	dv.appendChild(cb);
	dv.appendChild(lb);
	container.appendChild(dv);
	return cb;
}
function ccreateTextBox(container, id, def, text, title, size, left )
{
	left += 2;
	var dv = d.createElement("div");
	dv.style.padding = "2px";
	dv.style.paddingLeft= left + "px";
	dv.title = title;
	var tb = d.createElement("input");
	tb.type = "text";
	tb.id = id;
	tb.value = def;
	tb.size = size;
	
	var tx = d.createTextNode(text);
	tx.title = title;
	
	dv.appendChild(tx);
	dv.appendChild(tb);
	container.appendChild(dv);
	return tb;
}

function ccreateComboBox(container, id, sels, def, text, title, left )
{
	left += 2;
	var dv = d.createElement("div");
	dv.style.padding = "2px";
	dv.style.paddingLeft= left + "px";
	dv.title = title;
	var sel = d.createElement("select");
	sel.id = id;
	for(var i=0; i<sels.length; i++){
		var opt = d.createElement("option");
		opt.value = sels[i];
		opt.appendChild(d.createTextNode(sels[i]));
		sel.appendChild(opt);
	}
	if( def ) sel.value = def;
	
	var tx = d.createTextNode(text);
	tx.title = title;
	
	dv.appendChild(tx);
	dv.appendChild(sel);
	container.appendChild(dv);
	return sel;
}

function ccreateButton(container, text, title, func)
{
	var btn = d.createElement("input");
	btn.style.padding = "1px";
	btn.type = "button";
	btn.value = text;
	btn.title = title;
	container.appendChild(d.createTextNode(" "));
	container.appendChild(btn);
	container.appendChild(d.createTextNode(" "));
	$e(btn, "click", func);
	return btn;
}

function cgetCheckBoxValue(id)
{
	var c = $(id);
	if( !c ) return 0;
	if( !c.checked ) return 0;
	return 1;
}

function cgetTextBoxValue(id)
{
	var c = $(id);
	if( !c ) return "";
	return c.value;
}

function ccreateSideBox(id, img, title)
{
	var icon_box = 'data:image/gif;base64,'+
		'R0lGODlhCwALAJEAAP///zMzM////wAAACH5BAUUAAIALAAAAAALAAsAAAIVjI8Gy6z5AoAyplkh'+
		'xteiTW1NQyUFADs=';

	var conf = cloadData( id + "conf" , "{\"float\":false, \"open\":true, \"x\":-1, \"y\":-1, \"pos\":99 }", true, true );
	
	
	var elm_sideBox = d.createElement("div");
	elm_sideBox.id = id;
	elm_sideBox.className = "sideBox";
	
	var elm_sideBoxHead = d.createElement("div");
	elm_sideBoxHead.className = "sideBoxHead";
	elm_sideBox.appendChild(elm_sideBoxHead);

	var elm_h3 = d.createElement("h3");
	
	var elm_strong = d.createElement("strong");

	var elm_img = d.createElement("img");
	elm_img.src = img;
	elm_strong.appendChild(elm_img);
	elm_strong.appendChild(d.createTextNode(title));
	
	var elm_span=d.createElement("span");
	elm_span.className = "beyond_panel_ctlbox";
	var elm_img_up = d.createElement("img");
	elm_img_up.src= IMG_DIR + "trade/icon_up.gif";
	elm_img_up.title = "위로";
	elm_img_up.id = id + "up";
	var elm_img_down = d.createElement("img");
	elm_img_down.src= IMG_DIR + "trade/icon_down.gif";
	elm_img_down.title = "아래로";
	elm_img_down.id = id + "down";
	var elm_img_box = d.createElement("img");
	elm_img_box.src= icon_box;
	elm_img_box.title = "도킹 전환";
	elm_span.appendChild(elm_img_up);
	elm_span.appendChild(elm_img_box);
	elm_span.appendChild(elm_img_down);
	
	elm_strong.appendChild(elm_span);
	elm_h3.appendChild(elm_strong);
	elm_sideBoxHead.appendChild(elm_h3);
	
	var elm_sideBoxInner = d.createElement("div");
	elm_sideBoxInner.className = "sideBoxInner";
	if( !conf.open ) {
		elm_sideBoxInner.style.display = "none";
		elm_img.style.opacity = 0.3;
	}
	elm_sideBox.appendChild(elm_sideBoxInner);
	
	$e(elm_img, "click", function(){
		var sidebox = $(id);
		var op = false;
		if( !sidebox ) return;
		var inner = $x("descendant::div[@class=\"sideBoxInner\"]", sidebox);
		if( !inner ) return;
		if( inner.style.display == "none" ){
			inner.style.display = "";
			this.style.opacity = 1;
			op = true;
		}else{
			inner.style.display = "none";
			this.style.opacity = 0.3;
		}

		var conf = cloadData( id + "conf" , "{\"float\":false, \"open\":true, \"x\":-1, \"y\":-1, \"pos\":99 }", true, true );
		conf.open = op;
		csaveData( id + "conf", conf, true, true );
	} );

	$e(elm_img_up, "click", function(){
		var sidebox = $(id);
		if( sidebox.parentNode.id != "beyond_fixpanel" ) return;
		var target = sidebox.previousSibling;
		if( !target ) return;
		sidebox.parentNode.removeChild(sidebox);
		target.parentNode.insertBefore(sidebox, target);
		crenumberSideBox();
	});

	$e(elm_img_down, "click", function(){
		var sidebox = $(id);
		if( sidebox.parentNode.id != "beyond_fixpanel" ) return;
		var target = sidebox.nextSibling;
		if( !target ) return;
		sidebox.parentNode.removeChild(sidebox);
		target.parentNode.insertBefore(sidebox, target.nextSibling);
		crenumberSideBox();
	});

	$e(elm_img_box, "click", function(){
		var sidebox = $(id);
		if( !sidebox ) return;

		var conf = cloadData( id + "conf" , "{\"float\":false, \"open\":true, \"x\":-1, \"y\":-1, \"pos\":99 }", true, true );
		
		if( sidebox.parentNode.id == "beyond_fixpanel" ) {
			if( conf.x < 0 || conf.y < 0 ) {
				var xy = cgetElementXY(sidebox);
				conf.x = xy.x;
				conf.y = xy.y;
			}
			sidebox.parentNode.removeChild(sidebox);
			$("beyond_floatpanel").appendChild(sidebox);
			sidebox.style.position = "absolute";
			sidebox.style.top = conf.y + "px";
			sidebox.style.left = conf.x + "px";
			sidebox.style.backgroundColor = "darkblue";
			sidebox.style.border = "outset 2px darkblue";
			sidebox.style.zIndex = 9999;
			conf.float = true;
			$(id + "up").style.display = "none";
			$(id + "down").style.display = "none";
		}else {
			sidebox.parentNode.removeChild(sidebox);
			$("beyond_fixpanel").appendChild(sidebox);
			sidebox.style.position = "";
			sidebox.style.top = "";
			sidebox.style.left = "";
			sidebox.style.backgroundColor = "";
			sidebox.style.border = "";
			sidebox.style.zIndex = "";
			conf.float = false;
			$(id + "up").style.display = "";
			$(id + "down").style.display = "";
			csortSideBox();
		}
		csaveData( id + "conf", conf, true, true );
	} );
	$e(elm_sideBoxHead, "mousedown", function(event){
		var sidebox = $(id);
		if( sidebox.parentNode.id != "beyond_floatpanel" ) return true;

		g_MD = id;
		g_MX = event.pageX-parseInt(sidebox.style.left);
		g_MY = event.pageY-parseInt(sidebox.style.top);
		if (navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
			event.preventDefault();
		}
	});
	$e(d, "mousemove", function(event){
		if(g_MD != id) return true;
		var sidebox = $(id);
		if( sidebox.parentNode.id != "beyond_floatpanel" ) return true;

		var x = event.pageX - g_MX;
		var y = event.pageY - g_MY;
		sidebox.style.left = x + "px";
		sidebox.style.top = y + "px";

		var conf = cloadData( id + "conf" , "{\"float\":false, \"open\":true, \"x\":-1, \"y\":-1, \"pos\":99 }", true, true );
		conf.x = x;
		conf.y = y;
		csaveData( id + "conf", conf, true, true );
	});
	$e(d, "mouseup", function(event){
		g_MD = "";
	});

	if( conf.float ) {
		elm_sideBox.style.position = "absolute";
		elm_sideBox.style.top = conf.y + "px";
		elm_sideBox.style.left = conf.x + "px";
		elm_sideBox.style.backgroundColor = "darkblue";
		elm_sideBox.style.border = "outset 2px darkblue";
		elm_sideBox.style.zIndex = 9999;
		elm_img_up.style.display = "none";
		elm_img_down.style.display = "none";
		$("beyond_floatpanel").appendChild(elm_sideBox);
	} else {
		$("beyond_fixpanel").appendChild(elm_sideBox);
	}
	
	return {"sideBox":elm_sideBox, "sideBoxHead":elm_sideBoxHead, "sideBoxInner":elm_sideBoxInner };
	
}

function csortSideBox()
{
	var sideboxes = $a("//div[@id=\"beyond_fixpanel\"]/div[@class=\"sideBox\"]");
	var srt = new Array();
	for(var i=0 ; i<sideboxes.length ; i++) {
		var pos = 0;

		var conf = cloadData( sideboxes[i].id + "conf" , "{\"float\":false, \"open\":true, \"x\":-1, \"y\":-1, \"pos\":99 }", true, true );
		pos = conf.pos;
		srt.push({"node":sideboxes[i], "pos":pos});
	}
	
	srt.sort( function(a,b) {return a.pos - b.pos;});
	
	for(var i=0 ; i<srt.length ; i++){
		srt[i].node.parentNode.removeChild(srt[i].node);
	}
	var fixpanel = $("beyond_fixpanel");
	for(var i=0 ; i<srt.length ; i++){
		fixpanel.appendChild(srt[i].node);
	}
}

function crenumberSideBox()
{
	var sideboxes = $a("//div[@id=\"beyond_fixpanel\"]/div[@class=\"sideBox\"]");
	
	for(var i=0 ; i<sideboxes.length ; i++) {
		var conf = cloadData( sideboxes[i].id + "conf" , "{\"float\":false, \"open\":true, \"x\":-1, \"y\":-1, \"pos\":99 }", true, true );
		conf.pos = i;
		csaveData( sideboxes[i].id + "conf", conf, true, true );
			
	}
}

function cappendColumnForProfile(title, id)
{
	var trs = $a("//table[@class=\"commonTables\"]//tr[position()<12]");
	for(var i=0 ; i<trs.length ; i++) {
		trs[i].childNodes[trs[i].childNodes.length-2].colSpan ++;
	}

	tr = $x("//table[@class=\"commonTables\"]//tr[12]");
	var th = d.createElement("th");
	th.className = "ttl4";
	th.id = id + "_title";
	th.appendChild( d.createTextNode( title ) );
	tr.appendChild( th );

	trs = $a("//table[@class=\"commonTables\"]//tr[position()>12]");
	for(var i=0 ; i<trs.length ; i++) {
		var xytd = trs[i].childNodes[3];
		if( !xytd ) continue;
		xy = xytd.innerHTML.match(/([\-0-9]+),([\-0-9]+)/);
		if( !xy ) continue;

		var td = d.createElement("td");
		td.id = id + "_" + xy[1] + "_" + xy[2];
		trs[i].appendChild(td);

		var pstd = trs[i].childNodes[5];
		if( !pstd ) continue;
		if( pstd.innerHTML != "&nbsp;" ) {
			td.textContent = "-";
		}
	}
}

function csetUserStar(uid, x, y, star, wood, stone, iron, rice, npc)
{
	var userlists = cloadData( "UserStarUserList", "[]", true, true );
	if( userlists.indexOf(uid) == -1 ) {
		userlists.push(uid);
		csaveData( "UserStarUserList", userlists, true, true );
	}
	
	var lists = cloadData( "UserStarList" + uid, "[]", true, true );

	for(var i=0 ; i<lists.length ; i++) {
		if( lists[i].x == x && lists[i].y == y ) {
			return;
		}
	}
	lists.push({"star":star, "x":x, "y":y, "wood":wood, "stone":stone, "iron":iron, "rice":rice, "npc":npc });
	csaveData( "UserStarList" + uid, lists, true, true );
}

function cresetUserStar()
{
	var userlists = cloadData( "UserStarUserList", "[]", true, true );
	
	for(var i=0 ; i<userlists.length ; i++) {
		cdelData( "UserStarList" + userlists[i], true );
	}
	cdelData( "UserStarUserList", true );
}

function csetMyLevel(x, y, level)
{
	var lists = cloadData( "MyLevelList", "[]", true, true );

	var ins = true;
	for(var i=0 ; i<lists.length ; i++) {
		if( lists[i].x == x && lists[i].y == y ) {
			if( level == -1 ) {
				lists[i].level++;
			}else{
				lists[i].level = level;
			}
			ins = false;
			break;
		}
	}
	if( ins && level != -1) {
		lists.push({"x":x, "y":y, "level":level});
	}
	csaveData( "MyLevelList", lists, true, true );
}
function cdelMyLevel(x, y)
{
	var lists = cloadData( "MyLevelList", "[]", true, true );

	for(var i=0 ; i<lists.length ; i++) {
		if( lists[i].x == x && lists[i].y == y ) {
			lists.splice(i,1);
			csaveData( "MyLevelList", lists, true, true );
			break;
		}
	}
}

function csaveData(key, value, local, ev)
{
	if( local ) key = location.hostname + key;
	if( ev ) value = JSON.stringify( value );
	GM_setValue(key, value );
}

function cloadData(key, value, local, ev)
{
	if( local ) key = location.hostname + key;
	var ret = GM_getValue(key, value);
	if( ev ) eval("ret = " + ret );
	return ret;
}

function cdelData(key, local )
{
	if( local ) key = location.hostname + key;
	GM_deleteValue( key );
}


//////////////////////////////////////////////////////////////////
// Present by 
// 삼국지 Auto troop
//////////////////////////////////////////////////////////////////

function autoTroop()
{

window.executeTroop = function()
{
    var btn = window.document.getElementById("btn_send");
    btn.click();
}
window.displayTroop = function()
{
    var obj = window.document.getElementById("gray02Wrapper");
    var html = "";
    html += '<strong>【출병예약】</strong> ';
    html += '<select id="autoTroop_HH"><option value="">--</option>';
    for ( var i=0; i < 24; i++) {
        html += '<option value="' + i + '">' + i +'</option>';
    }
    html += '</select>';
    html += '시';
    html += '<select id="autoTroop_MM"><option value="">--</option>';
    for ( var i=0; i < 60; i++) {
        html += '<option value="' + i + '">' + i +'</option>';
    }
    html += '</select>';
    html += '분';
    // 초 지정
    html += '<select id="autoTroop_SS"><option value="">--</option>';
    for ( var i=0; i < 60; i++) {
        html += '<option value="' + i + '">' + i +'</option>';
    }
    html += '</select>';
    html += '초';
    html += '<span id="autoTroop_hms" style="">에 자동으로 출병버튼을 누릅니다(최종체크--시--분) <br>이 화면을 유지하세요.</span>';
    obj.innerHTML += '<div style="text-align:center; border:3px #000 solid;padding:6px;-moz-border-radius: 10px;-webkit-border-radius: 10px;border-radius: 10px;">' + html + "</div>";
    // 0.5초 단위로 체크
    window.setInterval(function(){ checkTroopTime() } , 0.5 * 1000);
}
window.checkTroopTime = function()
{
    var h = window.document.getElementById("autoTroop_HH").value;
    var m = window.document.getElementById("autoTroop_MM").value;
    var s = window.document.getElementById("autoTroop_SS").value;
    // 현재시간 얻기
    var now = new Date();
    now_h = now.getHours();
    now_m = now.getMinutes();
    now_s = now.getSeconds();
    if ( h == now_h && m == now_m && s <= now_s ) {
        executeTroop();
    }
    // 예약이 가능한 것을 표시한다.
    var obj = window.document.getElementById("autoTroop_hms");
    if ( h != "--" && m != "--" ) {
        obj.innerHTML = "에 자동으로 출병버튼을 누릅니다.(최종체크" + now_h + "시" + now_m + "분) <br>이 화면을 유지하세요.";
    }
}
var title = window.document.title;
if ( title.indexOf("출병(확인) - SD삼국지") != -1 ) {
  window.setTimeout(function() { displayTroop();}, 1000);
} else {
  // 출병확인 화면이 아니면 아무것도 하지 않는다.
}

}

//////////////////////////////////////////////////////////////////
// Function end
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// Present by カチュウ
// http://shigematsu.org/
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//////////////////////////////////////////////////////////////////
function Pika_blinkElements()
{
	// Drift-free blinking routine
	var opacity = Math.round((new Date() % 1000) / 1000);
	for (var i = 0; i < Pika_elementQueue.length; ++i) {
		Pika_elementQueue[i].style.opacity = opacity;
	}
	window.setTimeout(function() { Pika_blinkElements() }, 500);
}

function Pika_updateYorozudasState() {
	var x = $a('//div[@class="sysMes"]/strong');
	if( x.length < 3 ) return;

	var nextUpdate = new Date(x[2].textContent.replace(/-/g, '/')).getTime();
	var info = {
		current:    +x[0].textContent,
		nextUpdate: nextUpdate,
		confirm:    nextUpdate - (24 * 60 * 60)
	};
	csaveData('yorozudas_state', info, true, true);
	Pika_displayYorozudasState();

/* 설정 메뉴에서 ON/OFF 가능하기 때문에 여기서는 불필요
	var button  = d.createElement('input');
	with (button) {
		id      = 'beyond_yorozudas_notification';
		type    = 'checkbox';
		checked = cloadData('yorozudas_notification', false, true);
		addEventListener('click', function() {
			var state = $('beyond_yorozudas_notification').checked;
			csaveData('yorozudas_notification', state, true, true);
			Pika_displayYorozudasState();
		}, false);
	}
	var text    = d.createTextNode(' 가챠폰 상태를 통보');
	var p       = d.createElement('p');
	var lb      = d.createElement("label");
	lb.htmlFor = button.id;
	lb.appendChild(text);
	with (p) {
		style.backgroundColor = '#aaaaaa';
		appendChild(button);
		appendChild(lb);
	}
	d.getElementsByClassName('sysMes')[0].appendChild(p);
*/
}
function Pika_updateYorozudasState2() {	//result용을 추가
	var x = $a('//div[@class="sysMes2"]/strong');
	if( x.length < 3 ) return;

	var nextUpdate = new Date(x[1].textContent.replace(/-/g, '/')).getTime();
	var info = {
		current:    +x[0].textContent,
		nextUpdate: nextUpdate,
		confirm:    nextUpdate - (24 * 60 * 60)
	};
	csaveData('yorozudas_state', info, true, true);
	Pika_displayYorozudasState();
}
function Pika_displayYorozudasState() {
	var xpath =
		'//*[@id="sidebar"]/ul/li/' + 
		'a[contains(@href, "/busyodas/b3kuji.php")]/img';
	if( OPT_SMALLBTN ) {
		// 작은 버튼일 때 요로즈다스도 작은 것으로
		xpath = 
			'//*[@id="beyond_sidebar_smallbutton"]/' + 
			'a[contains(@href, "/busyodas/b3kuji.php")]/img';
	}
	var img_yorozu = $x(xpath);
// 설정 메뉴에서 ON/OFF 가능하기 때문에 여기서는 불필요
//	var enabled = cloadData('yorozudas_notification', false, true);
//	if (enabled) {
		var info = cloadData('yorozudas_state', '({})', true, true);
		var now = new Date().getTime();
		if (info.nextUpdate < now) {
			Pika_elementQueue.push(img_yorozu);
		} else {
			if (info.current <= 0) {
				img_yorozu.style.opacity = 0.5;
			} else {
				if (info.confirm > 0
				 && info.confirm < now) {
					if (confirm('요로즈다스를 뽑을 수 있는 상태입니다.\n나중에 확인하겠습니까?')) {
						var delta = (info.nextUpdate - now) / 3600;
						if (delta < 4) {
							info.confirm += 1 * 60 * 60; // 1 hour later
						} else if (delta < 8) {
							info.confirm += 2 * 60 * 60; // 2 hours later
						} else {
							info.confirm += 4 * 60 * 60;
						}
					} else {
						info.confirm = 0;
					}
					csaveData('yorozudas_state', info, true, true);
				}
			}
		}
//	} else {
//		img_yorozu.style.opacity = 1;
//	}
}

function Pika_displayRecoveryEstimates() {
	var	candidates = $a('//*[@id="deck_file"]//*[div[@class="setPlace false"]]');
	for (var i = 0; i < candidates.length; ++i) {
		var level = + $x('*//*[starts-with(@class,"level_")]', candidates[i]).innerHTML;
//		var level = + candidates[i].getElementsByClassName('level')
//						[0].textContent;
	    var hp    = + candidates[i].getElementsByClassName('status_hp')
						[0].textContent.toString().split(/[/]/)[0];
		if (hp >= 100) continue;
//			var hours = (level * (100 - hp)) / 60;
		var hours = (level <= 5) ? Math.pow(2, level - 2) * (100 - hp) / 100 :
						(level <= 10) ? 4 * (level - 3) * (100 - hp) / 100 :
							(level + 20) * (100 - hp) / 100;

		var msg  = Pika_formatEstimate(hours, false) + '에 HP 모두 회복';
		candidates[i].getElementsByClassName('setPlace false')[0].innerHTML = msg;
	}

	candidates = $a('//*[@id="deck_file"]//*[div[@class="control"]/dl/dd[contains(text(),"치료중")]]');
	 for (var i = 0; i < candidates.length; ++i) {
		var level = + $x('*//*[starts-with(@class,"level_")]', candidates[i]).innerHTML;
//		var level = + candidates[i].getElementsByClassName('level')
//						[0].textContent;
	    var hp    = + candidates[i].getElementsByClassName('status_hp')
						[0].textContent.toString().split(/[/]/)[0];
		if (hp >= 100) continue;
//			var hours = (level * (100 - hp)) / 60;
		var hours = (level <= 5) ? Math.pow(2, level - 2) * (100 - hp) / 100 :
						(level <= 10) ? 4 * (level - 3) * (100 - hp) / 100 :
							(level + 20) * (100 - hp) / 100;
		var msg  = '<치료중> : 완료 예정시간<br>'+Pika_formatEstimate(hours, false);
		candidates[i].getElementsByTagName('dd')[2].innerHTML = msg;
		candidates[i].getElementsByTagName('dd')[2].style.fontSize = "10px";
		candidates[i].getElementsByTagName('dd')[2].style.margin = "0px";
	}

	window.setTimeout(function() { Pika_displayRecoveryEstimates() }, 60*1000);
}
function Pika_formatEstimate(hours, displaySecs) {
	var msg   = '';
	var now   = new Date();
	var xday  = new Date(now.getTime() + hours * 60 * 60 * 1000);
	var days  = Math.floor(hours / 24);

	var delta = Math.floor(
		(
		new Date(xday.getYear(), xday.getMonth(), xday.getDate()) -
		new Date(now .getYear(), now .getMonth(), now .getDate())
		)
		/ (24 * 60 * 60 * 1000));

	if (delta == 0) msg = '';
	else if (delta == 1) msg = '내일';
	else if (delta == 2) msg = '모래';
	else msg = delta + '일후';

	msg += xday.getHours() + '시';
	msg += xday.getMinutes() + '분 ';

	if (days == 0) {
		var seconds = Math.floor((hours * 3600) % 60);
		var minutes = Math.floor((hours *   60) % 60);
		hours = Math.floor(hours);

		if (hours == 0) {
			if (displaySecs) {
				msg += '(' + minutes + '분' + seconds + '초) ';
			}
			else {
				msg += '(' + minutes + '분) ';
			}
		}
		else {
			msg += '(' + hours+ '시간' + minutes +'분) ';
		}
	}
	return msg;
}

	
function Pika_installMapXYHelper()
{
	// http://javascript.g.hatena.ne.jp/emergent/20081122/1227329941
	// https://developer.mozilla.org/ja/XPCNativeWrapper
	// use event listener to set 'onlcick' functon
	
	if( location.pathname != '/map.php' ) return;
	
	var btn = $x('//div[@id="mapXY"]//input[@type="submit"]');
	if( !btn ) return;
	btn.addEventListener('click',
			function() {
				var xpath = '//div[@id="mapXY"]//input[@type="text"]';
				var xy = $a(xpath);
				var x  = xy[0].value.toString();
				
				if (x.match(/(-?\d+)[ .,&、](?:y=)?(-?\d+)/)) {
					xy[0].value = RegExp.$1;
					xy[1].value = RegExp.$2;
				}
			}, false);
}

function Pika_installTradeHelper() {

	if( location.pathname != '/card/trade.php' ) return;
	
	$('button')
        .addEventListener('click',
			function() {
				var element = $x('//div[@class="formSearch"]/select');
				var index = element.selectedIndex;
				if (index == 0 || index == 3) {
					if ($('k').value.toString().match(/[1-4]\d{3}/)) {
						element.selectedIndex = 2;
					}
				}
			}, false);
}


function Pika_prepareForDisplayBuildStatus()
{
	var maps = $('maps');
    var xpath = 'img[contains(@src, "/img_lv0.gif")]/@class';
    var nodes = $a(xpath, maps);
    for (var i = 0; i < nodes.length; ++i) {
        var index = nodes[i].value.toString().substr(-2);
        var xpath = 'img[@class="map' + index +'" and contains(@src, "/facility_10")]';
        var isResourceProducingLot = $a(xpath, maps).length;
        if (!isResourceProducingLot) {
			$x('//img[@class="mapicon'+index+'"]').src =
            	'data:image/gif;base64,'+
                'R0lGODlhFwAWAMQfADp1MxYsFzp7NEGdQTp7Nm2bac7dzebu5l6TWkWmRZ69nPL2'+
                '8kWAQLXNszuNO7/UvzV7NWqVZU6PTNrm2Y20i0apRj+WP1LOc0y7TDmDOSAgID+G'+
                'OShRLz9+N////////yH5BAEAAB8ALAAAAAAXABYAAAW74PdxZGmepShyV+u+sMut'+
                'WG3fOD5zVe8niYFQmPD5OBqOZcm0OCQUg4HiaC6RnIx2m4E8PGCPAsLNYDfoNAGx'+
                'OEgKYEYafZ5vCJODYN/wFOx1cwhiAhsCCh4IgEl2G3ANAJEGBwSLWWUMYBQRXwUE'+
                'XARYHaOkh2ELBQKkpKKrowARChQMAK6jrbaRkba3GiO8wKwaviMoHLwlwyofw83D'+
                'rs7Ky9MiqwEB1NnLpNfa3h+j3d/aHeLj2tjfIQA7';
        }
    }
}

function Pika_displayBuildStatus() {

	var xpath = '//*[@id=\"actionLog\"]/ul/li/span[@class=\"buildStatus\" and starts-with(text(),\"건설중\")]/a';
    var nodes = $a(xpath);
    var facilities = {};
    for (var i = 0; i < nodes.length; ++i) {
        nodes[i].href.match(/x=(\d+)&y=(\d+)/);
        var x = parseInt(RegExp.$1);
        var y = parseInt(RegExp.$2);
        var index = (101 + x * 7 + y).toString().substr(-2);
        facilities[index] = index;
    }
    
    var count = 0;
    for (var index in facilities) {
        Pika_elementQueue.push(document.getElementsByClassName('map'+index)[0]);
        if (count++) continue;
        Pika_elementQueue.push(document.getElementsByClassName('mapicon'+index)[0]);
    }

    var deleting = $x('//*[@id="actionLog"]/ul/li[contains(text(), "삭제중")]/span[@class="buildStatus"]/a');
    if (deleting && deleting.href.match(/x=(\d+)&y=(\d+)/)) {
        var x = +RegExp.$1;
        var y = +RegExp.$2;
        var index = (101 + x * 7 + y).toString().substr(-2);
        document.getElementsByClassName('map'+index)[0]
            .style.opacity = 0.5;
        document.getElementsByClassName('mapicon'+index)[0]
            .style.opacity = 0.5;
    }
}
//////////////////////////////////////////////////////////////////
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// Present by ピカチュウ
//////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////
// Present by su-zan
//http://shigematsu.org/
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//////////////////////////////////////////////////////////////////
function Suzan_Seisan(inner)
{
	var seisanList = {
		other:[
			0,6,14,25,50,80,117,162,214,272,335,404,476,550,626,702
		],
		hatake:[
			0,6,18,36,72,114,167,231,305,388,479,577,680,786,894,1003
		]
	};

	var results = document.evaluate('//area', document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var area = new Array();
	var seisan = {
		'벌채소':0, '밭':0, '채석장':0, '제철소':0
	};
	for(var i=0,n=0; i<results.snapshotLength; i++){
		if(results.snapshotItem(i).alt.match(/(.*?)\s.*?(\d+)/)){
			area[n] = new Object();
			area[n].name = RegExp.$1;
			area[n].lv = RegExp.$2;
			if(area[n].name.match(/밭/)){
				seisan['밭'] += seisanList.hatake[area[n].lv];
			}
			if(area[n].name.match(/(벌채소)|(채석장)|(제철소)|/)){
				seisan[RegExp.lastMatch] += seisanList.other[area[n].lv];
			}
			n++;
		}
		//바위산 등
		if(results.snapshotItem(i).alt.match(/(바위산|철광산|숲|곡물)/)){
			switch(RegExp.$1){
			case "바위산":	seisan["채석장"] += 10; break;
			case "철광산":	seisan["제철소"] += 10; break;
			case "숲":	seisan["벌채소"] += 10; break;
			case "곡물":	seisan["밭"] += 10; break;
			}
		}
	}
	var text = '<ul><li>';
	text += '<img align="middle" alt="목" src="' + IMG_DIR + 'common/ico_wood2.gif"> 목  ' + seisan['벌채소'] + '</li>';
	text += '<li><img align="middle" alt="석" src="' + IMG_DIR + 'common/ico_stone2.gif"> 석  ' + seisan['채석장'] + '</li>';
	text += '<li><img align="middle" alt="철" src="' + IMG_DIR + 'common/ico_iron2.gif"> 철  ' + seisan['제철소'] + '</li>';
	text += '<li><img align="middle" alt="쌀" src="' + IMG_DIR + 'common/ico_lice2.gif"> 쌀  ' + seisan['밭'] + '</li>';
	text += '<li>　합계 ' + (seisan['벌채소']+seisan['채석장']+seisan['제철소']+seisan['밭']) +'</li></ul>';
	inner.innerHTML = text;
	
}
//////////////////////////////////////////////////////////////////
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// Present By su-zan
//////////////////////////////////////////////////////////////////


////////////////////////////
// MapStar Present by Profile
////////////////////////////

function Profile_MapStar() {

var crossBrowserUtility = initCrossBrowserSupport();

var $x = function(xp, dc) {function c(f) {var g = '';if (typeof f == 'string') {g = f;}var h = function(a) {var b = document.implementation.createHTMLDocument('');var c = b.createRange();c.selectNodeContents(b.documentElement);c.deleteContents();b.documentElement.appendChild(c.createContextualFragment(a));return b;};if (0 <= navigator.userAgent.toLowerCase().indexOf('firefox')) {h = function(a) {var b = document.implementation.createDocumentType('html','-//W3C//DTD HTML 4.01//EN','http://www.w3.org/TR/html4/strict.dtd');var c = document.implementation.createDocument(null, 'html', b);var d = document.createRange();d.selectNodeContents(document.documentElement);var e = c.adoptNode(d.createContextualFragment(a));c.documentElement.appendChild(e);return c;};}return h(g);}var m = [], r = null, n = null;var o = dc || document.documentElement;var p = o.ownerDocument;if (typeof dc == 'object' && typeof dc.nodeType == 'number') {if (dc.nodeType == 1 && dc.nodeName.toUpperCase() == 'HTML') {o = c(dc.innerHTML);p = o;}else if (dc.nodeType == 9) {o = dc.documentElement;p = dc;}}else if (typeof dc == 'string') {o = c(dc);p = o;}try {r = p.evaluate(xp, o, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for ( var i = 0, l = r.snapshotLength; i < l; i++) m.push(r.snapshotItem(i));}catch (e) {try {var q = p.evaluate(xp, o, null, XPathResult.ANY_TYPE, null);while (n = q.iterateNext()) m.push(n);}catch (e) {throw new Error(e.message);}}return m;};
var $ = function (id,pd) {return pd ? pd.getElementById(id) : document.getElementById(id);};
var $e = function(doc, event, func, useCapture) {var eventList = event;var eType = null;var capture = useCapture || false;if (typeof event == 'string') {eventList = new Object();eventList[event] = new Array(func);} else {for (eType in eventList) {if (typeof eventList[eType] == 'object'&& eventList[eType] instanceof Array) {continue;}eventList[eType] = [ event[eType] ];}}for (eType in eventList) {var eventName = eType;for ( var i = 0; i < eventList[eType].length; i++) {doc.addEventListener(eventName, eventList[eType][i], capture);}}};


var mapStarBox = createElement('div', {'attribute' : {'id' : 'mapStarBox'}});
$x('id("mapboxInner")').forEach(function(self) {
                                    self.appendChild(mapStarBox);
                                });

/////////////////////////////
// 설정데이터 초기화
/////////////////////////////
 
var dataTable;
if ((dataTable = GM_getValue('b3MapStar_dataTable',null)) == null) {
    dataTable = {
        w : { // white
            bgColor : '#FFFFFF',
            isVisible: false,
            title : '빈 땅',
            low:1,
            middle:3,
            high:5
        },
        b : {   // blue
            bgColor : '#0000FF',
            isVisible: true,
            title : '자국',
            low:1,
            middle:3,
            high:5
        },
        g : { // green
            bgColor : '#00FF00',
            isVisible: false,
            title : '동맹',
            low:1,
            middle:3,
            high:5
        },
        bk : { // black
            bgColor : '#000000',
            isVisible: false,
            title : '배하동맹',
            low:1,
            middle:3,
            high:5
        },
        bg : { // sky blue
            bgColor : '#0066FF',
            isVisible: false,
            title : '친교동맹',
            low:1,
            middle:3,
            high:5
        },
        y : { // yellow
            bgColor : '#FFFF00',
            isVisible: false,
            title : '불가침동맹',
            low:1,
            middle:3,
            high:5
        },
        r : { // red
            bgColor : '#FF0000',
            isVisible: false,
            title : '적국',
            low:1,
            middle:3,
            high:5
        },
        o : { // orange
            bgColor : '#FFA500',
            isVisible: false,
            title : '타동맹배하',
            low:1,
            middle:3,
            high:5
        },
        p : { // purple
            bgColor : '#FF00FF',
            isVisible: false,
            title : 'NPC',
            low:1,
            middle:3,
            high:5
        }
    };
} else {
    dataTable = crossBrowserUtility.JSON.parse(dataTable);
}

//////////////////
// 각 지도기능 설정 ON/OFF
//////////////////
function onSettingClick(e) {
    var key = this.getAttribute('type');
    dataTable[key].isVisible = !dataTable[key].isVisible;
    GM_setValue('b3MapStar_dataTable',crossBrowserUtility.JSON.stringify(dataTable));

    var clsName = 'mapStar_off';
    var displayVal = 'none';

    if (dataTable[key].isVisible) {
        clsName = 'mapStar_on';
        displayVal = 'block';
    }

    $x('id("mapStarItemWrapper")//div[contains(@class,"mapStar_' + key + '_")]')
        .forEach(function(self) {
        self.style.display = displayVal;
    });

    this.className = 'mapStar_' + key + '_ mapStar_outer ' + clsName;
}

///////////////////
// 설정 박스 삽입
///////////////////
var settingBox = createElement('div',{
                                        css : {
                                            'background-color' : '#FFFFFF',
                                            'padding-left' : '5px'
                                        }
                                    });

mapStarBox.appendChild(settingBox);

var css = [
        '.mapStar_outer{ width:10px;height:10px;margin:2px 4px 2px 0px;float:left;border:1px solid #000000;cursor:pointer; }',
        '.mapStar_on{ filter:alpha(opacity=100);opacity:1; }',
        '.mapStar_off{ filter:alpha(opacity=30);opacity:0.3;border:1px solid #999999; }',
        '.mapStar_box{ filter:alpha(opacity=60);opacity:0.6; position: absolute; width: 8px; height: 8px; font-size: 8px;}',
        '.mapStar_box_sol { border:1px solid #000;padding : 0px 2px 3px 2px;}',
        '.mapStar_box_bol { font-weight:bold; }',
        '.mapStar_padding { padding : 1px 2px 4px 3px; }',
       ];

for ( var key in dataTable) {
    var setting = dataTable[key];
    var onoff = setting.isVisible ? 'mapStar_on' : 'mapStar_off';
    var setItem = document.createElement('div');
        setItem.className = 'mapStar_' + key + '_ mapStar_outer ' + onoff;
        setItem.style.backgroundColor = setting.bgColor;

        setItem.title = setting.title;

        settingBox.appendChild(setItem);
        setItem.setAttribute('type', key);

    $e(setItem, {
        click : onSettingClick
    });

    css.push('.mapStar_' + key + '_ {background-color:' + setting.bgColor
            + '; color:' + getFontColor(setting.bgColor) + '} ');

}

/////////////////////
// MAP 사이즈 확인
/////////////////////
var mapSize = ($('rollover').style.zIndex || document.defaultView
        .getComputedStyle($('rollover'), '').zIndex) - 1;

/////////////////////
// CSS 설정
/////////////////////
var marginSize = '34px 0px 0px 23px';
if (400 <= mapSize) {
    marginSize = '18px 0px 0px 12px';
} else if (200 <= mapSize) {
    marginSize = '25px 0px 0px 17px';
}
css.push('.mapStar_margin{ margin:' + marginSize + '; z-index:' + (mapSize + 2)
        + '; }');
GM_addStyle(css.join("\n"));


/////////////////////////
// 지도 데이터 확인
/////////////////////////
var mapMap = new Array(mapSize+1);
var maps = $('mapsAll');

for (var i = 0;i <= mapSize;i++) {
    mapMap[i] = null;
}

var imgRegCmp = new RegExp(/img\/panel\/([^_]*)_([^_]*)_/);
$x('id("mapsAll")//img[contains(@class,"mapAll") and not(@class="mapAllOverlay")]')
        .forEach(function(self) {
    var matches =self.className.match(/mapAll(\d+)/);
    var mapIndex = matches[1] - 0;
    if ((matches = imgRegCmp.exec(self.src))) {
        if (matches[1] == 'resource') {
            mapMap[mapIndex] = null;
                } else {
            mapMap[mapIndex] = matches[2];
        }
    } else if (0 <= self.src.indexOf('blanc')) {
        mapMap[mapIndex] = false;
    }
});


//////////////////////
// 지도에 그려 넣기
//////////////////////
var itemWrapper = document.createElement('div');
itemWrapper.setAttribute('id', 'mapStarItemWrapper');
mapStarBox.appendChild(itemWrapper);

itemWrapper.style.position = 'absolute';
setTimeout(function() {
    var parent = maps.offsetParent || maps.parentNode;
    itemWrapper.style.top = (parent.offsetTop + maps.offsetTop)+ 'px';
    itemWrapper.style.left = (parent.offsetLeft + maps.offsetLeft)+ 'px';

    var f = arguments.callee;
    setTimeout(function() { f();},1000);
},300);


var areas = $x('id("mapsAll")//area');
var areaLen = areas.length;

var regCmp = new RegExp(/.*overOperation\(\'.*\'.*\'(.*)\'.*\'(.*)\'/);

var mapStarRecord = "";
var mapResRecord = "";
var tempMap = "" ;
var tempRes = "" ;
for (var i = 1,j=0; i < mapMap.length; i++) {
	tempMap = "0";
    if (mapMap[i] === false) {
		mapStarRecord = mapStarRecord + tempMap;
		mapResRecord = mapResRecord + tempRes + "|";
        continue;
    }

    var mo = areas[j++].getAttribute('onmouseover');
    if (mo.search("star_warpower_b.gif") < 0) {
		mapStarRecord = mapStarRecord + tempMap;
		mapResRecord = mapResRecord + tempRes + "|"
		continue;
    }

    var matches = null;
	tempMap = '';
	tempRes = '';


	
    if ((matches = regCmp.exec(mo))) {
		var dataKey = (mapMap[i] === null) ? 'w' : mapMap[i];
        setting  = dataTable[dataKey];
        var item = document.createElement('div');
        if (setting.isVisible == false) {
            item.style.display = 'none';
        }
		item.className = 'mapStar_margin mapStar_box mapStar_' + dataKey + '_';
        item.setAttribute('id', 'mapStar_' + i);
        item.style.left = matches[1];
        item.style.top = matches[2];
		var matchesArray = mo.split('star_warpower_b.gif');
		tempMap = matchesArray.length - 1
		tempMap = tempMap.toString();
		
		var resourceArray = mo.split("', '");
		tempRes = '(' + resourceArray[7] + ',' + resourceArray[8] + ',' + resourceArray[9] + ',' + resourceArray[10] + ')'

		
		// MapStar 옵션에서 지정한 값 이하면 표시하지 않음
		// 새로 만든 기능
		if (matchesArray.length-2 < OPT_MAPSATR_SIZE) {
			mapStarRecord = mapStarRecord + tempMap ;
			mapResRecord = mapResRecord + tempRes + "|"
			continue;
		}
		
		item.innerHTML = matchesArray.length - 1;

        if (matches[2].length < setting.low) {
            mapStarRecord = mapStarRecord + tempMap ;
			mapResRecord = mapResRecord + tempRes + "|"
			continue;
        }
		item.className += ' mapStar_padding';
/*
        if (matches[2].length < setting.middle) {
            item.className += ' mapStar_padding';
        }
        if (setting.middle <= matches[2].length) {
			item.className += ' mapStar_box_sol';
        }
        if (setting.high <= matches[2].length) {
			item.className += ' mapStar_box_bol';
        }
*/
        itemWrapper.appendChild(item);

    }
	
	mapStarRecord = mapStarRecord + tempMap;	
	mapResRecord = mapResRecord + tempRes + "|"
}
// WeWillWin에서 사용하기 위해서 저장
csaveData( "OPT_MapStarRecord", mapStarRecord );
csaveData( "OPT_MapResRecord", mapResRecord); 

function getFontColor(colStr) {
    if (colStr[0] == '#') {
        colStr = colStr.substring(1);
    }
    var r = parseInt(colStr[0], 16);
    var g = parseInt(colStr[1], 16);
    var b = parseInt(colStr[2], 16);
    if (colStr.length == 6) {
        r = parseInt(colStr.substring(0, 2), 16);
        g = parseInt(colStr.substring(2, 4), 16);
        b = parseInt(colStr.substring(4, 6), 16);
    }


    getLightness = function(r, g, b) {
        return Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);
    };


    var bgLightness = getLightness(r, g, b);
    var bLightness = getLightness(0, 0, 0);
    var wLightness = getLightness(255, 255, 255);

    var fontColer = 'FFF';
    if (Math.abs(wLightness - bgLightness) < Math.abs(bLightness - bgLightness)) {
        fontColer = '000';
    }

    return '#' + fontColer;
}

function createText(text) {
    return document.createTextNode(text);
}

function createElement(elementName, option, doc) {
    var pageDocument = doc ? doc : document;
    var retElement = elementName == 'img' ? new Image() : pageDocument
            .createElement(elementName);

    if (typeof option == 'object') {
        if (typeof option.attribute == 'object') {
            for ( var attrName in option.attribute) {
                retElement.setAttribute(attrName, option.attribute[attrName]);
            }
        }
        if (typeof option.events == 'object') {
            $e(retElement, option.events);
        }
        if (typeof option.innerText == 'string') {
            retElement.appendChild(pageDocument.createTextNode(option.innerText));
        }
        if (typeof option.css == 'object') {
            var cssString = '';
            for ( var cssProp in option.css) {
                retElement.style.setProperty(cssProp, option.css[cssProp],'');
            }
        } else if (option.css == 'string') {
            retElement.style.cssText = option.css;
        }
    }
    return retElement;
}

//////////////////////
// GM 관계변수 초기화
//////////////////////
function initGMFunctions() {
    // @copyright 2009, James Campos
    // @license cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
    if ((typeof GM_getValue != 'undefined')
            && (GM_getValue('a', 'b') != undefined)) {
        return;
    }
    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    };

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    };

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
        case 'b':
            return value == 'true';
        case 'n':
            return Number(value);
        default:
            return value;
        }
    };

    GM_log = function(message) {
        if (typeof opera == 'object') {
            opera.postError(message);
            return;
        }
        console.log(message);
    };

    GM_registerMenuCommand = function(name, funk) {
        // todo
    };

    GM_setValue = function(name, value) {
        switch (typeof value) {
        case 'string':
        case 'number':
        case 'boolean':
            break;
        default:
            throw new TypeError();
        }

        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    };

    // additional functions
    GM_listValues = function() {
        var len = localStorage.length;
        var res = new Object();
        var key = '';
        for ( var i = 0; i < len; i++) {
            key = localStorage.key(i);
            res[key] = key;
        }
        return res;
    };

    GM_openInTab = function(url) {
        window.open(url, '');
    };
}
////////////////////////////////////////
// JSON이 없는 경우와 prototype.js 와 JSON오브젝트 충돌 회피용
////////////////////////////////////////
function initJSON() {
    var myJSON = function() {
        if (typeof JSON != 'object' || typeof Prototype == 'object') {
            this.__proto__ = {
                stringify : function(obj) {
                    switch (typeof obj) {
                    case 'string':
                        return quote(obj);
                    case 'number':
                        return isFinite(obj) ? String(obj) : 'null';
                    case 'boolean':
                    case 'null':
                        return String(obj);
                    case 'object':
                        if (!obj) {
                            return 'null';
                        }

                        if (obj instanceof Date) {
                            return isFinite(obj) ? obj.getUTCFullYear() + '-'
                                    + complementZero(obj.getUTCMonth() + 1) + '-'
                                    + complementZero(obj.getUTCDate()) + 'T'
                                    + complementZero(obj.getUTCHours()) + ':'
                                    + complementZero(obj.getUTCMinutes()) + ':'
                                    + complementZero(obj.getUTCSeconds()) + 'Z'
                                    : 'null';
                        }

                        var partial = new Array();
                        var prefix = '{';
                        var suffix = '}';
                        if (obj instanceof Array) {
                            prefix = '[';
                            suffix = ']';

                            length = obj.length;
                            for ( var i = 0; i < length; i++) {
                                partial[i] = arguments.callee(obj[i]) || 'null';
                            }
                        } else {
                            for ( var key in obj) {
                                if (Object.hasOwnProperty.call(obj, key)) {
                                    partial.push(quote(key) + ':'
                                            + (arguments.callee(obj[key]) || 'null'));
                                }
                            }
                        }

                        return prefix + partial.join(',') + suffix;
                        break;
                    default:
                        return null;
                    }

                    function quote(str) {
                        var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                        var meta = { // table of character substitutions
                            '\b' : '\\b',
                            '\t' : '\\t',
                            '\n' : '\\n',
                            '\f' : '\\f',
                            '\r' : '\\r',
                            '"' : '\\"',
                            '\\' : '\\\\'
                        };

                        return escapable.test(str) ? '"'
                                + str.replace(escapable, function(a) {
                                            var c = meta[a];
                                            return typeof c === 'string' ? c : '\\u'
                                                    + ('0000' + a.charCodeAt(0).toString(16))
                                                            .slice(-4);
                                        }) + '"' : '"' + str + '"';
                    }

                    function complementZero(number) {
                        return number < 10 ? '0' + number : number;
                    }
                },
                parse : function(jsonStrings) {
                    return eval('(' + jsonStrings + ')');
                }
            };
        }
    };

    if (typeof JSON == 'object') {
        myJSON.prototype = JSON;
    }

    return new myJSON();
}

function initCrossBrowserSupport() {
    var crossBrowserUtility = {'JSON':null}
    // GM관계변수 초기화
    initGMFunctions();

    // 배열 인덱스 설정
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(elt /*, from*/) {
            var len = this.length;

            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0) {
                from += len;
            }

            for (; from < len; from++) {
                if (from in this && this[from] === elt) {
                    return from;
                }
            }

            return -1;
        };
    }

    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(fun /*, thisp*/) {
            var len = this.length;
            if (typeof fun != "function") {
                throw new TypeError();
            }

            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
                if (i in this) {
                    fun.call(thisp, this[i], i, this);
                }
            }
        };
    }

    crossBrowserUtility.JSON = initJSON();
    return crossBrowserUtility;
}

}
////////////////////////////
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// MapStar Present by Profile
////////////////////////////


//},false);
}) (); 
