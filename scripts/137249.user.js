// ==UserScript==
// @name                WME to OS link
// @namespace           http://greasemonkey.chizzum.com
// @description         Integrates OS OpenData lookups into WME
// @include             https://*.waze.com/*editor*
// @include             https://editor-beta.waze.com/*
// @include		         http://visor.grafcan.es/visorweb/*
// @include		         http://www.ordnancesurvey.co.uk/opendata/viewer/*
// @grant               none
// @version             2.3
// ==/UserScript==

// Contains Ordnance Survey data Crown copyright and database right 2012
//
// Contents of the locatorData_*.js and gazetteer.js files are derived under the
// Open Government Licence from the OS Locator and 1:50 000 Scale Gazetteer datasets

var oslVersion = '2.3';

// include names that don't get abbreviated, so that for names such as "Somewhere Green Way", the
// abbreviation function is able to detect the "Way" part of the name as the part that ought to 
// be abbreviated, rather than treating it as a non-abbreviatable suffix and instead abbreviating
// the "Green" part instead...
var oslNameAbbreviations = new Array
(
   'Avenue','Ave',
   'Boulevard','Blvd',
   'Broadway','Bdwy',
   'Circus','Cir',
   'Close','Cl',
   'Court','Ct',
   'Crescent','Cr',
   'Drive','Dr',
   'Garden','Gdn',
   'Gardens','Gdns',
   'Green','Gn',
   'Grove','Gr',
   'Lane','Ln',
   'Mount','Mt',
   'Place','Pl',
   'Park','Pk',
   'Ridge','Rdg',
   'Road','Rd',
   'Square','Sq',
   'Street','St',
   'Terrace','Ter',
   'Valley','Val',
   'By-pass','Bypass',
   'Way','Way'
);

var oslCountyAbbreviations = new Array
(
   'AB','Aberdeenshire',
   'AG','Angus',
   'AN','Aberdeen',
   'AR','Argyll and Bute',
   'BA','Bradford',
   'BB','Blackburn with Darwen',
   'BC','Bracknell Forest',
   'BD','Barking and Dagenham',
   'BE','Bridgend',
   'BF','Beds',
   'BG','Bl Gwent',
   'BH','Brighton and Hove',
   'BI','Birmingham',
   'BK','Central Beds',
   'BL','Barnsley',
   'BM','Bucks',
   'BN','Barnet',
   'BO','Bolton',
   'BP','Blackpool',
   'BR','Bromley',
   'BS','Bath and NE Somerset',
   'BT','Brent',
   'BU','Bournemouth',
   'BX','Bexley',
   'BY','Bury',
   'BZ','Bristol',
   'CA','Calderdale',
   'CB','Cambs',
   'CC','Chester and W Cheshire',
   'CD','Cardiff',
   'CE','Ceredigion',
   'CF','Caerphilly',
   'CH','E Cheshire',
   'CL','Clackmannanshire',
   'CM','Camden',
   'CN','Cornwall',
   'CT','Carms',
   'CU','Cumbria',
   'CV','Coventry',
   'CW','Conwy',
   'CY','Croydon',
   'DB','Derby City',
   'DD','Dundee City',
   'DE','Denbighs',
   'DG','Dumfries and Galloway',
   'DL','Darlington',
   'DN','Devon',
   'DR','Doncaster',
   'DT','Dorset',
   'DU','Co Durham',
   'DY','Derby',
   'DZ','Dudley',
   'EA','E Ayrshire',
   'EB','Edinburgh',
   'ED','E Dunbartonshire',
   'EG','Ealing',
   'EL','E Lothian',
   'EN','Enfield',
   'ER','E Renfrewshire',
   'ES','E Sussex',
   'EX','Essex',
   'EY','E Yorks',
   'FA','Falkirk',
   'FF','Fife',
   'FL','Flints',
   'GH','Gateshead',
   'GL','Glasgow',
   'GR','Glos',
   'GW','Grenwich',
   'GY','Gwynedd',
   'HA','Halton',
   'HD','Herts',
   'HE','Hereford',
   'HF','Hammersmith and Fulham',
   'HG','Haringey',
   'HI','Hillingdon',
   'HL','Highland',
   'HN','Hackney',
   'HP','Hants',
   'HR','Harrow',
   'HS','Hounslow',
   'HT','Hartlepool',
   'HV','Havering',
   'IA','Anglesey',
   'IL','Islington',
   'IM','Isle of Man',
   'IN','Inverclyde',
   'IS','Scilly Isles',
   'IW','IOW',
   'KC','Kensington and Chelsea',
   'KG','Kingston Upon Thames',
   'KH','Kingston Upon Hull',
   'KL','Kirklees',
   'KN','Knowsley',
   'KT','Kent',
   'LA','Lancs',
   'LB','Lambeth',
   'LC','Leicester',
   'LD','Leeds',
   'LL','Lincs',
   'LN','Luton',
   'LO','London',
   'LP','Liverpool',
   'LS','Lewisham',
   'LT','Leics',
   'MA','Manchester',
   'MB','Middlesbrough',
   'ME','Medway',
   'MI','Midlothian',
   'MK','Milton Keynes',
   'MM','Monmths',
   'MO','Moray',
   'MR','Merton',
   'MT','Merthyr',
   'NA','N Ayrshire',
   'NC','NE Lincs',
   'ND','Northd',
   'NE','Newport',
   'NG','Nottingham',
   'NH','Newham',
   'NI','N Lincs',
   'NK','Norfolk',
   'NL','N Lanarkshire',
   'NN','Northants',
   'NP','Neath PT',
   'NR','N Tyneside',
   'NS','N Somerset',
   'NT','Notts',
   'NW','Newcastle Upon Tyne',
   'NY','N Yorks',
   'OH','Oldham',
   'OK','Orkney Islands',
   'ON','Oxon',
   'PB','Pembrks',
   'PE','Peterborough',
   'PK','Perth and Kinross',
   'PL','Poole',
   'PO','Portsmouth',
   'PW','Powys',
   'PY','Plymouth',
   'RB','Redbridge',
   'RC','Redcar and Cleveland',
   'RD','Rochdale',
   'RE','Renfrewshire',
   'RG','Reading',
   'RH','Rhonddha CT',
   'RL','Rutland',
   'RO','Rotherham',
   'RT','Richmond Upon Thames',
   'SA','Sandwell',
   'SB','Scottish Borders',
   'SC','Salford',
   'SD','Swindon',
   'SE','Sefton',
   'SF','Staffs',
   'SG','S Glos',
   'SH','Shrops',
   'SI','Shetland Islands',
   'SJ','Stoke-on-Trent',
   'SK','Suffolk',
   'SL','S Lanarkshire',
   'SM','Stockton on Tees',
   'SN','Saint Helens',
   'SO','Southampton',
   'SP','Sheffield',
   'SQ','Solihull',
   'SR','Stirling',
   'SS','Swansea',
   'ST','Somerset',
   'SU','Surrey',
   'SV','Sunderland',
   'SW','Southwark',
   'SX','S Ayrshire',
   'SY','S Tyneside',
   'SZ','Sutton',
   'TB','Torbay',
   'TF','Torfaen',
   'TH','Tower Hamlets',
   'TR','Trafford',
   'TS','Tameside',
   'TU','Thurrock',
   'VG','Vale of Glamorgan',
   'WA','Walsall',
   'WB','W Berks',
   'WC','Windsor and Maidenhead',
   'WD','W Dunbartonshire',
   'WE','Wakefield',
   'WF','Waltham Forest',
   'WG','Warrington',
   'WH','Wolverhampton',
   'WI','Western Isles',
   'WJ','Wokingham',
   'WK','Warks',
   'WL','W Lothian',
   'WM','Westminster',
   'WN','Wigan',
   'WO','Worcs',
   'WP','Telford and Wrekin',
   'WR','Wirral',
   'WS','W Sussex',
   'WT','Wilts',
   'WW','Wandsworth',
   'WX','Wrexham',
   'YK','York',
   'YS','Southend on Sea',
   'YT','Slough',
   'YY','Stockport'
);

var oslAdvancedMode = false;
var oslEvalString = '';
var oslLoadingMsg = false;
var oslMLCDiv;
var oslOSLDiv;
var oslBBDiv;
var oslMouseX = -1;
var oslMouseY = -1;
var oslPrevHighlighted = null;
var oslPrevMouseX = null;
var oslPrevMouseY = null;
var oslDivDragging = false;
var oslPrevSelected = null;
var oslDoOSLUpdate = false;
var oslMousepos = null;
var oslDoneOnload = false;
var oslRefreshAutoTrack = false;
var oslOSOD_url = '';
var oslOSMC_url = '';
var oslGdC_url = '';
var oslPrevStreetName = '';
var oslMergeGazData = false;
var oslOSLMaskLayer = null;
var oslOSLNameCheckTimer = 0;
var oslOSLNCSegments = new Array();
var oslInCanaries = false;
var oslInUK = false;

var oslNorthings;
var oslEastings;
var oslLatitude;
var oslLongitude;
var oslHelmX, oslHelmY, oslHelmZ;
var oslPi = 3.14159265358979;

var oslVPLeft = 0;
var oslVPRight = 0;
var oslVPBottom = 0;
var oslVPTop = 0;
var oslBBDivInnerHTML = '';

var oslEvalEBlock = 0;
var oslEvalNBlock = 0;
var oslBlockData;

var oslONC_E;
var oslONC_N;
var oslEBlock_min;
var oslEBlock_max;
var oslNBlock_min;
var oslNBlock_max;

var oslWazeBitsPresent = 0;



function oslBootstrap()
{
   var bGreasemonkeyServiceDefined = false;

   // the usual try...catch construct doesn't work on the grafcan.es site for some reason, so
   // we explicitly test for the presence of the Components object before trying to access it
   if(typeof Components != "undefined")
   {
      bGreasemonkeyServiceDefined = (typeof Components.interfaces.gmIGreasemonkeyService === "object");
   }

   if (typeof unsafeWindow === "undefined" || ! bGreasemonkeyServiceDefined) {
      unsafeWindow    = ( function () {
         var dummyElem = document.createElement('p');
         dummyElem.setAttribute('onclick', 'return window;');
         return dummyElem.onclick();
      }) ();
   }
   
   if(document.location.host == 'visor.grafcan.es')
   {
      cmtInitialise();
   }
   else if(document.location.host == 'www.ordnancesurvey.co.uk')
   {
      odfhInitialise();
   }
   else
   {
      oslInitialise();
   }
}

function oslAddLog(logtext)
{
   console.log('WMEOpenData: '+logtext);
}

//-----------------------------------------------------------------------------------------------------------------------------------------
// all code between here and the next ------------- marker line is a stripped down version of the original from Paul Dixon
//
// * GeoTools javascript coordinate transformations
// * http://files.dixo.net/geotools.html
// *
// * This file copyright (c)2005 Paul Dixon (paul@elphin.com)
// *
// * This program is free software; you can redistribute it and/or
// * modify it under the terms of the GNU General Public License
// * as published by the Free Software Foundation; either version 2
// * of the License, or (at your option) any later version.
// *
// * This program is distributed in the hope that it will be useful,
// * but WITHOUT ANY WARRANTY; without even the implied warranty of
// * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// * GNU General Public License for more details.
// *
// * You should have received a copy of the GNU General Public License
// * along with this program; if not, write to the Free Software
// * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
// *
// * ---------------------------------------------------------------------------
// *
// * Credits
// *
// * The algorithm used by the script for WGS84-OSGB36 conversions is derived
// * from an OSGB spreadsheet (www.gps.gov.uk) with permission. This has been
// * adapted into Perl by Ian Harris, and into PHP by Barry Hunter. Conversion
// * accuracy is in the order of 7m for 90% of Great Britain, and should be
// * be similar to the conversion made by a typical GPSr
// *
// * See accompanying documentation for more information
// * http://www.nearby.org.uk/tests/GeoTools2.html

