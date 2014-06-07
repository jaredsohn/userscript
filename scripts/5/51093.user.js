// ==UserScript==
// @name           SUEditor ( no-autoupdate version )
// @namespace      http://onyxstone.stumbleupon.com/
// @description    SUEditor ( no-autoupdate version )
// @include        http://*.stumbleupon.com/*
// @version        0.0.4
// @author         (onyxstone) http://onyxstone.stumbleupon.com/
// @license        script under Creative Commons Attribution 3.0 United States License, All Icons created by FAMFAMFAM (famfamfam.com )
// ==/UserScript==


//All Icons by FAMFAMFAM.COM 

var script_title = "SUEditor";
//TODO
var source_location = "http://userscripts.org/scripts/source/45642.user.js"; 
var current_version = "0.0.4";
var latest_version = "0.0.4";
var gm_updateparam = "sueditor_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

var updates_checked_once = false; 

GM_registerMenuCommand("Update SUEditor", CheckVersion);

//TODO
//var version_holder = "http://docs.google.com/Doc?id=dc3d5ng_3d4g7vsdc";
var version_holder = "http://www.freewebs.com/onyxstone/versionholder.txt";


var HTML = 
{
}

var BGs = 
{
  
  separator : 'data:image/gif;base64,R0lGODlhAwAQALMAAKqjhKmihIB4WIR8WpCHYrCpjWhiR5+XdZ6Wc3JrTqCYdoB4V5SLZf///wAAAAAAACH5BAEAAA0ALAAAAAADABAAAAQWsADUajikNsWW5l4Ffp3GDIkmJIYWAQA7'
}


