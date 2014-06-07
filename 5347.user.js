// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "Meteor Accessibility Remediation", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// www.meteor.ie:
//	- adds alternative text to images and image maps
//	- adds indication concerning the language of the web site
//	- replace misplaced Form associated with the "Search" field
//Improvement: 
// everything concerning web accessibility Remediation to this web site
//
// --------------------------------------------------------------------



// ==UserScript==
// @name  Meteor Accessibility Remediation 
// @namespace http://diveintogreasemonkey.org/download/
// @description  Script developed for accessibility Remediation of the web site www.meteor.ie
// @include http://www.meteor.ie/*
// ==/UserScript==/

 (function(){

var allLinks, thisLink , altText,buffer,allLinks2, thisLink2, href;
allLinks = document.evaluate('//img',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
href=window.location.href;

for (var i = 0; i < allLinks.snapshotLength; i++) {
thisLink=allLinks.snapshotItem(i);

if(href=="http://www.meteor.ie/payg_savings.html"){
if(i==0 || i>2 && i<9 || i>14 && i<74 || i>74 && i<81 || i>81 && i<86|| (i%2)==1 && i>86 && i<96 || i>96 && i<104 ||i==118)
thisLink.alt="";

if(i==81)
thisLink.alt="Meteor Home web site";
if(i==86)
thisLink.alt="News";
if(i==88)
thisLink.alt="carrers at meteor";
if(i==90)
thisLink.alt="make a search on the web site";
if(i==92)
thisLink.alt="map of the web site";
if(i==94)
thisLink.alt="click here if you need help";
if(i==96)
thisLink.alt="Contact Us";
if(i==104)
thisLink.alt="Pay as you go";
if(i==105)
thisLink.alt="Bill pay";
if(i==106)
thisLink.alt="Business";
}
if(href=="http://www.meteor.ie/index.html" || href=="http://www.meteor.ie/index.html#" || href=="http://www.meteor.ie/" || href=="http://www.meteor.ie/#"){
if(i<5 || (i%2)==0 && i<19 && i>5 || i>19 && i<27 || i>27 && i<39 || i>39 && i<47 || (i%2)==0 && i<72 && i>46)
thisLink.alt="";
if(i==5)
thisLink.alt="Home web site";
if(i==7)
thisLink.alt="click here to have information about meteor";
if(i==9)
thisLink.alt="News";
if(i==11)
thisLink.alt="carrers at meteor";
if(i==13)
thisLink.alt="make a search on the web site";
if(i==15)
thisLink.alt="map of the web site";
if(i==17)
thisLink.alt="click here if you need help";
if(i==19)
thisLink.alt="Contact meteor services";
if(i==39)
thisLink.alt="Register your details here. Sign-in to use Free web text";
if(i==49)
thisLink.alt="Pay as you go";
if(i==51)
thisLink.alt="Prices Plans";
if(i==53)
thisLink.alt="Top Ups";
if(i==55)
thisLink.alt="Phones";
if(i==57)
thisLink.alt="Services";
if(i==59)
thisLink.alt="Contact Us";
if(i==61)
thisLink.alt="Bill Pay";
if(i==63)
thisLink.alt="Prices Plans";
if(i==65)
thisLink.alt="Phones";
if(i==67)
thisLink.alt="Services";
if(i==69)
thisLink.alt="Contact Us";
if(i==73)
thisLink.alt="Business offers";
if(i==75)
thisLink.alt="Business Prices Plans";
if(i==77)
thisLink.alt="Business Phones";
if(i==79)
thisLink.alt="Business Services";
if(i==81)
thisLink.alt="Contact Us";
if(i==71 || (i%2)==0 && i>72 && i<82 || i>81 && i<93 || i>93 && i<96 || i>96 && i<101)
thisLink.alt="";
if(i==93)
thisLink.alt="Meteor Stuff- Tunes-Alert-tones-Pics-Games";
if(i==96)
thisLink.alt="Latest Information on Roaming and Coverage";
}
if(href=="http://www.meteor.ie/payg_plans.html" || href=="http://www.meteor.ie/payg.html" || href=="http://www.meteor.ie/payg_topup.html" || href=="http://www.meteor.ie/payg_services.html" || href=="http://www.meteor.ie/payg_contact.html" || href=="http://www.meteor.ie/payg_roaming.html" || href=="http://www.meteor.ie/payg_legacy_leisure.html" || href=="http://www.meteor.ie/payg_rewards.html" || href=="http://www.meteor.ie/payg_legacy_leisure_international.html" || href=="http://www.meteor.ie/payg_legacy_anytime.html" || href=="http://www.meteor.ie/payg_keepyournumber.html" || href=="http://www.meteor.ie/payg_international_plans.html" || href=="http://www.meteor.ie/payg_international_anytime.html" || href=="http://www.meteor.ie/makethemove/payg_phones_comparison.html" || href=="http://www.meteor.ie/payg_phones_upgrades.html" || href=="http://www.meteor.ie/payg_phones_upgrades_terms.html" || href=="http://www.meteor.ie/payg_5c_text_bundle.html" || href=="http://www.meteor.ie/payg_roaming_faq.html" || href=="http://www.meteor.ie/payg_keepyournumber_faq.html"){
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>37 && i<97 || i>97 && i<102 || (i%2)==0 && i>105 && i<117 || i>116)
thisLink.alt="";
if(i==102)
thisLink.alt="Pay as you go";
if(i==103)
thisLink.alt="Bill pay";
if(i==104)
thisLink.alt="business";
if(i==105)
thisLink.alt="Prices plans";

}
if(href=="http://www.meteor.ie/billpay_plans_meteortalk.html" || href=="http://www.meteor.ie/billpay_plans_meteorminutes.html" || href=="http://www.meteor.ie/billpay_international.html" || href=="http://www.meteor.ie/billpay_calls.html" || href=="http://www.meteor.ie/billpay_keep_in_touch.html" || href=="http://www.meteor.ie/billpay_protect_phone.html" || href=="http://www.meteor.ie/billpay_protect_minder.html" || href=="http://www.meteor.ie/billpay_protect_repairs.html" || href=="http://www.meteor.ie/billpay_protect_returns.html" || href=="http://www.meteor.ie/billpay_protect_stolen.html" || href=="http://www.meteor.ie/billpay_protect_spam.html" || href=="http://www.meteor.ie/billpay_roaming_faq.html" || href=="http://www.meteor.ie/billpay_roaming_rates.html" || href=="http://www.meteor.ie/billpay_keepyournumber.html" || href=="http://www.meteor.ie/billpay_keepyournumber_faq.html" || href=="http://www.meteor.ie/billpay_plans_freecalls_term.html")
{
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>37 && i<97 || i>97 && i<102 || (i%2)==0 && i>105 && i<117 || i>116)
thisLink.alt="";
if(i==102)
thisLink.alt="Bill pay";
if(i==103)
thisLink.alt="Pay as you go";
if(i==104)
thisLink.alt="business";
if(i==105)
thisLink.alt="Prices plans";
}
if(href=="http://www.meteor.ie/billpay.html" || href=="http://www.meteor.ie/billpay_plans.html" || href=="http://www.meteor.ie/billpay_services.html" || href=="http://www.meteor.ie/billpay_contact.html" || href=="http://www.meteor.ie/billpay_phones_upgrades.html" || href=="http://www.meteor.ie/billpay_phones_upgrades_terms.html" || href=="http://www.meteor.ie/makethemove/billpay_phones_comparison.html" || href=="http://www.meteor.ie/billpay_roaming.html"){
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>37 && i<97 || i>97 && i<102 || (i%2)==0 && i>105 && i<117 || i>116)
thisLink.alt="";
if(i==102)
thisLink.alt="Bill pay";
if(i==103)
thisLink.alt="Pay as you go";
if(i==104)
thisLink.alt="business";
if(i==105)
thisLink.alt="Prices plans";
}
if(href=="http://www.meteor.ie/misc/about.html" || href=="http://www.meteor.ie/misc/news.html" || href=="http://www.meteor.ie/careers/index.html" || href=="http://www.meteor.ie/misc/contact.html" || href=="http://www.meteor.ie/misc/sponsorship.html" || href=="http://www.meteor.ie/misc/roaming_international.html" || href=="http://www.meteor.ie/misc/sponsorship.html" || href=="http://www.meteor.ie/misc/terms_conditions.html" || href=="http://www.meteor.ie/misc/termsofuse.html" || href=="http://www.meteor.ie/misc/privacy.html" || href=="http://www.meteor.ie/misc/malicious.html" || href=="http://www.meteor.ie/misc/illegal_images.html"){
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>37 && i<97 || i>97 && i<102 || i>105)
thisLink.alt="";
if(i==102)
thisLink.alt="Meteor Home web site";
if(i==103)
thisLink.alt="Pay as you go";
if(i==104)
thisLink.alt="Bill PAy";
if(i==105)
thisLink.alt="Business";

}
if(href=="http://www.meteor.ie/makethemove/payg_phones.html" || href=="http://www.meteor.ie/payg_roaming_rates.html" || href=="http://www.meteor.ie/makethemove/payg_phone_deals.html"){
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>37 && i<97 || i>97 && i<101 || i==101 || (i%2)==0 && i>105 && i<117 || i>116 && i<156)
thisLink.alt="";
if(i==102)
thisLink.alt="Pay as you go";
if(i==103)
thisLink.alt="Bill Pay";
if(i==104)
thisLink.alt="Business";
if(i==105)
thisLink.alt="Prices plans";
if(i==107)
thisLink.alt="phones/Upgrades";
if(i==109)
thisLink.alt="Services";
if(i==111)
thisLink.alt="Roaming";
if(i==113)
thisLink.alt="Latest Offers";
if(i==115)
thisLink.alt="Contact Us";
}
if(href=="http://www.meteor.ie/makethemove/billpay_phones.html" || href=="http://www.meteor.ie/makethemove/billpay_phone_deals.html"){
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>37 && i<97 || i>97 && i<101 || i==101)
thisLink.alt="";
if(i==102)
thisLink.alt="Bill Pay";
if(i==103)
thisLink.alt="Pay as you go";
if(i==104)
thisLink.alt="Business";
if(i==105)
thisLink.alt="Prices plans";
if(i==107)
thisLink.alt="phones/Upgrades";
if(i==109)
thisLink.alt="Services";
if(i==111)
thisLink.alt="Roaming";
if(i==113)
thisLink.alt="Latest Offers";
if(i==115)
thisLink.alt="Contact Us";
if((i%2)==0 && i>105 && i<117 || i>116 && i<156)
thisLink.alt="";
}
if(href=="http://www.meteor.ie/payg_plans_anytime_international.html" || href=="http://www.meteor.ie/payg_plans_ati_table.html" || href=="http://www.meteor.ie/payg_5c_ft.html" || href=="http://www.meteor.ie/payg_plans_leisuretime.html" || href=="http://www.meteor.ie/payg_plans_anytime.html" || href=="http://www.meteor.ie/payg_legacy.html" || href=="http://www.meteor.ie/payg_freesim.html" || href=="http://www.meteor.ie/payg_international.html" || href=="http://www.meteor.ie/payg_calls.html" || href=="http://www.meteor.ie/payg_keep_in_touch.html" || href=="http://www.meteor.ie/payg_keep_in_touch.html#" || href=="http://www.meteor.ie/payg_protect_phone.html" || href=="http://www.meteor.ie/payg_protect_minder.html" || href=="http://www.meteor.ie/payg_protect_repairs.html" || href=="http://www.meteor.ie/payg_protect_returns.html" || href=="http://www.meteor.ie/payg_protect_stolen.html" || href=="http://www.meteor.ie/payg_protect_spam.html"){
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>37 && i<97 || i>97 && i<102)
thisLink.alt="";
if(i==102)
thisLink.alt="Pay as you go";
if(i==103)
thisLink.alt="Bill Pay";
if(i==104)
thisLink.alt="Business";
if(i==105)
thisLink.alt="Prices Plans";
if(i==107)
thisLink.alt="phones/Upgrades";
if(i==109)
thisLink.alt="Services";
if(i==111)
thisLink.alt="Roaming";
if(i==113)
thisLink.alt="Latest Offers";
if(i==115)
thisLink.alt="Contact Us";
if((i%2)==0 && i>105 && i<117)
thisLink.alt="";
if(i>116)
thisLink.alt="";
}
if(href=="http://www.meteor.ie/misc/roaming.html"){
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>37 && i<97 || i>97 && i<102 || i>105 && i<114 || i>116)
thisLink.alt="";
if(i==102)
thisLink.alt="Meteor Home web site";
if(i==103)
thisLink.alt="Pay as you go";
if(i==104)
thisLink.alt="Bill Pay";
if(i==105)
thisLink.alt="Business";
if(i==114)
thisLink.alt="Domestic coverage";
if(i==115)
thisLink.alt="International Roaming";
if(i==116)
thisLink.alt="Visiting Ireland";
}

