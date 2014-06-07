// ==UserScript==
// @name           GoR BoTTols
// @version        3.2
// @namespace      Ulmi
// @description    GoR BoTTols (Bot+Tools) for Glory Of Rome
// @resource 	   URL_CASTLE_BUT 		http://i.imgur.com/MPlZr.png
// @resource 	   URL_CASTLE_BUT_SEL 		http://i.imgur.com/XWR4B.png
// @include        *gloryofrome*/*gameChrome_src.php*
// @include		   *gloryofrome*/*iframeCanvas.php*
// @include		   *gloryofrome*
// @include 	   *facebook.com/4oh4.php
// @include		   *facebook.com/dialog/feed*
// @icon           http://www.kocbottols.tiestoale.com/Tools/Addon/Icon.jpg
// @resource       smileys http://www.kocbottols.tiestoale.com/Tools/Addon/smileys.js

// @grant       GM_getValue
// @grant		unsafeWindow
// @grant		GM_deleteValue
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @grant       GM_registerMenuCommand
// @grant		GM_getResourceText
// @grant 		GM_getMetadata
// ==/UserScript==

(function() {
var Version = '3.2';
var Autore = 'ULMI';
var ScriptName = 'GoR BoTTols';
var miseajour=ScriptName+" "+Version +" - by "+Autore;
var sitesupport="http://gpt.tiestoale.com";
var pubblicity="<iframe src=http://kocbottols.tiestoale.com/Pubblicita/Tools.php width=320 marginwidth=0 marginheight=0 height=50 scrolling=no frameborder=0></iframe>";
var pubblicityQuadrato="<iframe src=http://kocbottols.tiestoale.com/Pubblicita/ToolsQuadrato.php width=300 marginwidth=0 marginheight=0 height=250 scrolling=no frameborder=0></iframe>";
var DISABLE_BULKADD_LIST = false;
var DEBUG_TRACE = true;
var SWF_PLAYER_URL = "http://ddflux.org/includes/miniplayer.swf";
var URL_CASTLE_BUT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAMAAAGkBsQ5AAABa1BMVEX%2F%2F8X%2F98X%2F973%2F97X%2F77X%2F7633773%2F76X377X3763%2F5q3%2F5qX%2F5pz35q335qX%2F3pz%2F3pT33pz%2F1pT%2F1oz%2F1oT31pT31oz%2FzoT%2Fznv3zoT%2FxXv%2FxXP%2FxWv3xXv3xXP%2FvWv%2FvWP3vWv3vWP%2FtWP%2FtVr%2FtVLmvWv3tWP3tVr3tVL%2FrVL%2FrUrmtWP3rVL3rUrvrVL%2FpUrvrUr%2FpULmrVrmrVL3pUr3pULmpUL3nDrepULWpVLWpUrmnDrFpUK1pVrOnDqcnFKcnEqMnEp7lHN7lGtzlGNrlGtjjEpajFpShFJSe2NChEJKe1o6hDohjDFCc1oZjDEhhDEQjDEAlDEpezoZhDEhezoQhDEAjDEpczoZezoIhDEhc0IhczoAhDEZczoIezEhazoAezEhY0IAczEAcykIazEhWkIAazEAaykIYzEhUkIAYzEAWjEAUjEAUikASjEASikAQjEAQikAOjEAOikAMTEAMSkAKSlOGAcLAAAACXBIWXMAAAsSAAALEgHS3X78AAABVklEQVQYGQXBPW4TYRiF0ee%2B3x2DRSxRIFJTGIkVUFDQIbEDlkE5%2B8kWWEKKIBSB5AohXBGUSAaCIdgz3x%2FnaARztjS3RSPodPkmfuzReLbOh1fm72a4h3kxyWgE8NXPz8%2F%2FhC%2FzRXLM3cmeqvGDl7Mfa9ztT9pvp3%2FDOpjOr7Yft9PXjPHxE%2Bl6p4SJqSq5RsL4EAtZaUAjAABoBADAt%2Fty8ovVnhQ%2Bfx%2BbDTfXQ9Bz5H7IdWGV9k588NJWrQiXjMkdly6Fo9beRap29F4QJBxTE%2Bo9bF7XuUpJsp8BAGjcATSgADOQWRsfLu8WT0%2B33wcePknfJj%2B6j3Hb17m5HQsr1%2Fm4aGBEbtp8uXPWzcSBlhYYXKunObLoOyU1jFH02oVRZNFJQ2CCko26MIrC3MAEpRdcSVkYFYzBuaAuQFFAgzFBK0GVZhYoaUYYVm8b0IAGNDr8B8ZXpEbZNGQ6AAAAAElFTkSuQmCC"; var TESTBAO=-1;try{TESTBAO=GM_info.script.description,TESTBAO=TESTBAO.toString().indexOf("GoR BoTTols"),-1<TESTBAO&&(TESTBAO=GM_info.script.name,TESTBAO=TESTBAO.toString().indexOf("GoR BoTTols"))}catch(e$$10){}try{TESTBAO=GM_getMetadata("description"),TESTBAO=TESTBAO.toString().indexOf("GoR BoTTols"),-1<TESTBAO&&(TESTBAO=GM_getMetadata("name"),TESTBAO=TESTBAO.toString().indexOf("GoR BoTTols"))}catch(e$$11){}-1<TESTBAO&&(TESTBAO=sitesupport,TESTBAO=TESTBAO.toString().indexOf("gpt.tiestoale"));
var URL_CASTLE_BUT_SEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXAgMAAAHuttyYAAAACVBMVEX%2F%2F%2F8AOjEAKSnbo5E5AAAACXBIWXMAAAsSAAALEgHS3X78AAAAW0lEQVQI12NYwdAAhCsYOICwQQGEpiYwrGpgCHRgcIChUAeGqaERDBMZJRgmMCDwqlUrgHgBQ2hoAIMjiwAYOzBgxyA1ILVTQ4GggWEKK4MIK4JiYGAgiYKYAgBFlyWR9CCfyAAAAABJRU5ErkJggg%3D%3D";
var butON='<img width="12px" height="12px" align=middle src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAACB0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVi7kSokAAAAFnRFWHRDcmVhdGlvbiBUaW1lADExLzA1LzA33bqJ2wAAAq1JREFUeJxlk09oVFcUxn/3vskkqZoJGRMXTgQpCga0qZkUChEtFjFg6giuVDAgbaQroV2WGgUXXQiudJlVyDJpKRVKwYR0YXVqtNrUP1SSOMYRJpjJjJn3Zubc08Uzk4n94HDh8N1zzvcdjlFV6rHn75P7oqbhkqc26WET4oTAlTOBq6QDV774oufmX/V8U1+ge/bUuGdsaiHI8kYKCAKAh2UzzcS1hYqrTix8cvPEhgLfZq41TRXuPctVlxNz5cVawVZvCwDLUqjl4rKFZolmtr9t23X78zHfAvy2cmes/nOq9RAAM12jzOwZBbeeW/IKFE0p8W9TdgyA5OyZ3v2zp5V0j5Lu0ZHcT6qqyvTHugZ+3quqqiPZH2u8rVMHte3WgV7ru/KVhSBb6zwYHwhnXaqsO1UNfRrc9gWpyAEAilGfipErttk0dr15p/Fs/BgAFx7+AMBceZG51VDWhRdXQ07HAJQcQUQwFe0yyUdnNO3/A4D2pEPzfvmU/CafWCwGr8vkq0Vi29tY7p4Mnf/1I4g3sDkXISJOeB8GAx945KUIbQDRMLeGkgNA1GGrTl56WAAmC3+GY3YeXyfbMNbkTebuvts/iJOX3qavdh4VdR8GVJgrLzIYH+Dotj7y/gqPK/M02UbOt5/kWuc3oZEz3zEvWaz1UHF/mN3p48mqyt3n5hUAFzu+ZLhz6H+yAIYfX+fSkxvQ3kAkr4iTXqOq7LjTP76Kn1rywm0ctN0Mdw5xaGtvbezhJ9eZyqWhJYLFoL5MuP4HJ4yqcnj6XNPTSOZZ0ZQSyw2rYbvAwYqEL0CjhRYPG4CuSkbnS7v066f+hmNq//2zcZymilGfICKo0ZphxgdbEAQ34fofbDymesSm+/YiellFk1p1CVGHIBkxLu2Mfu+O3H9Yz/8PLFlkbIqvT3MAAAAASUVORK5CYII%3D" alt="ON">';
var butOFF='<img width="12px" height="12px" align=middle src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAACB0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVi7kSokAAAAFnRFWHRDcmVhdGlvbiBUaW1lADExLzA1LzA33bqJ2wAAAsFJREFUeJxlk09oVFcUxn/3zR9HaoJKgphMFGtCrH9alUTqRgWhJtDFjBRsNybURVWwFCqUUmgyghTcaKlLQXeiopOVIEhtNaDjaNVYiNXYjHGeDmhokpcw89677x4XL5lM7AeXezn3O98957scJSLU4unBzz+2PliSUdF4h0RjSaN9ghmnqGem75mZqb5PLuaGavmqVuD50a+yKhpPTT/K4dqjiO+FpGiMSMNKrJa1GLc8sPXC7fQCgUrhaeL1mRPPKoV/ks79wapgpG4pAIEzUY1ZLa2Y+uXFYMO2tu2Z3yoWgH2673xt8rLdKQA2Zh+wMfuAQOZj5uUIMl5Kcvf6eQD+/enrzuc/7JfcOiS3Dnlz5ayIiFxrQ+ZwZnV4ti+frfIGP2uXm7tbOy3tTByffpSrvtyQ7gVgxJ03yp21qWlvL/7OsBJrvIS45eNWpH75etceBaAh3QPAYOa7MNEu4BQLAIz9Esaa0j1MBGCVHbRlrbeMMc1zbs/1+eTSOVri8Hd6MwPdm1mk4E32HABr9qR4q0EZQ6B1c9Ron/ehlKIhAoEzSasACQBVvZ8Iwt34Gst4rq2iMQCm7v4BQPsXPfNfqcLVONuefSfkiFIY7dmRb9oau0TrtWZ6Etcu0JjuZdWuLqYmJzGjT7AWJVjx5UFW/XgKgN+/74XXL6iLxwkCk1NDB7o6As/Ne/kboZGH+/jwSP//2gLIn+wnfypDewL8+GK0DjqViPDXvu1Z89/blHk5AoC3ZSdrvu2n+dNd1bLzJ/t5dedPmmJQn4jjBjLQPeyllYjw8NdMwrt19ZmMl5KqNAaAY+CVD86sYXURaIqBisUpB1Icq5i2Q6O6smCYbnd/lDVGUtZ4CavsoIypGuZZMWZUBNF6oHvYWzhMtRjc0bLJoI4FYjq0MUnja/DdItq/h/Z/3jPsP67lvwOjGG1S8vVScQAAAABJRU5ErkJggg%3D%3D" alt="OFF">';
var URL_ALERT="data:image/gif;base64,R0lGODlhJQAcAOUBASEhGBgYMSEhISkhISkpISkpKTExKSMjOTk5MXMICHsICEJCOTc3QkpKSlJKSkpCUlpaWmNaUlpaY2tjY3tza3RzdIwQEJUQEKUQEK0QELUQEM0YGNoYGOcYGOchIecpKec5Oe9CQu9KSu9SUu9aWu9jY+9ra+97e4GBgZSMhJeUlK2llKWlpbW1tfeEhPeMjPeUlPecnMa9rca9tfetrfe9vdbGvcDAwN7Oxvfn3ufn5//n5//37/7+/AAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQBAgA/ACwAAAAAJQAcAAUG/sCfcEgsGo/IJJIE4oRML6UUybkortiMaco1cTQWRXh8zXCVJg8nE8Ziw+az8RTybDBit9sSlw9JIV9WV2RtYh9+QiWAgoZ6bok/JDAkG2x5eoYWiHIkMTshd5qYhFh+JTQ7dniPpKadMTUeGnhkrW1+kzGrj22OCn4mJy6Nb72EficmJLOsx3p+LovFvs/RJCJfv6Wu16FgedvQci4h37aY1WHRISAb4K2t7O7gttWQ5CEfluJ7eez72KBz9eqMCxMiOmgYlKChgoYOISY4w2JFDhwyUkxwsACBAQMEBggYCaCkyQEVpKjA0aNHjhkaOSJAUCCkyJICAOTMOaABNZIWK3i07MHDhgoKERx4rGnz5k6cAwaoKCJDxtCWOmaoqCDhAQMGB8KKFRvgQAAGENJCQCEEACH5BAECAD8ALAAAAAAlABwABQb+wJ9wSCwaj8gkkgTihEwvpRTJuSiu2IxpyjVxNBZFeHzNcJUmDycTxmLD5rPxFPJsMGK32xKXD0khX1ZXZG1iH35CJYCChnpuiT8kMCQbbHl6hhaIciQxOyF3mpiEWH4lNDt2eI+kpp0xNR4aeGStbX6TMauPbY4KfiYnLo1vvYR+JyYks6zHen4ui8W+z9EkIl+/pa7XoWB529ByLiHftpjVYdEhIBvgra3s7uC21ZDkIR+W4nt57PvYoHP16owLEyI6aBiUoKGChg4hJjjDYkUOHDJSTHCwAIEBAwQGCBgJoKTJARWkqMDRo0eOGRo5IkBQIKTIkgIA5Mw5oAE1khYreLTswcOGCgoRHHisafPmTpwDBqgowkLG0JY6ZqioIOEBAwYHwooVG+BAAAYQ0kJAIQQAIfkEAQIAPwAsAAAAACUAHAAFBv7An3BILBqPyGTSdYIpn0rTKEStjqDYH80kHZW8I9L0mkXSXC5TqSRVe0khUtlIi7leJhI3zQWPyHNCMTEvfCYxMGhpX2IugVp1Ly+JMDR1hFxqVI8xNTSSgzQ5njQwhWqNczQ1PHUwMas5OTiehHxTqjk8g7A1urKjdYu4ZTE4OaWWxzzMPKOYUiFznTihNMvNyHZugFirNaE12M61w9Jllpe9ujuz5ZrnWemvr6vttMKLm+iwky6vx3BYQoTmDzF5g9Bw6XXpVJcQIFQhOsHnBa9ECv9Q+SARBhc2ezLlefiBIzpJfUaIVPnlD4gQHzyowvMwjEExUzZ+4KAqjXVLKhrHgABRkoPRnifgwIRJtKRTD0Y3bMjSosUOHThYqEDBtYLXr14lQJDg4IEDFU9Y4ODRY0fWrSjATpgroS4ECGUbPJiQhEUPtmxxtIA7ocIECYftPsBbdsECBAhYFGFhoxlbrFrjGq7LmfODzwwkeJ2L9gcAOw%3D%3D";
var XX = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAstJREFUeNpskstrXWUUxX/7e9zHuadpbwbR0yagZKAIPmga0kEToUELKVVJrBMHBSUDQTuQ/geCCA6ETGt0EFCqkpKmLRaSNlUKgRKvoMU6KkgHUZtKvO97z/m2gyaXFFyTvVjs3xpsttyYeeX6+HsfHCWKoZuCBgiK7s4QQBXd8WIEW69z7fwXv3+4cuO0hAvz3a3ifietBqqKoIQQkKCgYadgtyRACEihwIGtLWY/+vRjV/vnYTfd/NMRMrTTJW3UMdYgufwjKMug2URDhjiHiqBAU4QnvRtyf928yYPf7hLqNcz+fsZu32H97Rlaq9eIygdIqzXMiSmOzn/F2jMHKYSMYAzN/jKddjNjNaJxyaGLoHu1dPgl/Qb0+5ePPZYvgl7y6A959H0vX5rtrlAToQYszUyzq9c2Kvh33+HE2o+9bG7kMFWgqkJNDSqCydSQZgZjLZuLF/nu5Mke8Mbn8z3/2QvPU/ypgjOWNBiyYBAEU/KO2DtKzpH4HJ2rV1k+e5a9Ov/6Kfp/+ZWkUCDa2Y+9xRowkXXsc47YWordDk9MTnJqbu6xgtmlZZKxMUyrxT7viZ0jdh5rDCb2nth7SqoUp6aYXFnpgV+fOdPzr66v03f8OLlOh9h74pzDWsFF5TJdBG23efHKlR7w7fg4ycYGt0NgdGEBgGOrq6wPDBDFMSUrmAdtTClJiJKEeGiInycmALg8Pc1z1SrDo6NElQp3zp0DYG1khIHhYaJDg5SSBOcd8vD0m41W0KKIIGlKs93GGkO+UCCIIKq063VaIdBXLCLeE4B+K3xy6/qCKw8e8v9mgoQUESFWBRHCniOWFAR99MaqYD15G2iLNNy9P+5uPn1kYhAxoAq6Qwn/IwEDGOF+5Vbj8t/bF+XZvDny1lODs335wsFqJ2SNVBEBK+AAawRrwIrgDOSs2Gqnu7147/6FSrO7/N8ASxJC+7t5hdYAAAAASUVORK5CYII=";
var DEFAULT_ALERT_SOUND_URL = 'http://www.kocbottols.tiestoale.com/Tools/Addon/Allarmi/RedAlert.mp3';
var IsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1; if (TESTBAO==-1) return false;

var Options = {
  HideTab:false,
  Lingua:0,
  ptWinIsOpen  : false,pbEveryEnable:false,pbEveryMins:60,
  ptWinDrag    : true,
  enableFoodWarnTchat: false,
  pbGoldEnable : false,
  foodWarnHours : 2,
  
  HideDaily:true,
  HideUpGor:true,
  
  BreakingNews : 0,
  
  pbChatOnRight: true,
  pbGoldHappy  : 75,
  pbRessTime:   15,
  EnableDelRep : false,
  EnableMesRep : false,
  DeleteRepEvr : 5,
  pbRessEnable:false,
  arPageFrom:1,
  arPageTo:4,
  srcMinLevel:1,
  Smiley:true,
  transportinterval:60,
  minwagons:5000,
  lasttransport:0,
  ColorsLeader:true,
  srcMaxLevel:10,
  filPuissance:0,
  filPuissanceMax:100000000,
  filfiltreAlliance:'',
   filfiltreJoueur:'',
  ptWinPos     : {},
  alertConfig  : {
  	aChat:true,
  	aChatScout:false,
  	aPrefix:"*** I am under attack !!! ***",
  	MonQG:true,
  	hq:"",
  	mytroops:false,
  },
  alertSound : {
    enabled:false,
    soundUrl:DEFAULT_ALERT_SOUND_URL,
    repeat:true,
    repeatDelay:10,
    playLength:20,
    volume:100,
    alarmActive:false,
    expireTime:0,
  },
  towerMarches : {},
  ChatLearder : true,
  Chuchoenabled:true,
  urlChucho:'http://www.universal-soundbank.com/mp3/sounds/735.mp3',
  Attackenabled:true,
  urlAttack:'http://www.universal-soundbank.com/mp3/sounds/217.mp3', 
  Spyenabled:true,
  urlSpy:'http://www.universal-soundbank.com/mp3/sounds/2376.mp3', 
  HelpRequest: true,
  DeleteRequest: false,
  DeleteRules:false,
  maxIdlePop:true,

  AutoAttack:{},
  AttackTime:{},
  AttackAuto: false,
  AttackTimer: 8,
  AttackTimer2: 1,
  AttackTimer3: 1,
  AttackCible1:false,
  AttackCible2:false,
  AttackCible3:false,
  AttackGen:false,
  AttackGenNiv:200,
  AttackTroops:{1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}},
  AttackTroopsB:{1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}},
  AttackTroopsC:{},
  spamconfig:{aspam:false,spamvert:"Type your spam here",spammins:"10",atime:10,spamstate:"a"},
  
  EnResearch : {},
  SelResearch : {},
  CityResearch : {},
  ActiveResearch : false,
  HelpResearch : false,
  
  Crestinterval:5,
  crestRunning:false,
  CrestEnergy:0,
  
  GlobalChat:true,
  AllianceChat:true,
  
  HeightTools:1110,
  WidthTools:760,
};
var GlobalOptions = {
  autoPublishGamePopups : true,
  autoPublishPrivacySetting : 80,
  autoPublishKDO: false, 
  autoPublishKDOWho: 0, 
  BOAutomateKDO: false,
  BOAutomateKDOsec: 10,
  BOAutomateKDOChoice: 1005,
  pbWatchdog:true,

};
var AutoAttack = {
	Attivo			:	false,
	AttackInterval 	:	20,
	Enable			:	{},
	Mode 			:	{},
	X				:	{},
	Y				:	{},	
	Multi			:	{},
	MultiCheck		:	[],
	Troops			:	{},
	LastCoord		:	{},
	AttackGen		:	false,
	AttackGenNiv	:	200,
	StopCity		:	false,
	
};

var TrainOptions = {
  Running   : false,
  list:{},
  listactif:{},
  timelauch:60,
  pourcpop:75,
  pourctot:100,
  unitemin:100,
};
var Colors = {
	ChatLeaders	:	'#C8C8C8',
	ChatVC		:	'#81EE81',
	ChatChancy	:	'#F8A151',
	ChatAtt		:	'#FF7D7D',
	ChatEcl		:	'#FFDD7D',
	ChatGlo		:	'#5C0E3A',
	ChatAll		:	'#679183',
};
var CrestOptions = {
  Running   	: 	false,
  CrestCity 	: 	0,
  RoundOne  	: 	false,
  RoundTwo  	: 	true,
  lastRoundTwo 	: 	0,
  active		:	true,
  X				:	0,
  Y				:	0,
  R1SOM			:	0,
  R1REC			:	0,
  R1CAL			:	0,
  R1CAV			:	0,
  R1LEG			:	0,
  R1SCO			:	0,
  R1CAR			:	0,
  R1CAP			:	0,
  R1CEN			:	0,
  R1ARI			:	0,
  R1BAL			:	0,
  R1BER			:	0,
  R1RAI			:	0,
  
  R2SOM			:	0,
  R2REC			:	0,
  R2CAL			:	0,
  R2CAV			:	0,
  R2LEG			:	0,
  R2SCO			:	0,
  R2CAR			:	0,
  R2CAP			:	0,
  R2CEN			:	0,
  R2ARI			:	0,
  R2BAL			:	0,
  R2BER			:	0,
  R2RAI			:	0,
};
var CrestData = new Array();
	function CrestFunc (Arr) {
	
		if (Arr == undefined)
			Arr = CrestOptions;

		this.Running 		=  	true;
  		this.CrestCity 		= 	Arr.CrestCity;
		this.RoundOne 		= 	Arr.RoundOne;
		this.RoundTwo 		= 	true;
		this.lastRoundTwo 	= 	0;
		this.active			=	true;
		this.X 				= 	Arr.X;
		this.Y 				= 	Arr.Y;
		this.R1SOM 			= 	Arr.R1SOM;
		this.R1REC 			= 	Arr.R1REC;
		this.R1CAL 			= 	Arr.R1CAL;
		this.R1CAV 			= 	Arr.R1CAV;
		this.R1LEG 			= 	Arr.R1LEG;
		this.R1SCO 			= 	Arr.R1SCO;
		this.R1CAR 			= 	Arr.R1CAR;
		this.R1CAP 			= 	Arr.R1CAP;
		this.R1CEN 			= 	Arr.R1CEN;
		this.R1ARI 			= 	Arr.R1ARI;
		this.R1BAL 			= 	Arr.R1BAL;
		this.R1BER 			= 	Arr.R1BER;
		this.R1RAI			=	Arr.R1RAI;
		
		this.R2SOM 			= 	Arr.R2SOM;
		this.R2REC 			= 	Arr.R2REC;
		this.R2CAL 			= 	Arr.R2CAL;
		this.R2CAV 			= 	Arr.R2CAV;
		this.R2LEG 			= 	Arr.R2LEG;
		this.R2SCO 			= 	Arr.R2SCO;
		this.R2CAR 			= 	Arr.R2CAR;
		this.R2CAP 			= 	Arr.R2CAP;
		this.R2CEN 			= 	Arr.R2CEN;
		this.R2ARI 			= 	Arr.R2ARI;
		this.R2BAL 			= 	Arr.R2BAL;
		this.R2BER 			= 	Arr.R2BER;
		this.R2RAI			=	Arr.R2RAI;
		
	};

