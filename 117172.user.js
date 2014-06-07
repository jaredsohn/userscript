// ==UserScript==
// @name TMAdmin
// @namespace 
// @version 0.5.0.1
// @description 
// @copyright 2011 estfeed
// ==/UserScript==

MWAddon.addMenu({ 
name: 'Target Mafia Admin', 
position: 0, 
icon: "https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/leaderboard/leaderboardTarget.png",
action: function(){gotoURL('http://www.facebook.com/groups/226210967407932/')},
subMenu: function(){
return [

 {'name': 'Target Mafia Group',
'icon': "https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/leaderboard/leaderboardTarget.png",
'css': {'border-bottom':'1px solid gray'},
'click': {'func':gotoURL,'params':'http://www.facebook.com/groups/226210967407932/'}},

   {'name': 'Target Elimination',
'icon': "https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/v3/icon_sheet_25x24_01.png",
'click': {'func':gotoURL,'params':'http://www.facebook.com/groups/142258255848329/'}},

   {'name': 'Family: Weekly Stats',
'icon': "https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/v3/icon_sheet_25x24_01.png",
'click': {'func':gotoURL,'params':'https://docs.google.com/spreadsheet/ccc?key=0Ah_Ektg8IlWGdERpa3llN3k4aVRJOGw1T0owU0cxSEE&hl=en_GB#gid=74'}},

   {'name': 'Family Rank',
'icon': "https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/inventory/WishlistDropDown/Inventory-wishlist-icon.png",
'css': {'border-bottom':'1px solid gray'},
'click': {'func':gotoURL,'params':'http://spockon.me/familyrank/family-3243'}},

   {'name': 'Family Manager',
'icon': "http://mwfb.static.zgncdn.com/mwfb/graphics/clan/Family-icon-single.png",
'click' : {func:InjectBM,params:'http://estfeed.webs.com/JS/family_history.js'}}, 

   {'name': 'Family Boss Fighter',
'icon': "https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/epicbossfight/bossfightFistIcon.png",
'click' : {func:InjectBM,params:'http://spocklet.com/bookmarklet/family-boss-fighter.js'}}, 

   {'name': 'Manual Fighter 〤',
'icon': "https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/map_based_jobs/expert_view/expertview_icon_gun.gif",
'click' : {func:InjectBM,params:'http://www.creallaborate.com/guessx/mw/scripts/fightx.js'}}, 

   {'name': 'Slots helper',
'icon': "https://zyngapv.hs.llnwd.net/e6/mwfb/content/graphics/en_US/PromoIcons/slots_icon.png",
'click' : {func:InjectBM,params:'http://spocklet.com/bookmarklet/loose_slots.js'}}, 

   {'name': 'Gift Blaster!',
'icon': "http://mwfb.static.zynga.com/mwfb/graphics/v3/icon_gift_27x28_01.png",
'click' : {func:InjectBM,params:'http://spocklet.com/bookmarklet/giftblaster.js'}}, 

   {'name': 'Gift Acceptor',
'icon': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADA0lEQVR42n2TW0jTURzHv3/nnE7d1C3nLd3cbJuXTDfTckVpYiRSElgZ+LCHKAjxwSKhkL3Ug/UaROJL4gW7MKpZYFhSiWV4DVJDnTh1/r39ne5m2zr7g6Jo/d7OOd/zOd/f5VD4T/h8Pqp1aPTxz3k6O5lyf1/wUK/54yMfq6qqXFsaaueFe89aKwN4Aa2G8vJNhmEUoaGhug9Tlsq+ielTnvU1OB0OD3d6/JqhtrZxG9DX1yfWaDQrdrv9SKPxtfHrwCC1HBJxoEKbzl33AmaKB8H6KiyWGczMzuFmSfFTbVZmjUgkWmMB7e3t55VKZZNcLg8bGBlBo/EN+n9P4pgsAQuLS4g5rIEwWoKzKhnihEKIxSLw+fw/JL7QNH2VamhoSKcoqjsoKChywsNBsNuOxRUG0ugo6LI1kEqTMG/bQI/FCm8wH1lCPhSiCDidTo/ZbBZQdXV1gQqF4j5J4dbo3AJylApotVqEhYVBSF7k8XggD8DtdqOpqxtuH4VLudkgDowSieQCW8S2trZiInjnDAiEzTrHikldkJ+fD6/Xy6798aTzE9IS4nD8kBwul6siPj6+hQU0NzeLuVwu7eWFYGl2Bmurq34BCgoKoFKpWAd+kOFVB/Qnc3FQFAWbzaYkdRvbbqPRaJxa3LAnrS4vAy6nP0fodDqkpqaygGWy/7CrB3dLCsHlcJiY2NhIctm3DTCZTM9naPriFGlVdEgw6yAnJwdpaWns+bzViubBX6g+cwKbm5tdiYmJBbsGqaOj4w5jsz3oGhxGRqwEDocDmZmZyMjIYM/ppSW8H53Eldwsf03qk5OTb+8C6PX6cJKzqXNwWJcnl4F0hbW/BbDQNKaZDajFEXNjY2PnysrKBvaMsh+yES7sPa1Wqv0ppKSkbAOGJqZgZWzfzD96ywwGw+y+f8Efl69XS/NU0jYOh3NUJpOxAPKpfJ8Hhl+87R+90WKoWdyp3wPYckKKZyIDplOr1QyZOH1RUdHL/bT7ArYghYWFjwQCQX1paen4v3R/AeSaS1ILC2JNAAAAAElFTkSuQmCC",
'click' : {func:InjectBM,params:'http://spocklet.com/bookmarklet/giftcollector.js'}}, 

   {'name': 'Drone 〤',
'icon': "https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/map_based_jobs/expert_view/expertview_icon_energy_white.png",
'click' : {func:InjectBM,params:'http://www.creallaborate.com/guessx/mw/scripts/gxsdrone.js'}}, 

   {'name': 'Switch',
'icon': "https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/war/MW_DeclareWar_war_main_refresh_05.png",
'click' : {func:InjectBM,params:'http://spocklet.com/bookmarklet/switch.js'}}, 

   {'name': 'Worst Items',
'icon': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACE0lEQVR42q2Tz2sTQRTH3/zI7maboIbsph48VJLquU2JIEoPCh5aLKIgBS9eelChB8HiD0IVT4I/qij00H9B/EU9KIWCx4jQg1LbgiTZ0mZjutlNt5v91bc56KlQbR8Mb+YN7zNv5n2HwB6N7Asg13uc/Fz8Ef4X4OnUq3zgBx7jzEMD1/PBRx/NgyCAMAzRh+D7HliWlZEkqSEI4vrDB3crHUDp68JmrabH264L7XYbh4vJLjiO20mKQBHExT0P1z7CRFGsLC0tFl8+fzxDpl5MrxnGhholFwoFaDYNKFeqoOs64GnAGQfTtIDgZaOKfKzQRVBaSecn702UyLUbN0dM00wxxgIu8H48NbHlOBCE4ZFkIpm1W5sbRrOZrdfWulZWloFSCrlcL/TlB5aR+mjHLoxdH+/LKGrifvH2/OXRK0+kuDw+++EtCGIcFEWBVFo98+nju887Am7dKfJEl3yVUdLCdxhuGFb/+zevs6bV6lTRc7Rn7Mv83PSudXDh0ujgqlaZq1Y1sO0t6D6cKS18K+V3DRg+f1Gs1/XfmqbJtm1DLBaDVOrQwD8p8fTg2dly+dc5Ve0GTVuFZFKe+QM4cWqIUQ6MhAEHCBkOjgJAjzFCMEYY5/CsUV8fiVrp+QF2I/f9L+DkEEVhxwgFAYMCZUSkBER8MBlbfIASctBx7GMIyciyxFAToecFjf35THuxbaMI8dyQO+T6AAAAAElFTkSuQmCC",
'click' : {func:InjectBM,params:'http://spocklet.com/bookmarklet/show-worst-items.js'}}, 

   {'name': 'Ineed (temp)',
'icon': "https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/inventory/SortByIcons/Inventory-sort-abc-icon.png",
'click' : {func:InjectBM,params:'http://spocklet.com/bookmarklet/inventorygroup.js'}}, 

   {'name': 'Any Part',
'icon': "https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/quest/toughguy-icon.png",
'click' : {func:InjectBM,params:'http://spocklet.com/bookmarklet/missionlink.js'}}, 

]; 
}});

function gotoURL(url) {
unsafeWindow.open(url)
};

function InjectBM(url) { 
c$('script').attr('src', url+'?'+Math.random()).appendTo('body'); 
};