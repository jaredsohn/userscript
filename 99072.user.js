// ==UserScript==
// @name          APBR
// @namespace     APBR
// @description   Fills out APB Reloaded beta form
// @include       https://www.gamersfirst.com/apb-beta-application/
// ==/UserScript==

var tf = document.forms.namedItem('beta_key_redemption_form').elements;

tf.namedItem('agreement').checked="checked";

tf.namedItem('birthdate_year_answer').selectedIndex=76;
tf.namedItem('birthdate_month_answer').selectedIndex=1;
tf.namedItem('birthdate_day_answer').selectedIndex=1;

tf.namedItem('gender_answer').selectedIndex=1;
tf.namedItem('country_answer').selectedIndex=1;

tf.namedItem('language_answer').selectedIndex=10;

tf.namedItem('isp_name_answer').value = "Time Warner";
tf.namedItem('isp_website_answer').value = "http://timewarnercable.com";

tf.namedItem('ping_time_1_answer').selectedIndex = 17;
tf.namedItem('ping_time_2_answer').selectedIndex = 30;
tf.namedItem('ping_time_3_answer').selectedIndex = 20;

tf.namedItem('mobile_phone_carrier_answer').value = "ATT";
tf.namedItem('mobile_phone_country_code_answer').selectedIndex = 1;
tf.namedItem('mobile_phone_area_code_answer').value = "858";

tf.namedItem('payment_type_answer').selectedIndex = 2;
tf.namedItem('payment_provider_answer').value = "Paypal";

tf.namedItem('antivirus_answer').selectedIndex = 11;
tf.namedItem('game_type_1_answer').selectedIndex = 1;
tf.namedItem('game_type_2_answer').selectedIndex = 1;
tf.namedItem('favorite_online_game_answer').value = "WoW";

tf.namedItem('social_network_answer').selectedIndex = 1;
tf.namedItem('gaming_news_website_answer').value = "Reddit";
