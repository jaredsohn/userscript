// ==UserScript==
// @name        ME3 Manifest Detailer
// @namespace   creakazoidbsn
// @include     http://social.bioware.com/n7hq/home/inventory/?name=*&platform=*
// @require 	https://dl.dropbox.com/u/51901387/datacache-6.js
// @require		http://userscripts.org/scripts/source/139436.user.js
// @version     1.8.9d
// ==/UserScript==


(function(){
//[DataBlock]
//[ConfigBlock]
var DetailerResources = {
	down:	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAABCCAYAAAACPxW5AAAAAXNSR0ICQMB9xQAAAAlwSFlzAAAXEgAAFxIBZ5/SUgAAABl0RVh0U29mdHdhcmUATWljcm9zb2Z0IE9mZmljZX/tNXEAAAUhSURBVGje3ZtZbxtVGIZbnKQNgTRpS1M3TXGdNgiTtU3seLfj8RYjIYQQQqhI9AIJJJAQvyBIIHGBBEJwV1ApZSl0yeYE22mztOrKbwCEEPSqbPeH7yPfSENqOx5/c8aHVHpuKvU97zNzxp5zjrttampq21ZmS8tZIgh/tpfhgTq5L6uhgrpMKZeeupzLCCvBTF26IYKGO9VUyKXfsloQMzGbK8mWA3bks8m3sdT5kF+cGvCwwAzMwkzM5kpyBB1U4KHpdOJdLHUh7BefDD7BAjMwCzMxm8Zw2CZouHvNQCvQ+W0y/p4u+CmU5KALYiZm0xjN9d5FjmALXeF9XyVi72Opi+GAOD3UzwIzMAszMZvGaLFbUJ+e7YDzbCzyIZa6FAmIz4YHWGAGZmEmZtMYdU9TjuBOYBfQfSYe+UgXPAMlOeiCmInZNMbORgl2AAd1wWko9zmU5DD9X8GDNEZDBXtOx8MfrwsGxdmRQRaYgVmYidlKCc5AuS+gJIcZ1QW/hJIclBacjQbF18eGWGCGsoJzUO4clOQwp7rgN1CSg9KC89GQOH98mAVmKCuYh3IXoCSHvNKCsZC4ODrCAjOUFVyAcpegJIcFlQUXY2ExM3aMBWYoLTgLJTkoLfhdPCzmvMdZYIbSgvNQkoPSggUol4eSHApqC0bEgm+UBWYoK1iEcotQkkNRZcESlCvgXWBQUl2wiHeBgdKCSxMRURofY4EZSgsuYUkOdglWORZzGHe1gUO64OWJqLji97LADIPgoQ272w6zx2wV5Yqadngpl/nBzInQlURULAd8LDDDzJhLk+l7xUxmpJJkta15x7lY7Egpl/7RjOAKlORgRhDlZjVt1HhnqwoabrmDzgNaP/D5PKXJ9E//CmSSYjXoF6tQpFEspzSSy/x+KhoN0vRtqSRZ7eQIH+yHgT1vejzewmTq53XJlFgL+cVacNx2ltPrcnDB/3hnbEyDbnvp7KLiCVS1k6MH6QHHA5DDL7jdicVs6hdd8ipIXoVB7UKXK2bTf77R3/80dHIDB4DdQJvhLtYs2Eb/GM8HjgJDT/b0PLWQSf2qS14DyWswuGxWSK6QTf91sq/vBHQZBh6jr5E9hiM2h5kpqn8NHNAFAb/W3f18Ppv8TZe8Hg6I6yAqC6MczKKXoUMAwE/NPjp92k2zbfMpWub8D5/BR4BHAQ/gBaIxp/PF+Yx2FwdeJskbUMZqDHJ/P+d2vwpjxwAf0I+PDR2QttPnRZMZQf0HBq10Pref5vwA3kVgIup0vmSUvAGSN6GUVawa5J51uV6DMRN093Am9dJnQ8dmR9y1nsN3UGAvDYADadGurpNGyZuRoLgFolyMcs+4XK/DWEkgSM/eUXpsOg1T01HzF32ZqdpMQbrkkWqSt0DyNpSsF5NyLZu9o9b6Ym2LpNVyNa0m6pXEwnfgWaqVNQlyNS+XZEvKkjO1HpQlKVPO9IK3HskVkLwT9ovvQ+P3IVuOu6JnSdohZ8WP8eqStEvOit+LmpRM2irHEqxX0k45tqApSXp3NbxbarLlLBGsURJf0OMTTucJWBW8gi/rJC5VzjLBTSR7aRXiJakgLXmG6AJIk7NUsIrkflq7PU6ig7S2dNMFkCZnuWAZSX09uY+2PnDh7KKthi66ANLkpAiWkdR35zpp/2QvbTO0b9ix3i6li4zQMjsDO0imjWilv5MqJ1Vw4y45iTYTTdV2o/83ght2y8v+PyXp48seoNKJlW1j2inYCLa84D/AKf6eEeGSbgAAAABJRU5ErkJggg==",
	up:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABDCAYAAAA4aJ2RAAAAAXNSR0ICQMB9xQAAAAlwSFlzAAAXEgAAFxIBZ5/SUgAAABl0RVh0U29mdHdhcmUATWljcm9zb2Z0IE9mZmljZX/tNXEAAAXMSURBVGje7ZpbU1NXFMcRAnKXFqgVS0GgtGNbpxTlagi5kIQhCaGRD9BO62Mf2nFqqxUQRW4BI5cQdATFcjOAUSlQbvb60trp1H6KfgH7trtWuk49zRBIds4JR6YPv3HUrP/av3OD7HVi2traYvYqe1bsfznJGsXE7OucbT6EfyLPvZwgAsS6l5rr3cuOp+7F5vfx79GQlFsMJeIGfI4GEPtrZOUUQ4YWHR/gvwuSz5WcSEzlmm+yCGKe1SYmCLp8jg/x/+UUlFWsz2uzCmKjm3Z24ycTG31kfSY43/SRnIKyifXO2myBYgJbCMbLIRh1sa0E+7xNp+UQlFXMs2Fn1380BcWzKa/grolFQ1A+sR9MISOXoExi5rDxbNokF5RWbB3Evjdz49mQVlBSsdHvzBEjpaB0Yt+aJMOzLs09GLnYmp15HpkkZ0QCwYjERtYa2cimUT7WIhOMSMy9YZSfCAS5xNyrjWx4vS5quFctXIJcYkNrdVFnmEMwvEtxxcGGv7EEZXDVCBgiwLhtPvYP5+tSKN/HngqBOzG4YmYDKwZusD7UXqEIBpOLaz5dmu7y2S4452xdnVMNfW3j5sEWj8Fzbthw84xLN3HGqZ38tFcz80mvZvaqz/4nNhtYNrNrywZusB5zMA9zMR/7YL+zQ/qx8yPGUVxH52R9f6/X1u1asHd83Fp6kLYstpcTnTW8npOADAB3rAqBY0AloAXMgBWwA46uqYY//HJLJuZa0nOD9ZiDeZgLNFGfekAHVAHvAK8BOcALQHKw+2/LswYkAClAJvAK8DqFopwGMJBgA2DrmrI8wUVd+9rIri7quMH6f+QsTzCX8rFPHVBLcu8CbwCvAllAKq03Lhy5VJEcHqm3gFKgHKgGauhoGrunLb/774FFI+t/qOMG6zEH8zCX8muoXzn1fxsoBnJFcvvDlUumy/IgHaVCOoNHqUEJUAaoe2atv/nvlYdG1vdAyw3WYw7mYS7ll1C/N+mMFQF5wMt0WaaEc+Zi6QmUSEcFA7Ip7DAdsTySRdFSp9f6q1/ugZE572u5wXrMwTw6S0epTx71PUzPgGxaVxqtM+R7Tjh78XS6k0kyHThAoZkkm49H1Om1Pf5Xzqfl5pmc7TGdqXzqk0l9D9A60mhdgljcjnJbCKqoOIFE99NTNEX0JC3un7P9govqv1/Heu/VcoP1/hzIo/vqEPVJob7CGhJoXartdq533OMXtsRFqKhBKl0ehf0LjT/7fy3yGVjPgoYbrPfLQR5djtmiB4YqYB2xO80cQh1k7AsQjqfLAp9WBYKc856Bdc9ruMF6kVwB5f/n51ggcmwzqOgywXvhiFiua07DTYDcEcpPon7ybjPsJNe7oGed3hpusF6xcj3zenblbg03WK9Yue45PeuYUXOD9cqV8+rZ5Wk1N1ivWLmuuzp2aeokN1ivWLnOWR1rnzzJDdYrV25Gy9rvVHOD9YqVuzKtZRcnqrnBeuXKTdWytttV3GC9YuU6YHGtt6q46VCy3OXJWtYyXskN1itW7tJXtezCWCU3WK9cuTsa9uXNCm6wXrFy7RMadv5GBTdYr1i5i7c17Nz1Cm6wXrFybbdq2Bej5dxgvYLl1OxzTxk3WK9YudZxNTs7UsYN1itWrmVMzT5zn+AG6xUrJxVKksuXSS5/t+VepK3uY7S3bwIagfdoBHUqBBz0+UaqV1NeHuXvilwibXHn0p5+BU1lcJZmobmaLQSs9HlhBldBebmUnxhtuTjaBU6nLe+igPkdLlIfBjqqq6ScIspNDzaekvvdr3jaw8+iGV4xzfBKaEJzHDgRAsfp8yVUX0x5WZQfnXe/RILiMVcaLSSH7pMCOvLhUkD1OZSXJrokY3fjlcR40Rwvgx4AWTTAQF4KAeGzWVSfQXmJUX8lMcigMoEWk0SDixQOkqk+kfIifiVfqteAY0XjLWGmFy6qgHnb7r0GHMKYK1zCGk9FRU7J7Gm5vwHkUUuldwi8ggAAAABJRU5ErkJggg==",
	style://[sb]
	"@charset utf-8;.valueDisplay{font-weight:bold;display:inline !important;}.incrementDisplay{font-style:italic;}.details td:nth-child(1){text-align:left;color:#F5F5F5;}.details td:last-of-type{color:#B9B9B9;}.details th:nth-child(1){text-align:left;}div.details{padding-bottom:10px;display:inline;margin:12px 15px;}div.details > table{background-color:rgba(193,193,193,0.06);width:100%;float:left;border-collapse:collapse;border-style:solid;border-width:medium;}div.details th{font-style:italic;padding-left:8px;background-color:rgba(193,193,193,0.16);}.quantityCol{text-align:center;vertical-align:central;padding-left:2px;padding-right:2px;font-weight:bolder;font-size:120%;background-color:rgba(0,51,102,0.2);}.rarity_common{border-color:rgba(0,0,153,0.3)!important;border-left-color:rgba(0,0,153,0.3);border-top-color:rgba(0,0,153,0.3);border-right-color:rgba(0,0,153,0.3);border-bottom-color:rgba(0,0,153,0.3);}.rarity_uncommon{border-color:rgba(204,204,204,0.3)!important;border-top-color:rgba(204,204,204,0.3);border-right-color:rgba(204,204,204,0.3);border-left-color:rgba(204,204,204,0.3);border-bottom-color:rgba(204,204,204,0.3);}.rarity_rare{border-color:rgba(255,204,0,0.3)!important;border-top-color:rgba(255,204,0,0.3);border-bottom-color:rgba(255,204,0,0.3)!important;border-left-color:rgba(255,204,0,0.3);border-right-color:rgba(255,204,0,0.3);}.rarity_ultra{border-color:rgba(153,0,0,0.3) !important;border-top-color:rgba(153,0,0,0.3);border-left-color:rgba(153,0,0,0.3);border-right-color:rgba(153,0,0,0.3);border-bottom-color:rgba(153,0,0,0.3);}.details_row{padding-left:6px;border-collapse:collapse;border-color:rgba(102,102,102,0.1);border-style:inset;}.details_row:hover{background-color:rgba(255,204,0,0.2);}.details_col{padding-left:8px;padding-right:2px;}.powerKit img{width:34px;height:34px;vertical-align:middle;text-align:center;}.powerKit{background:rgba(255,204,0,0)!important;border:0!important;border-style:none!important;border-width:thin;}.modEffects{text-align:right;background:rgba(255,204,0,0)!important;border:0!important;width:100%;}.modEffects table{border-collapse:collapse;border-color:rgba(110,110,110,0.4);border-style:solid;border-width:thin;}.modEffects table tr:first-child th{border-top:0;}.modEffects table tr:last-child td{border-bottom:0;}.modEffects table tr td:first-child,.modEffects table tr th:first-child{border-left:0;}.modEffects table tr td:last-child,.modEffects table tr th:last-child{border-right:0;}.modEffects td:nth-child(1){text-align:left!important;}.modSelect select{background:rgba(125,125,125,0.25);width:100%;font-size:inherit;color:inherit;border:1px solid rgba(125,125,125,0.3);-webkit-appearance:none;}.modSelect{margin:1px 5px 2px;padding:2px 3px;}table.modSelect{width:95%;}.demandMain{width:90%;}.demandSide{width:10%;}.modSelect > span{font-style:italic;margin-right:6px;margin-left:7px;}div.difficultyBreakdown{font-weight:bold;color:rgb(0,35,173);}div.difficultyBreakdown span{margin:0!important;}.stratifiedTooltip:hover{text-decoration:none;color:inherit;}.spanBronze{color:rgb(140,120,83)!important;font-weight:normal;}.spanSilver{color:rgb(200,200,200)!important;font-weight:normal;}.spanGold{color:rgb(204,153,0)!important;font-weight:normal;}div.globalSelectorStyle{width:100%;vertical-align:middle;border-radius:4px;display:inline-block;padding:6px 0 6px 6px;}div.globalSelectorStyle > table{margin-bottom:16px;width:100%;}div.globalSelectorStyle th{font-size:larger;padding-bottom:18px;text-align:center;}div.globalSelectorStyle tr{padding:4px;}div.globalSelectorStyle select{width:100%!important;}.clearAll{margin-top:14px;width:100%;}.clearAll button{height:24px;font:inherit;font-size:12px;font-style:italic;color:inherit;background-color:rgb(80,80,80);vertical-align:middle;border-radius:4px;width:90%;border-color:rgba(60,60,60,0.2);}.clearAll button:hover{color:rgb(0,0,0);font-weight:bold;}.weaponTooltip{display:inline;position:relative;text-align:left;}.weaponTooltip:hover:after{background:rgba(0,0,0,.8);border-radius:5px;bottom:40px;color:#F3F3F3;font-weight:bolder;content:attr(data-hovertitle);display:block;left:0;position:absolute;width:300px;z-index:98;padding:5px 15px;}div.randomViewer{margin-top:4px;margin-left:1px;margin-right:1px;padding-bottom:4px;font-size:x-small;}div.randomViewer > table{background-color:rgba(0,0,0,0.4);width:100%;}div.randomViewer th{font:inherit;font-style:italic;padding-left:8px;background-color:rgba(193,193,193,0.1);}div.randomViewer td.last{width:1px;white-space:nowrap;}div.floater{display:block; font-size: 0.9em;position:fixed;width:230px;top:30%;padding-bottom:10px;background-color:rgba(48,48,48,0.85);-moz-box-shadow:0 0 4px 4px rgb10,10,10);-webkit-box-shadow:0 0 4px 4px rgb(10,10,10);box-shadow:0 0 5px 5px rgb(10,10,10);z-index:80;border-color:rgba(20,20,20,0.2);}.fixedLeft{left:1px;padding-left:16px;padding-right:12px;border-top-right-radius:6px;border-bottom-right-radius:6px;}.fixedRight{right:1px;padding-right:12px;padding-left:12px;border-top-left-radius:6px;border-bottom-left-radius:6px;}.spanShields{color:rgb(51,88,255)!important;font-weight:normal;}.spanBarriers{color:rgb(182,64,255)!important;font-weight:normal;}div.details img,div.randomViewer img{vertical-align:middle;width:13px;height:13px;}.powerTooltip img,.weaponTooltip img{-moz-box-shadow:none;-webkit-box-shadow:none;box-shadow:none;}.powerTooltip,.stratifiedTooltip,.stratifiedTooltip:link{display:inline;position:relative;}.powerTooltip:hover,.weaponTooltip:hover{text-decoration:none;}.powerTooltip:hover:after,.stratifiedTooltip:hover:after{background:rgba(0,0,0,.8);border-radius:5px;bottom:18px;color:#fff;font-weight:bolder;content:attr(data-hovertitle);display:block;left:50%;position:absolute;white-space:nowrap;z-index:98;padding:5px 15px;}.powerTooltip:hover:before,.stratifiedTooltip:hover:before,.weaponTooltip:hover:before{border:solid;bottom:12px;content:\"\";display:block;left:75%;position:absolute;z-index:99;border-color:#111 transparent;border-width:6px 6px 0;}div.powerBlanket{display:none;z-index:7999;width:100%;height:100%;position:fixed;left:0;top:0;background-color:rgba(0,0,0,0.5);}div.powerSelector{display:none;position:fixed;width:290px;height:170px;left:50%;top:50%;margin-left:-175px;margin-top:-100px;background-color:rgba(68,68,68,0.95);-moz-box-shadow:0 0 4px 4px rgb10,10,10);-webkit-box-shadow:0 0 4px 4px #0a0a0a;box-shadow:0 0 5px 5px #0a0a0a;border-top-right-radius:10px;border-top-left-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;z-index:8000;border-color:rgba(20,20,20,0.2);padding:20px 25px;}div.powerSelector select{background:rgba(125,125,125,0.25);width:50%;font-size:inherit;color:inherit;border:1px solid rgba(125,125,125,0.3);margin-right:5%;-webkit-appearance:none;}div.powerSelectorDisplay{padding-top:25px;text-align:left;}.powerSelectorCloser{height:24px;font:inherit;font-size:12px;font-style:italic;color:inherit;background-color:#3c3c3c;vertical-align:middle;margin-left:5%;border-radius:4px;width:40%;border-color:rgba(30,30,30,0.2);}.selectedPowerElement{cursor:pointer;font-weight:700;text-align:center;display:inline-block;color:#D09448;margin:4px;}div.powerSelectorRadioDisplay{position:relative;margin-right:12px;display:inline-block;}div.powerSelectorRadioDisplay label:hover{border-bottom:1px dashed #999;}.powerSelectorTooltip{z-index:100000;position:absolute;background-color:rgba(50,50,50,0.9);display:block;width:150px;left:105%;top:0;border-top-right-radius:5px;border-top-left-radius:5px;border-bottom-right-radius:5px;border-bottom-left-radius:5px;border-color:rgba(160,160,160,0.7);border-style:solid;border-width:thin;padding:12px;}div.details{font-size:0.9em;}div.difficultyBreakdown span {display:inline;}.card{overflow:visible;}select{font-size:0.9em;}div.cardHolder{overflow:auto;width:100%;}"//[/sb]
};

//Weapon Attributes
var EXT_DMG_I = "Damage Level I";
var EXT_DMG_X = "Damage Level X";
var EXT_UNCHARGED_I = "Damage Uncharged I";
var EXT_UNCHARGED_X = "Damage Uncharged X";
var EXT_ROF = "Rate of Fire";
var EXT_RELOAD_TIME = "Reload Dur.";
var EXT_MAG_SIZE = "Magazine";
var EXT_MAG_SIZE_X = "Magazine X";
var EXT_CAPACITY = "Capacity";
var EXT_STAT_DMG = "Stat Damage";
var EXT_DMG_PER_LEVEL = "Damage Increment";
var EXT_WEIGHT = "Weight";
var EXT_WEIGHT_I = "Weight I";
var EXT_WEIGHT_X = "Weight X";
var EXT_WEIGHT_PER_LEVEL = "Weight Decrement";
var EXT_RECOIL = "Recoil";
var EXT_MAX_CHARGE = "Max. Charge Time";
var EXT_PROJECTILE_COUNT = "Projectile Count";
var FLAG_WEAPON_TYPE = "Weapon Type";
var EXT_REFIRE = "Min. Refire Time";
var EXT_ARMOR_ATTEN = "Affected By Armor Attenuation";
var EXT_ACCURACY = "Stat Bar Acc.";
var EXT_RATIO = "Eject Ratio";
var EXT_BURST = "Rounds per Burst";
var EXT_EJECT_RATIO = "Eject Ratio";
var EXT_ZERO_COST = "Zero Ammo Cost";
var EXT_PENETRATION = "Distance Penetrated";
var EXT_CHARGE_REQUIRED = "Charge Required";
var EXT_ROF_RAMP = "ROF Ramp Time";
var EXT_ROF_MIN = "Min. ROF";
var EXT_DESCRIPTION = "General Description";
var EXT_AMMO_RECHARGE = "Ammo Recharge Rate";
var EXT_AMMO_RECHARGE_DELAY = "Ammo Recharge Delay";
var EXT_MULT_ARMOR = "Multiplier Against Armor";
var EXT_MULT_SHIELDS = "Multiplier Against Shields";
var EXT_MULT_BARRIERS = "Multiplier Against Barriers";
var EXT_MULT_HEALTH = "Multiplier Against Health";
var EXT_BASE_DMG = "Base Damage";
var EXT_GETH_DMG = "Geth Damage";
var EXT_DMG_ITERATIONS = "Damage Iterations";
var EXT_SHOT_COST_RAMPED = "Shot Cost Ramped";
var EXT_HSHOT_MOD = "Headshot Bonus";
var EXT_DOT = "DOT";

//Mod Attributes
var EXT_WEAPON_TYPE = "Weapon Type";
var EXT_MODIFIERS = "Modifiers";
var EXT_MOD_CATEGORY = "Mod Category";

//Gear Attributes
var EXT_LEVEL = "Level";
var EXT_EFFECTS = "Effect";

//Consumable Attributes
var EXT_EFFECTS_I = "Effects I";
var EXT_EFFECTS_II = "Effects II";
var EXT_EFFECTS_III = "Effects III";
var EXT_EFFECTS_IV = "Effects IV";
var EXT_AMMO_AS = "Damage AS";
var EXT_AMMO_AB = "Damage AB";

//Character Attributes
var EXT_HP = "HP";
var EXT_SHIELDS = "Shields";
var EXT_MELEE = "Melee";
var EXT_MELEE_HVY = "Heavy Melee";
var EXT_ENCUM = "Encumberance";
var EXT_POWERS = "Power";
var EXT_POWER_ICONS = "Power Icons";

//Internal Property Names
var EXT_UID = "UID";
var PROP_EFFECTIVE_MAG = "Zero Ammo Cost Magazine";
var PROP_DPS_BURST = "Burst DPS";
var PROP_DPS_SUSTAINED = "Sustained DPS";
var PROP_DPS_CANCELLED = "Reload Cancelled DPS";
var PROP_DMG = "Damage";
var PROP_DMG_UNCHARGED = "Damage Uncharged";
var PROP_ROF = "Rate of Fire";
var PROP_MAG_SIZE = "Clip Size";
var PROP_CAPACITY = EXT_CAPACITY;
var PROP_EFFECTS = EXT_EFFECTS;
var PROP_EFFECTS_NEXT = "Effects Next";
var PROP_PROJECTILE_COUNT = EXT_PROJECTILE_COUNT;
var PROP_RELOAD_TIME = "Reload Time";
var PROP_DMG_BARRELED = "Damage w/ EB";
var PROP_ACCURACY = "Accuracy";
var PROP_RECOIL = EXT_RECOIL;
var PROP_WEIGHT = EXT_WEIGHT;
var PROP_CONS_I = EXT_EFFECTS_I;
var PROP_CONS_II = EXT_EFFECTS_II;
var PROP_CONS_III = EXT_EFFECTS_III;
var PROP_CONS_IV = EXT_EFFECTS_IV;
var PROP_HP = "Base Health";
var PROP_SHIELDS = "Base Shields";
var PROP_MELEE = "Melee Damage";
var PROP_MELEE_HVY = "Heavy Melee Damage";
var PROP_ENCUM = EXT_ENCUM;
var PROP_POWERS = "Powers";
var PROP_MOD_EFFECTS = "Mod Effects";
var PROP_DVA = "Damage vs Armor";
var PROP_DVA_UNCHARGED = "Damage vs Armor Uncharged";
var PROP_SDPSVA = "DPS v Armor (Sust)";
var PROP_CDPSVA = "DPS v Armor (RC)";
var PROP_AP = "Armor Piercing";
var PROP_UID = "UID";
var PROP_PENETRATION = EXT_PENETRATION;
var PROP_MOD_CATEGORY = EXT_MOD_CATEGORY;
var PROP_DMG_SHIELDS = "Damage Against Shields";
var PROP_DMG_BARRIERS = "Damage Against Barriers";
var PROP_DMG_SPECIAL = "Dmg. vs Shields/Barriers";
var PROP_DMG_HEADSHOT = "Headshot Damage";
var PROP_INCENDIARY_DOT = "Incendiary DOT";
var PROP_DOT_MULT = "DOT Multiplier";
var PROP_DOT_MAX_STACK = "Max Stacks";

//Addendum fields
var EXT_ADD_KEYS = "Weapon Modifier Keys";
var EXT_ADD_VALUES = "Weapon Modifier Values";
var EXT_NARIDA_HASH = "Narida Hash";
var EXT_AP_AA = "AP Damage AA";
var EXT_HSHOT_MULT_MOD = "HShotMultMod";

//Script Constants
var DIV_WEAPONS = "weapons_content";
var DIV_GEAR = "gear_content";
var DIV_CHARACTERS = "inventory_characters_content";
var DIV_CONSUMABLES = "consumables_content";
var DIV_MODS = "weapon_mods_content";
var DIV_DETAILS = "details";
var ATTR_HOVER_TITLE = "data-hovertitle";
var SPAN_VAL_TEXT = "valueDisplay";
var SPAN_INCREMENT = "incrementDisplay";
var SPAN_PROP_LABEL = "propertyLabel";
var CLASS_RANDOM_VIEW = "randomViewer";
var CLASS_MOD_SELECT = "modSelect";
var CLASS_CLEAR_ALL = "clearAll";
var CLASS_POWER_TOOLTIP = "powerTooltip";
var CLASS_POWER_KIT = "powerKit";
var CLASS_ROW = "details_row";
var CLASS_COL = "details_col";
var CLASS_COMMON = "rarity_common";
var CLASS_UNCOMMON = "rarity_uncommon";
var CLASS_RARE = "rarity_rare";
var CLASS_ULTRA = "rarity_ultra";
var CLASS_QUANTITY = "quantityCol";
var CLASS_MOD_EFFECTS = "modEffects";
var CLASS_CHAR_LINK = CLASS_POWER_TOOLTIP;
var CLASS_FLOATING_DIV = "floater";
var POWER_OVERLAY_ID = "powerOverlay";
var GEAR_LABEL = "Gear";
var MODS_LABEL = "Mods";
var WEAPON_LABEL = "Weapon";
var RARITY_COMMON = "Common";
var RARITY_UNCOMMON = "Uncommon";
var RARITY_RARE = "Rare";
var RARITY_ULTRA = "Ultra Rare";
var RARITY_PROMO = "Promotional";
var ARMOR_REDUCTION_BRONZE = 15;
var ARMOR_REDUCTION_SILVER = 30;
var ARMOR_REDUCTION_GOLD = 50;
var MAX_WEAPON_LEVEL = 10;
var HSHOT_MULTIPLIER = 2.50;
var DOT_CEILING = 2.0;

var MOD_SELECTOR_KEY = "mod-selector-states";
var CARD_KEY_OFFSET = 64;
var ENCODING_DELIM = ",";

var SHIELD_IMG_URL = "http://imgboot.com/user/Creakazoid/images/shield18.png";
var BARRIER_IMG_URL = "http://imgboot.com/user/Creakazoid/images/barrier18.png";
var NARIDA_SITE = "http://narida.pytalhost.com/me3/classes/#**BAAAA@0@0AA@@";
var NARIDA_PLACEHOLDER = "**";
var ID_POWER_ONE = "globalPowerSelectorOne";
var ID_POWER_TWO = "globalPowerSelectorTwo";
var ID_POWER_PASSIVE = "globalPowerSelectorPassive";
var ID_MODAL_SHIELD = "modalShield";
var FILE_EXTRACT_REGEX = /([^\/]+)(?=\.\w+$)/;
var CHARACTER_LABEL = "Character";
var CONSUMABLE_LABEL = "Equipment";
var POWER_LABEL = "Powers";
var POWER_ICON_URL = "http://imgboot.com/images/Creakazoid/";
var DBOX_ICON_URL = "https://dl.dropbox.com/u/51901387/";
var KEY_TO_PROP = " Value";
var ROMAN_REGEX = /( |\+)(?:X(?:X(?:V(?:I(?:I?I)?)?|X(?:I(?:I?I)?)?|I(?:[VX]|I?I)?)?|V(?:I(?:I?I)?)?|I(?:[VX]|I?I)?)?|V(?:I(?:I?I)?)?|I(?:[VX]|I?I)?)($|(?=[\s]{0,}$))/;
var CONS_REGEX = /( |\+)(?:X(?:X(?:V(?:I(?:I?I)?)?|X(?:I(?:I?I)?)?|I(?:[VX]|I?I)?)?|V(?:I(?:I?I)?)?|I(?:[VX]|I?I)?)?|V(?:I(?:I?I)?)?|I(?:[VX]|I?I)?) - /gm;
var STYLESHEET = "https://dl.dropbox.com/u/51901387/manifesterstyle8u.css";
var PROJECTILE_WEAPONS = ["Graal", "Kishok", "Kishock", "Plasma Shotgun", "Falcon", "Striker", "Scorpion", "Krysae"];
var SEMIAUTOS = ["Phalanx", "Vindicator", "Mattock", "Falcon", "Hornet", "Saber"];
var GETH_WEAPONS = ["Javelin", "Geth"];
var AUTO_EXCEPTIONS = ["Indra", "Reegar"];
var CLEANUP_REGEX = /(\r\n|\n|\r)/gm;
var TRIM_REGEX = /[\s]+$/;
var TOTAL_TRIMMER = /(^[\s]+)|([\s]+$)/;
var EMPTY_LINE_REGEX = /^,{1,}$/;
var FILE_EXTRACT_REGEX = /([^\/]+)(?=\.\w+$)/;
var NON_NUMERIC_REGEX = /[^\d.]/;
var DRAW_SIZE = 8;
var WAIT_TIME = 50;

var CONFIG_DISP_MODE = "dispMode";
var CONFIG_CARD_MODE = "cardMode";
var CONFIG_HIDDEN_STATS = "hiddenStats";
var CONFIG_HIDDEN_OND = "showOnDemand";
var SETTING_DISP_LEFT = "left";
var SETTING_DISP_RIGHT = "right";
var SETTING_DISP_SPLIT_SOS = "sos";
var SETTING_DISP_SPLIT_SSO = "sso";
var SETTING_CARDS_SHOW = "show";
var SETTING_CARDS_HIDE = "hide";
var ENV_MONKEY = "Monkey Enabled (GM)";
var ENV_IEPRO = "IEPro";
var ENV_NATIVE = "Native";
var OPTION_BG = "rgb(34,34,34)";

var weaponCards = [];
var gearCards = [];
var charCards = [];
var modCards = [];
var consumableCards = [];

var loadCount = 0;
var weapons = data.weapons;
var gear = data.gear;
var mods = data.mods;
var powers = data.powers;
var consumables = data.consumables;
var characters = data.characters;
var properties = {};
var hiddenProps = [];
var selectedPowers = [[], [], []];

var modsByType = {};
var modsByCategory = {};
var randWeapon;
var gearSelector;
var ammoSelector;
var consumableSelector;
var powerSelector;
var powerTwoSelector;
var passiveSelector;
var clearAllPowers;

var formRoot = document.createElement("div");
var selectRoot = formRoot;
var isRendered = false;

var environment = ENV_NATIVE;
var MD_deleteValue = function(){};
var MD_setValue = function(){};
var MD_addStyle = function(){};
var MD_getValue = function(){};
var MD_listValues = function(){};
var MD_registerMenuCommand = function(){};
var isParsed = false;

resolveEnvironment();
initProperties();

MD_registerMenuCommand("Show/Hide On-Demand Viewer", toggleShowHideOnDemand, "D");

if(typeof MD_getValue(CONFIG_HIDDEN_OND) === "undefined")
	MD_setValue(CONFIG_HIDDEN_OND, "true");

if(navigator.userAgent.indexOf("Opera") === -1){
	isParsed = true;
	initFixedLocations();
	parseManifest();
}

window.onload = onLoadCompletion;
window.onbeforeunload = function(){
	persistCardSelectorStates(weaponCards);
};

function processDataCache(){
	for(var label in data){
		for(var key in data[label]){
			//data[label][key] = new Item(data[label][key]);
			data[label][key].__proto__ = Item.prototype;
		}
	}
}

function toggleShowHideOnDemand(){
	if(typeof MD_getValue(CONFIG_HIDDEN_OND) === "undefined" || MD_getValue(CONFIG_HIDDEN_OND) == "true"){
		MD_setValue(CONFIG_HIDDEN_OND, "false");
		
		if(formRoot && selectRoot){
			formRoot.style.display = "none";
			selectRoot.style.display = "none";
		}
	}
	else{
		MD_setValue(CONFIG_HIDDEN_OND, "true");
		
		if(formRoot && selectRoot){
			formRoot.style.display = "block";
			selectRoot.style.display = "block";
		}
	}
}

function PRO_listValues(){
	var results = [];
	var i = 0;
	var val = MD_getValue("hiddenprop" + i);
	
	while(val){
		results.push(val);
		i++;
		val = MD_getValue("hiddenprop" + i);
	}
	
	return results;
}

function resolveEnvironment(){
	if(typeof GM_setValue !== "undefined" && typeof GM_addStyle !== "undefined" && typeof GM_getValue !== "undefined"){
		environment = ENV_MONKEY;
		MD_setValue = GM_setValue;
		MD_deleteValue = GM_deleteValue;
		MD_addStyle = GM_addStyle;
		MD_getValue = GM_getValue;
		MD_listValues = GM_listValues;
		MD_registerMenuCommand = GM_registerMenuCommand;
	}
	else if(typeof PRO_setValue !== "undefined" && typeof PRO_addStyle !== "undefined" && typeof PRO_getValue !== "undefined"){
		environment = ENV_IEPRO;
		MD_setValue = PRO_setValue;
		MD_addStyle = PRO_addStyle;
		MD_getValue = PRO_getValue;
		MD_listValues = PRO_listValues;
		MD_registerMenuCommand = PRO_registerMenuCommand;
	}
	else
		environment = ENV_NATIVE;
		
	MD_addStyle(DetailerResources.style);
	Config.setValue = MD_setValue;
	Config.getValue = MD_getValue;
	Config.addStyle = MD_addStyle;
}

function MD_addListener(element, event, listener){
	if(environment === ENV_MONKEY){
		element.addEventListener(event, listener, false);
	}
	else if(environment === ENV_IEPRO){
		element.attachEvent(event, listener);
	}
}

function initFixedLocations(){
	formRoot.className = CLASS_FLOATING_DIV;
	formRoot.style.display = "none";
	document.body.appendChild(formRoot);
	
	var value = MD_getValue(CONFIG_DISP_MODE);
	
	if(!value || value === SETTING_DISP_LEFT){
		formRoot.className += " fixedLeft";
		
		if(!value)
			MD_setValue(CONFIG_DISP_MODE, SETTING_DISP_LEFT);
	}
	else if(value === SETTING_DISP_RIGHT)
		formRoot.className += " fixedRight";
	else{
		selectRoot = document.createElement("div");
		selectRoot.className = CLASS_FLOATING_DIV;
		document.body.appendChild(selectRoot);
		//selectRoot.style.display = "none";
		
		if(value === SETTING_DISP_SPLIT_SOS){
			formRoot.className += " fixedLeft";
			selectRoot.className += " fixedRight";
		}
		else{
			formRoot.className += " fixedRight";
			selectRoot.className += " fixedLeft";
		}
	}
	
	value = MD_getValue(CONFIG_CARD_MODE);
	if(!value || (value !== SETTING_CARDS_SHOW && value !== SETTING_CARDS_HIDE))
		MD_setValue(CONFIG_CARD_MODE, SETTING_CARDS_SHOW);
}

function onLoadCompletion(){
	if(!isParsed){
		initFixedLocations();
		parseManifest();
	}
	
	processDataCache();
	//integrateAddendum();
	
	var rehash = function(itemCache){
		var temp = {};
		
		for(var key in itemCache){
			if(itemCache[key].uid()){
				temp[itemCache[key].uid()] = itemCache[key];
			}
		}
		
		return temp;
	};
	
	/* weapons = rehash(weapons);
	gear = rehash(gear);
	mods = rehash(mods);
	consumables = rehash(consumables);
	characters = rehash(characters); */
	
	
	var gmprops = MD_listValues();
	var erasure = [];
	gmprops.forEach(function(prop){
		if(prop.indexOf("hiddenprop") === 0 ){
			hiddenProps.push(MD_getValue(prop));
			//MD_deleteValue(prop);
		}
	});
	
	resolveItemsToEntries(weaponCards, weapons);
	resolveItemsToEntries(gearCards, gear);
	resolveItemsToEntries(consumableCards, consumables);
	resolveItemsToEntries(charCards, characters);
	resolveItemsToEntries(modCards, mods);
	
	initClearAllSelector(initGlobalSelectors());
	
	if(MD_getValue(CONFIG_CARD_MODE) === SETTING_CARDS_SHOW)
		renderAll();
	
	initRandomViewers();
	
	//createDataCache();
}

function renderAll(){
	if(!isRendered){
		renderCards(modCards);
		renderCards(gearCards);
		renderCards(weaponCards);
		renderCards(charCards);
		renderConsumables(consumableCards);
		loadSelectedMods(weaponCards);
		isRendered = true;
	}
}

function initProperties(){
	var makeProperty = function(id, itemType, unit, interpreter, showLabel, isDerived){
		var derived = typeof isDerived === "undefined" ? false : isDerived;
		properties[id] = new Property(id, itemType, interpreter, unit, showLabel, derived);
	};
	
	var createIncrementalDisplay = function(propName, currentValue, increment){
		var element = document.createElement("div");
		var span = document.createElement("span");
		span.className = SPAN_VAL_TEXT;
		span.innerHTML = currentValue + "  ";
		element.appendChild(span);
		
		var wrapper = document.createElement("a");
		wrapper.setAttribute(ATTR_HOVER_TITLE, propName + " Change Per Level");
		wrapper.className = CLASS_POWER_TOOLTIP + " " + SPAN_INCREMENT;
		wrapper.onclick = function(){return false};
		wrapper.href = document.location;
		wrapper.innerHTML += "(" + increment + " ";
		element.appendChild(wrapper);
		
		span = document.createElement("img");
		span.title = "";
		span.width = 12;
		span.height = 12;
		
		if(increment > 0)
			span.src = DetailerResources.up;
		else
			span.src = DetailerResources.down;
		
		wrapper.appendChild(span);
		wrapper.innerHTML += ")";
		return element;
	};
	
	makeProperty(PROP_DMG, WEAPON_LABEL, null, function(manifestEntry, element, mods){
		var retVal;
		var dmg = calcDamage(manifestEntry, manifestEntry.level, mods);	
		manifestEntry.cacheValue(PROP_DMG, dmg);
		dmg = Math.round(dmg);

		if(manifestEntry.level == MAX_WEAPON_LEVEL)
			retVal = dmg;
		else{
			var nextDmg = calcDamage(manifestEntry, manifestEntry.level + 1, mods);
			var increment = nextDmg - dmg;
			retVal = createIncrementalDisplay(PROP_DMG, dmg, increment.toFixed(1));
		}
		
		if(element){
			if(retVal instanceof Element){
				element.innerHTML = "";
				element.appendChild(retVal);
			}
			else
				element.innerHTML = retVal;
		}
		
		return retVal;
	});
	
	makeProperty(PROP_DMG_UNCHARGED, WEAPON_LABEL, null, function(manifestEntry, element, mods){			
		var retVal;
		var uncharged = calcDamage(manifestEntry, manifestEntry.level, mods, true);
		
		manifestEntry.cacheValue(PROP_DMG_UNCHARGED, uncharged);
		uncharged = Math.round(uncharged);
		
		if(!isCharged(manifestEntry.item) || manifestEntry.item.getAttribute(EXT_CHARGE_REQUIRED))
			return;
		
		if(manifestEntry.level == MAX_WEAPON_LEVEL)
			retVal = uncharged;
		else{
			var next = calcDamage(manifestEntry, manifestEntry.level + 1, mods, true);
			var increment = next - uncharged;
			retVal = createIncrementalDisplay(PROP_DMG_UNCHARGED, uncharged, increment.toFixed(1));
		}
		
		if(element){
			if(retVal instanceof Element){
				element.innerHTML = "";
				element.appendChild(retVal);
			}
			else
				element.innerHTML = retVal;
		}
		
		return retVal;
	});
		
	makeProperty(PROP_DMG_HEADSHOT, WEAPON_LABEL, null, function(manifestEntry, element, mods){
		if(manifestEntry.item.name.indexOf("Krysae") !== -1 || manifestEntry.item.name.indexOf("Plasma Shotgun") !== -1)
			return;
			
		var retVal;
		var dmg = calcDamage(manifestEntry, manifestEntry.level, mods, false, true);
		var dmgStr = dmg.toFixed(0);
		var dot = sumModifiers(EXT_DOT, mods);
		
		if(manifestEntry.level == MAX_WEAPON_LEVEL || dot > 0){
			retVal = dmgStr;
			
			if(dot > 0)
				retVal += " (+" + (dot * dmg).toFixed(0) + ")";
		}
		else{
			var nextDmg = calcDamage(manifestEntry, manifestEntry.level + 1, mods, false, true);
			var increment = nextDmg - dmg;
			retVal = createIncrementalDisplay(PROP_DMG_HEADSHOT, dmgStr, increment.toFixed(1));
		}
		
		if(element){
			if(retVal instanceof Element){
				element.innerHTML = "";
				element.appendChild(retVal);
			}
			else
				element.innerHTML = retVal;
		}
		
		return retVal;
	});
	
	makeProperty(PROP_CAPACITY, WEAPON_LABEL, null, function(manifestEntry, element, mods){
		var capStr = manifestEntry.item.getAttribute(EXT_CAPACITY);
		var capI = extractValue(capStr, true);
		var capX = extractValue(capStr, false);
		var multiplier = 1.0 + sumModifiers(EXT_CAPACITY, mods);
		var cap = Math.floor(Math.floor(linearlyInterpolate(capI, capX, MAX_WEAPON_LEVEL, manifestEntry.level)) * multiplier);
		var capNext = Math.floor(Math.floor(linearlyInterpolate(capI, capX, MAX_WEAPON_LEVEL, manifestEntry.level + 1)) * multiplier);
		var increment = (capNext - cap);
		var retVal = null;
		
		manifestEntry.cacheValue(PROP_CAPACITY, cap);
		
		if(manifestEntry.level == MAX_WEAPON_LEVEL || increment === 0)
			retVal = cap.toFixed(0);
		else
			retVal = createIncrementalDisplay(PROP_CAPACITY, cap.toFixed(0), increment.toFixed(0));
			
		if(element){
			if(retVal instanceof Element){
				element.innerHTML = "";
				element.appendChild(retVal);
			}
			else
				element.innerHTML = retVal;
		}
			
		return retVal;
	});
	
	makeProperty(PROP_WEIGHT, WEAPON_LABEL, null, function(manifestEntry, element, mods){
		var weightI = manifestEntry.item.getAttribute(EXT_WEIGHT_I);
		var weightX = manifestEntry.item.getAttribute(EXT_WEIGHT_X);
		var multiplier = sumModifiers(PROP_WEIGHT, mods);
		var addend = sumModifiers(PROP_WEIGHT, mods, true);
		multiplier = multiplier <= 0 ? 1.0 + multiplier : 1.0 - multiplier;
		multiplier = multiplier < 0 ? 0 : multiplier;
		var weight = linearlyInterpolate(weightI, weightX, MAX_WEAPON_LEVEL, manifestEntry.level) * multiplier + addend;
		var weightNext = linearlyInterpolate(weightI, weightX, MAX_WEAPON_LEVEL, manifestEntry.level + 1) * multiplier + addend;
		var increment = weightNext - weight;
		var retVal = null;
		
		manifestEntry.cacheValue(PROP_WEIGHT, weight);
		
		if(manifestEntry.level == MAX_WEAPON_LEVEL)
			retVal = weight.toFixed(2);
		else
			retVal = createIncrementalDisplay(PROP_WEIGHT, weight.toFixed(2), increment.toFixed(2));
			
		if(element){
			if(retVal instanceof Element){
				element.innerHTML = "";
				element.appendChild(retVal);
			}
			else
				element.innerHTML = retVal;
		}
		
		return retVal;
	});
	
	makeProperty(PROP_MAG_SIZE, WEAPON_LABEL, null, function(manifestEntry, element, mods){
		var mag = parseInt(manifestEntry.item.getAttribute(EXT_MAG_SIZE));
		var high = manifestEntry.item.getAttribute(EXT_MAG_SIZE_X) ? parseInt(manifestEntry.item.getAttribute(EXT_MAG_SIZE_X)) : 0;
		mag = high > 0 ? linearlyInterpolate(mag, high, MAX_WEAPON_LEVEL, manifestEntry.level) : mag;
		var multiplier = 1.0 + sumModifiers(EXT_MAG_SIZE, mods) + sumModifiers(PROP_MAG_SIZE, mods);
		mag = Math.floor(mag * multiplier);
		manifestEntry.cacheValue(PROP_MAG_SIZE, mag);
		
		multiplier = sumModifiers(EXT_ZERO_COST, mods);
		var effectiveMag = multiplier > 0 ? Math.floor(mag + Math.abs(mag * Math.log(multiplier))) : mag;
		manifestEntry.cacheValue(PROP_EFFECTIVE_MAG, effectiveMag);

		if(element)
			element.innerHTML = mag.toString();
			
		return mag.toString();
	});
	
	makeProperty(PROP_ROF, WEAPON_LABEL, "RPM", EXT_ROF);
	
	makeProperty(PROP_ACCURACY, WEAPON_LABEL, null, function(manifestEntry, element, mods){
		var acc = manifestEntry.item.getAttribute(EXT_ACCURACY);
		var multiplier = sumModifiers(PROP_ACCURACY, mods);
		multiplier = multiplier >= 0 ? 1.0 + multiplier: 1.0/(1.0 - multiplier);
		
		acc = acc * multiplier;
		manifestEntry.cacheValue(PROP_ACCURACY, acc);
		acc = acc.toFixed(1);
		
		if(element)
			element.innerHTML = acc;
		
		return acc;
	});
	
	makeProperty(PROP_DPS_BURST, WEAPON_LABEL, null, calcBurstDPS, true, true);
	makeProperty(PROP_DPS_SUSTAINED, WEAPON_LABEL, null, calcSustainedDPS, true, true);
	makeProperty(PROP_DPS_CANCELLED, WEAPON_LABEL, null, calcCancelledDPS, true, true);
	
	makeProperty(PROP_INCENDIARY_DOT, WEAPON_LABEL, null, function(entry, element, mods){
		var mult = sumModifiers(EXT_DOT, mods);
		var maxStack = 0;
		var dmg = 0;
		var dot = 0;
		
		if(mult > 0){
			dmg = calcDamage(entry, entry.level, mods);
			dot = dmg * mult;
			maxStack = DOT_CEILING / mult;
		}
		
		entry.cacheValue(PROP_DOT_MAX_STACK, maxStack);
		entry.cacheValue(PROP_INCENDIARY_DOT, dot);
		entry.cacheValue(PROP_DOT_MULT, mult);
	
		if(element){
			element.innerHTML = dot.toFixed(1);
			
			if(mult === 0)
				element.parentElement.style.display = "none";
			else
				element.parentElement.style.display = "table-row";
		}
		
		return dmg.toFixed(1);
	});
	
	makeProperty(PROP_DMG_SPECIAL, WEAPON_LABEL, null, function(entry, element, mods){
		var dvs = calcSpecialDamage(entry, mods, true);
		var dvb = calcSpecialDamage(entry, mods, false);
		var display = createShieldBarrierDisplay(dvs, dvb);
		var orig = entry.getCachedValue(PROP_DMG);
		var isHide = (dvs.toFixed(0) === orig.toFixed(0) && dvb.toFixed(0) === orig.toFixed(0));
		
		if(element){
			element.innerHTML = "";
			element.appendChild(display);
			
			if(isHide)
				element.parentElement.style.display = "none";
			else
				element.parentElement.style.display = "table-row";
		}
		
		if(isHide)
			display.style.display = "none";	
		else
			display.style.display = "inline";
			
		return display;
	}, true, true);
	
	makeProperty(PROP_DVA, WEAPON_LABEL, null, calcDamageAgainstArmor); 
	
	makeProperty(PROP_SDPSVA, WEAPON_LABEL, null, calcSDPSVA, true, true);
	
	makeProperty(PROP_CDPSVA, WEAPON_LABEL, null, function(entry, elem, mods){
		return calcSDPSVA(entry, elem, mods, true)}, true, true);
	
	makeProperty(PROP_RELOAD_TIME, WEAPON_LABEL, "s", EXT_RELOAD_TIME);
	makeProperty(PROP_RECOIL, WEAPON_LABEL, null, EXT_RECOIL);
	
	makeProperty(PROP_PENETRATION, WEAPON_LABEL, "m", function(manifestEntry, element, mods){
		var pen = manifestEntry.item.getAttribute(EXT_PENETRATION) ? manifestEntry.item.getAttribute(EXT_PENETRATION) : 0;
		
		if(!isProjectileWeapon(manifestEntry.item)){
			pen = (pen && parseFloat(pen)) ? parseFloat(pen) / 100: 0.0;
			var modded = sumModifiers(PROP_PENETRATION, mods);
			pen = (pen + modded) >= 0 ? pen + modded : 0.0;
			var num = pen;
			pen = pen.toFixed(2);
			
			if(element){
				element.innerHTML = pen;
				
				if(num == 0)
					element.parentElement.style.display = "none";
				else
					element.parentElement.style.display = "table-row";
			}
				
			return pen;
		}
		else
			return;
	});
	
	//makeProperty(PROP_PROJECTILE_COUNT, WEAPON_LABEL, null, EXT_PROJECTILE_COUNT);
	
	makeProperty(PROP_EFFECTS, GEAR_LABEL, null, function(manifestEntry){
		var effects = manifestEntry.item.getAttribute(EXT_EFFECTS);
		return effects;
	}, false);
	
	makeProperty(PROP_CONS_I, CONSUMABLE_LABEL, null, function(manifestEntry){
		var effects = manifestEntry.item.getAttribute(EXT_EFFECTS_I);
		return effects;
	}, false);
	
	makeProperty(PROP_CONS_II, CONSUMABLE_LABEL, null, function(manifestEntry){
		var effects = manifestEntry.item.getAttribute(EXT_EFFECTS_II);
		return effects;
	}, false);
	
	makeProperty(PROP_CONS_III, CONSUMABLE_LABEL, null, function(manifestEntry){
		var effects = manifestEntry.item.getAttribute(EXT_EFFECTS_III);
		return effects;
	}, false);
	
	makeProperty(PROP_CONS_IV, CONSUMABLE_LABEL, null, function(manifestEntry){
		var effects = manifestEntry.item.getAttribute(EXT_EFFECTS_IV);
		return effects;
	}, false);
	
	makeProperty(PROP_POWERS, CHARACTER_LABEL, null, function(manifestEntry){
		var table = document.createElement("table");	
		table.className = CLASS_POWER_KIT;
		var tableBody = document.createElement("tbody");
		var row = document.createElement("tr");
		tableBody.appendChild(row);
		table.appendChild(tableBody);
		
		var imgFiles = manifestEntry.item.getAttribute(EXT_POWER_ICONS);
		var powers = manifestEntry.item.getAttribute(EXT_POWERS);
		var col;
		var element;
		var tooltip;

		imgFiles.forEach(function(imgFile, index){
			col = document.createElement("td");
			element = document.createElement("img");
			element.src = DBOX_ICON_URL + imgFile.toLowerCase();
			element.style.width = "100%";
			element.style.height = "100%";
			
			tooltip = document.createElement("a");
			tooltip.className = CLASS_POWER_TOOLTIP;
			tooltip.setAttribute(ATTR_HOVER_TITLE, powers[index]);
			tooltip.onclick = function(){return false};
			tooltip.appendChild(element);
			
			col.appendChild(tooltip);
			row.appendChild(col);
		});
		
		linkifyCharacterPortrait(manifestEntry);
		return table;
	}, false);
	
	makeProperty(PROP_HP, CHARACTER_LABEL, null, EXT_HP);
	makeProperty(PROP_SHIELDS, CHARACTER_LABEL, null, EXT_SHIELDS);
	makeProperty(PROP_MELEE, CHARACTER_LABEL, null, EXT_MELEE);
	makeProperty(PROP_MELEE_HVY, CHARACTER_LABEL, null, EXT_MELEE_HVY);
	
	makeProperty(PROP_ENCUM, CHARACTER_LABEL, null, function(manifestEntry){
		return (parseFloat(manifestEntry.item.getAttribute(EXT_ENCUM)) * 100).toFixed(0) + "%";
	});
	
	makeProperty(PROP_MOD_CATEGORY, MODS_LABEL, null, function(manifestEntry){
		return manifestEntry.item.getAttribute(EXT_MOD_CATEGORY);
	});
	
	makeProperty(PROP_MOD_EFFECTS, MODS_LABEL, null, function(manifestEntry){
			return makeModEffectTable(manifestEntry.item);
	}, false);
}

function makeModEffectTable(item){
	var table = document.createElement("table");
	var tableBody = document.createElement("tbody");
	table.className = CLASS_MOD_EFFECTS;
	table.appendChild(tableBody);
	
	var modifiers = item.getAttribute(EXT_MODIFIERS);
	var row;
	var col;
	var number;
	var unit;

	for(var key in modifiers){
		row = document.createElement("tr");
		col = document.createElement("td");
		row.appendChild(col);
		col.innerHTML = key;

		col = document.createElement("td");
		unit = modifiers[key].unit ? modifiers[key].unit : "%";
		number = parseFloat(modifiers[key].value) * (unit === "%" ? 100 : 1);
		col.innerHTML = (number > 0 ? "+" : "") + number.toFixed(unit === "%" ? 0 : 2) + 
			(unit !== "+" ? unit : "");
		row.appendChild(col);
		tableBody.appendChild(row);
	}
	
	return table;
}

function initRandomViewers(){
	var extractElement = function(id){
		var ele = document.getElementById(id);
		ele = ele.firstChild;
	
		return ele;
	};
	
	var weaponSelected = function(key, level){
		var entry = new ManifestEntry(key, weapons[key].name);
		entry.level = level;
		entry.item = weapons[key];
		return entry;
	};
	
	var gearSelected = function(key){
		var entry = new ManifestEntry(key, gear[key].name);
		entry.level = 1;
		entry.item = gear[key];
		return entry;
	};
	
	var modSelected = function(key){
		var entry = new ManifestEntry(key, mods[key].name);
		
		if(entry){
			entry.level = 1;
			entry.item = mods[key];
		}
		
		return entry;
	};
	
	randWeapon = new RandomViewer(extractElement("weapons"), "Weapons", WEAPON_LABEL, weapons, MAX_WEAPON_LEVEL, weaponSelected);
	new RandomViewer(extractElement("gear"), "Gear", GEAR_LABEL, gear, -1, gearSelected, false);
	new RandomViewer(extractElement("weapon_mods"), "Mods", MODS_LABEL, mods, -1, modSelected, false);
}

function clearAllSelectedMods(){
	var selectors = document.getElementsByClassName(CLASS_MOD_SELECT);
	gearSelector.options[0].selected = true;
	consumableSelector.options[0].selected = true;
	ammoSelector.options[0].selected = true;
	
	clearAllPowers();
	
	weaponCards.forEach(function(card){
		if(card.formCache){
			card.formCache.forEach(function(select){
				select.options[0].selected = true;
				select.onchange();
			});
		}
	});
}

function linkifyCharacterPortrait(manifestEntry){
	if(manifestEntry.image && manifestEntry.item.getAttribute(EXT_NARIDA_HASH)){
		var link = document.createElement("a");
		var copy = manifestEntry.image.cloneNode(true);
		link.target = "_blank";
		link.className = CLASS_CHAR_LINK;
		
		link.setAttribute(ATTR_HOVER_TITLE, "Build in Narida's Character Builder");
		link.href = NARIDA_SITE.replace(NARIDA_PLACEHOLDER, manifestEntry.item.getAttribute(EXT_NARIDA_HASH));
		link.appendChild(copy);
		manifestEntry.image.parentNode.replaceChild(link, manifestEntry.image);
		manifestEntry.image = copy;
		
	}
}

function decorateWeaponImage(manifestEntry){
	if(manifestEntry.image && manifestEntry.item.getAttribute(EXT_DESCRIPTION)){
		var link = document.createElement("a");
		var copy = manifestEntry.image.cloneNode(true);
		link.target = "_blank";
		link.className += " weaponTooltip";
		link.setAttribute(ATTR_HOVER_TITLE, manifestEntry.item.getAttribute(EXT_DESCRIPTION));
		link.onclick = function(){return false};
		link.appendChild(copy);
		manifestEntry.image.parentNode.replaceChild(link, manifestEntry.image);
		manifestEntry.image = copy;
	}
}

function initGlobalSelectors(){
	var div = document.createElement("div");
	var table = document.createElement("table");
	var tbody = document.createElement("tbody");
	div.appendChild(table);
	div.className = CLASS_MOD_SELECT + " " + "globalSelectorStyle";
	table.appendChild(tbody);
	
	gearSelector = document.createElement("select");
	consumableSelector = document.createElement("select");
	ammoSelector = document.createElement("select");
	
	var create = function(selector, text){
		var row = document.createElement("tr");
		var col = document.createElement("td");
		var label = document.createElement("span");
		label.innerHTML = text;
		
		row.appendChild(col);
		col.appendChild(label);
		
		col = document.createElement("td");
		col.appendChild(selector);
		row.appendChild(col);
		tbody.appendChild(row);
	};
	
	var createOption = function(value, label, selector){
		var single = document.createElement("option");
		single.value = value;
		single.innerHTML = label;
		single.style.background = OPTION_BG;
		selector.appendChild(single);
	};
	
	create(gearSelector, "Gear: ");
	create(consumableSelector, "Amps: ");
	create(ammoSelector, "Ammo: ");
	selectRoot.appendChild(div);
	
	var temp;
	var option;
	createOption(-1, "-", gearSelector);
	
	gearCards.forEach(function(gear){
		if(gear.level > 0 && gear.item.getAttribute(EXT_MODIFIERS)){
			createOption(gear.item.uid(), gear.name, gearSelector);
		}
	});

	createOption(-1, "-", consumableSelector);
	createOption(-1, "-", ammoSelector);
	
	var processConsumable = function(item, label, selector){
		if(item.getAttribute(EXT_EFFECTS_I)){
			createOption(item.uid() + " I", label + " I", selector);
		}
		if(item.getAttribute(EXT_EFFECTS_II)){
			createOption(item.uid() + " II", label + " II", selector);
		}
		if(item.getAttribute(EXT_EFFECTS_III)){
			createOption(item.uid() + " III", label + " III", selector);
		}
		if(item.getAttribute(EXT_EFFECTS_IV)){
			createOption(item.uid() + " IV", label + " IV", selector);
		}
	};
	
	consumableCards.forEach(function(card){
		if(card.item.getAttribute(EXT_MODIFIERS)){
			if(card.uid.indexOf("AmmoPower") === -1)
				processConsumable(card.item, card.name, consumableSelector);
			else
				processConsumable(card.item, card.name, ammoSelector);
				
				//unsafeWindow.console.log(card.name);
		}
	});
	
	initPowerSelectors(tbody);
	
	return tbody;
}

function initPowerSelectors(root){
	var allLinks = [];
	var allStrs = [];
	var row = document.createElement("tr");
	var shield = document.createElement("div");
	shield.className = "powerBlanket";
	shield.id = ID_MODAL_SHIELD;
	document.body.appendChild(shield);
	
	var col = document.createElement("td");
	col.innerHTML = "Powers: ";
	row.appendChild(col);
	col = document.createElement("td");
	row.appendChild(col);
	
	var createSimpleDisplay = function(id, slot, arrIndex, emptyStr){
		var link = document.createElement("span");
		var floater = createSinglePowerSelector(id, slot, link, arrIndex, emptyStr);
		
		link.innerHTML = emptyStr;
		link.id = arrIndex;
		link.className = "selectedPowerElement";
		allLinks.push(link);
		allStrs.push(emptyStr);
		
		(function(floater){
			link.onclick = function(){
				shield.style.display = "block";
				floater.style.display = "block";
				
				if(selectedPowers[0].length === 0 && selectedPowers[1].length === 0 && selectedPowers[2].length === 0){
					var temp  = floater.getElementsByTagName("select")[0];
					temp.selectedIndex = 0;
					temp.onchange();
				}
			};
		})(floater);
		
		document.body.appendChild(floater);
		col.appendChild(link);
		return floater;
	};
	
	powerSelector = createSimpleDisplay(ID_POWER_ONE, 1, 0, "Select Power");
	var separator = document.createElement("span");
	separator.innerHTML = " , ";
	col.appendChild(separator);
	powerTwoSelector = createSimpleDisplay(ID_POWER_TWO, 1, 1, "Select Power");
	var separator = document.createElement("span");
	separator.innerHTML = "<br />";
	col.appendChild(separator);
	passiveSelector = createSimpleDisplay(ID_POWER_PASSIVE, 3, 2, "Select Passive");
	
	clearAllPowers = function(){
		selectedPowers = [[], [], []];
		
		allLinks.forEach(function(link, i){
			link.innerHTML = allStrs[i];
		});
		
		if(randWeapon && randWeapon.entry)
			randWeapon.entry.listener.onSelectorChange();
	};
	
	root.appendChild(row);
}

function createSinglePowerSelector(id, powerSlot, labelElement, arrIndex, emptyStr){
	var div = document.createElement("div");
	div.className = "powerSelector";
	div.id = id;
	var dispArea = document.createElement("div");
	dispArea.className = "powerSelectorDisplay";
	
	var allRadios = [];
	var closeLink = document.createElement("button");
	closeLink.className = "powerSelectorCloser";
	closeLink.innerHTML = "Close";
	
	(function(emptyStr){
		closeLink.onclick = function(){
			//fire mod selection events
			weaponCards.forEach(function(card){
				card.listener.onSelectorChange();
			});
			
			if(randWeapon && randWeapon.entry){
				randWeapon.entry.listener.onSelectorChange();
			}
			
			labelElement.innerHTML = selectedPowers[arrIndex].length > 0 ? 
					selectedPowers[arrIndex][0].getAttribute("Power") : emptyStr;
	
			document.getElementById(ID_MODAL_SHIELD).style.display = "none";
			div.style.display = "none";
		};
	})(emptyStr);
	
	var onRadioSelection = (function(arrIndex){ 
		return function(){
			var newSel = [];
			
			allRadios.forEach(function(radio){
			
				if(radio.checked){
					newSel.push(powers[radio.value]);
				}
			});
			
			selectedPowers[arrIndex] = newSel;
		}
	})(arrIndex);
	
	var createRadioButton = function(level, value){
		var radio = document.createElement("input");
		radio.type = "radio";
		radio.value = value;
		radio.name = level;
		radio.id = value;
		radio.onclick = onRadioSelection;
		return radio;
	};
	
	var initEvoDisplay = function(power){
		var evos = [];
		var table = document.createElement("table");
		var tbody = document.createElement("tbody");
		dispArea.appendChild(table);
		table.appendChild(tbody);
		
		for(var key in powers){
			if(powers[key].getAttribute("Power") === power){
				var evoLevel = powers[key].getAttribute("Evo Level");
				
				if(evos[evoLevel])
					evos[evoLevel].push(powers[key]);
				else
					evos[evoLevel] = [powers[key]];
			}
		}
		
		var createTooltip = function(content, parent){
			var ttip = document.createElement("div");
			ttip.className = "powerSelectorTooltip";
			ttip.appendChild(content);
			parent.appendChild(ttip);
			ttip.style.display = "none";
			
			(function(ttip){
				parent.onmouseover = function(){
					ttip.style.display = "block";
				};
				
				parent.onmouseout = function(){
					ttip.style.display = "none";
				};
			})(ttip);		
		};
		
		evos.forEach(function(evoList, level){
			if(evoList){
				var row = document.createElement("tr");
				var col = document.createElement("td");
				var form = document.createElement("form");
				var wrapper;
				
				row.appendChild(col);
				col.innerHTML = (level !== 1 ? "Level " + level : "Shared") + ": ";
				
				col = document.createElement("td");
				row.appendChild(col);
				col.appendChild(form);
				tbody.appendChild(row); 
				
				evoList.forEach(function(evo){
					var radio = createRadioButton(level, evo.uid());
					var label = document.createElement("label");
					wrapper = document.createElement("div");
					wrapper.className = "powerSelectorRadioDisplay";
					
					wrapper.appendChild(radio);
					label.innerHTML = evo.getAttribute("Evo Name") + " ";
					label.htmlFor = evo.uid();
					wrapper.appendChild(label);
					createTooltip(makeModEffectTable(evo), wrapper);
					
					form.appendChild(wrapper);
					allRadios.push(radio);
				});
				
				wrapper = document.createElement("div");
				wrapper.className = "powerSelectorRadioDisplay";
				wrapper.appendChild(createRadioButton(level, "none" + level));
				var label = document.createElement("label");
				label.htmlFor = "none" + level;
				label.innerHTML = "None";
				wrapper.appendChild(label);
				form.appendChild(wrapper);
			}
		});
	};
	
	var createPowerSection = function(slot){
		var added = [];
		var select = document.createElement("select");
		div.appendChild(select);
		div.appendChild(closeLink);
		var opt = document.createElement("option");
		opt.value = "0";
		opt.innerHTML = "-";
		select.appendChild(opt);
		
		for(var key in powers){
			if(added.indexOf(powers[key].getAttribute("Power")) === -1 && powers[key].getAttribute("Slot") == slot)
				added.push(powers[key].getAttribute("Power"));
		}
		
		added.sort();
		added.forEach(function(power){
			opt = document.createElement("option");
			opt.style.background = OPTION_BG;
			opt.value = power;
			opt.innerHTML = opt.value;
			select.appendChild(opt);
		});
		
		select.onchange = function(){
			dispArea.innerHTML = "";
			allRadios = [];
			selectedPowers[arrIndex] = [];
			
			if(select.selectedIndex > 0){
				initEvoDisplay(select.options[select.selectedIndex].value);
			}
		};
	};
	
	createPowerSection(powerSlot);
	div.appendChild(dispArea);
	return div;
}

function resolveSelectedPower(element){
	if(element.id === ID_POWER_ONE)
		return selectedPowers[0];
	else if(element.id === ID_POWER_TWO)
		return selectedPowers[1];
	else
		return selectedPowers[2];
}

function resolveSelectedConsumable(select){
	var selected;
	
	if(select.selectedIndex > 0){
		var label = select.options[select.selectedIndex].value;
		var base = consumables[label.replace(ROMAN_REGEX, "")];
		var level = label.match(ROMAN_REGEX)[0];
		var index = 0;
		
		if(level === " II")
			index = 1;
		else if(level === " III")
			index = 2;
		else if(level === " IV")
			index = 3;
			
		var trimmed = {};
		var modifiers = base.getAttribute(EXT_MODIFIERS);
		
		for(var key in modifiers){
			if(modifiers[key].value instanceof Array && modifiers[key].value[index]){
				trimmed[key] = {"key": key, "value": modifiers[key].value[index]};
			}
			else if(!modifiers[key].value instanceof Array)
				trimmed[key] = modifiers[key];
		}
		
		selected = { //create a pseudo-item
			"name": label,
			"getAttribute": function(attr){
				if(attr === EXT_MODIFIERS)
					return trimmed;
				else
					return base.getAttribute(attr);
			}
		};
	}
	
	return selected;
}

function resolveSelectedGear(select){
	var selected;
	
	if(select.selectedIndex >= 0){
		var label = select.options[select.selectedIndex].value;
		selected = gear[label];
	}
	
	return selected;
}

function initTable(entry, customClass){
	var table = document.createElement("table");
	resolveRarityRendering(entry, table);		
	
	var tableBody = document.createElement("tbody");
	var div = document.createElement("div");
	div.className = typeof customClass === "undefined" ? DIV_DETAILS : DIV_DETAILS + " " + customClass;
	div.appendChild(table);
	table.appendChild(tableBody);
	entry.element.appendChild(div);
	entry.table = div;
	return tableBody;
}

function createModSelectors(entry, parentElement, listener, resolver){
	var weapon = entry.item;
	var type = weapon.getAttribute(FLAG_WEAPON_TYPE);
	var mods = modsByType[type];
	
	if(!mods){
		mods = [];
		
		modCards.forEach(function(card){
			if(card.item.getAttribute(EXT_WEAPON_TYPE) === type)
				mods.push(card.item);
		});

		modsByType[type] = mods;
	}
	
	var createSelector = function(){
		var tbody = document.createElement("tbody");
		var table = document.createElement("table");
		var row = document.createElement("tr");
		var col = document.createElement("td");
		table.appendChild(tbody);
		tbody.appendChild(row);
		row.appendChild(col);
		
		var label = document.createElement("span");
		label.innerHTML = "Mod: ";
		table.className = CLASS_MOD_SELECT;
		col.appendChild(label);
		col.className = "demandSide";
		var element = document.createElement("select");
		var option = document.createElement("option");
		option.style.background = OPTION_BG;
		option.value = -1;
		option.innerHTML = "-";
		element.appendChild(option);
		
		col = document.createElement("td");
		col.className = "demandMain";
		row.appendChild(col);
		col.appendChild(element);
		
		mods.forEach(function(mod, index){
			option = document.createElement("option");
			option.style.background = OPTION_BG;
			option.value = index;
			option.innerHTML = mod.name.replace(type + " ", "");
			element.appendChild(option);
		});
		
		parentElement.appendChild(table);
		return element;
	};
		
	var one = createSelector();
	var two = createSelector();
	var changeFunc = function(one, two){return function(){listener(one, two);};}(one, two);
	
	one.onchange = changeFunc;
	two.onchange = changeFunc;
	
	entry.formCache = [one, two];
	entry.listener.addSelector(one, resolver, false);
	entry.listener.addSelector(two, resolver, false);
	entry.listener.addSelector(gearSelector, resolveSelectedGear, true);
	entry.listener.addSelector(consumableSelector, resolveSelectedConsumable, true);
	entry.listener.addSelector(ammoSelector, resolveSelectedConsumable, true);
	entry.listener.addSelector(powerSelector, resolveSelectedPower, false);
	entry.listener.addSelector(powerTwoSelector, resolveSelectedPower, false);
	entry.listener.addSelector(passiveSelector, resolveSelectedPower, false);
}

function disableByCategory(category, wepType, modSelector){
	var bucket = modsByType[wepType];
	
	bucket.forEach(function(mod, index){
		if(mod.getAttribute(EXT_MOD_CATEGORY) && mod.getAttribute(EXT_MOD_CATEGORY) === category
			&& mod.name.indexOf("Materials") === -1 && index + 1 < modSelector.options.length){
			modSelector.options[index + 1].disabled = true;
		}
	});
}

function indexOfOption(modVal, select){
	var index = -1;
		
	for(var i = 0; i < select.options.length; i++){
		if(select.options[i].value === modVal)
			index = i;
		
		select.options[i].disabled = false;
	}
	
	return index;
}

function renderCards(entries, customClass){
	var propVals = null;
	
	var weaponModListener = function(first, second, manifestEntry){
		var weaponType = manifestEntry.item.getAttribute(FLAG_WEAPON_TYPE);
		var firstVal;
		var secondVal;
		var firstMod;
		var secondMod;
		var index;
		
		enableAll(second);
		enableAll(first);		
		
		if(first.options[first.selectedIndex].value != -1){
			firstVal = first.options[first.selectedIndex].value;
			firstMod = weaponModResolver(first, manifestEntry);
			index = indexOfOption(firstVal, second);
			
			if(firstMod.getAttribute(EXT_MOD_CATEGORY))
				disableByCategory(firstMod.getAttribute(EXT_MOD_CATEGORY), weaponType, second);
			
			if(index != -1)
				second.options[index].disabled = true;
				
			//firstVal = modsByType[weaponType][firstVal];
		}
		if(second.options[second.selectedIndex].value != -1){
			secondVal = second.options[second.selectedIndex].value;
			secondMod = weaponModResolver(second, manifestEntry);
			index = indexOfOption(secondVal, first);
			
			if(secondMod.getAttribute(EXT_MOD_CATEGORY))
				disableByCategory(secondMod.getAttribute(EXT_MOD_CATEGORY), weaponType, first);
			
			if(index != -1)
				first.options[index].disabled = true;
				
			//secondVal = modsByType[weaponType][secondVal];
		}
		
		manifestEntry.listener.onSelectorChange();
	};
	
	var weaponModResolver = function(select, entry){
		var weaponType = entry.item.getAttribute(FLAG_WEAPON_TYPE);
		var index = select.options[select.selectedIndex].value;
		return modsByType[weaponType][index];
	};
	
	var enableAll = function(selector){
		for(var i = 0; i < selector.options.length; i++){
			selector.options[i].disabled = false;
		}
	};
			
	var i = 0;
	
	var process = function(){
		for(; i < entries.length; i++){
			var entry = entries[i];
			
			if(entry.level > 0){
				var tableBody = initTable(entry, customClass);
				
				if(entry.item.type === WEAPON_LABEL){
					var row = document.createElement("tr");
					var col = document.createElement("td");
					row.className = CLASS_ROW;

					row.appendChild(col);
					col.colSpan = 2;
					
					createModSelectors(entry, col, function(entry){return function(first, second)
						{weaponModListener(first, second, entry);};}(entry),
						function(entry){return function(select){return weaponModResolver(select, entry);};}(entry));
					tableBody.appendChild(row);
					
					decorateWeaponImage(entry);
				}
				
				var derivedCache = [];
				var count = 0;
				
				for(var key in properties){
					var prop = properties[key];
					
					if(!prop.isDerived){
						propVals = prop.updateValue(entry);
						
						renderProperty(prop, propVals, tableBody, entry);
					}
					else if(entry.item.type === prop.itemType){
						var placeholder = document.createElement("tr");
						tableBody.appendChild(placeholder);
						derivedCache.push({"property": prop, "placeholder": placeholder});
					}
				}
				
				derivedCache.forEach(function(prop){
					propVals = prop.property.updateValue(entry);
					renderProperty(prop.property, propVals, tableBody, entry, prop.placeholder);
				});
			}
			
			loadCount++;
			
			if(loadCount >= DRAW_SIZE){
				i++;
				break;
			}
			
		}
		
		if(loadCount >= DRAW_SIZE){
			loadCount = 0;
			setTimeout(process, WAIT_TIME);
		}
	};
	
	process();
}

function renderProperty(prop, propVals, tableBody, entry, placeholder){
	var key = prop.id;
	
	if(propVals){
		if(propVals instanceof Array){
			propVals.forEach(function(value){
				tableBody.appendChild(tabulateProperty(prop, value, prop.showLabel, prop.unit, entry));
			});
		}
		else{
			if(placeholder)
				tabulateProperty(prop, propVals, prop.showLabel, prop.unit, entry, placeholder);
			else
				tableBody.appendChild(tabulateProperty(prop, propVals, prop.showLabel, prop.unit, entry));
		}			
	}
}

function renderConsumables(entries){	
	var makeHeader = function(text, numeral, quantity, table){
		var row = document.createElement("tr");
		var header = document.createElement("th");
		header.innerHTML = text + " " + numeral;
		row.appendChild(header);
		
		var col = document.createElement("td");
		col.className = CLASS_QUANTITY;
		col.innerHTML = quantity;
		row.appendChild(col);;
		table.appendChild(row);
	};
	
	var processLevel = function(entry, numeral, quantity, tableBody, key){
		makeHeader(entry.name, numeral, quantity, tableBody);
		var property = properties[key];
		renderProperty(property, property.updateValue(entry), tableBody, entry);
	};
	
	entries.forEach(function(entry){
		if(entry.item){
			var levels = entry.element.textContent.match(/[0-9].*/g);
			var cleaned = entry.element.innerHTML.substring(0, entry.element.innerHTML.indexOf(">") + 1);
			entry.element.innerHTML = cleaned;
			var tableBody = initTable(entry);		
			
			if(levels.length >= 1)
				processLevel(entry, "I", levels[0], tableBody, PROP_CONS_I);
			if(levels.length >= 2)
				processLevel(entry, "II", levels[1], tableBody, PROP_CONS_II);
			if(levels.length >= 3)
				processLevel(entry, "III", levels[2], tableBody, PROP_CONS_III);
			if(levels.length >= 4)
				processLevel(entry, "IV", levels[3], tableBody, PROP_CONS_IV);
		}
	});
}

function resolveRarityRendering(entry, table){
	if(entry.rarity){
		switch(entry.rarity){
			case RARITY_COMMON:
				table.className = CLASS_COMMON;
				break;
			case RARITY_UNCOMMON:
				table.className = CLASS_UNCOMMON;
				break;
			case RARITY_RARE:
				table.className = CLASS_RARE;
				break;
			case RARITY_ULTRA:
				table.className = CLASS_ULTRA;
				break;
			default:
				table.className = "";
		}
	}
}

function tabulateProperty(property, value, showLabel, unit, entry, placeholder){
	var col = document.createElement("td");
	var row = typeof placeholder === "undefined" ? document.createElement("tr") : placeholder;
	row.className = CLASS_ROW;
	col.className = CLASS_COL;
	
	if(showLabel){
		var span = document.createElement("span");
		span.className = SPAN_PROP_LABEL;
		span.innerHTML = property.id;
		col.appendChild(span);
		row.appendChild(col);
		col = document.createElement("td");
		col.className = CLASS_COL;
	}
	else
		col.colSpan = 2;		
	
	if(value instanceof Element){
		col.appendChild(value);
		
		if(value.style.display === "none")
			row.style.display = "none";
	}
	else{
		col.innerHTML = value.toString();

		if(isHidableElement(value)){
			row.style.display = "none";
		}
	}

	if(hiddenProps.indexOf(property.id) !== -1)
		row.style.display = "none";
	
	row.appendChild(col);
	entry.setPropertyElement(property, col);
	
	
	return row;
}

function isHidableElement(value){
	if(value.toString().search(/^0.0+$/) !== -1 || value.toString().search(/^0.0+[ ]+\([\^]\)/) !== -1)
		return true;
	else
		return false;
}

function resolveItemsToEntries(entries, items){
	var resolved = [];
	
	entries.forEach(function(entry, index){
		if(items[entry.uid]){	
			entry.item = items[entry.uid];
			resolved.push(entry);
		}
	});
	
	entries.splice(0, entries.length);
	resolved.forEach(function(entry){
		entries.push(entry);
	});
}

function parseManifest(){
	weaponCards = listCards(document.getElementById(DIV_WEAPONS), true);
	gearCards = listCards(document.getElementById(DIV_GEAR), false);
	consumableCards = listCards(document.getElementById(DIV_CONSUMABLES), false);
	modCards = listCards(document.getElementById(DIV_MODS), false);
	charCards = listCards(document.getElementById(DIV_CHARACTERS), false, function(imgElement){
		var filename = imgElement.src.match(FILE_EXTRACT_REGEX)[0].replace(".png", "");
		return filename;
	});
}

function resolveCache(itemType){
	var cache;
	
	switch(itemType){
		case WEAPON_LABEL:
			cache = weapons;
			break;
		case MODS_LABEL:
			cache = mods;
			break;
		case GEAR_LABEL:
			cache = gear;
			break;
		case CHARACTER_LABEL:
			cache = characters;
			break;
		case POWER_LABEL:
			cache = powers;
			break;
		default:
			cache = consumables;
	}
	
	return cache;
}

function integrateAddendum(doCreate){
	var isCreateEnabled = typeof doCreate === "undefined" ? true : doCreate;
	var item;
	var value;
	
	if(true){
		addendum.sections.forEach(function(section){
			var cache = resolveCache(section.label);
			
			section.entries.forEach(function(entry){
				if(entry.uid){
					item = cache[entry.uid];
				}
				else{
					item = null;
					
					for(var key in cache){
						if(cache[key].name === entry.name){
							item = cache[key];
							break;
						}
					}
				}
				
				if(!item && isCreateEnabled){
					item = new Item(entry.name, section.label);
					cache[entry.uid] = item;
					
					if(entry.uid)
						item.addAttribute(PROP_UID, entry.uid);
				}
				
				if(item){
					entry.attributes.forEach(function(attribute){
						item.addAttribute(attribute.key, attribute.value);
					});
				}
			});
		});
	}
}

function Property(id, itemType, interpreter, unit, showLabel, isDerived){
	var self = this;
	this.interpreter = typeof interpreter !== "string" ? interpreter : function(manifestEntry, element, mods){
		var value = manifestEntry.item.getAttribute(interpreter);
		
		if(value && parseFloat(value)){
			var multiplier = sumModifiers(interpreter, mods);
			
			multiplier = multiplier >= 0 ? 1.0 + multiplier : 1.0/(1.0 - multiplier);
			value = parseFloat(value) * multiplier;
			value = value == 0 ? 0 : value;
			
			manifestEntry.cacheValue(interpreter, value);
			value = self.precision > 0 ? value.toFixed(self.precision) : Math.round(value);
			
			if(element){
				element.innerHTML = value;
				var propEl = manifestEntry.getPropertyElement(id);
				
				if(propEl){
					propEl = propEl.parentElement;
					
					if(value == 0 && propEl.style.display !== "none")
						propEl.style.display = "none";
					else if(value != 0 && propEl.style.display === "none")
						propEl.style.display = "table-row";
				}
			}
		}
		else
			value = null;
		
		return value;
	}
	
	this.showLabel = typeof showLabel !== "undefined" ? showLabel : true;
	this.isDerived = typeof isDerived !== "undefined" ? isDerived : false;
	this.id = id;
	this.itemType = itemType;
	this.unit = unit;
	this.dependencies= [this.id];
	this.precision = 1;
}

Property.prototype.addDependencies = function(){
	var self = this;

	arguments.forEach(function(arg){
		self.dependencies.push(arg);
	});
}

Property.prototype.isListeningFor = function(mod){
	var retVal = false;
	var modifiers = mod.getAttribute(EXT_MODIFIERS);
	
	for(var key in modifiers){
		if(this.dependencies.indexOf(key) !== -1){
			retVal = true;
			break;
		}
	}
	
	return retVal;
}

Property.prototype.updateValue = function(manifestEntry, mods){
	var retVal;
	
	if(manifestEntry.item && manifestEntry.item.type === this.itemType){
		retVal = this.interpreter(manifestEntry, manifestEntry.getPropertyElement(this), mods);
		
		if(retVal && typeof retVal === "string" && this.unit){
			if(manifestEntry.getPropertyElement(this))
				manifestEntry.getPropertyElement(this).innerHTML += " (" + this.unit + ")";
			else
				retVal += " (" + this.unit + ")";
		}
		if(hiddenProps.indexOf(this.id) !== -1 && manifestEntry.getPropertyElement(this))
			manifestEntry.getPropertyElement(this).parentElement.style.display = "none";
			
	}
	else
		return;
	
	return retVal;
}

function Item(name, type){
	var self = this;
	
	this.name = typeof name !== "string" ? name.name : name;
	this.type = typeof name !== "string" ? name.type : type;
	this.attributes = typeof name !== "string" ? name.attributes : {};
}

Item.prototype.uid = function(){
	return this.getAttribute(PROP_UID);
};

Item.prototype.addAttribute = function(propertyId, rawValue){
	this.attributes[propertyId] = rawValue;
}

Item.prototype.removeAttribute = function(propertyId){
	delete this.attributes[propertyId];
}

Item.prototype.getAttribute = function(propertyId){
	return this.attributes[propertyId];
}

Item.prototype.contains = function(propertyId){
	return this.attributes[propertyId] != null;
}

Item.prototype.isSingleValue = function(propertyId){
	if(this.contains(propertyId))
		return !(this.attributes[propertyId] instanceof Array);
	else
		return false;
}


function linearlyInterpolate(lowVal, highVal, totalLevels, targetLevel){
	var lowNum = parseFloat(lowVal);
	var targetNum = parseInt(targetLevel);
	var increment = getLevelIncrement(lowVal, highVal, totalLevels);
	
	return (lowNum + ((targetNum - 1) * increment));
}

function getLevelIncrement(lowVal, highVal, totalLevels){
	var lowNum = parseFloat(lowVal);
	var highNum = parseFloat(highVal);
	var totalNum = parseInt(totalLevels);
	
	return (highNum - lowNum)/(totalNum - 1);
}

function extractValue(rangeString, isGetLowest){
	var tokens = rangeString.split(NON_NUMERIC_REGEX);
	var retVal = null;
	
	if(tokens && tokens.length > 0){
		if(isGetLowest)
			retVal = tokens[0];
		else
			retVal = tokens[tokens.length - 1];
	}
	
	return retVal;
}

function ManifestEntry(name, level, element){
	this.name = name;
	this.level = level;
	this.element = element;
	this.attributes = [];
	this.image;
}

//----------------------------------------------------------------------------
//--------------------SECTION FOR MANIFEST PARSING----------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

function listCards(element, eliminateRomans, extractName) {
	var nodes = element.childNodes;
	var cache = [];
	
	for(var i = 0; i < nodes.length; i++){
		cache.push( nodes[i] );
	}
	
	var arr = [];
	
	var rarity;
	var name;
	var item;
	var uid;
	var uidSuffix = "";
	var imgs;
	var cardArr = [];
	
	var doSwitch = function(){
		var div = document.createElement("div");
		div.className = "cardHolder";
		
		cardArr.forEach(function(card, index){
			if(index < cardArr.length - 1){
				element.removeChild(card);
				div.appendChild(card);
			}
			else{
				element.replaceChild(div, card);
				div.appendChild(card);
			}
		});
		
		cardArr = [];
	};
	
	for(var i = 0; i < cache.length; i++){
		if(cache[i].tagName === "H3"){
			rarity = cache[i].textContent;		
			doSwitch();
		}
		else if(cache[i].className === "card" || cache[i].className === "card off"){
			cardArr.push( cache[i] );
			
			if(cardArr.length === 4)
				doSwitch();			

			imgs = cache[i].getElementsByTagName("img");
			
			if(!extractName){
				name = cache[i].textContent.replace(/(\r\n|\n|\r)/gm, "");
				var temp = name.search(CONS_REGEX);
				
				if(temp !== -1){
					name = name.substring(0, temp);
				}
				if(eliminateRomans)
					name = name.replace(ROMAN_REGEX, "");
				else{
					var matches = name.match(ROMAN_REGEX);
					
					if(matches && matches.length > 0){
						if(matches[0] !== " VI")
							uidSuffix = matches[0];
						else
							uidSuffix = "";
						
						if(uidSuffix.charAt(0) == "+")
							uidSuffix = " " + uidSuffix.substring(1);
					}
					else
						uidSuffix = "";
				}
			}
			else
				name = extractName(imgs[0]);
			
			if(imgs != null && imgs.length > 0){
				uid = imgs[0].src.match(FILE_EXTRACT_REGEX)[0] + uidSuffix;
				
				if(isPresent(cache[i]))
					item = new ManifestEntry(uid, name, imgs[imgs.length - 1].src, cache[i], rarity);
				else
					item = new ManifestEntry(uid, name, "", cache[i], rarity);
					
				item.image = imgs[0];
				arr.push(item);
			}
		}
	}

	return arr;
}

function isPresent(element){
	var value = element.style.backgroundImage;
	
	if(value.indexOf( "-on" ) != -1)
		return true;
	else
		return false;
}

function ManifestEntry(uid, name, levelUrl, element, rarity) {
	this.name = name; 
	this.level = 0;
	this.maxLevel = 0;
	this.element = element;
	this.table;
	this.item = null;
	this.rarity = rarity;
	this.quantity = 0;
	this.rowCache = {};
	this.valueCache = {};
	this.formCache = [];
	this.listener = new SelectionListener(this);
	this.uid = uid;
	this.elementChanged;
	
	if(levelUrl)
		setLevelFromURL(this, levelUrl);
		
	if(rarity && rarity === RARITY_PROMO)
		this.rarity = RARITY_ULTRA;
}

ManifestEntry.prototype.cacheValue = function(propertyId, value){
	this.valueCache[propertyId] = value;
}

ManifestEntry.prototype.getCachedValue = function(propertyId){
	return this.valueCache[propertyId];
}

ManifestEntry.prototype.setPropertyElement = function(property, element){
	this.rowCache[property.id] = {"property": property, "element": element};
}

ManifestEntry.prototype.getPropertyElement = function(property){
	if(this.rowCache[property.id])
		return this.rowCache[property.id].element;
	else
		return null;
}

ManifestEntry.prototype.modsChanged = function(mods){
	var derivedCache = [];
	
	for(var key in this.rowCache){
		if(!this.rowCache[key].property.isDerived)
			this.rowCache[key].property.updateValue(this, mods);
		else
			derivedCache.push(this.rowCache[key].property);
	}
	
	var self = this;
	derivedCache.forEach(function(property){
		property.updateValue(self, mods); 
	});
}

function setLevelFromURL(item, levelUrl){
	var index = -1;
	index = levelUrl.lastIndexOf("/");
	
	if(index != -1){
		var filename = levelUrl.substring(index + 1, levelUrl.indexOf(".png"));
		
		index = filename.indexOf("-");
		item.maxLevel = parseInt(filename.substring(0, index));
		item.level = parseInt(filename.substring(index + 1, filename.length));
	}
}

function getType(url) {
	var type = null;
	
	if (matchString("multiplayer/guns/", url))
		type = WEAPON_LABEL;
	else if(matchString("multiplayer/kits/", url))
		type = CHARACTER_LABEL;
	else if(matchString("multiplayer/mods/Gear", url))
		type = GEAR_LABEL;
	else if(matchString("multiplayer/mods/", url))
		type = MODS_LABEL;
	else
		type = CONSUMABLE_LABEL;
	
	return type;
}

function matchString(token, str) {
	var found = false;

	if (str.indexOf(token, 0) != -1)
		found = true;

	return found;
}

//----------------------------------------------------------------------------------
//---------------------Section for persisting mod selections------------------------
//----------------------------------------------------------------------------------

function loadSelectedMods(cards){
	var encoded = MD_getValue(MOD_SELECTOR_KEY);
	
	if(encoded){
		var tokens = encoded.split(ENCODING_DELIM);
		var i = 0;
		var count = 0;
		
		var process = function(){
			for(; i < tokens.length; i++){
				loadModsForCard(cards[i], tokens[i]);
				
				if(count >= DRAW_SIZE){
					i++;
					break;
				}
			}
			
			if(count >= DRAW_SIZE){
				count = 0;
				setTimeout(process, 10);
			}
		};
		
		if(tokens.length === cards.length)
			process();
	}
}

function loadModsForCard(card, token){
	var selectors = card.formCache;
	var code;
	
	if(selectors && selectors.length >= token.length){
		for(var i = 0; i < token.length; i++){
			code = token.charCodeAt(i) - CARD_KEY_OFFSET;
			
			if(selectors[i].options[code] && code > 0){
				selectors[i].options[code].selected = true;
				selectors[i].onchange();
			}
		}
	}
}

function persistCardSelectorStates(cards){
	var code = "";
	
	cards.forEach(function(card, index){
		code += encodeCardSelectors(card);
		
		if(index + 1 < cards.length)
			code += ENCODING_DELIM;
	});
	
	MD_setValue(MOD_SELECTOR_KEY, code);
}

function encodeCardSelectors(card){
	var selectors = card.formCache;
	var code;

	if(selectors){
		code = "";
		
		selectors.forEach(function(selector){
			code += String.fromCharCode(selector.selectedIndex + CARD_KEY_OFFSET);
		});
	}
	else
		code = String.fromCharCode(CARD_KEY_OFFSET);
	
	return code;
}

function initClearAllSelector(parent){
	var button = document.createElement("button");
	button.innerHTML = "Clear All";
	button.onclick = clearAllSelectedMods;
	
	var table = document.createElement("table");
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);
	
	var row = document.createElement("tr");
	tbody.appendChild(row);
	row.className = CLASS_CLEAR_ALL;
	var col = document.createElement("td");
	col.appendChild(button);
	row.appendChild(col);
	
	col = document.createElement("td");
	button = document.createElement("button");
	button.innerHTML = "Settings";
	button.onclick = onSettingsAction;
	
	col.appendChild(button);
	row.appendChild(col);
	selectRoot.appendChild(table);
	table.style.width = "100%";
	
	centerFloater(selectRoot);
	//col.colSpan = 2;
}
//----------------------------------------------------------------------------------------------------

function onSettingsAction(){
	Config.data = {};

	var initialCardMode = MD_getValue(CONFIG_CARD_MODE);
	var initObj = {
		"dispTab": {
			"name": "Display", 
			"fields": {
				"dispMode": {
					"type":"select", 
					"text": "Global Display Mode",
					"options": {
						"Single fixed display on left": SETTING_DISP_LEFT,
						"Single fixed display on right": SETTING_DISP_RIGHT,
						"Selectables on left, On-Demand on Right": SETTING_DISP_SPLIT_SSO,
						"On-Demand on left, Selectables on right": SETTING_DISP_SPLIT_SOS
					}
				},
				"cardMode": {
					"type": "select",
					"text": "Card Display Mode",
					"options": {
						"Show individual item stats": SETTING_CARDS_SHOW,
						"Hide individual item stats": SETTING_CARDS_HIDE
					}
				}
			}
		},
		"statTab": {
			"name": "Show/Hide Stats",
			"fields": {}
		}
	}
	
	initObj.statTab.fields = initWeaponConfig();
	Config.data[CONFIG_DISP_MODE] = MD_getValue(CONFIG_DISP_MODE);
	Config.data[CONFIG_CARD_MODE] = MD_getValue(CONFIG_CARD_MODE);
	Config.init(initObj);
	
	Config.show(function(){
		var showCards = MD_getValue(CONFIG_CARD_MODE);
		
		if(showCards && showCards !== initialCardMode)
			setCardDisplaysVisible(showCards === SETTING_CARDS_SHOW);
		
		hiddenProps = [];
		for(var key in Config.data){
			if(key.indexOf("hiddenprop") === 0 && Config.data[key] !== "1"){
				var val = initObj.statTab.fields[key].text;
				hiddenProps.push(val);
				MD_setValue(key, val);
			}
		}
	});
}

function initWeaponConfig(){
	var obj = {};
	var i = 0;
	
	for(var key in properties){
		if(properties[key].itemType === WEAPON_LABEL){
			obj["hiddenprop" + i] = {"type": "checkbox", "text": key};
			
			if(hiddenProps.indexOf(key) === -1)
				Config.data["hiddenprop" + i] = "1";
		}
		
		i++;
	}
	
	return obj;
}

function setCardDisplaysVisible(isVisible){
	var doToggle = function(){
		toggleSet(weaponCards);
		toggleSet(gearCards);
		toggleSet(consumableCards);
		toggleSet(charCards);
	};
	
	var toggleSet = function(cards){
		cards.forEach(function(card){
			if(card.table){
				
				if(isVisible)
					card.table.style.display = "inline";
				else
					card.table.style.display = "none";
			}
		});
	};
	
	if(isVisible){
		if(isRendered)
			doToggle();
		else
			renderAll();
	}
	else if(isRendered)
		doToggle();
}

//----------------------------------------------------------------------------------
//-------------------SECTION FOR PROPERTY CALCULATION FUNCTIONS---------------------
//----------------------------------------------------------------------------------

function calcBurstDPS(manifestEntry, element, mods){
	var mag = parseInt(manifestEntry.getCachedValue(PROP_MAG_SIZE));
	var dps = "N/A";
	
	if(mag > 1){
		var dmg = parseFloat(manifestEntry.getCachedValue(PROP_DMG));
		var time = getFireTime(manifestEntry);
		var dot = manifestEntry.getCachedValue(PROP_INCENDIARY_DOT);
		
		if(isCharged(manifestEntry.item)){
			if(manifestEntry.item.name.indexOf("Particle Rifle") !== -1)
				dmg = calcAverageDamage(manifestEntry);
			else if(!isAutomatic(manifestEntry.item) && !manifestEntry.item.getAttribute(EXT_CHARGE_REQUIRED))
				dmg = parseFloat(manifestEntry.getCachedValue(PROP_DMG_UNCHARGED));
		}
		else if(getBurstCount(manifestEntry) > 1)
			time = 60.0/parseFloat(manifestEntry.getCachedValue(PROP_ROF));
			
		dps = (dmg + dot)/time;
		dps = dps.toFixed(1);
	}
	
	if(element)
		element.innerHTML = dps;

	return dps;
}

function calcSustainedDPS(manifestEntry, element, mods, specDmg){
	var dmg = 0;
	
	if(typeof specDmg === "undefined"){
		if(!isCharged(manifestEntry.item) || manifestEntry.item.getAttribute(EXT_CHARGE_REQUIRED))
			dmg = parseFloat(manifestEntry.getCachedValue(PROP_DMG));
		else if(manifestEntry.item.name.indexOf("Particle Rifle") !== -1 || isAutomatic(manifestEntry.item))
			dmg = calcAverageDamage(manifestEntry);
		else{
			dmg = parseFloat(manifestEntry.getCachedValue(PROP_DMG_UNCHARGED));
		}
	}
	else
		dmg = specDmg;
		
	var dps = performDPSCalc(manifestEntry, dmg, false).toFixed(1);
	
	if(element)
		element.innerHTML = dps;
	
	return dps;
}

function calcCancelledDPS(manifestEntry, element, mods, specDmg){
	var dmg = 0;
	
	if(typeof specDmg === "undefined"){
		if(!isCharged(manifestEntry.item) || manifestEntry.item.getAttribute(EXT_CHARGE_REQUIRED))
			dmg = parseFloat(manifestEntry.getCachedValue(PROP_DMG));
		else if(manifestEntry.item.name.indexOf("Particle Rifle") !== -1 || isAutomatic(manifestEntry.item))
			dmg = calcAverageDamage(manifestEntry);
		else
			dmg = parseFloat(manifestEntry.getCachedValue(PROP_DMG_UNCHARGED));
	}
	else
		dmg = specDmg;
		
	var dps = performDPSCalc(manifestEntry, dmg, true).toFixed(1);
	
	if(element)
		element.innerHTML = dps;
	
	return dps;
}

function performDPSCalc(manifestEntry, dmg, isCancelling){
	var mag = parseInt(manifestEntry.getCachedValue(PROP_EFFECTIVE_MAG));
	var reload = getReloadTime(manifestEntry);
	var dps = 0;
	var tbs = getFireTime(manifestEntry);
	var refire = manifestEntry.item.getAttribute(EXT_REFIRE);
	refire = parseFloat(refire) ? parseFloat(refire) : 0;
	var dot = 0;
		
	if(isCancelling && parseFloat(manifestEntry.item.getAttribute(EXT_EJECT_RATIO))){
		var eject = 1 - parseFloat(manifestEntry.item.getAttribute(EXT_EJECT_RATIO));
		reload = eject * reload;
	}
	if(manifestEntry.item.getAttribute(EXT_CHARGE_REQUIRED) && manifestEntry.item.getAttribute(EXT_MAX_CHARGE))
		reload += parseFloat(manifestEntry.item.getAttribute(EXT_MAX_CHARGE));

	mag = Math.ceil(mag / getShotCost(manifestEntry));
		
	if(manifestEntry.item.getAttribute(EXT_SHOT_COST_RAMPED)){
		var mag = manifestEntry.getCachedValue(PROP_EFFECTIVE_MAG);
		var minTbs = 60 / parseFloat(manifestEntry.item.getAttribute(EXT_ROF_MIN));
		var ramp = parseFloat(manifestEntry.item.getAttribute(EXT_ROF_RAMP));
		var avgTbs = (minTbs + tbs) / 2;
		var shots = calcShotsRequired(mag, minTbs, tbs, ramp);
		
		mag = shots + mag / parseInt(manifestEntry.item.getAttribute(EXT_SHOT_COST_RAMPED));
	}
	if(manifestEntry.getCachedValue(PROP_DOT_MAX_STACK) && manifestEntry.getCachedValue(PROP_DOT_MAX_STACK) > 0){
		//dot = calcAverageStacks(tbs, refire, mag, manifestEntry.getCachedValue(PROP_DOT_MAX_STACK));
		dot = dmg * manifestEntry.getCachedValue(PROP_DOT_MULT);
	}

	dps = (dmg + dot)*mag / (tbs*(mag) + reload + refire);
	return dps;
}

function calcMaxStacks(tbs, refire, maxTheoretical){
	var maxTime = 3;
	var shots = (maxTime / (tbs + refire));

	return shots > maxTheoretical ? maxTheoretical : shots;
}

function calcAverageStacks(tbs, refire, mag, maxTheoretical){
	//var maxStacks = calcMaxStacks(tbs, refire, maxTheoretical);
	//var roundsTillMax = mag > Math.floor(maxStacks) ? Math.floor(maxStacks) : mag;
	var iterativeStacks = mag * (mag + 1) / 2;
		//unsafeWindow.console.log(maxStacks + ":" + roundsTillMax);
	//unsafeWindow.console.log(maxStacks + ": " + ((iterativeStacks + (mag - roundsTillMax) * maxStacks) / mag));
	
	//return (iterativeStacks + (mag - roundsTillMax) * maxStacks) / mag;
}

function calcSDPSVA(manifestEntry, element, mods, cancellingFlag){
	var isCancelling = typeof cancellingFlag === "undefined" ? false : cancellingFlag;
	var dpsFunc = isCancelling ? calcCancelledDPS : calcSustainedDPS;
	var damages = [];
	var dpses = [];
	
	if(isCharged(manifestEntry.item) && !isAutomatic(manifestEntry.item) &&  !manifestEntry.item.getAttribute(EXT_CHARGE_REQUIRED))
		damages = manifestEntry.getCachedValue(PROP_DVA_UNCHARGED);
	else if(isCharged(manifestEntry.item))
		damages = calcDamageAgainstArmor(manifestEntry, element, mods, calcAverageDamage(manifestEntry));
	else
		damages = manifestEntry.getCachedValue(PROP_DVA);
	
	for(var i = 0; i < damages.length; i++){
		dpses[i] = parseFloat(dpsFunc(manifestEntry, null, mods, damages[i]));
	}
	
	var display = createDiffStratifiedDisplay(dpses[0], dpses[1], dpses[2]);
	
	if(element){
		element.innerHTML = "";
		element.appendChild(display);
	}
	
	return display;
}

function getReloadTime(manifestEntry){
	var reload = parseFloat(manifestEntry.item.getAttribute(EXT_RELOAD_TIME));
	
	return reload;
}

function getFireTime(manifestEntry){
	var wep = manifestEntry.item;
	var tbs = 60.0 / parseFloat(manifestEntry.getCachedValue(PROP_ROF));
	var refire = getRefireTime(manifestEntry);

	if(isCharged(manifestEntry.item) && manifestEntry.item.getAttribute(EXT_CHARGE_REQUIRED) && !isAutomatic(manifestEntry.item)){
		tbs += parseFloat(manifestEntry.item.getAttribute(EXT_MAX_CHARGE));
	}
	else if(getBurstCount(manifestEntry) > 1){
		var numBursts = Math.ceil(manifestEntry.getCachedValue(PROP_MAG_SIZE) / getBurstCount(manifestEntry));
		var burstTime = (manifestEntry.getCachedValue(PROP_MAG_SIZE) - numBursts) * tbs;
/* 		if(manifestEntry.name.indexOf("Shuriken")!==-1)unsafeWindow.console.log(tbs + ":"+refire+":"+getBurstCount(manifestEntry)+":"+parseFloat(manifestEntry.getCachedValue(PROP_ROF)); */
		tbs = burstTime + numBursts * (refire > 0 ? refire : tbs);//mag time
		tbs = tbs / manifestEntry.getCachedValue(PROP_MAG_SIZE);
		//unsafeWindow.console.log(manifestEntry.item.name + ": " + refire + ": " + getBurstCount(manifestEntry));
	}
	else if(wep.getAttribute(EXT_ROF_RAMP) && wep.getAttribute(EXT_ROF_MIN)){
		var mag = manifestEntry.getCachedValue(PROP_EFFECTIVE_MAG);
		var minTbs = 60 / parseFloat(wep.getAttribute(EXT_ROF_MIN));
		var ramp = parseFloat(wep.getAttribute(EXT_ROF_RAMP));
		var avgTbs = (minTbs + tbs) / 2;
		var shots = calcShotsRequired(mag, minTbs, tbs, ramp);
		
		tbs = ((avgTbs * shots) + (mag - shots) * tbs) / mag;
		//unsafeWindow.console.log(shots + "/" + mag);
	}
	else{
		tbs = tbs > refire ? tbs : refire;
	}
	
	return tbs;
}

function calcChargeShots(manifestEntry){
	var wep = manifestEntry.item;
	var tbs = 60.0 / parseFloat(manifestEntry.getCachedValue(PROP_ROF));
	var mag = manifestEntry.getCachedValue(PROP_EFFECTIVE_MAG);
	var chargeTime = parseFloat(wep.getAttribute(EXT_MAX_CHARGE));
	
	if(wep.getAttribute(EXT_ROF_RAMP)){
		var minTbs = 60 / parseFloat(wep.getAttribute(EXT_ROF_MIN));
		var ramp = parseFloat(wep.getAttribute(EXT_ROF_RAMP));
		
		return calcShotsRequired(mag, minTbs, tbs, ramp, chargeTime);
	}
	else{
		return Math.floor(chargeTime / tbs);
	}
}

function calcShotsRequired(mag, minTbs, targetTbs, rampTime, chargeTime){
	var rate = (minTbs - targetTbs) / rampTime;
	var elapsed = 0;
	var shots = 0;
	var calcCurrent = function(time){
		return rate * time + minTbs;
	};
	
	for(var i = 0; i < mag; i++){
		elapsed += calcCurrent(elapsed);
		
		if(elapsed >= rampTime && typeof chargeTime === "undefined"){
			shots = i;
			break;
		}
		else if(typeof chargeTime !== "undefined" && elapsed >= chargeTime){
			shots = i;
			break;
		}
	}
	
	return shots;
}

function getRefireTime(manifestEntry){
	var refire = 0;
	var burst = getBurstCount(manifestEntry);
	
	if(!isAutomatic(manifestEntry.item) || burst > 1){
		refire = manifestEntry.item.getAttribute(EXT_REFIRE);
		refire = parseFloat(refire) ? parseFloat(refire) : 0;
	}
	
	return refire;
}

function getShotCost(manifestEntry){
	var name = manifestEntry.item.name;
	if(name.indexOf("Hurricane") !== -1)
		return 2;
	else
		return 1;
}

function getBurstCount(manifestEntry){
	if(manifestEntry.item.getAttribute(EXT_BURST))
		return parseInt(manifestEntry.item.getAttribute(EXT_BURST));
	else
		return 1;
}

function calcDamageAgainstArmor(manifestEntry, element, mods, dmgToUse){
	var retVal;
	var dmg = dmgToUse ? dmgToUse : calcDamage(manifestEntry, manifestEntry.level, mods);
	var ap = sumModifiers(EXT_AP_AA, mods);
	var uncharged = calcDamage(manifestEntry, manifestEntry.level, mods, true);
	var apU = ap * calcBaseDamage(manifestEntry, manifestEntry.level, mods, true);
	ap = ap * calcBaseDamage(manifestEntry, manifestEntry.level, mods);
	var multiplier = manifestEntry.item.getAttribute(EXT_MULT_ARMOR) ? parseFloat(manifestEntry.item.getAttribute(EXT_MULT_ARMOR)) : 1;
	var armorDamages = [ARMOR_REDUCTION_BRONZE, ARMOR_REDUCTION_SILVER, ARMOR_REDUCTION_GOLD];
	var unchargeArmors = [uncharged * multiplier + apU, uncharged * multiplier + apU, uncharged * multiplier + apU];
	var projCount = parseInt(manifestEntry.item.getAttribute(EXT_PROJECTILE_COUNT)) ? parseInt(manifestEntry.item.getAttribute(EXT_PROJECTILE_COUNT)) : 1;
	var minDmg = 5 * projCount;
	var innate = manifestEntry.item.getAttribute(PROP_AP) ? parseFloat(manifestEntry.item.getAttribute(PROP_AP)) : 0;
	var modifier = sumModifiers(PROP_AP, mods);
	modifier = modifier > innate ? modifier : innate;
	modifier = modifier <= 1 ? modifier : 1;
	
	projCount = (projCount && parseFloat(projCount)) ? parseFloat(projCount) : 1;
	
	if(isProjectileWeapon(manifestEntry.item))
		armorDamages = [dmg * multiplier, dmg * multiplier, dmg * multiplier];
	else{
		for(var i = 0; i < armorDamages.length; i++){
			unchargeArmors[i] = unchargeArmors[i] - (armorDamages[i] * (1.0 - modifier) * projCount);
			unchargeArmors[i] = unchargeArmors[i] >= minDmg ? unchargeArmors[i] : minDmg;
			armorDamages[i] = dmg * multiplier + ap - (armorDamages[i] * (1.0 - modifier) * projCount);
			armorDamages[i] = armorDamages[i] >= minDmg ? armorDamages[i] : minDmg;
		}
	}
	
	retVal = createDiffStratifiedDisplay(armorDamages[0], armorDamages[1], armorDamages[2]);
	manifestEntry.cacheValue(PROP_DVA, armorDamages);
	manifestEntry.cacheValue(PROP_DVA_UNCHARGED, unchargeArmors);
	
	if(element){
		element.innerHTML = "";
		element.appendChild(retVal);
	}

	return dmgToUse ? armorDamages : retVal;
}

function spanify(value, className, text, div){
	var span = document.createElement("span");
	span.className = className;
	span.href = "#";
	span.setAttribute(ATTR_HOVER_TITLE, text);
	span.innerHTML = value.toFixed(0);
	div.appendChild(span);
}

function createDiffStratifiedDisplay(bronze, silver, gold){
	var div = document.createElement("div");
	div.className = "difficultyBreakdown";
	
	spanify(bronze, "stratifiedTooltip" + " spanBronze", "Bronze", div);
	div.innerHTML += "/";
	spanify(silver, "stratifiedTooltip" + " spanSilver", "Silver", div);
	div.innerHTML += "/";
	spanify(gold, "stratifiedTooltip" + " spanGold", "Gold", div);
	
	return div;
}

function createShieldBarrierDisplay(shield, barrier){
	var div = document.createElement("div");
	div.className = "difficultyBreakdown";
	
	spanify(shield, "stratifiedTooltip" + " spanShields", "Shields", div);
	div.innerHTML += "/";
	spanify(barrier, "stratifiedTooltip" + " spanBarriers", "Barriers", div);
	
	return div;
}

function isProjectileWeapon(weapon){
	var isProj = false;
	
	for(var i = 0; i < PROJECTILE_WEAPONS.length; i++){
		if(weapon.name.indexOf(PROJECTILE_WEAPONS[i]) !== -1){
			isProj = true;
			break;
		}
	}
	
	return isProj;
}

function isGeth(weapon){
	var geth = false;
	
	for(var i = 0; i < GETH_WEAPONS.length; i++){
		if(weapon.name.indexOf(GETH_WEAPONS[i]) !== -1){
			geth = true;
			break;
		}
	}
	
	return geth;
}

function isAutomatic(weapon){
	for(var i = 0; i < SEMIAUTOS.length; i++){
		if(weapon.name.indexOf(SEMIAUTOS[i]) !== -1)
			return false;
	}
	
	for(var i = 0; i < AUTO_EXCEPTIONS.length; i++){
		if(weapon.name.indexOf(AUTO_EXCEPTIONS[i]) !== -1)
			return true;
	}
		
	var type = weapon.getAttribute(FLAG_WEAPON_TYPE);
	
	if(type.indexOf("Sniper") !== -1 || type.indexOf("Shotgun") !== -1 ||
			type.indexOf("Pistol") !== -1){
		return false;
	}
	else
		return true;
}

function isCharged(weapon){
	if(weapon.getAttribute(EXT_MAX_CHARGE) && parseFloat(weapon.getAttribute(EXT_MAX_CHARGE)))
		return true;
	else
		return false;
}

function calcBaseDamage(manifestEntry, levelToUse, mods, getUncharged){
	var filtered = [];
	
	if(mods){
		mods.forEach(function(mod){
			var modifiers = mod.getAttribute(EXT_MODIFIERS);
			
			if(modifiers[EXT_BASE_DMG])
				filtered.push(mod);
		});
	}
	
	return calcDamage(manifestEntry, levelToUse, filtered, getUncharged);
}

function calcDamage(manifestEntry, levelToUse, mods, getUncharged, isHeadshot){
	var dmgI;
	var dmgX;
	var hshotMod = 0;
	var hshotMult = 1;
	
	if(typeof getUncharged === "undefined" || !getUncharged || !isCharged(manifestEntry.item) || manifestEntry.item.getAttribute(EXT_CHARGE_REQUIRED)){
		dmgI = manifestEntry.item.getAttribute(EXT_DMG_I);
		dmgX = manifestEntry.item.getAttribute(EXT_DMG_X);
	}
	else{
		dmgI =  manifestEntry.item.getAttribute(EXT_UNCHARGED_I)
		dmgX =  manifestEntry.item.getAttribute(EXT_UNCHARGED_X);
	}
	if(typeof isHeadshot !== "undefined" && isHeadshot){
		hshotMod = sumModifiers(EXT_HSHOT_MOD, mods);
		hshotMult = sumModifiers(EXT_HSHOT_MULT_MOD, mods);
		hshotMult = hshotMult > 0 ? hshotMult : HSHOT_MULTIPLIER;
	}
	
	var baseModifier = sumModifiers(EXT_BASE_DMG, mods) + (isGeth(manifestEntry.item) ? sumModifiers(EXT_GETH_DMG, mods) : 0) + 1;
	var baseDmg = linearlyInterpolate(dmgI, dmgX, MAX_WEAPON_LEVEL, levelToUse) * baseModifier;
	var modifier = sumModifiers(PROP_DMG, mods) + hshotMod;
	
	modifier = modifier >= 0 ? 1 + modifier : 1/(1-modifier);
	var dmg = baseDmg * modifier * hshotMult;

	return dmg;
}

function calcSpecialDamage(manifestEntry, mods, isShields){
	var dmg = calcDamage(manifestEntry, manifestEntry.level, mods);
	var base = calcBaseDamage(manifestEntry, manifestEntry.level, mods, false);
	var mult = 1;
	var ammoBonus = sumModifiers(isShields ? EXT_AMMO_AS : EXT_AMMO_AB, mods);
	
	if(isShields && manifestEntry.item.getAttribute(EXT_MULT_SHIELDS))
		mult = parseFloat(manifestEntry.item.getAttribute(EXT_MULT_SHIELDS));
	else if(!isShields && manifestEntry.item.getAttribute(EXT_MULT_BARRIERS))
		mult = parseFloat(manifestEntry.item.getAttribute(EXT_MULT_BARRIERS));
		
	dmg = dmg * mult + base * ammoBonus;
	return dmg;
}

function sumModifiers(modifier, mods, isAdditive){
	var checkForAddends = typeof isAdditive == "undefined" ? false : isAdditive;
	var sum = 0;
	var modifiers; 
	
	if(mods){
		mods.forEach(function(mod){
			modifiers = mod.getAttribute(EXT_MODIFIERS);
			
			if(modifiers[modifier]){
				if(checkForAddends && modifiers[modifier].unit && modifiers[modifier].unit === "+"){
					sum += parseFloat(modifiers[modifier].value);
				}
				else if(!checkForAddends && ((modifiers[modifier].unit && modifiers[modifier].unit !== "+")
						|| !modifiers[modifier].unit)){
					sum += parseFloat(modifiers[modifier].value);	
				}
			}
		});
	}

	return sum;
}

function SelectionListener(entry){
	this.entry = entry;
	this.selects = [];
	this.resolvers = [];
}

SelectionListener.prototype.addSelector = function(selector, resolver, addListener){
	if(selector && resolver){
		this.selects.push(selector);
		this.resolvers.push(resolver);
		var self = this;
		
		if(typeof addListener === "undefined" || addListener)
			MD_addListener(selector, "change", function(){self.onSelectorChange()});
	}
}

SelectionListener.prototype.onSelectorChange = function(){
	var curMods = [];
	var self = this;
	
	this.selects.forEach(function(select, index){
		var temp = self.resolvers[index](select);
		
		if(temp){
			var arr = temp instanceof Array ? temp : [temp];
			
			arr.forEach(function(item){
				if(!item.getAttribute(FLAG_WEAPON_TYPE))
					curMods.push(item);
				else if(item.getAttribute(FLAG_WEAPON_TYPE).indexOf(self.entry.item.getAttribute(FLAG_WEAPON_TYPE)) !== -1){
					curMods.push(item);
				}
			});		
		}	
	});
	
	this.entry.modsChanged(curMods);
	
	if(this.entry.elementChanged)
		this.entry.elementChanged();
}

function calcAverageDamage(manifestEntry){
	var mag = manifestEntry.getCachedValue(PROP_EFFECTIVE_MAG);
	var chargeShots = calcChargeShots(manifestEntry);
	var dmg = parseFloat(manifestEntry.getCachedValue(PROP_DMG_UNCHARGED)) * chargeShots +
			parseFloat(manifestEntry.getCachedValue(PROP_DMG)) * (mag - chargeShots);
	dmg = dmg / mag;
		
	return dmg;
}

function RandomViewer(displayTriggerElement, name, label, valueSource, levels, listener, isVisible){
	this.element = document.createElement("div");
	this.element.className = CLASS_MOD_SELECT + " globalSelectorStyle";
	this.select = document.createElement("select");
	this.leveler;
	this.levels = levels;
	this.valueSource = valueSource;
	this.listener = listener;
	this.label = label;
	this.name = name;
	this.entry;
	
	var self = this;
	RandomViewer.allViewers.push(this);
	MD_addListener(displayTriggerElement, "click", function(){
		self.element.style.display = "inline";
		
		RandomViewer.allViewers.forEach(function(viewer){
			if(viewer !== self){
				viewer.element.style.display = "none";
				viewer.select.selectedIndex = 0;
				viewer.clear();
				
				if(viewer.leveler)
					viewer.leveler.selectedIndex = 0;
			}
		});
		
		self.position();
	});
	
	var visible = typeof isVisible === "undefined" ? true : isVisible;
	this.element.style.display = visible ? "inline" : "none";
	this.init();
}

RandomViewer.allViewers = [];
RandomViewer.romans = ["I","II","III","IV","V","VI","VII","VIII", "IX", "X"];

RandomViewer.prototype.init = function(){
	var self = this;
	var table = document.createElement("table");
	var tbody = document.createElement("tbody");
	var row = document.createElement("tr");
	var col = document.createElement("th");
	
	table.appendChild(tbody);
	tbody.appendChild(row);
	
	col.innerHTML = this.name + " On-Demand";
	col.colSpan = 2;
	row.appendChild(col);
	row = document.createElement("tr");
	tbody.appendChild(row);
	col = document.createElement("td");
	row.appendChild(col);
	
	var option = document.createElement("option");
	option.style.background = OPTION_BG;
	option.value = "";
	option.innerHTML = "-";
	this.select.appendChild(option);
	
	var reversed = {};
	var sorted = [];
	
	for(var key in this.valueSource){
		reversed[this.valueSource[key].name] = key;
		sorted.push(this.valueSource[key].name);
	}
	
	sorted.sort();
	
	sorted.forEach(function(reverse){
		var key = reversed[reverse];
		option = document.createElement("option");
		option.style.background = OPTION_BG;
		option.value = key;
		option.innerHTML = self.valueSource[key].name;
		self.select.appendChild(option);
	});
		
	col.appendChild(this.select);
	this.element.appendChild(table);
	this.select.onchange = function(){self.onSelectionChanged()};
	formRoot.appendChild(this.element);
	
	if(this.levels > 0){
		this.leveler = document.createElement("select");
		this.leveler.onchange = function(){self.onSelectionChanged()};
		
		for(var i = 1; i <= this.levels; i++){
			option = document.createElement("option");
			option.style.background = OPTION_BG;
			option.value = i;
			option.innerHTML = RandomViewer.romans[i - 1];
			this.leveler.appendChild(option);
		}
		
		col = document.createElement("td");
		col.appendChild(this.leveler);
		row.appendChild(col);
	}
	else
		col.colSpan = 2;
	
	formRoot.style.display = "inline";
	
	if(typeof MD_getValue(CONFIG_HIDDEN_OND) === "undefined")
		MD_setValue(CONFIG_HIDDEN_OND, "true");
	if(MD_getValue(CONFIG_HIDDEN_OND) != "true")
		table.style.display = "none";
	
	this.position();
}

RandomViewer.prototype.clear = function(){
	var existing = this.element.getElementsByClassName(CLASS_RANDOM_VIEW);
	
	if(existing && existing.length > 0){
		this.element.removeChild(existing[0]);
	}
}

RandomViewer.prototype.position = function(){
	centerFloater(formRoot);
}

RandomViewer.prototype.onSelectionChanged = function(){
	var key = this.select.options[this.select.selectedIndex].value;
	
	if(key){
		var level = -1;
		
		if(this.leveler)
			level = parseInt(this.leveler.options[this.leveler.selectedIndex].value);
			
		var entry = this.listener(key, level);
		
		if(entry){
			var self = this;
			entry.elementChanged = function(){self.position()};
			this.entry = entry;
			this.renderItem(entry);
		}
	}
}

RandomViewer.prototype.renderItem = function(entry){
	//unsafeWindow.console.log(entry.item.name);
	this.clear();
	
	entry.element = this.element;
	renderCards([entry], CLASS_RANDOM_VIEW);
	entry.listener.onSelectorChange();
	this.position();
}

function centerFloater(element){
	element.style.top = "50%";
	element.style.marginTop = (-1 * parseInt(element.offsetHeight) / 2).toFixed(0) + "px";
}

function createDataCache(){
	var data = {
		"weapons": weapons,
		"gear": gear,
		"consumables": consumables,
		"characters": characters,
		"mods": mods,
		"powers": powers
	};
	
	unsafeWindow.console.log("var data = " + JSON.stringify(data) + ";");
}

})();