var Icons = 
{
  expand : 'data:image/gif;base64,R0lGODlhCAAEAMQUADcqHCYdFBoTDWpXQ6mekoBwX45/caGViKuhlkExIRYRC5uPgnRjUDImGlhDLXJgTkIyIiIaEV1IM007J////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABQALAAAAAAIAAQAAAUVoHEgxFJIEzUwjwM1VJwAgRDfkXKHADs=',
  bold: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADCSURBVCjPY/jPgB8yUEtBeUL5+ZL/Be+z61PXJ7yPnB8sgGFCcX3m/6z9IFbE/JD/XucxFOTWp/5PBivwr/f77/gfQ0F6ffz/aKACXwG3+27/LeZjKEioj/wffN+n3vW8y3+z/Vh8EVEf/N8LLGEy3+K/2nl5ATQF/vW+/x3BCrQF1P7r/hcvQFPgVg+0GWq0zH/N/wL1aAps6x3+64M9J12g8p//PZcCigKbBJP1uvvV9sv3S/YL7+ft51SgelzghgBKWvx6E5D1XwAAAABJRU5ErkJggg==',
  italic : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABxSURBVCjPY/jPgB8yUFtBdkPqh4T/kR+CD+A0Ie5B5P/ABJwmxBiE//f/gMeKkAlB/90W4FHg88Dzv20ATgVeBq7/bT7g8YXjBJf/RgvwKLB4YPFfKwCnAjMH0/8a/3EGlEmD7gG1A/IHJDfQOC4wIQALYP87Y6unEgAAAABJRU5ErkJggg==',
  underline : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACjSURBVCjPY/jPgB8yEKmgPKH8ffn/0n4IL3F99P+QAjQTyveX/IexIwWCz2NYUbw/7z/CYK/9GApy92cgKXDEVJC+PxFJgQWmgoT9kUgK9DEVROwPRFKghqnAv9/7v2MAhK3iINePocBNwf69xXlDhf8Myg4y58UUsISkmYL+fI39ivul+0UMSA/q/wza/1X+y/0X/y/0n+c/+3/m/6SbgAsCAM8i/W7eee6fAAAAAElFTkSuQmCC',
  strikethrough : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACfSURBVCjPY/jPgB8yUFNBiWDBzOy01PKEmZG7sSrIe5dVDqIjygP/Y1GQm5b2P7kDwvbAZkK6S8L/6P8hM32N/zPYu2C1InJ36P/A/x7/bc+YoSooLy3/D4Px/23+SyC5G8kEf0EIbZSmfdfov9wZDCvc0uzLYWyZ/2J3MRTYppn/14eaIvKOvxxDgUma7ju1M/LlkmnC5bwdNIoL7BAAWzr8P9A5d4gAAAAASUVORK5CYII=',
  subscript : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE4SURBVDjLY/j//z8DJZhh8BhQXl5+oLi4+EBubu6BtLS0A/Hx8Qrh4eEH/Pz8Dri6uh4gaABQcwBQ84eUlJT/QM0TQGJAzQ1AzQtsbGwUiPIC0GYHoOb/kZGR/4GaC/DZjDMMgM6eEBgY+N/Nze0/0GYBkg0A2iwA0uzi4vLfyMhoAskGgJwNtLnA2tr6v4GBwX8FBQUHkHjIlAcKpaueX2jZ/PKDb9fdBgwDQDZDA6wAxNfU1JwAdMF/CQmJD4KCggbJ8x5vAGpU8Gq71dCw/vl/DAOgNh8AORuo2QBo8wGg5gNAzQe4uLgOsLCwGIDUJc56eCFl3qMHZCUk+4prDWGT7l0wz7lkQLIB1kVXApyqry0wybggYJh8wUEv/qwCSQZ4t948kD734f/kWQ/+h028+2HwZCYAjxChYziQ1VwAAAAASUVORK5CYII=',
  superscript : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE3SURBVDjLY/j//z8DJZhh6BgQMuWBQumq5xdaNr/84Nt1t4FkA5LnPd4A1Kjg1XaroWH98/9keyFx1sMLKfMePcAwoLy8/EBxcfGB3NzcA2lpaQfi4+MVwsPDD/j5+R1wdXU9AFJjX3GtIWzSvQvmOZcMMAwAag4Aav6QkpLyH6h5AkgMqLkBqHmBjY2NgnXRlQCn6msLTDIuCBgmX3DQiz+rgOEFoM0OQM3/IyMj/wM1F8BsBmHv1psH0uc+/J8868H/sIl3P+AMA6CzJwQGBv53c3P7D7RZgORoBNosANLs4uLy38jIaALJBoCcDbS5wNra+r+BgcF/BQUFB6IMANkMDbACEF9TU3MC0AX/JSQkPggKChoQNABq8wGQs4GaDYA2HwBqPgDUfICLi+sACwuLweDMTAA2jKFj5WHetwAAAABJRU5ErkJggg==',
  insertorderedlist : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD3SURBVDjLY/j//z8DJRhM5Mx/rLLo8Lv/ZBsA0kyRATBDYOzy8vJsIP5fUlLyv6Cg4H92dvb/1NTU/wkJCf8jIyP/BwcH/8fqgkUHSXcFA1UCce7+t/9n7Xn9P2LiPRWyXRDae0+ld8tL8rwQ1HVHpXPTc7jmuLi47IiIiP+BgYH/vby8/js7O/+3sbH5b2Ji8l9XV/e/mpoaaiC2rX/+v3HN0/81q54OUCCWL3v8v3Tp4//Fix+T7wKQZuu8S+THAkgzzAVGRkbZ2tra/1VUVP7Lycn9FxcX/y8kJPSfh4fnPzs7+39mZmbUQARpBGG7oisddA9EAPd/1bRtLxctAAAAAElFTkSuQmCC',
  insertunorderedlist : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADqSURBVDjLY/j//z8DJZiBKgbkzH9cMHXX6wcgmiwDQJq3nv/4H0SD+OXl5dlA/L+kpOR/QUHB/+zs7P+pqan/ExIS/kdGRv4PDg7+T10XDHwgpsx8VNC56eWDkJ675Hmhbf3zB0uPvP1fuvQpOBDj4uKyIyIi/gcGBv738vL67+zs/N/Gxua/iYnJf11d3f9qamqogRjQcaugZPHjB66V14ZqINrmXyqIn3bvgXXeJfK8ANLcv+3lfxAN4hsZGWVra2v/V1FR+S8nJ/dfXFz8v5CQ0H8eHp7/7Ozs/5mZmVEDEWQzRS6gBAMAYBDQP57x26IAAAAASUVORK5CYII=',
  indent : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADzSURBVDjLY/z//z8DJYCJgUJAsQEsMEZ5efn/f//+Mfz58weOf//+Dce/fv2C0yC8d+9eRpA+RkrDAO6Czi3vrpT7COnA+LGxsdeRbUTHZ86c0UQx4MfvvwyZi55cvXX7a8jeZvXrQEWKuDSDMAyAvdCy+cV/EW42hk/ffzOcvvP1zMNbX+JOTdW7TowX4GGQs/jFlVfvvzPdvfop+OxM/euenp5XYLb9/PkTbjPMWw8fPtRB8cK3n/8YVuUpasG99OOHCrqzkWMDwwUUx4K3t/d/fIGGnCZA+PPnz1ROB7a2tv+xBRayrR8+fGDEGQsDlpkACSYJhTJIjokAAAAASUVORK5CYII=',
  outdent : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADxSURBVDjLY/z//z8DJYCJgUJAsQEsMEZ5efn/f//+Mfz58weOf//+Dce/fv2C0yC8d+9eRpA+RkrDgAWZ07rx3ZVqfyEdEDs2NvY6so3o+MyZM5pwAwL67msqSLCv4WFjgTsHqEgRl2YQhgFG3867mpJirIs0JdlNmBiZGR6++c7QGyXDSKwXwGHgWHldU1KOYy03B8e/2YmSYC94enpegdn28+dPuM0wbz18+FAH7oX97ZrXgZRW9MxnV2Am//jxQwXd2cixgeICqsSCt7f3f3yBhpwmQPjz589UTge2trb/sQUWsq0fPnxgxBoLA5qZANTo8jopO/z6AAAAAElFTkSuQmCC',
  justifycenter : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB8SURBVCjPY/zPgB8wMVCqgAVElP//x/AHDH+D4S8w/sWwl5GBgfE/MSYwMORk/54C0w2FOcemgmSIMyH1P7LNCHiLBDcEZ/+agqwXaFbOIxLc4P0f1e7fUPiZGDcw/AdD02z9/5r/Vf7L/Zf8L/Kf/z/3f/ZsiAwjxbEJAKUIVgAswNGVAAAAAElFTkSuQmCC',
  justifyleft : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABjSURBVCjPY/zPgB8wMVCqgAVElP//x/AHDH+D4S8w/sWwl5GBgfE/MSYU/Ifphej8xbCLEaaAOBNS/yPbjIC3iHZD5P9faHqvk+gGbzQTYD76TLQbbP//hOqE6f5AvBsIRhYAysRMHy5Vf6kAAAAASUVORK5CYII=',
  justifyright : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABjSURBVCjPY/zPgB8wMVCqgAVElP//x/AHDH+D4S8w/sWwl5GBgfE/MSZAQNL/31CdMHiGaBNS/yPbjIC3SHSD+3+EXoh5z4k2wfs/qt2/ofAziW7Q+v8brhsSrn+IMYFgZAEAE0hMH/VkcbsAAAAASUVORK5CYII=',
  justifyfull : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABjSURBVCjPY/zPgB8wMVCqgAVElP//x/AHDH+D4S8w/sWwl5GBgfE/MSYU/IfpheiEwTNEm5D6H9lmBLxFtAmR/3+h6YWY95xoE7z/o+uHwM9Em2D7/yeSzSAICdc/xJhAMLIA+V1VH3Z4v2kAAAAASUVORK5CYII=',
  createlink : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHMSURBVDjL3VK9S0JxFBWChvoHinap4UG6RIsihYMfiTboUFGhPVIbxAJFG5TEKM1U1CWENjEUigiyHBRnicrCwaIlXPqggldRnd6VkNqMti4cfvede875Xd57AgCCv0DwjwIkEkmn2Wxe8Pl8t8lkEm63+8pqtQ7w6OL7GnE0Iw1pfwSIxeJ2lUq1Eg6HUa/XUavVUCgU4PF4LlwuV7FarT4TVyqVQBrSkqcZIBKJRux2+32lUrk1GAx7SqXyzWQyIRKJwOl0gnriaJZKpa5IS57vG6x4vV4uGo2yGo2mQyqVPubzeZTLZRSLRWQyGRBHM9KQljzNAIZhZlmWvYvH4/M6nW5fJpO9yuVyaLXaBqgnjmakIS15mgF9fKnV6vNgMHiXTqdvstksEokEbDYbHA5How9t+mCLjX3MrGlg8Mreh+eYcDNAKBS28Sv2KxSKS6PR+GSxWDgeL3q9foLH0OzixItnawq7pzEcXecQOjBDH2IwYOkOtPStx/3D3PbJOrbPIqAKHJoQOmQpgGspQOUSYe90A99r5zhGAa39bYPWHm41Nw1/brJh9u9P/m4DXrg0GuhFMGds3EwnPbf8Dr5Clnk80Npf5zLxn1E7ljyteCJyAAAAAElFTkSuQmCC',
  unlink : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHqSURBVDjL3VJBaJJhGDZ+F7Sduo0gYoeEDkJ6iV00t/Yf1H+il99TMPrFUjuY1XQKpeAOggMV9DQPnUTQTg0Xc6B5GSM7WXj4N6QIKdKgNd0yn753B1m3H7r1wQMvz/s8z/fA96kAqP4Fqv8owGAwzHg8nifxeLyXz+cRiUQ6Pp/vFsMsm2XiaEca0v4VoNfrL1qt1kQqlUK324Usy6jVaohGowfhcLjebreHxDUaDZCGtOSZBOh0uuVAIPC91Wr1nE7nlsViGblcLqTTaYRCIdBMHO0KhUKHtOQ53yARi8UGmUzGbbPZpo1G449qtYpms4l6vY5SqQTiaEca0pJnEqDVah+43e5+Npt97HA4tk0m0ynP87Db7WegmTjakYa05JkE3GBHEIQPyWSyXywWv5XLZeRyOfj9fgSDwbO5su7Brnjt987CFF7y06cvTJc2JgEajYZjFW+azeZDSZKOvF7vgOFEFMW7DIvZFX74LjCPwaskxu8r+Fl4hH2vdvR6Uf1Q0Vtv3+HkY2ZGWgBWLwPrc/iauA3GHygK2FlQj8dvyzh/+s9mQbyyBkvcx6PNewAzDZ+q0GPo3OfA+E+KAt6IV57vSdd/fV6dw5fQFGTpAqqCelRZ4tYU//mGeDXIbjyk2tSIzMT/ASTzlHJFEjXFAAAAAElFTkSuQmCC',
  insertimage : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIfSURBVDjLpZPNS5RRFMZ/577v+L5jmlmNoBgE4iLIWkgxmTtx4R8QLXLRB1GYG4lAwlWkCH1sShcRuIgWYUQoBIUVgojLyowWLSRhSCNtchzn672nxYxT6hRBD/cuzuW5D+c5H6Kq/A9cgM6+0VtBTk4tJwM/kS7BspvDsAc7w4w8uXGyxwUIrHRev9AcqYlERMRFAS3+E1RBdSNWglyGs9eenwbyAsuJwIvsjUjX7QfU7duF51gC9cBUYYT8NYJjhM8fZ+nvuUg2EClaSKbBGJfGhv0cjLbiGAfVAMQFEYwIIgZjDCHHYO2WGmzY9DwfP1yRz/cv0KLJLQLZTIpsah1EULVYDbDWIICq4khALpNE1W7PQBW+xmN8W4qTtTmsBvxIL5IJ6pECp8ZbYX0tDmpKC3xZLCe0kPr1oBFUU0XyCmEWFnT7HNgC3zhlGMcr6TtITJBLvKK6+jtX7z/ElDV4cGJzBn9COv6MPZXTNDcfpX53I6/nnrL+ftKPdtfddAHUWgRYmp8rKRAKPabtSAeBCThc287Eh1GiTS3Mfxq75OZnLd+coYG+YvQ7rtzpJyQVdBw4B8DltnuMzw4DY74LsDNs4jaXqqotl3wLC4KFw+panLnYNG9jU/S2jzD44gx+vlYpF2CHZx6dH3h5LJnVJmtL7dJxf+bdtNdyqJXx2WHKxGXqzSTAkPzrOke76waBLqASWAWGZ+7Gen8CJf/dMYh8E3AAAAAASUVORK5CYII=',
  inserthtml : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJMSURBVBgZpcFLiI1hGMDx//ed78yZ4RzTzGHcRpEZUpqajbsmaYpcdpRYYGEhbGwUG2VhMwslScnCwoZSChE2khW5LliImDFk3M4333nf93mfB6VsFDW/X2JmTETKBKVMUHb04kfjL0SVEBQnQghQiFE4wQWh8EYelKIQMn5a2tvGH4aoEaMhakg0ghhBlRCMIEqIihflzO1RMn77Ni5EBVFDouKjEUQJYnhRnER8MJwoPiid1YyiIaT8pGYM9tVwIbKhv8bW5R3sWNnJzoE6KxdWackStq2YSmtLwu41XTRcZNxFtAikToQgSiVLcEGplFNO3/xAksDQlRG662UWzKwwu7OFyS0pc6dVyJuRIiiaC1nuhKYolXLC9tV1sjQhd4KZ0XARVVjaW8WAZlAazci4j7iQYnkkaxSG80rhlRNXRzmwfjrjTcWAvBmJZjx5XfBm5DqjI9c4cvYLk0OTsU8DqOsn+1p4mr4NM8idYAYNJ5hB7iKqxrmb5+mZ84DBgSV0d/Zy59ll7j+9QH36C5K1x57bpv4O3o45fFCcKC4YXhQnihelXQ+yZeM6KKVsXrSfoVt7KJFy4dI10m/fhcJHaq0lapNKtLeV6KiWqFdLTKtmdE0p86UxSjmpsnnRfn45uPYM87v6SNJANlYETl59hwVDnWJesKCYi+AVi0rP4s88G77Ho+G7HBo8x/Ebu2gtVTAtk5gZ/7Js36xj3fPaD6/oW0XvjH5evn/Ivcd3efvq61BiZvyPZftmHQf2AjXgO3Dq/snhQz8A9uxhvZij7OIAAAAASUVORK5CYII=',
  removeformat : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJCSURBVDjLpZNNiI1xFMZ/73vfuXemmQn3IhqfCQul2ExIkq98bSw0QmSBLCyslBIlO4UUWdkpWREJSc1Y2PmIhVKUGTNmTJm5733v//8//3MsZsTCYmqezbM55zmd55wnMTOmg5RpYtoC2cX7w//dQVQJQXEihACFGIUTXBAKb+RBKQohA+he3vZPqyFqxDjBEo0gRlAlBCOIEqLiRbn9YmhCAGCsIURlsknxcbJYDC+Kk4gPhhPFB6XakVHUZcIDNWPb6k5ciOxe08n+dbM4tKHK0U01NqzsoJwlHFg/m9ZywrHNc6m7SMNFtAikToQgSiVLcEGptKTcevaDJIErD7+zoNbCivkVuqpl2sspS+ZUyJuRIiiaC1nuhKYolZaEgxtrZGlC7gQzo+4iqtC9vAMDmkGpNyMNH3EhxfJIWi8M55XCK9ceD+JFaTQVA/JmJJrx/muDD3evs/beVt7ta+dI73aWfbyNOk/2q/A0fRtmTE6G+iTnLqJqvL5zlZ3pczYdPk5l6SqKd0/50PuMt9Yg2XLpo+1dM4tvow4fFCeKC3+cnzjX4b5d7Dl5mrbPL6G/D2bMZCRbzJMnn8jGxoXCRzpbS/iWhNaQECqGSEKQlKBGNR+gdd5S2HXm7wdemM88fpKNFoEbj/uxYKhTzAsWFHMRvGJR2Vqu0njziPYHp3DFIA1gfKzESFIjmUoa+3q6LpQ7288trEmWpd8YHxa+DJViaNr5ZKpxftWz6Gw+OnCiFJPFsWT9Bjd3PJXLvwGPS3Y/UZc50wAAAABJRU5ErkJggg==',
  source : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHtSURBVDjLjZM9T9tQFIYpQ5eOMBKlW6eWIQipa8RfQKQghEAKqZgKFQgmFn5AWyVDCipVQZC2EqBWlEqdO2RCpAssQBRsx1+1ndix8wFvfW6wcUhQsfTI0j33PD7n+N4uAF2E+/S5RFwG/8Njl24/LyCIOI6j1+v1y0ajgU64cSSTybdBSVAwSMmmacKyLB/DMKBpGkRRZBJBEJBKpXyJl/yABLTBtm1Uq1X2JsrlMnRdhyRJTFCpVEAfSafTTUlQoFs1luxBAkoolUqQZbmtJTYTT/AoHInOfpcwtVtkwcSBgrkDGYph+60oisIq4Xm+VfB0+U/P0Lvj3NwPGfHPTcHMvoyFXwpe7UmQtAqTUCU0D1VVbwTPVk5jY19Fe3ZfQny7CE51WJDXqpjeEUHr45ki9rIqa4dmQiJfMLItGEs/FcQ2ucbRmdnSYy5vYWyLx/w3EaMfLmBaDpMQvuDJ65PY8Dpnz3wpYmLtApzcrIAqmfrEgdZH1grY/a36w6Xz0DKD8ES25/niYS6+wWE8mWfByY8cXmYEJFYLkHUHtVqNQcltAvoLD3v7o/FUHsNvzlnwxfsCEukC/ho3yUHaBN5Buo17Ojtyl+DqrnvQgUtfcC0ZcAdkUeA+ye7eMru9AUGIJPe4zh509UP/AAfNypi8oj/mAAAAAElFTkSuQmCC',
  editor : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHdSURBVDjLjZNPaxNBGIdrLwURLznWgkcvIrQhRw9FGgy01IY0TVsQ0q6GFkT0kwjJId9AP4AHP4Q9FO2hJ7El2+yf7OzMbja7Sf0578QdNybFLjwszLu/Z2femZkDMEfI54FkRVL4Dw8l8zqXEawMBgM2HA6vR6MRZiHraDabH7KSrKBA4SAIEIahxvd9eJ6HbrerJKZpotVqaUkavkMC+iCKIsRxrN6EEAKMMViWpQT9fh/0k3a7PZZkBUPmqXAKCSjAOYdt21NLUj1JBYW7C6vi6BC8vKWKQXUXQcNA5Nh6KY7jqJl0Op1JwY/Hi7mLp/lT/uoA/OX2WLC3C9FoQBwfILKulIRmQv1wXfevwHmyuMPXS5Fv1MHrFSTmhSomnUvw/Spo3C+vg3/+pJZDPSGRFvilNV+8PUZvoziKvn+d3LZvJ/BelMDevIZXK2EQCiUhtMDM53bY5rOIGXtwjU3EVz/HM5Az8eplqPFKEfzLR91cOg8TPTgr3MudFx+d9owK7KMNVfQOtyQ1OO9qiHsWkiRRUHhKQLuwfH9+1XpfhVVfU0V3//k4zFwdzjIlSA/Sv8jTOZObBL9uugczuNaCP5K8bFBIhduE5bdC3d6MYIkkt7jOKXT1l34DkIu9e0agZjoAAAAASUVORK5CYII=',
  arrow_down : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAENSURBVDjLpZM/SwNREMTnxBRpFYmctaKCfwrBSCrRLuL3iEW6+EEUG8XvIVjYWNgJdhFjIXamv3s7u/ssrtO7hFy2fcOPmd03SYwR88xi1cPgpRdjjDB1mBquju+TMt1CFcDd0V7q4GilAwpnd2A0qCvcHRSdHUBqAYgOyaUGIBQAc4fkNSJIIGgGj4ZQx4EEAY3waPUiSC5FhLoOQkbQCJvioPQfnN2ctpuNJugKNUWYsMR/gO71yYPk8tRaboGmoCvS1RQ7/c1sq7f+OBUQcjkPGb9+xmOoF6ckCQb9pmj3rz6pKtPB5e5rmq7tmxk+hqO34e1or0yXTGrj9sXGs1Ib73efh1WaZN46/wI8JLfHaN24FwAAAABJRU5ErkJggg=='
}





