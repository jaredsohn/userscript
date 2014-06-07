// ==UserScript==
// @name           0AutoPagerize Settings
// @namespace      http://ss-o.net/
// @description    oAutoPagerize Settings
// @include        http*
// ==/UserScript==

(function(){
var LOADING_IMAGE='url(data:image/gif;base64,'+
    'R0lGODlhEAAQAIIAAMQeBPx6ZPxOLMTCtPwuBPymlPxaPPyCbCH/C05FVFNDQVBFMi4wAwEAAAAh'+
    '+QQADwAAACwAAAAAEAAQAAIDS2iqQ04DSLnYg5PW9mIW2+VNAlhyzigNbOu+wyEfwWAaqDPTQ3jt'+
    'h94iR9jVFgIibNkqOJ2DAO14e0J3woW1EJMdK9voLKsIz76LBAAh+QQBDwAAACwAAAAAEAAQAIH/'+
    '/2T/pZX/gWr/WTwCM4wNogLjftBiD8a0Wo0BK/1wHlUB5ommKXNNTNpOapzBx/iqOujMUTXwHYBC'+
    'A9E2LCENBQAh+QQBDwAAACwAAAAAEAAQAIL//2T/gWr/pZX/WTz/LAYAAAAAAAAAAAADOxiqIC5g'+
    'ydVenLK6i9mDHfVxDGCeaDqsK6k5bJt9Qjy4tI2PaY8SQCAgRgoEhcTJkTBkFZdNmQSalCQAACH5'+
    'BAEPAAAALAAAAAAQABAAgv//ZP9ZPP+Bav+llf8sBsEeAAAAAAAAAANCGKogLmBIudiDk9b2Yq4B'+
    '53gTKGIZoK5sCxAwDGyXEMv0dRPzctq3nuXiKq4KSOQrJlQklUHQs7DEVaZVnvSZbQYSACH5BAEP'+
    'AAAALAAAAAAQABAAgv//ZP8sBv9ZPP+BasEeAAAAAAAAAAAAAAM7GKogLmBIudiDk9b2Yq4B53gT'+
    'KGIZoK5sCxAwDGyXEMv0dRPzctq3nuXiKq5MQRAyJlSGkk4GNPpighIAIfkEAQ8AAAAsAAAAABAA'+
    'EACB//9kwR4A/ywG/1k8AjWMDaIC437QYg/GtFqNASv9cB5VAeaJpiNzTS57rC7QvlmdqbpZDSMd'+
    '6f04wgnwULwFS0ZOAQAh+QQBDwAAACwAAAAAEAAQAIL//2T/LAbBHgD/WTz/gWoAAAAAAAAAAAAD'+
    'OxiqIC5gydVenLK6i9mDHfVxDGCeaDqsK6k5bJt9Qjy4tI2PaY8SQCAgRgoEhcTJkTBkFZdNmQSa'+
    'lCQAADs=)';

var ON_IMAGE='url(data:image/gif;base64,'+
    'R0lGODlhEAAQAKoAAJu60cDBtnWfv6zG2U+FrLjO3sfY5AAAACH5BAAAAAAALAAAAAAQABAAAANF'+
    'CKohLoFIudiDk9b2Yq4A53gTKGJZoK5sGwwwHGyXEMv0dQ/zctq3nuXiKq4KSOQrJlQYkoUlrmJ4'+
    'KoOgqlXKy2qj2EoCADs=)';

var OFF_IMAGE='url(data:image/gif;base64,'+
    'R0lGODlhEAAQAKoAAFVPRsDBtkdCOmRcUz45M3BnXAAAAAAAACH5BAAAAAAALAAAAAAQABAAAANC'+
    'CKohLoFIudiDk9b2Yq4A53gTKGJZoK5sGwwwHGyXEMv0dQ/zctq3nuXiKq4KSOQrJlQklUHQs7DE'+
    'VaZVnvSZbQISADs='+')';

var TERMINATED_IMAGE = 'url(data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWM4vq78Pzo+s7X+/4YJ'+
    'ISj4zNb6/zNLLTEww6gB/xnObK3/TwnGaQAxrtowIWRYG0B0IF7c3f4fHRPrquPryv8zXD3YT7kB'+
    '6IaQZQCyIWQbADOEFAMAjzLZlQSUH/wAAAAASUVORK5CYII=)';

var ERROR_IMAGE = 'url(data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAV0lEQVQ4jWP43/vzPwae+v//w/Id'+
    'KPj/1P//Dya1YGCGUQP+M/yf+v8/JRi3AUS46mH5juFtANGBOPf/fwxMrKt6f/5n+L+UGgagG0KW'+
    'AUupYcBS0g0AABp/ZCboihQNAAAAAElFTkSuQmCC)';

window.AutoPagerizeSettings = {
	TOP_SITEINFO:[]
	,BOTTOM_SITEINFO:[{
        "url":"^http://forums?\\.somethingawful\\.com/showthread\\.php",
        "pageElement":"//div[@id=\"thread\"]",
        "nextLink":"//a[@title=\"next page \u00bb\"]"
   	},{
        "url":"^http://forums?\\.somethingawful\\.com/forumdisplay\\.php",
        "pageElement":"//table[@id=\"forum\"]",
        "nextLink":"//a[@title=\"next page \u00bb\"]"
	}]
	,naviType:'number'//link or number
	,DebugMode:false
	,AUTO_START:true
	,BASE_REMAIN_HEIGHT:400
	,FORCE_TARGET_WINDOW:true
	,TARGET_WINDOW_NAME:'_blank'
	,COLOR:{
		on         : '#00ff00 center ' + ON_IMAGE,
		off        : '#cccccc center ' + OFF_IMAGE,
		loading    : '#00ffff center ' + LOADING_IMAGE,
		terminated : '#0000ff center ' + TERMINATED_IMAGE,
		error      : '#ff00ff center ' + ERROR_IMAGE
	}
	//,ICON_SIZE:16
	,DISABLE_SITE:[
		'http://h\\.hatena\\.ne\\.jp/'
	]
	,DISABLE_IFRAME:false
	,HISTORY_MODE_FAST:false // via http://d.hatena.ne.jp/edvakf/20090101/1230802163
};

})();
			