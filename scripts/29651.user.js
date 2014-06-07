// ==UserScript==
// @name        Dates, Times and Spellings
// @namespace   http://regionaltraffic.co.uk/
// @description UK date format, 24-hour clock, Anglicised spellings, Metric units, Smart quotes
// @include     *
// @exclude     http://www.bbc.co.uk/travelnews/*
// @exclude     https://www.hsbc.co.uk/*
// @exclude     https://retail.santander.co.uk/*
// @grant       none
// ==/UserScript==

// Last Updated: Tuesday 25th March 2014

/*jshint smarttabs:true, indent:4, trailing:true */
/*global XPathResult */

// Regular expression components
var SPACE = "[ \\t\\u00A0]*",
	SPACER = "(?:" + SPACE + "| and )",
	MONTHS = "(January|February|March|April|June|July|August|September|October|November|December|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Sep|Oct|Nov|Dec)\\.?)(?=\\s|\\b|\\d)",
	DAYS = "(3[01]|[0-2][0-9]|[1-9])(?:st|nd|rd|th)?(?=\\b|[^\\d])",

	UNIT_PREFIX = "(\\(|[^\\w.,+\\-\\\\£$\\u20AC:]|^)",
	COEFFICIENT_REAL = "([-+]?(?:[\\d,]*\\d|[\\d,]*\\.\\d+)[\\u00BC\\u00BD\\u00BE]?(?: hundred| thousand| million| billion| trillion)?|one|an|a)([\\- \\t\\u00A0]?)",
	COEFFICIENT_INT  = "(\\+?[\\d,]*\\d)([\\- \\t\\u00A0]?)",

	// Imperial distance units
	NAUTICAL_MILE = "nautical miles?|nmi",
	MILE = "miles?\\b|mi\\b",
	FURLONG = "furlongs?",
	CHAIN = "chains?",
	ROD = "rods?\\b|pole(?! position)\\b|poles\\b",
	FATHOM = "fathoms?",
	YARD = "yards?|yds?",
	FOOT = "(?:(?:survey )?foot\\b|feet)|ft|'(?!s)|\\u2032",
	INCH = "inches|inch|ins?\\b|\"s?(?=[\\s.,]|$)|\\u2033",

	// Imperial mass units
	UK_LONG_TON = "(?:(?:UK )?long )?ton(?!ne)s?\\b",
	UK_HUNDRED_WEIGHT = "(?:UK )?(?:hundredweights?|cwt)",
	STONE = "stones|stone(?! curlew)|st\\b",
	POUND = "lbs?",
	OUNCE = "ounces?|oz",

	// Imperial area unit
	ACRE = "acres?",
	ROOD = "roods?",

	// Imperial volume units
	US_FLUID_OUNCE = "US fluid ounces?|US fl oz",
	FLUID_OUNCE = "(?:Imperial |UK )?fluid ounces?|fl oz",
	US_PINT = "US pints?",
	PINT = "pints?|pt",
	QUART = "(?:US |Imperial )?quarts?\\b|qts?\\b",
	US_GALLON = "US gal(?:lon)?s?",
	GALLON = "(?:UK )?gal(?:lon)?s?",

	// Imperial temperature unit
	FAHRENHEIT = "(?:degrees |\\u00B0)?Fahrenheit|\\u00B0?F\\b",

	// Metric distance units
	KILOMETRE = "kilometres?|kilometers?|km",
	HECTOMETRE = "hectometres?|hectometers?|hm",
	DECAMETRE = "de[ck]ametres?|de[ck]ameters?|dam\\b",
	METRE = "metres?|meters?|m(?:\\b|(?=\\d))",
	DECIMETRE = "decimetres?|decimeters?|dm",
	CENTIMETRE = "centimetres?|centimeters?|cm",
	MILLIMETRE = "milimetres?|millimeters?|mm\\b",
	MICROMETRE = "micrometres?|micrometers?|\\u00B5m",
	NANOMETRE = "nanometres?|nanometers?|nm",

	// Metric mass units
	TONNE = "tonnes?|t\\b",
	KILOGRAM = "kilograms?|kilos?\\b|kgs?",
	GRAM = "grams?\\b|g\\b",
	MILLIGRAM = "milligrams?|mg",

	// Metric area unit
	HECTARE = "hectares?|ha\\b",

	// Metric volume units
	LITRE = "litres?|liters?\\b|l\\b",
	HECTOLITRE = "hectolitres?|hectoliters?|hl",
	MILLILITRE = "millilitres?|milliliters?|ml",

	// Metric temperature unit
	CELSIUS = "(?:degrees |\\u00B0)?(?:Centigrade|Celsius)|(?:degrees |\\u00B0)C\\b(?!#| file)",

	// Percentage
	PERCENT = "(?:per cent|percent|pc)\\b",

	// Unit matching expressions
	IMPERIAL = "(" + NAUTICAL_MILE + "|" + MILE + "|" + FURLONG + "|" + FATHOM + "|" + CHAIN + "|" + ROD + "|" + YARD + "|" + FOOT + "|" + INCH + "|" + UK_LONG_TON + "|" + UK_HUNDRED_WEIGHT + "|" + STONE + "|" + POUND + "|" + OUNCE + "|" + ACRE + "|" + ROOD + "|" + US_FLUID_OUNCE + "|" + FLUID_OUNCE + "|" + US_PINT + "|" + PINT + "|" + QUART + "|" + US_GALLON + "|" + GALLON + "|" + FAHRENHEIT + ")",
	METRIC = "(" + KILOMETRE + "|" + HECTOMETRE + "|" + DECAMETRE + "|" + METRE + "|" + DECIMETRE + "|" + CENTIMETRE + "|" + MILLIMETRE + "|" + MICROMETRE + "|" + NANOMETRE + "|" + TONNE + "|" + KILOGRAM + "|" + GRAM + "|" + MILLIGRAM + "|" + HECTARE + "|" + LITRE + "|" + HECTOLITRE + "|" + MILLILITRE + "|" + CELSIUS + "|" + PERCENT + ")",

	// Single units (dimensioned)
	IMPERIAL_UNIT = COEFFICIENT_REAL + "((?:square|sq|cube|cubic)" + SPACE + "?)?" + IMPERIAL + "(\\^?[23\\u00B2\\u00B3]|" + SPACE + "squared|" + SPACE + "cubed)?",
	METRIC_UNIT   = COEFFICIENT_REAL + "((?:square|sq|cube|cubic)" + SPACE + "?)?" + METRIC   + "(\\^?[23\\u00B2\\u00B3]|" + SPACE + "squared|" + SPACE + "cubed)?",

	// Paired single units (dimensioned)
	IMPERIAL_METRIC   = UNIT_PREFIX + IMPERIAL_UNIT + SPACE + "(?:[/;]" + SPACE + "|[([])" + METRIC_UNIT   + "[)\\]]?",
	METRIC_IMPERIAL   = UNIT_PREFIX + METRIC_UNIT   + SPACE + "(?:[/;]" + SPACE + "|[([])" + IMPERIAL_UNIT + "[)\\]]?",
	IMPERIAL_IMPERIAL = UNIT_PREFIX + IMPERIAL_UNIT + SPACE + "(?:[/;]" + SPACE + "|[([])" + IMPERIAL_UNIT + "[)\\]]?",

	// Multi-unit imperial expressions
	IMPERIAL_LENGTHS = COEFFICIENT_INT + "(?:(" + NAUTICAL_MILE + ")" + SPACER + COEFFICIENT_INT + ")?(?:(" + MILE + ")(?:" + SPACER + COEFFICIENT_INT + ")?)?(?:(" + CHAIN + ")(?:" + SPACER + COEFFICIENT_INT + ")?)?(?:(" + ROD + ")(?:" + SPACER + COEFFICIENT_INT + ")?)?(?:(" + FATHOM + ")(?:" + SPACER + COEFFICIENT_INT + ")?)?(?:(" + YARD + ")(?:" + SPACER + COEFFICIENT_INT + ")?)?(?:(" + FOOT + ")(?:" + SPACER + COEFFICIENT_INT + ")?)?(" + INCH + ")?",
	IMPERIAL_MASSES  = COEFFICIENT_INT + "(?:(" + UK_LONG_TON + ")" + SPACER + COEFFICIENT_INT + ")?(?:(" + UK_HUNDRED_WEIGHT + ")(?:" + SPACER + COEFFICIENT_INT + ")?)?(?:(" + STONE + ")(?:" + SPACER + COEFFICIENT_INT + ")?)?(?:(" + POUND + ")(?:" + SPACER + COEFFICIENT_INT + ")?)?(" + OUNCE + ")?",

	// Multi-unit metric expressions
	METRIC_LENGTHS = COEFFICIENT_INT + "(?:(" + KILOMETRE + ")" + SPACE + COEFFICIENT_INT + ")?(?:(" + HECTOMETRE + ")(?:" + SPACE + COEFFICIENT_INT + ")?)?(?:(" + DECAMETRE + ")(?:" + SPACE + COEFFICIENT_INT + ")?)?(?:(" + METRE + ")(?:" + SPACE + COEFFICIENT_INT + ")?)?(?:(" + DECIMETRE + ")(?:" + SPACE + COEFFICIENT_INT + ")?)?(?:(" + CENTIMETRE + ")(?:" + SPACE + COEFFICIENT_INT + ")?)?(?:(" + MILLIMETRE + ")(?:" + SPACE + COEFFICIENT_INT + ")?)?(?:(" + MICROMETRE + ")(?:" + SPACE + COEFFICIENT_INT + ")?)?(" + NANOMETRE + ")?",
	METRIC_MASSES  = COEFFICIENT_INT + "(?:(" + TONNE + ")" + SPACE + COEFFICIENT_INT + ")?(?:(" + KILOGRAM + ")(?:" + SPACE + COEFFICIENT_INT + ")?)?(?:(" + GRAM + ")(?:" + SPACE + COEFFICIENT_INT + ")?)?(" + MILLIGRAM + ")?",

	// Paired multi-unit expressions
	IMPERIAL_METRIC_LENGTHS = UNIT_PREFIX + IMPERIAL_LENGTHS + SPACE + "([/;]" + SPACE + "|[([])" + METRIC_LENGTHS   + "[)\\]]?",
	IMPERIAL_METRIC_MASSES  = UNIT_PREFIX + IMPERIAL_MASSES  + SPACE + "([/;]" + SPACE + "|[([])" + METRIC_MASSES	 + "[)\\]]?",
	METRIC_IMPERIAL_LENGTHS = UNIT_PREFIX + METRIC_LENGTHS   + SPACE + "([/;]" + SPACE + "|[([])" + IMPERIAL_LENGTHS + "[)\\]]?",
	METRIC_IMPERIAL_MASSES  = UNIT_PREFIX + METRIC_MASSES    + SPACE + "([/;]" + SPACE + "|[([])" + IMPERIAL_MASSES  + "[)\\]]?",

	// Number Word components
	HYPHEN = "[\\-\\s]",
	UNIT = "(?:one|two|three|four|five|six|seven|eight|nine)",
	TEEN = "(?:ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen)",
	TEN = "(?:twenty|thirty|fourty|forty|fifty|sixty|seventy|eighty|ninety)(?:" + HYPHEN + UNIT + ")?",
	UNITS = "(?:" + TEN + "|" + TEEN + "|" + UNIT + ")",

	UNIT_LOOKAHEAD = "(?=[\\- ](nautical mile|nmi|mile|mi\\b|furlong|chain|rod|poles|fathom|foot|feet|ft|'|\\u2032|inch|\"|\\u2033|ton\\b|hundredweight|cwt|stone|st\\b|pound|lb|ounce|oz|acre|rood|us fluid ounce|us fl oz|fluid ounce|fl oz|us pint|pint|pt|quarts?\\b|qts?\\b|us gal|uk gal|degrees|\\u00B0|F\\b|kilomet|km|hectomet|hm|de[ck]amet|dam\\b|metre|meter|m\\b|decimet|dm|millimet|mm\\b|micromet|\\u00B5m|nanomet|nm|tonne|kilogram|kg|gram|g\\b|milligram|mg|hectare|ha\\b|litre|liter|hectolit|hl|millilit|ml|degrees C|\\u00B0C|per cent|percent))(?: per cent| percent)?",

	SEPARATOR = ",?(?:\\s|\\sand\\s)",
	HUNDRED = "(?:" + UNITS + HYPHEN + "hundred(?:" + SEPARATOR + UNITS + ")?)",
	THOUSAND = "(?:" + HUNDRED + "|" + UNITS + ")" + HYPHEN + "thousand(?:" + SEPARATOR + "(?:" + HUNDRED + "|" + UNITS + "))?",
	MILLION = "(?:" + THOUSAND + "|" + HUNDRED + "|" + UNITS + ")" + HYPHEN + "million(?:" + SEPARATOR + "(?:" + THOUSAND + "|" + HUNDRED + "|" + UNITS + "))?",
	BILLION = "(?:" + MILLION + "|" + THOUSAND + "|" + HUNDRED + "|" + UNITS + ")" + HYPHEN + "billion(?:" + SEPARATOR + "(?:" + MILLION + "|" + THOUSAND + "|" + HUNDRED + "|" + UNITS + "))?",
	TRILLION = "(?:" + BILLION + "|" + MILLION + "|" + THOUSAND + "|" + HUNDRED + "|" + UNITS + ")" + HYPHEN + "trillion(?:" + SEPARATOR + "(?:" + BILLION + "|" + MILLION + "|" + THOUSAND + "|" + HUNDRED + "|" + UNITS + "))?",

	// Regular expressions
	reUSdate = new RegExp("([\\b:]?" + DAYS + SPACE + ")?" + MONTHS + SPACE + DAYS + "(," + SPACE + "(?=[12]\\d{3}))?(?!:\\d|\\d:|\\d\\d\\d?\\b)", "gi"),
	reDayMonth = new RegExp("\\b" + DAYS + SPACE + MONTHS, "gi"),
	reISO = /([12]\d{3})([\-\/._])(1[012]|0[1-9])\2(3[01]|[0-2][0-9]|[1-9])/g,
	reUSnumeric = /(1[012]|0?[1-9])([\-\/._])(3[01]|2[0-9]|1[3-9])\2([12]\d{3})/g,
	reTwelveHour = /\b([012]?[0-9])(?:[:\.]([0-5][0-9]))?(?:[:\.]([0-5][0-9]))?\s?([ap])\.?m(?:\b|\.)/gi,
	reURL = /\b(?:https?:\/\/|(?!\/)www\.)[\w\.\/?=%#\-~,:&+]+\b[=&#\/]?/,
	reLowerCaseI = /(^|\s)i(\s|$)/g,
	reBBCtime = /([01]\d|2[0-3])([0-5]\d) ?(GMT|BST)/g,

	// Metrification regular expressions
	reImperialMetricLengths = new RegExp(IMPERIAL_METRIC_LENGTHS, "gi"),
	reImperialMetricMasses = new RegExp(IMPERIAL_METRIC_MASSES, "gi"),
	reMetricImperialLengths = new RegExp(METRIC_IMPERIAL_LENGTHS, "gi"),
	reMetricImperialMasses = new RegExp(METRIC_IMPERIAL_MASSES, "gi"),
	reImperialMetric = new RegExp(IMPERIAL_METRIC, "gi"),
	reMetricImperial = new RegExp(METRIC_IMPERIAL, "gi"),
	reImperialImperial = new RegExp(IMPERIAL_IMPERIAL, "gi"),
	reImperialLengths = new RegExp(UNIT_PREFIX + IMPERIAL_LENGTHS, "gi"),
	reImperialMasses = new RegExp(UNIT_PREFIX + IMPERIAL_MASSES, "gi"),
	reMetricLengths = new RegExp(UNIT_PREFIX + METRIC_LENGTHS, "gi"),
	reMetricMasses = new RegExp(UNIT_PREFIX + METRIC_MASSES, "gi"),
	reImperial = new RegExp(UNIT_PREFIX + IMPERIAL_UNIT, "gi"),
	reMetric = new RegExp(UNIT_PREFIX + METRIC_UNIT, "gi"),
	reTrim = /^[\s]+|[\s]+$/g,
	reStrip = /[\s]+/g,
	reProperCase = /^([a-z])|\s([a-z])/g,
	reUnitSeparator = /[\/(]/,

	// Quote string parsing
	DOUBLE_QUOTE_CHARS = '["\u02BA\u201C\u201D\u201F\u2033\u2036\u275D\u275E\u301D\u301E\uFF02]',
	SINGLE_QUOTE_CHARS = "['\u02B9\u02BC\u2018\u2019\u201B\u2032\u2035\u275B\u275C\uFF07]",

	// Number word regular expressions
	reTrillion = new RegExp("\\b" + TRILLION + UNIT_LOOKAHEAD + "\\b", "gi"),
	reBillion = new RegExp("\\b" + BILLION + UNIT_LOOKAHEAD + "\\b", "gi"),
	reMillion = new RegExp("\\b" + MILLION + UNIT_LOOKAHEAD + "\\b", "gi"),
	reThousand = new RegExp("\\b" + THOUSAND + UNIT_LOOKAHEAD + "\\b", "gi"),
	reHundred = new RegExp("\\b" + HUNDRED + UNIT_LOOKAHEAD + "\\b", "gi"),
	reUnits = new RegExp("\\b" + UNITS + UNIT_LOOKAHEAD + "(?!-)\\b", "gi"),

	// Anglicising
	m_saUStoUK = ["accessorize","accessorise","accessorized","accessorised","accessorizes","accessorises","accessorizing","accessorising","acclimatization","acclimatisation","acclimatize","acclimatise","acclimatized","acclimatised","acclimatizes","acclimatises","acclimatizing","acclimatising","accouterments","accoutrements","advertize","advertise","advertizes","advertises","advertizing","advertising","aerogram","aerogramme","aerograms","aerogrammes","esthete","aesthete","esthetes","aesthetes","esthetic","aesthetic","esthetically","aesthetically","esthetics","aesthetics","etiology","aetiology","aging","ageing","aggrandizement","aggrandisement","agonize","agonise","agonized","agonised","agonizes","agonises","agonizing","agonising","agonizingly","agonisingly","almanac","almanack","almanacs","almanacks","aluminum","aluminium","amortizable","amortisable","amortization","amortisation","amortizations","amortisations","amortize","amortise","amortized","amortised","amortizes","amortises","amortizing","amortising","amphitheater","amphitheatre","amphitheaters","amphitheatres","anemia","anaemia","anemic","anaemic","anesthesia","anaesthesia","anesthetic","anaesthetic","anesthetics","anaesthetics","anesthetize","anaesthetise","anesthetized","anaesthetised","anesthetizes","anaesthetises","anesthetizing","anaesthetising","anesthetist","anaesthetist","anesthetists","anaesthetists","analog","analogue","analogs","analogues","analyze","analyse","analyzed","analysed","analyzes","analyses","analyzing","analysing","and and","and","anglicize","anglicise","anglicized","anglicised","anglicizes","anglicises","anglicizing","anglicising","annualized","annualised","antagonize","antagonise","antagonized","antagonised","antagonizes","antagonises","antagonizing","antagonising","apologize","apologise","appologize","apologise","apologized","apologised","apologizes","apologises","apologizing","apologising","appetizer","appetiser","appetizers","appetisers","appetizing","appetising","appetizingly","appetisingly","arbor","arbour","arbors","arbours","archeological","archaeological","archeologically","archaeologically","archeologist","archaeologist","archeologists","archaeologists","archeology","archaeology","ardor","ardour","armor","armour","armored","armoured","armorer","armourer","armorers","armourers","armories","armouries","armory","armoury","artifact","artefact","artifacts","artefacts","authorize","authorise","authorized","authorised","authorizes","authorises","authorizing","authorising","authorization","authorisation","ax","axe","backpedaled","backpedalled","backpedaling","backpedalling","banister","bannister","banisters","bannisters","baptize","baptise","baptized","baptised","baptizes","baptises","baptizing","baptising","bastardize","bastardise","bastardized","bastardised","bastardizes","bastardises","bastardizing","bastardising","battleax","battleaxe","balk","baulk","balked","baulked","balking","baulking","balks","baulks","bedeviled","bedevilled","bedeviling","bedevilling","behavior","behaviour","behavioral","behavioural","behaviorism","behaviourism","behaviorist","behaviourist","behaviorists","behaviourists","behaviors","behaviours","behoove","behove","behooved","behoved","behooves","behoves","bejeweled","bejewelled","belabor","belabour","belabored","belaboured","belaboring","belabouring","belabors","belabours","beveled","bevelled","bevies","bevvies","bevy","bevvy","biased","biassed","biasing","biassing","binging","bingeing","bougainvillea","bougainvillaea","bougainvilleas","bougainvillaeas","bowdlerize","bowdlerise","bowdlerized","bowdlerised","bowdlerizes","bowdlerises","bowdlerizing","bowdlerising","breathalyze","breathalyse","breathalyzed","breathalysed","breathalyzer","breathalyser","breathalyzers","breathalysers","breathalyzes","breathalyses","breathalyzing","breathalysing","brutalize","brutalise","brutalized","brutalised","brutalizes","brutalises","brutalizing","brutalising","busses","buses","bussing","busing","cesarean","caesarean","cesareans","caesareans","caliber","calibre","calibers","calibres","caliper","calliper","calipers","callipers","calisthenics","callisthenics","canalize","canalise","canalized","canalised","canalizes","canalises","canalizing","canalising","cancelation","cancellation","cancelations","cancellations","canceled","cancelled","canceling","cancelling","candor","candour","cannibalize","cannibalise","cannibalized","cannibalised","cannibalizes","cannibalises","cannibalizing","cannibalising","canonize","canonise","canonized","canonised","canonizes","canonises","canonizing","canonising","capitalize","capitalise","capitalized","capitalised","capitalizes","capitalises","capitalizing","capitalising","caramelize","caramelise","caramelized","caramelised","caramelizes","caramelises","caramelizing","caramelising","carbonize","carbonise","carbonized","carbonised","carbonizes","carbonises","carbonizing","carbonising","caroled","carolled","caroling","carolling","catalog","catalogue","cataloged","catalogued","catalogs","catalogues","cataloging","cataloguing","catalyze","catalyse","catalyzed","catalysed","catalyzes","catalyses","catalyzing","catalysing","categorize","categorise","categorized","categorised","categorizes","categorises","categorizing","categorising","cauterize","cauterise","cauterized","cauterised","cauterizes","cauterises","cauterizing","cauterising","caviled","cavilled","caviling","cavilling","centigram","centigramme","centigrams","centigrammes","centiliter","centilitre","centiliters","centilitres","centimeter","centimetre","centimeters","centimetres","centralize","centralise","centralized","centralised","centralizes","centralises","centralizing","centralising","center","centre","centered","centred","centerfold","centrefold","centerfolds","centrefolds","centerpiece","centrepiece","centerpieces","centrepieces","centers","centres","channeled","channelled","channeling","channelling","characterize","characterise","characterized","characterised","characterizes","characterises","characterizing","characterising","checkbook","chequebook","checkbooks","chequebooks","checkered","chequered","chili","chilli","chimera","chimaera","chimeras","chimaeras","chiseled","chiselled","chiseling","chiselling","circularize","circularise","circularized","circularised","circularizes","circularises","circularizing","circularising","civilize","civilise","civilized","civilised","civilizes","civilises","civilizing","civilising","clamor","clamour","clamored","clamoured","clamoring","clamouring","clamors","clamours","clangor","clangour","clarinetist","clarinettist","clarinetists","clarinettists","collectivize","collectivise","collectivized","collectivised","collectivizes","collectivises","collectivizing","collectivising","colonization","colonisation","colonize","colonise","colonized","colonised","colonizer","coloniser","colonizers","colonisers","colonizes","colonises","colonizing","colonising","color","colour","colorant","colourant","colorants","colourants","colored","coloured","coloreds","coloureds","colorful","colourful","colorfully","colourfully","coloring","colouring","colorize","colourize","colorized","colourized","colorizes","colourizes","colorizing","colourizing","colorless","colourless","colors","colours","commercialize","commercialise","commercialized","commercialised","commercializes","commercialises","commercializing","commercialising","compartmentalize","compartmentalise","compartmentalized","compartmentalised","compartmentalizes","compartmentalises","compartmentalizing","compartmentalising","computerize","computerise","computerized","computerised","computerizes","computerises","computerizing","computerising","conceptualize","conceptualise","conceptualized","conceptualised","conceptualizes","conceptualises","conceptualizing","conceptualising","contextualize","contextualise","contextualized","contextualised","contextualizes","contextualises","contextualizing","contextualising","cozier","cosier","cozies","cosies","coziest","cosiest","cozily","cosily","coziness","cosiness","cozy","cosy","councilor","councillor","councilors","councillors","counseled","counselled","counseling","counselling","counselor","counsellor","counselors","counsellors","crenelated","crenellated","criminalize","criminalise","criminalized","criminalised","criminalizes","criminalises","criminalizing","criminalising","criticize","criticise","criticized","criticised","criticizes","criticises","criticizing","criticising","crueler","crueller","cruelest","cruellest","crystallization","crystallisation","crystallize","crystallise","crystallized","crystallised","crystallizes","crystallises","crystallizing","crystallising","cudgeled","cudgelled","cudgeling","cudgelling","customizable","customisable","customize","customise","customized","customised","customizes","customises","customizing","customising","customization","customisation","cipher","cypher","ciphers","cyphers","decentralization","decentralisation","decentralize","decentralise","decentralized","decentralised","decentralizes","decentralises","decentralizing","decentralising","decriminalization","decriminalisation","decriminalize","decriminalise","decriminalized","decriminalised","decriminalizes","decriminalises","decriminalizing","decriminalising","defense","defence","defenseless","defenceless","defenses","defences","dehumanization","dehumanisation","dehumanize","dehumanise","dehumanized","dehumanised","dehumanizes","dehumanises","dehumanizing","dehumanising","demeanor","demeanour","demilitarization","demilitarisation","demilitarize","demilitarise","demilitarized","demilitarised","demilitarizes","demilitarises","demilitarizing","demilitarising","demobilization","demobilisation","demobilize","demobilise","demobilized","demobilised","demobilizes","demobilises","demobilizing","demobilising","democratization","democratisation","democratize","democratise","democratized","democratised","democratizes","democratises","democratizing","democratising","demonize","demonise","demonized","demonised","demonizes","demonises","demonizing","demonising","demoralization","demoralisation","demoralize","demoralise","demoralized","demoralised","demoralizes","demoralises","demoralizing","demoralising","denationalization","denationalisation","denationalize","denationalise","denationalized","denationalised","denationalizes","denationalises","denationalizing","denationalising","deodorize","deodorise","deodorized","deodorised","deodorizes","deodorises","deodorizing","deodorising","depersonalize","depersonalise","depersonalized","depersonalised","depersonalizes","depersonalises","depersonalizing","depersonalising","deputize","deputise","deputized","deputised","deputizes","deputises","deputizing","deputising","desensitization","desensitisation","desensitize","desensitise","desensitized","desensitised","desensitizes","desensitises","desensitizing","desensitising","destabilization","destabilisation","destabilize","destabilise","destabilized","destabilised","destabilizes","destabilises","destabilizing","destabilising","dialed","dialled","dialing","dialling","dialog","dialogue","dialogs","dialogues","diarrhea","diarrhoea","digitize","digitise","digitized","digitised","digitizes","digitises","digitizing","digitising","discolor","discolour","discolored","discoloured","discoloring","discolouring","discolors","discolours","disks","discs","disemboweled","disembowelled","disemboweling","disembowelling","disfavor","disfavour","disheveled","dishevelled","dishonor","dishonour","dishonorable","dishonourable","dishonorably","dishonourably","dishonored","dishonoured","dishonoring","dishonouring","dishonors","dishonours","disorganization","disorganisation","disorganized","disorganised","distil","distill","distils","distills","dont","don't","don't forget to","remember to","do not forget to","remember to","dramatization","dramatisation","dramatizations","dramatisations","dramatize","dramatise","dramatized","dramatised","dramatizes","dramatises","dramatizing","dramatising","draftboard","draughtboard","draftboards","draughtboards","draftier","draughtier","draftiest","draughtiest","draftsman","draughtsman","draftsmanship","draughtsmanship","draftsmen","draughtsmen","draftswoman","draughtswoman","draftswomen","draughtswomen","driveled","drivelled","driveling","drivelling","dueled","duelled","dueling","duelling","economize","economise","economized","economised","economizes","economises","economizing","economising","edema","edoema","editorialize","editorialise","editorialized","editorialised","editorializes","editorialises","editorializing","editorialising","empathize","empathise","empathized","empathised","empathizes","empathises","empathizing","empathising","emphasize","emphasise","emphasized","emphasised","emphasizes","emphasises","emphasizing","emphasising","enameled","enamelled","enameling","enamelling","enamored","enamoured","encyclopedia","encyclopaedia","encyclopedias","encyclopaedias","encyclopedic","encyclopaedic","endeavor","endeavour","endeavored","endeavoured","endeavoring","endeavouring","endeavors","endeavours","energize","energise","energized","energised","energizes","energises","energizing","energising","enroll","enrol","enrolls","enrols","enthrall","enthral","enthralls","enthrals","epaulet","epaulette","epaulets","epaulettes","epicenter","epicentre","epicenters","epicentres","epilog","epilogue","epilogs","epilogues","epitomize","epitomise","epitomized","epitomised","epitomizes","epitomises","epitomizing","epitomising","equalization","equalisation","equalize","equalise","equalized","equalised","equalizer","equaliser","equalizers","equalisers","equalizes","equalises","equalizing","equalising","eulogize","eulogise","eulogized","eulogised","eulogizes","eulogises","eulogizing","eulogising","evangelize","evangelise","evangelized","evangelised","evangelizes","evangelises","evangelizing","evangelising","exorcize","exorcise","exorcized","exorcised","exorcizes","exorcises","exorcizing","exorcising","extemporization","extemporisation","extemporize","extemporise","extemporized","extemporised","extemporizes","extemporises","extemporizing","extemporising","externalization","externalisation","externalizations","externalisations","externalize","externalise","externalized","externalised","externalizes","externalises","externalizing","externalising","factorize","factorise","factorized","factorised","factorizes","factorises","factorizing","factorising","fecal","faecal","feces","faeces","familiarization","familiarisation","familiarize","familiarise","familiarized","familiarised","familiarizes","familiarises","familiarizing","familiarising","fantasize","fantasise","fantasized","fantasised","fantasizes","fantasises","fantasizing","fantasising","favor","favour","favorable","favourable","favorably","favourably","favored","favoured","favoring","favouring","favorite","favourite","favorites","favourites","favoritism","favouritism","favors","favours","feminize","feminise","feminized","feminised","feminizes","feminises","feminizing","feminising","fertilization","fertilisation","fertilize","fertilise","fertilized","fertilised","fertilizer","fertiliser","fertilizers","fertilisers","fertilizes","fertilises","fertilizing","fertilising","fervor","fervour","fiber","fibre","fiberglass","fibreglass","fibers","fibres","fictionalization","fictionalisation","fictionalizations","fictionalisations","fictionalize","fictionalise","fictionalized","fictionalised","fictionalizes","fictionalises","fictionalizing","fictionalising","filet","fillet","fileted","filleted","fileting","filleting","filets","fillets","finalization","finalisation","finalize","finalise","finalized","finalised","finalizes","finalises","finalizing","finalising","flutist","flautist","flutists","flautists","flavor","flavour","flavored","flavoured","flavoring","flavouring","flavorings","flavourings","flavorless","flavourless","flavors","flavours","flavorsome","flavoursome","fetal","foetal","fetid","foetid","fetus","foetus","fetuses","foetuses","formalization","formalisation","formalize","formalise","formalized","formalised","formalizes","formalises","formalizing","formalising","fossilization","fossilisation","fossilize","fossilise","fossilized","fossilised","fossilizes","fossilises","fossilizing","fossilising","fraternization","fraternisation","fraternize","fraternise","fraternized","fraternised","fraternizes","fraternises","fraternizing","fraternising","fulfill","fulfil","fulfillment","fulfilment","fulfills","fulfils","funneled","funnelled","funneling","funnelling","galvanize","galvanise","galvanized","galvanised","galvanizes","galvanises","galvanizing","galvanising","gamboled","gambolled","gamboling","gambolling","gasses","gases","gage","gauge","gaged","gauged","gages","gauges","gaging","gauging","generalization","generalisation","generalizations","generalisations","generalize","generalise","generalized","generalised","generalizes","generalises","generalizing","generalising","ghettoize","ghettoise","ghettoized","ghettoised","ghettoizes","ghettoises","ghettoizing","ghettoising","gypsies","gipsies","glamorize","glamorise","glamorized","glamorised","glamorizes","glamorises","glamorizing","glamorising","glamor","glamour","globalization","globalisation","globalize","globalise","globalized","globalised","globalizes","globalises","globalizing","globalising","gluing","glueing","goiter","goitre","goiters","goitres","gonorrhea","gonorrhoea","graveled","gravelled","gray","grey","grayed","greyed","graying","greying","grayish","greyish","grayness","greyness","grays","greys","groveled","grovelled","groveling","grovelling","grueling","gruelling","gruelingly","gruellingly","gynecological","gynaecological","gynecologist","gynaecologist","gynecologists","gynaecologists","gynecology","gynaecology","hematological","haematological","hematologist","haematologist","hematologists","haematologists","hematology","haematology","hemoglobin","haemoglobin","hemophilia","haemophilia","hemophiliac","haemophiliac","hemophiliacs","haemophiliacs","hemorrhage","haemorrhage","hemorrhaged","haemorrhaged","hemorrhages","haemorrhages","hemorrhaging","haemorrhaging","hemorrhoids","haemorrhoids","harbor","harbour","harbored","harboured","harboring","harbouring","harbors","harbours","harmonization","harmonisation","harmonize","harmonise","harmonized","harmonised","harmonizes","harmonises","harmonizing","harmonising","homeopath","homoeopath","homeopathic","homoeopathic","homeopaths","homoeopaths","homeopathy","homoeopathy","homogenize","homogenise","homogenized","homogenised","homogenizes","homogenises","homogenizing","homogenising","honor","honour","honorable","honourable","honorably","honourably","honored","honoured","honoring","honouring","honors","honours","hospitalization","hospitalisation","hospitalize","hospitalise","hospitalized","hospitalised","hospitalizes","hospitalises","hospitalizing","hospitalising","hot up","heat up","hots up","heats up","hotting up","heating up","humanize","humanise","humanized","humanised","humanizes","humanises","humanizing","humanising","humor","humour","humored","humoured","humoring","humouring","humorless","humourless","humors","humours","hybridize","hybridise","hybridized","hybridised","hybridizes","hybridises","hybridizing","hybridising","hypnotize","hypnotise","hypnotized","hypnotised","hypnotizes","hypnotises","hypnotizing","hypnotising","hypothesize","hypothesise","hypothesized","hypothesised","hypothesizes","hypothesises","hypothesizing","hypothesising","idealization","idealisation","idealize","idealise","idealized","idealised","idealizes","idealises","idealizing","idealising","idolize","idolise","idolized","idolised","idolizes","idolises","idolizing","idolising","immobilization","immobilisation","immobilize","immobilise","immobilized","immobilised","immobilizer","immobiliser","immobilizers","immobilisers","immobilizes","immobilises","immobilizing","immobilising","immortalize","immortalise","immortalized","immortalised","immortalizes","immortalises","immortalizing","immortalising","immunization","immunisation","immunize","immunise","immunized","immunised","immunizes","immunises","immunizing","immunising","impaneled","impanelled","impaneling","impanelling","imperiled","imperilled","imperiling","imperilling","inbuilt","built-in","in-built","built-in","individualize","individualise","individualized","individualised","individualizes","individualises","individualizing","individualising","industrialize","industrialise","industrialized","industrialised","industrializes","industrialises","industrializing","industrialising","inflection","inflexion","inflections","inflexions","initialed","initialled","initialing","initialling","initialize","initialise","initializes","initialises","initializer","initialiser","initializers","initialisers","initializing","initialising","initialized","initialised","initialization","initialisation","institutionalization","institutionalisation","institutionalize","institutionalise","institutionalized","institutionalised","institutionalizes","institutionalises","institutionalizing","institutionalising","intellectualize","intellectualise","intellectualized","intellectualised","intellectualizes","intellectualises","intellectualizing","intellectualising","internalization","internalisation","internalize","internalise","internalized","internalised","internalizes","internalises","internalizing","internalising","internationalization","internationalisation","internationalize","internationalise","internationalized","internationalised","internationalizes","internationalises","internationalizing","internationalising","ionization","ionisation","ionize","ionise","ionized","ionised","ionizer","ioniser","ionizers","ionisers","ionizes","ionises","ionizing","ionising","italicize","italicise","italicized","italicised","italicizes","italicises","italicizing","italicising","itemize","itemise","itemized","itemised","itemizes","itemises","itemizing","itemising","jeopardize","jeopardise","jeopardized","jeopardised","jeopardizes","jeopardises","jeopardizing","jeopardising","jeweled","jewelled","jeweler","jeweller","jewelers","jewellers","jewelry","jewellery","kilometer","kilometre","kilometers","kilometres","labeled","labelled","labeling","labelling","labor","labour","labored","laboured","laborer","labourer","laborers","labourers","laboring","labouring","labors","labours","lackluster","lacklustre","legalization","legalisation","legalize","legalise","legalized","legalised","legalizes","legalises","legalizing","legalising","legitimize","legitimise","legitimized","legitimised","legitimizes","legitimises","legitimizing","legitimising","leukemia","leukaemia","leveled","levelled","leveler","leveller","levelers","levellers","leveling","levelling","libeled","libelled","libeling","libelling","libelous","libellous","liberalization","liberalisation","liberalize","liberalise","liberalized","liberalised","liberalizes","liberalises","liberalizing","liberalising","lionization","lionisation","lionize","lionise","lionized","lionised","lionizes","lionises","lionizing","lionising","liquidize","liquidise","liquidized","liquidised","liquidizer","liquidiser","liquidizers","liquidisers","liquidizes","liquidises","liquidizing","liquidising","liter","litre","liters","litres","localize","localise","localized","localised","localizes","localises","localizing","localising","localization","localisation","loosing","losing","louver","louvre","louvered","louvred","louvers","louvres","luster","lustre","magnetize","magnetise","magnetized","magnetised","magnetizes","magnetises","magnetizing","magnetising","maneuverability","manoeuvrability","maneuverable","manoeuvrable","maneuver","manoeuvre","maneuvered","manoeuvred","maneuvers","manoeuvres","maneuvering","manoeuvring","maneuverings","manoeuvrings","marginalization","marginalisation","marginalize","marginalise","marginalized","marginalised","marginalizes","marginalises","marginalizing","marginalising","marshaled","marshalled","marshaling","marshalling","marveled","marvelled","marveling","marvelling","marvelous","marvellous","marvelously","marvellously","materialization","materialisation","materialize","materialise","materialized","materialised","materializes","materialises","materializing","materialising","math(?!.)","maths","maximization","maximisation","maximize","maximise","maximized","maximised","maximizes","maximises","maximizing","maximising","meager","meagre","mechanization","mechanisation","mechanize","mechanise","mechanized","mechanised","mechanizes","mechanises","mechanizing","mechanising","mediaeval","medieval","memorialize","memorialise","memorialized","memorialised","memorializes","memorialises","memorializing","memorialising","memorize","memorise","memorized","memorised","memorizes","memorises","memorizing","memorising","mesmerize","mesmerise","mesmerized","mesmerised","mesmerizes","mesmerises","mesmerizing","mesmerising","metabolize","metabolise","metabolized","metabolised","metabolizes","metabolises","metabolizing","metabolising","micrometer","micrometre","micrometers","micrometres","militarize","militarise","militarized","militarised","militarizes","militarises","militarizing","militarising","milliliter","millilitre","milliliters","millilitres","millimeter","millimetre","millimeters","millimetres","miniaturization","miniaturisation","miniaturize","miniaturise","miniaturized","miniaturised","miniaturizes","miniaturises","miniaturizing","miniaturising","minibusses","minibuses","minimize","minimise","minimized","minimised","minimizes","minimises","minimizing","minimising","misbehavior","misbehaviour","misdemeanor","misdemeanour","misdemeanors","misdemeanours","miter","mitre","miters","mitres","mobilization","mobilisation","mobilize","mobilise","mobilized","mobilised","mobilizes","mobilises","mobilizing","mobilising","modeled","modelled","modeler","modeller","modelers","modellers","modeling","modelling","modernize","modernise","modernized","modernised","modernizes","modernises","modernizing","modernising","moisturize","moisturise","moisturized","moisturised","moisturizer","moisturiser","moisturizers","moisturisers","moisturizes","moisturises","moisturizing","moisturising","monetized","monetised","monetizing","monetising","monolog","monologue","monologs","monologues","monopolization","monopolisation","monopolize","monopolise","monopolized","monopolised","monopolizes","monopolises","monopolizing","monopolising","moralize","moralise","moralized","moralised","moralizes","moralises","moralizing","moralising","motorized","motorised","mold","mould","molded","moulded","molder","moulder","moldered","mouldered","moldering","mouldering","molders","moulders","moldier","mouldier","moldiest","mouldiest","molding","moulding","moldings","mouldings","molds","moulds","moldy","mouldy","molt","moult","molted","moulted","molting","moulting","molts","moults","mustache","moustache","mustached","moustached","mustaches","moustaches","mustachioed","moustachioed","multicolored","multicoloured","nationalization","nationalisation","nationalizations","nationalisations","nationalize","nationalise","nationalized","nationalised","nationalizes","nationalises","nationalizing","nationalising","naturalization","naturalisation","naturalize","naturalise","naturalized","naturalised","naturalizes","naturalises","naturalizing","naturalising","neighbor","neighbour","neighborhood","neighbourhood","neighborhoods","neighbourhoods","neighboring","neighbouring","neighborliness","neighbourliness","neighborly","neighbourly","neighbors","neighbours","neutralization","neutralisation","neutralize","neutralise","neutralized","neutralised","neutralizes","neutralises","neutralizing","neutralising","normalization","normalisation","normalize","normalise","normalized","normalised","normalizes","normalises","normalizing","normalising","odor","odour","odorless","odourless","odors","odours","esophagus","oesophagus","esophaguses","oesophaguses","estrogen","oestrogen","offense","offence","offenses","offences","omelet","omelette","omelets","omelettes","optimization","optimisation","optimizations","optimisations","optimize","optimise","optimized","optimised","optimizer","optimiser","optimizes","optimises","optimizing","optimising","optimization","optimisation","optimizations","optimisations"," or not(?! to)","","organization","organisation","organizational","organisational","organizations","organisations","organize","organise","organized","organised","organizer","organiser","organizers","organisers","organizes","organises","organizing","organising","orthopedic","orthopaedic","orthopedics","orthopaedics","ostracize","ostracise","ostracized","ostracised","ostracizes","ostracises","ostracizing","ostracising","outmaneuver","outmanoeuvre","outmaneuvered","outmanoeuvred","outmaneuvers","outmanoeuvres","outmaneuvering","outmanoeuvring","overemphasize","overemphasise","overemphasized","overemphasised","overemphasizes","overemphasises","overemphasizing","overemphasising","oxidization","oxidisation","oxidize","oxidise","oxidized","oxidised","oxidizes","oxidises","oxidizing","oxidising","pederast","paederast","pederasts","paederasts","pediatric","paediatric","pediatrician","paediatrician","pediatricians","paediatricians","pediatrics","paediatrics","pedophile","paedophile","pedophiles","paedophiles","pedophilia","paedophilia","paleolithic","palaeolithic","paleontologist","palaeontologist","paleontologists","palaeontologists","paleontology","palaeontology","paneled","panelled","paneling","panelling","panelist","panellist","panelists","panellists","paralyze","paralyse","paralyzed","paralysed","paralyzes","paralyses","paralyzing","paralysing","parceled","parcelled","parceling","parcelling","parenthesize","parenthesise","parenthesized","parenthesised","parlor","parlour","parlors","parlours","particularize","particularise","particularized","particularised","particularizes","particularises","particularizing","particularising","passivization","passivisation","passivize","passivise","passivized","passivised","passivizes","passivises","passivizing","passivising","pasteurization","pasteurisation","pasteurize","pasteurise","pasteurized","pasteurised","pasteurizes","pasteurises","pasteurizing","pasteurising","patronize","patronise","patronized","patronised","patronizes","patronises","patronizing","patronising","patronizingly","patronisingly","pedaled","pedalled","pedaling","pedalling","pedestrianization","pedestrianisation","pedestrianize","pedestrianise","pedestrianized","pedestrianised","pedestrianizes","pedestrianises","pedestrianizing","pedestrianising","penalize","penalise","penalized","penalised","penalizes","penalises","penalizing","penalising","penciled","pencilled","penciling","pencilling","personalize","personalise","personalized","personalised","personalizes","personalises","personalization","personalisation","personalizing","personalising","pharmacopeia","pharmacopoeia","pharmacopeias","pharmacopoeias","philosophize","philosophise","philosophized","philosophised","philosophizes","philosophises","philosophizing","philosophising","plagiarize","plagiarise","plagiarized","plagiarised","plagiarizes","plagiarises","plagiarizing","plagiarising","plow","plough","plowed","ploughed","plowing","ploughing","plowman","ploughman","plowmen","ploughmen","plows","ploughs","plowshare","ploughshare","plowshares","ploughshares","polarization","polarisation","polarize","polarise","polarized","polarised","polarizes","polarises","polarizing","polarising","politicization","politicisation","politicize","politicise","politicized","politicised","politicizes","politicises","politicizing","politicising","popularization","popularisation","popularize","popularise","popularized","popularised","popularizes","popularises","popularizing","popularising","pouf","pouffe","poufs","pouffes","practiced","practised","practices","practises","practicing","practising","presidium","praesidium","presidiums","praesidiums","pressurization","pressurisation","pressurize","pressurise","pressurized","pressurised","pressurizes","pressurises","pressurizing","pressurising","pretense","pretence","pretenses","pretences","primeval","primaeval","prioritization","prioritisation","prioritize","prioritise","prioritized","prioritised","prioritizes","prioritises","prioritizing","prioritising","privatization","privatisation","privatizations","privatisations","privatize","privatise","privatized","privatised","privatizes","privatises","privatizing","privatising","professionalization","professionalisation","professionalize","professionalise","professionalized","professionalised","professionalizes","professionalises","professionalizing","professionalising","prolog","prologue","prologs","prologues","propagandize","propagandise","propagandized","propagandised","propagandizes","propagandises","propagandizing","propagandising","proselytize","proselytise","proselytized","proselytised","proselytizer","proselytiser","proselytizers","proselytisers","proselytizes","proselytises","proselytizing","proselytising","psychoanalyze","psychoanalyse","psychoanalyzed","psychoanalysed","psychoanalyzes","psychoanalyses","psychoanalyzing","psychoanalysing","publicize","publicise","publicized","publicised","publicizes","publicises","publicizing","publicising","pulverization","pulverisation","pulverize","pulverise","pulverized","pulverised","pulverizes","pulverises","pulverizing","pulverising","pummel","pummelled","pummeled","pummelling","pajama","pyjama","pajamas","pyjamas","quarreled","quarrelled","quarreling","quarrelling","radicalize","radicalise","radicalized","radicalised","radicalizes","radicalises","radicalizing","radicalising","rancor","rancour","randomize","randomise","randomized","randomised","randomizes","randomises","randomizing","randomising","rationalization","rationalisation","rationalizations","rationalisations","rationalize","rationalise","rationalized","rationalised","rationalizes","rationalises","rationalizing","rationalising","raveled","ravelled","raveling","ravelling","realizable","realisable","realization","realisation","realizations","realisations","realize","realise","realized","realised","realizes","realises","realizing","realising","recieve","receive","recieved","received","recieving","receiving","recognizable","recognisable","recognizably","recognisably","recognizance","recognisance","recognize","recognise","recognized","recognised","recognizes","recognises","recognizing","recognising","reconnoiter","reconnoitre","reconnoitered","reconnoitred","reconnoiters","reconnoitres","reconnoitering","reconnoitring","refueled","refuelled","refueling","refuelling","regularization","regularisation","regularize","regularise","regularized","regularised","regularizes","regularises","regularizing","regularising","remodeled","remodelled","remodeling","remodelling","remold","remould","remolded","remoulded","remolding","remoulding","remolds","remoulds","reorganization","reorganisation","reorganizations","reorganisations","reorganize","reorganise","reorganized","reorganised","reorganizes","reorganises","reorganizing","reorganising","reveled","revelled","reveler","reveller","revelers","revellers","reveling","revelling","revitalize","revitalise","revitalized","revitalised","revitalizes","revitalises","revitalizing","revitalising","revolutionize","revolutionise","revolutionized","revolutionised","revolutionizes","revolutionises","revolutionizing","revolutionising","rhapsodize","rhapsodise","rhapsodized","rhapsodised","rhapsodizes","rhapsodises","rhapsodizing","rhapsodising","rigor","rigour","rigors","rigours","ritualized","ritualised","rivaled","rivalled","rivaling","rivalling","romanticize","romanticise","romanticized","romanticised","romanticizes","romanticises","romanticizing","romanticising","rumor","rumour","rumored","rumoured","rumors","rumours","saber","sabre","sabers","sabres","saltpeter","saltpetre","sanitize","sanitise","sanitized","sanitised","sanitizes","sanitises","sanitizing","sanitising","satirize","satirise","satirized","satirised","satirizes","satirises","satirizing","satirising","savior","saviour","saviors","saviours","savor","savour","savored","savoured","savories","savouries","savoring","savouring","savors","savours","savory","savoury","scandalize","scandalise","scandalized","scandalised","scandalizes","scandalises","scandalizing","scandalising","seperate","separate","skeptic","sceptic","skeptical","sceptical","skeptically","sceptically","skepticism","scepticism","skeptics","sceptics","scepter","sceptre","scepters","sceptres","scrutinize","scrutinise","scrutinized","scrutinised","scrutinizes","scrutinises","scrutinizing","scrutinising","secularization","secularisation","secularize","secularise","secularized","secularised","secularizes","secularises","secularizing","secularising","sensationalize","sensationalise","sensationalized","sensationalised","sensationalizes","sensationalises","sensationalizing","sensationalising","sensitize","sensitise","sensitized","sensitised","sensitizes","sensitises","sensitizing","sensitising","sentimentalize","sentimentalise","sentimentalized","sentimentalised","sentimentalizes","sentimentalises","sentimentalizing","sentimentalising","sepulcher","sepulchre","sepulchers","sepulchres","serialization","serialisation","serializations","serialisations","serialize","serialise","serialized","serialised","serializes","serialises","serializing","serialising","sermonize","sermonise","sermonized","sermonised","sermonizes","sermonises","sermonizing","sermonising","shoveled","shovelled","shoveling","shovelling","shriveled","shrivelled","shriveling","shrivelling","signalize","signalise","signalized","signalised","signalizes","signalises","signalizing","signalising","signaled","signalled","signaling","signalling","smolder","smoulder","smoldered","smouldered","smoldering","smouldering","smolders","smoulders","sniveled","snivelled","sniveling","snivelling","snorkeled","snorkelled","snorkeling","snorkelling","snowplow","snowplough","snowplow","snowploughs","socialization","socialisation","socialize","socialise","socialized","socialised","socializes","socialises","socializing","socialising","sodomize","sodomise","sodomized","sodomised","sodomizes","sodomises","sodomizing","sodomising","solemnize","solemnise","solemnized","solemnised","solemnizes","solemnises","solemnizing","solemnising","somber","sombre","specialization","specialisation","specializations","specialisations","specialize","specialise","specialized","specialised","specializes","specialises","specializing","specialising","specter","spectre","specters","spectres","spiraled","spiralled","spiraling","spiralling","splendor","splendour","splendors","splendours","squirreled","squirrelled","squirreling","squirrelling","stabilization","stabilisation","stabilize","stabilise","stabilized","stabilised","stabilizer","stabiliser","stabilizers","stabilisers","stabilizes","stabilises","stabilizing","stabilising","standardization","standardisation","standardize","standardise","standardized","standardised","standardizes","standardises","standardizing","standardising","stenciled","stencilled","stenciling","stencilling","sterilization","sterilisation","sterilizations","sterilisations","sterilize","sterilise","sterilized","sterilised","sterilizer","steriliser","sterilizers","sterilisers","sterilizes","sterilises","sterilizing","sterilising","stigmatization","stigmatisation","stigmatize","stigmatise","stigmatized","stigmatised","stigmatizes","stigmatises","stigmatizing","stigmatising","subsidization","subsidisation","subsidize","subsidise","subsidized","subsidised","subsidizer","subsidiser","subsidizers","subsidisers","subsidizes","subsidises","subsidizing","subsidising","succor","succour","succored","succoured","succoring","succouring","succors","succours","sulfate","sulphate","sulfates","sulphates","sulfide","sulphide","sulfides","sulphides","sulfur","sulphur","sulfurous","sulphurous","summarize","summarise","summarized","summarised","summarizes","summarises","summarizing","summarising","swiveled","swivelled","swiveling","swivelling","symbolize","symbolise","symbolized","symbolised","symbolizes","symbolises","symbolizing","symbolising","sympathize","sympathise","sympathized","sympathised","sympathizer","sympathiser","sympathizers","sympathisers","sympathizes","sympathises","sympathizing","sympathising","synchronization","synchronisation","synchronize","synchronise","synchronized","synchronised","synchronizes","synchronises","synchronizing","synchronising","synthesize","synthesise","synthesized","synthesised","synthesizer","synthesiser","synthesizers","synthesisers","synthesizes","synthesises","synthesizing","synthesising","siphon","syphon","siphoned","syphoned","siphoning","syphoning","siphons","syphons","systematization","systematisation","systematize","systematise","systematized","systematised","systematizes","systematises","systematizing","systematising","tantalize","tantalise","tantalized","tantalised","tantalizes","tantalises","tantalizing","tantalising","tantalizingly","tantalisingly","tasseled","tasselled","technicolor","technicolour","te","the","teh","the","the the","the","temporize","temporise","temporized","temporised","temporizes","temporises","temporizing","temporising","tenderize","tenderise","tenderized","tenderised","tenderizes","tenderises","tenderizing","tenderising","terrorize","terrorise","terrorized","terrorised","terrorizes","terrorises","terrorizing","terrorising","theater","theatre","theatergoer","theatregoer","theatergoers","theatregoers","theaters","theatres","theorize","theorise","theorized","theorised","theorizes","theorises","theorizing","theorising","thier","their","toweled","towelled","toweling","towelling","toxemia","toxaemia","tranquilize","tranquillise","tranquilized","tranquillised","tranquilizer","tranquilliser","tranquilizers","tranquillisers","tranquilizes","tranquillises","tranquilizing","tranquillising","tranquility","tranquillity","transistorized","transistorised","traumatize","traumatise","traumatized","traumatised","traumatizes","traumatises","traumatizing","traumatising","traveled","travelled","traveler","traveller","travelers","travellers","traveling","travelling","travelog","travelogue","travelogs","travelogues","trialed","trialled","trialing","trialling","tricolor","tricolour","tricolors","tricolours","trivialize","trivialise","trivialized","trivialised","trivializes","trivialises","trivializing","trivialising","tumor","tumour","tumors","tumours","tunneled","tunnelled","tunneling","tunnelling","tyrannize","tyrannise","tyrannized","tyrannised","tyrannizes","tyrannises","tyrannizing","tyrannising","unauthorized","unauthorised","uncivilized","uncivilised","underutilized","underutilised","unequaled","unequalled","unfavorable","unfavourable","unfavorably","unfavourably","unionization","unionisation","unionize","unionise","unionized","unionised","unionizes","unionises","unionizing","unionising","unorganized","unorganised","unraveled","unravelled","unraveling","unravelling","unrecognizable","unrecognisable","unrecognized","unrecognised","unrivaled","unrivalled","unsavory","unsavoury","untrammeled","untrammelled","urbanization","urbanisation","urbanize","urbanise","urbanized","urbanised","urbanizes","urbanises","urbanizing","urbanising","useage","usage","utilizable","utilisable","utilization","utilisation","utilize","utilise","utilized","utilised","utilizes","utilises","utilizing","utilising","valor","valour","vandalize","vandalise","vandalized","vandalised","vandalizes","vandalises","vandalizing","vandalising","vaporization","vaporisation","vaporize","vaporise","vaporized","vaporised","vaporizes","vaporises","vaporizing","vaporising","vapor","vapour","vapors","vapours","verbalize","verbalise","verbalized","verbalised","verbalizes","verbalises","verbalizing","verbalising","victimization","victimisation","victimize","victimise","victimized","victimised","victimizes","victimises","victimizing","victimising","videodisk","videodisc","videodisks","videodiscs","vigor","vigour","virtualization","virtualisation","visualization","visualisation","visualizations","visualisations","visualize","visualise","visualized","visualised","visualizes","visualises","visualizing","visualising","vocalization","vocalisation","vocalizations","vocalisations","vocalize","vocalise","vocalized","vocalised","vocalizes","vocalises","vocalizing","vocalising","vulcanized","vulcanised","vulgarization","vulgarisation","vulgarize","vulgarise","vulgarized","vulgarised","vulgarizes","vulgarises","vulgarizing","vulgarising","wagon","waggon","wagons","waggons","watercolor","watercolour","watercolors","watercolours","weaseled","weaselled","weaseling","weaselling","wierd","weird","westernization","westernisation","westernize","westernise","westernized","westernised","westernizes","westernises","westernizing","westernising","womanize","womanise","womanized","womanised","womanizer","womaniser","womanizers","womanisers","womanizes","womanises","womanizing","womanising","woolen","woollen","woolens","woollens","woolies","woollies","wooly","woolly","yodeled","yodelled","yodeling","yodelling","yogurts","yoghourts","yogurt","yoghurt","yogurts","yoghurts","abbout","about","abotu","about","abouta","about a","aboutit","about it","aboutthe","about the","abscence","absence","accesories","accessories","accidant","accident","accomodate","accommodate","accordingto","according to","accross","across","acheive","achieve","acheived","achieved","acheiving","achieving","acn","can","acommodate","accommodate","acomodate","accommodate","actualyl","actually","additinal","additional","addtional","additional","adequit","adequate","adequite","adequate","adn","and","advanage","advantage","affraid","afraid","afterthe","after the","aganist","against","aggresive","aggressive","agian","again","agreemeent","agreement","agreemeents","agreements","agreemnet","agreement","agreemnets","agreements","agressive","aggressive","ahppen","happen","ahve","have","allwasy","always","allwyas","always","almots","almost","almsot","almost","alomst","almost","alot","a lot","alraedy","already","alreayd","already","alreday","already","alwasy","always","alwats","always","alway","always","alwyas","always","amde","made","ameria","America","amke","make","amkes","makes","anbd","and","andone","and one","andteh","and the","andthe","and the","anothe","another","anual","annual","apparant","apparent","apparrent","apparent","appearence","appearance","appeares","appears","applicaiton","application","applicaitons","applications","applyed","applied","appointiment","appointment","approrpiate","appropriate","approrpriate","appropriate","aquisition","acquisition","aquisitions","acquisitions","aren;t","aren't","arguement","argument","arguements","arguments","arn't","aren't","arond","around","artical","article","articel","article","asdvertising","advertising","assistent","assistant","asthe","as the","atention","attention","atmospher","atmosphere","attentioin","attention","atthe","at the","audeince","audience","audiance","audience","availalbe","available","awya","away","aywa","away","bakc","back","balence","balance","ballance","balance","baout","about","bcak","back","beacuse","because","becasue","because","becaus","because","becausea","because a","becauseof","because of","becausethe","because the","becauseyou","because you","becomeing","becoming","becomming","becoming","becuase","because","becuse","because","befoer","before","beggining","beginning","begining","beginning","beginining","beginning","beleiev","believe","beleieve","believe","beleif","belief","beleive","believe","beleived","believed","beleives","believes","benifit","benefit","benifits","benefits","betwen","between","beutiful","beautiful","blase","blasé","boxs","boxes","brodcast","broadcast","butthe","but the","bve","be","cafe","café","caharcter","character","calcullated","calculated","calulated","calculated","can;t","can't","candidtae","candidate","candidtaes","candidates","catagory","category","categiory","category","certian","certain","challange","challenge","challanges","challenges","chaneg","change","chanegs","changes","changable","changeable","changeing","changing","changng","changing","charachter","character","charachters","characters","charactor","character","charecter","character","charector","character","cheif","chief","chekc","check","chnage","change","cieling","ceiling","circut","circuit","claer","clear","claered","cleared","claerly","clearly","cliant","client","cliche","cliché","cna","can","colection","collection","comanies","companies","comany","company","comapnies","companies","comapny","company","combintation","combination","comited","committed","comittee","committee","commadn","command","comming","coming","commitee","committee","committe","committee","committment","commitment","committments","commitments","committy","committee","comntain","contain","comntains","contains","compair","compare","company;s","company's","compleated","completed","compleatly","completely","compleatness","completeness","completly","completely","completness","completeness","composate","composite","comtain","contain","comtains","contains","comunicate","communicate","comunity","community","condolances","condolences","conected","connected","conferance","conference","confirmmation","confirmation","considerit","considerate","considerite","considerate","consonent","consonant","conspiricy","conspiracy","consultent","consultant","convertable","convertible","cooparate","cooperate","cooporate","cooperate","corproation","corporation","corproations","corporations","corruptable","corruptible","cotten","cotton","coudl","could","coudln't","couldn't","coudn't","couldn't","couldn;t","couldn't","couldnt","couldn't","couldthe","could the","cpoy","copy","creme","crème","ctaegory","category","cusotmer","customer","cusotmers","customers","cutsomer","customer","cutsomers","customers","cxan","can","danceing","dancing","dcument","document","deatils","details","decison","decision","decisons","decisions","decor","décor","defendent","defendant","definately","definitely","deptartment","department","desicion","decision","desicions","decisions","desision","decision","desisions","decisions","detente","détente","develeoprs","developers","devellop","develop","develloped","developed","develloper","developer","devellopers","developers","develloping","developing","devellopment","development","devellopments","developments","devellops","develop","develope","develop","developement","development","developements","developments","developor","developer","developors","developers","develpment","development","diaplay","display","didint","didn't","didn;t","didn't","didnot","did not","didnt","didn't","difefrent","different","diferences","differences","differance","difference","differances","differences","differant","different","differemt","different","differnt","different","diffrent","different","directer","director","directers","directors","directiosn","direction","disatisfied","dissatisfied","discoverd","discovered","disign","design","dispaly","display","dissonent","dissonant","distribusion","distribution","divsion","division","do'nt","don't","docuement","documents","docuemnt","document","documetn","document","documnet","document","documnets","documents","doens't","doesn't","doese","does","doesn;t","doesn't","doesnt","doesn't","doign","doing","doimg","doing","doind","doing","dollers","dollars","don;t","don't","donig","doing","dont","don't","dosn't","doesn't","driveing","driving","drnik","drink","eclair","éclair","efel","feel","effecient","efficient","efort","effort","eforts","efforts","ehr","her","eligable","eligible","embarass","embarrass","emigre","émigré","enought","enough","entree","entrée","equippment","equipment","equivalant","equivalent","esle","else","especally","especially","especialyl","especially","espesially","especially","excellant","excellent","excercise","exercise","exchagne","exchange","exchagnes","exchanges","excitment","excitement","exhcange","exchange","exhcanges","exchanges","experiance","experience","experienc","experience","exprience","experience","exprienced","experienced","eyt","yet","facade","façade","faeture","feature","faetures","features","familair","familiar","familar","familiar","familliar","familiar","fammiliar","familiar","feild","field","feilds","fields","fianlly","finally","fidn","find","finalyl","finally","firends","friends","firts","first","follwo","follow","follwoing","following","fora","for a","foriegn","foreign","forthe","for the","forwrd","forward","forwrds","forwards","foudn","found","foward","forward","fowards","forwards","freind","friend","freindly","friendly","freinds","friends","frmo","from","fromthe","from the","furneral","funeral","fwe","few","garantee","guarantee","gaurd","guard","gemeral","general","gerat","great","geting","getting","gettin","getting","gievn","given","giveing","giving","gloabl","global","goign","going","gonig","going","govenment","government","goverment","government","gruop","group","gruops","groups","grwo","grow","guidlines","guidelines","hadbeen","had been","hadn;t","hadn't","haev","have","hapen","happen","hapened","happened","hapening","happening","hapens","happens","happend","happened","hasbeen","has been","hasn;t","hasn't","hasnt","hasn't","havebeen","have been","haveing","having","haven;t","haven't","hda","had","he;ll","he'll","hearign","hearing","helpfull","helpful","herat","heart","here;s","here's","hesaid","he said","hewas","he was","hge","he","hismelf","himself","hlep","help","hsa","has","hsi","his","hte","the","htere","there","htese","these","htey","they","hting","thing","htink","think","htis","this","hvae","have","hvaing","having","hwich","which","i\"m","i'm","i;d","i'd","i;ll","i'll","idae","idea","idaes","ideas","identofy","identify","ihs","his","imediate","immediate","imediatly","immediately","immediatly","immediately","importent","important","importnat","important","impossable","impossible","improvemnt","improvement","improvment","improvement","includ","include","indecate","indicate","indenpendence","independence","indenpendent","independent","indepedent","independent","independance","independence","independant","independent","influance","influence","infomation","information","informatoin","information","inital","initial","instaleld","installed","insted","instead","insurence","insurance","inteh","in the","interum","interim","inthe","in the","inwhich","in which","isn;t","isn't","isthe","is the","it;ll","it'll","it;s","it's","itis","it is","ititial","initial","itnerest","interest","itnerested","interested","itneresting","interesting","itnerests","interests","itwas","it was","iwll","will","iwth","with","jsut","just","jugment","judgment","knowldge","knowledge","knowlege","knowledge","knwo","know","knwon","known","knwos","knows","konw","know","konwn","known","konws","knows","labratory","laboratory","lastyear","last year","learnign","learning","lenght","length","let;s","let's","levle","level","libary","library","librarry","library","librery","library","liek","like","liekd","liked","lieutenent","lieutenant","liev","live","likly","likely","lisense","license","littel","little","litttle","little","liuke","like","liveing","living","loev","love","lonly","lonely","lookign","looking","maintenence","maintenance","makeing","making","managment","management","mantain","maintain","marraige","marriage","memeber","member","merchent","merchant","mesage","message","mesages","messages","mispell","misspell","mispelling","misspelling","mispellings","misspellings","mkae","make","mkaes","makes","mkaing","making","moeny","money","morgage","mortgage","mroe","more","mysefl","myself","myu","my","naive","naïve","necassarily","necessarily","necassary","necessary","neccessarily","necessarily","neccessary","necessary","necesarily","necessarily","necesary","necessary","negotiaing","negotiating","nkow","know","nothign","nothing","nver","never","nwe","new","nwo","now","obediant","obedient","ocasion","occasion","occassion","occasion","occured","occurred","occurence","occurrence","occurrance","occurrence","ocur","occur","oeprator","operator","ofits","of its","ofthe","of the","oging","going","ohter","other","omre","more","oneof","one of","onepoint","one point","onthe","on the","onyl","only","oppasite","opposite","opperation","operation","oppertunity","opportunity","opposate","opposite","opposible","opposable","opposit","opposite","oppotunities","opportunities","oppotunity","opportunity","orginization","organization","orginized","organized","otehr","other","otu","out","outof","out of","overthe","over the","owrk","work","owuld","would","oxident","oxidant","papaer","paper","parliment","parliament","partof","part of","paymetn","payment","paymetns","payments","pciture","picture","peice","piece","peices","pieces","peolpe","people","peopel","people","percentof","percent of","percentto","percent to","performence","performance","perhasp","perhaps","perhpas","perhaps","permanant","permanent","perminent","permanent","personalyl","personally","pleasent","pleasant","poeple","people","porblem","problem","porblems","problems","porvide","provide","possable","possible","postition","position","potentialy","potentially","pregnent","pregnant","presance","presence","probelm","problem","probelms","problems","prominant","prominent","protege","protégé","protoge","protégé","psoition","position","ptogress","progress","puting","putting","pwoer","power","quater","quarter","quaters","quarters","quesion","question","quesions","questions","questioms","questions","questiosn","questions","questoin","question","quetion","question","quetions","questions","realyl","really","reccomend","recommend","reccommend","recommend","receieve","receive","recieve","receive","recieved","received","recieving","receiving","recomend","recommend","recomendation","recommendation","recomendations","recommendations","recomended","recommended","reconize","recognize","recrod","record","religous","religious","reluctent","reluctant","remeber","remember","reommend","recommend","representativs","representatives","representives","representatives","represetned","represented","represnt","represent","reserach","research","resollution","resolution","resorces","resources","respomd","respond","respomse","response","responce","response","responsability","responsibility","responsable","responsible","responsibile","responsible","responsiblity","responsibility","restaraunt","restaurant","restuarant","restaurant","reult","result","reveiw","review","reveiwing","reviewing","rumers","rumors","rwite","write","rythm","rhythm","saidhe","said he","saidit","said it","saidthat","said that","saidthe","said the","scedule","schedule","sceduled","scheduled","seance","séance","secratary","secretary","sectino","section","seh","she","selectoin","selection","sentance","sentence","separeate","separate","seperate","separate","sercumstances","circumstances","shcool","school","she;ll","she'll","shesaid","she said","shineing","shining","shiped","shipped","shoudl","should","shoudln't","shouldn't","shouldent","shouldn't","shouldn;t","shouldn't","shouldnt","shouldn't","showinf","showing","signifacnt","significant","simalar","similar","similiar","similar","simpyl","simply","sincerly","sincerely","sitll","still","smae","same","smoe","some","soem","some","sohw","show","soical","social","somethign","something","someting","something","somewaht","somewhat","somthing","something","somtimes","sometimes","soudn","sound","soudns","sounds","speach","speech","specificaly","specifically","specificalyl","specifically","statment","statement","statments","statements","stnad","stand","stopry","story","stoyr","story","stpo","stop","strentgh","strength","stroy","story","struggel","struggle","strugle","struggle","studnet","student","successfull","successful","successfuly","successfully","successfulyl","successfully","sucess","success","sucessfull","successful","sufficiant","sufficient","suposed","supposed","suppossed","supposed","suprise","surprise","suprised","surprised","swiming","swimming","tahn","than","taht","that","talekd","talked","talkign","talking","tath","that","tecnical","technical","teh","the","tehy","they","termoil","turmoil","tghe","the","tghis","this","thansk","thanks","thats","that's","thatthe","that the","themself","themselves","themselfs","themselves","thenew","the new","theri","their","thesame","the same","thetwo","the two","they;l","they'll","they;ll","they'll","they;r","they're","they;re","they're","they;v","they've","they;ve","they've","theyll","they'll","theyve","they've","thgat","that","thge","the","thier","their","thigsn","things","thisyear","this year","thna","than","thne","then","thnig","thing","thnigs","things","threatend","threatened","thsi","this","thsoe","those","thta","that","tihs","this","timne","time","tiogether","together","tje","the","tjhe","the","tkae","take","tkaes","takes","tkaing","taking","tlaking","talking","todya","today","togehter","together","tomorow","tomorrow","tongiht","tonight","tonihgt","tonight","totaly","totally","totalyl","totally","tothe","to the","towrad","toward","traditionalyl","traditionally","transfered","transferred","truely","truly","truley","truly","tryed","tried","tthe","the","tyhat","that","tyhe","the","udnerstand","understand","understnad","understand","unitedstates","United States","unliek","unlike","unpleasently","unpleasantly","untilll","until","useing","using","usualyl","usually","veyr","very","virtualyl","virtually","vis-a-vis","vis-à-vis","vrey","very","vulnerible","vulnerable","waht","what","warrent","warrant","wasnt","wasn't","watn","want","we;d","we'd","we;ll","we'll","we;re","we're","we;ve","we've","wehn","when","wern't","weren't","werre","were","what;s","what's","whcih","which","where;s","where's","wherre","where","whic","which","whihc","which","who;s","who's","who;ve","who've","whta","what","wief","wife","wierd","weird","wihch","which","wiht","with","willbe","will be","windoes","windows","witha","with a","withe","with","withthe","with the","wiull","will","wnat","want","wnated","wanted","wnats","wants","wo'nt","won't","woh","who","wohle","whole","wokr","work","won;t","won't","woudl","would","woudln't","wouldn't","wouldbe","would be","wouldn;t","wouldn't","wouldnt","wouldn't","wriet","write","writting","writing","wrod","word","wroet","wrote","wroking","working","wtih","with","wuould","would","wya","way","yera","year","yeras","years","yersa","years","yoiu","you","you;d","you'd","you;re","you're","youare","you are","youve","you've","ytou","you","yhe","the","yuo","you","yuor","your","youre","you're","1 comments","1 comment"],
	m_oaRegexs = [],

	// Metrification aliasing/calculation arrays
	m_saUnitAlias = [],
	m_raUnitFactors = [],

	// Number words lookup arrays
	m_iaWordNumber = [],
	m_iaWordFactor = [],

	// Regex replace change flag
	m_bShowLog,
	m_bChangeMade,
	m_saOrdinals = ["th", "st", "nd", "rd"],
	m_iRegex, // For use by anglicise() and cbAnglicise()
	m_oChangesDiv,
	m_iChangesTimerID,
	m_iNodeTimer,
	m_oaTextNodes = document.evaluate("//text()[normalize-space()]", document.documentElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
	m_iNode,
	m_sChanged = "";

// Proper case string prototype
String.prototype.toProperCase = function () {
	"use strict";
	return this.toLowerCase().replace(reProperCase, function ($1) {
		return $1.toUpperCase();
	});
};


// String trimming prototype
String.prototype.trim = function () {
	"use strict";
	return this.replace(reTrim, "");
};


// String stripping prototype
String.prototype.strip = function () {
	"use strict";
	return this.replace(reStrip, "");
};


// Takes a number and returns the ordinalised form
function ordinalise(iNumber, sMonth) {
	"use strict";
	var sOrdinal = "";
	iNumber = parseInt(iNumber, 10);
	if (sMonth.substr(sMonth.length - 1) !== ".") {
		if ((sMonth.length > 3) || (sMonth.toLowerCase() === "may")) {
			var iOrdinal = 0;
			var iHundredUnit = iNumber % 100;
			if ((iHundredUnit < 11) || (iHundredUnit > 13)) {
				iOrdinal = iNumber % 10;
				if (iOrdinal > 3) {
					iOrdinal = 0;
				}
			}
			sOrdinal = m_saOrdinals[iOrdinal];
		}
	}
	return iNumber + sOrdinal;
}


// Log changes made
function logChange(vMatch, sTo) {
	"use strict";
	m_bChangeMade = true;
	if (m_bShowLog)  {
		var sFrom = String((typeof(vMatch) === "object") ? vMatch[0] : vMatch);
		if (sFrom.replace(/ /g, "\u00A0") !== String(sTo).replace(/ /g, "\u00A0")) {
			var sLine = "\n" + sFrom + " > " + sTo;
			if (m_sChanged.indexOf(sLine) === -1) {
				m_sChanged += "\n" + sFrom + " > " + sTo;
			}
		}
	}
}


// US date to English (May 04 to 4th May)
function cbUSdate(sMatch, sPrefixOuter, sDayPrefix, sMonth, sDaySuffix, sComma) {
	"use strict";
	var sDate;
	if (sPrefixOuter && (sPrefixOuter.substr(0, 1) !== ":")) {
		sDate = sMatch;
	} else {
		sPrefixOuter = (sPrefixOuter || "");
		var sDay = ordinalise(sDaySuffix, sMonth);
		sMonth = sMonth.toProperCase().replace(".", "");
		var sSuffix = (/,\s?/.test(sComma) ? " " : "");
		sDate = sPrefixOuter + sDay + "\u00A0" + sMonth + sSuffix;
		logChange(sMatch, sDate);
	}
	return sDate;
}


// Ordinalise and capitalise (03 jAN to 3rd Jan)
function cbDayMonth(sMatch, sDay, sMonth) {
	"use strict";
	var sLocal;
	if (sMonth === "may") {
		sLocal = sMatch;
	} else {
		sLocal = ordinalise(sDay, sMonth) + "\u00A0" + sMonth.toProperCase();
		logChange(sMatch, sLocal);
	}
	return sLocal;
}


// ISO date to English (2008-06-28 to 28-06-2008)
function cbISO(oMatch, sYear, sSeparator, sMonth, sDay) {
	"use strict";
	var sLocal;
	if ((oMatch.index > 0) && (oMatch.input.substr(oMatch.index - 1, 1) === "/")) {
		sLocal = oMatch[0];
	} else {
		sLocal = (sDay.length === 1 ? "0" : "") + sDay + sSeparator + sMonth + sSeparator + sYear;
		logChange(oMatch[0], sLocal);
	}
	return sLocal;
}


// US separated date to English (4/13/2008 to 13/04/2008)
function cbUSnumeric(sMatch, sMonth, sSeparator, sDay, sYear) {
	"use strict";
	var sLocal = sDay + sSeparator + (sMonth.length === 1 ? "0" : "") + sMonth + sSeparator + sYear;
	logChange(sMatch, sLocal);
	return sLocal;
}


// Twelve hour to 24-hour clock (4pm to 16:00)
function cbTwelveHour(sMatch, sHours, sMinutes, sSeconds, sZone) {
	"use strict";
	var iHours = (/p/i.test(sZone) ? 12 : 0) + parseInt(sHours, 10) % 12;
	sHours = (iHours < 10 ? "0" + iHours : String(iHours));

	var iMinutes = (sMinutes ? parseInt(sMinutes, 10) : 0);
	sMinutes = (iMinutes < 10 ? "0" + iMinutes : String(iMinutes));

	var sLocal = sHours + ":" + sMinutes;

	var iSeconds = (sSeconds ? parseInt(sSeconds, 10) : 0);
	if (iSeconds) {
		sLocal += ":" + (iSeconds < 10 ? "0" + iSeconds : String(iSeconds));
	}

	logChange(sMatch, sLocal);
	return sLocal;
}


// BBC hhnn BST|GMT time zone formatting improvement
function cbBBCtime(sMatch, sHours, sMinutes, sTimeZone) {
	"use strict";
	var sColon = sHours + ":" + sMinutes + " " + sTimeZone;
	logChange(sMatch, sColon);
	return sColon;
}


// Anglicisation callback
function cbAnglicise(sMatch) {
	"use strict";
	var sEnglish = m_saUStoUK[m_iRegex * 2 + 1];

	if (sMatch.charAt(1).match(/[A-Z]/)) {
		// Uppercase
		sEnglish = sEnglish.toUpperCase();
	} else if (sMatch.match(/^[A-Z]/) || sEnglish.substring(0, 2) === "i'") {
		// Propercase
		sEnglish = sEnglish.charAt(0).toUpperCase() + sEnglish.substr(1);
	}

	logChange(sMatch, sEnglish);
	return sEnglish;
}


// Initialise metric unification
function metrificationInit() {
	"use strict";
	// Imperial to metric unit factors
	m_raUnitFactors.foot3 = [28316846.6,   "mm3"];
	m_raUnitFactors.inch3 = [   16387.064, "mm3"];

	m_raUnitFactors.mile2 = [2589988110336,	 "mm2"];
	m_raUnitFactors.acre  = [   4046856420,	 "mm2"];
	m_raUnitFactors.rood  = [   1011714105.6,  "mm2"];
	m_raUnitFactors.yard2 = [       836127.36, "mm2"];
	m_raUnitFactors.foot2 = [        92903.04, "mm2"];
	m_raUnitFactors.inch2 = [          645.16, "mm2"];

	m_raUnitFactors["nautical mile"] = [1852000,     "mm"];
	m_raUnitFactors.mile             = [1609344,     "mm"];
	m_raUnitFactors.furlong          = [ 201168,     "mm"];
	m_raUnitFactors.chain            = [  20116.8,   "mm"];
	m_raUnitFactors.rod              = [   5029.2,   "mm"];
	m_raUnitFactors.fathom           = [   1828.8,   "mm"];
	m_raUnitFactors.yard             = [    914.4,   "mm"];
	m_raUnitFactors.foot             = [    304.8,   "mm"];
	m_raUnitFactors.link             = [    201.168, "mm"];
	m_raUnitFactors.inch             = [     25.4,   "mm"];

	m_raUnitFactors.gallon            = [4546.09188,   "ml"];
	m_raUnitFactors["us gallon"]      = [3785.41178,   "ml"];
	m_raUnitFactors.quart             = [1136.52297,   "ml"];
	m_raUnitFactors["us quart"]       = [ 946.352946,  "ml"];
	m_raUnitFactors.pint              = [ 568.261485,  "ml"];
	m_raUnitFactors["us pint"]        = [ 473.176473,  "ml"];
	m_raUnitFactors["fluid ounce"]    = [  28.4130742, "ml"];
	m_raUnitFactors["us fluid ounce"] = [  29.5735296, "ml"];

	m_raUnitFactors.ton           = [907184740,      "mg"];
	m_raUnitFactors.hundredweight = [ 50802345.44,   "mg"];
	m_raUnitFactors.stone         = [  6350293.18,   "mg"];
	m_raUnitFactors.pound         = [   453592.37,   "mg"];
	m_raUnitFactors.ounce         = [    28349.5231, "mg"];

	// Metric to base unit factors
	m_raUnitFactors.kilometre3  = [ 1000000000000000000, "mm3"];
	m_raUnitFactors.hectometre3 = [    1000000000000000, "mm3"];
	m_raUnitFactors.decametre3  = [       1000000000000, "mm3"];
	m_raUnitFactors.metre3      = [          1000000000, "mm3"];
	m_raUnitFactors.decimetre3  = [             1000000, "mm3"];
	m_raUnitFactors.centimetre3 = [                1000, "mm3"];
	m_raUnitFactors.millimetre3 = [                   1, "mm3"];
	m_raUnitFactors.micrometre3 = [         0.000000001, "mm3"];
	m_raUnitFactors.nanometre3  = [0.000000000000000001, "mm3"];

	m_raUnitFactors.kilometre  = [ 1000000000000, "mm2"];
	m_raUnitFactors.hectometre = [   10000000000, "mm2"];
	m_raUnitFactors.hectare    = [   10000000000, "mm2"];
	m_raUnitFactors.decametre  = [     100000000, "mm2"];
	m_raUnitFactors.metre      = [       1000000, "mm2"];
	m_raUnitFactors.decimetre  = [         10000, "mm2"];
	m_raUnitFactors.centimetre = [           100, "mm2"];
	m_raUnitFactors.millimetre = [             1, "mm2"];
	m_raUnitFactors.micrometre = [      0.000001, "mm2"];
	m_raUnitFactors.nanometre  = [0.000000000001, "mm2"];

	m_raUnitFactors.kilometre  = [ 1000000, "mm"];
	m_raUnitFactors.hectometre = [  100000, "mm"];
	m_raUnitFactors.decametre  = [   10000, "mm"];
	m_raUnitFactors.metre      = [    1000, "mm"];
	m_raUnitFactors.decimetre  = [     100, "mm"];
	m_raUnitFactors.centimetre = [      10, "mm"];
	m_raUnitFactors.millimetre = [       1, "mm"];
	m_raUnitFactors.micrometre = [   0.001, "mm"];
	m_raUnitFactors.nanometre  = [0.000001, "mm"];

	m_raUnitFactors.tonne     = [1000000000, "mg"];
	m_raUnitFactors.kilogram  = [   1000000, "mg"];
	m_raUnitFactors.gram      = [      1000, "mg"];
	m_raUnitFactors.milligram = [         1, "mg"];

	m_raUnitFactors.hectolitre = [100000, "ml"];
	m_raUnitFactors.decalitre  = [ 10000, "ml"];
	m_raUnitFactors.litre      = [  1000, "ml"];
	m_raUnitFactors.decilitre  = [   100, "ml"];
	m_raUnitFactors.millilitre = [     1, "ml"];

	m_raUnitFactors.celsius = [1, "c"];

	m_raUnitFactors.percent = [0.01, "pc"];

	// Imperial unit aliasing
	m_saUnitAlias["nautical mile"] = ["nautical miles", "nmi"];
	m_saUnitAlias.mile = ["miles", "mi"];
	m_saUnitAlias.furlong = ["furlongs"];
	m_saUnitAlias.chain = ["chains"];
	m_saUnitAlias.rod = ["rods", "poles", "pole"];
	m_saUnitAlias.fathom = ["fathoms"];
	m_saUnitAlias.yard = ["yards", "yd", "yds"];
	m_saUnitAlias.foot = ["survey foot", "survey feet", "feet", "ft", "'", "\u2032"];
	m_saUnitAlias.link = ["links"];
	m_saUnitAlias.inch = ["inches", "\"", "\"s", "in", "ins", "\u2033", "\u2033s"];

	m_saUnitAlias.acre = ["acres"];
	m_saUnitAlias.rood = ["roods"];

	m_saUnitAlias["fluid ounce"] = ["fl oz", "imperial fluid ounce", "uk fluid ounce"];
	m_saUnitAlias["us fluid ounce"] = ["us fl oz"];
	m_saUnitAlias["us pint"] = ["us pt", "us pts"];
	m_saUnitAlias.pint = ["pints", "pt", "pts"];
	m_saUnitAlias["us quart"] = ["us qt", "us qts"];
	m_saUnitAlias.quart = ["quarts", "qt", "qts", "imperial quarts", "imperial quart", "imperial qt", "imperial qts"];
	m_saUnitAlias["us gallon"] = ["us gallons", "us gal", "us gals"];
	m_saUnitAlias.gallon = ["gallons", "gals", "imperial gallon", "imperial gallons", "imperial gal", "imperial gals", "uk gallon", "uk gallons", "uk gal", "uk gals"];

	m_saUnitAlias.ton = ["uk long ton", "uk long tons", "long ton", "long tons", "tons"];
	m_saUnitAlias.hundredweight = ["hundredweights", "cwts", "cwt"];
	m_saUnitAlias.stone = ["stones", "st"];
	m_saUnitAlias.pound = ["pounds", "lbs", "lb"];
	m_saUnitAlias.ounce = ["ounces", "oz"];

	m_saUnitAlias.fahrenheit = ["degrees fahrenheit", "f"];

	// Metric unit aliasing
	m_saUnitAlias.kilometre = ["kilometres", "Kilometers", "kilometer", "km"];
	m_saUnitAlias.hectometre = ["hectometres", "hectometers", "hectometer", "hm"];
	m_saUnitAlias.decametre = ["decametres", "dekametres", "dekametre", "dekameters", "dekameter", "decameters", "decameter", "dam"];
	m_saUnitAlias.metre = ["metres", "meters", "meter", "m"];
	m_saUnitAlias.decimetre = ["decimetres", "decimeters", "decimeter", "dm"];
	m_saUnitAlias.centimetre = ["centimetres", "centimeters", "centimeter", "cm"];
	m_saUnitAlias.millimetre = ["millimetres", "millimeters", "millimeter", "mm"];
	m_saUnitAlias.micrometre = ["micrometres", "micrometers", "micrometer", "\u00B5m"];
	m_saUnitAlias.nanometre = ["nanometres", "nanometers", "nanometer", "nm"];

	m_saUnitAlias.hectare = ["hectares", "ha"];

	m_saUnitAlias.litre = ["litres", "liter", "liters", "l"];
	m_saUnitAlias.hectolitre = ["hectolitres", "hectoliters", "hectoliter"];
	m_saUnitAlias.millilitre = ["millilitres", "milliliters", "milliliter"];

	m_saUnitAlias.tonne = ["tonnes", "t"];
	m_saUnitAlias.kilogram = ["kilograms", "kilos", "kilo", "kgs", "kg"];
	m_saUnitAlias.gram = ["grams", "g"];
	m_saUnitAlias.milligram = ["milligrams", "mg"];

	m_saUnitAlias.celsius = ["degrees centigrade", "degrees celcius", "degrees c", "\u00B0centigrade", "\u00B0celsius", "\u00B0c", "c"];
	m_saUnitAlias.percent = ["per cent", "pc"];

	// Unit alias lookup mapping
	var sIndex, iAlias;
	for (sIndex in m_saUnitAlias) {
		if (typeof m_saUnitAlias[sIndex] === "object") {
			for (iAlias = 0; iAlias < m_saUnitAlias[sIndex].length; iAlias++) {
				m_saUnitAlias[m_saUnitAlias[sIndex][iAlias]] = sIndex;
			}
		}
	}
}


// Numeric words lookup initialisation
function numberWordInit() {
	"use strict";
	m_iaWordNumber.one = 1;
	m_iaWordNumber.two = 2;
	m_iaWordNumber.three = 3;
	m_iaWordNumber.four = 4;
	m_iaWordNumber.five = 5;
	m_iaWordNumber.six = 6;
	m_iaWordNumber.seven = 7;
	m_iaWordNumber.eight = 8;
	m_iaWordNumber.nine = 9;
	m_iaWordNumber.ten = 10;
	m_iaWordNumber.eleven = 11;
	m_iaWordNumber.twelve = 12;
	m_iaWordNumber.thirteen = 13;
	m_iaWordNumber.fourteen = 14;
	m_iaWordNumber.fifteen = 15;
	m_iaWordNumber.sixteen = 16;
	m_iaWordNumber.seventeen = 17;
	m_iaWordNumber.eighteen = 18;
	m_iaWordNumber.nineteen = 19;
	m_iaWordNumber.twenty = 20;
	m_iaWordNumber.thirty = 30;
	m_iaWordNumber.forty = 40;
	m_iaWordNumber.fourty = 40; // Common typo
	m_iaWordNumber.fifty = 50;
	m_iaWordNumber.sixty = 60;
	m_iaWordNumber.seventy = 70;
	m_iaWordNumber.eighty = 80;
	m_iaWordNumber.ninety = 90;
	m_iaWordFactor.hundred = 100;
	m_iaWordFactor.thousand = 1000;
	m_iaWordFactor.million = 1000000;
	m_iaWordFactor.billion = 1000000000;
	m_iaWordFactor.trillion = 1000000000000;
}


// Tests for unit dimension
function getDimension(sDimension1, sDimension2) {
	"use strict";
	var bSquared = false;
	var bCubed = false;

	// Dimension prefix
	if (sDimension1) {
		sDimension1 = sDimension1.trim();
		bSquared = (sDimension1 === "square" || sDimension1 === "sq");
		bCubed = (sDimension1 === "cube" || sDimension1 === "cubic");
	}

	// Dimension suffix
	if (sDimension2) {
		sDimension2 = sDimension2.trim();
		bSquared = bSquared || (sDimension2 === "2" || sDimension2 === "\u00B2" || sDimension2 === "^2" || sDimension2 === "squared");
		bCubed = bCubed || (sDimension2 === "3" || sDimension2 === "\u00B3" || sDimension2 === "^3" || sDimension2 === "cubed");
	}

	return (bSquared ? 2 : (bCubed ? 3 : 1));
}


// Unit metrification
function getMetric(oMatch, sCoefficient, sGap, sUnit, sDimension1, sDimension2) {
	"use strict";
	var oReturn;

	// Process word-based magnitude
	var iMagnitude = 1;
	sCoefficient = sCoefficient.replace(/ (hundred|thousand|million|billion|trillion)$/i, function (sMatch, sFactor) {
		iMagnitude = m_iaWordFactor[sFactor.toLowerCase()];
		if (iMagnitude) {
			return "E" + String(iMagnitude).substr(1);
		}
		return sMatch;
	});

	// Clean up coefficient
	sCoefficient = sCoefficient.replace(/[+,]/g, "");
	sCoefficient = sCoefficient.replace(/\u00BC$/, ".25");
	sCoefficient = sCoefficient.replace(/\u00BD$/, ".5");
	sCoefficient = sCoefficient.replace(/\u00BE$/, ".75");
	var iDotPos = sCoefficient.indexOf(".");
	if (iDotPos !== -1) {
		// Cater for mangnitude decimal shift
		var iEpos = sCoefficient.indexOf("E", iDotPos + 1);
		if (iEpos !== -1) {
			var iShift = sCoefficient.length - iEpos - 1;
			sCoefficient = sCoefficient.substring(0, iEpos);
			sCoefficient = sCoefficient.substring(0, iDotPos) + sCoefficient.substr(iDotPos + 1);
			iDotPos += iShift;
			if (iDotPos <= sCoefficient.length) {
				// Decimal remains
				sCoefficient = sCoefficient.substring(0, iDotPos) + "." + sCoefficient.substr(iDotPos);
			} else {
				// Decimal shifted out
				sCoefficient += String(Math.pow(10, (iDotPos - sCoefficient.length))).substr(1);
			}
		}

		// Strip beyond a further decimal point inclusively
		iDotPos = sCoefficient.indexOf(".");
		var iDotPos2 = sCoefficient.indexOf(".", iDotPos + 1);
		if (iDotPos2 !== -1) {
			sCoefficient = sCoefficient.substring(0, iDotPos2);
		}
	} else {
		sCoefficient = sCoefficient.replace(/E/, "");
	}
	if (sCoefficient.match(/one/i)) {
		sCoefficient = "1";
	}
	var rCoefficient = parseFloat(sCoefficient);
	if (!isNaN(rCoefficient)) {
		// Get unit dimension
		var iDimension = getDimension(sDimension1, sDimension2);

		// Nautical mile determination
		if (sUnit === "NM") {
			sUnit = "nautical mile";
		}

		// Assess unit
		var sCanonicalUnit = sUnit.toLowerCase();
		var bProcess = (sUnit !== "f"); // Upper case Fahrenheit unit only
		bProcess = bProcess && (sUnit !== "ST"); // Exclude postcode fragments
		bProcess = bProcess && !(sCanonicalUnit === "in" && sGap); // Exclude "in" as word
		bProcess = bProcess && !(sUnit === "st" && !sGap && (rCoefficient % 2 === 1)); // Exclude "1st"-like words
		bProcess = bProcess && (sUnit !== "St"); // Exclude street mismatch
		bProcess = bProcess && !(sCanonicalUnit === "dm" && sUnit !== "dm"); // Exclude Dm from "3DMark"
		bProcess = bProcess && !(sUnit === "'" && sGap); // Exclude gap for foot symbol
		bProcess = bProcess && (sUnit !== "M"); // Exclude Millions mistaken as metres
		bProcess = bProcess && (sUnit !== "T"); // Tonne only as 't'
		bProcess = bProcess && (sUnit !== "G"); // Gram only as 'g'
		bProcess = bProcess && !((sUnit === "'" || sUnit === "\u2032") && oMatch.input.substr(oMatch.index - 1, 1) === "\u00B0");
		bProcess = bProcess && !((sUnit === "\"" || sUnit === "\u2033") && (oMatch.input.substr(oMatch.index - 15, 15).indexOf("\u00B0") !== -1));
		bProcess = bProcess && (sUnit !== "c"); // Centigrade only as 'C'
		bProcess = bProcess && !(sCanonicalUnit === "pc" && sUnit !== "pc"); // Percent 'pc' only in lowercase
		bProcess = bProcess && (sUnit !== "Nm"); // Except Newton-metres
		bProcess = bProcess && (sUnit !== "L"); // Litre must be lower case 'l'
		bProcess = bProcess && (sUnit !== "FT"); // ft must be lower case
		bProcess = bProcess && (sUnit !== "Mi"); // 'Mi' not accepted form of mile
		bProcess = bProcess && !(sUnit === "F" && oMatch.input.substr(oMatch.index - 1, 1) !== "#"); // Exclude hex colour codes

		if (bProcess) {
			// Test for alias unit name
			var vAliasLookup = m_saUnitAlias[sCanonicalUnit];
			if (typeof vAliasLookup === "string") {
				// Substitute for canonical name
				sCanonicalUnit = vAliasLookup;
			}

			// Perform conversion
			var rConverted = null;
			var sBaseUnit, rFactor, rPrecision;
			if (sCanonicalUnit === "fahrenheit") {
				// Fahrenheit to Celsius
				rFactor = 5 / 9;
				rConverted = (rCoefficient - 32) * rFactor;
				sBaseUnit = "c";
			} else {
				// Get conversion factor and target unit
				var sUnitCode = (iDimension > 1 ? sCanonicalUnit + iDimension : sCanonicalUnit);
				var aUnitFactor = m_raUnitFactors[sUnitCode];
				if (aUnitFactor) {
					rFactor = m_raUnitFactors[sUnitCode][0];
					sBaseUnit = m_raUnitFactors[sUnitCode][1];

					// Perform raw conversion
					rConverted = rCoefficient * rFactor;
				}
			}

			if (rConverted !== null) {
				// Determine original precision in terms of converted unit
				var iTrailingZeroes = 0;
				if (rCoefficient === Math.floor(rCoefficient)) {
					// Whole number, so range of 1 unless trailing zeroes
					var oPrefixMatch = String(rCoefficient).match(/0+$/);
					if (oPrefixMatch) {
						iTrailingZeroes = oPrefixMatch[0].length;
						if (iTrailingZeroes === 1) {
							// Treat 40 as 2 significant figures, 100 as 1 s.f.
							iTrailingZeroes = 0;
						}
					}
				} else {
					// Get decimal places
					var iDecimalPlaces = sCoefficient.length - sCoefficient.indexOf(".") - 1;
					iTrailingZeroes = -iDecimalPlaces;
				}
				rPrecision = rFactor * Math.pow(10, iTrailingZeroes) / 2;

				// Return metric object
				oReturn = {
					rCoefficient: rConverted,
					sSourceUnit: sCanonicalUnit,
					sUnit: sBaseUnit,
					rPrecision: rPrecision
				};
			}
		}
	}
	return oReturn;
}


// Formats a number to the given number of significant figures
function formatSigFigs(rNumber, iSigFigs) {
	"use strict";
	var sFormatted;
	if (iSigFigs > 0) {
		sFormatted = rNumber.toPrecision(iSigFigs);
		var iExpPos = sFormatted.indexOf("e");
		if (iExpPos !== -1) {
			var bNegative = (sFormatted.substr(0, 1) === "-");
			if (bNegative) {
				sFormatted = sFormatted.substr(1);
			}
			var iExponent = parseInt(sFormatted.substr(iExpPos + 1), 10);
			sFormatted = sFormatted.substr(0, iExpPos);
			var iDotPos = sFormatted.indexOf(".");
			if (iDotPos !== -1) {
				if (iExponent > 0) {
					iExponent -= sFormatted.length - iDotPos - 1;
					sFormatted = sFormatted.replace(".", "");
				} else {
					iExponent += iDotPos;
					sFormatted = "0." + sFormatted.replace(".", "");
				}
			}
			var iZeroes;
			for (iZeroes = 0; iZeroes < Math.abs(iExponent); iZeroes++) {
				sFormatted += "0";
			}
			if (bNegative) {
				sFormatted = "-" + sFormatted;
			}
		}
	}
	return sFormatted;
}


// Formats a metric quantity into a suitable string representation
function formatMetric(oMetric) {
	"use strict";
	// Scale result sensibly
	var sUnit = oMetric.sUnit;
	var rCoefficient = oMetric.rCoefficient;
	var rPrecision = oMetric.rPrecision;
	var rScaleFactor = 1;

	switch (sUnit) {
	// mm, cm, m, km
	case "mm":
	case "mm2":
	case "mm3":

		// Convert to suitably scaled unit
		var iDimension = (sUnit === "mm2" ? 2 : (sUnit === "mm3" ? 3 : 1));
		if (rCoefficient > 0 && rCoefficient < 0.001) {
			// mm to nm
			rScaleFactor = Math.pow(1000000, iDimension);
			sUnit = "n" + sUnit.substr(1);
		} else if (rCoefficient > 0 && rCoefficient < 1) {
			// mm to µm
			rScaleFactor = Math.pow(1000, iDimension);
			sUnit = "\u00B5" + sUnit.substr(1);
		} else if (rCoefficient >= 10) {
			if (rCoefficient < Math.pow(1000, iDimension)) {
				// mm to cm 999mm - 99.9cm
				rScaleFactor = Math.pow(10, -iDimension);
				sUnit = "c" + sUnit.substr(1);
			} else if (rCoefficient < Math.pow(1000000, iDimension)) {
				// mm2 to hectare
				if ((iDimension === 2) && (rCoefficient >= 10000000000)) {
					rScaleFactor = Math.pow(10, -10);
					sUnit = "ha";
				} else {
					// mm to m
					rScaleFactor = Math.pow(1000, -iDimension);
					sUnit = sUnit.substr(1);
				}
			} else {
				// mm to km
				rScaleFactor = Math.pow(1000000, -iDimension);
				sUnit = "k" + sUnit.substr(1);
			}
		}

		// Superscript area and volume dimensions
		sUnit = sUnit.replace(/2$/, "\u00B2");
		sUnit = sUnit.replace(/3$/, "\u00B3");
		break;

	// ml, l
	case "ml":

		// Format volume
		if (rCoefficient >= 1000) {
			rScaleFactor = 0.001;
			sUnit = "litre";
		}
		break;

	// mg, g, kg, t
	case "mg":

		// Format mass
		if (rCoefficient >= 1000) {
			if (rCoefficient < 1000000) {
				// mg to g
				rScaleFactor = 0.001;
				sUnit = "g";
			} else if (rCoefficient < 1000000000) {
				// mg to kg
				rScaleFactor = 0.000001;
				sUnit = "kg";
			} else {
				// mg to t
				rScaleFactor = 0.000000001;
				sUnit = "tonne";
			}
		}
		break;

	// Celsius
	case "c":
		// Celsius
		sUnit = "\u00B0C";
		break;

	// Percentage
	case "pc":
		// Percent
		rScaleFactor = 100;
		sUnit = "%";
		break;

	default:
		window.alert("Unexpected unit: " + sUnit);
	}

	// Update coefficient and precision
	rCoefficient *= rScaleFactor;
	rPrecision *= rScaleFactor;

	// Format to final unit and precision
	var sFormatted;
	var sRange = formatSigFigs(rPrecision * 2, 15);

	var rDisplayRange = parseFloat(Number(sRange.replace(/^([0.]*)\d([\d.]*)$/, function (sMatch, sPrefix, sSuffix) {
		return sPrefix + "1" + sSuffix.replace(/\d/g, "0");
	})).toFixed(13));

	var sDisplayRange = String(rDisplayRange);
	if (rDisplayRange < 1) {
		// Decimal places
		var iExponentPos = sDisplayRange.indexOf("e-");
		if (iExponentPos !== -1) {
			sDisplayRange = sDisplayRange.substring(0, iExponentPos);
		}
		var iDecimalPlaces = sDisplayRange.length - sDisplayRange.indexOf(".") - 1;
		sFormatted = rCoefficient.toFixed(iDecimalPlaces);
	} else {
		// Significant figures
		rCoefficient = Math.round(rCoefficient);
		var iSigFigs = Math.max(String(rCoefficient).length - sDisplayRange.length + 1, 1);
		sFormatted = formatSigFigs(rCoefficient, iSigFigs);
	}

	// Comma separate large numbers into thousand groups
	var iDotPos = sFormatted.indexOf(".");
	var sInteger = sFormatted;
	var sFraction = "";
	if (iDotPos !== -1) {
		sInteger = sFormatted.substring(0, iDotPos);
		sFraction = sFormatted.substr(iDotPos);
	}
	sInteger = sInteger.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
	return sInteger + sFraction + (sUnit === "%" ? sUnit : "\u00A0" + sUnit);
}


// Multi-unit lengths/masses metrification
function cbMultiMetric(oMatch) {
	"use strict";
	var sConverted = oMatch[0];
	if (sConverted.strip()) {
		// Get metric base unit quantities
		var oMetric, oMetricAddition;
		var bAtLeastTwo = false;

		var sPrefix = oMatch[1];
		var sCoefficient = String(oMatch[2]);
		var sGap = oMatch[3];
		var iUnit;
		for (iUnit = 4; iUnit < arguments.length; iUnit += 3)
		{
			var sUnit = oMatch[iUnit];
			if (sCoefficient && sUnit) {
				oMetricAddition = getMetric(oMatch, sCoefficient, sGap, sUnit);
				if (oMetric) {
					bAtLeastTwo = true;
					if (oMetricAddition && (oMetricAddition.sUnit === oMetric.sUnit)) {
						oMetric.rCoefficient += oMetricAddition.rCoefficient;
						oMetric.rPrecision = Math.min(oMetric.rPrecision, oMetricAddition.rPrecision);
					}
				} else {
					oMetric = oMetricAddition;
				}

				sCoefficient = oMatch[iUnit + 1];
				if (String(sCoefficient).strip().match(reUnitSeparator)) {
					break;
				}
				sGap = oMatch[iUnit + 2];
			}
		}

		if (bAtLeastTwo) {
			// Format metric quantity
			sConverted = sPrefix + formatMetric(oMetric);
			logChange(oMatch, sConverted);
		}
	}

	return sConverted;
}


// Primary metrification
function cbPrimaryMetric(oMatch, sPrefix, sCoefficient, sGap, sDimension1, sUnit, sDimension2) {
	"use strict";
	var sConverted = oMatch[0];

	// Get metric base quantity
	var oMetric = getMetric(oMatch, sCoefficient, sGap, sUnit, sDimension1, sDimension2);
	if (oMetric) {
		// Format metric quantity
		sConverted = formatMetric(oMetric);

		if ((sPrefix === "(") && (oMatch[0].substr(oMatch[0].length - 1) === ")")) {
			// Complete bracket pair if opening bracket
			sConverted = "(" + sConverted + ")";
		} else if (sPrefix) {
			// Restore original prefix
			sConverted = sPrefix + sConverted;
		}

		logChange(oMatch, sConverted);
	}

	return sConverted;
}


// Regex replace callback for replacing numeric words with numbers
function parseNumberWords(sWords, sUnit, iOffset, sText) {
	"use strict";
	var sParsed = sWords;
	var iNumber = 0, iCoefficient = 0;
	var sSuffix = "";

	// Avoid "no one" case
	if (!/no one/i.test(sText.substr(iOffset - 3).substr(0, 6))) {
		// "Per cent" case
		if (sWords.substr(sWords.length - 9) === " per cent") {
			sWords = sWords.substring(0, sWords.length - 9);
			sSuffix = "%";
		}

		// "percent" case
		if (sWords.substr(sWords.length - 8) === " percent") {
			sWords = sWords.substring(0, sWords.length - 8);
			sSuffix = "%";
		}

		sWords = sWords.replace(/\sand\s|,\s|[,\s\-]/g, " ");
		var saBits = sWords.split(" ");
		var iBit;
		for (iBit = 0; iBit < saBits.length; iBit++) {
			var sBit = saBits[iBit].toLowerCase();
			if (m_iaWordNumber[sBit]) {
				iCoefficient += m_iaWordNumber[sBit];
			} else if (m_iaWordFactor[sBit]) {
				if (iBit === saBits.length - 1) {
					iNumber += iCoefficient;
					iNumber *= m_iaWordFactor[sBit];
				} else {
					iNumber += iCoefficient * m_iaWordFactor[sBit];
				}
				iCoefficient = 0;
			}
		}
		if (iCoefficient) {
			iNumber = iCoefficient;
		}

		var sNumber = String(iNumber).replace(/(\d)(?=(\d{3})+$)/g, "$1,") + sSuffix;
		if (sWords.length > sNumber.length) {
			logChange(sWords, sNumber);
			sParsed = sNumber;
		}
	}

	return sParsed;
}


// Efficient once-only regex compilation
function angliciseInit() {
	"use strict";
	// Regex initialisation
	var iPairs = m_saUStoUK.length;
	var iPair;
	for (iPair = 0; iPair < iPairs; iPair += 2) {
		m_oaRegexs.push(new RegExp("\\b" + m_saUStoUK[iPair] + "\\b", "gi"));
	}
}


// American spellings to English
function anglicise(oNode) {
	"use strict";
	var sText = (typeof oNode === "string") ? oNode : oNode.nodeValue;
	var iRegexs = m_oaRegexs.length;
	var sLower = sText.toLowerCase();
	for (m_iRegex = 0; m_iRegex < iRegexs; m_iRegex++) {
		if (sLower.indexOf(m_saUStoUK[m_iRegex * 2]) !== -1) {
			sText = sText.replace(m_oaRegexs[m_iRegex], cbAnglicise);
		}
	}

	// Special case for lowercase 'i'
	if (reLowerCaseI.test(sText)) {
		sText = sText.replace(reLowerCaseI, "$1I$2");
	}

	oNode.nodeValue = sText;
	if (typeof oNode === "string") {
		return sText;
	}
}


// Better regex replacement (passes match object rather than match string to functor)
function regexReplace(sText, oRegex, fnReplace) {
	"use strict";
	/*jshint validthis:true*/
	var sReplaced;
	var oMatch = oRegex.exec(sText);
	if (oMatch) {
		sReplaced = sText.substring(0, oMatch.index) + fnReplace.apply(this, [oMatch].concat(oMatch.slice(1)));
		var iLastIndex = oRegex.lastIndex;
		while ((oMatch = oRegex.exec(sText)) !== null) {
			sReplaced += sText.substring(iLastIndex, oMatch.index) + fnReplace.apply(this, [oMatch].concat(oMatch.slice(1)));
			iLastIndex = oRegex.lastIndex;
		}
		if (iLastIndex < sText.length) {
			sReplaced += sText.substring(iLastIndex);
		}
	} else {
		// No match
		sReplaced = sText;
	}
	return sReplaced;
}


// Regex application
function applyRegexs(sText) {
	"use strict";
	sText = sText.replace(reUSdate, cbUSdate);
	sText = sText.replace(reDayMonth, cbDayMonth);
	sText = regexReplace(sText, reISO, cbISO);
	sText = sText.replace(reUSnumeric, cbUSnumeric);
	sText = sText.replace(reTwelveHour, cbTwelveHour);
	sText = sText.replace(reBBCtime, cbBBCtime);

	sText = regexReplace(sText, reImperialMetricLengths, cbMultiMetric);
	sText = regexReplace(sText, reImperialMetricMasses, cbMultiMetric);
	sText = regexReplace(sText, reMetricImperialLengths, cbMultiMetric);
	sText = regexReplace(sText, reMetricImperialMasses, cbMultiMetric);

	sText = regexReplace(sText, reImperialLengths, cbMultiMetric);
	sText = regexReplace(sText, reImperialMasses, cbMultiMetric);
	sText = regexReplace(sText, reMetricLengths, cbMultiMetric);
	sText = regexReplace(sText, reMetricMasses, cbMultiMetric);

	sText = regexReplace(sText, reImperialImperial, cbPrimaryMetric);
	sText = regexReplace(sText, reImperialMetric, cbPrimaryMetric);
	sText = regexReplace(sText, reMetricImperial, cbPrimaryMetric);

	sText = regexReplace(sText, reImperial, cbPrimaryMetric);
	sText = regexReplace(sText, reMetric, cbPrimaryMetric);

	return sText;
}

// Quoted regex recursion
function quoteRecursion(sText) {
	"use strict";
	if (sText.match(/\d/)) {
		var reQuotedString = new RegExp("(^|\\s|[[(=L,{:])(?:(" + DOUBLE_QUOTE_CHARS + ")(.*?)(" + DOUBLE_QUOTE_CHARS + ")|(" + SINGLE_QUOTE_CHARS + ")(.*?)(" + SINGLE_QUOTE_CHARS + "))(?=([,.)\\]=}:;?]|\\s|$))", "g");

		// Look for quoted substrings
		var oQuote = reQuotedString.exec(sText);
		if (oQuote) {
			// Prefix text and quoted string
			var iStartPos = reQuotedString.lastIndex;
			var sLocal = applyRegexs(sText.substr(0, oQuote.index)) + oQuote[1];
			if (oQuote[2]) {
				sLocal += oQuote[2] + quoteRecursion(oQuote[3]) + oQuote[4];
			} else {
				sLocal += oQuote[5] + quoteRecursion(oQuote[6]) + oQuote[7];
			}
			sLocal += oQuote[8];

			while ((oQuote = reQuotedString.exec(sText)) !== null) {
				// Inner prefix text and quoted string
				sLocal += applyRegexs(sText.substring(iStartPos + 1, oQuote.index)) + oQuote[1];
				if (oQuote[2]) {
					sLocal += oQuote[2] + quoteRecursion(oQuote[3]) + oQuote[4];
				} else {
					sLocal += oQuote[5] + quoteRecursion(oQuote[6]) + oQuote[7];
				}
				sLocal += oQuote[8];
				iStartPos = reQuotedString.lastIndex;
			}

			// Suffix text
			if (iStartPos < sText.length) {
				sLocal += applyRegexs(sText.substr(iStartPos + 1));
			}
			sText = sLocal;
		} else {
			// Plain string recursion termination
			sText = applyRegexs(sText);
		}
	}

	return sText;
}


// Apply smart quotes
function smartQuote(sText) {
	"use strict";
	// Opening quotes
	var reOpenQuote = /(^|\s|[>(\[{])(['"])([a-zA-Z(\[{£$])/gm;
	var rePrefixContraction = /^((cause|cos|tis|til|twas|em|nauts?|aving?|ave|ard|n)\b|n')/i;
	sText = regexReplace(sText, reOpenQuote, function (oMatch) {
		var sCloseQuote;
		if (oMatch[2] === "'") {
			if (oMatch.input.substr(oMatch.index + oMatch[0].length - 1, 6).match(rePrefixContraction)) {
				sCloseQuote = "’";
			} else {
				sCloseQuote = "‘";
			}
		} else {
			sCloseQuote = "“";
		}
		var sOutput = oMatch[1] + sCloseQuote + oMatch[3];
		logChange(oMatch[0], sOutput);
		return sOutput;
	});

	// Closing quotes
	var reCloseQuote = /([\]a-zA-Z.,!?)}])['"]([\]<.,:;?)}]|\s|$)/gm;
	sText = regexReplace(sText, reCloseQuote, function (oMatch) {
		var bReplace = true;
		var sQuote = oMatch[0].substr(1, 1);
		var iQuotePos = oMatch.input.lastIndexOf(sQuote, oMatch.index);
		if (iQuotePos !== -1) {
			var iSpacePos = oMatch.input.lastIndexOf(" ", iQuotePos);
			if (iSpacePos !== -1) {
				var sPrevious = oMatch.input.substr(iSpacePos + 1, oMatch.index - iSpacePos);
				if (sPrevious.match(new RegExp("[a-z]+=" + sQuote + "[^" + sQuote + "]+"))) {
					bReplace = false;
				}
			}
		}
		if (bReplace) {
			var sCloseQuote = (sQuote === "'") ? "’" : "”";
			var sOutput = oMatch[1] + sCloseQuote + oMatch[2];
			logChange(oMatch[0], sOutput);
			return sOutput;
		}
		return oMatch[0];
	});

	// Contractions/possessives
	sText = sText.replace(/\B([a-zA-Z])'([dst]|re|ll|ve)\b/g, function (sMatch, sSubmatch1, sSubmatch2) {
		var sOutput = sSubmatch1 + "’" + sSubmatch2;
		logChange(sMatch, sOutput);
		return sOutput;
	});
	sText = sText.replace(/\bi'(d|m|ll|ve)\b/gi, function (sMatch, sSubmatch) {
		var sOutput = "I’" + sSubmatch;
		logChange(sOutput);
		return sOutput;
	});

	return sText;
}

// Localisation limiting
function shouldLocalise(oNode) {
	"use strict";
	// Except in IFRAME
	var bLocalise = Boolean(oNode.nodeValue);
	if (bLocalise) {
		bLocalise = !window.frameElement;
		if (!bLocalise) {
			try {
				bLocalise = (window.frameElement.nodeName !== "IFRAME");
			} catch (oException) {
				bLocalise = true;
			}
		}
		if (bLocalise) {
			// Except with these parents
			var reExcept = /STYLE|SCRIPT|PRE|CODE|TEXTAREA/;
			var oParent = oNode.parentNode;
			while (oParent) {
				if (oParent.nodeName && reExcept.test(oParent.nodeName)) {
					// Except for read-only textarea
					if ((oParent.nodeName !== "TEXTAREA") || !oParent.readOnly) {
						bLocalise = false;
						break;
					}
				}
				oParent = oParent.parentNode;
			}
		}
	}
	return bLocalise;
}

// Localise node content
function localiseNode(oNode) {
	"use strict";
	if (shouldLocalise(oNode)) {
		var sText = oNode.nodeValue;

		// Replace numeric word expressions with numbers
		sText = sText.replace(reTrillion, parseNumberWords);
		sText = sText.replace(reBillion, parseNumberWords);
		sText = sText.replace(reMillion, parseNumberWords);
		sText = sText.replace(reThousand, parseNumberWords);
		sText = sText.replace(reHundred, parseNumberWords);
		sText = sText.replace(reUnits, parseNumberWords);

		// Apply smart quotes
		if (sText.match(/['"]/)) {
			sText = smartQuote(sText);
		}

		// Apply numeric fixups
		if (sText.match(/\d/)) {
			// Within quoted substrings
			sText = quoteRecursion(sText);
		}

		// Update only if change made
		if (m_bChangeMade) {
			oNode.nodeValue = sText;
			m_bChangeMade = false;
		}
	}
}

// Correct phrasal verb use
function actionTextFixUp(sText) {
	"use strict";
	if (sText === "login") {
		logChange(sText, "log in");
		return "log in";
	}
	if (sText === "Login") {
		logChange(sText, "Log in");
		return "Log in";
	}
	if (sText === "logout") {
		logChange(sText, "log out");
		return "log out";
	}
	if (sText === "Logout") {
		logChange(sText, "Log out");
		return "Log out";
	}
}

// URL auto-linkage
function linkURLs(oNode) {
	"use strict";
	if (oNode.parentNode)  {
		var sParentNode = oNode.parentNode.nodeName;
		if (sParentNode.match(/A|BUTTON/) || ((sParentNode === "INPUT") && oNode.parentNode.type && oNode.parentNode.type.match(/submit|button/i))) {
			var sLinkText = actionTextFixUp(oNode.nodeValue);
			if (sLinkText) {
				oNode.nodeValue = sLinkText;
			}
		}
		if (!sParentNode.match(/A|TEXTAREA|SCRIPT|STYLE|NOSCRIPT/)) {
			var oLastNode = oNode;
			var sText = oLastNode.nodeValue;
			var bFirst = true;
			do {
				var oMatch = reURL.exec(sText);
				if (oMatch) {
					var sURL = oMatch[0];
					var sPrefix = sText.substring(0, oMatch.index);
					if (bFirst) {
						// Trim existing
						oLastNode.nodeValue = sPrefix;
						bFirst = false;
					} else {
						var oText = document.createTextNode(sPrefix);
						oLastNode.parentNode.insertBefore(oText, oLastNode.nextSibling);
						oLastNode = oText;
					}

					var oA = document.createElement("A");
					oA.appendChild(document.createTextNode(sURL));
					if (sURL.substr(0, 3) === "www") {
						oA.href = "http://" + sURL;
					} else {
						oA.href = sURL;
					}
					oA.target = "_blank";
					oLastNode.parentNode.insertBefore(oA, oLastNode.nextSibling);
					oLastNode = oA;

					sText = sText.substr(oMatch.index + sURL.length);
				} else if (bFirst) {
					break;
				} else {
					oLastNode.parentNode.insertBefore(document.createTextNode(sText), oLastNode.nextSibling);
					sText = null;
				}
			}
			while (sText);
		}
	}
}


// Debugging display of changes made
function showChanges() {
	"use strict";
	if (m_sChanged) {
		
		var oBody = document.getElementsByTagName("body")[0];

		if (!m_oChangesDiv) {
			m_oChangesDiv = document.createElement("div");
			m_oChangesDiv.style.position = "fixed";
			m_oChangesDiv.style.right = "1em";
			m_oChangesDiv.style.top = "1em";
			m_oChangesDiv.style.border = "1px solid black";
			m_oChangesDiv.style.padding = "2px";
			m_oChangesDiv.style.width = "auto";
			m_oChangesDiv.style.backgroundColor = "gray";
			m_oChangesDiv.style.color = "white";
			m_oChangesDiv.style.fontFamily = "MS Sans Serif";
			m_oChangesDiv.style.fontSize = "8pt";
			m_oChangesDiv.style.zIndex = 5000;
			m_oChangesDiv.style.lineHeight = "13px";
			m_oChangesDiv.style.textAlign = "left";
			oBody.appendChild(m_oChangesDiv);
		}

		var iLines = m_sChanged.split("\n").length - 1;
		m_oChangesDiv.style.height = (13 * iLines) + "px";
		m_oChangesDiv.innerHTML = m_sChanged.substr(1).replace(/\n/g, "<br/>");

		if (m_iChangesTimerID) {
			m_iChangesTimerID = clearTimeout(m_iChangesTimerID);
		}

		m_iChangesTimerID = setTimeout(function () {
			oBody.removeChild(m_oChangesDiv);
		}, 3500 + (400 * iLines));

		m_oChangesDiv.addEventListener("mouseover", function () {
			if (m_iChangesTimerID)
			{
				m_iChangesTimerID = clearTimeout(m_iChangesTimerID);
			}
		}, false);

		m_oChangesDiv.addEventListener("mouseout", function () {
			m_iChangesTimerID = setTimeout(function () {
				oBody.removeChild(m_oChangesDiv);
			}, 1500);
		}, false);
	}
}

// 5 nodes at a time, with 15ms separation for rendering smoothness
function nodeUpdate() {
	"use strict";
	var iSet = 0;
	while (m_iNode < m_oaTextNodes.snapshotLength) {
		var oNode = m_oaTextNodes.snapshotItem(m_iNode);
		if (oNode.nodeValue) {
			if (shouldLocalise(oNode)) {
				anglicise(oNode);
				linkURLs(oNode);
			}
		}
		m_iNode++;
		if (++iSet === 5) {
			break;
		}
	}
	if (m_iNode === m_oaTextNodes.snapshotLength) {
		clearInterval(m_iNodeTimer);
		m_oaTextNodes = undefined;
	}
	showChanges();
}

// Initialisation
(function () {
	"use strict";
	// Initialise metrification
	metrificationInit();

	// Initialise numeric words
	numberWordInit();

	// Apply localisation to all text nodes
	for (m_iNode = 0; m_iNode < m_oaTextNodes.snapshotLength; m_iNode++) {
		var oNode = m_oaTextNodes.snapshotItem(m_iNode);
		localiseNode(oNode);
	}

	// Initialise anglicisation
	angliciseInit();

	// Localise page title
	document.title = anglicise(applyRegexs(document.title));

	// Anglicisation can take a while, so is done at intervals
	m_iNode = 0;
	m_iNodeTimer = setInterval(nodeUpdate, 15);

	// Correct phrasal verbs for action input buttons
	var oaInputButtons = document.getElementsByTagName("input"),
		iInputButton;
	for (iInputButton = 0; iInputButton < oaInputButtons.length; iInputButton++) {
		var oInputButton = oaInputButtons[iInputButton];
		if ((oInputButton.type === "submit") || (oInputButton.type === "button")) {
			var sValue = actionTextFixUp(oInputButton.value);
			if (sValue) {
				oInputButton.value = sValue;
			}
		}
	}
}());