var web_named_colors = {White:'rgb(255,255,255)',Ivory:'rgb(255,255,240)',LightYellow:'rgb(255,255,224)',Yellow:'rgb(255,255,0)',Snow:'rgb(255,250,250)',FloralWhite:'rgb(255,250,240)',LemonChiffon:'rgb(255,250,205)',Cornsilk:'rgb(255,248,220)',Seashell:'rgb(255,245,238)',LavenderBlush:'rgb(255,240,245)',PapayaWhip:'rgb(255,239,213)',BlanchedAlmond:'rgb(255,235,205)',MistyRose:'rgb(255,228,225)',Bisque:'rgb(255,228,196)',Moccasin:'rgb(255,228,181)',NavajoWhite:'rgb(255,222,173)',PeachPuff:'rgb(255,218,185)',Gold:'rgb(255,215,0)',Pink:'rgb(255,192,203)',LightPink:'rgb(255,182,193)',Orange:'rgb(255,165,0)',LightSalmon:'rgb(255,160,122)',DarkOrange:'rgb(255,140,0)',Coral:'rgb(255,127,80)',HotPink:'rgb(255,105,180)',Tomato:'rgb(255,99,71)',OrangeRed:'rgb(255,69,0)',DeepPink:'rgb(255,20,147)',Fuchsia:'rgb(255,0,255)',Magenta:'rgb(255,0,255)',Red:'rgb(255,0,0)',OldLace:'rgb(253,245,230)',LightGoldenrodYellow:'rgb(250,250,210)',Linen:'rgb(250,240,230)',AntiqueWhite:'rgb(250,235,215)',Salmon:'rgb(250,128,114)',GhostWhite:'rgb(248,248,255)',MintCream:'rgb(245,255,250)',WhiteSmoke:'rgb(245,245,245)',Beige:'rgb(245,245,220)',Wheat:'rgb(245,222,179)',SandyBrown:'rgb(244,164,96)',Azure:'rgb(240,255,255)',Honeydew:'rgb(240,255,240)',AliceBlue:'rgb(240,248,255)',Khaki:'rgb(240,230,140)',LightCoral:'rgb(240,128,128)',PaleGoldenrod:'rgb(238,232,170)',Violet:'rgb(238,130,238)',DarkSalmon:'rgb(233,150,122)',Lavender:'rgb(230,230,250)',LightCyan:'rgb(224,255,255)',BurlyWood:'rgb(222,184,135)',Plum:'rgb(221,160,221)',Gainsboro:'rgb(220,220,220)',Crimson:'rgb(220,20,60)',PaleVioletRed:'rgb(219,112,147)',Goldenrod:'rgb(218,165,32)',Orchid:'rgb(218,112,214)',Thistle:'rgb(216,191,216)',LightGrey:'rgb(211,211,211)',Tan:'rgb(210,180,140)',Chocolate:'rgb(210,105,30)',Peru:'rgb(205,133,63)',IndianRed:'rgb(205,92,92)',MediumVioletRed:'rgb(199,21,133)',Silver:'rgb(192,192,192)',DarkKhaki:'rgb(189,183,107)',RosyBrown:'rgb(188,143,143)',MediumOrchid:'rgb(186,85,211)',DarkGoldenrod:'rgb(184,134,11)',FireBrick:'rgb(178,34,34)',PowderBlue:'rgb(176,224,230)',LightSteelBlue:'rgb(176,196,222)',PaleTurquoise:'rgb(175,238,238)',GreenYellow:'rgb(173,255,47)',LightBlue:'rgb(173,216,230)',DarkGray:'rgb(169,169,169)',Brown:'rgb(165,42,42)',Sienna:'rgb(160,82,45)',YellowGreen:'rgb(154,205,50)',DarkOrchid:'rgb(153,50,204)',PaleGreen:'rgb(152,251,152)',DarkViolet:'rgb(148,0,211)',MediumPurple:'rgb(147,112,219)',LightGreen:'rgb(144,238,144)',DarkSeaGreen:'rgb(143,188,143)',SaddleBrown:'rgb(139,69,19)',DarkMagenta:'rgb(139,0,139)',DarkRed:'rgb(139,0,0)',BlueViolet:'rgb(138,43,226)',LightSkyBlue:'rgb(135,206,250)',SkyBlue:'rgb(135,206,235)',Gray:'rgb(128,128,128)',Olive:'rgb(128,128,0)',Purple:'rgb(128,0,128)',Maroon:'rgb(128,0,0)',Aquamarine:'rgb(127,255,212)',Chartreuse:'rgb(127,255,0)',LawnGreen:'rgb(124,252,0)',MediumSlateBlue:'rgb(123,104,238)',LightSlateGray:'rgb(119,136,153)',SlateGray:'rgb(112,128,144)',OliveDrab:'rgb(107,142,35)',SlateBlue:'rgb(106,90,205)',DimGray:'rgb(105,105,105)',MediumAquamarine:'rgb(102,205,170)',CornflowerBlue:'rgb(100,149,237)',CadetBlue:'rgb(95,158,160)',DarkOliveGreen:'rgb(85,107,47)',Indigo:'rgb(75,0,130)',MediumTurquoise:'rgb(72,209,204)',DarkSlateBlue:'rgb(72,61,139)',SteelBlue:'rgb(70,130,180)',RoyalBlue:'rgb(65,105,225)',Turquoise:'rgb(64,224,208)',MediumSeaGreen:'rgb(60,179,113)',LimeGreen:'rgb(50,205,50)',DarkSlateGray:'rgb(47,79,79)',SeaGreen:'rgb(46,139,87)',ForestGreen:'rgb(34,139,34)',LightSeaGreen:'rgb(32,178,170)',DodgerBlue:'rgb(30,144,255)',MidnightBlue:'rgb(25,25,112)',Aqua:'rgb(0,255,255)',Cyan:'rgb(0,255,255)',SpringGreen:'rgb(0,255,127)',Lime:'rgb(0,255,0)',MediumSpringGreen:'rgb(0,250,154)',DarkTurquoise:'rgb(0,206,209)',DeepSkyBlue:'rgb(0,191,255)',DarkCyan:'rgb(0,139,139)',Teal:'rgb(0,128,128)',Green:'rgb(0,128,0)',DarkGreen:'rgb(0,100,0)',Blue:'rgb(0,0,255)',MediumBlue:'rgb(0,0,205)',DarkBlue:'rgb(0,0,139)',Navy:'rgb(0,0,128)',Black:'rgb(0,0,0)'};


