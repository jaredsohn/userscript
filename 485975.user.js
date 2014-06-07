// ==UserScript==
// @name		eRepublik Stuff ++
// @version		2.2.22
// @namespace	http://userscripts.org/scripts/show/390674
// @require		http://code.jquery.com/jquery-2.1.0.min.js
// @include		http*://*www.erepublik.com/*
// @exclude		
/^http(.*)://www\.erepublik\.com/(.*)/(get-gold|loyalty/program|gold-bonus)(.*)/
// @exclude		http://www.erepublik.com/en/map
// @grant		GM_info
// @grant		GM_deleteValue
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_addStyle
// @grant		GM_xmlhttpRequest
// @grant		unsafeWindow
// ==/UserScript==
function initBattle(){var 
t=$(".country.left_side").html().split("<h3>"),e=t[1].split("</h3>"),i=e[0]
eRS.country==i&&(bonusCountry=!0),setDamageKills(),GM_addStyle("#collection_complete,.blockUI.blockOverlay,.blockUI 
blockMsg blockElement{display:none!important}")}function 
setDamageKills(){$j(document).ajaxSuccess(function(t,e,i){var 
a,n,o,r,s,l,d;(null!==i.url.match(/military\/fight-shoot$/)||null!=i.url.match(/military\/fight-shoot/)||null!=i.url.match(/military\/fight-shooot/)||null!=i.url.match(/military\/deploy-bomb/))&&(a=e.responseText,n=JSON.parse(a),o=n.message,r=n.error,r||"ENEMY_KILLED"!=o&&"OK"!=o||(s=0,l=0,d=0,null!=i.url.match(/military\/deploy-bomb/)?(weaponDamage=n.bomb.booster_id,s=n.bomb.damage):(s=n.user.givenDamage,l=n.user.earnedXp,1==n.oldEnemy.isNatural&&(d=1,s+=Math.floor(.1*s))),Kills+=1,Damage+=s,Hits+=l,setTimeout(function(){GM_setValue(eRS.citizenId+".killsToday"+date,Kills),GM_setValue(eRS.citizenId+".damageToday"+date,Damage),GM_setValue(eRS.citizenId+".hitsToday"+date,Hits)},0),ShowKillDamage(1),options.mercBT&&MercenaryBTUpdate(),1==bonusCountry&&1==options.TPmedal&&updateTP(s)))})}function 
coma(t){if(t>=1e3){t+=""
for(var e=/(\d+)(\d{3})/;e.test(t);)t=t.replace(e,"$1,$2")
return t}return t}function ShowKillDamage(t){var 
e=coma(Damage+Guerrilla)
1==t?$(".user_finances.NoKills").html('<strong style="padding: 3px; 
font-size: 12px; color: #666">Kills today: </strong><br><span 
style="color: #3c8fa7; float: right; padding-right: 3px; font-size: 
13px; font-weight: bold;">'+Kills+'</span><br><strong style="padding: 
3px; font-size: 12px; color: #666;">Damage today: </strong><br><span 
style="color: #3c8fa7; float: right; padding-right: 3px; font-size: 
13px; font-weight: bold; ">'+e+'</span><br><strong style="padding: 3px; 
font-size: 12px; color: #666">Hits today: </strong><br><span 
style="color: #3c8fa7; float: right; padding-right: 3px; font-size: 
13px; font-weight: 
bold;">'+Hits+"</span>"):$("#eRS_settings").before('<div style="1px 
solid #DFDFDF; margin-bottom: 5px;" class="user_finances 
NoKills"><strong style="padding: 3px; font-size: 12px; color: 
#666">Kills today: </strong><br><span style="color: #3c8fa7; float: 
right; padding-right: 3px; font-size: 13px; font-weight: 
bold;">'+Kills+'</span><br><strong style="padding: 3px; font-size: 12px; 
color: #666;">Damage today: </strong><br><span style="color: #3c8fa7; 
float: right; padding-right: 3px; font-size: 13px; font-weight: bold; 
">'+e+'</span><br><strong style="padding: 3px; font-size: 12px; color: 
#666">Hits today: </strong><br><span style="color: #3c8fa7; float: 
right; padding-right: 3px; font-size: 13px; font-weight: 
bold;">'+Hits+"</span></div>")}function last5Days(){var 
t,e,i,a,n,o,r,s,l,d,c,p,g,m=window.location.toString().split("/")
if(eRS.citizenId==m[6]){for(m=parseInt(date),e=0,a=0,o=0,s=0,d=0,p="",g=0;4>=g;g++)t=parseInt(GM_getValue(eRS.citizenId+".hitsToday"+(m-g),0)),i=parseInt(GM_getValue(eRS.citizenId+".killsToday"+(m-g),0)),n=parseInt(GM_getValue(eRS.citizenId+".damageToday"+(m-g),0)),r=parseInt(GM_getValue(eRS.citizenId+".guerrillaToday"+(m-g),0)),e+=t,a+=i,o+=n+r,s+=r,l=Math.floor(.1*(n+r)),d+=l,c=0==t?0:Math.floor((n+r)/t),p+='<tr 
class="current"><td style="color: #666666; font-size: 11px; width: 
230px; padding-left: 10px;">'+(m-g)+'</td><td style="color: #666666; 
font-size: 11px; width: 50px;">'+t+'</td><td style="color: #666666; 
font-size: 11px; width: 50px;">'+i+'</td><td style="color: #666666; 
font-size: 11px; width: 70px;">'+(n+r)+'</td><td style="color: #666666; 
font-size: 11px; width: 70px;">'+r+'</td><td style="color: #666666; 
font-size: 11px; width: 50px;">'+l+'</td><td style="color: #666666; 
font-size: 11px; width: 50px;">'+c+"</td></tr>"
p+='<tr class="current" style="font-weight: bold;"><td style="color: 
#999999; font-size: 11px; width: 230px; padding-right: 30px; text-align: 
right;">Total</td><td style="color: #999999; font-size: 
11px;">'+e+'</td><td style="color: #999999; font-size: 
11px;">'+a+'</td><td style="color: #999999; font-size: 11px; width: 
70px;">'+o+'</td><td style="color: #999999; font-size: 11px; width: 
70px;">'+s+'</td><td style="color: #999999; font-size: 11px; width: 
50px;">'+d+'</td><td style="color: #999999; font-size: 11px; width: 
50px;">&nbsp;</td></tr><tr class="current" style="font-weight: 
bold;"><td style="color: #999999; font-size: 11px; width: 230px; 
padding-right: 30px; text-align: right;">Average</td><td style="color: 
#999999; font-size: 11px;">'+Math.floor(e/5)+'</td><td style="color: 
#999999; font-size: 11px;">'+Math.floor(a/5)+'</td><td style="color: 
#999999; font-size: 11px; width: 70px;">'+Math.floor(o/5)+'</td><td 
style="color: #999999; font-size: 11px; width: 
70px;">'+Math.floor(s/5)+'</td><td style="color: #999999; font-size: 
11px; width: 50px;">'+Math.floor(d/5)+'</td><td style="color: #999999; 
font-size: 11px; width: 
50px;">&nbsp;</td></tr>',$(".citizen_military").eq(1).after('<div 
class="clear"></div><h3>Influence Done</h3><div id="eRS_InfInfo" 
class="citizen_military"><table id="influTable" border="0" width="100%" 
class="details"><thead><tr><th style="padding-left: 
10px;">eDay</th><th>Hits</th><th>Kills</th><th>Influence</th><th>Guerrilla</th><th>Rank</th><th>Av. 
hit</th></tr></thead><tbody>'+p+'</tbody></table></div><div 
class="clear"></div>')}}function 
TP(){GM_xmlhttpRequest({method:"GET",url:"http://www.erepublik.com/"+LANG+"/citizen/profile/"+eRS.citizenId,dataType:"html",onload:function(t){var 
e,a,n=t.responseText.replace(/src=/g,"tmpsrc=").replace(/\.css/g,"").replace(/\.js/g,"").replace(/url\(/g,""),o=parseFloat($(n).find(".citizen_military").eq(2).find(".mids").css("width").split("%")[0])
currentTP=parseFloat($(n).find(".citizen_military").eq(2).find("strong:last").text().split("/")[0].replace(/,/g,"").trim()),nextTP=parseFloat($(n).find(".citizen_military").eq(2).find("strong:last").text().split("/")[1].replace(/,/g,"").trim()),e=(nextTP-currentTP)/(100-o),doneTP=e*o,startTP=currentTP-doneTP,i=doneTP/(nextTP-startTP)*100,a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAClFBMVEUAAADk4c7b2crq6OHo593s6+Xe3NQXFgqclXjKxrWFdz3q6NvOu2nBvaze2sbCvqrT0L3KxazOv3jZ0J6poHu9tZqAeGKhmny5tqj29e6/uJj89dfe2srJvozy7didlnO9uqhoYUHW0bnZ1L/FvZ/BuH/o4bzy6KrCuI7KxKv58crSyJa1r5Hdz47Fun20qnzCw8jFuX/JwqNxZTHOybjm5NDKvHfk3buhlFzp5Mnb1Kyvo36up4nPzaXFu5K2sI99c0WSjHj9+OHb0qWRh1pgVzi7taD78sLbz5nd1a3ey3rIvIOxnT+Yj2Gtq5yLg2Wzq4zq2IDXzqHIr0K2qWmgmmvy56xMRSfv6L747K/q5MOrnmp2c1ZhVipuZ0xQSRl/cjdcVjumnHSzolKOfz/NvG799tJ2bUvl3rCKgWDgz3qtqJG6rGxnXTaclG6kmWPTxou6pETHvIvx6b717Lm/rmKajVCKejXCsWavnlJiViDdy3nMtEmjlld6aiG5qWa2p1+om2TgzoKejDnIwJjt5bRRRhmhkUOGfVaVgzVUSiN+ckCNf0LazIjlz2tkWi6Ph2E8MwrErkzg2a5bTxr26Z7cz5DXwVqRgT2xnkeWhj/58sPo255wZjmUilzx68eckmTm033Qx6XLuWh0a0KEcyewpXHr2IitljRXTin7+OdKQBlfTgjv3ox9c0f37sny7dOpo4jDtnn98av79Mzt1WV+cjjCrETUxYHZx3P++tutnlnQy6zEsFOZkW3p36zj1pTz45Ho37fHtm+8s5eoppm2roGQhVC6sX7WwmfRyJpORyfPvF5VSA7v2XfgyVvp5Mb+++m5qFWonnJtXx7cx2HEvqagiSqfmX7bvkhrZ1Xp6NxK2iFjAAAApHRSTlMAFRwJIAQoAQQl/jb/QQ4IVi3+jZQajTQTRW3+SJ1UiWQwNmuDm1hSOlQ0y4ehqXQx1kfyT/y9/eF3/UTjWK91+G+OyfVMe0XYc+t4arleklvu+oj78XWw5LzUZ6MVrM7u8q328OLq8We10MjhINj6/////////////////////////////////////////////////////////////////////fQ1zeMAAAJzSURBVDjLYqA2kNPmhjFZ2dhYMeSZnQ6rcEDZTAps7BgKBI40cilCmJzCIvyYNqh0rOsHK2DnVHXgxeIEo6Dj/mB9fLLNXXAFTJxwBUqhE8PFgTSjbn3DSkeYqDJANuIQhpZqSNGSttNxLBzCQgUtq8Xg2uwWyItyMLCrLWwoKt56pqcnUWRbfeuCNn24wXzyy1wU+DUCFxetKl67adZurondBa3lM9QRbmN0blqko7uwbJH0+g2VdXMv9ddOa10qpAWXZ1Xz2ni0capQ96mSVS3bC1dXVk3YX9AzDeFNDg11vyX1iytqhdYWN9RMbyvv2jh797IdKOHAp7e0s71pckvppMKtdbVV82aXFfAYICtglPJt56o8WVTEU3hz3vzysgPz5iQboAYiQBI6x8pW9G2evHfvnqmzdhTeOJjCiRbMmhOaJ00v3NR4ufd69oH2a30JLOgxeaKg+vzM7o5tdZksO2cdqjFGV8AStaGppnJd7ZUuNvas0tnbjdnQFMiYFvfNnLjvYF06M0NGwa6KqgB0K/bMuTppyq3imSvZGJjMpSvWiKDKi5oVzJ/eLJV3e84UGQYm0y2la/RQfWmWaildPUNQ9pBVvyAD54UtPGctONmRQhIw4Z1GJvMrLFgEeyfPzWUQNF9fXcWliZSaPXn02WX2F+ZzMwhPm8vJwGRVsrx8iqEATJ7dttebn4E7jWcGN4Ps1AlirMzaJctL3eS44dFpbQ/MI5IXqzvFOXJ27YvnYFWO8JBiZEe4gZ0DyJYsqeESZDbc3BHDwcBoIoqZa1giVyRJMFie6xTjwJEx3YOjYzkkw3xcMTUj7AJDZAAAzmW9T/Cx7IYAAAAASUVORK5CYII=",$("#total_damage").attr("style","bottom: 
40px!important;"),$("#player_rank").attr("style","bottom: 
140px!important;"),$("#player_rank").after('<div id="player_rank" 
class="tp_barr" style="bottom: 96px!important;"><div id="rank_icon" 
class="rank_icon" original-title="TP Medal" style="z-index: 
3!important;"><img alt="" src="'+a+'" style="width: 32px!important; 
height: 32px!important;"></div><div class="rank_holder"><b 
id="gained_rank2">&nbsp;</b><strong id="rank_max2" style="z-index:200" 
original-title="Next TP Medal at:&nbsp;'+coma(nextTP)+'"><span 
id="rank_min2">'+coma(currentTP)+' TP points</span> </strong><div 
style="width:'+i+'%" class="rank_bar" 
id="rank_status_gained2"></div><div style="width:0%" class="rank_bar 
gained" 
id="rank_status2"></div></div>'),$("#rank_max2").tipsy({gravity:"s"})}})}function 
updateTP(t){currentTP+=t,doneTP+=t
var e=doneTP/(nextTP-startTP)*100
$("#gained_rank2").text("+"+coma(t)),$("#gained_rank2").css("display","block"),$("#rank_status_gained2").css({width:e+"%"}),$("#rank_min2").text(""),$("#rank_min2").text(coma(currentTP)+" 
TP Points"),currentTP>=nextTP&&setTimeout(TP,2e3)}function 
KillExclamationMark(){$("#point").remove()}function 
NaturalEnemy(t){GM_xmlhttpRequest({method:"GET",url:"http://www.erepublik.com/"+LANG+"/country/military/"+eRS.country,dataType:"html",onload:function(e){{var 
i,a,n,o,r,s=e.responseText.replace(/src=/g,"tmpsrc=").replace(/\.css/g,"").replace(/\.js/g,"").replace(/url\(/g,""),l=s.split("nameholder"),d=l[1].split("</div>"),c=d[0].split('">')
c[1].trim()}$(s).find(".indent:eq(0) .attacker 
img").length>0&&(i=s.split("flagholder"),a=i[1].split('tmpsrc="'),n=a[1].split('"'),o=n[0].split("/"),r=o[6].split("."),neCountry=r[0].trim(),3==t?CheckAttacker():2==t?ShowNaturalEnemyBattle():$(".bod_listing 
li, #battle_listing .bod_listing li, #battle_listing .country_battles 
li, #battle_listing .victory_listing 
li").each(function(){ShowNaturalEnemyWar($(this))}))}})}function 
CheckAttacker(){if(0==unsafeWindow.SERVER_DATA.isResistance){var 
t=$(".country.right_side a 
img").attr("src").split("/")[6].split(".")[0].trim()
t==neCountry&&(bonusNE=!0)}}function ShowNaturalEnemyBattle(){var 
t=$(".country.right_side a 
img").attr("src").split("/")[6].split(".")[0].trim()
t==neCountry&&0==unsafeWindow.SERVER_DATA.isResistance&&$(".country.right_side 
a img").first().after('<img alt="" title="Natural enemy" 
src="'+neIcon+'" style="margin-top: -2px; position: absolute; 
margin-left: -9px;">')}function 
ShowNaturalEnemyMain(t){t.find(".side_flags").each(function(){if($(this).attr("src").split("/")[6].split(".")[0]==eRS.country){var 
t=$(this).parent()
$(this).parent().hasClass("opponent_holder")&&(t=$(this).parent().parent()),$(t).find('img[src*="'+neCountry+'"]').each(function(){if(void 
0==$(t).find('img[class*="resistance_sign"]').attr("title")){var e='<img 
alt="" title="Natural enemy" src="'+neIcon+'" class="natural_sign">'
$(this).before(e),$(this).prev().addClass(1<$(this).index()?"two":"one")}})}})}function 
ShowNaturalEnemyWar(t){t.find(".side_flags").each(function(){if($(this).attr("src").split("/")[6].split(".")[0]==eRS.country){var 
t=$(this).parent()
$(this).parent().hasClass("opponent_holder")&&(t=$(this).parent().parent()),$(t).find('img[src*="'+neCountry+'"]').each(function(){if($(this).parent().parent().hasClass("victory_listing")&&($(this).wrap('<div 
class="opponent_holder">'),t=$(this).parent().parent()),void 
0==$(t).find('img[class*="resistance_sign"]').attr("title")){var e='<img 
alt="" title="Natural enemy" src="'+neIcon+'" class="natural_sign">'
$(this).before(e),$(this).prev().addClass($(this).parent().hasClass("opponent_holder")?"two":"one")}})}})}function 
MaxRecoverEnergy(){$("#maxRecover").remove()
var 
t=options.autoEnergyRecover&&4==window.location.href.split("/").length&&"undefined"!=typeof 
EnergyToRecover?EnergyToRecover:$(".tooltip_health_limit").text()
$("#current_health").after('<strong id="maxRecover" 
style="text-align:right;margin-right:5px">'+t+"</strong>"),setTimeout(MaxRecoverEnergy,1e3)}function 
StorageInventory(){GM_xmlhttpRequest({method:"GET",url:"http://www.erepublik.com/"+LANG+"/economy/inventory",dataType:"html",onload:function(t){var 
e,i,a,n,o,r,s,l,d,c,p,g,m,u,f,A,h,y,b,x,v,w,_,k,S,C,R,B,T,M,I=t.responseText.replace(/src=/g,"tmpsrc=").replace(/\.css/g,"").replace(/\.js/g,"").replace(/url\(/g,"")
if(options.showStorageInv){for(e=$.parseJSON(I.split("var itemAmounts = 
")[1].split("var 
itemPartials")[0].trim().split(";")[0]),i=$.parseJSON(I.split("var 
itemPartials = ")[1].split("var 
countryList")[0].trim().split(";")[0]),a=[],n="",o="enabled",d=1;3>=d;d++)for(c=1;8>=c;c++)7>=c?(p="undefined"==typeof 
e[d][c]?0:e[d][c],o=0!=p?"enabled":"disabled",p=coma(p),1==d&&(n=6==c?"Food 
quality Q6 <br> Energy restore 12/use":7==c?"Food quality Q7 <br> Energy 
restore 20/use":"Food quality Q"+c+" <br> Energy restore 
"+2*c+"/use"),2==d&&(n=6==c?"Weapon quality Q6 <br> Fire power: 120 - 
Durability: 6 uses":7==c?"Weapon quality Q7 <br> Fire power: 200 - 
Durability: 10 uses":"Weapon quality Q"+c+" <br> Fire power: "+20*c+" - 
Durability: "+c+" uses"),3==d&&(n="Moving ticket quality Q"+c+" <br> 
Energy: "+(5-c)+"/use - Moving distance: "+c+" 
zone(s)"),"undefined"!=typeof i[d][c]&&0!=i[d][c]&&(n+="<br>1 partially 
used. Durability: "+i[d][c]+" uses"),(2>=d||3==d&&5>=c)&&a.push('<li 
class="first '+o+'" original-title="'+n+'"><img 
src="'+itemicons[d][c]+'" 
alt=""><br><strong>'+p+"</strong></li>"),n=""):1==d&&8==c?(p="undefined"==typeof 
e[d][c+2]?0:e[d][c+2],o=0!=p?"enabled":"disabled",p=coma(p),n="Energy 
Bar <br> Energy restore 100/energy bar",a.push('<li class="first '+o+'" 
'+r+' original-title="'+n+'"><img 
src="data:image/png;base64,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" 
alt=""><br><strong>'+p+"</strong></li>"),n="",p="undefined"==typeof 
e[d][c+3]?0:e[d][c+3],o=0!=p?"enabled":"disabled",p=coma(p),n="Double 
Energy Bar <br> Energy restore 200/energy bar",a.push('<li class="first 
'+o+'" '+r+' original-title="'+n+'"><img 
src="data:image/png;base64,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" 
alt=""><br><strong>'+p+"</strong></li>"),n=""):3==d&&8==c&&(p="undefined"==typeof 
e[d-1][c+2]?0:e[d-1][c+2],o=0!=p?"enabled":"disabled",p=coma(p),n="Bazooka<br>Defeat 
enemy with one hit<br>Damage: 10,000 - Durability: 3 
uses","undefined"!=typeof i[d-1][c+2]&&0!=i[d-1][c+2]&&(n+="<br>1 
partially used. Durability: "+i[d-1][c+2]+" uses"),a.push('<li 
class="center '+o+'" '+s+' original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAAAllBMVEUAAAAXGRYCAwIDAwMAAAACAwIAAAABAQEICQgKCgoBAQEwMzBscWkyNTE4OzZXW1N0eHJna2QuMS1TV1GYm5hqbGd4fXI/RT1ZYFY/RDyMkYiYnZRiaF2kqKA1OTHDyMJtc2h0e3DQ0s6Rl4+GjIK0ubJITkSAhn0iJB5QVUtnbmItLyp7f3iusqu9wbsPEA6JgZWMkrgwHd3RAAAAGHRSTlMACyoxECIIGQEEOFkrQ4GQkWJr4WLJ9bMNwug3AAACgUlEQVRIx+3Ta2+iQBQG4KIiIgJe1naYGzPOcAfb/f9/bl8ITVOJLt1kv/l+JHnyHg6Hl2ee+U/ZnV8Pm39gnKhi/0PkH06EcG3p7gdF4W5XJZVuKTVibqETvCVIXudaGHHN5rndXgJVGLEueJZeBD38recXEihSNjKvlS40bS9dS87+wy2EMec151xWeZIXpO+zlEWL5eaBco8Vr7UVjNgCq9c1J1Rn6fFt+6grPKlW9arVxrS1yJiyVAssxF28bO71OYckr4geXoiZgtIsFTq95kV6jrh1p3AX7w+Hw4kTvJgirWHMWGpEl15Zm2ZRRZViryvfv3FhQmxLIAikLRIjGKUsg2IFTfcLpXTP1jdulzRJ8v5e2oKrwtCCaMEEvtdFBLGygffxYbJ4tXbWvv/NxVLKd0QKahi1hraDunbnF69JTuHHbxY7q5Vz0+dXcGUf1RmL+TIzKBN7jldKHkanYOV5cOtvfU5NSN7gpGTODOvSS0cvaSZU4K88t5R1BASGwhtHKdV5VeE6dNc3tTQVxdGDcreltJHnDg593+bcsOwqcE1wPL2knSWC9iO6SCCraAE2uNt97lGi8jyRTSWujFdFvOy7Fsg2CKGQiUJ2cF0iZVPmxh6PUQgFg6DRm5Z9DYo9qAYLJZGHhQONCgIZ1TRhJihPGnyroWmJjAoCGdU0AauTpmwS1wUaGZSDnj53fgQ8DnguZRK6y+V2uwVzXXSh5w4ZHe7OC6LjwoVCwNAFtXmkUOevHcdZeYuR9WVQUzR1UC7YV9mg5rrlJxv+0LkOEApsWPtsB4iMBzXTDXByh3MKAZFezWaAfg+Rz+3PL4RExrL5EHI8xGeeuZc/JwFHyim6QbMAAAAASUVORK5CYII=" 
alt=""><br><strong>'+p+"</strong></li>"),n="")
switch(g=GetDivision()){case 1:m=75e3
break
case 2:m=375e3
break
case 3:m=75e4
break
case 4:m=15e5}if(u="undefined"==typeof 
e[2][parseInt("1"+g)]?0:e[2][parseInt("1"+g)],o=0!=u?"enabled":"disabled",n="Bazooka 
booster<br>Damage: +"+coma(1e4*g)+" - Durability: 3 uses",a.push('<li 
class="last '+o+'" original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAAAtFBMVEUAAAANCQgDBANfLzMuBgY3DA0NDAoOAQEXMz4FBgUBAQEDAwIbEQ8NCwoaGxxnEhKeGhp8ERHiGRnbGhpVbnVXBQUoQkyFFBQNJS4jPEY2SlI5AwMHHSUWMzwrQ0xSBQVDBwc3DxF0hYyRn6NBWmJieX9VbHOdHByMDw5yBwcbBggyIygIBAUjGR1LZW5zGRlWExYgMDnhWE+3JSOrERGRKCf1d21aODt0YmXJPjleU1fDW1HAc1kOAAAAGHRSTlMAf0cxDSCRA380GSmocPFTNnVanXbZ3p+6Q7ndAAABfUlEQVRIx+3Vy3KCMBSAYUEg5VqvLRBDEgUBkTuKl/d/rwKLbrrhsHDamf77b5KTMGH234uaP5/5HM7e62sVRQsok6Pqeo+LSIYxtI2qKqSYboHDJW3bJn2wBTdB17Er2IDcR7D3HWITz3sDOWd/yBx7Z7twdxycO835v9zROKKn8/nEMMyx/FIMjk/d57T1OJ82H8avvXf3Rd8nmeqCg987b4IjU1wWeINzgM71nbIkJXS+z7qqw65LuAS5eVTdY8poHkrA5/oSUoxpuAC/87dHuUtl+G9lHzg7ewZ3QdY5BHe+69kEzN6bMC+KIocOuGyamHbNoetRzhjnHHgPaJV7bV2SpJZAbhUV2e3qkiReIwhrGB9ciuP1WIQQWlLM/cfdISnDsYTQKCZpsoA757Cyd1zXJDSK6aqCGbdSbFm9E1UNoRFOVlWDWYJgYUVRDIZFVZbGOdE0hI6kSg+NkQ51+xRF0xSGTFMUdQmNcf3B6Op3ujb2QH80+7t9ATNXODEhiu0fAAAAAElFTkSuQmCC" 
alt=""><br><strong>'+coma(u)+"</strong></li>"),n="Food raw 
material",f="undefined"==typeof 
e[7][1]?0:e[7][1],o=0!=f?"enabled":"disabled",f=coma(f),a.push('<li 
class="last '+o+'" original-title="'+n+'"><img src="'+frmicon+'" 
alt=""><br><strong>'+f+"</strong></li>"),n="Weapon raw 
material",A="undefined"==typeof 
e[12][1]?0:e[12][1],o=0!=A?"enabled":"disabled",A=coma(A),a.push('<li 
class="last '+o+'" '+l+' original-title="'+n+'"><img src="'+wrmicon+'" 
alt=""><br><strong>'+A+"</strong></li>"),h=0,y=0,b=0,x=0,v=0,-1!=I.indexOf("+50,000 
Damage")&&(h="undefined"==typeof 
e[2][141]?0:e[2][141]),-1!=I.indexOf("+250,000 
Damage")&&(y="undefined"==typeof 
e[2][141]?0:e[2][141]),-1!=I.indexOf("+500,000 
Damage")&&(b="undefined"==typeof 
e[2][141]?0:e[2][141]),-1!=I.indexOf("+1,750,000 
Damage")&&(x="undefined"==typeof 
e[2][141]?0:e[2][141]),-1!=I.indexOf("+2,500,000 
Damage")&&(v="undefined"==typeof 
e[2][141]?0:e[2][141]),o=0!=h?"enabled":"disabled",n="Rocket quality 
Q1<br>Damage: 50,000 - Durability: 1 use",a.push('<li class="last '+o+'" 
original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABIFBMVEUAAAATFSETFiMTFSETFSEnEhYbFRkdExI5FRIvHRVdGgFPGAESFSBXGwAUFiMTFyFdGABTGwDtnB5iGQDqjxoUFyUUFiTfbRjvryhnGwFbOA+qSB2GHwacJxBNFQLdeBlwMxZ7HACAHgDthBv/thcSFSGvKQjtQDu7Lg3nOi6DIQBiGwH5TFDVNB5tHAB5HQBbFgDcMBzkeRcaHC/HLQzEMR+NJASTIgP0REb7U1wlJ0DLNRsxMlObJgQjJTHfNy3hihP5uR89O2XOLg2lJQPvpRUVIUv/zSD/2yn6qRX1lA/olQ6OTwetQw/Sj0DRUEkDCyfagBz7wh1WWEvHegZvPQT4WHGyaQb/zSujWQrIZRX2ulLSbFCdeBrIvES7qD1QXOCwAAAAJXRSTlMAYPBzRB4oBRcMmDOjVILieosbaIHRljgLy9RsUMTi1KuI6JNfca1qVgAAAi5JREFUSMft1sd22kAUBmABQkiiQ6iOHTuJBhXUABU6GIzpmB6XJO//FhkBIVnJM975HP8rbT7duaMpIj7yHhMgGExBB5M311/Fy89YZcKsJJqA5w3jAoMF89ut2O/JhULByKCzpCZN948z2S7aAqCRWUxSrelm8rSoFgvyJTKLKyLgwX7UnS9sHSBPCwtZpddezJ+fXwzZYtAUzSom6MlCdfcy705m1g0a87MSZO1CsbrbLTrjveRHqxbX4CAdVq3a7dlmGg+gzaSm9h1WhDMp6GCbR2NJSenzOmRFGzLeylFILqwpFi8L9kHJwMwFEZkkgnobri1BkCtNkaXctsk5QQk2B8sJgq5XgKkk3RYY8+/pSlOaoC7Leq8CLDUXZFxYxHcueKFpJjDq9ToPmqISC7i1FuLI01P2W2eqQmY4SpXChEsYyE5vTXzp3G1mfOWglJjrIqGiHBciD11kIButllBZqsK6dkaQ3CFRH0Vklp277v2P0ZOpSnCIrvFw5+Q7I8iGq0np8SpOI7OH1k9YbLgal0qfmNcWCO33/Ad/D4fdCWRZlC0TObFya7D+de9US6Bt0dCR1Rq3g/V8jMhgqJT3yG4Hg/XyewLj7I+UW5A1yg+t6yzWcZ6qNRq1svMd8e6OdK3WggzGj1WPprzcMSTm/UaenI+gsUoy0aNL05EQDmT+DjTl9bxpoGnMDhnPsT8/gRnaB5mHJrBDeb3OgYEfH/m2fxSG+Mh7yR974mLFsuWe2wAAAABJRU5ErkJggg==" 
alt=""><br><strong>'+h+"</strong></li>"),o=0!=y?"enabled":"disabled",n="Rocket 
quality Q2<br>Damage: 250,000 - Durability: 1 use",a.push('<li 
class="last '+o+'" original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABNVBMVEUAAAATFSESFSEbFhkUERsTFSETFSEiFRIkFRwxHw9VIQITFSJoGQJNGQJeFwBZGgFTHAMUGCTelSJlGQDtnR4TFiETFSETFiHphxnyoBxTJAFnPg11HQCcJhCrSB3IUxvdeBl7HAATFiF7HAD/kRRmSSgTFSBxHAC+MBMTFicbHS9cFgDKLw2uKAXrPTV8IQHbOiqRIgPwQUD6TFIhJT47OWG2KwyoKgjzR0v1phfliRftlwmJIQCcJQTbMhlmHALTMBr/zyKTUAT6ujAtLlDLNCXleRhsPATJbgjlMyUFDSbggxn2thn+2imqRw7DXRarcAnGZD3aeBn7wRzxjxaESQjJiBVSJAiOLhH/qQS3RjDCX1DpnEkOHVDCskBPWVGkWQrUS1TYhwDZiE01OjRmVkD/v10NVDaVAAAAJnRSTlMAQZspHG31BBMLin5RNB6Y2tQLcRtMWuKLcmHM8cRsMtSIs6xGqtDPt/8AAAJNSURBVEjH7dVXd6JAFAdwBCWoscfoaspmCyAd7KKA2DXW2NOT3f3+H2Fn1aNv7OBbzsn/iZcfd+7MXEA+8xFzgoRtCr8vcvP9onx5aqtMIqCLMp+jafrKBvMFWy0xz2mCIDSu4VlisTBHL3lDKRSEHAHNPKCY2Vbbr+m0YlzCs8VsNFgOi7X3V0XjobclQFHm29tw/f6nNm4YshtOEQFKzuXbq+L4/qGmDuQbyEML6GXekNal2sP9uKSOdCcc87Aiz0lKARQrrQdt03MC5SIsOLWOkk4XxuqqvWwl4ViCpfK0pqSBk4bqfBbEoNwpC/bEEArpgiJ0aNNM+iCZXgbNCYogdAyuonswqzHZx8eC5mhJEjqaxvFlKmK1le7DU5ClKrmGJGkcx8ti0Gd14F7vvuAVy8o5utHgaL4iUh63VWvfyOjuKRzvzUSe5migytSF5aV0o6Rj99azr6XifJDj6HylLFIRvxXDYiSJOjbTdQ3Y7V0P1JIpKmDZGeIgN4m5MORHD7BqtThcUjr7n7lxkfskSyvA+nfTyUvQ47dm5wfWZUa3VcDU5iQOdtE6TqfrAH899fu1abMZD8MMqHerUgzz+PxUVZvNL2cITJzolmWy2cfn+bQHGFywEJ7asGw983sCwQ6X08swdcCYLvMzbOtzHsrU6xkmleqGEDsh0EyGASxFkk5b9QgM/6dAHDb/bw5yGy9C2Crpjm0dSnhRO5DAdwVDuOuohaI2OyS2d9wFFmkTgiuOnxOI7WA4Hj1BjogreowCp4985qPkL2zxaOcdKlVjAAAAAElFTkSuQmCC" 
alt=""><br><strong>'+y+"</strong></li>"),o=0!=b?"enabled":"disabled",n="Rocket 
quality Q3<br>Damage: 500,000 - Durability: 1 use",a.push('<li 
class="last '+o+'" original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABRFBMVEUAAAATFSETFSEbFhogExVvQhcSFSEfFREUFiIUEhtfFQATFSFNHQITFSDwpB9YHwITFSETFiNaFwDqjxpZIgJaIQFrGQBNJQYSFSAWGSZZMAOcJhCGHwbHUxv/phXceBlrQxJMFgW6MiWAHwB7HABlSCmeWBjthBsTFSJrHwJhGAF7HQDdNiIfIjnjeRefJgOvKAW2KgxVFwLghRj6uB6QVAMaGy7HaAu8MA7LLwztPziRIgMyMVP1RUb9pBC+VDw9O2XCMhr/ziHPNSLvphjtjRDxmBFrQAGkMRDAVRjYfwDmlAGHIgAmKET+2yn8wSDUMBXRby2PLw/5rAd1MAfWQkyycACVRQjnl0LkPjVWWEvILyylVglZKQf/xUKsRhCAQAazQirdh0LCY1MCByMtLykNHVHFnjPbuUTHggn9TledeBubJNDPAAAAKHRSTlMAQZspDAjvBBQcG3M0YhmSToJSgXZlh5jD3tLEUDJS1MrXX+isqnqTq+m/gQAAAkxJREFUSMftlFdX4lAUhS8JgSAg4Ch2R6emIaQZkoBIk94EBMWhztjm/7/PpTpP8V7fXMvv/cs++5x1Az54jzgBhWmsebaC376W9w+wYra2Od6MiNFk8guG5tnL5VphvW4YRu8QXduSfqnXd/l0PB6/EdeQtc1cq9UplrT287OR3kfWtqdhV9q5Mm7HhcgBusZ2isVCYtx/bPTqph1x+9s5tZPXmpnJpKuUBmYQUfNJw+tiYTTudyeJ7OU160LTghwPm2UTiW5NHg001UehbZLjI2KhpHQTicumdtXac6LdjWPDUaHdyCjyqFB6Gp6QSN4Gx5pi3Yi3G81zLd9Rjz2IGleO6IIRN3paqTjkfKTVM1nhkTgeTnlzIwj1vKrmNq1W+XJV6kRiw2JaEARdF012z2N18IB7tecfkmSKyXRaj0bCPB+0W1XbYfzLtJ+yykeSehJaZZbdABbYCca2+Or6ZznzNBD1aD5c5tlNy6dD7jIMYZu1OIRasybDLJNnfZbNgI2Z4XCT4EjOZpRUKlO44jlpA1jiZVYcy+dQq9ayp3eS75XX7X/Rfv/5q6T61drl6eknygmscbm8/4kP1aoy1dbB69CBhXYWur99TKFqMJKYa5XYxf3tQxZRg5A7jmla7OKiErptHEENEQoEZlrsjAl9p7B+57uVWKxyBsfdBTjQRCgUghrEhZVHkw5mjg1gQdkWnhvQWJH2RSBBBwgckV4OuuPwYlVcDkpgNrR75/1cABPaDTUvDbAhHQ6/E7wBtx9TWF4ffPBe+Ae6I3ACf1bFMAAAAABJRU5ErkJggg==" 
alt=""><br><strong>'+b+"</strong></li>"),o=0!=x?"enabled":"disabled",n="Rocket 
quality Q4<br>Damage: 1,750,000 - Durability: 1 use",a.push('<li 
class="last '+o+'" original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABQVBMVEUAAAATFSEaFRlSJQQUERsjFh8SFSAuFBE9KxgTFSETFiJNHgJUIQTvpB/rjRpYIQNgOAlaHgATFSETFiESFSAUFiMVGSZOGARLHwRTJAFyJACqSB2GHwXIUxv/pxSdJxDdeBlxMxeBHwASFCATFSIcHzNfFgC4LA6sKAfhhBf/pgTANBfjdxdoIgXsQDv8uSLUfAu1bQIkJ0IyMlR7HQD/zSLKNSX2rxvPMBHVMieHUATLcge0RDA9O2WHIACQIgRgOAJcJgduQAGtQRh5LgmWRQjEYg/ylwOcJgXwpRX+2ynmjB1OIAeiVAiPLBD3S1DwigqTVwCZNRDYhQDkkkG9WEfolQLEWjX7wh3vmRfDWBqfaQyAQAbIaEcFCy0tLioNHVBOWVHRjEHUS1PtrEr/wUy2VRNmVT+8qT3IvEMRFB/AZ7a1AAAAI3RSTlMAmyiYHBR0BQxE6jQdGYV2z1JaZ8OE3t+KYodsUDJSxNSr6Nzd+1wAAAJXSURBVEjH7ZXXctpAFIaFQEICY8CmGbc4rDoCid5M7810HMA9ccr7P0AkIM6dsps7z/jTjO6+/c/ZI+1iH7xHrNqDxoHdGbz6XLw8Q4o5MbOJEs9xknSKoNld1Wqdz2QikUjqHF476VfG6oDPRm5uIhwBrTnL1Xojv8i/aFr2ElozV3LqYNgUo88vkSx/Bq2V5cZ0uirMvn29S2VKFOTum6vjxqQppu/ms+iiVgrCav2NqrwWelrYfNRSZQucFizLdVUcLbWwXqGWzwWsUNN29nPrSW0Rnc2XLTE/rLuscHNjK2tFKSzTUaGwGuU3fhzKc7NysTEVhcJSFJuTxthlh9TYIs81W6JSay6UjWzGjX6TN+wsm+ClbCrfar0OB+Oq02grqb8r+Fm5zaWyWUmdqvWKy240cJJ8CzztsyVOSqUy3CSXKwcoo9Y8gP6TeyjktCozEse3i5WyGzOAMgF6v6rjk9BRalxGtxKs88BIw30AmOhtF+ealr4VJL5dSshmw84wGoBQKARsJI5dCL1OOplMr4YJlnVjhhwD3dNfwCWInWiye9sLD/yBA2PtCOhs3V8P63RS076Ew4faLhpjseiBu1LvH350u1Fdc2D/hvDuK2WYx6efSUhNjzTttFj8+vHpeSRoGhy4x7bTrmPMd+XCgXD2ewGjaXHmnrmikI5zXywejzEAAB+GAmFiYgyznaIFKY/AbWAHjXi/0ds0AEiMQIqk9oEmwmtCESmwxwOOEQvdByJ2SO2+cdKCIUKQmnZEYMjgNpt+YKBD0tj/YKWwD94LvwHHzmi2jtqstgAAAABJRU5ErkJggg==" 
alt=""><br><strong>'+x+"</strong></li>"),o=0!=v?"enabled":"disabled",n="Rocket 
quality Q5<br>Damage: 2,500,000 - Durability: 1 use",a.push('<li 
class="last '+o+'" original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABOFBMVEUAAABXJgUTFSFnIgUTFSJGHRETFSE3GA8YFBw4Gg8UFiMUFiLldSLulB1hIgHlgRh0MAETFSATFSEUFyRHGw5ZLwZUHAFKHANTKQRoPAIUFiK2Lx/ghBdaNgFVJAhRLwDbgxaWIQeoYBfqiB0SFSASFyocHjG4aQH5uBeKIQT1lQoeIztsGQDoPDTwpQ10RAGQQQm8egCzKg3kkA9WHgRcKwR6PAOqRBPohwoyM1bmgRf4S09MIQizOiDGZQ1uNwV6LQixVQv+sxv+ogCTMhAqLEg+PGb/0yKqJw3KMRubIwTrlyTQaxt/SgH6v0CIUgC7Sx7cgAP4rTa3RkB/aDj/yCH72DNIFAO+KwvgdCSgYAXVglLJcwPeiC/SfwHIZDa+UTMYLVLOPDfkNRiBgU5qUh7QVlu5W1lEBT8+AAAAJHRSTlMAOOtYQQZfDiQZplETKne7jnOI3KQnjmjc8DR9mUvB9t63st6myGXtAAACFElEQVRIx+3W13LaQBSAYVElQYLBYMCOS4pAvQKS6N30Xk23nfL+b5AdIpxLdq8ymfF/rW/Ozh5dLPbev8zlQjc46fD5HYjQ5fCz7XYz/wlN+VJCW3sVxRcUh9se5B67fBWz2ZYNgTlyqZVK5wETNRKBpYolZSRtf2bF1heEC8kN6HKtO+6vX8SmD9rd5VLKzuxO1v1KocnisMyW6im1AjNe/3qqJpQQrLvKFeldebLtj/f5girD3iYZTZZoTtpPthWuXNP9LkgWLg5qhlkZ7yej6qYYJSA3EFno6mZ46FS4YZ5eXdug7wScssodDmZ1pJSgGf4gDxTDZMy8saPle1iGhZI9dWMMTalQK8r+K1gWTgq6Wh0ZBq3quQgJvfCFwLbLCY4u6fK17dy+idMHH74mBa2llVW6l7w/OyxAkRa7SKzYZWvJ6gP5/L/sptxvTJIKmtZkhegdBPNY7DYhMbPOkBWEMAHBQB4neZzGNGadrrKIYBDMKvSZqzCNBpPp3kIsLUC99YOZzQF7uvh4nnmpv8Wm8zlg3yAYRhDuk4rzz9/7XKYDGExkwGL1x/TzNMMBBgkvLfaY5vkpYNDQ6w7G+TRggBMYSs54PV2Px2IU5URyhIfnj4y6xNAGeo8MhOEEjgDx0yYJt+cGQ+jGcsEg2lEJ+x9nd2NoOe1H5kR+MwBoMUToRWfWFi2GOpDA3vs/+g04OmAL4H/nJgAAAABJRU5ErkJggg==" 
alt=""><br><strong>'+v+"</strong></li>"),n="Small bomb<br>Damage: 
"+coma(m)+" - Durability: 1 
use",-1!=I.indexOf("/999/21.png")?(w=parseInt(I.split("/999/21.png")[1].split("</strong>")[0].split('">')[1].trim()),n+="<br>"+I.split("/999/21.png")[2].split('class="extra"')[1].split("<span>")[1].split("</span>")[0]):w=0,o=0!=w?"enabled":"disabled",w=coma(w),a.push('<li 
class="last '+o+'" original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABZVBMVEUAAAB3HRspFBhbKys1JSq4Ix0YDREtHR86Dw5VHR0WCQ4VCg57JiN5HRktHyU2LDE9MTV0Ih4tFxwvJSskExk6JSgaDxR+Ix8zGx9FPT+DIBxXDg+QLSs5LTJrDQt/IB2TJCJYVlelIR1+hINHDg1XEBBIQEKFJyJLKyxUUlFveHaqtbT////7//vm7Oe4v7lYUVLx9vBRS0yEJCGorKjq8u2TKSXW3NZgLy7O1M1BODv1/PTDysN1dHJ/fXtlZGNNREZqbmtfWVmuta0+MzeBhYDd4tyeoJ3I0cueLCdHQ0SKiYazu7OKJCDg6OGXmpZzHhs6LTJiX1+HkYxHMTO8wryQlpGOj4txb22BHBp4DgxZJCWnpqLHPDdaPj+GNDNCISN7JyXWZl/kVEz/lImpu7TVRUBpDQxLDw6RFxbsbGL/w7j/s6j/29F1QkBvJiSrNC+jHRr/6uKkhIFmVVOKcm/gdG4Pp+vLAAAALHRSTlMAYT47gw0gBBAdKDEo4XbJonlUXUi6F/qV8U3r1t6di5bibJOAa9ez6HrZgdUpvzUAAAM2SURBVEjH7VVXd9NgDP2StHFGQ0sDhQ5a9pTteNtJvLL3Hk0zundL2b8fBXiOHd44h/ui70H3XOlKOh/5j79FMEjNk079Sacig6V5ePeFxd+xUcSHaywJ8tqv2Cjue93TAo9k9b3vV5Sb9gu/6yqLQ1tRXvjeyMWDlpYT3xHy9L4zzScflpIArFr9NCylE/h6tlVtOFcZETptDjijUTzMZHM0wClfHXhcdKeW0gAVtSp0zApHQ81W5UfOti5GJu1RQdPvZDWerQHQoiVUPcSZt9lK0El9gnK8jX0WbLUoBFxM4W2bBsm8E4Z8ms2Pkr3YvuxCjoTQQ8ZQd3YO7BrNdHV+Ih8GXfAW+GQt+9ZHverUOZqW2hNBuO+C5o3V88a6f8qvcAmONVVh20V3a/F6IhkLYZvN3STDsOYw4iMu8NBWuN4KPqJNI4e0Dlri4gRX+QpdSOEN+EspPc/uNpdIcGfReQbxsiT1V6a6LVbrt+JhQt4cPnDkPTY1utvC5HtWnUkUUlFCNgbfCh98npmaUWtES2WU88bRlFzdCuIJq6dQ+BiZxfPHswywsQeEepISGa6bWiDEc2fSUG5szJx4SwMui3L3Sn2Fy/WsEPImo9zpbLlVSwTo4uxCTb3LMRX7HkGeAbVvM+WCGYPBa10m1HJMZGitbK1NaxAhr85c65UUHk3a8pKFeFkBKW1O5fwxsb4yc6uDB1kacrsPia+5yyZAK8dxR6nXafb17HV5uSePpLwVpp5glSCJqccEDcpKeYepb45Pjvb5ZSpa6msAmjGVC6cU5ZnDdu5dfbn5fOEPZnSsMpHG2aFBIt33EgfeyfX43Ite5msAipFZwyp1UNaJA7aOx9th9DKLrtJiDOVCsRwYjju99Bwr8mXMtARQ0DMhXLY8yrn7/pb5ngIgtXk0M6oD6Kvu/q8D/jQBULFRLnDxFdj1gCvey/PBxwKttXns7kHxx9eYO7nA5uXZ2f73npnBy311dPvpsbvuwufjk9uTz8POAuZvHB1tY3DF2zu+/nJzdv5wmr+I/rpEaO/q9vr48iJI5oN/cHVzfLnpJ3OC2jobR1YDZG74nnoo8h//Cn4CaNOcOh5G0n4AAAAASUVORK5CYII=" 
alt=""><br><strong>'+w+"</strong></li>"),n="Big bomb<br>Damage: 
5,000,000 - Durability: 1 
use",-1!=I.indexOf("/999/22.png")?(_=parseInt(I.split("/999/22.png")[1].split("</strong>")[0].split('">')[1].trim()),n+="<br>"+I.split("/999/22.png")[2].split('class="extra"')[1].split("<span>")[1].split("</span>")[0]):_=0,o=0!=_?"enabled":"disabled",_=coma(_),a.push('<li 
class="last '+o+'" original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABgFBMVEUAAABQPBdTOxOzmhNENBlIOiJFMxhINxtXQBQ9LBZFMRVDLxd9YBRELxVNNxZLNhg6JB9VPRiKahWigxRQPBVLNRhoURGFaRpsVBWRcxMkJx5xURUwLR1vWA3CmBRPOBVWPxZoTg43KwdeRhiBYhUWEQY/LBcxKAVdQhN2WhIcFQWTdBWaeBBKLxUmHQcrHwZFOAZYRxANCAQhFwstIwM8MgIvIg5wVBFTPRZQOg5iShRKOwtGMxJ3XhF3Vh0aDw2ohxM3JxiEZxNSQwlqUxOjgBHPpBXYrxn1ziL30DQvHxpaPQ2NbhRpQBhANAqMaBeaaRqvixI9MBW+mhPHoBLuwx0YFBgjHxT47Mn/7jL/945dNBg8IiNTPCJySxVmThrhtxFkWjH24aKoii787rf733y3jxT//8VINhqPbyuNXBcrKij/3yLruBZ6cULivkHtzmOXhEdMRDP/+1b//+CDSBqgfSnNjxngnhX90yTz5L2zpD6zroesnXiBel7EwaQnajMFAAAAH3RSTlMAjNUOLQg6EB4CT76226vvZHMzRmF7kXVgh3Tm2cRoegwy7QAAAyZJREFUSMftldVy21AURc2W4yRN0jZJUbpistgyMzPFGGbmlOnXq77Xkd2nTqfrfc3ZR3O0r+U//xquVc8fWB5olll22w3V6XJPbDmX3oIIGmFmV12Q9bVjUs29kj+S+xqfT6aZcPbV0qTacy4XPO/vX1wW8h+adDgMOSdabTHL5/q929Ho5rrw8eOHs+hr61O7uQeBEFMEYHT8+WDvptC9PEOF1OYLj7kniz0dHB0OBoPPe4clHhVFtoytmE10PkMJJXO0dr13MBgcH9z6KVRjhfL2UxNvNqwSseKn7vXh3sHDw7c2JfkpTVVPTD2ggkK3+Kl0c3h8/PVOj0hSBhXYxILZ57SFkmuFYrFUuh/dJlTZH8kaHiE+MTubGZDs5Lul0nDI7X7vsdLVtp9i0a2ay8RzyFzHGDgc8uiPhy/K7pWxYIZv1rweMw9vdfIXw6SmfB3df2mjfjSW7+A12GFyZtYAl7y86NQpkdi/39c1St7ZyTW21udNgi5jjdZOS6IiFHEX92FoZq3b4rh3tVePBnW+lAGexP2ahKJXdwqJJNI7azmuevZufeHRmC+XA4isCX4/ursrEmyiFz9K8tVmcz2xsfJm8ZGBziWvzmoUJcuo3kcxLMvxXKNZU5QyHsOQecgz1nyus4JYr1OUvnn6Ho9VeY7fYgl1YxvPIghidbjHZX0iEIImioL0fv/0tMHxuUCip/s2kDSDIUgQnpv5/RHYZ4MqQbAElW5VcTzN5wB7nvKtb5zEcGBosI+cG1OCOJ1QFBE0cIYJMBwgzk8qcZgsI+kAhsBw9Dk07ud9YUupIQaAAABMheijFXzbR5bhAI3R8JPHLse+tBjyVWia3qIVAqXjmzBMpkgEDiJWt1mxLcxFfZUQSwjB+Kbvl5cyMj6bqO3nbbqiknQQNmi3vTZ4ZtLGX4DhYLQeCUWi0Tk3NOO0TIg9jjMgFJHqkg2yTIEDCzNVPAsyIbdlGiAECwdiTCyOLVqmYt4QwxiG0avTeZAPRhAaQZ5ZpsTbhg3P6pnWg0hjos09/aPtJUmjdqfHRZJjzsQs6JjlzII6HJb//MX8BLXloXgGqNH2AAAAAElFTkSuQmCC" 
alt=""><br><strong>'+_+"</strong></li>"),k="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAAyCAMAAABLTlTpAAAAz1BMVEUeHh5PUE+ysrKnp6eFhYUBAQAgJBkAAACwsLDo6ub3+Pb5+fjp7ufm5uaWlpY+cws+czZ6enmChYJFZhBVfk99w2xIZhaxtq3e3t7X19fZ2dnV1dXV3tDl5eXb29vU3c7X39Le5dra4tXm6+Pp6ej09fOt34614x285pe85h6p3hzh4eHo7eXi596f2hrt8Orw8+7S28zw8PDc49fKysrt7e2+3Lm345TK66uz4pLI08DJ6yKV1Bi+3Vav4Byn3Ymh24bs7eqW1X6d2YPP4Iw2h8/sAAAAGHRSTlMhFBXbAxQwAAtQMxOBpMHBwU1qhan8Ypb/DpUjAAAE20lEQVRYw7XYCXfSQBQF4KrRuCuuhEASIq6AbaRUrVW7+P9/k/fe94a4nsl4jjdQPcDpl/dmMky6l+ejG9HcvJQjewM+eDlHrl+O5zp+Xz46HJCnGc7x6Diep1dB712LZ+867KdlWfBAJoVSTvjED7zMB/5ziNN80NXMtJ6G1I098WKH1/nP8S3aAyL7TomQEa0nXTyFe/Arb3eScTRwm5o//MnXu67mcTPZpsODLB+VfNeDzboA4SerxQG4bRriU77GdIl2YbhVXHlg80D4pmy21XoLtGnbFjJ+2GmEN9NsVaZuEx5bqnE1GbN4HxHa/O2diiS5mc/bzWaDU1DxfA+1T/+p5xPJtJfug2f55GV3iKZay6LnHp4C+ekUdSfbjNkSlwrPoMLDm27jLboBhIJ7G8UjHPPun+pGfRVYwDNlOVsSR4T3NobXa14/W1ugO55ue8tZstzFbLFY0IcOXmPuPVfZrHm9frYLdA18wwstca4harfohWfGENeMt3muWaZum7xa7XDWjpakznM2XGMd5DPGdNic7D7XUHMDHEWvCXtgq3K8p3mebttIE94qZ6p9qbrDPK9Jt3OX9z2qHrO95YWWXDerpr0Q/U7Zbns8rC1s+RyBRfrg4GD/wHFNOPU8S7InZrNqyc+fSz+T7fitDLaq1mCL9gDXkHOVqacpdga78DnuNELdCteFhrqzTHMt2Pu08TnisFU4r7M6zeaqAtvKJq3AtsLtMqOt4QZNW7Kiwle0dZkl2xMO92/2VnXTLmRzXbELbNXb3vRQd6pdVLRn1nOX8dBU/8nWugLabUtvz2mn99yH+8yH2wdcPQeNxrjtPV/9oedqedOk2f16+teeuw1cy6lPNclet9ltoq3rm7bGm7i3HD0PK5v1vOOK6vNcl1g/3LJZduL1XaAszfOAg+blHab52Hqec641v1/fu4XN8ETbBzwsLsqWHXebWzjtW7iuEfcl1WQvW1sIfCDN5gZVF1lYVJVFT7PntLVBdVyVK6uwpG64bUvep+IqC4Uz+hYLNLcu0GXXoGXvvsckI7Z94KAk2kX4Nvn1+9u3LtyvBrsBIRsRH76/W4SFp9atbxPHfeMiOmwddvu1WvbP+xbJPtFwcul2qa677qEsGilld11Tc/NgWxfjfcOmtRxJ3p+jp8BRO3U8wNo+FfHbMtufczLVP+yQWbHghjT37+l2CYAXWh+vmVXrXR9vhJXjcvI9Mv6xgdadSfp+jWHtlZdeBbqSLdz3qTXCTbJK1wmo25jitPlIn+eab9JxIIApe9GI34/ZXRHK9Hsx1oyo37oxSe656XQmCE6AcH8nGGzA006I7VjltoAVvplss+EywhNquAUvPdZz1QaDTsMLDgdpn2bp92MPjo/i4d8dRt8+x/MBJ5mNrsQzymh/GJCjLM+ffBqQ1/zj0XIWz3IE+9GrAXmPP+E8fD0gL6/hDzPLcTy0s0H2i0t59vDlAPsN7fGQyH4/IGYPiOxqAF3J/jggp7TfDLDf0p6Mq8iBXYHsFwNyIftLPGZX8RSD7XPab9/Ec0K7nMRTyj79Gs//si9O43lM++RtPGYX8Zh9fhFPoj0gh7SfPD6Ph/aTkyHhunY40M6vPrwfzaNrWQ78Xjz64OhuPFrP8+xqPPiNKR+8FA8++B3a01aqwtsZIAAAAABJRU5ErkJggg==",GM_addStyle("#navig{width:122px;border:0px 
1px 1px 0px solid 
#ddd;border-bottom-right-radius:3px;display:block;position:fixed;top:0px;left:0px;background:#fff;z-index:2001}#navig 
ul{height:50px;list-style:none}#navig 
li.enabled{width:40px;background-image:url("+k+");background-position:1px 
center;background-repeat:no-repeat;cursor:default;float:left;height:50px;overflow:hidden;position:relative;text-align:center}#navig 
li.disabled{width:40px;background-image:url("+k+");background-position: 
-82px 
0;background-repeat:no-repeat;cursor:default;float:left;height:50px;overflow:hidden;position:relative;text-align:center}#navig 
li:hover{background-position:-40px 0}#navig li strong,#navig li 
.maxCap{margin-left:3px;vertical-align:bottom;font-family:Arial,Helvetica,sans-serif;color: 
#578B4D;font-size:11px;text-align:right;text-shadow: 0 1px 0 
#C4E8B3}#navig li.disabled strong{color:#a6a4a4!important}#navig li 
img{width:29px;height:29px;vertical-align:middle;margin-top:3px;margin-bottom:-3px}#navig 
li.disabled 
img{opacity:0.3}"),S="",C=0,R="122px;",B=0,T=0,1==options.AllStock)for(B=0;B<a.length;B++)S+=a[B]
else 
if(2==options.AllStock){for(B=0;B<a.length;B++)0!=parseInt($(a[B]).find("strong").text())&&(C+=1)
if(12>=C){for(B=0;B<a.length;B++)0!=parseInt($(a[B]).find("strong").text())&&(S+=a[B])
R="42px"}else 
if(24>=C){for(B=0;B<a.length;B++)0!=parseInt($(a[B]).find("strong").text())&&(S+=a[B])
R="82px"}else 
for(B=0;B<a.length;B++)0!=parseInt($(a[B]).find("strong").text())&&(S+=a[B])}$("#navig").remove(),$("body").before('<div 
id="navig"><ul>'+S+"</ul></div>"),$("#navig").css({width:R}),$("#navig 
li.disabled").hover(function(){$(this).find("img").css({opacity:1})},function(){$(this).find("img").css({opacity:.3})}),$("#navig 
ul 
li").tipsy({gravity:"nw",html:!0})}options.storageCapacity&&(GM_addStyle(".storageInfo{clear:both;float:left;height:22px;margin:-1px 
0 10px 6px;width:142px}.storageInfo 
p{color:#585858;cursor:default;float:left;font-size:12px;text-shadow:0 
1px 0 #FFFFFF}.storageInfo p 
img{width:16px;height:16px;float:left;margin:0 6px 0 2px;}.storageInfo p 
strong{font-weight:bold}"),M=$(I).find(".area.storage 
strong").text().split("/")[1].split(")")[0].trim(),e=$(I).find(".area.storage 
strong").text().split("/")[0].split("(")[1].trim(),$(".storageInfo").remove(),i=parseInt(M.replace(/,/g,""))-parseInt(e.replace(/,/g,"")),$(".currency_amount").after('<div 
class="storageInfo"><p><img title="Storage" alt="StorageItems" 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAyVBMVEUAAAAyMzfS1t4uLzQwMjYoKSktLS1lZ2ubqcYtLS0rKytAR1Y/RVJKUmfFzNgsLCwyMjJBQUEyMjLd4Obc3+QoKjC/x9U6OjuFipRjZmpLUmbCydizvdCNkZyir8gsLCwqKipSW3GZqccvLzH19fVDSVheZ352gpxYYHelscjm6OuvvNNocInu7++drMm4wtfg4eXy8vJPV2tnb4TFztxRU1ZCTmdLVGo1Q12XpsQzMzNcXmRkZ21ucXgmNVKhq77CysGYnqq/yNh4k25rAAAAH3RSTlMAWw90TQlTAYYYKMzfpD/oY9+RQ49CfIiCNeiU2Z3XxuSTsAAAALBJREFUGNNtz0cWgjAARdFYERDsvZAECKH3Ztf9L8qAh+OEP3t39kHLuP5s3hEG/x6qinpRJ1O+aaVZj+cYdCCsCyowTTcCB/a6+iN4Nb3n+wQkihixvpkY4/IMJJQTwuhu4hJjbwTG0SNDMYlN7L2SxK8AoaJwDM9OXE1joOeI0swxbEvTaujpESVxBWEYup8jAHxfRKQC17WCgwzYBiuRGn4QLBddrvmz265lVm37Aq4DGPv4ctamAAAAAElFTkSuQmCC" 
/><strong>'+e+"/"+M+"</strong><br><span>Free: 
"+coma(i)+"</span></p></div>"))}})}function addLock(){var 
t,e,i,a=!1,n=$('input[id^="delete_message_"]').attr("id").split("_")[2],o=GM_getValue("eRS.locked.messages")
if("undefined"!=typeof 
o){for(e=JSON.parse(o),i=0;i<e.length;i++)e[i]==n&&(a=!0,t=i)
a===!0?($(".report").before('<a href="#" title="Unlock message so it can 
be deleted when multiple messages are sellected" 
class="fluid_blue_light_medium" id="eRS_Unlock"><span>Unlock 
Message</span></a>'),$(".msg_title_container 
#eRS_Unlock").click(function(){e.splice(t,1),GM_setValue("eRS.locked.messages",JSON.stringify(e)),window.location.href=window.location})):($(".report").before('<a 
href="#" title="Lock message so it can\'t be deleted when multiple 
messages are sellected" class="fluid_blue_light_medium" 
id="eRS_Lock"><span>Lock Message</span></a>'),$(".msg_title_container 
#eRS_Lock").click(function(){e.push(n),GM_setValue("eRS.locked.messages",JSON.stringify(e)),window.location.href=window.location}))}else 
e=[],$(".report").before('<a href="#" title="Lock message so it can\'t 
be deleted when multiple messages are sellected" 
class="fluid_blue_light_medium" id="eRS_Lock"><span>Lock 
Message</span></a>'),$(".msg_title_container 
#eRS_Lock").click(function(){e.push(n),GM_setValue("eRS.locked.messages",JSON.stringify(e)),window.location.href=window.location})
$("#eRS_Lock,#eRS_Unlock").tipsy({gravity:"s"})}function 
deleteMessages(t){var 
e,i,a=$(t).parents("form"),n=GM_getValue("eRS.locked.messages")
if("undefined"!=typeof 
n)for(e=JSON.parse(n),i=0;i<e.length;i++)$('input[id^="delete_message_"]').each(function(){$(this).val()==e[i]&&(this.checked=!1)})
"message_form"==a[0].id&&($(a[0]).hide(),$("#sending_message_indicator").show()),$.post(a.attr("action"),a.serialize(),function(){window.location.href.indexOf("/messages-paginated")>0?window.location=window.location.href:document.referrer.indexOf("/messages-paginated")>0?window.location=document.referrer:window.location.href="http://www.erepublik.com/en/main/messages-inbox"},"html")}function 
unb(){unsafeWindow.display_popup=void 
0,unsafeWindow.ajaxify_messages=function(){return!0},$j(".message_get").each(function(t,e){$j(e).unbind("click")}),$(".fluid_blue_dark_medium,.fluid_blue_light_medium,.message_get").each(function(){"#"!=$(this).attr("href")||"message_delete_trigger"==$(this).attr("name")?$(this).hasClass("message_get")&&!$(this).hasClass("subject")&&"message_delete_trigger"==!$(this).attr("name")&&window.location.href.indexOf("/messages-read/")>0?$(this).bind("click",function(){window.location=document.referrer}):"message_delete_trigger"==$(this).attr("name")?$(this).bind("click",function(){var 
t=!1;("undefined"==typeof $(".message_ajax_container 
#select_all")[0]||1==$(".message_ajax_container 
#select_all")[0].checked)&&(t=!0),$('input[id^="delete_message_"]').each(function(){1==this.checked&&(t=!0)}),1==t&&deleteMessages(this)}):$(this).bind("click",function(){window.location="http://www.erepublik.com"+$(this).attr("href")}):$j("body").ajaxComplete(function(t,e,i){-1!=i.url.indexOf("messages-delete")?window.location.href=document.referrer:-1!=i.url.indexOf("messages-compose")&&unb()})})}function 
donateEverywhere(t){function e(){$(".member_listing thead tr 
th").attr("style","padding:0px 0px 8px 
10px!important"),$(".member_listing tbody tr").each(function(){var 
t=$(this).find(".avatar .current_location a").attr("href").split("/")[4]
t!=eRS.citizenId&&($(this).find(".avatar").attr("style","padding:2px 0px 
3px 0px; width:208px!important;"),$(this).find(".avatar 
.current_location").after('<br><div class="citizen_actions_com" 
style="width: 208px; padding-left: 50px; text-align: left; margin-top: 
5px!important;"><table><tr><td style="height: 25px!important;"><a 
class="action_message_com" style="display:inline!important;" 
href="http://www.erepublik.com/en/main/messages-compose/'+t+'" 
original-title="Send message">Send message</a></td><td style="height: 
25px!important;"><a class="action_donate_comI" 
style="display:inline!important;" href="/en/economy/donate-items/'+t+'" 
original-title="Donate Items">Donate</a></td><td style="height: 
25px!important;"><a class="action_donate_comM" 
style="display:inline!important;" href="/en/economy/donate-money/'+t+'" 
original-title="Donate 
Money">Donate</a></td></tr></table></div>'))}),$(".citizen_actions_com 
a").tipsy({gravity:"s"})}function i(){var t,a,n
0==$("#regiments_lists_msdd").length?(clearTimeout(t),t=setTimeout(i,500)):(e(),a=$("#regiments_lists 
:selected").val(),n=$("#regiments_lists_child 
._msddli_").length>0?"._msddli_":"a",$("#regiments_lists_child 
"+n).click(function(){a!=$("#regiments_lists").val()&&(window.location.href="http://www.erepublik.com"+$("#regiments_lists 
option[value='"+$("#regiments_lists").val()+"']").attr("url"))}))}var 
a,n,o,r="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABLCAMAAAABOfS3AAABVlBMVEUAAAD////C6fj////C6fhXrduo4fhXrduo4fj////x+/5Xrduo4fh/f3/NzczC6fjNkzERERHs7OwxMTHaojn+///lv3scHBz95avzyGPooS7ftWnvvEHsuUkmJibCys3W2Nl4fX5zdHXqqDf53pv6+/zVmS3moTvYpErvwnPR0dHN1NnJ5/Xo9/1UVVZcXWHd5e3QmDfd3d329fP2x1bHtpnHoV3dq1f/8szjrTzRmEL66Ve4bxvlmir21IHwtDHm7fX/6Ev/7kTi9fyJiYlmZ2oDAwO0ucB6v+O86PrwypHHxsLz27NCQ0Pv8/3NsHrksUjKwrDwwVPjvHLVoETBqIDsvl3MkSrBr43Pkyfw1ZzBfSrz2KL/3DHszFL4xjTTqGLSn13tqC3zrDr65YH41kTutj346mz3vyH955brrlz91VWJuMvk5ORHjbOjpabfu5C3098lo0PyAAAACnRSTlMA8fH/gPHxgICAMeqNSQAAAvtJREFUSMeVlOlT2kAchrcGDwJJAYGAgIEoHgU8wNZbUSpetbe97/u2/f+/dH8R8+ruhpl9nckwz85DPuA+jLFoxhCWibI+/BoAdi3gmRt8l3nUMFIWX4seZ8FJlHN/o+Ojo90yOOPvtU4sa+7EsSwvibdnLgTbMMbL4MzggsU/eE3+KhIwSaD1BJqeUOV/WsLt43lNoetoCl6YsGdZSVFIOk7S6zr8OTsxPXHnirBv8RngjB70Y/KHffy3+HV9fcIQVm0dgTPwo1Kp9OXHzusxIIELwtjn3Z3dzdkPm0ACF4Tp/Pef36Y/vcUbBA7Bq9Fz7eX75e2PW9sQBA5hL5NdzmYLj2fWpt69eb6RIabigTB/N5ebnMytvCgsbszMPC0QU3EI7aV8Pp9Iz+YKieyrlUfEVDwQ5ham0vcfLpXSU4uTW0/S94iFcValg/0HN28l0qvFYnF18dT+TT9WGGcd/rSbrVTT5meJxDM7ZdA6YZxFTKO3VtO2CdPMSBhnbKBTlf55OgOhnC9yXVqkH2cjcWkj/fhQXLEh8F984PQ9h00xZI3D+AjnDYQMnMXjDTlkDfq2hnSniXNBFTISVBGAQNMRKGQaAkKmIXQdTcFTCwgZBClkEKSQ+YIqZCRIIYMgBguCzCEgWBAUHAKCBUHmJIjBgiBwCHKwSFBzEuRgkaDgEKRgkaDmJMjBIkHBIUjBIkHN6cYJwcKNU3FGd1cMFu60zMOqEc71u8SGY9KG+/HBmGKD4H/4wOl7Dv5V+Nr0ODP91Q9iw5zX6bMfsho4i8XqFYTM7J3Qt9VNmn+na+BcMCsImdkbCaYsmBBoOgKFTENAyDSErqMpeGEChUwUhJBdEfYrfCY4owOXjz+OeyGDcL5W6gic4SAIFgSBC0IQLAgCF4QgWIEgcAhejQ4uggVB4BCEYAWCwCGIwaIDFYcgBIsOVDwQxGDRgYpDuBSsxKnbpIMwzuhmueX2Qs09D5a7gBun4sy/u/7aZdcljDut4uHVUHP9Lv0H4tUmr9+Gf0wAAAAASUVORK5CYII=",s="data:image/png;base64,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"
GM_addStyle(".citizen_actions_com 
a{background-image:url("+s+");display:inline;float:left;height:25px;margin-right:4px;text-indent:-9999px;width:24px}.citizen_actions_com 
.action_message_com{background-position:-24px 0}.citizen_actions_com 
.action_donate_comM,.citizen_actions 
.action_donate_comM{background-image:url("+r+")!important;background-position:0 
0}.citizen_actions_com .action_donate_comI,.citizen_actions 
.action_donate_comI{background-image:url("+r+")!important;background-position:-24px 
0}.citizen_actions_com .action_donate_comM:hover,.citizen_actions 
.action_donate_comM:hover{background-position:0 
-25px}.citizen_actions_com .action_donate_comI:hover,.citizen_actions 
.action_donate_comI:hover{background-position:-24px 
-25px}.citizen_actions_com .action_donate_comM:active,.citizen_actions 
.action_donate_comM:active{background-position:0 
-50px}.citizen_actions_com .action_donate_comI:active,.citizen_actions 
.action_donate_comI:active{background-position:-24px 
-50px}.citizen_actions_com 
.action_message_com:hover{background-position:-24px 
-25px}.citizen_actions_com 
.action_message_com:active{background-position:-24px 
-50px}"),1==t?($("#comments_div 
.comment-holder").each(function(){$(this).find(".citizen_actions_com").remove()
var t=$(this).find(".nameholder").attr("href").split("/")[4].trim()
t!=eRS.citizenId&&($(this).hasClass("indent-level-0")?(a="article_comment_posted_at",n="margin-top: 
20px;"):(a="nameholder",n="float: 
right;"),$(this).find("."+a).first().after('<div 
class="citizen_actions_com" style="width: 150px; '+n+'"><a 
class="action_message_com" 
href="http://www.erepublik.com/en/main/messages-compose/'+t+'" 
original-title="Send message">Send message</a><a 
class="action_donate_comI" href="/en/economy/donate-items/'+t+'" 
original-title="Donate Items">Donate</a><a class="action_donate_comM" 
href="/en/economy/donate-money/'+t+'" original-title="Donate 
Money">Donate</a></div>'))}),$(".citizen_actions_com 
a").tipsy({gravity:"s"})):2==t?(o=window.location.href.split("/")[6].trim(),"0"!=o&&($(".msg_title_container").append('<div 
class="citizen_actions_com" style="padding-top: 0px!important; float: 
right;"><a class="action_donate_comI" 
href="/en/economy/donate-items/'+o+'" original-title="Donate 
Items">Donate</a><a class="action_donate_comM" 
href="/en/economy/donate-money/'+o+'" original-title="Donate 
Money">Donate</a></div>'),$(".citizen_actions_com 
a").tipsy({gravity:"s"}))):3==t?(unb(),$(".fluid_blue_dark_medium,.fluid_blue_light_medium,.message_get").each(function(){"#"==$(this).attr("href")&&$(this).bind("click",function(){setTimeout(function(){donateEverywhere(3)},1e3)})}),$(".citizen_actions_com").remove(),$(".message_item_container").each(function(){var 
t=$(this).find(".message_container .coloured .nameholder 
a:first").attr("href").split("/")[4]
t!=eRS.citizenId&&$(this).find(".avatarholder").append('<div 
class="citizen_actions_com" style="width: 60px!important; margin-left: 
-8px; margin-top: 0px!important; padding-top: 2px!important;"><a 
class="action_donate_comI" href="/en/economy/donate-items/'+t+'" 
original-title="Donate Items">Donate</a><a class="action_donate_comM" 
href="/en/economy/donate-money/'+t+'" original-title="Donate 
Money">Donate</a></div>'),$(".citizen_actions_com 
a").tipsy({gravity:"s"})})):5==t&&(unsafeWindow.changeRegiment=void 
0,i())}function ShowRememberDonate(t){var e,i,a,n,o
if(1==t)$(".special.padded").append('<div style="float: right; 
padding-top: 3px;">"Remember donation quantity" 
enabled</div>'),e=GM_getValue(eRS.citizenId+".eRS_donateItem"),i="undefined"!=typeof 
e?JSON.parse(e):{1:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},2:{1:0,2:0,3:0,4:0,5:0,6:0,7:0}},$(".offers.largepadded 
tr:not(:first-child)").each(function(){var 
t=$(this).find("img").attr("src").split("/")[6].trim(),e=$(this).find("img").attr("src").split("/")[7].split(".png")[0].split("q")[1].trim()
$(this).find(".input").val(i[t][e])})
else if(2==t)$(".special.padded").append('<div style="float: right; 
padding-top: 3px;">"Remember donation quantity" 
enabled</div>'),e=GM_getValue(eRS.citizenId+".eRS_donateMoney"),i="undefined"!=typeof 
e?JSON.parse(e):{1:0,2:0},$(".offers.largepadded.donate_form 
tr:not(:first-child)").each(function(){var 
t=$(this).find("img").attr("alt")
$(this).find(".input").val("GOLD"==t?i[2]:i[1])})
else 
if(3==t){if(a=[],n="",e=GM_getValue("eRS_donation_logger"),"undefined"==typeof 
e)n="<strong>No donation history.</strong>"
else for(a=JSON.parse(e),o=0;o<a.length;o++)1==a[o].type&&(n+="<strong 
style='display:inline!important;'>["+a[o].day+"/"+a[o].month+"/"+a[o].year+" 
at "+a[o].hour+":"+a[o].min+":"+a[o].sec+"]</strong> You donated 
"+a[o].amount+" Q"+a[o].quality+" "+a[o].txt+" to <a 
href='http://www.erepublik.com/"+LANG+"/citizen/profile/"+a[o].id+"'>"+a[o].name+"</a><br>"),2==a[o].type&&(n+="<strong 
style='display:inline!important;'>["+a[o].day+"/"+a[o].month+"/"+a[o].year+" 
at "+a[o].hour+":"+a[o].min+":"+a[o].sec+"]</strong> You donated 
"+a[o].amount+" "+a[o].txt+" to <a 
href='http://www.erepublik.com/"+LANG+"/citizen/profile/"+a[o].id+"'>"+a[o].name+"</a><br>")
$(".citizen_mass_destruction").after('<div 
style="clear:both;"></div><h3>Donation history</h3><div 
class="citizen_mass_destruction"><em>'+n+"</em></div>")}}function 
RememberDonate(t,e){var 
i,a,n,o,r,s,l,d,c,p,g=[],m=GM_getValue("eRS_donation_logger")
"undefined"!=typeof 
m&&(g=JSON.parse(m)),i=e.parent().parent(),a=$(".citizen_profile_header 
h2:not(span)").text().trim(),n=window.location.href.split("/")[6],o=new 
Date,1==t?(m=GM_getValue(eRS.citizenId+".eRS_donateItem"),r="undefined"!=typeof 
m?JSON.parse(m):{1:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},2:{1:0,2:0,3:0,4:0,5:0,6:0,7:0}},$(".offers.largepadded 
tr:not(:first-child)").each(function(){var 
t=$(this).find("img").attr("src").split("/")[6].trim(),e=$(this).find("img").attr("src").split("/")[7].split(".png")[0].split("q")[1].trim()
r[t][e]=$(this).find(".input").val()}),s=i.find("input#[id^=donate_item_]").val(),l=i.find("td:last 
input:first").attr("quality"),d=i.find("td:last 
input:first").attr("industry"),c=1==d?"food":"weapons",parseFloat(s)>0&&(30==g.length&&g.shift(),g.push({type:1,day:o.getDate()<10?"0"+o.getDate():o.getDate(),month:parseInt(o.getMonth())+1<10?"0"+(parseInt(o.getMonth())+1):parseInt(o.getMonth())+1,year:o.getFullYear(),hour:o.getHours()<10?"0"+o.getHours():o.getHours(),min:o.getMinutes()<10?"0"+o.getMinutes():o.getMinutes(),sec:o.getSeconds()<10?"0"+o.getSeconds():o.getSeconds(),amount:s,txt:c,quality:l,name:a,id:n}),GM_setValue("eRS_donation_logger",JSON.stringify(g))),GM_setValue(eRS.citizenId+".eRS_donateItem",JSON.stringify(r))):2==t&&(m=GM_getValue(eRS.citizenId+".eRS_donateMoney"),r="undefined"!=typeof 
m?JSON.parse(m):{1:0,2:0},$(".offers.largepadded.donate_form 
tr:not(:first-child)").each(function(){var 
t=$(this).find("img").attr("alt")
"GOLD"==t?r[2]=$(this).find(".input").val():r[1]=$(this).find(".input").val()}),s=i.find("input#[id^=donate_money_]").val(),p=i.find("td:first").text().trim(),parseFloat(s)>0&&(30==g.length&&g.shift(),g.push({type:2,day:o.getDate()<10?"0"+o.getDate():o.getDate(),month:parseInt(o.getMonth())+1<10?"0"+(parseInt(o.getMonth())+1):parseInt(o.getMonth())+1,year:o.getFullYear(),hour:o.getHours()<10?"0"+o.getHours():o.getHours(),min:o.getMinutes()<10?"0"+o.getMinutes():o.getMinutes(),sec:o.getSeconds()<10?"0"+o.getSeconds():o.getSeconds(),amount:s,txt:p,name:a,id:n}),GM_setValue("eRS_donation_logger",JSON.stringify(g))),GM_setValue(eRS.citizenId+".eRS_donateMoney",JSON.stringify(r)))}function 
NewsCategories(){$(".mini_news_categories 
span").eq(0).remove(),$(".mini_news_categories ul 
li").eq(0).before('<li><a href="javascript:;" id="eRSNews" 
rel="international" class="switchers" 
original-title="International"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAulBMVEUAAAD3+/yTy+DX7PO13ey73+yn1+fy+fve8Pb3+/2k1+ys4/gqk7Kn2Oyf1eqPyt6k3fV7yeaT0ekdiqlgrsWj1Omc0ONuw+Oa2PBttcoymbe53uyg2e6S1e8jjqx1v9mLzuh3yeiZ0+qFz+12uMw6oceExNlnssh8xeBYrsxqvNk4nLxTqcRZrMVIo8B0u9Gx2umj0+VWs9WKxdhfss5IrNF7vtJCp8uByOKJyOFFpsZlt9ODyuVgvd/N+Sw+AAAACnRSTlMAH8lGzNDLDUYZxuiSFgAAANpJREFUGNMtz0digzAURVElAQxCIFSopvcO7jX731YU22f2/+hdIGjqduc4u62qgZeNbNuGYNvy5nV/728QQsOA0JbER1Oq6tIcHAhN03TkL/DTBdUJHfPQxBgfsAqc4DKc9r8kxHVZlucVLDFCd9d1r2ff9xsfg5Gxu5tlWfeoF875AnjQkaIoCIpHPjWTD26P3iVRRBhDM0+TGqzkOaA+8tpjHCReugI1TWcWt5ZOUXD1qAo0ifZssnQ9HOYnlTQxXUnGUBeSNlLeMVLuWYKX/6d88k1KzXf+H3rGF2DeE35iAAAAAElFTkSuQmCC" 
alt="International" title="International"></a></li><li><a 
href="javascript:;" id="eRSNews" rel="latest" class="switchers" 
original-title="Latest"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA9lBMVEX/AACUlpv///+qr7e9xMmZmqDbXTQAAACqrLCUlZmssbegoqXq7/D//oqbnaL0ExKmp6unqaz/94e9hm/x8/Ows7alo6+LjJDg5+j4eDT6ez3M0NP51lX5czrm7OvN1db7ayr31XnxGgD4USKveFf8OBbKcFT/fUejpam/xczDxtX4+/vkMTLHx9yfm7H74Gj/Egr/j1X55XqvpKL/IBPjj2rlVDf8cDS4emb/ey6lY0buKgjeKg7Pe1fW1dj15N6glZS/VRyRiIfMqW/p2tT/nWPc0c7AfV//dkq9kWqnelWdf2yUdmS0nWnLQyvR0c7NTU7eQkNHZ8bZAAAAx0lEQVQY013M124CMRCF4bGJE++a3WyHhBZqSOi9997h/V+GMQgh8V/MxafRgWzm/VZGCFf1+VQQ9jqdSCQXNh2KmAR9lQaAXqdrUBYNSVj2EZKTqU4VJxpTgY2aCJXZ3KEhzrkL40YE4bs6qHFumpRBO/6DEAnHbc4NI8cgZUn4ClspkfU86sJWa0koaRs/hh977VduWNqO44jDQDlIKNc/sYvp14GcjvAobwSLQILnJ3gS3rC///stFBgEiILdLyEsAB8vXQHcPhQNEMH+lwAAAABJRU5ErkJggg==" 
alt="Latest" title="Latest"></a></li>'),$(".mini_news_categories ul li 
#eRSNews").click(function(){var t,e,i,a,n,o,r,s,l,d="",c="",p=""
$(".media_widget 
li").find(".active").removeClass("active"),$(".media_widget").addClass("preload"),$(this).addClass("active"),l=$(this).attr("rel"),c="latest"==l?"latest/all/"+eRS.country+"/1":l,GM_xmlhttpRequest({method:"GET",url:"http://www.erepublik.com/"+LANG+"/main/news/"+c,dataType:"html",onload:function(g){var 
m=g.responseText.replace(/src=/g,"tmpsrc=").replace(/\.css/g,"").replace(/\.js/g,"").replace(/url\(/g,""),u=$(m).find("#content").html()
$(u).filter('[class="holder 
bordersep"]:lt(5)').each(function(){t=$(this).find(".rankholder 
.value").text().trim(),e=$(this).find(".holder 
.dotted").attr("href"),i=$(this).find(".holder 
.dotted").text(),a=$(this).find(".article_details 
small").eq(0).text().trim(),n=$(this).find(".article_details 
small").eq(1).find("a").text().trim(),o=$(this).find(".article_details 
small").eq(1).find("a").attr("href"),r=$(this).find(".article_details 
small").eq(2).text().trim(),s=$(this).find(".article_details 
small").eq(2).find("img").attr("tmpsrc"),news=$(this).find(".newspaperinf 
.nameholder .dotted").text().trim(),d+="<li>",d+='<div 
class="no_votes"><strong>'+t+"</strong><small>votes</small></div>",d+='<div 
class="article_entry"><div>',d+='<span><img class="countryImg" 
style="vertical-align: middle; float: left;" src="'+s+'" 
original-title="'+r+'"><span>&bull;</span><em>'+n+'</em></span><a 
href="'+e+'">'+i+"</a>",d+='<span><em 
class="author">'+news+'</em><span>&bull;</span><em 
class="time_posted">'+a+"</em></span>",d+="</div></div>",d+="</li>"}),$("#citizenship_news").html(""),$("#citizenship_news").html(d),$("#citizenship_news 
li span 
.countryImg").tipsy({gravity:"s"}),$("#residence_news").length>0?"latest"==l?(d="",p="latest/all/"+$("#perma_second").attr("value")+"/1",GM_xmlhttpRequest({method:"GET",url:"http://www.erepublik.com/"+LANG+"/main/news/"+p,dataType:"html",onload:function(g){var 
m=g.responseText.replace(/src=/g,"tmpsrc=").replace(/\.css/g,"").replace(/\.js/g,"").replace(/url\(/g,""),u=$(m).find("#content").html()
$(u).filter('[class="holder 
bordersep"]:lt(5)').each(function(){t=$(this).find(".rankholder 
.value").text().trim(),e=$(this).find(".holder 
.dotted").attr("href"),i=$(this).find(".holder 
.dotted").text(),a=$(this).find(".article_details 
small").eq(0).text().trim(),n=$(this).find(".article_details 
small").eq(1).find("a").text().trim(),o=$(this).find(".article_details 
small").eq(1).find("a").attr("href"),r=$(this).find(".article_details 
small").eq(2).text().trim(),s=$(this).find(".article_details 
small").eq(2).find("img").attr("tmpsrc"),news=$(this).find(".newspaperinf 
.nameholder .dotted").text().trim(),d+="<li>",d+='<div 
class="no_votes"><strong>'+t+"</strong><small>votes</small></div>",d+='<div 
class="article_entry"><div>',d+='<span><img class="countryImg" 
style="vertical-align: middle; float: left;" src="'+s+'" 
original-title="'+r+'"><span>&bull;</span><em>'+n+'</em></span><a 
href="'+e+'">'+i+"</a>",d+='<span><em 
class="author">'+news+'</em><span>&bull;</span><em 
class="time_posted">'+a+"</em></span>",d+="</div></div>",d+="</li>"}),$("#residence_news").html(""),$("#residence_news").html(d),$(".media_widget").removeClass("preload"),$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+p),$("#go1").bind("click",function(){$(".media_widget 
li").find(".active").attr("rel")==l&&$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+c)}),$("#go2").bind("click",function(){$(".media_widget 
li").find(".active").attr("rel")==l&&$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+p)}),$("#residence_news 
li span 
.countryImg").tipsy({gravity:"s"})}})):($("#residence_news").html(""),$("#residence_news").html(d),$(".media_widget").removeClass("preload"),$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+l),$("#go1").bind("click",function(){$(".media_widget 
li").find(".active").attr("rel")==l&&$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+c)}),$("#go2").bind("click",function(){$(".media_widget 
li").find(".active").attr("rel")==l&&$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+c)}),$("#residence_news 
li span 
.countryImg").tipsy({gravity:"s"})):($(".media_widget").removeClass("preload"),$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+l),$("#go1").bind("click",function(){$(".media_widget 
li").find(".active").attr("rel")==l&&$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+c)}),$("#go2").bind("click",function(){$(".media_widget 
li").find(".active").attr("rel")==l&&$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+c)}))}})})}function 
SpareChange(){setTimeout(function(){GM_xmlhttpRequest({method:"GET",url:"http://www.erepublik.com/"+LANG+"/economy/exchange-market",dataType:"html",onload:function(t){var 
e=t.responseText.replace(/src=/g,"tmpsrc=").replace(/\.css/g,"").replace(/\.js/g,"").replace(/url\(/g,""),i=parseFloat($(e).find("#golden").val()),a=parseFloat($(e).find("#eCash").val())
$("#side_bar_gold_account_value").text(i.toFixed(2)),$("#side_bar_currency_account_value").text(a.toFixed(2))}})},400)}function 
BetterIgm(){var t,e=GM_getValue("eRS"+eRS.citizenId+"_Igm")
t="undefined"==typeof 
e?{sub:"",mess:""}:JSON.parse(e),$("#message_form").append('<a 
href="javascript:;" id="igmClear" original-title="Forget last remembered 
message" class="fluid_blue_dark_medium" style="margin-right: 10px; 
float: right;"><span class="bold">Clear</span></a><a href="javascript:;" 
id="igmSave"  original-title="Remember this message" 
class="fluid_blue_dark_medium" style="margin-right: 10px; float: 
right;"><span class="bold">Save</span></a><a href="javascript:;" 
id="igmFill" original-title="Fill with last remembered message" 
class="fluid_blue_dark_medium" style="margin-right: 10px; float: 
right;"><span 
class="bold">Fill</span></a>'),$("#igmClear").tipsy({gravity:"s"}),$("#igmFill").tipsy({gravity:"s"}),$("#igmSave").tipsy({gravity:"s"}),$("#igmFill").click(function(){$("#citizen_subject").val(t.sub),$("#citizen_message").val(t.mess)}),$("#igmSave").click(function(){t.sub=$("#citizen_subject").val(),t.mess=$("#citizen_message").val(),GM_setValue("eRS"+eRS.citizenId+"_Igm",JSON.stringify(t))}),$("#igmClear").click(function(){t.sub="",t.mess="",GM_setValue("eRS"+eRS.citizenId+"_Igm",JSON.stringify(t))})}function 
AutoBot(){function t(){var 
t=($j("#heal_btn"),$j("#DailyConsumtionTrigger")),e=$j("#eatload").css("display")
return!$j("input#multihit_food").is(":checked")||t.hasClass("disabled")||t.hasClass("buy")||t.hasClass("energy")||"none"!=e?$j("input#multihit_energy").is(":checked")&&!t.hasClass("disabled")&&t.hasClass("energy")&&"none"==e?!0:!1:!0}function 
e(){"undefined"==typeof 
unsafeWindow.jQuery?window.setTimeout(e,100):i()}function i(){function 
e(){function 
e(){$j("#DailyConsumtionTrigger").addClass("load"),$j.getJSON(c,{},function(t){unsafeWindow.energy.processResponse(t),$j("#DailyConsumtionTrigger").removeClass("load"),i()})}function 
i(){a<unsafeWindow.globalNS.userInfo.wellness?unsafeWindow.globalNS.userInfo.wellness>=10?(clearTimeout(l),l=setTimeout("jQuery.fn.multiHIT()",250)):t()?e():20==n?$("#multihit_start").click():setTimeout(i,1e3):setTimeout(i,1e3)}var 
a=parseInt($("#current_health").text().split("/")[0].trim()),n=0
e()}function i(){var t="/en/military/change-weapon"
unsafeWindow.ERPK.disableAllButtons(),$j.post(t,{_token:unsafeWindow.SERVER_DATA.csrfToken,battleId:unsafeWindow.SERVER_DATA.battleId},function(t){if(-1!==$j(".fighter_weapon_image:last").attr("src").indexOf("q0"),unsafeWindow.currentWeaponId!==t.weaponId||unsafeWindow.hasBazookaAmmo!=t.hasBazookaAmmo){{$j(".listing 
span").eq(0).clone()}$j("#scroller span:last 
img").attr("src",t.weaponImage)}return 
unsafeWindow.ERPK.enableAllButtons(),-1!==$j(".listing span 
img").eq(-1).attr("src").indexOf("q10")?(a=!1,void 
$j("button#multihit_start").html("Start")):(clearTimeout(l),void(l=setTimeout("jQuery.fn.multiHIT()",250)))},"json")}"undefined"==typeof 
unsafeWindow&&(unsafeWindow=window)
var d='<style type="text/css"> #multihit_start {margin-top: 0px; 
margin-left: 0px; margin-bottom: 0px; position: relative;}</style>'
$j("head").append(d),$j("div#enemy_defeated").before('<div id="MHP" 
style="z-index:99;position:relative;margin:-190px 0 0 
33px;float:left;clear:both;padding:5px;background-color:#262620;border-radius:4px;opacity:0.8;font-weight:bold;border:1px 
solid 
#000;color:#FFF;text-align:left;font-size:10px"><big>Kills:&nbsp;</big><input 
id="multihit_count" style="text-align:right" type="text" size="3" 
maxlength="4" value="25" />&nbsp;<button 
id="multihit_start">Start</button><br />&nbsp;<input type="checkbox" 
id="multihit_food" name="multihit_food" checked="checked"><label 
for="multihit_food">&nbsp;Eat food</label><br/>&nbsp;<input 
type="checkbox" id="multihit_bazooka" name="multihit_bazooka" 
checked="checked"><label for="multihit_bazooka">&nbsp;Dont use 
Bazooka</label><br/>&nbsp;<input type="checkbox" id="multihit_energy" 
name="multihit_energy"><label for="multihit_energy">&nbsp;Use 
EnergyBars</label><br/></div>'),0!=unsafeWindow.SERVER_DATA.battleFinished&&$j("div#MHP").hide(),$j("div#MHP").hide(),GM_addStyle("#autoBot 
a{font-weight:bold;color:#ffffff;padding:5px 3px 5px 
3px;top:315px;left:220px;position:absolute;text-align:center;width:50px;background-color:transparent;border:1px 
solid #999999;border-radius: 0 5px 5px 0;box-shadow: 0px 0px 2px 
#ff7373;background-image:linear-gradient(to right, #bf3030, 
#a60000);background-clip:padding-box}#autoBot 
a:active{top:316px}"),$j("#pvp_battle_area 
.player.left_side").before('<div id="autoBot"><a 
href="javascript:void(0)" 
id="toggleAutoBot">AutoBot</a></div>'),$j("#toggleAutoBot").click(function(){$j(this).text("ON"==$j(this).text()?"AutoBot":"ON"),$j("div#MHP").is(":visible")?$j("div#MHP").hide():$j("div#MHP").show()}),unsafeWindow.battleFX.hit=function(){return 
a&&(o++,s=!1,clearTimeout(l),l=setTimeout("jQuery.fn.multiHIT()",1001)),!1},unsafeWindow.battleFX.blow=function(){return 
a&&(r++,s=!0),!1},unsafeWindow.battleFX.countNextBattle=function(t){function 
e(t){0==$j.countdown.periodsToSeconds(t)&&($j("#waiting").fadeOut("fast"),$j("#waiting").removeClass("clock"),$j("#notify_link").fadeIn("fast"),$j("#notify_link").click(),setTimeout(function(){top.location.href=document.location.href},2e3))}return 
isNaN(t.getMonth())?(setTimeout(function(){top.location.href=document.location.href},1e3),!1):($j("#time_until").countdown({until:t,format:"MS",compact:!0,description:"",onTick:e}),!1)},unsafeWindow.jQuery.fn.getWell=function(){var 
t=($j("#heal_btn"),$j("#DailyConsumtionTrigger"));($j("input#multihit_food").is(":checked")&&!t.hasClass("disabled")&&!t.hasClass("buy")&&!t.hasClass("energy")||$j("input#multihit_energy").is(":checked")&&!t.hasClass("disabled")&&t.hasClass("energy"))&&($j("#heal_btn 
small").hide(),e())},unsafeWindow.jQuery.fn.multiHIT=function(){if(unsafeWindow.globalStop||n==o)return 
unsafeWindow.ERPK.enableAllButtons(),a=!1,void 
$j("button#multihit_start").html("Start")
if(unsafeWindow.ERPK.canFire())$j("input#multihit_bazooka").is(":checked")&&-1!==$j(".listing 
span img").eq(-1).attr("src").indexOf("q10")?i():unsafeWindow.shoot()
else{if(!t())return unsafeWindow.ERPK.enableAllButtons(),a=!1,void 
$j("button#multihit_start").html("Start")
unsafeWindow.jQuery.fn.getWell()}},$j("button#multihit_start").click(function(){a?(clearTimeout(l),unsafeWindow.ERPK.enableAllButtons(),a=!1,$j("button#multihit_start").html("Start")):(n=$j("input#multihit_count").val(),n>0&&(o=0,r=0,s=!1,a=!0,$j("button#multihit_start").html("Stop"),unsafeWindow.jQuery.fn.multiHIT()))})}{var 
a=!1,n=0,o=0,r=0,s=!1,l=0,d=$j("div.user_health 
input[type=hidden]").attr("id"),c="http://www.erepublik.com/"+LANG+"/main/eat?format=json&_token="+$j("#"+d).val()+"&jsoncallback=?"
location.href.match(/citizen\/profile\/(\d+)$/)?0:unsafeWindow.SERVER_DATA.health}e()}function 
QuickMarket(){var t,e,i,a,n,o
for(GM_addStyle(".eRS_quickMarket{display:none!important;border-top:1px 
solid 
#ccc;position:absolute!important;top:0px!important}.eRS_quickMarket li 
img{width:18px;height:20px;vertical-align:middle;margin-bottom:2px}"),t="",e="",i="",a=1;3>=a;a++)for(n=1;7>=n;n++)1==a&&7>=n&&(t+='<li><a 
href="http://www.erepublik.com/'+LANG+"/economy/market/"+img_country[eRS.country].id+"/1/"+n+'/citizen/0/price_asc/1"><img 
src="'+itemicons[a][n]+'"> Food Q'+n+"</li>",7==n&&(t+='<li><a 
href="http://www.erepublik.com/'+LANG+"/economy/market/"+img_country[eRS.country].id+'/7/1/citizen/0/price_asc/1"><img 
src="'+frmicon+'"> Food Raw</li>')),2==a&&7>=n&&(e+='<li><a 
href="http://www.erepublik.com/'+LANG+"/economy/market/"+img_country[eRS.country].id+"/2/"+n+'/citizen/0/price_asc/1"><img 
src="'+itemicons[a][n]+'"> Weapon Q'+n+"</li>",7==n&&(e+='<li><a 
href="http://www.erepublik.com/'+LANG+"/economy/market/"+img_country[eRS.country].id+'/12/1/citizen/0/price_asc/1"><img 
src="'+wrmicon+'"> Weapon Raw</li>')),3==a&&5>=n&&(i+='<li><a 
href="http://www.erepublik.com/'+LANG+"/economy/market/"+img_country[eRS.country].id+"/3/"+n+'/citizen/0/price_asc/1"><img 
src="'+itemicons[a][n]+'"> Ticket Q'+n+"</li>")
o='<ul class="eRS_quickMarket">'+t+'</ul><ul 
class="eRS_quickMarket">'+e+'</ul><ul 
class="eRS_quickMarket">'+i+"</ul>",$("#menu4 ul 
li:first").append(o),$("#menu4 ul 
li:first").hover(function(){$(".eRS_quickMarket:eq(0)").attr("style","display: 
block!important"),$(".eRS_quickMarket:eq(1)").attr("style","display: 
block!important; left: 
269px!important;"),$(".eRS_quickMarket:eq(2)").attr("style","display: 
block!important; left: 
407px!important;")},function(){$(".eRS_quickMarket").attr("style","display: 
none!important")})}function 
NewFuncs(){unsafeWindow.get_citizen_feeds=function(){var t,e
try{$j("#show_friends_feed").addClass("active"),$j("#show_regiment_feed").removeClass("active"),$j("#show_facebook_feed").removeClass("active"),$j("#show_party_feed").removeClass("active"),$j(".fb-like-box").css("display","none"),$j(".shouter").css("display","block"),$j(".wall_post_list 
ul").css("display","block"),$j("#citizen_older_feeds").css("display","block"),t="/"+(LANG?LANG:"en")+"/main/wall-post/older/",e={_token:$j("#_token").val(),page:0},$j.post(t,e,function(t){options.reShout||options.filterGuerrilla||options.filterMedals?($("body").append('<ul 
id="boggy" style="display: 
none;"></ul>'),$("#boggy").append(t),t=FilterPost("#boggy"),$("#boggy").remove(),$j(".wall_post_list 
> ul").html(t),FilterPostBind()):$j(".wall_post_list > 
ul").html(t),$j("#isGroupFeed").val(0),parseInt($j("#postCount").val())>unsafeWindow.POSTS_LIMIT+1?$j("#citizen_older_feeds").show():$j("#citizen_feed_friends").show(),$j("#group_older_feeds").hide(),$j("#shout").val(unsafeWindow.wall_texts.say_something_to_your_friends+" 
...")})}catch(i){}},unsafeWindow.get_group_feeds=function(){var t,e
try{$j("#show_regiment_feed").addClass("active"),$j("#show_friends_feed").removeClass("active"),$j("#show_facebook_feed").removeClass("active"),$j("#show_party_feed").removeClass("active"),$j(".fb-like-box").css("display","none"),$j(".shouter").css("display","block"),$j(".wall_post_list 
ul").css("display","block"),t="/"+(LANG?LANG:"en")+"/main/group-wall/older/retrieve",e={_token:$j("#_token").val(),page:0,groupId:$j("#groupId").val(),part:1},$j.post(t,e,function(t){var 
e
unsafeWindow.feedTabs===!0?options.reShout?($("body").append('<ul 
id="boggy" style="display: 
none;"></ul>'),$("#boggy").append($(t).find(".wall_post_list 
ul").html()),e=FilterPost("#boggy"),$("#boggy").remove(),$j("#isGroupFeed").val(1),$(".wall_post_list 
ul").html(e),FilterPostBind()):($j("#isGroupFeed").val(1),$j(".wall_post_list 
ul").html($j(t).find(".wall_post_list ul").html()),$j("#shout").val("Say 
something...")):options.reShout?($("body").append('<ul id="boggy" 
style="display: 
none;"></ul>'),$("#boggy").append($(t).find(".wall_post_list 
ul").html()),e=FilterPost("#boggy"),$("#boggy").remove(),$j("#isGroupFeed").val(1),$j("#wall_master").html(t),$(".wall_post_list 
ul").html(e),FilterPostBind()):($j("#isGroupFeed").val(1),$j("#wall_master").html(t))},"html")}catch(i){}},unsafeWindow.get_party_feeds=function(){var 
t,e
try{$j("#show_party_feed").addClass("active"),$j("#show_regiment_feed").removeClass("active"),$j("#show_facebook_feed").removeClass("active"),$j("#show_friends_feed").removeClass("active"),$j(".fb-like-box").css("display","none"),$j(".shouter").css("display","block"),$j(".wall_post_list 
ul").css("display","block"),t="/"+(LANG?LANG:"en")+"/main/party-post/older/",e={_token:$j("#_token").val(),page:0},$j.post(t,e,function(t){options.reShout?($("body").append('<ul 
id="boggy" style="display: 
none;"></ul>'),$("#boggy").append(t),t=FilterPost("#boggy"),$("#boggy").remove(),$j(".wall_post_list 
> ul").html(t),FilterPostBind()):$j(".wall_post_list > 
ul").html(t),$j("#isGroupFeed").val(0),parseInt($j("#partyPostCount").val())>unsafeWindow.POSTS_LIMIT+1?$j("#citizen_older_feeds").show():$j("#citizen_older_feeds").hide(),$j("#group_older_feeds").hide(),$j("#shout").val(unsafeWindow.wall_texts.say_something_to_your_party_colleagues+" 
...")})}catch(i){}},unsafeWindow.populatePreviousPosts=function(){var 
t=parseInt($j("#previous_posts").val()),e=parseInt($j("#posts_count").val()),i="/"+(LANG?LANG:"en")+"/main/wall-post/older/"
$j("#party_feeds").length>0&&(i="/"+(LANG?LANG:"en")+"/main/party-post/older/"),$j.post(i,{_token:$j("#_token").val(),page:t,postId:$j("#viewFirst").val()},function(i){options.reShout||options.filterGuerrilla||options.filterMedals?($("body").append('<ul 
id="boggy" style="display: 
none;"></ul>'),$("#boggy").append(i),i=FilterPost("#boggy"),$("#boggy").remove(),$j(".wall_post_list 
> ul").append(i),FilterPostBind()):$j(".wall_post_list > 
ul").append(i),e>10*(t+1)?$j("#previous_posts").val(t+1):$j(".previous_posts").hide()},"html")}}function 
FilterPostBind(){$("a[id^=repost_]").bind("click",function(){var 
t=$(this).parent().parent().parent().find("h6:first a:first").text()+" 
wrote:\r"+$(this).parent().parent().parent().find("p:first").text().trim()
$("textarea[id=shout]").trigger("click"),$("textarea[id=shout]").val(t),unsafeWindow.new_post()}),$("a[class^=shareButton_]").bind("click",function(){var 
t=$(this).attr("class").split("_")[1]
"0px"==$(".shareUrl_"+t).css("height")?($(".shareUrl_"+t).show(),$(".shareUrl_"+t).animate({height:"25"},200,"linear",function(){$(".shareUrl_"+t).show(),$(".shareUrl_"+t).animate({opacity:"1"},300).focus().select(),$(".shareUrl_"+t).click(function(){$(".shareUrl_"+t+" 
input").select()})})):$(".shareUrl_"+t).animate({opacity:"0"},300,"linear",function(){$(".shareUrl_"+t).animate({height:"0"},200,"linear",function(){$(".shareUrl_"+t).hide()})})})}function 
FilterPost(t){return $(t).find("li").each(function(){var t,e
$(this).hasClass("mu")||($("#show_friends_feed").hasClass("active")?t="viewPost":$("#show_regiment_feed").hasClass("active")?t="unitPost":$("#show_party_feed").hasClass("active")?t="viewPartyPost":"",e=$(this).attr("id").split("_")[1].trim(),options.reShout&&$(this).find(".post_content 
.post_actions").append('<div class="repost" 
style="display:inline;"><span>·</span><a style="margin-left: 3px;" 
id="repost_'+e+'" title="" href="javascript:;">Shout</a><span 
style="margin-left: 3px;" class="shareDot">· </span><a 
class="shareButton_'+e+'" href="javascript:;">Share</a><div 
class="shareUrl_'+e+'" style="clear: both; width: 310px; display: none; 
padding: 5px 0 0 0; height: 0px; overflow: hidden;"><input 
value="http://www.erepublik.com/en?'+t+"="+e+'" style="display: block; 
width: 300px; font-size: 9px; border-radius: 3px; border: 1px solid 
#D2D2D2; color: grey; padding: 2px; opacity: 
1;"></div></div>'),options.filterGuerrilla&&$(this).find(".auto_img").length>0&&$(this).find(".auto_img").attr("src").indexOf("/pvpgame/")>0&&$(this).remove(),options.filterMedals&&$(this).find(".auto_img").length>0&&$(this).find(".auto_img").attr("src").indexOf("/achievements/")>0&&$(this).remove())}),$(t).html()}function 
FireEmployers(){function t(){function t(e){var 
i="http://www.erepublik.com/"+LANG+"/economy/fire"
params={action_type:"fire",employeeId:parseInt(e.shift()),_token:$("#_token").val()},$.post(i,params,function(i){var 
a=$(".fire_employee").parent().parent()
0==i.status&&"redirect"==i.message&&1==isLast?window.location.reload():0==i.status&&"redirect"==i.message&&0==isLast||0==i.status&&"lock"==i.message||(1==i.status?0==e.length?window.location.reload():(unsafeWindow.throwNotice(a,"Fired."),setTimeout(function(){t(e)},800)):unsafeWindow.throwError(a,i.message))},"json")}$("#fireThem").length>0?($(".list_group 
.listing .employee_salary.c3 strong 
#fireHimd").remove(),$("#fireThem").remove()):(GM_addStyle('button.thoughtbot{margin-top:5px;float:right;background-color:#ee432e;background-image:linear-gradient(#ee432e 
0%, #c63929 50%, #b51700 50%, #891100 100%);border:1px solid 
#951100;border-radius:5px;box-shadow: inset 0px 0px 0px 1px rgba(255, 
115, 100, 0.4), 0 1px 3px #333333;color: #fff;font: bold 11px/1 
"helvetica neue", helvetica, arial, 
sans-serif;text-align:center;text-shadow:0px -1px 1px rgba(0, 0, 0, 
0.8);width:100px;height:30px}button.thoughtbot:hover{background-color:#f37873;background-image:linear-gradient(#f37873 
0%, #db504d 50%, #cb0500 50%, #a20601 
100%);cursor:pointer}button.thoughtbot:active{background-color:#d43c28;background-image:linear-gradient(#d43c28 
0%, #ad3224 50%, #9c1500 50%, #700d00 100%);box-shadow: inset 0px 0px 
0px 1px rgba(255, 115, 100, 0.4)}'),$(".list_group 
.listing").each(function(){$(this).find(".employee_salary.c3 
strong").append('<input type="checkbox" name="fireHim[]" 
style="vertical-align: middle; margin-left: 10px; margin-bottom:3px;" 
id="fireHimd">')}),$(".bottom_details").before('<button 
class="thoughtbot" id="fireThem">Fire 
Selected</button>'),$("#fireThem").bind("click",function(){var e=[]
$("input[name='fireHim[]']:checked").each(function(){e.push($(this).parent().parent().find(".current_salary").attr("id").split("_")[2].trim())}),t(e)}))}$(".grey_plastic.right_pos").bind("click",function(){$(this).hasClass("disabled")||t()}),$("#edit_mode").bind("click",function(){$("#fireThem").length>0&&($(".list_group 
.listing .employee_salary.c3 strong 
#fireHimd").remove(),$("#fireThem").remove())}),$("#add_mode").bind("click",function(){$("#fireThem").length>0&&($(".list_group 
.listing .employee_salary.c3 strong 
#fireHimd").remove(),$("#fireThem").remove())})}function 
ChangeSalaryAll(){function 
t(){$("#change_sal_all").length>0?$("#change_sal_all").remove():(GM_addStyle('button.thoughtbot{margin-top:5px;background-color:#ee432e;background-image:linear-gradient(#ee432e 
0%, #c63929 50%, #b51700 50%, #891100 100%);bor// ==UserScript==
// @name		eRepublik Stuff ++
// @version		2.2.22
// @namespace	http://userscripts.org/scripts/show/390674
// @require		http://code.jquery.com/jquery-2.1.0.min.js
// @include		http*://*www.erepublik.com/*
// @exclude		
/^http(.*)://www\.erepublik\.com/(.*)/(get-gold|loyalty/program|gold-bonus)(.*)/
// @exclude		http://www.erepublik.com/en/map
// @grant		GM_info
// @grant		GM_deleteValue
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_addStyle
// @grant		GM_xmlhttpRequest
// @grant		unsafeWindow
// ==/UserScript==
function initBattle(){var 
t=$(".country.left_side").html().split("<h3>"),e=t[1].split("</h3>"),i=e[0]
eRS.country==i&&(bonusCountry=!0),setDamageKills(),GM_addStyle("#collection_complete,.blockUI.blockOverlay,.blockUI 
blockMsg blockElement{display:none!important}")}function 
setDamageKills(){$j(document).ajaxSuccess(function(t,e,i){var 
a,n,o,r,s,l,d;(null!==i.url.match(/military\/fight-shoot$/)||null!=i.url.match(/military\/fight-shoot/)||null!=i.url.match(/military\/fight-shooot/)||null!=i.url.match(/military\/deploy-bomb/))&&(a=e.responseText,n=JSON.parse(a),o=n.message,r=n.error,r||"ENEMY_KILLED"!=o&&"OK"!=o||(s=0,l=0,d=0,null!=i.url.match(/military\/deploy-bomb/)?(weaponDamage=n.bomb.booster_id,s=n.bomb.damage):(s=n.user.givenDamage,l=n.user.earnedXp,1==n.oldEnemy.isNatural&&(d=1,s+=Math.floor(.1*s))),Kills+=1,Damage+=s,Hits+=l,setTimeout(function(){GM_setValue(eRS.citizenId+".killsToday"+date,Kills),GM_setValue(eRS.citizenId+".damageToday"+date,Damage),GM_setValue(eRS.citizenId+".hitsToday"+date,Hits)},0),ShowKillDamage(1),options.mercBT&&MercenaryBTUpdate(),1==bonusCountry&&1==options.TPmedal&&updateTP(s)))})}function 
coma(t){if(t>=1e3){t+=""
for(var e=/(\d+)(\d{3})/;e.test(t);)t=t.replace(e,"$1,$2")
return t}return t}function ShowKillDamage(t){var 
e=coma(Damage+Guerrilla)
1==t?$(".user_finances.NoKills").html('<strong style="padding: 3px; 
font-size: 12px; color: #666">Kills today: </strong><br><span 
style="color: #3c8fa7; float: right; padding-right: 3px; font-size: 
13px; font-weight: bold;">'+Kills+'</span><br><strong style="padding: 
3px; font-size: 12px; color: #666;">Damage today: </strong><br><span 
style="color: #3c8fa7; float: right; padding-right: 3px; font-size: 
13px; font-weight: bold; ">'+e+'</span><br><strong style="padding: 3px; 
font-size: 12px; color: #666">Hits today: </strong><br><span 
style="color: #3c8fa7; float: right; padding-right: 3px; font-size: 
13px; font-weight: 
bold;">'+Hits+"</span>"):$("#eRS_settings").before('<div style="1px 
solid #DFDFDF; margin-bottom: 5px;" class="user_finances 
NoKills"><strong style="padding: 3px; font-size: 12px; color: 
#666">Kills today: </strong><br><span style="color: #3c8fa7; float: 
right; padding-right: 3px; font-size: 13px; font-weight: 
bold;">'+Kills+'</span><br><strong style="padding: 3px; font-size: 12px; 
color: #666;">Damage today: </strong><br><span style="color: #3c8fa7; 
float: right; padding-right: 3px; font-size: 13px; font-weight: bold; 
">'+e+'</span><br><strong style="padding: 3px; font-size: 12px; color: 
#666">Hits today: </strong><br><span style="color: #3c8fa7; float: 
right; padding-right: 3px; font-size: 13px; font-weight: 
bold;">'+Hits+"</span></div>")}function last5Days(){var 
t,e,i,a,n,o,r,s,l,d,c,p,g,m=window.location.toString().split("/")
if(eRS.citizenId==m[6]){for(m=parseInt(date),e=0,a=0,o=0,s=0,d=0,p="",g=0;4>=g;g++)t=parseInt(GM_getValue(eRS.citizenId+".hitsToday"+(m-g),0)),i=parseInt(GM_getValue(eRS.citizenId+".killsToday"+(m-g),0)),n=parseInt(GM_getValue(eRS.citizenId+".damageToday"+(m-g),0)),r=parseInt(GM_getValue(eRS.citizenId+".guerrillaToday"+(m-g),0)),e+=t,a+=i,o+=n+r,s+=r,l=Math.floor(.1*(n+r)),d+=l,c=0==t?0:Math.floor((n+r)/t),p+='<tr 
class="current"><td style="color: #666666; font-size: 11px; width: 
230px; padding-left: 10px;">'+(m-g)+'</td><td style="color: #666666; 
font-size: 11px; width: 50px;">'+t+'</td><td style="color: #666666; 
font-size: 11px; width: 50px;">'+i+'</td><td style="color: #666666; 
font-size: 11px; width: 70px;">'+(n+r)+'</td><td style="color: #666666; 
font-size: 11px; width: 70px;">'+r+'</td><td style="color: #666666; 
font-size: 11px; width: 50px;">'+l+'</td><td style="color: #666666; 
font-size: 11px; width: 50px;">'+c+"</td></tr>"
p+='<tr class="current" style="font-weight: bold;"><td style="color: 
#999999; font-size: 11px; width: 230px; padding-right: 30px; text-align: 
right;">Total</td><td style="color: #999999; font-size: 
11px;">'+e+'</td><td style="color: #999999; font-size: 
11px;">'+a+'</td><td style="color: #999999; font-size: 11px; width: 
70px;">'+o+'</td><td style="color: #999999; font-size: 11px; width: 
70px;">'+s+'</td><td style="color: #999999; font-size: 11px; width: 
50px;">'+d+'</td><td style="color: #999999; font-size: 11px; width: 
50px;">&nbsp;</td></tr><tr class="current" style="font-weight: 
bold;"><td style="color: #999999; font-size: 11px; width: 230px; 
padding-right: 30px; text-align: right;">Average</td><td style="color: 
#999999; font-size: 11px;">'+Math.floor(e/5)+'</td><td style="color: 
#999999; font-size: 11px;">'+Math.floor(a/5)+'</td><td style="color: 
#999999; font-size: 11px; width: 70px;">'+Math.floor(o/5)+'</td><td 
style="color: #999999; font-size: 11px; width: 
70px;">'+Math.floor(s/5)+'</td><td style="color: #999999; font-size: 
11px; width: 50px;">'+Math.floor(d/5)+'</td><td style="color: #999999; 
font-size: 11px; width: 
50px;">&nbsp;</td></tr>',$(".citizen_military").eq(1).after('<div 
class="clear"></div><h3>Influence Done</h3><div id="eRS_InfInfo" 
class="citizen_military"><table id="influTable" border="0" width="100%" 
class="details"><thead><tr><th style="padding-left: 
10px;">eDay</th><th>Hits</th><th>Kills</th><th>Influence</th><th>Guerrilla</th><th>Rank</th><th>Av. 
hit</th></tr></thead><tbody>'+p+'</tbody></table></div><div 
class="clear"></div>')}}function 
TP(){GM_xmlhttpRequest({method:"GET",url:"http://www.erepublik.com/"+LANG+"/citizen/profile/"+eRS.citizenId,dataType:"html",onload:function(t){var 
e,a,n=t.responseText.replace(/src=/g,"tmpsrc=").replace(/\.css/g,"").replace(/\.js/g,"").replace(/url\(/g,""),o=parseFloat($(n).find(".citizen_military").eq(2).find(".mids").css("width").split("%")[0])
currentTP=parseFloat($(n).find(".citizen_military").eq(2).find("strong:last").text().split("/")[0].replace(/,/g,"").trim()),nextTP=parseFloat($(n).find(".citizen_military").eq(2).find("strong:last").text().split("/")[1].replace(/,/g,"").trim()),e=(nextTP-currentTP)/(100-o),doneTP=e*o,startTP=currentTP-doneTP,i=doneTP/(nextTP-startTP)*100,a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAClFBMVEUAAADk4c7b2crq6OHo593s6+Xe3NQXFgqclXjKxrWFdz3q6NvOu2nBvaze2sbCvqrT0L3KxazOv3jZ0J6poHu9tZqAeGKhmny5tqj29e6/uJj89dfe2srJvozy7didlnO9uqhoYUHW0bnZ1L/FvZ/BuH/o4bzy6KrCuI7KxKv58crSyJa1r5Hdz47Fun20qnzCw8jFuX/JwqNxZTHOybjm5NDKvHfk3buhlFzp5Mnb1Kyvo36up4nPzaXFu5K2sI99c0WSjHj9+OHb0qWRh1pgVzi7taD78sLbz5nd1a3ey3rIvIOxnT+Yj2Gtq5yLg2Wzq4zq2IDXzqHIr0K2qWmgmmvy56xMRSfv6L747K/q5MOrnmp2c1ZhVipuZ0xQSRl/cjdcVjumnHSzolKOfz/NvG799tJ2bUvl3rCKgWDgz3qtqJG6rGxnXTaclG6kmWPTxou6pETHvIvx6b717Lm/rmKajVCKejXCsWavnlJiViDdy3nMtEmjlld6aiG5qWa2p1+om2TgzoKejDnIwJjt5bRRRhmhkUOGfVaVgzVUSiN+ckCNf0LazIjlz2tkWi6Ph2E8MwrErkzg2a5bTxr26Z7cz5DXwVqRgT2xnkeWhj/58sPo255wZjmUilzx68eckmTm033Qx6XLuWh0a0KEcyewpXHr2IitljRXTin7+OdKQBlfTgjv3ox9c0f37sny7dOpo4jDtnn98av79Mzt1WV+cjjCrETUxYHZx3P++tutnlnQy6zEsFOZkW3p36zj1pTz45Ho37fHtm+8s5eoppm2roGQhVC6sX7WwmfRyJpORyfPvF5VSA7v2XfgyVvp5Mb+++m5qFWonnJtXx7cx2HEvqagiSqfmX7bvkhrZ1Xp6NxK2iFjAAAApHRSTlMAFRwJIAQoAQQl/jb/QQ4IVi3+jZQajTQTRW3+SJ1UiWQwNmuDm1hSOlQ0y4ehqXQx1kfyT/y9/eF3/UTjWK91+G+OyfVMe0XYc+t4arleklvu+oj78XWw5LzUZ6MVrM7u8q328OLq8We10MjhINj6/////////////////////////////////////////////////////////////////////fQ1zeMAAAJzSURBVDjLYqA2kNPmhjFZ2dhYMeSZnQ6rcEDZTAps7BgKBI40cilCmJzCIvyYNqh0rOsHK2DnVHXgxeIEo6Dj/mB9fLLNXXAFTJxwBUqhE8PFgTSjbn3DSkeYqDJANuIQhpZqSNGSttNxLBzCQgUtq8Xg2uwWyItyMLCrLWwoKt56pqcnUWRbfeuCNn24wXzyy1wU+DUCFxetKl67adZurondBa3lM9QRbmN0blqko7uwbJH0+g2VdXMv9ddOa10qpAWXZ1Xz2ni0capQ96mSVS3bC1dXVk3YX9AzDeFNDg11vyX1iytqhdYWN9RMbyvv2jh797IdKOHAp7e0s71pckvppMKtdbVV82aXFfAYICtglPJt56o8WVTEU3hz3vzysgPz5iQboAYiQBI6x8pW9G2evHfvnqmzdhTeOJjCiRbMmhOaJ00v3NR4ufd69oH2a30JLOgxeaKg+vzM7o5tdZksO2cdqjFGV8AStaGppnJd7ZUuNvas0tnbjdnQFMiYFvfNnLjvYF06M0NGwa6KqgB0K/bMuTppyq3imSvZGJjMpSvWiKDKi5oVzJ/eLJV3e84UGQYm0y2la/RQfWmWaildPUNQ9pBVvyAD54UtPGctONmRQhIw4Z1GJvMrLFgEeyfPzWUQNF9fXcWliZSaPXn02WX2F+ZzMwhPm8vJwGRVsrx8iqEATJ7dttebn4E7jWcGN4Ps1AlirMzaJctL3eS44dFpbQ/MI5IXqzvFOXJ27YvnYFWO8JBiZEe4gZ0DyJYsqeESZDbc3BHDwcBoIoqZa1giVyRJMFie6xTjwJEx3YOjYzkkw3xcMTUj7AJDZAAAzmW9T/Cx7IYAAAAASUVORK5CYII=",$("#total_damage").attr("style","bottom: 
40px!important;"),$("#player_rank").attr("style","bottom: 
140px!important;"),$("#player_rank").after('<div id="player_rank" 
class="tp_barr" style="bottom: 96px!important;"><div id="rank_icon" 
class="rank_icon" original-title="TP Medal" style="z-index: 
3!important;"><img alt="" src="'+a+'" style="width: 32px!important; 
height: 32px!important;"></div><div class="rank_holder"><b 
id="gained_rank2">&nbsp;</b><strong id="rank_max2" style="z-index:200" 
original-title="Next TP Medal at:&nbsp;'+coma(nextTP)+'"><span 
id="rank_min2">'+coma(currentTP)+' TP points</span> </strong><div 
style="width:'+i+'%" class="rank_bar" 
id="rank_status_gained2"></div><div style="width:0%" class="rank_bar 
gained" 
id="rank_status2"></div></div>'),$("#rank_max2").tipsy({gravity:"s"})}})}function 
updateTP(t){currentTP+=t,doneTP+=t
var e=doneTP/(nextTP-startTP)*100
$("#gained_rank2").text("+"+coma(t)),$("#gained_rank2").css("display","block"),$("#rank_status_gained2").css({width:e+"%"}),$("#rank_min2").text(""),$("#rank_min2").text(coma(currentTP)+" 
TP Points"),currentTP>=nextTP&&setTimeout(TP,2e3)}function 
KillExclamationMark(){$("#point").remove()}function 
NaturalEnemy(t){GM_xmlhttpRequest({method:"GET",url:"http://www.erepublik.com/"+LANG+"/country/military/"+eRS.country,dataType:"html",onload:function(e){{var 
i,a,n,o,r,s=e.responseText.replace(/src=/g,"tmpsrc=").replace(/\.css/g,"").replace(/\.js/g,"").replace(/url\(/g,""),l=s.split("nameholder"),d=l[1].split("</div>"),c=d[0].split('">')
c[1].trim()}$(s).find(".indent:eq(0) .attacker 
img").length>0&&(i=s.split("flagholder"),a=i[1].split('tmpsrc="'),n=a[1].split('"'),o=n[0].split("/"),r=o[6].split("."),neCountry=r[0].trim(),3==t?CheckAttacker():2==t?ShowNaturalEnemyBattle():$(".bod_listing 
li, #battle_listing .bod_listing li, #battle_listing .country_battles 
li, #battle_listing .victory_listing 
li").each(function(){ShowNaturalEnemyWar($(this))}))}})}function 
CheckAttacker(){if(0==unsafeWindow.SERVER_DATA.isResistance){var 
t=$(".country.right_side a 
img").attr("src").split("/")[6].split(".")[0].trim()
t==neCountry&&(bonusNE=!0)}}function ShowNaturalEnemyBattle(){var 
t=$(".country.right_side a 
img").attr("src").split("/")[6].split(".")[0].trim()
t==neCountry&&0==unsafeWindow.SERVER_DATA.isResistance&&$(".country.right_side 
a img").first().after('<img alt="" title="Natural enemy" 
src="'+neIcon+'" style="margin-top: -2px; position: absolute; 
margin-left: -9px;">')}function 
ShowNaturalEnemyMain(t){t.find(".side_flags").each(function(){if($(this).attr("src").split("/")[6].split(".")[0]==eRS.country){var 
t=$(this).parent()
$(this).parent().hasClass("opponent_holder")&&(t=$(this).parent().parent()),$(t).find('img[src*="'+neCountry+'"]').each(function(){if(void 
0==$(t).find('img[class*="resistance_sign"]').attr("title")){var e='<img 
alt="" title="Natural enemy" src="'+neIcon+'" class="natural_sign">'
$(this).before(e),$(this).prev().addClass(1<$(this).index()?"two":"one")}})}})}function 
ShowNaturalEnemyWar(t){t.find(".side_flags").each(function(){if($(this).attr("src").split("/")[6].split(".")[0]==eRS.country){var 
t=$(this).parent()
$(this).parent().hasClass("opponent_holder")&&(t=$(this).parent().parent()),$(t).find('img[src*="'+neCountry+'"]').each(function(){if($(this).parent().parent().hasClass("victory_listing")&&($(this).wrap('<div 
class="opponent_holder">'),t=$(this).parent().parent()),void 
0==$(t).find('img[class*="resistance_sign"]').attr("title")){var e='<img 
alt="" title="Natural enemy" src="'+neIcon+'" class="natural_sign">'
$(this).before(e),$(this).prev().addClass($(this).parent().hasClass("opponent_holder")?"two":"one")}})}})}function 
MaxRecoverEnergy(){$("#maxRecover").remove()
var 
t=options.autoEnergyRecover&&4==window.location.href.split("/").length&&"undefined"!=typeof 
EnergyToRecover?EnergyToRecover:$(".tooltip_health_limit").text()
$("#current_health").after('<strong id="maxRecover" 
style="text-align:right;margin-right:5px">'+t+"</strong>"),setTimeout(MaxRecoverEnergy,1e3)}function 
StorageInventory(){GM_xmlhttpRequest({method:"GET",url:"http://www.erepublik.com/"+LANG+"/economy/inventory",dataType:"html",onload:function(t){var 
e,i,a,n,o,r,s,l,d,c,p,g,m,u,f,A,h,y,b,x,v,w,_,k,S,C,R,B,T,M,I=t.responseText.replace(/src=/g,"tmpsrc=").replace(/\.css/g,"").replace(/\.js/g,"").replace(/url\(/g,"")
if(options.showStorageInv){for(e=$.parseJSON(I.split("var itemAmounts = 
")[1].split("var 
itemPartials")[0].trim().split(";")[0]),i=$.parseJSON(I.split("var 
itemPartials = ")[1].split("var 
countryList")[0].trim().split(";")[0]),a=[],n="",o="enabled",d=1;3>=d;d++)for(c=1;8>=c;c++)7>=c?(p="undefined"==typeof 
e[d][c]?0:e[d][c],o=0!=p?"enabled":"disabled",p=coma(p),1==d&&(n=6==c?"Food 
quality Q6 <br> Energy restore 12/use":7==c?"Food quality Q7 <br> Energy 
restore 20/use":"Food quality Q"+c+" <br> Energy restore 
"+2*c+"/use"),2==d&&(n=6==c?"Weapon quality Q6 <br> Fire power: 120 - 
Durability: 6 uses":7==c?"Weapon quality Q7 <br> Fire power: 200 - 
Durability: 10 uses":"Weapon quality Q"+c+" <br> Fire power: "+20*c+" - 
Durability: "+c+" uses"),3==d&&(n="Moving ticket quality Q"+c+" <br> 
Energy: "+(5-c)+"/use - Moving distance: "+c+" 
zone(s)"),"undefined"!=typeof i[d][c]&&0!=i[d][c]&&(n+="<br>1 partially 
used. Durability: "+i[d][c]+" uses"),(2>=d||3==d&&5>=c)&&a.push('<li 
class="first '+o+'" original-title="'+n+'"><img 
src="'+itemicons[d][c]+'" 
alt=""><br><strong>'+p+"</strong></li>"),n=""):1==d&&8==c?(p="undefined"==typeof 
e[d][c+2]?0:e[d][c+2],o=0!=p?"enabled":"disabled",p=coma(p),n="Energy 
Bar <br> Energy restore 100/energy bar",a.push('<li class="first '+o+'" 
'+r+' original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAACIlBMVEUAAAAAAAAAAAABAwMIAAAABwUAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAD7yW8AAAADBAXXLinixFQAAADHkFfpIyz6SkDls2jNmobMk4DkGR3CfUmbSirNJDrIeE7hRiHJm4t6AwW0d1glDhKwPSjdEBpLFhKcSDHjDRLmEBiTMh/pCRDekWryEh2OUSn1FiTje17sEh71GSbWlIGmDBWLTkFCGRWACwbbi2ffSD2lUS9vRTKAKxXcqaLuTj7//////v3+/P36+/zqFBnxERn/HCnGBgH19vbm5+jM7JD3GCL/p23eAwP+fVvCHAfs7u/liHTVenn+r3f/lmbXQAn4aBXoUQnweRvX1tbUlZbg39/JtbHD5YPg5tnA1p/lpqvjnqTVFAuKEAChIwrpCA/FKxPHUA67OQKnMh/zLxfmcyH2+uvm8s/aqKfgw8XXiInN38O82oixzYSOIwmrBwD+clflXUr/jF2lLAfilpjYJh2XDADsimmsTxXwCQq0DAPkNRisEwDVbRngDRL7ml3ZYg3BHxz+oGv/WEH7ThH/cUy/qJzQ0sXm1tjLxcOv2WBtFguWyDf88/NytgJ3DwHL4KrqlHaYtoltoC2rxonU7KN0oktfnAbZuLTwf1mmOw2zQBjJP0P8NTPzXUbAWxjzoHX9hC3SVhn9hlD/u4CyLRDNPyz/YVWyaGaJszJKhQC4zq7OV13rQyz14eOzHgKNG6CVAAAAQHRSTlMADBYjAgkGAQQPHiobRDEGOVUiE2BJRvsoi31zL6oMPybKgnNyGsNsgVuk7YdbyDWvvO3YpcxdpP2WvNlP0fGSLF7jOwAAAzRJREFUSMftlGVzGlEUhpewBAghnqZpGne3ut5d3D0Qd3d3d3d393r/X+8lRJgORL61k2d27izMefZwzjsL9sgj/z5+cS4P0YL5+SEP0J7k8SS88Ptavu92W3P4+dx7SY7u8Y2NDR6tEj4v6h7a07eq9k2tvGGvm8+VuNzZ8qxSL/ZrtE1a+c8SfmfMHRQ6hrl6VlSKKqtUUqmmSd7Q3SnjPcFv11yfVWxkCIVgNlutGWo6Hi3JkckSbrUcoz9VjtdmkCQBiCyV9HBkZLg7R8DzYli1cHf/jdTM2kwSAEAC8oc+CaJTCARcR6vreFExwamurSkHZeVlgABZBYcGva7oVNHFjbAowcFSJoQEqK5JX10VpyOPs6M3GEqPtn/31HN9LOUcrU5RAkh1ulgsnppCEwK1zjBQWJRXFxlmKcLn8e2qLKRxFsTi9Jm5ckDChi0Fpb2FW5GvLE3n8rlxU7qYDSuBMrNmZXluBgCCQF7vfkeYqwUr1stjTz50cgA9AggzlMq19QUAITkp2x3ezy29KzGK4mH5kFRz0AJXD00gWv+KfrBQlPzlvbvF0BJ5kryz4dF+zYnqFyA4MLrv3zIBIRSljo8FumIWieLyW4s95FqttF0NSLSNpWWCI0pNTvP0s/qiJfbxT8/OR4/7DYps4zbWVkhR8qS/L2adcJ6EW+xxPqJPKh1EUQiXMlInx9xx7Dbi+viDit0SfenA0WDVLOAok9MCfe7y7yPJz+/hluh0A72FBTspaWnPgrE7ESHrFHTxFEWFRfsdzcUoMTodXvBA59XmTffXn10SZLI2QU9zXvNWnXcshjEgOMMIjuN0HJ4m6aaI22JefYL63Lbc3LqPH2g0JpNJgdBM2BoxPgJaZh6FEgK9+fnpUKodlWpnZ29vg2BecPEMpJqJdJoNlRWQ09U2/dqZzXZyYLFYVCSb7EsViqijmebEZr8UvAlyc3NzhiLyrrteatAz68egwHZO7NCAIGc3Z6NmbGbmQIwTmu2TQWPa2MOxWA4OqNXfAlQQOLTMoDNsbWmU6yUYt3BdDqHDC0WARHMVZoQwVaJiU/KwFNVbgX4Fur/5NfbI/8Mf2SHRTYP80k4AAAAASUVORK5CYII=" 
alt=""><br><strong>'+p+"</strong></li>"),n="",p="undefined"==typeof 
e[d][c+3]?0:e[d][c+3],o=0!=p?"enabled":"disabled",p=coma(p),n="Double 
Energy Bar <br> Energy restore 200/energy bar",a.push('<li class="first 
'+o+'" '+r+' original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAACW1BMVEUAAAABAQEAAgIAAAAACQcAAAAFBAIEAAAJAwAAAAAICAgHBwf3t4YAAAAAAAADBAW8WT3ozWWbf2IAAABwVEyBVUTlrXHarIjmnVvKm2fbJjAtCgyjUjS/fknKkGTgDRa7lGnOmoyiGhvmChPqERycSirmw4jvn0f0ER5gEA+XTTjsLDRkFBHwyZ+yl5HbjXakiHrqmjTro1PiBgqlUS+AKxXfSD3zzaS3fm6fnZ////8AAQf+/f0BBA/7+/sKDA8NDxUUFRgaGx3wExr49vXK6o6uCAPEBQHxjQsmJiRaNwDz8/LBtK/+qHL8dVQVEgbokCXm5ubs7u+NDgDipqj9HSfdCATRcA2dbQBtQwjg4t/X1tfVi42qxofXsa/Ozs6RJA7pkW+kKgVDMQnCHAb3qS+eZSY1MStlTDDboUq81JfwDA/O3MJ8DQHFKxPWIhbHUA7TjwDYTxHxdBvYfwizNwGzeADXYQyxGQXQPwsnGwPspj9JPCa4jVr5y2xVSDTm8s/oDBNvsBLgw8VzoEHG3Ki82oizQhTee3X/lmf/jF3TtoX0NSbgl538VT/lkgLlPx36ZxWzZWjRBgm+WxjjLxirKingbSPnfRI2JADqoAbHeSV3UQEgKTL3qArKo17CaQB3Vi2igUlCQDuLb0DGkEKsfz+/qJz0+efA5Huv2WDLxcOWyDdtFgtfnAbS6Kff5dTm19nmYEqmOw3JP0P/fmH+hDfBOAP8SwnnWgnBHh+sVjDNlWSgVRCkZVT/sUq4zq6JszJKhQCRsn/PgHvOV12eDQCxflnmtmKnhiMeAAAAOnRSTlMAGicVCQYMAQQQIC8HRDlVHRIxYFIxQ2uV2ydufEJZyJiG0X3yqiPLq5kQSXPq0sJ18rJV2dG8w7OesL3VXwAAA/hJREFUSMft0XVXU2EcwPHLkg2RFrC7u713d82KsUBWLNzGkhAEKSklRRHplga7uztels8DG9tl83j0Pz18z3a3s3M/9/fseZCllvr3W7l95d+wWM2FdX/BdlkFgrxDf6rWHG0rLNRc2IyEa9mKY3v2JNPoob/ve/RI0V6o0Qg2hVMpKolEokpZu5Mot6bYbIpWhaK9VyMQxC5mcSmScYNMJjOUSQ7GU+kBtcH0xWbLaL3U+rSjTZO3eGu2btPJlBhMKdMdiKdACN5xGywN6gaTLSMj49JTRUeeVrCLTljkwfFBYLh8HhfHBnUHkqh0wOKSsywPhEJUmHUROIWiTavVErcmeUCGceo8Uj4fSCzn6vqISGTZ2qyG/NwHLBaKogA+e/GivbdQnLcpMshte4thE7W10+4pd7WUi+lViYwV+ywPm8y5ULFQ1tfizs6Szg6HWCxYFuRUYNykd6ZmemxyrJqHg4HHLQ/Z+ebm8+iN80I48PSzkpfFz0sdogvbg9zZcxivunq2pu5H7ZiUz1GeeSPPZKH5zWn376fdvAEc+8nLkpL+4pYKkQgODDicz3N7J90ztdNSKVd55vKpdBTNTwPdusWGa71YOVBeVGq3bly9EiE66ax3amr2/cQ1v2M3paXdvFN/HoXuyukBXdFjayIYFuwGMa6nqu5a3cx7F3Dn5lxmbrO5vv4OCmIBp+t5vToOIaYyYByX0+XxqFTDbj4uG5IDJ8zOzGy81zTn2KaWt1vikcVtG1dihuHhCY/L4MrBOWVVcqMQBanvfYSbkq42dh1eg4SWLBnBMA4HnDqPy8FHRmvkajbcjg+fclFUqM4+dR0uMbTYVMkIB+fwAMNxw5D3XVc6C5w2+rkRZWdmG+XrY5GwRcanSvQ5ShzHOTn6Ue/3noorKKzRzFIbb++FSwwfNSnVebVMr9eXDY2+eV1a3v8qC7B0c3b27etr6cgvo1OZ+1OrnE5nVc27Pkdlf3nxK5MQrNEo378zLAhAclTiib1dfaICR29lZbmu6PQTk0W+IRb5XZEUMpO0UdwtqhA4nheV9rTY++CJ0engBS7wujAERJhJS9rcrf0mrrDb7Y+tW5LAw0B08IYfMHD1ISJENmnFopMg65FECoXBYNBAFF/UueAjoCQOpK0DrqDg7m5SBInJjJiLTGbMN/8MSInrpJBJpN3dopN3d8RERy+PiiKBmFBDS/ZTCOHEAIsgLY+O3iguWJWQkBDjhwQH2bwL2lAamRm1PHrVjlUxCTGQLQwLGJDvHxJOgkGOALeSokAkZggA+Xd20eFHUqkUmn8TfLsQuN0XPAIICcEzWsh/Xoj/0Ij3h1p/8Hvwz8hS/08/AUfvIjtGeQ6zAAAAAElFTkSuQmCC" 
alt=""><br><strong>'+p+"</strong></li>"),n=""):3==d&&8==c&&(p="undefined"==typeof 
e[d-1][c+2]?0:e[d-1][c+2],o=0!=p?"enabled":"disabled",p=coma(p),n="Bazooka<br>Defeat 
enemy with one hit<br>Damage: 10,000 - Durability: 3 
uses","undefined"!=typeof i[d-1][c+2]&&0!=i[d-1][c+2]&&(n+="<br>1 
partially used. Durability: "+i[d-1][c+2]+" uses"),a.push('<li 
class="center '+o+'" '+s+' original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAAAllBMVEUAAAAXGRYCAwIDAwMAAAACAwIAAAABAQEICQgKCgoBAQEwMzBscWkyNTE4OzZXW1N0eHJna2QuMS1TV1GYm5hqbGd4fXI/RT1ZYFY/RDyMkYiYnZRiaF2kqKA1OTHDyMJtc2h0e3DQ0s6Rl4+GjIK0ubJITkSAhn0iJB5QVUtnbmItLyp7f3iusqu9wbsPEA6JgZWMkrgwHd3RAAAAGHRSTlMACyoxECIIGQEEOFkrQ4GQkWJr4WLJ9bMNwug3AAACgUlEQVRIx+3Ta2+iQBQG4KIiIgJe1naYGzPOcAfb/f9/bl8ITVOJLt1kv/l+JHnyHg6Hl2ee+U/ZnV8Pm39gnKhi/0PkH06EcG3p7gdF4W5XJZVuKTVibqETvCVIXudaGHHN5rndXgJVGLEueJZeBD38recXEihSNjKvlS40bS9dS87+wy2EMec151xWeZIXpO+zlEWL5eaBco8Vr7UVjNgCq9c1J1Rn6fFt+6grPKlW9arVxrS1yJiyVAssxF28bO71OYckr4geXoiZgtIsFTq95kV6jrh1p3AX7w+Hw4kTvJgirWHMWGpEl15Zm2ZRRZViryvfv3FhQmxLIAikLRIjGKUsg2IFTfcLpXTP1jdulzRJ8v5e2oKrwtCCaMEEvtdFBLGygffxYbJ4tXbWvv/NxVLKd0QKahi1hraDunbnF69JTuHHbxY7q5Vz0+dXcGUf1RmL+TIzKBN7jldKHkanYOV5cOtvfU5NSN7gpGTODOvSS0cvaSZU4K88t5R1BASGwhtHKdV5VeE6dNc3tTQVxdGDcreltJHnDg593+bcsOwqcE1wPL2knSWC9iO6SCCraAE2uNt97lGi8jyRTSWujFdFvOy7Fsg2CKGQiUJ2cF0iZVPmxh6PUQgFg6DRm5Z9DYo9qAYLJZGHhQONCgIZ1TRhJihPGnyroWmJjAoCGdU0AauTpmwS1wUaGZSDnj53fgQ8DnguZRK6y+V2uwVzXXSh5w4ZHe7OC6LjwoVCwNAFtXmkUOevHcdZeYuR9WVQUzR1UC7YV9mg5rrlJxv+0LkOEApsWPtsB4iMBzXTDXByh3MKAZFezWaAfg+Rz+3PL4RExrL5EHI8xGeeuZc/JwFHyim6QbMAAAAASUVORK5CYII=" 
alt=""><br><strong>'+p+"</strong></li>"),n="")
switch(g=GetDivision()){case 1:m=75e3
break
case 2:m=375e3
break
case 3:m=75e4
break
case 4:m=15e5}if(u="undefined"==typeof 
e[2][parseInt("1"+g)]?0:e[2][parseInt("1"+g)],o=0!=u?"enabled":"disabled",n="Bazooka 
booster<br>Damage: +"+coma(1e4*g)+" - Durability: 3 uses",a.push('<li 
class="last '+o+'" original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAAAtFBMVEUAAAANCQgDBANfLzMuBgY3DA0NDAoOAQEXMz4FBgUBAQEDAwIbEQ8NCwoaGxxnEhKeGhp8ERHiGRnbGhpVbnVXBQUoQkyFFBQNJS4jPEY2SlI5AwMHHSUWMzwrQ0xSBQVDBwc3DxF0hYyRn6NBWmJieX9VbHOdHByMDw5yBwcbBggyIygIBAUjGR1LZW5zGRlWExYgMDnhWE+3JSOrERGRKCf1d21aODt0YmXJPjleU1fDW1HAc1kOAAAAGHRSTlMAf0cxDSCRA380GSmocPFTNnVanXbZ3p+6Q7ndAAABfUlEQVRIx+3Vy3KCMBSAYUEg5VqvLRBDEgUBkTuKl/d/rwKLbrrhsHDamf77b5KTMGH234uaP5/5HM7e62sVRQsok6Pqeo+LSIYxtI2qKqSYboHDJW3bJn2wBTdB17Er2IDcR7D3HWITz3sDOWd/yBx7Z7twdxycO835v9zROKKn8/nEMMyx/FIMjk/d57T1OJ82H8avvXf3Rd8nmeqCg987b4IjU1wWeINzgM71nbIkJXS+z7qqw65LuAS5eVTdY8poHkrA5/oSUoxpuAC/87dHuUtl+G9lHzg7ewZ3QdY5BHe+69kEzN6bMC+KIocOuGyamHbNoetRzhjnHHgPaJV7bV2SpJZAbhUV2e3qkiReIwhrGB9ciuP1WIQQWlLM/cfdISnDsYTQKCZpsoA757Cyd1zXJDSK6aqCGbdSbFm9E1UNoRFOVlWDWYJgYUVRDIZFVZbGOdE0hI6kSg+NkQ51+xRF0xSGTFMUdQmNcf3B6Op3ujb2QH80+7t9ATNXODEhiu0fAAAAAElFTkSuQmCC" 
alt=""><br><strong>'+coma(u)+"</strong></li>"),n="Food raw 
material",f="undefined"==typeof 
e[7][1]?0:e[7][1],o=0!=f?"enabled":"disabled",f=coma(f),a.push('<li 
class="last '+o+'" original-title="'+n+'"><img src="'+frmicon+'" 
alt=""><br><strong>'+f+"</strong></li>"),n="Weapon raw 
material",A="undefined"==typeof 
e[12][1]?0:e[12][1],o=0!=A?"enabled":"disabled",A=coma(A),a.push('<li 
class="last '+o+'" '+l+' original-title="'+n+'"><img src="'+wrmicon+'" 
alt=""><br><strong>'+A+"</strong></li>"),h=0,y=0,b=0,x=0,v=0,-1!=I.indexOf("+50,000 
Damage")&&(h="undefined"==typeof 
e[2][141]?0:e[2][141]),-1!=I.indexOf("+250,000 
Damage")&&(y="undefined"==typeof 
e[2][141]?0:e[2][141]),-1!=I.indexOf("+500,000 
Damage")&&(b="undefined"==typeof 
e[2][141]?0:e[2][141]),-1!=I.indexOf("+1,750,000 
Damage")&&(x="undefined"==typeof 
e[2][141]?0:e[2][141]),-1!=I.indexOf("+2,500,000 
Damage")&&(v="undefined"==typeof 
e[2][141]?0:e[2][141]),o=0!=h?"enabled":"disabled",n="Rocket quality 
Q1<br>Damage: 50,000 - Durability: 1 use",a.push('<li class="last '+o+'" 
original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABIFBMVEUAAAATFSETFiMTFSETFSEnEhYbFRkdExI5FRIvHRVdGgFPGAESFSBXGwAUFiMTFyFdGABTGwDtnB5iGQDqjxoUFyUUFiTfbRjvryhnGwFbOA+qSB2GHwacJxBNFQLdeBlwMxZ7HACAHgDthBv/thcSFSGvKQjtQDu7Lg3nOi6DIQBiGwH5TFDVNB5tHAB5HQBbFgDcMBzkeRcaHC/HLQzEMR+NJASTIgP0REb7U1wlJ0DLNRsxMlObJgQjJTHfNy3hihP5uR89O2XOLg2lJQPvpRUVIUv/zSD/2yn6qRX1lA/olQ6OTwetQw/Sj0DRUEkDCyfagBz7wh1WWEvHegZvPQT4WHGyaQb/zSujWQrIZRX2ulLSbFCdeBrIvES7qD1QXOCwAAAAJXRSTlMAYPBzRB4oBRcMmDOjVILieosbaIHRljgLy9RsUMTi1KuI6JNfca1qVgAAAi5JREFUSMft1sd22kAUBmABQkiiQ6iOHTuJBhXUABU6GIzpmB6XJO//FhkBIVnJM975HP8rbT7duaMpIj7yHhMgGExBB5M311/Fy89YZcKsJJqA5w3jAoMF89ut2O/JhULByKCzpCZN948z2S7aAqCRWUxSrelm8rSoFgvyJTKLKyLgwX7UnS9sHSBPCwtZpddezJ+fXwzZYtAUzSom6MlCdfcy705m1g0a87MSZO1CsbrbLTrjveRHqxbX4CAdVq3a7dlmGg+gzaSm9h1WhDMp6GCbR2NJSenzOmRFGzLeylFILqwpFi8L9kHJwMwFEZkkgnobri1BkCtNkaXctsk5QQk2B8sJgq5XgKkk3RYY8+/pSlOaoC7Leq8CLDUXZFxYxHcueKFpJjDq9ToPmqISC7i1FuLI01P2W2eqQmY4SpXChEsYyE5vTXzp3G1mfOWglJjrIqGiHBciD11kIButllBZqsK6dkaQ3CFRH0Vklp277v2P0ZOpSnCIrvFw5+Q7I8iGq0np8SpOI7OH1k9YbLgal0qfmNcWCO33/Ad/D4fdCWRZlC0TObFya7D+de9US6Bt0dCR1Rq3g/V8jMhgqJT3yG4Hg/XyewLj7I+UW5A1yg+t6yzWcZ6qNRq1svMd8e6OdK3WggzGj1WPprzcMSTm/UaenI+gsUoy0aNL05EQDmT+DjTl9bxpoGnMDhnPsT8/gRnaB5mHJrBDeb3OgYEfH/m2fxSG+Mh7yR974mLFsuWe2wAAAABJRU5ErkJggg==" 
alt=""><br><strong>'+h+"</strong></li>"),o=0!=y?"enabled":"disabled",n="Rocket 
quality Q2<br>Damage: 250,000 - Durability: 1 use",a.push('<li 
class="last '+o+'" original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABNVBMVEUAAAATFSESFSEbFhkUERsTFSETFSEiFRIkFRwxHw9VIQITFSJoGQJNGQJeFwBZGgFTHAMUGCTelSJlGQDtnR4TFiETFSETFiHphxnyoBxTJAFnPg11HQCcJhCrSB3IUxvdeBl7HAATFiF7HAD/kRRmSSgTFSBxHAC+MBMTFicbHS9cFgDKLw2uKAXrPTV8IQHbOiqRIgPwQUD6TFIhJT47OWG2KwyoKgjzR0v1phfliRftlwmJIQCcJQTbMhlmHALTMBr/zyKTUAT6ujAtLlDLNCXleRhsPATJbgjlMyUFDSbggxn2thn+2imqRw7DXRarcAnGZD3aeBn7wRzxjxaESQjJiBVSJAiOLhH/qQS3RjDCX1DpnEkOHVDCskBPWVGkWQrUS1TYhwDZiE01OjRmVkD/v10NVDaVAAAAJnRSTlMAQZspHG31BBMLin5RNB6Y2tQLcRtMWuKLcmHM8cRsMtSIs6xGqtDPt/8AAAJNSURBVEjH7dVXd6JAFAdwBCWoscfoaspmCyAd7KKA2DXW2NOT3f3+H2Fn1aNv7OBbzsn/iZcfd+7MXEA+8xFzgoRtCr8vcvP9onx5aqtMIqCLMp+jafrKBvMFWy0xz2mCIDSu4VlisTBHL3lDKRSEHAHNPKCY2Vbbr+m0YlzCs8VsNFgOi7X3V0XjobclQFHm29tw/f6nNm4YshtOEQFKzuXbq+L4/qGmDuQbyEML6GXekNal2sP9uKSOdCcc87Aiz0lKARQrrQdt03MC5SIsOLWOkk4XxuqqvWwl4ViCpfK0pqSBk4bqfBbEoNwpC/bEEArpgiJ0aNNM+iCZXgbNCYogdAyuonswqzHZx8eC5mhJEjqaxvFlKmK1le7DU5ClKrmGJGkcx8ti0Gd14F7vvuAVy8o5utHgaL4iUh63VWvfyOjuKRzvzUSe5migytSF5aV0o6Rj99azr6XifJDj6HylLFIRvxXDYiSJOjbTdQ3Y7V0P1JIpKmDZGeIgN4m5MORHD7BqtThcUjr7n7lxkfskSyvA+nfTyUvQ47dm5wfWZUa3VcDU5iQOdtE6TqfrAH899fu1abMZD8MMqHerUgzz+PxUVZvNL2cITJzolmWy2cfn+bQHGFywEJ7asGw983sCwQ6X08swdcCYLvMzbOtzHsrU6xkmleqGEDsh0EyGASxFkk5b9QgM/6dAHDb/bw5yGy9C2Crpjm0dSnhRO5DAdwVDuOuohaI2OyS2d9wFFmkTgiuOnxOI7WA4Hj1BjogreowCp4985qPkL2zxaOcdKlVjAAAAAElFTkSuQmCC" 
alt=""><br><strong>'+y+"</strong></li>"),o=0!=b?"enabled":"disabled",n="Rocket 
quality Q3<br>Damage: 500,000 - Durability: 1 use",a.push('<li 
class="last '+o+'" original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABRFBMVEUAAAATFSETFSEbFhogExVvQhcSFSEfFREUFiIUEhtfFQATFSFNHQITFSDwpB9YHwITFSETFiNaFwDqjxpZIgJaIQFrGQBNJQYSFSAWGSZZMAOcJhCGHwbHUxv/phXceBlrQxJMFgW6MiWAHwB7HABlSCmeWBjthBsTFSJrHwJhGAF7HQDdNiIfIjnjeRefJgOvKAW2KgxVFwLghRj6uB6QVAMaGy7HaAu8MA7LLwztPziRIgMyMVP1RUb9pBC+VDw9O2XCMhr/ziHPNSLvphjtjRDxmBFrQAGkMRDAVRjYfwDmlAGHIgAmKET+2yn8wSDUMBXRby2PLw/5rAd1MAfWQkyycACVRQjnl0LkPjVWWEvILyylVglZKQf/xUKsRhCAQAazQirdh0LCY1MCByMtLykNHVHFnjPbuUTHggn9TledeBubJNDPAAAAKHRSTlMAQZspDAjvBBQcG3M0YhmSToJSgXZlh5jD3tLEUDJS1MrXX+isqnqTq+m/gQAAAkxJREFUSMftlFdX4lAUhS8JgSAg4Ch2R6emIaQZkoBIk94EBMWhztjm/7/PpTpP8V7fXMvv/cs++5x1Az54jzgBhWmsebaC376W9w+wYra2Od6MiNFk8guG5tnL5VphvW4YRu8QXduSfqnXd/l0PB6/EdeQtc1cq9UplrT287OR3kfWtqdhV9q5Mm7HhcgBusZ2isVCYtx/bPTqph1x+9s5tZPXmpnJpKuUBmYQUfNJw+tiYTTudyeJ7OU160LTghwPm2UTiW5NHg001UehbZLjI2KhpHQTicumdtXac6LdjWPDUaHdyCjyqFB6Gp6QSN4Gx5pi3Yi3G81zLd9Rjz2IGleO6IIRN3paqTjkfKTVM1nhkTgeTnlzIwj1vKrmNq1W+XJV6kRiw2JaEARdF012z2N18IB7tecfkmSKyXRaj0bCPB+0W1XbYfzLtJ+yykeSehJaZZbdABbYCca2+Or6ZznzNBD1aD5c5tlNy6dD7jIMYZu1OIRasybDLJNnfZbNgI2Z4XCT4EjOZpRUKlO44jlpA1jiZVYcy+dQq9ayp3eS75XX7X/Rfv/5q6T61drl6eknygmscbm8/4kP1aoy1dbB69CBhXYWur99TKFqMJKYa5XYxf3tQxZRg5A7jmla7OKiErptHEENEQoEZlrsjAl9p7B+57uVWKxyBsfdBTjQRCgUghrEhZVHkw5mjg1gQdkWnhvQWJH2RSBBBwgckV4OuuPwYlVcDkpgNrR75/1cABPaDTUvDbAhHQ6/E7wBtx9TWF4ffPBe+Ae6I3ACf1bFMAAAAABJRU5ErkJggg==" 
alt=""><br><strong>'+b+"</strong></li>"),o=0!=x?"enabled":"disabled",n="Rocket 
quality Q4<br>Damage: 1,750,000 - Durability: 1 use",a.push('<li 
class="last '+o+'" original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABQVBMVEUAAAATFSEaFRlSJQQUERsjFh8SFSAuFBE9KxgTFSETFiJNHgJUIQTvpB/rjRpYIQNgOAlaHgATFSETFiESFSAUFiMVGSZOGARLHwRTJAFyJACqSB2GHwXIUxv/pxSdJxDdeBlxMxeBHwASFCATFSIcHzNfFgC4LA6sKAfhhBf/pgTANBfjdxdoIgXsQDv8uSLUfAu1bQIkJ0IyMlR7HQD/zSLKNSX2rxvPMBHVMieHUATLcge0RDA9O2WHIACQIgRgOAJcJgduQAGtQRh5LgmWRQjEYg/ylwOcJgXwpRX+2ynmjB1OIAeiVAiPLBD3S1DwigqTVwCZNRDYhQDkkkG9WEfolQLEWjX7wh3vmRfDWBqfaQyAQAbIaEcFCy0tLioNHVBOWVHRjEHUS1PtrEr/wUy2VRNmVT+8qT3IvEMRFB/AZ7a1AAAAI3RSTlMAmyiYHBR0BQxE6jQdGYV2z1JaZ8OE3t+KYodsUDJSxNSr6Nzd+1wAAAJXSURBVEjH7ZXXctpAFIaFQEICY8CmGbc4rDoCid5M7810HMA9ccr7P0AkIM6dsps7z/jTjO6+/c/ZI+1iH7xHrNqDxoHdGbz6XLw8Q4o5MbOJEs9xknSKoNld1Wqdz2QikUjqHF476VfG6oDPRm5uIhwBrTnL1Xojv8i/aFr2ElozV3LqYNgUo88vkSx/Bq2V5cZ0uirMvn29S2VKFOTum6vjxqQppu/ms+iiVgrCav2NqrwWelrYfNRSZQucFizLdVUcLbWwXqGWzwWsUNN29nPrSW0Rnc2XLTE/rLuscHNjK2tFKSzTUaGwGuU3fhzKc7NysTEVhcJSFJuTxthlh9TYIs81W6JSay6UjWzGjX6TN+wsm+ClbCrfar0OB+Oq02grqb8r+Fm5zaWyWUmdqvWKy240cJJ8CzztsyVOSqUy3CSXKwcoo9Y8gP6TeyjktCozEse3i5WyGzOAMgF6v6rjk9BRalxGtxKs88BIw30AmOhtF+ealr4VJL5dSshmw84wGoBQKARsJI5dCL1OOplMr4YJlnVjhhwD3dNfwCWInWiye9sLD/yBA2PtCOhs3V8P63RS076Ew4faLhpjseiBu1LvH350u1Fdc2D/hvDuK2WYx6efSUhNjzTttFj8+vHpeSRoGhy4x7bTrmPMd+XCgXD2ewGjaXHmnrmikI5zXywejzEAAB+GAmFiYgyznaIFKY/AbWAHjXi/0ds0AEiMQIqk9oEmwmtCESmwxwOOEQvdByJ2SO2+cdKCIUKQmnZEYMjgNpt+YKBD0tj/YKWwD94LvwHHzmi2jtqstgAAAABJRU5ErkJggg==" 
alt=""><br><strong>'+x+"</strong></li>"),o=0!=v?"enabled":"disabled",n="Rocket 
quality Q5<br>Damage: 2,500,000 - Durability: 1 use",a.push('<li 
class="last '+o+'" original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABOFBMVEUAAABXJgUTFSFnIgUTFSJGHRETFSE3GA8YFBw4Gg8UFiMUFiLldSLulB1hIgHlgRh0MAETFSATFSEUFyRHGw5ZLwZUHAFKHANTKQRoPAIUFiK2Lx/ghBdaNgFVJAhRLwDbgxaWIQeoYBfqiB0SFSASFyocHjG4aQH5uBeKIQT1lQoeIztsGQDoPDTwpQ10RAGQQQm8egCzKg3kkA9WHgRcKwR6PAOqRBPohwoyM1bmgRf4S09MIQizOiDGZQ1uNwV6LQixVQv+sxv+ogCTMhAqLEg+PGb/0yKqJw3KMRubIwTrlyTQaxt/SgH6v0CIUgC7Sx7cgAP4rTa3RkB/aDj/yCH72DNIFAO+KwvgdCSgYAXVglLJcwPeiC/SfwHIZDa+UTMYLVLOPDfkNRiBgU5qUh7QVlu5W1lEBT8+AAAAJHRSTlMAOOtYQQZfDiQZplETKne7jnOI3KQnjmjc8DR9mUvB9t63st6myGXtAAACFElEQVRIx+3W13LaQBSAYVElQYLBYMCOS4pAvQKS6N30Xk23nfL+b5AdIpxLdq8ymfF/rW/Ozh5dLPbev8zlQjc46fD5HYjQ5fCz7XYz/wlN+VJCW3sVxRcUh9se5B67fBWz2ZYNgTlyqZVK5wETNRKBpYolZSRtf2bF1heEC8kN6HKtO+6vX8SmD9rd5VLKzuxO1v1KocnisMyW6im1AjNe/3qqJpQQrLvKFeldebLtj/f5girD3iYZTZZoTtpPthWuXNP9LkgWLg5qhlkZ7yej6qYYJSA3EFno6mZ46FS4YZ5eXdug7wScssodDmZ1pJSgGf4gDxTDZMy8saPle1iGhZI9dWMMTalQK8r+K1gWTgq6Wh0ZBq3quQgJvfCFwLbLCY4u6fK17dy+idMHH74mBa2llVW6l7w/OyxAkRa7SKzYZWvJ6gP5/L/sptxvTJIKmtZkhegdBPNY7DYhMbPOkBWEMAHBQB4neZzGNGadrrKIYBDMKvSZqzCNBpPp3kIsLUC99YOZzQF7uvh4nnmpv8Wm8zlg3yAYRhDuk4rzz9/7XKYDGExkwGL1x/TzNMMBBgkvLfaY5vkpYNDQ6w7G+TRggBMYSs54PV2Px2IU5URyhIfnj4y6xNAGeo8MhOEEjgDx0yYJt+cGQ+jGcsEg2lEJ+x9nd2NoOe1H5kR+MwBoMUToRWfWFi2GOpDA3vs/+g04OmAL4H/nJgAAAABJRU5ErkJggg==" 
alt=""><br><strong>'+v+"</strong></li>"),n="Small bomb<br>Damage: 
"+coma(m)+" - Durability: 1 
use",-1!=I.indexOf("/999/21.png")?(w=parseInt(I.split("/999/21.png")[1].split("</strong>")[0].split('">')[1].trim()),n+="<br>"+I.split("/999/21.png")[2].split('class="extra"')[1].split("<span>")[1].split("</span>")[0]):w=0,o=0!=w?"enabled":"disabled",w=coma(w),a.push('<li 
class="last '+o+'" original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABZVBMVEUAAAB3HRspFBhbKys1JSq4Ix0YDREtHR86Dw5VHR0WCQ4VCg57JiN5HRktHyU2LDE9MTV0Ih4tFxwvJSskExk6JSgaDxR+Ix8zGx9FPT+DIBxXDg+QLSs5LTJrDQt/IB2TJCJYVlelIR1+hINHDg1XEBBIQEKFJyJLKyxUUlFveHaqtbT////7//vm7Oe4v7lYUVLx9vBRS0yEJCGorKjq8u2TKSXW3NZgLy7O1M1BODv1/PTDysN1dHJ/fXtlZGNNREZqbmtfWVmuta0+MzeBhYDd4tyeoJ3I0cueLCdHQ0SKiYazu7OKJCDg6OGXmpZzHhs6LTJiX1+HkYxHMTO8wryQlpGOj4txb22BHBp4DgxZJCWnpqLHPDdaPj+GNDNCISN7JyXWZl/kVEz/lImpu7TVRUBpDQxLDw6RFxbsbGL/w7j/s6j/29F1QkBvJiSrNC+jHRr/6uKkhIFmVVOKcm/gdG4Pp+vLAAAALHRSTlMAYT47gw0gBBAdKDEo4XbJonlUXUi6F/qV8U3r1t6di5bibJOAa9ez6HrZgdUpvzUAAAM2SURBVEjH7VVXd9NgDP2StHFGQ0sDhQ5a9pTteNtJvLL3Hk0zundL2b8fBXiOHd44h/ui70H3XOlKOh/5j79FMEjNk079Sacig6V5ePeFxd+xUcSHaywJ8tqv2Cjue93TAo9k9b3vV5Sb9gu/6yqLQ1tRXvjeyMWDlpYT3xHy9L4zzScflpIArFr9NCylE/h6tlVtOFcZETptDjijUTzMZHM0wClfHXhcdKeW0gAVtSp0zApHQ81W5UfOti5GJu1RQdPvZDWerQHQoiVUPcSZt9lK0El9gnK8jX0WbLUoBFxM4W2bBsm8E4Z8ms2Pkr3YvuxCjoTQQ8ZQd3YO7BrNdHV+Ih8GXfAW+GQt+9ZHverUOZqW2hNBuO+C5o3V88a6f8qvcAmONVVh20V3a/F6IhkLYZvN3STDsOYw4iMu8NBWuN4KPqJNI4e0Dlri4gRX+QpdSOEN+EspPc/uNpdIcGfReQbxsiT1V6a6LVbrt+JhQt4cPnDkPTY1utvC5HtWnUkUUlFCNgbfCh98npmaUWtES2WU88bRlFzdCuIJq6dQ+BiZxfPHswywsQeEepISGa6bWiDEc2fSUG5szJx4SwMui3L3Sn2Fy/WsEPImo9zpbLlVSwTo4uxCTb3LMRX7HkGeAbVvM+WCGYPBa10m1HJMZGitbK1NaxAhr85c65UUHk3a8pKFeFkBKW1O5fwxsb4yc6uDB1kacrsPia+5yyZAK8dxR6nXafb17HV5uSePpLwVpp5glSCJqccEDcpKeYepb45Pjvb5ZSpa6msAmjGVC6cU5ZnDdu5dfbn5fOEPZnSsMpHG2aFBIt33EgfeyfX43Ite5msAipFZwyp1UNaJA7aOx9th9DKLrtJiDOVCsRwYjju99Bwr8mXMtARQ0DMhXLY8yrn7/pb5ngIgtXk0M6oD6Kvu/q8D/jQBULFRLnDxFdj1gCvey/PBxwKttXns7kHxx9eYO7nA5uXZ2f73npnBy311dPvpsbvuwufjk9uTz8POAuZvHB1tY3DF2zu+/nJzdv5wmr+I/rpEaO/q9vr48iJI5oN/cHVzfLnpJ3OC2jobR1YDZG74nnoo8h//Cn4CaNOcOh5G0n4AAAAASUVORK5CYII=" 
alt=""><br><strong>'+w+"</strong></li>"),n="Big bomb<br>Damage: 
5,000,000 - Durability: 1 
use",-1!=I.indexOf("/999/22.png")?(_=parseInt(I.split("/999/22.png")[1].split("</strong>")[0].split('">')[1].trim()),n+="<br>"+I.split("/999/22.png")[2].split('class="extra"')[1].split("<span>")[1].split("</span>")[0]):_=0,o=0!=_?"enabled":"disabled",_=coma(_),a.push('<li 
class="last '+o+'" original-title="'+n+'"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABgFBMVEUAAABQPBdTOxOzmhNENBlIOiJFMxhINxtXQBQ9LBZFMRVDLxd9YBRELxVNNxZLNhg6JB9VPRiKahWigxRQPBVLNRhoURGFaRpsVBWRcxMkJx5xURUwLR1vWA3CmBRPOBVWPxZoTg43KwdeRhiBYhUWEQY/LBcxKAVdQhN2WhIcFQWTdBWaeBBKLxUmHQcrHwZFOAZYRxANCAQhFwstIwM8MgIvIg5wVBFTPRZQOg5iShRKOwtGMxJ3XhF3Vh0aDw2ohxM3JxiEZxNSQwlqUxOjgBHPpBXYrxn1ziL30DQvHxpaPQ2NbhRpQBhANAqMaBeaaRqvixI9MBW+mhPHoBLuwx0YFBgjHxT47Mn/7jL/945dNBg8IiNTPCJySxVmThrhtxFkWjH24aKoii787rf733y3jxT//8VINhqPbyuNXBcrKij/3yLruBZ6cULivkHtzmOXhEdMRDP/+1b//+CDSBqgfSnNjxngnhX90yTz5L2zpD6zroesnXiBel7EwaQnajMFAAAAH3RSTlMAjNUOLQg6EB4CT76226vvZHMzRmF7kXVgh3Tm2cRoegwy7QAAAyZJREFUSMftldVy21AURc2W4yRN0jZJUbpistgyMzPFGGbmlOnXq77Xkd2nTqfrfc3ZR3O0r+U//xquVc8fWB5olll22w3V6XJPbDmX3oIIGmFmV12Q9bVjUs29kj+S+xqfT6aZcPbV0qTacy4XPO/vX1wW8h+adDgMOSdabTHL5/q929Ho5rrw8eOHs+hr61O7uQeBEFMEYHT8+WDvptC9PEOF1OYLj7kniz0dHB0OBoPPe4clHhVFtoytmE10PkMJJXO0dr13MBgcH9z6KVRjhfL2UxNvNqwSseKn7vXh3sHDw7c2JfkpTVVPTD2ggkK3+Kl0c3h8/PVOj0hSBhXYxILZ57SFkmuFYrFUuh/dJlTZH8kaHiE+MTubGZDs5Lul0nDI7X7vsdLVtp9i0a2ay8RzyFzHGDgc8uiPhy/K7pWxYIZv1rweMw9vdfIXw6SmfB3df2mjfjSW7+A12GFyZtYAl7y86NQpkdi/39c1St7ZyTW21udNgi5jjdZOS6IiFHEX92FoZq3b4rh3tVePBnW+lAGexP2ahKJXdwqJJNI7azmuevZufeHRmC+XA4isCX4/ursrEmyiFz9K8tVmcz2xsfJm8ZGBziWvzmoUJcuo3kcxLMvxXKNZU5QyHsOQecgz1nyus4JYr1OUvnn6Ho9VeY7fYgl1YxvPIghidbjHZX0iEIImioL0fv/0tMHxuUCip/s2kDSDIUgQnpv5/RHYZ4MqQbAElW5VcTzN5wB7nvKtb5zEcGBosI+cG1OCOJ1QFBE0cIYJMBwgzk8qcZgsI+kAhsBw9Dk07ud9YUupIQaAAABMheijFXzbR5bhAI3R8JPHLse+tBjyVWia3qIVAqXjmzBMpkgEDiJWt1mxLcxFfZUQSwjB+Kbvl5cyMj6bqO3nbbqiknQQNmi3vTZ4ZtLGX4DhYLQeCUWi0Tk3NOO0TIg9jjMgFJHqkg2yTIEDCzNVPAsyIbdlGiAECwdiTCyOLVqmYt4QwxiG0avTeZAPRhAaQZ5ZpsTbhg3P6pnWg0hjos09/aPtJUmjdqfHRZJjzsQs6JjlzII6HJb//MX8BLXloXgGqNH2AAAAAElFTkSuQmCC" 
alt=""><br><strong>'+_+"</strong></li>"),k="data:image/png;base64,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",GM_addStyle("#navig{width:122px;border:0px 
1px 1px 0px solid 
#ddd;border-bottom-right-radius:3px;display:block;position:fixed;top:0px;left:0px;background:#fff;z-index:2001}#navig 
ul{height:50px;list-style:none}#navig 
li.enabled{width:40px;background-image:url("+k+");background-position:1px 
center;background-repeat:no-repeat;cursor:default;float:left;height:50px;overflow:hidden;position:relative;text-align:center}#navig 
li.disabled{width:40px;background-image:url("+k+");background-position: 
-82px 
0;background-repeat:no-repeat;cursor:default;float:left;height:50px;overflow:hidden;position:relative;text-align:center}#navig 
li:hover{background-position:-40px 0}#navig li strong,#navig li 
.maxCap{margin-left:3px;vertical-align:bottom;font-family:Arial,Helvetica,sans-serif;color: 
#578B4D;font-size:11px;text-align:right;text-shadow: 0 1px 0 
#C4E8B3}#navig li.disabled strong{color:#a6a4a4!important}#navig li 
img{width:29px;height:29px;vertical-align:middle;margin-top:3px;margin-bottom:-3px}#navig 
li.disabled 
img{opacity:0.3}"),S="",C=0,R="122px;",B=0,T=0,1==options.AllStock)for(B=0;B<a.length;B++)S+=a[B]
else 
if(2==options.AllStock){for(B=0;B<a.length;B++)0!=parseInt($(a[B]).find("strong").text())&&(C+=1)
if(12>=C){for(B=0;B<a.length;B++)0!=parseInt($(a[B]).find("strong").text())&&(S+=a[B])
R="42px"}else 
if(24>=C){for(B=0;B<a.length;B++)0!=parseInt($(a[B]).find("strong").text())&&(S+=a[B])
R="82px"}else 
for(B=0;B<a.length;B++)0!=parseInt($(a[B]).find("strong").text())&&(S+=a[B])}$("#navig").remove(),$("body").before('<div 
id="navig"><ul>'+S+"</ul></div>"),$("#navig").css({width:R}),$("#navig 
li.disabled").hover(function(){$(this).find("img").css({opacity:1})},function(){$(this).find("img").css({opacity:.3})}),$("#navig 
ul 
li").tipsy({gravity:"nw",html:!0})}options.storageCapacity&&(GM_addStyle(".storageInfo{clear:both;float:left;height:22px;margin:-1px 
0 10px 6px;width:142px}.storageInfo 
p{color:#585858;cursor:default;float:left;font-size:12px;text-shadow:0 
1px 0 #FFFFFF}.storageInfo p 
img{width:16px;height:16px;float:left;margin:0 6px 0 2px;}.storageInfo p 
strong{font-weight:bold}"),M=$(I).find(".area.storage 
strong").text().split("/")[1].split(")")[0].trim(),e=$(I).find(".area.storage 
strong").text().split("/")[0].split("(")[1].trim(),$(".storageInfo").remove(),i=parseInt(M.replace(/,/g,""))-parseInt(e.replace(/,/g,"")),$(".currency_amount").after('<div 
class="storageInfo"><p><img title="Storage" alt="StorageItems" 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAyVBMVEUAAAAyMzfS1t4uLzQwMjYoKSktLS1lZ2ubqcYtLS0rKytAR1Y/RVJKUmfFzNgsLCwyMjJBQUEyMjLd4Obc3+QoKjC/x9U6OjuFipRjZmpLUmbCydizvdCNkZyir8gsLCwqKipSW3GZqccvLzH19fVDSVheZ352gpxYYHelscjm6OuvvNNocInu7++drMm4wtfg4eXy8vJPV2tnb4TFztxRU1ZCTmdLVGo1Q12XpsQzMzNcXmRkZ21ucXgmNVKhq77CysGYnqq/yNh4k25rAAAAH3RSTlMAWw90TQlTAYYYKMzfpD/oY9+RQ49CfIiCNeiU2Z3XxuSTsAAAALBJREFUGNNtz0cWgjAARdFYERDsvZAECKH3Ztf9L8qAh+OEP3t39kHLuP5s3hEG/x6qinpRJ1O+aaVZj+cYdCCsCyowTTcCB/a6+iN4Nb3n+wQkihixvpkY4/IMJJQTwuhu4hJjbwTG0SNDMYlN7L2SxK8AoaJwDM9OXE1joOeI0swxbEvTaujpESVxBWEYup8jAHxfRKQC17WCgwzYBiuRGn4QLBddrvmz265lVm37Aq4DGPv4ctamAAAAAElFTkSuQmCC" 
/><strong>'+e+"/"+M+"</strong><br><span>Free: 
"+coma(i)+"</span></p></div>"))}})}function addLock(){var 
t,e,i,a=!1,n=$('input[id^="delete_message_"]').attr("id").split("_")[2],o=GM_getValue("eRS.locked.messages")
if("undefined"!=typeof 
o){for(e=JSON.parse(o),i=0;i<e.length;i++)e[i]==n&&(a=!0,t=i)
a===!0?($(".report").before('<a href="#" title="Unlock message so it can 
be deleted when multiple messages are sellected" 
class="fluid_blue_light_medium" id="eRS_Unlock"><span>Unlock 
Message</span></a>'),$(".msg_title_container 
#eRS_Unlock").click(function(){e.splice(t,1),GM_setValue("eRS.locked.messages",JSON.stringify(e)),window.location.href=window.location})):($(".report").before('<a 
href="#" title="Lock message so it can\'t be deleted when multiple 
messages are sellected" class="fluid_blue_light_medium" 
id="eRS_Lock"><span>Lock Message</span></a>'),$(".msg_title_container 
#eRS_Lock").click(function(){e.push(n),GM_setValue("eRS.locked.messages",JSON.stringify(e)),window.location.href=window.location}))}else 
e=[],$(".report").before('<a href="#" title="Lock message so it can\'t 
be deleted when multiple messages are sellected" 
class="fluid_blue_light_medium" id="eRS_Lock"><span>Lock 
Message</span></a>'),$(".msg_title_container 
#eRS_Lock").click(function(){e.push(n),GM_setValue("eRS.locked.messages",JSON.stringify(e)),window.location.href=window.location})
$("#eRS_Lock,#eRS_Unlock").tipsy({gravity:"s"})}function 
deleteMessages(t){var 
e,i,a=$(t).parents("form"),n=GM_getValue("eRS.locked.messages")
if("undefined"!=typeof 
n)for(e=JSON.parse(n),i=0;i<e.length;i++)$('input[id^="delete_message_"]').each(function(){$(this).val()==e[i]&&(this.checked=!1)})
"message_form"==a[0].id&&($(a[0]).hide(),$("#sending_message_indicator").show()),$.post(a.attr("action"),a.serialize(),function(){window.location.href.indexOf("/messages-paginated")>0?window.location=window.location.href:document.referrer.indexOf("/messages-paginated")>0?window.location=document.referrer:window.location.href="http://www.erepublik.com/en/main/messages-inbox"},"html")}function 
unb(){unsafeWindow.display_popup=void 
0,unsafeWindow.ajaxify_messages=function(){return!0},$j(".message_get").each(function(t,e){$j(e).unbind("click")}),$(".fluid_blue_dark_medium,.fluid_blue_light_medium,.message_get").each(function(){"#"!=$(this).attr("href")||"message_delete_trigger"==$(this).attr("name")?$(this).hasClass("message_get")&&!$(this).hasClass("subject")&&"message_delete_trigger"==!$(this).attr("name")&&window.location.href.indexOf("/messages-read/")>0?$(this).bind("click",function(){window.location=document.referrer}):"message_delete_trigger"==$(this).attr("name")?$(this).bind("click",function(){var 
t=!1;("undefined"==typeof $(".message_ajax_container 
#select_all")[0]||1==$(".message_ajax_container 
#select_all")[0].checked)&&(t=!0),$('input[id^="delete_message_"]').each(function(){1==this.checked&&(t=!0)}),1==t&&deleteMessages(this)}):$(this).bind("click",function(){window.location="http://www.erepublik.com"+$(this).attr("href")}):$j("body").ajaxComplete(function(t,e,i){-1!=i.url.indexOf("messages-delete")?window.location.href=document.referrer:-1!=i.url.indexOf("messages-compose")&&unb()})})}function 
donateEverywhere(t){function e(){$(".member_listing thead tr 
th").attr("style","padding:0px 0px 8px 
10px!important"),$(".member_listing tbody tr").each(function(){var 
t=$(this).find(".avatar .current_location a").attr("href").split("/")[4]
t!=eRS.citizenId&&($(this).find(".avatar").attr("style","padding:2px 0px 
3px 0px; width:208px!important;"),$(this).find(".avatar 
.current_location").after('<br><div class="citizen_actions_com" 
style="width: 208px; padding-left: 50px; text-align: left; margin-top: 
5px!important;"><table><tr><td style="height: 25px!important;"><a 
class="action_message_com" style="display:inline!important;" 
href="http://www.erepublik.com/en/main/messages-compose/'+t+'" 
original-title="Send message">Send message</a></td><td style="height: 
25px!important;"><a class="action_donate_comI" 
style="display:inline!important;" href="/en/economy/donate-items/'+t+'" 
original-title="Donate Items">Donate</a></td><td style="height: 
25px!important;"><a class="action_donate_comM" 
style="display:inline!important;" href="/en/economy/donate-money/'+t+'" 
original-title="Donate 
Money">Donate</a></td></tr></table></div>'))}),$(".citizen_actions_com 
a").tipsy({gravity:"s"})}function i(){var t,a,n
0==$("#regiments_lists_msdd").length?(clearTimeout(t),t=setTimeout(i,500)):(e(),a=$("#regiments_lists 
:selected").val(),n=$("#regiments_lists_child 
._msddli_").length>0?"._msddli_":"a",$("#regiments_lists_child 
"+n).click(function(){a!=$("#regiments_lists").val()&&(window.location.href="http://www.erepublik.com"+$("#regiments_lists 
option[value='"+$("#regiments_lists").val()+"']").attr("url"))}))}var 
a,n,o,r="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABLCAMAAAABOfS3AAABVlBMVEUAAAD////C6fj////C6fhXrduo4fhXrduo4fj////x+/5Xrduo4fh/f3/NzczC6fjNkzERERHs7OwxMTHaojn+///lv3scHBz95avzyGPooS7ftWnvvEHsuUkmJibCys3W2Nl4fX5zdHXqqDf53pv6+/zVmS3moTvYpErvwnPR0dHN1NnJ5/Xo9/1UVVZcXWHd5e3QmDfd3d329fP2x1bHtpnHoV3dq1f/8szjrTzRmEL66Ve4bxvlmir21IHwtDHm7fX/6Ev/7kTi9fyJiYlmZ2oDAwO0ucB6v+O86PrwypHHxsLz27NCQ0Pv8/3NsHrksUjKwrDwwVPjvHLVoETBqIDsvl3MkSrBr43Pkyfw1ZzBfSrz2KL/3DHszFL4xjTTqGLSn13tqC3zrDr65YH41kTutj346mz3vyH955brrlz91VWJuMvk5ORHjbOjpabfu5C3098lo0PyAAAACnRSTlMA8fH/gPHxgICAMeqNSQAAAvtJREFUSMeVlOlT2kAchrcGDwJJAYGAgIEoHgU8wNZbUSpetbe97/u2/f+/dH8R8+ruhpl9nckwz85DPuA+jLFoxhCWibI+/BoAdi3gmRt8l3nUMFIWX4seZ8FJlHN/o+Ojo90yOOPvtU4sa+7EsSwvibdnLgTbMMbL4MzggsU/eE3+KhIwSaD1BJqeUOV/WsLt43lNoetoCl6YsGdZSVFIOk7S6zr8OTsxPXHnirBv8RngjB70Y/KHffy3+HV9fcIQVm0dgTPwo1Kp9OXHzusxIIELwtjn3Z3dzdkPm0ACF4Tp/Pef36Y/vcUbBA7Bq9Fz7eX75e2PW9sQBA5hL5NdzmYLj2fWpt69eb6RIabigTB/N5ebnMytvCgsbszMPC0QU3EI7aV8Pp9Iz+YKieyrlUfEVDwQ5ham0vcfLpXSU4uTW0/S94iFcValg/0HN28l0qvFYnF18dT+TT9WGGcd/rSbrVTT5meJxDM7ZdA6YZxFTKO3VtO2CdPMSBhnbKBTlf55OgOhnC9yXVqkH2cjcWkj/fhQXLEh8F984PQ9h00xZI3D+AjnDYQMnMXjDTlkDfq2hnSniXNBFTISVBGAQNMRKGQaAkKmIXQdTcFTCwgZBClkEKSQ+YIqZCRIIYMgBguCzCEgWBAUHAKCBUHmJIjBgiBwCHKwSFBzEuRgkaDgEKRgkaDmJMjBIkHBIUjBIkHN6cYJwcKNU3FGd1cMFu60zMOqEc71u8SGY9KG+/HBmGKD4H/4wOl7Dv5V+Nr0ODP91Q9iw5zX6bMfsho4i8XqFYTM7J3Qt9VNmn+na+BcMCsImdkbCaYsmBBoOgKFTENAyDSErqMpeGEChUwUhJBdEfYrfCY4owOXjz+OeyGDcL5W6gic4SAIFgSBC0IQLAgCF4QgWIEgcAhejQ4uggVB4BCEYAWCwCGIwaIDFYcgBIsOVDwQxGDRgYpDuBSsxKnbpIMwzuhmueX2Qs09D5a7gBun4sy/u/7aZdcljDut4uHVUHP9Lv0H4tUmr9+Gf0wAAAAASUVORK5CYII=",s="data:image/png;base64,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"
GM_addStyle(".citizen_actions_com 
a{background-image:url("+s+");display:inline;float:left;height:25px;margin-right:4px;text-indent:-9999px;width:24px}.citizen_actions_com 
.action_message_com{background-position:-24px 0}.citizen_actions_com 
.action_donate_comM,.citizen_actions 
.action_donate_comM{background-image:url("+r+")!important;background-position:0 
0}.citizen_actions_com .action_donate_comI,.citizen_actions 
.action_donate_comI{background-image:url("+r+")!important;background-position:-24px 
0}.citizen_actions_com .action_donate_comM:hover,.citizen_actions 
.action_donate_comM:hover{background-position:0 
-25px}.citizen_actions_com .action_donate_comI:hover,.citizen_actions 
.action_donate_comI:hover{background-position:-24px 
-25px}.citizen_actions_com .action_donate_comM:active,.citizen_actions 
.action_donate_comM:active{background-position:0 
-50px}.citizen_actions_com .action_donate_comI:active,.citizen_actions 
.action_donate_comI:active{background-position:-24px 
-50px}.citizen_actions_com 
.action_message_com:hover{background-position:-24px 
-25px}.citizen_actions_com 
.action_message_com:active{background-position:-24px 
-50px}"),1==t?($("#comments_div 
.comment-holder").each(function(){$(this).find(".citizen_actions_com").remove()
var t=$(this).find(".nameholder").attr("href").split("/")[4].trim()
t!=eRS.citizenId&&($(this).hasClass("indent-level-0")?(a="article_comment_posted_at",n="margin-top: 
20px;"):(a="nameholder",n="float: 
right;"),$(this).find("."+a).first().after('<div 
class="citizen_actions_com" style="width: 150px; '+n+'"><a 
class="action_message_com" 
href="http://www.erepublik.com/en/main/messages-compose/'+t+'" 
original-title="Send message">Send message</a><a 
class="action_donate_comI" href="/en/economy/donate-items/'+t+'" 
original-title="Donate Items">Donate</a><a class="action_donate_comM" 
href="/en/economy/donate-money/'+t+'" original-title="Donate 
Money">Donate</a></div>'))}),$(".citizen_actions_com 
a").tipsy({gravity:"s"})):2==t?(o=window.location.href.split("/")[6].trim(),"0"!=o&&($(".msg_title_container").append('<div 
class="citizen_actions_com" style="padding-top: 0px!important; float: 
right;"><a class="action_donate_comI" 
href="/en/economy/donate-items/'+o+'" original-title="Donate 
Items">Donate</a><a class="action_donate_comM" 
href="/en/economy/donate-money/'+o+'" original-title="Donate 
Money">Donate</a></div>'),$(".citizen_actions_com 
a").tipsy({gravity:"s"}))):3==t?(unb(),$(".fluid_blue_dark_medium,.fluid_blue_light_medium,.message_get").each(function(){"#"==$(this).attr("href")&&$(this).bind("click",function(){setTimeout(function(){donateEverywhere(3)},1e3)})}),$(".citizen_actions_com").remove(),$(".message_item_container").each(function(){var 
t=$(this).find(".message_container .coloured .nameholder 
a:first").attr("href").split("/")[4]
t!=eRS.citizenId&&$(this).find(".avatarholder").append('<div 
class="citizen_actions_com" style="width: 60px!important; margin-left: 
-8px; margin-top: 0px!important; padding-top: 2px!important;"><a 
class="action_donate_comI" href="/en/economy/donate-items/'+t+'" 
original-title="Donate Items">Donate</a><a class="action_donate_comM" 
href="/en/economy/donate-money/'+t+'" original-title="Donate 
Money">Donate</a></div>'),$(".citizen_actions_com 
a").tipsy({gravity:"s"})})):5==t&&(unsafeWindow.changeRegiment=void 
0,i())}function ShowRememberDonate(t){var e,i,a,n,o
if(1==t)$(".special.padded").append('<div style="float: right; 
padding-top: 3px;">"Remember donation quantity" 
enabled</div>'),e=GM_getValue(eRS.citizenId+".eRS_donateItem"),i="undefined"!=typeof 
e?JSON.parse(e):{1:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},2:{1:0,2:0,3:0,4:0,5:0,6:0,7:0}},$(".offers.largepadded 
tr:not(:first-child)").each(function(){var 
t=$(this).find("img").attr("src").split("/")[6].trim(),e=$(this).find("img").attr("src").split("/")[7].split(".png")[0].split("q")[1].trim()
$(this).find(".input").val(i[t][e])})
else if(2==t)$(".special.padded").append('<div style="float: right; 
padding-top: 3px;">"Remember donation quantity" 
enabled</div>'),e=GM_getValue(eRS.citizenId+".eRS_donateMoney"),i="undefined"!=typeof 
e?JSON.parse(e):{1:0,2:0},$(".offers.largepadded.donate_form 
tr:not(:first-child)").each(function(){var 
t=$(this).find("img").attr("alt")
$(this).find(".input").val("GOLD"==t?i[2]:i[1])})
else 
if(3==t){if(a=[],n="",e=GM_getValue("eRS_donation_logger"),"undefined"==typeof 
e)n="<strong>No donation history.</strong>"
else for(a=JSON.parse(e),o=0;o<a.length;o++)1==a[o].type&&(n+="<strong 
style='display:inline!important;'>["+a[o].day+"/"+a[o].month+"/"+a[o].year+" 
at "+a[o].hour+":"+a[o].min+":"+a[o].sec+"]</strong> You donated 
"+a[o].amount+" Q"+a[o].quality+" "+a[o].txt+" to <a 
href='http://www.erepublik.com/"+LANG+"/citizen/profile/"+a[o].id+"'>"+a[o].name+"</a><br>"),2==a[o].type&&(n+="<strong 
style='display:inline!important;'>["+a[o].day+"/"+a[o].month+"/"+a[o].year+" 
at "+a[o].hour+":"+a[o].min+":"+a[o].sec+"]</strong> You donated 
"+a[o].amount+" "+a[o].txt+" to <a 
href='http://www.erepublik.com/"+LANG+"/citizen/profile/"+a[o].id+"'>"+a[o].name+"</a><br>")
$(".citizen_mass_destruction").after('<div 
style="clear:both;"></div><h3>Donation history</h3><div 
class="citizen_mass_destruction"><em>'+n+"</em></div>")}}function 
RememberDonate(t,e){var 
i,a,n,o,r,s,l,d,c,p,g=[],m=GM_getValue("eRS_donation_logger")
"undefined"!=typeof 
m&&(g=JSON.parse(m)),i=e.parent().parent(),a=$(".citizen_profile_header 
h2:not(span)").text().trim(),n=window.location.href.split("/")[6],o=new 
Date,1==t?(m=GM_getValue(eRS.citizenId+".eRS_donateItem"),r="undefined"!=typeof 
m?JSON.parse(m):{1:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},2:{1:0,2:0,3:0,4:0,5:0,6:0,7:0}},$(".offers.largepadded 
tr:not(:first-child)").each(function(){var 
t=$(this).find("img").attr("src").split("/")[6].trim(),e=$(this).find("img").attr("src").split("/")[7].split(".png")[0].split("q")[1].trim()
r[t][e]=$(this).find(".input").val()}),s=i.find("input#[id^=donate_item_]").val(),l=i.find("td:last 
input:first").attr("quality"),d=i.find("td:last 
input:first").attr("industry"),c=1==d?"food":"weapons",parseFloat(s)>0&&(30==g.length&&g.shift(),g.push({type:1,day:o.getDate()<10?"0"+o.getDate():o.getDate(),month:parseInt(o.getMonth())+1<10?"0"+(parseInt(o.getMonth())+1):parseInt(o.getMonth())+1,year:o.getFullYear(),hour:o.getHours()<10?"0"+o.getHours():o.getHours(),min:o.getMinutes()<10?"0"+o.getMinutes():o.getMinutes(),sec:o.getSeconds()<10?"0"+o.getSeconds():o.getSeconds(),amount:s,txt:c,quality:l,name:a,id:n}),GM_setValue("eRS_donation_logger",JSON.stringify(g))),GM_setValue(eRS.citizenId+".eRS_donateItem",JSON.stringify(r))):2==t&&(m=GM_getValue(eRS.citizenId+".eRS_donateMoney"),r="undefined"!=typeof 
m?JSON.parse(m):{1:0,2:0},$(".offers.largepadded.donate_form 
tr:not(:first-child)").each(function(){var 
t=$(this).find("img").attr("alt")
"GOLD"==t?r[2]=$(this).find(".input").val():r[1]=$(this).find(".input").val()}),s=i.find("input#[id^=donate_money_]").val(),p=i.find("td:first").text().trim(),parseFloat(s)>0&&(30==g.length&&g.shift(),g.push({type:2,day:o.getDate()<10?"0"+o.getDate():o.getDate(),month:parseInt(o.getMonth())+1<10?"0"+(parseInt(o.getMonth())+1):parseInt(o.getMonth())+1,year:o.getFullYear(),hour:o.getHours()<10?"0"+o.getHours():o.getHours(),min:o.getMinutes()<10?"0"+o.getMinutes():o.getMinutes(),sec:o.getSeconds()<10?"0"+o.getSeconds():o.getSeconds(),amount:s,txt:p,name:a,id:n}),GM_setValue("eRS_donation_logger",JSON.stringify(g))),GM_setValue(eRS.citizenId+".eRS_donateMoney",JSON.stringify(r)))}function 
NewsCategories(){$(".mini_news_categories 
span").eq(0).remove(),$(".mini_news_categories ul 
li").eq(0).before('<li><a href="javascript:;" id="eRSNews" 
rel="international" class="switchers" 
original-title="International"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAulBMVEUAAAD3+/yTy+DX7PO13ey73+yn1+fy+fve8Pb3+/2k1+ys4/gqk7Kn2Oyf1eqPyt6k3fV7yeaT0ekdiqlgrsWj1Omc0ONuw+Oa2PBttcoymbe53uyg2e6S1e8jjqx1v9mLzuh3yeiZ0+qFz+12uMw6oceExNlnssh8xeBYrsxqvNk4nLxTqcRZrMVIo8B0u9Gx2umj0+VWs9WKxdhfss5IrNF7vtJCp8uByOKJyOFFpsZlt9ODyuVgvd/N+Sw+AAAACnRSTlMAH8lGzNDLDUYZxuiSFgAAANpJREFUGNMtz0digzAURVElAQxCIFSopvcO7jX731YU22f2/+hdIGjqduc4u62qgZeNbNuGYNvy5nV/728QQsOA0JbER1Oq6tIcHAhN03TkL/DTBdUJHfPQxBgfsAqc4DKc9r8kxHVZlucVLDFCd9d1r2ff9xsfg5Gxu5tlWfeoF875AnjQkaIoCIpHPjWTD26P3iVRRBhDM0+TGqzkOaA+8tpjHCReugI1TWcWt5ZOUXD1qAo0ifZssnQ9HOYnlTQxXUnGUBeSNlLeMVLuWYKX/6d88k1KzXf+H3rGF2DeE35iAAAAAElFTkSuQmCC" 
alt="International" title="International"></a></li><li><a 
href="javascript:;" id="eRSNews" rel="latest" class="switchers" 
original-title="Latest"><img 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA9lBMVEX/AACUlpv///+qr7e9xMmZmqDbXTQAAACqrLCUlZmssbegoqXq7/D//oqbnaL0ExKmp6unqaz/94e9hm/x8/Ows7alo6+LjJDg5+j4eDT6ez3M0NP51lX5czrm7OvN1db7ayr31XnxGgD4USKveFf8OBbKcFT/fUejpam/xczDxtX4+/vkMTLHx9yfm7H74Gj/Egr/j1X55XqvpKL/IBPjj2rlVDf8cDS4emb/ey6lY0buKgjeKg7Pe1fW1dj15N6glZS/VRyRiIfMqW/p2tT/nWPc0c7AfV//dkq9kWqnelWdf2yUdmS0nWnLQyvR0c7NTU7eQkNHZ8bZAAAAx0lEQVQY013M124CMRCF4bGJE++a3WyHhBZqSOi9997h/V+GMQgh8V/MxafRgWzm/VZGCFf1+VQQ9jqdSCQXNh2KmAR9lQaAXqdrUBYNSVj2EZKTqU4VJxpTgY2aCJXZ3KEhzrkL40YE4bs6qHFumpRBO/6DEAnHbc4NI8cgZUn4ClspkfU86sJWa0koaRs/hh977VduWNqO44jDQDlIKNc/sYvp14GcjvAobwSLQILnJ3gS3rC///stFBgEiILdLyEsAB8vXQHcPhQNEMH+lwAAAABJRU5ErkJggg==" 
alt="Latest" title="Latest"></a></li>'),$(".mini_news_categories ul li 
#eRSNews").click(function(){var t,e,i,a,n,o,r,s,l,d="",c="",p=""
$(".media_widget 
li").find(".active").removeClass("active"),$(".media_widget").addClass("preload"),$(this).addClass("active"),l=$(this).attr("rel"),c="latest"==l?"latest/all/"+eRS.country+"/1":l,GM_xmlhttpRequest({method:"GET",url:"http://www.erepublik.com/"+LANG+"/main/news/"+c,dataType:"html",onload:function(g){var 
m=g.responseText.replace(/src=/g,"tmpsrc=").replace(/\.css/g,"").replace(/\.js/g,"").replace(/url\(/g,""),u=$(m).find("#content").html()
$(u).filter('[class="holder 
bordersep"]:lt(5)').each(function(){t=$(this).find(".rankholder 
.value").text().trim(),e=$(this).find(".holder 
.dotted").attr("href"),i=$(this).find(".holder 
.dotted").text(),a=$(this).find(".article_details 
small").eq(0).text().trim(),n=$(this).find(".article_details 
small").eq(1).find("a").text().trim(),o=$(this).find(".article_details 
small").eq(1).find("a").attr("href"),r=$(this).find(".article_details 
small").eq(2).text().trim(),s=$(this).find(".article_details 
small").eq(2).find("img").attr("tmpsrc"),news=$(this).find(".newspaperinf 
.nameholder .dotted").text().trim(),d+="<li>",d+='<div 
class="no_votes"><strong>'+t+"</strong><small>votes</small></div>",d+='<div 
class="article_entry"><div>',d+='<span><img class="countryImg" 
style="vertical-align: middle; float: left;" src="'+s+'" 
original-title="'+r+'"><span>&bull;</span><em>'+n+'</em></span><a 
href="'+e+'">'+i+"</a>",d+='<span><em 
class="author">'+news+'</em><span>&bull;</span><em 
class="time_posted">'+a+"</em></span>",d+="</div></div>",d+="</li>"}),$("#citizenship_news").html(""),$("#citizenship_news").html(d),$("#citizenship_news 
li span 
.countryImg").tipsy({gravity:"s"}),$("#residence_news").length>0?"latest"==l?(d="",p="latest/all/"+$("#perma_second").attr("value")+"/1",GM_xmlhttpRequest({method:"GET",url:"http://www.erepublik.com/"+LANG+"/main/news/"+p,dataType:"html",onload:function(g){var 
m=g.responseText.replace(/src=/g,"tmpsrc=").replace(/\.css/g,"").replace(/\.js/g,"").replace(/url\(/g,""),u=$(m).find("#content").html()
$(u).filter('[class="holder 
bordersep"]:lt(5)').each(function(){t=$(this).find(".rankholder 
.value").text().trim(),e=$(this).find(".holder 
.dotted").attr("href"),i=$(this).find(".holder 
.dotted").text(),a=$(this).find(".article_details 
small").eq(0).text().trim(),n=$(this).find(".article_details 
small").eq(1).find("a").text().trim(),o=$(this).find(".article_details 
small").eq(1).find("a").attr("href"),r=$(this).find(".article_details 
small").eq(2).text().trim(),s=$(this).find(".article_details 
small").eq(2).find("img").attr("tmpsrc"),news=$(this).find(".newspaperinf 
.nameholder .dotted").text().trim(),d+="<li>",d+='<div 
class="no_votes"><strong>'+t+"</strong><small>votes</small></div>",d+='<div 
class="article_entry"><div>',d+='<span><img class="countryImg" 
style="vertical-align: middle; float: left;" src="'+s+'" 
original-title="'+r+'"><span>&bull;</span><em>'+n+'</em></span><a 
href="'+e+'">'+i+"</a>",d+='<span><em 
class="author">'+news+'</em><span>&bull;</span><em 
class="time_posted">'+a+"</em></span>",d+="</div></div>",d+="</li>"}),$("#residence_news").html(""),$("#residence_news").html(d),$(".media_widget").removeClass("preload"),$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+p),$("#go1").bind("click",function(){$(".media_widget 
li").find(".active").attr("rel")==l&&$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+c)}),$("#go2").bind("click",function(){$(".media_widget 
li").find(".active").attr("rel")==l&&$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+p)}),$("#residence_news 
li span 
.countryImg").tipsy({gravity:"s"})}})):($("#residence_news").html(""),$("#residence_news").html(d),$(".media_widget").removeClass("preload"),$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+l),$("#go1").bind("click",function(){$(".media_widget 
li").find(".active").attr("rel")==l&&$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+c)}),$("#go2").bind("click",function(){$(".media_widget 
li").find(".active").attr("rel")==l&&$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+c)}),$("#residence_news 
li span 
.countryImg").tipsy({gravity:"s"})):($(".media_widget").removeClass("preload"),$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+l),$("#go1").bind("click",function(){$(".media_widget 
li").find(".active").attr("rel")==l&&$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+c)}),$("#go2").bind("click",function(){$(".media_widget 
li").find(".active").attr("rel")==l&&$(".more_news").attr("href","http://www.erepublik.com/en/main/news/"+c)}))}})})}function 
SpareChange(){setTimeout(function(){GM_xmlhttpRequest({method:"GET",url:"http://www.erepublik.com/"+LANG+"/economy/exchange-market",dataType:"html",onload:function(t){var 
e=t.responseText.replace(/src=/g,"tmpsrc=").replace(/\.css/g,"").replace(/\.js/g,"").replace(/url\(/g,""),i=parseFloat($(e).find("#golden").val()),a=parseFloat($(e).find("#eCash").val())
$("#side_bar_gold_account_value").text(i.toFixed(2)),$("#side_bar_currency_account_value").text(a.toFixed(2))}})},400)}function 
BetterIgm(){var t,e=GM_getValue("eRS"+eRS.citizenId+"_Igm")
t="undefined"==typeof 
e?{sub:"",mess:""}:JSON.parse(e),$("#message_form").append('<a 
href="javascript:;" id="igmClear" original-title="Forget last remembered 
message" class="fluid_blue_dark_medium" style="margin-right: 10px; 
float: right;"><span class="bold">Clear</span></a><a href="javascript:;" 
id="igmSave"  original-title="Remember this message" 
class="fluid_blue_dark_medium" style="margin-right: 10px; float: 
right;"><span class="bold">Save</span></a><a href="javascript:;" 
id="igmFill" original-title="Fill with last remembered message" 
class="fluid_blue_dark_medium" style="margin-right: 10px; float: 
right;"><span 
class="bold">Fill</span></a>'),$("#igmClear").tipsy({gravity:"s"}),$("#igmFill").tipsy({gravity:"s"}),$("#igmSave").tipsy({gravity:"s"}),$("#igmFill").click(function(){$("#citizen_subject").val(t.sub),$("#citizen_message").val(t.mess)}),$("#igmSave").click(function(){t.sub=$("#citizen_subject").val(),t.mess=$("#citizen_message").val(),GM_setValue("eRS"+eRS.citizenId+"_Igm",JSON.stringify(t))}),$("#igmClear").click(function(){t.sub="",t.mess="",GM_setValue("eRS"+eRS.citizenId+"_Igm",JSON.stringify(t))})}function 
AutoBot(){function t(){var 
t=($j("#heal_btn"),$j("#DailyConsumtionTrigger")),e=$j("#eatload").css("display")
return!$j("input#multihit_food").is(":checked")||t.hasClass("disabled")||t.hasClass("buy")||t.hasClass("energy")||"none"!=e?$j("input#multihit_energy").is(":checked")&&!t.hasClass("disabled")&&t.hasClass("energy")&&"none"==e?!0:!1:!0}function 
e(){"undefined"==typeof 
unsafeWindow.jQuery?window.setTimeout(e,100):i()}function i(){function 
e(){function 
e(){$j("#DailyConsumtionTrigger").addClass("load"),$j.getJSON(c,{},function(t){unsafeWindow.energy.processResponse(t),$j("#DailyConsumtionTrigger").removeClass("load"),i()})}function 
i(){a<unsafeWindow.globalNS.userInfo.wellness?unsafeWindow.globalNS.userInfo.wellness>=10?(clearTimeout(l),l=setTimeout("jQuery.fn.multiHIT()",250)):t()?e():20==n?$("#multihit_start").click():setTimeout(i,1e3):setTimeout(i,1e3)}var 
a=parseInt($("#current_health").text().split("/")[0].trim()),n=0
e()}function i(){var t="/en/military/change-weapon"
unsafeWindow.ERPK.disableAllButtons(),$j.post(t,{_token:unsafeWindow.SERVER_DATA.csrfToken,battleId:unsafeWindow.SERVER_DATA.battleId},function(t){if(-1!==$j(".fighter_weapon_image:last").attr("src").indexOf("q0"),unsafeWindow.currentWeaponId!==t.weaponId||unsafeWindow.hasBazookaAmmo!=t.hasBazookaAmmo){{$j(".listing 
span").eq(0).clone()}$j("#scroller span:last 
img").attr("src",t.weaponImage)}return 
unsafeWindow.ERPK.enableAllButtons(),-1!==$j(".listing span 
img").eq(-1).attr("src").indexOf("q10")?(a=!1,void 
$j("button#multihit_start").html("Start")):(clearTimeout(l),void(l=setTimeout("jQuery.fn.multiHIT()",250)))},"json")}"undefined"==typeof 
unsafeWindow&&(unsafeWindow=window)
var d='<style type="text/css"> #multihit_start {margin-top: 0px; 
margin-left: 0px; margin-bottom: 0px; position: relative;}</style>'
$j("head").append(d),$j("div#enemy_defeated").before('<div id="MHP" 
style="z-index:99;position:relative;margin:-190px 0 0 
33px;float:left;clear:both;padding:5px;background-color:#262620;border-radius:4px;opacity:0.8;font-weight:bold;border:1px 
solid 
#000;color:#FFF;text-align:left;font-size:10px"><big>Kills:&nbsp;</big><input 
id="multihit_count" style="text-align:right" type="text" size="3" 
maxlength="4" value="25" />&nbsp;<button 
id="multihit_start">Start</button><br />&nbsp;<input type="checkbox" 
id="multihit_food" name="multihit_food" checked="checked"><label 
for="multihit_food">&nbsp;Eat food</label><br/>&nbsp;<input 
type="checkbox" id="multihit_bazooka" name="multihit_bazooka" 
checked="checked"><label for="multihit_bazooka">&nbsp;Dont use 
Bazooka</label><br/>&nbsp;<input type="checkbox" id="multihit_energy" 
name="multihit_energy"><label for="multihit_energy">&nbsp;Use 
EnergyBars</label><br/></div>'),0!=unsafeWindow.SERVER_DATA.battleFinished&&$j("div#MHP").hide(),$j("div#MHP").hide(),GM_addStyle("#autoBot 
a{font-weight:bold;color:#ffffff;padding:5px 3px 5px 
3px;top:315px;left:220px;position:absolute;text-align:center;width:50px;background-color:transparent;border:1px 
solid #999999;border-radius: 0 5px 5px 0;box-shadow: 0px 0px 2px 
#ff7373;background-image:linear-gradient(to right, #bf3030, 
#a60000);background-clip:padding-box}#autoBot 
a:active{top:316px}"),$j("#pvp_battle_area 
.player.left_side").before('<div id="autoBot"><a 
href="javascript:void(0)" 
id="toggleAutoBot">AutoBot</a></div>'),$j("#toggleAutoBot").click(function(){$j(this).text("ON"==$j(this).text()?"AutoBot":"ON"),$j("div#MHP").is(":visible")?$j("div#MHP").hide():$j("div#MHP").show()}),unsafeWindow.battleFX.hit=function(){return 
a&&(o++,s=!1,clearTimeout(l),l=setTimeout("jQuery.fn.multiHIT()",1001)),!1},unsafeWindow.battleFX.blow=function(){return 
a&&(r++,s=!0),!1},unsafeWindow.battleFX.countNextBattle=function(t){function 
e(t){0==$j.countdown.periodsToSeconds(t)&&($j("#waiting").fadeOut("fast"),$j("#waiting").removeClass("clock"),$j("#notify_link").fadeIn("fast"),$j("#notify_link").click(),setTimeout(function(){top.location.href=document.location.href},2e3))}return 
isNaN(t.getMonth())?(setTimeout(function(){top.location.href=document.location.href},1e3),!1):($j("#time_until").countdown({until:t,format:"MS",compact:!0,description:"",onTick:e}),!1)},unsafeWindow.jQuery.fn.getWell=function(){var 
t=($j("#heal_btn"),$j("#DailyConsumtionTrigger"));($j("input#multihit_food").is(":checked")&&!t.hasClass("disabled")&&!t.hasClass("buy")&&!t.hasClass("energy")||$j("input#multihit_energy").is(":checked")&&!t.hasClass("disabled")&&t.hasClass("energy"))&&($j("#heal_btn 
small").hide(),e())},unsafeWindow.jQuery.fn.multiHIT=function(){if(unsafeWindow.globalStop||n==o)return 
unsafeWindow.ERPK.enableAllButtons(),a=!1,void 
$j("button#multihit_start").html("Start")
if(unsafeWindow.ERPK.canFire())$j("input#multihit_bazooka").is(":checked")&&-1!==$j(".listing 
span img").eq(-1).attr("src").indexOf("q10")?i():unsafeWindow.shoot()
else{if(!t())return unsafeWindow.ERPK.enableAllButtons(),a=!1,void 
$j("button#multihit_start").html("Start")
unsafeWindow.jQuery.fn.getWell()}},$j("button#multihit_start").click(function(){a?(clearTimeout(l),unsafeWindow.ERPK.enableAllButtons(),a=!1,$j("button#multihit_start").html("Start")):(n=$j("input#multihit_count").val(),n>0&&(o=0,r=0,s=!1,a=!0,$j("button#multihit_start").html("Stop"),unsafeWindow.jQuery.fn.multiHIT()))})}{var 
a=!1,n=0,o=0,r=0,s=!1,l=0,d=$j("div.user_health 
input[type=hidden]").attr("id"),c="http://www.erepublik.com/"+LANG+"/main/eat?format=json&_token="+$j("#"+d).val()+"&jsoncallback=?"
location.href.match(/citizen\/profile\/(\d+)$/)?0:unsafeWindow.SERVER_DATA.health}e()}function 
QuickMarket(){var t,e,i,a,n,o
for(GM_addStyle(".eRS_quickMarket{display:none!important;border-top:1px 
solid 
#ccc;position:absolute!important;top:0px!important}.eRS_quickMarket li 
img{width:18px;height:20px;vertical-align:middle;margin-bottom:2px}"),t="",e="",i="",a=1;3>=a;a++)for(n=1;7>=n;n++)1==a&&7>=n&&(t+='<li><a 
href="http://www.erepublik.com/'+LANG+"/economy/market/"+img_country[eRS.country].id+"/1/"+n+'/citizen/0/price_asc/1"><img 
src="'+itemicons[a][n]+'"> Food Q'+n+"</li>",7==n&&(t+='<li><a 
href="http://www.erepublik.com/'+LANG+"/economy/market/"+img_country[eRS.country].id+'/7/1/citizen/0/price_asc/1"><img 
src="'+frmicon+'"> Food Raw</li>')),2==a&&7>=n&&(e+='<li><a 
href="http://www.erepublik.com/'+LANG+"/economy/market/"+img_country[eRS.country].id+"/2/"+n+'/citizen/0/price_asc/1"><img 
src="'+itemicons[a][n]+'"> Weapon Q'+n+"</li>",7==n&&(e+='<li><a 
href="http://www.erepublik.com/'+LANG+"/economy/market/"+img_country[eRS.country].id+'/12/1/citizen/0/price_asc/1"><img 
src="'+wrmicon+'"> Weapon Raw</li>')),3==a&&5>=n&&(i+='<li><a 
href="http://www.erepublik.com/'+LANG+"/economy/market/"+img_country[eRS.country].id+"/3/"+n+'/citizen/0/price_asc/1"><img 
src="'+itemicons[a][n]+'"> Ticket Q'+n+"</li>")
o='<ul class="eRS_quickMarket">'+t+'</ul><ul 
class="eRS_quickMarket">'+e+'</ul><ul 
class="eRS_quickMarket">'+i+"</ul>",$("#menu4 ul 
li:first").append(o),$("#menu4 ul 
li:first").hover(function(){$(".eRS_quickMarket:eq(0)").attr("style","display: 
block!important"),$(".eRS_quickMarket:eq(1)").attr("style","display: 
block!important; left: 
269px!important;"),$(".eRS_quickMarket:eq(2)").attr("style","display: 
block!important; left: 
407px!important;")},function(){$(".eRS_quickMarket").attr("style","display: 
none!important")})}function 
NewFuncs(){unsafeWindow.get_citizen_feeds=function(){var t,e
try{$j("#show_friends_feed").addClass("active"),$j("#show_regiment_feed").removeClass("active"),$j("#show_facebook_feed").removeClass("active"),$j("#show_party_feed").removeClass("active"),$j(".fb-like-box").css("display","none"),$j(".shouter").css("display","block"),$j(".wall_post_list 
ul").css("display","block"),$j("#citizen_older_feeds").css("display","block"),t="/"+(LANG?LANG:"en")+"/main/wall-post/older/",e={_token:$j("#_token").val(),page:0},$j.post(t,e,function(t){options.reShout||options.filterGuerrilla||options.filterMedals?($("body").append('<ul 
id="boggy" style="display: 
none;"></ul>'),$("#boggy").append(t),t=FilterPost("#boggy"),$("#boggy").remove(),$j(".wall_post_list 
> ul").html(t),FilterPostBind()):$j(".wall_post_list > 
ul").html(t),$j("#isGroupFeed").val(0),parseInt($j("#postCount").val())>unsafeWindow.POSTS_LIMIT+1?$j("#citizen_older_feeds").show():$j("#citizen_feed_friends").show(),$j("#group_older_feeds").hide(),$j("#shout").val(unsafeWindow.wall_texts.say_something_to_your_friends+" 
...")})}catch(i){}},unsafeWindow.get_group_feeds=function(){var t,e
try{$j("#show_regiment_feed").addClass("active"),$j("#show_friends_feed").removeClass("active"),$j("#show_facebook_feed").removeClass("active"),$j("#show_party_feed").removeClass("active"),$j(".fb-like-box").css("display","none"),$j(".shouter").css("display","block"),$j(".wall_post_list 
ul").css("display","block"),t="/"+(LANG?LANG:"en")+"/main/group-wall/older/retrieve",e={_token:$j("#_token").val(),page:0,groupId:$j("#groupId").val(),part:1},$j.post(t,e,function(t){var 
e
unsafeWindow.feedTabs===!0?options.reShout?($("body").append('<ul 
id="boggy" style="display: 
none;"></ul>'),$("#boggy").append($(t).find(".wall_post_list 
ul").html()),e=FilterPost("#boggy"),$("#boggy").remove(),$j("#isGroupFeed").val(1),$(".wall_post_list 
ul").html(e),FilterPostBind()):($j("#isGroupFeed").val(1),$j(".wall_post_list 
ul").html($j(t).find(".wall_post_list ul").html()),$j("#shout").val("Say 
something...")):options.reShout?($("body").append('<ul id="boggy" 
style="display: 
none;"></ul>'),$("#boggy").append($(t).find(".wall_post_list 
ul").html()),e=FilterPost("#boggy"),$("#boggy").remove(),$j("#isGroupFeed").val(1),$j("#wall_master").html(t),$(".wall_post_list 
ul").html(e),FilterPostBind()):($j("#isGroupFeed").val(1),$j("#wall_master").html(t))},"html")}catch(i){}},unsafeWindow.get_party_feeds=function(){var 
t,e
try{$j("#show_party_feed").addClass("active"),$j("#show_regiment_feed").removeClass("active"),$j("#show_facebook_feed").removeClass("active"),$j("#show_friends_feed").removeClass("active"),$j(".fb-like-box").css("display","none"),$j(".shouter").css("display","block"),$j(".wall_post_list 
ul").css("display","block"),t="/"+(LANG?LANG:"en")+"/main/party-post/olde// 
==UserScript==
// @name		eRepublik Stuff ++
// @version		2.2.22
// @namespace	http://userscripts.org/scripts/show/390674
// @require		http://code.jquery.com/jquery-2.1.0.min.js
// @include		http*://*www.erepublik.com/*
// @exclude		
/^http(.*)://www\.erepublik\.com/(.*)/(get-gold|loyalty/program|gold-bonus)(.*)/
// @exclude		http://www.erepublik.com/en/map
// @grant		GM_info
// @grant		GM_deleteValue
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_addStyle
// @grant		GM_xmlhttpRequest
// @grant		unsafeWindow
// ==/UserScript==
function initBattle(){var 
t=$(".country.left_side").html().split("<h3>"),e=t[1].split("</h3>"),i=e[0]
eRS.country==i&&(bonusCountry=!0),setDamageKills(),GM_addStyle("#collection_complete,.blockUI.blockOverlay,.blockUI 
blockMsg blockElement{display:none!important}")}function 
setDamageKills(){$j(document).ajaxSuccess(function(t,e,i){var 
a,n,o,r,s,l,d;(null!==i.url.match(/military\/fight-shoot$/)||null!=i.url.match(/military\/fight-shoot/)||null!=i.url.match(/military\/fight-shooot/)||null!=i.url.match(/military\/deploy-bomb/))&&(a=e.responseText,n=JSON.parse(a),o=n.message,r=n.error,r||"ENEMY_KILLED"!=o&&"OK"!=o||(s=0,l=0,d=0,null!=i.url.match(/military\/deploy-bomb/)?(weaponDamage=n.bomb.booster_id,s=n.bomb.damage):(s=n.user.givenDamage,l=n.user.earnedXp,1==n.oldEnemy.isNatural&&(d=1,s+=Math.floor(.1*s))),Kills+=1,Damage+=s,Hits+=l,setTimeout(function(){GM_setValue(eRS.citizenId+".killsToday"+date,Kills),GM_setValue(eRS.citizenId+".damageToday"+date,Damage),GM_setValue(eRS.citizenId+".hitsToday"+date,Hits)},0),ShowKillDamage(1),options.mercBT&&MercenaryBTUpdate(),1==bonusCountry&&1==options.TPmedal&&updateTP(s)))})}function 
coma(t){if(t>=1e3){t+=""
for(var e=/(\d+)(\d{3})/;e.test(t);)t=t.replace(e,"$1,$2")
return t}return t}function ShowKillDamage(t){var 
e=coma(Damage+Guerrilla)
1==t?$(".user_finances.NoKills").html('<strong style="padding: 3px; 
font-size: 12px; color: #666">Kills today: </strong><br><span 
style="color: #3c8fa7; float: right; padding-right: 3px; font-size: 
13px; font-weight: bold;">'+Kills+'</span><br><strong style="padding: 
3px; font-size: 12px; color: #666;">Damage today: </strong><br><span 
style="color: #3c8fa7; float: right; padding-right: 3px; font-size: 
13px; font-weight: bold; ">'+e+'</span><br><strong style="padding: 3px; 
font-size: 12px; color: #666">Hits today: </strong><br><span 
style="color: #3c8fa7; float: right; padding-right: 3px; font-size: 
13px; font-weight: 
bold;">'+Hits+"</span>"):$("#eRS_settings").before('<div style="1px 
solid #DFDFDF; margin-bottom: 5px;" class="user_finances 
NoKills"><strong style="padding: 3px; font-size: 12px; color: 
#666">Kills today: </strong><br><span style="color: #3c8fa7; float: 
right; padding-right: 3px; font-size: 13px; font-weight: 
bold;">'+Kills+'</span><br><strong style="padding: 3px; font-size: 12px; 
color: #666;">Damage today: </strong><br><span style="color: #3c8fa7; 
float: right; padding-right: 3px; font-size: 13px; font-weight: bold; 
">'+e+'</span><br><strong style="padding: 3px; font-size: 12px; color: 
#666">Hits today: </strong><br><span style="color: #3c8fa7; float: 
right; padding-right: 3px; font-size: 13px; font-weight: 
bold;">'+Hits+"</span></div>")}function last5Days(){var 
t,e,i,a,n,o,r,s,l,d,c,p,g,m=window.location.toString().split("/")
if(eRS.citizenId==m[6]){for(m=parseInt(date),e=0,a=0,o=0,s=0,d=0,p="",g=0;4>=g;g++)t=parseInt(GM_getValue(eRS.citizenId+".hitsToday"+(m-g),0)),i=parseInt(GM_getValue(eRS.citizenId+".killsToday"+(m-g),0)),n=parseInt(GM_getValue(eRS.citizenId+".damageToday"+(m-g),0)),r=parseInt(GM_getValue(eRS.citizenId+".guerrillaToday"+(m-g),0)),e+=t,a+=i,o+=n+r,s+=r,l=Math.floor(.1*(n+r)),d+=l,c=0==t?0:Math.floor((n+r)/t),p+='<tr 
class="current"><td style="color: #666666; font-size: 11px; width: 
230px; padding-left: 10px;">'+(m-g)+'</td><td style="color: #666666; 
font-size: 11px; width: 50px;">'+t+'</td><td style="color: #666666; 
font-size: 11px; width: 50px;">'+i+'</td><td style="color: #666666; 
font-size: 11px; width: 70px;">'+(n+r)+'</td><td style="color: #666666; 
font-size: 11px; width: 70px;">'+r+'</td><td style="color: #666666; 
font-size: 11px; width: 50px;">'+l+'</td><td style="color: #666666; 
font-size: 11px; width: 50px;">'+c+"</td></tr>"
p+='<tr class="current" style="font-weight: bold;"><td style="color: 
#999999; font-size: 11px; width: 230px; padding-right: 30px; text-align: 
right;">Total</td><td style="color: #999999; font-size: 
11px;">'+e+'</td><td style="color: #999999; font-size: 
11px;">'+a+'</td><td style="color: #999999; font-size: 11px; width: 
70px;">'+o+'</td><td style="color: #999999; font-size: 11px; width: 
70px;">'+s+'</td><td style="color: #999999; font-size: 11px; width: 
50px;">'+d+'</td><td style="color: #999999; font-size: 11px; width: 
50px;">&nbsp;</td></tr><tr class="current" style="font-weight: 
bold;"><td style="color: #999999; font-size: 11px; width: 230px; 
padding-right: 30px; text-align: right;">Average</td><td style="color: 
#999999; font-size: 11px;">'+Math.floor(e/5)+'</td><td style="color: 
#999999; font-size: 11px;">'+Math.floor(a/5)+'</td><td style="color: 
#999999; font-size: 11px; width: 70px;">'+Math.floor(o/5)+'</td><td 
style="color: #999999; font-size: 11px; width: 
70px;">'+Math.floor(s/5)+'</td><td style="color: #999999; font-size: 
11px; width: 50px;">'+Math.floor(d/5)+'</td><td style="color: #999999; 
font-size: 11px; width: 
50px;">&nbsp;</td></tr>',$(".citizen_military").eq(1).after('<div 
class="clear"></div><h3>Influence Done</h3><div id="eRS_InfInfo" 
class="citizen_military"><table id="influTable" border="0" width="100%" 
class="details"><thead><tr>