var translateITAArray = {
	//Tools
		'Please support the GoR BoTTols by clicking the ads on the GoR BoTTols website from time to time':'Si prega di sostenere il GoR BoTTols cliccando gli annunci sul sito web GoR BoTTols di volta in volta',
		'Version':'Versione',
		'available':'disponibile',
		'Install':'Installa',
		'You must belong to an alliance in order to use this feature':'Devi appartenere a una alleanza per poter utilizzare questa funzione',
		'Translated by':'Tradotto da',
		'Reload':'Ricarica',
		'Set your city bunker':'Imposta la tua città bunker',
		'Collect':'Raccolta',
		'resources':'risorse',
		'now':'adesso',
	//Ricerche
		'Up to level':'Porta al livello',
	//Germania
		'City for scout/attack':'Città per perlustrazioni/attacchi',
		'You can not attack a member of your alliance':'Non puoi attaccare un membro della tua alleanza',
		'Wait':'Aspetta',
		'UPDATE':'AGGIORNA',
		'For':'Per',
		'Force Quit':'Uscita forzata',
		'FREE':'LIBERA',
		'Errors':'Errori',
		'Select all':'Seleziona tutto',
		'I suggest you refresh the page. Some data may not be real':'Ti consiglio di riaggiornare la pagina. Alcuni dati potrebbero essere non reali',
		'The attacks are many and may stop responding':'Gli attacchi sono tanti e potrebbero fermarsi',
		'Do you want to continue anyway':'Vuoi continuare lo stesso',
		'Recall':'Richiama',
	//Time
		'minutes':'minuti',
		'seconds':'secondi',
		'hours':'ore',
	// Diplomacy
		'None':'Nessuna',
		'Neutral':'Neutrale',
  		'Friendly':'Amichevole',
  		'Hostile':'Ostile',
  		'Unaligned':'Senza Ally',
  		'Friendly To Them':'Amichevoli Verso Loro',
  		'Friendly To You':'Amichevoli Verso Te',
  	//Position
 		'Chancellor':'Cancelliere',
  		'Vice Chancellor':'Vice Cancelliere',
  		'Officer':'Ufficiale',
	//Food Alert
		'My city':'La mia città',
		'is running out of food':'ha bisogno di cibo',
		'so please send some':'me ne invieresti un po\'',
		'Current stock':'Ne possiedo ancora',
	//Tower Alerts
		'was explored':'è stata esplorata',
		'The exploration seems to come from':'L\'esplorazione sembra provenire da',
		'Date':'Data',
		'DEFENDS':'DIFENDO',
   	  	'SANCTUARY':'SANTUARIO',
   	  	'ARRIVAL':'ARRIVANO',
   	  	'BUNKER':'BUNKER',
   	  	'MY TROOPS':'MIE TRUPPE',
   	//Apothecary
   		'Apothecary':'Herbarium',
   		'Revive':'Cura',
   	//Overview
   		'Joined on':'Giochi dal',
   		'Glory':'Gloria',
   		'Alliance':'Alleanza',
   		'World':'Mondo',
   		'TOTALS':'TOTALE',
   		'Population':'Popolazione', 
   	//Alliance Manager
   		'Alliance Manager':'Gestione Alleanza',
   		'Message Manager':'Gestione Messaggi',
   		'ALLIANCE INFO':'INFO ALLEANZA',
   		'MEMBERS INFO':'INFO MEMBRI',
   		'Sort By':'Ordina per',
   		'Founder':'Fondatore',
   		'Avatar':'Avatar',
   		'Name':'Nome',
   		'Position':'Posizione',
   		'Might':'Potere',
   		'Cities':'Città',
   		'Days in Position':'Giorni in posizione',
   		'Joined Date':'Gioca dal',
   		'Last Login':'Ultimo accesso',
   		'Actions':'Azioni',
   		'Get Info/Member':'Ottieni info/membri',
   		'Enter a message':'Inserisci il messaggio',
   		'Message by':'Messaggio da',
   		'Message sent to all the alliance by':'Messaggio inviato a tutta l\'alleanza da',
   		'Message sent to all officer by':'Messaggio inviato agli ufficiali da',
   		'Read members page':'Lettura membri pagina',
      	'Message send to':'Messaggio inviato a',
      	'Processing':'Eseguo',
      	'Remove Member':'Rimuovi Membro',
      	'Sorry, but this feature is only for official':'Scusa, ma questa funzione è solo per ufficiali',
      	'Do you really want to remove this user':'Vuoi davvero rimuovere questo utente',
   	//Search
   		'Type':'Tipo',	
   		'Barbarian camps':'Accampamenti barbari',
  	    'Cities':'Città',
  	    'City to start from':'Ricerca a partire da',
  	    'Distance':'Distanza',
  	    'from':'da',
  	    'to':'a',
  	    'Launch search':'Inizia la ricerca',
  	    'Cancel the search':'Ferma la ricerca',
  	    'SEARCH CANCELLED':'RICERCA CANCELLATA',
  	    'SEARCH FINISHED':'RICERCA FINITA',
  	    'Searching':'Ricerco',
  	    'The minimum distance cannot be lower than 0':'La distanza minima non può essere inferiore a 0',
    	'The distance has to be higher than 1':'La distanza deve essere superiore a 1',
    	'The maximum/minimum distance has been exceeded':'La massima/minima distanza è stata superata',
     	'The distance cannot be higher than 375':'La distanza non può essere superiore a 375',
     	'NOTE : WARNING, there is no limitation to the search, but this can have consequences on the performance of your browser':'NOTA : ATTENZIONE, non vi è alcuna limitazione alla ricerca, ma questo può avere conseguenze sulle prestazioni del browser',
     	'Hide option window':'Nascondi le opzioni',
     	'Research':'Ricerca',
     	'results':'risultati',
     	'Not found':'Non trovati',
     	'More info':'Più info',
     	'Source':'Da',
     	'Destination':'Destinazione',
     	'Fields':'Campi',
     	'Barbarian camp':'Campi barbari',
     	'Woods':'Foresta',
		'Grassland':'Prateria',
		'River':'Fiume',
		'Mountains':'Montagna',
		'Plains':'Pianura',
		'Hills':'Collina',
		'Non-occupied only':'Solo non occupate',
		'Sort by':'Ordina per',
		'free':'libera',
		'Filter':'Filtra',
		'All cities':'Tutte le città',
		'Hostile cities only':'Solo città ostili',
		'Misty cities only':'Solo città nascoste',
		'Allied cities only':'Solo città alleate',
		'Friendly cities only':'Solo città amiche',
		'Neutral cities only':'Solo città neutrali',
		'Cities with no alliance only':'Solo città senza ally',
		'Minimum':'Minima',
		'Maximum':'Massima',
		'content':'contenente',
		'Where do you want to save the coordinates':'Dove vuoi salvare queste coordinate',
		'Do you want to delete the existing coordinates before inserting these':'Vuoi eliminare le coordinate esistenti prima di inserire queste',
		'Yes':'Si',
		'No':'No',
	//Reassing
		'Not possible to send to same city':'Impossibile inviare nella stessa città',
    	'Impossible to':'Impossibile',
    	'with 0 troops':'con 0 truppe',
    	'wake up':'svegliati',
   		'more than':'oltre',
   		'troops at a time':'truppe alla volta',
   		'Succeeded':'Fatto',
   	//Transport
   		'Manual':'Manuale',
   		'Automatic':'Automatico',
   		'TRANSPORTING GOODS FROM CITY TO CITY':'TRASPORTO MERCI DA CITTÀ A CITTÀ',
   		'Quantity':'Quantità',
   		'Resource':'Risorsa',
   		'type':'tipo',
   		'Please put in the amount of troops you like to use':'Si prega di inserire la quantità di truppe che si desidera utilizzare',
   		'Please check the resource you want to transport':'Si prega di controllare la risorsa che si desidera trasportare',
   		'Send a transport every':'Invia un trasporto ogni',
   		'Send transport with a minimum of':'Invia un trasporto con un minimo di',
   		'ADD A TRANSPORT':'AGGIUNGI UN TRASPORTO',
   		'Available':'Disponibile',
   		'Estimate':'Stima',
   		'necessary':'necessarie',
   		'Keep':'Tieni',
   		'Show routes':'Mostra rotte',
   		'Add a route':'Aggiungi una rotta',
   		'the route':'la rotta',
   		'Edit':'Modifica',
   	//Crest
   		'Help':'Aiuto',
   		'See target':'Mostra bersagli',
   		'Add target':'Aggiungi bersaglio',
   		'Remove':'Rimuovi',
   		'Wave':'Onda',
   		'From':'Da',
   		'To':'Verso',
   		'Do not use the general with the energy below':"Non usare i generali con l'energia al di sotto di",
   	//Import-Export
   		'Import':'Importa',
   		'Export':'Esporta',
    //AutoAttack 2
    	'AUTOMATED ATTACKS':'ATTACCHI AUTOMATICI',
    	'ATTACK':'ATTACCA',
    	'Do not use the general with a level greater than':'Non utilizzare i generali con un livello superiore a',
    	'Record':'Registra',
    	'Delete':'Cancella',
    	'Last Attack':'Ultimo Attacco',
    	'Success':'Inviati',
    	'Select troops':'Seleziona truppe',
    	'CITY SET PARAMETERS':'PARAMETRI DELLE CITTÀ',
    //Marches
    	'INCOMING ATTACKS':'ATTACCHI IN ARRIVO',
    	'Target Coordinates':'Coordinate Obiettivo',
    	'Times':'Tempo',
    	'Attacker':'Attaccante',
    	'OUTGOING MARCHES':'MARCE IN USCITA',
    	'Status':'Stato',
    	'Coordinates':'Coordinate',
    	'RECEIVED REINFORCEMENTS':'RINFORZI RICEVUTI',
    	'City reinforcements':'Città rinforzata',
    //Reports
    	'CHECK ALLIANCE REPORTS':"MOSTRA I REPORT DELL'ALLEANZA",
    	'No reports found':'Nessun report trovato',
    	'Pages':'Pagine',
    	'pages':'pagine',
    	'Page':'Pag',
    	'of':'di',
    	'All reports':'Tutti i rapporti',
    	'Incoming attacks':'Attacchi in arrivo',
    	'Outgoing attacks':'Attacchi in uscita',
    	'Reinforcements':'Rinforzi',
    	'All reports':'Tutti i rapporti',
    	'My reports only':'Solo i miei rapporti',
    	'Delete all reports':'Cancella tutti i rapporti',
    	'Transport':'Trasporto',
        'Reinforce':'Rinforzo',
        'Attack':'Attacco',
		'unknown':'sconosciuto',
		'Wild':'Terra',
		'Target':'Bersaglio',
		'Victory':'Vittoria',
		'Defeat':'Disfatta',
		'Defender':'Difensore',
		'Number of tours':'Numero di turni',
		'No troops defending':'Nessuna truppa in difesa',
		'Killed':'Combattuto',
		'Survived':'Sopravv.',
		'Resources':'Risorse',
		'Building':'Costruzioni',
		'Technical':'Ricerche',
		'Amount':'Quantità',
		'Defending':'In difesa',
		'Results found':'Risultati trovati',
		'Objects found':'Oggetti trovati',
	//Player
		'Player':'Giocatore',
		'Search':'Cerca',
		'Minimum of 3 characters':'Minimo di 3 caratteri',
		'Results for':'Risultati per',
		'See members':'Mostra membri',
		'Diplomacy':'Diplomazia',
		'Players found':'Giocatori trovati',
		'Extra information':'Informazioni extra',
		'Population':'Popolazione',
		'Provinces':'Province',
   	//AutoAttack
   		'CONFIGURATION':'CONFIGURAZIONE',
   		'STATISTICS':'STATISTICHE',
   		'Time between attacks':'Tempo tra gli attacchi',
   		'Attack Mode':'Modalità di attacco',
   		'TROOPS':'TRUPPE',
   		'Reset all':'Cancella tutto',
   		'No coordinated inserted':'Nessuna coordinata inserita',
   		'Impossible to attack the coordinates':'Impossibile attaccare le coordinate',
   		'Groundhog coordinates':'Ricomincio le coordinate',
   		'City not activated':'Città non attivata',
   		'Send attack to':'Attacco inviato a',
   		'You do not have the troops necessary':'Non hai le truppe necessarie',
   		'You can not attack':'Non puoi attaccare',
   		'No general appointed':'Nessun generale nominato',
   		'No general available':'Nessun generale disponibile',
   		'Unknown error':'Errore sconosciuto',
   		'Disable the city in which the coordinates of end':'Disattiva la città in cui finiscono le coordinate',
   		'Disable the city':'Disabilito la città',
   	//Info
   		'TROOP INFO':'INFO TRUPPE',
   		'Troops':'Truppe',
   		'Glory':'Gloria',
   		'Life':'Vita',
   		'Attack':'Attacco',
   		'Defense':'Difesa',
   		'Speed':'Velocità',
   		'Range':'Portata',
   		'Load':'Carico',
   		'Upkeep':'Manutenzione',
   		'NEEDED MARKS TO GET NEW CITY':'SIGILLI NECESSARI PER LA COSTRUZIONE DI NUOVE CITTA\'',
   		'Requirements':'Requisiti',
   		'Your level':'Tuo livello',
   		'Cohorts':'Coorti',
   	//Spam
   		'GLOBAL chat':'Chat GLOBALE',
   		'ALLIANCE chat':'Chat ALLEANZA',
      	'OPTIONS':'OPZIONI',
   		'Post automatically every':'Invia il messaggio ogni',
		'Your spam message':'Il tuo messaggio',
	//Generals
		'Name':'Nome',
		'Energy':'Energia',
		'Actions':'Azioni',
		'Request more energy':'Richiedi più energia',
		'Send offerings':'Invia offerte',
		'Outside the city':'Fuori città',
        'No general present':'Nessun generale presente',
	//Gifts
		'Pick a free gift to send to all your friends':'Seleziona un regalo da inviare ai tuoi amici',
		'SEND':'INVIA',
		'USE':'USA',
		'You have':'Ne hai',
		'Send offerings':'Invia offerte',
		'Accept all gifts':'Accetta tutti i regali',
   	//AutoTrain
   		'AUTO-BUILDING TROOPS':'AUTO-ADDESTRA TRUPPE', 
   		'Active':'Attivo',
   		'Deactive':'Disattivato',
   		'City':'Città',
   		'Troop type':'Tipo di truppa',
   		'Troops':'Truppe',
   		'Actions':'Azioni',
   		'seconds of training between the cities':'secondi di addestramento tra le città',
   		'Start at':'Inizia a',
   		'of the population available':'della popolazione disponibile',
   		'Use at':'Usa il',
   		'IF YOU GET ANY ERRORS, CHECK IF YOUR CITY HAS ENOUGH FOOD AND RESOURCES':'SE OTTIENI QUALCHE ERRORE, CONTROLLA SE LE TUE CITTÀ HANNO ABBASTANZA CIBO E/O RISORSE',
   		'Initiating training':'Avvio addestramento',
   		'Conditions not met':'Condizioni non soddisfatte',
   	//Train
   		'Max':'Max',
   		'Number of troops per slot':'Numero di truppe per slot',
   		'Number of slots':'Numero di slot',
   		'Queue':'Coda',
   		'barracks':'caserme',
   		'Cancel training':'Cancella addestramento',
   		'Number of troops per slot must be greater than':'Numero di truppe per slot deve essere maggiore di',
      	'Cannot train that many troops':'Non è possibile addestrare altre truppe',
      	'max is':'max è',
      	'total':'totale',
     	'Invalid number of slots':'Numero di slot invalido',
     	'Training succesful':'Addestramento completato',
     	'Formation':'Addestro',
	//Options
		'Options':'Opzioni',
		'Configuration of the':'Configurazione del',
		'Language':'Lingua',
		'Allow the toolbox window to be moved freely':'Abilita il movimento del tools con il mouse',
		'Dimensions Tools':'Dimensioni Tools',
		'Width':'Larghezza',
		'Height':'Altezza',
		'Refresh GoR every':'Ricarica GoR ogni',
		'Organize a Tax event (if happiness':'Organizza il Giorno delle Tasse (se la felicità è',
		'Auto-collect resources every':'Raccogli le risorse ogni',
		'Collect now':'Raccogli adesso',
		'Allow to publish your helpings automatically to Facebook':'Abilita la pubblicazione su facebook in automatico',
		'Everyone':'Tutti',
		'Friends of friends':'Amici di amici',
		'Friends only':'Solo amici',
		'Me only':'Solo io',
		'Show shortcut keys':'Mostra i tasti scorciatoia',
		'Hide useless keys of the game (Fan page, Discussions ..)':'Nascondi tasti inutili del gioco (Fan page, Discussioni ..)',
		'Receive automatically the daily requests':'Ricevi in automatico le richieste giornaliere',
		'Hide updates of':'Nascondi gli aggiornamenti di',
		'Configuration of chat':'Configurazioni della chat',
		'Move the chat window to the right of the game':'Muovi la chat nella parte della destra del gioco',
        'Allow to publish an alert in chat when your food level is low':'Abilita l\'auto post in chat in caso di mancanza di cibo',
        'Auto-click help requests, such as building help':'Auto-Clicca le richieste di aiuto, come le costruzioni',
        'Hide all help requests in chat':'Nascondi le richieste di aiuto in chat',
        'Hide the rules of the chat':'Nascondi le regole della chat',
        'Show smileys':'Mostra nella chat le faccine',
        'Open':'Apri',
		'Warning sound when receiving a whisper':'Avvisa con un suono quando ricevi un bisbiglio',
		'Enable audio in case of ATTACK (Alliance)':'Avvisa con un suono se un alleato viene attaccato',
		'Enable audio in case of SCOUT (Alliance)':'Avvisa con un suono se un alleato viene esplorato',
		'Table of colors':'Tavola dei colori',
		'Background of the global chat':'Colore della chat globale',
		'Background of the alliance chat':'Colore della chat alleanza',
		'Enable color for the leader':'Abilita colore per i leader',
		'Configuration of Reports':'Configurazione dei Report',
		'Enable the deletion of the reports of the':'Abilita la cancellazione dei report del',
		'Delete reports every':'Cancella i report ogni',
		'Enable the deletion of the message of the Kabam':'Abilita la cancellazione dei messaggi della Kabam',
		'Enable red background color in case of ATTACK (Alliance)':'Abilita lo sfondo rosso del msg se un alleato viene attaccato',
		'Sound file (URL MP3)':'File audio (URL MP3)',
        'Configuration of the Tower alert':'Configurazione della Torre di Allerta',
        'Allow to post scout alerts in chat':'Posta in chat alleanza gli avvisi di esplorazione',
        'Allow to post attack alerts in chat':'Posta in chat alleanza gli avvisi di attacco',
        'Allow to sound an alarm when under attack (handy when you are away from keyboard)':'Abilita un suono di allarme quando sei sotto attacco (utile quando si è lontani dalla tastiera)',
        'Message':'Messaggio',
        'Show the bunker':'Mostra il bunker',
        'Show my troops':'Mostra le mie truppe',
        'Loading the SWF player':'Caricamento del SWF player',
        'LOAD':'CARICA',
        'DEFAULT':'PREDEFINITO',
        'Repeat every':'Ripeti ogni',
        'Length of sounding alarm':'Lunghezza del file audio',
        'Tester':'Prova',
        'Stop Sound Alert':'Ferma Audio',
        'Error':'Errore',
        'Loaded':'Caricato',
		'':''
};
var translateNLArray = {
//Tools
'Please support the GoR BoTTols by clicking the ads on the GoR BoTTols website from time to time':'Support alsjeblieft GoR BoTTols door af en toe op de advertenties op de GoR BoTTols website te klikken',
'Version':'Versie',
'available':'Beschikbaar',
'Install':'Installeer',
'You must belong to an alliance in order to use this feature':'Je moet deel van een alliantie zijn om van deze functie gebruik te kunnen maken',
'Translated by':'Vertaald door',
'Reload':'Herladen',
'Set your city bunker':'Zet je stads bunker',
//Time
'minutes':'minuten',
'seconds':'seconden',
'hours':'uren',
// Diplomacy
'None':'Geen',
'Neutral':'Neutraal',
'Friendly':'Vriendelijk',
'Hostile':'Vijandig',
'Unaligned':'Zonder alliantie',
'Friendly To Them':'Vriendelijk naar hun',
'Friendly To You':'Vriendelijk naar jou',
//Position
'Chancellor':'Kanselier',
'Vice Chancellor':'Vice Kanselier',
'Officer':'Officier',
//Food Alert
'My city':'Mijn stad',
'is running out of food':'heeft een tekort aan voedsel',
'so please send some':'dus stuur me asjeblieft wat',
'Current stock':'Huidige voorraad',
//Tower Alerts
'was explored':'was verkend',
'The exploration seems to come from':'De verkenning lijkt te komen van',
'Date':'Data',
'DEFENDS':'VERDEDIGD',
'SANCTUARY':'VERDEDIGD NIET',
'ARRIVAL':'AANKOMST',
'BUNKER':'BUNKER',
'MY TROOPS':'MIJN TROEPEN',     
//Overview
'Joined on':'Aangemeld op',
'Glory':'Glorie',
'Alliance':'Alliantie',
'World':'Wereld',
'TOTALS':'TOTALEN',
'Population':'Populatie',
//Alliance Manager
 'Alliance Manager':'Alliantie Manager',
'Message Manager':'Berichten Manager',
'ALLIANCE INFO':'ALLIANTIE INFO',
'MEMBERS INFO':'LEDEN INFO',
'Sort By':'Sorteer op',
'Members':'Leden',
'Founder':'Stichter',
'Avatar':'Avatar',
'Name':'Naam',
'Position':'Positie',
'Might':'Glorie',
'Cities':'Steden',
'Days in Position':'Dagen in positie',
'Joined Date':'Datum Aangemeld',
'Last Login':'Laatste Inlog',
'Actions':'Acties',
'Get Info/Member':'Info leden verkrijgen',
'Enter a message':'Voer een bericht in',
'Message by':'Bericht van',
'Message sent to all the alliance by':'Bericht naar alle allianties gestuurd door',
'Message sent to all officer by':'Bericht naar alle officiers gestuurd door',
'Read members page':'Lees de leden pagina',
'Message send to':'Bericht gestuurd naar',
'Processing':'Processing',
'Remove Member':'Verwijder Lid',
'Sorry, but this feature is only for official':'Sorry, maar deze functie is alleen voor officieel gebruik',
'Do you really want to remove this user':'Wil je echt deze gebruiker verwijderen', //Search
 'Type':'Typ',   
 'Barbarian camps':'Barbaarse kampen',
'Cities':'Steden',
'City to start from':'Begin vanaf stad',
'Distance':'Afstand',
'from':'van',
'to':'naar',
'Launch search':'Zoektocht beginnen',
'Cancel the search':'Zoektocht annuleren',
'SEARCH CANCELLED':'ZOEKTOCHT GEANNULEERD',
'SEARCH FINISHED':'ZOEKTOCHT AFGELOPEN',
'Searching':'Zoeken',
'The minimum distance cannot be lower than 0':'De minimale afstand kan niet lager zijn dan 0',
'The distance has to be higher than 1':'De afstand moet groter zijn dan 1',
'The maximum/minimum distance has been exceeded':'De maximum/minimum afstand is overschreden',
'The distance cannot be higher than 375':'De afstand kan niet hoger zijn dan 375',
'NOTE : WARNING, there is no limitation to the search, but this can have consequences on the performance of your browser':'NOOT : ATTENTIE, er is geen limiet aan de zoektocht,maar het kan gevonden hebben voor de prestatie van je browser', 'Hide option window':'Optie window verschuilen',
'Research':'Onderzoeken',
'results':'resultaten',
'Not found':'Niet gevonden',
'More info':'Meer info',
'Source':'Bron',
'Destination':'Bestemming',
'Fields':'Velden',
'Barbarian camp':'Barbaarse kampen',
'Woods':'Wouden',
'Grassland':'Grasland',
'River':'Rivier',
'Mountains':'Bergen',
'Plains':'Vlakte',
'Hills':'Heuvels',
'Non-occupied only':'Alleen niet-bezette',
'Sort by':'Sorteer per',
'free':'Vrij',
'Filter':'Filter',
'All cities':'Alle steden',
'Hostile cities only':'Alleen vijandelijke steden',
'Misty cities only':'Alleen nevel steden',
'Allied cities only':'Alleen geallieerde steden',
'Friendly cities only':'Alleen vriendschappelijke steden',
'Neutral cities only':'Alleen neutrale steden',
'Cities with no alliance only':'Alleen niet geallieerde steden',
'Minimum':'Minimum',
'Maximum':'Maximum',
'content':'inhoud',
//Reassing
'Not possible to send to same city':'Niet mogelijk om naar de zelfde stad te sturen',
'Impossible to':'Niet mogelijk om',
'with 0 troops':'met 0 troepen',
'wake up':'wakker worden',
'more than':'meer dan',
'troops at a time':'troepen in een keer',
'Succeeded':'Succesvol',  
//Transport
 'Manual':'Handmatig',
'Automatic':'Automatisch',
'TRANSPORTING GOODS FROM CITY TO CITY':'GOEDEREN VERPLAATSEN VAN STAD NAAR STAD',
'Quantity':'Hoeveelheid',
'Resource':'Grondstof',
'type':'typ',
'Please put in the amount of troops you like to use':'Vul in hoeveel troepen je wilt gebruiken',
'Please check the resource you want to transport':'Controleer de grondstof die je wilt vervoeren',
'Send a transport every':'Stuur een transport iedere',
'Send transport with a minimum of':'Stuur een transport met een minimum van',
'ADD A TRANSPORT':'VOEG EEN TRANSPORT TOE',
'Available':'Beschikbaar',
'Estimate':'Inschatten',
'necessary':'noodzakelijk',
'Keep':'Houd',
'Show routes':'Vertoon routes',
'Add a route':'Voeg een route toe',
'the route':'de route',
'Edit':'Modificeer',
//AutoAttack 2
'AUTOMATED ATTACKS':'AUTOMATISCH AANVALLEN',
'ATTACK':'AANVALLEN',
'Do not use the general with a level greater than':'Geen generaal gebruiken met een hoger niveau dan',
'Record':'Aantekening',
'Delete':'Wissen',
'Last Attack':'Laatste aanval',
'Success':'Succes',
'Select troops':'Selecteer troepen',
'CITY SET PARAMETERS':'VASTE STAD PARAMETERS', 
//Marches
'INCOMING ATTACKS':'INKOMENDE AANVALLEN',
'Target Coordinates':'Doelwit coordinaten',
'Times':'Maal',
'Attacker':'Aanvaller',
'OUTGOING MARCHES':'UITGAANDE MARSEN',
'Status':'Status',
'Coordinates':'Coordinaten',
'RECEIVED REINFORCEMENTS':'VERSTERKINGEN ONTVANGEN',
'City reinforcements':'Stads versterkingen',
//Reports
'CHECK ALLIANCE REPORTS':"BEKIJK ALLIANTIE RAPPORTEN",
'No reports found':'Geen rapporten gevonden',
'Pages':'Paginas',
'pages':'paginas',
'Page':'Pagina',
'of':'van',
'All reports':'Alle rapporten',
'Incoming attacks':'Inkomende aanvallen',
'Outgoing attacks':'Uitgaande aanvallen',
'Reinforcements':'Versterkingen',
'All reports':'Alle rapporten',
'My reports only':'Alleen mijn rapporten',
'Delete all reports':'Alle rapporten wissen',
'Transport':'Transporten',
'Reinforce':'Versterken',
'Attack':'Aanvallen',
'unknown':'onbekend',
'Wild':'Woeste grond',
'Target':'Doelwit',
'Victory':'Victorie',
'Defeat':'Nederlaag',
'Defender':'Verdediger',
'Number of tours':'Aantal toertochten',
'No troops defending':'Geen troepen verdedigd',
'Killed':'Gedood',
'Survived':'Overleefd',
'Resources':'Grondstoffen',
'Building':'Gebouwen',
'Technical':'Onderzoek',
'Amount':'Hoeveelheid',
'Defending':'Verdedigen',
'Results found':'Gevonden resultaten',
'Objects found':'Voorwerpen gevonden',
//Player
'Player':'Speler',
'Search':'Zoeken',
'OR':'OF',
'Minimum of 3 characters':'Minimum van 3 tekens',
'Results for':'Resultaten voor',
'Rank':'Rang',
'See members':'Zie leden',
'Diplomacy':'Diplomatie',
'Players found':'Spelers gevonden',
'Extra information':'Extra informatie',
'Details':'Details',
'Population':'Populatie',
'Provinces':'Provincies',
'Profile':'Profiel',
//AutoAttack
 'CONFIGURATION':'CONFIGURATIE',
'STATISTICS':'STATISTIEKEN',
'Time between attacks':'Tijd tussen aanvallen',
'Attack Mode':'Aanvals Modus',
'AutoAttack stops when coordinates will be finished':'AutoAttack stopt wanneer de coordinaten zijn afgewerkt',
'Check Coordinates List':'Controlleer Coordinaten Lijst',
'Stop after':'Stop na',
'attacks':'aanvallen',
'Resume the attacks after':'Hervat de aanvallen na',
'Next attack':'Volgende aanval',
'do not be resumed':'niet worden hervat',
'Check cities you want to attack from':'Controlleer steden van waaruit je aan wilt vallen',   
 'TROOPS':'TROEPEN',
'valid coordinates found':'geldige coordinaten gevonden',
'No coordinated inserted':'Geen coordinaten ingevoerd',
'Do you really want to enable this tab':'Wil je echt deze tab aanzetten',   
//Info
'TROOP INFO':'TROEPEN INFO',
'Troops':'Troepen',
'Glory':'Glorie',
'Life':'Leven',
'Attack':'Aanval',
'Defense':'Verdediging',
'Speed':'Snelheid',
'Range':'Afstand',
'Load':'Lading',
'Upkeep':'Onderhoud',
'NEEDED MARKS TO GET NEW CITY':'BENODIGDE ZEGELS VOOR EEN NIEUWE STAD',
'Requirements':'Benodigheden',
'Your level':'Jouw niveau',
'Cohorts':'Cohorten',
//Spam
 'GLOBAL chat':'GLOBALE chat',
'ALLIANCE chat':'ALLIANTIE chat',
'OPTIONS':'OPTIES',
'Post automatically every':'Post automatisch iedere',
'Your spam message':'Jouw spam bericht',
//Generals
'Name':'Naam',
'Energy':'Energie',
'Actions':'Acties',
'Request more energy':'Verzoek meer energie',
'Send offerings':'Stuur offeringen',
'Outside the city':'Buiten de stad',
'No general present':'Geen generaal aanwezig',
//Gifts
'Pick a free gift to send to all your friends':'Selecteer een gratis geschenk om naar je vrienden te sturen',
'SEND':'STUUR',
'USE':'GEBRUIK',
'You have':'Je hebt',
'Send offerings':'Stuur offeringen',
'Accept all gifts':'Alle geschenken accepteren',   
//AutoTrain
 'AUTO-BUILDING TROOPS':'AUTO-BOUWEN TROEPEN',
'Active':'Actief',
'City':'Stad',
'Troop type':'Troepen type',
'Troops':'Troepen',
'Actions':'Acties',
'seconds of training between the cities':'seconden van de trainingstijd tussen de steden',
'Start at':'Begin vanaf',
'of the population available':'van de beschikbare populatie',
'Use at':'Gebruik op',
'IF YOU GET ANY ERRORS, CHECK IF YOUR CITY HAS ENOUGH FOOD AND RESOURCES':'CONTROLEER OF JE STAD GENOEG VOEDSEL EN GRONDSTOFFEN HEEFT IN HET GEVAL VAN EEN FOUTMELDING',
'Initiating training':'Begin training',
'Conditions not met':'Voorwaarden niet voldaan',
//Train
'Max':'Max',
'Number of troops per slot':'Hoeveelheid troepen per slot',
'Number of slots':'Hoeveelheid slots',
'Queue':'Wachtrij',
'barracks':'barrakken',
'Cancel training':'Training annuleren',
'Number of troops per slot must be greater than':'De hoeveelheid troepen in een slot  moet groter zijn dan',
'Cannot train that many troops':'Niet mogelijk die hoeveelheid troepen te trainen',
'max is':'max is',
'total':'totaal',
'Invalid number of slots':'Ongeldige hoeveelheid slots',
'Training succesful':'Training succesvol',
'Formation':'Formatie',
//Options
'Options':'Opties',
'Configuration of the':'Configuratie van de',
'Language':'Taal',
'Allow the toolbox window to be moved freely':'Sta de toolbox toe om vrijelijk beweegd te worden',
'Dimensions Tools':'Grootte Tools',
'Width':'Breed',
'Height':'Hoogte',
'Refresh GoR every':'Ververs GoR elke',
'Organize a Tax event (if happiness':'Organiseer een belastingdag (wanneer geluk',
'Auto-collect resources every':'Auto-verzamel grondstoffen elke',
'Allow to publish your helpings automatically to Facebook':'Sta toe om automatisch je hulp op Facebook te publiceren',
'Everyone':'Iedereen',
'Friends of friends':'Vrienden van vrienden',
'Friends only':'Alleen vrienden',
'Me only':'Alleen ik',
'Show shortcut keys':'Maak shortcut keys zichtbaar',
'Configuration of chat':'Configuratie van de chat',
'Move the chat window to the right of the game':'Verplaats de het chat venster naar de rechter kant van het spel',
'Allow to publish an alert in chat when your food level is low':'Sta toe een alert te publiceren waneer je voedsel voorraad laag is',
'Auto-click help requests, such as building help':'Auto-Click hulp verzoeken, zoals hulp met gebouwen',
'Hide all help requests in chat':'Verschuil al je hulp verzoeken in chat',
'Hide the rules of the chat':'Verschuil de chat regels',
'Show smileys':'Vertoon smileys',
'Open':'Open',
'Warning sound when receiving a whisper':'Waarschuwings toon wanneer je een fluister ontvangt',
'Enable audio in case of ATTACK (Alliance)':'Schakel audio aan in het geval van een AANVAL (Alliantie)',
'Enable audio in case of SCOUT (Alliance)':'Schakel audio aan in het geval van een VERKENNING (Alliantie)',
'Table of colors':'Kleuren tablet',
'Background of the global chat':'Achtergrond kleur van globale chat',
'Background of the alliance chat':'Achtergrond kleur van alliantie chat',
'Enable color for the leader':'Schakel kleur voor de leider aan',
'Configuration of Reports':'Configuratie Rapporten',
'Enable the deletion of the reports of the':'Schakel het wissen aan van de verslagen van de',
'Delete all reports':'Alle rapporten wissen',
'Enable the deletion of the message of the Kabam':'Schakel het wissen aan van de berichten van Kabam',
'Enable red background color in case of ATTACK (Alliance)':'Schakel rode achtergrond kleur aan in geval van een AANVAL (Alliantie)',
'Sound file (URL MP3)':'Sound file (URL MP3)',
'Configuration of the Tower alert':'Configuratie van de Wachttoren alert',
'Allow to post scout alerts in chat':'Sta toe om verkennings alerts in chat te posten',
'Allow to post attack alerts in chat':'Sta toe om aanvals alerts in chat te posten',
'Allow to sound an alarm when under attack (handy when you are away from keyboard)':'Sta toe een alarm toon te spelen waneer je onder aanval bent (handig waneer je niet bij je keyboard bent)',
'Message':'Bericht',
'Show the bunker':'Laat de bunker zien',
'Show my troops':'Laat mijn troepen zien',
'Loading the SWF player':'Laad de SWF player',
'LOAD':'LAAD',
'DEFAULT':'VERSTEK',
'Repeat every':'Herhaal elke',
'Length of sounding alarm':'Duratie van de alarm toon',
'Tester':'Tester',
'Stop Sound Alert':'Stop Alarm toon',
'Error':'Foutmelding',
'Loaded':'Geladen',
'':''
};
var translateTRArray = {
 //Tools
'Please support the GoR BoTTols by clicking the ads on theGoR BoTTols website from time to time':'L¸tfen zaman zaman Gor BoTTols\'a destek olmak iÁin web sayfam˝zdaki reklamlara t˝klay˝n˝z.',
'Version':'Versiyon',
'available':'Son',
'Install':'Y¸kleme',
'You must belong to an alliance in order to use thisfeature':'Bu ˆzellii kullanabilmek iÁin bir ittifaka ¸ye olman˝z gerekmektedir.',
'Translated by':'«eviren',
'Reload':'Yeniden y¸kle',
'Set your city bunker':'ﬁehrin s˝˝na˝n˝ ayarlay˝n',
//Time
'minutes':'dakika',
'seconds':'saniye',
'hours':'saat',
// Diplomacy
'None':'Yok',
'Neutral':'Nˆtr',
'Friendly':'Dost',
'Hostile':'D¸˛man',
'Unaligned':'Ittifaks˝z',
'Friendly To Them':'Onlara Dost',
'Friendly To You':'size Dost',
//Position
 'Chancellor':'Vali',
'Vice Chancellor':'Vali Yard˝mc˝s˝',
'Officer':'Memur',
//Food Alert
'My city':'ﬁehrimde',
'is running out of food':'yemek bitiyor',
'so please send some':'l¸tfen biraz gˆnderin.\'',
'Current stock':'ﬁuanki stok',
//Tower Alerts
'was explored':'ke˛if yedim',
'The exploration seems to come from':'L\'Ke˛if yapan ˛ehir koordinatlar˝',
'Date':'Tarih',
'DEFENDS':'DEFANS',
 'SANCTUARY':'KORUNACAK ﬁEH›R',
 'ARRIVAL':'VARIﬁ',
 'BUNKER':'BUNKER',
 'MY TROOPS':'ASKERLER›M',
 //Overview
 'Joined on':'Kat˝l',
 'Glory':'Glory',
 'Alliance':'›ttifak',
 'World':'D¸nya',
 'TOTALS':'TOPLAM',
 'Population':'N¸fus',
 //Alliance Manager
 'Alliance Manager':'›ttifak Yˆnetimi',
 'Message Manager':'Mesaj Yˆneticisi',
 'ALLIANCE INFO':'›ttifak Bilgileri',
 'MEMBERS INFO':'‹ye Bilgileri',
 'Sort By':'S˝rala',
 'Members':'‹yeler',
 'Founder':'Kurucu',
 'Avatar':'Avatar',
 'Name':'›sim',
 'Position':'Pozisyon',
 'Might':'›hti˛am',
 'Cities':'ﬁehirler',
 'Days in Position':'Ayn˝ s˝radaki g¸n say˝s˝',
 'Joined Date':'kat˝l˝m tarihi',
 'Last Login':'Son Giri˛',
 'Actions':'›˛lem',
 'Get Info/Member':'Bilgi/‹ye Al',
 'Enter a message':'Mesaj Yaz˝n',
 'Message by':'Mesaj˝ gˆnderen:',
 'Message sent to all the alliance by':'B¸t¸n ›ttifaka mesaj gˆnderen;',
 'Message sent to all officer by':'B¸t¸n memurlara mesaj gˆnderen;',
 'Read members page':'‹ye sayfas˝n˝ oku',
'Message send to':'Mesaj gˆnderilen ki˛i:',
'Processing':'›˛leniyor',
'Remove Member':'‹yeyi «˝kart',
'Sorry, but this feature is only for official':'‹zg¸n¸z ama bu ˆzellii kullama yetkiniz yok',
'Do you really want to remove this user':'Bu ¸yeyi gerÁekten Á˝kartmak istiyormusun',
 //Search
 'Type':'Tip',
 'Barbarian camps':'Barbar kamplar˝',
'Cities':'ﬁehirler',
'City to start from':'Merkez Koordinat',
'Distance':'Mesafe',
'from':'burdan',
'to':'Buraya',
'Launch search':'Aramay˝ Ba˛lat',
'Cancel the search':'Aramay˝ ›ptal Et',
'SEARCH CANCELLED':'ARAMA ›PTAL ED›LD›',
'SEARCH FINISHED':'ARABA B›TT›',
'Searching':'Ar˝yor',
'The minimum distance cannot be lower than 0':'En d¸˛¸k mesafe 0 dan k¸Á¸k olamaz',
'The distance has to be higher than 1':'Mesafe 1 den b¸y¸k olmal˝d˝r',
'The maximum/minimum distance has been exceeded':'Maksimum/minumum mesafe a˛˝ld˝',
 'The distance cannot be higher than 375':'Mesafe 375 den daha b¸y¸k olamaz',
 'NOTE : WARNING, there is no limitation to the search, butthis can have consequences on the performance of your browser':'NOT:UYARI, arama iÁin bir s˝n˝rlama yoktur fakat taray˝c˝n˝z˝n performans˝n˝ d¸˛¸rebilir ve yava˛latabilir.',
 'Hide option window':'Ayar penceresini gizle',
 'Research':'Tekrar Ara',
 'results':'sonuÁlar',
 'Not found':'Bulunamad˝',
 'More info':'Daha fazla bilgi',
 'Source':'Kaynak',
 'Destination':'Hedef',
 'Fields':'Bozk˝r Tipi',
 'Barbarian camp':'Barbar Kamp˝',
 'Woods':'Koruluk',
'Grassland':'Otlak',
'River':'Irmak',
'Mountains':'Da',
'Plains':'Ova',
'Hills':'Tepeler',
'Non-occupied only':'Sadece fethedilmemi˛',
'Sort by':'S˝rala',
'free':'Bo˛',
'Filter':'Filtrele',
'All cities':'B¸t¸n ﬁehirler',
'Hostile cities only':'D¸˛man ﬁehirler',
'Misty cities only':'Misty ˛ehirler',
'Allied cities only':'›ttifak ﬁehirleri',
'Friendly cities only':'Dost ﬁehirler',
'Neutral cities only':'Nˆtr ﬁehirler',
'Cities with no alliance only':'›ttifaks˝z ﬁehirler',
'Minimum':'Minimum',
'Maximum':'Maksimum',
'content':'content',
//Reassing
'Not possible to send to same city':'Ayn˝ ˛ehre gˆndermek m¸mk¸n deil',
'Impossible to':'M¸mk¸n deil',
'with 0 troops':'0 birlik ile',
'wake up':'uyan',
 'more than':'daha fazla',
 'troops at a time':'ayn˝ anda birlik',
 'Succeeded':'Ba˛ar˝l˝',
 //Transport
 'Manual':'Manual',
 'Automatic':'Otomatik',
 'TRANSPORTING GOODS FROM CITY TO CITY':'B›R ﬁEH›RDEN D›–ER›NE MALZEME NAKL›',
 'Quantity':'Adet',
 'Resource':'Kaynak',
 'type':'tip',
 'Please put in the amount of troops you like to use':'Kullanmak istediiniz birlik say˝s˝n˝ seÁin',
 'Please check the resource you want to transport':'nakil etmek istediiniz kaynaklar˝ seÁin',
 'Send a transport every':'Nakil yapma zaman aral˝˝',
 'Send transport with a minimum of':'Nakli yapacan en az birlik say˝s˝',
 'ADD A TRANSPORT':'NAK›L EKLEY›N',
 'Available':'m¸mk¸n',
 'Estimate':'Tahmini',
 'necessary':'gerekli',
 'Keep':'sakla',
 'Show routes':'Rotay˝ gˆster',
 'Add a route':'rota ekle',
 'the route':'Rota',
 'Edit':'D¸zenle',
//AutoAttack 2
'AUTOMATED ATTACKS':'OTOMAT›K SALDIRI',
'ATTACK':'SALDIRI',
'Do not use the general with a level greater than':'Bu seviyeden y¸ksek generalleri kullanma',
'Record':'Kay˝t Et',
'Delete':'Sil',
'Last Attack':'Son Sald˝r˝',
'Success':'Ba˛ar˝l˝',
'Select troops':'Birlik SeÁ',
'CITY SET PARAMETERS':'ﬁEH›R PARAMETRE AYARLARI',
//Marches
'INCOMING ATTACKS':'GELEN SALDIRILAR',
'Target Coordinates':'Hedef Kordinatlar',
'Times':'Zaman',
'Attacker':'Sald˝ran',
'OUTGOING MARCHES':'ﬁEH›RLERDEN YAPILAN Y‹R‹Y‹ﬁLER',
'Status':'Durum',
'Coordinates':'Kordinatlar',
'RECEIVED REINFORCEMENTS':'ALINAN TAKV›YELER',
'City reinforcements':'ﬁehir Takviyeleri',
//Reports
'CHECK ALLIANCE REPORTS':"›TT›FAK RAPORLARINI KONTROL ET",
'No reports found':'Rapor bulunamad˝',
'Pages':'Sayfalar',
'pages':'sayfalar',
'Page':'Sayfa',
'of':'',
'All reports':'B¸t¸n Raporlar',
'Incoming attacks':'Gelen Sald˝r˝lar',
'Outgoing attacks':'Giden Sald˝r˝lar',
'Reinforcements':'Takviyeler',
'All reports':'B¸t¸n Raporlar',
'My reports only':'Sadece Benim Raporlar˝m',
'Delete all reports':'b¸t¸n Raporlar˝ Sil',
'Transport':'Nakil',
'Reinforce':'Takviye Et',
'Attack':'Sald˝r',
'unknown':'Bilinmiyor',
'Wild':'Bozk˝r',
'Target':'Hedef',
'Victory':'Zafer',
'Defeat':'Malup',
'Defender':'Savunan',
'Number of tours':'Tur say˝s˝',
'No troops defending':'Savunan birlik yok',
'Killed':'÷ld¸r¸len',
'Survived':'Kurtulan',
'Resources':'Kaynak',
'Building':'Yap˝lar',
'Technical':'Teknik',
'Amount':'Miktar',
'Defending':'Savunuyor',
'Results found':'Bulunan SonuÁlar',
'Objects found':'Bulunan Objeler',
//Player
'Player':'Uyuncu',
'Search':'Arama',
'OR':'YADA',
'Minimum of 3 characters':'En az 3 Harf',
'Results for':'SonuÁ',
'Rank':'Seviye',
'See members':'‹yeleri Gˆr',
'Diplomacy':'Diplomasi',
'Players found':'Bulunan Oyuncular',
'Extra information':'›lave Bilgiler',
'Details':'Detay',
'Population':'Nufus',
'Provinces':'Eyaletler',
'Profile':'Profil',
 //AutoAttack
 'CONFIGURATION':'AYARLAR',
 'STATISTICS':'›STAT›ST›KLER',
 'Time between attacks':'›ki sald˝r˝ aras˝ndaki zaman',
 'Attack Mode':'Sald˝r˝ Modu',
 'AutoAttack stops when coordinates will be finished':'Kordinatlar bittii zaman otomatik sald˝r˝lar˝ durdur',
 'Check Coordinates List':'Kordinat listesini kontrol et',
 'Stop after':'Dur',
 'attacks':'sald˝r˝ sonra',
 'Resume the attacks after':'Sald˝r˝lara kald˝˝ yerden devam edilecek s¸re',
 'Next attack':'Sonraki sald˝r˝',
 'do not be resumed':'kald˝˝ yerden devam etmeyecek',
 'Check cities you want to attack from':'Sald˝r˝ yap˝lacak ˛ehri seÁin',
 'TROOPS':'B›RL›KLER',
 'valid coordinates found':'geÁerli kordinat bulundu',
 'No coordinated inserted':'Kordinat girilmedi',
 'Do you really want to enable this tab':'Bu ˆzellii aktif etmek istiyormusunuz',
 //Info
 'TROOP INFO':'B›RL›K B›LG›LER›',
 'Troops':'Birlikler',
 'Glory':'›hti˛am',
 'Life':'Hayat',
 'Attack':'Sald˝r˝',
 'Defense':'Savunma',
 'Speed':'H˝z',
 'Range':'Uzakl˝k',
 'Load':'Y¸k',
 'Upkeep':'Bak˝m',
 'NEEDED MARKS TO GET NEW CITY':'YEN› ﬁEH›R KURMAK ›«›N GEREKL› ﬁEH›RLER',
 'Requirements':'Gereksinimler',
 'Your level':'Senin seviyen',
 'Cohorts':'Kom˛ular',
 //Spam
 'GLOBAL chat':'K‹RESEL Sohbet',
 'ALLIANCE chat':'›TT›FAK Sohbet',
'OPTIONS':'AYARLAR',
 'Post automatically every':'Otomatik Yap˝˛t˝r',
'Your spam message':'Mesaj',
//Generals
'Name':'›sim',
'Energy':'Enerji',
'Actions':'›˛lem',
'Request more energy':'Enerji ›ste',
'Send offerings':'Adak Gˆnder',
'Outside the city':'ﬁehir d˝˛˝nda',
'No general present':'General yok',
//Gifts
'Pick a free gift to send to all your friends':'Arkada˛lar˝na gˆndemek iÁin hesiye seÁ',
'SEND':'G÷NDER',
'USE':'KULLAN',
'You have':'Sahip Olduun',
'Send offerings':'Adak Gˆnder',
'Accept all gifts':'B¸t¸n hediyeleri kabul et',
 //AutoTrain
 'AUTO-BUILDING TROOPS':'OTOMAT›K B›RL›K E–›T›M›',
 'Active':'Aktif et',
 'City':'ﬁehir',
 'Troop type':'birlik Tipi',
 'Troops':'Birlikler',
 'Actions':'›˛lem',
 'seconds of training between the cities':'ﬁehirler araas˝ eitim s¸resi',
 'Start at':'ﬁehir nufusu',
 'of the population available':'olduunda ba˛la',
 'Use at':'ﬁehir Nufusu',
 'IF YOU GET ANY ERRORS, CHECK IF YOUR CITY HAS ENOUGH FOODAND RESOURCES':'HARHANB›R HATA ALDI–INIZDA, ﬁEHR›N›ZDE YETERL› KAYNAK VE YEMEK OLDU–UNDAN EM›N OLUN.',
 'Initiating training':'eitim ba˛lat˝l˝yor',
 'Conditions not met':'Gereksinimler kar˛˝lanmad˝',
 //Train
 'Max':'Maks',
 'Number of troops per slot':'slot ba˛˝na birlik say˝s˝',
 'Number of slots':'Slot adetleri',
 'Queue':'S˝ra',
 'barracks':'k˝˛la',
 'Cancel training':'Eitimi iptal et',
 'Number of troops per slot must be greater than':'slot ba˛˝na maksimum birlik bu say˝dan b¸y¸k olmal˝d˝r',
'Cannot train that many troops':'okadar fazla birlik eitilemez',
'max is':'maksimum',
'total':'toolam',
 'Invalid number of slots':'Yanl˝˛ slot say˝s˝',
 'Training succesful':'Eitim ba˛ar˝l˝',
 'Formation':'D¸zen',
//Options
'Options':'Ayarlar',
'Configuration of the':'konfigurasyonu',
'Language':'Lisan',
'Allow the toolbox window to be moved freely':'Betik penceresinin hareket ettirilmesine m¸sade et',
'Dimensions Tools':'Betik Boyutlar˝',
'Width':'Geni˛lik',
'Height':'Y¸kseklik',
'Refresh GoR every':'Go',
'Organize a Tax event (if happiness':'Vergi g¸n¸ d¸zenle (mutluluk seviyesini ayarla',
'Auto-collect resources every':'Otomatik kaynak toplama s¸resini ayarla',
'Allow to publish your helpings automatically to Facebook':'Yard˝m isteklerini Facebook ta otomatik yay˝nla',
'Everyone':'Herkes',
'Friends of friends':'Arkada˛lar˝m˝n arkada˛lar˝',
'Friends only':'Arkada˛lar sadece',
'Me only':'Sadece Ben',
'Show shortcut keys':'K˝sayollar˝ gˆster',
'Configuration of chat':'Sohbet Ayarlar˝',
'Move the chat window to the right of the game':'Sohbet penceresinin oyunun sa˝na kayd˝r',
'Allow to publish an alert in chat when your food level islow':'Yemek seviyeniz d¸˛¸k olduunda sohbet penceresinde uyar˝ vermesine m¸sade et',
'Auto-click help requests, such as building help':'Yard˝m isteklerine otomatik yard˝m et',
'Hide all help requests in chat':'Sohbet penceresindeki yard˝m isteklerinin hepsini gizle',
'Hide the rules of the chat':'Sohbet kurallar˝n˝ gizle',
'Show smileys':'G¸l¸c¸kleri gˆster',
'Open':'AÁ',
'Warning sound when receiving a whisper':'Gizli pesaj ald˝˝nda uyar˝ sesi Áal',
'Enable audio in case of ATTACK (Alliance)':'Sald˝r˝ ald˝˝nda ittifak pencerinde gˆster',
'Enable audio in case of SCOUT (Alliance)':'Ke˛if yediinde ittifakpenceresinde gˆster',
'Table of colors':'Tablo renkleri',
'Background of the global chat':'K¸resel sohbetin arkaplan renkleri',
'Background of the alliance chat':'›ttifak sohbetin arkaplan renkleri',
'Enable color for the leader':'Valinin rengi',
'Configuration of Reports':'Rapor Ayarlar˝',
'Enable the deletion of the reports of the':'raporlar˝n otomatik silinmesi',
'Delete reports every':'Raporlar˝n silinme s¸resi',
'Enable the deletion of the message of the Kabam':'Kabamdan gelen mesajlar˝n otomatik silinmesi',
'Enable red background color in case of ATTACK(Alliance)':'Sald˝r˝ yediinde arkaplan˝n k˝rm˝z˝ olmas˝',
'Sound file (URL MP3)':'ses dosyas˝ (URL MP3)',
'Configuration of the Tower alert':'Kule uyar˝ ayarlar˝',
'Allow to post scout alerts in chat':'Ke˛if uyar˝lar˝ ittifak pencersinde gˆr¸ns¸n',
'Allow to post attack alerts in chat':'sald˝r˝ uyar˝lar˝ ittifak penceresinde gˆr¸ls¸n',
'Allow to sound an alarm when under attack (handy when youare away from keyboard)':'Sald˝r˝ ald˝˝n˝zda ses Áal˝nmas˝ aktif olsun(PC ba˛˝nda deilken faydal˝d˝r)',
'Message':'Mesaj',
'Show the bunker':'S˝˝na˝ gˆster',
'Show my troops':'Birliklerimi gˆster',
'Loading the SWF player':'SWF player y¸kleniyor',
'LOAD':'Y‹KL‹',
'DEFAULT':'DEFAULT',
'Repeat every':'Tekrarla',
'Length of sounding alarm':'Alarm Áalma s¸resi',
'Tester':'Test Et',
'Stop Sound Alert':'Alarm ˝ sustur',
'Error':'Hata',
'Loaded':'Y¸klendi',
'':''
};
var translateDKArray = {
//Tools
'Please support the GoR BoTTols by clicking the ads on the GoR BoTTols website from time to time':'St¯t venligst GoR BoTTols ved at bes¯ge reklamerne fra tid til tid',
'Version':'Version', 
'available':'tilgÊngelige',
'Install':'installer',
'You must belong to an alliance in order to use this feature':'Du skal vÊre med i en Alliance for at bruge denne funktion',
'Translated by':'Oversat af',
'Reload':'genindlÊs',
'Set your city bunker':'Set din byes bunker',
//Time
'minutes':'minutter',
'seconds':'sekunder',
'hours':'timer',
// Diplomacy
'None':'Ingen',
'Neutral':'Neutral',
  'Friendly':'Venner',
  'Hostile':'Fjender',
  'Unaligned':'Ingen alliance',
  'Friendly To Them':'Venner med dem',
  'Friendly To You':'Venner med dig',
 //Position
 'Chancellor':'Konge',
  'Vice Chancellor':'Vice konge',
  'Officer':'Officer',
//Food Alert
'My city':'Min by',
'is running out of food':'er ved at l¯be t¯r for mad',
'so please send some':'sÂ send venligst noget',
'Current stock':'Mit lager lige nu',
//Tower Alerts : UdsigtstÂrns advarsler
'was explored':'Var unders¯gt',
'The exploration seems to come from':'unders¯gelsen ligner den kom fra',
'Date':'Dato',
'DEFENDS':'Forsvarer','SANCTUARY':'I skjul','ARRIVAL':'Ankommer','BUNKER':'BUNKER','MY TROOPS':'Mine tropper',
  //Overview: Overblik
'Joined on':'Deltog d.',
'Glory':'Omd¯mme',
'Alliance':'Alliance',
'World':'Verden',
'TOTALS':'TOTALER',
'Population':'Befolkning',
  //Alliance Manager 
'Alliance Manager':'Alliance styring',
'Message Manager':'Besked Manager',
'ALLIANCE INFO':'Alliance information',
'MEMBERS INFO':'Medlemmers information',
'Sort By':'Sorter efter',
'Members':'Medlem',
'Founder':'GrundlÊgger',
'Avatar':'Billede',
'Name':'Navn',
'Position':'Title',
'Might':'Magt',
'Cities':'Byer',
'Days in Position':'Dage med i denne title',
'Joined Date':'Gioca dal',
'Last Login':'Sidste Login',
'Actions':'Muligheder',
'Get Info/Member':'Hent information / Medlem',
'Enter a message':'Skriv en besked',
'Message by':'Skrevet af',
'Message sent to all the alliance by':'Besked sendt til alle medlemmer af alliancen af',
'Message sent to all officer by':'Besked sendt til alle Officere af ',
'Read members page':'lÊs medlemmers side',
  'Message send to':'Besked sendt til',
  'Processing':'Arbejder',
  'Remove Member':'Fjern Medlem',
  'Sorry, but this feature is only for official':'Beklager, denne funktion er kun for officere',
  'Do you really want to remove this user':'Vil du virkelige fjerne denne bruger',
  //Search
'Type':'Type', 
'Barbarian camps':'Babar lejer',
  'Cities':'Byer',
  'City to start from':'By som der startes fra',
  'Distance':'afstand',
  'from':'fra',
  'to':'til',
  'Launch search':'begynd s¯gning',
  'Cancel the search':'stop s¯gning',
  'SEARCH CANCELLED':'SÿGNING STOPPET',
  'SEARCH FINISHED':'SÿGNING F∆RDIG',
  'Searching':'S¯ger',
  'The minimum distance cannot be lower than 0':'Afstanden kan ikke vÊre mindre end 0',
'The distance has to be higher than 1':'Afstasnden skal vÊre mere end 1',
'The maximum/minimum distance has been exceeded':'max / min afstanden er overskredet',
 'The distance cannot be higher than 375':'Afstanden kan ikke vÊre mere end 375',
 'NOTE : WARNING, there is no limitation to the search, but this can have consequences on the performance of your browser':'NOTA : Advarsel der er ikke nogen begrÊnsning pÂ s¯gningen, dette kan have konsekvÊnser for din browsers ydelse',
 'Hide option window':'Skjul options vinduet',
 'Research':'udvikler',
 'results':'Reslutat',
 'Not found':'ikke fundet',
 'More info':'Mere info',
 'Source':'Kilde',
 'Destination':'Distination',
 'Fields':'Marker',
 'Barbarian camp':'Barbar Lejre',
 'Woods':'Skov',
'Grassland':'GrÊsland',
'River':'Flod',
'Mountains':'Bjerg',
'Plains':'Mark',
'Hills':'Bakker',
'Non-occupied only':'Frie omrÂder',
'Sort by':'Sorteret efter',
'free':'Fri',
'Filter':'Filter',
'All cities':'Alle Byer',
'Hostile cities only':'Fjentlige byer',
'Misty cities only':'TÂgede byer',
'Allied cities only':'Allierede byer',
'Friendly cities only':'Venners byer',
'Neutral cities only':'Neutrale byer',
'Cities with no alliance only':'Byer uden alliancer',
'Minimum':'Minimun',
'Maximum':'Maximun',
'content':'indehold',
//Reassing
'Not possible to send to same city':'Ikke muligt at sende til denne by',
'Impossible to':'Ikke muligt at',
'with 0 troops':'med 0 tropper',
'wake up':'VÂgn op',
'more than':'Mere ind',
'troops at a time':'tropper pÂ dette tidspunkt',
'Succeeded':'SÂdan',
  //Transport
'Manual':'Manuel',
'Automatic':'Automatisk',
'TRANSPORTING GOODS FROM CITY TO CITY':'Transport fra en by til en anden',
'Quantity':'MÊngde',
'Resource':'RÂstoffer',
'type':'Type',
'Please put in the amount of troops you like to use':'Tast antallet af tropper du vil bruge',
'Please check the resource you want to transport':'hvilke rÂstoffer vil du flytte',
'Send a transport every':'Send hvert ',
'Send transport with a minimum of':'Send transport med min. af',
'ADD A TRANSPORT':'Tilf¯j transport',
'Available':'Disponible',
'Estimate':'Forventet',
'necessary':'n¯dvendige',
'Keep':'Behold',
'Show routes':'Vis router',
'Add a route':'tilf¯j router',
'the route':'ruten',
'Edit':'ret',
//AutoAttack 2
'AUTOMATED ATTACKS':'Auto Angrib',
'ATTACK':'Angrib',
'Do not use the general with a level greater than':'Brug ikke genaraler med h¯jere lv. end ',
'Record':'Gem',
'Delete':'Slet',
'Last Attack':'sidste angreb',
'Success':'succes',
'Select troops':'VÊlg tropper',
'CITY SET PARAMETERS':'Byens indstillinger',
//Marches
'INCOMING ATTACKS':'Du bliver angrebet',
'Target Coordinates':'MÂlets coordinater',
'Times':'tider',
'Attacker':'Angriber',
'OUTGOING MARCHES':'udgÂende tropper',
'Status':'status',
'Coordinates':'Coordinater',
'RECEIVED REINFORCEMENTS':'Modtaget forstÊrkninger',
'City reinforcements':'Byens forstÊrkninger',
//Reports
'CHECK ALLIANCE REPORTS':"Se alliancens raporter",
'No reports found':'ingen raporter fundet',
'Pages':'sider',
'pages':'sider',
'Page':'side',
'of':'af',
'All reports':'alle raporter',
'Incoming attacks':'indkommende angreb',
'Outgoing attacks':'udgÂende angreb',
'Reinforcements':'forstÊrkning',
'All reports':'Alle reporter',
'My reports only':'Kun mine reporter',
'Delete all reports':'Slet alle reporter',
'Transport':'transport',
'Reinforce':'forstÊrk',
'Attack':'angreb',
'unknown':'Ukendt',
'Wild':'Wildmark',
'Target':'MÂl',
'Victory':'Sejr',
'Defeat':'Nederlag',
'Defender':'Forslag',
'Number of tours':'nummere af omgange',
'No troops defending':'Ingen tropper forsvarer',
'Killed':'DrÊbt',
'Survived':'Overlevede',
'Resources':'RÂstoffer',
'Building':'Bygning',
'Technical':'Teknik',
'Amount':'Antal',
'Defending':'Forsvarer',
'Results found':'Resultat fundet',
'Objects found':'Muligheder fundet',
//Player
'Player':'Spiller',
'Search':'S¯g',
'OR':'Eller',
'Minimum of 3 characters':'minium 3 bokstaver',
'Results for':'Resultat for ',
'Rank':'rank',
'See members':'Se medlemmer',
'Diplomacy':'Diplomati',
'Players found':'spiller fundet',
'Extra information':'Extra information',
'Details':'Detaljer',
'Population':'befolkning',
'Provinces':'Delstat',
'Profile':'FB Profil',
  //AutoAttack
'CONFIGURATION':'OpsÊtning',
'STATISTICS':'Muligheder',
'Time between attacks':'tid mellem hvert angreb',
'Attack Mode':'Type af angreb',
'AutoAttack stops when coordinates will be finished':'Stop nÂr alle mÂl er fÊrdige',
'Check Coordinates List':'Check listen for gyldige coordinater',
'Stop after':'Stop efter',
'attacks':'Angrib',
'Resume the attacks after':'Genoptag angreb efter',
'Next attack':'nÊste angreb',
'do not be resumed':'Gentag ikke efter',
'Check cities you want to attack from':'Check de byer du vil angribe fra', 
'TROOPS':'tropper',
'valid coordinates found':'Gyldige cordinator fundet',
'No coordinated inserted':'Ingen coordinator er insat',
'Do you really want to enable this tab':'Vil du virkelige starte denne funktion',
  //Info
'TROOP INFO':'Troope information',
'Troops':'Tropper',
'Glory':'Omd¯mme',
'Life':'Liv',
'Attack':'Angreb',
'Defense':'forsvar',
'Speed':'Hastighed',
'Range':'rÊkkevidde',
'Load':'lasteevne',
'Upkeep':'vedligeholdelse',
'NEEDED MARKS TO GET NEW CITY':'Flag som beh¯ves for at fÂ ny by',
'Requirements':'krav',
'Your level':'din level',
'Cohorts':'Medspillere',
  //Spam
'GLOBAL chat':'global Chat',
'ALLIANCE chat':'Alliance chat',
  'OPTIONS':'Muligheder',
'Post automatically every':'skriv automatisk hvert',
'Your spam message':'Din spam besked',
//Generals
'Name':'navn',
'Energy':'Energy',
'Actions':'aktioner',
'Request more energy':'Bed om mere energy',
'Send offerings':'send offer',
'Outside the city':'uden for byen',
'No general present':'Ingen genaral hjemme',
//Gifts
'Pick a free gift to send to all your friends':'VÊlg en gratis gave og send den til dine venner',
'SEND':'Send',
'USE':'Brug',
'You have':'Du har',
'Send offerings':'send offer',
'Accept all gifts':'godkend alle gaver',
  //AutoTrain
'AUTO-BUILDING TROOPS':'Automatisk troppe trÊning',
'Active':'aktiv',
'City':'by',
'Troop type':'troope type',
'Troops':'tropper',
'Actions':'aktion',
'seconds of training between the cities':'sekunder mellem trÊning i byerne',
'Start at':'start med',
'of the population available':'af ledig befolkning',
'Use at':'brug',
'IF YOU GET ANY ERRORS, CHECK IF YOUR CITY HAS ENOUGH FOOD AND RESOURCES':'Hvis du fÂr nogle fejl check du har rÂstoffer nok',
'Initiating training':'Begynd trÊning',
'Conditions not met':'Der mangler noget',
  //Train
'Max':'Max',
'Number of troops per slot':'antal af enheder pr k¯',
'Number of slots':'antal af k¯¥er ',
'Queue':'k¯',
'barracks':'Kaserne',
'Cancel training':'Annuller trÊning',
'Number of troops per slot must be greater than':'antal af tropper pr k¯ er st¯rre end',
  'Cannot train that many troops':'Kan ikke trÊne sÂ mange tropper',
  'max is':'Max er ',
  'total':'total',
 'Invalid number of slots':'ugyldig antal i k¯',
 'Training succesful':'TrÊning begyndt',
 'Formation':'ved ikke hvad dette er ',
//Options
'Options':'Muligheder',
'Configuration of the':'opsÊtning af',
'Language':'sporg',
'Allow the toolbox window to be moved freely':'Tillad at toolboxen my flyttes rundt',
'Dimensions Tools':'Dimensioner pÂ Toolbox',
'Width':'Bredde',
'Height':'H¯jde',
'Refresh GoR every':'GeninlÊs hvert ',
'Organize a Tax event (if happiness':'Lav en Tax begivenhed (hvis glÊde er :',
'Auto-collect resources every':'Auto samel rÂstoffer',
'Allow to publish your helpings automatically to Facebook':'Tillad at offenligg¯re automatisk til Facebook',
'Everyone':'alle',
'Friends of friends':'Venner af venner',
'Friends only':'Kun venner',
'Me only':'Kun mig',
'Show shortcut keys':'Vis genveje taster',
'Configuration of chat':'opsÊt chat',
'Move the chat window to the right of the game':'flyt chat til h¯jre side af spillet',
'Allow to publish an alert in chat when your food level is low':'Tillad at skrive i chat hvis du manlger mad',
'Auto-click help requests, such as building help':'Aotu click pÂ ¯nsker om hjÊlp',
'Hide all help requests in chat':'Gem ¯nsker i chatten',
'Hide the rules of the chat':'Gem reglerne i chat',
'Show smileys':'vis smileys',
'Open':'≈ben',
'Warning sound when receiving a whisper':'Afspil lyd nÂr nogen hvisker til dig',
'Enable audio in case of ATTACK (Alliance)':'afspil lyd nÂr nogle angriber',
'Enable audio in case of SCOUT (Alliance)':'afspil lyd nÂr nogen spioner dig',
'Table of colors':'oversigt af farver',
'Background of the global chat':'Baggrundsfarve i global chat',
'Background of the alliance chat':'baggrundsfarve i allaince chat',
'Enable color for the leader':'Farve for leder',
'Configuration of Reports':'opsÊt raporter',
'Enable the deletion of the reports of the':'Virker p.t ikke',
'Delete reports every':'slet alle reporter',
'Enable the deletion of the message of the Kabam':'slet besked fra Kabam',
'Enable red background color in case of ATTACK (Alliance)':'g¯r baggrunden r¯d hvis du bliver angrebet',
'Sound file (URL MP3)':'Lyd fil (URL MP3)',
'Configuration of the Tower alert':'opsÊtning af tÂrn alarm',
'Allow to post scout alerts in chat':'post spoin alarm i chat',
'Allow to post attack alerts in chat':'post angreb i chat',
'Allow to sound an alarm when under attack (handy when you are away from keyboard)':'afspil lyd hvid du bliver angrebet (god iden hvis du er vÊk fra keabordet)',
'Message':'besked',
'Show the bunker':'vis hovedby',
'Show my troops':'vis mine tropper',
'Loading the SWF player':'inlÊser SWF spilleren',
'LOAD':'inlÊser',
'DEFAULT':'standard',
'Repeat every':'Gentag hvert',
'Length of sounding alarm':'LÊngden af tid lydfilen afspilles',
'Tester':'test',
'Stop Sound Alert':'Stop lydfil',
'Error':'FEJL',
'Loaded':'inlÊst',
'':''
};
var translateFRArray = {
 //Tools
'Please support the GoR BoTTols by clicking the ads on the GoR BoTTols website from time to time':'SVP supportez la boite BoTTols en cliquant sur la pub du site GOR BoTTols de temps en temps',
'Version':'Version',
'available':'disponible',
'Install':'Installation',
'You must belong to an alliance in order to use this feature':'Vous devez appartenir ‡ une alliance pour utiliser cette caractÈristique',
'Translated by':'Traduit par',
'Reload':'Recharger',
'Set your city bunker':'Saisir la ville forte',
//Time
'minutes':'minutes',
'seconds':'secondes',
'hours':'heures',
// Diplomacy
'None':'Aucune',
'Neutral':'Neutre',
'Friendly':'Amicale',
'Hostile':'Hostile',
'Unaligned':'Sans Alliance',
'Friendly To Them':'Amicale Avec Eux',
'Friendly To You':'Amicale Avec Vous',
//Position
 'Chancellor':'Chancelier',
'Vice Chancellor':'Vice Chancelier',
'Officer':'Officier',
//Food Alert
'My city':'Ma ville',
'is running out of food':'a besoin de raisin',
'so please send some':'envoyez moi un peu SVP',
'Current stock':'Stock actuel',
//Tower Alerts
'was explored':'a etÈ reconnu',
'The exploration seems to come from':'La reconnaisance semble venir de',
'Date':'Date',
'DEFENDS':'EN DEFENSE',
 'SANCTUARY':'SANCTUAIRE',
 'BUNKER':'VILLE FORTE',
 'MY TROOPS':'MES TROUPES',
 //Overview
 'Joined on':'EntrÈ le',
 'Glory':'Gloire',
 'Alliance':'Alliance',
 'World':'Monde',
 'TOTALS':'TOTAUX',
 'Population':'Population',
 //Alliance Manager
 'Alliance Manager':'Gestion Alliance',
 'Message Manager':'Gestion Messages',
 'ALLIANCE INFO':'INFO ALLIANCE',
 'MEMBERS INFO':'INFO MEMBRES',
 'Sort By':'Trier par',
 'Members':'Membres',
 'Founder':'Fondateur',
 'Avatar':'Avatar',
 'Name':'Nom',
 'Position':'Position',
 'Might':'Gloire',
 'Cities':'CitÈes',
 'Days in Position':'Jours dans la Position',
 'Joined Date':'EntrÈ le',
 'Last Login':'DerniËre connection',
 'Actions':'Action',
 'Get Info/Member':'Voir Info/Membres',
 'Enter a message':'Entrer un message',
 'Message by':'Message de',
 'Message sent to all the alliance by':'Message envoyÈ ‡ toute l\'alliance de',
 'Message sent to all officer by':'Message envoyÈ aux officiers de',
 'Read members page':'Lecture de la page membres',
'Message send to':'Message envoyÈ ‡',
'Processing':'Traitement',
'Remove Member':'Supprimer le Membre',
'Sorry, but this feature is only for official':'DÈsolÈ, mais cette fonction est seulement pour officiers',
'Do you really want to remove this user':'Voulez-vous vraiment supprimer ce membre',
//Search
 'Type':'Type',
 'Barbarian camps':'Camps Barbares',
'Cities':'CitÈes',
'City to start from':'Recherche ‡ partir de',
'Distance':'Distance',
'from':'de',
'to':'‡',
'Launch search':'Lancer la recherche',
'Cancel the search':'Stopper la recherche',
'SEARCH CANCELLED':'RECHERCHE ANNULEE',
'SEARCH FINISHED':'RECHERCHE FINIE',
'Searching':'Recheche en cours',
'The minimum distance cannot be lower than 0':'La distance mini doit Ítre supÈrieur ‡ 0',
'The distance has to be higher than 1':'La distance maxi doit Ítre supÈrieur ‡ 1',
'The maximum/minimum distance has been exceeded':'La distance max doit Ítre supÈrieur ‡ la distance mini',
 'The distance cannot be higher than 375':'La distance ne peut pas Ítre supÈrieur ‡ 375',
 'NOTE : WARNING, there is no limitation to the search, but this can have consequences on the performance of your browser':'NOTA: ATTENTION, il n\'y a pas de limitation dans la recherche mais cela peut avoir des consequences sur les performances de votre navigateur.',
 'Hide option window':'Cacher les options',
 'Research':'Recherche',
 'results':'resultats',
 'Not found':'Non trouvÈ',
 'More info':'Plus d\'info',
 'Source':'Origine',
 'Destination':'Destination',
 'Fields':'Champs',
 'Barbarian camp':'Camps Barbares',
 'Woods':'ForÍts',
'Grassland':'Prairies',
'River':'Fleuves',
'Mountains':'Montagnes',
'Plains':'Plaines',
'Hills':'Collines',
'Non-occupied only':'Libre seulement',
'Sort by':'Trier par',
'free':'libre',
'Filter':'Filtre',
'All cities':'Toutes les villes',
'Hostile cities only':'Hostiles seulement',
'Misty cities only':'Sous la brume seulement',
'Allied cities only':'AlliÈs seulement',
'Friendly cities only':'Amis seulement',
'Neutral cities only':'Neutre seulement',
'Cities with no alliance only':'Sans alliance seulement',
'Minimum':'Minimum',
'Maximum':'Maximum',
'content':'contient',
//Reassign
'Not possible to send to same city':'Pas possible d\'envoyer sur la mÍme citÈ',
'Impossible to':'Impossible de',
'with 0 troops':'avec 0 troupes',
'wake up':'reveillÈ',
 'more than':'plus que',
 'troops at a time':'troupes ‡ la fois',
 'Succeeded':'Fait',
 //Transport
 'Manual':'Manuel',
 'Automatic':'Automatique',
 'TRANSPORTING GOODS FROM CITY TO CITY':'TRANSPORT DE MARCHANDISES DE VILLE A VILLE',
 'Quantity':'QuantitÈ',
 'Resource':'Ressource',
 'type':'type',
 'Please put in the amount of troops you like to use':'SVP mettez la quantitÈ de troupes que vous souhaitez utiliser',
 'Please check the resource you want to transport':'SVP vÈrifiez les ressources que vous voulez transporter',
 'Send a transport every':'Envoyer les transports toutes les',
 'Send transport with a minimum of':'Envoyer les transports avec un minumum de',
 'ADD A TRANSPORT':'AJOUTER UN TRANSPORT',
 'Available':'Disponible',
 'Estimate':'EstimÈ',
 'necessary':'nÈcessaire',
 'Keep':'Garder',
 'Show routes':'Voir les routes',
 'Add a route':'Ajouter une route',
 'the route':'la route',
 'Edit':'Modification',
 //AutoAttack 2
'AUTOMATED ATTACKS':'ATTAQUES AUTOMATIQUES',
'ATTACK':'ATTAQUE',
'Do not use the general with a level greater than':'Ne pas utiliser les gÈnÈraux avec un niveau supÈrieur ‡',
'Record':'Enregistrer',
'Delete':'Supprimer',
'Last Attack':'DerniËre Attaque',
'Success':'RÈussi',
'Select troops':'Selection des troupes',
'CITY SET PARAMETERS':'PARAMETRES DES VILLES ENREGISTRES',
//Marches
'INCOMING ATTACKS':'ATTAQUES ENTRANTES',
'Target Coordinates':'CoordonnÈes de l\'objectif',
'Times':'Temps',
'Attacker':'Attaquant',
'OUTGOING MARCHES':'MARCHES SORTANTES',
'Status':'Statut',
'Coordinates':'CoordonnÈes',
'RECEIVED REINFORCEMENTS':'Renforts ReÁus',
'City reinforcements':'Ville renforcÈe',
//Reports
'CHECK ALLIANCE REPORTS':'RECHERCHE DES RAPPORTS D\'ALLIANCE',
'No reports found':'Aucun rapport trouvÈ',
'Pages':'Pages',
'pages':'pages',
'Page':'Page',
'of':'de',
'All reports':'Tous les rapports',
'Incoming attacks':'Attaques entrantes',
'Outgoing attacks':'Attaques sortantes',
'Reinforcements':'Renforts',
'All reports':'Tous les rapports',
'My reports only':'Seulement mes rapports',
'Delete all reports':'Supprimer tous les rapports',
'Transport':'Transport',
'Reinforce':'Renforcement',
'Attack':'Attaque',
'unknown':'inconnu',
'Wild':'Sauvage',
'Target':'Cible',
'Victory':'Victoire',
'Defeat':'DÈfaite',
'Defender':'DÈfenseur',
'Number of tours':'Nombre de tour(s)',
'No troops defending':'Aucune troupe en dÈfense',
'Killed':'TuÈs',
'Survived':'A survÈcu',
'Resources':'Ressources',
'Building':'Constructions',
'Technical':'Recherches',
'Amount':'QuantitÈ',
'Defending':'En dÈfense',
'Results found':'Resultats trouvÈs',
'Objects found':'Objets trouvÈs',
//Player
'Player':'Joueur',
'Search':'Recherche',
'OR':'OU',
'Minimum of 3 characters':'Minimum de 3 caractËres',
'Results for':'RÈsultats pour',
'Rank':'Rang',
'See members':'Voir les membres',
'Diplomacy':'Diplomacie',
'Players found':'Joueurs trouvÈs',
'Extra information':'Informations Supp.',
'Details':'DÈtails',
'Population':'Population',
'Provinces':'Provinces',
'Profile':'Profile',
//AutoAttack
 'CONFIGURATION':'CONFIGURATION',
 'STATISTICS':'STATISTIQUES',
 'Time between attacks':'Temps entre les attaques',
 'Attack Mode':'Config attaque',
 'AutoAttack stops when coordinates will be finished':'ArrÍt des Auto-Attaques qd toutes les coordonnÈes sont finies',
 'Check Coordinates List':'VÈrifiez les CoordonnÈes de la Liste',
 'Stop after':'ArrÍt aprËs',
 'attacks':'attaques',
 'Resume the attacks after':'Relancer les attaques aprËs',
 'Next attack':'Prochaine attaque',
 'do not be resumed':'ne peut pas Ítre relancÈ',
 'Check cities you want to attack from':'SÈlÈctionnes les villes desquelles tu veux faire partir l\'attaque',
 'TROOPS':'TROUPES',
 'valid coordinates found':'coordonnÈes validÈes',
 'No coordinated inserted':'Aucun coordonnÈe insÈrÈe',
 'Do you really want to enable this tab':'Voulez-vous vraiment activer cet onglet',
//Info
 'TROOP INFO':'INFORMATIONS TROUPES',
 'Troops':'Troupes',
 'Glory':'Gloire',
 'Life':'Vie',
 'Attack':'Attaque',
 'Defense':'DÈfense',
 'Speed':'Vitesse',
 'Range':'PortÈe',
 'Load':'Charge',
 'Upkeep':'Entretien',
 'NEEDED MARKS TO GET NEW CITY':'SCEAUX NECESSAIRES POUR LA CONSTRUCTION DE NOUVELLES VILLES',
 'Requirements':'Besoins',
 'Your level':'Ton Niveau',
 'Cohorts':'Cohortes',
//Spam
 'GLOBAL chat':'Chat GLOBAL',
 'ALLIANCE chat':'Chat ALLIANCE',
'OPTIONS':'OPTIONS',
 'Post automatically every':'Poster automatiquement toutes les',
'Your spam message':'Votre message',
//Generals
'Name':'Nom',
'Energy':'Energie',
'Actions':'Actions',
'Request more energy':'Publier demande energie',
'Send offerings':'Demande Offrande',
'Outside the city':'En dehors de la ville',
'No general present':'Aucun gÈnÈral prÈsent',
//Gifts
'Pick a free gift to send to all your friends':'Choisissez un KDO ‡ envoyer ‡ tous vos amis',
'SEND':'ENVOYER',
'USE':'UTILISER',
'You have':'Acquis',
'Send offerings':'Demande d\'offrande',
'Accept all gifts':'Accepter tous les KDO',
//AutoTrain
 'AUTO-BUILDING TROOPS':'FORMATION AUTOMATIQUE DES TROUPES',
 'Active':'Actif',
 'City':'Ville',
 'Troop type':'Type de troupes',
 'Troops':'Troupes',
 'Actions':'Actions',
 'seconds of training between the cities':'secondes pour la formation de ville en ville',
 'Start at':'Initier ‡',
 'of the population available':'de la population inactive disponible',
 'Use at':'Utiliser',
 'IF YOU GET ANY ERRORS, CHECK IF YOUR CITY HAS ENOUGH FOOD AND RESOURCES':'EN CAS D\'ERREUR, VERIFIE QUE TA VILLE A ASSEZ DE RAISIN ET RESSOURCES',
 'Initiating training':'Lancement',
 'Conditions not met':'Conditions non remplies',
//Train
 'Max':'Max',
 'Number of troops per slot':'Nombre de troupes par slot',
 'Number of slots':'Nombre de slots',
 'Queue':'File d\'attente',
 'barracks':'casernes',
 'Cancel training':'Annuler l\'entrainement',
 'Number of troops per slot must be greater than':'Le nombre de troupes par slot doit Ítre plus grand que',
'Cannot train that many troops':'Il n\'est pas possible d\'entrainer d\'autres troupes',
'max is':'max c\'est',
'total':'totale',
 'Invalid number of slots':'Nombres de slots invalide',
 'Training succesful':'Formation rÈussi',
 'Formation':'Formation',
//Options
'Options':'Options',
'Configuration of the':'Configuration de',
'Language':'Langue',
'Allow the toolbox window to be moved freely':'Activer le dÈplacement de la fenÍtre',
'Dimensions Tools':'Dimensions de la boite',
'Width':'Largeur',
'Height':'Hauteur',
'Refresh GoR every':'Rafraichir GoR tous les',
'Organize a Tax event (if happiness':'Organiser jour d\'imposition (si bonheur >=',
'Auto-collect resources every':'Auto-collecte des ressources toutes les',
'Allow to publish your helpings automatically to Facebook':'Autoriser la publication automatiquement des aides ‡ Facebook',
'Everyone':'Tous',
'Friends of friends':'Amis des amis',
'Friends only':'Amis seulement',
'Me only':'Seulement moi',
'Show shortcut keys':'Montrer les touches de raccourcis',
'Configuration of chat':'Configuration du chat',
'Move the chat window to the right of the game':'Mettre le tchat ‡ droite du jeu',
'Allow to publish an alert in chat when your food level is low':'Activer la publication sur le tchat alliance en cas d\'autonomie en rouge',
'Auto-click help requests, such as building help':'Cliquer automatiquement sur les demandes d\'aides',
'Hide all help requests in chat':'Cacher toutes les demandes d\'aides',
'Hide the rules of the chat':'Cacher les rËgles du chat',
'Show smileys':'Montrer les smileys',
'Open':'Ouvrir',
'Warning sound when receiving a whisper':'Activer le son sur un chuchotement',
'Enable audio in case of ATTACK (Alliance)':'Activer le son sur une ATTAQUE (Alliance)',
'Enable audio in case of SCOUT (Alliance)':'Activer le son sur une RECONNAISSANCE (Alliance)',
'Table of colors':'Table des couleurs',
'Background of the global chat':'Le fond du tchat global',
'Background of the alliance chat':'Le fond du tchat alliance',
'Enable color for the leader':'Activer les couleurs de la chancelerie',
'Configuration of Reports':'Configuration des Rapports',
'Enable the deletion of the reports of the':'Activer la suppression des rapports de',
'Delete reports every':'Supprimer les rapports tous les',
'Enable the deletion of the message of the Kabam':'Activer la suppression des messages de Kabam',
'Enable red background color in case of ATTACK (Alliance)':'Activer le fond rouge sur une ATTAQUE (Alliance)',
'Sound file (URL MP3)':'Fichier audio (URL MP3)',
'Configuration of the Tower alert':'Configuration des alertes de la Tour',
'Allow to post scout alerts in chat':'Autoriser publication des alertes de reconnaissance sur chat alliance',
'Allow to post attack alerts in chat':'Autoriser publication des alertes d\'attaques sur chat alliance',
'Allow to sound an alarm when under attack (handy when you are away from keyboard)':'Autoriser l\'alarme sur une attaque (pratique quand vous Ítes loin du clavier)',
'Message':'Message',
'Show the bunker':'Montrer ma ville forte',
'Show my troops':'Montrer mes troupes',
'Loading the SWF player':'Chargement du SWF player',
'LOAD':'CHARGER',
'DEFAULT':'DEFAUT',
'Repeat every':'RÈpeter tous les',
'Length of sounding alarm':'Longueur du son d\'alarme',
'Tester':'Tester',
'Stop Sound Alert':'ArrÍter son d\'alarme',
'Error':'Erreur',
'Loaded':'ChargÈ',
'':''
};
var translateGEArray = {
//Tools
'Please support the GoR BoTTols by clicking the ads on the GoR BoTTols website from time to time':'Bitte unterstuetzt die Entwicklung von GoRBoTTols indem Ihr von Zeit zu Zeit die Werbebanner anklickt',
'Version':'Version',
'available':'verfuegbar',
'Install':'Installieren',
'You must belong to an alliance in order to use this feature':'Du musst Mitglied einer Allianz sein um diese Funktion nutzen zu koennen',
'Translated by':'Uebersetzung durch',
'Reload':'Neustart',
'Set your city bunker':'Stelle Deine Hauptstadt ein',
'Collect':'Einholen',
'resources':'Ressourcen',
'now':'jetzt',
//Germania
'City for scout/attack':'Festung zu sp‰hen/anzugreifen',
'Wait':'Warten',
'UPDATE':'Update',
'For':'Seit',
'Force Quit':'Ausweisung',
'FREE':'FREI',
'Close':'Schliessen',
'Errors':'Fehler',
'Select all':'Alle auswaehlen',
'I suggest you refresh the page. Some data may not be real':'Ich rate dazu, die Seite erneut zu laden. Einige Daten koennten nicht mehr aktuell sein',
//Time
'minutes':'Minuten',
'seconds':'Sekunden',
'hours':'Stunden',
// Diplomacy
'None':'Keine',
'Neutral':'Neutral',
'Friendly':'Freundlich',
'Hostile':'Feindlich',
'Unaligned':'Allianzlos',
'Friendly To Them':'Freundlich ihnen gegenueber',
'Friendly To You':'Freundlich Dir gegenueber',
//Position
'Chancellor':'Statthalter',
'Vice Chancellor':'Stellvertretender Statthalter',
'Officer':'Offizier',
//Food Alert
'My city':'Meine Stadt',
'is running out of food':'erwartet eine Hungersnot',
'so please send some':'Bitte Lebensmittel liefern\'',
'Current stock':'Aktueller Bestand',
//Tower Alerts
'was explored':'wurde ausgekundschaftet',
'The exploration seems to come from':'Der Spaeher kommt von',
'Date':'Daten',
'DEFENDS':'Verteidigung',
'SANCTUARY':'Stadt',
'ARRIVAL':'Ankunft',
'BUNKER':'Hauptstadt',
'MY TROOPS':'MEINE TRUPPEN',
//Apothecary
'Apothecary':'Apotheke',
'Revive':'Wiederbeleben',
//Overview
'Joined on':'Spielt seit',
'Glory':'Ruhm',
'Alliance':'Allianz',
'World':'Welt',
'TOTALS':'GESAMT',
'Population':'Bevoelkerung',
//Alliance Manager
'Alliance Manager':'Allianzverwaltung',
'Message Manager':'Nachrichtenverwaltung',
'ALLIANCE INFO':'ALLIANZINFORMATIONEN',
'MEMBERS INFO':'MITGLIEDSINFORMATIONEN',
'Sort By':'Sortieren nach',
'Members':'Mitglieder',
'Founder':'Gruender',
'Avatar':'Avatar',
'Name':'Name',
'Position':'Position',
'Might':'Ruhm',
'Cities':'Staedte',
'Days in Position':'Tage im Amt',
'Joined Date':'Spielt seit',
'Last Login':'Letzter Login',
'Actions':'Aktionen',
'Get Info/Member':'Mitgliedsinformationen erhalten',
'Enter a message':'Nachricht schreiben',
'Message by':'Nachricht von',
'Message sent to all the alliance by':'Nachricht an die gesamte Allianz von',
'Message sent to all officer by':'Nachricht an alle Offiziere von',
'Read members page':'Mitgliedsseite lesen',
'Message send to':'Nachricht gesendet an',
'Processing':'In Bearbeitung',
'Remove Member':'Mitglied entfernen',
'Sorry, but this feature is only for official':'Entschuldigung, aber diese Funktion ist nur fuer Offiziere zugaenglich',
'Do you really want to remove this user':'Moechten Sie wirklich diesen Benutzer entfernen',
//Search
'Type':'Typ',    
'Barbarian camps':'Barbarenlager',
'Cities':'Staedte',
'City to start from':'Suche beginnen von',
'Distance':'Entfernung',
'from':'von',
'to':'bis',
'Launch search':'Suche starten',
'Cancel the search':'Suche abbrechen',
'SEARCH CANCELLED':'SUCHE ABGEBROCHEN',
'SEARCH FINISHED':'SUCHE BEENDET',
'Searching':'in Bearbeitung',
'The minimum distance cannot be lower than 0':'Die Mindestentfernung darf nicht kleiner sein als 0',
'The distance has to be higher than 1':'Die Entfernung muss groesser sein als 1',
'The maximum/minimum distance has been exceeded':'Die Maximalentfernung wurde ueberschritten',
'The distance cannot be higher than 375':'Die Entfernung kann nicht groesser sein als 375',
'NOTE : WARNING, there is no limitation to the search, but this can have consequences on the performance of your browser':'ACHTUNG: es gibt keine Einschraenkungen bei der Suche, aber dies hat Auswirkungen auf die Performance Deines Browsers',
'Hide option window':'Das Optionsfenster verstecken',
'Research':'Suche',
'results':'Ergebnisse',
'Not found':'Nichts gefunden',
'More info':'Mehr Info',
'Source':'von',
'Destination':'Ziel',
'Fields':'Felder',
'Barbarian camp':'Barbarenlager',
'Woods':'Waelder',
'Grassland':'Wiesen',
'River':'Fluesse',
'Mountains':'Berge',
'Plains':'Ebenen',
'Hills':'Huegel',
'Non-occupied only':'Nur nicht besetzte',
'Sort by':'Sortieren nach',
'free':'frei',
'Filter':'Filter',
'All cities':'Alle Staedte',
'Hostile cities only':'Nur feindliche Staedte',
'Misty cities only':'Nur Staedte im Nebel',
'Allied cities only':'Nur Alliierte Staedte',
'Friendly cities only':'Nur befreundete Staedte',
'Neutral cities only':'Nur neutrale Staedte',
'Cities with no alliance only':'Nur Staedte ohne Allianz',
'Minimum':'Minimum',
'Maximum':'Maximum',
'content':'Inhalt',
//Reassing
'Not possible to send to same city':'Nicht moeglich an die selbe Stadt zu senden',
'Impossible to':'Nicht moeglich',
'with 0 troops':'mit 0 Truppen',
'wake up':'Aufwachen',
'more than':'mehr als',
'troops at a time':'Truppen per Marsch',
'Succeeded':'Erfolgreich',
//Transport
'Manual':'Manuell',
'Automatic':'Automatisch',
'TRANSPORTING GOODS FROM CITY TO CITY':'GUETER VON STADT ZU STADT TRANSPORTIEREN',
'Quantity':'Menge',
'Resource':'Ressource',
'type':'ARt',
'Please put in the amount of troops you like to use':'Bitte die Anzahl Truppen eintragen, die Du benutzen moechtest',
'Please check the resource you want to transport':'Bitte die Gueter ueberpruefen, die transportiert werden sollen',
'Send a transport every':'Einen Transport senden alle',
'Send transport with a minimum of':'Einen Transport senden mit einem Minimum von',
'ADD A TRANSPORT':'EINEN TRANSPORT HINZUFUEGEN',
'Available':'Verfuegbar',
'Estimate':'Schaetzung',
'necessary':'notwendig',
'Keep':'Mindesbestand',
'Show routes':'Routen anzeigen',
'Add a route':'Routen hinzufuegen',
'the route':'Die Route',
'Edit':'bearbeiten',
//Crest
'Help':'Hilfe',
'See target':'Ziel anzeigen',
'Add target':'Ziel hinzufuegen',
'Remove':'Entfernen',
'Wave':'Welle',
'From':'Von',
'To':'Nach',
'Do not use the general with the energy below':"Keine Generaele mit einem Level benutzen unter",
//AutoAttack 2
'AUTOMATED ATTACKS':'AUTOANGRIFF',
'ATTACK':'ANGRIFF',
'Do not use the general with a level greater than':'Keine Generaele mit einem Level benutzen ueber',
'Record':'Zufuegen',
'Delete':'Loeschen',
'Last Attack':'Letzter Angriff',
'Success':'Erfolg',
'Select troops':'Truppen auswaehlen',
'CITY SET PARAMETERS':'PARAMETER DER STADT EINSTELLEN',
//Marches
'INCOMING ATTACKS':'HEREINKOMMENDE ANGRIFFE',
'Target Coordinates':'Zielkoordinaten',
'Times':'Anzahl',
'Attacker':'Angreifer',
'OUTGOING MARCHES':'EIGENE ANGRIFFE',
'Status':'StatUS',
'Coordinates':'Koordinaten',
'RECEIVED REINFORCEMENTS':'ERHALTENE VERSTAERKUNGSTRUPPEN',
'City reinforcements':'Stadt Verstaerkung',
//Reports
'CHECK ALLIANCE REPORTS':"ALLIANZBERICHTE PRUEFEN",
'No reports found':'Keine Berichte gefunden',
'Pages':'Seiten',
'pages':'Seiten',
'Page':'Seite',
'of':'von',
'All reports':'Alle Berichte',
'Incoming attacks':'Hereinkommende Angriffe',
'Outgoing attacks':'Ausgehende Angriffe',
'Reinforcements':'Verstaerkungen',
'All reports':'Alle Berichte',
'My reports only':'Nur meine Berichte',
'Delete all reports':'Alle Berichte loeschen',
'Transport':'Transporte',
'Reinforce':'Verstaerkung',
'Attack':'Angriff',
'unknown':'unbekannt',
'Wild':'Wildniss',
'Target':'Ziel',
'Victory':'Sieg',
'Defeat':'Niederlage',
'Defender':'Verteidiger',
'Number of tours':'Anzahl Runden',
'No troops defending':'Keine Truppen in der Verteidigung',
'Killed':'Getoetet',
'Survived':'Ueberlebende',
'Resources':'Ressourcen',
'Building':'Gebaeude',
'Technical':'Technisch',
'Amount':'Menge',
'Defending':'In Verteidigung',
'Results found':'Gefundene Resultate',
'Objects found':'Gefundene Objekte',
//Player
'Player':'Spieler',
'Search':'Suche',
'OR':'Oder',
'Minimum of 3 characters':'Mindestens 3 Buchstaben',
'Results for':'Ergebnisse fuer',
'Rank':'Rang',
'See members':'Zeige Mitglieder',
'Diplomacy':'Diplomatie',
'Players found':'Gefundene Spieler',
'Extra information':'Weitere Informationen',
'Details':'Details',
'Population':'Bevoelkerung',
'Provinces':'Provinz',
'Profile':'FB-Profil',
//AutoAttack
'CONFIGURATION':'KONFIGURATION',
'STATISTICS':'STATISTIK',
'Time between attacks':'Zeit zwischen den Angriffen',
'Attack Mode':'Angriffsmodus',
'TROOPS':'TRUPPEN',
'No coordinated inserted':'Keine Koordinaten eingefuegt',
'Impossible to attack the coordinates':'Unmoeglich diese Koordinaten anzugreifen',
'Groundhog coordinates':'Koordinaten von Anfang',
'City not activated':'Stadt ist nicht aktiviert',
'Send attack to':'Sene Angriffe nach',
'You do not have the troops necessary':'Die notwendigen Truppen stehen nicht zur Verfuegung',
'You can not attack':'Du kannst nicht angreifen',
'No general appointed':'Kein General ernannt',
'No general available':'kein General verfuegbar',
'Unknown error':'Unbekannter Fehler',
'Disable the city in which the coordinates of end':'Die Stadt in der die Koordinaten enden auslassen',
'Disable the city':'Stadt auslassen',
//Info
'TROOP INFO':'TRUPPEN INFORMATION',
'Troops':'Truppen',
'Glory':'Ruhm',
'Life':'Leben',
'Attack':'Angriff',
'Defense':'Verteidigung',
'Speed':'Geschwindigkeit',
'Range':'Reichweite',
'Load':'Ladekapazitaet',
'Upkeep':'Instandhaltung',
'NEEDED MARKS TO GET NEW CITY':'NOTWENDIGE SIEGEL UM NEUE STADT ZU ERHALTEN\'',
'Requirements':'Erforderlich',
'Your level':'Dein Level',
'Cohorts':'Kohorten',
//Spam
'GLOBAL chat':'GLOBAL Chat',
'ALLIANCE chat':'Allianz Chat',
'OPTIONS':'OPTIONEN',
'Post automatically every':'Automatisch posten alle',
'Your spam message':'Deine Nachricht',
//Generals
'Name':'Name',
'Energy':'Energie',
'Actions':'Aktonen',
'Request more energy':'Um Enerie bitten',
'Send offerings':'Opfergaben senden',
'Outside the city':'Ausserhalb der Stadt',
'No general present':'Kein General vorhanden',
//Gifts
'Pick a free gift to send to all your friends':'Waehle ein kostenloses Geschenk aus, um es Deinen Freunden zu senden',
'SEND':'Sende',
'USE':'BENUTZEN',
'You have':'Du hast',
'Send offerings':'Opfergaben senden',
'Accept all gifts':'Alle Geschenke annehmen',
//AutoTrain
'AUTO-BUILDING TROOPS':'AUTO TRAINING VON TRUPPEN',
'Active':'Aktiv',
'Deactive':'Inaktiv',
'City':'Stadt',
'Troop type':'Truppenart',
'Troops':'Truppen',
'Actions':'Aktionen',
'seconds of training between the cities':'Sekunden zwischen den Staedten',
'Start at':'Start bei',
'of the population available':'der verfuegbaren Bevoelkerung',
'Use at':'verwenden von',
'IF YOU GET ANY ERRORS, CHECK IF YOUR CITY HAS ENOUGH FOOD AND RESOURCES':'BEI FEHLERMELDUNGEN UEBERPRUEFEN SIE, OB SIE GENUG RESSOURCEN UND NAHRUNG ZUR VERFUEGUNG HABEN',
'Initiating training':'Training initialisieren',
'Conditions not met':'Bedingungen nicht erfuellt',
//Train
'Max':'Max',
'Number of troops per slot':'Anzahl Truppen pro Slot',
'Number of slots':'Anzahl von Slots',
'Queue':'Warteschlange',
'barracks':'Barracken',
'Cancel training':'Training abbrechen',
'Number of troops per slot must be greater than':'Die Anzahl Truppen pro Slot muss groesser sein als',
'Cannot train that many troops':'Soviele Truppen koennen nicht ausgebildet werden',
'max is':'Maximum ist',
'total':'Gesamt',
'Invalid number of slots':'Ungueltige Anzahl Slots',
'Training succesful':'Ausbildung erfolgreich',
'Formation':'Hinzufuegen',
//Options
'Options':'Optionen',
'Configuration of the':'Konfiguration des',
'Language':'Sprache',
'Allow the toolbox window to be moved freely':'Das Fenster mit dem Tool frei beweglich machen',
'Dimensions Tools':'Abmessungen des Toolfensters',
'Width':'Breite',
'Height':'Hoehe',
'Refresh GoR every':'GoR alle... neu laden',
'Organize a Tax event (if happiness':'Steuertag organisieren (wenn Freude',
'Auto-collect resources every':'Ressourcen sammeln alle',
'Collect now':'Jetzt sammeln',
'Allow to publish your helpings automatically to Facebook':'Automatischer Post in Facebook',
'Everyone':'Alle',
'Friends of friends':'Freunde von Freunden',
'Friends only':'Nur Freunde',
'Me only':'Nur ich',
'Show shortcut keys':'Tastaturkuerzel anzeigen',
'Hide useless keys of the game (Fan page, Discussions ..)':'Sinnlose Felder des Spiels verbergen (Fan page, Diskussionen ..)',
'Configuration of chat':'Konfiguration des Chats',
'Move the chat window to the right of the game':'Das Fenster des Chats rechts vom Spiel anzeigen',
'Allow to publish an alert in chat when your food level is low':'Erlauben eine Meldung im Chat zu  posten, wenn Deine Nahrungsmittel knapp werden',
'Auto-click help requests, such as building help':'Automatisch Hilfsanfragen anklicken, wie z.B. Bau- oder Forschungsanfragen',
'Hide all help requests in chat':'Alle Hilfsanfragen im Chat verbergen',
'Hide the rules of the chat':'Die Chatregeln verbergen',
'Show smileys':'Smileys anzeigen',
'Open':'Oeffnen',
'Warning sound when receiving a whisper':'Tonsignal bei Erhalt einer Fluesternachricht',
'Enable audio in case of ATTACK (Alliance)':'Tonsignal im Falle eines Angriffes auf die Allianz',
'Enable audio in case of SCOUT (Alliance)':'Tonsignal im Falle eines Spaehangriffes auf die Allianz',
'Table of colors':'Farbtafel',
'Background of the global chat':'Hintergrund des Global Chat',
'Background of the alliance chat':'Hintergrund des Allianzchats',
'Enable color for the leader':'Farbcodierung fuer Allianzfuehrung',
'Configuration of Reports':'Konfiguration der Berichte',
'Enable the deletion of the reports of the':'Die Loeschung der Berichte ermoeglichen des',
'Delete reports every':'Berichte loeschen alle',
'Enable the deletion of the message of the Kabam':'Die Loeschung der Nachrichten von Kabam ermoeglichen',
'Enable red background color in case of ATTACK (Alliance)':'Roten Hintergrund einstellen bei Angriff auf Allianzmitglieder',
'Sound file (URL MP3)':'Audio file (URL MP3)',
'Configuration of the Tower alert':'Konfiguration des Wachturms',
'Allow to post scout alerts in chat':'Spaehangriffe im Chat posten',
'Allow to post attack alerts in chat':'Angriffe im Chat posten',
'Allow to sound an alarm when under attack (handy when you are away from keyboard)':'Tonsignal im Falle eines Angriffes (praktisch, wenn man nicht immer an der Tastatur sitzt)',
'Message':'Nachricht',
'Show the bunker':'Hauptstadt anzeigen',
'Show my troops':'Meine Truppen anzeigen',
'Loading the SWF player':'Den SWF player hochladen',
'LOAD':'LADEN',
'DEFAULT':'DEFAULT',
'Repeat every':'Wiederholen alle',
'Length of sounding alarm':'Laenge des Alarms',
'Tester':'Test',
'Stop Sound Alert':'Tonsignal beenden',
'Error':'Fehler',
'Loaded':'Geladen',
'':''
};
var translateSPArray = {
//Tools
'Please support the GoR BoTTols by clicking the ads on the GoR BoTTols website from time to time':'Por favor,se ruega apoye Gor BoTTols clicando en los anuncios de vez en cuando,gracias',
'Version':'Version',
'available':'disponibile',
'Install':'Instalar',
'You must belong to an alliance in order to use this feature':'Debe pertenecer a una alianza para poder usar esta opcion',
'Translated by':'Traducido por',
'Reload':'Daniel',
'Set your city bunker':'Indica tu ciudad Bunker',
'Collect':'Recolecta',
'resources':'recursos',
'now':'Ahora',
//Germania
'City for scout/attack':'Ciudad para explorar/atacar',
'Wait':'Aspetta',
'UPDATE':'AGGIORNA',
'For':'Per',
'Force Quit':'Uscita forzata',
'FREE':'Libre',
'Close':'Cerrar',
'Errors':'Error',
'Select all':'Seleccionar todo',
'I suggest you refresh the page. Some data may not be real':'Actualice la pagina,alguna informacion no es real',
//Time
'minutes':'minutos',
'seconds':'segundos',
'hours':'horas',
// Diplomacy
'None':'Ninguna',
'Neutral':'Neutral',
'Friendly':'Amistosa',
'Hostile':'Hostil',
'Unaligned':'Sin Alianza',
'Friendly To Them':'Amichevoli Verso Loro',
'Friendly To You':'Amichevoli Verso Te',
//Position
'Chancellor':'Canceller',
'Vice Chancellor':'Adjutor',
'Officer':'Oficial',
//Food Alert
'My city':'Mi Ciudad ',
'is running out of food':'necesita comida',
'so please send some':'Por favor enviar una poca\'',
'Current stock':'Todavia tengo',
//Tower Alerts
'was explored':'Ha sido explorada',
'The exploration seems to come from':'Las coordenadas de la ciudad exploradora son',
'Date':'Fecha',
'DEFENDS':'Defender',
'SANCTUARY':'SANTUARIO',
'ARRIVAL':'LLEGADA',
'BUNKER':'BUNKER',
'MY TROOPS':'MIS TROPAS',
//Overview
'Joined on':'Inicio del jugador',
'Glory':'Gloria',
'Alliance':'Alianza',
'World':'Mundo',
'TOTALS':'TOTAL',
'Population':'Poblacion',
//Alliance Manager
'Alliance Manager':'Gestion Alianza',
'Message Manager':'Gestion Mensajes',
'ALLIANCE INFO':'INFO ALIANZA',
'MEMBERS INFO':'INFO MIEMBROS',
'Sort By':'Ordenar por',
'Members':'Miembro',
'Founder':'Fundador',
'Avatar':'Avatar',
'Name':'Nombre',
'Position':'Posicion',
'Might':'Gloria',
'Cities':'Ciudades ',
'Days in Position':'Dias en la Posicion',
'Joined Date':'Inicio del juego',
'Last Login':'Ultima conexion',
'Actions':'Acciones',
'Get Info/Member':'Obtener info.miembro',
'Enter a message':'Insertar mensaje',
'Message by':'Mensaje de',
'Message sent to all the alliance by':'Mensaje enviado a toda la alianza de',
'Message sent to all officer by':'Mensaje enviado a los oficiales de',
'Read members page':'Ver perfil jugador',
'Message send to':'Mensaje enviado a',
'Processing':'Ejecutar',
'Remove Member':'Expulsar miembro',
'Sorry, but this feature is only for official':'Perdona, esta opcion es solo para oficiales',
'Do you really want to remove this user':'¿Estas seguro de querer eliminar este miembro?',
//Search
'Type':'Tipo',
'Barbarian camps':'Campamento Barbaro',
'Cities':'Ciudad ',
'City to start from':'Buscar desde',
'Distance':'Distancia',
'from':'desde',
'to':'hasta',
'Launch search':'Iniciar busqueda',
'Cancel the search':'Cancelar busqueda',
'SEARCH CANCELLED':'BUSQUEDA CANCELADA',
'SEARCH FINISHED':'BUSQUEDA TERMINADA',
'Searching':'BUSCANDO...',
'The minimum distance cannot be lower than 0':'La distancia minima no puede ser inferior a 0',
'The distance has to be higher than 1':'La distancia debe ser superior a 1',
'The maximum/minimum distance has been exceeded':'La distancia maxima/minima ha sido superada',
'The distance cannot be higher than 375':'La distancia no puede ser superior a 375',
'NOTE : WARNING, there is no limitation to the search, but this can have consequences on the performance of your browser':'NOTA : !!!ATENCION¡¡¡, no existe limitacion de busqueda, esto puede tener repercusion en el navegador',
'Hide option window':'Esconde la consola de opciones',
'Research':'Buscar',
'results':'Resultados',
'Not found':'No se encuentra',
'More info':'Mas info',
'Source':'Desde',
'Destination':'Destino',
'Fields':'Campos',
'Barbarian camp':'Campamentos Barbaros',
'Woods':'Bosques',
'Grassland':'Praderas',
'River':'Rios',
'Mountains':'Montañas',
'Plains':'Llanuras',
'Hills':'Colinas',
'Non-occupied only':'Solo no ocupados',
'Sort by':'Ordenar por',
'free':'libre',
'Filter':'Filtrar',
'All cities':'Todas las ciudades ',
'Hostile cities only':'Solo Hostiles',
'Misty cities only':'Solo ciudades Ocultas',
'Allied cities only':'Solo ciudades aliadas',
'Friendly cities only':'Solo ciudades amistosas',
'Neutral cities only':'Solo ciudades neutrales',
'Cities with no alliance only':'Solo ciudades sin alianza',
'Minimum':'Minima',
'Maximum':'Maxima',
'content':'contiene',
//Reassing
'Not possible to send to same city':'No se puede enviar a la misma ciudad',
'Impossible to':'Imposible',
'with 0 troops':'con 0 tropas',
'wake up':'Despertarse',
'more than':'sobre',
'troops at a time':'tropas a la vez',
'Succeeded':'Hecho',
//Transport
'Manual':'Manual',
'Automatic':'Automatico',
'TRANSPORTING GOODS FROM CITY TO CITY':'TRASPORTAR RECURSOS ENTRE CIUDADES',
'Quantity':'Cantidades ',
'Resource':'Recursos',
'type':'tipo',
'Please put in the amount of troops you like to use':'Por favor,selecciona la tropa que desea mandar',
'Please check the resource you want to transport':'Por favor,selecciona el recursos que desea mandar',
'Send a transport every':'Envia un transporte cada',
'Send transport with a minimum of':'Envia un transporte con un minimo de',
'ADD A TRANSPORT':'AÑADIR UN TRANSPORTE',
'Available':'Disponible',
'Estimate':'Estimado',
'necessary':'Necesario',
'Keep':'Mantener',
'Show routes':'Mostrar rutas',
'Add a route':'Añadir una ruta',
'the route':'la ruta',
'Edit':'Modificar',
//Crest
'Help':'Ayuda',
'See target':'Mostrar objetivos',
'Add target':'Añadir objetivos',
'Remove':'Eliminar',
'Wave':'Ola',
'From':'Desde',
'To':'Hacia',
'Do not use the general with the energy below':"No utilizar los generales con energia inferior a",
//AutoAttack 2
'AUTOMATED ATTACKS':'AUTOATAQUE',
'ATTACK':'ATACAR',
'Do not use the general with a level greater than':'No utilizar los generales con nivel superior a',
'Record':'Registro',
'Delete':'Borrar',
'Last Attack':'Ultimo Ataque',
'Success':'Enviado',
'Select troops':'Selecciona tropa',
'CITY SET PARAMETERS':'PARAMETROS DE LA CIUDAD',
//Marches
'INCOMING ATTACKS':'ATAQUES EN CAMINO',
'Target Coordinates':'Coordenadas del Objetivo',
'Times':'Tiempo',
'Attacker':'Atacante',
'OUTGOING MARCHES':'VELOCIDAD DE SALIDA',
'Status':'Estado',
'Coordinates':'Coordenadas',
'RECEIVED REINFORCEMENTS':'REFUERZOS RECIBIDOS',
'City reinforcements':'Ciudad reforzada',
//Reports
'CHECK ALLIANCE REPORTS':"MOSTRAR INFORMES DE LA ALIANZA",
'No reports found':'No se encontro ningun informe',
'Pages':'Paginas',
'pages':'paginas',
'Page':'Pagina',
'of':'de',
'All reports':'Todos los reportes',
'Incoming attacks':'Ataques entrantes',
'Outgoing attacks':'Ataques salientes',
'Reinforcements':'Refuerzos',
'All reports':'Todos los Reportes',
'My reports only':'Solo mis reportes',
'Delete all reports':'Borra todos los reportes',
'Transport':'Transporte',
'Reinforce':'Refuerzo',
'Attack':'Ataque',
'unknown':'Desconocido',
'Wild':'Tierra',
'Target':'Objetivo',
'Victory':'Victoria',
'Defeat':'Derrota',
'Defender':'Defensor',
'Number of tours':'Numero de turnos',
'No troops defending':'Ninguna tropa defendiendo',
'Killed':'Participantes',
'Survived':'Supervivientes',
'Resources':'Recursos',
'Building':'Construccion',
'Technical':'Investigaciones',
'Amount':'Cantidad ',
'Defending':'En Defensa',
'Results found':'Resultados encontrados',
'Objects found':'Objetos encontrados',
//Player
'Player':'Jugador',
'Search':'Buscar',
'OR':'O',
'Minimum of 3 characters':'Minimo 3 carateres',
'Results for':'Resultados de busqueda de',
'Rank':'Posicion Lista',
'See members':'Muestra miembros',
'Diplomacy':'Diplomacia',
'Players found':'Jugadores encontrados',
'Extra information':'Informacion extra',
'Details':'Detalles',
'Population':'Poblacion',
'Provinces':'Provincia',
'Profile':'Perfil',
//AutoAttack
'CONFIGURATION':'CONFIGURACION',
'STATISTICS':'ESTADISTICAS',
'Time between attacks':'Tiempo entre ataques',
'Attack Mode':'Modalidad de ataque',
'AutoAttack stops when coordinates will be finished':'Detener el autoataque cuando terminen las coordenadas',
'Check Coordinates List':'Control de coodenadas entrantes',
'Stop after':'Se detiene despues de',
'attacks':'Ataques',
'Resume the attacks after':'Reanudar despues de los ataques',
'Next attack':'Siguiente ataque',
'do not be resumed':'No se reanudara',
'Check cities you want to attack from':'Selecciona la ciudad desde la que se iniciara el ataque',
'TROOPS':'TROPAS',
'valid coordinates found':'Coordenadas validadas',
'No coordinated inserted':'Ninguna coordenada encontrada',
'Do you really want to enable this tab':'¿Desea habilitar esta pestaña?',
//Info
'TROOP INFO':'INFO TROPAS',
'Troops':'Tropas',
'Glory':'Gloria',
'Life':'Vida',
'Attack':'Ataque',
'Defense':'Defensa',
'Speed':'Velocidad ',
'Range':'Alcanza',
'Load':'Carga',
'Upkeep':'Consumo',
'NEEDED MARKS TO GET NEW CITY':'MARCAS NECESARIAS PARA CONSEGUIR LAS CIUDADES\'',
'Requirements':'Requisitos',
'Your level':'Tu nivel',
'Cohorts':'Cohortes',
//Spam
'GLOBAL chat':'Chat GLOBAL',
'ALLIANCE chat':'Chat ALIANZA',
'OPTIONS':'OPCIONES',
'Post automatically every':'Posteo automatico cada',
'Your spam message':'Tu mensaje',
//Generals
'Name':'Nombre',
'Energy':'Energia',
'Actions':'Acciones',
'Request more energy':'Pedir mas energia',
'Send offerings':'Enviar Ofrenda',
'Outside the city':'Fuera de la ciudad ',
'No general present':'Ningun general presente',
//Gifts
'Pick a free gift to send to all your friends':'Selecciona un regalo para enviar a tus amigos',
'SEND':'ENVIA',
'USE':'USAR',
'You have':'No hay',
'Send offerings':'Pide ofrendas',
'Accept all gifts':'Acepta todos los regalos',
//AutoTrain
'AUTO-BUILDING TROOPS':'AUTO ENTRENAR TROPAS',
'Active':'Activar',
'Deactive':'Desactivar',
'City':'Ciudad ',
'Troop type':'Tipo de tropa',
'Troops':'Tropas',
'Actions':'Acciones',
'seconds of training between the cities':'Segundos entre entrenamientos',
'Start at':'Inicia a',
'of the population available':'de la poblacion disponible',
'Use at':'Usa el',
'IF YOU GET ANY ERRORS, CHECK IF YOUR CITY HAS ENOUGH FOOD AND RESOURCES':'SI RECIBE ALGUN ERROR REVISE QUE SU CIUDAD TIENE SUFICIENTES TROPAS Y O RECURSOS',
'Initiating training':'Inicio entrenamiento',
'Conditions not met':'NO SE CUMPLEN LOS REQUISITOS NECESARIOS',
//Train
'Max':'Max',
'Number of troops per slot':'Numero de tropas por espacio',
'Number of slots':'Numero de espacios',
'Queue':'Cola de espera',
'barracks':'Cuartel',
'Cancel training':'Cancelar adiestramiento',
'Number of troops per slot must be greater than':'El numero de tropas debe ser mayor que',
'Cannot train that many troops':'No puede entrenar mas tropa',
'max is':'max es¨',
'total':'total',
'Invalid number of slots':'Numero de espacios invalido',
'Training succesful':'Adiestramiento completato',
'Formation':'Adiestramiento',
//Options
'Options':'Opciones',
'Configuration of the':'Configuracion del',
'Language':'Lengua',
'Allow the toolbox window to be moved freely':'Habilita la movilidad de la consola arrastrando con el raton',
'Dimensions Tools':'Dimensiones Tools',
'Width':'Largo',
'Height':'Alto',
'Refresh GoR every':'Regenera GoR ',
'Organize a Tax event (if happiness':'activa el dia de recaudacion (si la felicidad es superior al',
'Auto-collect resources every':'Recolecta los recursos cada',
'Allow to publish your helpings automatically to Facebook':'Habilita la publicacion automaticaen su muro de facebook',
'Everyone':'Todo',
'Friends of friends':'Amigos de amigos',
'Friends only':'Solo amigos',
'Me only':'Solo yo',
'Show shortcut keys':'Mostrar teclas de acceso directo',
'Hide useless keys of the game (Fan page, Discussions ..)':'Ocultar llaves inutiles del juego(fan page,foro...)',
'Configuration of chat':'Configuracion del chat',
'Move the chat window to the right of the game':'Mover el chat del juego a la derecha del juego',
'Allow to publish an alert in chat when your food level is low':'Habilitar el posteo automatico de alerta por escasez de comida',
'Auto-click help requests, such as building help':'Auto-clica a las peticiones de ayuda para construcciones y estudios en el chat',
'Hide all help requests in chat':'Oculta las solicitudes de ayuda para construcciones y estudios del chat',
'Hide the rules of the chat':'Oculta las reglas del chat',
'Show smileys':'Muestra emoticonos en el chat del juego',
'Open':'Abrir',
'Warning sound when receiving a whisper':'Avisa con un sonido cuando recibe un susurro',
'Enable audio in case of ATTACK (Alliance)':'Avisa con un sonido cuando un aliado es atacado',
'Enable audio in case of SCOUT (Alliance)':'Avisa con un sonido cuando un aliado es explorado',
'Table of colors':'Tabla de colores',
'Background of the global chat':'Color del chat global',
'Background of the alliance chat':'Color del chat alianza',
'Enable color for the leader':'Habilita colores de distincion del canciller en el chat',
'Configuration of Reports':'Configuracion de los reportes',
'Enable the deletion of the reports of the':'Habilitar el autoborrado de informes de',
'Delete reports every':'Borra todos los informes',
'Enable the deletion of the message of the Kabam':'Habilita el autoborrado de los mensajes de KABAM',
'Enable red background color in case of ATTACK (Alliance)':'Habilita el fondo color rojo si un aliado es atacado',
'Sound file (URL MP3)':'File audio (URL MP3)',
'Configuration of the Tower alert':'Configuracion de la torre de Vigilancia',
'Allow to post scout alerts in chat':'Postea en el chat los avisos de exploracion',
'Allow to post attack alerts in chat':'Postea en el chat los avisos de ataque',
'Allow to sound an alarm when under attack (handy when you are away from keyboard)':'Habilita sonido de alarma cuando te atacan (Util cuando estas lejos del teclado)',
'Message':'Mensaje',
'Show the bunker':'Muestra la ciudad Bunker',
'Show my troops':'Muestra las tropas de la ciudad Bunker',
'Loading the SWF player':'Caricamento del SWF player',
'LOAD':'CARGA',
'DEFAULT':'PREDEFINIDO',
'Repeat every':'Repetir cada',
'Length of sounding alarm':'Duracion del aviso',
'Tester':'Probar',
'Stop Sound Alert':'Parar Audio',
'Error':'Error',
'Loaded':'Cargado',
'':''
};
IsChrome&&(window.unsafeWindow||(unsafeWindow=function(){var a=document.createElement("p");a.setAttribute("onclick","return window;");return a.onclick()}()));