var specialchars = [

//primary best chars
['skull & crossbones','&#9760;'],
['radioactive sign'  ,'&#9762;'],
['biohazard sign'    ,'&#9763;'],
['Ankh'              ,'&#9765;'],


['left single quote','&lsquo;'],
['right single quote','&rsquo;'],
['single low-9 quote','&sbquo;'],
['left double quote','&ldquo;'],
['right double quote','&rdquo;'],
['double low-9 quote','&bdquo;'],
['dagger','&dagger;'],
['double dagger','&Dagger;'],
['per mill sign','&permil;'],
['single left-pointing angle quote','&lsaquo;'],
['single right-pointing angle quote','&rsaquo;'],
['black spade suit','&spades;'],
['black club suit','&clubs;'],
['black heart suit','&hearts;'],
['black diamond suit','&diams;'],
['overline, = spacing overscore','&oline;'],
['leftward arrow','&larr;'],
['upward arrow','&uarr;'],
['rightward arrow','&rarr;'],
['downward arrow','&darr;'],
['trademark sign','&trade;'],
//['horizontal tab','&#09;'],
//['line feed','&#10;'],
//['unused','&#11;'],
//['space','&#32;'],
['exclamation mark','&#33;'],
['double quotation mark','&quot;'],
['number sign','&#35;'],
['dollar sign','&#36;'],
['percent sign','&#37;'],
['ampersand','&amp;'],
['apostrophe','&#39;'],
['left parenthesis','&#40;'],
['right parenthesis','&#41;'],
['asterisk','&#42;'],
['plus sign','&#43;'],
['comma','&#44;'],
['hyphen','&#45;'],
['period','&#46;'],
['slash','&frasl;'],
['colon','&#58;'],
['semicolon','&#59;'],
['less-than sign','&lt;'],
['equals sign','&#61;'],
['greater-than sign','&gt;'],
['question mark','&#63;'],
['at sign','&#64;'],
['left square bracket','&#91;'],
['backslash','&#92;'],
['right square bracket','&#93;'],
['caret','&#94;'],
['horizontal bar (underscore)','&#95;'],
['grave accent','&#96;'],
['left curly brace','&#123;'],
['vertical bar','&#124;'],
['right curly brace','&#125;'],
['tilde','&#126;'],
['en dash','&ndash;'],
['em dash','&mdash;'],
//['unused','&#152;-&#159;'],
['nonbreaking space','&nbsp;'],
['inverted exclamation','&iexcl;'],
['cent sign','&cent;'],
['pound sterling','&pound;'],
['general currency sign','&curren;'],
['yen sign','&yen;'],
['broken vertical bar','&brvbar;'],
['section sign','&sect;'],
['umlaut','&uml;'],
['copyright','&copy;'],
['feminine ordinal','&ordf;'],
['left angle quote','&laquo;'],
['not sign','&not;'],
//['soft hyphen','&shy;'],
['registered trademark','&reg;'],
['macron accent','&macr;'],
['degree sign','&deg;'],
['plus or minus','&plusmn;'],
['superscript two','&sup2;'],
['superscript three','&sup3;'],
['acute accent','&acute;'],
['micro sign','&micro;'],
['paragraph sign','&para;'],
['middle dot','&middot;'],
['cedilla','&cedil;'],
['superscript one','&sup1;'],
['masculine ordinal','&ordm;'],
['right angle quote','&raquo;'],
['one-fourth','&frac14;'],
['one-half','&frac12;'],
['three-fourths','&frac34;'],
['inverted question mark','&iquest;'],
['uppercase A, grave accent','&Agrave;'],
['uppercase A, acute accent','&Aacute;'],
['uppercase A, circumflex accent','&Acirc;'],
['uppercase A, tilde','&Atilde;'],
['uppercase A, umlaut','&Auml;'],
['uppercase A, ring','&Aring;'],
['uppercase AE','&AElig;'],
['uppercase C, cedilla','&Ccedil;'],
['uppercase E, grave accent','&Egrave;'],
['uppercase E, acute accent','&Eacute;'],
['uppercase E, circumflex accent','&Ecirc;'],
['uppercase E, umlaut','&Euml;'],
['uppercase I, grave accent','&Igrave;'],
['uppercase I, acute accent','&Iacute;'],
['uppercase I, circumflex accent','&Icirc;'],
['uppercase I, umlaut','&Iuml;'],
['uppercase Eth, Icelandic','&ETH;'],
['uppercase N, tilde','&Ntilde;'],
['uppercase O, grave accent','&Ograve;'],
['uppercase O, acute accent','&Oacute;'],
['uppercase O, circumflex accent','&Ocirc;'],
['uppercase O, tilde','&Otilde;'],
['uppercase O, umlaut','&Ouml;'],
['multiplication sign','&times;'],
['uppercase O, slash','&Oslash;'],
['uppercase U, grave accent','&Ugrave;'],
['uppercase U, acute accent','&Uacute;'],
['uppercase U, circumflex accent','&Ucirc;'],
['uppercase U, umlaut','&Uuml;'],
['uppercase Y, acute accent','&Yacute;'],
['uppercase THORN, Icelandic','&THORN;'],
['lowercase sharps, German','&szlig;'],
['lowercase a, grave accent','&agrave;'],
['lowercase a, acute accent','&aacute;'],
['lowercase a, circumflex accent','&acirc;'],
['lowercase a, tilde','&atilde;'],
['lowercase a, umlaut','&auml;'],
['lowercase a, ring','&aring;'],
['lowercase ae','&aelig;'],
['lowercase c, cedilla','&ccedil;'],
['lowercase e, grave accent','&egrave;'],
['lowercase e, acute accent','&eacute;'],
['lowercase e, circumflex accent','&ecirc;'],
['lowercase e, umlaut','&euml;'],
['lowercase i, grave accent','&igrave;'],
['lowercase i, acute accent','&iacute;'],
['lowercase i, circumflex accent','&icirc;'],
['lowercase i, umlaut','&iuml;'],
['lowercase eth, Icelandic','&eth;'],
['lowercase n, tilde','&ntilde;'],
['lowercase o, grave accent','&ograve;'],
['lowercase o, acute accent','&oacute;'],
['lowercase o, circumflex accent','&ocirc;'],
['lowercase o, tilde','&otilde;'],
['lowercase o, umlaut','&ouml;'],
['division sign','&divide;'],
['lowercase o, slash','&oslash;'],
['lowercase u, grave accent','&ugrave;'],
['lowercase u, acute accent','&uacute;'],
['lowercase u, circumflex accent','&ucirc;'],
['lowercase u, umlaut','&uuml;'],
['lowercase y, acute accent','&yacute;'],
['lowercase thorn, Icelandic','&thorn;'],
['lowercase y, umlaut','&yuml;'],
['Alpha','&Alpha;'],
['alpha','&alpha;'],
['Beta','&Beta;'],
['beta','&beta;'],
['Gamma','&Gamma;'],
['gamma','&gamma;'],
['Delta','&Delta;'],
['delta','&delta;'],
['Epsilon','&Epsilon;'],
['epsilon','&epsilon;'],
['Zeta','&Zeta;'],
['zeta','&zeta;'],
['Eta','&Eta;'],
['eta','&eta;'],
['Theta','&Theta;'],
['theta','&theta;'],
['Iota','&Iota;'],
['iota','&iota;'],
['Kappa','&Kappa;'],
['kappa','&kappa;'],
['Lambda','&Lambda;'],
['lambda','&lambda;'],
['Mu','&Mu;'],
['mu','&mu;'],
['Nu','&Nu;'],
['nu','&nu;'],
['Xi','&Xi;'],
['xi','&xi;'],
['Omicron','&Omicron;'],
['omicron','&omicron;'],
['Pi','&Pi;'],
['pi','&pi;'],
['Rho','&Rho;'],
['rho','&rho;'],
['Sigma','&Sigma;'],
['sigma','&sigma;'],
['Tau','&Tau;'],
['tau','&tau;'],
['Upsilon','&Upsilon;'],
['upsilon','&upsilon;'],
['Phi','&Phi;'],
['phi','&phi;'],
['Chi','&Chi;'],
['chi','&chi;'],
['Psi','&Psi;'],
['psi','&psi;'],
['Omega','&Omega;'],
['omega','&omega;'],
['password dot','&#9679;']
];