function oslOSGBtoWGS(oseast, osnorth)
{
   var a = 6377563.396;
   var b = 6356256.910;
   var e0 = 400000;
   var n0 = -100000;
   var f0 = 0.999601272;
   var PHI0 = 49.00000;
   var LAM0 = -2.00000;

   var RadPHI0 = PHI0 * (oslPi / 180);
   var RadLAM0 = LAM0 * (oslPi / 180);

	//Compute af0, bf0, e squared (e2), n and Et
   var af0 = a * f0;
   var bf0 = b * f0;
   var e2 = (Math.pow(af0,2) - Math.pow(bf0,2)) / Math.pow(af0,2);
   var n = (af0 - bf0) / (af0 + bf0);
   var Et = oseast - e0;

	//Compute initial value for oslLatitude (PHId) in radians
  	var PHI1 = ((osnorth - n0) / af0) + RadPHI0;
   var M = oslMarc(bf0, n, RadPHI0, PHI1);
   var PHId = ((osnorth - n0 - M) / af0) + PHI1;
	while (Math.abs(osnorth - n0 - M) > 0.00001)
	{
      PHId = ((osnorth - n0 - M) / af0) + PHI1;
      M = oslMarc(bf0, n, RadPHI0, PHId);
      PHI1 = PHId;
	}

	//Compute nu, rho and eta2 using value for PHId
   var nu = af0 / (Math.sqrt(1 - (e2 * ( Math.pow(Math.sin(PHId),2)))));
   var rho = (nu * (1 - e2)) / (1 - (e2 * Math.pow(Math.sin(PHId),2)));
   var eta2 = (nu / rho) - 1;

	//Compute Latitude
   var VII = (Math.tan(PHId)) / (2 * rho * nu);
   var VIII = ((Math.tan(PHId)) / (24 * rho * Math.pow(nu,3))) * (5 + (3 * (Math.pow(Math.tan(PHId),2))) + eta2 - (9 * eta2 * (Math.pow(Math.tan(PHId),2))));
   var IX = ((Math.tan(PHId)) / (720 * rho * Math.pow(nu,5))) * (61 + (90 * ((Math.tan(PHId)) ^ 2)) + (45 * (Math.pow(Math.tan(PHId),4))));
   oslLatitude = (180 / oslPi) * (PHId - (Math.pow(Et,2) * VII) + (Math.pow(Et,4) * VIII) - ((Et ^ 6) * IX));
	
   //Compute Longitude
   var X = (Math.pow(Math.cos(PHId),-1)) / nu;
   var XI = ((Math.pow(Math.cos(PHId),-1)) / (6 * Math.pow(nu,3))) * ((nu / rho) + (2 * (Math.pow(Math.tan(PHId),2))));
   var XII = ((Math.pow(Math.cos(PHId),-1)) / (120 * Math.pow(nu,5))) * (5 + (28 * (Math.pow(Math.tan(PHId),2))) + (24 * (Math.pow(Math.tan(PHId),4))));
   var XIIA = ((Math.pow(Math.cos(PHId),-1)) / (5040 * Math.pow(nu,7))) * (61 + (662 * (Math.pow(Math.tan(PHId),2))) + (1320 * (Math.pow(Math.tan(PHId),4))) + (720 * (Math.pow(Math.tan(PHId),6))));
   oslLongitude = (180 / oslPi) * (RadLAM0 + (Et * X) - (Math.pow(Et,3) * XI) + (Math.pow(Et,5) * XII) - (Math.pow(Et,7) * XIIA));



   var RadPHI = oslLatitude * (oslPi / 180);
   var RadLAM = oslLongitude * (oslPi / 180);

   var e2 = (Math.pow(6377563.396,2) - Math.pow(6356256.910,2)) / Math.pow(6377563.396,2);
   var V = a / (Math.sqrt(1 - (e2 * (  Math.pow(Math.sin(RadPHI),2)))));

   var X = V * (Math.cos(RadPHI)) * (Math.cos(RadLAM));
   var Y = V * (Math.cos(RadPHI)) * (Math.sin(RadLAM));
   var Z = (V * (1 - e2)) * (Math.sin(RadPHI));

   // do Helmert transforms

	var sfactor = -20.4894 * 0.000001;
	var RadX_Rot = (0.1502 / 3600) * (oslPi / 180);
	var RadY_Rot = (0.2470 / 3600) * (oslPi / 180);
	var RadZ_Rot = (0.8421 / 3600) * (oslPi / 180);

   var X2 = (X + (X * sfactor) - (Y * RadZ_Rot) + (Z * RadY_Rot) + 446.448);
	var Y2 = (X * RadZ_Rot) + Y + (Y * sfactor) - (Z * RadX_Rot) -125.157;
   var Z2 = (-1 * X * RadY_Rot) + (Y * RadX_Rot) + Z + (Z * sfactor) + 542.060;

   var RootXYSqr = Math.sqrt(Math.pow(X2,2) + Math.pow(Y2,2));
   e2 = (Math.pow(6378137.000,2) - Math.pow(6356752.313,2)) / Math.pow(6378137.000,2);
   var PHI1 = Math.atan2(Z2 , (RootXYSqr * (1 - e2)) );

   var V = 6378137.000 / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(PHI1),2))));
   var PHI2 = Math.atan2((Z + (e2 * V * (Math.sin(PHI1)))) , RootXYSqr);
   while (Math.abs(PHI1 - PHI2) > 0.000000001) 
   {
      PHI1 = PHI2;
      V = 6378137.000 / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(PHI1),2))));
      PHI2 = Math.atan2((Z2 + (e2 * V * (Math.sin(PHI1)))) , RootXYSqr);
   }
   oslLatitude = PHI2 * (180 / oslPi);
   oslLongitude = Math.atan2(Y2 , X2) * (180 / oslPi);
}

function oslWGStoOSGB()
{
	oslLatLontoHelmXYZ();
   var oslLatitude2  = oslXYZtoLat();
	var oslLongitude2 = Math.atan2(oslHelmY , oslHelmX) * (180 / oslPi);
	oslLatLonoslToOSGrid(oslLatitude2,oslLongitude2);
}

function oslLatLontoHelmXYZ()
{
   var a = 6378137.0;
   var b = 6356752.313;
   var DX = -446.448;
   var DY = 125.157;
   var DZ = -542.060;
   var rotX = -0.1502;
   var rotY = -0.2470;
   var rotZ = -0.8421;
	var sfactor = 20.4894 * 0.000001;

   // perform initial lat-lon to cartesian coordinate translation
   var RadPHI = oslLatitude * (oslPi / 180);
   var RadLAM = oslLongitude * (oslPi / 180);
   var e2 = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);
   var V = a / (Math.sqrt(1 - (e2 * (  Math.pow(Math.sin(RadPHI),2)))));
   var cartX = V * (Math.cos(RadPHI)) * (Math.cos(RadLAM));
   var cartY = V * (Math.cos(RadPHI)) * (Math.sin(RadLAM));
   var cartZ = (V * (1 - e2)) * (Math.sin(RadPHI));

   // Compute Helmert transformed coordinates
	var RadX_Rot = (rotX / 3600) * (oslPi / 180);
	var RadY_Rot = (rotY / 3600) * (oslPi / 180);
	var RadZ_Rot = (rotZ / 3600) * (oslPi / 180);
   oslHelmX = (cartX + (cartX * sfactor) - (cartY * RadZ_Rot) + (cartZ * RadY_Rot) + DX);
	oslHelmY = (cartX * RadZ_Rot) + cartY + (cartY * sfactor) - (cartZ * RadX_Rot) + DY;
	oslHelmZ = (-1 * cartX * RadY_Rot) + (cartY * RadX_Rot) + cartZ + (cartZ * sfactor) + DZ;
}

function oslXYZtoLat()
{
   var a = 6377563.396;
   var b = 6356256.910;
   var RootXYSqr = Math.sqrt(Math.pow(oslHelmX,2) + Math.pow(oslHelmY,2));
   var e2 = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);
   var PHI1 = Math.atan2(oslHelmZ , (RootXYSqr * (1 - e2)) );
   var PHI = oslIterateOSLXYZtoLat(a, e2, PHI1, oslHelmZ, RootXYSqr);
   return PHI * (180 / oslPi);
}

function oslIterateOSLXYZtoLat(a, e2, PHI1, Z, RootXYSqr)
{
   var V = a / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(PHI1),2))));
   var PHI2 = Math.atan2((Z + (e2 * V * (Math.sin(PHI1)))) , RootXYSqr);
   while (Math.abs(PHI1 - PHI2) > 0.000000001)
   {
      PHI1 = PHI2;
      V = a / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(PHI1),2))));
      PHI2 = Math.atan2((Z + (e2 * V * (Math.sin(PHI1)))) , RootXYSqr);
   }
   return PHI2;
}

function oslMarc(bf0, n, PHI0, PHI)
{
   return bf0 * (((1 + n + ((5 / 4) * Math.pow(n,2)) + ((5 / 4) * Math.pow(n,3))) * (PHI - PHI0)) - (((3 * n) + (3 * Math.pow(n,2)) +
          ((21 / 8) * Math.pow(n,3))) * (Math.sin(PHI - PHI0)) * (Math.cos(PHI + PHI0))) + ((((15 / 8) * Math.pow(n,2)) + ((15 / 8) *
          Math.pow(n,3))) * (Math.sin(2 * (PHI - PHI0))) * (Math.cos(2 * (PHI + PHI0)))) - (((35 / 24) * Math.pow(n,3)) *
          (Math.sin(3 * (PHI - PHI0))) * (Math.cos(3 * (PHI + PHI0)))));
}

function oslLatLonoslToOSGrid(PHI, LAM)
{
   var a = 6377563.396;
   var b = 6356256.910;
   var e0 = 400000;
   var n0 = -100000;
   var f0 = 0.999601272;
   var PHI0 = 49.00000;
   var LAM0 = -2.00000;

   var RadPHI = PHI * (oslPi / 180);
   var RadLAM = LAM * (oslPi / 180);
   var RadPHI0 = PHI0 * (oslPi / 180);
   var RadLAM0 = LAM0 * (oslPi / 180);
   var af0 = a * f0;
   var bf0 = b * f0;
   var e2 = (Math.pow(af0,2) - Math.pow(bf0,2)) / Math.pow(af0,2);
   var n = (af0 - bf0) / (af0 + bf0);
   var nu = af0 / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(RadPHI),2) )));
   var rho = (nu * (1 - e2)) / (1 - (e2 * Math.pow(Math.sin(RadPHI),2) ));
   var eta2 = (nu / rho) - 1;
   var p = RadLAM - RadLAM0;
   var M = oslMarc(bf0, n, RadPHI0, RadPHI);
   var I = M + n0;
   var II = (nu / 2) * (Math.sin(RadPHI)) * (Math.cos(RadPHI));
   var III = ((nu / 24) * (Math.sin(RadPHI)) * (Math.pow(Math.cos(RadPHI),3))) * (5 - (Math.pow(Math.tan(RadPHI),2)) + (9 * eta2));
   var IIIA = ((nu / 720) * (Math.sin(RadPHI)) * (Math.pow(Math.cos(RadPHI),5))) * (61 - (58 * (Math.pow(Math.tan(RadPHI),2))) + (Math.pow(Math.tan(RadPHI),4)));
   var IV = nu * (Math.cos(RadPHI));
   var V = (nu / 6) * ( Math.pow(Math.cos(RadPHI),3)) * ((nu / rho) - (Math.pow(Math.tan(RadPHI),2)));
   var VI = (nu / 120) * (Math.pow(Math.cos(RadPHI),5)) * (5 - (18 * (Math.pow(Math.tan(RadPHI),2))) + (Math.pow(Math.tan(RadPHI),4)) + (14 * eta2) - (58 * (Math.pow(Math.tan(RadPHI),2)) * eta2));
   oslEastings = Math.round(e0 + (p * IV) + (Math.pow(p,3) * V) + (Math.pow(p,5) * VI));
   oslNorthings = Math.round(I + (Math.pow(p,2) * II) + (Math.pow(p,4) * III) + (Math.pow(p,6) * IIIA));
}
//-----------------------------------------------------------------------------------------------------------------------------------------