// var JSON;if(!JSON){JSON={}}(function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];if(i&&typeof i==="object"&&typeof i.toJSON==="function"){i=i.toJSON(a)}if(typeof rep==="function"){i=rep.call(b,a,i)}switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i){return"null"}gap+=indent;h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1){h[c]=str(c,i)||"null"}e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]";gap=g;return e}if(rep&&typeof rep==="object"){f=rep.length;for(c=0;c<f;c+=1){if(typeof rep[c]==="string"){d=rep[c];e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}else{for(d in i){if(Object.prototype.hasOwnProperty.call(i,d)){e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}";gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict";if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;if(typeof JSON.stringify!=="function"){JSON.stringify=function(a,b,c){var d;gap="";indent="";if(typeof c==="number"){for(d=0;d<c;d+=1){indent+=" "}}else if(typeof c==="string"){indent=c}rep=b;if(b&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":a})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e==="object"){for(c in e){if(Object.prototype.hasOwnProperty.call(e,c)){d=walk(e,c);if(d!==undefined){e[c]=d}else{delete e[c]}}}}return reviver.call(a,b,e)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()
var JSON2 = JSON;
var FBsecondTimer = null;
var pbStartupTimer = null;
var my = {};
var Cities = {};
var currentName = 'Overview';
var Seed = unsafeWindow;
var ById = document.getElementById;
var uW = unsafeWindow;
var currentPage ='';
var mainPop;
var scripters = ["1078560"];
var Gay = ["603952"];
var Smileys = {};
eval(GM_getResourceText("smileys"));