if(href=="http://www.meteor.ie/misc/coverage.html")
{
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>37 && i<97 || i>97 && i<102)
thisLink.alt="";
if(i==102)
thisLink.alt="Meteor Home web site";
if(i==103)
thisLink.alt="Pay as you go";
if(i==104)
thisLink.alt="Bill PAy";
if(i==105)
thisLink.alt="Business";
if(i>105 && i<114 || i>114)
thisLink.alt="";
}

if(href=="http://www.meteor.ie/payg_offers.html")
{
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>37 && i<97 || i>97 && i<102)
thisLink.alt="";
if(i==102)
thisLink.alt="Meteor Home web site";
if(i==103)
thisLink.alt="Bill Pay";
if(i==104)
thisLink.alt="Business";
if(i==107)
thisLink.alt="phones/Upgrades";
if(i==109)
thisLink.alt="Services";
if(i==111)
thisLink.alt="Roaming";
if(i==113)
thisLink.alt="Latest Offers";
if(i==115)
thisLink.alt="Contact Us";
if((i%2)==0 && i>105 && i<117 || i>116 && i<123 || i>125)
thisLink.alt="";
if(i==124)
thisLink.alt="Choose 5C calls or free text- click for information";
}

if(href=="http://www.meteor.ie/makethemove/all_phones.html")
{
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>37 && i<97 || i>97 && i<101 || i>105 && i<156)
thisLink.alt="";
if(i==101)
thisLink.alt="";
if(i==102)
thisLink.alt="Meteor hom web site";
if(i==103)
thisLink.alt="Pay as you go";
if(i==104)
thisLink.alt="Bill Pay";
if(i==105)
thisLink.alt="Business";
}

