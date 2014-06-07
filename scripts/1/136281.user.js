// ==UserScript==
// @name			Virtonomics Enhanced
// @version			0.2.3
// @namespace		VirtonomicsEnhanced
// @include			http://virtonomic*.*/*/main/*
// @include			http://virtonomic*.*/*/main/unit/view/*
// @include			http://virtonomic*.*/*/main/unit/view/*/supply
// @include			http://virtonomic*.*/*/window/globalreport/marketing/by_products/*
// @include			http://virtonomic*.*/*/window/unit/supply/create/*/step2
// @include			http://virtonomic*.*/*/window/unit/view/*/supply
// @include			http://virtonomic*.*/*/window/unit/equipment/*
// @include			http://virtonomic*.*/*/main/company/view/*/unit_list/employee
// @include			http://virtonomic*.*/*/main/user/privat/persondata/knowledge
// @include			http://virtonomic*.*/*/main/unit_market/list
// @include			http://virtonomic*.*/*/main/unit_market/list/*
// @include			http://virtonomic*.*/*/window/management_units/equipment/repair
// @author 			hitaishi/tantrik
// @icon			http://virtonomics.com/img/first/kubs.png
// @description		Enhances the interface for the popular online game Virtonomics
// ==/UserScript==

//hack to get access to jQuery & DOM
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "jQuery.noConflict();(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.head.appendChild(script);
}