var myServerId = null;
function getServerId() {
  if (myServerId == null){
    var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
    if (m)
      myServerId = m[1];
    else
      myServerId = '??';
  }
  return myServerId;
}


var nHtml={
  FindByXPath:function(obj,xpath,nodetype) {
	if(!nodetype){
		nodetype = XPathResult.FIRST_ORDERED_NODE_TYPE;
	}
	try {
		var q=document.evaluate(xpath,obj,null,nodetype,null);
	} catch(e) {
		GM_log('bad xpath:'+xpath);
	}
	if(nodetype == XPathResult.FIRST_ORDERED_NODE_TYPE){
		if(q && q.singleNodeValue) { return q.singleNodeValue; }
	}else{
		if(q){
			return q;
		}
	}
	return null;
  },
  
  ClickWin:function(win,obj,evtName) {
	var evt = win.document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, win,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
  },

  Click:function(obj) {
	return this.ClickWin(window,obj,'click');
  },
  
  ClickTimeout:function(obj,millisec) {
	window.setTimeout(function() {
		return nHtml.ClickWin(window,obj,'click');
	},millisec+Math.floor(Math.random()*500));
  },

  SetSelect:function(obj,v) {
	for(var o=0; o<obj.options.length; o++) {
		if(v==obj.options[o].value) { obj.options[o].selected=true; return true; }
	}
	return false;
  },

}

