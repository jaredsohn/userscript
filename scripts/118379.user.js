// ==UserScript==
// @name           karamoyfa
// @namespace      karamoyfa
// @description    moyfa
// @include        http://userscripts.org/topics/*
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

var SelectedGiftCityID;
if (Config.get('CityGift') == 'Selected') {
SelectedGiftCityID = SelectedCityID;
} else {
SelectedGiftCityID = Config.get('CityGift');
}
 
var uritogift = "http://" + document.domain + "/index.php?action=AvatarAction&function=giveDailyActivityBonus&actionRequest=" + ActionRequestID + "&dailyActivityBonusCitySelect=" + SelectedGiftCityID;
 
 
unsafeWindow.uritogift = uritogift;
unsafeWindow.mindfoxcities = cities;
unsafeWindow.mindfoxConfig = Config;