if(href=="http://www.meteor.ie/business.html" || href=="http://www.meteor.ie/business_plans.html" || href=="http://www.meteor.ie/business_services.html" || href=="http://www.meteor.ie/business_plans_talk.html" || href=="http://www.meteor.ie/business_international.html" || href=="http://www.meteor.ie/business_other.html" || href=="http://www.meteor.ie/business_plans_businessedge.html" || href=="http://www.meteor.ie/business_wdc.html" || href=="http://www.meteor.ie/business_keep_in_touch.html" || href=="http://www.meteor.ie/business_roaming_rates.html" || href=="http://www.meteor.ie/business_testimonials.html" || href=="http://www.meteor.ie/business_contact.html" || href=="http://www.meteor.ie/makethemove/business_phones_comparison.html" || href=="http://www.meteor.ie/business_roaming.html" || href=="http://www.meteor.ie/business_roaming_faq.html")
{
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>35 && i<97 || i>96 && i<100 || i==101)
thisLink.alt="";
if(i==100)
thisLink.alt="Business";
if(i==102)
thisLink.alt="Prices plans";
if(i==104)
thisLink.alt="phones/Upgrades";
if(i==106)
thisLink.alt="Services";
if(i==108)
thisLink.alt="Roaming";
if(i==110)
thisLink.alt="Testimonials";
if(i==112)
thisLink.alt="Contact Us";
if((i%2)==1 && i>105 && i<112 || i>112)
thisLink.alt="";
}