function oslCaseCorrect(wrongcase)
{
   var loop;
   var correctedCase = '';
   for(loop=0;loop<wrongcase.length;loop++)
   {
      // capitalise first letter following one of these substrings
      if
      (
         (loop == 0)||
         (wrongcase[loop-1] == ' ')||
         (wrongcase[loop-1] == '(')||
         (wrongcase.substr(loop-3,3) == '-Y-')||
         (wrongcase.substr(loop-4,4) == '-YR-')
      ) correctedCase += wrongcase[loop].toUpperCase();
      else correctedCase += wrongcase[loop].toLowerCase();
   }
   // recapitalise any roman numerals
   correctedCase = correctedCase.replace(' Ii ',' II ');
   correctedCase = correctedCase.replace(' Iii ',' III ');
   correctedCase = correctedCase.replace(' Iv ',' IV ');
   correctedCase = correctedCase.replace(' Vi ',' VI ');
   correctedCase = correctedCase.replace(' Vii ',' VII ');
   return correctedCase;
}


function oslWazeifyStreetName(oslName, debugOutput)
{
   var wazeName = '';
   var loop;
   var thePrefix = false;

   wazeName = oslCaseCorrect(oslName);

   if(wazeName.indexOf('St ') == 0) wazeName = 'St. '+wazeName.substr(3);
   if(wazeName.indexOf('Saint ') == 0) wazeName = 'St. '+wazeName.substr(6);
   
   var nameoslPieces = wazeName.split(' ');
   if(nameoslPieces.length > 1)
   {
      var dirSuffix = '';
      var namePrefix = '';
      if((nameoslPieces[nameoslPieces.length-1] == 'North')||(nameoslPieces[nameoslPieces.length-1] == 'South')||(nameoslPieces[nameoslPieces.length-1] == 'East')||(nameoslPieces[nameoslPieces.length-1] == 'West'))
      {
         dirSuffix = ' ' + nameoslPieces[nameoslPieces.length-1][0];
         for(loop=0;loop<nameoslPieces.length-1;loop++) namePrefix += (nameoslPieces[loop] + ' ');
      }
      else
      {
         for(loop=0;loop<nameoslPieces.length;loop++) namePrefix += (nameoslPieces[loop] + ' ');

      }
      namePrefix = namePrefix.trimRight(1);                                                                                

      if(debugOutput == true) console.log(oslName);
      // replace road type with abbreviated form
      for(pass=0;pass<2;pass++)
      {
         for(loop=0;loop<oslNameAbbreviations.length;loop+=2)
         {
            var abbrPos = namePrefix.lastIndexOf(oslNameAbbreviations[loop]);
            var abbrLen = oslNameAbbreviations[loop].length;
            var npLength = namePrefix.length;
            var npRemaining = npLength - abbrPos;            
            if(debugOutput == true) console.log(pass,' ',oslNameAbbreviations[loop],' ',abbrPos,' ',abbrLen,' ',npLength,' ',npRemaining);
            if(abbrPos != -1)
            {                 
               // make sure the road type we've found comes firstly at the end of the name string, or is suffixed with a space
               // if there's a non-road type at the end of the string (e.g. High Road Eastcote)
               // isn't, then we've actually found a type match within a longer string segment (e.g. The Parkside) and so we
               // should leave it alone...
               if
               (
                  ((pass == 0) && (npRemaining == abbrLen)) ||
                  ((pass == 1) && (namePrefix[abbrPos+abbrLen] == ' '))
               )
               {
                  preName = namePrefix.substr(0,abbrPos);
                  if((preName.length >= 4) && (preName.lastIndexOf("The") != (preName.length - 4)))
                  {
                     theName = namePrefix.substr(abbrPos);
                     theName = theName.replace(oslNameAbbreviations[loop],oslNameAbbreviations[loop+1]);
                     wazeName = preName + theName + dirSuffix;                    
                     return wazeName;
                  }   
               }
            }
         }
      }
      wazeName = namePrefix + dirSuffix;
   }
   return wazeName;
}


function oslCPDistance(cpE, cpN, posE, posN)
{
   return Math.round(Math.sqrt(((posE - cpE) * (posE - cpE)) + ((posN - cpN) * (posN - cpN))));
}


function oslMaskTest()
{
   if(oslOSLMaskLayer == null)
   {
      oslAddLog('mask layer not found');
      return true;
   }
   if(oslOSLMaskLayer.innerHTML.indexOf('fill="black"') != -1)
   {
      oslAddLog('mask layer active');
      return true;
   }
   return false;
}


function oslVisualiseBoundingBox(boxW, boxE, boxS, boxN, mode)
{
   if(oslOSLDiv.style.height == '0px')
   {
      oslBBDiv.innerHTML = '';
      return;
   }


   if((mode == 1) || (mode == 2))
   {
      oslOSGBtoWGS(boxW,boxS);
      var lonlat_sw = new OpenLayers.LonLat(oslLongitude,oslLatitude);
      oslOSGBtoWGS(boxE,boxS);
      var lonlat_se = new OpenLayers.LonLat(oslLongitude,oslLatitude);
      oslOSGBtoWGS(boxW,boxN);
      var lonlat_nw = new OpenLayers.LonLat(oslLongitude,oslLatitude);
      oslOSGBtoWGS(boxE,boxN);
      var lonlat_ne = new OpenLayers.LonLat(oslLongitude,oslLatitude);

      lonlat_sw.transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));
      lonlat_se.transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));
      lonlat_nw.transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));
      lonlat_ne.transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));

      var pix_sw = wazeMap.getPixelFromLonLat(lonlat_sw);
      var pix_se = wazeMap.getPixelFromLonLat(lonlat_se);
      var pix_ne = wazeMap.getPixelFromLonLat(lonlat_ne);
      var pix_nw = wazeMap.getPixelFromLonLat(lonlat_nw);
      
      var boxE = (pix_ne.x + pix_se.x) / 2;
      var boxW = (pix_nw.x + pix_sw.x) / 2;
      var boxN = (pix_ne.y + pix_nw.y) / 2;
      var boxS = (pix_se.y + pix_sw.y) / 2;

      var boxToleranceWidth = ((boxE - boxW) * 0.05);
      var boxToleranceHeight = ((boxS - boxN) * 0.05);

      boxW -= boxToleranceWidth;
      boxE += boxToleranceWidth;
      boxS += boxToleranceHeight;
      boxN -= boxToleranceHeight;

      boxE = Math.round(boxE);
      boxW = Math.round(boxW);
      boxS = Math.round(boxS);
      boxN = Math.round(boxN);

      // extend width/height of box if the calculated dimension is too small for the box to be readily visible
      if(boxE-boxW < 20)
      {
         boxE += 10;
         boxW -= 10;
      }
      if(boxS-boxN < 20)
      {
         boxS += 10;
         boxN -= 10;
      }
   }

   if(mode == 0)
   {
      oslBBDivInnerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="'+document.getElementById('WazeMap').offsetWidth+'px" height="'+document.getElementById('WazeMap').offsetHeight+'px" version="1.1">';
   }
   else if(mode == 1)
   {
      oslBBDivInnerHTML += '<rect x="'+boxW+'" y="'+boxN+'" width="'+(boxE-boxW)+'" height="'+(boxS-boxN)+'" style="fill:yellow;stroke:pink;stroke-width:4;fill-opacity:0.25;stroke-opacity:0.25"/>';
   }
   else if(mode == 2)
   {
      oslBBDivInnerHTML += '<rect x="'+boxW+'" y="'+boxN+'" width="'+(boxE-boxW)+'" height="'+(boxS-boxN)+'" style="fill:lightgrey;stroke:grey;stroke-width:4;fill-opacity:0.25;stroke-opacity:0.25"/>';
   }
   else if(mode == 3)
   {
      oslBBDivInnerHTML += '</svg>';
      oslBBDiv.innerHTML = oslBBDivInnerHTML;
   }
}


function oslMergeGazetteerData()
{
   if((typeof(unsafeWindow.gazetteerDataA) == "undefined") || (typeof(unsafeWindow.gazetteerDataB) == "undefined")) return false;
   if(oslMergeGazData)
   {
      gazetteerData = unsafeWindow.gazetteerDataA;
      gazetteerData = gazetteerData.concat(unsafeWindow.gazetteerDataB);
      oslMergeGazData = false;
      oslAddLog('gazetteer data loaded, '+gazetteerData.length+' entries');
   }
   return true;
}


function oslGetNearbyCityNames()
{
   if(oslMergeGazetteerData() == false) return;

   names = new Array();
   for(var idx=0;idx<gazetteerData.length;idx++)
   {
      gazElements = gazetteerData[idx].split(':');
      var cnNorthings = (gazElements[1] * 1000) + 500;
      var cnEastings = (gazElements[2] * 1000) + 500;
      if((Math.abs(cnNorthings-oslNorthings) <= 5000)&&(Math.abs(cnEastings-oslEastings) <= 5000))
      {
         dist = oslCPDistance(cnEastings,cnNorthings,oslEastings,oslNorthings);
         if(dist <= 5000)
         {
            names.push((dist * 1000000) + idx);
         }
      }
   }
   if(names.length > 1) names.sort(function(a,b){return a-b});
   
   var cityInTopTen = false;
   var matchedOSName = false;
   var matchedIdx = -1;
   var listLength = names.length;
   if(listLength > 10) listLength = 10;

   oOCN = document.getElementById('oslOSCityNames');
   for(idx=0;idx<listLength;idx++)
   {
      gElements = gazetteerData[names[idx] % 1000000].split(':');
      gDist = (Math.round(names[idx] / 100000000)/10);

      // Build namestring for entry in the drop-down list - start with the placename :-)
      var listOpt = document.createElement('option');
      listOpt.text = gElements[0];

      // if the name is neither a city nor unique, append a (county) suffix
      if(gElements[4] == 'C') cityInTopTen = true;
      else
      {
         if(oslCheckCityNameDuplicates(gElements[0],1) > 1)
         {
            countyIdx = oslCountyAbbreviations.indexOf(gElements[3]);
            if(countyIdx != -1)
            {
               listOpt.text += ' ('+oslCountyAbbreviations[countyIdx+1]+')';
            }
         }
      }

      if(sessionStorage.cityNameRB == 'optUseOS')
      {
         if(listOpt.text == sessionStorage.myCity)
         {
            matchedOSName = true;
            matchedIdx = idx;
         }
      }

      // Add place type and distance in [] brackets to allow easy removal later...
      if(gElements[4] == 'C') listOpt.text += ' [City, ';
      else if(gElements[4] == 'T') listOpt.text += ' [Town, ';
      else listOpt.text += ' [Other, ';
      listOpt.text += gDist + 'km]';
      oOCN.add(listOpt,null);
   }

   if((!cityInTopTen) && (names.length > 10))
   {
      idx = 10;
      while((idx < names.length) && (!cityInTopTen))
      {
         gElements = gazetteerData[names[idx] % 1000000].split(':');
         if(gElements[4] == 'C')
         {
            cityInTopTen = true;
            gDist = ' [City, '+(Math.round(names[idx] / 100000000)/10)+'km]';
            var listOpt = document.createElement('option');
            listOpt.text = gElements[0]+gDist;
            oOCN.add(listOpt,null);
            if(sessionStorage.cityNameRB == 'optUseOS')
            {             
               if(gElements[0] == sessionStorage.myCity)
               {
                  matchedOSName = true;
                  matchedIdx = 10;
                  break;
               }
            }
         }
         idx++;
      }
   }

   if(matchedOSName == true) oOCN.options.selectedIndex = matchedIdx;

   if((sessionStorage.cityNameRB == 'optUseOS') && (matchedOSName == false))
   {
      oslAddLog('Selected city name no longer in nearby OS list...');
      alert('City name no longer present in nearby OS data, please reselect');
      sessionStorage.cityNameRB = 'optUseExisting';
      document.getElementById('optUseExisting').checked = true;
   }
}