var font_families =  ['Arial','Courier New','Georgia','Times New Roman','Verdana',
'Trebuchet MS','Lucida Sans','sans-serif','serif','monospace','cursive','fantasy'];




var commands_str 
= '| bold.0 italic.0 underline.0 strikethrough.0 | subscript.0 superscript.0 | insertorderedlist.0 insertunorderedlist.0 | indent.0 outdent.0 | justifycenter.0 justifyfull.0 justifyleft.0 justifyright.0 | insertimage.1 createlink.1 unlink.0 | inserthtml.1 removeformat.0';

var Commands =
{
    'bold' : {tooltip : "Make this text *b o l d* " },
    'italic' : {tooltip : "Make this text *i t a l i c* " },
    'underline' : {tooltip : "Underline text" },
    'strikethrough' : {tooltip : "Line-through text" },
    'subscript' : {tooltip : "Subscript text" },
    'superscript' : {tooltip : "Superscript text" },
    'insertorderedlist' : {tooltip : "Insert numbered list" },
    'insertunorderedlist' : {tooltip : "Insert bulleted list" },
    'indent' : {tooltip : "Indent" },
    'outdent' : {tooltip : "Outdent" },
    'justifycenter' : {tooltip : "Centered text" },
    'justifyleft' : {tooltip : "Align text left" },
    'justifyright' : {tooltip : "Align text right" },
    'justifyfull' : {tooltip : "Justify text" },
    'insertimage' : {tooltip : "Create new image from url" },
    'createlink' : {tooltip : "Add link" },
    'unlink' : {tooltip : "Remove link" },
    'inserthtml' : {tooltip : "Insert HTML" },
    'removeformat' : {tooltip : "Remove HTML formatting" },
    
    
    'insertimage' : {
        prompt_label : 'Enter image address \n'+
                        '( e.g. "http://mysite.com/myimage.jpg" ) '
    },
    'createlink' : {
        prompt_label : 'Enter link URL \n'+
                        '( e.g. "http://google.com/" ) '
    },
    'inserthtml' : {
        prompt_label : 'Enter HTML code \n'+
                        '( e.g. "<font color="red">Some text</font>" ) '
    }


}

winO = window.wrappedJSObject;
$ = winO.$;
jQuery = winO.jQuery;

var textarea;
var iframe;
var doc;
var toolbar;
var toolbar1;
var container;
var current = "editor";
var mode;
var button;
var post;
var updatebar;

var lastEditLocation = 'source';


css = ['.command_block{border: 1px inset; display: inline-block; margin: 0px 4px 0px 4px;}',

".aDiv { color: darkgreen !important; background: #E6F6D7; border: 1px solid #266106; height: 20%; text-align: left; -moz-border-radius: 4px;  display: block;}",
'.aDiv >.container{}',


'.os_button { padding: 0px 0px 0px 0px; border: 1px solid transparent; background: transparent; margin-top: 5px;} .os_button:hover{border: 1px solid blue;}',
'.os_clear{clear: both;}',
'.os_separator{background: url(' + BGs.separator + ') no-repeat bottom center; width: 5px; height: 18px;}' ,
'.os_toolbaritem { padding: 0px 0px 0px 0px;  float: left; margin-top: 5px; margin-bottom: 5px;}',
'.osColorMenu { border: 1px solid gray;  margin-right: 10px; margin-left: 10px; }',
'.osColorMenu > .topcontainer {  height: 22px; }',
'.osColorMenu > .topcontainer > .dropbutton {  height: 100%; background: #E6F6D7; border: 0px solid transparent; border-left: 1px solid green; float: left; }',
'.osColorMenu > .topcontainer > .valuebox {  border: 1px solid transparent; float: left; font-size: 10px; }',
'.osColorMenu > .menu {clear: both; min-height: 1px;  border: 1px solid #266106; }',
'.font_menu_item:hover{color:black !important;background:white;border-color:black;}']
  
  GM_addStyle( css.join(' ') );
  
  var Style_textareahide = document.createElement('style');
  Style_textareahide.type = 'text/css';
  Style_textareahide.id = 'yaw-textarea-hide';
  Style_textareahide.innerHTML = '.g'
  $('head')[0].appendChild( Style_textareahide );










function initialize() {


  if( $('#blogContent')[0] && typeof winO.stumbler !='undefined' ) 
  {
    //CheckVersion();
    //post = $('.dlSite')[0];
    post = document.getElementsByClassName('.dlSite')[0];
    
    if( !post ) post = document.body;
    textarea = $('#blogContent');
    var blog_plaintext = $('#blog_plaintext'); 
    button = $('#submit_buttom');
    form = $('#postToBlogForm');
    createEditorBase();
    var marg = $('#blog_errors')[0].previousSibling.previousSibling;
    $( marg ).after( '<br />' );
    $( '#toggleButtonsNormal').attr('parentNode').style.marginLeft = "0px";
    
    
  }
  else if( $('#commentText')[0] ) 
  {  
    post = $('.dlReview')[0];
    if( !post ) post = document.body;
    $( '#reviewForm' )[0].parentNode.style.width = '';
    textarea = $('#commentText');
    form = $('#reviewForm');
    button = $('#submit_buttom');
    createEditorBase();     
  }
  else if( $('#msgContent')[0] ) 
  {
      post = $('.dlPM')[0];
      if( !post ) post = document.body;
      textarea = $('#msgContent');
      form = $('#sendMessageForm');
      //'Preview Posts' script bug fix
      //_button = $('#cc')[0].previousSibling.previousSibling;
      _button = form[0].getElementsByClassName('btnGreen')[0];
       mode = "contact";      
      button = $( _button );
      container = createEditorBase();
      
  }
  else if( $('#posttext')[0] ) {
      post = $('.lightbg')[0];
      if( !post ) post = document.body;
      textarea = $('#posttext');
      mode = "forum"
      textarea.hide = hideTextarea;
      textarea.show = showTextarea;
      form = document.forms[1];
      button = $( 'input[class="bold"][type="submit"]'); 
      container = createEditorBase(  );
  } 
} 

function hideTextarea() {
   Style_textareahide.innerHTML = '#posttext {display: none !important;}';
}

function showTextarea() {
 Style_textareahide.innerHTML = '#posttext {display: block !important;}';
}


function createEditorBase( node_before ) {
    before = node_before || textarea;
    
    

    iframe = document.createElement('iframe');
    
    iframe.addEventListener('load', onIframeLoad , false );
    container = document.createElement('div');
    toolbar0 = new aDiv( null );
    toolbar0[0].className = '_aDiv';
    toolbar = new aDiv( null );
    toolbar1 = new aDiv( null );
    updatebar = document.createElement('span');
    $$( updatebar ).style('font-size: 8px !important;');
    textarea.before(toolbar0[0]);
    textarea.before(toolbar[0]);
    textarea.before(toolbar1[0]);    
    container.appendChild(iframe);
    iframe.src = 'about:blank';
    container.style.display = 'none';
    container.style.marginTop = '30px';
    iframe.style.border = '0px solid transparent';
    iframe.style.minHeight = '150px';
    iframe.style.width = '100%';
    //iframe.style.outline = 'white dotted 1px';
    textarea.hide();    
    before.before( container );
    $( container ).show();
    createButtons();

    if( textarea.attr('id') == 'blogContent'  ) {

        button[0].setAttribute('type','button');
        button[0].setAttribute('onclick' , '');

        button[0].addEventListener('click', function(e) {
            submitToTextarea();
           return winO.post_blog_entry();
        },false );
    }
    else if( button[0] ) {
        //Fix Preview Post

        var p = document.getElementById('proxy');
        if( p  ) {
         if( mode == "contact" || mode == "forum" ) {

          p.wrappedJSObject._onclick = p.wrappedJSObject.onclick;
          p.nextSibling
            .addEventListener( 'mousedown' , submitToTextarea , false);
          p.wrappedJSObject.onclick = function(e) {
              submitToTextarea();
              this._onclick();
          } 
         }
        }
        else {
          button[0].type = 'button';
          button[0].addEventListener('click', falseSubmit ,false );
        }
        
        
    }
}


