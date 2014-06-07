// ==UserScript==
// @name ClanInfo
// @author Vov_chiK
// @namespace http://userscripts.org/people/521608
// @description Adding additional information on members of the clan
// @source http://userscripts.org/scripts/show/171246
// @identifier http://userscripts.org/scripts/source/171246.user.js
// @copyright 2013+, Vov_chiK
// @license GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version 0.9.0.80
// @creator Vov_chiK
// @include http://worldoftanks.ru/uc/clans/*
// @include http://worldoftanks.ru/uc/accounts/*
// @include http://worldoftanks.ru/community/clans/*
// @include http://worldoftanks.ru/community/accounts/*
// @include http://worldoftanks.ru/clans/recruitstation/accounts/*
// @match http://worldoftanks.ru/uc/clans/*
// @match http://worldoftanks.ru/uc/accounts/*
// @match http://worldoftanks.ru/community/clans/*
// @match http://worldoftanks.ru/community/accounts/*
// @match http://worldoftanks.ru/clans/recruitstation/accounts/*
// @grant GM_xmlhttpRequest
// ==/UserScript==
// @Vov_chiK

(function(window){
	function onStart(){
		var version = '0.9.0.80';
		var link = 'http://forum.worldoftanks.ru/index.php?/topic/881743-';				
		var link_name = '[0.9.0] [ClanInfo] Расширенная статистика по клану на оф. сайте.';	
		var api_version = 'wot';
		var application_id = '465b433458404851342a8ad750e67820';
		var lang = getCookie('hllang');
		var host = window.location.host;
		var localization = getLocalization(lang);
		var MaxProcess = 3;	
		var Process = 0;
		var Encyclopedia = null;
		var loadEncyclopediaTime = 0;
		var MembersArray = [];
		
		/* http://www.wnefficiency.net/wnexpected/ Expected Tank Values v14 (29. Dec 2013) */
		var ExpTanks = [];
		var ExpTanksJSON = eval('('+'{"header":{"version":14},"data":[{"IDNum":"3089","expFrag":"2.11","expDamage":"278.00","expSpot":"2.35","expDef":"1.84","expWinRate":"59.54"},{"IDNum":"3329","expFrag":"2.10","expDamage":"270.00","expSpot":"1.55","expDef":"1.81","expWinRate":"60.46"},{"IDNum":"577","expFrag":"2.01","expDamage":"268.00","expSpot":"2.12","expDef":"2.17","expWinRate":"60.24"},{"IDNum":"1329","expFrag":"2.05","expDamage":"274.00","expSpot":"1.51","expDef":"2.10","expWinRate":"60.00"},{"IDNum":"545","expFrag":"2.14","expDamage":"265.00","expSpot":"2.67","expDef":"1.78","expWinRate":"61.40"},{"IDNum":"81","expFrag":"2.05","expDamage":"260.00","expSpot":"1.38","expDef":"1.76","expWinRate":"57.88"},{"IDNum":"609","expFrag":"2.05","expDamage":"260.00","expSpot":"1.38","expDef":"1.76","expWinRate":"57.88"},{"IDNum":"1025","expFrag":"1.89","expDamage":"306.00","expSpot":"2.20","expDef":"1.58","expWinRate":"57.80"},{"IDNum":"5201","expFrag":"1.73","expDamage":"301.00","expSpot":"1.97","expDef":"1.40","expWinRate":"58.67"},{"IDNum":"7761","expFrag":"2.09","expDamage":"349.00","expSpot":"2.24","expDef":"1.42","expWinRate":"64.03"},{"IDNum":"1601","expFrag":"1.46","expDamage":"250.00","expSpot":"1.24","expDef":"2.90","expWinRate":"53.96"},{"IDNum":"1345","expFrag":"1.52","expDamage":"249.00","expSpot":"1.32","expDef":"2.43","expWinRate":"58.69"},{"IDNum":"1825","expFrag":"1.75","expDamage":"281.00","expSpot":"2.73","expDef":"1.76","expWinRate":"60.49"},{"IDNum":"785","expFrag":"1.95","expDamage":"311.00","expSpot":"2.01","expDef":"2.19","expWinRate":"57.60"},{"IDNum":"52497","expFrag":"2.20","expDamage":"352.00","expSpot":"1.88","expDef":"2.72","expWinRate":"54.01"},{"IDNum":"12817","expFrag":"1.72","expDamage":"266.00","expSpot":"3.18","expDef":"2.66","expWinRate":"59.06"},{"IDNum":"2065","expFrag":"1.69","expDamage":"272.00","expSpot":"2.05","expDef":"1.78","expWinRate":"56.14"},{"IDNum":"53537","expFrag":"1.62","expDamage":"269.00","expSpot":"2.05","expDef":"1.43","expWinRate":"57.06"},{"IDNum":"51489","expFrag":"1.70","expDamage":"275.00","expSpot":"3.12","expDef":"1.64","expWinRate":"58.98"},{"IDNum":"4609","expFrag":"1.87","expDamage":"302.00","expSpot":"1.26","expDef":"2.33","expWinRate":"54.63"},{"IDNum":"15361","expFrag":"1.80","expDamage":"299.00","expSpot":"1.71","expDef":"2.37","expWinRate":"57.55"},{"IDNum":"54529","expFrag":"1.96","expDamage":"323.00","expSpot":"1.63","expDef":"1.87","expWinRate":"59.43"},{"IDNum":"2353","expFrag":"1.85","expDamage":"308.00","expSpot":"1.72","expDef":"1.83","expWinRate":"60.49"},{"IDNum":"55073","expFrag":"1.80","expDamage":"295.00","expSpot":"2.02","expDef":"2.02","expWinRate":"58.04"},{"IDNum":"865","expFrag":"1.80","expDamage":"295.00","expSpot":"2.02","expDef":"2.02","expWinRate":"58.04"},{"IDNum":"54865","expFrag":"1.80","expDamage":"295.00","expSpot":"2.02","expDef":"2.02","expWinRate":"58.04"},{"IDNum":"5665","expFrag":"1.92","expDamage":"310.00","expSpot":"2.01","expDef":"1.92","expWinRate":"57.24"},{"IDNum":"337","expFrag":"1.80","expDamage":"297.00","expSpot":"1.23","expDef":"1.67","expWinRate":"57.37"},{"IDNum":"353","expFrag":"1.80","expDamage":"297.00","expSpot":"1.23","expDef":"1.67","expWinRate":"57.37"},{"IDNum":"15121","expFrag":"1.47","expDamage":"280.00","expSpot":"0.17","expDef":"2.23","expWinRate":"51.21"},{"IDNum":"10577","expFrag":"1.47","expDamage":"280.00","expSpot":"0.17","expDef":"2.23","expWinRate":"51.21"},{"IDNum":"833","expFrag":"1.44","expDamage":"278.00","expSpot":"0.18","expDef":"1.85","expWinRate":"52.70"},{"IDNum":"3841","expFrag":"1.42","expDamage":"267.00","expSpot":"0.17","expDef":"2.51","expWinRate":"49.78"},{"IDNum":"2081","expFrag":"1.56","expDamage":"296.00","expSpot":"0.30","expDef":"2.33","expWinRate":"51.15"},{"IDNum":"5121","expFrag":"1.74","expDamage":"307.00","expSpot":"0.46","expDef":"1.66","expWinRate":"56.42"},{"IDNum":"3601","expFrag":"1.95","expDamage":"330.00","expSpot":"0.94","expDef":"1.78","expWinRate":"59.68"},{"IDNum":"7745","expFrag":"2.02","expDamage":"334.00","expSpot":"0.86","expDef":"1.65","expWinRate":"54.47"},{"IDNum":"6177","expFrag":"2.48","expDamage":"360.00","expSpot":"1.21","expDef":"1.79","expWinRate":"60.50"},{"IDNum":"8273","expFrag":"1.95","expDamage":"321.00","expSpot":"1.48","expDef":"1.77","expWinRate":"60.98"},{"IDNum":"5953","expFrag":"0.95","expDamage":"222.00","expSpot":"1.05","expDef":"1.64","expWinRate":"55.07"},{"IDNum":"769","expFrag":"0.94","expDamage":"229.00","expSpot":"2.19","expDef":"1.38","expWinRate":"51.27"},{"IDNum":"52225","expFrag":"1.52","expDamage":"346.00","expSpot":"1.54","expDef":"1.94","expWinRate":"61.00"},{"IDNum":"6993","expFrag":"1.51","expDamage":"330.00","expSpot":"1.02","expDef":"1.20","expWinRate":"57.99"},{"IDNum":"7505","expFrag":"1.65","expDamage":"381.00","expSpot":"1.92","expDef":"1.31","expWinRate":"60.33"},{"IDNum":"56577","expFrag":"1.68","expDamage":"343.00","expSpot":"1.22","expDef":"2.46","expWinRate":"58.40"},{"IDNum":"52769","expFrag":"1.22","expDamage":"287.00","expSpot":"2.94","expDef":"1.27","expWinRate":"58.31"},{"IDNum":"52737","expFrag":"1.02","expDamage":"232.00","expSpot":"1.78","expDef":"1.18","expWinRate":"50.83"},{"IDNum":"289","expFrag":"1.09","expDamage":"252.00","expSpot":"2.66","expDef":"1.57","expWinRate":"53.72"},{"IDNum":"52001","expFrag":"1.39","expDamage":"314.00","expSpot":"1.95","expDef":"1.64","expWinRate":"57.44"},{"IDNum":"3345","expFrag":"1.68","expDamage":"384.00","expSpot":"1.58","expDef":"1.77","expWinRate":"56.45"},{"IDNum":"12561","expFrag":"1.31","expDamage":"277.00","expSpot":"3.01","expDef":"1.41","expWinRate":"57.25"},{"IDNum":"13073","expFrag":"1.15","expDamage":"288.00","expSpot":"1.99","expDef":"1.63","expWinRate":"59.52"},{"IDNum":"51729","expFrag":"2.14","expDamage":"405.00","expSpot":"2.08","expDef":"3.01","expWinRate":"63.00"},{"IDNum":"4881","expFrag":"1.20","expDamage":"268.00","expSpot":"1.84","expDef":"1.53","expWinRate":"53.33"},{"IDNum":"53505","expFrag":"1.89","expDamage":"393.00","expSpot":"1.83","expDef":"1.88","expWinRate":"59.79"},{"IDNum":"54801","expFrag":"1.29","expDamage":"295.00","expSpot":"3.61","expDef":"1.66","expWinRate":"59.71"},{"IDNum":"3073","expFrag":"1.17","expDamage":"284.00","expSpot":"1.57","expDef":"1.27","expWinRate":"53.17"},{"IDNum":"15105","expFrag":"1.47","expDamage":"361.00","expSpot":"1.72","expDef":"1.37","expWinRate":"62.46"},{"IDNum":"4401","expFrag":"1.57","expDamage":"384.00","expSpot":"1.47","expDef":"1.71","expWinRate":"59.80"},{"IDNum":"2401","expFrag":"1.39","expDamage":"314.00","expSpot":"1.95","expDef":"1.64","expWinRate":"57.44"},{"IDNum":"51809","expFrag":"1.39","expDamage":"314.00","expSpot":"1.95","expDef":"1.64","expWinRate":"57.44"},{"IDNum":"321","expFrag":"1.38","expDamage":"320.00","expSpot":"0.97","expDef":"2.07","expWinRate":"59.59"},{"IDNum":"4897","expFrag":"1.38","expDamage":"301.00","expSpot":"1.45","expDef":"1.15","expWinRate":"53.29"},{"IDNum":"51985","expFrag":"1.90","expDamage":"425.00","expSpot":"1.58","expDef":"1.94","expWinRate":"62.00"},{"IDNum":"2385","expFrag":"1.15","expDamage":"290.00","expSpot":"1.04","expDef":"0.47","expWinRate":"51.20"},{"IDNum":"2145","expFrag":"1.45","expDamage":"334.00","expSpot":"1.26","expDef":"1.41","expWinRate":"56.52"},{"IDNum":"54609","expFrag":"1.30","expDamage":"490.00","expSpot":"0.16","expDef":"1.93","expWinRate":"55.11"},{"IDNum":"3409","expFrag":"1.30","expDamage":"490.00","expSpot":"0.16","expDef":"1.93","expWinRate":"55.11"},{"IDNum":"54049","expFrag":"1.30","expDamage":"490.00","expSpot":"0.16","expDef":"1.93","expWinRate":"55.11"},{"IDNum":"3393","expFrag":"1.39","expDamage":"500.00","expSpot":"0.15","expDef":"2.20","expWinRate":"54.24"},{"IDNum":"3617","expFrag":"1.04","expDamage":"567.00","expSpot":"0.16","expDef":"1.89","expWinRate":"53.00"},{"IDNum":"2833","expFrag":"1.31","expDamage":"383.00","expSpot":"0.21","expDef":"1.57","expWinRate":"57.02"},{"IDNum":"7681","expFrag":"1.60","expDamage":"586.00","expSpot":"0.16","expDef":"2.17","expWinRate":"57.28"},{"IDNum":"5905","expFrag":"1.15","expDamage":"415.00","expSpot":"0.16","expDef":"1.81","expWinRate":"54.00"},{"IDNum":"2369","expFrag":"1.96","expDamage":"472.00","expSpot":"1.03","expDef":"2.15","expWinRate":"59.00"},{"IDNum":"6673","expFrag":"1.51","expDamage":"428.00","expSpot":"1.08","expDef":"1.51","expWinRate":"58.41"},{"IDNum":"8257","expFrag":"1.58","expDamage":"389.00","expSpot":"1.02","expDef":"2.09","expWinRate":"57.84"},{"IDNum":"6401","expFrag":"1.49","expDamage":"396.00","expSpot":"0.87","expDef":"1.70","expWinRate":"54.36"},{"IDNum":"6433","expFrag":"1.57","expDamage":"389.00","expSpot":"1.31","expDef":"1.11","expWinRate":"58.10"},{"IDNum":"8017","expFrag":"1.76","expDamage":"401.00","expSpot":"0.94","expDef":"1.64","expWinRate":"59.00"},{"IDNum":"1089","expFrag":"1.16","expDamage":"348.00","expSpot":"1.20","expDef":"1.49","expWinRate":"51.63"},{"IDNum":"13329","expFrag":"1.16","expDamage":"348.00","expSpot":"1.20","expDef":"1.49","expWinRate":"51.63"},{"IDNum":"52241","expFrag":"1.96","expDamage":"527.00","expSpot":"1.79","expDef":"2.22","expWinRate":"60.16"},{"IDNum":"2049","expFrag":"0.90","expDamage":"270.00","expSpot":"3.34","expDef":"0.62","expWinRate":"48.95"},{"IDNum":"2881","expFrag":"0.93","expDamage":"297.00","expSpot":"0.92","expDef":"1.39","expWinRate":"53.09"},{"IDNum":"6481","expFrag":"1.11","expDamage":"378.00","expSpot":"1.81","expDef":"1.15","expWinRate":"55.60"},{"IDNum":"5153","expFrag":"1.03","expDamage":"334.00","expSpot":"3.12","expDef":"1.28","expWinRate":"57.84"},{"IDNum":"3121","expFrag":"1.08","expDamage":"377.00","expSpot":"2.62","expDef":"1.15","expWinRate":"55.52"},{"IDNum":"8209","expFrag":"0.92","expDamage":"290.00","expSpot":"2.71","expDef":"1.11","expWinRate":"54.03"},{"IDNum":"6161","expFrag":"1.34","expDamage":"339.00","expSpot":"2.75","expDef":"1.32","expWinRate":"56.52"},{"IDNum":"9473","expFrag":"0.97","expDamage":"339.00","expSpot":"4.02","expDef":"1.07","expWinRate":"59.40"},{"IDNum":"15873","expFrag":"1.17","expDamage":"404.00","expSpot":"1.87","expDef":"2.06","expWinRate":"58.07"},{"IDNum":"4945","expFrag":"0.96","expDamage":"370.00","expSpot":"0.88","expDef":"1.28","expWinRate":"53.78"},{"IDNum":"52481","expFrag":"1.45","expDamage":"396.00","expSpot":"1.75","expDef":"1.78","expWinRate":"55.72"},{"IDNum":"2913","expFrag":"1.11","expDamage":"359.00","expSpot":"2.39","expDef":"1.36","expWinRate":"56.28"},{"IDNum":"52993","expFrag":"0.87","expDamage":"273.00","expSpot":"2.86","expDef":"0.56","expWinRate":"53.98"},{"IDNum":"3105","expFrag":"1.14","expDamage":"377.00","expSpot":"0.87","expDef":"0.97","expWinRate":"51.78"},{"IDNum":"51457","expFrag":"1.55","expDamage":"562.00","expSpot":"0.91","expDef":"2.08","expWinRate":"59.66"},{"IDNum":"4369","expFrag":"1.19","expDamage":"360.00","expSpot":"2.15","expDef":"1.16","expWinRate":"55.49"},{"IDNum":"1537","expFrag":"1.19","expDamage":"421.00","expSpot":"1.24","expDef":"0.97","expWinRate":"51.85"},{"IDNum":"13585","expFrag":"1.30","expDamage":"424.00","expSpot":"1.71","expDef":"1.36","expWinRate":"57.92"},{"IDNum":"1633","expFrag":"1.27","expDamage":"429.00","expSpot":"1.38","expDef":"1.31","expWinRate":"55.34"},{"IDNum":"10833","expFrag":"1.11","expDamage":"477.00","expSpot":"0.16","expDef":"1.94","expWinRate":"51.11"},{"IDNum":"14657","expFrag":"1.11","expDamage":"477.00","expSpot":"0.16","expDef":"1.94","expWinRate":"51.11"},{"IDNum":"4641","expFrag":"1.15","expDamage":"419.00","expSpot":"0.17","expDef":"1.90","expWinRate":"49.49"},{"IDNum":"15633","expFrag":"1.10","expDamage":"471.00","expSpot":"0.16","expDef":"2.44","expWinRate":"55.16"},{"IDNum":"4625","expFrag":"1.16","expDamage":"436.00","expSpot":"0.18","expDef":"1.68","expWinRate":"50.46"},{"IDNum":"4865","expFrag":"1.02","expDamage":"582.00","expSpot":"0.16","expDef":"1.73","expWinRate":"49.33"},{"IDNum":"9041","expFrag":"1.49","expDamage":"504.00","expSpot":"1.48","expDef":"1.66","expWinRate":"55.33"},{"IDNum":"1809","expFrag":"1.63","expDamage":"533.00","expSpot":"0.64","expDef":"1.37","expWinRate":"57.58"},{"IDNum":"10273","expFrag":"1.42","expDamage":"516.00","expSpot":"1.54","expDef":"1.77","expWinRate":"57.49"},{"IDNum":"9793","expFrag":"1.19","expDamage":"409.00","expSpot":"0.59","expDef":"1.14","expWinRate":"53.90"},{"IDNum":"6913","expFrag":"1.44","expDamage":"519.00","expSpot":"1.00","expDef":"1.45","expWinRate":"55.48"},{"IDNum":"7713","expFrag":"1.45","expDamage":"533.00","expSpot":"1.15","expDef":"1.46","expWinRate":"56.56"},{"IDNum":"11281","expFrag":"1.42","expDamage":"533.00","expSpot":"0.64","expDef":"1.37","expWinRate":"57.58"},{"IDNum":"6721","expFrag":"1.22","expDamage":"654.00","expSpot":"0.83","expDef":"1.11","expWinRate":"52.93"},{"IDNum":"2897","expFrag":"1.24","expDamage":"671.00","expSpot":"0.90","expDef":"1.43","expWinRate":"53.96"},{"IDNum":"51713","expFrag":"1.30","expDamage":"614.00","expSpot":"1.17","expDef":"1.51","expWinRate":"52.73"},{"IDNum":"54353","expFrag":"1.32","expDamage":"582.00","expSpot":"1.32","expDef":"1.89","expWinRate":"53.90"},{"IDNum":"1281","expFrag":"1.01","expDamage":"590.00","expSpot":"0.72","expDef":"0.52","expWinRate":"51.16"},{"IDNum":"11777","expFrag":"1.22","expDamage":"653.00","expSpot":"0.80","expDef":"1.00","expWinRate":"53.41"},{"IDNum":"11777","expFrag":"1.22","expDamage":"653.00","expSpot":"0.80","expDef":"1.00","expWinRate":"53.41"},{"IDNum":"51201","expFrag":"1.39","expDamage":"593.00","expSpot":"1.46","expDef":"0.62","expWinRate":"54.00"},{"IDNum":"54017","expFrag":"1.39","expDamage":"593.00","expSpot":"1.46","expDef":"0.62","expWinRate":"54.00"},{"IDNum":"3361","expFrag":"1.24","expDamage":"636.00","expSpot":"1.14","expDef":"1.15","expWinRate":"53.98"},{"IDNum":"33","expFrag":"1.35","expDamage":"593.00","expSpot":"1.53","expDef":"1.31","expWinRate":"54.02"},{"IDNum":"2577","expFrag":"1.17","expDamage":"677.00","expSpot":"1.45","expDef":"0.90","expWinRate":"51.80"},{"IDNum":"2129","expFrag":"1.06","expDamage":"489.00","expSpot":"1.71","expDef":"1.25","expWinRate":"54.16"},{"IDNum":"14145","expFrag":"0.73","expDamage":"464.00","expSpot":"2.88","expDef":"0.77","expWinRate":"53.91"},{"IDNum":"9761","expFrag":"0.69","expDamage":"538.00","expSpot":"2.67","expDef":"0.81","expWinRate":"53.27"},{"IDNum":"9729","expFrag":"0.61","expDamage":"380.00","expSpot":"4.79","expDef":"0.80","expWinRate":"54.50"},{"IDNum":"9729","expFrag":"0.61","expDamage":"380.00","expSpot":"4.79","expDef":"0.80","expWinRate":"54.50"},{"IDNum":"5393","expFrag":"0.73","expDamage":"357.00","expSpot":"3.20","expDef":"0.80","expWinRate":"53.30"},{"IDNum":"51553","expFrag":"1.15","expDamage":"530.00","expSpot":"1.41","expDef":"1.19","expWinRate":"54.27"},{"IDNum":"1377","expFrag":"1.15","expDamage":"530.00","expSpot":"1.41","expDef":"1.19","expWinRate":"54.27"},{"IDNum":"1057","expFrag":"1.73","expDamage":"801.00","expSpot":"1.57","expDef":"1.31","expWinRate":"60.24"},{"IDNum":"52257","expFrag":"0.94","expDamage":"401.00","expSpot":"1.45","expDef":"0.94","expWinRate":"51.74"},{"IDNum":"5409","expFrag":"0.98","expDamage":"441.00","expSpot":"2.15","expDef":"1.12","expWinRate":"53.32"},{"IDNum":"53585","expFrag":"1.22","expDamage":"536.00","expSpot":"0.78","expDef":"1.28","expWinRate":"52.98"},{"IDNum":"849","expFrag":"1.40","expDamage":"587.00","expSpot":"1.16","expDef":"1.61","expWinRate":"55.82"},{"IDNum":"6417","expFrag":"0.98","expDamage":"455.00","expSpot":"1.65","expDef":"1.00","expWinRate":"53.07"},{"IDNum":"17","expFrag":"1.23","expDamage":"607.00","expSpot":"1.26","expDef":"1.07","expWinRate":"54.88"},{"IDNum":"55057","expFrag":"1.23","expDamage":"607.00","expSpot":"1.26","expDef":"1.07","expWinRate":"54.88"},{"IDNum":"51745","expFrag":"1.19","expDamage":"538.00","expSpot":"1.37","expDef":"1.31","expWinRate":"55.69"},{"IDNum":"54545","expFrag":"1.22","expDamage":"596.00","expSpot":"1.55","expDef":"1.29","expWinRate":"55.52"},{"IDNum":"1","expFrag":"1.15","expDamage":"528.00","expSpot":"1.44","expDef":"1.24","expWinRate":"54.75"},{"IDNum":"4657","expFrag":"1.18","expDamage":"538.00","expSpot":"1.45","expDef":"1.25","expWinRate":"53.54"},{"IDNum":"2113","expFrag":"1.39","expDamage":"710.00","expSpot":"0.12","expDef":"2.01","expWinRate":"52.80"},{"IDNum":"4161","expFrag":"1.22","expDamage":"675.00","expSpot":"0.12","expDef":"2.26","expWinRate":"51.40"},{"IDNum":"11089","expFrag":"1.11","expDamage":"620.00","expSpot":"0.12","expDef":"1.76","expWinRate":"55.29"},{"IDNum":"5649","expFrag":"1.08","expDamage":"648.00","expSpot":"0.11","expDef":"1.58","expWinRate":"51.03"},{"IDNum":"4129","expFrag":"0.99","expDamage":"874.00","expSpot":"0.12","expDef":"1.33","expWinRate":"50.44"},{"IDNum":"16385","expFrag":"1.16","expDamage":"705.00","expSpot":"0.12","expDef":"1.79","expWinRate":"52.19"},{"IDNum":"8785","expFrag":"1.29","expDamage":"617.00","expSpot":"0.79","expDef":"1.97","expWinRate":"55.00"},{"IDNum":"6945","expFrag":"1.26","expDamage":"627.00","expSpot":"0.95","expDef":"1.42","expWinRate":"54.24"},{"IDNum":"10049","expFrag":"1.26","expDamage":"649.00","expSpot":"0.82","expDef":"1.26","expWinRate":"51.59"},{"IDNum":"1041","expFrag":"1.21","expDamage":"616.00","expSpot":"0.73","expDef":"1.40","expWinRate":"53.19"},{"IDNum":"257","expFrag":"1.21","expDamage":"608.00","expSpot":"0.54","expDef":"1.22","expWinRate":"52.36"},{"IDNum":"53761","expFrag":"1.21","expDamage":"608.00","expSpot":"0.54","expDef":"1.22","expWinRate":"52.36"},{"IDNum":"10529","expFrag":"1.46","expDamage":"700.00","expSpot":"1.71","expDef":"1.67","expWinRate":"56.89"},{"IDNum":"16145","expFrag":"1.32","expDamage":"681.00","expSpot":"0.86","expDef":"1.32","expWinRate":"54.17"},{"IDNum":"2625","expFrag":"0.96","expDamage":"813.00","expSpot":"0.84","expDef":"0.85","expWinRate":"51.08"},{"IDNum":"4689","expFrag":"1.06","expDamage":"802.00","expSpot":"0.76","expDef":"1.18","expWinRate":"52.39"},{"IDNum":"2817","expFrag":"1.33","expDamage":"1003.00","expSpot":"1.16","expDef":"0.94","expWinRate":"56.56"},{"IDNum":"10497","expFrag":"1.15","expDamage":"900.00","expSpot":"0.74","expDef":"0.84","expWinRate":"53.31"},{"IDNum":"801","expFrag":"1.07","expDamage":"845.00","expSpot":"1.03","expDef":"0.92","expWinRate":"52.17"},{"IDNum":"11265","expFrag":"1.02","expDamage":"804.00","expSpot":"0.80","expDef":"0.79","expWinRate":"52.65"},{"IDNum":"2321","expFrag":"1.34","expDamage":"947.00","expSpot":"1.40","expDef":"1.40","expWinRate":"57.39"},{"IDNum":"53841","expFrag":"1.29","expDamage":"922.00","expSpot":"0.60","expDef":"1.41","expWinRate":"55.31"},{"IDNum":"53841","expFrag":"1.29","expDamage":"922.00","expSpot":"0.60","expDef":"1.41","expWinRate":"55.31"},{"IDNum":"4913","expFrag":"0.63","expDamage":"415.00","expSpot":"2.83","expDef":"0.81","expWinRate":"51.52"},{"IDNum":"6465","expFrag":"0.63","expDamage":"471.00","expSpot":"1.93","expDef":"0.69","expWinRate":"51.44"},{"IDNum":"16641","expFrag":"0.63","expDamage":"415.00","expSpot":"3.60","expDef":"0.86","expWinRate":"53.51"},{"IDNum":"15137","expFrag":"0.65","expDamage":"517.00","expSpot":"2.44","expDef":"0.76","expWinRate":"52.09"},{"IDNum":"10001","expFrag":"0.77","expDamage":"596.00","expSpot":"2.97","expDef":"0.62","expWinRate":"53.08"},{"IDNum":"64817","expFrag":"0.66","expDamage":"483.00","expSpot":"2.75","expDef":"0.75","expWinRate":"52.33"},{"IDNum":"12289","expFrag":"1.08","expDamage":"755.00","expSpot":"1.44","expDef":"1.21","expWinRate":"53.18"},{"IDNum":"51473","expFrag":"1.04","expDamage":"643.00","expSpot":"2.01","expDef":"1.30","expWinRate":"50.70"},{"IDNum":"54033","expFrag":"1.04","expDamage":"643.00","expSpot":"2.01","expDef":"1.30","expWinRate":"51.35"},{"IDNum":"1105","expFrag":"1.11","expDamage":"744.00","expSpot":"2.05","expDef":"1.09","expWinRate":"54.02"},{"IDNum":"10017","expFrag":"1.21","expDamage":"840.00","expSpot":"1.19","expDef":"1.38","expWinRate":"54.75"},{"IDNum":"1313","expFrag":"1.03","expDamage":"700.00","expSpot":"1.50","expDef":"1.11","expWinRate":"53.63"},{"IDNum":"57361","expFrag":"1.07","expDamage":"808.00","expSpot":"1.10","expDef":"1.62","expWinRate":"50.54"},{"IDNum":"2561","expFrag":"1.03","expDamage":"740.00","expSpot":"1.37","expDef":"1.02","expWinRate":"53.78"},{"IDNum":"5169","expFrag":"1.10","expDamage":"751.00","expSpot":"1.56","expDef":"1.22","expWinRate":"52.87"},{"IDNum":"14097","expFrag":"1.13","expDamage":"788.00","expSpot":"1.49","expDef":"1.33","expWinRate":"53.74"},{"IDNum":"7185","expFrag":"0.93","expDamage":"666.00","expSpot":"1.28","expDef":"0.89","expWinRate":"52.07"},{"IDNum":"15889","expFrag":"1.08","expDamage":"755.00","expSpot":"1.44","expDef":"1.21","expWinRate":"53.18"},{"IDNum":"1889","expFrag":"1.08","expDamage":"755.00","expSpot":"1.44","expDef":"1.21","expWinRate":"53.18"},{"IDNum":"4673","expFrag":"0.90","expDamage":"1052.00","expSpot":"0.11","expDef":"1.56","expWinRate":"49.39"},{"IDNum":"11857","expFrag":"0.95","expDamage":"889.00","expSpot":"0.13","expDef":"1.72","expWinRate":"49.00"},{"IDNum":"273","expFrag":"0.84","expDamage":"982.00","expSpot":"0.11","expDef":"1.28","expWinRate":"48.42"},{"IDNum":"16417","expFrag":"0.90","expDamage":"974.00","expSpot":"0.11","expDef":"1.52","expWinRate":"47.95"},{"IDNum":"5633","expFrag":"0.92","expDamage":"1101.00","expSpot":"0.11","expDef":"1.26","expWinRate":"49.77"},{"IDNum":"11585","expFrag":"0.99","expDamage":"765.00","expSpot":"0.68","expDef":"1.13","expWinRate":"48.76"},{"IDNum":"9553","expFrag":"1.24","expDamage":"916.00","expSpot":"0.73","expDef":"1.69","expWinRate":"54.00"},{"IDNum":"9809","expFrag":"0.92","expDamage":"704.00","expSpot":"0.46","expDef":"1.10","expWinRate":"50.85"},{"IDNum":"57105","expFrag":"1.20","expDamage":"892.00","expSpot":"0.76","expDef":"1.09","expWinRate":"51.40"},{"IDNum":"1553","expFrag":"1.08","expDamage":"748.00","expSpot":"0.72","expDef":"1.26","expWinRate":"52.37"},{"IDNum":"11553","expFrag":"1.37","expDamage":"1002.00","expSpot":"1.47","expDef":"1.60","expWinRate":"56.24"},{"IDNum":"7201","expFrag":"1.09","expDamage":"824.00","expSpot":"0.89","expDef":"1.23","expWinRate":"53.57"},{"IDNum":"3585","expFrag":"1.24","expDamage":"887.00","expSpot":"0.81","expDef":"1.19","expWinRate":"54.05"},{"IDNum":"54785","expFrag":"1.28","expDamage":"985.00","expSpot":"0.70","expDef":"0.86","expWinRate":"54.72"},{"IDNum":"11793","expFrag":"1.26","expDamage":"937.00","expSpot":"0.80","expDef":"1.14","expWinRate":"53.97"},{"IDNum":"6977","expFrag":"0.89","expDamage":"1021.00","expSpot":"0.93","expDef":"0.94","expWinRate":"50.70"},{"IDNum":"3153","expFrag":"0.96","expDamage":"1043.00","expSpot":"0.89","expDef":"1.10","expWinRate":"53.54"},{"IDNum":"513","expFrag":"1.06","expDamage":"1068.00","expSpot":"1.05","expDef":"0.79","expWinRate":"52.53"},{"IDNum":"3633","expFrag":"1.07","expDamage":"1153.00","expSpot":"1.11","expDef":"0.86","expWinRate":"53.10"},{"IDNum":"5889","expFrag":"1.09","expDamage":"1128.00","expSpot":"0.87","expDef":"0.77","expWinRate":"53.45"},{"IDNum":"529","expFrag":"0.93","expDamage":"1031.00","expSpot":"0.94","expDef":"0.98","expWinRate":"51.68"},{"IDNum":"10769","expFrag":"0.97","expDamage":"1095.00","expSpot":"0.93","expDef":"1.08","expWinRate":"53.17"},{"IDNum":"3873","expFrag":"1.13","expDamage":"1239.00","expSpot":"1.07","expDef":"1.04","expWinRate":"54.14"},{"IDNum":"5185","expFrag":"0.75","expDamage":"623.00","expSpot":"1.99","expDef":"0.77","expWinRate":"53.10"},{"IDNum":"14353","expFrag":"0.69","expDamage":"738.00","expSpot":"2.36","expDef":"0.71","expWinRate":"50.37"},{"IDNum":"15649","expFrag":"0.81","expDamage":"824.00","expSpot":"2.66","expDef":"0.85","expWinRate":"53.03"},{"IDNum":"305","expFrag":"0.70","expDamage":"685.00","expSpot":"2.43","expDef":"0.85","expWinRate":"52.18"},{"IDNum":"3377","expFrag":"0.73","expDamage":"752.00","expSpot":"2.59","expDef":"0.81","expWinRate":"52.48"},{"IDNum":"12545","expFrag":"1.00","expDamage":"943.00","expSpot":"1.59","expDef":"1.18","expWinRate":"55.71"},{"IDNum":"5457","expFrag":"1.04","expDamage":"958.00","expSpot":"1.82","expDef":"1.14","expWinRate":"54.07"},{"IDNum":"8961","expFrag":"0.85","expDamage":"750.00","expSpot":"1.59","expDef":"1.05","expWinRate":"52.94"},{"IDNum":"57617","expFrag":"0.99","expDamage":"942.00","expSpot":"1.27","expDef":"1.49","expWinRate":"52.41"},{"IDNum":"1297","expFrag":"0.84","expDamage":"850.00","expSpot":"1.11","expDef":"1.27","expWinRate":"51.64"},{"IDNum":"1569","expFrag":"0.97","expDamage":"932.00","expSpot":"1.69","expDef":"0.98","expWinRate":"53.52"},{"IDNum":"1073","expFrag":"1.03","expDamage":"1015.00","expSpot":"1.58","expDef":"1.04","expWinRate":"53.58"},{"IDNum":"6657","expFrag":"0.97","expDamage":"891.00","expSpot":"1.54","expDef":"1.00","expWinRate":"53.64"},{"IDNum":"4113","expFrag":"0.92","expDamage":"848.00","expSpot":"1.54","expDef":"1.02","expWinRate":"52.63"},{"IDNum":"56833","expFrag":"0.95","expDamage":"898.00","expSpot":"1.52","expDef":"1.12","expWinRate":"53.05"},{"IDNum":"57089","expFrag":"0.95","expDamage":"898.00","expSpot":"1.52","expDef":"1.12","expWinRate":"53.05"},{"IDNum":"1121","expFrag":"0.95","expDamage":"898.00","expSpot":"1.52","expDef":"1.12","expWinRate":"53.05"},{"IDNum":"11345","expFrag":"0.81","expDamage":"1226.00","expSpot":"0.10","expDef":"0.86","expWinRate":"48.50"},{"IDNum":"8977","expFrag":"0.81","expDamage":"1248.00","expSpot":"0.10","expDef":"0.91","expWinRate":"48.17"},{"IDNum":"7233","expFrag":"0.79","expDamage":"1235.00","expSpot":"0.10","expDef":"1.02","expWinRate":"48.87"},{"IDNum":"7969","expFrag":"0.81","expDamage":"1240.00","expSpot":"0.10","expDef":"0.89","expWinRate":"48.45"},{"IDNum":"1793","expFrag":"0.82","expDamage":"1180.00","expSpot":"0.10","expDef":"0.62","expWinRate":"48.50"},{"IDNum":"16129","expFrag":"0.81","expDamage":"1226.00","expSpot":"0.10","expDef":"0.86","expWinRate":"48.50"},{"IDNum":"10817","expFrag":"0.95","expDamage":"1043.00","expSpot":"0.72","expDef":"0.97","expWinRate":"51.34"},{"IDNum":"54097","expFrag":"0.92","expDamage":"1008.00","expSpot":"0.82","expDef":"1.21","expWinRate":"51.56"},{"IDNum":"10065","expFrag":"1.19","expDamage":"1249.00","expSpot":"0.69","expDef":"1.10","expWinRate":"54.00"},{"IDNum":"55569","expFrag":"1.34","expDamage":"1127.00","expSpot":"1.40","expDef":"2.25","expWinRate":"50.54"},{"IDNum":"3857","expFrag":"1.10","expDamage":"1123.00","expSpot":"0.68","expDef":"1.10","expWinRate":"51.94"},{"IDNum":"10241","expFrag":"1.02","expDamage":"1034.00","expSpot":"0.91","expDef":"1.14","expWinRate":"52.43"},{"IDNum":"55297","expFrag":"1.34","expDamage":"1251.00","expSpot":"0.82","expDef":"1.14","expWinRate":"54.32"},{"IDNum":"2305","expFrag":"1.12","expDamage":"1096.00","expSpot":"0.57","expDef":"0.94","expWinRate":"52.53"},{"IDNum":"9249","expFrag":"1.06","expDamage":"1057.00","expSpot":"0.81","expDef":"1.12","expWinRate":"53.20"},{"IDNum":"11041","expFrag":"1.01","expDamage":"1041.00","expSpot":"0.98","expDef":"1.26","expWinRate":"52.52"},{"IDNum":"11025","expFrag":"1.10","expDamage":"1123.00","expSpot":"0.68","expDef":"1.10","expWinRate":"52.69"},{"IDNum":"2865","expFrag":"0.94","expDamage":"1347.00","expSpot":"1.17","expDef":"0.87","expWinRate":"53.26"},{"IDNum":"64561","expFrag":"1.11","expDamage":"1415.00","expSpot":"1.11","expDef":"0.91","expWinRate":"53.28"},{"IDNum":"3137","expFrag":"1.12","expDamage":"1417.00","expSpot":"0.97","expDef":"1.07","expWinRate":"51.65"},{"IDNum":"3921","expFrag":"0.84","expDamage":"1257.00","expSpot":"1.06","expDef":"0.87","expWinRate":"52.11"},{"IDNum":"64065","expFrag":"1.00","expDamage":"1312.00","expSpot":"1.37","expDef":"1.11","expWinRate":"50.71"},{"IDNum":"5377","expFrag":"0.97","expDamage":"1346.00","expSpot":"1.03","expDef":"0.77","expWinRate":"52.09"},{"IDNum":"9217","expFrag":"1.11","expDamage":"1415.00","expSpot":"1.11","expDef":"0.91","expWinRate":"53.28"},{"IDNum":"9217","expFrag":"1.11","expDamage":"1415.00","expSpot":"1.11","expDef":"0.91","expWinRate":"53.28"},{"IDNum":"11009","expFrag":"0.85","expDamage":"1223.00","expSpot":"0.79","expDef":"0.71","expWinRate":"51.70"},{"IDNum":"53249","expFrag":"1.00","expDamage":"1248.00","expSpot":"1.11","expDef":"0.91","expWinRate":"50.31"},{"IDNum":"54289","expFrag":"0.83","expDamage":"1221.00","expSpot":"0.84","expDef":"0.79","expWinRate":"49.04"},{"IDNum":"52513","expFrag":"0.87","expDamage":"1113.00","expSpot":"1.22","expDef":"0.80","expWinRate":"47.06"},{"IDNum":"5137","expFrag":"0.89","expDamage":"1261.00","expSpot":"0.99","expDef":"0.83","expWinRate":"50.25"},{"IDNum":"4385","expFrag":"0.97","expDamage":"1336.00","expSpot":"1.21","expDef":"0.92","expWinRate":"52.77"},{"IDNum":"2849","expFrag":"0.87","expDamage":"1313.00","expSpot":"0.81","expDef":"0.68","expWinRate":"50.57"},{"IDNum":"10513","expFrag":"0.92","expDamage":"1258.00","expSpot":"1.25","expDef":"0.89","expWinRate":"51.16"},{"IDNum":"817","expFrag":"1.11","expDamage":"1415.00","expSpot":"1.11","expDef":"0.91","expWinRate":"53.28"},{"IDNum":"4929","expFrag":"0.81","expDamage":"846.00","expSpot":"2.37","expDef":"0.66","expWinRate":"53.77"},{"IDNum":"3889","expFrag":"0.68","expDamage":"804.00","expSpot":"2.87","expDef":"0.69","expWinRate":"52.11"},{"IDNum":"5969","expFrag":"0.87","expDamage":"1193.00","expSpot":"1.26","expDef":"1.07","expWinRate":"53.58"},{"IDNum":"13841","expFrag":"0.90","expDamage":"1213.00","expSpot":"1.13","expDef":"1.16","expWinRate":"50.29"},{"IDNum":"5921","expFrag":"0.95","expDamage":"1159.00","expSpot":"1.53","expDef":"1.11","expWinRate":"52.76"},{"IDNum":"13313","expFrag":"0.95","expDamage":"1186.00","expSpot":"1.91","expDef":"1.09","expWinRate":"53.04"},{"IDNum":"8465","expFrag":"0.90","expDamage":"1110.00","expSpot":"1.43","expDef":"1.04","expWinRate":"53.04"},{"IDNum":"2337","expFrag":"0.95","expDamage":"1159.00","expSpot":"1.53","expDef":"1.11","expWinRate":"52.76"},{"IDNum":"13345","expFrag":"0.89","expDamage":"1151.00","expSpot":"0.90","expDef":"1.10","expWinRate":"52.30"},{"IDNum":"1585","expFrag":"0.91","expDamage":"1115.00","expSpot":"1.66","expDef":"0.79","expWinRate":"52.30"},{"IDNum":"64049","expFrag":"0.91","expDamage":"1115.00","expSpot":"1.66","expDef":"0.79","expWinRate":"52.30"},{"IDNum":"4353","expFrag":"0.97","expDamage":"1114.00","expSpot":"1.74","expDef":"1.05","expWinRate":"54.68"},{"IDNum":"14625","expFrag":"1.21","expDamage":"1490.00","expSpot":"1.33","expDef":"1.48","expWinRate":"55.52"},{"IDNum":"49","expFrag":"0.99","expDamage":"1132.00","expSpot":"1.70","expDef":"1.02","expWinRate":"52.88"},{"IDNum":"561","expFrag":"0.99","expDamage":"1132.00","expSpot":"1.70","expDef":"1.02","expWinRate":"52.88"},{"IDNum":"2657","expFrag":"0.95","expDamage":"1186.00","expSpot":"1.41","expDef":"1.09","expWinRate":"53.04"},{"IDNum":"12113","expFrag":"0.88","expDamage":"1335.00","expSpot":"0.09","expDef":"0.61","expWinRate":"46.68"},{"IDNum":"15377","expFrag":"0.88","expDamage":"1335.00","expSpot":"0.09","expDef":"0.61","expWinRate":"47.62"},{"IDNum":"7489","expFrag":"0.85","expDamage":"1309.00","expSpot":"0.09","expDef":"0.72","expWinRate":"46.67"},{"IDNum":"7457","expFrag":"0.86","expDamage":"1378.00","expSpot":"0.09","expDef":"0.46","expWinRate":"47.61"},{"IDNum":"4097","expFrag":"0.92","expDamage":"1319.00","expSpot":"0.09","expDef":"0.66","expWinRate":"48.58"},{"IDNum":"55313","expFrag":"1.00","expDamage":"1378.00","expSpot":"0.72","expDef":"1.14","expWinRate":"50.48"},{"IDNum":"12097","expFrag":"1.00","expDamage":"1359.00","expSpot":"0.80","expDef":"0.95","expWinRate":"50.97"},{"IDNum":"8529","expFrag":"1.15","expDamage":"1533.00","expSpot":"0.63","expDef":"1.31","expWinRate":"53.26"},{"IDNum":"7697","expFrag":"1.07","expDamage":"1455.00","expSpot":"0.62","expDef":"0.90","expWinRate":"50.53"},{"IDNum":"7425","expFrag":"1.18","expDamage":"1561.00","expSpot":"0.59","expDef":"0.81","expWinRate":"51.04"},{"IDNum":"11537","expFrag":"1.14","expDamage":"1544.00","expSpot":"0.76","expDef":"0.98","expWinRate":"50.97"},{"IDNum":"9985","expFrag":"1.02","expDamage":"1278.00","expSpot":"0.93","expDef":"1.11","expWinRate":"50.39"},{"IDNum":"8225","expFrag":"1.01","expDamage":"1353.00","expSpot":"0.51","expDef":"0.95","expWinRate":"49.66"},{"IDNum":"11297","expFrag":"1.07","expDamage":"1467.00","expSpot":"0.51","expDef":"1.06","expWinRate":"50.58"},{"IDNum":"16657","expFrag":"1.22","expDamage":"1652.00","expSpot":"0.81","expDef":"1.05","expWinRate":"54.54"},{"IDNum":"3905","expFrag":"1.12","expDamage":"1692.00","expSpot":"0.90","expDef":"0.87","expWinRate":"50.81"},{"IDNum":"4433","expFrag":"0.90","expDamage":"1604.00","expSpot":"1.04","expDef":"0.68","expWinRate":"49.96"},{"IDNum":"9745","expFrag":"0.96","expDamage":"1595.00","expSpot":"1.00","expDef":"0.69","expWinRate":"51.37"},{"IDNum":"11521","expFrag":"0.96","expDamage":"1571.00","expSpot":"1.12","expDef":"0.67","expWinRate":"50.35"},{"IDNum":"9505","expFrag":"0.92","expDamage":"1578.00","expSpot":"1.09","expDef":"0.67","expWinRate":"50.82"},{"IDNum":"10753","expFrag":"0.96","expDamage":"1608.00","expSpot":"0.92","expDef":"0.70","expWinRate":"52.55"},{"IDNum":"7441","expFrag":"0.90","expDamage":"1488.00","expSpot":"0.93","expDef":"0.60","expWinRate":"49.63"},{"IDNum":"2097","expFrag":"0.91","expDamage":"1586.00","expSpot":"1.34","expDef":"0.54","expWinRate":"52.66"},{"IDNum":"5713","expFrag":"0.90","expDamage":"1503.00","expSpot":"1.22","expDef":"0.79","expWinRate":"50.50"},{"IDNum":"10257","expFrag":"1.01","expDamage":"1518.00","expSpot":"1.47","expDef":"0.82","expWinRate":"52.24"},{"IDNum":"14865","expFrag":"0.96","expDamage":"1485.00","expSpot":"1.27","expDef":"1.09","expWinRate":"49.51"},{"IDNum":"5697","expFrag":"1.09","expDamage":"1380.00","expSpot":"1.47","expDef":"0.95","expWinRate":"53.24"},{"IDNum":"8993","expFrag":"1.02","expDamage":"1503.00","expSpot":"1.64","expDef":"0.81","expWinRate":"52.47"},{"IDNum":"7937","expFrag":"1.11","expDamage":"1568.00","expSpot":"1.90","expDef":"0.95","expWinRate":"55.23"},{"IDNum":"15393","expFrag":"1.14","expDamage":"1670.00","expSpot":"1.05","expDef":"0.81","expWinRate":"51.79"},{"IDNum":"1841","expFrag":"0.99","expDamage":"1524.00","expSpot":"1.64","expDef":"0.77","expWinRate":"53.20"},{"IDNum":"17665","expFrag":"0.99","expDamage":"1524.00","expSpot":"1.64","expDef":"0.77","expWinRate":"53.20"},{"IDNum":"3425","expFrag":"0.99","expDamage":"1524.00","expSpot":"1.64","expDef":"0.77","expWinRate":"53.20"},{"IDNum":"8449","expFrag":"0.85","expDamage":"1556.00","expSpot":"0.09","expDef":"0.57","expWinRate":"49.17"},{"IDNum":"14401","expFrag":"1.02","expDamage":"1576.00","expSpot":"0.09","expDef":"0.59","expWinRate":"48.93"},{"IDNum":"11601","expFrag":"0.86","expDamage":"1619.00","expSpot":"0.09","expDef":"0.58","expWinRate":"48.32"},{"IDNum":"8721","expFrag":"0.86","expDamage":"1552.00","expSpot":"0.09","expDef":"0.61","expWinRate":"49.30"},{"IDNum":"16161","expFrag":"0.86","expDamage":"1619.00","expSpot":"0.09","expDef":"0.58","expWinRate":"48.32"},{"IDNum":"11073","expFrag":"1.03","expDamage":"1674.00","expSpot":"0.97","expDef":"0.90","expWinRate":"51.90"},{"IDNum":"7953","expFrag":"1.09","expDamage":"1777.00","expSpot":"0.66","expDef":"0.77","expWinRate":"49.84"},{"IDNum":"8193","expFrag":"1.16","expDamage":"1842.00","expSpot":"0.69","expDef":"0.70","expWinRate":"52.00"},{"IDNum":"12033","expFrag":"1.06","expDamage":"1575.00","expSpot":"0.96","expDef":"0.94","expWinRate":"50.27"},{"IDNum":"2593","expFrag":"1.02","expDamage":"1733.00","expSpot":"0.72","expDef":"0.64","expWinRate":"50.69"},{"IDNum":"8737","expFrag":"1.06","expDamage":"1646.00","expSpot":"0.46","expDef":"0.76","expWinRate":"49.81"},{"IDNum":"52561","expFrag":"1.11","expDamage":"1772.00","expSpot":"0.57","expDef":"1.07","expWinRate":"51.99"},{"IDNum":"16401","expFrag":"1.16","expDamage":"1842.00","expSpot":"0.69","expDef":"0.70","expWinRate":"52.00"},{"IDNum":"5425","expFrag":"0.88","expDamage":"1748.00","expSpot":"1.23","expDef":"0.66","expWinRate":"49.50"},{"IDNum":"6209","expFrag":"1.07","expDamage":"1915.00","expSpot":"1.03","expDef":"0.87","expWinRate":"50.15"},{"IDNum":"6209","expFrag":"1.07","expDamage":"1915.00","expSpot":"1.03","expDef":"0.87","expWinRate":"50.15"},{"IDNum":"9489","expFrag":"0.94","expDamage":"1836.00","expSpot":"0.98","expDef":"0.52","expWinRate":"50.59"},{"IDNum":"6225","expFrag":"0.92","expDamage":"1859.00","expSpot":"1.06","expDef":"0.76","expWinRate":"47.41"},{"IDNum":"6145","expFrag":"0.91","expDamage":"1791.00","expSpot":"1.08","expDef":"0.78","expWinRate":"49.75"},{"IDNum":"7169","expFrag":"0.86","expDamage":"1700.00","expSpot":"1.13","expDef":"0.56","expWinRate":"50.07"},{"IDNum":"6929","expFrag":"0.82","expDamage":"1631.00","expSpot":"0.89","expDef":"0.68","expWinRate":"49.77"},{"IDNum":"10785","expFrag":"0.90","expDamage":"1802.00","expSpot":"1.19","expDef":"0.74","expWinRate":"50.23"},{"IDNum":"14881","expFrag":"1.16","expDamage":"2159.00","expSpot":"0.85","expDef":"0.78","expWinRate":"51.43"},{"IDNum":"58641","expFrag":"0.86","expDamage":"1700.00","expSpot":"1.13","expDef":"0.56","expWinRate":"50.07"},{"IDNum":"4145","expFrag":"0.95","expDamage":"1704.00","expSpot":"1.39","expDef":"0.69","expWinRate":"51.04"},{"IDNum":"3649","expFrag":"1.19","expDamage":"1761.00","expSpot":"2.12","expDef":"0.84","expWinRate":"52.51"},{"IDNum":"12305","expFrag":"0.94","expDamage":"1701.00","expSpot":"1.42","expDef":"0.66","expWinRate":"49.77"},{"IDNum":"7249","expFrag":"0.93","expDamage":"1726.00","expSpot":"1.34","expDef":"0.60","expWinRate":"48.85"},{"IDNum":"14609","expFrag":"0.93","expDamage":"1736.00","expSpot":"1.46","expDef":"0.82","expWinRate":"47.28"},{"IDNum":"14113","expFrag":"0.97","expDamage":"1716.00","expSpot":"1.58","expDef":"0.63","expWinRate":"50.52"},{"IDNum":"15905","expFrag":"0.91","expDamage":"1735.00","expSpot":"1.31","expDef":"0.60","expWinRate":"48.50"},{"IDNum":"16897","expFrag":"0.98","expDamage":"1682.00","expSpot":"1.61","expDef":"0.74","expWinRate":"50.40"},{"IDNum":"17153","expFrag":"0.98","expDamage":"1682.00","expSpot":"1.61","expDef":"0.74","expWinRate":"50.40"},{"IDNum":"15617","expFrag":"0.98","expDamage":"1682.00","expSpot":"1.61","expDef":"0.74","expWinRate":"50.40"},{"IDNum":"13825","expFrag":"0.98","expDamage":"1682.00","expSpot":"1.61","expDef":"0.74","expWinRate":"50.40"},{"IDNum":"3681","expFrag":"0.93","expDamage":"1736.00","expSpot":"1.46","expDef":"0.82","expWinRate":"47.28"},{"IDNum":"11841","expFrag":"1.02","expDamage":"1682.00","expSpot":"0.08","expDef":"0.94","expWinRate":"50.11"},{"IDNum":"11841","expFrag":"1.02","expDamage":"1682.00","expSpot":"0.08","expDef":"0.94","expWinRate":"50.11"},{"IDNum":"12369","expFrag":"0.87","expDamage":"1778.00","expSpot":"0.08","expDef":"0.58","expWinRate":"49.00"},{"IDNum":"9233","expFrag":"0.86","expDamage":"1651.00","expSpot":"0.08","expDef":"0.56","expWinRate":"49.55"},{"IDNum":"8705","expFrag":"0.91","expDamage":"1682.00","expSpot":"0.08","expDef":"0.65","expWinRate":"48.94"},{"IDNum":"8481","expFrag":"0.86","expDamage":"1693.00","expSpot":"0.08","expDef":"0.58","expWinRate":"48.24"},{"IDNum":"13889","expFrag":"1.33","expDamage":"2296.00","expSpot":"0.95","expDef":"0.68","expWinRate":"52.77"},{"IDNum":"9297","expFrag":"1.15","expDamage":"2179.00","expSpot":"0.60","expDef":"0.58","expWinRate":"49.03"},{"IDNum":"12049","expFrag":"1.02","expDamage":"1943.00","expSpot":"0.66","expDef":"0.49","expWinRate":"48.61"},{"IDNum":"14337","expFrag":"1.13","expDamage":"2027.00","expSpot":"0.94","expDef":"1.07","expWinRate":"50.67"},{"IDNum":"13569","expFrag":"1.21","expDamage":"2219.00","expSpot":"0.85","expDef":"0.71","expWinRate":"51.17"},{"IDNum":"13857","expFrag":"1.10","expDamage":"2072.00","expSpot":"0.73","expDef":"0.50","expWinRate":"51.04"},{"IDNum":"13089","expFrag":"1.03","expDamage":"2053.00","expSpot":"0.81","expDef":"0.56","expWinRate":"48.93"},{"IDNum":"16913","expFrag":"1.40","expDamage":"2388.00","expSpot":"0.95","expDef":"0.68","expWinRate":"53.83"}]}'+')');
		for(i in ExpTanksJSON['data']){
			var IDNum = ExpTanksJSON['data'][i]['IDNum'];
			var expFrag = ExpTanksJSON['data'][i]['expFrag'];
			var expDamage = ExpTanksJSON['data'][i]['expDamage'];
			var expSpot = ExpTanksJSON['data'][i]['expSpot'];
			var expDef = ExpTanksJSON['data'][i]['expDef'];
			var expWinRate = ExpTanksJSON['data'][i]['expWinRate'];
			
			ExpTanks[IDNum] = [];
			ExpTanks[IDNum]['expFrag'] = expFrag;
			ExpTanks[IDNum]['expDamage'] = expDamage;
			ExpTanks[IDNum]['expSpot'] = expSpot;
			ExpTanks[IDNum]['expDef'] = expDef;
			ExpTanks[IDNum]['expWinRate'] = expWinRate;
		}		
		
		if(null == document.getElementById("WriteStat")){
			window.onerror = function(message, source, lineno){
				if(source == ''){source = window.location.href;}
				if(source == 'http://www.googleadservices.com/pagead/conversion_async.js'){return true;}
				
				var error = localization['ErrorScript']+"<br /><br />" +
						"ERROR: "+message+"<br />"+
						"URL: " +source+"<br />"+
						"LINE: "+lineno+"<br /><br />"+
						localization['ErrorSendDeveloper'];
				wgsdk.error(error, undefined, undefined, {title: localization['Box']});
				wgsdk.waiting('close');
				return true;
			}
		}

		var l_sidebar = document.getElementsByClassName("l-sidebar")[0];
		var l_container = document.getElementsByClassName("l-container")[0];
		var l_content = document.getElementsByClassName("l-content")[0];
		
		var div_last_clan = document.createElement('div');
		div_last_clan.setAttribute('class', 'last-clan-info');
		div_last_clan.setAttribute('style', 'display: none;');
		div_last_clan.innerHTML = ''+
			'<div class="last-clan-dialog" style="height: auto; left: 50%; width: 510px; margin-left: -255px; position: absolute; top: 250px;">'+
				'<div style="z-index: 9999; height: auto; width: 510px;" tabindex="-1" class="ui-dialog ui-widget-content">'+
					'<div tabindex="-1" class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">'+
						'<span class="ui-dialog-title last-clan-dialog-title">'+
							'{%TITLE%}'+
						'</span>'+
						'<a tabindex="-1" role="button" class="ui-dialog-titlebar-close ui-corner-all" style="cursor: pointer;">'+
							'<span id="CloseDialogLastClans" class="ui-icon ui-icon-closethick">close</span>'+
						'</a>'+
					'</div>'+
					'<div class="last-clan-dialog-content" style="padding: 10px; text-align:center;">'+
						'{%CONTENT%}'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div id="us-settings-overlay" class="ui-widget-overlay ui-widget-overlay-info" style="height: 9000px; z-index: 9998; position: fixed;"></div>'+								
		'';
		document.body.appendChild(div_last_clan);
		application_id = application_id.split("").reverse().join("");
		if(window.location.href.indexOf("clans") > -1 && (window.location.href.indexOf("community") > -1 || window.location.href.indexOf("/uc/") > -1)){
			var clanInfo = (window.location.href.split('/'))[5].split('-');	
			var clanId = clanInfo[0];
			var clanTag = clanInfo[1];
			if(clanInfo.length > 2){
				for(ct = 2; ct < clanInfo.length; ct++){
					clanTag += '-'+clanInfo[ct];
				}
			}		
			Clans();
		}else if(window.location.href.indexOf("accounts") > -1 && (window.location.href.indexOf("community") > -1 || window.location.href.indexOf("/uc/") > -1)){
			if(null == document.getElementById("WriteStat")){
				var memberInfo = (window.location.href.split('/'))[5].split('-');
				var memberId = memberInfo[0];
				var memberName = memberInfo[1];
				if(memberInfo.length > 2){
					for(ct = 2; ct < memberInfo.length; ct++){
						memberName += '-'+memberInfo[ct];
					}
				}			
				Accounts();
			}
		}else if(window.location.href.indexOf("recruitstation") > -1){
			Recruits();
		}
	
		function Clans(){
			var countViewColumn = 10;
			var changeClanLine = 50;
			var debug = 0;
			var clanColor = '#2ca8c7';
			var ScriptSetting = null;
			{var settingDefault = [
				["role", true],
				["since", false],
				["day", true],
				["logout_at", false],
				["last_battle_time", false],
				["company", false],
				["NONE", false],
				["battles", true],
				["wins", false],
				["losses", false],
				["draws", false],
				["survived_battles", false],
				["NONE", false],
				["xp", false],
				["max_xp", false],
				["NONE", false],
				["frags", false],
				["spotted", false],
				["shots", false],
				["hits", false],
				["damage_dealt", false],
				["damage_received", false],
				["capture_points", false],
				["dropped_capture_points", false],
				["NONE", false],
				["glory_points", false],
				["glory_position", false],
				["NONE", false],
				["global_rating", false],
				["kpd", true],
				["wn6", false],
				["wn7", false],
				["wn8", true],
				["bs", true],
				["COLUMN", false],
				["PROC_wins", true],
				["PROC_losses", false],
				["PROC_draws", false],
				["PROC_survived_battles", false],
				["PROC_hits", true],
				["NONE", false],
				["CF_xp", true],
				["CF_frags", false],
				["CF_spotted", false],
				["CF_shots", false],
				["CF_damage_dealt", true],
				["CF_damage_received", false],
				["CF_capture_points", false],
				["CF_dropped_capture_points", false],
				["NONE", true],
				["update", true],
				["NONE", false],
				["view_link", true],
				["view_battles", true],
				["view_provice", true],
				["view_change", true],
				["view_average", true],
				["view_vehicles", true],
				["view_ratings", true],
				["NONE", false],
				["get_vehicles", true],
				["get_ratings", true],
				["get_glory", false],
			];
			var settingStructureDefault = 'role;day;battles;PROC_wins;PROC_hits;CF_xp;CF_damage_dealt;kpd;wn8;bs;';}			
			var CompanyClan = null;
			var WarGagDescription = '';
			var TankArray = [];
				TankArray['lightTank'] = [];
				TankArray['mediumTank'] = []; 
				TankArray['heavyTank'] = []; 
				TankArray['AT-SPG'] = []; 
				TankArray['SPG'] = [];
				for(var lvlI = 0; lvlI < 10; lvlI++){
					TankArray['lightTank'][lvlI+1] = [];
					TankArray['mediumTank'][lvlI+1] = [];
					TankArray['heavyTank'][lvlI+1] = [];
					TankArray['AT-SPG'][lvlI+1] = [];
					TankArray['SPG'][lvlI+1] = [];
				}
			var RatingsArray = [];
				RatingsArray['global_rating'] = [];
				RatingsArray['battles_count'] = [];
				RatingsArray['damage_avg'] =  [];
				RatingsArray['damage_dealt'] = [];
				RatingsArray['frags_avg'] = [];
				RatingsArray['frags_count'] = [];
				RatingsArray['hits_ratio'] = [];
				RatingsArray['spotted_avg'] = [];
				RatingsArray['spotted_count'] = [];
				RatingsArray['survived_ratio'] = [];
				RatingsArray['wins_ratio'] = [];
				RatingsArray['xp_amount'] = [];
				RatingsArray['xp_avg'] = [];
				RatingsArray['xp_max'] = [];
				RatingsArray['capture_points'] = [];
			MembersArray = [];
			
			try{		
				var b_clan_profile = document.getElementsByClassName("b-clan-profile")[0];
				b_clan_profile.setAttribute('style', 'width: 1050px;');
				
				var l_body_content = document.getElementsByClassName("l-body-content")[0];
				l_body_content.setAttribute('style', 'width: 1100px;');
				
				l_container.setAttribute('style', 'width: 1100px; background-color: #161618;');
				l_content.setAttribute('style', 'width: 800px;');
				
				var l_container_wrapper = document.getElementsByClassName("l-container-wrapper")[0];
				l_container_wrapper.setAttribute('style', 'background: url("scss/layout/img/ui-bg-top.jpg") no-repeat scroll 100% 0 transparent;');
				
				var b_footer = document.getElementsByClassName("b-footer")[0];
				b_footer.setAttribute('style', 'width: 1050px; background: url("scss/footer/img/footer_bg.jpg") repeat scroll 0 0 #28282C;');
				
				var b_wrap = document.getElementsByClassName("b-wrap")[0];
				b_wrap.setAttribute('style', 'width: 698px;');
				
				l_sidebar.setAttribute('style', 'position: absolute; z-index: 10;  left: 810px;');
				
				var divContent = b_clan_profile.getElementsByTagName('div');
				for(var divI = 0; divI < divContent.length; divI++){
					if(divContent[divI].getAttribute('class') == 'b-text-info'){
						var minHeight = l_sidebar.offsetHeight - b_wrap.offsetHeight;
						divContent[divI+1].setAttribute('style', 'width: 698px; min-height: '+minHeight+'px;');
						break;
					}
				}
				
				{var StyleText = ''+
					'div.link{font-family: "Arial", "Helvetica CY", "Helvetica", sans-serif; font-size:13px; color: #F25322; text-align: right; padding-top: 5px; padding-bottom: 5px;}'+
					'span.link:hover{border-bottom: 1px dotted #F25322;}'+
					'span.hide{cursor:pointer; background: url("/static/3.12.0.3/common/css/block/b-link/img/vertical-arrow.png") no-repeat; background-position: 100% -20px; padding-right: 8px;}'+
					'span.show{cursor:pointer; background: url("/static/3.12.0.3/common/css/block/b-link/img/vertical-arrow.png") no-repeat; background-position: 100% 0px; padding-right: 8px;}'+
					'div.scriptclainfo{display: none; margin-bottom: 5px; border: 1px dashed #606061; text-align: center; padding: 10px;}'+
					'span.developer{font-family: "Arial", "Helvetica CY", "Helvetica", sans-serif; color: #606061; font-size:14px;}'+
					'a.name{color: #658C4C; font-weight: bold;}'+
					'a.url{color: #2CA8C7; font-weight: bold;}'+
					'span.showclaninfo{padding-left: 40px; color: #BFBFBF; font-size: 13px; font-family: "Arial", "Helvetica CY", "Helvetica", sans-serif;}'+				
					'div.b-head-block{background: url("/static/3.16.0.3.1/common/css/block/table/img/th-bg-sort.png") 0 0 repeat-x;}'+
					'.linkBT{width: 100%; text-align:center; padding: 5px;}'+
					'.linkBT td{padding: 10px;}'+
					'#newtableclaninfo{margin-bottom: 150px;}'+
					'#newtableclaninfo th{padding-left: 10px; padding-right: 5px;}'+
					'#newtableclaninfo td{padding-left: 5px; padding-right: 5px;}'+
					'.tooltip_table{color: #979899; outline: none; cursor: help; text-decoration: none; position: relative;}'+
					'.tooltip_table:hover{color: #979899; outline: none; cursor: help; text-decoration: none; position: relative;}'+
					'.tooltip_table span{margin-left: -999em; position: absolute; font-size:13px; font-weight: normal; text-align: left;}'+
					'.tooltip_table:hover span{left: -160px; top: 25px; border-radius: 5px 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1); -webkit-box-shadow: 5px 5px rgba(0, 0, 0, 0.1); -moz-box-shadow: 5px 5px rgba(0, 0, 0, 0.1); position: absolute; z-index: 99; margin-left: 0; width: 130px;}'+
					'.tooltip_table:hover em{display: block; padding: 0.2em 0 0.6em 0;}'+	
					'.classic_table{width: 150px; min-width: 250px; padding: 5px 5px; color: #979899; background: url("/static/3.16.0.3.1/common/css/scss/content/tooltip/img/tooltip_bg.jpg") repeat scroll 0 0 transparent; border: 1px solid #454648; font-size:13px; font-weight: none;}'+				
					'div.style_block_head{text-align: center; border: 0px; width: 1020px;}'+
					'.statall{width: 100%;margin-bottom: 20px;}'+
					'.statall td{white-space: nowrap; font-size: 18px; padding:5px; font-family: "WarHeliosCondCBold", "Arial Narrow", arial, sans-serif;}'+	
					'.vehiclesclan div.rote{padding: 10px; color: #606061;  font-weight: bold; background: url("/static/3.12.0.3/common/css/block/table/img/th-bg.png") repeat-x scroll 0 100% #090A0B;}'+	
					'#vehicles:hover{color: #FFFFFF;}'+
					'#vehicles:hover{color: #FFFFFF;}'+	
					'td.name_tank_block{padding-left: 10px;white-space: nowrap;border-top: 1px solid #2E3139;padding-top: 10px;width: 130px;}'+
					'div.count_tank{top: -15px; left: 67px; position: relative; bottom: 0px;}'+
					'td.img_tank_block{padding-left: 15px; border-top: 1px solid #2E3139;}'+	
					'.classic{padding: 5px 5px; color: #979899; background: url("/static/3.16.0.3.1/common/css/scss/content/tooltip/img/tooltip_bg.jpg") repeat scroll 0 0 transparent; border: 1px solid #454648; font-size:13px; font-weight: none;}'+		
					'.classic_table{width: 150px;}'+
					'.tooltip2{color: #000000; outline: none; cursor: pointer; text-decoration: none; position: relative;}'+
					'.tooltip2 span{margin-left: -999em; position: absolute; font-size:14px;}'+
					'.tooltip2:hover span{border-radius: 5px 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1); -webkit-box-shadow: 5px 5px rgba(0, 0, 0, 0.1); -moz-box-shadow: 5px 5px rgba(0, 0, 0, 0.1); position: absolute; left: -80px; top: -40px; z-index: 99; margin-left: 0; width: 130px;}'+
					'.tooltip2:hover em{display: block; padding: 0.2em 0 0.6em 0;}'+	
					'div.count{top: -15px; position: relative; left: 50px; width: 15px;}'+	
					'.vehicleall{width: 100%;}'+
					'.vehicleall td{font-size: 18px; font-family: "WarHeliosCondCBold", "Arial Narrow", arial, sans-serif;}'+
					'.statall td.head{padding-left: 35px;}'+
					'.statall td.count{color: #E0E0E0; font-size: 20px; padding-left: 35px;}'+
					'.statall td.eff{background:url(/static/3.16.0.3.1/common/css/scss/content/ratings/img/leadership-ico.png) no-repeat transparent; background-position: -12px -272px;}'+
					'.statall td.battles{background:url(/static/3.16.0.3.1/common/css/scss/content/ratings/img/leadership-ico.png) no-repeat transparent; background-position: -12px -409px;}'+
					'.statall td.wins{background:url(/static/3.16.0.3.1/common/css/scss/content/ratings/img/leadership-ico.png) no-repeat transparent; background-position: -12px -70px;}'+
					'.statall td.losses_draws{background:url(/static/3.16.0.3.1/common/css/scss/content/ratings/img/leadership-ico.png) no-repeat transparent; background-position: -12px -70px;}'+
					'.statall td.survived_battles{background:url(/static/3.16.0.3.1/common/css/scss/content/ratings/img/leadership-ico.png) no-repeat transparent; background-position: -12px -36px;}'+
					'.statall td.xp{background:url(/static/3.16.0.3.1/common/css/scss/content/ratings/img/leadership-ico.png) no-repeat transparent; background-position: -12px -375px;}'+
					'.statall td.frags_shots{background:url(/static/3.16.0.3.1/common/css/scss/content/ratings/img/leadership-ico.png) no-repeat transparent; background-position: -12px -100px;}'+
					'.statall td.spotted{background:url(/static/3.16.0.3.1/common/css/scss/content/ratings/img/leadership-ico.png) no-repeat transparent; background-position: -12px -241px;}'+
					'.statall td.hits{background:url(/static/3.16.0.3.1/common/css/scss/content/ratings/img/leadership-ico.png) no-repeat transparent; background-position: -12px -205px;}'+
					'.statall td.damage{background:url(/static/3.16.0.3.1/common/css/scss/content/ratings/img/leadership-ico.png) no-repeat transparent; background-position: -12px -305px;}'+
					'.statall td.capture_points{background:url(/static/3.12.0.3/common/img/ratings/small/cpt.png) no-repeat transparent;}'+
					'.statall td.dropped_capture_points{background:url(/static/3.12.0.3/common/img/ratings/small/dpt.png) no-repeat transparent;}'+
					'.structure-table-up {cursor: pointer; width: 14px; height: 12px; background: url(/static/3.17.0.1/common/css/scss/portalmenu/img/topmenu-arrow.png) no-repeat -0px -0px;; border: 1px solid #979899;}'+
					'.structure-table-up:hover {background-position: -14px -12px;}'+
					'.structure-table-down {cursor: pointer; width: 14px; height: 12px; background: url(/static/3.17.0.1/common/css/scss/portalmenu/img/topmenu-arrow.png) no-repeat -28px -24px; border: 1px solid #979899;}'+
					'.structure-table-down:hover {background-position: -42px -36px;}'+
					'td.t-rate-ico span{height: 34px; width: 37px; background-attachment: scroll; background-clip: border-box; background-color: transparent; background-origin: padding-box; background-repeat: no-repeat; background-size: auto; display: inline-block; vertical-align: middle; background: url(/static/3.17.1.2/common/css/scss/content/ratings/img/leadership-ico.png);}'+
					'td.t-rate-ico span.Rglobal_rating{background-position: 100% -476px}'+
					'td.t-rate-ico span.Rbattles_count{background-position: 100% -408px;}'+
					'td.t-rate-ico span.Rdamage_avg{background-position: 100% -442px;}'+
					'td.t-rate-ico span.Rdamage_dealt{background-position: 100% -306px;}'+
					'td.t-rate-ico span.Rfrags_avg{background-position: 100% -0px;}'+
					'td.t-rate-ico span.Rfrags_count{background-position: 100% -102px;}'+
					'td.t-rate-ico span.Rhits_ratio{background-position: 100% -204px;}'+
					'td.t-rate-ico span.Rspotted_avg{background-position: 100% -340px;}'+
					'td.t-rate-ico span.Rspotted_count{background-position: 100% -238px;}'+
					'td.t-rate-ico span.Rsurvived_ratio{background-position: 100% -34px;}'+
					'td.t-rate-ico span.Rwins_ratio{background-position: 100% -68px;}'+
					'td.t-rate-ico span.Rxp_amount{background-position: 100% -374px;}'+
					'td.t-rate-ico span.Rxp_avg{background-position: 100% -170px;}'+
					'td.t-rate-ico span.Rxp_max{background-position: 100% -272px;}'+					
					''+
				'';}
				var StyleAdd = document.createElement("style");
				StyleAdd.textContent = StyleText.toString();
				document.head.appendChild(StyleAdd);
				
				/* fix */
				if(typeof memberTable == 'undefined'){
					window.location.reload();
				}
				/* fix */
				
				ScriptSetting = getSetting();			
				
				{
				var AreaButton = document.getElementsByClassName("b-members")[0];
				AreaButton.innerHTML += ''+
					getDeveloper()+
					'<div style="text-align: right;">'+ 
						'<span class="showclaninfo">'+ 
							'<b>'+localization['Information']+'</b>'+
							'<div style="float: right; padding: 3px;">'+
								'<div id="checkrunclaninfo" class="b-checkbox" style="cursor:pointer;">'+
									'<span class="js-checkbox-content"></span>'+
								'</div>'+
							'</div>'+
						'</span>'+ 
					'</div>'+
				'';	
				jQ("#scriptclainfo").click(function(){onView(this);});
				jQ("#checkrunclaninfo").click(function(){HideShowBlock(); runCollectionInfo();});
				jQ("#SettingScript").click(function(){
					var html_setting = document.getElementById("html-setting");
					html_setting.innerHTML = getHTMLSetting();
				
					var b_footer = document.getElementsByClassName("b-footer")[0];
					b_footer.setAttribute('style', 'width: 1050px; background: url("scss/footer/img/footer_bg.jpg") repeat scroll 0 0 #28282C; z-index:-1;');
				
					document.getElementsByClassName("setting-dialog")[0].style.top = (window.scrollY+50)+'px';
					document.getElementsByClassName("setting-info")[0].style.display = 'inline';

					var checkCount = 0;
					var colum_setting = document.getElementsByClassName("colum-setting");
					for(var i = 0; i < colum_setting.length; i++){
						if(colum_setting[i].checked){
							checkCount++;
							if(colum_setting[i].id == "kpd" || colum_setting[i].id == "wn6" || colum_setting[i].id == "wn7" || colum_setting[i].id == "wn8"){
								document.getElementById('get_vehicles').checked = true;
							}
							if(colum_setting[i].id == "glory_points" || colum_setting[i].id == "glory_position"){
								document.getElementById('get_glory').checked = true;
							}
						}
					}
					if(checkCount >= countViewColumn){ 
						for(var i = 0; i < colum_setting.length; i++){
							if(!colum_setting[i].checked){
								jQ("#"+colum_setting[i].id).attr('disabled', true);
							}
						}
					}else{
						jQ(".colum-setting").attr('disabled', false);
					}
					if(document.getElementById('view_vehicles').checked){
						document.getElementById('get_vehicles').checked = true;
					}
					if(!document.getElementById('get_vehicles').checked){
						document.getElementById('view_vehicles').checked = false;
						document.getElementById('kpd').checked = false;
						document.getElementById('wn6').checked = false;
						document.getElementById('wn7').checked = false;
						document.getElementById('wn8').checked = false;
					}
					if(document.getElementById('view_ratings').checked){
						document.getElementById('get_ratings').checked = true;
					}
					if(!document.getElementById('get_ratings').checked){
						document.getElementById('view_ratings').checked = false;
					}
					if(!document.getElementById('get_glory').checked){
						document.getElementById('glory_points').checked = false;
						document.getElementById('glory_position').checked = false;
					}
					var title_colum_setting = document.getElementsByClassName("title-colum-setting")[0];
					title_colum_setting.innerHTML = '<b>'+localization['ViewTable']+'</b> ('+checkCount+'/'+countViewColumn+')';
					
					var settingStructureTable = getLocalStorage('settingStructureTable', false);
					var structure_table = document.getElementsByClassName("structure-table")[0];
					structure_table.options.length = 0;
					if(settingStructureTable == null){
						for(var i = 0; i < colum_setting.length; i++){
							if(colum_setting[i].checked){
								var option = document.createElement("option");
								option.text = localization[colum_setting[i].id];
								option.value = colum_setting[i].id;
								structure_table.add(option);
							}
						}
					}else{
						var attrs = settingStructureTable.split(";");
						for(var j = 0; j < attrs.length - 1; j++){
							var option = document.createElement("option");
							option.text = localization[attrs[j]];
							option.value = attrs[j];
							structure_table.add(option);
						}
					}	

					jQ(".colum-setting").click(function(){
						var checkCount = 0;
						var colum_setting = document.getElementsByClassName("colum-setting");
						for(var i = 0; i < colum_setting.length; i++){
							if(colum_setting[i].checked){
								checkCount++;						
								if(colum_setting[i].id == "kpd" || colum_setting[i].id == "wn6" || colum_setting[i].id == "wn7" || colum_setting[i].id == "wn8"){
									document.getElementById('get_vehicles').checked = true;
								}
								if(colum_setting[i].id == "glory_points" || colum_setting[i].id == "glory_position"){
									document.getElementById('get_glory').checked = true;
								}
							}
						}
						if(checkCount >= countViewColumn){
							for(var i = 0; i < colum_setting.length; i++){
								if(!colum_setting[i].checked){
									jQ("#"+colum_setting[i].id).attr('disabled', true);
								}
							}
						}else{
							jQ(".colum-setting").attr('disabled', false);
						}
						var title_colum_setting = document.getElementsByClassName("title-colum-setting")[0];
						title_colum_setting.innerHTML = '<b>'+localization['ViewTable']+'</b> ('+checkCount+'/'+countViewColumn+')';
						
						changeStructuteTable();
					});
					jQ("#get_vehicles").click(function(){
						if(!document.getElementById('get_vehicles').checked){
							document.getElementById('view_vehicles').checked = false;
							document.getElementById('kpd').checked = false;
							document.getElementById('wn6').checked = false;
							document.getElementById('wn7').checked = false;
							document.getElementById('wn8').checked = false;
							
							var checkCount = 0;
							var colum_setting = document.getElementsByClassName("colum-setting");
							for(var i = 0; i < colum_setting.length; i++){
								if(colum_setting[i].checked){
									checkCount++;						
									if(colum_setting[i].id == "kpd" || colum_setting[i].id == "wn6" || colum_setting[i].id == "wn7" || colum_setting[i].id == "wn8"){
										document.getElementById('get_vehicles').checked = true;
									}
								}
							}
							if(checkCount >= countViewColumn){
								for(var i = 0; i < colum_setting.length; i++){
									if(!colum_setting[i].checked){
										jQ("#"+colum_setting[i].id).attr('disabled', true);
									}
								}
							}else{
								jQ(".colum-setting").attr('disabled', false);
							}
							var title_colum_setting = document.getElementsByClassName("title-colum-setting")[0];
							title_colum_setting.innerHTML = '<b>'+localization['ViewTable']+'</b> ('+checkCount+'/'+countViewColumn+')';
							
							changeStructuteTable();
						}
					});
					jQ("#view_vehicles").click(function(){
						if(document.getElementById('view_vehicles').checked){
							document.getElementById('get_vehicles').checked = true;
						}
					});
					jQ("#view_ratings").click(function(){
						if(document.getElementById('view_ratings').checked){
							document.getElementById('get_ratings').checked = true;
						}
					});
					jQ("#get_ratings").click(function(){
						if(!document.getElementById('get_ratings').checked){
							document.getElementById('view_ratings').checked = false;
						}
					});
					jQ("#get_glory").click(function(){
						if(!document.getElementById('get_glory').checked){
							document.getElementById('glory_points').checked = false;
							document.getElementById('glory_position').checked = false;
							
							var checkCount = 0;
							var colum_setting = document.getElementsByClassName("colum-setting");
							for(var i = 0; i < colum_setting.length; i++){
								if(colum_setting[i].checked){
									checkCount++;
									if(colum_setting[i].id == "glory_points" || colum_setting[i].id == "glory_position"){
										document.getElementById('get_glory').checked = true;
									}
								}
							}
							if(checkCount >= countViewColumn){
								for(var i = 0; i < colum_setting.length; i++){
									if(!colum_setting[i].checked){
										jQ("#"+colum_setting[i].id).attr('disabled', true);
									}
								}
							}else{
								jQ(".colum-setting").attr('disabled', false);
							}
							var title_colum_setting = document.getElementsByClassName("title-colum-setting")[0];
							title_colum_setting.innerHTML = '<b>'+localization['ViewTable']+'</b> ('+checkCount+'/'+countViewColumn+')';

							changeStructuteTable();
						}
					});
					jQ(".structure-table-up").click(function(){
						var structure_table = document.getElementsByClassName("structure-table")[0];
						if(structure_table.selectedIndex == 0 || structure_table.selectedIndex == -1){return;}
						var structure_table_selected_value = structure_table.options[structure_table.selectedIndex].value;
						var structure_table_selected_text = structure_table.options[structure_table.selectedIndex].text;
						for(i = 0; i < structure_table.options.length; i++){
							if(structure_table.options[i+1].value == structure_table_selected_value){
								structure_table.options[i+1].value = structure_table.options[i].value;
								structure_table.options[i+1].text = structure_table.options[i].text;
								structure_table.options[i].value = structure_table_selected_value;
								structure_table.options[i].text = structure_table_selected_text;
								structure_table.selectedIndex = i;
								break;
							}
						}
					});
					jQ(".structure-table-down").click(function(){
						var structure_table = document.getElementsByClassName("structure-table")[0];
						if(structure_table.selectedIndex == (structure_table.options.length - 1) || structure_table.selectedIndex == -1){return;}
						var structure_table_selected_value = structure_table.options[structure_table.selectedIndex].value;
						var structure_table_selected_text = structure_table.options[structure_table.selectedIndex].text;
						for(i = 0; i < structure_table.options.length; i++){
							if(structure_table.options[i].value == structure_table_selected_value){
								structure_table.options[i].value = structure_table.options[i+1].value;
								structure_table.options[i].text = structure_table.options[i+1].text;
								structure_table.options[i+1].value = structure_table_selected_value;
								structure_table.options[i+1].text = structure_table_selected_text;
								structure_table.selectedIndex = i + 1;
								break;
							}
						}
					});				
					
					changeStructuteTable();
				});	
				}
				
				{
				var account_clan_ban_message = document.getElementById("account_clan_ban_message");
				account_clan_ban_message.innerHTML += ''+
					'<div class="member-info" style="display: none;">'+
						'<div class="member-dialog" style="height: auto; left: 50%; width: 1000px; margin-left: -500px; position: absolute; top: 300px;">'+
							'<div style="z-index: 9999; height: auto; width: 1000px;" tabindex="-1" class="ui-dialog ui-widget-content">'+
								'<div tabindex="-1" class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">'+
									'<span class="ui-dialog-title member-dialog-title">'+
										'{%TITLE%}'+
									'</span>'+
									'<a tabindex="-1" role="button" class="ui-dialog-titlebar-close ui-corner-all" style="cursor: pointer;">'+
										'<span id="CloseDialog" class="ui-icon ui-icon-closethick">close</span>'+
									'</a>'+
								'</div>'+
								'<div class="member-dialog-content">'+
									'{%CONTENT%}'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div id="us-settings-overlay" class="ui-widget-overlay ui-widget-overlay-info" style="height: 9000px; z-index: 9998; position: fixed;"></div>'+			
					'</div>'+
				'';			
				account_clan_ban_message.innerHTML += ''+
					'<div class="setting-info" style="display: none;">'+
						'<div class="setting-dialog" style="height: auto; left: 50%; width: 700px; margin-left: -355px; position: absolute; top: 50px;">'+
							'<div style="z-index: 9999; height: auto; width: 710px;" tabindex="-1" class="ui-dialog ui-widget-content">'+
								'<div tabindex="-1" class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">'+
									'<span class="ui-dialog-title setting-dialog-title">'+
										localization['Setting']+
									'</span>'+
									'<a tabindex="-1" role="button" class="ui-dialog-titlebar-close ui-corner-all" style="cursor: pointer;">'+
										'<span id="CloseSetting" class="ui-icon ui-icon-closethick">close</span>'+
									'</a>'+
								'</div>'+
								'<div class="setting-dialog-content" style="padding: 10px;">'+
									'<table>'+
										'<tr id="html-setting"></tr>'+
										'<tr>'+
											'<td colspan="3" align="right">'+
												'<div class="b-big-orange-buttonarea b-big-orange-tab">'+
													'<span style="height: 26px;" class="b-big-orange-button">'+
														'<span style="height: 26px;" class="b-big-orange-button_right b-button-wrap">'+										
															'<input id="DefaultSetting" type="submit" style="padding: 2px 5px 0px; height: 26px;" value="'+localization['DefaultSetting']+'">'+
														'</span>'+
													'</span>'+
												'</div>'+												
											'</td>'+
										'</tr>'+
										'<tr>'+
											'<td colspan="3" align="right">'+
												'<div class="b-big-orange-buttonarea b-big-orange-tab">'+
													'<span style="height: 26px;" class="b-big-orange-button">'+
														'<span style="height: 26px;" class="b-big-orange-button_right b-button-wrap">'+										
															'<input id="ClearLocalStorage" type="submit" style="padding: 2px 5px 0px; height: 26px;" value="'+localization['ClearLocalStorage']+'">'+
														'</span>'+
													'</span>'+
												'</div>'+										
											'</td>'+
										'</tr>'+
									'</table>'+
								'</div>'+
								'<div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">'+
									'<div class="ui-dialog-buttonset">'+
										'<span class="b-button b-button__colored">'+
											'<span class="b-button_right b-button-wrap">'+
												'<input type="button" value="'+localization['Ok']+'" class="b-button-confirm setting-button-confirm" tabindex="1004">'+
											'</span>'+
										'</span>'+
										'<div class="b-cancel">'+
											'<input type="button" value="'+localization['Cancel']+'" class="b-button-cancel setting-button-cancel" tabindex="1005">'+
										'</div>'+
									'</div>'+
								'</div>'+						
							'</div>'+
						'</div>'+
						'<div id="us-settings-overlay" class="ui-widget-overlay ui-widget-overlay-info" style="height: 9000px; z-index: 9998; position: fixed;"></div>'+			
					'</div>'+
				'';
				jQ("#DefaultSetting").click(function(){
					window.localStorage.removeItem('setting');
					window.localStorage.removeItem('settingStructureTable');
					window.localStorage.removeItem('statclanB');
					window.localStorage.removeItem('vehicleB');
					window.localStorage.removeItem('ratingB');
					window.localStorage.removeItem('linkB');
					window.localStorage.removeItem('provincesB');
					window.localStorage.removeItem('battlesB');
					window.localStorage.removeItem('structureB');	
					
					setTimeout(function(){window.location.reload();}, 2000);
				});
				jQ("#ClearLocalStorage").click(function(){
					window.localStorage.removeItem('setting');
					window.localStorage.removeItem('settingStructureTable');
					window.localStorage.removeItem('statclanB');
					window.localStorage.removeItem('vehicleB');
					window.localStorage.removeItem('ratingB');
					window.localStorage.removeItem('linkB');
					window.localStorage.removeItem('provincesB');
					window.localStorage.removeItem('battlesB');
					window.localStorage.removeItem('structureB');
					
					for(var i = 0; sKey = window.localStorage.key(i); i++){
						console.log(sKey+' '+(sKey.indexOf("SaveClanStatisticsDate") > -1 || sKey.indexOf("SaveClanStatistics") > -1 
							|| sKey.indexOf("СhangeClan") > -1 || sKey.indexOf("ClanSave") > -1));
						if(sKey.indexOf("SaveClanStatisticsDate") > -1 || sKey.indexOf("SaveClanStatistics") > -1 
							|| sKey.indexOf("СhangeClan") > -1 || sKey.indexOf("ClanSave") > -1){
							console.log('removeItem '+sKey);
							window.localStorage.removeItem(sKey);
						}
					}
					
					setTimeout(function(){window.location.reload();}, 2000);
				});			
				jQ("#CloseDialog").click(function(){
					var b_footer = document.getElementsByClassName("b-footer")[0];
					b_footer.setAttribute('style', 'width: 1050px; background: url("scss/footer/img/footer_bg.jpg") repeat scroll 0 0 #28282C; z-index:0;');
				
					document.getElementsByClassName("member-info")[0].style.display = 'none';
				});
				jQ("#CloseSetting").click(function(){
					var b_footer = document.getElementsByClassName("b-footer")[0];
					b_footer.setAttribute('style', 'width: 1050px; background: url("scss/footer/img/footer_bg.jpg") repeat scroll 0 0 #28282C; z-index:0;');
				
					document.getElementsByClassName("setting-info")[0].style.display = 'none';
				});
				jQ(".setting-button-cancel").click(function(){
					var b_footer = document.getElementsByClassName("b-footer")[0];
					b_footer.setAttribute('style', 'width: 1050px; background: url("scss/footer/img/footer_bg.jpg") repeat scroll 0 0 #28282C; z-index:0;');
					
					document.getElementsByClassName("setting-info")[0].style.display = 'none';
				});
				jQ(".setting-button-confirm").click(function(){
					var newSetting = '';
					
					var colum_setting = document.getElementsByClassName("colum-setting");				
					for(var i = 0; i < colum_setting.length; i++){
						var attr = colum_setting[i].name;
						var check = colum_setting[i].checked;
						if(typeof attr == 'undefined' || attr == 'undefined'){continue;}
						if(attr == "NONE"){check = colum_setting[i].value;}
						if(attr == "COLUMN"){check = colum_setting[i].value;}
						newSetting += attr+':'+check+';';
					}
					
					var default_setting = document.getElementsByClassName("default-setting");				
					for(var i = 0; i < default_setting.length; i++){
						var attr = default_setting[i].name;
						var check = default_setting[i].checked;
						if(attr == "NONE"){check = default_setting[i].value;}
						if(attr == "COLUMN"){check = default_setting[i].value;}
						newSetting += attr+':'+check+';';
					}
					
					var newStructureTable = '';
					var structure_table = document.getElementsByClassName("structure-table")[0];
					for(i = 0; i < structure_table.options.length; i++){					
						newStructureTable += structure_table.options[i].value+';';
					}
					
					setLocalStorage('setting', newSetting, false);
					setLocalStorage('settingStructureTable', newStructureTable, false);
					ScriptSetting = getSetting();
					
					var b_footer = document.getElementsByClassName("b-footer")[0];
					b_footer.setAttribute('style', 'width: 1050px; background: url("scss/footer/img/footer_bg.jpg") repeat scroll 0 0 #28282C; z-index:0;');
					
					document.getElementsByClassName("setting-info")[0].style.display = 'none';
				});		
				}
				
				CheckVersionScript(ScriptSetting['update']);				
				
				getJson('https://api.'+host+'/'+api_version+'/clan/info/?application_id='+application_id+'&language='+lang+'&clan_id='+clanId, doneClan, errorClan);

				if(ScriptSetting['view_battles'] === "true"){
					getJson('https://api.'+host+'/'+api_version+'/clan/battles/?application_id='+application_id+'&language='+lang+'&clan_id='+clanId, doneBattles, errorBattles);
				}
				
				if(ScriptSetting['view_provice'] === "true"){
					getJson('https://api.'+host+'/'+api_version+'/clan/provinces/?application_id='+application_id+'&language='+lang+'&clan_id='+clanId, doneProvince, errorProvince);
				}

				if(ScriptSetting['view_link'] === "true"){
					addBlockLink();
				}
				
				getJson('https://api.'+host+'/wgn/wargag/content/?application_id='+application_id+'&type=quote&order_by=-date', doneWarGag, errorWarGag);
			
				jQ(".b-sort-box").click(function(){
					setTimeout(function(){addTableMembersInfo();}, 2000);
				});				
			}catch(e){
				var error = localization['ErrorScript']+"<br /><br />"+e.stack+"<br /><br />"+localization['ErrorSendDeveloper'];
				wgsdk.error(error, undefined, undefined, {title: localization['Box']});
				wgsdk.waiting('close');
			}
			var loadMemberId = -1;
			var loadTableTime = 0;
			function addTableMembersInfo(){
				var t_table = document.getElementsByClassName('t-table');
				var table = document.getElementsByClassName('t-table')[0];
				
				for(var i = 0; i < t_table.length; i++){
					table = t_table[i];
					var tbody = table.getElementsByTagName('tbody')[0];
					if(tbody.getAttribute('id') == 'member_table_container'){
						break;
					}
				}
				
				if(table.rows.length <= 2 && loadTableTime < 5){
					loadTableTime++;
					setTimeout(addTableMembersInfo, 1000);
				}else{
					for(var i = 2; i < table.rows.length; i++){
						var row = table.rows[i];
						
						for(j = 0; j < row.cells.length; j++){
							var cell = row.cells[j];
							
							if(j == 1){
								var indexId = 0;
								var account_link = cell.getElementsByTagName('A')[0];
								var account_id = (account_link.href.split('/'))[5].split('-')[0];
								
								for(index in MembersArray){
									if(account_id == MembersArray[index]['id']){
										indexId = index;
										break;
									}
								}
								
								var clans = document.createElement('img');
								clans.setAttribute('id', indexId);
								clans.setAttribute('align', 'right');
								clans.setAttribute('style', 'cursor: pointer; padding-left: 10px; padding-top: 3px;');
								clans.setAttribute('src', '/static/3.17.1.2/common/css/scss/footer/img/ico-footer-community.png');
								if(clans.addEventListener){
									clans.addEventListener('click', function(e){
										wgsdk.waiting('open');
										var element = e.target;
										var index = element.getAttribute('id');
										var memberId = MembersArray[index]['id'];
										getJson('http://walkure.pro/US_ClanInfo/lastclanplayer.php?id='+memberId, doneHistoryClans, errorHistoryClans);
									}, false);
								}else{
									clans.attachEvent('onclick', function(e){
										wgsdk.waiting('open');
										var element = e.target;
										var index = element.getAttribute('id');
										var memberId = MembersArray[index]['id'];
										getJson('http://walkure.pro/US_ClanInfo/lastclanplayer.php?id='+memberId, doneHistoryClans, errorHistoryClans);
									});
								}								
								cell.appendChild(clans);								
								
								var info = document.createElement('img');
								info.setAttribute('id', indexId);
								info.setAttribute('align', 'right');
								info.setAttribute('style', 'cursor: pointer;');
								info.setAttribute('src', '/static/3.13.0.3/common/css/block/form-elements/img/ico-info-small.png');
								if(info.addEventListener){
									info.addEventListener('click', function(e){getMemberInfo(e.target);}, false);
								}else{
									info.attachEvent('onclick', function(e){getMemberInfo(e.target);});
								}								
								cell.appendChild(info);
							}
						}
					}			
				}
			}
			function getMemberInfo(element){
				wgsdk.waiting('open');
				
				var index = element.getAttribute('id');
				var id = MembersArray[index]['id'];
				
				if(Encyclopedia == null){
					getJson('https://api.'+host+'/'+api_version+'/encyclopedia/tanks/?application_id='+application_id+'&language='+lang, doneEncyclopedia, errorEncyclopedia);
				}
				
				getJson('https://api.'+host+'/'+api_version+'/account/info/?application_id='+application_id+'&language='+lang+'&account_id='+id+'&fields=statistics,account_id,nickname,created_at,updated_at,logout_at,last_battle_time,global_rating&index='+index+'&type=member', doneGetMember, errorGetMember);
			}
			function doneGetMember(url, response){
				if(response.status && response.status == "error"){
					errorGetMemberInfo(url);
					return;
				}		
				Process--;

				var vars = getUrlVars(url);
				var index = vars['index'];
				var type = vars['type'];
				
				var id = MembersArray[index]['id'];
				var responseArr = eval('('+JSON.stringify(response)+')');

				if(type == 'member'){
					for(memberId in response.data){
						if(responseArr['data'][memberId] == null){errorGetMember(url); return;}
						
						MembersArray[index]['created_at'] = responseArr['data'][memberId]['created_at'];
						MembersArray[index]['updated_at'] = responseArr['data'][memberId]['updated_at'];
						MembersArray[index]['logout_at'] = responseArr['data'][memberId]['logout_at'];
						MembersArray[index]['last_battle_time'] = responseArr['data'][memberId]['last_battle_time'];
						
						if(CompanyClan != null){
							MembersArray[index]['company'] = CompanyClan[MembersArray[index]['id']];
						}else{
							MembersArray[index]['company'] = '0';
						}
						
						var typeStat = ["all", "company", "clan"];
						
						for(var t = 0; t < typeStat.length; t++){
							MembersArray[index]['spotted'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['spotted'];
							MembersArray[index]['hits'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['hits'];
							MembersArray[index]['battle_avg_xp'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['battle_avg_xp'];
							MembersArray[index]['draws'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['draws'];
							MembersArray[index]['wins'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['wins'];
							MembersArray[index]['losses'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['losses'];
							MembersArray[index]['capture_points'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['capture_points'];
							MembersArray[index]['battles'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['battles'];
							MembersArray[index]['damage_dealt'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['damage_dealt'];
							MembersArray[index]['hits_percents'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['hits_percents'];
							MembersArray[index]['damage_received'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['damage_received'];
							MembersArray[index]['shots'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['shots'];
							MembersArray[index]['xp'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['xp'];
							MembersArray[index]['frags'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['frags'];
							MembersArray[index]['survived_battles'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['survived_battles'];
							MembersArray[index]['dropped_capture_points'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['dropped_capture_points'];						
						}
						
						MembersArray[index]['max_xp'] = responseArr['data'][memberId]['statistics']['max_xp'];
						MembersArray[index]['global_rating'] = responseArr['data'][memberId]['global_rating'];
				
						MembersArray[index]['glory_points'] = 0;
						MembersArray[index]['glory_position'] = 0;
					}
					
					getJson('https://api.'+host+'/'+api_version+'/tanks/stats/?application_id='+application_id+'&account_id='+id+'&index='+index+'&type=tanks', doneGetMember, errorGetMember);
				}else if(type == 'tanks'){
					MembersArray[index]['tanks'] = [];
					MembersArray[index]['tanks']['lightTank'] = [];
					MembersArray[index]['tanks']['mediumTank'] = []; 
					MembersArray[index]['tanks']['heavyTank'] = []; 
					MembersArray[index]['tanks']['AT-SPG'] = []; 
					MembersArray[index]['tanks']['SPG'] = [];	

					MembersArray[index]['expFrag'+'.all'] = 0;
					MembersArray[index]['expDamage'+'.all'] = 0;
					MembersArray[index]['expSpot'+'.all'] = 0;
					MembersArray[index]['expDef'+'.all'] = 0;
					MembersArray[index]['expWinRate'+'.all'] = 0;					
					
					MembersArray[index]['average_tank'] = 0;
					
					if(Encyclopedia != null){
						for(memberId in responseArr['data']){
							var BattleLevelArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
							if(responseArr['data'][memberId] == null){continue;}
							
							for(var i = 0; i < responseArr['data'][memberId].length; i++){
								var tankStat = responseArr['data'][memberId][i];
								var tank = Encyclopedia['data'][tankStat['tank_id']];
								
								if(typeof tank == 'undefined'){continue;}
								
								var tankAllBattles = tankStat['all']['battles'];
								var tankAllWins = tankStat['all']['wins'];

								if(ExpTanks[tankStat['tank_id']] != undefined){								
									MembersArray[index]['expFrag'+'.all'] += tankAllBattles * ExpTanks[tankStat['tank_id']]['expFrag'];
									MembersArray[index]['expDamage'+'.all'] += tankAllBattles * ExpTanks[tankStat['tank_id']]['expDamage'];
									MembersArray[index]['expSpot'+'.all'] += tankAllBattles * ExpTanks[tankStat['tank_id']]['expSpot'];
									MembersArray[index]['expDef'+'.all'] += tankAllBattles * ExpTanks[tankStat['tank_id']]['expDef'];
									MembersArray[index]['expWinRate'+'.all'] += tankAllBattles * (ExpTanks[tankStat['tank_id']]['expWinRate']/100);
								}
								
								BattleLevelArray[tank['level']] += parseInt(tankAllBattles);
								
								if(tankStat['in_garage'] == 1){
									if(tank['type'] == 'lightTank'){
										MembersArray[index]['tanks']['lightTank'][MembersArray[index]['tanks']['lightTank'].length] = tankStat['tank_id']+'<@>'+tankAllBattles+'<@>'+tankAllWins;
										if(undefined == TankArray['lightTank'][tank['level']][tankStat['tank_id']]){
											TankArray['lightTank'][tank['level']][tankStat['tank_id']] = [];
											TankArray['lightTank'][tank['level']][tankStat['tank_id']]['count'] = 1;
											TankArray['lightTank'][tank['level']][tankStat['tank_id']]['members'] = MembersArray[index]['name'];
										}else{
											TankArray['lightTank'][tank['level']][tankStat['tank_id']]['count']++;
											TankArray['lightTank'][tank['level']][tankStat['tank_id']]['members'] += ', ' + MembersArray[index]['name'];
										}							
									}
									if(tank['type'] == 'mediumTank'){
										MembersArray[index]['tanks']['mediumTank'][MembersArray[index]['tanks']['mediumTank'].length] = tankStat['tank_id']+'<@>'+tankAllBattles+'<@>'+tankAllWins;
										if(undefined == TankArray['mediumTank'][tank['level']][tankStat['tank_id']]){
											TankArray['mediumTank'][tank['level']][tankStat['tank_id']] = [];
											TankArray['mediumTank'][tank['level']][tankStat['tank_id']]['count'] = 1;
											TankArray['mediumTank'][tank['level']][tankStat['tank_id']]['members'] = MembersArray[index]['name'];
										}else{
											TankArray['mediumTank'][tank['level']][tankStat['tank_id']]['count']++;
											TankArray['mediumTank'][tank['level']][tankStat['tank_id']]['members'] += ', ' + MembersArray[index]['name'];
										}							
									}
									if(tank['type'] == 'heavyTank'){
										MembersArray[index]['tanks']['heavyTank'][MembersArray[index]['tanks']['heavyTank'].length] = tankStat['tank_id']+'<@>'+tankAllBattles+'<@>'+tankAllWins;
										if(undefined == TankArray['heavyTank'][tank['level']][tankStat['tank_id']]){
											TankArray['heavyTank'][tank['level']][tankStat['tank_id']] = [];
											TankArray['heavyTank'][tank['level']][tankStat['tank_id']]['count'] = 1;
											TankArray['heavyTank'][tank['level']][tankStat['tank_id']]['members'] = MembersArray[index]['name'];
										}else{
											TankArray['heavyTank'][tank['level']][tankStat['tank_id']]['count']++;
											TankArray['heavyTank'][tank['level']][tankStat['tank_id']]['members'] += ', ' + MembersArray[index]['name'];
										}							
									}
									if(tank['type'] == 'AT-SPG'){
										MembersArray[index]['tanks']['AT-SPG'][MembersArray[index]['tanks']['AT-SPG'].length] = tankStat['tank_id']+'<@>'+tankAllBattles+'<@>'+tankAllWins;
										if(undefined == TankArray['AT-SPG'][tank['level']][tankStat['tank_id']]){
											TankArray['AT-SPG'][tank['level']][tankStat['tank_id']] = [];
											TankArray['AT-SPG'][tank['level']][tankStat['tank_id']]['count'] = 1;
											TankArray['AT-SPG'][tank['level']][tankStat['tank_id']]['members'] = MembersArray[index]['name'];
										}else{
											TankArray['AT-SPG'][tank['level']][tankStat['tank_id']]['count']++;
											TankArray['AT-SPG'][tank['level']][tankStat['tank_id']]['members'] += ', ' + MembersArray[index]['name'];
										}							
									}
									if(tank['type'] == 'SPG'){
										MembersArray[index]['tanks']['SPG'][MembersArray[index]['tanks']['SPG'].length] = tankStat['tank_id']+'<@>'+tankAllBattles+'<@>'+tankAllWins;
										if(undefined == TankArray['SPG'][tank['level']][tankStat['tank_id']]){
											TankArray['SPG'][tank['level']][tankStat['tank_id']] = [];
											TankArray['SPG'][tank['level']][tankStat['tank_id']]['count'] = 1;
											TankArray['SPG'][tank['level']][tankStat['tank_id']]['members'] = MembersArray[index]['name'];
										}else{
											TankArray['SPG'][tank['level']][tankStat['tank_id']]['count']++;
											TankArray['SPG'][tank['level']][tankStat['tank_id']]['members'] += ', ' + MembersArray[index]['name'];
										}							
									}
								}
							}
							var battles = MembersArray[index]['battles'+'.all'];
							MembersArray[index]['average_tank'] = (1*BattleLevelArray[1]/battles)+(2*BattleLevelArray[2]/battles)+(3*BattleLevelArray[3]/battles)
							+(4*BattleLevelArray[4]/battles)+(5*BattleLevelArray[5]/battles)+(6*BattleLevelArray[6]/battles)+(7*BattleLevelArray[7]/battles)
							+(8*BattleLevelArray[8]/battles)+(9*BattleLevelArray[9]/battles)+(10*BattleLevelArray[10]/battles);
						}
						
						var oldGetVihicles = ScriptSetting['get_vehicles'];
						ScriptSetting['get_vehicles'] = "true";
						loadMemberId = index;
						
						Counting();
						viewMemberInfo(index);
						
						ScriptSetting['get_vehicles'] = oldGetVihicles;
					}else{
						loadEncyclopediaTime++;
						if(loadEncyclopediaTime < 5){
							setTimeout(function(){doneGetMember(url, response)}, 1000);
						}else{
							errorGetMemberInfo(url);
						}
					}
				}
			}
			function errorGetMember(url){
				Process--;
				
				var vars = getUrlVars(url);
				var index = vars['index'];
				
				wgsdk.waiting('close');
				wgsdk.message_box(
					localization['Box'], 
					localization['ErrorMemberInfo']+MembersArray[index]['name'], 
					{
						confirm:{
							text: "OK", 
							click: function(){}
						}
					}
				);
			}		
			function viewMemberInfo(index){	
				var oldIdActive = 'allstat';
				
				var b_footer = document.getElementsByClassName("b-footer")[0];
				b_footer.setAttribute('style', 'width: 1050px; background: url("scss/footer/img/footer_bg.jpg") repeat scroll 0 0 #28282C; z-index:-1;');
				
				var member_dialog_title = document.getElementsByClassName("member-dialog-title")[0];
				var member_dialog_content = document.getElementsByClassName("member-dialog-content")[0];
				
				member_dialog_title.innerHTML = localization['FullStatPlayer']+' '+MembersArray[index]['name'];
				
				var html = ''+
					'<div class="l-tabs js-tabs" style="padding-bottom: 10px;">'+
						'<ul class="b-tabs-list">'+       
							'<li id="allstat" class="b-tabs-list_item js-tabs__active">'+
								'<a stat="allstat" class="member-stat b-tabs-list_link js-tabs-item" style="cursor:pointer;">'+localization['AllStat']+'</a>'+
							'</li>'+        
							'<li id="randstat" class="b-tabs-list_item">'+
								'<a stat="randstat" class="member-stat b-tabs-list_link js-tabs-item" style="cursor:pointer;">'+localization['RandStat']+'</a>'+
							'</li>'+           
							'<li id="companystat" class="b-tabs-list_item">'+
								'<a stat="companystat" class="member-stat b-tabs-list_link js-tabs-item" style="cursor:pointer;">'+localization['CompanyStat']+'</a>'+
							'</li>'+             
							'<li id="clanstat" class="b-tabs-list_item">'+
								'<a stat="clanstat" class="member-stat b-tabs-list_link js-tabs-item" style="cursor:pointer;">'+localization['ClanStat']+'</a>'+
							'</li>'+
							'<li id="equipment" class="b-tabs-list_item">'+
								'<a stat="equipment" class="member-stat b-tabs-list_link js-tabs-item" style="cursor:pointer;">'+localization['Equipment']+'</a>'+
							'</li>'+
						'</ul>'+
						'<div class="b-main-divider"></div>'+
						'<div id="div-allstat" style="display:block; padding: 5px">'+
							getStat(index, ".all")+
						'</div>'+
						'<div id="div-randstat" style="display:none; padding: 5px">'+
							getStat(index, ".rand")+
						'</div>'+
						'<div id="div-companystat" style="display:none; padding: 5px">'+
							getStat(index, ".company")+
						'</div>'+
						'<div id="div-clanstat" style="display:none; padding: 5px">'+
							getStat(index, ".clan")+
						'</div>'+	
						'<div id="div-equipment" style="display:none; overflow: auto; max-height: 600px; width: 98%; padding: 5px">'+
							getEquipment(index)+
						'</div>'+
					'</div>'+
				'';		

				member_dialog_content.innerHTML = html;
				
				jQ(".member-stat").click(function(){
					document.getElementById("div-"+oldIdActive).style.display = 'none';
					document.getElementById(oldIdActive).setAttribute('class', 'b-tabs-list_item');
					
					var stat = this.getAttribute('stat');
					document.getElementById("div-"+stat).style.display = 'block';
					document.getElementById(stat).setAttribute('class', 'b-tabs-list_item js-tabs__active');
					oldIdActive = stat;
				});
				jQ(".member-vehicle").click(function(){
					var view = this.getAttribute('view');
					var type = this.getAttribute('type');
					if(view == 0){
						this.setAttribute('view', 1);
						document.getElementById("html_"+type).style.display = '';
					}else{
						this.setAttribute('view', 0);
						document.getElementById("html_"+type).style.display = 'none';					
					}
				});
			
				document.getElementsByClassName("member-dialog")[0].style.top = (window.scrollY+50)+'px';
				document.getElementsByClassName("member-info")[0].style.display = 'inline';			
				
				wgsdk.waiting('close');
			}
			function getStat(index, typeStat){
				var saveDate;
				var SaveClanStatisticsDate = getLocalStorage('SaveClanStatisticsDate', true);
				if(SaveClanStatisticsDate != null){
					saveDate = parseDate(new Date(SaveClanStatisticsDate));
				}else{
					saveDate = parseDate(null);
				}
				
				var html = ''+
					'<table class="t-table" style="width: 99%; margin: 3px; text-align: right;">'+	
						'<thead>'+
							'<tr>'+
								'<th rowspan="2"></th>'+
								'<th colspan="2" style="text-align: center;">'+
									localization['Data']+
								'</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align: center;">'+
									localization['Actual']+
								'</th>'+
								'<th style="text-align: center;">'+
									localization['Delta']+saveDate+
								'</th>'+
							'</tr>'+						
						'</thead>'+
						'<tbody>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['games_battles']+':</b>'+
								'</td>'+
								'<td>'+
									'<font color="'+getBattlesColor(MembersArray[index]['battles'+typeStat])+'">'+breakNumer(MembersArray[index]['battles'+typeStat])+'</font>'+
									' <b>/</b> '+
									Number(MembersArray[index]['battles'+typeStat]*100/MembersArray[index]['battles.all']).toFixed(0)+'%'+
								'</td>'+
								'<td>'+
									getDifference(index, 'battles'+typeStat)+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['games_wins']+':</b>'+
								'</td>'+
								'<td>'+
									breakNumer(MembersArray[index]['wins'+typeStat])+'</font>'+
									' <b>/</b> '+
									'<font color="'+getWinrateColor(MembersArray[index]['PROC_wins'+typeStat])+'">'+Number(MembersArray[index]['PROC_wins'+typeStat]).toFixed(2)+'%'+'</font>'+
								'</td>'+
								'<td>'+
									getDifference(index, 'wins'+typeStat)+' <b>/</b> '+getDifference(index, 'PROC_wins'+typeStat)+'%'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['games_losses']+':</b>'+
								'</td>'+
								'<td>'+
									breakNumer(MembersArray[index]['losses'+typeStat])+' <b>/</b> '+Number(MembersArray[index]['PROC_losses'+typeStat]).toFixed(2)+'%'+
								'</td>'+
								'<td>'+
									getDifference(index, 'losses'+typeStat)+' <b>/</b> '+getDifference(index, 'PROC_losses'+typeStat)+'%'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['games_draws']+':</b>'+
								'</td>'+
								'<td>'+
									breakNumer(MembersArray[index]['draws'+typeStat])+' <b>/</b> '+Number(MembersArray[index]['PROC_draws'+typeStat]).toFixed(2)+'%'+
								'</td>'+
								'<td>'+
									getDifference(index, 'draws'+typeStat)+' <b>/</b> '+getDifference(index, 'PROC_draws'+typeStat)+'%'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['games_survived_battles']+':</b>'+
								'</td>'+
								'<td>'+
									breakNumer(MembersArray[index]['survived_battles'+typeStat])+
									' <b>/</b> '+
									'<font color="'+getPROCSurvivedColor(MembersArray[index]['PROC_survived_battles'+typeStat])+'">'+Number(MembersArray[index]['PROC_survived_battles'+typeStat]).toFixed(2)+'%'+'</font>'+
								'</td>'+
								'<td>'+
									getDifference(index, 'survived_battles'+typeStat)+' <b>/</b> '+getDifference(index, 'PROC_survived_battles'+typeStat)+'%'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['games_xp']+':</b>'+
								'</td>'+
								'<td>'+
									breakNumer(MembersArray[index]['xp'+typeStat])+
									' <b>/</b> '+
									'<font color="'+getCFXP(MembersArray[index]['CF_xp'+typeStat])+'">'+Number(MembersArray[index]['CF_xp'+typeStat]).toFixed(0)+'</form>'+
								'</td>'+
								'<td>'+
									getDifference(index, 'xp'+typeStat)+' <b>/</b> '+getDifference(index, 'CF_xp'+typeStat)+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['games_frags']+':</b>'+
								'</td>'+
								'<td>'+
									breakNumer(MembersArray[index]['frags'+typeStat])+
									' <b>/</b> '+
									'<font color="'+getCFColor(MembersArray[index]['CF_frags'+typeStat])+'">'+Number(MembersArray[index]['CF_frags'+typeStat]).toFixed(2)+'</font>'+
								'</td>'+
								'<td>'+
									getDifference(index, 'frags'+typeStat)+' <b>/</b> '+getDifference(index, 'CF_frags'+typeStat)+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['games_spotted']+':</b>'+
								'</td>'+
								'<td>'+
									breakNumer(MembersArray[index]['spotted'+typeStat])+
									' <b>/</b> '+
									'<font color="'+getCFColor(MembersArray[index]['CF_spotted'+typeStat])+'">'+Number(MembersArray[index]['CF_spotted'+typeStat]).toFixed(2)+'</font>'+
								'</td>'+
								'<td>'+
									getDifference(index, 'spotted'+typeStat)+' <b>/</b> '+getDifference(index, 'CF_spotted'+typeStat)+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['games_shots']+':</b>'+
								'</td>'+
								'<td>'+
									breakNumer(MembersArray[index]['shots'+typeStat])+' <b>/</b> '+Number(MembersArray[index]['CF_shots'+typeStat]).toFixed(2)+
								'</td>'+
								'<td>'+
									getDifference(index, 'shots'+typeStat)+' <b>/</b> '+getDifference(index, 'CF_shots'+typeStat)+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['games_hits']+':</b>'+
								'</td>'+
								'<td>'+
									breakNumer(MembersArray[index]['hits'+typeStat])+
									' <b>/</b> '+
									'<font color="'+getHitsColor(MembersArray[index]['PROC_hits'+typeStat])+'">'+Number(MembersArray[index]['PROC_hits'+typeStat]).toFixed(2)+'%'+'</font>'+
								'</td>'+
								'<td>'+
									getDifference(index, 'hits'+typeStat)+' <b>/</b> '+getDifference(index, 'PROC_hits'+typeStat)+'%'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['games_damage_dealt']+':</b>'+
								'</td>'+
								'<td>'+
									breakNumer(MembersArray[index]['damage_dealt'+typeStat])+
									' <b>/</b> '+
									'<font color="'+getCFDamageColor(MembersArray[index]['CF_damage_dealt'+typeStat])+'">'+Number(MembersArray[index]['CF_damage_dealt'+typeStat]).toFixed(0)+'</font>'+
								'</td>'+
								'<td>'+
									getDifference(index, 'damage_dealt'+typeStat)+' <b>/</b> '+getDifference(index, 'CF_damage_dealt'+typeStat)+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['games_damage_received']+':</b>'+
								'</td>'+
								'<td>'+
									breakNumer(MembersArray[index]['damage_received'+typeStat])+' <b>/</b> '+Number(MembersArray[index]['CF_damage_received'+typeStat]).toFixed(0)+
								'</td>'+
								'<td>'+
									getDifference(index, 'damage_received'+typeStat)+' <b>/</b> '+getDifference(index, 'CF_damage_received'+typeStat)+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['games_capture_points']+':</b>'+
								'</td>'+
								'<td>'+
									breakNumer(MembersArray[index]['capture_points'+typeStat])+
									' <b>/</b> '+
									'<font color="'+getCFColor(MembersArray[index]['CF_capture_points'+typeStat])+'">'+Number(MembersArray[index]['CF_capture_points'+typeStat]).toFixed(2)+'</font>'+
								'</td>'+
								'<td>'+
									getDifference(index, 'capture_points'+typeStat)+' <b>/</b> '+getDifference(index, 'CF_capture_points'+typeStat)+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['games_dropped_capture_points']+':</b>'+
								'</td>'+
								'<td>'+
									breakNumer(MembersArray[index]['dropped_capture_points'+typeStat])+
									' <b>/</b> '+
									'<font color="'+getCFColor(MembersArray[index]['CF_dropped_capture_points'+typeStat])+'">'+Number(MembersArray[index]['CF_dropped_capture_points'+typeStat]).toFixed(2)+'</font>'+
								'</td>'+
								'<td>'+
									getDifference(index, 'dropped_capture_points'+typeStat)+' <b>/</b> '+getDifference(index, 'CF_dropped_capture_points'+typeStat)+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['kpd']+':</b>'+
								'</td>'+
								'<td>'+
									'<font color="'+getKpdColor(MembersArray[index]['kpd'+typeStat])+'">'+Number(MembersArray[index]['kpd'+typeStat]).toFixed(0)+'</font>'+
									' <b>/</b> '+
									'<font color="'+getXVMColor(MembersArray[index]['xeff'+typeStat])+'">'+Number(MembersArray[index]['xeff'+typeStat]).toFixed(2)+'</font>'+
								'</td>'+
								'<td>'+
									getDifference(index, 'kpd'+typeStat)+' <b>/</b> '+getDifference(index, 'xeff'+typeStat)+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['global_rating']+':</b>'+
								'</td>'+
								'<td>'+
									'<font>'+Number(MembersArray[index]['global_rating'+typeStat]).toFixed(0)+'</font>'+
								'</td>'+
								'<td>'+
									getDifference(index, 'global_rating'+typeStat)+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['wn6']+':</b>'+
								'</td>'+
								'<td>'+
									'<font color="'+getWn6Color(MembersArray[index]['wn6'+typeStat])+'">'+Number(MembersArray[index]['wn6'+typeStat]).toFixed(0)+'</font>'+
									' <b>/</b> '+
									'<font color="'+getXVMColor(MembersArray[index]['xwn6'+typeStat])+'">'+Number(MembersArray[index]['xwn6'+typeStat]).toFixed(2)+'</font>'+
								'</td>'+
								'<td>'+
									getDifference(index, 'wn6'+typeStat)+' <b>/</b> '+getDifference(index, 'xwn6'+typeStat)+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['wn7']+':</b>'+
								'</td>'+
								'<td>'+
									'<font color="'+getWn6Color(MembersArray[index]['wn7'+typeStat])+'">'+Number(MembersArray[index]['wn7'+typeStat]).toFixed(0)+'</font>'+
								'</td>'+
								'<td>'+
									getDifference(index, 'wn7'+typeStat)+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['wn8']+':</b>'+
								'</td>'+
								'<td>'+
									'<font color="'+getWn8Color(MembersArray[index]['wn8'+typeStat])+'">'+Number(MembersArray[index]['wn8'+typeStat]).toFixed(0)+'</font>'+
									' <b>/</b> '+
									'<font color="'+getXVMColor(MembersArray[index]['xwn8'+typeStat])+'">'+Number(MembersArray[index]['xwn8'+typeStat]).toFixed(2)+'</font>'+
								'</td>'+
								'<td>'+
									getDifference(index, 'wn8'+typeStat)+' <b>/</b> '+getDifference(index, 'xwn8'+typeStat)+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+
									'<b>'+localization['bs']+':</b>'+
								'</td>'+
								'<td>'+
									'<font color="'+getArmorColor(MembersArray[index]['bs'+typeStat])+'">'+Number(MembersArray[index]['bs'+typeStat]).toFixed(0)+'</font>'+
								'</td>'+
								'<td>'+
									getDifference(index, 'bs'+typeStat)+
								'</td>'+
							'</tr>'+						
						'</tbody>'+
					'</table>'+
				'';
				
				return html;
			}
			function getDifference(index, attr){
				var point = 0;
				
				if(attr.indexOf('CF_') > -1 || attr.indexOf('PROC_') > -1){
					if(attr.indexOf('CF_xp') > -1 || attr.indexOf('CF_damage_dealt') > -1 || attr.indexOf('CF_damage_received') > -1){
						point = 0;
					}else{
						point = 2;
					}
				}
				
				var difference = (MembersArray[index][attr+'.old']).toFixed(point);
				
				var color = '#979899';
				if(difference > 0){color = 'green'; difference = '+'+difference;}
				if(difference < 0){color = 'red';}
				
				return '<font style="color: '+color+';">'+difference+'</font>';			
			}
			function getEquipment(index){
				var html_absolute = ''; var absolute_battles = 0; var absolute_winrate = 0; var absolute_count = 0;
				var html_championship = ''; var championship_battles = 0; var championship_winrate = 0; var championship_count = 0;
				var html_average = ''; var average_battles = 0; var average_winrate = 0; var average_count = 0;
				var html_junior = ''; var junior_battles = 0; var junior_winrate = 0; var junior_count = 0;	
				
				for(var tI = 0; tI < 5; tI++){
					var type = '';
					if(tI == 0){type = 'lightTank'}
					if(tI == 1){type = 'mediumTank'}
					if(tI == 2){type = 'heavyTank'}
					if(tI == 3){type = 'AT-SPG'}
					if(tI == 4){type = 'SPG'}		

					for(var num = 0; num < MembersArray[index]['tanks'][type].length; num++){
						var tank = Encyclopedia['data'][(MembersArray[index]['tanks'][type][num].split('<@>'))[0]];
						var battles = (MembersArray[index]['tanks'][type][num].split('<@>'))[1];
						var wins = (MembersArray[index]['tanks'][type][num].split('<@>'))[2];
						var winrate_tank = (100/(battles/wins)).toFixed(2);

						var tankName = tank['name_i18n'];
						var tankNameI = (tank['name'].split(':'))[1];
						
						/* fix start */
						if(tankNameI == 'Bat_Chatillon155'){tankNameI = 'Bat_Chatillon155_58';}
						if(tankNameI == 'AMX_50_68t'){tankNameI = 'F10_AMX_50B';}
						if(tankNameI == 'IS-6'){tankNameI = 'Object252';}
						if(tankNameI == '_M44'){tankNameI = 'M44';}
						/* fix end */
						
						var trHtml = ''+
							'<tr>'+
								'<td style="width: 560px; text-align:left;">'+
									'<div>'+
										'<span>'+getLevelText(tank['level'])+'</span>'+
										'<img alt="'+tankName+'" src="/static/3.13.1.3/encyclopedia/tankopedia/vehicle/small/'+tank['nation']+'-'+tankNameI.toLowerCase()+'.png" class="png">'+
										'<span style="margin-left: -40px;">'+tankName+'</span>'+
									'</div>'+
								'</td>'+
								'<td style="color: '+getBattlesTankColor(battles)+'; width:160px">'+battles+'</td>'+
								'<td style="color: '+getWinrateColor(winrate_tank)+'; width:160px">'+winrate_tank+'%</td>'+							
							'</tr>'+						
						'';
						
						if(tank['level'] == 10){
							absolute_count++;
							absolute_battles += parseInt(battles);
							absolute_winrate += parseInt(winrate_tank);
							html_absolute += trHtml;
						}
						if(tank['level'] == 8){
							championship_count++;
							championship_battles += parseInt(battles);
							championship_winrate += parseInt(winrate_tank);
							html_championship += trHtml;
						}
						if(tank['level'] == 6){
							average_count++;
							average_battles += parseInt(battles);
							average_winrate += parseInt(winrate_tank);
							html_average += trHtml;
						}
						if(tank['level'] == 4){
							junior_count++;
							junior_battles += parseInt(battles);
							junior_winrate += parseInt(winrate_tank);
							html_junior += trHtml;
						}						
					}
				}
				
				var html = ''+
					'<table class="t-table" style="width: 99%; margin: 3px; text-align: right;">'+	
						'<thead>'+
							'<tr>'+
								'<th style="text-align: left;">'+
									localization['tank']+
								'</th>'+
								'<th style="text-align: right;">'+
									localization['battles']+
								'</th>'+
								'<th style="text-align: right;">'+
									localization['wins']+
								'</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody>'+
							'<tr class="member-vehicle" view="0" type="absolute">'+
								'<td style="padding-left:20px; text-align: left; cursor: pointer;">'+
									'<b>'+localization['absolute']+'</b>'+
									'<span style="padding-left:20px;">'+absolute_count+'</span>'+
								'</td>'+
								'<td>'+breakNumer(absolute_battles)+'</td>'+
								'<td style="color: '+getWinrateColor(absolute_winrate/absolute_count)+';">'+Number(absolute_winrate/absolute_count).toFixed(0)+'%</td>'+
							'</tr>'+
						'</tbody>'+
						'<tbody id="html_absolute" style="display: none;">'+
							html_absolute+
						'</tbody>'+
						'<tbody>'+
							'<tr class="member-vehicle" view="0" type="championship">'+
								'<td style="padding-left:20px; text-align: left; cursor: pointer;">'+
									'<b>'+localization['championship']+'</b>'+
									'<span style="padding-left:20px;">'+championship_count+'</span>'+
								'</td>'+
								'<td>'+breakNumer(championship_battles)+'</td>'+
								'<td style="color: '+getWinrateColor(championship_winrate/championship_count)+';">'+Number(championship_winrate/championship_count).toFixed(0)+'%</td>'+
							'</tr>'+
						'</tbody>'+
						'<tbody id="html_championship" style="display: none;">'+
							html_championship+
						'</tbody>'+	
						'<tbody>'+
							'<tr class="member-vehicle" view="0" type="average">'+
								'<td style="padding-left:20px; text-align: left; cursor: pointer;">'+
									'<b>'+localization['average']+'</b>'+
									'<span style="padding-left:20px;">'+average_count+'</span>'+
								'</td>'+
								'<td>'+breakNumer(average_battles)+'</td>'+
								'<td style="color: '+getWinrateColor(average_winrate/average_count)+';">'+Number(average_winrate/average_count).toFixed(0)+'%</td>'+
							'</tr>'+
						'</tbody>'+
						'<tbody id="html_average" style="display: none;">'+
							html_average+
						'</tbody>'+				
						'<tbody>'+
							'<tr class="member-vehicle" view="0" type="junior">'+
								'<td style="padding-left:20px; text-align: left; cursor: pointer;">'+
									'<b>'+localization['junior']+'</b>'+
									'<span style="padding-left:20px;">'+junior_count+'</span>'+
								'</td>'+
								'<td>'+breakNumer(junior_battles)+'</td>'+
								'<td style="color: '+getWinrateColor(junior_winrate/junior_count)+';">'+Number(junior_winrate/junior_count).toFixed(0)+'%</td>'+
							'</tr>'+
						'</tbody>'+
						'<tbody id="html_junior" style="display: none;">'+
							html_junior+
						'</tbody>'+						
					'</table>'+
				'';	
				
				return html;		
			}
			function doneWarGag(url, response){
				if(response.status && response.status == "error"){
					errorProvince();
					return;
				}	
				Process--;
				
				var wargag = eval('('+JSON.stringify(response)+')');
				var rand = (Math.random() *  99).toFixed(0);
				WarGagDescription = wargag['data'][rand]['description'];
			}
			function errorWarGag(){
				Process--;
			}		
			var oldSortColumn = 'name';
			var autoSortColumn = false;
			function UpdatePage(){
				if(error_encyclopedia){
					wgsdk.message_box(
						localization['Box'], 
						localization['ErrorEncyclopedia'], 
						{
							confirm:{
								text: "Ok", 
								click: function(){}
							}
						}
					);				
				}
				if(error_member != ''){
					wgsdk.message_box(
						localization['Box'], 
						localization['ErrorMember']+' '+error_member+'.',
						{
							confirm:{
								text: "Ok", 
								click: function(){}
							}
						}
					);					
				}
				if(error_tanks != ''){
					wgsdk.message_box(
						localization['Box'], 
						localization['ErrorTanks']+' '+error_tanks+'.',
						{
							confirm:{
								text: "Ok", 
								click: function(){}
							}
						}
					);					
				}
				if(error_rating != ''){
					wgsdk.message_box(
						localization['Box'], 
						localization['ErrorRating']+' '+error_rating+'.',
						{
							confirm:{
								text: "Ok", 
								click: function(){}
							}
						}
					);					
				}
				if(error_glory != ''){
					wgsdk.message_box(
						localization['Box'], 
						localization['ErrorGlory']+' '+error_glory+'.',
						{
							confirm:{
								text: "Ok", 
								click: function(){}
							}
						}
					);					
				}	

				Counting();
				
				MembersArray.sort(ASC(oldSortColumn));
				var table = CreateTableClan();
				
				if(ScriptSetting['view_ratings'] === "true"){
					CreateRatingClan();
				}
				
				if(!error_encyclopedia && ScriptSetting['view_vehicles'] === "true"){
					CreateVehicleClan();
				}
				
				if(ScriptSetting['view_average'] === "true"){
					CreateStatClan();
				}
				
				document.getElementById('clans_info_content').appendChild(table);				
				
				jQ(".SaveCompany").click(function(){onSaveCompany();});	
				jQ(".SaveStatistics").click(function(){onSaveStatistics();});	
				
				document.getElementsByClassName("loading_waiting")[0].style.display = 'none';
				document.getElementsByClassName("showclaninfo")[0].style.display = 'block';	

				jQ("#battlesB").click(function(){onView(this);});
				jQ("#provincesB").click(function(){onView(this);});
				jQ("#structureB").click(function(){onView(this);});
				jQ("#linkB").click(function(){onView(this);});

				jQ("input[name=viewStatTable]").click(function(){autoSortColumn = true; onSort(oldSortColumn);});
				jQ("input[name=typeSortTable]").click(function(){autoSortColumn = true; onSort(oldSortColumn);});
			}
			function CreateStatClan(){
				var display = 'block';
				var stat_class = 'link';
				var block_stat = getLocalStorage('statclanB', false);
				if(null == block_stat){
					stat_class += ' show';
					display = 'block';
				}else{
					stat_class += ' '+block_stat;
					if(block_stat == 'hide'){display = 'none';}else{display = 'block';}
				}	

				var statclanB = document.createElement('div');
				statclanB.setAttribute('style', 'margin-bottom: 20px;');
				statclanB.setAttribute('id', 'statclanB-block');
				var statHTML = ''+
					'<div class="link">'+
						'<span id="statclanB" class="'+stat_class+'">'+
							localization['StatLink']+
						'</span>'+
					'</div>'+
					'<div class="b-user-block b-speedometer-wrpr statclanB" style="display: '+display+'; margin: 0px; padding: 0px;">'+
						'<div align="center" class="b-head-block style_block_head">'+
							'<h3>'+localization['StatHead']+'</h3>'+
						'</div>'+
						getTableClanStat()+
					'</div>'+
				'';	
				
				statclanB.innerHTML = statHTML;
				var parentElement = document.getElementById('clans_info_content');
				var theFirstChild = parentElement.firstChild;
				parentElement.insertBefore(statclanB, theFirstChild);	
				jQ("#statclanB").click(function(){onView(this);});				
			}
			function getTableClanStat(){
				var html = '';
				var typeStat = [".all", ".rand", ".company", ".clan"];
				var count = amountStatistics.length;
				var sumStat = [];
				
				for(var t = 0; t < typeStat.length; t++){
					sumStat = [];
					for(index in amountStatistics){
						for(attr in amountStatistics[index]){
							if(typeof sumStat[attr] == 'undefined'){
								sumStat[attr] = 0;
								
								sumStat['hits_percents'+typeStat[t]] = 0;
								sumStat['hits_percents'+typeStat[t]] += amountStatistics[index]['hits_percents'+typeStat[t]];
							}
							if(!isNaN(amountStatistics[index][attr])){
								sumStat[attr] += Number(amountStatistics[index][attr]);
							}
						}
					}
				
					var header = '';
					var content = '';
					
					var settingStructureTable = getLocalStorage('settingStructureTable', false);
					var attrs = settingStructureTable.split(";");
					for(var i = 0; i < attrs.length - 1; i++){
						var attr = attrs[i];
						
						if(attr == 'role' || attr == 'since' || attr == 'logout_at' || attr == 'last_battle_time' || attr == 'day' || attr == 'company' || attr == 'max_xp' || attr == 'glory_points' || attr == 'glory_position' || attr == 'global_rating'){
							continue;
						}
						
						header += '<td class="head">'+localization[attr+'V']+'</td>';
						
						var imgType = '';
						var color1 = '#979899';
						var color2 = '#979899';
						var content_text = '<font color="'+color1+'">'+breakNumer(Number(sumStat[attr+typeStat[t]] / count).toFixed(0))+'</font>';
						
						if(attr == 'kpd'){
							imgType = 'eff';
						
							color1 = getKpdColor(Number(sumStat[attr+typeStat[t]] / count).toFixed(0));
							content_text = '<font color="'+color1+'">'+breakNumer(Number(sumStat[attr+typeStat[t]] / count).toFixed(0))+'</font>';
							content_text += ' / ';
							color2 = getXVMColor(Number(sumStat['xeff'+typeStat[t]] / count).toFixed(0));
							content_text += '<font color="'+color2+'">'+Number(sumStat['xeff'+typeStat[t]] / count).toFixed(0)+'</font>';
							content_text = content_text.replace('NaN', '0');
						}else if(attr == 'wn6'){
							imgType = 'eff';
						
							color1 = getWn6Color(Number(sumStat[attr+typeStat[t]] / count).toFixed(0));
							content_text = '<font color="'+color1+'">'+breakNumer(Number(sumStat[attr+typeStat[t]] / count).toFixed(0))+'</font>';
							content_text += ' / ';
							color2 = getXVMColor(Number(sumStat['xwn6'+typeStat[t]] / count).toFixed(0));
							content_text += '<font color="'+color2+'">'+Number(sumStat['xwn6'+typeStat[t]] / count).toFixed(0)+'</font>';
							content_text = content_text.replace('NaN', '0');
						}else if(attr == 'wn8'){
							imgType = 'eff';
						
							color1 = getWn8Color(Number(sumStat[attr+typeStat[t]] / count).toFixed(0));
							content_text = '<font color="'+color1+'">'+breakNumer(Number(sumStat[attr+typeStat[t]] / count).toFixed(0))+'</font>';
							content_text += ' / ';
							color2 = getXVMColor(Number(sumStat['xwn8'+typeStat[t]] / count).toFixed(0));
							content_text += '<font color="'+color2+'">'+Number(sumStat['xwn8'+typeStat[t]] / count).toFixed(0)+'</font>';
							content_text = content_text.replace('NaN', '0');
						}else if(attr == 'wn7'){
							imgType = 'eff';
							color1 = getWn6Color(Number(sumStat[attr+typeStat[t]] / count).toFixed(0));
							content_text = '<font color="'+color1+'">'+breakNumer(Number(sumStat[attr+typeStat[t]] / count).toFixed(0))+'</font>';
						}else if(attr == 'bs'){
							imgType = 'eff';
							color1 = getArmorColor(Number(sumStat[attr+typeStat[t]] / count).toFixed(0));
							content_text = '<font color="'+color1+'">'+breakNumer(Number(sumStat[attr+typeStat[t]] / count).toFixed(0))+'</font>';
						}else if(attr == 'battles'){
							imgType = 'battles';
							color1 = getBattlesColor(Number(sumStat[attr+typeStat[t]] / count).toFixed(0));
							content_text = '<font color="'+color1+'">'+breakNumer(Number(sumStat[attr+typeStat[t]] / count).toFixed(0))+'</font>';
						}else if(attr == 'losses' || attr == 'draws' || attr == 'PROC_losses' || attr == 'PROC_draws'){
							imgType = 'losses_draws';
							
							var plus = '';
							var point = 0;
							
							if(attr == 'PROC_losses' || attr == 'PROC_draws'){
								point = 2;
								plus = '%';
							}
							
							content_text = '<font color="'+color1+'">'+Number(sumStat[attr+typeStat[t]] / count).toFixed(point)+plus+'</font>';							
						}else if(attr == 'survived_battles' || attr == 'PROC_survived_battles'){
							imgType = 'survived_battles';
							
							var plus = '';
							var point = 0;
							
							if(attr == 'PROC_survived_battles'){
								plus = '%';
								point = 2;
								color1 = getPROCSurvivedColor(Number(sumStat[attr+typeStat[t]] / count).toFixed(point));
							}

							content_text = '<font color="'+color1+'">'+Number(sumStat[attr+typeStat[t]] / count).toFixed(point)+plus+'</font>';
						}else if(attr == 'wins' || attr == 'PROC_wins'){
							imgType = 'wins';
						
							var plus = '';
							var point = 0;
							
							if(attr == 'PROC_wins'){
								plus = '%';
								point = 2;
								color1 = getWinrateColor(Number(sumStat[attr+typeStat[t]] / count).toFixed(point));
							}

							content_text = '<font color="'+color1+'">'+Number(sumStat[attr+typeStat[t]] / count).toFixed(point)+plus+'</font>';
						}else if(attr == 'xp' || attr == 'CF_xp'){
							imgType = 'xp';
							
							if(attr == 'CF_xp'){
								point = 0;
								color1 = getCFXP(Number(sumStat[attr+typeStat[t]] / count).toFixed(point));
								content_text = '<font color="'+color1+'">'+Number(sumStat[attr+typeStat[t]] / count).toFixed(point)+'</font>';
							}
						}else if(attr == 'frags' || attr == 'shots' || attr == 'CF_frags' || attr == 'CF_shots'){
							imgType = 'frags_shots';
							
							var point = 0;
							
							if(attr == 'CF_frags'){
								point = 2;
								color1 = getCFColor(Number(sumStat[attr+typeStat[t]] / count).toFixed(point));
							}else if(attr == 'CF_shots'){
								point = 2;
							}
							
							content_text = '<font color="'+color1+'">'+Number(sumStat[attr+typeStat[t]] / count).toFixed(point)+'</font>';
						}else if(attr == 'spotted' || attr == 'CF_spotted'){
							imgType = 'spotted';
							
							var point = 0;
							
							if(attr == 'CF_spotted'){
								point = 2;
								color1 = getCFColor(Number(sumStat[attr+typeStat[t]] / count).toFixed(point));
							}
							
							content_text = '<font color="'+color1+'">'+Number(sumStat[attr+typeStat[t]] / count).toFixed(point)+'</font>';
						}else if(attr == 'damage_dealt' || attr == 'damage_received' || attr == 'CF_damage_dealt' || attr == 'CF_damage_received'){
							imgType = 'damage';
							
							var point = 0;
							
							if(attr == 'CF_damage_dealt'){
								point = 2;
								color1 = getCFDamageColor(Number(sumStat[attr+typeStat[t]] / count).toFixed(point));
							}else if(attr == 'CF_damage_received'){
								point = 2;
							}
							
							content_text = '<font color="'+color1+'">'+Number(sumStat[attr+typeStat[t]] / count).toFixed(point)+'</font>';
						}else if(attr == 'capture_points' || attr == 'CF_capture_points'){
							imgType = 'capture_points';
							
							var point = 0;
							
							if(attr == 'CF_capture_points'){
								point = 2;
								color1 = getCFColor(Number(sumStat[attr+typeStat[t]] / count).toFixed(point));
							}
							
							content_text = '<font color="'+color1+'">'+Number(sumStat[attr+typeStat[t]] / count).toFixed(point)+'</font>';
						}else if(attr == 'dropped_capture_points' || attr == 'CF_dropped_capture_points'){
							imgType = 'dropped_capture_points';
							
							var point = 0;
							
							if(attr == 'CF_dropped_capture_points'){
								point = 2;
								color1 = getCFColor(Number(sumStat[attr+typeStat[t]] / count).toFixed(point));
							}
							
							content_text = '<font color="'+color1+'">'+Number(sumStat[attr+typeStat[t]] / count).toFixed(point)+'</font>';
						}else if(attr == 'hits' || attr == 'PROC_hits'){
							imgType = 'hits';
							
							var plus = '';
							var point = 0;
							
							if(attr == 'PROC_hits'){
								point = 2;
								plus = '%';
								color1 = getHitsColor(Number(sumStat[attr+typeStat[t]] / count).toFixed(point));
							}
							
							content_text = '<font color="'+color1+'">'+Number(sumStat[attr+typeStat[t]] / count).toFixed(point)+plus+'</font>';
						}
						
						content_text = content_text.replace('NaN', '0');
						content += '<td class="count '+imgType+'">'+content_text+'</td>';
					}
				
					html += ''+
						'<table class="statall">'+
							'<caption style="font-size: 16px; color: #658C4C; font-weight: bold;"><hr />'+localization[typeStat[t]+'_clanstat']+'</caption>'+
							'<tr>'+
								header+
							'</tr>'+
							'<tr>'+
								content+						
							'</tr>'+
						'</table>'+	
					'';
				}
				
				return html;
			}
			var oldStatistics = [];
			var amountStatistics = [];
			var saveStatView = false;
			function CreateTableClan(){			
				var js_send_message_button = document.getElementById("js-send-message-button");
				var js_change_roles_button = document.getElementById("js-change-roles-button");
				if(debug > 0){js_send_message_button = 1; if(debug > 1){js_change_roles_button = 1;}}		

				var table = document.createElement('table');
				table.setAttribute('id', 'newtableclaninfo');
				table.setAttribute('class', 't-table');
				
				var SaveClanStatisticsDate = getLocalStorage('SaveClanStatisticsDate', true);
				var caption = document.createElement('caption');
				caption.setAttribute('style', 'text-align:right;');
				var captionHTML = '';
				
				captionHTML += ''+
					'<div id="viewStatTable" style="width: 200px; float: left; text-align: left; color: #555555;">'+
						'<span style="color: #BFBFBF;">'+localization['viewStatTable']+':</span><br />'+
						'<input type="radio" name="viewStatTable" value=".all" checked />'+localization['AllStat']+'<br />'+
						'<input type="radio" name="viewStatTable" value=".rand" />'+localization['RandStat']+'<br />'+
						'<input type="radio" name="viewStatTable" value=".company" />'+localization['CompanyStat']+'<br />'+
						'<input type="radio" name="viewStatTable" value=".clan" />'+localization['ClanStat']+'<br />'+
					'</div>'+
					'<div id="typeSortTable" style="width: 230px; float: left; text-align: left; color: #555555;">'+
						'<span style="color: #BFBFBF;">'+localization['typeSortTable']+':</span><br />'+
						'<input type="radio" name="typeSortTable" value="" checked />'+localization['typeSortTable.all'] +'<br />'+
						'<input type="radio" name="typeSortTable" value=".old" />'+localization['typeSortTable.old']+'<br />'+
					'</div>'+
				'';
				
				if(SaveClanStatisticsDate != null){
					saveStatView = true;
					
					var date = new Date(SaveClanStatisticsDate);
					captionHTML += ''+
						'<span class="b-ondate" style="padding-right:10px;">'+
							localization['SaveStatisticsText']+' '+date.toLocaleString()+
						'</span>'+	
					'';
				}
				
				captionHTML += ''+
					'<div id="caption" class="b-big-orange-buttonarea b-big-orange-tab">'+
						'<span class="b-big-orange-button" style="height: 26px;">'+
							'<span class="b-big-orange-button_right b-button-wrap" style="height: 26px;">'+
								'<input class="SaveStatistics" type="submit" value="'+localization['SaveStatistics']+'" style="padding: 2px 5px 0px; height: 26px;">'+
							'</span>'+
						'</span>'+
				'';					
				if(js_send_message_button != null && js_change_roles_button != null && ScriptSetting['company'] === "true"){
					captionHTML += ''+
						'<span class="b-big-orange-button" style="height: 26px;">'+
							'<span class="b-big-orange-button_right b-button-wrap" style="height: 26px;">'+
								'<input class="SaveCompany" type="submit" value="'+localization['SaveCompany']+'" style="padding: 2px 5px 0px; height: 26px;">'+
							'</span>'+
						'</span>'+
					'';					
				}
				captionHTML += ''+
					'</div>'+
				'';	
				caption.innerHTML = captionHTML;
				table.appendChild(caption);
				
				var thead = document.createElement('thead');
				var tr_head = document.createElement('tr');	
				getHeadTable(false, 'numer', 'padding-left: 5px; padding-right: 5px;', false, tr_head);
				getHeadTable(true, 'name', false, false, tr_head);	
				var settingStructureTable = getLocalStorage('settingStructureTable', false);
				var attrs = settingStructureTable.split(";");
				for(var i = 0; i < attrs.length - 1; i++){
					var sort = false; if(attrs[i] == oldSortColumn){sort = 'asc';}
					getHeadTable(true, attrs[i], false, sort, tr_head);
				}		
				thead.appendChild(tr_head);
				table.appendChild(thead);

				var tbody = document.createElement('tbody');
				for(index in MembersArray){
					var tr = document.createElement('tr');	
					
					var background = '';
					if(js_send_message_button != null && ScriptSetting['company'] === "true"){				
						var viewCompany = MembersArray[index]['company'];
						var selectedCompany = ['', '', '', '', '', ''];
						switch(MembersArray[index]['company']){
							case '99':
								viewCompany = localization['stock'];
								selectedCompany[0] = 'selected';
								background = 'rgba(254, 14, 0, 0.1)';
							break
							case '1':
								viewCompany = '1 '+localization['rota'];
								selectedCompany[1] = 'selected';
								background = 'rgba(208, 66, 243, 0.1)';
							break
							case '2':
								viewCompany = '2 '+localization['rota'];
								selectedCompany[2] = 'selected';
								background = 'rgba(2, 201, 179, 0.1)';
							break
							case '3':
								viewCompany = '3 '+localization['rota'];
								selectedCompany[3] = 'selected';
								background = 'rgba(96, 255, 0, 0.1)';
							break;
							case '4':
								viewCompany = '4 '+localization['rota'];
								selectedCompany[4] = 'selected';
								background = 'rgba(248, 244, 0, 0.1)';
							break
							case '5':
								viewCompany = '5 '+localization['rota'];
								selectedCompany[5] = 'selected';
								background = 'rgba(254, 121, 3, 0.1)';
							break;
							default:
								viewCompany = localization['stock'];
								selectedCompany[0] = 'selected';
								background = 'rgba(254, 14, 0, 0.1)';
							break
						}
					}
					
					var td_numer = document.createElement('td');
					td_numer.setAttribute('style', 'padding-left: 5px; padding-right: 5px;');
					td_numer.innerHTML = (parseInt(index) + 1);
					tr.appendChild(td_numer);	
					
					var td_name = document.createElement('td');
					td_name.setAttribute('class', 't-name');
					td_name.setAttribute('style', 'white-space: nowrap;');
					td_name.innerHTML = '<b><a style="color: #658C4C;" href="/community/accounts/'+MembersArray[index]['id']+'/">'+MembersArray[index]['name']+'</a></b>';
					tr.appendChild(td_name);
					
					for(var i = 0; i < attrs.length - 1; i++){
						var attr = attrs[i];
						var td = document.createElement('td');
						td.setAttribute('style', 'white-space: nowrap; background: '+background+';');
						td.innerHTML = '<div style="float:left;">'+MembersArray[index][attr]+'</div>';
						
						if(attr == 'role'){
							td.innerHTML = '<div style="float:right;">'+getRole(MembersArray[index]['role_numer'])+'</div>';
						}else if(attr == 'since'){
							td.innerHTML = '<div style="float:right;">'+TimeToDate(MembersArray[index]['since'])+'</div>';
						}else if(attr == 'logout_at'){
							td.innerHTML = '<div style="float:right;">'+TimeToDate(MembersArray[index]['logout_at'])+'</div>';
						}else if(attr == 'last_battle_time'){
							td.innerHTML = '<div style="float:right;">'+TimeToDate(MembersArray[index]['last_battle_time'])+'</div>';
						}
						
						if(ScriptSetting['company'] === "true" && attr == 'company'){
							td.setAttribute('style', 'white-space: pre; background: '+background+';');
							if(js_send_message_button != null && js_change_roles_button != null){
								td.innerHTML = ''+
								'<div style="float:right;">'+
									'<select id="'+MembersArray[index]['id']+'" class="company">'+
										'<option value="99" '+selectedCompany[0]+'>'+localization['stock']+'</option>'+
										'<option value="1" '+selectedCompany[1]+'>1 '+localization['rota']+'</option>'+
										'<option value="2" '+selectedCompany[2]+'>2 '+localization['rota']+'</option>'+
										'<option value="3" '+selectedCompany[3]+'>3 '+localization['rota']+'</option>'+
										'<option value="4" '+selectedCompany[4]+'>4 '+localization['rota']+'</option>'+
										'<option value="5" '+selectedCompany[5]+'>5 '+localization['rota']+'</option>'+
									'</select>'+
								'</div>';
							}else if(js_send_message_button != null){
								td.innerHTML = '<div style="float:right;">'+viewCompany+'</div>';
							}else{
								td.innerHTML = '';
							}
						}
						
						if(typeof MembersArray[index][attr+'.all'] != 'undefined'){
							td.innerHTML = getViewStatTable(index, attr, '.all');
							
							if(MembersArray[index]['battles.all'] >= 1){
								if(typeof amountStatistics[index] == 'undefined'){
									amountStatistics[index] = [];
									
									amountStatistics[index]['battles.all'] = MembersArray[index]['battles.all'];
									amountStatistics[index]['hits_percents.all'] = parseInt(MembersArray[index]['hits_percents.all']);
									amountStatistics[index]['xeff.all'] = parseInt(MembersArray[index]['xeff.all']);
									amountStatistics[index]['xwn6.all'] = parseInt(MembersArray[index]['xwn6.all']);
									amountStatistics[index]['xwn8.all'] = parseInt(MembersArray[index]['xwn8.all']);
									
									amountStatistics[index]['battles.rand'] = MembersArray[index]['battles.rand'];
									amountStatistics[index]['hits_percents.rand'] = parseInt(MembersArray[index]['hits_percents.rand']);
									amountStatistics[index]['xeff.rand'] = parseInt(MembersArray[index]['xeff.rand']);
									amountStatistics[index]['xwn6.rand'] = parseInt(MembersArray[index]['xwn6.rand']);
									amountStatistics[index]['xwn8.rand'] = parseInt(MembersArray[index]['xwn8.rand']);
									
									amountStatistics[index]['battles.company'] = MembersArray[index]['battles.company'];
									amountStatistics[index]['hits_percents.company'] = parseInt(MembersArray[index]['hits_percents.company']);
									amountStatistics[index]['xeff.company'] = parseInt(MembersArray[index]['xeff.company']);
									amountStatistics[index]['xwn6.company'] = parseInt(MembersArray[index]['xwn6.company']);
									amountStatistics[index]['xwn8.company'] = parseInt(MembersArray[index]['xwn8.company']);
									
									amountStatistics[index]['battles.clan'] = MembersArray[index]['battles.clan'];
									amountStatistics[index]['hits_percents.clan'] = parseInt(MembersArray[index]['hits_percents.clan']);
									amountStatistics[index]['xeff.clan'] = parseInt(MembersArray[index]['xeff.clan']);
									amountStatistics[index]['xwn6.clan'] = parseInt(MembersArray[index]['xwn6.clan']);
									amountStatistics[index]['xwn8.clan'] = parseInt(MembersArray[index]['xwn8.clan']);
								}
								amountStatistics[index][attr+'.all'] = MembersArray[index][attr+'.all'];
								amountStatistics[index][attr+'.rand'] = MembersArray[index][attr+'.rand'];
								amountStatistics[index][attr+'.company'] = MembersArray[index][attr+'.company'];
								amountStatistics[index][attr+'.clan'] = MembersArray[index][attr+'.clan'];
							}
							
							if(saveStatView){
								var point = 0;
								if((attr.indexOf('CF_') > -1 || attr.indexOf('PROC_') > -1) && (attr != 'CF_xp' && attr != 'CF_damage_dealt' && attr != 'CF_damage_received')){
									point = 2;
								}
								
								if(MembersArray[index][attr+'.all'+'.old'] !== 'undefined'){
									var difference = (MembersArray[index][attr+'.all'+'.old']).toFixed(point);
									
									var color = '#979899';
									if(difference > 0){color = 'green'; difference = '+'+difference;}
									if(difference < 0){color = 'red';}
									
									td.innerHTML += '<div style="color: '+color+';font-size:80%; height: 10px; position:relative; text-align:right; margin-top: -30px;">'+
										difference+
									'</div>';
								}								
							}
						}					
						tr.appendChild(td);
					}
					
					tbody.appendChild(tr);
				}	
				table.appendChild(tbody);
				
				return table;			
			}
			function onSaveStatistics(){
				var SaveStatistics = '';
				var typeStat = [".all", ".rand", ".company", ".clan"];
				
				for(index in MembersArray){
					if(SaveStatistics != ''){SaveStatistics += ';';}
				
					SaveStatistics += MembersArray[index]['id']+'<@>';
					
					for(var i = 0; i < typeStat.length; i++){
						SaveStatistics += ''+
							MembersArray[index]['spotted'+typeStat[i]]+':'+
							MembersArray[index]['hits'+typeStat[i]]+':'+
							MembersArray[index]['battle_avg_xp'+typeStat[i]]+':'+
							MembersArray[index]['draws'+typeStat[i]]+':'+
							MembersArray[index]['wins'+typeStat[i]]+':'+
							MembersArray[index]['losses'+typeStat[i]]+':'+
							MembersArray[index]['capture_points'+typeStat[i]]+':'+
							MembersArray[index]['battles'+typeStat[i]]+':'+
							MembersArray[index]['damage_dealt'+typeStat[i]]+':'+
							MembersArray[index]['hits_percents'+typeStat[i]]+':'+
							MembersArray[index]['damage_received'+typeStat[i]]+':'+
							MembersArray[index]['shots'+typeStat[i]]+':'+
							MembersArray[index]['xp'+typeStat[i]]+':'+
							MembersArray[index]['frags'+typeStat[i]]+':'+
							MembersArray[index]['survived_battles'+typeStat[i]]+':'+
							MembersArray[index]['dropped_capture_points'+typeStat[i]]+':'+
							MembersArray[index]['PROC_wins'+typeStat[i]]+':'+
							MembersArray[index]['PROC_losses'+typeStat[i]]+':'+
							MembersArray[index]['PROC_draws'+typeStat[i]]+':'+
							MembersArray[index]['PROC_survived_battles'+typeStat[i]]+':'+
							MembersArray[index]['PROC_hits'+typeStat[i]]+':'+
							MembersArray[index]['CF_xp'+typeStat[i]]+':'+
							MembersArray[index]['CF_frags'+typeStat[i]]+':'+
							MembersArray[index]['CF_spotted'+typeStat[i]]+':'+
							MembersArray[index]['CF_shots'+typeStat[i]]+':'+
							MembersArray[index]['CF_damage_dealt'+typeStat[i]]+':'+
							MembersArray[index]['CF_damage_received'+typeStat[i]]+':'+
							MembersArray[index]['CF_capture_points'+typeStat[i]]+':'+
							MembersArray[index]['CF_dropped_capture_points'+typeStat[i]]+':'+
							MembersArray[index]['kpd'+typeStat[i]]+':'+
							MembersArray[index]['xeff'+typeStat[i]]+':'+
							MembersArray[index]['wn6'+typeStat[i]]+':'+
							MembersArray[index]['xwn6'+typeStat[i]]+':'+
							MembersArray[index]['wn7'+typeStat[i]]+':'+
							MembersArray[index]['wn8'+typeStat[i]]+':'+
							MembersArray[index]['xwn8'+typeStat[i]]+':'+
							MembersArray[index]['bs'+typeStat[i]]+':'+
							MembersArray[index]['glory_points'+typeStat[i]]+':'+
							MembersArray[index]['glory_position'+typeStat[i]]+':'+
							MembersArray[index]['max_xp'+typeStat[i]]+':'+
							MembersArray[index]['global_rating'+typeStat[i]]+'<@>'+							
						'';
					}		
				}
				
				setLocalStorage('SaveClanStatisticsDate', new Date(), true);
				setLocalStorage('SaveClanStatistics', SaveStatistics, true);

				wgsdk.message_box(
					localization['Box'], 
					localization['SaveStatisticsYes'], 
					{
						confirm:{
							text: "OK", 
							click: function(){}
						}
					}
				);				
			}
			var JSONCompany = null;
			function onSaveCompany(){
				JSONCompany = {members: []};
				var company = document.getElementsByClassName("company");
				for(var c = 0; c < company.length; c++){
					var id = company[c].getAttribute('id');
					var value = company[c].options[company[c].selectedIndex].value;
					JSONCompany.members.push({"id" : id, "company" : value,});				
				}
				setJSONCompany(JSONCompany);
			}
			function setJSONCompany(data){
				var jsonString = 'json='+JSON.stringify(data)+'&type=set&clanId='+clanId;
			
				var xmlhttp;
				try{
					xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
				}catch(e){
					try{
						xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
					}catch(E){
						xmlhttp = false;
					}
				}
				if(!xmlhttp && typeof XMLHttpRequest != 'undefined'){
					xmlhttp = new XMLHttpRequest();
				}
				xmlhttp.open("POST", "http://walkure.pro/US_ClanInfo/index.php", true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.setRequestHeader("Content-Length", jsonString.length);
				xmlhttp.send(jsonString);
				
				getJson('http://walkure.pro/US_ClanInfo/index.php?type=check&clanId='+clanId, doneCheckSaveCompany, errorCheckSaveCompany);
			}
			function doneCheckSaveCompany(url, response){
				Process--;
				var JSONSaveCompany = response;
				if(JSONSaveCompany.toString() == JSONCompany.toString()){
					wgsdk.message_box(
						localization['Box'], 
						localization['SaveCompanyYes'], 
						{
							confirm:{
								text: "OK", 
								click: function(){}
							}
						}
					);				
				}else{
					wgsdk.error(
						localization['SaveCompanyNo'], 
						undefined, 
						undefined, 
						{
							title: localization['Box']
						}
					);
				}
			}		
			function errorCheckSaveCompany(){
				Process--;
				wgsdk.error(
					localization['SaveCompanyNo'], 
					undefined, 
					undefined, 
					{
						title: localization['Box']
					}
				);			
			}			
			function onSort(name){
				wgsdk.waiting('open');
			
				var js_send_message_button = document.getElementById("js-send-message-button");
				var js_change_roles_button = document.getElementById("js-change-roles-button");
				if(debug > 0){js_send_message_button = 1; if(debug > 1){js_change_roles_button = 1;}}		

				var table = document.getElementById('newtableclaninfo');
				var sort_column = document.getElementById('sort-'+name);
				
				var viewStat = '.all';
				var viewStatTable = document.getElementById('viewStatTable');
				var input = viewStatTable.getElementsByTagName('input');
				for(var i = 0; i < input.length; i++){
					if(input[i].checked){
						viewStat = input[i].value;
					}
				}
				
				var typeSort = '';
				var typeSortTable = document.getElementById('typeSortTable');
				var input = typeSortTable.getElementsByTagName('input');
				for(var i = 0; i < input.length; i++){
					if(input[i].checked){
						typeSort = input[i].value;
					}
				}
				
				var sortName = name;
				if(name != 'name' && name != 'role_numer' && name != 'since' && name != 'day' && name != 'company' && name != 'logout_at' && name != 'last_battle_time'){
					sortName = name+viewStat+typeSort;
				}

				if(!autoSortColumn){
					if(sort_column.getAttribute('class') === 'desc'){
						MembersArray.sort(ASC(sortName));
						sort_column.setAttribute('class', 'asc');
					}else{
						MembersArray.sort(DESC(sortName));
						sort_column.setAttribute('class', 'desc');
					}			
					
					if(oldSortColumn != name){
						var old_sort_column = document.getElementById('sort-'+oldSortColumn);
						old_sort_column.setAttribute('class', '');
						oldSortColumn = name;
					}
				}else{
					if(sort_column.getAttribute('class') === 'desc'){
						MembersArray.sort(DESC(sortName));
					}else{
						MembersArray.sort(ASC(sortName));
					}
				}
				autoSortColumn = false;
				
				var settingStructureTable = getLocalStorage('settingStructureTable', false);
				var attrs = settingStructureTable.split(";");
				
				var index = 0;
				for(var r = 0; r < table.rows.length; r++){
					if(r > 0){
						var row = table.rows[r];
						
						var background = '';
						if(js_send_message_button != null && ScriptSetting['company'] === "true"){				
							var viewCompany = MembersArray[index]['company'];
							var selectedCompany = ['', '', '', '', '', ''];
							switch(MembersArray[index]['company']){
								case '99':
									viewCompany = localization['stock'];
									selectedCompany[0] = 'selected';
									background = 'rgba(254, 14, 0, 0.1)';
								break
								case '1':
									viewCompany = '1 '+localization['rota'];
									selectedCompany[1] = 'selected';
									background = 'rgba(208, 66, 243, 0.1)';
								break
								case '2':
									viewCompany = '2 '+localization['rota'];
									selectedCompany[2] = 'selected';
									background = 'rgba(2, 201, 179, 0.1)';
								break
								case '3':
									viewCompany = '3 '+localization['rota'];
									selectedCompany[3] = 'selected';
									background = 'rgba(96, 255, 0, 0.1)';
								break;
								case '4':
									viewCompany = '4 '+localization['rota'];
									selectedCompany[4] = 'selected';
									background = 'rgba(248, 244, 0, 0.1)';
								break
								case '5':
									viewCompany = '5 '+localization['rota'];
									selectedCompany[5] = 'selected';
									background = 'rgba(254, 121, 3, 0.1)';
								break;
								default:
									viewCompany = localization['stock'];
									selectedCompany[0] = 'selected';
									background = 'rgba(254, 14, 0, 0.1)';
								break
							}
						}					
						
						var cellNumer = 0;
						
						var cell_numer = row.cells[cellNumer];
						cell_numer.setAttribute('style', 'padding-left: 5px; padding-right: 5px;');
						cell_numer.innerHTML = (parseInt(index) + 1);
						cellNumer++;
						
						var cell_name = row.cells[cellNumer];
						cell_name.setAttribute('class', 't-name');
						cell_name.setAttribute('style', 'white-space: nowrap;');
						cell_name.innerHTML = '<b><a style="color: #658C4C;" href="/community/accounts/'+MembersArray[index]['id']+'/">'+MembersArray[index]['name']+'</a></b>';
						cellNumer++;
						
						for(var i = 0; i < attrs.length - 1; i++){
							var attr = attrs[i];
							var cell = row.cells[cellNumer];
							
							cell.setAttribute('style', 'white-space: nowrap; background: '+background+';');
							cell.innerHTML = '<div style="float:left;">'+MembersArray[index][attr]+'</div>';
							
							if(attr == 'role'){
								cell.innerHTML = '<div style="float:right;">'+getRole(MembersArray[index]['role_numer'])+'</div>';
							}else if(attr == 'since'){
								cell.innerHTML = '<div style="float:right;">'+TimeToDate(MembersArray[index]['since'])+'</div>';
							}else if(attr == 'logout_at'){
								cell.innerHTML = '<div style="float:right;">'+TimeToDate(MembersArray[index]['logout_at'])+'</div>';
							}else if(attr == 'last_battle_time'){
								cell.innerHTML = '<div style="float:right;">'+TimeToDate(MembersArray[index]['last_battle_time'])+'</div>';
							}
							
							if(ScriptSetting['company'] === "true" && attr == 'company'){
								cell.setAttribute('style', 'white-space: pre; background: '+background+';');
								if(js_send_message_button != null && js_change_roles_button != null){
									cell.innerHTML = ''+
									'<div style="float:right;">'+
										'<select id="'+MembersArray[index]['id']+'" class="company">'+
											'<option value="99" '+selectedCompany[0]+'>'+localization['stock']+'</option>'+
											'<option value="1" '+selectedCompany[1]+'>1 '+localization['rota']+'</option>'+
											'<option value="2" '+selectedCompany[2]+'>2 '+localization['rota']+'</option>'+
											'<option value="3" '+selectedCompany[3]+'>3 '+localization['rota']+'</option>'+
											'<option value="4" '+selectedCompany[4]+'>4 '+localization['rota']+'</option>'+
											'<option value="5" '+selectedCompany[5]+'>5 '+localization['rota']+'</option>'+
										'</select>'+
									'</div>';
								}else if(js_send_message_button != null){
									cell.innerHTML = '<div style="float:right;">'+viewCompany+'</div>';
								}else{
									cell.innerHTML = '';
								}
							}
						
							if(typeof MembersArray[index][attr+viewStat] != 'undefined'){
								cell.innerHTML = getViewStatTable(index, attr, viewStat);
								
								if(saveStatView){
									var point = 0;
									if((attr.indexOf('CF_') > -1 || attr.indexOf('PROC_') > -1) && (attr != 'CF_xp' && attr != 'CF_damage_dealt' && attr != 'CF_damage_received')){
										point = 2;
									}
									
									var difference = (MembersArray[index][attr+viewStat+'.old']).toFixed(point);
									
									var color = '#979899';
									if(difference > 0){color = 'green'; difference = '+'+difference;}
									if(difference < 0){color = 'red';}
									
									cell.innerHTML += '<div style="color: '+color+';font-size:80%; height: 10px; position:relative; text-align:right; margin-top: -30px;">'+
										difference+
									'</div>';
								}
							}
							
							cellNumer++;
						}
						
						index++;
					}
				}
				
				wgsdk.waiting('close');
			}
			function getViewStatTable(index, attr, viewStat){
				var html = '';
				
				var mainHTML = breakNumer(Number(MembersArray[index][attr+viewStat]).toFixed(0));
				var tooltipHTML = '';
				
				if(attr == 'glory_points' || attr == 'glory_position' || attr == 'max_xp' || attr == 'global_rating'){
					var color1 = '#979899';
					
					if(attr == 'max_xp'){
						color1 = getMaxXP(MembersArray[index]['max_xp.all']);
					}
					
					html = ""+
					'<div style="text-align:right;">'+
						'<font color="'+color1+'">'+
							mainHTML+
						'</font>'+
					'</div>';
					return html;
				}				
				
				var typeStat = [".all", ".rand", ".company", ".clan"];

				for(var i = 0; i < typeStat.length; i++){
					var color1 = '#979899';
					var color2 = '#979899';
					var counting = NaN;
					var mainStat = Number(MembersArray[index][attr+typeStat[i]]).toFixed(0);
					var tooltipStat = Number(MembersArray[index][attr+typeStat[i]]).toFixed(0);
					
					if(attr.indexOf('PROC_') > -1){
						if(attr == 'PROC_wins'){
							color1 = getWinrateColor(MembersArray[index][attr+typeStat[i]]);
						}else if(attr == 'PROC_hits'){
							color1 = getHitsColor(MembersArray[index][attr+typeStat[i]]);
						}else if(attr == 'PROC_survived_battles'){
							color1 = getPROCSurvivedColor(MembersArray[index][attr+typeStat[i]]);
						}
					
						if(typeStat[i] == viewStat){						
							mainHTML = ''+
								'<font color="'+color1+'">'+
									MembersArray[index][attr+typeStat[i]]+'%'+
								'</font>'
							'';
						}
						
						tooltipStat = ''+
							'<font color="'+color1+'">'+
								MembersArray[index][attr+typeStat[i]]+'%'+
							'</font>'+
						'';
					}else if(attr.indexOf('CF_') > -1){
						var point = 2;
						
						if(attr == 'CF_xp' || attr == 'CF_damage_dealt' || attr == 'CF_damage_received'){
							point = 0;
							if(attr == 'CF_xp'){
								color1 = getCFXP(Number(MembersArray[index][attr+typeStat[i]]).toFixed(point));
							}
						}
						
						if(attr == 'CF_damage_dealt'){
							color1 = getCFDamageColor(Number(MembersArray[index][attr+typeStat[i]]).toFixed(point));
						}else if(attr == 'CF_frags' || attr == 'CF_spotted' || attr == 'CF_capture_points' || attr == 'CF_dropped_capture_points'){
							color1 = getCFColor(Number(MembersArray[index][attr+typeStat[i]]).toFixed(point));
						}
						
						if(typeStat[i] == viewStat){	
							mainHTML = ''+
								'<font color="'+color1+'">'+
									Number(MembersArray[index][attr+typeStat[i]]).toFixed(point)+
								'</font>'
							'';
						}
						
						tooltipStat = ''+
							'<font color="'+color1+'">'+
								Number(MembersArray[index][attr+typeStat[i]]).toFixed(point)+
							'</font>'+
						'';
					}else if(attr == 'kpd' || attr == 'wn6' || attr == 'wn8'){
						var plus = '';
						
						if(attr == 'kpd'){
							mainStat = Number(MembersArray[index]['kpd'+typeStat[i]]).toFixed(0);
							counting = Number(MembersArray[index]['xeff'+typeStat[i]]).toFixed(0);
							if(isNaN(counting)){counting = 0;}
							color1 = getXVMColor(counting);
							color2 = getXVMColor(counting);
						}else if(attr == 'wn6'){
							mainStat = Number(MembersArray[index]['wn6'+typeStat[i]]).toFixed(0);
							counting = Number(MembersArray[index]['xwn6'+typeStat[i]]).toFixed(0);
							if(isNaN(counting)){counting = 0;}
							color1 = getXVMColor(counting);
							color2 = getXVMColor(counting);
						}else if(attr == 'wn8'){
							mainStat = Number(MembersArray[index]['wn8'+typeStat[i]]).toFixed(0);
							counting = Number(MembersArray[index]['xwn8'+typeStat[i]]).toFixed(0);
							if(isNaN(counting)){counting = 0;}
							color1 = getXVMColor(counting);
							color2 = getXVMColor(counting);
						}
						
						if(typeStat[i] == viewStat){
							mainHTML = ''+
								'<font color="'+color1+'">'+
									breakNumer(mainStat)+
								'</font>'+
								' <b>/</b> '+
								'<font color="'+color2+'">'+
									breakNumer(counting)+
									plus+
								'</font>'+
							'';
						}
						
						tooltipStat = ''+
							'<font color="'+color1+'">'+
								breakNumer(mainStat)+
							'</font>'+
							' <b>/</b> '+
							'<font color="'+color2+'">'+
								counting+
								plus+
							'</font>'+
						'';
					}else if(attr == 'battles' || attr == 'bs'){
						if(typeStat[i] == viewStat){	
							if(attr == 'battles'){
								color1 = getBattlesColor(mainStat);
							}else if(attr == 'bs'){
								color1 = getArmorColor(mainStat);
							}
							mainHTML = ''+
								'<font color="'+color1+'">'+
									mainStat+
								'</font>'
							'';	
						}
						
						tooltipStat = ''+
							'<font color="'+getBattlesColor(tooltipStat)+'">'+
								tooltipStat+
							'</font>'+
						'';
					}

					tooltipHTML += '<b>'+localization[typeStat[i]]+':</b> '+tooltipStat+'<br />';		
				}
				
				html += ''+
					'<div style="text-align:right;">'+
						'<a class="tooltip_table">'+
							mainHTML+
							'<span class="classic_table">'+
								'<div style="width: 300px;">'+
									'<b><font color="#FFFFFF">'+localization[attr]+'</font></b><br />'+
									tooltipHTML+
								'</div>'+
							'</span>'+
						'</a>'+	
					'</div>'+
				'';			
				
				return html;
			}
			function getHeadTable(attId, name, style, sort_class, tr_head){
				var th = document.createElement('th');
				var sort_name = name; if(sort_name == 'role'){sort_name = 'role_numer';}
				if(attId){
					th.setAttribute('id', 'sort-'+sort_name);
					th.setAttribute('title', localization[name]);
					th.setAttribute('alt', localization[name]);
					th.addEventListener("click", function(){onSort(sort_name);}, false);
					th.innerHTML += '<span class="b-sort-box"><i></i>'+localization[name+'V']+'</span>';
				}else{
					th.innerHTML += '<span>'+localization[name+'V']+'</span>';
				}
				if(style){
					th.setAttribute('style', style);
				}
				if(sort_class){
					th.setAttribute('class', sort_class);
				}
				tr_head.appendChild(th);			
			}		
			function CreateVehicleClan(){
				var display = 'block';
				var vehicle_class = 'link';
				var block_vehicle = getLocalStorage('vehicleB', false);
				if(null == block_vehicle){
					vehicle_class += ' show';
					display = 'block';
				}else{
					vehicle_class += ' '+block_vehicle;
					if(block_vehicle == 'hide'){display = 'none';}else{display = 'block';}
				}	

				var vehicleB = document.createElement('div');
				vehicleB.setAttribute('style', 'margin-bottom: 20px;');
				vehicleB.setAttribute('id', 'vehicle-block');
				var statHTML = ''+
					'<div class="link">'+
						'<span id="vehicleB" class="'+vehicle_class+'">'+
							localization['VehicleLink']+
						'</span>'+
					'</div>'+
					'<div class="b-user-block b-speedometer-wrpr vehicleB" style="display: '+display+'; margin: 0px; padding: 0px;">'+
						'<div align="center" class="b-head-block style_block_head">'+
							'<h3>'+localization['VehicleHead']+'</h3>'+
						'</div>'+
						'<div class="vehiclesclan" style="border: 1px solid #2E3139;">'+
							'<div class="rote" id="vehicles" company="absolute" style="cursor: pointer;">'+localization['absolute']+'<div align="right" style="float:right;"></div></div>'+
							'<div id="absolute" view="hide" style="display: none;"></div>'+
						'</div>'+
						'<div class="vehiclesclan" style="border: 1px solid #2E3139;">'+
							'<div class="rote" id="vehicles" company="championship" style="cursor: pointer;">'+localization['championship']+'<div align="right" style="float:right;"></div></div>'+
							'<div id="championship" view="hide" style="display: none;"></div>'+
						'</div>'+
						'<div class="vehiclesclan" style="border: 1px solid #2E3139;">'+
							'<div class="rote" id="vehicles" company="average" style="cursor: pointer;">'+localization['average']+'<div align="right" style="float:right;"></div></div>'+
							'<div id="average" view="hide" style="display: none;"></div>'+
						'</div>'+
						'<div class="vehiclesclan" style="border: 1px solid #2E3139;">'+
							'<div class="rote" id="vehicles" company="junior" style="cursor: pointer;">'+localization['junior']+'<div align="right" style="float:right;"></div></div>'+
							'<div id="junior" view="hide" style="display: none;"></div>'+
						'</div>'+
					'</div>'+
				'';	
				
				vehicleB.innerHTML = statHTML;
				var parentElement = document.getElementById('clans_info_content');
				var theFirstChild = parentElement.firstChild;
				parentElement.insertBefore(vehicleB, theFirstChild);	
				jQ("#vehicleB").click(function(){onView(this);});			
				jQ(".rote").click(function(){onViewVehicle(this);});		
			}
			function onViewVehicle(element){
				var company = element.getAttribute('company');
				var type = document.getElementById(company);
				var view = type.getAttribute('view');
				if(view == 'hide'){
					type.innerHTML = getVehicleClan(company);			
					type.setAttribute('view', 'show');
					type.style.display = 'block';
				}else{
					type.innerHTML = '';			
					type.setAttribute('view', 'hide');
					type.style.display = 'none';
				}
				jQ(".img_tank").click(function(){onViewVehicleMembers(this);});	
			}
			function getVehicleClan(company){
				var html = '<table class="vehicleall">';
				var level = 0;
				if('absolute' == company){level = 10;}
				if('championship' == company){level = 8;}
				if('average' == company){level = 6;}
				if('junior' == company){level = 4;}
				
				for(var tI = 0; tI < 5; tI++){
					var type = ''; var count = 0; var img = '';
					if(tI == 0){type = 'lightTank'}
					if(tI == 1){type = 'mediumTank'}
					if(tI == 2){type = 'heavyTank'}
					if(tI == 3){type = 'AT-SPG'}
					if(tI == 4){type = 'SPG'}
					
					for(var key in TankArray[type][level]){
						var tank = Encyclopedia['data'][key];
						var tankName = tank['name_i18n'];
						var tankNameI = (tank['name'].split(':'))[1];
						
						/* fix start */
						if(tankNameI == 'Bat_Chatillon155'){tankNameI = 'Bat_Chatillon155_58';}
						if(tankNameI == 'AMX_50_68t'){tankNameI = 'F10_AMX_50B';}
						if(tankNameI == 'IS-6'){tankNameI = 'Object252';}
						if(tankNameI == '_M44'){tankNameI = 'M44';}
						/* fix end */					
						
						img += ''+
							'<div style="background:url(/static/3.12.0.3/common/img/nation/'+tank['nation']+'.png) no-repeat; float: left;  margin-right: -40px;">'+
								'<a class="tooltip2" type="'+type+'" level="'+level+'" key="'+key+'">'+
									'<img src="/static/2.5.1/encyclopedia/tankopedia/vehicle/small/'+tank['nation']+'-'+tankNameI.toLowerCase()+'.png" class="img_tank" type="'+type+'" level="'+level+'" key="'+key+'">'+
									'<span class="classic">'+
										'<b>'+localization['tank']+':</b> '+tankName+'<br />'+
									'</span>'+
								'</a>'+	
								'<div class="b-achivements_wrpr count">'+
									'<span class="b-achivements_num">'+
										'<span>'+TankArray[type][level][key]['count']+'</span>'+
									'</span>'+
								'</div>'+						
							'</div>';						
						count += TankArray[type][level][key]['count'];
					
					}		
					
					html += ''+
						'<tr>'+
							'<td class="name_tank_block">'+
								localization[type]+
								'<div class="b-achivements_wrpr count_tank"><span class="b-achivements_num"><span>'+count+'</span></span></div>'+
							'</td>'+
							'<td class="img_tank_block">'+
								img+
							'</td>'+
						'</tr>';		
				}
				
				html += '</table>';
				return html;			
			}		
			function onViewVehicleMembers(element){
				var type = element.getAttribute('type');
				var level = element.getAttribute('level');
				var key = element.getAttribute('key');	
				
				var members_yes = TankArray[type][level][key]['members'];
				var members_no = '';
				var members_yes_split = TankArray[type][level][key]['members'].split(', ');
				for(index in MembersArray){
					if(find(members_yes_split, MembersArray[index]['name']) == -1){
						if(members_no != ''){members_no += ', ';}
						members_no += MembersArray[index]['name'];
					}			
				}
				
				var member_dialog_title = document.getElementsByClassName("member-dialog-title")[0];
				var member_dialog_content = document.getElementsByClassName("member-dialog-content")[0];	
				
				var tank = Encyclopedia['data'][key];
				var tankName = tank['name_i18n'];
				var tankNameI = (tank['name'].split(':'))[1];
				
				/* fix start */
				if(tankNameI == 'Bat_Chatillon155'){tankNameI = 'Bat_Chatillon155_58';}
				if(tankNameI == 'AMX_50_68t'){tankNameI = 'F10_AMX_50B';}
				if(tankNameI == 'IS-6'){tankNameI = 'Object252';}
				if(tankNameI == '_M44'){tankNameI = 'M44';}
				/* fix end */			
				
				member_dialog_title.innerHTML = localization['tank']+': '+tankName;
				member_dialog_content.innerHTML = ''+
					'<div style="padding: 10px;">'+
						'<div class="b-img-text_img b-img-text_img_slot" style="float:left; padding-right: 10px; padding-bottom: 10px;">'+
							'<img src="/static/2.5.1/encyclopedia/tankopedia/vehicle/'+tank['nation']+'-'+tankNameI.toLowerCase()+'.png" alt="'+tankName+'" />'+
						'</div>'+
						'<div style="width: 710px; float: right;">'+
							'<p><b><font color="green">'+localization['yes_tank']+':</font></b> '+members_yes+'.</p>'+
							'<p><b><font color="red">'+localization['no_tank']+':</font></b> '+members_no+'.</p>'+
						'</div>'+
					'</div>'+
				'';
				
		
				document.getElementsByClassName("member-dialog")[0].style.top = (window.scrollY+250)+'px';
				document.getElementsByClassName("member-info")[0].style.display = 'inline';	
			}		
			function CreateRatingClan(){
				var display = 'block';
				var rating_class = 'link';
				var block_rating = getLocalStorage('ratingB', false);
				if(null == block_rating){
					rating_class += ' show';
					display = 'block';
				}else{
					rating_class += ' '+block_rating;
					if(block_rating == 'hide'){display = 'none';}else{display = 'block';}
				}	

				var ratingB = document.createElement('div');
				ratingB.setAttribute('style', 'margin-bottom: 20px;');
				ratingB.setAttribute('id', 'rating-block');
				var statHTML = ''+
					'<div class="link">'+
						'<span id="ratingB" class="'+rating_class+'">'+
							localization['RatingLink']+
						'</span>'+
					'</div>'+
					'<div class="b-user-block b-speedometer-wrpr ratingB" style="display: '+display+'; margin: 0px; padding: 0px;">'+
						'<div align="center" class="b-head-block style_block_head">'+
							'<h3>'+localization['RatingHead']+'</h3>'+
						'</div>'+
						'<table class="t-profile ratingall" cellspacing="0" cellpadding="0">'+
							'<tbody>'+
								'<tr>'+
									'<th colspan="2">'+
										localization['rating']+
									'</th>'+
									'<th>'+
										localization['name']+
									'</th>'+
									'<th style="text-align: right;">'+
										localization['value']+
									'</th>'+
									'<th style="text-align: right;">'+
										localization['rank']+
									'</th>'+
								'</tr>'+
								getRatingsTable('Rglobal_rating', RatingsArray['global_rating']['name'], RatingsArray['global_rating']['value'], RatingsArray['global_rating']['rank'])+
								getRatingsTable('Rbattles_count', RatingsArray['battles_count']['name'], RatingsArray['battles_count']['value'], RatingsArray['battles_count']['rank'])+
								//getRatingsTable('Rdamage_avg', RatingsArray['damage_avg']['name'], RatingsArray['damage_avg']['value'], RatingsArray['damage_avg']['rank'])+
								getRatingsTable('Rdamage_dealt', RatingsArray['damage_dealt']['name'], RatingsArray['damage_dealt']['value'], RatingsArray['damage_dealt']['rank'])+
								//getRatingsTable('Rfrags_avg', RatingsArray['frags_avg']['name'], RatingsArray['frags_avg']['value'], RatingsArray['frags_avg']['rank'])+
								getRatingsTable('Rfrags_count', RatingsArray['frags_count']['name'], RatingsArray['frags_count']['value'], RatingsArray['frags_count']['rank'])+
								getRatingsTable('Rhits_ratio', RatingsArray['hits_ratio']['name'], RatingsArray['hits_ratio']['value'], RatingsArray['hits_ratio']['rank'])+
								//getRatingsTable('Rspotted_avg', RatingsArray['spotted_avg']['name'], RatingsArray['spotted_avg']['value'], RatingsArray['spotted_avg']['rank'])+
								//getRatingsTable('Rspotted_count', RatingsArray['spotted_count']['name'], RatingsArray['spotted_count']['value'], RatingsArray['spotted_count']['rank'])+
								getRatingsTable('Rsurvived_ratio', RatingsArray['survived_ratio']['name'], RatingsArray['survived_ratio']['value'], RatingsArray['survived_ratio']['rank'])+
								getRatingsTable('Rwins_ratio', RatingsArray['wins_ratio']['name'], RatingsArray['wins_ratio']['value'], RatingsArray['wins_ratio']['rank'])+
								//getRatingsTable('Rxp_amount', RatingsArray['xp_amount']['name'], RatingsArray['xp_amount']['value'], RatingsArray['xp_amount']['rank'])+
								getRatingsTable('Rxp_avg', RatingsArray['xp_avg']['name'], RatingsArray['xp_avg']['value'], RatingsArray['xp_avg']['rank'])+
								getRatingsTable('Rxp_max', RatingsArray['xp_max']['name'], RatingsArray['xp_max']['value'], RatingsArray['xp_max']['rank'])+
								//getRatingsTable('Rcapture_points', RatingsArray['capture_points']['name'], RatingsArray['capture_points']['value'], RatingsArray['capture_points']['rank'])+
							'</tbody>'+
						'</table>'+
					'</div>'+
				'';	
				
				ratingB.innerHTML = statHTML;
				var parentElement = document.getElementById('clans_info_content');
				var theFirstChild = parentElement.firstChild;
				parentElement.insertBefore(ratingB, theFirstChild);	
				jQ("#ratingB").click(function(){onView(this);});						
			}		
			function getRatingsTable(type_name, name, value, rank){
				var rating = ''+
					'<tr>'+
						'<td class="t-rate-ico" style="padding: 3px 0px 3px 14px;">'+
							'<span class="'+type_name+'" />'+
						'</td>'+
						'<td class="t-headminor" style="padding: 8px 14px;">'+
							localization[type_name]+
						'</td>'+
						'<td class="t-right" style="padding: 8px 14px;">'+
							name+
						'</td>'+
						'<td align="right" class="t-right" style="padding: 8px 14px;">'+
							value+
						'</td>'+
						'<td align="right" class="t-right" style="padding: 8px 14px;">'+
							breakNumer(rank)+
						'</td>'+
					'</tr>';
				return rating;
			}		
			function Counting(){
				var MembersStatistics = [];
				var SaveClanStatistics = getLocalStorage('SaveClanStatistics', true);
				if(SaveClanStatistics != null){
					MembersStatistics = SaveClanStatistics.split(';');
				}
			
				for(index in MembersArray){
					if(loadMemberId != -1 && loadMemberId != index){
						continue;
					}
				
					MembersArray[index]['spotted'+'.rand'] = MembersArray[index]['spotted'+'.all'] - MembersArray[index]['spotted'+'.clan'] - MembersArray[index]['spotted'+'.company'];
					MembersArray[index]['hits'+'.rand'] = MembersArray[index]['hits'+'.all'] - MembersArray[index]['hits'+'.clan'] - MembersArray[index]['hits'+'.company'];
					MembersArray[index]['draws'+'.rand'] = MembersArray[index]['draws'+'.all'] - MembersArray[index]['draws'+'.clan'] - MembersArray[index]['draws'+'.company'];
					MembersArray[index]['wins'+'.rand'] = MembersArray[index]['wins'+'.all'] - MembersArray[index]['wins'+'.clan'] - MembersArray[index]['wins'+'.company'];
					MembersArray[index]['losses'+'.rand'] = MembersArray[index]['losses'+'.all'] - MembersArray[index]['losses'+'.clan'] - MembersArray[index]['losses'+'.company'];
					MembersArray[index]['capture_points'+'.rand'] = MembersArray[index]['capture_points'+'.all'] - MembersArray[index]['capture_points'+'.clan'] - MembersArray[index]['capture_points'+'.company'];
					MembersArray[index]['battles'+'.rand'] = MembersArray[index]['battles'+'.all'] - MembersArray[index]['battles'+'.clan'] - MembersArray[index]['battles'+'.company'];
					MembersArray[index]['damage_dealt'+'.rand'] = MembersArray[index]['damage_dealt'+'.all'] - MembersArray[index]['damage_dealt'+'.clan'] - MembersArray[index]['damage_dealt'+'.company'];
					MembersArray[index]['damage_received'+'.rand'] = MembersArray[index]['damage_received'+'.all'] - MembersArray[index]['damage_received'+'.clan'] - MembersArray[index]['damage_received'+'.company']; 
					MembersArray[index]['shots'+'.rand'] = MembersArray[index]['shots'+'.all'] - MembersArray[index]['shots'+'.clan'] - MembersArray[index]['shots'+'.company'];
					MembersArray[index]['xp'+'.rand'] = MembersArray[index]['xp'+'.all'] - MembersArray[index]['xp'+'.clan'] - MembersArray[index]['xp'+'.company'];
					MembersArray[index]['frags'+'.rand'] = MembersArray[index]['frags'+'.all'] - MembersArray[index]['frags'+'.clan'] - MembersArray[index]['frags'+'.company'];
					MembersArray[index]['survived_battles'+'.rand'] = MembersArray[index]['survived_battles'+'.all'] - MembersArray[index]['survived_battles'+'.clan'] - MembersArray[index]['survived_battles'+'.company'];
					MembersArray[index]['dropped_capture_points'+'.rand'] = MembersArray[index]['dropped_capture_points'+'.all'] - MembersArray[index]['dropped_capture_points'+'.clan'] - MembersArray[index]['dropped_capture_points'+'.company'];
					
					if(isNaN(MembersArray[index]['spotted'+'.rand'])){MembersArray[index]['spotted'+'.rand'] = 0;}
					if(isNaN(MembersArray[index]['hits'+'.rand'])){MembersArray[index]['hits'+'.rand'] = 0;}
					if(isNaN(MembersArray[index]['draws'+'.rand'])){MembersArray[index]['draws'+'.rand'] = 0;}
					if(isNaN(MembersArray[index]['losses'+'.rand'])){MembersArray[index]['losses'+'.rand'] = 0;}
					if(isNaN(MembersArray[index]['capture_points'+'.rand'])){MembersArray[index]['capture_points'+'.rand'] = 0;}
					if(isNaN(MembersArray[index]['battles'+'.rand'])){MembersArray[index]['battles'+'.rand'] = 0;}
					if(isNaN(MembersArray[index]['damage_dealt'+'.rand'])){MembersArray[index]['damage_dealt'+'.rand'] = 0;}
					if(isNaN(MembersArray[index]['shots'+'.rand'])){MembersArray[index]['shots'+'.rand'] = 0;}
					if(isNaN(MembersArray[index]['xp'+'.rand'])){MembersArray[index]['xp'+'.rand'] = 0;}
					if(isNaN(MembersArray[index]['frags'+'.rand'])){MembersArray[index]['frags'+'.rand'] = 0;}
					if(isNaN(MembersArray[index]['survived_battles'+'.rand'])){MembersArray[index]['survived_battles'+'.rand'] = 0;}
					if(isNaN(MembersArray[index]['dropped_capture_points'+'.rand'])){MembersArray[index]['dropped_capture_points'+'.rand'] = 0;}

					MembersArray[index]['battle_avg_xp'+'.rand'] = Number(MembersArray[index]['xp'+'.rand']/MembersArray[index]['battles'+'.rand']).toFixed(0);
					MembersArray[index]['hits_percents'+'.rand'] = Number(MembersArray[index]['hits'+'.rand']/(MembersArray[index]['shots'+'.rand']/100)).toFixed(0);
					if(isNaN(MembersArray[index]['battle_avg_xp'+'.rand'])){MembersArray[index]['battle_avg_xp'+'.rand'] = 0;}
					if(isNaN(MembersArray[index]['hits_percents'+'.rand'])){MembersArray[index]['hits_percents'+'.rand'] = 0;}					
					
					var allStat = null;
					var randStat = null;
					var companyStat = null;
					var clanStat = null;	
					var typeStat = [".all", ".rand", ".company", ".clan"];
					
					for(var m = 0; m < MembersStatistics.length; m++){
						var MemberStatistics = MembersStatistics[m].split('<@>');
						var idStat = MemberStatistics[0];
						
						if(MembersArray[index]['id'] == idStat){
							allStat = MemberStatistics[1];
							randStat = MemberStatistics[2];
							companyStat = MemberStatistics[3];
							clanStat = MemberStatistics[4];	
							
							MembersStatistics.splice(m, 1);
							break;
						}
					}
					
					for(var t = 0; t < typeStat.length; t++){					
						MembersArray[index]['PROC_wins'+typeStat[t]] = Number(MembersArray[index]['wins'+typeStat[t]] * 100 / MembersArray[index]['battles'+typeStat[t]]).toFixed(2);
						MembersArray[index]['PROC_losses'+typeStat[t]] = Number(MembersArray[index]['losses'+typeStat[t]] * 100 / MembersArray[index]['battles'+typeStat[t]]).toFixed(2);
						MembersArray[index]['PROC_draws'+typeStat[t]] = Number(MembersArray[index]['draws'+typeStat[t]] * 100 / MembersArray[index]['battles'+typeStat[t]]).toFixed(2);
						MembersArray[index]['PROC_survived_battles'+typeStat[t]] = Number(MembersArray[index]['survived_battles'+typeStat[t]] * 100 / MembersArray[index]['battles'+typeStat[t]]).toFixed(2);
						MembersArray[index]['PROC_hits'+typeStat[t]] = MembersArray[index]['hits_percents'+typeStat[t]];
						MembersArray[index]['CF_xp'+typeStat[t]] = MembersArray[index]['battle_avg_xp'+typeStat[t]];
						MembersArray[index]['CF_frags'+typeStat[t]] = Number(MembersArray[index]['frags'+typeStat[t]] / MembersArray[index]['battles'+typeStat[t]]).toFixed(2);
						MembersArray[index]['CF_spotted'+typeStat[t]] = Number(MembersArray[index]['spotted'+typeStat[t]] / MembersArray[index]['battles'+typeStat[t]]).toFixed(2);
						MembersArray[index]['CF_shots'+typeStat[t]] = Number(MembersArray[index]['shots'+typeStat[t]] / MembersArray[index]['battles'+typeStat[t]]).toFixed(2);
						MembersArray[index]['CF_damage_dealt'+typeStat[t]] = Number(MembersArray[index]['damage_dealt'+typeStat[t]]/MembersArray[index]['battles'+typeStat[t]]).toFixed(0);
						MembersArray[index]['CF_damage_received'+typeStat[t]] = Number(MembersArray[index]['damage_received'+typeStat[t]]/MembersArray[index]['battles'+typeStat[t]]).toFixed(0);
						MembersArray[index]['CF_capture_points'+typeStat[t]] = Number(MembersArray[index]['capture_points'+typeStat[t]]/MembersArray[index]['battles'+typeStat[t]]).toFixed(2);
						MembersArray[index]['CF_dropped_capture_points'+typeStat[t]] = Number(MembersArray[index]['dropped_capture_points'+typeStat[t]]/MembersArray[index]['battles'+typeStat[t]]).toFixed(2);					
						
						if(isNaN(MembersArray[index]['PROC_wins'+typeStat[t]])){MembersArray[index]['PROC_wins'+typeStat[t]] = 0;}
						if(isNaN(MembersArray[index]['PROC_losses'+typeStat[t]])){MembersArray[index]['PROC_losses'+typeStat[t]] = 0;}
						if(isNaN(MembersArray[index]['PROC_draws'+typeStat[t]])){MembersArray[index]['PROC_draws'+typeStat[t]] = 0;}
						if(isNaN(MembersArray[index]['PROC_survived_battles'+typeStat[t]])){MembersArray[index]['PROC_survived_battles'+typeStat[t]] = 0;}
						if(isNaN(MembersArray[index]['PROC_hits'+typeStat[t]])){MembersArray[index]['PROC_hits'+typeStat[t]] = 0;}
						if(isNaN(MembersArray[index]['CF_xp'+typeStat[t]])){MembersArray[index]['CF_xp'+typeStat[t]] = 0;}
						if(isNaN(MembersArray[index]['CF_frags'+typeStat[t]])){MembersArray[index]['CF_frags'+typeStat[t]] = 0;}
						if(isNaN(MembersArray[index]['CF_spotted'+typeStat[t]])){MembersArray[index]['CF_spotted'+typeStat[t]] = 0;}
						if(isNaN(MembersArray[index]['CF_shots'+typeStat[t]])){MembersArray[index]['CF_shots'+typeStat[t]] = 0;}
						if(isNaN(MembersArray[index]['CF_damage_dealt'+typeStat[t]])){MembersArray[index]['CF_damage_dealt'+typeStat[t]] = 0;}
						if(isNaN(MembersArray[index]['CF_damage_received'+typeStat[t]])){MembersArray[index]['CF_damage_received'+typeStat[t]] = 0;}
						if(isNaN(MembersArray[index]['CF_capture_points'+typeStat[t]])){MembersArray[index]['CF_capture_points'+typeStat[t]] = 0;}
						if(isNaN(MembersArray[index]['CF_dropped_capture_points'+typeStat[t]])){MembersArray[index]['CF_dropped_capture_points'+typeStat[t]] = 0;}
						
						var btl = MembersArray[index]['battles'+typeStat[t]];
						var dmg = MembersArray[index]['damage_dealt'+typeStat[t]]/btl;
						var winrate = 100/(btl/MembersArray[index]['wins'+typeStat[t]]);
						var des = MembersArray[index]['frags'+typeStat[t]]/btl;
						var det = MembersArray[index]['spotted'+typeStat[t]]/btl;
						var cap = MembersArray[index]['capture_points'+typeStat[t]]/btl;
						var def = MembersArray[index]['dropped_capture_points'+typeStat[t]]/btl;
						var cf_xp = MembersArray[index]['xp'+typeStat[t]]/btl;
						var wins = MembersArray[index]['wins'+typeStat[t]]/btl;
						
						if(ScriptSetting['get_vehicles'] === "true"){
							var mid = MembersArray[index]['average_tank'];
							
							if(!error_encyclopedia){
								var kpd = (dmg*(10/(mid+2))*(0.23 + 2*mid/100))+(des*250)+(det*150)+(Math.logb(cap+1,1.732)*150)+(def*150);
								var txtKpd = kpd; if(isNaN(Number(kpd).toFixed(0))){txtKpd = 0;}
								MembersArray[index]['kpd'+typeStat[t]] = txtKpd;
								
								var xeff = 0;
								if(txtKpd < 420){
									xeff = 0;
								}else{
									xeff = Math.max(Math.min(txtKpd*(txtKpd*(txtKpd*(txtKpd*(txtKpd*(0.000000000000000045254*txtKpd - 0.00000000000033131) + 0.00000000094164) - 0.0000013227) + 0.00095664) - 0.2598) + 13.23, 100), 0);
								}
								var txtXeff = xeff; if(isNaN(Number(xeff).toFixed(0))){txtXeff = 0;}
								MembersArray[index]['xeff'+typeStat[t]] = txtXeff;
							
								var wn6 = (1240-1040/Math.pow(Math.min(mid, 6),0.164))*des+dmg*530/(184*Math.exp(0.24*mid)+130)+det*125+Math.min(def,2.2)*100+((185/(0.17+Math.exp((winrate-35)*-0.134)))-500)*0.45+(6-Math.min(mid,6))*-60;
								var txtWn6 = wn6; if(isNaN(Number(wn6).toFixed(0))){txtWn6 = 0;}
								MembersArray[index]['wn6'+typeStat[t]] = txtWn6;	

								var xwn6 = 0;
								if(wn6 > 2160){
									xwn6 = 100;
								}else{
									xwn6 = Math.max(Math.min(txtWn6*(txtWn6*(txtWn6*(-0.00000000001268*txtWn6 + 0.00000005147) - 0.00006418) + 0.07576) - 7.25, 100), 0);
								}
								var txtXwn6 = xwn6; if(isNaN(Number(xwn6).toFixed(0))){txtXwn6 = 0;}					
								MembersArray[index]['xwn6'+typeStat[t]] = txtXwn6;

								var wn7 = (1240-1040/Math.pow(Math.min(mid, 6),0.164))*des+dmg*530/(184*Math.exp(0.24*mid)+130)+det*125*Math.min(mid, 3)/3+Math.min(def,2.2)*100+((185/(0.17+Math.exp((winrate-35)*-0.134)))-500)*0.45-((5-Math.min(mid,6))*125)/(1+Math.exp((mid-Math.pow(btl/220, 3/mid))*1.5));
								var txtWn7 = wn7; if(isNaN(Number(wn7).toFixed(0))){txtWn7 = 0;}	
								MembersArray[index]['wn7'+typeStat[t]] = txtWn7;
								
								if(typeStat[t] == '.all'){
									var rDAMAGE = MembersArray[index]['damage_dealt'+'.all'] / MembersArray[index]['expDamage'+'.all'];
									var rSPOT = MembersArray[index]['spotted'+'.all'] / MembersArray[index]['expSpot'+'.all'];
									var rFRAG = MembersArray[index]['frags'+'.all'] / MembersArray[index]['expFrag'+'.all'];
									var rDEF = MembersArray[index]['dropped_capture_points'+typeStat[t]] / MembersArray[index]['expDef'+'.all'];
									var rWIN = MembersArray[index]['wins'+'.all'] / MembersArray[index]['expWinRate'+'.all'];
									var rWINc = Math.max(0, (rWIN - 0.71) / (1 - 0.71));
									var rDAMAGEc = Math.max(0, (rDAMAGE - 0.22) / (1 - 0.22));
									var rFRAGc = Math.max(0, Math.min(rDAMAGEc + 0.2, (rFRAG - 0.12) / (1 - 0.12)));
									var rSPOTc = Math.max(0, Math.min(rDAMAGEc + 0.1, (rSPOT - 0.38) / (1 - 0.38)));
									var rDEFc = Math.max(0, Math.min(rDAMAGEc + 0.1, (rDEF  - 0.10) / (1 - 0.10)));
									
									var wn8 = 980*rDAMAGEc + 210*rDAMAGEc*rFRAGc + 155*rFRAGc*rSPOTc + 75*rDEFc*rFRAGc + 145*Math.min(1.8,rWINc);
									var txtWn8 = wn8; if(isNaN(Number(wn8).toFixed(0))){txtWn8 = 0;}
									MembersArray[index]['wn8'+'.all'] = txtWn8;	
									
									var xwn8 = 0;
									if(wn8 > 3250){
										xwn8 = 100;
									}else{
										xwn8 = Math.round(Math.max(0, Math.min(100, txtWn8*(txtWn8*(txtWn8*(txtWn8*(txtWn8*(txtWn8*0.00000000000000000007119 + 0.0000000000000002334) - 0.000000000006963) + 0.00000002845) - 0.00004558) + 0.06565) - 0.18)));
									}
									var txtXwn8 = xwn8; if(isNaN(Number(xwn8).toFixed(0))){txtXwn8 = 0;}
									MembersArray[index]['xwn8'+'.all'] = txtXwn8;
								}else{
									MembersArray[index]['wn8'+typeStat[t]] = 0;	
									MembersArray[index]['xwn8'+typeStat[t]] = 0;
								}
							}else{
								MembersArray[index]['kpd'+typeStat[t]] = 0;
								MembersArray[index]['xeff'+typeStat[t]] = 0;
								MembersArray[index]['wn6'+typeStat[t]] = 0;
								MembersArray[index]['xwn6'+typeStat[t]] = 0;
								MembersArray[index]['wn7'+typeStat[t]] = 0;
								MembersArray[index]['wn8'+typeStat[t]] = 0;
								MembersArray[index]['xwn8'+typeStat[t]] = 0;							
							}
						}
						var bs = Math.log(btl)/10*(cf_xp*1+dmg*(wins*2.0+des*0.9+det*0.5+cap*0.5+def* 0.5));
						var txtBs = bs; if(isNaN(Number(bs).toFixed(0))){txtBs = 0;}
						MembersArray[index]['bs'+typeStat[t]] = txtBs;
						
						MembersArray[index]['max_xp'+typeStat[t]] = MembersArray[index]['max_xp'];			
						MembersArray[index]['global_rating'+typeStat[t]] = MembersArray[index]['global_rating'];			
						MembersArray[index]['glory_points'+typeStat[t]] = MembersArray[index]['glory_points'];			
						MembersArray[index]['glory_position'+typeStat[t]] = MembersArray[index]['glory_position'];
						
						var Stat = null;
						if(typeStat[t] == '.all'){
							Stat = allStat;
						}else if(typeStat[t] == '.rand'){
							Stat = randStat;
						}else if(typeStat[t] == '.company'){
							Stat = companyStat;
						}else if(typeStat[t] == '.clan'){
							Stat = clanStat;
						}
						
						if(Stat != null){
							var Statistics = Stat.split(':');
							
							MembersArray[index]['spotted'+typeStat[t]+'.old'] = MembersArray[index]['spotted'+typeStat[t]] - Statistics[0];
							MembersArray[index]['hits'+typeStat[t]+'.old'] = MembersArray[index]['hits'+typeStat[t]] - Statistics[1];
							MembersArray[index]['battle_avg_xp'+typeStat[t]+'.old'] = MembersArray[index]['battle_avg_xp'+typeStat[t]] - Statistics[2];
							MembersArray[index]['draws'+typeStat[t]+'.old'] = MembersArray[index]['draws'+typeStat[t]] - Statistics[3];
							MembersArray[index]['wins'+typeStat[t]+'.old'] = MembersArray[index]['wins'+typeStat[t]] - Statistics[4];
							MembersArray[index]['losses'+typeStat[t]+'.old'] = MembersArray[index]['losses'+typeStat[t]] - Statistics[5];
							MembersArray[index]['capture_points'+typeStat[t]+'.old'] = MembersArray[index]['capture_points'+typeStat[t]] - Statistics[6];
							MembersArray[index]['battles'+typeStat[t]+'.old'] = MembersArray[index]['battles'+typeStat[t]] - Statistics[7];
							MembersArray[index]['damage_dealt'+typeStat[t]+'.old'] = MembersArray[index]['damage_dealt'+typeStat[t]] - Statistics[8];
							MembersArray[index]['hits_percents'+typeStat[t]+'.old'] = MembersArray[index]['hits_percents'+typeStat[t]] - Statistics[9];
							MembersArray[index]['damage_received'+typeStat[t]+'.old'] = MembersArray[index]['damage_received'+typeStat[t]] - Statistics[10];
							MembersArray[index]['shots'+typeStat[t]+'.old'] = MembersArray[index]['shots'+typeStat[t]] - Statistics[11];
							MembersArray[index]['xp'+typeStat[t]+'.old'] = MembersArray[index]['xp'+typeStat[t]] - Statistics[12];
							MembersArray[index]['frags'+typeStat[t]+'.old'] = MembersArray[index]['frags'+typeStat[t]] - Statistics[13];
							MembersArray[index]['survived_battles'+typeStat[t]+'.old'] = MembersArray[index]['survived_battles'+typeStat[t]] - Statistics[14];
							MembersArray[index]['dropped_capture_points'+typeStat[t]+'.old'] = MembersArray[index]['dropped_capture_points'+typeStat[t]] - Statistics[15];
							MembersArray[index]['PROC_wins'+typeStat[t]+'.old'] = MembersArray[index]['PROC_wins'+typeStat[t]] - Statistics[16];
							MembersArray[index]['PROC_losses'+typeStat[t]+'.old'] = MembersArray[index]['PROC_losses'+typeStat[t]] - Statistics[17];
							MembersArray[index]['PROC_draws'+typeStat[t]+'.old'] = MembersArray[index]['PROC_draws'+typeStat[t]] - Statistics[18];
							MembersArray[index]['PROC_survived_battles'+typeStat[t]+'.old'] = MembersArray[index]['PROC_survived_battles'+typeStat[t]] - Statistics[19];
							MembersArray[index]['PROC_hits'+typeStat[t]+'.old'] = MembersArray[index]['PROC_hits'+typeStat[t]] - Statistics[20];
							MembersArray[index]['CF_xp'+typeStat[t]+'.old'] = MembersArray[index]['CF_xp'+typeStat[t]] - Statistics[21];
							MembersArray[index]['CF_frags'+typeStat[t]+'.old'] = MembersArray[index]['CF_frags'+typeStat[t]] - Statistics[22];
							MembersArray[index]['CF_spotted'+typeStat[t]+'.old'] = MembersArray[index]['CF_spotted'+typeStat[t]] - Statistics[23];
							MembersArray[index]['CF_shots'+typeStat[t]+'.old'] = MembersArray[index]['CF_shots'+typeStat[t]] - Statistics[24];
							MembersArray[index]['CF_damage_dealt'+typeStat[t]+'.old'] = MembersArray[index]['CF_damage_dealt'+typeStat[t]] - Statistics[25];
							MembersArray[index]['CF_damage_received'+typeStat[t]+'.old'] = MembersArray[index]['CF_damage_received'+typeStat[t]] - Statistics[26];
							MembersArray[index]['CF_capture_points'+typeStat[t]+'.old'] = MembersArray[index]['CF_capture_points'+typeStat[t]] - Statistics[27];
							MembersArray[index]['CF_dropped_capture_points'+typeStat[t]+'.old'] = MembersArray[index]['CF_dropped_capture_points'+typeStat[t]] - Statistics[28];
							MembersArray[index]['kpd'+typeStat[t]+'.old'] = MembersArray[index]['kpd'+typeStat[t]] - Statistics[29];
							MembersArray[index]['xeff'+typeStat[t]+'.old'] = MembersArray[index]['xeff'+typeStat[t]] - Statistics[30];
							MembersArray[index]['wn6'+typeStat[t]+'.old'] = MembersArray[index]['wn6'+typeStat[t]] - Statistics[31];
							MembersArray[index]['xwn6'+typeStat[t]+'.old'] = MembersArray[index]['xwn6'+typeStat[t]] - Statistics[32];
							MembersArray[index]['wn7'+typeStat[t]+'.old'] = MembersArray[index]['wn7'+typeStat[t]] - Statistics[33];
							MembersArray[index]['wn8'+typeStat[t]+'.old'] = MembersArray[index]['wn8'+typeStat[t]] - Statistics[34];
							MembersArray[index]['xwn8'+typeStat[t]+'.old'] = MembersArray[index]['xwn8'+typeStat[t]] - Statistics[35];
							MembersArray[index]['bs'+typeStat[t]+'.old'] = MembersArray[index]['bs'+typeStat[t]] - Statistics[36];
							MembersArray[index]['glory_points'+typeStat[t]+'.old'] = MembersArray[index]['glory_points'+typeStat[t]] - Statistics[37];
							MembersArray[index]['glory_position'+typeStat[t]+'.old'] = MembersArray[index]['glory_position'+typeStat[t]] - Statistics[38];
							MembersArray[index]['max_xp'+typeStat[t]+'.old'] = MembersArray[index]['max_xp'+typeStat[t]] - Statistics[39];							
							MembersArray[index]['global_rating'+typeStat[t]+'.old'] = MembersArray[index]['global_rating'+typeStat[t]] - Statistics[40];
						}else{
							MembersArray[index]['spotted'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['hits'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['battle_avg_xp'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['draws'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['wins'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['losses'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['capture_points'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['battles'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['damage_dealt'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['hits_percents'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['damage_received'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['shots'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['xp'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['frags'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['survived_battles'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['dropped_capture_points'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['PROC_wins'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['PROC_losses'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['PROC_draws'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['PROC_survived_battles'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['PROC_hits'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['CF_xp'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['CF_frags'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['CF_spotted'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['CF_shots'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['CF_damage_dealt'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['CF_damage_received'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['CF_capture_points'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['CF_dropped_capture_points'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['kpd'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['xeff'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['wn6'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['xwn6'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['wn7'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['wn8'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['xwn8'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['bs'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['glory_points'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['glory_position'+typeStat[t]+'.old'] = 0;
							MembersArray[index]['max_xp'+typeStat[t]+'.old'] = 0;								
							MembersArray[index]['global_rating'+typeStat[t]+'.old'] = 0;													
						}
					}
				}
			}			
			var progress = 0;
			function doneGlory(url, response){
				if(response.status && response.status == "error"){
					errorRating(url);
					return;
				}		
				Process--;		
				
				progress++;
				var loading_waiting_percents = document.getElementsByClassName("loading_waiting_percents")[0];
				loading_waiting_percents.innerHTML = localization['GettingGlory']+' ' + Number(one_percent * progress).toFixed(0) + '%';
				
				var vars = getUrlVars(url);
				var index = vars['index'];
				
				var glory = eval('('+JSON.stringify(response)+')');		
				
				var position = jQ(response.data.glory_points_block).find("#js-glory-points").text();
				var points = jQ(response.data.glory_points_block).find("#js-glory-points_tooltip p").text().replace(/\s/g, "").split(":")[1];
				var glory_points = /\d+/.test(points) ? points : "0";
				var glory_position = position != "" ? position.replace(/\s/g, "") : "0";
				
				MembersArray[index]['glory_points'] = parseInt(glory_points);
				MembersArray[index]['glory_position'] = parseInt(glory_position);
				
				if(countMembers == progress){
					progress = 0;
					UpdatePage();
				}			
			}		
			var error_glory = '';
			function errorGlory(url){
				Process--;
				
				progress++;
				var loading_waiting_percents = document.getElementsByClassName("loading_waiting_percents")[0];
				loading_waiting_percents.innerHTML = localization['GettingGlory']+' ' + Number(one_percent * progress).toFixed(0) + '%';
				
				var vars = getUrlVars(url);
				var index = vars['index'];
				
				if(error_glory != ''){error_glory += ', ';}
				error_glory += MembersArray[index]['name'];	
				
				MembersArray[index]['glory_points'] = 0;
				MembersArray[index]['glory_position'] = 0;			

				if(countMembers == progress){
					progress = 0;
					UpdatePage();
				}			
			}			
			function doneRating(url, response){
				if(response.status && response.status == "error"){
					errorRating(url);
					return;
				}		
				Process--;
				
				progress++;
				var loading_waiting_percents = document.getElementsByClassName("loading_waiting_percents")[0];
				loading_waiting_percents.innerHTML = localization['GettingRating']+' ' + Number(one_percent * progress).toFixed(0) + '%';
				
				var vars = getUrlVars(url);
				var index = vars['index'];
				
				var rating = eval('('+JSON.stringify(response)+')');

				for(memberId in rating['data']){
					var ratings = rating['data'][memberId];
					if(ratings == null){progress--; errorRating(url); return;}

					if(ratings['global_rating']['rank'] != null && (RatingsArray['global_rating']['rank'] === undefined || RatingsArray['global_rating']['rank'] > ratings['global_rating']['rank'])){
						RatingsArray['global_rating']['name'] = MembersArray[index]['name'];
						RatingsArray['global_rating']['rank'] = ratings['global_rating']['rank'];
						RatingsArray['global_rating']['value'] = ratings['global_rating']['value'];						
					}					
					if(ratings['battles_count']['rank'] != null && (RatingsArray['battles_count']['rank'] === undefined || RatingsArray['battles_count']['rank'] > ratings['battles_count']['rank'])){
						RatingsArray['battles_count']['name'] = MembersArray[index]['name'];
						RatingsArray['battles_count']['rank'] = ratings['battles_count']['rank'];
						RatingsArray['battles_count']['value'] = ratings['battles_count']['value'];						
					}
					if(ratings['damage_avg']['rank'] != null && (RatingsArray['damage_avg']['rank'] === undefined || RatingsArray['damage_avg']['rank'] > ratings['damage_avg']['rank'])){
						RatingsArray['damage_avg']['name'] = MembersArray[index]['name'];
						RatingsArray['damage_avg']['rank'] = ratings['damage_avg']['rank'];
						RatingsArray['damage_avg']['value'] = ratings['damage_avg']['value'];						
					}
					if(ratings['damage_dealt']['rank'] != null && (RatingsArray['damage_dealt']['rank'] === undefined || RatingsArray['damage_dealt']['rank'] > ratings['damage_dealt']['rank'])){
						RatingsArray['damage_dealt']['name'] = MembersArray[index]['name'];
						RatingsArray['damage_dealt']['rank'] = ratings['damage_dealt']['rank'];
						RatingsArray['damage_dealt']['value'] = ratings['damage_dealt']['value'];						
					}
					if(ratings['frags_avg']['rank'] != null && (RatingsArray['frags_avg']['rank'] === undefined || RatingsArray['frags_avg']['rank'] > ratings['frags_avg']['rank'])){
						RatingsArray['frags_avg']['name'] = MembersArray[index]['name'];
						RatingsArray['frags_avg']['rank'] = ratings['frags_avg']['rank'];
						RatingsArray['frags_avg']['value'] = ratings['frags_avg']['value'];						
					}
					if(ratings['frags_count']['rank'] != null && (RatingsArray['frags_count']['rank'] === undefined || RatingsArray['frags_count']['rank'] > ratings['frags_count']['rank'])){
						RatingsArray['frags_count']['name'] = MembersArray[index]['name'];
						RatingsArray['frags_count']['rank'] = ratings['frags_count']['rank'];
						RatingsArray['frags_count']['value'] = ratings['frags_count']['value'];						
					}
					if(ratings['hits_ratio']['rank'] != null && (RatingsArray['hits_ratio']['rank'] === undefined || RatingsArray['hits_ratio']['rank'] > ratings['hits_ratio']['rank'])){
						RatingsArray['hits_ratio']['name'] = MembersArray[index]['name'];
						RatingsArray['hits_ratio']['rank'] = ratings['hits_ratio']['rank'];
						RatingsArray['hits_ratio']['value'] = ratings['hits_ratio']['value'];						
					}
					if(ratings['spotted_avg']['rank'] != null && (RatingsArray['spotted_avg']['rank'] === undefined || RatingsArray['spotted_avg']['rank'] > ratings['spotted_avg']['rank'])){
						RatingsArray['spotted_avg']['name'] = MembersArray[index]['name'];
						RatingsArray['spotted_avg']['rank'] = ratings['spotted_avg']['rank'];
						RatingsArray['spotted_avg']['value'] = ratings['spotted_avg']['value'];						
					}
					if(ratings['spotted_count']['rank'] != null && (RatingsArray['spotted_count']['rank'] === undefined || RatingsArray['spotted_count']['rank'] > ratings['spotted_count']['rank'])){
						RatingsArray['spotted_count']['name'] = MembersArray[index]['name'];
						RatingsArray['spotted_count']['rank'] = ratings['spotted_count']['rank'];
						RatingsArray['spotted_count']['value'] = ratings['spotted_count']['value'];						
					}
					if(ratings['survived_ratio']['rank'] != null && (RatingsArray['survived_ratio']['rank'] === undefined || RatingsArray['survived_ratio']['rank'] > ratings['survived_ratio']['rank'])){
						RatingsArray['survived_ratio']['name'] = MembersArray[index]['name'];
						RatingsArray['survived_ratio']['rank'] = ratings['survived_ratio']['rank'];
						RatingsArray['survived_ratio']['value'] = ratings['survived_ratio']['value'];						
					}
					if(ratings['wins_ratio']['rank'] != null && (RatingsArray['wins_ratio']['rank'] === undefined || RatingsArray['wins_ratio']['rank'] > ratings['wins_ratio']['rank'])){
						RatingsArray['wins_ratio']['name'] = MembersArray[index]['name'];
						RatingsArray['wins_ratio']['rank'] = ratings['wins_ratio']['rank'];
						RatingsArray['wins_ratio']['value'] = ratings['wins_ratio']['value'];						
					}
					if(ratings['xp_amount']['rank'] != null && (RatingsArray['xp_amount']['rank'] === undefined || RatingsArray['xp_amount']['rank'] > ratings['xp_amount']['rank'])){
						RatingsArray['xp_amount']['name'] = MembersArray[index]['name'];
						RatingsArray['xp_amount']['rank'] = ratings['xp_amount']['rank'];
						RatingsArray['xp_amount']['value'] = ratings['xp_amount']['value'];						
					}
					if(ratings['xp_avg']['rank'] != null && (RatingsArray['xp_avg']['rank'] === undefined || RatingsArray['xp_avg']['rank'] > ratings['xp_avg']['rank'])){
						RatingsArray['xp_avg']['name'] = MembersArray[index]['name'];
						RatingsArray['xp_avg']['rank'] = ratings['xp_avg']['rank'];
						RatingsArray['xp_avg']['value'] = ratings['xp_avg']['value'];						
					}
					if(ratings['xp_max']['rank'] != null && (RatingsArray['xp_max']['rank'] === undefined || RatingsArray['xp_max']['rank'] > ratings['xp_max']['rank'])){
						RatingsArray['xp_max']['name'] = MembersArray[index]['name'];
						RatingsArray['xp_max']['rank'] = ratings['xp_max']['rank'];
						RatingsArray['xp_max']['value'] = ratings['xp_max']['value'];						
					}
					if(ratings['capture_points']['rank'] != null && (RatingsArray['capture_points']['rank'] === undefined || RatingsArray['capture_points']['rank'] > ratings['capture_points']['rank'])){
						RatingsArray['capture_points']['name'] = MembersArray[index]['name'];
						RatingsArray['capture_points']['rank'] = ratings['capture_points']['rank'];
						RatingsArray['capture_points']['value'] = ratings['capture_points']['value'];						
					}						
				}

				if(countMembers == progress){
					progress = 0;
					if(ScriptSetting['get_glory'] === "true"){
						for(index in MembersArray){
							var id = MembersArray[index]['id'];
							getJson('/community/clans/show_clan_block/?spa_id='+id+'&index='+index, doneGlory, errorGlory);
						}
					}else{
						UpdatePage();
					}
				}			
			}		
			var error_rating = '';
			function errorRating(url){
				Process--;
				
				progress++;
				var loading_waiting_percents = document.getElementsByClassName("loading_waiting_percents")[0];
				loading_waiting_percents.innerHTML = localization['GettingRating']+' ' + Number(one_percent * progress).toFixed(0) + '%';
				
				var vars = getUrlVars(url);
				var index = vars['index'];
				
				if(error_rating != ''){error_rating += ', ';}
				error_rating += MembersArray[index]['name'];			

				if(countMembers == progress){
					progress = 0;
					if(ScriptSetting['get_glory'] === "true"){
						for(index in MembersArray){
							var id = MembersArray[index]['id'];
							getJson('/community/clans/show_clan_block/?spa_id='+id+'&index='+index, doneGlory, errorGlory);
						}
					}else{
						UpdatePage();
					}
				}			
			}			
			function doneTanks(url, response){
				if(response.status && response.status == "error"){
					errorTanks(url);
					return;
				}		
				Process--;
				
				progress++;
				var loading_waiting_percents = document.getElementsByClassName("loading_waiting_percents")[0];
				loading_waiting_percents.innerHTML = localization['GettingTechnology']+' ' + Number(one_percent * progress).toFixed(0) + '%';
				
				var vars = getUrlVars(url);
				var index = vars['index'];
				
				MembersArray[index]['tanks'] = [];
				MembersArray[index]['tanks']['lightTank'] = [];
				MembersArray[index]['tanks']['mediumTank'] = []; 
				MembersArray[index]['tanks']['heavyTank'] = []; 
				MembersArray[index]['tanks']['AT-SPG'] = []; 
				MembersArray[index]['tanks']['SPG'] = [];	
				
				MembersArray[index]['expFrag'+'.all'] = 0;
				MembersArray[index]['expDamage'+'.all'] = 0;
				MembersArray[index]['expSpot'+'.all'] = 0;
				MembersArray[index]['expDef'+'.all'] = 0;
				MembersArray[index]['expWinRate'+'.all'] = 0;					
				
				MembersArray[index]['average_tank'] = 0;

				var tanks = eval('('+JSON.stringify(response)+')');				
				
				if(Encyclopedia != null){
					for(memberId in tanks['data']){
						var BattleLevelArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
						if(tanks['data'][memberId] == null){continue;}
						
						for(var i = 0; i < tanks['data'][memberId].length; i++){
							var tankStat = tanks['data'][memberId][i];
							var tank = Encyclopedia['data'][tankStat['tank_id']];
							
							if(typeof tank == 'undefined'){continue;}
							
							var tankAllBattles = tankStat['all']['battles'];
							var tankAllWins = tankStat['all']['wins'];

							if(ExpTanks[tankStat['tank_id']] != undefined){							
								MembersArray[index]['expFrag'+'.all'] += tankAllBattles * ExpTanks[tankStat['tank_id']]['expFrag'];
								MembersArray[index]['expDamage'+'.all'] += tankAllBattles * ExpTanks[tankStat['tank_id']]['expDamage'];
								MembersArray[index]['expSpot'+'.all'] += tankAllBattles * ExpTanks[tankStat['tank_id']]['expSpot'];
								MembersArray[index]['expDef'+'.all'] += tankAllBattles * ExpTanks[tankStat['tank_id']]['expDef'];
								MembersArray[index]['expWinRate'+'.all'] += tankAllBattles * (ExpTanks[tankStat['tank_id']]['expWinRate']/100);
							}
							
							BattleLevelArray[tank['level']] += parseInt(tankAllBattles);
							
							if(tankStat['in_garage'] == 1){
								if(tank['type'] == 'lightTank'){
									MembersArray[index]['tanks']['lightTank'][MembersArray[index]['tanks']['lightTank'].length] = tankStat['tank_id']+'<@>'+tankAllBattles+'<@>'+tankAllWins;
									if(undefined == TankArray['lightTank'][tank['level']][tankStat['tank_id']]){
										TankArray['lightTank'][tank['level']][tankStat['tank_id']] = [];
										TankArray['lightTank'][tank['level']][tankStat['tank_id']]['count'] = 1;
										TankArray['lightTank'][tank['level']][tankStat['tank_id']]['members'] = MembersArray[index]['name'];
									}else{
										TankArray['lightTank'][tank['level']][tankStat['tank_id']]['count']++;
										TankArray['lightTank'][tank['level']][tankStat['tank_id']]['members'] += ', ' + MembersArray[index]['name'];
									}							
								}
								if(tank['type'] == 'mediumTank'){
									MembersArray[index]['tanks']['mediumTank'][MembersArray[index]['tanks']['mediumTank'].length] = tankStat['tank_id']+'<@>'+tankAllBattles+'<@>'+tankAllWins;
									if(undefined == TankArray['mediumTank'][tank['level']][tankStat['tank_id']]){
										TankArray['mediumTank'][tank['level']][tankStat['tank_id']] = [];
										TankArray['mediumTank'][tank['level']][tankStat['tank_id']]['count'] = 1;
										TankArray['mediumTank'][tank['level']][tankStat['tank_id']]['members'] = MembersArray[index]['name'];
									}else{
										TankArray['mediumTank'][tank['level']][tankStat['tank_id']]['count']++;
										TankArray['mediumTank'][tank['level']][tankStat['tank_id']]['members'] += ', ' + MembersArray[index]['name'];
									}							
								}
								if(tank['type'] == 'heavyTank'){
									MembersArray[index]['tanks']['heavyTank'][MembersArray[index]['tanks']['heavyTank'].length] = tankStat['tank_id']+'<@>'+tankAllBattles+'<@>'+tankAllWins;
									if(undefined == TankArray['heavyTank'][tank['level']][tankStat['tank_id']]){
										TankArray['heavyTank'][tank['level']][tankStat['tank_id']] = [];
										TankArray['heavyTank'][tank['level']][tankStat['tank_id']]['count'] = 1;
										TankArray['heavyTank'][tank['level']][tankStat['tank_id']]['members'] = MembersArray[index]['name'];
									}else{
										TankArray['heavyTank'][tank['level']][tankStat['tank_id']]['count']++;
										TankArray['heavyTank'][tank['level']][tankStat['tank_id']]['members'] += ', ' + MembersArray[index]['name'];
									}							
								}
								if(tank['type'] == 'AT-SPG'){
									MembersArray[index]['tanks']['AT-SPG'][MembersArray[index]['tanks']['AT-SPG'].length] = tankStat['tank_id']+'<@>'+tankAllBattles+'<@>'+tankAllWins;
									if(undefined == TankArray['AT-SPG'][tank['level']][tankStat['tank_id']]){
										TankArray['AT-SPG'][tank['level']][tankStat['tank_id']] = [];
										TankArray['AT-SPG'][tank['level']][tankStat['tank_id']]['count'] = 1;
										TankArray['AT-SPG'][tank['level']][tankStat['tank_id']]['members'] = MembersArray[index]['name'];
									}else{
										TankArray['AT-SPG'][tank['level']][tankStat['tank_id']]['count']++;
										TankArray['AT-SPG'][tank['level']][tankStat['tank_id']]['members'] += ', ' + MembersArray[index]['name'];
									}							
								}
								if(tank['type'] == 'SPG'){
									MembersArray[index]['tanks']['SPG'][MembersArray[index]['tanks']['SPG'].length] = tankStat['tank_id']+'<@>'+tankAllBattles+'<@>'+tankAllWins;
									if(undefined == TankArray['SPG'][tank['level']][tankStat['tank_id']]){
										TankArray['SPG'][tank['level']][tankStat['tank_id']] = [];
										TankArray['SPG'][tank['level']][tankStat['tank_id']]['count'] = 1;
										TankArray['SPG'][tank['level']][tankStat['tank_id']]['members'] = MembersArray[index]['name'];
									}else{
										TankArray['SPG'][tank['level']][tankStat['tank_id']]['count']++;
										TankArray['SPG'][tank['level']][tankStat['tank_id']]['members'] += ', ' + MembersArray[index]['name'];
									}							
								}
							}
						}
						var battles = MembersArray[index]['battles'+'.all'];
						MembersArray[index]['average_tank'] = (1*BattleLevelArray[1]/battles)+(2*BattleLevelArray[2]/battles)+(3*BattleLevelArray[3]/battles)
						+(4*BattleLevelArray[4]/battles)+(5*BattleLevelArray[5]/battles)+(6*BattleLevelArray[6]/battles)+(7*BattleLevelArray[7]/battles)
						+(8*BattleLevelArray[8]/battles)+(9*BattleLevelArray[9]/battles)+(10*BattleLevelArray[10]/battles);	
					}
				}		

				if(countMembers == progress){
					progress = 0;
					if(ScriptSetting['get_ratings'] === "true"){
						for(index in MembersArray){
							var id = MembersArray[index]['id'];
							getJson('https://api.'+host+'/'+api_version+'/ratings/accounts/?application_id='+application_id+'&account_id='+id+'&type=all&index='+index, doneRating, errorRating);
						}
					}else if(ScriptSetting['get_glory'] === "true"){
						for(index in MembersArray){
							var id = MembersArray[index]['id'];
							getJson('/community/clans/show_clan_block/?spa_id='+id+'&index='+index, doneGlory, errorGlory);
						}
					}else{
						UpdatePage();
					}
				}
			}		
			var error_tanks = '';
			function errorTanks(url){
				Process--;
				
				progress++;
				var loading_waiting_percents = document.getElementsByClassName("loading_waiting_percents")[0];
				loading_waiting_percents.innerHTML = localization['GettingTechnology']+' ' + Number(one_percent * progress).toFixed(0) + '%';
				
				var vars = getUrlVars(url);
				var index = vars['index'];

				MembersArray[index]['tanks'] = [];
				MembersArray[index]['tanks']['lightTank'] = [];
				MembersArray[index]['tanks']['mediumTank'] = []; 
				MembersArray[index]['tanks']['heavyTank'] = []; 
				MembersArray[index]['tanks']['AT-SPG'] = []; 
				MembersArray[index]['tanks']['SPG'] = [];
				
				MembersArray[index]['average_tank'] = 0;
				
				if(error_tanks != ''){error_tanks += ', ';}
				error_tanks += MembersArray[index]['name'];
				
				if(countMembers == progress){
					progress = 0;
					if(ScriptSetting['get_ratings'] === "true"){
						for(index in MembersArray){
							var id = MembersArray[index]['id'];
							getJson('https://api.'+host+'/'+api_version+'/ratings/accounts/?application_id='+application_id+'&account_id='+id+'&type=all&index='+index, doneRating, errorRating);
						}
					}else if(ScriptSetting['get_glory'] === "true"){
						for(index in MembersArray){
							var id = MembersArray[index]['id'];
							getJson('/community/clans/show_clan_block/?spa_id='+id+'&index='+index, doneGlory, errorGlory);
						}
					}else{
						UpdatePage();
					}
				}
			}		
			function doneСomposition(url, response){
				if(response.status && response.status == "error"){
					errorMember(url);
					return;
				}		
				Process--;	

				progress++;

				var loading_waiting_percents = document.getElementsByClassName("loading_waiting_percents")[0];
				loading_waiting_percents.innerHTML = localization['GettingClan']+' ' + Number(one_percent * progress).toFixed(0) + '%';	

				var vars = getUrlVars(url);
				var index = vars['index'];
				var member = eval('('+JSON.stringify(response)+')');

				for(memberId in response.data){
					if(member['data'][memberId] == null){progress--; errorMember(url); return;}
					
					MembersArray[index]['day'] = Math.floor(((((new Date()).getTime())/1000) - member['data'][memberId]['since'])/86400);
					MembersArray[index]['since'] = member['data'][memberId]['since'];
				}
				
				if(countMembers == progress){
					progress = 0;
					for(index in MembersArray){
						var id = MembersArray[index]['id'];
						getJson('https://api.'+host+'/'+api_version+'/account/info/?application_id='+application_id+'&language='+lang+'&account_id='+id+'&fields=statistics,account_id,nickname,created_at,updated_at,logout_at,last_battle_time,global_rating&index='+index, doneMember, errorMember);
					}					
				}
			}
			function errorСomposition(url){
				Process--;
				
				progress++;
				var loading_waiting_percents = document.getElementsByClassName("loading_waiting_percents")[0];
				loading_waiting_percents.innerHTML = localization['GettingClan']+' ' + Number(one_percent * progress).toFixed(0) + '%';
				
				var vars = getUrlVars(url);
				var index = vars['index'];

				MembersArray[index]['day'] = 0;
				MembersArray[index]['since'] = 0;
				
				if(countMembers == progress){
					progress = 0;
					for(index in MembersArray){
						var id = MembersArray[index]['id'];
						getJson('https://api.'+host+'/'+api_version+'/account/info/?application_id='+application_id+'&language='+lang+'&account_id='+id+'&fields=statistics,account_id,nickname,created_at,updated_at,logout_at,last_battle_time,global_rating&index='+index, doneMember, errorMember);
					}					
				}				
			}
			function doneMember(url, response){
				if(response.status && response.status == "error"){
					errorMember(url);
					return;
				}		
				Process--;	

				progress++;

				var loading_waiting_percents = document.getElementsByClassName("loading_waiting_percents")[0];
				loading_waiting_percents.innerHTML = localization['GettingStatistics']+' ' + Number(one_percent * progress).toFixed(0) + '%';

				var vars = getUrlVars(url);
				var index = vars['index'];
				var member = eval('('+JSON.stringify(response)+')');
				for(memberId in response.data){
					if(member['data'][memberId] == null){progress--; errorMember(url); return;}
					
					MembersArray[index]['created_at'] = member['data'][memberId]['created_at'];
					MembersArray[index]['updated_at'] = member['data'][memberId]['updated_at'];
					MembersArray[index]['logout_at'] = member['data'][memberId]['logout_at'];
					MembersArray[index]['last_battle_time'] = member['data'][memberId]['last_battle_time'];
				
					if(CompanyClan != null){
						MembersArray[index]['company'] = CompanyClan[MembersArray[index]['id']];
					}else{
						MembersArray[index]['company'] = '0';
					}

					var typeStat = ["all", "company", "clan"];
					
					for(var t = 0; t < typeStat.length; t++){
						MembersArray[index]['spotted'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['spotted'];
						MembersArray[index]['hits'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['hits'];
						MembersArray[index]['battle_avg_xp'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['battle_avg_xp'];
						MembersArray[index]['draws'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['draws'];
						MembersArray[index]['wins'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['wins'];
						MembersArray[index]['losses'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['losses'];
						MembersArray[index]['capture_points'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['capture_points'];
						MembersArray[index]['battles'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['battles'];
						MembersArray[index]['damage_dealt'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['damage_dealt'];
						MembersArray[index]['hits_percents'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['hits_percents'];
						MembersArray[index]['damage_received'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['damage_received'];
						MembersArray[index]['shots'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['shots'];
						MembersArray[index]['xp'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['xp'];
						MembersArray[index]['frags'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['frags'];
						MembersArray[index]['survived_battles'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['survived_battles'];
						MembersArray[index]['dropped_capture_points'+'.'+typeStat[t]] = member['data'][memberId]['statistics'][typeStat[t]]['dropped_capture_points'];				
					}	

					MembersArray[index]['max_xp'] = member['data'][memberId]['statistics']['max_xp'];
					MembersArray[index]['global_rating'] = member['data'][memberId]['global_rating'];
					
					MembersArray[index]['glory_points'] = 0;
					MembersArray[index]['glory_position'] = 0;	
				}
				
				if(countMembers == progress){
					progress = 0;
					if(ScriptSetting['get_vehicles'] === "true"){
						for(index in MembersArray){
							var id = MembersArray[index]['id'];
							getJson('https://api.'+host+'/'+api_version+'/tanks/stats/?application_id='+application_id+'&account_id='+id+'&index='+index, doneTanks, errorTanks);
						}
					}else if(ScriptSetting['get_ratings'] === "true"){
						for(index in MembersArray){
							var id = MembersArray[index]['id'];
							getJson('https://api.'+host+'/'+api_version+'/ratings/accounts/?application_id='+application_id+'&account_id='+id+'&type=all&index='+index, doneRating, errorRating);
						}
					}else if(ScriptSetting['get_glory'] === "true"){
						for(index in MembersArray){
							var id = MembersArray[index]['id'];
							getJson('/community/clans/show_clan_block/?spa_id='+id+'&index='+index, doneGlory, errorGlory);
						}
					}else{
						UpdatePage();
					}
				}
			}
			var error_member = '';
			function errorMember(url){
				Process--;
				
				progress++;
				var loading_waiting_percents = document.getElementsByClassName("loading_waiting_percents")[0];
				loading_waiting_percents.innerHTML = localization['GettingStatistics']+' ' + Number(one_percent * progress).toFixed(0) + '%';
				
				var vars = getUrlVars(url);
				var index = vars['index'];
				
				MembersArray[index]['created_at'] = 0;
				MembersArray[index]['updated_at'] = 0;
				MembersArray[index]['logout_at'] = 0;
				MembersArray[index]['last_battle_time'] = 0;
				
				if(CompanyClan != null){
					MembersArray[index]['company'] = CompanyClan[MembersArray[index]['id']];
				}else{
					MembersArray[index]['company'] = '0';
				}					
				
				var typeStat = [".all", ".rand", ".company", ".clan"];
				
				for(var t = 0; t < typeStat.length; t++){
					MembersArray[index]['spotted'+'.'+typeStat[t]] = 0;
					MembersArray[index]['hits'+'.'+typeStat[t]] = 0;
					MembersArray[index]['battle_avg_xp'+'.'+typeStat[t]] = 0;
					MembersArray[index]['draws'+'.'+typeStat[t]] = 0;
					MembersArray[index]['wins'+'.'+typeStat[t]] = 0;
					MembersArray[index]['losses'+'.'+typeStat[t]] = 0;
					MembersArray[index]['capture_points'+'.'+typeStat[t]] = 0;
					MembersArray[index]['battles'+'.'+typeStat[t]] = 0;
					MembersArray[index]['damage_dealt'+'.'+typeStat[t]] = 0;
					MembersArray[index]['hits_percents'+'.'+typeStat[t]] = 0;
					MembersArray[index]['damage_received'+'.'+typeStat[t]] = 0;
					MembersArray[index]['shots'+'.'+typeStat[t]] = 0;
					MembersArray[index]['xp'+'.'+typeStat[t]] = 0;
					MembersArray[index]['frags'+'.'+typeStat[t]] = 0;
					MembersArray[index]['survived_battles'+'.'+typeStat[t]] = 0;
					MembersArray[index]['dropped_capture_points'+'.'+typeStat[t]] = 0;
				}
				
				MembersArray[index]['max_xp'] = 0;			
				MembersArray[index]['global_rating'] = 0;
				
				MembersArray[index]['glory_points'] = 0;
				MembersArray[index]['glory_position'] = 0;				
				
				if(error_member != ''){error_member += ', ';}
				error_member += MembersArray[index]['name'];

				if(countMembers == progress){
					progress = 0;
					if(ScriptSetting['get_vehicles'] === "true"){
						for(index in MembersArray){
							var id = MembersArray[index]['id'];
							getJson('https://api.'+host+'/'+api_version+'/tanks/stats/?application_id='+application_id+'&account_id='+id+'&index='+index, doneTanks, errorTanks);
						}
					}else if(ScriptSetting['get_ratings'] === "true"){
						for(index in MembersArray){
							var id = MembersArray[index]['id'];
							getJson('https://api.'+host+'/'+api_version+'/ratings/accounts/?application_id='+application_id+'&account_id='+id+'&type=all&index='+index, doneRating, errorRating);
						}
					}else if(ScriptSetting['get_glory'] === "true"){
						for(index in MembersArray){
							var id = MembersArray[index]['id'];
							getJson('/community/clans/show_clan_block/?spa_id='+id+'&index='+index, doneGlory, errorGlory);
						}
					}else{
						UpdatePage();
					}
				}
			}		
			function doneCompany(url, response){
				Process--;
				CompanyClan = eval('('+JSON.stringify(response)+')');
			}		
			function errorCompany(){
				Process--;
				console.log(localization['ErrorCompany']);
			}			
			var loading = -1;
			function runCollectionInfo(){
				if(loading == -1){
					loading = 1;
					loadMemberId = -1;
					
					document.getElementsByClassName("showclaninfo")[0].style.display = 'none';
					
					if(Encyclopedia == null){
						getJson('https://api.'+host+'/'+api_version+'/encyclopedia/tanks/?application_id='+application_id+'&language='+lang, doneEncyclopedia, errorEncyclopedia);
					}
					
					if(ScriptSetting['company'] === "true"){
						getJson('http://walkure.pro/US_ClanInfo/index.php?type=get&clanId='+clanId, doneCompany, errorCompany);
					}
					
					document.getElementById('clans_info_content').innerHTML += ''+
						'<div class="loading_waiting" align="center">'+
							'<img src="/static/3.11.1.2/common/css/block/b-content/img/waiting.gif">'+
							'<br />'+localization['Wait']+'<br /><br />'+
							'<div class="loading_waiting_percents">'+localization['GettingClan']+'</div>'+
							'<br /><br /><div style="color: #F9D088;">'+WarGagDescription+'</div>'+
						'</div>'+
					'';
					
					for(index in MembersArray){
						var id = MembersArray[index]['id'];
						getJson('http://api.worldoftanks.ru/wot/clan/membersinfo/?application_id='+application_id+'&language='+lang+'&member_id='+id+'&index='+index, doneСomposition, errorСomposition);
					}				
				}
			}
			var visible = -1;
			function HideShowBlock(){
				if(visible == -1){
					visible = 1;
					
					document.getElementById("checkrunclaninfo").setAttribute('class', 'b-checkbox checked');
					
					jQ(".t-table__sort").hide();
					jQ(".b-clan-buttons").hide();	
					jQ(".SettingScript").hide();	

					jQ("#battles-block").hide();
					jQ("#structure-block").hide();	
					jQ("#provinces-block").hide();				
					jQ("#linkB-block").hide();				
				}else if(visible == 1){
					visible = 0;
					
					document.getElementById("checkrunclaninfo").setAttribute('class', 'b-checkbox');
					
					jQ(".t-table__sort").show();
					jQ(".b-clan-buttons").show();
					
					memberTable.Update();
					setTimeout(function(){addTableMembersInfo();}, 2000);
					
					jQ("#battles-block").show();
					jQ("#provinces-block").show();
					jQ("#structure-block").show();
					jQ("#linkB-block").show();		

					$("#caption").hide();
					$("#newtableclaninfo").hide();	
					$("#statclanB-block").hide();	
					$("#vehicle-block").hide();	
					$("#rating-block").hide();	
				}else if(visible == 0){
					visible = 1;
					
					document.getElementById("checkrunclaninfo").setAttribute('class', 'b-checkbox checked');
					
					jQ(".t-table__sort").hide();
					jQ(".b-clan-buttons").hide();
					
					jQ("#battles-block").hide();
					jQ("#provinces-block").hide();
					jQ("#structure-block").hide();		
					jQ("#linkB-block").hide();	

					$("#caption").show();
					$("#newtableclaninfo").show();
					$("#statclanB-block").show();	
					$("#vehicle-block").show();	
					$("#rating-block").show();					
				}
			}		
			function addBlockLink(){
				var display = 'block';
				var linkB_class = 'link';
				var block_linkB = getLocalStorage('linkB', false);
				if(null == block_linkB){
					linkB_class += ' show';
					display = 'block';
				}else{
					linkB_class += ' '+block_linkB;
					if(block_linkB == 'hide'){display = 'none';}else{display = 'block';}
				}
				
				var linkB = document.createElement('div');
				linkB.setAttribute('style', 'margin-bottom: 20px;');
				linkB.setAttribute('id', 'linkB-block');
				var linkBHTML = ''+
					'<div class="link">'+
						'<span id="linkB" class="'+linkB_class+'">'+
							localization['linkBLink']+
						'</span>'+
					'</div>'+			
					'<div class="b-user-block b-speedometer-wrpr linkB" style="display: '+display+'; margin: 0px; padding: 0px;">'+
						'<div align="center" style="text-align:center;" class="b-head-block">'+
							'<h3>'+localization['linkBHead']+'</h3>'+
						'</div>'+
						'<table class="linkBT">'+
							'<tr>'+
								'<td>'+
									'<a target="_blank" href="http://ivanerr.ru/lt/clan/'+clanId+'">'+localization['LinkClan']+' ivanerr.ru</a>'+
								'</td>'+
								'<td>'+
									'<a target="_blank" href="http://wot-news.com/index.php/stat/progress/ru/'+clanId+'">'+localization['LinkClan']+' wot-news.com</a>'+
								'</td>'+
								'<td>'+
									'<a target="_blank" href="http://armor.kiev.ua/wot/clan/'+clanId+'">'+localization['LinkClan']+' armor.kiev.ua</a>'+
								'</td>'+
								'<td>'+
									'<a target="_blank" href="http://worldofclans.ru/clan/index.html?id='+clanId+'">'+localization['LinkClan']+' worldofclans.ru</a>'+
								'</td>'+
							'</tr>'+
						'</table>'+
					'</div>'+	
				'';
				
				linkB.innerHTML = linkBHTML;
				var parentElement = document.getElementById('clans_info_content');
				var theFirstChild = parentElement.firstChild;
				parentElement.insertBefore(linkB, theFirstChild);

				jQ("#linkB").click(function(){onView(this);});
			}		
			function doneProvince(url, response){
				if(response.status && response.status == "error"){
					errorProvince();
					return;
				}	
				Process--;
				
				var provincesClan = eval('('+JSON.stringify(response)+')');		
				
				var display = 'block';
				var provinces_class = 'link';
				var block_provinces = getLocalStorage('provincesB', false);
				if(null == block_provinces){
					provinces_class += ' show';
					display = 'block';
				}else{
					provinces_class += ' '+block_provinces;
					if(block_provinces == 'hide'){display = 'none';}else{display = 'block';}
				}			
			
				var provincesB = document.createElement('div');
				provincesB.setAttribute('style', 'margin-bottom: 20px;');
				provincesB.setAttribute('id', 'provinces-block');
				var provincesHTML = ''+
					'<div class="link">'+
						'<span id="provincesB" class="'+provinces_class+'">'+
							localization['ProvincesLink']+
						'</span>'+
					'</div>'+
					'<div class="b-user-block b-speedometer-wrpr provincesB" style="display: '+display+'; margin: 0px; padding: 0px;">'+
				'';

				if(provincesClan['count'] > 0 && Object.keys(provincesClan['data']).length > 0){
					provincesHTML += ''+
						'<table class="t-table t-table__sort b-provinces-table">'+
							'<thead>'+
								'<tr>'+
									'<th class="js-provinces-table">'+localization['type']+'</th>'+
									'<th class="js-provinces-table">'+localization['title_name']+'</th>'+
									'<th class="js-provinces-table">'+localization['arenas']+'</th>'+
									'<th class="js-provinces-table">'+localization['prime_time']+'</th>'+
									'<th class="js-provinces-table">'+localization['revenue']+'</th>'+
									'<th style="width:150px;" class="js-provinces-table occupancy_time">'+localization['occupancy_time']+'</th>'+
									'<th class="js-provinces-table">'+localization['links']+'</th>'+
								'</tr>'+
							'</thead>'+
							'<tbody id="js-provinces-table-body">'+
								'<tr class="js-template js-hidden">'+
									'<td width="20px" class="">'+
										'<i style="width:24px; height:24px; display:block;" class="js-type js-tooltip"></i>'+
									'</td>'+
									'<td class="js-name">'+
										'<span></span>'+
										'<i style="width:18px;height:18px;display:inline-block;" class="js-hidden js-province-attacked ico-province-'+type+'"></i>'+
										'<i style="width:18px;height:18px;display:inline-block;" class="js-hidden js-province-combats-running ico-province-combats-running"></i>'+
										'<i style="width:18px;height:18px;display:inline-block;" class="js-hidden js-province-capital ico-province-capital"></i>'+
									'</td>'+
									'<td class="js-hidden js-arena_name"></td>'+
									'<td class="js-hidden js-prime_time b-prime-time"></td>'+
									'<td class="js-hidden js-revenue">'+
										'<span class="currency-gold"></span>'+
									'</td>'+
									'<td style="width:150px;" class="js-hidden js-occupancy_time">'+
										'<span></span> '+localization['occupancy_day']+
									'</td>'+
									'<td></td>'+
								'</tr>'+
					'';	
					
					var sum_revenue = 0
					for(id in provincesClan['data']){
						var data = provincesClan['data'][id];
						
						var name = data.name;
						var revenue = data['revenue'];
						var iTime = data['prime_time'];
						var occupancy_time = data['occupancy_time'];
						var arena_name = data['arena_name'];
						var type = data['type'];
						var province_id = data['province_id'];
						sum_revenue += revenue;	

						var prime_time = "- - : - -";
						var timestamp = parseInt(iTime);
						if(timestamp != 0){	
							var date = new Date(timestamp*1000);
							var hours = date.getHours().toString();
							if(hours.length == 1){hours = '0'+hours;}
							var minutes = date.getMinutes().toString();
							if(minutes.length == 1){minutes = '0'+minutes;}
							prime_time = hours+':'+minutes;
						}

						provincesHTML += ''+
							'<tr class="even">'+
								'<td width="20px" class="">'+
									'<i class="js-type js-tooltip b-province-type-'+type+' js-tooltip-id_js-normal-tooltip" style="width:24px; height:24px; display:block;"/>'+
								'</td>'+
								'<td class="js-name">'+
									''+name+'</a>'+
								'</td>'+
								'<td class="js-arena_name">'+arena_name+'</td>'+
								'<td class="js-prime_time b-prime-time">'+prime_time+'</td>'+
								'<td class="js-revenue">'+
									'<span class="currency-gold">'+revenue+'</span>'+
								'</td>'+
								'<td style="width:150px;" class="js-occupancy_time">'+
									'<span>'+occupancy_time+'</span> '+localization['occupancy_day']+
								'</td>'+
								'<td>'+
									'<a class="b-orange-arrow" target="_blank" href="/clanwars/maps/globalmap/?province='+id+'">GlobalMap</a>'+
									'<br />'+
									'<a class="b-orange-arrow" target="_blank" href="/clanwars/maps/eventmap/?province='+id+'">EventMap</a>'+
								'</td>'+
							'</tr>'+				
						'';					
					}
					provincesHTML += ''+
							'</tbody>'+
						'</table>'+	
						'<p class="b-provinces-general-info" style="text-align:right; padding-top:10px; padding-right:10px;">'+
							localization['provinces_count']+'&nbsp;<span class="b-provinces-count js-provinces-count">'+provincesClan['count']+'</span>'+
							localization['total_revenue']+'&nbsp;<span class="js-total-revenue currency-gold">'+sum_revenue+'</span>'+
						'</p>'+					
					'';				
				}else{
					provincesHTML += ''+	
						'<div class="js-no-battles-msg b-message-warning">'+
							localization['NoProvinces']+
						'</div>'+	
					'';			
				}
				
				provincesHTML += ''+	
					'</div>'+			
				'';
				
				provincesB.innerHTML = provincesHTML;
				var parentElement = document.getElementById('clans_info_content');
				var theFirstChild = parentElement.firstChild;
				parentElement.insertBefore(provincesB, theFirstChild);
				
				jQ("#provincesB").click(function(){onView(this);});
			}
			function errorProvince(){
				Process--;
			}
			function doneBattles(url, response){
				if(response.status && response.status == "error"){
					errorBattles();
					return;
				}
				Process--;
				
				var battlesClan = eval('('+JSON.stringify(response)+')');
				
				var display = 'block';
				var battles_class = 'link';
				var block_battles = getLocalStorage('battlesB', false);
				if(null == block_battles){
					battles_class += ' show';
					display = 'block';
				}else{
					battles_class += ' '+block_battles;
					if(block_battles == 'hide'){display = 'none';}else{display = 'block';}
				}	

				var battlesB = document.createElement('div');
				battlesB.setAttribute('style', 'margin-bottom: 20px;');
				battlesB.setAttribute('id', 'battles-block');
				var battlesHTML = ''+
					'<div class="link">'+
						'<span id="battlesB" class="'+battles_class+'">'+
							localization['BattlesLink']+
						'</span>'+
					'</div>'+
					'<div class="b-user-block b-speedometer-wrpr battlesB" style="display: '+display+'; margin: 0px; padding: 0px;">'+
				'';
				
				if(battlesClan['count'] > 0 && battlesClan['data'][clanId] != null && Object.keys(battlesClan['data'][clanId]).length > 0){
					battlesHTML += ''+
						'<table class="t-table t-table__sort b-battles-table">'+
							'<thead>'+
								'<tr>'+
									'<th class="js-battles-table">'+localization['type']+'</th>'+
									'<th class="js-battles-table">'+localization['time']+'</th>'+
									'<th class="js-battles-table">'+localization['provinces']+'</th>'+
									'<th class="js-battles-table">'+localization['arenas']+'</th>'+
									'<th class="js-battles-table">'+localization['links']+'</th>'+
								'</tr>'+
							'</thead>'+
							'<tbody id="js-battles-table-body">'+
								'<tr class="js-template js-hidden">'+
									'<td class="js-hidden js-type b-battle-type"></td>'+
									'<td class="js-hidden js-time b-battle-time"></td>'+
									'<td class="js-hidden js-provinces b-battle-provinces"></td>'+
									'<td class="js-hidden js-arenas b-battle-arenas"></td>'+
									'<td></td>'+
								'</tr>'+
					'';	
					for(id in battlesClan['data']){
						var clanBattles = battlesClan['data'][id];
						
						for(index in clanBattles){
							var data = clanBattles[index];
							var name = '';
							var links = '';
							
							for(var i = 0; i < data['provinces'].length; i++){
								var id_provinces = data['provinces'][i];
								var name_provinces = data['provinces'][i];
								if(typeof MAP_TRANSLATIONS !== 'undefined'){
									name_provinces = MAP_TRANSLATIONS['PROVINCE_NAME_'+id_provinces];
								}
								if(i > 0){name += ' <i class="b-meeting-icon"></i> ';}
								name += name_provinces;
								
								if(data['provinces'].length == 1){
									links = ''+
										'<a class="b-orange-arrow" target="_blank" href="/clanwars/maps/globalmap/?province='+id_provinces+'">GlobalMap</a>'+
										'<br />'+
										'<a class="b-orange-arrow" target="_blank" href="/clanwars/maps/eventmap/?province='+id_provinces+'">EventMap</a>'+
									'';
								}
							}
							
							var started = data['started'];
							var iTime = data['time'];
							var type = data['type'];
							
							var arenas = '';
							for(var i = 0; i < data['arenas'].length; i++){
								if(i > 0){arenas += ' '+localization['or']+' ';}
								arenas += data['arenas'][i]['name_i18n'];
							}
							
							var time = "- - : - -";
							var timestamp = parseInt(iTime);
							if(timestamp != 0){	
								var date = new Date(timestamp*1000);
								var hours = date.getHours().toString();
								if(hours.length == 1){hours = '0'+hours;}
								var minutes = date.getMinutes().toString();
								if(minutes.length == 1){minutes = '0'+minutes;}
								time = hours+':'+minutes;
							}

							var plus = '';
							if(type != 'landing'){plus = ' +';}
							if(type == 'for_province'){type = 'province';}
							if(type == 'meeting_engagement'){type = 'meeting';}	

							battlesHTML += ''+
								'<tr class="odd">'+
									'<td class="js-type b-battle-type"><div><i class="b-battle-icon b-battle-icon__'+type+'"></i></div></td>'+
									'<td class="js-time b-battle-time"><div><span class="time time__aprox js-tooltip js-tooltip-id_js-battle-chips-time-aprox-tooltip">'+time+plus+'</span></div></td>'+
									'<td class="js-provinces b-battle-provinces">'+name+'</td>'+
									'<td class="js-arenas b-battle-arenas">'+arenas+'</td>'+
									'<td>'+links+'</td>'+
								'</tr>'+
							'';								
						}
					}
				}else{
					battlesHTML += ''+	
						'<div class="js-no-battles-msg b-message-warning">'+
							localization['NoBattle']+
						'</div>'+	
					'';					
				}
				
				battlesHTML += ''+	
					'</div>'+			
				'';
				
				battlesB.innerHTML = battlesHTML;
				var parentElement = document.getElementById('clans_info_content');
				var theFirstChild = parentElement.firstChild;
				parentElement.insertBefore(battlesB, theFirstChild);		
				
				jQ("#battlesB").click(function(){onView(this);});
			}
			function errorBattles(){
				Process--;
			}
			function СhangeClan(){
				var oldClanSave = getLocalStorage('ClanSave', true);

				var newClanSave = "";
				for(var i = 0; i < MembersArray.length; i++){
					var account_id = MembersArray[i]['id'];
					var account_name = MembersArray[i]['name'];
					var role = MembersArray[i]['role'];
					
					var account_data = "@:"+account_id+":"+account_name+":"+role;
					newClanSave += account_data+";";		
				}

				if(oldClanSave != null){
					var viewСhangeClan = getLocalStorage('СhangeClan', true);
					if(viewСhangeClan == null){viewСhangeClan = "";}
					
					var arrNewMembers = newClanSave.split(';');
					var arrayNewMembers = arrNewMembers.slice();
					var arrOldMembers = oldClanSave.split(';');
					var arrayOldMembers = arrOldMembers.slice();
					
					for(var i = 0; i < arrNewMembers.length - 1; i++){
						var arrNewMember = arrNewMembers[i].split(':');
						for(var j = 0; j < arrOldMembers.length - 1; j++){
							var arrOldMember = arrOldMembers[j].split(':');
							if(arrNewMember[1] == arrOldMember[1]){						
								if(arrNewMember[2] != arrOldMember[2]){
									viewСhangeClan += '1:'+arrNewMember[1]+':null:'+arrOldMember[2]+':'+arrNewMember[2]+';'; // ReName
								}
								if(arrNewMember[3] != arrOldMember[3]){
									viewСhangeClan += '2:'+arrNewMember[1]+':'+arrNewMember[2]+':'+arrOldMember[3]+':'+arrNewMember[3]+';'; // ReRole
								}
								arrayOldMembers.splice(arrayOldMembers.indexOf(arrOldMembers[j]), 1);
								arrayNewMembers.splice(arrayNewMembers.indexOf(arrNewMembers[i]), 1);
								break;
							}
						}
					}
					
					for(var i = 0; i < arrayNewMembers.length - 1; i++){
						var arrayNewMember = arrayNewMembers[i].split(':');
						viewСhangeClan += '3:'+arrayNewMember[1]+':'+arrayNewMember[2]+':null:null;'; // Join
						if(arrayNewMember[3] != 'recruit'){
							viewСhangeClan += '2:'+arrayNewMember[1]+':'+arrayNewMember[2]+':recruit:'+arrayNewMember[3]+';'; // ReRole					
						}
					}
					
					for(var i = 0; i < arrayOldMembers.length - 1; i++){
						var arrayOldMember = arrayOldMembers[i].split(':');
						viewСhangeClan += '4:'+arrayOldMember[1]+':'+arrayOldMember[2]+':null:null;'; // Leave
					}

					var change = '';					
					var arrСhangeClan = viewСhangeClan.split(';');
					
					if(changeClanLine < arrСhangeClan.length){
						var deleteCountLine = arrСhangeClan.length - changeClanLine - 1;
						for(var i = 0; i < deleteCountLine; i++){
							arrСhangeClan.splice(0, 1);
						}
					}
					
					for(var i = (arrСhangeClan.length - 1); i >= 0; i--){
						var arrСhange = arrСhangeClan[i].split(':');
						var type = arrСhange[0];
						var mId = arrСhange[1];
						var mName = arrСhange[2];
						var mOld = arrСhange[3];
						var mNew = arrСhange[4];
						
						if(type == '1'){
							change +=  '<tr>'+				
								'<td style="border-bottom: 1px solid #2E3139; padding: 5px 10px;">'+
									'<b>'+mOld+'</b> '+localization['rename']+' <b><a target="_blank" href="/community/accounts/'+mId+'/">'+mNew+'</a></b>'+
								'</td>'+
							'</tr>';
						}else if(type == '2'){
							change +=  '<tr>'+				
								'<td style="border-bottom: 1px solid #2E3139; padding: 5px 10px;">'+
									'<b><a target="_blank" href="/community/accounts/'+mId+'/">'+mName+'</a></b> '+localization['rerole']+' <b>'+getRole(getNumerRole(mOld))+'</b> &rArr; <b>'+getRole(getNumerRole(mNew))+'</b>'+
								'</td>'+
							'</tr>';						
						}else if(type == '3'){
							change +=  '<tr>'+				
								'<td style="border-bottom: 1px solid #2E3139; padding: 5px 10px;">'+
									' <font color="green">'+localization['join']+'</font> <b><a target="_blank" href="/community/accounts/'+mId+'/">'+mName+'</a></b>'+
								'</td>'+
							'</tr>';						
						}else if(type == '4'){
							change +=  '<tr>'+				
								'<td style="border-bottom: 1px solid #2E3139; padding: 5px 10px;">'+
									' <font color="red">'+localization['leave']+'</font> <b><a target="_blank" href="/community/accounts/'+mId+'/">'+mName+'</a></b>'+
								'</td>'+
							'</tr>';						
						}
					}
					
					var display = 'block';
					var structure_class = 'link';
					var block_structure = getLocalStorage('structureB');
					if(null == block_structure){
						structure_class += ' show';
						display = 'block';
					}else{
						structure_class += ' hide';
						display = 'none';
					}
					
					var structureB = document.createElement('div');
					structureB.setAttribute('style', 'margin-bottom: 20px;');
					structureB.setAttribute('id', 'structure-block');
					var structureHTML = ''+
						'<div class="link">'+
							'<span id="structureB" class="'+structure_class+'">'+
								localization['StructureLink']+
							'</span>'+
						'</div>'+			
						'<div class="b-user-block b-speedometer-wrpr structureB" style="display: '+display+'; margin: 0px; padding: 0px;">'+
							'<div align="center" style="text-align:center;" class="b-head-block">'+
								'<h3>'+localization['StructureHead']+'</h3>'+
							'</div>'+
							'<div style="overflow: auto; height: 114px;">'+
								'<table style="width: 100%;">'+
									change+
								'</table>'+
							'</div>'+
						'</div>'+	
					'';
					
					structureB.innerHTML = structureHTML;
					var parentElement = document.getElementById('clans_info_content');
					var theFirstChild = parentElement.firstChild;
					parentElement.insertBefore(structureB, theFirstChild);
					jQ("#structureB").click(function(){onView(this);});					
				}
				
				if(typeof viewСhangeClan == 'undefined'){
					setLocalStorage('СhangeClan', '', true);
					setLocalStorage('ClanSave', newClanSave, true);
				}else if(viewСhangeClan != '' && viewСhangeClan.split(';').length > 1){
					setLocalStorage('СhangeClan', viewСhangeClan, true);
					setLocalStorage('ClanSave', newClanSave, true);
				}
			}
			var one_percent = 1;
			var countMembers = 0;
			function doneClan(url, response){
				if(response.status && response.status == "error"){
					errorClan();
					return;
				}
				Process--;			
				
				var clan = eval('('+JSON.stringify(response)+')');
				countMembers = clan['data'][clanId]['members_count'];
				one_percent = 100/countMembers;
				
				clanColor = clan['data'][clanId]['clan_color'];
				
				var i = 0;
				for(memberId in clan['data'][clanId]['members']){
					var account_id = clan['data'][clanId]['members'][memberId]['account_id'];
					var account_name = clan['data'][clanId]['members'][memberId]['account_name'];
					var account_role = clan['data'][clanId]['members'][memberId]['role'];
					var account_role_i18n = clan['data'][clanId]['members'][memberId]['role_i18n'];

					MembersArray[i] = [];
					MembersArray[i]['id'] = account_id;
					MembersArray[i]['name'] = account_name;
					MembersArray[i]['role'] = account_role;
					MembersArray[i]['role_i18n'] = account_role_i18n;
					MembersArray[i]['role_numer'] = getNumerRole(account_role);
					
					i++;
				}
				
				if(ScriptSetting['view_change'] === "true"){
					СhangeClan();
				}
				
				addTableMembersInfo();
			}
			function errorClan(){
				Process--;
				
				document.getElementsByClassName("showclaninfo")[0].style.display = 'none';
				
				wgsdk.message_box(
					localization['Box'], 
					localization['ErrorClan'], 
					{
						confirm:{
							text: "OK", 
							click: function(){}
						}
					}
				);		
			}
			function getSetting(){
				var ScriptSetting = [];
				
				var saveSetting = getLocalStorage('setting', false);
				if(saveSetting == null){
					for(var i = 0; i < settingDefault.length; i++){
						var attr = settingDefault[i][0];
						var check = settingDefault[i][1];
						if(attr != "NONE" && attr != "COLUMN"){						
							ScriptSetting[attr] = check.toString();
						}
					}
					setLocalStorage('settingStructureTable', settingStructureDefault, false);
				}else{
					var setting = saveSetting.split(";");
					for(var i = 0; i < setting.length - 1; i++){
						var attr = setting[i].split(":")[0];
						var check = setting[i].split(":")[1];
						if(attr != "NONE" && attr != "COLUMN"){
							ScriptSetting[attr] = check;
						}
					}
				}
				
				var saveSettingStructure = getLocalStorage('settingStructureTable', false);
				if(saveSetting == null){
					setLocalStorage('settingStructureTable', settingStructureDefault, false);
				}
				
				return ScriptSetting;
			}			
			function getHTMLSetting(){
				var html = '';
				
				var newSetting = '';
				var saveSetting = getLocalStorage('setting', false);

				html += ''+
					'<td class="colum-setting" valign="top">'+
					'<div class="title-colum-setting"><b>'+localization['ViewTable']+'</b></div>'+
					'<br />'+
				'';
				
				var classInput = 'colum-setting';
				if(saveSetting == null){
					for(var i = 0; i < settingDefault.length; i++){
						if(settingDefault[i][0] == "NONE"){
							if(settingDefault[i][1]){
								classInput = 'default-setting';
								html += ''+
									'<input id="'+settingDefault[i][0]+'" class="'+classInput+'" type="hidden" name="'+settingDefault[i][0]+'"  value="true">'+
									'<br /><br /><b>'+localization['StructureTable']+'</b><br />'+
									'<table>'+
									'<tr>'+
									'<td>'+
									'<select size="10" class="structure-table" style="width: 150px; margin-top:5px;">'+
									'</select>'+
									'</td>'+
									'<td style="padding-left: 2px;">'+
									'<br /><br /><br /><br /><br />'+
									'<div class="structure-table-up"></div>'+
									'<br />'+
									'<div class="structure-table-down"></div>'+
									'</td>'+
									'</tr>'+
									'</table>'+
									'</td>'+
									'<td valign="top" style="padding-left:20px;">'+
									'<b>'+localization['dafaultSetting']+'</b>'+
									'<br />'+							
								'';							
							}else{
								html += ''+
									'<input id="'+settingDefault[i][0]+'" class="'+classInput+'" type="hidden" name="'+settingDefault[i][0]+'" value="false">'+
									'<br />'+
								'';							
							}
						}else if(settingDefault[i][0] == "COLUMN"){	
							html += ''+
								'<input id="'+settingDefault[i][0]+'" class="'+classInput+'" type="hidden" name="'+settingDefault[i][0]+'" value="false">'+
								'</td>'+
								'<td valign="top" style="padding-left:20px;">'+
								'<br />'+
								'<br />'+
							'';
						}else{
							var checkbox = ''; if(settingDefault[i][1]){checkbox = 'checked';}
						
							html += ''+
								'<input id="'+settingDefault[i][0]+'" class="'+classInput+'" type="checkbox" name="'+settingDefault[i][0]+'" '+checkbox+'>'+
								'<span style="padding-left:5px;">'+localization[settingDefault[i][0]]+'</span>'+
								'<br />'+
							'';						
						}
						newSetting += settingDefault[i][0]+':'+settingDefault[i][1]+';';
					}
					setLocalStorage('setting', newSetting, false);
				}else{
					var setting = saveSetting.split(";");
					for(var i = 0; i < setting.length - 1; i++){
						var attr = setting[i].split(":")[0];
						var check = setting[i].split(":")[1];
						if(attr == "NONE"){
							if(check == "true"){
								classInput = 'default-setting';
								html += ''+
									'<input id="'+attr+'" class="'+classInput+'" type="hidden" name="'+attr+'"  value="true">'+
									'<br /><br /><b>'+localization['StructureTable']+'</b><br />'+
									'<table>'+
									'<tr>'+
									'<td>'+
									'<select size="10" class="structure-table" style="width: 150px; margin-top:5px;">'+
									'</select>'+
									'</td>'+
									'<td style="padding-left: 2px;">'+
									'<br /><br /><br /><br /><br />'+
									'<div class="structure-table-up"></div>'+
									'<br />'+
									'<div class="structure-table-down"></div>'+
									'</td>'+
									'</tr>'+
									'</table>'+
									'</td>'+
									'<td valign="top" style="padding-left:20px;">'+
									'<b>'+localization['dafaultSetting']+'</b>'+
									'<br />'+							
								'';
							}else{
								html += ''+
									'<input id="'+attr+'" class="'+classInput+'" type="hidden" name="'+attr+'"  value="false">'+
									'<br />'+
								'';							
							}
						}else if(attr == "COLUMN"){	
							html += ''+
								'<input id="'+attr+'" class="'+classInput+'" type="hidden" name="'+attr+'" value="false">'+
								'</td>'+
								'<td valign="top" style="padding-left:20px;">'+
								'<br />'+
								'<br />'+
							'';
						}else{
							var checkbox = ''; if(check === "true"){checkbox = 'checked';}
						
							html += ''+
								'<input id="'+attr+'" class="'+classInput+'" type="checkbox" name="'+attr+'" '+checkbox+'>'+
								'<span style="padding-left:5px;">'+localization[attr]+'</span>'+
								'<br />'+
							'';						
						}
					}
				}			
				html += '</td>';
				
				return html;
			}			
			function changeStructuteTable(){
				var colum_setting = document.getElementsByClassName("colum-setting");
				var structure_table = document.getElementsByClassName("structure-table")[0];
				for(var i = 0; i < colum_setting.length; i++){
					if(colum_setting[i].checked){
						for(j = 0; j < structure_table.options.length; j++){
							if(colum_setting[i].id == structure_table.options[j].value){
								break;
							}
							if(j == structure_table.options.length - 1){
								var option = document.createElement("option");
								option.text = localization[colum_setting[i].id];
								option.value = colum_setting[i].id;
								structure_table.add(option);							
							}
						}
						if(structure_table.options.length == 0){
							var option = document.createElement("option");
							option.text = localization[colum_setting[i].id];
							option.value = colum_setting[i].id;
							structure_table.add(option);
						}
					}else{
						for(j = 0; j < structure_table.options.length; j++){
							if(colum_setting[i].id == structure_table.options[j].value){
								structure_table.remove(j);
								break;
							}
						}					
					}
				}
			}				
			function ASC(a){
				return function (b, c){
					if(a == 'name'){
						return b[a].toLowerCase() < c[a].toLowerCase() ? -1 : b[a].toLowerCase() > c[a].toLowerCase() ? 1 : 0;
					}else{
						return parseInt(b[a]) < parseInt(c[a]) ? -1 : parseInt(b[a]) > parseInt(c[a]) ? 1 : 0;
					}
				}
			};		
			function DESC(a){
				return function (b, c){
					if(a == 'name'){
						return b[a].toLowerCase() > c[a].toLowerCase() ? -1 : b[a].toLowerCase() < c[a].toLowerCase() ? 1 : 0;
					}else{
						return parseInt(b[a]) > parseInt(c[a]) ? -1 : parseInt(b[a]) < parseInt(c[a]) ? 1 : 0;
					}
				}
			};					
			function TimeToDate(time){
				var date = new Date(time * 1000);
				var day = date.getDate();
				var month = (date.getMonth() + 1);
				var year = date.getFullYear();
				
				if(day < 10){
					day = '0'+day;
				}
				if(month < 10){
					month = '0'+month;
				}
				
				return 	day+'.'+month+'.'+year;
			}
			function parseDate(date){
				if(null == date){
					return 'XX.XX.XXXX';
				}
			
				var day = date.getDate();
				var month = (date.getMonth() + 1);
				var year = date.getFullYear();
				
				if(day < 10){
					day = '0'+day;
				}
				if(month < 10){
					month = '0'+month;
				}
				
				return 	day+'.'+month+'.'+year;
			}
			function addScript(callback){
				var script = document.createElement("script");
				script.async = true;
				script.textContent = callback.toString();
				document.head.appendChild(script);
			}		
			function getNumerRole(role){
				var num_role = 8;
				if(role == 'leader'){num_role = 1;}
				if(role == 'vice_leader'){num_role = 2;}
				if(role == 'commander'){num_role = 3;}
				if(role == 'recruiter'){num_role = 4;}
				if(role == 'diplomat'){num_role = 5;}
				if(role == 'treasurer'){num_role = 6;}
				if(role == 'private'){num_role = 7;}
				if(role == 'recruit'){num_role = 8;}
				return num_role;
			}
			function getRole(numer){
				var locale_role = '';
				if(numer == 0){locale_role = '-';}
				if(numer == 1){locale_role = localization['leader'];}
				if(numer == 2){locale_role = localization['vice_leader'];}
				if(numer == 3){locale_role = localization['commander'];}
				if(numer == 4){locale_role = localization['recruiter'];}
				if(numer == 5){locale_role = localization['diplomat'];}
				if(numer == 6){locale_role = localization['treasurer'];}
				if(numer == 7){locale_role = localization['private'];}
				if(numer == 8){locale_role = localization['recruit'];}
				return locale_role;
			}
			function getLevelText(numer){
				var levelText = '';
				if(numer == 0){levelText = '-';}
				if(numer == 1){levelText = 'I';}
				if(numer == 2){levelText = 'II';}
				if(numer == 3){levelText = 'III';}
				if(numer == 4){levelText = 'IV';}
				if(numer == 5){levelText = 'V';}
				if(numer == 6){levelText = 'VI';}
				if(numer == 7){levelText = 'VII';}
				if(numer == 8){levelText = 'VIII';}
				if(numer == 9){levelText = 'IX';}
				if(numer == 10){levelText = 'X';}
				return levelText;
			}				
		}
		function Recruits(){
			var Members = [];
			MembersArray = [];
		
			try{
				//CheckVersionScript();
			
				{var StyleText = ''+
					'div.link{font-family: "Arial", "Helvetica CY", "Helvetica", sans-serif; font-size:13px; color: #F25322; text-align: right; padding-top: 5px; padding-bottom: 5px;}'+
					'span.link:hover{border-bottom: 1px dotted #F25322;}'+
					'span.hide{cursor:pointer; background: url("/static/3.12.0.3/common/css/block/b-link/img/vertical-arrow.png") no-repeat; background-position: 100% -20px; padding-right: 8px;}'+
					'span.show{cursor:pointer; background: url("/static/3.12.0.3/common/css/block/b-link/img/vertical-arrow.png") no-repeat; background-position: 100% 0px; padding-right: 8px;}'+
					'div.scriptclainfo{display: none; margin-bottom: 5px; border: 1px dashed #606061; text-align: center; padding: 10px;}'+
					'span.developer{font-family: "Arial", "Helvetica CY", "Helvetica", sans-serif; color: #606061; font-size:14px;}'+
					'a.name{color: #658C4C; font-weight: bold;}'+
					'a.url{color: #2CA8C7; font-weight: bold;}'+				
					'.last-clan td{padding: 5px; text-valign: center;}'+
					'table#newTableRecruits td{height: 24px; padding-bottom: 12px; padding-left: 1px; padding-right: 1px; padding-top: 11px;}'+
					'table#newTableRecruits td span{padding: 0px; margin: 0px;}'+
				'';}
				var StyleAdd = document.createElement("style");
				StyleAdd.textContent = StyleText.toString();
				document.head.appendChild(StyleAdd);
				
				var user_list_table = document.getElementById("user-list-table");
				
				var b_hr_block = document.getElementsByClassName("b-hr-block");
				b_hr_block[0].outerHTML += ''+
					'<div id="getDeveloper">'+
						getDeveloper()+
					'</div>'+	
					'<div align="right" style="padding-bottom: 20px;">'+
						'<div class="b-big-orange-buttonarea b-big-orange-tab StartInfo">'+
							'<span style="height: 26px;" class="b-big-orange-button">'+
								'<span style="height: 26px;" class="b-big-orange-button_right b-button-wrap">'+
									'<input id="StartInfo" type="submit" style="padding: 2px 5px 0px; height: 26px;" value="'+localization['StartInfo']+'">'+
								'</span>'+
							'</span>'+
						'</div>'+					
					'</div>'+					
				'';
				jQ(".StartInfo").hide();
				jQ("#scriptclainfo").click(function(){onView(this);});
				var countClickStartInfo = 0;
				jQ("#StartInfo").click(function(){
					wgsdk.waiting('open');
					
					jQ(".StartInfo").hide();
					
					loadEncyclopediaTime = 0;
					if(Encyclopedia == null){
						getJson('https://api.'+host+'/'+api_version+'/encyclopedia/tanks/?application_id='+application_id+'&language='+lang, doneEncyclopedia, errorEncyclopedia);
					}					
					
					for(var i = 0; i < user_list_table.rows.length; i++){
						var row = user_list_table.rows[i];
						if(i < 2 && countClickStartInfo == 0){
							countClickStartInfo++;
							for(j = 0; j < row.cells.length; j++){
								var cell = row.cells[j];
								if(j == 2){
									cell.innerHTML += '<hr class="t-profile" /><div align="center">'+localization['kpdV']+'</div>';
								}else if(j == 3){
									cell.innerHTML += '<hr class="t-profile" /><div align="center">'+localization['bsV']+'</div>';
								}else if(j == 4){
									cell.innerHTML += '<hr class="t-profile" /><div align="center">'+localization['wn6V']+'</div>';
								}else if(j == 5){
									cell.innerHTML += '<hr class="t-profile" /><div align="center">'+localization['wn8V']+'</div>';
								}
							}
						}else if(i >= 2){
							var cell = row.cells[1];
							
							var account_link = cell.getElementsByTagName('A')[0];
							var account_id = account_link.getAttribute('data-account_id');
							var account_span = account_link.getElementsByTagName('SPAN')[0];
							var account_name = account_span.innerHTML;
							
							var index = MembersArray.length;
							MembersArray[index] = [];							
							MembersArray[index]['id'] = account_id;
							MembersArray[index]['name'] = account_name;
						
							getJson('https://api.'+host+'/'+api_version+'/account/info/?application_id='+application_id+'&language='+lang+'&account_id='+account_id+'&fields=statistics,account_id,nickname,created_at,updated_at,logout_at,last_battle_time,global_rating&index='+index+'&type=member', doneGetMemberInfo, errorGetMemberInfo);
						}
					}
				});
				setTimeout(function(){addTableLastClan(); jQ(".StartInfo").show();}, 2000);
				jQ(".js-sort-controll").click(function(){
					setTimeout(function(){addTableLastClan(); jQ(".StartInfo").show();}, 2000);
				});	
				jQ(".b-pager_link").click(function(){
					setTimeout(function(){addTableLastClan(); jQ(".StartInfo").show();}, 2000);
				});
				var loadTableTime = 0;
				function addTableLastClan(){
					if(user_list_table.rows.length <= 2 && loadTableTime < 5){
						loadTableTime++;
						setTimeout(addTableLastClan, 1000);
						return;
					}

					loadTableTime = 0;
					
					for(var i = 2; i < user_list_table.rows.length; i++){
						var row = user_list_table.rows[i];
						
						var indexId = Members.length;
						Members[indexId] = [];
						
						for(j = 0; j < row.cells.length; j++){
							var cell = row.cells[j];
							if(j == 1){
								var account_link = cell.getElementsByTagName('A')[0];
								var account_id = account_link.getAttribute('data-account_id');
								var account_span = account_link.getElementsByTagName('SPAN')[0];
								var account_name = account_span.innerHTML;
								
								Members[indexId]['id'] = account_id;
								Members[indexId]['name'] = account_name;
							}else if(j == 2){
								cell.setAttribute('style', 'padding: 0px;');
								cell.innerHTML = '<span style="color: '+getBattlesColor(parseInt(cell.innerHTML))+';">'+cell.innerHTML+'</span>';
							}else if(j == 3){
								cell.setAttribute('style', 'padding: 0px;');
								cell.innerHTML = '<span style="color: '+getWinrateColor(parseInt(cell.innerHTML))+';">'+cell.innerHTML+'%</span>';
							}else if(j == 4){
								cell.setAttribute('style', 'padding: 0px;');
								cell.innerHTML = '<span style="color: '+getCFXP(parseInt(cell.innerHTML))+';">'+cell.innerHTML+'</span>';
							}else if(j == 5){
								cell.setAttribute('style', 'padding: 0px;');
								cell.innerHTML = '<span style="color: '+getTopVehiclesColor(parseInt(cell.innerHTML))+';">'+cell.innerHTML+'</span>';
							}else if(j == 9){
								var clans = document.createElement('img');
								clans.setAttribute('id', indexId);
								clans.setAttribute('align', 'right');
								clans.setAttribute('style', 'cursor: pointer; margin: 2px 5px 0px 0px;');
								clans.setAttribute('src', '/static/3.17.1.2/common/css/scss/footer/img/ico-footer-community.png');
								if(clans.addEventListener){
									clans.addEventListener('click', function(e){
										wgsdk.waiting('open');
										var element = e.target;
										var index = element.getAttribute('id');
										var memberId = Members[index]['id'];
										getJson('http://walkure.pro/US_ClanInfo/lastclanplayer.php?id='+memberId, doneHistoryClans, errorHistoryClans);
									}, false);
								}else{
									clans.attachEvent('onclick', function(e){
										wgsdk.waiting('open');
										var element = e.target;
										var index = element.getAttribute('id');
										var memberId = Members[index]['id'];
										getJson('http://walkure.pro/US_ClanInfo/lastclanplayer.php?id='+memberId, doneHistoryClans, errorHistoryClans);
									});
								}								
								cell.appendChild(clans);							
							}
						}
					}
				}
			}catch(e){
				var error = localization['ErrorScript']+"<br /><br />"+e.stack+"<br /><br />"+localization['ErrorSendDeveloper'];
				wgsdk.error(error, undefined, undefined, {title: localization['Box']});
				wgsdk.waiting('close');
			}			
		}
		function Accounts(){
			MembersArray = [];
			{var premiumTank = [
				"Тетрарх",
				"БТ-СВ",
				"ЛТП",
				"М3 лёгкий",
				"Т-127",
				"А-32",
				"Валентайн II",
				"Черчилль III",
				"КВ-220",
				"КВ-220 Бета-Тест",
				"Матильда IV",
				"СУ-85И",
				"СУ-100Y",
				"СУ-122-44",
				"Т-44-85",
				"Т-44-122",
				"ИС-6",
				"КВ-5",
				"Pz.Kpfw. 38H 735 (f)",
				"Pz.Kpfw. II Ausf. J",
				"Pz.Kpfw. S35 739 (f)",
				"T-15",
				"Pz.Kpfw. B2 740 (f)",
				"Pz.Kpfw. IV hydrostat.",
				"T-25",
				"Dicker Max",
				"Pz.Kpfw. IV Schmalturm",
				"Pz.Kpfw. V/IV",
				"Pz.Kpfw. V/IV Alpha",
				"E 25",
				"Panther/M10",
				"8,8 cm Pak 43 Jagdtiger",
				"Lowe",
				"T1E6",
				"T2 Light Tank",
				"T7 Combat Car",
				"M22 Locust",
				"MTLS-1G14",
				"M4A2E4 Sherman",
				"Ram II",
				"T14",
				"M6A2E1",
				"T26E4 SuperPershing",
				"T34",
				"M60",
				"FCM 36 Pak 40",
				"105 leFH18B2",
				"FCM 50 t",
				"Light Mk. VIC",
				"Sexton I",
				"Excelsior",
				"Matilda Black Prince",
				"TOG II*",
				"AT 15A",
				"Type 64",
				"Type 62",
				"Type 59",
				"WZ-111",
				"T-34-3",
				"112",
				"Type 59 G",
				"Type 3 Chi-Nu Kai"
			];}
			{var accountsSettingDefault = [
				["update", "checkbox", "true"],
				["onload", "checkbox", "false"],
				["NONE", "NONE", "NONE"],
				["personal", "radio", "0"],
				["speedometer", "radio", "0"],
				["achievements", "radio", "0"],
				["statistic", "radio", "0"],
				["diagrams", "radio", "0"],
				["ratings", "radio", "0"]
			];}		
			try{	
				AccountsSetting = getAccountsSetting();
			
				CheckVersionScript(AccountsSetting['update'][1]);			
				
				{var StyleText = ''+
					'div.link{font-family: "Arial", "Helvetica CY", "Helvetica", sans-serif; font-size:13px; color: #F25322; text-align: right; padding-top: 5px; padding-bottom: 5px; margin-top: 20px;}'+
					'span.link:hover{border-bottom: 1px dotted #F25322;}'+
					'span.hide{cursor:pointer; background: url("/static/3.12.0.3/common/css/block/b-link/img/vertical-arrow.png") no-repeat; background-position: 100% -20px; padding-right: 8px;}'+
					'span.show{cursor:pointer; background: url("/static/3.12.0.3/common/css/block/b-link/img/vertical-arrow.png") no-repeat; background-position: 100% 0px; padding-right: 8px;}'+
					'div.scriptclainfo{display: none; margin-bottom: 5px; border: 1px dashed #606061; text-align: center; padding: 10px;}'+
					'span.developer{font-family: "Arial", "Helvetica CY", "Helvetica", sans-serif; color: #606061; font-size:14px;}'+
					'a.name{color: #658C4C; font-weight: bold;}'+
					'a.url{color: #2CA8C7; font-weight: bold;}'+				
					'.last-clan td{padding: 5px; text-valign: center;}'+
					'.b-user-block{margin-top: 0px;}'+
					'.b-speedometer-header{padding-left: 10px; padding-right: 0px;}'+
					'.b-speedometer-param__fight{width: 160px;}'+
					'.b-speedometer-param__win{width: 160px;}'+
					'.b-speedometer-param__exp{width: 160px;}'+
					'.b-speedometer-wrpr{padding-bottom: 0px;}'+
					'.SettingAccountsTable{width: 100%; margin-bottom: 20px;}'+
					'.SettingAccountsTable tr{border: 1pt dashed #606061;}'+
					'.SettingAccountsTable td{padding: 3px; width: 50%;}'+
					'.SettingAccountsTable td.attr-name{padding: 5px; text-align: right; text-valign: top;}'+
					'.SettingAccountsTable td.attr-value{text-align: left; text-valign: top;}'+
				'';}
				var StyleAdd = document.createElement("style");
				StyleAdd.textContent = StyleText.toString();
				document.head.appendChild(StyleAdd);
				
				var b_userblock_wrpr = document.getElementsByClassName("b-userblock-wrpr")[0];
				var Developer = document.createElement('div');
				Developer.setAttribute('id', 'getDeveloper');
				Developer.innerHTML = ''+
					'<div align="right">'+
						'<div class="b-big-orange-buttonarea b-big-orange-tab">'+
							'<span style="height: 26px;" class="b-big-orange-button">'+
								'<span style="height: 26px;" class="b-big-orange-button_right b-button-wrap">'+
									'<input id="SettingAccounts" type="submit" style="padding: 2px 5px 0px; height: 26px;" value="'+localization['Setting']+'">'+
								'</span>'+
							'</span>'+
						'</div>'+
					'</div>'+					
					getDeveloper()+				
				'';
				var theFirstChild = b_userblock_wrpr.firstChild;
				b_userblock_wrpr.insertBefore(Developer, theFirstChild);
				jQ('#scriptclainfo').click(function(){onView(this);});
				jQ('#SettingAccounts').click(function(){
					var html = '<table class="SettingAccountsTable">';
					
					for(var attr in AccountsSetting){
						var type = AccountsSetting[attr][0];
						var value = AccountsSetting[attr][1];
						if(attr == 'NONE'){
							html += ''+
								'<tr style="border: 0;">'+
									'<td class="attr-name">'+
									'</td>'+
									'<td class="attr-value">'+
										'<input class="AccountsSetting" type="hidden" name="'+attr+'" value="'+value+'">'
									'</td>'+
								'</tr>'+
							'';
						}else{
							if(type == 'checkbox'){
								var checkbox = ''; if(value == 'true'){checkbox = 'checked';}
								html += ''+
									'<tr style="border: 0;">'+
										'<td class="attr-name">'+
											localization[attr]+
										'</td>'+
										'<td class="attr-value">'+
											'<input class="AccountsSetting" type="checkbox" name="'+attr+'" '+checkbox+'>'
										'</td>'+
									'</tr>'+
								'';									
							}else if(type == 'radio'){
								var checked1 = ''; var checked2 = ''; var checked3 = '';
								if(value == '-1'){
									checked1 = 'checked';
								}else if(value == '1'){
									checked3 = 'checked';
								}else{
									checked2 = 'checked';
								}
								html += ''+
									'<tr>'+
										'<td class="attr-name">'+
											localization[attr]+
										'</td>'+
										'<td class="attr-value">'+
											'<input class="AccountsSetting" type="radio" name="'+attr+'" value="-1" '+checked1+' />'+
											localization['NoView']+'<br />'+
											'<input class="AccountsSetting" type="radio" name="'+attr+'" value="0" '+checked2+' />'+
											localization['HideView']+'<br />'+
											'<input class="AccountsSetting" type="radio" name="'+attr+'" value="1" '+checked3+' />'+
											localization['ShowView']+'<br />'+
										'</td>'+
									'</tr>'+
								'';									
							}
						}
					}
					
					html += '</table>';
					
					html += ''+
						'<div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">'+
							'<div class="ui-dialog-buttonset">'+
								'<span class="b-button b-button__colored">'+
									'<span class="b-button_right b-button-wrap">'+
										'<input type="button" value="Ok" class="b-button-confirm setting-button-confirm" tabindex="1004">'+
									'</span>'+
								'</span>'+
								'<div class="b-cancel">'+
									'<input type="button" value="Отмена" class="b-button-cancel setting-button-cancel" tabindex="1005">'+
								'</div>'+
							'</div>'+
						'</div>'+	
					'';			
					
					var member_dialog_title = document.getElementsByClassName("last-clan-dialog-title")[0];
					var member_dialog_content = document.getElementsByClassName("last-clan-dialog-content")[0];
					
					member_dialog_title.innerHTML = localization['Setting'];					
					
					member_dialog_content.innerHTML = html;
					
					document.getElementsByClassName("last-clan-dialog")[0].style.top = (window.scrollY+50)+'px';
					document.getElementsByClassName("last-clan-info")[0].style.display = 'inline';
					
					jQ("#CloseDialogLastClans").click(function(){
						document.getElementsByClassName("last-clan-info")[0].style.display = 'none';
					});
					jQ(".setting-button-cancel").click(function(){
						document.getElementsByClassName("last-clan-info")[0].style.display = 'none';
					});
					jQ(".setting-button-confirm").click(function(){
						var newSetting = '';
						
						var colum_setting = document.getElementsByClassName("AccountsSetting");				
						for(var i = 0; i < colum_setting.length; i++){
							var attr = colum_setting[i].name;
							var type = colum_setting[i].type;
							if(attr == "NONE"){
								newSetting += 'NONE:NONE:NONE;';
							}else if(type == "checkbox"){
								newSetting += attr+':'+type+':'+colum_setting[i].checked+';';
							}else if(type == "radio"){
								if(colum_setting[i].checked){
									newSetting += attr+':'+type+':'+colum_setting[i].value+';';
								}
							}
						}						

						setLocalStorage('accountssetting', newSetting, false);
						
						window.location.reload();
					});
				});				
				
				var js_profile_name = document.getElementsByClassName("js-profile-name")[0];
				js_profile_name.innerHTML += ''+
					'<div id="HistoryClans" style="cursor:pointer; color: #FF7432;">'+
						'<img style="padding-right: 1px; height: 11px;" src="/static/3.17.1.2/common/css/scss/footer/img/ico-footer-community.png" />'+
						localization['HistoryClans']+
					'</div>'+			
				'';
				jQ('#HistoryClans').click(function(){
					wgsdk.waiting('open');
					getJson('http://walkure.pro/US_ClanInfo/lastclanplayer.php?id='+memberId, doneHistoryClans, errorHistoryClans);
				});
				
				if(AccountsSetting['onload'][1] !== "false"){return;}

				wgsdk.waiting('open');
				
				loadEncyclopediaTime = 0;
				if(Encyclopedia == null){
					getJson('https://api.'+host+'/'+api_version+'/encyclopedia/tanks/?application_id='+application_id+'&language='+lang, doneEncyclopedia, errorEncyclopedia);
				}				
				
				jQ('.b-hr-layoutfix__small-indent-bottom').hide();
				
				var bUserBlock = document.getElementsByClassName('b-user-block');
				for(var i = 0; i < bUserBlock.length; i++){
					if(bUserBlock[i].getAttribute('class') == 'b-user-block'){
						bUserBlock[i].setAttribute('class', 'b-user-block PersonalDataBlock');
						
						bUserBlock[i].outerHTML = ''+
							'<div class="link" style="padding-bottom: 20px;">'+
								'<span id="PersonalDataBlock" class="link hide">'+
									localization['PersonalDataBlock']+
								'</span>'+
							'</div>'+
						bUserBlock[i].outerHTML;
					}	
				}
				jQ('#PersonalDataBlock').click(function(){onView(this);});
				if(AccountsSetting['personal'][1] == "-1"){
					jQ('.PersonalDataBlock').hide();
					jQ('#PersonalDataBlock').hide();							
				}else if(AccountsSetting['personal'][1] == "0"){
					jQ('.PersonalDataBlock').hide();
					jQ('#PersonalDataBlock').show();							
				}else if(AccountsSetting['personal'][1] == "1"){
					jQ('.PersonalDataBlock').show();
					jQ('#PersonalDataBlock').show();							
				}				
				
				var bSpeedometerBody = document.getElementsByClassName('b-speedometer-body')[0];
				bSpeedometerBody.setAttribute('class', 'b-speedometer-body clearfix PersonalSpeedometerBlock');
				bSpeedometerBody.outerHTML = ''+
					'<div class="link" style="padding-right: 10px;">'+
						'<span id="PersonalSpeedometerBlock" class="link hide">'+
							localization['PersonalSpeedometerBlock']+
						'</span>'+
					'</div>'+
				bSpeedometerBody.outerHTML;
				jQ('#PersonalSpeedometerBlock').click(function(){onView(this);});
				if(AccountsSetting['speedometer'][1] == "-1"){
					jQ('.PersonalSpeedometerBlock').hide();
					jQ('#PersonalSpeedometerBlock').hide();							
				}else if(AccountsSetting['speedometer'][1] == "0"){
					jQ('.PersonalSpeedometerBlock').hide();
					jQ('#PersonalSpeedometerBlock').show();							
				}else if(AccountsSetting['speedometer'][1] == "1"){
					jQ('.PersonalSpeedometerBlock').show();
					jQ('#PersonalSpeedometerBlock').show();							
				}					
				
				var newAchievementsHTML = '';
				jQ('.js-achievements-header')[0].outerHTML += ''+
					'<div class="link" style="margin-top: -20px;">'+
						'<span id="PersonalAchievementsBlock" class="link hide">'+
							localization['PersonalAchievementsBlock']+
						'</span>'+
					'</div>'+
					'<div class="PersonalAchievementsBlock"></div>'+
				'';
				newAchievementsHTML += jQ('.js-achievements-header')[0].outerHTML;
				newAchievementsHTML += jQ('.js-full-achievements')[0].outerHTML;
				jQ('.js-achievements-header').remove();
				jQ('.js-short-achievements').remove();
				jQ('.js-full-achievements').remove();
				jQ('.js-achivements-showhide').remove();
				var PersonalAchievementsBlock = document.getElementsByClassName('PersonalAchievementsBlock')[0];
				PersonalAchievementsBlock.innerHTML = newAchievementsHTML;
				jQ('.js-full-achievements').show();
				jQ('#PersonalAchievementsBlock').click(function(){onView(this);});
				if(AccountsSetting['achievements'][1] == "-1"){
					jQ('.PersonalAchievementsBlock').hide();
					jQ('#PersonalAchievementsBlock').hide();
				}else if(AccountsSetting['achievements'][1] == "0"){
					jQ('.PersonalAchievementsBlock').hide();
					jQ('#PersonalAchievementsBlock').show();
				}else if(AccountsSetting['achievements'][1] == "1"){
					jQ('.PersonalAchievementsBlock').show();
					jQ('#PersonalAchievementsBlock').show();
				}
				
				var divContent = l_content.getElementsByTagName('div');
				for(var divI = 0; divI < divContent.length; divI++){
					if(divContent[divI].getAttribute('class') != null && 
						divContent[divI].getAttribute('class') == 'b-hr-layoutfix b-hr-layoutfix__small-indent-bottom clearfix' && 
						divContent[divI+2].getAttribute('class') == 'clearfix'){
						divContent[divI+2].outerHTML = ''+
							'<div class="link">'+
								'<span id="PersonalStatisticBlock" class="link hide">'+
									localization['PersonalStatisticBlock']+
								'</span>'+
							'</div>'+
							'<div class="PersonalStatisticBlock">'+							
								divContent[divI+2].outerHTML+
							'</div>'+
						'';
					}
				}
				jQ('#PersonalStatisticBlock').click(function(){onView(this);});
				if(AccountsSetting['statistic'][1] == "-1"){
					jQ('.PersonalStatisticBlock').hide();
					jQ('#PersonalStatisticBlock').hide();
				}else if(AccountsSetting['statistic'][1] == "0"){
					jQ('.PersonalStatisticBlock').hide();
					jQ('#PersonalStatisticBlock').show();
				}else if(AccountsSetting['statistic'][1] == "1"){
					jQ('.PersonalStatisticBlock').show();
					jQ('#PersonalStatisticBlock').show();
				}				
				
				jQ('.b-diagrams-sector')[0].outerHTML = ''+
					'<div class="link">'+
						'<span id="PersonalDiagramsBlock" class="link hide">'+
							localization['PersonalDiagramsBlock']+
						'</span>'+
					'</div>'+
					'<div class="PersonalDiagramsBlock">'+							
						jQ('.b-diagrams-sector')[0].outerHTML+
					'</div>'+					
				'';
				jQ('#PersonalDiagramsBlock').click(function(){onView(this);});
				if(AccountsSetting['diagrams'][1] == "-1"){
					jQ('.PersonalDiagramsBlock').hide();
					jQ('#PersonalDiagramsBlock').hide();
				}else if(AccountsSetting['diagrams'][1] == "0"){
					jQ('.PersonalDiagramsBlock').hide();
					jQ('#PersonalDiagramsBlock').show();
				}else if(AccountsSetting['diagrams'][1] == "1"){
					jQ('.PersonalDiagramsBlock').show();
					jQ('#PersonalDiagramsBlock').show();
				}					

				var newRatingsHTML = '';
				jQ('.b-composite-heading')[0].outerHTML += ''+
					'<div class="link">'+
						'<span id="PersonalRatingsBlock" class="link hide">'+
							localization['PersonalRatingsBlock']+
						'</span>'+
					'</div>'+
					'<div class="PersonalRatingsBlock"></div>'+
				'';
				newRatingsHTML += jQ('.b-composite-heading')[0].outerHTML;
				newRatingsHTML += jQ('.t-profile')[0].outerHTML;
				newRatingsHTML += jQ('.b-profile-link')[0].outerHTML;
				jQ('.t-profile')[0].setAttribute('class', 't-profile new-t-profile-ratings');
				jQ('.b-composite-heading').remove();
				jQ('.new-t-profile-ratings').remove();
				jQ('.b-profile-link').remove();
				var PersonalRatingsBlock = document.getElementsByClassName('PersonalRatingsBlock')[0];
				PersonalRatingsBlock.innerHTML = newRatingsHTML;
				jQ('.b-profile-ratings-date').hide();
				jQ('.b-composite-heading')[0].setAttribute('style', 'margin-top: 0px;');
				jQ('#PersonalRatingsBlock').click(function(){onView(this);});
				if(AccountsSetting['ratings'][1] == "-1"){
					jQ('.PersonalRatingsBlock').hide();
					jQ('#PersonalRatingsBlock').hide();
				}else if(AccountsSetting['diagrams'][1] == "0"){
					jQ('.PersonalRatingsBlock').hide();
					jQ('#PersonalRatingsBlock').show();
				}else if(AccountsSetting['diagrams'][1] == "1"){
					jQ('.PersonalRatingsBlock').show();
					jQ('#PersonalRatingsBlock').show();
				}				
				
				var js_vehicle_table = document.getElementsByClassName("js-vehicle-table")[0];	
				var tdContent = js_vehicle_table.getElementsByTagName('td');
				for(var tdI = 0; tdI < tdContent.length; tdI++){
					if(tdContent[tdI].getAttribute('class') != null){
						if(tdContent[tdI].getAttribute('class') == 'td-armory-icon'){
							var aContent = tdContent[tdI].getElementsByTagName('a')[0];
							if(find(premiumTank, aContent.innerHTML) != -1){
								aContent.setAttribute('style', 'color: #ffd28b');
							}
						}else if(tdContent[tdI].getAttribute('class') == 't-profile_right'){
							tdContent[tdI].setAttribute('style', 'color: '+getBattlesTankColor(tdContent[tdI].innerHTML.split('&nbsp;').join('')));
						}else if(tdContent[tdI].getAttribute('class') == 't-profile_center' && tdContent[tdI].innerHTML.indexOf("%") > -1){
							tdContent[tdI].setAttribute('style', 'color: '+getWinrateColor(tdContent[tdI].innerHTML.split('%').join('')));
						}
					}
				}	
				
				var index = MembersArray.length;
				MembersArray[index] = [];
				MembersArray[index]['id'] = memberId;
				MembersArray[index]['name'] = memberName;				
				
				getJson('https://api.'+host+'/'+api_version+'/account/info/?application_id='+application_id+'&language='+lang+'&account_id='+memberId+'&fields=statistics,account_id,nickname,created_at,updated_at,logout_at,last_battle_time,global_rating&index='+index+'&type=member', doneGetMemberInfo, errorGetMemberInfo);
			}catch(e){
				var error = localization['ErrorScript']+"<br /><br />"+e.stack+"<br /><br />"+localization['ErrorSendDeveloper'];
				wgsdk.error(error, undefined, undefined, {title: localization['Box']});
				wgsdk.waiting('close');
			}			
			function getAccountsSetting(){
				var AccountsSetting = [];
				var saveSetting = getLocalStorage('accountssetting', false);
				if(saveSetting == null){
					for(var i = 0; i < accountsSettingDefault.length; i++){
						var attr = accountsSettingDefault[i][0];
						var type = accountsSettingDefault[i][1];
						var value = accountsSettingDefault[i][2];
						AccountsSetting[attr] = [type.toString(), value.toString()];
					}
				}else{
					var setting = saveSetting.split(";");
					for(var i = 0; i < setting.length - 1; i++){
						var attr = setting[i].split(":")[0];
						var type = setting[i].split(":")[1];
						var value = setting[i].split(":")[2];
						AccountsSetting[attr] = [type.toString(), value.toString()];					
					}
				}
				return AccountsSetting;
			}
		}	
		function CheckVersionScript(update){
			if(update === "true"){
				var versionSource = document.getElementById("version").innerHTML;
				if(version != versionSource && versionSource != "0"){
					var value = localization['NewVersion']+" ClanInfo "+
						versionSource+".<br />"+
						localization['NewUpdate']+".";
					wgsdk.message_box(
						localization['box'], 
						value, 
						{
							confirm:{
								text: "OK", 
								click: function(){}
							}
						}
					);				
				}
			}
		}
		function UpdatePageMember(){
			jQ('.t-personal-data_pr')[0].setAttribute('rowspan', '4');
			
			var t_personal_data = document.getElementsByClassName("t-personal-data")[0];
			
			var tdContent = t_personal_data.getElementsByTagName('td');
			tdContent[0].setAttribute('style', 'color: '+getWinrateColor(MembersArray[0]['PROC_wins'+'.all'])+';');
			tdContent[1].setAttribute('style', 'color: '+getBattlesColor(MembersArray[0]['battles'+'.all'])+';');
			tdContent[2].setAttribute('style', 'color: '+getCFXP(MembersArray[0]['CF_xp'+'.all'])+';');
			tdContent[3].setAttribute('style', 'color: '+getCFDamageColor(MembersArray[0]['CF_damage_dealt'+'.all'])+';');
			
			var tbodyContent = t_personal_data.getElementsByTagName('tbody')[0];
			tbodyContent.innerHTML += ''+
				'<tr>'+
					'<th class="t-personal-data_ico t-personal-data_ico__exp">'+
						localization['kpdV']+
					'</th>'+
					'<th class="t-personal-data_ico t-personal-data_ico__exp">'+
						localization['bsV']+
					'</th>'+
					'<th class="t-personal-data_ico t-personal-data_ico__exp">'+
						localization['wn6V']+
					'</th>'+
					'<th class="t-personal-data_ico t-personal-data_ico__exp">'+
						localization['wn8V']+
					'</th>'+
				'</tr>'+
				'<tr>'+
					'<td class="t-personal-data_value">'+
						'<span style="color: '+getKpdColor(MembersArray[0]['kpd'+'.all'])+';">'+Number(MembersArray[0]['kpd'+'.all']).toFixed(0)+'</span>'+
						' <b>/</b> '+
						'<span style="color: '+getXVMColor(MembersArray[0]['xeff'+'.all'])+';">'+Number(MembersArray[0]['xeff'+'.all']).toFixed(0)+'</span>'+
					'</td>'+
					'<td class="t-personal-data_value">'+
						'<span style="color: '+getArmorColor(MembersArray[0]['bs'+'.all'])+';">'+Number(MembersArray[0]['bs'+'.all']).toFixed(0)+'</span>'+
					'</td>'+
					'<td class="t-personal-data_value">'+
						'<span style="color: '+getWn6Color(MembersArray[0]['wn6'+'.all'])+';">'+Number(MembersArray[0]['wn6'+'.all']).toFixed(0)+'</span>'+
						' <b>/</b> '+
						'<span style="color: '+getXVMColor(MembersArray[0]['xwn6'+'.all'])+';">'+Number(MembersArray[0]['xwn6'+'.all']).toFixed(0)+'</span>'+
					'</td>'+
					'<td class="t-personal-data_value">'+
						'<span style="color: '+getWn8Color(MembersArray[0]['wn8'+'.all'])+';">'+Number(MembersArray[0]['wn8'+'.all']).toFixed(0)+'</span>'+
						' <b>/</b> '+
						'<span style="color: '+getXVMColor(MembersArray[0]['xwn8'+'.all'])+';">'+Number(MembersArray[0]['xwn8'+'.all']).toFixed(0)+'</span>'+
					'</td>'+
				'</tr>'+				
			'';
			
			var h3Content = l_content.getElementsByTagName('h3');
			for(var h3I = 0; h3I < h3Content.length; h3I++){
				if(h3Content[h3I].innerHTML == 'Техника'){
					h3Content[h3I].innerHTML += ' '+
						'(Top 10lvl: <font color="'+getTopVehiclesColor(MembersArray[0]['TOPTankCount'])+'">'+
							MembersArray[0]['TOPTankCount']+
						'</font>)';
				}
			}
		}		
		function UpdateTableRecruits(){
			var user_list_table = document.getElementById("user-list-table");
			for(var r = 2; r < user_list_table.rows.length; r++){
				var row = user_list_table.rows[r];
				for(var c = 0; c < row.cells.length; c++){
					var cell = row.cells[c];
					var index = r - 2;
					if(c == 2){
						cell.innerHTML += ''+
							'<br />'+
							'<span style="color: '+getKpdColor(MembersArray[index]['kpd'+'.all'])+';">'+Number(MembersArray[index]['kpd'+'.all']).toFixed(0)+'</span>'+
							' <b style="color: #606061;">/</b> '+
							'<span style="color: '+getXVMColor(MembersArray[index]['xeff'+'.all'])+';">'+Number(MembersArray[index]['xeff'+'.all']).toFixed(0)+'</span>'+
						'';
					}else if(c == 3){
						cell.innerHTML += ''+
							'<br />'+
							'<span style="color: '+getArmorColor(MembersArray[index]['bs'+'.all'])+';">'+Number(MembersArray[index]['bs'+'.all']).toFixed(0)+'</span>'+
						'';								
					}else if(c == 4){
						cell.innerHTML += ''+
							'<br />'+
							'<span style="color: '+getWn6Color(MembersArray[index]['wn6'+'.all'])+';">'+Number(MembersArray[index]['wn6'+'.all']).toFixed(0)+'</span>'+
							' <b style="color: #606061;">/</b> '+
							'<span style="color: '+getXVMColor(MembersArray[index]['xwn6'+'.all'])+';">'+Number(MembersArray[index]['xwn6'+'.all']).toFixed(0)+'</span>'+
						'';	
					}else if(c == 5){
						cell.innerHTML += ''+
							'<br />'+
							'<span style="color: '+getWn8Color(MembersArray[index]['wn8'+'.all'])+';">'+Number(MembersArray[index]['wn8'+'.all']).toFixed(0)+'</span>'+
							' <b style="color: #606061;">/</b> '+
							'<span style="color: '+getXVMColor(MembersArray[index]['xwn8'+'.all'])+';">'+Number(MembersArray[index]['xwn8'+'.all']).toFixed(0)+'</span>'+
						'';		
					}
				}
			}
		}		
		function doneGetMemberInfo(url, response){
			if(response.status && response.status == "error"){
				errorGetMemberInfo(url);
				return;
			}		
			Process--;

			var vars = getUrlVars(url);
			var index = vars['index'];
			var type = vars['type'];
			
			var id = MembersArray[index]['id'];
			var responseArr = eval('('+JSON.stringify(response)+')');

			if(type == 'member'){
				for(memberId in response.data){
					MembersArray[index]['created_at'] = responseArr['data'][memberId]['created_at'];
					MembersArray[index]['updated_at'] = responseArr['data'][memberId]['updated_at'];
					MembersArray[index]['logout_at'] = responseArr['data'][memberId]['logout_at'];
					MembersArray[index]['last_battle_time'] = responseArr['data'][memberId]['last_battle_time'];
					
					var typeStat = ["all", "company", "clan"];
					
					for(var t = 0; t < typeStat.length; t++){
						MembersArray[index]['spotted'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['spotted'];
						MembersArray[index]['hits'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['hits'];
						MembersArray[index]['battle_avg_xp'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['battle_avg_xp'];
						MembersArray[index]['draws'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['draws'];
						MembersArray[index]['wins'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['wins'];
						MembersArray[index]['losses'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['losses'];
						MembersArray[index]['capture_points'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['capture_points'];
						MembersArray[index]['battles'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['battles'];
						MembersArray[index]['damage_dealt'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['damage_dealt'];
						MembersArray[index]['hits_percents'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['hits_percents'];
						MembersArray[index]['damage_received'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['damage_received'];
						MembersArray[index]['shots'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['shots'];
						MembersArray[index]['xp'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['xp'];
						MembersArray[index]['frags'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['frags'];
						MembersArray[index]['survived_battles'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['survived_battles'];
						MembersArray[index]['dropped_capture_points'+'.'+typeStat[t]] = responseArr['data'][memberId]['statistics'][typeStat[t]]['dropped_capture_points'];						
					}
					
					MembersArray[index]['max_xp'] = responseArr['data'][memberId]['statistics']['max_xp'];
					MembersArray[index]['global_rating'] = responseArr['data'][memberId]['global_rating'];
				}
				getJson('https://api.'+host+'/'+api_version+'/tanks/stats/?application_id='+application_id+'&account_id='+id+'&index='+index+'&type=tanks', doneGetMemberInfo, errorGetMemberInfo);
			}else if(type == 'tanks'){						
				MembersArray[index]['average_tank'] = 0;
				
				MembersArray[index]['expFrag'+'.all'] = 0;
				MembersArray[index]['expDamage'+'.all'] = 0;
				MembersArray[index]['expSpot'+'.all'] = 0;
				MembersArray[index]['expDef'+'.all'] = 0;
				MembersArray[index]['expWinRate'+'.all'] = 0;					
				
				if(Encyclopedia != null){
					for(memberId in responseArr['data']){
						var TOPTankCount = 0;
						var BattleLevelArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
						if(responseArr['data'][memberId] == null){continue;}
						
						for(var i = 0; i < responseArr['data'][memberId].length; i++){
							var tankStat = responseArr['data'][memberId][i];
							var tank = Encyclopedia['data'][tankStat['tank_id']];
							
							var tankAllBattles = tankStat['all']['battles'];
							var tankAllWins = tankStat['all']['wins'];
							
							if(ExpTanks[tankStat['tank_id']] != undefined){							
								MembersArray[index]['expFrag'+'.all'] += tankAllBattles * ExpTanks[tankStat['tank_id']]['expFrag'];
								MembersArray[index]['expDamage'+'.all'] += tankAllBattles * ExpTanks[tankStat['tank_id']]['expDamage'];
								MembersArray[index]['expSpot'+'.all'] += tankAllBattles * ExpTanks[tankStat['tank_id']]['expSpot'];
								MembersArray[index]['expDef'+'.all'] += tankAllBattles * ExpTanks[tankStat['tank_id']]['expDef'];
								MembersArray[index]['expWinRate'+'.all'] += tankAllBattles * (ExpTanks[tankStat['tank_id']]['expWinRate']/100);
							}

							BattleLevelArray[tank['level']] += parseInt(tankAllBattles);
							
							if(tank['level'] == 10 && tankStat['in_garage'] == 1){
								TOPTankCount++;
							}
						}
						var battles = MembersArray[index]['battles'+'.all'];
						MembersArray[index]['average_tank'] = (1*BattleLevelArray[1]/battles)+(2*BattleLevelArray[2]/battles)+(3*BattleLevelArray[3]/battles)
							+(4*BattleLevelArray[4]/battles)+(5*BattleLevelArray[5]/battles)+(6*BattleLevelArray[6]/battles)+(7*BattleLevelArray[7]/battles)
							+(8*BattleLevelArray[8]/battles)+(9*BattleLevelArray[9]/battles)+(10*BattleLevelArray[10]/battles);
						MembersArray[index]['TOPTankCount'] = TOPTankCount;
					}

					if((MembersArray.length - 1) == index){
						Complete();
					}
				}else{
					loadEncyclopediaTime++;
					if(loadEncyclopediaTime < 5){
						setTimeout(function(){doneGetMemberInfo(url, response)}, 1000);
					}else{
						errorGetMemberInfo(url);
					}
				}
			}
		}				
		function errorGetMemberInfo(url){
			Process--;
			
			var vars = getUrlVars(url);
			var index = vars['index'];
			var type = vars['type'];

			if(type == 'member'){					
				MembersArray[index]['created_at'] = 0;
				MembersArray[index]['updated_at'] = 0;
				MembersArray[index]['logout_at'] = 0;
				MembersArray[index]['last_battle_time'] = 0;
				
				var typeStat = ["all", "company", "clan"];
				
				for(var t = 0; t < typeStat.length; t++){
					MembersArray[index]['spotted'+'.'+typeStat[t]] = 0;
					MembersArray[index]['hits'+'.'+typeStat[t]] = 0;
					MembersArray[index]['battle_avg_xp'+'.'+typeStat[t]] = 0;
					MembersArray[index]['draws'+'.'+typeStat[t]] = 0;
					MembersArray[index]['wins'+'.'+typeStat[t]] = 0;
					MembersArray[index]['losses'+'.'+typeStat[t]] = 0;
					MembersArray[index]['capture_points'+'.'+typeStat[t]] = 0;
					MembersArray[index]['battles'+'.'+typeStat[t]] = 0;
					MembersArray[index]['damage_dealt'+'.'+typeStat[t]] = 0;
					MembersArray[index]['hits_percents'+'.'+typeStat[t]] = 0;
					MembersArray[index]['damage_received'+'.'+typeStat[t]] = 0;
					MembersArray[index]['shots'+'.'+typeStat[t]] = 0;
					MembersArray[index]['xp'+'.'+typeStat[t]] = 0;
					MembersArray[index]['frags'+'.'+typeStat[t]] = 0;
					MembersArray[index]['survived_battles'+'.'+typeStat[t]] = 0;
					MembersArray[index]['dropped_capture_points'+'.'+typeStat[t]] = 0;						
				}
				
				MembersArray[index]['max_xp'] = 0;
				MembersArray[index]['global_rating'] = 0;
			}else if(type == 'tanks'){					
				MembersArray[index]['expFrag'+'.all'] = 0;
				MembersArray[index]['expDamage'+'.all'] = 0;
				MembersArray[index]['expSpot'+'.all'] = 0;
				MembersArray[index]['expDef'+'.all'] = 0;
				MembersArray[index]['expWinRate'+'.all'] = 0;					
				
				MembersArray[index]['average_tank'] = 0;
				MembersArray[index]['TOPTankCount'] = 0;
				
				if((MembersArray.length - 1) == index){
					Complete();
				}
			}					
		}				
		function Complete(){
			Calculations();
			
			if(window.location.href.indexOf("recruitstation") > -1){
				UpdateTableRecruits();
			}else if(window.location.href.indexOf("accounts") > -1 && (window.location.href.indexOf("community") > -1 || window.location.href.indexOf("/uc/") > -1)){
				UpdatePageMember();
			}
			
			wgsdk.waiting('close');				
		}				
		function Calculations(){
			for(index in MembersArray){
				if(Encyclopedia == null){
					MembersArray[index]['PROC_wins'+'.all'] = 0;
					MembersArray[index]['PROC_losses'+'.all'] = 0;
					MembersArray[index]['PROC_draws'+'.all'] = 0;
					MembersArray[index]['PROC_survived_battles'+'.all'] = 0;
					MembersArray[index]['PROC_hits'+'.all'] = 0;
					MembersArray[index]['CF_xp'+'.all'] = 0;
					MembersArray[index]['CF_frags'+'.all'] = 0;
					MembersArray[index]['CF_spotted'+'.all'] = 0;
					MembersArray[index]['CF_shots'+'.all'] = 0;
					MembersArray[index]['CF_damage_dealt'+'.all'] = 0;
					MembersArray[index]['CF_damage_received'+'.all'] = 0;
					MembersArray[index]['CF_capture_points'+'.all'] = 0;
					MembersArray[index]['CF_dropped_capture_points'+'.all'] = 0;				
				
					MembersArray[index]['kpd'+'.all'] = 0;
					MembersArray[index]['xeff'+'.all'] = 0;
					MembersArray[index]['wn6'+'.all'] = 0;	
					MembersArray[index]['xwn6'+'.all'] = 0;					
					MembersArray[index]['wn8'+'.all'] = 0;
					MembersArray[index]['xwn8'+'.all'] = 0;
				}else{
					MembersArray[index]['PROC_wins'+'.all'] = Number(MembersArray[index]['wins'+'.all'] * 100 / MembersArray[index]['battles'+'.all']).toFixed(2);
					MembersArray[index]['PROC_losses'+'.all'] = Number(MembersArray[index]['losses'+'.all'] * 100 / MembersArray[index]['battles'+'.all']).toFixed(2);
					MembersArray[index]['PROC_draws'+'.all'] = Number(MembersArray[index]['draws'+'.all'] * 100 / MembersArray[index]['battles'+'.all']).toFixed(2);
					MembersArray[index]['PROC_survived_battles'+'.all'] = Number(MembersArray[index]['survived_battles'+'.all'] * 100 / MembersArray[index]['battles'+'.all']).toFixed(2);
					MembersArray[index]['PROC_hits'+'.all'] = MembersArray[index]['hits_percents'+'.all'];
					MembersArray[index]['CF_xp'+'.all'] = MembersArray[index]['battle_avg_xp'+'.all'];
					MembersArray[index]['CF_frags'+'.all'] = Number(MembersArray[index]['frags'+'.all'] / MembersArray[index]['battles'+'.all']).toFixed(2);
					MembersArray[index]['CF_spotted'+'.all'] = Number(MembersArray[index]['spotted'+'.all'] / MembersArray[index]['battles'+'.all']).toFixed(2);
					MembersArray[index]['CF_shots'+'.all'] = Number(MembersArray[index]['shots'+'.all'] / MembersArray[index]['battles'+'.all']).toFixed(2);
					MembersArray[index]['CF_damage_dealt'+'.all'] = Number(MembersArray[index]['damage_dealt'+'.all']/MembersArray[index]['battles'+'.all']).toFixed(0);
					MembersArray[index]['CF_damage_received'+'.all'] = Number(MembersArray[index]['damage_received'+'.all']/MembersArray[index]['battles'+'.all']).toFixed(0);
					MembersArray[index]['CF_capture_points'+'.all'] = Number(MembersArray[index]['capture_points'+'.all']/MembersArray[index]['battles'+'.all']).toFixed(2);
					MembersArray[index]['CF_dropped_capture_points'+'.all'] = Number(MembersArray[index]['dropped_capture_points'+'.all']/MembersArray[index]['battles'+'.all']).toFixed(2);					
					
					if(isNaN(MembersArray[index]['PROC_wins'+'.all'])){MembersArray[index]['PROC_wins'+'.all'] = 0;}
					if(isNaN(MembersArray[index]['PROC_losses'+'.all'])){MembersArray[index]['PROC_losses'+'.all'] = 0;}
					if(isNaN(MembersArray[index]['PROC_draws'+'.all'])){MembersArray[index]['PROC_draws'+'.all'] = 0;}
					if(isNaN(MembersArray[index]['PROC_survived_battles'+'.all'])){MembersArray[index]['PROC_survived_battles'+'.all'] = 0;}
					if(isNaN(MembersArray[index]['PROC_hits'+'.all'])){MembersArray[index]['PROC_hits'+'.all'] = 0;}
					if(isNaN(MembersArray[index]['CF_xp'+'.all'])){MembersArray[index]['CF_xp'+'.all'] = 0;}
					if(isNaN(MembersArray[index]['CF_frags'+'.all'])){MembersArray[index]['CF_frags'+'.all'] = 0;}
					if(isNaN(MembersArray[index]['CF_spotted'+'.all'])){MembersArray[index]['CF_spotted'+'.all'] = 0;}
					if(isNaN(MembersArray[index]['CF_shots'+'.all'])){MembersArray[index]['CF_shots'+'.all'] = 0;}
					if(isNaN(MembersArray[index]['CF_damage_dealt'+'.all'])){MembersArray[index]['CF_damage_dealt'+'.all'] = 0;}
					if(isNaN(MembersArray[index]['CF_damage_received'+'.all'])){MembersArray[index]['CF_damage_received'+'.all'] = 0;}
					if(isNaN(MembersArray[index]['CF_capture_points'+'.all'])){MembersArray[index]['CF_capture_points'+'.all'] = 0;}
					if(isNaN(MembersArray[index]['CF_dropped_capture_points'+'.all'])){MembersArray[index]['CF_dropped_capture_points'+'.all'] = 0;}				
				
					var btl = MembersArray[index]['battles'+'.all'];
					var dmg = MembersArray[index]['damage_dealt'+'.all']/btl;
					var winrate = 100/(btl/MembersArray[index]['wins'+'.all']);
					var des = MembersArray[index]['frags'+'.all']/btl;
					var det = MembersArray[index]['spotted'+'.all']/btl;
					var cap = MembersArray[index]['capture_points'+'.all']/btl;
					var def = MembersArray[index]['dropped_capture_points'+'.all']/btl;
					var cf_xp = MembersArray[index]['xp'+'.all']/btl;
					var wins = MembersArray[index]['wins'+'.all']/btl;
					var mid = MembersArray[index]['average_tank'];

					var kpd = (dmg*(10/(mid+2))*(0.23 + 2*mid/100))+(des*250)+(det*150)+(Math.logb(cap+1,1.732)*150)+(def*150);
					var txtKpd = kpd; if(isNaN(Number(kpd).toFixed(0))){txtKpd = 0;}
					MembersArray[index]['kpd'+'.all'] = txtKpd;
					
					var xeff = 0;
					if(txtKpd < 420){
						xeff = 0;
					}else{
						xeff = Math.max(Math.min(txtKpd*(txtKpd*(txtKpd*(txtKpd*(txtKpd*(0.000000000000000045254*txtKpd - 0.00000000000033131) + 0.00000000094164) - 0.0000013227) + 0.00095664) - 0.2598) + 13.23, 100), 0);
					}
					var txtXeff = xeff; if(isNaN(Number(xeff).toFixed(0))){txtXeff = 0;}
					MembersArray[index]['xeff'+'.all'] = txtXeff;
					
					var wn6 = (1240-1040/Math.pow(Math.min(mid, 6),0.164))*des+dmg*530/(184*Math.exp(0.24*mid)+130)+det*125+Math.min(def,2.2)*100+((185/(0.17+Math.exp((winrate-35)*-0.134)))-500)*0.45+(6-Math.min(mid,6))*-60;
					var txtWn6 = wn6; if(isNaN(Number(wn6).toFixed(0))){txtWn6 = 0;}
					MembersArray[index]['wn6'+'.all'] = txtWn6;	

					var xwn6 = 0;
					if(wn6 > 2160){
						xwn6 = 100;
					}else{
						xwn6 = Math.max(Math.min(txtWn6*(txtWn6*(txtWn6*(-0.00000000001268*txtWn6 + 0.00000005147) - 0.00006418) + 0.07576) - 7.25, 100), 0);
					}
					var txtXwn6 = xwn6; if(isNaN(Number(xwn6).toFixed(0))){txtXwn6 = 0;}					
					MembersArray[index]['xwn6'+'.all'] = txtXwn6;					

					var rDAMAGE = MembersArray[index]['damage_dealt'+'.all'] / MembersArray[index]['expDamage'+'.all'];
					var rSPOT = MembersArray[index]['spotted'+'.all'] / MembersArray[index]['expSpot'+'.all'];
					var rFRAG = MembersArray[index]['frags'+'.all'] / MembersArray[index]['expFrag'+'.all'];
					var rDEF = MembersArray[index]['dropped_capture_points'+'.all'] / MembersArray[index]['expDef'+'.all'];
					var rWIN = MembersArray[index]['wins'+'.all'] / MembersArray[index]['expWinRate'+'.all'];
					var rWINc = Math.max(0, (rWIN - 0.71) / (1 - 0.71));
					var rDAMAGEc = Math.max(0, (rDAMAGE - 0.22) / (1 - 0.22));
					var rFRAGc = Math.max(0, Math.min(rDAMAGEc + 0.2, (rFRAG - 0.12) / (1 - 0.12)));
					var rSPOTc = Math.max(0, Math.min(rDAMAGEc + 0.1, (rSPOT - 0.38) / (1 - 0.38)));
					var rDEFc = Math.max(0, Math.min(rDAMAGEc + 0.1, (rDEF  - 0.10) / (1 - 0.10)));
					
					var wn8 = 980*rDAMAGEc + 210*rDAMAGEc*rFRAGc + 155*rFRAGc*rSPOTc + 75*rDEFc*rFRAGc + 145*Math.min(1.8,rWINc);
					var txtWn8 = wn8; if(isNaN(Number(wn8).toFixed(0))){txtWn8 = 0;}
					MembersArray[index]['wn8'+'.all'] = txtWn8;	
					
					var xwn8 = 0;
					if(wn8 > 3250){
						xwn8 = 100;
					}else{
						xwn8 = Math.round(Math.max(0, Math.min(100, txtWn8*(txtWn8*(txtWn8*(txtWn8*(txtWn8*(txtWn8*0.00000000000000000007119 + 0.0000000000000002334) - 0.000000000006963) + 0.00000002845) - 0.00004558) + 0.06565) - 0.18)));
					}
					var txtXwn8 = xwn8; if(isNaN(Number(xwn8).toFixed(0))){txtXwn8 = 0;}
					MembersArray[index]['xwn8'+'.all'] = txtXwn8;					
				}
				var bs = Math.log(btl)/10*(cf_xp*1+dmg*(wins*2.0+des*0.9+det*0.5+cap*0.5+def* 0.5));
				var txtBs = bs; if(isNaN(Number(bs).toFixed(0))){txtBs = 0;}
				MembersArray[index]['bs'+'.all'] = txtBs;						
			}
		}		
		function doneHistoryClans(url, response){	
			if(response == null || (response.status && response.status == "error")){
				errorHistoryClans(url);
				return;
			}		
			Process--;
			
			var oldClanId = 0;
			var lastClanArray = [];
			var responseArr = eval('('+JSON.stringify(response)+')');
			
			var html = ''+
				'<table class="t-profile">'+
			'';

			var startJoin;
			
			for(var i = (responseArr['rows'].length - 1); i >= 0; i--){
				var clanId = responseArr['rows'][i]['id'];
				var clanName = responseArr['rows'][i]['cell'][0];
				var clanRole = responseArr['rows'][i]['cell'][1];
				var startJoin = dateParse(responseArr['rows'][i]['cell'][2]);
				var endJoin = dateParse(responseArr['rows'][i]['cell'][3]);
				
				var ClanTag = (clanName.split(' '))[0];
				
				if(oldClanId != clanId){
					oldClanId = clanId;
					
					var clanJoin = startJoin;
					var clanLeave = endJoin;
					
					var j = i;
					while(clanId == responseArr['rows'][j]['id']){
						clanLeave = dateParse(responseArr['rows'][j]['cell'][3]);
						if(j == 0){break;}
						j--;
					}
					
					if(oldClanId != 0){
						html += ''+
							'<tr><td align="center" valign="center" style="padding: 4px;"> </td></tr>'+
						'';
					}
					
					html += ''+
						'<tr>'+
							'<td align="center" valign="center" style="padding: 0px;">'+
								'<img src="http://clans.worldoftanks.ru/media/clans/emblems/clans_'+clanId.charAt(0)+'/'+clanId+'/emblem_24x24.png" width="16" height="16">'+
							'</td>'+
							'<td align="center" valign="center" style="padding: 0px;">'+
								'<a href="http://worldoftanks.ru/community/clans/'+clanId+'-'+ClanTag+'/" target="_blank" style="color: #F25322;">'+ClanTag+'</a>'+
							'</td>'+	
							'<td align="center" valign="center" style="padding: 0px;">'+
								clanJoin+' - '+clanLeave+
							'</td>'+
							'<td align="center" valign="center" style="padding: 0px;">'+
								clanRole+
							'</td>'+
							'<td align="center" valign="center" style="padding: 0px;">'+
								dateDiffInDays(responseArr['rows'][i]['cell'][2], responseArr['rows'][i]['cell'][3])+
								' '+localization['dayV']+
							'</td>'+									
						'</tr>'+
					'';
				}else{
					html += ''+
						'<tr>'+
							'<td colspan="3" align="center" valign="center" style="padding: 0px;">'+
								' '+
							'</td>'+
							'<td align="center" valign="center" style="padding: 0px;">'+
								clanRole+
							'</td>'+
							'<td align="center" valign="center" style="padding: 0px;">'+
								dateDiffInDays(responseArr['rows'][i]['cell'][2], responseArr['rows'][i]['cell'][3])+
								' '+localization['dayV']+
							'</td>'+									
						'</tr>'+
					'';							
				}
			}
			
			html += ''+
				'</table>'+
			'';
			
			var member_dialog_title = document.getElementsByClassName("last-clan-dialog-title")[0];
			var member_dialog_content = document.getElementsByClassName("last-clan-dialog-content")[0];
			
			member_dialog_title.innerHTML = localization['LastClanPlayer'];					
			
			member_dialog_content.innerHTML = html;
			
			document.getElementsByClassName("last-clan-dialog")[0].style.top = (window.scrollY+50)+'px';
			document.getElementsByClassName("last-clan-info")[0].style.display = 'inline';			
		
			wgsdk.waiting('close');
			
			jQ("#CloseDialogLastClans").click(function(){
				document.getElementsByClassName("last-clan-info")[0].style.display = 'none';
			});					
		}
		function errorHistoryClans(url){
			Process--;
			
			wgsdk.waiting('close');
			wgsdk.message_box(
				localization['Box'], 
				localization['ErrorMemberInfo'], 
				{
					confirm:{
						text: "OK", 
						click: function(){}
					}
				}
			);					
		}		
		function dateParse(date){
			if(date == null){
				return 'н.в.';
			}
			var dateArray = date.split('-');
			return dateArray[2]+'.'+dateArray[1]+'.'+dateArray[0];
		}
		function dateDiffInDays(a, b){
			var date1 = new Date(a);
			var date2 = new Date(b);
			if(b == null){
				date2 = new Date();
			}
			var timeDiff = date2.getTime() - date1.getTime(); 
			var diffDays = timeDiff / (1000 * 3600 * 24); 
			return (diffDays).toFixed(0);
		}		
		function getDeveloper(){
			var html = ''+
				'<div class="link">'+
					'<span id="scriptclainfo" class="link hide">'+
						'UserScript ClanInfo '+version+
					'</span>'+
					getButtonSetting()+
				'</div>'+
				'<div class="b-user-block b-speedometer-wrpr scriptclainfo">'+
					'<span class="developer" align="center">'+
						localization['Developer']+
						' <a class="name" href="http://worldoftanks.ru/community/accounts/635939-Vov_chiK/">Vov_chiK</a> '+
						localization['Alliance']+
						' <a class="url" href="http://worldoftanks.ru/community/clans/#wot&ct_search=Walkure">Walkure</a> '+
						'<br /><br />'+
						localization['Topic']+' '+
						'<a id="redirect_link" target="_blank" href="'+link+'">'+
							link_name+
						'</a>'+	
						'<br /><br />'+
						'<font style="font-size: 16px; color: #658C4C;">'+localization['SupportScript']+':</font><br />'+
						'<font style="color: #2CA8C7;">Web-Money WMR</font> R295712009837'+'<br />'+
						'<font style="color: #2CA8C7;">Web-Money WMZ</font> Z226959724402'+'<br />'+						
						'<font style="color: #2CA8C7;">Yandex Money</font> 41001290117791'+'<br />'+						
						'<font style="color: #2CA8C7;">RBK Money</font> RU353257918'+'<br />'+
					'</span>'+
				'</div>'+			
			'';
			return html;
		}
		function getButtonSetting(){
			var html = ''+
				'<span class="SettingScript" style="padding-left: 10px;">'+
					'<div class="b-big-orange-buttonarea b-big-orange-tab">'+
						'<span style="height: 26px;" class="b-big-orange-button">'+
							'<span style="height: 26px;" class="b-big-orange-button_right b-button-wrap">'+
								'<input id="SettingScript" type="submit" style="padding: 2px 5px 0px; height: 26px;" value="'+localization['Setting']+'">'+
							'</span>'+
						'</span>'+
					'</div>'+
				'</span>'+			
			'';
			if(window.location.href.indexOf("clans") > -1 && (window.location.href.indexOf("community") > -1 || window.location.href.indexOf("/uc/") > -1)){
				return html;
			}else if(window.location.href.indexOf("accounts") > -1 && (window.location.href.indexOf("community") > -1 || window.location.href.indexOf("/uc/") > -1)){
				return '';
			}else if(window.location.href.indexOf("recruitstation") > -1){
				return '';
			}			
		}
		function onView(element){
			if(null != element.getAttribute('id')){
				var id = element.getAttribute('id');
				var classView = element.getAttribute('class');
				if(classView == 'link hide'){
					element.setAttribute('class', 'link show');
					document.getElementsByClassName(id)[0].style.display = 'block';
					setLocalStorage(id, 'show', false);
				}else{
					element.setAttribute('class', 'link hide');
					document.getElementsByClassName(id)[0].style.display = 'none';	
					setLocalStorage(id, 'hide', false);
				}
			}		
		}
		function checkLocalStorage(){
			try{
				return 'localStorage' in window && window['localStorage'] !== null;
			}catch (e){
				return false;
			}
		}		
		function setLocalStorage(key, value, allPageHost){
			if(checkLocalStorage()){
				if(allPageHost){key = key+clanId;}
				window.localStorage.setItem(key, value);
			}else{
				setCookie(key, value, allPageHost);
			}
		}
		function getLocalStorage(key, allPageHost){
			var value = null;
			if(checkLocalStorage()){
				if(allPageHost){key = key+clanId;}
				value = window.localStorage.getItem(key);
			}else{
				value = getCookie(key);
			}
			return value;			
		}			
		function getKpdColor(kpd){
			if (isNaN(kpd)) return "#FE0E00";
			if (kpd <= 609) return "#FE0E00";
			if (kpd <= 849) return "#FE7903";
			if (kpd <= 1144) return "#F8F400";
			if (kpd <= 1474) return "#60FF00";
			if (kpd <= 1774) return "#02C9B3";
			if (kpd <= 9999) return "#D042F3";	
		}	
		function getWn8Color(wn8){
			if (isNaN(wn8)) return "#FE0E00";
			if (wn8 <= 309) return "#FE0E00";
			if (wn8 <= 749) return "#FE7903";
			if (wn8 <= 1309) return "#F8F400";
			if (wn8 <= 1964) return "#60FF00";
			if (wn8 <= 2539) return "#02C9B3";
			if (wn8 <= 9999) return "#D042F3";	
		}
		function getXVMColor(xvm){
			if (isNaN(xvm)) return "#FE0E00";
			if (xvm <= 16) return "#FE0E00";
			if (xvm <= 33) return "#FE7903";
			if (xvm <= 52) return "#F8F400";
			if (xvm <= 75) return "#60FF00";
			if (xvm <= 92) return "#02C9B3";
			if (xvm <= 101) return "#D042F3";
		}		
		function getWinrateColor(avg){
			if (isNaN(avg)) return "#FE0E00";
			if (avg <= 46) return "#FE0E00";
			if (avg <= 48) return "#FE7903";
			if (avg <= 51) return "#F8F400";
			if (avg <= 56) return "#60FF00";
			if (avg <= 64) return "#02C9B3";
			if (avg <= 101)	return "#D042F3";
		}
		function getWn6Color(wn6){
			if (isNaN(wn6)) return "#FE0E00";
			if (wn6 <= 409) return "#FE0E00";
			if (wn6 <= 794) return "#FE7903";
			if (wn6 <= 1184) return "#F8F400";
			if (wn6 <= 1584) return "#60FF00";
			if (wn6 <= 1924) return "#02C9B3";
			if (wn6 <= 9999) return "#D042F3";	
		}
		function getArmorColor(armor){
			if (isNaN(armor)) return "#FE0E00";
			if (armor <= 1800) return "#FE0E00";
			if (armor <= 3400) return "#FE7903";
			if (armor <= 5000) return "#F8F400";
			if (armor <= 6600) return "#60FF00";
			if (armor <= 8200) return "#02C9B3";
			if (armor <= 99999) return "#D042F3";				
		}
		function getBattlesColor(battles){
			battles = battles / 1000;
			if (isNaN(battles)) return "#FE0E00";
			if (battles <= 2) return "#FE0E00";
			if (battles <= 5) return "#FE7903";
			if (battles <= 9) return "#F8F400";
			if (battles <= 14) return "#60FF00";
			if (battles <= 20) return "#02C9B3";
			if (battles <= 999) return "#D042F3";
		}
		function getBattlesTankColor(battles){
			if (isNaN(battles)) return "#FE0E00";
			if (battles <= 100) return "#FE0E00";
			if (battles <= 250) return "#FE7903";
			if (battles <= 500) return "#F8F400";
			if (battles <= 1000) return "#60FF00";
			if (battles <= 1800) return "#02C9B3";
			if (battles <= 99999) return "#D042F3";
		}		
		function getCFDamageColor(cfdamage){
			if (isNaN(cfdamage)) return "#FE0E00";
			if (cfdamage <= 800) return "#FE0E00";
			if (cfdamage <= 1000) return "#FE7903";
			if (cfdamage <= 1200) return "#F8F400";
			if (cfdamage <= 1350) return "#60FF00";
			if (cfdamage <= 1500) return "#02C9B3";
			if (cfdamage <= 9999) return "#D042F3";
		}
		function getCFXP(cfxp){
			if (isNaN(cfxp)) return "#FE0E00";
			if (cfxp <= 400) return "#FE0E00";
			if (cfxp <= 460) return "#FE7903";
			if (cfxp <= 550) return "#F8F400";
			if (cfxp <= 640) return "#60FF00";
			if (cfxp <= 730) return "#02C9B3";
			if (cfxp <= 9999) return "#D042F3";
		}
		function getMaxXP(maxxp){
			if (isNaN(maxxp)) return "#FE0E00";
			if (maxxp <= 1400) return "#FE0E00";
			if (maxxp <= 1800) return "#FE7903";
			if (maxxp <= 2200) return "#F8F400";
			if (maxxp <= 2600) return "#60FF00";
			if (maxxp <= 3000) return "#02C9B3";
			if (maxxp <= 9999) return "#D042F3";
		}
		function getHitsColor(hits){
			if (isNaN(hits)) return "#FE0E00";
			if (hits <= 49) return "#FE0E00";
			if (hits <= 54) return "#FE7903";
			if (hits <= 60) return "#F8F400";
			if (hits <= 68) return "#60FF00";
			if (hits <= 77) return "#02C9B3";
			if (hits <= 101) return "#D042F3";
		}
		function getPROCSurvivedColor(procsurvived){
			if (isNaN(procsurvived)) return "#FE0E00";
			if (procsurvived <= 20) return "#FE0E00";
			if (procsurvived <= 24) return "#FE7903";
			if (procsurvived <= 28) return "#F8F400";
			if (procsurvived <= 34) return "#60FF00";
			if (procsurvived <= 42) return "#02C9B3";
			if (procsurvived <= 101) return "#D042F3";
		}		
		function getCFColor(cf){
			if (isNaN(cf)) return "#FE0E00";
			if (cf <= 0.9) return "#FE0E00";
			if (cf <= 1) return "#FE7903";
			if (cf <= 1.1) return "#F8F400";
			if (cf <= 1.2) return "#60FF00";
			if (cf <= 1.3) return "#02C9B3";
			if (cf <= 15) return "#D042F3";
		}
		function getTopVehiclesColor(topvehicles){
			if (isNaN(topvehicles)) return "#FE0E00";
			if (topvehicles <= 3) return "#FE0E00";
			if (topvehicles <= 6) return "#FE7903";
			if (topvehicles <= 8) return "#F8F400";
			if (topvehicles <= 10) return "#60FF00";
			if (topvehicles <= 12) return "#02C9B3";
			if (topvehicles <= 999) return "#D042F3";
		}		
		Math.logb = function(number, base){return Math.log(number)/Math.log(base);};		
		function getUrlVars(url){
			var vars = {};
			var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value){
				vars[key] = value;
			});
			return vars;
		}		
		var error_encyclopedia = false;
		function doneEncyclopedia(url, response){
			if(response.status && response.status == "error"){
				errorEncyclopedia();
				return;
			}	
			Process--;
			
			Encyclopedia = eval('('+JSON.stringify(response)+')');
		}		
		function errorEncyclopedia(){
			Process--;
			error_encyclopedia = true;			
		}			
		function getJson(url, onDone, onError){
			if(MaxProcess > Process){
				Process++;
				jQ.getJSON(url).done(function(result){
					onDone(url, result);
				}).fail(function(jqxhr, textStatus, error){
					onError(url);
				});
			}else{
				setTimeout(function(){getJson(url, onDone, onError);}, 1000);
			}
		}		
		function setCookie(c_name, value, allPageHost){
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + 365);
			if(allPageHost){
				var c_value = escape(value) + ((365 == null) ? "" : "; expires="+exdate.toUTCString()+"; domain=" +window.location.hostname+"; path=/");
				document.cookie = c_name + "=" + c_value;
			}else{
				var c_value = escape(value) + ((365 == null) ? "" : "; expires="+exdate.toUTCString());
				document.cookie = c_name + "=" + c_value;
			}
		}		
		function getCookie(c_name){
			var c_value = document.cookie;
			var c_start = c_value.indexOf(" " + c_name + "=");
			if(c_start == -1){
				c_start = c_value.indexOf(c_name + "=");
			}
			if(c_start == -1){
				c_value = null;
			}else{
				c_start = c_value.indexOf("=", c_start) + 1;
				var c_end = c_value.indexOf(";", c_start);
				if(c_end == -1){
					c_end = c_value.length;
				}
				c_value = unescape(c_value.substring(c_start,c_end));
			}
			return c_value;
		}	
		function breakNumer(numer){
			if(numer === undefined){numer = '0';}else{numer = numer.toString();}
			var newnumer = '';
			var symbol = 0;
			for(var i = numer.length; i > 0; i--){
				if(symbol < 3){
					newnumer = numer[i-1]+newnumer;
					symbol++;
				}else{
					newnumer = numer[i-1]+' '+newnumer;
					symbol = 1;
				}
			}
			return newnumer;
		}		
		function find(array, value){
			for(var i=0; i < array.length; i++){
				if (array[i] == value) return i;
			}
			return -1;
		}			
		function getLocalization(lang){
			var localization = [];
			
			{/* Русский */
				localization['ru'] = [];

				localization['ru']['Box'] = 'Оповещение';
				localization['ru']['ErrorScript'] = 'Во время работы UserScript ClanInfo '+version+', возникла ошибка:';
				localization['ru']['ErrorSendDeveloper'] = 'Сообщите об ошибке разработчику скрипта.';	

				localization['ru']['Setting'] = 'Настройка';
				localization['ru']['Developer'] = 'Разработчик UserScript ClanInfo:';
				localization['ru']['Alliance'] = 'член альянса';
				localization['ru']['Topic'] = 'Тема на форуме:';
				localization['ru']['Information'] = 'Показать дополнительную информацию';
				localization['ru']['SupportScript'] = 'Поддержать автора скрипта';
				localization['ru']['DefaultSetting'] = 'Настройки по умолчанию';
				localization['ru']['ClearLocalStorage'] = 'Очистить локальное хранилище';
				localization['ru']['StartInfo'] = 'Доп. Информация';
				
				localization['ru']['update'] = 'Сообщать об обновление';
				localization['ru']['onload'] = 'Отображать стандартную страницу профиля';
				localization['ru']['personal'] = 'Блок "Личных данных"';
				localization['ru']['speedometer'] = 'Блок "Cпидометров"';
				localization['ru']['achievements'] = 'Блок "Достижений"';
				localization['ru']['statistic'] = 'Блок "Статистики"';
				localization['ru']['diagrams'] = 'Блок "Диаграмм"';
				localization['ru']['ratings'] = 'Блок "Рейтингов"';					
				localization['ru']['NoView'] = 'не отображать';					
				localization['ru']['HideView'] = 'свернуть';					
				localization['ru']['ShowView'] = 'развернуть';					
				
				localization['ru']['Ok'] = 'Ok';
				localization['ru']['Cancel'] = 'Отмена';
				
				localization['ru']['ViewTable'] = 'Отображать в таблице';
				localization['ru']['dafaultSetting'] = 'Остальные настройки';
				localization['ru']['StructureTable'] = 'Порядок столбцов в таблице';
				
				localization['ru']['role'] = 'Должность';
				localization['ru']['since'] = 'Дата вступления';
				localization['ru']['day'] = 'Дней в клане';
				localization['ru']['logout_at'] = 'Дата LogOut';
				localization['ru']['last_battle_time'] = 'Дата последнего боя';				
				localization['ru']['company'] = 'Рота';
				localization['ru']['battles'] = 'Проведено боёв';
				localization['ru']['wins'] = 'Побед';
				localization['ru']['losses'] = 'Поражений';
				localization['ru']['draws'] = 'Ничьих';
				localization['ru']['survived_battles'] = 'Выжил в боях';
				localization['ru']['xp'] = 'Опыт';
				localization['ru']['max_xp'] = 'Максимальный опыт';
				localization['ru']['frags'] = 'Уничтожено';
				localization['ru']['spotted'] = 'Обнаружено';
				localization['ru']['shots'] = 'Выстрелов';
				localization['ru']['hits'] = 'Попаданий';
				localization['ru']['damage_dealt'] = 'Нанесённые повреждения';
				localization['ru']['damage_received'] = 'Дамага получено';
				localization['ru']['capture_points'] = 'Очки захвата базы';
				localization['ru']['dropped_capture_points'] = 'Oчки защиты базы';
				localization['ru']['glory_points'] = 'Очки славы';
				localization['ru']['glory_position'] = 'Позиция в Аллее славы';
				localization['ru']['global_rating'] = 'Личный рейтинг WG';				
				localization['ru']['kpd'] = 'Рейтинг Эффективности';
				localization['ru']['wn6'] = 'WN6';
				localization['ru']['wn7'] = 'WN7';
				localization['ru']['wn8'] = 'WN8';
				localization['ru']['bs'] = 'Рейтинг броне сайта';
				localization['ru']['PROC_wins'] = '% побед';
				localization['ru']['PROC_losses'] = '% поражений';
				localization['ru']['PROC_draws'] = '% ничьих';
				localization['ru']['PROC_survived_battles'] = '% выживания';
				localization['ru']['PROC_hits'] = '% попаданий';
				localization['ru']['CF_xp'] = 'Опыт за бой';
				localization['ru']['CF_frags'] = 'Уничтожено за бой';
				localization['ru']['CF_spotted'] = 'Обнаружено за бой';
				localization['ru']['CF_shots'] = 'Выстрелов за бой';
				localization['ru']['CF_damage_dealt'] = 'Дамага за бой';
				localization['ru']['CF_damage_received'] = 'Дамага получено за бой';
				localization['ru']['CF_capture_points'] = 'Захват базы за бой';
				localization['ru']['CF_dropped_capture_points'] = 'Защита базы за бой';							
				localization['ru']['view_link'] = 'Показывать блок ссылок';
				localization['ru']['view_battles'] = 'Показывать блок список боев';
				localization['ru']['view_provice'] = 'Показывать блок список владений';
				localization['ru']['view_change'] = 'Показывать блок изменения в составе клана';
				localization['ru']['view_average'] = 'Показывать блок средних показателей';
				localization['ru']['view_vehicles'] = 'Показывать блок количество техники';
				localization['ru']['view_ratings'] = 'Показывать блок лучшие рейтинги';
				localization['ru']['get_vehicles'] = 'Получать технику состава';
				localization['ru']['get_ratings'] = 'Получать рейтинги состава';
				localization['ru']['get_glory'] = 'Получать очки славы состава';

				localization['ru']['NewVersion'] = 'Вышла новая версия скрипта';
				localization['ru']['NewUpdate'] = 'Пожалуйста, обновите скрипт';

				localization['ru']['ErrorClan'] = 'Не удалось получить состав клана, api.'+window.location.host+' не отвечает!\nОбновите страницу и/или попробуйте позднее, для получения дополнительной информации по клану.';				
				
				localization['ru']['linkBLink'] = 'Блок "Ссылок"';
				localization['ru']['linkBHead'] = 'Ссылки на другие ресурсы';
				localization['ru']['LinkClan'] = 'Клан на';
				
				localization['ru']['links'] = 'Ссылки';
				localization['ru']['ProvincesLink'] = 'Блок "Список владений"';
				localization['ru']['NoProvinces'] = 'У клана нет владений на глобальной карте.';
				localization['ru']['type'] = 'Тип';
				localization['ru']['title_name'] = 'Название';
				localization['ru']['arenas'] = 'Игровая карта';
				localization['ru']['prime_time'] = 'Прайм-тайм';
				localization['ru']['revenue'] = 'Доход';
				localization['ru']['occupancy_time'] = 'Время владения';
				localization['ru']['occupancy_day'] = '(дн.)';
				localization['ru']['provinces_count'] = 'Всего провинций:';
				localization['ru']['total_revenue'] = 'Общий доход:';
				
				localization['ru']['BattlesLink'] = 'Блок "Список боёв"';
				localization['ru']['NoBattle'] = 'У клана нет назначенных боёв.';
				localization['ru']['type'] = 'Тип';
				localization['ru']['time'] = 'Время';
				localization['ru']['provinces'] = 'Провинции';
				localization['ru']['arenas'] = 'Игровая карта';			
				localization['ru']['or'] = 'или';
				
				localization['ru']['StructureLink'] = 'Блок "Изменения в составе клана"';
				localization['ru']['StructureHead'] = 'Изменения в составе клана';
				localization['ru']['join'] = 'Вступил в клан';
				localization['ru']['leave'] = 'Покинул клан';
				localization['ru']['rename'] = 'сменил ник на';
				localization['ru']['rerole'] = 'сменил должность';
				
				localization['ru']['Wait'] = 'Пожалуйста, подождите ...';
				localization['ru']['GettingClan'] = 'Получение состава клана';
				localization['ru']['GettingStatistics'] = 'Получение статистики состава';
				localization['ru']['GettingTechnology'] = 'Получение техники состава';
				localization['ru']['GettingRating'] = 'Получение рейтинга состава';
				localization['ru']['GettingGlory'] = 'Получение очков славы состава';
				
				localization['ru']['ErrorCompany'] = 'Ошибка получение распределение на роты. Работа скрипта продолжается в ограниченном режиме.';
				localization['ru']['ErrorEncyclopedia'] = 'Ошибка получение энциклопедии техники. Работа скрипта продолжается в ограниченном режиме.';
				localization['ru']['ErrorMember'] = 'Ошибка получения данных игроков:';
				localization['ru']['ErrorTanks'] = 'Ошибка получения техники игроков:';
				localization['ru']['ErrorRating'] = 'Ошибка получения рейтинга игроков:';
				localization['ru']['ErrorGlory'] = 'Ошибка получения очков славы игроков:';
				localization['ru']['ErrorMemberInfo'] = 'Не удалось получить подробную статистику по игроку ';				
				
				localization['ru']['leader'] = 'Командир';
				localization['ru']['vice_leader'] = 'Зам.командира';
				localization['ru']['commander'] = 'Ротный';
				localization['ru']['recruiter'] = 'Вербовщик';
				localization['ru']['diplomat'] = 'Дипломат';
				localization['ru']['treasurer'] = 'Казначей';
				localization['ru']['private'] = 'Солдат';
				localization['ru']['recruit'] = 'Новобранец';	

				localization['ru']['SaveCompany'] = 'Сохранить распределение рот';
				localization['ru']['SaveCompanyYes'] = 'Распределение на роты успешно сохранено.';	
				localization['ru']['SaveCompanyNo'] = 'Не удалось сохранить распределение на роты.';
				localization['ru']['SaveStatistics'] = 'Сохранить cтатистику';
				localization['ru']['SaveStatisticsYes'] = 'Статистика состава клана, успешно сохранена';
				localization['ru']['SaveStatisticsText'] = 'Последние сохранение статистики';

				localization['ru']['ProvincesLink'] = 'Блок "Список владений"';
				localization['ru']['NoProvinces'] = 'У клана нет владений на глобальной карте.';
				localization['ru']['type'] = 'Тип';
				localization['ru']['title_name'] = 'Название';
				localization['ru']['arenas'] = 'Игровая карта';
				localization['ru']['prime_time'] = 'Прайм-тайм';
				localization['ru']['revenue'] = 'Доход';
				localization['ru']['occupancy_time'] = 'Время владения';
				localization['ru']['occupancy_day'] = '(дн.)';
				localization['ru']['provinces_count'] = 'Всего провинций:';
				localization['ru']['total_revenue'] = 'Общий доход:';
				
				localization['ru']['BattlesLink'] = 'Блок "Список боёв"';
				localization['ru']['NoBattle'] = 'У клана нет назначенных боёв.';
				localization['ru']['type'] = 'Тип';
				localization['ru']['time'] = 'Время';
				localization['ru']['provinces'] = 'Провинции';
				localization['ru']['arenas'] = 'Игровая карта';			
				localization['ru']['or'] = 'или';
				
				localization['ru']['numerV'] = '№';
				localization['ru']['nameV'] = 'Имя';
				localization['ru']['roleV'] = 'Должность';
				localization['ru']['sinceV'] = 'Вступил';
				localization['ru']['dayV'] = 'Дней';
				localization['ru']['logout_atV'] = 'LogOut';
				localization['ru']['last_battle_timeV'] = 'Посл.бой';
				localization['ru']['companyV'] = 'Рота';
				localization['ru']['battlesV'] = 'Боёв';
				localization['ru']['winsV'] = 'Побед';
				localization['ru']['lossesV'] = 'Поражений';
				localization['ru']['drawsV'] = 'Ничьих';
				localization['ru']['survived_battlesV'] = 'Выжил';
				localization['ru']['xpV'] = 'Опыт';
				localization['ru']['max_xpV'] = 'Max Опыт';
				localization['ru']['fragsV'] = 'Фрагов';
				localization['ru']['spottedV'] = 'Засвечено';
				localization['ru']['shotsV'] = 'Выстрелов';
				localization['ru']['hitsV'] = 'Попаданий';
				localization['ru']['damage_dealtV'] = 'Повреждения';
				localization['ru']['damage_receivedV'] = 'Получено';
				localization['ru']['capture_pointsV'] = 'Захват';
				localization['ru']['dropped_capture_pointsV'] = 'Защита';
				localization['ru']['glory_pointsV'] = 'Очки славы';
				localization['ru']['glory_positionV'] = 'Место в Аллее';
				localization['ru']['global_ratingV'] = 'Рейтинг';				
				localization['ru']['kpdV'] = 'Р.Э.';
				localization['ru']['wn6V'] = 'WN6';
				localization['ru']['wn7V'] = 'WN7';
				localization['ru']['wn8V'] = 'WN8';
				localization['ru']['bsV'] = 'БС';
				localization['ru']['PROC_winsV'] = '%Побед';
				localization['ru']['PROC_lossesV'] = '%Поражений';
				localization['ru']['PROC_drawsV'] = '%Ничьих';
				localization['ru']['PROC_survived_battlesV'] = '%Выживания';
				localization['ru']['PROC_hitsV'] = '%Попаданий';
				localization['ru']['CF_xpV'] = 'Ср.Опыт';
				localization['ru']['CF_fragsV'] = 'Ср.Фрагов';
				localization['ru']['CF_spottedV'] = 'Ср.Засвет';
				localization['ru']['CF_shotsV'] = 'Ср.Выстрелов';
				localization['ru']['CF_damage_dealtV'] = 'Ср.Урон';
				localization['ru']['CF_damage_receivedV'] = 'Ср.Получино';
				localization['ru']['CF_capture_pointsV'] = 'Ср.Захват';
				localization['ru']['CF_dropped_capture_pointsV'] = 'Ср.Защита';
				
				localization['ru']['stock'] = 'Запас';
				localization['ru']['rota'] = 'Рота';
				localization['ru']['.all'] = 'Во всех боях';		
				localization['ru']['.rand'] = 'В случайных боях';
				localization['ru']['.company'] = 'В ротных боях';
				localization['ru']['.clan'] = 'В клановых боях';
				localization['ru']['viewStatTable'] = 'Показывать показатели';
				localization['ru']['typeSortTable'] = 'Сортировать';
				localization['ru']['typeSortTable.all'] = 'По основным показателям';
				localization['ru']['typeSortTable.old'] = 'По сохраненным показателям';				

				localization['ru']['FullStatPlayer'] = 'Полная статистика игрока:';
				localization['ru']['AllStat'] = 'Всеx боев';
				localization['ru']['RandStat'] = 'Случайных боев';
				localization['ru']['CompanyStat'] = 'Ротных боев';
				localization['ru']['ClanStat'] = 'Клановых боев';
				localization['ru']['Equipment'] = 'Техника';					
				localization['ru']['Data'] = 'Показатели';
				localization['ru']['Actual'] = 'Актуальные';
				localization['ru']['Delta'] = 'Дельта от ';
				
				localization['ru']['games_battles'] = 'Проведено боёв';
				localization['ru']['games_wins'] = 'Побед';
				localization['ru']['games_losses'] = 'Поражений';
				localization['ru']['games_draws'] = 'Ничьих';
				localization['ru']['games_survived_battles'] = 'Выжил в боях';
				localization['ru']['games_xp'] = 'Суммарный опыт';
				localization['ru']['games_battles_avg_xp'] = 'Средний опыт за бой';
				localization['ru']['games_frags'] = 'Уничтожено';
				localization['ru']['games_spotted'] = 'Обнаружено';
				localization['ru']['games_shots'] = 'Выстрелов';
				localization['ru']['games_hits'] = 'Попаданий';
				localization['ru']['games_damage_dealt'] = 'Нанесено повреждения';
				localization['ru']['games_damage_received'] = 'Получено повреждения';
				localization['ru']['games_capture_points'] = 'Очки захвата базы';
				localization['ru']['games_dropped_capture_points'] = 'Oчки защиты базы';

				localization['ru']['absolute'] = 'Техника для абсолютной роты';
				localization['ru']['championship'] = 'Техника для чемпионской роты';
				localization['ru']['average'] = 'Техника для средней роты';
				localization['ru']['junior'] = 'Техника для юниорской роты';					

				localization['ru']['StatLink'] = 'Блок "Средних показателей"';
				localization['ru']['StatHead'] = 'Средние показатели по клану';
				localization['ru']['.clan_clanstat'] = 'Показатели клановыx боев';
				localization['ru']['.company_clanstat'] = 'Показатели ротных боев';
				localization['ru']['.all_clanstat'] = 'Показатели всех боев';
				localization['ru']['.rand_clanstat'] = 'Показатели случайных боев';	
				
				localization['ru']['VehicleLink'] = 'Блок "Количество техники"';				
				localization['ru']['VehicleHead'] = 'Количество техники в клане';
					
				localization['ru']['lightTank'] = 'Легкие танки';
				localization['ru']['mediumTank'] = 'Средние танки';
				localization['ru']['heavyTank'] = 'Тяжёлые танки';
				localization['ru']['AT-SPG'] = 'ПТ-САУ';
				localization['ru']['SPG'] = 'САУ';			
				localization['ru']['tank'] = 'Танк';
				localization['ru']['yes_tank'] = 'Есть';
				localization['ru']['no_tank'] = 'Нет';
				
				localization['ru']['RatingLink'] = 'Блок "Лучшие рейтинги"';		
				localization['ru']['RatingHead'] = 'Лучшие рейтинги клана';	
				localization['ru']['rating'] = 'Рейтинг';
				localization['ru']['name'] = 'Имя';
				localization['ru']['value'] = 'Значение';
				localization['ru']['rank'] = 'Место';		
				localization['ru']['Rglobal_rating'] = 'Личный рейтинг';
				localization['ru']['Rbattles_count'] = 'Количество проведённых боёв';
				localization['ru']['Rdamage_avg'] = 'Средний нанесённый урон за бой';
				localization['ru']['Rdamage_dealt'] = 'Общий нанесённый урон';
				localization['ru']['Rfrags_avg'] = 'Среднее количество уничтоженной техники за бой';
				localization['ru']['Rfrags_count'] = 'Количество уничтоженной техники';
				localization['ru']['Rhits_ratio'] = 'Процент попаданий';
				localization['ru']['Rspotted_avg'] = 'Среднее количество обнаруженной техники за бой';
				localization['ru']['Rspotted_count'] = 'Количество обнаруженной техники';
				localization['ru']['Rsurvived_ratio'] = 'Процент выживаемости';
				localization['ru']['Rwins_ratio'] = 'Процент побед';
				localization['ru']['Rxp_amount'] = 'Общий опыт';
				localization['ru']['Rxp_avg'] = 'Средний опыт за бой';
				localization['ru']['Rxp_max'] = 'Максимальный опыт за бой';

				localization['ru']['LastClan'] = 'Кланы';
				localization['ru']['LastClanPlayer'] = 'Клан-история и должности игрока ';
				
				localization['ru']['HistoryClans'] = 'История кланов';
				
				localization['ru']['PersonalDataBlock'] = 'Блок "Личных данных"';
				localization['ru']['PersonalSpeedometerBlock'] = 'Блок "Cпидометров"';
				localization['ru']['PersonalAchievementsBlock'] = 'Блок "Достижений"';
				localization['ru']['PersonalStatisticBlock'] = 'Блок "Статистики"';
				localization['ru']['PersonalDiagramsBlock'] = 'Блок "Диаграмм"';
				localization['ru']['PersonalRatingsBlock'] = 'Блок "Рейтингов"';	
			}
			
			return localization[lang];
		}		
	}
	window.onload = function(){
		if(
			window.location.host.indexOf("worldoftanks") > -1 && window.location.href.split('/').length == 7 &&
			(window.location.href.indexOf("clans") > -1 || window.location.href.indexOf("accounts"))
		){
			function addJQuery(callback){
				var script = document.createElement("script");
				script.async = true;
				script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/2.0.1/jquery.min.js");
				script.addEventListener(
					'load', 
					function(){
						var script = document.createElement("script");
						script.async = true;
						script.textContent = "window.jQ = jQuery.noConflict(true);"+
						"("+callback.toString()+")();";
						document.head.appendChild(script);
					}, 
					false
				);
				document.head.appendChild(script);
			}
			
			function getCookie(c_name){
				var c_value = document.cookie;
				var c_start = c_value.indexOf(" " + c_name + "=");
				if(c_start == -1){
					c_start = c_value.indexOf(c_name + "=");
				}
				if(c_start == -1){
					c_value = null;
				}else{
					c_start = c_value.indexOf("=", c_start) + 1;
					var c_end = c_value.indexOf(";", c_start);
					if(c_end == -1){
						c_end = c_value.length;
					}
					c_value = unescape(c_value.substring(c_start,c_end));
				}
				return c_value;
			}			
			
			function getXmlHttp(){
				var xmlhttp;
				
				if(window.XMLHttpRequest){
					xmlhttp = new XMLHttpRequest();
				}else if(window.ActiveXObject){
					try{
						xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
					}catch(e1){
						try{
							xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
						}catch(e2){}
					}					
				}
				
				return xmlhttp;
			}

			function setLastVersionScript(lastVersion){
				var version = document.createElement("div");
				version.setAttribute("id", "version");
				version.textContent = lastVersion;
				document.head.appendChild(version);
				
				addJQuery(onStart);				
			}			
			
			var scriptMap = document.createElement("script");
			scriptMap.async = true;
			scriptMap.setAttribute("src", "https://cw."+window.location.host+"/static/wgcw/js/i18n/"+getCookie('hllang')+"_earth_map.js");
			document.head.appendChild(scriptMap);	
			
			var xmlHttp = getXmlHttp();
			xmlHttp.open("GET", "http://walkure.pro/US_ClanInfo/version.php?random="+Math.floor(Math.random()*100000001), false);
			xmlHttp.onreadystatechange = function(){
				if(xmlHttp.readyState != 4){return;}
				if(xmlHttp.status == 200){
					var regexp = /@version[^0-9\.]+([0-9a-z\.]+)/gi, lastVersion = regexp.exec(xmlHttp.responseText);
					if(lastVersion != null){
						setLastVersionScript(lastVersion[1]);
					}else{
						setLastVersionScript('0');
					}
				}else{
					setLastVersionScript('0');
				}
			}
			xmlHttp.send();		
		}
	}
})(window);