function oslCheckCityNameDuplicates(cityName, mode)
{
   if(oslMergeGazetteerData() == false) return;

   var cnCount = 0;
   var searchDist = Math.round(gazetteerData.length/2);
   var searchIdx = searchDist;
   var hasCounty = false;
   
   var debugOutput = false;


   // remove county suffix if present
   if(cityName.indexOf('(') != -1)
   {
      cityName = cityName.substr(0,cityName.indexOf('('));
      cityName = cityName.replace(/^\s+|\s+$/g, "");
      hasCounty = true;
   }

   cityName = cityName.toLowerCase();
   cityName = cityName.replace(/-/g, ' ');
   gazName = '';

   if(debugOutput == true) console.log('scan for duplicates of '+cityName);

   while((searchDist > 1) && (cityName.localeCompare(gazName) != 0))
   {
      searchDist = Math.round(searchDist/2);
      gazElements = gazetteerData[searchIdx].split(':');
      gazName = gazElements[0].toLowerCase();
      gazName = gazName.replace(/-/g, ' ');
      if(debugOutput == true) console.log('a: '+searchDist+' '+searchIdx+' '+gazName);
      if(cityName.localeCompare(gazName) > 0) searchIdx += searchDist;
      else if(cityName.localeCompare(gazName) < 0) searchIdx -= searchDist;
      if(searchIdx >= gazetteerData.length) searchIdx = gazetteerData.length-1;
      if(searchIdx < 0) searchIdx = 0;
   }
   gazElements = gazetteerData[searchIdx].split(':');
   gazName = gazElements[0].toLowerCase();
   gazName = gazName.replace(/-/g, ' ');
   while((searchIdx > 0) && (cityName.localeCompare(gazName) <= 0))
   {
      gazElements = gazetteerData[--searchIdx].split(':');
      gazName = gazElements[0].toLowerCase();
      gazName = gazName.replace(/-/g, ' ');
      if(debugOutput == true) console.log('b: '+(searchIdx)+' '+gazName);
   }
   gazElements = gazetteerData[searchIdx].split(':');
   gazName = gazElements[0].toLowerCase();
   gazName = gazName.replace(/-/g, ' ');
   while((searchIdx < gazetteerData.length) && (cityName.localeCompare(gazName) > 0))
   {
      gazElements = gazetteerData[++searchIdx].split(':');
      gazName = gazElements[0].toLowerCase();
      gazName = gazName.replace(/-/g, ' ');
      if(debugOutput == true) console.log('c: '+(searchIdx)+' '+gazName);
   }
   while((cityName.localeCompare(gazName) == 0) && (searchIdx < gazetteerData.length))
   {
      cnCount++;
      gazElements = gazetteerData[++searchIdx].split(':');
      gazName = gazElements[0].toLowerCase();
      gazName = gazName.replace(/-/g, ' ');
      if(debugOutput == true) console.log('d: '+(searchIdx)+' '+gazName+' '+cnCount);
   }

   if(mode == 0)
   {
      var newHTML = '';
      if(cnCount == 0) newHTML = '&nbsp;&nbsp;Place name is not in OS data';
      else if(cnCount == 1)
      {
         newHTML = '&nbsp;&nbsp;Place name is unique';
         if(hasCounty) newHTML += '<br>&nbsp;&nbsp;<i>(County) suffix not required</i>';
      }
      else
      {
         newHTML = '&nbsp;&nbsp;Place name is not unique';
      }
      document.getElementById('oslCNInfo').innerHTML = newHTML;
   }
   else return cnCount;
}


function oslRadioClick()
{
   var oslElements = document.getElementById('oslOSLDiv');
   var selectedName = '';

   for(var loop=0;loop<oslElements.childNodes.length;loop++)
   {
      if(oslElements.childNodes[loop].nodeType == 1)
      {
         tagname = oslElements.childNodes[loop].tagName;
         if(tagname != null)
         {
            if(tagname == "LABEL")
            {
               if(oslElements.childNodes[loop].childNodes[0].checked)
               {
                  attr = oslElements.childNodes[loop].childNodes[0].attributes.getNamedItem("id").value;
                  if(attr.indexOf('oslID_') == 0)
                  {
                     var roadData = '';
                     oslID = attr.split('_');
                     if(oslID[1] != 'null')
                     {
                        evalstr = 'var roadData = unsafeWindow.locatorData_'+oslID[1]+'_'+oslID[2]+'['+oslID[3]+']';
                        eval(evalstr);
                     }
                     else
                     {
                        roadData = "null:null";
                     }
                     var locatorElements = roadData.split(":");
                     if(locatorElements[0] != 'null')
                     {
                        selectedName = locatorElements[0]+locatorElements[1];
                        oslVisualiseBoundingBox(0,0,0,0,0);
                        oslVisualiseBoundingBox(locatorElements[4],locatorElements[5],locatorElements[6],locatorElements[7],1)
                     }
                     else
                     {
                        oslBBDiv.innerHTML = '';
                     }
                  }
               }
            }
         }
      }
   }

   if(selectedName == '')
   {
      oslBBDiv.innerHTML = '';
      return;
   }

   for(var loop=0;loop<oslElements.childNodes.length;loop++)
   {
      if(oslElements.childNodes[loop].nodeType == 1)
      {
         tagname = oslElements.childNodes[loop].tagName;
         if(tagname != null)
         {
            if(tagname == "LABEL")
            {
               if(!oslElements.childNodes[loop].childNodes[0].checked)
               {
                  attr = oslElements.childNodes[loop].childNodes[0].attributes.getNamedItem("id").value;
                  if(attr.indexOf('oslID_') == 0)
                  {
                     var roadData = '';
                     oslID = attr.split('_');
                     if(oslID[1] != 'null')
                     {
                        evalstr = 'var roadData = unsafeWindow.locatorData_'+oslID[1]+'_'+oslID[2]+'['+oslID[3]+']';
                        eval(evalstr);
                     }
                     else
                     {
                        roadData = "null:null";
                     }
                     var locatorElements = roadData.split(":");
                     if(locatorElements[0] != 'null')
                     {
                        isSameName = locatorElements[0]+locatorElements[1];
                        if(isSameName == selectedName)
                        {
                           oslVisualiseBoundingBox(locatorElements[4],locatorElements[5],locatorElements[6],locatorElements[7],2);
                        }
                     }
                  }
               }
            }
         }
      }
   }
   oslVisualiseBoundingBox(0,0,0,0,3);
}


function oslClick()
{
   var cityName = '';
   var usingNewName = false;
   if(document.getElementById('optUseNewManual').checked)
   {
      cityName = oslCaseCorrect(document.getElementById('myCityName').value);
      usingNewName = true;
   }
   else if(document.getElementById('optUseExistingWME').checked)
   {
      oWCN = document.getElementById('oslWMECityNames');
      cityName = oWCN.options[oWCN.options.selectedIndex].text;
      usingNewName = true;
   }
   else if(document.getElementById('optUseOS').checked)
   {
      oOCN = document.getElementById('oslOSCityNames');
      cityName = oOCN.options[oOCN.options.selectedIndex].text;
      cityName = cityName.substring(0,cityName.indexOf('[')-1);
      usingNewName = true;
   }
   if(sessionStorage.myCity == '')
   {
      oslAddLog('Update city name position at '+oslEastings+'x'+oslNorthings);
      sessionStorage.cityChangeEastings = oslEastings;
      sessionStorage.cityChangeNorthings = oslNorthings;
   }
   sessionStorage.myCity = cityName;

   var useName = false;
   if((cityName.length > 0) && usingNewName)
   {
      oslCheckCityNameDuplicates(cityName,0);

      if(cityName != sessionStorage.prevCityName)
      {
         oslAddLog('Change of city name at '+oslEastings+'x'+oslNorthings);
         sessionStorage.cityChangeEastings = oslEastings;
         sessionStorage.cityChangeNorthings = oslNorthings;
         sessionStorage.prevCityName = cityName;
         useName = true;
      }
      else
      {
         var nameChangeDist = oslCPDistance(oslEastings,oslNorthings,sessionStorage.cityChangeEastings,sessionStorage.cityChangeNorthings);
         oslAddLog('Current name was set '+nameChangeDist+'m away from segment location');
         var useName = false;
         if(nameChangeDist > 1000)
         {
            oslAddLog('Distance exceeds 1km threshold, name verification required...');
            if(confirm('Confirm continued use of this city name'))
            {
               oslAddLog('Confirm city name at '+oslEastings+'x'+oslNorthings);
               sessionStorage.cityChangeEastings = oslEastings;
               sessionStorage.cityChangeNorthings = oslNorthings;
               useName = true;
            }
            else
            {
               useName = false;
            }
         }
         else
         {
            useName = true;
         }
      }
   }

   var oslElements = document.getElementById('oslOSLDiv');
   for(var loop=0;loop<oslElements.childNodes.length;loop++)
   {
      if(oslElements.childNodes[loop].nodeType == 1)
      {
         tagname = oslElements.childNodes[loop].tagName;
         if(tagname != null)
         {
            if(tagname == "LABEL")
            {
               rbElement = oslElements.childNodes[loop].childNodes[0];
               if(rbElement.checked)
               {
                  attr = rbElement.attributes.getNamedItem("id").value;
                  if(attr.indexOf('oslID_') == 0)
                  {
                     var roadData = '';
                     oslID = attr.split('_');
                     if(oslID[1] != 'null')
                     {
                        evalstr = 'var roadData = unsafeWindow.locatorData_'+oslID[1]+'_'+oslID[2]+'['+oslID[3]+']';
                        eval(evalstr);
                     }
                     else
                     {
                        roadData = ":";
                     }
                     var locatorElements = roadData.split(":");

                     // auto-click the Edit Address link...
                     var editAddress = document.getElementById('segment-edit-general');
                     var editButtons = editAddress.getElementsByClassName('address-edit-btn');

                     editButtons[0].click();

                     // set Country to "United Kingdom" and State to "Other" if they aren't already set to something
                     var snelms = document.getElementsByName('countryID');
                     if(snelms[0].value != 234) snelms[0].value = 234;
                     snelms = document.getElementsByName('stateID');
                     if(snelms[0].value != 99) snelms[0].value = 99;

                     // fill in the City field
                     snelms = document.getElementsByName('cityName');
                     if(usingNewName)
                     {
                        if(document.getElementById('optUseNewManual').checked == true)
                        {
                           sessionStorage.cityNameRB = 'optUseNewManual';
                        }
                        else if(document.getElementById('optUseExistingWME').checked == true)
                        {
                           sessionStorage.cityNameRB = 'optUseExistingWME';
                        }
                        else if(document.getElementById('optUseOS').checked == true)
                        {
                           sessionStorage.cityNameRB = 'optUseOS';
                        }
                        if(useName)
                        {
                           snelms[0].value = cityName;
                           snelms[0].disabled = false;
                           snelms = document.getElementsByName('emptyCity');
                           snelms[0].checked = false;
                        }
                     }
                     else if(document.getElementById('optClearExisting').checked == true)
                     {
                        sessionStorage.cityNameRB = 'optClearExisting';
                        snelms[0].disabled = true;
                        snelms = document.getElementsByName('emptyCity');
                        snelms[0].checked = true;
                     }
                     else
                     {
                        sessionStorage.cityNameRB = 'optUseExisting';
                     }

                     // finally the Street field
                     var oslName = locatorElements[1];
                     if((locatorElements[0].length > 0)&&(locatorElements[1].length > 0)) oslName += ' - ';
                     if((oslName.length > 0)||(locatorElements[0].length > 0))
                     {
                        oslName += oslWazeifyStreetName(locatorElements[0], false);
                        oslPrevStreetName = oslName;
                        snelms = document.getElementsByName('streetName');
                        snelms[0].value = oslName;
                        snelms[0].disabled = false;
                        snelms = document.getElementsByName('emptyStreet');
                        snelms[0].checked = false;
                     }
                     else
                     {
                        snelms = document.getElementsByName('streetName');
                        snelms[0].value = '';
                        snelms[0].disabled = true;
                        snelms = document.getElementsByName('emptyStreet');
                        snelms[0].checked = true;
                     }

                     if(oslAdvancedMode)
                     {
                        // auto-click the Apply button...
                        var applyAddress = document.getElementsByClassName('address-form-actions');
                        var applyButtons = applyAddress[0].getElementsByClassName('btn-primary');
                        applyButtons[0].click();
                     }
                  }
               }
            }
         }
      }
   }
}


function oslMatch(oslLink, oslArea, oslRadioID)
{
   this.oslLink = oslLink;
   this.oslArea = oslArea;
   this.oslRadioID = oslRadioID;
}


function oslSortCandidates(a,b)
{
   var x = a.oslArea;
   var y = b.oslArea;
   return((x<y) ? -1 : ((x>y) ? 1 : 0));
}


function oslCityNameKeyup()
{
   oslCheckCityNameDuplicates(oslCaseCorrect(document.getElementById('myCityName').value),0);
   document.getElementById('optUseNewManual').checked = true;
}

