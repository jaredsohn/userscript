// ==UserScript==
// @name           GoR BoTTols

// @version        3.8

// @namespace      Tiestoale 
// @description    GoR BoTTols (Bot+Tools) for Glory Of Rome

// @copyright	   © del Pino (aka del Pino) - Games Power Team

// @include        *gloryofrome*/*gameChrome_src.php*

// @include		   *gloryofrome*/*iframeCanvas.php*

// @include		   *gloryofrome*

// @include 	   *facebook.com/4oh4.php

// @include		   *facebook.com/dialog/feed*

// @icon           http://gamespowerita.com/Tools/GoR/Plugins/Icon.jpg

// @resource       smileys http://gamespowerita.com/Tools/GoR/Plugins/smileys.js

// @grant       GM_getValue
// @grant		unsafeWindow

// @grant		GM_deleteValue

// @grant       GM_getValue
// @grant       GM_setValue

// @grant       GM_listValues
// @grant       GM_addStyle

// @grant       GM_xmlhttpRequest
// @grant       GM_log

// @grant		GM_getResourceText

// @grant 		GM_getMetadata

// @grant		GM_info

// ==/UserScript==

(function() {

var Version = '3.8';

var Autore = 'del Pino';

var ScriptName = 'TABLA DEL PINO';

var miseajour = ScriptName + ' ' + Version + ' - by ' + Autore;

var sitesupport = "http://gamespowerita.com";

var pubblicity = '<iframe src="http://gamespowerita.com/Ads/GoR.php" width="1px" height="1px" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"></iframe>';

var SWF_PLAYER_URL = "http://gamespowerita.com/Tools/GoR/Plugins/Allarmi/miniplayer.swf";

var SWF_ALARM_URL = "http://gamespowerita.com/Tools/GoR/Plugins/Allarmi/alarmplayer.swf";

var URL_CASTLE_BUT = "http://gamespowerita.com/Tools/GoR/Plugins/Castelli/CastNotSel.png";

var URL_CASTLE_BUT_SEL = "http://gamespowerita.com/Tools/GoR/Plugins/Castelli/CastSel.png";

var butON='<img width="12px" height="12px" align=middle src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAACB0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVi7kSokAAAAFnRFWHRDcmVhdGlvbiBUaW1lADExLzA1LzA33bqJ2wAAAq1JREFUeJxlk09oVFcUxn/3vskkqZoJGRMXTgQpCga0qZkUChEtFjFg6giuVDAgbaQroV2WGgUXXQiudJlVyDJpKRVKwYR0YXVqtNrUP1SSOMYRJpjJjJn3Zubc08Uzk4n94HDh8N1zzvcdjlFV6rHn75P7oqbhkqc26WET4oTAlTOBq6QDV774oufmX/V8U1+ge/bUuGdsaiHI8kYKCAKAh2UzzcS1hYqrTix8cvPEhgLfZq41TRXuPctVlxNz5cVawVZvCwDLUqjl4rKFZolmtr9t23X78zHfAvy2cmes/nOq9RAAM12jzOwZBbeeW/IKFE0p8W9TdgyA5OyZ3v2zp5V0j5Lu0ZHcT6qqyvTHugZ+3quqqiPZH2u8rVMHte3WgV7ru/KVhSBb6zwYHwhnXaqsO1UNfRrc9gWpyAEAilGfipErttk0dr15p/Fs/BgAFx7+AMBceZG51VDWhRdXQ07HAJQcQUQwFe0yyUdnNO3/A4D2pEPzfvmU/CafWCwGr8vkq0Vi29tY7p4Mnf/1I4g3sDkXISJOeB8GAx945KUIbQDRMLeGkgNA1GGrTl56WAAmC3+GY3YeXyfbMNbkTebuvts/iJOX3qavdh4VdR8GVJgrLzIYH+Dotj7y/gqPK/M02UbOt5/kWuc3oZEz3zEvWaz1UHF/mN3p48mqyt3n5hUAFzu+ZLhz6H+yAIYfX+fSkxvQ3kAkr4iTXqOq7LjTP76Kn1rywm0ctN0Mdw5xaGtvbezhJ9eZyqWhJYLFoL5MuP4HJ4yqcnj6XNPTSOZZ0ZQSyw2rYbvAwYqEL0CjhRYPG4CuSkbnS7v066f+hmNq//2zcZymilGfICKo0ZphxgdbEAQ34fofbDymesSm+/YiellFk1p1CVGHIBkxLu2Mfu+O3H9Yz/8PLFlkbIqvT3MAAAAASUVORK5CYII%3D" alt="ON">';
var butOFF='<img width="12px" height="12px" align=middle src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAACB0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVi7kSokAAAAFnRFWHRDcmVhdGlvbiBUaW1lADExLzA1LzA33bqJ2wAAAsFJREFUeJxlk09oVFcUxn/3zR9HaoJKgphMFGtCrH9alUTqRgWhJtDFjBRsNybURVWwFCqUUmgyghTcaKlLQXeiopOVIEhtNaDjaNVYiNXYjHGeDmhokpcw89677x4XL5lM7AeXezn3O98957scJSLU4unBzz+2PliSUdF4h0RjSaN9ghmnqGem75mZqb5PLuaGavmqVuD50a+yKhpPTT/K4dqjiO+FpGiMSMNKrJa1GLc8sPXC7fQCgUrhaeL1mRPPKoV/ks79wapgpG4pAIEzUY1ZLa2Y+uXFYMO2tu2Z3yoWgH2673xt8rLdKQA2Zh+wMfuAQOZj5uUIMl5Kcvf6eQD+/enrzuc/7JfcOiS3Dnlz5ayIiFxrQ+ZwZnV4ti+frfIGP2uXm7tbOy3tTByffpSrvtyQ7gVgxJ03yp21qWlvL/7OsBJrvIS45eNWpH75etceBaAh3QPAYOa7MNEu4BQLAIz9Esaa0j1MBGCVHbRlrbeMMc1zbs/1+eTSOVri8Hd6MwPdm1mk4E32HABr9qR4q0EZQ6B1c9Ron/ehlKIhAoEzSasACQBVvZ8Iwt34Gst4rq2iMQCm7v4BQPsXPfNfqcLVONuefSfkiFIY7dmRb9oau0TrtWZ6Etcu0JjuZdWuLqYmJzGjT7AWJVjx5UFW/XgKgN+/74XXL6iLxwkCk1NDB7o6As/Ne/kboZGH+/jwSP//2gLIn+wnfypDewL8+GK0DjqViPDXvu1Z89/blHk5AoC3ZSdrvu2n+dNd1bLzJ/t5dedPmmJQn4jjBjLQPeyllYjw8NdMwrt19ZmMl5KqNAaAY+CVD86sYXURaIqBisUpB1Icq5i2Q6O6smCYbnd/lDVGUtZ4CavsoIypGuZZMWZUBNF6oHvYWzhMtRjc0bLJoI4FYjq0MUnja/DdItq/h/Z/3jPsP67lvwOjGG1S8vVScQAAAABJRU5ErkJggg%3D%3D" alt="OFF">';
var URL_ALERT="data:image/gif;base64,R0lGODlhJQAcAOUBASEhGBgYMSEhISkhISkpISkpKTExKSMjOTk5MXMICHsICEJCOTc3QkpKSlJKSkpCUlpaWmNaUlpaY2tjY3tza3RzdIwQEJUQEKUQEK0QELUQEM0YGNoYGOcYGOchIecpKec5Oe9CQu9KSu9SUu9aWu9jY+9ra+97e4GBgZSMhJeUlK2llKWlpbW1tfeEhPeMjPeUlPecnMa9rca9tfetrfe9vdbGvcDAwN7Oxvfn3ufn5//n5//37/7+/AAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQBAgA/ACwAAAAAJQAcAAUG/sCfcEgsGo/IJJIE4oRML6UUybkortiMaco1cTQWRXh8zXCVJg8nE8Ziw+az8RTybDBit9sSlw9JIV9WV2RtYh9+QiWAgoZ6bok/JDAkG2x5eoYWiHIkMTshd5qYhFh+JTQ7dniPpKadMTUeGnhkrW1+kzGrj22OCn4mJy6Nb72EficmJLOsx3p+LovFvs/RJCJfv6Wu16FgedvQci4h37aY1WHRISAb4K2t7O7gttWQ5CEfluJ7eez72KBz9eqMCxMiOmgYlKChgoYOISY4w2JFDhwyUkxwsACBAQMEBggYCaCkyQEVpKjA0aNHjhkaOSJAUCCkyJICAOTMOaABNZIWK3i07MHDhgoKERx4rGnz5k6cAwaoKCJDxtCWOmaoqCDhAQMGB8KKFRvgQAAGENJCQCEEACH5BAECAD8ALAAAAAAlABwABQb+wJ9wSCwaj8gkkgTihEwvpRTJuSiu2IxpyjVxNBZFeHzNcJUmDycTxmLD5rPxFPJsMGK32xKXD0khX1ZXZG1iH35CJYCChnpuiT8kMCQbbHl6hhaIciQxOyF3mpiEWH4lNDt2eI+kpp0xNR4aeGStbX6TMauPbY4KfiYnLo1vvYR+JyYks6zHen4ui8W+z9EkIl+/pa7XoWB529ByLiHftpjVYdEhIBvgra3s7uC21ZDkIR+W4nt57PvYoHP16owLEyI6aBiUoKGChg4hJjjDYkUOHDJSTHCwAIEBAwQGCBgJoKTJARWkqMDRo0eOGRo5IkBQIKTIkgIA5Mw5oAE1khYreLTswcOGCgoRHHisafPmTpwDBqgowkLG0JY6ZqioIOEBAwYHwooVG+BAAAYQ0kJAIQQAIfkEAQIAPwAsAAAAACUAHAAFBv7An3BILBqPyGTSdYIpn0rTKEStjqDYH80kHZW8I9L0mkXSXC5TqSRVe0khUtlIi7leJhI3zQWPyHNCMTEvfCYxMGhpX2IugVp1Ly+JMDR1hFxqVI8xNTSSgzQ5njQwhWqNczQ1PHUwMas5OTiehHxTqjk8g7A1urKjdYu4ZTE4OaWWxzzMPKOYUiFznTihNMvNyHZugFirNaE12M61w9Jllpe9ujuz5ZrnWemvr6vttMKLm+iwky6vx3BYQoTmDzF5g9Bw6XXpVJcQIFQhOsHnBa9ECv9Q+SARBhc2ezLlefiBIzpJfUaIVPnlD4gQHzyowvMwjEExUzZ+4KAqjXVLKhrHgABRkoPRnifgwIRJtKRTD0Y3bMjSosUOHThYqEDBtYLXr14lQJDg4IEDFU9Y4ODRY0fWrSjATpgroS4ECGUbPJiQhEUPtmxxtIA7ocIECYftPsBbdsECBAhYFGFhoxlbrFrjGq7LmfODzwwkeJ2L9gcAOw%3D%3D";
var XX = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAstJREFUeNpskstrXWUUxX/7e9zHuadpbwbR0yagZKAIPmga0kEToUELKVVJrBMHBSUDQTuQ/geCCA6ETGt0EFCqkpKmLRaSNlUKgRKvoMU6KkgHUZtKvO97z/m2gyaXFFyTvVjs3xpsttyYeeX6+HsfHCWKoZuCBgiK7s4QQBXd8WIEW69z7fwXv3+4cuO0hAvz3a3ifietBqqKoIQQkKCgYadgtyRACEihwIGtLWY/+vRjV/vnYTfd/NMRMrTTJW3UMdYgufwjKMug2URDhjiHiqBAU4QnvRtyf928yYPf7hLqNcz+fsZu32H97Rlaq9eIygdIqzXMiSmOzn/F2jMHKYSMYAzN/jKddjNjNaJxyaGLoHu1dPgl/Qb0+5ePPZYvgl7y6A959H0vX5rtrlAToQYszUyzq9c2Kvh33+HE2o+9bG7kMFWgqkJNDSqCydSQZgZjLZuLF/nu5Mke8Mbn8z3/2QvPU/ypgjOWNBiyYBAEU/KO2DtKzpH4HJ2rV1k+e5a9Ov/6Kfp/+ZWkUCDa2Y+9xRowkXXsc47YWordDk9MTnJqbu6xgtmlZZKxMUyrxT7viZ0jdh5rDCb2nth7SqoUp6aYXFnpgV+fOdPzr66v03f8OLlOh9h74pzDWsFF5TJdBG23efHKlR7w7fg4ycYGt0NgdGEBgGOrq6wPDBDFMSUrmAdtTClJiJKEeGiInycmALg8Pc1z1SrDo6NElQp3zp0DYG1khIHhYaJDg5SSBOcd8vD0m41W0KKIIGlKs93GGkO+UCCIIKq063VaIdBXLCLeE4B+K3xy6/qCKw8e8v9mgoQUESFWBRHCniOWFAR99MaqYD15G2iLNNy9P+5uPn1kYhAxoAq6Qwn/IwEDGOF+5Vbj8t/bF+XZvDny1lODs335wsFqJ2SNVBEBK+AAawRrwIrgDOSs2Gqnu7147/6FSrO7/N8ASxJC+7t5hdYAAAAASUVORK5CYII="; 

var DEFAULT_ALERT_SOUND_URL = 'http://gamespowerita.com/Tools/GoR/Plugins/Allarmi/RedAlert.mp3';

var IsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;


var Options = {

	HideTab				:	false,

	Lingua				:	0,

	DashPos				:	0,

	ptWinIsOpen			:	false,

	pbEveryEnable		:	false,

	pbEveryMins			:	60,

	ptWinDrag			:	true,

	ptWinPos			:	{},


	HeightTools			:	700,

	WidthTools			:	760,

  
	enableFoodWarnTchat	:	false,

	pbGoldEnable		:	false,
	foodWarnHours		:	2,
  
	HideDaily			:	true,

	HideUpGor			:	true,

	EnableDash			:	true,

  
	BreakingNews		:	0,

  
	pbChatOnRight		:	false,

	pbGoldHappy			:	75,

	pbRessTime			:	15,

	EnableDelRep		:	false,

	EnableMesRep		:	false,

	DeleteRepEvr		:	5,

	pbRessEnable		:	false,

	arPageFrom			:	1,

	arPageTo			:	4,

	srcMinLevel			:	1,

	Smiley				:	true,

	transportinterval	:	60,

	minwagons			:	5000,

	lasttransport		:	0,

	ColorsLeader		:	true,

	srcMaxLevel			:	10,

	filPuissance		:	0,

	filPuissanceMax		:	100000000,

	filfiltreAlliance	:	'',

	filfiltreJoueur		:	'',


	alertConfig			:	{

  		aChat			:	true,

  		aChatScout		:	false,

  		aPrefix			:	"*** Me estan atacando !!! ***",

  		MonQG			:	true,

  		hq				:	"",

  		mytroops		:	false
	},

	alertSound			:	{

    	enabled			:	false,

    	soundUrl		:	DEFAULT_ALERT_SOUND_URL,

    	repeat			:	true,

    	repeatDelay		:	10,

    	playLength		:	20,

    	volume			:	100,

    	alarmActive		:	false,

    	expireTime		:	0
	},

  	towerMarches		:	{},

  	ChatLearder			:	true,

  
  	Chuchoenabled		:	true,

  	urlChucho			:	'http://www.universal-soundbank.com/mp3/sounds/735.mp3',

  	Attackenabled		:	true,

  	urlAttack			:	'http://www.universal-soundbank.com/mp3/sounds/217.mp3',
 
  	Spyenabled			:	true,

  	urlSpy				:	'http://www.universal-soundbank.com/mp3/sounds/2376.mp3',
 
  	HelpRequest			:	true,

  	DeleteRequest		:	false,

  	DeleteRules			:	false,

  	maxIdlePop			:	true,


  	AutoAttack			:	{},

  	AttackTime			:	{},

  	AttackAuto			:	false,

  	AttackTimer			:	8,

  	AttackTimer2		:	1,

  	AttackTimer3		:	1,

  	AttackCible1		:	false,

  	AttackCible2		:	false,

  	AttackCible3		:	false,

  	AttackGen			:	false,

  	AttackGenNiv		:	200,

  	AttackTroops		:	{

  		1:{},

  		2:{},

  		3:{},

  		4:{},

  		5:{},

  		6:{},

  		7:{},

  		8:{},

  		9:{},

  		10:{}

  	},

  	AttackTroopsB		:	{

  		1:{},

  		2:{},

  		3:{},

  		4:{},

  		5:{},

  		6:{},

  		7:{},
  		8:{},

  		9:{},

  		10:{}

  	},

  	AttackTroopsC		:	{},

  
  	spamconfig			:	{

  		aspam			:	false,
  		spamvert		:	"Type your spam here",

  		spammins		:	"10",

  		atime			:	10,

  		spamstate		:	"a"
  	},

  
  	Crestinterval		:	5,

  	crestRunning		:	false,

  	CrestEnergy			:	0,

  	
  	GlobalChat			:	true,

  	AllianceChat		:	true
};


var AutoBuild = {
	ActiveBuild			:	false,

	HelpBuild			:	false,

	CheckLevel			:	false,

	EnBuild				:	{},

	SelCap				:	{},

	CheckTime			:	60
};


var AutoResearch = {
	ActiveResearch		:	false,

	HelpResearch		:	false,

	EnResearch			:	{},

	SelResearch			:	{},

	CityResearch		:	{}
};


var GlobalOptions = {
  	autoPublishGamePop 	:	true,

  	autoPublishPrivacy	:	80,

  	autoPublishKDO		:	false,
 
  	autoPublishKDOWho	:	0,
 
  	BOAutomateKDO		:	false,

  	BOAutomateKDOsec	:	10,

  	BOAutomateKDOChoice	:	1005,

  	pbWatchdog			:	true

};

var AutoAttack = {
	Attivo				:	false,

	AttackInterval 		:	20,

	Enable				:	{},

	Mode 				:	{},

	X					:	{},

	Y					:	{},
	
	Multi				:	{},

	MultiCheck		:	[],

	Troops				:	{},

	LastCoord			:	{},

	AttackGen			:	false,
	AttackGenNiv		:	200,

	StopCity			:	false
};


var TrainOptions = {

 	Running				:	false,

  	list				:	{},

  	listactif			:	{},

  	timelauch			:	60,

  	pourcpop			:	75,

  	pourctot			:	100,

  	unitemin			:	100
};

var Colors = {
	ChatLeaders			:	'#C8C8C8',

	ChatVC				:	'#81EE81',

	ChatChancy			:	'#F8A151',

	ChatAtt				:	'#FF7D7D',

	ChatEcl				:	'#FFDD7D',

	ChatGlo				:	'#5C0E3A',

	ChatAll				:	'#679183'
};


var CrestOptions = {

  	Running   			: 	false,

  	CrestCity 			: 	0,

  	RoundOne  			: 	false,

  	RoundTwo  			: 	true,
  	lastRoundTwo 		: 	0,
  	active				:	true,

  	X					:	0,
  	Y					:	0,

  	R1SOM				:	0,

  	R1REC				:	0,
  	R1CAL				:	0,
  	R1CAV				:	0,

  	R1LEG				:	0,

  	R1SCO				:	0,

  	R1CAR				:	0,

  	R1CAP				:	0,

  	R1CEN				:	0,

  	R1ARI				:	0,

  	R1BAL				:	0,

  	R1BER				:	0,

  	R1RAI				:	0,

  
  	R2SOM				:	0,

  	R2REC				:	0,

  	R2CAL				:	0,

  	R2CAV				:	0,

  	R2LEG				:	0,

  	R2SCO				:	0,

  	R2CAR				:	0,

  	R2CAP				:	0,

  	R2CEN				:	0,

  	R2ARI				:	0,

  	R2BAL				:	0,

  	R2BER				:	0,

  	R2RAI				:	0
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

		'now':'adesso',

	//Ricerche - Build

		'Up to level':'Porta al livello',

		'Leads to the same level':'Porta allo stesso livello',

	//Germania

		'City for scout/attack':'Città per perlustrazioni/attacchi',

		'You can not attack a member of your alliance':'Non puoi attaccare un membro della tua alleanza',

		'Wait':'Aspetta',

		'UPDATE':'AGGIORNA',

		'For':'Per',

		'Force Quit':'Uscita forzata',

		'Errors':'Errori',

		'Select all':'Seleziona tutto',

		'I suggest you refresh the page. Some data may not be real':'Ti consiglio di riaggiornare la pagina. Alcuni dati potrebbero essere non reali',

		'The attacks are many and may stop responding':'Gli attacchi sono tanti e potrebbero fermarsi',

		'Do you want to continue anyway':'Vuoi continuare lo stesso',


	// Diplomacy

  		'Unaligned':'Senza Ally',

  		'Friendly To Them':'Amichevoli Verso Loro',

  		'Friendly To You':'Amichevoli Verso Te',

	//Food Alert

		'My city':'La mia città',

		'is running out of food':'ha bisogno di cibo',

		'so please send some':'me ne invieresti un po\'',
		'Current stock':'Ne possiedo ancora',

	//Tower Alerts

		'The exploration seems to come from':'L\'esplorazione sembra provenire da',

   	  	'BUNKER':'BUNKER',

   	  	'MY TROOPS':'MIE TRUPPE',

   	//Overview

   		'Joined on':'Giochi dal',

   		'World':'Mondo',

   	//Alliance Manager

   		'Alliance Manager':'Gestione Alleanza',

   		'Message Manager':'Gestione Messaggi',

   		'ALLIANCE INFO':'INFO ALLEANZA',

   		'MEMBERS INFO':'INFO MEMBRI',

   		'Founder':'Fondatore',

   		'Avatar':'Avatar',

   
   		'Days in Position':'Giorni in posizione',

   		'Joined Date':'Gioca dal',

    	
   	'Get Info/Member':'Ottieni info/membri',

   		'Enter a message':'Inserisci il messaggio',

   		'Message by':'Messaggio da',

   		'Message sent to all the alliance by':'Messaggio inviato a tutta l\'alleanza da',

   		'Message sent to all officer by':'Messaggio inviato agli ufficiali da',

   		'Read members page':'Lettura membri pagina',

      		'Message send to':'Messaggio inviato a',
      		'Remove Member':'Rimuovi Membro',

      		'Sorry, but this feature is only for official':'Scusa, ma questa funzione è solo per ufficiali',

      		'Do you really want to remove this user':'Vuoi davvero rimuovere questo utente',

   	//Search

  	    'City to start from':'Ricerca a partire da',

  	    'Launch search':'Inizia la ricerca',

  	    'SEARCH FINISHED':'RICERCA FINITA',

  	    'The minimum distance cannot be lower than 0':'La distanza minima non può essere inferiore a 0',

    	'The distance has to be higher than 1':'La distanza deve essere superiore a 1',

    	'The maximum/minimum distance has been exceeded':'La massima/minima distanza è stata superata',

     	'The distance cannot be higher than 375':'La distanza non può essere superiore a 375',

     	'NOTE : WARNING, there is no limitation to the search, but this can have consequences on the performance of your browser':'NOTA : ATTENZIONE, non vi è alcuna limitazione alla ricerca, ma questo può avere conseguenze sulle prestazioni del browser',

     	'Hide option window':'Nascondi le opzioni',

     	'Not found':'Non trovati',

     	'More info':'Più info',

		'Non-occupied only':'Solo non occupate',

		'free':'libera',

		'Minimum':'Minima',

		'Maximum':'Massima',

		'content':'contenente',

		'Where do you want to save the coordinates':'Dove vuoi salvare le coordinate',

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

   		'Wave':'Onda',

   		'Do not use the general with the energy below':"Non usare i generali con l'energia al di sotto di",

   	//Import-Export

   		'Import':'Importa',

   		'Export':'Esporta',

    //AutoAttack 2

    	'AUTOMATED ATTACKS':'ATTACCHI AUTOMATICI',

    	'ATTACK':'ATTACCA',

    	'Do not use the general with a level greater than':'Non utilizzare i generali con un livello superiore a',
    	'Last Attack':'Ultimo Attacco',
    	'Success':'Inviati',

    	'CITY SET PARAMETERS':'PARAMETRI DELLE CITTÀ',

    //Marches

    	'OUTGOING MARCHES':'MARCE IN USCITA',

    	'City reinforcements':'Città rinforzata',

    //Reports

    	'CHECK ALLIANCE REPORTS':"MOSTRA I REPORT DELL'ALLEANZA",

    	'No reports found':'Nessun report trovato',

    	'of':'di',

    	'Outgoing attacks':'Attacchi in uscita',

    	'My reports only':'Solo i miei rapporti',
		'unknown':'sconosciuto',

		'Number of tours':'Numero di turni',

		'Results found':'Risultati trovati',

		'Objects found':'Oggetti trovati',

	//Player

		'Results for':'Risultati per',

		'See members':'Mostra membri',

		'Players found':'Giocatori trovati',

		'Extra information':'Informazioni extra',

   	//AutoAttack

   		'CONFIGURATION':'CONFIGURAZIONE',

   		'STATISTICS':'STATISTICHE',

   		'Time between attacks':'Tempo tra gli attacchi',

   		'Attack Mode':'Modalità di attacco',

   		'No coordinated inserted':'Nessuna coordinata inserita',

   		'Impossible to attack the coordinates':'Impossibile attaccare le coordinate',

   		'Groundhog coordinates':'Ricomincio le coordinate',

   		'City not activated':'Città non attivata',

   		'Send attack to':'Attacco inviato a',

   		'You do not have the troops necessary':'Non hai le truppe necessarie',

   		'You can not attack':'Non puoi attaccare',

   		'Unknown error':'Errore sconosciuto',

   		'Disable the city in which the coordinates of end':'Disattiva la città in cui finiscono le coordinate',

   		'Disable the city':'Disabilito la città',

   	//Spam

      	'OPTIONS':'OPZIONI',

   		'Post automatically every':'Invia il messaggio ogni',

		'Your spam message':'Il tuo messaggio',

	//Generals

		'Actions':'Azioni',

		'Outside the city':'Fuori città',

   	//AutoTrain

   		'AUTO-BUILDING TROOPS':'AUTO-ADDESTRA TRUPPE',
 
   		'Active':'Attivo',

   		'Deactive':'Disattivato',

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

		'Configuration of the':'Configurazione del',

		'Allow the toolbox window to be moved freely':'Abilita il movimento del tools con il mouse',

		'Dimensions Tools':'Dimensioni Tools',

		'Width':'Larghezza',

		'Height':'Altezza',

		'Refresh GoR every':'Ricarica GoR ogni',

		'Organize a Tax event (if happiness':'Organizza il Giorno delle Tasse (se la felicità è',

		'every':'ogni',

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

		'Right':'Destra',

		'Below':'Sotto',

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

IsChrome&&(window.unsafeWindow||(unsafeWindow=function(){var a=document.createElement("p");a.setAttribute("onclick","return window;");return a.onclick()}()));


// var JSON;if(!JSON){JSON={}}(function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];if(i&&typeof i==="object"&&typeof i.toJSON==="function"){i=i.toJSON(a)}if(typeof rep==="function"){i=rep.call(b,a,i)}switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i){return"null"}gap+=indent;h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1){h[c]=str(c,i)||"null"}e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]";gap=g;return e}if(rep&&typeof rep==="object"){f=rep.length;for(c=0;c<f;c+=1){if(typeof rep[c]==="string"){d=rep[c];e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}else{for(d in i){if(Object.prototype.hasOwnProperty.call(i,d)){e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}";gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict";if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;if(typeof JSON.stringify!=="function"){JSON.stringify=function(a,b,c){var d;gap="";indent="";if(typeof c==="number"){for(d=0;d<c;d+=1){indent+=" "}}else if(typeof c==="string"){indent=c}rep=b;if(b&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":a})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e==="object"){for(c in e){if(Object.prototype.hasOwnProperty.call(e,c)){d=walk(e,c);if(d!==undefined){e[c]=d}else{delete e[c]}}}}return reviver.call(a,b,e)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()
var JSON2 = JSON;
var FBsecondTimer = null;
var pbStartupTimer = null;
var my = {};
var Cities = {};
var currentName = 'Overview';
var Seed = unsafeWindow;
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
		logit ('bad xpath:'+xpath);
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
  }

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

HandlePublishPopup();

function HandlePublishPopup() {
 //if(GlobalOptions.autoPublishGamePop){
		var FBInputForm = ById('pop_content');
		if(FBInputForm){
			alert('Step 1');
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
//   }
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
    if (Options.EnableDash && Options.DashPos == 0) {
    	if (Options.pbChatOnRight) ById('Dash_div').style.left ="1122px";
    	else ById('Dash_div').style.left ="780px";
    }
    
    if (tf == t.chatIsRight)
      return;
    if (tf){
      var chat = document.getElementById('kocmain_bottom');
       if (!chat || chat.className!='mod_comm')
        setTimeout (function (){t.setChatOnRight(tf)}, 1200); 
    
      if (getMyAlliance()[1]!=uW.arStrings.Common.None)
       document.getElementById("chat_button2").innerHTML="<span>" +getMyAlliance()[1]+ "</span>";
      document.getElementById("comm_tabs").style.left = '761px';
      document.getElementById("comm_tabs").style.top = '-567px';
      document.getElementById("comm_tabs").style.backgroundColor="#60533E";
      var div = searchDOM (document.getElementById('kocmain_bottom'), 'node.tagName=="DIV" && node.className.indexOf("comm_body comm_global")>=0', 7);
      if (div){
        div.style.left = '761px';
	  	div.style.top = '-542px';
	  	div.style.height= '700px';
        div.style.backgroundColor="#60533E";
      	var div1 = searchDOM (div, 'node.tagName=="DIV" && node.className.indexOf("chat-wrapper")>=0', 7);
      	if (div1){
        	div1.style.height='700px';
        	div1.style.width='347px';
      	}
      }
      document.getElementById("mod_comm_list1").style.height= '650px';
      document.getElementById("mod_comm_list2").style.height= '650px';
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
  div.innerHTML = '<DIV style="font-size:18px; background-color:#a00; color:#fff"><CENTER><BR>'+ScriptName+' '+translate("ha detectado que no se ha cargado GoR")+'<BR>'+translate("Refrescando")+' <SPAN id=pbwdsecs></span><BR><INPUT id=pbwdcan type=submit value="'+translate("Cancelando refresco")+'"><BR><BR></div>';
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
  
  parent.document.getElementById("iframe_gorgame").style.width='100%';
  
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
   ['Crest', 'Crest'],
   ['attaque', 'Auto'+uW.arStrings.Common.Attack],
   ['Marks', 'Info'],
   ['KDO', uW.arStrings.Common.Gift],
   ['Spam','Spam'],
   ['Manager' , 'Manager'],
   ['ActionLog', 'Log'],
   ['BoTTols' , 'GoR BoTTols'],
   ['scanmap', 'Scan Map'],
   ['News', 'News'],
   ['AutoRes', 'Auto'+uW.arStrings.Common.Research],
   ['Germ', 'Germania'],
   ['AutoAtt', 'Multi'+uW.arStrings.Common.Attack],
   ['Herb', uW.arStrings.buildingName.b50],
   ['Inventory', uW.arStrings.Common.Inventory],
   ['Build', 'Auto'+uW.arStrings.Common.Building],
   ['Options' , uW.arStrings.MainChrome.Chat_UserSettings_Title.toUpperCase()],
   ['Dash', 'Dash']
//   ['ImpExp', 'Imp-Exp']
];
  readOptions();
  readColors(); 
  
  var m = '.xtab {padding: 2px; border:none; background:none; white-space:nowrap;}';
      m+= '.sc1 { background:url("http://gamespowerita.com/Tools/GoR/Plugins/Avatar/Tiestoale.png") no-repeat scroll 0px 0 transparent !important; }';
      m+= '.merdaccia { background:url("http://gamespowerita.com/Tools/GoR/Plugins/Avatar/Cacca1.png") no-repeat scroll 0px 0 transparent !important;}';
      m+= '.scThy { background:url("http://gamespowerita.com/Tools/GoR/Plugins/Avatar/Thyrus1.jpg") no-repeat scroll 0px 0 transparent !important;}';
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
	  m+= '.ptChatWhisper {font-weight:bold; color:#FF4D4D; background-color:#FFDE75;}';
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
	  m+= '.comm_body { width:350px !important;}';
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
  readAutoBuild();
  readAutoResearch();
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
	cont.style.overflowY = 'scroll'; 
    cont.style.maxHeight = (Options.HeightTools)-30+'px';
    mainDiv.appendChild(cont);
  }

  setTabStyle (document.getElementById ('aaOverview'), true);
  my.Overview.getContent().style.display = 'block';
  window.addEventListener('unload', onUnload, false);
  if (parseInt(Options.Lingua) == 0)
  {
	if (ById('idp_outer')) ById('idp_outer').style.display="none";
	alertlang();
  }
  else
  {
  							if (Options.ptWinIsOpen){
    							mainPop.show (true);
    
    							my["Options"].show();
    							my["Options"].hide();
     
    							my[currentName].show();
    						}
							if (Options.alertConfig.hq == "") alerthq();
  							AddMainTabLink(ScriptName, eventHideShow, mouseMainTab);
  							actionLog(ScriptName, "<div style='font-weight:bold;text-shadow: 1px 1px 1px #AAA;font-variant:small-caps;'><a href='"+sitesupport+"' target='_blank'>"+ScriptName+"</a> <span style='color:green'>"+translate('Cargado')+"</span><BR>"+translate('Version')+": <span style='color:red'>"+Version+"</span>");
  	}
  	
  CheckUpdates();
  
  CollectGold.init();
  CollectRessource.init();
  RefreshEvery.init();
  FoodAlerts.init();
 // setTimeout (function() {
  	ScoutAlert.init();
 // }, 60000);
  //  AutoDeleteReports.init();

  AutoDeleteGoRMessage.init();  
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
    if (getMyAlliance()[1] != uW.arStrings.Common.None) t.getAllianceLeaders();
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
      var a = uW.arStrings.Common.None;
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

    if (m[0].indexOf(uW.arStrings.Chat.WhispersToYou) >= 0) {
		msg = msg.replace ("class='content on'", "class='content ptChatWhisper'");
		msg = msg.replace ("class='content off'", "class='content ptChatWhisper'");
    	if (Options.Chuchoenabled)
       		msg = msg.replace (uW.arStrings.Chat.WhispersToYou,'<font color=red>'+uW.arStrings.Chat.WhispersToYou+'</font><span style="visibility:hidden"><object type="application/x-shockwave-flash" data="'+SWF_PLAYER_URL+'" width="10" height="10" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+SWF_PLAYER_URL+'" /><param name="flashvars" value="mp3='+Options.urlChucho+'&amp;autostart=1&amp;showtime=1&amp;volume=100" /></object></span>');   
    }
    
    if (m[0].indexOf('*** '+uW.arStrings.Common.Arrival.toUpperCase()+' ***') >= 0) {
		msg = msg.replace ("class='content on'", "class='content ptChatAttack'");
		msg = msg.replace ("class='content off'", "class='content ptChatAttack'");
       	msg = msg.replace (msg,msg+'<div style="position: absolute; background-image: url(\'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAZAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQECAQECAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAEgASAwERAAIRAQMRAf/EAJgAAAIDAAAAAAAAAAAAAAAAAAYHAAgJAQABBQEAAAAAAAAAAAAAAAAFAQYHCAkKEAAABQIDBQQLAAAAAAAAAAABAgQFBwMGABI2ETFWNwghIzRlQYETM2QVNRYXZxgRAAIAAgcDCAUNAAAAAAAAAAECAwQAETESBQYHQSIyIWFiEzM0NQhRcVRkNkJScqIjUxQVZRZWFxj/2gAMAwEAAhEDEQA/AMPs5ANkE5APlE+QTlA2QogBqmUR25CiPabcGMu6mqvVGquqzb6PXzU6ny6BrhYB6iaqxXULTV6BtNgpo/C0Wxl0yRzb/Vd1TW033jcd1ovmvSz0xPqelWGQ6wlE7dM0ssyoO4ihtq7K7M2qSAW4KhSqq5Rbi0SLrEZIybg+SsHGoWoAA5K5WWYAszEbrFDa7fJU8ijebZTPHW/WPOetGcX8vHl7djGvXcWxVCRCloYNUSGsVeEKQREZTfdh1UPevMlSPz1e3DMTc9v6D5b2zqfhD6Vy98t8F8LgN/c/6TJ+JfiLB2X3XDxdKzmo/P8AH0T+XY38L/lfaP3j2zj+pxdKiJ+9LviyTI5eG+OW+/VjE+2pIiyJZUTOyGOr3t2ijWKWh5u5nqCiVqraXtTtVBurkA1B4OoKQSKkJVJcNnIT4DhEX9yZhErFlIERoaC6Ir9arIWhbjDlDojRIbn7O7eYBiqsH1vm8R1ezmuVNCIsVs8SklHlsQxSDMNDlZSTik9ZKsQGR5h3XcKjrYZG6ygllYUhS/IM93o/SzKT+vuW9rqVnruTitpLUlBPQpiAJmhjbF6Fsrs9vNRO4SpgTUSlJT2gBgynMJz3mzF824285icQGEvJChqylISGxRcd0LEVFmDMTtqNaicPLhpvlrTnTSUksDwibwrEZgFpsTghmdjRlYq0SO8MkFWILQgCAqEVKtlA3DLpPlBVl1FdurPc2XrvU+kGzwn6+4Z8p9ngxP8Ahsl3Pimu6dh3l+L3z273i9StPlu7HNPgHxHG8M+iveen8zmroVDv9Pr34DUsubdtJhaJT//Z\');   background-repeat: no-repeat; border-radius: 3px 3px 3px 3px; height: 18px; width: 18px; border: 2px inset rgb(96, 0, 0); box-shadow: 0px 0px 2px rgb(255, 255, 255); left: 300px; top: 10px; "></div>');    
       	if(Options.Attackenabled)
       		msg = msg.replace ('*** '+uW.arStrings.Common.Arrival.toUpperCase()+' ***','*** '+uW.arStrings.Common.Arrival.toUpperCase()+' ***'+'<span style="visibility:hidden"><object type="application/x-shockwave-flash" data="'+SWF_PLAYER_URL+'" width="10" height="10" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+SWF_PLAYER_URL+'" /><param name="flashvars" value="mp3='+Options.urlAttack+'&amp;autostart=1&amp;showtime=1&amp;volume=100" /></object></span>');   
	} 
	
    if (m[0].indexOf(uW.arStrings.ModalMessagesViewReports.ScoutingAt) >= 0){
      	msg = msg.replace ("class='content on'", "class='content ptChatScout'");
		msg = msg.replace ("class='content off'", "class='content ptChatScout'");
       	msg = msg.replace (msg,msg+'<div style="position: absolute; background-image: url(\'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAUAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgICAgICAgICAgMCAgIDBAMCAgMEBQQEBAQEBQYFBQUFBQUGBgcHCAcHBgkJCgoJCQwMDAwMDAwMDAwMDAwMDAEDAwMFBAUJBgYJDQsJCw0PDg4ODg8PDAwMDAwPDwwMDAwMDA8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAEgASAwERAAIRAQMRAf/EAJMAAAMBAQAAAAAAAAAAAAAAAAQFCAcJAQACAgMAAAAAAAAAAAAAAAACBQQGAAEHEAABAgMEBQURAAAAAAAAAAABAgMEBQYAETQHITESMjPwYUIUCEHBUmKCohNTY3ODVBVVFlaWEQABAgMFBgQHAAAAAAAAAAABAgMAEQQhMVESBfBBYXGBBpGhseHBIjJCghMU/9oADAMBAAIRAxEAPwCooGW52mUNVJmF2gZPR6n2y+7KKdpyDMvhB4CouauOOuhOgFRCL+a3L0u0hIQ2yVHiozPRMh6x0lymqkZlLcSkDgJDqZn0hrIJ5mBHoKqcz5pSr1BG22o0+wta03Ai4wc1Sm8gjo3aRotj7IYkpTKkg4mzzEFTFNQcgdQoi+VpE8bYG/L8xv2leK6vhobGes3OH7PzrRv2DDjDL+YeUoUV9kBGVfBVy1PYlqtzU0CiDp9Ma85BGSN+jcYdbgw2HWwHEulRWUbYUEnaIGzZ3oOusaefnanfMi+3nFQ7s7df1tkobfyKCkqSCDlCkkKE5XiYtnCPIrs/qyGy1rajIp6IrlU+gQiUxr8WtcRAOpCdhbbiYdsNlgNoS0EK7h0hNybO63uqidbDQbUU780t8JNE7N1JiqXUvvNhZCUgIBAATM/cZkme/dZGAfUc4/v0FiuocNWP+b3t7xNXPasSpsDj+OHvF+zVGI98Y6oMb3R8rvWTN3wa4FmuEiPdK4evVbTkHT/UOcR9/O47l8W0jx2+ETvC/brH/9k%3D\');   background-repeat: no-repeat; border-radius: 3px 3px 3px 3px; height: 18px; width: 18px; border: 2px inset rgb(96, 0, 0); box-shadow: 0px 0px 2px rgb(255, 255, 255); left: 300px; top: 10px; "></div>');
    	if(Options.Spyenabled)
  		    msg = msg.replace (uW.arStrings.ModalMessagesViewReports.ScoutingAt,uW.arStrings.ModalMessagesViewReports.ScoutingAt+'<span style="visibility:hidden"><object type="application/x-shockwave-flash" data="'+SWF_PLAYER_URL+'" width="10" height="10" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+SWF_PLAYER_URL+'" /><param name="flashvars" value="mp3='+Options.urlSpy+'&amp;autostart=1&amp;showtime=1&amp;volume=100" /></object></span>');   
    }
    if (m[0].indexOf("besoin de bananes") >= 0 || m[0].indexOf("is running out of food") >= 0 || m[0].indexOf("ha bisogno di cibo") >= 0 || m[0].indexOf("** "+translate('se está quedando sin comida')+" **") >= 0) {
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
 		return msg = '<br><font color="red" size="10px"><b><center>Glory of Rome - Scan Map<br></b><a target="_Sitesupp" href="'+sitesupport+'">'+sitesupport+'</a></center></font><br>';
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
/**    if (suid[1] == 3583460) {	// Dark_Angel (Roberta)
    
    }
**/
/**    if (Gay.indexOf(suid[1]) > -1) {
       msg = msg.replace ("<div class='avatar", "<div class='avatar merdaccia");
     }		
***/
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
         	} 
          }     
		});
	}
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
   	   a+=" ("+uW.arStrings.Castle.CurrentlyDefending.toUpperCase()+") ";
   	  else
   	   a+=" ("+uW.arStrings.Castle.CurrentlyHiding.toUpperCase()+") ";
    }
     var b=Cities.byID[f.id].c.marches.incoming[c.id];
     var attaquant=unsafeWindow.GOR.players[c.from.playerId]?unsafeWindow.GOR.players[c.from.playerId].name:"?";
     
     var msg ='';
     var arrivalTime = b.secondsToDestination()>0?timestr(b.secondsToDestination()):message;
     msg += b.general.level?" "+uW.arStrings.Common.General+" : "+b.general.level:"";
     msg +=' *** '+uW.arStrings.Common.Arrival.toUpperCase()+' *** ';
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
		msg += ' *** '+translate('MIS TROPAS')+' *** ';
     unsafeWindow.Barracks.allUnitIds.each(function(r){
      if (unsafeWindow.arStrings.unitName["u"+r]) {
		  if(Cities.byID[f.id].c.troops[r].count() > 0)
          msg += unsafeWindow.arStrings.unitName["u"+r]+': '+parseInt(Cities.byID[f.id].c.troops[r].count())+', ';
      }
     });
     }
		
    var mess = Options.alertConfig.aPrefix  +" "+uW.arStrings.Common.Target+" : " + a +" "+uW.arStrings.Common.Attacker+" : " + " " +attaquant + " "+e+" " + msg;

    var lancement=0;
    
    sendChat("/a " + mess);

  }		
 }
 
     
/************************ MARCHES ************************/
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
                 
                 ma +="<td "+couleur+">" +(b.general.level?" "+uW.arStrings.Common.Lvl+" "+b.general.level:" unknown ") + "</td>";
                 
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
       m+= '<DIV class=ptstat>'+translate('MARCHAS SALIENTES')+'</div>';
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
             m += "<table class='marches' width=100% cellspacing=0 bordercolor=black cellpadding=4><tr style='height:30px'><td></td><td><b>"+translate('Refuerzos de ciudad')+"</td><td><b>"+uW.arStrings.Embassy.SentFrom+"</td><td><b>"+uW.arStrings.Common.UpKeep+"</td><td>"+uW.arStrings.Common.Troops+"</td><td>"+uW.arStrings.Common.Time+"</td></tr>";
                 m += ms;
                 m += "</table><br>";
       
           
     }
      
      
     document.getElementById('marchesContent').innerHTML = m;
     t.displayTimer=setTimeout(t.show, 4000);
    },
    hide : function (){
     var t = my.marches;
     clearTimeout (t.displayTimer);
    }
 }; 
 
/************************ RAPPORTS ************************/
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
       uW.AjaxCall.gPostRequest("deleteCheckedReports.php",g,
       function(i){
       		uW.seed.newReportCount = 0;
       })
    },
   show : function () {
     var t = my.Hud;
     t.minPages=parseInt(Options.arPageFrom);
     t.maxPages=parseInt(Options.arPageTo);
       t.getAllianceReports();
       unsafeWindow.getReport = t.getReportBody;
       t.cont.innerHTML = '\
           <DIV class=ptstat>'+translate('CONSULTAR LOS INFORMES DE LA ALIANZA')+'</div>\
           <DIV class=ptentry style="height:30px"><table>\
           <tr><td class=xtab>'+uW.arStrings.Common.Page+':&nbsp;<INPUT id="idRptPageFrom" size=1 value="' + t.minPages + '">&#8211;<INPUT id="idRptPageTo" size=1 value="' + t.maxPages + '"> \
           <span id=idSpanNumPages></span>\
           </td>\
           <TD class=xtab><INPUT id="idHudSearch" type=submit value="'+uW.arStrings.Common.OK_Button+'" />\
           <span id=idSpanHudErrorMsg></span><td><select id="idHudTypeSearch"><option value="">'+uW.arStrings.Common.All+' '+uW.arStrings.Common.Reports+'</option><option value="0">'+uW.arStrings.Watchtower.IncomingAttacks+'</option><option value="1">'+translate('Ataques salientes')+'</option><option value="2">'+uW.arStrings.Common.Reinforce+'</option></select>\
           <select id="idHudMedSearch"><option value="">'+uW.arStrings.Common.All+' '+uW.arStrings.Common.Reports+'</option><option value=1>'+translate('Mis informes')+'</option></select></td><td><input type="button" value="'+uW.arStrings.Common.Reports+': '+uW.arStrings.MessagesModal.DeleteAll_button+'" id="BOSuppRapp1"></tr>\
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
    			m+='<TABLE style="float:left;width:45%;" class=ptTab><tr><td colspan=3><b>'+uW.arStrings.Common.Attacker+': '+Nom1+' <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ Coord1 +');" class="coordinateLink">('+ Coord1 +')</a></b><br>'+uW.arStrings.Common.General+': '+ rslt['s1KCombatLv'] +'<br>'+translate('Número de visitas')+': '+rslt['rnds']+'<br>'+translate('Bonus')+': '+ parseInt(rslt['s1atkBoost']*100)  +' % '+uW.arStrings.Common.Attack+' - '+ parseInt(rslt['s1defBoost']*100) +' % '+uW.arStrings.Troops.Defense+'</td></tr>\
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
      	
      	if (rslt['unts'] != undefined) { // per i rinforzi :) lol ca sert pas pour le moment
      	    // Rinforzato !
    	   m+='<TABLE style="float:right;width:45%;" class=ptTab><TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">'+uW.arStrings.Common.Troops+'</td><TD align="center">'+translate('Refuerzos')+'</td></tr>';
  
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
  	  		if (rslt['rnds']!=undefined) m+='<br>'+translate('Número de visitas')+': '+rslt['rnds']+'<br>';
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
  	  	
  	  	   m += '</table><tr><td style="background-color:white;"><b><u>'+translate('Se han encontrado resultados')+'</u></b><br><br>';
  	  	
  	  	
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
  	     	  		  	m+='<tr><td>'+translate('Objetos encontrados')+':</td>';
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
      	t.popReport.getTopDiv().innerHTML = '<TD align="center"><B>'+translate('Informes de ataque')+' - '+unsafeWindow.formatDateByUnixTime(Date1)+'</td>';
      	t.popReport.show(true);
      	
      	
      	
    },
    DisplayReports : function (){
      var t = my.Hud;
      var data = t.data;
      var filtre =  document.getElementById("idHudTypeSearch").value;
      var filtre2 =  document.getElementById('idHudMedSearch').value;
      var results=document.getElementById("hudResultsDiv");
      if(!t.data.length) {
         results.innerHTML = '<center><b>'+translate('No hay informes encontrados')+'</b></center>';
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
                else rpt.marchName = translate('desconocido');
                
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
            results.innerHTML = uW.arStrings.MapHelper.Searching+' '+uW.arStrings.Common.Page+' ' + (parseInt(page)+1) + ' '+translate('de')+' ' + t.maxPages;
            t.getAllianceReports(parseInt(page)+1);
         }
         else if (page) 
             t.DisplayReports();
      }
    },
    
    handleHudSearch : function() {
      var t = my.Hud;
      var results=document.getElementById("hudResultsDiv");
      results.innerHTML = uW.arStrings.MapHelper.Searching+' '+uW.arStrings.Common.Page+' ' + t.minPages + ' '+translate('de')+' ' + t.maxPages;
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
  	}
  
  }
  
/************************ GENERALS ************************/
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
            			m+= "<a href=# onclick='NeighborPanel.postOffering("+b.fbuid+");'>"+uW.arStrings.MainChrome.SendOfferings+"</a><br>";
           			}
           			if(b.idle()) {
           				if (b.energy()<b.maxEnergy) {
            				m+= "<a href=# onclick=\"BOGenePubl("+city.c.id+","+b.fbuid+",'"+b.name+"',"+b.id+");return false;\">"+uW.arStrings.Generals.AskForEnergy+"</a><br>";
	        			}
           			} else {
        				m+= "<b><i>"+translate('Fuera de la ciudad')+"...</i></b>";
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

/************************ WILDS ************************/
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
  }
   
}

/************************ Auto Post Scout ************************/
var ScoutAlert = {

  minuteTimer : null,
  totPage : null,
  curPage : null,
    
  init : function (){
    var t = ScoutAlert; 
    t.CheckTotalPage();
  },
  
  CheckTotalPage : function ()
  {
  	var t = ScoutAlert;
  	if (Options.alertConfig.aChatScout)
  	{
    	var g={};
    		g.pageNo = '';
    	uW.AjaxCall.gPostRequest("listReports.php",g,
    		function (rslt)
    		{
    			t.totPage = rslt.totalPages;
    			if (t.totPage > 0)
    			{
    				t.curPage = 1;
    				t.ReadPage();
    			}
    		},
    		function (rslt)
    		{
    			t.minuteTimer = setTimeout (function (){ t.CheckTotalPage; }, 5 * 60 * 1000);	// 1 min
    		}
    	);
    }
    else
    {
    	t.minuteTimer = setTimeout (function (){ t.CheckTotalPage; }, 2 * 60 * 1000);	// 2 min
    }
  },
  
  ReadPage : function ()
  {
  	var t = ScoutAlert;
  	if (t.curPage > t.totPage)
  	{
  		t.minuteTimer = setTimeout (function (){ t.CheckTotalPage; }, 5 * 60 * 1000);
  	}
  	else
  	{
    	var g={};
    		g.pageNo = t.curPage;
    	uW.AjaxCall.gPostRequest("listReports.php",g,
    		function (rslt)
    		{
    			t.getScoutReport(rslt);
    		},
    		function (rslt)
    		{
    			t.minuteTimer = setTimeout (function (){ t.CheckTotalPage; }, 60 * 1000);	// 1 min
    		}
    	);  		
  	}
  },
  
   getScoutReport : function (rslt)
   {
   		var t = ScoutAlert;
        var NR = rslt.arReports;
        for (k in NR)
        {
        	for (var c=0; c<Cities.numCities; c++)
        	{
        		var city = Cities.cities[c]; 
        		if(NR[k].side1XCoord == city.c.x && NR[k].side1YCoord == city.c.y) return;
        	}
        	if(NR[k].marchType == 3 && NR[k].reportStatus == 2)
        	{
        		var b = uW.arStrings.ModalMessagesViewReports.ScoutingAt+' '+NR[k].side0XCoord+','+NR[k].side0YCoord+'! '+translate('La exploracion proviene de')+' ';
        			b+= '('+NR[k].side1XCoord+','+NR[k].side1YCoord+'). '+uW.arStrings.Common.Date+': '+timeConverter(NR[k].reportUnixTime);
        		sendChat("/a " + b);
        		var MarchId = NR[k].marchReportId;
        		document.getElementsByTagName(MarchId).checked = true;
				t.ReadReport(MarchId);
        	}
        }
       	t.curPage++;
       	t.minuteTimer = setTimeout (t.ReadPage, 5 * 1000);	// 5 sec
    },
    
		ReadReport : function (MID){
    	var t = ScoutAlert;
	   	var g={};
        g.s0rids = MID;
        unsafeWindow.AjaxCall.gPostRequest("readCheckedReports.php",g,
        function(rslt)
        {	
        	if(!rslt.ok) setTimeout (function (){ t.ReadReport(MID); }, 2000);
        	else uW.seed.newReportCount = uW.seed.newReportCount - 1;
        });    	
    }
}

/************************ Auto Delete GoR Message ************************/
var AutoDeleteGoRMessage = {
  minuteTimer : null,
  timerdelete : null,
  numreport : [],
  page : null,
  cont : null,
  
  init : function (){
    var t = AutoDeleteGoRMessage;
    t.cont = 1;
    if (Options.EnableMesRep) t.CheckPage();
    else t.minuteTimer = setTimeout (t.init, 5*60*1000);
  },
    
  CheckPage : function ()
  {
  	var t = AutoDeleteGoRMessage;
	var g={};
    	g.pageNo=1;
    	g.requestType="GET_MESSAGE_HEADERS_FOR_USER_INBOX";
    	g.boxType="inbox";
 		uW.AjaxCall.gPostRequest("getEmail.php",g,
        	function (rslt)
        	{
        		t.page = rslt.noOfPages;
        		if (t.page > 0) t.start();
    			else t.minuteTimer = setTimeout (t.CheckPage, 5*60*1000);
        	},
        	function (rslt)
        	{
        		t.minuteTimer = setTimeout (t.CheckPage, 5*60*1000);
        	}
        );
  },
  
  start : function ()
  {
  	var t = AutoDeleteGoRMessage;
  	if (!Options.EnableMesRep)
  	{
  		t.init();
  		return;
  	}
  	
  	if (t.cont <= t.page)
  	{
  		var g={};
    		g.pageNo=t.cont;
    		g.requestType="GET_MESSAGE_HEADERS_FOR_USER_INBOX";
    		g.boxType="inbox";
 		uW.AjaxCall.gPostRequest("getEmail.php",g,
        	function(rslt)
        	{
        		t.timerdelete = setTimeout ( function () { t.deleterep(rslt); }, 5 * 1000); // 5 sec
        	},
        	function (rslt)
        	{
        		t.start();
        	}
        );	
    }
    else
    {
    	t.cont = 1;
		t.minuteTimer = setTimeout (t.init, 5*60*1000);
    	
    }
  },
  
  deleterep : function (rslt)
  {
  	var t = AutoDeleteGoRMessage;
	var MS = rslt.message;
	for (k in MS){
		var ID = MS[k].messageId;
		var SUB = MS[k].subject.toLowerCase();
		var BY = MS[k].fromUserId;
		var del = false;
		if (SUB.indexOf('acquista') >= 0) del = true;  
		if (SUB.indexOf('vinci') >= 0) del = true;
		if (SUB.indexOf('gratis') >= 0) del = true;
		if (SUB.indexOf('pacco') >= 0) del = true;
		if (SUB.indexOf('sconto') >= 0) del = true;
		if (SUB.indexOf('fortuna') >= 0) del = true;
		if (SUB.indexOf('ottieni') >= 0) del = true;
		if (SUB.indexOf('oro') >= 0) del = true;
		if (SUB.indexOf('gratis') >= 0) del = true;
		if (SUB.indexOf('nuove') >= 0) del = true;
		if (SUB.indexOf('commercio') >= 0) del = true;
		if (SUB.indexOf('invia') >= 0) del = true;
		if (SUB.indexOf('monete') >= 0) del = true;
		if (SUB.indexOf('oro') >= 0) del = true;
		if (SUB.indexOf('vinci') >= 0) del = true;
		if (SUB.indexOf('gratis') >= 0) del = true;
		if (SUB.indexOf('spendi') >= 0) del = true;
		if (SUB.indexOf('ricevi') >= 0) del = true;
		if (SUB.indexOf('scontati del') >= 0) del = true;
		// if (SUB.indexOf('nessun oggetto') >= 0) del = true;
		if (SUB.indexOf('torneo') >= 0) del = false;
		if (SUB.indexOf('aggiornare') >= 0) del = false;
		if (del && BY == 0){
			uW.seed.newMailCount = uW.seed.newMailCount-1;
			t.numreport.push(ID);	
		}
	}
    if (t.numreport >= 5) t.deletemess();
    t.cont++;
    t.start();
   },
   
   deletemess : function ()
   {
   	var t = AutoDeleteGoRMessage;
    var g={};
    	g.requestType="ACTION_ON_MESSAGES";
    	g.selectedAction="delete";
    	g.boxType="inbox";
    	g.selectedMessageIds=t.numreport;
	uW.AjaxCall.gPostRequest("getEmail.php",g,
    	function(rslt){	
			t.numreport = [];
       	},
       	function(rslt){
       		t.deletemess();
       	}
    );    		
  }
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
    }
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
                msg += translate('Mi ciudad')+' ' + Cities.cities[i].c.name.substring(0,15) + ' (' +
                       Cities.cities[i].c.x +','+ Cities.cities[i].c.y + ') ';
              msg += ' '+translate('se está quedando sin comida')+', '+translate('por favor enviar algunos')+'? '+translate('recursos')+': '+addCommasWhole(foodleft).replace(',',' ').replace(',',' ').replace(',',' ').replace(',',' ')+' ('+timestrShort(timeLeft)+') '+uW.arStrings.Common.Production+': '+addCommas(usage).replace(',',' ').replace(',',' ').replace(',',' ').replace(',',' ');
                sendChat ("/a " + msg);
                //alert(msg);
          }
      }  
    f.minuteTimer = setTimeout (f.e_eachMinute, 1800000);
   }
  }
}

/************************ REASSING ************************/
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
           t.statutREA.innerHTML = '<FONT COLOR=#550000>'+translate('No es posible enviar a la misma ciudad')+'!</font>';
          return;
     }
     if (totalunit==0) {
        t.statutREA.innerHTML = '<FONT COLOR=#550000>'+translate('Imposible')+' '+unsafeWindow.arStrings.Common.Reassign+' '+translate('con tropas 0')+'... pfff, '+translate('despierta')+' !</font>';
          return;
   }
   
      var maxtroupe=getTroopMax(SourceId);

      if (totalunit>maxtroupe) {
       t.statutREA.innerHTML = '<FONT COLOR=#550000>'+translate('Imposible')+' '+unsafeWindow.arStrings.Common.Reassign+' '+translate('más de')+' '+maxtroupe+' '+translate('tropas en un momento')+'.</font>';
       return;
      }
      
      t.actionREA.disabled=true;
      var x=t.destinationCity.c.x;
      var y=t.destinationCity.c.y;
     t.statutREA.innerHTML = "<i><b>"+uW.arStrings.Common.Loading+"........</b></i>";
     
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
             	   			a.id=Number(zz.marchId);
            	   			a.to.tileId=Number(zz.tileId);
            	  			a.to.tileType=Number(zz.tileType);
            	   			a.to.tileLevel=Number(zz.tileLevel);
            	   			a.to.playerId=Number(zz.tileUserId);
            	   			a.to.cityId=Number(zz.tileCityId);
            	   			a.setStatus(unsafeWindow.Constant.MarchStatus.OUTBOUND);
            	   			a.setMarchTime(unsafeWindow.unixtime(),unsafeWindow.unixtime()+j,0);
            	   			Cities.byID[id].c.marches.outgoing[a.id]=a;
            	   			unsafeWindow.KTrack.event(["_trackEvent","March",i,unsafeWindow.player.level]);
             t.statutREA.innerHTML ="<font color=red size='3px'><b>"+translate('Realizado')+"<b></font>";
      t.actionREA.disabled=false; 
                	 	},
                 		function(zz){
      t.statutREA.innerHTML ="<font color=red size='3px'><b>Error !!<b></font>";
      t.actionREA.disabled=false; 
          		}, false);
       
 	
     
     }else{
      t.statutREA.innerHTML ="<font color=red size='3px'><b>Error<b></font>";
      t.actionREA.disabled=false; 
     }
  
  },
  calculateTime: function(id,b,g,e) {
  var c=65535,a=Math.abs(Cities.byID[id].c.x-g),f=Math.abs(Cities.byID[id].c.y-e),d=Math.sqrt((a*a)+(f*f));
  h=unsafeWindow.Unit.stats[b].speed*1;
  if(h<c){c=h;}
  return Math.ceil(d*6000/c)+30;
  }
}

/************************ TRANSPORT ************************/
my.TranspAuto = {
 cont : null,
 displayTimer : null,
 state : null,
 curTabBut : null,
 curTabName : null,
 sourceCity : {},
 destinationCity : {},
 rows : [],

 init : function (){
   var t = my.TranspAuto;
   t.cont = document.createElement('div');
   t.state = null;
   t.tradeRoutes= [];
    
     t.traderState = {running: false};  
     setTimeout(function() {
      t.readTraderState();
      t.readTradeRoutes(); 
      t.e_tradeRoutes();
     },1000);
     //window.addEventListener('unload', t.onUnload, false);

   return t.cont;
 },
  getContent : function (){
    var t = my.TranspAuto;
    return t.cont;
  },
  hide : function (){
    var t = my.TranspAuto;
    t.state = null;
    t.saveTradeRoutes();
    t.saveTraderState();
    clearTimeout (t.displayTimer);
  },
  
  show : function (){  
   var t = my.TranspAuto;
   var rownum = 0;

   var ModelCity = {};
      
     
  
    t.cont.innerHTML = '<center><TABLE class=ptTab align=center><TR><TD><INPUT class=bopbSubtab ID=BoTrpSubM type=submit value="'+translate('Manual')+'"></td>\
             <TD><INPUT class=bopbSubtab ID=BoTrpSubA type=submit  value="'+translate('Automatico')+'"></td><TD><INPUT class=bopbSubtab ID=BoTrpSubR type=submit DISABLED  value="Appro"></td></tr></table></center>\
         <DIV id="BoTrpOutput" style="margin-top:5px; background-color:white; height:'+(Options.HauteurBoite-65)+'px;max-height:'+(Options.HauteurBoite-65)+'px;overflow-y:auto"></div>';
        t.TransportDiv = ById('BoTrpOutput'); 
  ById('BoTrpSubA').addEventListener('click', e_butSubtab, false);
  ById('BoTrpSubM').addEventListener('click', e_butSubtab, false);
  ById('BoTrpSubR').addEventListener('click', e_butSubtab, false);
   changeSubtab (ById('BoTrpSubM'));  
  
        function e_butSubtab (evt){
            changeSubtab (evt.target);   
        }
      
        function changeSubtab (but){
            if (but == t.curTabBut)
              return;
            if (t.curTabBut){
              t.curTabBut.className='bopbSubtab'; 
              t.curTabBut.disabled=false;
            }
            t.curTabBut = but;
            but.className='bopbSubtab bopbSubtabSel'; 
            but.disabled=true;
            t.curTabName = but.id.substr(8);
            t.show2();
      }
  },
  show2 : function (){
       var t = my.TranspAuto;
       t.state = null;
       clearTimeout (t.displayTimer);
       clearTimeout (t.timer);
       if (t.curTabName == 'M')
         t.showManuel();
       else  if (t.curTabName == 'R')
         t.showReappro();
       else {
         t.showAuto();
         t.showTimer();	
       }
    },
    showTimer: function() {
     var t = my.TranspAuto;
     t.updateTroops();
     t.updateResources();  
     t.timer = setTimeout (t.showTimer, 1000); 
  },
  showAuto: function() {
     var t = my.TranspAuto;
      var m = '<DIV id=pbTowrtDivF class=ptstat>AUTO '+uW.arStrings.Common.Transport.toUpperCase()+' - '+translate('CONFIGURACION')+'</div><TABLE id=pbtraderfunctions width=100% height=0% class=pbTab><TR align="center">';
          logit(t.traderState.running);
          if (t.traderState.running == false) {
               m += '<TD><INPUT id=pbTraderState type=submit value="'+uW.arStrings.Common.Transport+' = OFF"></td>';
           } else {
               m += '<TD><INPUT id=pbTraderState type=submit value="'+uW.arStrings.Common.Transport+' = ON"></td>';
     	   }
           m += '<TD><INPUT id=pbShowRoutes type=submit value="'+translate('Mostrar rutas')+'"></td>';
           m += '</tr></table></div>';
           m += '<DIV id=pbTraderDivDRoute class=ptstat>'+translate('OPCIONES')+'</div>';
           m += '<TABLE id=pbtraderfunctions width=100% height=0% class=pbTab><TR align="left">';
     	 m += '<TD colspan=2>'+translate('Enviar un transporte cada')+' <INPUT id=pbtransportinterval type=text size=4 value="'+Options.transportinterval+'"\> '+uW.arStrings.TimeStr.timeMin+'</td>';
           m += '<TD colspan=4>'+translate('Enviar el transporte con un mínimo de')+' <INPUT id=pbminwagons type=text size=2 value="'+Options.minwagons+'"\> '+uW.arStrings.Common.Troops+'</td></tr></table>';
           m += '</table>';
           m += '<DIV id=pbTraderDivDRoute class=ptstat>'+translate('AÑADIR UN TRANSPORTE')+'</div>';
           m += '<TABLE id=pbaddtraderoute width=95% height=0% class=pbTab><TR align="left">';
           m += '<TR align="left"><TD>'+uW.arStrings.Common.From+' :</td> <TD colspan=4><DIV style="margin-bottom:10px;"><span id=ptrescity></span></div></td></tr>';
     
           m += '<TR align="left">';
           m += '<TD>'+uW.arStrings.Common.To+' :</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptcityTo></span></div></td>';
           m += '<TD>'+uW.arStrings.ChangeDomain.OR+'</td>';
           m += '<TD>X:<INPUT id=ptcityX type=text size=3\></td>';
           m += '<TD>Y:<INPUT id=ptcityY type=text size=3\></td></tr>';
           m += '<TABLE id=pbaddtraderoute height=0% class=pbTab><TR align="left">';
           m += '<TD width=75px>'+uW.arStrings.Common.Troops+' :</td><TD width=150px><SELECT id="TransportTroop">';
           unsafeWindow.Barracks.allUnitIds.each(function(r){
	             if (unsafeWindow.arStrings.unitName["u"+r]) 
	         	 m+= "<option  value='u"+r+"'>"+unsafeWindow.arStrings.unitName["u"+r]+"</option>";        
           });
           //for (y in uW.unitcost) m+='<option value="'+y+'">'+unsafeWindow.unitcost[y][0]+'</option>';
           m+='</select></td><TD width=75px>'+uW.arStrings.March.AvailableTroops+' :&nbsp;</td><TD id=TroopAmount align=left width=75px></td>';
           m+='<TD width=75px>'+translate('Estimada')+' :&nbsp;</td><TD id=CarryAmount align=left width=75px></td>';
           //m += '<TR><TD >Troupes : </td><TD><INPUT id=TroopsToSend type=text size=6 maxlength=6 value="0">&nbsp;&nbsp;</td>';
           m += '<TD width=50px></td>';
           m +='<TD id=Calc colspan=3></td></tr>';
           m += '<TABLE id=pbaddtraderoute height=0% class=pbTab><TR align="center">';
           m += '<TD width=5%>'+ unsafeWindow.arStrings.ResourceName[1] +'</td>';
           m += '<TD id=TransRec1 align=right width=110px></td>';
           m += '<TD id=HaveRec1 align=right width=110px></td>';
           m += '<TD width=55px align=right><INPUT id=pbshipFood type=checkbox unchecked=true\></td>';
           m += '<TD width=180px  align=left>'+translate('Mantener')+' : <INPUT id=pbtargetamountFood type=text size=11 maxlength=12 value="1000000" disabled=true\></td>';
           //m += '<TD width=100px>Transporter: <INPUT id=pbtradeamountFood type=text size=11 maxlength=12 value="0"\></td>';
           m += '<TD width=50px></td></tr>';
           m += '<TR align="center">';
           m += '<TD width=5%>'+ unsafeWindow.arStrings.ResourceName[2] +'</td>';
           m += '<TD id=TransRec2 align=right width=110px></td>';
           m += '<TD id=HaveRec2 align=right width=110px></td>';
           m += '<TD width=55px align=right><INPUT id=pbshipWood type=checkbox unchecked=true\></td>';
           m += '<TD width=180px align=left>'+translate('Mantener')+' : <INPUT id=pbtargetamountWood type=text size=11 maxlength=12 value="1500000" disabled=true\></td>';
           //m += '<TD width=100px>Transporter: <INPUT id=pbtradeamountWood type=text size=11 maxlength=12 value="0"\></td>';
           m += '<TD width=50px></td></tr>';
           m += '<TR align="center">';
           m += '<TD width=5%>'+ unsafeWindow.arStrings.ResourceName[3] +'</td>';
           m += '<TD id=TransRec3 align=right width=110px></td>';
           m += '<TD id=HaveRec3 align=right width=110px></td>';
           m += '<TD width=55px align=right><INPUT id=pbshipStone type=checkbox unchecked=true\></td>';
           m += '<TD width=180px align=left>'+translate('Mantener')+' : <INPUT id=pbtargetamountStone type=text size=11 maxlength=12 value="1500000" disabled=true\></td>';
           //m += '<TD width=100px>Transporter: <INPUT id=pbtradeamountStone type=text size=11 maxlength=12 value="0"\></td>';
           m += '<TD width=50px></td></tr>';
           m += '<TR align="center">';
           m += '<TD width=5%>'+ unsafeWindow.arStrings.ResourceName[4] +'</td>';
           m += '<TD id=TransRec4 align=right width=110px></td>';
           m += '<TD id=HaveRec4 align=right width=110px></td>';
           m += '<TD width=55px align=right><INPUT id=pbshipOre type=checkbox unchecked=true\></td>';
           m += '<TD width=180px align=left>'+translate('Mantener')+' : <INPUT id=pbtargetamountOre type=text size=11 maxlength=12 value="1500000" disabled=true\></td>';
           //m += '<TD width=100px>Transporter: <INPUT id=pbtradeamountOre type=text size=11 maxlength=12 value="0"\></td>';
           m += '<TD width=50px></td></tr>';
          
           m += '<TD width=5%>'+ unsafeWindow.arStrings.ResourceName[0] +'</td>';
           m += '<TD id=TransGold align=right width=110px></td>';
           m += '<TD id=HaveGold align=right width=110px></td>';
           m += '<TD width=55px align=right><INPUT id=pbshipGold type=checkbox unchecked=true\></td>';
           m += '<TD width=180px align=left>'+translate('Mantener')+' : <INPUT id=pbtargetamountGold type=text size=11 maxlength=12 value="0" disabled=true\></td>';
           //m += '<TD width=100px>Transporter: <INPUT id=pbtradeamountGold type=text size=11 maxlength=12 value="0"\></td>';
           m += '<TD width=50px></td></tr>';
     
           m += '</table>';
     
           m += '<DIV style="text-align:center; margin-top:15px"><INPUT id=pbSaveRoute type=submit value="'+translate('Añadir una ruta')+'"></div>';
           m += '<DIV id=errorSpace></div>'
        
    	 t.TransportDiv.innerHTML = m; 
     
      ById('TransportTroop').value = 'u9';
           
           t.tcp = new CdispCityPicker ('pttrader', ById('ptrescity'), true, t.updateResources, 0);
           t.tcpto = new CdispCityPicker ('pttraderTo', ById('ptcityTo'), true, t.clickCitySelect).bindToXYboxes(document.getElementById ('ptcityX'), document.getElementById ('ptcityY'));
           
           
         ById('TransportTroop').addEventListener('change', function(){t.updateTroops();}, false);
           ById('pbTraderState').addEventListener('click', function(){t.toggleTraderState(this);}, false);
           ById('pbSaveRoute').addEventListener('click', function(){t.addTradeRoute();}, false);
           ById('pbShowRoutes').addEventListener('click', function(){t.showTradeRoutes();}, false);
                      
           ById('pbtransportinterval').addEventListener('keyup', function(){
     		if (isNaN(ById('pbtransportinterval').value)){ ById('pbtransportinterval').value=60 ;}
     		Options.transportinterval = ById('pbtransportinterval').value;
     		saveOptions();
           }, false);
           
           ById('pbtargetamountFood').addEventListener('keyup', function(){
               if (isNaN(ById('pbtargetamountFood').value)) ById('pbtargetamountFood').value=0 ;
           }, false);
           ById('pbtargetamountWood').addEventListener('keyup', function(){
               if (isNaN(ById('pbtargetamountWood').value)) ById('pbtargetamountWood').value=0 ;
           }, false);
           ById('pbtargetamountStone').addEventListener('keyup', function(){
               if (isNaN(ById('pbtargetamountStone').value)) ById('pbtargetamountStone').value=0 ;
           }, false);
           ById('pbtargetamountOre').addEventListener('keyup', function(){
               if (isNaN(ById('pbtargetamountOre').value)) ById('pbtargetamountOre').value=0 ;
           }, false);
           ById('pbtargetamountGold').addEventListener('keyup', function(){
               if (isNaN(ById('pbtargetamountGold').value)) ById('pbtargetamountGold').value=0 ;
           }, false);

          ById('pbminwagons').addEventListener('keyup', function(){
              if (isNaN(ById('pbminwagons').value)) ById('pbminwagons').value=100 ;
              Options.minwagons = parseInt(ById('pbminwagons').value);
              saveOptions();
          }, false)
           
           ById('pbshipFood').addEventListener('click', function(){
               if (ById('pbshipFood').checked==false) {
                   ById('pbtargetamountFood').disabled = true;
               }
               else {
                 ById('pbtargetamountFood').disabled = false;
               }
           },false);
           ById('pbshipWood').addEventListener('click', function(){
               if (ById('pbshipWood').checked==false) {
                   ById('pbtargetamountWood').disabled = true;
               }
               else {
                 ById('pbtargetamountWood').disabled = false;
               }
           },false);
           ById('pbshipStone').addEventListener('click', function(){
               if (ById('pbshipStone').checked==false) {
                   ById('pbtargetamountStone').disabled = true;
               }
               else {
                 ById('pbtargetamountStone').disabled = false;
               }
           },false);
           ById('pbshipOre').addEventListener('click', function(){
               if (ById('pbshipOre').checked==false) {
                   ById('pbtargetamountOre').disabled = true;
               }
               else {
                 ById('pbtargetamountOre').disabled = false;
               }
           },false);
     	   
            ById('pbshipGold').addEventListener('click', function(){
               if (ById('pbshipGold').checked==false) {
                   ById('pbtargetamountGold').disabled = true;
               }
               else {
                 ById('pbtargetamountGold').disabled = false;
               }
           },false);
    
         },
         updateResources : function (){
         	var t = my.TranspAuto
         	var ToCity = null;
         	for (var i=1;i<5;i++)
     			  ById('TransRec'+i).innerHTML = addCommas (Cities.cities[t.tcp.city.idx].c.resources[i].count);
         	ById('TransGold').innerHTML = addCommas(Cities.cities[t.tcp.city.idx].c.silver());
         	
         	 for (var ii=0; ii< Cities.numCities;ii++) {
                   if (Cities.cities[ii].c.x == document.getElementById ('ptcityX').value && Cities.cities[ii].c.y == document.getElementById ('ptcityY').value)
                    ToCity = Cities.cities[ii].id;
                 }
           for (var i=1;i<5;i++)
               if (ToCity != null)
                       ById('HaveRec'+i).innerHTML = addCommas (Cities.cities[t.tcp.city.idx].c.resources[i].count);
         	  else ById('HaveRec'+i).innerHTML = "----";
           if (ToCity != null) ById('HaveGold').innerHTML = addCommas(Cities.cities[t.tcp.city.idx].c.silver());
           else  ById('HaveGold').innerHTML =  "----";   
         },
         
         updateTroops : function (city){
         	var t = my.TranspAuto;
         	var fontcolor = 'black';
         	
     		//t.Astone = parseInt(ById('pbtradeamountAstone').value*5);
         	//var unit = ById('TransportTroop').value;
         	t.Troops = 0; //parseInt(Seed.units['city' + t.tcp.city.id][unit]);
        	//var untid=ById('TransportTroop').value;
  	
  	
          var LoadUnit=0; //parseInt(parseInt(uW.unitstats[untid][5])*(1+loadBoost));
         	var GlobalMaxLoad = 1;//t.Troops * LoadUnit;
         	t.MaxLoad = 0; //parseInt(ById('TroopsToSend').value) * LoadUnit;
          	t.TroopsNeeded = 1;//(t.Food + t.Wood + t.Stone + t.Ore + t.Gold + t.Astone) / LoadUnit;
          	t.TroopsNeeded = t.TroopsNeeded.toFixed(0);	
     		//if (t.TroopsNeeded < ((t.Food + t.Wood + t.Stone + t.Ore + t.Gold + t.Astone) / LoadUnit)) t.TroopsNeeded++;	
             
             if ( t.TroopsNeeded > t.Troops) fontcolor = 'red';
         	if (t.Troops > 0 ) ById('TroopAmount').innerHTML = '<FONT color='+fontcolor+'>' + addCommas(t.Troops) + '</font>';
         	else ById('TroopAmount').innerHTML = 0;
         	if (GlobalMaxLoad > 0) ById('CarryAmount').innerHTML = addCommas(GlobalMaxLoad);
         	else  ById('CarryAmount').innerHTML = 0;
         	ById('Calc').innerHTML = uW.arStrings.Common.Resources+': ' +  addCommas(t.Food + t.Wood + t.Stone + t.Ore + t.Gold  + t.Astone) + ' / ' + addCommas(t.MaxLoad) + '&nbsp;&nbsp;('+uW.arStrings.Common.Troops+' '+translate('necesarias')+' : <FONT color='+fontcolor+'>' + addCommas(t.TroopsNeeded) + '</font> )' ;
         },    
         getRallypoint: function(cityId){
           var t = my.TranspAuto;
           for (var o in Seed.buildings[cityId]){
     		var buildingType = parseInt(Seed.buildings[cityId][o][0]);
     		var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
     		if (buildingType == 12){
     			return parseInt(buildingLevel);
     			break;
     		}
     	   }
     	  return 0;
         },
        e_tradeRoutes: function(){
           var t = my.TranspAuto;
           var now = new Date();
           clearTimeout(t.timer);
           if (t.traderState.running == true)    {
           	var now = new Date().getTime()/1000.0;
           	now = now.toFixed(0);
           	var last = Options.lasttransport;
            		if ( now > (parseInt(last) + (Options.transportinterval*60))){
     				  t.checkdoTrades();
           		}
           }
     	  t.timer = setTimeout(function(){ t.e_tradeRoutes();}, Options.transportinterval*1000);
     	
         },
         	
     	delTradeRoutes: function() {
     		var t = my.TranspAuto;	
     		t.tradeRoutes= [];
     	},
     	
     	checkcoords : function (obj){
     		var t = my.TranspAuto;
     		if(obj.id == 'pbok'){
     			t.check = true;
     			t.addTradeRoute();
     		}
     		return;			
     	},
     	
     	addTradeRoute: function () {
     		var valid = true;
     		var t = my.TranspAuto;
     		var city = t.tcp.city.id;
     		if (ById('ptcityX').value==0 && ById('ptcityY').value ==0 && !t.check)
     		{
     			return;
     		}
     		var ship_Food = ById('pbshipFood').checked;
     		var ship_Wood = ById('pbshipWood').checked;
     		var ship_Stone = ById('pbshipStone').checked;
     		var ship_Ore = ById('pbshipOre').checked;
      		var ship_Gold = ById('pbshipGold').checked;
     		var target_Food = ById('pbtargetamountFood').value;
     		var target_Wood = ById('pbtargetamountWood').value;
     		var target_Stone = ById('pbtargetamountStone').value;
     		var target_Ore = ById('pbtargetamountOre').value;
     		var target_Gold = ById('pbtargetamountGold').value;
     		var target_x = ById('ptcityX').value;
     		var target_y = ById('ptcityY').value;
     		var TroopType = ById('TransportTroop').value;
     		var route_state = true;
     				
     		if (valid == true) {
     			var lTR = t.tradeRoutes;
     			lTR.push({
     				city:				city,
     				ship_Food:			ship_Food,
     				target_Food:		target_Food,
     				ship_Wood:			ship_Wood,
     				target_Wood:		target_Wood,
     				ship_Stone:			ship_Stone,
     				target_Stone:		target_Stone,
     				ship_Ore:			ship_Ore,
     				target_Ore:			target_Ore,
     				ship_Gold:			ship_Gold,
     				target_Gold:		target_Gold,
     				target_x: 			target_x,
     				target_y: 			target_y,
     				TroopType:      TroopType,
     				route_state: 		"true"
     			});
     		}
     		ById('pbTraderDivDRoute').style.background ='#99FF99';
     		setTimeout(function(){ (ById('pbTraderDivDRoute').style.background =''); }, 500);
     	},
     	showTradeRoutes: function () {
     		var t = my.TranspAuto;
     		if (t.popTradeRoutes == null) {
     		 t.popTradeRoutes = new CPopup('pbShowTrade', 0, 0, 750, 500, true, function() {clearTimeout (1000);});
     		 t.popTradeRoutes.centerMe (mainPop.getMainDiv());
     		}
     		var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTab" id="pbRoutesQueue">';       
     		t.popTradeRoutes.getMainDiv().innerHTML = '</table></div>' + m;
     		t.popTradeRoutes.getTopDiv().innerHTML = '<TD><B>'+translate('Mostrar rutas')+' : </td>';
     		t.paintTradeRoutes();
     		t.popTradeRoutes.show(true)	;
     	},
     	paintTradeRoutes: function(){
     	        var t = my.TranspAuto;
     	        var r = t.tradeRoutes;
     	        var cityname;
     	        var citynameTo = null;
     	        var m= '<TABLE id=paintRoutes class=pbTab>'; 
     		for (var i=0;i<(r.length);i++) {
     			  citynameTo = null;
     				for (var y=0; y< Cities.numCities;y++) {
     					if ( parseInt(Cities.cities[y].id) == r[i].city) var cityname = Cities.cities[y].c.name;
     					if ( parseInt(Cities.cities[y].c.x) == r[i].target_x && parseInt(Cities.cities[y].c.y) == r[i].target_y) var citynameTo = Cities.cities[y].c.name;
     				}    
     				var queueId = i;
     				if (citynameTo == null) var TO = r[i].target_x +','+ r[i].target_y;
     				else TO = citynameTo;
     				if (r[i].route_state) var status = '<FONT color=green>'+translate('Activo')+'</font>';
     				else var status = '<FONT color=red>'+translate('Desactivo')+'</font>';
     				if (r[i].TroopType == undefined) var unit = 'unt9';
             else var unit = r[i].TroopType;
     				m += '<TR><TD TD width=12px>&nbsp;&nbsp;</td></tr>';
             m +='<TR><TD width=20px>'+(i+1)+'</td><TD width=175px>'+uW.arStrings.Common.From+':&nbsp;&nbsp;'+ cityname +'</TD><TD width=175px>'+uW.arStrings.Common.To+' :&nbsp;&nbsp;'+ TO +'</td><TD width=175px>'+status+'</td>';
             m +='<TD width=60px><A onclick="traceEdit('+queueId+')">'+translate('Editar')+'</a></td><TD width=60px><A onclick="traceDelete('+queueId+')">'+uW.arStrings.MessagesModal.Delete_button+'</a></td></tr>';
             m += '<TR><TD></td><TD>'+uW.arStrings.Common.Troops+':&nbsp;&nbsp;</td></tr>';
             if (r[i].ship_Food) m += '<TR><TD></td><TD align=center><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png"></td><TD>'+uW.arStrings.Common.Target+': '+ addCommas(r[i].target_Food) +'</td>';
     				if (r[i].ship_Wood) m += '<TR><TD></td><TD align=center><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png"></td><TD>'+uW.arStrings.Common.Target+': '+ addCommas(r[i].target_Wood) +'</td>';
     				if (r[i].ship_Stone) m += '<TR><TD></td><TD align=center><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png"></td><TD>'+uW.arStrings.Common.Target+': '+ addCommas(r[i].target_Stone) +'</td>';
     				if (r[i].ship_Ore) m += '<TR><TD></td><TD align=center><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png"></td><TD>'+uW.arStrings.Common.Target+': '+ addCommas(r[i].target_Ore) +'</td>';
     				if (r[i].ship_Gold) m += '<TR><TD></td><TD align=center><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png"></td><TD>'+uW.arStrings.Common.Target+': '+ addCommas(r[i].target_Gold) +'</td>';
            }
     	     m +='</table>';
     	     ById('pbRoutesQueue').innerHTML= m; 
            unsafeWindow.traceEdit = t.editQueueElement;
            unsafeWindow.traceDelete = t.cancelQueueElement;
     	    },
     	  
     	 cancelQueueElement: function(queueId){
     	     var t = my.TranspAuto;
     	     var queueId = parseInt(queueId);
     	     t.tradeRoutes.splice(queueId, 1);
     	     t.showTradeRoutes();
     	 },
     	 
     	 editQueueElement: function(queueId){
     	     var t = my.TranspAuto;
     	     var r = t.tradeRoutes;
            var queueId = parseInt(queueId);
     	     var cityname;
     	     var citynameTo = null;
     	     var Types = ['food','wood','stone','iron','gold'];
     	     for (var y=0; y< Cities.numCities;y++) {
     					if ( parseInt(Cities.cities[y].id) == r[queueId].city) var cityname = Cities.cities[y].c.name;
     					if ( parseInt(Cities.cities[y].c.x) == r[queueId].target_x && parseInt(Cities.cities[y].c.y) == r[queueId].target_y) var citynameTo = Cities.cities[y].c.name;
     			 }
            if (citynameTo == null) var TO = r[queueId].target_x +','+ r[queueId].target_y;
     			 else TO = citynameTo; 
            var n = '<TABLE id=editRoutes class=pbTab>';
     	     n +='<TD>'+uW.arStrings.Common.From+' :&nbsp;'+ cityname +'</td><TD>'+uW.arStrings.Common.To+' :&nbsp;'+ TO +'</td>';
     	     n +='<TD><INPUT id=TradeStatus type=checkbox>&nbsp;'+translate('Activo')+' '+translate('Ruta')+'</td>';
     	     n += '<TD width=150px>'+uW.arStrings.Common.Troops+' :<SELECT id="pbbTransportTroop">';
             unsafeWindow.Barracks.allUnitIds.each(function(r){
	    	             if (unsafeWindow.arStrings.unitName["u"+r]) 
	    	         	 n+= "<option  value='u"+r+"'>"+unsafeWindow.arStrings.unitName["u"+r]+"</option>";        
           });
            n+='</select></td></table><BR><TABLE  id=editRoutes class=pbTab>';
            for (var i=0;i<Types.length;i++){
     	      var icon = Types[i];
              n += '<TR><TD width=50px align=center>'+ unsafeWindow.arStrings.ResourceName[i] +'</td>';
              n += '<TD width=50px align=center><INPUT id=pbbship'+Types[i]+' type=checkbox></td>';
              n += '<TD width=125px>'+translate('Mantener')+' : <INPUT id=pbbtargetamount'+Types[i]+' type=text size=11 maxlength=12 value="0"></td>';
            }
            n+='</table><BR><TABLE id=editRoutes class=pbTab><TR><TD><a class="button20" id="Cancel"><span>'+uW.arStrings.MessagesModal.Delete_button+'</span></a></td>';
            n+='<TD><a class="button20" id="Save"><span>'+uW.arStrings.Common.Save_Button+'</span></a></td></tr>';
            n +='</table>';
            
            ById('pbRoutesQueue').innerHTML= n;
            ById('TradeStatus').checked = r[queueId].route_state;
            if (r[queueId].TroopType == undefined) var unit = 'u9';
            else var unit = r[queueId].TroopType;
            ById('pbbTransportTroop').value = unit;
            
  	         ById('pbbshipfood').checked = r[queueId].ship_Food;
  	         ById('pbbshipwood').checked = r[queueId].ship_Wood;
  	         ById('pbbshipstone').checked = r[queueId].ship_Stone;
  	         ById('pbbshipiron').checked = r[queueId].ship_Ore;
  	         ById('pbbshipgold').checked = r[queueId].ship_Gold;
  	         ById('pbbtargetamountfood').value = r[queueId].target_Food;
  	         ById('pbbtargetamountwood').value = r[queueId].target_Wood;
  	         ById('pbbtargetamountstone').value = r[queueId].target_Stone;
  	         ById('pbbtargetamountiron').value = r[queueId].target_Ore;
  	         ById('Cancel').addEventListener('click', function(){t.showTradeRoutes();}, false);
  	         ById('Save').addEventListener('click', function(){
  	              r[queueId].route_state = ById('TradeStatus').checked;
  	              r[queueId].TroopType = ById('pbbTransportTroop').value;
  	              r[queueId].ship_Food = ById('pbbshipfood').checked;
  	              r[queueId].ship_Wood = ById('pbbshipwood').checked;
  	              r[queueId].ship_Stone = ById('pbbshipstone').checked;
  	              r[queueId].ship_Ore = ById('pbbshipiron').checked;
  	              r[queueId].ship_Gold = ById('pbbshipgold').checked;
  	              r[queueId].target_Food = ById('pbbtargetamountfood').value;
  	              r[queueId].target_Wood = ById('pbbtargetamountwood').value;
  	              r[queueId].target_Stone = ById('pbbtargetamountstone').value;
  	              r[queueId].target_Ore = ById('pbbtargetamountiron').value;
  	              r[queueId].target_Gold = ById('pbbtargetamountgold').value;
  	              t.showTradeRoutes();
  	          }, false);
  	 },
     	   
     	saveTradeRoutes: function(){
     		var t = my.TranspAuto;
             var serverID = getServerId();
             GM_setValue('tradeRoutes_' + serverID, JSON2.stringify(t.tradeRoutes));
         },
       readTradeRoutes: function(){
             var t = my.TranspAuto;
             var serverID = getServerId();
             s = GM_getValue('tradeRoutes_' + serverID);
             if (s != null) {
                 route = JSON2.parse(s);
                 for (k in route)
                     t.tradeRoutes[k] = route[k];
             }
         },
     	saveTraderState: function(){
     	     var t = my.TranspAuto;
  
             var serverID = getServerId();
             GM_setValue('traderState_' + serverID, JSON2.stringify(t.traderState));
         },
         readTraderState: function(){
             var t = my.TranspAuto;
             var serverID = getServerId();
             s = GM_getValue('traderState_' + serverID);
             if (s != null) {
                 state = JSON2.parse(s);
                 for (k in state)
                     t.traderState[k] = state[k];
             }
         },
         toggleTraderState: function(obj){
     	   var t = my.TranspAuto;
     	   obj = ById('pbTraderState');
             if (t.traderState.running == true) {
                 t.traderState.running = false;
                 if (obj)  obj.value = uW.arStrings.Common.Transport+" = OFF";
     	       clearTimeout(t.checkdotradetimeout);
     	       t.count = 0;
     	       Options.lasttransport = 0;
  	       saveOptions();
  	       
             }
             else {
                 t.traderState.running = true;
                 if (obj) obj.value = uW.arStrings.Common.Transport+" = ON";
     			t.e_tradeRoutes();
             }
             t.saveTraderState();
             DashInnert();
         },
     	count:0,
     	checkdoTrades: function(){
     	var t = my.TranspAuto;
     	if(t.tradeRoutes.length==0) return;
     	t.doTrades(t.count);
     	t.count++;
     	if(t.count < t.tradeRoutes.length){
     			  t.checkdotradetimeout = setTimeout(function() { t.checkdoTrades();}, 10000);
     			} else {
     			  var now = new Date().getTime()/1000.0;
     			  now = now.toFixed(0);
     			  Options.lasttransport = now;
     			  saveOptions();	
     			  t.count = 0;
     			}
     	},
         
       doTrades: function(count){
         var t = my.TranspAuto;
     
        	if(t.tradeRoutes.length==0) return;
        	if(!t.tradeRoutes[count]["route_state"]) return;
        	
        	var city = t.tradeRoutes[count]["city"];
        	if(!Cities.byID[city]) return;
  	   		
  	var xcoord = t.tradeRoutes[count]["target_x"];
        var ycoord = t.tradeRoutes[count]["target_y"];
     	var cityID = 'city' + city;
     	var cityNumber=Cities.byID[city].idx;
     	for (var zz=0; zz< Cities.numCities;zz++) {
  	   if (parseInt(Cities.cities[zz].id) == city) 
  	      var cityname = Cities.cities[zz].c.name;
  	}                     
     		
     		var carry_amount= 0;
     		var wagons_needed=0;
     		var citymax = 0;

         	var target_Food = t.tradeRoutes[count]["target_Food"];
         	var target_Wood = t.tradeRoutes[count]["target_Wood"];
         	var target_Stone = t.tradeRoutes[count]["target_Stone"];
         	var target_Ore = t.tradeRoutes[count]["target_Ore"];
            	var target_Gold = t.tradeRoutes[count]["target_Gold"];
         	var ship_Food = t.tradeRoutes[count]["ship_Food"];
         	var ship_Wood = t.tradeRoutes[count]["ship_Wood"];
         	var ship_Stone = t.tradeRoutes[count]["ship_Stone"];
         	var ship_Ore = t.tradeRoutes[count]["ship_Ore"];
           	var ship_Gold = t.tradeRoutes[count]["ship_Gold"];
         	var citymax_Food = parseIntNan(Cities.cities[cityNumber].c.resources[1].count);
         	var citymax_Wood = parseIntNan(Cities.cities[cityNumber].c.resources[2].count);
         	var citymax_Stone = parseIntNan(Cities.cities[cityNumber].c.resources[3].count);
         	var citymax_Ore = parseIntNan(Cities.cities[cityNumber].c.resources[4].count);
         	var citymax_Gold = parseIntNan(Cities.cities[cityNumber].c.silver());
         	var carry_Food = parseIntNan(citymax_Food - target_Food);
         	var carry_Wood = parseIntNan(citymax_Wood - target_Wood);
         	var carry_Stone = parseIntNan(citymax_Stone - target_Stone);
         	var carry_Ore = parseIntNan(citymax_Ore - target_Ore);
     	
         	var carry_Gold = 0;
         	if (carry_Food < 0 || ship_Food==false) carry_Food = 0;
         	if (carry_Wood < 0 || ship_Wood==false) carry_Wood = 0;
         	if (carry_Stone < 0 || ship_Stone==false) carry_Stone = 0;
         	if (carry_Ore < 0 || ship_Ore==false) carry_Ore = 0;
     	
          
            var unit = t.tradeRoutes[count]['TroopType'];
            var unitNumber=unit.substring(1,unit.length);
             
           if (t.tradeRoutes[count]['TroopType'] == undefined) var wagons = parseInt(Cities.cities[cityNumber].c.troops[9].count()); 
           else var wagons =  parseInt(Cities.cities[cityNumber].c.troops[unitNumber].count());
 
           var Troops =parseInt(Cities.cities[cityNumber].c.troops[unitNumber].count())
     	  if(parseInt(Troops)>parseInt(wagons)) Troops = wagons;
          
         	var Load = parseInt(unsafeWindow.Unit.stats[unitNumber].load * (1 + (unsafeWindow.player.technologies[10].bonus()))); //parseInt(unsafeWindow.unitstats[unit]['5'])
         
           var maxloadperwagon =  Load;
     		  var maxload = (maxloadperwagon * Troops);
     		  //	logit("Charge par unite : "+Load + " Nb : " + wagons + "maxload: " +maxload);
     		  if(wagons <= 0) {return; }
     		  var shift_Food = parseIntNan(maxload / 9);
     		  var shift_Wood = parseIntNan(maxload / 9);
     		  var shift_Stone = parseIntNan(maxload / 9);
     		  var shift_Ore = parseIntNan(maxload / 9);	
     		  if ((maxload - carry_Food - carry_Wood - carry_Stone - carry_Ore) < 0){
     			 var shift_num=0;
     			 var shift_spare=0;
     			if (carry_Food < shift_Food) {
     				shift_spare += (shift_Food - carry_Food);
     				shift_Food = carry_Food;
     			}
     			if (carry_Wood < shift_Wood) {
     				shift_spare += (shift_Wood - carry_Wood);
     				shift_Wood = carry_Wood;	
     			}
     			if (carry_Stone < shift_Stone) {
     				shift_spare += (shift_Stone - carry_Stone);
     				shift_Stone = carry_Stone;
     			}
     			if (carry_Ore < shift_Ore) {
     				shift_spare += (shift_Ore - carry_Ore);
     				shift_Ore = carry_Ore;
     			}
     
     		  while (shift_spare >1) {
     				 if (carry_Food < (shift_Food + shift_spare)){
     				    shift_spare = shift_spare - carry_Food;;
     				    shift_Food = carry_Food;
     				 }
     				 else{
     				  shift_Food = (shift_Food + shift_spare);
     				  shift_spare = shift_spare- shift_spare;
     				}
     				 if (carry_Wood < (shift_Wood + shift_spare)){
     				    shift_spare = shift_spare - carry_Wood;;
     				    shift_Wood = carry_Wood;
     				 }
     				 else{
     				  shift_Wood = shift_Wood + shift_spare;
     				  shift_spare = shift_spare- shift_spare;
     				}
             		if (carry_Stone < (shift_Stone + shift_spare)){
     				    shift_spare = shift_spare - carry_Stone;
     				    shift_Stone = carry_Stone;
     				 }
     				 else{
     				  shift_Stone = shift_Stone + shift_spare;
     				  shift_spare = shift_spare- shift_spare;
     				}
     				 if (carry_Ore < (shift_Ore + shift_spare)){
     				    shift_spare = shift_spare - carry_Ore;
     				    shift_Ore = carry_Ore;
     				 }
     				 else{
     				  shift_Ore = shift_Ore + shift_spare;
     				  shift_spare = shift_spare- shift_spare;
     				}
     				
     			 }
     
     		carry_Food = shift_Food;
     		carry_Wood = shift_Wood;
     		carry_Stone = shift_Stone;
     		carry_Ore = shift_Ore;
     		
     		}
     		
     		if (maxload > (carry_Food + carry_Wood + carry_Stone + carry_Ore ) && ship_Gold==true) {
     		    if ((maxload-(carry_Food + carry_Wood + carry_Stone + carry_Ore)) > (citymax_Gold - target_Gold)){
     		    	  carry_Gold = (citymax_Gold - target_Gold);
     		    	  if (carry_Gold < 0 ) carry_Gold = 0;
     		   	}
     		    else carry_Gold = (maxload-(carry_Food + carry_Wood + carry_Stone + carry_Ore));
     	
     		}
     		
     		wagons_needed = ((carry_Food + carry_Wood + carry_Stone + carry_Ore  + carry_Gold) / maxloadperwagon);
     		wagons_needed = wagons_needed.toFixed(0);	
     		if (wagons_needed < ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Gold) / maxloadperwagon)) wagons_needed++;	
     		
     		//logit("Besoin unité : " + wagons_needed + "food:"+carry_Food+" wood:"+carry_Wood+" stone:"+carry_Stone+" ore:"+carry_Ore+" gold:"+carry_Gold);
     		
     		
     		if ( wagons_needed < Options.minwagons ) { 
     		 logit("Transport auto : blocage troupe mini ");
     		return;
     		
     		}
             
             if (!Cities.byID[city].c.canMarch()) {
	               logit("Transport auto : impossible d'etablir une marche! ");
	               return;
              }
             
             
              var c={};
	         c.r1 = carry_Food;
	        c.r2 = carry_Wood; 
	        c.r3 = carry_Stone; 
	        c.r4 = carry_Ore; 
   		c.gold = carry_Gold;
   		
 var id=city;
        var d=unsafeWindow.Building.getMaxLevelForType(50,id);
   	  var a=new unsafeWindow.March({marchId:Cities.byID[id].c.emptyMarchSlots()[0],toXCoord:xcoord,toYCoord:ycoord,fromCityId:id,marchType:1,knightId:0,fromHealLevel:d,apothecaryHealPercent:unsafeWindow.KB.Controllers.Apothecary.getHealPercent(d),gold:c.gold,resource1:c.r1,resource2:c.r2,resource3:c.r3,resource4:c.r4});
        var g={mid:a.id,xcoord:a.to.x,ycoord:a.to.y,cid:id,type:1,kid:0,gold:a.gold,r1:a.resources[1],r2:a.resources[2],r3:a.resources[3],r4:a.resources[4],camp:0,et:t.calculateTime(id,unitNumber,xcoord,ycoord)};
      	a.units[unitNumber].sent=parseIntNan(wagons_needed);
        g["u"+unitNumber]=parseIntNan(wagons_needed);
   	
        if ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Gold) > 0) {
      unsafeWindow.AjaxCall.gPostRequest("march.php",g,function(zz){	
                              	   	var now = unixTime();
                   	   			var i="transport",j=Number(zz.eta)-Number(zz.initTS);
                   	   			unsafeWindow.Chrome.ResourcesBar.update();
                   	   			unsafeWindow.Object.keys(a.units).each(function(k){Cities.byID[id].c.troops[k].subtract(a.units[k].sent)});
                    	   			a.id=Number(zz.marchId);
                   	   			a.to.tileId=Number(zz.tileId);
                   	  			a.to.tileType=Number(zz.tileType);
                   	   			a.to.tileLevel=Number(zz.tileLevel);
                   	   			a.to.playerId=Number(zz.tileUserId);
                   	   			a.to.cityId=Number(zz.tileCityId);
                   	   			a.setStatus(unsafeWindow.Constant.MarchStatus.OUTBOUND);
                   	   			a.setMarchTime(unsafeWindow.unixtime(),unsafeWindow.unixtime()+j,0);
                   	   			Cities.byID[id].c.marches.outgoing[a.id]=a;
                   	   			unsafeWindow.KTrack.event(["_trackEvent","March",i,unsafeWindow.player.level]);
                    
                       	 	},
                        		function(zz){
             
           		}, false);
           		
      
             }
     	},
     calculateTime: function(id,b,g,e) {
    var c=65535,a=Math.abs(Cities.byID[id].c.x-g),f=Math.abs(Cities.byID[id].c.y-e),d=Math.sqrt((a*a)+(f*f));
    h=unsafeWindow.Unit.stats[b].speed*1;
    if(h<c){c=h;}
    return Math.ceil(d*6000/c)+30;
  },  	
  onUnload: function(){
     var t = my.TranspAuto;
     t.saveTradeRoutes();
     t.saveTraderState();
     //if (!ResetAll) t.saveReapproState();
     //alert("Banzai");
  },
  showManuel : function() {
    var t = my.TranspAuto;  
    if (t.state == null) {  
      m = "<DIV class=ptstat>"+translate('TRANSPORTE DE RECURSOS ENTRE CIUDADES')+"</div>";
      m +="<div id='statpourTr'></div>";
      m += "<TABLE width=100% class=ptTab border=0 cellpadding=3>\
       <tr align=center><td colspan=2><HR></td></tr>\
       <tr align=center valign=top><td colspan=1 width=50%><b><u>"+uW.arStrings.Common.From+"</b></u><br><span id=srcptspeedcity></span></td>\
       <td colspan=1 width=50%  rowspan=2><b><u>"+uW.arStrings.Common.To+"</b></u><br><span id=desptspeedcity></span><br>\
       "+uW.arStrings.ChangeDomain.OR+" <br>X: <input type=text size=4 id=typetrpx value=0>&nbsp;Y: <input type=text size=4 id=typetrpy value=0><br><br><INPUT id='ptttButTransport' type=submit value='"+uW.arStrings.Common.Transport+"' style='font-weight:bold'>\
       </td></tr>\
       <tr align=center><td colspan=1>"+uW.arStrings.Common.Troops+" : <select id=typetrp><option value='1'>"+unsafeWindow.arStrings.unitName["u1"]+"</option><option value='2'>"+unsafeWindow.arStrings.unitName["u2"]+"</option><option value='4'>"+unsafeWindow.arStrings.unitName["u4"]+"</option><option value='5'>"+unsafeWindow.arStrings.unitName["u5"]+"</option><option value='6'>"+unsafeWindow.arStrings.unitName["u6"]+"</option><option value='7'>"+unsafeWindow.arStrings.unitName["u7"]+"</option><option value='8'>"+unsafeWindow.arStrings.unitName["u8"]+"</option><option selected value='9'>"+unsafeWindow.arStrings.unitName["u9"]+"</option><option value='10'>"+unsafeWindow.arStrings.unitName["u10"]+"</option><option value='11'>"+unsafeWindow.arStrings.unitName["u11"]+"</option><option value='12'>"+unsafeWindow.arStrings.unitName["u12"]+"</option></select>\
       <br>"+uW.arStrings.Common.Quantity+" : <input type=text size=6 value='0' id='Choixnbwagon'><input type=button id='trswagmax' value='Max'\><br><i>("+translate('Por favor, ponga en la cantidad de tropas que desee utilizar')+")</i>\
       <br><b>"+uW.arStrings.Common.Resources+" "+uW.arStrings.Common.Type+" :</b><br><input type=radio id='ChoixRess0' name='ChoixRess' value='gold'> " + unsafeWindow.arStrings.ResourceName[0] + "\
       <input type=radio id='ChoixRess1' name='ChoixRess' value='rec1'> " + unsafeWindow.arStrings.ResourceName[1] + "\
       <input type=radio id='ChoixRess2' name='ChoixRess' value='rec2'> " + unsafeWindow.arStrings.ResourceName[2] + "\
       <input type=radio id='ChoixRess3' name='ChoixRess' value='rec3'> " + unsafeWindow.arStrings.ResourceName[3] + "\
       <input type=radio id='ChoixRess4' name='ChoixRess' value='rec4'> " + unsafeWindow.arStrings.ResourceName[4] + "\
       </td></tr>\
       <tr><td colspan=2>"+ unsafeWindow.arStrings.March.ResourcesToSend +" : <span id=BOEstimationR></td></tr>\
       </table>\
       <TABLE align=center width=100% class=ptTab><TR><TD><div id=ptTranportStatus style='text-align:center;overflow-y:auto; max-height:78px; height: 78px;'></div></td></tr></table>";
    t.TransportDiv.innerHTML = m; 
    t.destinationCityx = document.getElementById ('typetrpx');
    t.destinationCityy = document.getElementById ('typetrpy');
    
    t.destinationCityx.addEventListener ('change', t.estimerRes, false);
    t.destinationCityy.addEventListener ('change', t.estimerRes, false);
    document.getElementById ('ChoixRess0').addEventListener ('click', t.estimerRes, false);
    document.getElementById ('ChoixRess1').addEventListener ('click', t.estimerRes, false);
    document.getElementById ('ChoixRess2').addEventListener ('click', t.estimerRes, false);
    document.getElementById ('ChoixRess3').addEventListener ('click', t.estimerRes, false);
    document.getElementById ('ChoixRess4').addEventListener ('click', t.estimerRes, false);
    
    t.estimationRes = document.getElementById ('BOEstimationR');
    var dcp1 = new CdispCityPicker ('ptspeed1', document.getElementById('desptspeedcity'), false, t.clickCityDestinationSelect, 1);
    t.TTbutTransport = document.getElementById ('ptttButTransport');
    t.TTbutTransport.addEventListener ('click', t.clickTransportDo, false);
    t.divTranportStatus = document.getElementById ('ptTranportStatus');
    t.statpourTr = document.getElementById ('statpourTr');
    t.typetrp = document.getElementById ('typetrp');
    t.typetrp.addEventListener ('click', t.estimerRes, false); 
    t.trswagmax = document.getElementById ('trswagmax');
    t.trswagmax.addEventListener ('click', t.clickUniteMax, false);
    t.Choixnbwagon  = document.getElementById ('Choixnbwagon');
    t.Choixnbwagon.addEventListener ('keyup', t.verifierWagons, false);
    var dcp0 = new CdispCityPicker ('ptspeed0', document.getElementById('srcptspeedcity'), false, t.clickCitySourceSelect, Cities.byID[unsafeWindow.currentcityid].idx);
    t.state = 1;
   }

   str = "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>"+uW.arStrings.Common.Total.toUpperCase()+"</b></td>";
   for(i=0; i<Cities.numCities; i++) {
     Gate = Cities.cities[i].c.defending;
              if(Gate == 0) var couleurr="#77EE77";
              if(Gate != 0) var couleurr="#EE7777";
                str += "<TD width=81 style='background-color:"+couleurr+"' align=center><B>"+ Cities.cities[i].c.name +'</b><BR><a onclick="KB.Controllers.MapHelper.gotoCoord('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+');">('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+')</td>';
                
   }
   str +="</tr>";
   str += "<tr><td><br></td></tr>";
   var m="";
          var goldTotal=0;
          for(i=0; i<Cities.numCities; i++) {
                      m += "<TD width=81 style='background:#e8e8e8' align=right>"+ addCommas(Cities.cities[i].c.silver()) +'</td>';
                      goldTotal+=parseInt(Cities.cities[i].c.silver());
           }
          str += "<tr align=right><td style='background:#e8e8e8' align=right><b>" + unsafeWindow.arStrings.ResourceName[0] + "</td><td style='background:#e8e8e8' align=right>"+addCommas(goldTotal)+" "+ m + "</tr>" ; 
          
                   
            for (var nbr=1; nbr<=4; nbr++) {
                 if (nbr % 2)
    		        style = '';
    	     else
                        style = " style = 'background: #e8e8e8'";
                var m="";
                var resTotal=0;
                for(var i=0; i<Cities.numCities; i++) {
                            m += "<TD width=81 "+style+" align=right>"+ addCommas(Cities.cities[i].c.resources[nbr].count) +'</td>';
                            resTotal+=parseInt(Cities.cities[i].c.resources[nbr].count);
                 }
                str += "<tr><td "+style+" align=right><b>"+unsafeWindow.arStrings.ResourceName[nbr]+"</td><td "+style+" align=right>"+addCommas(resTotal)+" "+ m+"</tr>"; 
          
      
            
              }
             str += "<tr><td><br></td></tr>";
            // Production de nourriture + ENTRETIEN !
            var m="";
    	var prodTotal=0;
    	for(i=0; i<Cities.numCities; i++) {
    	           m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.resources[1].hourlyTotalRate())+"/"+unsafeWindow.arStrings.TimeStr.timeHr+"</td>";
    	          prodTotal+=parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate());
    	}
            str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.Common.Production+"</td><td style='background: #e8e8e8' align=right>"+addCommas(prodTotal)+"/"+unsafeWindow.arStrings.TimeStr.timeHr+""+ m+"</tr>"; 
            var m="";
    	var entTotal=0;
     	for(i=0; i<Cities.numCities; i++) {
     	       color='black';
     	      // if ( parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) < Cities.cities[i].c.upkeep() ) color='red';
    	       m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ addCommas(Cities.cities[i].c.upkeep())+"/"+unsafeWindow.arStrings.TimeStr.timeHr+"</td>";
    	       entTotal+=parseInt(Cities.cities[i].c.upkeep());
    	}
            str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.Common.UpKeep+"</td><td style='background: #e8e8e8' align=right>"+addCommas(entTotal)+"/"+unsafeWindow.arStrings.TimeStr.timeHr+""+ m+"</tr>"; 
    
            var m="";
    	 	var entTotal=0;
    	  	for(i=0; i<Cities.numCities; i++) {
    	  	       color='black';
    	  	       if ( parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) < parseInt(Cities.cities[i].c.upkeep()) ) {
    	  	        // entretien supérieur à la production
    	  	        difference = parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) - parseInt(Cities.cities[i].c.upkeep());
    	  	        var timeLeft = parseInt(Cities.cities[i].c.resources[1].count)  / (0-difference) * 3600;
    			if (timeLeft > 86313600)
    			       autonomi = '----';
    			else {
    			      if (timeLeft<(Options.foodWarnHours*3600)) {
			     			     autonomi = '<SPAN class=whiteOnRed><b>'+ timestrShort(timeLeft) +'</b></span>';
			     			 } else {
			     			   autonomi = ''+ timestrShort(timeLeft) +'';
			 }
                    	}
    	  	        m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ autonomi +"</td>";
    	  	       } else {
    	  	       
    	  	         m += "<TD align=right width=81 style='background:#e8e8e8;color:black;'>---</td>";
    	  	       }
    	 	          
    
    	 	}
    	 str += "<tr><td style='background: #e8e8e8' align=right><b>Autonomy</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m+"</tr>"; 
         var m="";
	 var unitTotal=0;
	  str += "<tr><td><br></td></tr>";
	 if (unsafeWindow.arStrings.unitName["u1"]) {
	  
	 	
	 
	            style = " style = 'background: #e8e8e8'";
	            
	 	 for(var i=0; i<Cities.numCities; i++) {
	 	                        m += "<TD width=81 "+style+" align=right>"+ addCommas(Cities.cities[i].c.troops[1].count()) +'</td>';
	 	                        unitTotal+=parseInt(Cities.cities[i].c.troops[1].count());
	 	 }
	          str += "<tr><td "+style+" align=right><b>"+unsafeWindow.arStrings.unitName["u1"]+"</td><td "+style+" align=right>"+addCommas(unitTotal)+" "+ m + "</tr>"; 
	         
	 }
	   var m="";
	 var unitTotal=0;
	 if (unsafeWindow.arStrings.unitName["u9"]) {
	  
	 	        style = '';
	
	            
	 	 for(var i=0; i<Cities.numCities; i++) {
	 	                        m += "<TD width=81 "+style+" align=right>"+ addCommas(Cities.cities[i].c.troops[9].count()) +'</td>';
	 	                        unitTotal+=parseInt(Cities.cities[i].c.troops[9].count());
	 	 }
	          str += "<tr><td "+style+" align=right><b>"+unsafeWindow.arStrings.unitName["u9"]+"</td><td "+style+" align=right>"+addCommas(unitTotal)+" "+ m + "</tr>"; 
	         
	 }
	         
        str += "<tr><td><br></td></tr>";
    t.statpourTr.innerHTML = str;
    
  
    t.displayTimer = setTimeout (t.showManuel, 5000);
  },
  

  /******* transport ****/
  verifierWagons: function() {
   var t = my.TranspAuto;
   var maxw=parseInt(Cities.cities[t.sourceCity.idx].c.troops[t.typetrp.value].count());
   var saisw=parseInt(t.Choixnbwagon.value);
   if (saisw > maxw) {
      t.Choixnbwagon.value=maxw;
   }
   var maxtroupe=getTroopMax(t.sourceCity.c.id);
   
   if (t.Choixnbwagon.value > maxtroupe) {
      t.Choixnbwagon.value=maxtroupe;
      //t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>La quantit&eacute; ne peut exc&eacute;der '+maxw+' !.</font>';
   }
   t.estimerRes();
  },
  estimerRes: function() {
   var t = my.TranspAuto;
   
   
   var esti = parseInt(unsafeWindow.Unit.stats[t.typetrp.value].load * t.Choixnbwagon.value * (1 + (unsafeWindow.player.technologies[10].bonus())));
    t.estimationRes.innerHTML = "<font size=3><b>" + addCommas(esti) + "</b></font>";
   //t.estimationRes.innerHTML += "<br>Estimation temps de marche : <b>" + m.friendEtaStr + "</b>" ; 
   
   // test sur les ressources choisit !
   
   var cityID = t.sourceCity.c.id;
   var ic=0;
   var resact=0;
   var ic_ty="gold"; 
   var ic_text="silver";
   resact = Cities.cities[t.sourceCity.idx].c.silver();
   if (document.getElementById("ChoixRess1").checked) { ic_ty="rec1";ic=1;ic_text="food";resact = parseInt(Cities.cities[t.sourceCity.idx].c.resources[1].count); }
   if (document.getElementById("ChoixRess2").checked) { ic_ty="rec2";ic=2;ic_text="wood";resact = parseInt(Cities.cities[t.sourceCity.idx].c.resources[2].count); }
   if (document.getElementById("ChoixRess3").checked) { ic_ty="rec3";ic=3;ic_text="stones";resact = parseInt(Cities.cities[t.sourceCity.idx].c.resources[3].count); }
   if (document.getElementById("ChoixRess4").checked) { ic_ty="rec4";ic=4;ic_text="iron";resact = parseInt(Cities.cities[t.sourceCity.idx].c.resources[4].count); }

  
   if (resact < esti) {
     var nbparunit = parseInt(unsafeWindow.Unit.stats[t.typetrp.value].load * 1 * (1 + (unsafeWindow.player.technologies[10].bonus())));
     var uniteness = Math.round(resact / nbparunit) - 100;
     t.Choixnbwagon.value = uniteness;
     t.TTbutTransport.disabled = false;
     t.estimerRes();

   } else {
    //t.TTbutTransport.disabled = false;
   }
   
  }, 
  
  clickUniteMax: function() {
    var t = my.TranspAuto;
    var maxw=parseInt(Cities.cities[t.sourceCity.idx].c.troops[t.typetrp.value].count());
    var maxtroupe=getTroopMax(t.sourceCity.c.id);
    t.Choixnbwagon.value=maxw;   
    if (maxw > maxtroupe) {
          t.Choixnbwagon.value=maxtroupe;
          //t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>La quantit&eacute; ne peut exc&eacute;der '+maxw+' !.</font>';
    }   
    t.estimerRes();
  },
  clickTransportDo: function() {   // fonction pour faire le transport
   var t = my.TranspAuto;
   var SourceId = t.sourceCity.c.id;
   
   var DestinationId = t.destinationCity.c.id;

   //nHtml.Click(document.getElementById("city_"+SourceId));
   //unsafeWindow.KB.AudioManager.playSound('on_click');
   //unsafeWindow.Chrome.City.switchTo(SourceId);
   if (!document.getElementById("ChoixRess0").checked && !document.getElementById("ChoixRess1").checked && !document.getElementById("ChoixRess2").checked && !document.getElementById("ChoixRess3").checked && !document.getElementById("ChoixRess4").checked) {
       t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>'+translate('Por favor, compruebe el recurso que desea transportar')+' !</font>';
      return;
   }
   if (t.sourceCity.c.x==t.destinationCityx.value && t.sourceCity.c.y==t.destinationCityy.value) {
      t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>'+translate('Imposible enviar a la misma ciudad')+' !</font>';
     return;
   }
   if (parseInt(t.Choixnbwagon.value)=="0") {
   t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>'+translate('Imposible')+' '+uW.arStrings.Common.Transport+' '+translate('con tropas 0')+'... pfff, '+translate('Despierta')+' !</font>';
     return;
   }
   var x=t.destinationCityx.value;
   var y=t.destinationCityy.value;
   if (x == 0 || y == 0) {
      t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>'+translate('Imposible')+' '+uW.arStrings.Common.Transport+' '+uW.arStrings.Common.To+' 0,0 !</font>';
     return;
   }
   t.TTbutTransport.disabled=true;
   
   var c={};
    c.r1 = 0;
   c.r2 = 0; 
   c.r3 = 0; 
   c.r4 = 0; 
   c.gold = 0; 
   var cc=0;
   var esti =  parseInt(unsafeWindow.Unit.stats[t.typetrp.value].load * t.Choixnbwagon.value * (1 + (unsafeWindow.player.technologies[10].bonus())));
   if (document.getElementById("ChoixRess0").checked) { cc=0;c.gold = esti; }
   if (document.getElementById("ChoixRess1").checked) { cc=1;c.r1 = esti; }
   if (document.getElementById("ChoixRess2").checked) { cc=2;c.r2 = esti; }
   if (document.getElementById("ChoixRess3").checked) { cc=3;c.r3 = esti; }
   if (document.getElementById("ChoixRess4").checked) { cc=4;c.r4 = esti; }
  t.divTranportStatus.innerHTML = "<i><b>"+uW.arStrings.Common.Loading+"......</b></i>"; 
  if (Cities.byID[SourceId].c.canMarch()) {
        var f=Cities.byID[SourceId].c;
        var id=f.id;
        var d=unsafeWindow.Building.getMaxLevelForType(50,id);
        var a=new unsafeWindow.March({marchId:Cities.byID[id].c.emptyMarchSlots()[0],toXCoord:x,toYCoord:y,fromCityId:id,marchType:1,knightId:0,fromHealLevel:d,apothecaryHealPercent:unsafeWindow.KB.Controllers.Apothecary.getHealPercent(d),gold:c.gold,resource1:c.r1,resource2:c.r2,resource3:c.r3,resource4:c.r4});
        var g={mid:a.id,xcoord:a.to.x,ycoord:a.to.y,cid:id,type:1,kid:0,gold:a.gold,r1:a.resources[1],r2:a.resources[2],r3:a.resources[3],r4:a.resources[4],camp:0,et:t.calculateTime(id,t.typetrp.value,x,y)};
        a.units[t.typetrp.value].sent=parseIntNan(t.Choixnbwagon.value);
        g["u"+t.typetrp.value]=parseIntNan(t.Choixnbwagon.value);
        unsafeWindow.AjaxCall.gPostRequest("march.php",g,function(zz){	
                        	   	var now = unixTime();
             	   			var i="transport",j=Number(zz.eta)-Number(zz.initTS);
             	   			unsafeWindow.Chrome.ResourcesBar.update();
             	   			unsafeWindow.Object.keys(a.units).each(function(k){Cities.byID[id].c.troops[k].subtract(a.units[k].sent)});
              	   			a.id=Number(zz.marchId);
             	   			a.to.tileId=Number(zz.tileId);
             	  			a.to.tileType=Number(zz.tileType);
             	   			a.to.tileLevel=Number(zz.tileLevel);
             	   			a.to.playerId=Number(zz.tileUserId);
             	   			a.to.cityId=Number(zz.tileCityId);
             	   			a.setStatus(unsafeWindow.Constant.MarchStatus.OUTBOUND);
             	   			a.setMarchTime(unsafeWindow.unixtime(),unsafeWindow.unixtime()+j,0);
             	   			Cities.byID[id].c.marches.outgoing[a.id]=a;
             	   			unsafeWindow.KTrack.event(["_trackEvent","March",i,unsafeWindow.player.level]);
              t.divTranportStatus.innerHTML ="<font color=red size='3px'><b>"+translate('Realizado')+"<b></font>";
       t.TTbutTransport.disabled=false; 
                 	 	},
                  		function(zz){
       t.divTranportStatus.innerHTML ="<font color=red size='3px'><b>Error<b></font>";
       t.TTbutTransport.disabled=false; 
           		}, false);
      }else{
       t.divTranportStatus.innerHTML ="<font color=red size='3px'><b>Error<b></font>";
       t.TTbutTransport.disabled=false; 
     }
         
  },
   calculateTime: function(id,b,g,e) {
    var c=65535,a=Math.abs(Cities.byID[id].c.x-g),f=Math.abs(Cities.byID[id].c.y-e),d=Math.sqrt((a*a)+(f*f));
    h=unsafeWindow.Unit.stats[b].speed*1;
    if(h<c){c=h;}
    return Math.ceil(d*6000/c)+30;
  },
  clickCitySourceSelect : function (city){
    var t = my.TranspAuto;
    t.sourceCity = city;
    t.TTbutTransport.disabled=false;
    t.estimerRes();
   },
   clickCityDestinationSelect : function (city){
    var t = my.TranspAuto;
    t.destinationCity = city;
    t.destinationCityx.value=t.destinationCity.c.x;
    t.destinationCityy.value=t.destinationCity.c.y;
    t.TTbutTransport.disabled=false;
    t.estimerRes();
   }
 
}

/************************ AUTO ATTACK ************************/
 my.attaque = {
  cont:null,
  state : null,
  timerzap:10000, // temps entre deux recherches d'attaque
  timer:null,
  displayTimer:null,
  deleting : false,
  timer:null,
  filtreville:null,
  filtrecible:null,
  numcol:6,
  toutles:0,
  getContent : function (){
      var t = my.attaque;
      return t.cont;
    },
    
    init : function (){
      var t = my.attaque;
      t.cont = document.createElement('div');
      clearTimeout (t.timer);
      t.toutles=0;
      if (Options.AttackAuto)
        t.timer=setInterval(t.start,t.timerzap);
      return this.cont;
    },
       attack: function(h) {
     var t = my.attaque;
     var cible=Options.AttackTime[h];
     var SourceId = cible.cityId;
     var x = cible.coordX;
     var y = cible.coordY;
     var gen=0;
     var cooX = x;
     var cooY = y;
     var id=SourceId;
     var kk=[];
     Cities.byID[id].c.generalsSorted().each(function(b){
       if(b.available() && b.energy()>0){ 
       
       if (Options.AttackGen && b.level()>parseInt(Options.AttackGenNiv)) {
       
       }else{      
       
        kk.push(b);
       }
       
       }
       
       
       }); // id du premier chevalier ! a trouver
    var selectedKnight=kk.length>0?kk[0].id:0;
    if (Options.AttackTime[h].typea==undefined) cible.typea=2;
    if (Cities.byID[id].c.canMarch() && Cities.byID[id].c.generalsCount()!=0 && selectedKnight!=0) {
    
            var d=unsafeWindow.Building.getMaxLevelForType(50,id);
            var a=new unsafeWindow.March({marchId:Cities.byID[id].c.emptyMarchSlots()[0],toXCoord:cooX,toYCoord:cooY,fromCityId:id,marchType:unsafeWindow.Constant.MarchType.ATTACK,knightId:selectedKnight,fromHealLevel:d,apothecaryHealPercent:unsafeWindow.KB.Controllers.Apothecary.getHealPercent(d),gold:0,resource1:0,resource2:0,resource3:0,resource4:0});
            var g={mid:a.id,xcoord:a.to.x,ycoord:a.to.y,cid:id,type:unsafeWindow.Constant.MarchType.ATTACK,kid:a.general.id,gold:a.gold,r1:a.resources[1],r2:a.resources[2],r3:a.resources[3],r4:a.resources[4],camp:0,et:t.calculateTime(id,9,cooX,cooY)};
            var b=Cities.byID[id].c.generals[a.general.id];
            if (cible.typea==1) { // Régions sauvages
             unsafeWindow.Object.keys(a.units).each(function(k){
               if(parseInt(Options.AttackTroops[Options.AttackTime[h].level][k]) > 0) {
	     	  a.units[k].sent=Options.AttackTroops[Options.AttackTime[h].level][k];
                  g["u"+k]=Options.AttackTroops[Options.AttackTime[h].level][k];
                 }
               });
	    } else if (cible.typea==3) { // Barbares
	      unsafeWindow.Object.keys(a.units).each(function(k){
	                    if(parseInt(Options.AttackTroopsB[Options.AttackTime[h].level][k]) > 0) {
	     	     	  a.units[k].sent=Options.AttackTroopsB[Options.AttackTime[h].level][k];
	                       g["u"+k]=Options.AttackTroopsB[Options.AttackTime[h].level][k];
	                      }
               });
	    
            } else {        //ville
                unsafeWindow.Object.keys(a.units).each(function(k){
	     	                    if(parseInt(Options.AttackTroopsC[k]) > 0) {
	     	     	     	  a.units[k].sent=Options.AttackTroopsC[k];
	     	                       g["u"+k]=Options.AttackTroopsC[k];
	     	                      }
               });
            }
            
            // Vérification qu'il y ait bien l'armée sur la ville
            unsafeWindow.Object.keys(a.units).each(function(k){
             if (a.units[k].sent>Cities.byID[id].c.troops[k].count()) {
              Options.AttackTime[h].echec++;
	      		 if (Options.AttackTime[h].echec>1) {
	      		 	                                  var now = unixTime();
	      		 	                                  var tempsaudessu=(t.toutles*60*60)-(10*60);
	      		 	                   	          Options.AttackTime[h].lastattack = now -tempsaudessu;
	      		 	                   	          Options.AttackTime[h].echec=0;
	      		 	                                  saveOptions();
		  }
		  logit("troupes non dispo");
                return;
              }
            });
            if(b.energy()>0){
                 	unsafeWindow.AjaxCall.gPostRequest("march.php",g,function(zz){	
                	   	var now = unixTime();
				Options.AttackTime[h].lastattack = now;
				Options.AttackTime[h].reussi++;
				Options.AttackTime[h].echec=0;
           			saveOptions();
     	   			var i="attack",j=Number(zz.eta)-Number(zz.initTS);
     	   			unsafeWindow.Chrome.ResourcesBar.update();
     	   			unsafeWindow.Object.keys(a.units).each(function(k){Cities.byID[id].c.troops[k].subtract(a.units[k].sent)});
     	   			if(b){b.status=10;b.subtractEnergy()}
     	   			a.id=Number(zz.marchId);
     	   			a.to.tileId=Number(zz.tileId);
     	  			a.to.tileType=Number(zz.tileType);
     	   			a.to.tileLevel=Number(zz.tileLevel);
     	   			a.to.playerId=Number(zz.tileUserId);
     	   			a.to.cityId=Number(zz.tileCityId);
     	   			a.setStatus(unsafeWindow.Constant.MarchStatus.OUTBOUND);
     	   			a.setMarchTime(unsafeWindow.unixtime(),unsafeWindow.unixtime()+j,0);
     	   			Cities.byID[id].c.marches.outgoing[a.id]=a;
     	   			unsafeWindow.KTrack.event(["_trackEvent","March",i,unsafeWindow.player.level]);

         	 	},
          		function(zz){
          		 Options.AttackTime[h].echec++;
	                 var now = unixTime();
	                 var tempsaudessu=(t.toutles*60*60)-(10*60);
	                 Options.AttackTime[h].lastattack = now -tempsaudessu;
	                 Options.AttackTime[h].echec=0;
	                 saveOptions();
          		}, false);

	} else {
	 Options.AttackTime[h].echec++;
	 if (Options.AttackTime[h].echec>1) {
	    var now = unixTime();
	    var tempsaudessu=(t.toutles*60*60)-(10*60);
	    Options.AttackTime[h].lastattack = now -tempsaudessu;
	    Options.AttackTime[h].echec=0;
	    saveOptions();
	 }
	}
   } else {
    // impossible sur cette ville..... peux pas marcher !
   		 Options.AttackTime[h].echec++;
   		 if (Options.AttackTime[h].echec>1) {
   		 	                                  var now = unixTime();
   		 	                                  var tempsaudessu=(t.toutles*60*60)-(10*60);
   		 	                   	          Options.AttackTime[h].lastattack = now -tempsaudessu;
   		 	                   	          Options.AttackTime[h].echec=0;
   		 	                                  saveOptions();
		  }
		  
   }



    },
      calculateTime: function(id,b,g,e) {
      var c=65535,a=Math.abs(Cities.byID[id].c.x-g),f=Math.abs(Cities.byID[id].c.y-e),d=Math.sqrt((a*a)+(f*f));
      h=unsafeWindow.Unit.stats[b].speed*1;
      if(h<c){c=h;}
      return Math.ceil(d*6000/c)+30;
    },
    passage:0,
    start : function() {
     var t = my.attaque;
     if (!Options.AttackAuto) {
      clearTimeout (t.timer);
      return;
     }
     
     var c=Options.AttackTime;
     // on trie le tableau par duree
     
     for (h in c) {
      var z=c[h];
      var now = unixTime();
      var lastatt=z.lastattack;
      var affichederniere=(now - lastatt);
      t.toutles=Options.AttackTimer;
      if (z.typea==2)
        t.toutles=Options.AttackTimer2;
      if (z.typea==3)
        t.toutles=Options.AttackTimer3;
      
      var tempsaudessu=t.toutles*60*60;  // on converti l'heure en secondes  
      
      if (parseInt(affichederniere)>parseInt(tempsaudessu) && ((Options.AttackCible1 && z.typea==1) || (Options.AttackCible2 && z.typea==2) || (Options.AttackCible3 && z.typea==3))) {
       if (Cities.byID[z.cityId].c.canMarch()) {
        t.attack(h);
        return;
       }
      }
      
     }
    
    },
    saveTroops:function() {
      var t = my.attaque;
      for(i=0;i<10;i++){
      	 	unsafeWindow.Barracks.allUnitIds.each(function(j){
      	 		Options.AttackTroops[i+1][j] = parseIntNan(ById('level'+i+'troop'+j).value);
      	 		Options.AttackTroopsB[i+1][j] = parseIntNan(ById('level'+i+'troopB'+j).value);
      	 	});		
      }
      unsafeWindow.Barracks.allUnitIds.each(function(j){
             	 		Options.AttackTroopsC[j] = parseIntNan(ById('troop'+j).value);
      });
      
	Options.AttackTimer = parseInt(document.getElementById("BOTimerAttack").value);
	Options.AttackTimer2 = parseInt(document.getElementById("BOTimerAttack2").value);
	Options.AttackTimer3 = parseInt(document.getElementById("BOTimerAttack3").value);
	saveOptions(); 
    },
    troopselect:null,
    troopOptions: function(){
      	 var t = my.attaque;
      	 if(t.troopselect == null)	
    		t.troopselect = new CPopup ('pbtroopselect', 0, 0, 850, 410, true, function(){t.saveTroops();});
      	 t.troopselect.centerMe (mainPop.getMainDiv());  
      	 t.troopselect.getTopDiv().innerHTML = '<DIV id=pbTraderDivD class=ptstat><b>'+uW.arStrings.Common.Troops+'</b></div>';
      	 var z='<DIV id=attaqueContent style="height:380px; max-height:380px; overflow-y:auto">';
      	 z+='<DIV id=pbTraderDivD class=ptstat>'+unsafeWindow.arStrings.Common.Cities.toUpperCase()+'</div><TABLE width=100%>';
      	 z+='<tr><td colspan=3>'+translate('Tiempo entre los ataques')+':</td><td  colspan=14><input type=text size=2 id=BOTimerAttack maxlenght=2 value='+Options.AttackTimer+'> '+uW.arStrings.TimeStr.timeHr+'</tr><TR><TR><TD></td>';
	 unsafeWindow.Barracks.allUnitIds.each(function(i){
	     		z+='<TD>'+unsafeWindow.arStrings.unitName["u"+i].substr(0,10)+'</td>';
         });
	 if (Options.AttackTroopsC==undefined) Options.AttackTroopsC = {};
	 z += '</tr><tr><TD>'+unsafeWindow.arStrings.Common.City+'</td>';
	 unsafeWindow.Barracks.allUnitIds.each(function(j){
	  if (Options.AttackTroopsC[j]==undefined) Options.AttackTroopsC[j] = 0;
	  z += '<TD><INPUT id="troop'+j+'" type=text size=5 maxlength=6 value="'+Options.AttackTroopsC[j]+'" /></td>';
	 });
	 z+='</tr>';		 		
    	 z+='</table>';
      	 z+='<DIV id=pbTraderDivD class=ptstat>'+unsafeWindow.arStrings.Common.Wilds.toUpperCase()+'</div><TABLE width=100%>';
    	 z+='<tr><td colspan=3>'+translate('Tiempo entre los ataques')+':</td><td  colspan=14><input type=text size=2 id=BOTimerAttack2 maxlenght=2 value='+Options.AttackTimer2+'> '+uW.arStrings.TimeStr.timeHr+'</tr><TR><TR><TD></td>';
    	 unsafeWindow.Barracks.allUnitIds.each(function(i){
    		z+='<TD>'+unsafeWindow.arStrings.unitName["u"+i].substr(0,10)+'</td>';
         });
    	 for(i=0;i<10;i++){
    	         if (Options.AttackTroops[i+1]==undefined)
    	 	        	Options.AttackTroops[i+1] = {};
    	 	z += '<TR><TD>'+uW.arStrings.Common.Level+' '+(i+1)+': </td>';
    	 	unsafeWindow.Barracks.allUnitIds.each(function(j){
    	 	        if (Options.AttackTroops[i+1][j]==undefined)
    	 	             Options.AttackTroops[i+1][j] = 0;
    	 		z += '<TD><INPUT id="level'+i+'troop'+j+'" type=text size=5 maxlength=6 value="'+Options.AttackTroops[i+1][j]+'" /></td>';
    	 	});
    	 	z+='</tr>';		 		
    	 }
    	 z+='</table>';
    	 z+='<DIV id=pbTraderDivD class=ptstat>'+unsafeWindow.arStrings.Common.BarbarianCamp.toUpperCase()+'</div><TABLE width=100%>';
	 z+='<tr><td colspan=3>'+translate('Tiempo entre los ataques')+':</td><td  colspan=14><input type=text size=2 id=BOTimerAttack3 maxlenght=2 value='+Options.AttackTimer3+'> '+uW.arStrings.TimeStr.timeHr+'</tr><TR><TR><TD></td>';
	     	 unsafeWindow.Barracks.allUnitIds.each(function(i){
	     		z+='<TD>'+unsafeWindow.arStrings.unitName["u"+i].substr(0,10)+'</td>';
	          });
	     	 for(i=0;i<10;i++){
	     	         if (Options.AttackTroopsB[i+1]==undefined)
	     	 	        	Options.AttackTroopsB[i+1] = {};
	     	 	z += '<TR><TD>'+uW.arStrings.Common.Level+' '+(i+1)+': </td>';
	     	 	unsafeWindow.Barracks.allUnitIds.each(function(j){
	     	 	        if (Options.AttackTroopsB[i+1][j]==undefined)
	     	 	             Options.AttackTroopsB[i+1][j] = 0;
	     	 		z += '<TD><INPUT id="level'+i+'troopB'+j+'" type=text size=5 maxlength=6 value="'+Options.AttackTroopsB[i+1][j]+'" /></td>';
	     	 	});
	     	 	z+='</tr>';		 		
	     	 }
    	 z+='</table></div>';
    	 t.troopselect.getMainDiv().innerHTML = z;
    	 t.troopselect.show(true);
    },
    show : function () {
     var t = my.attaque;
     clearTimeout (t.displayTimer);
     unsafeWindow.BOdeleteAttack=t.deleteAttack;
     if (t.state == null){
             t.cont.innerHTML = '<DIV id=attaqueContent style="height:630px; max-height:630px; overflow-y:auto"></div>';
           t.state = 1;
     }
     if (Options.AttackTime == undefined) Options.AttackTime = {};
     
     var m = '<DIV class=ptstat>'+translate('ATAQUES AUTOMATICOS')+" - <input type=button value='Help' id='boaidetournoi' class=boAide onclick=window.open('"+sitesupport+"/index.php?/topic/56-gor-bottols-versione-18/');></div><TABLE id=pbbarbingfunctions width=100% height=0% class=pbTab><TR align='center'>";
     if (Options.AttackAuto) {
      m+= "<td><input type=button value='Auto"+uW.arStrings.Common.Attack+" = ON' id=BOAttackButton></td>";
     } else {
      m+= "<td><input type=button value='Auto"+uW.arStrings.Common.Attack+" = OFF' id=BOAttackButton></td>";
     }
     m+="<td colspan=2>"+uW.arStrings.Common.Attack+": <input type=checkbox id=BOAttack1 "+ (Options.AttackCible1?' CHECKED':'') +">"+uW.arStrings.Common.Wilds+"<input type=checkbox id=BOAttack3 "+ (Options.AttackCible3?' CHECKED':'') +">"+uW.arStrings.Common.BarbarianCamp+"<input type=checkbox id=BOAttack2 "+ (Options.AttackCible2?' CHECKED':'') +">"+uW.arStrings.Common.City+"</td></tr><tr>";
     
         m+='</table><br><DIV class=ptstat>'+translate('CONFIGURACION')+'</div><TABLE id=pbbarbingfunctions width=100% height=0% class=pbTab><TR align="center">';
     m+= "<tr><td colspan=2><INPUT id=troopselect type=submit value='"+uW.arStrings.Common.Select+' '+uW.arStrings.Common.Troops+"'></td><td>";
     m+= '</td></tr>';
     m+='<tr><td colspan=2><input type=checkbox id=BOGenAttack '+ (Options.AttackGen?'CHECKED ':'')+'> '+translate('No usar general con un nivel superior a')+' <input type=text size=3 value="'+Options.AttackGenNiv+'" id=BOGenNivAttack>';
     m+='</table><br><DIV class=ptstat>'+translate('PARÁMETROS DE LA CIUDAD')+'</div>';
     
     var cc=Options.AttackTime;
     var c=[];
     for (h in cc) {
   	 var z=Options.AttackTime[h];
   	 if (z.cityId==undefined) { 
   	  delete Options.AttackTime[h]; 

   	 }else {
   	   if (z.typea==undefined)
   	    z.typea=2;
   	     	  if (z.echec==undefined)
	     	   z.echec=0;
	     	  if (z.level==undefined) 
	     	   z.level=0;
	     	  if (z.reussi==undefined) 
	     	   Options.AttackTime[h].reussi=0;
   		
	     	  
			  if (Cities.byID[z.cityId] != undefined)
	     	  {
   	  	  	  	var x=Cities.byID[z.cityId].c.x;
	    	  	var y=Cities.byID[z.cityId].c.y;
	    	  	var dist = distance (x, y, z.coordX , z.coordY);
	    	  	var now = unixTime();
	 	      	var lastatt= Options.AttackTime[h].lastattack;
	          	var affichederniere=timestr(now - lastatt); 
	          	var affichedernierenonstr=now - lastatt; 
   	     	 	c.push([z.cityId,z.echec,z.reussi,z.lastattack,z.coordX,z.coordY, dist,affichederniere,h,affichedernierenonstr,z.typea,z.level]);
   	     	 }
   	 }
     }
     c = c.sort(function sort(a,b) {a = parseInt(a[t.numcol]);b = parseInt(b[t.numcol]);return a == b ? 0 : (a < b ? -1 : 1);}); 
     if (c) {
   	m+="<table width=95% cellpadding=3><tr><td>"+uW.arStrings.MessagesModal.Delete_button+"</td><td>"+uW.arStrings.Common.City+" <select id=bofiltrecity><option value=''>...</option>";
   	for(var ii=0; ii<Cities.numCities; ii++) {
   	 m+="<option "+ (t.filtreville==Cities.cities[ii].c.id?' SELECTED':'') +" value="+Cities.cities[ii].c.id+">"+Cities.cities[ii].c.name+"</option>";
   	}
   	m+="</select></td><td><span id=clickCol10>"+uW.arStrings.Common.Target+' '+uW.arStrings.Common.Type+" <select id=bofiltrecible><option value=''>...</option><option value=1 "+ (t.filtrecible==1?' SELECTED':'') +">"+uW.arStrings.Common.Wilds+"</option><option "+ (t.filtrecible==2?' SELECTED':'') +" value=2>"+uW.arStrings.Common.City+"</option><option "+ (t.filtrecible==3?' SELECTED':'') +" value=3>"+uW.arStrings.Common.BarbarianCamp+"</option></select></span></td><td>"+uW.arStrings.Common.Level+"</td><td><span id=clickCol6>"+uW.arStrings.Common.Distance+"</span></td><td>"+uW.arStrings.Common.Coordinates+"</td><td><span id=clickCol9>"+translate('Último ataque')+"</span></td><td><a id=borazcompteur>"+translate('Realizado')+"</a></td></tr>";
   	 for (var i=0; i<c.length; i++){
   	
   	 if ((t.filtreville==null || t.filtreville==c[i][0]) && (t.filtrecible==null || t.filtrecible==c[i][10])) {
  	  if (i % 2 == 0) {
	          		 tabclass = 'xxtab';
	          	} else {
	          		tabclass = 'xxtab_even';
    	} 
  	if (c[i][10]==1) var typecible=uW.arStrings.Common.Wilds;
  	if (c[i][10]==2) var typecible=uW.arStrings.Common.City;
	if (c[i][10]==3) var typecible=uW.arStrings.Common.BarbarianCamp;
	m+='<tr><td class='+ tabclass +' align=left><a href="javascript:void(0);" onclick="BOdeleteAttack(\''+c[i][8]+'\')">X</a></td><td class='+ tabclass +' align=left>'+Cities.byID[c[i][0]].c.name+'</td><td class='+ tabclass +' align=left>'+typecible+'</td><td class='+ tabclass +' align=left>'+c[i][11]+'</td><td class='+ tabclass +' align=left>'+c[i][6]+'</td><td class='+ tabclass +' align=left><a onclick="KB.Controllers.MapHelper.gotoCoord('+c[i][4] +','+ c[i][5] +');">('+c[i][4]+','+ c[i][5] +')</a></td><td class='+ tabclass +' align=left>' + c[i][7] +'</td><td class='+ tabclass +' align=left>'+c[i][2]+'</td></tr>';
	 }
	}
        m+="</table>";
     }else{
     
      m+="No attacks to program, thank you to search for city and launch an attack through the first Attack button.";
     }
     m+="";
     
     
     document.getElementById('attaqueContent').innerHTML = m;
     ById('troopselect').addEventListener('click', t.troopOptions , false);
     document.getElementById("BOAttackButton").addEventListener('click', t.ToggleAutoAttack, false);
     document.getElementById("clickCol9").addEventListener('click', function() {t.numcol=9;t.show();}, false);
     document.getElementById("clickCol6").addEventListener('click', function() {t.numcol=7;t.show();}, false);
     document.getElementById("BOAttack1").addEventListener('click', function() {
      Options.AttackCible1 = document.getElementById("BOAttack1").checked;
      saveOptions();
     }, false);
     document.getElementById("BOAttack2").addEventListener('click', function() {
        Options.AttackCible2 = document.getElementById("BOAttack2").checked;
        saveOptions();  
     }, false);
     document.getElementById("BOAttack3").addEventListener('click', function() {
        Options.AttackCible3 = document.getElementById("BOAttack3").checked;
        saveOptions();  
     }, false);
     document.getElementById("BOGenAttack").addEventListener('click', function() {
      Options.AttackGen=document.getElementById("BOGenAttack").checked;
       saveOptions();
     }, false);
     document.getElementById("BOGenNivAttack").addEventListener('change', function() {
      if (parseInt(document.getElementById("BOGenNivAttack").value)>255) document.getElementById("BOGenNivAttack").value=255;
      Options.AttackGenNiv=parseInt(document.getElementById("BOGenNivAttack").value);
       saveOptions();
     }, false);    
     
     
     document.getElementById("borazcompteur").addEventListener('click', function() {
      for (var i=0; i<c.length; i++){
        Options.AttackTime[c[i][8]].echec = 0; 
      }
      saveOptions();
      t.show();
     
     }, false);
      document.getElementById("bofiltrecible").addEventListener('change', function() {
            
            if (document.getElementById("bofiltrecible").value=="") {
             t.filtrecible=null;
            }else{
             t.filtrecible=document.getElementById("bofiltrecible").value;
            }
            t.show();
            
       }, false);
       document.getElementById("bofiltrecity").addEventListener('change', function() {
       
       if (document.getElementById("bofiltrecity").value=="") {
        t.filtreville=null;
       }else{
        t.filtreville=document.getElementById("bofiltrecity").value;
       }
       t.show();
       
       }, false);
    }, 
    ToggleAutoAttack: function() {
      var t = my.attaque;
      var obj=document.getElementById("BOAttackButton");
       if (Options.AttackAuto== true) {
                    Options.AttackAuto = false;
                    if (obj) obj.value = 'Auto'+uW.arStrings.Common.Attack+" = OFF";
                    if (ById('DAAttque')) ById('DAAttque').value = 'Auto'+uW.arStrings.Common.Attack+" = OFF";
                    clearTimeout (t.timer);
                    saveOptions();
            }  else {
                    Options.AttackAuto = true;
                    if (obj) obj.value = 'Auto'+uW.arStrings.Common.Attack+" = ON";
                    if (ById('DAAttque')) ById('DAAttque').value = 'Auto'+uW.arStrings.Common.Attack+" = ON";
                    clearTimeout (t.timer);
                    t.timer=setInterval(t.start,t.timerzap);
                    saveOptions();
      }
      DashInnert();
    },
    deleteAttack: function(id) {
     var t = my.attaque;
     //var a=confirm("Vuoi toglierlo veramente?")
     //if (a) {
       delete Options.AttackTime[id];
       t.show();
      // }
    },
    hide : function (){
     var t = my.attaque;
     clearTimeout (t.displayTimer);
    }
}

/************************ CREST ************************/
 my.Crest = {
  cont : null,
  rallypointlevel:null,
  error_code: 0,
  knt:{},
  numslots:null,
  init : function (cont){
    var t = my.Crest;
    Options.crestMarchError = 0;
	
    setTimeout(function(){ t.Rounds(1,0,0);}, 5*1000);
    t.cont = document.createElement('div');
    return t.cont;
  },
  
   getContent : function (){
    var t = my.Crest;
    return t.cont;
  },
 	show : function (){
	 var t = my.Crest;
    var selbut=0;
    var m = '<DIV id=pbTowrtDivF class=ptstat>'+translate('AUTO CREST')+'</div><TABLE id=pbcrestfunctions width=100% height=0% class=pbTab><TR align="center">';
     if (Options.crestRunning == false) {
	       m += '<TD><INPUT id=Cresttoggle type=submit value="Crest = OFF"></td>';
	   } else {
	       m += '<TD><INPUT id=Cresttoggle type=submit value="Crest = ON"></td>';
	   }
    m += '<TD colspan=2><INPUT id=CrestHelp type=submit value="'+translate('Ayuda')+'">';
    m += '<INPUT id=showCrestTargets type=submit value="'+translate('Ver destino')+'"><br>'+translate('Intervalo de ataque')+': <INPUT id="pbcrest_interval" type=text size=3 value='+Options.Crestinterval+' /> '+uW.arStrings.TimeStr.timeSec+'</td>';
    m += '<TD>'+translate('No use el general con la energía abajo')+' <INPUT id=pbgenenergy value='+ Options.CrestEnergy +' type=text size=3 \></td>';
	m += '</tr></table>';
    m += '<DIV id=pbOpt class=ptstat>'+translate('OPCIONES')+'</div><TABLE id=pbcrestopt	 width=100% height=0% class=pbTab><TR align="center"></table>';
    m += '<DIV style="margin-bottom:10px;">'+uW.arStrings.Common.From+': <span id=crestcity></span></div>';
    m += '<TABLE class=ptTab><TR><TD>'+uW.arStrings.Common.To+': &nbsp;&nbsp;X:<INPUT id=pbcrestx type=text size=3 maxlength=3 value=""></td>';
    m += '<TD>Y:<INPUT id=pbcresty type=text size=3 maxlength=3 value=""></td></tr></table>';
    m += '<DIV id=pbWave1 class=ptstat>'+translate('Ola')+' <b>1</b>:</div>';
    m += '<table><tr>';
    m += '<TD>'+uW.arStrings.unitName["u1"]+'</td><TD><INPUT id=R1SOM type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u2"]+'</td><TD><INPUT id=R1REC type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u6"]+'</td><TD><INPUT id=R1CAL type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u7"]+'</td><TD><INPUT id=R1CAV type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u4"]+'</td><TD><INPUT id=R1LEG type=text size=6 maxlength=6 value=0></td></tr>';
    m += '<tr><TD>'+uW.arStrings.unitName["u10"]+'</td><TD><INPUT id=R1SCO type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u9"]+'</td><TD><INPUT id=R1CAR type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u8"]+'</td><TD><INPUT id=R1CAP type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u5"]+'</td><TD><INPUT id=R1CEN type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u11"]+'</td><TD><INPUT id=R1ARI type=text size=6 maxlength=6 value=0></td></tr>';
    m += '<tr><TD>'+uW.arStrings.unitName["u12"]+'</td><TD><INPUT id=R1BAL type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u31"]+'</td><TD><INPUT id=R1BER type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u32"]+'</td><TD><INPUT id=R1RAI type=text size=6 maxlength=6 value=0></td></tr>';
    m += '</table><br><br>';
	m += '<DIV id=pbWave1 class=ptstat>'+translate('Ola')+' <b>2</b>:</div>';
    m += '<table><tr>';
    m += '<TD>'+uW.arStrings.unitName["u1"]+'</td><TD><INPUT id=R2SOM type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u2"]+'</td><TD><INPUT id=R2REC type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u6"]+'</td><TD><INPUT id=R2CAL type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u7"]+'</td><TD><INPUT id=R2CAV type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u4"]+'</td><TD><INPUT id=R2LEG type=text size=6 maxlength=6 value=0></td></tr>';
    m += '<tr><TD>'+uW.arStrings.unitName["u10"]+'</td><TD><INPUT id=R2SCO type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u9"]+'</td><TD><INPUT id=R2CAR type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u8"]+'</td><TD><INPUT id=R2CAP type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u5"]+'</td><TD><INPUT id=R2CEN type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u11"]+'</td><TD><INPUT id=R2ARI type=text size=6 maxlength=6 value=0></td>';
    m += '<tr><TD>'+uW.arStrings.unitName["u12"]+'</td><TD><INPUT id=R2BAL type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u31"]+'</td><TD><INPUT id=R2BER type=text size=6 maxlength=6 value=0></td>';
    m += '<TD>'+uW.arStrings.unitName["u32"]+'</td><TD><INPUT id=R2RAI type=text size=6 maxlength=6 value=0></td></tr></table>';
    m += '<DIV style="text-align:center; margin-top:15px"><INPUT id=pbSaveRouteCrest type=submit value="'+translate('Añadir destino')+'"></div>';
 
    t.cont.innerHTML = m;
	ById('pbgenenergy').addEventListener('change', function(){
		Options.CrestEnergy = ById('pbgenenergy').value;
		saveOptions();
	}, false);
    ById('pbcrest_interval').addEventListener('change', function(){
       		if (parseIntNan(ById("pbcrest_interval").value<5)) ById("pbcrest_interval").value=5;
    		Options.Crestinterval = parseIntNan(ById("pbcrest_interval").value);
    		saveOptions();
	},false);
    for (var i=0;i<Cities.numCities;i++){
		if (CrestOptions.CrestCity == Cities.cities[i][0]){
			selbut=i;
			break;
		}
	}
	
    t.tcp = new CdispCityPicker ('crestcityselect', document.getElementById('crestcity'), true, t.clickCitySelect, selbut);
    
    if (CrestOptions.CrestCity == 0) {
    	CrestOptions.CrestCity = t.tcp.city.c.id;
    }
	
      document.getElementById('pbcrestx').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbcrestx').value)) document.getElementById('pbcrestx').value='' ;
      }, false);
      document.getElementById('pbcresty').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbcresty').value)) document.getElementById('pbcresty').value='' ;
      }, false);
      document.getElementById('R1SOM').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1SOM').value)) document.getElementById('R1SOM').value=0 ;
      }, false);
      document.getElementById('R1REC').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1REC').value)) document.getElementById('R1REC').value=0 ;
      }, false);
      document.getElementById('R1CAV').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1CAV').value)) document.getElementById('R1CAV').value=0 ;
      }, false);
      document.getElementById('R1CAL').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1CAL').value)) document.getElementById('R1CAL').value=0 ;
      }, false);
      document.getElementById('R1LEG').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1LEG').value)) document.getElementById('R1LEG').value=0 ;
      }, false);
      document.getElementById('R1SCO').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1SCO').value)) document.getElementById('R1SCO').value=0 ;
      }, false);
      document.getElementById('R1CAR').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1CAR').value)) document.getElementById('R1CAR').value=0 ;
      }, false);
      document.getElementById('R1CAP').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1CAP').value)) document.getElementById('R1CAP').value=0 ;
      }, false);
      document.getElementById('R1CEN').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1CEN').value)) document.getElementById('R1CEN').value=0 ;
      }, false);
      document.getElementById('R1ARI').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1ARI').value)) document.getElementById('R1ARI').value=0 ;
      }, false);
      document.getElementById('R1BAL').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1BAL').value)) document.getElementById('R1BAL').value=0 ;
      }, false);
      document.getElementById('R1BER').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1BER').value)) document.getElementById('R1BER').value=0 ;
      }, false);
      document.getElementById('R1RAI').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1RAI').value)) document.getElementById('R1RAI').value=0 ;
      }, false);
      
      
      document.getElementById('R2SOM').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2SOM').value)) document.getElementById('R2SOM').value=0 ;
      }, false);
      document.getElementById('R2REC').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2REC').value)) document.getElementById('R2REC').value=0 ;
      }, false);
      document.getElementById('R2CAV').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2CAV').value)) document.getElementById('R2CAV').value=0 ;
      }, false);
      document.getElementById('R2CAL').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2CAL').value)) document.getElementById('R2CAL').value=0 ;
      }, false);
      document.getElementById('R2LEG').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2LEG').value)) document.getElementById('R2LEG').value=0 ;
      }, false);
      document.getElementById('R2SCO').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2SCO').value)) document.getElementById('R2SCO').value=0 ;
      }, false);
      document.getElementById('R2CAR').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2CAR').value)) document.getElementById('R2CAR').value=0 ;
      }, false);
      document.getElementById('R2CAP').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2CAP').value)) document.getElementById('R2CAP').value=0 ;
      }, false);
      document.getElementById('R2CEN').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2CEN').value)) document.getElementById('R2CEN').value=0 ;
      }, false);
      document.getElementById('R2ARI').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2ARI').value)) document.getElementById('R2ARI').value=0 ;
      }, false);
      document.getElementById('R2BAL').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2BAL').value)) document.getElementById('R2BAL').value=0 ;
      }, false);
      document.getElementById('R2BER').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2BER').value)) document.getElementById('R2BER').value=0 ;
      }, false);
      document.getElementById('R2RAI').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2RAI').value)) document.getElementById('R2RAI').value=0 ;
      }, false);
         
    document.getElementById('crestcity').addEventListener('click', function(){CrestOptions.CrestCity = t.tcp.city.id;} , false);
    document.getElementById('Cresttoggle').addEventListener('click', function(){t.toggleCrestState(this)} , false);
    document.getElementById('pbcrestx').addEventListener('change', function(){CrestOptions.X = document.getElementById('pbcrestx').value;;} , false);
    document.getElementById('pbcresty').addEventListener('change', function(){CrestOptions.Y = document.getElementById('pbcresty').value;} , false);
    document.getElementById('R1SOM').addEventListener('change', function(){CrestOptions.R1SOM = document.getElementById('R1SOM').value;} , false);
    document.getElementById('R1REC').addEventListener('change', function(){CrestOptions.R1REC = document.getElementById('R1REC').value;} , false);
    document.getElementById('R1CAL').addEventListener('change', function(){CrestOptions.R1CAL = document.getElementById('R1CAL').value;} , false);
    document.getElementById('R1CAV').addEventListener('change', function(){CrestOptions.R1CAV = document.getElementById('R1CAV').value;} , false);
    document.getElementById('R1LEG').addEventListener('change', function(){CrestOptions.R1LEG = document.getElementById('R1LEG').value;} , false);
    document.getElementById('R1SCO').addEventListener('change', function(){CrestOptions.R1SCO = document.getElementById('R1SCO').value;} , false);
    document.getElementById('R1CAR').addEventListener('change', function(){CrestOptions.R1CAR = document.getElementById('R1CAR').value;} , false);
    document.getElementById('R1CAP').addEventListener('change', function(){CrestOptions.R1CAP = document.getElementById('R1CAP').value;} , false);
    document.getElementById('R1CEN').addEventListener('change', function(){CrestOptions.R1CEN = document.getElementById('R1CEN').value;} , false);
    document.getElementById('R1ARI').addEventListener('change', function(){CrestOptions.R1ARI = document.getElementById('R1ARI').value;} , false);
    document.getElementById('R1BAL').addEventListener('change', function(){CrestOptions.R1BAL = document.getElementById('R1BAL').value;} , false);
    document.getElementById('R1BER').addEventListener('change', function(){CrestOptions.R1BER = document.getElementById('R1BER').value;} , false);
    document.getElementById('R1RAI').addEventListener('change', function(){CrestOptions.R1RAI = document.getElementById('R1RAI').value;} , false);
    
    document.getElementById('R2SOM').addEventListener('change', function(){CrestOptions.R2SOM = document.getElementById('R2SOM').value;} , false);
    document.getElementById('R2REC').addEventListener('change', function(){CrestOptions.R2REC = document.getElementById('R2REC').value;} , false);
    document.getElementById('R2CAL').addEventListener('change', function(){CrestOptions.R2CAL = document.getElementById('R2CAL').value;} , false);
    document.getElementById('R2CAV').addEventListener('change', function(){CrestOptions.R2CAV = document.getElementById('R2CAV').value;} , false);
    document.getElementById('R2LEG').addEventListener('change', function(){CrestOptions.R2LEG = document.getElementById('R2LEG').value;} , false);
    document.getElementById('R2SCO').addEventListener('change', function(){CrestOptions.R2SCO = document.getElementById('R2SCO').value;} , false);
    document.getElementById('R2CAR').addEventListener('change', function(){CrestOptions.R2CAR = document.getElementById('R2CAR').value;} , false);
    document.getElementById('R2CAP').addEventListener('change', function(){CrestOptions.R2CAP = document.getElementById('R2CAP').value;} , false);
    document.getElementById('R2CEN').addEventListener('change', function(){CrestOptions.R2CEN = document.getElementById('R2CEN').value;} , false);
    document.getElementById('R2ARI').addEventListener('change', function(){CrestOptions.R2ARI = document.getElementById('R2ARI').value;} , false);
    document.getElementById('R2BAL').addEventListener('change', function(){CrestOptions.R2BAL = document.getElementById('R2BAL').value;} , false);
    document.getElementById('R2BER').addEventListener('change', function(){CrestOptions.R2BER = document.getElementById('R2BER').value;} , false);
    document.getElementById('R2RAI').addEventListener('change', function(){CrestOptions.R2RAI = document.getElementById('R2RAI').value;} , false);
    
    document.getElementById('CrestHelp').addEventListener('click', function(){t.helpPop();} , false);
    document.getElementById('pbSaveRouteCrest').addEventListener('click', function(){CrestOptions.active=true;t.addCrestRoute();}, false);
    document.getElementById('showCrestTargets').addEventListener('click', function(){t.showCrestRoute();}, false);         
    
	}, 
helpPop : function (){
    var helpText = 'Non disponibile';
     if (t.cresthelp == null) {
     	t.cresthelp = new CPopup('ArmoiriesHelp', 0, 0, 585, 400, true, function() {clearTimeout (1000);});
     	t.cresthelp.centerMe (mainPop.getMainDiv());
   	}
    t.cresthelp.getMainDiv().innerHTML = helpText;
    t.cresthelp.getTopDiv().innerHTML = '<CENTER><B>'+translate('Ayuda')+' - Crest</b></center>';
    t.cresthelp.show (true);
  },
    addCrestRoute : function () {
		if(CrestOptions.X == "" || CrestOptions.Y == "") {
		        alert(translate('Sin coordenadas')+'!');
			return;
		}
		var t = my.Crest;
		var CrestLength = CrestData.length;
		CrestData[CrestLength] = new CrestFunc(CrestOptions);
		saveCrestData();
     	ById('pbOpt').style.background ='#99FF99';
     	setTimeout(function(){ (ById('pbOpt').style.background =''); }, 500);
    },
    showCrestRoute : function () {
		var t = my.Crest;
     		if (t.popCrestTargets == null) {
     		 t.popCrestTargets = new CPopup('pbShowCrestTargets', 0, 0, 1100, 500, true, function() {clearTimeout (1000);});
     		 t.popCrestTargets.centerMe (mainPop.getMainDiv());
     		}
     		
		var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbShowCrestTargets" id="pbCrestTargets">';       
		t.popCrestTargets.getMainDiv().innerHTML = '</table></div>' + m;
		t.popCrestTargets.getTopDiv().innerHTML = '<TD><B>'+translate('Blanco de ataque')+'</td>';
		t.paintCrestTargets();
		t._addTabHeader();
		t.popCrestTargets.show(true);

    },
	
	

/** add header **/
    _addTabHeader : function () {
		var row = document.getElementById('pbCrestTargets').insertRow(0);
		row.vAlign = 'top';
	     	row.insertCell(0).innerHTML = uW.arStrings.Common.Target;
	     	row.insertCell(1).innerHTML = translate('Ola') + " #";
	     	row.insertCell(2).innerHTML = uW.arStrings.unitName["u1"];
	     	row.insertCell(3).innerHTML = uW.arStrings.unitName["u2"];
	     	row.insertCell(4).innerHTML = uW.arStrings.unitName["u6"];
	     	row.insertCell(5).innerHTML = uW.arStrings.unitName["u7"];
	     	row.insertCell(6).innerHTML = uW.arStrings.unitName["u4"];
	     	row.insertCell(7).innerHTML = uW.arStrings.unitName["u10"];
	     	row.insertCell(8).innerHTML = uW.arStrings.unitName["u9"];
	     	row.insertCell(9).innerHTML = uW.arStrings.unitName["u8"];
	     	row.insertCell(10).innerHTML = uW.arStrings.unitName["u5"];
	     	row.insertCell(11).innerHTML = uW.arStrings.unitName["u11"];
	     	row.insertCell(12).innerHTML = uW.arStrings.unitName["u12"];
	     	row.insertCell(13).innerHTML = uW.arStrings.unitName["u31"];
	     	row.insertCell(14).innerHTML = uW.arStrings.unitName["u32"];
	     	row.insertCell(15).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
	     	row.insertCell(16).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    },
	
	

/** paintCrestTargets **/
    paintCrestTargets : function () {
		t = my.Crest;

		for(var i = 0; i < CrestData.length; i++) {
			t._addTabCrest(i, uW.arStrings.Common.To+': <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord(' + CrestData[i].X + ',' + CrestData[i].Y+');">('+CrestData[i].X+','+CrestData[i].Y+')</a>', "<b>2</b>", CrestData[i].R2SOM, CrestData[i].R2REC, CrestData[i].R2CAL, CrestData[i].R2CAV, CrestData[i].R2LEG, CrestData[i].R2SCO, CrestData[i].R2CAR, CrestData[i].R2CAP, CrestData[i].R2CEN, CrestData[i].R2ARI, CrestData[i].R2BAL, CrestData[i].R2BER, CrestData[i].R2RAI, " "," ");
			if (CrestData[i].active==true)
			 t._addTabCrest(i, CrestData[i].CrestCity, "<b>1</b>", CrestData[i].R1SOM, CrestData[i].R1REC, CrestData[i].R1CAL, CrestData[i].R1CAV, CrestData[i].R1LEG, CrestData[i].R1SCO, CrestData[i].R1CAR, CrestData[i].R1CAP, CrestData[i].R1CEN, CrestData[i].R1ARI, CrestData[i].R1BAL, CrestData[i].R1BER, CrestData[i].R1RAI, uW.arStrings.NeighborsPage.Remove, translate('Activo'));
			else
			 t._addTabCrest(i, CrestData[i].CrestCity, "<b>1</b>", CrestData[i].R1SOM, CrestData[i].R1REC, CrestData[i].R1CAL, CrestData[i].R1CAV, CrestData[i].R1LEG, CrestData[i].R1SCO, CrestData[i].R1CAR, CrestData[i].R1CAP, CrestData[i].R1CEN, CrestData[i].R1ARI, CrestData[i].R1BAL, CrestData[i].R1BER, CrestData[i].R1RAI, uW.arStrings.NeighborsPage.Remove, translate('Desactivo'));
			
//			t._addTabCrest(i, "","","","","","","","","","","","","","","","","");
		}

	},
	
	

/** Add Tab Crest **/
    _addTabCrest : function (QueID, col0, col1, col2, col3, col4, col5, col6, col7, col8, col9, col10, col11, col12, col13, col14, col15, col16) {
		var t = my.Crest;
		var row = document.getElementById('pbCrestTargets').insertRow(0);

		for (var i = 0; i < 17; i++) {
			if (i == 15 && col15 == uW.arStrings.NeighborsPage.Remove) {
				row.insertCell(i).innerHTML = "<input type=button id='pbCrestDel_" + QueID + "' value='"+uW.arStrings.NeighborsPage.Remove+"'>";
				document.getElementById('pbCrestDel_' + QueID).addEventListener('click', function(){t.cancelCrestTarget(QueID);}, false);
			} else if (col15 == uW.arStrings.NeighborsPage.Remove && i == 0) {
				row.insertCell(i).innerHTML = Cities.byID[col0].c.name;
			} else if  (i == 16 && col15 == uW.arStrings.NeighborsPage.Remove) {
			
			  if ( i == 16 && col16 == translate('Activo')) {
			   row.insertCell(i).innerHTML = "<input type=button id='BOCrestAct_" + QueID + "'  value='"+translate('Activo')+"'>";
			     document.getElementById('BOCrestAct_' + QueID).addEventListener('click', function(){ CrestData[QueID].active=false;saveCrestData();t.showCrestRoute();  }, false);
			  } else if (i == 16 && col16 ==translate('Desactivo')) {
			   row.insertCell(i).innerHTML = "<input type=button id='BOCrestAct_" + QueID + "'  value='"+translate('Desactivo')+"'>";
			     document.getElementById('BOCrestAct_' + QueID).addEventListener('click', function(){ CrestData[QueID].active=true;saveCrestData();t.showCrestRoute();  }, false);
			  
			  }
			
			}else{
				row.insertCell(i).innerHTML = eval("col" + i) + "&nbsp; &nbsp;";
			}
			
			
		}
		
    },
	
	

/** Cancel Crest Target **/
    cancelCrestTarget : function (QueID) {
	     var t = my.Crest;
	     var queueId = parseInt(QueID);
	     CrestData.splice(queueId, 1);
	     saveCrestData();
	     t.showCrestRoute();
    },

         getRallypointLevel: function(id){
           var t = my.Crest;
          t.numslots=parseInt(unsafeWindow.Building.getMaxLevelForType(unsafeWindow.Constant.Building.RALLY_SPOT,id));
		},

         getRallypointLevel2: function(id){
           var t = my.Crest;
          t.rallypointlevel=parseInt(unsafeWindow.Building.getMaxLevelForType(unsafeWindow.Constant.Building.RALLY_SPOT,id));
		},

 	sendMarch: function(p,callback,r,retry, CrestDataNum, cityID, a, b){
           unsafeWindow.AjaxCall.gPostRequest("march.php",p,
           function(h){
           			actionLog('Crest',translate('Crest')+' '+uW.arStrings.Common.To+' '+p.xcoord+','+p.ycoord);
			 		var now = new Date().getTime()/1000.0;
					now = now.toFixed(0); 
					var i="attack",j=Number(h.eta)-Number(h.initTS);
	   				unsafeWindow.Chrome.ResourcesBar.update();
	   				unsafeWindow.Object.keys(a.units).each(function(k){Cities.byID[cityID].c.troops[k].subtract(a.units[k].sent)});
	   				if(b){b.status=10;b.subtractEnergy()}
	   				a.id=Number(h.marchId);
	   				a.to.tileId=Number(h.tileId);
	   				a.to.tileType=Number(h.tileType);
	   				a.to.tileLevel=Number(h.tileLevel);
	   				a.to.playerId=Number(h.tileUserId);
	   				a.to.cityId=Number(h.tileCityId);
	   				a.setStatus(unsafeWindow.Constant.MarchStatus.OUTBOUND);
	   				a.setMarchTime(unsafeWindow.unixtime(),unsafeWindow.unixtime()+j,0);
	   				Cities.byID[cityID].c.marches.outgoing[a.id]=a;
	   				unsafeWindow.KTrack.event(["_trackEvent","March",i,unsafeWindow.player.level]);
					if(r==1){
											Options.Crest1Count++;
											r = 2;
//											CrestData[CrestDataNum].lastRoundTwo = now;
					} else {
											r = 1;
											CrestDataNum = parseInt(CrestDataNum) + 1; 
											Options.Crest2Count++;
					}
					saveCrestData();
					t.timer = setTimeout (function(){callback(r,0,CrestDataNum);}, (Math.random()*10*50)+(Options.Crestinterval*1000));
					return;
				},
				function(h){
					var RetryTime = parseIntNan(Options.Crestinterval)*1000;
					actionLog('Crest','<font color=red>'+translate('SUSPENSO')+' '+translate('Crest')+' '+uW.arStrings.Common.To+' '+p.xcoord+','+p.ycoord+' '+translate('Lo intentaré después')+' '+RetryTime);
					setTimeout (function(){callback(r,retry,CrestDataNum);}, RetryTime);
					return;
			}, false);
	},
	

	Rounds : function (r, retry, CrestDataNum) {
		var t = my.Crest;
		clearTimeout(t.timer);
		
		if (!Options.crestRunning) return;

		if (CrestData.length == 0){
			return;
		}
			
		if (CrestDataNum >= CrestData.length) {
			CrestDataNum = 0;
			saveCrestData();
			t.timer = setTimeout(function(){ t.Rounds(1,retry,CrestDataNum);},Options.Crestinterval*1000);
			return;
		}

		cityID = CrestData[CrestDataNum].CrestCity;
		
		if (CrestData[CrestDataNum].active==false) {
			alert('Disattivo');
		    t.timer =setTimeout(function() { t.Rounds(1,0,parseInt(CrestDataNum+1)); },1000);
		    return;
		}

		retry++;		
		switch (retry) {
			case 10:
				t.timer =setTimeout(function(){ t.Rounds(r,retry,CrestDataNum);},30000);
				return;
				break;
			case 20:
				t.timer =setTimeout(function(){ t.Rounds(r,retry,CrestDataNum);},30000);
				return;
				break;
			case 50:
				//reloadKOC();
				return;
				break;
		}
   	   var unit1 = 1; var unit2 = 2; var unit6 = 6; var unit7 = 7; var unit4 = 4; var unit10 = 10; var unit9 = 9; var unit8 = 8; var unit5 = 5; var unit11 = 11; var unit12 = 12; var unit31 = 31; var unit32 = 32;
 	   var Controllo = true;
       if(parseInt(Cities.byID[cityID].c.troops[unit1].count())  < CrestData[CrestDataNum].R1SOM) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit2].count())  < CrestData[CrestDataNum].R1REC) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit6].count())  < CrestData[CrestDataNum].R1CAL) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit7].count())  < CrestData[CrestDataNum].R1CAV) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit4].count())  < CrestData[CrestDataNum].R1LEG) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit10].count()) < CrestData[CrestDataNum].R1SCO) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit9].count())  < CrestData[CrestDataNum].R1CAR) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit8].count())  < CrestData[CrestDataNum].R1CAP) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit5].count())  < CrestData[CrestDataNum].R1CEN) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit11].count()) < CrestData[CrestDataNum].R1ARI) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit12].count()) < CrestData[CrestDataNum].R1BAL) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit31].count()) < CrestData[CrestDataNum].R1BER) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit32].count()) < CrestData[CrestDataNum].R1RAI) Controllo = false;
       
       if(parseInt(Cities.byID[cityID].c.troops[unit1].count())  < CrestData[CrestDataNum].R2SOM) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit2].count())  < CrestData[CrestDataNum].R2REC) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit6].count())  < CrestData[CrestDataNum].R2CAL) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit7].count())  < CrestData[CrestDataNum].R2CAV) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit4].count())  < CrestData[CrestDataNum].R2LEG) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit10].count()) < CrestData[CrestDataNum].R2SCO) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit9].count())  < CrestData[CrestDataNum].R2CAR) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit8].count())  < CrestData[CrestDataNum].R2CAP) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit5].count())  < CrestData[CrestDataNum].R2CEN) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit11].count()) < CrestData[CrestDataNum].R2ARI) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit12].count()) < CrestData[CrestDataNum].R2BAL) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit31].count()) < CrestData[CrestDataNum].R2BER) Controllo = false;
       if(parseInt(Cities.byID[cityID].c.troops[unit32].count()) < CrestData[CrestDataNum].R2RAI) Controllo = false;
       if(!Controllo){
			if (CrestData.length == 1) {
				t.timer =setTimeout(function(){ t.Rounds(r,retry,CrestDataNum);},Options.Crestinterval*1000);
				return;
			 } else {
				t.timer =setTimeout(function(){ t.Rounds(1,retry,parseInt(CrestDataNum)+1);},Options.Crestinterval*1000);
				return;   
			}    
       }

     	var kk=[];
     	Cities.byID[cityID].c.generalsSorted().each(function(b){if(b.available() && b.energy()>Options.CrestEnergy){ kk.push(b);}}); // id du premier chevalier ! a trouver
     	
     	var selectedKnight=kk.length>0?kk[0].id:0;
		
		
	//	alert(Cities.byID[cityID].c.name);
		if(Cities.byID[cityID].c.canMarch()){
			if(selectedKnight != 0){
			
			} else {
				if (CrestData.length == 1) {
					t.timer = setTimeout(function(){ t.Rounds(r,retry,CrestDataNum);},Options.Crestinterval*1000);
					return;
				} else {
					t.timer = setTimeout(function(){ t.Rounds(1,retry,parseInt(CrestDataNum)+1);},Options.Crestinterval*1000);
					return;
				}
			}
		} else {
			if (CrestData.length == 1) {
				t.timer = setTimeout(function(){ t.Rounds(r,retry,CrestDataNum);},Options.Crestinterval*1000);
				return;
			} else {
				t.timer = setTimeout(function(){ t.Rounds(1,retry,parseInt(CrestDataNum)+1);},Options.Crestinterval*1000);
				return;
			}
		}

		var kid = selectedKnight;
		if (CrestData[CrestDataNum].R1SOM == 0 && CrestData[CrestDataNum].R1REC == 0 && CrestData[CrestDataNum].R1CAL == 0 && CrestData[CrestDataNum].R1CAV == 0 && CrestData[CrestDataNum].R1LEG == 0 && CrestData[CrestDataNum].R1SCO == 0 && CrestData[CrestDataNum].R1CAR == 0 && CrestData[CrestDataNum].R1CAP == 0 && CrestData[CrestDataNum].R1CEN == 0 && CrestData[CrestDataNum].R1ARI == 0 && CrestData[CrestDataNum].R1BAL == 0 && CrestData[CrestDataNum].R1BER == 0) {
		   r=2;
	   	}
		if (CrestData[CrestDataNum].R2SOM == 0 && CrestData[CrestDataNum].R2REC == 0 && CrestData[CrestDataNum].R2CAL == 0 && CrestData[CrestDataNum].R2CAV == 0 && CrestData[CrestDataNum].R2LEG == 0 && CrestData[CrestDataNum].R2SCO == 0 && CrestData[CrestDataNum].R2CAR == 0 && CrestData[CrestDataNum].R2CAP == 0 && CrestData[CrestDataNum].R2CEN == 0 && CrestData[CrestDataNum].R2ARI == 0 && CrestData[CrestDataNum].R2BAL == 0 && CrestData[CrestDataNum].R2BER == 0) {
		   r=1;
	   	}	   	
	   	/**else {
			var now = new Date().getTime()/1000.0;
			now = now.toFixed(0);
			if (now > (parseInt(CrestData[CrestDataNum].lastRoundTwo) + 300)) { // 3 minutes entre les premiËres vagues 
				r=1;
			}
		}	**/
	   var d=unsafeWindow.Building.getMaxLevelForType(50,cityID);
       var a=new unsafeWindow.March({marchId:Cities.byID[cityID].c.emptyMarchSlots()[0],toXCoord:CrestData[CrestDataNum].X,toYCoord:CrestData[CrestDataNum].Y,fromCityId:CrestData[CrestDataNum].CrestCity,marchType:unsafeWindow.Constant.MarchType.ATTACK,knightId:selectedKnight,fromHealLevel:d,apothecaryHealPercent:unsafeWindow.KB.Controllers.Apothecary.getHealPercent(d),gold:0,resource1:0,resource2:0,resource3:0,resource4:0});
 
        var CalcEta = t.calculateTime(CrestData[CrestDataNum].CrestCity,7,CrestData[CrestDataNum].X,CrestData[CrestDataNum].Y);
		var b=Cities.byID[cityID].c.generals[a.general.id];
		if(b.energy()>0){
		switch(r) {
			case 1:
				var params 		= 	{};
				params.mid		= 	a.id;
				params.xcoord 	= 	a.to.x;
				params.ycoord 	= 	a.to.y;
				params.cid		=	cityID;
				params.type		=	unsafeWindow.Constant.MarchType.ATTACK;
				params.kid		= 	a.general.id;
				params.gold		=	a.gold;
				params.r1		=	a.resources[1];
				params.r2		=	a.resources[2];
				params.r3		=	a.resources[3];
				params.r4		=	a.resources[4];				
				params.camp		=	0;
				params.et		=	CalcEta;
				if(CrestData[CrestDataNum].R1SOM >0) a.units[unit1].sent 		= 	CrestData[CrestDataNum].R1SOM;
				if(CrestData[CrestDataNum].R1REC >0) a.units[unit2].sent 		= 	CrestData[CrestDataNum].R1REC;
				if(CrestData[CrestDataNum].R1CAL >0) a.units[unit6].sent 		= 	CrestData[CrestDataNum].R1CAL;
				if(CrestData[CrestDataNum].R1CAV >0) a.units[unit7].sent 		= 	CrestData[CrestDataNum].R1CAV;
				if(CrestData[CrestDataNum].R1LEG >0) a.units[unit4].sent 		= 	CrestData[CrestDataNum].R1LEG;
				if(CrestData[CrestDataNum].R1SCO >0) a.units[unit10].sent 		= 	CrestData[CrestDataNum].R1SCO;
				if(CrestData[CrestDataNum].R1CAR >0) a.units[unit9].sent		= 	CrestData[CrestDataNum].R1CAR;
				if(CrestData[CrestDataNum].R1CAP >0) a.units[unit8].sent 		= 	CrestData[CrestDataNum].R1CAP;
				if(CrestData[CrestDataNum].R1CEN >0) a.units[unit5].sent 		= 	CrestData[CrestDataNum].R1CEN;
				if(CrestData[CrestDataNum].R1ARI >0) a.units[unit11].sent		= 	CrestData[CrestDataNum].R1ARI;
				if(CrestData[CrestDataNum].R1BAL >0) a.units[unit12].sent 		= 	CrestData[CrestDataNum].R1BAL;
				if(CrestData[CrestDataNum].R1BER >0) a.units[unit31].sent	 	= 	CrestData[CrestDataNum].R1BER;
				if(CrestData[CrestDataNum].R1RAI >0) a.units[unit32].sent		=	CrestData[CrestDataNum].R1RAI;
				if(CrestData[CrestDataNum].R1SOM >0) params.u1 		= 	CrestData[CrestDataNum].R1SOM;
				if(CrestData[CrestDataNum].R1REC >0) params.u2 		= 	CrestData[CrestDataNum].R1REC;
				if(CrestData[CrestDataNum].R1CAL >0) params.u6 		= 	CrestData[CrestDataNum].R1CAL;
				if(CrestData[CrestDataNum].R1CAV >0) params.u7 		= 	CrestData[CrestDataNum].R1CAV;
				if(CrestData[CrestDataNum].R1LEG >0) params.u4 		= 	CrestData[CrestDataNum].R1LEG;
				if(CrestData[CrestDataNum].R1SCO >0) params.u10 	= 	CrestData[CrestDataNum].R1SCO;
				if(CrestData[CrestDataNum].R1CAR >0) params.u9		= 	CrestData[CrestDataNum].R1CAR;
				if(CrestData[CrestDataNum].R1CAP >0) params.u8 		= 	CrestData[CrestDataNum].R1CAP;
				if(CrestData[CrestDataNum].R1CEN >0) params.u5 		= 	CrestData[CrestDataNum].R1CEN;
				if(CrestData[CrestDataNum].R1ARI >0) params.u11		= 	CrestData[CrestDataNum].R1ARI;
				if(CrestData[CrestDataNum].R1BAL >0) params.u12 	= 	CrestData[CrestDataNum].R1BAL;
				if(CrestData[CrestDataNum].R1BER >0) params.u31 	= 	CrestData[CrestDataNum].R1BER;
				if(CrestData[CrestDataNum].R1RAI >0) params.u32		=	CrestData[CrestDataNum].R1RAI;
				t.sendMarch(params,t.Rounds,r,retry, CrestDataNum, cityID, a, b);
				break;
			default:
				var params 		= 	{};
				params.mid		= 	a.id;
				params.xcoord 	= 	a.to.x;
				params.ycoord 	= 	a.to.y;
				params.cid		=	cityID;
				params.type		=	unsafeWindow.Constant.MarchType.ATTACK;
				params.kid		= 	a.general.id;
				params.gold		=	a.gold;
				params.r1		=	a.resources[1];
				params.r2		=	a.resources[2];
				params.r3		=	a.resources[3];
				params.r4		=	a.resources[4];				
				params.camp		=	0;
				params.et		=	CalcEta;
				if(CrestData[CrestDataNum].R2SOM >0) a.units[unit1].sent 		= 	CrestData[CrestDataNum].R2SOM;
				if(CrestData[CrestDataNum].R2REC >0) a.units[unit2].sent 		= 	CrestData[CrestDataNum].R2REC;
				if(CrestData[CrestDataNum].R2CAL >0) a.units[unit6].sent 		= 	CrestData[CrestDataNum].R2CAL;
				if(CrestData[CrestDataNum].R2CAV >0) a.units[unit7].sent 		= 	CrestData[CrestDataNum].R2CAV;
				if(CrestData[CrestDataNum].R2LEG >0) a.units[unit4].sent 		= 	CrestData[CrestDataNum].R2LEG;
				if(CrestData[CrestDataNum].R2SCO >0) a.units[unit10].sent 		= 	CrestData[CrestDataNum].R2SCO;
				if(CrestData[CrestDataNum].R2CAR >0) a.units[unit9].sent		= 	CrestData[CrestDataNum].R2CAR;
				if(CrestData[CrestDataNum].R2CAP >0) a.units[unit8].sent 		= 	CrestData[CrestDataNum].R2CAP;
				if(CrestData[CrestDataNum].R2CEN >0) a.units[unit5].sent 		= 	CrestData[CrestDataNum].R2CEN;
				if(CrestData[CrestDataNum].R2ARI >0) a.units[unit11].sent		= 	CrestData[CrestDataNum].R2ARI;
				if(CrestData[CrestDataNum].R2BAL >0) a.units[unit12].sent 		= 	CrestData[CrestDataNum].R2BAL;
				if(CrestData[CrestDataNum].R2BER >0) a.units[unit31].sent	 	= 	CrestData[CrestDataNum].R2BER;
				if(CrestData[CrestDataNum].R2RAI >0) a.units[unit32].sent		=	CrestData[CrestDataNum].R2RAI;
				if(CrestData[CrestDataNum].R2SOM >0) params.u1 		= 	CrestData[CrestDataNum].R2SOM;
				if(CrestData[CrestDataNum].R2REC >0) params.u2 		= 	CrestData[CrestDataNum].R2REC;
				if(CrestData[CrestDataNum].R2CAL >0) params.u6 		= 	CrestData[CrestDataNum].R2CAL;
				if(CrestData[CrestDataNum].R2CAV >0) params.u7 		= 	CrestData[CrestDataNum].R2CAV;
				if(CrestData[CrestDataNum].R2LEG >0) params.u4 		= 	CrestData[CrestDataNum].R2LEG;
				if(CrestData[CrestDataNum].R2SCO >0) params.u10 	= 	CrestData[CrestDataNum].R2SCO;
				if(CrestData[CrestDataNum].R2CAR >0) params.u9 		= 	CrestData[CrestDataNum].R2CAR;
				if(CrestData[CrestDataNum].R2CAP >0) params.u8 		= 	CrestData[CrestDataNum].R2CAP;
				if(CrestData[CrestDataNum].R2CEN >0) params.u5 		= 	CrestData[CrestDataNum].R2CEN;
				if(CrestData[CrestDataNum].R2ARI >0) params.u11		= 	CrestData[CrestDataNum].R2ARI;
				if(CrestData[CrestDataNum].R2BAL >0) params.u12 	= 	CrestData[CrestDataNum].R2BAL;
				if(CrestData[CrestDataNum].R2BER >0) params.u31 	= 	CrestData[CrestDataNum].R2BER;
				if(CrestData[CrestDataNum].R2RAI >0) params.u32		=	CrestData[CrestDataNum].R2RAI;
           		t.sendMarch(params,t.Rounds,r,retry, CrestDataNum, cityID, a, b);
				break;
		}
	}

	},
  calculateTime: function(id,b,g,e) {
  var c=65535,a=Math.abs(Cities.byID[id].c.x-g),f=Math.abs(Cities.byID[id].c.y-e),d=Math.sqrt((a*a)+(f*f));
  h=unsafeWindow.Unit.stats[b].speed*1;
  if(h<c){c=h;}
  return Math.ceil(d*6000/c)+30;
  },	

	
	toggleCrestState: function(obj) {
		var t = my.Crest;
		obj = ById('Cresttoggle');
			if (Options.crestRunning == true) {
				Options.crestRunning = false;
				if (obj) obj.value = "Crest = OFF";
				saveOptions();
			} else {
				Options.crestRunning = true;
				if (obj) obj.value = "Crest = ON";
					Options.Crest1Count = 0;
					Options.Crest2Count = 0;
				}
				saveOptions();
				t.timer =setTimeout(function(){ t.Rounds(1,0,0);}, 1000);
			},
	hide : function (){
		var t = my.Crest;
	}
 }

/************************ APOTCHERCARY ************************/
my.Herb = {
  cont : null,
  timer : null,

  init : function (){
    var t = my.Herb;
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    var t = my.Herb;
    return t.cont;
  },

  show : function (){
    var t = my.Herb;   
      try {      
		var m = '<DIV class=ptstat>'+uW.arStrings.buildingName.b50.toUpperCase()+'</div><br><center>';
			m+= '<table><tr><td width="120px"></td>';
			for (var c=0; c<Cities.numCities; c++) {
				m+= '<td colspan="2" width="100px"><b>'+Cities.cities[c].c.name+'</b></td>';
			}
			m+= '</tr><tr><td><br></td></tr>';
			uW.Barracks.allUnitIds.each(function(nbu){
				if (uW.arStrings.unitName["u"+nbu]) {
	 				if (nbu % 2) style = '';
	 				else style = " style = 'background: #e8e8e8'";				
					m+= '<tr><td '+style+'>'+uW.arStrings.unitName["u"+nbu]+'</td>';
        			for (var i=0; i<Cities.numCities; i++) {
	      				var wonded=Cities.cities[i].c.troops[nbu].wounded();
	      				var eta = t.CalcEta(nbu,wonded);
	      				m+= '<td '+style+'>'+wonded+'</td><td '+style+'>'+timestr(eta)+'</td>';
	 				}
	 				m+= '</tr>';
	 			}
	 		});
			m+= '</table></center>';
    	t.cont.innerHTML = m; 
 	} catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
  },
  CalcEta : function (b,a){
  	var t = my.Herb;
  	return Math.ceil((uW.trainingData["unit" + b].costs.level0.time * a) / 80);
  },
  hide : function (){ 
  }
  
}

/************************ AUTO ATTACK GERMANIA ************************/
my.Germ = {
  cont : null,
  timer : null,
  pop:null,
  summary : [],
  selectedCity:null,
  AutoAttackCity:null,
  kk:null,

  init : function (){
    var t = my.Germ;
    t.cont = document.createElement('div');
    return t.cont;
  },

  show : function (){
    var t = my.Germ;   
      try {
      	if (uW.player.underProtection()) {
  			t.cont.innerHTML = '<center><br><br><b>'+uW.arStrings.Boost.BeginnerProtection1 + " " + timestr(uW.player.beginnerProtection.secondsLeft())+'</b></center>';
  			return;
  		}
		var m = '<DIV class=ptstat>'+translate('GERMANIA')+'</div>';
			m+= '<center>'+translate('Ciudad exploración/ataque')+' <span id="CityGerm"></span><br>';
			m+= '<input type="button" value="'+translate('ACTUALIZAR')+'" id="UpdateGerm"></center><br><br>';
			m+= '<div id="GermaniaStats"><center><b>'+translate('Espera')+' . . .</b>';
			m+= '</div>';
			m+= '<br><br><DIV class=ptstat>'+translate('AUTO ATAQUE')+'</div>';
			m+= '<table width=100%><tr><td style="text-align:center; vertical-align:middle;" width=50%>';
			m+= '<div id="AttackGeneral">';
				m+= '<center><table width="300px"><tr>';
				m+= '<td><b>'+uW.arStrings.Common.City+':</b></td>';
				m+= '<td><span id="GermAutoAttack"></span></center></td>';
				m+= '</tr><tr><td><br></td></tr><tr>';
				m+= '</tr><tr>';
				m+= '<td><b>Germania:</b></td>';
				m+= '<td><div id="SelectNumGerm">';
				m+= '</div></td>';
				m+= '</tr><tr><td><br></td></tr><tr>';	 
				m+= '</tr><tr>';
				m+= '<td><b>'+uW.arStrings.Common["Generals"]+':</b></td>';
				m+= '<td><input type="checkbox" id="SelAllGen"> <b>'+translate('Seleccionar todo')+'</b>';
				m+= '<div style="width:200px; max-width:500px; height:100px; max-height:100px; overflow-y:auto; text-align:left;" id="GenGerm"></div></td>';
				m+= '</tr><tr><td><br></td></tr><tr>';
				m+= '</tr><tr>';
				m+= '<td><b>'+uW.arStrings.Common.Troops+': </b></td>';
				m+= '<td><select id="TroopsGenAutoAttack">';
				uW.Barracks.allUnitIds.each(function(r){
         			if (uW.arStrings.unitName["u"+r]) {
          				m+= '<option value="'+r+'">'+uW.arStrings.unitName["u"+r]+"</option>";
         			}
        		});
        		m+= '</select> <b>(<span id="AmoutTroopsGerm"></span>)</b> </td>';
        		m+= '</tr></table><br><br>';
				m+= '<input DISABLED type="button" id="StartAttackGen" value="'+uW.arStrings.Common.Attack+'"></center>';
			m+= '</div>';
			m+= '<div id="StatGeneral">';
				m+= '<br><br><br><br>';
				m+= '<center><span id="TottAttackGen"></span><br>';
				m+= '<span id="TottErrAttackGen"></span><br><br>';
				m+= '<input DISABLED type="button" id="HideStatGen" value="'+uW.arStrings.Common.Close+'"></center>';
			m+= '</div>';
			m+= '<br><br><center><span id="MessageGerm"></span></center>';
			m+= '</td></tr></table>';
			t.cont.innerHTML = m; 
			t.UpdateSelect(1);
			ById('AttackGeneral').style.display = 'block';
			ById('StatGeneral').style.display = 'none';
			
			var dcp = new CdispCityPicker ('germcity', ById('CityGerm'), true, t.clickCitySelect, 0);
			var dcp = new CdispCityPicker ('germautoattackcity', ById('GermAutoAttack'), true, t.clickCityAutoAttackSelect, 0);
			
			t.getSummary();
			t.UpdateTroops();
						
			ById("UpdateGerm").addEventListener('click', function(){ 
				ById('GermaniaStats').innerHTML = '<center><b>'+translate('Espera')+' . . .</b>';
				t.getSummary(); 
			}, false);
			
			ById('SelAllGen').addEventListener('click', function(){ 
				 t.getGeneral();
			}, false);
			
			ById('HideStatGen').addEventListener('click', function(){
				ById('AttackGeneral').style.display = 'block';
				ById('StatGeneral').style.display = 'none';
				ById('HideStatGen').disabled = true;
				ById('StartAttackGen').disabled = true;
				t.getGeneral(); 
				t.UpdateTroops();
				ById('MessageGerm').innerHTML = '<font color=red><b>'+translate('Te sugiero que refresques la página. Algunos datos no pueden ser reales')+'!</b></font>';
			}, false);
			
			ById("TroopsGenAutoAttack").addEventListener('change', function(){ 
				t.UpdateTroops(); 
			}, false);
			
			ById("StartAttackGen").addEventListener('click', function(){ 	
				ById('AttackGeneral').style.display = 'none';
				ById('StatGeneral').style.display = 'block';			
				t.PreStart(); 
			}, false);			
			
			
			
 	} catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
  },
  
  UpdateSelect : function (id) {
  	var t = my.Germ; 
	var m = '<select id="NumGerm">';
		if (id == 1) m+= '<option selected="selected" value="2">1: '+uW.arStrings.battleground1.mapTooltipPoint1+'</option>';
		else m+= '<option value="2">1: '+uW.arStrings.battleground1.mapTooltipPoint1+'</option>';
		
		if (id == 2) m+= '<option selected="selected" value="3">2: '+uW.arStrings.battleground1.mapTooltipPoint2+'</option>';
		else m+= '<option value="3">2: '+uW.arStrings.battleground1.mapTooltipPoint2+'</option>';
		
		if (id == 3) m+= '<option selected="selected" value="4">3: '+uW.arStrings.battleground1.mapTooltipPoint3+'</option>';
		else m+= '<option value="4">3: '+uW.arStrings.battleground1.mapTooltipPoint3+'</option>';

		if (id == 4) m+= '<option selected="selected" value="5">4: '+uW.arStrings.battleground1.mapTooltipPoint4+'</option>';
		else m+= '<option value="5">4: '+uW.arStrings.battleground1.mapTooltipPoint4+'</option>';
		
		if (id == 5) m+= '<option selected="selected" value="6">5: '+uW.arStrings.battleground1.mapTooltipPoint5+'</option>';
		else m+= '<option value="6">5: '+uW.arStrings.battleground1.mapTooltipPoint5+'</option>';
		
		m+= '</select>';
	ById('SelectNumGerm').innerHTML = m;
	ById('NumGerm').addEventListener('change', function(){ 
		for (var y = 1; y < t.summary.length; y++) {
			var Sum = t.summary[y];
			if (Sum.AllianceName == getMyAlliance()[1]) {
				if (ById('NumGerm').value == y+1) {
					alert(translate('No puedes atacar a un miembro de la Alianza')+'!!');
					if (ById('NumGerm').value == 5) {
						var y = ById('NumGerm').value - 1;
						t.UpdateSelect(y);
					} else {
						var y = ById('NumGerm').value + 1;
						t.UpdateSelect(y);
					}
				}
			}
		}
	}, false);
  },
  
PreStart : function () {
   var t = my.Germ;
   var CityId = t.AutoAttackCity.c.id;
   var TotAttacks = 0;
   Cities.byID[CityId].c.generalsSorted().each(function(b){
		if(b.available()){
			if(b.energy()>0 && ById('GEN'+b.id).checked) {
				TotAttacks += b.energy();
			}
		}
	});	  
	ById('TottAttackGen').innerHTML = '0/'+TotAttacks;
	ById('TottErrAttackGen').innerHTML = '';
	t.Start(TotAttacks);
  },
  
  Start : function (TotAttacks) {
   var t = my.Germ;
   var TotAttackComp = 0;
   var TotErrorComp = 0;
   var Germania = ById('NumGerm').value;
   var TroopsId = ById('TroopsGenAutoAttack').value;
   var CityId = t.AutoAttackCity.c.id;

   var kk = [];
   Cities.byID[CityId].c.generalsSorted().each(function(b){
		if(b.available()){
			if(b.energy()>0 && ById('GEN'+b.id).checked) {
				kk.push({
					id 		: 	b.id,
					energy 	: 	b.energy()
				});
			}
		}
	});	    
	
	for (var y = 0; y < kk.length; y++) {
    	var KnightId = kk[y].id;
    	var KnightEn = kk[y].energy;
    	for (cont = 1; cont <= KnightEn; cont++) {
    		
    		var c = {};
    			c.bid			=	1;
    			c.lid			=	Germania;
    			c.cid			=	CityId;
    			c.kid			=	KnightId;
    			c['u'+TroopsId]	=	1;
    		unsafeWindow.AjaxCall.gPostRequest("battlegroundAttack.php", c, 
      			function(rslt) {
      				TotAttackComp += 1;
      				ById('TottAttackGen').innerHTML = TotAttackComp + '/' + TotAttacks; 
					if(TotAttackComp == TotAttacks) ById('HideStatGen').disabled = false;
      			},
      			function (rslt) {
      				TotErrorComp += 1;
      				ById('TottErrAttackGen').innerHTML = translate('Errores')+': '+TotErrorComp;
      				TotAttackComp += 1;
      				ById('TottAttackGen').innerHTML = TotAttackComp + '/' + TotAttacks; 
					if(TotAttackComp == TotAttacks) ById('HideStatGen').disabled = false;
      			}
      		);
    		
    		
    	}
    }       
  },
       
  UpdateTroops : function (){
  	var t = my.Germ;
  	
  	var cityid = t.AutoAttackCity.id;
  	var TId = ById('TroopsGenAutoAttack').value;
  	var m = parseInt(Cities.byID[cityid].c.troops[TId].count());
  	ById('AmoutTroopsGerm').innerHTML = m;
  },
  getGeneral : function (){
  	var t = my.Germ;
  	var m = '<center><table>';
	var id = t.AutoAttackCity.c.id;
	Cities.byID[id].c.generalsSorted().each(function(b){
			if(b.energy()>0) {
				if(ById('SelAllGen').checked) {
					m+= '<tr><td><input class="'+b.id+'" type="checkbox" id="GEN'+b.id+'" CHECKED></td><td>'+b.name+' '+b.level()+' ('+b.energy()+')</td></tr>';
					ById('StartAttackGen').disabled = false;
				} else {
					m+= '<tr><td><input class="'+b.id+'" type="checkbox" id="GEN'+b.id+'"></td><td>'+b.name+' '+b.level()+' ('+b.energy()+')</td></tr>';
					ById('StartAttackGen').disabled = true;
				}
			} else {
				m+= '<tr><td><input DISABLED class="'+b.id+'" type="checkbox" id="GEN'+b.id+'"></td><td><font color=red>'+b.name+' '+b.level()+' ('+b.energy()+')</font></td></tr>';
			}
	});	
	m+= '</table></center>';
  	ById('GenGerm').innerHTML = m;
  	var Enable = false;
  	Cities.byID[id].c.generalsSorted().each(function(b){
		if(b.available() && b.energy()>0){
			ById('GEN'+b.id).addEventListener ('click', function(){
	 			Cities.byID[id].c.generalsSorted().each(function(b){
					if(b.available() && b.energy()>0){
	 					if(ById('GEN'+b.id).checked) Enable = true;
	 			}});
	 			if(Enable) ById('StartAttackGen').disabled = false;
				else ById('StartAttackGen').disabled = true;
	 		},false);
	 }});
  },

  getSummary : function (){
  	var t = my.Germ;
  	ById('UpdateGerm').disabled = true;
  	t.summary = [""];
  	var c = {};
  	unsafeWindow.AjaxCall.gPostRequest("battlegroundGetSummaryInfo.php", c, 
      function(rslt) {
      	var ff = rslt.data[1];
      	for (k in ff) {
      		var z = ff[k];
      	//	alert(zz);
      		var LocationId = z.locationId;
      		if(LocationId > 1) {
      			var NomeAlleanza = z.allianceName;
      			if(NomeAlleanza == "") NomeAlleanza = uW.arStrings.MarchReport.NoAlliance.toUpperCase();
      			if(NomeAlleanza == uW.arStrings.MarchReport.NoAlliance.toUpperCase()) {
      				var Conq = 0;
      				var Kick = 0;
      			} else {
      				var Time = parseInt(unixTime());
      				var Conq = parseInt(Time - parseInt(z.conqueredUnixtime));
      				if (Conq < 0) Conq = 0;
      				var Kick = parseInt(parseInt(z.kickoutEtaUnixtime) - Time);
      				if (Kick < 0) Kick = 0;
      			}
      			t.summary.push({
      				AllianceName	:	NomeAlleanza,
      				Conquered		:	Conq,
      				KickOut			:	Kick
      			});
      		}
      	t.paint();
      }});
  },
  
  scoutgerm : function (id) {
  	var t = my.Germ;
	var c = {};
		c.bid = 1;
		c.lid = id;
		c.cid = t.selectedCity.c.id;
  	unsafeWindow.AjaxCall.gPostRequest("battlegroundScouting.php", c, 
      function(rslt) {
      		var m = '';
      		var AllianceId = rslt.index.toAllianceId;
      		if(AllianceId != 0)
      			var NameAlliance = rslt.arAllianceNames['a'+AllianceId];
      		var Knight = rslt.details.knght['cbt'];	
      		var Details = rslt.details.unts;
      		m+= uW.arStrings.Common.Alliance+': <b>';
      			if(AllianceId != 0) m+= NameAlliance+'</b><br>';
      			else m+= uW.arStrings.MarchReport.NoAlliance.toUpperCase()+'</b><br>';
      			m+= uW.arStrings.WatchTower.GeneralLevel+': <b>'+Knight+'</b><br><br>';
      			m+= '<b>'+uW.arStrings.Common.Troops+'</b><br>';
      			m+= '<table>';
      		for (k in Details) {
      			m+= '<tr><td>'+uW.arStrings.unitName[k]+': </td><td><b>'+Details[k] + '</b></td></tr>';
      		}
      		m+= '</table>';   		
		 
		 if (t.pop == null){
		 t.pop = new CPopup ('BOScoutGermAlert', 50, 150, 500, 400, true);
                 t.pop.getTopDiv().innerHTML =   '<DIV align=center><h2><B>'+ScriptName+'</B></h2></DIV>'; 
          }
          t.pop.getMainDiv().innerHTML = m;
          t.pop.show (true);
	  },
	  function(rslt){
	  		t.scoutgerm(id);
	  });
  },
  attackgerm : function (id) {
  	var t = my.Germ;
  	var DivX = 400;
  	var DivY = 500;
  	var CityID = t.selectedCity.c.id;
	var m = '<div style="height:'+(DivY-125)+'px; max-height:'+(DivY-125)+'px; overflow-y:auto">';
		m+= '<DIV class=ptstat>'+uW.arStrings.Common.General.toUpperCase()+'</div>';
		m+= '<select id="SelectGeneralGerm">';
		Cities.byID[CityID].c.generalsSorted().each(function(b){
			if(b.available() && b.energy()>0){
				m+= '<option value="'+b.id+'">'+b.name+' '+b.level()+' ('+b.energy()+')</option>';
			}
		});
		m+= '</select>';
		m+= '<DIV class=ptstat>'+uW.arStrings.Common.Troops.toUpperCase()+'</div>';
		m+= '</table><table width=50%>';
		uW.Barracks.allUnitIds.each(function(r){
		if (uW.arStrings.unitName["u"+r]) {
			m+= '<tr><td>'+uW.arStrings.unitName["u"+r]+':</td><td><input type=text id="TroopsAttackGerm'+r+'" value="0" size="3"> ('+uW.arStrings.Common.Max+' '+Cities.byID[CityID].c.troops[r].count()+')</td></tr>';
      	 	}
      	 });
      	m+= '</tr></table>';		
		m+= '<br>';
		m+= '<center><input type=button id="LunchAttackGerm" value="'+uW.arStrings.Common.Attack+'"></center>';
		m+= '</div>';
	if (t.pop == null){
	t.pop = new CPopup ('BOAttackGermAlert', 50, 150, DivY, DivX, true);
		t.pop.getTopDiv().innerHTML =   '<DIV align=center><h2><B>'+ScriptName+'</B></h2></DIV>'; 
	}
	t.pop.getMainDiv().innerHTML = m;
	t.pop.show (true);  
	uW.Barracks.allUnitIds.each(function(r){
		if (uW.arStrings.unitName["u"+r]) {
			if (Cities.byID[CityID].c.troops[r].count() < 1)
			{
				ById('TroopsAttackGerm'+r).disabled = true;
			}
		}
	});
	ById('LunchAttackGerm').addEventListener('click', function() {
		t.pop.show (false);
		var selectedKnight = ById('SelectGeneralGerm').value;
		var b=Cities.byID[CityID].c.generals[selectedKnight];
		var c = {};
			c.bid =	1;
			c.lid =	id;
			c.cid =	CityID;
			c.kid =	selectedKnight;
    		uW.Barracks.allUnitIds.each(function(r){
				if (uW.arStrings.unitName["u"+r]) {
					if (ById('TroopsAttackGerm'+r).value > 0 && ById('TroopsAttackGerm'+r).value <= Cities.byID[CityID].c.troops[r].count()) {
    					c['u'+r] = ById('TroopsAttackGerm'+r).value;
    				}
    			}
    		});
    		uW.AjaxCall.gPostRequest("battlegroundAttack.php", c, 
      			function(rslt) {
      					if(b){b.subtractEnergy();}
      					t.getSummary();
      					var j = rslt.index.bgReportId;
      					uW.Messages.open();
                        uW.Messages.listBattlegroundReports();
                     //   uW.Messages.showReport(j, rslt.details);
      			},
      			function(rslt) {
      				t.attackgerm(id);
      			}
			);
	}, false);
  },
  
  paint : function () {
  	var t = my.Germ;
  	uW.SpyGerm = t.scoutgerm;
  	uW.AttackGerm = t.attackgerm;
  	uW.ShowTroops = t.ShowTroops;
  	uW.ReinGerm = t.ReinGerm;
  	ById('GermaniaStats').innerHTML = "";  	
    var cc = '<table width="100%"><tr>';
	for (var y = 1; y < t.summary.length; y++) {
		var Sum = t.summary[y];
		if(y == 4) cc+= '</tr></table><table><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr></table><table width="100%"><tr>';
		if(y >= 4) var WW = '50%';
		else var WW = (100/3)+'%';
		if (Sum.AllianceName == uW.arStrings.MarchReport.NoAlliance.toUpperCase()) var Color = 'red';
		else if (Sum.AllianceName == getMyAlliance()[1]) var Color = 'green';
		else var Color = '';
		cc+= '<td style="text-align:center; vertical-align:middle;" width="'+WW+'">'+y+': <b><font color="'+Color+'">'+Sum.AllianceName + '</font></b><br>\
																				   '+translate('Para')+': <b>'+timestrShort(Sum.Conquered)+'</b><br>\
																				   '+translate('Salida forzada')+': <b>'+timestrShort(Sum.KickOut)+'</b><br><br>';
																				    if(Sum.AllianceName != getMyAlliance()[1]) { 
																				    	cc+= '<button onclick="SpyGerm('+(y+1)+');" class="button20" type="button"><span>'+uW.arStrings.Common.Scout+'</span></button><br>';
																				   		cc+= '<button onclick="AttackGerm('+(y+1)+');" class="button20" type="button"><span>'+uW.arStrings.Common.Attack+'</span></button></td>';
																				    } else {
																				    	cc+= '<button onclick="ShowTroops('+(y+1)+');" class="button20" type="button"><span>'+uW.arStrings.Common.Troops+'</span></button><br>';
																				    	cc+= '<button onclick="ReinGerm('+(y+1)+');" class="button20" type="button"><span>'+uW.arStrings.Common.Reinforce+'</span></button></td>';
																				    }
	}
	cc+= '</tr></table>';   
	ById('GermaniaStats').innerHTML = cc;  
    ById('UpdateGerm').disabled = false;
  },
  ReinGerm : function (id){
  	var t = my.Germ;
  	var DivX = 400;
  	var DivY = 500;
  	var CityID = t.selectedCity.c.id;
	var m = '<div style="height:'+(DivY-125)+'px; max-height:'+(DivY-125)+'px; overflow-y:auto">';
		m+= '<DIV class=ptstat>'+uW.arStrings.Common.General.toUpperCase()+'</div>';
		m+= '<select id="SelectReinfGeneralGerm">';
		Cities.byID[CityID].c.generalsSorted().each(function(b){
			if(b.available() && b.energy()>0){
				m+= '<option value="'+b.id+'">'+b.name+' '+b.level()+' ('+b.energy()+')</option>';
			}
		});
		m+= '</select>';
		m+= '<DIV class=ptstat>'+uW.arStrings.Common.Troops.toUpperCase()+'</div>';
		m+= '</table><table width=50%>';
		uW.Barracks.allUnitIds.each(function(r){
		if (uW.arStrings.unitName["u"+r]) {
			m+= '<tr><td>'+uW.arStrings.unitName["u"+r]+':</td><td><input type=text id="TroopsReinfGerm'+r+'" value="0" size="3"> ('+uW.arStrings.Common.Max+' '+Cities.byID[CityID].c.troops[r].count()+')</td></tr>';
      	 	}
      	 });
      	m+= '</tr></table>';		
		m+= '<br>';
		m+= '<center><input type=button id="LunchReinfGerm" value="'+uW.arStrings.Common.Reinforce+'"></center>';
		m+= '</div>';
	if (t.pop == null){
	t.pop = new CPopup ('BOReinforceGermAlert', 50, 150, DivY, DivX, true);
		t.pop.getTopDiv().innerHTML =   '<DIV align=center><h2><B>'+ScriptName+'</B></h2></DIV>'; 
	}
	t.pop.getMainDiv().innerHTML = m;
	t.pop.show (true);  
	uW.Barracks.allUnitIds.each(function(r){
		if (uW.arStrings.unitName["u"+r]) {
			if (Cities.byID[CityID].c.troops[r].count() < 1)
			{
				ById('TroopsReinfGerm'+r).disabled = true;
			}
		}
	});
	ById('LunchReinfGerm').addEventListener('click', function() {
		t.pop.show (false);
		var c = {};
			c.bid = 1;
			c.lid = id;
			c.cid = CityID;
			c.kid = ById('SelectReinfGeneralGerm').value;
			uW.Barracks.allUnitIds.each(function(r){
				if (uW.arStrings.unitName["u"+r]) {
					if (ById('TroopsReinfGerm'+r).value > 0 && ById('TroopsReinfGerm'+r).value <= Cities.byID[CityID].c.troops[r].count()) {
						c['u'+r] = ById('TroopsReinfGerm'+r).value;
					}
				}
			});
  		uW.AjaxCall.gPostRequest("battlegroundReinforce.php", c,
			function(rslt) {
				t.ShowTroops(id);
			},
			function(rslt) {
				t.ReinGerm(id);
			}
		 );
	}, false);
  },
  ShowTroops : function (id){
  	var t = my.Germ;
  	uW.RecallTroops = t.RecallTroops;
  	// width, height
  	var DivX = 400;
  	var DivY = 500;
	var c = {};
		c.bid = 1;
		c.lid = id;
  	uW.AjaxCall.gPostRequest("battlegroundGetPointDetails.php", c, 
      function(rslt) {
      	 var m = '<div style="height:'+(DivY-125)+'px; max-height:'+(DivY-125)+'px; overflow-y:auto">';
			 m+= '<center><input type="button" value="'+translate('ACTUALIZAR')+'" id="UpdateShowTroopsGerm"></center><br>';
      	 var Rein = rslt.reinforcements;
      	 for (k in Rein) {
      	 	if (Rein[k].playerName != undefined) {
      	 		var width = parseInt(100/3);
      	 		var Time = parseInt(unixTime());
      	 		var RefID = Rein[k].reinforcementId;
      	 		var CityID = Rein[k].fromCityId;
      	 		m+= '<table width=100%>';
      	 		m+= '<tr>';
      	 		m+= '<td width="'+width+'">'+uW.arStrings.Common.Name+': <b>'+Rein[k].playerName+'</b></td>';
      	 		m+= '<td width="'+width+'">'+uW.arStrings.WatchTower.GeneralLevel+': <b>'+Rein[k].knightLevel+'</b></td>';
      	 		if (Rein[k].playerName == uW.player.name) m+= '<td rowspan="2" width="'+width+'"><button onclick="RecallTroops('+RefID+','+CityID+');" class="button20" type="button"><span>'+uW.arStrings.Common.Recall+' '+uW.arStrings.Common.Troops+'</span></button></td>';
      	 		m+= '</tr><tr>';
      	 		m+= '<td>'+translate('Para')+': <b>'+timestrShort(Time - Rein[k].reinforcementStartUnixtime)+'</b></td>';
      	 		m+= '<td>'+translate('Salida forzada')+': <b>'+timestrShort(Rein[k].reinforcementRecallUnixtime - Time)+'</b></td>';      	 		
      	 		m+= '</tr>';
      	 		m+= '</table><table width=100%><tr>';
      	 		uW.Barracks.allUnitIds.each(function(r){
      	 			if (uW.arStrings.unitName["u"+r]) {
      	 				m+= '<td>'+uW.arStrings.unitName["u"+r]+':</td><td><b>'+Rein[k]['u'+r]+'</b></td><td> &nbsp; &nbsp; &nbsp; &nbsp; </td>';
						if(r==7||r==8||r==31) m+= '</tr><tr>';
      	 			}
      	 		});
      	 		m+= '</tr></table>';
      	 		m+= '<br><br>';
      	 	}
      	 }
      	 m+= '</div>';
		 if (t.pop == null){
		 t.pop = new CPopup ('BoTroopsGerm', 50, 150, DivY, DivX, true);
                 t.pop.getTopDiv().innerHTML =   '<DIV align=center><h2><B>'+ScriptName+'</B></h2></DIV>'; 
          }
          t.pop.getMainDiv().innerHTML = m;
          t.pop.show (true); 
          ById('UpdateShowTroopsGerm').addEventListener('click', function() {
          	t.pop.show (false);
          	t.ShowTroops(id);
          }, false);
      },
      function(rslt) {
      	t.ShowTroops(id);
      }
    );
  },
  
  RecallTroops : function (RefID,CityID){
    var t = my.Germ;
    t.pop.show (false);
	var c = {};
		c.rid = RefID;
		c.cid = CityID;
  	uW.AjaxCall.gPostRequest("battlegroundUndefend.php", c,
  		function(rslt) {
			ById('GermaniaStats').innerHTML = '<center><b>'+translate('espera')+' . . .</b>';
			t.getSummary();   			
  		},
  		function(rslt){
  			t.RecallTroops(RefID,CityID);
  		}
  	);
  },
  
  getContent : function (){
    var t = my.Germ;
    return t.cont;
  },
  hide : function (){ 
  },
  clickCityAutoAttackSelect : function (city){
    var t = my.Germ;
    t.AutoAttackCity = city; 
    t.getGeneral(); 
    t.UpdateTroops();
  },
  clickCitySelect : function (city){
    var t = my.Germ;
    t.selectedCity = city;
  }
}

/************************ AUTO RESEARCH ************************/
my.AutoRes = {
  cont : null,
  timer : null,
  displayTimer : null,

  init : function (){
    var t = my.AutoRes;
    t.cont = document.createElement('div');
    if (AutoResearch.ActiveResearch) t.Start();
    return t.cont;
  },

  getContent : function (){
    var t = my.AutoRes;
    return t.cont;
  },

  show : function (){
    var t = my.AutoRes; 
    clearTimeout (t.displayTimer); 
      try {      
			var m = '<DIV class=ptstat>'+uW.arStrings.UserEngagement.ResearchTitle.toUpperCase()+'</div>';
				m+= '<center><table width="100%">';
				m+= '<tr><td width="70%" style="text-align:center; vertical-align:middle;">';
					m+= '<table width="100%"><tr><td><DIV class=ptstat>'+uW.arStrings.Common.Research+'</div></td>';
					m+= '<td><DIV class=ptstat><center>'+uW.arStrings.BuildingModal.CurrentLevel + '</center></div></td>';
					m+= '<td><DIV class=ptstat><center>'+translate('Hasta el nivel')+'</center></div></td>';
					m+= '<td><DIV class=ptstat><center>'+uW.arStrings.Common.Select+' '+uW.arStrings.Common.City+'</center></div></td></tr>';
					uW.Research.orderedTechIds.each(function (r) {
						if (AutoResearch.EnResearch[r] == undefined) AutoResearch.EnResearch[r] = false;
						if (AutoResearch.SelResearch[r] == undefined) AutoResearch.SelResearch[r] = 9;
						if (AutoResearch.CityResearch[r] == undefined) AutoResearch.CityResearch[r] = 0;

						var q = uW.player.technologies[r].level();
						var f = uW.Research.checkRequirementForLevel(r, q + 1)[3].include(0)
						m+= '<tr><td><input type=checkbox class="'+r+'" id="EnRes'+r+'" '+ (AutoResearch.EnResearch[r]?'CHECKED ':'')+'> '+uW.arStrings.techName["t" + r];
						if (t.otherCityIsResearching(r)) {
							m+= ' <font color=red><i>('+uW.arStrings.OpenAcademy.CurrentlyResearching+')</i></font>';
						}
						m+= '</td><td><center>'+q+'</center></td>';
						m+= '<td><center><select class="'+r+'" id="SelectRes'+r+'">';
						for (var z=1; z <= 10; z++) {
							m+= '<option value="'+z+'" ' + (AutoResearch.SelResearch[r]==z?'SELECTED':'') + '>'+z+'</option>';
						}
						m+= '</select></center></td>';
						m+= '<td><center><select class="'+r+'" id="CityRes'+r+'">';
						for (var c=0; c<Cities.numCities; c++){
							var Ctr = uW.Building.getCountForType(uW.Constant.Building.ACADEMY, Cities.cities[c].c.id);
							if (Ctr > 0) {
								m+= '<option value="'+c+'" ' + (AutoResearch.CityResearch[r]==c?'SELECTED':'') + '>'+Cities.cities[c].c.name+'</option>';
							}
						}
						m+= '</select></center></td>';
						m+= '</tr>';
						//m+= '<tr><td> &nbsp; &nbsp; </td><td> &nbsp; &nbsp; </td></tr>';
					});
					m+= '</table>';
				m+= '</td><td width="30%"><center><br>';
				if (AutoResearch.ActiveResearch) {
          			m+= '<input type=button value="'+translate('AUTO')+' '+uW.arStrings.Common.Research.toUpperCase()+' = ON" id=EnDisAutoRes>';
				} else {
          			m+= '<input type=button value="'+translate('AUTO')+' '+uW.arStrings.Common.Research.toUpperCase()+' = OFF" id=EnDisAutoRes>';
				}
				m+= '<br><br><input type=checkbox id="HelpRes" '+ (AutoResearch.HelpResearch?'CHECKED ':'')+'> '+uW.arStrings.BuildingModal.RequestHelp;
				m+= '</td></tr></table>';
    		t.cont.innerHTML = m;
    		
    		ById("EnDisAutoRes").addEventListener('click', function() { t.ToggleAutoResearch(); }, false);
    		ById("HelpRes").addEventListener('click', function(e) {
				AutoResearch.HelpResearch = ById("HelpRes").checked;
       			saveAutoResearch();
     		}, false);    
     				
    		uW.Research.orderedTechIds.each(function (r) {
    			ById("EnRes"+r).addEventListener('click', function(e) {
					AutoResearch.EnResearch[e.target['className']] = ById("EnRes"+e.target['className']).checked;
       				saveAutoResearch();
     			}, false);
     			
    			ById("SelectRes"+r).addEventListener('change', function(e) {
					AutoResearch.SelResearch[e.target['className']] = ById("SelectRes"+e.target['className']).value;
       				saveAutoResearch();
     			}, false);     			

    			ById("CityRes"+r).addEventListener('change', function(e) {
					AutoResearch.CityResearch[e.target['className']] = ById("CityRes"+e.target['className']).value;
       				saveAutoResearch();
     			}, false);
     			
     		});
    		t.displayTimer = setTimeout (t.show, 60000);
 	} catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
  },
  Start : function (){
  	var t = my.AutoRes;
  	if (AutoResearch.ActiveResearch) {
		uW.Research.orderedTechIds.each(function (r) {
			if (AutoResearch.EnResearch[r] && !Cities.cities[AutoResearch.CityResearch[r]].c.queues.research.active()) {	// Se attiva la ricerca e la città non sta ricercando
				if (!t.otherCityIsResearching(r)) {	// Controllo se la ricerca è già avviata
					var c = r; // ID della Ricerca
					var b = uW.player.technologies[r].level()+1;	// Livello da fare
					if ((uW.player.technologies[r].level()+1) <= AutoResearch.SelResearch[r] || (uW.player.technologies[r].level()+1) <= 10) {
						if (!uW.Research.checkRequirementForLevel(c, b)[3].include(0)) {
							var a = {};
            					a.cid 	=	Cities.cities[AutoResearch.CityResearch[r]].c.id;
            					a.lv	=	b;
            					a.tid	=	c;
            					uW.AjaxCall.gPostRequest("research.php", a, 
            						function (d) {
            							actionLog(translate('Auto')+uW.arStrings.Common.Research,uW.arStrings.Common.Research+': '+uW.arStrings.techName["t" + r]);
										uW.Research.removeResourcesForLevel(c, b);
										uW.Chrome.ResourcesBar.update();
										uW.KTrack.event(["_trackEvent", "Research", c, b, uW.player.level]);
										var z = new uW.KB.Models.QueueSlot.Research({id:0,type: c,target: b,ticker:uW.unixtime(),eta:uW.Research.getResearchTimeForLevel(c, b)+uW.unixtime()});
										Cities.byID[Cities.cities[AutoResearch.CityResearch[r]].c.id].c.queues.research.addSlot(z);
										                    					
										if (AutoResearch.HelpResearch) {
											uW.Research.postHelp(c)
										}
										// uW.Chrome.Queue.Building.select();
									},
									function (d) {
										// actionLog(translate('Auto')+uW.arStrings.Common.Research,'<font color=red>'+translate('ERROR')+': '+uW.arStrings.Common.Research+': '+uW.arStrings.techName["t" + r]+'</font>');
										t.Start();
									}
								);
						} else {	// Non posso ricercare
							if (uW.Research.checkRequirementForLevel(c, b)[3].include(0)) {		// Requisiti non soddisfatti
								actionLog(translate('Auto')+uW.arStrings.Common.Research,'<font color=red>'+translate('ERROR')+': '+uW.arStrings.OpenAcademy.UnableToResearch+'</font>');
							}
						}
					} else {	// Massimo livello raggiunto
						ById('EnRes'+r).checked = false;
						AutoResearch.EnResearch[r] = ById("EnRes"+r).checked;
						saveAutoResearch();
						actionLog(translate('Auto')+uW.arStrings.Common.Research,'<font color=red>'+translate('ERROR')+':'+arStrings.OpenAcademy.MaximumResearchLevel+'</font>');
					}		
					
				} else {	// Ricerca già avviata
					actionLog(translate('Auto')+uW.arStrings.Common.Research,'<font color=red>'+translate('ERROR')+':'+uW.arStrings.OpenAcademy.CurrentlyResearching+'</font>');
				}
			}
  		});
  	t.timer = setTimeout (function(){t.Start();}, 60000);
  	}
  },
  
  otherCityIsResearching : function (a){
  	var t = my.AutoRes;
	var b = false;
        uW.player.allCities().each(function (d) {
            var c = d.queues.research.slot(0);
            if (c && a == c.typeId()) {
                b = true;
            }
        });
        return b
  },
  hide : function (){ 
  	clearTimeout (my.AutoRes.displayTimer);
  },

  ToggleAutoResearch: function() {
	var t = my.AutoRes;
	var obj = ById("EnDisAutoRes");
	if (AutoResearch.ActiveResearch == true) {
		AutoResearch.ActiveResearch = false;
		if (obj) obj.value = translate('AUTO')+' '+uW.arStrings.Common.Research.toUpperCase()+' = OFF';
		saveAutoResearch();
	}  else {
		AutoResearch.ActiveResearch = true;
		if (obj) obj.value = translate('AUTO')+' '+uW.arStrings.Common.Research.toUpperCase()+' = ON';
		saveAutoResearch();
		t.Start();
	}
	DashInnert();
  }
}

/************************ AUTO ATTACK TAB - Modded and Created by Tiestoale ************************/
my.AutoAtt = {
  cont : null,
  timer : null,

  init : function (){
    var t = my.AutoAtt;
    if(AutoAttack.Attivo) setTimeout (function(){t.Start();}, (parseInt(AutoAttack.AttackInterval*1000)));
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    var t = my.AutoAtt;
    return t.cont;
  },

  show : function (){
    var t = my.AutoAtt;
      try {      
		var m = '<DIV class=ptstat>MULTI '+uW.arStrings.Common.Attack.toUpperCase()+'</div>';
			m+= '<table width=100%><tr><td width=80% style="text-align:center; vertical-align:middle;">';
			if (AutoAttack.Attivo) {
          		m+= '<input type=button value="Multi'+uW.arStrings.Common.Attack+' = ON" id=BOAttackTestButton>';
			} else {
          		m+= '<input type=button value="Multi'+uW.arStrings.Common.Attack+' = OFF" id=BOAttackTestButton>';
			}
			m+= '</td></tr></table>';
			m+= '<DIV class=ptstat>'+translate('CONFIGURACION')+'</div><table width=100%><tr>';
			m+= '<td width=50%>'+translate('Tiempo entre los ataques')+": <input type=text size=3 id=BOAttackInterval value='"+ parseInt(AutoAttack.AttackInterval)+"'> "+uW.arStrings.TimeStr.timeSec+'</td>';
			m+= '<td width=50%><input type=checkbox id="AttackGenEn" '+ (AutoAttack.AttackGen?'CHECKED ':'')+'> '+translate('No use el general con un nivel mayor que')+' <input type=text size=3 value="'+AutoAttack.AttackGenNiv+'" id="AttackGenLiv"></td>';
			m+= '</tr><tr>';
			m+= '<td></td>';
			m+= '<td><input type=checkbox id="AttackStopEnd" '+ (AutoAttack.StopCity?'CHECKED ':'')+'> '+translate('Desactivar la ciudad al llegar a la última coordenada')+'</td>';
			m+= '</tr></table><br>';
			m+= '<div style="width:'+Options.WidthTools+'px; max-width:'+Options.WidthTools+'px; height:auto; overflow-x:auto;" id="SlectCoordAutoAtt">';
			m+= '<table><tr>';
			for (var c=0; c<Cities.numCities; c++) {
				if (AutoAttack.MultiCheck[c] == undefined) AutoAttack.MultiCheck[c] = [];
				if (AutoAttack.LastCoord[c] == undefined) AutoAttack.LastCoord[c] = [];
				if (AutoAttack.LastCoord[c].x == undefined) AutoAttack.LastCoord[c].x = "";
				if (AutoAttack.LastCoord[c].y == undefined) AutoAttack.LastCoord[c].y = "";
				if (AutoAttack.Enable[c] == undefined) AutoAttack.Enable[c] = false;
				if (AutoAttack.Mode[c] == undefined) AutoAttack.Mode[c] = "1";
				if (AutoAttack.X[c] == undefined) AutoAttack.X[c] = 0;
				if (AutoAttack.Y[c] == undefined) AutoAttack.Y[c] = 0;
				if (AutoAttack.Multi[c] == undefined) AutoAttack.Multi[c] = "";
				if (AutoAttack.Troops[c] == undefined) AutoAttack.Troops[c] = {};
				uW.Barracks.allUnitIds.each(function(r){
					if (uW.arStrings.unitName["u"+r]) {
						if (AutoAttack.Troops[c][r] == undefined) AutoAttack.Troops[c][r] = 0;
					}
				});
				if (c % 2) style = ''; else style = " style = 'background: #e8e8e8'";
				m+= '<td><DIV class=ptstat><input type=checkbox class="'+c+'" id="CityEn'+c+'" '+ (AutoAttack.Enable[c]?'CHECKED ':'')+'> ' + Cities.cities[c].c.name +'</div><br>'; 
				m+= translate('Modo de ataque')+': <select class="'+c+'" id="BOselectAttackMode'+c+'">';
				m+= '<option value="1" '+ (AutoAttack.Mode[c]=='1'?'SELECTED':'')  +'>Single Coord</option>';
				m+= '<option value="2" '+ (AutoAttack.Mode[c]=='2'?'SELECTED':'')  +'>Multi Coords</option>';
				m+= '</select>';
				m+= '<br><br><br>';
				m+= 'Single Coord: X:<input type=text class="'+c+'" id="TestX'+c+'" size=2 value="'+AutoAttack.X[c]+'">';
				m+= '-Y:<input type=text size=2 class="'+c+'" id="TestY'+c+'" value="'+AutoAttack.Y[c]+'">';
				m+= '<br><br>';
				m+= 'Multi Coords: <i>x,y</i><br>';
     			m+= '<textarea name="coordlist'+c+'" class="'+c+'" id="coordlist'+c+'" value="'+AutoAttack.Multi[c]+'" rows=10 cols=20></textarea><br>';
			}
			m+= '</tr>';
			m+= '</table></div>';
			m+= '<DIV class=ptstat>'+uW.arStrings.Common.Troops+'</div>';
			m+= '<table width=100%>';
			for (var c=0; c<Cities.numCities; c++) {	
				if (c % 2) style = ''; else style = " style = 'background: #e8e8e8'";
				m+= '<tr '+style+'>';		
				m+= '<td style="text-align:center; vertical-align:middle;"><b>'+Cities.cities[c].c.name +":</b></td>";
				uW.Barracks.allUnitIds.each(function(r){
      				if (uW.arStrings.unitName["u"+r]) {
         				m+= '<td style="text-align:center; vertical-align:middle;" width="40px"><div class="pic px30 units unit_'+r+'" title="'+uW.arStrings.unitName["u"+r]+'"></td>\
         					 <td style="text-align:left; vertical-align:middle;"><input class="'+c+'" type=text size=3 id="Troops'+c+r+'" value="'+AutoAttack.Troops[c][r]+'"></td>';
         				if(r==4||r==11) m+= '</tr><tr '+style+'><td></td>';
     				}
     			});
     			m+= '<td colspan="4" style="text-align:center; vertical-align:middle;"><center><input class="'+c+'" type=button id="ResetAll'+c+'" value="'+uW.arStrings.MessagesModal.DeleteAll_button+'"></center></td>';
				m+= '</tr>';
			}
			m+= '</table>';
		
    	t.cont.innerHTML = m; 
    	
    	ById("BOAttackTestButton").addEventListener('click', t.ToggleAutoAttack, false);
    	ById("BOAttackInterval").addEventListener('change',  function() { 
    		if (ById("BOAttackInterval").value<5) ById("BOAttackInterval").value = 5;
    		AutoAttack.AttackInterval = parseInt(ById("BOAttackInterval").value);
    		saveAutoAttack(); 
    	}, false);
    	ById("AttackGenEn").addEventListener('click',  function() {
    		AutoAttack.AttackGen = ById("AttackGenEn").checked;
    		saveAutoAttack(); 
    		if(AutoAttack.Attivo) t.ToggleAutoAttack();
    	}, false);
    	ById("AttackStopEnd").addEventListener('click',  function() {
    		AutoAttack.StopCity = ById("AttackStopEnd").checked;
    		saveAutoAttack(); 
    		if(AutoAttack.Attivo) t.ToggleAutoAttack();
    	}, false);
    	ById("AttackGenLiv").addEventListener('change',  function() {
    		AutoAttack.AttackGenNiv = parseInt(ById("AttackGenLiv").value);
    		saveAutoAttack(); 
    		if(AutoAttack.Attivo) t.ToggleAutoAttack();
    	}, false);
    	
    	for (var c=0; c<Cities.numCities; c++) {
    		ById('coordlist'+c).innerHTML = AutoAttack.Multi[c];
			if(AutoAttack.Mode[c] == 1) {
				ById('TestX'+c).disabled = false;
				ById('TestY'+c).disabled = false;
				ById('coordlist'+c).disabled = true;
			} else {
				ById('TestX'+c).disabled = true;
				ById('TestY'+c).disabled = true;
				ById('coordlist'+c).disabled = false;				
			}
				
			ById("BOselectAttackMode"+c).addEventListener('change', function(e) {
       			AutoAttack.Mode[e.target['className']] = ById("BOselectAttackMode"+e.target['className']).value;
       			saveAutoAttack();
       			if(AutoAttack.Attivo) t.ToggleAutoAttack();
				if(AutoAttack.Mode[e.target['className']] == 1) {
					ById('TestX'+e.target['className']).disabled = false;
					ById('TestY'+e.target['className']).disabled = false;
					ById('coordlist'+e.target['className']).disabled = true;
				} else {
					ById('TestX'+e.target['className']).disabled = true;
					ById('TestY'+e.target['className']).disabled = true;
					ById('coordlist'+e.target['className']).disabled = false;				
				}
     		}, false);  
     		ById("TestX"+c).addEventListener('change', function(e) {
     			if (ById("TestX"+e.target['className']).value < 0) ById("TestX"+e.target['className']).value = 0;
       			AutoAttack.X[e.target['className']] = ById("TestX"+e.target['className']).value;
       			saveAutoAttack();
       			if(AutoAttack.Attivo) t.ToggleAutoAttack();
     		}, false); 
     		ById("TestY"+c).addEventListener('change', function(e) {
     			if (ById("TestY"+e.target['className']).value < 0) ById("TestY"+e.target['className']).value = 0;
       			AutoAttack.Y[e.target['className']] = ById("TestY"+e.target['className']).value;
       			saveAutoAttack();
       			if(AutoAttack.Attivo) t.ToggleAutoAttack();
     		}, false);
    		ById("coordlist"+c).addEventListener('change', function(e) {
       			AutoAttack.Multi[e.target['className']] = ById("coordlist"+e.target['className']).value;
       			saveAutoAttack();
       			if(AutoAttack.Attivo) t.ToggleAutoAttack();
     		}, false); 
     		ById("ResetAll"+c).addEventListener('click', function(e) {
       			t.ResetTroops(e.target['className']);
       			if(AutoAttack.Attivo) t.ToggleAutoAttack();
     		}, false);  
     		uW.Barracks.allUnitIds.each(function(r){
    				ById("Troops"+c+r).addEventListener('change', function(e) {
    					if (uW.arStrings.unitName["u"+r]) {
    						if (ById("Troops"+e.target['className']+r).value < 0) ById("Troops"+e.target['className']+r).value = 0;
       						AutoAttack.Troops[e.target['className']][r] = ById("Troops"+e.target['className']+r).value;
       						saveAutoAttack();
       						if(AutoAttack.Attivo) t.ToggleAutoAttack();
       					}
     				}, false);
			});
     		ById("CityEn"+c).addEventListener('click', function(e) {
       			AutoAttack.Enable[e.target['className']] = ById("CityEn"+e.target['className']).checked;
       			saveAutoAttack();
       			if(AutoAttack.Attivo) t.ToggleAutoAttack();
     		}, false); 
     		   		
    	}
    	
 	} catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
  },
  ResetTroops : function (c){
  	var t = my.AutoAtt;
	uW.Barracks.allUnitIds.each(function(r){
		if (uW.arStrings.unitName["u"+r]) {
			ById('Troops'+c+r).value = 0;
			AutoAttack.Troops[c][r] = 0;
		}
	});
	saveAutoAttack();
  },
  
  // Normalizzazione delle coordinate e salvataggio
  CheckCoord : function (c){
  	var t = my.AutoAtt;
	var counter = 0;
	AutoAttack.MultiCheck[c] = [""];
	var u_koords = AutoAttack.Multi[c].split("\n");
	for (var i = 0; i < u_koords.length; i++) {
		var xy = u_koords[i].split(',');
		var X = parseInt(xy[0],10);
		var Y = parseInt(xy[1],10);
		if (isNaN(X) || isNaN(Y)) continue;
		if (X < 1 || X > 800) continue;
		if (Y < 1 || Y > 800) continue;			
		AutoAttack.MultiCheck[c].push({
			x	:	X,
			y	:	Y
		});
		counter++;
	}
	saveAutoAttack();
	if (counter < 1) {
		alert(translate('Sin coordenadas')+'!!!');  
		return false;
	} else {	
		return true;
	}
  },
  
  hide : function (){ 
  },
  
  Start : function (){
  	var t = my.AutoAtt;
  	if (AutoAttack.Attivo) {
  		for (var c=0; c<Cities.numCities; c++) {
  			saveAutoAttack();
  			if (AutoAttack.Enable[c]){	// Se abilitato
  				if (AutoAttack.Mode[c]=='1') {	// Se Single Coords
					var CooX = AutoAttack.X[c];
					var CooY = AutoAttack.Y[c];
					if(CooX == 0 && CooY == 0) {
						actionLog('Multi'+uW.arStrings.Common.Attack,Cities.cities[c].c.name+': '+translate('Imposible atacar las coordenadas')+' 0,0');
					} else {
						t.SendAttack(c,CooX,CooY);					
					}
  				} else {	// Se Multi Coords
  					if(!t.CheckCoord(c)) return;	// Parse coordinate inserite
  					if (AutoAttack.LastCoord[c].x == "" || AutoAttack.LastCoord[c].y == "") {	// Se non c'è nessuna ultima coordinata
  						var CooX = AutoAttack.MultiCheck[c][1].x;
  						var CooY = AutoAttack.MultiCheck[c][1].y;
  						AutoAttack.LastCoord[c].x = CooX;
  						AutoAttack.LastCoord[c].y = CooY;
  						saveAutoAttack();
  						t.SendAttack(c,CooX,CooY);
  					} else {	// Se è presenta un'ultima coordinata
  						for (var k=1; k <= AutoAttack.MultiCheck[c].length; k++) {	// Controllo delle coordinate per trovare quella corrispondente
  							if (AutoAttack.MultiCheck[c][k].x == AutoAttack.LastCoord[c].x && AutoAttack.MultiCheck[c][k].y == AutoAttack.LastCoord[c].y) {
  								if ((k+1) >= AutoAttack.MultiCheck[c].length) {		// Se l'ultima ricomincia da capo
  									if (AutoAttack.StopCity) {
  										actionLog('Multi'+uW.arStrings.Common.Attack,Cities.cities[c].c.name+': '+translate('Desactivar la ciudad'));
  										AutoAttack.LastCoord[c].x = "";
  										AutoAttack.LastCoord[c].y = "";
  										ById('CityEn'+c).checked = false;
  										AutoAttack.Enable[c] = false;
  										saveAutoAttack();
  									} else {
  										actionLog('Multi'+uW.arStrings.Common.Attack,Cities.cities[c].c.name+': '+translate('Coordenadas de la marmota'));
  										AutoAttack.LastCoord[c].x = "";
  										AutoAttack.LastCoord[c].y = "";
  										saveAutoAttack();
  										// Ricomincio
  									}
  								} else {		// Se NON è l'ultima attacca
  									var CooX = AutoAttack.MultiCheck[c][k+1].x;
  									var CooY = AutoAttack.MultiCheck[c][k+1].y;
									AutoAttack.LastCoord[c].x = CooX;
									AutoAttack.LastCoord[c].y = CooY;  
									saveAutoAttack();		
									t.SendAttack(c,CooX,CooY);						
  								}
  							break;
  							}
  						}
  					
  					}
  				}
  				
  			} else {	// Città non attivata
  				actionLog('Multi'+uW.arStrings.Common.Attack,Cities.cities[c].c.name+': '+translate('Ciudad no activada'));
  			}
  		}
  	}
  	t.timer = setTimeout (function(){t.Start();}, (parseInt(AutoAttack.AttackInterval*1000)));
  },
  
  SendAttack : function (c,CooX,CooY){
  	var t = my.AutoAtt;
    var f=Cities.cities[c].c;
    var id=f.id;

	// Selezione Generale
	var kk=[];
    Cities.byID[id].c.generalsSorted().each(function(b){
    	if (b.available()) {
    		if(AutoAttack.AttackGen && b.level()>parseInt(AutoAttack.AttackGenNiv)) {
        	
        	} else {
        		kk.push(b);
        	}
    	}
    });
    
    var selectedKnight=kk.length>0?kk[0].id:0;
    
    var Controllo = true;
	uW.Barracks.allUnitIds.each(function(r){
		if(AutoAttack.Troops[c][r] > 0){
			if(Cities.byID[id].c.troops[r].count() < AutoAttack.Troops[c][r]){
				Controllo = false;
			}
		}
	});

    
    if (Cities.byID[id].c.canMarch() && Cities.byID[id].c.generalsCount() != 0 && selectedKnight != 0 && Controllo == true) {
 		var d=uW.Building.getMaxLevelForType(50,id);
		var a=new uW.March({marchId:Cities.byID[id].c.emptyMarchSlots()[0],toXCoord:CooX,toYCoord:CooY,fromCityId:id,marchType:uW.Constant.MarchType.ATTACK,knightId:selectedKnight,fromHealLevel:d,apothecaryHealPercent:uW.KB.Controllers.Apothecary.getHealPercent(d),gold:0,resource1:0,resource2:0,resource3:0,resource4:0});
 		var g={mid:a.id,xcoord:a.to.x,ycoord:a.to.y,cid:id,type:uW.Constant.MarchType.ATTACK,kid:a.general.id,gold:a.gold,r1:a.resources[1],r2:a.resources[2],r3:a.resources[3],r4:a.resources[4],camp:0,et:t.calculateTime(id,7,CooX,CooY)};
		var b=Cities.byID[id].c.generals[a.general.id];
		
		// Controllo truppe       		
		uW.Barracks.allUnitIds.each(function(r){
			if(AutoAttack.Troops[c][r] > 0){
				a.units[r].sent = AutoAttack.Troops[c][r];
				g["u"+r] = AutoAttack.Troops[c][r];
			}
		});
        uW.AjaxCall.gPostRequest("march.php",g,
        	function(h){	   
				var i="attack",j=Number(h.eta)-Number(h.initTS);
				uW.Chrome.ResourcesBar.update();
				uW.Object.keys(a.units).each(function(k){Cities.byID[id].c.troops[k].subtract(a.units[k].sent)});
				if(b){b.status=10;b.subtractEnergy()}
				a.id=Number(h.marchId);
				a.to.tileId=Number(h.tileId);
				a.to.tileType=Number(h.tileType);
				a.to.tileLevel=Number(h.tileLevel);
				a.to.playerId=Number(h.tileUserId);
				a.to.cityId=Number(h.tileCityId);
				a.setStatus(uW.Constant.MarchStatus.OUTBOUND);
				a.setMarchTime(unsafeWindow.unixtime(),unsafeWindow.unixtime()+j,0);
				Cities.byID[id].c.marches.outgoing[a.id]=a;
				uW.KTrack.event(["_trackEvent","March",i,uW.player.level]);
				
				actionLog('Multi'+uW.arStrings.Common.Attack,Cities.cities[c].c.name+': '+translate('Enviar el ataque a')+' '+CooX+','+CooY);
				saveAutoAttack();
			},
			function(h){
				// Attacco Fallito
				// actionLog('Multi'+uW.arStrings.Common.Attack,Cities.cities[c].c.name+': <font color=red>'+translate('ERROR')+' '+translate('Enviar el ataque a')+' '+CooX+','+CooY+'</font>');
			}
		);
	} else {
		if (!Controllo) {	// Non disponi delle truppe necessarie
			actionLog('Multi'+uW.arStrings.Common.Attack,'('+CooX+','+CooY+') '+Cities.cities[c].c.name+': <font color=red>'+translate('No tienes las tropas necesarias')+'!!');
		} else {
			if (!Cities.byID[id].c.canMarch()) {	// Non può marciare (ES. Raduno completo)
				actionLog('Multi'+uW.arStrings.Common.Attack,'('+CooX+','+CooY+') '+Cities.cities[c].c.name+': <font color=red>'+translate('No puedes atacar')+'</font>');
			} else {
				if (Cities.byID[id].c.generalsCount() == 0) {	// Nessun generale nominato
					actionLog('Multi'+uW.arStrings.Common.Attack,'('+CooX+','+CooY+') '+Cities.cities[c].c.name+': <font color=red>'+translate('Ningún general designado')+'</font>');
				} else {
					if (selectedKnight == 0) {	// Nessun generale disponibile
						actionLog('Multi'+uW.arStrings.Common.Attack,'('+CooX+','+CooY+') '+Cities.cities[c].c.name+': <font color=red>'+uW.arStrings.March.NoGeneral+'</font>');
					} else {	// Errore sconosciuto
						actionLog('Multi'+uW.arStrings.Common.Attack,'('+CooX+','+CooY+') '+Cities.cities[c].c.name+': <font color=red>'+uW.arStrings.March.NoGeneral+'</font>');
					}
				}
			}
		}
	//	t.UpdateSeed();
		if (AutoAttack.Mode[c]=='2'){
			for (var k=1; k <= AutoAttack.MultiCheck[c].length; k++) {	// Controllo delle coordinate per trovare quella corrispondente
  				if (AutoAttack.MultiCheck[c][k].x == CooX && AutoAttack.MultiCheck[c][k].y == CooY) {
  					if (AutoAttack.MultiCheck[c].length-k < 0) {
						AutoAttack.LastCoord[c].x = "";
						AutoAttack.LastCoord[c].y = "";
						saveAutoAttack();  					
  					} else {
						AutoAttack.LastCoord[c].x = AutoAttack.MultiCheck[c][k-1].x;
						AutoAttack.LastCoord[c].y = AutoAttack.MultiCheck[c][k-1].y;
						saveAutoAttack();  					
  					}
  				break;
  				}
  			}
  		}
	}
  },
  
  UpdateSeed : function () {
  	var t = my.AutoAtt;
	var c = {};
	c.forceUpdate = true;
	uW.AjaxCall.gPostRequest("updateSeed.php", c, 
		function (d) {
		}
	);
  },
   
  calculateTime: function(id,b,g,e) {
  	var c=65535,a=Math.abs(Cities.byID[id].c.x-g),f=Math.abs(Cities.byID[id].c.y-e),d=Math.sqrt((a*a)+(f*f));
	h=uW.Unit.stats[b].speed*1;
  	if(h<c){c=h;}
  	return Math.ceil(d*6000/c)+30;
  },
  
  ToggleAutoAttack: function() {
	var t = my.AutoAtt;
	var obj = ById("BOAttackTestButton");
	if (AutoAttack.Attivo == true) {
		AutoAttack.Attivo = false;
		if (obj) obj.value = 'Multi'+uW.arStrings.Common.Attack+' = OFF';
		for (var c=0; c<Cities.numCities; c++) {
			AutoAttack.MultiCheck[c] = [""];
			AutoAttack.LastCoord[c].x = "";
			AutoAttack.LastCoord[c].y = "";
		}
		saveAutoAttack();
	}  else {
		AutoAttack.Attivo = true;
		if (obj) obj.value = 'Multi'+uW.arStrings.Common.Attack+' = ON';
		for (var c=0; c<Cities.numCities; c++) {
			AutoAttack.MultiCheck[c] = [""];
			AutoAttack.LastCoord[c].x = "";
			AutoAttack.LastCoord[c].y = "";
		}
		saveAutoAttack();
		t.Start();
	}
	DashInnert();
  }
  
}

/************************ GIFTS ************************/
my.KDO = {
  cont : null,
  state : null,
  displayTimerKDO:null,
  displayTimerAcceptKDO:null,
  init : function (div){
    var t = my.KDO;
    this.cont = document.createElement('div');
    return t.cont;
  },
  

  getContent : function (){
    var t = my.KDO;
    return t.cont;
  },

  hide : function (){
    var t = my.KDO;
  },
  nbitem: function(id) {
   var nb=0;
   if (unsafeWindow.items[id].count>0){
     nb=unsafeWindow.items[id].count;
   }else{
     nb=0;
   }
   return nb;
  },
  show : function (){ 
    var t = my.KDO;
    
     if (t.state == null){
    m='<div id="presentModalWrapper1" class="presentWrapper"><div class=header style="height:280px"><h1>'+uW.arStrings.Gift.ModalHeader+'</h1><ul id="presentList1" class="clearfix">\
<li class="unlocked"><div class="frame"><div class="item pic px70 items item_1005"></div></div><button class="button25" onclick="KB.Views.Gift.popupInvite(1005);"><span>'+uW.arStrings.Common.Send_button+'</span></button><button id="BOItem1005" class="button25" type="button"><span>'+uW.arStrings.Common.Use_button+'</span></button><div class="itemowned">'+uW.arStrings.Common.youOwn+': <span class="modal_itemowned_923" id="BONbItem1005">'+ t.nbitem(1005) +'</span></div></li>\
<li class="unlocked"><div class="frame"><div class="item pic px70 items item_1015"></div></div><button class="button25" onclick="KB.Views.Gift.popupInvite(1015);"><span>'+uW.arStrings.Common.Send_button+'</span></button><button id="BOItem1015"  class="button25" type="button"><span>'+uW.arStrings.Common.Use_button+'</span></button><div class="itemowned">'+uW.arStrings.Common.youOwn+': <span class="modal_itemowned_923" id="BONbItem1015">'+ t.nbitem(1015) +'</span></div></li>\
<li class="unlocked"><div class="frame"><div class="item pic px70 items item_1025"></div></div><button class="button25" onclick="KB.Views.Gift.popupInvite(1025);"><span>'+uW.arStrings.Common.Send_button+'</span></button><button id="BOItem1025"  class="button25" type="button"><span>'+uW.arStrings.Common.Use_button+'</span></button><div class="itemowned">'+uW.arStrings.Common.youOwn+': <span class="modal_itemowned_923" id="BONbItem1025">'+ t.nbitem(1025) +'</span></div></li>\
<li class="unlocked"><div class="frame"><div class="item pic px70 items item_1035"></div></div><button class="button25" onclick="KB.Views.Gift.popupInvite(1035);"><span>'+uW.arStrings.Common.Send_button+'</span></button><button id="BOItem1035"  class="button25" type="button"><span>'+uW.arStrings.Common.Use_button+'</span></button><div class="itemowned">'+uW.arStrings.Common.youOwn+': <span class="modal_itemowned_923" id="BONbItem1035">'+ t.nbitem(1035) +'</span></div></li>\
<li class="unlocked"><div class="frame"><div class="item pic px70 items item_1045"></div></div><button class="button25" onclick="KB.Views.Gift.popupInvite(1045);"><span>'+uW.arStrings.Common.Send_button+'</span></button><button id="BOItem1045"  class="button25" type="button"><span>'+uW.arStrings.Common.Use_button+'</span></button><div class="itemowned">'+uW.arStrings.Common.youOwn+': <span class="modal_itemowned_923" id="BONbItem1045">'+ t.nbitem(1045) +'</span></div></li>\
</ul></div>\
<br><button onclick="Temple.Offering.askForOffering(); return false;" class="button25" type="button" id="askButton"><span>'+uW.arStrings.MainChrome.SendOfferings+'</span></button><br>\
<br><br><button  id="BOAcceptAllKDO" class="button25" type="button"><span>'+uW.arStrings.Gift.ButtonAcceptAll+'</span></button><br><br><hr><b><center>'+translate('Por favor, apoye la GoR BoTTols haciendo clic en los anuncios en el sitio web de GoR BoTTols de vez en cuando')+'!</center></b></div>';
    
t.cont.innerHTML = m;

  
document.getElementById('BOAcceptAllKDO').addEventListener ('click', function(){
      document.getElementById('BOAcceptAllKDO').disabled=true;
       uW.AjaxCall.gNetworkPostRequest("requests","getRequest.php",{typeRequest:1},function(m){
         if (m.ok){
           var NameGift = uW.arStrings.Common.Gift;
           var v=unsafeWindow.Object.keys(m.data.requests);
           unsafeWindow.KB.Views.Cohort.pending = m.data.requests;
      
           for(var f=0;f<v.length;f++){
            
            
            var d=m.data.requests[v[f]][1]; // item
            var b=v[f]; //request_id
            var c={request_id:b , type_request:1, item_id: d, sender_fbuid:m.data.requests[v[f]][0]};
            uW.AjaxCall.gNetworkPostRequest("requests","acceptRequest.php",c,function(e){
             if (e.ok) {
              unsafeWindow.items[d].add(1);
              delete unsafeWindow.KB.Views.Gift.request[b];
             }
            },function(e) {}, true);
           }
           actionLog(uW.arStrings.Common.Gift,uW.arStrings.Gift.ButtonAcceptAll);
          }
          document.getElementById('BOAcceptAllKDO').disabled=false;  
       });
   },false);	

   // Bouton utiliser Stones	      
   document.getElementById("BOItem1035").addEventListener ('click', function(){
    if (t.nbitem(1035)>0) {
     var b={iid:1035,cid:unsafeWindow.currentCity.id};
     unsafeWindow.AjaxCall.gPostRequest("resourceCrate.php",b,function(d){
      if (d.ok) {
       unsafeWindow.KB.Models.Resource.addToSeed(d.rtype,d.amt);
       unsafeWindow.items[1035].subtract();
       document.getElementById("BONbItem1035").innerHTML=t.nbitem(1035);    
      }
     }, function(d) {});
    }
   },false);
      // Bouton utiliser Iron	      
      document.getElementById("BOItem1045").addEventListener ('click', function(){
       if (t.nbitem(1045)>0) {
        var b={iid:1045,cid:unsafeWindow.currentCity.id};
        unsafeWindow.AjaxCall.gPostRequest("resourceCrate.php",b,function(d){
         if (d.ok) {
         unsafeWindow.KB.Models.Resource.addToSeed(d.rtype,d.amt);
         unsafeWindow.items[1045].subtract();
         document.getElementById("BONbItem1045").innerHTML=t.nbitem(1045);
         }
          }, function(d) {});
       }
   },false);
   // Bouton utiliser Wood	      
         document.getElementById("BOItem1025").addEventListener ('click', function(){
          if (t.nbitem(1025)>0) {
           var b={iid:1025,cid:unsafeWindow.currentCity.id};
           unsafeWindow.AjaxCall.gPostRequest("resourceCrate.php",b,function(d){
            if (d.ok) {
            unsafeWindow.KB.Models.Resource.addToSeed(d.rtype,d.amt);
            unsafeWindow.items[1025].subtract();
            document.getElementById("BONbItem1025").innerHTML=t.nbitem(1025);
            }
             }, function(d) {});
          }
   },false);
      // Bouton utiliser Food	      
            document.getElementById("BOItem1015").addEventListener ('click', function(){
             if (t.nbitem(1015)>0) {
              var b={iid:1015,cid:unsafeWindow.currentCity.id};
              unsafeWindow.AjaxCall.gPostRequest("resourceCrate.php",b,function(d){
               if (d.ok) {
               unsafeWindow.KB.Models.Resource.addToSeed(d.rtype,d.amt);
               unsafeWindow.items[1015].subtract();
               document.getElementById("BONbItem1015").innerHTML=t.nbitem(1015);
               }
                }, function(d) {});
             }
   },false);
      // Bouton utiliser Silver	      
            document.getElementById("BOItem1005").addEventListener ('click', function(){
             if (t.nbitem(1005)>0) {
              var b={iid:1005,cid:unsafeWindow.currentCity.id};
              unsafeWindow.AjaxCall.gPostRequest("resourceCrate.php",b,function(d){
               if (d.ok) {
               unsafeWindow.KB.Models.Resource.addToSeed(d.rtype,d.amt);
               unsafeWindow.items[1005].subtract();
               document.getElementById("BONbItem1005").innerHTML=t.nbitem(1005);
               }
                }, function(d) {});
             }
   },false);
   
   
	          
    c={};
    
    unsafeWindow.AjaxCall.gNetworkPostRequest("requests","getFriendsGift.php",c,function(e){
     unsafeWindow.KB.Views.Gift.friends=e.data.friends?e.data.friends:{};
     unsafeWindow.KB.Views.Gift.potentials=e.data.potentials?e.data.potentials:{};
     unsafeWindow.KB.Views.Gift.cohorts=e.data.cohorts?e.data.cohorts:{};
     unsafeWindow.KB.Views.Gift.lockGift=e.data.lockedItems?e.data.lockedItems:{};
     unsafeWindow.KB.Views.Gift.sortLockGift();
     unsafeWindow.KB.Views.Gift.unlockGift=e.data.newUnlockItems?e.data.newUnlockItems:{};
     unsafeWindow.KB.Views.Gift.user=e.data.user?e.data.user:0;    
     var f={typeRequest:unsafeWindow.KB.Views.Gift.TYPE_REQUEST_GIFT};

      
    });
    
    
     t.state = 1;
    }
    
    document.getElementById("BONbItem1045").innerHTML=t.nbitem(1045);  
    document.getElementById("BONbItem1035").innerHTML=t.nbitem(1035);  
    document.getElementById("BONbItem1025").innerHTML=t.nbitem(1025);  
    document.getElementById("BONbItem1015").innerHTML=t.nbitem(1015); 
    document.getElementById("BONbItem1005").innerHTML=t.nbitem(1005); 
        
    t.displayTimer = setTimeout (t.show, parseInt(GlobalOptions.BOAutomateKDOsec*1000));
    
    
  },
  togOpt : function (checkboxId, optionName, callOnChange){
      var t = my.Options;
      var checkbox = document.getElementById(checkboxId);
      if (Options[optionName])
        checkbox.checked = true;
      checkbox.addEventListener ('change', eventHandler, false);
      function eventHandler (){
        Options[optionName] = this.checked;
        saveOptions();
        if (callOnChange)
          callOnChange (this.checked);
      }
    },
    
    changeOpt : function (valueId, optionName, callOnChange){
      var t = my.Options;
      var e = document.getElementById(valueId);
      e.value = Options[optionName];
      e.addEventListener ('change', eventHandler, false);
      function eventHandler (){
        Options[optionName] = this.value;
        saveOptions();
        if (callOnChange)
          callOnChange (this.value);
      }
    }
}

/************************ INFO ************************/
my.Marks = {
  cont : null,
  state : null,

  init : function (div){
    var t = my.Marks;
    this.cont = document.createElement('div');
    return t.cont;
  },
  

  getContent : function (){
    var t = my.Marks;
    return t.cont;
  },

  hide : function (){
    var t = my.Marks;
  },

  show : function (){ 
    var t = my.Marks;
    
   
	var auguste,tiberus,caligula,claude,vespasien;
	if (unsafeWindow.items[1101].count>0){auguste=unsafeWindow.items[1101].count}else{auguste=0};
	if (unsafeWindow.items[1102].count>0){tiberus=unsafeWindow.items[1102].count}else{tiberus=0};
	if (unsafeWindow.items[1103].count>0){caligula=unsafeWindow.items[1103].count}else{caligula=0};
	if (unsafeWindow.items[1104].count>0){claude=unsafeWindow.items[1104].count}else{claude=0};
	if (unsafeWindow.items[1105].count>0){vespasien=unsafeWindow.items[1105].count}else{vespasien=0};
if (unsafeWindow.items[1106].count>0){titus=unsafeWindow.items[1106].count}else{titus=0};
if (unsafeWindow.items[1107].count>0){Domitien=unsafeWindow.items[1107].count}else{Domitien=0};
if (unsafeWindow.items[1108].count>0){Trajan=unsafeWindow.items[1108].count}else{Trajan=0};
if (unsafeWindow.items[1109].count>0){Hadrien=unsafeWindow.items[1109].count}else{Hadrien=0};

	if (Cities.cities[1]){ville2="#99EE99";}else{ville2="#EE9999";}
	if (Cities.cities[2]){ville3="#99EE99";}else{ville3="#EE9999";}
	if (Cities.cities[3]){ville4="#99EE99";}else{ville4="#EE9999";}
   	if (Cities.cities[4]){ville5="#99EE99";}else{ville5="#EE9999";}
   	if (Cities.cities[5]){ville6="#99EE99";}else{ville6="#EE9999";}
   if (t.state == null){
    
var m = '<style>CAPTION.MYTABLE  {background-color:eeffff;color:black;     border-style:solid;     border-width:1px;     border-color:black;  }\
  TABLE.MYTABLE  {font-family:arial;border-collapse:collapse;font-size:12pt;background-color:F5F5F5;width:100%;border-style:solid;border-color:black;border-width:1px;  }\
  TH.MYTABLE  {font-size:12pt;color:black;text-align:center;border-style:solid;border-color:black;border-width:1px;  }\
  TR.MYTABLE  {  }\
  TD.MYTABLE  {font-size:12pt;background-color:FFFFE5;color:black;border-style:solid;border-width:1px;text-align:left;}</style>\
<DIV class=ptstat>'+uW.arStrings.Common.Troops.toUpperCase()+'</div><TABLE align=center CLASS="MYTABLE" cellpadding=4 cellspacing=0><tr><td>'+uW.arStrings.Common.Troops+'</td><td>'+uW.arStrings.Common.Glory+'</td><td>'+uW.arStrings.Troops.Life+'</td><td>'+uW.arStrings.Common.Attack+'</td><td>'+uW.arStrings.Troops.Defense+'</td><td>'+uW.arStrings.Troops.Speed+'</td><td>'+uW.arStrings.Troops.Range+'</td><td>'+uW.arStrings.Troops.Load+'</td><td>'+uW.arStrings.Common.UpKeep+'</td></tr>';

var unitmight={u1:"1",u2:"1",u4:"3",u5:"6",u6:"3",u7:"3",u8:"6",u9:"3",u10:"6",u11:"5",u12:"12",u31:"50",u32:"50"};
var unitupkeeps={"1":2,"2":3,"3":5,"4":9,"5":35,"6":9,"7":9,"8":35,"9":10,"10":35,"11":50,"12":100,"31":65,"32":65};
 uW.Barracks.allUnitIds.each(function(nbu){
 if (uW.arStrings.unitName["u"+nbu]) {
 m+="<tr><td>"+uW.arStrings.unitName["u"+nbu]+"</td>";
 m+="<td>"+unitmight["u"+nbu]+"</td>";
 m+="<td>"+uW.Unit.stats[nbu].life+"</td>";
 m+="<td>"+uW.Unit.stats[nbu].attack+"</td>";
 m+="<td>"+uW.Unit.stats[nbu].defense+"</td>";
 m+="<td>"+uW.Unit.stats[nbu].speed+"</td>";
 m+="<td>"+uW.Unit.stats[nbu].range+"</td>";
 m+="<td>"+uW.Unit.stats[nbu].load+"</td>";
 m+="<td>"+unitupkeeps[nbu]+"</td>";
 m+="</tr>";
 
 }
});

m +='</table><br><TABLE CLASS="MYTABLE" CELLPADDING=3 CELLSPACING=0 align=center>\
    <CAPTION CLASS="MYTABLE"><DIV class=ptstat>'+uW.arStrings.ShowAddCityToolTip.AddCities.toUpperCase()+'</div></CAPTION>\
    <THEAD >\
      <TR CLASS="MYTABLE">\
        <TH CLASS="MYTABLE">'+uW.arStrings.Common.Cities+'</TH>\
        <TH CLASS="MYTABLE">'+uW.arStrings.Common.Requirements+'</TH>\
      </TR>\
    </THEAD>\
    <TBODY>\
      <TR CLASS="MYTABLE">\
        <TD CLASS="MYTABLE" style="background-color:'+ville2+';"><b><center>'+uW.arStrings.Common.City+' 2</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville2+';">'+uW.arStrings.Common.Level+' 7 ('+uW.arStrings.Common.YourLevel+' : ' + uW.player.level + ')\
        <br>'+uW.arStrings.UserEngagement.CohortTitle+'</TD>\
      </TR>\
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE" style="background-color:'+ville3+';"><b><center>'+uW.arStrings.Common.City+' 3</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ ( (auguste>=10 && tiberus>=5 && caligula>=2)?"#99EE99":ville3 ) +';">'+auguste+' / 10 '+unsafeWindow.arStrings.itemName["i1101"]+'<br>'+tiberus+' / 5 '+unsafeWindow.arStrings.itemName["i1102"]+'<br>'+caligula+' / 2 '+unsafeWindow.arStrings.itemName["i1103"]+'</TD>\
      </TR>\
            <TR CLASS="MYTABLE">  \
              <TD CLASS="MYTABLE" style="background-color:'+ville4+';"><b><center>'+uW.arStrings.Common.City+' 4</TD>\
              <TD CLASS="MYTABLE" style="background-color:'+ ( (auguste>=20 && tiberus>=15 && caligula>=9)?"#99EE99":ville4 ) +';">'+auguste+' / 20 '+unsafeWindow.arStrings.itemName["i1101"]+'\
              <br>'+tiberus+' / 15 '+unsafeWindow.arStrings.itemName["i1102"]+'\
              <br>'+caligula+' / 9 '+unsafeWindow.arStrings.itemName["i1103"]+'\
              <br>'+claude+' / 4 '+unsafeWindow.arStrings.itemName["i1104"]+'\
              <br>'+vespasien+' / 2 '+unsafeWindow.arStrings.itemName["i1105"]+'\
              </TD>\
      </TR>\
            </TR>\
                  <TR CLASS="MYTABLE">  \
                    <TD CLASS="MYTABLE" style="background-color:'+ville5+';"><b><center>'+uW.arStrings.Common.City+' 5</TD>\
                    <TD CLASS="MYTABLE" style="background-color:'+ ( (caligula>=20 && claude>=15 && vespasien>=9 && titus>=4 && Domitien>=2)?"#99EE99":ville5 ) +';">'+caligula+' / 20 '+unsafeWindow.arStrings.itemName["i1103"]+'\
                    <br>'+claude+' / 15 '+unsafeWindow.arStrings.itemName["i1104"]+'\
                    <br>'+vespasien+' / 9 '+unsafeWindow.arStrings.itemName["i1105"]+'\
                    <br>'+titus+' / 4 '+unsafeWindow.arStrings.itemName["i1106"]+'\
                    <br>'+Domitien+' / 2 '+unsafeWindow.arStrings.itemName["i1107"]+'\
                    </TD>\
      </TR>\
          </TR>\
            </TR>\
                  <TR CLASS="MYTABLE">  \
                    <TD CLASS="MYTABLE" style="background-color:'+ville6+';"><b><center>'+uW.arStrings.Common.City+' 6</TD>\
                    <TD CLASS="MYTABLE" style="background-color:'+ ( (caligula>=20 && claude>=15 && vespasien>=9 && titus>=4 && Domitien>=2)?"#99EE99":ville6 ) +';">'+caligula+' / 20 '+unsafeWindow.arStrings.itemName["i1103"]+'\
                    <br>'+claude+' / 15 '+unsafeWindow.arStrings.itemName["i1104"]+'\
                    <br>'+vespasien+' / 9 '+unsafeWindow.arStrings.itemName["i1105"]+'\
                    <br>'+titus+' / 4 '+unsafeWindow.arStrings.itemName["i1106"]+'\
                    <br>'+Domitien+' / 2 '+unsafeWindow.arStrings.itemName["i1107"]+'\
                    </TD>\
      </TR>\
    </TBODY>\
  </TABLE>';

      t.cont.innerHTML = m;
      t.state = 1;
    }
  }

}

/************************ GOLD COLLECTOR ************************/
var CollectGold = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++)
      t.lastCollect['c'+ Cities.cities[c].c.id] = 0;
    if (Options.pbGoldEnable)
      t.setEnable (true);
  },
  
  setEnable : function (tf){
    var t = CollectGold;
    clearTimeout (t.timer);
    if (tf)
      t.tick();
  },

  colCityName : null,
  colHappy : 0,  
  tick : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++){
      var city = Cities.cities[c];
      var since = unixTime() - t.lastCollect['c'+city.c.id];
      if (since>15*60 && city.c.population.happiness()>=Options.pbGoldHappy){
        t.lastCollect['c'+city.c.id] = unixTime();
        t.colCityName = city.c.name;
        t.ajaxCollectGold (city.c, t.e_ajaxDone); 
        break;
      }
    }
    t.timer = setTimeout (t.tick, 60000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectGold;
  },
  
  ajaxCollectGold : function (city, notify){
    var c={};
    c.cid=city.id;
    c.eventid=1;
    unsafeWindow.AjaxCall.gPostRequest("coliseumEvent.php",c,
    function(rslt){
       if (notify)  
        notify (rslt);
      }, function (rslt) {
        if (notify)  
          notify (rslt);
      }
    );
  }
}

/************************ RESOURCES COLLECTOR ************************/
var CollectRessource = {
	lastCollect : {},
	minuteTimer : null,
	
  init : function (){
    var t = CollectRessource;
    for (var c=0; c<Cities.numCities; c++)
    t.lastCollect['c'+ Cities.cities[c].c.id] = 0;
    t.tick();
  },

  tick : function (){
		var t = CollectRessource;
		if (t.minuteTimer != null && Options.pbRessEnable) {
			for (var c=0; c<Cities.numCities; c++){
					var cityid = Cities.cities[c].c.id;
					var since = unixTime() - t.lastCollect['c'+cityid];
					if (since>(Options.pbRessTime*60)){
					t.lastCollect['c'+cityid] = unixTime();
					t.ajaxCollectRessource(c,cityid);
   			 		}
			}
		}
    	t.minuteTimer = setTimeout (t.tick, (Options.pbRessTime*60)*1000);
  },
  
  ajaxCollectRessource : function (ff, city){
  	var t = CollectRessource;
    var c={};
    c.cid=city;
    unsafeWindow.AjaxCall.gPostRequest("collectResource.php",c,
    function(rslt){
    		actionLog(translate('Recolectar')+' '+uW.arStrings.Common.Resources,Cities.cities[ff].c.name+': '+translate('Recolectar')+' '+uW.arStrings.Common.Resources); 
    }, 
    function (rslt) {
		actionLog(translate('Recolectar')+' '+uW.arStrings.Common.Resources,Cities.cities[ff].c.name+': <font color=red>'+translate('ERROR')+' '+translate('Recolectar')+' '+uW.arStrings.Common.Resources+'</font>');
		setTimeout (function (){t.ajaxCollectRessource(ff, city);}, 5000);
    });
  }
}

/************************ AUTO REFRESH GOR ************************/
var RefreshEvery  = {
  timer : null,
  PaintTimer : null,
  NextRefresh : 0,
  target : null,
  
  init : function (){
    var t = RefreshEvery;
	t.creatediv();
	if (Options.pbEveryMins < 1)
        Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  
  creatediv : function(){
    var t = RefreshEvery;
	t.target = document.getElementById('comm_tabs');
	if(t.target == null){
		setTimeout(t.creatediv, 2000);
		return;
	}
  },
  
  setEnable : function (tf){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (tf) {
      //t.timer = setTimeout (t.doit, Options.pbEveryMins*60000);
      t.NextRefresh = unixTime() + (Options.pbEveryMins*60); 
      t.timer = setTimeout (t.Paint, 5000);
    } else {
        //t.PaintTimer = null;
        if (ById('TabReloadDiv')) ById('TabReloadDiv').innerHTML = "";
		t.timer = null;
		t.NextRefresh = 0;
	}
  },
  
  setTimer : function (){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (Options.pbEveryMins < 1) Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  
  Paint : function(){
     var t = RefreshEvery;
	 if(t.timer == null) return;
     var now = unixTime();
     var text = '';
     var Left = parseInt(t.NextRefresh - now);
     if ( Left <= 0){
		Left = 0;
		reloadKOC();
	 }
 //    if ( Left < 60) ById('TabReloadDiv').innerHTML = '<FONT size="20px" color="red"><B><span id=BOTaTim>'+ timestr(Left) +'</span>';
 //    else ById('TabReloadDiv').innerHTML = '<font size="20px"><span id=BOTaTim>'+ timestr(Left) +'</span></span>';
 	 ById('TabReloadDiv').innerHTML = '<font color=white><b>( '+ timestr(Left) +' )</b></font>';
    
//	 t.box.innerHTML = text;
	 
//	document.getElementById('BOTaref').addEventListener ('click', t.doit, false);
//	ById('BOTaTim').addEventListener ('click', function() { t.setEnable(true); }, false);
     t.timer = setTimeout (t.Paint, 5000);
  }
}
function reloadKOC (){
  var serverId = getServerId();
  if(serverId == '??') window.location.reload(true);
  var go_to = window.location.protocol+'//apps.facebook.com/gloryofrome/?s='+serverId;
  var t = '<FORM target="_top" action="'+ go_to +'" method=post><INPUT id=xxpbButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ serverId +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  actionLog(translate('Volver a cargar'),translate('Volver a cargar')+' '+translate('Ahora')+'!');
  setTimeout (function (){ById('xxpbButReload').click();}, 0);
}

/************************ NEWS ************************/
my.News = {
  cont : null,
  timer : null,
  News : null,

  init : function (){
    var t = my.News;
    t.cont = document.createElement('div');
    if (parseInt(Options.Lingua) != 0) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://gamespowerita.com/Tools/GoR/Plugins/News/GoRNews.txt',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			onload: function (news) {
				t.News = news;
				var first = Number(news.responseHeaders.indexOf("Last-Modified"))+15;
				var last = news.responseHeaders.indexOf("\n",first);
				var lastmodified = news.responseHeaders.slice(first,last);
				if (Options.BreakingNews != lastmodified) {
					Options.BreakingNews=lastmodified;
					saveOptions();
					alert('News update, '+lastmodified+' check News tab');
					if (Options.ptWinIsOpen) {
						ById('aaNews').click();
					} else {
						ById('BoTTols').click();
						ById('aaNews').click();
					}
				}
			}
		});
	}
    return t.cont;
  },

  getContent : function (){
    var t = my.News;
    return t.cont;
  },

  show : function (){
    var t = my.News;   
      try { 
		var m = '<DIV class=ptstat>'+translate('NOTICIAS')+'!</div><br>';
		if(t.News.status != 200) {
			m += '<center><div style="background-color:#DEDEDE; width:600px; height:200px; text-align:left; overflow-y:auto;"><b>Unable to fetch news <br>Error: '+t.News.status+'</b></div></center>';
			return;
		}
		m += '<center>';
		m += '<div style="background-color:#DEDEDE; width:600px; height:200px; text-align:left; overflow-y:auto;">';
		m += '<DIV id="newsdate"></div>';
		m += '<b>'+t.News.responseText.replace(/\n/g,"<br>")+'</b>';
		m += '</div></center>';
		t.cont.innerHTML = m;
		ById('newsdate').innerHTML = '<p style="text-align: right;">'+Options.BreakingNews+'</p>';
 	} catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
  },
  
  hide : function (){ 
  }
  
}

/************************ IMPORT / EXPORT ************************/
my.ImpExp = {
  cont : null,
  timer : null,
  Data : {Options:{}},

  init : function (){
    var t = my.ImpExp;
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    var t = my.ImpExp;
    return t.cont;
  },

  show : function (){
    var t = my.ImpExp;   
      try {      
			var m = '<div class="ptstat">IMPORT/EXPORT</div>';
				m+= '<center><input type="submit" value="'+translate('Export')+' '+translate('Opciones')+'" id="pbExportOptions"> - <input type="submit" value="'+translate('Import')+' '+translate('Opciones')+'" id="pbImportOptions">';
				m+= '<br><input type="submit" value="'+translate('Export')+' Auto'+uW.arStrings.Common.Train+'" id="pbExportTrain"> - <input type="submit" value="'+translate('Import')+' Auto'+uW.arStrings.Common.Train+'" id="pbImportTrain">';
				m+= '<br><textarea type="text" id="pbTextData" rows=20 cols=80></textarea>';
				m+= '<br><input type="submit" value="'+uW.arStrings.MessagesModal.Delete_button+'" id="pbClearTextData">';
				m+= '</center>';
    t.cont.innerHTML = m; 
    
    ById('pbExportOptions').addEventListener('click', t.ExportOptions, false);
    ById('pbImportOptions').addEventListener('click', t.ImportOptions, false);
    ById('pbClearTextData').addEventListener('click', t.ClearArea, false);
    
 	} catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
  },
  
  ClearArea : function (){
  	var t = my.ImpExp;
  	ById('pbTextData').value = "";
  },
  
  ImportOptions : function (){
  	var t = my.ImpExp;
  	var serverID = getServerId();
  	var Data = JSON2.parse(ById('pbTextData').value);
  	if (Data.Options != {}) Options = Data.Options;
    	saveOptions();
    
    reloadKOC();
  },
  
  ExportOptions : function (){
  	var t = my.ImpExp;
  	var serverID = getServerId();
  	t.Data.Options = Options;
  	ById('pbTextData').value = JSON2.stringify(t.Data);
	// document.getElementById('pbImportData').select();
  },
  
  hide : function (){ 
  }
  
}

/************************ DASHBOARD ************************/
my.Dash = {
  cont : null,
  timer : null,

  init : function (){
    var t = my.Dash;
    if (Options.EnableDash && parseInt(Options.Lingua) != 0) {
    	createDashboard();
		DashInnert();
	}
    ById('aaDash').style.display="none";
    t.cont = document.createElement('div');
    return t.cont;
  },
  
  getContent : function (){
    var t = my.Dash;
    return t.cont;
  },
  
  gatedef: function(numc) {
 	var currentCity=Cities.cities[numc].c;
    var a = !Cities.cities[numc].c.defending;
    var b={cid:currentCity.id,state:a};
    uW.AjaxCall.gPostRequest("gate.php",b,function(c){
		currentCity.defending=a;
      	DashInnert();
    });
  },
  
  show : function (){ 
  },
  
  hide : function (){ 
  }
  
}
function createDashboard (){
	var Dashboard = document.createElement('div');
	var beacon = ById('mod_cityinfo');
	if (Options.DashPos == 0) {
		Dashboard.style.width= "600px";
  		Dashboard.style.top = "-570px";
  		Dashboard.style.left ="1122px";
  		Dashboard.style.height = "728px";
  	} else {
		Dashboard.style.width= "350px";
  		Dashboard.style.top = "73px";
  		Dashboard.style.left ="18px";
  		Dashboard.style.height = "728px";
  	}
	Dashboard.id='Dash_div';
	Dashboard.style.position = 'absolute';
  	Dashboard.style.overflow = 'auto';
	beacon.parentNode.insertBefore(Dashboard, beacon);
}
function DashInnert (){
	var t = my.Dash;
	if (!Options.EnableDash) return;
	uW.DAdefend = t.gatedef;
    var Green = 'BODefButOn';
    var Red = 'BODefButOff';
    var m = '<div class="ptstat">DASHBOARD</div>';
    	m+= '<center><br><INPUT id="DAReloadGor" type=submit value="'+translate('Volver a cargar')+' GoR">';
    	m+= '<div id="TabReloadDiv"></div>';
    	m+= '<br><table width="70%">';
    		m+= '<tr><td style="text-align:center; vertical-align:middle;">';
    		if (AutoAttack.Attivo) m+= '<INPUT id="DAMultiAttack" class="'+Red+'" type=submit value="Multi'+uW.arStrings.Common.Attack+' = ON"></td>';
    		else m+= '<INPUT id="DAMultiAttack" class="'+Green+'" type=submit value="Multi'+uW.arStrings.Common.Attack+' = OFF"></td>';
    		m+= '<td style="text-align:center; vertical-align:middle;">';
    		if (Options.AttackAuto) m+= '<INPUT id="DAAttque" class="'+Red+'" type=submit value="Auto'+uW.arStrings.Common.Attack+' = ON"></td>';
    		else m+= '<INPUT id="DAAttque" class="'+Green+'" type=submit value="Auto'+uW.arStrings.Common.Attack+' = OFF""></td>';
    		m+= '</tr>';
    		m+= '<tr><td style="text-align:center; vertical-align:middle;">';
    		if (TrainOptions.Running) m+= '<INPUT id="DATrainAuto" class="'+Red+'" type=submit value="Auto'+uW.arStrings.Common.Train+' = ON"></td>';
    		else m+= '<INPUT id="DATrainAuto" class="'+Green+'" type=submit value="Auto'+uW.arStrings.Common.Train+' = OFF"></td>';
    		m+= '<td style="text-align:center; vertical-align:middle;">';
			if (my.TranspAuto.traderState.running) m+= '<INPUT id="DATraspAuto" class="'+Red+'" type=submit value="Auto'+uW.arStrings.Common.Transport+' = ON"></td>';
    		else m+= '<INPUT id="DATraspAuto" class="'+Green+'" type=submit value="Auto'+uW.arStrings.Common.Transport+' = OFF"></td>';
    		m+= '</tr>';
    		m+= '<tr><td style="text-align:center; vertical-align:middle;">';
    		if (AutoResearch.ActiveResearch) m+= '<INPUT id="DAResAuto" class="'+Red+'" type=submit value="Auto'+uW.arStrings.Common.Research+' = ON"></td>';
    		else m+= '<INPUT id="DAResAuto" class="'+Green+'" type=submit value="Auto'+uW.arStrings.Common.Research+' = OFF"></td>';    		
    		m+= '<td style="text-align:center; vertical-align:middle;">';
    		if (AutoBuild.ActiveBuild) m+= '<INPUT id="DABuildAuto" class="'+Red+'" type=submit value="Auto'+uW.arStrings.Common.Build+' = ON"></td>';
    		else m+= '<INPUT id="DABuildAuto" class="'+Green+'" type=submit value="Auto'+uW.arStrings.Common.Build+' = OFF"></td>';    
    		m+= '</tr>';
    	m+= '</table>';
    	m+= '<br><br>';
    	m+= '<div class="ptstat">'+uW.arStrings.Common.Cities.toUpperCase()+'</div><br>';
    	m+= '<table><tr>';
 		for (i=0; i<Cities.numCities; i++) {
 			if (i == 6) m+= '</tr><tr>';
         	var Gate = Cities.cities[i].c.defending;
         	if (Gate == 0) {
          		var couleurr="#77EE77";
          		var stylbo = "BODefButOff";
          		var butvalue="DEF = OFF";
         	} else {
          		var couleurr="#EE7777";
          		var stylbo = "BODefButOn";
          		var butvalue="DEF = ON";
         	}
         	m+= "<TD width=81 style='background-color:"+couleurr+";text-align:center' align=center><B>"+ Cities.cities[i].c.name.substring(0,7) +'</b><BR><a onclick="KB.Controllers.MapHelper.gotoCoord('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+');">('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+')</a><br><input type=button value="'+butvalue+'" id="DAdef_'+i+'" class="'+stylbo+'" onclick="DAdefend('+i+');"></td>';
        	m+= '<td>&nbsp; &nbsp;</td>';
        }
m+= '</tr></table><br>';
		m+= '<div class="ptstat">AMULETOS</div><table width="70%"><tr><td colspan="3">&nbsp;</td></tr><tr><td style="background-color:'+couleurr+';text-align:center" align="center"><a href="http://apps.facebook.com/gloryofrome/?page=helpfriend&tid=13&in=1746705&qid=1197&s=108&inviterServer=108&lp=12&ty=3&si=104&ln=1" target="_top"><img src=" http://galeon.hispavista.com/blackriders/recursos/coin.png" border="0"><br>AMULETO N 1</a></td><td  style="background-color:'+couleurr+';text-align:center" align="center"><a href="http://apps.facebook.com/gloryofrome/?page=helpfriend&s=108&inviterServer=108&tid=7&sid=1746705&lp=17&entrychannel=%404&in=1746705&ty=3&si=85&ln=1" target="_top"><img src="http://galeon.hispavista.com/blackriders/recursos/coin.png" border="0"><br>AMULETO N 2</a></td><td  style="background-color:'+couleurr+';text-align:center" align="center"><a href="https://apps.facebook.com/gloryofrome/?page=helpfriend&tid=10&sid=1112958&lid=89iD&gid=REPLACE_AsSeTiD&cid=51923&entrychnl=@20&s=202&inviterServer=202&in=1112958&lp=10&ty=3&si=502&ln=1&entrypt=unttagged&force_entrypt=0" target="_top"><img src="http://galeon.hispavista.com/blackriders/recursos/coin.png" border="0"><br>AMULETO N 3</a></td></tr>';

  	
        m+= '</tr></table>';
    	
    ById('Dash_div').innerHTML = m;
    ById('DAReloadGor').addEventListener ('click', function() { reloadKOC(); }, false);
    
    ById('DAMultiAttack').addEventListener ('click', function() { 
    	my.AutoAtt.ToggleAutoAttack(); 
    }, false);
    
    ById('DAAttque').addEventListener ('click', function() { 
    	my.attaque.ToggleAutoAttack(); 
    }, false);  
    
	ById('DATrainAuto').addEventListener ('click', function() { 
		my.AutoForm.toggleautoFormationState();
    }, false); 

	ById('DATraspAuto').addEventListener ('click', function() { 
		my.TranspAuto.toggleTraderState();
    }, false); 
    
	ById('DAResAuto').addEventListener ('click', function() { 
		my.AutoRes.ToggleAutoResearch();
    }, false);
    
    ById('DABuildAuto').addEventListener ('click', function() { 
    	my.Build.ToggleAutoBuild();
    }, false);
 
}

/************************ INVENTORY ************************/
my.Inventory = {
  cont : null,
  timer : null,

  init : function (){
    var t = my.Inventory;
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    var t = my.Inventory;
    return t.cont;
  },

  show : function (){
    var t = my.Inventory;
      try {      
      		var cont = 0;
			var m = '<table width=100%><tr>';
			uW.Object.values(uW.items).select(function (d) {
				if (d.category != 'NaN' && d.count > 0) {
					cont += 1;
	                m+= '<td style="text-align:center; vertical-align:middle;"><div class="pic px70 items item_'+d.id+'"></div></td><td style="text-align:left; vertical-align:middle;"><b>'+uW.arStrings.itemName["i" + d.id]+'</b><br>'+uW.arStrings.Common.youOwn+': '+d.count+'</td>';
	                if (cont >= 4) {
	                	cont = 0;
	                	m+= '</tr><tr>';
	                }
	            }
            }),
        	m+= '</table>';
    t.cont.innerHTML = m; 
 	} catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
  },
  
  hide : function (){ 
  }
  
}

/************************ BOTTOLS ************************/
my.BoTTols = {
  cont : null,
  timer : null,

  init : function (){
    var t = my.BoTTols;
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    var t = my.BoTTols;
    return t.cont;
  },

  show : function (){
    var t = my.BoTTols;   
      try {      

    t.cont.innerHTML = '<CENTER><iframe src="http://gamespowerita.com" width="750" height="690" id="BOFrame" border=0></iframe><BR></center>'; 
 	} catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
  },
  
  hide : function (){ 
  }
  
}

/************************ SCAN MAP ************************/
my.scanmap = {
  cont : null,
  timer : null,

  init : function (){
    var t = my.scanmap;
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    var t = my.scanmap;
    return t.cont;
  },

  show : function (){
    var t = my.scanmap;   
      try {      

    t.cont.innerHTML = '<CENTER><iframe src="http://www.gptscanmap.com" width="780px" height="650px" id="BOFrame" border=0></iframe><BR></center>'; 
 	} catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
  },
  
  hide : function (){ 
  }
  
}

/************************ BUILD ************************/
my.Build = {
  cont : null,
  timer : null,
  displayTimer : null,
  ctrl : 0,

  init : function (){
    var t = my.Build;
    t.cont = document.createElement('div');
    setTimeout (function(){
    	if (AutoBuild.ActiveBuild) t.Controllo();
    }, 10000);
    return t.cont;
  },

  getContent : function (){
    var t = my.Build;
    return t.cont;
  },

  show : function (){
    var t = my.Build; 
      try {
      		for (var i=0; i<Cities.numCities; i++) {
      			id = Cities.cities[i].c.id;
      			if (AutoBuild.EnBuild[i] == undefined) AutoBuild.EnBuild[i] = {};
      			if (AutoBuild.SelCap[i] == undefined) AutoBuild.SelCap[i] = {};
      			
   				for (z in uW.Constant.Building) {
      				var BuildID = uW.Constant.Building[z];
      				if (BuildID != 99) {
      					uW.Building.Methods.getAllOfType(BuildID, id).collect(function (r) {
      						var DataBase = Cities.cities[i].c.buildings[r.position].databaseId;
      						if (AutoBuild.EnBuild[i][DataBase] == undefined) AutoBuild.EnBuild[i][DataBase] = false;
      						if (AutoBuild.SelCap[i][DataBase] == undefined) AutoBuild.SelCap[i][DataBase] = 9;
      					});
      				}
      			}
      		}
      		
			var m = '<DIV  class=ptstat>'+uW.arStrings.Common.Buildings.toUpperCase()+'</div>';
				m+= '<table width=100%><tr>';
				m+= '<td style="text-align:center; vertical-align:middle;" width=75%>';
				if (AutoBuild.ActiveBuild) {
          			m+= '<input type=button value="'+translate('AUTO')+' '+uW.arStrings.Common.Build.toUpperCase()+' = ON" id=EnDisAutoBuild>';
				} else {
          			m+= '<input type=button value="'+translate('AUTO')+' '+uW.arStrings.Common.Build.toUpperCase()+' = OFF" id=EnDisAutoBuild>';
				}
				m+= '<br><input type=checkbox id="HelpBuild" '+ (AutoBuild.HelpBuild?'CHECKED ':'')+'> '+uW.arStrings.BuildingModal.RequestHelp;
				m+= '<br><input type=checkbox id="CheckLvlBuild" '+ (AutoBuild.CheckLevel?'CHECKED ':'')+'> '+translate('Conducir al mismo nivel');
				m+= '<br>'+translate('Compruebe cada')+' <INPUT id="BuildCheckTime" size=3 type=textbox value="'+AutoBuild.CheckTime+'" /> '+uW.arStrings.TimeStr.timeSec;
				m+= '</td></tr></table>';
				for (var i=0; i<Cities.numCities; i++) {
   			 		id = Cities.cities[i].c.id;
   					m+= '<DIV class=ptstat>'+Cities.cities[i].c.name+'</div>';
   					if (Cities.cities[i].c.queues.building.activeSlots()[0] || Cities.cities[i].c.queues.building.activeSlots()[1]) {
    	   				if (parseInt(Cities.cities[i].c.queues.building.activeSlots()[0].typeId())!=99) { 
    	    				var temprestant=Cities.cities[i].c.queues.building.activeSlots()[0].secondsLeft();
    	   				} else {
    	    				if (Cities.cities[i].c.queues.building.activeSlots()[1]) {
    	     					var temprestant=Cities.cities[i].c.queues.building.activeSlots()[1].secondsLeft();
    	    				} else {
    	     					var temprestant=0;
							}
						}
					} else {
						var temprestant = 0;
					}
					m+= '<b>'+uW.arStrings.Common.Build+'</b>: '+timestrShort(temprestant);
					m+= '<table width=100%><tr>';
						m+= '<td width=50%><TABLE width=100%><tr>';
							m+= '<td width=50%><DIV class=ptstat><b>'+uW.arStrings.Common.City.toUpperCase()+'</b></div></td>';
							m+= '<td width=25%><DIV class=ptstat>'+uW.arStrings.BuildingModal.CurrentLevel+'</div></td>';
							m+= '<td width=25%><DIV class=ptstat>'+translate('Hasta el nivel')+'</div></td>';
						m+= '</tr><tr><td colspan=3 width=100%>';
							m+= '<TABLE align=center cellpadding=0 cellspacing=0 width=100% id="VILLA'+id+'">';
							//	m+= '<tr><td width=50%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td></tr>';
								m+= '<tr><td width=50%><b>'+uW.arStrings.buildingName["b"+uW.Constant.Building.VILLA].toUpperCase()+':</b></td><td width=25%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td></tr>';
							m+= '</table>';
						m+= '</td></tr><tr><td colspan=3 width=100%>';
							m+= '<TABLE align=center cellpadding=0 cellspacing=0 width=100% id="BARRACKS'+id+'">';
							//	m+= '<tr><td width=50%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td></tr>';
								m+= '<tr><td width=50%><b>'+uW.arStrings.buildingName["b"+uW.Constant.Building.BARRACKS].toUpperCase()+':</b></td><td width=25%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td></tr>';
							m+= '</table>';
						m+= '</td></tr><tr><td colspan=3 width=100%>';
							m+= '<TABLE align=center cellpadding=0 cellspacing=0 width=100% id="CITT'+id+'">';
							//	m+= '<tr><td width=50%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td></tr>';
								m+= '<tr><td width=50%><b>&nbsp;&nbsp;</b></td><td width=25%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td></tr>';
							m+= '</table>';
						m+= '</td></tr>';
						m+= '</table></td>';
						m+= '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
						m+= '<td width=50%><TABLE width=100%>';
							m+= '<tr>';
								m+= '<td width=50%><DIV class=ptstat><b>'+uW.arStrings.Common.Field.toUpperCase()+'</b></div></td>';
								m+= '<td width=25%><DIV class=ptstat>'+uW.arStrings.BuildingModal.CurrentLevel+'</div></td>';
								m+= '<td width=25%><DIV class=ptstat>'+translate('Hasta el nivel')+'</div></td>';							
							m+= '</tr><tr><td colspan=3 width=100%>';
								m+= '<TABLE align=center cellpadding=0 cellspacing=0 width=100% id="FARM'+id+'">';
							//		m+= '<tr><td width=50%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td></tr>';
									m+= '<tr><td width=50%><b>'+uW.arStrings.buildingName["b"+uW.Constant.Building.FARM].toUpperCase()+':</b></td><td width=25%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td></tr>';
								m+= '</table>';
							m+= '</td></tr><tr><td colspan=3 width=100%>';
								m+= '<TABLE align=center cellpadding=0 cellspacing=0 width=100% id="SAWMILL'+id+'">';
							//		m+= '<tr><td width=50%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td></tr>';
									m+= '<tr><td width=50%><b>'+uW.arStrings.buildingName["b"+uW.Constant.Building.SAWMILL].toUpperCase()+':</b></td><td width=25%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td></tr>';
								m+= '</table>';						
							m+= '</td></tr><tr><td colspan=3 width=100%>';
								m+= '<TABLE align=center cellpadding=0 cellspacing=0 width=100% id="QUARRY'+id+'">';
							//		m+= '<tr><td width=50%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td></tr>';
									m+= '<tr><td width=50%><b>'+uW.arStrings.buildingName["b"+uW.Constant.Building.QUARRY].toUpperCase()+':</b></td><td width=25%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td></tr>';
								m+= '</table>';
							m+= '</td></tr><tr><td colspan=3 width=100%>';
								m+= '<TABLE align=center cellpadding=0 cellspacing=0 width=100% id="MINE'+id+'">';
							//		m+= '<tr><td width=50%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td></tr>';
									m+= '<tr><td width=50%><b>'+uW.arStrings.buildingName["b"+uW.Constant.Building.MINE].toUpperCase()+':</b></td><td width=25%>&nbsp;&nbsp;</td><td width=25%>&nbsp;&nbsp;</td></tr>';
								m+= '</table>';
							m+= '</td></tr>';						
						m+= '</table></td>';
					m+= '</tr></table>';
				}
    		t.cont.innerHTML = m; 
			ById('BuildCheckTime').addEventListener ('change', function () {
		   		if (ById('BuildCheckTime').value < 30) ById('BuildCheckTime').value = 30;
		   		AutoBuild.CheckTime = ById('BuildCheckTime').value;
	        	saveAutoBuild();
			}, false);
    		ById("HelpBuild").addEventListener('click', function(e) {
				AutoBuild.HelpBuild = ById("HelpBuild").checked;
       			saveAutoBuild();
     		}, false); 
     		ById("CheckLvlBuild").addEventListener('click', function(e) {
				AutoBuild.CheckLevel = ById("CheckLvlBuild").checked;
       			saveAutoBuild();
     		}, false);
    		ById("EnDisAutoBuild").addEventListener('click', function() { t.ToggleAutoBuild(); }, false);

				for (var i=0; i<Cities.numCities; i++) {
   			 		id = Cities.cities[i].c.id;		
					var FF = uW.Constant.Building;
   				 	for (k in FF) {
   				 		var BuildID = FF[k];
   				 		var Dove = 'CITT'+id;
   				 		if (BuildID == uW.Constant.Building.FARM) Dove = 'FARM'+id;
   				 		if (BuildID == uW.Constant.Building.SAWMILL) Dove = 'SAWMILL'+id;
   				 		if (BuildID == uW.Constant.Building.QUARRY) Dove = 'QUARRY'+id;
   				 		if (BuildID == uW.Constant.Building.MINE) Dove = 'MINE'+id;
   				 		if (BuildID == uW.Constant.Building.VILLA) Dove = 'VILLA'+id;
   				 		if (BuildID == uW.Constant.Building.BARRACKS) Dove = 'BARRACKS'+id;
   				 	
    	    			uW.Building.Methods.getAllOfType(BuildID, id).collect(function (r) {
    	    				var UnderBuild = '';
    	    				var DataBase = Cities.cities[i].c.buildings[r.position].databaseId;
    	    				if (Cities.cities[i].c.queues.building.activeSlots()[0] && Cities.cities[i].c.queues.building.activeSlots()[0] != undefined && Cities.cities[i].c.queues.building.activeSlots()[0].databaseId() == DataBase) {
								var UnderBuild = '<font color=red>--> '+(r.level()+1)+'</font>';
							}
							if (Cities.cities[i].c.queues.building.activeSlots()[1] && Cities.cities[i].c.queues.building.activeSlots()[1] != undefined && Cities.cities[i].c.queues.building.activeSlots()[1].databaseId() == DataBase) {
								var UnderBuild = '<font color=red>--> '+(r.level()+1)+'</font>';
							}
							
							if (BuildID != 99) {
								var row = ById(Dove).insertRow(1);
								row.style.color = "black";
								row.insertCell(0).innerHTML = '<input type=checkbox id="EnBuild'+DataBase+'" '+ (AutoBuild.EnBuild[i][DataBase]?'CHECKED ':'')+'>'+uW.arStrings.buildingName["b"+BuildID];
								row.insertCell(1).innerHTML = '<center>'+r.level()+' '+UnderBuild+'</center>';
							
								var add = '<center><select id="SelectBuildCap'+DataBase+'">';
									for (var z=1; z <= 9; z++) {
										add+= '<option value="'+z+'" ' + (AutoBuild.SelCap[i][DataBase]==z?'SELECTED':'') + '>'+z+'</option>';
									}
									add+= '</select></center>';
								row.insertCell(2).innerHTML = add;
							}        					
    	   	 			});
    	   	 		}
				}
    		
			for (var i=0; i<Cities.numCities; i++) {
				id = Cities.cities[i].c.id;
				var FF = uW.Constant.Building;
   				for (z in FF) {
      				var BuildID = FF[z];
      				if (BuildID != 99) {
      					uW.Building.Methods.getAllOfType(BuildID, id).collect(function (r) {
      						var DataBase = Cities.cities[i].c.buildings[r.position].databaseId;
      						
	    					ById("EnBuild"+DataBase).addEventListener('click', function() { t.saveBuild(); }, false);
	    					ById("SelectBuildCap"+DataBase).addEventListener('click', function() { t.saveBuildCap(); }, false);
		
    	 				});
    	 			}		
     			}
     		}
     		
     		
 	  } catch (e) {
        	t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      } 
      
      t.displayTimer = setTimeout (t.show, 60000);     
  },
  saveBuildCap : function (){
  	var t = my.Build;
	for (var i=0; i<Cities.numCities; i++) {
		id = Cities.cities[i].c.id;
		var FF = uW.Constant.Building;
		for (z in FF) {
			var BuildID = FF[z];
			if (BuildID != 99) {
				uW.Building.Methods.getAllOfType(BuildID, id).collect(function (r) {
					var DataBase = Cities.cities[i].c.buildings[r.position].databaseId;
					AutoBuild.SelCap[i][DataBase] = ById("SelectBuildCap"+DataBase).value;
				});
			}		
     	}
     }
     saveAutoBuild(); 	
  },
  
  saveBuild : function (){
  	var t = my.Build;
	for (var i=0; i<Cities.numCities; i++) {
		id = Cities.cities[i].c.id;
		var FF = uW.Constant.Building;
		for (z in FF) {
			var BuildID = FF[z];
			if (BuildID != 99) {
				uW.Building.Methods.getAllOfType(BuildID, id).collect(function (r) {
					var DataBase = Cities.cities[i].c.buildings[r.position].databaseId;
					AutoBuild.EnBuild[i][DataBase] = ById("EnBuild"+DataBase).checked;
				});
			}		
     	}
     }
     saveAutoBuild(); 	
  },
  
  hide : function (){ 
  },
  
  Controllo : function () {
  	var t = my.Build;
  	var Can;
 	if (AutoBuild.ActiveBuild) {
  	for (var i=0; i<Cities.numCities; i++)
  	{ 	
		id = Cities.cities[i].c.id;
		Can = false;
	
		if (Cities.cities[i].c.queues.building.activeSlots()[0] == undefined)
		{
			if (Cities.cities[i].c.queues.building.activeSlots()[1] == undefined)
			{
				Can = true;
			} else {
				if (Cities.cities[i].c.queues.building.activeSlots()[1].typeId() == 99)
				{
					Can = true;
				} else {
					Can = false;
				}
			} 
		} else {
			if (Cities.cities[i].c.queues.building.activeSlots()[0].typeId() == 99)
			{
				if (Cities.cities[i].c.queues.building.activeSlots()[1] == undefined)
				{
					Can = true;
				} else {
					Can = false;
				}
			} else {
				Can = false;	
			}
		}
		if (Can) t.Start(i);
	}
	}
	t.timer = setTimeout (function(){t.Controllo();}, AutoBuild.CheckTime*1000);
  },
  
  Start : function (i){
  	var t = my.Build;
  	
  	var id = Cities.cities[i].c.id;
  	
	var FF = uW.Constant.Building;
	for (z in FF) {
		var BuildID = FF[z];
		if (BuildID != 99) {
			uW.Building.Methods.getAllOfType(BuildID, id).collect(function (r) {
				var DataBase = Cities.cities[i].c.buildings[r.position].databaseId;
				var Positon = Number(r.position);
				var h = Cities.byID[id].c.buildings[Positon];
				if (AutoBuild.EnBuild[i][DataBase]) 
				{
					var ToBuildLvl = parseInt(r.level())+1;	// Livello da fare
					if (ToBuildLvl <= AutoBuild.SelCap[i][DataBase])
					{
						var CheckBuild = t.CheckReqBuild(BuildID, ToBuildLvl);
						if (CheckBuild)
						{
							if (AutoBuild.CheckLevel)
							{
								if (t.ctrl == 0) { 
									t.ctrl = {ctid:id,sid:i+1,db:DataBase,lvl:ToBuildLvl,pos:Positon,type:BuildID,hh:h};
								} else {
									if (ToBuildLvl < t.ctrl.lvl) {
										t.ctrl = {ctid:id,sid:i+1,db:DataBase,lvl:ToBuildLvl,pos:Positon,type:BuildID,hh:h};
									}
								}
							} else {
								if (t.ctrl == 0) { 
									t.ctrl = {ctid:id,sid:i+1,db:DataBase,lvl:ToBuildLvl,pos:Positon,type:BuildID,hh:h};
								}
							}
						}
					} else {
						if (ById('EnBuild'+DataBase)) ById('EnBuild'+DataBase).checked = false;
						AutoBuild.EnBuild[i][DataBase] = false;
						saveAutoBuild();
					}
				}
			});	
		}
	}
	if (t.ctrl != 0) {
		var g = t.ctrl;
		var h = t.ctrl.hh;
		var a = {};
			a.cid 	=	g.ctid;			// Città
			a.csid	= 	g.sid;			// Città numero
			a.bid	= 	g.db;			// ID Costruzione
			a.lv	=	g.lvl;			// Livello da costruire
			a.pos	= 	g.pos;			// Posizione costruzione
			a.type	=	g.type;			// Tipo costruzione
		uW.AjaxCall.gPostRequest("construct.php", a, 
			function (k) {
				actionLog(translate('Auto')+uW.arStrings.Common.Build,Cities.cities[i].c.name+': '+uW.arStrings.Common.Build+': '+uW.arStrings.buildingName["b"+h.typeId()]+'</font>');
				uW.Building.removeResourcesForLevel(h.typeId(), h.level() + 1);
				h.databaseId = Number(k.buildingId);
				t.ctrl = 0;
				var z = new uW.KB.Models.QueueSlot.Building({
						id: h.position,
						type: h.typeId(),
						target: h.level() + 1,
						databaseId: h.databaseId,
						ticker: uW.unixtime(),
						eta: uW.unixtime() + uW.Building.getBuildTimeForLevel(h.typeId(), h.level() + 1)
				});
				Cities.byID[id].c.queues.building.addSlot(z);
				if (AutoBuild.HelpBuild) uW.Building.getHelp(DataBase);
			},
			function (k) {
				t.ctrl = 0;
				actionLog(translate('Auto')+uW.arStrings.Common.Build,Cities.cities[i].c.name+': <font color=red>'+translate('ERROR')+': '+uW.arStrings.Common.Build+': '+uW.arStrings.buildingName["b"+h.typeId()]+'</font>');
			//	t.Start(i);
			}
		);
	}
  },

  CheckReqBuild : function (BuildID, ToBuildLvl) {
  	var t = my.Build;
  	var Q = true;
  	var a = uW.Building.checkRequirementForLevel(BuildID, ToBuildLvl);
  	a[0].each(function (Z, ab) {
		var ac = a[3][ab] !== 0;
		if (!ac) Q = ac;
    });
    return Q;
  },
  ToggleAutoBuild: function() {
	var t = my.Build;
	var obj = ById("EnDisAutoBuild");
	if (AutoBuild.ActiveBuild == true) {
		AutoBuild.ActiveBuild = false;
		if (obj) obj.value = translate('AUTO')+' '+uW.arStrings.Common.Build.toUpperCase()+' = OFF';
		saveAutoBuild();
	}  else {
		AutoBuild.ActiveBuild = true;
		if (obj) obj.value = translate('AUTO')+' '+uW.arStrings.Common.Build.toUpperCase()+' = ON';
		saveAutoBuild();
		t.Controllo();
	}
	DashInnert();
  }

}

/************************ MANAGER ************************/
my.Manager = {
  cont : null,
  alliancemembers:[],
  leadercount:[],
  number:0,
  totalmembers:0,
  error:false,
  init : function (){
    var t = my.Manager;
    t.cont = document.createElement('div');
    return t.cont;
  },
  getContent : function (){
    var t = my.Manager;
    return t.cont;
  },
    getAllianceInfo : function (){
      var t = my.Manager;   
      var c= {};
      unsafeWindow.AjaxCall.gPostRequest("allianceGetInfo.php",c,
        function(rslt){
           t.ResAllianceInfo (rslt);     
        }
      );
    },
  show : function (){
    var t = my.Manager;
      if (getMyAlliance()[1]==uW.arStrings.Common.None) {
        t.cont.innerHTML = '<BR><BR><CENTER><b>'+translate('Debe pertenecer a una alianza con el fin de utilizar esta función')+'</center>';
        return;
      }
     t.totalmembers=0;
     t.alliancemembers=[];
	uW.SendMessage=t.SendMessage;
	uW.RemoveMember=t.RemoveMember;   
      try { 
     	var m ='<center><INPUT id=boAlliance type=submit value="'+translate('Administrador alianza')+'"><INPUT id=boMessage type=submit value="'+translate('Administrador de mensajes')+'"><INPUT id=boLeaderboard type=submit value="'+translate('Tabla de posiciones')+'"></center>';
     		m+='<div id=ShowAlliance>';
			m+='<DIV  class=ptstat>'+translate('ADMINISTRADOR ALIANZA').toUpperCase()+'</div>';
			m+='<center><INPUT id=boGetMem type=submit value="'+translate('Informacion/Miembros')+'"> <INPUT id=boGetStat type=submit value="'+translate('Diplomacia alianza')+'"></center>';
			m+=uW.arStrings.MapHelper.SortBy+': <select id="searchAlli">';
			m+='<option value="name">'+uW.arStrings.Common.Name+'</options>';
   			m+='<option value="might">'+uW.arStrings.Common.Glory+'</option>';
    		m+='<option value="login">'+uW.arStrings.MembersInfo.LastOnline+'</option>';
    		m+='<option value="cities">'+uW.arStrings.Common.City+'</option>';
    		m+='<option value="position">'+uW.arStrings.Common.Position+'</option>';
			m+='<option value="dip">'+translate('Dias en Posición')+' (DIP)</option></select>';
	   		m+='<div style="width:auto; max-width:750px; height:auto;"; id=AllianceInfo></div>';
	   		m+='<div style="width:auto; max-width:750px; height:auto;"; id=DivInfoMem></div>';
	   		m+='<TABLE id=alOverviewTab width=100% style="max-width:750px" class=alTab><TR align="center"></tr></table>';
	   		m+='</div><div id=ShowMessage>';
	   		m+='<DIV  class=ptstat>'+translate('Mensaje administrador').toUpperCase()+'</div><center>';
	   		m+='<input type=button value="Message to Ally" id="sendMsgtoAlly"> <input type=button value="Message to Officer" id="sendMsgtoOffi">';
	   		m+='<br><input  type=button value="Message to All Leader" id="sendMsgtoLeader"></center>';
	   		m+='<DIV  class=ptstat>LOG</div>';
	   		m+='<div style="width:auto; max-width:750px; height:auto;"; id=MessageProgress></div>';
	   		m+='</div>';
	   		m+='<div id=ShowLeaderBoeard>';
	   		m+='<div class=ptstat>'+translate('Tabla de posiciones').toUpperCase()+'</div>';
	   		m+='<INPUT id=boGetLead type=submit value="'+translate('Obtener tabla de posiciones')+'">';
			m+=translate('Mostrar sólo la primera')+': <select id="NumLead">';
			m+='<option value="10">10</options>';
   			m+='<option value="50">50</option>';
    		m+='<option value="100">100</option>';
    		m+='<option value="200">200</option>';
    		m+='<option value="400">400</option>';
			m+='<option value="600">600</option>';
			m+='<option value="1000">1000</option></select>';
	   		m+='<TABLE id=alLeaderTab width=100% class=alTab><TR align="center"></tr></table>';
	   		m+='</div>';
    t.cont.innerHTML = m; 
	ById("ShowMessage").style.display="none";
	ById('ShowLeaderBoeard').style.display="none";
	ById("ShowAlliance").style.display="block";
	ById('boMessage').disabled = false;
	ById('boAlliance').disabled = true;	
	ById('boLeaderboard').disabled = false;
    ById('boAlliance').addEventListener ('click', function(){
		  ById("ShowMessage").style.display="none";
		  ById("ShowAlliance").style.display="block";
		  ById('ShowLeaderBoeard').style.display="none";
		  ById('boMessage').disabled = false;
		  ById('boAlliance').disabled = true;
		  ById('boLeaderboard').disabled = false;
    }, false);
    ById('boMessage').addEventListener ('click', function(){
		  ById("ShowMessage").style.display="block";
		  ById("ShowAlliance").style.display="none";
		  ById('ShowLeaderBoeard').style.display="none";
		  ById('boMessage').disabled = true;
		  ById('boAlliance').disabled = false;
		  ById('boLeaderboard').disabled = false;
    }, false);
    ById('boLeaderboard').addEventListener ('click', function(){
		  ById("ShowMessage").style.display="none";
		  ById("ShowAlliance").style.display="none";
		  ById('ShowLeaderBoeard').style.display="block";
		  ById('boMessage').disabled = false;
		  ById('boAlliance').disabled = false;
		  ById('boLeaderboard').disabled = true;
    }, false);    
    ById('boGetMem').addEventListener ('click', function(){
    	ById('AllianceInfo').innerHTML ="";
    	ById('alOverviewTab').innerHTML ="";
    	ById('DivInfoMem').innerHTML="";
    	ById('boGetMem').disabled = true;
    	t.alliancemembers=[];
    	t.getAllianceInfo();
    }, false);
    ById('boGetLead').addEventListener ('click', function(){
    	ById('alLeaderTab').innerHTML="";
    	t.leadercount = [];
    	ById('boGetLead').disabled = true;
    	t.getLeaderboard();
    }, false);
    ById('boGetStat').addEventListener ('click', function(){
    	ById('AllianceInfo').innerHTML ="";
    	ById('alOverviewTab').innerHTML ="";
    	ById('DivInfoMem').innerHTML="";
    	t.GetDiplomacy();
    }, false);   
    ById('sendMsgtoAlly').addEventListener ('click', function(){
    	var name = getMyAlliance()[1];
    	var id = getMyAlliance()[0];
    	alert('id: '+id + ' - name: '+ name);
    	// "KB.AudioManager.playSound('on_click');getMessageWindow(" + [KB.Models.Alliance.arrAllianceInfo.allianceId, "'" + KB.Models.Alliance.arrAllianceInfo.allianceName + "'", "'allianceall'"].join(",") + ")"
		uW.getMessageWindow([id, "'" + name + "'", "'allianceall'"]);
	//	t.MessageToAllAlly();
    }, false);
    ById('sendMsgtoLeader').addEventListener ('click', function(){
		t.ContrMessageToAll();
    }, false);
    ById('sendMsgtoOffi').addEventListener ('click', function(){
		t.MessageToOfficial();
    }, false);
    ById('searchAlli').addEventListener('click', function(){
        if (t.alliancemembers!="") {
        	ById('alOverviewTab').innerHTML ="";
        	t.paintMembers(); 
        }
    }, false);
 	} catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
  },
  getLeaderboard : function (){
	  var t = my.Manager;
        var row = ById('alLeaderTab').insertRow(0);
             row.insertCell(0).innerHTML = '<b>'+uW.arStrings.Common.Ranking+'</b>';
             row.insertCell(1).innerHTML = '<b>'+uW.arStrings.Common.Name+'</b>';
             row.insertCell(2).innerHTML = '<b>'+uW.arStrings.Common.Level+'</b>';
             row.insertCell(3).innerHTML = '<b>'+uW.arStrings.Common.Glory+'</b>';
             row.insertCell(4).innerHTML = '<b>'+uW.arStrings.Common.Alliance+'</b>';	
      var NPage = Math.ceil((ById('NumLead').value)/10);  
      for (var f=1; f<=NPage; f++) {
      	var c= {};
      	c.action = "show_all_players";
      	c.page = f;
      	unsafeWindow.AjaxCall.gPostRequest("getUserLeaderboard.php",c,
        function(rslt){	  
        	var CP = rslt.curPageData;
        	for (k in CP){
        		if(CP[k].playerRank != undefined || CP[k].playerDisplayName != undefined || CP[k].playerLevel != undefined || CP[k].playerMight != undefined || CP[k].allianceName != undefined){
        		t.leadercount.push({
        				rank: CP[k].playerRank,
        				name: CP[k].playerDisplayName,
        				level: CP[k].playerLevel,
        				might: CP[k].playerMight,
        				alliance: CP[k].allianceName
        		})    		
        		}}
        		        		 if(t.leadercount.length == ById('NumLead').value){ById('boGetLead').disabled = false; t.paintLeader(); } 
     	   });
    }
  },
  paintLeader: function(){
  	var t = my.Manager;
  			//		alert('Avvio Paint');
  					  var sortmembers = t.leadercount.sort(function(a, b){
				         var sortA=parseInt(a.rank), sortB=parseInt(b.rank)
				         if (sortA < sortB) 
				          return -1
				         if (sortA > sortB)
				          return 1
				         return 0 
				        });
						for (var y = (sortmembers.length-1); y >=0; y--) {
			            	t._addLeaTab(sortmembers[y].rank, sortmembers[y].name, sortmembers[y].level, sortmembers[y].might, sortmembers[y].alliance);
			                t.cont.style.overflowY = 'scroll';
			  			}
  },
    _addLeaTab: function(rank,name,level,might,alliance){
             var t = my.Manager;
             if(alliance == getMyAlliance()[1]){
             var Font = '#64FE2E';          
             } else {
             var Font = '';
             }
           		 var row = ById('alLeaderTab').insertRow(1);
           		 	 row.style.backgroundColor = Font;
            	 	 row.insertCell(0).innerHTML =  rank;
            	 	 row.insertCell(1).innerHTML =  name;
            	 	 row.insertCell(2).innerHTML =  level;
            	 	 row.insertCell(3).innerHTML =  addCommas(might);
           		  	 row.insertCell(4).innerHTML =  alliance;
          },   
  paintMembers: function(){
  var t = my.Manager; 
	  		  if (ById('searchAlli').value == "name") {
				  var sortmembers = t.alliancemembers.sort(function(a, b){
				         var sortA=a.Name.toLowerCase(), sortB=b.Name.toLowerCase()
				         if (sortA < sortB) 
				          return -1
				         if (sortA > sortB)
				          return 1
				         return 0 
				        });
			  }     
			  if (ById('searchAlli').value == "might") {
			  	  var sortmembers = t.alliancemembers.sort(function(a, b){
			  	         var sortA=parseInt(a.Might),sortB=parseInt(b.Might)
			  	         if (sortA > sortB) 
			  	          return -1
			  	         if (sortA < sortB)
			  	          return 1
			  	         return 0 
			  	        });
			  }     
			  if (ById('searchAlli').value == "login") {
			  	  var sortmembers = t.alliancemembers.sort(function(a, b){
			  	         var sortA=a.LastLogin,sortB=b.LastLogin
			  	         if (sortA < sortB) 
			  	          return -1
			  	         if (sortA > sortB)
			  	          return 1
			  	         return 0 
			  	        });
			  }     
			  if (ById('searchAlli').value == "cities") {
			  	  var sortmembers = t.alliancemembers.sort(function(a, b){
			  	         var sortA=a.Cities,sortB=b.Cities
			  	         if (sortA < sortB) 
			  	          return -1
			  	         if (sortA > sortB)
			  	          return 1
			  	         return 0 
			  	        });
			  }     
			  if (ById('searchAlli').value == "dip") {
			  	  var sortmembers = t.alliancemembers.sort(function(a, b){
			  	         var sortA=a.dip,sortB=b.dip
			  	         if (sortA < sortB) 
			  	          return -1
			  	         if (sortA > sortB)
			  	          return 1
			  	         return 0 
			  	        });
			  }     
			  if (ById('searchAlli').value == "position") {
			  	  var sortmembers = t.alliancemembers.sort(function(a, b){
			  	         var sortA=a.Position,sortB=b.Position
			  	         if (sortA < sortB) 
			  	          return -1
			  	         if (sortA > sortB)
			  	          return 1
			  	         return 0 
			  	        });
			  }     
			  for (var y = (sortmembers.length-1); y >=0; y--) {
			                      t._addTab(sortmembers[y].Name, sortmembers[y].Might, sortmembers[y].LastLogin, sortmembers[y].Position, sortmembers[y].dip, sortmembers[y].Cities, sortmembers[y].avatarurl, sortmembers[y].dateJoined, sortmembers[y].Id);
			                      t.cont.style.overflowY = 'scroll';
			  }
			  t._addTabHeader();
   },
  ResAllianceInfo : function (rslt){
  		var t = my.Manager;
  		var AI = rslt.allianceInfo;
  		var b = '<DIV  class=ptstat>'+translate('INFORMACIÓN ALIANZA')+'</div>';
  			b+= '<table width=100%><tr>';
  			b+= '<td width=50%>'+uW.arStrings.Common.Name+': '+AI.allianceName+'</td>';
  			b+= '<td width=50%>'+uW.arStrings.Alliance.Members+': '+AI.members+'/100</td></tr>';
  			b+= '<tr><td>'+uW.arStrings.Common.Glory+': '+AI.might+'</td>';
  			b+= '<td>'+translate('Fundador')+': '+AI.founderGenderAndName+'</td></tr></table>';
  			b+= '<table width=100%><tr>';
  			var OF = rslt.officers;
  			for (k in OF){
  				var Name = OF[k].genderAndName;
  				var Type = OF[k].type;
  				if(Name != undefined || Type != undefined){
  				b+= '<td><font color=red>'+Name+'</font><br>'+officerId2String(Type)+'</td>';
  				}
  			}
  			b+= '</tr>';
  			var ToTMom = AI.members;
  			var TotPage = Math.ceil(ToTMom/10);
  		ById('AllianceInfo').innerHTML = b;
  		for (var f=1; f<=TotPage; f++) {
  			var c= {};
      		c.pageNo = f;
      		unsafeWindow.AjaxCall.gPostRequest("allianceGetMembersInfo.php",c,
        	function(rslt){
    			var MI = rslt.memberInfo;
    			for (var k in MI){
    		if (MI[k].avatarurl != undefined || MI[k].genderAndName != undefined || MI[k].positionType != undefined || MI[k].might != undefined || MI[k].cities != undefined || MI[k].daysInPosition != undefined || MI[k].dateJoined != undefined || MI[k].lastLogin != undefined || MI[k].userId != undefined ) {
                t.alliancemembers.push ({
                	avatarurl : MI[k].avatarurl,
                	Name: MI[k].name,
                	Position : MI[k].positionType,
                    Might: MI[k].might,
                    Cities: MI[k].cities,
                    dip : MI[k].daysInPosition,
                    dateJoined : MI[k].dateJoined,
                    LastLogin : MI[k].lastLogin,
                    Id : MI[k].userId
                });
            }
            }
            if (t.alliancemembers.length >= ToTMom) {t.paintMembers();	ById('boGetMem').disabled = false;}
            });
  		}
  },
    _addTab: function(Name,Might,LastLogin,Position,dip,Cities,avatar,dateJoined,Id){
             var t = my.Manager;
             var row = ById('alOverviewTab').insertRow(0);
      //       row.style.backgroundColor = Font;
             row.vAlign = 'top';
             row.insertCell(0).innerHTML ='<img width=25 src="'+ avatar +'">';
             row.insertCell(1).innerHTML = Name;
             row.insertCell(2).innerHTML = addCommas(Might);
       		 row.insertCell(3).innerHTML = Cities;
       		 row.insertCell(4).innerHTML = officerId2String (Position);
       		 row.insertCell(5).innerHTML = dip;
       		 row.insertCell(6).innerHTML = dateJoined;
       		 row.insertCell(7).innerHTML = LastLogin;
             row.insertCell(8).innerHTML = '<input type=button value="Msg" id="sendMsg" class="button20" onclick="SendMessage('+Id+');">';
             row.insertCell(9).innerHTML = '<img src="http://icons.iconarchive.com/icons/awicons/vista-artistic/16/delete-icon.png" onclick="RemoveMember('+Id+')" alt="'+uW.arStrings.NeighborsPage.Remove+'" />';
          },     
    _addTabHeader: function() {
    var t = my.Manager;
    	ById('DivInfoMem').innerHTML = '<DIV  class=ptstat>'+translate('INFORMACIÓN MIEMBROS')+'</div>';
        var row = ById('alOverviewTab').insertRow(0);
             row.insertCell(0).innerHTML = '<b>'+translate('Avatar')+'</b>';
             row.insertCell(1).innerHTML = '<b>'+uW.arStrings.Common.Name+'</b>';
             row.insertCell(2).innerHTML = '<b>'+uW.arStrings.Common.Glory+'</b>';
             row.insertCell(3).innerHTML = '<b>'+uW.arStrings.Common.Cities+'</b>';
             row.insertCell(4).innerHTML = '<b>'+uW.arStrings.Common.Position+'</b>';
             row.insertCell(5).innerHTML = '<b>'+translate('Dias en posición')+'</b>';
             row.insertCell(6).innerHTML = '<b>'+translate('Se unió a fecha')+'</b>';
             row.insertCell(7).innerHTML = '<b>'+uW.arStrings.MembersInfo.LastOnline+'</b>';
             row.insertCell(8).innerHTML = '<b>'+uW.arStrings.Common.Actions+'</b>';
    }, 
  MessageToAllAlly : function (){
      var t = my.Manager;   
 		var b=prompt('(To Alliance) - '+translate('Escribir un mensaje')+":", "");
 		if (b){      
      var c= {};
      unsafeWindow.AjaxCall.gPostRequest("allianceGetInfo.php",c,
        function(rslt){
           var TotPage = Math.ceil(rslt.allianceInfo.members/10);
           for (var f=1; f<=TotPage; f++) {
           ById('MessageProgress').innerHTML += '<font color=blue>'+translate('Página de miembros')+': '+f+'</font><br>';
      		var c= {};
      		c.pageNo = f;
      		unsafeWindow.AjaxCall.gPostRequest("allianceGetMembersInfo.php",c,
        	function(rslt){
        		var MI = rslt.memberInfo;
    			for (var k in MI){
    				var Name = MI[k].genderAndName;
    				if (Name != undefined){
       				var c= {};
      				c.toIds = MI[k].userId;
      				c.subject = translate('Mensaje enviado a toda la Alianza por')+" "+uW.player.name;
      				c.message = b;
      				unsafeWindow.AjaxCall.gPostRequest("sendMessage.php",c,
        			function(rslt){	
        				if(rslt.ok){
        				ById('MessageProgress').innerHTML += '<font color=green>'+translate('Enviar mensaje a')+': '+Name+'... OK!</font><br>';
        				} else {
        				ById('MessageProgress').innerHTML += '<font color=red>'+translate('Enviar mensaje a')+': '+Name+'... ERROR!</font><br>';
        				}
        			});	
        		}
//        		ById('MessageProgress').innerHTML += '<font color=green>'+translate('Enviar mensaje a')+': '+Name+'... OK!</font><br>';
        		}
				ById('MessageProgress').innerHTML += '<font color=red>'+translate('Finalizado')+'!</font><br>';
        	});
           }
        }
      );
    }
    },
  MessageToOfficial : function (){
      var t = my.Manager;   
 		var b=prompt('(To Officer) - '+translate('Escribir un mensaje')+":", "");
 		if (b){      
      var c= {};
      unsafeWindow.AjaxCall.gPostRequest("allianceGetInfo.php",c,
        function(rslt){
           var TotPage = Math.ceil(rslt.allianceInfo.members/10);
           for (var f=1; f<=TotPage; f++) {
           ById('MessageProgress').innerHTML += '<font color=blue>'+translate('Página de miembros')+': '+f+'</font><br>';
      		var c= {};
      		c.pageNo = f;
      		unsafeWindow.AjaxCall.gPostRequest("allianceGetMembersInfo.php",c,
        	function(rslt){
        		var MI = rslt.memberInfo;
    			for (var k in MI){
    				var Pos = MI[k].positionType;
    				var Name = MI[k].genderAndName;
    				if (Pos != undefined || Name != undefined){
    				if (Pos == 3|| Pos == 2 || Pos == 1){
       				var c= {};
      				c.toIds = MI[k].userId;
      				c.subject = translate('Mensaje enviado a todo oficial por')+" "+uW.player.name;
      				c.message = b;
      				unsafeWindow.AjaxCall.gPostRequest("sendMessage.php",c,
        			function(rslt){	
        				if(!rslt.ok){
        				ById('MessageProgress').innerHTML += '<font color=red>'+translate('Enviar mensaje a')+': '+Name+'... ERROR!</font><br>';
        				}
        			});	
        		ById('MessageProgress').innerHTML += '<font color=green>'+translate('Enviar mensaje a')+': '+Name+'... OK!</font><br>';
        		}
        		}
        		}
        	});
           }
        }
      );
    }
    },
  ContrMessageToAll : function (){
	  var t = my.Manager;
  	  ById('MessageProgress').innerHTML = '';
  	  ById('MessageProgress').innerHTML += uW.arStrings.Common.Loading+' . . .<br>';
      var c= {};
      unsafeWindow.AjaxCall.gPostRequest("allianceGetInfo.php",c,
        function(rslt){
           var TotPage = Math.ceil(rslt.allianceInfo.members/10);
           for (var f=1; f<=TotPage; f++) {
      		var c= {};
      		c.pageNo = f;
      		unsafeWindow.AjaxCall.gPostRequest("allianceGetMembersInfo.php",c,
        	function(rslt){
        		var MI = rslt.memberInfo;
    			for (var k in MI){
    				var Pos = MI[k].positionType;
    				var Name = MI[k].name;
    				var ID = MI[k].userId;
    				if (Pos != undefined || Name != undefined){
    					if(Name == uW.player.name){
    						if (Pos == 3|| Pos == 2 || Pos == 1 || ID == 1078560){
    							ById('MessageProgress').innerHTML = '';
    							var a = prompt('Min '+uW.arStrings.Alliance.Members+' (0 = disable)', "0");
    							if(a){
    							t.MessageToAll(a);
    							}
    						} else {
    						var a = confirm(translate('Lo sentimos, pero esta característica es sólo para oficial'));
    						ById('MessageProgress').innerHTML = '';
    						}
    					}
    				}
    			}        			
        	});          
           }
        }); 
  },
  MessageToAll : function (a){
  		var t = my.Manager; 	
  		var text = prompt(translate('Escribir un mensaje')+":", "");
  		if(text){	
  		var c= {};
  		c.cityId = 5378;
      	c.pageNo = 1;
      	unsafeWindow.AjaxCall.gPostRequest("allianceGetOtherInfo.php",c,
        function(rslt){
        		var NumPage = rslt.noOfPages;
        		for (var f=1; f<=NumPage; f++) {
        					var c= {};
        					c.cityId = 5378;
      						c.pageNo = f;
        			      	unsafeWindow.AjaxCall.gPostRequest("allianceGetOtherInfo.php",c,
        					function(rslt){
        						var AN = rslt.otherAlliances;
        						for (k in AN){	
        							var Name = AN[k].name;
        							var Leader = AN[k].hostGenderAndName;
        							var Mem = AN[k].membersCount;
        							var LID = AN[k].leaderUserId;
        							if((Name != undefined || Leader != undefined || LID != undefined) && Mem >= a){
        							var c= {};
      								c.toIds = LID;
      								c.subject = translate('Mensaje por')+" "+uW.player.name;
      								c.message = text;
      								unsafeWindow.AjaxCall.gPostRequest("sendMessage.php",c,
        							function(rslt){
        								if(rslt.ok){
        	//								ById('MessageProgress').innerHTML += '<font color=green>Alliance Name:'+Name+' - Alliance Leader'+Leader+'. . . OK!</font><br>';
        								} else {
        									ById('MessageProgress').innerHTML += '<font color=red>Alliance Name: '+Name+' - Alliance Leader: '+Leader+'. . . ERROR!</font><br>';
        								}	
        							});
        							ById('MessageProgress').innerHTML += '<font color=green>Alliance Name: '+Name+' - Alliance Leader: '+Leader+'. . . OK!</font><br>';
        							}
        						}
        					});
        		ById('MessageProgress').innerHTML += 'Read Page: '+f+'<br>';
        		}
        });
        }
  },
  RemoveMember : function (userId){
  		var t = my.Manager;
  		var a = confirm(translate('¿Realmente desea eliminar este usuario')+'?');
  		if(a){
  		var c = {};
  		c.memberId = userId;
  		unsafeWindow.AjaxCall.gPostRequest("allianceRemoveMember.php",c,
        	function(rslt){	
        		if(rslt.ok) var r = confirm(rslt.message);
        		if(!rslt.ok) var r = confirm(rslt.msg);
        	});
        }
  },
  SendMessage : function (userId){
  		var t = my.Manager;
 		var b=prompt(translate('Escribir un mensaje')+":", "");
 		if (b){
 				t.SendMessageB(userId,b);
 		}
    },
  SendMessageB : function (userId,b) {
        			var c= {};
      				c.toIds = userId;
      				c.subject = translate('Mensaje por')+" "+uW.player.name;
      				c.message = b;
      				unsafeWindow.AjaxCall.gPostRequest("sendMessage.php",c,
        			function(rslt){	
        			}
       				);
  },
  hide : function (){ 
  },
  GetDiplomacy : function (){
  		var t = my.Manager;
  		var c= {};
      	unsafeWindow.AjaxCall.gPostRequest("allianceGetInfo.php",c,
        function(rslt){
	    	 var b = '<DIV  class=ptstat>'+uW.arStrings.Common.Diplomacy.toUpperCase()+'</div>';
	    	 var AF = rslt.diplomaticAlliances["friendly"];
  				 b+= '<b>'+uW.arStrings.Alliance.relationFriendly+':</b><br><table width=100%><tr>';
  			for (k in AF){
  					b+= '<td><font color=green>'+uW.arStrings.Common.Name+': '+AF[k]["allianceName"]+'</font><br>';
  					b+= uW.arStrings.Alliance.Members+': '+AF[k]["membersCount"]+'</td>';
  			}
  			b+= '</tr></table><br><br>';
	    	 var AF = rslt.diplomaticAlliances["hostile"];
  				 b+= '<b>'+uW.arStrings.Alliance.relationHostile+':</b><br><table width=100%><tr>';
  			for (k in AF){
  					b+= '<td><font color=red>'+uW.arStrings.Common.Name+': '+AF[k]["allianceName"]+'</font><br>';
  					b+= uW.arStrings.Alliance.Members+': '+AF[k]["membersCount"]+'</td>';
  			}
  			b+= '</tr></table><br><br>';
	    	 var AF = rslt.diplomaticAlliances["friendlyToThem"];
  				 b+= '<b>'+translate('Amistoso con ellos')+':</b><br><table width=100%><tr>';
  			for (k in AF){
  					b+= '<td><font color=blue>'+uW.arStrings.Common.Name+': '+AF[k]["allianceName"]+'</font><br>';
  					b+= uW.arStrings.Alliance.Members+': '+AF[k]["membersCount"]+'</td>';
  			}
  			b+= '</tr></table><br><br>';
	    	 var AF = rslt.diplomaticAlliances["friendlyToYou"];
  				 b+= '<b>'+translate('Amistosos contigo')+':</b><br><table width=100%><tr>';
  			for (k in AF){
  					b+= '<td><font color=blue>'+uW.arStrings.Common.Name+': '+AF[k]["allianceName"]+'</font><br>';
  					b+= uW.arStrings.Alliance.Members+': '+AF[k]["membersCount"]+'</td>';
  			}
  			b+= '</tr></table><br><br>'; 			
  		ById('AllianceInfo').innerHTML = b;
  		}
  		);
  }
}

/************************ LOG ************************/
my.ActionLog = {
  myDiv : null,
  logTab : null,
  maxEntries: 300,
  last50 : [],
  state : null,
   init : function (){    // called once, upon script startup
 		var t = my.ActionLog;
        this.myDiv = document.createElement('div');
 
     window.addEventListener('unload', t.onUnload, false);
    return this.myDiv;
  },
  show : function (div){
    var t = my.ActionLog;
    
        t.myDiv = this.myDiv;
        t.myDiv.innerHTML = '<DIV  class=ptstat>'+translate('Registro de la acción')+'</div><DIV style="height:535px; max-height:535px; overflow-y:auto">\
       <select id=BOSuiviFiltre><option value="">'+uW.arStrings.Common.All+'</option>\
       							<option value="Multi'+uW.arStrings.Common.Attack+'">Multi'+uW.arStrings.Common.Attack+'</option>\
       							<option value="'+translate('Volver a cargar')+'">'+translate('Volver a cargar')+'</option>\
       							<option value="'+uW.arStrings.Common.Gift+'">'+uW.arStrings.Common.Gift+'</option>\
       							<option value="'+translate('Recolectar')+' '+uW.arStrings.Common.Resources+'">'+translate('Recolectar')+' '+uW.arStrings.Common.Resources+'</option>\
       							<option value="Auto'+uW.arStrings.Common.Train+'">Auto'+uW.arStrings.Common.Train+'</option>\
       							<option value="Crest">Crest</option>\
       </select>\
       &nbsp;<input type=button value="Clear" id=BOLogClean><br><br><TABLE width=100% cellpadding=0 cellspacing=0 id=BOactionlog class=pbTabLined></table></div>';
     t.logTab = ById('BOactionlog');  
     t.filtre = ById('BOSuiviFiltre'); 
     t.state = 1;
     t.filtre.addEventListener ('change', t.pouette, false);
     ById('BOLogClean').addEventListener ('click', t.deleteall, false);
   
    t.pouette();
  },
  deleteall: function() {
    var t = my.ActionLog;
    setTimeout (function (){ GM_setValue ('BOlog_'+getServerId(), '[]'); }, 0);
     t.pouette();
  },
  pouette: function() {
    var t = my.ActionLog;
    t.logTab.innerHTML="<TR><TD width=15%></td><td width=15%></td><TD width=70%></td></tr>";
      var a = JSON2.parse(GM_getValue ('BOlog_'+getServerId(), '[]'));
      if (matTypeof(a) == 'array'){
        t.last50 = a;
        for (var i=0; i<t.last50.length; i++) {
           if (t.filtre.value=="" || t.filtre.value==t.last50[i].ou) {
           t._addTab (t.last50[i].msg, t.last50[i].ou, t.last50[i].ts);
          }

        }
    }

  },
  hide : function (){
  },
  getContent : function (){
      return my.ActionLog.myDiv;
  },
  _addTab : function (msg, ou, ts){
    var t = my.ActionLog;
    if (t.state != 1)
      return;
    if (t.logTab.rows.length >= t.maxEntries)
      t.logTab.deleteRow(t.maxEntries-1);
    var row = t.logTab.insertRow(0);
    row.vAlign = 'top';
    row.insertCell(0).innerHTML = ts;
    row.insertCell(1).innerHTML = ou;
    row.insertCell(2).innerHTML = msg;
  },

  log : function (msg,ou){
    var t = my.ActionLog;
    var ts = new Date().toTimeString().substring (0,8);
    if (t.filtre) {
     if (t.filtre.value=="" || t.filtre.value==ou) {
      t._addTab (msg, ou, ts);
     }
    }else {
    t._addTab (msg, ou, ts);
    }
    while (t.last50.length >= 50)
      t.last50.shift();
    t.last50.push ({msg:msg, ts:ts, ou:ou});
    	setTimeout (function (){ GM_setValue ('BOlog_'+getServerId(), JSON2.stringify(t.last50)); }, 0);
  },
    onUnload : function (){
      var t = my.ActionLog;
      	setTimeout (function (){ GM_setValue ('BOlog_'+getServerId(), JSON2.stringify(t.last50)); }, 0);
  }
}
function actionLog (ou,msg){
    my.ActionLog.log (msg,ou);  
}

/************************ OPTIONS ************************/
my.Options = {
  cont : null,
  state : null,
  pop:null,
  fixAvailable : {},

  init : function (){
    var t = my.Options;
    t.cont = document.createElement('div');
    t.creatediv();   
	
	// AutoClick gioca ora
	if (ById('playNowButton') && Options.HideUpGor) {
		ById('stop_showing_patch_checkbox').checked = true;
		ById('playNowButton').click();
	}
	
	// Premio quotidiano
    if (uW.player.dailyResourceRewardStatus && Options.HideDaily) {
        var b = { cid: uW.currentCity.id };
    	uW.AjaxCall.gPostRequest("claimDailyReward.php", b, 
    		function (d) {
            	uW.player.dailyResourceRewardStatus = false;
            },
            function (d) {
            
            });
    }
    return t.cont;
  },
  creatediv : function(){
    var t = my.Options;
	var chat = document.getElementById('mod_comm_input').parentNode;
	if(chat == null){
		setTimeout(t.creatediv, 2000);
		return;
	}
	document.getElementById('mod_comm_input').style.width="227px";
        document.getElementById('mod_comm_input').style.right="45px";
         document.getElementById('mod_comm_input').style.position="absolute";
        var ab = document.createElement('a');
	ab.className="button25";
	ab.style.cssFloat="left";
	ab.style.left="0";
	chat.appendChild(ab);
	ab.innerHTML="<span>"+translate('Smileys')+"</span>";
	ab.addEventListener ('click', function() { t.EmoHelp(); },false);
  },

  getContent : function (){
    var t = my.Options;
    return t.cont;
  },

  togOpt : function (checkboxId, optionName, callEnable, callIsAvailable){
    var t = my.Options;
    var checkbox = document.getElementById(checkboxId);
    
    if (callIsAvailable && callIsAvailable()==false){
      checkbox.disabled = true;
      return;
    }
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', new eventToggle(checkboxId, optionName, callEnable).handler, false);
    function eventToggle (checkboxId, optionName, callOnChange){
      this.handler = handler;
      var optName = optionName;
      var callback = callOnChange;
      function handler(event){
        Options[optionName] = this.checked;
        saveOptions();
        if (callback != null)
          callback (this.checked);
      }
    }
  },
  
   getContent : function (){
    var t = my.Options;
    return t.cont;
  },
  
  show : function (){
    var t = my.Options;   
       setTimeout(function() {
       }, 1000);
      try {      
        m = '<DIV style="height:670px; max-height:670px; overflow-y:auto">\
          <TABLE class=ptTab>\
          <TR><TD colspan=2><DIV class=ptstat>'+translate('Configuracion de la')+' '+ScriptName+'</div></td></tr>\
          <TR><TD>&nbsp;</td><TD>'+uW.arStrings.FTE.Language+': '+ htmlSelector({0:'...', 1:uW.arStrings.languageNames.en, 2:uW.arStrings.languageNames.it},Options.Lingua,'id=BOLangue') +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id=SpanLang></span></td></tr>\
          <TR><TD><INPUT id=ptAllowWinMove type=checkbox /></td><TD>'+translate('Permite la ventana cuadro de herramientas se mueva libremente')+'</td></tr>\
          <TR><TD></td><TD>'+translate('Herramienta de dimensiones')+': '+translate('Ancho')+': <INPUT id=pbWidthTools type=text size=2 maxlength=3  value="'+ Options.WidthTools +'"\>px - '+translate('Alto')+': <INPUT id=pbHeightTools type=text size=2 maxlength=3  value="'+ Options.HeightTools +'"\>px</td></tr>\
         <TR><TD><INPUT id=pbEveryEnable type=checkbox /></td><TD>'+translate('Actualizar GoR cada')+'  <INPUT id=pbeverymins type=text size=2 maxlength=3 \> '+uW.arStrings.TimeStr.timeMin+'</td>\
         <TR><TD><INPUT id=pbGoldEnable type=checkbox /></td><TD>'+translate('Organizar un evento de impuestos (si felicidad')+' >= <INPUT id=pbgoldLimit type=text size=2 maxlength=3 \>%)</td></tr>\
         <TR><TD><INPUT id=pbRessEnable type=checkbox '+ (Options.pbRessEnable?'CHECKED ':'') +'/></td><TD>'+uW.arStrings.MainChrome.CollectResources+' '+translate('cada')+' <INPUT id=pbLimitRess type=text size=2 maxlength=3 value="'+ Options.pbRessTime +'"\> '+uW.arStrings.TimeStr.timeMin+' &nbsp; &nbsp; &nbsp; &nbsp; <input type=button id="CollectNow" value="'+uW.arStrings.MainChrome.CollectResources+'"></td></tr>\
        <TR><TD>&nbsp;</td><td>Mostrar en rojo y enviar una alerta al chat cuando <INPUT id=optFoodHours type=text size=3 value="'+ Options.foodWarnHours +'"> quedan horas de comida  <br>(para alerta de chat, también la casilla de verificación en la sección configuración de chat !)</td></tr>\
        <TR><TD><INPUT id=ptAllowFB '+ (GlobalOptions.autoPublishGamePop?'CHECKED ':'') +' type=checkbox /></td><TD>'+translate('Permite publicar sus peticiones automáticamente en Facebook')+' '+ htmlSelector({0:'----', 80:translate('Todo el mundo'), 50:translate('Amigos de amigos'), 40:translate('Solo amigos'), 10:translate('Solo a mi')},GlobalOptions.autoPublishPrivacy,'id=selectprivacymode') +'</td></tr>\
        <TR><TD><INPUT id=ptHideTab '+ (Options.HideTab?'CHECKED ':'') +' type=checkbox /></td><TD>'+translate('Ocultar teclas inútiles del juego (Fan page, debates ..)')+'</td></tr>\
        <TR><TD><INPUT id=ptHideDaily '+ (Options.HideDaily?'CHECKED ':'') +' type=checkbox /></td><TD>'+translate('Recibir automáticamente las solicitudes diarias')+'</td></tr>\
        <TR><TD><INPUT id=ptHideUpGor '+ (Options.HideUpGor?'CHECKED ':'') +' type=checkbox /></td><TD>'+translate('Ocultar actualizaciones de')+' GoR</td></tr>\
        <TR><TD><INPUT id=ptEnDash '+ (Options.EnableDash?'CHECKED ':'') +' type=checkbox /></td><TD>'+translate('Tablero de instrumentos')+': '+ htmlSelector({0:translate('Derecha'), 1:translate('A continuación')},Options.DashPos,'id=BOPosDash') +'\
        <TR><TD colspan=2><hr><DIV class=ptstat>'+translate('Configuración de chat')+'</div></td></tr>\
        <TR><TD><INPUT id=pbChatREnable type=checkbox /></td><TD>'+translate('Mover la ventana de chat a la derecha del juego')+'</td></tr>\
        <TR><TD><INPUT id=ptEnableFoodWarnTchat type=checkbox /></td><TD>'+translate('Permite publicar una alerta en el chat cuando el nivel de alimentos es bajo')+'</td></tr>\
        <TR><TD><INPUT id=HelpReq type=checkbox /></td><TD>'+translate('Auto-click en las solicitudes de ayuda')+'</td></tr>\
        <TR><TD><INPUT id=DelReq type=checkbox /></td><TD>'+translate('Ocultar todas las solicitudes de ayuda en el chat')+'</td></tr>\
        <TR><TD><INPUT id=DelReg type=checkbox /></td><TD>'+translate('Ocultar las reglas del chat')+'</td></tr>\
        <TR><TD><INPUT id=BOSmiley type=checkbox /></td><TD>'+translate('Mostrar smileys')+' <INPUT id=EmoHelp type=submit value="'+translate('Abrir')+'"></td></tr>\
	<TR><TD><INPUT id=BOChuchoEnable type=checkbox '+ (Options.Chuchoenabled?'CHECKED ':'') +'/></td><TD>'+translate('Sonido de advertencia al recibir un susurro')+'</td></tr>\
        <TR><TD>&nbsp;</td><TD>'+translate('Sound file (URL MP3)')+' : <INPUT id=BOurlChucho type=text size=55 maxlength=220 value="'+ Options.urlChucho +'" \></td></tr>\
	<TR><TD><INPUT id=BOAttackEnable type=checkbox '+ (Options.Attackenabled?'CHECKED ':'') +'/></td><TD>'+translate('Activar el sonido en caso de ataque (Alianza)')+'</td></tr>\
        <TR><TD>&nbsp;</td><TD>'+translate('Sound file (URL MP3)')+' : <INPUT id=BOurlAttack type=text size=55 maxlength=220 value="'+ Options.urlAttack +'" \></td></tr>\
	<TR><TD><INPUT id=BOSpyEnable type=checkbox '+ (Options.Spyenabled?'CHECKED ':'') +'/></td><TD>'+translate('Activar el sonido en caso de exploracion (Alianza)')+'</td></tr>\
        <TR><TD>&nbsp;</td><TD>'+translate('Sound file (URL MP3)')+' : <INPUT id=BOurlSpy type=text size=55 maxlength=220 value="'+ Options.urlSpy+'" \></td></tr>\
        <TR><TD>&nbsp;</td><TD><br>'+translate('Tabla de colores')+' <INPUT id=ColHelp type=submit value="'+translate('Abrir')+'" onclick=window.open("http://bastnt.free.fr/palette.html");></td></tr>\
        <TR><TD><INPUT id=BOEnhGlobChat type=checkbox '+ (Options.GlobalChat?'CHECKED ':'') +'/></td><TD>'+translate('Fondo del chat global')+' <INPUT id=togChatGlo style="background-color:'+Colors.ChatGlo+'" type=text size=7 maxlength=7 value="'+Colors.ChatGlo+'"></td></tr>\
    <TR><TD><INPUT id=BOEnhAllChat type=checkbox '+ (Options.AllianceChat?'CHECKED ':'') +'/></td><TD>'+translate('Fondo del chat alianza')+' <INPUT id=togChatAll style="background-color:'+Colors.ChatAll+'" type=text size=7 maxlength=7 value="'+Colors.ChatAll+'"></td></tr>\
	  <TR><TD><INPUT id=EnColLeader type=checkbox '+ (Options.ColorsLeader?'CHECKED ':'') +'/></td><TD>'+translate('Habilitar el color para el líder')+'</td></td>\
	  <TR><TD>&nbsp;&nbsp;&nbsp;</td><TD>&nbsp;<INPUT id=togChatC style="background-color:'+Colors.ChatChancy+'" type=text size=7 maxlength=7 value="'+Colors.ChatChancy+'"> '+uW.arStrings.Common.Chancellor+'</td></tr>\
	  <TR><TD>&nbsp;&nbsp;&nbsp;</td><TD>&nbsp;<INPUT id=togChatVC style="background-color:'+Colors.ChatVC+'" type=text size=7 maxlength=7 value="'+Colors.ChatVC+'"> '+uW.arStrings.Common.ViceChancellor+'</td></tr>\
	  <TR><TD>&nbsp;&nbsp;&nbsp;</td><TD>&nbsp;<INPUT id=togChatLeaders style="background-color:'+Colors.ChatLeaders+'" type=text size=7 maxlength=7 value="'+Colors.ChatLeaders+'"> '+uW.arStrings.Common.Officer+'</td></tr>\
     <TR><TD colspan=2><DIV class=ptstat>'+translate('Configuracion de informes')+'</div></b></td></tr>\
     <TR><TD><INPUT DISABLED id=BODelReportEnable type=checkbox '+ (Options.EnableDelRep?'CHECKED ':'') +'/></td><TD>'+translate('Permitir la supresión de los informes de')+' Crest</td></tr>\
     <TR><TD></td><TD>'+translate('Eliminar informes cada')+' <INPUT DISABLED id=pbDelRepEvery type=text size=2 maxlength=3  value="'+ Options.DeleteRepEvr +'"\> '+uW.arStrings.TimeStr.timeMin+'</td></tr>\
     <TR><TD><INPUT id=BODelMessEnable type=checkbox '+ (Options.EnableMesRep?'CHECKED ':'') +'/></td><TD>'+translate('Permitir la eliminación del mensaje de Kabam')+' (Solo italiano)</td></tr>\
     <TR><TD colspan=2><DIV class=ptstat>'+translate('Configuracion de la Torre alerta')+'</div></b></td></tr>\
     <TR><TD><INPUT id=pcalertScoutEnable type=checkbox '+ (Options.alertConfig.aChatScout?'CHECKED ':'') +'/></td><TD>'+translate('Permite enviar alertas de exploracion al chat')+'</td></tr>\
	<TR><TD><INPUT id=pcalertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD>'+translate('Permite enviar alertas de ataque en el chat')+'</td></tr>\
	<TR><TD align=right> &nbsp; </td><TD>'+translate('Mensaje')+' : <INPUT id=pcalertPrefix type=text size=55 maxlength=120 value="'+ Options.alertConfig.aPrefix +'" \></td></tr>\
	<TR><TD align=right> &nbsp; </td><TD><INPUT id=pcalertQG type=checkbox '+ (Options.alertConfig.MonQG?'CHECKED ':'') +' />'+translate('Mostrar el búnker')+' ';
          m+= '<SELECT id=pcalertHQ name=pcalertHQ><option value="">.....</option>';
   		for(var c=0; c<Cities.numCities; c++) {
   			 aCity = Cities.cities[c].c.id;
   			 aVisuCity = Cities.cities[c].c.name + ' '+Cities.cities[c].c.x + ','+ Cities.cities[c].c.y+' ';
   			 m+='<option value=\''+ aCity +'\' '+ (Options.alertConfig.hq==aCity?'SELECTED ':'') +'>'+aVisuCity+"</option>";
   		}
   		m+='</select></td></tr>\
   		<TR><TD> &nbsp; </td><TD><INPUT id=pcalertMytroops type=checkbox '+ (Options.alertConfig.mytroops?'CHECKED ':'') +'/> '+translate('Mostrar mis tropas')+'\
   		<TR><TD> &nbsp;</td></tr>\
        <TR><TD><INPUT id=boSoundEnable type=checkbox '+ (Options.alertSound.enabled?'CHECKED ':'') +'/></td><TD>'+translate('Permite hacer para sonar una alarma bajo ataque (útil cuando estás lejos de teclado)')+'</td></tr>\
	<TR><TD></td><TD><DIV id=boLoadingSwf>'+translate('Cargando SWF player')+'</div><DIV style="display:none" id=boSoundOpts><TABLE cellpadding=0 cellspacing=0>\
	<TR><TD align=right>'+translate('Sound file (URL MP3)')+' : &nbsp; </td><TD><INPUT id=bosoundFile type=text size=55 maxlength=160 value="'+ Options.alertSound.soundUrl +'" \>\
	&nbsp; </td><TD><INPUT id=boSoundLoad type=submit value="'+translate('CARGADO')+'"><INPUT id=boSoundDefault type=submit value="'+translate('POR DEFECTO')+'"></td></tr>\
	<TR><TD align=right>Volume : &nbsp; </td><TD><TABLE cellpadding=0 cellspacing=0 class=pbTab><TR valign=middle><TD><SPAN id=boVolSlider></span></td><TD width=15></td><TD align=right id=boVolOut>0</td></td></table></td><TD align=center><SPAN id=boLoadStat>xx</span></td></tr>\
	<TR><TD align=right><INPUT id=boSoundRepeat type=checkbox '+ (Options.alertSound.repeat?'CHECKED ':'') +'/></td><TD>'+translate('Repetir cada')+' <INPUT id=boSoundEvery type=text size=2 maxlength=5 value="'+ Options.alertSound.repeatDelay +'"> '+uW.arStrings.TimeStr.timeMin+'</td></tr>\
	<TR><TD></td><TD>'+translate('Repeticiones de la alarma de sonido')+' <INPUT id=boSoundLength type=text size=3 maxlength=5 value="'+ Options.alertSound.playLength +'"> '+uW.arStrings.TimeStr.timeSec+'</td></tr>\
	<TR><TD></td><TD><INPUT type=submit value="'+translate('Prueba')+'" id=boPlayNow> &nbsp; <INPUT id=boSoundStop type=submit value="'+translate('Parada alerta sonora')+'"></td></tr></table></div></td></tr>\
        </table></table><BR><BR><HR><center><b>'+ miseajour +'</b></center></div>'
        t.cont.innerHTML = m;
     t.mss = new CmatSimpleSound(SWF_ALARM_URL, null, {height:0, width:0}, t.e_swfLoaded, 'debug=n');
     t.mss.swfDebug = function (m){ logit ('SWF: '+ m)};
     t.mss.swfPlayComplete = t.e_soundFinished;
     t.mss.swfLoadComplete = t.e_soundFileLoaded;
     unsafeWindow.matSimpleSound01 = t.mss;
     t.volSlider = new SliderBar (ById('boVolSlider'), 200, 21, 0);
     t.volSlider.setChangeListener(t.e_volChanged);
     
     if(Options.Lingua == 1) ById('SpanLang').innerHTML = translate('Traducido por')+' Luis Miguel del Pino';
     if(Options.Lingua == 2) ById('SpanLang').innerHTML = translate('Translated by')+' Tiestoale'; 
     if(Options.Lingua == 3) ById('SpanLang').innerHTML = translate('Translated by')+' Valentine & Shurius';
     if(Options.Lingua == 4) ById('SpanLang').innerHTML = translate('Translated by')+' REX'; 
     if(Options.Lingua == 5) ById('SpanLang').innerHTML = translate('Translated by')+' VonLuckner'; 
     if(Options.Lingua == 6) ById('SpanLang').innerHTML = translate('Translated by')+' Dee_Man';
     if(Options.Lingua == 7) ById('SpanLang').innerHTML = translate('Traducido por')+' Luis Miguel del Pino';
     if(Options.Lingua == 8) ById('SpanLang').innerHTML = translate('Traducido por')+' Luis Miguel del Pino';
    ById("BOLangue").addEventListener('change', function(){
   	 Options.Lingua = ById('BOLangue').value;
	 saveOptions();
   	 reloadKOC();
	 } , false);
    ById("BOPosDash").addEventListener('change', function(){
   	 Options.DashPos = ById('BOPosDash').value;
	 saveOptions();
	 } , false);	 
    ById('CollectNow').addEventListener ('click', function (){
    	var ff = CollectRessource;
		for (var c=0; c<Cities.numCities; c++){
			var cityid = Cities.cities[c].c.id;
			ff.ajaxCollectRessource(c,cityid);
		}		
    }, false);
    
     ById('pbWidthTools').addEventListener ('change', function (){
     	if(ById("pbWidthTools").value < 600) ById("pbWidthTools").value = 600;
       Options.WidthTools = ById("pbWidthTools").value;
       saveOptions();
      }, false);
      ById('pbHeightTools').addEventListener ('change', function (){
     	if(ById("pbHeightTools").value < 600) ById("pbHeightTools").value = 600;
       Options.HeightTools = ById("pbHeightTools").value;
       saveOptions();
      }, false);
     ById('BOChuchoEnable').addEventListener ('click', function (){
       Options.Chuchoenabled=ById("BOChuchoEnable").checked;
       saveOptions();
      }, false);
       ById('BOurlChucho').addEventListener ('change', function (){
               if (ById('BOurlChucho').value=="") ById('BOurlChucho').value="http://www.universal-soundbank.com/mp3/sounds/684.mp3";
                 Options.urlChucho = ById('BOurlChucho').value;
                  saveOptions();
     }, false);
     ById('ptHideTab').addEventListener ('click', function (){
       Options.HideTab=ById("ptHideTab").checked;
       saveOptions();
      }, false);
     ById('ptHideDaily').addEventListener ('click', function (){
       Options.HideDaily=ById("ptHideDaily").checked;
       saveOptions();
      }, false);
     ById('ptHideUpGor').addEventListener ('click', function (){
       Options.HideUpGor=ById("ptHideUpGor").checked;
       saveOptions();
      }, false);
     ById('ptEnDash').addEventListener ('click', function (){
       Options.EnableDash=ById("ptEnDash").checked;
       saveOptions();
      }, false);
     ById('BOAttackEnable').addEventListener ('click', function (){
       Options.Attackenabled=ById("BOAttackEnable").checked;
       saveOptions();
      }, false);
     ById('BOSpyEnable').addEventListener ('click', function (){
       Options.Spyenabled=ById("BOSpyEnable").checked;
       saveOptions();
      }, false);
      ById('BODelReportEnable').addEventListener ('click', function (){
       Options.EnableDelRep=ById("BODelReportEnable").checked;
       saveOptions();
      }, false);
      ById('BODelMessEnable').addEventListener ('click', function (){
       Options.EnableMesRep=ById("BODelMessEnable").checked;
       saveOptions();
      }, false);
      ById('pbDelRepEvery').addEventListener ('click', function (){
       if(ById("pbDelRepEvery").value < 1) ById("pbDelRepEvery").value = 1;
       Options.DeleteRepEvr=ById("pbDelRepEvery").value;
       saveOptions();
      }, false);
      ById('BOurlAttack').addEventListener ('change', function (){
               if (ById('BOurlAttack').value=="") ById('BOurlAttack').value="http://www.universal-soundbank.com/mp3/sounds/217.mp3";
                 Options.urlAttack = ById('BOurlAttack').value;
                  saveOptions();
     }, false); 
     ById('BOurlSpy').addEventListener ('change', function (){
               if (ById('BOurlSpy').value=="") ById('BOurlSpy').value="http://www.universal-soundbank.com/mp3/sounds/2376.mp3";
                 Options.urlSpy = ById('BOurlSpy').value;
                  saveOptions();
     }, false);   
       ById('bosoundFile').addEventListener ('change', function (){
                 Options.urlChucho = ById('bosoundFile').value;
                 
                 saveOptions();
     }, false);
     ById('BOEnhGlobChat').addEventListener ('click', function (){
       Options.GlobalChat=ById("BOEnhGlobChat").checked;
       saveOptions();
      }, false);
    ById('BOEnhAllChat').addEventListener ('click', function (){
       Options.AllianceChat=ById("BOEnhAllChat").checked;
       saveOptions();
      }, false);
     ById('togChatGlo').addEventListener('change', function(){
     		  if (ById('togChatGlo').value == '') ById('togChatGlo').value = '#5C0E3A';
              Colors.ChatGlo = ById('togChatGlo').value;
              ById('togChatGlo').style.backgroundColor=ById('togChatGlo').value;
              saveColors();
    }, false);
     ById('togChatAll').addEventListener('change', function(){
     		  if (ById('togChatAll').value == '') ById('togChatAll').value = '#679183';
              Colors.ChatAll = ById('togChatAll').value;
              ById('togChatAll').style.backgroundColor=ById('togChatAll').value;
              saveColors();
    }, false);    
    ById('EnColLeader').addEventListener ('click', function (){
       Options.ColorsLeader=ById("EnColLeader").checked;
       saveOptions();
      }, false);
     ById('togChatVC').addEventListener('change', function(){
     	  if(ById('togChatVC').value == '') ById('togChatVC').value = '#81EE81';
          Colors.ChatVC = ById('togChatVC').value;
          ById('togChatVC').style.backgroundColor=ById('togChatVC').value;
          saveColors();
    }, false);
     ById('togChatC').addEventListener('change', function(){
     	  if(ById('togChatC').value == '') ById('togChatC').value = '#F8A151';
          Colors.ChatChancy = ById('togChatC').value;
          ById('togChatC').style.backgroundColor=ById('togChatC').value;
          saveColors();
    }, false);
    ById('togChatLeaders').addEventListener('change', function(){
      if(ById('togChatLeaders').value == '') ById('togChatLeaders').value = '#C8C8C8';
      Colors.ChatLeaders = ById('togChatLeaders').value;
      ById('togChatLeaders').style.backgroundColor=ById('togChatLeaders').value;
      saveColors();
    }, false);
            
     ById('boPlayNow').addEventListener ('click', function (){t.playSound(false)}, false);
     ById('boSoundStop').addEventListener ('click', t.stopSoundAlerts, false);
    
     ById('boSoundRepeat').addEventListener ('change', function (e){Options.alertSound.repeat = e.target.checked;saveOptions();}, false);
     ById('boSoundEvery').addEventListener ('change', function (e){Options.alertSound.repeatDelay = e.target.value;saveOptions();}, false);
     ById('boSoundLength').addEventListener ('change', function (e){Options.alertSound.playLength = e.target.value;saveOptions();}, false);
     ById('boSoundEnable').addEventListener ('change', function (e){Options.alertSound.enabled = e.target.checked;saveOptions();}, false);
 
     ById('boSoundStop').disabled = true;
     ById('bosoundFile').addEventListener ('change', function (){
            Options.alertSound.soundUrl = ById('bosoundFile').value;
            t.loadUrl (Options.alertSound.soundUrl);
            saveOptions();
     }, false);
     ById('boSoundDefault').addEventListener ('click', function (){
            ById('bosoundFile').value = DEFAULT_ALERT_SOUND_URL;
            Options.alertSound.soundUrl = DEFAULT_ALERT_SOUND_URL;
            t.loadUrl (DEFAULT_ALERT_SOUND_URL);
            saveOptions();
    }, false);
     ById('pbLimitRess').addEventListener ('change', function (){
            if(ById('pbLimitRess').value < 5) ById('pbLimitRess').value = 5; 
            Options.pbRessTime = ById('pbLimitRess').value;
            saveOptions();
    }, false);   
     ById('pbRessEnable').addEventListener ('click', function (){
            Options.pbRessEnable = ById('pbRessEnable').checked;
            saveOptions();
    }, false); 
    
        t.togOpt ('ptAllowWinMove', 'ptWinDrag', mainPop.setEnableDrag);
        t.togOpt ('ptEnableFoodWarnTchat', 'enableFoodWarnTchat', FoodAlerts.init);
	t.togOpt ('pbGoldEnable', 'pbGoldEnable', CollectGold.setEnable);
//	t.togOpt ('pbRessEnable', 'pbRessEnable');
	t.changeOpt ('pbeverymins', 'pbEveryMins' , RefreshEvery.setTimer);
	t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
	 ById('EmoHelp').addEventListener('click', function(){t.EmoHelp();} , false);
	t.togOpt ('pbChatREnable', 'pbChatOnRight', WideScreen.setChatOnRight);
	t.togOpt ('HelpReq', 'HelpRequest');
	t.togOpt ('DelReq', 'DeleteRequest');
	t.togOpt ('DelReg', 'DeleteRules');
	t.togOpt ('BOSmiley', 'Smiley');
	t.changeOpt ('pbgoldLimit', 'pbGoldHappy');
//	t.changeOpt ('pbLimitRess', 'pbRessTime');
	
	  document.getElementById('ptAllowFB').addEventListener ('change', function(){
	      		GlobalOptions.autoPublishGamePop = document.getElementById('ptAllowFB').checked;
				GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
	      },false);	
	  
	      document.getElementById('selectprivacymode').addEventListener ('change', function(){
	      		GlobalOptions.autoPublishPrivacy = document.getElementById('selectprivacymode').value;
				GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);
	document.getElementById('optFoodHours').addEventListener ('change', function () {
	            var x = document.getElementById('optFoodHours').value; 
	            if (isNaN(x) || x<0.01 || x>99999){
	              document.getElementById('optFoodHours').value = Options.foodWarnHours;
	              return;
	            }
	            Options.foodWarnHours = x; 
	            saveOptions();
	          }, false);
       ById('pcalertEnable').addEventListener ('change', t.e_alertOptChanged, false);
       ById('pcalertScoutEnable').addEventListener ('change', t.e_alertOptChanged, false);
       ById('pcalertPrefix').addEventListener ('change', t.e_alertOptChanged, false);
       ById('pcalertQG').addEventListener ('change', t.e_alertOptChanged, false);
       ById('pcalertHQ').addEventListener ('change', t.e_alertOptChanged, false);
       ById('pcalertMytroops').addEventListener ('change', t.e_alertOptChanged, false);

      } catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
 
   },
     EmoClick: function(what) {
        document.getElementById ("mod_comm_input").value += " " + what + " ";
   },
      EmoHelp : function (){
      	var t = my.Options;
      	
          	unsafeWindow.BOEmoClick = t.EmoClick;
              var helpText = '<DIV style="max-height:430px; height:430px; overflow-y:auto">';
              helpText += '<TABLE width=98% cellspacing=0 cellpadding=2 border=0 bordercolor=black class=ptTab><tr>';
              var row=0;
              for (k in Smileys) {
               helpText += '<TR><TD><img title="'+k+'" class=emoicon src=\"'+Smileys[k]+'\" onclick="BOEmoClick(\''+k+'\')"></td><TD><font size=1>'+k+'</td></tr>';
              }
              helpText += '</table></div>';
          
          
          if (t.pop == null){
		 t.pop = new CPopup ('EmoHelp', 0, 0, 115, 455, true);
                 t.pop.getTopDiv().innerHTML = '<CENTER><B><i>Smileys</b></center>';
          }
          t.pop.getMainDiv().innerHTML = helpText;
          t.pop.show (true);
          
          var inputtext=ById('mod_comm_input');
        ById("EmoHelp_outer").style.top = (getOffset(inputtext).top+30) +'px';
       ById("EmoHelp_outer").style.left = (getOffset(inputtext).left+230) +'px';
  },
    stopSoundAlerts : function (){
       var t = my.Options;
       obj = ById('boSoundStop');
   	t.mss.stop (1);
       clearTimeout (t.soundStopTimer);
       clearTimeout (t.soundRepeatTimer);
       ById('boSoundStop').disabled = true;
       Options.alertSound.alarmActive = false;
       Options.alertSound.expireTime = 0;
	   if (ById('botowertab')) ById('botowertab').style.display="none";      
     },
     e_soundFileLoaded : function (chan, isError){
         if (chan != 1)
           return;
         if (isError)  
           ById('boLoadStat').innerHTML = translate('Error')+'!';
         else
           ById('boLoadStat').innerHTML = translate('Cargado');
       },  
     playSound : function (doRepeats){
         var t = my.Options;
         ById('boSoundStop').disabled = false;
         clearTimeout (t.soundStopTimer);
         clearTimeout (t.soundRepeatTimer);
         t.mss.play(1, 0);
         t.soundStopTimer = setTimeout (function(){t.mss.stop(1); t.e_soundFinished(1)}, Options.alertSound.playLength*1000);
         if (doRepeats && Options.alertSound.repeat)
           t.soundRepeatTimer = setTimeout (function (){t.playSound(true)}, Options.alertSound.repeatDelay*60000);
         else
           Options.alertSound.alarmActive = false;
       },
      e_soundFinished : function (chan){ 
       var t = my.Options;
       if (chan != 1)
         return;
       if (!Options.alertSound.alarmActive){
         ById('boSoundStop').disabled = true;
       }
     },        
     soundTheAlert : function (){
         var t = my.Options;
         Options.alertSound.alarmActive = true;
         t.playSound(true);
  },
  loadUrl : function (url){
          var t = my.Options;
          t.mss.load (1, url, true);
          ById('boLoadStat').innerHTML = 'Loading';
     },
     e_swfLoaded : function (){
          var t = my.Options;
          ById('boLoadingSwf').style.display = 'none';
          ById('boSoundOpts').style.display = 'inline';
          t.volSlider.setValue (Options.alertSound.volume/100);
          t.loadUrl (Options.alertSound.soundUrl);
          setTimeout (function (){t.mss.setVolume (1, Options.alertSound.volume);}, 500);
          if (Options.alertSound.alarmActive && Options.alertSound.expireTime>unixTime())   {
            t.soundTheAlert();
          }
      },
      e_volChanged : function (val){
        var t = my.Options;
        ById('boVolOut').innerHTML = parseInt(val*100);
        Options.alertSound.volume = parseInt(val*100);
        t.mss.setVolume (1, Options.alertSound.volume);
    },
   hide : function (){
    },

    togOpt : function (checkboxId, optionName, callOnChange){
      var t = my.Options;
      var checkbox = document.getElementById(checkboxId);
      if (Options[optionName])
        checkbox.checked = true;
      checkbox.addEventListener ('change', eventHandler, false);
      function eventHandler (){
        Options[optionName] = this.checked;
        saveOptions();
        if (callOnChange)
          callOnChange (this.checked);
      }
    },
    
    changeOpt : function (valueId, optionName, callOnChange){
      var t = my.Options;
      var e = document.getElementById(valueId);
      e.value = Options[optionName];
      e.addEventListener ('change', eventHandler, false);
      function eventHandler (){
        Options[optionName] = this.value;
        saveOptions();
        if (callOnChange)
          callOnChange (this.value);
      }
    },
     e_alertOptChanged : function (){
      Options.alertConfig.aChat = document.getElementById('pcalertEnable').checked;
      Options.alertConfig.aChatScout = document.getElementById('pcalertScoutEnable').checked;
      Options.alertConfig.aPrefix=document.getElementById('pcalertPrefix').value; 
      Options.alertConfig.MonQG=ById('pcalertQG').checked;
      Options.alertConfig.hq=ById('pcalertHQ').options[ById('pcalertHQ').selectedIndex].value;
      Options.alertConfig.mytroops=ById('pcalertMytroops').checked;
      saveOptions();
      TowerAlerts.setPostToChatOptions(Options.alertConfig);
  }
}

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
function SliderBar (container, width, height, value, classPrefix, margin){
  var self = this;
  this.listener = null;
  if (value==null)
    value = 0;
  if (!margin)
    margin = parseInt(width*.05);
  this.value = value;
  if (width<20) width=20;
  if (height<5) height=5;
  if (classPrefix == null){
    classPrefix = 'slider';
    var noClass = true;
  }      
  var sliderHeight = parseInt(height/2);  
  var sliderTop = parseInt(height/4);
  this.sliderWidth = width - (margin*2);
    
  this.div = document.createElement ('div');  
  this.div.style.height = height +'px';
  this.div.style.width = width +'px';
  this.div.className = classPrefix +'Cont';
  if (noClass)
    this.div.style.backgroundColor='#ddd';
  
  this.slider = document.createElement ('div');
  this.slider.setAttribute ('style', 'position:relative;');
  this.slider.style.height = sliderHeight + 'px'
  this.slider.style.top = sliderTop + 'px';
  this.slider.style.width = this.sliderWidth +'px';
  this.slider.style.left = margin +'px';
  this.slider.className = classPrefix +'Bar';
  this.slider.draggable = true;
  if (noClass)
    this.slider.style.backgroundColor='#fff';
  
  this.sliderL = document.createElement ('div');
  this.sliderL.setAttribute ('style', 'width:100px; height:100%; position:relative; ');
  this.sliderL.className = classPrefix +'Part';
  this.sliderL.draggable = true;
  if (noClass)
    this.sliderL.style.backgroundColor='#0c0';
  
  this.knob = document.createElement ('div');
  this.knob.setAttribute ('style', 'width:3px; position:relative; left:0px; background-color:#222');
  this.knob.style.height = height +'px';
  this.knob.style.top = (0-sliderTop) +'px';
  this.knob.className = classPrefix +'Knob';
  this.knob.draggable = true;
  this.slider.appendChild(this.sliderL);
  this.sliderL.appendChild (this.knob);
  this.div.appendChild (this.slider);
  container.appendChild (this.div);
  this.div.addEventListener('mousedown',  mouseDown, false);

  this.getValue = function (){
    return self.value;
  }

  this.setValue = function (val){
    var relX = (val * self.sliderWidth);
    self.sliderL.style.width = relX + 'px';
    self.knob.style.left =  relX + 'px';
    self.value = val;
    if (self.listener)
      self.listener(self.value);
  }
  
  this.setChangeListener = function (listener){
    self.listener = listener;
  }

  function moveKnob (me){
    var relX = me.clientX - self.divLeft;
    if (relX < 0)
      relX = 0;
    if (relX > self.sliderWidth)
      relX = self.sliderWidth;
    self.knob.style.left = (relX - (self.knob.clientWidth/2) ) +'px';
    self.sliderL.style.width = relX + 'px';
    self.value =  relX / self.sliderWidth;   
    if (self.listener)
      self.listener(self.value);
  }
  function doneMoving (){
    self.div.removeEventListener('mousemove', mouseMove, true);
    document.removeEventListener('mouseup', mouseUp, true);
  }  
  function mouseUp (me){
    moveKnob (me);
    doneMoving();
  }
  
  function mouseDown(me){
    var e = self.slider;
    self.divLeft = 0;
    while (e.offsetParent){
      self.divLeft += e.offsetLeft;
      e = e.offsetParent;
    }
    moveKnob (me);
    document.addEventListener('mouseup',  mouseUp, true);
    self.div.addEventListener('mousemove',  mouseMove, true);
  }
  function mouseMove(me){
    moveKnob (me);
  }
}
function CmatSimpleSound (playerUrl, container, attrs, onLoad, flashVars) {
  var self = this;
  this.player = null;
  this.volume = 100;
  this.isLoaded = false;
  this.onSwfLoaded = null;
  var div = document.createElement ('div');
  this.onSwfLoaded = onLoad;
  if (navigator.appName.toLowerCase().indexOf('microsoft')+1) {
    div.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"><param name="movie" value="'+playerUrl+'"><param name="quality" value="high"></object>';
    this.player = div.getElementsByTagName('object')[0];
  } else {
    div.innerHTML = '<embed src="'+playerUrl+'"  bgcolor="#eeeeee" allowfullscreen=false FlashVars="'+ flashVars +'" quality="high" allowscriptaccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" ></embed>';
    this.player = div.getElementsByTagName('embed')[0].wrappedJSObject;
  }
  if (container)
    container.appendChild (div);
  else
    document.body.appendChild (div);
  for (k in attrs)
    this.player.setAttribute(k, attrs[k]);
       
  this.setVolume = function (chanNum, vol){
    if (!self.isLoaded)
      return;
    self.player.jsSetVolume (chanNum, vol);
    volume = vol;
  }
  
  this.load = function (chanNum, url, bStream, bAutoplay, bUsePolicyFile){ 
    self.player.jsLoad (chanNum, url, bStream, bAutoplay, bUsePolicyFile);
  }
  
  this.play = function (chanNum, position){
    if (self.player.jsPlay)  self.player.jsPlay (chanNum, position);
  }
    
  this.stop = function (chanNum){
   if (!self.isLoaded)
      return;
    self.player.jsStop (chanNum);
  }
    
  this.getStatus = function (chanNum){   
    return self.player.jsGetStatus (chanNum);
  }
  
  this.debugFunc = function (msg){ 
  }
      
  this.swfDebug = function (msg){ 
    self.debugFunc('SWF: '+ msg);
  }
  this.swfLoaded = function (){ 
    self.isLoaded = true;
    self.debugFunc ('playerIsReady');
    if (self.onSwfLoaded)
      self.onSwfLoaded();
  }
  this.swfPlayComplete = function (chanNum){ 
  }
  this.swfLoadComplete = function (chanNum, isError){ 
  }
}
function htmlSelector (valNameObj, curVal, tags){
  var m = [];
  m.push ('<SELECT');
  if (tags){
    m.push (' ');
    m.push (tags);
  }  
  for (var k in valNameObj){
    m.push ('><OPTION ');
    if (k == curVal)
      m.push ('SELECTED ');
    m.push ('value="');
    m.push (k);
    m.push ('">');
    m.push (valNameObj[k]);
    m.push ('</option>');
  }
  m.push ('</select>');
  return m.join ('');
}

/************************ SEARCH ************************/
my.Search = {
  cont:null,
  state : null,
  opt : {},
  searchRunning : false,
  tilesSearched : 0,
  tilesFound : 0,
  pop:null,
  curX : 0,
  curY : 0,
  lastX : 0,
  firstX : 0,
  firstY : 0,
  lastY : 0,
  sourceCity :null,
  init : function (){
    var t = my.Search;
    this.cont = document.createElement('div');
    unsafeWindow.BOPCpo2 = t.clickedPlayerCheckOnline;
    unsafeWindow.BOSaveAttack = t.saveattack;
    unsafeWindow.BOPCplo2 = t.clickedPlayerGetLastLogin;
    return this.cont;
  },

  getContent : function (){
    var t = my.Search;
    return t.cont;
  },

  hide : function (){
 
  },
  saveattack: function(x,y,typea,lvl) {
   var t = my.Search;
   
   if (ById('SearchMultiAtt').checked)
   {
		  	for (var c=0; c<Cities.numCities; c++) {
		  		var SourceId = t.sourceCity.c.id;
    			var cityId = Cities.cities[c].c.id;  
    			if (cityId == SourceId) {
    				var AddCoords = '';
    				if (AutoAttack.Multi[c] != "") {
						var u_koords = AutoAttack.Multi[c].split("\n");
						for (var i = 0; i < u_koords.length; i++) {
							var xy1 = u_koords[i].split(',');
							var X1 = parseInt(xy1[0],10);
							var Y1 = parseInt(xy1[1],10);	
							if (X1 != 'NaN' && Y1 != 'NaN') 
							if (i==0) AddCoords += X1+','+Y1;
							else AddCoords += '\n'+X1+','+Y1;
						}
						AddCoords += '\n'+x+','+y;
					} else {
						AddCoords += x+','+y;
					}
					AutoAttack.Multi[c] = "";
					AutoAttack.Multi[c] = AddCoords;				
					saveAutoAttack();
				}
			}
   } else {
   		if (ById('SearchAutoAtt').checked)
   		{
   			var SourceId = t.sourceCity.c.id;
   			var id = x+"x"+y;
			var now = unixTime();
   			if (Options.AttackTime == undefined) Options.AttackTime = {};
   			Options.AttackTime[id] = { lastattack : (now-(24*60*60)), coordX: x, coordY: y, cityId: t.sourceCity.id, typea: typea,level:lvl };
   			saveOptions();   			
   		} else {
   			alert(translate('Por favor seleccione una opcion')+'!');
   		}
   }
   
   /*
   var XX = Options.ptWinPos.x + 100;
   var YY = Options.ptWinPos.y + 200;
   		 var m = '<div id="WhereSave">';
   		 	 m+= '<center><b>';
   		 	 m+= translate('Donde desea guardar las coordenadas')+'?</b>';
   		 	 m+= '<br><br><b>X:</b> '+x;
   		 	 m+= ' &nbsp; &nbsp; - &nbsp; &nbsp; ';
   		 	 m+= '<b>Y:</b> '+y;
   		 	 m+= '<br><br><center>';
   		 	 m+= '<input type=button id="MultiAtt" value="Multi'+uW.arStrings.Common.Attack+'">';
   		 	 m+= '&nbsp; &nbsp; &nbsp; &nbsp;';
   		 	 m+= '<input type=button id="AutoAtt" value="Auto'+uW.arStrings.Common.Attack+'">';
   		 	 m+= '</center>';
   		 	 m+= '</div>';
   		 	 m+= '<div id="OptMulti">';
   		 	 m+= '<center><b>'+translate('Desea eliminar las coordenadas existentes antes de introducir estas')+'?</b><br><br><br>';
   		 	 m+= '<input type=button id="YesSave" value="'+translate('Si')+'">';
   		 	 m+= ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ';
   		 	 m+= '<input type=button id="NoSave" value="'+translate('No')+'">';
   		 	 m+= '</center></div>';
   		 	 
		 if (t.pop == null){
		 	t.pop = new CPopup ('BOScoutGermAlert', XX, YY, 300, 200, true);
            t.pop.getTopDiv().innerHTML =   '<DIV align=center><h2><B>'+ScriptName+'</B></h2></DIV>'; 
          }
          t.pop.getMainDiv().innerHTML = m;
          t.pop.show(true); 
		  ById('WhereSave').style.display = 'block';
   		  ById('OptMulti').style.display = 'none';
   		  
   		  
   		  
          ById('MultiAtt').addEventListener('click', function() {
		  	ById('WhereSave').style.display = 'none';
   		 	ById('OptMulti').style.display = 'block';
		  }, false);
		  
		  ById('YesSave').addEventListener('click', function() {
		  	for (var c=0; c<Cities.numCities; c++) {
		  		var SourceId = t.sourceCity.c.id;
    			var cityId = Cities.cities[c].c.id;  
    			if (cityId == SourceId) {
		  			AutoAttack.Multi[c] = "";
		  			AutoAttack.Multi[c] = x+','+y;
		  			saveAutoAttack();
		  			break;
		  		}
		  	}
		  	t.pop.show(false); 
		  }, false);
		  
		  ById('NoSave').addEventListener('click', function() {
		  	for (var c=0; c<Cities.numCities; c++) {
		  		var SourceId = t.sourceCity.c.id;
    			var cityId = Cities.cities[c].c.id;  
    			if (cityId == SourceId) {
    				var AddCoords = '';
    				if (AutoAttack.Multi[c] != "") {
						var u_koords = AutoAttack.Multi[c].split("\n");
						for (var i = 0; i < u_koords.length; i++) {
							var xy1 = u_koords[i].split(',');
							var X1 = parseInt(xy1[0],10);
							var Y1 = parseInt(xy1[1],10);	
							if (X1 != 'NaN' && Y1 != 'NaN') 
							if (i==0) AddCoords += X1+','+Y1;
							else AddCoords += '\n'+X1+','+Y1;
						}
						AddCoords += '\n'+x+','+y;
					} else {
						AddCoords += x+','+y;
					}
					AutoAttack.Multi[c] = "";
					AutoAttack.Multi[c] = AddCoords;				
					saveAutoAttack();
				}
			}	
		  	t.pop.show(false); 
		  }, false);		  
		  
          ById('AutoAtt').addEventListener('click', function() {
   			var SourceId = t.sourceCity.c.id;
   			var id = x+"x"+y;
			var now = unixTime();
   			if (Options.AttackTime == undefined) Options.AttackTime = {};
   			Options.AttackTime[id] = { lastattack : (now-(24*60*60)), coordX: x, coordY: y, cityId: t.sourceCity.id, typea: typea,level:lvl };
   			saveOptions();
			t.pop.show(false);
		  }, false);
		  */
  },
  findlastattack: function(x,y) {
   var id = x+"x"+y;
   if (Options.AttackTime[id]) {
     var now = unixTime();
     var lastatt= Options.AttackTime[id].lastattack;
     return timestr(now - lastatt);
    } else {
     return "-";
   }
  },
  show : function (cont){
    var t = my.Search;

      if (t.state == null){
        this.cont.innerHTML = '\
          <DIV class=ptentry><table><tr valign=bottom><TD class=xtab width=100 align=right>'+uW.arStrings.Common.Type+' : </td><TD>\
          <SELECT id="srcType">\
            <OPTION selected value=1>'+uW.arStrings.Common.Wilds+'</option>\
  	    	<OPTION value=0>'+uW.arStrings.Common.BarbarianCamp+'</option>\
  	   		<OPTION value=2>'+uW.arStrings.Common.Cities+'</option>\
          </select></td></tr>\
        </table>\
         <DIV id="srcOpts"></div></div>\
        <DIV id="srcResults"></div>';
      var m = '<TABLE><TR><TD>';
      m += '<TABLE><TR><TD class=xtab width=100 align=right>'+translate('Ciudad a partir de')+' : &nbsp; X: </td><TD class=xtab>\
        <INPUT id="srchX" type=text\ size=3> &nbsp; Y: <INPUT id="srchY" type=text\ size=3> &nbsp;<SPAN id=spInXY></span>';
    	  m += '</td></tr><TR><TD class=xtab align=right>'+uW.arStrings.Common.Distance+' : </td><TD class=xtab>'+uW.arStrings.Common.From+' <INPUT id=srcaDist size=4 value=0 /> '+uW.arStrings.Common.To+' <INPUT id=srcDist size=4 value=70 /></td></tr>';
          m += '<TR><TD class=xtab></td><TD class=xtab><INPUT id=srcStart type=submit value="'+uW.arStrings.MainChrome.StartResearch+'"/></td></tr>';
      m += '<TR><TD colspan=2><input type=checkbox id=ShowHideOpts>'+translate('Ocultar la ventana de opciones')+'</td></tr>';
      m += '</table>';
      
      m += '</td><TD>&nbsp; &nbsp; </td><TD style="align:right; vertical-align:top;">';
      	m += '<TABLE width=100%>';
      	m += '<TR><TD>'+translate('Donde desea guardar las coordenadas')+'?</td></tr>';
     	m += '<TR><TD><INPUT type=checkbox id="SearchMultiAtt"> Multi'+uW.arStrings.Common.Attack+'</td></tr>';
     	m += '<TR><TD><INPUT type=checkbox id="SearchAutoAtt"> Auto'+uW.arStrings.Common.Attack+'</td></tr>';
     	m += '</table>';
      m += '</td>';
      m += '</tr></table>';
    
      document.getElementById ('srcOpts').innerHTML = m;
      var citysrc0=new CdispCityPicker ('srchdcp', document.getElementById ('spInXY'), false, t.clickCitySourceSelect, Cities.byID[unsafeWindow.currentcityid].idx);
      document.getElementById ('srcStart').addEventListener ('click', t.clickedSearch, false);
      
      t.state = 1;
     }
  },
   clickCitySourceSelect : function (city){
    var t = my.Search;
    t.sourceCity = city;
    document.getElementById ('srchX').value=t.sourceCity.c.x;
    document.getElementById ('srchY').value=t.sourceCity.c.y;
   },
  clickedPlayerCheckOnline : function (span, uid){
          var t = my.AllianceList;
          var s = my.Search;
            span.onclick = '';
            span.innerHTML = uW.arStrings.MapHelper.Searching+"...";
            t.fetchPlayerStatusSimple (uid, function (r) {s.gotPlayerStatus(r, span, uid)});
          },

  clickedPlayerGetLastLogin : function (span, uid){
     var t = my.AllianceList;
     var s = my.Search;
            span.onclick = '';
            span.innerHTML = uW.arStrings.MapHelper.Searching+"...";
            t.fetchPlayerLastLogin (uid, function (r) {s.gotPlayerLastLogin(r, span)});
  },
  gotPlayerStatus : function (rslt, span,uid){
        var t = my.AllianceList;
        if (!rslt.ok){
          span.innerHTML = rslt.errorMsg;
          return;
        }
    
        var p = rslt.data;
        if (p[uid] == true) {
          m = '<span style="color:green"><b>Online!</b></span>';
        } else {
           m = '<span style="color:red"><b>Offline!</b></span>';
        }  
        span.innerHTML = m + '';
      },
    
  gotPlayerLastLogin : function (rslt, span){
        var t = my.AllianceList;
        if (!rslt.ok){
          span.innerHTML = rslt.errorMsg;
          return;
        }
    
        var p = rslt.playerInfo;
        var lastLogin = rslt.playerInfo.lastLogin;
        
        if (lastLogin) {
          m = '<span style="color:black">'+lastLogin+'</span>';
        } else {
           m = '<span style="color:red">?</span>';
        }  
        span.innerHTML = m + '';
    },
  
  clickedSearch : function (){
      var t = my.Search;
  
      if (t.searchRunning){
        t.stopSearch (uW.arStrings.Common.Cancel.toUpperCase() + " " + uW.arStrings.Common.Research.toUpperCase()+' !');
        return;
     }
    t.opt.searchType = document.getElementById ('srcType').value;
        t.opt.startX = parseInt(document.getElementById ('srchX').value);
        t.opt.startY = parseInt(document.getElementById ('srchY').value);
        t.opt.maxDistance = parseInt(document.getElementById ('srcDist').value);
        t.opt.maxDistanceA = parseInt(document.getElementById ('srcaDist').value);
    errMsg = '';
    
    if (isNaN (t.opt.maxDistanceA) ||t.opt.maxDistanceA<0)
         errMsg += translate("La distancia no puede ser menor que 0")+"<BR>";
    if (isNaN (t.opt.maxDistance) ||t.opt.maxDistance<1)
          errMsg += translate("La distancia debe ser mayor que 1")+"<BR>";
    if (t.opt.maxDistance<=t.opt.maxDistanceA)
          errMsg += translate("Se ha superado la distancia máxima/mínima")+"<BR>";
     if(t.opt.maxDistanceA > 375)
           errMsg += translate("La distancia no puede ser superior a 375")+" ! <BR>";
        if (errMsg != ''){
          document.getElementById('srcResults').innerHTML = '<FONT COLOR=#660000>ERROR :</font><BR><BR>'+ errMsg;
          return;
    }
    
    t.searchRunning = true;
      document.getElementById ('srcStart').value = uW.arStrings.Common.Cancel.toUpperCase();
        m = '<DIV class=ptstat><TABLE width=100% cellspacing=0><TR><TD class=xtab width=125><DIV id=statSearched></div></td>\
            <TD class=xtab align=center><SPAN id=statStatus></span></td>\
            <TD class=xtab align=right width=125><DIV id=statFound></div></td></tr></table></div>\
          <TABLE width=100%><TR valign=top><TD><DIV id=divOutTab style="overflow-y:auto; width:100%;"></div></td>\
          <TD id="tddivOutOpts" width="290px" height=100% style="background:#e0e0f0; height:100%; padding:5px, top:0px"><DIV id=divOutOpts style="width:260px"></div></td></tr></table>';
    document.getElementById('srcResults').innerHTML = m;
    
    
    document.getElementById('ShowHideOpts').addEventListener ('click', function (){
    		  if (document.getElementById("ShowHideOpts").checked) {
    		  document.getElementById("tddivOutOpts").style.display="none";
    		  //document.getElementById("divOutTab").style.width="740px";
    		  } else {
    		  document.getElementById("tddivOutOpts").style.display="block";
    		  //document.getElementById("divOutTab").style.width="460px";
    		  }
	  }, false);

   if (t.opt.searchType == 0)
       typeName = uW.arStrings.Common.BarbarianCamp;
     else if (t.opt.searchType == 1)
       typeName = unsafeWindow.arStrings.Common.Wilds;
 	else  
 	  typeName = uW.arStrings.Common.Cities;
 
     m = '<CENTER><B>'+uW.arStrings.Common.Search+' '+ typeName +'<BR>\
         '+uW.arStrings.Common.From+' : '+ t.opt.startX +','+ t.opt.startY +'  &nbsp; '+uW.arStrings.Common.Distance+' : '+ t.opt.maxDistanceA +' '+ t.opt.maxDistance +'<BR></center>\
         <DIV class=ptentry><TABLE cellspacing=0 width=100%><TR align=center><TD class=xtab colspan=10><B>'+translate('OPCIONES')+' :</b><BR></td></tr>';
     if (t.opt.searchType == 1 || t.opt.searchType == 0) {
      m += '<TR><TD class=xtab align=right>'+uW.arStrings.Common.Level+' Min. :</td><TD class=xtab> <INPUT id=filMinLvl size=2 value='+ Options.srcMinLevel +' /></td></tr>\
         <TR><TD class=xtab align=right>'+uW.arStrings.Common.Level+' Max. :</td><TD class=xtab> <INPUT id=filMaxLvl size=2 value='+ Options.srcMaxLevel +' /></td></tr>';
 	}
     if (t.opt.searchType == 1){
       m += '<TR><TD class=xtab align=right>'+uW.arStrings.Common.Field+' :</td><TD class=xtab align=right>\
             '+uW.arStrings.Common.Woods+'<INPUT id=woodWild type=CHECKBOX'+ (Options.woodWild?' CHECKED':'') +'></td></tr>';
       m += '<TR><TD class=xtab align=right>'+uW.arStrings.Common.Grassland+'/'+uW.arStrings.Common.River+'<INPUT  id=foodWild type=CHECKBOX '+ (Options.foodWild?' CHECKED':'') +'></td>\
 	       <TD class=xtab align=right>'+uW.arStrings.Common.Mountain+'<INPUT id=mtnWild type=CHECKBOX '+ (Options.mtnWild?' CHECKED':'') +'></td></tr>';
       m += '<TR><TD class=xtab align=right>'+uW.arStrings.Common.Plain+'<INPUT id=plnWild type=CHECKBOX '+ (Options.plnWild?' CHECKED':'') +'></td>\
            <TD class=xtab align=right>'+uW.arStrings.Common.Hills+'<INPUT id=hillWild type=CHECKBOX'+ (Options.hillWild?' CHECKED':'') +'></td></tr>';
       m += '<TR><TD class=xtab align=right>'+translate('Solo no ocupados')+' :</td><TD class=xtab><INPUT id=filUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\><td></tr>';
     } 
     if (t.opt.searchType == 1 || t.opt.searchType == 0) {
         m+= '<TR><TD class=xtab align=right>'+uW.arStrings.MapHelper.SortBy+' :</td><TD class=xtab><SELECT id=filSortBy>\
           <OPTION value="level" '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'>'+uW.arStrings.Common.Level+'</option>\
           <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>'+uW.arStrings.Common.Distance+'</option>';
           if (t.opt.searchType == 1) {
                 m+= '<OPTION value="play" '+ (Options.srcSortBy=='play'?'SELECTED':'')  +'>'+uW.arStrings.Common.Player+'</option>';
           m+= '<OPTION value="alli" '+ (Options.srcSortBy=='alli'?'SELECTED':'')  +'>'+uW.arStrings.Common.Alliance+'</option>';
             }    
 		  m+= '</select></td></tr>\
 			<TR><TD class=xtab align=right>'+uW.arStrings.Common.Coordinates+' :</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \></td></tr>\
 			</table></div><BR><SPAN id=srchSizeWarn></span><DIV id=BOpbSrcExp></div>';
     } else {
 			
 		m+= '<TR><TD class=xtab align=right >'+uW.arStrings.MapHelper.Filter+' :</td><TD class=xtab align=left ><SELECT style="width: 135px" id=idSrchFilter>\
            <OPTION value=0>'+uW.arStrings.Common.All+' '+uW.arStrings.Common.Cities+'</option>\
            <OPTION value=1>'+uW.arStrings.Alliance.relationHostile+' '+uW.arStrings.Common.Cities+'</option>\
 	     	<OPTION value=2>'+translate('Ciudades brumosas')+'</option>\
 	     	<OPTION value=3>'+uW.arStrings.Common.Alliance+' '+uW.arStrings.Common.Cities+'</option>\
 	     	<OPTION value=4>'+uW.arStrings.Alliance.relationFriendly+' '+uW.arStrings.Common.Cities+'</option>\
 	     	<OPTION value=5>'+uW.arStrings.Alliance.relationNeutral+' '+uW.arStrings.Common.Cities+'</option>\
 	     	<OPTION value=6>'+uW.arStrings.MarchReport.NoAlliance+' '+uW.arStrings.Common.Cities+'</option>\
              </select></td></tr>';
 	
 		m+= '<TR><TD class=xtab align=right>'+uW.arStrings.MapHelper.SortBy+' :</td><TD class=xtab><SELECT id=filSortBy>\
           	<OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>'+uW.arStrings.Common.Glory+'</option>\
           	<OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>'+uW.arStrings.Common.Distance+'</option>\
			<OPTION value="play" '+ (Options.srcSortBy=='play'?'SELECTED':'')  +'>'+uW.arStrings.Common.Player+'</option>\
         	<OPTION value="alli" '+ (Options.srcSortBy=='alli'?'SELECTED':'')  +'>'+uW.arStrings.Common.Alliance+'</option>\
         </select></td></tr>\
         <tr><TD class=xtab align=right>'+translate('Min')+' '+uW.arStrings.Common.Glory+' :</td><TD class=xtab><select id=filPuissance>\
          <option value="0" '+ (Options.filPuissance=='0'?'SELECTED':'')  +'>0</option>\
          <option value="10000" '+ (Options.filPuissance=='10000'?'SELECTED':'')  +'>10 000</option>\
          <option value="50000" '+ (Options.filPuissance=='50000'?'SELECTED':'')  +'>50 000</option>\
          <option value="100000" '+ (Options.filPuissance=='100000'?'SELECTED':'')  +'>100 000</option>\
          <option value="500000" '+ (Options.filPuissance=='500000'?'SELECTED':'')  +'>500 000</option>\
          <option value="1000000" '+ (Options.filPuissanceMax=='1000000'?'SELECTED':'')  +'>1 million</option>\
          <option value="2000000" '+ (Options.filPuissanceMax=='2000000'?'SELECTED':'')  +'>2 millions</option>\
          <option value="4000000" '+ (Options.filPuissanceMax=='4000000'?'SELECTED':'')  +'>4 millions</option>\
          <option value="5000000" '+ (Options.filPuissanceMax=='50000000'?'SELECTED':'')  +'>5 millions</option>\
          <option value="10000000" '+ (Options.filPuissance=='100000000'?'SELECTED':'')  +'>10 millions</option>\
          <option value="50000000" '+ (Options.filPuissance=='500000000'?'SELECTED':'')  +'>50 millions</option>\
          </select></td></tr>\
          <tr><TD class=xtab align=right>'+uW.arStrings.Common.Max+' '+uW.arStrings.Common.Glory+' :</td><TD class=xtab><select id=filPuissanceMax>\
          <option value="100000" '+ (Options.filPuissanceMax=='100000'?'SELECTED':'')  +'>100 000</option>\
          <option value="500000" '+ (Options.filPuissanceMax=='500000'?'SELECTED':'')  +'>500 000</option>\
          <option value="1000000" '+ (Options.filPuissanceMax=='1000000'?'SELECTED':'')  +'>1 million</option>\
          <option value="2000000" '+ (Options.filPuissanceMax=='2000000'?'SELECTED':'')  +'>2 millions</option>\
          <option value="4000000" '+ (Options.filPuissanceMax=='4000000'?'SELECTED':'')  +'>4 millions</option>\
          <option value="5000000" '+ (Options.filPuissanceMax=='50000000'?'SELECTED':'')  +'>5 millions</option>\
          <option value="10000000" '+ (Options.filPuissanceMax=='100000000'?'SELECTED':'')  +'>10 millions</option>\
          <option value="50000000" '+ (Options.filPuissanceMax=='50000000'?'SELECTED':'')  +'>50 millions</option>\
          <option value="100000000" '+ (Options.filPuissanceMax=='100000000'?'SELECTED':'')  +'>100 millions</option>\
          <option value="900000000" '+ (Options.filPuissanceMax=='900000000'?'SELECTED':'')  +'>900 millions</option>\
          </select></td></tr>\
          <tr><TD class=xtab align=right>'+uW.arStrings.Common.Alliance+' '+translate('content')+' :</td><td class=xtab><input type=text size=10 id=filfiltreAlliance value="'+Options.filfiltreAlliance+'"></td></tr>\
        <tr><TD class=xtab align=right>'+uW.arStrings.Common.Player+' '+translate('content')+' :</td><td class=xtab><input type=text size=10 id=filfiltreJoueur value="'+Options.filfiltreJoueur+'"></td></tr>\
         <TR style="display:none;"><TD class=xtab align=right>'+uW.arStrings.Common.Coordinates+' :</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \></td></tr>\
          </table></div><BR><SPAN id=srchSizeWarn></span>';	
 	}
     document.getElementById('divOutOpts').innerHTML = m;
     
     
     
     if (t.opt.searchType == 1 || t.opt.searchType == 0) {
 		document.getElementById('filMinLvl').addEventListener ('change', function (){
 		  Options.srcMinLevel = document.getElementById('filMinLvl').value;
 		  saveOptions();
 		  t.dispMapTable ();
 		  }, false);
 		document.getElementById('filMaxLvl').addEventListener ('change', function (){
 		  Options.srcMaxLevel = document.getElementById('filMaxLvl').value;
 		  saveOptions();
 		  t.dispMapTable ();
 		  }, false);
 	 }
 	  document.getElementById('filSortBy').addEventListener ('change', function (){
	        Options.srcSortBy = document.getElementById('filSortBy').value;
	        saveOptions();
	        t.dispMapTable ();
       }, false);
    
     document.getElementById('coordsOnly').addEventListener ('change', function (){ t.dispMapTable (); }, false);
     if (t.opt.searchType == 1){
     document.getElementById('foodWild').addEventListener ('change', function(){
         Options.foodWild = document.getElementById('foodWild').checked;
         saveOptions();
         t.dispMapTable ();
         }, false);
     document.getElementById('hillWild').addEventListener ('change', function(){
         Options.hillWild = document.getElementById('hillWild').checked;
         saveOptions();
         t.dispMapTable();
         }, false);
     document.getElementById('mtnWild').addEventListener ('change', function(){
         Options.mtnWild = document.getElementById('mtnWild').checked;
         saveOptions();
         t.dispMapTable();
         }, false);
     document.getElementById('plnWild').addEventListener ('change', function(){
         Options.plnWild = document.getElementById('plnWild').checked;
         saveOptions();
         t.dispMapTable();
         }, false);
     document.getElementById('woodWild').addEventListener ('change', function(){
         Options.woodWild = document.getElementById('woodWild').checked;
         saveOptions();
         t.dispMapTable ();
         }, false);
       document.getElementById('filUnowned').addEventListener ('change', function (){
         Options.unownedOnly = (document.getElementById('filUnowned').checked);
         saveOptions();
         t.dispMapTable ();
        }, false);
     }
     if (t.opt.searchType == 2){
 
 	document.getElementById('idSrchFilter').addEventListener ('change', function (){
         Options.citySrchFilter = (document.getElementById('idSrchFilter').value);
         saveOptions();
         t.dispMapTable ();
         }, false);
 
 	document.getElementById('idSrchFilter').value = Options.citySrchFilter;
 	
         document.getElementById('filfiltreAlliance').addEventListener ('keyup', function (){
	       Options.filfiltreAlliance = document.getElementById('filfiltreAlliance').value;
	       saveOptions();
	       t.dispMapTable ();
       }, false);
        document.getElementById('filfiltreJoueur').addEventListener ('keyup', function (){
       	       Options.filfiltreJoueur = document.getElementById('filfiltreJoueur').value;
       	       saveOptions();
       	       t.dispMapTable ();
       }, false);
         document.getElementById('filPuissance').addEventListener ('change', function (){
         Options.filPuissance = parseInt(document.getElementById('filPuissance').value);
         saveOptions();
         t.dispMapTable ();
         }, false);
         document.getElementById('filPuissanceMax').addEventListener ('change', function (){
         Options.filPuissanceMax = parseInt(document.getElementById('filPuissanceMax').value);
         saveOptions();
         t.dispMapTable ();
         }, false);
 	
 	}
 
 
 
 
     t.mapDat = [];
     t.firstX =  t.opt.startX - t.opt.maxDistance;
     if (t.firstX<0) t.firstX=0;
     t.lastX = t.opt.startX + t.opt.maxDistance;
     if (t.lastX>800) t.lastX=800;
     t.firstY =  t.opt.startY - t.opt.maxDistance;
     if (t.firstY<0) t.firstY=0;
     t.lastY = t.opt.startY + t.opt.maxDistance;
     if (t.lastY>800) t.lastY=800;
     t.tilesSearched = 0;
     t.tilesFound = 0;
     t.curX = t.firstX;
     t.curY = t.firstY;
     var xxx = t.normalizeCoord(t.curX);
     var yyy = t.normalizeCoord(t.curY);
     document.getElementById ('statStatus').innerHTML = uW.arStrings.Common.Research+' '+ xxx +','+ yyy;
     setTimeout (function(){ 
       Map.request (xxx, yyy, 15, t.mapCallback)
     }, 500);
  },
  
    normalizeCoord : function (x){
      if ( x >= 800)
        x = 800;
      else if (x < 0)
        x = 0;
      return parseInt (x/5) * 5;
    },

   mapCallback : function (left, top, width, rslt){
      function insertRow (x, y, msg){
        row = document.getElementById('srcOutTab').insertRow(-1);
        row.insertCell(0).innerHTML = x +','+ y;
        row.insertCell(1).innerHTML = distance (t.opt.startX, t.opt.startY, x, y);
        row.insertCell(2).innerHTML = msg;
      }
      
         
      var t = my.Search;
      if (!t.searchRunning)
        return;
      if (!rslt.ok){
        t.stopSearch ('ERROR : '+ rslt.errorMsg);
        return;
      }
  
      map = rslt.data;
      var userInfo = rslt.userInfo;
      var alliance = rslt.allianceNames;
  
      for (k in map){
        
        if (t.opt.searchType==0 && map[k].tileType==51 && map[k].tileCityId==0 && map[k].tileUserId==0) {  // if barb
          type = 0;
        } else if (t.opt.searchType==1 && map[k].tileType>=10 &&  map[k].tileType<=50) {
          if (map[k].tileType == 10)
            type = 1;
          else if (map[k].tileType == 11)
            type = 2;
          else if (map[k].tileType == 12)
            type = 2;
          else
            type = (map[k].tileType/10) + 1;
        } else if (t.opt.searchType==2 && map[k].tileCityId >= 0 && map[k].tileType > 50 && map[k].cityName) {
  		  type = 7;
        } else {
          continue;
        }
        dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
        if (dist <= t.opt.maxDistance && dist >= t.opt.maxDistanceA){
  	        if (t.opt.searchType==2) {
  	            
  			var isMisted = map[k].tileUserId == 0 || false;		
  			var uu = 'u'+map[k].tileUserId;
  			var aU = 'unknown';
  			var aD = 'unknown';
  			var mightU = 0;
  			var nameU = 'unknown';
  			if (isMisted) {
  				nameU = 'Mist';
  				mightU = 0; 
  			} else {
  				if (userInfo[uu] ) { // Corrects a problem with hung search.
  					nameU = ""+ userInfo[uu].n +"";
  					mightU = userInfo[uu].m; 
  					
  					aD = getDiplomacy2(userInfo[uu].a);
  					if ( alliance && alliance['a'+userInfo[uu].a] ) {
  						aU = alliance['a'+userInfo[uu].a];
  					}
  					else {
  					
  						aU = '----';
  						aD = translate('Unaligned');
  					}
  				}
  			}
  			
  			t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isMisted, map[k].tileCityId, map[k].tileUserId, map[k].cityName,nameU,mightU,aU,aD ]);
  		} else {
  			isOwned = map[k].tileUserId>0 || map[k].misted;
  			
  			var uu = 'u'+map[k].tileUserId;
  			var aU = 'unknown';
  			var aD = 'unknown';
  			var nameU = 'unknown';
  			var mightU = 0;
  			
  			if (map[k].misted) {
  				nameU = 'Under the Mist';
  			}else {
  			 if (userInfo[uu] ) {
  			   var nameU = "<a onclick=getInfoForAnUser('"+ map[k].tileUserId +"');>"+ userInfo[uu].n +"</a>";
  			   mightU = userInfo[uu].m; 
  			   aD = getDiplomacy2(userInfo[uu].a);
  					if ( alliance && alliance['a'+userInfo[uu].a] ) {
  						aU = alliance['a'+userInfo[uu].a];
  					}
  			 }else {
  			   var nameU = 'unknown';
  			 }
  			}
  			
  			if (isOwned==undefined) isOwned=false;
  			t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned, map[k].tileCityId, map[k].tileUserId, map[k].cityName, nameU, mightU, aU, aD]);       
  		}
  			++t.tilesFound;
         }   
      }
      t.tilesSearched += (15*15);
      document.getElementById('statSearched').innerHTML = uW.arStrings.Alliance.SearchResults+' : '+ t.tilesSearched;
      
      
      t.dispMapTable();
  
      t.curX += 15;
       if (t.curX > t.lastX){
        t.curX = t.firstX;
        t.curY += 15;
        if (t.curY > t.lastY){
          t.stopSearch (translate('BUSQUEDA FINALIZADA')+' !');
          return;
        }
      }
      
      //
      t.opt.maxDistanceA
      if (t.opt.maxDistanceA>0) {
       var  plagedeX=t.opt.startX-t.opt.maxDistanceA;
       var  plageaX=t.opt.startX+t.opt.maxDistanceA;
       var  plagedeY=t.opt.startY-t.opt.maxDistanceA;
       var  plageaY=t.opt.startY+t.opt.maxDistanceA;
       if (t.curX >  plagedeX &&  t.curX < plageaX) {
        var nb = parseInt( (t.opt.maxDistanceA*2) / 15) -1;
        t.curX = t.curX + (nb*15);
       }
       if (t.curY >  plagedeY &&  t.curY < plageaY) {
         var nb = parseInt( (t.opt.maxDistanceA*2) / 15) -1;
        t.curY = t.curY + (nb*15);
       }
      }
      var x = t.normalizeCoord(t.curX);
      var y = t.normalizeCoord(t.curY);

      document.getElementById ('statStatus').innerHTML = uW.arStrings.Common.Research+' '+ x +','+ y;
      setTimeout (function(){Map.request (x, y, 15, t.mapCallback)}, 500);
  },
  
   dispMapTable : function (){
      var tileNames = [uW.arStrings.Common.BarbarianCamp, uW.arStrings.Common.Grassland, uW.arStrings.Common.River, uW.arStrings.Common.Woods, uW.arStrings.Common.Hills, uW.arStrings.Common.Mountain, uW.arStrings.Common.Plain, uW.arStrings.Common.Cities ];
      var t = my.Search;     
      var coordsOnly = document.getElementById('coordsOnly').checked;
      function mySort(a, b){
        if (Options.srcSortBy == 'level'){
          if ((x = a[4] - b[4]) != 0)
            return x;
        }
  	  if (Options.srcSortBy == 'might'){
          if ((x = b[10] - a[10]) != 0)
            return x;
        }
        if (Options.srcSortBy == 'alli'){
            
            if (a[11] < b[11]) return -1;
  	      else if (a[11] == b[11]) return 0;
  	       else return 1;
            
        }
          if (Options.srcSortBy == 'play'){
           
            if (a[9] < b[9]) return -1;
  	      else if (a[9] == b[9]) return 0;
  	       else return 1;
            
        }
        return a[2] - b[2];
      }
  
      dat = [];
      for (i=0; i<t.mapDat.length; i++){
        lvl = parseInt (t.mapDat[i][4]);
        type = t.mapDat[i][3];
        Glory = t.mapDat[i][10];
  	  if (t.opt.searchType == 2 && type == 7 ) {
  	  switch(parseInt (Options.citySrchFilter)) {
                  case 0:
                   if (Options.filPuissance<=Glory && Glory<=Options.filPuissanceMax) {
                    dat.push(t.mapDat[i]);
                   }
                   break;
                  case 1:
                     if ((t.mapDat[i][12] == uW.arStrings.Alliance.relationHostile) && (Options.filPuissance<=Glory && Glory<=Options.filPuissanceMax)) {
                      dat.push(t.mapDat[i]);
                     }
                     break;
                  case 2:
                     if ((t.mapDat[i][5]===true) && (Options.filPuissance<=Glory && Glory<=Options.filPuissanceMax)) {
                      dat.push(t.mapDat[i]);
                     }
                     break;
                  case 3:
                     if ((t.mapDat[i][12] == 'Ally') && (Options.filPuissance<=Glory && Glory<=Options.filPuissanceMax)) {
                      dat.push(t.mapDat[i]);
                     }
                     break;
                  case 4:
                     if ((t.mapDat[i][12] == uW.arStrings.Alliance.relationFriendly) && (Options.filPuissance<=Glory && Glory<=Options.filPuissanceMax)) {
                      dat.push(t.mapDat[i]);
                     }
                     break;
                  case 5:
                     if ((t.mapDat[i][12] == uW.arStrings.Alliance.relationNeutral) && (Options.filPuissance<=Glory && Glory<=Options.filPuissanceMax)) {
                      dat.push(t.mapDat[i]);
                     }
                     break;
                   case 6:
                     if ((t.mapDat[i][12] == translate('Unaligned')) && (Options.filPuissance<=Glory && Glory<=Options.filPuissanceMax)) {
                      dat.push(t.mapDat[i]);
                     }
                     break;
               }
       
  		
  	  } else {
         if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel){
          if (t.opt.searchType==0
              || (Options.woodWild==1 && type == 3)
              || (Options.hillWild==1 && type ==4)
              || (Options.mtnWild==1 && type==5)
              || (Options.plnWild==1 && type == 6)
              || (Options.foodWild==1 && (type==1 || type==2)))
            if (!Options.unownedOnly || t.mapDat[i][5]===false)
              dat.push (t.mapDat[i]);
          }
         }
      }
      document.getElementById('statFound').innerHTML = uW.arStrings.Alliance.SearchResults+' : '+ dat.length;
      if (dat.length == 0){
        m = '<BR><CENTER>'+translate('No encontrado')+'</center>';
      } else {
        dat.sort(mySort);
        if (coordsOnly)
          m = '<TABLE align=center id=srcOutTab cellpadding=2 cellspacing=0 style="padding:2px"><TR style="font-weight: bold"><TD style="padding:2px">'+uW.arStrings.Common.Coordinates+'</td></tr>';
        else {
          if (t.opt.searchType == 0) {
  			m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=0 style="padding:2px"><TR style="font-weight: bold"><TD style="padding:2px">'+uW.arStrings.Common.Coordinates+'</td><TD style="padding:2px;padding-left: 10px">'+uW.arStrings.Common.Distance+'</td><TD style="padding-left: 10px;">'+uW.arStrings.Common.Level+'</td><TD style="padding-left: 10px;">'+uW.arStrings.Common.Type+'</td></tr>';
  		}
  		if (t.opt.searchType == 1) {
  			m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2 style="padding:2px"><TR style="font-weight: bold"><TD style="padding:2px">'+uW.arStrings.Common.Coordinates+'</td><TD style="padding:2px;padding-left: 10px">'+uW.arStrings.Common.Distance+'</td><TD style="padding-left: 10px;">'+uW.arStrings.Common.Level+'</td><TD style="padding-left: 10px;">'+uW.arStrings.Common.Type+'</td><TD style="padding-left: 10px;">'+uW.arStrings.Common.Player+'</td><td style="padding-left: 10px;">'+uW.arStrings.Common.Glory+'</td><td style="padding-left: 10px;">'+uW.arStrings.Common.Alliance+'</td><td style="padding-left: 10px;" colspan=2>'+translate('Mas Info')+'</td></tr>';
  		}
  		if (t.opt.searchType == 2) {
  			 m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2 style="padding:2px" width=100%><TR style="font-weight: bold"><TD style="padding:2px">'+uW.arStrings.Common.Coordinates+'</td><TD style="padding:2px;padding-left: 10px">'+uW.arStrings.Common.Distance+'</td><TD  style="padding-left: 10px;">'+uW.arStrings.Common.City+'</td><TD style="padding-left: 10px;">'+uW.arStrings.Common.Player+'</td><TD style="padding-left: 10px;">'+uW.arStrings.Common.Glory+'</td><td style="padding-left: 10px;">'+uW.arStrings.Common.Alliance+'</td><td style="padding-left: 10px;" colspan=2>'+translate('Mas Info')+'</td><td colspan=3 width=20% style="padding-left: 10px;">'+uW.arStrings.Common.Attack+'</td></tr>';
  		}
  	
  	  }
  	  var numRows = dat.length;
        if (numRows > 1000 && t.searchRunning){
        //  numRows = 1000;
         document.getElementById('srchSizeWarn').innerHTML = '<FONT COLOR=#600000>'+translate('Nota: Atención, no existe limitación a la búsqueda, pero esto puede tener consecuencias en el rendimiento del navegador')+'.</font>';
        }
        for (i=0; i<numRows; i++){
         
         if ((t.opt.searchType != 2) || (dat[i][11].search(Options.filfiltreAlliance, "i") != -1 && dat[i][9].search(Options.filfiltreJoueur, "i") != -1 && t.opt.searchType == 2) ) {
        
          m += '<TR valign="top"';
  		if (dat[i][12]) m += 'class="'+dat[i][12]+'"';
  		
  		if (coordsOnly) {
  		   m += ' ><TD valign="top" style="padding:2px"><DIV><a href="javascript:void(0);" onclick="KB.Controllers.MapHelper.gotoCoord('+ dat[i][0] +','+ dat[i][1] +');">'+ dat[i][0] +','+ dat[i][1] +'</a></div></td></tr>';
          } else {
             m += ' ><TD valign="top" style="padding:2px"><DIV>\
  	             <a href="javascript:void(0);" onclick="KB.Controllers.MapHelper.gotoCoord('+ dat[i][0] +','+ dat[i][1] +');">'+ dat[i][0] +','+ dat[i][1] +'</a></div>';
  	             
  	            
  	              
  	              
  	            m += '</td>';
     		  if (t.opt.searchType == 2) { 
  			m += '<TD align="left" style="padding:2px" valign="top">'+ dat[i][2].toFixed(2) +'</a></td><TD align=left style="padding:2px">'+ dat[i][8] +'</td>\
  			   <TD valign="top" style="padding:2px">'+dat[i][9]+'</td>\
  			   <TD valign="top" style="padding:2px">'+addCommasInt(dat[i][10])+'</td>\
  			   <td style="padding:2px">'+dat[i][11]+'</td><td style="padding:2px">';
  			   if (dat[i][5]) {
			   			
			   } else {
			   			
			   		m+='<DIV style="" onclick="BOPCpo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">'+uW.arStrings.Common.Status+'</a></div></td>\
					<td style="padding:2px"></div>';
			   }
                      m+= '</td>';
                      
                      		        	             
		      m+= '<td style="padding-left: 10px;"><a href="javascript:void(0)" onclick="BOSaveAttack('+ dat[i][0] +','+ dat[i][1] +',2,0);">'+uW.arStrings.Common.Save_Button+'</a></td><td align=right style="padding-left: 10px;"><span title="'+translate('Último ataque')+'">'+t.findlastattack(dat[i][0],dat[i][1])+'</span></td>';
  	           
                      
                      m+= '</tr>';
           
  		  } else { 
             m += '<TD align=right  valign="top" style="padding:2px">'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD align=right>'+ dat[i][4] +'</td><TD> &nbsp; '+ translate(tileNames[dat[i][3]]);
             m +='</td>';
             if (t.opt.searchType == 1) {
              if (dat[i][5]) {
               m += '<td style="padding:2px">'+dat[i][9]+'<td>'+addCommasInt(dat[i][10])+'</td><td>'+dat[i][11]+'</td>';
               
               if (dat[i][7] && dat[i][7]!=0) {
               m+='<td style="padding:2px"><DIV style="" onclick="BOPCpo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">'+uW.arStrings.Common.Status+'</a></div></td><td colspan=4>-</div></td>';
               } else {
               m+='<td style="padding:2px">&nbsp;</td><td>&nbsp;</td>';
               }
               
                
              } else  {
               m +='<td colspan=5 style="text-align=center"><i><b>'+translate('Libre')+'...</b></i>';
               m +='<td style="padding-left: 10px;"><a href="javascript:void(0)" onclick="BOSaveAttack('+ dat[i][0] +','+ dat[i][1] +',1,'+ dat[i][4]+');">'+uW.arStrings.Common.Save_Button+'</a></td><td align=right style="padding-left: 10px;"><span title="'+translate('Último ataque')+'">'+t.findlastattack(dat[i][0],dat[i][1])+'</span></td>';
              }
  		   }else{
              m+="<td></td>";
              m+='<td style="padding-left: 10px;"><a href="javascript:void(0)" onclick="BOSaveAttack('+ dat[i][0] +','+ dat[i][1] +',3,'+ dat[i][4]+');">'+uW.arStrings.Common.Save_Button+'</a></td><td align=right style="padding-left: 10px;"><span title="'+translate('Último ataque')+'">'+t.findlastattack(dat[i][0],dat[i][1])+'</span></td>';
             }
              m +='</tr>';
  		  }
  		}
            }
         }
        m += '</table>';
      }
      document.getElementById('divOutTab').innerHTML = m;
      dat = null;
  },
  
  
    mapDat : [],
  
    stopSearch : function (msg){
      var t = my.Search;
      document.getElementById ('statStatus').innerHTML = '<FONT color=#ffaaaa>'+ msg +'</font>';
      document.getElementById ('srcStart').value = uW.arStrings.MainChrome.StartResearch;
      document.getElementById('srchSizeWarn').innerHTML = '';
      t.searchRunning = false;
  }
}
function distance (d, f, c, e) {
  var a = 800;
  var g = a / 2;
  var b = Math.abs(c - d);
  if (b > g)
    b = a - b;
  var h = Math.abs(e - f);
  if (h > g)
    h = a - h;
  return Math.round(100 * Math.sqrt(b * b + h * h)) / 100;
};
function getDiplomacy2 (aid) {
  if (unsafeWindow.seed.allianceDiplomacies == null)
    return uW.arStrings.Alliance.relationNeutral;
  if (unsafeWindow.seed.allianceDiplomacies.friendly && unsafeWindow.seed.allianceDiplomacies.friendly['a'+aid] != null)
    return uW.arStrings.Alliance.relationFriendly;
  if (unsafeWindow.seed.allianceDiplomacies.hostile && unsafeWindow.seed.allianceDiplomacies.hostile['a'+aid] != null)
    return uW.arStrings.Alliance.relationHostile;
  if (aid == unsafeWindow.seed.allianceDiplomacies.allianceId)
    return uW.arStrings.Common.Alliance;
  return uW.arStrings.Alliance.relationNeutral;
};
Map = {
  generateBlockList : function(left, top, width) {
    var width5 = parseInt(width / 5);
    var bl = [];

    for (x=0; x<width5; x++){
      xx = left + (x*5);
      if (xx > 795)
        xx = 800-5;
      for (y=0; y<width5; y++){
        yy = top + (y*5);
        if (yy > 795)
          yy = 800-5;
        bl.push ('bl_'+ xx +'_bt_'+ yy);
      }
    }
    return bl.join(",");
  },

  callback : null,
  request : function (left, top, width, cb) {
    left = parseInt(left / 5) * 5;
    top = parseInt(top / 5) * 5;
    width = parseInt((width+4) / 5) * 5;
    var blockString = this.generateBlockList(left, top, width);
    Map.callback = cb;

    var c={blocks:blockString}
    unsafeWindow.AjaxCall.gPostRequest("fetchMapTiles.php", c, function(rslt) {
        Map.callback(left, top, width, rslt);
      },
      function (rslt) {
        Map.callback(left, top, width, rslt);
      }
    );
  }
};

/************************ TRAIN ************************/
my.Train = {
  cont : null,
  timer : null,
  state : null,
  stats : {},
  selectedCity : {},

  init : function (){
    var t = my.Train;
    
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    var t = my.Train;
    return t.cont;
  },

  hide : function (){
    var t = my.Train;
    clearTimeout (t.timer);
  },
  cancelTrainingBO : function (i,cityId,typetrn,numtrptrn,p5,p6,p7,trainingId) {
   var t = my.Train;
   
   Cities.byID[cityId].c.queues.training.slot(i).cancel(function(){
   
   unsafeWindow.Barracks.renderBarracksQueue()
   
   t.dispTrainStatus ('<font color=#550000><B>'+translate('Cancelar la formación')+'</b></font><BR>');
          t.displayCityStats();
   })
   
 },
  show : function (){
    var t = my.Train;
    clearTimeout (t.timer);
    if (t.state == null){
     unsafeWindow.BOcancelTraining = t.cancelTrainingBO;
      s = "<DIV id=trainTopSelect>\
        <DIV class=ptstat>"+unsafeWindow.arStrings.MainChrome.TrainTroops+"</div><DIV style='height:10px'></div><DIV class=ptentry>\
        <DIV style='text-align:center; margin-bottom:10px;'>"+uW.arStrings.Common.City+" : &nbsp; <span id=ptspeedcity></span></div>\
        <TABLE class=ptTab width=100%><TR valign=top><TD width=100%>\
        <TABLE align=center><TR><TD align=right>"+uW.arStrings.Common.Troops+' '+uW.arStrings.Common.Type+" : </td><TD colspan=2>\
        <SELECT id=ptttType>";
        unsafeWindow.Barracks.allUnitIds.each(function(r){
         if (unsafeWindow.arStrings.unitName["u"+r]) {
          s+="<option value="+r+">"+unsafeWindow.arStrings.unitName["u"+r]+"</option>";
         }
        });
        s+="</select> &nbsp; ("+uW.arStrings.Common.Max+" <span id=ptttSpMax></span>)</td></tr>\
        <TR><TD align=right>"+translate('Número de tropas por ranura')+" : </td><TD><INPUT id='ptttInpPS' size=5 type='text' value='0'\></td>\
          <TD><INPUT id='ptttButMaxPS' type=submit value='"+uW.arStrings.Common.Max+"'\> &nbsp; ("+uW.arStrings.Common.Max+" <span id=ptttSpMaxPS>0</span>)</td></tr>\
        <TR><TD align=right>"+translate('Número de ranuras')+" : </td><TD><INPUT id='ptttInpSlots' size=2 type='text' value='1'\></td>\
          <TD width=75%><INPUT id='ptttButMaxSlots' type=submit value='"+uW.arStrings.Common.Max+"'\> &nbsp; ("+uW.arStrings.Common.Max+" <span id=ptttSpMaxSlots>1</span>)</td></tr>\
        <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='ptttButDo' type=submit value='"+uW.arStrings.Common.Train+"'\></td></tr>\
        </table></td></tr></table></div></div>\
        <TABLE align=center width=425 class=ptTab><TR><TD><div id=ptTrainStatus style='overflow-y:auto; max-height:78px; height: 78px;'></div></td></tr></table>\
        <div style='height: 325px; background: #e8ffe8'>\
        <TABLE width=100% class=ptTab><TR><TD colspan=3><DIV id=divSTtop></div></td></tr>\
        <TR><TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>"+translate('Cola')+" &nbsp; (<SPAN id=statTTtot></span>)</b><BR><HR></div><DIV id=divSTleft style='overflow-y: auto; height:210px; max-height:210px'></div></td>\
          <TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>"+translate('Cola')+" &nbsp; (<SPAN id=statDTtot></span>)</b><BR><HR></div><DIV id=divSTright style='overflow-y: auto; height:210px; max-height:210px'></div></td></tr>\
        </div>";
      t.cont.innerHTML = s;

      var dcp = new CdispCityPicker ('ptspeed', document.getElementById('ptspeedcity'), true, t.clickCitySelect, 0);
      t.TTspMax = document.getElementById ('ptttSpMax');
      t.TTspMaxPS = document.getElementById ('ptttSpMaxPS');
      t.TTspMaxSlots = document.getElementById ('ptttSpMaxSlots');
      t.TTbutMaxSlots = document.getElementById ('ptttButMaxSlots');
      t.TTbutMaxPerSlot = document.getElementById ('ptttButMaxPS');
      t.TTinpPerSlot = document.getElementById ('ptttInpPS');
      t.TTinpSlots = document.getElementById ('ptttInpSlots');
      t.TTselType = document.getElementById ('ptttType');
      t.TTbutDo = document.getElementById ('ptttButDo');
   
   
      t.divTrainStatus = document.getElementById ('ptTrainStatus');
            
      t.TTinpSlots.addEventListener ('change', t.updateTopTroops, false);
      t.TTbutMaxPerSlot.addEventListener ('click', t.clickTroopMaxPS, false);
      t.TTbutMaxSlots.addEventListener ('click', t.clickTroopMaxSlots, false);
      t.TTselType.addEventListener ('change', t.changeTroopSelect, false);
      t.TTbutDo.addEventListener ('click', t.clickTroopDo, false);
             
      t.changeTroopSelect();
 
      t.state = 1;
    }

    if (t.lastTroopSelect != t.TTselType.value)
      t.changeTroopSelect();
    t.displayCityStats();
    t.updateTopTroops ();
    t.timer = setTimeout (t.show, 5000);
  },
  updateTopTroops : function (){
    var t = my.Train;
    var slots = parseInt(t.TTinpSlots.value, 10);
    if (isNaN(slots) || slots<0)
      slots = 0;
    t.TTspMax.innerHTML = t.stats.MaxTrain;
    t.TTspMaxSlots.innerHTML = t.stats.barracks - t.stats.queued;
    if (slots<1 || (t.stats.barracks-t.stats.queued < 1))
      t.TTspMaxPS.innerHTML = 0;
    else
      t.TTspMaxPS.innerHTML = parseInt(t.stats.MaxTrain / slots);
  },
      
  
  clickTroopMaxPS : function (){
    var t = my.Train;
    var slots = parseInt(t.TTinpSlots.value, 10);
    if (slots<1 || (t.stats.barracks-t.stats.queued < 1))
      t.TTinpPerSlot.value = 0;
    else
      t.TTinpPerSlot.value = parseInt(t.stats.MaxTrain / slots);
  },

  clickTroopMaxSlots : function (){
    var t = my.Train;
    t.TTinpSlots.value = t.stats.barracks - t.stats.queued;
  },
  
  clickCitySelect : function (city){
    var t = my.Train;
    t.selectedCity = city;
    var SourceId = t.selectedCity.c.id;
    unsafeWindow.Chrome.City.switchTo(SourceId);
    t.lastQueString = null;   
    //t.lastDQueString = null;   
    t.displayCityStats ();
    t.changeTroopSelect();
    //t.changeDefSelect();
  },
   
  changeTroopSelect : function (){
    var t = my.Train;
    var cityId = t.selectedCity.id;
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?
    var id = t.TTselType.value;
    t.lastTroopSelect = id;
    var uc = unsafeWindow.trainingData["unit"+id].costs.level0;
    var max = 9999999999;
    if ( (t.stats.food / uc["resource1"]) < max)
      max = t.stats.food / uc["resource1"];
    if ( (t.stats.wood / uc["resource2"]) < max)
      max = t.stats.wood / uc["resource2"];
    if ( (t.stats.stone / uc["resource3"]) < max)
      max = t.stats.stone / uc["resource3"];
    if ( (t.stats.ore / uc["resource4"]) < max)
      max = t.stats.ore / uc["resource4"];
    if ( (t.stats.idlePop / uc.population) < max)
      max = t.stats.idlePop / uc.population;
    t.stats.MaxTrain = parseInt (max);
    if (t.stats.MaxTrain < 0)
      t.stats.MaxTrain = 0;
    /*  
    if (matTypeof(uc[8]) == 'object'){
      for (k in uc[8]){  // check building requirement
        var b = getCityBuilding (cityId, k.substr(1));
        if (b.maxLevel < uc[8][k][1]){
          t.stats.MaxTrain = 0;
          break;
        }
      }
    }
    if (matTypeof(uc[9]) == 'object'){
      for (k in uc[9]){    // check tech requirement
        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1]){
          t.stats.MaxTrain = 0;
          break;
        }
      }
    }*/
    t.updateTopTroops();
  },
  
  clickTroopDo : function (){
    var t = my.Train;
    var cityId = t.selectedCity.id;
    var unitId = t.TTselType.value;
    var perSlot = parseInt(t.TTinpPerSlot.value, 10);
    var numSlots = parseInt(t.TTinpSlots.value, 10);
    
    t.displayCityStats ();
    if (perSlot<1){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>'+translate('Número de tropas por ranura debe ser mayor de')+' 0.</font>';
      return;
    }
    if (perSlot*numSlots > t.stats.MaxTrain){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>'+translate('No se puede entrenar tantas tropas')+' ('+translate('max es')+' '+ t.stats.MaxTrain +' '+translate('total')+')</font>';
      return;
    }
    if (numSlots<1 || numSlots>t.stats.barracks - t.stats.queued){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>'+translate('Número de ranuras no válido')+'.</font>';
      return;
    }
    t.setBusy(true);
    var que = [];
    for (var i=0; i<numSlots; i++)
      que.push (['T', unitId, parseInt (perSlot)]);
    t.divTrainStatus.innerHTML = '';
    t.doQueue (cityId, que);
  },

  
/*******  DEF  ******/  
  
  updateTopDef : function (){
    var t = my.Train;
    var slots = parseInt(t.TDinpSlots.value, 10);
    if (isNaN(slots) || slots<0)
      slots = 0;
    t.TDspMax.innerHTML = uW.arStrings.Common.Max+':'+ t.stats.MaxDefTrain +'&nbsp; owned:'+ t.stats.defOwned;   
    t.TDspMaxSlots.innerHTML = t.stats.wallLevel-t.stats.Dqueued;
    if (slots<1)
      t.TDspMaxPS.innerHTML = 0;
    else
      t.TDspMaxPS.innerHTML = parseInt(t.stats.MaxDefTrain / slots);

    t.TDspSpace.innerHTML = 'Wall level: <B>'+ t.stats.wallLevel +'</b><BR>Wall space: '+ (t.stats.wallSpaceUsed+t.stats.wallSpaceQueued)  +'/<B>'+ t.stats.wallSpace +'</b><BR>\
        Field space: '+ (t.stats.fieldSpaceUsed+t.stats.fieldSpaceQueued) +'/<B>'+ t.stats.fieldSpace +'</b>';
  },

  changeDefSelect : function (){
    var t = my.Train;
    var cityId = t.selectedCity.id;
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?
    var id = t.TDselType.value;
    t.lastDefSelect = id;
    t.stats.defOwned = parseInt(Seed.fortifications['city' + cityId]['fort'+id]);    
    var uc = unsafeWindow.fortcost['frt'+id];
    var max = 9999999999;
    if ( (t.stats.food / uc[1]) < max)
      max = t.stats.food / uc[1];
    if ( (t.stats.wood / uc[2]) < max)
      max = t.stats.wood / uc[2];
    if ( (t.stats.stone / uc[3]) < max)
      max = t.stats.stone / uc[3];
    if ( (t.stats.ore / uc[4]) < max)
      max = t.stats.ore / uc[4];
    if ( (t.stats.idlePop / uc[6]) < max)
      max = t.stats.idlePop / uc[6];
    t.stats.MaxDefTrain = parseInt (max);
    if (t.stats.MaxDefTrain < 0)
      t.stats.MaxDefTrain = 0;
    if (matTypeof(uc[8]) == 'object'){
      for (k in uc[8]){  // check building requirement
        var b = getCityBuilding (cityId, k.substr(1));
        if (b.maxLevel < uc[8][k][1]){
          t.stats.MaxDefTrain = 0;
          break;
        }
      }
    }
    if (matTypeof(uc[9]) == 'object'){
      for (k in uc[9]){    // check tech requirement
        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1]){
          t.stats.MaxDefTrain = 0;
          break;
        }
      }
    }

    var spaceEach = parseInt(unsafeWindow.fortstats["unt"+ id][5]);
    if (id<60)
      var spaceAvail = t.stats.wallSpace - t.stats.wallSpaceUsed - t.stats.wallSpaceQueued;
    else
      var spaceAvail = t.stats.fieldSpace - t.stats.fieldSpaceUsed - t.stats.fieldSpaceQueued;
    if ( t.stats.MaxDefTrain * spaceEach > spaceAvail)
      t.stats.MaxDefTrain = parseInt(spaceAvail / spaceEach);
    
    t.updateTopDef();
  },
  
  clickDefMaxPS : function (){
    var t = my.Train;
    var slots = parseInt(t.TDinpSlots.value, 10);
    if (slots<1)
      t.TDinpPerSlot.value = 0;
    else
      t.TDinpPerSlot.value = parseInt(t.stats.MaxDefTrain / slots);
  },

  clickDefMaxSlots : function (){
    var t = my.Train;
    t.TDinpSlots.value = t.stats.wallLevel-t.stats.Dqueued;
  },
    
  clickDefDo : function (){
    var t = my.Train;
    var cityId = t.selectedCity.id;
    var unitId = t.TDselType.value;
    var perSlot = parseInt(t.TDinpPerSlot.value, 10);
    var numSlots = parseInt(t.TDinpSlots.value, 10);
    
    t.displayCityStats ();
    if (perSlot<1){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>'+translate('Número de unidades por la ranura debe ser mayor que')+' 0.</font>';
      return;
    }
    if (perSlot*numSlots > t.stats.MaxDefTrain){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>'+translate('No se pueden entrenar tantas tropas')+' ('+translate('max es')+' '+ t.stats.MaxDefTrain +' '+translate('total')+')</font>';
      return;
    }
    if (numSlots<1 || numSlots > t.stats.wallLevel-t.stats.Dqueued){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>'+translate('Número de ranuras no válido')+'.</font>';
      return;
    }
    t.setBusy(true);
    var que = [];
    for (var i=0; i<numSlots; i++)
      que.push (['T', unitId, parseInt (perSlot)]);
    t.divTrainStatus.innerHTML = '';
    t.doDefQueue (cityId, que);
  },

  doDefQueue : function (cityId, que, errMsg){
    var t = my.Train;
    try {
      t.displayCityStats();
      if (errMsg){
        t.dispTrainStatus ('<font color=#550000><B>ERROR: '+ errMsg +'</b></font><BR>');
        t.setBusy(false);
        return;
      }
      var cmd = que.shift();
      if (!cmd){
        t.dispTrainStatus ('<B>'+translate('Done queueing defenses')+'.</b><BR>');
        t.setBusy(false);
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus (translate('Entrenamiento')+' '+ cmd[2] +' '+  fortNamesShort[cmd[1]] +'<BR>');
        doDefTrain (cityId, cmd[1], cmd[2], function(errMsg){my.Train.doDefQueue(cityId, que, errMsg);} );
      }
    } catch (err) {
      //logit (inspect (err, 8, 1));
      t.dispTrainStatus ('<font color=#550000>PROGRAM ERROR: '+ err.message +'</font><BR>');
      t.setBusy(false);
    }
  },
  setBusy : function (tf){
    var t = my.Train;
    //t.TDbutDo.disabled = tf;
    t.TTbutDo.disabled = tf;
  }, 
  displayCityStats : function (){
    var t = my.Train;
    var cityId = t.selectedCity.id;
    t.stats.food = parseInt (Cities.byID[cityId].c.resources[1].count);
    t.stats.wood = parseInt (Cities.byID[cityId].c.resources[2].count);
    t.stats.stone = parseInt (Cities.byID[cityId].c.resources[3].count);
    t.stats.ore = parseInt (Cities.byID[cityId].c.resources[4].count);
    t.stats.gold = parseInt (Cities.byID[cityId].c.silver());
    t.stats.idlePop = parseInt(Cities.byID[cityId].c.population.count()) - parseInt(Cities.byID[cityId].c.population.labor());
      
    var c=(parseInt(unsafeWindow.Building.getLevelsSumForType(unsafeWindow.Constant.Building.BARRACKS))+(unsafeWindow.Building.getCountForType(unsafeWindow.Constant.Building.BARRACKS)*9))/10;

    t.stats.barracks = unsafeWindow.Constant.Building.BARRACKS; 
    var m = '<CENTER><B>'+ Cities.byID[cityId].c.name +' &nbsp; ('+ Cities.byID[cityId].c.x +','+ Cities.byID[cityId].c.y +')</b></center><HR>';
    m += '<TABLE class=ptTab width=100%><TR align=center>\
        <TD width=18%><B>'+uW.arStrings.ResourceName[1]+' :</b></td><TD width=16%><B>'+uW.arStrings.ResourceName[2]+' :</b></td><TD width=16%><B>'+uW.arStrings.ResourceName[3]+' :</b></td>\
        <TD width=16%><B>'+uW.arStrings.ResourceName[4]+' :</b></td><TD width=16%><B>'+uW.arStrings.ResourceName[0]+'</b></td><TD width=16%><B>'+uW.arStrings.Common.Population+' :</b></td></tr>\
      <TR align=center><TD>'+ addCommasInt(t.stats.food) +'</td><TD>'+ addCommasInt(t.stats.wood) +'</td><TD>'+ addCommasInt(t.stats.stone) +'</td>\
        <TD>'+ addCommasInt(t.stats.ore) +'</td><TD>'+ addCommasInt(t.stats.gold) +'</td>\
        <TD>'+ addCommasInt(t.stats.idlePop) +'</td></tr></table><BR>';
    document.getElementById ('divSTtop').innerHTML = m;
    
    var totTime = 0;
    var q=[];
    if(Cities.byID[cityId].c.queues.training.active()){
     f=Cities.byID[cityId].c.queues.training.activeSlots()[0];
     q.push(f);
    }
    var c=Cities.byID[cityId].c.queues.training.queuedSlots();
    if(c.length){c.each(function(h){q.push(h); }); }
    var qs = q.toString();
    var now = unixTime();
      t.lastQueString = qs;
      t.stats.queued = 0;
      m = '<TABLE align=center class=ptTab>';
      if (q!=null && q.length>0 ){
        //t.fixQueTimes (q);
        t.stats.queued = q.length;
        first = true;
        for (var i=0; i<q.length; i++){
          //start = q[i].totalTime();
          if (first) {
            actual = q[i].totalTime();
            end = q[i].secondsLeft();
          } else
            actual = q[i].totalTime();
          if (actual < 0)
            actual = 0;
            param1=q[i].id;//; // numÃ©ro de position dans la fil d'attente
            param2=cityId; // id de la ville
            param3=q[i].typeId(); // Type de trouoe
            param4=q[i].quantity(); // Qte troupe
            param5=0;
            param6=0;
            param7=actual; // duree
          m += '<TR align=right><td width=35 align=center>'+(i+1)+'&nbsp;<a onclick="BOcancelTraining('+param1+','+param2+','+param3+','+param4+','+param5+','+param6+','+param7+');return false;" href="javascript:void(0);"><img src="http://cdn1.iconfinder.com/data/icons/musthave/16/Remove.png" border=0 title="'+uW.arStrings.OpenBarracks.CancelTrainingTitle+'"></a></td><TD>'+ q[i].quantity() +' </td><TD align=left> '+ unsafeWindow.arStrings.unitName["u"+q[i].typeId()];
          if (first)
            m += '</td><TD>&nbsp; '+  timestr(actual, true) +'</td><TD> (<SPAN id=ptttfq>'+ timestr(end, true) +'</span>)';
          else
            m += '</td><TD>&nbsp; '+  timestr(actual, true) +'</td></tr>'; 
          //lastEnd = end;
          first = false;
         }
      }
      m += '</table>';
      document.getElementById ('divSTleft').innerHTML = m;
   
    m = t.stats.barracks +' '+translate('Cuarteles');
    if (t.stats.queued > 0)
      m += ', '+ t.stats.queued +' '+translate('Ranuras');
    var f=0,tf=0;
    c=Cities.byID[cityId].c.queues.training.activeSlots();
    if(c.length){c.each(function(h){f=h.secondsLeft();tf+=f;});}
    c=Cities.byID[cityId].c.queues.training.queuedSlots();
    if(c.length){c.each(function(h){f=h.totalTime();tf+=f;});}
    if (tf > 0)
      m += ', '+ unsafeWindow.timestr(tf);
    document.getElementById ('statTTtot').innerHTML = m;
    

  },

  dispTrainStatus : function (msg){
    var t = my.Train;
    t.divTrainStatus.innerHTML = msg + t.divTrainStatus.innerHTML;
  },

  doQueue : function (cityId, que, errMsg){
    var t = my.Train;
    try {
      t.displayCityStats();
      if (errMsg){
        t.dispTrainStatus ('<font color=#550000><B>ERROR : '+ errMsg +'</b></font><BR>');
        t.setBusy(false);
        return;
      }
      var cmd = que.shift();
      if (!cmd){
        t.dispTrainStatus ('<B>'+translate('Entrenamiento realizado')+'</b><BR>');
        t.setBusy(false);
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus (translate('Formación')+' : '+ cmd[2] +' '+  unsafeWindow.arStrings.unitName["u"+cmd[1]] +'<BR>');
        t.doTrain (cityId, cmd[1], cmd[2], function(errMsg){my.Train.doQueue(cityId, que, errMsg);} );
      }
    } catch (err) {
      //logit (inspect (err, 8, 1));
      t.dispTrainStatus ('<font color=#550000>ERROR : '+ err.message +'</font><BR>');
      t.setBusy(false);
    }
  },
  doTrain :function (cityId, unitId, num, notify){
  var t = my.Train;
   if(!Cities.byID[cityId].c.queues.training.available()){
    return;
   }
 
   var f={cid:cityId,type:unitId,quant:num,items:0};
       f.tid=Cities.byID[cityId].c.queues.training.availableSlotIds()[0];
       var e=unsafeWindow.trainingData["unit"+unitId].costs.level0;
       
       unsafeWindow.AjaxCall.gPostRequest("train.php",f,
         function(h) {
            
             if (h.ok) {
             
             unsafeWindow.KTrack.event(["_trackEvent","TrainUnit",String(unitId),unsafeWindow.player.level,num]);
             unsafeWindow.KB.Models.Resource.addToSeed(unsafeWindow.Constant.ResourceType.GOLD,e.softcurrency*num*-1);
	     for(b=1;b<=4;b++){
	      unsafeWindow.KB.Models.Resource.addToSeed(b,e["resource"+b]*num*-1)
	     }
	   
	     //document.getElementById('autoFError_'+cityId).innerHTML+=" <b>1</b>"
	     Cities.byID[cityId].c.population.remove(e.population*num);
	     //document.getElementById('autoFError_'+cityId).innerHTML+=" <b>2</b>"
	     z = new unsafeWindow.KB.Models.QueueSlot.Troop({id:f.tid,ticker:unsafeWindow.unixtime(),eta:unsafeWindow.unixtime()+Number(h.timeNeeded),target:num,type:unitId})
	     //document.getElementById('autoFError_'+cityId).innerHTML+=" <b>3</b>"
	
	     Cities.byID[cityId].c.queues.training.addSlotToEnd(z);
	  
             //unsafeWindow.Chrome.Queue.Training.select();
 	     if (notify != null)
	               setTimeout (function (){notify(null);}, 100);
	     
	     //t.dispTrainStatus ('<B>Formation effectu&eacute;e.</b><BR>');
             // t.setBusy(false);
        
	     } else {
	             if (notify != null){
	               setTimeout (function (){notify(rslt.error_code);}, 100);
	             }
      		}
           },
           function(o) {
             if (notify != null)
              notify(o.errorMsg);
           }
  	);
   }
}

/************************ OVERVIEW ************************/
my.Overview = {
  cont : null,
  displayTimer : null,
  checkBox:null,
  checkBox1:null,
  Overview : function (){
  },

  init : function (){
    this.cont = document.createElement('div');
    unsafeWindow.BOdefend = this.gatedef;
    unsafeWindow.BORavive = this.ravive;
    return this.cont;
  },

  getContent : function (){
    return my.Overview.cont;
  },

  hide : function (){
    clearTimeout (my.Overview.displayTimer);
  },
  gatedef: function(numc) {
 
    var currentCity=Cities.cities[numc].c;
    var a = !Cities.cities[numc].c.defending;
    
    var b={cid:currentCity.id,state:a};
    
    unsafeWindow.AjaxCall.gPostRequest("gate.php",b,function(c){

      currentCity.defending=a;
      if (a) {
            	 document.getElementById("def_"+numc).value="DEF = ON";
        	  document.getElementById("def_"+numc).className = 'BODefButOn';
       }else {
        	  document.getElementById("def_"+numc).value="DEF = OFF";
        	   document.getElementById("def_"+numc).className = 'BODefButOff';
      }  
      DashInnert();
      
     });
     
  },
  ravive:function(cityId, unitId, quant) {
  
  
  var f={cid:cityId,type:unitId,quant:quant,et:10};
  unsafeWindow.AjaxCall.gPostRequest("healUnits.php",f,
   function(h) {
   
   
   },
   function(rslt) {
   }
  ); 

  },
  show : function (){
    var rownum = 0;
    var totalentre = 0;  
    var t = my.Overview;
    clearTimeout (t.displayTimer);


       dt = new Date ();
      dt.setTime (unsafeWindow.player.datejoinUnixTime * 1000);
      
      str = '<div style="height:670px;max-height:670px;overflow-y:auto"><DIV class=ptstat style="margin-top:2px; margin-bottom:2px; "><TABLE cellspacing=0 cellpadding=0 class=ptTab width=97% align=center>\
        <TR align=left><TD><SPAN class=ptStatLight>'+uW.arStrings.Common.Name+' :</span><br>'+ uW.player.name + '</td>\
        <TD><SPAN class=ptStatLight>'+translate('Se unió el')+' :</span><br>'+ dt.toLocaleDateString() +'</td>\
        <TD><SPAN class=ptStatLight>'+uW.arStrings.Common.Glory+' :</span><br>' + addCommasInt(unsafeWindow.player.might()) +'</td>\
        <TD><SPAN class=ptStatLight>'+uW.arStrings.Common.Alliance+' :</span><br>' + getMyAlliance()[1] + '</td>\
        <TD align=right><SPAN class=ptStatLight>'+uW.arStrings.Common.World+' :</span><br>' + uW.domainName +'</td></tr></table></div><span id="debugtest"></span>';
      str += "<TABLE class='ptTabOverview' cellpadding=0 cellspacing=0><TR valign=top align=right><TD width=100 style='font-size:16px'><center><a href='"+sitesupport+"' target=_blank><font size=4>"+ScriptName+"<br>"+Autore+"</font></a></td><TD width=88 style='background: #ffc;font-size:14px'><center><B>"+uW.arStrings.Common.Total.toUpperCase()+"</b></td>";
      for(i=0; i<Cities.numCities; i++) {
         Gate = Cities.cities[i].c.defending;
         if(Gate == 0) {
          var couleurr="#77EE77";
          var stylbo = "BODefButOff";
          var butvalue="DEF = OFF";
         }else {
          var couleurr="#EE7777";
          var stylbo = "BODefButOn";
          var butvalue="DEF = ON";
         }
         str += "<TD width=81 style='background-color:"+couleurr+";text-align:center' align=center><B>"+ Cities.cities[i].c.name +'</b><BR><a onclick="KB.Controllers.MapHelper.gotoCoord('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+');">('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+')</a><br><input type=button value="'+butvalue+'" id="def_'+i+'" class="'+stylbo+'" onclick="BOdefend('+i+');"></td>';
           
      }
    str +="</tr>";
    str += "<tr><td><br></td></tr>";
    var m="";
    	for(i=0; i<Cities.numCities; i++) {
    	  color='black';
    	  if (Cities.cities[i].c.queues.building.activeSlots()[0] || Cities.cities[i].c.queues.building.activeSlots()[1]) {
    	   if (parseInt(Cities.cities[i].c.queues.building.activeSlots()[0].typeId())!=99) { 
    	    var temprestant=Cities.cities[i].c.queues.building.activeSlots()[0].secondsLeft();
    	   } else {
    	    if (Cities.cities[i].c.queues.building.activeSlots()[1]) {
    	     var temprestant=Cities.cities[i].c.queues.building.activeSlots()[1].secondsLeft();
    	    } else {
    	     var temprestant=0;
    	     color='red';
    	    }
    	   }
    	   m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ timestrShort(temprestant) + "</td>";
    	   } else {
    	    m += "<TD align=right width=81 style='background:#e8e8e8;color:red;'>"+ timestrShort(0)+"</td>";
    	   }
    	
    	}
    	str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.Common.Buildings+"</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m +"</tr>"; 
    	
    	var m="";
    	for(i=0; i<Cities.numCities; i++) {
    	  color='black';
    	  if (Cities.cities[i].c.queues.research.activeSlots()[0]) {
    	   m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ timestrShort(Cities.cities[i].c.queues.research.activeSlots()[0].secondsLeft())+"</td>";
    	  } else {
    	   m += "<TD align=right width=81 style='background:#e8e8e8;color:red;'>"+ timestrShort(0)+"</td>";
    	  }
    	}
    	str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.Common.Research+"</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m +"</tr>"; 
	
                   str += "<tr><td><br></td></tr>";
    	var m="";
        	for(i=0; i<Cities.numCities; i++) {
        	  color='black';
        	  
        	  var f=0;
        	  var tf=0;
        	  var c=Cities.cities[i].c.queues.training.activeSlots();
        	  if(c.length){
        	   c.each(function(h){
        	    f=h.secondsLeft();
        	    tf+=f;
        	   });
        	  }
        	  var c=Cities.cities[i].c.queues.training.queuedSlots();
		          	  if(c.length){
		          	   c.each(function(h){
		          	    f=h.totalTime();
		          	    tf+=f;
		          	   });
        	  }
        	     
        	   m += "<TD align=right width=81 style='background:#e8e8e8;'>"+ timestr(tf)+"</td>";
        	  
        	}
        	str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.Common.Training+"</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m +"</tr>"; 
	
        var m="";
	        	for(i=0; i<Cities.numCities; i++) {
	        	  color='black';
	        	  
	        	  var f=0;
	        	  var tf=0;
	        	  var c=Cities.cities[i].c.queues.reviving.activeSlots();
	        	  if(c.length){
	        	   c.each(function(h){
	        	    f=h.secondsLeft();
	        	    tf+=f;
	        	   });
	        	  }
	        	  var c=Cities.cities[i].c.queues.reviving.queuedSlots();
			          	  if(c.length){
			          	   c.each(function(h){
			          	    f=h.totalTime();
			          	    tf+=f;
			          	   });
	        	  }
	        	     
	        	   m += "<TD align=right width=81 style='background:#e8e8e8;'>"+ timestrShort(tf)+"</td>";
	        	  
	        	}
	        	str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.Apothecary.Reviving+"</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m +"</tr>"; 
		
        
    
    str += "<tr><td><br></td></tr>";
var m="";
      var popTotal=0;
      for(i=0; i<Cities.numCities; i++) {
                 m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.population.cap()) +"</td>";
                 popTotal+=parseInt(Cities.cities[i].c.population.cap());
      }
      str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.ShowPopTooltip.PopLimit.substring(0,14)+"</td><td style='background: #e8e8e8' align=right>"+addCommas(popTotal)+" "+ m+"</tr>"; 
      
      var m="";
            var popTotal=0;
            for(i=0; i<Cities.numCities; i++) {
                       m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.population.count()) +"</td>";
                       popTotal+=parseInt(Cities.cities[i].c.population.count());
            }
            str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.ShowPopTooltip.CurrPop.substring(0,14)+"</td><td style='background: #e8e8e8' align=right>"+addCommas(popTotal)+" "+ m+"</tr>"; 
      
      var m="";
      var popTotal=0;
      for(i=0; i<Cities.numCities; i++) {
                 m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.population.labor()) +"</td>";
                 popTotal+=parseInt(Cities.cities[i].c.population.labor());
      }
      str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.ShowPopTooltip.LbForce.substring(0,14)+"</td><td style='background: #e8e8e8' align=right>"+addCommas(popTotal)+" "+ m+"</tr>"; 

      var m="";
            var popTotal=0;
            for(i=0; i<Cities.numCities; i++) {
                       m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.population.count()-Cities.cities[i].c.population.labor()) +"</td>";
                       popTotal+=parseInt(Cities.cities[i].c.population.count()-Cities.cities[i].c.population.labor());
            }
            str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.ShowPopTooltip.IdlePop.substring(0,14)+"</td><td style='background: #e8e8e8' align=right>"+addCommas(popTotal)+" "+ m+"</tr>"; 

   var m="";
            var popTotal=0;
            for(i=0; i<Cities.numCities; i++) {
               if (Cities.cities[i].c.population.happiness()<50)
                m += "<TD align=right width=81 style='background:#e8e8e8;color:red'><b>"+ Cities.cities[i].c.population.happiness() +" %</td>";
               else
                m += "<TD align=right width=81 style='background:#e8e8e8'>"+ Cities.cities[i].c.population.happiness() +" %</td>";
            }
            str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.Common.Happiness.substring(0,14)+"</td><td style='background: #e8e8e8' align=right>&nbsp; "+ m+"</tr>"; 
   var m="";
            var popTotal=0;
            for(i=0; i<Cities.numCities; i++) {
                       m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.taxRate()) +" %</td>";
            }
            str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.MainChrome.TaxRate.substring(0,14)+"</td><td style='background: #e8e8e8' align=right>&nbsp; "+ m+"</tr>"; 



    
      str += "<tr><td><br></td></tr>";
      var m="";
      var goldTotal=0;
      for(i=0; i<Cities.numCities; i++) {
                  m += "<TD width=81 style='background:#e8e8e8' align=right>"+ addCommas(Cities.cities[i].c.silver()) +'</td>';
                  goldTotal+=parseInt(Cities.cities[i].c.silver());
       }
      str += "<tr align=right><td style='background:#e8e8e8' align=right><b>"+unsafeWindow.arStrings.Common.Silver+"</td><td style='background:#e8e8e8' align=right>"+addCommas(goldTotal)+" "+ m + "</tr>" ; 
      
               
        for (var nbr=1; nbr<=4; nbr++) {
             if (nbr % 2)
		        style = '';
	     else
                    style = " style = 'background: #e8e8e8'";
            var m="";
            var resTotal=0;
            for(var i=0; i<Cities.numCities; i++) {
                        m += "<TD width=81 "+style+" align=right>"+ addCommas(Cities.cities[i].c.resources[nbr].count) +'</td>';
                        resTotal+=parseInt(Cities.cities[i].c.resources[nbr].count);
             }
            str += "<tr><td "+style+" align=right><b>"+unsafeWindow.arStrings.ResourceName[nbr]+"</td><td "+style+" align=right>"+addCommas(resTotal)+" "+ m+"</tr>"; 
      
  
        
          }
         str += "<tr><td><br></td></tr>";
        // Production de Food + ENTRETIEN !
        var m="";
	var prodTotal=0;
	for(i=0; i<Cities.numCities; i++) {
	           m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.resources[1].hourlyTotalRate())+"/"+unsafeWindow.arStrings.TimeStr.timeHr+"</td>";
	          prodTotal+=parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate());
	}
        str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.Common.Production+"</td><td style='background: #e8e8e8' align=right>"+addCommas(prodTotal)+"/"+unsafeWindow.arStrings.TimeStr.timeHr+""+ m+"</tr>"; 
        var m="";
	var entTotal=0;
 	for(i=0; i<Cities.numCities; i++) {
 	       color='black';
 	      // if ( parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) < Cities.cities[i].c.upkeep() ) color='red';
	       m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ addCommas(Cities.cities[i].c.upkeep())+"/"+unsafeWindow.arStrings.TimeStr.timeHr+"</td>";
	       entTotal+=parseInt(Cities.cities[i].c.upkeep());
	}
        str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.Common.UpKeep+"</td><td style='background: #e8e8e8' align=right>"+addCommas(entTotal)+"/"+unsafeWindow.arStrings.TimeStr.timeHr+""+ m+"</tr>"; 

        var m="";
	 	var entTotal=0;
	 	var variiiable="Script GoR BoTTols" + " by "+ "Tiesto"+"ale";
	  	for(i=0; i<Cities.numCities; i++) {
	  	       color='black';
	  	       if ( parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) < parseInt(Cities.cities[i].c.upkeep()) ) {
	  	        // entretien supérieur à la production
	  	        difference = parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) - parseInt(Cities.cities[i].c.upkeep());
	  	        var timeLeft = parseInt(Cities.cities[i].c.resources[1].count)  / (0-difference) * 3600;
			if (timeLeft > 86313600)
			       autonomi = '----';
			else {
			 if (timeLeft<(Options.foodWarnHours*3600)) {
			     autonomi = '<SPAN class=whiteOnRed><b>'+ timestrShort(timeLeft) +'</b></span>';
			 } else {
			   autonomi = ''+ timestrShort(timeLeft) +'';
			 }
                	}
	  	        m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ autonomi +"</td>";
	  	       } else {
	  	       
	  	         m += "<TD align=right width=81 style='background:#e8e8e8;color:black;'>---</td>";
	  	       }
	 	          

	 	}
	 str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.Common.TimeRemaining+"</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m+"</tr>"; 
	 
         
        str += "<tr><td><br></td></tr>";
        
    
        unsafeWindow.Barracks.allUnitIds.each(function(nbu){
        var m="";
	var unitTotal=0;
	var unitWTotal=0;
	if (unsafeWindow.arStrings.unitName["u"+nbu]) {
	 if (nbu % 2)
	        style = '';
	 else
           style = " style = 'background: #e8e8e8'";
           
	 for(var i=0; i<Cities.numCities; i++) {
	      var wonded=Cities.cities[i].c.troops[nbu].wounded();
	      var wondedst="";
	      if (wonded>0) wondedst=" (<a onclick='BORavive("+Cities.cities[i].c.id+","+nbu+","+parseIntNan(wonded)+");'><font color=red>"+addCommas(wonded)+"</font></a>)";
	                        m += "<TD width=81 "+style+" align=right>"+ addCommas(Cities.cities[i].c.troops[nbu].count()) +''+wondedst+'</td>';
	                        unitTotal+=parseInt(Cities.cities[i].c.troops[nbu].count());
	                        unitWTotal+=parseInt(Cities.cities[i].c.troops[nbu].wounded());
	 }
	 var unitstring="";
	 if (unitWTotal>0) unitstring=" (<font color=red>"+addCommas(unitWTotal)+"</font>)";
         str += "<tr><td "+style+" align=right><b>"+unsafeWindow.arStrings.unitName["u"+nbu]+"</td><td "+style+" align=right>"+addCommas(unitTotal)+""+unitstring+" "+ m + "</tr>"; 
        
         }
        });
        
        str += "<tr><td><br></td></tr>";
        
        var m="";
		var genTotal=0,genEnergyTotal=0,gendispoTotal=0,gendispo=0;
	 	for(i=0; i<Cities.numCities; i++) {
	 	       color='black';
	 	       
	 	       Cities.cities[i].c.generalsSorted().each(function(b){if(b.energy()>0){ gendispo+=b.available()?1:0; }}); 
	 	       
	 	        m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+gendispo+"/"+ Cities.cities[i].c.generalsCount()+"</td>";
	 	        gendispoTotal+=gendispo
	 	       
	 	        
		        genTotal+=parseInt(Cities.cities[i].c.generalsCount());
		        
		         gendispo=0
		        Cities.cities[i].c.generalsSorted().each(function(b){if(b.energy()>0){ genEnergyTotal+=parseInt(b.energy()); }}); 
		        
		}
	str += "<tr><td style='background: #e8e8e8' align=right><b>"+uW.arStrings.Common.Generals+"</td><td style='background: #e8e8e8' align=right>"+gendispoTotal+" / "+genTotal+""+m+"</tr>";
	str += "<tr><td style='background: #e8e8e8' align=right><b>"+uW.arStrings.Common.Energy+" "+uW.arStrings.Common.Total+"</td><td style='background: #e8e8e8' align=right>"+genEnergyTotal+"</tr>";
	str += "<tr><td><br></td></tr>";
	        
	        var m="";
			var wildTotal=0;
		 	for(i=0; i<Cities.numCities; i++) {
		 	       color='black';
		 	        m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ Cities.cities[i].c.wildernessCount()+" / "+Cities.cities[i].c.buildings[0].level()+"</td>";
			          wildTotal+=parseInt(Cities.cities[i].c.wildernessCount());
			}
		str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.Common.Wild.substring(0,14)+"</td><td style='background: #e8e8e8' align=right>"+wildTotal+""+m+"</tr>";
	

	
	str += "</table>";
    my.Overview.cont.innerHTML = str +'</div>';
    t.displayTimer = setTimeout (t.show, 10000);
  }
};

/************************ AUTO TRAIN ************************/
my.AutoForm = {
  cont : null,
  displayTimer : null,
  state : null,
  numcity :-1,
  selectedCity:null,
 
  init : function (){
    var t = my.AutoForm;
    t.cont = document.createElement('div');
    t.state = null;
    setTimeout(t.Start,parseInt(10*1000));
    return t.cont;
  },

  getContent : function (){
    var t = my.AutoForm;
    return t.cont;
  },

  show : function (){
    var t = my.AutoForm; 
    uW.BOcancelTraining = t.cancelTrainingBO;  
      try {      
	var m = '<DIV class=ptstat>'+uW.arStrings.Common.Train.toUpperCase()+' '+uW.arStrings.Common.Troops.toUpperCase()+'</div>';
		m+= '<table width=100%><tr><td style="text-align:center; vertical-align:middle;" width="50%">';
    if (TrainOptions.Running == false) {
    	m+= '<INPUT id=autoFormationtoggle type=submit value="Auto'+uW.arStrings.Common.Train+' = OFF">';
    } else {
    	m+= '<INPUT id=autoFormationtoggle type=submit value="Auto'+uW.arStrings.Common.Train+' = ON">';
	}
		m+= '</td><td style="text-align:center; vertical-align:middle;" width="50%"><input type=button  value="'+uW.arStrings.Common.Save_Button+'" id=autoFSave></td>';
		m+= '</tr></table>';
		m+= '';
		m+= '<DIV class=ptstat>'+translate('CONFIGURACION')+'</div><center>';
		m+= '<input id=aFtimelauch type=text size=2 value="'+parseIntNan(TrainOptions.timelauch)+'"> '+translate('segundos de entrenamiento entre las ciudades');
		m+= '</center><br><br>';
		m+= "<TABLE width=100% class=ptTab border=0 align=center><tr align=right><td align=right>#</td><td align=right>"+translate('Activo')+"</><td style='text-align:left;'>"+uW.arStrings.Common.City+"</td><td style='text-align:left;'>"+uW.arStrings.Common.Troops+' '+uW.arStrings.Common.Type+"</td><td style='text-align:left;'>"+uW.arStrings.Common.Quantity+"</td></tr>";
    for (var c=0; c<Cities.numCities; c++) {
    	cityId=Cities.cities[c].c.id;  
    	m+= '<tr><td width=5% align=right>'+(c+1)+'</td><td align=right>';
    	if (TrainOptions.listactif && TrainOptions.listactif[cityId] == false) {
     		m+= '<input type=checkbox id="autoFCheck_'+cityId+'">';
    	} else {
     		m+= '<input checked type=checkbox id="autoFCheck_'+cityId+'">';
    	}
		m+= '</td><td width=15% align=center>'+Cities.cities[c].c.name+'</td><TD align=center><SELECT id="autoFType_'+cityId+'">';
     	uW.Barracks.allUnitIds.each(function(r){
			if (r==TrainOptions.list[cityId]) {
				m+= '<option selected value="'+r+'">'+uW.arStrings.unitName['u'+r]+'</option>';
        	} else {
				m+= '<option value="'+r+'">'+uW.arStrings.unitName['u'+r]+'</option>';
			}
		});
    	if (TrainOptions.unitemin[cityId]==undefined) TrainOptions.unitemin[cityId]=0;
    	m+= '</select></td>';
    	m+= '<td align=left><input type=text value="'+ parseIntNan(TrainOptions.unitemin[cityId]) +'" id="aFunitemin_'+cityId+'" size=3></td></tr>'; 
    }
    	m+= '</table>';
		m+= '<br><br>';
		m+= '<DIV class=ptstat>'+translate('Cola')+'</div>';
		m+= '<center><span id="trainspeedcity"></span>';
		m+= "<br><DIV id=divSTleftTrain style='overflow-y: auto; height:210px; max-height:210px'></div>";
		m+= '</center>';
	t.cont.innerHTML = m; 
	var dcp = new CdispCityPicker ('trainspeed', ById('trainspeedcity'), true, t.clickCitySelect, 0);
//	setInterval(t.displayCityStats,parseInt(5*1000));
	ById('autoFormationtoggle').addEventListener('click', function(){t.toggleautoFormationState()} , false);
	ById('autoFSave').addEventListener('click', function() {
    	ById('autoFSave').style.backgroundColor = "#F18888";
    	TrainOptions.list = {};
     	TrainOptions.listactif = {};
	   	TrainOptions.timelauch = ById('aFtimelauch').value;
     	TrainOptions.unitemin = {};
     	for (var c=0; c<Cities.numCities; c++) {
        	TrainOptions.list[Cities.cities[c].c.id] = ById('autoFType_'+Cities.cities[c].c.id).value;
        	TrainOptions.listactif[Cities.cities[c].c.id] = ById('autoFCheck_'+Cities.cities[c].c.id).checked;
        	TrainOptions.unitemin[Cities.cities[c].c.id]= ById('aFunitemin_'+Cities.cities[c].c.id).value;
     	}
     	saveTrainingOptions();
     	setTimeout(function() {
     		ById('autoFSave').style.backgroundColor="";
     	}, 500); 
    }, false);	
 	} catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
  },
  cancelTrainingBO : function (i,cityId,typetrn,numtrptrn,p5,p6,p7,trainingId) {
   var t = my.AutoForm;
   
   Cities.byID[cityId].c.queues.training.slot(i).cancel(function(){
   
   unsafeWindow.Barracks.renderBarracksQueue()
   
   actionLog('Auto'+uW.arStrings.Common.Train,Cities.cities[cityId].c.name+' <font color=#550000><B>'+translate('Cancelar entrenamiento')+' - ID:'+i+'</b></font>');
          t.displayCityStats();
   })
 },  
 
  hide : function (){ 
  },
  
  clickCitySelect : function (city){
    var t = my.AutoForm;
    t.selectedCity = city;  
    t.displayCityStats ();
  },
  displayCityStats : function (){
    var t = my.AutoForm;
    var cityId = t.selectedCity.id;
    var totTime = 0;
    var q=[];
    if(Cities.byID[cityId].c.queues.training.active()){
    	f = Cities.byID[cityId].c.queues.training.activeSlots()[0];
    	q.push(f);
    }
    var c = Cities.byID[cityId].c.queues.training.queuedSlots();
    if(c.length){c.each(function(h){q.push(h); }); }
    var qs = q.toString();
    var now = unixTime();
      m = '<TABLE align=center class=ptTab>';
      if (q!=null && q.length>0 ){
        first = true;
        for (var i=0; i<q.length; i++){
          //start = q[i].totalTime();
          if (first) {
            actual = q[i].totalTime();
            end = q[i].secondsLeft();
          } else
            actual = q[i].totalTime();
          if (actual < 0)
            actual = 0;
            param1=q[i].id;
            param2=cityId;
            param3=q[i].typeId();
            param4=q[i].quantity();
            param5=0;
            param6=0;
            param7=actual;
          m += '<TR align=right><td width=35 align=center>'+(i+1)+'&nbsp;<a onclick="BOcancelTraining('+param1+','+param2+','+param3+','+param4+','+param5+','+param6+','+param7+');return false;" href="javascript:void(0);"><img src="http://cdn1.iconfinder.com/data/icons/musthave/16/Remove.png" border=0 title="'+uW.arStrings.OpenBarracks.CancelTrainingTitle+'"></a></td><TD>'+ q[i].quantity() +' </td><TD align=left> '+ uW.arStrings.unitName["u"+q[i].typeId()];
          if (first)
            m += '</td><TD>&nbsp; '+  timestr(actual, true) +'</td><TD> (<SPAN id=ptttfq>'+ timestr(end, true) +'</span>)';
          else
            m += '</td><TD>&nbsp; '+  timestr(actual, true) +'</td></tr>'; 
          //lastEnd = end;
          first = false;
         }
      }
      m += '</table>';
      ById('divSTleftTrain').innerHTML = m;
  },
  
  Start : function (){
  	var t = my.AutoForm;
	var CanTrain = true;
  	if (!TrainOptions.Running) {
  		return;
  	}
  	
  	if (t.numcity<Cities.numCities-1) {
    	t.numcity++;
    } else {
    	t.numcity = 0; 
  	}
  	
  	var c = t.numcity;  
  	var cityId=Cities.cities[c].c.id;
  	
  	if (!TrainOptions.listactif[cityId]) {
  		actionLog('Auto'+uW.arStrings.Common.Train,Cities.cities[c].c.name+': Disattivata');
  		CanTrain = false;
  	}	
	
  	var availableTrainingSlots = Cities.cities[c].c.queues.training.available();
  	if(!availableTrainingSlots) {
  		actionLog('Auto'+uW.arStrings.Common.Train,Cities.cities[c].c.name+': Nessuno slot disponibile');
  		CanTrain = false;
  	}
  	
  	var popAvail = parseInt(Cities.cities[c].c.population.count());
  	if(popAvail < TrainOptions.unitemin[cityId]) {
  	 	actionLog('Auto'+uW.arStrings.Common.Train,Cities.cities[c].c.name+': Popolazione non disponibile');
  		CanTrain = false;
  	}
  	
  	if (TrainOptions.unitemin[cityId] < 1) {
  		actionLog('Auto'+uW.arStrings.Common.Train,Cities.cities[c].c.name+': Non puoi addestrare 0 truppe');
  		CanTrain = false;  	
  	}
  	
/**  	maxunite = t.unitemax(cityId, TrainOptions.list[cityId]);
  	if(maxunite < parseIntNan(TrainOptions.unitemin[Cities.cities[c].c.id])) {
  	actionLog('Auto'+uW.arStrings.Common.Train,Cities.cities[c].c.name+': Popolazione non disponibile');
  		CanTrain = false;
  	}		***/
  	
  	if (CanTrain) {
  		var unitId = TrainOptions.list[cityId];
  		var unitQnt = TrainOptions.unitemin[cityId];
  		var Name = uW.arStrings.unitName["u"+ unitId];
		var e=uW.trainingData["unit"+unitId].costs.level0;
  		var f={};
  			f.cid=cityId;
  			f.type=unitId;
  			f.quant=unitQnt;
  			f.items=0;
       		f.tid=Cities.byID[cityId].c.queues.training.availableSlotIds()[0];
       	uW.AjaxCall.gPostRequest("train.php",f,
        	function(h) {
            	unsafeWindow.KTrack.event(["_trackEvent","TrainUnit",String(unitId),unsafeWindow.player.level,unitQnt]);
             	unsafeWindow.KB.Models.Resource.addToSeed(unsafeWindow.Constant.ResourceType.GOLD,e.softcurrency*unitQnt*-1);
	     		for(b=1;b<=4;b++){
	      			unsafeWindow.KB.Models.Resource.addToSeed(b,e["resource"+b]*unitQnt*-1)
	     		}
	     		Cities.byID[cityId].c.population.remove(e.population*unitQnt);
	     		z = new unsafeWindow.KB.Models.QueueSlot.Troop({id:f.tid,ticker:unsafeWindow.unixtime(),eta:unsafeWindow.unixtime()+Number(h.timeNeeded),target:unitQnt,type:unitId})
	     		Cities.byID[cityId].c.queues.training.addSlotToEnd(z);
	     		actionLog('Auto'+uW.arStrings.Common.Train,Cities.cities[c].c.name+': <font color=green>Addestrati '+unitQnt+' '+Name+'</font>');
	     		t.displayCityStats();
           },
           function(h) {
           		actionLog('Auto'+uW.arStrings.Common.Train,Cities.cities[c].c.name+': <font color=red>ERRORE: Addestrati '+unitQnt+' '+Name+'</font>');
           }
        );	
       	
  	}
  	
  	setTimeout(t.Start,parseInt(TrainOptions.timelauch*1000));
  },

 unitemax : function(currentcityid, e){
 	var b=[],a=[],
 	d=uW.Number.POSITIVE_INFINITY,
 	f=uW.trainingData["unit"+e].costs.level0,
 	c;
 	b.push(f.softcurrency);
 	a.push(Cities.byID[currentcityid].c.silver());
 	for(c=1;c<=4;c++) {
  		b.push(f["resource"+c]);
  		a.push(uW.KB.Models.Resource.getCountForType(c))
 	}
 	b.push(f.population);
 	a.push(Cities.byID[currentcityid].c.population.idle());
 	for(c=0;c<b.length;c++) {
  		if(Number(b[c])!==0){
   			d=Math.floor(Math.min(d,a[c]/b[c]))
  		}
 	}
 	return d
 },

  toggleautoFormationState : function() {
     var t = my.AutoForm;
     obj = ById('autoFormationtoggle');
     if (TrainOptions.Running == true) {
              TrainOptions.Running = false;
              saveTrainingOptions();
              if (obj) obj.value = 'Auto'+uW.arStrings.Common.Train+" = OFF";
      }  else {
              TrainOptions.Running = true;
              saveTrainingOptions();
			  t.Start();
              if (obj) obj.value = 'Auto'+uW.arStrings.Common.Train+" = ON";
      }
      DashInnert();
   }
}

/************************ LEADERBOARD ************************/
my.AllianceList = {
  cont : null,
  nombre: null,
  state : null,
  dat : [],

  init : function (){
    var t = my.AllianceList;
    t.cont = document.createElement('div');
    //t.nombre=0;
    unsafeWindow.PTgetMembers = t.eventGetMembers;
    //unsafeWindow.PTDme = t.eventGetLienMember;
    unsafeWindow.PTpd = t.clickedPlayerDetail;
    unsafeWindow.PTpl = t.clickedPlayerLeaderboard;
    unsafeWindow.PCplo = t.clickedPlayerGetLastLogin;
    //unsafeWindow.PTalClickPrev = t.eventListPrev;
    //unsafeWindow.PTalClickNext = t.eventListNext;
    return t.cont;
  },
  getContent : function (){
    var t = my.AllianceList;
    return t.cont;
  },

  hide : function (){
    var t = my.AllianceList;

  },

  show : function (){
    var t = my.AllianceList;
      if (getMyAlliance()[1]==uW.arStrings.Common.None) {
        t.cont.innerHTML = '<BR><BR><CENTER><b>'+translate('Debe pertenecer a una alianza con el fin de utilizar esta función')+'</center>';
        return;
      }
    if (t.state == null){
    
     var m = '<DIV class=ptentry><TABLE width=100% cellpadding=0>\
              <TR><TD class=xtab align=right></td><TD class=xtab>'+uW.arStrings.Common.Name+' '+uW.arStrings.Common.Player+': &nbsp;</td>\
                <TD width=80% class=xtab><INPUT id=allPlayName size=20 type=text /> &nbsp; <INPUT id=playSubmit type=submit value="'+uW.arStrings.Common.Search+' '+uW.arStrings.Common.Player+'" /></td>\
              <TD class="xtab ptErrText"><SPAN id=ptplayErr></span></td></tr>\
            <TR><TD class=xtab> '+uW.arStrings.ChangeDomain.OR+' </td><TD class=xtab>'+uW.arStrings.Common.Name+' '+uW.arStrings.Common.Alliance+': &nbsp;</td>\
             <TD class=xtab><INPUT id=allAllName type=text /> &nbsp; <INPUT id=allSubmit type=submit value="'+uW.arStrings.Common.Search+' '+uW.arStrings.Common.Alliance+'" /></td>\
            <TD class="xtab ptErrText"><SPAN id=ptallErr></span></td></tr>\
             </table><span style="vertical-align:middle;" id=altInput></span></div>\
          <SPAN id=allListOut></span>';
      t.cont.innerHTML = m;
      
    document.getElementById('allSubmit').addEventListener ('click', t.eventSubmit, false);
    document.getElementById('playSubmit').addEventListener ('click', t.eventPlayerSubmit, false);
    document.getElementById('allPlayName').addEventListener ('focus', function (){document.getElementById('ptplayErr').innerHTML='';}, false);
    document.getElementById('allAllName').addEventListener ('focus', function (){document.getElementById('ptallErr').innerHTML='';}, false);
      t.state = 1;
    }
    
  },
  
  
  aName : '',
 eventSubmit : function (){
      var t = my.AllianceList;
      document.getElementById('ptallErr').innerHTML='';
      t.aName = document.getElementById('allAllName').value;
      
      if (t.aName.length < 3){
        document.getElementById('ptallErr').innerHTML = uW.arStrings.GetAllianceSearchResults.EntryAtleast;
        return;
      }
      document.getElementById('altInput').innerHTML = '';
      document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>'+uW.arStrings.MapHelper.Searching+'...</center>';
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);
  },
  fetchAllianceList : function (allianceName, myAid, notify) {   // at least 3 chars :)
      var t = my.AllianceList;
      unsafeWindow.AjaxCall.gPostRequest("allianceGetSearchResults.php",{allianceName:allianceName},
       function (rslt) {
         notify (rslt);
     
        },
        function (rslt) {
          notify (rslt);
        });
    },

  fetchMyAllianceInfo : function (notify){
    unsafeWindow.AjaxCall.gPostRequest("allianceGetInfo.php",{},
      function (rslt) {
        notify (rslt);
      },
      function (rslt) {
        notify (rslt);
      });
  },
  eventGotAllianceList : function (rslt){
      var t = my.AllianceList;
      if (!rslt.ok){
        document.getElementById('allListOut').innerHTML = rslt.msg;
        return;
      }
      var m = '<DIV class=ptstat>'+translate('Resultados para')+': <B>"'+ t.aName +'"</b></div>\
      <TABLE cellpadding=3 width=80% cellspacing=0 class=ptTab><TR><TD class=xtab  style="font-weight:bold;">'+uW.arStrings.ShowCreateAlliance.AllianceName+'</td><TD class=xtab  style="font-weight:bold;">'+uW.arStrings.Common.Ranking+'</td><TD class=xtab style="font-weight:bold;">'+uW.arStrings.Alliance.Members+'</td>\
          <TD align=right class=xtab  style="font-weight:bold;">'+uW.arStrings.Common.Glory+'</td><TD class=xtab  style="font-weight:bold;">'+uW.arStrings.Common.Diplomacy+'</td><TD class=xtab style="font-weight:bold;">'+uW.arStrings.Alliance.Members+'</td></tr>';
      for (k in rslt.alliancesMatched){
        var all = rslt.alliancesMatched[k];
        var dip = '';
        if (all.relation && all.relation==1)
          dip = uW.arStrings.Alliance.relationFriendly;
        else if (all.relation && all.relation==2)
          dip = uW.arStrings.Alliance.relationHostile;
          
        if (all.ranking!=null) {
         m += '<TR><TD class=xtab>'+ all.allianceName +'</td><TD align=right class=xtab>'+ all.ranking +'</td><TD align=right class=xtab>'+ all.membersCount +'</td>\
          <TD align=right class=xtab >'+ addCommasInt(all.might) +'</td><TD class=xtab>'+ dip +'</td>\
          <TD class=xtab><a onclick="PTgetMembers('+ all.allianceId +')">'+translate('Ver miembros')+'</a></td></tr>';
        }
      }
      document.getElementById('allListOut').innerHTML = m;
    },
  
  
    eventGetMembers : function (aid){
      var t = my.AllianceList;
      document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>'+uW.arStrings.MapHelper.Searching+'....</center>';
      t.fetchAllianceMemberList (aid,  t.eventGotMemberList);
  },
  fetchAllianceMemberList : function (allianceId, notify) {
      var t = my.AllianceList;
      var c = {};
      c.action= "view_alliance_detail";
      if (allianceId && allianceId != 0)
        c.allianceId = allianceId;
        
      unsafeWindow.AjaxCall.gPostRequest("allianceGetMembersInfo.php", c,
      function (rslt) {
          notify (rslt);
        },
      function (rslt) {
          notify (rslt);
      });
  },
  
  eventGotMemberList : function (rslt){
       var t = my.AllianceList;
       if (!rslt.ok){
         document.getElementById('allListOut').innerHTML = rslt.errorMsg;
         return;
       }
       t.memberListRslt = rslt;
       var uList = [];
       for (k in rslt.memberInfo)
         uList.push (rslt.memberInfo[k].userId);     
       t.fetchPlayerStatus (uList, function(r){t.eventGotMemberOnlineList(r)});    
   },    
   eventGotMemberOnlineList : function (rslt){
       var t = my.AllianceList;
       var numInvalid = 0;
       var numPlayers = 0;
       //var myA = getMyAlliance ();
       t.dat = [];

       for (var i in t.memberListRslt.memberInfo){
         p = t.memberListRslt.memberInfo[i];
         if (p.userId == 0){
           ++numInvalid;
         } else {
           ++numPlayers;
              t.dat.push ([p.genderAndName, parseInt(p.might), p.positionType, parseInt(p.cities), p.userId, p.name, p.dateJoined, p.avatarurl, p.title, 'NA']);
         }
       }
       t.displayMembers (t.memberListRslt.allianceName, numPlayers);
  },
  
  sortColNum : 1,
  sortDir : 1,
  
  displayMembers : function (allName, numPlayers){
      var t = my.AllianceList;
      function alClickSort (e){
        var t = my.AllianceList;
        var newColNum = e.id.substr(8);
        document.getElementById('clickCol'+t.sortColNum).className = 'clickable';
        e.className='clickable clickableSel';
        if (newColNum == t.sortColNum)
          t.sortDir *= -1;
        else
          t.sortColNum = newColNum;
        t.reDisp();
      }
      unsafeWindow.PTalClickSort = alClickSort;
      var m = '<STYLE>.clickable{background-color:#ddd; border:2px outset; border-color:#555; padding-left:5px; padding-right:5px}\
              .clickableSel{background-color:#ffffcc;}\
              .xxtab{background-color:none; padding-left:5px; padding-right:5px;} </style>\
        <DIV class=ptstat><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab> &nbsp; '+ allName +'</td>\
          <TD class=xtab width=80% align=center>&nbsp;</td><TD class=xtab align=right>'+ numPlayers +' '+translate('Jugadores encontrados')+'</td></tr></table></div>';
       m += '<div style="top:190px;left:0px;width:100%; position:absolute;max-height:475px;height:470px;overflow:auto;">\
        <TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD>\
        <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>'+uW.arStrings.Common.Player+'</div></a></td>\
          <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable><A><Div>'+uW.arStrings.Common.Position+'</a></div></td>\
          <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>'+uW.arStrings.Common.Glory+'</a></div></td>\
          <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>'+uW.arStrings.Common.Cities+'</a></div></td>\
          <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>'+uW.arStrings.Common.Level+'</a></div></td>\
         </tr></thead>\
        <tbody id=allBody ></tbody></table></div>';        
      document.getElementById('allListOut').innerHTML = m;
      document.getElementById('clickCol'+t.sortColNum).className = 'clickable clickableSel';
      t.reDisp();
      },
   // sort and display
    reDisp : function (){
      var t = my.AllianceList;
      
      function sortFunc (a, b){
            var t = my.AllianceList;
       if (typeof(a[t.sortColNum]) == 'number'){
               if (t.sortDir > 0)
                 return a[t.sortColNum] - b[t.sortColNum];
               else
                 return b[t.sortColNum] - a[t.sortColNum];
             } else if (typeof(a[t.sortColNum]) == 'boolean'){
           
       	return 0;        
             } else {
               if (t.sortDir > 0)
                 return a[t.sortColNum].localeCompare(b[t.sortColNum]);
               else
                 return b[t.sortColNum].localeCompare(a[t.sortColNum]);
        }
      }
      t.dat.sort (sortFunc);
      var m = '';
      var tbody = document.getElementById('allBody');
      tbody.innerHTML ='';
      tbody.style.maxHeight = '';
      var csvXL="";
      for (var i=0; i<t.dat.length; i++){ //
      	if (i % 2 == 0) {
          		 tabclass = 'xxtab';
          	} else {
          		tabclass = 'xxtab_even';
      	} 
          m += '<TR style="max-height:30px"><TD class=xxtab>&nbsp;'+ t.dat[i][0] +'</td>\
          <TD align=right class='+ tabclass +'>'+unsafeWindow.KB.Models.Alliance.officerTypeMapping[parseInt(t.dat[i][2],10)] +'</td>\
          <TD align=right class='+ tabclass +'>'+ addCommasInt(t.dat[i][1]) +'</td><TD align=center class='+ tabclass +'>'+ t.dat[i][3] +'</td><TD align=center class='+ tabclass +'>'+ t.dat[i][8] +'</td></tr>';
  

      }
   
     var tbody = document.getElementById('allBody');
      tbody.style.maxHeight = '';
      tbody.innerHTML = m;
      
  },
  
  eventPlayerSubmit : function (){
      var t = my.AllianceList;
      document.getElementById('ptplayErr').innerHTML='';
      var name = document.getElementById('allPlayName').value;
      name = name.replace(/\'/g,"_");
      name = name.replace(/[ùûü]/g,"u").replace(/[îï]/g,"i").replace(/[àâä]/g,"a").replace(/[ôö]/g,"o").replace(/[éèêë]/g,"e").replace(/ç/g,"c");
      name = name.replace(/[^a-zA-Z0-9]/g,"_");
      t.pName = name;
      if (name.length < 3){
        document.getElementById('ptplayErr').innerHTML = uW.arStrings.GetAllianceSearchResults.EntryAtleast;
        return;
      }
      document.getElementById('altInput').innerHTML = '';
      document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>'+uW.arStrings.MapHelper.Searching+'....</center>';
      t.fetchPlayerList (name, t.eventGotPlayerList);
  },
  clickedPlayerLeaderboard : function (span, uid){
      var t = my.AllianceList;
      span.onclick = '';
      span.innerHTML = "Searching the leaderboard....";
      t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard(r, span)});
  },
  fetchLeaderboard : function (uid, notify) {
    unsafeWindow.AjaxCall.gPostRequest("getUserLeaderboard.php",{action:"view_player_detail", player_id:uid},
    function(rslt){
        notify (rslt);
   	},function(rslt){
   	        notify (rslt);
    	});
  },
  fetchPlayerList : function (name, notify){  
    unsafeWindow.AjaxCall.gPostRequest("searchPlayers.php",{subType:"ALLIANCE_INVITE", searchName:name},
    function(rslt){
        notify (rslt);
   	},function(rslt){
   	        notify (rslt);
    	});
  },
  gotPlayerLeaderboard : function (rslt, span){
      var t = my.AllianceList;
      if (!rslt.ok){
        span.innerHTML = rslt.errorMsg;
        return;
      }
      if (rslt.totalResults == 0){
        span.innerHTML = "<B>Leaderboard :</b> Nothing found ! ";
        return;
      }
      var p = rslt.data[0];
      
      /*var an = p.allianceName;
      if (!an || an=='' || p.officerType==4)
        an = 'None';
      else
        an += ' ('+ officerId2String(p.officerType) +')';
      m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Leaderboard : </b></td><TD colspan=2> Glory : '+ p.might  +' &nbsp; Alliance : '+ an +'</td></tr>'; 
      for (var i=0; i<p.cities.length; i++){
        var c = p.cities[i];
        m += '<TR><TD align=right><B>City #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName 
        +' <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ c.xCoord +',' +c.yCoord+ ')" class="coordinateLink">('+ c.xCoord +',' +c.yCoord+ ')</a></td><TD width=75%> &nbsp; Niveau : '
  
          + c.tileLevel +' &nbsp; &nbsp; status: '+ cityStatusString (c.cityStatus) +' &nbsp; &nbsp; cr&eacute;de : ' + c.dateCreated.substr(0,10) +'</td></tr>';
      }  */
      //span.innerHTML = m + '</table>';
      span.innerHTML = "<B>Leaderboard :</b> Under construction <br>Number of cities :"+p.numOfCities+"<br>Number of wilds : "+p.numOfWilds;
  },
   eventGotPlayerList : function (rslt){
      var t = my.AllianceList;
      if (!rslt.ok){
        document.getElementById('allListOut').innerHTML = rslt.msg;
        return;
      }
      t.playerList = rslt.matchedUsers;
      var uList = [];
      for (k in rslt.matchedUsers)
            uList.push (rslt.matchedUsers[k].userId);     
      t.fetchPlayerStatus (uList, function(r) {t.eventGotPlayerOnlineList(r)});    
  },  
  fetchPlayerStatus : function (uidArray, notify){
        unsafeWindow.AjaxCall.gPostRequest("getOnline.php",{checkArr:uidArray.join(',')},
	    function(rslt){
	        notify (rslt);
    	},function(rslt){
	        notify (rslt);
    	}); 
    },
    fetchPlayerStatusSimple : function (uid, notify){
            unsafeWindow.AjaxCall.gPostRequest("getOnline.php",{checkArr:uid},
              function (rslt) {
                notify (rslt);
              },
              function (rslt) {
                notify (rslt);
              }      );
    }, 
   fetchPlayerInfo : function (uid, notify){
          unsafeWindow.AjaxCall.gPostRequest("getUserGeneralInfo.php",{uid:uid},
	 	    function(rslt){
	 	        notify (rslt);
	     	},function(rslt){
	 	        notify (rslt);
    	}); 
  },
   clickedPlayerDetail : function (span, uid){
        var t = my.AllianceList;
        span.onclick = '';
        span.innerHTML = translate("Buscando")+"...";
        t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },
   gotPlayerDetail : function (rslt, span){
      var t = my.AllianceList;
      if (!rslt.ok){
        span.innerHTML = rslt.errorMsg;
        return;
      }
      var u = rslt.userInfo[0];
      var a = uW.arStrings.Common.None;
      if (u.allianceName)
        a = u.allianceName +' ('+ getDiplomacy(u.allianceId) + ')';
      var m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>'+uW.arStrings.Common.Details+':</b> &nbsp; </td><TD>'+uW.arStrings.Common.Alliance+': '+ a +' &nbsp; '+uW.arStrings.Common.Cities+': '
            + u.cities +' &nbsp; '+uW.arStrings.Common.Population+': '+ u.population +'</td></tr><TR><TD></td><TD>'+uW.arStrings.Leaderboard.Provinces+': ';
      var pids = u.provinceIds.split (',');
      var p = [];
      for (var i=0; i<pids.length; i++)
        p.push(unsafeWindow.arStrings.provinceName['p'+pids[i]]);
      span.innerHTML = m + p.join (', ') +'</td></tr><tr><td></td><td>Facebook : <a href=http://www.facebook.com/profile.php?id='+u.fbuid+' target=_blank>'+uW.arStrings.ModalTitle.Profile+'</a></td></tr></table>';
  },
   eventGotPlayerOnlineList : function (rslt){
          var t = my.AllianceList;
          if (!rslt.ok){
            document.getElementById('allListOut').innerHTML = rslt.errorMsg;
            return;
      }
      var m = '<DIV class=ptstat>'+translate('Resultados para')+' <B>"'+ t.pName +'"</b></div>\
        <DIV style="height:575px; max-height:575px; overflow-y:auto">\
        <TABLE width=95% align=center class=ptTab cellspacing=0><TR style="font-weight:bold"><TD width=20%>'+uW.arStrings.Common.Name+'</td>\
        <TD align=right>'+uW.arStrings.Common.Glory+' &nbsp;&nbsp;&nbsp;&nbsp;</td><TD>&nbsp;</td><TD width=60%>'+translate('Informacion extra')+'</td></tr>';
      var row=0;
      var cl='';
      for (k in t.playerList){
        var u = t.playerList[k];
        if (++row % 2)
          cl = 'class=ptOddrow ';
        else
          cl = '';
          if (u.allianceName) { var alliancenammme=u.allianceName; }else {var alliancenammme="---"; }
        m += '<TR '+ cl +'valign=top><TD>'+ u.genderAndName +'<br>'+alliancenammme+'</td><TD align=center>&nbsp;'+ addCommasInt(u.might) +'&nbsp;</td>\
            <TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldDarkRed>Online</span>":"") +'</td>\
           <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A>'+uW.arStrings.Common.Details+'</a></span></td></tr>';
      }
      m += '</table></div>';
      document.getElementById('allListOut').innerHTML = m;
  },
  
  
  clickedPlayerGetLastLogin : function (span, uid){
        var t = my.AllianceList;
        //span.onclick = '';
        //span.innerHTML = "Searching...";
        //t.fetchPlayerLastLogin (uid, function (r) {t.gotPlayerLastLogin(r, span)});
  },
  fetchPlayerLastLogin : function (uid, notify){
     
       unsafeWindow.AjaxCall.gPostRequest("viewCourt.php",{pid:uid},
      	   function(rslt){
      	        notify (rslt);
           },
           function(rslt){
      	        notify (rslt);
      });
  },
  gotPlayerLastLogin : function (rslt, span){
        var t = my.AllianceList;
        if (!rslt.ok){
          span.innerHTML = rslt.errorMsg;
          return;
        }
    
        var p = rslt.playerInfo;
        var lastLogin = rslt.playerInfo.lastLogin;
        
        if (lastLogin) {
          m = '<span style="color:black">'+lastLogin+'</span>';
        } else {
           m = '<span style="color:red">?</span>';
        }  
        span.innerHTML = m + '';
  }
}

/************************ SPAM ************************/
my.Spam = {
  cont : null,
  timer : null,  
  
  init : function (){ 
    var t = my.Spam;
    t.cont = document.createElement('div');
     return t.cont;
 },
    getContent : function (){
   	    var t = my.Spam;
   	    return t.cont;
 },
  show : function (){ 
    var t = my.Spam;
    
        var m = '<DIV class=ptstat>SPAM - '+translate('CONFIGURACION')+'</div><TABLE class=pbTab width=100% height=0% ><TR align="center">';
    
           if (Options.spamconfig.aspam == true) {
            m += '<TD><INPUT id=pbSpamEnable type=submit value="Spam = ON"></td>';
           }
           else {
            m += '<TD><INPUT id=pbSpamEnable type=submit value="Spam = OFF"></td>';
           }
    
           if (Options.spamconfig.spamstate == 'a') {
            m += '<TD><INPUT id=pbSpamState type=submit value="Chat '+uW.arStrings.MainChrome.chatGlobal+'"></td>';
           }
           else {
            m += '<TD><INPUT id=pbSpamState type=submit value="Chat '+uW.arStrings.Common.Alliance+'"></td>';
           }
            m += '</tr></table></div>';
           m += '<DIV class=ptstat>'+translate('OPCIONES')+'</div><TABLE class=pbTab>';
            m += '<tr><td>'+translate('Publicar automáticamente cada')+' <INPUT id=pbSpamMin type=text size=2 maxlength=3 value="'+ Options.spamconfig.spammins +'"  \> '+uW.arStrings.TimeStr.timeMin+'</td></tr><BR>\
                  <tr><TD><TABLE cellpadding=0 cellspacing=0>\
                  <TD align=left>'+translate('Su mensaje de spam')+' : &nbsp; </td><TD><INPUT id=pbSpamAd type=text size=60 maxlength=250 value="'+ Options.spamconfig.spamvert +'" \></td></tr>\
                  </table><BR>';
        
        t.cont.innerHTML = m;
    
        ById('pbSpamEnable').addEventListener ('click', function(){t.toggleon(this);}, false);
        ById('pbSpamAd').addEventListener ('change', t.e_spamOptChanged, false);
        ById('pbSpamMin').addEventListener ('change', t.e_spamOptChanged, false);
    ById('pbSpamState').addEventListener ('click', function(){t.togglespam(this);}, false);

  },
  hide : function (){  
    var t = my.Spam;
  },
  

 e_spamOptChanged : function (){
  var t = my.Spam;
  Options.spamconfig.spamvert = ById('pbSpamAd').value;
  Options.spamconfig.spammins = ById('pbSpamMin').value;
  if(parseInt(Options.spamconfig.spammins) < 1){
   Options.spamconfig.spammins = 1;
   ById('pbSpamMin').value = 1;
  }
  saveOptions ();
 },

 togglespam: function(obj){
  var t = my.Spam;
  if (Options.spamconfig.spamstate == 'a') {
   Options.spamconfig.spamstate = 'g';
   obj.value = 'Chat '+uW.arStrings.MainChrome.chatGlobal;
  }
  else {
   Options.spamconfig.spamstate = 'a';
   obj.value = 'Chat '+uW.arStrings.Common.Alliance;
  }
  saveOptions ();

 },

 toggleon: function(obj){
  var t = my.Spam;
  if (Options.spamconfig.aspam == true) {
   Options.spamconfig.aspam = false;
   obj.value = "Spam = OFF";
  }
  else {
   Options.spamconfig.aspam = true;
   obj.value = "Spam = ON";
   SpamEvery.init();
  }
  saveOptions ();
 }
};  
var SpamEvery  = {
  timer : null,
  spamtimer : 0,
  init : function (){
    if (!Options.spamconfig.aspam) return;
    if (Options.spamconfig.spammins < 1)
      Options.spamconfig.spammins = 1;
    SpamEvery.setEnable (Options.spamconfig.aspam);
  },
  setEnable : function (tf){
    var t = SpamEvery;
    clearTimeout (t.timer);
    if (tf)
      t.timer = setTimeout (t.count, 60*1000);
  },
  count : function (){
   var t = SpamEvery;
   t.spamtimer = Options.spamconfig.spammins;
   if(parseInt(t.spamtimer) < 10) t.spamtimer = 10;
   if (Options.spamconfig.atime > t.spamtimer) {
    Options.spamconfig.atime = 2;
    t.doit ();
   } else {
    Options.spamconfig.atime = (Options.spamconfig.atime + 1);
    SpamEvery.init ();
   }
   saveOptions ();
  },
  doit : function (){
    sendChat ("/" + Options.spamconfig.spamstate + " " +  Options.spamconfig.spamvert);
    SpamEvery.init ();
  }
}

function CdispCityPicker (id, span, dispName, notify, selbut){
  function CcityButHandler (t){
    var that = t;
    this.clickedCityBut = clickedCityBut;
    function clickedCityBut (e){
      if (that.selected != null)
        that.selected.className = "castleBut castleButNon";
      that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
      if (that.dispName)
        document.getElementById(that.id+'cname').innerHTML = that.city.c.name;
      e.target.className = "castleBut castleButSel";
      that.selected = e.target;
      if (that.coordBoxX){
        that.coordBoxX.value = that.city.c.x;
        that.coordBoxY.value = that.city.c.y;
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
      }
      if (that.notify != null)
        that.notify(that.city, that.city.c.x, that.city.c.y);
    }
  }

  function selectBut (idx){
    document.getElementById(this.id+'_'+idx).click();
  }

  function bindToXYboxes (eX, eY){
    function CboxHandler (t){
      var that = t;
      this.eventChange = eventChange;
      if (that.city){
        eX.value = that.city.c.x;
        eY.value = that.city.c.y;
      }
      function eventChange (){
        var x = parseInt(that.coordBoxX.value, 10);
        var y = parseInt(that.coordBoxY.value, 10);
        if (isNaN(x) || x<0 || x>750){
          that.coordBoxX.style.backgroundColor = '#ff8888';
          return;
        }
        if (isNaN(y) || y<0 || y>750){
          that.coordBoxY.style.backgroundColor = '#ff8888';
          return;
        }
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
        if (that.notify != null)
          that.notify (null, x, y);
      }
    }
    
    this.coordBoxX = eX;
    this.coordBoxY = eY;
    var bh = new CboxHandler(this);
    eX.size=2;
    eX.maxLength=3;
    eY.size=2;
    eY.maxLength=3;
    eX.addEventListener('change', bh.eventChange, false);
    eY.addEventListener('change', bh.eventChange, false);
  }

  this.selectBut = selectBut;
  this.bindToXYboxes = bindToXYboxes;
  this.coordBoxX = null;
  this.coordBoxY = null;
  this.id = id;
  this.dispName = dispName;
  this.prefixLen = id.length+1;
  this.notify = notify;
  this.selected = null;
  this.city = null;
  var m = '';
  for (var i=0; i<Cities.cities.length; i++)
    m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \>';
  if (dispName)
    m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
  span.innerHTML = m;
  var handler = new CcityButHandler(this);
  for (var i=0; i<Cities.cities.length; i++)
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
  if (selbut != null)
    this.selectBut(selbut);
}



function setTabStyle (e, selected){
  if (selected){
    e.className = 'matTabSel';
  } else {
    e.className = 'matTabNotSel';
  }
}

function clickedTab (e){
  who = e.target.id.substring(2);
  newObj = my[who];
  currentObj = my[currentName];
  if (currentName != who){
    setTabStyle (document.getElementById ('aa'+currentName), false);
    setTabStyle (document.getElementById ('aa'+who), true);
    if (currentObj){
      currentObj.hide ();
      currentObj.getContent().style.display = 'none';
    }
    currentName = who;
    cont = newObj.getContent();
    newObj.getContent().style.display = 'block';
  }
  newObj.show();
}

function mouseMainTab (me){
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
  }
}

function eventHideShow (){
  if (mainPop.toggleHide(mainPop)){
    my[currentName].show();
    Options.ptWinIsOpen = true;
  } else {
    my[currentName].hide();
    Options.ptWinIsOpen = false;
  }
  saveOptions();
}


function hideMe (){
  mainPop.show (false);
  my[currentName].hide();
  Options.ptWinIsOpen = false;
  saveOptions();
}

function logit (msg){
  var serverID = getServerId();
  var now = new Date();
	if (IsChrome) console.log (msg);
  else GM_log (serverID +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}

function saveCrestData (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('CrestData_' + uW.player.name + '_' +serverID, JSON2.stringify(CrestData));}, 0);
}

function saveOptions (){
  var serverID = getServerId();
  GM_setValue ('BOOptions_'+uW.player.name+'_'+serverID, JSON2.stringify(Options));
}

function saveTrainingOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('TrainingOptions_'+uW.player.name+'_'+serverID, JSON2.stringify(TrainOptions));}, 0);
}

function saveAutoAttack (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('AutoAttack_' +uW.player.name+'_'+serverID, JSON2.stringify(AutoAttack));}, 0);
}

function saveAutoBuild (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('AutoBuild_' +uW.player.name+'_'+serverID, JSON2.stringify(AutoBuild));}, 0);
}

function saveAutoResearch (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('AutoResearch_' +uW.player.name+'_'+serverID, JSON2.stringify(AutoResearch));}, 0);
}

function saveColors (){
  var serverID = getServerId();
  GM_setValue ('Colors_'+uW.player.name+'_'+serverID, JSON2.stringify(Colors));
}


function readOptions (){
  var serverID = getServerId();
  s = GM_getValue ('BOOptions_'+uW.player.name+'_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts)
      Options[k] = opts[k];
  }
}

function readCrestData (){
  var serverID = getServerId();
  s = GM_getValue ('CrestData_'+uW.player.name+'_'+serverID);
  if (s != null) {
    opts = JSON2.parse (s);
	for (var i = 0; i < opts.length; i++) {
		CrestData[i] = new CrestFunc(opts[i]);
	}
  }
}

function readGlobalOptions (){
  GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));
}

function readColors (){
  var serverID = getServerId();
  s = GM_getValue ('Colors_'+uW.player.name+'_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts)
      Colors[k] = opts[k];
  }
}

function readTrainingOptions (){
  var serverID = getServerId();
  s = GM_getValue ('TrainingOptions_'+uW.player.name+'_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
        TrainOptions[k] = opts[k];
    }
  }
}
function readAutoAttack (){
  var serverID = getServerId();
  s = GM_getValue ('AutoAttack_'+uW.player.name+'_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
        AutoAttack[k] = opts[k];
    }
  }
}

function readAutoBuild (){
  var serverID = getServerId();
  s = GM_getValue ('AutoBuild_'+uW.player.name+'_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
        AutoBuild[k] = opts[k];
    }
  }
}

function readAutoResearch (){
  var serverID = getServerId();
  s = GM_getValue ('AutoResearch_'+uW.player.name+'_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
        AutoResearch[k] = opts[k];
    }
  }
}

function createYellowButton (label,id){
  var a=document.createElement('a');
  a.className='button20';
  a.innerHTML='<span style="color: #FFFFFF">'+ label +'</span>';
  return a;
}
function createReloadButton (label,id){
  var a=document.createElement('a');
  a.className='button20';
  a.innerHTML='<span style="color: #FFCC99 ">'+ label +'</span>';
  return a;
}
function createButton (label){
  var a=document.createElement('a');
  a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
  return a;
}
function createRedButton(a,b){var c=document.createElement("a");c.style.display='none';c.className="tab";c.id=b;c.innerHTML='<span style="color: #ff6">'+a+"</span>";return c}

function AddMainTabLink(text, eventListener, mouseListener) {
  var a = createButton (text);
  a.className = 'tab';
  a.Name = 'BoTTols';
  a.id = 'BoTTols';
  a.title = ScriptName;
  var tabs = ById('main_engagement_tabs');
  if(tabs) {  
		var col_wrapper = document.getElementById("main_engagement_tabs").getElementsByTagName("a");
		var elementsToRemove = [];
		for (var i = 0; i < col_wrapper.length; i++) {
    		if (Options.HideTab && (col_wrapper[i].href.indexOf("forumdisplay.php?11-Glory-of-Rome") >= 0 || col_wrapper[i].href.indexOf("salesforce/help") >= 0 || col_wrapper[i].href == "http://www.facebook.com/apps/application.php?id=140956165916773" || col_wrapper[i].href == "https://apps.facebook.com/gloryofrome/")) {
        		elementsToRemove.push(col_wrapper[i]);
    		}
		}
		for(var i = 0; i < elementsToRemove.length; i++) {
   			elementsToRemove[i].parentNode.removeChild(elementsToRemove[i]);
		}
		
		ById('languageFlagContainer').innerHTML = pubblicity;
		setTimeout(
			function()
			{
				if (ById('languageFlagContainer')) ById('languageFlagContainer').innerHTML = pubblicity;
			}, (2 * 60 * 1000));
		if (ById('click')) ById('click').style.width = "0px";
		if (ById('gor_menu_bar')) ById('gor_menu_bar').style.height = "70px";
		
        tabs.insertBefore (a, tabs.firstChild);
        a.addEventListener('click',eventListener, false);
    	if (mouseListener != null)
      		a.addEventListener('mousedown',mouseListener, true);
    return a;
  }
  return null;
}
function AddTowerTab (text, eventListener, id) {
  var a = createRedButton (text,'botbutton');
  a.className = 'tab';
  a.title = '! '+uW.arStrings.Watchtower.IncomingAttacks.toUpperCase()+' !';
  var tabs = ById('main_engagement_tabs');
  if (tabs) {
  	tabs.insertBefore (a, tabs.firstChild);
    tabs.style.width = '1000px';
    a.addEventListener('click',eventListener, false);
    if (id != null)	a.id = id;
    return a;
  }
  return null;
}

function setCities(){
	if (uW.player.cities) {
  		var contcitt = 0;
  		Cities.cities = [];
  		Cities.byID = {};
   		uW.player.allCities().each(function(c){
    		city = {};
    		city.idx = contcitt;
    		city.id = parseInt(c.id);
    		city.c = c;
    		Cities.cities[contcitt] = city;
    		Cities.byID[c.id] = city;
     		contcitt++;
   		});
  		Cities.numCities = contcitt;
 	}
}
 
function getMyAlliance(){
  if (uW.seed.allianceDiplomacies==null || uW.seed.allianceDiplomacies.allianceName==null)
    return [0, uW.arStrings.Common.None];
  else
    return [uW.seed.allianceDiplomacies.allianceId, uW.seed.allianceDiplomacies.allianceName];
}


function getDiplomacy (aid) {
  if (uW.seed.allianceDiplomacies == null)
    return uW.arStrings.Alliance.relationNeutral;
  if (uW.seed.allianceDiplomacies.friendly && uW.seed.allianceDiplomacies.friendly['a'+aid] != null)
    return uW.arStrings.Alliance.relationFriendly;
  if (uW.seed.allianceDiplomacies.hostile && uW.seed.allianceDiplomacies.hostile['a'+aid] != null)
    return uW.arStrings.Alliance.relationHostile;
  if (aid == uW.seed.allianceDiplomacies.allianceId)
    return uW.arStrings.Common.Alliance;
  return uW.arStrings.Alliance.relationNeutral;
};

/************  LIB classes/functions .... **************/
function parseIntNan (n){
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x; 
}

  function searchDOM (node, condition, maxLevel, doMult){
    var found = [];
    eval ('var compFunc = function (node) { return ('+ condition +') }');
    doOne(node, 1);
    if(!doMult){
      if (found.length==0)
        return null;
      return found[0];
    }
    return found;
    function doOne (node, curLevel){
      try {
        if (compFunc(node))
          found.push(node);
      } catch (e){
      }      
      if (!doMult && found.length>0)
        return; 
      if (++curLevel<maxLevel && node.childNodes!=undefined)
        for (var c=0; c<node.childNodes.length; c++)
          doOne (node.childNodes[c], curLevel);
    }
  }

function getClientCoords(e){
  if (e==null)
    return {x:null, y:null, width:null, height:null};
  var x=0, y=0;
  ret = {x:0, y:0, width:e.clientWidth, height:e.clientHeight};
  while (e.offsetParent != null){
    ret.x += e.offsetLeft;
    ret.y += e.offsetTop;
    e = e.offsetParent;
  }
  return ret;
}

// creates a 'popup' div
function CPopup (prefix, x, y, width, height, enableDrag, onClose) {
  // protos ...
  
  this.BASE_ZINDEX = 8101;
  
   if (unsafeWindow.cpopupWins == null)
        unsafeWindow.cpopupWins = {};
    unsafeWindow.cpopupWins[prefix] = this;
    
  this.stmaxh = height;
  this.show = show;
  this.toggleHide = toggleHide;
  this.getTopDiv = getTopDiv;
  this.getMainDiv = getMainDiv;
  this.getZindex = getZindex;
  this.setZindex = setZindex;
  this.setEnableDrag = setEnableDrag;
  this.getLocation = getLocation;
  this.setLocation = setLocation;
  this.focusMe = focusMe;
  this.unfocusMe = unfocusMe;
  this.centerMe = centerMe;
  this.destroy = destroy;
  this.autoHeight = autoHeight;
  
  // object vars ...
  this.div = document.createElement('div');
  this.div.id = prefix +'_outer';
  this.prefix = prefix;
  this.onClose = onClose;
  
  var t = this;
  this.div.className = 'CPopup '+ prefix +'_CPopup';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX;        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.opacity = '0.9';
  this.div.style.height = height + 'px';
  this.div.style.maxHeight = height + 'px';
  this.div.style.overflowY = 'hidden';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  
    
  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="CPopupTop"><TD id="'+ prefix +'_top" width=100%></td>\
      <TD style="align:right; vertical-align:middle;" id="'+ prefix +'_X" ><img src="'+XX+'" height="20px" width="20px" onmouseover="this.style.cursor=\'pointer\'" title="'+uW.arStrings.Common.Close+'"></td></tr>\
      <TR><TD valign=top class="CPopMain '+ prefix +'_CPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';
  document.body.appendChild(this.div);
  this.div.innerHTML = m;
  ById(prefix+'_X').addEventListener ('click', new CeventXClose(this).handler, false);
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);

  this.div.addEventListener ('mousedown', e_divClicked, false);

  function autoHeight (onoff){
     if (onoff) {
       t.div.style.height = '';  
       t.div.style.maxHeight ='';
    } else{
       t.div.style.height = t.stmaxh;
       t.div.style.maxHeight = t.stmaxh;
       }
  }
  
  function e_divClicked (){
    t.focusMe();
  }  
  function CeventXClose (that){
    var t = that;
    this.handler=handler;
    function handler (){
      t.show(false);
      if (t.onClose != null)
        t.onClose();
    }
  }
  
  function focusMe (){
   //alert((this.BASE_ZINDEX + 5));
    t.div.style.zIndex = (this.BASE_ZINDEX + 5);
    for (k in unsafeWindow.cpopupWins){
      if (k != t.prefix)
        unsafeWindow.cpopupWins[k].unfocusMe(); 
    }
  }
    function destroy (){
      document.body.removeChild(t.div);
      //WinManager.delete (t.prefix);
  }
  
  function centerMe (parent){
      if (parent == null){
        var coords = getClientCoords(document.body);
      } else
        var coords = getClientCoords(parent);
      var x = ((coords.width - parseInt(t.div.style.width)) / 2) + coords.x;
      var y = ((coords.height - parseInt(t.div.style.height)) / 2) + coords.y;
      if (x<0)
        x = 0;
      if (y<0)
        y = 0;
      t.div.style.left = x +'px';
      t.div.style.top = y +'px';
  }
  function unfocusMe (){
    //alert((this.BASE_ZINDEX - 5));
    t.div.style.zIndex = ''+ (this.BASE_ZINDEX - 5);
  }
  function getLocation (){
    return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
  }

  function setLocation (loc){
    t.div.style.left = loc.x +'px';
    t.div.style.top = loc.y +'px';
  }

  function setEnableDrag (tf){
    t.dragger.setEnable(tf);
  }
  function setLayer(zi){
    t.div.style.zIndex = this.BASE_ZINDEX + zi;
  }
  function getLayer(){
    return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;
  }
  function setZindex(zi){
    this.div.style.zIndex = ''+zi;
  }

  function getZindex(){
    return parseInt(this.div.style.zIndex);
  }

  function getTopDiv(){
    return document.getElementById(this.prefix+'_top');
  }

  function getMainDiv(){
    return document.getElementById(this.prefix+'_main');
  }
    function getMainTopDiv(){
    	return document.getElementById(this.prefix+'_top');
  }
  function isShown (){
    return t.div.style.display == 'block';
  }
  function show(tf){
     if (tf){
       t.div.style.display = 'block';
       t.focusMe ();
     } else {
       t.div.style.display = 'none';
     }
     return tf;
   }
   function toggleHide(t){
     if (t.div.style.display == 'block') {
       return t.show (false);
     } else {
       return t.show (true);
     }
  }
}
function CWinDrag (clickableElement, movingDiv, enabled) {
  var t=this;
  this.setEnable = setEnable;
  this.setBoundRect = setBoundRect;
  this.debug = debug;
  this.dispEvent = dispEvent;
  this.lastX = null;
  this.lastY = null;
  this.enabled = true;
  this.moving = false;
  this.theDiv = movingDiv;
  this.body = document.body;
  this.ce = clickableElement;
  this.moveHandler = new CeventMove(this).handler;
  this.outHandler = new CeventOut(this).handler;
  this.upHandler = new CeventUp(this).handler;
  this.downHandler = new CeventDown(this).handler;
  this.clickableRect = null;
  this.boundRect = null;
  this.bounds = null;
  this.enabled = false;
  if (enabled == null)
    enabled = true;
  this.setEnable (enabled);

  function setBoundRect (b){    // this rect (client coords) will not go outside of current body
    this.boundRect = boundRect;
    this.bounds = null;
  }

  function setEnable (enable){
    if (enable == t.enabled)
      return;
    if (enable){
      clickableElement.addEventListener('mousedown',  t.downHandler, false);
      t.body.addEventListener('mouseup', t.upHandler, false);
    } else {
      clickableElement.removeEventListener('mousedown', t.downHandler, false);
      t.body.removeEventListener('mouseup', t.upHandler, false);
    }
    t.enabled = enable;
  }

  function CeventDown (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.bounds == null){
        t.clickableRect = getClientCoords(clickableElement);
        t.bodyRect = getClientCoords(document.body);
        if (t.boundRect == null)
          t.boundRect = t.clickableRect;
        t.bounds = {top:10-t.clickableRect.height, bot:t.bodyRect.height-25, left:40-t.clickableRect.width, right:t.bodyRect.width-25};
      }
      if (me.button==0 && t.enabled){
        t.body.addEventListener('mousemove', t.moveHandler, true);
        t.body.addEventListener('mouseout', t.outHandler, true);
        t.lastX = me.clientX;
        t.lastY = me.clientY;
        t.moving = true;
      }
    }
  }

  function CeventUp  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (me.button==0 && t.moving)
        _doneMoving(t);
    }
  }

  function _doneMoving (t){
    t.body.removeEventListener('mousemove', t.moveHandler, true);
    t.body.removeEventListener('mouseout', t.outHandler, true);
    t.moving = false;
  }

  function CeventOut  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
//t.dispEvent ('eventOUT', me);
      if (me.button==0){
        t.moveHandler (me);
      }
    }
  }

  function CeventMove (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.enabled && !t.wentOut){
//t.dispEvent ('eventMOVE', me);
        var newTop = parseInt(t.theDiv.style.top) + me.clientY - t.lastY;
        var newLeft = parseInt(t.theDiv.style.left) + me.clientX - t.lastX;
        if (newTop < t.bounds.top){     // if out-of-bounds...
          newTop = t.bounds.top;
          _doneMoving(t);
        } else if (newLeft < t.bounds.left){
          newLeft = t.bounds.left;
          _doneMoving(t);
        } else if (newLeft > t.bounds.right){
          newLeft = t.bounds.right;
          _doneMoving(t);
        } else if (newTop > t.bounds.bot){
          newTop = t.bounds.bot;
          _doneMoving(t);
        }
        t.theDiv.style.top = newTop + 'px';
        t.theDiv.style.left = newLeft + 'px';
        t.lastX = me.clientX;
        t.lastY = me.clientY;
      }
    }
  }

  function debug  (msg, e){
    logit ("*************** "+ msg +" ****************");
    logit ('clientWidth, Height: '+ e.clientWidth +','+ e.clientHeight);
    logit ('offsetLeft, Top, Width, Height (parent): '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' ('+ e.offsetParent +')');
    logit ('scrollLeft, Top, Width, Height: '+ e.scrollLeft +','+ e.scrollTop +','+ e.scrollWidth +','+ e.scrollHeight);
  }

  function dispEvent (msg, me){
    logit (msg + ' Button:'+ me.button +' Screen:'+ me.screenX +','+ me.screenY +' client:'+  me.clientX +','+ me.clientY +' rTarget: '+ me.relatedTarget);
  }
}


function inspect(obj, maxLevels, level, doFunctions){
  var str = '', type, msg;
  if(level == null)  level = 0;
  if(maxLevels == null) maxLevels = 1;
  if(maxLevels < 1)
      return 'Inspect Error: Levels number must be > 0';
  if(obj == null)
    return 'ERROR: Object is NULL\n';
  var indent = '';
  for (var i=0; i<level; i++)
    indent += '  ';
  for(property in obj) {
    //logit(property);
    try {
        type =  matTypeof(obj[property]);
        if (doFunctions==true && (type == 'function')){
          str += indent + '(' + type + ') ' + property + "[FUNCTION]\n   " + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
        } else if (type != 'function') {
          str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
        }
        if((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse
          
        //if (doFunctions==true && (type == 'function') && (obj[property] != null) && (level+1 < maxLevels))
        // str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse
    }
    catch(err) {
      // Is there some properties in obj we can't access? Print it red.
      if(typeof(err) == 'string') msg = err;
      else if(err.message)        msg = err.message;
      else if(err.description)    msg = err.description;
      else                        msg = 'Unknown';
      str += '(Error) ' + property + ': ' + msg +"\n";
    }
  }
  str += "\n";
  return str;
}

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) { 
            if (!this[i].compare(testArr[i])) return false;
        }
        if (this[i] !== testArr[i]) return false;
    }
    return true;
}

String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;' };
String.prototype.htmlEntities = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret  = ret.split(k).join(this.entityTrans[k]);
  return ret;
}	

String.prototype.stripTags = function(){ 
  return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
}

String.prototype.capitalize = function(){ 
  return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
}

function objectName (o){
  var s = o.toString();
  return s.substr(7,s.length-8);
}

function matTypeof (v){
  if (v == undefined)
    return 'undefined';
  if (typeof (v) == 'object'){
    if (!v)
      return 'null';
    else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
      return 'array';
    else return 'object';
  }
  return typeof (v);
}

function addCommasInt(n){
  nStr = parseInt(n) + '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(nStr)) {
    nStr = nStr.replace(rgx, '$1' + ',' + '$2');
  }
  return nStr;
}

function addCommas(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}


function htmlSelector (valNameObj, curVal, tags){
  var m = [];
  m.push ('<SELECT');
  if (tags){
    m.push (' ');
    m.push (tags);
  }  
  for (var k in valNameObj){
    m.push ('><OPTION ');
    if (k == curVal)
      m.push ('SELECTED ');
    m.push ('value="');
    m.push (k);
    m.push ('">');
    m.push (valNameObj[k]);
    m.push ('</option>');
  }
  m.push ('</select>');
  return m.join ('');
}


function unixTime (){
  return parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;
}
function htmlOptions (a, curVal){
  m = '';
  for (k in a)
    m += '<OPTION value="'+ k +'"'+ (k==curVal?' SELECTED':'')  +'>'+ a[k] +'</option>';
  return m;
}
function getFunctionName (func){
  var name=/\W*function\s+([\w\$]+)\(/.exec(func);
  if (!name)
    return '';
  return name[1];
}

function findAllBetween (txt, find1, find2){
  var m = [];
  var last = 0;
  while ( (i1=txt.indexOf(find1, last))>=0 && (i2=txt.indexOf (find2, i1))>=0 ) {
    m.push (txt.substring(i1+find1.length, i2));
    last = i2 + find2.length;
  }
  return m;
}

function strUpTo (s, find){
  var i = s.indexOf(find);
  if (i > 0)
    return s.substr(0, i);
  return s;
}



function timestrShort(time) {
  time = parseInt (time);
  if (time > 86400){
    var m = [];
    time /= 3600;
    m.push (parseInt(time/24)); 
    m.push ('d ');
    m.push (parseInt(time%24)); 
    m.push ('h ');
    return m.join ('');    
  } else
    return timestr (time);
}

function timestr(time, full) {
  time = parseInt (time);
  var m = [];
  var t = time;
  if (t < 61)
    return  t + 's';
  if (t > 86400){
    m.push (parseInt(t/86400)); 
    m.push ('d ');
    t %= 86400;
  }  
  if (t>3600 || time>3600){
    m.push (parseInt(t/3600)); 
    m.push ('h ');
    t %= 3600;
  }  
  m.push (parseInt(t/60)); 
  m.push ('m');
  if (full || time<=3600 ){
    m.push (' ');
    m.push (t%60);
    m.push ('s');  
  }
  return m.join ('');
}

function AjaxRequest (url, opts)
{
	var timer = null;
	var method = 'GET';
	var ajax, k;
	var headers = {};
	var a = [];
	var parmStr;
	// Parse request parameters
	if (opts.method == 'POST')
	{
		for (k in opts.parameters)
			a.push(k + '=' + opts.parameters[k]);
		parmStr = a.join('&'); 
	}
	else url = addUrlArgs(url, opts.parameters);

	if (IsChrome) headers['Accept']='*/*';
	else headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,*/*;q=0.6,*/*;q=0.4';

	if (window.XMLHttpRequest) ajax=new XMLHttpRequest();
	else ajax=new ActiveXObject("Microsoft.XMLHTTP");

	if (opts.method) method = opts.method.toUpperCase();
	if (method == 'POST')
	{
		headers['content-type'] = 'application/x-www-form-urlencoded';
		headers['x-s3-aws'] = SHA1("Draoumculiasis" + parmStr + "LandCrocodile" + url  + "Bevar-Asp");
	} 

	ajax.onreadystatechange = 
  	function()
  	{
  		//  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
  		if (ajax.readyState==4)
  		{
  			clearTimeout (timer);  
  			if ((ajax.status >= 200 && ajax.status < 300) || ajax.status == 304) 
  			{
  				if (opts.onSuccess) opts.onSuccess({responseText:ajax.responseText, status:ajax.status, statusText:ajax.statusText, ajax:ajax});
  			}
  			else
  			{
  				if (opts.onFailure) opts.onFailure({responseText:ajax.responseText, status:ajax.status, statusText:ajax.statusText, ajax:ajax});
  			}
  		}
  	};

	ajax.open(opts.method, url, true);   // always async!
	for (k in headers)
	ajax.setRequestHeader (k, headers[k]);
	if (opts.timeoutSecs) timer = setTimeout (timedOut, opts.timeoutSecs*1000);
	if (method == 'POST') ajax.send (parmStr);
	else ajax.send();

	function timedOut()
	{
		ajax.abort();
		if (opts.onFailure) opts.onFailure({responseText:null, status:599, statusText:'Timed Out', ajax:ajax});
	}
}   

function MyAjaxRequest (url, o, noRetry){

  var opts = unsafeWindow.Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 5;
  var noRetry = noRetry===true?true:false;
  opts.onSuccess = mySuccess;
  opts.onFailure = myFailure;


  new AjaxRequest(url, opts);
  return;

  function myRetry(){
    ++retry;
    new AjaxRequest(url, opts);
    delay = delay * 1.25;
  }

  function myFailure(){
    var o = {};
    o.ok = false;
    o.errorMsg = "AJAX Communication Failure";
    wasFailure (o);
  }

  function mySuccess (msg){
    var rslt = eval("(" + msg.responseText + ")");
    var x;
    if (rslt.ok){
      rslt.errorMsg = null;   ///// !!!!!!!!!!!!!  ************
      if (rslt.updateSeed)
        unsafeWindow.update_seed(rslt.updateSeed);
      wasSuccess (rslt);
      return;
    }
    rslt.errorMsg = rslt.error_code ; //unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    //if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
    //  rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      //dialogRetry (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)});
    } else {
      wasSuccess (rslt);
    }
  }
}


function cityStatusString (cs){
  if (cs==4)
    return 'Vacances';
  if (cs==3)
    return 'Truce';
  if (cs==2)
    return 'Beg Protection';
  return 'Normal';
}   
function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return uW.arStrings.Common.Officer;
  else if (oid==2)
    return uW.arStrings.Common.ViceChancellor;
  else if (oid==1)
    return uW.arStrings.Common.Chancellor;
  return '';
}

/************  LIB singletons .... **************/
// TODO: fix REopening window
var WINLOG_MAX_ENTRIES = 1000;     // TODO
var WinLog = {
  state : null,
  win: null,
  eOut : null,
  lastE : null,
  enabled : true,
  reverse : true,
  busy : false,
isOpening : false,

  open : function (){
    var t = WinLog;

    function eventButClear(){
      var t = WinLog;
      t.lastE = null;
      t.eOut.innerHTML ='';
    }
    function eventButReverse(){
      var t = WinLog;
      if (t.busy)
        return;
      t.busy = true;
      if (t.reverse){
        t.win.document.getElementById('wlRev').value= 'Top';
        t.reverse = false;
      } else{
        t.win.document.getElementById('wlRev').value= 'Bottom';
        t.reverse = true;
      }
      var n = t.eOut.childNodes.length;
      if (n < 2)
        return;
      for (i=n-2; i>=0; i--){
        t.eOut.appendChild (t.eOut.childNodes[i]);
      }
      t.busy = false;
    }
    
    if (!t.win || t.win.closed){
t.isOpening = true;  
// Firefox bug??? It appears as if a new thread is started on open, withOUT reusing same window
      t.win = window.open('', 'uwtrace', 'top=30,left=0,width=900,height=700,scrollbars=no,location=no,menubar=no,directories=no,status=no');
t.isOpening = false; 
t.state = null; 
    }
    
    if (t.state == null){
      t.win.document.body.innerHTML = '<STYLE>pre{margin:0px} hr{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee}</style>\
        <BODY style="margin:0px; padding:0px; border:none">\
        <DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid">\
        <INPUT id=wlClear type=submit value="Clear"> &nbsp; <INPUT id=wlRev type=submit value="Bottom"></div>\
        <DIV id=wlOut style="overflow-y:auto; height:100%; max-height:100%"></div></body>';
      t.win.document.getElementById('wlClear').addEventListener('click', eventButClear, false);
      t.win.document.getElementById('wlRev').addEventListener('click', eventButReverse, false);
      t.eOut =  t.win.document.getElementById('wlOut');
	  t.lastE = null;
      t.state = 1;
    }
  },
  writeText : function (msg){
    WinLog.write (msg.htmlEntities()); 
  },
  write : function (msg){
    var t = WinLog;
    if (!t.enabled || t.isOpening)
      return;
    t.open();
    var te = document.createElement('pre');
    var now = new Date();
    var m = [];
    var millis = now.getMilliseconds();
    m.push (now.toTimeString().substring (0,8));
    m.push ('.');
    if (millis<100)
      m.push('0');
    if (millis<10)
      m.push('0');
    m.push(millis);
    m.push (': ');
    m.push (msg);
    te.innerHTML = m.join('');

    if (t.reverse){
      if (t.lastE == null){
        t.eOut.appendChild(te);
        t.lastE = te;
      } else {
        t.eOut.insertBefore(te, t.lastE);
      }
      var hr = document.createElement('hr');
      t.eOut.insertBefore(hr, te);
      t.lastE = hr;
    } else {
      t.eOut.appendChild(te);
      t.eOut.appendChild(document.createElement('hr'));
    }
  }
};

function ById(id) {
	return document.getElementById(id);
}

function addCommasWhole(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1;
}

function SelectAll(id)
{
 document.getElementById(id).focus();document.getElementById(id).select();
} 




function HandleChatPane() {
	var DisplayName = GetDisplayName();
	var GlobalChatBox=document.getElementById('mod_comm_list1');
	var AllianceChatBox=document.getElementById('mod_comm_list2');
	if(AllianceChatBox){
		var chatPosts = document.evaluate(".//div[contains(@class,'chatwrap')]", AllianceChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		if(chatPosts){
			for (var i = 0; i < chatPosts.snapshotLength; i++) {
				thisPost = chatPosts.snapshotItem(i);
				if(true){
				//if(this.options.autoHelpAlliance){
				
				var postAuthor = document.evaluate('.//*[@class="nm"]', thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
				if(Options.HelpRequest){
				 if(postAuthor.snapshotItem(0)){
						var postAuthorName = postAuthor.snapshotItem(0).innerHTML;
						if(postAuthorName != DisplayName){
							var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'Chat.helpAlliance')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );  
							if(helpAllianceLinks){
								for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
									thisLink = helpAllianceLinks.snapshotItem(j);
									var alreadyClicked = thisLink.getAttribute("clicked");
									if(!alreadyClicked){
										thisLink.setAttribute('clicked', 'true');
										var myregexp = /(Chat.helpAlliance\(.*\);)/;
										var match = myregexp.exec(thisLink.getAttribute("onclick"));
										if (match != null) {
											onclickCode = match[0];
											if(true){
												DoUnsafeWindow(onclickCode);
												AddToCommandHistory(onclickCode, 'alliance_help');
											}
										}
									}
								}
							}
						}
					}
				 }
				}
				// Hide alliance requests in chat
				if(Options.DeleteRequest){
					var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'Chat.helpAlliance')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
					if(helpAllianceLinks){
						for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
							thisLink = helpAllianceLinks.snapshotItem(j);
							thisLink.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode);
						}
					}
				}
				// Hide rules in chat
				if(Options.DeleteRules){
				 var myregexp1 = uW.arStrings.MainChrome.ChatRules;
				 if (thisPost.innerHTML.match(myregexp1)) {
				   thisPost.parentNode.removeChild(thisPost);
				 }
				}
				// Hide alliance reports in chat
				if(Options.DeleteRequest){
					var myregexp1 = uW.arStrings.Chat.HelpRequestFail1;
					var myregexp2 = uW.arStrings.Chat.HelpRequestFail2;
					var myregexp3 = uW.arStrings.Chat.HelpRequestFail3;
					var myregexp4 = uW.arStrings.Chat.HelpRequestFail4;
					var myregexp5 = uW.arStrings.help_friend.error_dontneedhelp;
					var myregexp6 = uW.arStrings.help_friend.error_alreadydone;
					var myregexp7 = uW.arStrings.help_friend.error_maximumhelp;
					var myregexp8 = uW.arStrings.help_friend.error_alreadyhelped;
					var myregexp9 = uW.arStrings.help_friend.error_cantprocess;
					var myregexp10 = uW.arStrings.help_friend.error_contentheaderbuildhelp;
										
					if (thisPost.innerHTML.match(myregexp1) || thisPost.innerHTML.match(myregexp2) || thisPost.innerHTML.match(myregexp3) || thisPost.innerHTML.match(myregexp4) || thisPost.innerHTML.match(myregexp5) ||
						thisPost.innerHTML.match(myregexp6) || thisPost.innerHTML.match(myregexp7) || thisPost.innerHTML.match(myregexp8) || thisPost.innerHTML.match(myregexp9) || thisPost.innerHTML.match(myregexp10)) {
						thisPost.parentNode.removeChild(thisPost);
					}
				}
			}	
		}	
	}
	if(GlobalChatBox){
		var chatPosts = document.evaluate(".//div[contains(@class,'chatwrap')]", GlobalChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		if(chatPosts){
			for (var i = 0; i < chatPosts.snapshotLength; i++) {
				thisPost = chatPosts.snapshotItem(i);
				if(true){
				//if(this.options.autoHelpAlliance){
				
				var postAuthor = document.evaluate('.//*[@class="nm"]', thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
				if(Options.HelpRequest){
				 if(postAuthor.snapshotItem(0)){
						var postAuthorName = postAuthor.snapshotItem(0).innerHTML;
						if(postAuthorName != DisplayName){
							var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'Chat.helpAlliance')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );  
							if(helpAllianceLinks){
								for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
									thisLink = helpAllianceLinks.snapshotItem(j);
									var alreadyClicked = thisLink.getAttribute("clicked");
									if(!alreadyClicked){
										thisLink.setAttribute('clicked', 'true');
										var myregexp = /(Chat.helpAlliance\(.*\);)/;
										var match = myregexp.exec(thisLink.getAttribute("onclick"));
										if (match != null) {
											onclickCode = match[0];
											if(true){
												DoUnsafeWindow(onclickCode);
												AddToCommandHistory(onclickCode, 'alliance_help');
											}
										}
									}
								}
							}
						}
					}
				 }
				}
				// Hide alliance requests in chat
				if(Options.DeleteRequest){
					var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'Chat.helpAlliance')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
					if(helpAllianceLinks){
						for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
							thisLink = helpAllianceLinks.snapshotItem(j);
							thisLink.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode);
						}
					}
				}
				// Hide rules in chat
				if(Options.DeleteRules){
				 var myregexp1 = uW.arStrings.MainChrome.ChatRules;
				 if (thisPost.innerHTML.match(myregexp1)) {
				   thisPost.parentNode.removeChild(thisPost);
				 }
				}
				// Hide alliance reports in chat
				if(Options.DeleteRequest){
					var myregexp1 = uW.arStrings.Chat.HelpRequestFail1;
					var myregexp2 = uW.arStrings.Chat.HelpRequestFail2;
					var myregexp3 = uW.arStrings.Chat.HelpRequestFail3;
					var myregexp4 = uW.arStrings.Chat.HelpRequestFail4;
					var myregexp5 = uW.arStrings.help_friend.error_dontneedhelp;
					var myregexp6 = uW.arStrings.help_friend.error_alreadydone;
					var myregexp7 = uW.arStrings.help_friend.error_maximumhelp;
					var myregexp8 = uW.arStrings.help_friend.error_alreadyhelped;
					var myregexp9 = uW.arStrings.help_friend.error_cantprocess;
					var myregexp10 = uW.arStrings.help_friend.error_contentheaderbuildhelp;
										
					if (thisPost.innerHTML.match(myregexp1) || thisPost.innerHTML.match(myregexp2) || thisPost.innerHTML.match(myregexp3) || thisPost.innerHTML.match(myregexp4) || thisPost.innerHTML.match(myregexp5) ||
						thisPost.innerHTML.match(myregexp6) || thisPost.innerHTML.match(myregexp7) || thisPost.innerHTML.match(myregexp8) || thisPost.innerHTML.match(myregexp9) || thisPost.innerHTML.match(myregexp10)) {
						thisPost.parentNode.removeChild(thisPost);
					}
				}
			}	
		}	
	}
}	


function GetCommandHistory(history_log_name) {
	if(!history_log_name){
		var history_log_name = "default";
	}
	var json= "";
	if(json=='') json='{}';
	var json_object=JSON2.parse(json);
	if(!json_object['items']){
		json_object['items'] = Array();
	}
	return json_object;
}

function AddToCommandHistory(command_string, history_log_name, log_length_limit) {
	if(!command_string){ return false; }
	if(!history_log_name){ var history_log_name = "default"; }
	// Default to a history length of 20 commands
	if(!log_length_limit){ var log_length_limit = 20; }
	// Get the previous history of commands
	var previous_commands = GetCommandHistory(history_log_name);
	var items = previous_commands['items'];
	// Add the new command
	items.push(command_string);
	// Limit the history length
	if(items.length>log_length_limit){
		items = items.slice(items.length-log_length_limit);
	}
	previous_commands['items'] = items;
	//alert(history_log_name +' - '+JSON2.stringify(previous_commands));
	//History.push = {log_name_history_log_name,JSON2.stringify(previous_commands)};
	//alert(History.toSource());
}		

function FindInCommandHistory(command_string, history_log_name) {
	if(!command_string){ return false; }
	if(!history_log_name){ var history_log_name = "default"; }
	// Get the previous history of commands
	var previous_commands = GetCommandHistory(history_log_name);
	var items = previous_commands['items'];
	for(var i=0; i<items.length; i++){
		if(items[i] == command_string){
			return true;
		}
	}
	return false;
}
		
function addStyle(css)
{
	if (IsChrome)
	{
		var head = document.getElementsByTagName('head')[0];
		if (!head) {return} 
		style = document.createElement('style'); 
		style.type = 'text/css'; 
		try
		{
			style.innerHTML = css;
		}
		catch(e)
		{
			style.innerText = css;
		} 
		head.appendChild(style); 
	}
	else GM_addStyle (css);
}
		
function DoUnsafeWindow(func, execute_by_embed) {
	if(this.isChrome || execute_by_embed) {
		var scr=document.createElement('script');
		scr.innerHTML=func;
		document.body.appendChild(scr);
	} else {
		try {  
			eval("unsafeWindow."+func);
		} catch (error) {
			this.Log("A javascript error has occurred when executing a function via DoUnsafeWindow. Error description: "+error.description);
		}
	}
}	


function GetDisplayName(){
	var DisplayName = document.getElementById('topnavDisplayName');
	if(DisplayName){
		DisplayName = DisplayName.innerHTML;
	}else{
		DisplayName = null;
	}
	return DisplayName
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

function getTroopMax(id) {
	var TROOPS_PER_RALLY_LEVEL={1:10000,2:25000,3:35000,4:50000,5:60000,6:75000,7:80000,8:100000,9:150000,10:200000};
	return TROOPS_PER_RALLY_LEVEL[unsafeWindow.Building.getMaxLevelForType(unsafeWindow.Constant.Building.RALLY_SPOT,id)];
}

// returns {count, maxlevel}
function getCityBuilding (cityId, buildingId){
  var b = Seed.buildings['city'+cityId];
  var ret = {count:0, maxLevel:0};
  for (var i=1; i<33; i++){
    if (b['pos'+i] && b['pos'+i][0] == buildingId){
      ++ret.count;
      if (parseInt(b['pos'+i][1]) > ret.maxLevel)
        ret.maxLevel = parseInt(b['pos'+i][1]);
    }
  }
  return ret;
}

String.prototype.StripQuotes = function() {
	return this.replace(/"/g,'');
};

function translate( wordToTranslate ) {
    var returnWord = wordToTranslate
    if (Options.Lingua == 2) {
        if ( translateITAArray[wordToTranslate] != undefined ) {
            returnWord = translateITAArray[wordToTranslate];
        }
 /*   } else {
    	if(Options.Lingua == 3){
        	if (translateFRArray[wordToTranslate] != undefined ) {
            	returnWord = translateFRArray[wordToTranslate]
            }
        } else {    	
    		if(Options.Lingua == 4){
        		if (translateNLArray[wordToTranslate] != undefined ) {
        	    	returnWord = translateNLArray[wordToTranslate]
        	    }
        	} else {
        		if(Options.Lingua == 5){
        			if (translateTRArray[wordToTranslate] != undefined ) {
        	    		returnWord = translateTRArray[wordToTranslate]        	
        			}
        		} else {
        			if(Options.Lingua == 6){
        				if (translateDKArray[wordToTranslate] != undefined ) {
        	    			returnWord = translateDKArray[wordToTranslate] 
        	    		}
        	    	} else {
        				if(Options.Lingua == 7){
        					if (translateGEArray[wordToTranslate] != undefined ) {
        	    				returnWord = translateGEArray[wordToTranslate] 
        	    			}
        	    		} else {
        	    			if (Options.Lingua == 8){
								if (translateSPArray[wordToTranslate] != undefined ) {
        	    					returnWord = translateSPArray[wordToTranslate] 
        	    				}
        	    			}
        	    		}
        	    	}
        		}
        	}
        }	**/
    }
    return returnWord;
}

var popResRequest = null;
function ResRequest () {
     if (popResRequest == null) {
     	popResRequest = new CPopup('BOPopResRequest', 50, 150, 400, 200, true);
     	popResRequest.centerMe (mainPop.getMainDiv());
   	}
    popResRequest.getTopDiv().innerHTML = '<CENTER><B>'+translate('Solicitud de recursos')+'</b></center>';
    var m = '<br><b>'+translate('¿Qué recursos desea pedir su alianza')+'?</b>';
    	m+= '<br>';
    	m+= '<br>'+uW.arStrings.ResourceName[0]+'';
    	m+= '<br>'+uW.arStrings.ResourceName[1]+'';
    	m+= '<br>'+uW.arStrings.ResourceName[2]+'';
    	m+= '<br>'+uW.arStrings.ResourceName[3]+'';
    	m+= '<br>'+uW.arStrings.ResourceName[4]+'';
    popResRequest.getMainDiv().innerHTML = m;
    popResRequest.show (true);
}

function alertlang () {
		var popLangAlert = null;
		popLangAlert = new CPopup('BOPopLANGAlert', 50, 150, 400, 200, true);
		popLangAlert.getTopDiv().innerHTML = '<DIV align=center><h2><B>'+uW.arStrings.Tutorial['Step1.Title'].toUpperCase()+' by '+Autore+'</B></h2></DIV>';
		var m = '<center><b><i>Thank you for installing the '+ScriptName+'</i>';
			m+= '<br>Before you begin, choose your language!</b>';
			m+= '<br><br>'+htmlSelector({0:'...', 1:uW.arStrings.languageNames.en, 2:uW.arStrings.languageNames.it},Options.Lingua,'id=BOFirstLangue');
		popLangAlert.getMainDiv().innerHTML = m;
    	ById("BOFirstLangue").addEventListener('change', function(){
   	 		Options.Lingua = ById('BOFirstLangue').value;
	 		saveOptions();
   	 		reloadKOC();
	 	} , false);
		popLangAlert.show (true);
}
function alerthq () {
		var popHQAlert = null;
		popHQAlert = new CPopup('BOPopHQAlert', 50, 150, 400, 200, true);
		popHQAlert.getTopDiv().innerHTML = '<DIV align=center><h2><B>'+ScriptName+'</B></h2></DIV>';
		var m = '<center><br><br><b>'+translate('Establecer su ciudad bunker');
			m+= '<br><br>';
			m+= '<SELECT id=pcpopalertHQ name=pcpopalertHQ><option value="">.....</option>';
   			for(var c=0; c<Cities.numCities; c++) {
   			 	aCity = Cities.cities[c].c.id;
   			 	aVisuCity = Cities.cities[c].c.name + ' '+Cities.cities[c].c.x + ','+ Cities.cities[c].c.y+' ';
   			 	m+='<option value=\''+ aCity +'\' '+ (Options.alertConfig.hq==aCity?'SELECTED ':'') +'>'+aVisuCity+"</option>";
   			}
   			m+= '</select>';
		popHQAlert.getMainDiv().innerHTML = m;
		ById("pcpopalertHQ").addEventListener('change', function(){
			Options.alertConfig.hq=ById('pcpopalertHQ').options[ById('pcpopalertHQ').selectedIndex].value;
			saveOptions();
   	 		reloadKOC();
	 	} , false);
		popHQAlert.show (true);
	}
function CheckUpdates ()
{
  	
 	GM_xmlhttpRequest
	(
		{
			method	:	"GET",
			url		:	"http://gamespowerita.com/Tools/GoR/bottols.user.js",
			onload	: 
				function (a)
				{
					var b = /\/\/\s*@version\s+(.+)\s*\n/i.exec(a.responseText);
       				var c = Version;
       				if (b)
       				{
       					if (b[1] > c)
       					{
       						if (ById('idp_outer')) ById('idp_outer').style.display="none";
       						if (ById('BoTTols')) ById('BoTTols').style.display="none";
							var popUpdateAlert = null;
							popUpdateAlert = new CPopup('BOPopUPDATEAlert', 500, 200, 200, 100, true);
							popUpdateAlert.getTopDiv().innerHTML = '<DIV align=center><h2><B>'+ScriptName+'</B></h2></DIV>';
							var m = '<center><br><b>'+translate('Version')+" "+b[1]+" "+translate('available')+"!";
								m+= '<br><br><input type="button" value="'+translate('Install')+'" id=BOInstall>';
							popUpdateAlert.getMainDiv().innerHTML = m;
    						
    						ById("BOInstall").addEventListener('click', function(){
   	 							window.open(sitesupport);
	 						} , false);
							popUpdateAlert.show (true);
       					}
       				}
       			},
       		onerror : 
       			function(a)
       			{
       				reloadKOC();
       			}
       	}
    );
}
ptStartup (); 
})();