if(href=="http://www.meteor.ie/makethemove/business_phones.html"){
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>35 && i<97 || i>96 && i<100)
thisLink.alt="";
if(i==101)
thisLink.alt="";
if(i==100)
thisLink.alt="Business";
if(i==102)
thisLink.alt="Prices plans";
if(i==104)
thisLink.alt="phones/Upgrades";
if(i==106)
thisLink.alt="Services";
if(i==108)
thisLink.alt="Roaming";
if(i==110)
thisLink.alt="Latest Offers";
if(i==112)
thisLink.alt="Contact Us";
if((i%2)==1 && i>105 && i<112)
thisLink.alt="";
if(i>112 && i<156)
thisLink.alt="";
}
if(href=="http://www.meteor.ie/makethemove/payg_meteorshops.html" )
{
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>38 && i<46 || i>51 && i<97 || i>97 && i<102)
thisLink.alt="";
if(i==26)
thisLink.alt="Meteor Home web site";
if(i==27)
thisLink.alt="Bill Pay";
if(i==28)
thisLink.alt="Business";
if(i==29)
thisLink.alt="Pay as you go prices";
if(i==31)
thisLink.alt="phones/Upgrades";
if(i>51 && i<102)
thisLink.alt="";
}


if(href=="http://www.meteor.ie/makethemove/meteorshops.html")
{
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>37 && i<97 || i>97 && i<102 || i>116 && i<105)
thisLink.alt="";
if(i==102)
thisLink.alt="Meteor Home web site";
if(i==103)
thisLink.alt="Pay as you go";
if(i==104)
thisLink.alt="Bill Pay";
if(i==105)
thisLink.alt="Business";
}