function oslSelectWMEName()
{
   oWCN = document.getElementById('oslWMECityNames');
   cityName = oWCN.options[oWCN.options.selectedIndex].text;
   oslCheckCityNameDuplicates(cityName,0);
   document.getElementById('optUseExistingWME').checked = true;
}

function oslSelectOSName()
{
   oOCN = document.getElementById('oslOSCityNames');
   cityName = oOCN.options[oOCN.options.selectedIndex].text;
   cityName = cityName.substring(0,cityName.indexOf('[')-1);
   document.getElementById('optUseOS').checked = true;
   document.getElementById('oslCNInfo').innerHTML = '';
}


function oslToOSGrid(lat, lon, mode)
{
   if(oslInUK == false) return;
   
   if(lat != 0)
   {
      if(mode == 2)
      {
         oslEastings = lat;
         oslNorthings = lon;
      }
      else
      {  
         oslLatitude = lat;
         oslLongitude = lon;
         oslWGStoOSGB();
      }
   }

   if((mode == 1) || (mode == 2))  // OS Locator lookup
   {  
      // determine which 10km grid block contains the current mouse position
      var eBlock = (Math.floor(oslEastings/10000)) * 10000;
      var nBlock = (Math.floor(oslNorthings/10000)) * 10000;
       
      // check to see if there's a corresponding array in the osl_10km data
      var oslEvalString = 'typeof unsafeWindow.locatorData_'+eBlock+'_'+nBlock;

      if(eval(oslEvalString) == "undefined") // Thanks to Timbones :-)
      {
         // inject 10km block data
         var script = document.createElement("script");
         script.setAttribute('type','text/javascript');
         script.setAttribute('charset','windows-1252');
         script.src = 'https://chizzum.com/greasemonkey/osl_v4/locatorData_'+eBlock+'_'+nBlock+'.js';
         document.head.appendChild(script);
         oslOSLDiv.innerHTML = 'Loading new OS data...';
         oslLoadingMsg = true;
         return;
      }

      if(eval(oslEvalString) != "undefined")
      {
         oslLoadingMsg = false;
         // yes...  make a local copy to avoid having an eval() in each iteration of the loop
         if((eBlock != oslEvalEBlock) || (nBlock != oslEvalNBlock))
         {       
            oslEvalEBlock = eBlock;
            oslEvalNBlock = nBlock;
            evalstr = 'oslBlockData = unsafeWindow.locatorData_'+eBlock+'_'+nBlock;
            eval(evalstr);
         }

         var candidates = new Array();
         var elm = 0;
         var bdstr = '';

         if(mode == 1) candidates[candidates.length++] = new oslMatch('<label style="display:inline;"><input type="radio" name="oslChoice" id="oslID_null_null_null" />Un-named segment</label><br>',1000000000000,'oslID_null_null_null');
         var preselect = false;

         for(var loop = 0;loop < oslBlockData.length; loop++)
         {
            var locatorElements = new Array();
            // for each entry in the array, test the centrepoint position to see if it lies within the bounding box for that entry
            // note that we allow a 10m tolerance on all sides of the box to allow for inaccuracies in the latlon->gridref conversion,
            // and to increase the chance of a successful match when the road runs E-W or N-S and thus has a long but narrow bounding box

            // the following block of code more or less replicates the string.split() method, but is around 2x faster in the Chrome
            // JS engine...
            if(navigator.userAgent.indexOf("Chrome") != -1)
            {
               bdstr = oslBlockData[loop];
               while(bdstr.indexOf(':') != -1)
               {
                  locatorElements.push(bdstr.substr(0,bdstr.indexOf(':')));
                  bdstr = bdstr.substr(bdstr.indexOf(':')+1);
               }
               locatorElements.push(bdstr);
            }
            else
            {
               locatorElements = oslBlockData[loop].split(':');
            }  

            var bbW = parseInt(locatorElements[4])-10;
            var bbE = parseInt(locatorElements[5])+10;
            var bbS = parseInt(locatorElements[6])-10;
            var bbN = parseInt(locatorElements[7])+10;

            var streetName = '';
            if(locatorElements[1].length > 0)
            {
               streetName += locatorElements[1];
               if(locatorElements[0].length > 0)
               {
                  streetName += ' - ';
               }
            }
            streetName += oslWazeifyStreetName(locatorElements[0], false);

            if((mode == 1)&&(oslEastings>=bbW)&&(oslEastings<=bbE)&&(oslNorthings>=bbS)&&(oslNorthings<=bbN))
            {
               var radioID = 'oslID_'+eBlock+'_'+nBlock+'_'+loop;
               var oslLink = '<label style="display:inline;"><input type="radio" name="oslChoice" id="'+radioID+'"';
               if((streetName == oslPrevStreetName)&&(preselect == false))
               {
                  oslLink += 'checked="true"';
                  preselect = true;
               }
               oslLink += '/>'+streetName+'&nbsp;&nbsp;[<i>'+locatorElements[9]+'</i>]</label><br>';
               var area = ((bbE-bbW) * (bbN-bbS));
               candidates[candidates.length++] = new oslMatch(oslLink,area,radioID);
            }
            else if(mode == 2)
            {
               // NameCheck comparisons...
               for(var i=0;i<oslOSLNCSegments.length;i++)
               {
                  oslEastings = oslOSLNCSegments[i].oslEastings;
                  oslNorthings = oslOSLNCSegments[i].oslNorthings;
                  if((oslEastings>=bbW)&&(oslEastings<=bbE)&&(oslNorthings>=bbS)&&(oslNorthings<=bbN))
                  {
                     if(oslOSLNCSegments[i].streetname == streetName) oslOSLNCSegments[i].match = true;
                  }
               }
            }                        
         }
         
         if(mode == 1)
         {
            var newHTML = '<b>OSL matches';
            newHTML += ' at '+oslEastings+','+oslNorthings+'</b>';

            if(candidates.length > 0)
            {
               if(oslAdvancedMode) newHTML += '<br><input id="oslSelect" type="button" value="Apply to Properties" /><br><br>';
               else newHTML += '<br><input id="oslSelect" type="button" value="Copy to Properties" /><br><br>';
               if(candidates.length > 1) candidates.sort(oslSortCandidates);
               for(var loop=0;loop<candidates.length;loop++)
               {
                  newHTML += candidates[loop].oslLink;
               }
               newHTML += '<br>City name:<br>';
               newHTML += '<label style="display:inline;"><input type="radio" name="oslCityNameOpt" id="optUseExisting"/>Use existing segment name(s)</label><br>';
               newHTML += '<label style="display:inline;"><input type="radio" name="oslCityNameOpt" id="optClearExisting" />Clear existing segment name(s)</label><br>';
               newHTML += '<label style="display:inline;"><input type="radio" name="oslCityNameOpt" id="optUseNewManual" />Use new name:</label><br>';
               newHTML += '&nbsp;&nbsp;<input id="myCityName" style="font-size:14px; line-height:16px; height:22px; margin-bottom:4px; transition:none; focus:none; box-shadow:none" type="text"';
               if(sessionStorage.cityNameRB == 'optUseNewManual') newHTML += 'value="'+sessionStorage.myCity+'"/><br>';
               else newHTML += 'value=""/><br>';
               newHTML += '<label style="display:inline;"><input type="radio" name="oslCityNameOpt" id="optUseExistingWME" />Use name from map:</label><br>';
               newHTML += '&nbsp;&nbsp;<select id="oslWMECityNames"></select><br>';
               newHTML += '<label style="display:inline;"><input type="radio" name="oslCityNameOpt" id="optUseOS" />Use name from OS Gazetteer:</label><br>';
               newHTML += '&nbsp;&nbsp;<select id="oslOSCityNames"></select><br>';
               newHTML += '<div id="oslCNInfo"></div><br>';
               oslOSLDiv.innerHTML = newHTML;

               oslGetNearbyCityNames();

               oWCN = document.getElementById('oslWMECityNames');
               var nameList = [];
               for(var cityObj in wazeModel.cities.objects)
               {
                  cityname = wazeModel.cities.objects[cityObj].name;
                  if(cityname != '') nameList.push(cityname);
               }
               nameList.sort();

               var matchedWMEName = false;
               for(var i=0; i<nameList.length; i++)
               {
                  var listOpt = document.createElement('option');
                  listOpt.text = nameList[i];
                  oWCN.add(listOpt,null);
                  if(sessionStorage.cityNameRB == 'optUseExistingWME')
                  {
                     if(nameList[i] == sessionStorage.myCity)
                     {
                        oWCN.options.selectedIndex = i;
                        matchedWMEName = true;
                     }
                  }
               }
               if((!matchedWMEName) && (sessionStorage.cityNameRB == 'optUseExistingWME'))
               {
                  oWCN.options.selectedIndex = 0;
               }
               document.getElementById('oslSelect').addEventListener("click", oslClick, true);
               document.getElementById('oslWMECityNames').addEventListener("click", oslSelectWMEName, true);
               document.getElementById('optUseExistingWME').addEventListener("click", oslSelectWMEName, true);
               document.getElementById('oslOSCityNames').addEventListener("click", oslSelectOSName, true);
               document.getElementById('optUseOS').addEventListener("click", oslSelectOSName, true);
               document.getElementById('myCityName').addEventListener("keyup", oslCityNameKeyup, true);
               document.getElementById('optUseNewManual').addEventListener("click", oslCityNameKeyup, true);
               for(var loop=0;loop<candidates.length;loop++)
               {
                  document.getElementById(candidates[loop].oslRadioID).addEventListener("click", oslRadioClick, true);
               }

               document.getElementById(sessionStorage.cityNameRB).checked = true;
            }
            else oslOSLDiv.innerHTML = newHTML;
         }
      }
   }
   else return '?e='+oslEastings+'&n='+oslNorthings;
}

function oslRemoveDirSuffix(currentName, dirSuffix)
{
   dPos = currentName.indexOf(dirSuffix);
   if(dPos != -1)
   {
      dLength = dirSuffix.length;
      currentName = currentName.substr(0,dPos) + currentName.substr(dPos+dLength);
   }
   return currentName
}

function oslNameCheckTrigger()
{
   oslOSLNameCheckTimer = 2;
}


function oslNameComparison()
{
   for(;oslONC_E<=oslEBlock_max;)
   {
      for(;oslONC_N<=oslNBlock_max;)
      {
         oslToOSGrid(oslONC_E*10000, oslONC_N*10000, 2);
         if(oslLoadingMsg == true)
         {
            setTimeout(oslNameComparison,500);
            return;
         }
         oslONC_N++;
      }
      oslONC_N = oslNBlock_min;
      oslONC_E++;
   }
   for(var i=0;i<oslOSLNCSegments.length;i++)
   {
      if(oslOSLNCSegments[i].match == false)
      {
         var pline = oslOSLNCSegments[i].pline;
         pline.setAttribute("stroke","#000000");
         pline.setAttribute("stroke-opacity","0.9");
         pline.setAttribute("stroke-width","9");
         pline.setAttribute("stroke-dasharray","none");
      }
   } 
}

function oslNCCandidate(pline, oslEastings, oslNorthings, streetname)
{
   this.pline = pline;
   this.oslEastings = oslEastings;
   this.oslNorthings = oslNorthings;
   this.streetname = streetname;
   this.match = false;
}

function oslNCStateChange()
{
   if(document.getElementById('_cbNCEnabled').checked == false)
   {
      for(var segObj in wazeModel.segments.objects)
      {
         var seg = wazeModel.segments.objects[segObj];
         var pline = document.getElementById(seg.geometry.id);
         if(pline != null) 
         {
            pline.setAttribute("stroke-width","5");
            pline.setAttribute("stroke","#dd7700");
            pline.setAttribute("stroke-opacity","0.001");
            pline.setAttribute("stroke-dasharray","none");
         }
      }
   }
   else if(wazeMap.getZoom() >= 4) oslNameCheck();
}
  
