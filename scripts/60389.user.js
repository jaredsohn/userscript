// ==UserScript==
// @name        Ghostery script for Opera 9+
// @version     0.0.2
// @description This is a port of the Ghostery Ff addon ( http://www.ghostery.com/ ) for Opera 9+
// @include     *
// ==/UserScript==

/*
 * based on the:
 * Ghostery Firefox Extension: http://www.ghostery.com/
 *
 * Copyright (C) 2008-2009 David Cancel
 *
 * @author David Cancel
 * @author Jon Pierce
 * @copyright Copyright (C) 2008-2009 David Cancel <dcancel@dcancel.com>
*/

(function () {
var win = window;
var doc = document;
var opr = win.opera;


const popupPause = 10000; // mseconds

var ghsFound = []; // list of found shit
var ghsCache = {}; // dictionary of the above
var tshFound = []; // list of found shit
var tshCache = {}; // dictionary of the above


//opr.postError("***"+(new Date())+": START");

var ghsList =
[{
"id": "1",
"name": "Lookery",
"pattern": "/(pub\\.lookery\\.com\\/js\\/|lookery\\.com\\/look\\.js|\\/j\\/pub\\/look\\.js)/i"
},
{
"id": "2",
"name": "Google Analytics",
"pattern": "/google-analytics\\.com\\/(urchin\\.js|ga\\.js)/i"
},
{
"id": "3",
"name": "MyBlogLog",
"pattern": "/\\.mybloglog\\.com\\//i"
},
{
"id": "4",
"name": "Quantcast",
"pattern": "/(\\.quantserve\\.com\\/quant\\.js|\\/quant\\.js)/i"
},
{
"id": "5",
"name": "IndexTools",
"pattern": "/indextools\\.js/i"
},
{
"id": "6",
"name": "SiteMeter",
"pattern": "/sitemeter\\.com\\/js\\/counter\\.js/i"
},
{
"id": "7",
"name": "Lijit",
"pattern": "/www\\.lijit\\.com\\/informers\\/wijits/i"
},
{
"id": "8",
"name": "Omniture",
"pattern": "/(\\/hbx\\.js|\\/s_code[09a-zA-Z_-]*\\.js|\\.omtrdc\\.net\\/|omniunih\\.js|\\/omniunih\\.js)/i"
},
{
"id": "9",
"name": "Crazy Egg",
"pattern": "/cetrk\\.com\\/pages\\/scripts/i"
},
{
"id": "10",
"name": "Snap",
"pattern": "/(shots\\.snap\\.com\\/snap_shots\\.js|spa\\.snap\\.com\\/snap_preview_anywhere\\.js)/i"
},
{
"id": "11",
"name": "Statcounter",
"pattern": "/www\\.statcounter\\.com\\/counter\\/counter[09a-zA-Z_]*\\.js/i"
},
{
"id": "12",
"name": "Piwik Analytics",
"pattern": "/\\/piwik\\.js/i"
},
{
"id": "13",
"name": "Mint",
"pattern": "/\\/mint\\/\\?js/i"
},
{
"id": "14",
"name": "Facebook Beacon",
"pattern": "/facebook\\.com\\/beacon\\//i"
},
{
"id": "15",
"name": "Typepad Stats",
"pattern": "/www\\.typepad\\.com\\/t\\/stats/i"
},
{
"id": "16",
"name": "Wordpress Stats",
"pattern": "/(stats\\.wordpress\\.com\\/|s\\.stats\\.wordpress\\.com\\/w\\.js)/i"
},
{
"id": "17",
"name": "HubSpot",
"pattern": "/\\/salog\\.js\\.aspx/i"
},
{
"id": "18",
"name": "Yahoo Analytics",
"pattern": "/(\\.analytics\\.yahoo\\.com\\/indextools\\.js|\\.yimg\\.com\\/.*\\/ywa\\.js)/i"
},
{
"id": "19",
"name": "OrangeSoda",
"pattern": "/otracking\\.com\\/js/i"
},
{
"id": "20",
"name": "Engagd",
"pattern": "/analytics\\.engagd\\.com\\/archin-std\\.js/i"
},
{
"id": "21",
"name": "Nugg.Ad",
"pattern": "/eu\\.nuggad\\.net\\/bk/i"
},
{
"id": "22",
"name": "Crowd Science",
"pattern": "/static\\.crowdscience\\.com\\/start\\.js/i"
},
{
"id": "23",
"name": "Federated Media",
"pattern": "/(static\\.fmpub\\.net\\/zone\\/|dynamic\\.fmpub\\.net\\/adserver\\/)/i"
},
{
"id": "24",
"name": "OpenAds",
"pattern": "/(d\\.openx\\.org\\/|\\/adg\\.js|\\/ajs\\.php|\\/adx\\.js)/i"
},
{
"id": "25",
"name": "Amazon Associates",
"pattern": "/(www\\.assoc-amazon\\.com\\/e\\/ir|www\\.assoc-amazon\\.com\\/s\\/asw\\.js)/i"
},
{
"id": "26",
"name": "FeedBurner",
"pattern": "/(feeds\\.feedburner\\.com\\/~[fs]\\/|feedproxy\\.google\\.com\\/~fc\\/)/i"
},
{
"id": "27",
"name": "ClustrMaps",
"pattern": "/clustrmaps\\.com\\/counter\\//i"
},
{
"id": "28",
"name": "Feedjit",
"pattern": "/(feedjit\\.com\\/serve\\/|feedjit\\.com\\/map\\/)/i"
},
{
"id": "29",
"name": "Google Adsense",
"pattern": "/(\\.googlesyndication\\.com\\/pagead\\/show_ads\\.js|partner\\.googleadservices\\.com\\/gampad\\/)/i"
},
{
"id": "30",
"name": "HitTail",
"pattern": "/\\.hittail\\.com\\/mlt\\.js/i"
},
{
"id": "31",
"name": "FriendFeed",
"pattern": "/friendfeed\\.com\\/embed\\/widget\\//i"
},
{
"id": "32",
"name": "Woopra",
"pattern": "/\\/woopra\\.js/i"
},
{
"id": "33",
"name": "ScribeFire QuickAds",
"pattern": "/static\\.scribefire\\.com\\/ads\\.js/i"
},
{
"id": "34",
"name": "NetRatings SiteCensus",
"pattern": "/\\.imrworldwide\\.com\\//i"
},
{
"id": "35",
"name": "Doubleclick",
"pattern": "/(ad\\.doubleclick\\.net\\/|\\.doubleclick\\.net\\/pagead\\/)/i"
},
{
"id": "36",
"name": "Tacoda",
"pattern": "/(Tacoda_AMS_DDC_Header\\.js|an\\.tacoda\\.net\\/|an\\.secure\\.tacoda\\.net\\/)/i"
},
{
"id": "37",
"name": "RightMedia",
"pattern": "/(ad\\.yieldmanager\\.com\\/|optimizedby\\.rmxads\\.com|e\\.yieldmanager\\.net\\/script\\.js)/i"
},
{
"id": "38",
"name": "Dynamic Logic",
"pattern": "/(content\\.dl-rms\\.com\\/|\\.dlqm\\.net\\/|\\.questionmarket\\.com\\/)/i"
},
{
"id": "39",
"name": "WebTrends",
"pattern": "/(trackingTags_v1\\.1\\.js|webtrends[09a-zA-Z_]*\\.js|\\.webtrendslive\\.com)/i"
},
{
"id": "40",
"name": "XiTi",
"pattern": "/(\\.xiti\\.com\\/hit\\.xiti|js_xiti\\.js|xtcore.js)/i"
},
{
"id": "41",
"name": "ShareThis",
"pattern": "/(\\/share-this\\.php?akst_action|w\\.sharethis\\.com\\/)/i"
},
{
"id": "42",
"name": "Seesmic",
"pattern": "/(\\/seesmic_topposters_v2\\.js|seesmic-wp\\.js)/i"
},
{
"id": "43",
"name": "AddtoAny",
"pattern": "/static\\.addtoany\\.com\\/menu\\/(feed|page)\\.js/i"
},
{
"id": "44",
"name": "AddThis",
"pattern": "/(\\/addthis_widget\\.(js|php)|\\.addthis\\.com\\/js\\/widget\\.(js|php))/i"
},
{
"id": "45",
"name": "Revenue Science",
"pattern": "/\\.revsci\\.net\\//i"
},
{
"id": "46",
"name": "PointRoll",
"pattern": "/ads\\.pointroll\\.com/i"
},
{
"id": "47",
"name": "ChartBeat",
"pattern": "/\\/chartbeat\\.js?/i"
},
{
"id": "48",
"name": "Clicky",
"pattern": "/(static\\.getclicky\\.com\\/|clicky\\.js)/i"
},
{
"id": "49",
"name": "UserVoice",
"pattern": "/\\.uservoice\\.com\\//i"
},
{
"id": "50",
"name": "Rubicon",
"pattern": "/optimized-by\\.rubiconproject\\.com\\//i"
},
{
"id": "51",
"name": "ConversionRuler",
"pattern": "/www\\.conversionruler\\.com\\/bin\\/js\\.php/i"
},
{
"id": "52",
"name": "Salesforce",
"pattern": "/lct\\.salesforce\\.com\\/sfga\\.js/i"
},
{
"id": "53",
"name": "Sphere",
"pattern": "/\\.sphere\\.com\\/widgets\\/sphereit\\/js/i"
},
{
"id": "54",
"name": "Criteo",
"pattern": "/widget\\.criteo\\.com\\/autoroll\\/display?/i"
},
{
"id": "55",
"name": "Cubics",
"pattern": "/(social\\.bidsystem\\.com\\/|cubics\\.com\\/displayAd\\.js)/i"
},
{
"id": "56",
"name": "InfoLinks",
"pattern": "/resources\\.infolinks\\.com\\/js\\/infolinks_main\\.js/i"
},
{
"id": "57",
"name": "Statisfy",
"pattern": "/statisfy\\.net\\/javascripts\\/stats\\.js/i"
},
{
"id": "58",
"name": "MSN Ads",
"pattern": "/(ads1\\.msn\\.com\\/library\\/dap\\.js|adsyndication\\.msn\\.com\\/delivery\\/getads\\.js)/i"
},
{
"id": "59",
"name": "Outbrain",
"pattern": "/widgets\\.outbrain\\.com\\//i"
},
{
"id": "60",
"name": "Google FriendConnect",
"pattern": "/www\\.google\\.com\\/friendconnect\\/script\\/friendconnect\\.js/i"
},
{
"id": "61",
"name": "SpecificClick",
"pattern": "/\\.specificclick\\.net\\//i"
},
{
"id": "62",
"name": "Microsoft Atlas",
"pattern": "/(\\.atdmt\\.com\\/|\\.adbureau\\.net\\/)/i"
},
{
"id": "63",
"name": "Skribit",
"pattern": "/assets\\.skribit\\.com\\/javascripts\\/SkribitSuggest\\.js/i"
},
{
"id": "64",
"name": "Google Custom Search Engine",
"pattern": "/www\\.google\\.com\\/coop\\/cse\\/brand/i"
},
{
"id": "65",
"name": "Google AJAX Search API",
"pattern": "/www\\.google\\.com\\/uds\\/api?file/i"
},
{
"id": "66",
"name": "Kontera ContentLink",
"pattern": "/kona\\.kontera\\.com\\/javascript\\//i"
},
{
"id": "67",
"name": "AdBrite",
"pattern": "/\\.adbrite\\.com\\//i"
},
{
"id": "68",
"name": "AdultAdWorld",
"pattern": "/(\\.adultadworld\\.com\\/geopop\\/geoinject\\.js|\\.adultadworld\\.com\\/jsc\\/)/i"
},
{
"id": "69",
"name": "Gunggo",
"pattern": "/\\.gunggo\\.com\\/show_ad\\.ashx/i"
},
{
"id": "70",
"name": "DoublePimp",
"pattern": "/doublepimp\\.com\\/getad\\.js/i"
},
{
"id": "71",
"name": "SexInYourCity",
"pattern": "/ads\\.sexinyourcity\\.com\\//i"
},
{
"id": "72",
"name": "Clicksor",
"pattern": "/ads\\.clicksor\\.com/i"
},
{
"id": "73",
"name": "HubSpot WebsiteGrader",
"pattern": "/static\\.hubspot\\.com\\/websiteGraderBadge\\/badge\\.js/i"
},
{
"id": "74",
"name": "Quigo AdSonar",
"pattern": "/js\\.adsonar\\.com\\/js\\//i"
},
{
"id": "75",
"name": "BlogCatalog",
"pattern": "/www\\.blogcatalog\\.com\\/w\\/recent\\.php/i"
},
{
"id": "76",
"name": "Technorati Widget",
"pattern": "/\\.technorati\\.com\\//i"
},
{
"id": "77",
"name": "Alexa Traffic Rank",
"pattern": "/xslt\\.alexa\\.com\\/site_stats\\/js\\/t\\//i"
},
{
"id": "78",
"name": "Tribal Fusion",
"pattern": "/\\.tribalfusion\\.com\\//i"
},
{
"id": "79",
"name": "Disqus",
"pattern": "/disqus\\.com\\/forums\\//i"
},
{
"id": "80",
"name": "Six Apart Advertising",
"pattern": "/ads\\.sixapart\\.com\\//i"
},
{
"id": "81",
"name": "BlogHer Ads",
"pattern": "/ads\\.blogherads\\.com\\//i"
},
{
"id": "82",
"name": "Advertising.com",
"pattern": "/o\\.aolcdn\\.com\\/ads\\/adsWrapper/i"
},
{
"id": "83",
"name": "LeadBack",
"pattern": "/leadback\\.advertising\\.com\\/adcedge\\/lb/i"
},
{
"id": "84",
"name": "DiggThis",
"pattern": "/digg\\.com\\/[09a-zA-Z]*\\/diggthis\\.js/i"
},
{
"id": "85",
"name": "DoubleClick Spotlight",
"pattern": "/\\.doubleclick\\.net\\/activity/i"
},
{
"id": "86",
"name": "Yahoo Overture",
"pattern": "/\\.overture\\.com\\/js/i"
},
{
"id": "87",
"name": "Intense Debate",
"pattern": "/www\\.intensedebate\\.com\\/js\\//i"
},
{
"id": "88",
"name": "Facebook Connect",
"pattern": "/(static\\.ak\\.connect\\.facebook\\.com\\/.*\\.js\\.php|fbconnect\\.js)/i"
},
{
"id": "89",
"name": "BTBuckets",
"pattern": "/static\\.btbuckets\\.com\\/bt\\.js/i"
},
{
"id": "90",
"name": "gumgum",
"pattern": "/gonzogrape\\.gumgum\\.com\\/javascripts\\/ggv2\\.js/i"
},
{
"id": "91",
"name": "YieldBuild",
"pattern": "/hook\\.yieldbuild\\.com\\/s_ad\\.js/i"
},
{
"id": "92",
"name": "Yahoo Buzz",
"pattern": "/d\\.yimg\\.com\\/ds\\/badge\\.js/i"
},
{
"id": "93",
"name": "Baynote Observer",
"pattern": "/baynote-observer\\.js/i"
},
{
"id": "94",
"name": "TriggIt",
"pattern": "/triggit\\.com\\/tool\\/javascripts\\/trg_bs\\.js/i"
},
{
"id": "95",
"name": "Digg Widget",
"pattern": "/digg\\.com\\/tools\\/widgetjs/i"
},
{
"id": "96",
"name": "Blogads",
"pattern": "/cache\\.blogads\\.com\\//i"
},
{
"id": "97",
"name": "Zedo",
"pattern": "/\\.zedo\\.com\\//i"
},
{
"id": "98",
"name": "Vibrant Ads",
"pattern": "/\\.intellitxt\\.com/i"
},
{
"id": "99",
"name": "GetSatisfaction",
"pattern": "/s3\\.amazonaws\\.com\\/getsatisfaction\\.com/i"
},
{
"id": "100",
"name": "Adify",
"pattern": "/ad\\.afy11\\.net\\/srad\\.js/i"
},
{
"id": "101",
"name": "Google Widgets",
"pattern": "/gmodules.com\\//i"
},
{
"id": "102",
"name": "LivePerson",
"pattern": "/server\\.iad\\.liveperson\\.net\\//i"
},
{
"id": "103",
"name": "Kampyle",
"pattern": "/\\/k_push\\.js/i"
},
{
"id": "104",
"name": "ClickTale",
"pattern": "/\\.clicktale\\.net\\//i"
},
{
"id": "105",
"name": "Lotame",
"pattern": "/\\.crwdcntrl\\.net\\//i"
},
{
"id": "106",
"name": "CPX Interactive",
"pattern": "/adserving\\.cpxinteractive\\.com\\//i"
},
{
"id": "107",
"name": "Lynchpin Analytics",
"pattern": "/lypn\\.com\\/lp\\//i"
},
{
"id": "108",
"name": "Trovus Revelations",
"pattern": "/revelations\\.trovus\\.co\\.uk\\/tracker\\//i"
},
{
"id": "109",
"name": "Omniture TouchClarity",
"pattern": "/touchclarity/i"
},
{
"id": "110",
"name": "InsightExpress",
"pattern": "/\\.insightexpressai\\.com\\//i"
},
{
"id": "111",
"name": "Kanoodle",
"pattern": "/\\.kanoodle\\.com\\//i"
},
{
"id": "112",
"name": "BlueKai",
"pattern": "/tags\\.bluekai\\.com\\//i"
},
{
"id": "113",
"name": "Loomia",
"pattern": "/assets\\.loomia\\.com\\/js\\/include\\.js/i"
},
{
"id": "114",
"name": "Others Online",
"pattern": "/othersonline\\.com\\/*\\/[a-z0-9]+\\.js/i"
},
{
"id": "115",
"name": "TwitterCounter",
"pattern": "/twittercounter\\.com\\/remote\\//i"
},
{
"id": "116",
"name": "Thummit",
"pattern": "/rate\\.thummit\\.com\\/js\\//i"
},
{
"id": "117",
"name": "Dotomi",
"pattern": "/\\.dtmpub\\.com\\//i"
},
{
"id": "118",
"name": "Chitika",
"pattern": "/scripts\\.chitika\\.net\\/[09a-zA-Z_]*\\/[09a-zA-Z_]*\\.js/i"
},
{
"id": "119",
"name": "Spot200",
"pattern": "/ad\\.spot200\\.com\\//i"
},
{
"id": "120",
"name": "HitsLink",
"pattern": "/counter\\.hitslink\\.com\\/track\\.js/i"
},
{
"id": "121",
"name": "W3Counter",
"pattern": "/www\\.w3counter\\.com\\/tracker\\.js/i"
},
{
"id": "122",
"name": "AWStats",
"pattern": "/awstats_misc_tracker\\.js/i"
},
{
"id": "123",
"name": "OneStat",
"pattern": "/stat\\.onestat\\.com\\//i"
},
{
"id": "124",
"name": "Twitter Badge",
"pattern": "/twitter\\.com\\/(javascripts\\/[0-9a-z]+\\.js|statuses\\/user_timeline\\/)/i"
},
{
"id": "125",
"name": "DuckDuckGo",
"pattern": "/duckduckgo\\.com\\/[09a-zA-Z_]*\\.js/i"
},
{
"id": "126",
"name": "Bluemetrix",
"pattern": "/\\.bmmetrix\\.com\\//i"
},
{
"id": "127",
"name": "Reinvigorate",
"pattern": "/include\\.reinvigorate\\.net\\//i"
},
{
"id": "128",
"name": "PostRank",
"pattern": "/api\\.postrank\\.com\\//i"
},
{
"id": "129",
"name": "Collarity",
"pattern": "/service\\.collarity\\.com\\//i"
},
{
"id": "130",
"name": "AdaptiveBlue SmartLinks",
"pattern": "/\\.smrtlnks\\.com\\//i"
},
{
"id": "131",
"name": "Tumblr",
"pattern": "/www\\.tumblr\\.com\\/dashboard\\/iframe/i"
},
{
"id": "132",
"name": "BlogRollr",
"pattern": "/blogrollr\\.com\\/embed\\.js/i"
},
{
"id": "133",
"name": "Casale Media",
"pattern": "/\\.casalemedia\\.com\\//i"
},
{
"id": "134",
"name": "BlogCounter",
"pattern": "/track\\.blogcounter\\.de\\//i"
},
{
"id": "135",
"name": "WidgetBucks",
"pattern": "/api\\.widgetbucks\\.com\\/script\\/ads\\.js/i"
},
{
"id": "136",
"name": "Nooked",
"pattern": "/www\\.nooked\\.com\\/javascripts\\/clearspring\\.js/i"
},
{
"id": "137",
"name": "ValueClick Mediaplex",
"pattern": "/\\.mediaplex\\.com\\//i"
},
{
"id": "138",
"name": "JS-Kit",
"pattern": "/(www\\.haloscan\\.com\\/load\\/|js-kit\\.com\\/[0-9a-z\\/]+\\.js)/i"
},
{
"id": "139",
"name": "Bzzster",
"pattern": "/bzzster\\.com\\/widget\\//i"
},
{
"id": "140",
"name": "LeadLander",
"pattern": "/\\/trackalyze\\.js/i"
},
{
"id": "141",
"name": "Burst Media",
"pattern": "/(\\.burstbeacon\\.com\\/|\\.burstnet\\.com\\/)/i"
},
{
"id": "142",
"name": "Zango",
"pattern": "/\\.metricsdirect\\.com\\//i"
},
{
"id": "143",
"name": "Adknowledge",
"pattern": "/(bspixel\\.bidsystem\\.com\\/|bidsystem\\.adknowledge\\.com\\/)/i"
},
{
"id": "144",
"name": "NebuAd",
"pattern": "/\\.nebuadserving\\.com\\//i"
},
{
"id": "145",
"name": "Media6 Degrees",
"pattern": "/\\.media6degrees\\.com\\//i"
},
{
"id": "146",
"name": "FunctionalTrends",
"pattern": "/\\/functionalTrends\\.js/i"
},
{
"id": "147",
"name": "Nuconomy",
"pattern": "/\\.nuconomy\\.com\\/n\\.js/i"
},
{
"id": "148",
"name": "Bluelithium",
"pattern": "/\\.adrevolver\\.com\\//i"
},
{
"id": "149",
"name": "Glam Media",
"pattern": "/\\.glam\\.com\\/app\\/site\\/affiliate\\/viewChannelModule\\.act/i"
},
{
"id": "150",
"name": "Trafic",
"pattern": "/storage\\.trafic\\.ro\\/js\\/trafic\\.js/i"
},
{
"id": "151",
"name": "Lyris ClickTracks",
"pattern": "/\\.clicktracks\\.com\\//i"
},
{
"id": "152",
"name": "Enquisite",
"pattern": "/\\.enquisite\\.com\\/log\\.js/i"
},
{
"id": "153",
"name": "eXTReMe Tracker",
"pattern": "/\\.extreme-dm\\.com\\//i"
},
{
"id": "154",
"name": "Microsoft Analytics",
"pattern": "/analytics\\.live\\.com\\//i"
},
{
"id": "155",
"name": "Sweepery",
"pattern": "/\\.sweepery\\.com\\/javascripts\\/*\\/[09a-zA-Z_]*\\.js/i"
},
{
"id": "156",
"name": "Tell-a-Friend",
"pattern": "/(cdn|taf)\\.socialtwist\\.com[:80]*\\/*\\/(script|shoppr\\.core)\\.js/i"
},
{
"id": "157",
"name": "PercentMobile",
"pattern": "/tracking\\.percentmobile\\.com\\//i"
},
{
"id": "158",
"name": "NetMonitor",
"pattern": "/stat\\.netmonitor\\.fi\\/js\\//i"
},
{
"id": "159",
"name": "Marketo",
"pattern": "/munchkin\\.marketo\\.net\\//i"
},
{
"id": "160",
"name": "Demandbase",
"pattern": "/leads\\.demandbase\\.com\\//i"
},
{
"id": "161",
"name": "FetchBack",
"pattern": "/pixel\\.fetchback\\.com\\//i"
},
{
"id": "162",
"name": "SilverPop",
"pattern": "/gw-services\\.vtrenz\\.net\\//i"
},
{
"id": "163",
"name": "CoreMetrics",
"pattern": "/\\/eluminate\\.js/i"
},
{
"id": "164",
"name": "Magnify360",
"pattern": "/www\\.dialogmgr\\.com\\/tag\\/lib\\.js/i"
},
{
"id": "165",
"name": "Fathom SEO",
"pattern": "/tracking\\.fathomseo\\.com\\//i"
},
{
"id": "166",
"name": "Eloqua",
"pattern": "/elqcfg[xml]*\\.js/i"
},
{
"id": "167",
"name": "Acerno",
"pattern": "/\\.imiclk\\.com\\//i"
},
{
"id": "168",
"name": "Mindset Media",
"pattern": "/\\.mmismm\\.com\\//i"
},
{
"id": "169",
"name": "GoDaddy Site Analytics",
"pattern": "/rt\\.trafficfacts\\.com\\//i"
},
{
"id": "170",
"name": "AdNexus",
"pattern": "/\\.adnxs\\.com\\//i"
},
{
"id": "171",
"name": "AlmondNet",
"pattern": "/\\.pro-market\\.net\\//i"
},
{
"id": "172",
"name": "Collective Media",
"pattern": "/\\.collective-media\\.net\\//i"
},
{
"id": "173",
"name": "eXelate",
"pattern": "/\\.exelator\\.com\\//i"
},
{
"id": "174",
"name": "Fox Audience Network",
"pattern": "/\\.fimserve\\.com\\//i"
},
{
"id": "175",
"name": "interCLICK",
"pattern": "/\\.interclick\\.com\\//i"
},
{
"id": "176",
"name": "NextAction",
"pattern": "/\\.nexac\\.com\\//i"
},
{
"id": "177",
"name": "Traffic Marketplace",
"pattern": "/\\.trafficmp\\.com\\//i"
},
{
"id": "178",
"name": "Turn",
"pattern": "/\\.turn\\.com\\//i"
},
{
"id": "179",
"name": "Real Media",
"pattern": "/\\.realmedia\\.com\\//i"
},
{
"id": "180",
"name": "etracker",
"pattern": "/code\\.etracker\\.com\\//i"
},
{
"id": "181",
"name": "Comscore Beacon",
"pattern": "/beacon\\.(scoreresearch|securestudies)\\.com\\//i"
},
{
"id": "182",
"name": "Bizo",
"pattern": "/\\.bizographics\\.com\\//i"
},
{
"id": "183",
"name": "Snoobi",
"pattern": "/\\.snoobi\\.com\\/snoop\\.php/i"
},
{
"id": "184",
"name": "Rocket Fuel",
"pattern": "/\\.rfihub\\.com\\//i"
},
{
"id": "185",
"name": "ShinyStat",
"pattern": "/(codice|codicebusiness)\\.shinystat\\.(com|it)\\//i"
},
{
"id": "186",
"name": "VisiStat",
"pattern": "/sniff\\.visistat\\.com\\//i"
},
{
"id": "187",
"name": "NedStat",
"pattern": "/\\.sitestat\\.com\\/nedstat\\//i"
},
{
"id": "188",
"name": "Tynt Tracer",
"pattern": "/\\.tynt\\.com\\/javascripts\\/tracer\\.js/i"
},
{
"id": "189",
"name": "i-stats",
"pattern": "/\\.i-stats\\.com\\/js\\/icounter\\.js/i"
},
{
"id": "190",
"name": "Summit Media",
"pattern": "/tracking\\.summitmedia\\.co\\.uk\\/js\\//i"
},
{
"id": "191",
"name": "Yandex.Metrics",
"pattern": "/\\.yandex\\.ru\\/resource\\/watch\\.js/i"
},
{
"id": "192",
"name": "AdRiver",
"pattern": "/ad\\.adriver\\.ru\\//i"
},
{
"id": "193",
"name": "SpyLog",
"pattern": "/\\.spylog\\.(com|ru)\\//i"
},
{
"id": "194",
"name": "ClickFuel",
"pattern": "/\\.conversiondashboard\\.com\\//i"
},
{
"id": "195",
"name": "RapLeaf",
"pattern": "/spruce\\.rapleaf\\.com\\//i"
},
{
"id": "196",
"name": "Zemanta",
"pattern": "/static\\.zemanta\\.com\\//i"
},
{
"id": "197",
"name": "Alexa Metrics",
"pattern": "/(atrk|certify)\\.alexametrics\\.com\\//i"    
},
{
"id": "198",
"name": "ViziSense",
"pattern": "/vizisense\\.komli\\.net\\/pixel\\.js/i"    
},
{
"id": "199",
"name": "phpMyVisites",
"pattern": "/\\/phpmyvisites\\.js/i"
},
{
"id": "200",
"name": "DoubleVerify",
"pattern": "/cdn\\.doubleverify\\.com\\/[09a-zA-Z_-]*\\.js/i"
},
{
"id": "201",
"name": "Statsit",
"pattern": "/one\\.statsit\\.com\\//i"
},
{
"id": "202",
"name": "LeadForce1",
"pattern": "/\\.leadforce1\\.com\\/bf\\/bf\\.js/i"
},
{
"id": "203",
"name": "BackType Widgets",
"pattern": "/widgets\\.backtype\\.com\\//i"
},
{
"id": "204",
"name": "iPerceptions",
"pattern": "/(group11|4qinvite\\.4q)\\.iperceptions\\.com\\//i"
},
{
"id": "205",
"name": "SearchForce",
"pattern": "/\\.searchforce\\.net\\//i"
},
{
"id": "206",
"name": "Tweetboard",
"pattern": "/tweetboard\\.com\\/tb\\.js/i"
},
{
"id": "207",
"name": "TweetMeme",
"pattern": "/tweetmeme\\.com\\/i\\/scripts\\/button\\.js/i"
},
{
"id": "208",
"name": "Zendesk",
"pattern": "/\\.zendesk\\.com\\/external\\/zenbox\\/overlay\\.js/i"
},
{
"id": "209",
"name": "INFOnline",
"pattern": "/\\.ivwbox\\.de\\//i"
},
{
"id": "210",
"name": "RichRelevance",
"pattern": "/media.richrelevance\\.com\\//i"
},
{
"id": "211",
"name": "LiveInternet",
"pattern": "/counter\\.yadro\\.ru\\//i"
},
{
"id": "212",
"name": "vistrac",
"pattern": "/vistrac\\.com\\/static\\/vt\\.js/i"
},
{
"id": "213",
"name": "BLVD Status",
"pattern": "/\\.blvdstatus\\.com\\/js\\/initBlvdJS\\.php/i"
},
{
"id": "214",
"name": "Clixpy",
"pattern": "/clixpy\\.com\\/clixpy\\.js/i"
},
{
"id": "215",
"name": "Logdy",
"pattern": "/logdy\\.com\\/scripts\\/script\\.js/i"
},
{
"id": "216",
"name": "WidgetBox",
"pattern": "/widgetserver\\.com\\/syndication\\/subscriber\\/InsertPanel\\.js/i"
},
{
"id": "217",
"name": "ClearSpring",
"pattern": "/widgets\\.clearspring\\.com\\//i"
},
{
"id": "218",
"name": "Google Website Optimizer",
"pattern": "/\\.google-analytics\\.com\\/siteopt\\.js/i"
},
{
"id": "219",
"name": "Navegg",
"pattern": "/lt\\.navegg\\.com\\/lt\\.js/i"
},
//k8
{
"id": "600",
"name": "LLOOGG",
"pattern": "/lloogg\\.com\\/l\\.js/i"
},
{
"id": "601",
"name": "topadvert",
"pattern": "/topadvert\\.ru\\//i"
},
{
"id": "602",
"name": "redtram",
"pattern": "/redtram\\.com\\/.*?\\.js/i"
},
];

var tshList = [
{
"name": "top.list.ru",
"pattern": "/\\<img\\s+src=[\x22\x27]http:\\/\\/top\\.list\\.ru\\/counter/i"
},
{
"name": "counter.yadro.ru",
"pattern": "/\\<img\\s+src=[\x22\x27]http:\\/\\/counter\\.yadro\\.ru\\/hit/i"
},
{
"name": "edu-all",
"pattern": "/http:\\/\\/ad1\\.edu\\-all\\.ru\\/bb\\.cgi\\?/i"
},
{
"name": "topadvert",
"pattern": "/http:\\/\\/loader\\-topadvert\\.ru\\/load\\.js/i"
},
];



function patternToRegex (pattern) {
  if (!pattern) return null;
  var matches = pattern.match(/^\/(.+)\/(\w*)$/);
  if (!matches) return null;
  var pattern = matches[1];
  var attributes = matches[2];
  if (attributes.length > 0) return new RegExp(pattern, attributes);
  else return new RegExp(pattern);
  return null;
}


function isShit (src) {
  if (!src) return;
  var l = ghsList.length;
  for (var f = 0; f < l; f++) {
    var w = ghsList[f];
    if (w.invalid) continue;
    if (!w.regex) {
      //w.id = parseInt(w.id);
      w.regex = patternToRegex(w.pattern);
      if (!w.regex) {
        w.invalid = true;
        opr.postError("bad regex for "+w.name);
        continue;
      }
    }
    if (src.match(w.regex)) return w;
  }
  return null;
}


function isTextShit (txt) {
  if (!txt) return;
  var l = tshList.length;
  for (var f = 0; f < l; f++) {
    var w = tshList[f];
    if (w.invalid) continue;
    if (!w.regex) {
      //w.id = parseInt(w.id);
      w.regex = patternToRegex(w.pattern);
      if (!w.regex) {
        w.invalid = true;
        opr.postError("bad regex for "+w.name);
        continue;
      }
    }
    if (txt.match(w.regex)) return w;
  }
  return null;
}


opr.addEventListener("BeforeExternalScript", function (ev) {
  var src = ev.element.getAttribute("src");
  //opr.postError("js:"+src);
  var what = isShit(src);
  if (!what) return;
  if (!ghsCache[what.id]) {
    ghsFound.push(what);
    ghsCache[what.id] = true;
  }
  // stop it!
  ev.preventDefault();
  //opr.postError("site blocked: "+what.name+" ("+src+")");
}, false);


opr.addEventListener("BeforeScript", function (ev) {
  var txt = ev.element.text;
  //opr.postError("js:"+txt);
  var what = isTextShit(txt);
  if (!what) return;
  if (!tshCache[what.name]) {
    tshFound.push(what);
    tshCache[what.name] = true;
  }
  // stop it!
  ev.preventDefault();
  //opr.postError("inline blocked: "+what.name);
}, false);


function logWin (donot) {
  var me = this;
  this.donot = donot;
  if (this.donot) return this;

  this.div = doc.createElement("div");
  this.div.setAttribute("style",
    "opacity: 0.8!important;"+
    "position: fixed!important;"+
    "z-index: 9669!important;"+
    "left: 4px!important;"+
    "top: 4px!important;"+
    "background: #007!important;"+
    "color: #ccc!important;"+
    "border: solid 2px #fff!important;"+
    "padding: 4px!important;"+
    "text-decoration: none!important;"+
    "text-align: left!important;"+
    "font-size: 10px!important;"+
    "display: none!important;"+
    ""
  );
  this.empty = true;
  this.added = false;

  this.div.addEventListener("click", function () { me.kill(); }, false);

  this.checkAdd();

  return this;
}

logWin.prototype.checkAdd = function () {
  if (this.donot) return;
  if (!this.added && doc.body) {
    doc.body.appendChild(this.div);
    this.added = true;
  } else {
    var me = this;
    this.tout = setTimeout(function () { me.checkAdd(); }, 10);
  }
};

logWin.prototype.kill = function () {
  if (this.donot) return;
  this.donot = true;
  var d = this.div;
  if (!d.parentNode) return;
  d.style.display = "none";
  setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 0);
};

logWin.prototype.addLine = function (s) {
  if (this.donot) return;
  var d = this.div;
  if (this.empty) {
    this.empty = false;
    d.style.display = "block";
  } else d.appendChild(doc.createElement("br"));
  var b = doc.createElement("i")
  var ds = ""+(new Date());
  //opr.postError(ds+": "+s);
  b.appendChild(doc.createTextNode(ds));
  d.appendChild(b);
  d.appendChild(doc.createTextNode(": "));
  d.appendChild(doc.createTextNode(s));
  this.checkAdd();
};


var xKillPopup = false, xTimeoutId = false, xStartTime = -1, xPassedTime = 0;
var lw = new logWin(true);
var isFocused = false;

var killAllEL;


var defocus = function (ev) {
  lw.addLine("BLUR!");
  killAllEL();
  isFocused = false;
  if (xStartTime > 0) {
    // popup active
    xPassedTime = new Date().getTime()-xStartTime;
    if (xTimeoutId) {
      // stop timer
      clearTimeout(xTimeoutId);
      xTimeoutId = null;
      lw.addLine("interval cleared; passed: "+xPassedTime);
    }
    if (xPassedTime >= popupPause) xStartTime = -666;
    //opr.postError("B: pass:"+xPassedTime+"; stt:"+xStartTime);
  }
  if (xStartTime == -666) {
    if (xKillPopup) xKillPopup();
    win.removeEventListener("blur", arguments.callee, false);
    return;
  }
};


var infocus = function (ev) {
  lw.addLine("FOCUS!");
  killAllEL();
  isFocused = true;
  if (xStartTime >= -1) {
    // popup active
    if (xTimeoutId) {
      // stop timer
      clearTimeout(xTimeoutId);
      xTimeoutId = null;
    }
    lw.addLine("passed: "+xPassedTime);
    if (xPassedTime < popupPause) {
      var now = new Date().getTime();
      xStartTime = now-xPassedTime;
      xTimeoutId = setTimeout(xKillPopup, popupPause-xPassedTime);
      lw.addLine("left: "+(popupPause-xPassedTime));
    } else xStartTime = -666;
    //opr.postError("F: pass:"+xPassedTime+"; stt:"+xStartTime);
  }
  if (xStartTime == -666) {
    if (xKillPopup) xKillPopup();
    win.removeEventListener("focus", arguments.callee, false);
    return;
  }
};


win.addEventListener("blur", defocus, false);
win.addEventListener("focus", infocus, false);

var xfn = function (ev) {
  var ev = ev||window.ev;
  win.removeEventListener(ev.type.toLowerCase(), arguments.callee, false);
  infocus(ev);
};

win.addEventListener("keydown", xfn, false);
win.addEventListener("mousemove", xfn, false);
win.addEventListener("click", xfn, false);

killAllEL = function () {
  win.removeEventListener("keydown", xfn, false);
  win.removeEventListener("mousemove", xfn, false);
  win.removeEventListener("click", xfn, false);
};


opr.addEventListener("BeforeEvent.DOMContentLoaded", function (ev) {
  opr.removeEventListener("BeforeEvent.DOMContentLoaded", arguments.callee, false);
  if (!ghsFound.length) {
    // nothing was found
    xStartTime = -666; // remove handler flag
    return;
  }

  // show info popup
  var popup = doc.createElement("div");
  popup.setAttribute("style",
    "opacity: 0.8!important;"+
    "position: fixed!important;"+
    "z-index: 9666!important;"+
    "top: 15px!important;"+
    "right: 20px!important;"+
    "background: #222!important;"+
    "color: #ff0!important;"+
    "border: solid 1px #000!important;"+
    "text-decoration: none!important;"+
    "text-align: left!important;"+
    //"text-shadow: 0 0 5px #fff;"+
    "font-size: 10px!important;"+
    ""
  );
  var popIn = doc.createElement("div");
  popIn.setAttribute("style",
    "opacity: 0.8!important;"+
    "border: solid 2px #fff!important;"+
    "padding: 7px 10px!important;"+
    "text-decoration: none!important;"+
    "text-align: left!important;"+
    "font-size: 10px!important;"+
    ""
  );
  popup.appendChild(popIn);

  var killPopup = function () {
    lw.kill();
    xStartTime = -666;
    xKillPopup = false;
    if (!popup.parentNode) return;
    popup.style.display = "none";
    setTimeout(function () { popup.parentNode.removeChild(popup); }, 0);
  };
  xKillPopup = killPopup;

  popup.addEventListener("click", killPopup, false);

  function ghURL (bugName) {
    var nn = bugName;
    var nu = nn.replace(/\s+/g, "_").toLowerCase();
    var style = "text-decoration:none;color:#ff0;";
    var s = "<a href='http://www.ghostery.com/apps/"+nu+"' style='"+style+"'>"+nn+"</a>";
    return s;
  }

  var s = "";
  for (f = 0; f < ghsFound.length; f++) {
    if (f) s += "<br>";
    s += ghURL(ghsFound[f].name);
  }
  if (ghsFound.length && tshFound.length) s += "<hr>";
  for (f = 0; f < tshFound.length; f++) {
    if (f) s += "<br>";
    s += tshFound[f].name;
  }
  popIn.innerHTML = s;

  doc.body.appendChild(popup);

  if (isFocused) {
    xStartTime = new Date().getTime();
    xTimeoutId = setTimeout(killPopup, popupPause);
  }
}, false);

})();