if(href=="http://www.meteor.ie/misc/sitemap.html")
{
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>37 && i<97 || i>97 && i<102)
thisLink.alt="";
if(i==102)
thisLink.alt="Meteor Home web site";
if(i==103)
thisLink.alt="Pay as you go";
if(i==104)
thisLink.alt="Bill Pay";
if(i==105)
thisLink.alt="Business";
if(i>105 && i<114 || i>116 && i<131 || i>131 && i<144 || i>144 && i<155 || i>155 && i<179 || i>179 && i<192 || i==193 || i>194 && i<198 || i>198 && i<201 || i>208)
thisLink.alt="";
if(i==114)
thisLink.alt="Meteor Home web site";
if(i==115)
thisLink.alt="Go to your account";
if(i==116)
thisLink.alt="Pay as you go";
if(i==131)
thisLink.alt="Bill Pay";
if(i==144)
thisLink.alt="Business";
if(i==155)
thisLink.alt="Our phones";
if(i==179)
thisLink.alt="About Meteor";
if(i==192)
thisLink.alt="Meteor stuff";
if(i==194)
thisLink.alt="Meteor Network";
if(i==198)
thisLink.alt="Contact Meteor";
if(i==201)
thisLink.alt="News";
if(i==202)
thisLink.alt="Careers";
if(i==203)
thisLink.alt="Search";
if(i==204)
thisLink.alt="Sitemap";
if(i==208)
thisLink.alt="click here if you need help";
}

if(href=="http://www.meteor.ie/makethemove/billpay_meteorshops.html")
{
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>37 && i<97 || i>97 && i<102 || i>115)
thisLink.alt="";
if(i==102)
thisLink.alt="Bill Pay";
if(i==103)
thisLink.alt="Pay as you go";
if(i==104)
thisLink.alt="Business";
if(i==105)
thisLink.alt="Prices plans";
if(i==107)
thisLink.alt="phones/Upgrades";
if(i==109)
thisLink.alt="Services";
if(i==111)
thisLink.alt="Roaming";
if(i==113)
thisLink.alt="Latest Offers";
if(i==115)
thisLink.alt="Contact Us";
}