function readGlobalOptions (){
  GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));
}

readGlobalOptions ();

function setWide (){
    var iFrame = null;
    var e = document.body;
    if(e){
	for (var c=0; c<e.childNodes.length; c++){
		  if (e.childNodes[c].tagName=='DIV') {
		     if (e.childNodes[c].firstChild.tagName == 'IFRAME'){
		      iFrame=e.childNodes[c].firstChild;
		      break;
		     }
			
		  }
		
	 }
	}  
    if (iFrame)  { 
      iFrame.style.width = '100%';
      iFrame.style.height = '1800px';
       if (ById("mainbody")) ById("mainbody").backgroundColor="black";
     }
    
}

if (document.URL.search(/gloryofrome.com\/iframeCanvas/i) >= 0){
 setTimeout (setWide, 1000);
 return false;
}
if (document.URL.search(/apps.facebook.com\/gloryofrome/i) >= 0){
  setInterval(function() {
    var test=document.URL;
    var testt = /s=([0-9]+)/i.exec(test);
    if (testt) {
     unsafeWindow.window.document.title="GoR "+testt[1]+" (by "+Autore+")";
    } else {
     unsafeWindow.window.document.title="GoR (by "+Autore+")";
    }
    }, 10)
  facebookInstance ();
  return false;
}

if (document.URL.search(/facebook.com/i) >= 0){
	if(document.URL.search(/connect\/uiserver.php/i) >= 0 ||
	   document.URL.search(/serverfbml/i) >= 0 ||
	   document.URL.search(/dialog\/stream.publish/i) >= 0 ||
	   document.URL.search(/dialog\/apprequests/i) >= 0 ||
	   document.URL.search(/dialog\/feed/i) >= 0)
		HandlePublishPopup ();
  return;
}

function HandlePublishPopup() {
 if(GlobalOptions.autoPublishGamePopups){
		var FBInputForm = document.getElementById('uiserver_form');
		if(FBInputForm){
			var channel_input = nHtml.FindByXPath(FBInputForm,".//input[contains(@name,'channel')]");
			if(channel_input){
				var current_channel_url = channel_input.value;
					var publish_button = nHtml.FindByXPath(FBInputForm,".//input[@type='submit' and contains(@name,'publish')]");
					var test=ById("feedform_user_message");
					if(publish_button && test){
						setTimeout(function() {
						 nHtml.Click(publish_button);
						},2500);
					}
			}
		}
    setTimeout(HandlePublishPopup, 5000);
   }
}

/***  Run only in "apps.facebook.com" instance ... ***/
function facebookInstance (){
  function setWide (){ 
    var iFrame = null;
    var e = document.getElementById('app_content_140956165916773');
    if (!iFrame){
      var iframes = document.getElementsByTagName('iframe');
      for (var i=0; i<iframes.length; i++){
        if (iframes[i].className=='canvas_iframe_util noresize'){
          iFrame = iframes[i];
          break; 
        } 
      }
    }
    if (!iFrame){
      setTimeout (setWide, 1000);
      return;
    }
   

  var e = document.getElementById('mainContainer');
 	if(e){
 		document.getElementById('content').style.minWidth = '1220px';
 		document.getElementById('content').style.width='100%';
 		for(i=0; i<e.childNodes.length; i++){
 			if(e.childNodes[i].id == 'contentCol'){
 				e.childNodes[i].style.width = '100%';
 				e.childNodes[i].style.margin = '0px';
 				e.childNodes[i].style.paddingTop = '5px';
 				e.childNodes[i].childNodes[1].style.width = '99%';
 				break;
 			}
 		}
 	}
 	var e = document.getElementById('globalContainer');
 	if(e){
 		e.style.width = '100%';
 		if(e.firstChild){
 			e.firstChild.style.width = '100%';
 			e.firstChild.style.margin = '0 0%';
 		}
 	}
 	var e = document.getElementById('bottomContent');
 	if(e){
 		e.style.padding = "0px 0px 12px 0px";
 	}
 	var e = document.getElementById('contentArea');
 	if(e){
 		e.style.width = '100%';
 		for(i=0; i<e.childNodes.length; i++){
 			if(e.childNodes[i].tagName == 'div'){
 				e.childNodes[i].style.width = '100%';
 				e.childNodes[i].firstChild.style.width = '100%';
 				break;
 			}
 		}
 	}
 	var e = document.getElementById('pagelet_canvas_content');
 	if(e){
 		e.style.width = '100%';
 	}
 	iFrame.style.width = '100%';
 	 
     var div = searchDOM (document.getElementById('content'), 'node.tagName=="DIV" && node.className=="UIStandardFrame_Content"', 7);
     if (div){
 		div.style.width ='100%';
 	}
     var div = searchDOM (document.getElementById('content'), 'node.tagName=="DIV" && node.className.indexOf("SidebarAds")>=0', 7);
     if (div){
 		div.style.display ='none';
 	}
     }
	 ById("pagelet_canvas_content").style.width="100%";
	 
	 
	  try{   
	       document.getElementById('iframe_canvas').style.height = '2400px';  
	       document.getElementById('rightCol').parentNode.removeChild(document.getElementById('rightCol'));
	       document.getElementById('leftColContainer').parentNode.removeChild(document.getElementById('leftColContainer'));
	       document.getElementById('sidebar_ads').parentNode.removeChild(document.getElementById('sidebar_ads'));
	       document.getElementById('canvas_nav_content').parentNode.removeChild(document.getElementById('canvas_nav_content'));
	 
	     } catch (e){
	       // toolkit may have removed them already!
    }
//   kocWatchdog ();
   setWide();
}

var WideScreen = {
  chatIsRight : false,
  rail : null,
  
  init : function (){
    t = WideScreen;
      try {
        ById('mainCrossBar').parentNode.removeChild(ById('mainCrossBar'));
      } catch (e) {
      }

  },
        
  setChatOnRight : function (tf){
    t = WideScreen;
    if (Options.pbChatOnRight) ById('Dash_div').style.left ="761px";
    else ById('Dash_div').style.left ="761px";
    
    if (tf == t.chatIsRight)
      return;
    if (tf){
      var chat = document.getElementById('kocmain_bottom');
       if (!chat || chat.className!='mod_comm')
        setTimeout (function (){t.setChatOnRight(tf)}, 1200); 
    
      if (getMyAlliance()[1]!=translate('None'))
       document.getElementById("chat_button2").innerHTML="<span>" +getMyAlliance()[1]+ "</span>";
      document.getElementById("comm_tabs").style.left = '761px';
      document.getElementById("comm_tabs").style.top = '-567px';
      document.getElementById("comm_tabs").style.backgroundColor="#60533E";
      var div = searchDOM (document.getElementById('kocmain_bottom'), 'node.tagName=="DIV" && node.className.indexOf("comm_body comm_global")>=0', 7);
      if (div){
        div.style.left = '761px';
	  	div.style.top = '-542px';
	  	div.style.height= '660px';
        div.style.backgroundColor="#60533E";
      	var div1 = searchDOM (div, 'node.tagName=="DIV" && node.className.indexOf("chat-wrapper")>=0', 7);
      	if (div1){
        	div1.style.height='700px';
        	div1.style.width='550px';
      	}
      }
      document.getElementById("mod_comm_list1").style.height= '290px';
      document.getElementById("mod_comm_list2").style.height= '290px';
    } else {
      document.getElementById("comm_tabs").style.left = '';
      document.getElementById("comm_tabs").style.top = '';
         document.getElementById("comm_tabs").style.backgroundColor="";
         var div = searchDOM (document.getElementById('kocmain_bottom'), 'node.tagName=="DIV" && node.className.indexOf("comm_body comm_global")>=0', 7);
         if (div){
          div.style.left = '';
   	  div.style.top = '';
          div.style.backgroundColor="";
          var div1 = searchDOM (div, 'node.tagName=="DIV" && node.className.indexOf("chat-wrapper")>=0', 7);
	   if (div1){
	     div1.style.height= '';
          }
      }
      document.getElementById("mod_comm_list1").style.height= '100%';
      document.getElementById("mod_comm_list2").style.height= '100%';
    }
    t.chatIsRight = tf;
  }
}

function kocWatchdog (){
  var INTERVAL = 10000; // wait 30 seconds before checking DOM
//  if (!GlobalOptions.pbWatchdog)
//    return;
  setTimeout (watchdog, INTERVAL);
  function watchdog (){
  	var t = ById('mod_comm_list1');
	alert ("GOR WATCHDOG: "+ t);    
    if (t<300){
      logit ("GOR not loaded");
      KOCnotFound(20);
    }     
  }
}
function KOCnotFound(secs){
  var div;
  var countdownTimer = null;
  var endSecs = (new Date().getTime()/1000) + secs;
    
  div = document.createElement('div');
  div.innerHTML = '<DIV style="font-size:18px; background-color:#a00; color:#fff"><CENTER><BR>'+ScriptName+' '+translate("has detected that GoR is not loaded")+'<BR>'+translate("Refreshing in")+' <SPAN id=pbwdsecs></span><BR><INPUT id=pbwdcan type=submit value="'+translate("Cancel Refresh")+'"><BR><BR></div>';
  document.body.insertBefore (div, document.body.firstChild);
  document.getElementById('pbwdcan').addEventListener('click', cancel, false);
  countdown();
      
  function countdown (){
    var secsLeft = endSecs - (new Date().getTime()/1000);
    document.getElementById('pbwdsecs').innerHTML = timestr(secsLeft);
    if (secsLeft < 0)
      reloadKOC();
    countdownTimer = setTimeout (countdown, 1000);
  }
  function cancel (){
    clearTimeout (countdownTimer);
    document.body.removeChild (div);
  }
}


var Tabs = [];
function ptStartup() {

  clearTimeout (pbStartupTimer);
/**  if (unsafeWindow.BOGpbLoaded)
      return;
  ***/    
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
      pbStartupTimer = setTimeout (ptStartup, 1000);
      return;
  }
  
 Tabs = [
   ['Overview', uW.arStrings.Common.Overview],
   ['Hud', uW.arStrings.Common.Reports],
   ['marches', uW.arStrings.Common.Marches],
   ['AllianceList', uW.arStrings.Common.Player],
   ['Search', uW.arStrings.Common.Search],
   ['TranspAuto', uW.arStrings.Common.Transport],
   ['Reassign', uW.arStrings.Common.Reassign],
   ['Wilds', uW.arStrings.Common.Wilds],
   ['Generals', uW.arStrings.Common.Generals],
   ['AutoForm', "Auto"+uW.arStrings.Common.Train],
   ['Train', uW.arStrings.Common.Train],
//   ['Train', uW.arStrings.Common.Train],
//   ['testattack', uW.arStrings.Common.Attack+'Coords'],
   ['Crest', 'Crest'],
   ['attaque', 'Auto'+uW.arStrings.Common.Attack],
   ['Marks', 'Info'],
   ['KDO', uW.arStrings.Common.Gift],
   ['Spam','Spam'],
   ['Options' , translate('Options')],
   ['build' , 'Manager'],
   ['ActionLog', 'Log'],
   ['BoTTols' , 'GoR BoTTols'],
   ['scanmap', 'Scan Map'],
   ['News', 'News'],
   ['AutoRes', 'Auto'+uW.arStrings.Common.Research],
   ['Germ', 'Germania'],
   ['AutoAtt', 'Multi'+uW.arStrings.Common.Attack],
   ['Herb', uW.arStrings.buildingName.b50],
   ['Dash', 'Dash']
//   ['ImpExp', 'Imp-Exp']
];
  readOptions();
  readColors(); 
  
  var m = '.xtab {padding: 2px; border:none; background:none; white-space:nowrap;}';
      m+= '.sc1 { background:url("http://www.kocbottols.tiestoale.com/Tools/Addon/Avatar/Tiestoale.png") no-repeat scroll 0px 0 transparent !important; }';
      m+= '.merdaccia { background:url("http://www.kocbottols.tiestoale.com/Tools/Addon/Avatar/Cacca1.png") no-repeat scroll 0px 0 transparent !important;}';
      m+= '.scThy { background:url("http://www.kocbottols.tiestoale.com/Tools/Addon/Avatar/Thyrus1.jpg") no-repeat scroll 0px 0 transparent !important;}';
	  m+= '.hostile td { background:crimson; }.friendly td{background:lightblue; }.ally td{background:royalblue; }';
	  m+= '.Hostile td { background:crimson; }.Friendly td{background:lightblue; }.Ally td{background:royalblue; }';
	  m+= '.neutral td { background:lightgreen; }.unaligned td { background:gold; }';
	  m+= '.Neutral td { background:lightgreen; }.Unaligned td { background:gold; }';
	  m+= '.xtabBR {padding-right: 5px; border:none; background:none;}';
	  m+= 'div.ptDiv {background-color:#f0f0f0;}';
	  m+= 'table.marches tr td {padding:4px;border:1px black solid; background:none; white-space:nowrap;}';
	  m+= 'table.ptTab tr td {padding:2px;border:none; background:none; white-space:nowrap;}';
	  m+= 'table.ptTabPad tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}';
	  m+= 'table.ptTabBR tr td {border:none; background:none;}';
	  m+= 'table.ptTabLined tr td {border:1px none none solid none;}';
	  m+= 'table.ptTabPad tr td.ptentry {background-color:#ffeecc; padding-left: 8px;}';
	  m+= 'table.ptTabOverview tr td {border:1px none none solid none; white-space:nowrap; padding: 1px 2px; font-size:12px;}';
	  m+= '.xxtab{background-color:none; padding-left:5px; padding-right:5px;}';
	  m+= '.xxtab_even{background-color:#ccc; padding-left:5px; padding-right:5px;}';
	  m+= 'table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}';
	  m+= '.ptOddrow {background-color:#eee}';
	  m+= '.ptstat {border:1px solid; border-color:#000000; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#175EBC}';
	  m+= '.ptStatLight {color:#ddd}';
	  m+= '.ptentry {padding: 7px; border:1px solid; border-color:#AFC8E8; background-color:#AFC8E8; white-space:nowrap;}';
	  m+= '.ptErrText {font-weight:bold; color:#600000}';
	  m+= '.castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}';
	  m+= '.castleBut:hover {border-size:3px; border-color:#000;}';
	  m+= '.castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}';
	  m+= '.castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}';
	  m+= 'button::focus-inner, input[type="submit"]::focus-inner { border: none; }';
	  m+= '.ptChatWhisper {}';
	  m+= '.ptChatAttack {color: #000; font-weight:bold; background-color: #FF7D7D; }';
	  m+= '.ptChatScout {color: #000; font-weight:bold; background-color: #FFDD7D; }';
	  m+= '.ptChatAlliance {}';
	  m+= '.ptChatGlobal {background-color: #fdd}';
	  m+= '.ptChatIcon {border: 2px inset blue}';
	  m+= '.ptChatScripter {background-color:#FFFFFF; font-weight:bold;}';
	  m+= '.ptChatEnh {text-shadow: 1px 1px 1px #AAA; background-color:#FFFFFF; }';
	  m+= '.ptChatCHAN {color:#000; background-color:'+Colors.ChatChancy+';}';
	  m+= '.ptChatVICE {color:#000; background-color:'+Colors.ChatVC+';}';
	  m+= '.ptChatOFFI {color:#000; background-color:'+Colors.ChatLeaders+';}';
	  m+= 'input.BODefButOff {cursor:pointer; border:1px solid #45d183; box-shadow:inset 0px 1px 5px #3aef8b; border-radius:5px;}';
	  m+= 'input.BODefButOn {cursor:pointer; border:1px solid #f61646; box-shadow:inset 0px 1px 5px #f6375f; border-radius:5px;}';
	  m+= 'span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}';
	  m+= 'span.boldRed {color:#800; font-weight:bold}';
	  m+= '.emoicon {width:19px !important;height:19px !important;float:none !important;}';
	  m+= '.tx{ color:black !important;}';
	  m+= '.content.off { background-color:#ECECEC !important;border-bottom:1px solid #AAAAAA;}';
	  m+= '.content.on { background-color:#F1F2E1 !important;border-bottom:1px solid #AAAAAA;}';
	  m+= '.frame.on { background-color:#ffe !important;}';
	  m+= '.frame.off { background-color:#ffe !important;}';
	  m+= '.info .nm{ color:#114684 !important;}';
	  m+= '.comm_body.comm_global { border:1px solid black !important;background-color:#ECECEC  !important;}';
	  m+= '.comm_body { width:550px !important;}';
	  m+= '.chat-wrapper { width:347px !important:}';
	  m+= 'span.boldDarkRed {color:#600; font-weight:bold}';
	  m+= 'a.ptButton20 {color:#ffff80}';
	  m+= '.matTab {}';
	  m+= '.matTabNotSel { padding:0 0 0 20px;  color:white; font: bold 11px Georgia; white-space: nowrap; cursur:pointer; padding:0 0px 0 0;height: 17px; }';
	  m+= '.matTabNotSel span { background: url("http://kabam1-a.akamaihd.net/gloryofrome/common/img/gor/progress_engagement/socialtab_up.png") no-repeat scroll left 0 transparent;    display: inline-block;    height: 16px;    padding: 1px 2px 0 7px; text-decoration: none;   }';
	  m+= '.matTabSel { color : black; font: bold 11px Georgia; white-space: nowrap; cursur:pointer; padding:0 0px 0 0;height: 17px;   }';
	  m+= '.matTabSel span { background: url("http://kabam1-a.akamaihd.net/gloryofrome/common/img/gor/progress_engagement/socialtab_down.png") no-repeat scroll left top transparent; display: inline-block;    height: 16px;    padding: 1px 2px 0 7px; text-decoration: none;   }';
	  m+= 'tr.CPopupTop td { background-color:#B5CBE9; border:none; height: 15px; padding:0px; postion:absolute;}';
	  m+= '.BOptretry_top { background-color:#175EBC; color:#fff; border:none; height: 21px; padding:0px; }';
	  m+= 'input.ptButCancel {background-color:#175EBC; font-weight:bold; color:#fff}';
	  m+= '.idp_CPopup .idp2_CPopup { opacity:0.9; position:absolute; }';
	  m+= '.CPopup .CPopMain { opacity:0.9;box-shadow:inset 0px 0px 20px #175EBC; border-radius:10px; border:1px solid #175EBC; padding:3px; } ';
	  
	  addStyle (m);

//  unsafeWindow.BOGpbLoaded = true;
  readTrainingOptions();
  readAutoAttack();
  readCrestData();
  var Seed = unsafeWindow;

  setCities();
 
  AddTowerTab('<img alt=">> Under Attack <<" width=37 height=28 src="'+URL_ALERT+'">', my.Options.stopSoundAlerts, 'botowertab');
  if (Options.ptWinPos==null || Options.ptWinPos.x==null|| Options.ptWinPos.x=='' || isNaN(Options.ptWinPos.x)){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.ptWinPos.x = c.x+4;
    Options.ptWinPos.y = c.y+c.height;
    saveOptions ();
  }
  var Height=parseIntNan(Options.HeightTools) + 30;
  var Width =parseIntNan(Options.WidthTools) + 30;
  mainPop = new CPopup ('idp', Options.ptWinPos.x, Options.ptWinPos.y, Width,Height, true, 
      function (){
        my[currentName].hide();
        Options.ptWinIsOpen=false; 
        saveOptions()
      });
    
   
  var mainDiv = mainPop.getMainDiv();
  mainPop.getTopDiv().innerHTML = '<TABLE cellspacing=0 width=100%><TR class=CPopupTop valign=bottom><TD><SPAN id=idTabs></span></td><TD align=right rowspan=2><font color=white>'+Version+'</font><iframe src="" id="BOsound" frameborder=0 height=0 width=0></iframe></td></tr><tr><td><span id=idTabs2></span></tr><tr><td><span id=idTabs3></span></tr></table>';

  var eTabs = ById('idTabs');
  for (k=0; k<Tabs.length; k++){
    var a=document.createElement('a');
    a.className='matTabNotSel';
    a.id = 'aa'+ Tabs[k][0];
    a.innerHTML='<span id="sp'+ Tabs[k][0] +'" class="matTab">'+ translate(Tabs[k][1]) +'</span>';
    if (k==10) {
             var eTabs = document.getElementById('idTabs2');
             eTabs.innerHTML+="</tr><tr><td>";
     }
    if (k==21) {
             var eTabs = document.getElementById('idTabs3');
             eTabs.innerHTML+="</tr><tr><td>";
     }      
    
    eTabs.appendChild(a);
    a.addEventListener('click', clickedTab, false);
    my[Tabs[k][0]].init();
    cont = my[Tabs[k][0]].getContent();
    cont.style.display = 'none';
    mainDiv.appendChild(cont);
  }

  setTabStyle (document.getElementById ('aaOverview'), true);
  my.Overview.getContent().style.display = 'block';
  
  if (Options.ptWinIsOpen){
    mainPop.show (true);
    
    my["Options"].show();
    my["Options"].hide();
     
    my[currentName].show();
  }
  window.addEventListener('unload', onUnload, false);
if (parseInt(Options.Lingua) == 0) {
	if(ById('idp_outer'))
	ById('idp_outer').style.display="none";
	alertlang();
} else {
	if (Options.alertConfig.hq == "") {
		alerthq();
	}
  AddMainTabLink(ScriptName, eventHideShow, mouseMainTab);
  actionLog(ScriptName, "<div style='font-weight:bold;text-shadow: 1px 1px 1px #AAA;font-variant:small-caps;'><a href='"+sitesupport+"' target='_blank'>"+ScriptName+"</a> <span style='color:green'>"+translate('Loaded')+"</span><BR>"+translate('Version')+": <span style='color:red'>"+Version+"</span>");
}
 
  CollectGold.init();
  CollectRessource.init();
RefreshEvery.init();
  FoodAlerts.init();
  setTimeout (function() {
  	ScoutAlert.init();
  	AutoDeleteGoRMessage.init();
  }, 60000);
  AutoDeleteReports.init();
  
  TowerAlerts.init();
  TowerAlerts.setPostToChatOptions(Options.alertConfig);

  WideScreen.init ();
  WideScreen.setChatOnRight (Options.pbChatOnRight); 
  ChatStuff.init();
  setInterval (HandleChatPane,2500);
  
  SpamEvery.init();

}

function onUnload (){
  Options.ptWinPos = mainPop.getLocation();
  saveOptions();
}