function falseSubmit( e ) {
  submitToTextarea();
  form.submit();
}


function submitToTextarea() {
    if( current == "editor") setSource();
    pr = processHTML( textarea.attr('value') );
    textarea[0].value = pr;
}

function processHTML( string ) {

  var temorary_container = document.createElement('div');
  temorary_container.innerHTML = string;
  var spans = temorary_container.getElementsByTagName('span');

  
  
  for(var i=0;i<spans.length;i++) {
    if( spans[i].nodeName == "SPAN" ) 
  
      retagNode( spans[i] , 'font' );
  }
  
  var sups = temorary_container.getElementsByTagName('sup');
  for( var i=0;i<sups.length;i++) {
    var newsup = retagNode( sups[i] , 'font' );
    $$( newsup ).style('vertical-align: super; font-size: smaller;');
  }
  
  var subs = temorary_container.getElementsByTagName('sub');
  for( var i=0;i<subs.length;i++) {
    var newsub = retagNode( subs[i] , 'font' );
    $$( newsub ).style('vertical-align: sub; font-size: smaller;');
  }
  
  var divs = temorary_container.getElementsByTagName('div');
  for( var i=0;i<divs.length;i++) {
    var newnode = retagNode( divs[i] , 'ul' );

  }
  
  result = temorary_container.innerHTML;

  return result;
  
}

function retagNode( node , tag ) {
    var newnode = node.ownerDocument.createElement(tag);
    
    //copy children
    for(var j=0;j< node.childNodes.length;j++ ) {
      newnode.appendChild( node.childNodes[j].cloneNode( true ) );
    }
    
    //copy attributes
    for( var k=0; k<node.attributes.length; k++ ) {
      a = node.attributes[k];
      $( newnode ).attr( a.nodeName , a.nodeValue );    
    }
    
    
    style_attr = $( node ).attr('style');
    $( newnode ).attr('style', style_attr );
    node.parentNode.replaceChild( newnode , node );
    
    return newnode;
    
  }
  



function onIframeLoad( e ) {

    _iframe = e.target;
    
    doc = _iframe.contentDocument;
    _iframe.id = 'EditorHTML';
    
    
    comp_style = getStyle( post );
    var font_size = comp_style.fontSize;
    var text_color = comp_style.color;
    var background = comp_style.backgroundColor;
    var font_family = comp_style.fontFamily;
    
    
    /*var font_size = ( mode == "forum" )? '13px' : '12px';
    var text_color = ( mode == "forum")? 
    getStyle( $('.lightbg')[0] , 'color' ) :
    getStyle( document.body , 'color' ) ;*/
    
    
    var doc_style = doc.createElement('style');
    //comp_style = getStyle( document.body ); 
    
    
    doc_style_css = 
    "body{background:"   + background  +
    "; color:"           + text_color  +
    "; font-family: "    + font_family +
    "; font-size:"       + font_size   + ";}";
    
    /*doc_style_css = "body{background:"+comp_style.background
    +"; color:"+text_color+"; font-family: "+ 
    getStyle( document.body , 'fontFamily')+"; font-size:" + font_size + ";}";*/
    
    doc_style_css+="body img {max-width:715px;}"
    
    //fix ul ol problem
    
    doc_style_css+='ul, ol { margin-bottom:0;margin-top:0;-moz-padding-start:40px;display:block;text-align:left;border-spacing:0;border-collapse:separate;}';
    doc_style_css+='li {text-align:left;border-spacing:0;border-collapse:separate;text-indent:0;}';
    doc_style_css+='ul {margin:0 0 0 0.5em;padding:0 0 0 0.5em;}';
    
    

    //var textlink = $('li.textlink a')[0];
    var textlinks = document.getElementsByClassName('textlink');
    var a;
    for( var i=0;i<textlinks.length; i++) {
      ch = textlinks[i].firstChild
      if( ch && ch.nodeName == 'A' ) {
        a = ch;
        break
        }
      
    }
    
    if( a ) {
      var link_color = getStyle( a ).color;
      doc_style_css+="a{color:" + link_color + " !important;}"; 
      doc_style_css+="a{text-decoration: none!important;}";
    }
    else {
      var link_color = getStyle( document.getElementsByTagName('a')[0] ).color;
      doc_style_css+="a{color:" + link_color + " !important;}"; 
      doc_style_css+="a{text-decoration: none!important;}";
    }
    
    doc_style.type = "text/css";
    doc_style.innerHTML = doc_style_css;
    doc.body.previousSibling.appendChild(doc_style);
    
    _iframe.style.outlineColor = getStyle( document.body , 'color' );
    _iframe.style.outline = 'dotted 1px';
    

    
    setHTML();
    
    doc.designMode = 'on';

    doc.body.addEventListener('DOMAttrModified', bodyDOMAttrModified , false );
    doc.body.addEventListener('DOMCharacterDataModified', bodyDOMCharacterDataModified , false );
    doc.body.addEventListener('mousedown', adjustEditor , false );
    doc.body.addEventListener('keydown', bodyKeydown , false );
    doc.body.addEventListener('keyup', bodyKeydown , false );
    doc.body.addEventListener('keypress', bodyKeydown , false );
    doc.body.addEventListener('click', bodyKeydown , false );

    textarea[0].addEventListener('change', sourceDOMCharacterDataModified , false );
    
    adjustEditor();
    adjustSrc();
    
   // createButtons();
    
}

function bodyKeydown(e){
  adjustEditor();
}

function setHTML() {
  source = textarea.attr('value');

  _source = source.replace( /\n/g , '<br />');

  doc.body.innerHTML = _source;
  adjustEditor();
}
function setSource(){

  html = doc.body.innerHTML;

  if( html == '<br>' ) html = ''; 
  textarea.attr('value', html); 
  adjustSrc();
}


function adjustEditor() {
  iframe.style.width = '100%';
  if( doc.body.scrollHeight > 150 )
    iframe.style.height = doc.body.scrollHeight+'px';
  else 
    iframe.style.height = '150px';
}

function adjustSrc() {
  textarea[0].style.width = '100%';
  if( textarea[0].scrollHeight > 100 )
    textarea[0].style.height = textarea[0].scrollHeight+'px';
  else 
    textarea[0].style.height = '100px';
}

function getStyle( el , node ) {
  style = window.getComputedStyle( el ,'');
  if( node ) style = style[node];
  return style;
}

function bodyDOMAttrModified(e){

  lastEditLocation = 'editor'; 
  $(iframe).attr('modified',true);
  adjustEditor();

}

function bodyDOMCharacterDataModified(e){

  lastEditLocation = 'editor'; 
  $(iframe).attr('modified',true);
  adjustEditor();

}

function sourceDOMCharacterDataModified(e){

  lastEditLocation = 'source'; 

  adjustSrc();
  setHTML();
}

function clear( parent ) {
createDiv( parent , 'os_clear' );
}


function createButtons(){

  var source_toggle_btn = createToolbarButton( toolbar.container , Icons.source, 'menu');
  source_toggle_btn.setAttribute('title', 'toggle source view');

  var tw = new aTwoTab( iframe, textarea , source_toggle_btn );
  var commands = commands_str.split(' ');
  
  for(var i=0;i<commands.length;i++) {   
    if( commands[i] == '|') {
      sep = createDiv( toolbar.container , 'os_toolbaritem os_separator');
      sep.style.cssFloat = 'left'; 
    }
    else {
      c = commands[i].split('.'); 
      var bb = createCommandButton( toolbar.container , c[0] , c[1] );
      if( Commands[ c[0] ] )
        if( Commands[ c[0] ].tooltip )
            bb.setAttribute('title', Commands[ c[0] ].tooltip );
      
    }  
  }
  
  $( toolbar1[0] ).hide();
  
  var panel_toggle = function panel_toggle( e ) {
      $( toolbar1[0] ).slideToggle('fast');
  }
    
  var pane_toggle_btn = createToolbarButton( toolbar.container , 
  Icons.arrow_down, 'show more buttons', panel_toggle );
    pane_toggle_btn.setAttribute('title', 'show more buttons...');
  
  var sm = new FontFamilyMenu();
  sm.append( toolbar1.container );
  sm.addItemArray( font_families );
  sm.setLabel( 'Font family ');
  sm._commandname = 'fontname';
  sm.adjustMenuSize = true;
  sm.onvaluechange = execCommand;
  
  var fsm = new FontSizeMenu();
  fsm.append( toolbar1.container );
  fsm.setLabel( 'Font size ');
  for( var i=1;i<8;i++) {
    fsm.addItem3( i , "Size "+i, 'font-size:'+i*5+'pt;' );
  }
  fsm._commandname = 'fontsize';
  fsm.adjustMenuSize = true;
  fsm.onvaluechange = execCommand;
  
  var cm = new ColorMenu();
  cm.append( toolbar1.container );
  cm.setLabel( 'Font color ');
  cm._commandname = 'forecolor';
  cm.onvaluechange = execCommand;
  
  var bcm = new ColorMenu();
  bcm.append( toolbar1.container );
  bcm.setLabel( 'BG color ');
  bcm._commandname = 'hilitecolor';
  bcm.onvaluechange = execCommand;
  bcm.adjustMenuSize = false;
  
  var specialChars = new FontFamilyMenu();
  specialChars.append( toolbar1.container );
  specialChars.itemContainer.style.maxWidth = '300px';
  specialChars.menu.style.zIndex = '5';
  specialChars.adjustMenuSize = false;
  var _style = 'text-align: center; float: left; background: transparent; border: 1px dotted white; width: 20px; font-size: 10px;'
  
  for( var i=0; i<specialchars.length; i++) {
    s = specialchars[i];
    item = specialChars.addItem3( s[1] , s[1] , _style , s[0] , 'button' );
    $( item ).addClass( 'specialchar' );
  }
  
  addStyle( 'specialchar' , '.specialchar:hover{ background: white !important; }')
  
  specialChars.setLabel( 'character ');
  specialChars._commandname = 'insertspecialchar';
  specialChars.onvaluechange = execCommand;

  toolbar.container.appendChild( updatebar );

}