if(href=="http://www.meteor.ie/stuff/play.html")
{
if((i%2)==0 && i<17)
thisLink.alt="";
if(i==1)
thisLink.alt="Meteor Home web site";
if(i==3)
thisLink.alt="click here to have information about meteor";
if(i==5)
thisLink.alt="News";
if(i==7)
thisLink.alt="carrers at meteor";
if(i==9)
thisLink.alt="make a search on the web site";
if(i==11)
thisLink.alt="map of the web site";
if(i==13)
thisLink.alt="click here if you need help";
if(i==15)
thisLink.alt="Contact meteor services";
if(i>16 && i<21 || i>21 && i<32 || i>37 && i<97 || i>97 && i<102)
thisLink.alt="";
if(i==102)
thisLink.alt="Meteor Home web site";
if(i==103)
thisLink.alt="Pay as you go";
if(i==104)
thisLink.alt="Bill PAy";
if(i==105)
thisLink.alt="Business";
if(i>105 && i<114 || i>116 &&  i<120 || i==122 || i>128 && i<131 || i==133 || i>139 && i<142 || i==144 || i>150 && i<153 || i==155 || i>156)
thisLink.alt="";
if(i==114)
thisLink.alt="Download Tunes, Tones, Pics & Games";
if(i==115)
thisLink.alt="Ringstones";
if(i==116)
thisLink.alt="Ringstones";
if(i==120)
thisLink.alt="Games";
if(i==121)
thisLink.alt="Games";
if(i==124)
thisLink.alt="X man 3 Game";
if(i==125)
thisLink.alt="Pac Man Game";
if(i==126)
thisLink.alt="Millionaire Game";
if(i==127)
thisLink.alt="Scratch City Video poker Game";
if(i==128)
thisLink.alt="pac Man pinball Game";
if(i==131)
thisLink.alt="Images";
if(i==132)
thisLink.alt="Images";
if(i==135)
thisLink.alt="Image representing the sun";
if(i==136)
thisLink.alt="Image representing the mona lisa";
if(i==137)
thisLink.alt="Image representing the body paint by leonardo da vinci";
if(i==138)
thisLink.alt="Image representing a singer";
if(i==139)
thisLink.alt="Image representing the Irish flag";
if(i==142)
thisLink.alt="Videos Clips";
if(i==143)
thisLink.alt="Videos Clips";
if(i==146)
thisLink.alt="Video";
if(i==147)
thisLink.alt="Video";
if(i==148)
thisLink.alt="Video";
if(i==149)
thisLink.alt="Video";
if(i==150)
thisLink.alt="Video";
if(i==153)
thisLink.alt="Alerts";
if(i==154)
thisLink.alt="Alerts";
}

}