var VirtonomicsEnhanced = function () {

	var VE = this;
	this.CurrentScriptVersion = '0.2.3';
	this.DEBUG = false;
	this.Data = {};
	
	this.Data.unitTypeCoeff = {
		workshop : 1,
		shop : 0.1,
		lab : 0.1,
		animalfarm : 0.15,
		farm : 0.15,
		office : 0.02,
		orchard : 0.3,
		sawmill : 1,
		mill : 1,
		restaurant : 1,
		mine : 2,
		warehouse : 0,
		fishingbase : 0,
		medicine : 0,
		power : 1.5,
		service_light : 0.03 
		
	};
	this.Data.storage_ratios={
	lien: [{areaPerUnit:.0143,code:"1467",name:"Oil"},{areaPerUnit:.0286,code:"1483",name:"Ð¡hemicals"},{areaPerUnit:.2,code:"370078",name:"Engine Oil"},{areaPerUnit:.02,code:"335181",name:"Crabs"},{areaPerUnit:.02,code:"380002",name:"Oysters"},{areaPerUnit:.03,code:"335176",name:"Salmon"},{areaPerUnit:.05,code:"335177",name:"Sturgeon"},{areaPerUnit:.05,code:"335174",name:"Fish"},{areaPerUnit:.2,code:"380001",name:"Pearl"},{areaPerUnit:.004,code:"1462",name:"Clay"},{areaPerUnit:.005,code:"1468",name:"Chemical minerals"},{areaPerUnit:.01,code:"1466",name:"Silica"},{areaPerUnit:.01,code:"1469",name:"Coal"},{areaPerUnit:.02,code:"370070",name:"Copper pyrites"},{areaPerUnit:.02,code:"7089",name:"Manganese"},{areaPerUnit:.02,code:"1464",name:"Iron ore"},{areaPerUnit:.04,code:"380050",name:"Titanium Ore"},{areaPerUnit:.05,code:"1461",name:"Bauxite"},{areaPerUnit:.05,code:"7088",name:"Chrome"},{areaPerUnit:.1,code:"1465",name:"Gold"},{areaPerUnit:.1,code:"2540",name:"Bijouterie"},{areaPerUnit:.1,code:"1524",name:"Watches"},{areaPerUnit:.2,code:"380001",name:"Pearl"},{areaPerUnit:.6667,code:"1460",name:"Diamonds"},{areaPerUnit:2.5,code:"2546",name:"Brilliants"},{areaPerUnit:2.5,code:"1526",name:"Jewellery"},{areaPerUnit:2.5,code:"380008",name:"Pearl jewelry"},{areaPerUnit:7,code:"351577",name:"Art decor"},{areaPerUnit:10,code:"370076",name:"Bronze decor"},{areaPerUnit:.01,code:"15336",name:"Sports food"},{areaPerUnit:.02,code:"359859",name:"Hormonal drugs"},{areaPerUnit:.02,code:"359862",name:"Herbs"},{areaPerUnit:.02,code:"359858",name:"Natural ingredients"},{areaPerUnit:.02,code:"359863",name:"Personal Hygiene products"},{areaPerUnit:.02,code:"359860",name:"Synthetic drugs"},{areaPerUnit:.02,code:"359861",name:"Natural medicines"},{areaPerUnit:.02,code:"359857",name:"Synthetic ingredients"},{areaPerUnit:.1,code:"359856",name:"Medical instruments"},{areaPerUnit:.25,code:"312799",name:"Table and bed linen"},{areaPerUnit:.001,code:"1493",name:"Cotton"},{areaPerUnit:.002,code:"1491",name:"Sugar"},{areaPerUnit:.002,code:"401962",name:"Tea leaf"},{areaPerUnit:.002,code:"1487",name:"Grain"},{areaPerUnit:.002,code:"401963",name:"Rice"},{areaPerUnit:.003,code:"380003",name:"Coffee"},{areaPerUnit:.004,code:"422053",name:"Olives"},{areaPerUnit:.005,code:"1492",name:"Grapes"},{areaPerUnit:.008,code:"1501",name:"Flour"},{areaPerUnit:.01,code:"401965",name:"Peanuts"},{areaPerUnit:.01,code:"1488",name:"Cacao"},{areaPerUnit:.01,code:"401966",name:"Soy-bean"},{areaPerUnit:.01,code:"15746",name:"Compound feed"},{areaPerUnit:.01,code:"359847",name:"Flowers, Herbs and Aromatic plants"},{areaPerUnit:.02,code:"303309",name:"Cosmetic oil"},{areaPerUnit:.02,code:"16004",name:"Perfume essence"},{areaPerUnit:1e-4,code:"312797",name:"Cotton waste"},{areaPerUnit:.001,code:"312795",name:"Cotton fibre"},{areaPerUnit:.01,code:"1472",name:"Paper"},{areaPerUnit:.01,code:"1482",name:"Fabric"},{areaPerUnit:.02,code:"16004",name:"Perfume essence"},{areaPerUnit:.02,code:"303309",name:"Cosmetic oil"},{areaPerUnit:.0286,code:"7090",name:"Thermoelement"},{areaPerUnit:.0286,code:"1479",name:"Synthetic fabric"},{areaPerUnit:.0286,code:"401964",name:"Silk"},{areaPerUnit:.0286,code:"1484",name:"Wool"},{areaPerUnit:.03,code:"370073",name:"Duralumin alloy"},{areaPerUnit:.04,code:"370071",name:"Copper"},{areaPerUnit:.05,code:"1480",name:"Steel"},{areaPerUnit:.05,code:"1463",name:"Wood"},{areaPerUnit:.05,code:"1474",name:"Leather"},{areaPerUnit:.0625,code:"1478",name:"Rubber"},{areaPerUnit:.0667,code:"1481",name:"Glass"},{areaPerUnit:.08,code:"380051",name:"Titanium"},{areaPerUnit:.1,code:"312796",name:"Cotton fabric"},{areaPerUnit:.1,code:"7091",name:"Mirror plate"},{areaPerUnit:.1,code:"370077",name:"Car Parts"},{areaPerUnit:.1176,code:"1471",name:"Aluminium"},{areaPerUnit:.1429,code:"1477",name:"Plastics"},{areaPerUnit:.1429,code:"15339",name:"Carbon fiber"},{areaPerUnit:.1429,code:"1476",name:"Dyestuff"},{areaPerUnit:.25,code:"335183",name:"Trawl"},{areaPerUnit:.1,code:"1475",name:"Components"},{areaPerUnit:.1,code:"370077",name:"Car Parts"},{areaPerUnit:.2,code:"370072",name:"Electric drive"},{areaPerUnit:.5,code:"1525",name:"Tires"},{areaPerUnit:.6667,code:"1485",name:"Electronic components"},{areaPerUnit:1,code:"1473",name:"Engine"},{areaPerUnit:2,code:"10717",name:"Power-saw bench"},{areaPerUnit:2,code:"12097",name:"Mining equipment"},{areaPerUnit:2,code:"1529",name:"Machine"},{areaPerUnit:6.6667,code:"1518",name:"Motorcycle"},{areaPerUnit:6.6667,code:"15338",name:"Water scooter"},{areaPerUnit:10,code:"370079",name:"Sedan"},{areaPerUnit:10,code:"373197",name:"Hairdressing equipment"},{areaPerUnit:10,code:"359855",name:"Medical equipment"},{areaPerUnit:10,code:"1528",name:"Device"},{areaPerUnit:10,code:"373198",name:"Restaurant equipment"},{areaPerUnit:10,code:"1509",name:"Car"},{areaPerUnit:12,code:"370081",name:"Sports Car"},{areaPerUnit:12.5,code:"1530",name:"Tractor"},{areaPerUnit:15,code:"370080",name:"SUV"},{areaPerUnit:100,code:"131",name:"Yacht equipment"},{areaPerUnit:200,code:"132",name:"Yacht interiors"},{areaPerUnit:250,code:"380055",name:"Chassis"},{areaPerUnit:250,code:"380057",name:"Avionics"},{areaPerUnit:250,code:"130",name:"Ship's hull"},{areaPerUnit:299.994,code:"133",name:"Yacht"},{areaPerUnit:375.0094,code:"380058",name:"Aircraft Interior"},{areaPerUnit:500,code:"422133",name:"Heat Transfer Equipment"},{areaPerUnit:500,code:"380056",name:"Aircraft Engine"},{areaPerUnit:1e3,code:"422134",name:"Coal Mill"},{areaPerUnit:1e3,code:"335182",name:"Trawler"},{areaPerUnit:1e3,code:"422131",name:"Steam Turbine"},{areaPerUnit:1e3,code:"422132",name:"Steam-boiler"},{areaPerUnit:1250,code:"380052",name:"Fuselage section"},{areaPerUnit:1250,code:"380054",name:"Empennage elements"},{areaPerUnit:1874.7657,code:"380053",name:"Wing elements"},{areaPerUnit:5e3,code:"422135",name:"Coal-fired Power"},{areaPerUnit:25e3,code:"380059",name:"Narrowbody aircraft"},{areaPerUnit:.001,code:"1500",name:"Icecream"},{areaPerUnit:.002,code:"401963",name:"Rice"},{areaPerUnit:.002,code:"1491",name:"Sugar"},{areaPerUnit:.0029,code:"1506",name:"Bread"},{areaPerUnit:.005,code:"1492",name:"Grapes"},{areaPerUnit:.005,code:"1498",name:"Noodles"},{areaPerUnit:.005,code:"1504",name:"Juice"},{areaPerUnit:.008,code:"1501",name:"Flour"},{areaPerUnit:.0083,code:"3865",name:"Sweets"},{areaPerUnit:.01,code:"1496",name:"Sausages"},{areaPerUnit:.01,code:"1507",name:"Chocolate"},{areaPerUnit:.01,code:"380007",name:"Energetic drinks"},{areaPerUnit:.01,code:"373201",name:"Cheese"},{areaPerUnit:.01,code:"1497",name:"Pastry"},{areaPerUnit:.01,code:"401966",name:"Soy-bean"},{areaPerUnit:.01,code:"15750",name:"Dressings"},{areaPerUnit:.01,code:"1499",name:"Dairy products"},{areaPerUnit:.01,code:"15336",name:"Sports food"},{areaPerUnit:.01,code:"1502",name:"Beer"},{areaPerUnit:.01,code:"1503",name:"Soft drinks"},{areaPerUnit:.01,code:"401965",name:"Peanuts"},{areaPerUnit:.01,code:"15749",name:"Instant food"},{areaPerUnit:.01,code:"15747",name:"Oil"},{areaPerUnit:.0143,code:"1494",name:"Eggs"},{areaPerUnit:.0143,code:"1489",name:"Milk"},{areaPerUnit:.02,code:"380002",name:"Oysters"},{areaPerUnit:.02,code:"3869",name:"Canned products"},{areaPerUnit:.02,code:"16006",name:"Spice"},{areaPerUnit:.02,code:"1505",name:"Alcohol"},{areaPerUnit:.02,code:"335179",name:"Red caviar"},{areaPerUnit:.02,code:"335175",name:"Canned fish"},{areaPerUnit:.02,code:"335180",name:"Caviar"},{areaPerUnit:.02,code:"380000",name:"Liqueur"},{areaPerUnit:.02,code:"422055",name:"Canned olives"},{areaPerUnit:.02,code:"401968",name:"Tea"},{areaPerUnit:.03,code:"380005",name:"Natural Coffee"},{areaPerUnit:.03,code:"335178",name:"Fish delicacies"},{areaPerUnit:.03,code:"380006",name:"Instant Coffee"},{areaPerUnit:.04,code:"422054",name:"Olive oil"},{areaPerUnit:.08,code:"1490",name:"Meat"},{areaPerUnit:.001,code:"1522",name:"Press"},{areaPerUnit:.0067,code:"1511",name:"Household chemistry"},{areaPerUnit:.01,code:"13708",name:"Gifts and Souvenirs"},{areaPerUnit:.01,code:"15335",name:"Sports tools"},{areaPerUnit:.01,code:"1514",name:"Toys"},{areaPerUnit:.01,code:"3966",name:"Books"},{areaPerUnit:.01,code:"15336",name:"Sports food"},{areaPerUnit:.0143,code:"3866",name:"Office supplies"},{areaPerUnit:.02,code:"16007",name:"Perfumery"},{areaPerUnit:.02,code:"303308",name:"Cosmetics"},{areaPerUnit:.1,code:"2540",name:"Bijouterie"},{areaPerUnit:.1,code:"1521",name:"Dishes"},{areaPerUnit:.1,code:"1524",name:"Watches"},{areaPerUnit:.2,code:"1519",name:"Shoes"},{areaPerUnit:.2,code:"1520",name:"Clothes"},{areaPerUnit:.2,code:"7092",name:"Hair dryer"},{areaPerUnit:.2,code:"15334",name:"Baseball cap"},{areaPerUnit:.2,code:"401972",name:"Dress"},{areaPerUnit:.2,code:"1513",name:"Bicycle"},{areaPerUnit:.2,code:"370078",name:"Engine Oil"},{areaPerUnit:.2,code:"16010",name:"Umbrella"},{areaPerUnit:.25,code:"401971",name:"Video camera"},{areaPerUnit:.25,code:"401973",name:"Knitwear"},{areaPerUnit:.25,code:"312799",name:"Table and bed linen"},{areaPerUnit:.25,code:"3870",name:"Sanitary equipment"},{areaPerUnit:.25,code:"312798",name:"Underwear "},{areaPerUnit:.25,code:"7094",name:"Mirror"},{areaPerUnit:.2857,code:"1517",name:"Ð¡ellular phone"},{areaPerUnit:.2857,code:"3838",name:"GPS-navigators"},{areaPerUnit:.2857,code:"1523",name:"Camera"},{areaPerUnit:.2857,code:"7093",name:"Flat-iron"},{areaPerUnit:.3,code:"370075",name:"Power tools"},{areaPerUnit:.4,code:"3965",name:"Shower cabins"},{areaPerUnit:.5,code:"1516",name:"Bedroom furniture"},{areaPerUnit:1,code:"3867",name:"Washing machines"},{areaPerUnit:1,code:"1510",name:"Refrigerators"},{areaPerUnit:1,code:"373200",name:"Cookers"},{areaPerUnit:1,code:"380004",name:"Coffee machine"},{areaPerUnit:1,code:"370074",name:"Air conditioner"},{areaPerUnit:1,code:"1512",name:"Audio electronics"},{areaPerUnit:1,code:"3868",name:"TV-sets"},{areaPerUnit:1,code:"373202",name:"Dishwashers"},{areaPerUnit:2,code:"15337",name:"Trainer"},{areaPerUnit:2,code:"1515",name:"Computer"},{areaPerUnit:2.5,code:"7095",name:"Furniture"},{areaPerUnit:2.5,code:"373199",name:"Kitchen Furniture"},{areaPerUnit:6.6667,code:"15338",name:"Water scooter"},{areaPerUnit:10,code:"370076",name:"Bronze decor"}],
	mary: [{areaPerUnit:.0143,code:"1467",name:"Oil"},{areaPerUnit:.0286,code:"1483",name:"Chemicals"},{areaPerUnit:.2,code:"370078",name:"Engine Oil"},{areaPerUnit:.02,code:"380002",name:"Oysters"},{areaPerUnit:.03,code:"335176",name:"Salmon"},{areaPerUnit:.05,code:"335174",name:"Fish"},{areaPerUnit:.2,code:"380001",name:"Pearl"},{areaPerUnit:.004,code:"1462",name:"Clay"},{areaPerUnit:.005,code:"1468",name:"Chemical minerals"},{areaPerUnit:.01,code:"1469",name:"Coal"},{areaPerUnit:.01,code:"1466",name:"Silica"},{areaPerUnit:.02,code:"370070",name:"Copper pyrites"},{areaPerUnit:.02,code:"7089",name:"Manganese"},{areaPerUnit:.02,code:"1464",name:"Iron ore"},{areaPerUnit:.04,code:"380050",name:"Titanium Ore"},{areaPerUnit:.05,code:"1461",name:"Bauxite"},{areaPerUnit:.05,code:"7088",name:"Chrome"},{areaPerUnit:.1,code:"1524",name:"Watches"},{areaPerUnit:.1,code:"2540",name:"Bijouterie"},{areaPerUnit:.1,code:"1465",name:"Gold"},{areaPerUnit:.2,code:"380001",name:"Pearl"},{areaPerUnit:.6667,code:"1460",name:"Diamonds"},{areaPerUnit:2.5,code:"380008",name:"Pearl jewelry"},{areaPerUnit:2.5,code:"2546",name:"Brilliants"},{areaPerUnit:2.5,code:"1526",name:"Jewellery"},{areaPerUnit:7,code:"351577",name:"Art decor"},{areaPerUnit:10,code:"370076",name:"Bronze decor"},{areaPerUnit:.01,code:"15336",name:"Sports food"},{areaPerUnit:.02,code:"359859",name:"Hormonal drugs"},{areaPerUnit:.02,code:"359861",name:"Natural medicines"},{areaPerUnit:.02,code:"359858",name:"Natural ingredients"},{areaPerUnit:.02,code:"359862",name:"Herbs"},{areaPerUnit:.02,code:"359863",name:"Personal Hygiene products"},{areaPerUnit:.02,code:"359860",name:"Synthetic drugs"},{areaPerUnit:.02,code:"359857",name:"Synthetic ingredients"},{areaPerUnit:.1,code:"359856",name:"Medical instruments"},{areaPerUnit:.25,code:"312799",name:"Table and bed linen"},{areaPerUnit:.001,code:"1493",name:"Cotton"},{areaPerUnit:.002,code:"1487",name:"Grain"},{areaPerUnit:.002,code:"1491",name:"Sugar"},{areaPerUnit:.003,code:"380003",name:"Coffee"},{areaPerUnit:.004,code:"422053",name:"Olives"},{areaPerUnit:.005,code:"1492",name:"Grapes"},{areaPerUnit:.005,code:"17609",name:"Oranges"},{areaPerUnit:.008,code:"1501",name:"Flour"},{areaPerUnit:.01,code:"359847",name:"Flowers, Herbs and Aromatic plants"},{areaPerUnit:.01,code:"1488",name:"Cacao"},{areaPerUnit:.02,code:"16004",name:"Perfume essence"},{areaPerUnit:.02,code:"303309",name:"Cosmetic oil"},{areaPerUnit:1e-4,code:"312797",name:"Cotton waste"},{areaPerUnit:.001,code:"312795",name:"Cotton fibre"},{areaPerUnit:.01,code:"1482",name:"Fabric"},{areaPerUnit:.01,code:"1472",name:"Paper"},{areaPerUnit:.02,code:"303309",name:"Cosmetic oil"},{areaPerUnit:.02,code:"16004",name:"Perfume essence"},{areaPerUnit:.0286,code:"1484",name:"Wool"},{areaPerUnit:.0286,code:"7090",name:"Thermoelement"},{areaPerUnit:.0286,code:"1479",name:"Synthetic fabric"},{areaPerUnit:.03,code:"370073",name:"Duralumin alloy"},{areaPerUnit:.04,code:"370071",name:"Copper"},{areaPerUnit:.05,code:"1474",name:"Leather"},{areaPerUnit:.05,code:"1463",name:"Wood"},{areaPerUnit:.05,code:"1480",name:"Steel"},{areaPerUnit:.0625,code:"1478",name:"Rubber"},{areaPerUnit:.0667,code:"1481",name:"Glass"},{areaPerUnit:.08,code:"380051",name:"Titanium"},{areaPerUnit:.1,code:"312796",name:"Cotton fabric"},{areaPerUnit:.1,code:"7091",name:"Mirror plate"},{areaPerUnit:.1,code:"370077",name:"Car Parts"},{areaPerUnit:.1176,code:"1471",name:"Aluminium"},{areaPerUnit:.1429,code:"15339",name:"Carbon fiber"},{areaPerUnit:.1429,code:"1477",name:"Plastics"},{areaPerUnit:.1429,code:"1476",name:"Dyestuff"},{areaPerUnit:.25,code:"335183",name:"Trawl"},{areaPerUnit:.001,code:"1500",name:"Icecream"},{areaPerUnit:.002,code:"1491",name:"Sugar"},{areaPerUnit:.0029,code:"1506",name:"Bread"},{areaPerUnit:.005,code:"1504",name:"Juice"},{areaPerUnit:.005,code:"17609",name:"Oranges"},{areaPerUnit:.005,code:"1492",name:"Grapes"},{areaPerUnit:.005,code:"1498",name:"Noodles"},{areaPerUnit:.008,code:"1501",name:"Flour"},{areaPerUnit:.0083,code:"3865",name:"Sweets"},{areaPerUnit:.01,code:"1496",name:"Sausages"},{areaPerUnit:.01,code:"15336",name:"Sports food"},{areaPerUnit:.01,code:"380007",name:"Energetic drinks"},{areaPerUnit:.01,code:"1507",name:"Chocolate"},{areaPerUnit:.01,code:"1503",name:"Soft drinks"},{areaPerUnit:.01,code:"1497",name:"Pastry"},{areaPerUnit:.01,code:"373201",name:"Cheese"},{areaPerUnit:.01,code:"1502",name:"Beer"},{areaPerUnit:.01,code:"1499",name:"Dairy products"},{areaPerUnit:.0143,code:"1489",name:"Milk"},{areaPerUnit:.0143,code:"1494",name:"Eggs"},{areaPerUnit:.02,code:"335179",name:"Red caviar"},{areaPerUnit:.02,code:"16006",name:"Spice"},{areaPerUnit:.02,code:"380000",name:"Liqueur"},{areaPerUnit:.02,code:"380002",name:"Oysters"},{areaPerUnit:.02,code:"1505",name:"Alcohol"},{areaPerUnit:.02,code:"335175",name:"Canned fish"},{areaPerUnit:.02,code:"422055",name:"Canned olives"},{areaPerUnit:.02,code:"3869",name:"Canned products"},{areaPerUnit:.03,code:"380006",name:"Instant Coffee"},{areaPerUnit:.03,code:"380005",name:"Natural Coffee"},{areaPerUnit:.03,code:"335178",name:"Fish delicacies"},{areaPerUnit:.04,code:"422054",name:"Olive oil"},{areaPerUnit:.08,code:"1490",name:"Meat"},{areaPerUnit:.1,code:"370077",name:"Car Parts"},{areaPerUnit:.1,code:"1475",name:"Components"},{areaPerUnit:.2,code:"370072",name:"Electric drive"},{areaPerUnit:.5,code:"1525",name:"Tires"},{areaPerUnit:.6667,code:"1485",name:"Electronic components"},{areaPerUnit:1,code:"1473",name:"Engine"},{areaPerUnit:2,code:"1529",name:"Machine"},{areaPerUnit:2,code:"10717",name:"Power-saw bench"},{areaPerUnit:2,code:"12097",name:"Mining equipment"},{areaPerUnit:6.6667,code:"15338",name:"Water scooter"},{areaPerUnit:6.6667,code:"1518",name:"Motorcycle"},{areaPerUnit:10,code:"373197",name:"Hairdressing equipment"},{areaPerUnit:10,code:"370079",name:"Sedan"},{areaPerUnit:10,code:"1528",name:"Device"},{areaPerUnit:10,code:"359855",name:"Medical equipment"},{areaPerUnit:10,code:"373198",name:"Restaurant equipment"},{areaPerUnit:10,code:"1509",name:"Car"},{areaPerUnit:12,code:"370081",name:"Sports Car"},{areaPerUnit:12.5,code:"1530",name:"Tractor"},{areaPerUnit:15,code:"370080",name:"SUV"},{areaPerUnit:100,code:"131",name:"Yacht equipment"},{areaPerUnit:200,code:"132",name:"Yacht interiors"},{areaPerUnit:250,code:"380055",name:"Chassis"},{areaPerUnit:250,code:"130",name:"Ship's hull"},{areaPerUnit:250,code:"380057",name:"Avionics"},{areaPerUnit:299.994,code:"133",name:"Yacht"},{areaPerUnit:375.0094,code:"380058",name:"Aircraft Interior"},{areaPerUnit:500,code:"422133",name:"Heat Transfer Equipment"},{areaPerUnit:500,code:"380056",name:"Aircraft Engine"},{areaPerUnit:1e3,code:"422134",name:"Coal Mill"},{areaPerUnit:1e3,code:"335182",name:"Trawler"},{areaPerUnit:1e3,code:"422131",name:"Steam Turbine"},{areaPerUnit:1e3,code:"422132",name:"Steam-boiler"},{areaPerUnit:1250,code:"380054",name:"Empennage elements"},{areaPerUnit:1250,code:"380052",name:"Fuselage section"},{areaPerUnit:1874.7657,code:"380053",name:"Wing elements"},{areaPerUnit:5e3,code:"422135",name:"Coal-fired Power"},{areaPerUnit:25e3,code:"380059",name:"Narrowbody aircraft"},{areaPerUnit:.001,code:"1522",name:"Press"},{areaPerUnit:.0067,code:"1511",name:"Household chemistry"},{areaPerUnit:.01,code:"13708",name:"Gifts and Souvenirs"},{areaPerUnit:.01,code:"3966",name:"Books"},{areaPerUnit:.01,code:"15336",name:"Sports food"},{areaPerUnit:.01,code:"1514",name:"Toys"},{areaPerUnit:.01,code:"15335",name:"Sports tools"},{areaPerUnit:.0143,code:"3866",name:"Office supplies"},{areaPerUnit:.02,code:"303308",name:"Cosmetics"},{areaPerUnit:.02,code:"16007",name:"Perfumery"},{areaPerUnit:.025,code:"301318",name:"Leather accessories"},{areaPerUnit:.025,code:"301319",name:"Bags and briefcases"},{areaPerUnit:.1,code:"1524",name:"Watches"},{areaPerUnit:.1,code:"1521",name:"Dishes"},{areaPerUnit:.1,code:"2540",name:"Bijouterie"},{areaPerUnit:.2,code:"17611",name:"Beach stuff"},{areaPerUnit:.2,code:"1519",name:"Shoes"},{areaPerUnit:.2,code:"370078",name:"Engine Oil"},{areaPerUnit:.2,code:"7092",name:"Hair dryer"},{areaPerUnit:.2,code:"15334",name:"Baseball cap"},{areaPerUnit:.2,code:"16010",name:"Umbrella"},{areaPerUnit:.2,code:"1520",name:"Clothes"},{areaPerUnit:.2,code:"1513",name:"Bicycle"},{areaPerUnit:.2,code:"17610",name:"Football uniform"},{areaPerUnit:.25,code:"7094",name:"Mirror"},{areaPerUnit:.25,code:"3870",name:"Sanitary equipment"},{areaPerUnit:.25,code:"312798",name:"Underwear "},{areaPerUnit:.25,code:"312799",name:"Table and bed linen"},{areaPerUnit:.2857,code:"7093",name:"Flat-iron"},{areaPerUnit:.2857,code:"1517",name:"Cellular phone"},{areaPerUnit:.2857,code:"1523",name:"Camera"},{areaPerUnit:.2857,code:"3838",name:"GPS-navigators"},{areaPerUnit:.3,code:"370075",name:"Power tools"},{areaPerUnit:.4,code:"3965",name:"Shower cabins"},{areaPerUnit:.5,code:"301320",name:"Outerwear"},{areaPerUnit:.5,code:"1516",name:"Bedroom furniture"},{areaPerUnit:1,code:"1512",name:"Audio electronics"},{areaPerUnit:1,code:"370074",name:"Air conditioner"},{areaPerUnit:1,code:"3868",name:"TV-sets"},{areaPerUnit:1,code:"3867",name:"Washing machines"},{areaPerUnit:1,code:"373200",name:"Cookers"},{areaPerUnit:1,code:"373202",name:"Dishwashers"},{areaPerUnit:1,code:"1510",name:"Refrigerators"},{areaPerUnit:1,code:"380004",name:"Coffee machine"},{areaPerUnit:2,code:"15337",name:"Trainer"},{areaPerUnit:2,code:"1515",name:"Computer"},{areaPerUnit:2.5,code:"7095",name:"Furniture"},{areaPerUnit:2.5,code:"373199",name:"Kitchen Furniture"},{areaPerUnit:6.6667,code:"15338",name:"Water scooter"},{areaPerUnit:10,code:"370076",name:"Bronze decor"}]
	}
	this.DefaultSettings = [
		{key:"VE_TOP", value:true, status:true, desc:"Enable the display of TOP Info on the Default unit views"},
		{key:"VE_Date",value:true,status:true,desc:"Display Current date and realm reset mouseover"},
		{key:"VE_WarehouseAreaPerUnit",value:true,status:false,desc:"Display area per unit on warehouses"},
		{key:"VE_QualUnitTechIntro",value:true,status:true,desc:"Display a table of required qualifications on the unit technology introduction page"},
		{key:"VE_PQRGlobalMarket",value:true,status:true,desc:"Enable display of Price/Quality Ration on the Global Market pages with localized sorting"},
		{key:"VE_PQRUnitAndEquipmentSupply",value:true,status:true,desc:"Enable display of Price/Quality Ration on the Unit Supply & Equipment Repair pages with localized sorting"},
		{key:"VE_PQRMgmtEquipRepair",value:true,status:false,desc:"Enable display of Price/Quality Ration on the Management->Equipment Repair pages with localized sorting"},
		{key:"VE_UnitSupplyPage",value:true,status:true,desc:"Enable restyling of unit supply page with additional information"},
		{key:"VE_MgmtEmployeeTrainingLink",value:true,status:true,desc:"Enable the display of a direct link to unit employee training on the Employee Management pages"},
		{key:"VE_EnterpriseMarketDiscount",value:true,status:true,desc:"Enable the display of color coded discount percentages on the Enterprise Market"},
		{key:"VE_TODO",value:true,status:true,desc:"Enable TODO/Task Management Functionality"},
		{key:"VE_LABINVEST",value:true,status:true,desc:"Enable showing Average Research Time on Lab Investigation pages"}
	];
	var _ModalPopupBackgroundID = 'VE_MODAL_BG';
	
	var urlRegEx = {
		main : "virtonomic*.*\/(.*)\/main\/.*",
		unitList : "virtonomic*.*\/.*\/main\/company\/view\/.*\/unit_list",
		companyView : "virtonomic*.*\/(.*)\/main\/company\/view\/([0-9]+/.*)",
		unitViewMain: "virtonomic*.*\/(.*)\/main\/unit\/view\/([0-9]+#?$)",
		unitViewSubPage : "virtonomic*.*\/(.*)\/main\/unit\/view\/([0-9]{1,})/(.*)",
		globalReport : "virtonomic*.*\/(.*)\/window\/globalreport\/marketing\/by_products\/([0-9]+)",
		unitSupplyCreate : "virtonomic*.*\/(.*)\/window\/unit\/supply\/create\/([0-9]+)\/step2",
		unitSupply :  "virtonomic*.*\/.*\/main\/unit\/view\/[0-9]+\/supply",
		equipment : "virtonomic*.*\/.*/window/unit/equipment/[0-9]+",
		companyEmployeeMgmnt : "virtonomic*.*\/.*\/main\/company\/view\/[0-9]+\/unit_list/employee",
		qualification : "virtonomic*.*\/.*\/main\/user\/privat\/persondata\/knowledge",
		unitMarket : "virtonomic*.*\/.*\/main\/unit_market\/list",
		MgmntEquipmentRepair : "virtonomic*.*\/.*\/window\/management_units\/equipment\/repair"
	};
	
	var url = location.href;
		
	//----- UTILITY FUNCTIONS -----
	
	//general utility function for dumping debug messages to console
	function debug(msg){
		if(DEBUG) console.log('VE_'+CurrentScriptVersion+': '+msg+'\n');
	}
	//returns type, size or id of a unit
	function getUnitInfo(method) {
		switch(method) {
			case 'type'	: 	return $("div#unitImage img").attr('src').match(/([^\/]*)_/)[1];
			case 'size'	: 	return $("div#unitImage img").attr('src').match(/[^\/]*_(\d)/)[1];
			case 'id'	: 	return url.match(/(\d+)/)[1];
			default 	: 	return "" 
		};
	};
	//returns companyID or servername
	function getPlayerInfo(method){
		switch(method){
			case 'companyID': return $('a:first',$('ul#menutop li span:contains("Company")').next('ul')).attr('href').match(/\d+/)[0];
			case 'server'	: return url.match(/virtonomic*.*\/(.*)\/main|window/)[1];
			default : return "";
			};
	};
	//formats currency strings
	function FormatCurrency(amount){
		//format currency
		var i = parseFloat(amount);
		if(isNaN(i)) { i = 0.00; }
		var minus = '';
		if(i < 0) { minus = '-'; }
		i = Math.abs(i);
		i = parseInt((i + .005) * 100);
		i = i / 100;
		s = new String(i);
		if(s.indexOf('.') < 0) { s += '.00'; }
		if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
		s = minus + s;
		amount = s;
		
		//format spaces
		var delimiter = " "; // replace comma if desired
		var a = amount.split('.',2)
		var d = a[1];
		var i = parseInt(a[0]);
		if(isNaN(i)) { return ''; }
		var minus = '';
		if(i < 0) { minus = '-'; }
		i = Math.abs(i);
		var n = new String(i);
		var a = [];
		while(n.length > 3)
		{
			var nn = n.substr(n.length-3);
			a.unshift(nn);
			n = n.substr(0,n.length-3);
		}
		if(n.length > 0) { a.unshift(n); }
		n = a.join(delimiter);
		if(d.length < 1) { amount = n; }
		else { amount = n + '.' + d; }
		amount = minus + amount;
		return amount+'$';
	}
	//removes all whitespaces from the text
	function trimWhitespace(text){
		return text.replace(/\s/g,'');
		}
	//parses a money string and return a float
	function parseMoney(text){
		return parseFloat(trimWhitespace(text.replace('$','')));
		}
	
	function getAreaPerUnit(pname){
		//debugger;
		for(var i=0; i< VE.Data.storage_ratios[getPlayerInfo('server')].length; i++){
			var item = VE.Data.storage_ratios[getPlayerInfo('server')][i];
			if(item.name == pname){	return item.areaPerUnit; }
		}
		return 0.0;
	}

	//Cross-browser Modal Popup using Javascript by SBajra
	//http://codeissue.com/articles/a04daf3210c8b0a/cross-browser-modal-popup-using-javascript-jquery
	function ShowModalPopup(modalPopupID) {

		//Setting modal popup window
	
		//Boolean to detect IE6.
		var isIE6 = (navigator.appVersion.toLowerCase().indexOf('msie 6') > 0);
	
		var popupID = "#" + modalPopupID;
	
		//Get popup window margin top and left
		var popupMarginTop = $(popupID).height() / 2;
		var popupMarginLeft = $(popupID).width() / 2;
	
		//Set popup window left and z-index
		//z-index of modal popup window should be higher than z-index of modal background
		$(popupID).css({
			'left': '50%',
			'z-index': 9999
		});
	
		//Special case for IE6 because it does not understand position: fixed
		if (isIE6) {
			$(popupID).css({
				'top': $(document).scrollTop(),
				'margin-top': $(window).height() / 2 - popupMarginTop,
				'margin-left': -popupMarginLeft,
				'display': 'block',
				'position': 'absolute'
			});
		}
		else {
			$(popupID).css({
				'top': '50%',
				'margin-top': -popupMarginTop,
				'margin-left': -popupMarginLeft,
				'display': 'block',
				'position': 'fixed'
			});
		}
	
		//Automatically adding modal background to the page.
		$("#" + _ModalPopupBackgroundID).remove();
		var backgroundSelector = $('<div id="' + _ModalPopupBackgroundID + '" ></div>');
	
		//Add modal background to the body of the page.
		backgroundSelector.appendTo('body');
	
		//Set CSS for modal background. Set z-index of background lower than popup window.
		backgroundSelector.css({
			'width': $(document).width(),
			'height': $(document).height(),
			'display': 'none',
			'background-color': '#555555',
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'z-index': 9990
		});
	
		backgroundSelector.fadeTo('fast', 0.8);
	}
	function HideModalPopup(modalPopupID) {
		//Hide modal popup window
		$("#" + modalPopupID).css('display', 'none');
	
		//Remove modal background from DOM.
		$("#" + _ModalPopupBackgroundID).remove();
	}
	//hack to make forEach available for array objects in javascript		
	if (!Array.prototype.forEach){
	  Array.prototype.forEach = function(fun /*, thisp*/)
	  {
		var len = this.length;
		if (typeof fun != "function")
		  throw new TypeError();
	
		var thisp = arguments[1];
		for (var i = 0; i < len; i++)
		{
		  if (i in this)
			fun.call(thisp, this[i], i, this);
		}
	  };
	}
	//----- ----- ----- ----- -----
	
	//Settings & Configuration
	
	this.Settings = {
		getOption: function(key) { return localStorage[key]; },
		setOption: function(key,value){ localStorage[key] = value; },
		init: function(){
			debug('Loading Settings');
			$.each(VE.DefaultSettings, function(index, setting){
				if(localStorage[setting.key] == undefined) 
					{ localStorage[setting.key] = setting.value; }
				if(setting.status == false) 
					{ localStorage[setting.key] = "false"; }
				
					//debug(setting.key + ' set to ' + setting.value);
			});
			//display the config icon
			$('<li id="ve_config" class="icon popup" title="VE Settings">'
				+'<img id="ve_settings_icon" alt src="http://icons.iconarchive.com/icons/martz90/circle/24/settings-icon.png"></img>'
				+'</li>').insertAfter('li.menuhelp');
			//hook the config icon
			$('img#ve_settings_icon').click(function(){ ShowModalPopup('ve_config_popup'); return false; });
			//build the config popup
			var ve_config_popup = $('<div id="ve_config_popup" style="display:none; width:600px; height: 400px; border:2px solid black; background-color:white;">'
    					+	'<div id="popupTitle" style="position:absolute; top:2; left:2; width:600px; background:lightgrey">'
    					+   	'<span style="color:black;float:left; padding:1px 0 1px 5px">VE '+CurrentScriptVersion+' Config</span></div>'
    					+	'<div id="popupContent" style="margin:25px 10px 10px 10px;">'
    					+	'</div></div>');
			var veconfig_btn_cancel = $('<a href="#" id="cancelPopup" style="float:right">X</a>');
			veconfig_btn_cancel.click(function(){ HideModalPopup('ve_config_popup'); return false;});
			var veconfig_btn_save = $('<button name="veconfig_btn_save">Save</button>');
			
			veconfig_btn_save.click(function(){
				//debugger;
				$('table#veconfig_opt_table input').each(function(){
					if($(this).prop('checked'))
					{ Settings.setOption($(this).attr('name'),true); }
					else { Settings.setOption($(this).attr('name'),false); }
				});
				HideModalPopup('ve_config_popup');
				alert('Settings Saved');
				return false;
			});
			ve_config_popup.appendTo('li#ve_config');
			var veconfig_tbody = $('<tbody></tbody>');
			$.each(VE.DefaultSettings, function(index, setting){
					//debugger;
					$('<tr><td><input style="float:left" type="checkbox" name="'+setting.key+'" '
					+((Settings.getOption(setting.key)=="false")?'':'checked')
					+ ((setting.status===false)?'disabled':'')					
					+'></input></td><td>'
					+'<td><label style="float:left;'
					+ ((setting.status===false)?'text-decoration: line-through;':'')					
					+'" for="'+setting.key+'">'+setting.desc
					+ ((setting.status===false)?' (Currently Disabled by dev)':'')
					+'</label>'+'</td></tr>').appendTo(veconfig_tbody);
			});
			veconfig_table = $('<table id="veconfig_opt_table"style="border:1px solid black; margin:30px 0 10px 0"></table>');
			veconfig_form = $('<form></form>');
			veconfig_tbody.appendTo(veconfig_table);
			veconfig_table.appendTo(veconfig_form);
			veconfig_form.appendTo('div#ve_config_popup div#popupContent');
			veconfig_btn_cancel.appendTo('div#ve_config_popup div#popupTitle');
    		veconfig_btn_save.appendTo('div#ve_config_popup div#popupContent');
				
		}
	}
	
	//Initialize Settings
	this.Settings.init();
	
	//Display the clock on every 'main' page
	var parsedUrl = (new RegExp(urlRegEx["main"])).exec(url);
	if (parsedUrl != null && Settings.getOption('VE_Date')=="true"){
		$('<div id="ve_clock" style="position:absolute;right:60px;top:40px;font-size:11px;color:#ddd;"></div>').insertBefore("div#server-time");
		ve_clock = $('div#ve_clock');
		ve_clock.html((new Date()).toDateString());
		var server = parsedUrl[1]; var serverReset;
		switch(server) {
			case 'mary' : serverReset = "00:00-02:00 UTC"; break;
			case 'lien' : serverReset = "22:00-24:00 UTC"; break;
			case 'anna' : serverReset = "00:00-01:00 UTC"; break;
			default : serverReset = "unavailable";
			}
		ve_clock.attr('title',"New turn every day at "+serverReset)
	}
	
	//All thanks to VLLord for the TOP formulas
	function Top1(qE,nE,C){
		return (0.1*Math.pow((nE/C),0.5)*Math.pow(qE,(0.09+Math.log(1+qE/(12.5+0.05*qE))))).toFixed(2);
	}
	function Top2(nE,C){
		return (3.17*Math.pow((nE/500/C),0.42)).toFixed(2);
	}
	function Top3(Q,C) {
		return Math.round(19100*Math.pow((Q/12.4),(1.54+0.1*Math.log(Q)))*C);
	}
	//Adds TOP information to default unit view
	if (((new RegExp(urlRegEx["unitViewMain"])).exec(url) != null) 
		&& Settings.getOption('VE_TOP')=='true') {
		var regUnitType = new RegExp("([^\/]*)_");
		var unitType = regUnitType.exec($("div#unitImage img").attr("src"))[1];
		var nE_Label, qE_Label;
		switch(unitType){
			case 'sawmill':
			case 'animalfarm':
			case 'farm':
			case 'mill':
			case 'workshop':
				nE_Label = 'Number of workers';
				qE_Label = 'Qualification of employees';
				break;
			case 'lab':
				nE_Label = 'Number of scientists';
				qE_Label = 'Qualification of scientists';
				break;
			case 'orchard':
				nE_Label = 'Number of workers';
				qE_Label = 'Workers qualification';
				break;
			default:
				nE_Label = 'Number of employees';
				qE_Label = 'Qualification of employees';
				break;			
		}
		var C = VE.Data.unitTypeCoeff[unitType];
		if(C!=0)
		{
			var Q = parseInt($("div#mainContent table tbody tr:contains('Qualification of player') td:nth(1)").text().split('\n')[1]);
			var nE = parseInt($("div#mainContent table tbody tr:contains("+nE_Label+") td:nth(1)").text().replace(/\s/g,'').split('(')[0]);
			var qE = parseFloat($("div#mainContent table tbody tr:contains("+qE_Label+") td:nth(1)").text().split('(')[0]);
			
			$(
			'<div id="ve_topInfo" style="float:right;margin-left:300px;clear:right"><table class="list">'+
				'<tbody>'+
					'<tr>'+
						'<th>TOP1</th>'+'<td align="center">'+Top1(qE,nE,C)+'</td>'+
						'<th>TOP2</th>'+'<td align="center">'+Top2(nE,C)+'</td>'+
						'<th>TOP3</th>'+'<td align="center">'+Top3(Q,C)+'</td>'+
					'</tr>'+
				'</tbody>'+
			'</table></div>').insertAfter("div#unit_subtab");
		}
	}
	
	//Adds area per unit to the warehouse main page
	if ((new RegExp(urlRegEx["unitViewMain"])).exec(url) != null 
		&& getUnitInfo('type') == 'warehouse' 
		&& Settings.getOption('VE_WarehouseAreaPerUnit')=="true") {
	var warehouseArea = [0, 10000, 50000,100000,500000,1000000,5000000];
	var totalArea = warehouseArea[getUnitInfo('size')];
	$('table.grid tr:first').append('<th>Area per unit</th>');
	$('tr.even, tr.odd').each(function(){
		var areaPart = parseFloat($('td:last',this).text().replace('%','').replace(/\s/g,''))/100;
		var inStock = parseInt($('td:nth(1)',this).text().replace(/\s/g,''));
		var product = $('td:first img',this).attr('alt');
		var areaPerUnit = getAreaPerUnit(product);
		var areaPercentUsed = (100*areaPerUnit*inStock/totalArea).toFixed(3);
		$(this).append('<td align="right" class="nowrap">'+areaPercentUsed+'</td>');
	});
		
	}
	
	//Adds Employee qualification level & Equipment quality required 
	//for each tech level to unit technology intro page
	var parsedUrl = (new RegExp(urlRegEx["unitViewSubPage"])).exec(url);
	if (parsedUrl != null && Settings.getOption('VE_QualUnitTechIntro')=="true") { 
		if (parsedUrl[3] == 'technology') {
			var maxTechLevel = parseInt($("div#mainContent table.list tr:last td:first div:nth(1)").text().split(' ')[1]);
			$("div#mainContent fieldset:last tr:first th:first").prop("width","40%")
			$("div#mainContent fieldset:last tr:first").append('<th>Employee Qualification Required</th>');
			$("div#mainContent fieldset:last tr:first").append('<th>Equipment Quality Required</th>');
			var row = $('div#mainContent fieldset:last tr')
			row.each(function(){
				var TechLevel;
				if ($(this).hasClass('disabled')) 
					{ 
						TechLevel = parseInt($("td div",this).text().split(' ')[1]);
					}
				else
					{ 
						TechLevel = parseInt($("td div:nth(1)",this).text().split(' ')[1]);
					} 
				if ($(this).hasClass('even') || $(this).hasClass('odd') || $(this).hasClass('disabled'))
					{ 
						$(this).append('<td align="right">'+Math.pow(TechLevel,0.8).toFixed(2)+'</td>');
						$(this).append('<td align="right">'+Math.pow(TechLevel,1.2).toFixed(2)+'</td>');
					}
				});
		}
	}
	
	var PQR = {};
	PQR.HEADER_TH = $('<th>PQR</th>');
	PQR.ORDERTOOL = $('<th id="ve_pqr_ordertool"><div class="ordertool"><table class="ordercont"><tbody><tr>'
					+'<td class="title-ordertool"></td>'
					+'<td class="arrows">'
					+	'<a href="#"><img src="/img/asc.gif" alt="^" width="9" height="6" border="0"></a>'
					+	'<a href="#"><img src="/img/desc.gif" alt="v" width="9" height="6" border="0"></a>'
					+'</td>'
				+'</tr></tbody></table>'
		+'</div></th>');
	
	
	//Adds PQR ratio to global market reports by products with local pqr sorting
	if ((new RegExp(urlRegEx["globalReport"])).exec(url) != null && Settings.getOption('VE_PQRGlobalMarket')=="true"){
		var inverse = false;
		var header = $(
		'<th id="ve_pqr"><div class="ordertool"><table class="ordercont"><tbody><tr>'
					+'<td class="title-ordertool">PQR</td>'
					+'<td class="arrows">'
					+	'<a href="#"><img src="/img/asc.gif" alt="^" width="9" height="6" border="0"></a>'
					+	'<a href="#"><img src="/img/desc.gif" alt="v" width="9" height="6" border="0"></a>'
					+'</td>'
				+'</tr></tbody></table>'
		+'</div></th>');
		header.insertBefore('table.grid tr:first th:last');
		header = $("th#ve_pqr");
		header.attr("title","Price / Quality Ratio");
		var sorter = function(sender){
			var index = $(sender).closest('th').index();
			var tbl = $(sender).closest('th').closest('table');
			var sortedrows = 
			$(sender).closest('th').closest('table').find('td')
			.filter(function(){return $(this).index() === index;})
			.sort(function(a,b){
				a=$(a).text();
				b=$(b).text();
				return (isNaN(a) || isNaN(b) ? a>b : +a > +b) ? inverse ? -1 : 1 : inverse ? 1 : -1;	
				});
			for(var i=0;i<sortedrows.length; i++){tbl.append(sortedrows[i].parentNode);}
			//fix row ordering by appending pager again
			tbl.append($('table.paging',tbl).closest('tr'));
			//add order highlighting
			$('div.ordertool.active').removeClass('active');
			$('div.ordertool').last().addClass('active');
			var cur_arrow = $('a:first img',$('td.title-ordertool.active').parent());
			if(cur_arrow.attr('src')=='/img/asc-a.gif'){
				cur_arrow.prop('src','/img/asc.gif');
			}
			var cur_arrow = $('a:last img',$('td.title-ordertool.active').parent());
			if(cur_arrow.attr('src')=='/img/desc-a.gif'){
				cur_arrow.prop('src','/img/desc.gif');
			}
			$('td.title-ordertool.active').removeClass('active');
			$('td.title-ordertool').last().addClass('active');
			switch(inverse) {
				case true:
				$('a:first img',sender.parentNode).prop('src','/img/asc.gif');
				$('a:last img',sender.parentNode).prop('src','/img/desc-a.gif');
				break;
				case false:
				$('a:first img',sender.parentNode).prop('src','/img/asc-a.gif');
				$('a:last img',sender.parentNode).prop('src','/img/desc.gif');
				break;
				default:
				$('a:first img',sender.parentNode).prop('src','/img/asc.gif');
				$('a:last img',sender.parentNode).prop('src','/img/desc.gif');
				}
			
			inverse = !inverse;
		}
		$('th#ve_pqr a:first').click(function(){inverse=false; sorter(this);});
		$('th#ve_pqr a:last').click(function(){inverse=true; sorter(this)});
		$('table.grid tbody > tr').each(function(){
			var quality = parseFloat($('td:nth(5)',this).text());
			var price = parseMoney($('td:nth(6)',this).text());
			if($(this).hasClass('odd')||$(this).hasClass('even')){
				$('<td align="right">'+(price/quality).toFixed(2)+'</td>').insertBefore($('td:last',this));
			}
		});
	}
	
	//Adds PQR ratio to unit supply page step 2 with local pqr sorting
	//Adds PQR ratio to equipment supply page
	var isUnitSupplyCreate = (new RegExp(urlRegEx["unitSupplyCreate"])).exec(url); 
	var isEquipmentSupplyCreate = (new RegExp(urlRegEx["equipment"])).exec(url); 
	if ((!isNaN(isUnitSupplyCreate) || !isNaN(isEquipmentSupplyCreate)) && Settings.getOption('VE_PQRUnitAndEquipmentSupply')=="true") {
		//fix the all and quality table headers if its unit supply
		if(isNaN(isEquipmentSupplyCreate)){
			var allHeader = $('table.main_table tr:first th:nth(1)');
			allHeader.removeAttr('rowspan');
			$('td.title-ordertool',allHeader).html('');
			allHeader.clone().insertAfter('tr#table_header th:nth(1)');
			allHeader.html('All');
			
			var qHeader = $('table.main_table tr:first th:nth(3)');
			qHeader.removeAttr('rowspan');
			$('td.title-ordertool',qHeader).html('');
			qHeader.clone().insertAfter('tr#table_header th:nth(6)');
			qHeader.html('Quality');
		}
		var inverse;
		//insert the PQR Column and ordertool
		var header = $('<th>PQR</th>');
		var ordertool = $('<th id="ve_pqr_ordertool"><div class="ordertool"><table class="ordercont"><tbody><tr>'
					+'<td class="title-ordertool"></td>'
					+'<td class="arrows">'
					+	'<a href="#"><img src="/img/asc.gif" alt="^" width="9" height="6" border="0"></a>'
					+	'<a href="#"><img src="/img/desc.gif" alt="v" width="9" height="6" border="0"></a>'
					+'</td>'
				+'</tr></tbody></table>'
		+'</div></th>');
		header.insertBefore('table.main_table tr:first th:last');
		$('table.main_table tr:first').next().append(ordertool);
		ordertool = $("th#ve_pqr_ordertool");
		
		//implement sorting
		ordertool.click(function(e){
			e.preventDefault();
			if (isNaN(inverse)) inverse=false;
			var index = $(this).index();
			var rows = $('table.main_table tbody > tr[id^=r]');
			rows.sort(function (a,b){
					var firstColumnSpan = parseInt($('td:first',a).attr('colspan'));
					if(isUnitSupplyCreate==null)
						if(isNaN(firstColumnSpan))
							a = $('td:nth('+(index)+')',a).text();
						else
						    a = $('td:nth('+(index-1)+')',a).text();
					else
						if(isNaN(firstColumnSpan))
							a = $('td:nth('+(index+3)+')',a).text();
						else
						    a = $('td:nth('+(index+2)+')',a).text();
					firstColumnSpan = parseInt($('td:first',b).attr('colspan'));
					if(isUnitSupplyCreate==null)
						if(isNaN(firstColumnSpan))
							b = $('td:nth('+(index)+')',b).text();
						else
						    b = $('td:nth('+(index-1)+')',b).text();
					else
						if(isNaN(firstColumnSpan))
							b = $('td:nth('+(index+3)+')',b).text();
						else
						    b = $('td:nth('+(index+2)+')',b).text();
					var result = (isNaN(a) || isNaN(b) ? a>b : +a > +b) ? inverse ? -1 : 1 : inverse ? 1 : -1;
					//if(DEBUG) console.log(a,b,result);
					return result;
				});
			rows.each(function(i,row){ $('table.main_table > tbody').append(row); });
			
			/*var sortable = $(this)
				.closest('table')
				.find('td')
				.filter(function(){
					//check the first cell's colspan to see if it spans more than 1 cell
					var firstColumnSpan = parseInt($('td:first',this.parentNode).attr('colspan'));
					if(isUnitSupplyCreate==null) 
						if(isNaN(firstColumnSpan))
								return $(this).index() === index+1;
							else 
								return $(this).index() === index;
					else 
						if(isNaN(firstColumnSpan))
								return $(this).index() === index+3;
							else 
								return $(this).index() === index+2;	
					});
			sortable.sort(function(a,b){
					a=$(a).text();
					b=$(b).text();
					return (isNaN(a) || isNaN(b) ? a>b : +a > +b) ? inverse ? -1 : 1 : inverse ? 1 : -1;			
				});
			sortable.each(function(i,item) {});
			*/
			//fix the ordered rows to be compatible with sorting
			$(this).closest('table').find('tr.ordered').each(function(){
				var orderID = $(this).attr('id').match(/ordered(\d+)/)[1];
				var orderEntry = $('table.main_table > tbody > tr[id^=r'+orderID+']');
				$(this).insertAfter(orderEntry);
			});
			//fix the script tags to come after respective rows, in case of unit supply page
			/*
			if(isEquipmentSupplyCreate == null)
				$('table.main_table > tbody > script').each(function(){
					var rowID = $(this).text().match(/offer\[(\d+)\]/)[1];
					var row = document.getElementById('r'+rowID);
					var script = document.createElement('script');
					script.textContent = $(this).text();
					document.insertBefore(script, row);
				});
				*/
			//add highlighting to ordertool
			$('div.ordertool.active').removeClass('active');
			$('div.ordertool').last().addClass('active');
			var cur_arrow = $('a:first img',$('td.title-ordertool.active').parent());
			if(cur_arrow.attr('src')=='/img/asc-a.gif'){
				cur_arrow.prop('src','/img/asc.gif');
			}
			var cur_arrow = $('a:last img',$('td.title-ordertool.active').parent());
			if(cur_arrow.attr('src')=='/img/desc-a.gif'){
				cur_arrow.prop('src','/img/desc.gif');
			}
			$('td.title-ordertool.active').removeClass('active');
			$('td.title-ordertool').last().addClass('active');
			//$('div.ordertool',this).addClass('active');
			//$('td.title-ordertool',this).addClass('active');
			switch(inverse) {
				case true:
				$('a:first img',this).prop('src','/img/asc.gif');
				$('a:last img',this).prop('src','/img/desc-a.gif');
				break;
				case false:
				$('a:first img',this).prop('src','/img/asc-a.gif');
				$('a:last img',this).prop('src','/img/desc.gif');
				break;
				default:
				$('a:first img',this).prop('src','/img/asc.gif');
				$('a:last img',this).prop('src','/img/desc.gif');
				}
			inverse = !inverse;
			
		});
		//hook the arrows to sorting function
		$('th#ve_pqr a:first').click(function(){inverse=false; ordertool.trigger('click')});
		$('th#ve_pqr a:last').click(function(){inverse=true; ordertool.trigger('click')});
		//Add the PQR values now
		$('table.main_table tbody > tr[id^=r]').each(function(index){
				var quality,price,qIndex,pIndex;
				var firstColumnSpan =  parseInt($('td:first',this).attr('colspan'));
				//if (isNaN(firstColumnSpan)) firstColumnSpan = 1;
				if(isEquipmentSupplyCreate==null){qIndex = 9; pIndex = 8;}
								else {qIndex = 7; pIndex = 6;}
				if(firstColumnSpan > 1) {	
					qIndex = qIndex - firstColumnSpan+1;
					pIndex = pIndex - firstColumnSpan+1;
					}
				quality = parseFloat($('td:nth('+qIndex+')',this).text());
				price = parseFloat($('td:nth('+pIndex+')',this).text().replace('$','').replace(/\s/g,''));
				
				if($(this).hasClass('ordered')==false)
						$('<td align="right">'+(price/quality).toFixed(2)+'</td>').insertBefore($('td:last',this));
				else $('td:first',this).prop('colspan',13);
			
		});
	}
	
	//Adds PQR ratio to Management > Equipment > Repair with local sorting
	//Currently disabled due to errors
	/*
	if ((new RegExp(urlRegEx["MgmntEquipmentRepair"])).exec(url) != null 
		|| (new RegExp(urlRegEx["MgmntEquipmentRepair"]+'#')).exec(url) != null) {
		var inverse;
		//insert the PQR Column and ordertool
		var ordertool = $('<th id="ve_pqr_ordertool"><div class="ordertool"><table class="ordercont"><tbody><tr>'
					+'<td class="title-ordertool">PQR</td>'
					+'<td class="arrows">'
					+	'<a href="#"><img src="/img/asc.gif" alt="^" width="9" height="6" border="0"></a>'
					+	'<a href="#"><img src="/img/desc.gif" alt="v" width="9" height="6" border="0"></a>'
					+'</td>'
				+'</tr></tbody></table>'
		+'</div></th>');
		//header.insertBefore('table.list tr:first th:last');
		$('table.list:nth(1) tr:first').append(ordertool);
		ordertool = $("th#ve_pqr_ordertool");
		//implement sorting
		var sorter = function(sender){
			debugger;
			var index = $(sender).index();
			var sortedrows = 
			$(sender).closest('table').find('td').filter(function(){
				//check the first cell's colspan to see if it spans more than 1 cell
				var firstColumnSpan = parseInt($('td:first',this.parentNode).attr('colspan'));
				if(isUnitSupplyCreate==null) 
					if(isNaN(firstColumnSpan))
							return $(this).index() === index+1;
						else 
							return $(this).index() === index;
				else 
					if(isNaN(firstColumnSpan))
							return $(this).index() === index+3;
						else 
							return $(this).index() === index+2;	
				}).sort(function(a,b){ a=$(a).text(); b=$(b).text();
					return (isNaN(a) || isNaN(b) ? a>b : +a > +b) ? inverse ? -1 : 1 : inverse ? 1 : -1;			
				});
			for(var i=0;i<sortedrows.length; i++){tbl.append(sortedrows[i].parentNode);}
		}
		ordertool.click(function(){
			if (isNaN(inverse)) inverse=false;
			var index = $(this).index();
			var rows = $('table.list tbody > tr[class]');
			//rows.sort(function(a,b){});
			$(this)
				.closest('table')
				.find('td')
				.filter(function(){
					//check the first cell's colspan to see if it spans more than 1 cell
					var firstColumnSpan = parseInt($('td:first',this.parentNode).attr('colspan'));
					if(isUnitSupplyCreate==null) 
						if(isNaN(firstColumnSpan))
								return $(this).index() === index+1;
							else 
								return $(this).index() === index;
					else 
						if(isNaN(firstColumnSpan))
								return $(this).index() === index+3;
							else 
								return $(this).index() === index+2;	
					})
				.sort(function(a,b){
					a=$(a).text();
					b=$(b).text();
					return (isNaN(a) || isNaN(b) ? a>b : +a > +b) ? inverse ? -1 : 1 : inverse ? 1 : -1;			
				}, function(){ return this.parentNode; });
			//add highlighting to ordertool
			$('div.ordertool',this).addClass('active');
			$('td.title-ordertool',this).addClass('active');
			switch(inverse) {
				case true:
				$('a:first img',this).prop('src','/img/asc.gif');
				$('a:last img',this).prop('src','/img/desc-a.gif');
				break;
				case false:
				$('a:first img',this).prop('src','/img/asc-a.gif');
				$('a:last img',this).prop('src','/img/desc.gif');
				break;
				default:
				$('a:first img',this).prop('src','/img/asc.gif');
				$('a:last img',this).prop('src','/img/desc.gif');
				}
			inverse = !inverse;		
		
		
		});
		
		
		//hook the arrows to sorting function
		$('th#ve_pqr a:first').click(function(){inverse=false; sorter(this);});
		$('th#ve_pqr a:last').click(function(){inverse=true; sorter(this);});
		//Add the PQR values now
		$('table.list:nth(1) tbody > tr').each(function(index){
				if($(this).hasClass('odd')==true || $(this).hasClass('even')==true){
					var quality,price,qIndex,pIndex;
					var firstColumnSpan =  parseInt($('td:nth(1)',this).attr('colspan'));
					//if (isNaN(firstColumnSpan)) firstColumnSpan = 1;
					qIndex = 5; pIndex = 4;
					if(firstColumnSpan > 1) {	
						qIndex = qIndex - firstColumnSpan+1;
						pIndex = pIndex - firstColumnSpan+1;
						}
					quality = parseFloat($('td:nth('+qIndex+')',this).text());
					price = parseFloat($('td:nth('+pIndex+')',this).text().replace('$','').replace(/\s/g,''));
					
					$('<td align="right">'+(price/quality).toFixed(2)+'</td>').insertAfter($('td:last',this));
				}
			});
	}
	*/
	//Adds PQR ratio to the unit/shop supply page
	//Change the layout of the shop supply pages
	if ((new RegExp(urlRegEx["unitSupply"])).exec(url) != null && Settings.getOption('VE_UnitSupplyPage')=="true") {
		var QTable,stockTable,Q_req,Q_order,Q_pur,Q_deficit,Q_toOrder,
			stock_q,stock_p,stock_pqr, pTable, supplier_price_text,
			supplier_p, supplier_C, supplier_Q, supplier_q, supplier_pqr;
		var rowID,companyID;
		companyID = getPlayerInfo('companyID');
		productRows = $('table.list tr[id^=product_]');
		if(getUnitInfo('type')!='shop') {
			productRows.each(function(index){
				if($(this).attr('id').indexOf('product_row')>=0){
					QTable = $('table:nth(1)',this);
						Q_req = parseInt($('td:nth(1)',QTable).text().replace(/\s/g,''));
						Q_order = parseInt($('td:nth(3)',QTable).text().replace(/\s/g,''));
						Q_pur = parseInt($('td:nth(5)',QTable).text().replace(/\s/g,''));
						Q_toOrder = Q_req-Q_order;
						Q_deficit = Q_order-Q_pur;
					stockTable = $('table:nth(2)',this);
						stock_q = parseFloat($('td:nth(3)',stockTable).text());
						stock_p = parseFloat($('td:nth(5)',stockTable).text().replace('$','').replace(/\s/g,''));
						stock_pqr = (stock_p/stock_q).toFixed(2);
					//display PQR value for products in stock
					$('<tr><td style="white-space: nowrap;">PQR</td>'+
					'<td align="right" style="white-space: nowrap; color: green;">'+
					stock_pqr+'</td></tr>').insertAfter($('tr:last',stockTable));
					
					//display order balances
					$('<tr><td nowrap="nowrap">To Order</td>'+
					'<td align="right" style="white-space: nowrap; color: green;">'+
					Q_toOrder+'</td></tr>').insertAfter($('tr:last',QTable));
					$('<tr><td nowrap="nowrap">Deficit</td>'+
					'<td align="right" style="white-space: nowrap; color: green;">'+
					Q_deficit+'</td></tr>').insertAfter($('tr:last',QTable));
					
					//display estimate placeholders
					$('<tr><td nowrap="nowrap">Est. Quality</td>'+
					'<td id="ve_est_quality'+index+'" align="right" style="white-space: nowrap; color: green;">'+
					'0</td></tr>').insertAfter($('tr:last',stockTable));
					$('<tr><td nowrap="nowrap">Est. Cost</td>'+
					'<td id="ve_est_cost'+index+'" align="right" style="white-space: nowrap; color: green;">'+
					'0</td></tr>').insertAfter($('tr:last',stockTable));
					}
				//Add PQR Ratio to each supplier	
				priceCells = $('td[id*=totalPrice_]',this);
				priceCells.each(function(){
					pTable = $(this);
					supplier_price_text = $('td:nth(2)',pTable).text();
					if(supplier_price_text.indexOf('/')>0)
						supplier_price_text = supplier_price_text.split('/')[1];
					supplier_p =parseFloat(supplier_price_text.replace('$','').replace(/\s/g,''));
					//supplier_C =parseFloat($('td:nth(5)',pTable).text().replace('$','').replace(/\s/g,'')); 
					//supplier_Q =parseInt($('td[id^=quantityField_] input',this).attr('value')); 
					supplier_q =parseFloat($('td:nth(7)',pTable).text());
					supplier_pqr = (supplier_p/supplier_q).toFixed(2);
					$('<tr>'+
						'<td style="white-space: nowrap">PQR</td>'+
						'<td align="right" style="white-space: nowrap; color: green;">'
						+ supplier_pqr +'</td></tr>').insertAfter($('tr:last',pTable));
					$('td:nth(4)',pTable).prop('rowspan','4');//rowspan fix
					});
				//Add estimated cost and quality for unit supply page	
				$('td[id^=quantityField_] input',this).live('keyup',function(event){
					var productRowID = $(this).parent().attr('id').match(/_(\d+)_/)[1];
					var productSubRows = $('tr[id*='+productRowID+']');
					//console.log(productSubRows);
					priceCells = $('td[id*=totalPrice_]',this);
					var totalQ=0; var Qq = 0;var totalCost = 0;
					productSubRows.each(function(){
						pTable = $('td[id*=totalPrice_]',this);
						supplier_price_text = $('td:nth(2)',pTable).text();
						if(supplier_price_text.indexOf('/')>0)
							supplier_price_text = supplier_price_text.split('/')[1];
						supplier_p =parseFloat(supplier_price_text.replace('$','').replace(/\s/g,''));
						supplier_Q =parseInt($('td[id^=quantityField_] input',this).attr('value'));
						supplier_q =parseFloat($('td:nth(7)',pTable).text());
						Qq = Qq + supplier_Q*supplier_q;
						totalQ += supplier_Q;
						totalCost += supplier_Q*supplier_p;
						});
					var estQ = (Qq/totalQ).toFixed(2);
					$('td[id^=ve_est_quality]',$('tr[id^=product_row_'+productRowID+']')).html(estQ);
					$('td[id^=ve_est_cost]',$('tr[id^=product_row_'+productRowID+']')).html(FormatCurrency(totalCost));
					});
				//trigger the event once manually to add initial figures
				$('td[id^=quantityField_] input',this).trigger('keyup');
			});
			
		
		}
		else {
			//For the shop supply page
			//Fix the table headers for the new layout
			$('table.list tr:first th:nth(3)').remove();
			$('table.list tr:first th:nth(2)').attr('colspan',2);
			
			var supHeader = $('table.list tr:nth(1) th:first');
			supHeader.attr('colspan',4);
			supHeader.next().remove(); supHeader.next().remove(); supHeader.next().remove();
			
			productRows.each(function(index){
				if($(this).attr('id').indexOf('product_row')>=0){
						rowID = $(this).attr('id').match(/product_row_(.*)/)[1];
						stockTable = $('table:nth(1)',this);
						stock_q = parseFloat($('td:nth(3)',stockTable).text());
						stock_p = parseFloat($('td:nth(7)',stockTable).text().replace('$','').replace(/\s/g,''));
						stock_pqr = (stock_p/stock_q).toFixed(2);
						//display PQR value for products in stock
						$('td:nth(3)',stockTable).html('<span>'+stock_q+'</span><span style="color:green"> ('+stock_pqr+')</span>');
						/*
						$('<tr><td nowrap="nowrap">PQR</td>'+
						'<td align="right" style="white-space: nowrap; color: green;">'+
						stock_pqr+'</td></tr>').insertAfter($('tr:last',stockTable));*/
						
						//remove the purchase column and expand the order column
						var colOrder = stockTable.parent().next();
						var cT_rowspan = colOrder.attr('rowspan');
						var ordered_q = colOrder.html();
	
						var colPurchase = colOrder.next();
						var purchased_q = colPurchase.html();
						
						colPurchase.remove();
						colOrder.attr('colspan',2);
						//a custom order summary table
						var customTable = 
							'<table class="noborder" align="left"><tbody>'+
								'<tr><td style="min-width:50px">Order</td>'+
								'<td align="right" class="nowrap">'+ordered_q+'</td></tr>'+
								'<tr><td>Purch.</td>'+
								'<td align="right" class="nowrap">'+purchased_q+'</td></tr>'+
								'<tr><td>Est. Q/B</td>'+
								'<td id="ve_est_q_'+rowID+'" align="right" class="nowrap">'+'00.00'+'</td></tr>'+
								'<tr><td>Est. C</td>'+
								'<td id="ve_est_c_'+rowID+'" align="right" class="nowrap">'+'00.00'+'</td></tr>'+
								'<tr><td>Est. PC</td>'+
								'<td id="ve_est_cp_'+rowID+'" align="right" class="nowrap">'+'00.00'+'</td></tr>'+					
							'</tbody></table>';
						colOrder.html(customTable);		
					}
				else 
					{rowID = $(this).attr('id').match(/product_sub_row_(.*)/)[1];} 
				
				var supplier_name = $('td[id^=name_]',this);
				var quantityField = $('td[id^=quantityField_]',this);
				var constraint = $('td[id^=constraint_]',this);
				var contractConstraints =  $('td[id^=constraint_] > div',this);
				var minQual =  $('td[id^=constraint_] > input',this);
				var costField = $('td[id^=partyTotalPrice_]',this);
				var supplierCompanyID; //= $('td[id^=name_] div:first a:first',this).attr('href').match(/\d+/)[0];
				
				$('br',supplier_name).remove();
				$('br',constraint).remove();
				//$('br',quantityField).remove();
				//add css positioning to parent for moving message and cancel icons
				supplier_name.css('position','relative');
				//fix colspans
				quantityField.attr('colspan',1);
				constraint.attr('colspan',3);
				supplier_name.attr('colspan',4);
				
				//beautify name
				var companyImage = $('img.company_symbol',supplier_name);
				var isPort;
				if (companyImage.parent().hasClass('seaport')==true)
				{
					isPort = true;
					supplierCompanyID = '';	
				}
				else if (companyImage.next().is('strong')==true)
				{
					companyImage.next().css('margin','auto 5px auto auto');
					supplierCompanyID = companyID;		
				}
				else
				{ 
					companyImage.next().css('margin-right','5px');
					supplierCompanyID = companyImage.next().attr('href').match(/\d+/)[0];
				}
				
				$('span img',supplier_name).attr('align','top');
				$('div:first',supplier_name).attr('style','float:left;width:100%');
				
				//fix constraints div
				$('select.contractConstraintPriceRel',constraint).attr('style','width:60px');
				contractConstraints.attr('style','display:inline-block');
				//fix the location of the message and x icons
				if(!isPort) 
					{
						var msgIcon = $('span.mm_msg_ident',supplier_name);
						msgIcon.css({position:'absolute',top:0,right:'20px'});
						msgIcon.next().css({position:'absolute',top:0,right:0});
					}
				else
					{
						var cancelIcon = companyImage.next().next();
						cancelIcon.css({position:'absolute',top:0,right:0});
					}
				var constraint_mod = 
					contractConstraints[0].outerHTML +
					'<span style="display:inline-block; margin: 0 5px 0 5px;">Min Q </span>'+ 
					minQual[0].outerHTML;
				constraint.html(constraint_mod);
				constraint_mod = constraint[0].outerHTML;
				var supp_table = 
				'<td colspan="4" id="ve_supplier_'+rowID+'">'+
					'<table class="noborder" style="width:100%"><tbody>'+
						'<tr>'+ supplier_name[0].outerHTML +'</tr>'+
						'<tr><td>'+ 
							'<table class="noborder" style="width:100%"><tbody>'+
								'<tr>'+ 
									quantityField[0].outerHTML + 
									constraint_mod + 
								'</tr>'+
							'</tbody></table>'+
						'</td></tr>'+
					'</tbody></table>'+
				'</td>';
				$(supp_table).insertBefore(supplier_name);				
				
				supplier_name.remove();
				quantityField.remove();
				constraint.remove();
				costField.remove();
				
				//Add coloring border
				supp_table = $('td[id^=ve_supplier_]',this);
				
				if (supplierCompanyID == companyID) 
					{supp_table.css('border-left','solid 2px green');}
				else 
					{supp_table.css('border-left','solid 2px blue');}
				
				//Add PQR Ratio to each supplier	
				priceCells = $('td[id*=totalPrice_]',this);
				priceCells.each(function(){
					pTable = $(this);
					if($('tr:first').attr('style') == "background-color: lightyellow")
						supplier_price_text = $("tr:first span",this).text();
					else
						supplier_price_text = $('td:nth(1)',this).text();
					supplier_p =parseFloat(supplier_price_text.replace('$','').replace(/\s/g,''));
					supplier_q =parseFloat($('td[id^=quality_]',pTable).text());
					supplier_pqr = (supplier_p/supplier_q).toFixed(2);
					$('td[id^=quality_]',pTable).html('<span>'+supplier_q+'</span><span style="color:green;font-weight:90%;"> ('+supplier_pqr+')</span>');
					$('td[id^=quality_]',pTable).prev().css('min-width','50px');
					/*
					$('<tr>'+
						'<td style="white-space: nowrap">PQR</td>'+
						'<td align="right" style="white-space: nowrap; color: green;">'
						+ supplier_pqr +'</td></tr>').insertAfter($('tr:last',pTable));*/
				});
				
				//Add estimated cost and quality for shop supply page	
				$('td[id^=quantityField_] input',this).live('keyup',function(event){
					var productRowID = $(this).parent().attr('id').match(/quantityField_(.*)_/)[1];
					var productSubRows = $('tr[id*='+productRowID+']');
					//console.log(productSubRows);
					priceCells = $('td[id*=totalPrice_]',this);
					var totalQ=0; var Qq = 0; var Qb = 0;
					var totalCost = 0; var totalCostPerUnit = 0;
					productSubRows.each(function(){
						pTable = $('td[id*=totalPrice_]',this);
						supplier_price_text = $('td:nth(1)',pTable).text();
						if(supplier_price_text.indexOf('n.')>0)
							supplier_price_text = supplier_price_text.split('n.')[1];
						supplier_p =parseFloat(supplier_price_text.replace('$','').replace(/\s/g,''));
						supplier_Q =parseInt($('td[id^=quantityField_] input',this).attr('value'));
						supplier_q =parseFloat($('td:nth(3) span:first',pTable).text());
						supplier_b = parseFloat($('td:nth(5)',pTable).text());
						Qq = Qq + supplier_Q*supplier_q;
						Qb = Qb + supplier_Q*supplier_b;
						totalQ += supplier_Q;
						totalCost += supplier_Q*supplier_p;
						});
					var estQ = (Qq/totalQ).toFixed(2);
					var estB = (Qb/totalQ).toFixed(2);
					totalCostPerUnit = (totalCost/totalQ);
					$('td[id^=ve_est_q_]',$('tr[id^=product_row_'+productRowID+']')).html(estQ+'/'+estB);
					$('td[id^=ve_est_cp_]',$('tr[id^=product_row_'+productRowID+']')).html(FormatCurrency(totalCostPerUnit));
					$('td[id^=ve_est_c_]',$('tr[id^=product_row_'+productRowID+']')).html(FormatCurrency(totalCost));
					});
				
				//trigger the event once manually to add initial figures
				$('td[id^=quantityField_] input',this).trigger('keyup');
			
			
			});
		}
	}
	
	//Adds training link to company employee management
	if ((new RegExp(urlRegEx["companyEmployeeMgmnt"])).exec(url) != null && Settings.getOption('VE_MgmtEmployeeTrainingLink')=="true") {
		$('td:nth(2)',$('tr.odd,tr.even',$('table.list'))).each(function(){
			var link = $('a.list_sublink',this).clone();
			var linkHref = link.attr('href');
			link.prop('href',linkHref.replace('engage','education'));
			link.html('Training');
			link.insertAfter($('a.list_sublink',this));
		});
	}
	
	//Adds discount percentages to the unit purchase page
	if ((new RegExp(urlRegEx["unitMarket"])).exec(url) != null && Settings.getOption('VE_EnterpriseMarketDiscount')=="true"){
		var discountCell, discount, discount_pr, price, assets;
		$('table.list > tbody > tr').each(function(){
			if($(this).hasClass('even')==true || $(this).hasClass('odd')==true){
				discountCell = $('td:last',this);
				price = parseFloat(discountCell.prev().text().replace('$','').replace(/\s/g,''));
				assets = parseFloat(discountCell.prev().prev().text().replace('$','').replace(/\s/g,''));
				discount = parseFloat(discountCell.text().replace('$','').replace(/\s/g,''));
				if(discount < 0 )
				{
					discount_pr = ((price/assets-1)*100).toFixed(2);
					discountCell.html(discountCell.html()+
						'<span style="color:red" class="nowrap"> ('+discount_pr+'%)</span>');
				}
				else
				{
					discount_pr = ((1-price/assets)*100).toFixed(2);
					discountCell.html(discountCell.html()+
						'<span style="color:green" class="nowrap"> ('+discount_pr+'%)</span>');
				}
			}
		});
	
	}
	
	//Add todo/tasks management to units
	if ((new RegExp(urlRegEx["unitViewMain"])).exec(url) != null && Settings.getOption('VE_TODO')=="true") {
		var taskKey = 'task_'+getPlayerInfo('companyID')+'_'+getUnitInfo('id');
		//build the task popup dialog and add task links
		var addTaskPopup = $('<div id="ve_addTaskPopup" style="display:none; width:300px; height: 70px; border:2px solid black; background-color:white;">'
    					+	'<span id="popupTitle" style="position:absolute; top:2; left:2; padding-right:250px; background:lightgrey">Add Task</span>'
    					+	'<div id="popupContent" style="margin:25px auto auto 10px;">'
    					+	'</div></div>');
    	var aTP_btn_cancel = $('<a href="#" id="cancelPopup" style="position:absolute; top:0; right:2">X</a>');
    	var aTP_input_taskDesc = $('<input type="text" class="long" size="40" name="taskDesc" value="Enter Task Description here" />');
    	var aTP_btn_submitTask = $('<button name="btn_submitTask">Save</button>');
    	aTP_btn_submitTask.click(function(){
    		var curTasks = localStorage[taskKey];
    		var values 
    		if(curTasks == null)
    		{ 
    			values = new Array(); 
    			values.push($(this).prev().attr('value'));
    			localStorage[taskKey] = values.join("|");
    		}
    		else
    		{ 
    			values = localStorage[taskKey].split('|');
    			values.push($(this).prev().attr('value'));
    			localStorage[taskKey] = values.join('|');
    		}
    		//alert(taskKey + " " + localStorage[taskKey].toString());
    		updateTaskSummary();
    		HideModalPopup('ve_addTaskPopup'); return false;
    	});
    	aTP_btn_cancel.click(function(){HideModalPopup('ve_addTaskPopup'); return false;});
    	var addTaskLink = $('<div><a href="#" id="ve_addTaskLink" class="popup">Add Task</a></div>');
		addTaskLink.click(function(){ ShowModalPopup('ve_addTaskPopup'); return false; });
		addTaskPopup.appendTo(addTaskLink);
		addTaskLink.appendTo("div#unit_subtab");
		aTP_btn_cancel.appendTo('div#ve_addTaskPopup');
		aTP_input_taskDesc.appendTo('div#ve_addTaskPopup div#popupContent');
    	aTP_btn_submitTask.appendTo('div#ve_addTaskPopup div#popupContent');
    	
    	//display task summary
    	$('<tr><td colspan="2">'
    	+	'<div id="ve_taskSummary">'
    	+		'<table cellspacing="1" style="width:100%" class="list">'
    	+			'<tbody><tr><th colspan="3">Tasks</th></tr></tbody>'
    	+		'</table>'
    	+	'</div>'
    	+'</td></tr>').insertAfter('table.infoblock > tbody > tr:last');
    	
    	var updateTaskSummary = function(){
			$('div#ve_taskSummary > table > tbody tr:gt(0)').remove();
			var tasks = localStorage[taskKey];
			//console.log(taskKey,tasks);
			if (tasks != null && tasks !="") 
			{
				if(tasks.indexOf('|') == 0) tasks = tasks.replace('|','');
				tasks = tasks.split('|');
				tasks.forEach(function(item,i,arr){
					//debugger;
					var taskRow = $('<tr id="'+taskKey+'_'+i+'"></tr>');
					var taskCell = $('<td style="white-space: nowrap;">&#8594; ' 
									+ item +'</td>');
					var taskDoneLink = $('<a style="padding: 0 5px 0  5px;" href="#">&#8730;</a>');
					var taskCancelLink = $('<a  style="padding: 0 5px 0  5px;" href="#">X</a>');
					taskDoneLink.click(function(){
						var removeIndex = $(this).parent().attr('id').match(/_(\d+)$/)[1];
						tasks.splice(removeIndex,1);
						localStorage[taskKey] = tasks.join('|');
						updateTaskSummary();
					});
					taskCancelLink.click(function(){ taskDoneLink.trigger('click'); });
					taskRow.appendTo('div#ve_taskSummary > table > tbody');
					taskCell.appendTo(taskRow);
					taskDoneLink.wrap('<td align="right">').appendTo(taskRow);
					taskCancelLink.wrap('<td align="right">').appendTo(taskRow);
					
					
				});
			}
    	}
    	
    	updateTaskSummary();
	}
	//Display icon in unit_list if unit has tasks
	var parsedUrl = (new RegExp(urlRegEx["unitList"])).exec(url);
 	if (parsedUrl != null && Settings.getOption('VE_TODO')=="true"){
 		//debugger;
 		var unitRows = $('table.unit-list > tbody > tr:gt(0):not(.u-z)');
 		unitRows.each(function(){
 			var unitID = $('td:nth(2) a:first',this).attr('href').match(/\d+/)[0];
 			var companyID = getPlayerInfo('companyID');
 			var taskKey = 'task_'+companyID+'_'+unitID;
 			if(localStorage[taskKey]!=null && localStorage[taskKey]!="")
 				{
 					//console.log(taskKey);
 					$('td.u-e div:last',this).append(
 						'<img height="16" width="16" alt="hT" '
 						+'src="http://cdn.dustball.com/script_key.png" '
 						+'title="The unit has pending tasks"  />');
 				}
 		});
 	}

	///Thanks to XiozZe for the probability formulas
	var parsedUrl = (new RegExp(urlRegEx["unitViewSubPage"])).exec(url);
	if (parsedUrl != null && parsedUrl[3]=="investigation" && Settings.getOption('VE_LABINVEST')=="true"){
		//p=starting possibility 0-1
		//k=reference time
		//i=1=the amount of percentage points the chance increases each fail (always 1)
		var p, k, i = 1;
		var calcProduct = function(i,p,n){
			var value=1;
			for(var m=1; m<= n-1; m++){ value = value*(1-(1/100*i*(m-1)+p)); }
			return value;
		}
		var calcStudyTime = function(p,k,i){
			var value=0;
			for(var n=1;n<=(100*(1-p)/i);n++){
				value += k*n*(1/100*i*(n-1)+p)*calcProduct(i,p,n);
			}
			return value;
		}
		
		if(!$.isEmptyObject($('table.grid'))){
				$('<th>Avg Time</th>').appendTo('table.grid tr:first')
				$('table.grid tr').each(function(){
					if($(this).hasClass('even')==true || $(this).hasClass('odd')==true){
						var t = $('td:nth-child(3)', $(this));
						p = parseFloat(trimWhitespace(t.text()).replace('%',''))/100;
						t= t.next();
						k = parseFloat(t.text());
						avgtime = (p==1)?k.toFixed(2):calcStudyTime(p,k,i).toFixed(2);
						$('<td align="right" class="nowrap">'+avgtime+'</td>').insertAfter(t.next());
					}
				});
			}
	}

}

addJQuery(VirtonomicsEnhanced);