function oslNameCheck()
{
   if(oslMaskTest() == true) return;

   if((document.getElementById('_cbNCEnabled').checked == false) || (wazeMap.getZoom() < 4)) return;
   
   while(oslOSLNCSegments.length > 0) oslOSLNCSegments.pop();
   
   var geoCenter=new OpenLayers.LonLat(wazeMap.getCenter().lon,wazeMap.getCenter().lat);
   geoCenter.transform(new OpenLayers.Projection("EPSG:900913"),new OpenLayers.Projection("EPSG:4326"));   
   oslToOSGrid(geoCenter.lat, geoCenter.lon, 0);
   if(oslLoadingMsg == true)
   {
      setTimeout(oslNameCheck,500);
      return;
   }
   oslEBlock_min = 99;
   oslEBlock_max = -1;
   oslNBlock_min = 99;
   oslNBlock_max = -1;
   
   for(var segObj in wazeModel.segments.objects)
   {
      var seg = wazeModel.segments.objects[segObj];
      var segRT = seg.data.roadType;
      if
      (
         (seg.bounds.left > wazeMap.getExtent().right) ||
         (seg.bounds.right < wazeMap.getExtent().left) ||
         (seg.bounds.top < wazeMap.getExtent().bottom) ||
         (seg.bounds.bottom > wazeMap.getExtent().top)
      )
      {
         // ignore segment as it's not visible...
      }
      else if
      (
         (segRT < 1) ||
         ((segRT > 3) && (segRT < 6)) ||
         ((segRT > 8) && (segRT < 17)) ||
         ((segRT > 17) && (segRT < 20)) ||
         (segRT > 21)
      )
      {
         // ignore segment as it's non-driveable...
      }
      else
      {
         streetObj = wazeModel.streets.objects[seg.attributes.primaryStreetID];
         if(streetObj != null)
         {
            var currentName = streetObj.name;
            gid = seg.geometry.id;
            pline = document.getElementById(gid);

            if((currentName != null) && (pline != null))
            {
               currentName = oslRemoveDirSuffix(currentName,' (N)');
               currentName = oslRemoveDirSuffix(currentName,' (S)');
               currentName = oslRemoveDirSuffix(currentName,' (E)');
               currentName = oslRemoveDirSuffix(currentName,' (W)');
               currentName = oslRemoveDirSuffix(currentName,' (CW)');
               currentName = oslRemoveDirSuffix(currentName,' (ACW)');

               var geoCenter=new OpenLayers.LonLat((seg.bounds.left+seg.bounds.right)/2,(seg.bounds.top+seg.bounds.bottom)/2);
               geoCenter.transform(new OpenLayers.Projection("EPSG:900913"),new OpenLayers.Projection("EPSG:4326"));            
               oslToOSGrid(geoCenter.lat, geoCenter.lon, 0);
               oslOSLNCSegments.push(new oslNCCandidate(pline, oslEastings, oslNorthings, currentName));
               var eBlock = Math.floor(oslEastings/10000);
               var nBlock = Math.floor(oslNorthings/10000);
               if(eBlock < oslEBlock_min) oslEBlock_min = eBlock;
               if(eBlock > oslEBlock_max) oslEBlock_max = eBlock;
               if(nBlock < oslNBlock_min) oslNBlock_min = nBlock;
               if(nBlock > oslNBlock_max) oslNBlock_max = nBlock;
            }
         }
      }
   }
   
   if(oslOSLNCSegments.length > 0) 
   {
      oslONC_E = oslEBlock_min;
      oslONC_N = oslNBlock_min;
      oslNameComparison();
   }   
}


function oslTenthSecondTick()
{
   if(!oslAdvancedMode) oslEnableAdvancedOptions();

   if(selectionManager.selectedItems.length == 1)
   {
      if(oslPrevSelected == null) oslDoOSLUpdate = true;
      else if(selectionManager.selectedItems[0].fid != oslPrevSelected) oslDoOSLUpdate = true;
      oslPrevSelected = selectionManager.selectedItems[0].fid;
   }
   if(document.getElementById('oslSelect') != null)
   {
      editBtn = document.getElementsByClassName('btn address-edit-btn')[0];
      if(editBtn != null)
      {
         if((selectionManager.selectedItems.length > 0)&&(editBtn.getAttribute('disabled') == null)) document.getElementById('oslSelect').disabled = false;
         else document.getElementById('oslSelect').disabled = true;
      }
   }
   
   if(oslOSLNameCheckTimer > 0)
   {
      if(--oslOSLNameCheckTimer == 0) oslNameCheck();
   }


   if((oslDoOSLUpdate == true) && (oslMousepos != null))
   {
      // update the OS Locator matches
      mouselatlon = oslMousepos.split(",");    
      oslToOSGrid(mouselatlon[1],mouselatlon[0],1);
      oslDoOSLUpdate = oslLoadingMsg;
      if(!oslDoOSLUpdate) oslRadioClick();
   }
   
   if(oslRefreshAutoTrack)
   {
      // refresh any of the site tabs/windows we've checked for auto-tracking
      if(oslInUK == true)
      {
         if(document.getElementById('_cbAutoTrackOSOD').checked == 1) window.open(oslOSOD_url,'_osopendata');
         if(document.getElementById('_cbAutoTrackOSMC').checked == 1) window.open(oslOSMC_url,'_osmusicalchairs');
      }
      else if(oslInCanaries == true)
      {
         if(document.getElementById('_cbAutoTrackGdC').checked == 1) window.open(oslGdC_url,'_gdcanaries');
      }
      oslRefreshAutoTrack = false;
   }
}

function oslEnableAdvancedOptions()
{
   if (oslAdvancedMode) return;
   if(loginManager == null) return;
   if(loginManager.isLoggedIn)
   {
      thisUser = loginManager.user;
      if (thisUser !== null && thisUser.normalizedLevel >= 3)
      {
         oslAdvancedMode = true;
         oslAddLog('advanced mode enabled');
      }
   }
}


function oslUpdateLiveMapLink()
{
   var lmLink = null;
   var menuItems = document.getElementsByClassName("waze-header-menu")[0];
   for(var miloop = 0; miloop<menuItems.childElementCount; miloop++)
   {
      if(menuItems.children[miloop].innerHTML.indexOf('livemap') != -1)
      {
         lmLink = menuItems.children[miloop].getElementsByTagName('a')[0];
      }  
   }

   if(lmLink == null) 
   {
      setTimeout(oslUpdateLiveMapLink,100);
      return;
   }
   
   var mapCenter = wazeMap.center;
   if(mapCenter == null) 
   {
      setTimeout(oslUpdateLiveMapLink,100);
      return;
   }

   var geoCenter=new OpenLayers.LonLat(mapCenter.lon,mapCenter.lat);
   geoCenter.transform(new OpenLayers.Projection("EPSG:900913"),new OpenLayers.Projection("EPSG:4326"));
   var lat = geoCenter.lat;
   var lon = geoCenter.lon;
   var zoom = wazeMap.zoom;  
   // translate the zoom level between WME and live map.
   var livemap_zoom = zoom+12;
   if (livemap_zoom > 17) livemap_zoom = 17;
   var livemap_url = '/livemap/?zoom='+livemap_zoom+'&lat='+lat+'&lon='+lon+'&layers=BTTTT';
   // Modify existing livemap link to reference current position in WME
   lmLink.href = livemap_url;
   lmLink.target = '_blank';
   
   setTimeout(oslUpdateLiveMapLink,100); 
}

  
function oslMouseMoveAndUp(e)
{
   oslMouseX = e.pageX - document.getElementById('map').getBoundingClientRect().left;
   oslMouseY = e.pageY - document.getElementById('map').getBoundingClientRect().top;

   oslBBDiv.style.top = (0-eval(document.getElementById('WazeMap').children[0].children[0].style.top.replace('px',''))) + 'px';
   oslBBDiv.style.left = (0-eval(document.getElementById('WazeMap').children[0].children[0].style.left.replace('px',''))) + 'px';

   oslMousepos = document.getElementsByClassName('olControlMousePosition')[0].innerHTML;
   if((oslMousepos != sessionStorage.oslMousepos) || (oslLoadingMsg && (eval(oslEvalString) != "undefined")))
   {
      oslLoadingMsg = false;
      sessionStorage.oslMousepos = oslMousepos;

      oslDoOSLUpdate = false;
      // update the OSL results if there are no selected segments, but there is a highlighted segment
      // which we haven't already done an update for
      if(selectionManager.selectedItems.length == 0)
      {
         for(var seg in wazeModel.segments.objects)
         {
            if(wazeModel.segments.objects[seg].renderIntent == 'highlight')
            {
               if(seg != oslPrevHighlighted)
               {
                  oslPrevHighlighted = seg;
               }
               oslDoOSLUpdate = true;
            }
         }
      }
   }

   // get current lat/lon & zoom level directly from WME (thanks timbones!)
   var lat = sessionStorage.lat;
   var lon = sessionStorage.lon;
   var zoom = sessionStorage.zoom;

   if(wazeMap.center != null)
   {
      var mapCenter = wazeMap.center;
      var geoCenter=new OpenLayers.LonLat(mapCenter.lon,mapCenter.lat);
      geoCenter.transform(new OpenLayers.Projection("EPSG:900913"),new OpenLayers.Projection("EPSG:4326"));
      lat = geoCenter.lat;
      lon = geoCenter.lon;
      zoom = wazeMap.zoom;
   }

   // compare the new parameters against the persistent copies, and update the external links
   // only if there's a change required - the newly-inserted <a> element can't be clicked
   // on until the insertion process is complete, and if we were to re-insert it every timeout
   // then it'd spend a lot of its time giving the appearance of being clickable but without
   // actually doing anything...
   if((zoom != sessionStorage.zoom)||(lat != sessionStorage.lat)||(lon != sessionStorage.lon))
   {
      // check to see which part of the world we're looking at...
      if((lon < -13) && (lon > -19) && (lat > 27) && (lat < 30))
      {
         if (oslInCanaries == false)
         {
            // ...Canary Islands
            oslAddLog('editing in the Canary Islands');
            oslInCanaries = true;
            oslInUK = false;
            // hide UK-specific parts of the UI, and show Canaries-specific parts...
            document.getElementById('oslOSLDiv').style.display = "none";
            document.getElementById('ncDiv').style.display = "none";
            document.getElementById('_extlinksUK').style.display = "none";
            document.getElementById('_extlinksCanaries').style.display = "block";
         }
      }
      else if((lon < 2) && (lon > -11) && (lat > 49) && (lat < 62))
      {
         if (oslInUK == false)
         {
            // ...dear old Blighty
            oslAddLog('editing in the UK');
            oslInCanaries = false;
            oslInUK = true;
            // hide Canaries-specific parts of the UI, and show UK-specific parts...
            document.getElementById('oslOSLDiv').style.display = "block";
            document.getElementById('ncDiv').style.display = "block";
            document.getElementById('_extlinksUK').style.display = "block";
            document.getElementById('_extlinksCanaries').style.display = "none";
         }
      }
      else
      {
         // ...somewhere not yet supported
         oslAddLog('editing in an unsupported area');
         oslInCanaries = false;
         oslInUK = false;
         // hide all area-specific parts of the UI...
         document.getElementById('oslOSLDiv').style.display = "none";
         document.getElementById('ncDiv').style.display = "none";
         document.getElementById('_extlinksUK').style.display = "none";
         document.getElementById('_extlinksCanaries').style.display = "none";
      }

      if(zoom != sessionStorage.zoom)
      {
         if(zoom < 4) document.getElementById('_cbNCEnabled').disabled = true;
         else document.getElementById('_cbNCEnabled').disabled = false;
      }
      // update the persistent vars with the new position
      sessionStorage.zoom = zoom;
      sessionStorage.lat = lat;
      sessionStorage.lon = lon;

      if(oslInCanaries == true)
      {
         // generate the Canaries URL - requires the support of cmt.user.js
         oslGdC_url = 'http://visor.grafcan.es/visorweb/default.php?lat='+lat+'&lon='+lon+'&z='+zoom;
      }
      else if(oslInUK == true)
      {
         // translate the zoom level between WME and Musical Chairs - this gives a pretty close match
         var mczoom = zoom + 12;
         if(mczoom > 18) mczoom = 18;
         // generate the Musical Chairs URL
         oslOSMC_url = 'http://ris.dev.openstreetmap.org/oslmusicalchairs/map?zoom='+mczoom+'&lat='+lat+'&lon='+lon+'&layers=B0TT&view_mode=pseudorandom';

         // translate the zoom level between WME and OpenData - the match here isn't quite so good...
         var odzoom = zoom + 5;
         if(odzoom < 6) odzoom = 6;
         if(odzoom > 10) odzoom = 10;
         // generate the OpenData URL - requires the support of os_opendata_fullheight.user.js
         oslOSOD_url = 'http://www.ordnancesurvey.co.uk/oswebsite/opendata/viewer/'+oslToOSGrid(lat,lon,0)+'&z='+odzoom;
      }

      // wait to update the livemap link, as WME now does its own update after this point so any changes we make here
      // end up being wiped out...
      setTimeout(oslUpdateLiveMapLink,100);

      // update the link URLs
      if(oslInUK == true)
      {
         document.getElementById("_linkOSOD").href = oslOSOD_url;
         document.getElementById("_linkOSMC").href = oslOSMC_url;
      }
      else if(oslInCanaries == true)
      {
         document.getElementById("_linkGdC").href = oslGdC_url;
      }
      document.getElementById('_linkPermalink').href = document.getElementsByClassName('WazeControlPermalink')[0].getElementsByTagName('a')[0].href;

      // refreshing the tabs within the event handler causes Chrome to switch focus to the tabs, so we
      // simply set the flag here and let the refresh occur within the 100ms tick handler as before
      oslRefreshAutoTrack = true;

      // recalculate the map viewport extents in terms of oslEastings/oslNorthings
      var vpHalfWidth = (wazeMap.getExtent().right-wazeMap.getExtent().left) / (2 * 1.61);
      var vpHalfHeight = (wazeMap.getExtent().top-wazeMap.getExtent().bottom) / (2 * 1.61);

      oslVPLeft = oslEastings - vpHalfWidth;
      oslVPRight = oslEastings + vpHalfWidth;
      oslVPBottom = oslNorthings - vpHalfHeight;
      oslVPTop = oslNorthings + vpHalfHeight;

      oslRadioClick();

      oslNameCheck();
   }
}