function addStyle( id , html ) {
  var st = document.getElementById( id );
  if( !st ) {
    var st = document.createElement('style');
    st.type = 'text/css';
    st.id = id;
    $('head')[0].appendChild( st );
  }
  
  st.innerHTML = html;
  
}

function createSimpleButton( parent , label , fn ) {
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.innerHTML = label;
  if(fn)btn.addEventListener('click',fn, false);
  parent.appendChild(btn);
  return btn;
}

function create( tag , parent , className ) {
  var div = document.createElement(tag);
  if(parent)parent.appendChild(div);
  if(className)div.className = className;
  return div;
}

function $create( tag , parent , className ) {
  dv = create( tag , parent , className );
  return $$( dv );
}
function $createDiv( parent , className ) {
  dv = createDiv( parent , className );
  return $$( dv );
}

function createDiv( parent , className ) {
  var div = document.createElement('div');
  if(parent)parent.appendChild(div);
  if(className)div.className = className;
  return div;
}

function createCommandButton( parent , commandname , commandtype ) {

    btn = createToolbarButton( parent , Icons[commandname] , commandname , execCommand);

  
  btn.setAttribute('_commandname' , commandname );
  btn.setAttribute('_commandtype' , commandtype );
  return btn;
}

function createToolbarButton( parent , icon , alt ,listener ) {
  var btn = createSimpleButton( parent , '' );
  btn.className = 'os_button'
  btn.style.cssFloat = 'left';
  if( icon )
    btn.innerHTML = '<img src="' + icon +'" />';
  else 
    btn.innerHTML = alt;
  if( listener )btn.addEventListener('click',listener,true);   
  return btn;
}




function setIcon( btn , icon ) {
  img = btn.getElementsByTagName('img')[0];
  if( !img ) {
    var img = create('img' , btn , '');
    img.src = icon; 
  }
  else {
    img.src = icon;
  } 
}



function $$$( parent , extend ) {
  var res = new Object();

  for( prop in parent )
    res[ prop ] = parent[ prop ]
    

  for( prop in extend ) {

    if( prop == "$" ) {
      for( property in extend['$'] ) {
        if( res[ property ] ) {
          res["_super_"+property] = res[ property ];
          res[ property ] = extend['$'][ property ];
        }
        else 
          res[ property ] = extend['$'][ property ];
      }
        
    }
    else
      res[ prop ] = extend[ prop ]
  }
  
  return res;
}


function SimpleMenu() {
  this.render();
}
SimpleMenu.prototype = {

  name : 'SimpleMenu',
  nodeName : "Menu",
  adjustMenuSize : true,
  
  render : function() {
  
    this[0] = createDiv( null , 'os_toolbaritem osColorMenu');
    this.topcontainer = createDiv( this[0] , 'topcontainer');
    
    
    this.menu = createDiv( this[0] , 'menu' );
    
    this.menu.style.display = 'none';
    this.menu.style.position = 'absolute';
    this.menu.style.padding = '5px'
    this.menu.style.backgroundColor = 'rgba(0,0,0,0.7)'
    this.menu.style.maxHeight = '350px';
    this.menu.style.oveflow = "scroll"
    
    this.$menu = $( this.menu );
    
    this.itemContainer = $createDiv( this.menu , 'itemcontainer' )
      .style( 'background:black;margin:5px;padding:2px;float:left;max-height: 300px;overflow:auto;' )
        .callback( this , 'mousedown' , this._itemSelected )
          .callback( this , 'mouseover' );
        
    this.itemPreview = $createDiv( this.menu , 'itempreview' )
      .style( 'float:right;margin:10px 10px 0px 0px;padding:2px;width:30px;height: 20px;' );
      
      $$( this.menu ).clear();
     
    this.label = $create( 'div' , this.topcontainer , 'label' )
        .style('float: left; margin: 2px; font-variant: small-caps; font-size: 11px;');
    
    this.valueBoxDiv = $create( 'div' , this.topcontainer , 'valueboxdiv' )
      .style('float:left; margin: 0px 3px 3px 3px;');
        
    this.valueBox = $create( 'input' , this.valueBoxDiv , 'valuebox' )
      .style('margin:2px 0px 0px 0px;padding:0px;color:black;font-size:10px;text-align:center;')
        .attr('disabled','true');
    
       
    this.dropBtn = $create( 'button' , this.topcontainer , 'dropbutton')
      .attr('type','button').setIcon( Icons.expand )
        .callback( this , 'mousedown' ).action("menutoggle");



  },
  

  
  setLabel : function( str ){
    this.label.text( str.toLowerCase() );
    return this;
  },
  
  append : function( parent ){
    parent.appendChild( this[0] )
  },
  
  
  addItemHash : function( obj ) {
    for( prop in obj ) {
      this.addItem( prop );
    }
  },
  
  addItem : function( family ) {
    var i = create( 'option' , this.itemContainer );

    i.setAttribute( 'style' , 'color: white; display: block; border-bottom: 1px dotted white; padding: 2px; margin: 2px;');
    i.setAttribute('_action','menuitem');
    i.className = 'font_menu_item'
    i.style.fontFamily = family;
    i.value = family;
    i.textContent = family;

    this.itemContainer.appendChild( i );
  },
  
  addItem3 : function( value , label , style , tooltip , tag ) {
   if( !tag )
    var i = create( 'option' , this.itemContainer );
    else 
    var i = create( tag , this.itemContainer );

    i.setAttribute( 'style' , 'color: white; display: block; border-bottom: 1px dotted white; padding: 2px; margin: 2px;');
    i.setAttribute('_action','menuitem');
    i.className = 'font_menu_item'

    i.value = value;
    i.innerHTML = label;
    
    $$( i ).style( style );

    if( tooltip ) i.title = tooltip;
    this.itemContainer.appendChild( i );
    return i;
  },
  
  addGray : function() {

    createDiv( this.itemContainer , 'os_clear' );

    
    var gray = 0; 
    while( gray < 255 ) {
      this.addItem( 'rgb('+gray+','+gray+','+gray+')' );
      gray+=10;      
    }
  },
  
  _itemSelected : function( e ) 
  {
    t = e.target;
      if( t.getAttribute('_action' ) == "menuitem" ) 
       if( t.value ) {
        this.changeValue( t.value );
        this.onvaluechange( { value : t.value , 
        target : this , type : 'valuechange', nativeEvent : e } );
    }
  },
  
  changeValue : function( value ) {
    this.valueBox[0].value= t.value;
          this.value = t.value;
          this.$menu.hide();

  },
  
  callbacks : function( e ) {
  
      targ = e.target;
      
      
      if( targ.getAttribute('_action' ) == "menutoggle" ) {
        if(this.adjustMenuSize)
          this.menu.style.width = this[0].scrollWidth + 'px';
          //this.$menu.toggle();
          if( this.menu.style.display == 'none')
            this.$menu.fadeIn('fast');
          else  
             this.$menu.fadeOut('fast');
      }
      

      if( targ.getAttribute('_action' ) == "coloritem" )
      {
      var c = targ.style.backgroundColor;
      
      if( e.type == 'mousedown') {
        
        this.valueBox[0].style.backgroundColor = c;
 
      }
      else if( e.type == 'mouseover' ) {
        
        this.itemPreview[0].style.backgroundColor = c;
      }  
    }

    
  },
  getAttribute : function( name ) {
      return this[ name ];
  },
  
  onvaluechange : function( event ) {},
  
  

}


function FontFamilyMenu() {
  this.render();
}
FontFamilyMenu.prototype = {

  
  addItemArray : function( array ) {
    for(i=0;i<array.length;i++)
      this.addItem( array[i] );
  }

}

$.extend( FontFamilyMenu.prototype, SimpleMenu.prototype );


function FontSizeMenu( bool ) {
this.render();
}
FontSizeMenu.prototype = 
$$$( FontFamilyMenu.prototype , {
  $ : {
    
    render : function() {
      this._super_render();

    }
  
  }
});









