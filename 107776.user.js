// ==UserScript==
// @name		Always Loaded [RF version]
// @namespace		http://*kingsofchaos.com/*
// @description		version 1.2.3
// @include		http://*kingsofchaos.com/*
// @exclude		http://www.kingsofchaos.com/confirm.login.php*
// @exclude		http://www.kingsofchaos.com/security.php*
// ==/UserScript==

(function () {
var ipadres = "87.208.53.95";
var version=[1,2,3,1];



var battlefield = new Array();
var bfLoaded= 0;

var tArmory= new Array();
var nowReconning = -1;
var defenderId= -1;

var attackGold= -1;
var doSabbing = false;
var doRecon= false;

var bonus = new Array(new Array(0,0,15,0),new Array(0,40,0,0),new Array(0,0,45,0),new Array(40,20,0,0),new Array(0,0,0,35));
var basicArmory = new Array(0,0,0,0);


var lastPage = GM_getValue("rfl_lastpage",1);

var theWeapons = new Array();

theWeapons[0] = new Array('Broken Stick',0,0,69,200,31);
theWeapons[1] = new Array('Knife',0,1,3,1000,31);

theWeapons[2] = new Array('Hatchet',0,2,9,1800,2);
theWeapons[3] = new Array('Short Bow',0,2,8,1800,4);
theWeapons[4] = new Array('Sling',0,2,10,1800,8);
theWeapons[5] = new Array('Staff',0,2,7,1800,1);

theWeapons[6] = new Array('Helmet',1,2,34,2000,31);

theWeapons[7] = new Array('Club',0,5,14,3200,8);
theWeapons[8] = new Array('Crossbow',0,5,12,3200,4);
theWeapons[9] = new Array('Pike',0,5,13,3200,2);
theWeapons[10] = new Array('Long Sword',0,5,11,3200,1);

theWeapons[11] = new Array('Shield',1,5,38,3200,31);

theWeapons[12] = new Array('Longbow',0,10,16,5100,4);
theWeapons[13] = new Array('Spear',0,10,18,5100,8);
theWeapons[14] = new Array('Lance',0,10,15,5100,1);
theWeapons[15] = new Array('Mace',0,10,17,5100,2);
theWeapons[16] = new Array('Scimitar',0,10,5,5100,16);

theWeapons[17] = new Array('Chainmail',1,10,41,5100,31);

theWeapons[18] = new Array('Warblade',0,30,22,16400,8);
theWeapons[19] = new Array('Steel Bow',0,30,20,16400,4);
theWeapons[20] = new Array('Broadsword',0,30,19,16400,1);
theWeapons[21] = new Array('Warhammer',0,30,21,16400,2);

theWeapons[22] = new Array('Plate Armor',1,30,45,16400,31);

theWeapons[23] = new Array('Steed',0,64,24,50000,4);
theWeapons[24] = new Array('Steed',0,64,23,50000,1);
theWeapons[25] = new Array('Warg',0,64,26,50000,8);
theWeapons[26] = new Array('Hammer of thor',0,64,25,50000,2);
theWeapons[27] = new Array('Dragon Claw',0,64,6,50000,16);

theWeapons[28] = new Array('Heavy Shield',1,64,49,50000,8);
theWeapons[29] = new Array('Mithril',1,64,46,50000,1);
theWeapons[30] = new Array('Gauntlets',1,64,48,50000,2);
theWeapons[31] = new Array('Elven Cloak',1,64,47,50000,4);
theWeapons[32] = new Array('Mist Veil',1,64,50,50000,16);

theWeapons[33] = new Array('Dragon',0,256,30,200000,8);
theWeapons[34] = new Array('Flaming Arrow',0,256,28,200000,4);
theWeapons[35] = new Array('Excalibur',0,256,27,200000,1);
theWeapons[36] = new Array('Battle Axe',0,256,29,200000,2);

theWeapons[37] = new Array('Dragonskin',1,256,51,200000,31);

theWeapons[38] = new Array('Chariot',0,600,72,450000,31);
theWeapons[39] = new Array('Invisibility Shield',1,1000,71,1000000,31);

theWeapons[40] = new Array('Blackpowder Missile',0,1000,70,1000000,31);

theWeapons[41] = new Array('Rope',2,40,58,40000,31);
theWeapons[42] = new Array('Dirk',2,75,63,75000,31);
theWeapons[43] = new Array('Cloak',2,140,65,140000,31);
theWeapons[44] = new Array('Grappling Hook',2,250,67,250000,31);
theWeapons[45] = new Array('Skeleton Key',2,600,73,600000,31);
theWeapons[46] = new Array('Nunchaku',2,1000,75,1000000,31);
theWeapons[47] = new Array('Big Candle',3,40,62,40000,31);
theWeapons[48] = new Array('Horn',3,75,64,75000,31);
theWeapons[49] = new Array('Tripwire',3,140,66,140000,31);
theWeapons[50] = new Array('Guard Dog',3,250,68,250000,31);
theWeapons[51] = new Array('Lookout Tower',3,1000,74,1000000,31);


var Upgrades = new Array(new Array('None','Flaming Arrows','Ballistas','Battering Ram','Ladders','Trojan Horse','Catapults','War Elephants','Siege Towers','Trebuchets','Black Powder','Sappers','Dynamite','Greek Fire','Cannons'),
new Array('Camp','Stockade','Rabid Pitbulls','Walled Town','Towers','Battlements','Portcullis','Boiling Oil','Trenches','Moat','Drawbridge','Fortress','Stronghold','Palace','Keep','Citadel','Hand of God'));

var UpgradeMultiplier= new Array (0,1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768);

var memberColor = GM_getValue("rfl_membercolor",'#021705');

addCSS('.cursor{cursor:pointer;}');
addCSS('.member{background-color:'+memberColor+';}');
addCSS('.font70{font-size:70%;}');
addCSS('.tdnb{border-width:0px;}');
addCSS('.underline{border-style:solid;border-width:0px 0px 1px 0px;border-color:black;}');
addCSS('.topline{border-style:solid;border-width:1px 0px 0px 0px;border-color:black;}');
addCSS('.noline{border-width:0px 0px 0px 0px;}');
addCSS('.cp {padding:0px 2px 0px 2px;}');

var im = new Array();
im[0] = "data:image/gif;base64,R0lGODdhiQAWAOfaAAABAFMvLlQwL1UxMFYyMFczMVgzMlk0M1o1NFs2NVw3Nl04N1k6Nl45N1o7N2E7Ols9Pls+P1w+QF0/QV5AQV9BQmBCQ2RGR2dISmhJSmlKS2tMTWxNTm1OT2tSUW5UVHVVVmpZW3NZWHZcW3ddXHpoa31pZoVqaYZraoFtaodsa4BucIlubYRwbYpvboNxc4h0cX55eIp2c4p4eot5e4h9fY99f5J9epB+gIuAgI2BgZWAfY+Dg5CEhJKGhpqFgpOHh5uGg5GLipyJi56JhpmNjZWQjpyQkKCWnKKWl6Gcm6Sfnquen6yfoKahoK2goaeioa6hoqmko7CkpKympa2npqeppq6op6iqp6+pqKmrqKyqrsKlpKqsqa2rr7Crqautqq6ssLGsqqyuq6+tsbKtq62vrLisrLCusrOurKuwsq6wrbGvs7qtrrSvrayxs7KwtLuur7Wwr62ytLCyrraxsLGzr7eysb6xsrizsrazuLm0s7q1tLW3tLy2tba4tb23tre5tsK2tr64t7i6t8u1sb+5uMG8usK9u8O+vMS/vcXAv8fCwcjDwsrEw8vFxMzGxc3Hxs7Jx8/KyNDLydHMytLNzNPOzdXPztbQz9jS0dnT0trV09vW1NzX1d3Y1t7Z2Nnb1+Da2drc2eHb2tvd2uLc29ze2+Pd3N3f3OTe3d7g3d/h3uXg3ubh3+fi4OHk4Ojj4uPl4erk4+Tm4+vl5Ozm5ebo5e3n5ufp5u7o5+nr6O/q6PDr6fHs6u/s8fDt8vPt7PHu8/Tu7e7w7fXv7u/x7vbw7/fx8PHz8Pjz8fn08vr18/z29fb49P339vf59v749/j69//5+Pn7+P/6+fr8+fv9+vz/+/7//P///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ywAAAAAiQAWAAAI/gADhIiRKokrAERCDIzBUKBChgsZxogosaLFixgxLhyosKPHjyBDdnQosqRHhwFQxvCUKpWrXTEAyAzhChOhJCGIPdt57FmvZz19espGdCfRo0iTKl16dCczZMeUMQMKNChPYruy7srFtavXr1y15tJKNitYr1pdYXV1DGuqlS1d5UoFIACAJIwY+dkVgBCmQoy4EOHCKNvQXiG4HM11dCjTx0p5HgNWK9etlqk+ecLEuTMhP37YtOlipnSX06S7iDkthg2bO3dAfyZEmzZo2GzMoBZTmg1oP7QZERJOhCEhT0/kMqqrEBPNEESIYHpyjAt0TNliuMrmqtBRRr2I/h6DTL5pr2PHhL26JQszqU+aOmN6ZNuOnd2oUes+XdpO7N8A/naHHabpZ4ZvwBFyx3B6PeSJJ0nEkBUAMREUAxtdxOAHJj8xkhB2RBSWzU+u9IIdUs9kg12KKJb3jCfGHDPMLK/IssoqqZzyCSfyTfIZaGtc0QUYZeSn2xilmWHff7U1aZsfAxKYZG+/iRGdH4wUspAnjKTyRBK7AOAJAAp14QojATzBiCeFuOKKYs8U4th4RLnCYp3HzHnUMduR90wrychIIyytrHJKKDv2OBsdZWQBBhljgNGFFqqBMUYZZbT2GpOz1XbbHa6JISpvSkIpRhLRocqIGRE+6BKY/gBkE0ASqQTA1axcFEKEK1xmwycmd+7ZYmNNKaXKCQo04IIr1jSjSzHFzNiKKziGEoonm6TEWSWE/EGIG2mUMQYZYWShxbllWIpGGUraJ5uTnvphH4FdPEHagX4k8QQhbRAR4aqtsuTKHWHKREQqG5IZQhtyFpKrYVwEe1R4S4moFGO9VLDBK690YEEtyvjiSzAzotJKKqTcIUInmmhbSSSE9BGIG26Use6kWJy7mqX9/ZcgvD9CKaUYTyQJmh38EtGGcKzC5dJYMgm0q0x15YUJF1yclwudI05MMVGOZcMI10oNEYAg11wjSAA/HBMMLr0EMwsqqmSWEieZVKJ3/iWOJOLHH3fUDIYWV1RhxbnmDhnpga+96+RtrplhL3+l/RxcXk2z5BKvANwRwEQxPBFTCJiw9MTXTJHd61F9LtVBALZQY40tAWwgY0pnPABCJaekpG1KlVDiSAsMJGBCFllckRIQEDjAQxZGZDCAAR444Z/j8N5235RUyiZGXky3GhfpUYcQwFtJBLBhLt0ddcdSPRVVXlIIBADNTs4EcABUKd3ARAAsEMUnXJYSSkzCBgHIAQ0CsILCpWQFQggABK4AgQAooQgB0IAZYIO9eMHGDKMSldF+kwQGAcxpqQgBIcgkkC4URCaMwMQu2nCnAJCndfPLhgEC4AxmMEMZ/gEwwDKAGABUiEKC10qJJCaRkklMwgIByAIVJOjAACxhigLIQgICcIEaUKE0HLScB+8AwhCWRgzAAQ1ehEMIMzBEc7zCBEJikgo74KQvmMhF1o4SA/KELSlkQ8oGAvAKH6Kidj9MCS9qEYABIColkWBiACYhiR3eIQuNvILyorhJMeigfgFQQA+SEJsn7Ato2ruXGaJTqtCIYUF6Kc7njpOKXJBPJjG4jy0B4BdM2OkoJ8rh/IIQADxIAxpxYFszlpESUpgiABR4ZAAqIclIQAKKYoBCACawhS2kJAtVSEkZ0pAFH5AgAAnwGdCeBKWilcaU+PLDExKUlwgFzCV+/shFXRgihpfIxC9zCdsuJCa/guZQFxTQACpQoYEK2OIZzEjJDqYQABicQhQKCEAkKpGSRzxCBgHAwQwC8AIvYDKKVkjJGDIQgCMoIQAWuJ4Ya4MqoUlJcqmZJ3Da8IQ2EKIQqFqJwMwQphAs52ky2VAqdoFDxkCGLcLMRitUoAAFoAAV04hGM1ISBQWMQBM5agICRMDRADzCEYpIQVVL4IUwiOGbWEgJGJbwAQMMQANI2FQHaeMvKLEhhKKbSBKAE6EQybML9zxTwRjikpjcBROMeMYuokpZpKTtGlndagCMsYtauCJHp/AEj6h5VkUYwg9uCAMawECkRp2rC5Ay/kO42mWHvRLClEnogn3gearQEeEJsRnMcD4T2Ad5ogtcqYsd1uQmXMrwGKmo7LCEmdWIbnYXs2DFKkKho05sSxKMSMRp3cAGNFwqUmI4F5HGcKlMuSaM8DKl6J7w11HpywwAEsNte9qvgWAiLgAIUwxoxQhXhCCpecwFQaUrTGs8Q7OcZV+OUvGgzvANEYCAEhzUwN5MoYa1SEqSTGcaL6FxL55mGM5vCSHLGJhBcyEomB0mcpAD+2WgC2bw/K4RjapgRcItqfB3FQEaPcDhDZHyMGrGQBp20da29ZnXidVIBNrcQQwTSYjTnpAQADxBjgW2g10CkMdjOFXHlZXMZY8/G+TNyMcRg/BDHuZAByaLKj/8GRUYOfU4KJGxjHoOTV9pw+UkZO5Bp7ELQ3h5pgp92U05RjNkJPOLrbCZwm7ujCMO4YcMn7FA/CHNqN7L5yZ9KlSjKtrRdopbLhy6wDHQZ0AAADs%3D";
im[1] = "data:image/gif;base64,R0lGODdhiQAWAOfsAAACAFMvLlQwL1UxMFYyMFczMVgzMlo1NFs2NVw3Nl04N1k6Nl45N1o7N1s8OFw8OV4+O18/PGBAPGFBPWJCPmREQGNFRmZFQmdGQ2hHRGdISmhJSmlKS2VMS2pLTGdOTWxNTmhPTmlQT2tSUW1TU3NTVXFXVmpZW3JYV3RaWXZcW3ddXHheXXNgXXVhX3ZiYHxiYYBlZH5qZ4RpaH9raIFtaodsa4dzcIh0cYl1cn55eIZ4c4t3dIh6dY15dpB7eJF8eY5/e5R/fI2BgY6CgpKGhpSIiJ2IhZ6JhqCLiJmNjZWQjpyQkJ6Qi52RkaWQjZmUkpuWlKaTlqKWl6yWk6CbmqGcm6KdnJ2fnJ+hnrOdmqahoKGjoK2goaeioaKkoaijoqmko6ulpKympaaopbGlpa2npqeppq6op6iqp6+pqKmrqMKlpKqsqbCrqautqrGsqqyuq7Ktq62vrLOurK6wrbGvs7qtrrSvrayxs7KwtLuur7Wwr7CyrrOxtbaxsLGzr7eysbK0sb6xsrizsrO1srm0s7q1tLy2tba4tb23tre5tsK2tri6t8u1sb+5uLm7uMG8usO+vMS/vcXAv8bBwM3AwcfCwcjDwsrEw8vFxMzGxc3Hxs7Jx8/KyNDLydHMytLNzNPOzdXPztbQz9fR0NjS0dnT0tPV0tTW09rV09vW1NbY1dzX1d3Y1tja1t7Z2Nnb1+Da2drc2eHb2tvd2tze2+Pd3N3f3OTe3d7g3d/h3uDi3+bh3+fi4OHk4Ojj4uPl4erk4+Tm4+vl5OXn5Ozm5ebo5e3n5ufp5unr6O/q6PDr6fHs6uvu6vDt8vPt7O3v6/Hu8/Tu7e7w7fXv7vbw7/fx8PHz8PL08fjz8fP18vn08vr18/T38/z29fb49P339vf59v749/j69//5+Pn7+P/6+fr8+fv9+vz/+/7//P///////////////////////////////////////////////////////////////////////////////ywAAAAAiQAWAAAI/gADnNCBa0ovAEhODNTBUKBChgsZ6ogosaLFixgxLhyosKPHjyBDdnQosqRHhwFQ6miFC1cvZToAyDzRa1SjKSeohdtpLRyzcD19tlpHdCfRo0iTKl16dGe3a9a0dQMKNChPasqyKkvGtavX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";
im[2] = "data:image/gif;base64,R0lGODdhiQAWAOfpAAACAFMvLlQwL1UxMFYyMFczMVgzMlk0M1o1NF04N1k6Nlo7N109Ol4+O18/PGBAPGFBPWJCPmNDP2JERWNFRmVFQWVHSGhHRGlKS2VMS2xLR2ZNTGxNTmhPTm5PUGtSUW1TU3VVVmpZW3NZWHddXHheXXZiYHdjYXhkYnpmY3xoZX9raIVqaYBsaYZyb4dzcI1ycYl1cn55eIp2c4t3dIh6dYl7dpJ9epGDfpCEhJGFhZKGhpSIiJCKiZaKip6JhpaRj5eSkKSPjKWQjaCSjZmUkqaRjqiSj5uWlKqUkaKWl56ZmKeYk5+amaiZlKCbmqGcm6SfnrSem62goaijoqOloqmko6Smo7KjnqulpKympaaopbGlpbSloK2npqeppq6op6iqp6+pqKmrqMKlpKqsqbCrqautqrGsqqyuq7erq7Ktq62vrLusp7OurK6wrbGvs7qtrrSvrayxs7KwtLWwr7CyrrOxtbaxsLGzr7eysbK0sbizsrO1srm0s7S2s7q1tLW3tLy2tba4tb23tre5tsK2tri6t8u1sb+5uMG8usO+vMS/vcu+v8XAv8bBwMfCwcjDws/Cw8rEw8vFxMzGxc3Hxs/KyNbJydDLydHMytLNzNPOzdXPztbQz9fR0NjS0dLU0dnT0tPV0tTW09rV09vW1NbY1dzX1d3Y1tja1t7Z2Nnb1+Da2drc2eHb2tvd2tze2+Pd3N3f3OTe3d7g3d/h3uXg3uDi3+bh3+fi4OHk4Ojj4uPl4erk4+Tm4+vl5OXn5Ozm5ebo5e3n5ufp5unr6O/q6PDr6fHs6uvu6vDt8vPt7O3v6/Hu8/Tu7e7w7fXv7u/x7vbw7/fx8PHz8PL08fjz8fP18vn08vr18/T38/z29fb49P339vf59v749/j69//5+Pn7+P/6+fr8+fv9+vz/+/7//P///////////////////////////////////////////////////////////////////////////////////////////ywAAAAAiQAWAAAI/gADiJAxS0kuAD9EDJTBUKBChgsZyogosaLFixgxLhyosKPHjyBDdnQosqRHhwFQykA1a1YuYzIAyBSRq9MhJSKgeds5zRsybz19okJHdCfRo0iTKl16dKc2atOuaQMKNChPaMayGivGtavX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%3D";
im[3] = "data:image/gif;base64,R0lGODlhiQAWAOeEAAABAFMvLmZbW4J3d5eSkKeioaympa2npqeppq6op6iqp6+pqKmrqKqsqautqrGsqqyuq7Ktq62vrLOurK6wrbSvrbCyrrGzr7eysbK0sbizsrO1srm0s7S2s7W3tLa4tbe5tri6t7m7uLq8ubu9ury+u8K9u8S/vb7BvcDCvsHDv8jDwsvFxMbIxc3HxsfJxsjKx87Jx8nLyM/KyNDLycvOytDN0c3Py87QzNXPztPQ1dTR1tjS0dXT19nT0tbU2NfV2drV09jW2tvW1NzX1d3Y1tzZ3uDa2drc2eHb2tvd2uLc29ze2+Pd3N3f3Nvg4+Te3d7g3eHf49/h3tzi5OXg3t3j5ebh3+Hk4OPl4erk4+vl5Ozm5ebo5e3n5ufp5ujq5+nr6O/q6Ors6fDr6fDt8vPt7O3v6/Hu8/Tu7e7w7fLv9PXv7vbw7/Px9ffx8PHz8PL08fXz9/jz8fP18vb0+Pn08vr18/T38/z29fb49P339vf59v749/j69//5+Pn7+Pr8+fv9+v7//P///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAP8ALAAAAACJABYAAAj+AAcNMRLlypcvBMbw4TOoocOHECNKnEhxocWLbvi4ybjQzZiPHw+KHElSJMiTKMeUNInSo8cvUwYMiVLwyxgAAmkaREhCh0KKQIMK7ehRpRUpUYwMGaJDR42nLUJ4mOqhQQMJVrNilcC1K9UQYMOCpeqhq1kJZEOYMKFChQkJBGTqtIlz6RSDYwiE8OlGaNA/fiESDXllSlKmTZ/WiEr2atbHV89+FSuW6lmzHsKaQNEWBVy5NW8KJHjFIIGeY/oGngh49SBARF+Wprm0hlOoI6aiheCgAQTIvnlD4HqB6ofjx8mW5frY61S1nN1+Xhq6LmmbBEz4ZOj6oSBBfwT+ufazkM5GlbOjDAli43YNGCJ0d8DqoHfW+hDy67fQgSxy5ctdNtlabb0V10DVjSaFFQedpsMX3HXXUCCB/BGIeED90RpsfNThxhroVUGbD+0pBoMKH3iQwQZY/XYfbw4MByMF/SEHwo3/6XYZV18RKN2B14lGHV56bedQAEgemeQgS34nCCCA9AFIIA19t6RDGvaxxx0LybEGGmF0UYWIUSBZIpIBpPABkhlI4ABW9/Wmn30TGGfjjZYxpxVaPUanwnRzCRmkg6kpGYChEVEYCJR79EHhH1MuGp4gVOZxxxxvtKGHHm6IUQYYXWBBkxNmOoVmCiAgeYEEw9mX1QL+DjzQGwMN0NjBBv4lpyOcVvH4nFpstQVogjOFVuRPDaGZrLJMHvoamn7ckQeaUiKZRx9oIslGGmnAkW0AWUwxhRNMDGFmtiisGYAFrKJJKwMMLJAtAw5c8C1Z2S73LZ8eoBmsgTIFWVcUdzW4F4SGHprtssvegeQcSDocACBIviFxtmyw8W0AhlXBhBI9IHkDkjIEUEK/F1AQAZIMILkAvEgmgKQC9W7cQQcbc7XxVEiGgGRbfx4Y6MB3XZGXB3wlzGSzDDd7xx556IEkH4BAjWQbdmgr8RveisGFFkgu4cQUSAzBA5IzIBlDthRYsHIDDCgQswIHLJBAywfUHMD+ikhusAGb9gagcwBWIclzAMB2Nixedc1E5F7IMq0w05R/S3G20wZgR+Zt7IGkHXEEQIYYXiBZBBPq5eCD2gG8wEK2EgT+7QIHfHuABBn03UHuGeS+gcoSCB688Eii9W2Bi9MlkONGHxthksouueSigaA55eVo5uEHknT8geQeeASghhljmI4EFEHkwB6aLqyQLQS5B7DAAgYUULfMD8AqPwV/B9Bf7hXIXQciUDfiEa4BhvvKz1TgmQM5Tnl22Qmhnqcw6DnLgk5CUwbRBCkk6aF6AfhD5tCApiQcoQpFCAJT0BSDE5CgeBHIwANchiQDyCsAEZghDmlkOHVhoH/+GLjh4AoXgH4VUS0BQB6QiHUdhHhgCJGzYNOkt7BvNYtSSAKEIJAUiD3w4VtXaAJNlkAEIIhsBicogaogsIEI3BBJCMjfxjKAs2xVQAO3ytZ8hkdE42VLiaBhXE6kIEHIRUhCQnEShgYhCD/4gVNuQFIXrvCEKDShCELQwQ5qMIMVoCAEfpPABiAwgQg4gHYKiIAbJRABCVDgAhuoIwikUgEOTAVPHmDRjtKyGUAWS5AzKRhCIKcaRBoTe2jiwhWQQkYglIgGMUiBCPpDgQy8iTfwotdv9CMBC8SyZyH4AAY88AEceeBWO+KRVBLHwOQJ6YHDNJIxj/lFNI1hC5TsjMIShvCDEtWABi3IjQcscIH8xAhu2ryKfqopyxt1oJzmvJmeesUvsPgIYL+E4APz0hOEzRORgSCKGsKgBSxQIQpOGIIPcOCeFsTHAxewZox4Y5WDDqcrxflVCG4UFhDkaZfPueh0BJaTgjTPkB9FpEU2cgYwZOEotOmnYhYjlYGOUkb2OeibMKNTylQ1QAIKarCCFkiN1iSeHk1qd2JzkPQwxTaKYUxZqhIZV/0mrJnx6lh2JZnMZKaXPyrrO6PAoC8MQACIFcAAFsvYxjr2sYxV7GEhS9nKKvayic2sZjfL2c569rOdFSwAAgIAOw==";


im[5] = "data:image/gif;base64,R0lGODlhDAAMAIQWACb0ECf0EUD1LEr2N0z2OlD2Pln3SF73TmL3UmP3U2f3V2j3WGn3WoD5c4z5gMr8xc38yM79ytH9zNP9ztT90Nb90v///////////////////////////////////////yH5BAEKAB8ALAAAAAAMAAwAAAU04CeO5OOQJHQABvpFCCC3o5TIOD0peF9Qi0CvR6gwhEMZQWREEknNJyoKGLiYR8F1VGmEAAA7";
im[6] = "data:image/gif;base64,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";
im[7] = "data:image/gif;base64,R0lGODlhFwAfAOeAABITFOLi4nMAC6qv0Li5uuvr69zc3NPT08yttczMzK0AC8PDw4uRsgATcPLz85qZmv3+/TZHoQAXh6inqGxzlm56uHBwcK+OkdXW45oACAAfzX8AB3iBqQIgl01NTsPG30JPin+AgpdzdgIksgAPUVttyJBOVLi70AAVpV5rq+Pk7iUxaunq8Fxmk6ttcpGYxKWovE9Xe93l40tapcEAC20pMIQqMy49huzr5hUndlAACb6nqeHU09fIyc7S0T5Tv6Go1/r6+Is9RY0ACoOHntXb2q99gcLD0NDS3vHx75uChOTr6t/f36dFTsW0u5uesTk5OZsBEdbV1TpCaPb7+u7x8n1PU4cdJuXl5dra2WkVHbqancnKyhMgWdS8vqRfZeru7tDQz3M5Px0znu7u7crPzt/p6LSzsp0qNejo6Nve5LGxvo6QnZ8SH6Cfn/X09MzN1ycoKPD39cXFxq2trdHX1ngPF8fHyL6+vpBeYpCOj/f39mFhY+Pg3tjX1wAAAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAH8ALAAAAAAXAB8AAAj+AP8IHEjwD4CCCBMSjKOwYUE+DgWeYZjwjMIJBLOQSVMgCZaBBAQCSBCGwIIFbgomCUCiARc/f87Q+eNhgQ4BOjbgQXiARJ8GDUAcWfDgjJgNSDdMCJEwSYOfQSk8EJAU6c6EAVBIODIjB4ipVTdkURigQ4QPNyRImGonqR0oCpmo+BHkzYm1AgLYMDLkQkM/QD78cNCARdEAVYoYCdMwSwogDhyofUBgTgADRRIcTJjgRwkOFUag0CNAwJW2X2AmxKLBM4QKHR5syKCAhu0ACf040NBaxYcKbGbXpmEEN8IEUSCkQDEjxQDZtBX4eHKiAEIutZM72MOhwYMATGCkoKAAw/hAKD4UQBCgIEMGCCS6APWDAkUF8yK5DFGwRcAQ9264kUMYc0ygFmMFLbDBEEMkwWAGD5CwRg4whHHHAEwgFMYCQyy4xH9utPREDml0wMRmBUkRBlL+ZTABCXg0gFYAFCV0xwEiLJjBEyFK4IAUEQkUhgH/sSFhAWkEOVAaWGzwwBNSpKTkkmnocccDUxIEQAB0TIBfln/MBGZBGI0JZkAAOw==";
im[8] = "data:image/gif;base64,R0lGODlhFgAfAOeAALjFruPj42yIUChHDHZoTcLKtnNxbC4nGlNRTId1VTMyJsW3oUU0Ibm4tezs7PT09Jiuidzc3NTU08vVxMzMy5mYlY+GS6mopdDayv7+/tvh152RLK2ab8TEw5FtLKO2mLS8rFBvMW5xN66OTsyxdGZbSerl0bGobomIhRwxBI2meqSknqCemikbDmZRN9Xd0a6+oxcSCggFAlRJN0dHOxsYEkJUDF9xS8/Ak4SbdYGAekpnE+Pp4dnb15aTkOHVtZqFZD5CJ7ipg8rMxVZVOklaOLe2lxEKBZaKeJKOiG96EbCuqZuTX8TOv9PQyEBUJHREC87BXbqgVKiiin6XZe3x67OtmOnr54iCY+Dd2Z6TcpCaiKi2i767ilNAKltfKN7QncrGwQ0aAfHz8Pj5+d/l3fX39PHx8ebu5snJydfY0uXm5WJgXdHCNe/v79nZ2SEhGdfX1/f399HS0ODg4MfHx+jo6Pr7+0A+Or/Dvc/PzrOysLutMtzZ2MC+ugAAAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAHwALAAAAAAWAB8AAAj+APkIHEiwoMGDCBMqVAiHjwIWAzMglDDww4WBEQRoeMHjhcEPaWCoEACiYBklKQYMkAADQggUMAS0+PPnSUOCGBiccLHDC5w/cGTIGCBGhhgIBhVMcbHCgpcKNWTQdFEjRo0JB9dAcUFHRxIWQv8kCBKEAkI6XghkuHMg7B8OcLyYPfimT4kSDyoITaEgwREdFA9KsNOnzwMDAmq0eKADDp4eCN9M4HLnQY3LADRomBMjAsIyWwpQaSIjxhEJc9LEUaDhYA4zVLoAKADHdI0/DODAmbPGoB4DJWZIyDLgSIwWR0rUgNMhgEEJUJJkwONFQxw8MxnE2bPHwU2BBli1eOAwAi8ZGgY6RFgR5AAbGr0HUkACpIoWG19S+mBwhEWaAwo0QAdBeDQgBQMC7PBECmIc8YQMNXTQBB5FxDeQHxsksEAZOwTBQAwxoEBDET1AUIBBe3RQAw4iFPBFbgf8scUTCmDgnEEGzNGFAE8w0IIBRcRwAAoaOKDQBBokUEILLfhQgx9rsLEQHxEE4AIDPjpgx5QDObAGAS3QsSWXXTrAAh0GkCnQRWtARIOacMYpJ0IBAQA7";
im[9] = "data:image/gif;base64,R0lGODlhFwAfAOeAAHqVAa2ybWZ9AG5wWRoaE7GxitTUbIelAP//5///0/fyu5e4AOXlq4CcAf78wmuDALjEaouMcfPtto2WTUVVAlZqAeboytnZpf/+3abJAdbZmYaVNpmmS///zXOMAJeXkaa0UHuJMMfJkpKkNfv79LS0pu/ps+fp1f//yMPLgNjikOzmsG15MV5zAbu/gcfHtn6FTPT0w+PahUxLOtzfqb69l9TTuu7qvHWJGPDtwcfHpsnSgzRBAfLxzfT0083TluPeqWZ3FNjZw+bjmqrELOPjss/ahn6TGqC3L5+nYlRhFrPbAP32vu/vyevvteXptKbHEvr5x5q4EePlu19fRqrQAMK/XZy/AIeeG42rAfT03OfqvPDrpu3u5X19aJiadU9gAZOsHM/Nmvz7yPr5zeHjzrzlANPUovf3zW2CEJqdWuHhxPT2yDc2KpybnPz8ztXNfeXtqPb31GBtHdHQopKyAaSkgfn34qHDAPr72XGAIu3t0fj3wPr61KemnAAAAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAH8ALAAAAAAXAB8AAAj+AP8IHEjwT5uCCBMSnKGwYUEvDgUOIKCwhMI2VAaiSBCjBwIMA7sMzJFDxoqTBTv8mEOhiAOBJASaKEABTIUVCBPMudBCgJoOHWy8WNFTgIAQOHO2oNGTw4QTRY0KAKKwgwcBNfS0SAJVqlEJCp88AAGihYcHJFocecBWgBiFA6YcwICgh4AyLTRAEOABB8OEbZo0kYJBxJMTL5IkQOEBwsGEX37EIIEBhwcLEfR0QKEAAsSEKHbE+SElS5a0agJA2FDnjUIUeFSoQICkgQUBAA4syJChQ0IqHRZAiWMEBI4TAhpkWVBFSofHBE2k8WFkwZMtfW7nrmOEBoQECCWz1Lly4CPdByWmoHDgQQUE3wVN1CHB4UCDBiIqUGnRwgSABhrAF10DB2wwAgD/dWEHBShIcMF9fCC0QhAIJuCBBw2cQMEPYDDARwdhCDiQHSZc+ICFGYIBBlFReIBCBAnVoEALD/QEgIYStMCAAB0U0NAAfNjwwIUnFADGA0LkkFFEDozxwI0UXJAAeBEN1EEMG5wwRw5UVjnQlGW80KWXAlmRAAkv1EAmQjGtidALbsb5R0AAOw==";
im[10] = "data:image/gif;base64,R0lGODlhFAAfAOeAAMymaaemkOLi4Xd2b+jbyUoxBri4tdS1gDU1Iy0rHOvr6ujh10dIKNPT0n2DTdvb21FRSsfEtvPz8/39/WNoOVdHF8zLy4WMT8PDwqeno1dbMmZBAuPOr5eYjA4NC9jTylJWLvHn12VZJpycmICBd5h9SbFxB7WDMsW2oLCVZ3d8RbGNULW1qI9vK4mJg4VVBWVnStvHqkxRLNXJuJeZfYKEZXh6W+vq5nlLAWdnYvbw6V1iNdbOw/Ps4mZTG9e+knJZGczKxLB7H1VNIaaYgJ+hhXtTC8ORP0JCPZRkFN3b1c7BqmhhLJOVbG1xSWFHDz8/ImluPbqkgXxhJOLTvXB1QN7Fn+3eyYuPaCkdBH5pNFxdQvj18Ozm309ROV1dVIBuR76+uo2OeG1vWvr5+eXl5ZiJZtfX193XzXRtWt/f3pqdc8fFvx0dF/b29s/Px6+vrpCQirGum4iIdu7t7VhNNOjo6JOSf9DQz29ODsnKv/Dw8MfHx+/j0Z5fAQAAAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAHUALAAAAAAUAB8AAAj+AOsIHEiwoMGDCBMqVKhgYZ0ZA+mUodMljMA2A5csOXBAToyBCu6MkVEmTg4JOSBYgCBDRgWLA9XIECmDwQA5CBi0bMnAAsEcCGTEGSmDApQNT5BugElQwA4QftzIYAKl5YarEQyWGRMAwA8bVGU8ATFkAx6DYXaEQbCHQRcvMkCA0LBBgMEHVQJMkODkTwEZUOZoENGwoBoVWNwY+KPHS4YbZ6xMsVtQgQMnNmoo8OABSRsbd1qoKXjygooqNWyUacPZgQMoowniIeM6ylMYDP7YcHKhRhg7squQmVOFSR4cBU7sYNCgQxPKdcBYYOKHyQ0JXDYU+FGGBB8bUaCTx3BBQcIOCkyAkJHSYssZGXx2jBg4AgMFCkpAiDAiAgGCBhB8IdAfBGGggQYgxCFCHiIkAAUUBkBwkAV4yAUDFCJoMEcODAwhRg4T4tGSFDggVwIYc5VxlkFX4CHCEyUWUMABV/RRQUIJPKBDjAWEEIJDddT4wgl99ACkQH3oEMAVR9YBRx0SSFFHAk1CWeWVVwYEADs=";
im[11] = "data:image/gif;base64,R0lGODlhFAAfAOcBAAAAAP///7OJmI6Biffr9M2/ytnG1nVsdAwEDB0bHZWFlhYKGKyfrjYrOL+xw2lab56TorSpuCURL+vb9FZIYcGq1IV5j0Y4Vl9aZWxffaOSunpwiIVvpzIkTJeIsrGhztbI78rA3SMhJ1RTVhQGNYuGl6SgrSsnN5SRnsTCzLSyvgkHFkxKWKuqtQQEDBQUHuvr9Ofn6Nzc3dTU1by8vZycnYCEnNTb6svR2bvDypyjqOz0+YOJjMTMz2xydKu0t7S8vpOdnqSsrPX29gQMBBabBBV9BBJMBCavBLS8soyWiSw0KQoWBT+/BDedBExUSKy0qChJFzeDBShcBFeuDEeFD2WuI0mLBTlpBRgqBVKNFFSMHMTMvClHBUJuDlqWFlSEHGm6BHvWB0t1FFyNHVN8HVyHJ1qXBmulGFSEFHKYPGenBkp3BlyMFFR8FERkFFyEHDxVFUxsHUReHIy4R0pXNltdWHm8CFiICDlYBiY5Bn+8GHWpGmmYGkxsE4nCJn6wJWyWJVR0HandUWiDOmWZCEVmBl2EFJ7eKWSLG3WhJis2FztGJ6jFc1Z6CFRzFF18HmeGJ0xiHTlJF0lZJ8v1dnmrClx8FERZFFRqH4KjNlpsMGaKB3icHExjEjhJCZmsZHaWCl9xIVhhOfD1342bTl9vD32IPo6UbHGADH2EU25yTVZfBqKtQHh/MczNw1VYKHh5avn66nF2FWxtNwwMBBcXCDc3GmRkRzc3KEdHN3FxX6iokIKCcCsrJqysomVlYaSko4ODgiYlCTk3ByYlGFdWSkdEKMC+spmWh9jWzPHippCNgeXi2FhPN8rBphgXFLm0qKCckurgyopjGritmTYqGcB7ItK3lNXLvltAHtOpdNfGsuHTwZFtRXFVN6uBVriVc/bq3mxrasXEw1wwCLefikAfBWZeWKyjnaSHdY9/do0zBoZoXSwNBTYqJxYJB7mnpVVKScCxsAwEBDs5OUlHR3l4eMzMzLS0tKysrJSUlIyMjAwMDAQEBP///yH5BAEAAP8ALAAAAAAUAB8AAAj+AP8JHEiwoMGDCBMqXECC4DuFAgEoKfgHX4x80SCwEOhLILdnAGgEIBiARZ5HM8bZuwfMTqk1feiwyUdwSB9KecYkomKrWKE+gP4A4COjGEF6fhhh8dNpDyc6ImwBACANVEFyfj7poeGnGLQsAIxRW/BsXMeBNLCMotYuT7Fbg2zZSrSGHItaIgbuk2Khi7A1QYUCSuRFhsAGA8l1YcSv1JhzfQAUAyYnkYxFBWnkySLs3tA94/bxUCUoSK2CMyhNydMlEIBh0AA4k4Np37GCSd50wZInT79aj/y9eRSlxggJA2fUyDQJkyEsw4TuiiPI0DjDA2vA4ZFLzpw8oADBUAOAycQoWvjqDVQBR48ffvpe9bkSbs+mCAAE0fgz8EEiYZgIEogzr8QDCR4FABDBP8KM9E8N+CgChwN9zLKKIXzIYUAesUSkzEC/KKIIR4K4I0Yba6yh3j9L/JOHQOQIBMxAjuwy1YiMDJSEQNFgwGIvpIABSCCmpGELHzAItGJBvfThTyDnOBGPAd2sohA5NIjoDhbPpJPLExBx040a1MQTwym2nAaRNCbcYw5EBNnyTwzh/AMmnAQBgOeefB4UEAA7";
im[12] = "data:image/gif;base64,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";
im[13] = "data:image/gif;base64,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";

var CurrentURL = document.URL;
ThisURL = CurrentURL.split(".com/");
ThisURL = ThisURL[1].split(".php");
if (ThisURL[0] == "base") {parseBase();checkUpdate();}
if (ThisURL[0] == "battlefield") {doBattlefield();}
if (ThisURL[0] == "train") {parseTrainPage();}
if (ThisURL[0] == "mercs") {mercsPage();}
if (ThisURL[0] == "armory") {parseArmory();}
if (ThisURL[0] == "stats") {parseStatsPage();}
if (ThisURL[0] == "recruit") {doRecruitPage();}
if (ThisURL[0] != "error") {
if (GM_getValue("my_ID",-1) == -1) loadthePage("http://www.kingsofchaos.com/base.php");
}


function toGo(t) {
var hr = Math.floor(t / 3600);
t -= (hr * 3600);
var mn = Math.floor(t / 60);
t -= (mn * 60);
var sc = t;
var ms = (mn < 10) ? "0"+mn.toString() : mn.toString();
var ss = (sc < 10) ? "0"+sc.toString() : sc.toString();
var result = hr.toString()+":"+ms+":"+ss;
return result;
};


function addCSS(css) {
GM_addStyle(css);
};

function getBFtable() {
var tables=document.getElementsByTagName("table");
for (var i=0;i<tables.length;i++) {
if (tables[i].rows[0].cells.length > 2) {
if (tables[i].rows[0].cells[2].innerHTML.match('Name')) return i;
}
}
return -1;
};

function getMenutable() {
var tables=document.getElementsByTagName("table");
for (var i=0;i<tables.length;i++) {
if (tables[i].rows.length >= 2) {
if (tables[i].rows[1].cells[0].innerHTML.match('Command Center')) return i;
}
}
return -1;
};

function gettable(header) {
var row  = ( arguments.length > 1 ? arguments[1] : 0 );
var cell = ( arguments.length > 2 ? arguments[2] : 0 );
var tables=document.getElementsByTagName("table");
for (var i=0;i<tables.length;i++) {
if (tables[i].rows.length >= 2) {
if (tables[i].rows[row].cells[cell].innerHTML == header) return i;
}
}
return -1;
};

function loadthePage(page) {
document.location.href=page;
};

function centerDiv(divname) {
var sw = window.innerWidth;
var sh = window.innerHeight;
var dw = document.getElementById(divname).offsetWidth;
var dh = document.getElementById(divname).offsetHeight;
var left = (sw / 2) - (dw / 2);
var top  = ((sh / 2) - (dh / 2)) + window.scrollY;
document.getElementById(divname).style.left = left+"px";
document.getElementById(divname).style.top = top+"px";
}

function displayMessage(nr) {
var Xpos = 10;var Ypos = 10;
if (GM_getValue("moronDivX",-1) != -1) Xpos = GM_getValue("moronDivX",10);
if (GM_getValue("moronDivY",-1) != -1) Ypos = GM_getValue("moronDivY",10);
makediv("moronDiv",2999,0,0,0,0,'#272727','<span style="color:yellow;">MORON</span>');
newHTML = '<table border="0" cellpadding="2" cellspacing="2">';
if (nr == 0) {
newHTML += '<tr><td>Yes, of course, we send our troops out to attack OURSELF!! SMARTY!!</td></tr>';
newHTML += '</table>';
document.getElementById("content_moronDiv").innerHTML = newHTML;
centerDiv("moronDiv");
}
if (nr == 1) {
var url="http://"+ipadres+"/php/getfakesab.php";
getdata(url,function(e) {
var amount = (Math.round(Math.random() * 100)).toString();
var line = e.replace(/%number%/g,amount);
line = line.replace(/%name%/g,GM_getValue("rfl_USERNAME","my own"));
newHTML += '<tr><td><div style="width:400px;">'+line+'</div></td></tr></table>';
document.getElementById("content_moronDiv").innerHTML = newHTML;
centerDiv("moronDiv");
});
}
if (nr == 2) {
newHTML += '<tr><td>What about just opening your OWN pages to see that???</td></tr>';
newHTML += '</table>';
document.getElementById("content_moronDiv").innerHTML = newHTML;
centerDiv("moronDiv");
}
}

function doBattlefield() {
if(null==document.body) {
setTimeOut(doBattlefield,15);
return;
}

if (GM_getValue("my_ID",-1) == -1) loadthePage("http://www.kingsofchaos.com/base.php");
var tag = document.getElementsByTagName('html');

allPagesInfo();
var sendArray = new Array();
var starttext = '<center>Rankings';
var endtext= '<center>';
var repl = FindText(FindText(document.body.innerHTML,starttext,endtext),'<p>','</p>');
page = document.body.innerHTML;
page = page.replace(repl,'');
document.body.innerHTML = page;
var links = document.getElementsByTagName('a');
var blink = '';
var nlink = '';
for (var j=0;j<links.length;j++) {
if (links[j].innerHTML.match('&lt;&lt; Back')) blink = links[j].href;
if (links[j].innerHTML.match('Next &gt;&gt;')) nlink = links[j].href;
}
var tables=document.getElementsByTagName("table");
var menuTable = getMenutable();
var newRow =tables[menuTable].insertRow(3);
var newCell = newRow.insertCell(0);
newCell.innerHTML='<img src="'+im[2]+'" alt="Lastpage" />';
newCell.style.cursor = "pointer";
newCell.addEventListener('click',function(e) {
var page = "http://www.kingsofchaos.com/battlefield.php?jump="+lastPage;
loadthePage(page);
},true);
newRow =tables[menuTable].insertRow(4);
newCell = newRow.insertCell(0);
newCell.innerHTML='<img src="'+im[0]+'" alt="Options" />';
newCell.style.cursor = "pointer";
newCell.addEventListener('click',function(e) {
create_optionsDiv();
},true);
newRow =tables[menuTable].insertRow(11);
newCell = newRow.insertCell(0);
newCell.innerHTML='<img src="'+im[6]+'" alt="DBhigh" />';
newCell.style.cursor = "pointer";
newCell.addEventListener('click',function(e) {
DBhighTargets();
},true);
var last = tables[menuTable].rows.length;
newRow =tables[menuTable].insertRow((last-1));
newCell = newRow.insertCell(0);
newCell.innerHTML='<img src="'+im[13]+'" alt="Approved" />';
newCell.style.cursor = "pointer";
newCell.addEventListener('click',function(e) {getAlliancetargets(5810);},true);

var wTable = getBFtable();
var tRows = tables[wTable].rows;
var newCells = new Array();
var root= tRows[0];
var eTh = document.createElement('th');
var eTxt = document.createTextNode('Defense');
var ref = root.getElementsByTagName('th')[5];
eTh.appendChild(eTxt);
root.insertBefore(eTh,ref);
for (var i=1;i<(tRows.length-1);i++) {
var allianceMember = false;
if (InStr(tRows[i].cells[0].innerHTML,'alliance member') == true) {
allianceMember = true;
if (GM_getValue("rfl_HLalliance",-1) == 1) tRows[i].className += " member";
}
var allianceNr = FindText(tRows[i].cells[1].innerHTML,'id=','"');
var allianceName= trim(FindText(FindText(tRows[i].cells[1].innerHTML,'id=','a>'),'>','<').replace(/&nbsp;/g,''));
if (isNaN(parseInt(allianceNr))) {
allianceNr = -1;
allianceName = '';
}
var hr = tRows[i].cells[2].innerHTML;
var hid = FindText(hr,'id=','"');
var name = FindText(FindText(tRows[i].cells[2].innerHTML,'id=','a>'),'>','<');
var tid = "player_"+(i-1);
var obj = tRows[i].cells[2].getElementsByTagName('a');
obj[0].setAttribute("id",tid);
obj[0].addEventListener('mouseover',function(e) {
var tr = e.target.id.replace(/player_/g,'');
if (!document.getElementById("notifyStats")) {
var nr = e.target.id;
var x = e.clientX + window.scrollX;
var y = e.clientY + window.scrollY;
showStats(tr,x,y);
}
},false);
obj[0].addEventListener('mouseout',function(e) {
closediv("notifyStats");
},false);
obj[0].addEventListener('mousemove',function(e) {
var x = e.clientX + window.scrollX;
var y = e.clientY + window.scrollY;
if (document.getElementById("notifyStats")) {
document.getElementById("notifyStats").style.top = (y+16)+"px";
document.getElementById("notifyStats").style.left= (x+16)+"px";
}
},false);
var tff= tRows[i].cells[3].innerHTML.replace(/,/g,'');
var tid = "tff_"+(i-1);
tRows[i].cells[3].setAttribute("id",tid);
tRows[i].cells[3].addEventListener('mouseover',function(e) {
if (!document.getElementById("min60")) {
var tr = e.target.id.replace(/tff_/g,'');
var x = e.clientX + window.scrollX;
var y = e.clientY + window.scrollY;
showMin60(tr,x,y);
}
},false);
tRows[i].cells[3].addEventListener('mouseout',function(e) {
closediv("min60");
},false);
tRows[i].cells[3].addEventListener('mousemove',function(e) {
var x = e.clientX + window.scrollX;
var y = e.clientY + window.scrollY;
if (document.getElementById("min60")) {
document.getElementById("min60").style.top = (y+16)+"px";
document.getElementById("min60").style.left= (x+16)+"px";
}
},false);
var raceName= trim(tRows[i].cells[4].innerHTML);
var raceNr= giveRaceNr(raceName);
var gold= tRows[i].cells[5].innerHTML.replace(/ Gold/g,'').replace(/,/g,'');
if (isNaN(parseInt(gold))) gold = -1;
var rank= trim(tRows[i].cells[6].innerHTML.replace(/,/g,''));
var elem1 = "rank_"+(i-1).toString();
tRows[i].cells[6].innerHTML = '<span id="'+elem1+'" style="float:left;padding-top:4px;"></span>'+addCommas(rank);
name = encodeURIComponent(name);
if (allianceName.match('TFE')) allianceName="TFE";
allianceName = allianceName.replace(/,/g,'&#0039;');
allianceName = encodeURIComponent(allianceName);
sendArray[i-1] = new Array(hid,name,tff,raceNr,gold,allianceNr,allianceName);
newCells[i] = tRows[i].insertCell(6);
newCells[i].style.textAlign = 'right';
newCells[i].style.cursor = 'pointer';
newCells[i].innerHTML = '???';
var nmb = i-1;
newCells[i].setAttribute("id",nmb);
newCells[i].addEventListener('click',function(e) {
var nr = e.target.id;
singleClick(nr);
},false);
newCells[i].addEventListener('mouseover',function(e) {
if (!document.getElementById("notifyDAtime")) {
var nr = e.target.id;
var x = e.clientX + window.scrollX;
var y = e.clientY + window.scrollY;
showDAtime(nr,x,y);
}
},false);
newCells[i].addEventListener('mouseout',function(e) {
closediv("notifyDAtime");
},false);
newCells[i].addEventListener('mousemove',function(e) {
var x = e.clientX + window.scrollX;
var y = e.clientY + window.scrollY;
if (document.getElementById("notifyDAtime")) {
document.getElementById("notifyDAtime").style.top = (y+16)+"px";
document.getElementById("notifyDAtime").style.left= (x+16)+"px";
}
},false);
}
if (blink != '') {
tRows[tRows.length-1].cells[0].innerHTML = '<input id="bbutton" class="cursor" type="button" value="Back" />';
document.getElementById("bbutton").addEventListener('click',function(e) {
loadthePage(blink);
},true);
}
if (nlink != '') {
tRows[tRows.length-1].cells[2].innerHTML = '<input id="nbutton" class="cursor" type="button" value="Next" />';
document.getElementById("nbutton").addEventListener('click',function(e) {
loadthePage(nlink);
},true);
}

document.addEventListener('keypress', function(e) {
if ((e.keyCode == 37) && (blink != '')) loadthePage(blink);
if ((e.keyCode == 39) && (nlink != '')) loadthePage(nlink);
},false);

tRows[tRows.length-1].cells[1].colSpan = 5;
var pagesentense = tRows[tRows.length-1].cells[1].innerHTML;
var currentpage = parseInt(FindText(pagesentense,'page ',' of'));
GM_setValue("rfl_lastpage",currentpage);
var data = "myid="+GM_getValue("my_ID",-1)+"&data="+sendArray;
var url = "http://"+ipadres+"/php/GM_battlefield.php";
postdata(url,data,function(r) {
fill_battlefield(r);
});
};

function showlastAttack(nr,x,y) {
if (document.getElementById("notifyLastAttack")) return;
var lastAttack= battlefield[nr][12];
var attacksWeek= battlefield[nr][13];
var average= battlefield[nr][14].split(":");
var bfpolicy= battlefield[nr][15].split(":");
notifyDiv('notifyLastAttack',0,0,x+16,y+16,'#D9CF0F','#272727');
var clr = '#ffffff';
var newHTML = '<table border="0" cellpadding="2" cellspacing="2">';

var attackshr =3600 * 12;
if (parseInt(bfpolicy[1]) > -1) attackshr = parseInt(bfpolicy[1]);
if (lastAttack < attackshr) clr = '#FF0800';
if (lastAttack > -1) {
newHTML += '<tr><th colspan="2">My attacks</th></tr>';
lastAttack = '<span style="color:'+clr+'";>'+timeAgo(lastAttack)+'</span> ago';
newHTML += '<tr><td class="topline">Last Attack:</td><td class="topline" align="right">'+lastAttack+'</td></tr>';
var clr = '#ffffff';
var alw = 7;
if (parseInt(bfpolicy[4])>-1) alw = parseInt(bfpolicy[4]);
if (attacksWeek >= alw) clr = '#FF0800';
var lastRes = parseInt(average[2]);
lastResult = "Defended";
if (lastRes > -1) lastResult = addCommas(lastRes);
newHTML += '<tr><td>Last week:</td><td align="right">'+attacksWeek+'</td></tr>';
newHTML += '<tr><td class="topline">Result:</td><td class="topline" align="right">'+lastResult+'</td></tr>';
}

var hrsStr = '?/? hrs.';
var wkStr = '? a week.';
var hrs = parseInt(bfpolicy[1]);
if (hrs > -1) {
hrs = Math.floor(hrs / 3600);
hrsStr = "1/"+hrs.toString()+" hrs.";
}
var wk = parseInt(bfpolicy[4]);
if (wk > -1) {
wkStr = wk.toString()+" a week.";
}
newHTML += '<tr><th colspan="2">Alliance</th></tr>';
newHTML += '<tr><td>Allows</td><td style="text-align:right;">'+hrsStr+'</td></tr>';
newHTML += '<tr><td>&nbsp;</td><td style="text-align:right;">'+wkStr+'</td></tr>';
var alw = 0;
var hitaverage = 0;
var averageStr = "no records";
if (parseInt(average[0]) > 0) {
alw = parseInt(average[0]);
hitaverage = Math.floor(parseInt(average[1]) / alw);
if (isNaN(hitaverage)) hitaverage=0;
averageStr = addCommas(hitaverage);
}
newHTML += '<tr><td class="topline">Average hit:</td><td class="topline" style="text-align:right;">'+averageStr+'</td></tr>';
newHTML += '</table>';
document.getElementById('notifyLastAttack').innerHTML = newHTML;

}

function showDAtime(nr,x,y) {
if (document.getElementById("notifyDAtime")) return;
var theTime = parseInt(battlefield[nr][7]);
notifyDiv('notifyDAtime',0,0,x+16,y+16,'#D9CF0F','#272727');
var newHTML = '<table border="0" cellpadding="2" cellspacing="2">';
newHTML += '<tr><td>Updated: <span style="color:yellow;">'+timeAgo(theTime)+'</span> ago</td></tr>';
newHTML += '</table>';
document.getElementById('notifyDAtime').innerHTML = newHTML;
};

function showMin60(nr,x,y) {
var tables=document.getElementsByTagName("table");
var wTable = getBFtable();
var tRows = tables[wTable].rows;
nr = parseInt(nr)+1;

var tff= tRows[nr].cells[3].innerHTML.replace(/,/g,'');
if (savedInfo[16]) if (savedInfo[16]>-1) tff = parseInt(tff)+ Math.floor(savedInfo[16] /10);
var raceName= trim(tRows[nr].cells[4].innerHTML);
var raceNr= giveRaceNr(raceName);
var amount = tRows[nr].cells[5].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
var time = tRows[nr].cells[5].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
var gold= amount.innerHTML.replace(/,/g,'');
if (isNaN(parseInt(gold))) gold = -1;
var extra_minutes = 0;
if (time.innerHTML != 'Gold') {
var ts = time.innerHTML.split(":");
extra_minutes = parseInt(ts[0]*60)+parseInt(ts[1]);
}
notifyDiv('min60',0,0,x+16,y+16,'#D9CF0F','#272727');
var mult = 1;
if (raceNr == 1) mult = 1.2;
if (raceNr == 2) mult = 1.15;
var hourGold = Math.round((parseInt(tff)*GM_getValue("rfl_minutesGold",60)) * mult);
var percent = Math.round(hourGold + ((hourGold / 3) * 2));
if (gold == -1) {
goldStanding = '??? min'
} else {
goldStanding = Math.floor(gold / (tff * mult)).toString()+' min';
if (extra_minutes>0) extra_minutes = parseInt(gold) + parseInt(Math.round((parseInt(tff) * mult) * extra_minutes));
}
var newHTML = '<table border="0" cellpadding="2" cellspacing="2">';
newHTML += '<tr><td>'+GM_getValue("rfl_minutesGold",60)+' min. gold:</td><td align="right"><span style="color:yellow;">'+addCommas(hourGold)+'</span></td></tr>';
newHTML += '<tr><td class="underline">60 min. gold safe hit at:</td><td class="underline" align="right"><span style="color:yellow;">'+addCommas(percent)+'</span></td></tr>';
newHTML += '<tr><td>Gold standing:</td><td align="right"><span style="color:yellow;">'+goldStanding+'</span></td></tr>';
if (extra_minutes > 0) {
newHTML += '<tr><td>Now can have:</td><td align="right"><span style="color:yellow;">'+addCommas(extra_minutes)+'</span></td></tr>';
}
newHTML += '</table>';
document.getElementById('min60').innerHTML = newHTML;
};

function showStats(nr,x,y) {
notifyDiv('notifyStats',0,0,x+16,y+16,'#D9CF0F','#272727');
var newHTML = '<table border="0" cellpadding="2" cellspacing="2">';
var s1 = (battlefield[nr][4] > -1 ? addCommas(battlefield[nr][4]) : '???');
var t1 = (battlefield[nr][5] > -1 ? timeAgo(battlefield[nr][5])+ ' ago' : '???');
var s2 = (battlefield[nr][6] > -1 ? addCommas(battlefield[nr][6]) : '???');
var t2 = (battlefield[nr][7] > -1 ? timeAgo(battlefield[nr][7])+ ' ago' : '???');
var s3 = (battlefield[nr][8] > -1 ? addCommas(battlefield[nr][8]) : '???');
var t3 = (battlefield[nr][9] > -1 ? timeAgo(battlefield[nr][9])+ ' ago' : '???');
var s4 = (battlefield[nr][10] > -1 ? addCommas(battlefield[nr][10]) : '???');
var t4 = (battlefield[nr][11] > -1 ? timeAgo(battlefield[nr][11])+ ' ago' : '???');
newHTML += '<tr><td style="padding-right:8px;">Strike Action</td><td align="right">'+s1+'</td><td style="width:150px;padding-left:4px;" align="right">'+t1+'</td></tr>';
var dac = "#ffffff";
if ( parseInt(GM_getValue("rfl_SA",-1)) < parseInt(battlefield[nr][6]) ) dac = "#FF0800";
newHTML += '<tr><td style="padding-right:8px;">Defensive Action</td><td align="right" style="width:170px;color:'+dac+';">'+s2+'</td><td style="width:150px;padding-left:4px;" align="right">'+t2+'</td></tr>';
var spc = "#ffffff";
if ( parseInt(battlefield[nr][8]) > (parseInt(GM_getValue("rfl_SENTRY",-1)) /2)) spc = "#FF0800";
newHTML += '<tr><td style="padding-right:8px;">Spy Rating</td><td align="right" style="width:170px;color:'+spc+';">'+s3+'</td><td style="width:150px;padding-left:4px;" align="right">'+t3+'</td></tr>';
var sec = "#ffffff";
if ((parseInt(battlefield[nr][10]) / 2) > parseInt(GM_getValue("rfl_SPY",-1))) sec = "#FF0800";
newHTML += '<tr><td style="padding-right:8px;">Sentry Rating</td><td align="right" style="width:170px;color:'+sec+';">'+s4+'</td><td style="width:150px;padding-left:4px;" align="right">'+t4+'</td></tr>';
newHTML += '</table>';
document.getElementById('notifyStats').innerHTML = newHTML;
};

function makeBFcolor(nr,cSee,tff,da,gold,raceNr) {
var tffPercent = GM_getValue("rfl_minTFF",100);
var myTFF = Math.floor((parseInt(GM_getValue("rfl_myTFF",-1)) / 100) * tffPercent);
var DApercent = (parseInt(GM_getValue("rfl_minSA",100)) / 100);
var hl = parseInt(GM_getValue("rfl_HLGoldAmount",0));
var mySA = GM_getValue("rfl_SA",-1);
gold = parseInt(gold);
var doTFF= GM_getValue("rfl_doMinTFF",0);
var doSA= GM_getValue("rfl_doMinSA",0);
var lastAttack= battlefield[nr][12];
var attacksWeek= battlefield[nr][13];

var goldtff = tff;
if (savedInfo[16]) if (savedInfo[16]>-1) goldtff = parseInt(tff)+ Math.floor(savedInfo[16] /10);

if ((da > -1) && (doSA)) da = da * DApercent;
if (cSee == false) {
if (GM_getValue("rfl_doDbFarm",0) == 1) {
if ((lastAttack > -1) &&  (lastAttack < (3600*12))) return GM_getValue("GoldColor9",'#9A0000');
if (attacksWeek > 6) return GM_getValue("GoldColor9",'#9A0000');
}
if (gold < hl) return GM_getValue("GoldColor5","#909090");
if ((doTFF == 1) && (myTFF > tff)) return GM_getValue("GoldColor5","#909090");
if (da == -1) return GM_getValue("GoldColor4",'red');
if ((doSA == 1) && (mySA < da)) return GM_getValue("GoldColor5","#909090");
var mult = 1;
if (raceNr == 1) mult = 1.2;
if (raceNr == 2) mult = 1.15;
if (GM_getValue("rfl_smartHL",1) == 1) {
var hourGold = Math.round((parseInt(goldtff)*GM_getValue("rfl_minutesGold",60)) * mult);
var percent = Math.round(hourGold + ((hourGold / 3) * 2));
if ((gold >= hourGold) && (gold <= percent)) return GM_getValue("GoldColor11",'#D68F0D');
if (gold < percent) return GM_getValue("GoldColor5","#909090");
}
return GM_getValue("GoldColor3","green");
}

if (GM_getValue("rfl_doFarm",0) == 1) {
if ((lastAttack > -1) &&  (lastAttack < (3600*12))) return GM_getValue("GoldColor8",'red');
if (attacksWeek > 6) return GM_getValue("GoldColor8",'red');
}
if (gold < hl) return GM_getValue("GoldColor6","#ffffff");
if ((doTFF == 1) && (myTFF > tff)) return GM_getValue("GoldColor6","#ffffff");
if (da == -1) return GM_getValue("GoldColor2",'red');
if ((doSA == 1) && (mySA < da)) return GM_getValue("GoldColor6","#ffffff");
var mult = 1;
if (raceNr == 1) mult = 1.2;
if (raceNr == 2) mult = 1.15;
if (GM_getValue("rfl_smartHL",1) == 1) {
var hourGold = Math.round((parseInt(goldtff)*GM_getValue("rfl_minutesGold",60)) * mult);
var percent = Math.round(hourGold + ((hourGold / 3) * 2));
if ((gold >= hourGold) && (gold <= percent)) return GM_getValue("GoldColor10",'#F89F0C');
if (gold < percent) return GM_getValue("GoldColor6","#ffffff");
}
return GM_getValue("GoldColor1","lime");
};

function fill_battlefield(r) {
var theArray = r.split("|");
var tables=document.getElementsByTagName("table");
var wTable = getBFtable();
var tRows = tables[wTable].rows;
for (var i=0;i<theArray.length;i++) {
var entry = theArray[i].split(",");
battlefield[i] = entry;

var tff= tRows[i+1].cells[3].innerHTML.replace(/,/g,'');
var gold= tRows[i+1].cells[5].innerHTML.replace(/ Gold/g,'').replace(/,/g,'');
var g= addCommas(gold);
var t= "Gold";
var cl= GM_getValue("GoldColor6","#ffffff");
var tcl= "#ffffff";
var rankElem= "rank_"+i.toString();
if (GM_getValue("rfl_HLTFF",0) == 1) {
var mySA = GM_getValue("rfl_SA",-1);
var doSA= GM_getValue("rfl_doMinSA",0);
var DApercent = (parseInt(GM_getValue("rfl_minSA",100)) / 100);
var da= parseInt(entry[6]);
var raceName= trim(tRows[i+1].cells[4].innerHTML);
var raceNr= giveRaceNr(raceName);
var lastAttack= battlefield[i][12];
var attacksWeek= battlefield[i][13];
var tffPercent= GM_getValue("rfl_minTFF",100);
var myTFF= Math.floor((parseInt(GM_getValue("rfl_myTFF",-1)) / 100) * tffPercent);
if (myTFF <= tff) {
var cc = true;
if (da > -1) {
if (doSA == 1) da = da * DApercent;
if (mySA <= da) cc = false;
if ((lastAttack > -1) &&  (lastAttack < (3600*12))) cc = false;
if (attacksWeek > 6) cc=false;
} else {cc=false;}
if (cc) {
var img = '<img src="'+im[5]+'" alt="!" />';
document.getElementById(rankElem).innerHTML = img;
}
tRows[i+1].cells[3].style.color = GM_getValue("GoldColor7",'lime');
}
}
if (tRows[i+1].cells[5].innerHTML == "??? Gold") {
if (entry[2] != -1) {
t = timeString(entry[3]);
tcl = "yellow";
g = addCommas(entry[2]);
var cl = GM_getValue("GoldColor5","#909090");
if ((GM_getValue("rfl_HLGold",0) == 1) || (GM_getValue("rfl_smartHL",1) == 1)) cl = makeBFcolor(i,false,tff,entry[6],entry[2],raceNr);
}
} else {
if ((GM_getValue("rfl_HLGold",0) == 1)  || (GM_getValue("rfl_smartHL",1) == 1)) cl = makeBFcolor(i,true,tff,entry[6],gold,raceNr);
}
var elem = "gold_"+i;
tRows[i+1].cells[5].innerHTML = '<table style="border:0px;margin:0px;padding:0px;" border="0" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:0px 4px 0px 0px;text-align:right;border-width:0px;margin:0px;"></td><td style="border-width:0px;width:55px;margin:0px;padding:0px;"></td></tr></table>';
var amount = tRows[i+1].cells[5].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
var time = tRows[i+1].cells[5].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
amount.style.color = cl;
amount.style.cursor = 'pointer';
amount.setAttribute("id",elem);
amount.innerHTML = g;
time.style.color = tcl;
if (t != "Gold") time.style.fontSize = '70%';
time.innerHTML = t;
document.getElementById(elem).addEventListener('contextmenu',function(e) {
e.stopPropagation();
e.preventDefault();
var tr = e.target.id.replace(/gold_/g,'');
var x = e.clientX + window.scrollX;
var y = e.clientY + window.scrollY;
x -= 270;
if ((y-250) < 0) y+=270;
doAttack_noTuring(battlefield[tr][0],battlefield[tr][1],battlefield[tr][2],'raid',x,y);
},false);
document.getElementById(elem).addEventListener('click',function(e) {
var tr = e.target.id.replace(/gold_/g,'');
var x = e.clientX + window.scrollX;
var y = e.clientY + window.scrollY;
x -= 270;
if ((y-250) < 0) y+=270;
doAttack_noTuring(battlefield[tr][0],battlefield[tr][1],battlefield[tr][2],'attack',x,y);
},false);
document.getElementById(elem).addEventListener('mouseover',function(e) {
e.target.style.backgroundColor = GM_getValue("Attackbar","#171717");
var tr = e.target.id.replace(/gold_/g,'');
var x = e.clientX + window.scrollX;
var y = e.clientY + window.scrollY;
showlastAttack(tr,x,y);
},false);
document.getElementById(elem).addEventListener('mouseout',function(e) {
e.target.style.backgroundColor = '';
closediv("notifyLastAttack");
},false);
document.getElementById(elem).addEventListener('mousemove',function(e) {
var x = e.clientX + window.scrollX;
var y = e.clientY + window.scrollY;
if (document.getElementById("notifyLastAttack")) {
document.getElementById("notifyLastAttack").style.top = (y+16)+"px";
document.getElementById("notifyLastAttack").style.left= (x+16)+"px";
}
},false);

if (parseInt(entry[6]) > -1) tRows[i+1].cells[6].innerHTML = addCommas(entry[6]);
}
};

function postdata(url,data,rf) {
GM_xmlhttpRequest({
method: "POST",
url: url,
data: data,
headers: {
"Content-Type": "application/x-www-form-urlencoded"
},
onload: function(response) {
rf(response.responseText);
}
});
};

function getdata(url,rf) {
GM_xmlhttpRequest({
method: "GET",
url: encodeURI(url),
onload: function(xhr) {
rf(xhr.responseText);
}
});
};

function giveRace(nr) {
if (nr == 1) return "Humans";
if (nr == 2) return "Dwarves";
if (nr == 4) return "Elves";
if (nr == 8) return "Orcs";
if (nr == 16) return "Undead";
return -1;
};

function giveRaceNr(race) {
if (race == 'Humans') return 1;
if (race == 'Dwarves') return 2;
if (race == 'Elves') return 4;
if (race == 'Orcs') return 8;
if (race == 'Undead') return 16;
return -1;
};

function FindText(str,first,second) {var x = str.indexOf(first) + first.length;var z = str.substring(x);var y = z.indexOf(second);return z.substring(z,y)};

function addCommas( sValue ){
sValue = String(sValue);
var sRegExp = new RegExp('(-?[0-9]+)([0-9]{3})');
while(sRegExp.test(sValue)) {
sValue = sValue.replace(sRegExp, '$1,$2');
}
return sValue;
};

function InStr(strSearch, strFind){
strSearch = String(strSearch);
strFind = String(strFind);
return (strSearch.indexOf(strFind) >= 0);
};

function replaceAll( str, from, to ) {
var idx = str.indexOf( from );
while ( idx > -1 ) {
str = str.replace( from, to );
idx = str.indexOf( from );
}
return str;
};

function trim(str, chars) {
return ltrim(rtrim(str, chars), chars);
};

function ltrim(str, chars) {
chars = chars || "\\s";
return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
};

function rtrim(str, chars) {
chars = chars || "\\s";
return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
};

function precisionTime(t) {
if ((t == -1) || (t == '???')) return '???';
var value = '';
var w = Math.floor(t / 604800);
t -= (w*604800);
if (w > 0) {
value += w+"w";
}
var d = Math.floor(t / 86400);
t -= (d*86400);
if (d > 0) {
if (value.length > 0) value+=":";
value += d+"d";
}
var u = Math.floor(t / 3600);
t -= (u*3600);
if (value.length > 0) value+=":";
value += u;
var m = Math.floor(t / 60);
t -= (m*60);
value+=":";
if (m < 10) m='0'+m;
value += m;
value+=":";
if (t < 10) t='0'+t;
value += t;
return value;
};



function timeAgo(t) {
if ((t == -1) || (t == '???')) return '???';
var val = Math.floor(t / 604800);
if (val > 0) {
if (val == 1) return val+" week";
return val+" weeks";
}
val = Math.floor(t / 86400);
if (val > 0) {
if (val == 1) return val+" day";
return val+" days";
}
val = Math.floor(t / 3600);
if (val > 0) {
if (val == 1) return val+" hour";
return val+" hours";
}
val = Math.floor(t / 60);
if (val > 0) {
if (val == 1) return val+" minute";
return val+" minutes";
}
if (t == 1)return t+" second";
return t+" seconds";
};

function completeTimeAgo(t) {
if ((t == -1) || (t == '???')) return 'unknown';
var w = Math.floor(t / 604800);
t = t - (w * 604800);
var d = Math.floor(t / 86400);
t = t - (d * 86400);
var u = Math.floor(t / 3600);
t = t - (u * 3600);
var m = Math.floor(t / 60);
var data = '';
if (w > 0) {
var s = 'weeks';
if (w == 1) s="week";
if (data.length > 0) data += '/';
data += w+" "+s;
}
if (d > 0) {
var s = 'days';
if (d == 1) s="day";
if (data.length > 0) data += '/';
data += d+" "+s;
}
if (u > 0) {
var s = 'hours';
if (u == 1) s="hour";
if (data.length > 0) data += '/';
data += u+" "+s;
}
if (m > 0) {
var s = 'min.';
if (data.length > 0) data += '/';
data += m+" "+s;
}
return data;
};


function timeString(s) {
if (s == -1) return '???';
var h = Math.floor(s / 3600);
s = s - (h*3600);
var m = Math.floor(s / 60);
s = s - (m*60);
if (h < 10) h = ' '+h;
if (m < 10) m = '0'+m;
if (s < 10) s = '0'+s;
var str = h+":"+m+":"+s;
return str;
};

function notifyDiv(name,w,h,l,t,fc,bc) {
if (document.getElementById(name)) return;
var newdiv = document.createElement('div');
newdiv.setAttribute('id', name);
if (w > 0) newdiv.style.width = w;
if (h > 0) newdiv.style.height = h;
newdiv.style.overflow = "auto";
newdiv.style.position = "absolute";
if (l >-1) newdiv.style.left = l;
if (t >-1) newdiv.style.top = t;
newdiv.style.zIndex = 9999;
newdiv.style.background = fc;
newdiv.style.background = bc;
newdiv.style.borderWidth = '0px 2px 2px 1px';
newdiv.style.borderStyle = 'solid';
newdiv.style.borderColor = '#cacaca #000000 #000000 #cacaca';
document.body.appendChild(newdiv);
};

function makediv(name,zi,w,h,l,t,c,header) {
if (document.getElementById(name)) return;
var newdiv = document.createElement('div');
newdiv.setAttribute('id', name);
if (w > 0) newdiv.style.width = w;
if (h > 0) newdiv.style.height = h;
newdiv.style.overflow = "auto";
newdiv.style.position = "absolute";
if (l >-1) newdiv.style.left = l;
if (t >-1) newdiv.style.top = t;
newdiv.style.zIndex = zi;
newdiv.style.background = c;
newdiv.style.borderWidth = '0px 2px 2px 1px';
newdiv.style.borderStyle = 'solid';
newdiv.style.borderColor = '#cacaca #000000 #000000 #cacaca';
document.body.appendChild(newdiv);
var newHTML = ' <div id="drag_'+name+'" style="width:100%;">';
newHTML += ' <table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><th>'+header+'<span class="cursor" id="close_'+name+'" style="float:right;">[X]</span></th></tr></table>';
newHTML += ' </div>';
newHTML += ' <div id="content_'+name+'" style="padding:4px;">';
newHTML += ' </div>';
document.getElementById(name).innerHTML = newHTML;
var drag_id = "drag_"+name;
GM_setValue(name,1);
document.getElementById(drag_id).addEventListener('mousedown',function(e) {
dragStart(e,name);
},false);
var close_id = "close_"+name;
document.getElementById(close_id).addEventListener('click',function(e) {
GM_setValue(name,0);
closediv(name);
},false);
};

function closediv(name) {
if (name == "infoDiv") doRecon = false;
if (name == "sabotageDiv") doSabbing = false;
if (document.getElementById(name)) document.body.removeChild(document.getElementById(name));
};

var dragObj = new Object();
dragObj.zIndex = 0;

function dragStart(event, id) {
var el;
var x, y;
if (id)
dragObj.elNode = document.getElementById(id);
else {
dragObj.elNode = event.target;
if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;
}
dragObj.elNode.style.cursor = 'move';
x = event.clientX + window.scrollX;
y = event.clientY + window.scrollY;
dragObj.cursorStartX = x;
dragObj.cursorStartY = y;
dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;
if (isNaN(dragObj.elStartTop))  dragObj.elStartTop  = 0;
dragObj.elNode.style.zIndex = ++dragObj.zIndex;
document.addEventListener("mousemove", dragGo,   true);
document.addEventListener("mouseup",   dragStop, true);
event.preventDefault();
};

function dragGo(event) {
var x, y;
x = event.clientX + window.scrollX;
y = event.clientY + window.scrollY;
dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
dragObj.elNode.style.top  = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";
if (dragObj.elNode.offsetLeft < 0) dragObj.elNode.style.left = '0px';
if (dragObj.elNode.offsetTop < 0) dragObj.elNode.style.top = '0px';
event.preventDefault();
};

function dragStop(event) {
document.removeEventListener("mousemove", dragGo,   true);
document.removeEventListener("mouseup",   dragStop, true);
dragObj.elNode.style.cursor = 'default';
var ex = dragObj.elNode.id + 'X';
var ey = dragObj.elNode.id + 'Y';
GM_setValue(ex,dragObj.elNode.offsetLeft);
GM_setValue(ey,dragObj.elNode.offsetTop);
};

function colorPicker(obj) {
var cArray = new Array(new Array('330000','333300','336600','339900','33CC00','33FF00','66FF00','66CC00','669900','666600','663300','660000','FF0000','FF3300','FF6600','FF9900','FFCC00','FFFF00'),new Array('330033','333333','336633','339933','33CC33','33FF33','66FF33','66CC33','669933','666633','663333','660033','FF0033','FF3333','FF6633','FF9933','FFCC33','FFFF33'),new Array('330066','333366','336666','339966','33CC66','33FF66','66FF66','66CC66','669966','666666','663366','660066','FF0066','FF3366','FF6666','FF9966','FFCC66','FFFF66'),new Array('330099','333399','336699','339999','33CC99','33FF99','66FF99','66CC99','669999','666699','663399','660099','FF0099','FF3399','FF6699','FF9999','FFCC99','FFFF99'),new Array('3300CC','3333CC','3366CC','3399CC','33CCCC','33FFCC','66FFCC','66CCCC','6699CC','6666CC','6633CC','6600CC','FF00CC','FF33CC','FF66CC','FF99CC','FFCCCC','FFFFCC'),new Array('3300FF','3333FF','3366FF','3399FF','33CCFF','33FFFF','66FFFF','66CCFF','6699FF','6666FF','6633FF','6600FF','FF00FF','FF33FF','FF66FF','FF99FF','FFCCFF','FFFFFF'),new Array('0000FF','0033FF','0066FF','0099FF','00CCFF','00FFFF','99FFFF','99CCFF','9999FF','9966FF','9933FF','9900FF','CC00FF','CC33FF','CC66FF','CC99FF','CCCCFF','CCFFFF'),new Array('0000CC','0033CC','0066CC','0099CC','00CCCC','00FFCC','99FFCC','99CCCC','9999CC','9966CC','9933CC','9900CC','CC00CC','CC33CC','CC66CC','CC99CC','CCCCCC','CCFFCC'),new Array('000099','003399','006699','009999','00CC99','00FF99','99FF99','99CC99','999999','996699','993399','990099','CC0099','CC3399','CC6699','CC9999','CCCC99','CCFF99'),new Array('000066','003366','006666','009966','00CC66','00FF66','99FF66','99CC66','999966','996666','993366','990066','CC0066','CC3366','CC6666','CC9966','CCCC66','CCFF66'),new Array('000033','003333','006633','009933','00CC33','00FF33','99FF33','99CC33','999933','996633','993333','990033','CC0033','CC3333','CC6633','CC9933','CCCC33','CCFF33'),new Array('000000','003300','006600','009900','00CC00','00FF00','99FF00','99CC00','999900','996600','993300','990000','CC0000','CC3300','CC6600','CC9900','CCCC00','CCFF00'),new Array('000000','111111','222222','333333','444444','555555','666666','777777','888888','999999','AAAAAA','BBBBBB','CCCCCC','DDDDDD','EEEEEE','FFFFFF','444444','444444'));
var Xpos = 10;var Ypos = 10;
if (GM_getValue("colorPickerDivX",-1) != -1) Xpos = GM_getValue("colorPickerDivX",10);
if (GM_getValue("colorPickerDivY",-1) != -1) Ypos = GM_getValue("colorPickerDivY",10);
makediv('colorPickerDiv',3,0,0,Xpos,Ypos,'#272727','Color Picker');
newHTML = '<table border="0" cellpadding="0" cellspacing="2">';
for (var i=0;i<13;i++) {
newHTML += '<tr>';
for (var j=0;j<18;j++) {
var tid = 'cl_'+i+'_'+j;
newHTML += '<td id="'+tid+'" style="background-color:#'+cArray[i][j]+';width:16px;height:16px;font-size:1%;">&nbsp;</td>';
}
newHTML += '</tr>';
}
newHTML += '</table>';
document.getElementById("content_colorPickerDiv").innerHTML = newHTML;
for (var i=0;i<13;i++) {
for (var j=0;j<18;j++) {
var tid = 'cl_'+i+'_'+j;
document.getElementById(tid).addEventListener('click',function(e) {
var wc = e.target.id.replace('cl_','');
var wc = wc.split('_');
var c = '#'+cArray[wc[0]][wc[1]];
document.getElementById(obj).style.background = c;
GM_setValue(obj,c);
closediv("colorPickerDiv");
},false);
}
}
};

function create_optionsDiv() {
var Xpos = 10;var Ypos = 10;
if (GM_getValue("optionsDivX",-1) != -1) Xpos = GM_getValue("optionsDivX",10);
if (GM_getValue("optionsDivY",-1) != -1) Ypos = GM_getValue("optionsDivY",10);
makediv('optionsDiv',3,0,0,Xpos,Ypos,'#272727','Battlefield Options');
newHTML =  '<table border="0" cellpadding="0" cellspacing="6">';
newHTML +='<tr>';
newHTML +='<td valign="top" style="padding:2px;border-color:black #cacaca #cacaca black;border-style:solid;border-width:1px;">';
newHTML +='<table cellpadding="2" cellspacing="2">';
newHTML +='<tr><th colspan="4">Highlight</th></tr>';
newHTML +='<tr>';
var cb = '';
if (GM_getValue("rfl_HLGold",0) == 1) cb = "checked";
var hl = GM_getValue("rfl_HLGoldAmount",0);
newHTML +=  '<td style="padding-right:8px;">Gold amount</td><td><input type="checkbox" id="doHighlightGold" '+cb+'></td><td><input type="text" style="width:140px;" id="highlightGold" value="'+addCommas(hl)+'" /></td>';
newHTML +=  '</tr>';
newHTML +='<tr>';
var cb = '';
if (GM_getValue("rfl_smartHL",0) == 1) cb = "checked";
newHTML +=  '<td style="padding-right:8px;">Smart</td><td><input type="checkbox" id="doSmartHL" '+cb+'></td><td>&nbsp;</td>';
newHTML +=  '</tr>';
var cb = '';
if (GM_getValue("rfl_doFarm",0) == 1) cb = "checked";
hlc = GM_getValue("GoldColor8","red");
newHTML +='<tr>';
newHTML +=  '<td style="padding-right:8px;">Farming warning</td><td><input type="checkbox" id="doFarm" '+cb+'></td><td><table border="0" cellspacing="0" cellpadding="0"><tr><td class="cursor" id="GoldColor8" style="background-color:'+hlc+';width:28px;height:14px;font-size:1%;">&nbsp;</td></tr></table></td>';
newHTML +=  '</tr>';
var cb = '';
if (GM_getValue("rfl_doDbFarm",0) == 1) cb = "checked";
hlc = GM_getValue("GoldColor9","#9A0000");
newHTML +='<tr>';
newHTML +=  '<td style="padding-right:8px;">DB Farming warning</td><td><input type="checkbox" id="doDbFarm" '+cb+'></td><td><table border="0" cellspacing="0" cellpadding="0"><tr><td class="cursor" id="GoldColor9" style="background-color:'+hlc+';width:28px;height:14px;font-size:1%;">&nbsp;</td></tr></table></td>';
newHTML +=  '</tr>';
newHTML +='<tr>';
newHTML +='<th colspan="3">';
newHTML +='Military';
newHTML +='</th>';
newHTML +='</tr>';
newHTML +='<tr>';
cb = '';
if (GM_getValue("rfl_doMinTFF",0) == 1) cb = "checked";
newHTML +=  '<td>TFF minimal</td><td><input type="checkbox" id="doMinTFF" '+cb+'></td>';
newHTML +='<td><select id="minTFF">';
var sel = GM_getValue("rfl_minTFF",80);
for (var i=50;i<=100;i+=5) {
cb='';
if (sel == i) cb = "selected";
newHTML += '<option value = "'+i+'" '+cb+'>'+i+'%</option>';
}
newHTML += '</select>of my TFF</td>';
newHTML +=  '</tr>';
newHTML +='<tr>';
cb = '';
if (GM_getValue("rfl_doMinSA",0) == 1) cb = "checked";
newHTML +=  '<td>SA minimal</td><td><input type="checkbox" id="doMinSA" '+cb+'></td>';
newHTML +='<td><select id="minSA">';
var sel = GM_getValue("rfl_minSA",110);
for (var i=100;i<=150;i+=5) {
cb='';
if (sel == i) cb = "selected";
newHTML += '<option value = "'+i+'" '+cb+'>'+i+'%</option>';
}
newHTML += '</select>of his DA</td>';
newHTML +=  '</tr>';
newHTML +='<tr><th colspan="4">Total Fighting Force</th></tr>';
newHTML +='<tr>';
var cb = '';
if (GM_getValue("rfl_HLTFF",0) == 1) cb = "checked";
newHTML +=  '<td style="padding-right:8px;">Highlight</td><td><input type="checkbox" id="doHighlightTFF" '+cb+'></td>';
var hlc = GM_getValue("GoldColor7","lime");
newHTML +=  '<td><table border="0" cellspacing="0" cellpadding="0"><tr><td class="cursor" id="GoldColor7" style="background-color:'+hlc+';width:28px;height:14px;font-size:1%;">&nbsp;</td></tr></table></td>';
newHTML +=  '</tr>';
newHTML +='<tr><th colspan="3">Gold Time Display</th></tr>';
newHTML +='<tr>';
newHTML +=  '<td>Minutes</td>';
newHTML +=  '<td colspan="2"><input style="width:35px;" type="text" id="minutesGold" value="'+GM_getValue("rfl_minutesGold",60)+'" /></td>';
newHTML +=  '</tr>';

newHTML +='<tr><th colspan="3">Auto Bank after Attack</th></tr>';
newHTML +='<tr>';
var cb = '';
if (GM_getValue("rfl_doattackbuy",0) == 1) cb = "checked";
newHTML +=  '<td style="padding-right:8px;">Activate</td><td><input type="checkbox" id="doAttackbuy" '+cb+'></td><td>&nbsp;</td>';

newHTML +=  '</tr>';
newHTML +='<tr>';
var cb = '';
if (GM_getValue("rfl_doshowbuy",0) == 1) cb = "checked";
newHTML +=  '<td style="padding-right:8px;">Show buy window</td><td><input type="checkbox" id="doShowbuy" '+cb+'></td><td>&nbsp;</td>';

newHTML +=  '</tr>';

newHTML +=  '</table>'
newHTML +='</td>';


newHTML +='<td valign="top" style="padding:2px;border-color:black #cacaca #cacaca black;border-style:solid;border-width:1px;">';
newHTML +='<table cellpadding="2" cellspacing="2">';
newHTML +='<tr>';
newHTML +='<th colspan="3">';
newHTML +='Gold Colors';
newHTML +='</th>';
newHTML +='</tr>';
var hlc = GM_getValue("GoldColor6","#ffffff");
newHTML +='<tr>';
newHTML +=  '<td colspan="2" style="padding-right:8px;">Standard</td><td><table border="0" cellspacing="0" cellpadding="0"><tr><td class="cursor" id="GoldColor6" style="background-color:'+hlc+';width:28px;height:14px;font-size:1%;">&nbsp;</td></tr></table></td>';
newHTML +=  '</tr>';
var hlc = GM_getValue("GoldColor1","lime");
newHTML +='<tr>';
newHTML +=  '<td colspan="2" style="padding-right:8px;">Highlight</td><td><table border="0" cellspacing="0" cellpadding="0"><tr><td class="cursor" id="GoldColor1" style="background-color:'+hlc+';width:28px;height:14px;font-size:1%;">&nbsp;</td></tr></table></td>';
newHTML +=  '</tr>';
hlc = GM_getValue("GoldColor2","green");
newHTML +='<tr>';
newHTML +=  '<td colspan="2" style="padding-right:8px;">DA Unknown</td><td><table border="0" cellspacing="0" cellpadding="0"><tr><td class="cursor" id="GoldColor2" style="background-color:'+hlc+';width:28px;height:14px;font-size:1%;">&nbsp;</td></tr></table></td>';
newHTML +=  '</tr>';
hlc = GM_getValue("GoldColor10","#F89F0C");
newHTML +='<tr>';
newHTML +=  '<td colspan="2" style="padding-right:8px;">Smart &gt;'+GM_getValue("rfl_minutesGold",60)+'min. &lt; safe</td><td><table border="0" cellspacing="0" cellpadding="0"><tr><td class="cursor" id="GoldColor2" style="background-color:'+hlc+';width:28px;height:14px;font-size:1%;">&nbsp;</td></tr></table></td>';
newHTML +=  '</tr>';
newHTML +='<tr>';
newHTML +='<th colspan="3">';
newHTML +='Database Gold';
newHTML +='</th>';
newHTML +='</tr>';
hlc = GM_getValue("GoldColor5","#909090");
newHTML +='<tr>';
newHTML +=  '<td colspan="2" style="padding-right:8px;">Database gold</td><td><table border="0" cellspacing="0" cellpadding="0"><tr><td class="cursor" id="GoldColor5" style="background-color:'+hlc+';width:28px;height:14px;font-size:1%;">&nbsp;</td></tr></table></td>';
newHTML +=  '</tr>';
hlc = GM_getValue("GoldColor3","green");
newHTML +='<tr>';
newHTML +=  '<td colspan="2" style="padding-right:8px;">DB High Highlight</td><td><table border="0" cellspacing="0" cellpadding="0"><tr><td class="cursor" id="GoldColor3" style="background-color:'+hlc+';width:28px;height:14px;font-size:1%;">&nbsp;</td></tr></table></td>';
newHTML +=  '</tr>';
hlc = GM_getValue("GoldColor4","green");
newHTML +='<tr>';
newHTML +=  '<td colspan="2" style="padding-right:8px;">DA High Unknown</td><td><table border="0" cellspacing="0" cellpadding="0"><tr><td class="cursor" id="GoldColor4" style="background-color:'+hlc+';width:28px;height:14px;font-size:1%;">&nbsp;</td></tr></table></td>';
newHTML +=  '</tr>';
hlc = GM_getValue("GoldColor11","#D68F0D");
newHTML +='<tr>';
newHTML +=  '<td colspan="2" style="padding-right:8px;">Smart &gt;'+GM_getValue("rfl_minutesGold",60)+'min. &lt; safe</td><td><table border="0" cellspacing="0" cellpadding="0"><tr><td class="cursor" id="GoldColor2" style="background-color:'+hlc+';width:28px;height:14px;font-size:1%;">&nbsp;</td></tr></table></td>';
newHTML +=  '</tr>';
newHTML +='<tr>';
newHTML +='<th colspan="3">';
newHTML +='Attack bar';
newHTML +='</th>';
newHTML +='</tr>';
hlc = GM_getValue("Attackbar","#171717");
newHTML +='<tr>';
newHTML +=  '<td colspan="2" style="padding-right:8px;">Attack Highlight</td><td><table border="0" cellspacing="0" cellpadding="0"><tr><td class="cursor" id="Attackbar" style="background-color:'+hlc+';width:28px;height:14px;font-size:1%;">&nbsp;</td></tr></table></td>';
newHTML +=  '</tr>';

newHTML +='<tr><th colspan="3">Highlight Alliance</th></tr>';
newHTML +='<tr>';
cb = '';
if (GM_getValue("rfl_HLalliance",0) == 1) cb = "checked";
var ahlc = GM_getValue("rfl_membercolor","#021705");
newHTML +=  '<td>Row color</td>';
newHTML +=  '<td><input type="checkbox" id="doHighlightAlliance" '+cb+'></td>';
newHTML +=  '<td>';
newHTML +=  '<table border="0" cellspacing="0" cellpadding="0">';
newHTML +=  '<tr>';
newHTML +=  '<td class="cursor" id="rfl_membercolor" style="background-color:'+ahlc+';width:28px;height:14px;font-size:1%;">&nbsp;</td>';
newHTML +=  '</tr>';
newHTML +=  '</table>';
newHTML +=  '</td>';
newHTML +=  '</tr>';
newHTML +='</table>';
newHTML +='</td>';
newHTML +='</tr>';
newHTML +='<tr>';
newHTML +='<td colspan="2" align="center">';
newHTML +=  '<input type="button" id="optionsSave" value="Save Options" />';
newHTML +='<td>';
newHTML +='</tr>';
newHTML +=  '</table>';
document.getElementById("content_optionsDiv").innerHTML = newHTML;
document.getElementById("optionsSave").addEventListener('click',function(e) {
if (document.getElementById("doHighlightGold").checked) {GM_setValue("rfl_HLGold",1);} else {GM_setValue("rfl_HLGold",0);}
if (document.getElementById("doHighlightTFF").checked) {GM_setValue("rfl_HLTFF",1);} else {GM_setValue("rfl_HLTFF",0);}
if (document.getElementById("doHighlightAlliance").checked) {GM_setValue("rfl_HLalliance",1);} else {GM_setValue("rfl_HLalliance",0);}
if (document.getElementById("doMinTFF").checked) {GM_setValue("rfl_doMinTFF",1);} else {GM_setValue("rfl_doMinTFF",0);}
if (document.getElementById("doMinSA").checked) {GM_setValue("rfl_doMinSA",1);} else {GM_setValue("rfl_doMinSA",0);}
if (document.getElementById("doSmartHL").checked) {GM_setValue("rfl_smartHL",1);} else {GM_setValue("rfl_smartHL",0);}
if (document.getElementById("doFarm").checked) {GM_setValue("rfl_doFarm",1);} else {GM_setValue("rfl_doFarm",0);}
if (document.getElementById("doDbFarm").checked) {GM_setValue("rfl_doDbFarm",1);} else {GM_setValue("rfl_doDbFarm",0);}
if (document.getElementById("doAttackbuy").checked) {GM_setValue("rfl_doattackbuy",1);} else {GM_setValue("rfl_doattackbuy",0);}
if (document.getElementById("doShowbuy").checked) {GM_setValue("rfl_doshowbuy",1);} else {GM_setValue("rfl_doshowbuy",0);}
GM_setValue("rfl_minTFF",document.getElementById("minTFF").value);
GM_setValue("rfl_minSA",document.getElementById("minSA").value);
var mg = document.getElementById("minutesGold").value;
if (isNaN(parseInt(mg))) mg = 60;
GM_setValue("rfl_minutesGold",mg);
var gold = document.getElementById("highlightGold").value;
gold = gold.replace(/,/g,'');
if (isNaN(parseInt(gold))) gold = 0;
GM_setValue("rfl_HLGoldAmount",gold);
closediv("optionsDiv");
},false);
document.getElementById("GoldColor1").addEventListener('click',function(e) {
if (!document.getElementById("colorPickerDiv")) {
colorPicker("GoldColor1");
}
},false);
document.getElementById("GoldColor2").addEventListener('click',function(e) {
if (!document.getElementById("colorPickerDiv")) {
colorPicker("GoldColor2");
}
},false);
document.getElementById("GoldColor3").addEventListener('click',function(e) {
if (!document.getElementById("colorPickerDiv")) {
colorPicker("GoldColor3");
}
},false);
document.getElementById("GoldColor4").addEventListener('click',function(e) {
if (!document.getElementById("colorPickerDiv")) {
colorPicker("GoldColor4");
}
},false);
document.getElementById("GoldColor5").addEventListener('click',function(e) {
if (!document.getElementById("colorPickerDiv")) {
colorPicker("GoldColor5");
}
},false);
document.getElementById("GoldColor6").addEventListener('click',function(e) {
if (!document.getElementById("colorPickerDiv")) {
colorPicker("GoldColor6");
}
},false);
document.getElementById("GoldColor7").addEventListener('click',function(e) {
if (!document.getElementById("colorPickerDiv")) {
colorPicker("GoldColor7");
}
},false);
document.getElementById("GoldColor8").addEventListener('click',function(e) {
if (!document.getElementById("colorPickerDiv")) {
colorPicker("GoldColor8");
}
},false);
document.getElementById("GoldColor9").addEventListener('click',function(e) {
if (!document.getElementById("colorPickerDiv")) {
colorPicker("GoldColor9");
}
},false);
document.getElementById("GoldColor10").addEventListener('click',function(e) {
if (!document.getElementById("colorPickerDiv")) {
colorPicker("GoldColor10");
}
},false);
document.getElementById("GoldColor11").addEventListener('click',function(e) {
if (!document.getElementById("colorPickerDiv")) {
colorPicker("GoldColor11");
}
},false);
document.getElementById("rfl_membercolor").addEventListener('click',function(e) {
if (!document.getElementById("colorPickerDiv")) {
colorPicker("rfl_membercolor");
}
},false);
document.getElementById("Attackbar").addEventListener('click',function(e) {
if (!document.getElementById("colorPickerDiv")) {
colorPicker("Attackbar");
}
},false);
};


function allPagesInfo() {
var page = ( arguments.length < 1 ? document.body.innerHTML : arguments[0] );
var my_Rank = trim(FindText(FindText(FindText(page,'Rank:','</tr>'),'color','</td>'),'>','<')).replace(/,/g,'');
var my_Gold = trim(FindText(FindText(FindText(page,'Gold:','</tr>'),'color','</td>'),'>','<')).replace(/,/g,'');
my_Gold=my_Gold.replace("M","000000");
var my_Gameturns= trim(FindText(FindText(FindText(page,'Turns:','</tr>'),'color','</td>'),'>','<')).replace(/,/g,'');
var my_Experience= trim(FindText(FindText(FindText(page,'Experience:','</tr>'),'color','</td>'),'>','<')).replace(/,/g,'');
GM_setValue("rfl_RANK",my_Rank);
GM_setValue("rfl_GOLD",my_Gold.toString());
GM_setValue("rfl_GAMETURNS",my_Gameturns);
GM_setValue("rfl_EXPERIENCE",my_Experience);
};

function parseTrainPage() {
if(null==document.body) {
setTimeOut(parseTrainPage,15);
return;
}

if (GM_getValue("my_ID",-1) == -1) loadthePage("http://www.kingsofchaos.com/base.php");
var page = ( arguments.length < 1 ? document.body.innerHTML : arguments[0] );
allPagesInfo(page);

var TAS = parseInt(trim(FindText(FindText(page,'<td><b>Trained Attack Soldiers</b></td>','d>'),'>','<').replace(/,/g,'')));
var TAM = parseInt(trim(FindText(FindText(page,'<td><b>Trained Attack Mercenaries</b></td>','d>'),'>','<').replace(/,/g,'')));
var TDS = parseInt(trim(FindText(FindText(page,'<td><b>Trained Defense Soldiers</b></td>','d>'),'>','<').replace(/,/g,'')));
var TDM = parseInt(trim(FindText(FindText(page,'<td><b>Trained Defense Mercenaries</b></td>','d>'),'>','<').replace(/,/g,'')));
var US = parseInt(trim(FindText(FindText(page,'<td><b>Untrained Soldiers</b></td>','d>'),'>','<').replace(/,/g,'')));
var UM = parseInt(trim(FindText(FindText(page,'<td><b>Untrained Mercenaries</b></td>','d>'),'>','<').replace(/,/g,'')));
var SPIES= parseInt(trim(FindText(FindText(page,'<b>Spies</b></td>','d>'),'>','<').replace(/,/g,'')));
var SENTRIES= parseInt(trim(FindText(FindText(page,'<b>Sentries</b></td>','d>'),'>','<').replace(/,/g,'')));
var TFF= parseInt(trim(FindText(FindText(page,'<td><b>Total Fighting Force</b></td>','d>'),'>','<').replace(/,/g,'')));
var COVERTS = (SPIES + SENTRIES);

var COVERTSKILL  = parseInt(FindText(FindText(page,'Current Covert Skill','<input'),'<td>','</td>').replace(/Level/,''));
var CONSCRIPTION = parseInt(FindText(FindText(page,'Current Conscription Rate','<input'),'<td>','</td>').replace(/ soldiers per day/,''));
var tmp = FindText(page,'Current Conscription Rate','</tr>');
var CONSCRIPTION_UPGRADE = -1;
if (InStr(page,'Upgrade')) {
CONSCRIPTION_UPGRADE = parseInt(FindText(tmp,'Upgrade','</th>').replace(/to /,'').replace(/ per day/,''));
}
var ECONOMY = trim(FindText(FindText(page,'Economic Development','<input'),'<td>','('));
var TECHNOLOGY = trim(FindText(FindText(FindText(page,'Current Technologies','</table>'),'<tr>','</tr>'),'>','('));

GM_setValue("rfl_COVERTSKILL",COVERTSKILL);
GM_setValue("rfl_CONSCRIPTION",CONSCRIPTION);
GM_setValue("rfl_ECONOMY",ECONOMY);
GM_setValue("rfl_TECHNOLOGY",TECHNOLOGY);
if (arguments.length < 1) {
var amountArray = new Array(0,0,0,0);
var soldiersArray = new Array(0,0,0,0);
var namesArray = new Array('Attack','Defense','Spy','Sentry');
soldiersArray[0] = TAS+TAM;
soldiersArray[1] = TDS+TDM;
soldiersArray[2] = SPIES;
soldiersArray[3] = SENTRIES;
var myweapons = GM_getValue("rfl_myARMORY",'');
if (myweapons != '') {
var w = myweapons.split("|");
for (var i=0;i<w.length;i++) {var w1=w[i].split(",");amountArray[w1[0]] += parseInt(w1[1]);}
}
var Xpos = 10;var Ypos = 10;
if (GM_getValue("traincheckDivX",-1) != -1) Xpos = GM_getValue("traincheckDivX",10);
if (GM_getValue("traincheckDivY",-1) != -1) Ypos = GM_getValue("traincheckDivY",10);
makediv('traincheckDiv',3,0,0,Xpos,Ypos,'#272727','&nbsp;Soldiers Training&nbsp;');
newHTML = '<table border="0" cellpadding="2" cellspacing="2">';
newHTML += '<tr>';
newHTML += '<th>Weapons</th><th>amount</th><th>Soldiers</th><th>+/-</th>';
newHTML += '</tr>';
var unheld = 0;
var totalweap = 0;
var totalsol = 0;
for (var i=0;i<4;i++) {
var sol = parseInt(soldiersArray[i]) - parseInt(amountArray[i]);
totalweap += parseInt(amountArray[i]);
totalsol  += parseInt(soldiersArray[i]);
var clr = 'lime';
if (sol < 0) clr = 'red';
var cl='';
if (i==3) cl=' class="underline" ';
newHTML += '<tr><td'+cl+'>'+namesArray[i]+'</td><td'+cl+' style="text-align:right;padding-left:16px;">'+addCommas(amountArray[i])+'</td><td'+cl+' style="text-align:right;padding-left:16px;">'+addCommas(soldiersArray[i])+'</td><td'+cl+' style="color:'+clr+';text-align:right;padding-left:16px;">'+addCommas(sol)+'</td></tr>';
}
totalsol += (US+UM);
cl='lime';
if ((totalsol - totalweap) < 0) cl = 'red';
newHTML += '<tr><td>Totals</td><td style="text-align:right;padding-left:16px;">'+addCommas(totalweap)+'</td><td style="text-align:right;padding-left:16px;">'+addCommas(totalsol)+'</td><td style="color:'+cl+';text-align:right;padding-left:16px;">'+addCommas(totalsol-totalweap)+'</td></tr>';
newHTML += '</table>';
document.getElementById("content_traincheckDiv").innerHTML = newHTML;
}
data = "ID="+GM_getValue("my_ID",-1);
data += "&GOLD="+GM_getValue("rfl_GOLD",-1);
data += "&TAS="+TAS;
data += "&TAM="+TAM;
data += "&TDS="+TDS;
data += "&TDM="+TDM;
data += "&US="+US;
data += "&UM="+UM;
data += "&COVERTS="+COVERTS;
data += "&ECONOMY="+encodeURI(ECONOMY);
data += "&TECHNOLOGY="+encodeURI(TECHNOLOGY);
data += "&COVERTSKILL="+COVERTSKILL;
data += "&CONSCRIPTION="+CONSCRIPTION;
var buyPrices = new Array(2000,2000,3500,3500);
var as = document.getElementsByTagName("input");
var solstr = TAS.toString()+","+TDS.toString()+","+US.toString()+","+SPIES.toString()+","+SENTRIES.toString();
GM_setValue("rfl_sol",solstr);
var spy_upgrade = as[9].value.replace(' Gold (+60%)','').replace(/,/g,'');
var up_upgrade = as[12].value.replace(' Gold','').replace(/,/g,'');
var economy_upgrade = as[15].value.replace(' Experience','').replace(/,/g,'');
var technology_upgrade = as[18].value.replace('Research! (','').replace(' Experience)','').replace(/,/g,'');
if (isNaN(parseInt(spy_upgrade))) spy_upgrade = -1;
if (isNaN(parseInt(up_upgrade))) up_upgrade = -1;
if (isNaN(parseInt(economy_upgrade))) economy_upgrade = -1;
if (isNaN(parseInt(technology_upgrade))) technology_upgrade = -1;
GM_setValue("rfl_upgrade_spy",spy_upgrade);
GM_setValue("rfl_upgrade_up",up_upgrade);
GM_setValue("rfl_upgrade_economy",economy_upgrade);
GM_setValue("rfl_upgrade_technology",technology_upgrade);
as[0].addEventListener("click",function(e) {
setBuy(0,US,buyPrices);
},true);
as[1].addEventListener("click",function(e) {
setBuy(1,US,buyPrices);
},true);
as[2].addEventListener("click",function(e) {
setBuy(2,US,buyPrices);
},true);
as[3].addEventListener("click",function(e) {
setBuy(3,US,buyPrices);
},true);
url = "http://"+ipadres+"/php/GM_personnel.php";
postdata(url,data,function(response) {
});
};

function setBuy(which,US,buyPrices) {
var as = document.getElementsByTagName("input");
var now_gold = GM_getValue("rfl_GOLD",0);
var gu = 0;
for (var i=0;i<4;i++) if (i != which) gu = gu + (as[i].value * buyPrices[i]);
now_gold = now_gold - gu;
var number = Math.floor(now_gold / buyPrices[which]);
if (US > -1) if (number > US) number = US;
as[which].value = number;
};

function mercsPage() {
if(null==document.body) {
setTimeOut(mercsPage,15);
return;
}

if (GM_getValue("my_ID",-1) == -1) loadthePage("http://www.kingsofchaos.com/base.php");
var page = ( arguments.length < 1 ? document.body.innerHTML : arguments[0] );
allPagesInfo(page);


var TAS = parseInt(trim(FindText(FindText(page,'<b>Trained Attack Soldiers</b></td>','td>'),'>','<').replace(/,/g,'')));
var TAM = parseInt(trim(FindText(FindText(page,'<b>Trained Attack Mercenaries</b></td>','td>'),'>','<').replace(/,/g,'')));
var TDS = parseInt(trim(FindText(FindText(page,'<b>Trained Defense Soldiers</b></td>','td>'),'>','<').replace(/,/g,'')));
var TDM = parseInt(trim(FindText(FindText(page,'<b>Trained Defense Mercenaries</b></td>','td>'),'>','<').replace(/,/g,'')));
var US = parseInt(trim(FindText(FindText(page,'<b>Untrained Soldiers</b></td>','td>'),'>','<').replace(/,/g,'')));
var UM = parseInt(trim(FindText(FindText(page,'<b>Untrained Mercenaries</b></td>','td>'),'>','<').replace(/,/g,'')));
var SPIES= parseInt(trim(FindText(FindText(page,'<b>Spies</b></td>','td>'),'>','<').replace(/,/g,'')));
var SENTRIES= parseInt(trim(FindText(FindText(page,'<b>Sentries</b></td>','td>'),'>','<').replace(/,/g,'')));
var MORALE= parseInt(trim(FindText(FindText(page,'<b>Army Morale</b></td>','td>'),'>','<').replace(/,/g,'')));
var TFF= parseInt(trim(FindText(FindText(page,'<b>Total Fighting Force</b></td>','td>'),'>','<').replace(/,/g,'')));
var COVERTS = (SPIES + SENTRIES);
var maximum = Math.floor((TAS+TDS+US+COVERTS) / 4);
var haveMercs = TAM+TDM+UM;



var available = new Array();
var mTable = FindText(page,'Buy Mercenaries</th>','</table>');
tRows = mTable.split('<tr>');
for (var i=2;i<5;i++) {
var tTds = tRows[i].split('<td');
available[i-2] = parseInt(FindText(tTds[3],'>','<').replace(/,/g,''));
}
var as = document.getElementsByTagName("input");
as[0].addEventListener("click",function(e) {
buyMercs(0,maximum,available);
},true);
as[1].addEventListener("click",function(e) {
buyMercs(1,maximum,available);
},true);
as[2].addEventListener("click",function(e) {
buyMercs(2,maximum,available);
},true);
url = "http://"+ipadres+"/php/GM_personnel.php";

data = "ID="+GM_getValue("my_ID",-1);
data += "&GOLD="+GM_getValue("rfl_GOLD",-1);
data += "&TAS="+TAS;
data += "&TAM="+TAM;
data += "&TDS="+TDS;
data += "&TDM="+TDM;
data += "&US="+US;
data += "&UM="+UM;
data += "&COVERTS="+COVERTS;
data += "&ECONOMY=-1";
data += "&TECHNOLOGY=-1";
data += "&COVERTSKILL=-1";
data += "&CONSCRIPTION=-1";
postdata(url,data,function(response) {
});
};

function buyMercs(which,maximum,available) {
var buyPrices = new Array(4500,4500,3500);
var as = document.getElementsByTagName("input");
var now_gold = GM_getValue("rfl_GOLD",0);
var gu = 0;
for (var i=0;i<3;i++) if (i != which) gu = gu + (as[i].value * buyPrices[i]);
now_gold = now_gold - gu;
var number = Math.floor(now_gold / buyPrices[which]);
if (number > available[which]) number = available[which];
if (number > maximum) number = maximum;
as[which].value = number;
};

function parseBase() {

if(null==document.body) {
setTimeOut(parseBase,15);
return;
}
var page = ( arguments.length < 1 ? document.body.innerHTML : arguments[0] );
allPagesInfo(page);

var tables=document.getElementsByTagName("table");
var menuTable = getMenutable();
if (menuTable > -1) {
var last = tables[menuTable].rows.length;
newRow =tables[menuTable].insertRow((last-1));
newCell = newRow.insertCell(0);
newCell.innerHTML='<img src="'+im[13]+'" alt="Approved" />';
newCell.style.cursor = "pointer";
newCell.addEventListener('click',function(e) {getAlliancetargets(5810);},true);
}


var userGold= GM_getValue("rfl_GOLD",-1);
var Gameturns= GM_getValue("rfl_GAMETURNS",-1);
var userID= FindText(FindText(page,'<td><b>Name</b></td>','</tr>'),'id=','"');
var userName= trim(FindText(FindText(page,'<td><b>Name</b></td>','</tr>'),'">','</a>'));
var userRace= trim(FindText(FindText(page,'<td><b>Race</b></td>','</tr>'),'<td>','</td>'));

var CommanderID= FindText(FindText(page,'<td><b>Commander</b></td>','a>'),'id=','"');
if (InStr(CommanderID,'None')) CommanderID = -1;
var TAS = parseInt(trim(FindText(FindText(page,'<b>Trained Attack Soldiers</b></td>','td>'),'>','<').replace(/,/g,'')));
var TAM = parseInt(trim(FindText(FindText(page,'<b>Trained Attack Mercenaries</b></td>','td>'),'>','<').replace(/,/g,'')));
var TDS = parseInt(trim(FindText(FindText(page,'<b>Trained Defense Soldiers</b></td>','td>'),'>','<').replace(/,/g,'')));
var TDM = parseInt(trim(FindText(FindText(page,'<b>Trained Defense Mercenaries</b></td>','td>'),'>','<').replace(/,/g,'')));
var US = parseInt(trim(FindText(FindText(page,'<b>Untrained Soldiers</b></td>','td>'),'>','<').replace(/,/g,'')));
var UM = parseInt(trim(FindText(FindText(page,'<b>Untrained Mercenaries</b></td>','td>'),'>','<').replace(/,/g,'')));
var SPIES= parseInt(trim(FindText(FindText(page,'<b>Spies</b></td>','td>'),'>','<').replace(/,/g,'')));
var SENTRIES= parseInt(trim(FindText(FindText(page,'<b>Sentries</b></td>','td>'),'>','<').replace(/,/g,'')));
var MORALE= parseInt(trim(FindText(FindText(page,'<b>Army Morale</b></td>','td>'),'>','<').replace(/,/g,'')));
var TFF= parseInt(trim(FindText(FindText(page,'<b>Total Fighting Force</b></td>','td>'),'>','<').replace(/,/g,'')));
var unique = FindText(page,'http://www.kingsofchaos.com/recruit.php?uniqid=','"');

var meTable = FindText(page,'Military Effectiveness','</table>');
var me = meTable.split('<tr>');
var stat = new Array();
for (var i=1;i<me.length;i++) {
var inTR = me[i].split('</td>');
var s = trim(inTR[1].replace('<td align="right">','').replace(/,/g,''));
var r = trim(inTR[2].replace('<td align="right">','').replace('Ranked #',''));
s=parseInt(s);
r=parseInt(r);
stat[i-1] = new Array(s,r);
}
var SA = stat[0][0];
var DA = stat[1][0];
var SPY = stat[2][0];
var SENTRY = stat[3][0];
var SA_RANK = stat[0][1];
var DA_RANK = stat[1][1];
var SPY_RANK = stat[2][1];
var SENTRY_RANK= stat[3][1];

var FORT= FindText(FindText(page,'<td><b>Fortification</b></td>','</tr>'),'>','<');
var SIEGE= FindText(FindText(page,'<td><b>Siege Technology</b></td>','</tr>'),'>','<');
var ECONOMY= FindText(FindText(page,'<td><b>Economy</b></td>','</tr>'),'>','<');
var TECHNOLOGY= FindText(FindText(page,'<td><b>Technology</b></td>','</tr>'),'>',' (');
var CONSCRIPTION= parseInt(trim(FindText(FindText(page,'<td><b>Conscription</b></td>','</tr>'),'>',' soldiers')));
var COVERTSKILL= parseInt(FindText(FindText(page,'<td><b>Covert Level</b></td>','</tr>'),'>','<'));
var INCOME= parseInt(FindText(FindText(page,'<td><b>Projected Income</b></td>','</tr>'),'>','Gold').replace(/,/g,''));


GM_setValue("rfl_INCOME",INCOME.toString());

var COVERTS = (SPIES + SENTRIES);

var tables=document.getElementsByTagName("table");
var recentAttacksTable = gettable("Recent Attacks on You");
if (recentAttacksTable > -1) {
var tRows = tables[recentAttacksTable].rows;
for (var i=2;i<tRows.length;i++) {
var defender_id = FindText(tRows[i].cells[3].innerHTML,'defender_id" value="','"');
var turing = FindText(tRows[i].cells[3].innerHTML,'turing" value="','"');
var pname = tRows[i].cells[1].childNodes[0].innerHTML;
var stolen = parseInt(tRows[i].cells[2].innerHTML.replace(/,/g,'').replace(/Gold stolen/,''));
var lowhit = GM_getValue("rfl_lowhit",60);
tRows[i].cells[2].id = "v_"+stolen.toString();
tRows[i].cells[2].addEventListener('mouseover',function(e) {
var income = parseInt(GM_getValue("rfl_INCOME",-1));
var stolen = parseInt(e.target.id.replace(/v_/,''));
var lowhit = GM_getValue("rfl_lowhit",60);
var x = e.clientX + window.scrollX;
var y = e.clientY + window.scrollY;
notifyDiv('makein60m',0,0,x+16,y+16,'#D9CF0F','#272727');
var make60 = addCommas((income * lowhit).toString());
var hitminutes = Math.round(stolen / income);
if (isNaN(hitminutes)) hitminutes = "Defended";
var newHTML = '<table border="0" cellpadding="2" cellspacing="2">';
newHTML += '<tr><td>Your '+lowhit+' minutes value:</td><td style="text-align:right;color:yellow;">'+make60+'</td></tr>';
newHTML += '<tr><td>Minutes worth stolen:</td><td style="text-align:right;color:white;">'+hitminutes+'</td></tr></table>';
document.getElementById("makein60m").innerHTML = newHTML;
},false);
tRows[i].cells[2].addEventListener('mouseout',function(e) {
closediv("makein60m");
},false);
tRows[i].cells[2].addEventListener('mousemove',function(e) {
var x = e.clientX + window.scrollX;
var y = e.clientY + window.scrollY;
if (document.getElementById("makein60m")) {
document.getElementById("makein60m").style.top = (y+16)+"px";
document.getElementById("makein60m").style.left= (x+16)+"px";
}
},false);


if ((INCOME * lowhit) > stolen) tRows[i].cells[2].style.color ='red';
var newStr = '<input id="defender_'+(i-2).toString()+'" value="'+defender_id+'" type="hidden">';
newStr += '<input id="name_'+(i-2).toString()+'" value="'+pname+'" type="hidden">';
newStr += '<input style="width: 100%;" id="abut_'+(i-2).toString()+'" value="Sab Now!" type="button">';
tRows[i].cells[3].innerHTML = newStr;
var elem = 'abut_'+(i-2).toString();
document.getElementById(elem).addEventListener('click',function(e) {
var nr = e.target.id.replace(/abut_/,'');
elem = 'defender_'+nr;
var id = document.getElementById(elem).value;
elem = 'name_'+nr;
var pname = document.getElementById(elem).value;
doSabotage(id,pname);
},false);
}
}


GM_setValue("my_ID",userID);
GM_setValue("rfl_USERNAME",userName);
GM_setValue("rfl_SA",SA.toString());
GM_setValue("rfl_SARANK",SA_RANK);
GM_setValue("rfl_DA",DA.toString());
GM_setValue("rfl_DARANK",DA_RANK);
GM_setValue("rfl_SPY",SPY.toString());
GM_setValue("rfl_SPYRANK",SPY_RANK);
GM_setValue("rfl_SENTRY",SENTRY.toString());
GM_setValue("rfl_SENTRYRANK",SENTRY_RANK);
GM_setValue("rfl_myTFF",TFF.toString());
var my_RACE = giveRaceNr(userRace);
GM_setValue("rfl_myRACE",my_RACE);
GM_setValue("rfl_FORTIFICATION",FORT);
GM_setValue("rfl_SIEGETECHNOLOGY",SIEGE);
GM_setValue("rfl_COVERTSKILL",COVERTSKILL);
GM_setValue("rfl_CONSCRIPTION",CONSCRIPTION);
GM_setValue("rfl_ECONOMY",ECONOMY);
GM_setValue("rfl_TECHNOLOGY",TECHNOLOGY);

var data = "ID="+userID;
data += "&GOLD="+userGold;
data += "&GAMETURNS="+Gameturns;
data += "&NAME="+encodeURI(userName);
userRace = giveRaceNr(userRace);
data += "&RACE="+userRace;
data += "&COMMANDERID="+CommanderID;
data += "&UNIQUE="+unique;
data += "&TAS="+TAS;
data += "&TAM="+TAM;
data += "&TDS="+TDS;
data += "&TDM="+TDM;
data += "&US="+US;
data += "&UM="+UM;
data += "&COVERTS="+COVERTS;
data += "&MORALE="+MORALE;
data += "&TFF="+TFF;
data += "&SA="+SA;
data += "&DA="+DA;
data += "&SPY="+SPY;
data += "&SENTRY="+SENTRY;
data += "&FORT="+encodeURI(FORT);
data += "&SIEGE="+encodeURI(SIEGE);
data += "&ECONOMY="+encodeURI(ECONOMY);
data += "&TECHNOLOGY="+encodeURI(TECHNOLOGY);
data += "&COVERTSKILL="+COVERTSKILL;
data += "&CONSCRIPTION="+CONSCRIPTION;
data += "&T="+version[3];
var url = "http://"+ipadres+"/php/GM_base.php";
postdata(url,data,function(response) {
notifyDiv('welcome',0,0,10,10,'#ffffff','transparent');
if (trim(response) != '') response = '<br>&nbsp;'+response+'&nbsp';
var txt = '&nbsp;<b>Welcome <span style="color:yellow;">'+userName+'</span>, Always Loaded v'+version[0]+'.'+version[1]+'.'+version[2]+'&nbsp;'+response;
document.getElementById("welcome").innerHTML = txt;
});
};


function changeRaceValues(nr) {
var oldValues  = new Array(parseInt(GM_getValue("rfl_SA",0)),parseInt(GM_getValue("rfl_DA",0)),parseInt(GM_getValue("rfl_SPY",0)),parseInt(GM_getValue("rfl_SENTRY",0)));
if (GM_getValue("rfl_myRACE",-1) == 1) mynr = 0;
if (GM_getValue("rfl_myRACE",-1) == 2) mynr = 1;
if (GM_getValue("rfl_myRACE",-1) == 4) mynr = 2;
if (GM_getValue("rfl_myRACE",-1) == 8) mynr = 3;
if (GM_getValue("rfl_myRACE",-1) == 16) mynr = 4;
for (var i=0;i<4;i++) {
if (mynr == nr) {
var newV = oldValues[i];
var diff = 0;
} else {
var newV = basicArmory[i] + Math.floor((basicArmory[i] / 100) * bonus[nr][i]);
var diff = newV - oldValues[i];
}
var clr = 'white';
if (diff >0) clr='lime';
if (diff <0) clr='red';
var elem = "ovtd_"+i.toString();
document.getElementById(elem).innerHTML = addCommas(oldValues[i].toString());
elem = "nvtd_"+i.toString();
document.getElementById(elem).innerHTML = addCommas(newV.toString());
elem = "difftd_"+i.toString();
document.getElementById(elem).innerHTML = addCommas(diff.toString());
document.getElementById(elem).style.color = clr;
if (((nr == 0) && (mynr != 0)) || ((nr == 1) && (mynr != 1))) {
var ic = GM_getValue("rfl_INCOME",-1);
var b = 1.20;
if (nr == 1) b = 1.15;
var addIncome = Math.floor(ic * b) - ic;
document.getElementById("incomeChange").innerHTML = "Income +"+addCommas(addIncome);
} else {
document.getElementById("incomeChange").innerHTML = '';
}
}
}


function parseArmory() {
GM_log(">parseArmory...");
GM_log(">Arguments: "+arguments.length);
if(null==document.body) {
setTimeOut(parseArmory,15);
return;
}

if (GM_getValue("my_ID",-1) == -1) loadthePage("http://www.kingsofchaos.com/base.php");
var page = ( arguments.length < 1 ? document.body.innerHTML : arguments[0] );
var turing;
allPagesInfo(page);

if (arguments.length < 1) {
if (document.evaluate("//input[@name='prefs[attack]']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength != 1) {
setTimeOut(parseArmory,15);
return;
}

var tables=document.getElementsByTagName("table");
var menuTable = getMenutable();
if (menuTable > -1) {
var last = tables[menuTable].rows.length;
newRow =tables[menuTable].insertRow((last-1));
newCell = newRow.insertCell(0);
newCell.innerHTML='<img src="'+im[13]+'" alt="Approved" />';
newCell.style.cursor = "pointer";
newCell.addEventListener('click',function(e) {getAlliancetargets(5810);},true);
}



var forms = document.getElementsByTagName('form');
for (var i=0;i<forms.length;i++) if (forms[i].name == "buyform") forms[i].setAttribute("id","buyform");
var prefs = new Array();
prefs[0] = document.evaluate("//input[@name='prefs[attack]']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value;
prefs[2] = document.evaluate("//input[@name='prefs[defend]']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value;
prefs[4] = document.evaluate("//input[@name='prefs[spy]']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value;
prefs[6] = document.evaluate("//input[@name='prefs[sentry]']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value;


var sel = document.getElementsByTagName('select');
prefs[1] = sel[0].options[sel[0].selectedIndex].value;
prefs[3] = sel[1].options[sel[1].selectedIndex].value;
prefs[5] = sel[2].options[sel[2].selectedIndex].value;
prefs[7] = sel[3].options[sel[3].selectedIndex].value;

if (GM_getValue("rfl_usePrefs",0) == 1) {
prefs[0] = GM_getValue("rfl_wbuy1_percent",0);
prefs[2] = GM_getValue("rfl_wbuy2_percent",0);
prefs[4] = GM_getValue("rfl_wbuy3_percent",0);
prefs[6] = GM_getValue("rfl_wbuy4_percent",0);
prefs[1] = GM_getValue("rfl_bankWeapon1",69);
prefs[3] = GM_getValue("rfl_bankWeapon2",69);
prefs[5] = GM_getValue("rfl_bankWeapon3",69);
prefs[7] = GM_getValue("rfl_bankWeapon4",69);
}

var tres = parseInt(GM_getValue("rfl_GOLD",0));
var prefs_line = '';
for (var i=0;i<=7;i+=2) {
if (prefs[i]>0) {
var pref_weap = getWeaponByKocNumber(prefs[(i+1)]);
var pref_name = pref_weap[0];
var pref_cost = pref_weap[4];
var canbuy = 0;
if (GM_getValue("rfl_usePrefs",0) == 1) {
canbuy = Math.floor((tres * (prefs[i]/100)) / pref_cost);
tres -= (canbuy * pref_cost);
} else {
var goldzForBuy = ((tres / 100) * prefs[i]);
canbuy = Math.floor(goldzForBuy / pref_cost);
}
prefs_line += '| <span style="color:yellow;">'+canbuy+'</span> '+pref_name+' ';
}
}
if (prefs_line.length > 0) {
prefs_line += "|";
} else {
prefs_line = "No armory preferences set...";
}

var tables = document.getElementsByTagName('table');
var t = gettable('Current Weapon Inventory');
var s = '<span style="float:left;"><input id="buybut1" style="width:120px;" type="submit" value="Buy Weapons" ></span>';
tables[t].rows[0].cells[0].style.textAlign = "left";
tables[t].rows[0].cells[0].innerHTML = s+'&nbsp;'+prefs_line;
if (GM_getValue("rfl_missingweapons",-1) != -1) showMissingWeapons(true,GM_getValue("rfl_missingweapons",-1));

document.getElementById("buybut1").addEventListener('click',function(e) {
e.target.value='Buying..';
e.target.disabled=true;
if (GM_getValue("rfl_usePrefs",0) == 1) {
GM_setValue("savevalues",true);
GM_setValue("button1Clicked",true);
startBuy();
} else {
document.getElementById("buyform").submit();
}
},false);

var tables=document.getElementsByTagName("table");
var menuTable = getMenutable();

var newRow =tables[menuTable].insertRow(6);
var newCell = newRow.insertCell(0);
newCell.innerHTML='<img src="'+im[3]+'" alt="Missing" />';
newCell.style.cursor = "pointer";
newCell.addEventListener('click',function(e) {recallMissingWeapons();},true);
newRow =tables[menuTable].insertRow(7);
newCell = newRow.insertCell(0);
newCell.innerHTML='<img src="'+im[1]+'" alt="Invested" />';
newCell.style.cursor = "pointer";
newCell.addEventListener('click',function(e) {invested();},true);

newRow =tables[menuTable].insertRow(9);
newCell = newRow.insertCell(0);
newCell.innerHTML='<img src="'+im[12]+'" alt="Weaponprefs" />';
newCell.style.cursor = "pointer";
newCell.addEventListener('click',function(e) {setWeaponsPrefs();},true);
}

var SA = parseInt(trim(FindText(FindText(page,'<td><b>Strike Action</b></td>','d>'),'>','<').replace(/,/g,'')));
var DA = parseInt(trim(FindText(FindText(page,'<td><b>Defensive Action</b></td>','d>'),'>','<').replace(/,/g,'')));
var SPY = parseInt(trim(FindText(FindText(page,'<td><b>Spy Rating</b></td>','d>'),'>','<').replace(/,/g,'')));
var SENTRY = parseInt(trim(FindText(FindText(page,'<td><b>Sentry Rating</b></td>','d>'),'>','<').replace(/,/g,'')));
var TAS = parseInt(trim(FindText(FindText(page,'<td><b>Trained Attack Soldiers</b></td>','d>'),'>','<').replace(/,/g,'')));
var TAM = parseInt(trim(FindText(FindText(page,'<td><b>Trained Attack Mercenaries</b></td>','d>'),'>','<').replace(/,/g,'')));
var TDS = parseInt(trim(FindText(FindText(page,'<td><b>Trained Defense Soldiers</b></td>','d>'),'>','<').replace(/,/g,'')));
var TDM = parseInt(trim(FindText(FindText(page,'<td><b>Trained Defense Mercenaries</b></td>','d>'),'>','<').replace(/,/g,'')));
var US = parseInt(trim(FindText(FindText(page,'<td><b>Untrained Soldiers</b></td>','d>'),'>','<').replace(/,/g,'')));
var UM = parseInt(trim(FindText(FindText(page,'<td><b>Untrained Mercenaries</b></td>','d>'),'>','<').replace(/,/g,'')));
var SPIES= parseInt(trim(FindText(FindText(page,'<b>Spies</b></td>','d>'),'>','<').replace(/,/g,'')));
var SENTRIES= parseInt(trim(FindText(FindText(page,'<b>Sentries</b></td>','d>'),'>','<').replace(/,/g,'')));
var MORALE= parseInt(trim(FindText(FindText(page,'<td><b>Army Morale</b></td>','d>'),'>','<').replace(/,/g,'')));
var TFF= parseInt(trim(FindText(FindText(page,'<td><b>Total Fighting Force</b></td>','d>'),'>','<').replace(/,/g,'')));

var FORT= trim(FindText(FindText(page,'Current Fortification','<td align'),'<td>','('));
var SIEGE= trim(FindText(FindText(page,'Current Siege Technology','<td align'),'<td>','('));

var COVERTS = (SPIES + SENTRIES);
if (GM_getValue("savevalues",false) == true) {
GM_setValue("savedOld",GM_getValue("rfl_SA",0)+','+GM_getValue("rfl_DA",0)+','+GM_getValue("rfl_SPY",0)+','+GM_getValue("rfl_SENTRY",0));
GM_setValue("savevalues",false);
}

var oldValues = new Array(parseInt(GM_getValue("rfl_SA",0)),parseInt(GM_getValue("rfl_DA",0)),parseInt(GM_getValue("rfl_SPY",0)),parseInt(GM_getValue("rfl_SENTRY",0)));
if (arguments.length < 1) {
if (GM_getValue("savedOld",false) != false) {
var ov = GM_getValue("savedOld").split(",");
GM_setValue("savedOld",false);
oldValues = new Array(parseInt(ov[0]),parseInt(ov[1]),parseInt(ov[2]),parseInt(ov[3]));
}
}
if (!isNaN(SA)) GM_setValue("rfl_SA",SA.toString());
if (!isNaN(DA)) GM_setValue("rfl_DA",DA.toString());
if (!isNaN(SPY)) GM_setValue("rfl_SPY",SPY.toString());
if (!isNaN(SENTRY)) GM_setValue("rfl_SENTRY",SENTRY.toString());
if (!isNaN(TFF)) GM_setValue("rfl_myTFF",TFF.toString());
var newValues = new Array(parseInt(GM_getValue("rfl_SA",0)),parseInt(GM_getValue("rfl_DA",0)),parseInt(GM_getValue("rfl_SPY",0)),parseInt(GM_getValue("rfl_SENTRY",0)));

var bonusnr=0;
if (GM_getValue("rfl_myRACE",-1) == 1) bonusnr = 0;
if (GM_getValue("rfl_myRACE",-1) == 2) bonusnr = 1;
if (GM_getValue("rfl_myRACE",-1) == 4) bonusnr = 2;
if (GM_getValue("rfl_myRACE",-1) == 8) bonusnr = 3;
if (GM_getValue("rfl_myRACE",-1) == 16) bonusnr = 4;
for (var i=0;i<4;i++) {
basicArmory[i] = newValues[i] - Math.floor( (newValues[i] / 100) *bonus[bonusnr][i]);
}

var my_weapons = new Array();
var weapons = FindText(page,'Current Weapon Inventory','Military Effectiveness');
var tWeapons = weapons.split('<tr>');
for (var i=0;i<tWeapons.length;i++) {
tWeapons[i] = trim(tWeapons[i]);
if (tWeapons[i].indexOf('<td>') != -1) {
var w = FindText(tWeapons[i],'<td>','</td>');
var a = FindText(tWeapons[i],'<td align="right">','</td>').replace(/,/g,'');
my_weapons[my_weapons.length] = new Array(w,a);
}
}

var hWeapons = '';
var armoryValues = new Array(0,0,0,0);
var sellValues = new Array(0,0,0,0);
var my_RACE = GM_getValue("rfl_myRACE",-1);
for (var i=0;i<my_weapons.length;i++) {
var w = getWeaponByName(my_weapons[i][0],my_RACE);
armoryValues[w[1]] += (my_weapons[i][1] * w[4]);
sellValues[w[1]] += (my_weapons[i][1] * (w[4]*0.7));
if (hWeapons.length > 0) hWeapons +='|';
hWeapons += w[1]+','+my_weapons[i][1]+','+w[3];
}
GM_setValue("rfl_myARMORY",hWeapons);
var arm = '';
var sel = '';
for (var i=0;i<4;i++) {
if (arm.length > 0) {arm +=',';sel +=',';}
arm += armoryValues[i].toString();
sel += sellValues[i].toString();
}
GM_setValue("rfl_ARMORYVALUES",arm);
GM_setValue("rfl_SELLVALUES",sel);

if (arguments.length < 1) {
var haveSome = 0;
var strengthDiff = new Array(0,0,0,0);
var namesArray = new Array('Strike Action','Defensive Action','Spy Rating','Sentry Rating');
for (var i=0;i<4;i++) haveSome += parseInt(oldValues[i]);
if (haveSome > 0 ) {
for (var i=0;i<4;i++) strengthDiff[i] = (newValues[i] - oldValues[i]);
newHTML = '<table border="0" cellpadding="2" cellspacing="2">';
newHTML += '<tr><th>Military Stat</th><th>Old value</th><th>New value</th><th>+/-</th></tr>';
for (var i=0;i<4;i++) {
var clr = 'white';
if (strengthDiff[i] < 0) clr='red';
if (strengthDiff[i] > 0) clr='lime';
newHTML += '<tr><td class="underline">'+namesArray[i]+'</td><td id="ovtd_'+i.toString()+'" class="underline" style="text-align:right;padding-left:16px;">'+addCommas(oldValues[i])+'</td><td id="nvtd_'+i.toString()+'" class="underline" style="text-align:right;padding-left:16px;">'+addCommas(newValues[i].toString())+'</td><td id="difftd_'+i.toString()+'" class="underline" style="color:'+clr+';text-align:right;padding-left:16px;">'+addCommas(strengthDiff[i].toString())+'</td></tr>';
}
newHTML += '<tr>';
newHTML += '<td colspan="4" align="left">';
newHTML += '<div id="racechange" style="display:none;">';
newHTML += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
newHTML += '<tr><td style="width:170px;">Stats when change to:&nbsp;</td>';
for (var i=7;i<12;i++)newHTML += '<td style="padding:0px 8px 0px 8px;width:30px;"><img id="race_'+(i-7).toString()+'" src="'+im[i]+'" /></td>';
newHTML += '<td id="incomeChange" width="*" align="right">&nbsp;</td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</div>';
newHTML += '</td>';
newHTML += ' </tr>';
newHTML += '</table>';
var Xpos = 100;
var Ypos = 10;
if (GM_getValue("armorydiffX",-1) != -1) Xpos = GM_getValue("armorydiffX",100);
if (GM_getValue("armorydiffY",-1) != -1) Ypos = GM_getValue("armorydiffY",10);
makediv("armorydiff",999,0,0,Xpos,Ypos,'#272727','<span style="float:left;z-index:2000;"><input type="button" id="crace" style="font-size:60%;" value="Other race" /></span><span style="color:yellow;">Armory difference</span>');
document.getElementById("content_armorydiff").innerHTML = newHTML;
document.getElementById("crace").addEventListener('click',function(e) {
if (document.getElementById("racechange").style.display == 'none') {
document.getElementById("racechange").style.display = ''
} else {
document.getElementById("racechange").style.display = 'none'
}
},false);
document.getElementById("race_0").addEventListener('click',function(e) {
changeRaceValues(0);
},false);
document.getElementById("race_1").addEventListener('click',function(e) {
changeRaceValues(1);
},false);
document.getElementById("race_2").addEventListener('click',function(e) {
changeRaceValues(2);
},false);
document.getElementById("race_3").addEventListener('click',function(e) {
changeRaceValues(3);
},false);
document.getElementById("race_4").addEventListener('click',function(e) {
changeRaceValues(4);
},false);
}
}

var data = "ID="+GM_getValue("my_ID",-1);
data += "&GOLD="+GM_getValue("rfl_GOLD",-1);
data += "&SA="+SA;
data += "&DA="+DA;
data += "&SPY="+SPY;
data += "&SENTRY="+SENTRY;
data += "&WEAPONS="+hWeapons;
var url = "http://"+ipadres+"/php/GM_armory.php";
GM_log(">parseArmory: send values...");
postdata(url,data,function(r) {
GM_log(">parseArmory: got response...");
if (trim(r).length > 0) showMissingWeapons(false,r);
if (GM_getValue("rfl_doBuy",0) == 1) {
setTimeout(doArmoryBuy,20);
}
if (GM_getValue("rfl_doBuy",0) == 2) {
buyPointer++;
setTimeout(doTheBuy,20);
}
});
};

function showMissingWeapons(reshow,r) {
if (document.getElementById("missingweapons")) closediv("missingweapons");
var rsStr='';
if (!reshow) {
GM_setValue("rfl_missingweapons",r);
} else {
rsStr= " (ReShow)";
GM_setValue("rfl_missingweapons",-1);
}
var wmissing = r.split("|");
var newHTML = '<table border="0" width="100%" cellpadding="2" cellspacing="0">';
newHTML += '<tr><th style="width:230px;">Weapon</th><th style="width:50px;">Nr</th><th style="width:170px;">Cost</th></tr>';
for (var i=0;i<wmissing.length;i++) {
var mweap = wmissing[i].split(",");
var weap = getWeaponByKocNumber(mweap[0]);
var weap_price = weap[4];
var weap_name  = weap[0];
var total = parseInt(weap_price) * parseInt(mweap[1]);
newHTML += '<tr><td style="width:230px;">'+weap_name+'</td><td style="width:50px;text-align:right;">'+addCommas(mweap[1])+'</td><td style="width:170px;text-align:right;">'+addCommas(total.toString())+'</td></tr>';
}
newHTML +='</table>';
var Xpos = screen.width-480;
var Ypos = 4;
if (GM_getValue("missingweaponsX",-1) != -1) Xpos = GM_getValue("missingweaponsX",480);
if (GM_getValue("missingweaponsY",-1) != -1) Ypos = GM_getValue("missingweaponsY",4);
makediv("missingweapons",999,0,0,Xpos,Ypos,'#272727','<span style="color:yellow;">You are missing weapons!!</span>'+rsStr);
document.getElementById("content_missingweapons").innerHTML = '<div id="missingWeapons" style="width:460px;">';
document.getElementById("missingWeapons").innerHTML = newHTML;
};


function parseStatsPage() {
if (GM_getValue("my_ID",-1) == -1) loadthePage("http://www.kingsofchaos.com/base.php");
var page = ( arguments.length < 1 ? document.body.innerHTML : arguments[0] );
var id = ( arguments.length < 1 ? String(document.URL).substr(String(document.URL).indexOf('=')+1, 7) : arguments[1] );

allPagesInfo(page);

var userName= trim(FindText(FindText(page,'<td><b>Name:</b></td>','</tr>'),'>','<'));
var userRace= trim(FindText(FindText(page,'<td><b>Race:</b></td>','</tr>'),'<td>','</td>'));
userRace = giveRaceNr(userRace);
var userCommander= trim(FindText(page,'<td><b>Commander:</b></td>','</tr>'));
var CommanderID = -1;
if (InStr(userCommander,'>None<')) {userCommander = -2;CommanderID=-2;}
if (userCommander != -2) {
userCommander= trim(FindText(FindText(page,'<td><b>Commander:</b></td>','a>'),'">','</'));
CommanderID= FindText(FindText(page,'<td><b>Commander:</b></td>','a>'),'id=','"');
}
var userAlliances= FindText(page,'<td><b>Alliances:</b></td>','</td>');

var userRank= parseInt(trim(FindText(FindText(page,'<td><b>Rank:</b></td>','</tr>'),'<td>','</td>').replace(/,/g,'')));
var userMorale= parseInt(trim(FindText(FindText(page,'<td><b>Army Morale:</b></td>','</tr>'),'<td>','</td>').replace(/,/g,'')));
var userTFF= parseInt(trim(FindText(FindText(page,'<td><b>Army Size:</b></td>','</tr>'),'<td>','</td>').replace(/,/g,'')));

var userFort= trim(FindText(FindText(page,'<td><b>Fortifications:</b></td>','</tr>'),'<td>','</td>'));
var userGold = -1;
if (InStr(page,'<td><b>Treasury:</b></td>')) {
userGold= parseInt(trim(FindText(FindText(page,'<td><b>Treasury:</b></td>','</tr>'),'<td>','</td>').replace(/,/g,'')));
}
attackGold = userGold;

var allianceArray = new Array();
if (InStr(userAlliances,'id=') == true) {
var tmpArr = userAlliances.split(',');
for (var i=0;i<tmpArr.length;i++) {
var aid = FindText(tmpArr[i],'id=','"');
var aName = trim(FindText(FindText(tmpArr[i],'id=','a>'),'>','<'));
var prim = -1;
if (InStr(tmpArr[i],'(Primary)')) prim = 1;
aName = encodeURIComponent(aName);
allianceArray[i] = new Array(aid,aName,prim);
}
}
var uas = '';
if (allianceArray.length > 0) {
for (var i=0;i<allianceArray.length;i++) {
if (uas != '') uas += '|';
uas += allianceArray[i][0]+",";
uas += escape(allianceArray[i][1])+",";
uas += allianceArray[i][2];
}
}
if (uas == '') uas = "-1,,-1";

var data = "id="+id;
data += "&name="+encodeURI(userName);
data += "&commanderID="+CommanderID;
data += "&race="+userRace;
data += "&TFF="+userTFF;
data += "&morale="+userMorale;
if (userGold != -1) data += "&gold="+userGold;
data += "&fort="+encodeURI(userFort);
data += "&alliances="+uas;
var url = "http://"+ipadres+"/php/GM_statspage.php";
postdata(url,data,function(response) {
if (doRecon) {
reconRace = userRace;
savedInfo[28] = userMorale;
savedInfo[34] = 0;
if (userFort != '???') {
var fortNr = UpgradeNumber(userFort,1);
savedInfo[26] = fortNr;
savedInfo[32] = 0;
}
if (userTFF != '???') {
savedInfo[17] = userTFF;
savedInfo[25] = 0;
}
spyTarget(nowReconning);
} else {
var statsTable = gettable('User Stats');
var tables = document.getElementsByTagName('table');
var tRows = tables[statsTable].rows;

var gld = response.split(',');
if (tRows.length == 13) {
var newrow = tables[statsTable].insertRow(9);
var cell1 = newrow.insertCell(0);
var cell2 = newrow.insertCell(1);
cell1.innerHTML = '<b>Treasury:</b>';
if (gld[2] == -1) {gld[2]='???';} else {attackGold = gld[2];}
cell2.innerHTML = '<span style="color:yellow;">'+addCommas(gld[2])+'</span> ('+timeString(gld[3])+')';
}
var newrow = tables[statsTable].insertRow(11);
var cell1 = newrow.insertCell(0);
var cell2 = newrow.insertCell(1);
cell1.innerHTML = '<b>Strike Action:</b>';
if (gld[4] == -1) gld[4]='???';
cell2.innerHTML = '<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+addCommas(gld[4])+'</td><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+timeAgo(gld[5])+'</td></tr></table>';
var newrow = tables[statsTable].insertRow(12);
var cell1 = newrow.insertCell(0);
var cell2 = newrow.insertCell(1);
cell1.innerHTML = '<b>Defensive Action:</b>';
if (gld[6] == -1) gld[6]='???';
cell2.innerHTML = '<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+addCommas(gld[6])+'</td><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+timeAgo(gld[7])+'</td></tr></table>';
var newrow = tables[statsTable].insertRow(13);
var cell1 = newrow.insertCell(0);
var cell2 = newrow.insertCell(1);
cell1.innerHTML = '<b>Spy Rating:</b>';
if (gld[8] == -1) gld[8]='???';
cell2.innerHTML = '<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+addCommas(gld[8])+'</td><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+timeAgo(gld[9])+'</td></tr></table>';
var newrow = tables[statsTable].insertRow(14);
var cell1 = newrow.insertCell(0);
var cell2 = newrow.insertCell(1);
cell1.innerHTML = '<b>Sentry Rating:</b>';
if (gld[10] == -1) gld[10]='???';
cell2.innerHTML = '<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+addCommas(gld[10])+'</td><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+timeAgo(gld[11])+'</td></tr></table>';
var atturing = -1;

var atturing = document.evaluate("//input[@name='turing']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value;
var abutton  = document.evaluate("//input[@value='Attack Now!']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
abutton.setAttribute('id','attackbut');
abutton.setAttribute('value','Attack');
abutton.removeAttribute('onclick');
abutton.type = 'button';
abutton.addEventListener('click',function(e) {
var x = e.clientX + window.scrollX;
var y = e.clientY + window.scrollY;
doAttack_noTuring(id,userName,attackGold,'attack',x,y);
},false);
var rbutton  = document.evaluate("//input[@value='Raid Now!']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
rbutton.setAttribute('id','raidbut');
rbutton.setAttribute('value','Raid');
rbutton.removeAttribute('onclick');
rbutton.type = 'button';
rbutton.addEventListener('click',function(e) {
var x = e.clientX + window.scrollX;
var y = e.clientY + window.scrollY;
doAttack_noTuring(id,userName,attackGold,'raid',x,y);
},false);

var sabbutton  = document.evaluate("//input[@value='Sabotage!']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
sabbutton.setAttribute('id','sabbutton');
sabbutton.setAttribute('value','Sabotage');
sabbutton.removeAttribute('onclick');
sabbutton.type = 'button';
sabbutton.addEventListener('click',function(e) {
doSabotage(id,userName);
},false);

var sbutton  = document.evaluate("//input[@name='spyrbut']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
sbutton.setAttribute('id','spyrbut');
sbutton.setAttribute('value','Intel');
sbutton.removeAttribute('onclick');
sbutton.type = 'button';
sbutton.addEventListener('click',function(e) {
infoClick(id,userName);
},false);

}
});
};

function checkUpdate(){
var d=new Date();
var hour = d.getHours();
var lastchecked = GM_getValue("lastVersionCheck",0);
hour = 1; lastchecked = 2;
if (hour != lastchecked) {
var url = "http://"+ipadres+"/php/checkversion.php?version="+version;
getdata(url,function(response) {
var values = response.split(",");
if (parseInt(values[0]) == 1) {
var Xpos = 40;
var Ypos = 40;
if (GM_getValue("updateDivX",-1) != -1) Xpos = GM_getValue("updateDivX",10);
if (GM_getValue("updateDivY",-1) != -1) Ypos = GM_getValue("updateDivY",10);
makediv('updateDiv',3,0,0,Xpos,Ypos,'#272727','<span style="color:yellow;">Upgrade available</span>');
var newHTML  = '<table width="550" cellpadding="2" cellspacing="2">';
newHTML += '<tr>';
newHTML += ' <td colspan="2" width="100%" style="text-align:center;">';
newHTML += 'Upgrade available to version '+values[1];
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += ' <td style="padding-right:8px;text-align:right;width:50%;">';
newHTML += '<input style="width:100px;cursor:pointer;" type="button" id="cu" name="cUpdate_'+hour+'" value="Cancel" />';
newHTML += '</td>';
newHTML += ' <td style="padding-left:8px;width:50%;">';
newHTML += '<input style="width:100px;cursor:pointer;" type="button" id="du" name="dUpdate_'+hour+'" value="Update" />';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '<form id="updateform" method="POST" action="http://'+ipadres+'/index.php" >';
newHTML += ' <input type="hidden" name="id" value="'+GM_getValue("my_ID",-1)+'">';
newHTML += '</form>';
document.getElementById("content_updateDiv").innerHTML = newHTML;
document.getElementById("cu").addEventListener('click',function(e) {
var hour = e.target.name.replace('cUpdate_','');
GM_setValue("lastVersionCheck",hour);
closediv("updateDiv");
},false);
document.getElementById("du").addEventListener('click',function(e) {
var hour = e.target.name.replace('dUpdate_','');
GM_setValue("lastVersionCheck",hour);
document.getElementById("updateform").submit();
closediv("updateDiv");
},false);
}
});
}
};

function getWeaponByName(wname) {
for (var i=0;i<theWeapons.length;i++) {
if (theWeapons[i][0] == wname) return theWeapons[i];
}
return false;
};

function getWeaponsByRace(nr) {
var temp = new Array();
for (var i=0;i<theWeapons.length;i++) {
if ( (parseInt(theWeapons[i][5]) & nr) > 0) temp[temp.length] = theWeapons[i];
}
return temp;
};

function getWeaponNr(wname) {
for (var i=0;i<theWeapons.length;i++) {
if (theWeapons[i][0] == wname) return i;
}
return -1;
};

function getWeaponByKocNumber(nr) {
for (var i=0;i<theWeapons.length;i++) {
if (theWeapons[i][3] == nr) return theWeapons[i];
}
};

function getWeaponByType(type,ws,race) {
for (var i=0;i<theWeapons.length;i++) {
if ((theWeapons[i][1] == type) && (theWeapons[i][2]==ws) && ((theWeapons[i][5] == race) || (theWeapons[i][5] == 31))) return theWeapons[i];
}
return -1;
};

function create_infoDiv(name,kocid) {
var Xpos = 10;
var Ypos = 10;
if (GM_getValue("infoDivX",-1) != -1) Xpos = GM_getValue("infoDivX",10);
if (GM_getValue("infoDivY",-1) != -1) Ypos = GM_getValue("infoDivY",10);
makediv('infoDiv',4,0,0,Xpos,Ypos,'#272727','Target Information');
newHTML  = '<table border="0" cellspacing="0" cellpadding="0">';
newHTML += ' <tr><td style="width:100%;text-align:center;color:yellow;font-weight:bold;"><div id="info_name">'+name+'</div></td></tr>';
newHTML += ' <tr><td style="width:100%;">';
newHTML += ' <table border="0" cellpadding="0" cellspacing="0">';
newHTML += '<tr>';
newHTML += '<td valign="top">';
newHTML += '<table border="0" cellspacing="0" cellpadding="0">';
newHTML += '<tr>';
newHTML += '<td>';
newHTML += '<table border="1" cellspacing="2" cellpadding="2">';
newHTML += '<tr><th colspan="3">&nbsp;</th></tr>';
newHTML += '<tr><td class="underline" style="width:90px;">Gold</td><td class="underline" style="width:140px;text-align:right;"><div id="info_gold"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_gold_time"></div></td></tr>';
newHTML += '<tr><td class="underline" style="width:90px;">Turns</td><td class="underline" style="width:140px;text-align:right;"><div id="info_turns"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_turns_time"></div></td></tr>';
newHTML += '<tr><td class="underline" style="width:90px;">Morale</td><td class="underline" style="width:140px;text-align:right;"><div id="info_morale"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_morale_time"></div></td></tr>';
newHTML += '<tr><td class="underline" style="width:90px;">TFF</td><td class="underline" style="width:140px;text-align:right;"><div id="info_tff"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_tff_time"></div></td></tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td>';
newHTML += '<table border="1" cellspacing="2" cellpadding="2">';
newHTML += '<tr><th colspan="3">Personnel</th></tr>';
newHTML += '<tr><td class="underline" style="width:90px;">Attack</td><td class="underline" style="width:140px;text-align:right;"><div id="info_as"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_as_time"></div></td></tr>';
newHTML += '<tr><td class="underline" style="width:90px;">Defense</td><td class="underline" style="width:140px;text-align:right;"><div id="info_ds"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_ds_time"></div></td></tr>';
newHTML += '<tr><td class="underline" style="width:90px;">Untrained</td><td class="underline" style="width:140px;text-align:right;"><div id="info_us"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_us_time"></div></td></tr>';
newHTML += '<tr><td class="underline" style="width:90px;">Coverts</td><td class="underline" style="width:140px;text-align:right;"><div id="info_coverts"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_coverts_time"></div></td></tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td>';
newHTML += '<table border="1" cellspacing="2" cellpadding="2">';
newHTML += '<tr><th colspan="3">Mercenaries</th></tr>';
newHTML += '<tr><td class="underline" style="width:90px;">Attack</td><td class="underline" style="width:140px;text-align:right;"><div id="info_am"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_am_time"></div></td></tr>';
newHTML += '<tr><td class="underline" style="width:90px;">Defense</td><td class="underline" style="width:140px;text-align:right;"><div id="info_dm"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_dm_time"></div></td></tr>';
newHTML += '<tr><td class="underline" style="width:90px;">Untrained</td><td class="underline" style="width:140px;text-align:right;"><div id="info_um"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_um_time"></div></td></tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '</table>';

newHTML += '</td>';
newHTML += '<td style="padding-left:4px;" valign="top">';

newHTML += '<table border="0" cellspacing="0" cellpadding="0">';
newHTML += '<tr>';
newHTML += '<td>';
newHTML += '<table border="1" cellspacing="2" cellpadding="2">';
newHTML += '<tr><th colspan="3">Military Effectiveness</th></tr>';
newHTML += '<tr><td class="underline" style="width:90px;">Strike</td><td class="underline" style="width:140px;text-align:right;"><div id="info_sa"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_sa_time"></div></td></tr>';
newHTML += '<tr><td class="underline" style="width:90px;">Defense</td><td class="underline" style="width:140px;text-align:right;"><div id="info_da"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_da_time"></div></td></tr>';
newHTML += '<tr><td class="underline" style="width:90px;">Spy</td><td class="underline" style="width:140px;text-align:right;"><div id="info_spy"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_spy_time"></div></td></tr>';
newHTML += '<tr><td class="underline" style="width:90px;">Sentry</td><td class="underline" style="width:140px;text-align:right;"><div id="info_sentry"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_sentry_time"></div></td></tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td>';
newHTML += '<table border="1" cellspacing="2" cellpadding="2">';
newHTML += '<tr><th colspan="3">Upgrades</th></tr>';
newHTML += '<tr><td class="underline" style="width:70px;">Fort</td><td class="underline" style="width:164px;text-align:right;"><div id="info_fort"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_fort_time"></div></td></tr>';
newHTML += '<tr><td class="underline" style="width:70px;">Siege</td><td class="underline" style="width:164px;text-align:right;"><div id="info_siege"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_siege_time"></div></td></tr>';
newHTML += '<tr><td class="underline" style="width:70px;">Spy</td><td class="underline" style="width:164px;text-align:right;"><div id="info_covert"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_covert_time"></div></td></tr>';
newHTML += '<tr><td class="underline" style="width:70px;">UP</td><td class="underline" style="width:164px;text-align:right;"><div id="info_up"></div></td><td class="underline" style="width:110px;text-align:right;"><div id="info_up_time"></div></td></tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td>';
newHTML += '<table border="1" cellspacing="2" cellpadding="2">';
newHTML += '<tr><th colspan="2">Update</th></tr>';
newHTML += '<tr><td class="underline" style="width:70px;">Mission</td><td class="underline" style="width:278px;"><div id="info_spyresult"></div></td></tr>';
newHTML += '<tr><td class="underline" style="width:70px;">&nbsp;</td><td class="underline" style="width:278px;text-align:left;"><div id="info_weapons"></div></td></tr>';
newHTML += '<tr><td colspan="2" class="underline" style="text-align:center;"><input type="button" id="info_spybutton" class="cursor" style="font-size:70%;" value="Spy target"></td></tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '</table>';

newHTML += '</td>';
newHTML += '<td style="padding-left:4px;" valign="top">';
newHTML += '<table border="1" cellspacing="0" cellpadding="0">';
newHTML += '<tr>';
newHTML += '<td>';
newHTML += '<table border="1" cellspacing="2" cellpadding="2">';
newHTML += '<tr><th colspan="3">Armory</th></tr>';
newHTML += '<tr>';
newHTML += '<td style="width:480px;">';
newHTML += '<div id="info_armory" style="width:480px;height:350px;overflow:auto;"></div>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += ' </tr>';
newHTML += '</table>';
newHTML += ' </td></tr>';
newHTML += ' <tr>';
newHTML += '</table>';
newHTML += '<input type="hidden" id="spyID" value="'+kocid+'" />';
document.getElementById("content_infoDiv").innerHTML=newHTML;
document.getElementById("info_spybutton").addEventListener('click',function(e) {
var hisID = document.getElementById("spyID").value;
if (GM_getValue("my_ID",-1) != hisID) {
spyTarget(hisID);
} else {
displayMessage(2);
}
},false);
};

var savedInfo = new Array();

function getRowNrfromID(id) {
for (var i=0;i<battlefield.length;i++) {
if (battlefield[i][0] == id) return i;
}
return -1;
};

function infoClick(id,name) {
kocid = parseInt(id);
var url = "http://"+ipadres+"/php/GM_getinfo.php";
var data = "id="+kocid;
if (!document.getElementById("infoDiv")) {
if (document.getElementById("sabotageDiv")) {
closediv("sabotageDiv");
doSabbing = false;
}
create_infoDiv(name,kocid);
} else {
document.getElementById('info_name').innerHTML = name;
}
document.getElementById("spyID").value = kocid;
postdata(url,data,function(response) {
var infoArray = response.split(",");
savedInfo = infoArray;
for (var i=2;i<infoArray.length;i++) if (infoArray[i] == -1) infoArray[i] = '???';

if (infoArray[0] == -1) {
infoArray[0] = '???';
infoArray[1] = -1;
}
fillInfo(infoArray);
var url = "http://"+ipadres+"/php/GM_getarmory.php";
var data = "id="+kocid;
postdata(url,data,function(r) {
showArmory(r);
});
});
};

var rowLighted = false;
var whoRecon;

function singleClick(id) {
if (rowLighted) return;
id = parseInt(id);
battlefieldNumber = id;
var kocid = trim(battlefield[id][0]);
if (parseInt(kocid) == parseInt(GM_getValue("my_ID",-1))) {
displayMessage(2);
return;
}
if (whoRecon != kocid) {
gotValues = new Array('#BD0011','#BD0011','#BD0011','#BD0011');
whoRecon = kocid;
}
var url = "http://"+ipadres+"/php/GM_getinfo.php";
var data = "id="+kocid;
lightrow((id+1),'#005D00');
postdata(url,data,function(response) {
var infoArray = response.split(",");
savedInfo = infoArray;
for (var i=2;i<infoArray.length;i++) if (infoArray[i] == -1) infoArray[i] = '???';
if (battlefield[id][4] > -1) infoArray[0] = battlefield[id][4];
if (infoArray[0] == -1) {
infoArray[0] = '???';
infoArray[1] = -1;
}
GM_log("Coverts (infoArray[16]) of : "+kocid+" -> "+savedInfo[16]);
var url = "http://"+ipadres+"/php/GM_getarmory.php";
var data = "id="+kocid;
postdata(url,data,function(r) {
spyTarget(kocid);
});
});
};

function lightrow(row,color) {
rowLighted = true;
var tables=document.getElementsByTagName("table");
var wTable = getBFtable();
var tRows = tables[wTable].rows;
tRows[row].cells[6].style.backgroundColor=color;
};

function clearRow() {
lightrow(battlefieldNumber+1,'');
rowLighted = false;
};

function fillInfo(infoArray) {
document.getElementById('info_gold').innerHTML = addCommas(infoArray[0]);
document.getElementById('info_gold_time').innerHTML = timeAgo(infoArray[1]);
document.getElementById('info_sa').innerHTML = addCommas(infoArray[2]);
document.getElementById('info_da').innerHTML = addCommas(infoArray[3]);
document.getElementById('info_spy').innerHTML = addCommas(infoArray[4]);
document.getElementById('info_sentry').innerHTML = addCommas(infoArray[5]);
document.getElementById('info_sa_time').innerHTML = timeAgo(infoArray[6]);
document.getElementById('info_da_time').innerHTML = timeAgo(infoArray[7]);
document.getElementById('info_spy_time').innerHTML = timeAgo(infoArray[8]);
document.getElementById('info_sentry_time').innerHTML = timeAgo(infoArray[9]);
document.getElementById('info_as').innerHTML = addCommas(infoArray[10]);
document.getElementById('info_ds').innerHTML = addCommas(infoArray[11]);
document.getElementById('info_us').innerHTML = addCommas(infoArray[12]);
document.getElementById('info_am').innerHTML = addCommas(infoArray[13]);
document.getElementById('info_dm').innerHTML = addCommas(infoArray[14]);
document.getElementById('info_um').innerHTML = addCommas(infoArray[15]);
document.getElementById('info_coverts').innerHTML = addCommas(infoArray[16]);
document.getElementById('info_tff').innerHTML = addCommas(infoArray[17]);
document.getElementById('info_as_time').innerHTML = timeAgo(infoArray[18]);
document.getElementById('info_ds_time').innerHTML = timeAgo(infoArray[19]);
document.getElementById('info_us_time').innerHTML = timeAgo(infoArray[20]);
document.getElementById('info_am_time').innerHTML = timeAgo(infoArray[21]);
document.getElementById('info_dm_time').innerHTML = timeAgo(infoArray[22]);
document.getElementById('info_um_time').innerHTML = timeAgo(infoArray[23]);
document.getElementById('info_coverts_time').innerHTML = timeAgo(infoArray[24]);
document.getElementById('info_tff_time').innerHTML = timeAgo(infoArray[25]);
var fort = '???';
if (infoArray[26] > -1) fort = Upgrades[1][infoArray[26]-1];
document.getElementById('info_fort').innerHTML = fort;
var siege = '???';
if (infoArray[27] > -1) siege = Upgrades[0][infoArray[27]-1];
document.getElementById('info_siege').innerHTML = siege;
document.getElementById('info_covert').innerHTML = addCommas(infoArray[31]);
document.getElementById('info_up').innerHTML = addCommas(infoArray[29]);
morale = '???';
if (infoArray[28] >= -100) morale = addCommas(infoArray[28]);
document.getElementById('info_morale').innerHTML = morale;
var turns = '???';
if (infoArray[30] > -1) turns = addCommas(infoArray[30]);
document.getElementById('info_turns').innerHTML = turns;
document.getElementById('info_morale_time').innerHTML = timeAgo(infoArray[34]);
document.getElementById('info_turns_time').innerHTML = timeAgo(infoArray[36]);
document.getElementById('info_fort_time').innerHTML = timeAgo(infoArray[32]);
document.getElementById('info_siege_time').innerHTML = timeAgo(infoArray[33]);
document.getElementById('info_covert_time').innerHTML = timeAgo(infoArray[37]);
document.getElementById('info_up_time').innerHTML = timeAgo(infoArray[35]);


var statsTable = gettable('User Stats');
var tables = document.getElementsByTagName('table');
var tRows = tables[statsTable].rows;

var newrow = tables[statsTable].rows[9];
var cell1 = newrow.cells[0];
var cell2 = newrow.cells[1];
cell1.innerHTML = '<b>Treasury:</b>';
attackGold = infoArray[0];
cell2.innerHTML = '<span style="color:yellow;">'+addCommas(infoArray[0])+'</span> ('+timeString(infoArray[1])+')';
var newrow = tables[statsTable].rows[11];
var cell1 = newrow.cells[0];
var cell2 = newrow.cells[1];
cell1.innerHTML = '<b>Strike Action:</b>';
cell2.innerHTML = '<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+addCommas(infoArray[2])+'</td><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+timeAgo(infoArray[6])+'</td></tr></table>';
var newrow = tables[statsTable].rows[12];
var cell1 = newrow.cells[0];
var cell2 = newrow.cells[1];
cell1.innerHTML = '<b>Defensive Action:</b>';
cell2.innerHTML = '<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+addCommas(infoArray[3])+'</td><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+timeAgo(infoArray[7])+'</td></tr></table>';
var newrow = tables[statsTable].rows[13];
var cell1 = newrow.cells[0];
var cell2 = newrow.cells[1];
cell1.innerHTML = '<b>Spy Rating:</b>';
cell2.innerHTML = '<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+addCommas(infoArray[4])+'</td><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+timeAgo(infoArray[8])+'</td></tr></table>';
var newrow = tables[statsTable].rows[14];
var cell1 = newrow.cells[0];
var cell2 = newrow.cells[1];
cell1.innerHTML = '<b>Sentry Rating:</b>';
cell2.innerHTML = '<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+addCommas(infoArray[5])+'</td><td style="border-width:0px;padding:0px;margin:0px;" width="50%" align="right">'+timeAgo(infoArray[9])+'</td></tr></table>';
};

function placeInArmory(cWeapon,quantity) {
for (var i=0;i<tArmory.length;i++) if (tArmory[i][0] == cWeapon[3]) {
if (quantity != -1) tArmory[i][2] = quantity;
return;
}
tArmory[tArmory.length] = new Array(cWeapon[3],cWeapon[1],quantity);
};

function updateArmory(tname,ttype,quantity,strength,race) {
var stArr = strength.split("/");
stArr[0] = stArr[0].replace(/,/g,'');
stArr[1] = stArr[1].replace(/,/g,'');
var damageStrength = parseInt(stArr[0]);
var weaponStrength = parseInt(stArr[1]);
var cWeapon = new Array();
if (isNaN(damageStrength)) damageStrength = -1;
if (isNaN(weaponStrength)) weaponStrength = -1;
ttype = typeNr(ttype);
if ((tname == '???') && (ttype == -1)) return;
if ((tname == '???') && (damageStrength == -1) && (weaponStrength == -1)) return;
if (tname != '???') cWeapon = getWeaponByName(tname,race);
if (tname == '???') {
if ((ttype != -1) && ((damageStrength != -1) || (weaponStrength != -1))) {
var ws = weaponStrength;
if (weaponStrength == -1) ws = damageStrength;
cWeapon = getWeaponByType(ttype,ws,race);
}
}
if (cWeapon.length-1 > -1) {
quantity = parseInt(quantity);
if (isNaN(quantity)) quantity = -1;
placeInArmory(cWeapon,quantity);
}
};

var inArmory = 0;
var haveAll  = 0;

function getReconWeapons(id,race,responseText) {
if (nowReconning != id) {
tArmory = new Array();
nowReconning = id;
}

WeaponTable = FindText(responseText,'<tr><th colspan="4">Weapons</th></tr>','<form method="get" action="attack.php">');
var nowInArmory = WeaponTable.length-1;
wRow = WeaponTable.split('<tr>');
var iRow;
inArmory = 0;
for (iRow=2;iRow<wRow.length;iRow++) {
if(InStr(wRow[iRow],'td align="right">') == true){
inArmory = wRow.length-2;
cWeap = wRow[iRow].split('align="right">');
wtype= FindText(cWeap[1],'','</td>');
qu = FindText(cWeap[2],'','</td>').replace(/,/g,'');
st = FindText(cWeap[3],'','</td>').replace(/,/g,'');
weap = FindText(wRow[iRow],"<td>","</td>");
updateArmory(weap,wtype,qu,st,race);
}
}
};

function getSoldiers(responseText) {
var SoldiersTable = FindText(responseText,'<th colspan="4" align="center">Army Size:</th>','<p>');
var wRow = SoldiersTable.split('<tr>');
var iRow;
var solArray = new Array();
for (iRow=1;iRow<SoldiersTable.length;iRow++) {
if(InStr(wRow[iRow],'td align="right">') == true){
cSoldiers = wRow[iRow].split('align="right">');
solArray[iRow-2] = new Array();
solArray[iRow-2][0] = replaceAll(FindText(cSoldiers[1],'','</td>'),',','');
if (solArray[iRow-2][0] == '???') solArray[iRow-2][0] = -1;
solArray[iRow-2][1] = replaceAll(FindText(cSoldiers[2],'','</td>'),',','');
if (solArray[iRow-2][1] == '???') solArray[iRow-2][1] = -1;
solArray[iRow-2][2] = replaceAll(FindText(cSoldiers[3],'','</td>'),',','');
if (solArray[iRow-2][2] == '???') solArray[iRow-2][2] = -1;
}
}
return solArray;
};

var gotValues = new Array('#BD0011','#BD0011','#BD0011','#BD0011');

function getValuesRecon(race,responseText) {
var Username = FindText(responseText,"Under the cover of night, your spy sneaks into ","'s camp.");
var Soldiers = getSoldiers(responseText);
var Strike = FindText(FindText(responseText,"<td>Strike Action:</td>","</tr>"),">","</").replace(/,/g,'');
var Defense = FindText(FindText(responseText,"<td>Defensive Action</td>","</tr>"),">","</").replace(/,/g,'');
var TheSpy = FindText(FindText(responseText,"<td>Spy Rating</td>","</tr>"),">","</").replace(/,/g,'');
var TheSentry = FindText(FindText(responseText,"<td>Sentry Rating</td>","</tr>"),">","</").replace(/,/g,'');
var NumberOfCoverts = FindText(FindText(responseText,"<td>Covert Operatives:</td>","</tr>"),">","</").replace(/,/g,'');
var CovertSkill = FindText(FindText(responseText,"<td>Covert Skill:</td>","</tr>"),">","</").replace(/,/g,'');
var SiegeTech = FindText(FindText(responseText,"<td>Siege Technology:</td>","</tr>"),">","</").replace(/,/g,'');
var AttackTurns = FindText(FindText(responseText,"<td>Attack Turns:</td>","</tr>"),">","</").replace(/,/,'');
var UnitProduction = FindText(FindText(responseText,"<td>Unit Production:</td>","</tr>"),">","<").replace(/,/,'');
var UsersGold = FindText(FindText(responseText,"Treasury","</td>"),'">'," Gold").replace(/,/g,'');
var StatsID = FindText(responseText,'"id" value="','"');
getReconWeapons(StatsID,race,responseText);
var weaponString = '';
for (var i=0;i<tArmory.length;i++) {
if (weaponString.length > 0) weaponString += '|';
weaponString += tArmory[i][0]+","+tArmory[i][2];
}
haveAll = 0;
if (inArmory == tArmory.length) haveAll = 1;
if (Strike == '???') Strike = -1;
if (Defense == '???') Defense = -1;
if (TheSpy == '???') TheSpy = -1;
if (TheSentry == '???') TheSentry = -1;
if (NumberOfCoverts == '???') NumberOfCoverts = -1;
if (CovertSkill == '???') CovertSkill = -1;
if (SiegeTech == '???') SiegeTech = -1;
if (AttackTurns == '???') AttackTurns =-1;
if (UnitProduction == '???') UnitProduction = -1;
if (UsersGold == '???') UsersGold = -1;
if (Strike != -1) {savedInfo[2] = Strike;savedInfo[6] = 0;}
if (Defense != -1) {savedInfo[3] = Defense;savedInfo[7] = 0;}
if (TheSpy != -1) {savedInfo[4] = TheSpy;savedInfo[8] = 0;}
if (TheSentry != -1) {savedInfo[5] = TheSentry;savedInfo[9] = 0;}

if (Soldiers[1][0] != -1) {savedInfo[10] = Soldiers[1][0];savedInfo[18] = 0;}
if (Soldiers[1][1] != -1) {savedInfo[11] = Soldiers[1][1];savedInfo[19] = 0;}
if (Soldiers[1][2] != -1) {savedInfo[12] = Soldiers[1][2];savedInfo[20] = 0;}
if (Soldiers[0][0] != -1) {savedInfo[13] = Soldiers[0][0];savedInfo[21] = 0;}
if (Soldiers[0][1] != -1) {savedInfo[14] = Soldiers[0][1];savedInfo[22] = 0;}
if (Soldiers[0][2] != -1) {savedInfo[15] = Soldiers[0][2];savedInfo[23] = 0;}

if (CovertSkill != -1) {savedInfo[31] = CovertSkill; savedInfo[37] = 0;}
if (NumberOfCoverts != -1) {savedInfo[16] = NumberOfCoverts; savedInfo[24] = 0;}
if (SiegeTech != -1) {savedInfo[27] = UpgradeNumber(SiegeTech,0); savedInfo[33] = 0;}
if (AttackTurns != -1) {savedInfo[30] = AttackTurns; savedInfo[36] = 0;}
if (UnitProduction != -1) {savedInfo[29] = UnitProduction; savedInfo[35] = 0;}
if (UsersGold != -1) {savedInfo[0] = UsersGold; savedInfo[1] = 0;}
if (document.getElementById("infoDiv")) fillInfo(savedInfo);

if ((!document.getElementById("info_spyresult")) && (!doSabbing)){
if ((savedInfo[2] != -1) && (gotValues[0] != '#00A700')) gotValues[0] = '#BDA63A';
if ((savedInfo[3] != -1) && (gotValues[1] != '#00A700')) gotValues[1] = '#BDA63A';
if ((savedInfo[4] != -1) && (gotValues[2] != '#00A700')) gotValues[2] = '#BDA63A';
if ((savedInfo[5] != -1) && (gotValues[3] != '#00A700')) gotValues[3] = '#BDA63A';
if (Strike != -1) gotValues[0] = '#00A700';
if (Defense != -1) gotValues[1] = '#00A700';
if (TheSpy != -1) gotValues[2] = '#00A700';
if (TheSentry != -1) gotValues[3] = '#00A700';

var newHTML = '<table border="0" cellpadding="2" cellspacing="2">';
newHTML += '<tr><td>Updated: <span style="color:yellow;">'+timeAgo(savedInfo[7])+'</span> ago</td></tr>';
newHTML += '<tr><td>';
newHTML += ' <table border="0" width="100%" cellpadding="2" cellspacing="2">';
newHTML += '<tr><td style="width:25%;text-align:center;background-color:'+gotValues[0]+';">SA</td>';
newHTML += '<td style="width:25%;text-align:center;background-color:'+gotValues[1]+';">DA</td>';
newHTML += '<td style="width:25%;text-align:center;background-color:'+gotValues[2]+';">SP</td>';
newHTML += '<td style="width:25%;text-align:center;background-color:'+gotValues[3]+';">SE</td></tr>';
newHTML += ' </table>';
newHTML += '</td></tr>';
newHTML += '</table>';
if (document.getElementById("notifyDAtime")) document.getElementById('notifyDAtime').innerHTML = newHTML;

lightrow((battlefieldNumber+1),'#00A700');
setTimeout(clearRow,750);
}

var data = "ID="+StatsID;
data += "&SA="+Strike;
data += "&DA="+Defense;
data += "&SPY="+TheSpy;
data += "&SENTRY="+TheSentry;
data += "&TAS="+Soldiers[1][0];
data += "&TDS="+Soldiers[1][1];
data += "&US="+Soldiers[1][2];
data += "&TAM="+Soldiers[0][0];
data += "&TDM="+Soldiers[0][1];
data += "&UM="+Soldiers[0][2];
data += "&COVERTS="+NumberOfCoverts;
data += "&SIEGE="+SiegeTech;
data += "&COVERTSKILL="+CovertSkill;
data += "&CONSCRIPTION="+UnitProduction;
data += "&GAMETURNS="+AttackTurns;
data += "&GOLD="+UsersGold;
data += "&HAVEALL="+haveAll;
data += "&WEAPONS="+weaponString;
var str = "Armory:"+inArmory+" | Found type:"+tArmory.length;
if (document.getElementById("info_weapons")) document.getElementById("info_weapons").innerHTML = str;
var url = "http://"+ipadres+"/php/GM_recon.php";
postdata(url,data,function(r) {
if ((!document.getElementById("info_spyresult")) && (!doSabbing)) {
battlefield[battlefieldNumber][4] = savedInfo[2];
battlefield[battlefieldNumber][5] = savedInfo[6];
battlefield[battlefieldNumber][8] = savedInfo[4];
battlefield[battlefieldNumber][9] = savedInfo[8];
battlefield[battlefieldNumber][10] = savedInfo[5];
battlefield[battlefieldNumber][11] = savedInfo[9];
updateCurrentBF(battlefieldNumber,savedInfo[0],savedInfo[3],savedInfo[1],savedInfo[7]);
} else {
if (doSabbing) {
getSabInfo(StatsID);
} else {
showArmory(r);
}
}
});
};

function showArmory(r) {
if (trim(r).length == 0) return;
var hArmory = r.split("|");
hisArmory = new Array();
if (trim(r).length > 0) {
for (var i=0;i<hArmory.length;i++) {
var tWeapon = hArmory[i].split(",");
var weap = getWeaponByKocNumber(tWeapon[0]);
var pArr = new Array(weap,tWeapon[1],tWeapon[2],0);
hisArmory.push(pArr);
}
}
var sortOrder = new Array(0,1,2,3);
hisArmory = sortByWeapons(sortOrder);
newHTML = '<table border="0" cellpadding="0" cellspacing="0" width="450">';
for (var i=0;i<hisArmory.length;i++) {
var weap = hisArmory[i][0][0];
var q= hisArmory[i][1];
if (parseInt(q) == -1) q = '<span style="color:red">???</span>';
var thetime = (hisArmory[i][2] > -1) ? timeAgo(hisArmory[i][2]) : '<span style="color:red">'+timeAgo(hisArmory[i][2])+'</span>';
newHTML += '<tr><td class="underline">'+weap+'</td><td class="underline" align="right">'+addCommas(q)+'</td><td class="underline" align="right">'+thetime+'</td></tr>';
}
newHTML += '</table>';
document.getElementById("info_armory").innerHTML = newHTML;
};

function updateCurrentBF(nr,newgold,newda,newgoldtime,newdatime) {
battlefield[nr][2] = newgold;
battlefield[nr][3] = newgoldtime;
battlefield[nr][6] = newda;
battlefield[nr][7] = newdatime;
var tables=document.getElementsByTagName("table");
var wTable = getBFtable();
if (wTable == -1) return;
var tRows = tables[wTable].rows;
nr++;

var amount = tRows[nr].cells[5].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
var time = tRows[nr].cells[5].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
var tff= tRows[nr].cells[3].innerHTML.replace(/,/g,'');
var gold= amount.innerHTML.replace(/,/g,'');
var g= addCommas(gold);
var t= "Gold";
var cl= GM_getValue("GoldColor6","#ffffff");
var tcl= "#ffffff";
var raceName= trim(tRows[nr].cells[4].innerHTML);
var raceNr= giveRaceNr(raceName);

if ((amount.innerHTML == "???") || (time.innerHTML != "Gold")) {
if (newgold != -1) {
t = timeString(newgoldtime);
tcl = "yellow";
g = addCommas(newgold);
var cl = GM_getValue("GoldColor5","#909090");
if ((GM_getValue("rfl_HLGold",0) == 1)  || (GM_getValue("rfl_smartHL",1) == 1)) {
if (GM_getValue("rfl_doMinTFF",0) == 1) {
cl = makeBFcolor((nr-1),false,tff,newda,newgold,raceNr);
}
}
}
} else {
if ((GM_getValue("rfl_HLGold",0) == 1) || (GM_getValue("rfl_smartHL",1) == 1)) cl = makeBFcolor((nr-1),true,tff,newda,gold,raceNr);
}

amount.style.color = cl;
amount.style.cursor = 'pointer';
amount.innerHTML = g;
time.style.color = tcl;
if (t != "Gold") time.style.fontSize = '70%';
time.innerHTML = t;
if (newda > -1) tRows[nr].cells[6].innerHTML = addCommas(newda);
};

var turing = -1;
var reconRace = -1;
var battlefieldNumber = -1;
var reconResults = new Array();

function setupRecon(id) {
doRecon = true;
nowReconning = trim(id);
GM_log(">Setting up recon: "+nowReconning);
tArmory = new Array();
GM_log("NEW ID armory");
getStatsForRecon();
};

function getStatsForRecon() {
var url = "http://www.kingsofchaos.com/stats.php?id="+nowReconning;
getdata(url,function(response) {
turing = FindText(response,'turing" value="','"');
parseStatsPage(response,nowReconning);
});
};

function spyTarget(id) {
GM_log(">SpyTarget : "+id);
GM_log(">nowReconning : "+nowReconning);
if (document.getElementById("info_spyresult")) document.getElementById("info_spyresult").innerHTML = "Sending spies....";
if (nowReconning != id) {
setupRecon(id);
} else {
var url = "http://www.kingsofchaos.com/attack.php?id="+nowReconning;
GM_log(">GET url : "+url);
getdata(url,function(res) {
GM_log(">Got response from url, now find turing...");
turing = FindText(res,'turing" value="','"');
GM_log(">Found turing : "+turing);
var data = "mission_type=recon";
data += "&defender_id="+nowReconning;
data += "&turing="+turing;
var url = "http://www.kingsofchaos.com/attack.php";
GM_log(">Send POST request with data : "+data);
postdata(url,data,function(response) {
GM_log(">Got response from recon");
checkReconResult(id,response);
});
});
}
};

function checkReconResult(id,response) {
GM_log(">Checking reconresult...");
if (InStr(response,'Invalid User ID')) {
return;
}
if (InStr(response,'Please login to view that page')) {
loadthePage("http://www.kingsofchaos.com/");
return;
}
if (InStr(response,'You can recon a player only')) {
if (document.getElementById("info_spyresult")) {
document.getElementById("info_spyresult").innerHTML = "You can only recon 15 times";
} else {
if (doSabbing) {
document.getElementById("sab_result").innerHTML = "You can only recon 15 times";
} else {
lightrow((battlefieldNumber+1),'#1F1EB1');
setTimeout(clearRow,750);
}
}
return;
}
if (InStr(response,'spy moves stealthily through')) {
if (document.getElementById("info_spyresult")) {
document.getElementById("info_spyresult").innerHTML = '<span style="color:lime;">Successful recon.</span>';
}
if (doSabbing) {
document.getElementById("sab_result").innerHTML = '<span style="color:lime;">Successful recon.</span>';
}
getValuesRecon(reconRace,response);
return;
}
if (document.getElementById("info_spyresult")) {
document.getElementById("info_spyresult").innerHTML = '<span style="color:red;">Recon failed...</span>';
} else {
if (doSabbing) {
document.getElementById("sab_result").innerHTML = '<span style="color:red;">Recon failed...</span>';
} else {
lightrow((battlefieldNumber+1),'#BD0011');
setTimeout(clearRow,750);
}
}
};

function UpgradeNumber(upgrade,type) {
for (var i=0;i<Upgrades[type].length;i++) {
if (upgrade == Upgrades[type][i]) return (i+1);
}
alert("ERROR UpgradeNumber -> unkown upgrade "+upgrade);
};

function typeNr(type) {
if (type == 'Attack') return 0;
if (type == 'Defend') return 1;
if (type == 'Spy') return 2;
if (type == 'Sentry') return 3;
return -1;
};

function invested() {
var Xpos = 10;var Ypos = 10;
if (GM_getValue("investedDivX",-1) != -1) Xpos = GM_getValue("investedDivX",10);
if (GM_getValue("investedDivY",-1) != -1) Ypos = GM_getValue("investedDivY",10);
makediv('investedDiv',3,0,0,Xpos,Ypos,'#272727','Invested Values');
var armoryValues = GM_getValue("rfl_ARMORYVALUES","0,0,0,0");
var sellValues = GM_getValue("rfl_SELLVALUES","0,0,0,0");
var myArmory = GM_getValue("rfl_myARMORY","");
var av = armoryValues.split(",");
var sv = sellValues.split(",");
var total1=0;
var total2=0;
for (var i=0;i<av.length;i++) {
total1 += parseInt(av[i]);
total2 += parseInt(sv[i]);
}
newHTML =  '<table cellpadding="0" cellspacing="0">';
newHTML +=  '<tr><th>Stat</th><th>BuyValue</th><th>SellValue</th></tr>';
newHTML +='<tr><td class="underline" style="width:90px;">Strike</td><td class="underline" style="width:170px;text-align:right;">'+addCommas(av[0])+'</td><td class="underline" style="width:170px;text-align:right;">'+addCommas(sv[0].toString())+'</td></tr>';
newHTML +='<tr><td class="underline" style="width:90px;">Defensive</td><td class="underline" style="width:170px;text-align:right;">'+addCommas(av[1])+'</td><td class="underline" style="width:170px;text-align:right;">'+addCommas(sv[1].toString())+'</td></tr>';
newHTML +='<tr><td class="underline" style="width:90px;">Spy</td><td class="underline" style="width:170px;text-align:right;">'+addCommas(av[2])+'</td><td class="underline" style="width:170px;text-align:right;">'+addCommas(sv[2].toString())+'</td></tr>';
newHTML +='<tr><td class="underline" style="width:90px;">Sentry</td><td class="underline" style="width:170px;text-align:right;">'+addCommas(av[3])+'</td><td class="underline" style="width:170px;text-align:right;">'+addCommas(sv[3].toString())+'</td></tr>';
newHTML +='<tr><td class="underline" style="width:90px;">Total</td><td class="underline" style="width:170px;text-align:right;font-weight:bold;">'+addCommas(total1.toString())+'</td><td class="underline" style="width:170px;text-align:right;font-weight:bold;">'+addCommas(total2.toString())+'</td></tr>';
newHTML +=  '</table>';
document.getElementById("content_investedDiv").innerHTML = newHTML;
};

var lastAttacked = -1;
var attackResults = new Array(0,0,0,0,0);

function attackDiv(name,aType,x,y) {
var Xpos = x;var Ypos = y-250;
var attackString = (aType == 1) ? "Attack" : "Raid";
makediv('attackDiv',3,0,0,Xpos,Ypos,'#272727',attackString+' '+name);
newHTML =  '<table cellpadding="0" cellspacing="0">';
newHTML +='<tr><td style="width:140px;">Attack gold</td><td colspan="2" style="width:220px;text-align:right;"><div id="attack_gold"></div></td></tr>';
newHTML +='<tr><td class="underline" style="width:140px;">Result</td><td class="underline" colspan="2" style="width:220px;text-align:left;"><div id="attack_result"></div></td></tr>';
newHTML +='<tr><td style="width:140px;">Your Damage</td><td colspan="2" style="width:220px;text-align:right;"><div id="attack_myDamage"></div></td></tr>';
newHTML +='<tr><td class="underline" style="width:140px;">His Damage</td><td class="underline" colspan="2" style="width:220px;text-align:right;"><div id="attack_hisDamage"></div></td></tr>';
newHTML +='<tr><td style="width:140px;">Your casualties</td><td colspan="2" style="width:220px;text-align:right;"><div id="attack_myCasualties"></div></td></tr>';
newHTML +='<tr><td class="underline" style="width:140px;">His casualties</td><td class="underline" colspan="2" style="width:220px;text-align:right;"><div id="attack_hisCasualties"></div></td></tr>';
newHTML +='<tr><td class="underline" style="width:140px;">Stole</td><td class="underline" style="width:170px;text-align:right;font-weight:bold;"><div id="attack_stole"></div></td><td class="underline" style="width:50px;text-align:right;"><div id="attack_percent">0%</div></td></tr>';
newHTML +='<tr><td class="underline" style="width:140px;">Treasury</td><td class="underline" style="width:170px;text-align:right;"><div id="attack_treasury"></div></td><td class="underline" style="width:50px;">&nbsp;</td></tr>';
newHTML +=  '  <tr><td colspan="3" style="text-align:center;">';
newHTML +='<table width="100%" cellpadding="0" cellspacing="0">';
newHTML +='<tr>';
newHTML +='<td width="50%" align="center"><input type="button" id="attack_armory" value="armory" /></td>';
newHTML +='<td width="50%" align="center"><input type="button" id="attack_close" value="Close" /></td>';
newHTML +='</tr>';
newHTML +=  '</table>';
newHTML +=  '</td></tr></table>';
document.getElementById("content_attackDiv").innerHTML = newHTML;
document.getElementById("attack_armory").addEventListener('click',function(e) {
loadthePage("http://www.kingsofchaos.com/armory.php");
},false);
document.getElementById("attack_close").addEventListener('click',function(e) {
closediv("attackDiv");
},false);
};

function setupAttack(id) {
if (id == GM_getValue("my_ID",-1)) {
displayMessage(0);
doingAttack = false;
return;
}
if (id == lastAttacked) return;
attackResults = new Array(0,0,0,0,0);
lastAttacked = id;
};

var doingAttack = false;

function doAttack_noTuring(id,name,gold,attackType,x,y) {
if (doingAttack) return;
doingAttack = true;
setupAttack(id);
if (!doingAttack) return;
var aType = 2;
if (attackType == "attack") aType = 1;
if (!document.getElementById("attackDiv")) attackDiv(name,aType,x,y);
var gldStr = (parseInt(gold) - attackResults[3]).toString();
document.getElementById("attack_gold").innerHTML = addCommas(gldStr);
document.getElementById("attack_result").innerHTML = "Attacking...";
var url = "http://www.kingsofchaos.com/attack.php?id="+id;
getdata(url,function(r) {
turing = FindText(r,'turing" value="','"');
var params = 'attack_type='+attackType+'&defender_id=' + id+ '&turing=' + turing;
var url = 'http://www.kingsofchaos.com/attack.php';
postdata(url,params,function(response) {
parseAttack(id,gold,aType,response);
});
});
};


function doAttack(id,name,gold,turing,attackType,x,y) {
if (doingAttack) return;
doingAttack = true;
setupAttack(id);
if (!doingAttack) return;
var aType = 2;
if (attackType == "attack") aType = 1;
if (!document.getElementById("attackDiv")) attackDiv(name,aType,x,y);
var gldStr = (parseInt(gold) - attackResults[3]).toString();
document.getElementById("attack_gold").innerHTML = addCommas(gldStr);
document.getElementById("attack_result").innerHTML = "Attacking...";
params = 'attack_type='+attackType+'&defender_id=' + id+ '&turing=' + turing;
var url = 'http://www.kingsofchaos.com/attack.php';
postdata(url,params,function(response) {
parseAttack(id,gold,aType,response);
});
};

function parseAttack(id,gold,attackType,page) {
allPagesInfo(page);
if (InStr(page,'only 10 times in 24 hours') == true) {
document.getElementById("attack_result").innerHTML = '<span style="color:blue;font-weight:bold;">10 attacks done today</span>';
doingAttack = false;
return;
}
var myDamage = -1;
var hisDamage = -1;
var myCasualties = -1;
var hisCasualties = -1;
var result = -1;
var stole = -1;
var percent = 0;
if (InStr(page,'retreated') == true) {
result = 2;
} else {
attackResults[4]++;
myDamage = trim(FindText(FindText(page,'troops inflict','/font>'),'>','<')).replace(/,/g,'');
hisDamage= trim(FindText(FindText(page,'attack and inflict','/font>'),'>','<')).replace(/,/g,'');
hisCasualties  = 0;
if (InStr(page,'The enemy sustains')) hisCasualties = trim(FindText(FindText(page,'The enemy sustains','/font>'),'>','<')).replace(/,/g,'');
myCasualties  = 0;
if (InStr(page,'Your army sustains')) myCasualties = trim(FindText(FindText(page,'Your army sustains','/font>'),'>','<')).replace(/,/g,'');
attackResults[1]+=parseInt(hisCasualties);
attackResults[2]+=parseInt(myCasualties);
stole = -1;
if (InStr(page,'ou stole')) {
result = 1;
stole  = trim(FindText(FindText(page,'ou stole','/font>'),'>','<')).replace(/,/g,'');
attackResults[0]+=parseInt(stole);
if (gold != -1) percent = Math.floor(((parseInt(stole) / parseInt((gold-attackResults[3]))) * 100));
attackResults[3]+=parseInt(stole);
}
if (stole == -1) {
if (InStr(page,'your soldiers flee')) {
result = 0;
}
}
}
var resultLine = '';
if (result > -1) {
if (result == 0) resultLine = '<span style="color:red;font-weight:bold;">Attack Defended</span>';
if (result == 1) resultLine = '<span style="color:lime;font-weight:bold;">Attack successfull</span>';
if (result == 2) resultLine = '<span style="color:yellow;font-weight:bold;">Soldiers Retreated!!</span>';
document.getElementById("attack_result").innerHTML = resultLine;
document.getElementById("attack_hisCasualties").innerHTML = '<span style="color:lime;">'+addCommas(attackResults[1].toString())+'</span>';
document.getElementById("attack_myCasualties").innerHTML = '<span style="color:red;">'+addCommas(attackResults[2].toString())+'</span>';
document.getElementById("attack_myDamage").innerHTML = addCommas(myDamage);
document.getElementById("attack_hisDamage").innerHTML = addCommas(hisDamage);
document.getElementById("attack_stole").innerHTML = '<span style="font-weight:bold;">'+addCommas(attackResults[0].toString())+'<span>';
document.getElementById("attack_percent").innerHTML = '<span style="font-weight:bold;">'+percent.toString()+'%<span>';
document.getElementById("attack_treasury").innerHTML = addCommas(GM_getValue("rfl_GOLD",0));
}

if (result != -1) {
var data = "id="+GM_getValue("my_ID",-1);
data += "&defender_id="+id;
data += "&attacktype="+attackType;
data += "&myDamage="+myDamage;
data += "&hisDamage="+hisDamage;
data += "&myCasualties="+myCasualties;
data += "&hisCasualties="+hisCasualties;
data += "&percentage="+percent;
data += "&result="+result;
data += "&stole="+stole;
data += "&gold="+gold;
var url = "http://"+ipadres+"/php/GM_saveAttack.php";
postdata(url,data,function(r) {
doingAttack = false;
if (GM_getValue("rfl_doattackbuy",0) == 1) setTimeout(startBuy,1);
});
} else {
GM_log("ERROR! - Attack result gave an unexpected result, sorry :/");
doingAttack = false;
}
};


function buildsabdiv() {
var Xpos = 10;var Ypos = 10;
if (GM_getValue("sabotageDivX",-1) != -1) Xpos = GM_getValue("sabotageDivX",10);
if (GM_getValue("sabotageDivY",-1) != -1) Ypos = GM_getValue("sabotageDivY",10);
makediv('sabotageDiv',3,0,0,Xpos,Ypos,'#272727','<span style="color:yellow">SABOTAGE</span>');
newHTML = '<table border="0" cellpadding="0" cellspacing="2">';
newHTML += '<tr>';
newHTML += '<td valign="top">';
newHTML += '<table border="0" cellspacing="2" cellpadding="0">';
newHTML += '<tr>';
newHTML += '<td>';
newHTML += '<table border="1" cellpadding="0" cellspacing="0">';
newHTML += '<tr>';
newHTML += '<th colspan="3">Player information</th>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td class="cp" style="width:80px;">Name</td><td style="width:290px;" colspan="2" class="cp"><div id="sab_name">loading...</div></td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td class="cp">Sentry</td><td class="cp"><div id="sab_sentry">loading...</div></td><td class="cp" style="width:120px;text-align:right;"><div id="sab_sentry_time">1w 4d 08:12</td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '<td>';
newHTML += '<table border="1" cellpadding="0" cellspacing="0">';
newHTML += '<tr>';
newHTML += '<th colspan="4">Last sabotage information</th>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td class="cp" id="sabber_name" style="width:120px;">Last sab</td><td class="cp" style="width:200px;"><div id="sab_info_weapon1">loading...</div></td><td class="cp" style="text-align:right;width:120px;"><div id="sab_info_time1">14w 3d 08:14</div></td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td class="cp">My last sab</td><td class="cp"><div id="sab_info_weapon2"></div></td><td class="cp" style="width:120px;text-align:right;"><div id="sab_info_time2"></div></td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td colspan="2">';
newHTML += '<table border="0" width="100%" cellpadding="0" cellspacing="0">';
newHTML += '<tr>';
newHTML += '<td>';
newHTML += '<table border="1" width="100%" cellpadding="0" cellspacing="2">';
newHTML += '<tr>';
newHTML += '<th colspan = "7">Setup mission</th>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td class="underline" style="width:80px;" align="center">amount</td>';
newHTML += '<td class="underline" style="width:160px;" align="center">weapon to sab</td>';
newHTML += '<td class="underline" style="width:50px;"  align="center">spies</td>';
newHTML += '<td class="underline" style="width:50px;"  align="center">turns</td>';
newHTML += '<td class="underline" width="*">&nbsp;</td>';
newHTML += '<td class="underline" width="*">&nbsp;</td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td align="center">';
newHTML += '<input type="text" id="sab_amount" style="width:40px;" />';
newHTML += '</td>';
newHTML += '<td align="center">';
newHTML += '<select id="sab_weapon" style="width:160px;">';
newHTML += '<option value="73">Nunchaku</option>';
newHTML += '<option value="75">Lookout Tower</option>';
newHTML += '<option value="50">Blackpowder missile</option>';
newHTML += '</select>';
newHTML += '</td>';
newHTML += '<td align="center">';
newHTML += '<input type="text" id="sab_sendspies" style="width:25px;" value="1" />';
newHTML += '</td>';
newHTML += '<td align="center">';
newHTML += '<select id="sab_turns">';
newHTML += '<option value="1">1</option>';
newHTML += '<option value="2">2</option>';
newHTML += '<option value="3">3</option>';
newHTML += '<option value="4">4</option>';
newHTML += '<option value="5" SELECTED>5</option>';
newHTML += '</select>';
newHTML += '</td>';
newHTML += '<td align="right">';
newHTML += '<input type="button" id="sab_dosab" value="sabotage" />';
newHTML += '</td>';
newHTML += '<td align="right">';
newHTML += '<input type="button" id="sab_recon" value="Recon Target" />';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td style="padding-top:4px;">';
newHTML += '<table border="0" width="100%" cellpadding="0" cellspacing="0">';
newHTML += '<tr>';
newHTML += '<td class="cp" style="width:90px;">Attempt:</td>';
newHTML += '<td class="cp" style="width:40px;"><div id="sab_attempt">0</div></td>';
newHTML += '<td class="cp" style="width:90px;">Result:</td>';
newHTML += '<td class="cp"><div id="sab_result"></div></td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td style="padding-top:4px;">';
newHTML += '<table border="0" width="100%" cellspacing="0" cellpadding="0">';
newHTML += '<tr>';
newHTML += '<th>Tools lost</th><th style="width:550px;">Sabotage result</th>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td valign="top">';
newHTML += '<table border="0" width="100%" cellpadding="0" cellspacing="0">';
newHTML += '<tr>';
newHTML += '<td class="cp underline" id="l_toolname1">Nunchaku</td><td class="cp underline" align="right"><div id="l_tool1">0</div></td>';
newHTML += '</tr><tr>';
newHTML += '<td class="cp underline" id="l_toolname2">Skeleton key</td><td class="cp underline" align="right"><div id="l_tool2">0</div></td>';
newHTML += '</tr><tr>';
newHTML += '<td class="cp underline" id="l_toolname3">Grappling hook</td><td class="cp underline" align="right"><div id="l_tool3">0</div></td>';
newHTML += '</tr><tr>';
newHTML += '<td class="cp underline" id="l_toolname4">Cloak</td><td class="cp underline" align="right"><div id="l_tool4">0</div></td>';
newHTML += '</tr><tr>';
newHTML += '<td class="cp underline" id="l_toolname5">Dirk</td><td class="cp underline" align="right"><div id="l_tool5">0</div></td>';
newHTML += '</tr><tr>';
newHTML += '<td class="cp underline" id="l_toolname6">Rope</td><td class="cp underline" align="right"><div id="l_tool6">0</div></td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '<td align="right">';
newHTML += '<textarea id="sab_textlines" style="width:550px;height:112px;"></textarea>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '<td valign="top">';
newHTML += '<table border="0" width="432" cellpadding="0" cellspacing="2">';
newHTML += '<tr>';
newHTML += '<th>Sort Armory information</th>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td>';
newHTML += '<table width="100%" border="0" cellpadding="0" cellspacing="0">';
newHTML += '<tr>';
newHTML += '<td><input type="radio" name="sort" id="sort_strength" checked /></td><td>Strength</td>';
newHTML += '<td><input type="radio" name="sort" id="sort_value" /></td></td><td>Sabvalue</td>';
newHTML += '<td><input type="radio" name="sort" id="sort_type" /></td></td><td>Type</td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<th>Armory information</th>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td>';
newHTML += '<div style="width:432px;height:270px;overflow:auto;" id="sab_armory"></div>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '</table>';
document.getElementById("content_sabotageDiv").innerHTML = newHTML;
document.getElementById("sab_weapon").addEventListener('change',function(e) {
fillAmount();
},false);
document.getElementById("sab_turns").addEventListener('change',function(e) {
fillAmount();
},false);
document.getElementById("sort_strength").addEventListener('click',function(e) {
hisArmory = sortWeaponsOnStrength(hisArmory);
displayArmory();
fillAmount();
},false);
document.getElementById("sort_value").addEventListener('click',function(e) {
hisArmory = sortWeaponsOnValue(hisArmory);
displayArmory();
fillAmount();
},false);
document.getElementById("sort_type").addEventListener('click',function(e) {
hisArmory = sortByWeapons(new Array(3,2,0,1));
displayArmory();
fillAmount();
},false);
document.getElementById("sab_dosab").addEventListener('click',function(e) {
doSabbing = false;
if (parseInt(sabTarget) == parseInt(GM_getValue("my_ID",-1))) {
displayMessage(1);
} else {
e.target.value = 'Sabbing...';
e.target.disabled = true;
execSabotage(sabTarget);
}
},false);
document.getElementById("sab_recon").addEventListener('click',function(e) {
document.getElementById("sab_result").innerHTML = 'Sending spies for recon...';
doSabbing = true;
spyTarget(sabTarget);
},false);

document.getElementById("sabber_name").addEventListener('mouseover',function(e) {
if (lastSabberName != '') {
if (!document.getElementById("lastSabberName")) {
var x = e.clientX + window.scrollX;
var y = e.clientY + window.scrollY;
notifyDiv('lastSabberName',0,0,x+14,y+4,'#D9CF0F','#272727');
document.getElementById("lastSabberName").innerHTML = '&nbsp;<span style="color:yellow;text-weight:bold;">'+lastSabberName+'</span>&nbsp;';
}
}
},false);
document.getElementById("sabber_name").addEventListener('mouseout',function(e) {
closediv("lastSabberName");
},false);

};

function getAlliancetargets(id) {
var url = "http://"+ipadres+"/php/GM_getapproved.php";
var data = "id="+id;
postdata(url,data,function(r) {
if (!document.getElementById("showapproved")) {
var Xpos = 10;var Ypos = 10;
if (GM_getValue("showapprovedX",-1) != -1) Xpos = GM_getValue("showapprovedX",10);
if (GM_getValue("showapprovedY",-1) != -1) Ypos = GM_getValue("showapprovedY",10);
makediv('showapproved',3,0,0,Xpos,Ypos,'#272727','<span style="color:yellow">Approved targets</span>');
}
var ap = r.split(":");
var newHTML = '<table border="0" cellpadding="2" cellspacing="2">';
if (trim(ap[0]).length > 0) {
var a1 = ap[0].split("|");
newHTML += '<tr><td colspan="4" align="center">';
newHTML += '<table border="0" cellpadding="0" cellspacing="0">';
newHTML += '<tr><th colspan="2">Alliances</th></tr>';
newHTML += '<tr>';
newHTML += '<td>';
newHTML += '<select id="alliance_targets">';
for (var i=0;i<a1.length;i++) {
var ta = a1[i].split(",");
var add='';
if (id==ta[0]) add=" selected"
newHTML += '<option value="'+ta[0]+'"'+add+'>'+ta[1]+'</option>';
}
newHTML += '</select>';
newHTML += '</td>';
newHTML += '<td style="padding-left:8px;">';
newHTML += '<input type="button" id="show_aTargets" value="Targets" />';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td></tr>';
}

newHTML+= '<tr><th>name</th><th>Sentry</th><th>Spy needed</th><th>Updated</th></tr>';
var a = ap[1].split("|");
for (var i=0;i<a.length;i++) {
var ap1 = a[i].split(",");
var sn = Math.round(parseInt(ap1[3])/2);
var clr = 'lime';
if (GM_getValue("rfl_SPY",0) < sn) clr = '#E41B1B';
var elem = "at_"+trim(ap1[0])+"|"+trim(ap1[1]);
newHTML += '<tr><td class="underline" style="cursor:pointer;width:220px;" id="'+elem+'">'+ap1[1]+'</td><td class="underline" style="text-align:right;width:170px;">'+addCommas(ap1[3])+'</td><td class="underline" style="text-align:right;width:170px;color:'+clr+';">'+addCommas(sn)+'</td><td class="underline" style="text-align:right;width:170px;">'+timeAgo(ap1[4])+'</td></tr>';
}
newHTML += '</table>';
document.getElementById("content_showapproved").innerHTML = newHTML;
for (var i =0;i<a.length;i++) {
var ap = a[i].split(",");
var elem = "at_"+trim(ap[0])+"|"+trim(ap[1]);
document.getElementById(elem).addEventListener('click',function(e) {
var id = e.target.id.replace('at_','');
var ida = id.split("|");
doSabotage(ida[0],ida[1]);
},false);
document.getElementById(elem).addEventListener('mouseover',function(e) {
var id = e.target.id;
document.getElementById(id).style.backgroundColor = '#BFBFBF';
},false);
document.getElementById(elem).addEventListener('mouseout',function(e) {
var id = e.target.id;
document.getElementById(id).style.backgroundColor = '';
},false);
}
document.getElementById("show_aTargets").addEventListener('click',function(e) {
var alnr = document.getElementById("alliance_targets").value;
getAlliancetargets(alnr);
},false);
});
}

function sortPos(nr,armorySortBy) {
for (var i=0;i<armorySortBy.length;i++) {
if (armorySortBy[i] == nr) return i;
}
}

function sortWeaponsOnValue(weapons) {
if (weapons.length == 1) return weapons;
for (var i=0;i<weapons.length-1;i++) {
if ((weapons[i][0][4]*weapons[i][3]) <= (weapons[(i+1)][0][4]*weapons[(i+1)][3])) {
if ((weapons[i][0][4]*weapons[i][3]) == (weapons[(i+1)][0][4]*weapons[(i+1)][3])) {
var w1 = sortPos(weapons[i][0][1],new Array(3,2,0,1));
var w2 = sortPos(weapons[(i+1)][0][1],new Array(3,2,0,1));
if (w2 < w1) {
var tmp = weapons[i];
weapons[i] = weapons[(i+1)];
weapons[i+1] = tmp;
i=-1;
}
} else {
var tmp = weapons[i];
weapons[i] = weapons[(i+1)];
weapons[i+1] = tmp;
i=-1;
}
}
}
return weapons;
};


function sortWeaponsOnStrength(weapons) {
if (weapons.length == 1) return weapons;
for (var i=0;i<weapons.length-1;i++) {
if (weapons[i][0][2] < weapons[(i+1)][0][2]) {
var tmp = weapons[i];
weapons[i] = weapons[(i+1)];
weapons[i+1] = tmp;
i=-1;
}
}
return weapons;
};

var hisArmory = new Array();

function sortByWeapons(armorySortBy) {
hisArmory = sortWeaponsOnStrength(hisArmory);
var tmp = new Array();
for (var i=0;i<armorySortBy.length;i++) {
for (var j=0;j<hisArmory.length;j++) {
if (hisArmory[j][0][1] == armorySortBy[i]) tmp.push(hisArmory[j]);
}
}
return tmp;
}


function sab_getWeapons(arm) {
var total = 0;
document.getElementById("sab_weapon").options.length=0;
var hArmory = arm.split("|");
hisArmory = new Array();
if (trim(arm).length > 0) {
for (var i=0;i<hArmory.length;i++) {
var tWeapon = hArmory[i].split(",");
var weap = getWeaponByKocNumber(tWeapon[0]);
total += (parseInt(tWeapon[1]) * parseInt(weap[4]));
var pArr = new Array(weap,tWeapon[1],tWeapon[2],0);
hisArmory.push(pArr);
}
var AATvalue = Math.floor((total / 100) /2);
for (var i=0;i<hisArmory.length;i++) {
var cost = parseInt(hisArmory[i][0][4]);
var cansab = Math.floor(AATvalue / cost);
if (cansab > hisArmory[i][1]) cansab = hisArmory[i][1];
hisArmory[i][3] = cansab;
}
}
};

function displayArmory() {
var optionsCount = 0;
var newHTML = '<table border="0" width="100%" cellpadding="0" cellspacing="0">';
if (hisArmory.length > 0) {
for (var i=0;i<hisArmory.length;i++) {
document.getElementById("sab_weapon").options[optionsCount] = new Option(hisArmory[i][0][0],hisArmory[i][0][3],false,false);
optionsCount++;
var am = (hisArmory[i][1] > -1) ? hisArmory[i][1] : '<span style="color:red;">???</span>';
var aat = (hisArmory[i][3] > -1) ? hisArmory[i][3] : '<span style="color:red;">???</span>';
newHTML += '<tr><td class="cp underline" style="width:170px;">'+hisArmory[i][0][0]+'</td><td class="cp underline" style="text-align:right;">'+am+'</td><td class="cp underline" style="text-align:right;">'+aat+'</td><td class="cp underline" style="text-align:right;">'+timeAgo(hisArmory[i][2])+'</td></tr>';
}
} else {
var newHTML = '<table border="0" width="100%" cellpadding="0" cellspacing="0">';
newHTML += '<tr><td width="100%">No information...</td></tr>';
}
newHTML += '</table>';
document.getElementById("sab_armory").innerHTML = newHTML;
};

function getSabInfo(id) {
var url = "http://"+ipadres+"/php/GM_getsabinfo.php";
var data = "myid="+GM_getValue("my_ID",-1)+"&id="+id;
postdata(url,data,function(r) {
var si = r.split(":");
var mySpy = parseInt(GM_getValue("rfl_SPY",-1));
var sentry = parseInt(si[2]);
cl='lime';
if (sentry > -1) if ((sentry / 2) > mySpy) cl = 'red';
if (sentry == -1) {sentry = '???';cl='red';}
var sentry_time = timeAgo(si[3]);
document.getElementById("sab_sentry").style.color = cl;
document.getElementById("sab_sentry").innerHTML = addCommas(sentry.toString());
document.getElementById("sab_sentry_time").innerHTML = sentry_time;
var ls = si[4].split(",");
var lm = si[5].split(",");
fillLastsabInfo(ls,lm);
sab_getWeapons(si[6])
sortByWeapons(new Array(3,2,0,1));
displayArmory();
fillAmount();
});
};

function getAmountNumber() {
var welke = document.getElementById("sab_weapon").selectedIndex;
var weaponNumber = document.getElementById("sab_weapon").options[welke].value;
for (j=0;j<hisArmory.length;j++) {
if (hisArmory[j][0][3] == weaponNumber) return hisArmory[j][3];
}
return 0;
};

function fillAmount() {
var turns = parseInt(document.getElementById("sab_turns").value);
var sabAmount = getAmountNumber();
var amount = Math.floor((sabAmount / 5) * turns);
document.getElementById("sab_amount").value = amount;
};

var sabTarget = -1;

function doSabotage(id,userName) {
if (document.getElementById("infoDiv")) {
closediv("infoDiv");
doRecon = false;
}
if (id != sabTarget) {
sabTarget = id;
doSabbing = true;
toolsLost = new Array(0,0,0,0,0);
if (document.getElementById("sab_textlines")) document.getElementById("sab_textlines").value = '';
sab_attempt = 0;
}
buildsabdiv();
document.getElementById("sab_name").innerHTML = userName;
getSabInfo(id);
};

var toolsLost = new Array(0,0,0,0,0);
var sab_attempt = 0;

function execSabotage() {
sab_attempt++;
document.getElementById("sab_attempt").innerHTML = sab_attempt.toString();
var amount = parseInt(document.getElementById("sab_amount").value);
var weapon= parseInt(document.getElementById("sab_weapon").value);
var weaponName= getWeaponByKocNumber(weapon)[0];
var spies= parseInt(document.getElementById("sab_sendspies").value);
var turns= parseInt(document.getElementById("sab_turns").value);
var url = "http://www.kingsofchaos.com/attack.php?id=" + sabTarget;
getdata(url,function(response) {
sab_Turing = FindText(response,'name="turing" value="','"');
params = 'mission_type=sabotage&enemy_weapon=' + weapon
+ '&numsab=' + amount
+ '&numspies=' + spies
+ '&sabturns=' + turns
+ '&defender_id=' + sabTarget
+ '&turing=' + sab_Turing
document.getElementById("sab_result").innerHTML = 'Sending <b>'+spies.toString()+'</b> spies in an attempt to sabotage <b>'+amount.toString()+'</b> '+ weaponName;
var url = "http://www.kingsofchaos.com/attack.php";
postdata(url,params,function(page) {
parseSabResult(page);
});
});
}



function parseSabResult(page) {
if (InStr(page,'<font color="red">') == true) {
if (InStr(page,'You can use a maximum of 10')) {
document.getElementById("sab_result").innerHTML = '<span style="color:yellow;">You used 10 successfull sabturns!</span>';
document.getElementById("sab_dosab").value = 'Sabotage';
document.getElementById("sab_dosab").disabled = false;
return;
}
if (InStr(page,'You may only make 50')) {
document.getElementById("sab_result").innerHTML = '<span style="color:white;">You may only use 50 attempts every 24 hours.</span>';
document.getElementById("sab_dosab").value = 'Sabotage';
document.getElementById("sab_dosab").disabled = false;
return;
}

if (InStr(page,'Your opponent has already suffered heavy losses today')) {
document.getElementById("sab_result").innerHTML = "<span style=\"color:red;\">Too many losses, this (_|_) can't be sabbed now</span>";
document.getElementById("sab_dosab").value = 'Sabotage';
document.getElementById("sab_dosab").disabled = false;
return;
}

var amount = document.getElementById("sab_amount").value;
var newAmount = (amount-1);
if (newAmount > 0) {
document.getElementById("sab_result").innerHTML = '<span style="color:yellow;">Amount is lowered from '+amount+' to '+newAmount+'</span>';
document.getElementById("sab_amount").value = newAmount;
} else {
document.getElementById("sab_result").innerHTML = '<span style="color:red;">Choose another weapon / tool</span>';
document.getElementById("sab_amount").value = newAmount;
}
document.getElementById("sab_dosab").value = 'Sabotage';
document.getElementById("sab_dosab").disabled = false;
return;
}

if (InStr(page,'weapons of type .') == true) {
document.getElementById("sab_result").innerHTML = '<span style="color:red;">Choose another weapon / tool</span>';
document.getElementById("sab_amount").value = '0';
document.getElementById("sab_dosab").value = 'Sabotage';
document.getElementById("sab_dosab").disabled = false;
return;
}

if (InStr(page,'<h3>Covert Mission Report</h3>')) {
if (InStr(page,'You lose')) {
document.getElementById("sab_result").innerHTML = '<span style="color:red;">Your spies are spotted...</span>';
var part = FindText(FindText(page,'<h3>Covert Mission Report</h3>','<form'),'<li','/ul>');
if (InStr(part,'intact') == false) {
var nrLost = FindText(part,'>',' of');
var toolLost = trim(FindText(part,'of ','<'));
updateLostWeapons(nrLost,toolLost);
}
document.getElementById("sab_dosab").value = 'Sabotage';
document.getElementById("sab_dosab").disabled = false;
return;
}
}
if (InStr(page,'Your spies successfully')) {
var part = trim(FindText(FindText(page,'<h3>Covert Mission Report</h3>','<form'),'<p>','<br>'));
var line = part.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').replace(/^\s*/, '').replace(/\s*$/, '').replace(/^[\s\S]*(Your spies successfully)/, "$1") + "\n";
document.getElementById("sab_textlines").value += line;
var aantal = trim(FindText(part,'destroy','of'));
aantal = parseInt(aantal);
var weapon = trim(FindText(part,"enemy's","stockpile"));
document.getElementById("sab_result").innerHTML = "<span style=\"color:lime;\">Your spies destroy "+aantal+" of the enemy's "+weapon+" stockpile. </span>";
var weaponNumber = document.getElementById("sab_weapon").value;
var data ="id="+GM_getValue("my_ID",-1)+"&target_id="+sabTarget+"&weapon="+weaponNumber+"&amount="+aantal;
var url = "http://"+ipadres+"/php/GM_sabmission.php";
postdata(url,data,function(response) {
document.getElementById("sab_dosab").value = 'Sabotage';
document.getElementById("sab_dosab").disabled = false;
var sabinfo= response.split(":");
var lastInfo= sabinfo[4].split(",");
var myLast= sabinfo[5].split(",");
fillLastsabInfo(lastInfo,myLast);
});
return;
}
alert("UNEXPECTED SABRESULT! or maybe 50 times??");
}

var lastSabberName = '';

function fillLastsabInfo(ls,lm) {
var lastsab = "No information";
var lastsab_time = "&nbsp;";
if (ls[0] > -1) {
var weap = getWeaponByKocNumber(ls[0]);
lastsab = ls[1]+" "+weap[0];
lastsab_time = precisionTime(parseInt(ls[2]));
lastSabberName = ls[3];
}
document.getElementById("sab_info_weapon1").innerHTML = lastsab;
document.getElementById("sab_info_time1").innerHTML = lastsab_time;
lastsab = "No information";
lastsab_time = "&nbsp;";
if (lm[0] > -1) {
var weap = getWeaponByKocNumber(lm[0]);
lastsab = lm[1]+" "+weap[0];
lastsab_time = precisionTime(parseInt(lm[2]));
}
document.getElementById("sab_info_weapon2").innerHTML = lastsab;
document.getElementById("sab_info_time2").innerHTML = lastsab_time;
}


function updateLostWeapons(nr,tool) {
var toolnr = getWeaponNr(tool);
toolnr = theWeapons[toolnr][3];
switch(toolnr) {
case 75:
toolslost[0] += nr;
document.getElementById("l_tool1").innerHTML = toolslost[0].toString();
flashtoollost(1);
break;
case 73:
toolslost[1] += nr;
document.getElementById("l_tool2").innerHTML = toolslost[0].toString();
flashtoollost(2);
break;
case 67:
toolslost[2] += nr;
document.getElementById("l_tool3").innerHTML = toolslost[0].toString();
flashtoollost(3);
break;
case 65:
toolslost[3] += nr;
document.getElementById("l_tool4").innerHTML = toolslost[0].toString();
flashtoollost(4);
break;
case 63:
toolslost[4] += nr;
document.getElementById("l_tool5").innerHTML = toolslost[0].toString();
flashtoollost(5);
break;
case 58:
toolslost[5] += nr;
document.getElementById("l_tool6").innerHTML = toolslost[0].toString();
flashtoollost(6);
break;
default:
alert("UpdateLostWeapons FUCKED up,\nLost something and have NO IDEA what it is!!\nDEBUG:["+nr+"]["+toolnr+"]["+tool+"]");
}
}

function flashtoollost(nr) {
var elem = "l_toolname"+nr;
document.getElementById(elem).style.color = 'red';
setTimeout(cleartoolnames,1000);
}

function cleartoolnames() {
for (var i=1;i<=6;i++) {
var elem = "l_toolname"+i;
document.getElementById(elem).style.color = '';
}
}

function recallMissingWeapons() {
var Xpos = 10;var Ypos = 10;
if (GM_getValue("recallmissingDivX",-1) != -1) Xpos = GM_getValue("recallmissingDivX",10);
if (GM_getValue("recallmissingDivY",-1) != -1) Ypos = GM_getValue("recallmissingDivY",10);
makediv('recallmissingDiv',3,0,0,Xpos,Ypos,'#272727','<span style="color:yellow">Missing Weapons</span>');
var newHTML = '<table border="0" cellpadding="0" cellspacing="0">';
newHTML += '<tr><th style="width:250px;">Weapon</th><th style="width:80px;">missing</th><th style="width:170px;">Detected</th><th style="width:220px;">Value</th><th style="width:20px;">&nbsp;</th></tr>';
newHTML += '<tr><td colspan="6"><div id="recall_missing" style="max-height:400px;overflow:auto;"></div></td></tr>';
newHTML += '</table>';
document.getElementById("content_recallmissingDiv").innerHTML = newHTML;
var data = "id="+GM_getValue("my_ID",-1);
var url = "http://"+ipadres+"/php/GM_getmissingweapons.php";
postdata(url,data,function(r) {
if (trim(r).length > 0) {
newHTML = '<table border="0" cellpadding="0" cellspacing="1">';
var mWeapons = r.split("|");
for (var i=0;i<mWeapons.length;i++) {
var weap = mWeapons[i].split(",");
var weapDetails = getWeaponByKocNumber(weap[0]);
var detected = timeAgo(weap[2]);
var damage = addCommas( (parseInt(weapDetails[4]) * parseInt(weap[1])).toString());
newHTML += '<tr><td class="underline" style="width:250px;">'+weapDetails[0]+'</td><td class="underline" style="width:80px;text-align:right;">'+addCommas(weap[1].toString())+'</td><td class="underline" style="width:170px;text-align:right;">'+detected+' ago</td><td class="underline" style="width:220px;text-align:right;">'+damage+'</td></tr>';
}
newHTML += '</table>';
} else {
newHTML = '<table border="0" cellpadding="0" cellspacing="1">';
newHTML += '<tr><td width="100%">No information available...</td></tr></table>';
}
document.getElementById("recall_missing").innerHTML = newHTML;
});
}
function doRecruitPage() {
var currentMorale = parseInt(FindText(FindText(document.body.innerHTML,"<p>Your Army's Morale:","/font>"),">","<"));
var fname  = document.evaluate("//form[@name='party']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
fname.setAttribute('id','party');
var pname  = document.evaluate("//input[@name='partypalname']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
pname.setAttribute('id','partypalname');
var morale = document.evaluate("//input[@name='morale']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
morale.setAttribute('id','morale');
var rbutton  = document.evaluate("//input[@value='Party!']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
rbutton.setAttribute('id','partybut');
rbutton.removeAttribute('onclick');
rbutton.type = 'button';
rbutton.addEventListener('click',function(e) {
var pname = document.getElementById("partypalname").value;
var morale = parseInt(document.getElementById("morale").value);
if (isNaN(morale)) morale = -1;
if (morale != -1) if (morale < 10) morale=-1;
var url = "http://"+ipadres+"/php/GM_savemorale.php";
var data = "id="+GM_getValue("my_ID",-1)+"&name="+pname+"&morale="+morale;
postdata(url,data,function(r) {
document.getElementById("party").submit();
});
},false);

var url = "http://"+ipadres+"/php/GM_lottery.php";
var data = "id="+GM_getValue("my_ID",-1);
postdata(url,data,function(r) {
var lottery = r.split("|");
var lb = document.createElement('br');
insertAfter(rbutton,lb);
var lb1 = document.createElement('br');
insertAfter(lb,lb1);
var nd = document.createElement('div');
nd.id = 'lotterydiv';
insertAfter(lb1,nd);
var divHTML =  '<table border="0" width="400" cellpadding="2" cellspacing="2">';
divHTML +='<tr>';
divHTML +='<th colspan="2">Relentless Lottery</th>';
divHTML +='</tr>';
divHTML +='<tr>';
var lv = lottery[0].split(",");
GM_setValue("rfl_mreciever",lv[3]);
var wn = completeTimeAgo(lv[0])
divHTML +='<td style="width:170px;">Next lottery</td><td style="text-align:right;">'+wn+'</td>';
divHTML +='</tr>';
divHTML +='<tr>';
divHTML +='<td>Ticketprice (morale)</td><td style="text-align:right;">'+addCommas(lv[1])+'</td>';
divHTML +='</tr>';
divHTML +='<tr>';
divHTML +='<td>Reciever (morale)</td><td style="text-align:left;">'+lv[3]+'</td>';
divHTML +='</tr>';
divHTML +='<tr>';
divHTML +='<th colspan="2">Current lottery stats</th>';
divHTML +='</tr>';
var tickets = lottery[2].split(",");
divHTML +='<tr>';
divHTML +='<td>Tickets sold</td><td style="text-align:right;">'+addCommas(tickets[0])+'</td>';
divHTML +='</tr>';
divHTML +='<tr>';
divHTML +='<td>Pricemoney</td><td style="font-weight:bold;text-align:right;">'+addCommas(lottery[3])+'</td>';
divHTML +='</tr>';
var payout = lottery[1].split(",");
var a = new Array('st','nd','rd','th','th','th');
for (var i=0;i<payout.length;i++) {
var pay = parseInt(lottery[3]);
pay = Math.floor((pay / 100) * payout[i]);
divHTML +='<tr>';
divHTML +='<td>'+(i+1)+a[i]+' price ('+payout[i]+'%)</td><td style="text-align:right;">'+addCommas(pay)+'</td>';
divHTML +='</tr>';
}
divHTML +='<tr>';
divHTML +='<th colspan="2">Buy tickets</th>';
divHTML +='</tr>';
divHTML +='<tr>';
divHTML +='<td>Your tickets bought</td><td style="text-align:left;">'+addCommas(tickets[1])+'</td>';
divHTML +='</tr>';
divHTML +='<tr>';
canBuy = 0;
if (currentMorale > 0) canBuy = Math.floor(currentMorale / 100);
divHTML +='<td colspan="2" style="text-align:left;">Send <input style="width:50px;" type="text" id="nrmorale" value="'+(canBuy*100).toString()+'" /> morale to <input type="button" id="buytickets" value="Buy Tickets" /></td>';
divHTML +='</tr>';
divHTML +='</table>';
document.getElementById('lotterydiv').innerHTML = divHTML;
if (canBuy == 0) {
document.getElementById("buytickets").disabled = true;
} else {
document.getElementById("buytickets").style.color = 'lime';
document.getElementById("buytickets").disabled = false;
}

document.getElementById("buytickets").addEventListener('click',function(e) {
document.getElementById("partypalname").value = GM_getValue("rfl_mreciever","Agramon");
document.getElementById("morale").value = document.getElementById("nrmorale").value
var morale = parseInt(document.getElementById("nrmorale").value);
if (isNaN(morale)) morale = -1;
if (morale != -1) if (morale < 10) morale=-1;
var url = "http://"+ipadres+"/php/GM_savemorale.php";
var data = "id="+GM_getValue("my_ID",-1)+"&name="+GM_getValue("rfl_mreciever","Agramon")+"&morale="+morale+"&lottery=1";
postdata(url,data,function(r) {
document.getElementById("party").submit();
});
},false);
});

}

function insertAfter( referenceNode, newNode ) {
referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

function DBhighTargets() {
var Xpos = 10;var Ypos = 10;
if (GM_getValue("dbhightargetsDivX",-1) != -1) Xpos = GM_getValue("dbhightargetsDivX",10);
if (GM_getValue("dbhightargetsDivY",-1) != -1) Ypos = GM_getValue("dbhightargetsDivY",10);
makediv('dbhightargetsDiv',3,0,0,Xpos,Ypos,'#272727','<span style="color:yellow">DB high targets</span>');
document.getElementById("content_dbhightargetsDiv").innerHTML = "Getting database high targets...";
newHTML = '<table border="0" cellpadding="0" cellspacing="0">';
newHTML += '<tr>';
newHTML += '<th>Target</th><th>Treasury</th><th>Time</th><th>TFF</th><th>Defense</th><th>Updated</th>';
newHTML += '</tr>';
var url = "http://"+ipadres+"/php/GM_DBhightargets.php";
var data = "id="+GM_getValue("my_ID",-1);
postdata(url,data,function(r) {
var targets = r.split("|");
for (var i=0;i<targets.length;i++) {
var t=targets[i].split(",");
newHTML += '<tr id="row_'+i.toString()+'">';
newHTML += '<td class="underline">'+t[1]+'</td><td class="underline" id="gold_'+i.toString()+'" style="padding-left:16px;text-align:right;">'+addCommas(t[2])+'</td><td class="underline" style="padding-left:16px;text-align:right;">'+timeString(t[3])+'</td><td class="underline" style="padding-left:16px;text-align:right;">'+addCommas(t[6])+'</td><td class="underline" style="padding-left:16px;text-align:right;">'+addCommas(t[4])+'</td></td><td class="underline" style="padding-left:16px;text-align:right;">'+timeAgo(t[5])+'</td>';
newHTML += '</tr>';
}

newHTML += ' </table>';
document.getElementById("content_dbhightargetsDiv").innerHTML = newHTML;
for (var i=0;i<targets.length;i++) {
var elem = "gold_"+i.toString();
document.getElementById(elem).addEventListener('click',function(e) {
alert("DBHightargets:"+e.target.id);
},false);
}
});
}


function buyweapons() {
GM_log(">buy weapons");
GM_setValue("rfl_doBuy",1);
GM_log(">setting rfl_doBuy 1");
var url = "http://www.kingsofchaos.com/armory.php";
GM_log(">sending request...");
getdata(url,function(r) {
GM_log(">Got response from: "+url);
GM_log("GOLD : "+GM_getValue("rfl_GOLD"));

var turing = FindText(r,'name="turing" value="','"');
allPagesInfo(r);
getRepairs(r);
GM_log("GOLD : "+GM_getValue("rfl_GOLD"));
setTimeout(repairWeapons,50);
});
}

function getRepairs() {
var url = "http://www.kingsofchaos.com/armory.php";
getdata(url,function(page) {
if (InStr(page,'Please login to view that page.')) {
GM_log(">logged out, need to relogin...");
setTimeout(reLogin,10);
return;
}
weaponsDamaged = -1;
if (InStr(page,'Repair all weapons')) {
var rText = FindText(FindText(page,'Repair all weapons','">'),'for ',' Gold');
GM_setValue("repairText",rText);
weaponsDamaged = FindText(FindText(page,'Repair all weapons','">'),'for ',' Gold').replace(/,/g,'');
weaponsDamaged = parseInt(weaponsDamaged);
GM_setValue("weaponsDamaged",weaponsDamaged);
} else {
GM_setValue("weaponsDamaged",0);
GM_setValue("repairText",'');
}
setTimeout(repairWeapons,10);
});
}

function doButtonBuy() {
var url = "http://www.kingsofchaos.com/armory.php";
getdata(url,function(res) {
allPagesInfo(res);
var turing = FindText(res,'name="turing" value="','"');
var weapon1 = getWeaponByKocNumber(GM_getValue("rfl_bankWeapon1",69));
var weapon2 = getWeaponByKocNumber(GM_getValue("rfl_bankWeapon2",69));
var weapon3 = getWeaponByKocNumber(GM_getValue("rfl_bankWeapon3",69));
var weapon4 = getWeaponByKocNumber(GM_getValue("rfl_bankWeapon4",69));
var weapon1_percent = GM_getValue("rfl_wbuy1_percent",100);
var weapon2_percent = GM_getValue("rfl_wbuy2_percent",0);
var weapon3_percent = GM_getValue("rfl_wbuy3_percent",0);
var weapon4_percent = GM_getValue("rfl_wbuy4_percent",0);
var tres = GM_getValue("rfl_GOLD",0);
GM_log(">gold in treasury: "+tres);
var onepercent = parseInt(GM_getValue("rfl_GOLD",0)) / 100;
var canbuy = new Array(new Array(69,0),new Array(69,0),new Array(69,0),new Array(69,0));
canbuy[0][0] = weapon1[3];
canbuy[0][1] = Math.floor(((tres / 100)*weapon1_percent) / parseInt(weapon1[4]));
tres -= (canbuy[0][1] * parseInt(weapon1[4]));
GM_log(">gold in treasury: "+tres);

canbuy[1][0] = weapon2[3];
canbuy[1][1] = Math.floor(((tres / 100)*weapon2_percent) / parseInt(weapon2[4]));
tres -= (canbuy[1][1] * parseInt(weapon2[4]));
GM_log(">gold in treasury: "+tres);

canbuy[2][0] = weapon3[3];
canbuy[2][1] = Math.floor(((tres / 100)*weapon3_percent) / parseInt(weapon3[4]));
tres -= (canbuy[2][1] * parseInt(weapon3[4]));
GM_log(">gold in treasury: "+tres);

canbuy[3][0] = weapon4[3];
canbuy[3][1] = Math.floor(((tres / 100)*weapon4_percent) / parseInt(weapon4[4]));
tres -= (canbuy[3][1] * parseInt(weapon4[4]));
GM_log(">gold in treasury: "+tres);
GM_log(">canBuy: "+canbuy);
var buyData = 'buy_weapon['+canbuy[0][0]+']='+canbuy[0][1];
for (var i=1;i<4;i++) if (canbuy[i][1] > 0) buyData += '&buy_weapon['+canbuy[i][0]+']='+canbuy[i][1];
buyData += '&turing=' + turing;
buyData += '&hash=';
GM_log(">buyData : "+buyData);
GM_log(">url: "+url);
GM_setValue("rfl_doBuy",0);
GM_log(">setting rfl_doBuy 0");
url = "http://www.kingsofchaos.com/armory.php";
postdata(url,buyData,function(r) {
GM_log(">got response from "+url);
parseArmory(r);
GM_log("GOLD : "+GM_getValue("rfl_GOLD"));
loadthePage("http://www.kingsofchaos.com/armory.php");
});
});
}



function closeshowbuy() {
closediv("showbuy");
}

function reLogin() {
var url = "http://www.kingsofchaos.com/login.php";
var data = "username=&pword=&usrname=&peeword=&hash=";
postdata(url,data,function(r) {
});
}


function repairWeapons() {
GM_log(">check repair");

var weaponsDamaged = GM_getValue("weaponsDamaged",0);
var my_GOLD = GM_getValue("rfl_GOLD",0);
GM_log(">WeaponsDamaged: "+weaponsDamaged);
GM_log(">Treasury: "+my_GOLD);
if ((my_GOLD >= weaponsDamaged) && (weaponsDamaged > 0)) {
var value = 'Repair all weapons for '+GM_getValue("repairText",'')+' Gold';
params = 'repair_all_weapons='+value;
GM_log(">Trying to "+params);
url = 'http://www.kingsofchaos.com/armory.php';
postdata(url,params,function(r) {
GM_log(">Got response after repairing...");
parseArmory(r);
});
} else {
GM_log(">Nothing to repair...");
setTimeout(doArmoryBuy,10);
}
}

var prefOrder = new Array(new Array(1,2,3),new Array(1,2,3),new Array(1,2,3,4));

function setWeaponsPrefs() {
var Xpos = 10;var Ypos = 10;
if (GM_getValue("weaponsPrefsX",-1) != -1) Xpos = GM_getValue("weaponsPrefsX",10);
if (GM_getValue("weaponsPrefsY",-1) != -1) Ypos = GM_getValue("weaponsPrefsY",10);
makediv('weaponsPrefs',999,0,0,Xpos,Ypos,'#272727','Buy preferences');
var newHTML = '<table border="0" cellspacing="4" cellpadding="0">';
newHTML +='<tr>'
newHTML +='<td valign="top" style="border-width:1px;border-color:black #cacaca #cacaca black;border-style:solid;">';

newHTML += '<table border="0" cellpadding="2" cellspacing="2">';
newHTML += '<tr>';
newHTML += '<th colspan="2">Weapons</th>';
newHTML += '</tr>';
newHTML +='<tr>';
var saved = GM_getValue("rfl_bankWeapon1",69);
newHTML += ' <td>';
newHTML += '<select id="bankWeapon1">';
var my_WEAPONS = new Array();
my_WEAPONS = getWeaponsByRace(GM_getValue("rfl_myRACE",-1));
for (var i=0;i<my_WEAPONS.length;i++) {
var sel = '';
if (saved == my_WEAPONS[i][3]) sel = 'selected';
newHTML += '<option value="'+my_WEAPONS[i][3]+'" '+sel+'>'+my_WEAPONS[i][0]+'</option>';
}
newHTML += '</select>';
newHTML += '</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_wbuy1_percent",100);
newHTML += '<input id="wbuy1_percent" type="text" style="width:40px;" value="'+pc+'" />%';
newHTML += '</td>';

newHTML += '</tr>';
newHTML +='<tr>';
saved = GM_getValue("rfl_bankWeapon2",69);
newHTML += ' <td>';
newHTML += '<select id="bankWeapon2">';
var my_WEAPONS = new Array();
my_WEAPONS = getWeaponsByRace(GM_getValue("rfl_myRACE",-1));
for (var i=0;i<my_WEAPONS.length;i++) {
var sel = '';
if (saved == my_WEAPONS[i][3]) sel = 'selected';
newHTML += '<option value="'+my_WEAPONS[i][3]+'" '+sel+'>'+my_WEAPONS[i][0]+'</option>';
}
newHTML += '</select>';
newHTML += '</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_wbuy2_percent",0);
newHTML += '<input id="wbuy2_percent" type="text" style="width:40px;" value="'+pc+'" />%';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '<tr>';
saved = GM_getValue("rfl_bankWeapon3",69);
newHTML += ' <td>';
newHTML += '<select id="bankWeapon3">';
var my_WEAPONS = new Array();
my_WEAPONS = getWeaponsByRace(GM_getValue("rfl_myRACE",-1));
for (var i=0;i<my_WEAPONS.length;i++) {
var sel = '';
if (saved == my_WEAPONS[i][3]) sel = 'selected';
newHTML += '<option value="'+my_WEAPONS[i][3]+'" '+sel+'>'+my_WEAPONS[i][0]+'</option>';
}
newHTML += '</select>';
newHTML += '</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_wbuy3_percent",0);
newHTML += '<input id="wbuy3_percent" type="text" style="width:40px;" value="'+pc+'" />%';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '<tr>';
saved = GM_getValue("rfl_bankWeapon4",69);
newHTML += ' <td>';
newHTML += '<select id="bankWeapon4">';
var my_WEAPONS = new Array();
my_WEAPONS = getWeaponsByRace(GM_getValue("rfl_myRACE",-1));
for (var i=0;i<my_WEAPONS.length;i++) {
var sel = '';
if (saved == my_WEAPONS[i][3]) sel = 'selected';
newHTML += '<option value="'+my_WEAPONS[i][3]+'" '+sel+'>'+my_WEAPONS[i][0]+'</option>';
}
newHTML += '</select>';
newHTML += '</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_wbuy4_percent",0);
newHTML += '<input id="wbuy4_percent" type="text" style="width:40px;" value="'+pc+'" />%';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '<td valign="top" style="border-width:1px;border-color:black #cacaca #cacaca black;border-style:solid;">';
newHTML += '<table border="0" cellpadding="2" cellspacing="2">';
newHTML += '<tr>';
newHTML += '<th colspan="6">Mercenaries</th>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td style="cursor:default";>Type</td>';
newHTML += '<td align="center">Buy %</td>';
newHTML += '<td align="center">Cap</td>';
newHTML += '<td align="center">1st</td>';
newHTML += '<td align="center">2nd</td>';
newHTML += '<td align="center">3rd</td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td style="cursor:default;">Attack Specialist</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_mercs1_percent",0);
newHTML += '<input id="mercs1_percent" type="text" style="width:40px;" value="'+pc+'" />%';
newHTML += '</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_mercs1_cap",0);
newHTML += '<input id="mercs1_cap" type="text" style="width:70px;" value="'+pc+'" />';
newHTML += '</td>';
newHTML += '<td><input type="radio" id="mercs_1" name="mercs1" /></td>';
newHTML += '<td><input type="radio" id="mercs_2" name="mercs1" /></td>';
newHTML += '<td><input type="radio" id="mercs_3" name="mercs1" /></td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td style="cursor:default;">Defense Specialist</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_mercs2_percent",0);
newHTML += '<input id="mercs2_percent" type="text" style="width:40px;" value="'+pc+'" />%';
newHTML += '</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_mercs2_cap",0);
newHTML += '<input id="mercs2_cap" type="text" style="width:70px;" value="'+pc+'" />';
newHTML += '</td>';
newHTML += '<td><input type="radio" id="mercs_4" name="mercs2" /></td>';
newHTML += '<td><input type="radio" id="mercs_5" name="mercs2" /></td>';
newHTML += '<td><input type="radio" id="mercs_6" name="mercs2" /></td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td style="cursor:default;">Untrained</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_mercs3_percent",0);
newHTML += '<input id="mercs3_percent" type="text" style="width:40px;" value="'+pc+'" />%';
newHTML += '</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_mercs3_cap",0);
newHTML += '<input id="mercs3_cap" type="text" style="width:70px;" value="'+pc+'" />';
newHTML += '</td>';
newHTML += '<td><input type="radio" id="mercs_7" name="mercs3" /></td>';
newHTML += '<td><input type="radio" id="mercs_8" name="mercs3" /></td>';
newHTML += '<td><input type="radio" id="mercs_9" name="mercs3" /></td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '<td valign="top" style="border-width:1px;border-color:black #cacaca #cacaca black;border-style:solid;">';
newHTML += '<table border="0" cellpadding="2" cellspacing="2">';
newHTML += '<tr>';
newHTML += '<th colspan="7">Training</th>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td style="cursor:default";>Type</td>';
newHTML += '<td align="center">Buy %</td>';
newHTML += '<td align="center">Cap</td>';
newHTML += '<td align="center">1st</td>';
newHTML += '<td align="center">2nd</td>';
newHTML += '<td align="center">3rd</td>';
newHTML += '<td align="center">4th</td>';
newHTML += '</tr>';

newHTML += '<tr>';
newHTML += '<td style="cursor:default";>Attack Specialist</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_train1_percent",0);
newHTML += '<input id="train1_percent" type="text" style="width:40px;" value="'+pc+'" />%';
newHTML += '</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_train1_cap",0);
newHTML += '<input id="train1_cap" type="text" style="width:80px;" value="'+pc+'" />';
newHTML += '</td>';
newHTML += '<td><input type="radio" id="train_1" name="train1" /></td>';
newHTML += '<td><input type="radio" id="train_2" name="train1" /></td>';
newHTML += '<td><input type="radio" id="train_3" name="train1" /></td>';
newHTML += '<td><input type="radio" id="train_4" name="train1" /></td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td style="cursor:default";>Defense Specialist</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_train2_percent",0);
newHTML += '<input id="train2_percent" type="text" style="width:40px;" value="'+pc+'" />%';
newHTML += '</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_train2_cap",0);
newHTML += '<input id="train2_cap" type="text" style="width:80px;" value="'+pc+'" />';
newHTML += '</td>';
newHTML += '<td><input type="radio" id="train_5" name="train2" /></td>';
newHTML += '<td><input type="radio" id="train_6" name="train2" /></td>';
newHTML += '<td><input type="radio" id="train_7" name="train2" /></td>';
newHTML += '<td><input type="radio" id="train_8" name="train2" /></td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td style="cursor:default";>Spy</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_train3_percent",0);
newHTML += '<input id="train3_percent" type="text" style="width:40px;" value="'+pc+'" />%';
newHTML += '</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_train3_cap",0);
newHTML += '<input id="train3_cap" type="text" style="width:80px;" value="'+pc+'" />';
newHTML += '</td>';
newHTML += '<td><input type="radio" id="train_9" name="train3" /></td>';
newHTML += '<td><input type="radio" id="train_10" name="train3" /></td>';
newHTML += '<td><input type="radio" id="train_11" name="train3" /></td>';
newHTML += '<td><input type="radio" id="train_12" name="train3" /></td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td style="cursor:default";>Sentry</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_train4_percent",0);
newHTML += '<input id="train4_percent" type="text" style="width:40px;" value="'+pc+'" />%';
newHTML += '</td>';
newHTML += '<td>';
pc = GM_getValue("rfl_train4_cap",0);
newHTML += '<input id="train4_cap" type="text" style="width:80px;" value="'+pc+'" />';
newHTML += '</td>';
newHTML += '<td><input type="radio" id="train_13" name="train4" /></td>';
newHTML += '<td><input type="radio" id="train_14" name="train4" /></td>';
newHTML += '<td><input type="radio" id="train_15" name="train4" /></td>';
newHTML += '<td><input type="radio" id="train_16" name="train4" /></td>';
newHTML += '</tr>';
newHTML += '</div>';

newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td colspan="3" align="center">';
newHTML += '<table cellpadding="2" cellspacing="2">';
newHTML += '<tr>';
newHTML += '<td>';
newHTML += '<table  style="border-width:1px;border-color:black #cacaca #cacaca black;border-style:solid;" cellpadding="2" cellspacing="2">';
newHTML += '<tr>';
newHTML += '  <th>Set Order</th>';
newHTML += '<th>1st</th>';
newHTML += '<th>2nd</th>';
newHTML += '<th>3rd</th>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '  <td>Weapons</td>';
newHTML += '<td><input type="radio" id="buyorder_1" name="buyo1" /></td>';
newHTML += '<td><input type="radio" id="buyorder_2" name="buyo1" /></td>';
newHTML += '<td><input type="radio" id="buyorder_3" name="buyo1" /></td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td>Mercenaries</td>';
newHTML += '<td><input type="radio" id="buyorder_4" name="buyo2" /></td>';
newHTML += '<td><input type="radio" id="buyorder_5" name="buyo2" /></td>';
newHTML += '<td><input type="radio" id="buyorder_6" name="buyo2" /></td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td>Training</td>';
newHTML += '<td><input type="radio" id="buyorder_7" name="buyo3" /></td>';
newHTML += '<td><input type="radio" id="buyorder_8" name="buyo3" /></td>';
newHTML += '<td><input type="radio" id="buyorder_9" name="buyo3" /></td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '<td valign="top">';
newHTML += '<table  style="width:400px;border-width:1px;border-color:black #cacaca #cacaca black;border-style:solid;" cellpadding="2" cellspacing="2">';
newHTML +='<tr><th colspan="3">Auto Bank after Attack</th></tr>';
newHTML +='<tr>';
var cb = '';
if (GM_getValue("rfl_doattackbuy",0) == 1) cb = "checked";
newHTML +=  '<td style="padding-right:8px;">Activate</td><td><input type="checkbox" id="doAttackbuy" '+cb+'></td><td>&nbsp;</td>';
newHTML +=  '</tr>';
newHTML +='<tr>';
var cb = '';
if (GM_getValue("rfl_doshowbuy",0) == 1) cb = "checked";
newHTML +=  '<td style="padding-right:8px;">Show buy window</td><td><input type="checkbox" id="doShowbuy" '+cb+'></td><td>&nbsp;</td>';
newHTML +=  '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '<td valign="top">';
newHTML += '<table  style="width:200px;border-width:1px;border-color:black #cacaca #cacaca black;border-style:solid;" cellpadding="2" cellspacing="2">';
newHTML += '<tr><th colspan="2">Save preferences</th></tr>';
newHTML += '<tr>';
newHTML += '<td>Use for armory buy</td>';
var cb = '';
if (GM_getValue("rfl_usePrefs",0) == 1) cb = 'checked';
newHTML += '<td><input type="checkbox" id="usePrefs" '+cb+'/></td>';
newHTML += '</tr>';
newHTML += '<tr>';
newHTML += '<td colspan="2" style="text-align:center;"><input type="button" id="upd_prefs" value="Update preferences" /></td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '</table>';
newHTML += '</td>';
newHTML += '</tr>';
newHTML += '</table>';
document.getElementById("content_weaponsPrefs").innerHTML = newHTML;

var pOrder = GM_getValue("rfl_buy_order","1,2,3").split(",");
for (var i=1;i<4;i++) {
var elemNr = ((i*3)-2)+(pOrder[(i-1)]-1);
var elem = "buyorder_"+elemNr.toString();
document.getElementById(elem).checked = true;
}
for (var i=1;i<10;i++) {
var elem = "buyorder_"+i.toString();
document.getElementById(elem).addEventListener('click',function(e) {
var nr = e.target.id.replace(/buyorder_/,'');
updateBuyOrder(nr);
},false);
}

pOrder = GM_getValue("rfl_mercs_order","1,2,3").split(",");
for (var i=1;i<4;i++) {
var elemNr = ((i*3)-2)+(pOrder[(i-1)]-1);
var elem = "mercs_"+elemNr.toString();
document.getElementById(elem).checked = true;
}
for (var i=1;i<10;i++) {
var elem = "mercs_"+i.toString();
document.getElementById(elem).addEventListener('click',function(e) {
var nr = e.target.id.replace(/mercs_/,'');
updateMercsPrefs(nr);
},false);
}


pOrder = GM_getValue("rfl_train_order","1,2,3,4").split(",");
for (var i=1;i<5;i++) {
var elemNr = ((i*4)-3)+(pOrder[(i-1)]-1);
var elem = "train_"+elemNr.toString();
document.getElementById(elem).checked = true;
}
for (var i=1;i<17;i++) {
var elem = "train_"+i.toString();
document.getElementById(elem).addEventListener('click',function(e) {
var nr = e.target.id.replace(/train_/,'');
updateTrainPrefs(nr);
},false);
}
document.getElementById("upd_prefs").addEventListener('click',function(e) {
var cb = 0;
if (document.getElementById("usePrefs").checked) cb =1;
GM_setValue("rfl_usePrefs",cb);
GM_setValue("rfl_bankWeapon1",document.getElementById("bankWeapon1").value);
GM_setValue("rfl_bankWeapon2",document.getElementById("bankWeapon2").value);
GM_setValue("rfl_bankWeapon3",document.getElementById("bankWeapon3").value);
GM_setValue("rfl_bankWeapon4",document.getElementById("bankWeapon4").value);
for (var i=1;i<4;i++) {
var elem = "mercs"+i.toString()+"_percent";
var elem1 = "mercs"+i.toString()+"_cap";
var p=parseInt(document.getElementById(elem).value);
var pc=parseInt(document.getElementById(elem1).value);
if (isNaN(p)) p=0;
if (p>100) p=100;
if (isNaN(pc)) pc=0;
GM_setValue("rfl_"+elem,p);
GM_setValue("rfl_"+elem1,pc);
}
for (var i=1;i<5;i++) {
var elem = "train"+i.toString()+"_percent";
var elem1 = "train"+i.toString()+"_cap";
var p=parseInt(document.getElementById(elem).value);
var pc=parseInt(document.getElementById(elem1).value);
if (isNaN(p)) p=0;
if (p>100) p=100;
if (isNaN(pc)) pc=0;
GM_setValue("rfl_"+elem,p);
GM_setValue("rfl_"+elem1,pc);
}

var w1p=parseInt(document.getElementById("wbuy1_percent").value);
var w2p=parseInt(document.getElementById("wbuy2_percent").value);
var w3p=parseInt(document.getElementById("wbuy3_percent").value);
var w4p=parseInt(document.getElementById("wbuy4_percent").value);
if (isNaN(w1p)) wp1=0;
if (isNaN(w2p)) wp1=0;
if (isNaN(w3p)) wp1=0;
if (isNaN(w4p)) wp1=0;
if (w1p > 100) w1p=100;
if (w2p > 100) w2p=100;
if (w3p > 100) w3p=100;
if (w4p > 100) w4p=100;
GM_setValue("rfl_wbuy1_percent",w1p);
GM_setValue("rfl_wbuy2_percent",w2p);
GM_setValue("rfl_wbuy3_percent",w3p);
GM_setValue("rfl_wbuy4_percent",w4p);
var cb = 0;
if (document.getElementById("doAttackbuy").checked) cb=1;
GM_setValue("rfl_doattackbuy",cb);
var cb = 0;
if (document.getElementById("doShowbuy").checked) cb=1;
GM_setValue("rfl_doshowbuy",cb);
closediv("weaponsPrefs");
if (cb == 1) loadthePage("http://www.kingsofchaos.com/armory.php");
},false);
}

function updateTrainPrefs(nr) {
var oldprefs = GM_getValue("rfl_train_order","1,2,3,4").split(",");
var pointer = Math.floor((nr-1) / 4);
var nrClicked = nr - (pointer*4);
var oldValue = oldprefs[pointer];
var swap = 0;
for (var i=0;i<4;i++) if (nrClicked == oldprefs[i]) {swap = i;break;}
var tmp = oldprefs[swap];
oldprefs[swap] = oldprefs[pointer];
oldprefs[pointer]=tmp;
var str = '';
for (var i =0;i<4;i++) {
if (str.length > 0) str +=",";
str += oldprefs[i].toString();
}
GM_setValue("rfl_train_order",str);
for (var i=1;i<5;i++) {
var elemNr = ((i*4)-3)+(oldprefs[(i-1)]-1);
var elem = "train_"+elemNr.toString();
document.getElementById(elem).checked = true;
}
}

function updateMercsPrefs(nr) {
var oldprefs = GM_getValue("rfl_mercs_order","1,2,3").split(",");
var pointer = Math.floor((nr-1) / 3);
var nrClicked = nr - (pointer*3);
var oldValue = oldprefs[pointer];
var swap = 0;
for (var i=0;i<3;i++) if (nrClicked == oldprefs[i]) {swap = i;break;}
var tmp = oldprefs[swap];
oldprefs[swap] = oldprefs[pointer];
oldprefs[pointer]=tmp;
var str = '';
for (var i =0;i<3;i++) {
if (str.length > 0) str +=",";
str += oldprefs[i].toString();
}
GM_setValue("rfl_mercs_order",str);
for (var i=1;i<4;i++) {
var elemNr = ((i*3)-2)+(oldprefs[(i-1)]-1);
var elem = "mercs_"+elemNr.toString();
document.getElementById(elem).checked = true;
}
}

function updateBuyOrder(nr) {
var oldprefs = GM_getValue("rfl_buy_order","1,2,3").split(",");
var pointer = Math.floor((nr-1) / 3);
var nrClicked = nr - (pointer*3);
var oldValue = oldprefs[pointer];
var swap = 0;
for (var i=0;i<3;i++) if (nrClicked == oldprefs[i]) {swap = i;break;}
var tmp = oldprefs[swap];
oldprefs[swap] = oldprefs[pointer];
oldprefs[pointer]=tmp;
var str = '';
for (var i =0;i<3;i++) {
if (str.length > 0) str +=",";
str += oldprefs[i].toString();
}
GM_setValue("rfl_buy_order",str);
for (var i=1;i<4;i++) {
var elemNr = ((i*3)-2)+(oldprefs[(i-1)]-1);
var elem = "buyorder_"+elemNr.toString();
document.getElementById(elem).checked = true;
}
}

var buy1 = new Array();
var buy2 = new Array();
var buy3 = new Array();

function doTrainingBuy() {
var trainOrder = GM_getValue("rfl_train_order","1,2,3,4").split(",");
var url = "http://www.kingsofchaos.com/train.php";
var turing;
getdata(url,function(r) {
if (InStr(r,'Please login to view that page.')) {
GM_log(">logged out, need to relogin...");
setTimeout(reLogin,10);
return;
}
turing = FindText(r,'turing" value="','"');
allPagesInfo(r);
GM_log(">got turing:"+turing);
var gold = parseInt(GM_getValue("rfl_GOLD",0));
var solArray = new Array();
solArray[0]= parseInt(trim(FindText(FindText(r,'<td><b>Trained Attack Soldiers</b></td>','d>'),'>','<').replace(/,/g,'')));
solArray[1]= parseInt(trim(FindText(FindText(r,'<td><b>Trained Defense Soldiers</b></td>','d>'),'>','<').replace(/,/g,'')));
solArray[2]= parseInt(trim(FindText(FindText(r,'<td><b>Untrained Soldiers</b></td>','d>'),'>','<').replace(/,/g,'')));
solArray[3]= parseInt(trim(FindText(FindText(r,'<b>Spies</b></td>','d>'),'>','<').replace(/,/g,'')));
solArray[4]= parseInt(trim(FindText(FindText(r,'<b>Sentries</b></td>','d>'),'>','<').replace(/,/g,'')));

var values = new Array(0,0,0,0);
for (var i=0;i<trainOrder.length;i++) {
var n = trainOrder[i];
GM_log(">Order: "+n);
GM_log(">Gold:"+addCommas(gold));
if (n == 1) {
GM_log(">Going for attackSoldiers");
var tp = parseInt(GM_getValue("rfl_train1_percent",0));
if (tp>0) {
GM_log(">Percentage:"+tp+"%");
var canbuy = Math.floor(((gold / 100) * tp) / 2000);
GM_log(">canbuy:"+canbuy);
if (canbuy > solArray[2]) canbuy = solArray[2]; // bigger then available US?
GM_log(">untrained:"+solArray[2]);
var cap = parseInt(GM_getValue("rfl_train1_cap",0));
if (cap > 0) {canbuy = cap-solArray[0];if (canbuy<0) canbuy=0;} // if needs capped we do here
gold -= (canbuy * 2000);
solArray[2] -= canbuy;
values[0] = canbuy;
GM_log(">solArray:"+solArray);
GM_log(">values:"+values);
}
}
if (n == 2) {
var tp = parseInt(GM_getValue("rfl_train2_percent",0));
if (tp>0) {
var canbuy = Math.floor(((gold / 100) * tp) / 2000);
if (canbuy > solArray[2]) canbuy = solArray[2]; // bigger then available US?
var cap = parseInt(GM_getValue("rfl_train2_cap",0));
if (cap > 0) {canbuy = cap-solArray[1];if (canbuy<0) canbuy=0;} // if needs capped we do here
gold -= (canbuy * 2000);
solArray[2] -= canbuy;
values[1] = canbuy;
}
}
if (n == 3) {
GM_log(">Going for spies");
var tp = parseInt(GM_getValue("rfl_train3_percent",0));
if (tp>0) {
GM_log(">Percentage:"+tp+"%");
var canbuy = Math.floor(((gold / 100) * tp) / 3500);
GM_log(">canbuy:"+canbuy);
if (canbuy > solArray[2]) canbuy = solArray[2]; // bigger then available US?
GM_log(">untrained:"+solArray[2]);
var cap = parseInt(GM_getValue("rfl_train3_cap",0));
if (cap > 0) {canbuy = cap-solArray[3];if (canbuy<0) canbuy=0;} // if needs capped we do here
gold -= (canbuy * 3500);
solArray[2] -= canbuy;
values[2] = canbuy;
GM_log(">solArray:"+solArray);
GM_log(">values:"+values);
}
}
if (n == 4) {
var tp = parseInt(GM_getValue("rfl_train4_percent",0));
if (tp>0) {
var canbuy = Math.floor(((gold / 100) * tp) / 3500);
if (canbuy > solArray[2]) canbuy = solArray[2]; // bigger then available US?
var cap = parseInt(GM_getValue("rfl_train4_cap",0));
if (cap > 0) {canbuy = cap-solArray[4];if (canbuy<0) canbuy=0;} // if needs capped we do here
gold -= (canbuy * 3500);
solArray[2] -= canbuy;
values[3] = canbuy;
}
}
}
buy3 = values;
var params = "train[attacker]=" + values[0];
params += "&train[defender]=" + values[1];
params += "&train[spy]=" + values[2];
params += "&train[sentry]=" + values[3];
params += "&train[unattacker]=0";
params += "&train[undefender]=0";
params += "&turing=" + turing;
params += "&hash=";
GM_log(params);
postdata(url,params,function(r) {
buyPointer++;
setTimeout(doTheBuy,10);
});
});

}

function doMercsBuy() {
var trainOrder = GM_getValue("rfl_mercs_order","1,2,3").split(",");
var url = "http://www.kingsofchaos.com/mercs.php";
var turing;
getdata(url,function(r) {
if (InStr(r,'Please login to view that page.')) {
GM_log(">logged out, need to relogin...");
setTimeout(reLogin,10);
return;
}
turing = FindText(r,'turing" value="','"');
allPagesInfo(r);
GM_log(">buying MERCS");
GM_log(">got turing:"+turing);
var gold = parseInt(GM_getValue("rfl_GOLD",0));
GM_log("Treasury:"+gold);
var solArray = new Array();
var TAS = parseInt(trim(FindText(FindText(r,'<b>Trained Attack Soldiers</b></td>','td>'),'>','<').replace(/,/g,'')));
var TAM = parseInt(trim(FindText(FindText(r,'<b>Trained Attack Mercenaries</b></td>','td>'),'>','<').replace(/,/g,'')));
var TDS = parseInt(trim(FindText(FindText(r,'<b>Trained Defense Soldiers</b></td>','td>'),'>','<').replace(/,/g,'')));
var TDM = parseInt(trim(FindText(FindText(r,'<b>Trained Defense Mercenaries</b></td>','td>'),'>','<').replace(/,/g,'')));
var US = parseInt(trim(FindText(FindText(r,'<b>Untrained Soldiers</b></td>','td>'),'>','<').replace(/,/g,'')));
var UM = parseInt(trim(FindText(FindText(r,'<b>Untrained Mercenaries</b></td>','td>'),'>','<').replace(/,/g,'')));
var SPIES= parseInt(trim(FindText(FindText(r,'<b>Spies</b></td>','td>'),'>','<').replace(/,/g,'')));
var SENTRIES= parseInt(trim(FindText(FindText(r,'<b>Sentries</b></td>','td>'),'>','<').replace(/,/g,'')));
var MORALE= parseInt(trim(FindText(FindText(r,'<b>Army Morale</b></td>','td>'),'>','<').replace(/,/g,'')));
var TFF= parseInt(trim(FindText(FindText(r,'<b>Total Fighting Force</b></td>','td>'),'>','<').replace(/,/g,'')));
var COVERTS = (SPIES + SENTRIES);
var maximum = Math.floor((TAS+TDS+US+COVERTS) / 4);
var haveMercs = TAM+TDM+UM;
var canBuyMercs = maximum - haveMercs;
var AM_AVAIL = parseInt(FindText(FindText(FindText(r,'<td>Attack Specialist</td>','</tr>'),'/td>','/td>'),'>','<').replace(/,/g,''));
var DM_AVAIL = parseInt(FindText(FindText(FindText(r,'<td>Defense Specialist</td>','</tr>'),'/td>','/td>'),'>','<').replace(/,/g,''));
var UM_AVAIL = parseInt(FindText(FindText(FindText(r,'<td>Untrained</td>','</tr>'),'/td>','/td>'),'>','<').replace(/,/g,''));

var values = new Array(0,0,0);
for (var i=0;i<trainOrder.length;i++) {
var n = trainOrder[i];
GM_log(">Order: "+n);
GM_log(">Gold:"+addCommas(gold));
if (n == 1) {
GM_log(">Going for attackMercs");
var tp = parseInt(GM_getValue("rfl_mercs1_percent",0));
if (tp>0) {
GM_log(">Percentage:"+tp+"%");
var canbuy = Math.floor(((gold / 100) * tp) / 4500);
GM_log(">canbuy:"+canbuy);
if (canbuy > canBuyMercs) canbuy = canBuyMercs; // bigger then 1/4 army?
if (canbuy > AM_AVAIL) canbuy = AM_AVAIL;
var cap = parseInt(GM_getValue("rfl_mercs1_cap",0));
if (cap > 0) {
if ((TAM + canbuy) > cap) {canbuy = (cap-TAM);if (canbuy<0)canbuy=0;} // if needs capped we do here
}
gold -= (canbuy * 4500);
canBuyMercs -= canbuy;
values[0] = canbuy;
GM_log(">values:"+values);
}
}
if (n == 2) {
var tp = parseInt(GM_getValue("rfl_train2_percent",0));
if (tp>0) {
var canbuy = Math.floor(((gold / 100) * tp) / 4500);
if (canbuy > canBuyMercs) canbuy = canBuyMercs; // bigger then 1/4 army?
if (canbuy > DM_AVAIL) canbuy = DM_AVAIL;
var cap = parseInt(GM_getValue("rfl_mercs2_cap",0));
if (cap > 0) {
if ((TDM + canbuy) > cap) {canbuy = (cap-TDM);if (canbuy<0)canbuy=0;} // if needs capped we do here
}
gold -= (canbuy * 4500);
canBuyMercs -= canbuy;
values[1] = canbuy;
}
}
if (n == 3) {
var tp = parseInt(GM_getValue("rfl_mercs3_percent",0));
if (tp>0) {
GM_log(">Going for untrained mercs...");
GM_log(">canBuyMercs (1/4 army):"+canBuyMercs);
GM_log(">UM_AVAIL:"+UM_AVAIL);
GM_log(">Percentage:"+tp+"%");
var canbuy = Math.floor(((gold / 100) * tp) / 3500);
GM_log(">canbuy:"+canbuy);
if (canbuy > canBuyMercs) canbuy = canBuyMercs; // bigger then 1/4 army?
if (canbuy > UM_AVAIL) canbuy = UM_AVAIL;
var cap = parseInt(GM_getValue("rfl_mercs3_cap",0));
if (cap > 0) {
if ((UM + canbuy) > cap) {canbuy = (cap-UM);if (canbuy<0)canbuy=0;} // if needs capped we do here
}
gold -= (canbuy * 3500);
canBuyMercs -= canbuy;
values[2] = canbuy;
GM_log(">values:"+values);
}
}
}
buy2 = values;
var params = "mercs[attack]=" + values[0];
params += "&mercs[defend]=" + values[1];
params += "&mercs[general]=" + values[2];
params += "&turing=" + turing;
GM_log(params);
postdata(url,params,function(r) {
buyPointer++;
setTimeout(doTheBuy,10);
});
});
}


function doArmoryBuy() {
var url = "http://www.kingsofchaos.com/armory.php";
getdata(url,function(res) {
if (InStr(res,'Please login to view that page.')) {
GM_log(">logged out, need to relogin...");
setTimeout(reLogin,10);
return;
}
allPagesInfo(res);
var turing = FindText(res,'name="turing" value="','"');
var weapon1 = getWeaponByKocNumber(GM_getValue("rfl_bankWeapon1",69));
var weapon2 = getWeaponByKocNumber(GM_getValue("rfl_bankWeapon2",69));
var weapon3 = getWeaponByKocNumber(GM_getValue("rfl_bankWeapon3",69));
var weapon4 = getWeaponByKocNumber(GM_getValue("rfl_bankWeapon4",69));
var weapon1_percent = GM_getValue("rfl_wbuy1_percent",100);
var weapon2_percent = GM_getValue("rfl_wbuy2_percent",0);
var weapon3_percent = GM_getValue("rfl_wbuy3_percent",0);
var weapon4_percent = GM_getValue("rfl_wbuy4_percent",0);
var tres = GM_getValue("rfl_GOLD",0);
GM_log(">gold in treasury: "+tres);
var onepercent = parseInt(GM_getValue("rfl_GOLD",0)) / 100;
var canbuy = new Array(new Array(69,0),new Array(69,0),new Array(69,0),new Array(69,0));
canbuy[0][0] = weapon1[3];
canbuy[0][1] = Math.floor(((tres / 100)*weapon1_percent) / parseInt(weapon1[4]));
tres -= (canbuy[0][1] * parseInt(weapon1[4]));
GM_log(">gold in treasury: "+tres);

canbuy[1][0] = weapon2[3];
canbuy[1][1] = Math.floor(((tres / 100)*weapon2_percent) / parseInt(weapon2[4]));
tres -= (canbuy[1][1] * parseInt(weapon2[4]));
GM_log(">gold in treasury: "+tres);

canbuy[2][0] = weapon3[3];
canbuy[2][1] = Math.floor(((tres / 100)*weapon3_percent) / parseInt(weapon3[4]));
tres -= (canbuy[2][1] * parseInt(weapon3[4]));
GM_log(">gold in treasury: "+tres);

canbuy[3][0] = weapon4[3];
canbuy[3][1] = Math.floor(((tres / 100)*weapon4_percent) / parseInt(weapon4[4]));
tres -= (canbuy[3][1] * parseInt(weapon4[4]));
GM_log(">gold in treasury: "+tres);

GM_log(">canBuy: "+canbuy);
buy1 = canbuy;
var buyData = 'buy_weapon['+canbuy[0][0]+']='+canbuy[0][1];
for (var i=1;i<4;i++) if (canbuy[i][1] > 0) buyData += '&buy_weapon['+canbuy[i][0]+']='+canbuy[i][1];
buyData += '&turing=' + turing;
buyData += '&hash=';
GM_log(">buyData : "+buyData);
GM_log(">url: "+url);
GM_setValue("rfl_doBuy",0);
GM_log(">setting rfl_doBuy 0");
url = "http://www.kingsofchaos.com/armory.php";
postdata(url,buyData,function(r) {
GM_log(">got response from "+url);
GM_setValue("rfl_doBuy",2);
parseArmory(r);
GM_log("GOLD : "+GM_getValue("rfl_GOLD"));
});
});
}

var buyPointer = 0;

function startBuy() {
buyPointer = 0;
buy1 = new Array();
buy2 = new Array();
buy3 = new Array();
doTheBuy();
}

function doTheBuy() {
GM_setValue("rfl_doBuy",1);
GM_log(">doTheBuy / buyPointer:"+buyPointer);
var buyorder = GM_getValue("rfl_buy_order","1,2,3").split(",");
if (buyorder[buyPointer] == 1) {
setTimeout(getRepairs,10);
}
if (buyorder[buyPointer] == 2) {
setTimeout(doMercsBuy,10);
}
if (buyorder[buyPointer] == 3) {
setTimeout(doTrainingBuy,10);
}
if (buyPointer > buyorder.length-1) {
GM_setValue("rfl_doBuy",0);
if ((!document.getElementById("showbuy")) && (GM_getValue("rfl_doshowbuy",0) == 1)) {
var Xpos = 40;var Ypos = 40;
if (GM_getValue("showbuyX",-1) != -1) Xpos = GM_getValue("showbuyX",40);
if (GM_getValue("showbuyY",-1) != -1) Ypos = GM_getValue("showbuyY",40);
makediv("showbuy",999,0,0,Xpos,Ypos,'#272727','<span style="color:yellow;">Buying weapons</span>');
}
if (GM_getValue("rfl_doshowbuy",0) == 1) {
var newHTML = '<table border="0" cellpadding="2" cellspacing="0">';
newHTML += '<tr><th style="width:250px;">Bought/Trained</th><th>Amount</th><th style="width:170px;">cost</th></tr>';
for (var i=0;i<buy1.length;i++) {
if (buy1[i][1] > 0) {
var w = getWeaponByKocNumber(buy1[i][0]);
var a = buy1[i][1];
var t = (a * w[4]);
newHTML += '<tr><td>'+w[0]+'</td><td style="text-align:right;">'+addCommas(a)+'</td><td style="text-align:right;">'+addCommas(t)+'</td></tr>';
}
}
var pa = new Array(4500,4500,3500);
var ps = new Array('(Mercs) Attack Specialists','(Mercs) Defense Specialists','(Mercs) Untrained');
for (var i=0;i<buy2.length;i++) {
if (buy2[i] > 0) {
var a = buy2[i];
var t = (a * pa[i]);
newHTML += '<tr><td>'+ps[i]+'</td><td style="text-align:right;">'+addCommas(a)+'</td><td style="text-align:right;">'+addCommas(t)+'</td></tr>';
}
}
pa = new Array(2000,2000,3500,3500);
ps = new Array('(Train) Attack Specialists','(Train) Defense Specialists','(Train) Spies','(Train) Sentries');
for (var i=0;i<buy3.length;i++) {
if (buy3[i] > 0) {
var a = buy3[i];
var t = (a * pa[i]);
newHTML += '<tr><td>'+ps[i]+'</td><td style="text-align:right;">'+addCommas(a)+'</td><td style="text-align:right;">'+addCommas(t)+'</td></tr>';
}
}
newHTML += '</table>';
document.getElementById("content_showbuy").innerHTML = newHTML;
var st = GM_getValue("rfl_showsec",10);
setTimeout(closeshowbuy,(st * 1000));
}// end do show buy
if (GM_getValue("button1Clicked",false)) {
GM_setValue("button1Clicked",false);
loadthePage("http://www.kingsofchaos.com/armory.php");
}
}
}

})();