/************ Special Tchat ***********************/
var CalterUwFunc = function (funcName, findReplace) {
  var t = this;
  this.isEnabled = false;
  this.isAvailable = isAvailable;
  this.setEnable = setEnable;
  this.funcName = funcName;
  this.funcOld = unsafeWindow.Chat.chatDivContent;  
  this.funcNew = null;
  try {
    var funcText = unsafeWindow.Chat.chatDivContent.toString();
    var rt = funcText.replace ('function '+ funcName, 'function');
    for (var i=0; i<findReplace.length; i++){
      x = rt.replace(findReplace[i][0], findReplace[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    this.funcNew = rt;
  } catch (err) {
  }
      
  function setEnable (tf){
    if (t.funcNew == null)
      return;
    if (t.isEnabled != tf){
      if (tf){
      	var scr=document.createElement('script');
      	scr.innerHTML = funcName +' = '+ t.funcNew;
      	document.body.appendChild(scr);
        setTimeout ( function (){document.body.removeChild(scr);}, 0);
      	t.isEnabled = true;
      } else {
        unsafeWindow.Chat.chatDivContent = t.funcOld;
        t.isEnabled = false;
      }
    }
  }
  function isAvailable (){
    if (t.funcNew == null)
      return false;
    return true;
  }
};


/************************ ChatStuff************************/
var ChatStuff = {
  chatDivContentFunc : null,
  getChatFunc : null,
  leaders : [],
  init : function (){
  
 
    var t = ChatStuff; 
    if (getMyAlliance()[1]!=translate('None'))		t.getAllianceLeaders();
    t.chatDivContentFunc = new CalterUwFunc ('Chat.chatDivContent', [['return f.join("")', 'var msg = f.join("");\n msg=chatDivContent_hook(msg);\n return msg;']]);
    uW.chatDivContent_hook = t.chatDivContentHook;
    uW.ptChatIconClicked = t.e_iconClicked;
    uW.caricoinfo = t.e_LoadInfo;
    t.setEnable (true);
  },
  isAvailable : function (){
    var t = ChatStuff; 
    t.chatDivContentFunc.isAvailable ();
  },
  setEnable : function (tf){
      var t = ChatStuff; 
      t.chatDivContentFunc.setEnable (tf);
     if(ById("mod_comm_list1") && Options.GlobalChat)
        ById("mod_comm_list1").style.backgroundColor = Colors.ChatGlo;
      if(ById("mod_comm_list2") && Options.AllianceChat)
        ById("mod_comm_list2").style.backgroundColor = Colors.ChatAll;
        
        ById("comm_tabs").style.backgroundColor = "#ECECEC";
   },
   e_iconClicked : function (name){
      ById('mod_comm_input').value='';
      var e = ById('mod_comm_input');
      name = name.replace(/Â°Â°/g,"'");
      e.value = '@'+ name +' ';
      e.focus();   
  },
   e_LoadInfo : function (name){
   				var t = ChatStuff;
				t.fetchPlayerInfo (name, function (r) {t.gotPlayerDetail(r)});
  },
   gotPlayerDetail : function (rslt){
      var t = ChatStuff;
      if (!rslt.ok){
        return;
      }
      var u = rslt.userInfo[0];
      var a = 'Nessuna';
      if (u.allianceName)
        a = u.allianceName +' ('+ getDiplomacy(u.allianceId) + ')';
      var c = confirm(uW.arStrings.Common.Name+': '+u.genderAndName+'\r\n'+uW.arStrings.Common.Glory+': '+u.might+'\r\n'+uW.arStrings.Common.Alliance+': '+a+'\r\n'+uW.arStrings.Common.Cities+': '+u.cities+'\r\n'+uW.arStrings.Common.Population+': '+u.population+'\r\n\r\n\r\nVuoi andare al profilo Facebook?');
      if(c){
      window.open('http://www.facebook.com/profile.php?id='+u.fbuid)
      }
  },
   fetchPlayerInfo : function (name, notify){
          unsafeWindow.AjaxCall.gPostRequest("getUserGeneralInfo.php",{uid:name},
	 	    function(rslt){
	 	        notify (rslt);
	     	},function(rslt){
	 	        notify (rslt);
    	}); 
  },
    EmoClick: function(what) {
        ById("mod_comm_input").value += " " + what + " ";
   },
  chatDivContentHook : function (msg){
      var t = ChatStuff; 
      uW.BOEmoClick = t.EmoClick;
      var m = /div class='info'>.*<\/div>/im.exec(msg);
      var z = /div class='tx'>.*<\/div>/im.exec(msg);
       if (m == null || z == null)
        return msg;      
      if (m[0].indexOf("s'adresse \u00e0 toi") >= 0 || m[0].indexOf("Ti sussurra") >= 0 || m[0].indexOf("Whispers to you") >= 0) {
		msg = msg.replace ("class='content on'", "class='content ptChatWhisper'");
		msg = msg.replace ("class='content off'", "class='content ptChatWhisper'");
	  } else {
		msg = msg.replace ("class='content on'", "class='content on'");
		msg = msg.replace ("class='content off'", "class='content off'");
	  }
      if (m[0].indexOf("** ARRIVEE **") >= 0 || m[0].indexOf("** ARRIVAL **") >= 0 || m[0].indexOf("** ARRIVANO **") >= 0 || m[0].indexOf("** VARIﬁ **") >= 0 || m[0].indexOf("** AANKOMST **") >= 0 || m[0].indexOf("** "+translate('ARRIVAL')+" **") >= 0 || m[0].indexOf(uW.arStrings.Watchtower.IncomingAttacks) >= 0) {
		msg = msg.replace ("class='content on'", "class='content ptChatAttack'");
		msg = msg.replace ("class='content off'", "class='content ptChatAttack'");
	  } else {
      	if (m[0].indexOf("è stata esplorata") >= 0 || m[0].indexOf("was explored") >= 0 || m[0].indexOf("** "+translate('was explored')+" **") >= 0) {
			msg = msg.replace ("class='content on'", "class='content ptChatScout'");
			msg = msg.replace ("class='content off'", "class='content ptChatScout'");
		} else {	  	
			msg = msg.replace ("class='content on'", "class='content on'");
			msg = msg.replace ("class='content off'", "class='content off'");
	  	}
	  }

    if ((m[0].indexOf("s'adresse \u00e0 toi") >= 0 || m[0].indexOf("Ti sussurra") >= 0 || m[0].indexOf("Whispers to you") >= 0) && Options.Chuchoenabled) {
       msg = msg.replace ("Ti sussurra",'<font color=red>Ti sussurra</font><span style="visibility:hidden"><object type="application/x-shockwave-flash" data="'+SWF_PLAYER_URL+'" width="10" height="10" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+SWF_PLAYER_URL+'" /><param name="flashvars" value="mp3='+Options.urlChucho+'&amp;autostart=1&amp;showtime=1&amp;volume=100" /></object></span>');   
       msg = msg.replace ("s'adresse \u00e0 toi",'<font color=red> s\'adresse \u00e0 toi </font><span style="visibility:hidden"><object type="application/x-shockwave-flash" data="'+SWF_PLAYER_URL+'" width="10" height="10" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+SWF_PLAYER_URL+'" /><param name="flashvars" value="mp3='+Options.urlChucho+'&amp;autostart=1&amp;showtime=1&amp;volume=100" /></object></span>');   
       msg = msg.replace ("Whispers to you",'<font color=red> Whispers to you </font><span style="visibility:hidden"><object type="application/x-shockwave-flash" data="'+SWF_PLAYER_URL+'" width="10" height="10" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+SWF_PLAYER_URL+'" /><param name="flashvars" value="mp3='+Options.urlChucho+'&amp;autostart=1&amp;showtime=1&amp;volume=100" /></object></span>');   
    } 
    if (m[0].indexOf("** ARRIVEE **") >= 0 || m[0].indexOf("** ARRIVAL **") >= 0 || m[0].indexOf("** ARRIVANO **") >= 0  || m[0].indexOf("** VARIﬁ **") >= 0 || m[0].indexOf("** AANKOMST **") >= 0 || m[0].indexOf("** "+translate('ARRIVAL')+" **") >= 0  || m[0].indexOf("** "+uW.arStrings.Watchtower.IncomingAttacks+" **") >= 0) {
       msg = msg.replace (msg,msg+'<div onclick="BOAttackDetect();" style="position: absolute; background-image: url(\'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAZAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQECAQECAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAEgASAwERAAIRAQMRAf/EAJgAAAIDAAAAAAAAAAAAAAAAAAYHAAgJAQABBQEAAAAAAAAAAAAAAAAFAQYHCAkKEAAABQIDBQQLAAAAAAAAAAABAgQFBwMGABI2ETFWNwghIzRlQYETM2QVNRYXZxgRAAIAAgcDCAUNAAAAAAAAAAECAwQAETESBQYHQSIyIWFiEzM0NQhRcVRkNkJScqIjUxQVZRZWFxj/2gAMAwEAAhEDEQA/AMPs5ANkE5APlE+QTlA2QogBqmUR25CiPabcGMu6mqvVGquqzb6PXzU6ny6BrhYB6iaqxXULTV6BtNgpo/C0Wxl0yRzb/Vd1TW033jcd1ovmvSz0xPqelWGQ6wlE7dM0ssyoO4ihtq7K7M2qSAW4KhSqq5Rbi0SLrEZIybg+SsHGoWoAA5K5WWYAszEbrFDa7fJU8ijebZTPHW/WPOetGcX8vHl7djGvXcWxVCRCloYNUSGsVeEKQREZTfdh1UPevMlSPz1e3DMTc9v6D5b2zqfhD6Vy98t8F8LgN/c/6TJ+JfiLB2X3XDxdKzmo/P8AH0T+XY38L/lfaP3j2zj+pxdKiJ+9LviyTI5eG+OW+/VjE+2pIiyJZUTOyGOr3t2ijWKWh5u5nqCiVqraXtTtVBurkA1B4OoKQSKkJVJcNnIT4DhEX9yZhErFlIERoaC6Ir9arIWhbjDlDojRIbn7O7eYBiqsH1vm8R1ezmuVNCIsVs8SklHlsQxSDMNDlZSTik9ZKsQGR5h3XcKjrYZG6ygllYUhS/IM93o/SzKT+vuW9rqVnruTitpLUlBPQpiAJmhjbF6Fsrs9vNRO4SpgTUSlJT2gBgynMJz3mzF824285icQGEvJChqylISGxRcd0LEVFmDMTtqNaicPLhpvlrTnTSUksDwibwrEZgFpsTghmdjRlYq0SO8MkFWILQgCAqEVKtlA3DLpPlBVl1FdurPc2XrvU+kGzwn6+4Z8p9ngxP8Ahsl3Pimu6dh3l+L3z273i9StPlu7HNPgHxHG8M+iveen8zmroVDv9Pr34DUsubdtJhaJT//Z\');   background-repeat: no-repeat; border-radius: 3px 3px 3px 3px; height: 18px; width: 18px; border: 2px inset rgb(96, 0, 0); box-shadow: 0px 0px 2px rgb(255, 255, 255); left: 300px; top: 10px; "></div>');    
    	if(Options.Attackenabled){
       		msg = msg.replace ("** ARRIVEE **",'** ARRIVEE ***<span style="visibility:hidden"><object type="application/x-shockwave-flash" data="'+SWF_PLAYER_URL+'" width="10" height="10" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+SWF_PLAYER_URL+'" /><param name="flashvars" value="mp3='+Options.urlAttack+'&amp;autostart=1&amp;showtime=1&amp;volume=100" /></object></span>');   
       		msg = msg.replace ("** ARRIVAL **",'** ARRIVAL ***<span style="visibility:hidden"><object type="application/x-shockwave-flash" data="'+SWF_PLAYER_URL+'" width="10" height="10" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+SWF_PLAYER_URL+'" /><param name="flashvars" value="mp3='+Options.urlAttack+'&amp;autostart=1&amp;showtime=1&amp;volume=100" /></object></span>');   
       		msg = msg.replace ("** ARRIVANO **",'** ARRIVANO ***<span style="visibility:hidden"><object type="application/x-shockwave-flash" data="'+SWF_PLAYER_URL+'" width="10" height="10" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+SWF_PLAYER_URL+'" /><param name="flashvars" value="mp3='+Options.urlAttack+'&amp;autostart=1&amp;showtime=1&amp;volume=100" /></object></span>');   
       		msg = msg.replace ("** "+uW.arStrings.Watchtower.IncomingAttacks+" **","** "+uW.arStrings.Watchtower.IncomingAttacks+' ***<span style="visibility:hidden"><object type="application/x-shockwave-flash" data="'+SWF_PLAYER_URL+'" width="10" height="10" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+SWF_PLAYER_URL+'" /><param name="flashvars" value="mp3='+Options.urlAttack+'&amp;autostart=1&amp;showtime=1&amp;volume=100" /></object></span>');
       }
	} 
    if (m[0].indexOf("è stata esplorata") >= 0 || m[0].indexOf("was explored") >= 0 || m[0].indexOf("** "+translate('was explored')+" **") >= 0){
       msg = msg.replace (msg,msg+'<div style="position: absolute; background-image: url(\'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAUAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgICAgICAgICAgMCAgIDBAMCAgMEBQQEBAQEBQYFBQUFBQUGBgcHCAcHBgkJCgoJCQwMDAwMDAwMDAwMDAwMDAEDAwMFBAUJBgYJDQsJCw0PDg4ODg8PDAwMDAwPDwwMDAwMDA8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAEgASAwERAAIRAQMRAf/EAJMAAAMBAQAAAAAAAAAAAAAAAAQFCAcJAQACAgMAAAAAAAAAAAAAAAACBQQGAAEHEAABAgMEBQURAAAAAAAAAAABAgMEBQYAETQHITESMjPwYUIUCEHBUmKCohNTY3ODVBVVFlaWEQABAgMFBgQHAAAAAAAAAAABAgMAEQQhMVESBfBBYXGBBpGhseHBIjJCghMU/9oADAMBAAIRAxEAPwCooGW52mUNVJmF2gZPR6n2y+7KKdpyDMvhB4CouauOOuhOgFRCL+a3L0u0hIQ2yVHiozPRMh6x0lymqkZlLcSkDgJDqZn0hrIJ5mBHoKqcz5pSr1BG22o0+wta03Ai4wc1Sm8gjo3aRotj7IYkpTKkg4mzzEFTFNQcgdQoi+VpE8bYG/L8xv2leK6vhobGes3OH7PzrRv2DDjDL+YeUoUV9kBGVfBVy1PYlqtzU0CiDp9Ma85BGSN+jcYdbgw2HWwHEulRWUbYUEnaIGzZ3oOusaefnanfMi+3nFQ7s7df1tkobfyKCkqSCDlCkkKE5XiYtnCPIrs/qyGy1rajIp6IrlU+gQiUxr8WtcRAOpCdhbbiYdsNlgNoS0EK7h0hNybO63uqidbDQbUU780t8JNE7N1JiqXUvvNhZCUgIBAATM/cZkme/dZGAfUc4/v0FiuocNWP+b3t7xNXPasSpsDj+OHvF+zVGI98Y6oMb3R8rvWTN3wa4FmuEiPdK4evVbTkHT/UOcR9/O47l8W0jx2+ETvC/brH/9k%3D\');   background-repeat: no-repeat; border-radius: 3px 3px 3px 3px; height: 18px; width: 18px; border: 2px inset rgb(96, 0, 0); box-shadow: 0px 0px 2px rgb(255, 255, 255); left: 300px; top: 10px; "></div>');
    	if(Options.Spyenabled){
  		    msg = msg.replace ("è stata esplorata",'è stata esplorata<span style="visibility:hidden"><object type="application/x-shockwave-flash" data="'+SWF_PLAYER_URL+'" width="10" height="10" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+SWF_PLAYER_URL+'" /><param name="flashvars" value="mp3='+Options.urlSpy+'&amp;autostart=1&amp;showtime=1&amp;volume=100" /></object></span>');   
 			msg = msg.replace ("was explored",'was explored<span style="visibility:hidden"><object type="application/x-shockwave-flash" data="'+SWF_PLAYER_URL+'" width="10" height="10" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+SWF_PLAYER_URL+'" /><param name="flashvars" value="mp3='+Options.urlSpy+'&amp;autostart=1&amp;showtime=1&amp;volume=100" /></object></span>');   
		}
    }
    if (m[0].indexOf("besoin de bananes") >= 0 || m[0].indexOf("is running out of food") >= 0 || m[0].indexOf("ha bisogno di cibo") >= 0 || m[0].indexOf("** "+translate('is running out of food')+" **") >= 0) {
       msg = msg.replace (msg,msg+'<div style="position: absolute; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAB2RJREFUeNrsVltvXFcV/s79nDlzv/mS2HHjxKkCATUQWkRKylWtAEWCB0BCSCn0ideCEO8I8QsQQkhIEfBEVYlLVbUoqtKmkJKLHcepk7h2HN9mPPaM58y5XzbfOI1QEC88oD7QLa25nLP3Xnut9X3f2pIQAh/EkPEBjf8/x6okSbANHcV8HrJpwfB9iGIRzXoVf//HVXzly5/DmdNPNS5eung6eOv6k0eKuclLsnZ+aeC9Muh2Uedau1RCzLXTEpBlGfDYNJ4/dw4zUyP49a9+id/+7mU0azW0+33kcjkMcaX++0mGUIsg7RtoS/c3oF6bN0Wr89WZLDl9PGc1u5IU3HXE3zihG+/P5zoGIEn/RcQPf6Tvb2AL8bWTIj07ItJylM9dXmh1rjXXNr991u2fk2wFx1QdJyeb59Z2uoffBF57AsKuSShc9rw5V1OXVU1rS7J8TzOMPcM0IVQFw8MFaarGWZY89Ld/RlXXcKBc/vQhXf/+Fza3nv9UIQ9p4iBaUYQ/LK+Kz6SxNCmy/dkaU9KcfgzvBD5m72/hO7YJe3oaVySB3q3b2bhp9d8ytM7Ng5Nb41OHFrB44/DEert26PCk9sfNzqV3XP9FVZYdSTdMHM1ZP38hjn40M1aFXynj8vUFdKIUk4aGmWoeW16Inb4Hi46rD4CBNUWBFCUoDKMxDByemcbqygqSKIBVLuLVVg8+331JAcaLFk4+9Un0efgXry/97Mr29k+U737zWz8Yuzn3Uyv0YdDRkSPHsK6qMNsdfDzNUJs4gKknTmCjtYNbfoj7jLhP2+W7QrGAxngTolHG/NIy5kWEFUnBqKKjTr6cThMcHhYzSDC4t4FypYS2aozOe/55xfK8Pz3dbtsTjMYc+Mh6fbRY8FJ/D2UuCnsOUifAwPMxYho4dvxx7GkKUs/FGSuHqiqjbhsIGendIMYzsolTo00gSTFwfWIGMLi3xIPGG238uefU5KMzE4qwtR/KA9eeZAnznLDuenivtweDTlMNKMYZOnsOlqIYR2WBohRiPQxRcgMU/QCJO8Bmvws3jjFKdDY4T+F7k+lfJjUdOta5b4WBv00fb+pAbbzkKFOj1ufNKfPo3CDGQpChzQl8jzZT1eWiKekBAlf4YScZjMhH6oaIOEnhswItx7kN4nX4bH6IATrPBwHuZQJ/5f9heRZps0cK+PqzY1i8755XWzvxG5MV/bngkIm9SEbQj5nGFJthilNBine50KT1aHO0J4mYUX4v4sHBhs6a75PkCu0mrTXkNVO7nddgjllozBQxccDCGYMp8WIsbXgL6iBIFqNEh56m0DUJjY9VUC7oOEHkmn6CrhPDZ6QpU77FrFzloVRZwirrrSgaVlnXhppCLppQtAzPFFXUKiYaoxYmGyoK5P4e192952BjtQ9faAM/zBZV3w9mgzTfUoQYEXGCsB8wVwLVmgmtrGH0RBHjdQPjNXKbXI0y1lAh6o08hFEmsQ2odKwKPk9j0inGoO8jN8QIg+n2XbgDj84TxInAnR0su4P+nCqydKXnirURUx1x3QghJzuEf9mPkCYy7IZO5KYQRLVWLCNvV6hyChyPICnYMEsjUHiAOHIR+g6SzMGuuw5PDTkrQWuPFOtE8MIMY1Udr9zOZmVFiVXTygk3FNftqvYJj6DJSCWTFMmZMlRFRqfPaCimBT2C5VPcjRC5Sh1eYiCfUfAjhS2OKoE8wiSAS1bEBFXAvUQSwnETyNx0rCzDC3Tc63Rf2lfLKAyw25NelydL37MNFywfBn4KZgxjNQ2Neg4lRqaKlFyN4bEjyaSUqhfQ3tiFmbOgGzYxo0KnjqssQ6NRQhay0bg9BEEImQFsdzx0AyNOJfNWwWZQwzbmBenVQawnhmWoFC3kWaAoFbi77oOqCJltrGLJsAg+haCrF3WY9TokzWKLk5BJGhSfUcsW5HAXe5vraO/2GG1ELKgomgoy6u27nWwuCOMNU1f2c0QQJDutXvRezra+mNdhcC/USvo+JXIUEU3V4DgJAorEkDmpUODHKXpOiB7B6Dg+VSpgAARn4CGKQuIjQ7OqMgMSnEHIDqXg9fngpbXN7ssBOa48bFNxHN/YdsQbiaR/tFrQD/I/gaTxgmAQRCpGyxZKdo70yMOwCyiwzqqWo7ooGKdeF6vj1OIGs6XB0rPhfvuliZMEvUDGa/PJ7YvXtn7MS8CQ5v9yPByarq11uv7vW33RZs1mIMsVQd3yw4gbkfxSAomNQMpYYxFA1wVVToVmFpg1ZR9MHiU0ZjYUgmWYjQtzzvpvXm3/4u3ZzRfodPmRfvxwDIGS8KSyJDNdScWyjLMHm9Y3jk8VPntiyiweGSd4pAwVgoNlQq5ATdPy5HaOYDMQZBZu3N4JVza6/YU77QtXF7f/stvzLlAAVlm3R24g/9Gxyl6bsLskyb4WNjRd/8hozX768an6KRWD6tSIIVULlBGGRdbEu4HWHwRyfL/lbtxZ6VxJUzHX98I7aRx3Nd5AeCNhIPGjjj+80H/o+H81/inAAPD+pq3c2maWAAAAAElFTkSuQmCC\');   background-repeat: no-repeat; border-radius: 3px 3px 3px 3px; height: 18px; width: 18px; border: 2px inset rgb(96, 0, 0); box-shadow: 0px 0px 2px rgb(255, 255, 255); left: 300px; top: 10px; "></div>');   
	}
//	   msg = msg.replace ("class='content off'", "class='content ptChatEnh'");
//	   msg = msg.replace ("class='content on'", "class='content ptChatEnh'");

	if (m[0].toLowerCase().indexOf("bottols") >= 0 || m[0].toLowerCase().indexOf("boite") >= 0 || m[0].toLowerCase().indexOf("tools") >= 0) {
		msg = msg.replace ("GoR BoTTols",'<a target="sitesup" href="'+sitesupport+'"><font color=red>GoR BoTTols</font></a>');
		msg = msg.replace ("gor bottols",'<a target="sitesup" href="'+sitesupport+'"><font color=red>GoR BoTTols</font></a>');
		msg = msg.replace ("bottols",'<a target="sitesup" href="'+sitesupport+'"><font color=red>GoR BoTTols</font></a>');
		msg = msg.replace ("boite",'<a target="sitesup" href="'+sitesupport+'"><font color=red>GoR BoTTols</font></a>');
		msg = msg.replace ("tools",'<a target="sitesup" href="'+sitesupport+'"><font color=red>GoR BoTTols</font></a>');
	}

    if (m[0].toLowerCase().indexOf("gor manager") >= 0 || m[0].toLowerCase().indexOf("gorm") >= 0 || m[0].toLowerCase().indexOf("gormanager") >= 0) {
 		return msg = '<br><font color="red" size="10px"><b><center>Tiestoale Power<br></b><a target="_Sitesupp" href="'+sitesupport+'">'+sitesupport+'</a></center></font><br>';
 	}
 	 	
	var Coords = /([0-9]{1,3})\s*(,|-)\s*([0-9]{1,3})/i.exec(z[0]);
	var Coordss = /([0-9]{1,3})\s*(,|-)\s*([0-9]{1,3}\s*(,|-))/i.exec(z[0]);
 	if (Coords && !Coordss){
		msg = msg.replace (Coords[1]+Coords[2]+Coords[3], '<a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+Coords[1]+','+Coords[3]+');" class="coordinateLink"><font color=blue>'+Coords[1]+Coords[2]+Coords[3]+'</font></a>');
	}
  
    var suid = /viewProfile\(this,([0-9]+),false,([0-9]+),/i.exec(m[0]);
    if (suid) {   
     if (scripters.indexOf(suid[1]) > -1) {
       msg = msg.replace ("<div class='avatar", "<div class='avatar sc1");
	   msg = msg.replace (msg, "<b>"+msg+"</b>");
	   msg = msg.replace ("class='content off'", "class='content ptChatEnh'");
	   msg = msg.replace ("class='content on'", "class='content ptChatEnh'");
     }
    if (suid[1] == 3788133) {	// Thyrus
       msg = msg.replace ("<div class='avatar", "<div class='avatar scThy");
    }
    if (suid[1] == 3583460) {	// Dark_Angel (Roberta)
    
    }
/**    if (Gay.indexOf(suid[1]) > -1) {
       msg = msg.replace ("<div class='avatar", "<div class='avatar merdaccia");
     }		***/
	msg = msg.replace ("<span class='time", "<span onclick=caricoinfo(\'"+ suid[1] +"\'); class='time");
    }
    var m = /(Domina|Dominus) (.*?)</im.exec(msg);
    if (m != null){
    msg = msg.replace ("<div class='avatar", "<div onclick=ptChatIconClicked(\'"+ m[2] +"\'); class='avatar");
    	if (t.leaders[m[2]] && Options.ColorsLeader) {
    		msg = msg.replace ("<div class='info'", "<div class=' ptChat"+t.leaders[m[2]]+"'")
    	}
    }
  
 if (Options.Smiley) {
     for (k in Smileys) {
       
        if (k=="(massage)")
          msg=msg.replace(k, '<img style="width:32px !important;height:24px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="*kissing*")
          msg=msg.replace(k, '<img style="width:47px !important;height:30px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else  if (k=="(fouet)")
          msg=msg.replace(k, '<img style="width:60px !important;height:30px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="(sonic)")
          msg=msg.replace(k, '<img style="width:64px !important;height:64px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if ( k=="(renne)" || k=="(tigre)" || k=="(girafe)" || k=="(elephant)" || k=="(rat)")
          msg=msg.replace(k, '<img style="width:60px !important;height:60px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="(spider)")
          msg=msg.replace(k, '<img style="width:95px !important;height:57px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="(hamta)" || k=="(cat)")
          msg=msg.replace(k, '<img style="width:31px !important;height:40px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="(shark2)")
          msg=msg.replace(k, '<img style="width:117px !important;height:50px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="(concombre)")
          msg=msg.replace(k, '<img style="width:100px !important;height:50px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="(baby)")
          msg=msg.replace(k, '<img style="width:56px !important;height:40px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="]:->" || k=="(pingouin)" || k=="(shark)")
          msg=msg.replace(k, '<img style="width:35px !important;height:35px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="(bath)" || k=="(emotlove2)" || k=="(smyno)")
          msg=msg.replace(k, '<img style="width:40px !important;height:40px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="(miroir)")
          msg=msg.replace(k, '<img style="width:45px !important;height:45px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="(caribou)")
          msg=msg.replace(k, '<img style="width:65px !important;height:33px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="(magebarbe)")
          msg=msg.replace(k, '<img style="width:45px !important;height:45px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="(couette)" || k=="(ver)")
          msg=msg.replace(k, '<img style="width:60px !important;height:45px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
        else if (k=="(fox)" || k=="(heidy)")
          msg=msg.replace(k, '<img style="width:30px !important;height:30px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
        else if (k=="(autruche)")
          msg=msg.replace(k, '<img style="width:93px !important;height:84px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
        else if (k=="(panda)" || k=="(crabe)" || k=="(tortue)"|| k=="(vache)" || k=="(singe)" || k=="(bravo2)" || k=="(bubulle)" || k=="(chien)" || k=="(cuicui)" || k=="(bubulle)" || k=="(cochon)" || k=="(lapin)" || k=="(grenouille)")
	     msg=msg.replace(k, '<img style="width:66px !important;height:66px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
        else if (k=="(herisson)" || k=="(lion)" || k=="(chat)" || k=="(papillon)"  || k=="(serpent)" || k=="(dragon)" || k=="(camelot)")
          msg=msg.replace(k, '<img style="width:77px !important;height:77px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
        else if (k=="(ours)" || k=="(taupe)" )
          msg=msg.replace(k, '<img style="width:88px !important;height:88px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">')
        else if (k=="(bienmal)")
          msg=msg.replace(k, '<img style="width:109px !important;height:60px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">')
        else if (k=="(aigle)")
          msg=msg.replace(k, '<img style="width:65px !important;height:100px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
        else if (k=="(hippo)")
          msg=msg.replace(k, '<img style="width:73px !important;height:115px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
        else if (k=="(Jolly)")
          msg=msg.replace(k, '<img style="width:85px !important;height:52px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	 else if (k=="(lapin1)" || k=="(lapin2)" || k=="(lapin3)")
          msg=msg.replace(k, '<img style="width:96px !important;height:96px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	 else if (k=="(Italy)")
          msg=msg.replace(k, '<img style="width:120px !important;height:90px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="(SpiderPig)")
		  msg=msg.replace(k, '<img style="width:265px !important;height:110px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="(Wolf)")
		  msg=msg.replace(k, '<img style="width:192px !important;height:122px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else if (k=="(gladia)")
		  msg=msg.replace(k, '<img style="width:216px !important;height:24px !important" class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
	else
	  msg=msg.replace(k, '<img class=emoicon title='+k+' onclick="BOEmoClick(\''+k+'\')" src=\"'+Smileys[k]+'\">');
    }

     }
    	return msg;
  },
  getAllianceLeaders : function (){
   var t = ChatStuff;
      var c= {};
      unsafeWindow.AjaxCall.gPostRequest("allianceGetInfo.php",c,
        function(rslt){
          if(rslt.ok){
         	var User = rslt.officers;
         	for (z in User){
						var cc = User[z];
						if (cc.type == 1){
							var Tipo = 'CHAN';
						} else {
							if(cc.type == 2){
								var Tipo = 'VICE';
							} else {
								if(cc.type == 3){
									var Tipo = 'OFFI';
								} else {
									var Tipo = '';
								}
							}
						}
				t.leaders[cc.name] = Tipo;
//         		t.leaders[] = User[z].type.substr(0,4);
         	} 
          }     
		});
	},  
}
/************************ Tower Alerts ************************/
var TowerAlerts = {
  viewImpendingFunc : null,
  generateIncomingFunc : null,
  AlarmeTimer: null,
  fixTargetEnabled : false,
  compteur: 0,
  init : function (){
    var t = TowerAlerts; 
  },
  secondTimer : null,
  setPostToChatOptions : function (obj){
     var t = TowerAlerts;
     clearTimeout(t.secondTimer);
     if (Options.alertConfig.aChat)
 		t.e_eachSecond();
  },
  e_eachSecond : function (){   // check for incoming marches
     var t = TowerAlerts;
     var now = unixTime();
     
     unsafeWindow.player.allCities().sortBy(function(c){return c.number}).each(function(f,c){
             var d="",e="";
        if(f.underAttack()) {
        
          Cities.byID[f.id].c.incomingAttackMarches().each(function(c){
           var b=Cities.byID[f.id].c.marches.incoming[c.id];
           var arrivalTime = b.secondsToDestination()>0?b.secondsToDestination():0;
   	   
           if ((arrivalTime>0)  && (t.getTowerMarch(b.id)==null || t.getTowerMarch(b.id)==undefined)) 
          {
            t.addTowerMarch (b.id, arrivalTime);
            if (Options.alertSound.enabled){
	      	my.Options.soundTheAlert();
			if (ById('botowertab')) ById('botowertab').style.display="block";
	      if (arrivalTime > Options.alertSound.expireTime)
	          Options.alertSound.expireTime = arrivalTime;
    	    }
            
            t.postToChat (f, c, false);
            saveOptions (); 
          }
          });
        
        }
        });
     t.secondTimer = setTimeout (t.e_eachSecond, 5000);
      
   },
   addTowerMarch : function (id, arrivalTime){
       var t = TowerAlerts;
       var now = unixTime();

       for (k in Options.towerMarches){
         if ((Options.towerMarches[k].arrival+Options.towerMarches[k].added) < now) {
            //Options.towerMarches[k] = null;
            delete Options.towerMarches[k];
         }
       }
       Options.towerMarches['m' + id] = { added:now, arrival:arrivalTime };
       
  },  
  getTowerMarch : function (mid){ 
     var t = TowerAlerts;
     return Options.towerMarches['m'+mid];
  },
  postToChat: function(f, c, force){
    var t = TowerAlerts;
    
    var e="";
    if(c.from.allianceId>0&&Seed.allianceNames&&Seed.allianceNames["a"+b.from.allianceId]){
          e="(" + Seed.allianceNames["a"+b.from.allianceId] +")";
         }else{
          if(c.from.allianceName!==null){e="(" + c.from.allianceName+")";}
    }
    
    if(Cities.byID[f.id].c.wilds[c.to.tileId]){
   	  var a=uW.arStrings.Common.Wilderness+" " + uW.Watchtower.generateCoords(c.to.cityId,c.to.tileId)
    } else{
   	  var a=uW.arStrings.Common.City+" " + uW.player.cities[c.to.cityId].name + ' ('+uW.player.cities[c.to.cityId].x +','+ uW.player.cities[c.to.cityId].y +')';
   	  if (Cities.byID[f.id].c.defending!=0)
   	   a+=" ("+translate('DEFENDS')+") ";
   	  else
   	   a+=" ("+translate('SANCTUARY')+") ";
    }
     var b=Cities.byID[f.id].c.marches.incoming[c.id];
     var attaquant=unsafeWindow.GOR.players[c.from.playerId]?unsafeWindow.GOR.players[c.from.playerId].name:"?";
     
     var msg ='';
     var arrivalTime = b.secondsToDestination()>0?timestr(b.secondsToDestination()):message;
     msg += b.general.level?" "+uW.arStrings.Common.General+" : "+b.general.level:"";
     msg +=' *** '+translate('ARRIVAL')+' *** ';
     unsafeWindow.Object.keys(b.units).each(function(h){
     if(b.units[h].sent>0) {
		   	   msg += b.units[h].sent + ' ' + uW.arStrings.unitName["u"+h] + ', ';
		         }
 		});
     		
     msg = msg.slice(0, -2);
     
     msg += "  ("+uW.arStrings.Common.Arrival+" " + arrivalTime + "). " ;

	if (Options.alertConfig.MonQG && parseIntNan(Options.alertConfig.hq)>0) {
		 var mavilleId = uW.player.cities[Options.alertConfig.hq];
		  msg += ' *** '+translate('BUNKER')+' *** ' + mavilleId.x + ',' + mavilleId.y + ' ';
		 
		}           
	if (Options.alertConfig.mytroops) {
		msg += ' *** '+translate('MY TROOPS')+' *** ';
     unsafeWindow.Barracks.allUnitIds.each(function(r){
      if (unsafeWindow.arStrings.unitName["u"+r]) {
		  if(Cities.byID[f.id].c.troops[r].count() > 0)
          msg += unsafeWindow.arStrings.unitName["u"+r]+': '+parseInt(Cities.byID[f.id].c.troops[r].count())+', ';
      }
     });
     }
		
    var mess = Options.alertConfig.aPrefix  +" "+unsafeWindow.arStrings.Common.Target+" : " + a +" "+unsafeWindow.arStrings.Common.Attacker+" : " + " " +attaquant + " "+e+" " + msg;

    var lancement=0;
    
    sendChat("/a " + mess);

  }		
 }
 
     
 /************* MARCHES ***************/
 my.marches = {
  cont:null,
  state : null,
  displayTimer:null,
  getContent : function (){
      var t = my.marches;
      return t.cont;
    },
    
    init : function (){
      var t = my.marches;
      t.cont = document.createElement('div');
      return this.cont;
    },
    show : function () {
     var t = my.marches;
     clearTimeout (t.displayTimer);
     if (t.state == null){
           t.cont.innerHTML = '<DIV id=marchesContent style="height:660px; max-height:660px; overflow-y:auto"></div>';
           t.state = 1;
     }
      var  m = "";
     var ma ="";
     var roww=0;
     unsafeWindow.player.allCities().sortBy(function(c){return c.number}).each(function(f,c){
             var d="",e="";
             if(f.underAttack()) {
             
                Cities.byID[f.id].c.incomingAttackMarches().each(function(c){
                var b=Cities.byID[f.id].c.marches.incoming[c.id];
                var arrivalTime = b.secondsToDestination()>0?b.secondsToDestination():0;
        	   
                if ((arrivalTime>0)) 
                {
                 roww++;
                 couleur="";
                 if (roww%2) couleur=" style='background:#e8e8e8'";
                 var arrivalTime = b.secondsToDestination()>0?timestr(b.secondsToDestination()):"unknown";
     		 var attaquant=unsafeWindow.GOR.players[c.from.playerId]?unsafeWindow.GOR.players[c.from.playerId].name:"?";
     		 if(Cities.byID[f.id].c.wilds[c.to.tileId]){
		    	  var a=uW.arStrings.Common.Wild+' ' + unsafeWindow.Watchtower.generateCoords(c.to.cityId,c.to.tileId)
		 } else{
		    	  var a=uW.arStrings.Common.City+' ' + unsafeWindow.player.cities[c.to.cityId].name + ' ('+unsafeWindow.player.cities[c.to.cityId].x +','+ unsafeWindow.player.cities[c.to.cityId].y +')';
  		 }
                 ma += "<tr><td "+couleur+">" + a + "</td><td "+couleur+">" +  arrivalTime +"</td>";
                 var e="";
		 if(c.from.allianceId>0&&Seed.allianceNames&&Seed.allianceNames["a"+b.from.allianceId]){
		           e="" + Seed.allianceNames["a"+b.from.allianceId] +"";
		          }else{
		           if(c.from.allianceName!==null){e="" + c.from.allianceName+"";}
    		 }
                 ma += "<td "+couleur+">" + attaquant + "</td><td "+couleur+">"+e+"</td>";
                 
                 ma +="<td "+couleur+">" +(b.general.level?" Lvl "+b.general.level:" unknown ") + "</td>";
                 
                 var unt="";
                 unsafeWindow.Object.keys(b.units).each(function(h){
		      if(b.units[h].sent>0) {
		 		   	   unt += b.units[h].sent + ' ' + unsafeWindow.arStrings.unitName["u"+h] + '<br>';
		 		         }
		  		});
		      		
    		 unt = unt.slice(0, -2);
                 ma +="<td "+couleur+">" + unt + "</td>";
                 
                 ma +="</tr>";
               }
               });
             
             }
        });
        
     if (ma!="") {
      m += '<DIV class=ptstat>'+uW.arStrings.ModalTitle.ImpendingAttacks.toUpperCase()+'</div>';
      m += "<table class='marches' width=100% cellspacing=0 bordercolor=black cellpadding=4><tr style='height:30px'><td><b>"+uW.arStrings.Common.Target+"</td><td><b>"+uW.arStrings.Common.Arrival+"</td><td><b>"+uW.arStrings.Common.Attacker+"</td><td><b>"+uW.arStrings.Common.Alliance+"</td><td><b>"+uW.arStrings.WatchTower.GeneralLevel+"</td><td><b>"+uW.arStrings.WatchTower.ArmySize+"</td><tr>";
      m += ma;
      m += "</table><br>";
     }
     
   
     
     var roww=0;
     var ms="";
     unsafeWindow.player.allCities().sortBy(function(c){return c.number}).each(function(f,c){
        
     var a=unsafeWindow.Object.values(Cities.byID[f.id].c.marches.outgoing).compact();
     a=a.concat(unsafeWindow.Object.values(Cities.byID[f.id].c.marches.bgReinforcements).compact());
     a.each(function(d){
     var g="",e='<a onclick="KB.Controllers.MapHelper.gotoCoord('+d.to.x +','+ d.to.y +');">('+d.to.x+','+ d.to.y +')</a>';
        roww++;
        couleur=""
        if (roww%2) couleur=" style='background:#e8e8e8'";
        var now = unixTime();
        var arrivalTime = d.secondsToDestination()>0?timestr(d.secondsToDestination()):d.secondsToReturn()>0?timestr(d.secondsToReturn()):"unknown";
        ms+="<tr>"
        ms+="<td "+couleur+">" + Cities.byID[f.id].c.name + "</td><td "+couleur+">"+arrivalTime+"</td><td "+couleur+">"+d.typeString()+"</td><td "+couleur+">"+d.statusString()+"</td><td "+couleur+">"+e+"</td>";
        gen=Cities.byID[f.id].c.generals[d.general.id];
        if (gen!=undefined) {
         ms+="<td "+couleur+">"+gen.name +" ("+gen.level()+")</td>"
        }else {
         ms+="<td "+couleur+">??</td>";
        }
        ms+="<td "+couleur+">";
        unsafeWindow.Barracks.allUnitIds.each(function(j){
         var i=(d.returning()||d.defending())?d.units[j].returning:d.units[j].sent;
         if (i>0)
          ms +=addCommas(i)+ " "+ unsafeWindow.arStrings.unitName["u"+j] +"<br>";
        });
        ms+="</td></tr>";
     });
    });
    if (ms!="") {
       m+= '<DIV class=ptstat>'+translate('OUTGOING MARCHES')+'</div>';
       m += "<table class='marches' width=100% cellspacing=0 bordercolor=black cellpadding=4><tr style='height:30px'><td><b>"+uW.arStrings.Common.City+"</td><td><b>"+uW.arStrings.Common.TimeRemaining+"</td><td><b>"+uW.arStrings.Common.Type+"</td><td><b>"+uW.arStrings.Common.Status+"</td><td><b>"+uW.arStrings.Common.Coordinates+"</td><td><b>"+uW.arStrings.Common.General+"</td><td><b>"+uW.arStrings.Common.Troops+"</td></tr>";
       m += ms;
       m += "</table><br>";
     }
     var ms="";
         var roww=0;
     unsafeWindow.player.allCities().sortBy(function(c){return c.number}).each(function(f,c){
     
     Cities.byID[f.id].c.incomingDefendingMarches().each(function(e){
     
        var g=unsafeWindow.GOR.players[e.from.playerId]?unsafeWindow.GOR.players[e.from.playerId].name:e.from.playerName;
        var zz=addCommasInt(e.upkeep());
        var XCoord=e.from.x;
        var YCoord=e.from.y;
         var MarchId=e.id;
         roww++;
        couleur=""
        if (roww%2) couleur=" style='background:#e8e8e8'"; 
         
        ms +="<tr><td></td>";
        
        ms+='<td '+couleur+'>' + Cities.byID[f.id].c.name + '</td><td '+couleur+'><a onclick="KB.Controllers.MapHelper.gotoCoord('+ XCoord +','+ YCoord +');">('+ XCoord +','+ YCoord +')</a>&nbsp;'+g+'</td>';
        ms+="<td "+couleur+">"+zz+"</td><td>";
        
        var a=Cities.byID[f.id].c.marches.incoming[MarchId];
        unsafeWindow.Barracks.allUnitIds.each(function(i){
 		gg=a.units[i].sent;
 		 if (gg>0)
 		   ms +=addCommas(gg)+ " "+ unsafeWindow.arStrings.unitName["u"+i] +"<br>";
 	});
        var now = unixTime();
        var arrivalTime = a.getTimeLeftBeforeDecamping()>0?timestr(a.getTimeLeftBeforeDecamping()):"unknown";
        
        ms+="</td><td>"+ arrivalTime +"</td></tr>";
     });
     
     });
    
           if (ms!="") {
                m += '<DIV class=ptstat>'+uW.arStrings.Profile.viewReinforcements.toUpperCase()+'</div>';
             m += "<table class='marches' width=100% cellspacing=0 bordercolor=black cellpadding=4><tr style='height:30px'><td></td><td><b>"+translate('City reinforcements')+"</td><td><b>"+uW.arStrings.Embassy.SentFrom+"</td><td><b>"+uW.arStrings.Common.UpKeep+"</td><td>"+uW.arStrings.Common.Troops+"</td><td>"+uW.arStrings.Common.Time+"</td></tr>";
                 m += ms;
                 m += "</table><br>";
       
           
     }
      
      
     document.getElementById('marchesContent').innerHTML = m;
     t.displayTimer=setTimeout(t.show, 4000);
    },
    hide : function (){
     var t = my.marches;
     clearTimeout (t.displayTimer);
    },
 }; 
 
 /************* RAPPORTS **************/
 my.Hud = {
   cont:null,
   state : null,
   popReport :null,
   minPages:		parseInt(Options.arPageFrom),
   maxPages:		parseInt(Options.arPageTo),
   totalPages:	parseInt(Options.arPageTo),
       data:[],
   getContent : function (){
     var t = my.Hud;
     return t.cont;
   },
   
   init : function (){
     var t = my.Hud;
     t.cont = document.createElement('div');
     return this.cont;
   },
   deleteAllReports:function() {
       
       var g={};
           		g.requestType="deleteAll";
           		unsafeWindow.AjaxCall.gPostRequest("deleteCheckedReports.php",g,function(i){
           		      
           		 unsafeWindow.seed.newReportCount = 0;
           	
           			
       		})
    },
   show : function () {
     var t = my.Hud;
     t.minPages=parseInt(Options.arPageFrom);
     t.maxPages=parseInt(Options.arPageTo);
       t.getAllianceReports();
       unsafeWindow.getReport = t.getReportBody;
       t.cont.innerHTML = '\
           <DIV class=ptstat>'+translate('CHECK ALLIANCE REPORTS')+'</div>\
           <DIV class=ptentry style="height:30px"><table>\
           <tr><td class=xtab>'+uW.arStrings.Common.Page+':&nbsp;<INPUT id="idRptPageFrom" size=1 value="' + t.minPages + '">&#8211;<INPUT id="idRptPageTo" size=1 value="' + t.maxPages + '"> \
           <span id=idSpanNumPages></span>\
           </td>\
           <TD class=xtab><INPUT id="idHudSearch" type=submit value="'+uW.arStrings.Common.OK_Button+'" />\
           <span id=idSpanHudErrorMsg></span><td><select id="idHudTypeSearch"><option value="">'+translate('All reports')+'</option><option value="0">'+translate('Incoming attacks')+'</option><option value="1">'+translate('Outgoing attacks')+'</option><option value="2">'+translate('Reinforcements')+'</option></select>\
           <select id="idHudMedSearch"><option value="">'+translate('All reports')+'</option><option value=1>'+translate('My reports only')+'</option></select></td><td><input type="button" value="'+translate('Delete all reports')+'" id="BOSuppRapp1"></tr>\
           </table></div>\
           <DIV id="hudResultsDiv" style="height:600px; max-height:600px; overflow-y:auto;"></div>';
           document.getElementById('idHudSearch').addEventListener ('click', t.handleHudSearch, false);
           document.getElementById('idHudMedSearch').addEventListener ('click', t.DisplayReports, false);
           document.getElementById('idHudTypeSearch').addEventListener ('click', t.DisplayReports, false);
           document.getElementById('idRptPageFrom').addEventListener ('change', t.handleRptPages, false);
	   document.getElementById('idRptPageTo').addEventListener ('change', t.handleRptPages, false);
	   document.getElementById("BOSuppRapp1").addEventListener('click', t.deleteAllReports, false);
//	   <input type="button" value="Test " id="TestDelRep">
//	   ById('TestDelRep').addEventListener('click', t.getScoutReport, false);
  },
    getReportBody : function(Date1,ID,TileId,SideNum, Nom1, Coord1, Nom2, Coord2){
        var t = my.Hud;
        if(SideNum=="Ent") SideNum=0;
        if(SideNum=="Sor") SideNum=1;
        if(SideNum=="Ren") SideNum=0;
        var c = {};
        c.rid=ID;
        c.side=SideNum;
        
        if (SideNum=="Ren") SideNum = 2;
        
        unsafeWindow.AjaxCall.gPostRequest("fetchReport.php",c,
	        function(rslt){
	           t.showReportBody(Date1, rslt.data,TileId,SideNum,Nom1, Coord1, Nom2, Coord2);     
	        },
	        function (rslt) {
	               
	        }
       );
    },
    handleRptPages: function(){
    		var t = my.Hud;
    		t.minPages=parseInt(document.getElementById("idRptPageFrom").value);
    		t.maxPages=parseInt(document.getElementById("idRptPageTo").value);
    		if (t.maxPages < t.minPages) {
    			t.maxPages = t.minPages;
    			document.getElementById("idRptPageTo").value = t.maxPages;
    		}
    		Options.arPageFrom = t.minPages;
    		Options.arPageTo = t.maxPages;
    		saveOptions();
    		t.totalPages=t.maxPages;
     },
    showReportBody: function (Date1,rslt,TileId,SideNum,Nom1,Coord1,Nom2,Coord2) {
      	var t = my.Hud;
      	if (t.popReport == null) {
      	 t.popReport = new CPopup('pbShowBarbs', 0, 0, 520, 600, true, function() {clearTimeout (1000);});
       	 t.popReport.centerMe (mainPop.getMainDiv());  
      	}
       	var m = ''; 
      	m+='<TABLE class=ptTab cellpadding=3>';
     
      	if (SideNum==0) {
      	 // Seulement les attaques entrantes
      	
      	if (TileId < 51 && rslt['tileLevel']!=undefined) m+='<TD><FONT size="4px">'+uW.arStrings.Common.Wild+' '+uW.arStrings.Common.Level+' '+rslt['tileLevel']+'</font></td>';
      	if (TileId < 51 && rslt['tileLevel']==undefined) m+='<TD><FONT size="4px">'+uW.arStrings.Common.Wild+'</font></td>';
      	if (rslt['conquered']==1) m+='<TD><FONT color="#CC0000" size="4px">'+uW.arStrings.Common.Conquered+'</font></td></tr>';
    
      	if (rslt['winner']==1) m+='<TR><TD><FONT color="#CC0000" size="4px"><b>'+uW.arStrings.AllianceReport.AllyDefeated+'</b><br></font></td></tr></table>';
      	if (rslt['winner']==0) m+='<TR><TD><FONT color="green" size="4px"><b>'+uW.arStrings.AllianceReport.AllyVictorious+'</b><br></font></td></tr></table>';
    	
    	if (rslt['fght'] != undefined){
    			m+='<TABLE style="float:left;width:45%;" class=ptTab><tr><td colspan=3><b>'+uW.arStrings.Common.Attacker+': '+Nom1+' <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ Coord1 +');" class="coordinateLink">('+ Coord1 +')</a></b><br>'+uW.arStrings.Common.General+': '+ rslt['s1KCombatLv'] +'<br>'+translate('Number of tours')+': '+rslt['rnds']+'<br>'+translate('Bonus')+': '+ parseInt(rslt['s1atkBoost']*100)  +' % '+uW.arStrings.Common.Attack+' - '+ parseInt(rslt['s1defBoost']*100) +' % '+uW.arStrings.Troops.Defense+'</td></tr>\
    			    <TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">'+uW.arStrings.Common.Troops+'</td><TD align="center">'+uW.arStrings.Common.Fought+'</td><TD align="center">'+uW.arStrings.Common.Survived+'</td></tr>'; 
    			if (rslt['fght']["s1"] != undefined) {
    					unsafeWindow.Barracks.allUnitIds.each(function(i){
    						if (rslt['fght']["s1"]['u'+i] != undefined) {
    							if (rslt['fght']["s1"]['u'+i][0] > rslt['fght']["s1"]['u'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s1"]['u'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s1"]['u'+i][1]+'</font></td></tr>';
    							else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></div></td><TD align="center">'+rslt['fght']["s1"]['u'+i][0]+'</td><TD align="center">'+rslt['fght']["s1"]['u'+i][1]+'</td></tr>';
    						}
    					});
    			}
    			m+='</table><TABLE style="float:right;width:45%;" class=ptTab><tr><td colspan=3><b>'+uW.arStrings.Common.Defender+': '+Nom2+' <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ Coord2 +');" class="coordinateLink">('+ Coord2 +')</a></b><br>'+uW.arStrings.Common.General+': '+ rslt['s0KCombatLv'] +'<br><br>'+translate('Bonus')+': '+ parseInt(rslt['s0atkBoost']*100)  +' % '+uW.arStrings.Common.Attack+' - '+ parseInt(rslt['s0defBoost']*100) +' % '+uW.arStrings.Troops.Defense+'</td></tr>';	  			  	
    		  	if (rslt['fght']["s0"] != undefined) {
    				  	m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">'+uW.arStrings.Common.Troops+'</td><TD align="center">'+uW.arStrings.Common.Fought+'</td><TD align="center">'+uW.arStrings.Common.Survived+'</td></tr>';
    				  	for (var i=60;i<=63;i++) {
    				  		if (rslt['fght']["s0"]['f'+i] != undefined) {
    				  			if (rslt['fght']["s0"]['f'+i][0] > rslt['fght']["s0"]['f'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s0"]['f'+i][1]+'</font></td></tr>';
    				  			else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center">'+rslt['fght']["s0"]['f'+i][1]+'</td></tr>';
    				  		}
    				  	}
    				  	
    				  	 unsafeWindow.Barracks.allUnitIds.each(function(i){
    				  		if (rslt['fght']["s0"]['u'+i] != undefined) {
    				  			if (rslt['fght']["s0"]['u'+i][0] > rslt['fght']["s0"]['u'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['u'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s0"]['u'+i][1]+'</font></td></tr>';
    				  			else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['u'+i][0]+'</td><TD align="center">'+rslt['fght']["s0"]['u'+i][1]+'</td></tr>';
    				  		}
    				  	});
    				  	for (var i=50;i<=55;i++) {
  					 if (rslt['fght']["s0"]['f'+i] != undefined) {
  					  if (rslt['fght']["s0"]['f'+i][0] > rslt['fght']["s0"]['f'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s0"]['f'+i][1]+'</font></td></tr>';
  					   			else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center">'+rslt['fght']["s0"]['f'+i][1]+'</td></tr>';
  					  }
    				  	}
    		     } else {
  				  		  	 m+="<tr><td><br>"+uW.arStrings.ModalMessagesViewReports.NoTroopsDefended+"</td></tr>";
  	  		 }
    		  	m+='<TR><TD></TD></TR></table>';
    	}
      	
      	if (rslt['unts']!= undefined) { // pour les renforts :) lol ca sert pas pour le moment
      	    // Renfort !
    	   m+='<TABLE style="float:right;width:45%;" class=ptTab><TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">'+uW.arStrings.Common.Troops+'</td><TD align="center">'+translate('Reinforcements')+'</td></tr>';
  
  	   unsafeWindow.Barracks.allUnitIds.each(function(i){
  	     		  		if (rslt['unts']['u'+i] != undefined) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['unts']['u'+i]+'</td></tr>';
      	   });
   
    	   m+="</table>"; 
    	
      	}
      	m+='<TR><TD></TD></TR><TR><TD></TD></TR></table>';
      	
      	if (rslt['loot'] != undefined) {
    		  	m+='<TABLE class=ptTab cellpadding=3><tr><td colspan=4><b><u>'+uW.arStrings.Common.Resources+':</u></b><br>\
		        </tr><TR><TD>'+uW.arStrings.ResourceName[0]+': </td><TD><FONT color="#CC0000">'+addCommas(parseInt(rslt['loot'][0]))+'</td>';
    		  	m+='<TD>'+uW.arStrings.ResourceName[1]+': </td><TD><FONT color="#CC0000">'+addCommas(parseInt(rslt['loot'][1]))+'</td>';
    		  	m+='<TD>'+uW.arStrings.ResourceName[2]+': </td><TD><FONT color="#CC0000">'+addCommas(parseInt(rslt['loot'][2]))+'</td>';
    		  	m+='<TD>'+uW.arStrings.ResourceName[3]+': </td><TD><FONT color="#CC0000">'+addCommas(parseInt(rslt['loot'][3]))+'</td>';
    		  	m+='<TD>'+uW.arStrings.ResourceName[4]+': </td><TD><FONT color="#CC0000">'+addCommas(parseInt(rslt['loot'][4]))+'</td></table>';
    	}	
    	
    	
    	if (rslt['rsc'] != undefined) {
    		  	m+='<TABLE class=ptTab cellpadding=3><tr><td colspan=4><b><u>'+uW.arStrings.Common.Resources+':</u></b><br></tr><TR>'
    		  	if (rslt['gld']!= undefined) m+='<TD>'+uW.arStrings.ResourceName[0]+': </td><TD>'+addCommas(parseInt(rslt['gld']))+'</td>';
    		  	m+='<TD>'+uW.arStrings.ResourceName[1]+': </td><TD>'+addCommas(parseInt(rslt['rsc']['r1']))+'</td>';
    		  	m+='<TD>'+uW.arStrings.ResourceName[2]+': </td><TD>'+addCommas(parseInt(rslt['rsc']['r2']))+'</td>';
    		  	m+='<TD>'+uW.arStrings.ResourceName[3]+': </td><TD>'+addCommas(parseInt(rslt['rsc']['r3']))+'</td>';
    		  	m+='<TD>'+uW.arStrings.ResourceName[4]+': </td><TD>'+addCommas(parseInt(rslt['rsc']['r4']))+'</td></table>';
    	}	
    	

    	} else {
    	
    	 m+='<table border=0 bgcolor=white width=100% cellpadding=3><tr><td colspan=2 style="background-color:white;"><table>';
    	 // attaquantes sortantes
    	 if (TileId < 51 && rslt['tileLevel']!=undefined) m+='<TD><FONT size="3px">'+uW.arStrings.Common.Wild+' '+uW.arStrings.Common.Level+' '+rslt['tileLevel']+'</font></td>';
  	 if (TileId < 51 && rslt['tileLevel']==undefined) m+='<TD><FONT size="3px">'+uW.arStrings.Common.Wild+'</font></td>';
  	 if (TileId == 51 &&  Nom2==undefined)  m+='<TD><FONT size="3px">'+uW.arStrings.Common.BarbarianCamp+'</font></td>';
  	 if (rslt['conquered']==1) m+='<TD><FONT color="#CC0000" size="3px">'+uW.arStrings.Common.Conquered+'</font></td></tr>';
  	   
  	     if (rslt['winner']==0) m+='<TR><TD style="background-color:white;"><FONT color="#CC0000" size="3px"><b>'+uW.arStrings.AllianceReport.AllyDefeated+'<br><br></font>';
  	     if (rslt['winner']==1 || rslt['winner']==2) m+='<TR><TD style="background-color:white;"><FONT color="green" size="3px"><b>'+uW.arStrings.AllianceReport.AllyVictorious+'<br><br></font>';
             m+="</table>";
               
  	  		m+='<TABLE style="float:left;width:45%;" class=ptTab><tr><td colspan=3><b>'+uW.arStrings.Common.Attacker+': '+Nom1+' <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ Coord1 +')" class="coordinateLink">('+ Coord1 +')</a></b>';
  	  		if (rslt['s1KCombatLv']!=undefined) m+='<br>'+uW.arStrings.Common.General+': '+ rslt['s1KCombatLv'] +'';
  	  		if (rslt['rnds']!=undefined) m+='<br>'+translate('Number of tours')+': '+rslt['rnds']+'<br>';
  	  		if (rslt['s1atkBoost']!=undefined || rslt['s1defBoost']!=undefined) m+=translate('Bonus')+': '+ parseInt(rslt['s1atkBoost']*100)  +' % '+uW.arStrings.Common.Attack+' - '+ parseInt(rslt['s1defBoost']*100) +' % '+uW.arStrings.Troops.Defense;
  	  		m+='</td></tr>';
  	  		if (rslt['fght'] != undefined){
  	  			m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">'+uW.arStrings.Common.Troops+'</td><TD align="center">'+uW.arStrings.Common.Fought+'</td><TD align="center">'+uW.arStrings.Common.Survived+'</td></tr>'; 
  	  			if (rslt['fght']["s1"] != undefined) {
  	  					unsafeWindow.Barracks.allUnitIds.each(function(i){
  	  						if (rslt['fght']["s1"]['u'+i] != undefined) {
  	  							if (rslt['fght']["s1"]['u'+i][0] > rslt['fght']["s1"]['u'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['fght']["s1"]['u'+i][0])+'</td><TD align="center"><FONT color="#CC0000">'+addCommas(rslt['fght']["s1"]['u'+i][1])+'</font></td></tr>';
  	  							else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['fght']["s1"]['u'+i][0])+'</td><TD align="center">'+addCommas(rslt['fght']["s1"]['u'+i][1])+'</td></tr>';
  	  						}
  	  					});
  	  					
  	  			}
  	  		}
  	  		if (Nom2==undefined) Nom2="barbare";
  	  		m+='</table><TABLE style="float:right;width:45%;" class=ptTab><tr><td colspan=3><b>'+uW.arStrings.Common.Defender+': '+Nom2+' <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ Coord2 +');" class="coordinateLink">('+ Coord2 +')</a></b>';
  	  		if (rslt['s0KCombatLv']!=undefined) m+='<br>'+uW.arStrings.Common.General+': '+ rslt['s0KCombatLv'];
  	  		if (rslt['lstlgn'] != undefined)
  	  			{
  	  			 m+="<br>"+uW.arStrings.MembersInfo.LastOnline+": " + unsafeWindow.formatDateByUnixTime(rslt['lstlgn'])+"<br>";
  	  			} else {
  	  			 m+="<br>";
  	  			}
  	  			if (rslt['s0atkBoost']!=undefined || rslt['s0defBoost']!=undefined) {
  	  			 m+=translate('Bonus')+': '+ parseInt(rslt['s0atkBoost']*100)  +' % '+uW.arStrings.Common.Attack+' - '+ parseInt(rslt['s0defBoost']*100) +' % '+uW.arStrings.Troops.Defense;
  	  			}
  	  			m+='</td></tr>';
  	  		if (rslt['fght'] != undefined){
  	  		  	if (rslt['fght']["s0"] != undefined) {
  	  				  	m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">'+uW.arStrings.Common.Troops+'</td><TD align="center">'+uW.arStrings.Common.Fought+'</td><TD align="center">'+uW.arStrings.Common.Survived+'</td></tr>';
  	  				 	for (var i=60;i<=63;i++) {
  							if (rslt['fght']["s0"]['f'+i] != undefined) {
  							if (rslt['fght']["s0"]['f'+i][0] > rslt['fght']["s0"]['f'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s0"]['f'+i][1]+'</font></td></tr>';
  							else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center">'+rslt['fght']["s0"]['f'+i][1]+'</td></tr>';
  							}
  						 }
  	  				  	unsafeWindow.Barracks.allUnitIds.each(function(i){
  	  				  		if (rslt['fght']["s0"]['u'+i] != undefined) {
  	  				  			if (rslt['fght']["s0"]['u'+i][0] > rslt['fght']["s0"]['u'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['fght']["s0"]['u'+i][0])+'</td><TD align="center"><FONT color="#CC0000">'+addCommas(rslt['fght']["s0"]['u'+i][1])+'</font></td></tr>';
  	  				  			else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['fght']["s0"]['u'+i][0])+'</td><TD align="center">'+addCommas(rslt['fght']["s0"]['u'+i][1])+'</td></tr>';
  	  				  		}
  	  				  	});
  	  				  	
  						for (var i=50;i<=55;i++) {
  							 if (rslt['fght']["s0"]['f'+i] != undefined) {
  							  if (rslt['fght']["s0"]['f'+i][0] > rslt['fght']["s0"]['f'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s0"]['f'+i][1]+'</font></td></tr>';
  				   			  else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center">'+rslt['fght']["s0"]['f'+i][1]+'</td></tr>';
  						}
    				  	}
  	  				  	
  	  			}	  	
  	  				  	
  	  		  	 if ((rslt['unts']!=undefined) || (rslt['frt']!=undefined)) {
  	  		  	    if (rslt['frt']!=undefined) {
  	  		  	       m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">'+uW.arStrings.Common.Defenses+'</td><TD align="center">'+uW.arStrings.Common.Quantity+'</td></tr>';
  				   
  				   	for (var i=60;i<=63;i++) {
  				     	  if (rslt['frt']['f'+i] != undefined) {
  				     	     m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['frt']['f'+i])+'</td></tr>';
  				     	  }
    				  	}
  				      for (var i=50;i<=55;i++) {
  				   	 if (rslt['frt']['f'+i] != undefined) {
  				           m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['frt']['f'+i])+'</td></tr>';
  				   	 }
  				      }
  				    }
  				    if (rslt['frt']!=undefined) {
  	  			      m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">'+uW.arStrings.Common.Troops+'</td><TD align="center">'+uW.arStrings.Common.Quantity+'</td></tr>';
  				      unsafeWindow.Barracks.allUnitIds.each(function(i){
  					 if (rslt['unts']['u'+i] != undefined) {
  					    m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['unts']['u'+i])+'</td></tr>';
  					  }
  	  			       });
  	  			    }
  	  			  
  	  			} else {
  	  		  	 m+="<tr><td><br>"+uW.arStrings.ModalMessagesViewReports.NoTroopsDefended+"</td></tr>";
  	  		  	}
  	  		  	m+='<TR><TD></TD></TR></table>';
    	        }
   	        m+="</td></tr><tr><td><br></tr>";
   	        
  	  	if (rslt['pop'] != undefined) {
  	  	
  	  	   m += '</table><tr><td style="background-color:white;"><b><u>'+translate('Results found')+'</u></b><br><br>';
  	  	
  	  	
  	  	   m+='<table style="float:left;width:45%;"class=ptTab cellpadding=3>';
  	  	   
  	  	   	  	   
  	  	    	  	  if ((rslt['unts']!=undefined) || (rslt['frt']!=undefined)) {
		    	  		  	    if (rslt['frt']!=undefined) {
		    	  		  	       m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">'+uW.arStrings.Common.Defending+'</td><TD align="center">'+uW.arStrings.Common.Quantity+'</td></tr>';
		    				   
		    				   	for (var i=60;i<=63;i++) {
		    				     	  if (rslt['frt']['frt'+i] != undefined) {
		    				     	  if (parseInt(rslt['frt']['frt'+i]) >0)
		    				     	     m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['frt']['frt'+i])+'</td></tr>';
		    				     	  }
		      				  	}
		    				      for (var i=50;i<=55;i++) {
		    				   	 if (rslt['frt']['frt'+i] != undefined) {
		    				   	  if (parseInt(rslt['frt']['frt'+i]) >0)
		    				           m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['frt']['frt'+i])+'</td></tr>';
		    				   	 }
		    				      }
		    				    }
		    				    if (rslt['unts']!=undefined) {
		    	  			      m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">'+uW.arStrings.Common.Troops+'</td><TD align="center">'+uW.arStrings.Common.Quantity+'</td></tr>';
		    				      unsafeWindow.Barracks.allUnitIds.each(function(i){
		    					 if (rslt['unts']['u'+i] != undefined) {
		    					  if (parseInt(rslt['unts']['u'+i]) >0)
		    					    m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['unts']['u'+i])+'</td></tr>';
		    					  }
		    	  			       });
		    	  			      }
		    	  			    
		    	  			  
  	  			}
  	  	 
  	  	 }
  	  	 m+='</table><table style="float:right;width:45%;"class=ptTab cellpadding=3>';
  	  	 if (rslt['pop'] != undefined  || rslt['knght'] != undefined ||rslt['hap'] != undefined) {
  	  	       m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><td align="center">'+uW.arStrings.Common.City+'<td align="center">&nbsp;</tr>';
		   	  	   if (rslt['pop'] != undefined) {
		   	  	    m+='<TR><TD>'+uW.arStrings.Common.Population+'</TD><TD>'+addCommas(parseInt(rslt['pop']))+'</td></tr>';
		   	  	   }
		   	  	   if (rslt['hap'] != undefined) {
		   	  	    m+='<tr><td>'+uW.arStrings.Common.Happiness+'<td>'+rslt['hap'] +'</td><tr>';
		   	  	   }
		   	  	   if (rslt['knght'] != undefined) {
		   	  	    m+='<tr><td>'+uW.arStrings.Common.General+'<td>'+rslt['knght']['cbt']+'</td></tr><tr><td>&nbsp;</tr>';
  	  	    }
  	  	  } 
  	  	   if (rslt['blds'] != undefined) {
  	  	     m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><td align="center">'+uW.arStrings.Common.Buildings+'<td align="center">'+uW.arStrings.Common.Level+'</tr>';
  	  		   	     		 
		   		  for (var i=1; i<100; i++){
		   		    if (rslt['blds']['b'+i] != undefined) {
		   					
		   	     			var blds = rslt['blds']['b'+i]; 
		   	     			//var couleur='';
		   	     			//if (bType==8) couleur=' style="background-color:red"';
		   	     			m += '<TR><TD>'; 
		   	     			arField = [], firstbld = true;
		   	     			m += unsafeWindow.arStrings.buildingName["b"+i] +'</TD><TD>';
		   	     			for (var zz=1; zz<12; zz++)
		   	     				arField[zz]=0;
		   	     			for (var zz=0; zz < blds.length; zz++)
		   	     				arField[blds[zz]]++
		   	     			for (var zz=11; zz>0; zz--) {
		   	     				if (arField[zz] > 0) {
		   	     					if (firstbld)
		   	     						firstbld = false;
		   	     					else
		   	     						m+=', ';
		   	     					if (arField[zz] > 1)
		   	     						m+=arField[zz] + ' x ';
		   	     					m+=' ' + zz;
		   	     				}
		   	     			}
		   	     			m+='</TD></TR>';
		   	     	     }
		   	     	    }
		   	     
		   	     	  
		   	
		
  	  	   
  	  	   
  	  	   
  	  	   }

  	  	  m+='</table>';
  	  
    	        if (rslt['tch'] != undefined) {
    	        
    	           m+='<table style="float:left;width:45%;" class=ptTab><TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">'+uW.arStrings.Common.Research+' '+uW.arStrings.Common.Level+'</td><TD align="center">'+uW.arStrings.Common.Level+'</td></tr>';
  	  				
    	           for (var i=1;i<=16;i++) {
    	           
    	            if (rslt['tch']['t'+i]!=undefined) {
    	             m+='<tr><TD>' + unsafeWindow.arStrings.techName['t'+i] + '</td><TD>'+rslt['tch']['t'+i]+'</td></tr>';
    	            }
  	  		       
    	           }
    	           
    	         
    	           
    	           m+='</table>';
  	     }
            
  	     var typebutin ='';
  	    	
  	     	if (rslt['loot'] != undefined) {
  	     		m+='</td><tr><td style="background-color:white;"><b><u>'+uW.arStrings.Common.Resources+' '+typebutin+' :</u></b><br>';
  	     	  		  	m+='<TABLE class=ptTab cellpadding=3><TR><TD>'+uW.arStrings.ResourceName[0]+': </td><TD>'+addCommas(parseInt(rslt['loot'][0]))+'</td>';
  	     	  		  	m+='<TD>'+uW.arStrings.ResourceName[1]+': </td><TD>'+addCommas(parseInt(rslt['loot'][1]))+'</td>';
  	     	  		  	m+='<TD>'+uW.arStrings.ResourceName[2]+': </td><TD>'+addCommas(parseInt(rslt['loot'][2]))+'</td>';
  	     	  		  	m+='<TD>'+uW.arStrings.ResourceName[3]+': </td><TD>'+addCommas(parseInt(rslt['loot'][3]))+'</td>';
  	     	  		  	m+='<TD>'+uW.arStrings.ResourceName[4]+': </td><TD>'+addCommas(parseInt(rslt['loot'][4]))+'</td>';
  	     	  		  	if (rslt['loot'][5]) {
  	     	  		  	m+='<tr><td>'+translate('Objects found')+':</td>';
  	     	  		  	for (var i=1;i<10;i++) {
  	     	  		  	
  	     	  		  	 if (rslt['loot'][5]['110'+i]==1)
  	     	  		  	  m+='<td colspan=3>' + unsafeWindow.arStrings.itemName["i110"+i] + '<div class="item-icon pic px70 items item_110'+i+'"></td>';
  	     	  		  	}
  	     	  		      }
  	     	  		  	m+='</tr></table>';
  	  	}
  	   
  	  	if (rslt['rsc'] != undefined) {
  	    		  	m+='<TABLE class=ptTab cellpadding=3><tr><td colspan=4><b><u>'+uW.arStrings.Common.Resources+':</u></b><br></tr><TR>';
  	    		  	if (rslt['gld']!= undefined) m+='<TD>'+uW.arStrings.ResourceName[0]+': </td><TD>'+addCommas(parseInt(rslt['gld']))+'</td>';
  	    		  	m+='<TD>'+uW.arStrings.ResourceName[1]+': </td><TD>'+addCommas(parseInt(rslt['rsc']['r1']))+'</td>';
  	    		  	m+='<TD>'+uW.arStrings.ResourceName[2]+': </td><TD>'+addCommas(parseInt(rslt['rsc']['r2']))+'</td>';
  	    		  	m+='<TD>'+uW.arStrings.ResourceName[3]+': </td><TD>'+addCommas(parseInt(rslt['rsc']['r3']))+'</td>';
  	    		  	m+='<TD>'+uW.arStrings.ResourceName[4]+': </td><TD>'+addCommas(parseInt(rslt['rsc']['r4']))+'</td></table>';
    		}
  	   m+="<br><br></table>";
  	  	 
    	}
    
      	t.popReport.getMainDiv().innerHTML = '<DIV style="max-height:520px; height:520px; overflow-y:scroll">' + m + '</div>';
      	t.popReport.getTopDiv().innerHTML = '<TD align="center"><B>'+translate('Battle reports')+' - '+unsafeWindow.formatDateByUnixTime(Date1)+'</td>';
      	t.popReport.show(true);
      	
      	
      	
    },
    DisplayReports : function (){
      var t = my.Hud;
      var data = t.data;
      var filtre =  document.getElementById("idHudTypeSearch").value;
      var filtre2 =  document.getElementById('idHudMedSearch').value;
      var results=document.getElementById("hudResultsDiv");
      if(!t.data.length) {
         results.innerHTML = '<center><b>'+translate('No reports found')+'</b></center>';
         return;
      }
      var m = '<center><table width=100% cellspacing=0 cellpadding=3><thead><th>P</th><th>&nbsp;</th><th>'+uW.arStrings.Common.Date+'</th><th colspan=3>'+uW.arStrings.Common.Attacker+'</th><th>'+uW.arStrings.Common.Type+'</th><th colspan=4>'+uW.arStrings.Common.Target+'</th></thead>';
      m += '<tbody>';
      for ( var i=0; i<t.data.length;i++) {
         var rpt = data[i];
        if (rpt.side0Name===undefined) {
         rpt.side0Name = "-";
        }
         //   continue;
            
          style='padding:2px;' ; 
          if (rpt.TypeName=="Ent") {
             style=' style="background-color:#EF9999;padding:2px;"';
          }
           if (rpt.TypeName=="Ren") {
  	   style=' style="background-color:#99EF99;padding:2px;"';
          }
  
          if (((filtre2=="" || filtre2=="1" && (rpt.side1Name==Seed.player.name|| rpt.side0Name==Seed.player.name))) && (filtre=="" || (filtre=="0" && rpt.TypeName=="Ent") || (filtre=="1" && rpt.TypeName=="Sor") || (filtre=="2" && rpt.TypeName=="Ren"))) {
          
          
          m += '<tr ><td '+style+'><SPAN onclick="ptAllianceReports('+rpt.page+')"> <a>'+rpt.page+'</a></span></td>\
           <td '+style+'>';
          if (rpt.marchType == 3 && rpt.TypeName=="Ent") {
          } else {

           m+='<img onclick="getReport('+rpt.reportUnixTime+','+ rpt.marchReportId +','+rpt.side0TileType +',\''+rpt.TypeName+'\',\''+rpt.side1Name.replace(/\'/g,"_")+'\',\''+ rpt.side1XCoord +','+ rpt.side1YCoord +'\',\''+rpt.side0Name.replace(/\'/g,"_")+'\',\''+ rpt.side0XCoord +','+ rpt.side0YCoord +'\');" border=0 src="http://cdn1.iconfinder.com/data/icons/woothemesiconset/16/search_button.png">';
          }
          m+='&nbsp;</td>\
            <td '+style+'>'+unsafeWindow.formatDateByUnixTime(rpt.reportUnixTime)+'</td>\
              <td '+style+'>'+rpt.side1Name+'</td>\
              <td '+style+'>'+rpt.side1AllianceName.replace(translate('Unaligned'),'-')+'</td>\
              <td '+style+'><a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ rpt.side1XCoord +','+ rpt.side1YCoord +')" class="coordinateLink">('+ rpt.side1XCoord +','+ rpt.side1YCoord +')</a></td>';
              if (rpt.marchType == 3) 
               m +='<TD '+style+'><FONT color="FF9933">'+rpt.marchName+'</font></td>';
  	    else if (rpt.marchType == 4) 
  	     m +='<TD '+style+'><FONT color="FF0033">'+rpt.marchName+'</font></td>';
  	    else 
  	      m +='<TD '+style+'><FONT color="339933">'+rpt.marchName+'</font></td>';
  	      if (rpt.side0Name!=undefined) {
               m+='<td '+style+'>'+rpt.side0Name+'</td>';
              }else{
               m+='<td '+style+'>-</td>';
              }
              m+='<td '+style+'>'+rpt.side0AllianceName.replace(translate('Unaligned'),'-')+'</td>\
              <td '+style+'><a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ rpt.side0XCoord +','+ rpt.side0YCoord +')" class="coordinateLink">('+ rpt.side0XCoord +','+ rpt.side0YCoord +')</a></td>';
              if (rpt.side0TileType < 51 && rpt.side0TileLevel!=undefined) {
              m+='<td '+style+'>'+uW.arStrings.Common.Wild+' '+rpt.side0TileLevel+'</td>';
              } else {
                if (rpt.side0TileType = 51 && rpt.side0CityId==0 && rpt.side0PlayerId==0) {
                  m+='<td '+style+'>'+uW.arStrings.Common.BarbarianCamp+'</td>';
                  }else {
                  m+='<td '+style+'>'+uW.arStrings.Common.City+'</td>';
                  }
              }
              
              m+='</tr>';
          }
      }
      m += '</tbody></table></center>';
      results.innerHTML = m;
  },
  handleHudSearchCB : function(rslt, page) {
      var t = my.Hud;
      if (rslt) {
         if (!rslt.ok) {
            document.getElementById("idSpanHudErrorMsg").innerHTML = rslt.errorMsg;
            return;
         }
         t.totalPages=parseInt(rslt.totalPages);
         if (t.totalPages < t.maxPages)
	    t.maxPages = t.totalPages;
         if (rslt.arReports && page) {
           var ar = rslt.arReports;
           var rptkeys = unsafeWindow.Object.keys(ar);
           var myAllianceId = getMyAlliance()[0];
           for (var i = 0; i < rptkeys.length; i++) {
                var rpt = ar[rptkeys[i]];
                rpt.page = page;     
                var side0Name = rslt.arPlayerNames['p'+rpt.side0PlayerId];
                rpt.side0Name = side0Name;
                rpt.side1Name = rslt.arPlayerNames['p'+rpt.side1PlayerId];
                if (rpt.side0AllianceId > 0)
                  rpt.side0AllianceName = rslt.arAllianceNames['a'+rpt.side0AllianceId];
                else
                  rpt.side0AllianceName = translate('Unaligned');
                if (rpt.side1AllianceId > 0)
                  rpt.side1AllianceName = rslt.arAllianceNames['a'+rpt.side1AllianceId];
                else
                  rpt.side1AllianceName = translate('Unaligned');
  
                if (rpt.side0CityId > 0)
                  rpt.side0CityName = rslt.arCityNames['c'+rpt.side0CityId];
                else
                  rpt.side0CityName = 'none';
                if (rpt.side1CityId > 0)
                  rpt.side1CityName = rslt.arCityNames['c'+rpt.side1CityId];
                else
                  rpt.side1CityName = 'none';
                if (rpt.marchType == 1)
                    rpt.marchName = uW.arStrings.Common.Transport;
                else if (rpt.marchType == 3)
                    rpt.marchName = uW.arStrings.Common.Scout;
                else if (rpt.marchType == 2)
                    rpt.marchName = uW.arStrings.Common.Reinforce;
                else if (rpt.marchType == 4)
                    rpt.marchName = uW.arStrings.Common.Attack;
                else rpt.marchName = translate('unknown');
                
                rpt.targetDiplomacy = getDiplomacy (rpt.side0AllianceId);
             
                	
  	      if (myAllianceId != rpt.side1AllianceId) {      
  		rpt.TypeName = "Ent";
  	      }
                if (myAllianceId == rpt.side1AllianceId) {
       		rpt.TypeName = "Sor";      
       	      }
       	      
       	         	if (rpt.marchType == 2) {
       	         	  rpt.TypeName = "Ren"; 
       	         	}
       	      
       	      t.data.push(rpt); 
                   
           }
         }
         			
         
         if (parseInt(page)+1 <= t.maxPages) {
            var results=document.getElementById("hudResultsDiv");
            results.innerHTML = uW.arStrings.MapHelper.Searching+' '+uW.arStrings.Common.Page+' ' + (parseInt(page)+1) + ' '+translate('of')+' ' + t.maxPages;
            t.getAllianceReports(parseInt(page)+1);
         }
         else if (page) 
             t.DisplayReports();
      }
    },
    
    handleHudSearch : function() {
      var t = my.Hud;
      var results=document.getElementById("hudResultsDiv");
      results.innerHTML = uW.arStrings.MapHelper.Searching+' '+uW.arStrings.Common.Page+' ' + t.minPages + ' '+translate('of')+' ' + t.maxPages;
      t.data=[];
      t.getAllianceReports(t.minPages);
    },
  
    getAllianceReports : function (pageNum){
      var t = my.Hud;
      var c= {};
      c.pageNo = pageNum;
      c.group = "a";

      unsafeWindow.AjaxCall.gPostRequest("listReports.php",c,
        function(rslt){
           t.handleHudSearchCB (rslt, pageNum);     
        },
        function (rslt) {
            t.handleHudSearchCB (rslt, pageNum);     
        }
      );
    },
  
    hide : function (){
  },
  
  }
  
 /* onlget des généraux !! */
 
my.Generals = {
  cont : null,
  state : null,
 init : function (){
    var t = my.Generals;
    t.cont = document.createElement('div');
    uW.BOTerres = t.show;
    return t.cont;
  },
  
  getContent : function (){
    var t = my.Generals;
    return t.cont;
  },

  hide : function (){
    var t = my.Generals;

  },
  publi :function(cityId,fbid,name,idk) {
   var t = my.Generals;
   var c = [];
	   c.push(["REPLACE_KnIgHtNaMe",name]);
	   c.push(["REPLACE_KnIgHtId",idk]);
	   c.push(["REPLACE_CiTyId",cityId]);
   uW.common_postToProfile('601',c,fbid,'601_energy')
  },
  DelGen : function(id,kid){
  	 var t = my.Generals;
     var d = {};
         d.cid = id;
         d.kid = kid;
    uW.AjaxCall.gPostRequest("fireKnight.php", d, 
    	function (e) {
            delete Cities.byID[id].c.generals[kid];
            t.show();
		},
		function (e) {
			t.DelGen(id,kid);
		});
  },
  show : function (){
    var t = my.Generals;
    uW.BOGenePubl = t.publi;
    uW.BODeleteGeneral = t.DelGen;
    clearTimeout (t.displayTimer);
    var m = '';
    	m+= '<div id="BOGeneralShoW">';
    	m+= "<DIV class=ptstat>"+uW.arStrings.Common.Generals.toUpperCase()+"</div>";
   		for (var c=0; c<Cities.numCities; c++){
        	var city = Cities.cities[c]; 
          	m+= '<TABLE cellspacing=0 cellpadding=0 class=ptTabPad width=99%>';
	  	  	m+= '<TR><TD colspan=7><DIV class=ptstat>'+ city.c.name +' &nbsp;&nbsp;<a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ city.c.x +','+ city.c.y+');">('+ city.c.x +','+ city.c.y +')</a></div></td></tr>';
          	if (Cities.cities[c].c.generalsCount()>0) {
            	m+= "<tr><td colspan=3 width=160>"+uW.arStrings.Common.Name+"</td><td width=40>Exp</td><td width=30>"+uW.arStrings.Common.Level+"</td><td width=30>"+uW.arStrings.Common.Energy+"</td><td>"+uW.arStrings.Common.Actions+"</td></tr>";
           		Cities.cities[c].c.generalsSorted().each(function(b){
            		var f = b.experience() - b.expNeededForCurrentLevel(), e = b.expNeededForNextLevel() - b.expNeededForCurrentLevel();
            	
            		if(b.idle() && b.energy()==b.maxEnergy) var Del = "<A onclick='BODeleteGeneral("+city.c.id+","+b.id+")'><img src='"+XX+"' title='"+uW.arStrings.Common.Dismiss+"'></a>";
            		else var Del = "";
            	
            		m+= "<tr><td width=1%>"+Del+"</td><td><img width=25 src='https://graph.facebook.com/"+b.fbuid+"/picture'/></td><td>"+b.name+"</td><td>" + addCommas(f) + " / " + addCommas(e) + "</td><td>"+b.level()+" </td><td>"+b.energy()+" / "+b.maxEnergy+"</td>";
            		m+= "<td>";
           			if (uW.seed.appFriends[b.fbuid]) {
            			m+= "<a href=# onclick='NeighborPanel.postOffering("+b.fbuid+");'>"+translate('Send offerings')+"</a><br>";
           			}
           			if(b.idle()) {
           				if (b.energy()<b.maxEnergy) {
            				m+= "<a href=# onclick=\"BOGenePubl("+city.c.id+","+b.fbuid+",'"+b.name+"',"+b.id+");return false;\">"+uW.arStrings.Generals.AskForEnergy+"</a><br>";
	        			}
           			} else {
        				m+= "<b><i>"+translate('Outside the city')+"...</i></b>";
           			}
           			m+= "</td></tr>";
           			}); 
          		} else {
          			m+= "<tr><td>"+uW.arStrings.March.NoGeneral+"</td></tr>";
          		}
          	m+= "</table>";
        }
  		m+= '</div>';  
		m+= '<div id="BOGeneralAccept">';
  		m+= "<DIV class=ptstat>"+uW.arStrings.Common.Appoint.toUpperCase() + " " + uW.arStrings.Common.Generals.toUpperCase()+"</div>";
  		m+= 'Prova';
  		m+= '</div>';
  t.cont.innerHTML = m;
  t.displayTimer = setTimeout (t.show, 20000);
  
  ById('BOGeneralShoW').style.display = 'block';
  ById('BOGeneralAccept').style.display = 'none';
     
 }

}
 /******** REGIONS SAUVAGES ***********/
my.Wilds = {
  cont : null,
  state : null,
  upGoldTimer : null,
  wildList : [],
  buildList : {},
  
  init : function (){
    var t = my.Wilds;
    t.cont = document.createElement('div');
     unsafeWindow.BOTerres = t.show;
    return t.cont;
  },

  getContent : function (){
    var t = my.Wilds;
    return t.cont;
  },

  hide : function (){
    var t = my.Wilds;

  },
  
  show : function (){
    var t = my.Wilds;
    clearTimeout (t.displayTimer);
    if (t.state == null){
      t.cont.innerHTML = '<DIV id=wildContent style="height:640px; max-height:640px; overflow-y:auto">';
      t.state = 1;
    }
    m = "<DIV class=ptstat>"+unsafeWindow.arStrings.Common["Wilds"]+"</div>";

    for (var c=0; c<Cities.numCities; c++){
          var city = Cities.cities[c]; 
          var row = 0;  
          var position = "right";
          if ((c+1)%2) position="left";
              m += '<TABLE cellspacing=0 cellpadding=0 class=ptTabPad width=45% style="float:'+position+'">';
          m += '<TR><TD colspan=20><DIV class=ptstat>'+ city.c.name +' &nbsp; <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ city.c.x +','+ city.c.y+');">('+ city.c.x +','+ city.c.y +')</a></div></td></tr>';
         
          if(city.c.wildernessCount()===0){
          
          }else {
            m += '<TR style="background-color:white; font-weight:bold;" align=right><TD align=left>'+uW.arStrings.Common.Abandon+'</td><TD align=left>'+uW.arStrings.Common.Type+'</td><td align=left>'+uW.arStrings.Common.Level+'</td><TD align=left>'+uW.arStrings.Common.Coordinates+'</td></tr>';
             city.c.wilderness().each(function(wild)
	    {
	     m += '<TR align=right'+ (row++%2?'':' class=ptOddrow') +'><TD align=left>\
	     <a onclick="this.style.display=\'none\';setTimeout (function (){Castle.abandonWild('+wild.id+');setTimeout(function() { BOTerres() },1000); },500);return false;"><img src="http://cdn1.iconfinder.com/data/icons/musthave/16/Remove.png" border=0></a></td><td align=left>'+wild.name +'</td>\
             <TD>'+ wild.level +'</td><TD align=center><a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+wild.x +','+  wild.y+');">('+ wild.x +','+ wild.y +')</a></td></tr>';     
	    });    
      	  }
      	  m+="</table>";
      }
     document.getElementById('wildContent').innerHTML = m + '</div>';
     t.displayTimer = setTimeout (t.show, 20000);
  },
   
}
/************************ Auto Post Scout ************************/
var ScoutAlert = {
  init : function (){
    var t = ScoutAlert;
 //   if(Options.EnableDelRep && Options.AttackAutoTest) 
    t.getScoutReport();
  },
  
  	minuteTimer : null,
    numesplorep : [],
  
   getScoutReport : function () {
   		var t = ScoutAlert;
		if(unsafeWindow.seed.newReportCount >= 1 && Options.alertConfig.aChatScout){
        var g={};
        g.pageNo = 1;
        unsafeWindow.AjaxCall.gPostRequest("listReports.php",g,
        function(rslt){	
        	if(rslt.ok){
        		var NR = rslt.arReports;
        		for (k in NR){
        		for (var c=0; c<Cities.numCities; c++){
        			var city = Cities.cities[c]; 
        			if(NR[k].side1XCoord == city.c.x && NR[k].side1YCoord == city.c.y){
        			 return;
        			}}
        			if(NR[k].marchType == 3){
        				if(NR[k].reportStatus == 2) {
        					var b = translate('My city')+' ('+NR[k].side0XCoord+','+NR[k].side0YCoord+') '+translate('was explored')+'! '+translate('The exploration seems to come from')+' ';
        						b+= '('+NR[k].side1XCoord+','+NR[k].side1YCoord+'). '+translate('Date')+': '+timeConverter(NR[k].reportUnixTime);
        					sendChat("/a " + b);
        					var MarchId = NR[k].marchReportId;
//        					t.numesplorep.push(MarchId); 
        					document.getElementsByTagName(MarchId).checked = true;
							t.ReadReport(MarchId);
        					uW.seed.newReportCount = uW.seed.newReportCount - 1;
        				} else {
        				}
        			} else {
        			}
        		}
        	}
        if (t.numesplorep != "") t.ReadReport();
       	});
       	}
       	t.minuteTimer = setTimeout (t.getScoutReport, 3*60*1000);	// 3(Min) * 60 (sec) * 1000
    },
		ReadReport : function (MID){
    	var t = ScoutAlert;
/**    	for(var i = 0; i < t.numesplorep.length; i++) {
   			document.getElementsByTagName(i).checked = true;
		}
**/     var g={};
        g.s0rids = MID;
        unsafeWindow.AjaxCall.gPostRequest("readCheckedReports.php",g,
        function(rslt){	
        	if(!rslt.ok){
        		setTimeout (function (){ t.ReadReport(MID); }, 2000);
        //		t.numesplorep = [""];
        	}
        });    	
    },
}

/************************ Auto Delete GoR Message ************************/
var AutoDeleteGoRMessage = {
  init : function (){
    var t = AutoDeleteGoRMessage;
    t.deleterep();
  },
  
  minuteTimer : null,
  numreport : [],
  
    deleterep : function (){
		var t = AutoDeleteGoRMessage;
		if(uW.seed.newMailCount >= 1 && Options.EnableMesRep){
        for (var z=1; z<=5; z++) {
       		var g={};
    		g.pageNo=z;
    		g.requestType="GET_MESSAGE_HEADERS_FOR_USER_INBOX";
    		g.boxType="inbox";
        	unsafeWindow.AjaxCall.gPostRequest("getEmail.php",g,
        	function(rslt){
				var MS = rslt.message;
				for (k in MS){
					var ID = MS[k].messageId;
					var SUB = MS[k].subject;
					var BY = MS[k].fromUserId;
					var del = false;
					if ((SUB.indexOf('Acquista') >= 0 || SUB.indexOf('acquista') >= 0) && (SUB.indexOf('Vinci') >= 0 || SUB.indexOf('vinci') >= 0 || SUB.indexOf('Gratis') >= 0 || SUB.indexOf('gratis') >= 0 || SUB.indexOf('Pacco') >= 0 || SUB.indexOf('pacco') >= 0)) del = true;
					if ((SUB.indexOf('Sconto') >= 0 || SUB.indexOf('sconto') >= 0) && (SUB.indexOf('Fortuna') >= 0 || SUB.indexOf('fortuna') >= 0)) del = true;
					if ((SUB.indexOf('Ottieni') >= 0 || SUB.indexOf('ottieni') >= 0) && (SUB.indexOf('Oro') >= 0 || SUB.indexOf('oro') >= 0 || SUB.indexOf('Gratis') >= 0 || SUB.indexOf('gratis') >= 0)) del = true;
					if ((SUB.indexOf('Nuove') >= 0 || SUB.indexOf('nuove') >= 0) && SUB.indexOf('commercio') >= 0) del = true;
					if ((SUB.indexOf('Invia') >= 0 || SUB.indexOf('invia') >= 0) && (SUB.indexOf('Monete') >= 0 || SUB.indexOf('monete') >= 0 || SUB.indexOf('Oro') >= 0 || SUB.indexOf('oro') >= 0)) del = true;
					if ((SUB.indexOf('Vinci') >= 0 || SUB.indexOf('vinci') >= 0) && (SUB.indexOf('Gratis') >= 0 || SUB.indexOf('gratis') >= 0)) del = true;
					if ((SUB.indexOf('Spendi') >= 0 || SUB.indexOf('spendi') >= 0) && (SUB.indexOf('Ricevi') >= 0 || SUB.indexOf('ricevi') >= 0)) del = true;
					if (del && BY == 0){
						uW.seed.newMailCount = uW.seed.newMailCount-1;
						t.numreport.push(ID);	
					}
				}
        		if (t.numreport != "") t.deletemess();
        	});
    	}}
    	t.minuteTimer = setTimeout (t.deleterep, (10*60*1000));		// 10 (Min) * 60 (Sec) *1000	
    },
    deletemess : function (){
    		var t = AutoDeleteGoRMessage;
      		var g={};
           	g.requestType="ACTION_ON_MESSAGES";
			g.selectedAction="delete";
			g.boxType="inbox";
			g.selectedMessageIds=t.numreport;
           	unsafeWindow.AjaxCall.gPostRequest("getEmail.php",g,
           	function(rslt){	
				t.numreport = [""];
       		},
       		function(rslt){
       			t.deletemess();
       		});    		
    },
}

/************************ Auto Delete Reports ************************/
var AutoDeleteReports = {
  init : function (){
    var t = AutoDeleteReports;
    t.deleterep();
  },
  
  minuteTimer : null,
  numreport : [],
  
    deleterep : function (){
		var t = AutoDeleteReports;
		if(uW.seed.newReportCount >= 1 && Options.EnableDelRep){
       	var g={};
    	g.pageNo="1";
        unsafeWindow.AjaxCall.gPostRequest("listReports.php",g,
        function(rslt){
        	if(rslt.ok){
        	var RN = rslt.arReports;
        	for (k in RN){
     		 	for(var i = 0; i < CrestData.length; i++) {
					if (RN[k].side0XCoord == CrestData[i].X && RN[k].side0YCoord == CrestData[i].Y) {
					 	t.numreport.push(RN[k].marchReportId);
					 	uW.seed.newReportCount = uW.seed.newReportCount -1;
					}
		        }
     		 }
     		 if (t.numreport != "") t.deletemess();
    		}
    	});
       	}
       	t.minuteTimer = setTimeout (t.deleterep, (Options.DeleteRepEvr*60*1000));		
    },
    deletecheck : function (){
    		var t = AutoDeleteReports;
    		document.getElementsByTagName(idrpt).checked = true;
      		var g={};
           	g.s1rids=t.numreport;
           	unsafeWindow.AjaxCall.gPostRequest("deleteCheckedReports.php",g,
           	function(rslt){	
           		if(rslt.ok)
           		t.numreport = [""];
       		});    		
    },
}

/************************ Food Alerts *************************/
var FoodAlerts = {

  init : function (){ 
   var f = FoodAlerts;
   f.e_eachMinute();
  },

  minuteTimer : null,

  e_eachMinute : function (){   
    var f = FoodAlerts;
    var now = unixTime();
    row = [];  
    if (Options.enableFoodWarnTchat)  {
      for(i=0; i < Cities.numCities; i++) {
        //var rp = getResourceProduction (Cities.cities[i].id);
        var foodleft = parseInt(Cities.cities[i].c.resources[1].count);
        var usage = parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) - parseInt(Cities.cities[i].c.upkeep());
        //row[i] = rp[1] - usage;
        
    	var timeLeft = parseInt(Cities.cities[i].c.resources[1].count)  / (0-usage) * 3600;
          var msg = '';
          if (timeLeft<0){
           }
          else if (timeLeft<(Options.foodWarnHours*3600)) {
                msg += translate('My city')+' ' + Cities.cities[i].c.name.substring(0,15) + ' (' +
                       Cities.cities[i].c.x +','+ Cities.cities[i].c.y + ') ';
              msg += ' '+translate('is running out of food')+', '+translate('so please send some')+'? '+translate('Current stock')+': '+addCommasWhole(foodleft).replace(',',' ').replace(',',' ').replace(',',' ').replace(',',' ')+' ('+timestrShort(timeLeft)+') '+uW.arStrings.Common.Production+': '+addCommas(usage).replace(',',' ').replace(',',' ').replace(',',' ').replace(',',' ');
                sendChat ("/a " + msg);
                //alert(msg);
          }
      }  
    f.minuteTimer = setTimeout (f.e_eachMinute, 1800000);
   }
  },  
}

function sendChat (msg){
  document.getElementById ("mod_comm_input").value = msg;
  unsafeWindow.Chat.sendChat ();
}

function time(ms) {
    var seconds = ((ms / 1000) % 60);
    var minutes = (((ms / 1000) / 60) % 60);
    var hours = ((((ms / 1000) / 60) / 60) % 24);

    var sec, min, hrs;
    if(seconds<10)  sec="0"+seconds;
    else            sec= ""+seconds;
    if(minutes<10)  min="0"+minutes;
    else            min= ""+minutes;
    if(hours<10)    hrs="0"+hours;
    else            hrs= ""+hours;

    if(hours == 0)  return parseInt(min)+":"+parseInt(sec);
    else    return parseInt(hrs)+":"+parseInt(min)+":"+parseInt(sec);

}

function timeConverter(UNIX_timestamp){
 var a = new Date(UNIX_timestamp*1000);
 var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
     var year = a.getFullYear();
     var month = months[a.getMonth()];
     var date = a.getDate();
     var hour = a.getHours();
     var min = a.getMinutes();
     var time = date+'/'+month+'/'+year+' - '+hour+':'+min;
     return time;
 }



/*************** REASSIGNER **********/
my.Reassign = {
 cont : null,
 displayTimer : null,
 state : null,
 curTabBut : null,
 curTabName : null,
 sourceCity : {},
 destinationCity : {},
 rows : [],

 init : function (){
   var t = my.Reassign;
   t.cont = document.createElement('div');
   t.state = null;
   return t.cont;
 },
  getContent : function (){
    var t = my.Reassign;
    return t.cont;
  },
  hide : function (){
    var t = my.Reassign;
    t.state = null;
    clearTimeout (t.displayTimer);
  },
  
  show : function (){  
    var t = my.Reassign;
    var ModelCity = {};
    var rownum = 0;
    var rownum2 = 0;
    clearTimeout (t.displayTimer);
     
        if (t.state == null) {  
          m = "<DIV class=ptstat>"+uW.arStrings.Common.Reassign+" "+uW.arStrings.Common.Troops+"</div>";
          m +="<div id='statpourREA'></div>";
          m += "<TABLE align=center width='450px' class=ptTab border=0 align=left cellpadding=2>\
            <tr align=center valign=middle><td colspan=1 width=100><b><u>"+uW.arStrings.Common.From+"</b></u><br><span id=REAsrcRptspeedcity></span></td>\
            <td colspan=1 width='100px'><input type=button style='font-weight:bold' id=REAaction value='"+uW.arStrings.Common.Reassign+"'></td>\
            <td colspan=1 width='100px'><b><u>"+uW.arStrings.Common.To+"</b></u><br><span id=REAdesRptspeedcity></span></td>\
            <td width=150 colspan=1>&nbsp;</td></tr>\
            <tr align=center valign=top><td width=100><div id=REAstatsource></div></td>\
            <td ><table cellspacing=0 cellpadding=0 width=99%>";
             unsafeWindow.Barracks.allUnitIds.each(function(r){
              if (unsafeWindow.arStrings.unitName["u"+r]) {
             if (rownum++ % 2)
    	             style = '';
    	           else
                style = ' style = "background: #e8e8e8"';
    	     m += '<tr '+style+'><td  align=right>&nbsp;</td><td align=left><input style="border:1px solid black;height:16px;font-size:11px;" id="REAnbunit'+r+'" type=text size=7 value="0"></td></tr>';
       	     }
       	    });
            m += "</table></td><td><div id=REAstatdest></div></td>";
            m += "<td colspan=2><table cellspacing=0 cellpadding=0 width=80%><tr><td>&nbsp;</table>";

            m += "</tr><tr><td colspan=4><div id='ptREAStatus' style='text-align:center;overflow-y:auto; max-height:30px; height: 30px;'></div></td></tr></table>";
            
            
          t.cont.innerHTML = m; 
          t.statpourREA = document.getElementById ('statpourREA');
          t.statutREA = document.getElementById ('ptREAStatus');
          t.actionREA = document.getElementById ('REAaction');
          t.actionREA.addEventListener ('click', t.clickReassigneDo, false);
          
       
          
          var dcp1 = new CdispCityPicker ('ptREA1', document.getElementById('REAdesRptspeedcity'), false, t.clickREACityDestinationSelect, 1);
          var dcp0 = new CdispCityPicker ('ptREA0', document.getElementById('REAsrcRptspeedcity'), false, t.clickREACitySourceSelect, Cities.byID[unsafeWindow.currentcityid].idx);
          t.state = 1;
         
         }
         var str = "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=120></td><TD width=88 style='background: #ffc'><B>"+uW.arStrings.Common.Total.toUpperCase()+"</b></td>";
	    for(i=0; i<Cities.numCities; i++) {
	      Gate = Cities.cities[i].c.defending;
	               if(Gate == 0) var couleurr="#77EE77";
	               if(Gate != 0) var couleurr="#EE7777";
	                 str += "<TD width=81 style='background-color:"+couleurr+"' align=center><B>"+ Cities.cities[i].c.name +'</b><BR><a onclick="KB.Controllers.MapHelper.gotoCoord('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+');">('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+')</A></td>';
	                 
	    }
	str +="</tr>";
        str += "<tr><td><br></td></tr>";

      
	 unsafeWindow.Barracks.allUnitIds.each(function(r){
	      var unitTotal=0;
	   var m="";
	   if (unsafeWindow.arStrings.unitName["u"+r]) {
	      style = " style = 'background: #e8e8e8'";
	      for(var i=0; i<Cities.numCities; i++) {
		   m += "<TD width=81 "+style+" align=right>"+ addCommas(Cities.cities[i].c.troops[r].count()) +'</td>';
		 	                        unitTotal+=parseInt(Cities.cities[i].c.troops[r].count());
	       }
		          str += "<tr><td "+style+" align=right><b>"+unsafeWindow.arStrings.unitName["u"+r]+"</td><td "+style+" align=right>"+addCommas(unitTotal)+" "+ m + "</tr>"; 
	
	
	    }
	 });
        t.statpourREA.innerHTML = str;       
        t.displayTimer = setTimeout (t.show, 10000);
         
         
    
 },
   clickREACitySourceSelect : function (city){
    var t = my.Reassign;
    var rownum=0;
    t.sourceCity = city; 
    var SourceId = t.sourceCity.c.id;
    // on remplit les stat du DIV source
    //on efface le nbunit
    unsafeWindow.Barracks.allUnitIds.each(function(r){
      if (ById("REAnbunit"+r))  ById("REAnbunit"+r).value="0";
    });
    t.actionREA.disabled=false;
    var m="";
    m="<table cellspacing=0 cellpadding=0 width=80%>";
    unsafeWindow.Barracks.allUnitIds.each(function(r){
     if (unsafeWindow.arStrings.unitName["u"+r]) {
        if (rownum++ % 2)
    	            style = '';
    	          else
             style = 'background: #e8e8e8;';
      m += '<tr style="'+style+'"><td align=right><b>'+unsafeWindow.arStrings.unitName["u"+r]+'</b></td>\
            <td align=left><input style="border:1px solid black;height:16px;font-size:11px;" id="REAdestunit'+r+'" type=text size=7 readonly value="'+parseInt(Cities.cities[t.sourceCity.idx].c.troops[r].count())+'">&nbsp;\
            <input type=button value=">" id="REApdestunit'+r+'"  style="border:1px solid black;height:16px;font-size:11px;"></td></tr>';
     }
    });
    m += "</table>";
 
    ById("REAstatsource").innerHTML = m;
    
    unsafeWindow.Barracks.allUnitIds.each(function(r){
      if (unsafeWindow.arStrings.unitName["u"+r]) {
      
      ById("REApdestunit"+r).addEventListener ('click', function() {
      
        
        var nomcha=this.id.replace("REApdest","REAdest");
        var nomcha2=this.id.replace("REApdestunit","REAnbunit");
      
        ById(nomcha2).value=0; // on met à 0
        var maxtroupe=getTroopMax(SourceId);
        var nbunitto=0;
        unsafeWindow.Barracks.allUnitIds.each(function(r){
          if (ById("REAnbunit"+r))      nbunitto+=parseInt(ById("REAnbunit"+r).value);
        });

        var libre = parseInt(maxtroupe - nbunitto);

        if (ById(nomcha).value>=libre) {
          ById(nomcha2).value = libre;
        }  else {
          ById(nomcha2).value= ById(nomcha).value;
        }
  
        
        
       }, false);
       }
    });
   // t.estimerTemps();
  },
  clickREACityDestinationSelect : function (city){
     var t = my.Reassign;
     var rownum=0;
     t.destinationCity = city;
     
     // on remplit les stat du DIV destination
     var m="";
     m="<table cellspacing=0 cellpadding=0 width=80%>";
     unsafeWindow.Barracks.allUnitIds.each(function(r){
      if (unsafeWindow.arStrings.unitName["u"+r]) {
        if (rownum++ % 2)
    	            style = '';
    	          else
             style = 'background: #e8e8e8;';

          m += '<tr style="'+style+'"><td align=right>&nbsp;</td><td align=left><input style="border:1px solid black;height:16px;font-size:11px;" type=text size=7 readonly value="'+parseInt(Cities.cities[t.destinationCity.idx].c.troops[r].count())+'"></td></tr>';
      }
     });
     m += "</table>";
     ById("REAstatdest").innerHTML = m;
    // t.estimerTemps();
  },  
  clickReassigneDo: function() {
  var t = my.Reassign;
  var totalunit=0;
  var SourceId = t.sourceCity.c.id;
  var DestinationId = t.destinationCity.c.id;
  unsafeWindow.Barracks.allUnitIds.each(function(r){
       if (document.getElementById("REAnbunit"+r)) {
       
         if (parseInt(document.getElementById("REAnbunit"+r).value) > parseInt(document.getElementById("REAdestunit"+r).value)) {
           document.getElementById("REAnbunit"+r).style.backgroundColor="red";
           return false;
         
         }
         totalunit=totalunit+parseInt(document.getElementById("REAnbunit"+r).value);
         document.getElementById("REAnbunit"+r).style.backgroundColor="";
        }
     });
     
     if (t.sourceCity.c.id==t.destinationCity.c.id) {
           t.statutREA.innerHTML = '<FONT COLOR=#550000>'+translate('Not possible to send to same city')+'!</font>';
          return;
     }
     if (totalunit==0) {
        t.statutREA.innerHTML = '<FONT COLOR=#550000>'+translate('Impossible to')+' '+unsafeWindow.arStrings.Common.Reassign+' '+translate('with 0 troops')+'... pfff, '+translate('wake up')+' !</font>';
          return;
   }
   
      var maxtroupe=getTroopMax(SourceId);

      if (totalunit>maxtroupe) {
       t.statutREA.innerHTML = '<FONT COLOR=#550000>'+translate('Impossible to')+' '+unsafeWindow.arStrings.Common.Reassign+' '+translate('more than')+' '+maxtroupe+' '+translate('troops at a time')+'.</font>';
       return;
      }
      
      t.actionREA.disabled=true;
      var x=t.destinationCity.c.x;
      var y=t.destinationCity.c.y;
     t.statutREA.innerHTML = "<i><b>"+translate('Processing')+"........</b></i>";
     
     if (Cities.byID[SourceId].c.canMarch()) {
       var f=Cities.byID[SourceId].c;
       var id=f.id;
       var d=unsafeWindow.Building.getMaxLevelForType(50,id);
       var a=new unsafeWindow.March({marchId:Cities.byID[id].c.emptyMarchSlots()[0],toXCoord:x,toYCoord:y,fromCityId:id,marchType:5,knightId:0,fromHealLevel:d,apothecaryHealPercent:unsafeWindow.KB.Controllers.Apothecary.getHealPercent(d),gold:0,resource1:0,resource2:0,resource3:0,resource4:0});
       var g={mid:a.id,xcoord:a.to.x,ycoord:a.to.y,cid:id,type:5,kid:0,gold:a.gold,r1:a.resources[1],r2:a.resources[2],r3:a.resources[3],r4:a.resources[4],camp:0,et:t.calculateTime(id,7,x,y)};
       unsafeWindow.Barracks.allUnitIds.each(function(r){
        if (document.getElementById("REAnbunit"+r) && parseIntNan(document.getElementById("REAnbunit"+r).value)>0) {
         a.units[r].sent=parseIntNan(document.getElementById("REAnbunit"+r).value);
         g["u"+r]=parseIntNan(document.getElementById("REAnbunit"+r).value);
        }
       });
       unsafeWindow.AjaxCall.gPostRequest("march.php",g,function(zz){	
                       	   	var now = unixTime();
            	   			var i="reinforce",j=Number(zz.eta)-Number(zz.initTS);
            	   			unsafeWindow.Chrome.ResourcesBar.update();
            	   			unsafeWindow.Object.keys(a.units).each(function(k){Cities.byID[id].c.troops[k].subtract(a.units[k].sent)});
             	   	
