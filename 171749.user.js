// ==UserScript==
// @version        2.9.98.34
// @date        2014-03-31
// @name        Custom Feedly Styles (+ Always Show Left Menu)
// @description    Custom Feedly Styles(wide, slim, clean styles for all Views, open feed in background tab, config menu) Universal script! Works with: Firefox, Chrome, Opera, Pale Moon, Safari, IE...
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_openInTab
// @include        http://feedly.com/*
// @include        https://feedly.com/*
// @installURL    http://userscripts.org/scripts/source/171749.user.js
// @updateURL    http://userscripts.org/scripts/source/171749.meta.js
// @homepageURL    http://userscripts.org/scripts/show/171749
// @screenshot http://s3.amazonaws.com/uso_ss/22593/large.jpg
// @icon http://s3.amazonaws.com/uso_ss/icon/171749/large.png 
// @namespace    CustomFeedlyStyles
// ==/UserScript==
(function (window, unsafeWindow) {
    "use strict";

    /** Declare Variables
   RES(et) Settings true/false;
   LOG to Console true/false
   **/
    var w = unsafeWindow || window,
        def, is, what, lg, RES = false,
        LOG = false,
        CFS_info, name2col, CFS;

    /** Forbid loading script in sub-frames **/
    if (w.self !== w.top) {
        return 1;
    }

    /** Logical fnctions def - defined; is - is type; what - what it is? **/
    def = function (obj) {
        return obj !== undefined && obj !== null;
    };
    is = function (obj, type) {
        var clas = def(type) ? what(obj) : type;
        return def(obj) && clas !== 'undefined' && clas === type;
    };
    what = function (obj) {
        return Object.prototype.toString.call(obj)
            .slice(8, -1)
            .toLowerCase();
    };

    /** Load script only once**/
    if (is(CFS, "object")) {
        return 2;
    }

    lg = function () {
        if (LOG && is(console, "object")) {
            var a = Array.prototype.slice.apply(arguments);
            a.unshift('[CFS]');
            console.log.apply(console, a);
        }
    };

    /** Version/Author info **/
    CFS_info = '<a href="http://userscripts.org/scripts/show/171749">CFS v2.9.98.34</a> by Dexmaster';


    /** Colors stuff **/
    name2col = function (col) {
        if (col) {
            col = col.toLowerCase()
                .replace(/[\|&;\$%@"'\- <>\(\)\+,]/g, "");
        }
        var cols = {
            "aeroblue": "#c9ffe5",
            "airforceblue": "#00308f",
            "airsuperiorityblue": "#72a0c1",
            "alabamacrimson": "#a32638",
            "aliceblue": "#f0f8ff",
            "alloyorange": "#c46210",
            "almond": "#efdecd",
            "amaranth": "#e52b50",
            "amazon": "#3b7a57",
            "amber": "#ffbf00",
            "americanrose": "#ff033e",
            "amethyst": "#9966cc",
            "androidgreen": "#a4c639",
            "antiflashwhite": "#f2f3f4",
            "antiquebrass": "#cd9575",
            "antiquebronze": "#665d1e",
            "antiquefuchsia": " #915c83",
            "antiqueruby": "#841b2d",
            "antiquewhite": "#faebd7",
            "ao": "#008000",
            "applegreen": "#8db600",
            "apricot": "#fbceb1",
            "aqua": "#00ffff",
            "aquamarine": "#7fffd4",
            "armygreen": "#4b5320",
            "arsenic": "#3b444b",
            "arylideyellow": "#e9d66b",
            "ashgrey": "#b2beb5",
            "asparagus": "#87a96b",
            "atomictangerine": "#ff9966",
            "aureolin": "#fdee00",
            "aurometalsaurus": "#6e7f80",
            "avocado": "#568203",
            "azure": "#f0ffff",
            "azuremist": "#f0ffff",
            "babyblue": "#89cff0",
            "babyblueeyes": "#a1caf1",
            "babypowder": "#fefefa",
            "bakermillerpink": "#ff91af",
            "ballblue": "#21abcd",
            "bananamania": "#fae7b5",
            "bananayellow": "#ffe135",
            "barnred": "#7c0a02",
            "bazaar": "#98777b",
            "bdazzledblue": "#2e5894",
            "beaver": "#9f8170",
            "beige": "#f5f5dc",
            "bigdiporuby": "#9c2542",
            "bisque": "#ffe4c4",
            "bistre": "#3d2b1f",
            "bitterlemon": "#cae00d",
            "bitterlime": "#bfff00",
            "bittersweet": "#fe6f5e",
            "bittersweetshimmer": "#bf4f51",
            "black": "#000000",
            "blackbean": "#3d0c02",
            "blackleatherjacket": "#253529",
            "blackolive": "#3b3c36",
            "blanchedalmond": "#ffebcd",
            "blastoffbronze": "#a57164",
            "blazeorange": "#ff6700",
            "bleudefrance": "#318ce7",
            "blizzardblue": "#ace5ee",
            "blond": "#faf0be",
            "blue": "#0000ff",
            "bluebell": "#a2a2d0",
            "blueberry": "#4f86f7",
            "bluebondi": "#0095b6",
            "bluebonnet": "#1c1cf0",
            "bluedefrance": "#318ce7",
            "bluegray": "#6699cc",
            "bluegreen": "#0d98ba",
            "bluegrey": "#6699cc",
            "bluesapphire": "#126180",
            "blueviolet": "#8a2be2",
            "blush": "#de5d83",
            "bole": "#79443b",
            "bondiblue": "#0095b6",
            "bone": "#e3dac9",
            "bostonunired": "#cc0000",
            "bostonuniversityred": "#cc0000",
            "bottlegreen": "#006a4e",
            "boysenberry": "#873260",
            "brandeisblue": "#0070ff",
            "brass": "#b5a642",
            "brickred": "#cb4154",
            "brightcerulean": "#1dacd6",
            "brightgreen": "#66ff00",
            "brightlavender": "#bf94e4",
            "brightmaroon": "#c32148",
            "brightpink": "#ff007f",
            "brightturquoise": "#08e8de",
            "brightube": "#d19fe8",
            "brinkpink": "#fb607f",
            "britishracinggreen": "#004225",
            "bronze": "#cd7f32",
            "bronzeyellow": "#737000",
            "brown": "#a52a2a",
            "brunswickgreen": "#1b4d3e",
            "bubblegum": "#ffc1cc",
            "bubbles": "#e7feff",
            "buff": "#f0dc82",
            "bulgarianrose": "#480607",
            "burgundy": "#800020",
            "burlywood": "#deb887",
            "burntorange": "#cc5500",
            "burntsienna": "#e97451",
            "burntumber": "#8a3324",
            "byzantine": "#bd33a4",
            "byzantium": "#702963",
            "cadet": "#536872",
            "cadetblue": "#5f9ea0",
            "cadetgrey": "#91a3b0",
            "cadmiumgreen": "#006b3c",
            "cadmiumorange": "#ed872d",
            "cadmiumred": "#e30022",
            "cadmiumyellow": "#fff600",
            "cafnoir": "#4b3621",
            "calpolygreen": "#1e4d2b",
            "cambridgeblue": "#a3c1ad",
            "cameopink": "#efbbcc",
            "camouflagegreen": "#78866b",
            "canaryyellow": "#ffef00",
            "candyapplered": "#ff0800",
            "candypink": "#e4717a",
            "caputmortuum": "#592720",
            "cardinal": "#c41e3a",
            "caribbeangreen": "#00cc99",
            "carmine": "#960018",
            "carminepink": "#eb4c42",
            "carminered": "#ff0038",
            "carnationpink": "#ffa6c9",
            "carnelian": "#b31b1b",
            "carolinablue": "#99badd",
            "carrotorange": "#ed9121",
            "castletongreen": "#00563f",
            "catalinablue": "#062a78",
            "cedarchest": "#c95a49",
            "ceil": "#92a1cf",
            "celadon": "#ace1af",
            "celadonblue": "#007ba7",
            "celadongreen": "#2f847c",
            "celeste": "#b2ffff",
            "celestialblue": "#4997d0",
            "cerisepink": "#ec3b83",
            "ceruleanblue": "#2a52be",
            "ceruleanfrost": "#6d9bc3",
            "cgblue": "#007aa5",
            "cgred": "#e03c31",
            "chadgray": "#8b8589",
            "chamoisee": "#a0785a",
            "champagne": "#f7e7ce",
            "charcoal": "#36454f",
            "charlestongreen": "#232b2b",
            "charmpink": "#e68fac",
            "chartreuse": "#dfff00",
            "cherry": "#de3163",
            "cherryblossompink": "#ffb7c5",
            "chestnut": "#954535",
            "chinapink": "#de6fa1",
            "chinarose": "#a8516e",
            "chinesered": "#aa381e",
            "chocolate": "#7b3f00",
            "chromeyellow": "#ffa700",
            "cinereous": "#98817b",
            "cinnabar": "#e34234",
            "cinnamon": "#d2691e",
            "citrine": "#e4d00a",
            "citron": "#9fa91f",
            "claret": "#7f1734",
            "classicrose": "#fbcce7",
            "cobalt": "#0047ab",
            "coconut": "#965a3e",
            "coffee": "#6f4e37",
            "columbiablue": "#9bddff",
            "coolblack": "#002e63",
            "coolgrey": "#8c92ac",
            "copper": "#b87333",
            "coppercrayola": "#da8a67",
            "copperpenny": "#ad6f69",
            "copperred": "#cb6d51",
            "copperrose": "#996666",
            "coquelicot": "#ff3800",
            "coral": "#ff7f50",
            "coralred": "#ff4040",
            "cordovan": "#893f45",
            "corn": "#fbec5d",
            "cornflowerblue": "#6495ed",
            "cornsilk": "#fff8dc",
            "cosmiclatte": "#fff8e7",
            "cottoncandy": "#ffbcd9",
            "crayola": "#1f75fe",
            "cream": "#fffdd0",
            "crimson": "#dc143c",
            "crimsonglory": "#be0032",
            "cyan": "#00ffff",
            "cybergrape": "#58427c",
            "daffodil": "#ffff31",
            "dandelion": "#f0e130",
            "darkblue": "#00008b",
            "darkbluegray": "#666699",
            "darkbrown": "#654321",
            "darkbyzantium": "#5d3954",
            "darkcandyapplered": "#a40000",
            "darkcerulean": "#08457e",
            "darkchestnut": "#986960",
            "darkcoral": "#cd5b45",
            "darkcyan": "#008b8b",
            "darkelectricblue": "#536878",
            "darkgoldenrod": "#b8860b",
            "darkgray": "#a9a9a9",
            "darkgreen": "#013220",
            "darkgrey": "#a9a9a9",
            "darkjunglegreen": "#1a2421",
            "darkkhaki": "#bdb76b",
            "darklava": "#483c32",
            "darklavender": "#734f96",
            "darkmagenta": "#8b008b",
            "darkmidnightblue": "#003366",
            "darkolivegreen": "#556b2f",
            "darkorange": "#ff8c00",
            "darkorchid": "#9932cc",
            "darkpastelblue": "#779ecb",
            "darkpastelgreen": "#03c03c",
            "darkpastelpurple": "#966fd6",
            "darkpastelred": "#c23b22",
            "darkpink": "#e75480",
            "darkpowderblue": "#003399",
            "darkraspberry": "#872657",
            "darkred": "#8b0000",
            "darksalmon": "#e9967a",
            "darkscarlet": "#560319",
            "darkseagreen": "#8fbc8f",
            "darksienna": "#3c1414",
            "darkskyblue": "#8cbed6",
            "darkslateblue": "#483d8b",
            "darkslategray": "#2f4f4f",
            "darkspringgreen": "#177245",
            "darktan": "#918151",
            "darktangerine": "#ffa812",
            "darkterracotta": "#cc4e5c",
            "darkturquoise": "#00ced1",
            "darkvanilla": "#d1bea8",
            "darkviolet": "#9400d3",
            "darkyellow": "#9b870c",
            "dartmouthgreen": "#00703c",
            "davysgrey": "#555555",
            "debianred": "#d70a53",
            "deepcarmine": "#a9203e",
            "deepcarminepink": "#ef3038",
            "deepcarrotorange": "#e9692c",
            "deepcerise": "#da3287",
            "deepchampagne": "#fad6a5",
            "deepchestnut": "#b94e48",
            "deepcoffee": "#704241",
            "deepfuchsia": "#c154c1",
            "deepjunglegreen": "#004b49",
            "deeplemon": "#f5c71a",
            "deeplilac": "#9955bb",
            "deepmagenta": "#cc00cc",
            "deepmauve": "#d473d4",
            "deeppeach": "#ffcba4",
            "deeppink": "#ff1493",
            "deepruby": "#843f5b",
            "deepsaffron": "#ff9933",
            "deepskyblue": "#00bfff",
            "deepspacesparkle": "#4a646c",
            "deeptaupe": "#7e5e60",
            "deeptuscanred": "#66424d",
            "deer": "#ba8759",
            "denim": "#1560bd",
            "desert": "#c19a6b",
            "desertsand": "#edc9af",
            "diamond": "#7d1242",
            "dimgray": "#696969",
            "dirt": "#9b7653",
            "dodgerblue": "#1e90ff",
            "dogwoodrose": "#d71868",
            "dollarbill": "#85bb65",
            "drab": "#967117",
            "dukeblue": "#00009c",
            "duststorm": "#e5ccc9",
            "earthyellow": "#e1a95f",
            "ebony": "#555d50",
            "ecru": "#c2b280",
            "eggplant": "#614051",
            "eggshell": "#f0ead6",
            "egyptianblue": "#1034a6",
            "eigengrau": "#16161D",
            "electricblue": "#7df9ff",
            "electriccrimson": "#ff003f",
            "electricgreen": "#00ff00",
            "electricindigo": "#6f00ff",
            "electriclavender": "#f4bbff",
            "electriclime": "#ccff00",
            "electricpurple": "#bf00ff",
            "electricultramarine": "#3f00ff",
            "electricviolet": "#8f00ff",
            "electricyellow": "#ffff33",
            "emerald": "#50c878",
            "emoblack": "#171717",
            "englishlavender": "#b48395",
            "englishred": "#ab4b52",
            "etonblue": "#96c8a2",
            "eucalyptus": "#44d7a8",
            "falured": "#801818",
            "fandango": "#b53389",
            "fandangopink": "#de5285",
            "fashionfuchsia": "#f400a1",
            "fawn": "#e5aa70",
            "feldgrau": "#4d5d53",
            "feldspar": "#fdd5b1",
            "ferngreen": "#4f7942",
            "ferrarired": "#ff2800",
            "fielddrab": "#6c541e",
            "findthebestblue": "#00ccff",
            "findthecompanyred": "#c51f1f",
            "findthecoupongreen": "#9ece08",
            "findthedatagreen": "#1d6660",
            "findthelistingpink": "#e83895",
            "fire": "#d70000",
            "firebrick": "#b22222",
            "fireenginered": "#ce2029",
            "flame": "#e25822",
            "flamingopink": "#fc8eac",
            "flattery": "#6b4423",
            "flavescent": "#f7e98e",
            "flax": "#eedc82",
            "floralwhite": "#fffaf0",
            "folly": "#ff004f",
            "forestgreen": "#228b22",
            "frenchbeige": "#a67b5b",
            "frenchbistre": "#856d4d",
            "frenchblue": "#0072bb",
            "frenchlilac": "#86608e",
            "frenchlime": "#9efd38",
            "frenchraspberry": "#c72c48",
            "frenchrose": "#f64a8a",
            "frenchskyblue": "#77b5fe",
            "frenchwine": "#ac1e44",
            "freshair": "#a6e7ff",
            "fuchsia": "#ff00ff",
            "fuchsiapink": "#ff77ff",
            "fuchsiarose": "#c74375",
            "fulvous": "#e48400",
            "fuzzywuzzy": "#cc6666",
            "gainsboro": "#dcdcdc",
            "gamboge": "#e49b0f",
            "ghostwhite": "#f8f8ff",
            "giantsorange": "#fe5a1d",
            "ginger": "#b06500",
            "glaucous": "#6082b6",
            "glitter": "#e6e8fa",
            "gogreen": "#00ab66",
            "gold": "#ffd700",
            "goldenbrown": "#996515",
            "goldenpoppy": "#fcc200",
            "goldenrod": "#daa520",
            "goldenyellow": "#ffdf00",
            "goldfusion": "#85754e",
            "grannysmithapple": "#a8e4a0",
            "grape": "#6f2da8",
            "gray": "#808080",
            "grayasparagus": "#465945",
            "green": "#1cac78",
            "greenmachine": "#3df500",
            "greenyellow": "#adff2f",
            "grey": "#808080",
            "grullo": "#a99a86",
            "guppiegreen": "#00ff7f",
            "halaybe": "#663854",
            "hanblue": "#446ccf",
            "hanpurple": "#5218fa",
            "harlequin": "#3fff00",
            "harvardcrimson": "#c90016",
            "harvestgold": "#da9100",
            "heliotrope": "#df73ff",
            "honeydew": "#f0fff0",
            "honolulublue": "#006db0",
            "hookersgreen": "#49796b",
            "hotmagenta": "#ff1dce",
            "hotpink": "#ff69b4",
            "huntergreen": "#355e3b",
            "iceberg": "#71a6d2",
            "icterine": "#fcf75e",
            "illuminatingemerald": "#319177",
            "imperial": "#602f6b",
            "imperialblue": "#002395",
            "inchworm": "#b2ec5d",
            "indiagreen": "#138808",
            "indianred": "#cd5c5c",
            "indianyellow": "#e3a857",
            "indigo": "#4b0082",
            "indigodye": "#00416a",
            "internationalkleinblue": "#002fa7",
            "internationalorange": "#ff4f00",
            "iris": "#5a4fcf",
            "irresistible": "#b3446c",
            "isabelline": "#f4f0ec",
            "islamicgreen": "#009000",
            "ivory": "#fffff0",
            "jade": "#00a86b",
            "jasmine": "#f8de7e",
            "jasper": "#d73b3e",
            "jazzberryjam": "#a50b5e",
            "jellybean": "#da614e",
            "jet": "#343434",
            "jonquil": "#f4ca16",
            "junebud": "#bdda57",
            "junglegreen": "#29ab87",
            "kandyred": "#ff2448",
            "kellygreen": "#4cbb17",
            "kenyancopper": "#7c1c05",
            "khaki": "#c3b091",
            "kobe": "#882d17",
            "kobi": "#e79fc4",
            "kucrimson": "#e8000d",
            "languidlavender": "#d6cadd",
            "lapislazuli": "#26619c",
            "lasallegreen": "#087830",
            "laserlemon": "#ffff66",
            "laured": "#f60018",
            "laurelgreen": "#a9ba9d",
            "lava": "#cf1020",
            "lavender": "#e6e6fa",
            "lavenderblue": "#ccccff",
            "lavenderblush": "#fff0f5",
            "lavenderfloral": "#b57edc",
            "lavendergray": "#c4c3d0",
            "lavenderindigo": "#9457eb",
            "lavendermagenta": "#ee82ee",
            "lavendermist": "#e6e6fa",
            "lavenderpink": "#fbaed2",
            "lavenderpurple": "#967bb6",
            "lavenderrose": "#fba0e3",
            "lawngreen": "#7cfc00",
            "lemon": "#fff700",
            "lemonchiffon": "#fffacd",
            "lemoncurry": "#cca01d",
            "lemonlime": "#e3ff00",
            "lemonmeringue": "#f6eabe",
            "lemonyellow": "#fff44f",
            "licorice": "#1a1110",
            "lightblue": "#add8e6",
            "lightbrown": "#b5651d",
            "lightcarminepink": "#e66771",
            "lightcoral": "#f08080",
            "lightcornflowerblue": "#93ccea",
            "lightcrimson": "#f56991",
            "lightcyan": "#e0ffff",
            "lightfuchsiapink": "#f984ef",
            "lightgoldenrodyellow": "#fafad2",
            "lightgray": "#d3d3d3",
            "lightgreen": "#90ee90",
            "lightgrey": "#d3d3d3",
            "lightkhaki": "#f0e68c",
            "lightmediumorchid": "#d39bcb",
            "lightorchid": "#e6a8d7",
            "lightpastelpurple": "#b19cd9",
            "lightpink": "#ffb6c1",
            "lightsalmon": "#ffa07a",
            "lightsalmonpink": "#ff9999",
            "lightseagreen": "#20b2aa",
            "lightskyblue": "#87cefa",
            "lightslategray": "#778899",
            "lightslategrey": "#778899",
            "lightsteelblue": "#b0c4de",
            "lighttaupe": "#b38b6d",
            "lightyellow": "#ffffe0",
            "lilac": "#c8a2c8",
            "lime": "#00ff00",
            "limegreen": "#32cd32",
            "limerick": "#9dc209",
            "lincolngreen": "#195905",
            "linen": "#faf0e6",
            "littleboyblue": "#6ca0dc",
            "liver": "#534b4f",
            "lumber": "#ffe4cd",
            "lust": "#e62020",
            "magenta": "#ff00ff",
            "magentacrayola": "#ff55a3",
            "magentadye": "#ca1f7b",
            "magentapantone": "#d0417e",
            "magentaprocess": "#ff0090",
            "magicmint": "#aaf0d1",
            "magnolia": "#f8f4ff",
            "mahogany": "#c04000",
            "majorelleblue": "#6050dc",
            "malachite": "#0bda51",
            "manatee": "#979aaa",
            "mangotango": "#ff8243",
            "mantis": "#74c365",
            "mardigras": "#880085",
            "maroon": "#800000",
            "mauve": "#e0b0ff",
            "mauvelous": "#ef98aa",
            "mauvetaupe": "#915f6d",
            "mayablue": "#73c2fb",
            "meatbrown": "#e5b73b",
            "mediumaquamarine": "#66ddaa",
            "mediumblue": "#0000cd",
            "mediumcandyapplered": "#e2062c",
            "mediumcarmine": "#af4035",
            "mediumchampagne": "#f3e5ab",
            "mediumelectricblue": "#035096",
            "mediumjunglegreen": "#1c352d",
            "mediumlavendermagenta": "#dda0dd",
            "mediumorchid": "#ba55d3",
            "mediumpersianblue": "#0067a5",
            "mediumpurple": "#9370db",
            "mediumredviolet": "#bb3385",
            "mediumruby": "#aa4069",
            "mediumseagreen": "#3cb371",
            "mediumskyblue": "#80daeb",
            "mediumslateblue": "#7b68ee",
            "mediumspringbud": "#c9dc87",
            "mediumspringgreen": "#00fa9a",
            "mediumtaupe": "#674c47",
            "mediumturquoise": "#48d1cc",
            "mediumvermilion": "#d9603b",
            "mediumvioletred": "#c71585",
            "mellowapricot": "#f8b878",
            "melon": "#fdbcb4",
            "metallicseaweed": "#0a7e8c",
            "metallicsunburst": "#9c7c38",
            "mexicanpink": "#e4007c",
            "midnightblue": "#191970",
            "midnightgreeneaglegreen": "#004953",
            "midori": "#e3f988",
            "mikadoyellow": "#ffc40c",
            "mint": "#3eb489",
            "mintcream": "#f5fffa",
            "mintgreen": "#98ff98",
            "mistyrose": "#ffe4e1",
            "moccasin": "#faebd7",
            "moonstoneblue": "#73a9c2",
            "mordantred19": "#ae0c00",
            "mossgreen": "#addfad",
            "mountainmeadow": "#30ba8f",
            "mountbattenpink": "#997a8d",
            "msugreen": "#18453b",
            "mulberry": "#c54b8c",
            "mustard": "#ffdb58",
            "myrtle": "#21421e",
            "nadeshikopink": "#f6adc6",
            "napiergreen": "#2a8000",
            "naplesyellow": "#fada5e",
            "navajowhite": "#ffdead",
            "navy": "#000080",
            "navyblue": "#000080",
            "neoncarrot": "#ffa343",
            "neonfuchsia": "#fe4164",
            "neongreen": "#39ff14",
            "newcar": "#214fc6",
            "newyorkpink": "#d7837f",
            "nonphotoblue": "#a4dded",
            "northtexasgreen": "#059033",
            "nyanza": "#e9ffdb",
            "oceanboatblue": "#0077be",
            "ochre": "#cc7722",
            "oldburgundy": "#43302e",
            "oldgold": "#cfb53b",
            "oldlace": "#fdf5e6",
            "oldlavender": "#796878",
            "oldmauve": "#673147",
            "oldrose": "#c08081",
            "oldsilver": "#848482",
            "olive": "#808000",
            "olivedrab": "#6b8e23",
            "olivedrab7": "#3c341f",
            "olivine": "#9ab973",
            "onyx": "#353839",
            "operamauve": "#b784a7",
            "orange": "#ff7f00",
            "orangepeel": "#ff9f00",
            "orangered": "#ff4500",
            "orchid": "#da70d6",
            "orchidpink": "#f28dcd",
            "oriolesorange": "#fb4f14",
            "outerspace": "#414a4c",
            "outrageousorange": "#ff6e4a",
            "oxfordblue": "#002147",
            "pakistangreen": "#006600",
            "palatinateblue": "#273be2",
            "palatinatepurple": "#682860",
            "paleaqua": "#bcd4e6",
            "paleblue": "#afeeee",
            "palebrown": "#987654",
            "palecerulean": "#9bc4e2",
            "palechestnut": "#ddadaf",
            "palecornflowerblue": "#abcdef",
            "palegold": "#e6be8a",
            "palegoldenrod": "#eee8aa",
            "palegreen": "#98fb98",
            "palelavender": "#dcd0ff",
            "palemagenta": "#f984e5",
            "palepink": "#fadadd",
            "paleredviolet": "#db7093",
            "palerobineggblue": "#96ded1",
            "palesilver": "#c9c0bb",
            "palespringbud": "#ecebbd",
            "paletaupe": "#bc987e",
            "paleturquoise": "#afeeee",
            "palevioletred": "#d87093",
            "pansypurple": "#78184a",
            "papayawhip": "#ffefd5",
            "pastelblue": "#aec6cf",
            "pastelbrown": "#836953",
            "pastelgray": "#cfcfc4",
            "pastelgreen": "#77dd77",
            "pastelmagenta": "#f49ac2",
            "pastelorange": "#ffb347",
            "pastelpink": "#dea5a4",
            "pastelpurple": "#b39eb5",
            "pastelred": "#ff6961",
            "pastelviolet": "#cb99c9",
            "pastelyellow": "#fdfd96",
            "patriarch": "#800080",
            "peach": "#ffe5b4",
            "peachorange": "#ffcc99",
            "peachpuff": "#ffdab9",
            "peachyellow": "#fadfad",
            "peachykeen": "#ff6130",
            "pear": "#d1e231",
            "pearl": "#eae0c8",
            "pearlaqua": "#88d8c0",
            "pearlypurple": "#b768a2",
            "peridot": "#e6e200",
            "persianblue": "#1c39bb",
            "persiangreen": "#00a693",
            "persianindigo": "#32127a",
            "persianorange": "#d99058",
            "persianpink": "#f77fbe",
            "persianplum": "#701c1c",
            "persianred": "#cc3333",
            "persianrose": "#fe28a2",
            "persimmon": "#ec5800",
            "peru": "#cd853f",
            "phlox": "#df00ff",
            "phthaloblue": "#000f89",
            "phthalogreen": "#123524",
            "pictorialcarmine": "#c30b4e",
            "piggypink": "#fddde6",
            "pinegreen": "#01796f",
            "pink": "#ffc0cb",
            "pinklace": "#ffddf4",
            "pinkpearl": "#e7accf",
            "pinksherbet": "#f78fa7",
            "pistachio": "#93c572",
            "platinum": "#e5e4e2",
            "plum": "#dda0dd",
            "plumtraditional": "#8e4585",
            "portlandorange": "#ff5a36",
            "powderblue": "#b0e0e6",
            "princesspink": "#ff6e8c",
            "princetonorange": "#ff8f00",
            "prussianblue": "#003153",
            "puce": "#cc8899",
            "pumpkin": "#ff7518",
            "purple": "#800080",
            "purpleheart": "#69359c",
            "purplemountainmajesty": "#9678b6",
            "purplepizzazz": "#fe4eda",
            "purpletaupe": "#50404d",
            "quartz": "#51484f",
            "queenblue": "#436b95",
            "queenpink": "#e8ccd7",
            "rackley": "#5d8aa8",
            "radicalred": "#ff355e",
            "rajah": "#fbab60",
            "raspberry": "#e30b5d",
            "raspberrypink": "#e25098",
            "rawumber": "#826644",
            "razzledazzlerose": "#ff33cc",
            "razzmatazz": "#e3256b",
            "razzmicberry": "#8d4e85",
            "red": "#ff0000",
            "redbrick": "#cb4154",
            "redbrown": "#a52a2a",
            "reddevil": "#860111",
            "redorange": "#ff5349",
            "regalia": "#522d80",
            "resolutionblue": "#002387",
            "rhythm": "#777696",
            "richblack": "#004040",
            "richbrilliantlavender": "#f1a7fe",
            "richcarmine": "#d70040",
            "richelectricblue": "#0892d0",
            "richlavender": "#a76bcf",
            "richlilac": "#b666d2",
            "richmaroon": "#b03060",
            "riflegreen": "#414833",
            "robineggblue": "#00cccc",
            "rocketmetallic": "#8a7f80",
            "romansilver": "#838996",
            "rosebonbon": "#f9429e",
            "roseebony": "#674846",
            "rosegold": "#b76e79",
            "rosemadder": "#e32636",
            "rosepink": "#ff66cc",
            "rosequartz": "#aa98a9",
            "rosetaupe": "#905d5d",
            "rosevale": "#ab4e52",
            "rosewood": "#65000b",
            "rossocorsa": "#d40000",
            "rosybrown": "#bc8f8f",
            "royalazure": "#0038a8",
            "royalblue": "#002366",
            "royalblueweb": "#4169e1",
            "royalfuchsia": "#ca2c92",
            "royalpurple": "#7851a9",
            "ruber": "#ce4676",
            "rubinered": "#d10056",
            "ruby": "#e0115f",
            "rubyred": "#9b111e",
            "ruddy": "#ff0028",
            "ruddybrown": "#bb6528",
            "ruddypink": "#e18e96",
            "rufous": "#a81c07",
            "russet": "#80461b",
            "rust": "#b7410e",
            "rustyred": "#da2c43",
            "saddlebrown": "#8b4513",
            "saeeceambercolor": "#ff7e00",
            "safetyorange": "#ff6700",
            "saffron": "#f4c430",
            "salmon": "#ff8c69",
            "salmonpink": "#ff91a4",
            "sandstorm": "#ecd540",
            "sandybrown": "#f4a460",
            "sangria": "#92000a",
            "sapgreen": "#507d2a",
            "sapphire": "#0f52ba",
            "satinsheengold": "#cba135",
            "scarlet": "#ff2400",
            "scarletcrayola": "#fd0e35",
            "schnurrple": "#3c144f",
            "schoolbusyellow": "#ffd800",
            "screamingreen": "#76ff7a",
            "seablue": "#006994",
            "seagreen": "#2e8b57",
            "sealbrown": "#321414",
            "seashell": "#fff5ee",
            "selectiveyellow": "#ffba00",
            "sepia": "#704214",
            "shadow": "#8a795d",
            "shampoo": "#ffcff1",
            "shamrockgreen": "#009e60",
            "sheengreen": "#8fd400",
            "shimmeringblush": "#d98695",
            "shockingpink": "#fc0fc0",
            "shockingpinkcrayola": "#ff6fff",
            "sienna": "#a0522d",
            "silver": "#c0c0c0",
            "silverchalice": "#acacac",
            "silverpink": "#c4aead",
            "silversand": "#bfc1c2",
            "sinopia": "#cb410b",
            "skobeloff": "#007474",
            "skyblue": "#87ceeb",
            "skymagenta": "#cf71af",
            "slateblue": "#6a5acd",
            "slategray": "#708090",
            "slategrey": "#708090",
            "smitten": "#c84186",
            "smoke": "#738276",
            "smokeytopaz": "#933d41",
            "smokyblack": "#100c08",
            "snow": "#fffafa",
            "soap": "#cec8ef",
            "sonicsilver": "#757575",
            "spacecadet": "#1d2951",
            "spanishbistre": "#80755a",
            "spanishcarmine": "#d10047",
            "spanishcrimson": "#e51a4c",
            "spanishorange": "#e86100",
            "spanishskyblue": "#00aae4",
            "spiritualpurple": "#a54398",
            "spirodiscoball": "#0fc0fc",
            "springbud": "#a7fc00",
            "springgreen": "#00ff7f",
            "starcommandblue": "#007bbb",
            "steelblue": "#4682b4",
            "steelpink": "#cc3366",
            "stizza": "#990000",
            "stormcloud": "#4f666a",
            "stpatricksblue": "#23297a",
            "straw": "#e4d96f",
            "strawberry": "#fc5a8d",
            "sunglow": "#ffcc33",
            "superpink": "#cf6ba9",
            "tan": "#d2b48c",
            "tangelo": "#f94d00",
            "tangerine": "#f28500",
            "tawny": "#cd5700",
            "teagreen": "#d0f0c0",
            "teal": "#008080",
            "tealblue": "#367588",
            "tealdeer": "#99e6b3",
            "tealgreen": "#00827f",
            "tearoseorange": "#f88379",
            "tearoserose": "#f4c2c2",
            "telemagenta": "#cf3476",
            "terracotta": "#e2725b",
            "thistle": "#d8bfd8",
            "ticklemepink": "#fc89ac",
            "tiffanyblue": "#0abab5",
            "tigerseye": "#e08d3c",
            "timberwolf": "#dbd7d2",
            "titaniumyellow": "#eee600",
            "tomato": "#ff6347",
            "toolbox": "#746cc0",
            "topaz": "#ffc87c",
            "tropicalrainforest": "#00755e",
            "trueblue": "#0073cf",
            "tuftsblue": "#417dc1",
            "tulip": "#ff878d",
            "tumbleweed": "#deaa88",
            "turkishrose": "#b57281",
            "turquoise": "#30d5c8",
            "turquoiseblue": "#00ffef",
            "turquoisegreen": "#a0d6b4",
            "tuscanred": "#7c4848",
            "tuscany": "#c09999",
            "twilightlavender": "#8a496b",
            "tyrianpurple": "#66023c",
            "uablue": "#0033aa",
            "uared": "#d9004c",
            "ube": "#8878c3",
            "uclablue": "#536895",
            "uclagold": "#ffb300",
            "ufogreen": "#3cd070",
            "ultramarine": "#120a8f",
            "ultramarineblue": "#4166f5",
            "umber": "#635147",
            "unbleachedsilk": "#ffddca",
            "unitednationsblue": "#5b92e5",
            "universityofcaliforniagold": "#b78727",
            "universityoftennesseeorange": "#f77f00",
            "upforestgreen": "#014421",
            "upmaroon": "#7b1113",
            "upsdellred": "#ae2029",
            "urobilin": "#e1ad21",
            "usaf": "#00308f",
            "usafablue": "#004f98",
            "uscgold": "#ffcc00",
            "utahcrimson": "#d3003f",
            "vanillaice": "#f3d9df",
            "vegasgold": "#c5b358",
            "venetianred": "#c80815",
            "verdigris": "#43b3ae",
            "veronica": "#a020f0",
            "vintagemauve": "#b9adad",
            "violet": "#9f00ff",
            "violetblue": "#324ab2",
            "violetred": "#f75394",
            "viridian": "#40826d",
            "vividauburn": "#922724",
            "vividburgundy": "#9f1d35",
            "vividcerise": "#da1d81",
            "vividorchid": "#cc00ff",
            "vividtangerine": "#ffa089",
            "warmblack": "#004242",
            "waterspout": "#a4f4f9",
            "wenge": "#645452",
            "wheat": "#f5deb3",
            "white": "#ffffff",
            "whitesmoke": "#f5f5f5",
            "wildblueyonder": "#a2add0",
            "wildorchid": "#d77a02",
            "wildstrawberry": "#ff43a4",
            "wildwatermelon": "#fc6c85",
            "windsortan": "#ae6838",
            "wine": "#722f37",
            "wisteria": "#c9a0dc",
            "xanadu": "#738678",
            "yaleblue": "#0f4d92",
            "yankeesblue": "#1c2841",
            "yellow": "#ffff00",
            "yellowgreen": "#9acd32",
            "yelloworange": "#ffae42",
            "yellowrose": "#fff000",
            "zaffre": "#0014a8",
            "zinnwalditebrown": "#2c1608"
        };
        if (col) {
            col = def(cols[col]) ? cols[col] : col;
        }
        return col.toUpperCase();
    };

    /** Custom Feedly Styles **/
    CFS = {
        conf: {},

        /**  START of Configuration *( to edit default config, do not remove vars elements only change ) **/
        conf_def: {
            main_css: {
                use: true,
                vars: {
                    max_width: '100%',
                    page_font: 'sans-serif'
                },
                text: 'Basic css *(variables: max_width - 00%|00px|00em max window width; page_font - font_name of any font currently present on your computer)'
            },
            left_menu_css: {
                use: true,
                vars: {},
                text: 'Always show Left Menu, and fix all misbehaviours of Feedle Left Menu'
            },
            dark_theme_fix: {
                use: true,
                vars: {},
                text: 'Fix Left Menu styles for dark theme for any display proportions'
            },
            cards_view_fix: {
                use: true,
                vars: {
                    card_width: "182px"
                },
                text: 'Cards View Fix *(width, proportions and slimming and decreasing distances of feeds in Cards View; variable card_width for 1080p I use 267px but for smaller screens default value is 182px )'
            },
            titles_fix: {
                use: true,
                vars: {},
                text: 'Title overflow fix *(fixing problem of overflowins of titles and texts, and wrapping every object inside a feed to stay inside)'
            },
            page_proportions_fixes: {
                use: true,
                vars: {},
                text: 'Page and side area proportions fix *(fixing proportions to Full Article and Magazine Views, to 68% and 66% of page)'
            },
            wiki_widget_fix: {
                use: true,
                vars: {},
                text: 'WikiWidget in Article View Fix *(fixing a problem with WikiWidget in Article View)'
            },
            title_view_fix: {
                use: true,
                vars: {},
                text: 'Title View fix *(restyling Title View and sliming out titles and summaries)'
            },
            condensed_tools_fix: {
                use: true,
                vars: {},
                text: 'Condensed Tools Fix *(slimmer Condensed Tools)'
            },
            slim_condensed_tools: {
                use: false,
                vars: {},
                text: 'Slim Condensed Tools *(Even more slim Condensed Tools for small screens)'
            },
            some_cleaning: {
                use: true,
                vars: {
                    art_padding: "15px",
                    art_color: '#f9f9f9',
                    art_marg_top: '10px',
                    art_marg_bot: '10px'
                },
                text: 'Some cleaning *(variables: art - Full Article View, art_color - Full Article View Feed background, art_marg_* - Full Article top/bottom margines)'
            },
            remove_breaks: {
                use: false,
                vars: {},
                text: 'Remove &lt;br&gt; from paragraphs'
            },
            share_feed_fix: {
                use: true,
                vars: {},
                text: 'SocialIcons in LifeHacker posts'
            },
            hotkeys: {
                use: true,
                vars: {},
                text: 'H - Open in new background tab ; U/Shift+U - Hide left/recommeded menu ; Shift+N/P - Next-Previous folder ; Shift+L/; - Previous-Next NonEmpty folder;<br />Shift+T - Toggle CFS config menu ;'
            },
            hide_left_menu: {
                use: false,
                vars: {},
                text: 'Hide left menu entirely (also "U" hotkey), needs hotkeys option on to use hotkey :)'
            },
            use_full_width: {
                use: false,
                vars: {},
                text: 'Hide Side Areas in Article and Magazine Views *(use 100% of Right Panel not some proportions)'
            },
            colors: {
                use: true,
                vars: {
                    action_color: '#82BD1A',
                    h1_color: '#000',
                    h2_color: '#36C',
                    unread_color: '#36C',
                    read_color: '#666',
                    summary_color: '#999',
                    tview_color: '#777'
                },
                text: 'Text colors generally for everything *(variables: action_color - action links color, h1_color - h1 color, h2_color - h2 color, unread_color - unread feeds color, read_color - read feeds color)'
            },
            background_colors: {
                use: false,
                vars: {
                    condtools_color: '#FFF',
                    select_color: '#FFFCDF',
                    hover_color: '#F5F5F4'
                },
                text: 'Background colors *(variables: condtools_color - Condensed Tools background color, select_color - Selected Feed background color, hover_color - Hover Feed background color)'
            },
            left_menu_colors: {
                use: false,
                vars: {
                    ltext_color: '#444',
                    dtext_color: '#AAA',
                    lsel_color: '#000',
                    dsel_color: '#FFF',
                    lcount_color: '#444',
                    lselcount_color: '#000',
                    dcount_color: '#888',
                    dselcount_color: '#FFF',
                    lnempty_color: '#555',
                    dnempty_color: '#DDD'
                },
                text: 'Left Menu colors (variable parts meanings:"l|d" - Ligh/Dark theme, "sel" - selected, "count" - counter, "nempty" - nonEmpty Category)'
            },
            rside_colors: {
                use: false,
                vars: {
                    recom_color: "#3498DB"
                },
                text: 'Right Side colors, for now "recom_color" - recommendations color'
            },
            compact_title_view: {
                use: false,
                vars: {},
                text: 'Even more Slim Title View and fix for Compact View option in Preferences'
            },
            some_new_stuff: {
                use: true,
                vars: {},
                text: 'Just some additional stuff :)'
            },
            mark_all_fix: {
                use: true,
                vars: {
                    mark_all_b_color: '#FFFFFF',
                    mark_all_b_hov_color: '#111111',
                    mark_all_back_color: '#3498DB',
                    mark_all_back_hov_color: '#3498DB',
                    mark_all_st_color: '#EFEFEF',
                    mark_all_st_hov_color: '#EFEFEF'
                },
                text: 'Changes in Mark All As Read button (suggested by fajfka)'
            },
			fixed_preview:{
                use: true,
                vars: {},
                text: 'Fixed preview in Cards View (suggested by avist)'
            },
            my_styles: {
                use: true,
                vars: {
                    my_css: '/*some css*/'
                },
                text: 'Some User css  *(variables: my_css - you could input here your own css for testing or just something you want)'
            }
        },
        /**  END of Configuration  **/

        css: {
            main_css: 'html {overflow: auto !important;}body.home{top:0!important;margin: 0 auto;max-width: %max_width;}body, input, span, div, h1, h2, h3, .feedTitle, .u0Entry, .title, .entryBody, .metadata, .summary, .hhint, #messageBarContent, .categoryUnreadCountHint, .dot, a{font-family: %page_font !important;}',
            left_menu_css: '#feedlyTabs {max-width: 200px;opacity: 1 !important;padding-left: 5px !important;padding-right: 55px !important;}#mainBar {width: calc(100% - 270px) !important;margin-left: 220px !important;margin-right: 5px;padding-right: 50px;}#mainBar > div{margin-right: -50px;}#mainBar > #mainArea, #feedlyPage > #mainArea, #feedlyPage > div{width:100% !important;}.panels {visibility: visible !important;}#navSelector_my {margin-left: 15px !important;padding-left: 5px !important;text-align: left !important;width: 70px !important;}#feedlyTabsHolder {background: inherit !important;box-shadow: none !important;opacity: 1 !important;width: 220px !important;z-index: 11 !important;}#feedlyTabsHolder div.simpleunreadcount {padding-left: 3px !important;width: 22px !important;}#feedlyTabsHolder:hover #feedlyTabs {overflow-y: auto;padding-right: 15px !important;}#navSelector_store {width: 110px !important;}#feedlyFrame, #feedlyPage, #feedlyPart {margin: auto !important;padding-right: 0 !important;width: 100% !important;}.tab{max-width:182px !important;}#feedlyTabs > div:first-child {position: absolute;left: 140px;}',
            dark_theme_fix: '.dark #feedlyTabsHolder {color: rgba(255, 255, 255, 0.7) !important;}.dark #feedlyTabsHolder #addtab_icon {background-image: url(http://s3.feedly.com/production/16.0/images/selector-add-active.png) !important;}.dark #feedlyTabsHolder #exploretab_icon {background-image: url(http://s3.feedly.com/production/16.0/images/selector-explore-active.png) !important;}.dark #feedlyTabsHolder #friendstab_icon {background-image: url(http://s3.feedly.com/production/16.0/images/selector-social-active.png) !important;}.dark #feedlyTabsHolder #historytab_icon_ {background-image: url(http://s3.feedly.com/production/16.0/images/selector-history-active.png) !important;}.dark #feedlyTabsHolder #latesttab_icon {background-image: url(http://s3.feedly.com/production/16.0/images/selector-latest-active.png) !important;}.dark #feedlyTabsHolder #sharedtab_icon {background-image: url(http://s3.feedly.com/production/16.0/images/selector-shared-active.png) !important;}.dark #feedlyTabsHolder .handle {background-image: url(http://s3.feedly.com/production/16.0/images/selector-right-arrow-active.png) !important;}.dark #feedlyTabsHolder .handle.expanded {background-image: url(http://s3.feedly.com/production/16.0/images/selector-down-arrow-active.png) !important;}.dark #feedlyTabsHolder .my_icon, .dark #feedlyTabsHolder #mytab_icon {background-image: url(http://s3.feedly.com/production/16.0/images/selector-my-active.png) !important;}.dark #feedlyTabsHolder #savedtab_icon{background-image: url(http://s3.feedly.com/production/16.0/images/selector-saved-active.png ) !important;}.dark #store .language.selected, .dark .nonEmpty, .dark #feedlyTabsHolder #feedlyTabs .target.selected {color: #FFF !important;}.dark #storeTopics .topic {background: rgba(255, 255, 255, 0.15) !important;color: rgba(255, 255, 255, 0.4) !important;}.dark .navSelector {border-bottom-color: rgba(255, 255, 255, 0.1) !important;}.dark .navSelector.selected {border-bottom-color: rgba(255, 255, 255, 0.3) !important;color: #FFF !important;font-weight: 700 !important;}',
            cards_view_fix: '.entryList.u5EntryList{width: 100%;}.u5EntryList .column {padding-right: 0.5% !important;width: 24.6% !important;}.u5EntryList .column.column_3_3 {padding-right: 0 !important;}.u5EntryList .u5Entry, .u100Entry .entryHeader .entryTitle {margin-bottom: 10px !important;}.u5EntryList .u5Entry, .u5Entry .visual {background-color: #FFF;position: relative; margin-bottom: 10px; margin-right: 10px; width: %card_width;z-index: 9;}.u5EntryAnnotationHolder ~ div {margin-top: 10px !important;padding: 0 10px  !important;}.u5EntryAnnotationHolder ~ div ~ div {padding: 0 10px 10px !important;}',
            titles_fix: '.title, .title a,.title div, .content,.content div, .entryBody, .entryBody div {max-width: 100% !important;overflow-wrap: break-word;word-wrap: break-word;}',
            page_proportions_fixes: '#sideArea {margin: 0 15px 0 0 !important;max-width: 22% !important;position: absolute;right: 0;top: 50px;width: 22% !important;}.sideAreaModule{max-width: 100% !important}.u100Entrylist {max-width: 68% !important;width: 68% !important;}.feedIndex {height: auto !important}.u4Entry {margin-bottom: 15px !important;max-width: 66% !important;}.inlineFrame table, .inlineFrame table tbody, .inlineFrame table tbody tr, .inlineFrame table tbody tr td,.u100Frame table, .u100Frame table tbody, .u100Frame table tbody tr, .u100Frame table tbody tr td, .u100EntryList .entryHolder {background-color: transparent !important;display: block; max-width: 100% !important;}.entryBody iframe {margin: 0 !important;max-width: 100%;}',
            wiki_widget_fix: '.WikiWidget > div:first-child > div:nth-child(4), .wikiWidgetShareHolder {position: absolute;}.bottomWikiWidget .abZone .ab{position: absolute;right: 50px;}.bottomWikiWidget{margin-top: 11px!important;}',
            title_view_fix: '.u0Entry {height: 27px !important;padding-left: 0 !important;position: relative !important;}.u0Entry .sourceInfo {width: 120px !important;text-align: center;}.u0Entry .title:hover {z-index: 4;}.u0Entry > div:last-child, .u0Entry div div.recommendationInfo + div {display: block!important;position: relative!important;overflow: hidden;}.u0Entry, .u0Entry .title {white-space: nowrap;}.u0Summary {color: #999 !important;line-height: 29px;position: relative;white-space: nowrap;}.entryholder .u100entry,.condensed .entryholder .u100entry{margin:0!important;max-width: 99% !important}td.entryHolder{width: 10000px !important;}.recommendationInfo{width:40px!important}',
            condensed_tools_fix: '.u0Entry .condensedTools, .u0Entry .lastModified{background-color: #FFF;position: relative;width: auto !important;z-index: 9;}.u0Entry .lastModified {line-height: 31px !important;max-width: 50px;padding: 0 5px !important;width: 50px !important;}',
            slim_condensed_tools: '.u0Entry .condensedTools a,.u0Entry .condensedTools img{margin: 0 -8px;}.u0Entry .lastModified{max-width: 30px;}',
            some_cleaning: 'html,body {margin:0;padding:0;height:100%;}.content img {border: 1px #e9e9e9 solid !important;margin: 0 !important;height: auto !important;max-width: 100% !important;}#feedlyPart0.area {padding: 0 5px 0 12px !important;}#feedlyPageHeader {padding-top: 10px !important;}#feedlySignPart {position: fixed !important;top: 300px !important;}.u100Frame {background-color: %art_color !important;padding: %art_padding !important;margin-bottom: %art_marg_bot;margin-top: %art_marg_top;}.u100Entry a.title {font-size: 20px !important; line-height: 20px !important; max-width: 99% !important;}.inlineFrame {padding: 15px !important;}#feedlyTabs > div:first-child ~ div {margin: 15px 0;}#feedlyTabs > div:last-child {margin-bottom: 60px !important;}h2 {margin-top: 2px !important; margin-bottom: 2px !important;height:auto !important}#feedlyPageHeader .hhint{margin-top: -8px; !important;display:inline-block !important;}#floatingBar #cacheRefresh{padding: 0;}.websiteCallForAction{margin-top:0}.u4Entry .marginMaker {margin-left: 0 !important;}#recommentationAreaHeadlines > div {margin-right: 1% !important;width: 20% !important;}.topRecommendedEntry > .visual{width: 100% !important;}.proShowcase{margin-top:10px !important;}#mainArea > #categoriesArea {width: 100%;}.topRecommendedEntry{width: 100%!important;}.itemContentsHolder{width: auto !important;}#floatingBar{margin-left:220px !important;padding-right: 84px !important;}#floatingBar .pageActionBar{margin-right: -50px;}#feedlyTabs #fixedProfile {width: 176px;}',
            remove_breaks: '.content br {display: none !important;}',
            share_feed_fix: '.u100Entry > .entryBody > .content > div > table > tbody > tr > td > a > img {display: inline !important;max-width: 20px !important;width: 20px !important;}',
            hotkeys: '/** Hotkeys CSS **/',
            hide_left_menu: '#feedlyTabsHolder{display:none !important}#mainBar{width: calc(100% - 50px) !important;margin-left:0 !important}',
            use_full_width: '#recommentationAreaHeadlines > div {width: 31% !important;margin-right:1% !important;}#sideArea {visibility:hidden;}.u100Entrylist {max-width: 100% !important;width: 100% !important;}.u4Entry {margin-bottom: 15px !important;max-width: 100% !important;}',
            colors: '.categoryUnreadCountHint span,.entryBody a,.action{color: %action_color !important}h1{color: %h1_color !important;}h2{color: %h2_color !important;font-weight: 700 !important;}.unread,.notSubscribed .title{color: %unread_color !important;font-weight: 700 !important;}.title.read {color: %read_color !important;font-weight: 400 !important;}.u0Summary{color: %summary_color !important;}.u0Entry .sourceTitle a {color: %tview_color !important;}',
            background_colors: '.u0Entry .condensedTools, .u0Entry .lastModified{background-color: %condtools_color !important;}.selectedEntry{background-color: %select_color !important;}.u0Entry:hover {background-color: %hover_color !important;}',
            left_menu_colors: '#feedlyTabsHolder {color: %ltext_color !important;}.dark #feedlyTabsHolder {color: %dtext_color !important;}.navSelector.selected,.tab .selected{color: %lsel_color !important;}.dark .navSelector.selected,.dark .tab .selected,.dark .tab .selected .label, .dark .tab .selected .feedTitle{color: %dsel_color !important;}.tab .simpleUnreadCount{color: %lcount_color !important;}.tab .selected .simpleUnreadCount{color: %lselcount_color !important;}.dark .tab .simpleUnreadCount{color: %dcount_color !important;}.dark .tab .selected .simpleUnreadCount{color: %dselcount_color !important;}.tab .nonEmpty{color: %lnempty_color !important;}.dark .tab .nonEmpty{color: %dnempty_color !important;}',
            rside_colors: '.nbrRecommendations{color: %recom_color !important;}',
            compact_title_view: '.u0Entry .title,.u0Entry .sourcetitle a,.u0Entry .sourceInfo,.u0Entry .lastModified,.u0Summary {line-height: 24px !important;}.u0Entry {height: 24px !important;}.u0Entry .quicklistHandle{height: 24px !important;margin-left: 0;margin-right: 0;width: 20px}.u0Entry .condensedTools {top: -3px;}.u0Entry .quicklistHandle:before {bottom: 0 !important;}',
            some_new_stuff: '.column_0_2 {float: left;margin-right: 1%;overflow: hidden;padding: 0 !important;width: 23% !important;}.column_0_2 .relatedLabel,.column_0_2 .related {width: 100%}.column_0_2 .relatedLabel{height: 100px;}.boxEntryHolder .column {float: left;margin-right: 1%;padding: 0 !important;width: 32%;}.boxInfo {padding-left: 5px !important;padding-right: 5px !important;width: 24% !important;}.boxRank {padding: 1%;width: 2%;}.boxOverview {margin-right: 0;padding-bottom: 5px !important;padding-top: 5px !important;}.boxEntryHolder {float: left;width: 60%;height: 150px;}.u19Entry{width:100% !important;}.u19Entry > div.visual{height: 95px;width: 100%;padding: 0 !important;}.u19Entry > div {padding: 6px !important;}.boxOverview {width: 98%;}.boxIcon {height: 13%;width: 4%;}#feedlyPage > div {margin-top: 0 !important;}#section0.section > .label > div{height: auto !important;}#feedlyBacksplashPart{max-width:100% !important;max-height:100% !important;position:fixed;}',
            mark_all_fix: '#aboutArea {bottom: 0;left: 220px !important;padding: 10px 10px 33px !important;position: fixed;right: 0;width: calc(97% - 214px);z-index: 600;}#bigMarkAllAsReadButton {color: %mark_all_b_color !important;background: none repeat scroll 0 0 %mark_all_back_color;border-radius: 0 0 0 0;font-size: large !important;height: 54px !important;line-height: 50px !important;margin: 0;padding-top: 0 !important;width: calc(100% - 33px) !important;}#bigMarkAllAsReadButton:hover {color: %mark_all_b_hov_color !important;background: none repeat scroll 0 0 %mark_all_back_hov_color;}#bigMarkAllAsReadStats {color: %mark_all_st_color !important;margin: -23px 0 !important;width: calc(100% - 50px) !important;} #bigMarkAllAsReadButton:hover #bigMarkAllAsReadStats{color: %mark_all_st_hov_color !important;}#feedlyPart0.area {min-height: 99% !important;padding: 0 5px 60px 12px !important;}#feedlyPart0 > div#feedlyPart {min-height: 360px;}#mainArea ~ div > .cell {margin-left: 1%;margin-right: 1%;width: 23%;}.home #mainArea ~ div{padding:0 !important;width: 100% !important; margin: 0 0 10px 0 !important;}.home #mainArea .cell.c4 ~ div{margin-bottom: 0 !important;}#recommendationInlineArea{width:100% !important}',
			fixed_preview:'#recommendationInlineArea .inlineFrame{width: 579px;top: 10px;}#recommendationInlineArea .inlineFrame,.u5EntryList .inlineFrame {margin: 0 auto !important;position: absolute;left: calc(50% - 290px);}.u5EntryList .u5Entry{display: block !important;}', //top: 10px; to stay at top
            my_styles: '/* */body{} %my_css body{}/* */'
        },
        ini: false,
        getValue: '',
        setValue: '',
        deleteValue: '',
        cl_ini: false,
        cl_css: {},
        /** fix_GMes for any browser **/
        fix_GM: function () {
            var gmCh = false;
            try {
                lg('[CFS.fix_GM]: Started GM_ functional fixes');
                GM_setValue("gmCh", true);
                gmCh = GM_getValue("gmCh");
            } catch (ignore) {}
            if (gmCh) {
                CFS.getValue = GM_getValue;
                CFS.setValue = GM_setValue;
                CFS.deleteValue = GM_deleteValue;
                lg('[CFS.fix_GM]: No need to Fix GM_ get/set/delete Value');
            } else {
                CFS.getValue = function (key, def) {
                    return localStorage[key] || def;
                };
                CFS.setValue = function (key, value) {
                    localStorage[key] = value;
                    return localStorage[key] === value;
                };
                CFS.deleteValue = function (key) {
                    return delete localStorage[key];
                };
                lg('[CFS.fix_GM]: Fixed GM_ get/set/delete Value');
            }
            lg('[CFS.fix_GM]: Finished GM_ functional fixes');
        },
        init: function () {
            if (CFS.ini) {
                return false;
            }
            CFS.ini = true;
            lg('[CFS.init]: Script Initialized');
            CFS.fix_GM();
            CFS.initconf(RES);
            CFS.calc_css();
            document.body.addEventListener("DOMNodeInserted", CFS.add_tog);
            lg('[CFS.init]: CFS.add_tog on body insert');
        },
        initconf: function (RES) {
            if ( !! RES) {
                CFS.conf = JSON.parse(JSON.stringify(CFS.conf_def));
            } else {
                CFS.conf = JSON.parse(decodeURI(CFS.getValue('conf', encodeURI(JSON.stringify(CFS.conf_def)))));
            }
            lg('[CFS.initconf]: Settings init //conf'); //conf= ', JSON.stringify(CFS.conf));
        },
        calc_css: function () {
            if (CFS.cl_ini) {
                return false;
            }
            CFS.cl_ini = true;
            lg('[CFS.calc_css]: Calculation Started');
            Object.keys(CFS.conf_def)
                .forEach(function (key) {
                    CFS.calc_each(key);
                });
            lg('[CFS.calc_css]: Calculation Finished');
        },
        calc_each: function (key) {
            if (!def(CFS.conf[key])) {
                CFS.conf[key] = CFS.conf_def[key];
            }
            lg('[CFS.calc_each]: Adding ' + key);
            if (CFS.conf[key].use) {
                CFS.cl_css[key] = CFS.css_vars(CFS.css[key], CFS.conf_def[key].vars, CFS.conf[key].vars);
                lg('[CFS.calc_each]: Added ', key, ' CSS');
            } else {
                CFS.cl_css[key] = '';
                lg('[CFS.calc_each]: Missing ', key, ' CSS');
            }
        },
        css_vars: function (css, vars, vars2) {
            Object.keys(vars)
                .forEach(function (key2) {
                    if (!def(vars2)) {
                        vars2 = vars;
                    }
                    if (key2.length > 0) {
                        if (!def(vars2[key2])) {
                            vars2[key2] = vars[key2];
                        }
                        lg('[CFS.calc_css]: Replacing variable ', key2, ' CSS');
                        css = CFS.str_mask(css, key2, vars2[key2]);
                    }
                });
            return css;
        },
        str_mask: function (str, mask, data) {
            return str.split('%' + mask)
                .join(data);
        },
        open_tab: function (url, back) {
            /** back - background_tab flag, tried more universal approach, but hasn't been tested **/
            if (back) {
                var browser = 'Dunno',
                    el, evt, res = false;
                //if (is(CFS.openInTab)){ // SH*Ts chrome and other browsers
                if (navigator.userAgent.indexOf('Firefox') !== -1) { /** Firefox *( possible need in about:config "browser.tabs.loadInBackground: true", but it is default for a lot of releases )**/
                    browser = 'Firefox!';
                    res = GM_openInTab(url);
                } else {
                    el = document.createElement("a");
                    el.href = url;
                    if (is(document.createEvent, "function")) { /** Chrome/Opera/?Safari?/?IE10? *( if you'd found some problems please report to Script Discussion section https://userscripts.org/scripts/discuss/171749 )**/
                        evt = document.createEvent("MouseEvents");
                        browser = 'Chrome/Opera/?Safari?/?IE10+?!';
                        evt.initMouseEvent("click", true, true, w, 0, 0, 0, 0, 0, true, false, false, false, 0, null); // ctrl+left button
                        res = el.dispatchEvent(evt);
                    } else if (document.createEventObject) { /** ?IE9-? *( if you'd found some problems please report to Script Discussion section https://userscripts.org/scripts/discuss/171749 )**/
                        evt = document.createEventObject();
                        evt.ctrlKey = true;
                        evt.button = 1; // ctrl+left button
                        browser = 'IE < 9!';
                        res = el.fireEvent("onclick", evt);
                    }
                }
                lg('[CFS.open_tab]: ', res ? 'Opened "' : 'Forbidden to open "', url, '" (in ', browser, ') ', back ? 'new background' : 'new', ' tab ');
            } else {
                w.open(url);
            }
        },
        key_ch_right: function (evt) {
            //lg('[CFS.key_ch_right] Proceed!');
            CFS.key_check(evt, true);
        },
        key_ch_left: function (evt) {
            //lg('[CFS.key_ch_left] Proceed!');
            CFS.key_check(evt, false);
        },
        key_check: function (evt, right) {
            var el = null, all_lbls = [], non_emp_lbls = [],
                index_all, index_non_emp, key_char;
            evt = evt || w.event;
            if (evt.ctrlKey || evt.altKey || evt.metaKey) {
                return false;
            }
            key_char = String.fromCharCode(evt.keyCode || evt.CharCode);
            if ((key_char.charCodeAt(0) < 30) || (key_char.charCodeAt(0) > 111)) {
                return false;
            }
            if ((!right) && (!document.querySelector('#navSelector_my')
                .classList.contains('selected'))) {
                return false;
            }
            lg('[CFS.key_check]On ', right ? 'Right' : 'Left', ' Panel, key_char -', key_char, '- was pressed! Shift:', evt.shiftKey ? 'Pressed' :
                'Not Pressed', ', Ctrl:', evt.ctrlKey ? 'Pressed' : 'Not Pressed', ', Alt:', evt.altKey ? 'Pressed' : 'Not Pressed', ', CharCode:', key_char.charCodeAt(0), '.');
            if (document.querySelector('#feedlyTabs > div:last-child .header.target.selected') !== null) {
                el = document.querySelector('#feedlyTabs > div:last-child .header.target.selected .label');
				all_lbls = Array.prototype.slice.call(document.querySelectorAll('#feedlyTabs > div:last-child > .tab .header.target .label'));
				index_all = all_lbls.indexOf(el);
				if (document.querySelectorAll('#feedlyTabs > div:last-child > .tab .header.target .label.nonEmpty') !== null){
					non_emp_lbls = Array.prototype.slice.call(document.querySelectorAll('#feedlyTabs > div:last-child > .tab .header.target .label.nonEmpty'));
					index_non_emp = non_emp_lbls.indexOf(el);
					//if((index_non_emp <0) &&(non_emp_lbls.length>0)) index_non_emp = 0;
				}
            }
			lg('[CFS.key_check] el = ',el,' , all_lbls = ',all_lbls,' , index_all = ',index_all,' , non_emp_lbls = ',non_emp_lbls,' , index_non_emp = ',index_non_emp);
            switch (key_char) {
            case 'H':
                if ((document.querySelector('.selectedEntry .title') !== null) && (!evt.shiftKey) && (!evt.ctrlKey) && (!evt.altKey)) {
                    CFS.open_tab(document.querySelector('.selectedEntry .title').href, true); //open new background tab
                }
                break;
			case 'L':
                if ((el !== null) && (evt.shiftKey) && (!evt.ctrlKey) && (!evt.altKey)) {
					if (non_emp_lbls.length >1){
						if (index_non_emp <= 0) {
							index_non_emp = non_emp_lbls.length-1;
						} else {
							index_non_emp -= 1;
						}
						lg('[CFS.key_check] Shift+L Pressed (',index_non_emp,non_emp_lbls[index_non_emp],')');
						non_emp_lbls[index_non_emp].click();
					}
                }
                break;
            case ';':
                if ((el !== null) && (evt.shiftKey) && (!evt.ctrlKey) && (!evt.altKey)) {
					if (non_emp_lbls.length >1){
						if (index_non_emp >= non_emp_lbls.length-1) {
							index_non_emp = 0;
						} else {
							index_non_emp += 1;
						}
						lg('[CFS.key_check] Shift+; Pressed (',index_non_emp,non_emp_lbls[index_non_emp],')');
						non_emp_lbls[index_non_emp].click();
					}
                }
                break;
            case 'P':
                if ((el !== null) && (evt.shiftKey) && (!evt.ctrlKey) && (!evt.altKey)) {
					if (all_lbls.length >1){
						if (index_all <= 0) {
							index_all = all_lbls.length-1;
						} else {
							index_all -= 1;
						}
						lg('[CFS.key_check] Shift+P Pressed (',index_all,all_lbls[index_all],')');
						all_lbls[index_all].click();
					}
                }
                break;
            case 'N':
                if ((el !== null) && (evt.shiftKey) && (!evt.ctrlKey) && (!evt.altKey)) {
					if (all_lbls.length >1){
						if (index_all >= all_lbls.length-1) {
							index_all = 0;
						} else {
							index_all += 1;
						}
						lg('[CFS.key_check] Shift+N Pressed (',index_all,all_lbls[index_all],')');
						all_lbls[index_all].click();
					}
                }
                break;
            case 'U':
				if((!evt.ctrlKey) && (!evt.altKey)){
					if(!evt.shiftKey){
						document.querySelector('#hide_left_menu_lb')
							.click();
					} else {
						document.querySelector('#use_full_width_lb')
							.click();
					}
				}
                break;
			case 'T':
				if((!evt.ctrlKey) && (!evt.altKey))
					if(evt.shiftKey)
						CFS.togw_wind();
				break;
            }
        },
        css_join: function (arr) {
            var res = '';
            Object.keys(arr)
                .forEach(function (key) {
                    res += "/* " + key + " Begin */" + arr[key] + "/* " + key + " end */";
                });
            return res;
        },
        css_add: function (css) {
            var chld = document.createElement('style'),
                hds = document.getElementsByTagName('head')[0],
                prnt = hds || document.documentElement;
            chld.type = 'text/css';
            chld.appendChild(document.createTextNode(css));
            if (def(CFS.css_el)) {
                CFS.css_el.parentElement.removeChild(CFS.css_el);
            }
            CFS.css_el = hds ? prnt.appendChild(chld) : prnt.insertBefore(chld, prnt.firstChild);
        },
        /** CFS window BEGIN **/
        w_show: false,
        w_wind: '',
        w_css: '.CFS_conf{background-color:#FFFFFF;border:1px dashed #000;border-radius:5px;display:none;padding: 5px 5px 50px;position:fixed;right:1%;top:5px;z-index:900;}.CFS_conf.shown{display:block;}.opts,.vars{border:1px dashed #000;display:block;float:right;margin:2px;padding:4px;}.cb{display:inline;margin:0;}.lb{cursor:pointer;display:inline;width:86%;}.vr{margin:2px;padding:0;width:65px;height:16px;border:1px solid black;}#my_css_vr.vr{width:auto;height:auto;}.opt .text{background-color: #F9F9F9;bottom:1%;display:none;position:absolute;right:1%;width:59%;height: 45px;}.opt:hover .text{display:block;}.btns{bottom:5%;left:1%;position:absolute;width: 38%;}.bt{cursor:pointer;margin:0 0.5%;width: 24%;}.tg.pageAction{display: inline-block;line-height: 17px;cursor:pointer;opacity: 0.45;transition: opacity 0.2s;vertical-align:top;}#feedlyPageHeader .tg{font-size:15px;line-height:26px;}.tg.selected,.tg:hover{opacity:1}.gray{background-color:#DDD}#CFS_info{position: absolute; bottom: 0; left: 2px;}',
        togw_wind: function () {
            document.querySelector('.CFS_conf')
                .classList.toggle('shown');
            document.querySelector('#feedlyPageHeader .tg')
                .classList.toggle('selected');
            document.querySelector('#floatingBar .tg')
                .classList.toggle('selected');
            CFS.w_show = !CFS.w_show;
        },
        wind_ini: function () {
            if (CFS.cl_css !== '') {
                //lg('[CFS.wind_ini]: ',CFS.cl_css);
                CFS.cl_css.w_css = CFS.w_css;
                CFS.css_add(CFS.css_join(CFS.cl_css));
                lg('[CFS.wind_ini]: CFS.cl_css Added');
                lg('[CFS.wind_ini]: Added ws style w_css');
            }
            CFS.w_wind = CFS.cr_el('div', document.body, 'CFS_conf');
            lg('[CFS.wind_ini]: Added cfsw_wind');
            var opts = CFS.cr_el('div', CFS.w_wind, 'opts'),
                vars = CFS.cr_el('div', CFS.w_wind, 'vars'),
                vars2 = CFS.cr_el('div', CFS.w_wind, 'vars'),
                count = 0,
                btns = CFS.cr_el('div', CFS.w_wind, 'btns'); /*  , info =*/
            CFS.cr_el('div', CFS.w_wind, 'text info', 'CFS_info', CFS_info);
            Object.keys(CFS.conf_def)
                .forEach(function (key) {
                    lg('[CFS.wind_ini]: ', key, what(CFS.conf[key]));
                    if (!def(CFS.conf[key])) {
                        CFS.conf[key] = CFS.conf_def[key];
                    }
                    var opt = CFS.cr_el('div', opts, 'opt', key + '_opt');
                    if (!CFS.conf[key].use) {
                        opt.classList.add('gray');
                    }
                    CFS.cr_el('input', opt, 'cb', key + '_use', CFS.conf[key].use);
                    CFS.cr_el('label', opt, 'lb', key + '_lb', key);
                    CFS.cr_el('div', opt, 'text', key + '_text', CFS.conf_def[key].text);
                    lg('[CFS.wind_ini]: Added option ', key);
                    Object.keys(CFS.conf_def[key].vars)
                        .forEach(function (key2) {
                            if (is(CFS.conf[key].vars[key2], 'undefined')) {
                                CFS.conf[key].vars[key2] = CFS.conf_def[key].vars[key2];
                            }
                            count += 1;
                            var varo = CFS.cr_el('div', (count < 20) ? vars : vars2, 'varo ' + key + '_v', key2 + '_varo');
                            if (!CFS.conf[key].use) {
                                varo.classList.add('gray');
                            }
                            var inp = 'input';
                            if (key2 === 'my_css') {
                                inp = 'textarea';
                            }
                            CFS.cr_el(inp, varo, 'vr', key2 + '_vr', CFS.conf[key].vars[key2]);
                            CFS.cr_el('div', varo, 'lb', key2 + '_lb', key2 + ' *(' + key + ')');
                            lg('[CFS.wind_ini]: Added var ', key2);
                        });
                });
            CFS.cr_el('input', btns, 'bt', 'save', CFS.saveconf);
            CFS.cr_el('input', btns, 'bt', 'load', CFS.resconf);
            CFS.cr_el('input', btns, 'bt', 'default', CFS.defconf);
            CFS.cr_el('input', btns, 'bt', 'close', CFS.togw_wind);
            lg('[CFS.wind_ini]: Added buttons! ');
            lg('[CFS.wind_ini]: Added info! ');
            CFS.cr_el('div', document.querySelector('#feedlyPageHeader .pageActionBar'), 'tg', 'CFS');
            CFS.cr_el('div', document.querySelector('#floatingBar .pageActionBar'), 'tg', 'CFS');
            lg('[CFS.wind_ini]: Added toggles! ');
            if (CFS.conf.hotkeys.use) {
                document.querySelector('#mainBar')
                    .onkeyup = CFS.key_ch_right;
                document.querySelector('#feedlyTabsHolder')
                    .onkeyup = CFS.key_ch_left;
                //window.onkeyup = CFS.key_check;
            }
        },
        add_tog: function () {
            document.body.removeEventListener("DOMNodeInserted", CFS.add_tog);
            lg('[CFS.add_tog]: Trying to initialize! ');
            if ((document.querySelector('#floatingBar') === null) || (document.title === "welcome to feedly")) {
                lg('[CFS.add_tog]: Absent floatingBar! ');
                setTimeout(CFS.add_tog, 500);
            } else {
                lg('[CFS.add_tog]: Present floatingBar! ');
                CFS.wind_ini();
            }
        },
        defconf: function () {
            delete CFS.conf;
            lg('[CFS.delconf] Deleting');
            CFS.resconf(true);
        },
        resconf: function (RES) {
            var rebuild = false;
            lg('[CFS.resconf] Loading (Reseting?', is(RES, 'boolean'), ')');
            CFS.initconf(is(RES, 'boolean'));
            Object.keys(CFS.conf_def)
                .forEach(function (key) {
                    if (!def(CFS.conf[key])) {
                        CFS.conf[key] = CFS.conf_def[key];
                    }
                    if (CFS.conf[key].use !== document.querySelector('#' + key + '_use')
                        .checked) {
                        document.querySelector('#' + key + '_opt label')
                            .click();
                    }
                    Object.keys(CFS.conf_def[key].vars)
                        .forEach(function (key2) {
                            if (!def(CFS.conf[key].vars)) {
                                CFS.conf[key].vars = CFS.conf_def[key].vars;
                            }
                            if (CFS.conf[key].vars[key2] !== document.querySelector('#' + key2 + '_vr')
                                .value) {
                                document.querySelector('#' + key2 + '_vr')
                                    .value = CFS.conf[key].vars[key2];
                                document.querySelector('#' + key2 + '_vr')
                                    .onblur();
                                rebuild = true;
                            }
                        });
                    if (rebuild) {
                        CFS.calc_each(key);
                        CFS.css_add(CFS.css_join(CFS.cl_css));
                    }
                });
            lg('[CFS.resconf] Applied!');
        },
        saveconf: function () {
            CFS.deleteValue('conf');
            lg('[CFS.saveconf] COnfigs : ', CFS.conf);
            CFS.setValue('conf', encodeURI(JSON.stringify(CFS.conf)));
            lg('[CFS.saveconf] Saved!');
        },
        colrs: function () {
            var rgb, rgb_col = this.value,
                text_col, yiq;
            lg('[CFS.colrs]: Recieved color: ' + rgb_col);
            rgb_col = name2col(rgb_col);
            this.style.border = '1px solid black';
            if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(rgb_col)) {
                this.style.backgroundColor = rgb_col;
                rgb = this.style.backgroundColor.match(/\d+/g);
                yiq = ((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;
                text_col = (yiq >= 128) ? '#000' : '#fff';
                this.style.color = text_col;
                lg('[CFS.colrs] RGB col ', rgb_col, '; TEXT color', text_col, '( YIQ = ', yiq, ').');
                if (def(this.parentElement)) {
                    CFS.opts(this.parentElement.classList.item(1)
                        .replace(/_([a-zA-Z]+)$/, ""), rgb_col, this.id.replace(/_([a-zA-Z]+)$/, ""));
                }
            } else {
                lg('[CFS.colrs] Sorry, RGB col is wrong.');
                this.style.border = '1px solid red';
            }
        },
        opts: function (el, val, vr) {
            lg('[CFS.opts] ', el, val, vr);
            var rebuild = false;
            if (!def(vr)) {
                if (def(CFS.conf[el])) {
                    if (CFS.conf[el].use !== val) {
                        CFS.conf[el].use = val;
                        rebuild = true;
                    }
                }
            } else {
                lg(CFS.conf[el].vars[vr], val, CFS.conf[el].vars[vr] !== val);
                if (CFS.conf[el].vars[vr] !== val) {
                    CFS.conf[el].vars[vr] = val;
                    rebuild = true;
                }
            }
            if (rebuild) {
                CFS.calc_each(el);
                CFS.css_add(CFS.css_join(CFS.cl_css));
            }
        },
        gray: function () {
            var sel = this.id.replace(/_([a-zA-Z]+)$/, ""),
                group = document.querySelectorAll('.' + sel + "_v");
            lg('.' + sel);
            if (document.querySelector('#' + sel + "_use")
                .checked) {
                this.classList.remove('gray');
                Array.prototype.forEach.call(group, function (el) {
                    el.classList.remove('gray');
                });
            } else {
                this.classList.add('gray');
                Array.prototype.forEach.call(group, function (el) {
                    el.classList.add('gray');
                });
            }
            CFS.opts(sel, document.querySelector('#' + sel + "_use")
                .checked);
        },
        blur: function () {
            if (def(this.parentElement)) {
                CFS.opts(this.parentElement.classList.item(1).replace(/_([a-zA-Z]+)$/, ""),
                    this.value, this.id.replace(/_([a-zA-Z]+)$/, ""));
            }
        },
        font_blur: function () {
            this.style.fontFamily = this.value;
            CFS.blur.call(this);
        },
        cr_el: function (type, par, clas, id, val) {
            var el = document.createElement(type);
            el.className = clas || '';
            id = id || '';
            val = val || '';
            el.id = id;
            switch (el.classList.item(0)) {
            case 'opt':
                el.onclick = CFS.gray;
                break;
            case 'lb':
                el.innerHTML = val;
                el.htmlFor = val + '_use';
                break;
            case 'cb':
                el.type = 'checkbox';
                el.checked = val;
                el.onblur = CFS.opts;
                break;
            case 'text':
                el.innerHTML = val;
                break;
            case 'vr':
                if (id === 'my_css_vr') {
                    // el.innerHTML = val;
                    el.value = val;
                    el.rows = 5;
                    el.cols = 15;
                } else {
                    el.type = 'text';
                    el.value = val;
                }
                if (id.indexOf('color_vr') > -1) {
                    el.onblur = this.colrs;
                    CFS.colrs.call(el);
                } else if (id.indexOf('font_vr') > -1) {
                    el.onblur = CFS.font_blur;
                    CFS.font_blur.call(el);
                } else {
                    el.onblur = CFS.blur;
                }
                break;
            case 'bt':
                el.type = 'button';
                el.value = id;
                el.id = 'cfs_' + id;
                el.onclick = val;
                break;
            case 'tg':
                el.id = 'cfs_toggle';
                el.classList.add('pageAction');
				el.setAttribute('data-page-action', 'CFS');
                el.innerHTML = id;
                el.onclick = CFS.togw_wind;
                break;
            }
            if (clas !== 'tg') {
                par.appendChild(el);
            } else {
                par.insertBefore(el, par.firstChild);
            }
            return el;
        } /** CFS window END **/
    };
    setTimeout(CFS.init, 500);
}(window));