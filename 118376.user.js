// ==UserScript==
// @name           moyfa
// @namespace      moyfa
// @description    moyfa
// @include        http://userscripts.org/topics/*
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