function oslCancelEvent(e)
{
  e = e ? e : window.event;
  if(e.stopPropagation)
    e.stopPropagation();
  if(e.preventDefault)
    e.preventDefault();
  e.cancelBubble = true;
  e.cancel = true;
  e.returnValue = false;
  return false;
}


function oslOSLDivMouseDown(e)
{
   oslPrevMouseX = e.pageX;
   oslPrevMouseY = e.pageY;
   oslDivDragging = true;
   oslDragBar.style.cursor = 'move';
   document.body.addEventListener('mousemove', oslOSLDivMouseMove, false);
   document.body.addEventListener('mouseup', oslOSLDivMouseUp, false);
   return true;
}

function oslOSLDivMouseUp()
{
   if(oslDivDragging)
   {
      oslDivDragging = false;
      localStorage.oslOSLDivLeft = oslOSLDivLeft;
      localStorage.oslOSLDivTop = oslOSLDivTop;
   }
   oslDragBar.style.cursor = 'auto';
   document.body.removeEventListener('mousemove', oslOSLDivMouseMove, false);
   document.body.removeEventListener('mouseup', oslOSLDivMouseUp, false);
   return true;
}

function oslOSLDivMouseMove(e)
{
   var vpHeight = window.innerHeight; //document.getElementById('map').clientHeight;
   var vpWidth = window.innerWidth; //document.getElementById('map').clientWidth;
   
   oslOSLDivTop = eval(oslOSLDivTop) + eval((e.pageY - oslPrevMouseY));
   oslOSLDivLeft = eval(oslOSLDivLeft) + eval((e.pageX - oslPrevMouseX));
   oslPrevMouseX = e.pageX;
   oslPrevMouseY = e.pageY;

   if(oslOSLDivTop < 0) oslOSLDivTop = 0;
   if(oslOSLDivTop + 16 >= vpHeight) oslOSLDivTop = vpHeight-16;
   if(oslOSLDivLeft < 0) oslOSLDivLeft = 0;
   if(oslOSLDivLeft + 32 >= vpWidth) oslOSLDivLeft = vpWidth-32;

   oslWindow.style.top = oslOSLDivTop+'px';
   oslWindow.style.left = oslOSLDivLeft+'px';
   return oslCancelEvent(e);
}

function oslWindowMaximise()
{
   var vpHeight = window.innerHeight; //document.getElementById('map').clientHeight;
   
   oslDragBar.innerHTML = '<b>WMEOpenData v'+oslVersion+'</b>';
   oslDragBar.innerHTML += '<img id="_minimax" align=right valign=middle src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wMBAsgGGkHX7cAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAUUlEQVQoz63SQQqAQAxD0R/xXoIXH/RicaUgtIOdscuE8DaVbaq3ZIWaXB6VJTWZE7TH2j/SrQCwxdq89FLItTkpVBJtXOoqgbY+4fFd0sjDXtyHHG22yaK0AAAAAElFTkSuQmCC" />';
   document.getElementById('_minimax').addEventListener('click', oslWindowMinimise, false);
   oslOSLDiv.style.height = 'auto';
   oslOSLDiv.style.padding = '2px';
   ncDiv.style.height = 'auto';
   ncDiv.style.padding = '2px';
   oslMLCDiv.style.height = 'auto';
   oslMLCDiv.style.padding = '2px';
   localStorage.oslOSLDivState = 'maximised';
   if(oslWindow.getBoundingClientRect().bottom > vpHeight)
   {
      oslOSLDivTop = (vpHeight-oslWindow.getBoundingClientRect().height);
      localStorage.oslOSLDivTop = oslOSLDivTop;
      oslWindow.style.top = oslOSLDivTop+'px';
   }
}

function oslWindowMinimise()
{
   oslDragBar.innerHTML = '<b>WMEOpenData v'+oslVersion+'</b>';
   oslDragBar.innerHTML += '<img id="_minimax" align=right valign=middle src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wMBAshHpl/y8MAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAXUlEQVQoz63SQQqAMAxE0T/Fe0k9uNKTjQtBpLZSowOBQBjeJrLN20wA2jTcdLZkGy0y80CjgFcrwbFQxgoAiUDO0qN2Ub5LXa1S/pFuWkMJS9huDhn3biFJkYfdAYUjUx2jRgIlAAAAAElFTkSuQmCC" />';
   document.getElementById('_minimax').addEventListener('click', oslWindowMaximise, false);
   oslOSLDiv.style.height = '0px';
   oslOSLDiv.style.padding = '0px';
   ncDiv.style.height = '0px';
   ncDiv.style.padding = '0px';
   oslMLCDiv.style.height = '0px';
   oslMLCDiv.style.padding = '0px';
   oslBBDiv.innerHTML = '';
   localStorage.oslOSLDivState = 'minimised';
}