function ColorMenu() {
  this.name = 'ColorMenu';
  this._commandname = "forecolor";
  this._commandtype = '3';
  this.render();
  
  }
  
  ColorMenu.prototype = $$$( SimpleMenu.prototype , {
  
 
  
  itemHover : function( e ) {
  if( e.target.getAttribute('_action' ) == "menuitem" ) 
  this.itemPreview[0].style.backgroundColor = e.target.style.backgroundColor;
  },
  
  /*append : function( parent ){
    parent.appendChild( this[0] )
  },*/
  
  $ : { 
  
  render : function() {

      this._super_render();

        
    this.itemContainer.style('max-width:100px;')
    .callback( this , 'mouseover' , this.itemHover );
    
    this.addItemHash( web_named_colors );
    this.addGray();
  
  },
  
  addItem : function( color ) {
    var i = create( 'button' , this.itemContainer );
    i.type ='button';
    i.setAttribute( 'style' , 'width: 7px; height: 7px; border: 0px; padding:0px; margin: 1px; ');
    i.setAttribute('_action','menuitem')
    i.title = color;
    i.value = color;
    i.style.backgroundColor = color;
    this.itemContainer.appendChild( i );
    
    
  },
  
  changeValue : function( value ) {
    this._super_changeValue( value );
    this.valueBox[0].style.backgroundColor = value;
  }
  
  },
  
  addItemHash : function( obj ) {
    for( prop in obj ) {
      this.addItem( prop );
    }
  },
  
  addGray : function() {

    createDiv( this.itemContainer , 'os_clear' );

    
    var gray = 0; 
    while( gray < 255 ) {
      this.addItem( 'rgb('+gray+','+gray+','+gray+')' );
      gray+=10;      
    }
  }
  
});







function $$( el ) {
    var $el = $( el );
    
    $el.style = function( string ) {
      s = this[0].getAttribute('style');

      if( s ) ss = s+' '+string;
      else ss = string;

      this[0].setAttribute('style', ss);
      return this;
    }
    
    $el.callback = function( owner , type , fn ) {
        if( fn ) f = fn;
        else f = owner.callbacks;
        
        l = createListener( f , owner );
        this[0].addEventListener( type , l , false );
        return this;
    }
    
    $el.action = function( str ) {
      this[0].setAttribute('_action',str);
      return this;
    }
    
    $el.text = function( str ) {
      this[0].textContent=str;
      return this;
    }
    
    $el.appendChild = function( ch ) {
      this[0].appendChild( ch );
      return this;
    }
    
    $el.setIcon = function( icon ) {
        img = this[0].getElementsByTagName('img')[0];
        if( !img ) {
          var img = create('img' , this[0] , '');
          img.src = icon; 
        }
        else img.src = icon;
        
        return this;
    }
    
    $el.setX = function( x ) {
        w = this[0].scrollWidth;
        this[0].style.left = x + 'px';
        return this;
    }
    $el.setY = function( y ) {
        //h = this[0].scrollHeight;
        this[0].style.top = y + 'px';
        return this;
    }
    $el.setPos = function( x,y ) {
        this.setX( x );
        this.setY( y );
        return this;
    }
    $el.clear = function() {
      var dv= this[0].ownerDocument.createElement('div');
      dv.style.clear = 'both';
      $( this[0].lastChild ).after( dv );
      return this;
    }
       
    return $el;
}

function execCommand( e ) {


    var ctrl;  
      
    if( e.nativeEvent ) {
      ctrl = e.nativeEvent.ctrlKey;
    }
    else {
      ctrl = e.ctrlKey;
    }

    
    
    if( ctrl ) doc.execCommand('styleWithCSS',false, true);
    else doc.execCommand('styleWithCSS',false, false );
    
    
    var cname = e.target.getAttribute('_commandname');
    var ctype = e.target.getAttribute('_commandtype');


    if(cname) {
       
        
        if( e.target.nodeName == "Menu" ) {
          
          if( cname == "hilitecolor") {
            doc.execCommand('styleWithCSS',false, true);
            doc.execCommand(cname,false,e.value);
          }
            
          else if( cname =="insertspecialchar" ) {
            // sel = iframe.contentWindow.getSelection();
              
              //collapseSelection( true );
              doc.execCommand('inserthtml',false,e.value);
          }
          
          else {
            doc.execCommand(cname,false,e.value);
          }  
          
          
        }
        
        
        
    
        if( ctype == '0') {
          if( cname == 'createbox') {
            command_createBox();
          }
          else if( cname == "strikethrough" || cname == "subscript" 
          || cname == "superscript" ) {
            doc.execCommand('styleWithCSS',false, true);
            doc.execCommand(cname,false,null);
          }
          else if( cname == "indent" || cname.match('justify') ) {
            doc.execCommand('styleWithCSS',false, true);
            doc.execCommand(cname,false,null);
          }
          else if( cname == "outdent" ) {}
          else { 
            doc.execCommand(cname,false,null);
            }
        }
          
        else if( ctype == '1' ) {
            var prompt_label = Commands[cname].prompt_label;
            var data = prompt( prompt_label );
            if( data && data!="" ) doc.execCommand(cname,false,data);
         }
    
          sel = collapseSelection();
          //sel.getRangeAt(0).detach(); 
      }
    
    adjustEditor();
  
    
}

function command_createBox() {

}

function collapseSelection( end ) {
  var sel = iframe.contentWindow.getSelection();
  if( sel ) {
    if( end ) sel.collapseToEnd();
    else sel.collapseToStart();
    return sel;
    }
    else return null;
}




function aDiv( parent ) {
  this.render = function( parent ) {
    this[0] = createDiv( parent , 'aDiv');
    
    
    this.container = create('div',this[0],'container');
    this.clear = create('div',this.container,'os_clear');
    
    create('div',this[0],'os_clear');
  }
  this.appendChild = function( child ) {
    
    this.container.insertBefore(child, this.clear);
  }
  this.render( parent );
}

function aTwoTab( iframe , textarea , btn ){
    this.btn = btn;
    
    this.iframe = $( iframe );
    this.textarea = textarea;
    this[0] = this.iframe;
    this[1] = this.textarea;

    this.shown = 0;
    this.mode = 'editor';
    
    this.callbacks = function( e ) {
      
 
      if( this.mode == "editor") {       
        this.iframe.hide();
        setSource();
        if( mode == "forum") {
          showTextarea();
        }
        else {
          this.textarea.show();
        }
        adjustSrc();
        setIcon( btn , Icons.editor );
        this.mode = "source"
        current = "source";
      }
      else if( this.mode == "source") { 
        if( mode == "forum" ) {
          hideTextarea();
        }      
        else {
          this.textarea.hide();
        }
        setHTML();
        this.iframe.show();
        adjustEditor();
        setIcon( btn , Icons.source )
        this.mode = "editor"
        current = "editor";
      }
    }
    
    callback( btn , this , 'click' );
}

function callback( target , owner , type ) {

    target.addEventListener(type,createListener( owner.callbacks , owner ),false); 
}



function createListener( fn , scope ) {
  var newf = function( e ) {
    fn.call( scope, e );
  }
  return newf;
}

initialize();


//*********************************************************************//
//***************************AUTO-UPDATER******************************//
//**************************by psycadelik******************************//
//***************http://userscripts.org/scripts/show/22372*************//
//*********************************************************************//


//Initiate the download of the new script version.
function GetNewVersion(){
 var today = new Date();
 GM_setValue(gm_updateparam, String(today));
 window.location = source_location;
}

//Verify if it's time to update
function CheckForUpdate(){

 var today = new Date();
 var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds
 if (lastupdatecheck != "never") {
  today = today.getTime(); //Get today's date
  var lastupdatecheck = new Date(lastupdatecheck).getTime();
  var interval = (today - lastupdatecheck) / one_day; //Find out how much days have passed		
  //If a week has passed since the last update check, check if a new version is available
  if (interval >= 7) 
   CheckVersion();
 }
 else 
  CheckVersion();
}

//Make sure we don't have the latest version
function CheckVersion(){
 GM_xmlhttpRequest({
  method: 'GET',
  url: version_holder,
  headers: {
   'Content-type': 'application/x-www-form-urlencoded'
  },
  onload: function(responseDetails){
   var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9].[0-9]?[0-9]/));
   
   if (line != null) {
    var strSplit = new Array();
    strSplit = line.split('=');
    latest_version = strSplit[1];
    
    if (current_version != latest_version && latest_version != "undefined") {
     if (confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\r\nWould you like to get it now?")) 
      GetNewVersion();
     else 
      AskForReminder();
    }
    else 
     if (current_version == latest_version) 
      //alert("You have the latest version of " + script_title + ".");
      var str = "You have the latest version of " + script_title + ".";
      updatebar.textContent = str;
   }
   else {
    alert("Could not locate the version holder file.\r\nThis should be reported to the script author.\r\nThank you!");
    SkipWeeklyUpdateCheck();
   }
   
  }
 });
}

//Ask the user to be reminded in 24 hours or only next week.
function AskForReminder(){
 if (confirm("Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded next week only)")) {
  var today = new Date();
  today = today.getTime();
  var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
  var sda_ms = today - sixdays_ms;
  var sixdaysago = new Date(sda_ms)
  
  //Since we check for updates after 7 days, just make it seem like the last check was 6 days ago.
  GM_setValue(gm_updateparam, String(sixdaysago));
 }
 else 
  SkipWeeklyUpdateCheck();
}

//Set the next update check in seven days
function SkipWeeklyUpdateCheck(){
 var today = new Date();
 //As if we've just updated the script, the next check will only be next week.
 GM_setValue(gm_updateparam, String(today));
}

//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================