var allLinks2 = document.evaluate('//html',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
thisLink = allLinks2.snapshotItem(0);
thisLink.lang="en";
  	
if(href=="http://www.meteor.ie/index.html" || href=="http://www.meteor.ie/"){
allLinks = document.evaluate('//table',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var thelink= allLinks.snapshotItem(6);
buffer=thelink.parentNode;
var table=document.createElement("table");
table.innerHTML='<table width="556"; height="28"; border="0"; cellpadding="0"; cellspacing="0"; background="images/home_top_login_bg.jpg";>'+
                 '<tr><td width="147"; height="28"; align="center"; valign="top";><img src="images/home_top_login_mm.jpg"; width="147"; height="28"; alt="";></td>'+
                 '<td width="3"; height="28"; align="center"; valign="top";><img src="images/home_top_login_spacer.jpg"; width="3"; height="28"; alt="";></td>'+
                 '<form action="https://www.mymeteor.ie/mymeteor/do_login.cfm"; method="post"; name="login"; style="margin-bottom: 0";>'+
                 '<td width="42"; height="28"; align="center"; valign="top";><img src="images/home_top_login_mob.jpg"; width="39"; height="28"; alt="";>'+ 
                 '</td>'+
                 '<td width="90"; height="28"; align="left"; valign="middle";>'+ 
                 '<input name="msisdn"; type="text"; class="mobileInput"; id="msisdn"; tabindex="1"; value="08"; size="10"; maxlength="10";>'+ 
                 '</td>'+
                 '<td width="3"; height="28"; align="center"; valign="top";><img src="images/home_top_login_spacer.jpg"; width="3"; height="28"; alt="";></td>'+
                 '<td width="25"; height="28"; align="center"; valign="top";><img src="images/home_top_login_pin.jpg"; width="22"; height="28"; alt="";></td>'+
                 '<td width="50"; height="28"; align="left"; valign="middle";>'+
                 '<input name="pin"; tabindex="2"; value=""; class="pinInput"; maxlength="7"; size="5"; type="password"; id="pin";></td>'+
                 '<td width="3"; height="28"; align="center"; valign="top";><img src="images/home_top_login_spacer.jpg"; width="3"; height="28"; alt="";></td>'+
                 '<td width="45"; height="28"; align="center"; valign="middle";>'+
                 '<input name="login"; id="login"; type="submit"; class="subButton"; value="Login";></td>'+
                 '</form>'+
                 '<td width="3"; height="28"; valign="top";><img src="images/home_top_login_spacer.jpg"; width="3"; height="28"; alt="";></td>'+
                 '<td width="132"; height="28"; valign="top";><a href="https://www.mymeteor.ie/mymeteor/login.cfm";><img src="images/home_top_login_instruct.jpg"; width="132"; height="28"; border="0"; alt="Login";></a></td>'+
                 '</tr></table>';

buffer.insertBefore(table, buffer.firstChild); 	
}

allLinks = document.evaluate('//area',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

if(allLinks.snapshotLength>0){


if(window.location.href=="http://www.meteor.ie/makethemove/billpay_meteorshops.html" || href=="http://www.meteor.ie/makethemove/payg_meteorshops.html"){


for (var i = 0; i < allLinks.snapshotLength; i++){
thisLink = allLinks.snapshotItem(i);
if(i==0)
thisLink.firstChild.alt="Wexford";
if(i==1)
thisLink.alt="Waterford";
if(i==2)
thisLink.alt="Cork";
if(i==3)
thisLink.alt="Kerry";
if(i==4)
thisLink.alt="Limerick";
if(i==5)
thisLink.alt="Tipperary";
if(i==6)
thisLink.alt="Clare";
if(i==7)
thisLink.alt="Offaly";
if(i==8)
thisLink.alt="Galway";
if(i==9)
thisLink.alt="Mayo";
if(i==10)
thisLink.alt="Roscommon";
if(i==11)
thisLink.alt="Sligo";
if(i==12)
thisLink.alt="Donegal";
if(i==13)
thisLink.alt="Leitrim";
if(i==14)
thisLink.alt="Cavan";
if(i==15)
thisLink.alt="Monaghan";
if(i==16)
thisLink.alt="Louth";
if(i==17)
thisLink.alt="Meath";
if(i==18)
thisLink.alt="Longford";
if(i==19)
thisLink.alt="Westmeath";
if(i==20)
thisLink.alt="Kildare";
if(i==21)
thisLink.alt="Laois";
if(i==22)
thisLink.alt="Kilkenny";
if(i==23)
thisLink.alt="Carlow";
if(i==24)
thisLink.alt="Wiclow";
if(i==25)
thisLink.alt="County Dublin";
if(i==26)
thisLink.alt="Dublin City";

if(i==27)
thisLink.alt="Stores Dublin 1";
if(i==28)
thisLink.alt="Stores Dublin 2";
if(i==29)
thisLink.alt="Stores Dublin 3";
if(i==30)
thisLink.alt="Stores Dublin 4";
if(i==31)
thisLink.alt="Stores Dublin 5";
if(i==32)
thisLink.alt="Stores Dublin 6";
if(i==33)
thisLink.alt="Stores Dublin 7";
if(i==34)
thisLink.alt="Stores Dublin 8";
if(i==35)
thisLink.alt="Stores Dublin 9";
if(i==36)
thisLink.alt="Stores Dublin 10";
if(i==37)
thisLink.alt="Stores Dublin 11";
if(i==38)
thisLink.alt="Stores Dublin 12";
if(i==39)
thisLink.alt="Stores Dublin 13";
if(i==40)
thisLink.alt="Stores Dublin 14";
if(i==41)
thisLink.alt="Stores Dublin 15";
if(i==42)
thisLink.alt="Stores Dublin 16";
if(i==43)
thisLink.alt="Stores Dublin 17";
if(i==44)
thisLink.alt="Stores Dublin 18";
if(i==45)
thisLink.alt="Stores Dublin 20";
if(i==46)
thisLink.alt="Stores Dublin 22";
if(i==47)
thisLink.alt="Stores Dublin 24";
}}}

		
}());