function oslWazeBits()
{
   oslAddLog('adding WazeBits...');
   if((oslWazeBitsPresent & 0x01) == 0)
   {
      if(typeof unsafeWindow.wazeMap != "undefined")
      {
         oslAddLog('   wazeMap OK');
         wazeMap = unsafeWindow.wazeMap;
         oslWazeBitsPresent |= 0x01;
      }
      else if(typeof unsafeWindow.W != "undefined")
      {
         if(typeof unsafeWindow.W.controller != "undefined")
         {
            if(typeof unsafeWindow.W.controller.map != "undefined")
            {
               oslAddLog('   wazeMap OK');
               wazeMap = unsafeWindow.W.controller.map;
               oslWazeBitsPresent |= 0x01;
            }
         }
      }
   }  
   if((oslWazeBitsPresent & 0x02) == 0)
   {
      if(typeof unsafeWindow.wazeModel != "undefined")
      {
         oslAddLog('   wazeModel OK');
         wazeModel = unsafeWindow.wazeModel;
         oslWazeBitsPresent |= 0x02;
      }
      else if(typeof unsafeWindow.W != "undefined")
      {
         if(typeof unsafeWindow.W.controller != "undefined")
         {
            if(typeof unsafeWindow.W.controller.model != "undefined")
            {
               oslAddLog('   wazeModel OK');
               wazeModel = unsafeWindow.W.controller.model;
               oslWazeBitsPresent |= 0x02;
            }
         }
      }
   }
   if((oslWazeBitsPresent & 0x04) == 0)
   {
      if(typeof unsafeWindow.loginManager != "undefined")
      {
         oslAddLog('   loginManager OK');
         loginManager = unsafeWindow.loginManager;
         oslWazeBitsPresent |= 0x04;
      }
      else if(typeof unsafeWindow.W != "undefined")
      {
         if(typeof unsafeWindow.W.app != "undefined")
         {
            if(typeof unsafeWindow.W.app.loginManager != "undefined")
            {
               oslAddLog('   loginManager OK');
               loginManager = unsafeWindow.W.app.loginManager;
               oslWazeBitsPresent |= 0x04;
            }
         }
      }
   }
   if((oslWazeBitsPresent & 0x08) == 0)
   {
      if(typeof unsafeWindow.selectionManager != "undefined")
      {
         oslAddLog('   selectionManager OK');
         selectionManager = unsafeWindow.selectionManager;
         oslWazeBitsPresent |= 0x08;
      }
      else if(typeof unsafeWindow.W != "undefined")
      {
         if(typeof unsafeWindow.W.geometryEditing != "undefined")
         {
            if(typeof unsafeWindow.W.geometryEditing.selectionManager != "undefined")
            {
               oslAddLog('   selectionManager OK');
               selectionManager = unsafeWindow.W.geometryEditing.selectionManager;
               oslWazeBitsPresent |= 0x08;
            }
         }
      }
   }
   if((oslWazeBitsPresent & 0x10) == 0)
   {
      if(typeof unsafeWindow.OpenLayers != "undefined")
      {
         oslAddLog('   OpenLayers OK');
         OpenLayers = unsafeWindow.OpenLayers;
         oslWazeBitsPresent |= 0x10;
      }
   }
   if((oslWazeBitsPresent & 0x20) == 0)
   {
      if(typeof unsafeWindow.Waze != "undefined")
      {
         oslAddLog('   Waze OK');
         Waze = unsafeWindow.Waze;
         oslWazeBitsPresent |= 0x20;
      }
   }

   if(oslWazeBitsPresent != 0x3F) setTimeout(oslWazeBits,250);
   else
   {
      // add a new div to the map viewport, to hold the bounding box SVG
      var elementWazeMap = document.getElementById('WazeMap').children[0].children[0];
      oslAddLog('create bounding box DIV');
      oslBBDiv = document.createElement('div');
      oslBBDiv.id = "oslBBDiv";
      oslBBDiv.style.position = 'absolute';
      oslBBDiv.style.top = (0-eval(document.getElementById('WazeMap').children[0].children[0].style.top.replace('px',''))) + 'px';
      oslBBDiv.style.left = (0-eval(document.getElementById('WazeMap').children[0].children[0].style.left.replace('px',''))) + 'px';
      oslBBDiv.style.overflow = 'hidden';
      oslBBDiv.style.width = window.innerWidth;
      oslBBDiv.style.height = window.innerHeight;
      elementWazeMap.appendChild(oslBBDiv);

      // add a new div to hold the OS Locator results, in the form of a draggable window
      oslAddLog('create lookup results DIV');
      oslWindow = document.createElement('div');
      oslWindow.id = "oslWindow";
      oslWindow.style.position = 'absolute';
      oslWindow.style.border = '1px solid #BBDDBB';
      oslWindow.style.borderRadius = '4px';
      oslWindow.style.overflow = 'hidden';
      oslWindow.style.zIndex = 2000;
      oslWindow.style.opacity = 0;
      oslWindow.style.transitionProperty = "opacity";
      oslWindow.style.transitionDuration = "1000ms";
      oslWindow.style.webkitTransitionProperty = "opacity";
      oslWindow.style.webkitTransitionDuration = "1000ms";
      oslWindow.style.boxShadow = '5px 5px 10px Silver';
      document.body.appendChild(oslWindow);

      // dragbar div
      oslDragBar = document.createElement('div');
      oslDragBar.id = "oslDragBar";
      oslDragBar.style.backgroundColor = '#D0D0D0';
      oslDragBar.style.padding = '4px';
      oslDragBar.style.fontSize = '16px';
      oslDragBar.style.lineHeight = '18px';
      oslWindow.appendChild(oslDragBar);

      // OS results div
      oslOSLDiv = document.createElement('div');
      oslOSLDiv.id = "oslOSLDiv";
      oslOSLDiv.innerHTML = '';
      oslOSLDiv.style.backgroundColor = '#DDFFDD';
      oslOSLDiv.style.padding = '2px';
      oslOSLDiv.style.fontSize = '14px';
      oslOSLDiv.style.lineHeight = '16px';
      oslOSLDiv.style.overflow = 'hidden';
      oslOSLDiv.style.width = 'auto';
      oslOSLDiv.style.height = 'auto';
      oslOSLDiv.style.display = 'none';
      oslWindow.appendChild(oslOSLDiv);

      // NameCheck div
      ncDiv = document.createElement('div');
      ncDiv.id = "ncDiv";
      ncDiv.style.backgroundColor = '#DDDDFF';
      ncDiv.style.padding = '2px';
      ncDiv.style.fontSize = '14px';
      ncDiv.style.lineHeight = '16px';
      ncDiv.style.display = 'none';
      ncDiv.innerHTML = '<b>NameCheck</b>';
      ncDiv.innerHTML += '<br><label style="display:inline;"><input type="checkbox" id="_cbNCEnabled" />Highlight potential naming errors</label>';
      ncDiv.innerHTML += '<br><i>Note: only active at at zoom level 4 and above</i>';
      oslWindow.appendChild(ncDiv);

      // external links div
      oslMLCDiv = document.createElement('div');
      oslMLCDiv.id = "oslMLCDiv";
      oslMLCDiv.innerHTML = '<b>External mapping resources</b>';
      // add the anchors and auto-track checkboxes for external sites.  Note that the urls are blank at this stage,
      // they'll be filled in as soon as we've done our first processPermalink() call
      oslExtLinksUKDiv = document.createElement('div');
      oslExtLinksUKDiv.id = "_extlinksUK";
      oslExtLinksUKDiv.style.display = 'none';
      oslExtLinksUKDiv.innerHTML = '<a href="" id="_linkOSOD" target="_osopendata">OS OpenData</a> <input type="checkbox" id="_cbAutoTrackOSOD"></input> | ';
      oslExtLinksUKDiv.innerHTML += '<a href="" id="_linkOSMC" target="_osmusicalchairs">OS Musical Chairs</a> <input type="checkbox" id="_cbAutoTrackOSMC"></input>';

      oslExtLinksCanariesDiv = document.createElement('div');
      oslExtLinksCanariesDiv.id = "_extlinksCanaries";
      oslExtLinksCanariesDiv.style.display = 'none';
      oslExtLinksCanariesDiv.innerHTML += '<a href="" id="_linkGdC" target="_gdcanaries">Gobierno de Canarias</a> <input type="checkbox" id="_cbAutoTrackGdC"></input>';

      oslMLCDiv.appendChild(oslExtLinksUKDiv);
      oslMLCDiv.appendChild(oslExtLinksCanariesDiv);

      oslMLCDiv.innerHTML += '<br>(Checkboxes enable auto-tracking)';
      oslMLCDiv.innerHTML += '<br><br><a href="" id="_linkPermalink">Permalink</a>';
      oslMLCDiv.innerHTML += '<br><br><a href="http://userscripts.org/scripts/show/137249" target="_blank">WMEOpenData@userscripts.org</a>';
      oslMLCDiv.style.backgroundColor = '#EEFFEE';
      oslMLCDiv.style.padding = '2px';
      oslMLCDiv.style.fontSize = '14px';
      oslMLCDiv.style.lineHeight = '16px';
      oslWindow.appendChild(oslMLCDiv);

      oslDragBar.addEventListener('mousedown', oslOSLDivMouseDown, false);
      oslDragBar.addEventListener('mouseup', oslOSLDivMouseUp, false);
      
      document.getElementById('_cbNCEnabled').addEventListener('click', oslNCStateChange, false);

      oslAddLog('oslCountyAbbreviations has '+oslCountyAbbreviations.length+' entries...');
      oslEnableAdvancedOptions();
      wazeMap.events.register("mousemove", null, oslMouseMoveAndUp);
      wazeMap.events.register("mouseup", null, oslMouseMoveAndUp);
      wazeMap.layers[10].events.register("featuresadded", null, oslNameCheckTrigger);
      wazeMap.layers[10].events.register("featuresremoved", null, oslNameCheckTrigger);

      document.body.style.overflow = 'hidden';

      var vpHeight = window.innerHeight; //document.getElementById('map').clientHeight;
      var vpWidth = window.innerWidth; //document.getElementById('map').clientWidth;
   
      if
      (
         (localStorage.oslOSLDivTop == undefined)||
         (localStorage.oslOSLDivLeft == undefined)||
         (localStorage.oslOSLDivTop > vpHeight)||
         (localStorage.oslOSLDivLeft > vpWidth)||
         (localStorage.oslOSLDivTop < 0)||
         (localStorage.oslOSLDivLeft < 0)
      )
      {
         oslOSLDivTop = document.getElementById('sidebar').getBoundingClientRect().top + (document.getElementById('sidebar').getBoundingClientRect().height / 2);
         oslOSLDivLeft = 8;
      }
      else
      {
         oslOSLDivTop = localStorage.oslOSLDivTop;
         oslOSLDivLeft = localStorage.oslOSLDivLeft;
      }
      if(localStorage.oslOSLDivState == undefined) localStorage.oslOSLDivState = 'maximised';
      oslOSLDivTopMinimised = oslOSLDivTop;
      oslWindow.style.left = oslOSLDivLeft+'px';
      oslWindow.style.top = oslOSLDivTop+'px';
      if(localStorage.oslOSLDivState == 'maximised') oslWindowMaximise();
      else oslWindowMinimise();

      oslWindow.style.opacity = 1;
      oslDoneOnload = true;

      for(i=0;i<wazeMap.layers.length;i++)
      {
         if(wazeMap.layers[i].name == 'Satellite Imagery') oslBBDiv.style.zIndex = eval(wazeMap.layers[i].div.style.zIndex) + 1;
         if(wazeMap.layers[i].name == 'Spotlight') oslOSLMaskLayer = wazeMap.layers[i].div;
      }

      setInterval(oslTenthSecondTick,100);
   }
}

function oslInitialise()
{
   oslAddLog('initialise()');
   
   var nameTestMode = false
   // oslWazeifyStreetName() functionality test code
   if(nameTestMode == true)
   {
      console.log(oslWazeifyStreetName("Orchard On The Green", true));
      console.log(oslWazeifyStreetName("The Orchard On The Green", true));
      console.log(oslWazeifyStreetName("The Avenue", true));
      console.log(oslWazeifyStreetName("High Road Ickenham", true));
      console.log(oslWazeifyStreetName("Westway Avenue", true));
      console.log(oslWazeifyStreetName("Parkway Park", true));
      console.log(oslWazeifyStreetName("Parkway Crescent", true));
      console.log(oslWazeifyStreetName("Breakspear Road North", true));
      console.log(oslWazeifyStreetName("Breakspear Road South", true));
      console.log(oslWazeifyStreetName("Breakspear Road East", true));
      console.log(oslWazeifyStreetName("Breakspear Road West", true));
      console.log(oslWazeifyStreetName("Kensal Green Way", true));
      return;
   }

   // inject gazetteer data
   var gazscript = document.createElement("script");
   gazscript.setAttribute('type','text/javascript');
   gazscript.setAttribute('charset','windows-1252');
   gazscript.src = 'https://chizzum.com/greasemonkey/gaz_v2/gazetteer.js';
   document.head.appendChild(gazscript);
   oslMergeGazData = true;

   // initialise persistent vars
   sessionStorage.zoom = 0;
   sessionStorage.lat = '';
   sessionStorage.lon = '';
   sessionStorage.myCity = '';
   sessionStorage.prevCity = '';
   sessionStorage.cityChangeEastings = 0;
   sessionStorage.cityChangeNorthings = 0;
   sessionStorage.cityNameRB = 'optUseExisting';
   sessionStorage.oslTabCreated = 0;

   oslWazeBits();
}


// START OF CANARIES MAP TRACKER CODE BLOCK
function cmtAddLog(logtext)
{
   console.log('CMT: '+logtext);
}

function cmtInitialise()
{
   cmtAddLog('initialise()');
   cmtAddLog('waiting for map object');
   map = unsafeWindow.map;
   if(map == null)
   {
      setTimeout(cmtInitialise,500);
      return;
   }
   cmtAddLog('map object accessed');

   // extract the coords/zoom from the url...
   var userloc = document.location.href;
   latpos = userloc.indexOf("?lat=");
   lonpos = userloc.indexOf("&lon=");
   zpos = userloc.indexOf("&z=");
   if((latpos != -1)&&(lonpos != -1)&&(zpos != -1))
   {
      var cmtLat = parseFloat(userloc.substr(latpos+5,lonpos-(latpos+5)));
      var cmtLon = parseFloat(userloc.substr(lonpos+5,zpos-(lonpos+5)));
      var cmtZoom = parseInt(userloc.substr(zpos+3,2))+12;
      var cmtPos = map.getCenter();
      cmtPos.mb = cmtLat;
      cmtPos.nb = cmtLon;
      map.setCenter(cmtPos);
      map.setZoom(cmtZoom);
      cmtAddLog('map repositioned');
   }
}
// END OF CANARIES MAP TRACKER CODE BLOCK

// START OF OPENDATA FULLHEIGHT CODE BLOCK
var odfhEastings = 0;
var odfhNorthings = 0;
var odfhZoom = 0;
function odfhResizeMap()
{
  // resizes map viewport whenever browser window changes size
   elm = document.getElementById("map");
   elm.style.height = (window.innerHeight-10)+'px';
   elm.style.width = (window.innerWidth-10)+'px';
}

function odfhRecentreMap()
{
   // call the OS provided functions required to point the map at a
   // given grid ref and zoom level
   mymapCenter = new unsafeWindow.OpenSpace.MapPoint(odfhEastings, odfhNorthings);
   unsafeWindow.osMap.setCenter(mymapCenter, odfhZoom);
}

function odfhFakeOnload()
{
   // remove the OS logos from the top...
   elm = document.getElementById("logos");
   elm.parentNode.removeChild(elm);

   // hide the huge "about    help    keep in touch" bit from the bottom... hide rather than
   // remove, so that the OS code doesn't throw a wobbler when it tries modifying some of
   // the elements within sitefooter!
   elm = document.getElementById('sitefooter');
   elm.style.visibility = "hidden";
   elm.style.position = "absolute";
   elm.style.top = "0px";

   // reduce the width of the whitespace around the map viewport
   document.getElementById("wrapper").style.padding = '4px';

   // move the "boundary layers" menu selector into the map viewport
   elm = document.getElementById("mapmast");
   elm.style.height = '0px';
   elm.style.top = '64px';
   elm.style.right = '64px';
   elm.style.zIndex = '2';
   // adjust the "boundary layers" border and background colour so it shows up nicely
   elm = document.getElementById("mapoptions").getElementsByTagName("LI");
   elm[0].style.borderStyle = 'solid';
   elm[0].style.backgroundColor = '#FFFFFF';
   elm[0].style.borderWidth = '1px';

   // resize the map viewport...
   odfhResizeMap();
   // ...then force a redraw of the map object to fill out the extra space
   unsafeWindow.osMap.render('map');

   window.addEventListener('resize', odfhResizeMap, true);

   // extract the starting coords/zoom from the url...
   var userloc = document.location.href;
   epos = userloc.indexOf("?e=");
   npos = userloc.indexOf("&n=");
   zpos = userloc.indexOf("&z=");
   if((epos != -1)&&(npos != -1)&&(zpos != -1))
   {
      odfhEastings = userloc.substr(epos+3,npos-(epos+3));
      odfhNorthings = userloc.substr(npos+3,zpos-(npos+3));
      odfhZoom = userloc.substr(zpos+3,2);
      //...then recentre the map
      odfhRecentreMap();
   }
}

function odfhInitialise()
{
   console.log('ODFH: initialise()');
   if(document.getElementById('OpenSpaceControlPoweredBy_innerImage') == null) setTimeout(odfhInitialise,500);
   else odfhFakeOnload();
}
// END OF OPENDATA FULLHEIGHT CODE BLOCK

oslBootstrap();