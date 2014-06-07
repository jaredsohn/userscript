
// ==UserScript==
// @name           KOC Power Bot
// @version        FORK_20130228a
// @namespace      mat
// @homepage       http://userscripts.org/scripts/show/155469
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @include        *.kingdomsofcamelot.com/*platforms/kabam*
// @include        *apps.facebook.com/kingdomsofcamelot/*
// @include        *kabam.com/games/kingdoms-of-camelot/play*
// @include 	   *kabam.com/nl/games/kingdoms-of-camelot/*
// @include        *facebook.com/dialog/feed*
// @icon 	       https://code.google.com/p/koc-power-tools/logo?cct=1354990544

// @grant       GM_getValue
// @grant       unsafeWindow
// @grant       GM_deleteValue
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @grant       GM_registerMenuCommand

// ==/UserScript==

//Fixed weird bug with koc game
if(window.self.location != window.top.location){
   try{
      if(window.self.location.href == window.parent.location.href) return; //If iframe source is same as the parent don't load script  
    } catch (e){
      //logit(inspect(e,2,1));
   }
}	
	
var Version = 'FORK_20130228a';

// These switches are for testing, all should be set to false for released version:
var DEBUG_TRACE = false;
var DEBUG_SEARCH = false;
var DISABLE_BULKADD_LIST = false;
var ENABLE_GM_AJAX_TRACE = false;
var SEND_ALERT_AS_WHISPER = false;
// end test switches

var MAP_DELAY = 4000;

var DEFAULT_ALERT_SOUND_URL = 'http://koc-power-bot.googlecode.com/svn/trunk/RedAlert.mp3';
var SWF_PLAYER_URL = 'http://koc-power-bot.googlecode.com/svn/trunk/alarmplayer.swf';

var URL_CASTLE_BUT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAYAAADk3wSdAAAACXBIWXMAAAsSAAALEgHS3X78AAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA+NJREFUeNqclc9uFEcQxn9d3TuzeG3DLiaIOAcT2wdjgeESKeIQ5ZIokXmPXCLlTSLllEeBByCEIBMrlyzkAFxZC7P2zt/+Uznseo0NkZKUNFOlUvXXX898VW2++uaeLvR6ZFkHKxZjDP/VVJWYIm3rKYsC9/G1a/zw/XdYew5QlaSzkGlgZm9jeG9zVSWlyI8//Yzb2Fin9R6J6UyhqqKq8xjOAhljPlAf2dhYx93Y2iLGSErKgwcPMMagquzu7s7yifv3788Bdnd3SSmdyZ/Up6Tc2NrCbW6u09QlqrC4uIiIAZRLl5aoqgrvPRcvLiEipJTo95epqooQAktLixhjiDGxtLRE01Rsbq7jrly5wsHoNQCDwQDnLKqRXq+HCHjvWFkZYK0lxtN8CIHLlweIOEIILCwsAMryxT6uKAoWFhYQEfr9PnneIaVAnneAnCyzrKxMNwshzvJdYowMBgOsdbStJ89zVCNFUeB+3/+Du59/hjGG5eVlut0MSOzv7xFjwFphMFjGuSmj/f0nhKBY26Hf72OMpWkasmy67vGTX3EPf3nEl1/cxRjhwoUL9Hrd2bEzYmzpdIQ8z+ag3W6O94q1GVmWE6MiIlhrca7Dw18e4YbDZ3N5iAhZluGcpdvNUPVYq2SZxVohhA6dTk6MBmM6GCN4H6nrBmMM1sJw+Az34uUrYowYo6SUAHDO4ZwDHNYmrAVjmDGClASwhKB4H+cSC0F58fIV7vDwDW3rMcYQQiDGBCjGCCJ21j1p5hVjLCKGlGbtGSMhBEIIeN9yePgGZ8VSliUiQtM01HVDltnZ4oRIQlVnJxFSOvEJ7yNN09I0DW3bUlU1VixudXWVsixQhaqq6HY7OAcpOUQUa6eA01Y0pGSIceqbJlCWBVVV0TQNZVmwurqK297eYjweI2IpioIsc4hAShnWKnDynI6UlIQQlKYJFEVBURTUdc1kMmF7ewt35/YOR0dHiFjK8hQ0xhYRUD0dGO8OkBihrj2TyRS0qiqOjyfcub2D27l1k7+e/4mIZTR6TdPUlGWPTse9w/C8TcHrumUyKRiPj3n79i2j0YidWzdxa9fX+O3xIwDG4zGqibZtEJH5yHsPcqZr7wNFUXJ8PKEsCyaTY9aur+G6eT7XZwhhJi/5V6AxRrwPM51Odd7Nc9zo4ICUprLxPlDXDarM5+SHhvQJaEqJtm3x3qM6bYDRwQFuOHyOs1NWG59e56OrV+n1FqeXiCrnyZ78K2PkTL4oS1KMDIfPcXt7T/nk2mVSShgRjo6OKMvilKHqWUGdu0ZOLISIiGFv7ynm62/v/dOn+19mDPw9AD29Ua4OIbBVAAAAAElFTkSuQmCC";
var URL_CASTLE_BUT_SEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAYAAADk3wSdAAAACXBIWXMAAAsSAAALEgHS3X78AAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABABJREFUeNqklT1vHGUQx3/Py+7e3tpOYmOBOSQc2S4cK3HSIKEUiIYAUj4GiAaJGiihBlFBPkC+AqGiIYl4cUA0XEKRpEmRWDn77nb39nn2eYbiLmc7QIEYaVajnZn/zOyO/qPeeueqdIuCNE0w2qCU4r+KiBBiwDlPVZbYl9fW+OjDDzDmOUARosxMpoaaPZXib8VFhBgDX3z1NXZzcwPnPTrEE4EigojMbTgJpJT6h/jA5uYG9tz2NiEEYhQ+uXZjHvT5+2/PwT699h3PWv3svStzwI+/+fZEPETObW9jt7Y2aCYVIs/GmyZnmT3W1dGYnU5y1Omx8Y0xGGPZ2trArq6usv/k8cnxFBRFPk84vdTFak0b4/z90fgKEPI8Rylh5YVVbFmWdLtdtNYopQHIMztLno7/6toy1mjaECmKzgxIkXdSJk0LKIqiACJlWWJ//e13Lr/+2rxy3kl4cXmRL69/z0I3o9tJONtbJrEG3wau3/iFsvaMK8dLK6d4PBhRTzx5ngORH279jL156zZvvnEZpTRKwZmlguXTC6yc6rJUZCwWKd08mYOWtWdUeobjhiRJ8CEyaQ5I0xSRwM1bt7H9/t15l9YaFrsdloqc04tdzix1WFpIKXJLmmgaF+lmgTRxGG1ogzCuGqyd7rjWin7/Lvb+g4eEEFBKyBJLllryLKHIUxa6GUtFSpEbkkSTpWB0SxSF95Fx5aY5iSWEAETuP3iIHQye4pyfV9JaYY0iMYrUKhKrSBNNYhWI4OzUZ/VUzSzHOQdEBoOnWKMNVVVN/z6AxGMaUBJREtEolIDiyC8SAUEBVVUBEaMNttfrUVUlIhBCxHtP0zica3BO4xw0JhBajW+FpmlpGkfjGpxr8M4TQmQ8HgORXq+H3dnZ5vDwEK0Nznvq2lHWNaNSk1pBgmdSW6zVtG2kblpGVctoXFNWE6pJg/Oe0WiESGBnZxt76eIuw+EQrQ114xnXNYcjTaIjsXWUnZQsNRilCCI0LlBOHINRw8GwZlzV1I1jNBoSY+DSxV3s7oXz/HnvD7Q2eO85GFZoCbhJzcGhJU8NidVYrWij4NtI7QLVpOWgdByMG7xvefToESDsXjiPXT+7zk8/3gYgxsioakACk4kmSzTZDFBriBHaKLg2MvFC2QTGk5YYhcFggDGa9bPr2E6WEWOckTGEKAyrFudnK2Vma6MgytTfBmhmwGFGj1MMoZNl2Cf7+8QYp9wpM2ARyiZSOYXVoNVUp0WhjTDDmst0+TVP9vex/f49rNGICFfPLyInzskR+59gfEBpzTH6BaXRCvr9e9i9vTu8srYy/wTP3x1E5oXUjLH/7Tgao9nbu4O68u7V55v5X6IU/DUA3uQnItzRr3oAAAAASUVORK5CYII=";
var CHAT_BG_IMAGE = "data:image/gif;base64,R0lGODlhagHQAvcAAP%2F%2F5v%2F%2F1v%2F33v%2F31vf35v%2F3zvf33v%2F3xff31vf3zv%2Fv3u%2F33v%2Fv1v%2Fvzvfv1vfvzvfvxffvvffmzu%2Fmvebmvffere%2Feve%2Fete%2Fere%2Fepebevebeteberd7evd7ete%2FWpebWtd7Wtd7Wrd7WpdbWrd7Ord7OpdbOrdbOpdbFpc7FtdbFnM7FnMXFrc7FlM69rc69nM69lM69jMW9nMW9lMW9jL29nL29lM61jMW1nMW1lMW1jL21nMW1hL21lL21jMWtlLW1lL2tnL2tlL2thL2te7WthL2le72lc7WlhL2la7Wle7Wlc7Wla62le62lc7Wce7Wcc62chLWca6WcjK2cc6WchK2ca62cY6Wcc6Wca6WUhK2Ua6WUa6WUY5yUY5yMa5yMY5yMWpSMa5SMY5SMWoyMY5SEa5SEY4SEe4yEY4yEWoyEUpx7Uox7Wox7UoR7WoR7UoRzUntzY4RzSntzUntzSnNzSntrSmtrY3NrSmtjOhlrzmNaSjpjhBljxRljvRljtRlarRlapRlSnBlSlBlKjBlKhBlKexlCexlCcxlCa0o6CCE6Uhk6Yxk6WkopAEIpADopABAxQjEpEDEpCCEpMRkpMTohADEhACkhCDEZACkZACEZCCEZACEQABkQABkIABAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAagHQAgAI%2FgB1NGgAB02XJUaWKFziZEmShRAVOplIcSIUKA4fLsG4EUqVj1kqNpQosmJEJ1VGSvx4saXLlwxLTvxYReFHmSgnkqRJkabPn0CrvGypE2fFlEZLCl3I8SJEKCirZJmKNGlJIxRJjoza0CREq0eVBq0KNqdIpFo7ehQ61OVYLTSnZoGbUUoSJ0yeNJlR4EGdOGsCC37jRvAaN4gDI37DuDHjOI3dOHYcR46cyZgzI94cmfMby6BBZ34Tp7Tp0ocZFx79GPNp03LsjLZcGjRk1ZJZE278%2Bvbj3qZVH0482rQdO8DjbEZ8OnHwNaU9q9ZNOvnpzryTvzEcuLRr4MWt%2Fgev%2FpoOHdPm0zOWszkOm%2Fc3HjxY42QGChQmRNw%2FQaL%2FiRP7%2FYeCCAT%2BR6B%2B9yUYoIAKmuCgCSVEWMKDD5aAH4UOXkghCvz15yEJCoYoIgoT3gehCSRieKKEEkIogoQj3pcChx7%2Bx99%2FH%2F7H4o4RoohCCjNyaOOCAIb4YX8xJriCggDqGGGRIloo4oYaVgjjiBnGmGWSCdqIoopbhljhg1yWaeYKQJZwwoEjjHBDAgmoYcQGfRVg550DFJCnnQP0ead88tkJ56AJCEoonAUMpOiddiraAKOQRsrooZQOmqiji17qqKaLYurpp54WUGilk3IKaqiMNuAnpIiuKiqi%2F68W2uhAktYKKa13nqorpolemmukj9p6a6278kqqsH8%2B8CcEyhZwwAGMPgCBnQI1sIYRIDQAQbGbcmqqow%2BAGm64npKL6bjncituA%2BiiO1C77MYL77i5BtuXueqCqum37ALq77%2F%2B5vvuv%2F0GPLDBBhfbLr6KAkxwwacCKnC6706M67f1OhtBBBAcwOwADjgwA7tygJGEDjrkoPLKKvuwsg8w5wCzD0MMMXMOKKO8MhApsywzD0AHLfTQQc88NMxBDwHE0kwD4fPLM0dtdNRAU0200DPXXDPNWnettNc8s8yz1DPPYHYOVZNt9NE%2B6KB0z27rvDLKRa9dddBo86C21f5D5%2B3D1XjnMMPKgO8NeN12H6643joA0TXPTXstueQ%2FDPFDD5gXofkPlQuRgwQSwOGGGmecAcbpqIOxhRVWSCEF663DLrsVW9Re%2B%2By45667FVTsrvvrwPsu%2FPC2F7867Lfvfjztt9vOfPLD0%2F588dFXb73yy%2Bee%2FfXcd8%2B98eCHD%2F4ZcMxRRx1zwHHGEkQwQQcj8O%2FRRx8vMOBAHX2Iov%2F%2B%2FPfv%2F%2F8ADKAAB0jAAhrwgAhMoAIXyMAGOvCBEIygAxmhhyUUgQ3wy%2BALDKCAOeRPgiAMoQhHSMISmvCEKEzh%2Fxixhh6IIYOMaIEBDOBBFdrwhjjMoQ53yEMJsrAK7%2F6DXwsIQIAa9vCISEyiEpfIRAMyogtV2AP8XkBEIzbxiljMoha3%2BMA9ZGENU1RABz%2FIxTKa8YxoZCIZjBDGMYLijXCMoxznSMc62vGOeMyjHvfIxz768Y%2BADKQgB0nIQhrykG%2FcQxQZ8QIxehCRkIykJCdJyUpa8pKYzCQoGMGFNjByho%2FUpChHScpSmvKUqBRkF7gQQ0f2IZWwjKUsZ0nLWuIxCzuIIQdDacte%2BvKXwAwmIHGpSzcK85jITKYyY0nMFrhymdCMpjSnWchmPpOa2MymNrNpTWNu85vgDGcvs9CDVnpTnOhMpzozmQUimNODnYinPOdJz3ra8574zP%2BnPvfJz376858ADahAB0rQghr0oAhNqDzJ%2Bc4%2BKPShEI2oRCdK0Ypa9KIYjWc34ZnRjnr0oyANqUhHStCNOpSkKE2pSlfK0pbmk6HOHKNLZ0rTmtr0piUtZyNlitOe%2BvSnQE0pQ3fK0aAa9ahITWpBh%2BpKpTr1qVCFKlN5GtWqWvWqM4UpKE%2BK1a569asZbacuachVsJr1rGgtqTtlSFZNuPWtcI2rXOdK17ra9a54zate98rXvvr1r4ANrGAHS9jCGvatYmWrBw%2FL2MY69rGQjaxkJ0vZyro1C0Uo5mIty9nOevazoA2taAOLWc32YbSoTa1qV8va1t61CkdoqGv%2BZ0vb2tr2toGFrWxxy9ve%2Bva3qdUtUU8L3OIa97jIHaxwXZnc5jr3uc9d7hihS93qWre20t3sdbfL3e5aVrcx9SAlxkve8pr3vOhNr3rXy972uve98I2vfOdL3%2Fra9774za9%2B90veKhQBEuHVA38HTOACG%2FjACE6wghfM4PFC4QgAdqSAG0zhClv4whjOsIbt%2B%2BAIj3HDIA6xiEdM4hKztwpIgIQKXNmISbj4xTCOsYxnTOMa2%2FjGOM6xjnfM4x77%2BMdADrKQh0zkIhf5EpagxBVSTNQ88OHJUI6ylKdM5Spb%2BcpYzrKWt8zlLnv5y2AOs5jHTOYym%2FnMUH5Cilv%2BsIAF5CEPf4iznOdM5zrb%2Bc54zrOe98znPvv5z4AOtKAHTehCG%2FrQiE60nO0CCRsgwM1%2BAISkJ03pSlv60pjOtKY3zelOe%2FrToA61qEdN6lKb%2BtSoTrWqJ22FJEBiBgPoYKRXTeta2%2FrWuM61rnfN614DwgpLgAQMBCDrQBj72MhOtrKXzexmO%2FvZ0I62tKdN7Wpb%2B9rYzra2t83tbnv72A2BxE7T4AdBmPvc6E63utfN7na7%2B93wjre8503vetv73vjOt773ze9%2B%2B%2FvcRoiCh8n974Ib%2FOAIT7jCF87whjvc3EaA8LjzMIiKW%2FziGM%2B4xjfO8Y57%2FOMgD7nIR07%2F8pKb%2FOQoT7nKV87ylls8CRIXYxryQIia2%2FzmOM%2B5znfO8577%2FOdAD7rQh070ohv96EhPutKXzvSm2zzi4pY5zZ1O9apb%2FepYz7rWt871rhPCCEyWeiHGTvaym%2F3saE%2B72tfO9ra7%2Fe1wj7vc5073utv97njPu973TnawR10BMzeE4AdP%2BMIb%2FvCIT7ziF8%2F4xjv%2B8ZCPvOQnT%2FnKW%2F7ymM%2B85gcP9Q12MA%2BbD73oR0%2F60pv%2B9KhPveoFnxAAgzIPh4i97GdP%2B9rb%2Fva4z73ud8%2F73vv%2B98APvvCHT%2FziG%2F%2F4yE%2B%2B7I3ABNfTMA%2BIiL70p0%2F96lv%2F%2BtjPvva3z%2F3u%2Fnv%2F%2B%2BAPv%2FjHT%2F7ym%2F%2F86E%2B%2F9Jn%2F9znkIRHwj7%2F850%2F%2F%2Btv%2F%2FvjPv%2F73z%2F%2F%2B%2B%2F%2F%2FABiAAjiABFiABniACBh%2FftdICOB%2BivCAEBiBEjiBFFiBFniBGJiBGriBHNiBHviBIBiCIjiCJFiCJniCEAhzABYy7rcILviCMBiDMjiDNFiDNniDOJiDOriDPNiDPviDQBiEQjiERFiERviCKtgCDtCAeXCETviEUBiFUjiFVFiFVniFLpgEUKBibeZ%2BjvCFYBiGYjiGZFiGZniGaJiGariGbNiGbviGcBiHcjiHdFiHdniHYPgDUBAJKvB6j%2FCHgBiIgjiIhFiIhniIiJiI%2F4q4iIzYiI74iJAYiZI4iZRYiZZ4iYAoBcHGAyEDB1SgAgAQiqI4iqRYiqZ4iqiYiqq4iqzYiq74irAYi7I4i7RYi7Z4i7iIix1gA1kQASk2AwLQAHjQBSeQi8Z4jMiYjMq4jMzYjM74jKi4i13wASmWAwMgjGggAtC4jdzYjd74jeAYjrlIAjfgBRmgBJDgA9qCB2WgjeL4jvAYj%2FI4j%2FTIiiJQA1iQAVMACT8gLXZABu5YjwI5kARZkAZJixsQA1dQAQLnAwnwAHZQBiNwkBRZkRZ5kfOYkAspcDdQABAQkROJkSI5kiRZkre4ATRwBR8gcDXgkSBpkjAZkzI5k%2F%2F3yAUfsI80wAASgAfZOJM%2B%2BZNAWZAj0ANecJOvNgA72ZNBuZRM2ZTcOJRFuY868AAMwJMo4JRYmZVaeYscIAMqmWJTWZVkcJVbWZZmeZameAEKuZKQMJXCOJZoGZdyqZVqqZINuS14AJdzuZd86ZMXgAM2KXA7gJdlQJZ9eZiIiZEbsAM2mWKD%2BZaGmZiSOZkCuZhXgAGOuS3%2FGJmU2ZmeCY4b4JUVkJkNsJmfeZqouY0XIJoC9wN98Y8BmZqyOZu5CAIxEJjp%2BJpKSZu82ZuxaJt2mZsPgAdrEJu%2BeZzIaYq2iZs%2B0BfEaZzJGZ3IqZFs2ZzDWZzSmZ3JqZEY0JD%2Fzomd2hmevAmc3RkJ1mkHagCd4rmenUmeU2Ce8mEHu8me9EmZ7mme7FIHYxAC9dmfk8kBMeAF5amOfrGf%2Fnmgh9mVRRkF%2BFmg%2FImgECqXobmgkfAD%2BUkGDxqhGlqWCrqSFXqhGbqhIuqUAEqhBKqfITqiKgqUtimgDHqiBrqiMvqTLZoBL5qfMTqjOgqTCUmhNCAfepCjOzqkIjmhHvqjDxCkKUqkTHqQG1ADPgqkQtqkVEqQTxqlSTqlVbqlGQmlRxoueKClXDqm4nil1BgJPyqMYkqmbNqNZsoEaAqma9qmdOqMZsqgaaqkdbqn3Gik7%2BkD8lEHGMqnhGqnNaCS%2F3AKqH7RjoXaqMr4pJeZqIHKqI5aqbm4mpEKn4uqnpbaqa%2BIqQM6qZzqqaSqiqD6oqJaqqrqihdwqB6qqHVAqas6q6jYqpkKq7JKq7o6ipCKmXGapAC5q8IqipD6AXCKpHoQrMMqrMV6rECqrMuqq72KBL%2Bal6MarZ36pFXgq0iKB19wrdhaqdNard8arrRqmRjgrMJYrua6qugKpyOzruDaroTKATuAqJFQLYLqAfSqqnV5k%2Fk6ELHKr%2F1KqnWZrgHbAPtasAarkAirr2RAsAxrqdwJpxArsRPrqKGZqRebsZYKqhYrsBHrsZW6mlpgrAm7sCTbqKtZlCFbmuy6sv%2BEOgEKmQEvawcxK7N7SrOXSa3Vogc5q7N0agEOC5bycQfQKrRDW7Rt%2BazzqrRMSrQ927TASgJQW6dS66tTWbVXS6c8251Um6xP27U6%2BrUNKaVWS7ZkSp4phqxzqrZDSp4Cl6ZhuqRwy6Ry%2B6t6erdbmrdua7d8u6PciafSsreB26SDG6cQYLiHS6TcSa0zIKWA27gr%2Brjm6ZxqMLmUO6IJ2ZiXO5yZu7mOe5u%2Bap14ELqiK7gxoAUIa7qom7ozapusm6jscrqaC7sQ2qKtW7uvi7sq2qMoS6C267syCry0C7q3S7z9abyaKqjJq7z0Camj2ZYgCr2ce6ijGbB%2BMaj%2F1ruh4yoQftG73Yug38su6Pm846ud5QuR4pu%2B%2FWmrZwq%2BddC%2B7kuftqq11Vu%2FB2oBh4qZ1Mu%2B6Ku%2F0xkDWOC%2F4Hu%2BAuyfPWrA5ku%2FCay%2BAUqN%2F4vADxy9AcrAAFzBFlzAYLmODqzB26mQ0ysQEDC8ICyeGjnC67gGAXzCqZmQHBy23OvC2QnD3PqsLUzDn2nDbRsujKvDAxzDefq2QCybC9zDDfDDRdybwEutQ5zDSyyZTay3MxzFTHzBPQysUGzFh5nCEAarVczFsjkB9zi1YLzFYjyXE8AB%2FUutZ5zGvLmxpRuoYQzHp3mwbkzHaGzHaInHzVvHfNyZfvzGgYya%2F3Kcx9u7x4W8lZYbuUmKBsW4yJ%2FJtvkqpSUgyZNctNVKxJg8l8CZAZAruZ3cnjUbylmqyKPMlJ%2FsxOFiB5ycyme5ynFammCAyrDMogQMyrPsyrZ8yz5pm%2FnIysJYy76MmBqZAU0QCY6sxMUcl5%2BczMsMyM0cy7mczG47ttPclC36AdYspdiczUsJAl4KzU4Lzp4cwaycpd9szjQawd08zL3MziIpuyi7tc4rz2gpzldgs9p7z%2Fhslvp8pCIbz%2F9ckeIcmGiavwWtlQHtxAq90FhJyfJrBgQN0QWZuDSQnxRt0VkJAl5ZnjTQF3Ww0RztlPpcno7MyyVt0hHMoCn9yv8rTZK669LxCdMxPc%2BkS9MQadM3fZHLidI1XdE9HY%2FbbMrMPNQmOcXLzNNI7aTorMyi3NQzCcM2qrdMLdVWGsHOOpxXjdUCuc3kPJzE7NUwCdZQLdZCTdbdaNaRC89qbZJmTbdj%2FdYjuc3vKddpTdfPaNezXLd6XdcBqo%2Bfi6J%2FjdPm%2BKci3dWFHY4g4AKHPdiKvdjfuAErkI%2BI7aCSbZGUbdmf%2B495ndnISNn7fNevKc2gTY%2BiLdjN%2BZGmfdrymNqJWtqf7dq4uAEscKv%2B%2BMG0DY8aoMnn2dq7LY4akJKlm9izHdy0ONw9C9nHjdyyqAH9G9uJ7Nz1CN24Pd3UPY%2F%2Fyl3cmJ3d8tjby92cDSAHY6AB3i2PX%2BvGieLX5w2PNLut6p3Ekd3eufjecyzfzU3fqmjfeYzf%2Bi2O%2FA2f%2Fv3f4Njb8C3gR03gzjjc2xrbA67g3bjdDs7eEM6Nyo2yIY3dFb6Ntm2OxyrSwL3hx6gBLCCg8GrcIr6NJG7iaAri%2BZ3iALDiCJvh%2FgzjzagBMODhv1rjNr6MOK7jNB7iPV6LP87PND7fQ66KRe7EiY2xST7iKWnkKP7kyajcUr7TL57iF%2F7hrJ3lIq4BOoCvId3lVF7lYQ6wGa7SZQ7lKkna3b3muWjl76kDTQ7nxsjgGDDnIrvOdo6KFZuwsNnntU0D%2F6yLqhCZq4I%2Bi4m7tYGe6LXYqwyaA%2BYr5I7u5%2FeKsCMDkSNb6Yp%2B6ccqsk7O6ax6qPwMsXwu6gBgAV7pofK76aj%2BqQ4rcK0e6q9uqrFOvQrr6rXOinLMoLO%2B6664sVWNpCoL7KuolgiNpDh76qJOtDa51XcQtMZ%2BijyL4a0s7dNeiuldyVqc7aqYtT7LLneA5IkO7pEg6afs7alo7pK%2BuJQO7H%2Fe7smatupuitQZsu5O7%2FVOiouuLfO%2B7%2FYe69r77wDP7wIv6Q0w7vpe8ACQtyRM8Awfig5fuO%2B%2B6xPv7l6%2B4f2O8RFPrJpMwp7d8aFouSCv296et6ttByws8g2%2Flv%2Fqjbwsn7ium%2FEVLvOYS%2FMQ3rkDevMxf5uvqps4r%2BBG%2BqKyHfMyIKAvz%2BMMH5oczNws35ULmWKE3PHTmo7%2BiAZBT%2BBPGsxWX8Imn%2B1bD8q5%2BZFYH%2FP4qMvnWfYiP67WqfQFb7m%2FnfX%2F%2FbhdL59yr98JybpSLx88eff0fcRW%2F8h%2B396Ar6h6oPZUj8WBf%2FiDf94pvPeC3%2FNRv%2FiIH%2FE6n8WM3%2FNcANJ9kflrT7pSbycJru6Xn5sFMPreXviJgvpg%2F9TWmayN792de6YZ7vkdj8eQMOZ9L%2FkYAGFjHvIdv8arHvrbuwEiL%2FxmHNRP75W6TOzkLugc4AL7jMhqTvXSP8f%2BWB7z18%2Fk2f%2F5y92tz9%2FncF%2B4lb%2F0mvyji4sGl%2Bz92M%2F60265f8v7Rh3%2Bdg7%2Fchr72Q2ctN%2FKcx3x%2Bg8QTCL5eNDADpgQABQuZNjQ4UOIESVOpFjR4kWMGTVu5NjR40eQIUNuiHEFg0AaDx7gGZNQ5EuYMWXOpFnT5k2cEEmaRBJphko9LXMOJVrU6FGkSUXuPOnzAQQ9alwqpVrV6lWsWSmCiKHlg0CCD4JO1VrW7Fm0aTly9fI1UsqVZMiqpVvX7l2qIGi0FTijgFi5eAUPJlw4pN62Pf0CnmvY8WPIhdl%2B6AnXjtDImTVvPssVS4YpA1VebszZ9GnUNtmCFv3%2BgHRq2LFlg0ScAWXBOphn7%2Bbd2yGIHV5sv8Wt2%2Fdx5KmBf65cvHRy6NEly2BOvEHu59K1b08LgjqG5g%2BwcydfHq33z02Iizdu3v17pOhZ%2F2SfHf59%2FDHlh6Y%2FPv9%2FAGGSTz368EAoQAQTXCuGz%2FhTyUD7FJRwQgBWc3Cl9ijUcMLJLmQpwg1DvK9Dp8TKUEQU8SNJuAvHSvHF%2F0j6TIn1giIBRhzhm4xGuGzM8cfydizRRSCLlM7CEj80csnkJiPwwROZlFK5GNpSz7Iop9RyMxLDem1LME9DMiz%2FwjQzszH%2FKvNMNg1Ls74245SsStbIzFJOPM0CYYUGW1szT0D%2Fz9qAzzoTgDNQRM3SYIUrWLvB0D8TlZSqRRsNzQdI75x005yYAms0TTkVlSamesIUAjvQAHFUVl%2FSoCTwInkU1cBatdWmV0361LVQb%2FV1Iw1oaDS8L381NqRgG72N11WPdVaiYLUYzsten7XWoWinBbXZa7sFIFtTcTvQW3KhFTaDygq4btxy222IAliXLdZdeieId7156W3XXl1by1ffcoVtilpuAb412YG3NdjdZIfDsuCFWW2YCUkIjrjcbCl%2B%2BGJyX5UWJXUj5fhYj9H1KeQxQBi5Ww1g%2BPgtNatdmdOWX4ZL5JkPdtlhlXDOuVWPP7gyZoh%2FDjRat2gg2miS%2FmnwCuRDmfZ1YpijltpWhJeto9arbd2ghn5TorXortvcYIewn7KD67JH%2FdqkKNbbmuy2zXwbg7hvlrlus2moAu%2BKC5Jjb77PJOnvuAm6ju3CJT0cbz%2FVEKFxTrmCeyAIXCNjcson1QvuwHnlvPNEP4c8pesIJ31K0%2FN2bvXSBXadWdgRvXv2f2s3G%2BzTQd1Ad0DP7jcsPBgHnk3hYw1Lj82Px3MDGrhQ%2FsHmnY8z1%2Bmttt5M7MOrowsPtm%2Bz%2B6q%2FD1%2F8M8lXWnv0tWyZp6qLH739Ld9vav2o5qd%2FSg1Y0LViNanhfPtzHwu0cL%2B%2F4EEqBKyfAREoljXQjYET6t8B%2FqGWvwnyz4HLwmAGmUQSCxKHAfLz4AerdL8HjHAM%2BithjjyGQhWysIUw6t%2F%2FlNaAoMhwhimqIQZCc0Mi7dCFLmuKXxqgJCEOUTi3OaLqkvifV7Xlh0Bx4hPxE8UPTNFEErTie7CoRQh18UVR9OF6wihGFLXMC2WkQQNoh0YRRZE1bXwjHDf0RXxV0Y7kwaMOFLZHDckxNH7EEBcBKZ0X%2FtCNxTPkIaFjvx%2F%2BRQ%2BqciQFiRhJsVCykgoq2RQksT47LHCTCULS%2BuogylEGqJRqMl4qR9SVpPWsla58DwhjyT5aerEkPHsAHPSYS97k6pa%2BbCQwY2OBXS6LmMbEDzLT%2FsYAXw6Qme5xZqxSAs0x%2FG6a76lmeJa5TWrCypu%2FBCdq1KeSb5aTj%2BJcDxzYpc7tvLA5DXBnMeGJpr1YswENcEMXtHlP7dSmJzpwYz0Bup3JoKQBEIgDOQ8amRVl0ScLbeiNHhqdFc3HjRW9KEbpNEh1NdSeHSUMkgjaSzBIk6S9QVIOGPCAhqp0pbvJaGhcisuZxqamJfJZTlGzAf8NZwb77KlPTQNUZUkiB0R1qFHvUsGvKJWpI3WqWqCq0NRRtapoqZlbTlqHd27VnC6L6lfBJ9bYXFUSOghZFjSAVtj0MFwFgIMRKADX1MhTVgkogBuMgNe8wpJifinAGn4A%2F1hzClYShDUsYk8TNI09oABqOKxjOWO%2FKGBCaZOtrGU1g1lMDJWznt0MZhfbgNGSNjP2G%2BwABkBZ1a42Bn9DwmJdC9vYQuZVfzvCWhvAANzm1jHY6y1BgNtZ4RaGuIFrQHCTW1JYFbcgavDBc90UXeZS17pzOqB0m1vd7Q4mBF0BzyehpNXw3oRqFkvvU88VLoM0tb05oRpckDhfujQsPPfFb1r06y%2F59rcmyaKMaNaFXgHDJFcmA2WAEyyTc9bxwWaJAROyl7sJW4VfCZNwhrGy4XB12MNWIR97R4wV7MnLwSf%2BCPa0iGEWH8XFeURwjDWy4L4szcZVqZnJZjAA9v6obMeU2hnUijpk9cJAWXJbMZIxAlm5zdLJOIGyKaU8ZVw5LWk6xnJR%2FmvKJnd5IvVFWY3FDJGsle%2FKZ46JBnSwZKWNjc1DcTOc1bbmOYvkcxm4Us%2FCnOeG7NmTYDYzoBXiYgA2YHCFNrTlMKAeH6hLDng2tEcc3WfxVK%2FSM5mxlzS9af0IzJMmBrWARG2dI5f6xueKZFZVrZ8385nGr1Ywq2dNa5EgbIrxZTSg68xhRuJazzTAQvaCLWzaCCxctNIhsp98Lzv1Os8pto4cwursG%2B9SMWXGtkcWvG0Rd%2Fsi9lMM9aQ9Z9ZGggdADuW52VzBk0hi3eJBpbgzAm%2BK6f%2BA3fW297g3ONGV8LvfFcH3kCQ38Hv%2Fmz5RKQHCn71GJvLX4WOmU2QLAOOJN0QDLrCgeZvo7jMXHHUSzzia%2F31DkpccW0TMMQ7%2FvOmaFVFdQVQ5mqt0S5rXHFs312LOdc4QPNIgc3q49s8PfcIpourllQ76QjFec0G%2BxelLN3TQ1UZ1X%2FM8En5UOsjF3MenpNzondy6G5nn9S73WJGMMfpDYo5JBaIdy1w54KD%2F0u62%2F6Yrc7y7wNtOd4laWe5TrjIrB%2B9kYS5r0XnXeEluKVLGAz2Z64F85I%2B%2B5KHScwxvtfy32DnUXo5Bpm0nH%2Bhj2nnPw48%2Blbd8hFkf%2BQhHE%2FX%2Bem0jPVM6e%2FJWZp%2FuHL3REaPPB%2FTz8EgOwV4cVtAuDH%2FIiEkaRVeI%2Boj2xfkWtfxOTT8G6kd%2BRWzcaNF9%2F9Gyw9T7P1%2BNQmGK9TwjqT%2Fon7Mty%2B3qzu%2FENh5PdcaROn9C1n%2FiSC3wV9nPZv7TPfEYP52zpXxzI7BSvh3bACUrKwQkQKjzn%2F5DwCzovZ8jt7KjpyS4q87DQIIqLOSCvQYcLNRqLNy7gqiCgX0ywQ4cwdNKrRZEwSnAhA90LtiDlRkULRtkvBSzrdcaAtRLPcoIrdsCwhMsrx8DLiPsQHGyLSUMwuXKAQf4riB0tN7igekCr86zwuzSQsvjQsXRLtT%2FA0OVEMMtzD0DM8MvJKKB2ic1FEGesC1%2BCkEeVDIkBDI4oMO8AwE7rK0f6yU9%2FLsm%2FMM8DMLxOqDaWh83CMTvsyE3ekPG24kPyCw6gsS8sxfE0ay%2FsMS2u4DZwoAl%2BKRH9MLIE4EeaItQrERSZDxTbIvMqsEgCMLbwQQfQC01iEXU44DgmERatEVG%2FLkNkAG40SzJKkTUu4AaWKMoMK8BMMb4%2B7yCcMbqc7wlcAp6wsVnRMFQpA84wMbqkwGvWMafuEZZrIEDyqyfaEZv1D5zvAB0fAB1lEVYoUR43MG8E4EY4AJeTInX%2BkWdczTXGQC%2FksfLQZ2BHMN8xBtiFMi%2F%2F0JIfQxINWjIM3zIhbTHtsNHiuRHizQ6jNxHN%2FTHmsNIDDgCqXuAjfw5DkjIuCGkk9S5lJSeVyxDkFS5l1RIlpzJkqvJmDTJdWQ8naTBMuzJvHtJXjwpTuTIZNzHv3CDJfzCpJxBRWzKyAOBp%2FykpZRKxvMOKbLK4MNJ%2B%2BM5rlxEedxKRfTK%2FeM5TezKscyitBRL6EPLG3LLM4Q4WlQJufxCGeCLulRL1BOBpGQCWlxKs3Q4fEwMTZzDKrw5wIxLrNzDE1pMdWHKxFwjJDhMyXxL4UjEqwxCXRSDD1iCwETMXNwBzwTNSJtDzrM8ESDNzwzNuyxF1jyCwOTLzltNz%2F%2FsrbIMQlO8zbYcTIQzgR64TasUzc4zgSJggw%2FAzcj0zYEzzjf4ACJgrtdkvBVggufsgdCZzrxjFDr4ABwYTu00ugngTu%2B0yr5iTnsbzyugAxP4zs0Kz58bTyxgz%2B9UHPjUOXvxAjxoz7okzsizlzDYA%2F6sRRA8xhUQAwHFgUw4qfusOQuQgTIQ0BhY0BVET3GzANLczxjoTxb8T9IUUBnoxeay0G6zFwRtTwqFwcjzxBPFARr0ReiTgRMlgkwgrKP8x%2BBkzyjYBBV8ADQgUWy7ACJgAzEwATTgBKF7AMNKzT1EgSVggyX4ADz4BKGjwi80gTBYgxUoAUag0gIoADT%2F8AEmFU8Q0IEw%2BIEUAANK%2BIQfgAAIIIMf4EDfmAA6nYCFkFOlsFOQwFOLqFM0G1OGoAAK8NNA1QA%2BfQhBTVRFTdQJGFRH1QANaFRJHdQ6pVMLoABIrdRK1QALsFM6hVRQBdVP5VRStQBOtQBUTVUL2IANUFVVnYBVvQBX7dRU%2FR0LAIENAAEQmAANKNMu0IESAIMuDYU4WwMjQIEQCIENSNZk1VVdDQERiFYRSFZpZdZoBQForVYR8ABu9QBWZVVmZVUPCIFxZVZzzVVsNVdqldZrRddv3QB2lVYTmFcUMAER4AARGIFoJddu7dZ1jdYSiFd2RQGCZdcSKIETSNgT%2FwhYaT1YEyBYFDhYhEXYhD3YhIVYjI3YEkCBFOhYjyXYj%2BXYFMDYjgVZjz3ZkBXZEzDZjIXYlDVZFkBZj2UBmk0BmqVZkGWBnG1ZnkWBFViBjP1ZoR3ZkSXYFWCBo%2F3ZjhVapm1ap3Xam41apG3am12BGNiBGtiBHTjaGXCCJAABH2CEURgFYj2AwjICGmCBGVBbGqCBGYABuIWBGJjbuW1bu73ZGUhbFoABqbVbv50BwM1btw1cwSXcuIUBv01cxU3cGsharM3aHugBIpjcHtDayn1cv%2FUBzfWBHfgBzyUCz%2FVcrd2BySUCIzAC0C3d0j1dI%2FjcH1DdJYhd1k0C1P9VXda9XdpFXSOIXd693SXI3dPlXd6lXeEt3iW4Xd8V3t29XSdoXuSd3SQwXuXd3eMN3ue93uuN3SLY3uKNXtml3iUogvAN3u%2BV3uIVX%2FE93iIwgvU13fXdXvgVXid4Ai3ogi8Igy5Ygh8Agx9omT4IhU8YBVEQugDwq%2BbNAgRO4CyogirIAi3QAgZ%2B4C54YC1QYASm4ApG4Al%2BYAvuYA%2F%2BYAZWYAzuAhIm4REmYS%2FQAi8IAzEQgzB4YS%2BI4RKeYfv9Ahv%2BAjLIYR0mgxfu4TAggzIoAx8eYiJ%2B4RwO4iDeYSLO4R5mYiPeYR5u4ij%2B4SLugiLGXxrO4hKuXy3eYAxTzuAvpuAJXmAHDmEEroLmfYInaF42doIqUOM1ZmM4nmMGZmMGvuM7hmM3ZmA1xmM%2F5uM5juM1ll8n4F04jmArLoM1YIMyWGMYGIAf6NKxFQVRCAgAOw%3D%3D";

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;

var RPM = 0;
var RPMtime = unixTime();

//Kabams new cheat detector
unsafeWindow.arthurCheck = function (a) {
  var b = false;
  for (var c = 0; c < a.length; c++) if ($(unescape(a[c]))) {b = true;break}
  if (b) unsafeWindow.AjaxCall.gPostRequest("ajax/funnelTracking.php", {action: 1300,serverId: unsafeWindow.g_server,uid: unsafeWindow.moderators[Math.floor((Math.random()*unsafeWindow.moderators.length))]})
};

var Options = {
  srcSortBy    : 'level',
  srcMinLevel  : 1,
  srcMaxLevel  : 7,
  wildType     : 1,
  unownedOnly  : true,
  mistedOnly   : true,
  hostileOnly  : false,  
  friendlyOnly : false,  
  alliedOnly   : false,  
  unalliedOnly : false,  
  neutralOnly  : false,  
  srcAll       : true,  
  srcScoutAmt  : 1,
  minmight     : 1,
  srcdisttype  : 'square',
  pbWinIsOpen  : false,
  pbWinDrag    : true,
  pbWinPos     : {},
  pbTrackOpen  : true,
  pbKillFairie : false,
  pbGoldHappy  : 95,
  pbGoldEnable : false,
  pbEveryEnable: false,
  pbEveryMins  : 30,
  pbChatOnRight: false,
  pbWideMap    : false,
  pbFoodAlert  : false,
  alertConfig  : {aChat:false, aPrefix:'** I\'m being attacked! **', scouting:false, wilds:false, defend:true, minTroops:10000, spamLimit:10, lastAttack:0, barbautoswitch:false, raidautoswitch: {}, alertTR:false, alertTRset:1,email:false},
  alertSound   : {enabled:false, soundUrl:DEFAULT_ALERT_SOUND_URL, repeat:true, playLength:20, repeatDelay:0.5, volume:100, alarmActive:false, expireTime:0},
  spamconfig   : {aspam:false, spamvert:'Join my Alliance!!', spammins:'30', atime:2 , spamstate:'a'},
  giftDomains  : {valid:false, list:{}},
  celltext     : {atext:false, provider:0, num1:"000", num2:"000", num3:"0000"},
  giftDelete   : 'e',
  currentTab   : null,
  hideOnGoto   : true,
  transportinterval : 60,
  minwagons    : 100,
  lasttransport: 0,
  lastCityTransport : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  reassigninterval: 60,
  lastreassign : 0,
  HelpRequest  : false,
  DeleteRequest: false,
  MapShowExtra : false,
  RaidRunning  : false,
  RaidReset    : 0,
  DeleteMsg	   : false,
  DeleteMsgs0  : false,
  DeleteMsgs1  : false,
  DeleteMsgs2  : false,
  DeleteMsgs3  : false,
  Foodstatus   : {1:0,2:0,3:0,4:0,5:0,6:0,7:0},
  Creststatus  : {1101:0,1102:0,1103:0,1104:0,1105:0,1106:0,1107:0,1108:0,1109:0,1110:0,1111:0,1112:0,1113:0,1114:0,1115:0},
  LastReport   : 0,
  LastCrestReport   : 0,
  MsgInterval  : 1,
  CrestMsgInterval  : 1,
  foodreport   : false,
  crestreport  : true,
  Crest1Count  : 0,                            
  Crest2Count  : 0,                                                                            
  crestRunning   : false,    
  Crestinterval        : 5,        
  ThroneDeleteItems    :    false,
  ThroneDeleteLevel    :    0,
  throneSaveNum    :    10,
  throneDeletedNum : 0,
  RangeSaveModeSetting : 0,
  Opacity : 0.9,
  language : 'en',
  curMarchTab : "transport",
  ResponseSize:0,
  lastGiftSend:0,
  FoodAlertChecked:0,
  RPClip:1,
  SearchMightMin:0,
  SearchMightMax:9999,
  Authenticate:true,
  KMagicBox : false,
  GiftSendTo: {},
};

var GlobalOptions = {
  pbWatchdog   : false,
  pbWideScreen : true,
  pbWideScreenStyle : 'normal',
  autoPublishGamePopups : false,
  autoPublishPrivacySetting : 80,
  pbupdate : true,
  pbupdatebeta : 0,
  pbNoMoreKabam : false,
  escapeurl : null,
};

var CrestOptions = {
  Running   	: 	false,
  CrestCity 	: 	0,
  RoundOne  	: 	false,
  RoundTwo  	: 	true,
  lastRoundTwo 	: 	0,
  X				:	0,
  Y				:	0,
  R1ST			:	0,
  R1MM			:	0,
  R1Scout		:	0,
  R1Pike		:	0,
  R1Sword		:	0,
  R1Arch		:	0,
  R1LC			:	0,
  R1HC			:	0,
  R1SW			:	0,
  R1Ball		:	0,
  R1Ram			:	0,
  R1Cat			:	0,
  R2ST			:	0,
  R2MM			:	0,
  R2Scout		:	0,
  R2Pike		:	0,
  R2Sword		:	0,
  R2Arch		:	0,
  R2LC			:	0,
  R2HC			:	0,
  R2SW			:	0,
  R2Ball		:	0,
  R2Ram			:	0,
  R2Cat			:	0,
};

var TrainOptions = {
  Running    : false,
  Troops     : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Threshold  : {1:500,2:500,3:500,4:500,5:500,6:500,7:500,8:500},
  Max        : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Gamble     : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Workers    : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Item       : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Keep       : {1:{Food:0,Wood:0,Stone:0,Ore:0},
                2:{Food:0,Wood:0,Stone:0,Ore:0},
				3:{Food:0,Wood:0,Stone:0,Ore:0},
				4:{Food:0,Wood:0,Stone:0,Ore:0},
				5:{Food:0,Wood:0,Stone:0,Ore:0},
				6:{Food:0,Wood:0,Stone:0,Ore:0},
				7:{Food:0,Wood:0,Stone:0,Ore:0},
				8:{Food:0,Wood:0,Stone:0,Ore:0}
			   },
  Enabled    : {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false},
  SelectMax  : {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false},
  Resource   : {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true},
  UseIdlePop : {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true},
  CraftingRunning : false,
  CraftIntervallMin : 3,
  CraftingActif : {3000:false,3001:false,3002:false,3003:false,3004:false,3005:false,3006:false,3007:false,3008:false,3009:false,3010:false,3011:false},
  CraftingNb : {3000:0,3001:0,3002:0,3003:0,3004:0,3005:0,3006:0,3007:0,3008:0,3009:0,3010:0,3011:0},
  tr	:	false,
  trset	:	0,
  actr:     false,
  actrset : 0,
  AsTroops     : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  AsEnabled  : {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false},
  AsSelectMax  : {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false},
  AsMax        : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
};

var FarmOptions = {
	RallyClip: 0,
    Running: false,
    MinMight: 0,
    MaxMight: 999999999,
    Interval: 0,
    SendInterval: 10,
    MaxDistance: 20,
    Inactive:30,
	DeleteReports:false,
	Troops: {1: 0,2: 0,3: 0,4: 0,5: 0,6: 0,7: 0,8: 0,9: 0,10: 0,11: 0,12: 0},
	FarmNumber: {1: 0,2: 0,3: 0,4: 0,5: 0,6: 0,7: 0,8: 0},
    CityEnable: {1: true,2: true,3: true,4: true,5: true,6: true,7: true,8: true},
    CityLevel: {0: true,1: true,2: true,3: true,4: true,5: true,6: true,7: true,8: true,9: true,10: true,11: true,12: true},
    Diplomacy: {friendly: true,hostile: true,friendlyToThem: true,friendlyToYou: true,neutral:true,unallied:true},
    FarmMarches: [],
    farmMarches: {},
    Attacks:0,
	Checks:0,
};

var MarchOptions = {
	Queue: []
};

var AtkOptions = {
	Running:false,
	1:[],
	2:[],
	3:[],
	4:[],
	5:[],
	6:[],
	7:[],
	8:[]
};

var ThroneOptions = {
    Active:false,
    Interval:30,
    RepairTime:0,
	Tries:0,
    minStones : 100000,
	Good:0,
	Bad:0,
	Items: [],
	SalvageQuality:0,
	saveXitems:0,
	thronekeep:1,
	Salvage:{},
	Salvage_fav:{},
	Salvage_slots:{},
	Salvage_Type:{},
	UseTokens: false,
	LLTlevel:5,
	LPSlevel:0,
	PresetName: {1: "Preset 1",2: "Preset 2",3: "Preset 3",4: "Preset 4",5: "Preset 5",6: "Preset 6",7: "Preset 7",8: "Preset 8"},
	Presets: 	{
				1:{advisor:0,banner:0,chair:0,candelabrum:0,table:0,trophy:0,windows:0},
				2:{advisor:0,banner:0,chair:0,candelabrum:0,table:0,trophy:0,windows:0},
				3:{advisor:0,banner:0,chair:0,candelabrum:0,table:0,trophy:0,windows:0},
				4:{advisor:0,banner:0,chair:0,candelabrum:0,table:0,trophy:0,windows:0},
				5:{advisor:0,banner:0,chair:0,candelabrum:0,table:0,trophy:0,windows:0},
				6:{advisor:0,banner:0,chair:0,candelabrum:0,table:0,trophy:0,windows:0},
				7:{advisor:0,banner:0,chair:0,candelabrum:0,table:0,trophy:0,windows:0},
				8:{advisor:0,banner:0,chair:0,candelabrum:0,table:0,trophy:0,windows:0}
			},
};

var DFOptions = {
  LastSearch 			: 0,
  Running       		: false,
  DFFound 				: 0,
  DFFailedBog       	: 0,
  Levels    			: {1:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},2:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},3:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},4:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},5:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},6:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},7:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},8:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false}},
  Troops    			: {1:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},2:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},3:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},4:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},5:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},6:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},7:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},8:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},9:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},10:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0}},
  knightselector        : 0,
};

var ApothecaryOptions = {
	Active : false,
	goldkeep : 0,
	city : {0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[]},
};

var MarchQueue = {
	1:[],
	2:[],
	3:[],
	4:[],
	5:[],
	6:[],
	7:[],
	8:[]
};

var ResetAll=false;
var deleting=false;
var Recall=[];
var WhatCity = 1;
var MarchesSend = 0;
var MarchesError = 0;
var MarchDelay = 5;
var MarchOffset = MarchDelay;
var Seconds = 0;



// Get element by id shortform with parent node option
function $(ID,root) {return (root||document).getElementById(ID);}

var nHtml={
  FindByXPath:function(obj,xpath,nodetype) {
	if(!nodetype) nodetype = XPathResult.FIRST_ORDERED_NODE_TYPE;	
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
	evt.initMouseEvent(evtName, true, true, win, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
  },

  Click:function(obj) {
	return this.ClickWin(window,obj,'click');
  },
  
  ClickTimeout:function(obj,millisec) {
	window.setTimeout(function() {return nHtml.ClickWin(window,obj,'click');},millisec+Math.floor(Math.random()*500));
  },

  SetSelect:function(obj,v) {
	for(var o=0; o<obj.options.length; o++) if(v==obj.options[o].value) { obj.options[o].selected=true; return true; }
	return false;
  },
}

readGlobalOptions();
GlobalOptions.pbWideScreen = true;

if (document.URL.search(/apps.facebook.com\/kingdomsofcamelot/i) >= 0){
	setTimeout(function() {
		var url=document.URL;
		var what = /s=([0-9]+)/i.exec(url);
		if (what) unsafeWindow.window.document.title="KOC "+what[1];		
	}, 10000)
	facebookInstance();
	HandlePublishPopup();
	return;
}

if (document.URL.search(/kabam.com\/games\/kingdoms-of-camelot\/play/i) >= 0){kabamStandAlone ();return;}
if (document.URL.search(/kabam.com\/nl\/games\/kingdoms-of-camelot\/play/i) >= 0){kabamStandAlone ();return;}

if (document.URL.search(/facebook.com/i) >= 0){
	if(document.URL.search(/connect\/uiserver.php/i) >= 0 || document.URL.search(/serverfbml/i) >= 0 || document.URL.search(/dialog\/stream.publish/i) >= 0 || document.URL.search(/dialog\/apprequests/i) >= 0 || document.URL.search(/dialog\/feed/i) >= 0) HandlePublishPopup();
  	return;
}

if (document.URL.search(/kingdomsofcamelot.com/i) >= 0) kocWideScreen ();

function kocWideScreen(){
  function setWideFb (){
	var kocFrame = '';
	try{
		kocFrame = parent.document.getElementById('kocIframes1');
	} catch (e){
		logit("kocWideScreen "+e);
		kocFame = document.getElementById("kocIframes1");
	}
	if (!kocFrame){
	  setTimeout (setWideFb, 1000);
	  return;
	}
	kocFrame.style.width = '100%';
	var style = document.createElement('style')
	style.innerHTML = 'body {margin:0; width:100%; !important;}';
	kocFrame.parentNode.appendChild(style);
  }
  kocWatchdog ();
  if (GlobalOptions.pbWideScreen)
		setWideFb();
}

var aj2 = function(c, d, b, a) {
    if (d.ctrl && d.ctrl == "Tracking") return;
    else unsafeWindow.AjaxCall.gAjaxRequest(c, d, b, a, "post");    
}

if(unsafeWindow.AjaxCall) unsafeWindow.AjaxCall.gPostRequest = aj2

/***  Run only in "apps.facebook.com" instance ... ***/
function facebookInstance (){
  function setWide (){
	var iFrame = document.getElementById('iframe_canvas');
	if (!iFrame){
	  setTimeout (setWide, 1000);
	  return;
	}
	iFrame.style.width = '100%';

	while ( (iFrame=iFrame.parentNode) != null)
	  if (iFrame.tagName=='DIV')
		iFrame.style.width = '100%';
	document.getElementById('globalContainer').style.left = '0px';
    try{    
      document.getElementById('rightCol').parentNode.removeChild(document.getElementById('rightCol'));
      document.getElementById('leftColContainer').parentNode.removeChild(document.getElementById('leftColContainer'));
    } catch (e){
      // toolkit may have removed them already!
    }
    var e = document.getElementById('mainContainer');
	if(e){
		if (GlobalOptions.pbWideScreenStyle=="normal") e.parentNode.style.minWidth = '100%';
		if (GlobalOptions.pbWideScreenStyle=="wide") e.parentNode.style.width = '1520px';
		if (GlobalOptions.pbWideScreenStyle=="ultra") e.parentNode.style.width = '1900px';
		for(i=0; i<e.childNodes.length; i++){
			if(e.childNodes[i].id == 'contentCol'){
				e.childNodes[i].style.margin = '0px';
				e.childNodes[i].style.paddingTop = '5px';
				break;
			}
		}
	}
	var e = document.getElementById('pageHead');
	if(e){
		e.style.width = '80%';
		e.style.margin = '0 10%';
	}
	var e = document.getElementById('bottomContent');
	if(e){
		e.style.padding = "0px 0px 12px 0px";
	}
    
  }
  facebookWatchdog();
  if (GlobalOptions.pbWideScreen)
    setWide();
}

function kabamStandAlone (){
  function setWide (){
	var iFrames = $('game_frame');
	if (!iFrames){
	  setTimeout (setWide, 1000);
	  return;
	}
	
	iFrames.style.width = '100%';
	while ( (iFrames=iFrames.parentNode) != null && iFrames.tagName !== "BODY") {
		if (GlobalOptions.pbWideScreenStyle=="normal") iFrames.style.width = '100%';
		if (GlobalOptions.pbWideScreenStyle=="wide") iFrames.style.width = '1520px';
		if (GlobalOptions.pbWideScreenStyle=="ultra") iFrames.style.width = '1900px'
	}
	try{    
      document.getElementById('promo-sidebar').parentNode.removeChild(document.getElementById('promo-sidebar'));
    } catch (e){
      logit("Failed to remove sidebar "+e);
    }
  }

  function sendmeaway (){
	var serverID = /s=([0-9]+)/im.exec (document.location.href);
	var sr = /value="(.*?)"/im.exec ($("post_form").innerHTML);
	var goto = $("post_form").action+(serverID?"?s="+serverID[1]:'');
	var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxxpbutExplode type=submit value=RELOAD><INPUT type=hidden name=signed_request value="'+ sr[1] +'" /><INPUT type=hidden name=platform_req value=A /></form>';
	var e = document.createElement ('div');
	e.innerHTML = t;
	document.body.appendChild (e);
	setTimeout (function (){document.getElementById('xxxpbutExplode').click();}, 0);
  }
  if (GlobalOptions.pbWideScreen) setWide();
  if(GlobalOptions.pbNoMoreKabam) sendmeaway();
}

function HandlePublishPopup() {
	if(GlobalOptions.autoPublishGamePopups){
		var FBInputForm = document.getElementById('uiserver_form');
		//logit(FBInputForm)
		if(FBInputForm){
			var channel_input = nHtml.FindByXPath(FBInputForm,".//input[contains(@name,'channel')]");
			if(channel_input){
				var current_channel_url = channel_input.value;
				if (current_channel_url.match(/(http|https):\/\/(.*?)\.kingdomsofcamelot\.com(.*?)/i)) {
					var publish_button = nHtml.FindByXPath(FBInputForm,".//input[@type='submit' and contains(@name,'cancel')]");
					if(publish_button) nHtml.Click(publish_button);
					
				}
			}		
		}
		setTimeout(HandlePublishPopup, 1000);
	}
}

var Cities = {};
var Seed = unsafeWindow.seed;
var Tabs = {};
var pbButtons = {};
var mainPop;
var pbStartupTimer = null;
var pbPopUpTopClass = 'pbPopTop';
var firefoxVersion = getFirefoxVersion();
var TrainCity = 0;
var CM = unsafeWindow.cm;

function pbStartup (){
  clearTimeout (pbStartupTimer);
  if (unsafeWindow.pbLoaded) return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    pbStartupTimer = setTimeout (pbStartup, 1000);
    return;
  }
  unsafeWindow.pbLoaded = true;
  
  Seed = unsafeWindow.seed;
  readOptions();
  var styles = '.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    table.pbTab tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    table.Throne {background-color:#FFFFE3; white-space:nowrap; padding:0px; border-style:solid; border-color:darkgrey; width:250px; max-width:250px; text-wrap:normal;word-wrap:break-word}\
    table.Throne tr td {background:none; white-space:nowrap; padding:0px; border-style:none;}\
    table.ThroneEQ {background-color:#FFFFE3; white-space:nowrap; padding:0px; border-style:solid; border-color:lightred; width:250px; max-width:250px; text-wrap:normal;word-wrap:break-word}\
    table.ThroneEQ tr td {background:none; white-space:nowrap; padding:0px; border-style:none}\
    .hostile td { background:red; }.friendly td{background:lightgreen; }.ally td{background:lightblue; }\
    table.pbTabPadNW tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.pbTabBR tr td {border:none; background:none;}\
    table.pbTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap;}\
    table.pbOptions tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.pbSrchResults tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.pbTabSome tr td {border:none; background:none; padding: 1px 3px; white-space:nowrap;}\
    table.pbTabPad tr td { padding-left: 8px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .pbDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
    .pbStat {border:1px solid; border-color:#000000; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff ; background-color:#357;  -moz-border-radius:5px;}\
    .pbStatOrange {border:1px solid; border-color:#000000; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff ; background-color:orange;  -moz-border-radius:5px;}\
    .pbStatRed {border:1px solid; border-color:#000000; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff ; background-color:red;  -moz-border-radius:5px;}\
    .pbentry {padding: 7px; white-space:nowrap;}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    .castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
    .castleBut:hover {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
    .castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}\
    .castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
    input.pbDefButOn {cursor:pointer; border:1px solid #45d183; -moz-box-shadow:inset 0px 1px 5px #3aef8b; -moz-border-radius:5px;}\
    input.pbDefButOff {cursor:pointer; border:1px solid #f61646; -moz-box-shadow:inset 0px 1px 5px #f6375f; -moz-border-radius:5px;}\
    a.ptButton20 {color:#ffff80}\
    a.ptButtonRed {color:#FA4848}\
    table.pbMainTab { empty-cells: show; margin-left: 5px; margin-top: 4px; padding: 1px;  padding-left:5px;}\
    table.pbMainTab tr td a {color:inherit }\
    table.pbMainTab tr td   {height:60%; empty-cells:show; padding: 0px 4px 0px 4px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; -moz-border-radius:5px; }\
    table.pbMainTab tr td.spacer {padding: 0px 0px;}\
    table.pbMainTab tr td.notSel { color: #ffffff; font-size: 12px; font-weight:bold; -moz-border-radius: 10px; -moz-box-shadow: 0px 1px 3px #357544; text-shadow: -1px 1px 3px #666666; border: solid #615461 1px; background: -moz-linear-gradient(top, #6ff28e, #196b2c);}\
    table.pbMainTab tr td.sel { color: #000000; font-size: 12px; font-weight:bold; -moz-border-radius: 10px; -moz-box-shadow: 0px 1px 3px #357544; text-shadow: -1px 1px 3px #CECECE; border: solid #615461 1px; background: -moz-linear-gradient(top, #6ff28e, #196b2c);}\
    table.pbMainTab tr td:hover { color: #191919; font-size: 12px; font-weight:bold; text-shadow: -1px 1px 3px #CECECE; background: -moz-linear-gradient(top, #43cc7e, #20a129)}\
    tr.pbPopTop td { background-color:transparent; border:none; height: 21px; padding:0px;}\
    tr.pbretry_pbPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    tr.pbMainPopTop td { background-color:#ded; border:none; height: 42px; width:80%; padding:0px; }\
    tr.pbretry_pbMainPopTop td { background-color:#a00; color:#fff; border:none; height: 42px;  padding:0px; }\
    .pbPopMain  { border:1px solid #000000; -moz-box-shadow:inset 0px 0px 10px #6a6a6a; -moz-border-radius-bottomright: 20px; -moz-border-radius-bottomleft: 20px;}\
    .pbPopup  {border:5px ridge #666; opacity:'+(parseFloat(Options.Opacity)<'0.5'?'0.5':Options.Opacity)+'; -moz-border-radius:25px; -moz-box-shadow: 1px 1px 5px #000000; }\
    span.pbTextFriendly {color: #080}\
    span.pbTextHostile {color: #800}\
    .pbButCancel {background-color:#a00; font-weight:bold; color:#fff}\
    div.indent25 {padding-left:25px}';
    
  window.name = 'PT';
  readTrainingOptions();
  readCrestOptions();
  readAtkOptions();
  readDFOptions();
  readFarmOptions();
  readThroneOptions();
  readLayoutOptions();
  readDashboardOptions();
  readApothecaryOptions();
  readMarchOptions();
  setCities();
  setInterval(eachSecond,1000);
  if (firefoxVersion.substring(0,4) >=16){
  	unsafeWindow.jQuery("#hudAvatarPic").attr("class", "");
  	document.getElementById('hudAvatarPic').innerHTML = '<img src="https://graph.facebook.com/'+ unsafeWindow.user_id +'/picture">';
  	document.getElementById('hudAvatarPic').onclick = null;
  }

// TODO: Make sure WinPos is visible on-screen ?
  if (Options.pbWinPos==null || Options.pbWinPos.x==null|| Options.pbWinPos.x=='' || isNaN(Options.pbWinPos.x)){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.pbWinPos.x = c.x+4;
    Options.pbWinPos.y = c.y+c.height;
    saveOptions ();
  }

  // Reset window xPos if the widescreen option is disabled
  if(!GlobalOptions.pbWideScreen && Options.pbWinPos.x > 700){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.pbWinPos.x = c.x+4;
    saveOptions ();
  }

  mainPop = new pbPopup ('pb', Options.pbWinPos.x, Options.pbWinPos.y, 910,800, Options.pbWinDrag,
      function (){
        tabManager.hideTab();
        Options.pbWinIsOpen=false;
        saveOptions();
      });
  mainPop.autoHeight (true);  

  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
  AddMainTabLink('BOT', eventHideShow, mouseMainTab);
  AddSubTabLink('Refresh Seed', RefreshSeed, 'pbSeedRefresh');
  tabManager.init (mainPop.getMainDiv());
  actionLog ("KOC Power Bot v"+ Version +" Loaded  (KofC version: "+ anticd.getKOCversion() +")");
  
  FairieKiller.init (Options.pbKillFairie);
  RefreshEvery.init ();
  SpamEvery.init ();
  CollectGold.init();
  ChatPane.init();
  DeleteReports.init();
  messageNav.init();

  if (Options.pbWinIsOpen && Options.pbTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);
  WideScreen.init ();
  WideScreen.setChatOnRight (Options.pbChatOnRight);
  WideScreen.useWideMap (Options.pbWideMap);
  killbox();
}

/************************ Food Alerts *************************/
var FoodAlerts = {
  	e_eachMinute : function (){  
    	var f = FoodAlerts;
	    var now = unixTime();
	    row = [];
	    if ((Options.FoodAlertChecked + 3600) < now) {
		    for(i=0; i < Cities.numCities; i++) {
		        var rp = getResourceProduction (Cities.cities[i].id);
		        var foodleft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0])/3600;
		        var usage = rp[1] - parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
		        row[i] = rp[1] - usage;
		        var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-usage) * 3600;
		        var msg = '';
		        if (usage < 0) {
		    		if (Options.pbFoodAlert && timeLeft<(6*3600)) {
		            	msg += translate("My city")+' '+Cities.cities[i].name.substring(0,10) + ' (' + Cities.cities[i].x +','+ Cities.cities[i].y + ')';
		            	msg += translate("is low on food")+". "+translate("Remaining")+': '+addCommasWhole(foodleft)+' ('+timestrShort(timeLeft)+') '+translate("Upkeep")+': '+addCommas(usage);
		            	sendChat ("/a " + msg);
		          	}
		    	}
		    }
		    Options.FoodAlertChecked = now;
		    saveOptions();
		}
  },
}

/*********************************  Farm Tab ***********************************/
Tabs.farm = {
	tabLabel: 'Auto Farm',
	tabOrder : 612,
	myDiv : null,
	MapAjax : new CMapAjax(),
	popFirst : true,
	opt : {},
	nextattack : null,
	updateSeedTimer: null,
	tilesSearched : 0,
	tilesFound : 0,
	helpArray:{},
	FarmArray:{},
	marchArray:[],
	lookup:1,
	city:0,
	deleting:false,
	DipArray: ["friendly","hostile","friendlyToThem","friendlyToYou","neutral","unallied"],
	interval: ["Continuously","1 Hour","2 Hours","3 Hours","6 Hours","12 Hours","24 Hours"],
    
  	init : function (div){
	    var t = Tabs.farm;
	    t.myDiv = div;

	    var m = '<DIV id=pbTowrtDivF class=pbStat>AUTOMATED FARMING FUNCTION</div><TABLE id=pbbarbingfunctions width=100% height=0% class=pbTab><TR align="center">';
	    if (FarmOptions.Running == false) m += '<TD><INPUT id=FarmAttSearch type=submit value="Farming = OFF"></td>';
		 else m += '<TD><INPUT id=FarmAttSearch type=submit value="Farming = ON"></td>';
	    m +='<TD><INPUT id=pbpaintFarms type=submit value="Show Farms">';
	    m += '<SELECT id=pbFarmcity type=list></select></td><TD><INPUT id=FarmSearch type=submit value="Search again"></td><TD><DIV id=FarmSearchPR></div></td></tr></table>';
	    m += '</tr></table></div>';
	    m += '<DIV id=pbTraderDivD class=pbStat>FARMING STATS</div>';
	    m += '<TABLE id=pbfarmstats width=95% height=0% class=pbTab><TR align="left"><TR>';
	    for(i=0;i<Seed.cities.length;i++) m += '<TD>' + Seed.cities[i][1] +'</td>'; 
	    m+='</tr><TR>';
	    for(i=0;i<Seed.cities.length;i++) m += '<TD><DIV><span id='+ 'pdtotalFarm' + i +'></span></div></td>';
	    m+='</tr><TR>';
	    for(i=0;i<Seed.cities.length;i++) m += '<TD><DIV><span id='+ 'pddataFarm' + i +'></span></div></td>';    
	    m+='</tr><TR>'
	    for(i=0;i<Seed.cities.length;i++) m += '<TD><DIV><span id='+ 'pddataFarmarray' + i +'></span></div></td>'; 
	    m+='</tr></table>';    
	    m+='<DIV id=FarmCheck></div>';
	    m += '<DIV id=pbTraderDivD class=pbStat>FARMING OPTIONS</div>';
	    m += '<TABLE id=pbfarmstats width=90% height=0% class=pbTab>';
	    m += '<TR><TD>Farm Interval</td><TD><SELECT id=FarmInterval type=list></td></tr>';
	    m += '<TR><TD>Delete reports:</td><TD><INPUT id=FarmReports type=checkbox '+(FarmOptions.DeleteReports?'CHECKED':'')+'></td><tr>';
	    m += '<TR><TD>Might:</td>';
	    m += '<TD width=50>Min.:<INPUT type=text id=FarmMinMight size=8 maxlength=8 value='+ FarmOptions.MinMight +'></td>';
	    m += '<TD>Max.:<INPUT type=text id=FarmMaxMight size=9 maxlength=9 value='+ FarmOptions.MaxMight +'></td></tr>';
	    m += '<TR><TD>Farm if inactive for more then: </td>';
	    m += '<TD><INPUT type=text id=FarmInactive size=3 value='+ FarmOptions.Inactive +'> days (checked every 6 hours)</td></table>';
	    m += '<TABLE id=pbfarmstats width=90% height=0% class=pbTab><TR align="left"><TR><TD width=100>City:</td>';
	    for (i=1;i<=Seed.cities.length;i++) m+='<TD class=pbCityEn><INPUT id=CityEnable'+ i +'  type=checkbox '+(FarmOptions.CityEnable[i]?'CHECKED':'')+'>'+ Seed.cities[i-1][1] +'</td>';  
	    m += '</tr></table><TABLE id=pbfarmstats width=90% height=0% class=pbTab><TR align="left"><TD width=100>City Level:</td>';
	    for (i=1;i<=12;i++) m+='<TD class=pbCityOpt><INPUT id=CityLevel'+ i +'  type=checkbox '+(FarmOptions.CityLevel[i]?'CHECKED':'')+'>'+ i +'</td>'; 
	    m += '</tr></table><TABLE id=pbfarmstats width=90% height=0% class=pbTab><TR align="left"><TR><TD width=100>Diplomacy:</td>';
	    for (i=0;i<t.DipArray.length;i++) m+='<TD class=pbDipOpt><INPUT id=Diplomacy'+ t.DipArray[i] +'  type=checkbox '+(FarmOptions.Diplomacy[t.DipArray[i]]?'CHECKED':'')+'>'+ t.DipArray[i] +'</td>';    
	    m+='</tr></table>';   
	    m += '<DIV id=pbTraderDivD class=pbStat>FARMING TROOPS</div>';
	    m += '<TABLE id=pbaddreasignroute width=100% height=0% class=pbTab><TR align="center">';
	    m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_50.jpg?6545"></td>';
	    m += '<TD>Supply Troop</td>'
	    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_50.jpg?6545"></td>'
	    m += '<TD>Militiaman</td>'
	    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_50.jpg?6545"></td>'
	    m += '<TD>Scout</td>'
	    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_50.jpg?6545"></td>'
	    m += '<TD>Pikeman</td></tr>'
	    m += '<TR><TD  class=pbTroopOpt><INPUT id=FarmTroop1  type=text size=10 maxlength=10 value='+ FarmOptions.Troops[1] +'\></td>';
	    m += '<TD  class=pbTroopOpt><INPUT id=FarmTroop2  type=text size=10 maxlength=10 value='+ FarmOptions.Troops[2] +'\></td>';
	    m += '<TD  class=pbTroopOpt><INPUT id=FarmTroop3  type=text size=10 maxlength=10 value='+ FarmOptions.Troops[3] +'\></td>';
	    m += '<TD  class=pbTroopOpt><INPUT id=FarmTroop4  type=text size=10 maxlength=10 value='+ FarmOptions.Troops[4] +'\></td></tr>';
	    m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_50.jpg?6545"></td>';
	    m += '<TD>Swordsman</td>'
	    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545"></td>'
	    m += '<TD>Archer</td>'
	    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_50.jpg?6545"></td>'
	    m += '<TD>Cavalry</td>'
	    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_50.jpg?6545"></td>'
	    m += '<TD>Heavy Cavalry</td></tr>'
	    m += '<TR><TD  class=pbTroopOpt><INPUT id=FarmTroop5  type=text size=10 maxlength=10 value='+ FarmOptions.Troops[5] +'\></td>';
	    m += '<TD  class=pbTroopOpt><INPUT id=FarmTroop6  type=text size=10 maxlength=10 value='+ FarmOptions.Troops[6] +'\></td>';
	    m += '<TD  class=pbTroopOpt><INPUT id=FarmTroop7  type=text size=10 maxlength=10 value='+ FarmOptions.Troops[7] +'\></td>';
	    m += '<TD  class=pbTroopOpt><INPUT id=FarmTroop8  type=text size=10 maxlength=10 value='+ FarmOptions.Troops[8] +'\></td></tr>';
	    m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_50.jpg?6545"></td>';
	    m += '<TD>Supply Wagon</td>'
	    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_50.jpg?6545"></td>'
	    m += '<TD>Ballista</td>'
	    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_50.jpg?6545"></td>'
	    m += '<TD>Battering Ram</td>'
	    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_50.jpg?6545"></td>'
	    m += '<TD>Catapult</td></tr>'
	    m += '<TR><TD  class=pbTroopOpt><INPUT id=FarmTroop9  type=text size=10 maxlength=10 value='+ FarmOptions.Troops[9] +'\></td>';
	    m += '<TD  class=pbTroopOpt><INPUT id=FarmTroop10  type=text size=10 maxlength=10 value='+ FarmOptions.Troops[10] +'\></td>';
	    m += '<TD  class=pbTroopOpt><INPUT id=FarmTroop11  type=text size=10 maxlength=10 value='+ FarmOptions.Troops[11] +'\></td>';
	    m += '<TD  class=pbTroopOpt><INPUT id=FarmTroop12 type=text size=10 maxlength=10 value='+ FarmOptions.Troops[12] +'\></td></tr></table>';
	    
	    t.myDiv.innerHTML = m;
	     
	    t.checkFarmData();
	    document.getElementById('pbFarmcity').options.length=0;
	    for (i=0;i<Seed.cities.length;i++){
	        var o = document.createElement("option");
	        o.text = Seed.cities[i][1]
	        o.value = i+1;
	        document.getElementById("pbFarmcity").options.add(o);
		}
	    document.getElementById('FarmInterval').options.length=0;
	    for (i=0;i<t.interval.length;i++){
	        var o = document.createElement("option");
	        o.text = t.interval[i];
	        o.value = i;
	        document.getElementById("FarmInterval").options.add(o);
		}
	    document.getElementById('FarmInterval').value = FarmOptions.Interval;    
	    for(i=0;i<Seed.cities.length;i++){
	            var elem = 'pdtotalFarm'+i;
	            if (t.FarmArray[i+1] == undefined) document.getElementById(elem).innerHTML = 'No Data';
	            else document.getElementById(elem).innerHTML =  'Farms :' + t.FarmArray[i+1].length +'/'+ t.helpArray[i+1].length;
	    }
	    document.getElementById('FarmInterval').addEventListener('change', function(){FarmOptions.Interval = document.getElementById('FarmInterval').value;saveFarmOptions();} , false);
	    document.getElementById('FarmReports').addEventListener('change', function(){FarmOptions.DeleteReports = document.getElementById('FarmReports').checked;saveFarmOptions();} , false);
	    document.getElementById('FarmAttSearch').addEventListener('click', function(){t.toggleBarbState(this)} , false);
	    document.getElementById('FarmSearch').addEventListener('click', function(){
	        for (i=1;i<=Seed.cities.length;i++) GM_deleteValue('Farms_' + Seed.player['name'] + '_city_' + i + '_' + getServerId());
	        for(i=0;i<Seed.cities.length;i++){
	                var elem = 'pdtotalFarm'+i;
	                document.getElementById(elem).innerHTML = 'No Data';
	        }
	        t.checkFarmData();
	    } , false);
	    document.getElementById('pbpaintFarms').addEventListener('click', function(){t.showFarms(document.getElementById("pbFarmcity").value,Seed.cities[document.getElementById("pbFarmcity").value -1][1]);},false);   
	    document.getElementById('FarmMinMight').addEventListener('change', function(){FarmOptions.MinMight = parseInt(document.getElementById('FarmMinMight').value);t.FilterFarms();saveFarmOptions();} , false);
	    document.getElementById('FarmMaxMight').addEventListener('change', function(){FarmOptions.MaxMight = parseInt(document.getElementById('FarmMaxMight').value);t.FilterFarms();saveFarmOptions();} , false);
	    document.getElementById('FarmInactive').addEventListener('change', function(){FarmOptions.Inactive = parseInt(document.getElementById('FarmInactive').value);t.FilterFarms();saveFarmOptions();} , false);
	  
	    var element = document.getElementsByClassName('pbTroopOpt');
	    for (k=0;k<element.length;k++){
            element[k].addEventListener('change', function(){
                for (i=1;i<=10;i++){
                    FarmOptions.Troops[i] = document.getElementById('FarmTroop' + i).value;
                    saveFarmOptions();
                }
            }, false);
	    }
	    
	    element = document.getElementsByClassName('pbCityOpt');
	    for (k=0;k<element.length;k++){
            element[k].addEventListener('change', function(){
                for (i=1;i<=12;i++){
                    FarmOptions.CityLevel[i] = document.getElementById('CityLevel' + i).checked;
                    saveFarmOptions();
                }
                t.FilterFarms();
            }, false);
	     }
	    
	    element = document.getElementsByClassName('pbCityEn');
	    for (k=0;k<element.length;k++){
            element[k].addEventListener('change', function(){
                for (i=1;i<=Seed.cities.length;i++){
                    FarmOptions.CityEnable[i] = document.getElementById('CityEnable' + i).checked;
                    saveFarmOptions();
                }
                t.checkFarmData();
                t.FilterFarms();
            }, false);
	    }
    
	    element = document.getElementsByClassName('pbDipOpt');
	    for (k=0;k<element.length;k++){
            element[k].addEventListener('change', function(){
                for (i=0;i<t.DipArray.length;i++){
                    FarmOptions.Diplomacy[t.DipArray[i]] = document.getElementById('Diplomacy' + t.DipArray[i]).checked;
                    saveFarmOptions();
                }
                t.FilterFarms();
            }, false);
	      
	    }
   	},
   
    /*checkMarches: function () {
        var t = Tabs.farm;
        for (i=0;i<FarmOptions.FarmMarches.length;i++){
                var cityId = "city"+ FarmOptions.FarmMarches[i]["cityId"];
                var city = FarmOptions.FarmMarches[i]["city"];
                var marchId = "m" + FarmOptions.FarmMarches[i]["marchId"];
                if (Seed.queue_atkp[cityId][marchId] !=undefined){
                            if (Seed.queue_atkp[cityId][marchId].marchStatus == 8  && Seed.queue_atkp[cityId][marchId].hasUpdated) {
                                    FarmOptions.Checks++;
                                    saveFarmOptions();
                                    document.getElementById('FarmCheck').innerHTML = "Attacks: " + FarmOptions.Attacks + " - Checks:" + FarmOptions.Checks;
                                    for(u=1;u<=12;u++) if (parseInt(Seed.queue_atkp[cityId][marchId]["unit"+u+"Return"]) < parseInt(Seed.queue_atkp[cityId][marchId]["unit"+u+"Count"])){
                                                t.FarmArray[FarmOptions.FarmMarches[i]["city"]][FarmOptions.FarmMarches[i]["number"]]["lost"] = true;
                                                t.FarmArray[FarmOptions.FarmMarches[i]["city"]][FarmOptions.FarmMarches[i]["number"]]["enabled"] = false;
                                    }
                                    for (a=0;a<t.helpArray[FarmOptions.FarmMarches[i]["city"]].length;a++){
                                            for (b=0;b<t.FarmArray[FarmOptions.FarmMarches[i]["city"]].length;b++){
                                                 if (parseInt(t.FarmArray[FarmOptions.FarmMarches[i]["city"]][b]['x']) == parseInt(t.helpArray[FarmOptions.FarmMarches[i]["city"]][b]['x']) && parseInt(t.FarmArray[FarmOptions.FarmMarches[i]["city"]][b]['y']) == parseInt(t.helpArray[FarmOptions.FarmMarches[i]["city"]][b]['y'])){
                                                           t.helpArray[FarmOptions.FarmMarches[i]["city"]][a]['gold'] = t.FarmArray[FarmOptions.FarmMarches[i]["city"]][b]['gold'];
                                                           t.helpArray[FarmOptions.FarmMarches[i]["city"]][a]['resource1'] = t.FarmArray[FarmOptions.FarmMarches[i]["city"]][b]['resource1'];
                                                        t.helpArray[FarmOptions.FarmMarches[i]["city"]][a]['resource2'] = t.FarmArray[FarmOptions.FarmMarches[i]["city"]][b]['resource2'];
                                                        t.helpArray[FarmOptions.FarmMarches[i]["city"]][a]['resource3'] = t.FarmArray[FarmOptions.FarmMarches[i]["city"]][b]['resource3'];
                                                        t.helpArray[FarmOptions.FarmMarches[i]["city"]][a]['resource4'] = t.FarmArray[FarmOptions.FarmMarches[i]["city"]][b]['resource4'];
                                                        t.helpArray[FarmOptions.FarmMarches[i]["city"]][a]['empty'] = t.FarmArray[FarmOptions.FarmMarches[i]["city"]][b]['empty'];
                                                        t.helpArray[FarmOptions.FarmMarches[i]["city"]][a]['lost'] = t.FarmArray[FarmOptions.FarmMarches[i]["city"]][b]['lost'];
                                                       }    
                                            }
                                    }
                                    GM_setValue('Farms_' + Seed.player['name'] + '_city_' + FarmOptions.FarmMarches[i]["city"] + '_' + getServerId(), JSON2.stringify(t.helpArray[FarmOptions.FarmMarches[i]["city"]]));
                                    FarmOptions.FarmMarches.splice(i,1);
                                    saveFarmOptions();
                            }
                } else {
                    FarmOptions.FarmMarches.splice(i,1);
                    saveFarmOptions();
                }    
        }
    },*/
    
    showFarms: function (citynumber,cityname) {
        var t = Tabs.farm;
        var popTradeRoutes = null;
        t.popTradeRoutes = new pbPopup('pbShowFarms', 0, 0, 1100, 485, true, function() {clearTimeout (1000);});
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbShowBarbs" id="pbBars">';       
        t.popTradeRoutes.getMainDiv().innerHTML = '</table></div>' + m;
        t.popTradeRoutes.getTopDiv().innerHTML = '<TD><center><B>Farms for city: '+cityname+'</center></td>';
        t.paintFarms(citynumber,cityname);
        t._addTabHeader(citynumber,cityname);
        t.popTradeRoutes.show(true)    ;
    },
    
    ToggleFarms: function(citynumber) {
        var t = Tabs.farm;
        var id=0;
        var element_class = document.getElementsByClassName('Farm');
               for (d = 1; d <= t.FarmArray[citynumber].length; d++) {
                    id = d-1;
                    var ele = document.getElementById('FarmToggle' + d);
              if (ele.checked) {
            t.FarmArray[citynumber][id].enabled = true;
            t.FarmArray[citynumber][id].lost = false;
            t.FarmArray[citynumber][id].empty = 0;   
        }
                    else t.FarmArray[citynumber][id].enabled = false;
            }
        for (i=0;i<t.helpArray[citynumber].length;i++){
                for (j=0;j<t.FarmArray[citynumber].length;j++){
                     if (parseInt(t.FarmArray[citynumber][j]['x']) == parseInt(t.helpArray[citynumber][i]['x']) && parseInt(t.FarmArray[citynumber][j]['y']) == parseInt(t.helpArray[citynumber][i]['y'])) t.helpArray[citynumber][i].enabled = t.FarmArray[citynumber][j].enabled;
                }
        }
        GM_setValue('Farms_' + Seed.player['name'] + '_city_' + citynumber + '_' + getServerId(), JSON2.stringify(t.helpArray[citynumber]));
    },
        
    paintFarms: function(i,cityname){
        var t = Tabs.farm;
        for (k=(t.FarmArray[i].length-1);k>=0;k--){t._addTab(i,cityname,k+1,t.FarmArray[i][k]['enabled'], t.FarmArray[i][k]['x'], t.FarmArray[i][k]['y'],t.FarmArray[i][k]['dist'], t.FarmArray[i][k]['level'],t.FarmArray[i][k]['AllianceName'], t.FarmArray[i][k]['Diplomacy'], t.FarmArray[i][k]['PlayerName'], t.FarmArray[i][k]['cityName'],t.FarmArray[i][k]['might'], t.FarmArray[i][k]['cityNumber'], t.FarmArray[i][k]['attacked'],t.FarmArray[i][k]['DaysInactive'],t.FarmArray[i][k]['lost'],t.FarmArray[i][k]['empty'],t.FarmArray[i][k]['gold'],t.FarmArray[i][k]['resource1'],t.FarmArray[i][k]['resource2'],t.FarmArray[i][k]['resource3'],t.FarmArray[i][k]['resource4']);}
    },


	_addTab: function(citynumber,cityname,queueId,status,X,Y,dist,level,AllianceName,diplomacy,playerName,cityName,might,cityNumber,attacked,DaysInactive,lost,empty,gold,rec1,rec2,rec3,rec4){
	    var t = Tabs.farm;
	    var row = document.getElementById('pbBars').insertRow(0);
	    row.vAlign = 'top';     
	    if (lost) row.style.color = "red";
	    if (!lost && empty == 0) row.style.color = "black";
	    if (FarmOptions.Inactive > DaysInactive) row.style.color = "orange";
	    row.insertCell(0).innerHTML = queueId;
	    row.insertCell(1).innerHTML = coordLink(X,Y);
	    row.insertCell(2).innerHTML = dist;
		row.insertCell(3).innerHTML = level;
		row.insertCell(4).innerHTML = AllianceName;
		row.insertCell(5).innerHTML = diplomacy;    
		row.insertCell(6).innerHTML = playerName;
		row.insertCell(7).innerHTML = cityName;
		row.insertCell(8).innerHTML = addCommas(might);
		row.insertCell(9).innerHTML = DaysInactive;
		row.insertCell(10).innerHTML = attacked;
	    row.insertCell(11).innerHTML = '<INPUT class=Farm id="FarmToggle' + queueId + '" type=checkbox>';    
	    var element_class = document.getElementsByClassName('Farm');
		for (c = 0; c < element_class.length; c++) {
            element_class[c].checked = t.FarmArray[citynumber][c].enabled;
            element_class[c].addEventListener('click', function(){t.ToggleFarms(citynumber)}, false);
		}
	},
        
    _addTabHeader: function(citynumber,cityname) {
        var t = Tabs.farm;
	    var row = document.getElementById('pbBars').insertRow(0);
	    row.vAlign = 'top';
	    row.insertCell(0).innerHTML = "Id";
	    row.insertCell(1).innerHTML = "Coords";
	    row.insertCell(2).innerHTML = "Dist.";
	    row.insertCell(3).innerHTML = "Level";
	    row.insertCell(4).innerHTML = "Allaince Name";
	    row.insertCell(5).innerHTML = "Diplomacy";
	    row.insertCell(6).innerHTML = "Player Name";
	    row.insertCell(7).innerHTML = "City Name";
	    row.insertCell(8).innerHTML = "Might";
	    row.insertCell(9).innerHTML = "Inactive";
	    row.insertCell(10).innerHTML = "# Attacks";
    },

	isMyself: function(userID){
	    if(!Seed.players["u"+userID]) return false;
	    if(Seed.players["u"+userID].n == Seed.player.name) return true;
	    else return false;
	    return false;
	},

  	checkFarmData: function(){
      	var t = Tabs.farm;
	    if (FarmOptions.Running == false) return;   
	    var ToSearch = [];	    
	    for (i=1;i<=Seed.cities.length;i++){
	    	t.helpArray[i] = [];
	    	var myarray = (GM_getValue('Farms_' + Seed.player['name'] + '_city_' + i + '_' + getServerId()));
    		if (!FarmOptions.CityEnable[i]) continue;
    		if (myarray == undefined) ToSearch.push(i);
    		 else {
	        	myarray = JSON2.parse(myarray);
	        	t.helpArray[i] = myarray.sort(function sortBarbs(a,b) {a = a['dist'];b = b['dist'];return a == b ? 0 : (a < b ? -1 : 1);});
	        	GM_setValue('Farms_' + Seed.player['name'] + '_city_' + i + '_' + getServerId(), JSON2.stringify(t.helpArray[i]));
	    	}	
    	}
    	if (ToSearch.length > 0){
    		document.getElementById('FarmSearchPR').innerHTML='Searching: <PROGRESS id=searchProgress value="0" max="'+ ToSearch.length +'"></progress>';
    		for (i=0;i<ToSearch.length;i++) {
    			X = parseInt(Seed.cities[ToSearch[i]-1][2]);
              	Y = parseInt(Seed.cities[ToSearch[i]-1][3]);
				setTimeout(t.MakeBlocks,((i+1)*6500),X,Y,ToSearch[i],i+1,ToSearch.length);
    		}
    	} else t.FilterFarms();
 	},

 	MakeBlocks:function(getX,getY,city,i,length){
        var t = Tabs.farm;
        var blocks = [];
        var xx=0;
        var yy=0;
        for (x=(getX-35);x<=(getX+35);x+=5) {
           for (y=(getY-35);y<=(getY+35);y+=5) {
                xx=x;
                yy=y;
                if (x>750) xx-=750;
                if (y>750) yy-=750;
                if (x<0) xx+=750;
                if (y<0) yy+=750;
                blocks.push ("bl_" + xx + "_bt_" + yy);
            }
        }
        t.doSearch(blocks,getX,getY,city,i,length)
    },


    doSearch:function (pass,xx,yy,city,i,length){
        var t = Tabs.farm;
        var mapDat = [];
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.blocks = pass;
        new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
            method: "post",
            parameters: params,
            onSuccess: function (transport) {
                var rslt = eval("(" + transport.responseText + ")");
                if (rslt.ok) {
                    if (rslt.data == []) alert("MAP ERROR");
                    map = rslt.data;
                    for (k in map) {
                        var dist = distance(xx, yy, map[k].xCoord, map[k].yCoord);
				        var CityCheck = true;
				       	var who = "u" + map[k].tileUserId;
				        var AllianceName = "";
				        if (map[k].cityName == null && map[k].misted ==false) CityCheck = false;
        				if (t.isMyself(map[k].tileUserId)) CityCheck = false;

                        if (map[k].tileType== 51 && CityCheck) {
                           	var Diplomacy = "neutral";
            				for (DipStatus in t.DipArray) {
                				var AllianceId = 0;
                				if (rslt.userInfo[who] != undefined) AllianceId = "a" + rslt.userInfo[who].a;                
                				for (alliance in Seed.allianceDiplomacies[t.DipArray[DipStatus]]) if (Seed.allianceDiplomacies[t.DipArray[DipStatus]][AllianceId] != undefined) Diplomacy = t.DipArray[DipStatus];
            				}
            				if (rslt.allianceNames[AllianceId] != undefined) AllianceName = rslt.allianceNames[AllianceId];
            				if (Diplomacy == "neutral" && AllianceName =="") Diplomacy = "unallied";
            				mapDat.push ({time:0,empty:0,lost:false,enabled:'true',attacked:0,DaysInactive:"?",LastCheck:0,Diplomacy:Diplomacy,UserId:map[k].tileUserId,AllianceName:AllianceName,x:map[k].xCoord,y:map[k].yCoord,dist:dist,level:map[k].tileLevel,PlayerName:rslt.userInfo[who].n,cityName:map[k].cityName,might:rslt.userInfo[who].m,cityNumber:map[k].cityNum});
                        }
                    }
                    FarmOptions.FarmNumber[city] = 0;
                    FarmOptions.Attacks = 0;
                    FarmOptions.Checks = 0;
                    GM_setValue('Farms_' + Seed.player['name'] + '_city_' + city + '_' + getServerId(), JSON2.stringify(mapDat));  
                    var myarray = (GM_getValue('Farms_' + Seed.player['name'] + '_city_' + city + '_' + getServerId()));
					myarray = JSON2.parse(myarray);
					t.helpArray[city] = myarray.sort(function sortBarbs(a,b) {a = a['dist'];b = b['dist'];return a == b ? 0 : (a < b ? -1 : 1);});                               
                    if (i < length) document.getElementById('FarmSearchPR').value = i;
                     else document.getElementById('FarmSearchPR').innerHTML = "";
                    t.FilterFarms();
                }
            },
        });
    },
  
	FilterFarms: function() {
	    var t = Tabs.farm;
	    t.FarmArray = new Array();
	    t.FarmArray["1"] = new Array();
	    t.FarmArray["2"] = new Array();
	    t.FarmArray["3"] = new Array();
	    t.FarmArray["4"] = new Array();
	    t.FarmArray["5"] = new Array();
	    t.FarmArray["6"] = new Array();
	    t.FarmArray["7"] = new Array();
	    t.FarmArray["8"] = new Array();    
	    for (var u=1;u<=Seed.cities.length;u++){        
	        for (var i in t.helpArray[u]){	
	            var checkLvl = false;
	            var checkMight = false;
	            var checkDip = false;
	            var checkAlliance = false;
	            var AllianceName = "";
	            for (j=1;j<=12;j++) if (FarmOptions.CityLevel[j] && t.helpArray[u][i].level == j) checkLvl=true;
	            if (Seed.allianceDiplomacies.allianceName != undefined) AllianceName = Seed.allianceDiplomacies.allianceName;
	            if (t.helpArray[u][i].AllianceName != AllianceName) checkAlliance = true;
	            if (t.helpArray[u][i].might >= FarmOptions.MinMight && t.helpArray[u][i].might <= FarmOptions.MaxMight) checkMight = true;
	            for (j in FarmOptions.Diplomacy) if (FarmOptions.Diplomacy[j] && t.helpArray[u][i].Diplomacy == j) checkDip=true;
	            if (checkLvl && checkMight && checkDip && checkAlliance) t.FarmArray[u].push (t.helpArray[u][i]);
	        }
	        var elem = 'pdtotalFarm'+(u-1);
	        if (t.FarmArray[u] == undefined) document.getElementById(elem).innerHTML = 'No Data';
	        else document.getElementById(elem).innerHTML =  'Farms :' + t.FarmArray[u].length +'/'+ t.helpArray[u].length;
	    }
	},

	SortDist: function(a,b) {
	    a = parseFloat(a['dist']);
	    b = parseFloat(b['dist']);
	    return (a < b )? -1 : ((a > b ? 1 : 0));
	},
  
  	toggleBarbState: function(obj){
	    var t = Tabs.farm;
	    if (FarmOptions.Running == true) {
	        FarmOptions.Running = false;
	        if (document.getElementById('FarmAttSearch')) document.getElementById('FarmAttSearch').value = "Farming = OFF";
	        if (document.getElementById('AutoFarmToggle')) document.getElementById('AutoFarmToggle').value = "Farming = OFF";
	        saveFarmOptions();
	    } else {
	        FarmOptions.Running = true;
	        if (document.getElementById('FarmAttSearch')) document.getElementById('FarmAttSearch').value = "Farming = ON";
	        if (document.getElementById('AutoFarmToggle')) document.getElementById('AutoFarmToggle').value = "Farming = ON";
	        saveFarmOptions();
	        t.checkFarmData();
	    }
  	},
  	
  	barbing : function(cityID,whatcity){
        var t = Tabs.farm;
       	var city = whatcity +1;
       	if (!FarmOptions.CityEnable[city]) return;
       	if (t.FarmArray[city].length == 0) return;
       	var u1 = FarmOptions.Troops[1];
       	var u2 = FarmOptions.Troops[2];
       	var u3 = FarmOptions.Troops[3];
       	var u4 = FarmOptions.Troops[4];
       	var u5 = FarmOptions.Troops[5];
       	var u6 = FarmOptions.Troops[6];
       	var u7 = FarmOptions.Troops[7];
       	var u8 = FarmOptions.Troops[8];
       	var u9 = FarmOptions.Troops[9];
       	var u10 = FarmOptions.Troops[10];
       	var u11 = FarmOptions.Troops[11];
       	var u12 = FarmOptions.Troops[12];
       	var now = new Date().getTime()/1000.0;
       	now = now.toFixed(0);    
        if (FarmOptions.FarmNumber[city]>=t.FarmArray[city].length) FarmOptions.FarmNumber[city]=0;
        var interval = 0;
        switch(FarmOptions.Interval){
            case "1":interval = 1;break;
            case "2":interval = 2;break;
            case "3":interval = 3;break;
            case "4":interval = 6;break;
            case "5":interval = 12;break;
            case "6":interval = 24;break;
        }        
        var check=0;
        while (check == 0){
	        check=1;
	       	if (!t.FarmArray[city][FarmOptions.FarmNumber[city]]['enabled']) check=0;
	       	if (now < (parseInt(t.FarmArray[city][FarmOptions.FarmNumber[city]]['time']) + (3600 * interval))) check=0;
	       	if (check ==0) FarmOptions.FarmNumber[city]++;
	       	if (FarmOptions.FarmNumber[city]>=t.FarmArray[city].length) {
               	FarmOptions.FarmNumber[city]=0;
                break;
	        }
       	}
        if (check == 0) return;
        var xcoord = t.FarmArray[city][FarmOptions.FarmNumber[city]]['x'];
        var ycoord = t.FarmArray[city][FarmOptions.FarmNumber[city]]['y'];
        var uid = t.FarmArray[city][FarmOptions.FarmNumber[city]]['UserId'];
        saveFarmOptions();
        t.checkInactives(cityID,city,FarmOptions.FarmNumber[city],xcoord,ycoord,uid,u1,u2,u3,u4,u5,u6,u7,u8,u9,u10,u11,u12);
  	},

	checkInactives : function (citynumber,city,FarmNumber,xcoord,ycoord,uid,u1,u2,u3,u4,u5,u6,u7,u8,u9,u10,u11,u12){
	    var t = Tabs.farm;
	    var now = new Date().getTime()/1000.0;
	    var hours = (now - t.FarmArray[city][FarmOptions.FarmNumber[city]]['LastCheck']) / 3600;
	    if (t.FarmArray[city][FarmOptions.FarmNumber[city]]['DaysInactive'] == "?" || hours > 6){
            var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
            params.pid = uid;
            RPM++;
            new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/viewCourt.php" + unsafeWindow.g_ajaxsuffix, {
                 method: "post",
                  parameters: params,
                  onSuccess: function (transport) {
                        var rslt = eval("(" + transport.responseText + ")");
                        var lastLogin = rslt.playerInfo.lastLogin;
                        var fullDate = lastLogin.substr(0,4) +", "+ lastLogin.substr(5,2) +", "+ lastLogin.substr(8,2) ;
                        var time = new Date (fullDate).getTime()/1000;
                        var days = Math.floor((now - time) / 86400);
                        t.FarmArray[city][FarmOptions.FarmNumber[city]]['DaysInactive'] = days;
                        for (i=0;i<t.helpArray[city].length;i++){
                            if (xcoord == parseInt(t.helpArray[city][i]['x']) && ycoord == parseInt(t.helpArray[city][i]['y'])){
                                t.helpArray[city][i]['DaysInactive'] = days;
                                t.helpArray[city][i]['LastCheck'] = now;
                            }    
                        }
                        GM_setValue('Farms_' + Seed.player['name'] + '_city_' + city + '_' + getServerId(), JSON2.stringify(t.helpArray[city]));
                        if (days > FarmOptions.Inactive) {
                            t.doBarb(citynumber,city,FarmNumber,xcoord,ycoord,u1,u2,u3,u4,u5,u6,u7,u8,u9,u10,u11,u12);
                        } else {
                            FarmOptions.FarmNumber[city]++;
                            saveFarmOptions();
                        }
                   },
                  onFailure: function (rslt) {},
            });
	    } else {
	        if (t.FarmArray[city][FarmOptions.FarmNumber[city]]['DaysInactive'] > FarmOptions.Inactive) t.doBarb(citynumber,city,FarmNumber,xcoord,ycoord,u1,u2,u3,u4,u5,u6,u7,u8,u9,u10,u11,u12);
	         else{
                FarmOptions.FarmNumber[city]++;
                saveFarmOptions();
	        }
	    }
	},
    
  	doBarb: function(cityID,counter,number,xcoord,ycoord,u1,u2,u3,u4,u5,u6,u7,u8,u9,u10,u11,u12){
        var t = Tabs.farm;
        MarchQueue[counter].push ({
    		what: 			"Attack",
			city: 			cityID,
			action: 		4,
			targetX: 		xcoord,
			targetY: 		ycoord,
			1: 				u1,
			2: 				u2,
			3: 				u3,
			4: 				u4,
			5: 				u5,
			6: 				u6,
			7: 				u7,
			8: 				u8,
			9: 				u9,
			10: 			u10,
			11: 			u11,
			12: 			u12,
			13: 			0,
			14: 			0,
			15: 			0,
        });
		var now = new Date().getTime()/1000.0;
		now = now.toFixed(0);
		t.FarmArray[counter][number]['time'] = now;
		t.FarmArray[counter][number]['attacked']++;
		FarmOptions.FarmNumber[counter]++;
		FarmOptions.Attacks++;	
		document.getElementById('FarmCheck').innerHTML = "Attacks: " + FarmOptions.Attacks + " - Checks:" + FarmOptions.Checks;
		for (i=0;i<t.helpArray[counter].length;i++){
		    for (j=0;j<t.FarmArray[counter].length;j++){
		         if (parseInt(t.FarmArray[counter][j]['x']) == parseInt(t.helpArray[counter][i]['x']) && parseInt(t.FarmArray[counter][j]['y']) == parseInt(t.helpArray[counter][i]['y'])){
		                   t.helpArray[counter][i]['time'] = t.FarmArray[counter][j]['time'];
		                   t.helpArray[counter][i]['attacked'] = t.FarmArray[counter][j]['attacked'];
		               }    
		    }
		}
		GM_setValue('Farms_' + Seed.player['name'] + '_city_' + counter + '_' + getServerId(), JSON2.stringify(t.helpArray[counter]));  
		saveFarmOptions();
  },

  hide : function (){},
  show : function (){},

};


/*********************************** Throne Tab ***********************************/

Tabs.Throne = {
  tabOrder : 590,
  tabLabel : 'Throne',
  cont : null,
  curTabBut : null,
  curTabName : null,
  SelId:null,
  log:[],
  SalvageLog:[],
  setRepairTimer:null,
  setActionTimer:null,
  SalvageArray:[],
  SalvageRunning:false,
  LastDeleted:0,
  MaxRows:30,
  CompPos:0,
  CardTypes:["ALL","Attack","Defense","Life","Speed","Accuracy","Range","Load","MarchSize","MarchSpeed","CombatSkill","IntelligenceSkill","PoliticsSkill","ResourcefulnessSkill","TrainingSpeed","ConstructionSpeed","ResearchSpeed","CraftingSpeed","Upkeep","ResourceProduction","ResourceCap","Storehouse","Morale","ItemDrop"],
  EquipType: ["ALL","Advisor","Banner","Chair","Candelabrum","Table","Trophy","Windows"],
  Faction: ["ALL","Briton","Fey","Druid"],
  Quality: ["ALL","Common","Uncommon","Rare","Epic","Wondrous"],
  StatEffects: [],

  init : function (div){
    var t = Tabs.Throne;
    t.cont = div;
    unsafeWindow.setFAV = t.setSalvageFAV;
    unsafeWindow.Savlage = t.setSalvageItem;
    unsafeWindow.ActionPopup = t.ActionPopup;

    var a = JSON2.parse(GM_getValue ('ThroneHistory_'+getServerId(), '[]'));
    if (matTypeof(a) == 'array') t.log = a;
    var a = JSON2.parse(GM_getValue ('ThroneSalvageHistory_'+getServerId(), '[]'));
    if (matTypeof(a) == 'array') t.SalvageLog = a;

    var main = '<TABLE class=pbTab><TR><TD><INPUT class=pbSubtab ID=ptmrchSubSal type=submit value="Salvage"></td>';
    main +='<TD><INPUT class=pbSubtab ID=ptmrchSubUE type=submit value="Upgrade"></td>';
	main +='<TD><INPUT class=pbSubtab ID=ptmrchSubEQ type=submit value="Compare"></td>';
	main +='<TD><INPUT class=pbSubtab ID=ptmrchSubPR type=submit value="Preset"></td>';
	main +='<TD><INPUT class=pbSubtab ID=ptmrchSubST type=submit value="Stats"></td>';
	main +='<TD><input class=pbSubtab ID=ptmrchSubTC type=submit value="Caps"></TD></tr></table>';
    main +='<DIV id=ThroneOutput style="margin-top:10px; background-color:white; height:680px; overflow:auto;"></div>';

    t.cont.innerHTML = main;
    t.Overv = document.getElementById('ThroneOutput');   
    document.getElementById('ptmrchSubSal').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubUE').addEventListener('click', e_butSubtab, false);
	document.getElementById('ptmrchSubEQ').addEventListener('click', e_butSubtab, false);
	document.getElementById('ptmrchSubPR').addEventListener('click', e_butSubtab, false);
	document.getElementById('ptmrchSubST').addEventListener('click', e_butSubtab, false);
	document.getElementById('ptmrchSubTC').addEventListener('click', e_butSubtab, false);
	for (i=1;i<=7;i++) for (j=1;j<t.EquipType.length;j++) if (unsafeWindow.kocThroneItems[ThroneOptions.Presets[i][t.EquipType[j].toLowerCase()]] == undefined) ThroneOptions.Presets[i][t.EquipType[j].toLowerCase()] = 0;   
    changeSubtab (document.getElementById('ptmrchSubUE'));
	changeSubtab (document.getElementById('ptmrchSubEQ'));
    
    function e_butSubtab (evt){changeSubtab (evt.target);}
    function changeSubtab (but){
      	var t = Tabs.Throne;
      	clearInterval(t.timer);
      	if (but == t.curTabBut) return;
      	if (t.curTabBut){
        	t.curTabBut.className='pbSubtab'; 
        	t.curTabBut.disabled=false;
      	}
      	t.curTabBut = but;
      	but.className='pbSubtab pbSubtabSel'; 
      	but.disabled=true;
      	t.curTabName = but.id.substr(9);
      	t.show ();
    }
    t.checkUpgradeInfo(true);
 },

 saveSalvageOptions : function(){
		for (k in unsafeWindow.cm.thronestats.effects) {
			var ele = document.getElementById('pbThroneItems'+k);
			ThroneOptions.Salvage[k]=ele.checked;
		}		
		saveThroneOptions();
   },
    
 Salvage : function (){ 
    var t = Tabs.Throne; 
    try {      
      m = '<DIV id=pbTowrtDivF class=pbStat>AUTOMATED SALVAGE FUNCTION</div><TABLE id=pbbarbingfunctions width=100% class=pbTab>';
	  m+='<TR><TD><INPUT type=submit id=pbsalvage_run value="Auto Salvage = '+(Options.ThroneDeleteItems?'ON':'OFF')+'" /></td><TD><INPUT id=ShowSalvageHistory type=submit value="History"></td><TD>Keep items with more than <INPUT type=text id=pbthrone_keep size=3 value="'+ThroneOptions.thronekeep+'" /> stats checked.</td></tr>';
	  m+='<TD>Keep first <INPUT type=text id=saveXitems size=2 maxlength=2 value='+ ThroneOptions.saveXitems +'> items.</td><TD><FONT color=red>Check boxes for items you want to <b>KEEP</b>.</font></td></table>';   
      m+='<TABLE id=pbbarbingfunctions width=80% class=pbTab>';
      for (k in unsafeWindow.cm.thronestats.effects) {
      	m += '<TR><TD><A onclick="setFAV('+ k +')"><DIV class=pbSalvage_fav id=SalvageFAV'+k+'></div></td>';
      	m += '<TD class=pbThrone1>Slot: <SELECT class=pbSalvage_slot id="slot'+k+'" type=list></select></td><TD class=pbThrone2>Type: <SELECT class=pbSalvage_Type id="Type'+k+'" type=list></select></td><TD class=pbThrone><INPUT id=pbThroneItems'+k+' type=checkbox checked=true>'+ unsafeWindow.cm.thronestats.effects[k][1] +'</td><TD>'+ unsafeWindow.cm.thronestats.effects[k][3]+'</td><TD>'+ unsafeWindow.cm.thronestats.effects[k][2]+'</td></tr>';
      }	
      m+= '</table>';

    t.Overv.innerHTML = m;

    for (k in unsafeWindow.cm.thronestats.effects){
    	var id = "slot" + k; 
	    document.getElementById(id).options.length=0;
		for (i=1;i<=5;i++){
				var o = document.createElement("option");			
				if (i<5) o.text = i+"+";
				else o.text = i;
				o.value = i;
				document.getElementById(id).options.add(o);
		}	
	}
	for (k in unsafeWindow.cm.thronestats.effects){
    	var id = "Type" + k; 
	    document.getElementById(id).options.length=0;
		for (i in t.EquipType){
				var y = t.EquipType[i];
				if (typeof(y) == "string") {
					if (y == "Windows") y = "Window";
					what = y.toLowerCase();
					if (y == "Chair") y = "Throne";
					var o = document.createElement("option");	
					o.text = y;
					o.value = what;
					document.getElementById(id).options.add(o);
			}
		}	
	}
    $("pbsalvage_run").addEventListener('click', t.ToggleSalvageState,false);
      if (ThroneOptions.Salvage[1] != undefined){
		  for (k in unsafeWindow.cm.thronestats.effects){
				document.getElementById('pbThroneItems'+k).checked = ThroneOptions.Salvage[k]; 
			}
	  }
	  if (ThroneOptions.Salvage_fav[1] == undefined){
	  		for (k in unsafeWindow.cm.thronestats.effects){
				ThroneOptions.Salvage_fav[k] = false;
			}
	  } 
	if (ThroneOptions.Salvage_fav[1] != undefined) {
	  		for (k in unsafeWindow.cm.thronestats.effects){
				if (ThroneOptions.Salvage_fav[k]) document.getElementById('SalvageFAV'+k).innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6lJREFUeNq0VdtLFFEc/mZmXfO2FnaxC8XGhmFZRjeCgiDqJXoIeqkoCIQICnos7Km/oKinQAgCX3qIHoIg6ClQhMguCJa6XrKsLTPNdtu5nL7fnDPuaqv71GG+OTNzzvl+999Y6vVq/DMswubN4VxBfAqAnLoMhVYE6jo2OBk4XPcVsP0Llhox+CXIraLnGZJMqwOwcSf85iOOr8F5rKH0wEK5YYebIqhotvWz4CsFeGhH9XJg514KsM5gGk3IFWuylACfZIFTgJLZ1kJ+k+AndiNvHcemJiDPb3aVA9e6hozS+8oKkMuytM9Dv9vaiiwxoUTjdlTWkhwaTdtl/RxmkMJsWX7GIMt7lkH0hAx65oUg9HcLcRKpZpIrfUIUsCsd+Pl2jPsXylvwiaw/ldbYjfxvb6SWB6n9LcRrJAZci8A9zTvEsnOM0VE8XJdaSoClHqzbB6VO0T1JxiwZpqJigkoK1tYDyS20RmnApG+MGElTse8I01XHuo/nxrkvTYVeYKXTiRNjvqUeb/yN76hCXQJIEKtW6tAIoa/mk4cqGUInipm8cH1ykinNoExNA/EcuZyLOD58L8YMmUBdLInGzZowDFygyZSBMKqi2pirl7kNFMQ0TtDihhVMjgG6nNaEqrrWEbj+KD72ac2zSqoW+GOyxjWx8Qyid1mTPbJXzsh7QO3GBmX9Ck4NPzEC7DRxCPlgAMPvqAl7g2treGUQCuMsteSRfHxE3i/idPpuIYukePL2KHGIB/rw7pU5WKT9YsibefIHyUeFpw3nB+/NT9PCgQniMNO1F0NjBZeUg9RH/4jPsxfQ9qHj3zrw5mmVoT9v4PM344Yy5OKaAbolh0e49P5+6Ur2rELGyMixkflR08P8NSzIJBk1zJzMVGqJZsfm5psm54eBa0F1AqEQz8TCMwi/mYr2jBL1DVL5zbi5NV5aQHjQEOTD1tyMBHPZVYX+VBED1lLTtWx6Ncs0sazJHsvR/4hs0FTaRW6RvTmakacA6f3yPc7DDexF75m+/TOyQ1pjFfbtZ5ugGbN/tPukBmzVwvvb0j+cyAKbFR1zalFdTeI6lj5/hz3dLP9fz7lvD7GBuI3uniz63wCNtKqqkhbSO/FY6yIuijIi/IMlUc8DPovmZQ/wOdPL78eII8RLYpK4SmyBG3Sgq9vHcD+QWi9uTC3yyzStR6OLeIrBoV7OZ4ldxLMFewTsmmgjtmE224mJL2k+d5Ru10rhfw4b/3n8FWAAwna8wfz7wJUAAAAASUVORK5CYII="/>';
					else document.getElementById('SalvageFAV'+k).innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAADAFBMVEX////4+Pj7+/v39/f5+fn6+vr29vby8vL09PTz8/P+/v78/Pzd3d3Nzc3v7++tra3r6+v9/f3n5+fs7Ozt7e24uLjQ0NDx8fHV1dXo6OjJycnl5eXc3NyoqKje3t7Hx8fS0tK+vr66urrZ2dnw8PDMzMzq6urFxcW5ubnk5OTj4+Pi4uLR0dGwsLDBwcG1tbXb29vLy8vu7u7Dw8P19fXKysrY2Ni3t7ekpKSrq6u0tLTh4eHm5ubW1tanp6eenp7p6emsrKyurq7a2trCwsLPz8/AwMC9vb28vLzf39+zs7PT09PX19f///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADUISnwAAABI0lEQVR4nG2Rh26DMBCGzzmwCXuHBLL33t1tujfv/zqFhjhRyydZ8t0n6+6XIeZEXXIsYuA3R+1sc8UWQC3lCLcGQJY5okIBoM3+CT15AIDaH7Exb0kqICxLB+FMvtof9kqEPcXe9VPg1+QY5r2sJ8tyJgt65TuGxzIqaduyFMWyUqcIrK7F0BzYlAgFjkBIyb80Y6Bv5zeUiKf9F2OcboWv8+GGiBmIumaM9usKM+8ehQzKGsbwkEPwIiQZaHrhMWBfJYg0ARHd1knylk2o9AsltG+dCFcqJrDkSOibXMjNFWP6aLJcOIyxoMGFXmGdUDM+B9WZ6rLonYvF89ifTrsl8cyrrtXA4KK8qz7UnbQiwdXdRZMLRavbh/+RGuvj8Fx+AKn1YdcNFlXFAAAAAElFTkSuQmCC" />';
			}
	}

	if (ThroneOptions.Salvage_slots[1] == undefined){
	  		for (k in unsafeWindow.cm.thronestats.effects){
				ThroneOptions.Salvage_slots[k] = 1;
			}
	} else {
	  		for (k in unsafeWindow.cm.thronestats.effects){
				 document.getElementById('slot'+k).value = ThroneOptions.Salvage_slots[k];
				 if (!document.getElementById('pbThroneItems'+k).checked) document.getElementById('slot'+k).disabled = true;
			}
	}

	if (ThroneOptions.Salvage_Type[1] == undefined){
	  		for (k in unsafeWindow.cm.thronestats.effects){
				ThroneOptions.Salvage_Type[k] = "ALL";
			}
	} else {
	  		for (k in unsafeWindow.cm.thronestats.effects){
				 document.getElementById('Type'+k).value = ThroneOptions.Salvage_Type[k];
				 if (!document.getElementById('pbThroneItems'+k).checked) document.getElementById('Type'+k).disabled = true;
			}
	}


    var element_class = document.getElementsByClassName('pbThrone');
    for (k=0;k<element_class.length;k++){
    	element_class[k].addEventListener('click', function(){
    		for (k in unsafeWindow.cm.thronestats.effects){
				if (!document.getElementById('pbThroneItems'+k).checked) document.getElementById('slot'+k).disabled = true;	
				else  document.getElementById('slot'+k).disabled = false;
				if (!document.getElementById('pbThroneItems'+k).checked) document.getElementById('Type'+k).disabled = true;	
				else  document.getElementById('Type'+k).disabled = false;
			}
    		t.saveSalvageOptions();
    	} , false);
    }

    var element_class = document.getElementsByClassName('pbThrone1');
    for (k=0;k<element_class.length;k++){
    	element_class[k].addEventListener('change', function(){
    		for (k in unsafeWindow.cm.thronestats.effects){
				ThroneOptions.Salvage_slots[k] = parseInt(document.getElementById('slot'+k).value);
			}
    		t.saveSalvageOptions();
    	} , false);
    }

    var element_class = document.getElementsByClassName('pbThrone2');
    for (k=0;k<element_class.length;k++){
    	element_class[k].addEventListener('change', function(){
    		for (k in unsafeWindow.cm.thronestats.effects){
				ThroneOptions.Salvage_Type[k] = document.getElementById('Type'+k).value;
			}
    		t.saveSalvageOptions();
    	} , false);
    }

    t.saveSalvageOptions();
      
    document.getElementById('pbthrone_keep').addEventListener ('change', function(){ThroneOptions.thronekeep = parseInt(document.getElementById('pbthrone_keep').value);saveThroneOptions();},false);
    document.getElementById('saveXitems').addEventListener('change', function(){ThroneOptions.saveXitems = document.getElementById('saveXitems').value;saveThroneOptions();} , false);
    document.getElementById('ShowSalvageHistory').addEventListener('click', function(){t.PaintSalvageHistory()} , false);
      
    } catch (e) {
      t.Overv.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }
  },
 
setSalvageFAV :function (what){
	 var t = Tabs.Throne;  
	 if (ThroneOptions.Salvage_fav[what]) ThroneOptions.Salvage_fav[what] = false;
	 	else  ThroneOptions.Salvage_fav[what] = true;
	 for (k in unsafeWindow.cm.thronestats.effects){
				if (ThroneOptions.Salvage_fav[k]) document.getElementById('SalvageFAV'+k).innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6lJREFUeNq0VdtLFFEc/mZmXfO2FnaxC8XGhmFZRjeCgiDqJXoIeqkoCIQICnos7Km/oKinQAgCX3qIHoIg6ClQhMguCJa6XrKsLTPNdtu5nL7fnDPuaqv71GG+OTNzzvl+999Y6vVq/DMswubN4VxBfAqAnLoMhVYE6jo2OBk4XPcVsP0Llhox+CXIraLnGZJMqwOwcSf85iOOr8F5rKH0wEK5YYebIqhotvWz4CsFeGhH9XJg514KsM5gGk3IFWuylACfZIFTgJLZ1kJ+k+AndiNvHcemJiDPb3aVA9e6hozS+8oKkMuytM9Dv9vaiiwxoUTjdlTWkhwaTdtl/RxmkMJsWX7GIMt7lkH0hAx65oUg9HcLcRKpZpIrfUIUsCsd+Pl2jPsXylvwiaw/ldbYjfxvb6SWB6n9LcRrJAZci8A9zTvEsnOM0VE8XJdaSoClHqzbB6VO0T1JxiwZpqJigkoK1tYDyS20RmnApG+MGElTse8I01XHuo/nxrkvTYVeYKXTiRNjvqUeb/yN76hCXQJIEKtW6tAIoa/mk4cqGUInipm8cH1ykinNoExNA/EcuZyLOD58L8YMmUBdLInGzZowDFygyZSBMKqi2pirl7kNFMQ0TtDihhVMjgG6nNaEqrrWEbj+KD72ac2zSqoW+GOyxjWx8Qyid1mTPbJXzsh7QO3GBmX9Ck4NPzEC7DRxCPlgAMPvqAl7g2treGUQCuMsteSRfHxE3i/idPpuIYukePL2KHGIB/rw7pU5WKT9YsibefIHyUeFpw3nB+/NT9PCgQniMNO1F0NjBZeUg9RH/4jPsxfQ9qHj3zrw5mmVoT9v4PM344Yy5OKaAbolh0e49P5+6Ur2rELGyMixkflR08P8NSzIJBk1zJzMVGqJZsfm5psm54eBa0F1AqEQz8TCMwi/mYr2jBL1DVL5zbi5NV5aQHjQEOTD1tyMBHPZVYX+VBED1lLTtWx6Ncs0sazJHsvR/4hs0FTaRW6RvTmakacA6f3yPc7DDexF75m+/TOyQ1pjFfbtZ5ugGbN/tPukBmzVwvvb0j+cyAKbFR1zalFdTeI6lj5/hz3dLP9fz7lvD7GBuI3uniz63wCNtKqqkhbSO/FY6yIuijIi/IMlUc8DPovmZQ/wOdPL78eII8RLYpK4SmyBG3Sgq9vHcD+QWi9uTC3yyzStR6OLeIrBoV7OZ4ldxLMFewTsmmgjtmE224mJL2k+d5Ru10rhfw4b/3n8FWAAwna8wfz7wJUAAAAASUVORK5CYII="/>';
					else document.getElementById('SalvageFAV'+k).innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAADAFBMVEX////4+Pj7+/v39/f5+fn6+vr29vby8vL09PTz8/P+/v78/Pzd3d3Nzc3v7++tra3r6+v9/f3n5+fs7Ozt7e24uLjQ0NDx8fHV1dXo6OjJycnl5eXc3NyoqKje3t7Hx8fS0tK+vr66urrZ2dnw8PDMzMzq6urFxcW5ubnk5OTj4+Pi4uLR0dGwsLDBwcG1tbXb29vLy8vu7u7Dw8P19fXKysrY2Ni3t7ekpKSrq6u0tLTh4eHm5ubW1tanp6eenp7p6emsrKyurq7a2trCwsLPz8/AwMC9vb28vLzf39+zs7PT09PX19f///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADUISnwAAABI0lEQVR4nG2Rh26DMBCGzzmwCXuHBLL33t1tujfv/zqFhjhRyydZ8t0n6+6XIeZEXXIsYuA3R+1sc8UWQC3lCLcGQJY5okIBoM3+CT15AIDaH7Exb0kqICxLB+FMvtof9kqEPcXe9VPg1+QY5r2sJ8tyJgt65TuGxzIqaduyFMWyUqcIrK7F0BzYlAgFjkBIyb80Y6Bv5zeUiKf9F2OcboWv8+GGiBmIumaM9usKM+8ehQzKGsbwkEPwIiQZaHrhMWBfJYg0ARHd1knylk2o9AsltG+dCFcqJrDkSOibXMjNFWP6aLJcOIyxoMGFXmGdUDM+B9WZ6rLonYvF89ifTrsl8cyrrtXA4KK8qz7UnbQiwdXdRZMLRavbh/+RGuvj8Fx+AKn1YdcNFlXFAAAAAElFTkSuQmCC" />';
	}
	t.saveSalvageOptions();
},

ToggleSalvageState :function (what){
	 var t = Tabs.Throne; 
	 	if(Options.ThroneDeleteItems){
			if (document.getElementById('pbsalvage_run')) document.getElementById('pbsalvage_run').value = "Auto Salvage = OFF";
        	if (document.getElementById('AutoSalvageToggle')) document.getElementById('AutoSalvageToggle').value = "Auto Salvage = OFF";
			Options.ThroneDeleteItems = false;
			saveOptions();
		} else {
			if (document.getElementById('pbsalvage_run')) document.getElementById('pbsalvage_run').value = "Auto Salvage = ON";
        	if (document.getElementById('AutoSalvageToggle')) document.getElementById('AutoSalvageToggle').value = "Auto Salvage = ON";
			Options.ThroneDeleteItems = true;
			saveOptions();
		} 	 
},


setSalvageItem :function (what){
	var t = Tabs.Throne;  
	var answer = confirm ("Are you sure you want to delete: " + unsafeWindow.kocThroneItems[what].name);
	if (answer) {
		var cityid = 0;
		for (var k in Cities.byID) {
				if (Seed.resources["city"+k]["rec5"][0] < 1000000)
				{
				   cityid = k;
				   break;
				}
		}
		if (cityid == 0) cityid = Seed.cities[0][0];
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
		params.action = 'salvage';
		params.itemId = what;
		params.cityId = cityid;
		RPM++;
	      	new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				loading: true,
				onSuccess: function (transport) {
					var rslt = eval("(" + transport.responseText + ")");
					if(rslt.ok) {
						unsafeWindow.kocThroneItems[params.itemId].salvage();
						t.FillEquipCheckboxes();
					}
				},
				onFailure: function () {
						return;
				},
			});
	}
},


Upgrade_Enhance :function (){
    var t = Tabs.Throne;  
    try {      
      var m = '<DIV id=pbTowrtDivF class=pbStat>AUTOMATED UPGRADE/ENHANCE/REPAIR FUNCTION</div><TABLE id=pbbarbingfunctions width=100% height=0% class=pbTab><TR align="center">';
	       if (ThroneOptions.Active == false) {
	             m += '<TD><INPUT id=Enable type=submit value="Queue = OFF"></td>';
	       } else {
	            m += '<TD><INPUT id=Enable type=submit value="Queue = ON"></td>';
	      }
      m+= '<TD><INPUT id=ShowHistory type=submit value="History"></td>';
      m+= '</table><DIV id=pbTowrtDivF class=pbStat>OPTIONS</div>';
	  m+= '<BR><INPUT id=pbUseTokens type=checkbox '+ (ThroneOptions.UseTokens?'CHECKED ':'') +'/>&nbsp;Use Tokens/Stones when available, from and above -> Quality: ';
	  m+= '<SELECT id="pbLPSlevel">';
	  for (var i=0;i<t.Quality.length-1;i++)  m+='<OPTION value='+i+' >'+t.Quality[i]+'</option>';
	  m+= '</select> - Level: <SELECT id="pbLLTlevel">';	
	  for (var i=1;i<=10;i++)  m+='<OPTION value='+i+' >'+i+'</option>';
	  m+= '</select><BR>To add cards to queue: Go to compare, click the card title and select action...';
	  m+= '<BR><BR><TABLE class=ptTab align=center><TD><INPUT id=allEnhance type=submit value="Enhance All Cards One Level"></td><TD><INPUT id=allUpgrade type=submit value="Upgrade All Cards One Level"></td></table>';
	  m+= '<DIV id=pbTowrtDivF class=pbStat>STATUS</div>';
	  m+= '<br/><DIV id=ShowStatus></div></p>';
	  m+= '<DIV id=ShowTries></div><br/>';
	  m+= '<DIV id=ShowStones></div><br/>';
      m+= '<DIV id=pbTowrtDivF class=pbStat>QUEUE</div>';
	  m+= '<br/><DIV id=ShowQueueDiv></div>';
	  t.Overv.innerHTML = m;
      
	document.getElementById('allEnhance').addEventListener ('click', function (){
		var counter=0;
		for (k in unsafeWindow.kocThroneItems) {
			counter++;
			ActiveItems = parseInt(Seed.throne.rowNum)*5;
			if (counter > ActiveItems) break;
			y = unsafeWindow.kocThroneItems[k];
			if (y.quality <=4) t.addToQueue(y.id,"Enhance");	
		}		
	},false);
	document.getElementById('allUpgrade').addEventListener ('click', function (){
		var counter=0;
		for (k in unsafeWindow.kocThroneItems) {
			counter++;
			ActiveItems = parseInt(Seed.throne.rowNum)*5;
			if (counter > ActiveItems) break;
			y = unsafeWindow.kocThroneItems[k];
			if (y.level <=9) t.addToQueue(y.id,"Upgrade");	
		}		
	},false);

	document.getElementById('pbLLTlevel').value = ThroneOptions.LLTlevel;
	document.getElementById('pbLPSlevel').value = ThroneOptions.LPSlevel;
  	document.getElementById('pbUseTokens').addEventListener('change', function(){ThroneOptions.UseTokens = document.getElementById('pbUseTokens').checked;saveThroneOptions();} , false);
  	document.getElementById('pbLLTlevel').addEventListener('change', function(){ThroneOptions.LLTlevel = document.getElementById('pbLLTlevel').value;saveThroneOptions();} , false);
  	document.getElementById('pbLPSlevel').addEventListener('change', function(){ThroneOptions.LPSlevel = document.getElementById('pbLPSlevel').value;saveThroneOptions();} , false);
  	document.getElementById('Enable').addEventListener('click', function(){t.toggleThroneState()} , false);
  	document.getElementById('ShowHistory').addEventListener('click', function(){t.PaintHistory()} , false);
  
	if (ThroneOptions.Items.length ==0) t.UpdateShowStatus("No items in queue!!");
	else {
      if (ThroneOptions.Active && Seed.queue_throne.end == undefined) t.UpdateShowStatus("Waiting for timer...");
      if (ThroneOptions.Active && Seed.queue_throne.end != undefined) t.setRepairTimer = setInterval (t.repairTimerUpdate,1000);
      if (!ThroneOptions.Active && Seed.queue_throne.end != undefined) t.setRepairTimer = setInterval (t.repairTimerUpdate,1000); 
      if (!ThroneOptions.Active && Seed.queue_throne.end == undefined) t.UpdateShowStatus("Auto Upgrade/Enhance/Repair is OFF.");
    } 
        
	if (ThroneOptions.Tries > 0) t.UpdateShowTries("Tries: " + ThroneOptions.Tries + "<br />Good requests: " + ThroneOptions.Good + "   Bad requests: " + ThroneOptions.Bad);
		else t.UpdateShowTries("Tries: --");
   	
	if (ThroneOptions.Items.length>0) {t.paintStones();t.PaintQueue();}
    
  } catch (e) {
      t.Overv.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }
  t.timer = setInterval(t.paintStones,2500);
},

UpdateShowStatus : function (msg){
	if (document.getElementById('ShowStatus') != null) document.getElementById('ShowStatus').innerHTML = msg;
	if (document.getElementById('UpgradeStatus') != null) document.getElementById('UpgradeStatus').innerHTML = msg;

},

UpdateShowTries: function (msg){
	if (document.getElementById('ShowTries') != null) document.getElementById('ShowTries').innerHTML = msg;
	if (document.getElementById('TriesStatus') != null) document.getElementById('TriesStatus').innerHTML = msg;

},

Compare :function (){
    var t = Tabs.Throne;  
    var amount = 0;
    var AdvisorCount =0;
    var BannerCount = 0;
    var ChairCount = 0;
    var TableCount = 0;
    var TrophyCount = 0;
    var WindowCount = 0;
    var counter = 0;
    ActiveItems = parseInt(Seed.throne.rowNum)*5;

    for (k in unsafeWindow.kocThroneItems){
		counter++;
		if (counter > ActiveItems) break;
		z = unsafeWindow.kocThroneItems[k];
		if (z.type=="advisor") AdvisorCount++;
		if (z.type=="banner") BannerCount++;
		if (z.type=="chair") ChairCount++;
		if (z.type=="trophy") TrophyCount++;
		if (z.type=="table") TableCount++;
		if (z.type=="window") WindowCount++;
	}	

    try {   
     var m = '<DIV id=pbTowrtDivF class=pbStat>Compare Throne Items</div><br><TABLE id=pbCompareStats width=100% height=0% class=pbTab>';

     m+='<TD>Advisor: ' + AdvisorCount + '</td><TD>Banner: ' + BannerCount+ '</td><TD>Throne :' + ChairCount+ '</td><TD>Table: '+ TableCount+'</td><TD>Trophy: ' + TrophyCount + '</td><TD>Window: ' + WindowCount + '</td></table><br>';

     m+= '<DIV id=pbThroneMain class=pbStat>Compare Throne Items</div><br>';
     m+='<TABLE id=pbCompareStats width=100% height=0% class=pbTab><TD>Card Type: <SELECT id=type type=list></select></td><TD>Card quality: <SELECT id=CardQuality type=list></select></td><TD>Effect: <SELECT id=effect type=list></select></td></tr><TR><TD>Keyword: <INPUT type=text id=keyword size=10></td><TD><INPUT id=isEquipped type=checkbox unchecked=true> Equipped</td></tr></table>';

     m+='<br><TABLE id=pbbarbingfunctions width=100% height=0% class=pbTab><TR>';

     for (i=1;i<=ActiveItems;i++){
     	 m+='<TD><DIV id=DIV'+ i +'></div></td>';
     	 if (i%3==0) m+='</tr><TR></tr><TR>';
     }

     m+="</tr></table>"

    t.Overv.innerHTML = m;

	document.getElementById("type").options.length=0;
	for (k in t.EquipType){
		var y = t.EquipType[k];
		if (typeof(y) == "string") {
			if (y == "Windows") y = "Window";
			what = y.toLowerCase();
			if (y == "Chair") y = "Throne";
			var o = document.createElement("option");			
			o.text = y;
			o.value = what;
			document.getElementById("type").options.add(o);
		}		
	}	
	document.getElementById("CardQuality").options.length=0;
	for (i=0;i<=t.Quality.length;i++){
		var y = t.Quality[i];
		if (typeof(y) == "string") {
			var o = document.createElement("option");			
			o.text = y;
			o.value = i;
			document.getElementById("CardQuality").options.add(o);
		}		
	}	
	document.getElementById("effect").options.length=0;
	var o = document.createElement("option");			
	o.text = "ALL";
	o.value = "ALL";
	document.getElementById("effect").options.add(o);
	for (k in unsafeWindow.cm.thronestats.effects){
		var y = unsafeWindow.cm.thronestats.effects[k][1];
		if (typeof(y) == "string") {
			var o = document.createElement("option");			
			o.text = unsafeWindow.cm.thronestats.effects[k][1];
			o.value = k;
			document.getElementById("effect").options.add(o);
		}		
	}	

	document.getElementById("type").addEventListener ('change', t.FillEquipCheckboxes,false);
	document.getElementById("CardQuality").addEventListener ('change', t.FillEquipCheckboxes,false);
	document.getElementById("effect").addEventListener ('change', t.FillEquipCheckboxes,false);
	document.getElementById("keyword").addEventListener ('change', t.FillEquipCheckboxes,false);
	document.getElementById('keyword').addEventListener('keyup', t.FillEquipCheckboxes, false)
    document.getElementById("isEquipped").addEventListener ('change', t.FillEquipCheckboxes,false);  

	t.FillEquipCheckboxes();
    } catch (e) {
      t.Overv.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }
},

Preset :function (){
    var t = Tabs.Throne; 
    var what="";
    try {   
     	var m = '<DIV id=pbTowrtDivF class=pbStat>PRESETS</div><DIV id=PresetCont></div>';     	
    	t.Overv.innerHTML = m;
    	t.PaintPresets();	
    } catch (e) {
     	t.Overv.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }
},

Stats : function (){
    var t = Tabs.Throne; 
    var what="";
    try {   
     	var m = '<DIV id=pbTowrtDivF class=pbStat>STATS</div><TABLE id=pbCompareStats width=100% height=0% class=pbTab><BR>';     	
    	
    	for (k in unsafeWindow.cm.thronestats.effects) t.StatEffects[k] = 0;
    	for (k in unsafeWindow.kocThroneItems){
    		 y = unsafeWindow.kocThroneItems[k];
	    	 for (i=1;i<=5;i++) {
				   id = y["effects"]["slot"+i]["id"];
				   tier = parseInt(y["effects"]["slot"+i]["tier"]);
				   level = y["level"];
				   p = unsafeWindow.cm.thronestats.tiers[id][tier];
				   Current = p.base + ((level * level + level) * p.growth * 0.5);
				   if (y.isEquipped && i<=y["quality"]) t.StatEffects[id] += Current
			}
		}
		for (k=1;k<t.StatEffects.length;k++) if (t.StatEffects[k] != 0) m+='<TR><TD width="100px"></td><TD width="75px"><FONT color=black size=3><B>' + t.StatEffects[k] + "%</b></font></td><TD><FONT color=black size=3><B>" + unsafeWindow.cm.thronestats["effects"][k]["1"] + '</b></font></td></tr>';
		m +='</table>';
    	t.Overv.innerHTML = m;    	

    } catch (e) {
     	t.Overv.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }
},

Caps : function (){
	var t = Tabs.Throne;	
	m =  '<DIV class=pbStat><b>Throne Room Caps</b></div><BR><BR><TABLE border=2px align=center>';
    m += '<TR><TD width="150px"><B>Throne Card Effect</b></td><TD width="50px"><B>Buff</b></td><TD><B>Debuff</b></td><TD style="border:0;width:50px"></td><TD width="150px"><B>Throne Rooms Effect</b></td><TD width="50px"><B>Buff</b></td><TD width="50px"><B>Debuff</b></td></tr><TR>';
    var counter =0;
    for (k in unsafeWindow.cm.thronestats.boosts){
    	counter++
    	var boost = unsafeWindow.cm.thronestats.boosts[k]
    	m += '<TD>'+ boost.BoostName + '</td><TD>'+ boost.Max +'<SPAN id=maxPerc_'+k+'></div></td><TD>' + boost.Min + '<SPAN id=minPerc_'+k+'></div>';

    	if (counter % 2 == 0){
    		m += '<TR>';
    	}else {
    		m += '</td><TD style="border:0">';
    	}
    }
		t.Overv.innerHTML = m;
    for (k in unsafeWindow.cm.thronestats.boosts){
    	var boost = unsafeWindow.cm.thronestats.boosts[k]
    	if (boost.CapType == "percent"){
	   		document.getElementById('maxPerc_'+k).innerHTML = '%'
    		if (boost.Min != "none"){
    			document.getElementById('minPerc_'+k).innerHTML = '%'
    		}
    	}
    }
},


PaintPresets : function (){
    var t = Tabs.Throne;
    var m= '<TABLE id=pbCompareStats width=100% height=100% class=pbTab>';
     	
     	for (i=1;i<=8;i++) {
     		m+='<TR><TD>&nbsp</td></tr><TR><TD rowspan=7><a class="button20" id=Button'+i+'><span>'+i+'</span></a><INPUT type=text id=PresetName'+i+' size=20 value="'+ ThroneOptions.PresetName[i] +'"</td>';
     		for (j=1;j<t.EquipType.length;j++) {
     			what1 = t.EquipType[j];     			
     			id1 = ThroneOptions.Presets[i][what1.toLowerCase()];
     			if (what1 == "Chair") what1 = "Throne";
     			if (what1 == "Windows") what1 = "Window";
     			if (unsafeWindow.kocThroneItems[id1] != undefined) name1 = unsafeWindow.kocThroneItems[id1].name
     				else name1 = "";     			
     			if (j%2>0) m+='<TR>';
     			if (unsafeWindow.kocThroneItems[id1] != undefined && unsafeWindow.kocThroneItems[id1].isEquipped) m+='<TD>' + what1 + ': <B>' + name1 + '</b></td>';
     				else  m+='<TD>' + what1 + ': ' + name1 + '</td>';
     			if (j%2==0) m+='</tr>';
     		}
     		m+='</tr><TR><TD>&nbsp</td></tr>';
     	}
     	document.getElementById('PresetCont').innerHTML = m;

     	for (i=1;i<=8;i++) {
    		document.getElementById('PresetName'+i).addEventListener('change',function (){
    			for (j=1;j<=8;j++) ThroneOptions.PresetName[j] = document.getElementById('PresetName'+j).value;
    			saveThroneOptions();
    		},false);
    		document.getElementById('Button'+i).addEventListener('click',function (){
    			var what = this.id.substr(6);
    			t.EquipPreset(what);
    		},false);
    	}
    
},

EquipPreset : function (what){
    var t = Tabs.Throne;   
    var counter= 0;
    for (d=1;d<=6;d++) {
    	var type = t.EquipType[d].toLowerCase();
    	id = ThroneOptions.Presets[what][type];    	
    	if (unsafeWindow.kocThroneItems[id] != undefined && !unsafeWindow.kocThroneItems[id].isEquipped) {
    		counter++;
    		setTimeout(t.doEquip,(5250*(counter-1)),id,"Preset");
    	}
    }
	var msg="";
	if (document.getElementById("PresetCont") != undefined) document.getElementById("PresetCont").innerHTML= msg;
	if (document.getElementById("ShowTrPresets") != undefined) document.getElementById("ShowTrPresets").innerHTML= msg;
	time = Math.round(counter * 5.25);
	Tabs.AutoTrain.changeTime = time;
	for (c=0;c<=time;c++){
		msg = '<DIV align="center"><FONT size="10"><B>Time left is : ' + (time - c) + '</b></font></div>';
		setTimeout(t.TimeLeft,c*1000,msg);

	}  	    
	if (document.getElementById("PresetCont") != undefined) setTimeout(t.PaintPresets,time*1000);
	if (document.getElementById("ShowTrPresets") != undefined) {
		if (GlobalOptions.pbWideScreenStyle=="wide" || GlobalOptions.pbWideScreenStyle=="ultra") setTimeout(Tabs.Dashboard.ShowTrPresets,time*1000);
		else setTimeout(Tabs.Dashboard.ShowTrPresetsMini,time*1000);
	}
},

EquipKabamPreset : function (what){
    var t = Tabs.Throne;   
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
    params.action = 'setPreset';
    params.presetId = what;
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        loading: true,
        onSuccess: function (transport) {
            var rslt = eval("(" + transport.responseText + ")");
            if(rslt.ok){
				for (i=1;i<=Seed.throne.slotNum;i++) {
					if (params.presetId==i) document.getElementById('KabamPreset_'+i).disabled = true;
					 else document.getElementById('KabamPreset_'+i).disabled = false;
				} 
				if(document.getElementById('throneInventoryPreset'+params.presetId))
                  button = document.getElementById('throneInventoryPreset'+params.presetId);
               	else
                  button = '<li id="throneInventoryPreset' + params.presetId + '" class="selected">'+params.presetId+'</li>';
				unsafeWindow.cm.ThroneView.clickActivePreset(button);	
            }
            else alert("Failed to change throne room...\nTry Again!");
        },
        onFailure: function () {alert("Failed to change throne room...\nTry Again!");},
    });
},

togOpt : function (checkboxId, optionName, callOnChange){
    var t = Tabs.Throne;
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
    var t = Tabs.Throne;
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
  
toggleThroneState: function(){
	var t = Tabs.Throne;
	if (ThroneOptions.Active == true) {
		    ThroneOptions.Active = false;
		    document.getElementById('Enable').value = "Queue = OFF";
		    saveThroneOptions();
            clearTimeout(t.setActionTimer);
            if (Seed.queue_throne.end == undefined) t.UpdateShowStatus("Auto Upgrade/Enhance/Repair is OFF.");
	} else {
		    ThroneOptions.Active = true;
		    document.getElementById('Enable').value = "Queue = ON";
		    saveThroneOptions();
            t.UpdateShowStatus("Waiting for timer...");
	}
},

_addTab: function(id,name,qualityfrom,qualityto,levelfrom,levelto,action,active,cost){
	 	var t = Tabs.Throne;
	    var a="";
	    var b=""; 
	    switch (qualityfrom) {
        		case 0:a = unsafeWindow.g_js_strings.throneRoom.simple;break;
        		case 1:a = unsafeWindow.g_js_strings.throneRoom.common;break;
        		case 2:a = unsafeWindow.g_js_strings.throneRoom.uncommon;break;
       			case 3:a = unsafeWindow.g_js_strings.throneRoom.rare;break;
        		case 4:a = unsafeWindow.g_js_strings.throneRoom.epic;break;
        		case 5:a = unsafeWindow.g_js_strings.throneRoom.wondrous;break;
        		default:a = unsafeWindow.g_js_strings.throneRoom.simple;break;
        }
        switch (qualityto) {
        		case 0:b = unsafeWindow.g_js_strings.throneRoom.simple;break;
        		case 1:b = unsafeWindow.g_js_strings.throneRoom.common;break;
        		case 2:b = unsafeWindow.g_js_strings.throneRoom.uncommon;break;
       			case 3:b = unsafeWindow.g_js_strings.throneRoom.rare;break;
       			case 4:b = unsafeWindow.g_js_strings.throneRoom.epic;break;
        		case 5:b = unsafeWindow.g_js_strings.throneRoom.wondrous;break;
        		default:b = unsafeWindow.g_js_strings.throneRoom.simple;break;
        }
	     if (document.getElementById('ShowQueue') != null) {
	     	 var row = document.getElementById('ShowQueue').insertRow(0);
		     row.vAlign = 'top';
		     row.style.color = "black";	
		     if (active) row.style.color = "green";	 
		     row.insertCell(0).innerHTML = id+1;
			 row.insertCell(1).innerHTML = name;
		     if (action == "Enhance") {
					row.insertCell(2).innerHTML = a + " -> " + b;
		   	 		row.insertCell(3).innerHTML = levelfrom;
		     }
		     if (action == "Upgrade") {
					row.insertCell(2).innerHTML = a;
		   	 		row.insertCell(3).innerHTML = levelfrom + " -> " + levelto;
		     }
		     row.insertCell(4).innerHTML = action;
			 row.insertCell(5).innerHTML = cost;
		     row.insertCell(6).innerHTML = '<a class="button20" id="queueDelete_' + id + '"><span>Delete</span></a>';
		 }
         if (document.getElementById('queueDelete_' + id) != null) {
         	document.getElementById('queueDelete_' + id).addEventListener('click', function(){
	            if (ThroneOptions.Items[id].active ==true) ThroneOptions.Tries=0;
				if (ThroneOptions.Items.length ==0 && ThroneOptions.Active) t.UpdateShowStatus("No items in queue!!");
				if (!ThroneOptions.Active) t.UpdateShowStatus("Auto Upgrade/Enhance/Repair is OFF.");
				ThroneOptions.Items.splice (id,1);
				saveThroneOptions();
				t.checkUpgradeInfo(false);
	      		t.PaintQueue();
        	}, false);
        }
},
	
_addTabHeader: function() {
	if (document.getElementById('ShowQueue') != null) {
		 var t = Tabs.Throne;
	     var row = document.getElementById('ShowQueue').insertRow(0);
	     row.vAlign = 'top';
	     row.style.color = "black";
	     row.insertCell(0).innerHTML = "Id";
	     row.insertCell(1).innerHTML = "Name";
	     row.insertCell(2).innerHTML = "Quality";
	     row.insertCell(3).innerHTML = "Level";
	     row.insertCell(4).innerHTML = "Action";
		 row.insertCell(5).innerHTML = "Cost";
	     row.insertCell(6).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	}
},


FillEquipCheckboxes: function(){
	var t = Tabs.Throne;
	var qualityCheck=false;
	var typeCheck=false;
	var effectCheck=false;
	var keywordCheck=false; 
	var equippedCheck = false; 
	ActiveItems = parseInt(Seed.throne.rowNum)*5;
	for(i=1;i<=ActiveItems;i++) document.getElementById("DIV"+i).innerHTML="";
	counter = 0;
	t.CompPos=0;
	for (k in unsafeWindow.kocThroneItems){
		counter++;
		if (counter > ActiveItems) break;
		z = unsafeWindow.kocThroneItems[k];
		qualityCheck=false;
		typeCheck=false;
		effectCheck=false;
		keywordCheck=false;
		equippedCheck = false; 
		y = z.effects;
		if (z.type==document.getElementById("type").value || "all" == document.getElementById("type").value) typeCheck=true;
		if (z.quality >= document.getElementById("CardQuality").value || 0 == document.getElementById("CardQuality").value) qualityCheck = true;
		if (document.getElementById("isEquipped").checked && z.isEquipped) equippedCheck = true;
		if (!document.getElementById("isEquipped").checked) equippedCheck = true;

		for (i=1;i<=5;i++){
				if (y['slot'+i].id == document.getElementById("effect").value || "ALL" == document.getElementById("effect").value) effectCheck = true;
				var str = String(unsafeWindow.cm.thronestats['effects'][y['slot'+i].id][1]);
				if (str.search(new RegExp(String(document.getElementById("keyword").value), "i")) != -1 || document.getElementById("keyword").value=="") keywordCheck=true;
		}

		if (typeCheck && qualityCheck && effectCheck && keywordCheck && equippedCheck){
			t.CompPos++;
			t.paintEquipInfo(z.id,t.CompPos);
		}
	}	
},

doPreset : function (preset){
	var t = Tabs.Throne;
	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
	params.action = 'setPreset';
	params.presetId = preset;
	
	RPM++;			
  	new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
		method: "post",
		parameters: params,
		loading: true,
		onSuccess: function (transport) {
			var rslt = eval("(" + transport.responseText + ")");
				if(rslt.ok){
					button = '<li id="throneInventoryPreset' + preset + '" class="active">'+preset+'</li>';
					unsafeWindow.cm.ThroneView.clickActivePreset(button);
					t.FillEquipCheckboxes();
			   } 
		},
		onFailure: function () {
		   return;
		},
	});
		
},

paintEquipInfo : function (z,what){
		var t = Tabs.Throne;
		var m="";
		var color = "black";
		if (typeof(unsafeWindow.kocThroneItems[z]) == 'object') var y = unsafeWindow.kocThroneItems[z];
		else return;
		  var id =0;
		  var tier=0;
		  var Current=0;
		  var icon = 'http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/throne/icons/30/' + y.faction + '/' + y.faction + '_'+ y.type +'_normal_1_'+ y.quality+'.png';
		  if (y.isEquipped) m='<TABLE width=80% height=0% align="center" class=ThroneEQ style="background: transparent url('+icon +') bottom right no-repeat; background-color:#FFFFE3;">';
		  else m='<TABLE width=80% height=0% align="center" class=Throne style="background: transparent url('+icon +') bottom right no-repeat; background-color:#FFFFE3;">';
		  switch(parseInt(y["quality"])){
			case 1:color="grey";break;
			case 2:color="white";break;
			case 3:color="green";break;
			case 4:color="blue";break;
			case 5:color="purple";break;
			default:break;
		  }

   		 m+='<TR><TD style="background-color:#D5C795"><A onclick="ActionPopup('+ y.id +')"><FONT color='+ color +'><B>' + y.name + '</b></font></td>';
		  m+= '<TD><A onclick="Savlage('+ y.id +')"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAstJREFUeNpskstrXWUUxX/7e9zHuadpbwbR0yagZKAIPmga0kEToUELKVVJrBMHBSUDQTuQ/geCCA6ETGt0EFCqkpKmLRaSNlUKgRKvoMU6KkgHUZtKvO97z/m2gyaXFFyTvVjs3xpsttyYeeX6+HsfHCWKoZuCBgiK7s4QQBXd8WIEW69z7fwXv3+4cuO0hAvz3a3ifietBqqKoIQQkKCgYadgtyRACEihwIGtLWY/+vRjV/vnYTfd/NMRMrTTJW3UMdYgufwjKMug2URDhjiHiqBAU4QnvRtyf928yYPf7hLqNcz+fsZu32H97Rlaq9eIygdIqzXMiSmOzn/F2jMHKYSMYAzN/jKddjNjNaJxyaGLoHu1dPgl/Qb0+5ePPZYvgl7y6A959H0vX5rtrlAToQYszUyzq9c2Kvh33+HE2o+9bG7kMFWgqkJNDSqCydSQZgZjLZuLF/nu5Mke8Mbn8z3/2QvPU/ypgjOWNBiyYBAEU/KO2DtKzpH4HJ2rV1k+e5a9Ov/6Kfp/+ZWkUCDa2Y+9xRowkXXsc47YWordDk9MTnJqbu6xgtmlZZKxMUyrxT7viZ0jdh5rDCb2nth7SqoUp6aYXFnpgV+fOdPzr66v03f8OLlOh9h74pzDWsFF5TJdBG23efHKlR7w7fg4ycYGt0NgdGEBgGOrq6wPDBDFMSUrmAdtTClJiJKEeGiInycmALg8Pc1z1SrDo6NElQp3zp0DYG1khIHhYaJDg5SSBOcd8vD0m41W0KKIIGlKs93GGkO+UCCIIKq063VaIdBXLCLeE4B+K3xy6/qCKw8e8v9mgoQUESFWBRHCniOWFAR99MaqYD15G2iLNNy9P+5uPn1kYhAxoAq6Qwn/IwEDGOF+5Vbj8t/bF+XZvDny1lODs335wsFqJ2SNVBEBK+AAawRrwIrgDOSs2Gqnu7147/6FSrO7/N8ASxJC+7t5hdYAAAAASUVORK5CYII="/></td></tr>';
		  for (i=1;i<=5;i++) {
			   id = y["effects"]["slot"+i]["id"];
			   tier = parseInt(y["effects"]["slot"+i]["tier"]);
			   level = y["level"];
			   p = unsafeWindow.cm.thronestats.tiers[id][tier];
			   Current = p.base + ((level * level + level) * p.growth * 0.5);
			   var quality = parseInt(y["quality"]);
				if (i<=quality) m+='<TR><TD><FONT color=black>' + Current + "% " + unsafeWindow.cm.thronestats["effects"][id]["1"] + '</font></td></tr>';
				else m+='<TR><TD><FONT color=grey>' + Current + "% " + unsafeWindow.cm.thronestats["effects"][id]["1"] + '</font></td></tr>';
		}
		m+="</table>"
		document.getElementById('DIV'+what).innerHTML = m;
},

ActionPopup : function(id) {
	var t = Tabs.Throne;
    var action="";
    var m = '<DIV id=pbTowrtDivF class=pbStat>Add to Enhance/Upgrade queue</div><BR><TABLE id=pbCompareStats width=100% height=0% class=pbTab>'; 
  	m+= '<TR ><TD><input id=RadioEnhance type="radio" name="actions" value="Enhance">Enhance '+ unsafeWindow.kocThroneItems[id].name +' to: <SELECT id=EnhaceItems type=list></select></td></tr>';
  	m+= '<TR><TD><input id=RadioUpgrade type="radio" name="actions" value="Upgrade">Upgrade '+ unsafeWindow.kocThroneItems[id].name +' to level: <SELECT id=UpgradeItems type=list></select></td></tr>';
  	m+= '<TR><TD align=center><INPUT id=AaddToQueue type=submit value="Add to queue"></td></tr></table><BR>';
  	m+= '<DIV id=pbTowrtDivF class=pbStat>Add to preset</div><BR>';
  	m+= '<DIV>Preset: <SELECT id=PresetNames type=list></select><INPUT id=AddPreset type=submit value="Add"></div><BR>';

  	m+= '<DIV id=pbTowrtDivF class=pbStat>Action</div><BR>';
  	m+= '<DIV align=center><INPUT id=Equip type=submit value="Equip item"><INPUT id=PostToChat type=submit value="Post to chat"></div><BR>';
  
     var pop = new pbPopup ('ActionPopup', 0, 0, 425, 300, true);
     pop.centerMe (mainPop.getMainDiv());  
     pop.getMainDiv().innerHTML = m;
     pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot Throne Card Action</b></center>';
     
    
     pop.show (true);

    document.getElementById('EnhaceItems').options.length=0;
    var QualityCheck = parseInt(unsafeWindow.kocThroneItems[id].quality) +1;
	for (i=QualityCheck;i<=5;i++){
		var o = document.createElement("option");
		o.text = t.Quality[i];
		o.value = i;
		document.getElementById("EnhaceItems").options.add(o);
	}
	document.getElementById('EnhaceItems').value = 5;

	document.getElementById('UpgradeItems').options.length=0;
    var LevelCheck = 1 + parseInt(unsafeWindow.kocThroneItems[id].level);
	for (i=LevelCheck;i<=10;i++){
		var o = document.createElement("option");
		o.text = i;
		o.value = i;
		document.getElementById("UpgradeItems").options.add(o);
	}

	document.getElementById('PresetNames').options.length=0;
	for (i=1;i<=8;i++){
		var o = document.createElement("option");
		o.text = ThroneOptions.PresetName[i];
		o.value = i;
		document.getElementById("PresetNames").options.add(o);
	}
	
	document.getElementById("AaddToQueue").addEventListener ('click', function (){
		if (document.getElementById("RadioEnhance").checked) action = "Enhance";
		if (document.getElementById("RadioUpgrade").checked) action = "Upgrade";
		if (action != "") {
			if (action == "Enhance") var diff = parseInt(document.getElementById('EnhaceItems').value) - parseInt(unsafeWindow.kocThroneItems[id].quality);
			if (action == "Upgrade") var diff = parseInt(document.getElementById('UpgradeItems').value) -  parseInt(unsafeWindow.kocThroneItems[id].level);
			for (ii=0;ii<diff;ii++) ThroneOptions.Items.push ({id:parseInt(id),action:action,name:unsafeWindow.kocThroneItems[id]["name"],qualityfrom:0,qualityto:0,levelfrom:0,levelto:0,cost:0,active:false});
	    	saveThroneOptions();
	    	t.checkUpgradeInfo(false);
	    	pop.show(false);
		}    	
	},false);

	document.getElementById("Equip").addEventListener ('click', function (){
			t.doEquip(parseInt(id),"Compare");
	    	pop.show(false);
	},false);	

	document.getElementById("PostToChat").addEventListener ('click', function (){
			t.PostToChat(parseInt(id));
	    	pop.show(false);
	},false);

	document.getElementById("AddPreset").addEventListener ('click', function (){
			t.AddToPreset(parseInt(id));
	    	pop.show(false);
	},false);
     
},

TimeLeft : function(msg) {
	var t = Tabs.Throne;
	if (document.getElementById('DIV2') != undefined) document.getElementById('DIV2').innerHTML = msg;
	if (document.getElementById('PresetCont') != undefined) document.getElementById('PresetCont').innerHTML = msg;
	if (document.getElementById('ShowTrPresets') != undefined) document.getElementById('ShowTrPresets').innerHTML = msg;
},

PostToChat : function(id) {
	var t = Tabs.Throne;
	item = unsafeWindow.kocThroneItems[id];
	var msg = ":::. " + item.name + " | ";
	for (i=1;i<=5;i++) {
		id = item["effects"]["slot"+i]["id"];
		tier = parseInt(item["effects"]["slot"+i]["tier"]);
		level = item["level"];
		p = unsafeWindow.cm.thronestats.tiers[id][tier];
		Current = p.base + ((level * level + level) * p.growth * 0.5);
		var quality = parseInt(y["quality"]);
		msg += ' | ' + Current + "% " + unsafeWindow.cm.thronestats["effects"][id]["1"];
    }
	sendChat ("/a "+  msg);
},

AddToPreset : function(id) {
	var t = Tabs.Throne;
	if (typeof(unsafeWindow.kocThroneItems[id]) == 'object') {
				var y = unsafeWindow.kocThroneItems[id];
		} else return;
	var type = y.type;
	if (type == "window") type = "windows";
	ThroneOptions.Presets[document.getElementById('PresetNames').value][type] = y.id;	
	saveThroneOptions();
},


PaintHistory : function() {
	var t = Tabs.Throne;
	var popHistory = null;
	popHistory = new pbPopup('pbShowHistory', 0, 0, 1100, 500, true, function() {clearTimeout (1000);});
	var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbShowBarbs" id="pbBars">';       
	popHistory.getMainDiv().innerHTML = '</table></div>' + m;
	popHistory.getTopDiv().innerHTML = '<TD><B>Succesfull Upgrade/Enhance list:</td>';
	for (i=0;i<t.log.length;i++){
		var row = document.getElementById('pbBars').insertRow(0);
		row.vAlign = 'top';
		row.style.color = "black";
		row.insertCell(0).innerHTML = t.log[i].time;
		row.insertCell(1).innerHTML = t.log[i].name;
		row.insertCell(2).innerHTML = t.log[i].action;
		row.insertCell(3).innerHTML = t.log[i].tries;
		row.insertCell(4).innerHTML = t.log[i].good;
		row.insertCell(5).innerHTML = t.log[i].bad;
	}
	var row = document.getElementById('pbBars').insertRow(0);
	row.vAlign = 'top';
	row.style.color = "black";
	row.insertCell(0).innerHTML = "Time";
	row.insertCell(1).innerHTML = "Name";
    row.insertCell(2).innerHTML = "Action";
    row.insertCell(3).innerHTML = "Tries";
    row.insertCell(4).innerHTML = "Good Req.";
	row.insertCell(5).innerHTML = "Bad Req.";
	popHistory.show(true);
},


PaintSalvageHistory : function() {
	var t = Tabs.Throne;
	var popHistory = null;
	popHistory = new pbPopup('pbSalvageShowHistory', 0, 0, 1300, 500, true, function() {clearTimeout (1000);});
	var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbShowBarbs" id="pbBars">';       
	popHistory.getMainDiv().innerHTML = '</table></div>' + m;
	popHistory.getTopDiv().innerHTML = '<TD><B>Throne room Salvage list:</td>';

	for (i=0;i<t.SalvageLog.length;i++){
		var row = document.getElementById('pbBars').insertRow(0);
		row.vAlign = 'top';
		row.style.color = "black";
		row.insertCell(0).innerHTML = t.SalvageLog[i].time;
		row.insertCell(1).innerHTML = t.SalvageLog[i].stones;
		row.insertCell(2).innerHTML = t.SalvageLog[i].item;
		
		cell = row.insertCell(3)
		if (unsafeWindow.cm.thronestats.effects[t.SalvageLog[i].slot1] != undefined) {
			cell.innerHTML = unsafeWindow.cm.thronestats.effects[t.SalvageLog[i].slot1][1];
			if (ThroneOptions.Salvage[t.SalvageLog[i].slot1]) cell.style.color = "red";
			if (ThroneOptions.Salvage_fav[t.SalvageLog[i].slot1]) cell.style.color = "yellow";
			
			cell = row.insertCell(4)
			cell.innerHTML = unsafeWindow.cm.thronestats.effects[t.SalvageLog[i].slot2][1];
			if (ThroneOptions.Salvage[t.SalvageLog[i].slot2]) cell.style.color = "red";
			if (ThroneOptions.Salvage_fav[t.SalvageLog[i].slot2]) cell.style.color = "yellow";

			cell = row.insertCell(5)
			cell.innerHTML = unsafeWindow.cm.thronestats.effects[t.SalvageLog[i].slot3][1];
			if (ThroneOptions.Salvage[t.SalvageLog[i].slot3]) cell.style.color = "red";
			if (ThroneOptions.Salvage_fav[t.SalvageLog[i].slot3]) cell.style.color = "yellow";

			cell = row.insertCell(6)
			cell.innerHTML = unsafeWindow.cm.thronestats.effects[t.SalvageLog[i].slot4][1];
			if (ThroneOptions.Salvage[t.SalvageLog[i].slot4]) cell.style.color = "red";
			if (ThroneOptions.Salvage_fav[t.SalvageLog[i].slot4]) cell.style.color = "yellow";

			cell = row.insertCell(7)
			cell.innerHTML = unsafeWindow.cm.thronestats.effects[t.SalvageLog[i].slot5][1];
			if (ThroneOptions.Salvage[t.SalvageLog[i].slot5]) cell.style.color = "red";
			if (ThroneOptions.Salvage_fav[t.SalvageLog[i].slot5]) cell.style.color = "yellow";

		}	
	}
	var row = document.getElementById('pbBars').insertRow(0);
	row.vAlign = 'top';
	row.style.color = "black";
	row.insertCell(0).innerHTML = "Time";
	row.insertCell(1).innerHTML = "Aetherstones";
	row.insertCell(2).innerHTML = "Item";
	row.insertCell(3).innerHTML = "Slot1";
	row.insertCell(4).innerHTML = "Slot2";
	row.insertCell(5).innerHTML = "Slot3";
	row.insertCell(6).innerHTML = "Slot4";
	row.insertCell(7).innerHTML = "Slot5";

	popHistory.show(true)	;
},

 	addToQueue : function (id,action){
		var t= Tabs.Throne;
	 	ThroneOptions.Items.push ({id:id,action:action,name:unsafeWindow.kocThroneItems[id]["name"],qualityfrom:0,qualityto:0,levelfrom:0,levelto:0,cost:0,active:false});
	    saveThroneOptions();
        t.checkUpgradeInfo(false);
	    t.PaintQueue();
		if (ThroneOptions.Active) t.UpdateShowStatus("Starting Next Queue item...");
		 else t.UpdateShowStatus("Auto Upgrade/Enhance/Repair is OFF."); 
  },

  checkUpgradeInfo : function (firstRun){
	var t= Tabs.Throne;
    var countUpgrade = 0;
	var countEnhance = 0;
    var levelfrom = 0;
	var levelto =0;
	var qualityfrom = 0;
	var qualityto = 0;
	if (ThroneOptions.Items.length == 0) return;
    for (k=0;k<ThroneOptions.Items.length;k++){
		countUpgrade = 0;
		countEnhance = 0;
		if (unsafeWindow.kocThroneItems[ThroneOptions.Items[k]["id"]] != undefined) {
				if (k>0) for (l=0;l<k;l++) {
		          	if (ThroneOptions.Items[l]["id"] == ThroneOptions.Items[k]["id"] && ThroneOptions.Items[l]["action"] == "Upgrade") {countUpgrade++;}
					if (ThroneOptions.Items[l]["id"] == ThroneOptions.Items[k]["id"] && ThroneOptions.Items[l]["action"] == "Enhance") {countEnhance++;}
		      	}
				if (ThroneOptions.Items[k]["action"] == "Upgrade") {
					ThroneOptions.Items[k]["levelfrom"] = parseInt(unsafeWindow.kocThroneItems[ThroneOptions.Items[k]["id"]]["level"]) + countUpgrade;
					ThroneOptions.Items[k]["levelto"] = parseInt(ThroneOptions.Items[k]["levelfrom"]) +1;
						ThroneOptions.Items[k]["qualityfrom"] = parseInt(unsafeWindow.kocThroneItems[ThroneOptions.Items[k]["id"]]["quality"]) + countEnhance;
					if (ThroneOptions.Items[k]["levelto"]>10 && !firstRun) {logit("You can't upgrade higher then level 10!");ThroneOptions.Items.splice (k,1);return;}
				}
				if (ThroneOptions.Items[k]["action"] == "Enhance") {
					ThroneOptions.Items[k]["qualityfrom"] = parseInt(unsafeWindow.kocThroneItems[ThroneOptions.Items[k]["id"]]["quality"]) + countEnhance;
					ThroneOptions.Items[k]["qualityto"] = parseInt(ThroneOptions.Items[k]["qualityfrom"]) +1;
					 ThroneOptions.Items[k]["levelfrom"] = parseInt(unsafeWindow.kocThroneItems[ThroneOptions.Items[k]["id"]]["level"]) + countUpgrade;
					if (ThroneOptions.Items[k]["qualityto"]>5 && !firstRun) {logit("You can't upgrade higher then quality 5!");ThroneOptions.Items.splice (k,1);return;}
				}
				if (ThroneOptions.Items[k]["action"] == "Enhance") var lvl = parseInt(ThroneOptions.Items[k]["qualityfrom"]) +1;
				if (ThroneOptions.Items[k]["action"] == "Upgrade") var lvl = parseInt(ThroneOptions.Items[k]["levelfrom"]) +1;
				costAction = ThroneOptions.Items[k]["action"].toLowerCase();
				if (unsafeWindow.cm.thronestats[costAction][lvl] != undefined) ThroneOptions.Items[k]["cost"] = unsafeWindow.cm.thronestats[costAction][lvl].Stones;
				else ThroneOptions.Items.splice (k,1);
		} else ThroneOptions.Items.splice (k,1);
    }
    saveThroneOptions();
  },
    
    
	PaintQueue : function (){
		var t= Tabs.Throne;
		if (document.getElementById('ShowQueueDiv') != null) document.getElementById('ShowQueueDiv').innerHTML = '<TABLE id=ShowQueue class=pbStat align="center" width=90%></table>';
		for (k=(ThroneOptions.Items.length-1);k>=0;k--){
			if (typeof(unsafeWindow.kocThroneItems[ThroneOptions.Items[k]["id"]]) == 'object') t._addTab(k,ThroneOptions.Items[k]["name"],ThroneOptions.Items[k]["qualityfrom"],ThroneOptions.Items[k]["qualityto"],ThroneOptions.Items[k]["levelfrom"],ThroneOptions.Items[k]["levelto"],ThroneOptions.Items[k]["action"],ThroneOptions.Items[k]["active"],ThroneOptions.Items[k]["cost"]);
			else ThroneOptions.Items.splice (k,1);
		}
		t._addTabHeader();
  },
  
  doAction : function (){
        var t= Tabs.Throne;
        var now = new Date().getTime()/1000.0;
        if (!ThroneOptions.Active) return;
		if (ThroneOptions.Items.length ==0) {t.UpdateShowStatus("No items in queue!!");return;}
        ThroneOptions.Items["0"]["active"] = true;
        t.PaintQueue();
        if (unsafeWindow.kocThroneItems[ThroneOptions.Items["0"]["id"]].isBroken == true && Seed.queue_throne.end == undefined){
		          unsafeWindow.kocThroneItems[ThroneOptions.Items["0"]["id"]].isBroken = false;
		          unsafeWindow.kocThroneItems[ThroneOptions.Items["0"]["id"]].brokenType = "";
          		  setTimeout(t.doRepair,5000);
			    return;
        } 
        if (unsafeWindow.kocThroneItems[ThroneOptions.Items["0"]["id"]].isBroken == false && Seed.queue_throne.end == undefined){
			t.UpdateShowStatus("Doing " + ThroneOptions.Items["0"]["action"] + "...");
            if (ThroneOptions.Items["0"]["action"] == "Upgrade") setTimeout(t.doUpgrade,5000);
            if (ThroneOptions.Items["0"]["action"] == "Enhance") setTimeout(t.doEnhance,5000);
        }
  },
  
  
  doEnhance : function() {
		var t = Tabs.Throne;
		if (typeof(unsafeWindow.kocThroneItems[ThroneOptions.Items["0"]["id"]]) == 'object') var y = unsafeWindow.kocThroneItems[ThroneOptions.Items["0"]["id"]];
		 else return;
		var cityid = 0;
		for (var k in Cities.byID) if ( Seed.resources["city"+k]["rec5"][0] > parseInt((ThroneOptions.Items["0"]["cost"]))) cityid = k;	
		if(cityid == 0){t.UpdateShowStatus("Not enough aetherstone to enhance!!");return;}
		var buffItem = 0; 
        if(ThroneOptions.UseTokens && y.quality >= ThroneOptions.LPSlevel) {
         	if(parseInt(unsafeWindow.seed.items['i20002'])>0) buffItem = 20002; //protection stone           	
         	if(parseInt(unsafeWindow.seed.items['i20001'])>0) buffItem = 20001;//lesser protection stone            
         	if(buffItem) unsafeWindow.cm.InventoryView.removeItemFromInventory(buffItem);
     	}
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
		params.action = 'upgradeQuality';
		params.throneRoomItemId = ThroneOptions.Items["0"]["id"];
		params.buffItemId = buffItem;
		params.payment = "aetherstone";
		params.cityId = cityid;
		RPM++;
      	new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			loading: true,
			onSuccess: function (transport) {
				var rslt = eval("(" + transport.responseText + ")");
				if(rslt.ok){
					if (params.buffItemId > 0) actionLog('Used Stone on :' +unsafeWindow.kocThroneItems[ThroneOptions.Items["0"]["id"]].name+ '(Quality: '+ y.quality + ')');
				    if (rslt.gems > 0)
				    {
					    t.UpdateShowStatus('Upgrader accidentally spent gems!  Turning upgrader off!!');
					    ThroneOptions.Active = false;
					    saveThroneData();
				    }
					Seed.resources["city" + cityid]["rec5"][0] -= rslt.aetherstones;
				  	y.level = rslt.item.level;
	        		y.quality = rslt.item.quality
					y.status = rslt.item.status;
					if (rslt.success)
					{					
					   y.name = y.createName();
					   t.addToLog(ThroneOptions.Items["0"]["id"],ThroneOptions.Items["0"]["action"],ThroneOptions.Tries,ThroneOptions.Good,ThroneOptions.Bad);
					   ThroneOptions.Tries = 0;
					   ThroneOptions.Good = 0;
					   ThroneOptions.Bad = 0;
					   saveThroneOptions();
					   t.UpdateShowTries("Tries: --");
             		   ThroneOptions.Items.splice (0,1);
				    }
				    else
				    {
					   y.isBroken = true;
					   y.brokenType = "quality";
					   y.name = y.createName();
					   ThroneOptions.Tries++;
					   t.UpdateShowStatus('Enhance failed :( <br />Item: ' + unsafeWindow.kocThroneItems[ThroneOptions.Items["0"]["id"]].name +"<br />Waiting for repair...");
					   t.UpdateShowTries("Tries: " + ThroneOptions.Tries + "<br />Good requests: " + ThroneOptions.Good + "   Bad requests: " + ThroneOptions.Bad);
				    }
				    unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
            
            		t.checkUpgradeInfo(false);
	          		t.PaintQueue();
					ThroneOptions.Good++;
					saveThroneOptions();
				} else {
					ThroneOptions.Bad++;
					saveThroneOptions();
				}
				return;	
			},
			onFailure: function () {
			   return;
			},
		});
	},
	   
	doUpgrade : function() {
		var t = Tabs.Throne;
		if (typeof(unsafeWindow.kocThroneItems[ThroneOptions.Items["0"]["id"]]) == 'object') var y = unsafeWindow.kocThroneItems[ThroneOptions.Items["0"]["id"]];
		 else return;
		var cityid = 0;
		for (var k in Cities.byID) if ( Seed.resources["city"+k]["rec5"][0] > parseInt((ThroneOptions.Items["0"]["cost"]))) cityid = k;
		if(cityid == 0){t.UpdateShowStatus("Not enough aetherstone to enhance!!");return;}
		var buffItem = 0;
        if(ThroneOptions.UseTokens && y.level >= ThroneOptions.LLTlevel) {
         	if(parseInt(unsafeWindow.seed.items['i20006'])>0) buffItem = 20006;//lucky token    
         	if(parseInt(unsafeWindow.seed.items['i20005'])>0) buffItem = 20005;//lesser lucky token       
         	if(buffItem) unsafeWindow.cm.InventoryView.removeItemFromInventory(buffItem);
      	}
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
		params.action = 'upgradeLevel';
		params.throneRoomItemId = ThroneOptions.Items["0"]["id"];
		params.buffItemId = buffItem;
		params.payment = "aetherstone";
		params.cityId = cityid;
		RPM++;
      	new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			loading: true,
			onSuccess: function (transport) {
				var rslt = eval("(" + transport.responseText + ")");
				if(rslt.ok){
					if (params.buffItemId > 0) actionLog('Used Token on :' +unsafeWindow.kocThroneItems[ThroneOptions.Items["0"]["id"]].name+ '(Level: '+ y.level + ')');
				    if (rslt.gems > 0)
				    {
					    t.UpdateShowStatus('Upgrader accidentally spent gems!  Turning upgrader off!!');
					    ThroneOptions.Active = false;
					    saveThroneData();
				    }
					Seed.resources["city" +cityid]["rec5"][0] -= rslt.aetherstones;
					if (rslt.success)
					{
					   y.level = rslt.item.level;
					   y.quality = rslt.item.quality;
					   y.name = y.createName();
					   t.addToLog(ThroneOptions.Items["0"]["id"],ThroneOptions.Items["0"]["action"],ThroneOptions.Tries,ThroneOptions.Good,ThroneOptions.Bad);
					   ThroneOptions.Tries = 0;
					   ThroneOptions.Good = 0;
					   ThroneOptions.Bad = 0;
					   saveThroneOptions();
					   t.UpdateShowTries("Tries: --");
             		   ThroneOptions.Items.splice (0,1);
				    }
				    else
				    {
					   y.isBroken = true;
					   y.brokenType = "level";
					   y.status = rslt.item.status;
                       y.name = y.createName();
					   ThroneOptions.Tries++;
					   saveThroneOptions();
					   t.UpdateShowStatus('Upgrade failed :( <br />Item: ' + unsafeWindow.kocThroneItems[ThroneOptions.Items["0"]["id"]].name +"<br />Waiting for repair...");
					   t.UpdateShowTries("Tries: " + ThroneOptions.Tries + "<br />Good requests: " + ThroneOptions.Good + "   Bad requests: " + ThroneOptions.Bad);
				    }
				    unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
				
						t.checkUpgradeInfo(false);
		          		t.PaintQueue();
						ThroneOptions.Good++;
						saveThroneOptions();
				} else {
					ThroneOptions.Bad++;
					saveThroneOptions();
				}
			    return;
			},
			onFailure: function () {
			   return;
			},
		});   
	},
		
	 doRepair : function() {
		var t = Tabs.Throne;
		var cityid = 0;
		for (var k in Cities.byID) {
			if ( Seed.resources["city"+k]["rec5"][0] > ThroneOptions.minStones)
			{
			   cityid = k;
			}
		}
		if(cityid == 0){
		   t.UpdateShowStatus("Not enough aetherstone to repair !");
		   return;	
		}
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
		params.action = 'timeRepair';
		params.throneRoomItemId = ThroneOptions.Items["0"]["id"];
		params.cityId = cityid;
					
		RPM++;
      	new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			loading: true,
			onSuccess: function (transport) {
				var rslt = eval("(" + transport.responseText + ")");
					if(rslt.ok){
              				ThroneOptions.RepairEnd = rslt.eta; 
              				var now = new Date().getTime()/1000.0;
              				t.setRepairTimer = setInterval (t.repairTimerUpdate,1000); 
				 	 		Seed.queue_throne.itemId= ThroneOptions.Items["0"]["id"];
		             		Seed.queue_throne.start=unixTime();
					 		Seed.queue_throne.end= rslt.eta;
					 		t.repairId = ThroneOptions.Items["0"]["id"];
					 		t.repairEnd = rslt.eta;
					 		unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
					 		var x = rslt.eta - unixTime();
							ThroneOptions.Good++;
							saveThroneOptions();
				   } else {	
				   		ThroneOptions.Good++;
						saveThroneOptions();
				   }		
				   return;
			},
			onFailure: function () {
			   return;
			},
		});
	},


	doEquip : function(n,tab) {
		var t = Tabs.Throne;
		if (typeof(unsafeWindow.kocThroneItems[n]) == 'object') {
				var y = unsafeWindow.kocThroneItems[n];
		} else return;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
		params.action = 'equipItem';
		params.itemId = y.id;
		params.presetId = Seed.throne.activeSlot;
		RPM++;
      	new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			loading: true,
			onSuccess: function (transport) {
				var rslt = eval("(" + transport.responseText + ")");
					if(rslt.ok){
							unsafeWindow.cm.ThroneView.clickItemEquip(y);
							if (tab == "Compare") {
								var msg="";
					    		for(i=1;i<=ActiveItems;i++) document.getElementById("DIV"+i).innerHTML="";
					    		for (counter=0;counter<=5;counter++){
					    			msg = '<DIV align="center"><FONT size="20"><B>Time left is : ' + (5 - counter) + '</b></font></div>';
									setTimeout(t.TimeLeft,counter*1000,msg);
								}    	    
					    		setTimeout(t.FillEquipCheckboxes,5000);
					    		if (document.getElementById("ShowTrPresets") != undefined) {
					    			if (GlobalOptions.pbWideScreenStyle=="wide" || GlobalOptions.pbWideScreenStyle=="ultra") setTimeout(Tabs.Dashboard.ShowTrPresets,5000);
									else setTimeout(Tabs.Dashboard.ShowTrPresetsMini,5000);
								}
							}
					} 
			},
			onFailure: function () {
			   return;
			},
		});
	},
  
  repairTimerUpdate :function (){
		var t = Tabs.Throne;
        if (ThroneOptions.Items.length == 0) return;
		var now = new Date().getTime()/1000.0;
        var diff = 0;
		if (Seed.queue_throne.end == undefined) return;
		else diff = Seed.queue_throne.end - now;
        if (diff <0){
            clearTimeout(t.setRepairTimer);
            if (ThroneOptions.Active) t.UpdateShowStatus("Waiting for timer...");
            else t.UpdateShowStatus("Auto Upgrade/Enhance/Repair is OFF.");
            unsafeWindow.kocThroneItems[Seed.queue_throne.itemId].isBroken = false;
            Seed.queue_throne = "";
            return;
        } else {
              t.UpdateShowStatus("Repairing on: " + unsafeWindow.kocThroneItems[ThroneOptions.Items["0"]["id"]].name + "<br/>Time left: " + timestr(diff)+ " ("+ timestr(Seed.queue_throne.end - Seed.queue_throne.start) + ")");
        	  t.UpdateShowTries("Tries: " + ThroneOptions.Tries + "<br />Good requests: " + ThroneOptions.Good + "   Bad requests: " + ThroneOptions.Bad);
		}
  
  },


paintStones : function (){
	var t = Tabs.Throne;
	m="<TABLE width=90% height=0% class=pbTab><TR><TD>Aetherstones: </td>";
	for (i=0;i<Seed.cities.length;i++) m+='<TD>' + Seed.cities[i]["1"] + '</td>';
	m+="</tr><TR><TD></td>"
	for (i=0;i<Seed.cities.length;i++) m+='<TD>' + addCommas(Seed.resources["city"+Seed.cities[i]["0"]]["rec5"][0]) + '</td>';
	m+="</tr></table>"
	if (document.getElementById('ShowStones') != null) document.getElementById('ShowStones').innerHTML = m;	
},

addToLog : function (id,action,tries,good,bad){
	var t = Tabs.Throne;
	var now = new Date();
	var time = now.getDate() +"/"+ (now.getMonth()+1) +"/"+ now.getFullYear() +"  "+ now.getUTCHours() + ":" + now.getMinutes();
	var name = unsafeWindow.kocThroneItems[id]["name"];
	t.log.push ({time:time,name:name,action:action,tries:tries,good:good,bad:bad});
	if (t.log.length > 50) t.log.splice(0,1);
	GM_setValue ('ThroneHistory_'+getServerId(), JSON2.stringify(t.log));
},


addToSalvageLog : function (item,slot1,slot2,slot3,slot4,slot5,stones){
	var t = Tabs.Throne;
	var now = new Date();
	var time =  FullDateTime(now);
	t.SalvageLog.push ({time:time,stones:stones,item:item,slot1:slot1,slot2:slot2,slot3:slot3,slot4:slot4,slot5:slot5,stones:stones});
	if (t.SalvageLog.length > 100) t.SalvageLog.splice(0,1);
	GM_setValue ('ThroneSalvageHistory_'+getServerId(), JSON2.stringify(t.SalvageLog));
},


salvageCheck : function (){
	var t = Tabs.Throne;
	var type ="";
	var NotUpgrading = true;
	var NotFavorite = true;
	var number = 0;
	var count=0;
	var NotYathzee = true;
	var Not4ofAKind = true;
	var NotFullHouse = true;
	var TypeCheck = false;
	if(!Options.ThroneDeleteItems) return;
	if (t.SalvageRunning == true) return;
	t.SalvageRunning = true;
 	for (m in unsafeWindow.kocThroneItems) {
		y = unsafeWindow.kocThroneItems[m];
		type = "";
		NotUpgrading = true;
		NotFavorite = true;
		NotYathzee = true;
		Not4ofAKind = true;
		NotFullHouse = true;	
		number = 0;
		count++;	
		if (typeof(y.id) == 'number') {
			for (k in ThroneOptions.Items) {if (ThroneOptions.Items[k]["id"] == y.id) NotUpgrading = false;}
			if (count<=(parseInt(Seed.throne.rowNum)*5) && count>ThroneOptions.saveXitems) {

					for (i=1;i<=5;i++){
							TypeCheck = false;
							if (y.type == ThroneOptions.Salvage_Type[y.effects["slot"+i].id] || "all" == ThroneOptions.Salvage_Type[y.effects["slot"+i].id] || "ALL" == ThroneOptions.Salvage_Type[y.effects["slot"+i].id]) TypeCheck = true;
							if (ThroneOptions.Salvage[y.effects["slot"+i].id] && i>=ThroneOptions.Salvage_slots[y.effects["slot"+i].id] && TypeCheck) {number++;}
							if (ThroneOptions.Salvage_fav[y.effects["slot"+i].id] && i>=ThroneOptions.Salvage_slots[y.effects["slot"+i].id] && TypeCheck) {NotFavorite= false;}			
					}
					if(ThroneOptions.thronekeep < 1) ThroneOptions.thronekeep = 1;
					if (y.effects["slot1"].id == y.effects["slot2"].id && y.effects["slot2"].id == y.effects["slot3"].id && y.effects["slot3"].id== y.effects["slot4"].id && y.effects["slot4"].id== y.effects["slot5"].id) NotYathzee = false;
					if (y.effects["slot2"].id == y.effects["slot3"].id && y.effects["slot3"].id== y.effects["slot4"].id && y.effects["slot4"].id == y.effects["slot5"].id) Not4ofAKind = false;
					if (y.effects["slot1"].id == y.effects["slot2"].id && y.effects["slot3"].id == y.effects["slot4"].id && y.effects["slot4"].id == y.effects["slot5"].id) NotFullHouse = false;

					if (number < ThroneOptions.thronekeep && NotYathzee && Not4ofAKind && NotFullHouse && NotUpgrading && NotFavorite && !y.isEquipped && !y.isBroken && t.LastDeleted != y.id) {
						if (y.level == 0) t.SalvageArray.push(y.id);
					}					 
			}
		}
	}
	if (t.SalvageArray.length == 0) t.SalvageRunning = false;
},	

doSalvage : function(){
		var t = Tabs.Throne;	
		var cityid = 0;
		var Aetherstones = [];
        for (var k in Cities.byID) {
			Aetherstones.push({city:k,astones: Seed.resources["city"+k]["rec5"][0]});
		}
		Aetherstones.sort(t.AstoneCompare);
		cityid = Aetherstones[0].city;
		if (cityid == 0) cityid = Seed.cities[0][0];
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
		params.action = 'salvage';
		params.itemId = t.SalvageArray[0];
		params.cityId = cityid;
		RPM++;
      	new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			loading: true,
			onSuccess: function (transport) {
				var rslt = eval("(" + transport.responseText + ")");
				if(rslt.ok){
					y =  unsafeWindow.kocThroneItems[params.itemId];
					z = unsafeWindow.cm.thronestats.effects;
					t.addToSalvageLog(y.name,y.effects["slot1"].id,y.effects["slot2"].id,y.effects["slot3"].id,y.effects["slot4"].id,y.effects["slot5"].id,rslt.aetherstones);
					unsafeWindow.kocThroneItems[params.itemId].salvage();
				}
				else {
					t.addToSalvageLog(0,0,0,0,0,0,0);
				}
			},
			onFailure: function () {
					return;
			},
		});
		t.SalvageArray.splice(0,1);
		t.LastDeleted = params.itemId;
		if (t.SalvageArray.length == 0) t.SalvageRunning = false;
},

AstoneCompare: function (a, b) {
	  if (a.astones > b.astones) return 1;
	  else if (a.astones < b.astones) return -1;
	  return 0;
},


hide : function (){
	var t = Tabs.Throne;
	clearInterval(t.timer);
},

show : function (){
    var t = Tabs.Throne;
    if (t.curTabName == 'Sal') 
    	t.Salvage();
    else if (t.curTabName == 'UE')
    	t.Upgrade_Enhance();
	else if (t.curTabName == 'EQ')
    	t.Compare();
	else if  (t.curTabName == 'PR')
		t.Preset();
	else if  (t.curTabName == 'ST')
		t.Stats();
	else if  (t.curTabName == 'TC')
		t.Caps();
  },
}


/****************************  Tower Tab  ******************************/
Tabs.tower = {
  tabOrder: 10,
  tabLabel: 'Tower',
  myDiv: null,
  generateIncomingFunc : null,
  fixTargetEnabled : false,
  secondTimer : null,
  soundPlaying : false,
  defMode : {},  
  soundRepeatTimer : null,
  soundStopTimer : null,
  towerMarches: [],
  
  init: function(div){
    var t = Tabs.tower;
    t.myDiv = div;
    if (GM_getValue ('towerMarches_'+getServerId()) != null) GM_deleteValue ('towerMarches_'+getServerId());   // remove deprecated data if it exists
 
    var m = '<DIV class=pbStat>TOWER ALERTS</div><TABLE class=pbTab><TR align=center>';

    for (var i=0; i<Cities.cities.length; i++) m += '<TD width=95><SPAN id=pbtacity_'+ i +'>' + Cities.cities[i].name + '</span></td>';
    m += '</tr><TR align=center>';
    for (var cityId in Cities.byID) m += '<TD><INPUT type=submit id=pbtabut_'+ cityId +' value=""></td>';
    m += '</tr><TR align=center>';
    for (var cityId in Cities.byID) m += '<TD><CENTER><INPUT id=pbattackqueue_' + cityId + ' type=submit value="A 0 | S 0"></center></td>';
    m += '</tr></table><BR><DIV><CENTER><INPUT id=pbSoundStop type=submit value="'+translate("Stop Sound Alert")+'"></center></div><DIV id=pbSwfPlayer></div>';
    m += '<BR><DIV class=pbStat>SETUP</div>';
	m += '<BR><DIV id=EmailFrame></div>';       
    m += '<BR><TABLE class=pbTab>';
    m += '<TR><TD><INPUT id=pbalertemail type=checkbox '+ (Options.alertConfig.email?'CHECKED ':'') +'/></td><TD>Send E-Mail on incoming attack (Authenticate app!!)"'
    m += '<TR><TD>&nbsp</td></tr><TR><td align=center>-</td><TD align=left>Minimum # of troops to trigger tower options: <INPUT id=pbalertTroops type=text size=7 value="'+ Options.alertConfig.minTroops +'" \> <span style="color:#800; font-weight:bold"><sup>*NEW! Controls All Tower Options</sup></span></td></tr>';
    m += '<TR><TD><INPUT id=pbalertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD>'+translate("Automatically post incoming attacks to alliance chat")+'.</td></tr>\
        <TR><TD></td><TD><TABLE cellpadding=0 cellspacing=0>\
            <TR><TD align=right>'+translate("Message Prefix")+': &nbsp; </td><TD><INPUT id=pbalertPrefix type=text size=60 maxlength=120 value="'+ Options.alertConfig.aPrefix +'" \></td></tr>\
            <TR><TD align=right>'+translate("Alert on scouting")+': &nbsp; </td><TD><INPUT id=pbalertScout type=checkbox '+ (Options.alertConfig.scouting?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>'+translate("Alert on wild attack")+': &nbsp; </td><TD><INPUT id=pbalertWild type=checkbox '+ (Options.alertConfig.wilds?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>'+translate("Display defend status")+': &nbsp; </td><TD><INPUT id=pbalertDefend type=checkbox '+ (Options.alertConfig.defend?'CHECKED ':'') +'/></td></tr>\
            </table></td></tr>\
        <TR><TD align=right><INPUT id=pbalertraid type=checkbox '+ (Options.alertConfig.raid?'CHECKED':'') +'/></td><TD>'+translate("Stop raids on impending")+'.</td></tr>\
    <TR><TD align=right><INPUT id=pbalertTR type=checkbox '+ (Options.alertConfig.alertTR?'CHECKED ':'') +'/></td><TD> '+translate("Toggle to TR set ")+' <INPUT id=pbalertTRset type=text size=2 maxlength=1 value="'+ Options.alertConfig.alertTRset +'"> '+translate("on impending")+'</td></tr>\
        <TR><TD><BR></td></tr>\
        <TR><TD><INPUT id=pbSoundEnable type=checkbox '+ (Options.alertSound.enabled?'CHECKED ':'') +'/></td><TD>'+translate("Play sound on incoming attack/scout")+'</td></tr>\
        <TR><TD></td><TD><DIV id=pbLoadingSwf>'+translate("Loading SWF player")+'</div><DIV style="display:none" id=pbSoundOpts><TABLE cellpadding=0 cellspacing=0>\
            <TR><TD align=right>'+translate("Sound file")+': &nbsp; </td><TD><INPUT id=pbsoundFile type=text size=40 maxlength=1000 value="'+ Options.alertSound.soundUrl +'" \>\
             &nbsp; </td><TD><INPUT id=pbSoundLoad type=submit value='+translate("Load")+' ><INPUT id=pbSoundDefault type=submit value='+translate("Default")+' ></td></tr>\
            <TR><TD align=right>'+translate("Volume")+': &nbsp; </td><TD><TABLE cellpadding=0 cellspacing=0 class=pbTab><TR valign=middle><TD><SPAN id=pbVolSlider></span></td><TD width=15></td><TD align=right id=pbVolOut>0</td></td></table></td><TD align=center><SPAN id=pbLoadStat>xx</span></td></tr>\
            <TR><TD align=right><INPUT id=pbSoundRepeat type=checkbox '+ (Options.alertSound.repeat?'CHECKED ':'') +'/></td><TD> '+translate("Repeat every")+' <INPUT id=pbSoundEvery type=text size=2 maxlength=5 value="'+ Options.alertSound.repeatDelay +'"> '+translate("minutes")+'</td></tr>\
            <TR><TD></td><TD>Play for <INPUT id=pbSoundLength type=text size=3 maxlength=5 value="'+ Options.alertSound.playLength +'"> '+translate("seconds")+'</td></tr>\
            <TR><TD></td><TD><INPUT type=submit value="'+translate("Play Now")+'" id=pbPlayNow></td></tr></table></div></td></tr>\
        </table><BR>';
      t.myDiv.innerHTML = m;


    t.mss = new CmatSimpleSound(SWF_PLAYER_URL, null, {height:0, width:0}, t.e_swfLoaded, 'debug=n');
    t.mss.swfPlayComplete = t.e_soundFinished;
    t.mss.swfLoadComplete = t.e_soundFileLoaded;
    unsafeWindow.matSimpleSound01 = t.mss;   // let swf find it

    t.volSlider = new SliderBar (document.getElementById('pbVolSlider'), 200, 21, 0);
    t.volSlider.setChangeListener(t.e_volChanged);
    document.getElementById('pbPlayNow').addEventListener ('click', function (){t.playSound(false)}, false);
    document.getElementById('pbSoundStop').addEventListener ('click', t.stopSoundAlerts, false);
    document.getElementById('pbSoundRepeat').addEventListener ('change', function (e){Options.alertSound.repeat = e.target.checked}, false);
    document.getElementById('pbSoundEvery').addEventListener ('change', function (e){Options.alertSound.repeatDelay = e.target.value}, false);
    document.getElementById('pbSoundLength').addEventListener ('change', function (e){Options.alertSound.playLength = e.target.value}, false);
    document.getElementById('pbSoundEnable').addEventListener ('change', function (e){Options.alertSound.enabled = e.target.checked}, false);
    document.getElementById('pbSoundStop').disabled = true;
    document.getElementById('pbalertemail').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertEnable').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertPrefix').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertScout').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertWild').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertDefend').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertTroops').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertraid').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertTR').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertTRset').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbsoundFile').addEventListener ('change', function (){
        Options.alertSound.soundUrl = document.getElementById('pbsoundFile').value;
        t.loadUrl (Options.alertSound.soundUrl);
      }, false);
    document.getElementById('pbSoundDefault').addEventListener ('click', function (){
        document.getElementById('pbsoundFile').value = DEFAULT_ALERT_SOUND_URL;
        Options.alertSound.soundUrl = DEFAULT_ALERT_SOUND_URL;
        t.loadUrl (DEFAULT_ALERT_SOUND_URL);
      }, false);

    for (var cityId in Cities.byID){
        var but = document.getElementById ('pbtabut_'+ cityId);
        addListener (but, cityId);
        t.defMode[cityId] =  parseInt(Seed.citystats["city" + cityId].gate);
        t.displayDefMode (cityId);
      var btnNameT = 'pbattackqueue_' + cityId;
      addTowerEventListener(cityId, btnNameT);
      }
    function addListener (but, i){
      but.addEventListener ('click', function (){t.butToggleDefMode(i)}, false);
    }
    function addTowerEventListener(cityId, name){
        document.getElementById(name).addEventListener('click', function(){
            t.showTowerIncoming(cityId);
        }, false);
    }    
  },      

  show : function (){},
  hide : function (){},
 
  loadUrl : function (url){
    var t = Tabs.tower;
    t.mss.load (1, url, true);
    document.getElementById('pbLoadStat').innerHTML = translate('Loading');
  },

  e_swfLoaded : function (){
    var t = Tabs.tower;
    document.getElementById('pbLoadingSwf').style.display = 'none';
    document.getElementById('pbSoundOpts').style.display = 'inline';
    t.volSlider.setValue (Options.alertSound.volume/100);
    setTimeout (function (){
    	t.mss.setVolume (1, Options.alertSound.volume);
    	 t.loadUrl (Options.alertSound.soundUrl);
    }, 500);
    if (Options.alertSound.alarmActive && Options.alertSound.expireTime>unixTime())   
      t.soundTheAlert();
  },
  
  e_alertOptChanged : function (){
    var t = Tabs.tower;
    Options.alertConfig.email = document.getElementById('pbalertemail').checked;
    Options.alertConfig.aChat = document.getElementById('pbalertEnable').checked;
    Options.alertConfig.aPrefix=document.getElementById('pbalertPrefix').value;      
    Options.alertConfig.scouting=document.getElementById('pbalertScout').checked;      
    Options.alertConfig.wilds=document.getElementById('pbalertWild').checked;
    Options.alertConfig.defend=document.getElementById('pbalertDefend').checked;
    Options.alertConfig.raid=document.getElementById('pbalertraid').checked;
    Options.alertConfig.alertTR=document.getElementById('pbalertTR').checked;
    var trset = parseInt(document.getElementById('pbalertTRset').value);
    Options.alertConfig.alertTRset = trset;
    var mt = parseInt(document.getElementById('pbalertTroops').value);
    if (mt<1 || mt>120000){
      document.getElementById('pbalertTroops').value = Options.alertConfig.minTroops;
      document.getElementById('pbalerterr').innerHTML = '<font color=#600000><B>'+translate("INVALID")+'</b></font>';
      setTimeout (function (){document.getElementById('pbalerterr').innerHTML =''}, 2000);
      return;
    }
    Options.alertConfig.minTroops = mt;
    saveOptions();
  },
  
  e_volChanged : function (val){
    var t = Tabs.tower;
    document.getElementById('pbVolOut').innerHTML = parseInt(val*100);
    Options.alertSound.volume = parseInt(val*100);
    t.mss.setVolume (1, Options.alertSound.volume);
  },
  
  butToggleDefMode : function (cityId){
    var t = Tabs.tower;
    var mode = 1;
    if (Seed.citystats["city" + cityId].gate != 0) mode = 0;
    t.ajaxSetDefMode (cityId, mode, function (newMode){
        t.defMode[cityId] = newMode;
        t.displayDefMode (cityId);
      });
  },
      
  displayDefMode : function (cityId){
    var t = Tabs.tower;
    var but = document.getElementById('pbtabut_'+ cityId);
    if (t.defMode[cityId]){
      but.className = 'pbDefButOn';
      but.value = 'Def = ON';  
    } else {
      but.className = 'pbDefButOff';
      but.value = 'Def = OFF';  
    }  
  },
    
  eachSecond : function (){
    var t = Tabs.tower;
    for (var cityId in Cities.byID){
      if (Seed.citystats["city" + cityId].gate != t.defMode[cityId]){     // user changed def mode
        t.defMode[cityId] = Seed.citystats["city"+ cityId].gate;
        t.displayDefMode (cityId);
      }
      Options.alertConfig.raidautoswitch[cityId] = false;
    }
      var now = unixTime();
    var incomming = false;
    if (matTypeof(Seed.queue_atkinc) != 'array'){
      for (var k in Seed.queue_atkinc){   // check each incoming march
        var m = Seed.queue_atkinc[k];
        if ((m.marchType==3 || m.marchType==4) && parseIntNan(m.arrivalTime)>now){
          if (m.departureTime > Options.alertConfig.lastAttack){
            Options.alertConfig.lastAttack = m.departureTime;  
            t.newIncoming (m);
            Recall.push({marchId:k,arrivalTime:m.arrivalTime});
          }
          incomming = true;
          if (Options.alertConfig.raid){
            Options.alertConfig.raidautoswitch[m.toCityId] = true;
          }
        }
      }
    }
    if (Options.alertSound.alarmActive && (now > Options.alertSound.expireTime))
      t.stopSoundAlerts();

        t.towerMarches = [];
        for (var i = 0; i < Cities.cities.length; i++) {
            var cId = Cities.cities[i].id;
            t['attackCount_' + cId] = 0;
            t['scoutCount_' + cId] = 0;
        }
        if (matTypeof(Seed.queue_atkinc) != 'array') {
            for (var k in Seed.queue_atkinc) {
                var m = Seed.queue_atkinc[k];
                if ((m.marchType == 3 || m.marchType == 4) && parseIntNan(m.arrivalTime) > now) {
                    t.handleTowerData(m);

                }
            }
        }
        for (var i = 0; i < Cities.cities.length; i++) {
            var cId = Cities.cities[i].id;
            document.getElementById('pbattackqueue_' + cId).value = 'A ' + t['attackCount_' + cId] + ' | S ' + t['scoutCount_' + cId];
        }    
  },   
  
  e_soundFinished : function (chan){ // called by SWF when sound finishes playing
    var t = Tabs.tower;
    if (chan != 1) return;
    if (!Options.alertSound.alarmActive) document.getElementById('pbSoundStop').disabled = true;
  },

  e_soundFileLoaded : function (chan, isError){ // called by SWF when sound file finishes loading
    if (chan != 1) return;
    if (isError) document.getElementById('pbLoadStat').innerHTML = translate("Error")+"!";
     else document.getElementById('pbLoadStat').innerHTML = translate("Loaded");
  },  
  
  playSound : function (doRepeats){
    var t = Tabs.tower;
    document.getElementById('pbSoundStop').disabled = false;
    clearTimeout (t.soundStopTimer);
    clearTimeout (t.soundRepeatTimer);
    t.mss.play (1, 0);
    t.soundStopTimer = setTimeout (function(){t.mss.stop(1); t.e_soundFinished(1)}, Options.alertSound.playLength*1000);
    if (doRepeats && Options.alertSound.repeat) t.soundRepeatTimer = setTimeout (function (){t.playSound(true)}, Options.alertSound.repeatDelay*60000);
     else Options.alertSound.alarmActive = false;
  },
        
  soundTheAlert : function (){
    var t = Tabs.tower;
    Options.alertSound.alarmActive = true;
    t.playSound(true);
  },
     
  stopSoundAlerts : function (){
    var t = Tabs.tower;
    t.mss.stop (1);
    clearTimeout (t.soundStopTimer);
    clearTimeout (t.soundRepeatTimer);
    document.getElementById('pbSoundStop').disabled = true;
    Options.alertSound.alarmActive = false;
    Options.alertSound.expireTime = 0;
  },

  newIncoming : function (m){
    var t = Tabs.tower;
    var totTroops = 0;
    for (k in m.unts) totTroops += m.unts[k];
    if (totTroops < Options.alertConfig.minTroops) return;  
    t.towerPreset (m);
  },

  towerPreset : function (m){
    var t = Tabs.tower;
    if (Options.alertConfig.alertTR){
	    var currentset = Seed.throne.activeSlot
	    if (Options.alertConfig.alertTRset != currentset){
	        var preset = Options.alertConfig.alertTRset
	        Tabs.Throne.EquipKabamPreset(preset);
	    }
    }  
    t.postToChat (m);
  },    
  
  sendalert : function (m){
    var t = Tabs.tower;
    var now = unixTime();
    if (Options.alertSound.enabled){
      t.soundTheAlert(m);
      if (m.arrivalTime > Options.alertSound.expireTime)
        Options.alertSound.expireTime = m.arrivalTime;
    }
    if (Options.alertConfig.raid){
        Tabs.Raid.StopCityRaids(m.toCityId);
        Options.alertConfig.raidautoswitch[m.toCityId] = true;
    }  
  },


  ajaxSetDefMode : function (cityId, state, notify){
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.cid = cityId;
        params.state = state;
        RPM++;
        new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/gate.php" + unsafeWindow.g_ajaxsuffix, {
            method: "post",
            parameters: params,
            onSuccess: function (rslt) {
                if (rslt.ok) {
                    Seed.citystats["city" + cityId].gate = state;
                    notify (state);
                }
            },
            onFailure: function () {
            }
        })
  },
  
  onUnload : function (){},

  postToChat : function (m){
    var t = Tabs.tower;
    if (DEBUG_TRACE) logit ("checkTower(): INCOMING at "+ unixTime()  +": \n"+ inspect (m, 8, 1));
    if (m.marchType == null) return; // bogus march (returning scouts)
    var target, atkType, who;
    if (m.marchType == 3){
      if (!Options.alertConfig.scouting) return;
      atkType = translate('SCOUT');
    } else if (m.marchType == 4){
      atkType = translate("ATTACK");
    } else {
      return;
    }
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId )
      target = translate('city at')+' ('+ city.x +','+ city.y + ')';
    else {
      if (!Options.alertConfig.wilds) return;
      target = translate('wilderness');
      for (k in Seed.wilderness['city'+m.toCityId]){
        if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
          target += ' at ('+ Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord + ')';
          break;
        }
      }
    }
    if (Seed.players['u'+m.pid])
      who = Seed.players['u'+m.pid].n;
    else if (m.players && m.players['u'+m.pid])
      who = m.players['u'+m.pid].n;
    else
      who = translate('Unknown');
  
    if (m.fromXCoord)
      who += ' at ('+ m.fromXCoord +','+ m.fromYCoord + ')';
    who += ' ('+getDiplomacy(m.aid)+')';
    
    var msg = '..:. | ' + Options.alertConfig.aPrefix +' || ';
    var email = "";
    
    if(m.marchStatus == 9) msg += 'The '+ atkType +' on my '+ target +' by '+ who +' has been recalled.';
     else {
     	msg += atkType +' on ' + target +' || 	By: '+ who +' || Troops (arriving in ' + unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) +') || ';
		email += '<FONT color="red"><B>'+ atkType +'</font></b><BR>';
		email += '<BR>Taget: ' + city.name + ' ('+ city.x +','+ city.y + ')';
		email += '<BR>Attacker: ' + who;
		email += '<BR>ETA: ' + FullDateTime(m.arrivalTime);
		email += '<BR><BR><U>Troops:</u>';
	}    

    for (k in m.unts){
      var uid = parseInt(k.substr (1));
      msg += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +', ';
      email += '<BR>'+m.unts[k]+ ' '+ unsafeWindow.unitcost['unt'+uid][0];
    }
    msg = msg.slice (0, -2);
    msg += '.';
    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 8);
      if (emb.count == 0) msg += translate(" || My embassy has not been constructed in this kingdom.  Do not attempt to reinforce.");
      else {
        var availSlots = 0;
        for (k in Seed.queue_atkinc) if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null) availSlots++;
        }
        msg += ' || Encamped: '+ availSlots +'/'+ emb.maxLevel;
        if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true) msg+= ' || My troops are HIDING!';
        if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true) msg+= ' || My troops are DEFENDING!';
        msg+= ' || My technology levels are: Fl Lv' + parseInt(Seed.tech.tch13) + ', HP Lv'+ parseInt(Seed.tech.tch15) + ', PE Lv'+ parseInt(Seed.tech.tch8) + ', MA Lv'+ parseInt(Seed.tech.tch9) + ', MM Lv'+ parseInt(Seed.tech.tch11) + ', AH Lv'+ parseInt(Seed.tech.tch12);

	    msg+= ' || TRC: ' + m.pid;
	    msg+= ' || March id: ' + m.mid;
    }    
    t.sendalert(m);
    if (!Options.alertConfig.aChat) return;
    if (SEND_ALERT_AS_WHISPER) sendChat ("/"+ Seed.player.name +' '+ msg); // Whisper to myself
    else sendChat ("/a "+  msg); // Alliance chat
    if (Options.alertConfig.email) t.sendToMail(email);    
  },

  	sendToMail: function(msg){
  		var t = Tabs.tower;
  		var content = '<BODY><HTML>' + msg + '</html></body>';
  		var data = {};
    	data.Subject ='Tower Alert ('+getServerId()+')';
    	data.Message = content; 
    	GM_xmlhttpRequest({
        	method: 'POST',
        	url: 'http://nicodebelder.eu/koc/mail.php',
        	headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',},
        	data: implodeUrlArgs(data),
        	onload: function (response) {logit(response.toSource());},
    	});
  	},

      handleTowerData: function(m){
        var t = Tabs.tower;
        var now = unixTime();
        var target, atkType, who, attackermight, allianceId, allianceName, diplomacy;
        var city = Cities.byID[m.toCityId];
        
        if (DEBUG_TRACE) logit("checkTower(): INCOMING at " + unixTime() + ": \n" + inspect(m, 8, 1));
        //ATKTYPE
        if (m.marchType == 3) {
            atkType = 'scouted';
            t['scoutCount_' + m.toCityId]++;
        }
        else
            if (m.marchType == 4) {
                atkType = 'attacked';
                t['attackCount_' + m.toCityId]++;
            }
            else {
                return;
            }
        //TARGET
        if (city.tileId == m.toTileId)
            target = 'City at ' + city.x + ',' + city.y;
        else {
            target = 'Wilderness';
            for (k in Seed.wilderness['city' + m.toCityId]) {
                if (Seed.wilderness['city' + m.toCityId][k].tileId == m.toTileId) {
                    target += ' at ' + Seed.wilderness['city' + m.toCityId][k].xCoord + ',' + Seed.wilderness['city' + m.toCityId][k].yCoord;
                    break;
                }
            }
        }
        //CITYNAME
        var cityName = Cities.byID[m.toCityId].name;
        
        //TROOPS
        var units = [];
        for (i = 0; i < 15; i++)
            units[i] = 0;
        for (k in m.unts) {
            var uid = parseInt(k.substr(1));
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Supply Troop') units[1] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Militiaman') units[2] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Scout') units[3] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Pikeman') units[4] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Swordsman') units[5] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Archer') units[6] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Cavalry') units[7] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Heavy Cavalry') units[8] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Supply Wagon') units[9] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Ballista') units[10] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Battering Ram') units[11] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Catapult') units[12] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Bloodthorn') units[13] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Executioner') units[14] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Siege Wall') units[15] = m.unts[k];
        }
        //ATTACKERS INFORMATION
        if (Seed.players['u' + m.pid]) {
            who = Seed.players['u' + m.pid].n;
            attackermight = Seed.players['u' + m.pid].m;
            allianceId = Seed.players['u' + m.pid].a;
            allianceName = Seed.allianceNames[allianceId];
            diplomacy = getDiplomacy(allianceId);
        }
        else
            if (m.players && m.players['u' + m.pid]) {
                who = m.players['u' + m.pid].n;
                attackermight = parseInt(m.players['u' + m.pid].m);
                allianceId = 'a' + m.players['u' + m.pid].a;
                allianceName = Seed.allianceNames[allianceId];
                diplomacy = getDiplomacy(allianceId);
            }
            else {
                who = 'n.A.';
                attackermight = 'n.A.';
                allianceId = 'n.A.';
                allianceName = 'n.A.';
                diplomacy = 'n.A.';
            }
        //SOURCE
        if (m.fromXCoord) var source = m.fromXCoord + ',' + m.fromYCoord;
        else var source = 'n.A.';
       
        var arrivingDatetime = new Date();
        arrivingDatetime.setTime(m.arrivalTime * 1000);
        var count = t.towerMarches.length + 1;
        t.towerMarches[count] = {
            added: now,
            cityId: m.toCityId,
            target: target,
            arrival: parseIntNan(m.arrivalTime),
            atkType: atkType,
            who: who,
            attackermight: attackermight,
            allianceName: allianceName,
            diplomacy: diplomacy,
            rtime: unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())),
            arrivingDatetime: arrivingDatetime,
            source:source,
            units: units,
        };
    },
    showTowerIncoming: function(cityId){
        var t = Tabs.tower;
        var popTowerIncoming = null;
        var cityName = Tabs.build.getCityNameById(cityId);
        
        if (t.popTowerIncoming == null) {
            t.popTowerIncoming = new pbPopup('pbtower_' + cityId, 0, 0, 820, 500, true, function() {clearTimeout (t.timer);});
        }
        t.popTowerIncoming.show(false);
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTabPad" id="pbCityTowerContent">';
        t.popTowerIncoming.getMainDiv().innerHTML = '</table></div>' + m;
        t.popTowerIncoming.getTopDiv().innerHTML = '<TD width="200px"><B>'+translate("Tower Report of")+' ' + cityName + '</b></td></td>';
        t.addCityData2Pop(cityId);
        t.popTowerIncoming.show(true);
        clearTimeout (t.timer);
        t.timer = setTimeout (function() {t.showTowerIncoming(cityId)}, 5000);        
    },
    addCityData2Pop: function(cityId){
        var t = Tabs.tower;
        var rownum = 0;
        var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];
        enc = {};
        numSlots = 0;
        var row = document.getElementById('pbCityTowerContent').innerHTML = "";
        if (matTypeof(Seed.queue_atkinc) != 'array') {
            for (k in Seed.queue_atkinc) {
                march = Seed.queue_atkinc[k];
                if (march.marchType == 2) {
                    ++numSlots;
                    city = march.toCityId;
                    from = march.fromPlayerId;
                    if (!enc[city])
                        enc[city] = {};
                    if (!enc[city][from])
                        enc[city][from] = [];
                    k = [];
                    k[0] = parseInt(march.knightCombat);
                    for (i = 1; i < 13; i++) {
                        if (Options.encRemaining)
                            k[i] = parseInt(march['unit' + i + 'Return']);
                        else
                            k[i] = parseInt(march['unit' + i + 'Count']);
                    }
                    k[14] = parseInt(march.marchStatus);
                    var now = unixTime();
                    k[15] = parseInt(march.destinationUnixTime) - now;
                    enc[city][from].push(k);
                }
            }
        }
        var s1 = '';
        var s2 = '';
        var s3 = '';
        var tot = [];
        var atk = [];
        for (i = 0; i < 13; i++) {
            tot[i] = 0;
            atk[i] = 0;
        }

            s1 += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;} .attack{background:#FF9999;} .own{background:#66FF66;}</style>';
            s1 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=center width=16%></td>';
            
            for (k = 0; k < names.length; k++)
                s1 += '<TD width=7%><B>' + names[k] + '</b></td>';
            s1 += '</tr>';
            dest = cityId;
            if (enc[dest]) {
                for (p in enc[dest]) {
                    try {
                        player = Seed.players['u' + p].n;
                    }
                    catch (err) {
                        player = '???';
                    }
                    for (m = 0; m < enc[dest][p].length; m++) {
                        status = '';
                        if (enc[dest][p][m][14] == 1) {
                            status = ' (' + timestr(enc[dest][p][m][15]) + ')';    
                            if (enc[dest][p][m][15] < 0)
                                status = ' (enc)';    
                            else
                                 status = ' (' + timestr(enc[dest][p][m][15]) + ')';    
                        }
                        if (enc[dest][p][m][14] == 2) {
                            status = ' (enc)';    
                        }

                        s1 += '<TR align=right><TD align=left class="city">' + player + status +'</td>'
                        for (i = 1; i < 13; i++) {
                            num = enc[dest][p][m][i];
                            s1 += '<TD class="city">' + num + '</td>';
                            tot[i] += num;
                        }
                    }
                }
            } else {
                s1 += '<TR align=right><TD align=left class="city"><B>'+translate("Reinforcment")+':</b></td>'
                for (i = 1; i < 13; i++) {
                    s1 += '<TD class="city">0</td>';
                }
                
            }
            s1 += '<TR align=right><TD colspan=14><BR></tr>';
            s1 += '<TR align=right><TD class="own" align=left><B>'+translate("Own Troops")+':</b></td>';
            //OWNTROOPS
            var ownTroops = "";
            for (r = 1; r < 13; r++) {
                cityString = 'city' + cityId;
                num = parseInt(Seed.units[cityString]['unt' + r]);
                s1 += '<TD class="own">' + num + '</td>';
                tot[r] += num;
            }
            s1 += '<TD class="city"></td><TR><TD colspan=14><BR></td></tr><TR align=right><TD class="tot" align=left><B>'+translate("Defenders")+':</b></td>';
            for (i = 1; i < 13; i++)
                s1 += '<TD class="tot">' + tot[i] + '</td>';      
            s3 += '</tr></table>';
        
        s3 += '<TD class="city"></td><TR><TD colspan=14><BR></td></tr><TR align=right><TD class="tot" align=left><B>'+translate("Incoming Attacks")+':</b></td>';
        
        var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];
        if (t.towerMarches.length > 0) {
            for (k in t.towerMarches) {
                if (typeof t.towerMarches[k].atkType != 'undefined') {
                    if (t.towerMarches[k].cityId == cityId) {
                        s3 += '<TABLE cellspacing=0 width=100%><TR>';
                        
                        if (t.towerMarches[k].atkType == 'attacked') {
                            s3 += '<TD rowspan=2 width=5%><B><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_30.jpg?6545"></b></td>';
                        }
                        else
                            if (t.towerMarches[k].atkType == 'scouted') {
                                s3 += '<TD rowspan=2 width=5%><B><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_30.jpg?6545"></b></td>';
                            }
                        s3 += '<TD width=15%><B>'+translate("Location")+'</b></td>';
                        s3 += '<TD width=15%><B>'+translate("Name")+'</b></td>';
                        s3 += '<TD width=10%><B>'+translate("Source")+': </b></td><TD width=10%>' + t.towerMarches[k].source + '</td>';
                        s3 += '<TD width=10%><B>'+translate("Might")+': </b></td><TD width=10%>' + t.towerMarches[k].attackermight + '</td>';
                        s3 += '<TD width=10%><B>'+translate("Alliance")+': </b></td><TD width=10%>' + t.towerMarches[k].allianceName + '</td>';
                        s3 += '<TD width=10%><B>'+translate("State")+': </b></td><TD width=10%>' + t.towerMarches[k].diplomacy + '</td></tr>';
                        s3 += '<TR><TD width=10%  >' + t.towerMarches[k].target + '</td>';
                        s3 += '<TD  >' + t.towerMarches[k].who + '</td>';
                        s3 += '<TD><B>'+translate("Remaining")+': </b></td><TD width=10%>' + t.towerMarches[k].rtime + '</td>';
                        s3 += '<TD><B>'+translate("Arrival")+': </b></td><TD  colspan=5 width=10%>' + t.towerMarches[k].arrivingDatetime + '</td></tr>';
                        s3 += '</tr></table>';
                        s3 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=left width=16%></td>';
                        for (n = 0; n < names.length; n++)
                            s3 += '<TD width=7%><B>' + names[n] + '</b></td>';
                        s3 += '</tr><TR align=right><TD class="attack" align=left><B>Units:</td>';
                        for (u = 1; u < 13; u++) {
                            num = t.towerMarches[k].units[u];
                            s3 += '<TD class="attack">' + num + '</td>';
                            atk[u] += parseInt(num);
                        }
                        s3 += '</tr></table>';
                    }
                }
                
            }
        }
        s2 += '<TR><TD colspan=14><BR></td></tr><TR align=right><TD class="attack" align=left><B>'+translate("Attackers")+':</b></td>';
        for (a = 1; a < 13; a++) s2 += '<TD class="attack" width=7%>' + atk[a] + '</td>';
        var html = s1 + s2 + s3;
        document.getElementById('pbCityTowerContent').innerHTML = html;

    },
}

/****************************  Build Implementation  ******************************
 TODO:
     visu directly in the game of build queue elements
     <span class="leveltag" style="left:60px;">10</span>
     more todos within the code
 */
Tabs.build = {
    tabOrder: 20,
    tabLabel: 'Build',
    myDiv: null,
    timer: null,
    buildTab: null,
    koc_buildslot: null,
    currentBuildMode: null,
    buildStates: [],
    loaded_bQ: [],
    lbQ: [],

    init: function(div){
        var t = Tabs.build;
        t.myDiv = div;
        t.koc_buildslot = unsafeWindow.buildslot; //save original koc function
        t.currentBuildMode = "build";
        t.buildStates = {
            running: false,
            help: false,
        };
        t.readBuildStates();
        
        for (var i = 0; i < Cities.cities.length; i++) {
            t["bQ_" + Cities.cities[i].id] = JSON2.parse(GM_getValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, '[]'));
            if (typeof t["bQ_" + Cities.cities[i].id] == 'undefined' || (t["bQ_" + Cities.cities[i].id]) == "") {
                t["bQ_" + Cities.cities[i].id] = [];
            }
        }
        
        var m = '<DIV id=pbBuildDivF class=pbStat>'+translate("BUILD FUNCTIONS")+'</div><TABLE id=pbbuildfunctions width=100% height=0% class=pbTab><TR>';
        if (t.buildStates.running == false) m += '<TD><INPUT id=pbBuildRunning type=submit value="'+translate("Auto Build = OFF")+'"></td>';
         else m += '<TD><INPUT id=pbBuildRunning type=submit value="'+translate("Auto Build = ON")+'"></td>';
        m += '<TD><INPUT id=pbBuildMode type=submit value="'+translate("Build Mode = OFF")+'"></td>';
        m += '<TD>'+translate("Build Type")+': <SELECT id="pbBuildType">\
                <OPTION value=build>'+translate("level up")+'</option>\
                <OPTION value=max>'+translate("level max")+'</option>\
                <OPTION value=destruct>'+translate("deconstruct")+'</option>\
                </select></td>';
        m += '<TD><INPUT id=pbHelpRequest type=checkbox '+ (t.buildStates.help?' CHECKED':'') +'\></td><TD>'+translate("Ask for help")+'?</td></tr><TR><TD></tr></table>';
        m+=' <INPUT id=pbAddToQueue type=submit value="Upgrade">&nbsp&nbsp<B>all&nbsp&nbsp';
        m += '<SELECT id="pbSelectType"><OPTION value=13>Barracks</option><OPTION value=5>Cottages</option><OPTION value=4>Mines</option><OPTION value=3>Quarry\'s</option><<OPTION value=999>Guardian</option></select>';
        m += '&nbsp1&nbsp level in city:&nbsp&nbsp<span id=pbCityAddLevel></b></span></td>'
        m += '<DIV id=pbBuildDivQ class=pbStat>'+translate("BUILD QUEUES")+'</div><TABLE id=pbbuildqueues width=100% height=0% class=pbentry><TR>';
        for (var i = 0; i < Cities.cities.length; i++) m += '<TD colspan=2><CENTER><B>' + Cities.cities[i].name + '</b></center></td>';
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) m += '<TD colspan=2><CENTER><INPUT id=pbbuild_' + Cities.cities[i].id + ' type=submit value="'+translate("Show")+'"></center></td>';
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) m += '<TD colspan=2><CENTER><INPUT id=pbCancelAll_' + Cities.cities[i].id + ' type=submit value="'+translate("Cancel All")+'"></center></td>';
        m += '</tr><TR>';
        
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD>Qc:</td><TD id=pbbuildcount_' + Cities.cities[i].id + '>' + t["bQ_" + Cities.cities[i].id].length + '</td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            t['totalTime_' + Cities.cities[i].id] = 0;
            cbQ = t["bQ_" + Cities.cities[i].id];
            if (typeof cbQ != 'undefined') {
                for (var j = 0; j < cbQ.length; j++) t['totalTime_' + Cities.cities[i].id] = parseInt(t['totalTime_' + Cities.cities[i].id]) + parseInt(cbQ[j].buildingTime);
                timestring = timestr(t['totalTime_' + Cities.cities[i].id]);
            }
            m += '<TD>Tt:</td><TD id=pbbuildtotal_' + Cities.cities[i].id + '>' + timestring + '</td>';
        }
        m += '</tr></table><SPAN class=boldRed id=pbbuildError></span>';

        m += '<DIV id=pbBuildDivQ class=pbStat>'+translate("AUTO ASK HELP")+'</div><BR><DIV id=buildHelp></div><BR><DIV id=researchHelp></div>';
        
        t.myDiv.innerHTML = m;
        
        t.Addcity = new CdispCityPicker ('pbBuildCity', document.getElementById('pbCityAddLevel'), true, null, 0);

        for (var i = 0; i < Cities.cities.length; i++) {
            var cityId = Cities.cities[i].id;
            var btnName = 'pbbuild_' + cityId;
            addQueueEventListener(cityId, btnName);
            var btn2Name = 'pbCancelAll_' + cityId;
            CancelAllEventListener(cityId, btn2Name);
            t.showBuildQueue(cityId, false);
        }

        t.e_autoBuild(); //start checking if we can build someting
        
        document.getElementById('pbBuildType').addEventListener('change', function(){t.setBuildMode(this.value);}, false);
        document.getElementById('pbBuildRunning').addEventListener('click', function(){t.toggleStateRunning(this);}, false);
        document.getElementById('pbBuildMode').addEventListener('click', function(){t.toggleStateMode(this);}, false);
        document.getElementById('pbHelpRequest').addEventListener ('change', function (){t.buildStates.help = (document.getElementById('pbHelpRequest').checked);t.saveBuildStates();}, false);
        
        document.getElementById('pbAddToQueue').addEventListener ('click', function (){t.LevelUp();}, false);   
        window.addEventListener('unload', t.onUnload, false);
        
        function addQueueEventListener(cityId, name){document.getElementById(name).addEventListener('click', function(){t.showBuildQueue(cityId, true);}, false);}
        
        function CancelAllEventListener(cityId, name){
            document.getElementById(name).addEventListener('click', function(){
                t["bQ_" + cityId] = [];
                t['totalTime_' + cityId] = 0;
                document.getElementById('pbbuildcount_' + cityId).innerHTML = 0;
                document.getElementById('pbbuildtotal_' + cityId).innerHTML = timestr(0);
            }, false);
        }
        
    },

    PaintHelp: function(){
    	var t = Tabs.build;
		var bh = '';
		for (i in Seed.updateHelpConstruct) for (ii in Seed.updateHelpConstruct[i]) if (Seed.updateHelpConstruct[i]) {
        	cityId = i.substr(4);
        	bid = ii.substr(1);
        	for (y in Seed.buildings['city' + cityId]) if (Seed.buildings['city' + cityId][y][3] == bid) building = Seed.buildings['city' + cityId][y][0];
        	now = unixTime();
        	bh+="<BR>Help for " + unsafeWindow.buildingcost['bdg' + building][0] + ' to level ' + Seed.updateHelpConstruct[i][ii]["l"] +' available again at: ' + timestr(now - Seed.updateHelpConstruct[i][ii]["time"],true) + ' ('+ Seed.updateHelpConstruct[i][ii]["a"]+' helping)';
    	}
    	//bh+='</table>';

    	var rh = '<TABLE id=pbbuildfunctions width=100% height=0% class=pbTab>';
		for (i in Seed.updateHelpResearch) for (ii in Seed.updateHelpResearch[i]) if (Seed.updateHelpResearch[i]) {
        	cityId = i.substr(4);
        	tid = ii.substr(1);
        	//for (y in Seed.buildings['city' + cityId]) if (Seed.buildings['city' + cityId][y][3] == bid) building = Seed.buildings['city' + cityId][y][0];
        	now = unixTime();
        	if ((now - Seed.updateHelpResearch[i][ii]["time"]) < 0) time = now - Seed.updateHelpResearch[i][ii]["time"];
        	else time = (Seed.updateHelpResearch[i][ii]["time"] - now) - 86400;
        	rh+="<TR>Help for " + unsafeWindow.techcost['tch' + tid][0] + ' to level ' + Seed.updateHelpResearch[i][ii]["l"] +' available again at: ' + timestr(time,true) + ' ('+ Seed.updateHelpResearch[i][ii]["a"]+' helping)</tr>';
    	}	
    	rh+='</table>';

    	if (document.getElementById('buildHelp') && document.getElementById('researchHelp')) {
    		document.getElementById('buildHelp').innerHTML = bh;
    		document.getElementById('researchHelp').innerHTML = rh;
    		 t.HelpTimer = setTimeout(t.PaintHelp,1000);
    	}

    },
    LevelUp: function () {
        var t = Tabs.build;
        var cityBuildings = Seed.buildings["city" + t.Addcity.city.id];
        
        for (k in cityBuildings){
        	var id = parseInt(document.getElementById('pbSelectType').value);
        	if (id == 999 && cityBuildings['pos500'] != undefined) id = cityBuildings['pos500'][0]; 
        	if (cityBuildings[k][0] == id){
        		var cityId = t.Addcity.city.id;
        		var buildingMode = "build";
        		var buildingPos = parseInt(cityBuildings[k][2]);
        		var buildingType = parseInt(cityBuildings[k][0]);
        		var buildingAttempts = parseInt(0); 
        		var buildingLevel = parseInt(cityBuildings[k][1]);
        		var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
				var buildingMult = result[0];
				var buildingTime = result[1];
				var buildingId = parseInt(cityBuildings[k][3]);	
        		for (l in t["bQ_" + cityId]){
        			if (t["bQ_" + cityId][l].buildingId == buildingId) buildingLevel = parseInt((t["bQ_" + cityId][l].buildingLevel +1));
				} 
				if (buildingLevel > 0 && buildingLevel <9) t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
        	}

        }
    }, 
    setBuildMode: function (type) {
        var t = Tabs.build;
        t.currentBuildMode = type;
    },    
    e_autoBuild: function(){
      var t = Tabs.build;
        document.getElementById('pbbuildError').innerHTML = '';
      if (t.buildStates.running == true) {
          var now = unixTime();
          for (var i = 0; i < Cities.cities.length; i++) {
              var cityId = Cities.cities[i].id;
              var isBusy = false;
              var qcon = Seed.queue_con["city" + cityId];
              if (matTypeof(qcon)=='array' && qcon.length>0) {
                if (parseInt(qcon[0][4]) > now)
                  isBusy = true;
                else
                  qcon.shift();   // remove expired build from queue        
              }              
              if (isBusy) {
              } else {
                 if (t["bQ_" + cityId].length > 0) { // something to do?
                      var bQi = t["bQ_" + cityId][0];   //take first queue item to build
                     t.doOne(bQi);;
                 }
              }           
            }
          }
        setTimeout(t.e_autoBuild, 10000); //should be at least 10
    },  
    doOne : function (bQi){
        var t = Tabs.build;
        var currentcityid = parseInt(bQi.cityId);
        var cityName = t.getCityNameById(currentcityid);
        var time = parseInt(bQi.buildingTime);
        var mult = parseInt(bQi.buildingMult);
        var attempt = parseInt(bQi.buildingAttempt);
		var bypasscheck = false;        
        var mode = bQi.buildingMode;
        var citpos = parseInt(bQi.buildingPos);
        
        if ((Seed.buildings['city' + currentcityid]["pos" + citpos] == undefined))
			bypasscheck = true;
			
			if(!bypasscheck) {
				var l_bdgid = parseInt(bQi.buildingType); //JUST FOR CHECK
				var bdgid = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][0]);
				//  var bdgid = 13; //FOR DEBUG
				var l_curlvl = parseInt(bQi.buildingLevel); //JUST FOR CHECK
				var curlvl = parseIntNan(Seed.buildings['city' + currentcityid]["pos" + citpos][1]);
				//  var curlvl = 8; //FOR DEBUG
				var l_bid = parseInt(bQi.buildingId); //JUST FOR CHECK
				var bid = parseInt(Seed.buildings["city" + currentcityid]["pos" + citpos][3]);
				//  var bid = 1523749; //FOR DEBUG        
				if (curlvl > 8 && mode == 'build') {
					t.cancelQueueElement(0, currentcityid, time, false);
					actionLog(translate("Queue item deleted: Building level equals 9 or higher!!!"));
					return;
				};
				if (isNaN(curlvl)) {
					t.cancelQueueElement(0, currentcityid, time, false);
					actionLog(translate("Found no correct value for current building!!!!"));
					return;
				}
				if (l_bdgid != bdgid) {
					t.cancelQueueElement(0, currentcityid, time, false);
					actionLog(translate("Building Type does not match!!!!"));
					return;
				}
				if (l_bid != bid) {
					t.cancelQueueElement(0, currentcityid, time, false);
					actionLog(translate("Building ID does not match!!!!"));
					return;
				}
				if (l_curlvl < curlvl) {
						t.cancelQueueElement(0, currentcityid, time, false);
						actionLog(translate("Queue item deleted: Building level is equal or higher!!!"));
						return;
				}
				if (l_curlvl > curlvl && mode == 'build') {
						t.requeueQueueElement(bQi);
						return;
				}
			} else {
				var l_bdgid = parseInt(bQi.buildingType); //JUST FOR CHECK
				var bdgid = l_bdgid;
				//  var bdgid = 13; //FOR DEBUG			
				var l_curlvl = parseInt(bQi.buildingLevel); //JUST FOR CHECK
				var curlvl = l_curlvl;
				//  var curlvl = 8; //FOR DEBUG
				var l_bid = parseInt(bQi.buildingId); //JUST FOR CHECK
				var bid = l_bid;
			}

            if (mode == 'destruct') {
                var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
                params.cid = currentcityid;
                params.bid = "";
                params.pos = citpos;
                params.lv = curlvl - 1;
                if (curlvl >= 1) {
                    params.bid = bid;
                }
                params.type = bdgid;
                RPM++;
                new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/destruct.php" + unsafeWindow.g_ajaxsuffix, {
                    method: "post",
                    parameters: params,
                    onSuccess: function(transport){
                    	var rslt = eval("(" + transport.responseText + ")");
                        if (rslt.ok) {
                            actionLog("Destructing " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " at " + cityName);
                            Seed.queue_con["city" + currentcityid].push([bdgid, 0, parseInt(rslt.buildingId), unsafeWindow.unixtime(), unsafeWindow.unixtime() + time, 0, time, citpos]);
                            if (params.cid == unsafeWindow.currentcityid)
                                unsafeWindow.update_bdg();
                            if (document.getElementById('pbHelpRequest').checked == true)
                                t.bot_gethelp(params.bid, currentcityid);
                            t.cancelQueueElement(0, currentcityid, time, false);
                        } else {
                            var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
                            t.requeueQueueElement(bQi);
                            document.getElementById('pbbuildError').innerHTML = errmsg;
                            logit("Destruct error: " + errmsg);
                        }
                    },
                    onFailure: function(){
                        document.getElementById('pbbuildError').innerHTML = translate("Connection Error while destructing! Please try later again");
                    }
                })
            }
            if (mode == 'build') {
                var invalid = false;
                var chk = unsafeWindow.checkreq("bdg", bdgid, curlvl); //check if all requirements are met
                for (var c = 0; c < chk[3].length; c++) {
                    if (chk[3][c] == 0) {
                        invalid = true;
                    }
                }
                if (invalid == false) {                            
                    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
                    params.cid = currentcityid;
                    params.bid = "";
                    params.pos = citpos;
                    params.lv = curlvl + 1;
                    if (params.lv > 9){ //make sure that no level 10+ is built
                        t.cancelQueueElement(0, currentcityid, time, false);
                        actionLog(translate("Queue item deleted: Tryed to build level 10+ building! Please report if this happens!!!"));
                        return;
                    }
                    if (params.lv > 1) {
                        params.bid = bid;
                    }
                    params.type = bdgid;
                    
                    RPM++;
                    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/construct.php" + unsafeWindow.g_ajaxsuffix, {
                        method: "post",
                        parameters: params,
                        onSuccess: function(rslt){
                            if (rslt.ok) {
                                actionLog(translate("Building")+" " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " Level " + params.lv + " at " + cityName);                                
                                Seed.resources["city" + currentcityid].rec1[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][1]) * mult * 3600;
                                Seed.resources["city" + currentcityid].rec2[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][2]) * mult * 3600;
                                Seed.resources["city" + currentcityid].rec3[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][3]) * mult * 3600;
                                Seed.resources["city" + currentcityid].rec4[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][4]) * mult * 3600;
                                Seed.citystats["city" + currentcityid].gold[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][5]) * mult;
                                Seed.queue_con["city" + currentcityid].push([bdgid, curlvl + 1, parseInt(rslt.buildingId), unsafeWindow.unixtime(),  unsafeWindow.unixtime() + time, 0, time, citpos]);                        
                                if (params.cid == unsafeWindow.currentcityid)
                                    unsafeWindow.update_bdg();
                                	unsafeWindow.Modal.hideModalAll();
                    				unsafeWindow.queue_changetab_building();
                    				unsafeWindow.modal_build_show_state();
                                if (document.getElementById('pbHelpRequest').checked == true && time > 59)
                                    t.bot_gethelp(params.bid, currentcityid);
                                t.cancelQueueElement(0, currentcityid, time, false);
                            } else {
                                var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
                                if (rslt.error_code == 103) { // building has already the target level => just  delete
                                    t.cancelQueueElement(0, currentcityid, time, false);
                                    actionLog(translate("Queue item deleted: Building at this Level already exists or build process already started!"));
                                } else {
                                    t.requeueQueueElement(bQi);
                                    document.getElementById('pbbuildError').innerHTML = Cities.byID[currentcityid].name +': '+ errmsg + translate(" Item was requeued. Check for retry count.");
                                }
                                logit("Construct error: "+errmsg);
                            }
                    },
                        onFailure: function(){
                            document.getElementById('pbbuildError').innerHTML = translate("Connection Error while building! Please try later again");
                        }
                    });
                } else {
                    t.requeueQueueElement(bQi); // requeue item if check is invalid
                }
            }
    },
    requeueQueueElement: function (bQi) {
        var t = Tabs.build;
        var cityId = bQi.cityId;
        var buildingPos = parseInt(bQi.buildingPos);
        var buildingId = parseInt(bQi.buildingId);
        var buildingLevel = parseInt(bQi.buildingLevel);
        var buildingType = parseInt(bQi.buildingType);
        var buildingTime = parseInt(bQi.buildingTime);
        var buildingMult = parseInt(bQi.buildingMult);
        var buildingAttempts = parseInt(bQi.buildingAttempts);
        var buildingMode = bQi.buildingMode;
        t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts + 1, buildingMult, buildingMode); // requeue item
        t.cancelQueueElement(0, cityId, buildingTime, false); // delete Queue Item
    },
    show: function(){
        var t = Tabs.build;
        t.HelpTimer = setTimeout(t.PaintHelp,1000);
    },
    bot_buildslot: function(c, a){
        var t = Tabs.build;
        var cityId = t.getCurrentCityId();
        var buildingPos   = c.id.split("_")[1];
        var buildingType  = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][0]);
        var buildingLevel = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
        var buildingId    = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][3]);
        if (DEBUG_TRACE) logit("Pos: " + buildingPos + " Type: " + buildingType + " Level: " + buildingLevel + " Id: " + buildingId);
          var buildingAttempts = 0;
        var loaded_bQ = t["bQ_" + cityId];
        if (typeof Seed.queue_con['city' + cityId][0] != 'undefined') {
            var current_construction_pos = Seed.queue_con['city' + cityId][0][2];
        } else {
            var current_construction_pos = "";
        }
        if (loaded_bQ.length == 0 && current_construction_pos != "" ) { //check anyway if there is currently build in progess for this specific building
            if (current_construction_pos != 'NaN' && current_construction_pos == buildingId) {
                buildingLevel += 1;
            }
        } else {
            if (current_construction_pos != "" && current_construction_pos == buildingId) {
                buildingLevel += 1;
            }
            for (var i = 0; i < loaded_bQ.length; i++) { // check if there are already queue items for this building or the building is currently building
                var loadedCity = loaded_bQ[i].cityId;
                var loadedSlot = loaded_bQ[i].buildingPos;
                if (loadedSlot == buildingPos && loadedCity == cityId) {
                    buildingLevel += 1;
                }
                if (loaded_bQ[i].buildingMode == 'destruct' && loadedSlot == buildingPos && loadedCity == cityId) { // check if destrcution is already in queue
                    t.modalmessage(translate("Destruction already in Queue!"));
                    return;
                }
            }
        }
        if (t.currentBuildMode == "build") {
            if (buildingLevel >= 9) {
                t.modalmessage(translate('Due to building requirements (DI), buildings above level 9\nshould be manualy built.'));
                return;
            }
            var buildingMode = "build";
            var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
            var buildingMult = result[0];
            var buildingTime = result[1];
            var queueId = loaded_bQ.length;
            t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
            t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }
        if (t.currentBuildMode == "max") {
            var buildingMode = "build";
            for (var bL = buildingLevel; bL <9; bL++) {
                var queueId = loaded_bQ.length;
                var result = t.calculateQueueValues(cityId, bL, buildingType, buildingMode);
                var buildingMult = result[0];
                var buildingTime = result[1];
                queueId = queueId ;
                t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult, buildingMode);
                t._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
            }
        }
        if (t.currentBuildMode == "destruct") {
            var buildingMode = "destruct";
            var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
            var buildingMult = result[0];
            var buildingTime = result[1];
            var queueId = loaded_bQ.length;
            t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
            t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }

    },
    calculateQueueValues: function (cityId, buildingLevel, buildingType, buildingMode) {
        var t = Tabs.build;
        var now = unixTime();
        var constructionBoost = unsafeWindow.cm.ThroneController.effectBonus(78);        
        if (buildingMode == 'build') {
            var buildingMult = Math.pow(2, buildingLevel);
        }
        if (buildingMode == 'destruct') {
            var buildingMult = Math.pow(2, buildingLevel - 2);
        }
                
        var knights = Seed.knights["city" + cityId];
        if (knights) {
            var polKniId = parseInt(Seed.leaders['city' + cityId].politicsKnightId);
            if (polKniId) {
                var polValue = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politics);
                var polBoost = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politicsBoostExpireUnixtime);
                if ((polBoost - now) > 0) {
                    polValue = parseInt(polValue * 1.25);
                }
            } else {
                polValue = 0;
            }
        } else {
            polValue = 0;
        }
        
        var buildingTime = unsafeWindow.buildingcost["bdg" + buildingType][7] * buildingMult;
        if (parseInt(buildingType) < 6 && parseInt(buildingType) > 0 && buildingMult == 1) buildingTime = 15;
        if (buildingMode == 'build') {
            buildingTime = parseInt(buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16)));
            if (constructionBoost>0)buildingTime = Math.round(buildingTime / (1 + (constructionBoost / 100)));
        }
        if (buildingMode == 'destruct') {
            buildingTime = buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16));
            if (buildingTime % 1 > 0) buildingTime = parseInt(buildingTime);
        }
        
        var result = new Array(buildingMult, buildingTime);
        return result;
    },
    bot_buildguardian: function(c, a){
        var t = Tabs.build;
        var cityId = t.getCurrentCityId();
        var buildingType  = 50;
        for(i=0; i < Cities.numCities; i++){
            if(Seed.guardian[i].cityId == cityId){
                var buildingLevel = Seed.guardian[i].level;
                break;
            }
        }
        var buildingId    = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][3]);
        if (DEBUG_TRACE) logit("Pos: " + buildingPos + " Type: " + buildingType + " Level: " + buildingLevel + " Id: " + buildingId);
          var buildingAttempts = 0;
        var loaded_bQ = t["bQ_" + cityId];
        if (typeof Seed.queue_con['city' + cityId][0] != 'undefined') {
            var current_construction_pos = Seed.queue_con['city' + cityId][0][2];
        } else {
            var current_construction_pos = "";
        }
        if (loaded_bQ.length == 0 && current_construction_pos != "" ) { //check anyway if there is currently build in progess for this specific building
            if (current_construction_pos != 'NaN' && current_construction_pos == buildingId) {
                buildingLevel += 1;
            }
        } else {
            if (current_construction_pos != "" && current_construction_pos == buildingId) {
                buildingLevel += 1;
            }
            for (var i = 0; i < loaded_bQ.length; i++) { // check if there are already queue items for this building or the building is currently building
                var loadedCity = loaded_bQ[i].cityId;
                var loadedSlot = loaded_bQ[i].buildingPos;
                if (loadedSlot == buildingPos && loadedCity == cityId) {
                    buildingLevel += 1;
                }
                if (loaded_bQ[i].buildingMode == 'destruct' && loadedSlot == buildingPos && loadedCity == cityId) { // check if destrcution is already in queue
                    t.modalmessage(translate("Destruction already in Queue!"));
                    return;
                }
            }
        }
        if (t.currentBuildMode == "build") {
            if (buildingLevel >= 9) {
                t.modalmessage(translate('Due to building requirements (DI), buildings above level 9\nshould be manualy built.'));
                return;
            }
            var buildingMode = "build";
            var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
            var buildingMult = result[0];
            var buildingTime = result[1];
            var queueId = loaded_bQ.length;
            t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
            t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }
        if (t.currentBuildMode == "max") {
            var buildingMode = "build";
            for (var bL = buildingLevel; bL <9; bL++) {
                var queueId = loaded_bQ.length;
                var result = t.calculateQueueValues(cityId, bL, buildingType, buildingMode);
                var buildingMult = result[0];
                var buildingTime = result[1];
                queueId = queueId ;
                t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult, buildingMode);
                t._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
            }
        }
        if (t.currentBuildMode == "destruct") {
            var buildingMode = "destruct";
            var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
            var buildingMult = result[0];
            var buildingTime = result[1];
            var queueId = loaded_bQ.length;
            t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
            t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }

    },
    calculateQueueValues: function (cityId, buildingLevel, buildingType, buildingMode) {
        var t = Tabs.build;
        var now = unixTime();
        if (buildingMode == 'build') {
            var buildingMult = Math.pow(2, buildingLevel);
        }
        if (buildingMode == 'destruct') {
            var buildingMult = Math.pow(2, buildingLevel - 2);
        }
                
        var knights = Seed.knights["city" + cityId];
        if (knights) {
            var polKniId = parseInt(Seed.leaders['city' + cityId].politicsKnightId);
            if (polKniId) {
                var polValue = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politics);
                var polBoost = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politicsBoostExpireUnixtime);
                if ((polBoost - now) > 0) {
                    polValue = parseInt(polValue * 1.25);
                }
            } else {
                polValue = 0;
            }
        } else {
            polValue = 0;
        }
        
        var buildingTime = unsafeWindow.buildingcost["bdg" + buildingType][7] * buildingMult;
        if (parseInt(buildingType) < 6 && parseInt(buildingType) > 0 && buildingMult == 1) {
            buildingTime = 15;
        }
        if (buildingMode == 'build') {
            buildingTime = parseInt(buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16)));
        }
        if (buildingMode == 'destruct') {
            buildingTime = buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16));
            if (buildingTime % 1 > 0) {
                buildingTime = parseInt(buildingTime);
            }
        }
        
        var result = new Array(buildingMult, buildingTime);
        return result;
    },
    bot_gethelp: function (f, currentcityid) {
        var t = Tabs.build;
        var city = t.getCityNameById(currentcityid);
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      params.bid = f;
      params.ctrl = 'AskForHelp';
      params.action = 'getHelpData';
      RPM++;
      new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
          method: "post",
          parameters: params,
          onSuccess: function (rslt) {
            unsafeWindow.handleHelpCallback (rslt.data);
          },
          onFailure: function (rslt) {
            t.bot_gethelp (f, currentcityid);
            return;
          },
          });

      var a = Seed.queue_con["city" + currentcityid];
      var e = 0;
      var d = 0;
      for (var c = 0; c < a.length; c++) {
        if (parseInt(a[c][2]) == parseInt(f)) {
          e = parseInt(a[c][0]);
          d = parseInt(a[c][1]);
          break
        }
      }
      var b = new Array();
      b.push(["REPLACE_LeVeLbUiLdInG", d]);
      b.push(["REPLACE_BuIlDiNgNaMe", unsafeWindow.buildingcost["bdg" + e][0]]);
      b.push(["REPLACE_LeVeLiD", d]);
      b.push(["REPLACE_AsSeTiD", f]);
      var g = function(h, i) {
        unsafeWindow.continuation_95(h, i);
        if (!h) {
          var j = d > 1 ? unsafeWindow.cm.SpeedUpType.upgrade : unsafeWindow.cm.SpeedUpType.build;
          unsafeWindow.cm.ClientSideCookieManager.setCookie(j, false)
        }
      };
      unsafeWindow.common_postToProfile("95", unsafeWindow.Object.cloneFeed(unsafeWindow.template_data_95), unsafeWindow.Object.cloneFeed(unsafeWindow.actionlink_data_95), g, b)
    },
    addQueueItem: function (cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode) {
    var t = Tabs.build;
        var lbQ = t["bQ_" + cityId];
        lbQ.push({
            cityId:             cityId,
            buildingPos:        buildingPos,
            buildingType:         buildingType,
            buildingId:         buildingId,
            buildingTime:         buildingTime,
            buildingLevel:         buildingLevel,
            buildingAttempts:     buildingAttempts,
            buildingMult:         buildingMult,
            buildingMode:         buildingMode
        });
        t.modifyTotalTime(cityId, 'increase', buildingTime); //adjust total Time
        //Paint Dashboard Build mode status icon
        // green button -> document.getElementById('buildStatus').innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVNJREFUeNrUk09OwkAUh9+gUKpAFIuIfxJilLIlMd6gaw+Ax/AY7r2AnMFFb2DcC5gYYlBotYKttEwp83zjQtFIN6x8yZfJ9PfypZM3wxARFqkELFgLC5ZnN+yyQF9YjrR12hpEiegRJghoQIQunj7PF1DlQOB5dadi6Nt6cSWlKiPu8+ZTq9bu3tUoPyPc+UcQWK9sHRh6oVIOXF91XpzE2AtUXTss72tlQ+axR4AQjb313aJlWSCEAM75J3JS2dVMUebUdREjECWcojLwBiCZRJOvKB2mFZnH/wEXvb7b5zbaKmR+No6jMZd5/Bg5mt3HByupJQE24Js8gD/0LJnHC0zecNuO6d06HcGmAWRBTCEK/NZbh9+PTJn/FrDZq8wYS0GeVeE4cQIldkT6TZq/DT28gWtxBa/YpP73OMESLWuE8seli4gh9YdzBf/zMX0IMACs96WetcYlTQAAAABJRU5ErkJggg=="/>';	 
        if (document.getElementById('buildStatus')) document.getElementById('buildStatus').innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVlJREFUeNrUU0FOg0AU/VMbCA1tjI0iLmx1U9OQNk2MN2DtAeoxPIZ7L2DP4IIbGDdNF9oNITXBlISWgi0OhcGPRNMQYcPKSV7I5z0e//2ZIXEcQ5lVgZKrtEF1t3ggJHnRQNchlipCRrwjNAYwCgHcm0zkasawgcK7s15PPe/3JV4U+U/Po/p4PNAnkwHytwg3NwJ+PDxVFPVEUdq26wqmaVYWniccd7ttudNRWdpZfgcBtt1stSTDMIAxBpTSbyQ7VRdFKUhj3RcZyEEU8SvbBm+5hHC7/eVorcYH6UzyO6A4MMc0aWxZgpgRhr5PaTrQ/G1EgfY2m80POQ6aWP/gAOGs1/OELzRAdjR1HO3FdQ3CmF9P5hpF/nSzMXRKtYTPGpDdo0wI4fBvF1cA1xj2Et2PcPIW9v38BPC4AHhF/UeRwR4+9hH8H4cuTJKgPsg1+J+X6UuAAQAG85S2YfuhcwAAAABJRU5ErkJggg=="/>';
        if (document.getElementById('buildStatus')) setTimeout (function() {document.getElementById('buildStatus').innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWJJREFUeNrUU79PwkAUvv5IG6iAg8HEMIlxNLBCNxkkYah/gP6NmAChiYQUupjA4uCicbKJBQ0E24OWtvjdgCHGdmHyJV/efffuvrx37x232WzIPsaTPW1vAXGXaJpGRFGUOY67AD0FMsAX8IpSH4Mg8JrNZrwATI6i6KrRaGjVarWWTqePXde1TdO873Q67GYX8GIFwjAs1ev160qlckMp5QG2XQC/Xa1WnK7r7+APsQLr9fq8XC7XbNvmWXd832d7BFnxxWKxhnUvUQAXcqg/7zgOcRyKjIKfmCRJeRZPfETP89zJ5HO6XIYngiAThq1R6k5ZPLGNOPBsGMYglcpEsqyQLSRJicbj8YDFEzOwLGvUat21KfVFVb1Us9nc0WIx/xgOe2a/323PZrPRbwFud5RRvyQIwpmiKCX4AvgB4g6684Z2PsG/MJ4kIMAdsnn4Y+jYi85x3o8V+J+f6VuAAQDR57f+eJX9fgAAAABJRU5ErkJggg=="/>';}, 1000);  

    },
    modalmessage: function(message){
        var t = Tabs.build;
        var timeout = 10000;
        var content = translate("autoclose after 10sec")+"...<br><br>"
        content += message;
        unsafeWindow.Modal.showAlert(content);
        window.setTimeout('unsafeWindow.Modal.hideModal();', timeout);
    },
    modifyTotalTime: function (cityId, type, buildingTime) {
        var t = Tabs.build;
        var element = document.getElementById('pbbuildcount_' + cityId);
        var currentCount = parseInt(element.innerHTML);
        if (type == "increase") {
            t['totalTime_' + cityId] = t['totalTime_' + cityId] + buildingTime;
            var currentCount = currentCount + 1;
        }
        if (type == "decrease") {
            t['totalTime_' + cityId] = t['totalTime_' + cityId] - buildingTime;
            var currentCount = currentCount - 1;
        }
        element.innerHTML = currentCount;
        document.getElementById('pbbuildtotal_' + cityId).innerHTML = timestr(t['totalTime_' + cityId]);
    },
    hide: function(){
        var t = Tabs.build;
        clearTimeout(t.HelpTimer);
    },
    onUnload: function(){
        var t = Tabs.build;
        for (var i = 0; i < Cities.cities.length; i++) {
            if (!ResetAll) GM_setValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, JSON2.stringify((t["bQ_" + Cities.cities[i].id])));
        }
        t.saveBuildStates();
    },
    _addTab: function(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode){
        var t = Tabs.build;
        var row = document.getElementById('pbCityQueueContent').insertRow(0);
        row.vAlign = 'top';
        row.insertCell(0).innerHTML = queueId;
        if (buildingMode == "destruct") {
            row.insertCell(1).innerHTML = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_att.png">';
        }
        else {
            row.insertCell(1).innerHTML = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_prod.png">';
        }
        row.insertCell(2).innerHTML = unsafeWindow.buildingcost['bdg' + buildingType][0];
        row.insertCell(3).innerHTML = timestr(buildingTime);
        if (buildingMode == "destruct") {
            row.insertCell(4).innerHTML = 0;
        } else {
            row.insertCell(4).innerHTML = buildingLevel + 1; // => target Level
        }
        row.insertCell(5).innerHTML = buildingAttempts;
        row.insertCell(6).innerHTML = '<a class="button20" id="queuecancel_' + queueId + '"><span>Cancel</span></a>';
        document.getElementById('queuecancel_' + queueId).addEventListener('click', function(){
            t.cancelQueueElement(queueId, cityId, buildingTime, true);
        }, false);
    },
    cancelQueueElement: function(queueId, cityId, buildingTime, showQueue){
        var t = Tabs.build;
        var queueId = parseInt(queueId);
        t["bQ_" + cityId].splice(queueId, 1);
        t.modifyTotalTime(cityId, 'decrease', buildingTime); //adjust total Time    
        
        if (showQueue == true) {
            t.showBuildQueue(cityId, false);
        }
    },
    showBuildQueue: function(cityId, focus){
        var t = Tabs.build;
        clearTimeout (t.timer);
        var popBuildQueue = null;
        var cityName = t.getCityNameById(cityId);
        if (t.popBuildQueue == null) {
            t.popBuildQueue = new pbPopup('pbbuild_' + cityId, 0, 0, 350, 500, true, function() {clearTimeout (t.timer);});
        }
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTabPad" id="pbCityQueueContent">';       
        t.popBuildQueue.getMainDiv().innerHTML = '</table></div>' + m;
        t.popBuildQueue.getTopDiv().innerHTML = '<TD width="200px"><B>'+translate("Build Queue of")+' ' + cityName + '</b></td><TD><INPUT id=pbOptimizeByTime type=submit value="'+translate("Optimize by Time")+'"></td>';
        t.paintBuildQueue(cityId);
        if (focus)
          t.popBuildQueue.show(true);
        document.getElementById('pbOptimizeByTime').addEventListener('click', function(){t.clearBuildQueue();t.paintBuildQueue(cityId, true);}, false);
        t.timer = setTimeout (function() {t.showBuildQueue(cityId, false)}, 45000);  
    },
    paintBuildQueue: function(cityId, optimize){
        var t = Tabs.build;
        var lbQ = t["bQ_" + cityId];
        if (optimize == true) {
            lbQ.sort(function(a,b){return a.buildingTime - b.buildingTime});
        }
        t["bQ_" + cityId] = lbQ;
        for (var i = 0; i < lbQ.length; i++) {
            var queueId = i;
            t._addTab(queueId, lbQ[i].cityId, lbQ[i].buildingType, lbQ[i].buildingTime, lbQ[i].buildingLevel, lbQ[i].buildingAttempts, lbQ[i].buildingMode);
        }
    },
    clearBuildQueue: function() {
        var t = Tabs.build;
        var table = document.getElementById('pbCityQueueContent');
        var rows = table.rows;
        while(rows.length)
            table.deleteRow(rows.length-1);
    },
    getCurrentCityId: function(){ // TODO maybe move as global function to the core application
        if (!unsafeWindow.currentcityid)
            return null;
        return unsafeWindow.currentcityid;
    },
    saveBuildStates: function(){
        var t = Tabs.build;
        var serverID = getServerId();
        GM_setValue('buildStates_' + serverID, JSON2.stringify(t.buildStates));
    },
    readBuildStates: function(){
        var t = Tabs.build;
        var serverID = getServerId();
        s = GM_getValue('buildStates_' + serverID);
        if (s != null) {
            states = JSON2.parse(s);
            for (k in states)
                t.buildStates[k] = states[k];
        }
    },
    toggleStateRunning: function(obj){
        var t = Tabs.build;
        if (t.buildStates.running == true) {
            t.buildStates.running = false;
            t.saveBuildStates();
            if (document.getElementById('pbBuildRunning')) document.getElementById('pbBuildRunning').value = "Auto Build = OFF";
        	if (document.getElementById('BuildToggle')) document.getElementById('BuildToggle').value = "Auto Build = OFF";
        }
        else {
            t.buildStates.running = true;
            t.saveBuildStates();
            if (document.getElementById('pbBuildRunning')) document.getElementById('pbBuildRunning').value = "Auto Build = ON";
        	if (document.getElementById('BuildToggle')) document.getElementById('BuildToggle').value = "Auto Build = ON";
        }
    },
    toggleStateMode: function(obj){
        var t = Tabs.build;
        if (obj.value == translate('Build Mode = OFF')) {
            unsafeWindow.buildslot = t.bot_buildslot; // overwrite original koc function
            var guardian = document.getElementById('citymap').getElementsByClassName('bldg_guardian_0');
            if(guardian.length >0) guardian[0].addEventListener('click', t.bot_buildguardian, false);
            if (document.getElementById('pbBuildMode')) document.getElementById('pbBuildMode').value = "Build Mode = ON";
        	if (document.getElementById('BuildModeToggle')) document.getElementById('BuildModeToggle').value = "Build Mode = ON";
        }
        else {
            unsafeWindow.buildslot = t.koc_buildslot; // restore original koc function
            var guardian = document.getElementById('citymap').getElementsByClassName('bldg_guardian_0');
            if(guardian.length >0) guardian[0].removeEventListener('click', t.bot_buildguardian, false);
            if (document.getElementById('pbBuildMode')) document.getElementById('pbBuildMode').value = "Build Mode = OFF";
        	if (document.getElementById('BuildModeToggle')) document.getElementById('BuildModeToggle').value = "Build Mode = OFF";
        }
    },
    getCityNameById: function (cityId) {
    return Cities.byID[cityId].name;      
    },
}

/****************************  Transport Implementation  *******************************/
Tabs.transport = {
    tabOrder: 101,
    tabLabel: 'Transport',
    myDiv: null,
    timer: null,
    traderState: [],
    lTR: [],
    tradeRoutes: [],
    checkdotradetimeout: null,
    count: 0,
    check: false,
    init: function (div) {
        var t = Tabs.transport;
        t.myDiv = div;
        t.traderState = {running: false,};
        t.readTraderState();
        t.readTradeRoutes();
        var m = '<DIV id=pbTowrtDivF class=pbStat>' + translate("AUTOMATED TRANSPORT FUNCTION") + '</div><TABLE id=pbtraderfunctions width=100% height=0% class=pbTab><TR align="center">';
        if (t.traderState.running == false) m += '<TD><INPUT id=pbTraderState type=submit value="Transport = OFF"></td>';
         else m += '<TD><INPUT id=pbTraderState type=submit value="Transport = ON"></td>';
        m += '<TD><INPUT id=pbShowRoutes type=submit value="' + translate("Show Routes") + '"></td>';
        m += '</tr></table></div>';
        m += '<DIV id=pbTraderDivDRoute class=pbStat>' + translate("TRADE ROUTE OPTIONS") + '</div>';
        m += '<TABLE id=pbtraderfunctions width=100% height=0% class=pbTab><TR align="center"><TR align="left">';
        m += '<TD colspan=4>' + translate("Check transport every:") + ' <INPUT id=pbtransportinterval type=text size=2 value="' + Options.transportinterval + '"\> ' + translate("minutes") + '</td></tr></table>';
        m += '<TD colspan=4>' + translate("Do not send transport out if less than") + ' <INPUT id=pbminwagons type=text size=2 value="' + Options.minwagons + '"\> ' + translate("troops are needed. (Needless transports are skipped this way)") + '</td></tr></table>';
        m += '<DIV style="margin-top:10px;margin-bottom:5px;">' + translate("If the \"trade\" amount is 0 then it will transport the max amount above \"keep\". Gold only if there is space left...") + '</div></table>';
        m += '<DIV id=pbTraderDivDRoute class=pbStat>' + translate("TRANSPORTS") + '</div>';
        m += '<TABLE id=pbaddtraderoute width=95% height=0% class=pbTab><TR align="left">';
        m += '<TR align="left"><TD>' + translate("From City:") + '</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptrescity></span></div></td></tr>';
        m += '<TR align="left">';
        m += '<TD>' + translate("To City:") + '</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptcityTo></span></div></td>';
        m += '<TD>' + translate("OR") + '</td>';
        m += '<TD>X:<INPUT id=ptcityX type=text size=3\></td>';
        m += '<TD>Y:<INPUT id=ptcityY type=text size=3\></td></tr>';
        m += '<TABLE id=pbaddtraderoute height=0% class=pbTab><TR align="left">';
        m += '<TD width=75px>TroopType:</td><TD width=150px><SELECT id="TransportTroop">';
        for (y in unsafeWindow.unitcost) m += '<option value="' + y + '">' + unsafeWindow.unitcost[y][0] + '</option>';
        m += '</select></td><TD width=75px>' + translate("Troops Available:") + '&nbsp;</td><TD id=TroopAmount align=left width=75px></td>';
        m += '<TD width=75px>' + translate("Global Carry Amount:") + '&nbsp;</td><TD id=CarryAmount align=left width=75px></td>';
        m += '<TR><TD >' + translate("Troops:") + ' </td><TD><INPUT id=TroopsToSend type=text size=6 maxlength=6 value="0">&nbsp;&nbsp;<INPUT id=MaxTroops type=submit value="Max"></td>';
        m += '<TD width=50px><INPUT id=FillInMax type=submit value="<----"></td>';
        m += '<TD id=Calc colspan=3></td></tr>';
        m += '<TABLE id=pbaddtraderoute height=0% class=pbTab><TR align="center">';
        m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png"></td>';
        m += '<TD id=TransRec1 align=right width=110px></td>';
        m += '<TD id=HaveRec1 align=right width=110px></td>';
        m += '<TD width=55px align=right><INPUT id=pbshipFood type=checkbox unchecked=true\></td>';
        m += '<TD width=180px  align=left>' + translate("Keep:") + ' <INPUT id=pbtargetamountFood type=text size=11 maxlength=20 value="0" disabled=true\></td>';
        m += '<TD width=100px>' + translate("Trade:") + ' <INPUT id=pbtradeamountFood type=text size=11 maxlength=20 value="0"\></td>';
        m += '<TD width=50px><INPUT id=MaxFood type=submit value="Max"></td></tr>';
        m += '<TR align="center">';
        m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png"></td>';
        m += '<TD id=TransRec2 align=right width=110px></td>';
        m += '<TD id=HaveRec2 align=right width=110px></td>';
        m += '<TD width=55px align=right><INPUT id=pbshipWood type=checkbox unchecked=true\></td>';
        m += '<TD width=180px align=left>' + translate("Keep:") + ' <INPUT id=pbtargetamountWood type=text size=11 maxlength=20 value="0" disabled=true\></td>';
        m += '<TD width=100px>' + translate("Trade:") + ' <INPUT id=pbtradeamountWood type=text size=11 maxlength=20 value="0"\></td>';
        m += '<TD width=50px><INPUT id=MaxWood type=submit value="Max"></td></tr>';
        m += '<TR align="center">';
        m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png"></td>';
        m += '<TD id=TransRec3 align=right width=110px></td>';
        m += '<TD id=HaveRec3 align=right width=110px></td>';
        m += '<TD width=55px align=right><INPUT id=pbshipStone type=checkbox unchecked=true\></td>';
        m += '<TD width=180px align=left>' + translate("Keep:") + ' <INPUT id=pbtargetamountStone type=text size=11 maxlength=20 value="0" disabled=true\></td>';
        m += '<TD width=100px>' + translate("Trade:") + ' <INPUT id=pbtradeamountStone type=text size=11 maxlength=20 value="0"\></td>';
        m += '<TD width=50px><INPUT id=MaxStone type=submit value="Max"></td></tr>';
        m += '<TR align="center">';
        m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png"></td>';
        m += '<TD id=TransRec4 align=right width=110px></td>';
        m += '<TD id=HaveRec4 align=right width=110px></td>';
        m += '<TD width=55px align=right><INPUT id=pbshipOre type=checkbox unchecked=true\></td>';
        m += '<TD width=180px align=left>' + translate("Keep:") + ' <INPUT id=pbtargetamountOre type=text size=11 maxlength=20 value="0" disabled=true\></td>';
        m += '<TD width=100px>' + translate("Trade:") + ' <INPUT id=pbtradeamountOre type=text size=11 maxlength=20 value="0"\></td>';
        m += '<TD width=50px><INPUT id=MaxOre type=submit value="Max"></td></tr>';
        m += '<TR align="center">';
        m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/aetherstone_30.png"></td>';
        m += '<TD id=TransRec5 align=right width=110px></td>';
        m += '<TD id=HaveRec5 align=right width=110px></td>';
        m += '<TD width=55px align=right><INPUT id=pbshipAstone type=checkbox unchecked=true\></td>';
        m += '<TD width=180px align=left>' + translate("Keep:") + ' <INPUT id=pbtargetamountAstone type=text size=11 maxlength=20 value="0" disabled=true\></td>';
        m += '<TD width=100px>' + translate("Trade:") + ' <INPUT id=pbtradeamountAstone type=text size=11 maxlength=20 value="0"\></td>';
        m += '<TD width=50px><INPUT id=MaxAstone type=submit value="Max"></td></tr>';
        m += '<TR align="center">';
        m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png"></td>';
        m += '<TD id=TransGold align=right width=110px></td>';
        m += '<TD id=HaveGold align=right width=110px></td>';
        m += '<TD width=55px align=right><INPUT id=pbshipGold type=checkbox unchecked=true\></td>';
        m += '<TD width=180px align=left>' + translate("Keep:") + ' <INPUT id=pbtargetamountGold type=text size=11 maxlength=20 value="0" disabled=true\></td>';
        m += '<TD width=100px>' + translate("Trade:") + ' <INPUT id=pbtradeamountGold type=text size=11 maxlength=20 value="0"\></td>';
        m += '<TD width=50px><INPUT id=MaxGold type=submit value="Max"></td></tr>';
        m += '</table>';
        m += '<DIV style="text-align:center; margin-top:15px"><INPUT id=pbSaveRoute type=submit value="' + translate("Add Route") + '"><INPUT id=pbManualSend type=submit value="' + translate("Manual Transport") + '"><INPUT id=pbTransportToMarch type=submit value="' + translate("Add to march tab") + '"></div>';
        m += '<DIV id=errorSpace></div>';
        m +='<BR><DIV id=TransportInfo></div>';

        t.myDiv.innerHTML = m;
        document.getElementById('TransportTroop').value = 'unt9';
        t.tcp = new CdispCityPicker('pttrader', document.getElementById('ptrescity'), true, t.updateResources, 0);
        t.tcpto = new CdispCityPicker('pttraderTo', document.getElementById('ptcityTo'), true, t.clickCitySelect);
        t.tcpto.bindToXYboxes(document.getElementById('ptcityX'), document.getElementById('ptcityY'));
        document.getElementById('TransportTroop').addEventListener('change', function () {t.updateTroops();}, false);
        document.getElementById('pbTraderState').addEventListener('click', function () {t.toggleTraderState(this);}, false);
        document.getElementById('pbSaveRoute').addEventListener('click', function () {t.addTradeRoute();}, false);
        document.getElementById('pbManualSend').addEventListener('click', function () {t.ManualTransport();}, false);
        document.getElementById('pbTransportToMarch').addEventListener('click', function () {t.GetCoords();}, false);
        document.getElementById('pbShowRoutes').addEventListener('click', function () {t.showTradeRoutes();}, false);
        document.getElementById('FillInMax').addEventListener('click', function () {document.getElementById('TroopsToSend').value = t.TroopsNeeded;}, false);
        document.getElementById('MaxTroops').addEventListener('click', function () {
            var rallypointlevel = t.getRallypoint('city' + t.tcp.city.id);
            if (rallypointlevel == 11) rallypointlevel = 15;
            if (rallypointlevel == 12) rallypointlevel = 20;
            var max = t.Troops;
            var maxCalced = 0;
            if (t.Troops > (rallypointlevel * 10000)) max = (rallypointlevel * 10000);
            var TR = unsafeWindow.cm.ThroneController.effectBonus(66);
    		if (TR > 150) TR=150;
            total = TR;
            if (total > 0) {
                maxCalced = max + (max * (total / 100))
                if (maxCalced > t.Troops) maxCalced = t.Troops;
                document.getElementById('TroopsToSend').value = maxCalced;
            } else {
                document.getElementById('TroopsToSend').value = max;
            }
        }, false);
       
        
        document.getElementById('MaxFood').addEventListener('click', function () {
            t.Food = 0;
 			var input = t.MaxClicked();
            document.getElementById('pbtradeamountFood').value = (parseInt(input) <= parseIntCommas(document.getElementById('TransRec1').innerHTML)) ? input : parseIntCommas(document.getElementById('TransRec1').innerHTML);
        }, false);
        document.getElementById('MaxWood').addEventListener('click', function () {
            t.Wood = 0;
            var input = t.MaxClicked();
            document.getElementById('pbtradeamountWood').value = (parseInt(input) <= parseIntCommas(document.getElementById('TransRec2').innerHTML)) ? input : parseIntCommas(document.getElementById('TransRec2').innerHTML);
        }, false);
        document.getElementById('MaxStone').addEventListener('click', function () {
            t.Stone = 0;
            var input = t.MaxClicked();
            document.getElementById('pbtradeamountStone').value = (parseInt(input) <= parseIntCommas(document.getElementById('TransRec3').innerHTML)) ? input : parseIntCommas(document.getElementById('TransRec3').innerHTML);
        }, false);
        document.getElementById('MaxOre').addEventListener('click', function () {
            t.Ore = 0;
            var input = t.MaxClicked();
            document.getElementById('pbtradeamountOre').value = (parseInt(input) <= parseIntCommas(document.getElementById('TransRec4').innerHTML)) ? input : parseIntCommas(document.getElementById('TransRec4').innerHTML);
        }, false);
        document.getElementById('MaxGold').addEventListener('click', function () {
            t.Gold = 0;
            var input = t.MaxClicked();
            document.getElementById('pbtradeamountGold').value = (parseInt(input) <= parseIntCommas(document.getElementById('TransGold').innerHTML)) ? input : parseIntCommas(document.getElementById('TransGold').innerHTML);
        }, false);
        document.getElementById('MaxAstone').addEventListener('click', function () {
            t.Astone = 0;
            var input = t.MaxClicked();
            document.getElementById('pbtradeamountAstone').value = (parseInt(input) <= parseIntCommas(document.getElementById('TransRec5').innerHTML)) ? input : parseIntCommas(document.getElementById('TransRec5').innerHTML);
        }, false);
        document.getElementById('pbtransportinterval').addEventListener('keyup', function () {
            if (isNaN(document.getElementById('pbtransportinterval').value)) document.getElementById('pbtransportinterval').value = 60;
            Options.transportinterval = document.getElementById('pbtransportinterval').value;
            saveOptions();
        }, false);
        document.getElementById('pbtargetamountFood').addEventListener('change', function () {if (isNaNCommas(document.getElementById('pbtargetamountFood').value)) document.getElementById('pbtargetamountFood').value = 0;}, false);
        document.getElementById('pbtargetamountWood').addEventListener('change', function () {if (isNaNCommas(document.getElementById('pbtargetamountWood').value)) document.getElementById('pbtargetamountWood').value = 0;}, false);
        document.getElementById('pbtargetamountStone').addEventListener('change', function () {if (isNaNCommas(document.getElementById('pbtargetamountStone').value)) document.getElementById('pbtargetamountStone').value = 0;}, false);
        document.getElementById('pbtargetamountOre').addEventListener('change', function () {if (isNaNCommas(document.getElementById('pbtargetamountOre').value)) document.getElementById('pbtargetamountOre').value = 0;}, false);
        document.getElementById('pbtargetamountAstone').addEventListener('change', function () {if (isNaNCommas(document.getElementById('pbtargetamountAstone').value)) document.getElementById('pbtargetamountAstone').value = 0;}, false);
        document.getElementById('pbtargetamountGold').addEventListener('change', function () {if (isNaNCommas(document.getElementById('pbtargetamountGold').value)) document.getElementById('pbtargetamountGold').value = 0;}, false);
        document.getElementById('pbtradeamountFood').addEventListener('change', function () {if (isNaNCommas(document.getElementById('pbtradeamountFood').value)) document.getElementById('pbtradeamountFood').value = 0;}, false);
        document.getElementById('pbtradeamountWood').addEventListener('change', function () {if (isNaNCommas(document.getElementById('pbtradeamountWood').value)) document.getElementById('pbtradeamountWood').value = 0;}, false);
        document.getElementById('pbtradeamountStone').addEventListener('change', function () {if (isNaNCommas(document.getElementById('pbtradeamountStone').value)) document.getElementById('pbtradeamountStone').value = 0;}, false);
        document.getElementById('pbtradeamountOre').addEventListener('change', function () {if (isNaNCommas(document.getElementById('pbtradeamountOre').value)) document.getElementById('pbtradeamountOre').value = 0;}, false);
        document.getElementById('pbtradeamountAstone').addEventListener('change', function () {if (isNaNCommas(document.getElementById('pbtradeamountAstone').value)) document.getElementById('pbtradeamountAstone').value = 0;}, false);
        document.getElementById('pbtradeamountGold').addEventListener('change', function () {if (isNaNCommas(document.getElementById('pbtradeamountGold').value)) document.getElementById('pbtradeamountGold').value = 0;}, false);
        document.getElementById('pbminwagons').addEventListener('keyup', function () {
        	if (isNaN(document.getElementById('pbminwagons').value)) document.getElementById('pbminwagons').value = 100;
            Options.minwagons = parseInt(document.getElementById('pbminwagons').value);
            saveOptions();
        }, false)
        document.getElementById('pbshipFood').addEventListener('click', function () {
            if (document.getElementById('pbshipFood').checked == false) document.getElementById('pbtargetamountFood').disabled = true;
             else document.getElementById('pbtargetamountFood').disabled = false;
        }, false);
        document.getElementById('pbshipWood').addEventListener('click', function () {
            if (document.getElementById('pbshipWood').checked == false) document.getElementById('pbtargetamountWood').disabled = true;
            else document.getElementById('pbtargetamountWood').disabled = false;
        }, false);
        document.getElementById('pbshipStone').addEventListener('click', function () {
            if (document.getElementById('pbshipStone').checked == false) document.getElementById('pbtargetamountStone').disabled = true;
            else document.getElementById('pbtargetamountStone').disabled = false;
        }, false);
        document.getElementById('pbshipOre').addEventListener('click', function () {
            if (document.getElementById('pbshipOre').checked == false) document.getElementById('pbtargetamountOre').disabled = true;
             else document.getElementById('pbtargetamountOre').disabled = false;
        }, false);
        document.getElementById('pbshipAstone').addEventListener('click', function () {
            if (document.getElementById('pbshipAstone').checked == false) document.getElementById('pbtargetamountAstone').disabled = true;
             else document.getElementById('pbtargetamountAstone').disabled = false;
        }, false);
        document.getElementById('pbshipGold').addEventListener('click', function () {
            if (document.getElementById('pbshipGold').checked == false) document.getElementById('pbtargetamountGold').disabled = true;
             else document.getElementById('pbtargetamountGold').disabled = false;
        }, false);
        window.addEventListener('unload', t.onUnload, false);
    },

    MaxClicked: function(){
    	var t = Tabs.transport;
    	var unit_number = document.getElementById('TroopsToSend').value;
        var unitid = document.getElementById('TransportTroop').value;
        unitid = unitid.substr(3);	
        var MaxLoad = getMaxLoad(unitid,unit_number);
		var input = MaxLoad - (t.Food + t.Wood + t.Stone + t.Ore + t.Gold + t.Astone);
		return input;
    },

     GetCoords : function (){
	    var t= Tabs.transport;
	    var targetName = "";
	    var targetCityName = "";
	    var total=0;
	    var units = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	    targetX = parseInt(document.getElementById ('ptcityX').value);
	    targetY = parseInt(document.getElementById ('ptcityY').value);
	    if (targetX =="" || targetY=="") {alert("Please enter coords...");return;}
	    var what = document.getElementById('TransportTroop').value;
	    what = what.substr(3);
	    if (parseInt(document.getElementById('TroopsToSend')) == 0) {alert("You got to send a least one troop...");return;}
	    units[what] = parseInt(document.getElementById('TroopsToSend').value);	

	    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    	params.blocks = "bl_" + targetX + "_bt_" + targetY;
	    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
      		method: "post",
      		parameters: params,
      		onSuccess: function (transport) {
      			var rslt = eval("(" + transport.responseText + ")");
        		if (rslt.ok) {
        			if (rslt.data["l_"+targetX+"_t_"+targetY].tileType == 51) {
        				userId = rslt.data["l_"+targetX+"_t_"+targetY].tileUserId;
        				if (userId != null) targetName = rslt.userInfo["u" + userId]["n"];
        				targetCityName = rslt.data["l_"+targetX+"_t_"+targetY].cityName;
        			}
        			MarchOptions.Queue.push ({
        				city: 			t.tcp.city.id,
        				action: 		1,
        				targetX: 		targetX,
        				targetY: 		targetY,
        				tileType: 		rslt.data["l_"+targetX+"_t_"+targetY].tileType,
        				tileLevel: 		rslt.data["l_"+targetX+"_t_"+targetY].tileLevel,
        				targetCityName: targetCityName,
        				targetName: 	targetName,
        				cityNumber: 	rslt.data["l_"+targetX+"_t_"+targetY].cityNum,
        				1: 				units[1],
        				2: 				units[2],
        				3: 				units[3],
        				4: 				units[4],
        				5: 				units[5],
        				6: 				units[6],
        				7: 				units[7],
        				8: 				units[8],
        				9: 				units[9],
        				10: 			units[10],
        				11: 			units[11],
        				12: 			units[12],
        				13: 			units[13],
        				14: 			units[14],
        				15: 			units[15],
        				r1: 			parseInt(document.getElementById ('pbtradeamountFood').value),
        				r2: 			parseInt(document.getElementById ('pbtradeamountWood').value),
        				r3: 			parseInt(document.getElementById ('pbtradeamountStone').value),
        				r4: 			parseInt(document.getElementById ('pbtradeamountOre').value),
        				r5: 			parseInt(document.getElementById ('pbtradeamountAstone').value),
        				gold: 			parseInt(document.getElementById ('pbtradeamountGold').value)
        			});
					saveMarchOptions();
					document.getElementById('TroopsToSend').value = 0;
					document.getElementById ('pbtradeamountFood').value == 0;
				    document.getElementById ('pbtradeamountWood').value == 0;
				    document.getElementById ('pbtradeamountStone').value == 0;
				    document.getElementById ('pbtradeamountOre').value == 0;
				    document.getElementById ('pbtradeamountAstone').value == 0;
				    document.getElementById ('pbtradeamountGold').value == 0;
					Tabs.Dashboard.ShowMarches();
        		}
      		},
    	});
		
	},

  
    updateResources: function () {
        var t = Tabs.transport;
        var ToCity = null;
        for (var i = 1; i <= 5; i++)
        if (i == 5) document.getElementById('TransRec' + i).innerHTML = addCommas(parseInt(Seed.resources["city" + t.tcp.city.id]['rec' + i][0]));
        else document.getElementById('TransRec' + i).innerHTML = addCommas(parseInt(Seed.resources["city" + t.tcp.city.id]['rec' + i][0] / 3600));
        document.getElementById('TransGold').innerHTML = addCommas(parseInt(Seed.citystats["city" + t.tcp.city.id]['gold'][0]));
        for (ii in Seed.cities) if (Seed.cities[ii][2] == document.getElementById('ptcityX').value && Seed.cities[ii][3] == document.getElementById('ptcityY').value) ToCity = Seed.cities[ii][0];
        for (var i = 1; i <= 5; i++) if (ToCity != null) if (i == 5) document.getElementById('HaveRec' + i).innerHTML = addCommas(parseInt(Seed.resources["city" + ToCity]['rec' + i][0]));
        else document.getElementById('HaveRec' + i).innerHTML = addCommas(parseInt(Seed.resources["city" + ToCity]['rec' + i][0] / 3600));
        else document.getElementById('HaveRec' + i).innerHTML = "----";
        if (ToCity != null) document.getElementById('HaveGold').innerHTML = addCommas(parseInt(Seed.citystats["city" + ToCity]['gold'][0]));
        else document.getElementById('HaveGold').innerHTML = "----";
    },
    updateTroops: function (city) {
        var t = Tabs.transport;
        var fontcolor = 'black';
        t.Food = parseIntCommas(document.getElementById('pbtradeamountFood').value);
        t.Wood = parseIntCommas(document.getElementById('pbtradeamountWood').value);
        t.Stone = parseIntCommas(document.getElementById('pbtradeamountStone').value);
        t.Ore = parseIntCommas(document.getElementById('pbtradeamountOre').value);
        t.Gold = parseIntCommas(document.getElementById('pbtradeamountGold').value);
        t.Astone = parseIntCommas(document.getElementById('pbtradeamountAstone').value)*5;
        var unit = document.getElementById('TransportTroop').value;
        t.Troops = parseInt(Seed.units['city' + t.tcp.city.id][unit]);
        var unit_number = parseInt(document.getElementById('TroopsToSend').value);
        var unitid = document.getElementById('TransportTroop').value;
        unitid = unitid.substr(3);
        var LoadUnit = getMaxLoad(unitid,1);
        var GlobalMaxLoad = t.Troops * LoadUnit;
        t.MaxLoad = getMaxLoad(unitid,unit_number);
        t.TroopsNeeded = (t.Food + t.Wood + t.Stone + t.Ore + t.Gold + t.Astone) / LoadUnit;
        t.TroopsNeeded = t.TroopsNeeded.toFixed(0);
        if (t.TroopsNeeded < ((t.Food + t.Wood + t.Stone + t.Ore + t.Gold + t.Astone) / LoadUnit)) t.TroopsNeeded++;
        if (t.TroopsNeeded > t.Troops) fontcolor = 'red';
        if (t.Troops > 0) document.getElementById('TroopAmount').innerHTML = '<FONT color=' + fontcolor + '>' + addCommas(t.Troops) + '</font>';
        else document.getElementById('TroopAmount').innerHTML = 0;
        if (GlobalMaxLoad > 0) document.getElementById('CarryAmount').innerHTML = addCommas(GlobalMaxLoad);
        else document.getElementById('CarryAmount').innerHTML = 0;
        document.getElementById('Calc').innerHTML = '' + translate("Resources:") + ' ' + addCommas(t.Food + t.Wood + t.Stone + t.Ore + t.Gold + t.Astone) + ' / ' + addCommas(t.MaxLoad) + '&nbsp;&nbsp;(' + translate("Troops Needed:") + ' <FONT color=' + fontcolor + '>' + addCommas(t.TroopsNeeded) + '</font> )';
    },
    getRallypoint: function (cityId) {
        var t = Tabs.transport;
        for (var o in Seed.buildings[cityId]) {
            var buildingType = parseInt(Seed.buildings[cityId][o][0]);
            var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
            if (buildingType == 12) {
                return parseInt(buildingLevel);
                break;
            }
        }
        return 0;
    },

    delTradeRoutes: function () {Tabs.transport.tradeRoutes = [];},

    checkcoords: function (obj) {
        var t = Tabs.transport;
        if (obj.id == 'pbok') {
            t.check = true;
            t.addTradeRoute();
        }
        return;
    },
    addTradeRoute: function () {
        var valid = true;
        var t = Tabs.transport;
        var city = t.tcp.city.id;
        if (document.getElementById('ptcityX').value == 0 && document.getElementById('ptcityY').value == 0 && !t.check) {
            new CdialogConfirm('<SPAN class=boldRed>' + translate("You are about to set a route to location 0,0!") + '</span>', t.checkcoords, unsafeWindow.modal_attack_check, mainPop.getMainDiv);
            return;
        }
        var ship_Food = document.getElementById('pbshipFood').checked;
        var ship_Wood = document.getElementById('pbshipWood').checked;
        var ship_Stone = document.getElementById('pbshipStone').checked;
        var ship_Ore = document.getElementById('pbshipOre').checked;
        var ship_Astone = document.getElementById('pbshipAstone').checked;
        var ship_Gold = document.getElementById('pbshipGold').checked;
        var target_Food = parseIntCommas(document.getElementById('pbtargetamountFood').value);
        var target_Wood = parseIntCommas(document.getElementById('pbtargetamountWood').value);
        var target_Stone = parseIntCommas(document.getElementById('pbtargetamountStone').value);
        var target_Ore = parseIntCommas(document.getElementById('pbtargetamountOre').value);
        var target_Astone = parseIntCommas(document.getElementById('pbtargetamountAstone').value);
        var target_Gold = parseIntCommas(document.getElementById('pbtargetamountGold').value);
        var trade_Food = parseIntCommas(document.getElementById('pbtradeamountFood').value);
        var trade_Wood = parseIntCommas(document.getElementById('pbtradeamountWood').value);
        var trade_Stone = parseIntCommas(document.getElementById('pbtradeamountStone').value);
        var trade_Ore = parseIntCommas(document.getElementById('pbtradeamountOre').value);
        var trade_Astone = parseIntCommas(document.getElementById('pbtradeamountAstone').value);
        var trade_Gold = parseIntCommas(document.getElementById('pbtradeamountGold').value);
        var target_x = document.getElementById('ptcityX').value;
        var target_y = document.getElementById('ptcityY').value;
        var target_city = 0;
        var TroopType = document.getElementById('TransportTroop').value;
        var route_state = true;
        if (t.tcpto.city) if (t.tcpto.city.x == target_x && t.tcpto.city.y == target_y) target_city = t.tcpto.city.id;
        if (valid == true) {
            var lTR = t.tradeRoutes;
            lTR.push({
                city: city,
                ship_Food: ship_Food,
                target_Food: target_Food,
                trade_Food: trade_Food,
                ship_Wood: ship_Wood,
                target_Wood: target_Wood,
                trade_Wood: trade_Wood,
                ship_Stone: ship_Stone,
                target_Stone: target_Stone,
                trade_Stone: trade_Stone,
                ship_Ore: ship_Ore,
                target_Ore: target_Ore,
                trade_Ore: trade_Ore,
                ship_Astone: ship_Astone,
                target_Astone: target_Astone,
                trade_Astone: trade_Astone,
                ship_Gold: ship_Gold,
                target_Gold: target_Gold,
                trade_Gold: trade_Gold,
                target_x: target_x,
                target_y: target_y,
                target_city: target_city,
                TroopType: TroopType,
                route_state: "true"
            });
        }
        document.getElementById('pbTraderDivDRoute').style.background = '#99FF99';
        setTimeout(function () {(document.getElementById('pbTraderDivDRoute').style.background = '');}, 1000);
    },
    showTradeRoutes: function () {
        var t = Tabs.transport;
        var popTradeRoutes = null;
        t.popTradeRoutes = new pbPopup('pbShowTrade', 0, 0, 750, 485, true, function () {clearTimeout(1000);});
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTab" id="pbRoutesQueue">';
        t.popTradeRoutes.getMainDiv().innerHTML = '</table></div>' + m;
        t.popTradeRoutes.getTopDiv().innerHTML = '<TD><CENTER><B>' + translate("Transport routes") + '</b></center></td>';
        t.paintTradeRoutes();
        t.popTradeRoutes.show(true);
    },
    paintTradeRoutes: function () {
        var t = Tabs.transport;
        var r = t.tradeRoutes;
        var cityname;
        var m = '<TABLE id=paintRoutes class=pbTab>';
        for (var i = 0; i < (r.length); i++) {
            var queueId = i;
            var cityname = (Cities.byID[r[queueId].city] ? Cities.byID[r[queueId].city].name : "null");
            var citynameTo = null, TO, status, unit;
            if (typeof r[queueId].target_city != 'undefined' && parseInt(r[queueId].target_city) > 0) citynameTo = Cities.byID[r[queueId].target_city].name;
            if (citynameTo == null) TO = r[i].target_x + ',' + r[i].target_y;
            else TO = citynameTo;
            if (r[i].route_state) status = '<FONT color=green>' + translate("Enabled") + '</font>';
            else status = '<FONT color=red>' + translate("Disabled") + '</font>';
            if (r[i].TroopType == undefined) unit = 'unt9';
            else unit = r[i].TroopType;
            m += '<TR><TD TD width=12px>&nbsp;&nbsp;</td></tr>';
            m += '<TR><TD width=20px>' + (i + 1) + '</td><TD width=175px>' + translate("From:") + '&nbsp;&nbsp;' + cityname + '</TD><TD width=175px>' + translate("To:") + '&nbsp;&nbsp;' + TO + '</td><TD width=175px>' + status + '</td>';
            m += '<TD width=60px><A onclick="traceEdit(' + queueId + ')">' + translate("Edit") + '</a></td><TD width=60px><A onclick="traceDelete(' + queueId + ')">Delete</a></td></tr>';
            m += '<TR><TD></td><TD>Troops:&nbsp;&nbsp;' + unsafeWindow.unitcost[unit][0] + '</td></tr>';
            if (r[i].ship_Food) m += '<TR><TD></td><TD align=center><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png"></td><TD>' + translate("Target:") + ' ' + addCommas(r[i].target_Food) + '</td><TD>' + translate("Trade:") + ' ' + addCommas(r[i].trade_Food) + '</td>';
            if (r[i].ship_Wood) m += '<TR><TD></td><TD align=center><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png"></td><TD>' + translate("Target:") + ' ' + addCommas(r[i].target_Wood) + '</td><TD>' + translate("Trade:") + ' ' + addCommas(r[i].trade_Wood) + '</td>';
            if (r[i].ship_Stone) m += '<TR><TD></td><TD align=center><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png"></td><TD>' + translate("Target:") + ' ' + addCommas(r[i].target_Stone) + '</td><TD>' + translate("Trade:") + ' ' + addCommas(r[i].trade_Stone) + '</td>';
            if (r[i].ship_Ore) m += '<TR><TD></td><TD align=center><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png"></td><TD>' + translate("Target:") + ' ' + addCommas(r[i].target_Ore) + '</td><TD>' + translate("Trade:") + ' ' + addCommas(r[i].trade_Ore) + '</td>';
            if (r[i].ship_Astone) m += '<TR><TD></td><TD align=center><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/aetherstone_30.png"></td><TD>' + translate("Target:") + ' ' + addCommas(r[i].target_Astone) + '</td><TD>' + translate("Trade:") + ' ' + addCommas(r[i].trade_Astone) + '</td>';
            if (r[i].ship_Gold) m += '<TR><TD></td><TD align=center><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png"></td><TD>' + translate("Target:") + ' ' + addCommas(r[i].target_Gold) + '</td><TD>' + translate("Trade:") + ' ' + addCommas(r[i].trade_Gold) + '</td>';
        }
        m += '</table>';
        document.getElementById('pbRoutesQueue').innerHTML = m;
        unsafeWindow.traceEdit = t.editQueueElement;
        unsafeWindow.traceDelete = t.cancelQueueElement;
    },
    cancelQueueElement: function (queueId) {
        var t = Tabs.transport;
        var queueId = parseInt(queueId);
        t.tradeRoutes.splice(queueId, 1);
        t.showTradeRoutes();
    },
    editQueueElement: function (queueId) {
        var t = Tabs.transport;
        var r = t.tradeRoutes;
        var queueId = parseInt(queueId);
        var cityname = Cities.byID[r[queueId].city].name;
        var citynameTo, TO;
        if (typeof r[queueId].target_city != 'undefined' || parseInt(r[queueId].target_city) > 0) if (Cities.byID[r[queueId].target_city]) citynameTo = Cities.byID[r[queueId].target_city].name;
        var Types = ['food', 'wood', 'stone', 'iron', 'aetherstone', 'gold'];
        if (citynameTo == null) TO = r[queueId].target_x + ',' + r[queueId].target_y;
        else TO = citynameTo;
        var n = '<TABLE id=editRoutes class=pbTab>';
        n += '<TD>' + translate("From:") + '&nbsp;' + cityname + '</td><TD>' + translate("To:") + '&nbsp;' + TO + '</td>';
        n += '<TD><INPUT id=TradeStatus type=checkbox>&nbsp;Enable Route</td>';
        n += '<TD width=150px>' + translate("Troop Type:") + '<SELECT id="pbbTransportTroop">';
        for (y in unsafeWindow.unitcost) n += '<option value="' + y + '">' + unsafeWindow.unitcost[y][0] + '</option>';
        n += '</select></td></table><BR><TABLE  id=editRoutes class=pbTab>';
        for (var i = 0; i < Types.length; i++) {
            var icon = Types[i];
            n += '<TR><TD width=50px align=center><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/' + icon + '_30.png"></td>';
            n += '<TD width=50px align=center><INPUT id=pbbship' + icon + ' type=checkbox></td>';
            n += '<TD width=125px>' + translate("Keep:") + ' <INPUT id=pbbtargetamount' + icon + ' type=text size=11 maxlength=11 value="0"></td>';
            n += '<TD width=125px>' + translate("Trade:") + ' <INPUT id=pbbtradeamount' + icon + ' type=text size=11 maxlength=11 value="0"\></td></tr>';
        }
        n += '</table><BR><TABLE id=editRoutes class=pbTab><TR><TD><a class="button20" id="Cancel"><span>' + translate("Cancel") + '</span></a></td>';
        n += '<TD><a class="button20" id="Save"><span>' + translate("Save") + '</span></a></td></tr>';
        n += '</table>';
        document.getElementById('pbRoutesQueue')
            .innerHTML = n;
        document.getElementById('TradeStatus')
            .checked = r[queueId].route_state;
        if (r[queueId].TroopType == undefined) var unit = 'unt9';
        else var unit = r[queueId].TroopType;
        document.getElementById('pbbTransportTroop').value = unit;
        document.getElementById('pbbshipfood').checked = r[queueId].ship_Food;
        document.getElementById('pbbshipwood').checked = r[queueId].ship_Wood;
        document.getElementById('pbbshipstone').checked = r[queueId].ship_Stone;
        document.getElementById('pbbshipiron').checked = r[queueId].ship_Ore;
        document.getElementById('pbbshipaetherstone').checked = r[queueId].ship_Astone;
        document.getElementById('pbbshipgold').checked = r[queueId].ship_Gold;
        document.getElementById('pbbtargetamountfood').value = r[queueId].target_Food;
        document.getElementById('pbbtargetamountwood').value = r[queueId].target_Wood;
        document.getElementById('pbbtargetamountstone').value = r[queueId].target_Stone;
        document.getElementById('pbbtargetamountiron').value = r[queueId].target_Ore;
        document.getElementById('pbbtargetamountaetherstone').value = r[queueId].target_Astone;
        document.getElementById('pbbtargetamountgold').value = r[queueId].target_Gold;
        document.getElementById('pbbtradeamountfood').value = r[queueId].trade_Food;
        document.getElementById('pbbtradeamountwood').value = r[queueId].trade_Wood;
        document.getElementById('pbbtradeamountstone').value = r[queueId].trade_Stone;
        document.getElementById('pbbtradeamountiron').value = r[queueId].trade_Ore;
        document.getElementById('pbbtradeamountaetherstone').value = r[queueId].trade_Astone;
        document.getElementById('pbbtradeamountgold').value = r[queueId].trade_Gold;
        document.getElementById('Cancel').addEventListener('click', function () {t.showTradeRoutes();}, false);
        document.getElementById('Save').addEventListener('click', function () {
            r[queueId].route_state = document.getElementById('TradeStatus')
                .checked;
            r[queueId].TroopType = document.getElementById('pbbTransportTroop')
                .value;
            r[queueId].ship_Food = (document.getElementById('pbbshipfood')
                .checked);
            r[queueId].ship_Wood = (document.getElementById('pbbshipwood')
                .checked);
            r[queueId].ship_Stone = (document.getElementById('pbbshipstone')
                .checked);
            r[queueId].ship_Ore = (document.getElementById('pbbshipiron')
                .checked);
            r[queueId].ship_Astone = (document.getElementById('pbbshipaetherstone')
                .checked);
            r[queueId].ship_Gold = (document.getElementById('pbbshipgold')
                .checked);
            r[queueId].target_Food = parseIntCommas(document.getElementById('pbbtargetamountfood')
                .value);
            r[queueId].target_Wood = parseIntCommas(document.getElementById('pbbtargetamountwood')
                .value);
            r[queueId].target_Stone = parseIntCommas(document.getElementById('pbbtargetamountstone')
                .value);
            r[queueId].target_Ore = parseIntCommas(document.getElementById('pbbtargetamountiron')
                .value);
            r[queueId].target_Astone = parseIntCommas(document.getElementById('pbbtargetamountaetherstone')
                .value);
            r[queueId].target_Gold = parseIntCommas(document.getElementById('pbbtargetamountgold')
                .value);
            r[queueId].trade_Food = parseIntCommas(document.getElementById('pbbtradeamountfood')
                .value);
            r[queueId].trade_Wood = parseIntCommas(document.getElementById('pbbtradeamountwood')
                .value);
            r[queueId].trade_Stone = parseIntCommas(document.getElementById('pbbtradeamountstone')
                .value);
            r[queueId].trade_Ore = parseIntCommas(document.getElementById('pbbtradeamountiron')
                .value);
            r[queueId].trade_Astone = parseIntCommas(document.getElementById('pbbtradeamountaetherstone')
                .value);
            r[queueId].trade_Gold = parseIntCommas(document.getElementById('pbbtradeamountgold')
                .value);
            t.showTradeRoutes();
        }, false);
    },
    saveTradeRoutes: function () {
        var t = Tabs.transport;
        var serverID = getServerId();
        GM_setValue('tradeRoutes_' + serverID, JSON2.stringify(t.tradeRoutes));
    },
    readTradeRoutes: function () {
        var t = Tabs.transport;
        var serverID = getServerId();
        s = GM_getValue('tradeRoutes_' + serverID);
        if (s != null) {
            route = JSON2.parse(s);
            for (k in route)
            t.tradeRoutes[k] = route[k];
        }
        try {
            t.checkcitymoved();
        } catch (e) {
            //Do nothing
        }
    },
    checkcitymoved: function () {
        var t = Tabs.transport;
        for (var i = 0; i < t.tradeRoutes.length; i++) {
            if (typeof t.tradeRoutes[i].target_city == 'undefined' || parseIntNan(t.tradeRoutes[i].target_city) == 0 || Cities.byID[t.tradeRoutes[i].target_city] == 'undefined') continue;
            if (t.tradeRoutes[i].target_x != Cities.byID[t.tradeRoutes[i].target_city].x) t.tradeRoutes[i].target_x = Cities.byID[t.tradeRoutes[i].target_city].x;
            if (t.tradeRoutes[i].target_y != Cities.byID[t.tradeRoutes[i].target_city].y) t.tradeRoutes[i].target_y = Cities.byID[t.tradeRoutes[i].target_city].y;
        }
    },
    saveTraderState: function () {
        var t = Tabs.transport;
        var serverID = getServerId();
        GM_setValue('traderState_' + serverID, JSON2.stringify(t.traderState));
    },
    readTraderState: function () {
        var t = Tabs.transport;
        var serverID = getServerId();
        s = GM_getValue('traderState_' + serverID);
        if (s != null) {
            state = JSON2.parse(s);
            for (k in state)
            t.traderState[k] = state[k];
        }
    },
    toggleTraderState: function (obj) {
        var t = Tabs.transport;
        if (t.traderState.running == true) {
            t.traderState.running = false;
            if (document.getElementById('pbTraderState')) document.getElementById('pbTraderState').value = "Transport = OFF";
            if (document.getElementById('TransportToggle')) document.getElementById('TransportToggle').value = "Transport = OFF";
        } else {
            t.traderState.running = true;
            if (document.getElementById('pbTraderState')) document.getElementById('pbTraderState').value = "Transport = ON";
            if (document.getElementById('TransportToggle')) document.getElementById('TransportToggle').value = "Transport = ON";
        }
    },
    
    doMarch: function(cityID,c){
        var t = Tabs.transport;
        for (var i=0;i<t.tradeRoutes.length;i++) if (parseInt(t.tradeRoutes[i]["city"]) == parseInt(cityID)) t.doTrades(i);
    },
    
  doTrades: function(count){
    var t = Tabs.transport;
       //if(t.tradeRoutes.length==0) return;
       var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.gold =0;
        params.r1 =0;
        params.r2 =0;
        params.r3 =0;
        params.r4 =0 ;
        params.r5 =0 ;
        params.kid = 0;
        
        var carry_amount= 0;
        var wagons_needed=0;
        var citymax = 0;
        var city = t.tradeRoutes[count]["city"];
        var cityID = 'city' + city;
        
        var xcoord = t.tradeRoutes[count]["target_x"];
        var ycoord = t.tradeRoutes[count]["target_y"];
        var trade_Food = t.tradeRoutes[count]["trade_Food"];
        var trade_Wood = t.tradeRoutes[count]["trade_Wood"];
        var trade_Stone = t.tradeRoutes[count]["trade_Stone"];
        var trade_Ore = t.tradeRoutes[count]["trade_Ore"];
        var trade_Astone = t.tradeRoutes[count]["trade_Astone"];
        var trade_Gold = t.tradeRoutes[count]["trade_Gold"];
        var target_Food = t.tradeRoutes[count]["target_Food"];
        var target_Wood = t.tradeRoutes[count]["target_Wood"];
        var target_Stone = t.tradeRoutes[count]["target_Stone"];
        var target_Ore = t.tradeRoutes[count]["target_Ore"];
        var target_Astone = t.tradeRoutes[count]["target_Astone"];
        var target_Gold = t.tradeRoutes[count]["target_Gold"];
        var ship_Food = t.tradeRoutes[count]["ship_Food"];
        var ship_Wood = t.tradeRoutes[count]["ship_Wood"];
        var ship_Stone = t.tradeRoutes[count]["ship_Stone"];
        var ship_Ore = t.tradeRoutes[count]["ship_Ore"];
        var ship_Astone = t.tradeRoutes[count]["ship_Astone"];
        var ship_Gold = t.tradeRoutes[count]["ship_Gold"];
        var citymax_Food = parseIntNan(Seed.resources[cityID]['rec1'][0] / 3600);
        var citymax_Wood = parseIntNan(Seed.resources[cityID]['rec2'][0] / 3600);
        var citymax_Stone = parseIntNan(Seed.resources[cityID]['rec3'][0] / 3600);
        var citymax_Ore = parseIntNan(Seed.resources[cityID]['rec4'][0] / 3600);
        var citymax_Astone = parseIntNan(Seed.resources[cityID]['rec5'][0]);
        var citymax_Gold = parseIntNan(Seed.citystats[cityID]['gold']);
        var carry_Food = parseIntNan(citymax_Food - target_Food);
        var carry_Wood = parseIntNan(citymax_Wood - target_Wood);
        var carry_Stone = parseIntNan(citymax_Stone - target_Stone);
        var carry_Ore = parseIntNan(citymax_Ore - target_Ore);
        var carry_Astone = parseIntNan(citymax_Astone - target_Astone);
        var carry_Gold = 0;
        if (carry_Food < 0 || ship_Food == false) carry_Food = 0;
        if (carry_Wood < 0 || ship_Wood == false) carry_Wood = 0;
        if (carry_Stone < 0 || ship_Stone == false) carry_Stone = 0;
        if (carry_Ore < 0 || ship_Ore == false) carry_Ore = 0;
        if (carry_Astone < 0 || ship_Astone == false) carry_Astone = 0;
        if (trade_Food > 0 && (carry_Food > trade_Food)) carry_Food = parseIntNan(trade_Food);
        if (trade_Wood > 0 && (carry_Wood > trade_Wood)) carry_Wood = parseIntNan(trade_Wood);
        if (trade_Stone > 0 && (carry_Stone > trade_Stone)) carry_Stone = parseIntNan(trade_Stone);
        if (trade_Ore > 0 && (carry_Ore > trade_Ore)) carry_Ore = parseIntNan(trade_Ore);
        if (trade_Astone > 0 && (carry_Astone > trade_Astone)) carry_Astone = parseIntNan(trade_Astone);
        carry_Astone *= 5; //Multiply by 5 to account for 5 times less carrying capacity
      
      if (t.tradeRoutes[count]['TroopType'] == undefined) var wagons = parseInt(Seed.units[cityID]['unt'+ 9]);
      else var wagons =  parseInt(Seed.units[cityID][t.tradeRoutes[count]['TroopType']]);
      var rallypointlevel = t.getRallypoint(cityID);    
          if (rallypointlevel == 11) rallypointlevel = 15;
          if (rallypointlevel == 12) rallypointlevel = 20;
        if (parseInt(wagons) > parseInt(rallypointlevel*10000)){ wagons = (rallypointlevel*10000); }
        
      if (t.tradeRoutes[count]['TroopType'] == undefined) var unit = 'unt9';
      else var unit = t.tradeRoutes[count]['TroopType'];
      var Troops = parseInt(Seed.units[cityID][unit]);
      if(parseInt(Troops)>parseInt(wagons)) Troops = wagons;
      var featherweight = parseInt(Seed.tech.tch10);
        var Load = parseInt(unsafeWindow.unitstats[unit]['5'])
      var maxloadperwagon = (featherweight * ((Load/100)*10)) + Load;
          var maxload = (maxloadperwagon * Troops);
          if(wagons <= 0) {return; }

           for (var t=0; t< Seed.cities.length;t++) {
               if ( parseInt(Seed.cities[t][0]) == city) var cityname = Seed.cities[t][1];
          }                     
        
          var shift_Food = parseIntNan(maxload / 9); //Total of 9 portions
          var shift_Wood = parseIntNan(maxload / 9);
          var shift_Stone = parseIntNan(maxload / 9);
          var shift_Ore = parseIntNan(maxload / 9);
          var shift_Astone = parseIntNan(maxload / 9 * 5); //Aetherstone takes 5 of 9 portions    
          if ((maxload - carry_Food - carry_Wood - carry_Stone - carry_Ore - carry_Astone) < 0){
             var shift_num=0;
             var shift_spare=0;
            
            // Check: See if load/4 is to big for some resources...
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
            if (carry_Astone < shift_Astone) {
                shift_spare += (shift_Astone - carry_Astone);
                shift_Astone = carry_Astone;
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
                } else {
                    shift_Wood = shift_Wood + shift_spare;
                    shift_spare = shift_spare - shift_spare;
                }
                if (carry_Stone < (shift_Stone + shift_spare)){
                    shift_spare = shift_spare - carry_Stone;
                    shift_Stone = carry_Stone;
                } else {
                    shift_Stone = shift_Stone + shift_spare;
                    shift_spare = shift_spare - shift_spare;
                }
                if (carry_Ore < (shift_Ore + shift_spare)) {
                    shift_spare = shift_spare - carry_Ore;
                    shift_Ore = carry_Ore;
                } else {
                    shift_Ore = shift_Ore + shift_spare;
                    shift_spare = shift_spare - shift_spare;
                }
                if (carry_Astone < (shift_Astone + shift_spare)) {
                    shift_spare = shift_spare - carry_Astone;
                    shift_Astone = carry_Astone;
                } else {
                    shift_Astone = shift_Astone + shift_spare;
                    shift_spare = shift_spare - shift_spare;
                }
            }
            carry_Food = shift_Food;
            carry_Wood = shift_Wood;
            carry_Stone = shift_Stone;
            carry_Ore = shift_Ore;
            carry_Astone = shift_Astone;
        }
        if (maxload > (carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Astone) && ship_Gold == true) {
            if ((maxload - (carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Astone)) > (citymax_Gold - target_Gold)) {
                carry_Gold = (citymax_Gold - target_Gold);
                if (carry_Gold < 0) carry_Gold = 0;
            } else carry_Gold = (maxload - (carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Astone));
            if (trade_Gold > 0 && (carry_Gold > trade_Gold)) carry_Gold = parseInt(trade_Gold);
        }
        wagons_needed = ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Astone + carry_Gold) / maxloadperwagon);
        wagons_needed = wagons_needed.toFixed(0);
        if (wagons_needed < ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Astone + carry_Gold) / maxloadperwagon)) wagons_needed++;
        if (wagons_needed < Options.minwagons) {
            if (DEBUG_TRACE) logit('Small transport skipped');
            return;
        }   
        for (var i=1;i<=15;i++) params['u'+i] = 0;     
        switch (unit){
		      case 'unt1': params.u1 = wagons_needed;break;
		      case 'unt2': params.u2 = wagons_needed;break;
		      case 'unt3': params.u3 = wagons_needed;break;
		      case 'unt4': params.u4 = wagons_needed;break;
		      case 'unt5': params.u5 = wagons_needed;break;
		      case 'unt6': params.u6 = wagons_needed;break;
		      case 'unt7': params.u7 = wagons_needed;break;
		      case 'unt8': params.u8 = wagons_needed;break;
		      case 'unt9': params.u9 = wagons_needed;break;
		      case 'unt10': params.u10 = wagons_needed;break;
		      case 'unt11': params.u11 = wagons_needed;break;
		      case 'unt12': params.u12 = wagons_needed;break;
		}
        
        if ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Astone + carry_Gold) > 0) {
        	for (i=1;i<=Seed.cities.length;i++) if (Seed.cities[i-1][0] == city) cityNumber = i;
        	var astone = parseInt(carry_Astone/5);
        	var now = unixTime();
        	Options.lastCityTransport[cityNumber] = now;
        	MarchQueue[cityNumber].push ({
				what: 			"Transport",
				city: 			city,
				action: 		1,
				targetX: 		xcoord,
				targetY: 		ycoord,
				1: 				params.u1,
				2: 				params.u2,
				3: 				params.u3,
				4: 				params.u4,
				5: 				params.u5,
				6: 				params.u6,
				7: 				params.u7,
				8: 				params.u8,
				9: 				params.u9,
				10: 			params.u10,
				11: 			params.u11,
				12: 			params.u12,
				13: 			params.u13,
				14: 			params.u14,
				15: 			params.u15,
				r1: 			carry_Food,
				r2: 			carry_Wood,
				r3: 			carry_Stone,
				r4: 			carry_Ore,
				r5: 			astone,
				gold: 			carry_Gold,
	        });
        }
    },
    
    ManualTransport: function(){
	    var t = Tabs.transport;
	    if (document.getElementById ('ptcityX').value == "" || document.getElementById ('ptcityY').value == "") return;
	    if ( t.TroopsNeeded > t.Troops) return;
	    
	    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	    var unitType = document.getElementById('TransportTroop').value;
	    var LoadUnit = (parseInt(Seed.tech.tch10) * ((parseInt(unsafeWindow.unitstats[unitType]['5'])/100)*10)) + parseInt(unsafeWindow.unitstats[unitType]['5']);
	    var MaxLoad =  parseInt(Seed.units['city' + t.tcp.city.id][unitType]) * LoadUnit;
	    document.getElementById ('errorSpace').innerHTML = '';
	          
	    params.kid = 0;
	    params.cid=  t.tcp.city.id;
	    params.type = "1";
	    params.xcoord = parseInt(document.getElementById ('ptcityX').value);
	    params.ycoord = parseInt(document.getElementById ('ptcityY').value);
	    params.r1 = parseInt(document.getElementById ('pbtradeamountFood').value);
	    params.r2 = parseInt(document.getElementById ('pbtradeamountWood').value);
	    params.r3 = parseInt(document.getElementById ('pbtradeamountStone').value);
	    params.r4 = parseInt(document.getElementById ('pbtradeamountOre').value);
	    params.r5 = parseInt(document.getElementById ('pbtradeamountAstone').value);
	    params.gold = parseInt(document.getElementById ('pbtradeamountGold').value);
	        
	    switch (unitType){
	      case 'unt1': params.u1 = parseInt(document.getElementById ('TroopsToSend').value);break;
	      case 'unt2': params.u2 = parseInt(document.getElementById ('TroopsToSend').value);break;
	      case 'unt3': params.u3 = parseInt(document.getElementById ('TroopsToSend').value);break;
	      case 'unt4': params.u4 = parseInt(document.getElementById ('TroopsToSend').value);break;
	      case 'unt5': params.u5 = parseInt(document.getElementById ('TroopsToSend').value);break;
	      case 'unt6': params.u6 = parseInt(document.getElementById ('TroopsToSend').value);break;
	      case 'unt7': params.u7 = parseInt(document.getElementById ('TroopsToSend').value);break;
	      case 'unt8': params.u8 = parseInt(document.getElementById ('TroopsToSend').value);break;
	      case 'unt9': params.u9 = parseInt(document.getElementById ('TroopsToSend').value);break;
	      case 'unt10': params.u10 = parseInt(document.getElementById ('TroopsToSend').value);break;
	      case 'unt11': params.u11 = parseInt(document.getElementById ('TroopsToSend').value);break;
	      case 'unt12': params.u12 = parseInt(document.getElementById ('TroopsToSend').value);break;
	    }
	    if ((params.r1 + params.r2 + params.r3 + params.r4 + params.r5 + params.gold) > 0) {
	                 
	        var profiler = new unsafeWindow.cm.Profiler("ResponseTime", "march.php");
	        new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
	                  method: "post",
	                  parameters: params,
	                  loading: true,
	                  onSuccess: function (transport) {
						  profiler.stop();
	                  var rslt = eval("(" + transport.responseText + ")");
	                  if (rslt.ok) {                  
	                          var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
	                          var ut = unixTime();
	                          var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
	                          for(i = 0; i <= unitsarr.length; i++){
	                              if(params["u"+i]){
	                              unitsarr[i] = params["u"+i];
	                              }
	                          }
	                          var resources=new Array();
	                          resources[0] = params.gold;
	                          for(i=1; i<=5; i++){
	                              resources[i] = params["r"+i];
	                          }
	                          var currentcityid = t.tcp.city.id;
	                          unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
	                          if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
	                          document.getElementById ('errorSpace').innerHTML = 'Send: ' + addCommas(params.r1+params.r2+params.r3+params.r4+params.r5+params.gold) + ' Resources with ' + addCommas(parseInt(document.getElementById ('TroopsToSend').value)) + ' ' + unsafeWindow.unitcost[unitType][0];
	                          document.getElementById ('pbtradeamountFood').value = 0;
	                          document.getElementById ('pbtradeamountWood').value = 0;
	                          document.getElementById ('pbtradeamountStone').value = 0;
	                          document.getElementById ('pbtradeamountOre').value = 0;
	                          document.getElementById ('pbtradeamountAstone').value = 0;
	                          document.getElementById ('pbtradeamountGold').value = 0;
	                          document.getElementById ('TroopsToSend').value = 0;
	                  } else {
						    if (rslt.user_action == "backOffWaitTime") {
							logit('backoffwaittime '+rslt.wait_time);
	                        var wait = 1;
	                        if(rslt.wait_time)
	                        wait = rslt.wait_time;
	                        setTimeout (function(){t.ManualTransport();}, wait*1000);
	                        document.getElementById ('errorSpace').innerHTML = '<HR><FONT COLOR=red>'+translate("Error:")+' ' + 'kabam making us wait for '+wait+' seconds then retry march' +'</font>';
	                        return;
						  };
	                          var errorcode =  'err_' + rslt.error_code;
	                          if (rslt.msg == undefined)document.getElementById ('errorSpace').innerHTML = '<HR><FONT COLOR=red>'+translate("Error:")+' ' + unsafeWindow.g_js_strings.errorcode[errorcode] +'</font>';
	                          else document.getElementById ('errorSpace').innerHTML = '<HR><FONT COLOR=red>'+translate("Error:")+' ' + rslt.msg +'</font>';
	                  }
	                  },
	                  onFailure: function () {profiler.stop();}
	        });
	    }
    },
    show: function () {
        var t = Tabs.transport;
        if (t.traderState.running) document.getElementById('pbTraderState').value = "Transport = ON";
        	else document.getElementById('pbTraderState').value = "Transport = OFF";
        clearTimeout(t.timer);
        t.updateTroops();
        t.updateResources();
        t.timer = setTimeout(t.show, 1000);
    },
    hide: function () {
        var t = Tabs.transport;
        clearTimeout(t.timer);
    },
    onUnload: function () {
        var t = Tabs.transport;
        if (!ResetAll) t.saveTradeRoutes();
        if (!ResetAll) t.saveTraderState();
    },
}


/*********************************  Raid Tab ***********************************/

 Tabs.Raid = {
  tabDisabled : false,
  tabOrder : 110,
  myDiv : null,
  rallypointlevel:null,
  knt:{},
  Troops:{},
  city:0,
  raidtimer:null,
  rslt:{},
  save:{},
  stopping:false,
  resuming:false,
  deleting:false,
  stopprogress:0,
  stopcount:0,
  activecount:0,
  count:0,
  
  init : function (div){
    var t = Tabs.Raid;
    t.myDiv = div;
    t.raidtimer = setTimeout(t.checkRaids, 30000);

    var m = '<DIV class=pbStat>RAID FUNCTIONS</div><TABLE width=100% height=0% class=pbTab><TR align="center">';
        m += '<TD><INPUT id=pbRaidStart type=submit value="Auto Reset = '+ (Options.RaidRunning?'ON':'OFF') +'" ></td>';
        m += '<TD><INPUT id=pbsendraidreport type=checkbox '+ (Options.foodreport?'CHECKED':'') +'\> Send raid report every ';
        m += '<INPUT id=pbsendreportint value='+ Options.MsgInterval +' type=text size=3 \> hours </td>';
        m += '</tr></table></div>';
        m += '<DIV class=pbStat>ACTIVE RAIDS</div><TABLE width=100% height=0% class=pbTab><TR align="center">';
        m += '<TD><DIV style="margin-bottom:10px;"><span id=ptRaidCity></span></div></td></tr>';
        m+='<TR><TD><DIV style="margin-bottom:10px;"><span id=ptRaidTimer></span></div></td></tr></table>';
        m += '<DIV id=PaintRaids></div>';
        m += '<DIV class=pbStat>SAVED RAIDS</div><TABLE width=100% height=0% class=pbTab><TR align="center">';
        m += '<DIV id=SavedRaids></div>';
    t.myDiv.innerHTML = m;
    
    t.from = new CdispCityPicker ('ptRaidpicker', document.getElementById('ptRaidCity'), true, t.clickCitySelect, 0);
    document.getElementById('pbRaidStart').addEventListener('click', t.toggleRaidState, false);
    document.getElementById('pbsendraidreport').addEventListener('change', function(){
        Options.foodreport = document.getElementById('pbsendraidreport').checked;
        saveOptions();
    }, false);
    document.getElementById('pbsendreportint').addEventListener('change', function(){
        Options.MsgInterval = parseInt(document.getElementById('pbsendreportint').value);
        saveOptions();
    }, false);
    
    var serverID = getServerId();
    t.save = GM_getValue ('SavedRaids_'+serverID);
    if (t.save != undefined) t.save = JSON2.parse (t.save);
    
  },
 
  paint : function ()    {
      var t = Tabs.Raid;
      var botMarchStat = {0:'Inactive',
                          1:'Raiding',
                          2:'Returning',
                          3:'Stopped',
                          4:'Resting',
                          5:'Unknown',
                          7:'Situation Changed',
                          8:'Returning',
                          9:'Aborting'};
      var botStat = {0:'Undefined',
                          1:'Marching',
                          2:'Returning',
                          3:'Stopped',
                          4:'Insufficient Troops',
                          5:'Max Raids Exceeded',
                          7:'Timed out',
                          8:'Resting'};
      var o = '';
      if (t.rslt.settings != undefined) o+= '<FONT size=2px><B>Raid Timer: '+ timestr( 86400 - ( unixTime() - t.rslt.settings.lastUpdated )) +'</b></font>';
      document.getElementById('ptRaidTimer').innerHTML = o;
      
      var z ='<TABLE class=pbTab><TR><TD width=60px align=center><A onclick="pbStopAll('+t.cityId+')">STOP</a></td><TD width=70px>Time</td><TD width=85px>Coords</td><TD width=50px>Level</td><TD width=50px></td><TD width=50px><A onclick="pbDeleteAll()">DELETE</a></td></TR>';
      if (t.rslt['queue'] != ""){
          for (y in t.rslt['queue']) {
              if (t.rslt['queue'][y]['botMarches'] != undefined) {
                  for (k in Seed.queue_atkp['city' + t.cityId]){
                      if (Seed.queue_atkp['city' + t.cityId][k]['marchId'] == t.rslt['queue'][y]['botMarches']['marchId']) {
                          botMarchStatus = Seed.queue_atkp['city' + t.cityId][k]['botMarchStatus'];
                          MarchStatus = Seed.queue_atkp['city' + t.cityId][k]['marchStatus'];
                          restPeriod = (Seed.queue_atkp['city' + t.cityId][k]['restPeriod']/60);
                          destinationUnixTime = Seed.queue_atkp['city' + t.cityId][k]['destinationUnixTime'];
                          returnUnixTime = Seed.queue_atkp['city' + t.cityId][k]['returnUnixTime']
                          now = unixTime();
                          //z+='<TR><TD>('+ botMarchStatus +'/'+ MarchStatus +')</td>';
                          z+='<TR>';
                          //if (destinationUnixTime > now && botMarchStatus !=3) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg></td>';
                          if (MarchStatus ==1) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg></td>';
                          //if ((destinationUnixTime - now) <= 0 && botMarchStatus !=3 && returnUnixTime > now) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg></td>';
                          if (MarchStatus ==8 && (destinationUnixTime - now) <= 0 && botMarchStatus !=3 && returnUnixTime > now) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg></td>';
                          if (MarchStatus == 3) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_stopped_desat.png></td>';
                          //if (returnUnixTime < now  && botMarchStatus !=3) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_resting.png></td>';
                          if (MarchStatus == 4 || (returnUnixTime < now  && botMarchStatus !=3)) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_resting.png></td>';
                          
                          if (destinationUnixTime >= now) z+='<TD>'+ timestr(Seed.queue_atkp['city' + t.cityId][k]['destinationUnixTime'] - unixTime())+'</td>';
                          if (destinationUnixTime <= now) {
                              if ((destinationUnixTime - now) <= 0 && returnUnixTime > now) z+='<TD>'+ timestr(returnUnixTime - now)+'</td>';
                              if (returnUnixTime <= now) z+='<TD>'+ timestr(now - returnUnixTime)+'</td>';
                          }
                      }
                  }
                  z+='<TD>('+ t.rslt['queue'][y]['botMarches']['toXCoord'] +','+ t.rslt['queue'][y]['botMarches']['toYCoord']+')</td>';
                  z+='<TD align=center>'+ t.rslt['queue'][y]['botMarches']['toTileLevel'] +'</td>';
                  if (botMarchStatus == 3) z+='<TD><A onclick="pbEditRaid('+ y +')">Edit</a></td>';
                      else z+='<TD><FONT COLOR= "CCCCCC">Edit</font></td>';
                  if (botMarchStatus == 3) z+='<TD align=center><A onclick="pbDeleteRaid('+ t.rslt['queue'][y]['botMarches']['marchId']+')">Delete</a></td>';
                  else z+='<TD align=center><FONT COLOR= "CCCCCC">Delete</font></td>';
                  //z +='<TD width=25px></td><TD>Status: '+ botMarchStat[botMarchStatus]+'</td>';
                  z +='<TD width=25px></td><TD>Rest Time: '+ timestr(restPeriod) +'</td>';
                  z+='</tr>';
              }
          }
      }
      z+='</table>';
      if (t.rslt['queue'] == "") z ='<TABLE class=pbTab><TR><TD>No Raids in city!</td></TR>';
      document.getElementById('PaintRaids').innerHTML = z;
      
      var check = true;
          if (t.save != ""){
              var a ='<TABLE class=pbTab><TR><TD width=60px></td><TD width=70px></td><TD width=85px>Coords</td><TD width=50px>Level</td><TD width=50px></td><TD width=50px></td></tr>';
              for (y in t.save){
                  if (t.save[y] != undefined && t.cityId == t.save[y]['cityId']){
                      a +='<TR><TD align=center><A onclick="pbDeleteSavedRaid('+ t.save[y]['marchId'] +')">X</a></td>';
                      a +='<TD></td><TD><FONT COLOR= "CC0000">('+t.save[y]['toXCoord']+','+t.save[y]['toYCoord']+')</font></td>';
                      a +='<TD align=center>'+t.save[y]['toTileLevel']+'</td>';
                      a +='<TD><A onclick="pbEditSavedRaid('+ y +')">Edit</a></td>';
                      a +='<TD align=center><A onclick="pbAddRaid('+ t.save[y]['marchId']+')">Add</a></td></tr>';
                      check = false;
                  }    
              }
              m+='</table>';
          }
          
      if (check) a ='<TABLE class=pbTab><TR><TD>No Saved Raids in city!</td></TR>';
      
      document.getElementById('SavedRaids').innerHTML = a;      
      
      unsafeWindow.pbDeleteRaid = t.DeleteRaid;
      unsafeWindow.pbEditRaid = t.EditRaid;
      unsafeWindow.pbAddRaid = t.AddRaid;
      unsafeWindow.pbDeleteSavedRaid = t.DeleteSavedRaid;
      unsafeWindow.pbEditSavedRaid = t.EditSavedRaid;
      unsafeWindow.pbStopAll = t.StopCityRaids;
      unsafeWindow.pbDeleteAll = t.DeleteCityRaids;
  },
  
  DeleteSavedRaid : function (Id){
          var t = Tabs.Raid;
          for (yy=0;yy<t.save.length;yy++){
              if (t.save[yy]['marchId'] == Id){
                    t.save.splice (yy,1);
              }    
          }
          var serverID = getServerId();
          setTimeout (function (){GM_setValue ('SavedRaids_'+serverID, JSON2.stringify(t.save));}, 0);
          t.paint();
    },
  
  EditSavedRaid : function (y){
      var t = Tabs.Raid;
      var pop = new pbPopup ('pbEditRaid', 0,0, 750,350, true);
      if (t.popFirst){
        pop.centerMe (mainPop.getMainDiv());  
        t.popFirst = false;
      }
      pop.getTopDiv().innerHTML = '<CENTER><B>Edit Saved Raid</b></center>';
      cityId =  t.save[y]['cityId'];
      
          var m = '<BR><TABLE id=pbRaidAdd height=0% class=pbTab><TR align="center">';
          m+='<TR></tr><TR><TD width=25px>X= <INPUT id=toXCoord type=text size=3 maxlength=3 value='+t.save[y]['toXCoord']+'></td>';
          m+='<TD width=10px></td><TD widht=25px>Y= <INPUT id=toYCoord type=text size=3 maxlength=3 value='+ t.save[y]['toYCoord'] +'></td>';
          m+='<TD width=25px></td><TD>Round Trip: '+ timestr((t.save[y]['returnUnixTime'] - t.save[y]['destinationUnixTime'])*2)+ '</td></tr></table>';

          m += '<BR><TABLE id=pbRaidAdd width=100% height=0% class=pbTab><TR align="center">';
          m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_50.jpg?6545"></td>';
          m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt1']) +'</td>'
          m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_50.jpg?6545"></td>'
          m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt2']) +'</td>'
          m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_50.jpg?6545"></td>'
          m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt3']) +'</td>'
          m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_50.jpg?6545"></td>'
          m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt4']) +'</td></tr>'
          m += '<TR><TD><INPUT id=Unit1 type=text size=6 maxlength=6 value="'+ t.save[y]['unit1Count']+'"></td>';
          m += '<TD><INPUT id=Unit2 type=text size=6 maxlength=6 value="'+ t.save[y]['unit2Count']+'"></td>';
          m += '<TD><INPUT id=Unit3 type=text size=6 maxlength=6 value="'+ t.save[y]['unit3Count']+'"></td>';
          m += '<TD><INPUT id=Unit4 type=text size=6 maxlength=6 value="'+ t.save[y]['unit4Count']+'"></td></tr>';
          
          m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_50.jpg?6545"></td>';
          m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt5']) +'</td>'
          m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545"></td>'
          m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt6']) +'</td>'
          m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_50.jpg?6545"></td>'
          m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt7']) +'</td>'
          m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_50.jpg?6545"></td>'
          m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt8']) +'</td></tr>'
          m += '<TR><TD><INPUT id=Unit5 type=text size=6 maxlength=6 value="'+ t.save[y]['unit5Count']+'"></td>';
          m += '<TD><INPUT id=Unit6 type=text size=6 maxlength=6 value="'+ t.save[y]['unit6Count']+'"></td>';
          m += '<TD><INPUT id=Unit7 type=text size=6 maxlength=6 value="'+ t.save[y]['unit7Count']+'"></td>';
          m += '<TD><INPUT id=Unit8 type=text size=6 maxlength=6 value="'+ t.save[y]['unit8Count']+'"></td></tr>';
          
          m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_50.jpg?6545"></td>';
          m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt9']) +'</td>'
          m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_50.jpg?6545"></td>'
          m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt10']) +'</td>'
          m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_50.jpg?6545"></td>'
          m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt11']) +'</td>'
          m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_50.jpg?6545"></td>'
          m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt12']) +'</td></tr>'
          m += '<TR><TD><INPUT id=Unit9 type=text size=6 maxlength=6 value="'+ t.save[y]['unit9Count']+'"></td>';
          m += '<TD><INPUT id=Unit10 type=text size=6 maxlength=6 value="'+ t.save[y]['unit10Count']+'"></td>';
          m += '<TD><INPUT id=Unit11 type=text size=6 maxlength=6 value="'+ t.save[y]['unit11Count']+'"></td>';
          m += '<TD><INPUT id=Unit12 type=text size=6 maxlength=6 value="'+ t.save[y]['unit12Count']+'"></td></tr></table>';
          
          m += '<BR><CENTER><SELECT id=AddKnights type=list></select></center>';
          m+= '<BR><CENTER>'+ strButton20('Save', 'id=pbSaveRaid') +'</center>';
            
      pop.getMainDiv().innerHTML = m;
      
      t.getKnights(cityId);
      
      document.getElementById ('AddKnights').value =  t.save[y]['knightId'];
      document.getElementById ('pbSaveRaid').addEventListener ('click', function(){
                  t.save[y]['knightId'] = parseInt(document.getElementById ('AddKnights').value);
                  t.save[y]['toXCoord'] = parseInt(document.getElementById ('toXCoord').value);
                  t.save[y]['toYCoord'] = parseInt(document.getElementById ('toYCoord').value);
                  t.save[y]['unit1Count'] = parseInt(document.getElementById ('Unit1').value);
                  t.save[y]['unit2Count'] = parseInt(document.getElementById ('Unit2').value);
                  t.save[y]['unit3Count'] = parseInt(document.getElementById ('Unit3').value);
                  t.save[y]['unit4Count'] = parseInt(document.getElementById ('Unit4').value);
                  t.save[y]['unit5Count'] = parseInt(document.getElementById ('Unit5').value);
                  t.save[y]['unit6Count'] = parseInt(document.getElementById ('Unit6').value);
                  t.save[y]['unit7Count'] = parseInt(document.getElementById ('Unit7').value);
                  t.save[y]['unit8Count'] = parseInt(document.getElementById ('Unit8').value);
                  t.save[y]['unit9Count'] = parseInt(document.getElementById ('Unit9').value);
                  t.save[y]['unit10Count'] = parseInt(document.getElementById ('Unit10').value);
                  t.save[y]['unit11Count'] = parseInt(document.getElementById ('Unit11').value);
                  t.save[y]['unit12Count'] = parseInt(document.getElementById ('Unit12').value);
                  var serverID = getServerId();
                  setTimeout (function (){GM_setValue ('SavedRaids_'+serverID, JSON2.stringify(t.save));}, 0);
                  pop.show (false);
      }, false);
      
      pop.show (true);      
    },
      
  EditRaid : function (y){
        var t = Tabs.Raid;
        var pop = new pbPopup ('pbEditRaid', 0,0, 750,350, true);
        if (t.popFirst){
          pop.centerMe (mainPop.getMainDiv());  
          t.popFirst = false;
        }
        pop.getTopDiv().innerHTML = '<CENTER><B>Edit Raid</b></center>';
        cityId = t.rslt['queue'][y]['botMarches']['cityId'];
        
            var m = '<BR><TABLE id=pbRaidAdd height=0% class=pbTab><TR align="center">';
            m+='<TR></tr><TR><TD width=25px>X= <INPUT id=toXCoord type=text size=3 maxlength=3 value='+t.rslt['queue'][y]['botMarches']['toXCoord']+'></td>';
            m+='<TD width=10px></td><TD widht=25px>Y= <INPUT id=toYCoord type=text size=3 maxlength=3 value='+ t.rslt['queue'][y]['botMarches']['toYCoord'] +'></td>';
            m+='<TD width=25px></td><TD>Round Trip: '+ timestr((t.rslt['queue'][y]['botMarches']['returnUnixTime'] - t.rslt['queue'][y]['botMarches']['destinationUnixTime'])*2)+ '</td></tr></table>';

            m += '<BR><TABLE id=pbRaidAdd width=100% height=0% class=pbTab><TR align="center">';
            m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_50.jpg?6545"></td>';
            m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt1']) +'</td>'
            m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_50.jpg?6545"></td>'
            m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt2']) +'</td>'
            m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_50.jpg?6545"></td>'
            m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt3']) +'</td>'
            m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_50.jpg?6545"></td>'
            m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt4']) +'</td></tr>'
            m += '<TR><TD><INPUT id=Unit1 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit1Count']+'"></td>';
            m += '<TD><INPUT id=Unit2 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit2Count']+'"></td>';
            m += '<TD><INPUT id=Unit3 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit3Count']+'"></td>';
            m += '<TD><INPUT id=Unit4 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit4Count']+'"></td></tr>';
            
            m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_50.jpg?6545"></td>';
            m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt5']) +'</td>'
            m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545"></td>'
            m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt6']) +'</td>'
            m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_50.jpg?6545"></td>'
            m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt7']) +'</td>'
            m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_50.jpg?6545"></td>'
            m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt8']) +'</td></tr>'
            m += '<TR><TD><INPUT id=Unit5 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit5Count']+'"></td>';
            m += '<TD><INPUT id=Unit6 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit6Count']+'"></td>';
            m += '<TD><INPUT id=Unit7 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit7Count']+'"></td>';
            m += '<TD><INPUT id=Unit8 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit8Count']+'"></td></tr>';
            
            m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_50.jpg?6545"></td>';
            m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt9']) +'</td>'
            m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_50.jpg?6545"></td>'
            m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt10']) +'</td>'
            m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_50.jpg?6545"></td>'
            m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt11']) +'</td>'
            m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_50.jpg?6545"></td>'
            m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt12']) +'</td></tr>'
            m += '<TR><TD><INPUT id=Unit9 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit9Count']+'"></td>';
            m += '<TD><INPUT id=Unit10 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit10Count']+'"></td>';
            m += '<TD><INPUT id=Unit11 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit11Count']+'"></td>';
            m += '<TD><INPUT id=Unit12 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit12Count']+'"></td></tr></table>';
            
            m += '<BR><CENTER><SELECT id=AddKnights type=list></select></center>';
            m+= '<BR><CENTER>'+ strButton20('Save', 'id=pbRaidSave') +'</center>';
              
        pop.getMainDiv().innerHTML = m;
        
        t.getKnights(cityId);
        
        document.getElementById ('AddKnights').value =  t.rslt['queue'][y]['botMarches']['knightId'];
        document.getElementById ('pbRaidSave').addEventListener ('click', function(){
            var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
                              
            params.pf = 0;
            params.ctrl = 'BotManager';
            params.action = 'editMarch';
            params.settings = {};
            params.settings.cityId = t.rslt['queue'][y]['botMarches']['fromCityId'];
            params.queue = {0:{botMarches:{botMarchStatus:1,botState:1},cityMarches:{}}};        
            params.queue[0].cityMarches.knightId = parseInt(document.getElementById ('AddKnights').value);
            params.queue[0].cityMarches.toXCoord =  parseInt(document.getElementById ('toXCoord').value);
            params.queue[0].cityMarches.toYCoord =  parseInt(document.getElementById ('toYCoord').value);
            params.queue[0].cityMarches.unit0Count = 0; //document.getElementById ('Unit0').value;
            params.queue[0].cityMarches.unit1Count =  parseInt(document.getElementById ('Unit1').value);
            params.queue[0].cityMarches.unit2Count = parseInt(document.getElementById ('Unit2').value);
            params.queue[0].cityMarches.unit3Count = parseInt(document.getElementById ('Unit3').value);
            params.queue[0].cityMarches.unit4Count = parseInt(document.getElementById ('Unit4').value);
            params.queue[0].cityMarches.unit5Count = parseInt(document.getElementById ('Unit5').value);
            params.queue[0].cityMarches.unit6Count = parseInt(document.getElementById ('Unit6').value);
            params.queue[0].cityMarches.unit7Count = parseInt(document.getElementById ('Unit7').value);
            params.queue[0].cityMarches.unit8Count = parseInt(document.getElementById ('Unit8').value);
            params.queue[0].cityMarches.unit9Count = parseInt(document.getElementById ('Unit9').value);
            params.queue[0].cityMarches.unit10Count = parseInt(document.getElementById ('Unit10').value);
            params.queue[0].cityMarches.unit11Count = parseInt(document.getElementById ('Unit11').value);
            params.queue[0].cityMarches.unit12Count = parseInt(document.getElementById ('Unit12').value);
            params.queue[0].cityMarches.marchId =  t.rslt['queue'][y]['botMarches']['marchId'];
            
            RPM++;
             new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
                            method: "post",
                           parameters: params,
                           loading: true,
                           onSuccess: function(transport){
                              var rslt = eval("(" + transport.responseText + ")");
                                if (rslt.ok) {
                                        pop.show (false);
                                      unsafeWindow.cityinfo_army();
                                    setTimeout(unsafeWindow.update_seed_ajax, 250);
                                    setTimeout(t.GetRaids, (750),Seed.cities[i][0]);
                                  }
                           },
                   });
            }, false);
        
        pop.show (true);      
  },
  
  DeleteRaid : function (Id){
      var t = Tabs.Raid;
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      
      for (y in t.rslt['queue']) {
          if (t.rslt['queue'][y]['botMarches'] != undefined) {
              if (t.rslt['queue'][y]['botMarches']['marchId'] == Id) {
                      marchId = t.rslt['queue'][y]['botMarches']['marchId'];
                      cityId = t.rslt['queue'][y]['botMarches']['cityId'];
                      knightId = t.rslt['queue'][y]['botMarches']['knightId'];
                      toTileLevel = t.rslt['queue'][y]['botMarches']['toTileLevel'];
                      returnUnixTime = t.rslt['queue'][y]['botMarches']['returnUnixTime'];
                      destinationUnixTime = t.rslt['queue'][y]['botMarches']['destinationUnixTime'];
                      toXCoord = t.rslt['queue'][y]['botMarches']['toXCoord'];
                      toYCoord = t.rslt['queue'][y]['botMarches']['toYCoord'];
                      var units = {};
                      for (i=1;i<13;i++) units[i] = t.rslt['queue'][y]['botMarches']['unit'+i+'Count'];
              }
          }
      }    
      
      params.pf = 0;
      params.ctrl = 'BotManager';
      params.action = 'deleteMarch';
      params.marchId = marchId;
      params.settings = {};
      params.settings.cityId = cityId;

      RPM++;
      
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
               method: "post",
               parameters: params,
               loading: true,
               onSuccess: function(transport){
                  var rslt = eval("(" + transport.responseText + ")");
                    if (rslt.ok) {
                          var serverID = getServerId();
                          t.save = GM_getValue ('SavedRaids_'+serverID);
                          if (t.save == undefined) t.save =new Array();
                      else t.save = JSON2.parse (t.save);
                      
                          t.save.push ({
                              marchId:        marchId,
                              cityId:           cityId,
                              knightId:        knightId,
                              toTileLevel:    toTileLevel,
                              returnUnixTime:    destinationUnixTime,
                              returnUnixTime:    returnUnixTime,
                              toXCoord:        toXCoord,
                              toYCoord:        toYCoord,
                              unit1Count:     units[1],
                              unit2Count:     units[2],
                              unit3Count:     units[3],
                              unit4Count:     units[4],
                              unit5Count:     units[5],
                              unit6Count:     units[6],
                              unit7Count:     units[7],
                              unit8Count:     units[8],
                              unit9Count:     units[9],
                              unit10Count:     units[10],
                              unit11Count:     units[11],
                              unit12Count:     units[12],
                          });
                          var troops = Seed.units["city" + cityId];
                      for (var u = 1; u <= 12; ++u) {
                          var troop_number = parseInt(rslt["unit" + u + "Return"]);
                          if (isNaN(troop_number)) {
                              troop_number = parseInt(Seed.units["city" + cityId]["unt" + u]);
                          } else troop_number = parseInt(rslt["unit" + u + "Return"]) + parseInt(Seed.units["city" + cityId]["unt" + u]);
                          troops["unt" + u] = troop_number;
                      }
                      for (u in Seed.queue_atkp['city' + cityId]){
                          if (Seed.queue_atkp['city' + cityId][u]['marchId'] == marchId){
                            Seed.queue_atkp['city' + cityId][u] = "";
                              unsafeWindow.seed.queue_atkp['city' + cityId] = Seed.queue_atkp['city' + cityId];
                          }
                      }
                      
                      for (u in Seed.knights['city' + cityId]){
                          if (Seed.knights['city' + cityId][u]['knightId'] == knightId){
                              Seed.knights['city' + cityId][u]["knightStatus"] = 1;
                              unsafeWindow.seed.knights['city' + cityId] = Seed.knights['city' + cityId];
                          }
                      }
                                                      
                          GM_setValue ('SavedRaids_'+serverID, JSON2.stringify(t.save));
                          t.save = null;
                      unsafeWindow.cityinfo_army();
                        setTimeout(unsafeWindow.update_seed_ajax, 250);
                        t.GetRaids(cityId);
                      }
               },
       });
},
  
  StopCityRaids : function (cityId){
        var t = Tabs.Raid;
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);

        
        params.pf = 0;
        params.ctrl = 'BotManager';
        params.action = 'stopAll';
        params.settings = {};

          params.settings.cityId = cityId;
          RPM++;     
         new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
                      method: "post",
                     parameters: params,
                     loading: true,
                     onSuccess: function(transport){
                        var rslt = eval("(" + transport.responseText + ")");
                          if (rslt.ok) {
                                  
                          }
                     },
             });   
    setTimeout(t.GetRaids, (750), cityId);     
    },
  
  StopAllRaids : function (){
          var t = Tabs.Raid;
          if (t.stopping == true || t.resuming == true || t.deleting == true) return;
          if (t.activecount == 0) return;
        t.stopping = true;     
              for (i=0;i<Seed.cities.length;i++){
                  setTimeout(t.DoAllStop, (i*1500),i);
             }
   },
   
   ResumeAllRaids : function (){
           var t = Tabs.Raid;
           if (t.stopping == true || t.resuming == true || t.deleting == true) return;
           if (t.stopcount == 0) return;
           t.resuming = true;
               for (i=0;i<Seed.cities.length;i++){
                   setTimeout(t.DoAllResume, (i*1500),i);
               }
    },
   
   
   DeleteAllRaids : function (){
           var t = Tabs.Raid;
           if (t.stopping == true || t.resuming == true || t.deleting == true) return;
           if (t.stopcount == 0) return;
           t.deleting = true;
           count=0;
           t.count = t.stopcount;
                for (d=0; d< Seed.cities.length;d++) {
                        cityID = 'city' + Seed.cities[d][0];    
                            for (e in Seed.queue_atkp[cityID]){
                                destinationUnixTime = Seed.queue_atkp[cityID][e]['destinationUnixTime'];
                                MarchStatus = Seed.queue_atkp[cityID][e]['marchStatus'];
                                MarchType = Seed.queue_atkp[cityID][e]['marchType'];
                                if (MarchType == 9 && (botMarchStatus == 3 || MarchStatus == 3)) {
                                    count++;
                                    setTimeout(t.DoAllDelete, (count*1250), (Seed.queue_atkp[cityID][e]['marchId']),d,count);
                                }
                            }
                }
    },
    
  
  DoAllStop: function(i) {
    var t = Tabs.Raid;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      params.pf = 0;
      params.ctrl = 'BotManager';
      params.action = 'stopAll';
      params.settings = {};
      params.settings.cityId = Seed.cities[i][0];
           
           RPM++;     
           new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
                        method: "post",
                       parameters: params,
                       loading: true,
                       onSuccess: function(transport){
                          var rslt = eval("(" + transport.responseText + ")");
                            if (rslt.ok) {
                                    t.stopprogress = t.stopprogress + (100/Seed.cities.length);
                                    actionLog('Stopping: '+ Seed.cities[i][1]);
                                    if (t.stopprogress.toFixed(0) == 100) {
                                         t.stopprogress = 0;
                                    }        
                            }
                            else {
                                    if (rslt.msg == "The system is busy, please try again later") setTimeout (t.DoAllStop, (2000),i);
                                    else {
                                         t.stopprogress = t.stopprogress + (100/Seed.cities.length);
                                         actionLog('Stopping: '+ Seed.cities[i][1] + ' - ' + rslt.msg);
                                         if (t.stopprogress.toFixed(0) == 100) {
                                              t.stopprogress = 0;
                                         }
                                     }
                             }
                       },
    });  
  },

  DoAllResume: function(i) {
    var t = Tabs.Raid;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      params.pf = 0;
      params.ctrl = 'BotManager';
      params.action = 'resumeAll';
      params.settings = {};
    params.settings.cityId = Seed.cities[i][0];
                
                RPM++;  
           new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
                        method: "post",
                       parameters: params,
                       loading: true,
                       onSuccess: function(transport){
                          var rslt = eval("(" + transport.responseText + ")");
                            if (rslt.ok) {
                                    t.stopprogress = t.stopprogress + (100/Seed.cities.length);
                                    actionLog('Resuming: '+ Seed.cities[i][1]);
                                    if (t.stopprogress.toFixed(0) == 100) {
                                         t.stopprogress = 0;
                                    }        
                            }
                            else {
                                    if (rslt.msg == "The system is busy, please try again later") setTimeout (t.DoAllResume, (2000),i);
                                    else {
                                         t.stopprogress = t.stopprogress + (100/Seed.cities.length);
                                         actionLog('Stopping: '+ Seed.cities[i][1]  + ' - ' + rslt.msg);
                                         if (t.stopprogress.toFixed(0) == 100) {
                                              t.stopprogress = 0;
                                         }    
                                     }
                             }
                       },
    });  
  },
  
  DoAllDelete : function (Id,city,count){
        var t = Tabs.Raid;
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        
        cityID = 'city'+ Seed.cities[city][0];
        
        for (f in Seed.queue_atkp[cityID]){
            if (Seed.queue_atkp[cityID][f]['marchId'] == Id) {
                    marchId = Seed.queue_atkp[cityID][f]['marchId'];
                    cityId = Seed.queue_atkp[cityID][f]['cityId'];
                    knightId = Seed.queue_atkp[cityID][f]['knightId'];
                    toTileLevel = Seed.queue_atkp[cityID][f]['toTileLevel'];
                    returnUnixTime = Seed.queue_atkp[cityID][f]['returnUnixTime'];
                    destinationUnixTime = Seed.queue_atkp[cityID][f]['destinationUnixTime'];
                    toXCoord = Seed.queue_atkp[cityID][f]['toXCoord'];
                    toYCoord = Seed.queue_atkp[cityID][f]['toYCoord'];
                    var units = {};
                    for (i=1;i<13;i++) units[i] = Seed.queue_atkp[cityID][f]['unit'+i+'Count'];
            }
        }
        
        params.pf = 0;
        params.ctrl = 'BotManager';
        params.action = 'deleteMarch';
        params.marchId = marchId;
        params.settings = {};
        params.settings.cityId = cityId;
      RPM++; 
      new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
                 method: "post",
                 parameters: params,
                 loading: true,
                 onSuccess: function(transport){
                    var rslt = eval("(" + transport.responseText + ")");
                      if (rslt != "") {
                            var serverID = getServerId();
                            t.save = GM_getValue ('SavedRaids_'+serverID, "[]");
                            if (t.save != undefined) t.save = JSON2.parse (t.save);
                            if (t.save == undefined) t.save =new Array();
  
                            t.save.push ({
                                marchId:        marchId,
                                cityId:           cityId,
                                knightId:        knightId,
                                toTileLevel:    toTileLevel,
                                returnUnixTime:    destinationUnixTime,
                                returnUnixTime:    returnUnixTime,
                                toXCoord:        toXCoord,
                                toYCoord:        toYCoord,
                                unit1Count:     units[1],
                                unit2Count:     units[2],
                                unit3Count:     units[3],
                                unit4Count:     units[4],
                                unit5Count:     units[5],
                                unit6Count:     units[6],
                                unit7Count:     units[7],
                                unit8Count:     units[8],
                                unit9Count:     units[9],
                                unit10Count:     units[10],
                                unit11Count:     units[11],
                                unit12Count:     units[12],
                            });
                            
                            var troops = Seed.units["city" + cityId];
                            for (var u = 1; u <= 12; ++u) {
                                var troop_number = parseInt(rslt["unit" + u + "Return"]);
                                if (isNaN(troop_number)) {
                                    troop_number = parseInt(Seed.units["city" + cityId]["unt" + u]);
                                } else troop_number = parseInt(rslt["unit" + u + "Return"]) + parseInt(Seed.units["city" + cityId]["unt" + u]);
                                troops["unt" + u] = troop_number;
                            }
                            
                            setTimeout (function (){GM_setValue ('SavedRaids_'+serverID, JSON2.stringify(t.save));}, 0);
                          unsafeWindow.cityinfo_army();      
                          setTimeout(unsafeWindow.update_seed_ajax, 250);
                        }
                 },
         });
                 t.stopprogress = count * (100/t.count);
                 actionLog('Deleting: '+ Seed.cities[city][1]);
                 if (t.stopprogress.toFixed(0) == 100) {
                      t.stopprogress = 0;
                      t.GetRaids(cityId);
      }    
         
},
  
      
  DeleteCityRaids : function (){
          var t = Tabs.Raid;
          alert('This button needs to be added...');
          /*var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  
          
          params.pf = 0;
          params.ctrl = 'BotManager';
          params.action = 'stopAll';
          params.settings = {};
  
            params.settings.cityId = t.cityId;
                    
           new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
                        method: "post",
                       parameters: params,
                       loading: true,
                       onSuccess: function(transport){
                          var rslt = eval("(" + transport.responseText + ")");
                            if (rslt.ok) {
                                    
                            }
                       },
               }); */       
      },
        
        
  AddRaid : function (Id){
        var t = Tabs.Raid;
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        update = {};
        
        params.pf = 0;
        params.ctrl = 'BotManager';
        params.action = 'saveMarch';
        params.settings = {};
        params.queue = {0:{botMarches:{botMarchStatus:1,botState:1},cityMarches:{}}};
        
        for (y in t.save){
            if (t.save[y]['marchId'] == Id){
                params.settings.cityId = t.save[y]['cityId'];
                params.queue[0].cityMarches.knightId = t.save[y]['knightId']; //parseInt(document.getElementById('AddKnights').value);
                params.queue[0].cityMarches.toXCoord = t.save[y]['toXCoord'];
                params.queue[0].cityMarches.toYCoord = t.save[y]['toYCoord'];
                params.queue[0].cityMarches.unit0Count = 0;
                params.queue[0].cityMarches.unit1Count = t.save[y]['unit1Count'];
                params.queue[0].cityMarches.unit2Count = t.save[y]['unit2Count'];
                params.queue[0].cityMarches.unit3Count = t.save[y]['unit3Count'];
                params.queue[0].cityMarches.unit4Count = t.save[y]['unit4Count'];
                params.queue[0].cityMarches.unit5Count = t.save[y]['unit5Count'];
                params.queue[0].cityMarches.unit6Count = t.save[y]['unit6Count'];
                params.queue[0].cityMarches.unit7Count = t.save[y]['unit7Count'];
                params.queue[0].cityMarches.unit8Count = t.save[y]['unit8Count'];
                params.queue[0].cityMarches.unit9Count = t.save[y]['unit9Count'];
                params.queue[0].cityMarches.unit10Count = t.save[y]['unit10Count'];
                params.queue[0].cityMarches.unit11Count = t.save[y]['unit12Count'];
                params.queue[0].cityMarches.unit12Count = t.save[y]['unit12Count'];
            }
        }    
         
         RPM++;
         new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
                      method: "post",
                     parameters: params,
                     loading: true,
                     onSuccess: function(transport){
                        var rslt = eval("(" + transport.responseText + ")");
                          if (rslt.ok) {
                                t.GetRaids(params.settings.cityId);
                                  unsafeWindow.cityinfo_army();
                                    setTimeout(unsafeWindow.update_seed_ajax, 250);
                                    for (yy=0;yy<t.save.length;yy++){
                                        if (t.save[yy]['marchId'] == Id){
                                              t.save.splice (yy,1);
                                        }    
                                    }
                                    var serverID = getServerId();
                                    setTimeout (function (){GM_setValue ('SavedRaids_'+serverID, JSON2.stringify(t.save));}, 0);
                                    t.paint();
                         } else {
                              /* var pop = new pbPopup ('pbEditRaid', 0,0, 750,250, true);
                                 if (t.popFirst){
                                   pop.centerMe (mainPop.getMainDiv());  
                                   t.popFirst = false;
                                 }
                                 pop.getTopDiv().innerHTML = '<CENTER><B>ERROR</b></center>';
                                 var m= '<TABLE id=pbRaidAdd width=100% height=0% class=pbTab><TR align="center">';
                               m +=  '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/merlin_img.jpg"></td>';
                               m+='<TD style="align;left; max-width:200px; text-wrap:normal;word-wrap:break-word"><B>'+ rslt.msg+'</b></td>';
                                 m+='<TD><CENTER>'+ strButton20('OK', 'id=pbOK') +'</center></td></tr>';
                                 pop.getMainDiv().innerHTML = m;
                               document.getElementById('pbOK').addEventListener ('click', function(){pop.show (false)},false);
                                 pop.show (true);*/
                                 logit('Error: '+ rslt.msg);      
                         }
                     },
             });        
    },
    
        
  getKnights : function(cityId){
         var t = Tabs.Raid;
         var knt = new Array();
         var status ="";
         for (k in Seed.knights['city' + cityId]){
                 if ( Seed.leaders['city' + cityId]["resourcefulnessKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["politicsKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["combatKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["intelligenceKnightId"] != Seed.knights['city' + cityId][k]["knightId"]){
                    if (Seed.knights['city' + cityId][k]["knightStatus"] == 1 ) status = "Free";
                    else status = "Marching";
                     knt.push ({
                         Name:   Seed.knights['city' + cityId][k]["knightName"],
                         Combat:    parseInt(Seed.knights['city' + cityId][k]["combat"]),
                         ID:        Seed.knights['city' + cityId][k]["knightId"],
                         Status: status,
                     });
                 }
         }
         knt = knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
         document.getElementById('AddKnights').options.length=0;
          var o = document.createElement("option");
          o.text = '--Choose a Knight--';
          o.value = 0;
          document.getElementById("AddKnights").options.add(o);
         for (k in knt){
                  if (knt[k]["Name"] !=undefined){
                      var o = document.createElement("option");
                      o.text = (knt[k]["Name"] + ' (' + knt[k]["Combat"] +') (' + knt[k]["Status"] +')');
                      o.value = knt[k]["ID"];
                      document.getElementById("AddKnights").options.add(o);
                  }
          }
      },
  
    
  clickCitySelect : function (city){
      var t = Tabs.Raid;
      t.cityId = city['id'];
      t.GetRaids(t.cityId);
  },
  
  checkRaids : function (){
    var t = Tabs.Raid;
    var now = unixTime();
    if(!Options.RaidRunning) return;
    if ( (now - Options.RaidReset) > 7200 ) {
        Options.RaidReset = now;
        saveOptions();
        for (g=0;g<Seed.cities.length;g++){
                t.citiesdone = "";
                setTimeout(t.resetRaids, (1500*g), Seed.cities[g][0],Seed.cities[g][1]);
        }
        setTimeout(t.postLog, 30000);
    }
    t.raidtimer = setTimeout(t.checkRaids, 900000);
  },
  
  GetRaids : function(cityId){
          var t = Tabs.Raid;
          var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
                    
          params.pf = 0;
          params.ctrl = 'BotManager';
          params.action = 'getMarches';
          params.settings = {};
          params.settings.cityId = cityId;
          
          	RPM++;
           new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
                   method: "post",
                   parameters: params,
                   loading: true,
                   onSuccess: function(transport){
                      var rslt = eval("(" + transport.responseText + ")");
                        if (rslt.ok) {
                            t.rslt = rslt;
                              t.paint();
                              unsafeWindow.cityinfo_army();
                              setTimeout(unsafeWindow.update_seed_ajax, 250);
                          }
                   },
           });
  },
  
  
  resetRaids : function(cityId,cityName){
          var t = Tabs.Raid;
          var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
                    
          params.pf = 0;
          params.ctrl = 'BotManager';
          params.action = 'resetRaidTimer';
        params.settings = {};
          params.settings.cityId = cityId;
          
          RPM++;
           new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
                   method: "post",
                   parameters: params,
                 loading: true,
                 onSuccess: function(transport){
                    var rslt = eval("(" + transport.responseText + ")");
                        if (rslt.ok) {
                            unsafeWindow.cityinfo_army();
                            setTimeout(unsafeWindow.update_seed_ajax, 250);
                            t.citiesdone += cityName + ' ';
                        }
                 },
           });
  },
  
  postLog : function (){
          var t = Tabs.Raid;
          actionLog('Reset Raidtimer: ' + t.citiesdone);
  },
  
  sendreport: function(){
      var t = Tabs.Raid;
      if(!Options.foodreport) return;
      var now = new Date().getTime()/1000.0;
      now = now.toFixed(0);
      if (now < (parseInt(Options.LastReport)+(Options.MsgInterval*60*60))) return;
    
    var total = 0;
    var message = 'Raid Stats: %0A';
    message += '%0A Food Gain (for '+ Options.MsgInterval +' hour of raiding) %0A';
    for (q=1;q<=Seed.cities.length;q++){
        var cityID = 'city' + Seed.cities[q-1][0];
        var gain = parseInt(Seed.resources[cityID]['rec1'][0] / 3600) - Options.Foodstatus[q];
        message+= Seed.cities[q-1][1] + ': Start: ' + addCommas(Options.Foodstatus[q]) + ' End :' + addCommas(parseInt(Seed.resources[cityID]['rec1'][0] / 3600)) + ' Gain: ';
        message += addCommas(gain)  + '%0A';
        total += gain;
        Options.Foodstatus[q] = parseInt(Seed.resources[cityID]['rec1'][0] / 3600);
    }
    message += '%0A Total food gain : '+addCommas(total)+'%0A';
    
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.emailTo = Seed.player['name'];
    params.subject = "Raid Overview";
    params.message = message;
    params.requestType = "COMPOSED_MAIL";
    RPM++;
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getEmail.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (message) {
            var rslt = eval("(" + message.responseText + ")");
            if (rslt.ok) {
            } else {
            }
        },
        onFailure: function () {
        },
    });
    
    Options.LastReport = now;
    saveOptions();
  },
  
  toggleRaidState : function (){
      var t = Tabs.Raid;
      if(Options.RaidRunning){
          Options.RaidRunning = false;
          t.raidtimer = null;
          document.getElementById('pbRaidStart').value = 'Auto Reset = OFF';
      } else {
          Options.RaidRunning = true;
          t.raidtimer = setTimeout(t.checkRaids, 5000);
          document.getElementById('pbRaidStart').value = 'Auto Reset = ON';
      }
      saveOptions();
  },

  hide : function (){
  },

  show : function (){
  },
 };
 

/*************************** Auto Craft Tab *************************************/
Tabs.AutoCraft = {
    tabOrder: 20, //CHECKTHIS ?
    tabLabel: "Auto Craft",
    myDiv: null,
    timer: null,
    craftIntervall  : TrainOptions.CraftIntervallMin,
    crafting: [],
    myDiv: null,
    timer: null,
    timerStat: null,
    numcity :-1,
    craftinfo : {},
    retrycount : 0,

    init: function(div){
       var t = Tabs.AutoCraft;
       t.myDiv = div;   
       t.crafting = {
             running: TrainOptions.CraftingRunning,
       };
        
        // set this after TrainOptions has been read in
        t.craftIntervall =TrainOptions.CraftIntervallMin;
        
        var m = '<DIV id=pbCraftingDiv class=pbStat>AUTO CRAFTING - SETTINGS</div><TABLE id=pbcraftingfunc width=100% height=0% class=pbTab><TR><TD width="10%">Interval: <input type=text value="'+TrainOptions.CraftIntervallMin+'" size=2  maxlength=2 id=pbCraftIntervall> Minute(s)<span class=boldRed><sup>*Refresh Required</sup></span></td>';
       if (t.crafting.running == false) {
          m += '<TD  width="33%"><INPUT id=pbCraftRunning type=submit value="Crafting = OFF"></td>';
       }            else {
          m += '<TD width="33%"><INPUT id=pbCraftRunning type=submit value="Crafting = ON"></td>';
          t.timer=setInterval(t.Start,parseInt(t.craftIntervall*60000));
       }
       m += '<td width="17%"><input type=button value="Save Settings" id="Crafting_Save"></td></tr>';
       m += '<tr><td align=left><INPUT id=pbacTR type=checkbox '+(TrainOptions.actr?'CHECKED':'')+'> Only craft when throne room set <INPUT id=pbacTRset type=text size=2 maxlength=1 value="'+ TrainOptions.actrset +'">  is equiped</td></table></div>';
       m += '<DIV id=pbCraftingList class=pbStat>AUTO CRAFTING - LIST</div><TABLE id=pbcraftingqueues width=100% height=0% class=pbTabLined><TR>';

       m += "<td colspan=2><center><b>Items</b></center></td><td><center><b>Inventar</b></center></td><td><b>Amount</b></td>";
       m += "<td colspan=2><center><b>Items</b></center></td><td><center><b>Inventar</b></center></td><td><b>Amount</b></td>";
       m += "</tr><tr>";
       var count = 0;
       for(var i=0; i < unsafeWindow.recipelist[1].length; i++){
          var h = parseInt(unsafeWindow.recipelist[1][i].output_item_id);
          t.craftinfo[h] = {};
          t.craftinfo[h].recipe_id = unsafeWindow.recipelist[1][i].recipe_id;
          t.craftinfo[h].category = unsafeWindow.recipelist[1][i].category;
          t.craftinfo[h].input = unsafeWindow.recipelist[1][i].input;
          t.craftinfo[h].requirements = unsafeWindow.recipelist[1][i].requirements;
          t.craftinfo[h].inputItems = unsafeWindow.recipelist[1][i].input.items;
          t.craftinfo[h].astone = unsafeWindow.recipelist[1][i].input.resources;
          m += "<td ><center><img src='http://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/"+ h + ".jpg' width=25></center></td><td><center>"+unsafeWindow.itemlist["i"+h].name+"</center></td><td><center><span class=boldGreen>"+parseIntNan(Seed.items["i"+h])+"</span></center></td>";
          m += "<td><input type=text size=4 id='Craft_nb_"+h+"' value='"+ parseIntNan(TrainOptions.CraftingNb[h]) +"'></td>";
          if ((count+1)%2 == 0) m += "</tr><tr>";
          count++;
       }
       for(var i=0; i < unsafeWindow.recipelist[3].length; i++){
          var h = parseInt(unsafeWindow.recipelist[3][i].output_item_id);
          t.craftinfo[h] = {};
          t.craftinfo[h].recipe_id = unsafeWindow.recipelist[3][i].recipe_id;
          t.craftinfo[h].category = unsafeWindow.recipelist[3][i].category;
          t.craftinfo[h].input = unsafeWindow.recipelist[3][i].input;
          t.craftinfo[h].requirements = unsafeWindow.recipelist[3][i].requirements;
          t.craftinfo[h].inputItems = unsafeWindow.recipelist[3][i].input.items;
          t.craftinfo[h].astone = unsafeWindow.recipelist[3][i].input.resources;
          m += "<td ><center><img src='http://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/"+ h + ".jpg' width=25></center></td><td><center>"+unsafeWindow.itemlist["i"+h].name+"</center></td><td><center><span class=boldGreen>"+parseIntNan(Seed.items["i"+h])+"</span></center></td>";
          m += "<td><input type=text size=4 id='Craft_nb_"+h+"' value='"+ parseIntNan(TrainOptions.CraftingNb[h]) +"'></td>";
          if ((count+1)%2 == 0) m += "</tr><tr>";
          count++;
       }

       m+="</table><b>Note:</b> If you complete more than one Item, the creation will be done randomly. <BR> <b>Important: Min. 50 000 Aethestones and Refresh to Update the Inventar!</b> ";
       m += '<DIV id=pbCraftingStats class=pbStat>AEHTERSTONES AND CRAFTING TIME</div><span id="CraftStat"></span>';

       t.myDiv.innerHTML = m;


       window.addEventListener('unload', t.onUnload, false);

       document.getElementById("Crafting_Save").addEventListener ('click', function (){t.saveCraftState()}, false);
       document.getElementById("pbCraftRunning").addEventListener ('click', function (){t.toggleStateRunning(this)}, false);     
       t.changeCraft ('pbCraftIntervall', 'CraftIntervallMin')
       document.getElementById('pbacTR').addEventListener ('change', function() {TrainOptions.actr = this.checked;saveTrainOptions();}, false);
       document.getElementById('pbacTRset').addEventListener ('change', function() {TrainOptions.actrset = this.value;saveTrainOptions();}, false);
    },
    changeCraft : function (valueId, optionName, callOnChange){
       var t = Tabs.AutoCraft;
       var e = document.getElementById(valueId);
       e.value = TrainOptions[optionName];
       e.addEventListener ('change', eventHandler, false);
       function eventHandler (){
          TrainOptions[optionName] = this.value;
          saveTrainOptions();
          if (callOnChange)
             callOnChange (this.value);
       }
    },
    updateStat: function() {
       var t = Tabs.AutoCraft;
       var rownum = 0;
       function _row (name, row, noTotal, typee){
          if (rownum++ % 2)
             style = '';
          else
             style = ' style = "background: #e8e8e8"';
          var tot = 0;
          var m = [];
          m.push ('<TR style="background: #fff" align=right');
          m.push (style);
          m.push ('><TD');
          m.push (style);
          m.push ('><B>');
          m.push (name);
          m.push ('</td>');
          if (noTotal){
             m.push ('<TD');
             m.push (style);
             m.push ('>&nbsp;</td>');
          } else {
             for (i=0; i<row.length; i++)
                tot += row[i];
             m.push ('<TD style="background: #ffc">');
             if (tot<0) {
                m.push ("<SPAN class=boldRed>"+addCommas(tot)+"</span>");
             } else {
                m.push (addCommas(tot));
             }
             m.push ('</td>');
          }
          for (i=0; i<row.length; i++){
             m.push ('<TD');
             m.push (style);
             m.push ('>');
             if (row[i]<50000) {
                m.push ("<SPAN class=boldRed>"+addCommas(row[i])+"</span>");
             } else {
                m.push (addCommas(row[i]));
             }
             m.push ('</td>');
          }

          m.push ('</tr>');
          return m.join('');
       }

       clearTimeout(t.timerStat);
       var str="<TABLE class=pbTabOverview cellpadding=0 cellspacing=0><TR  align=center><TD width=55 align=center></td><TD width=88 style='background: #ffc; font-size:150%' align=center><SPAN class=oohfancy>TOTAL</SPAN></td>";
       for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;

          str += "<TD width=81><SPAN class=oohfancy>"+ Cities.cities[i].name.substring(0,10) +"</SPAN></td>";

       }
       rows = [];
       var now = unixTime();
       rows[0] = [];
       for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[0][i] = parseInt(Seed.citystats[cityID].gold[0]);
       }
       for (r=1; r<6; r++){
          rows[r] = [];
          for(i=0; i<Cities.numCities; i++) {
             cityID = 'city'+ Cities.cities[i].id;
             if (r==5)
                rows[r][i] = parseInt(Seed.resources[cityID]['rec'+r][0]);
             else
                rows[r][i] = parseInt(Seed.resources[cityID]['rec'+r][0] / 3600);

          }

       }
       str += _row ('<img height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/aetherstone_30.png>', rows[5], false, 0);
       str +='<tr style="background: #e8e8e8" align=right><td><img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/3.jpg title="Crafting"></b></td><td>&nbsp;</td>';
       for(i=0; i<Cities.numCities; i++) {
          var totTime = 0;
          // the last item in the queue should be the item in progress
          var len = Seed.queue_craft["city" + Cities.cities[i].id].length;
          if ( len > 0) {
             var q=Seed.queue_craft["city" + Cities.cities[i].id][len-1];
             var totTime = 0;
             totTime = q.craftingEtaUnixTime - now;
             if (totTime < 0)
                totTime = 0;
             if (getCityBuilding(Cities.cities[i].id,20).count>0 && totTime == 0)
                affuichage = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';
             else
                affuichage = timestr(totTime);

             str +="<td><span onclick='Crafting("+Cities.cities[i].id+");'>"+ affuichage + "</span></td>";  

          } else {
             affuichage = timestr(totTime);
             if (getCityBuilding(Cities.cities[i].id,20).count>0)
                affuichage = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';

             str +="<td><span onclick='Crafting("+Cities.cities[i].id+");'>"+affuichage+"</span></td>";
          }
       }    
       str +="</tr>";    
       document.getElementById("CraftStat").innerHTML=str;
       t.timerStat = setTimeout(function() { t.updateStat(); }, 2000);
    },
    updateCraftnb : function() {
       var t = Tabs.AutoCraft;
       for(var h in t.craftinfo) {
          if (document.getElementById("Craft_nb_" +h)) document.getElementById("Craft_nb_"+h).value=parseInt(TrainOptions.CraftingNb[h]) ;
       }
    },
  saveCraftState : function() {
     var t = Tabs.AutoCraft;
     TrainOptions.CraftingRunning =  t.crafting.running;
     for(var h in t.craftinfo) {
        if (document.getElementById("Craft_nb_" +h)) TrainOptions.CraftingNb[h] = document.getElementById("Craft_nb_"+h).value;
     }
     saveTrainOptions();
  },
  toggleStateRunning: function(obj){
      var t = Tabs.AutoCraft;
      obj = document.getElementById('pbCraftRunning');
          if (t.crafting.running == true) {
              t.crafting.running = false;
              t.saveCraftState();
              if (document.getElementById('pbCraftRunning')) document.getElementById('pbCraftRunning').value = "Crafting = OFF";
              if (document.getElementById('CraftToggle')) document.getElementById('CraftToggle').value = "Crafting = OFF";
              clearInterval(t.timer);
          }
          else {
              t.crafting.running = true;
              t.saveCraftState();
              if (document.getElementById('pbCraftRunning')) document.getElementById('pbCraftRunning').value = "Crafting = ON";
              if (document.getElementById('CraftToggle')) document.getElementById('CraftToggle').value = "Crafting = ON";
              t.timer=setInterval(t.Start,parseInt(t.craftIntervall*60000));
              t.Start();
          }
          t.updateCraftnb();
    },
    Start: function() {
       var t = Tabs.AutoCraft;
       if(!TrainOptions.CraftingRunning) {
          // crafting was turned off
          clearInterval(t.timer);
          return;
       }
       if (TrainOptions.actr && TrainOptions.actrset != 0) {
          if (Seed.throne.activeSlot != TrainOptions.trset) {
             // wrong TR equipped
             return;
          };
       };
       if (t.numcity<Cities.numCities-1) {
          t.numcity++;
       } else {
          t.numcity=-1;
          // finished with all cities / end of loop
          return;
       }
       var c=t.numcity;

       var cityId=Cities.cities[c].id;

       var ret=getCityBuilding(cityId,20).count;
       if (ret==0) {
          // no spire in this city
          t.Start();
          return;
       }
       if (parseInt(Seed.resources["city" + cityId]['rec5'][0])<5000) {
          // not enough a-stone
          t.Start();
          return;
       }
       var tableau = [];
       for(var d in TrainOptions.CraftingNb) {
          if (parseInt(TrainOptions.CraftingNb[d])>0) {
             if(parseInt(Seed.resources["city" + cityId]['rec5'][0]) >= parseInt(t.craftinfo[d].astone[1]))
                if(parseInt(t.craftinfo[d].requirements.building) <= parseInt(getCityBuilding(cityId,20).maxLevel))
                   if(t.craftinfo[d].inputItems == "") {
                      tableau.push (d);
                   } else {
                      for(var i in t.craftinfo[d].inputItems) {
                         if(parseInt(unsafeWindow.seed.items["i"+i]) < parseInt(t.craftinfo[d].inputItems[i]))
                            break;
                      }	
                      if(parseInt(unsafeWindow.seed.items["i"+i]) >= parseInt(t.craftinfo[d].inputItems[i]))
                         tableau.push (d);
                   }
          }
       }
       if (tableau == []) {
          // nothing to craft
          t.Start();
          return;
       }
       var itemId = tableau[Math.floor(Math.random()*tableau.length)];
       var recipeId = t.craftinfo[itemId].recipe_id;
       var category = t.craftinfo[itemId].category;
       var i=Seed.queue_craft["city"+cityId];
       if(i.length>0) {
          var q=i[ i.length-1];
          var totTime = 0;
          var now = unixTime();
          totTime = q.craftingEtaUnixTime - now;
          if (totTime > 0) {
             // item still crafting
             t.Start();
             return;
          }
       }
       t.CraftingItem(cityId,  itemId, recipeId, category);
    },
    CraftingItem: function (currentcity, itemId, recipeId, category) {
       var t = Tabs.AutoCraft;
       Seed.resources['city'+currentcity].rec5[0]=parseInt(Seed.resources['city'+currentcity].rec5[0] - t.craftinfo[itemId].astone[1]);
       var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
       params.action="craft";
       params.ctrl="Crafting";
       params.cityId=currentcity;
       params.insurance=false;
       params.itemId=itemId;
       params.recipeId=recipeId;
       params.categoryId=category;
       new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, { method: "post", parameters: params,loading: true,
          onSuccess: function (transport) {
             var o=eval("("+transport.responseText+")");
             if (o.updateSeed)
                unsafeWindow.update_seed(o.updateSeed);
             if(o.ok===true){
                if (o.status=="error") {
                   // crafting error
                   if (o.errorCode == 2)
                      t.numcity--;
                   t.retrycount++;
                   if(t.retrycount > 10)
                      return;
                   t.Start();
                   return;
                } else if(o.status=="failure"){
                   // craft failed
                   setTimeout(function() {
                      t.CraftingItem(currentcity,  itemId, recipeId);
                   }, 5000);
                } else if (o.status=="success"){
                   // sucessful
                   t.retrycount == 0;
                   //actionLog ('<b>'+culang.auto+' '+culang.crafting+'</b>:  <span class=boldGreen>OK</span> #'+ (TrainOptions.CraftingNb[itemId] -1)+' ');
                   TrainOptions.CraftingNb[itemId] =  TrainOptions.CraftingNb[itemId] -1;
                   saveTrainOptions();
                   t.updateCraftnb();
                   if(!Seed.queue_craft["city"+currentcity]) {
                      Seed.queue_craft["city"+currentcity]=[];
                   }
                   var n={};
                   n.recipeId=recipeId;
                   n.craftingUnixTime=o.time.startTime;
                   n.craftingEtaUnixTime=o.time.endTime;
                   n.craftingId=o.craftingId;
                   n.categoryId=null;
                   n.recipeIndex=null;
                   unsafeWindow.seed.queue_craft["city"+currentcity].push(n);

                   // If this item started crafting in the city the player has open, rebuild the building tab
                   if (unsafeWindow.currentcityid == currentcity) {
                      // if the building tab is selected, rebuild it
                      if (unsafeWindow.jQuery("#queue_head_building").hasClass("sel") )
                      {
                         unsafeWindow.queue_changetab_building();
                      }
                   }
                   t.Start();
                }
             }
          },
          onFailure: function () {  t.Start();  }
       });
    },

    show : function (){
        var t = Tabs.AutoCraft;
        clearTimeout(t.timerStat);
        t.updateStat();
    },
    hide: function(){
        var t = Tabs.AutoCraft;
        clearTimeout(t.timerStat);
      },
      onUnload: function(){
          var t = Tabs.AutoCraft;
           t.saveCraftState();
    },
};

 
/*********************************** Log Tab ***********************************/
Tabs.ActionLog = {
  tabOrder: 130,
  tabLabel : 'Log',
  myDiv : null,
  logTab : null,
  maxEntries: 300,
  last250 : [],
  state : null,
    
  init : function (div){
    var t = Tabs.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '<DIV class=pbStat>ACTION LOG - VERSION: '+ Version+'</div><DIV style="height:535px;max-height:535px;max-width:500px:overflow-y:auto;overflow-x:auto">\
      <TABLE cellpadding=0 cellspacing=0 id=pbactionlog class=pbTabLined><TR><TD></td><TD width=95%></td></table></div>';
    t.logTab = document.getElementById('pbactionlog');  
    t.state = 1;
    var a = JSON2.parse(GM_getValue ('log_'+getServerId(), '[]'));
    if (matTypeof(a) == 'array'){
      t.last250 = a;
      for (var i=0; i<t.last250.length; i++)
        t._addTab (t.last250[i].msg, t.last250[i].ts);
    }
    window.addEventListener('unload', t.onUnload, false);
  },

  hide : function (){
  },

  show : function (){
  },

  onUnload : function (){
    var t = Tabs.ActionLog;
    if (!ResetAll) GM_setValue ('log_'+getServerId(), JSON2.stringify(t.last250));
  },
    
  _addTab : function (msg, ts){
    var t = Tabs.ActionLog;
    if (t.state != 1)
      return;
    if (t.logTab.rows.length >= t.maxEntries)
      t.logTab.deleteRow(t.maxEntries-1);
    var row = t.logTab.insertRow(0);
    row.vAlign = 'top';
    row.insertCell(0).innerHTML = ts;
    row.insertCell(1).innerHTML = msg;
  },
  
  log : function (msg){
    var t = Tabs.ActionLog;
    var ts = new Date().toTimeString().substring (0,8);
    t._addTab (msg, ts);
    while (t.last250.length >= 250)
      t.last250.shift();
    t.last250.push ({msg:msg, ts:ts});
  },
}

function actionLog (msg){
  if (!Tabs.ActionLog.tabDisabled)
    Tabs.ActionLog.log (msg);  
}



/*********************************  Cresting Tab ***********************************/
 Tabs.Crest = {
  tabOrder : 70,
  myDiv : null,
  rallypointlevel:null,
  error_code: 0,
  knt:{},

     
  init : function (div){
    var t = Tabs.Crest;
    t.myDiv = div;
    var selbut=0;
    var m = '<DIV id=pbTowrtDivF class=pbStat>AUTOMATED CRESTING FUNCTION</div><TABLE id=pbcrestfunctions width=100% height=0% class=pbTab><TR align="center">';
     if (CrestOptions.Running == false) m += '<TD><INPUT id=Cresttoggle type=submit value="Crest = OFF"></td>';
	   else m += '<TD><INPUT id=Cresttoggle type=submit value="Crest = ON"></td>'; 
    m += '<TD><INPUT id=CrestHelp type=submit value="HELP"></td><TD>Rallypoint options in options tab!</td></table>';
    m += '<DIV id=pbOpt class=pbStat>CRESTING OPTIONS</div>';
    m += '<B>This tab crests 1 wild from 1 city with abandon!! TO CREST PLAYERS/BARBS/WILDS with 1 wave for TR items, use ATTACK TAB...</b><BR><BR>';
    m +='<TABLE id=pbcrestopt	 width=100% height=0% class=pbTab><TR align="center"></table>';
    m += '<DIV style="margin-bottom:10px;">Crest from city: <span id=crestcity></span></div>';    
    m += '<TABLE class=ptTab><TR><TD>Wild coords: X:<INPUT id=pbcrestx type=text size=3 maxlength=3 value="'+CrestOptions.X+'"</td>';
    m += '<TD>Y:<INPUT id=pbcresty type=text size=3 maxlength=3 value="'+CrestOptions.Y+'"</td></tr></table>';   
    m += '<TABLE class=ptTab><TR><TD>Wave <b>1</b>: </td><TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_30.png></td><TD><INPUT id=R1MM type=text size=5 maxlength=5 value="'+CrestOptions.R1MM+'" (When left 0 it will not send out a first wave, for whatever reason you want to do that...)</td>';
    m += '</td><TD></td><TD><TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_30.png></td><TD><INPUT id=R1Ball type=text size=5 maxlength=5 value="'+CrestOptions.R1Ball+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_30.png></td><TD><INPUT id=R1Cat type=text size=5 maxlength=5 value="'+CrestOptions.R1Cat+'"</td></tr>';    
    m += '<TR><TD>Wave <b>2</b>: </td><TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_30.png></td><TD><INPUT id=R2MM type=text size=5 maxlength=5 value="'+CrestOptions.R2MM+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_30.png></td><TD><INPUT id=R2Pike type=text size=5 maxlength=5 value="'+CrestOptions.R2Pike+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_30.png></td><TD><INPUT id=R2Sword type=text size=5 maxlength=5 value="'+CrestOptions.R2Sword+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_30.png></td><TD><INPUT id=R2Arch type=text size=5 maxlength=5 value="'+CrestOptions.R2Arch+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_30.png></td><TD><INPUT id=R2Ball type=text size=5 maxlength=5 value="'+CrestOptions.R2Ball+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_30.png></td><TD><INPUT id=R2Ram type=text size=5 maxlength=5 value="'+CrestOptions.R2Ram+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_30.png></td><TD><INPUT id=R2Cat type=text size=5 maxlength=5 value="'+CrestOptions.R2Cat+'"</td></tr></table>';
    
    t.myDiv.innerHTML = m;
    
    for (var i=0;i<Seed.cities.length;i++){
		if (CrestOptions.CrestCity == Seed.cities[i][0]){
			selbut=i;
			break;
		}
	}
		
    t.tcp = new CdispCityPicker ('crestcityselect', document.getElementById('crestcity'), true, t.clickCitySelect, selbut);
    
    if (CrestOptions.CrestCity == 0) {
    	CrestOptions.CrestCity = t.tcp.city.id
    	saveCrestOptions();
    }
         
    document.getElementById('crestcity').addEventListener('click', function(){CrestOptions.CrestCity = t.tcp.city.id;saveCrestOptions();} , false);
    document.getElementById('Cresttoggle').addEventListener('click', function(){t.toggleCrestState(this)} , false);
    document.getElementById('CrestHelp').addEventListener('click', function(){t.helpPop();} , false);
    document.getElementById('pbcrestx').addEventListener('change', function(){CrestOptions.X = document.getElementById('pbcrestx').value; saveCrestOptions();} , false);
    document.getElementById('pbcresty').addEventListener('change', function(){CrestOptions.Y = document.getElementById('pbcresty').value; saveCrestOptions()} , false);
    document.getElementById('R1MM').addEventListener('change', function(){CrestOptions.R1MM = document.getElementById('R1MM').value; saveCrestOptions()} , false);
    document.getElementById('R1Ball').addEventListener('change', function(){CrestOptions.R1Ball = document.getElementById('R1Ball').value; saveCrestOptions()} , false);
    document.getElementById('R1Cat').addEventListener('change', function(){CrestOptions.R1Cat = document.getElementById('R1Cat').value; saveCrestOptions()} , false);
    document.getElementById('R2MM').addEventListener('change', function(){CrestOptions.R2MM = document.getElementById('R2MM').value; saveCrestOptions()} , false);
    document.getElementById('R2Pike').addEventListener('change', function(){CrestOptions.R2Pike = document.getElementById('R2Pike').value; saveCrestOptions()} , false);
    document.getElementById('R2Sword').addEventListener('change', function(){CrestOptions.R2Sword = document.getElementById('R2Sword').value; saveCrestOptions()} , false);
    document.getElementById('R2Arch').addEventListener('change', function(){CrestOptions.R2Arch = document.getElementById('R2Arch').value; saveCrestOptions()} , false);
    document.getElementById('R2Ball').addEventListener('change', function(){CrestOptions.R2Ball = document.getElementById('R2Ball').value; saveCrestOptions()} , false);
    document.getElementById('R2Ram').addEventListener('change', function(){CrestOptions.R2Ram = document.getElementById('R2Ram').value; saveCrestOptions()} , false);
    document.getElementById('R2Cat').addEventListener('change', function(){CrestOptions.R2Cat = document.getElementById('R2Cat').value; saveCrestOptions()} , false);
  },
  
  helpPop : function (){
    var helpText = '<BR>The crest tab is designed to attack one wild over and over again.<BR>';
    helpText += 'It will attack a wild in 2 waves, abandon it and start over.<BR>';
    helpText += 'So make sure u have 1 FREE SLOT in your castle for a wild!<BR>';
    helpText += 'Just fill in the coordinates, troops and hit "ON".<BR><BR>';
    helpText += 'Troop numers (from KOC WIKI):<BR>';
    helpText += '<A target="_tab" href="http://koc.wikia.com/wiki/Wilderness">More can be found on Koc Wikia</a>';
    helpText += '<TABLE width=100%><TR><TD>Level</td><TD>Wave 1</td><TD>Wave 2</td><TD>Troop loses</td><TD>Min. Fletching</td></tr>';
    helpText += '<TR><TD>1</td><TD>n/a</td><TD>160 MM</td><TD>12 MM</td><TD>0</td></tr>';
    helpText += '<TR><TD>1</td><TD>n/a</td><TD>80 archers</td><TD>None</td><TD>1+</td></tr>';
    helpText += '<TR><TD>2</td><TD>5 MM</td><TD>130 archers</td><TD>1st Wave</td><TD>2+</td></tr>';
    helpText += '<TR><TD>3</td><TD>10 MM</td><TD>520 archers</td><TD>1st Wave</td><TD>3+</td></tr>';
    helpText += '<TR><TD>4</td><TD>20 MM</td><TD>1600 archers</td><TD>1st Wave</td><TD>4+</td></tr>';
    helpText += '<TR><TD>5</td><TD>50 MM</td><TD>2200 archers</td><TD>1st Wave</td><TD>6+</td></tr>';
    helpText += '<TR><TD>6</td><TD>100 MM</td><TD>3000 archers</td><TD>1st Wave</td><TD>7+</td></tr>';
    helpText += '<TR><TD>7</td><TD>150 MM</td><TD>6000 archers</td><TD>1st Wave</td><TD>8+</td></tr>';
    helpText += '<TR><TD>8</td><TD>299 MM + 1Bal</td><TD>9000 archers + 900 Bal</td><TD>1st Wave + 1 Archer</td><TD>9+</td></tr>';
    helpText += '<TR><TD>9</td><TD>599 MM + 1Bal</td><TD>13000 archers + 900 Bal</td><TD>1st Wave + 2 Archer</td><TD>10</td></tr>';
    helpText += '<TR><TD>10</td><TD>1199 MM + 1Cat</td><TD>35000 archers + 2500 Cat</td><TD>1st Wave + 6 Archer + 50 Cat</td><TD>10</td></tr></table>';
    
    var pop = new pbPopup ('giftHelp', 0, 0, 585, 400, true);
    pop.centerMe (mainPop.getMainDiv());  
    pop.getMainDiv().innerHTML = helpText;
    pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot Help: Cresting</b></center>';
    pop.show (true);
  },
  
  toggleCrestState: function(obj){
		var t = Tabs.Crest;
        if (CrestOptions.Running == true) {
            CrestOptions.Running = false;
            if (document.getElementById('Cresttoggle')) document.getElementById('Cresttoggle').value = "Crest = OFF";
            if (document.getElementById('CrestToggleD')) document.getElementById('CrestToggleD').value = "Crest = OFF";
            saveCrestOptions();
        }
        else {
            CrestOptions.Running = true;
            if (document.getElementById('Cresttoggle')) document.getElementById('Cresttoggle').value = "Crest = ON";
            if (document.getElementById('CrestToggleD')) document.getElementById('CrestToggleD').value = "Crest = ON";
            saveCrestOptions();
        }
    },
    
    
    getAtkKnight : function(cityID){
     var t = Tabs.Crest;
     t.knt = new Array();
     for (k in Seed.knights[cityID]){
     		if (Seed.knights[cityID][k]["knightStatus"] == 1 && Seed.leaders[cityID]["resourcefulnessKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["politicsKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["combatKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["intelligenceKnightId"] != Seed.knights[cityID][k]["knightId"]){
     			t.knt.push ({
     				Name:   Seed.knights[cityID][k]["knightName"],
     				Combat:	parseInt(Seed.knights[cityID][k]["combat"]),
     				ID:		Seed.knights[cityID][k]["knightId"],
     			});
     		}
     }
     t.knt = t.knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
  },
  
  getRallypointLevel: function(cityId){
    var t = Tabs.Crest;
    for (var o in Seed.buildings[cityId]){
  	var buildingType = parseInt(Seed.buildings[cityId][o][0]);
  	var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
  	if (buildingType == 12) t.rallypointlevel=parseInt(buildingLevel);
     }
  },
  
  
  FirstRound: function(){
      var t = Tabs.Crest;
      var buzy = false;
      if (!CrestOptions.Running) return;
      cityID = 'city' + CrestOptions.CrestCity;
      if (parseInt(Seed.units[cityID]['unt2']) < CrestOptions.R1MM || parseInt(Seed.units[cityID]['unt10']) < CrestOptions.R1Ball || parseInt(Seed.units[cityID]['unt12']) < CrestOptions.R1Cat || parseInt(Seed.units[cityID]['unt2']) < CrestOptions.R1MM || parseInt(Seed.units[cityID]['unt2']) < CrestOptions.R2MM || parseInt(Seed.units[cityID]['unt4']) < CrestOptions.R2Pike || parseInt(Seed.units[cityID]['unt5']) < CrestOptions.R2Sword || parseInt(Seed.units[cityID]['unt6']) < CrestOptions.R2Arch || parseInt(Seed.units[cityID]['unt10']) < CrestOptions.R2Ball || parseInt(Seed.units[cityID]['unt11']) < CrestOptions.R2Ram || parseInt(Seed.units[cityID]['unt12']) < CrestOptions.R2Cat) return;
      for (var k in Seed.queue_atkp[cityID]) if (Seed.queue_atkp[cityID][k]['toXCoord']==CrestOptions.X && Seed.queue_atkp[cityID][k]['toYCoord']==CrestOptions.Y)  buzy=true;
      if (!buzy)  {
        CrestOptions.RoundOne=true;
        CrestOptions.RoundTwo=true;
        saveCrestOptions();
      }
      if(!CrestOptions.RoundOne) return;
      
      if (CrestOptions.R1MM == 0 && CrestOptions.R1Ball==0 && CrestOptions.R1Cat==0){
      CrestOptions.RoundOne = false;
      saveCrestOptions();
      return;
      }
      
              
       var now = new Date().getTime()/1000.0;
       now = now.toFixed(0)
		
	   if (CrestOptions.R1MM > parseInt(Seed.units[cityID]['unt2']) || CrestOptions.R1Ball > parseInt(Seed.units[cityID]['unt10']) || CrestOptions.R1Cat > parseInt(Seed.units[cityID]['unt12'])){return;}
          
	    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        if (now < (parseInt(CrestOptions.lastRoundTwo) + 300)) { 
        	params.u2= (CrestOptions.R1MM / 10);
        	params.u2 = params.u2.toFixed(0);	
        	if (params.u2 < (CrestOptions.R1MM / 10)) params.u2++;
        }	
  		else params.u2= CrestOptions.R1MM;
  		params.u10=CrestOptions.R1Ball;
  		params.u12=CrestOptions.R1Cat;
  		
		for (i=1;i<=Seed.cities.length;i++) if (Seed.cities[i-1][0] == CrestOptions.CrestCity) var cityNumber = i;
		MarchQueue[cityNumber].push({
				what: 			"Crest",
				city:           CrestOptions.CrestCity,
                action:         4,
                targetX:        CrestOptions.X,
                targetY:        CrestOptions.Y,
                1:              0,
                2:              params.u2,
                3:              0,
                4:              0,
                5:              0,
                6:              0,
                7:              0,
                8:              0,
                9:              0,
                10:             params.u10,
                11:             0,
                12:             params.u12,
                13:             0,
                14:             0,
                15:             0,
                r1:             0,
                r2:             0,
                r3:             0,
                r4:             0,
                r5:             0,
                gold:           0,
        });

  		CrestOptions.RoundOne = false;
  		saveCrestOptions();
  		t.SecondRound();
  	 },
     
     	 
    SecondRound: function(){
      var t = Tabs.Crest;
      if (!CrestOptions.Running || !CrestOptions.RoundTwo) return;
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      cityID = 'city' + CrestOptions.CrestCity;
      if (parseInt(Seed.units[cityID]['unt2']) < CrestOptions.R1MM || parseInt(Seed.units[cityID]['unt10']) < CrestOptions.R1Ball || parseInt(Seed.units[cityID]['unt12']) < CrestOptions.R1Cat || parseInt(Seed.units[cityID]['unt2']) < CrestOptions.R1MM || parseInt(Seed.units[cityID]['unt2']) < CrestOptions.R2MM || parseInt(Seed.units[cityID]['unt4']) < CrestOptions.R2Pike || parseInt(Seed.units[cityID]['unt5']) < CrestOptions.R2Sword || parseInt(Seed.units[cityID]['unt6']) < CrestOptions.R2Arch || parseInt(Seed.units[cityID]['unt10']) < CrestOptions.R2Ball || parseInt(Seed.units[cityID]['unt11']) < CrestOptions.R2Ram || parseInt(Seed.units[cityID]['unt12']) < CrestOptions.R2Cat) return;
      
   		params.u2=CrestOptions.R2MM;
  		params.u4=CrestOptions.R2Pike;
  		params.u5=CrestOptions.R2Sword;
  		params.u6=CrestOptions.R2Arch;
  		params.u10=CrestOptions.R2Ball;
  		params.u11=CrestOptions.R2Ram;
  		params.u12=CrestOptions.R2Cat;

  		for (i=1;i<=Seed.cities.length;i++) if (Seed.cities[i-1][0] == CrestOptions.CrestCity) var cityNumber = i;
		MarchQueue[cityNumber].push ({
						what: 			"Crest",
                        city:           CrestOptions.CrestCity,
                        action:         4,
                        targetX:        CrestOptions.X,
                        targetY:        CrestOptions.Y,
                        1:              0,
                        2:              params.u2,
                        3:              0,
                        4:              params.u4,
                        5:              params.u5,
                        6:              params.u6,
                        7:              0,
                        8:              0,
                        9:              0,
                        10:             params.u10,
                        11:             params.u11,
                        12:             params.u12,
                        13:             0,
                        14:             0,
                        15:             0,
                        r1:             0,
                        r2:             0,
                        r3:             0,
                        r4:             0,
                        r5:             0,
                        gold:           0,
        });

		CrestOptions.RoundTwo = false;
        var now = new Date().getTime()/1000.0;
        now = now.toFixed(0);
        CrestOptions.lastRoundTwo = now;
  		saveCrestOptions();
  	},
  		 
  		 
  	abandonWilderness: function(tid,x,y,cid){
      var t = Tabs.Crest;
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      var cityID = cid;
	  var tileid = tid;
      params.tid=tid;
  	  params.cid=cid;
  	  params.x=x;
  	  params.y=y;
  		  		
  		new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/abandonWilderness.php" + unsafeWindow.g_ajaxsuffix, {
  		         method: "post",
  		         parameters: params,
  		         loading: true,
  		         onSuccess: function (transport) {
  		         var rslt=eval("("+transport.responseText+")");
  		         
  		         
				  if (rslt.ok) {
				  	 t.error_code = 0;
				     CrestOptions.RoundOne = true;
				     CrestOptions.RoundTwo = true;
				     saveCrestOptions();
				      if (rslt.returningMarches) {
				          var cities = Object.keys(rslt.returningMarches);
				          for (var i = 0; i < cities.length; i++) {
				              for (var j = 0; j < rslt.returningMarches[cities[i]].length; j++) {
				                  var cid = cities[i].split("c")[1];
				                  var mid = rslt.returningMarches[cities[i]][j];
				                  var march = Seed.queue_atkp["city" + cid]["m" + mid];
				                  if (march) {
				                      var marchtime = Math.abs(parseInt(march.destinationUnixTime) - parseInt(march.marchUnixTime));
				                      var ut = unsafeWindow.unixtime();
				                      Seed.queue_atkp["city" + cid]["m" + mid].destinationUnixTime = ut;
				                      Seed.queue_atkp["city" + cid]["m" + mid].marchUnixTime = ut - marchtime;
				                      Seed.queue_atkp["city" + cid]["m" + mid].returnUnixTime = ut + marchtime;
				                      Seed.queue_atkp["city" + cid]["m" + mid].marchStatus = 8
				                  }
				              }
				          }
				      }
				      if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
				      
				      if (Object.keys(Seed.wilderness["city" + cityID]).length == 1) {
				          Seed.wilderness["city" + cityID] = []
  		         	  } else{
  		         	  	delete Seed.wilderness["city"+cityID]["t"+tileid];
  		         	  }
               } 
  		         },
  		         onFailure: function () {}
  		 });
    },
    
  hide : function (){
    var t = Tabs.Crest;
  },

  show : function (){
  },
 };



/*********************************** Dashboard Tab ***********************************/

function createDashboard (){
	var Dashboard = document.createElement('div');
	var beacon = document.getElementById('mod_cityinfo');
	Dashboard.id='Dash_div';
	Dashboard.style.position = 'relative';	
	if (GlobalOptions.pbWideScreenStyle=="ultra") Dashboard.style.width= "450px";
	else if (GlobalOptions.pbWideScreenStyle=="wide") Dashboard.style.width= "400px";
	else Dashboard.style.width = (screen.width - 1122 - 22) +"px";
	if (!Options.pbChatOnRight) Dashboard.style.width= "450px";
  	Dashboard.style.top = "-605px";
  	if (Options.pbChatOnRight) Dashboard.style.left ="1122px";
  	else Dashboard.style.left ="760px";
  	Dashboard.style.height = "728px";
  	Dashboard.style.background = '#FFFFE6';
  	Dashboard.style.overflow = 'auto';
	beacon.parentNode.insertBefore(Dashboard, beacon);
}

var DashboardOptions = {
	foodLevel:10000000000,
    woodLevel:1000000000,
    stoneLevel:100000000,
    oreLevel:100000000,
    astoneLevel:250000,
    showRP:true,
    showThrone:true,
    showStatus:true,
    showButtons:true,
    showReso:true,
    ShowResoCity:[true,true,true,true,true,true,true,true],
    ShowResoTypes:[null,true,true,true,true],
    showLog:true,
    showTroops:true,
    showTower:true,
    showWarnings:true,
    showMarches:true,
}

Tabs.Dashboard = {
    tabOrder: 800,
    tabLabel: 'Dashboard',
    myDiv : null,
    Alerts: [],
    showMarchesInfo: true,
    
    init : function (div){
        var t = Tabs.Dashboard;
        t.myDiv = div;
        Tabs.Reassign.readReassignState();
        Tabs.build.readBuildStates();
    
        left = '<TABLE id=pbDashOpts width=100% class=pbTab><TR>';
        left += '<TR><TD colspan=2>Show warnings when resources are below:</td></tr>';
        left += '<TR><TD style="width:50px;"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png"></td><TD><INPUT id=pbFoodWarning size=13 maxLength=12 type=text value='+DashboardOptions.foodLevel+'></td></tr>';
        left += '<TR><TD style="width:50px;"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png"></td><TD><INPUT id=pbWoodWarning size=13 maxLength=12 type=text value='+DashboardOptions.woodLevel+'></td></tr>';
        left += '<TR><TD style="width:50px;"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png"></td><TD><INPUT id=pbStoneWarning size=13 maxLength=12 type=text value='+DashboardOptions.stoneLevel+'></td></tr>';
        left += '<TR><TD style="width:50px;"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png"></td><TD><INPUT id=pbOreWarning size=13 maxLength=12 type=text value='+DashboardOptions.oreLevel+'></td></tr>';
        left += '<TR><TD style="width:50px;"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/aetherstone_30.png"><TD><INPUT id=pbAStoneWarning size=8 maxLength=7 type=text value='+DashboardOptions.astoneLevel+'></td></tr></table>';

        right = '<TABLE id=pbDashOptsSel width=100% class=pbTab>';
        right += '<TR><TD colspan=2>Select options you want to see in dashboard: (Refresh after toggle!)</td></tr>';
        right += '<TR><TD colspan=3><INPUT id=pbShowThrone type=checkbox '+(DashboardOptions.showThrone?'CHECKED':'')+'>&nbsp; Show Throne Presets</td></tr>';
        right += '<TR><TD colspan=3><INPUT id=pbShowRP type=checkbox '+(DashboardOptions.showRP?'CHECKED':'')+'>&nbsp; Show Rally Point Slots</td></tr>';
        right += '<TR><TD colspan=3><INPUT id=pbShowStatus type=checkbox '+(DashboardOptions.showStatus?'CHECKED':'')+'>&nbsp; Show City Defensive Status (Green off, Red on)</td></tr>';
        right += '<TR><TD colspan=3><INPUT id=pbShowTower type=checkbox '+(DashboardOptions.showTower?'CHECKED':'')+'>&nbsp; Show Tower Alerts</td></tr>';
        right += '<TR><TD colspan=3><INPUT id=pbShowWarnings type=checkbox '+(DashboardOptions.showWarnings?'CHECKED':'')+'>&nbsp; Show Warnings</td></tr>';
        right += '<TR><TD colspan=3><INPUT id=pbShowLog type=checkbox '+(DashboardOptions.showLog?'CHECKED':'')+'>&nbsp; Show Last 5 Log Items</td></tr>';
        right += '<TR><TD colspan=3><INPUT id=pbShowMarches type=checkbox '+(DashboardOptions.showMarches?'CHECKED':'')+'>&nbsp; Show Saved Marches</td></tr>';
        right +='</table>';

        var m = '<div class="pbStat">DASHBOARD OPTIONS</div><TABLE id=dbMain width=100% class=pbTab><TD>'+left+'</td><TD>'+right+'</td>';
        t.myDiv.innerHTML = m;


        document.getElementById('pbFoodWarning').addEventListener('keyup',function(){DashboardOptions.foodLevel = this.value;saveDashboardOptions();},false);
        document.getElementById('pbWoodWarning').addEventListener('keyup',function(){DashboardOptions.woodLevel = this.value;saveDashboardOptions();},false);
        document.getElementById('pbStoneWarning').addEventListener('keyup',function(){DashboardOptions.stoneLevel = this.value;saveDashboardOptions();},false);
        document.getElementById('pbOreWarning').addEventListener('keyup',function(){DashboardOptions.oreLevel = this.value;saveDashboardOptions();},false);
        document.getElementById('pbAStoneWarning').addEventListener('keyup',function(){DashboardOptions.astoneLevel = this.value;saveDashboardOptions();},false);

        document.getElementById('pbShowThrone').addEventListener('change',function(){DashboardOptions.showThrone = document.getElementById('pbShowThrone').checked;saveDashboardOptions();},false);
        document.getElementById('pbShowRP').addEventListener('change',function(){DashboardOptions.showRP = document.getElementById('pbShowRP').checked;saveDashboardOptions();},false);
        document.getElementById('pbShowStatus').addEventListener('change',function(){DashboardOptions.showStatus = document.getElementById('pbShowStatus').checked;saveDashboardOptions();},false);
        document.getElementById('pbShowTower').addEventListener('change',function(){DashboardOptions.showTower = document.getElementById('pbShowTower').checked;saveDashboardOptions();},false);      
        document.getElementById('pbShowWarnings').addEventListener('change',function(){DashboardOptions.showWarnings = document.getElementById('pbShowWarnings').checked;saveDashboardOptions();},false);
        document.getElementById('pbShowLog').addEventListener('change',function(){DashboardOptions.showLog = document.getElementById('pbShowLog').checked;saveDashboardOptions();},false);
        document.getElementById('pbShowMarches').addEventListener('change',function(){DashboardOptions.showMarches = document.getElementById('pbShowMarches').checked;saveDashboardOptions();},false);
      
        createDashboard();

        if (GlobalOptions.pbWideScreenStyle=="wide" || GlobalOptions.pbWideScreenStyle=="ultra") {
        	var m = '<div class="pbStat" id=dbHeader></div>';
	        m += '<TABLE width=100% class=pbTab cellspacing=0 cellpadding=0>';
	        m += '<TR><TD><INPUT id=AttackToggleD type=submit style="width: 120px;"></td><TD><INPUT id=CraftToggle type=submit style="width: 120px;"></td><TD><INPUT id=TransportToggle type=submit style="width: 120px;"></td></tr>';
	        m += '<TR><TD><INPUT id=CrestToggleD type=submit style="width: 120px;"></td><TD><INPUT id=AutoDfToggle type=submit style="width: 120px;"></td><TD><INPUT id=AutotrainToggle type=submit style="width: 120px;"></td></tr>';
	        m += '<TR><TD><INPUT id=AutoFarmToggle type=submit style="width: 120px;"></td><TD><INPUT id=ReassignToggle type=submit style="width: 120px;"></td><TD><INPUT id=AutoSalvageToggle type=submit style="width: 120px;"></td></tr>';        
	        m += '<TR><TD>&nbsp</td></tr><TR><TD><INPUT id=BuildToggle type=submit style="width: 120px;"></td><TD><INPUT id=BuildModeToggle type=submit style="width: 120px;">&nbsp&nbsp<SPAN id=buildStatus style="vertical-align:bottom;"></span></td>';
	        m += '</table>';
	        m+='<BR><DIV id=MarchesSendInfo></div>';
	        m += '<BR><DIV id=CityStatus></div>';
	        m += '<BR><div class="pbStat">THRONE ROOM</div><DIV id=UpgradeStatus></div><DIV id=TriesStatus></div>';
	        m += '<BR><DIV id=ShowTrPresets></div>';
	        m += '<BR><DIV id=ShowRP></div>';
	        m += '<DIV id=TowerAlertPlaceholder></div>';
	        //m += '<BR><DIV id=ShowAutoTrain></div>';
	        m += '<BR><DIV id=ShowTroops></div>';     
	        m += '<DIV id=AlertsPlaceholder></div>';
	        m += '<DIV id=ShowMarches></div>'; 
	        m += '<BR><DIV id=ShowLog></div>';
        } else {
        	var m = '<div class="pbStat" id=dbHeader></div>';
	        m += '<TABLE width=100% class=pbTab cellspacing=0 cellpadding=0>';
	        m += '<TR><TD><INPUT id=AttackToggleD type=submit style="width: 120px;"></td></tr><TR><TD><INPUT id=CraftToggle type=submit style="width: 120px;"></td></tr><TR><TD><INPUT id=TransportToggle type=submit style="width: 120px;"></td></tr>';
	        m += '<TR><TD><INPUT id=CrestToggleD type=submit style="width: 120px;"></td></tr><TR><TD><INPUT id=AutoDfToggle type=submit style="width: 120px;"></td></tr><TR><TD><INPUT id=AutotrainToggle type=submit style="width: 120px;"></td></tr>';
	        m += '<TR><TD><INPUT id=AutoFarmToggle type=submit style="width: 120px;"></td></tr><TR><TD><INPUT id=ReassignToggle type=submit style="width: 120px;"></td></tr><TR><TD><INPUT id=AutoSalvageToggle type=submit style="width: 120px;"></td></tr>';        
	        m += '<TR><TD>&nbsp</td></tr><TR><TD><INPUT id=BuildToggle type=submit style="width: 120px;"></td></tr><TR><TD><INPUT id=BuildModeToggle type=submit style="width: 120px;">&nbsp&nbsp<SPAN id=buildStatus style="vertical-align:bottom;"></span></td>';
	        m += '</table>';
	        m+='<BR><DIV id=MarchesSendInfo></div>';
	        m += '<BR><DIV id=ShowTrPresets></div>';
	        m += '<DIV id=AlertsPlaceholder></div>'; 
        }
        document.getElementById('Dash_div').innerHTML = m;
        unsafeWindow.clearMarches = t.clearMarches;

        if (AtkOptions.Running) document.getElementById('AttackToggleD').value = "Attack = ON";
        	else document.getElementById('AttackToggleD').value = "Attack = OFF";
        if (Tabs.AutoCraft.crafting.running) document.getElementById('CraftToggle').value = "Crafting = ON";
        	else document.getElementById('CraftToggle').value = "Crafting = OFF";
        if (Tabs.transport.traderState.running) document.getElementById('TransportToggle').value = "Transport = ON";
        	else document.getElementById('TransportToggle').value = "Transport = OFF";  
        if (CrestOptions.Running) document.getElementById('CrestToggleD').value = "Crest = ON";
    		else document.getElementById('CrestToggleD').value = "Crest = OFF";  
    	if (DFOptions.Running) document.getElementById('AutoDfToggle').value = "Auto DF = ON";
    		else document.getElementById('AutoDfToggle').value = "Auto DF = OFF";
		if (TrainOptions.Running) document.getElementById('AutotrainToggle').value = "AutoTrain = ON";
			else document.getElementById('AutotrainToggle').value = "AutoTrain = OFF";
		if (FarmOptions.Running) document.getElementById('AutoFarmToggle').value = "Farming = ON";
			else document.getElementById('AutoFarmToggle').value = "Farming = OFF";
		if (Tabs.Reassign.reassignState.running) document.getElementById('ReassignToggle').value = "Reassign = ON";
			else document.getElementById('ReassignToggle').value = "Reassign = OFF";
		if (Options.ThroneDeleteItems) document.getElementById('AutoSalvageToggle').value = "Auto Salvage = ON";
			else document.getElementById('AutoSalvageToggle').value = "Auto Salvage = OFF";
		if (Tabs.build.buildStates.running) document.getElementById('BuildToggle').value = "Auto Build = ON";
			else document.getElementById('BuildToggle').value = "Auto Build = OFF";
		
		document.getElementById('BuildModeToggle').value = "Build Mode = OFF";
		document.getElementById('buildStatus').innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWJJREFUeNrUU79PwkAUvv5IG6iAg8HEMIlxNLBCNxkkYah/gP6NmAChiYQUupjA4uCicbKJBQ0E24OWtvjdgCHGdmHyJV/efffuvrx37x232WzIPsaTPW1vAXGXaJpGRFGUOY67AD0FMsAX8IpSH4Mg8JrNZrwATI6i6KrRaGjVarWWTqePXde1TdO873Q67GYX8GIFwjAs1ev160qlckMp5QG2XQC/Xa1WnK7r7+APsQLr9fq8XC7XbNvmWXd832d7BFnxxWKxhnUvUQAXcqg/7zgOcRyKjIKfmCRJeRZPfETP89zJ5HO6XIYngiAThq1R6k5ZPLGNOPBsGMYglcpEsqyQLSRJicbj8YDFEzOwLGvUat21KfVFVb1Us9nc0WIx/xgOe2a/323PZrPRbwFud5RRvyQIwpmiKCX4AvgB4g6684Z2PsG/MJ4kIMAdsnn4Y+jYi85x3o8V+J+f6VuAAQDR57f+eJX9fgAAAABJRU5ErkJggg=="/>';	 



        document.getElementById('AttackToggleD').addEventListener ('click', function(){Tabs.Attack.toggleAttackState();},false);
        document.getElementById('CraftToggle').addEventListener ('click', function(){Tabs.AutoCraft.toggleStateRunning(this);},false); 
        document.getElementById('TransportToggle').addEventListener ('click', function(){Tabs.transport.toggleTraderState(this);},false);
        document.getElementById('CrestToggleD').addEventListener ('click', function(){Tabs.Crest.toggleCrestState();},false);
        document.getElementById('AutoDfToggle').addEventListener ('click', function(){Tabs.DF.toggleDFState(this);},false);  
        document.getElementById('AutotrainToggle').addEventListener ('click', function(){Tabs.AutoTrain.toggleAutoTrainState(this);},false);
        document.getElementById('AutoFarmToggle').addEventListener ('click', function(){Tabs.farm.toggleBarbState(this);},false);
        document.getElementById('ReassignToggle').addEventListener ('click', function(){Tabs.Reassign.toggleReassignState(this);},false);
        document.getElementById('AutoSalvageToggle').addEventListener ('click', function(){Tabs.Throne.ToggleSalvageState(this);},false);
        document.getElementById('BuildToggle').addEventListener ('click', function(){Tabs.build.toggleStateRunning(this);},false);
        document.getElementById('BuildModeToggle').addEventListener ('click', function(){Tabs.build.toggleStateMode(this);},false);
        
        if (GlobalOptions.pbWideScreenStyle=="wide" || GlobalOptions.pbWideScreenStyle=="ultra") {
        	if (DashboardOptions.showWarnings) t.CheckForAlerts();
	        if (DashboardOptions.showThrone) t.ShowTrPresets();
	        t.RPM();
	        if (DashboardOptions.showStatus) t.CityStatus();
	        if (DashboardOptions.showTower) t.ShowTowerAlerts();
	        if (DashboardOptions.showLog) t.ShowLog();
	        if (DashboardOptions.showTroops) t.ShowTroops();
	        t.ShowMarches();
	        //t.ShowAutoTrain();
        } else {
        	if (DashboardOptions.showThrone) t.ShowTrPresetsMini();
	        t.RPM();
	        if (DashboardOptions.showWarnings) t.CheckForAlerts();
        }
    },

    CheckForAlerts: function (){
    	var t = Tabs.Dashboard;
    	var foodLev = DashboardOptions.foodLevel
    	var woodLev = DashboardOptions.woodLevel
    	var stoneLev = DashboardOptions.stoneLevel
    	var oreLev = DashboardOptions.oreLevel
    	var astoneLev = DashboardOptions.astoneLevel
    	t.Alerts = [];
		for (var a=1; a<=5;a++) for(b=0; b<Cities.numCities; b++) {
			if (a==5) rec = Seed.resources["city" + Seed.cities[b][0]]['rec'+a][0];
				else rec = Math.round(Seed.resources["city" + Seed.cities[b][0]]['rec'+a][0]/3600);
    		switch (a){
    			case 1:if (rec < foodLev) t.Alerts.push(Seed.cities[b][1] + " (" + (b+1) +"): Food warning -> " + addCommas(rec));break;
    			case 2:	if (rec < woodLev) t.Alerts.push(Seed.cities[b][1] + " (" + (b+1) + "): Wood warning -> " + addCommas(rec));break;
    			case 3:	if (rec < stoneLev) t.Alerts.push(Seed.cities[b][1] + " (" + (b+1) + "): Stone warning -> " + addCommas(rec));break;
    			case 4:	if (rec < oreLev) t.Alerts.push(Seed.cities[b][1] + " (" + (b+1) + "): Ore warning -> " + addCommas(rec));break;
    			case 5:	if (rec < astoneLev) t.Alerts.push(Seed.cities[b][1] + " (" + (b+1) + "): Aetherstones warning -> " + addCommas(rec));break;
    		}
    	}
    	for(b=0; b<Cities.numCities; b++) if (Seed.queue_unt["city" + Seed.cities[b][0]].length == 0) t.Alerts.push(Seed.cities[b][1] +  " (" + (b+1) + "): No troops training");

    	for(b=0; b<Cities.numCities; b++) {
    		var check = false;
    		var tech = false;
    		var tech2 = false;
    		for (k in Seed.buildings["city" + Seed.cities[b][0]])	{
    			if (Seed.buildings["city" + Seed.cities[b][0]][k][1] < 9 && Seed.buildings["city" + Seed.cities[b][0]][k][2] < 500) if (Seed.queue_con["city" + Seed.cities[b][0]].length == 0 && Tabs.build["bQ_" + Seed.cities[b][0]].length == 0) check = true;
    			if (Seed.buildings["city" + Seed.cities[b][0]][k][0] == 11 && Seed.queue_tch["city" + Seed.cities[b][0]].length == 0) tech = true;
    			if (Seed.buildings["city" + Seed.cities[b][0]][k][0] == 27 && Seed.queue_tch2["city" + Seed.cities[b][0]].length == 0) tech2 = true;
    		}
    		if (check) t.Alerts.push(Seed.cities[b][1] +  " (" + (b+1) + "): No Buildqueue");
    		if (tech) t.Alerts.push(Seed.cities[b][1] +  " (" + (b+1) + "): No Reseach");
    		if (tech2) t.Alerts.push(Seed.cities[b][1] +  " (" + (b+1) + "): No Briton Reseach");
    	}
    	
    	var count = 0;
    	for (k in unsafeWindow.kocThroneItems) count++;
    	if (count > (Seed.throne.rowNum*5)) t.Alerts.push('Throne Room FULL (' + count + '/' + (Seed.throne.rowNum*5) +')');
    	
    	var msg="";
    	for (k=0;k<t.Alerts.length;k++) msg+= t.Alerts[k] + '<BR>';
    	if (t.Alerts.length > 0) {
    		document.getElementById('AlertsPlaceholder').innerHTML = '<BR><DIV class="pbStatOrange">Warnings</div><DIV id=ShowAlerts></div>'; //style="height: 60px; overflow: auto"
    		document.getElementById('ShowAlerts').innerHTML = msg;	
    	} else document.getElementById('AlertsPlaceholder').innerHTML = "";
    },
    

    ShowMarches: function (){
    	var t = Tabs.Dashboard;
    	var msg= "";
    	t.showMarchesInfo = true;
    	if (MarchOptions.Queue.length > 0) {
    		msg = '<BR><DIV class="pbStat">Marches&nbsp&nbsp<INPUT type=submit id=HideMarches value=Hide></div><DIV id=MarchesInfo></div>';
    		document.getElementById('ShowMarches').innerHTML = msg;
    		msg = '<TABLE width=100% class=pbTab>';
    		msg +='<TR><TD>City</td><TD>Coords</td><TD>Target</td><TD>City</td><TD>Troops</td><TD>Action</td>';
    		for (k=0;k<MarchOptions.Queue.length;k++) {
    			var action = MarchOptions.Queue[k];
    			for (postcity in Seed.cities) if (Seed.cities[postcity][0] == action.city) logcity = Seed.cities[postcity][1];
			    var total = 0;
				var info = "";
				var type="";
				for (i=1;i<=12;i++) total += parseInt(action[i]);
				switch (parseInt(action.tileType)) {
					case 0: info = "Bog";break;
					case 10: info = "Grassland";break;
					case 11: info = "Lake";break;
					case 20: info = "Woods";break;
					case 30: info = "Hills";break;
					case 40: info = "Mountain";break;
					case 50: info = "Plain";break;
					case 51: 
						if (action.targetCityName == null && !action.misted) info = "Barb Camp";
							else info = action.targetName;
						break;
					case 53: info = "Misted City";break;
				}
				switch (parseInt(action.action)) {
					case 1: type = "Transport";break;
					case 2: type = "Reinforce";break;
					case 3: type = "Scout";break;
					case 4: type = "Attack";break;
					case 5: type = "Reassign";break;
				} 
    			msg += '<TR><TD>'+logcity+'</td><TD>'+coordLink(parseInt(action.targetX),parseInt(action.targetY))+'</td><TD>'+info+'</td><TD>'+action.targetCityName+'</td><TD>'+addCommas(total)+'</td><TD><INPUT type=submit id="dbDoAction' + k + '" value='+ type +' style="color:red;"></td>';
    		}
    		document.getElementById('MarchesInfo').innerHTML = msg;
			for (k=0;k<MarchOptions.Queue.length;k++) document.getElementById('dbDoAction' + k).addEventListener('click', function(){Tabs.March.doMarch(MarchOptions.Queue[this.id.substr(10)]);}, false);
			document.getElementById('HideMarches').addEventListener ('click', function(){t.clearMarches();},false);
		} else document.getElementById('ShowMarches').innerHTML = "";

		},
	
	 clearMarches: function (){
    	var t = Tabs.Dashboard;
		if (!t.showMarchesInfo) {
			t.showMarchesInfo=true;
			t.ShowMarches();
		} else {
				if (document.getElementById('MarchesInfo')) document.getElementById('MarchesInfo').innerHTML ="";
				document.getElementById('HideMarches').value = "Show";
				t.showMarchesInfo=false;
			}
    },

    ShowRP: function (){
    	var t = Tabs.Dashboard;
    	var msg = '<DIV class="pbStat">Rallypoints</div><TABLE id=pbRPStats width=100% class=pbTab><TR>';
		for(b=0; b<Cities.numCities; b++) {
    		slots = CheckCityMarches(b);
    		rallypointlevel = getRallypoint(Seed.cities[b][0]);
			msg += '<TD>' + unsafeWindow.roman[b] + ': (' + slots + '/' + rallypointlevel +')</td>';
			if ((b+1)%4==0) msg+='</tr><TR>';
		}
		document.getElementById('ShowRP').innerHTML = msg;
    },

    ShowTrPresets: function (){
    	var t = Tabs.Dashboard;
    	var msg = '<DIV class="pbStat">Throne Preset Switcher &nbsp; <INPUT id=pbTRHelp type=submit value="HELP"></div><TABLE id=pbThroneTr width=100% class=pbTab><TR>';
    	for (i=1;i<=8;i++) {		
    			var total = 0;
    			var active =0;
    			var what="";
    			for (j=1;j<Tabs.Throne.EquipType.length;j++) {
    				what = Tabs.Throne.EquipType[j];
    				id = ThroneOptions.Presets[i][what.toLowerCase()];
    				if (what == "Chair") what = "Throne";
     				if (what == "Windows") what = "Window";
     				if (unsafeWindow.kocThroneItems[id] != undefined && unsafeWindow.kocThroneItems[id].isEquipped) active++;
     				if (id > 0) total++;
    			}
    			if (active == total) msg+= '<TD align="center"><B>'+active+'/'+total+'</b></td>';
    				else msg+= '<TD align="center">'+active+'/'+total+'</td>';
    			msg+= '<TD><INPUT type=submit id="Preset_' + i + '" value="'+ThroneOptions.PresetName[i]+'"></td>';
    			if (i%4==0) msg+='</tr><TR>';
    	}
    	msg += '</tr></table>';
    	msg += '<TABLE class=pbTab><TR><TD style="width:100px">Kabam presets:</td>';
    	for (i=1;i<=Seed.throne.slotNum;i++) msg+='<TD style="width:30px"><INPUT type=submit id="KabamPreset_' + i + '" value="'+i+'"></td>';
    	msg += '</tr></table>';
    	document.getElementById('ShowTrPresets').innerHTML = msg;
    	document.getElementById('pbTRHelp').addEventListener('click', function () {t.helpPop();});
		for (i=1;i<=8;i++) document.getElementById('Preset_' + i).addEventListener ('click', function(){Tabs.Throne.EquipPreset(this.id.substr(7))},false);
		
		for (i=1;i<=Seed.throne.slotNum;i++) {
			document.getElementById('KabamPreset_' + i).addEventListener ('click', function(){Tabs.Throne.EquipKabamPreset(this.id.substr(12))},false);
			if (i==Seed.throne.activeSlot) document.getElementById('KabamPreset_'+i).disabled = true;
		}
    },

	ShowTrPresetsMini: function (){
    	var t = Tabs.Dashboard;
    	var msg = '<DIV class="pbStat">TR Switcher &nbsp; <INPUT id=pbTRHelp type=submit value="?"></div><TABLE id=pbThroneTr width=100% class=pbTab>';
    	for (i=1;i<=6;i++) {
    			msg+= '<TR><TD><INPUT type=submit id="Preset_' + i + '" value="'+ThroneOptions.PresetName[i]+'"></td>';
    			var total = 0;
    			var active =0;
    			var what="";
    			for (j=1;j<Tabs.Throne.EquipType.length;j++) {
    				what = Tabs.Throne.EquipType[j];
    				id = ThroneOptions.Presets[i][what.toLowerCase()];
    				if (what == "Chair") what = "Throne";
     				if (what == "Windows") what = "Window";
     				if (unsafeWindow.kocThroneItems[id] != undefined && unsafeWindow.kocThroneItems[id].isEquipped) active++;
     				if (id > 0) total++;
    			}
    			if (active == total) msg+= '<TD align="center"><B>'+active+'/'+total+'</b></td></tr>';
    				else msg+= '<TD align="center">'+active+'/'+total+'</td></tr>';
    	}
    	msg += '</table>'
    	document.getElementById('ShowTrPresets').innerHTML = msg;
    	document.getElementById('pbTRHelp').addEventListener('click', function () {t.helpPop();});
		for (i=1;i<=6;i++) document.getElementById('Preset_' + i).addEventListener ('click', function(){Tabs.Throne.EquipPreset(this.id.substr(7))},false);
    },
	
	helpPop: function () {
        var helpText = '<BR><B>This DOES work.</b><BR><BR>It just might not do what you think it does.<BR><BR>These are LOCAL presets, it DOES NOT switch the game presets.<BR><BR><U><B>To use this feature...</b></u><BR><BR>1. Go to your BOT and select the Throne tab.<BR><BR>2. Select the Preset subtab.<BR><BR>3. In here you will see local presets that you can rename to whatever you want, eg \'Training\' or \'Range\'.<BR><BR>4. Once named, switch to the \'Compare\' subtab. These are all your cards.<BR><BR>5. Click on any of the titles of the cards. This opens a popup window where you can equip, add to preset, add to update or enhance queue.<BR><BR>6. Once you add it to a preset, go back to the \'Preset\' subtab.<BR><BR>7. You should now see your card in the preset you added it to.<BR><BR>8. Refresh <BR><BR> 9.Click on the \'Quick TR Switcher\' button on the dashboard for those cards to be equipped automatically.';
        var pop = new pbPopup('giftHelp', 0, 0, 425, 485, true);
        pop.centerMe(mainPop.getMainDiv());
        pop.getMainDiv()
            .innerHTML = helpText;
        pop.getTopDiv()
            .innerHTML = '<CENTER><B>TR Switcher Help</b></center>';
        pop.show(true);
	},

	ShowAutoTrain: function (){
    	var t = Tabs.Dashboard;
    	var msg = '<DIV class="pbStat">Auto Train</div>';
		var now = unixTime();
		if (!TrainOptions.Running) msg+="Auto Train is OFF";
			else {
				if (Tabs.AutoTrain.trainTime > now) msg += "Doing Train cycle (Set Preset/Train Troops/Reset TR Items) for: " + timestr(Tabs.AutoTrain.trainTime - now);
					else if (Tabs.AutoTrain.nextround > now) msg += "Next Auto Train cycle in: " + timestr(Tabs.AutoTrain.nextround - now);
		}
 		document.getElementById('ShowAutoTrain').innerHTML = msg;
    },

    ShowTowerAlerts: function (){
    	var t = Tabs.Dashboard;
    	var NoAttack = true;
    	for (k in Seed.queue_atkinc) if (Seed.queue_atkinc[k].marchType == 3 || Seed.queue_atkinc[k].marchType ==4) NoAttack = false;
    	if (NoAttack) {
    		document.getElementById('TowerAlertPlaceholder').innerHTML = "";
    		return;
    	}
    	document.getElementById('TowerAlertPlaceholder').innerHTML = '<BR><DIV class="pbStatRed">Tower Alerts</div><DIV id=ShowTowerAlerts></div>'; //style="height: 100px; overflow: auto">
    	var msg = '';
    	var action = '';
    	var arrivalTime = 0;

    	for(k in Seed.queue_atkinc) {
    		var now = unixTime();
    		var counter = 0;

    		if (Seed.queue_atkinc[k].fromPlayerId != unsafeWindow.tvuid && Seed.queue_atkinc[k].arrivalTime > now) {
				for (postcity in Seed.cities) if (Seed.cities[postcity][0] == Seed.queue_atkinc[k].toCityId) cityName = Seed.cities[postcity][1];
				if (Seed.queue_atkinc[k].marchType == 3) action = "Scout";
				if (Seed.queue_atkinc[k].marchType == 4) action = "Attack";
				arrivalTime = Seed.queue_atkinc[k].arrivalTime - now;
				msg += cityName + ': ' + action + ' -- ETA: ' + timestr(arrivalTime);
				msg +='<BR><TABLE class=pbTab><TR>';
				for (i=1;i<=15;i++){
					if (Seed.queue_atkinc[k]["unts"] == undefined) {
						msg +='<TR><TD>???</td></tr>'; 
					} else if (parseInt(Seed.queue_atkinc[k]["unts"]["u"+i]) > 0) {
						if (counter%4==0) msg+='</tr><TR>';
						counter++;
						msg+='<TD width=30px><img src=http://www352.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_30_s34.jpg></td><TD width=80px>' + parseInt(Seed.queue_atkinc[k]["unts"]["u"+i]) + '</td>';
					}
				}
				msg+='</tr></table>';
			}

    	}
    	document.getElementById('ShowTowerAlerts').innerHTML = msg;
    },

    RPM: function (){
    	var t = Tabs.Dashboard;
    	var now=unixTime();
        var time = 0;
        var calc = 0
        time = now - RPMtime;   
        calc =(RPM/time)*60;
        calc = Math.round(calc);
        if (time <30) calc = "...";
        document.getElementById('dbHeader').innerHTML = "Requests send per minute: " + calc; 
    },

    CityStatus: function (){
    	var t = Tabs.Dashboard;
    	var msg = '<DIV class="pbStat">City Defend Status</div><TABLE id=pbRPStats width=100% class=pbTab><TR>';
    	for(b=0; b<Cities.numCities; b++) msg+= '<TD><INPUT type=submit id="cityDEF_' + Seed.cities[b][0] + '" value="'+unsafeWindow.roman[b]+'"></td>';
    	document.getElementById('CityStatus').innerHTML = msg;
    	for(b=0; b<Cities.numCities; b++) {
    		if (parseInt(Seed.citystats["city" + Seed.cities[b][0]].gate) == 0) document.getElementById('cityDEF_' + Seed.cities[b][0]).style.backgroundColor  = "green";
    			else document.getElementById('cityDEF_' + Seed.cities[b][0]).style.backgroundColor  = "red";
    		document.getElementById('cityDEF_' + Seed.cities[b][0]).style.color  = "white";
    		document.getElementById('cityDEF_' + Seed.cities[b][0]).addEventListener ('click', function(){
	    		var city = this.id.substr(8);
	    		if (parseInt(Seed.citystats["city" + city].gate) == 0) t.ChangeDefMode(city,1);
	    		if (parseInt(Seed.citystats["city" + city].gate) == 1) t.ChangeDefMode(city,0);
      		},false);
    	}    	
    },

    ChangeDefMode : function (cityId, state){
    	var t = Tabs.Dashboard;
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.cid = cityId;
        params.state = state;
        RPM++;
        new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/gate.php" + unsafeWindow.g_ajaxsuffix, {
            method: "post",
            parameters: params,
            onSuccess: function (rslt) {
                if (rslt.ok) {
                    Seed.citystats["city" + cityId].gate = state;
                    if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
                }
            },
            onFailure: function () {
            }
        })
  	},

  	ShowLog: function (){
  		var t = Tabs.Dashboard;
  		var msg = '<DIV class="pbStat">Action Log</div>';
  		var amount = parseInt(Tabs.ActionLog.last250.length)-1;
  		for (i=amount;i>(amount-5);i--) if (Tabs.ActionLog.last250[i] != undefined) msg+= Tabs.ActionLog.last250[i].ts + ': ' + Tabs.ActionLog.last250[i].msg + '<BR>';
  		document.getElementById('ShowLog').innerHTML = msg;
    
    },

    ShowTroops: function (){
    	var t = Tabs.Dashboard;
    	var msg = '<DIV class="pbStat">Troops</div>';
    	msg+= '<SPAN id=dbCityCel></span>&nbsp&nbsp&nbsp<INPUT type=submit id="HideTroops" value="Hide"><BR><DIV id=dbCityInfo></div>';
    	document.getElementById('ShowTroops').innerHTML = msg;  	
    	t.tcp = new CdispCityPicker ('dbCityCelBut', document.getElementById('dbCityCel'), true, t.PaintTroops);
    	document.getElementById('HideTroops').addEventListener ('click', function(){document.getElementById('dbCityInfo').innerHTML = "";t.tcp = new CdispCityPicker ('dbCityCelBut', document.getElementById('dbCityCel'), true, t.PaintTroops)},false);	
    },

    PaintTroops: function (){
    	var t = Tabs.Dashboard;
    	var info ='<TABLE id=pbRPStats width=100% class=pbTab><TR>';
    	for (l in Seed.units['city' + t.tcp.city.id]) {
    		info+= '<TD style="width: 30px;"><img src=https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_'+ l.substr(3) +'_30_s34.jpg?6545></td><TD style="vertical-align: middle;">' + addCommas(Seed.units['city' + t.tcp.city.id][l]) +'</td>';
    		if (l.substr(3)%4==0) info+='</tr><TR>';
    	}
    	document.getElementById('dbCityInfo').innerHTML = info;
    },

    show: function (){},
    
    hide : function (){}
}

    

/*********************************** Options Tab ***********************************/
Tabs.Options = {
  tabOrder: 699,
  myDiv : null,
  fixAvailable : {},

  init : function (div){
    var t = Tabs.Options;
    t.myDiv = div;
    try {      
      m = '<DIV style="height:500px; max-height:500px; overflow-y:auto"><TABLE width=100% class=pbOptions cellspacing=0 cellpadding=0>\
        <TR><TD colspan=2><B>'+translate("Power Bot Config:")+'</b></td></tr>\
        <TR><TD>&nbsp;&nbsp;&nbsp;-</td><TD>Global Rallypoint setting (Crest/DF/Attack/Transport/Reassign) - Keep <INPUT id=pbRPClip type=text size=1 maxlength=1> rallypoint slots free.</td></tr>\
        <TR><TD><INPUT id=pballowWinMove type=checkbox /></td><TD>'+translate("Enable window drag (move window by dragging top bar with mouse)")+'</td></tr>\
        <TR><TD><INPUT id=pbTrackWinOpen type=checkbox /></td><TD>'+translate("Remember window open state on refresh")+'</td></tr>\
        <TR><TD><INPUT id=pbHideOnGoto type=checkbox /></td><TD>'+translate("Hide window when clicking on map coordinates")+'</td></tr>\
        <TR><TD><INPUT id=pbWideOpt type=checkbox '+ (GlobalOptions.pbWideScreen?'CHECKED ':'') +'/></td><TD>'+translate("Enable widescreen style:")+' '+ htmlSelector({normal:'Normal', wide:'Widescreen', ultra:'Ultra'},GlobalOptions.pbWideScreenStyle,'id=selectScreenMode') +' '+translate("(all domains, requires refresh)")+'</td></tr>\
        <TR><TD><INPUT id=pbsendmeaway type=checkbox '+ (GlobalOptions.pbNoMoreKabam?'CHECKED ':'')+'/></td><TD>'+translate("Send me away from Kabam!")+'</td></tr>\
        <TR><TD>&nbsp;&nbsp;&nbsp;-</td><TD>'+translate("Change window transparency between \"0.7 - 2\" ")+'&nbsp <INPUT id=pbtogOpacity type=text size=3 /> <span style="color:#800; font-weight:bold"><sup>'+translate("*Requires Refresh")+'</sup></span></td></tr>\
        <TR><TD colspan=2><BR><B>'+translate("KofC Features:")+'</b></td></tr>\
        <TR><TD><INPUT id=pbFairie type=checkbox /></td><TD>'+translate("Disable annoying Faire and Court popups")+'</td></tr>\
        <TR><TD><INPUT id=pbWatchEnable type=checkbox '+ (GlobalOptions.pbWatchdog?'CHECKED ':'') +'/></td><TD>'+translate("Refresh if KOC not loaded within 1 minute (all domains)")+'</td></tr>\
        <TR><TD><INPUT id=pbEveryEnable type=checkbox /></td><TD>'+translate("Refresh KOC every")+' <INPUT id=pbeverymins type=text size=2 maxlength=3 \> '+translate("minutes")+'</td></tr>\
        <TR><TD><INPUT id=pbChatREnable type=checkbox /></td><TD>'+translate("Put chat on right (requires wide screen)")+'</td></tr>\
        <TR><TD><INPUT id=pbWMapEnable type=checkbox /></td><TD>'+translate("Use WideMap (requires wide screen)")+'</td></tr>\
        <TR><TD><INPUT id=pbGoldEnable type=checkbox /></td><TD>'+translate("Auto collect gold when happiness reaches")+' <INPUT id=pbgoldLimit type=text size=2 maxlength=3 \>%</td></tr>\
        <TR><TD><INPUT id=pbFoodToggle type=checkbox /></td><TD>'+translate("Enable Food Alert (on less than 6 Hours of food. Checked every hour)")+'</td></tr>\
        <TR><TD colspan=2><BR><B>'+translate("Extra Features")+':</b></td></tr>\
        <TR><TD><INPUT id=HelReq type=checkbox /></td><TD>'+translate("Help alliance build/research posts")+'</td></tr>\
        <TR><TD><INPUT id=DelReq type=checkbox /></td><TD>'+translate("Hide alliance requests in chat")+'</td></tr>\
        <TR><TD><INPUT id=PubReq type=checkbox '+ (GlobalOptions.autoPublishGamePopups?'CHECKED ':'') +'/></td><TD>'+translate("Auto HIDE Facebook posts")+'</td>\
        <TR><TD><INPUT id=MapExtra type=checkbox /></td><TD>'+translate("Show Player & Might in map")+'.</td></tr>\
        <TR><TD><INPUT id=deletetoggle type=checkbox /></td><TD> '+translate("Auto delete barb/transport reports from you")+'</td></tr>\
        <TR><TD><INPUT id=deletes0toggle type=checkbox /></td><TD> '+translate("Auto delete transport reports to you")+'</td></tr>\
        <TR><TD><INPUT id=deletes1toggle type=checkbox /></td><TD> '+translate("Auto delete wild reports")+'</td></tr>\
        <TR><TD><INPUT id=deletes2toggle type=checkbox /></td><TD> '+translate("Auto delete crest reports regardless of target type")+'</td></tr>\
        <TR><TD><INPUT id=deletes3toggle type=checkbox /></td><TD> '+translate("Auto delete DF reports")+'</td></tr>\
        <TR><TD><INPUT id=MAgicBOx type=checkbox /></td><TD> '+translate("Kill merlins magic box's on startup")+'</td></tr>\
        </table><BR><BR><HR>'+translate("Note that if a checkbox is greyed out there has probably been a change of KofC\'s code, rendering the option inoperable")+'.</div>';
        m += strButton20(translate('Reset ALL Options'), 'id=ResetALLOPT');
      div.innerHTML = m;

      document.getElementById('selectScreenMode').addEventListener ('change', function(){
              GlobalOptions.pbWideScreenStyle = document.getElementById('selectScreenMode').value;
              GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);    
      document.getElementById('PubReq').addEventListener ('change', function(){
              GlobalOptions.autoPublishGamePopups = document.getElementById('PubReq').checked;
            GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);    
      document.getElementById('pbsendmeaway').addEventListener ('click', function(){
            GlobalOptions.pbNoMoreKabam = document.getElementById('pbsendmeaway').checked;
            GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);    
      
      document.getElementById('ResetALLOPT').addEventListener ('click', function(){
              var serverID = getServerId();
              RemoveList = (GM_listValues());
              for (i=0;i<RemoveList.length;i++){
                  GM_deleteValue(RemoveList[i]);
              }
              ResetAll=true;
              reloadKOC();
      },false);

      document.getElementById('pbWatchEnable').addEventListener ('change', t.e_watchChanged, false);
      document.getElementById('pbWideOpt').addEventListener ('change', t.e_wideChanged, false);
      t.changeOpt ('pbtogOpacity', 'Opacity');
      t.changeOpt ('pbRPClip', 'RPClip');
      t.togOpt ('pballowWinMove', 'pbWinDrag', mainPop.setEnableDrag);
      t.togOpt ('pbTrackWinOpen', 'pbTrackOpen');
      t.togOpt ('pbHideOnGoto', 'hideOnGoto');
      t.togOpt ('pbFairie', 'pbKillFairie', FairieKiller.setEnable);
      t.togOpt ('pbGoldEnable', 'pbGoldEnable', CollectGold.setEnable);
      t.changeOpt ('pbgoldLimit', 'pbGoldHappy');
      t.togOpt ('pbFoodToggle', 'pbFoodAlert');
      t.changeOpt ('pbeverymins', 'pbEveryMins' , RefreshEvery.setTimer);
      t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
      t.togOpt ('pbChatREnable', 'pbChatOnRight', WideScreen.setChatOnRight);
      t.togOpt ('pbWMapEnable', 'pbWideMap', WideScreen.useWideMap);
      t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
      t.togOpt ('HelReq', 'HelpRequest');
      t.togOpt ('DelReq', 'DeleteRequest');
      t.togOpt ('MapExtra', 'MapShowExtra');
      t.togOpt ('deletetoggle', 'DeleteMsg');
      t.togOpt ('deletes0toggle', 'DeleteMsgs0');
      t.togOpt ('deletes1toggle', 'DeleteMsgs1');
      t.togOpt ('deletes2toggle', 'DeleteMsgs2'); 
      t.togOpt ('deletes3toggle', 'DeleteMsgs3');
      t.togOpt ('MAgicBOx', 'KMagicBox');          

      
    } catch (e) {
      div.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }      
  },

  hide : function (){
  },

  show : function (){
  },

  togOpt : function (checkboxId, optionName, callOnChange){
    var t = Tabs.Options;
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
    var t = Tabs.Options;
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
  
  e_watchChanged : function (){
    GlobalOptions.pbWatchdog = document.getElementById('pbWatchEnable').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
  },
  
  e_wideChanged : function (){
    GlobalOptions.pbWideScreen = document.getElementById('pbWideOpt').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
  },
  
  e_updateChanged : function (){
    GlobalOptions.pbupdate = document.getElementById('pbupdate').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
  },
  
}


/*********************************** Export Tab ***********************************/
Tabs.Export = {
    tabOrder: 800,
    tabLabel: 'Export',
    myDiv : null,
    Data : {Options:{}, GlobalOptions:{}, Build1:{}, Build2:{}, Build3:{}, Build4:{}, Build5:{}, Build6:{}, Build7:{}, Build8:{}, ThroneOptions:{}, CrestOptions:{}, TrainOptions:{}, ReassignRoutes:{}, BuildOptions:{}, TransportOptions:{}, TransportState:{}, RaidOptions:{}, DFOptions:{}, ApothecaryOptions:{}, FarmOptions:{}, TradeOptions:{}, MarchOptions:{}},

    init : function (div){
        var t = Tabs.Export;
        t.myDiv = div;
        var m = '<div class="pbStat">OPTIONS EXPORT TOOL</div>';

        m+='<TABLE align="center"><TD><input type="submit" value="Import" id="pbImport_submit"></td><TD><input type="submit" value="Export" id="pbexport_submit"></td></table>';
        m+= '<BR><textarea type="text" id="pbImportData" rows=20 cols=80></textarea>';
        t.myDiv.innerHTML = m;
        $('pbexport_submit').addEventListener('click', t.doExport, false);

        $('pbImport_submit').addEventListener('click', t.doImport, false);
    },

    doImport: function (){
    	var t = Tabs.Export;
    	var serverID = getServerId();
    	var Data = JSON2.parse(document.getElementById('pbImportData').value);
    	if (Data.TransportOptions != {}) Tabs.transport.tradeRoutes = Data.TransportOptions;
    	Tabs.transport.saveTradeRoutes();
    	if (Data.TransportState != {}) Tabs.transport.traderState = Data.TransportState;
    	Tabs.transport.saveTraderState();
    	if (Data.ReassignRoutes != {}) Tabs.Reassign.reassignRoutes = Data.ReassignRoutes;
    	Tabs.Reassign.saveReassignRoutes();

    	for (i=0;i<Seed.cities.length;i++) if (Data["Builds" + (i+1)].length > 0) Tabs.build["bQ_" + Seed.cities[i][0]] = Data["Builds" + (i+1)];

    	if (Data.Options != {}) Options = Data.Options;
    	saveOptions();
    	if (Data.GlobalOptions != {}) GlobalOptions = Data.GlobalOptions;
    	GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
    	if (Data.ThroneOptions != {}) ThroneOptions = Data.ThroneOptions;
    	saveThroneOptions();
    	if (Data.TrainOptions != {}) TrainOptions = Data.TrainOptions;
    	saveTrainOptions();
    	if (Data.ApothecaryOptions != {}) ApothecaryOptions = Data.ApothecaryOptions;
    	if (Data.FarmOptions != {}) FarmOptions = Data.FarmOptions;
    	saveFarmOptions();
    	if (Data.MarchOptions != {}) MarchOptions = Data.MarchOptions;
    	saveMarchOptions();
    	reloadKOC();    
    },

    doExport: function (){
    	var t = Tabs.Export;
    	var serverID = getServerId();

    	for (i=0;i<Seed.cities.length;i++) t.Data["Builds" + (i+1)] = JSON2.parse(GM_getValue('bQ_' + serverID + '_' + Seed.cities[i][0]));
        t.Data.TransportOptions = Tabs.transport.tradeRoutes;
        t.Data.TransportState = Tabs.transport.traderState
    	t.Data.Options = Options;
    	t.Data.GlobalOptions = GlobalOptions;
    	t.Data.ThroneOptions = ThroneOptions;
    	t.Data.CrestOptions = CrestOptions;
    	t.Data.TrainOptions = TrainOptions;
    	t.Data.DFOptions = DFOptions;
    	t.Data.ApothecaryOptions = ApothecaryOptions;
    	t.Data.FarmOptions = FarmOptions;
    	t.Data.MarchOptions = MarchOptions;
    	t.Data.ReassignRoutes = Tabs.Reassign.reassignRoutes;
    	document.getElementById('pbImportData').value = JSON2.stringify(t.Data);
    	document.getElementById('pbImportData').select();
    },
    
    show: function (){
    
    },
    
    hide : function (){
    
    }
}

/****************************  Reassign Implementation  *******************************/
var troops = {1:'SupplyTroops',
              2:'Militiaman',
              3:'Scout',
              4:'Pikeman',
              5:'Swordsman',
              6:'Archer',
              7:'Cavalry',
              8:'HeavyCavalry',
              9:'SupplyWagon',
              10:'Ballista',
              11:'BatteringRam',
              12:'Catapult'};  

Tabs.Reassign = {
  tabOrder: 30,
  tabLabel: 'Reassign',
  myDiv: null,
  timer: null,
  reassignState: [],
  lRE: [],
  reassignRoutes: [],
  rallypointlevel:null,
  count:0,
  check:false,

    init: function(div){
        var t = Tabs.Reassign;
        t.myDiv = div;
        t.reassignState = {
            running: false,
        };
        t.readReassignState();
        t.readReassignRoutes();
        t.e_reassignRoutes();

      var m = '<DIV id=pbReMainDivF class=pbStat>'+translate("AUTOMATED REASSIGN FUNCTION")+'</div><TABLE id=pbtraderfunctions width=100% height=0% class=pbTab><TR align="center">';
      if (t.reassignState.running == false) {
          m += '<TD><INPUT id=pbReassignState type=submit value="Reassign = OFF"></td>';
      } else {
          m += '<TD><INPUT id=pbReassignState type=submit value="Reassign = ON"></td>';
      }
      m += '<TD><INPUT id=pbReassShowRoutes type=submit value="Show Routes"></td>';
      m += '</tr></table></div>';
      m += '<DIV id=pbReassignDivD class=pbStat>'+translate("ADD REASSIGN ROUTE")+'</div>';

      m += '<TABLE id=pbaddreasignroute width=95% height=0% class=pbTab><TR align="left">';
      m += '<TD width=20px>'+translate("From City:")+'</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptassigncity></span></div></td></tr>';

      m += '<TR align="left">';
      m += '<TD width=20px>'+translate("To City:")+'</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptassigncityTo></span></div></td>';
      
        m += '<TR align="left">';
        m += '<TD colspan=4>'+translate("Check reassign every:")+' <INPUT id=pbreassigninterval type=text size=2 value="'+Options.reassigninterval+'"\> '+translate("minutes")+'</td></tr>';
        m += '<TR><TD><INPUT id=autofilloff type=checkbox unchecked=true\> '+translate("Lock troop values")+'</TR></TD></table>';
      m += '<DIV style="margin-top:10px;margin-bottom:5px;">'+translate("Fill in the number of troops you want to keep in a city:")+'</div>';
      m += '<TABLE id=pbaddreasignroute width=100% height=0% class=pbTab><TR align="center">';
      
      m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_50.jpg?6545"></td>';
      m += '<TD>'+translate("Supply Troop")+'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_50.jpg?6545"></td>'
      m += '<TD>'+translate("Militiaman")+'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_50.jpg?6545"></td>'
      m += '<TD>'+translate("Scout")+'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_50.jpg?6545"></td>'
      m += '<TD>'+translate("Pikeman")+'</td></tr>'
      m += '<TR><TD><INPUT id=pbSupplyTroops type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetSupplyTroops disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbMilitiaman type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetMilitiaman disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbScout type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetScout disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbPikeman type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetPikeman disabled=true type=text size=10 maxlength=10 value="0"\></td></tr>';
      
      m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_50.jpg?6545"></td>';
      m += '<TD>'+translate("Swordsman")+'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545"></td>'
      m += '<TD>'+translate("Archer")+'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_50.jpg?6545"></td>'
      m += '<TD>'+translate("Cavalry")+'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_50.jpg?6545"></td>'
      m += '<TD>'+translate("Heavy Cavalry")+'</td></tr>'
      m += '<TR><TD><INPUT id=pbSwordsman type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetSwordsman disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbArcher type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetArcher disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbCavalry type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetCavalry disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbHeavyCavalry type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetHeavyCavalry disabled=true type=text size=10 maxlength=10 value="0"\></td></tr>';
      
      m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_50.jpg?6545"></td>';
      m += '<TD>'+translate("Supply Wagon")+'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_50.jpg?6545"></td>'
      m += '<TD>'+translate("Ballista")+'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_50.jpg?6545"></td>'
      m += '<TD>'+translate("Battering Ram")+'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_50.jpg?6545"></td>'
      m += '<TD>'+translate("Catapult")+'</td></tr>'
      m += '<TR><TD><INPUT id=pbSupplyWagon type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetSupplyWagon disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbBallista type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetBallista disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbBatteringRam type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetBatteringRam disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbCatapult type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetCatapult disabled=true type=text size=10 maxlength=10 value="0"\></td></tr></table>';
      
      m += '<DIV style="text-align:center; margin-top:15px"><INPUT id=pbSaveRouteReassign type=submit value="'+translate("Add Route")+'"></div>';
      
      t.myDiv.innerHTML = m;
      
      t.tcp = new CdispCityPicker ('ptreassign', document.getElementById('ptassigncity'), true, null, 0);
      t.tcpto = new CdispCityPicker ('ptreassignTo', document.getElementById('ptassigncityTo'), true);
      for(var k in troops) document.getElementById('pbtarget'+troops[k]).value = parseInt(Seed.units['city' + t.tcp.city.id]['unt'+k]);

      document.getElementById('ptassigncity').addEventListener('click', function(){if(document.getElementById('autofilloff').checked == false) for(var k in troops) document.getElementById('pbtarget'+troops[k]).value = parseInt(Seed.units['city' + t.tcp.city.id]['unt'+k]);}, false);
      document.getElementById('pbReassignState').addEventListener('click', function(){t.toggleReassignState(this);}, false);
      document.getElementById('pbSaveRouteReassign').addEventListener('click', function(){t.addReassignRoute();}, false);
      document.getElementById('pbReassShowRoutes').addEventListener('click', function(){t.showReassignRoutes();}, false);
      
      document.getElementById('pbreassigninterval').addEventListener('keyup', function(){
        if (isNaN(document.getElementById('pbreassigninterval').value)){ document.getElementById('pbreassigninterval').value=0 ;}
        Options.reassigninterval = document.getElementById('pbreassigninterval').value;
        saveOptions();
      }, false);
      
    document.getElementById('pbtargetSupplyTroops').addEventListener('keyup', function(){if (isNaN(document.getElementById('pbtargetSupplyTroops').value)) document.getElementById('pbtargetSupplyTroops').value=0 ;}, false);
    document.getElementById('pbtargetMilitiaman').addEventListener('keyup', function(){if (isNaN(document.getElementById('pbtargetMilitiaman').value)) document.getElementById('pbtargetMilitiaman').value=0 ;}, false);
    document.getElementById('pbtargetScout').addEventListener('keyup', function(){if (isNaN(document.getElementById('pbtargetScout').value)) document.getElementById('pbtargetScout').value=0 ;}, false);
    document.getElementById('pbtargetPikeman').addEventListener('keyup', function(){if (isNaN(document.getElementById('pbtargetPikeman').value)) document.getElementById('pbtargetPikeman').value=0 ;}, false);
    document.getElementById('pbtargetSwordsman').addEventListener('keyup', function(){if (isNaN(document.getElementById('pbtargetSwordsman').value)) document.getElementById('pbtargetSwordsman').value=0 ;}, false);
    document.getElementById('pbtargetArcher').addEventListener('keyup', function(){if (isNaN(document.getElementById('pbtargetArcher').value)) document.getElementById('pbtargetArcher').value=0 ;}, false);
    document.getElementById('pbtargetCavalry').addEventListener('keyup', function(){if (isNaN(document.getElementById('pbtargetCavalry').value)) document.getElementById('pbtargetCavalry').value=0 ;}, false);
    document.getElementById('pbtargetHeavyCavalry').addEventListener('keyup', function(){if (isNaN(document.getElementById('pbtargetHeavyCavalry').value)) document.getElementById('pbtargetHeavyCavalry').value=0 ;}, false);
    document.getElementById('pbtargetSupplyWagon').addEventListener('keyup', function(){if (isNaN(document.getElementById('pbtargetSupplyWagon').value)) document.getElementById('pbtargetSupplyWagon').value=0 ;}, false);
    document.getElementById('pbtargetBallista').addEventListener('keyup', function(){if (isNaN(document.getElementById('pbtargetBallista').value)) document.getElementById('pbtargetBallista').value=0 ;}, false);
    document.getElementById('pbtargetBatteringRam').addEventListener('keyup', function(){if (isNaN(document.getElementById('pbtargetBatteringRam').value)) document.getElementById('pbtargetBatteringRam').value=0 ;}, false);
    document.getElementById('pbtargetCatapult').addEventListener('keyup', function(){if (isNaN(document.getElementById('pbtargetCatapult').value)) document.getElementById('pbtargetCatapult').value=0 ;}, false);
     
      
      document.getElementById('pbSupplyTroops').addEventListener('click', function(){
          if (document.getElementById('pbSupplyTroops').checked==false) {
              document.getElementById('pbtargetSupplyTroops').disabled = true;
          }
          else {
            document.getElementById('pbtargetSupplyTroops').disabled = false;
          }
      },false);
      document.getElementById('pbMilitiaman').addEventListener('click', function(){
          if (document.getElementById('pbMilitiaman').checked==false) {
              document.getElementById('pbtargetMilitiaman').disabled = true;
          }
          else {
            document.getElementById('pbtargetMilitiaman').disabled = false;
          }
      },false);
      document.getElementById('pbScout').addEventListener('click', function(){
          if (document.getElementById('pbScout').checked==false) {
              document.getElementById('pbtargetScout').disabled = true;
          }
          else {
            document.getElementById('pbtargetScout').disabled = false;
          }
      },false);
      document.getElementById('pbPikeman').addEventListener('click', function(){
          if (document.getElementById('pbPikeman').checked==false) {
              document.getElementById('pbtargetPikeman').disabled = true;
          }
          else {
            document.getElementById('pbtargetPikeman').disabled = false;
          }
      },false);
      document.getElementById('pbSwordsman').addEventListener('click', function(){
          if (document.getElementById('pbSwordsman').checked==false) {
              document.getElementById('pbtargetSwordsman').disabled = true;
          }
          else {
            document.getElementById('pbtargetSwordsman').disabled = false;
          }
      },false);
      document.getElementById('pbArcher').addEventListener('click', function(){
          if (document.getElementById('pbArcher').checked==false) {
              document.getElementById('pbtargetArcher').disabled = true;
          }
          else {
            document.getElementById('pbtargetArcher').disabled = false;
          }
      },false);
      document.getElementById('pbCavalry').addEventListener('click', function(){
          if (document.getElementById('pbCavalry').checked==false) {
              document.getElementById('pbtargetCavalry').disabled = true;
          }
          else {
            document.getElementById('pbtargetCavalry').disabled = false;
          }
      },false);
      document.getElementById('pbHeavyCavalry').addEventListener('click', function(){
          if (document.getElementById('pbHeavyCavalry').checked==false) {
              document.getElementById('pbtargetHeavyCavalry').disabled = true;
          }
          else {
            document.getElementById('pbtargetHeavyCavalry').disabled = false;
          }
      },false);
      document.getElementById('pbSupplyWagon').addEventListener('click', function(){
          if (document.getElementById('pbSupplyWagon').checked==false) {
              document.getElementById('pbtargetSupplyWagon').disabled = true;
          }
          else {
            document.getElementById('pbtargetSupplyWagon').disabled = false;
          }
      },false);
      document.getElementById('pbBallista').addEventListener('click', function(){
          if (document.getElementById('pbBallista').checked==false) {
              document.getElementById('pbtargetBallista').disabled = true;
          }
          else {
            document.getElementById('pbtargetBallista').disabled = false;
          }
      },false);
      document.getElementById('pbBatteringRam').addEventListener('click', function(){
          if (document.getElementById('pbBatteringRam').checked==false) {
              document.getElementById('pbtargetBatteringRam').disabled = true;
          }
          else {
            document.getElementById('pbtargetBatteringRam').disabled = false;
          }
      },false);
      document.getElementById('pbCatapult').addEventListener('click', function(){
          if (document.getElementById('pbCatapult').checked==false) {
              document.getElementById('pbtargetCatapult').disabled = true;
          }
          else {
            document.getElementById('pbtargetCatapult').disabled = false;
          }
      },false);
      
      
      window.addEventListener('unload', t.onUnload, false);
    },
    
    getRallypoint: function(cityId){
      var t = Tabs.Reassign;
      for (var o in Seed.buildings[cityId]){
        var buildingType = parseInt(Seed.buildings[cityId][o][0]);
        var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
        if (buildingType == 12) t.rallypointlevel=parseInt(buildingLevel);
       }  
    },
            
    

    e_reassignRoutes: function(){
      var t = Tabs.Reassign;
      var now = new Date();
      if (t.reassignState.running == true)    {
          var now = new Date().getTime()/1000.0;
          now = now.toFixed(0);
          var last = Options.lastreassign;
               if ( now > (parseInt(last) + (Options.reassigninterval*60))){
                  t.checkdoReassign();
              }
      }
      setTimeout(function(){ t.e_reassignRoutes();}, Options.reassigninterval*1000);
      
    },
        
    delReassignRoutes: function() {     
        var t = Tabs.Reassign;       
        t.reassignRoutes= [];
    },
    checkcoords : function (obj){
        var t = Tabs.Reassign;
        if(obj.id == 'pbok'){
            t.check = true;
            t.addReassignRoute();
        }
        return;            
    },
    addReassignRoute: function () {
        var t = Tabs.Reassign;
        var city = t.tcp.city.id;
        if(t.tcpto.city == null){
            new CdialogCancelContinue('<SPAN class=boldRed>'+translate("No destination selected!")+'</span>', null, null, mainPop.getMainDiv);
            return;
        }
        if(t.tcp.city.id == t.tcpto.city.id){
            new CdialogCancelContinue('<SPAN class=boldRed>'+translate("Can\'t reassign to same city!")+'</span>', null, null, mainPop.getMainDiv);
            return;
        }
        if ((t.tcpto.city.x == 0 && t.tcpto.city.y == 0)&& !t.check)
        {
            new CdialogConfirm ('<SPAN class=boldRed>'+translate("You are about to set a route to location 0,0!")+'</span>', t.checkcoords, unsafeWindow.modal_attack_check, mainPop.getMainDiv);
            return;
        }
        t.check = false;
        
        var SendSupplyTroop = document.getElementById('pbSupplyTroops').checked;
        var SendMilitiaman = document.getElementById('pbMilitiaman').checked;
        var SendScout = document.getElementById('pbScout').checked;
        var SendPikeman = document.getElementById('pbPikeman').checked;
        var SendSwordsman = document.getElementById('pbSwordsman').checked;
        var SendArchers = document.getElementById('pbArcher').checked;
        var SendCavalry = document.getElementById('pbCavalry').checked;
        var SendHeavyCavalry = document.getElementById('pbHeavyCavalry').checked;
        var SendSupplyWagons = document.getElementById('pbSupplyWagon').checked;
        var SendBallista = document.getElementById('pbBallista').checked;
        var SendBatteringRam = document.getElementById('pbBatteringRam').checked;
        var SendCatapult = document.getElementById('pbCatapult').checked;
        var SupplyTroop = document.getElementById('pbtargetSupplyTroops').value;
        var Militiaman = document.getElementById('pbtargetMilitiaman').value;
        var Scout = document.getElementById('pbtargetScout').value;
        var Pikeman = document.getElementById('pbtargetPikeman').value;
        var Swordsman = document.getElementById('pbtargetSwordsman').value;
        var Archers = document.getElementById('pbtargetArcher').value;
        var Cavalry = document.getElementById('pbtargetCavalry').value;
        var HeavyCavalry = document.getElementById('pbtargetHeavyCavalry').value;
        var SupplyWagons = document.getElementById('pbtargetSupplyWagon').value;
        var Ballista = document.getElementById('pbtargetBallista').value;
        var BatteringRam = document.getElementById('pbtargetBatteringRam').value;
        var Catapult = document.getElementById('pbtargetCatapult').value;
        var target_x = t.tcpto.city.x;
        var target_y = t.tcpto.city.y;
        var target_city = t.tcpto.city.id;
                
        var lRE = t.reassignRoutes;
            lRE.push({
                city:                city,
                target_x:            target_x,
                target_y:            target_y,
                target_city:        target_city,
                SendSupplyTroop:    SendSupplyTroop,
                SupplyTroop:        SupplyTroop,
                SendMilitiaman:        SendMilitiaman,
                Militiaman:            Militiaman,
                SendScout:            SendScout,
                Scout:                Scout,
                SendPikeman:         SendPikeman,
                Pikeman:             Pikeman,
                SendSwordsman:        SendSwordsman,
                Swordsman:            Swordsman,
                SendArchers:        SendArchers,
                Archers:            Archers,
                SendCavalry:         SendCavalry,
                Cavalry:             Cavalry,
                SendHeavyCavalry:    SendHeavyCavalry,
                HeavyCavalry:        HeavyCavalry,
                SendSupplyWagons:    SendSupplyWagons,
                SupplyWagons:        SupplyWagons,
                SendBallista:         SendBallista,
                Ballista:             Ballista,
                SendBatteringRam:    SendBatteringRam,
                BatteringRam:        BatteringRam,
                SendCatapult:        SendCatapult,
                Catapult:            Catapult,
            });
        document.getElementById('pbReassignDivD').style.background ='#99FF99';
        setTimeout(function(){ (document.getElementById('pbReassignDivD').style.background =''); }, 1000);
    },
    showReassignRoutes: function () {
        var t = Tabs.Reassign;
        var popReassignRoutes = null;
        t.popReassignRoutes = new pbPopup('pbShowTrade', 0, 0, 1100, 485, true, function() {clearTimeout (1000);});
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbShowReassignRoutes" id="pbRoutesQueue">';       
        t.popReassignRoutes.getMainDiv().innerHTML = '</table></div>' + m;
        t.popReassignRoutes.getTopDiv().innerHTML = '<TD><CENTER><B>'+translate("Reassign routes")+'</center></td>';
        t.paintReassignRoutes();
        t._addTabHeader();
        t.popReassignRoutes.show(true)    ;
    },
    paintReassignRoutes: function(){
            var t = Tabs.Reassign;
            var r = t.reassignRoutes;
            var cityname;
            for (var i = (r.length-1); i>=0; i--) {
                for (var y=0; y< Seed.cities.length;y++) {
                    if ( parseInt(Seed.cities[y][0]) == r[i].city) var cityname = Seed.cities[y][1];
                }    
                var queueId = i;
                t._addTab(queueId,cityname, r[i].target_x, r[i].target_y, r[i].target_city, r[i].SendSupplyTroop,r[i].SupplyTroop, r[i].SendMilitiaman, r[i].Militiaman, r[i].SendScout, r[i].Scout, r[i].SendPikeman, r[i].Pikeman, r[i].SendSwordsman, r[i].Swordsman, r[i].SendArchers, r[i].Archers, r[i].SendCavalry, r[i].Cavalry, r[i].SendHeavyCavalry, r[i].HeavyCavalry, r[i].SendSupplyWagons, r[i].SupplyWagons, r[i].SendBallista, r[i].Ballista, r[i].SendBatteringRam, r[i].BatteringRam, r[i].SendCatapult, r[i].Catapult);
            }
        },
      
     _addTab: function(queueId,cityname,target_x,target_y,target_city,SendSupplyTroop,SupplyTroop,SendMilitiaman,Militiaman,SendScout,Scout,SendPikeman,Pikeman,SendSwordsman,Swordsman,SendArchers,Archers,SendCavalry,Cavalry,SendHeavyCavalry,HeavyCavalry,SendSupplyWagons,SupplyWagons,SendBallista,Ballista,SendBatteringRam,BatteringRam,SendCatapult,Catapult){
         var t = Tabs.Reassign;
        var To = target_x+','+target_y;
        for (var y=0; y< Seed.cities.length;y++) {
            if ( parseInt(Seed.cities[y][0]) == parseInt(target_city)){
                To = Seed.cities[y][1];
                break;
            }
        }
         var row = document.getElementById('pbRoutesQueue').insertRow(0);
         row.vAlign = 'top';
         row.insertCell(0).innerHTML = queueId;
         row.insertCell(1).innerHTML = cityname;
         row.insertCell(2).innerHTML = To;
         row.insertCell(3).innerHTML = SendSupplyTroop;
         row.insertCell(4).innerHTML = addCommas(SupplyTroop);
         row.insertCell(5).innerHTML = SendMilitiaman;
         row.insertCell(6).innerHTML = addCommas(Militiaman);
          row.insertCell(7).innerHTML = SendScout;
          row.insertCell(8).innerHTML = addCommas(Scout);
          row.insertCell(9).innerHTML = SendPikeman;
          row.insertCell(10).innerHTML = addCommas(Pikeman);
          row.insertCell(11).innerHTML = SendSwordsman;
          row.insertCell(12).innerHTML = addCommas(Swordsman);
          row.insertCell(13).innerHTML = SendArchers;
          row.insertCell(14).innerHTML = addCommas(Archers);
          row.insertCell(15).innerHTML = SendCavalry;
          row.insertCell(16).innerHTML = addCommas(Cavalry);
          row.insertCell(17).innerHTML = SendHeavyCavalry;
          row.insertCell(18).innerHTML = addCommas(HeavyCavalry);
          row.insertCell(19).innerHTML = SendSupplyWagons;
          row.insertCell(20).innerHTML = addCommas(SupplyWagons);
          row.insertCell(21).innerHTML = SendBallista;
          row.insertCell(22).innerHTML = addCommas(Ballista);
          row.insertCell(23).innerHTML = SendBatteringRam;
          row.insertCell(24).innerHTML = addCommas(BatteringRam);
          row.insertCell(25).innerHTML = SendCatapult;
          row.insertCell(26).innerHTML = addCommas(Catapult);
         row.insertCell(27).innerHTML = '<a class="button20" id="tradecancel_' + queueId + '"><span>'+translate("Delete")+'</span></a>';
         document.getElementById('tradecancel_' + queueId).addEventListener('click', function(){
            t.cancelQueueElement(queueId);
         }, false);
     },
     
     _addTabHeader: function() {
     var t = Tabs.transport;
         var row = document.getElementById('pbRoutesQueue').insertRow(0);
         row.vAlign = 'top';
         row.insertCell(0).innerHTML = "ID";
         row.insertCell(1).innerHTML = translate("From");
         row.insertCell(2).innerHTML = translate("To");
         row.insertCell(3).innerHTML = translate("Sup. Tr.");
         row.insertCell(4).innerHTML = "";
         row.insertCell(5).innerHTML = translate("MM");
         row.insertCell(6).innerHTML = "";
          row.insertCell(7).innerHTML = translate("Scouts");
         row.insertCell(8).innerHTML = "";
         row.insertCell(9).innerHTML = translate("Pikes");
         row.insertCell(10).innerHTML = "";
         row.insertCell(11).innerHTML = translate("Swords");
         row.insertCell(12).innerHTML = "";
         row.insertCell(13).innerHTML = translate("Archers");
         row.insertCell(14).innerHTML = "";
         row.insertCell(15).innerHTML = translate("Cav");
         row.insertCell(16).innerHTML = "";
         row.insertCell(17).innerHTML = translate("HC");
         row.insertCell(18).innerHTML = "";
         row.insertCell(19).innerHTML = translate("Wagons");
         row.insertCell(20).innerHTML = "";
         row.insertCell(21).innerHTML = translate("Ballista");
         row.insertCell(22).innerHTML = "";
         row.insertCell(23).innerHTML = translate("Rams");
         row.insertCell(24).innerHTML = "";
         row.insertCell(25).innerHTML = translate("Catapults");
         row.insertCell(26).innerHTML = "";
         row.insertCell(27).innerHTML = translate("Delete");
       },   
       
     cancelQueueElement: function(queueId){
         var t = Tabs.Reassign;
         var queueId = parseInt(queueId);
         t.reassignRoutes.splice(queueId, 1);
         t.showReassignRoutes();
     },
       
    saveReassignRoutes: function(){
        var t = Tabs.Reassign;
        var serverID = getServerId();
        GM_setValue('reassignRoutes_' + serverID, JSON2.stringify(t.reassignRoutes));
    },
    readReassignRoutes: function(){
        var t = Tabs.Reassign;
        var serverID = getServerId();
        s = GM_getValue('reassignRoutes_' + serverID);
        if (s != null) {
            route = JSON2.parse(s);
            for (k in route)
                t.reassignRoutes[k] = route[k];
        }
        try{
            t.checkcitymoved();
        } catch (e) {
            //Do nothing
        }
    },
    checkcitymoved: function(){
        var t = Tabs.Reassign;
        for(var i=0; i < t.reassignRoutes.length; i++){
            if(t.reassignRoutes[i].target_city == 'undefined') break;
            if(t.reassignRoutes[i].target_x != Cities.byID[t.reassignRoutes[i].target_city].x) t.reassignRoutes[i].target_x = Cities.byID[t.reassignRoutes[i].target_city].x;
            if(t.reassignRoutes[i].target_y != Cities.byID[t.reassignRoutes[i].target_city].y) t.reassignRoutes[i].target_y = Cities.byID[t.reassignRoutes[i].target_city].y;
        }
    },
    saveReassignState: function(){
        var t = Tabs.Reassign;
        var serverID = getServerId();
        GM_setValue('reassignState_' + serverID, JSON2.stringify(t.reassignState));
    },
    readReassignState: function(){
        var t = Tabs.Reassign;
        var serverID = getServerId();
        s = GM_getValue('reassignState_' + serverID);
        if (s != null) {
            state = JSON2.parse(s);
            for (k in state)
                t.reassignState[k] = state[k];
        }
    },
    toggleReassignState: function(obj){
        var t = Tabs.Reassign;
        if (t.reassignState.running == true) {
            t.reassignState.running = false;
            if (document.getElementById('pbReassignState')) document.getElementById('pbReassignState').value = "Reassign = OFF";
        	if (document.getElementById('ReassignToggle')) document.getElementById('ReassignToggle').value = "Reassign = OFF";
            t.checkdoreassigntimeout = null;
            t.count = 0;
        }
        else {
            t.reassignState.running = true;
            if (document.getElementById('pbReassignState')) document.getElementById('pbReassignState').value = "Reassign = ON";
        	if (document.getElementById('ReassignToggle')) document.getElementById('ReassignToggle').value = "Reassign = ON";
            t.e_reassignRoutes();
        }
    },
    
    checkdoReassign: function(){
    var t = Tabs.Reassign;
    t.doReassign(t.count);
    t.count++;
        if(t.count < t.reassignRoutes.length && t.reassignState.running){
          t.checkdoreassigntimeout = setTimeout(function() { t.checkdoReassign();}, 5000);
        } else {
          var now = new Date().getTime()/1000.0;
          now = now.toFixed(0);
          Options.lastreassign = now;
          saveOptions();    
          t.count = 0;
        }
    },
    
    doReassign: function(count){
        var t = Tabs.Reassign;
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        if(t.reassignRoutes.length==0) return;
        var send=[];
        var citytotal=0;
        var totalsend=0;
        params.u1 = 0;
        params.u2 = 0;
        params.u3 = 0;
        params.u4 = 0;
        params.u5 = 0;
        params.u6 = 0;
        params.u7 = 0;
        params.u8 = 0;
        params.u9 = 0;
        params.u10 = 0;
        params.u11 = 0;
        params.u12 = 0;    
                
        var city = t.reassignRoutes[count]["city"];
        var xcoord = t.reassignRoutes[count]["target_x"];
        var ycoord = t.reassignRoutes[count]["target_y"];
        
        var cityID = 'city' + city;
        if(!Cities.byID[city]) return;
        var marching = getMarchInfo(cityID);
        t.getRallypoint(cityID);
        if(t.rallypointlevel == 11) t.rallypointlevel = 15;
        else if(t.rallypointlevel == 12) t.rallypointlevel = 20;
        var maxsend = (t.rallypointlevel * 10000);
        totalsend=0;
        
        var troopsselect=["SupplyTroop","Militiaman","Scout","Pikeman","Swordsman","Archers","Cavalry","HeavyCavalry","SupplyWagons","Ballista","BatteringRam","Catapult"];
        for (k=0; k<troopsselect.length; k++) {
            var citytroops = Seed.units[cityID]['unt'+(parseInt(k)+1)];
            var marchtroops = marching.marchUnits[parseInt(k)+1];
            citytotal = parseInt(citytroops) + parseInt(marchtroops);
            if(t.reassignRoutes[count]['Send'+troopsselect[k]]==false) {continue; }
            if(citytotal > t.reassignRoutes[count][troopsselect[k]]){
                var sendtroops = parseInt(citytotal) - parseInt(t.reassignRoutes[count][troopsselect[k]]);
                if (parseInt(sendtroops) > parseInt(citytroops)) sendtroops = citytroops;
                if (parseInt(sendtroops) < 0) sendtroops = 0;
                send[(parseInt(k)+1)] = sendtroops;
                totalsend += send[(parseInt(k)+1)];                
            }
            if(totalsend > maxsend){
                totalsend -= send[(parseInt(k)+1)];
                send[(parseInt(k)+1)] = parseInt(maxsend-totalsend);
                totalsend += send[(parseInt(k)+1)];
                break;
            }
        }
        
        for (var t=0; t< Seed.cities.length;t++) {
            if ( parseInt(Seed.cities[t][0]) == city) var cityname = Seed.cities[t][1];
        }
        
        params.cid= city;
        params.type = "5";
        params.kid=0;
        params.xcoord = xcoord;
        params.ycoord = ycoord;
        params.u1 = send[1];
        params.u2 = send[2];
        params.u3 = send[3];
        params.u4 = send[4];
        params.u5 = send[5];
        params.u6 = send[6];
        params.u7 = send[7];
        params.u8 = send[8];
        params.u9 = send[9];
        params.u10 = send[10];
        params.u11 = send[11];
        params.u12 = send[12];    
        
           if (totalsend >0) {
           
        var profiler = new unsafeWindow.cm.Profiler("ResponseTime", "march.php");
        RPM++;
              new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
                  method: "post",
                  parameters: params,
                  loading: true,
                  onSuccess: function (transport) {
                      profiler.stop();
                  var rslt = eval("(" + transport.responseText + ")");
                  if (rslt.ok) {
	                  actionLog('Reassign   From: ' + cityname + "   To: " + xcoord + ',' + ycoord + "    ->   Troops: " + totalsend);
	                  var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
	                  var ut = unixTime();
	                  var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
	                                      for(i = 0; i <= unitsarr.length; i++){
	                                          if(params["u"+i]){
	                                                  unitsarr[i] = params["u"+i];
	                                          }
	                                      }
	                  var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
	                  var currentcityid = city;
	                  unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
	                  if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
                  } 
                  },
                  onFailure: function () {profiler.stop();}
          });
        }      
    },
    
    show: function(){
        var t = Tabs.Reassign;
    },
    hide: function(){
        var t = Tabs.Reassign;
    },
    onUnload: function(){
        var t = Tabs.Reassign;
        if (!ResetAll) t.saveReassignRoutes();
        if (!ResetAll) t.saveReassignState();
        
    },
}

/************************  Attack Tab ************************/
Tabs.Attack = {
  tabOrder: 999997,
  tabLabel: 'Attack',
  myDiv: null,
  tileTypes:{0:"Bog",10:"Grassland",11:"Lake",20:"Woods",30:"Hills",40:"Mountain",50:"Plain",51:"City",52:"Ruin",53:"Misted City",54:"Dark Forest"},


    init: function(div){
    	var t = Tabs.Attack;
        t.myDiv = div;
        unsafeWindow.RemoveAtkQueue = t.RemoveQueue;

      	var m = '<DIV id=pbReinfMain class=pbStat>ATTACK (TO CREST BARB/PLAYER)</div><TABLE id=pireinforce width=100% height=0% class=pbTab><TR align="center"><BR>';
      	if (AtkOptions.Running == false) m += '<DIV align=center><INPUT id=AttackToggle type=submit value="ATTACK = OFF">&nbsp Rallypoint options in options tab!</div>';
        else m += '<DIV align=center><INPUT id=AttackToggle type=submit value="ATTACK = ON">&nbsp Rallypoint options in options tab!</div>';
      	m += '<TABLE id=pbReinf width=95% height=0% class=pbTab><TR align="left">';
      	m += '<TD width="75px"><B>From City: </b></td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=pbAcityFrom></span></div></td>';
      	m += '<TD width="60px"><B>Target:</b></td><TD>X:<INPUT id=targetX type=text size=3>&nbsp&nbspY:<INPUT id=targetY type=text size=3></td></table>';
    	  m += '<TABLE id=pbMarch width=100% height=0% class=pbTab><TR align="center"><TR><TR>';
        for (i=1;i<=4;i++) m += '<TD rowspan="3"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_50_s34.jpg"></td><TD>'+ unsafeWindow.unitnamedesctranslated["unt"+i][0]+'</td>';
      	m+='</tr><TR>';
      	for (i=1;i<=4;i++) m += '<TD><SPAN id=unit'+i+'></span></td>';
      	m+='</tr><TR>';
      	for (i=1;i<=4;i++) m += '<TD><INPUT id=Unt'+i+' type=text size=10 maxlength=10 value="0"><INPUT id=Max'+i+' type=submit value='+translate("Max")+'></td>';
      	m+='</tr><TR>';   	
      	for (i=5;i<=8;i++) m += '<TD rowspan="3"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_50_s34.jpg"></td><TD>'+ unsafeWindow.unitnamedesctranslated["unt"+i][0]+'</td>';
      	m+='</tr><TR>';
      	for (i=5;i<=8;i++) m += '<TD><SPAN id=unit'+i+'></span></td>';
      	m+='</tr><TR>';
      	for (i=5;i<=8;i++) m += '<TD><INPUT id=Unt'+i+' type=text size=10 maxlength=10 value="0"><INPUT id=Max'+i+' type=submit value='+translate("Max")+'></td>';
      	m+='</tr><TR>';
      	for (i=9;i<=12;i++) m += '<TD rowspan="3"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_50_s34.jpg"></td><TD>'+ unsafeWindow.unitnamedesctranslated["unt"+i][0]+'</td>';
      	m+='</tr><TR>';
      	for (i=9;i<=12;i++) m += '<TD><SPAN id=unit'+i+'></span></td>';
      	m+='</tr><TR>';
      	for (i=9;i<=12;i++) m += '<TD><INPUT id=Unt'+i+' type=text size=10 maxlength=10 value="0"><INPUT id=Max'+i+' type=submit value='+translate("Max")+'></td>';
      	m+='</tr><TR>';
        for (i=13;i<=15;i++) m += '<TD rowspan="3"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_50_s34.jpg"></td><TD>'+ unsafeWindow.unitnamedesctranslated["unt"+i][0]+'</td>';
      	m+='</tr><TR>';
      	for (i=13;i<=15;i++) m += '<TD><SPAN id=unit'+i+'></span></td>';
      	m+='</tr><TR>';
      	for (i=13;i<=15;i++) m += '<TD><INPUT id=Unt'+i+' type=text size=10 maxlength=10 value="0"><INPUT id=Max'+i+' type=submit value='+translate("Max")+'></td>';
      	m+='</tr><TR>';

  	    m += '</table><BR><TABLE id=pbReinfETA width=10% height=0% align="center" class=pbTab>';
  	    m += '<TR align="center"><TD><a class="button20" id=AtkaddToQueue><span>Save Attack</span></a></td></tr></table>';
  	    m+= '<BR><DIV id=pbReinfMain class=pbStat>Saved Marches</div><BR><BR><DIV id=AtkQueue></div>';
      
      	t.myDiv.innerHTML = m;

      	t.from = new CdispCityPicker ('pbAfrom', document.getElementById('pbAcityFrom'), true, t.ClickCitySelect, 0); 
		document.getElementById('AttackToggle').addEventListener('click', function(){t.toggleAttackState()} , false);     
      	for (i=1;i<=15;i++) document.getElementById('unit'+i).innerHTML = addCommas(Seed.units["city" + t.from.city.id]["unt"+i]);
      	for (i=1;i<=15;i++)  document.getElementById('Max'+i).addEventListener('click', function(){t.CalcMax(this.id)}, false);
		    document.getElementById('AtkaddToQueue').addEventListener ('click', t.GetCoords,false); 	
        	t.PaintQueue();
    },

    toggleAttackState: function() {
        var t = Tabs.Attack;
            if (AtkOptions.Running == true) {
                AtkOptions.Running = false;
                if (document.getElementById('AttackToggle')) document.getElementById('AttackToggle').value = "Attack = OFF";
                if (document.getElementById('AttackToggleD')) document.getElementById('AttackToggleD').value = "Attack = OFF";
                saveAtkOptions();
            } else {
                AtkOptions.Running = true;
                if (document.getElementById('AttackToggle')) document.getElementById('AttackToggle').value = "Attack = ON";
                if (document.getElementById('AttackToggleD')) document.getElementById('AttackToggleD').value = "Attack = ON";
                saveAtkOptions();
            }
    },

   	GetCoords : function (){
	    var t= Tabs.Attack;
	    var targetName = "";
	    var targetCityName = "";
	    var tileLevel =0;
	    var total=0;
	    targetX = document.getElementById('targetX').value;
	    targetY = document.getElementById('targetY').value;
	    if (targetX =="" || targetY=="") {alert("Please enter coords...");return;}
	    for (i=1;i<=15;i++) total += parseInt(document.getElementById('Unt'+i).value);
	    if (total == 0) {alert("You got to send a least one troop...");return;}
	    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    	params.blocks = "bl_" + targetX + "_bt_" + targetY;
	    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
      		method: "post",
      		parameters: params,
      		onSuccess: function (transport) {
      			var rslt = eval("(" + transport.responseText + ")");
        		if (rslt.ok) {
    				userId = rslt.data["l_"+targetX+"_t_"+targetY].tileUserId;    				
    				if (rslt.data["l_"+targetX+"_t_"+targetY].cityName) targetCityName = rslt.data["l_"+targetX+"_t_"+targetY].cityName;
    				 else targetCityName = "---";			
    				if (userId != null && userId != 0) targetName = rslt.userInfo["u" + userId]["n"];
        			for (i=1;i<=Seed.cities.length;i++) if (Seed.cities[i-1][0] == t.from.city.id) cityNumber = i;
        			AtkOptions[cityNumber].push ({
        				what: 			"Attack",
        				city: 			t.from.city.id,
        				action: 		4,
        				targetX: 		targetX,
        				targetY: 		targetY,
        				targetCityName: targetCityName,
        				targetName: 	targetName,
        				tileLevel: 		rslt.data["l_"+targetX+"_t_"+targetY].tileLevel,
        				tileType: 		rslt.data["l_"+targetX+"_t_"+targetY].tileType,
        				1: 				document.getElementById('Unt1').value,
        				2: 				document.getElementById('Unt2').value,
        				3: 				document.getElementById('Unt3').value,
        				4: 				document.getElementById('Unt4').value,
        				5: 				document.getElementById('Unt5').value,
        				6: 				document.getElementById('Unt6').value,
        				7: 				document.getElementById('Unt7').value,
        				8: 				document.getElementById('Unt8').value,
        				9: 				document.getElementById('Unt9').value,
        				10: 			document.getElementById('Unt10').value,
        				11: 			document.getElementById('Unt11').value,
        				12: 			document.getElementById('Unt12').value,
        				13: 			document.getElementById('Unt13').value,
        				14: 			document.getElementById('Unt14').value,
        				15: 			document.getElementById('Unt15').value,
        				r1:             0,
            			r2:             0,
            			r3:             0,
            			r4:             0,
            			r5:             0,
           				gold:           0,
        			});
					saveAtkOptions();
					t.PaintQueue();
					for(i=1;i<=15;i++) document.getElementById('Unt'+i).value=0;
					document.getElementById('targetX').value="";
					document.getElementById('targetY').value="";
        		}
      		},
    	});
	},

	PaintQueue : function (){
	    var t= Tabs.Attack;
	    document.getElementById('AtkQueue').innerHTML = '<TABLE id=AtkShowQ class=pbStat align="center" width=80%></table>';
	    for (var i=1;i<=Seed.cities.length;i++) {
	    	CityQueue = AtkOptions[i];
	    	for (var y=0;y<CityQueue.length;y++) {
	    		tag = "city"+i+"item"+y;	
	    		t._addTab(CityQueue[y],tag,i,y);
	    	}
	    }
	    t._addTabHeader();
	 },

	 _addTab: function(action,k,city,item){
	    var t = Tabs.Attack;

	    for (postcity in Seed.cities) if (Seed.cities[postcity][0] == action.city) logcity = Seed.cities[postcity][1];
	    var total = 0;
		var info = "";
		var type="";
		for (i=1;i<=15;i++) total += parseInt(action[i]);
		switch (parseInt(action.tileType)) {
			case 0: info = "Bog";break;
			case 10: info = "Grassland";break;
			case 11: info = "Lake";break;
			case 20: info = "Woods";break;
			case 30: info = "Hills";break;
			case 40: info = "Mountain";break;
			case 50: info = "Plain";break;
			case 51: 
				if (action.targetCityName == null && !action.misted) info = "Barb Camp";
					else info = action.targetName;
				break;
			case 53: info = "Misted City";break;
		}
	    var row = document.getElementById('AtkShowQ').insertRow(0);
	    row.vAlign = 'top';
	    row.style.color = "black";
	    row.insertCell(0).innerHTML = '<A onclick="RemoveAtkQueue('+ city +','+ item +')"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAstJREFUeNpskstrXWUUxX/7e9zHuadpbwbR0yagZKAIPmga0kEToUELKVVJrBMHBSUDQTuQ/geCCA6ETGt0EFCqkpKmLRaSNlUKgRKvoMU6KkgHUZtKvO97z/m2gyaXFFyTvVjs3xpsttyYeeX6+HsfHCWKoZuCBgiK7s4QQBXd8WIEW69z7fwXv3+4cuO0hAvz3a3ifietBqqKoIQQkKCgYadgtyRACEihwIGtLWY/+vRjV/vnYTfd/NMRMrTTJW3UMdYgufwjKMug2URDhjiHiqBAU4QnvRtyf928yYPf7hLqNcz+fsZu32H97Rlaq9eIygdIqzXMiSmOzn/F2jMHKYSMYAzN/jKddjNjNaJxyaGLoHu1dPgl/Qb0+5ePPZYvgl7y6A959H0vX5rtrlAToQYszUyzq9c2Kvh33+HE2o+9bG7kMFWgqkJNDSqCydSQZgZjLZuLF/nu5Mke8Mbn8z3/2QvPU/ypgjOWNBiyYBAEU/KO2DtKzpH4HJ2rV1k+e5a9Ov/6Kfp/+ZWkUCDa2Y+9xRowkXXsc47YWordDk9MTnJqbu6xgtmlZZKxMUyrxT7viZ0jdh5rDCb2nth7SqoUp6aYXFnpgV+fOdPzr66v03f8OLlOh9h74pzDWsFF5TJdBG23efHKlR7w7fg4ycYGt0NgdGEBgGOrq6wPDBDFMSUrmAdtTClJiJKEeGiInycmALg8Pc1z1SrDo6NElQp3zp0DYG1khIHhYaJDg5SSBOcd8vD0m41W0KKIIGlKs93GGkO+UCCIIKq063VaIdBXLCLeE4B+K3xy6/qCKw8e8v9mgoQUESFWBRHCniOWFAR99MaqYD15G2iLNNy9P+5uPn1kYhAxoAq6Qwn/IwEDGOF+5Vbj8t/bF+XZvDny1lODs335wsFqJ2SNVBEBK+AAawRrwIrgDOSs2Gqnu7147/6FSrO7/N8ASxJC+7t5hdYAAAAASUVORK5CYII="/>';	  
	    row.insertCell(1).innerHTML = logcity;
	    row.insertCell(2).innerHTML = coordLink(parseInt(action.targetX),parseInt(action.targetY));
	    row.insertCell(3).innerHTML = info;
	    row.insertCell(4).innerHTML = action.targetCityName;
	    row.insertCell(5).innerHTML = action.tileLevel;
	    row.insertCell(6).innerHTML = addCommas(total);
	    row.insertCell(7).innerHTML = '<a class="button20" id="Details' + k + '"><span>Details</span></a>';
	    document.getElementById('Details' + k).addEventListener('click', function(){t.DetailsPop(action,logcity,info);}, false);
	},

	_addTabHeader: function() {
	    var t = Tabs.Attack;
	    var row = document.getElementById('AtkShowQ').insertRow(0);
	    row.vAlign = 'top';
	    row.style.color = "black";
	    row.insertCell(0).innerHTML = "&nbsp";
	    row.insertCell(1).innerHTML = "From City";
	    row.insertCell(2).innerHTML = "Coords";
	    row.insertCell(3).innerHTML = "Target Name";
	    row.insertCell(4).innerHTML = "City";
	    row.insertCell(5).innerHTML = "Level";
	    row.insertCell(6).innerHTML = "Troops";
	    row.insertCell(7).innerHTML = "Details";
	},

	DetailsPop : function (action,logcity,info){
		var t = Tabs.Attack;
		var m = '<TABLE id=pbMarch width=100% height=0% class=pbTab>';
	    m+= '<TR><TD width="50px"></td><TD>From city: ' + logcity + '</td></tr>';
	    m+= '<TR><TD width="50px"></td><TD>Target: ' + info + '</td></tr>';
	    m+= '<TR><TD width="50px"></td><TD>City: ' + action.targetCityName + '</td></tr>';
	    m+= '<TR><TD width="50px"></td><TD>Level: ' + action.tileLevel + '</td></tr>';
	    m+= '<TR><TD width="50px"></td><TD>Coords: ' +  coordLink(parseInt(action.targetX),parseInt(action.targetY)) + '</td></tr></table><BR>';
	    m += '<TABLE id=pbMarch width=100% height=0% class=pbTab><TR>';
	    for (i=1;i<=4;i++) m += '<TD width="51px"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_50_s34.jpg"></td><TD width="75px">'+ addCommas(action[i]) +'</td>';
	    m+='</tr><TR>'; 
	    for (i=5;i<=8;i++) m += '<TD width="51px"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_50_s34.jpg"></td><TD width="75px">'+ addCommas(action[i]) +'</td>';
	    m+='</tr><TR>'; 
	    for (i=9;i<=12;i++) m += '<TD width="51px"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_50_s34.jpg"></td><TD width="75px">'+ addCommas(action[i]) +'</td>';
	    m+='</tr><TR>';
	    for (i=13;i<=15;i++) m += '<TD width="51px"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_50_s34.jpg"></td><TD width="75px">'+ addCommas(action[i]) +'</td>';
	    m+='</tr></table><BR>'; 
	    var pop = new pbPopup ('giftHelp', 0, 0, 550, 410, true);
	    pop.centerMe (mainPop.getMainDiv());  
	    pop.getMainDiv().innerHTML = m;
	    pop.getTopDiv().innerHTML = '<CENTER><B>Saved March info</center>';
	    pop.show (true);
	  },
   
    ClickCitySelect: function(city){
                var t = Tabs.Attack;  
                for (i=1;i<=15;i++) document.getElementById('unit'+i).innerHTML = addCommas(Seed.units["city" + t.from.city.id]["unt"+i]);
    },

    RemoveQueue: function(city,item){
        var t = Tabs.Attack;
        AtkOptions[city].splice(item,1);
        t.PaintQueue();
    	saveAtkOptions();
    },

    doMarch: function(cityID,i){
        var t = Tabs.Attack;
        for (var y=0;y<AtkOptions[i+1].length;y++) if (AtkOptions[i+1][y]["city"] == cityID) MarchQueue[i+1].push(AtkOptions[i+1][y]);
    },

    show: function(){
        var t = Tabs.Attack;
    },
    hide: function(){
        var t = Tabs.Attack;
    },
    onUnload: function(){
    },
}




/************************  Dark Forest Tab ************************/
Tabs.DF = {
  tabOrder: 999990,
  tabLabel: 'Dark Forest',
  myDiv: null,
  cityID: null,
  rallypointlevel:null,
  maxsend:0,
  knt:null,
  DFArray:{},


    init: function(div){
    	var t = Tabs.DF;
        t.myDiv = div;

      	var m= '<DIV id=pbReinfMain class=pbStat>AUTOMATED FOREST FUNCTION</div><BR>';
      	if (DFOptions.Running == false) m += '<TD><INPUT id=AttSearch type=submit value="Auto DF = OFF"></td>';
        else m += '<TD><INPUT id=AttSearch type=submit value="Auto DF = ON"></td>';
      	m+='<INPUT id=pbReset type=submit value="Re-search">&nbsp Radius 45 - Search every 20min - rallypoint options in options tab!';
      	m +='<DIV id=DFStats text-align=center></div>';
      	m += '<DIV id=pbReinfMain class=pbStat>DF SELECT LEVELS</div><BR>';

      	m+='<TABLE width=100%>';
      	for (i=0;i<Seed.cities.length;i++) {
      		m+='<TR><TD>' + Seed.cities[i]["1"] + '</td>';
      		for (y=1;y<=10;y++) m+='<TD class=DFLevelopt><INPUT id=DFcity'+i+'level'+y+' type=checkbox unchecked=true>Lvl:'+y+'</td>';
      	}
      	m+='</table>';
      	m += '<DIV id=pbReinfMain class=pbStat>DF SELECT TROOPS</div>';
      	m += '<B>For a march with max. amount of troops for the rallypoint, enter MAX in the box.</b><BR>';
      	m+='<TABLE width=100%><TR><TD></td>';
      	for(var i=1;i<=12; i++) m+='<TD>'+unsafeWindow.unitcost['unt'+i][0]+'</td>';
      	for(i=1;i<=10;i++){
        	m += '</tr><TR><TD>Level '+i+': </td>';
         	for(var j=1; j<=12; j++) m += '<TD class=DFTroopOpt><INPUT id="DFlevel'+i+'troop'+j+'" type=text size=4 maxlength=6 value="'+DFOptions.Troops[i][j]+'" /></td>';
     	}
     	m+='</tr></table>';

      	
      	t.myDiv.innerHTML = m;

      	for(i=0;i<Seed.cities.length;i++) for(w=1;w<=10;w++)document.getElementById('DFcity'+i+'level'+w).checked = DFOptions.Levels[i+1][w];
      	document.getElementById('pbReset').addEventListener('click', t.ResetDFData, false);
      	var element_class = document.getElementsByClassName('DFLevelopt');
    	for (k=0;k<element_class.length;k++) element_class[k].addEventListener('click', t.saveLevelOptions , false);
    	var element_class = document.getElementsByClassName('DFTroopOpt');
    	for (k=0;k<element_class.length;k++) element_class[k].addEventListener('change', t.saveTroopOptions , false);
    	document.getElementById('AttSearch').addEventListener('click', function(){t.toggleDFState()} , false);
    	
    	var now = unixTime();
    	document.getElementById('DFStats').innerHTML = "Last Search done at: " + FullDateTime(DFOptions.LastSearch) + " found " + DFOptions.DFFound + " Dark Forests.";
		if ((DFOptions.LastSearch + (20 * 60 * 1000)) < now && DFOptions.Running) t.ResetDFData(); 
		else {
			for (i=0;i<Seed.cities.length;i++){
	    		var helpArray = JSON2.parse(GM_getValue('DarkForest_' + Seed.player['name'] + '_city_' + (i+1) + '_' + getServerId(),"[]"));
	    		t.DFArray[i] = [];
	    		if (helpArray) t.DFArray[i] = helpArray.sort(function sortBarbs(a,b) {a = a['dist'];b = b['dist'];return a == b ? 0 : (a < b ? -1 : 1);});
			}
		}
	},

    toggleDFState: function(obj){
		    var t = Tabs.DF;
		    if (DFOptions.Running == true) {
		        DFOptions.Running = false;
		        if (document.getElementById('AttSearch')) document.getElementById('AttSearch').value = "Auto DF = OFF";
		        if (document.getElementById('AutoDfToggle')) document.getElementById('AutoDfToggle').value = "Auto DF = OFF";
		        saveDFOptions();
		    } else {
		        DFOptions.Running = true;
		        if (document.getElementById('AttSearch')) document.getElementById('AttSearch').value = "Auto DF = ON";
		        if (document.getElementById('AutoDfToggle')) document.getElementById('AutoDfToggle').value = "Auto DF = ON";
		        if ((DFOptions.LastSearch + (20 * 60)) < now) t.ResetDFData(); 
		        saveDFOptions();
		    }
  	},

    saveLevelOptions : function(){
        for(i=0;i<Seed.cities.length;i++){
            DFOptions.Levels[i+1][0]=false;
            for (w=1;w<=10;w++){
                var ele = document.getElementById('DFcity'+i+'level'+w);
                DFOptions.Levels[i+1][w]=ele.checked;
                if (ele.checked) DFOptions.Levels[i+1][0]=true;
            }        
        }
        saveDFOptions();
    },

    saveTroopOptions : function(){
        for(i=1;i<=10;i++) for (w=1;w<=12;w++) DFOptions.Troops[i][w] = document.getElementById('DFlevel'+i+'troop'+w).value;  
        saveDFOptions();
    },

    doMarch : function(cityID,i){
    	var t = Tabs.DF;
    	var now = unixTime();
    	if ((DFOptions.LastSearch + (20 * 60)) < now) {t.ResetDFData();return;}  		
    	if (t.DFArray[i].length==0) return;
    	var Level = parseInt(t.DFArray[i][0].Level);
    	if (!DFOptions.Levels[i+1][Level]) return;
    	var troops = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    	for (y=1;y<=12;y++){
    		if (DFOptions.Troops[Level][y] == "MAX") troops[y] = t.CalcMax(cityID,y);
    		else troops[y] = DFOptions.Troops[Level][y];
    	}
    	MarchQueue[i+1].push ({
    		what: 			"DF",
			city: 			cityID,
			action: 		4,
			targetX: 		t.DFArray[i][0].X,
			targetY: 		t.DFArray[i][0].Y,
			1: 				troops[1],
			2: 				troops[2],
			3: 				troops[3],
			4: 				troops[4],
			5: 				troops[5],
			6: 				troops[6],
			7: 				troops[7],
			8: 				troops[8],
			9: 				troops[9],
			10: 			troops[10],
			11: 			troops[11],
			12: 			troops[12],
			13: 			0,
			14: 			0,
			15: 			0,
        });
        t.DFArray[i].splice(0,1);
        GM_setValue('DarkForest_' + Seed.player['name'] + '_city_' + (i+1) + '_' + getServerId(), JSON2.stringify(t.DFArray[i]));
    },

    ResetDFData: function(){
    	var t = Tabs.DF;
    	for (i=0;i<Seed.cities.length;i++) GM_deleteValue('DarkForest_' + Seed.player['name'] + '_city_' + (i+1) + '_' + getServerId(),"[]")
    	var ToSearch = [];
    	var now = unixTime();
    	for (i=0;i<Seed.cities.length;i++){
    		AllEmpty = true;
    		t.DFArray[i] = [];
    		for (var y=1;y<=10;y++) if (DFOptions.Levels[i+1][y]) AllEmpty = false;
    		if (!AllEmpty) ToSearch.push(i);
    	}
    	if (ToSearch.length > 0){
    		DFOptions.LastSearch = now;
    		DFOptions.DFFound = 0;
    		saveDFOptions();
    		document.getElementById('DFStats').innerHTML='Searching: <PROGRESS id=searchProgress value="0" max="'+ ToSearch.length +'"></progress>';
    		for (i=0;i<ToSearch.length;i++) {
    			X = parseInt(Seed.cities[ToSearch[i]][2]);
              	Y = parseInt(Seed.cities[ToSearch[i]][3]);
				setTimeout(t.MakeBlocks,((i+1)*6500),X,Y,(ToSearch[i]+1),(i+1),ToSearch.length);
    		}
    	}	
    },

    MakeBlocks:function(getX,getY,city,i,length){
    	var t = Tabs.DF;
    	var blocks = [];
		var xx=0;
		var yy=0;
		for (x=(getX-35);x<=(getX+35);x+=5) {
		   for (y=(getY-35);y<=(getY+35);y+=5) {
				xx=x;
				yy=y;
				if (x>750) xx-=750;
				if (y>750) yy-=750;
				if (x<0) xx+=750;
				if (y<0) yy+=750;
				blocks.push ("bl_" + xx + "_bt_" + yy);
			}
		}
		t.doSearch(blocks,getX,getY,city,i,length)
    },

    doSearch:function (pass,xx,yy,city,i,length){
    	var t = Tabs.DF;
		var mapDat = [];
	    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    	params.blocks = pass;
	    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
      		method: "post",
      		parameters: params,
      		onSuccess: function (transport) {
      			var rslt = eval("(" + transport.responseText + ")");
        		if (rslt.ok) {
        			if (rslt.data == []) alert("MAP ERROR");
        			if (i < length) document.getElementById('searchProgress').value = i;
        			else document.getElementById('DFStats').innerHTML = "";
        			for (y in rslt.data) {
        				if (rslt.data[y].tileType == 54 && DFOptions.Levels[city][parseInt(rslt.data[y].tileLevel)]) {
        					var tileX = parseInt(rslt.data[y].xCoord);
        					var tileY = parseInt(rslt.data[y].yCoord);
							var Level = parseInt(rslt.data[y].tileLevel);
							var dist = distance(xx, yy, tileX, tileY);
        					mapDat.push({X:tileX,Y:tileY,Level:Level,dist:dist});
        					DFOptions.DFFound++;
        					saveDFOptions();
        				}
        			}        			        			
					GM_setValue('DarkForest_' + Seed.player['name'] + '_city_' + city + '_' + getServerId(), JSON2.stringify(mapDat));
					var helpArray = JSON2.parse(GM_getValue('DarkForest_' + Seed.player['name'] + '_city_' + city + '_' + getServerId(),"[]"));
					if (helpArray) t.DFArray[(city-1)] = helpArray.sort(function sortBarbs(a,b) {a = a['dist'];b = b['dist'];return a == b ? 0 : (a < b ? -1 : 1);});
					if (i < length) document.getElementById('searchProgress').value = i;
        			else document.getElementById('DFStats').innerHTML = "Last Search done at: " + FullDateTime(DFOptions.LastSearch) + " found " + DFOptions.DFFound + "Dark Forests.";
        		}
      		},
    	});
	},

    CalcMax : function (city,troop){
    	var t = Tabs.DF;
    	var maxsend = 0;
    	var rallypointlevel = 0;	
    	for (var o in Seed.buildings["city" + city]){
		    var buildingType = parseInt(Seed.buildings["city" + city][o][0]);
		    var buildingLevel = parseInt(Seed.buildings["city" + city][o][1]);
		    if (buildingType == 12) rallypointlevel=parseInt(buildingLevel);
		}
    	if(rallypointlevel == 11) rallypointlevel = 15;
		if(rallypointlevel == 12) rallypointlevel = 20;
    	maxsend = (rallypointlevel * 10000);
		if (Seed.cityData.city[city].isPrestigeCity) {
    		switch(parseInt(Seed.cityData.city[city].prestigeInfo.prestigeLevel)){
    			case 1: maxsend = Math.round(maxsend * 1.50);break;
    			case 2: maxsend = Math.round(maxsend * 1.60);break;
    			case 3: maxsend = Math.round(maxsend * 1.65);break;
    		}
    	}
    	var TR = unsafeWindow.cm.ThroneController.effectBonus(66);
    	if (TR > 150) TR=150;
    	maxsend = maxsend + ((maxsend / 100) * TR);
    	if (maxsend > Seed.units["city" + city]["unt"+troop]) maxsend=0;
    	return maxsend; 
    },

	getKnights : function(){
	   var t = Tabs.DF;
	   t.knt = new Array();
	   for (k in Seed.knights['city' + t.from.city.id]){
	           if (Seed.knights['city' + t.from.city.id][k]["knightStatus"] == 1 && Seed.leaders['city' + t.from.city.id]["resourcefulnessKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"] && Seed.leaders['city' + t.from.city.id]["politicsKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"] && Seed.leaders['city' + t.from.city.id]["combatKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"] && Seed.leaders['city' + t.from.city.id]["intelligenceKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"]){
	               t.knt.push ({
	                   Name:   Seed.knights['city' + t.from.city.id][k]["knightName"],
	                   Combat:    parseInt(Seed.knights['city' + t.from.city.id][k]["combat"]),
	                   ID:        Seed.knights['city' + t.from.city.id][k]["knightId"],
	               });
	           }
	   }
	   t.knt = t.knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
	 
	},

    show: function(){var t = Tabs.DF;},
    hide: function(){var t = Tabs.DF;},
    onUnload: function(){},
}


/************************  March Tab ************************/
Tabs.March = {
  tabOrder: 999998,
  tabLabel: 'March',
  myDiv: null,
  cityID: null,
  rallypointlevel:null,
  maxsend:0,
  dist:0,
  ETAstr:null,
  ETAType:null,
  checkETA:null,
  knt:null,
  ETAstr:null,
  ETAType:null,
  checkETA:null,
  resources:["food","wood","stone","iron","aetherstone"],
  speed:["0,0","0,180","0,200","0,3000","0,300","0,275","0,250","1,1000","1,750","1,150","1,100","1,120","1,80","0,900","0,500","1,775"],

    init: function(div){
    	var t = Tabs.March;
        t.myDiv = div;
        unsafeWindow.RemoveQueue = t.RemoveQueue;

        t.i931 = 0;
	    t.i932 = 0;
	    t.i55 = 0;
	    t.i57 = 0;
	    
	    if (Seed.items['i'+931]) t.i931 = Seed.items['i'+931];
	    if (Seed.items['i'+932]) t.i932 = Seed.items['i'+932];
	    if (Seed.items['i'+55]) t.i55 = Seed.items['i'+55];
	    if (Seed.items['i'+57]) t.i57 = Seed.items['i'+57];

      	var m = t.PaintContent();
      	t.myDiv.innerHTML = m;

      	if (t.i931 == 0) document.getElementById('AuraOfCommand').disabled = true; else document.getElementById('AuraOfCommand').disabled = false;
      	if (t.i932 == 0) document.getElementById('AuraOfConquest').disabled = true; else document.getElementById('AuraOfConquest').disabled = false;
      	if (t.i55 == 0) document.getElementById('GreenGriffin').disabled = true; else document.getElementById('GreenGriffin').disabled = false;
      	if (t.i57 == 0) document.getElementById('RedDragon').disabled = true; else document.getElementById('RedDragon').disabled = false;

      	t.from = new CdispCityPicker ('pbMfrom', document.getElementById('pbMcityFrom'), true, t.ClickCitySelect, 0);  
      	t.to = new CdispCityPicker ('pbMcityTo', document.getElementById ('pbMcityTo'), true, t.citySelNotify);
		t.to.bindToXYboxes(document.getElementById ('MtargetX'), document.getElementById ('MtargetY'));

      	for (i=1;i<=15;i++)  document.getElementById('M_Max'+i).addEventListener('click', function(){t.CalcMax(this.id);t.ETA();}, false);
        for (i=0;i<5;i++)  document.getElementById('M_R_Max'+i).addEventListener('click', function(){t.Calc_R_Max(this.id)}, false);
        for (i=1;i<=15;i++)  document.getElementById('M_Unt'+i).addEventListener('change', function(){t.ETA()}, false);	
        document.getElementById('MtargetX').addEventListener('change', function(){if (document.getElementById("MtargetX").value != "" && document.getElementById("MtargetY").value != "") document.getElementById('M_Dist'). innerHTML = "Dist.: " + distance(t.from.city.x, t.from.city.y, document.getElementById("MtargetX").value, document.getElementById("MtargetY").value);}, false);
    	document.getElementById('MtargetY').addEventListener('change', function(){if (document.getElementById("MtargetX").value != "" && document.getElementById("MtargetY").value != "") document.getElementById('M_Dist'). innerHTML = "Dist.: " + distance(t.from.city.x, t.from.city.y, document.getElementById("MtargetX").value, document.getElementById("MtargetY").value);}, false);
		document.getElementById('addToQueue').addEventListener ('click', t.GetCoords,false); 	
		document.getElementById('ManualMarch').addEventListener ('click', t.ManualMarch,false);
		document.getElementById('pbMarchType').addEventListener ('click', t.MarchType,false);
		document.getElementById('RedDragon').addEventListener ('click', t.PaintMarchSize,false);
		document.getElementById('AuraOfCommand').addEventListener ('click', t.PaintMarchSize,false);
		document.getElementById('AuraOfConquest').addEventListener ('click', t.PaintMarchSize,false);
		document.getElementById('GreenGriffin').addEventListener ('click', function(){if (document.getElementById('GreenGriffin').checked) document.getElementById('RedDragon').checked = false;t.ETA();},false);
		document.getElementById('RedDragon').addEventListener ('click', function(){if (document.getElementById('RedDragon').checked) document.getElementById('GreenGriffin').checked = false;t.ETA();},false);
        if (MarchOptions.Queue.length > 0) t.PaintQueue();
        t.PaintMarchSize(); 
        t.ClickCitySelect();  
        t.MarchType();
    },

    PaintContent : function (){
    	var t = Tabs.March;
    	var color = "black";
    	var m = '<DIV id=pbReinfMain class=pbStat>INFO</div><DIV id=MPresetCont></div>'; 
      	m += '<DIV id=pbReinfMain class=pbStat>MARCH (SAVE MARCHES TO LAUNCH MANUALLY)</div><TABLE id=pireinforce width=80% height=0% class=pbTab>';    
      	m += '<TR><TD><B>From City: </b></td><TD><SPAN id=pbMcityFrom></span></td></tr>';
      	m += '<TR><TD><B>To City:</b></td><TD><SPAN id=pbMcityTo></span></td><TD><INPUT id=MtargetX maxlength=3 type=text>&nbsp&nbsp&nbspY:&nbsp<INPUT id=MtargetY maxlength=3 type=text></td>';
      	m += '<TD><SPAN id=M_Dist>Dist.: N/A</span></td><TD><SPAN id=M_ETA>ETA.: N/A</span></td></tr></table>';
    	m += '<TABLE id=pbMarch width=100% height=0% class=pbTab><TR>';
     	for (i=1;i<=5;i++) m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_30_s34.jpg"></td><TD><SPAN id=M_unit'+i+'></span></td>';
      	m+='</tr><TR>';
      	for (i=1;i<=5;i++) m += '<TD><INPUT id=M_Unt'+i+' type=text size=10 maxlength=10 value="0"><INPUT id=M_Max'+i+' type=submit value='+translate("Max")+'></td>';
      	m+='</tr><TR>';   	
      	for (i=6;i<=10;i++) m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_30_s34.jpg"></td><TD><SPAN id=M_unit'+i+'></span></td>';
      	m+='</tr><TR>';
      	for (i=6;i<=10;i++) m += '<TD><INPUT id=M_Unt'+i+' type=text size=10 maxlength=10 value="0"><INPUT id=M_Max'+i+' type=submit value='+translate("Max")+'></td>';
      	m+='</tr><TR>';
      	for (i=11;i<=15;i++) m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_30_s34.jpg"></td><TD><SPAN id=M_unit'+i+'></span></td>';
      	m+='</tr><TR>';
      	for (i=11;i<=15;i++) m += '<TD><INPUT id=M_Unt'+i+' type=text size=10 maxlength=10 value="0"><INPUT id=M_Max'+i+' type=submit value='+translate("Max")+'></td>';
      	m+='</tr><TR>';
      	for (i=0;i<5;i++) m += '<TD rowspan="2"><img src="https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/'+t.resources[i]+'_30.png"></td><TD><SPAN id=M_recInfo'+i+'></span></td>';
      	m+='</tr><TR>';
        for (i=0;i<5;i++) m += '<TD><INPUT id=M_Recource'+i+' type=text size=10 maxlength=10 value="0"><INPUT id=M_R_Max'+i+' type=submit value='+translate("Max")+'></td>';

	    m += '</tr></table><BR><TABLE id=pbReinfETA width=90% height=0% align="center" class=pbTab>';
	    m += '<TR align="center"><TD rowspan=2 width=150px><SELECT id="pbMarchType"><OPTION value=4>Attack</option><OPTION value=3>Scout</option><OPTION value=5>Reassign</option><OPTION value=2>Reinforce</option></select></td>';
	    m += '<TD rowspan=2><SELECT id=M_Knight type=list></select></td>';
	    m += '<TD rowspan=2 width=100px><a class="button20" id=addToQueue><span>Save march</span></a></td><TD rowspan=2 width=100px><a class="button20" id=ManualMarch><span>Manual March</span></a></td>';
	    m += '<TD style="width:30px;text-align:right"><INPUT id=AuraOfCommand type=checkbox unchecked=true><TD rowspan=2 width=30px><img src=https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/30/931.jpg></td>';
	    m += '<TD style="width:30px;text-align:right"><INPUT id=AuraOfConquest type=checkbox unchecked=true><TD rowspan=2 width=30px><img src=https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/30/932.jpg></td>';
	    m += '<TD style="width:30px;text-align:right"><INPUT id=GreenGriffin type=checkbox unchecked=true><TD rowspan=2 width=30px><img src=https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/30/55.jpg></td>';
	    m += '<TD style="width:30px;text-align:right"><INPUT id=RedDragon type=checkbox unchecked=true><TD rowspan=2 width=30px><img src=https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/30/57.jpg></td>';

	    if (t.i931 == 0) color = "red"; else color = "black";
	    m+= '<TR align="center"><TD align=right><FONT color='+color+'>'+t.i931+'</font></td>';
	    if (t.i932 == 0) color = "red"; else color = "black";
	    m+= '<TD align=right><FONT color='+color+'>'+t.i932+'</font></td>'
	    if (t.i55 == 0) color = "red"; else color = "black";
	    m+= '<TD align=right><FONT color='+color+'>'+t.i55+'</font></td>'
	    if (t.i57 == 0) color = "red"; else color = "black";
	    m+= '<TD align=right><FONT color='+color+'>'+t.i57+'</font></td>'
	    m += '</tr></table>';
	    m+= '<BR><DIV id=MarchInfo></div>';
	    m+= '<BR><DIV id=pbReinfMain class=pbStat>Saved Marches</div><BR><BR><DIV id=M_Queue></div>';
	    return m;
    },

    ListKnights : function(){
       	var t = Tabs.March;
       	var knt = new Array();
       	for (k in Seed.knights['city' + t.from.city.id]){
       		if (Seed.knights['city' + t.from.city.id][k]["knightStatus"] == 1 && Seed.leaders['city' + t.from.city.id]["resourcefulnessKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"] && Seed.leaders['city' + t.from.city.id]["politicsKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"] && Seed.leaders['city' + t.from.city.id]["combatKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"] && Seed.leaders['city' + t.from.city.id]["intelligenceKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"]){
       			knt.push ({
       				Name:   Seed.knights['city' + t.from.city.id][k]["knightName"],
       				Combat:	parseInt(Seed.knights['city' + t.from.city.id][k]["combat"]),
       				ID:		Seed.knights['city' + t.from.city.id][k]["knightId"],
       			});
       		}
       	}
       	knt = knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
      	document.getElementById('M_Knight').options.length=0;	
		if (document.getElementById('pbMarchType').value != 4) t.AddZeroKnight();
       	for (k in knt){
    			if (knt[k]["Name"] !=undefined){
	    			var o = document.createElement("option");
	    			o.text = (knt[k]["Name"] + ' (' + knt[k]["Combat"] +')')
	    			o.value = knt[k]["ID"];
	    			document.getElementById("M_Knight").options.add(o);
    			}
    	}
    	if (document.getElementById('pbMarchType').value == 4) t.AddZeroKnight();
    },

    AddZeroKnight: function(){
    	var o = document.createElement("option");
		o.text = '--Choose a Knight--';
		o.value = 0;
		document.getElementById("M_Knight").options.add(o);
    },

    PaintMarchSize : function (){
    	var t = Tabs.March;
    	var Aura = 0;
    	if (document.getElementById('AuraOfCommand').checked) Aura = 25;
    	if (document.getElementById('AuraOfConquest').checked) Aura = 50;
   		t.getRallypoint("city" + t.from.city.id);
    	RallypointMax = (t.rallypointlevel * 10000);
    	var TR = unsafeWindow.cm.ThroneController.effectBonus(66);
    	if (TR > 150) TR=150;
    	t.maxsend = RallypointMax + ((RallypointMax / 100) * TR);
    	if (Seed.cityData.city[t.from.city.id].isPrestigeCity) {
    		switch(parseInt(Seed.cityData.city[t.from.city.id].prestigeInfo.prestigeLevel)){
    			case 1: t.maxsend = Math.round(t.maxsend * 1.50);break;
    			case 2: t.maxsend = Math.round(t.maxsend * 1.60);break;
    			case 3: t.maxsend = Math.round(t.maxsend * 1.65);break;
    		}
    	}
    	t.maxsend = t.maxsend * (1 + (Aura/100));  	
    	var m = 'March Size: ' + addCommas(t.maxsend) + ' (TR: ' + TR + '% - Aura: ' + Aura + '%)';
    	document.getElementById('MPresetCont').innerHTML = m;
    },

    MarchType : function(){
    	var t = Tabs.March;  
    	if (document.getElementById('pbMarchType').value == 3) {
    		for (var i=1;i<=15;i++) if (i!=3) {
    			document.getElementById('M_Unt'+i).disabled = true;
    			document.getElementById('M_Unt'+i).value = 0;
    			document.getElementById('M_Max'+i).disabled = true;
    		} else if (Seed.units["city" + t.from.city.id]["unt"+i] ==0) {
    			document.getElementById('M_Unt'+i).disabled = true;
    			document.getElementById('M_Unt'+i).value = 0;
    			document.getElementById('M_Max'+i).disabled = true;
    		} else {
    			document.getElementById('M_Unt'+i).disabled = false;
	    		document.getElementById('M_Max'+i).disabled = false; 
    		}
    	} else for (var i=1;i<=15;i++) {
    		if (Seed.units["city" + t.from.city.id]["unt"+i] == 0) {
	    		document.getElementById('M_Unt'+i).disabled = true;
	    		document.getElementById('M_Unt'+i).value = 0;
	    		document.getElementById('M_Max'+i).disabled = true; 
	    	} else {
	    		document.getElementById('M_Unt'+i).disabled = false;
	    		document.getElementById('M_Max'+i).disabled = false; 
	    	}
    	}

    	if (document.getElementById('pbMarchType').value != 2) for (i=0;i<5;i++) {document.getElementById('M_Recource'+i).disabled = true;document.getElementById('M_R_Max'+i).disabled = true;}
    	else for (i=0;i<5;i++) {document.getElementById('M_Recource'+i).disabled = false;document.getElementById('M_R_Max'+i).disabled = false;}
    	t.ListKnights();
    },

    ShowWarning: function(msg,ok){
    	var t = Tabs.March;
    	if (ok) var color = "green";
    	 else var color = "red";
    	document.getElementById('MarchInfo').innerHTML = '<FONT color='+color+'><B>' + msg + '</b></font>';
    },

    ManualMarch : function (){
    	var t = Tabs.March;
    	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    	var total = 0;
		params.kid = document.getElementById("M_Knight").value;
		if (params.kid == 0 && document.getElementById('pbMarchType').value==4) {t.ShowWarning('Please select a knight...',false);return;}
		params.cid=t.from.city.id;
    	params.type=document.getElementById('pbMarchType').value;
	    params.xcoord = document.getElementById('MtargetX').value;
	    params.ycoord = document.getElementById('MtargetY').value;
	    TroopsOK = true;
	    for (var i=1;i<=15;i++){
	    	TroopsInCity = Seed.units['city'+t.from.city.id]['unt'+i];
    		if (parseInt(TroopsInCity) < parseInt(document.getElementById('M_Unt'+i).value)) TroopsOK = false;
    		else if (parseInt(document.getElementById('M_Unt'+i).value) > 0) params['u'+i]=parseInt(document.getElementById('M_Unt'+i).value);
	    }
	    for (i=0;i<5;i++) params['r'+(i+1)] = document.getElementById('M_Recource'+i).value; 
	    if (!TroopsOK) return;

	    if (params.xcoord =="" || params.xcoord=="") {t.ShowWarning("Please enter coords...",false);return;}
	    for (i=1;i<=15;i++) total += parseInt(document.getElementById('M_Unt'+i).value);
	    if (total == 0) {t.ShowWarning("You got to send a least one troop...",false);return;}
		if (total > t.maxsend) {t.ShowWarning("Can't send out that amount of troops, wrong TR cards or Aura?",false);return;}

	    var items=new Array();
	    if (document.getElementById('AuraOfCommand').checked) items.push(931);
	    if (document.getElementById('AuraOfConquest').checked) items.push(932);
	    if (document.getElementById('GreenGriffin').checked) items.push(55);
	    if (document.getElementById('RedDragon').checked) items.push(57);
	    if (items.length > 0) params.items=items.join(","); 

    	new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
              method: "post",
              parameters: params,
              loading: true,
              onSuccess: function (transport) {
                  var rslt = eval("(" + transport.responseText + ")");
                  if (rslt.ok) {
	                  var now = unixTime();
	                  var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
	                  var ut = unixTime();
	                  var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
	                  for(i = 0; i <= unitsarr.length; i++) if(params["u"+i]) unitsarr[i] = params["u"+i];  
	                  var resources=new Array();
	                  resources[0] = params.gold;
	                  for(i=1; i<=4; i++) resources[i] = params["r"+i];
	                  var currentcityid = params.cid;
	                  unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
	                  if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};  
	                  for(var i=0;i<items.length;i++){
							Seed.items["i"+items[i]]=parseInt(Seed.items["i"+items[i]])-1;
							unsafeWindow.ksoItems[items[i]].subtract();
					  }
	                  //t.myDiv.innerHTML = "";
	                  //t.init(t.myDiv);
	                  switch (parseInt(params.type)) {
							case 1: var type = "TRANSPORT";break;
							case 2: var type = "REINFORCE";break;
							case 3: var type = "SCOUT";break;
							case 4: var type = "ATTACK";break;
							case 5: var type = "REASSIGN";break;
					  }
	                  msg = 'Send ' + type + ' to ' + coordLink(params.xcoord,params.ycoord);
	                  t.ShowWarning(msg,true);
	                  setTimeout(t.ShowWarning,5000,"",true)
	                  t.PaintMarchSize(); 
        			  t.ClickCitySelect();  
        			  t.MarchType();
                  } else {t.ShowWarning("Error: "+ rslt.msg,false)}
              },
              onFailure: function () {}
      });     

    },

    Calc_R_Max : function(what){
    	var t = Tabs.March;
    	var otherResources = 0;
    	var maxload = 0;
    	var otherRes = 0;
    	id = what.substr(7);
		for (i=1;i<=15;i++) if (parseInt(document.getElementById('M_Unt'+i).value) > 0) maxload += getMaxLoad(i,parseInt(document.getElementById('M_Unt'+i).value));
		for (i=0;i<5;i++) if (id != i) otherRes += parseInt(document.getElementById('M_Recource' + i).value);
		maxload = maxload - otherRes;
		document.getElementById('M_Recource'+id).value = maxload;
    },

    CalcMax : function (i){
    	var t = Tabs.March;
    	var othertroops=0;
    	var max=0;
    	id = i.substr(5);
    	var rallypointlevel = 0;
    	for (var o in Seed.buildings["city"+ t.from.city.id]){
		    var buildingType = parseInt(Seed.buildings["city"+ t.from.city.id][o][0]);
		    var buildingLevel = parseInt(Seed.buildings["city"+ t.from.city.id][o][1]);
		    if (buildingType == 12) rallypointlevel=parseInt(buildingLevel);
		}
    	if(rallypointlevel == 11) rallypointlevel = 15;
		if(rallypointlevel == 12) rallypointlevel = 20;
    	t.maxsend = (rallypointlevel * 10000);
		if (Seed.cityData.city[t.from.city.id].isPrestigeCity) {
    		switch(parseInt(Seed.cityData.city[t.from.city.id].prestigeInfo.prestigeLevel)){
    			case 1: t.maxsend = Math.round(t.maxsend * 1.50);break;
    			case 2: t.maxsend = Math.round(t.maxsend * 1.60);break;
    			case 3: t.maxsend = Math.round(t.maxsend * 1.65);break;
    		}
    	}
    	var TR = unsafeWindow.cm.ThroneController.effectBonus(66);
    	if (TR > 150) TR=150;
    	t.maxsend = t.maxsend + ((t.maxsend / 100) * TR);
    	if (document.getElementById('AuraOfCommand').checked) t.maxsend = t.maxsend * 1.25;
    	if (document.getElementById('AuraOfConquest').checked) t.maxsend = t.maxsend * 1.50;
    	for (i=1;i<=15;i++) if (id !=i) othertroops += parseInt(document.getElementById('M_Unt'+i).value);
    	if (othertroops < t.maxsend) max = (t.maxsend - othertroops);   	
    	if (max > Seed.units["city" + t.from.city.id]["unt"+id]) max = Seed.units["city" + t.from.city.id]["unt"+id];
    	document.getElementById('M_Unt'+id).value = max;
    },

    ETA : function (){
    	var t = Tabs.March;
    	var a = {};
    	for (i=1;i<=15;i++) a[i] = document.getElementById('M_Unt'+i).value;
    	var items = {};

    	if (document.getElementById('GreenGriffin').checked) items["55"] = true;
	     else if (document.getElementById('RedDragon').checked) items["57"] = true;
    	var dist = distance(t.from.city.x, t.from.city.y, document.getElementById("MtargetX").value, document.getElementById("MtargetY").value)
    	var ETA = marchTimeCalculator(a, false, items, t.from.city.id, document.getElementById('pbMarchType').value,dist);
    	document.getElementById('M_ETA').innerHTML = "ETA: " + ETA;
    },

	GetCoords : function (){
	    var t= Tabs.March;
	    var targetName = "";
	    var targetCityName = "";
	    var total=0;
	    targetX = document.getElementById('MtargetX').value;
	    targetY = document.getElementById('MtargetY').value;
	    if (targetX =="" || targetY=="") {alert("Please enter coords...");return;}
	    for (i=1;i<=15;i++) total += parseInt(document.getElementById('M_Unt'+i).value);
	    if (total == 0) {alert("You got to send a least one troop...");return;}
	    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    	params.blocks = "bl_" + targetX + "_bt_" + targetY;
	    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
      		method: "post",
      		parameters: params,
      		onSuccess: function (transport) {
      			var rslt = eval("(" + transport.responseText + ")");
        		if (rslt.ok) {
        			if (rslt.data["l_"+targetX+"_t_"+targetY].tileType == 51) {
        				userId = rslt.data["l_"+targetX+"_t_"+targetY].tileUserId;
        				if (userId != null) targetName = rslt.userInfo["u" + userId]["n"];
        				targetCityName = rslt.data["l_"+targetX+"_t_"+targetY].cityName;
        			}
        			MarchOptions.Queue.push ({
        				what: 			"March",
        				city: 			t.from.city.id,
        				action: 		document.getElementById('pbMarchType').value,
        				targetX: 		targetX,
        				targetY: 		targetY,
        				tileType: 		rslt.data["l_"+targetX+"_t_"+targetY].tileType,
        				tileLevel: 		rslt.data["l_"+targetX+"_t_"+targetY].tileLevel,
        				targetCityName: targetCityName,
        				targetName: 	targetName,
        				cityNumber: 	rslt.data["l_"+targetX+"_t_"+targetY].cityNum,
        				1: 				document.getElementById('M_Unt1').value,
        				2: 				document.getElementById('M_Unt2').value,
        				3: 				document.getElementById('M_Unt3').value,
        				4: 				document.getElementById('M_Unt4').value,
        				5: 				document.getElementById('M_Unt5').value,
        				6: 				document.getElementById('M_Unt6').value,
        				7: 				document.getElementById('M_Unt7').value,
        				8: 				document.getElementById('M_Unt8').value,
        				9: 				document.getElementById('M_Unt9').value,
        				10: 			document.getElementById('M_Unt10').value,
        				11: 			document.getElementById('M_Unt11').value,
        				12: 			document.getElementById('M_Unt12').value,
        				13: 			document.getElementById('M_Unt13').value,
        				14: 			document.getElementById('M_Unt14').value,
        				15: 			document.getElementById('M_Unt15').value,	
        				r1: 			document.getElementById('M_Recource0').value,
        				r2: 			document.getElementById('M_Recource1').value,
        				r3: 			document.getElementById('M_Recource2').value,
        				r4: 			document.getElementById('M_Recource3').value,
        				r5: 			document.getElementById('M_Recource4').value
        			});
					t.PaintQueue();
					saveMarchOptions();
					for(i=1;i<=15;i++) document.getElementById('M_Unt'+i).value=0;
					document.getElementById('MtargetX').value="";
					document.getElementById('MtargetY').value="";
					Tabs.Dashboard.ShowMarches();
        		}
      		},
    	});	
	},

PaintQueue : function (){
    var t= Tabs.March;
    document.getElementById('M_Queue').innerHTML = '<TABLE id=ShowQ class=pbStat align="center" width=80%></table>';
    for (k=(MarchOptions.Queue.length-1);k>=0;k--) t._addTab(MarchOptions.Queue[k],k);  
    t._addTabHeader();
 },

 _addTab: function(action,k){
    var t = Tabs.March;
    for (postcity in Seed.cities) if (Seed.cities[postcity][0] == action.city) logcity = Seed.cities[postcity][1];
    var total = 0;
	var info = "";
	var type="";
	for (i=1;i<=15;i++) total += parseInt(action[i]);
	switch (parseInt(action.tileType)) {
		case 0: info = "Bog";break;
		case 10: info = "Grassland";break;
		case 11: info = "Lake";break;
		case 20: info = "Woods";break;
		case 30: info = "Hills";break;
		case 40: info = "Mountain";break;
		case 50: info = "Plain";break;
		case 51: 
			if (action.targetCityName == null && !action.misted) info = "Barb Camp";
				else info = action.targetName;
			break;
		case 53: info = "Misted City";break;
	}
	switch (parseInt(action.action)) {
		case 1: type = "TRANSPORT";break;
		case 2: type = "REINFORCE";break;
		case 3: type = "SCOUT";break;
		case 4: type = "ATTACK";break;
		case 5: type = "REASSIGN";break;
	}
    var row = document.getElementById('ShowQ').insertRow(0);
    row.vAlign = 'top';
    row.style.color = "black";
    row.insertCell(0).innerHTML ='<A onclick="RemoveQueue('+ k +')"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAstJREFUeNpskstrXWUUxX/7e9zHuadpbwbR0yagZKAIPmga0kEToUELKVVJrBMHBSUDQTuQ/geCCA6ETGt0EFCqkpKmLRaSNlUKgRKvoMU6KkgHUZtKvO97z/m2gyaXFFyTvVjs3xpsttyYeeX6+HsfHCWKoZuCBgiK7s4QQBXd8WIEW69z7fwXv3+4cuO0hAvz3a3ifietBqqKoIQQkKCgYadgtyRACEihwIGtLWY/+vRjV/vnYTfd/NMRMrTTJW3UMdYgufwjKMug2URDhjiHiqBAU4QnvRtyf928yYPf7hLqNcz+fsZu32H97Rlaq9eIygdIqzXMiSmOzn/F2jMHKYSMYAzN/jKddjNjNaJxyaGLoHu1dPgl/Qb0+5ePPZYvgl7y6A959H0vX5rtrlAToQYszUyzq9c2Kvh33+HE2o+9bG7kMFWgqkJNDSqCydSQZgZjLZuLF/nu5Mke8Mbn8z3/2QvPU/ypgjOWNBiyYBAEU/KO2DtKzpH4HJ2rV1k+e5a9Ov/6Kfp/+ZWkUCDa2Y+9xRowkXXsc47YWordDk9MTnJqbu6xgtmlZZKxMUyrxT7viZ0jdh5rDCb2nth7SqoUp6aYXFnpgV+fOdPzr66v03f8OLlOh9h74pzDWsFF5TJdBG23efHKlR7w7fg4ycYGt0NgdGEBgGOrq6wPDBDFMSUrmAdtTClJiJKEeGiInycmALg8Pc1z1SrDo6NElQp3zp0DYG1khIHhYaJDg5SSBOcd8vD0m41W0KKIIGlKs93GGkO+UCCIIKq063VaIdBXLCLeE4B+K3xy6/qCKw8e8v9mgoQUESFWBRHCniOWFAR99MaqYD15G2iLNNy9P+5uPn1kYhAxoAq6Qwn/IwEDGOF+5Vbj8t/bF+XZvDny1lODs335wsFqJ2SNVBEBK+AAawRrwIrgDOSs2Gqnu7147/6FSrO7/N8ASxJC+7t5hdYAAAAASUVORK5CYII="/>';	  
    row.insertCell(1).innerHTML = logcity;
    row.insertCell(2).innerHTML = coordLink(parseInt(action.targetX),parseInt(action.targetY));
    row.insertCell(3).innerHTML = info;
    row.insertCell(4).innerHTML = action.targetCityName;
    row.insertCell(5).innerHTML = action.tileLevel;
    row.insertCell(6).innerHTML = addCommas(total);
    row.insertCell(7).innerHTML = '<a class="button20" id="Details' + k + '"><span>Details</span></a>&nbsp&nbsp&nbsp<a class="button20 ptButtonRed" id="doAction' + k + '"><span>'+ type+'</span></a>';
    document.getElementById('doAction' + k).addEventListener('click', function(){t.doMarch(action);}, false);
    document.getElementById('Details' + k).addEventListener('click', function(){t.DetailsPop(action,logcity,info);}, false);
},

_addTabHeader: function() {
    var t = Tabs.March;
    var row = document.getElementById('ShowQ').insertRow(0);
    row.vAlign = 'top';
    row.style.color = "black";
    row.insertCell(0).innerHTML = "&nbsp";
    row.insertCell(1).innerHTML = "From City";
    row.insertCell(2).innerHTML = "Coords";
    row.insertCell(3).innerHTML = "Target Name";
    row.insertCell(4).innerHTML = "City";
    row.insertCell(5).innerHTML = "Level";
    row.insertCell(6).innerHTML = "Troops";
    row.insertCell(7).innerHTML = "Action";
},

DetailsPop : function (action,logcity,info){
	var t = Tabs.March;
	var m = '<TABLE id=pbMarch width=100% height=0% class=pbTab>';
    m+= '<TR><TD width="50px"></td><TD>From city: ' + logcity + '</td></tr>';
    m+= '<TR><TD width="50px"></td><TD>Target: ' + info + '</td></tr>';
    m+= '<TR><TD width="50px"></td><TD>City: ' + action.targetCityName + '</td></tr>';
    m+= '<TR><TD width="50px"></td><TD>Level: ' + action.tileLevel + '</td></tr>';
    m+= '<TR><TD width="50px"></td><TD>Coords: ' +  coordLink(parseInt(action.targetX),parseInt(action.targetY)) + '</td></tr></table><BR>';
    m += '<TABLE id=pbMarch width=100% height=0% class=pbTab><TR>';
    for (i=1;i<=4;i++) m += '<TD width="51px"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_50_s34.jpg"></td><TD width="75px">'+ addCommas(action[i]) +'</td>';
    m+='</tr><TR>'; 
    for (i=5;i<=8;i++) m += '<TD width="51px"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_50_s34.jpg"></td><TD width="75px">'+ addCommas(action[i]) +'</td>';
    m+='</tr><TR>'; 
    for (i=9;i<=12;i++) m += '<TD width="51px"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_50_s34.jpg"></td><TD width="75px">'+ addCommas(action[i]) +'</td>';
    m+='</tr><TR>';
    for (i=13;i<=15;i++) m += '<TD width="51px"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_50_s34.jpg"></td><TD width="75px">'+ addCommas(action[i]) +'</td>';
    m+='</tr></table><BR>'; 
	m += '<TABLE id=pbMarch width=100% height=0% class=pbTab><TR>';
    m+='<TD width="30px"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png"></td><TD width="100px">' + addCommas(action.r1) +'</td>';
	m+='<TD width="30px"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png"></td><TD width="100px">' + addCommas(action.r2) +'</td>';
	m+='<TD width="30px"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png"></td><TD width="100px">' + addCommas(action.r3) +'</td>';
	m+='<TD width="30px"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png"></td><TD width="100px">' + addCommas(action.r4) +'</td>';
	m+='</tr></TR><TD width="30px"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/aetherstone_30.png"></td><TD width="100px">' + addCommas(action.r5) +'</td>';
	m+='<TD width="30px"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png"></td><TD width="100px">' + addCommas(action.gold) +'</td>';
	m+='</tr></table>'; 	
    var pop = new pbPopup ('giftHelp', 0, 0, 550, 410, true);
    pop.centerMe (mainPop.getMainDiv());  
    pop.getMainDiv().innerHTML = m;
    pop.getTopDiv().innerHTML = '<CENTER><B>Saved March info</center>';
    pop.show (true);
  },


    
ClickCitySelect: function(city){
    var t = Tabs.March;  
    for (i=1;i<=15;i++) {
    	document.getElementById('M_unit'+i).innerHTML = addCommas(Seed.units["city" + t.from.city.id]["unt"+i]);
    	if (Seed.units["city" + t.from.city.id]["unt"+i] ==0) {
    		document.getElementById('M_Unt'+i).disabled = true;
    		document.getElementById('M_Unt'+i).value = 0;
    		document.getElementById('M_Max'+i).disabled = true;
    	}
    }
    for (i=0;i<=4;i++) {
    	var rec = 0;
    	if (i==4) rec = parseInt(Seed.resources["city" + t.from.city.id]['rec'+(i+1)][0]);
    	else rec = parseInt(Seed.resources["city" + t.from.city.id]['rec'+(i+1)][0]/3600);
    	document.getElementById('M_recInfo'+i).innerHTML = addCommas(Math.round(rec));	
    }
    if (document.getElementById("MtargetX").value != "" && document.getElementById("MtargetY").value != "") {
    	document.getElementById('M_Dist'). innerHTML = "Dist.: " + distance(t.from.city.x, t.from.city.y, document.getElementById("MtargetX").value, document.getElementById("MtargetY").value);
    	t.ETA();
    }
    t.ListKnights();
    t.PaintMarchSize();
    t.MarchType();
},

RemoveQueue: function(id){
    var t = Tabs.March;
    MarchOptions.Queue.splice(id,1);
    t.PaintQueue();
	saveMarchOptions();
	Tabs.Dashboard.ShowMarches();
},
             
getKnights : function(){
   var t = Tabs.March;
   t.knt = new Array();
   for (k in Seed.knights['city' + t.from.city.id]){
           if (Seed.knights['city' + t.from.city.id][k]["knightStatus"] == 1 && Seed.leaders['city' + t.from.city.id]["resourcefulnessKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"] && Seed.leaders['city' + t.from.city.id]["politicsKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"] && Seed.leaders['city' + t.from.city.id]["combatKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"] && Seed.leaders['city' + t.from.city.id]["intelligenceKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"]){
               t.knt.push ({
                   Name:   Seed.knights['city' + t.from.city.id][k]["knightName"],
                   Combat:    parseInt(Seed.knights['city' + t.from.city.id][k]["combat"]),
                   ID:        Seed.knights['city' + t.from.city.id][k]["knightId"],
               });
           }
   }
   t.knt = t.knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
},

    
    getRallypoint: function(cityId){
      var t = Tabs.March;
      for (var o in Seed.buildings[cityId]){
        var buildingType = parseInt(Seed.buildings[cityId][o][0]);
        var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
        if (buildingType == 12) t.rallypointlevel=parseInt(buildingLevel);
       }
     if(t.rallypointlevel == 11) t.rallypointlevel = 15;
     if(t.rallypointlevel == 12) t.rallypointlevel = 20;      
 },

  
    doMarch: function(action){
        var t = Tabs.March;
        t.getKnights();
		if (t.knt.toSource() == "[]") return;
		var kid = t.knt[0].ID;
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.cid=action.city;
        params.type=action.action;
        if (action.action == 4 || action.action == 5) params.kid=kid;
        else params.kid=0;
        params.xcoord = action.targetX;
        params.ycoord = action.targetY;
        params.u1=action["1"];
        params.u2=action["2"];
        params.u3=action["3"];
        params.u4=action["4"];
        params.u5=action["5"];
        params.u6=action["6"];
        params.u7=action["7"];
        params.u8=action["8"];
        params.u9=action["9"];
        params.u10=action["10"];
        params.u11=action["11"];
        params.u12=action["12"];
        params.u13=action["13"];
        params.u14=action["14"];
        params.u15=action["15"];
        if (action.gold) params.gold = action.gold;
      	if (action.r1) params.r1= action.r1;
      	if (action.r2) params.r2= action.r2;
      	if (action.r3) params.r3= action.r3;
      	if (action.r4) params.r4= action.r4;
      	if (action.r5) params.r5= action.r5;
        RPM++;
        var total=0;
    	var max = 0;
    	t.getRallypoint("city" + action.city);
    	RallypointMax = (t.rallypointlevel * 10000);
    	var TR = unsafeWindow.cm.ThroneController.effectBonus(66);
    	if (TR > 150) TR=150;
    	t.maxsend = RallypointMax + ((RallypointMax / 100) * TR);
    	if (Seed.cityData.city[t.from.city.id].isPrestigeCity) {
    		switch(parseInt(Seed.cityData.city[t.from.city.id].prestigeInfo.prestigeLevel)){
    			case 1: t.maxsend = Math.round(t.maxsend * 1.50);break;
    			case 2: t.maxsend = Math.round(t.maxsend * 1.60);break;
    			case 3: t.maxsend = Math.round(t.maxsend * 1.65);break;
    		}
    	}
    	for (i=1;i<=15;i++) total += parseInt(params["u"+i]);
    	if (total > t.maxsend) {alert("Can't send out that amount of troops, wrong TR cards?");return;}

          new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
                  method: "post",
                  parameters: params,
                  loading: true,
                  onSuccess: function (transport) {
	                  var rslt = eval("(" + transport.responseText + ")");
	                  if (rslt.ok) {
		                  var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
		                  var ut = unixTime();
		                  var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
		                  for(i = 0; i <= unitsarr.length; i++){
		                      if(params["u"+i]){
		                      unitsarr[i] = params["u"+i];
		                      }
		                  }
		                  var resources=new Array();
		                  resources[0] = params.gold;
		                  for(i=1; i<=4; i++){
		                      resources[i] = params["r"+i];
		                  }
		                  var currentcityid = params.cid;
		                  unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
		                  if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
	                  } 
           
                  },
                  onFailure: function () {}
          });
               
    },
    
    
    show: function(){
        var t = Tabs.March;
        if (MarchOptions.Queue.length > 0) t.PaintQueue();
    },
    hide: function(){
        var t = Tabs.March;
    },
    onUnload: function(){
    },
}

/************************  Gift Tab ************************/
Tabs.Gift = {
  tabLabel: 'Gift',
  myDiv: null,
  amount:0,
  Gifts:{},

    init: function(div){
    	var t = Tabs.Gift;
        t.myDiv = div;
      	var msg = '<DIV id=pbReinfMain class=pbStat>GIFT TAB</div>';
      	msg += '<BR>Select the gift you want to receive (only works when people are running BOT Fork!), your avatar will be used to determine the gift, so don\'t change it!!';
      	msg += '<BR>It will spread out gifting, so if your alliance has 100 members, everybody should get a gift every 4 days from the same member.';
      	msg+='<BR><DIV id=GiftInfo></div>';
      	t.myDiv.innerHTML = msg;
       	t.GetGifts();    
    },

    GetGifts: function(){
    	var t = Tabs.Gift;
    	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    	params.ctrl = 'GiftItems';
    	params.action = 'getGiftItems';
    	new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
        	method: "post",
          	parameters: params,
          	onSuccess: function (rslt) {
            	if (rslt) {
            		var m ='';
            		for (var i=0;i<rslt.giftItems.length;i++) {
            			t.Gifts[i+1] = rslt.giftItems[i].itemId;
            			m += '<BR><input id="Gift_'+rslt.giftItems[i].itemId+'"" type="radio" name="GiftTypes" value="Cities">' + rslt.giftItems[i].name + ': ' + rslt.giftItems[i].description;
            		}
            		document.getElementById('GiftInfo').innerHTML = m;
            		for (var i=0;i<rslt.giftItems.length;i++)  document.getElementById('Gift_'+ rslt.giftItems[i].itemId).addEventListener('click', function(){t.changeAvatar(this.id);}, false);

            		if (unsafeWindow.seed.player.avatarId > 10) {
            			document.getElementById('Gift_' + t.Gifts[1]).checked = true;
            			t.changeAvatar('Gift_' + t.Gifts[1]);
            		} else document.getElementById('Gift_' + t.Gifts[unsafeWindow.seed.player.avatarId]).checked = true;

            	}
          	},
        });
    },

    changeAvatar: function(id){
    	var t = Tabs.Gift;
    	var avatar = 16;
    	id = id.substr(5);
    	for (i in t.Gifts) 	if (t.Gifts[i] == id) avatar = i;
    	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    	params.aid = avatar;
    	new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/changeAvatar.php" + unsafeWindow.g_ajaxsuffix, {
        	method: "post",
          	parameters: params,
          	onSuccess: function (rslt) {
            	if (rslt.ok) {
            		unsafeWindow.seed.player.avatarId = params.aid;
           			var d = unsafeWindow.seed.player.avatarurl.lastIndexOf("/");
                    var c = unsafeWindow.seed.player.avatarurl.substr(d + 2);
                    var e = params.aid + ".png";
                    unsafeWindow.seed.player.avatarurl = unsafeWindow.seed.player.avatarurl.replace(c, e);
                    //var f;
                    //((unsafeWindow.seed.player.prefix == "Lord") ? f = "m" : f = "f");
                   	//unsafeWindow.jQuery("#hudAvatarPic").attr("class", "avatars_50 " + f + unsafeWindow.seed.player.avatarId);
            	}
          	},
        });
    },

    Check: function(){
    	var t = Tabs.Gift;
    	if ((Options.lastGiftSend + (6*60*60)) > now) return;
    	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.ctrl = 'allianceGifting\\AllianceGiftingServiceAjax';
		params.action = 'getRecipients';
	  	new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			loading: true,
			onSuccess: function (transport) {
				var rslt = eval("(" + transport.responseText + ")");
				if(rslt.ok) {
					t.amount = parseInt(rslt.freeSlot);
					if (t.amount > 0) t.MakeGiftList(rslt.recipients);
				}
			},
			onFailure: function () {},
		});
    },

    MakeGiftList: function(recipients){
    	var t = Tabs.Gift;
    	var helpArray = {};
    	var GiftList = new Array();
    	var AvatarList = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[]};
    	for (var i=0;i<recipients.length;i++) if (recipients[i].userId == 9666766 || recipients[i].userId == 9688786) helpArray[recipients[i].userId] = {avatar:recipients[i].avatarId,lastSend:0};
    	for (var i=0;i<recipients.length;i++) {
    		if (Options.GiftSendTo[recipients[i].userId] == undefined) Options.GiftSendTo[recipients[i].userId] = 1;
    		helpArray[recipients[i].userId] = {avatar:recipients[i].avatarId,lastSend:Options.GiftSendTo[recipients[i].userId]};
    	}
    	saveOptions();
    	for (var i in helpArray) GiftList.push({id:i,avatar:helpArray[i].avatar,lastSend:helpArray[i].lastSend});
    	GiftList = GiftList.sort(function sort(a,b) {a = a['lastSend'];b = b['lastSend'];return a == b ? 0 : (a < b ? -1 : 1);});
    	for (var i=0;i<t.amount;i++) {
    		var avatar = 1;
    		if (GiftList[i]) {
    			if (parseInt(GiftList[i].avatar) <= 10) avatar = parseInt(GiftList[i].avatar);
    			AvatarList[avatar].push(parseInt(GiftList[i].id));
    		}
    	}
		for (i=1;i<=10;i++) if (AvatarList[i].length > 0) setTimeout(t.SendGift,(i*5000),AvatarList[i],i);
    },

    SendGift: function(recipients,i){
    	var t = Tabs.Gift;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.ctrl = 'allianceGifting\\AllianceGiftingServiceAjax';
		params.action = 'sendGift';
		params.recipients = String(recipients).replace(/,/g,"|");
		params.itemId = t.Gifts[i];
		new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				loading: true,
				onSuccess: function (transport) {
					var rslt = eval("(" + transport.responseText + ")");
					if (rslt.ok){
						var now = unixTime();
						Options.lastGiftSend = now;
						for (y in rslt.succeedRecipients) {
							Options.GiftSendTo[recipients[y].userId] = now;
							saveOptions();
						}
						actionLog('Send: ' + rslt.succeedRecipients.length + 'x ' + unsafeWindow.itemlist['i'+params.itemId].name);
						//alert(Options.GiftSendTo.toSource());
					}
				},
				onFailure: function () {},
		});
	},

    show: function(){},
    hide: function(){},
}


/************************  AutoTrain Tab ************************/
Tabs.AutoTrain = {
  tabOrder: 120,
  tabLabel: 'Train',
  myDiv: null,
  city:0,
  gamble : {"1":{"min":"5","max":"15","cost":"2"},"2":{"min":"10","max":"25","cost":"4"}},
  
  init: function(div){
    var t = Tabs.AutoTrain;
    t.myDiv = div;
    t.city = 0;
    t.nextcity();
    
    var m = '<DIV class=pbStat>AUTO TRAIN</div><TABLE width=100% height=0% class=pbTab><TR><TD width=200></td>';
        m += '<TD align=center><INPUT id=pbAutoTrainState type=submit value="'+translate("AutoTrain")+' = '+ (TrainOptions.Running?'ON':'OFF')+'"></td>';
        m += '<TD align=right><INPUT id=pbShowTrainHelp type=submit value='+translate("HELP")+'></td></tr></table>';
        m += '<table><tr><td align=left><INPUT id=pbatTR type=checkbox '+(TrainOptions.tr?'CHECKED':'')+'> Only train when throne room set <INPUT id=pbatTRset type=text size=2 maxlength=1 value="'+ TrainOptions.trset +'">  is equiped</td>';
        m += '</tr></table></div>';
        m += '<DIV class=pbStat>TRAIN OPTIONS</div><TABLE width=100% height=0% class=pbTab><TR align="center">';
    for (i=0;i<Seed.cities.length;i++){
		var citynum = Seed.cities[i][0];
        city = i+1;
          m += '<TABLE width=100% height=0% class=pbTab><TR align="left">';
          m+='<TR><TD width=30px><INPUT type=checkbox class='+city+' id="SelectCity'+city+'"></td>';
        m+='<TD><TABLE><TR>';
        m+='<TD><B>'+ Seed.cities[i][1] +'</b></td>';
        m+='<TD width=150px><SELECT class='+city+' id="TroopsCity'+city+'"><option value="Select">--Select--</options>';
            for (y in unsafeWindow.unitcost) {
                var faux = 0;
                var uc = unsafeWindow.unitcost[y];
				if (matTypeof(uc[8]) == 'object'){
					if(!Seed.cityData.city[citynum].isPrestigeCity) {
						for (k in uc[8]){
							var b = getCityBuilding (Seed.cities[i][0], k.substr(1));
							if (b.maxLevel < uc[8][k][1]){
								faux = 1;
								break;
							}
						}
					}else {
						if(uc[8]['b13']) {
							var b = getCityBuilding (Seed.cities[i][0], 13);
							if (b.maxLevel < uc[8]['b13'][1]){
								faux = 1;
							}
						}
					}	
				}
                if (matTypeof(uc[9]) == 'object'){
                    for (k in uc[9]){
                        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1]){
                            faux = 1;
                            break;
                        }
                    }
                }
                if(y == "unt13") faux = 1;
				if(y == "unt14") faux = 1;
				if(y == "unt15") faux = 1;
				
                if (faux==0)
                    m+='<option value="'+y.substr(3)+'">'+unsafeWindow.unitcost[y][0]+'</option>';
            }
        m+='</select></td>';
        m+='<TD width=100px>Min.: <INPUT class='+city+' id=treshold'+city+' type=text size=4 maxlength=6 value="'+ TrainOptions.Threshold[city]+'"\></td>';
        m+='<TD width=130px><INPUT type=checkbox class='+city+' id="SelectMax'+city+'"> '+translate("Max")+'.: <INPUT class='+city+' id=max'+city+' type=text size=5 maxlength=6 value="'+ TrainOptions.Max[city]+'"\></td>';
        m +='<TD>'+translate("Use Workers")+': ';
        m+='<SELECT class='+city+' id="workers'+city+'"><option value="0">0%</options>';
        m+='<option value="25">25%</options>';
        m+='<option value="50">50%</options>';
        m+='<option value="75">75%</options>';
        m+='<option value="100">100%</options></select>';
        m+='</td><td>';
        m += '<TD><SELECT class='+city+' id="TrainSpeedItem_'+city+'">\
        <option value=0><CENTER>--- '+unsafeWindow.g_js_strings.commonstr.items+' '+unsafeWindow.g_js_strings.commonstr.speedup+' ---</center></option>\
        <option value=36>'+unsafeWindow.itemlist.i36.name+'</option>\
        <option value=37>'+unsafeWindow.itemlist.i37.name+'</option>\
        <option value=38>'+unsafeWindow.itemlist.i38.name+'</option></select>';
        m+='</td></tr></table></td><tr>';
        m += '<TD></td><TD><TABLE><TR>';
        m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png"></td>';
        m += '<TD><INPUT class='+city+' id="KeepFood'+city+'" type=text size=7 maxlength=7 value="'+ TrainOptions.Keep[city]['Food']+'"\></td>';
        m += '<TD width=20px><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png"></td>';
        m += '<TD><INPUT class='+city+' id="KeepWood'+city+'" type=text size=7 maxlength=7 value="'+ TrainOptions.Keep[city]['Wood']+'"\></td>';
        m += '<TD width=20px><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png"></td>';
        m += '<TD><INPUT class='+city+' id="KeepStone'+city+'" type=text size=7 maxlength=7 value="'+ TrainOptions.Keep[city]['Stone']+'"\></td>';
        m += '<TD width=20px><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png"></td>';
        m += '<TD><INPUT class='+city+' id="KeepOre'+city+'" type=text size=7 maxlength=7 value="'+ TrainOptions.Keep[city]['Ore']+'"\></td>';
        m += '<TD><SELECT class='+city+' id="Resource'+city+'"><option value="true">'+translate("Keep")+'</options>';
        m+='<option value="false">'+translate("Use")+'</option>';
        m+='</select></td>';
          
        m += '<TD><SELECT class='+city+' id="TrainSpeed_'+city+'">\
        <option value=0><CENTER>--- '+unsafeWindow.g_js_strings.commonstr.speedup+' ---</center></option>\
        <option value=1>'+ t.gamble[1].cost+'x res ('+ t.gamble[1].min+' - '+t.gamble[1].max+'%)</option>\
        <option value=2>'+ t.gamble[2].cost+'x res ('+ t.gamble[2].min+' - '+t.gamble[2].max+'%)</option></select>';
        m+='</td></tr></table>';       
        if(Seed.cityData.city[citynum].prestigeInfo.blessings) {
        if(Seed.cityData.city[citynum].prestigeInfo.blessings.indexOf(11) != -1) {
			m += '<tr><td></td><td align=left><INPUT class='+city+' id=AsEnabled'+city+' type=checkbox '+(TrainOptions.AsEnabled[city]?'CHECKED':'')+'> Auto train '+unsafeWindow.unitcost['unt13'][0]+' '+translate("Min")+'.: <INPUT class='+city+' id=AsTroops'+city+' type=text size=4 maxlength=6 value="'+TrainOptions.AsTroops[city]+'"><INPUT type=checkbox class='+city+' id="AsSelectMax'+city+'"> '+translate("Max")+'.: <INPUT class='+city+' id=Asmax'+city+' type=text size=5 maxlength=6 value="'+ TrainOptions.AsMax[city]+'"\></td>';
		};
		if(Seed.cityData.city[citynum].prestigeInfo.blessings.indexOf(21) != -1) {
			m += '<tr><td></td><td align=left><INPUT class='+city+' id=AsEnabled'+city+' type=checkbox '+(TrainOptions.AsEnabled[city]?'CHECKED':'')+'> Auto train '+unsafeWindow.unitcost['unt14'][0]+' '+translate("Min")+'.: <INPUT class='+city+' id=AsTroops'+city+' type=text size=4 maxlength=6 value="'+TrainOptions.AsTroops[city]+'"><INPUT type=checkbox class='+city+' id="AsSelectMax'+city+'"> '+translate("Max")+'.: <INPUT class='+city+' id=Asmax'+city+' type=text size=5 maxlength=6 value="'+ TrainOptions.AsMax[city]+'"\></td>';
		};
		if(Seed.cityData.city[citynum].prestigeInfo.blessings.indexOf(31) != -1) {
			m += '<tr><td></td><td align=left><INPUT class='+city+' id=AsEnabled'+city+' type=checkbox '+(TrainOptions.AsEnabled[city]?'CHECKED':'')+'> Auto train '+unsafeWindow.unitcost['unt15'][0]+' '+translate("Min")+'.: <INPUT class='+city+' id=AsTroops'+city+' type=text size=4 maxlength=6 value="'+TrainOptions.AsTroops[city]+'"><INPUT type=checkbox class='+city+' id="AsSelectMax'+city+'"> '+translate("Max")+'.: <INPUT class='+city+' id=Asmax'+city+' type=text size=5 maxlength=6 value="'+ TrainOptions.AsMax[city]+'"\></td>';
		};
	}; 
        m+='</td></tr></table>';
    }
      
        t.myDiv.innerHTML = m;
      
    for (i=0;i<Seed.cities.length;i++){
        city = i+1;
        document.getElementById('TroopsCity'+city).value = TrainOptions.Troops[city];
        document.getElementById('SelectCity'+city).checked = TrainOptions.Enabled[city];
        document.getElementById('Resource'+city).value = TrainOptions.Resource[city];
        document.getElementById('SelectMax'+city).checked = TrainOptions.SelectMax[city];
        document.getElementById('workers'+city).value = TrainOptions.Workers[city];
        document.getElementById('TrainSpeed_'+city).value = TrainOptions.Gamble[city];
        document.getElementById('TrainSpeedItem_'+city).value = TrainOptions.Item[city];
        if (!TrainOptions.SelectMax[city]) document.getElementById('max'+city).disabled=true;
        if(document.getElementById('AsEnabled'+city)) {
			document.getElementById('AsEnabled'+city).checked = TrainOptions.AsEnabled[city];
			document.getElementById('AsTroops'+city).value = TrainOptions.AsTroops[city];
			document.getElementById('AsSelectMax'+city).checked = TrainOptions.AsSelectMax[city];
			if (!TrainOptions.AsSelectMax[city]) document.getElementById('Asmax'+city).disabled=true;
		};
    }
       
    document.getElementById('pbShowTrainHelp').addEventListener('click', function(){
        t.helpPop(this);
    }, false);
       
    document.getElementById('pbAutoTrainState').addEventListener('click', function(){
        t.toggleAutoTrainState(this);
    }, false);

    document.getElementById('pbatTR').addEventListener ('change', function() {
        TrainOptions.tr = this.checked;
        saveTrainOptions();
        }, false);
    document.getElementById('pbatTRset').addEventListener ('change', function() {
        TrainOptions.trset = this.value;
        saveTrainOptions();
        }, false);

    for(var k=1; k<=Seed.cities.length; k++){
         document.getElementById('treshold'+k).addEventListener('change', function(e){
             if (isNaN(e.target.value)) e.target.value=0 ;
            TrainOptions.Threshold[e.target['className']] = e.target.value;
             saveTrainOptions();
         }, false);
         document.getElementById('SelectMax'+k).addEventListener('change', function(e){
             TrainOptions.SelectMax[e.target['className']] = e.target.checked;
             if (!TrainOptions.SelectMax[e.target['className']]){
                document.getElementById('max'+e.target['className']).value = 0;
                document.getElementById('max'+e.target['className']).disabled=true;
            } else {
                document.getElementById('max'+e.target['className']).disabled=false;
            }
            saveTrainOptions();
         }, false);
         document.getElementById('max'+k).addEventListener('change', function(e){
              TrainOptions.Max[e.target['className']] = e.target.value;
              saveTrainOptions();
          }, false);
         document.getElementById('workers'+k).addEventListener('change', function(e){
              TrainOptions.Workers[e.target['className']] = e.target.value;
              t.AF_TU_Change(e.target['className'],document.getElementById('TroopsCity'+e.target['className']).value);
              TrainOptions.Max[e.target['className']] = document.getElementById('max'+e.target['className']).value;
              saveTrainOptions();
          }, false);
         document.getElementById('Resource'+k).addEventListener('change', function(e){
            TrainOptions.Resource[e.target['className']] = e.target.value;
             saveTrainOptions();
        }, false);
         document.getElementById('TrainSpeed_'+k).addEventListener('change', function(e){
            TrainOptions.Gamble[e.target['className']] = e.target.value;
             saveTrainOptions();
        }, false);
         document.getElementById('TrainSpeedItem_'+k).addEventListener('change', function(e){
            TrainOptions.Item[e.target['className']] = e.target.value;
             saveTrainOptions();
        }, false);
        document.getElementById('SelectCity'+k).addEventListener('change', function(e){
            TrainOptions.Enabled[e.target['className']] = e.target.checked;
            saveTrainOptions();
          }, false);
          document.getElementById('TroopsCity'+k).addEventListener('change', function(e){
            t.AF_TU_Change(e.target['className'],e.target.value);
            TrainOptions.Troops[e.target['className']] = e.target.value;
              TrainOptions.Max[e.target['className']] = document.getElementById('max'+e.target['className']).value;
            saveTrainOptions();
          }, false);
          document.getElementById('KeepFood'+k).addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            TrainOptions.Keep[e.target['className']]['Food'] = e.target.value;
            saveTrainOptions();
          }, false);
          document.getElementById('KeepWood'+k).addEventListener('change', function(e){
              if (isNaN(e.target.value)) e.target.value=0 ;
            TrainOptions.Keep[e.target['className']]['Wood'] = e.target.value;
            saveTrainOptions();
          }, false);
          document.getElementById('KeepStone'+k).addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            TrainOptions.Keep[e.target['className']]['Stone'] = e.target.value;
            saveTrainOptions();
          }, false);
          document.getElementById('KeepOre'+k).addEventListener('change', function(e){
              if (isNaN(e.target.value)) e.target.value=0 ;
            TrainOptions.Keep[e.target['className']]['Ore'] = e.target.value;
            saveTrainOptions();
          }, false);
           if(document.getElementById('AsEnabled'+k)) {  
        document.getElementById('AsEnabled'+k).addEventListener('change', function(e){
            TrainOptions.AsEnabled[e.target['className']] = e.target.checked;
            saveTrainOptions();
          }, false);
         document.getElementById('AsTroops'+k).addEventListener('change', function(e){
             if (isNaN(e.target.value)) e.target.value=0 ;
            TrainOptions.AsTroops[e.target['className']] = e.target.value;
             saveTrainOptions();
         }, false);
                 document.getElementById('Asmax'+k).addEventListener('change', function(e){
              TrainOptions.AsMax[e.target['className']] = e.target.value;
              saveTrainOptions();
          }, false);
            document.getElementById('AsSelectMax'+k).addEventListener('change', function(e){
             TrainOptions.AsSelectMax[e.target['className']] = e.target.checked;
             if (!TrainOptions.AsSelectMax[e.target['className']]){
                document.getElementById('Asmax'+e.target['className']).value = 0;
                document.getElementById('Asmax'+e.target['className']).disabled=true;
            } else {
                document.getElementById('Asmax'+e.target['className']).disabled=false;
            }
            saveTrainOptions();
         }, false);
		};
               
          
          
          
    }
  },
  
  
  helpPop : function (){
    var helpText = '<BR><DL><dt>Autotrain:<dd><LI>Toggle the box in front of the row to enable autotrain for that city (the number is the citynumer).</dd>\
        <dd><LI>Select a trooptype per city in the dropdown boxes.</dd>\
        <dd><LI>Fill in the minimum troops that triggers the autotrain (less then this will not be trained).</dd>\
        <dt>Fill in resources:</dt>\
          <dd><LI>Keep: Autotrain will keep this amount available in the city.</dd>\
          <dd><LI>Use: Autotrain will only use the resources to train troops.</dd>\
        <dt>Turn it on: </dt>\
          <dd><LI>Hit the AutoTrain toggle button.</dd></ul>';
    var pop = new pbPopup ('giftHelp', 0, 0, 550, 230, true);
    pop.centerMe (mainPop.getMainDiv());  
    pop.getMainDiv().innerHTML = helpText;
    pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot '+translate("Help")+'</b>:  '+translate("Auto Train")+'</center>';
    pop.show (true);
  },
  
  toggleAutoTrainState: function(obj){
    var t = Tabs.AutoTrain;
    if (TrainOptions.Running == true) {
        TrainOptions.Running = false;
        obj.value = translate("AutoTrain = OFF");
    }
    else {
        TrainOptions.Running = true;
        obj.value = translate("AutoTrain = ON");
        t.nextcity();
    }
    saveTrainOptions();
  },
    
  show: function(){
    var t = Tabs.AutoTrain;
  },
  hide: function(){
    var t = Tabs.AutoTrain;
  },
      AF_TU_Change: function(numcity,unit) {
        var t = Tabs.AutoTrain;
        var cityId = Cities.cities[numcity-1].id
        var coutenpop= unsafeWindow.unitcost['unt'+unit][6];
        var X = Seed.citystats['city'+cityId].pop[1];//max pop
        var Y = unsafeWindow.seed.citystats["city"+cityId].pop[3];//workers
        var Q= coutenpop;
        var Z = document.getElementById('workers'+numcity).value/100;
        if (Z == 0)
        document.getElementById("max"+numcity).value=parseIntNan((X-Y)/Q);
        else if (Z == 1)
        document.getElementById("max"+numcity).value=parseIntNan(X/Q);
        else
        document.getElementById("max"+numcity).value = parseIntNan((X-(Y*Z))/Q);
    },
  checkidlepopulation : function(cityId){
    var t = Tabs.AutoTrain;
    if(TrainOptions.Workers[t.city] == 0)
        t.idle = parseInt(Seed.citystats['city'+cityId].pop[0]) - parseInt(Seed.citystats['city'+cityId].pop[3]);
    else
        t.idle = ((TrainOptions.Workers[t.city]/100)*parseInt(Seed.citystats['city'+cityId].pop[0])).toFixed(0);
    return t.idle>0?true:false;
  },
  checktrainslots : function(cityId,prest){
     var t = Tabs.AutoTrain;
     if(!prest) {
        t.barracks = getCityBuilding(cityId, 13).count;
        t.slots = 0;
        for (k in Seed.queue_unt['city'+cityId])
           if(Seed.queue_unt['city'+cityId][k][7] == false)
              t.slots += 1;
        t.empty = parseInt(t.barracks - t.slots);
        return t.empty>0?true:false;
     } else {
        t.barracks = Number(getCityBuilding(cityId, 22).count + getCityBuilding(cityId, 24).count + getCityBuilding(cityId, 26).count);//24 fey barracks, 22 druid barracks 26 briton barracks
        t.slots = 0;
        for (k in Seed.queue_unt['city'+cityId])
           if(Seed.queue_unt['city'+cityId][k][7] == true)
              t.slots += 1;
        t.empty = parseInt(t.barracks - t.slots);
        return t.empty>0?true:false;
     }
  },
  checkresources : function(cityId){
    var t = Tabs.AutoTrain;
    t.food = parseInt((Seed.resources['city'+cityId].rec1[0]/3600) - TrainOptions['Keep'][t.city]['Food']);
    t.wood = parseInt((Seed.resources['city'+cityId].rec2[0]/3600) - TrainOptions['Keep'][t.city]['Wood']);
    t.stone = parseInt((Seed.resources['city'+cityId].rec3[0]/3600) - TrainOptions['Keep'][t.city]['Stone']);
    t.ore = parseInt((Seed.resources['city'+cityId].rec4[0]/3600) - TrainOptions['Keep'][t.city]['Ore']);
    if(t.food>0 && t.wood>0 && t.stone>0 && t.ore>0){
        return true;
    }
    return false;
  },
  trainamt : function(cityId, unitId){
    var t = Tabs.AutoTrain;
    if(!unitId || unitId<1) return false;
    var cost = unsafeWindow.Object.clone(unsafeWindow.unitcost['unt'+ unitId]);
    var gamble = (parseInt(TrainOptions.Gamble[t.city])>0)?t.gamble[TrainOptions.Gamble[t.city]].cost:1;
    t.amt = Math.floor(t.idle/cost[6]);
    for(var rs=1; rs<5; rs++)
        cost[rs] *= gamble;
    if ((t.food/cost[1]) < t.amt) t.amt = Math.floor(t.food/cost[1]);
    if ((t.wood/cost[2]) < t.amt) t.amt = Math.floor(t.wood/cost[2]);
    if ((t.stone/cost[3]) < t.amt) t.amt = Math.floor(t.stone/cost[3]);
    if ((t.ore/cost[4]) < t.amt) t.amt = Math.floor(t.ore/cost[4]);
    if (unitId < 13) {
    if(TrainOptions.SelectMax[t.city]){
        if(parseInt(t.amt) > parseInt(TrainOptions.Max[t.city])) t.amt = TrainOptions.Max[t.city];
    }
    if(parseInt(t.amt) < parseInt(TrainOptions.Threshold[t.city])) t.amt = 0;
	} else {
		if(TrainOptions.AsSelectMax[t.city])
        if(parseInt(t.amt) > parseInt(TrainOptions.AsMax[t.city])) t.amt = TrainOptions.AsMax[t.city];
		
		if(parseInt(t.amt) < parseInt(TrainOptions.AsTroops[t.city])) t.amt = 0;
	}
    
    return t.amt>0?true:false;
  },
  
  nextcity : function(){
    var t = Tabs.AutoTrain;
    if (!TrainOptions.Running) return;
    if (TrainOptions.tr && TrainOptions.trset != 0) {
        if (Seed.throne.activeSlot != TrainOptions.trset) {
	        setTimeout(t.nextcity, 60000);
            return;
            };
        };
     t.city++;
   if(t.city > Seed.cities.length) t.city = 1;
    var cityId = Seed.cities[t.city-1][0];
    var idle = t.checkidlepopulation(cityId);
    var resources = t.checkresources(cityId);
	if(Seed.cityData.city[cityId].isPrestigeCity) {
		var ptrainslots = t.checktrainslots(cityId,true);
		var punit = false;
		if(getCityBuilding(cityId, 22).count)
			punit = 13;
		if(getCityBuilding(cityId, 24).count)
			punit = 14;
		if(getCityBuilding(cityId, 26).count)
			punit = 15;
		if(punit)	
			var ptrain = t.trainamt(cityId, punit);
		if(TrainOptions.AsEnabled[t.city] && idle && ptrainslots && resources && ptrain) {
				t.doTrain(cityId, punit, t.amt, t.nextcity, TrainOptions.Item[t.city]);
				t.city--;
				return;
		};
	};
    var trainslots = t.checktrainslots(cityId);
    var train = t.trainamt(cityId, TrainOptions['Troops'][t.city]);
    

    if(!TrainOptions.Enabled[t.city] || TrainOptions['Troops'][t.city]==0 || !idle || !trainslots || !resources || !train){
        setTimeout(t.nextcity, 5000);
        return;
    }
    t.doTrain(cityId, TrainOptions['Troops'][t.city], t.amt, t.nextcity, TrainOptions.Item[t.city]);
  },
  doTrain : function (cityId, unitId, num, notify, tut){
    var t = Tabs.AutoTrain;
    var time = unsafeWindow.modal_barracks_traintime(unitId, num);
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = cityId;
    params.type = unitId;
    params.quant = num;
    if(parseIntNan(tut) > 0)
        params.items = tut;
    if(parseInt(TrainOptions.Gamble[t.city]) > 0)
        params.gambleId = TrainOptions.Gamble[t.city];
	if(params.type < 13)
		var inPrestige = false;
	else var inPrestige = true;
    var profiler = new unsafeWindow.cm.Profiler("ResponseTime", "train.php");
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/train.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function(rslt) {
      if (rslt.updateSeed)
        unsafeWindow.update_seed(rslt.updateSeed);
            profiler.stop();
          if (rslt.ok) {
            for (var i = 1; i < 5; i++) {
                var resourceLost = parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(num);
                if(rslt.gamble) resourceLost = resourceLost*rslt.gamble[i];
                unsafeWindow.seed.resources["city" + cityId]["rec" + i][0] = parseInt(unsafeWindow.seed.resources["city" + cityId]["rec" + i][0]) - resourceLost;
            }
            unsafeWindow.seed.citystats["city" + cityId].gold[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].gold[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][5]) * parseInt(num);
            unsafeWindow.seed.citystats["city" + cityId].pop[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].pop[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][6]) * parseInt(num);
            unsafeWindow.seed.queue_unt["city" + cityId].push([unitId, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null,inPrestige]);
            setTimeout (notify, 10000);
            for (postcity in Seed.cities) if (Seed.cities[postcity][0] == params.cid) logcity = Seed.cities[postcity][1];
            actionLog(logcity  + ' Train ' + num + ':  ' + troops[unitId] );
          } else {
            setTimeout (notify, 10000);
          }
        },
      onFailure: function () {profiler.stop();}
    });
  },
}

/************************ Gold Collector ************************/
var CollectGold = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++)
      t.lastCollect['c'+ Cities.cities[c].id] = 0;
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
      var happy = Seed.citystats['city'+ city.id].pop[2];
      var since = unixTime() - t.lastCollect['c'+city.id];
      if (happy>=Options.pbGoldHappy && since>15*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.colHappy = happy;
        t.ajaxCollectGold (city, t.e_ajaxDone);
        break;
      }
    }
    t.timer = setTimeout (t.tick, 15000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectGold;
    if (rslt.ok)
      actionLog ('Collected '+ rslt.goldGained +' gold for '+ t.colCityName +' (happiness was '+ t.colHappy +')');
    else
      actionLog ('Error collecting gold for '+ t.colCityName +': <SPAN class=boldRed>'+ rslt.errorMsg +'</span>');
  },
  
  ajaxCollectGold : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/levyGold.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify)  
          notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify)  
          notify (rslt);
      }
    });
  },
}



/************************ Gold Collector ************************/
var CollectGold = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++)
      t.lastCollect['c'+ Cities.cities[c].id] = 0;
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
      var happy = Seed.citystats['city'+ city.id].pop[2];
      var since = unixTime() - t.lastCollect['c'+city.id];
      if (happy>=Options.pbGoldHappy && since>15*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.colHappy = happy;
        t.ajaxCollectGold (city, t.e_ajaxDone);
        break;
      }
    }
    t.timer = setTimeout (t.tick, 15000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectGold;
    if (rslt.ok)
      actionLog ('Collected '+ rslt.goldGained +' gold for '+ t.colCityName +' (happiness was '+ t.colHappy +')');
    else
      actionLog ('Error collecting gold for '+ t.colCityName +': <SPAN class=boldRed>'+ rslt.errorMsg +'</span>');
  },
  
  ajaxCollectGold : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
    RPM++;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/levyGold.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify) notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify) notify (rslt);
      }
    });
  },
}

/************************ Refresh Every X minutes ************************/
var RefreshEvery  = {
  timer : null,
  PaintTimer : null,
  NextRefresh : 0,
  box : null,
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
    t.box = document.createElement('div');
    t.target.appendChild(t.box);
  },
  
  setEnable : function (tf){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (tf) {
      //t.timer = setTimeout (t.doit, Options.pbEveryMins*60000);
      t.NextRefresh = unixTime() + (Options.pbEveryMins*60);
      t.timer = setTimeout (t.Paint, 1000);
    } else {
        //t.PaintTimer = null;
        t.timer = null;
        t.NextRefresh = 0;
        t.box.innerHTML = '<BR><FONT color=white><B>&nbsp;&nbsp;&nbsp;&nbsp;'+ getMyAlliance()[1] + ' (' + getServerId() +')</b></font>';
    }
  },
  
  doit : function (){
    actionLog ('Refreshing ('+ Options.pbEveryMins +' minutes expired)');
    reloadKOC();
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
     now = unixTime();
     //var text = '<FONT color=white><B>&nbsp;&nbsp;&nbsp;&nbsp;'+ getMyAlliance()[1] + ' (' + getServerId() +')</b></font>';
     var text = '';
     var Left = parseInt(t.NextRefresh - now);
     if ( Left < 0){
        Left = 0;
        t.doit();
     }
     if ( Left < 60) text += '<BR>&nbsp;&nbsp;&nbsp;&nbsp;<FONT color=white>'+translate("Next refresh in")+': </font><FONT color=red><B>'+ timestr(Left) +'</b></font></div>';
     else text += '<BR>&nbsp;&nbsp;&nbsp;&nbsp;<FONT color=white>'+translate("Next refresh in")+': <B>'+ timestr(Left) +'</b></font></div>';
    
     t.box.innerHTML = text;
     t.timer = setTimeout (t.Paint, 1000);
  },
}

/************************ Fairie Killer ************************/
var FairieKiller  = {
  saveFunc : null,
  init : function (tf){
    if (firefoxVersion.substring(0,4) == '4.0b')  // bug in firefox 4.0b10 causes syntax error with: "var func = eval ('function (){}');"
      return;
    FairieKiller.saveFunc = unsafeWindow.Modal.showModalUEP;
    FairieKiller.setEnable (tf);
  },
  setEnable : function (tf){
    if (tf)
      unsafeWindow.Modal.showModalUEP = eval ('function FairieKiller (a,b,c) {actionLog ("Blocked Faire popup");}');
    else
      unsafeWindow.Modal.showModalUEP = FairieKiller.saveFunc;
  },
}

/********** facebook watchdog: runs only in 'http://apps.facebook.com/kingdomsofcamelot/*' instance!  ******/
function facebookWatchdog (){
  var INTERVAL = 50000; // wait 50 seconds minute before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (watchdog, INTERVAL);
  
// TODO: actionLog ?  
  function watchdog (){
    try {
//      if (document.getElementById('app_content_130402594779').firstChild.firstChild.childNodes[1].firstChild.tagName!='IFRAME'){
      if (document.getElementById('app_content_130402594779') == null){
        logit ("KOC NOT FOUND!");
        KOCnotFound(5*60);
      }
    } catch (e){
      logit ("KOC NOT FOUND!");
      KOCnotFound(4*60);
    }
  }
}


function kocWatchdog (){
  var INTERVAL = 10000; // wait 30 seconds before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (watchdog, INTERVAL);
  function watchdog (){
logit ("KOC WATCHDOG: "+ document.getElementById('mod_maparea'));    
    if (document.getElementById('mod_maparea')==null){
      logit ("KOC not loaded");
      KOCnotFound(20);
    }     
  }
}


function KOCnotFound(secs){
  var div;
  var countdownTimer = null;
  var endSecs = (new Date().getTime()/1000) + secs;
    
  div = document.createElement('div');
  div.innerHTML = '<DIV style="font-size:18px; background-color:#a00; color:#fff"><CENTER><BR>'+translate("KOC Power Bot has detected that KOC is not loaded")+'<BR>'+translate("Refreshing in")+' <SPAN id=pbwdsecs></span><BR><INPUT id=pbwdcan type=submit value="'+translate("Cancel Refresh")+'"><BR><BR></div>';
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


var WideScreen = {
  chatIsRight : false,
  useWideMap : false,
  rail : null,
  
  init : function (){
    t = WideScreen;
    if (GlobalOptions.pbWideScreen){
      t.rail = searchDOM (document.getElementById('mod_maparea'), 'node.className=="maparea_rrail"', 10);
      GM_addStyle ('.modalCurtain {width:760px !important} .mod_comm_mmb{z-index:0 !important}');  
      try {
        document.getElementById('progressBar').parentNode.removeChild(document.getElementById('progressBar'));
        document.getElementById('crossPromoBarContainer').parentNode.removeChild(document.getElementById('crossPromoBarContainer'));
      } catch (e) {
      }
    }
  },
        
  setChatOnRight : function (tf){
    t = WideScreen;
    if (tf == t.chatIsRight || !GlobalOptions.pbWideScreen)
      return;
    if (tf){
      var chat = document.getElementById('kocmain_bottom').childNodes[1];
      if (!chat || chat.className!='mod_comm')
        setTimeout (function (){t.setChatOnRight(tf)}, 1000);
      chat.style.top = '-624px';
      chat.style.left = '760px';
      chat.style.height = '720px';
      chat.style.background = 'url("'+ CHAT_BG_IMAGE +'")';
      document.getElementById('mod_comm_list1').style.height = '580px';
      document.getElementById('mod_comm_list2').style.height = '580px';

    } else {
      var chat = document.getElementById('kocmain_bottom').childNodes[1];
      chat.style.top = '0px';
      chat.style.left = '0px';
      chat.style.height = '';
      chat.style.background = '';
      document.getElementById('mod_comm_list1').style.height = '287px';
      document.getElementById('mod_comm_list2').style.height = '287px';
    }
    t.chatIsRight = tf;
  },
  
  useWideMap : function (tf) {
      t = WideScreen;
      if (tf == t.useWideMap || !GlobalOptions.pbWideScreen)
          return;
      if (tf){
      t.rail.style.display = 'none';
      document.getElementById('mapwindow').style.height = "436px";
      document.getElementById('mapwindow').style.width = "1220px";
      document.getElementById('mapwindow').style.zIndex = "50";
      } else {
      t.rail.style.display = 'block';
      document.getElementById('mapwindow').style.height = "439px";
      document.getElementById('mapwindow').style.width = "760px";
      document.getElementById('mapwindow').style.zIndex = "";
      }
  },
}

function translate (str) {
    return str;    
}


/*******************   KOC Map interface ****************/
// 0:bog, 10:grassland, 11:lake, 20:woods, 30:hills, 40:mountain, 50:plain, 51:city / barb, 53:misted city
function CMapAjax (){
  this.normalize = normalize;  
  this.request = request;

  function request (left, top, width, notify){    
    var left = parseInt(left / 5) * 5;
    var top = parseInt(top / 5) * 5;
    var width = parseInt((width+4) / 5) * 5;
    
    var blockString = generateBlockList(left, top, width);
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.blocks = blockString;
    RPM++;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok) notify(left, top, width, rslt);
        	else actionlog('-------MAP SEARCH ERROR-------')
      },
      onFailure: function (rslt) {
        notify(left, top, width, rslt);
      }
    });
    function generateBlockList (left, top, width) {
      var width5 = parseInt(width / 5);
      var bl = [];
      for (x=0; x<width5; x++){
        var xx = left + (x*5);
        if (xx > 745)
          xx -= 750;
        for (y=0; y<width5; y++){
          var yy = top + (y*5);
          if (yy > 745)
            yy -= 750;
          bl.push ('bl_'+ xx +'_bt_'+ yy);
        }
      }
      return bl.join(",");
    }
  }
 
  function normalize  (x){
    if ( x >= 750)
      x -= 750;
    else if (x < 0)
      x += 750;
    return parseInt (x/5) * 5;
  }
}

var anticd = {
  isInited : false,
  KOCversion : '?',
  
  init: function (){
    if (this.isInited)
      return this.KOCversion;
    unsafeWindow.cm.cheatDetector.detect = eval ('function a (){}');
    var scripts = document.getElementsByTagName('script');
    for (var i=0; i<scripts.length; i++){
      if (scripts[i].src.indexOf('camelotmain') >=0){
        break;
      }
    }
    if (i<scripts.length){
      var m = scripts[i].src.match (/camelotmain-(.*).js/);  
      if (m)
        this.KOCversion = m[1];
    }
    this.isInited = true;
    // more coming soon :)
  },
  
  getKOCversion : function (){
    return this.KOCversion;
  },
}
try {
  anticd.init ();
} catch (e){
  logit ("ANTICD error: "+ e);
}

var tabManager = {
  tabList : {},           // {name, obj, div}
  currentTab : null,
  
  init : function (mainDiv){
    var t = tabManager;
    var sorter = [];
    for (k in Tabs){
      if (!Tabs[k].tabDisabled){  
        t.tabList[k] = {};
        t.tabList[k].name = k;
        t.tabList[k].obj = Tabs[k];
        if (Tabs[k].tabLabel != null)
          t.tabList[k].label = Tabs[k].tabLabel;
        else
          t.tabList[k].label = k;
        if (Tabs[k].tabOrder != null)
          sorter.push([Tabs[k].tabOrder, t.tabList[k]]);
        else
          sorter.push([1000, t.tabList[k]]);
        t.tabList[k].div = document.createElement('div');
      }
    }

    sorter.sort (function (a,b){return a[0]-b[0]});
    var m = '<TABLE cellspacing=2 width=98% class=pbMainTab><TR>';
    for (var i=0; i<sorter.length; i++) {
      m += '<TD class=spacer></td><TD align=center class=notSel id=pbtc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
      if ((i+1)%10 == 0) m+='</tr><TR>';
    }
    m+='</tr></table>';  
    mainPop.getMainTopDiv().innerHTML = m;
    
    for (k in t.tabList) {
      if (t.tabList[k].name == Options.currentTab)
        t.currentTab =t.tabList[k] ;
      document.getElementById('pbtc'+ k).addEventListener('click', this.e_clickedTab, false);
      var div = t.tabList[k].div;
      div.style.display = 'none';
      div.style.height = '100%';
      mainDiv.appendChild(div);
      try {
        t.tabList[k].obj.init(div);
      } catch (e){
        div.innerHTML = "INIT ERROR: "+ e;
      }
    }
    
    if (t.currentTab == null)
      t.currentTab = sorter[0][1];    
    t.setTabStyle (document.getElementById ('pbtc'+ t.currentTab.name), true);
    t.currentTab.div.style.display = 'block';
  },
  
  hideTab : function (){
    var t = tabManager;
    t.currentTab.obj.hide();
  },
  
  showTab : function (){
    var t = tabManager;
    t.currentTab.obj.show();
  },
    
  setTabStyle : function (e, selected){
    if (selected){
      e.className = 'sel';
    } else {
      e.className = 'notSel';
    }
  },
   
  e_clickedTab : function (e,id){
    var t = tabManager;
    if (id) var newTab = t.tabList[id];
     else var newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
    if (t.currentTab.name != newTab.name){
      t.setTabStyle (document.getElementById ('pbtc'+ t.currentTab.name), false);
      t.setTabStyle (document.getElementById ('pbtc'+ newTab.name), true);
      t.currentTab.obj.hide ();
      t.currentTab.div.style.display = 'none';
      t.currentTab = newTab;
      newTab.div.style.display = 'block';
      Options.currentTab = newTab.name;      
    }
    newTab.obj.show();
  },
}

function onUnload (){
  Options.pbWinPos = mainPop.getLocation();
  if (!ResetAll) saveOptions();
}

function mouseMainTab (me){   // right-click on main button resets window location
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
  }
}

function eventHideShow (){
  if (mainPop.toggleHide(mainPop)){
    tabManager.showTab();
    Options.pbWinIsOpen = true;
  } else {
    tabManager.hideTab();
    Options.pbWinIsOpen = false;
  }
  saveOptions();
}

function hideMe (){
  mainPop.show (false);
  tabManager.hideTab();
  Options.pbWinIsOpen = false;
  saveOptions();
}

function showMe (){
  mainPop.show (true);
  tabManager.showTab();
  Options.pbWinIsOpen = true;
  saveOptions();
}

function addMyFunction (func){      // add function to run in our own scope
  unsafeWindow[func.name] = func;
}

function addUwFunction (func){      // add function to run in unsafeWindow's scope
  var scr = document.createElement('script');
    scr.innerHTML = func.toString();
    document.body.appendChild(scr);
}

function alterUwFunction (funcName, frArray){
  try {
    funcText = unsafeWindow[funcName].toString();
    rt = funcText.replace ('function '+funcName, 'function');
    for (i=0; i<frArray.length; i++){
      x = rt.replace(frArray[i][0], frArray[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    js = funcName +' = '+ rt;
      var scr=document.createElement('script');
      scr.innerHTML=js;
      document.body.appendChild(scr);
      return true;
  } catch (err) {
    return false;
  }
}

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

var knightRoles = {
  Foreman : 'politics',
  Marshall : 'combat',
  Alchemystic : 'intelligence',
  Steward : 'resourcefulness',
};

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

var fortNamesShort = {
  53: "Crossbows",
  55: "Trebuchet",
  60: "Trap",
  61: "Caltrops",
  62: "Spiked Barrier",
}

// onClick (city{name, id, x, y}, x, y)   city may be null!
function CdispCityPicker (id, span, dispName, notify, selbut, disable_list){
  function CcityButHandler (t){
    var that = t;
    this.clickedCityBut = clickedCityBut;
    function clickedCityBut (e){
      if (that.selected != null)
        that.selected.className = "castleBut castleButNon";
      that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
      if (that.dispName)
        document.getElementById(that.id+'cname').innerHTML = that.city.name;
      e.target.className = "castleBut castleButSel";
      that.selected = e.target;
      if (that.coordBoxX){
        that.coordBoxX.value = that.city.x;
        that.coordBoxY.value = that.city.y;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent('change', true, true ); // event type,bubbling,cancelable
        that.coordBoxX.dispatchEvent(evt);
        that.coordBoxY.dispatchEvent(evt);
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
      }
      if (that.notify != null)
        that.notify(that.city, that.city.x, that.city.y);
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
        eX.value = that.city.x;
        eY.value = that.city.y;
      }
      function eventChange (){
        var xValue=that.coordBoxX.value.trim();
            var xI=/^\s*([0-9]+)[\s|,|-|.]+([0-9]+)/.exec(xValue);                 
            if(xI) {
                that.coordBoxX.value=xI[1]
                that.coordBoxY.value=xI[2]
            }
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
      return false;
    }
    this.coordBoxX = eX;
    this.coordBoxY = eY;
    var bh = new CboxHandler(this);
    eX.maxLength=8;
    eY.maxLength=3;
    eX.style.width='2em';    
    eY.style.width='2em';    
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
  for (var i=0; i<Cities.cities.length; i++){
    if(matTypeof(disable_list) == 'array'){
        if(disable_list[i])
            m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit DISABLED \>';
        else
            m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \>';
    } else
        m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \>';
  }
  if (dispName)
    m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
  span.innerHTML = m;
  var handler = new CcityButHandler(this);
  for (var i=0; i<Cities.cities.length; i++)
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
  if (selbut != null)
    this.selectBut(selbut);
};

function setCities(){
  Cities.numCities = Seed.cities.length;
  Cities.cities = [];
  Cities.byID = {};
  for (i=0; i<Cities.numCities; i++){
    city = {};
    city.idx = i;
    city.id = parseInt(Seed.cities[i][0]);
    city.name = Seed.cities[i][1];
    city.x = parseInt(Seed.cities[i][2]);
    city.y = parseInt(Seed.cities[i][3]);
    city.tileId = parseInt(Seed.cities[i][5]);
    city.provId = parseInt(Seed.cities[i][4]);
    getTroopDefTrainEstimates('city'+ city.id, city);
    Cities.cities[i] = city;
    Cities.byID[Seed.cities[i][0]] = city;
  }
}

function getTroopDefTrainEstimates (cityID, city){
    var b = Seed.buildings[cityID];
    city.numCottages = 0;
    city.numBarracks = 0;
    city.maxBarracks = 0;
    city.totLevelsBarracks = 0;
    city.blacksmithLevel = 0;
    city.stableLevel = 0;
    city.workshopLevel = 0;
    city.wallLevel = 0;
    city.feyLevel = 0;
    for (var j=1; j<33; j++){
        if (b['pos'+j]) {
            var bname = parseInt(b['pos'+j][0]);
            var blvl = parseInt(b['pos'+j][1]);
            switch(bname){
                case 13:
                    city.numBarracks++;
                    city.totLevelsBarracks += parseInt(blvl);
                    if (blvl>city.maxBarracks) city.maxBarracks=blvl;
                    break;
                case 5:
                    city.numCottages++;
                    break;
                case 15:
                    city.blacksmithLevel = blvl;
                    break;
                case 16:
                    city.workshopLevel = blvl;
                    break;
                case 17:
                    city.stableLevel = blvl;
                    break;
                case 19:
                    city.wallLevel = blvl;
                    break;
                case 20:
                    city.feyLevel = blvl;
                    break;
            }
        }
    }

    var now = unixTime();
    city.marshallCombatScore = 0;
    var s = Seed.knights[cityID];
    if (s) {
        s = s["knt" + Seed.leaders[cityID].combatKnightId];
        if (s){
            city.marshallCombatScore = s.combat;
            if (s.combatBoostExpireUnixtime > now)
                city.marshallCombatScore *= 1.25;
        }
    }
    city.foremanBasePoliticsScore = 0;
    var s = Seed.knights[cityID];
    if (s) {
        s = s["knt" + Seed.leaders[cityID].politicsKnightId];
        if (s){
            city.foremanBasePoliticsScore = s.politics;
            if (s.politicsBoostExpireUnixtime > now)
                city.foremanBasePoliticsScore *= 1.25;
        }
    }

    city.loggingLevel = parseInt(Seed.tech["tch2"]);
    city.geometryLevel = parseInt(Seed.tech["tch5"]);
    city.eagleEyesLevel = parseInt(Seed.tech["tch6"]);
    city.poisonedEdgeLevel = parseInt(Seed.tech["tch8"]);
    city.metalAlloysLevel = parseInt(Seed.tech["tch9"]);
    city.featherweightPowderLevel = parseInt(Seed.tech["tch10"]);
    city.alloyHorseshoesLevel = parseInt(Seed.tech["tch12"]);
    city.fletchingLevel = parseInt(Seed.tech["tch13"]);
    city.giantsStrengthLevel = parseInt(Seed.tech["tch16"]);

    var bm = city.numBarracks + 0.1 * (city.totLevelsBarracks - city.numBarracks);
    var mf = city.marshallCombatScore / 200;
    var gf = city.geometryLevel / 10;
    var sf = city.stableLevel / 10;
    var wf = city.workshopLevel / 10;
    var isf = bm * (1 + mf + gf);
    var csf = bm * (1 + mf + gf + sf);
    var ssf = bm * (1 + mf + gf + sf + wf);
    var pf = city.foremanBasePoliticsScore / 200;
    var gsf = city.giantsStrengthLevel / 10;
    var dsf = 1 + pf + gsf;

    
    city.Troop1Time = ((city.maxBarracks > 0)?(50/isf):0);
    city.Troop2Time = city.Troop1Time/2;
    city.Troop3Time = ((city.maxBarracks > 1 && city.eagleEyesLevel > 0)?(100/isf):0);
    city.Troop4Time = ((city.maxBarracks > 1 && city.poisonedEdgeLevel > 0)?(150/isf):0);
    city.Troop5Time = ((city.maxBarracks > 2 && city.blacksmithLevel > 0 && city.metalAlloysLevel > 0)?(225/isf):0);
    city.Troop6Time = ((city.maxBarracks > 3 && city.fletchingLevel > 0)?(350/isf):0);
    city.Troop7Time = ((city.maxBarracks > 4 && city.stableLevel > 0 && city.alloyHorseshoesLevel > 0)?(500/csf):0);
    city.Troop8Time = ((city.maxBarracks > 6 && city.blacksmithLevel > 4 && city.stableLevel > 4 && city.alloyHorseshoesLevel > 4)?(1500/csf):0);
    city.Troop9Time = ((city.maxBarracks > 5 && city.stableLevel > 0 && city.workshopLevel > 2 && city.featherweightPowderLevel > 0)?(1000/ssf):0);
    city.Troop10Time = ((city.maxBarracks > 7 && city.stableLevel > 1 && city.workshopLevel > 4 && city.geometryLevel > 4 && city.fletchingLevel > 5)?(3000/ssf):0);
    city.Troop11Time = ((city.maxBarracks > 8 && city.blacksmithLevel > 4 && city.stableLevel > 2 && city.workshopLevel > 6 && city.metalAlloysLevel > 7 && city.geometryLevel > 6)?(4500/ssf):0);
    city.Troop12Time = ((city.maxBarracks > 9 && city.stableLevel > 1 && city.workshopLevel > 8 && city.geometryLevel > 9 && city.fletchingLevel > 9)?(6000/ssf):0);
    city.Def53Time = ((city.wallLevel > 5 && city.blacksmithLevel > 5 && city.fletchingLevel > 4)?(180/dsf):0);
    city.Def55Time = ((city.wallLevel > 7 && city.blacksmithLevel > 7 && city.fletchingLevel > 6 && city.geometryLevel > 6)?(135/dsf):0);
    city.Def60Time = ((city.wallLevel > 3 && city.blacksmithLevel > 3 && city.poisonedEdgeLevel > 1)?(90/dsf):0);
    city.Def61Time = ((city.wallLevel > 0 && city.metalAlloysLevel > 0)?(30/dsf):0);
    city.Def62Time = ((city.wallLevel > 1 && city.blacksmithLevel > 1 && city.loggingLevel > 1)?(60/dsf):0);
}


function dialogRetry (errMsg, seconds, onRetry, onCancel, errCode){
  seconds = parseInt(seconds);
  var pop = new pbPopup ('pbretry', 0, 0, 400,225, true);
  pop.centerMe(mainPop.getMainDiv());
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>An error has ocurred:</b></font><BR><BR><DIV id=paretryErrMsg></div>\
      <BR><BR><B>Automatically retrying in <SPAN id=paretrySeconds></b></span> seconds ...<BR><BR><INPUT id=paretryCancel type=submit value="CANCEL Retry" \>';
  document.getElementById('paretryCancel').addEventListener ('click', doCancel, false);
  pop.show(true);
  
  if(errCode && unsafeWindow.g_js_strings.errorcode['err_'+errCode])
    document.getElementById('paretryErrMsg').innerHTML = unsafeWindow.g_js_strings.errorcode['err_'+errCode];
  else
    document.getElementById('paretryErrMsg').innerHTML = errMsg;
  document.getElementById('paretrySeconds').innerHTML = seconds;
  var rTimer = setTimeout (doRetry, seconds*1000);
  countdown ();

  function countdown (){
    document.getElementById('paretrySeconds').innerHTML = seconds--;
    if (seconds > 0)
      cdTimer = setTimeout (countdown, 1000);
  }
  function doCancel(){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    pop.destroy();
    onCancel ();
  }
  function doRetry (){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    pop.show(false);
    onRetry();
  }
}

function implodeUrlArgs (obj){
  var a = [];
  for (var k in obj)
    a.push (k +'='+ encodeURI(obj[k]) );
  return a.join ('&');    
}

// NOTE: args can be either a string which will be appended as is to url or an object of name->values
function addUrlArgs (url, args){
  if (!args)
    return url;
  if (url.indexOf('?') < 0)
    url += '?';
  else if (url.substr(url.length-1) != '&')
    url += '&';    
  if (matTypeof(args == 'object'))
    return url + implodeUrlArgs (args);    
  return url + args;
}

// emulate protoype's Ajax.Request ...
function AjaxRequest (url, opts){
  var headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Prototype-Version': '1.6.1',
    'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
  };
  var ajax = null;
  
  if (window.XMLHttpRequest)
    ajax=new XMLHttpRequest();
  else
    ajax=new ActiveXObject("Microsoft.XMLHTTP");
  
  if (opts.method==null || opts.method=='')
    method = 'GET';
  else
    method = opts.method.toUpperCase();  
    
  if (method == 'POST'){
    headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  } else if (method == 'GET'){
    addUrlArgs (url, opts.parameters);
  }

  ajax.onreadystatechange = function(){
//  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
    if (ajax.readyState==4) {
     if (ajax.status == 500)
        if (opts.onFailure) opts.onFailure(ajax);
      if (ajax.status >= 200 && ajax.status < 305)
        if (opts.onSuccess) opts.onSuccess(ajax);
      else
        if (opts.onFailure) opts.onFailure(ajax);
      
      Options.ResponseSize += parseInt(ajax.getResponseHeader ("Content-Length"));
    } else {
      if (opts.onChange) opts.onChange (ajax);
    }  
  }  
    
  ajax.open(method, url, true);   // always async!


  for (var k in headers)
    ajax.setRequestHeader (k, headers[k]);
  if (matTypeof(opts.requestHeaders)=='object')
    for (var k in opts.requestHeaders)
      ajax.setRequestHeader (k, opts.requestHeaders[k]);
      
  
  if (method == 'POST'){
    var a = [];
    for (k in opts.parameters){
      if(matTypeof(opts.parameters[k]) == 'object')
        for(var h in opts.parameters[k])
            a.push (k+'['+h+'] ='+ opts.parameters[k][h] );
      else
        a.push (k +'='+ opts.parameters[k] );
    }
    ajax.send (a.join ('&'));
  } else               {
    ajax.send();
  }
}   


function MyAjaxRequest (url, o, noRetryX){
if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  var opts = unsafeWindow.Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 3;
  var show = true;
  var noRetry = noRetry===true?true:false;
  var silentTimer;
  opts.onSuccess = mySuccess;
  opts.onFailure = myFailure;

  new AjaxRequest(url, opts);
  return;

  function myRetry(){
    ++retry;
    RPM++;
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
    var rslt;
    try {
        rslt = JSON2.parse(msg.responseText);
    } catch(e) {
        if (retry<5) {
            rslt = {"ok":false,"error_code":9,"errorMsg":"Failed due to invalid json"}
        } else {
            rslt = {"ok":true,"error_code":9,"data":[]};
        }
    }
    var x;
    if (window.EmulateAjaxError){
      rslt.ok = false;  
      rslt.error_code=8;
    }
    if (rslt.ok){
      if (rslt.updateSeed)
        unsafeWindow.update_seed(rslt.updateSeed);
      wasSuccess (rslt);
      return;
    }
    rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    if (!noRetry && (rslt.error_code==0 || rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      dialogRetry (inspect(rslt.errorMsg), delay, function(){myRetry()}, function(){wasSuccess (rslt)}, rslt.error_code);
    } else if (!noRetry && rslt.error_code==9) {
        silentTimer = setTimeout(silentRetry, delay*100);
    } else {
      wasSuccess (rslt);
    }
  }
  
  function silentRetry() {
    clearTimeout(silentTimer);
    myRetry();
  }
}

// returns: 'neutral', 'friendly', or 'hostile'
function getDiplomacy (aid) {
  if(aid < 1 || aid == null)
    return 'unallianced';
  if (Seed.allianceDiplomacies == null)
    return 'neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'hostile';
  if(getMyAlliance()[0] == aid)
    return 'ally';
  return 'neutral';
};

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

function logit (msg){
  var now = new Date();
  GM_log (getServerId() +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}
function saveLayoutOptions (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('LayoutOptions_'+serverID,JSON2.stringify(layoutOptions));},0);
}

function saveOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('Options_'+serverID, JSON2.stringify(Options));}, 0);
}

function saveDashboardOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('DashboardOptions_'+serverID, JSON2.stringify(DashboardOptions));}, 0);
}

function saveTrainOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('TrainOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(TrainOptions));}, 0);
}

function saveCrestOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('CrestOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(CrestOptions));}, 0);
}


function saveApothecaryOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('ApothecaryOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(ApothecaryOptions));}, 0);
}

function saveMarchOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('MarchOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(MarchOptions));}, 0);
}

function saveAtkOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('AtkOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(AtkOptions));}, 0);
}

function saveDFOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('DFOptions' + Seed.player['name'] + '_' +serverID, JSON2.stringify(DFOptions));}, 0);
}


function readLayoutOptions (){
    var serverID = getServerId();
     s = GM_getValue ('LayoutOptions_'+serverID, '[]');
      if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
              if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                      layoutOptions[k][kk] = opts[k][kk];
    else
        layoutOptions[k] = opts[k];
    }
  }
}

function readOptions (){
  var serverID = getServerId();
  s = GM_getValue ('Options_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          Options[k][kk] = opts[k][kk];
      else
        Options[k] = opts[k];
    }
  }
}
function readDashboardOptions (){
  var serverID = getServerId();
  s = GM_getValue ('DashboardOptions_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          DashboardOptions[k][kk] = opts[k][kk];
      else
        DashboardOptions[k] = opts[k];
    }
  }
}
function readGlobalOptions (){
  GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));
}

function readApothecaryOptions (){
  var serverID = getServerId();
  s = GM_getValue ('ApothecaryOptions_'+Seed.player['name']+'_'+serverID, '[]');
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          ApothecaryOptions[k][kk] = opts[k][kk];
      else
        ApothecaryOptions[k] = opts[k];
    }
  }
}

function readDFOptions (){
  var serverID = getServerId();
  s = GM_getValue ('DFOptions'+Seed.player['name']+'_'+serverID, '[]');
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object') for (kk in opts[k]) DFOptions[k][kk] = opts[k][kk];
      else if (DFOptions[k] != undefined) DFOptions[k] = opts[k];
    }
  }
}

function readCrestOptions (){
  var serverID = getServerId();
  s = GM_getValue ('CrestOptions_' + Seed.player['name'] + '_' +serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          CrestOptions[k][kk] = opts[k][kk];
      else
        CrestOptions[k] = opts[k];
    }
  }
}


function readTrainingOptions (){
  var serverID = getServerId();
  s = GM_getValue ('TrainOptions_' + Seed.player['name'] + '_' +serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object') {
      	for (kk in opts[k]) if (TrainOptions[k] != undefined) TrainOptions[k][kk] = opts[k][kk];
      } else if (TrainOptions[k] != undefined) TrainOptions[k] = opts[k];   	
    }
  }
}

function readMarchOptions (){
  var serverID = getServerId();
  s = GM_getValue ('MarchOptions_' + Seed.player['name'] + '_' +serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
            if (matTypeof(opts[k][kk]) == 'object')
                for (kkk in opts[k][kk])
                  MarchOptions_[k][kk][kkk] = opts[k][kk][kkk];
            else
                MarchOptions[k][kk] = opts[k][kk];
      else
        MarchOptions[k] = opts[k];
    }
  }
}


function readAtkOptions (){
  var serverID = getServerId();
  s = GM_getValue ('AtkOptions_' + Seed.player['name'] + '_' +serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
            if (matTypeof(opts[k][kk]) == 'object')
                for (kkk in opts[k][kk])
                  AtkOptions_[k][kk][kkk] = opts[k][kk][kkk];
            else
                AtkOptions[k][kk] = opts[k][kk];
      else
        AtkOptions[k] = opts[k];
    }
  }
}


function createButton (label,id){
  var a=document.createElement('a');
  a.className='button20';
  a.id = id;
  a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
  return a;
}


function AddMainTabLink(text, eventListener, mouseListener) {
  var a = createButton (text,'botbutton');
  a.className='tab';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if (tabs) {
    var e = tabs.parentNode;
    var gmTabs = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
        gmTabs = ee;
        break;
      }
    }
    if (gmTabs == null){
      gmTabs = document.createElement('div');
      gmTabs.className='tabs_engagement';
      gmTabs.style.background='#ca5';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
      gmTabs.lang = 'en_PB';
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
    return a;
  }
  return null;
}

function AddSubTabLink(text, eventListener, id) {
  var a = createButton (text,'botbutton');
  a.className='tab';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if (tabs) {
    var e = tabs.parentNode;
    var gmTabs = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
        gmTabs = ee;
        break;
      }
    }
    if (gmTabs == null){
      gmTabs = document.createElement('div');
      gmTabs.className='tabs_engagement';
      gmTabs.style.background='#ca5';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
      gmTabs.lang = 'en_PB';
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (id != null)
      a.id = id;
    return a;
  }
  return null;
}

function coordLink (x, y){
  var m = [];
  m.push ('(<a onclick="pbGotoMap (');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('); return false">');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('</a>)');  
  return m.join('');
}


unsafeWindow.pbGotoMap = function (x, y){
  setTimeout (function (){
    document.getElementById('mapXCoor').value = x;
    document.getElementById('mapYCoor').value = y;
    unsafeWindow.reCenterMapWithCoor();
    var a = document.getElementById("mod_views").getElementsByTagName("a");
    for (var b = 0; b < a.length; b++) {
        a[b].className = ""
    }
    document.getElementById('mod_views_map').className = "sel";
    document.getElementById("maparea_city").style.display = 'none';
    document.getElementById("maparea_fields").style.display = 'none';
    document.getElementById("maparea_map").style.display = 'block';
    unsafeWindow.tutorialClear()
  }, 0);
};

/****************************  Spam Tab  ******************************/
Tabs.Spam = {
  tabOrder : 611,                    // order to place tab in top bar
  tabLabel : 'Spam',            // label to show in main window tabs
  myDiv : null,
  timer : null,  
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.Spam;
    t.myDiv = div;
    var m = '<DIV class=pbStat>Advertise</div><TABLE class=pbTab width=100% height=0% ><TR align="center">';

       if (Options.spamconfig.aspam == true) {
        m += '<TD><INPUT id=pbSpamEnable type=submit value="Spam On"></td>';
       }
       else {
        m += '<TD><INPUT id=pbSpamEnable type=submit value="Spam Off"></td>';
       }

       if (Options.spamconfig.spamstate == 'a') {
        m += '<TD><INPUT id=pbSpamState type=submit value="Send To Alliance"></td>';
       }
       else {
        m += '<TD><INPUT id=pbSpamState type=submit value="Send To  Global "></td>';
       }
        m += '</tr></table></div>';
       m += '<DIV class=pbStat>Settings</div><TABLE class=pbTab>';
        m += '<tr><td>Automatically post every <INPUT id=pbSpamMin type=text size=2 maxlength=3 value="'+ Options.spamconfig.spammins +'"  \> minutes</td></tr><BR>\
              <tr><TD><TABLE cellpadding=0 cellspacing=0>\
              <TD align=left>Your spam: &nbsp; </td><TD><INPUT id=pbSpamAd type=text size=60 maxlength=500 value="'+ Options.spamconfig.spamvert +'" \></td></tr>\
              </table><BR>';
    
    t.myDiv.innerHTML = m;

    document.getElementById('pbSpamEnable').addEventListener ('click', function(){t.toggleon(this);}, false);
    document.getElementById('pbSpamAd').addEventListener ('change', t.e_spamOptChanged, false);
    document.getElementById('pbSpamMin').addEventListener ('change', t.e_spamOptChanged, false);
    document.getElementById('pbSpamState').addEventListener ('click', function(){t.togglespam(this);}, false);
 },

  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.Spam;
  },
  
  show : function (){         // called whenever this tab is shown
    var t = Tabs.Spam;

  },

 e_spamOptChanged : function (){
  var t = Tabs.Spam;
  Options.spamconfig.spamvert = document.getElementById('pbSpamAd').value;
  Options.spamconfig.spammins = document.getElementById('pbSpamMin').value;
  if(parseInt(Options.spamconfig.spammins) < 30){
   Options.spamconfig.spammins = 30;
   document.getElementById('pbSpamMin').value = 30;
  }
  saveOptions ();
 },

 togglespam: function(obj){
  var t = Tabs.Spam;
  if (Options.spamconfig.spamstate == 'a') {
   Options.spamconfig.spamstate = 'g';
   obj.value = "Send To  Global ";
  }
  else {
   Options.spamconfig.spamstate = 'a';
   obj.value = "Send To Alliance";
  }
  saveOptions ();

 },

 toggleon: function(obj){
  var t = Tabs.Spam;
  if (Options.spamconfig.aspam == true) {
   Options.spamconfig.aspam = false;
   obj.value = "Spam Off";
  }
  else {
   Options.spamconfig.aspam = true;
   obj.value = "Spam On";
   SpamEvery.init();
  }
  saveOptions ();

 },
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
   if(parseInt(t.spamtimer) < 60) t.spamtimer = 60;
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
    actionLog ('Spamming ('+ Options.spamconfig.spammins +' minutes expired)');
    sendChat ("/" + Options.spamconfig.spamstate + " " +  Options.spamconfig.spamvert);
    SpamEvery.init ();
  }
}

/************** ChatPane **********/
var ChatPane = {
  init : function(){
    var t = ChatPane;
  },
  
  HandleChatPane : function() {
    var DisplayName = GetDisplayName();
    var AllianceChatBox=document.getElementById('mod_comm_list2');
    
    if(AllianceChatBox){
        var chatPosts = document.evaluate(".//div[contains(@class,'chatwrap')]", AllianceChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
        if(chatPosts){
            for (var i = 0; i < chatPosts.snapshotLength; i++) {
                thisPost = chatPosts.snapshotItem(i);
                if(Options.HelpRequest){
                    var postAuthor = document.evaluate('.//*[@class="nm"]', thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
                    if(postAuthor.snapshotItem(0)){
                        var postAuthorName = postAuthor.snapshotItem(0).innerHTML;
                        if(postAuthorName != DisplayName){
                            var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );  
                            if(helpAllianceLinks){
                                for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
                                    thisLink = helpAllianceLinks.snapshotItem(j);
                                    var alreadyClicked = thisLink.getAttribute("clicked");
                                    if(!alreadyClicked){
                                        thisLink.setAttribute('clicked', 'true');
                                        var myregexp = /(claimAllianceChatHelp\(.*\);)/;
                                        var match = myregexp.exec(thisLink.getAttribute("onclick"));
                                        
                                        if (match != null) {
                                            onclickCode = match[0];
                                            if(true){
                                            	RPM++
                                                DoUnsafeWindow(onclickCode);
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
                    var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
                    if(helpAllianceLinks){
                        for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
                            thisLink = helpAllianceLinks.snapshotItem(j);
                            thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
                        }
                    }
                // Hide alliance reports in chat
                    var myregexp1 = /You are # [0-9]+ of [0-9]+ to help/i;
                    var myregexp2 = /\'s Kingdom does not need help\./i;
                    var myregexp3 = /\'s project has already been completed\./i;
                    var myregexp4 = /\'s project has received the maximum amount of help\./i;
                    var myregexp5 = /You already helped with (.*?)\'s project\./i;
                    if (thisPost.innerHTML.match(myregexp1) || thisPost.innerHTML.match(myregexp2) || thisPost.innerHTML.match(myregexp3) || thisPost.innerHTML.match(myregexp4) || thisPost.innerHTML.match(myregexp5)) {
                        thisPost.parentNode.removeChild(thisPost);
                    }
                }
            }    
        }    
    }
  },

}

/**********************************************************************************/
var CalterUwFunc = function (funcName, findReplace) {
  var t = this;
  this.isEnabled = false;
  this.isAvailable = isAvailable;
  this.setEnable = setEnable;
  this.funcName = funcName;
  this.funcOld = unsafeWindow[funcName];  
  this.funcNew = null;
  try {
    var funcText = unsafeWindow[funcName].toString();
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
        unsafeWindow[t.funcName] = t.funcOld;
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

var CalterUwVar = function (funcName, findReplace) {
  var t = this;
  this.isEnabled = false;
  this.isAvailable = isAvailable;
  this.setEnable = setEnable;
  this.funcName = funcName;
  this.funcOld = unsafeWindow[funcName];  
  this.funcNew = null;
  try {
    var funcText = null;
    funcName = funcName.split('.');
    funcText = unsafeWindow[funcName[0]];
    for(var i=1; i<funcName.length; i++)
        funcText = funcText[funcName[i]];

    var rt = funcText.toString();
    for (var i=0; i<findReplace.length; i++){
      x = rt.replace(findReplace[i][0], findReplace[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    this.funcNew = rt;
  } catch (err) {
    GM_log(err);
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
        unsafeWindow[t.funcName] = t.funcOld;
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

function getMarchInfo (cityID){
  var ret = {};

  ret.marchUnits = [];
  ret.returnUnits = [];
  ret.resources = [];
  for (i=0; i<13; i++){
    ret.marchUnits[i] = 0;
    ret.returnUnits[i] = 0;
  }
  for (i=0; i<5; i++){
    ret.resources[i] = 0;
  }
  
  for (k in Seed.queue_atkp[cityID]){   // each march
      march = Seed.queue_atkp[cityID][k];
      if(march.marchType != 5){
          if (typeof (march) == 'object'){
            for (ii=0; ii<13; ii++){
              ret.marchUnits[ii] += parseInt (march['unit'+ ii +'Count']);
              ret.returnUnits[ii] += parseInt (march['unit'+ ii +'Return']);
            }
            for (ii=1; ii<5; ii++){
              ret.resources[ii] += parseInt (march['resource'+ ii]);
            }
              ret.resources[0] += parseInt (march['gold']);
          }
      }
    }
  return ret;
}

function makeButton20 (label){
  var a = document.createElement('a');
  a.className = "button20 ptButton20";
  var s = document.createElement('span');
  s.innerHTML = label;
  a.appendChild (s);
  return a;
}

function strButton20 (label, tags){
  if (tags == null)
    tags = '';
  return ('<TABLE class=ptNoPad><TR><TD><A class="button20 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a></td></tr></table>' );
}

function reloadKOC (){
  var serverId = getServerId();
  if(serverId == '??') window.location.reload(true);
  var goto = window.location.protocol+'//apps.facebook.com/kingdomsofcamelot/?s='+serverId;
  if(document.URL.match(/standalone=1/i)){
    goto = window.location.protocol+'//www.kabam.com/kingdoms-of-camelot/play?s='+serverId;
  }
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxpbButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ serverId +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxpbButReload').click();}, 0);
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

function cityStatusString (cs){
  if (cs==4)
    return 'Vacation';
  if (cs==3)
    return 'Truce';
  if (cs==2)
    return 'Beg Protection';
  return 'Normal';
}    

// Simple method, as if it were typed in thru DOM
function sendChat (msg){
  document.getElementById ("mod_comm_input").value = msg;
  unsafeWindow.Chat.sendChat ();
}

// works well, but message is not echoed back to local client
Chat = {
  params : null,

  sendWhisper : function (msg, who, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 3;
    this.params.name = who;
    this._sendit (msg, notify);
  },

  sendGlobal : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 1;
    this._sendit (msg, notify);
  },

  sendAlliance : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 2;
    this._sendit (msg, notify);
  },

  _sendit : function (msg, notify){
    function strip(s) {
       return s.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    this.params.comment = strip (msg);
    RPM++;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/sendChat.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: this.params,
      onSuccess: function(transport) {
        if (notify)
          notify ();
      },
      onFailure: function(transport) {
        if (notify)
          notify ();
      }
    });
  },
}



/************  LIB classes/functions .... **************/

DebugTimer = {
  startTime : 0,
  start : function (){
    now = new Date();
    DebugTimer.startTime = now.getTime();
  },
  getMillis : function (){
    now = new Date();
    return now.getTime() - DebugTimer.startTime;
  },
  display : function (label, noReset){
    now = new Date();
    elapsed = now.getTime() - DebugTimer.startTime;
    logit (label +": "+ elapsed/1000);
    if (noReset===null || !noReset)
      DebugTimer.startTime = now.getTime();
  },
};


function debugPos  (e){
  return '['+ e.tagName +'] client - offset: '+ e.clientLeft +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight
          +' - '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--> '+ e.offsetParent;
}

function CwaitForElement (id, timeout, notify){
  this.check = check;
  this.end = new Date().getTime() + timeout;
  var t = this;
  this.check();
  function check(){
    if (document.getElementById (id))
      notify (true);
    else if (new Date().getTime() > t.end)
      notify (false);
    else
      setTimeout (t.check, 500);
  }
}

function clickWin (win,obj,evtName) {
    var evt = win.document.createEvent("MouseEvents");
    evt.initMouseEvent(evtName, true, true, win, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    return !obj.dispatchEvent(evt);
}
    
function debugElement  (e){
  var x = unsafeWindow.Object.clone (e.wrappedJSObject);
  x.innerHTML = '';
  x.innerText = '';
  x.textContent = '';
  return inspect (x, 1, 1);
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

function DOMtree (e, levels){
  var m = [];
  level (e, levels, 0);
  
  function level (e, levels, cur){
    try {        
      for (var i=0; i<cur; i++)
        m.push('  ');
      if (!e.tagName)
        m.push ('?');
      else
        m.push (e.tagName);
      if (e.id){
        m.push (' id=');
        m.push (e.id);
      }
      if (e.name){
        m.push (' name=');
        m.push (e.name);
      }
      if (e.className){
        m.push (' class=');
        m.push (e.className);
      }
      if (e.style && e.style.display && e.style.display.indexOf('none')>0)
        m.push (' hidden');
       m.push ('\n');
      if (cur < levels){
        for (var c=0; c<e.childNodes.length; c++){
          level (e.childNodes[c], levels, cur+1);
        }
      }
    } catch (e) {
      m.push ('UNAVAILBLE!\n');
    }
  }
  return m.join('');  
}

function parseIntNan (n){
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x;
}
function parseIntCommas (n){
  n = n.split(',');
  n = n.join('');
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x;
}
function parseIntZero (n){
  n = n.trim();
  if (n == '')
    return 0;
  return parseInt(n, 10);
}
function isNaNCommas (n){
  n = n.split(',');
  n = n.join('');
  return isNaN(n);
}


function getFirefoxVersion (){
  var ver='', i;
  var ua = navigator.userAgent;  
  if (ua==null || (i = ua.indexOf('Firefox/'))<0)
    return;
  return ua.substr(i+8);
}

var WinManager = {
  wins : {},    // prefix : pbPopup obj
  didHide : [],
  
  
  get : function (prefix){
    var t = WinManager;
    return t.wins[prefix];
  },
  
  add : function (prefix, pop){
    var t = WinManager;
    t.wins[prefix] = pop;
    if (unsafeWindow.cpopupWins == null)
      unsafeWindow.cpopupWins = {};
    unsafeWindow.cpopupWins[prefix] = pop;
  },
  
  hideAll : function (){
    var t = WinManager;
    t.didHide = [];
    for (k in t.wins){
      if (t.wins[k].isShown()){
        t.didHide.push (t.wins[k]);
        t.wins[k].show (false);
      }
    }
  },
  restoreAll : function (){
    var t = WinManager;
    for (var i=0; i<t.didHide.length; i++)
      t.didHide[i].show (true);
  },
  
  delete : function (prefix){
    var t = WinManager;
    delete t.wins[prefix];
    delete unsafeWindow.cpopupWins[prefix];
  }    
}


// creates a 'popup' div
// prefix must be a unique (short) name for the popup window
function pbPopup (prefix, x, y, width, height, enableDrag, onClose) {
  var pop = WinManager.get(prefix);
  if (pop){
    pop.show (false);
    return pop;
  }
  this.BASE_ZINDEX = 111111;
    
  // protos ...
  this.show = show;
  this.toggleHide = toggleHide;
  this.getTopDiv = getTopDiv;
  this.getMainTopDiv = getMainTopDiv;
  this.getMainDiv = getMainDiv;
  this.getLayer = getLayer;
  this.setLayer = setLayer;
  this.setEnableDrag = setEnableDrag;
  this.getLocation = getLocation;
  this.setLocation = setLocation;
  this.focusMe = focusMe;
  this.isShown = isShown;
  this.unfocusMe = unfocusMe;
  this.centerMe = centerMe;
  this.destroy = destroy;
  this.autoHeight = autoHeight;

  // object vars ...
  this.div = document.createElement('div');
  this.prefix = prefix;
  this.onClose = onClose;
  
  var t = this;
  this.div.className = 'pbPopup '+ prefix +'_pbPopup';
  this.div.id = prefix +'_outer';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.maxHeight = height + 'px';
  this.div.style.overflowY = 'show';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  
  if (pbPopUpTopClass==null)
    topClass = 'pbPopupTop '+ prefix +'_pbPopupTop';
  else
    topClass = pbPopUpTopClass +' '+ prefix +'_'+ pbPopUpTopClass;
    
  var m = '<TABLE cellspacing=0 width=100% ><TR id="'+ prefix +'_bar" class="'+ topClass +'"><TD width=99% valign=bottom><SPAN id="'+ prefix +'_top"></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px; -moz-border-radius-topright: 20px;">x</td></tr>\
      </table><TABLE cellspacing=0 width=100% ><TR><TD height=100% valign=top class="pbPopMain '+ prefix +'_pbPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';
  document.body.appendChild(this.div);
  this.div.innerHTML = m;
  document.getElementById(prefix+'_X').addEventListener ('click', e_XClose, false);
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);
  
  this.div.addEventListener ('mousedown', e_divClicked, false);
  WinManager.add(prefix, this);
  
  function e_divClicked (){
    t.focusMe();
  }  
  function e_XClose (){
    t.show(false);
    if (t.onClose != null)
      t.onClose();
  }
  function autoHeight (onoff){
    if (onoff)
      t.div.style.height = '';  
    else
      t.div.style.height = t.div.style.maxHeight;
  }
  function focusMe (){
    t.setLayer(5);
    for (k in unsafeWindow.cpopupWins){
      if (k != t.prefix)
        unsafeWindow.cpopupWins[k].unfocusMe();
    }
  }
  function unfocusMe (){
    t.setLayer(-5);
  }
  function getLocation (){
    return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
  }
  function setLocation (loc){
    t.div.style.left = loc.x +'px';
    t.div.style.top = loc.y +'px';
  }
  function destroy (){
    document.body.removeChild(t.div);
    WinManager.delete (t.prefix);
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
  function setEnableDrag (tf){
    t.dragger.setEnable(tf);
  }
  function setLayer(zi){
    t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi);
  }
  function getLayer(){
    return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;
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
    try {
        type =  matTypeof(obj[property]);
        if (doFunctions==true && (type == 'function')){
          str += indent + '(' + type + ') ' + property + "[FUNCTION]\n";
        } else if (type != 'function') {
          str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
        }
        if((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse
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
String.prototype.StripQuotes = function() {
    return this.replace(/"/g,'');
}

String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;', '\'':'&#039', '<':'\\u003c', '/':'\\/', '\\':'\\\\', '\"':'\\\"','{':'&#123;','}':'&#125;'};
String.prototype.htmlSpecialChars = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret  = ret.split(k).join(this.entityTrans[k]);
  return ret;
}
String.prototype.htmlSpecialCharsDecode = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret = ret.split(this.entityTrans[k]).join(k);
  return ret;
}
String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}
String.prototype.escape_space = function(){
    var s = this.split(" ");
    for(var i=0; i<s.length; i++)
        s[i] = escape(s[i]);
    //return s.join(" ");
    return this.replace(/</ig,"&#60;");
}
String.prototype.unescape_space = function(){
    var s = this.split(" ");
    for(var i=0; i<s.length; i++)
        s[i] = unescape(s[i]);
    //return s.join(" ");
    return this;
}

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

function getResourceProduction (cityId){
  var ret = [0,0,0,0,0];
  var now = unixTime ();
  
  var wilds = [0, 0, 0, 0, 0];
  var w = Seed.wilderness["city" + cityId];
  for (var k in w){
    var type = parseInt(w[k].tileType);
    if (type==10 || type==11)
      wilds[1] += parseInt(w[k].tileLevel);
    else
      wilds[type/10] += parseInt(w[k].tileLevel);
  }  
  
  knight = 0;       
  var s = Seed.knights["city" + cityId];
  if (s) {
    s = s["knt" + Seed.leaders["city" + cityId].resourcefulnessKnightId];
    if (s){
      var knight = parseInt(s.resourcefulness);
      if (s.resourcefulnessBoostExpireUnixtime > now)
        knight *= 1.25;
    }
  }
  var workerFactor = 1;
  var c = parseInt(Seed.citystats["city" + cityId]["pop"][0]);  // Current  population
  var w = parseInt(Seed.citystats["city" + cityId]["pop"][3]);  // Labor force
  if (w > c)
    workerFactor = c / w;
  
  for (var i=1; i<5; i++){
    var usage = Seed.resources["city" + cityId]["rec" + i];
    var items = 0;
    if (parseInt(Seed.playerEffects["r" + i + "BstExp"]) > now) {
      items = 0.25;
    }
    var tech = Seed.tech["tch" + i];
    ret[i] = parseInt((usage[2] * (1 + tech/10 + knight/100 + items + 0.05 * wilds[i]) * workerFactor + 100));
  }
  return ret;  
}

function objectName (o){
  var s = o.toString();
  return s.substr(7,s.length-8);
}

function matTypeof (v){
  if (typeof (v) == 'object'){
    if (!v)
      return 'null';
//    else if (unsafeWindow.Object.prototype.toString.apply(v) === '[object Array]')
    else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
      return 'array';
    else return 'object';
  }
  return typeof (v);
}

function updatebotbutton(text, id)
{
    var but=document.getElementById(id);
    but.innerHTML = '<span style="color: #ff6">'+text+'</span>';
}

function tbodyScroller (tbody, maxHeight){  
  tbody.style.maxHeight = '';
  tbody.style.height = '';
  tbody.style.overflowX = 'hidden';
  if (parseInt(tbody.clientHeight) > maxHeight){
    tbody.style.height = maxHeight + 'px';
    tbody.style.maxHeight = maxHeight + 'px';
    tbody.style.overflowY = 'auto';
  }
}
function getRemainingHeight (e, cont){
  var ec = getClientCoords(e);
  var cc = getClientCoords(cont);
  return cont.clientHeight - (ec.y - cc.y);
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

/********
 Xd Xh
 Xh Xm
 Xm Xs
 Xs
********/
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

/**********************
 part       full
 Xd Xh Xm   Xd Xh Xm Xs
 Xh Xm      Xh Xm Xs
 Xm Xs      Xm Xs
 Xs         Xs
**********************/
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
// Firefox bug??? It appears as if a new thread is started on open, withOUT reusing same window? huh?
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
    var t = WinLog;
    if (!t.enabled || t.isOpening)
      return;
    t.write (msg.htmlSpecialChars());
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
  },

};

 
/*********************************** Resources TAB ***********************************/
/****
courtDoAction.php
&atype=4&toid=1290791&givercityid=26654
{"ok":true,"gold":500,"resource":500,"resourcetype":"4"}
***/
Tabs.Resources = {
  tabOrder : 100,
  resource : {1:'Food', 2:'Wood', 3:'Stone', 4:'Ore'},
  users : [],
  myDiv : null,
  doList : [], // list of gifts to accept
  accepting : false,
  city : null,
  total : {gold:0, 1:0, 2:0, 3:0, 4:0},
    
  init : function (div){
    var t = Tabs.Resources;
        t.myDiv = div;
    div.innerHTML = '<TABLE cellpadding=0 cellspacing=0 class=pbTab width=100%><TR><TD align=center><INPUT id="pballlist" type=submit value="Fetch User List" \></td></tr></table><HR>\
        <DIV id=resDiv style="width:100%; min-height:300px; height:100%">';
    document.getElementById('pballlist').addEventListener ('click', t.e_clickfetchlist, false);

  },
  
  show : function (){
  },
  hide : function (){
  },
  
  progress : function (msg, span, add){
    if(add)
        document.getElementById(span).innerHTML+=msg;
    else
        document.getElementById(span).innerHTML=msg;
  },

  e_clickfetchlist : function  (){     // (also cancel accepting)
    var t = Tabs.Resources;
    t.users = [];
    if (t.accepting){
      document.getElementById('pballlist').value = 'Fetch User List';
      document.getElementById('resDiv').innerHTML+= '<BR><SPAN class=boldRed>Cancelled.</span>';
      t.accepting = false;
      return;
    }
    document.getElementById('resDiv').innerHTML = 'Fetching user list ... <span id=pbResUserListCount></span>';
    
    t.fetchUserList (gotUserList);
    function gotUserList(userList){
        if(userList.length < 1){
            listGifts();
            return;
        }
        document.getElementById('resDiv').innerHTML += '<BR>Check if able to collect ... <span id=pbResUserAvailCount></span>';
        t.checkDailyAction(userList, listGifts);
    }
    
    function listGifts (){
      t.city = Cities.cities[0];
      var m = '<DIV class=pbStat><CENTER>User List &nbsp; &nbsp; &nbsp; ('+ t.users.length +' found)</center></div>';
      if (t.users.length<1){
        document.getElementById('resDiv').innerHTML = m + '<BR><BR><CENTER>No users found!</center>';
        return;
      }
      m += '<TABLE class=pbTab align=center><TR><TD align=right>City to apply gifts to: </td><TD id=pbrescityselspan></td></tr>\
          <TR><TD align=right>Select resource to collect</td><TD>'
        + htmlSelector (t.resource, Options.getResType, 'id=pbResColType')
        + '</td></tr><TR><TD>Select users you want to collect from and hit: </td><TD width=250><INPUT type=submit id=pbResDo value="Accept Resources">\
        &nbsp; <SPAN id=pbResNone class=boldRed></span></td></tr></table><HR><TABLE class=pbTab><TR valign=top><TD>\
        <INPUT id=pbResButAll type=submit value="All" style="width:100%; margin-bottom:5px"><BR><INPUT id=pbResButNone type=submit value="None"></td>\
        <TD width=10></td><TD><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabLined>\
        <TBODY id=pbResTbody style="height:250px; overflow:auto; display:block;">\
        <TR style="font-weight:bold; background:white"><TD>Name</td><TD>Might</td><TD width=20></td></tr>';
      for (var i=0; i<t.users.length; i++){
        m += '<TR><TD><INPUT type=checkbox id=pbrchk_'+ i +'> &nbsp;'+ t.users[i].name +'</td><TD>'+ t.users[i].might +'</td></tr>';
      }
      document.getElementById('resDiv').innerHTML = m + '</tbody></table></td></tr></table>';
      new CdispCityPicker ('pbrescitysel', document.getElementById('pbrescityselspan'), true, t.e_CityButton, t.city.idx);
      document.getElementById('pbResDo').addEventListener ('click', t.getErDone, false);
      document.getElementById('pbResButAll').addEventListener ('click', t.e_butAll, false);
      document.getElementById('pbResButNone').addEventListener ('click', t.e_butNone, false);
      // var tbody = document.getElementById('pbResTbody');
      // tbodyScroller (tbody, getRemainingHeight (tbody, mainPop.div));
    }
  },

  e_CityButton : function (city, x, y){
    var t = Tabs.Resources;
    t.city = city;
  },
  
  e_butAll : function (){
    var t = Tabs.Resources;
    for (var i=0; i<t.users.length; i++)
      document.getElementById('pbrchk_'+i).checked = true;
  },
  
  e_butNone : function (){
    var t = Tabs.Resources;
    for (var i=0; i<t.users.length; i++)
      document.getElementById('pbrchk_'+i).checked = false;
  },
  
  getErDone : function (){
    var t = Tabs.Resources;
    t.doList = [];
    document.getElementById('pbResNone').innerHTML = '';
    Options.getResType = document.getElementById('pbResColType').value;
    t.total = {gold:0, 1:0, 2:0, 3:0, 4:0};
    for (var i=0; i<t.users.length; i++){
      if (document.getElementById('pbrchk_'+i).checked)
        t.doList.push (t.users[i]);
    }
    if (t.doList.length==0){
      document.getElementById('pbResNone').innerHTML = 'None Selected!';
      return;
    }
    t.accepting = true;
    document.getElementById('pballlist').value = 'Stop Accepting';
    document.getElementById('resDiv').innerHTML = '<DIV id=rsltDiv style="height:400px; max-height:400px; overflow-y:auto"><B>Accepting from '+ t.doList.length +' users:</b><BR></div>';    
    t.acceptNext ();
  },

    
  allDone : function (msg){
    var t = Tabs.Resources;
    msg += '<BR><BR> Total resources gained : <BR>\
           Gold: '+addCommas(t.total.gold)+'<BR>';
    for(var i=1; i<=4; i++){
        msg += t.resource[i]+': '+addCommas(t.total[i])+'<BR>';
    }
    document.getElementById('rsltDiv').innerHTML += '<BR><BR>' + msg;
    document.getElementById('pballlist').value = 'Fetch User List';
    t.accepting = false;
  },
  
    
  acceptNext : function (){
    var t = Tabs.Resources;
    var gift = t.doList.shift();
    if (gift == null){
      t.allDone ('Done accepting resources.');
      return;
    }
    var acpDiv = document.getElementById('rsltDiv');
    var curDiv = document.createElement ('div');
    acpDiv.appendChild (curDiv);
    curDiv.innerHTML = '<B>From '+ gift.name +': ';    
    var statSpan = document.createElement ('span');
    curDiv.appendChild (statSpan);
    statSpan.innerHTML = 'Accepting... ';
    t.getCourtAction (gift, gotGiftData);
        
    function gotGiftData (rslt){
//logit ("getErDone.gotGiftData ... \n"+ inspect (gift, 8, 1));
      if (!t.accepting)
        return;
      if (rslt.ok){
        var msg = rslt.gold +' gold and '+rslt.resource +' '+ t.resource[rslt.resourcetype]+'&nbsp; &nbsp; OK.';
        actionLog ('Accepted from '+gift.name+': '+ rslt.gold +' gold and '+ rslt.resource +' '+ t.resource[rslt.resourcetype]);
        statSpan.innerHTML += msg;
        t.total.gold += rslt.gold;
        t.total[rslt.resourcetype] += rslt.resource;
        t.acceptNext ();  
        return;
      }
        
      if (rslt.msg)
        msg = '<B>'+ rslt.msg + '</b>';
      else
        msg = '<SPAN class=boldRed>ERROR: '+ rslt.ajaxErr +'</span>';

      curDiv.removeChild (statSpan);
      curDiv = document.createElement ('div');
      curDiv.className = 'indent25';
      acpDiv.appendChild (curDiv);
      curDiv.innerHTML = msg;
      t.acceptNext ();  
    }
    
  },

  getMembersInfo : function (pageNo, notify) {
    var t = Tabs.Resources;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    
    params.pageNo = pageNo;
    RPM++;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetMembersInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errMsg:'Ajax Comm Error'});
      },
    });
  },
  
  getDailyAction : function (uid, notify){
    var t = Tabs.Resources;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    
    params.pid = uid;
    RPM++;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/viewCourt.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errMsg:'Ajax Comm Error'});
      },
    });
  },
  
  getCourtAction : function (gift, notify){
    var t = Tabs.Resources;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    
    params.atype = Options.getResType;
    params.toid = gift.userId;
    params.givercityid = t.city.id;
    RPM++;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/courtDoAction.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errMsg:'Ajax Comm Error'});
      },
    });
  },
  
  checkDailyAction : function (userList, notify){
    var t = Tabs.Resources;
    var count = 0;
    t.getDailyAction(userList[count].userId, parseViewCourt);
    
    function parseViewCourt (rslt){
        if (!rslt.ok || rslt.errMsg)
            notify ({errMsg:'Ajax Comm Error'});
        if(rslt.dailyActionFlag == 0)
            t.users.push(userList[count]);
        t.progress(count, 'pbResUserAvailCount');
        count++;
        if(count < userList.length){
            t.getDailyAction(userList[count].userId, parseViewCourt);
        } else {
            notify();
        }
    }
  },
  
  // notify with gifts[] or: {errMsg:xxx}
  fetchUserList : function (notify){
    var t = Tabs.Resources;
    var userList = [];
    t.getMembersInfo(1, parseAlliancePage);
    
    function parseAlliancePage (rslt){
      if (!rslt.ok || rslt.errMsg)
        notify ({errMsg:'Ajax Comm Error'});
      var users = rslt.memberInfo;
      for(var k in users){
        userList.push({userId:users[k].userId, name:users[k].name, might:users[k].prestige, type:'alliance'});
      }
      t.progress(userList.length, 'pbResUserListCount');
      if(rslt.currentPage < rslt.noOfPages){
        t.getMembersInfo((rslt.currentPage+1), parseAlliancePage);
      } else {
        notify(userList);
      }
    }
    
    
  },
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

function encode_utf8( s ){
  return unescape( encodeURIComponent( s ) );
}

function decode_utf8( s ){
  return decodeURIComponent( escape( s ) );
}

function CdialogCancelContinue (msg, canNotify, contNotify, centerElement){
  var pop = new pbPopup ('ptcancont', 10, 10, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=ptok type=submit value="OK" \> &nbsp; &nbsp; </td></tr></table>';
  document.getElementById('ptok').addEventListener ('click', function (){pop.destroy(false); if (canNotify) canNotify();}, false);
  pop.show(true);
}

function CdialogConfirm (msg, canNotify, contNotify, centerElement){
  var pop = new pbPopup ('ptcancont', 10, 10, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD colspan=2>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=pbok type=submit value="OK" \> &nbsp; &nbsp; </td><TD><INPUT id=pbcancel type=submit value="CANCEL" \> &nbsp; &nbsp; </td></tr></table>';
  document.getElementById('pbok').addEventListener ('click', function (){pop.destroy(false); if (canNotify) canNotify(this);}, false);
  document.getElementById('pbcancel').addEventListener ('click', function (){pop.destroy(false); if (canNotify) canNotify(this);}, false);
  pop.show(true);
}

function hexDump (dat){
  var i = 0;
  var s = [];
  while (i < dat.length) {
    asc = [];
    s.push (hex4(i));
    s.push (': ');
    for (var ii=0; ii<16; ii++) {
      c = dat.charCodeAt(i+ii);
      s.push (hex2(c));
      s.push (' ');
      if (c>31 && c<128)
        asc.push (dat.charAt(i+ii));
      else
        asc.push ('.');
    }
    s.push ('  ');
    s.push (asc.join(''))
    s.push ('\n');
    i += 16;
  }
  return s.join ('');
  function hex4(d){
    return hexDig(d>>12) + hexDig(d>>8) + hexDig(d>>4) + hexDig(d&15);
  }
  function hex2(d){
    return hexDig(d>>4) + hexDig(d&15);
  }
  function hexDig (d){
    hexdigs = '0123456789ABCDEF';
    return hexdigs.charAt(d&15);    
  }
}
 
// value is 0 to 1.0
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
  this.slider.style.left = margin +'px';   /////
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

  this.setValue = function (val){   // todo: range check
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
    self.knob.style.left = (relX - (self.knob.clientWidth/2) ) +'px';   // - half knob width !?!?
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
    while (e.offsetParent){   // determine actual clientX
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

function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
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
  
  this.load = function (chanNum, url, bStream, bAutoplay, bUsePolicyFile){   // loop ?
    self.player.jsLoad (chanNum, url, bStream, bAutoplay, bUsePolicyFile);
  }
  
  this.play = function (chanNum, position){
       if (this.isLoaded)
    self.player.jsPlay (chanNum, position);
  }
    
  this.stop = function (chanNum){
       if (this.isLoaded)
    self.player.jsStop (chanNum);
  }
    
  this.getStatus = function (chanNum){           // returns null if sound channel is 'empty'
   if (this.isLoaded)
    return self.player.jsGetStatus (chanNum);
  }
  
  this.debugFunc = function (msg){  // overload to use
  }
      
  this.swfDebug = function (msg){    // called by plugin
    self.debugFunc('SWF: '+ msg);
  }
  this.swfLoaded = function (){    // called by plugin when ready to go!
    self.isLoaded = true;
    self.debugFunc ('playerIsReady');
    if (self.onSwfLoaded)
      self.onSwfLoaded();
  }
  this.swfPlayComplete = function (chanNum){    // called by plugin when a sound finishes playing (overload to be notified)
  }
  this.swfLoadComplete = function (chanNum, isError){    // called by plugin when a sound finishes loading  (overload to be notified)
  }
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
            logit("A javascript error has occurred when executing a function via DoUnsafeWindow. Error description: "+error.description);
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

function DrawLevelIcons() {
	var maptileRe = /modal_maptile.([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)/;
	var mapwindow=document.getElementById('mapwindow');
	if(!mapwindow) return;
	var levelIcons=document.getElementById('levelIcons');
	if(levelIcons) return;

	var ss=document.evaluate(".//a[contains(@class,'slot')]",mapwindow,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var idDone=false;
	for(var s=0; s<ss.snapshotLength; s++) {
		var a=ss.snapshotItem(s);
		var onclick=a.getAttribute('id');
		var owner='';
		if(onclick) {
			var tileinfo = unsafeWindow.g_mapObject.model.getTileActions(onclick)["tileClick"];	
			if(tileinfo) {
				var might = tileinfo.might;
				if (might == "--------") might=0;
				var might = parseInt(might)/1000000;
				if (might > 1) might = Math.round(might);
				 else if (might>0) might = might.toFixed(2);
				var alliance = parseIntNan(tileinfo.allianceId);
				var dip = getDiplomacy(alliance);
				owner = tileinfo.username;
				if (owner.length>10) owner = owner.slice(0,10) + '...';
			}
		}
		var sp=a.getElementsByTagName('span');
		if(sp.length==0) continue;

		if(!idDone) { a.id='levelIcons'; idDone=true; }
		var LevelColor = 'black';
		var InfoColor = 'black';

		var Prestige = a.getAttribute('class')
		if (Prestige.indexOf('Prestige') >=0) LevelColor = "#689C00";
		if (Prestige.indexOf('Briton') >=0) LevelColor = "#A944DB";
		if (Prestige.indexOf('Fey') >=0) LevelColor = "#E36600";

		if (tileinfo.type=="city") {
			if (tileinfo.allianceId == null)  InfoColor = '#C4C4C4'; //sp[0].style.color='#57BEFF'; //City unallied -> grey
			if (tileinfo.allianceId != null)  InfoColor = '#F5AF36'; //sp[0].style.color='#FF57B6'; //City allied -> orange
			if (tileinfo.status !="Normal") LevelColor = "white";
		}

		if (tileinfo.type!="city") {				
			if (tileinfo.allianceId != null && tileinfo.tileuserid != null)  LevelColor = InfoColor = '#F5AF36'; //Wild owned allied -> orange
			if (tileinfo.allianceId == null && tileinfo.tileuserid != null && tileinfo.tileuserid != "0" && !tileinfo.mistedflag) LevelColor = InfoColor = '#C4C4C4'; //Wild owned unallied -> grey
			if (tileinfo.mistedflag) LevelColor = InfoColor = '#F5AF36'; //Wild owned misted -> grey
			if (tileinfo.allianceId == null && tileinfo.tileuserid == null && !tileinfo.mistedflag) LevelColor = InfoColor = '#000000	'; //Wild un-owned
		}


		if (Options.MapShowExtra && unsafeWindow.tvuid!=tileinfo.tileuserid) {
			if (tileinfo.username!="null")
			sp[0].innerHTML = '<B><FONT color="'+LevelColor+'">' + tileinfo.level + '</b></font><FONT color="'+InfoColor+'"> ('+might+ 'M)<br />'+owner + '</font>';
			else
			sp[0].innerHTML = '<FONT color="'+LevelColor+'">' + tileinfo.level + '</font>';
		}
		else if (unsafeWindow.tvuid==tileinfo.tileuserid) {
			if (Prestige.indexOf('city') >=0) LevelColor = "white";
			sp[0].style.color=LevelColor;
		}
	}

}

function AjaxRequest2 (url, opts){
    var headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Prototype-Version': '1.6.1',
        'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };
    var ajax = null; 
    if (window.XMLHttpRequest)
      ajax=new XMLHttpRequest();
    else
      ajax=new ActiveXObject("Microsoft.XMLHTTP"); 
    if (opts.method==null || opts.method=='')
      method = 'GET';
    else
      method = opts.method.toUpperCase();  
    if (method == 'POST'){
        headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    } else if (method == 'GET'){
        addUrlArgs (url, opts.parameters);
    }  
    ajax.onreadystatechange = function(){
        // ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
        if (ajax.readyState==4) {
            if (ajax.status >= 200 && ajax.status < 305)
            if (opts.onSuccess) opts.onSuccess(ajax);
            else
                if (opts.onFailure) opts.onFailure(ajax);
            } else {
                if (opts.onChange) opts.onChange (ajax);
            }
    }  
    ajax.open(method, url, true); // always async!
    for (var k in headers)
      ajax.setRequestHeader (k, headers[k]);
     if (matTypeof(opts.requestHeaders)=='object')
          for (var k in opts.requestHeaders)
            ajax.setRequestHeader (k, opts.requestHeaders[k]);
    if (method == 'POST'){
        var a = [];
        for (k in opts.parameters){
              if(matTypeof(opts.parameters[k]) == 'object'){
                  for(var h in opts.parameters[k]){
                      if(matTypeof(opts.parameters[k][h]) == 'object'){
                          for(var i in opts.parameters[k][h]){
                              if(matTypeof(opts.parameters[k][h][i]) == 'object'){
                              for(var j in opts.parameters[k][h][i]){
                                  a.push (k+'['+h+']['+i+']['+j+'] ='+ opts.parameters[k][h][i][j] );
                              }
                              } else
                                  a.push (k+'['+h+']['+i+']'+' ='+ opts.parameters[k][h][i]);
                          }
                      } else
                      a.push (k+'['+h+'] ='+ opts.parameters[k][h] );
                  }
              } else
              a.push (k +'='+ opts.parameters[k] );
        }
        ajax.send (a.join ('&'));
    } else {
        ajax.send();
    }
}

function saveFarmOptions() {
    var serverID = getServerId();
    setTimeout(function () {
        GM_setValue('FarmOptions_' + serverID, JSON2.stringify(FarmOptions));
    }, 0);
}

function readFarmOptions() {
    var serverID = getServerId();
    s = GM_getValue('FarmOptions_' + serverID);
    if (s != null) {
        opts = JSON2.parse(s);
        for (k in opts) {
            if (matTypeof(opts[k]) == 'object') for (kk in opts[k])
            FarmOptions[k][kk] = opts[k][kk];
            else FarmOptions[k] = opts[k];
        }
    }
}

function saveThroneOptions() {
    var serverID = getServerId();
    setTimeout(function () {
        GM_setValue('ThroneOptions_' + serverID, JSON2.stringify(ThroneOptions));
    }, 0);
}

function readThroneOptions() {
    var serverID = getServerId();
    s = GM_getValue('ThroneOptions_' + serverID);
    if (s != null) {
        opts = JSON2.parse(s);
        for (k in opts) {
            if (matTypeof(opts[k]) == 'object') {
            	for (kk in opts[k]) if (ThroneOptions[k] != undefined) ThroneOptions[k][kk] = opts[k][kk];
            } else if (ThroneOptions[k] != undefined) ThroneOptions[k] = opts[k];
        }
    }
}
 
var DeleteReports = {
    deleting : false,
    init : function(){
        var t = DeleteReports;
    },
    
    startdeletereports : function(){
        var t = DeleteReports;
          if(!t.deleting && (Options.DeleteMsg || Options.DeleteMsgs0 || Options.DeleteMsgs1 || Options.DeleteMsgs2 || Options.DeleteMsgs3)){
              t.deleting = true;
              t.fetchreport(0, t.checkreports);
          }
    },
    
    fetchreport : function(pageNo, callback){
        var t = DeleteReports;
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        if(pageNo > 1) params.pageNo = pageNo;
        RPM++;
        new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, {
            method: "post",
            parameters: params,
            onSuccess: function (rslt) {
                callback(rslt);
            },
                onFailure: function () {
                callback();
            },
        });
    },
    
    checkreports : function(rslt){
        var t = DeleteReports;
        if(!rslt.ok){
            t.deleting = false;
            return;
        }
        if(rslt.arReports.length < 1){
        logit("CR stopped arreports < 1");
            t.deleting = false;
            return;
        }
        var reports = rslt.arReports;
        var totalPages = rslt.totalPages;
        if (rslt.totalPages > 30)
        var totalPages = 30;
        var deletes1 = new Array();
        var deletes0 = new Array();
        for(k in reports){
            if(Options.DeleteMsg){
                if((reports[k].marchType==4 || reports[k].marchType==9) && reports[k].side0PlayerId==0 && reports[k].side0TileType > 50)
                    deletes1.push(k.substr(2));
                else if(reports[k].marchType==1 && t.isMyself(reports[k].side1PlayerId))
                    deletes1.push(k.substr(2));
            }
            if (Options.DeleteMsgs0) if(reports[k].marchType==1 && !t.isMyself(reports[k].side1PlayerId)) deletes0.push(k.substr(2));   
            if (Options.DeleteMsgs1) if((reports[k].side0TileType <= 50 || reports[k].side0TileType==54)&& reports[k].side0PlayerId==0) deletes1.push(k.substr(2));                 
            if (Options.DeleteMsgs2){
            	for (var i=1;i<=Seed.cities.length;i++) {
			    	CityQueue = AtkOptions[i];
			    	for (var y=0;y<CityQueue.length;y++) {
			    		if (reports[k].side0XCoord == CityQueue[y].targetX && reports[k].side0YCoord == CityQueue[y].targetY  && t.isMyself(reports[k].side1PlayerId)) deletes1.push(k.substr(2));
			    	}
			    }
			    if (reports[k].side0XCoord == CrestOptions.X && reports[k].side0YCoord == CrestOptions.Y  && t.isMyself(reports[k].side1PlayerId)) deletes1.push(k.substr(2));
            }
            if (Options.DeleteMsgs3) if (reports[k].marchType == 10) deletes1.push(k.substr(2));
            if (FarmOptions.DeleteReports) {
            	for (i=1;i<=Seed.cities.length;i++){
                    var x=Seed.cities[i-1]["2"];
                    var y=Seed.cities[i-1]["3"];
                    if (Tabs.farm.FarmArray[i]) for (j=0;j<Tabs.farm.FarmArray[i].length;j++) if (reports[k].side1XCoord == x && reports[k].side1YCoord == y && reports[k].side0XCoord == Tabs.farm.FarmArray[i][j]["x"] && reports[k].side0YCoord == Tabs.farm.FarmArray[i][j]["y"]) deletes1.push(k.substr(2));
                	
            	}	    
            }
        }
        if(deletes1.length > 0 || deletes0.length > 0){
            t.deleteCheckedReports(deletes1, deletes0);
        } else {
            t.deleting = false;
            return;
        }
    },
    
    deleteCheckedReports : function(deletes1, deletes0){
        var t = DeleteReports;
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.s1rids = deletes1.join(",");
        params.s0rids = deletes0.join(",");
        params.cityrids = '';
        RPM++;
        new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/deleteCheckedReports.php" + unsafeWindow.g_ajaxsuffix, {
            method: "post",
            parameters: params,
            onSuccess: function (rslt) {
                if(rslt.ok){
                    Seed.newReportCount = parseInt(Seed.newReportCount) - parseInt(deletes1.length) - parseInt(deletes0.length);
                }
                t.fetchreport(0, t.checkreports);
            },
            onFailure: function () {
            },
        });
    },
    
    isMyself: function(userID){
        var t = DeleteReports;
        if(!Seed.players["u"+userID])
            return false;
        if(Seed.players["u"+userID].n == Seed.player.name)
            return true;
        else
            return false;
        return false;
    },
}

/******************* Apothecary Tab **********************/
Tabs.Apothecary = {
  tabOrder : 591,                    
  tabDisabled : false, 
  tabLabel : 'Apothecary',           
  cities : [],
  pop : null,
  pop2 : null,
  myDiv : null,
  timer : null,
  city : 0,
  
  init : function (div){
    var t = Tabs.Apothecary;
    t.myDiv = div;
    var n = '<DIV class=pbStat >APOTHECARY TAB</div><table width=100% height=0% class=pbTab><tr align=center >';
    n += '<td><input type=submit id=pbapothecary_power value="Auto Heal = '+(ApothecaryOptions.Active?'ON':'OFF')+'" /></td></tr></table>';
    n += '<DIV class=pbStat >WOUNDED UNITS</div><DIV id= showTroops></div>';
    n += '<DIV class=pbStat >UNITS REVIVING</div><DIV id=showInfo></div>';
    div.innerHTML = n;
    document.getElementById('pbapothecary_power').addEventListener('click', function(){t.e_toggleswitch(this);},false);
    t.paintStats();
    t.loop();
  },

  paintStats : function (){
    var t = Tabs.Apothecary;
    var time = 0;
    var now = unixTime();
    var troop = 0;
    var amount = 0;

    var n='<TABLE class=ptTabOverview cellpadding=0 cellspacing=0><TR><TD style="background: #FFFFFF; vertical-align:top;"></td>';
    for(i=0; i<Cities.numCities; i++) n += "<TD width=81 style='background: #FFFFFF'><B>"+ Cities.cities[i].name.substring(0,11) +"</b></td>";
    n+="</tr>";
   	for(a=1;a<=15;a++) {
		n+='<TR><TD style="background: #FFFFFF; vertical-align:top;">'+ unsafeWindow.unitcost['unt'+a][0]+'</td>';
   	    for(b=0; b<Cities.numCities; b++) {
   	       	if (Seed.woundedUnits['city' + Seed.cities[b][0]]['unt'+a] > 0) n+= '<TD align=right >'+addCommas(Seed.woundedUnits['city' + Seed.cities[b][0]]['unt'+a])+'</td>';
   	        else n+='<TD></td>';
   	    }
   	}
   	n+='<TR><TD></td></table>';
    document.getElementById('showTroops').innerHTML = n;     
    var o = '<TABLE class=ptTabOverview cellpadding=0 cellspacing=0><TR><TD width="100px"></td><TD width="200px">Troops</td><TD width="150px">Time</td></tr>';
    for(b=0;b<Cities.numCities;b++) {
     	if (t.CheckApothecary(Seed.cities[b][0])) var color = "black";
     	else var color = "red";
     	o += '<TR><TD><FONT color='+ color+'>' + Seed.cities[b][1] +':</font></td>';
     	troop = 0;
     	amount = 0;
     	if (Seed.queue_revive['city' + Seed.cities[b][0]][0] != undefined) {
     		troop  = Seed.queue_revive['city' + Seed.cities[b][0]][0][0];
     		amount = Seed.queue_revive['city' + Seed.cities[b][0]][0][1];
     	}	
     	if (amount > 0 && troop > 0) o+= '<TD>' + amount + ' ' + troops[troop] + '</td>';
     	else o+='<TD>&nbsp</td>';
     	time = 0;
     	if (Seed.queue_revive['city' + Seed.cities[b][0]][0] != undefined) time = Seed.queue_revive['city' + Seed.cities[b][0]][0][3] - now;   	
     	if (time > 0) { 
     		o+= '<TD align=right >'+timestr(time) + ' ';	 
     		time = 0;
     		if (Seed.queue_revive['city' + Seed.cities[b][0]][0] != undefined) time = Seed.queue_revive['city' + Seed.cities[b][0]][0][3] - Seed.queue_revive['city' + Seed.cities[b][0]][0][2];
     		o+= '(' + timestr(time) + ')</td>';
     	} else o+='<TD>&nbsp</td>';

     	o += '<TD>&nbsp</td>';
    }   
    o+='</tr></table>';  
    document.getElementById('showInfo').innerHTML = o;    
  },

  CheckApothecary : function(cityId){
    var t = Tabs.Apothecary;
    var check = false;
    for (k in Seed.buildings['city' + cityId]) if (Seed.buildings['city' + cityId][k][0] == 21 || Seed.buildings['city' + cityId][k][0] == 23) check= true;	   
  	return check;
  },

  loop : function(){
    var t = Tabs.Apothecary;
    if(!ApothecaryOptions.Active) return;
    var now = unixTime();
    for(b=0;b<Cities.numCities;b++) {
    	if (Seed.queue_revive['city' + Seed.cities[b][0]][0] != undefined) if (now > Seed.queue_revive['city' + Seed.cities[b][0]][0][3]) Seed.queue_revive['city' + Seed.cities[b][0]].splice(0,1); 
     	if (t.CheckApothecary(Seed.cities[b][0]) &&  Seed.queue_revive['city' + Seed.cities[b][0]].length == 0)  for(a=1;a<=15;a++) if (Seed.woundedUnits['city' + Seed.cities[b][0]]['unt'+a] > 0) setTimeout(t.do_revive, (1000*(b+1)),Seed.cities[b][0],a,Seed.woundedUnits['city' + Seed.cities[b][0]]['unt'+a]);
	}    	
  },
  
  e_toggleswitch : function(obj){
    var t = Tabs.Apothecary;
    if(ApothecaryOptions.Active){
        if (document.getElementById('pbapothecary_power')) document.getElementById('pbapothecary_power').value = "Auto Heal = OFF";
        if (document.getElementById('ApothecaryToggle')) document.getElementById('ApothecaryToggle').value = "Auto Heal = OFF";
        ApothecaryOptions.Active = false;
    } else {
        if (document.getElementById('pbapothecary_power')) document.getElementById('pbapothecary_power').value = "Auto Heal = ON";
        if (document.getElementById('ApothecaryToggle')) document.getElementById('ApothecaryToggle').value = "Auto Heal = ON";
        ApothecaryOptions.Active = true;
    }
    saveApothecaryOptions();
  },

  do_revive : function(currentcityid,unitId,num){
    var t = Tabs.Apothecary;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = currentcityid;
    params.type = unitId;
    params.apothecary = true;
    var time = unsafeWindow.cm.RevivalModel.getRevivalStats(unitId, num).time;
    if (time > 3600) params.quant =  Math.round(3600 / (time/num));
     else params.quant = num;
    time = unsafeWindow.cm.RevivalModel.getRevivalStats(unitId, params.quant).time;
    RPM++;
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/train.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function(transport) {
          var rslt=eval("("+transport.responseText+")");
          if (rslt.ok) {
            for (var i = 1; i < 5; i++) {
                var resourceLost = parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(params.quant);
                if(rslt.gamble) resourceLost = resourceLost*rslt.gamble[i];
                Seed.resources["city" + params.cid]["rec" + i][0] = parseInt(Seed.resources["city" + params.cid]["rec" + i][0]) - resourceLost;
            }
            if (!rslt.initTS) rslt.initTS = unixTime() - 1;         
            Seed.queue_revive["city" + params.cid].push([unitId, params.quant, rslt.initTS, parseInt(rslt.initTS) + time, time, time, null]);        
  	        var cost = unsafeWindow.cm.RevivalModel.getRevivalStats(unitId, params.quant).cost;
            Seed.woundedUnits["city" + params.cid]["unt"+params.type]-= params.quant;
            Seed.citystats["city" + params.cid].gold[0] -= parseInt(cost);
            for (postcity in Seed.cities) if (Seed.cities[postcity][0] == params.cid) logcity = Seed.cities[postcity][1];
            actionLog('Revived: ' + params.quant + ' ' + troops[params.type]+ ' in ' + logcity);
            t.paintStats();
          }
        },
      onFailure: function () {}
    });
  },
  
  hide : function (){
    var t = Tabs.Apothecary;
    clearInterval(t.timer);
  },
  
  show : function (){
    var t = Tabs.Apothecary;
    t.timer = setInterval(t.paintStats,1000);
  },
}

/**************************** Start Up Tab ******************************************/

var buildingIDs = {
    Farm:1,Mine:4,Quarry:3,Sawmill:2,Castle:0,Wall:19,Barracks:13,Cottage:5,RelStat:18,Stable:17,Blacksmith:15,KnightsHall:7,Workshop:16,FeySpire:20,Apothecary:21,RallyPoint:12,Embassy:8,AlcLab:11,Nothing:0,Wall:19
    };
var buildingTypes = {
    type5:"Cottage",type6:"",type7:"KnightsHall",type8:"Embassy",type9:"",type10:"",type11:"AlcLab",type12:"RallyPoint",type13:"Barracks",type14:"WatchTower",type15:"Blacksmith",type16:"Workshop",type17:"Stable",type18:"RelStation",type19:"Wall",type20:"FeySpire",type21:"Apothecary",
};
var cityBuildingNames = {
    Wall:"Wall",Cottage:"Cottage",Barracks:"Barracks",Blacksmith:"Blacksmith",Stable:"Stable",Apothecary:"Apothecary",Workshop:"Workshop",FeySpire:"Fey Spire",Embassy:"Embassy",RelStation:"Relief Station",AlcLab:"Alchemy Lab",WatchTower:"Watch Tower",KnightsHall:"Knights Hall",RallyPoint:"Rally Point",
    };
var fieldBuildingNames = {
    Farm:"Farm",Mine:"Mine",Sawmill:"Mill",Quarry:"Quarry",
    };
var layoutOptions = {
    pos1:"Wall",pos2:"Barracks",pos3:"Cottage",pos4:"RelStation",pos5:"Barracks",pos6:"Barracks",pos7:"Barracks",pos8:"Stable",pos9:"KnightsHall",pos10:"RallyPoint",pos11:"Barracks",pos12:"Barracks",pos13:"Barracks",pos14:"Cottage",pos15:"FeySpire",pos16:"Apothecary",pos17:"Blacksmith",pos18:"Workshop",pos19:"AlcLab",pos20:"Barracks",pos21:"Barracks",pos22:"Barracks",pos23:"Embassy",pos24:"Cottage",pos25:"Barracks",pos26:"Barracks",pos27:"Barracks",pos28:"Cottage",pos29:"Cottage",pos30:"Barracks",pos31:"Barracks",pos32:"Cottage"
    };
var fieldlayoutOptions = {
    pos100:"Farm",pos101:"Sawmill",pos104:"Quarry",pos105:"Mine",pos102:"Mine",pos103:"Mine",pos106:"Mine",pos107:"Mine",pos108:"Mine",pos109:"Mine",pos110:"Mine",pos111:"Mine",pos112:"Mine",pos113:"Mine",pos114:"Mine",pos115:"Mine",pos116:"Mine",pos117:"Mine",pos118:"Mine",pos119:"Mine",pos120:"Mine",pos121:"Mine",pos122:"Mine",pos123:"Mine",pos124:"Mine",pos125:"Mine",pos126:"Mine",pos127:"Mine",pos128:"Mine",pos129:"Mine",pos130:"Mine",pos131:"Mine",pos132:"Mine",pos133:"Mine",pos134:"Mine",pos135:"Mine",pos136:"Mine",pos137:"Mine",pos138:"Mine",pos139:"Mine",pos142:"Mine"
    };  

Tabs.startup = {
    tabOrder : 99999,
    tabDisabled : false,
    tabLabel : 'StartUp',
    myDiv : null,
    where: 'City', //Initialize to city by default


    init : function (div){
        var t = Tabs.startup;
        t.myDiv= div;
        var counter=0;
        var m = '<DIV id=pbStartupDiv class=pbStat>New Domain Tools</div><TABLE id=pbNewDomain width=100% height=0% class=pbTab><TR align="center">';
        m += '<DIV id=pblvlcity align=center></div><DIv><INPUT id=addToBuildQueue type=submit value="Add to build queue"></div>';
        m += '<INPUT id=toggleFieldLayout type=submit value="Show Field Layout"><INPUT id=toggleCityLayout type=submit value="Show City Layout"><INPUT id=hideGrids type=submit value="Hide Layouts">';
        m += '<DIV id=mainTitles></div>';    
        m += '<DIV id=gridPicture></div>';
           m += '<DIV id=layoutBoxes></div>';
          
        t.myDiv.innerHTML = m;
        t.city = new CdispCityPicker ('pblvlcity', document.getElementById('pblvlcity'), true, t.ClickCitySelect, 0);

        document.getElementById('toggleFieldLayout').addEventListener('click', function () {
                t.paintFieldGrid();
        });
        document.getElementById('toggleCityLayout').addEventListener('click', function () {
                t.paintCityGrid();
        });
        document.getElementById('hideGrids').addEventListener('click', function () {
                document.getElementById('mainTitles').innerHTML = "";
                document.getElementById('gridPicture').innerHTML = "";
                document.getElementById('layoutBoxes').innerHTML = "";

        });
        document.getElementById('addToBuildQueue').addEventListener('click', function () {
            if (t.where == "City") t.addCityToQueue();
            if (t.where == "Field") t.addFieldToQueue();
        });
    },
    ClickCitySelect : function(){ //Call this function when users switch to another city
        var t = Tabs.startup;
        switch(t.where){
            case 'City':
                t.paintCityGrid();
                break;
            case 'Field':
                t.paintFieldGrid();
                break;
            default : //If somehow something goes wrong then paint city view by default
                t.paintCityGrid();
                break;
        }
    },
    getCastleLevel:function(){
        var t = Tabs.startup
    var castle = Seed.buildings["city" + t.city.city.id]["pos0"][1];
        switch(castle){
                case "1":fields = 13;break;
                case "2":fields = 16;break;
                case "3":fields = 19;break;
                case "4":fields = 22;break;
                case "5":fields = 25;break;
                case "6":fields = 28;break;
                case "7":fields = 31;break;
                case "8":fields = 34;break;
                case "9":fields = 37;break;
                case "10":fields = 40;break;
                case "11":fields = 41;break;
                case "12":fields = 42;break;
        }
        max = (fields-1) + 100;
        return(max)
    },

    addCityToQueue:function(){
        var t = Tabs.startup;
            for (pos=1;pos<=32;pos++){
                      if  (buildingIDs[document.getElementById('tileID' + pos).value] >0) {
                          if (Seed.buildings['city' + t.city.city.id]["pos" + pos] == undefined){
                        var buildingMode = "build";
                        var cityId =  t.city.city.id;
                        var buildingPos = pos;
                        var buildingType = buildingIDs[document.getElementById('tileID' + pos).value];
                        var buildingLevel = 0;
                        var buildingAttempts = 0;
                        var result = Tabs.build.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
                        var buildingMult = result[0];
                        var buildingTime = result[1];
                        var buildingId = buildingIDs[document.getElementById('tileID' + pos).value];
                        Tabs.build.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);  
                        }                  
                    }
            }
    },  
    buildExtraLevels:function(rslt,buildItem){
        if (Options.lvl5FarmDone == "false" && buildItem.buildingType == "1") {
            var buildingMode = "build"
               var cityId = buildItem.cityId
               var time = parseInt(buildItem.buildingTime);
            var mult = parseInt(buildItem.buildingMult);
            var attempt = parseInt(buildItem.buildingAttempt);
            var buildingPos   = parseInt(buildItem.buildingPos);
            var buildingType  = 1;
            var buildingLevel = 1; //parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
            var buildingId    = rslt.buildingId;
            var buildingAttempts = 0;
            for (var bL = 1; bL <5; bL++) {
                var queueId = Tabs.build.loaded_bQ.length;
                var result = Tabs.build.calculateQueueValues(cityId, bL, buildingType, buildingMode);
                var buildingMult = result[0];
                var buildingTime = result[1];
                queueId = queueId ;
                Tabs.build.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult,buildingMode);
                Tabs.build._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
               }
               Options.lvl5FarmDone = "true";
               saveOptions();
        }
        if (Options.lvl3MineDone == "false" && buildItem.buildingType == "4") {
            var buildingMode = "build"
               var cityId = buildItem.cityId
               var time = parseInt(buildItem.buildingTime);
            var mult = parseInt(buildItem.buildingMult);
            var attempt = parseInt(buildItem.buildingAttempt);
            var buildingPos   = parseInt(buildItem.buildingPos);
            var buildingType  = 4;
            var buildingLevel = 1; //parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
            var buildingId    = rslt.buildingId;
            var buildingAttempts = 0;
            for (var bL = 1; bL <3; bL++) {
                var queueId = Tabs.build.loaded_bQ.length;
                var result = Tabs.build.calculateQueueValues(cityId, bL, buildingType, buildingMode);
                var buildingMult = result[0];
                var buildingTime = result[1];
                queueId = queueId ;
                Tabs.build.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult,buildingMode);
                Tabs.build._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
               }
               Options.lvl3MineDone = "true";
               saveOptions();
        }
        if (Options.lvl2BarracksDone == "false" && buildItem.buildingType == "13") {
            var buildingMode = "build"
               var cityId = buildItem.cityId
               var time = parseInt(buildItem.buildingTime);
            var mult = parseInt(buildItem.buildingMult);
            var attempt = parseInt(buildItem.buildingAttempt);
            var buildingPos   = parseInt(buildItem.buildingPos);
            var buildingType  = 13;
            var buildingLevel = 1; //parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
            var buildingId    = rslt.buildingId;
            var buildingAttempts = 0;
            for (var bL = 1; bL <2; bL++) {
                var queueId = Tabs.build.loaded_bQ.length;
                var result = Tabs.build.calculateQueueValues(cityId, bL, buildingType, buildingMode);
                var buildingMult = result[0];
                var buildingTime = result[1];
                queueId = queueId ;
                Tabs.build.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult,buildingMode);
                Tabs.build._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
               }
               Options.lvl2BarracksDone = "true";
               saveOptions();
        }
        if (Options.lvl3WallDone == "false" && buildItem.buildingType == "19") { //WALL
            var buildingMode = "build"
               var cityId = buildItem.cityId
               var time = parseInt(buildItem.buildingTime);
            var mult = parseInt(buildItem.buildingMult);
            var attempt = parseInt(buildItem.buildingAttempt);
            var buildingPos   = parseInt(buildItem.buildingPos);
            var buildingType  = 19;
            var buildingLevel = 1;
            var buildingId    = rslt.buildingId;
            var buildingAttempts = 0;
            for (var bL = 1; bL <3; bL++) {
                var queueId = Tabs.build.loaded_bQ.length;
                var result = Tabs.build.calculateQueueValues(cityId, bL, buildingType, buildingMode);
                var buildingMult = result[0];
                var buildingTime = result[1];
                queueId = queueId ;
                Tabs.build.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult,buildingMode);
                Tabs.build._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
               }
               Options.lvl3WallDone = "true";
               saveOptions();
        }
        if (Options.lvl2WorkshopDone == "false" && buildItem.buildingType == "16") { //workshop
            var buildingMode = "build"
               var cityId = buildItem.cityId
               var time = parseInt(buildItem.buildingTime);
            var mult = parseInt(buildItem.buildingMult);
            var attempt = parseInt(buildItem.buildingAttempt);
            var buildingPos   = parseInt(buildItem.buildingPos);
            var buildingType  = 16;
            var buildingLevel = 1; //parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
            var buildingId    = rslt.buildingId;
            var buildingAttempts = 0;
            for (var bL = 1; bL <=2; bL++) {
                var queueId = Tabs.build.loaded_bQ.length;
                var result = Tabs.build.calculateQueueValues(cityId, bL, buildingType, buildingMode);
                var buildingMult = result[0];
                var buildingTime = result[1];
                queueId = queueId ;
                Tabs.build.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult,buildingMode);
                Tabs.build._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
               }
               Options.lvl2WorkshopDone = "true";
               saveOptions();
        }
      
    },

    addFieldToQueue:function(){
        var t = Tabs.startup;
        var max = t.getCastleLevel();
        Options.lvl5FarmDone = "false"
       
            for (pos=100;pos<=max;pos++){
                    if  (buildingIDs[document.getElementById('tileID' + pos).value] >0) {
                        if (Seed.buildings['city' + t.city.city.id]["pos" + pos] == undefined){
                        var buildingMode = "build";
                        var cityId =  t.city.city.id;
                        var buildingPos = pos;
                        var buildingType = buildingIDs[document.getElementById('tileID' + pos).value];
                        var buildingLevel = 0;
                        var buildingAttempts = 0;
                        var result = Tabs.build.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
                        var buildingMult = result[0];
                        var buildingTime = result[1];
                        var buildingId = buildingIDs[document.getElementById('tileID' + pos).value];
                        Tabs.build.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);                      
                        }
                }
            }
    },  

    paintCityGrid:function(cityDiv){
        var t = Tabs.startup;
        t.myDiv = cityDiv;
        t.where = "City";
        var counter = 0;
        var cityGrid = '<img src="http://koc-power-bot.googlecode.com/svn/trunk/CityTileIDs.jpg">';
        document.getElementById('gridPicture').innerHTML = "";
        document.getElementById('gridPicture').innerHTML = cityGrid;
        var message='<TABLE id=pbLayoutBoxes width=100% height=0%><INPUT id=showDefaults type=submit value="Load Defaults"><INPUT id=setDefaults type=submit value="Set Defaults">';

        for (k=1;k<=32;k++){
            if (k==1){
                counter++
                message += '<TD>Tile1<SELECT id=tileID1><OPTION value="Wall">Wall</option>'
            }else{
            counter++;
            message += '<TD>Tile'+k+'<SELECT id=tileID'+k+'><OPTION value="Nothing">---Select---</option>'
                  for (kk in cityBuildingNames){
                      message += '<OPTION value='+kk+'>'+cityBuildingNames[kk]+'</option>';
                }
            message += '</options>';
        if (counter % 4 == 0)message+='</tr>';
        }
        }
        document.getElementById('layoutBoxes').innerHTML = message;
            for (pos=1;pos<=32;pos++){
                if (Seed.buildings['city' + t.city.city.id]["pos" + pos] != undefined){
                    document.getElementById('tileID' + pos).value = buildingTypes["type"+Seed.buildings['city' +t.city.city.id]["pos"+pos][0]];
                    document.getElementById('tileID' + pos).disabled = true;
                }
            }
       
        document.getElementById('showDefaults').addEventListener('click', function(){
            for (pos=1;pos<=32;pos++){
                if (Seed.buildings['city' + t.city.city.id]["pos" + pos] == undefined){
                    document.getElementById('tileID' + pos).value = layoutOptions['pos' +pos];
                }else{
                    document.getElementById('tileID' + pos).value = unsafeWindow.buildingcost["bdg" + Seed.buildings['city' +t.city.city.id]["pos"+pos][0]][0];
                    document.getElementById('tileID' + pos).disabled = true;
                }
               }
        });
        document.getElementById('setDefaults').addEventListener('click', function(){
            for (pos=1;pos<=32;pos++){
                layoutOptions['pos'+pos] = document.getElementById('tileID' + pos).value

            }
            saveLayoutOptions();
        });
        //code for set buttons
    },
    paintFieldGrid:function(fieldsDiv){
        var t = Tabs.startup;
        t.myDiv = fieldsDiv;
        t.where = "Field";
        var counter = 0;
        var fields = 13;
        var max = t.getCastleLevel();
        var fieldGrid = '<img src="http://koc-power-bot.googlecode.com/svn/trunk/FieldsTileIDs.jpg">';
        document.getElementById('gridPicture').innerHTML = "";
        document.getElementById('gridPicture').innerHTML = fieldGrid;
        var mess='<TABLE id=pbLayoutBoxes width=100% height=0%><INPUT id=showFieldDefaults type=submit value="Load Defaults"><INPUT id=setFieldDefaults type=submit value="Set Defaults">';
        for (k=100;k<=max;k++){
            if (k != 140 && k != 141){
                counter++
                mess += '<TD>Tile'+k+'<SELECT id=tileID'+k+'><OPTION value="Nothing">---Select---</option>'
                      for (kk in fieldBuildingNames){
                          mess += '<OPTION value='+kk+'>'+ fieldBuildingNames[kk]+'</option>';
                    }
                mess += '</options>';
            if (counter % 4 == 0)mess+='<tr>';
            }
        }
        document.getElementById('layoutBoxes').innerHTML = mess;
        for (pos=100;pos<=max;pos++){
                if (Seed.buildings['city' + t.city.city.id]["pos" + pos] != undefined){
                    document.getElementById('tileID' + pos).value = unsafeWindow.buildingcost["bdg" + Seed.buildings['city' +t.city.city.id]["pos"+pos][0]][0];
                    document.getElementById('tileID' + pos).disabled = true;
                }
            }
  
    document.getElementById('showFieldDefaults').addEventListener('click', function(){
            for (pos=100;pos<=max;pos++){
                if (Seed.buildings['city' + t.city.city.id]["pos" + pos] == undefined){
                    document.getElementById('tileID' + pos).value = fieldlayoutOptions['pos' +pos];
                }else{
                    document.getElementById('tileID' + pos).value = unsafeWindow.buildingcost["bdg" + Seed.buildings['city' +t.city.city.id]["pos"+pos][0]][0];
                    document.getElementById('tileID' + pos).disabled = true;
                }
               }
    });
    document.getElementById('setFieldDefaults').addEventListener('click', function(){
            for (pos=100;pos<=max;pos++){
                fieldlayoutOptions['pos'+pos] = document.getElementById('tileID' + pos).value;
            }
            savefieldlayoutOptions();
    });
    },
  
  
    show : function(){},
    hide : function(){},
} 


/****** Global march function ****/

var March = {
    tt : null,
    profiler : null,
    currentrequests : 0,
    queue : [],
    lastattack : null,
    timer : null,
  
    //March queue system
    addMarch : function (params, callback){
        var t = this;
        var opts = {params:params, callback:callback};
        if(t.currentrequests < 5){
            t.sendMarch(opts.params, opts.callback);
        } else {
            t.queue.push(opts);
            setTimeout(t.loop, 2000);
        }
    },
    loop : function (){
        if(t.currentrequests < 5){
            var opts = t.queue.shift();
            t.sendMarch(opts.params, opts.callback);
        }
    },
    getQueueLength : function (){
        var t = this;
        return t.queue.length;
    },
    //End march queue
  
    sendMarch : function (params, callback){
        var t = this;
        t.profiler = new unsafeWindow.cm.Profiler("ResponseTime", "march.php");
        t.currentrequests++;
        RPM++;
        new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {   
            method: "post",
            parameters: params,
            loading: true,
            onSuccess: function (transport) {
                t.profiler.stop();
                --t.currentrequests;
                var rslt = eval("(" + transport.responseText + ")");
                if (rslt.ok) {
                    var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
                    var ut = unsafeWindow.unixtime();
                    var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
                    var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
                    for(i = 0; i <= unitsarr.length; i++){
                        if(params["u"+i]){
                            unitsarr[i] = params["u"+i];
                        }
                    }

                    var currentcityid = params.cid;
                    unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
                  
                    unsafeWindow.update_seed(rslt.updateSeed);
                    if (rslt.updateSeed) {
                        unsafeWindow.update_seed(rslt.updateSeed);
                    }
                    if(callback)
                        callback(rslt);
                } else {
                    if (rslt.user_action == "backOffWaitTime") {
                        logit('backoffwaittime '+rslt.wait_time);
                        if(rslt.tt)
                            params.tt = rslt.tt;
                        var wait = 1;
                        if(rslt.wait_time)
                            wait = rslt.wait_time;
                        setTimeout (function(){t.sendMarch(params,callback);}, wait*1000);
                        return;
                    }
                    if (rslt.user_action == "marchWarning") {
                        logit('marchWarning');
                        params.marchWarning = 1;
                        setTimeout (function(){t.sendMarch(params,callback);}, 5*1000);
                        return;
                    }
                    if (rslt.user_action == "marchCaptcha") {
                        logit('captcha');
                        if(!unsafeWindow.Recaptcha){
                            setTimeout (function(){t.sendMarch(params,callback);}, 5*1000);
                            return;
                        }
                        t.captchawin = new pbPopup ('pbmarch_captcha', 0, 0, 300, 200, true);
                        t.captchawin.centerMe (mainPop.getMainDiv);
                        var m = "<CENTER><SPAN class=boldRed>CAPTCHA ALERT! You have been sending too many attacks!</span></center><br \>";
                        m += "<CENTER><div class=\"captcha_container\"><form id=pbmarch_captchaform ></form></div></center>";
                        t.captchawin.getMainDiv().innerHTML = m;
                        t.captchawin.getTopDiv().innerHTML = "<CENTER><b>KOC Power Bot - March Captcha</b></center>";
                        t.captchawin.show(true);
                      
                        unsafeWindow.Recaptcha.create("6LcT7cQSAAAAAG4whvbBz60hGjJg0ON1wRIRv_iD", "pbmarch_captchaform", {
                            callback: function(){
                                unsafeWindow.Recaptcha.focus_response_field();
                                $("pbmarch_captchaform").addEventListener("submit", function(e){
                                    e.preventDefault();
                                    e.stopPropagation();
                                    params.marchWarning = 1;
                                    params.marchCaptcha_challenge = unsafeWindow.Recaptcha.get_challenge();
                                    params.marchCaptcha_response = unsafeWindow.Recaptcha.get_response();
                                    setTimeout (function(){t.sendMarch(params,callback);}, 5*1000);
                                    t.captchawin.destroy();
                                }, false);
                            },
                            theme: "white"
                        });
                        return;
                    }
                    setTimeout (function(){callback(rslt)}, 5*1000); //return all sever excess traffic error to original function to handle
                    return;
                }
                t.loop();
            },
            onFailure: function (transport) {
                t.profiler.stop();
                --t.currentrequests;
                if(callback)
                    callback({ok:false}); //return all onFailure as {ok:false} so as to trigger remarch
                t.loop(); //Always check for the next queued march after a request
            }
          });
    }
};

/****************************  Population Control Tab  ******************************/
Tabs.popcontrol = {
  tabOrder : 850,
  tabDisabled : false,
  tabLabel : 'Pop Control',
  myDiv : null,
  timer : null,
  timer_del : null,
  timer_cycle : null,
	del_count : 0,
	cycle_running : false,
	busy : false,
	cycle_step : 0,

  logtable : null,
  logmaxEntries: 300,
  loglast99 : [],

  init : function (div)
  	{
		var t = Tabs.popcontrol;
		t.myDiv = div;
		var selbut=0;
		
		var m = '<DIV class=pbStat>Population Control</div>';

		m += '<table border=0 width="100%">';	
		m += '<tr align=center>';
		m += '<td align=left><input type=submit id=pophelp_button value="HELP!"></td>';
		m += '<td align=center>Pick City:<span id=popcity></span></td>';
		m += '<td align=center>Population Gain per cycle: <span id=poptab_cycle_pop></span></td>';
		m += '</tr>';
		m += '</table>';
		
		m += '<DIV class=pbStat>City Requirements:</div>';
		m += '<table border="0" width="100%">';		
		m += '<tr>';
		m += '<td>Current Food: &nbsp<span id=poptab_cur_food></span></td>';
		m += '<td>Current Wood: &nbsp<span id=poptab_cur_wood></span></td>';
		m += '<td>Current Ore: &nbsp&nbsp<span id=poptab_cur_ore></span></td>';
		m += '<td>Current MM: <span id=poptab_cur_mm></span></td>';
		m += '</tr>';
		m += '<tr>';
		m += '<td>Needed Food: &nbsp<span id=poptab_needed_food></span></td>';
		m += '<td>Needed Wood: &nbsp<span id=poptab_needed_wood></span></td>';
		m += '<td>Needed Ore: &nbsp&nbsp<span id=poptab_needed_ore></span></td>';
		m += '<td>Needed MM: <span id=poptab_needed_mm></span></td>';
		m += '</tr>';
		m += '</table>';

		m += '<DIV class=pbStat>City Status:</div>';
		m += '<table border="0" width="100%">';	
		m += '<tr align=center>';
		m += '<td>Maximum Idle Population: <span id=poptab_max_idle_pop></span></td>';
		m += '<td># Slots Used: <span id=poptab_slots_used></span><br></td>';
		m += '<td># of barracks: <span id=poptab_barracks></span></td>';
		//m += '<td> </td>';
		m += '</tr>';
		m += '<tr align=center>';
		m += '<td>Current Idle Population: <span id=poptab_cur_idle_pop></span></td>';
		m += '<td># Slots Free: <span id=poptab_slots_free></span></td>';
		m += '<td># of cottages: <span id=poptab_cottages></span></td>';
		//m += '<td> </td>';
		m += '</tr>';		
		m += '</table>';

		m += '<DIV class=pbStat>Commands:</div>';
		m += '<table border="0" width="100%">';	
		m += '<tr align=center>';
		m += '<td><input type="submit" id="poptab_dismiss_mm" value="Dismiss MM" disabled></td>';
		m += '<td><input type="submit" id="poptab_queue_st" value="Queue Supply Troops" disabled></td>';
		m += '<td><input type="submit" id="poptab_del_queues" value="Delete All Queues" disabled></td>';
		m += '<td><input type="submit" id="poptab_run_cycle" value="Run cycle" disabled></td>';
		//m += '<td><input type="submit" id="poptab_test" value="Test"></td>';
		m += '</tr>';		
		m += '</table>';
	
		m += '<DIV class=pbStat>Action Log:</div>';

		m += '<DIV style="height:250px; max-height:250px; overflow-y:auto">';
		m += '<TABLE cellpadding=0 cellspacing=0 id=poptab_log class=pbTabLined>';
		m += '<TR><TD></td><TD width=95%></td>';
		m += '</table></div>';

		t.myDiv.innerHTML = m;

		t.logtable = document.getElementById('poptab_log');  
		var a = JSON2.parse(GM_getValue ('poptab_log_'+getServerId(), '[]'));
		if (matTypeof(a) == 'array')
			{
			t.loglast99 = a;
			for (var i=0; i<t.loglast99.length; i++)		t.addlogrow (t.loglast99[i].msg, t.loglast99[i].ts);
			}
		window.addEventListener('unload', t.onUnload, false);

		t.tcp = new CdispCityPicker ('popcityselect', document.getElementById('popcity'), true, null, selbut);
		
		document.getElementById('pophelp_button').addEventListener		('click', function(){	t.helpPop(this);							} , false);
		document.getElementById('popcity').addEventListener						('click', function(){	t.show_city	(t.tcp.city.id);	} , false);
		document.getElementById('poptab_dismiss_mm').addEventListener	('click', function(){	t.dismiss_mm(t.tcp.city.id);	} , false);
		document.getElementById('poptab_queue_st').addEventListener		('click', function(){	t.queue_st	(t.tcp.city.id);	} , false);
		document.getElementById('poptab_del_queues').addEventListener	('click', function(){	t.del_queues_start(t.tcp.city.id);	} , false);
		document.getElementById('poptab_run_cycle').addEventListener	('click', function(){	t.run_cycle	(t.tcp.city.id);	} , false);
		//document.getElementById('poptab_test').addEventListener	('click', function(){	t.btest	();	} , false);
  
  	},

	disable_btns : function ()
		{
		var t = Tabs.popcontrol;
		t.busy = true;
		document.getElementById('poptab_del_queues'	).disabled = true;
		document.getElementById('poptab_queue_st').disabled = true;
		document.getElementById('poptab_dismiss_mm').disabled = true;
		document.getElementById('poptab_run_cycle').disabled = true; 
		},

	onUnload : function ()
		{
		var t = Tabs.popcontrol;
		//if (!ResetAll) GM_setValue ('log_'+getServerId(), JSON2.stringify(t.last50));
		GM_setValue ('poptab_log_'+getServerId(), JSON2.stringify(t.loglast99));
		},
    
	addlogrow : function (msg, ts)
		{
		var t = Tabs.popcontrol;
		if (t.logtable.rows.length >= t.maxEntries)	t.logtable.deleteRow(t.maxEntries-1);
		var row = t.logtable.insertRow(0);
		row.vAlign = 'top';
		row.insertCell(0).innerHTML = ts;
		row.insertCell(1).innerHTML = msg;
		},
  
	log : function (msg)
		{
		var t = Tabs.popcontrol;
		var ts = new Date().toTimeString().substring (0,8);
		for (postcity in Seed.cities) if (Seed.cities[postcity][0] == t.tcp.city.id) logcity = Seed.cities[postcity][1];
		msg = logcity + ": " + msg;
		t.addlogrow (msg, ts);
		while (t.loglast99.length >= 99)
		t.loglast99.shift();
		t.loglast99.push ({msg:msg, ts:ts});
		},

  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.popcontrol;
    clearTimeout (t.timer);
  },
  
  show : function (){         // called whenever this tab is shown
    var t = Tabs.popcontrol;
    clearTimeout (t.timer);
    t.timer = setTimeout (t.show, 2000);
		t.show_city(t.tcp.city.id);
  },

	helpPop : function ()
		{
		var helpText = "";
		
		helpText += '<p>** This is a work in progress... If it gets stuck, refresh. By ADABman / Lurkin **';
		helpText += 'Probably a good idea to temporarily turn off auto transport, auto reassign, and auto train, when using this.';
		
		helpText += '<p>POPULATION CONTROL tab will help you convert your excess/useless millitiamen ';
		helpText += 'into massive amounts of idle population. Massive idle population is very useful ';
		helpText += 'to have before a might tournament starts, or if you want to do a massive siege ';
		helpText += 'build with a Merlins tutelage.';
		helpText += '</p>';
		
		helpText += '<p>The CITY REQUIREMENTS area displays the amount of resouces and Militiamen ';
		helpText += 'required for a \'full cycle\' of building massive idle population. If any of these ';
		helpText += 'requirements are not met, they will be displayed in red.';
		helpText += '</p>';
		
		helpText += '<p>The CITY STATUS area displays the maximum amount of population your cottages ';
		helpText += 'provide, and the current amount of idle population in your city. This area also ';
		helpText += 'shows the number of training queue slots total and in use.';
		helpText += '</p>';
		
		helpText += '<p>The COMMANDS area displays the buttons that automate this process:';
		helpText += '</p>';

		helpText += '<UL>';
		
		helpText += 'DISMISS MM BUTTON<BR><li>' + dismissBtn_help1 + '</li>';
		helpText += '<li>' + dismissBtn_help2 + '</li><BR>';
		
		helpText += 'QUEUE SUPPLY TROOP BUTTON<BR><li>' + queueBtn_help1 + '</li>';
		helpText += '<li>' + queueBtn_help2 + '</li><BR>';
		
		helpText += 'DELETE QUEUE BUTTON<BR><li>' + deleteBtn_help1 + '</li>';
		helpText += '<li>' + deleteBtn_help2 + '</li>';
		helpText += '<li>' + deleteBtn_help3 + '</li><BR>';
		
		helpText += 'RUN CYCLE BUTTON<BR><li>' + runcycleBtn_help1 + '</li>';
		helpText += '<li>' + runcycleBtn_help2 + '</li>';
		helpText += '<li>' + runcycleBtn_help3 + '</li><BR>';
	
		helpText += '</UL><BR>';
		
		//function CPopup (prefix, x, y, width, height, enableDrag, onClose)
		var pop = new pbPopup ('popcontrol_Help', 0, 0, 740, 600, true);
		pop.centerMe (mainPop.getMainDiv());  
		pop.getMainDiv().innerHTML = helpText;
		pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot Help</b>:  Population Control</center>';
		pop.show (true);
		},

	show_city : function (cityId)
		{
		var t = Tabs.popcontrol;

		t.st_food = 50;
		t.st_wood = 150;
		//t.st_stone = 0;
		t.st_ore = 10;
		
		var green = '#03F003';
		var red =   '#F0303';

		t.max_idle_pop = (parseInt(Seed.citystats['city'+cityId].pop[1])).toFixed(0);
		t.cur_idle_pop = (parseInt(Seed.citystats['city'+cityId].pop[0])).toFixed(0);
		document.getElementById('poptab_max_idle_pop').innerHTML	= t.max_idle_pop;
		document.getElementById('poptab_cur_idle_pop').innerHTML	= t.cur_idle_pop;

		t.barracks = parseInt(getCityBuilding(cityId, 13).count);
		t.cottages = parseInt(getCityBuilding(cityId, 5).count);
		t.slots_used = parseInt(Seed.queue_unt['city'+cityId].length);
		t.slots_free = parseInt(t.barracks - t.slots_used);
		document.getElementById('poptab_barracks').innerHTML = t.barracks;
		document.getElementById('poptab_cottages').innerHTML = t.cottages;
		document.getElementById('poptab_slots_used').innerHTML = t.slots_used;
		document.getElementById('poptab_slots_free').innerHTML = t.slots_free;

		t.cycle_pop = (parseInt(t.barracks) * parseInt(t.max_idle_pop)) + (parseInt(t.max_idle_pop) * 2);
		document.getElementById('poptab_cycle_pop').innerHTML	= addCommas( t.cycle_pop / 2 );

		t.cur_food = parseInt(Seed.resources['city'+cityId].rec1[0]/3600);
		t.cur_wood = parseInt(Seed.resources['city'+cityId].rec2[0]/3600);
		//t.cur_stone = parseInt(Seed.resources['city'+cityId].rec3[0]/3600);
		t.cur_ore = parseInt(Seed.resources['city'+cityId].rec4[0]/3600);
		
		document.getElementById('poptab_cur_food').innerHTML = addCommas (t.cur_food);
		document.getElementById('poptab_cur_wood').innerHTML = addCommas (t.cur_wood);
		//document.getElementById('poptab_cur_stone').innerHTML = addCommas (t.cur_stone);
		document.getElementById('poptab_cur_ore').innerHTML = addCommas (t.cur_ore);
		
		t.needed_food = parseInt(t.cycle_pop) * parseInt(t.st_food);
		t.needed_wood = parseInt(t.cycle_pop) * parseInt(t.st_wood);
		//t.needed_stone = 0;//parseInt(t.cycle_pop) * parseInt(t.st_Stone);
		t.needed_ore = parseInt(t.cycle_pop) * parseInt(t.st_ore);
		
		document.getElementById('poptab_needed_food').innerHTML = addCommas (t.needed_food);
		document.getElementById('poptab_needed_wood').innerHTML = addCommas (t.needed_wood);
		//document.getElementById('poptab_needed_stone').innerHTML = addCommas (t.needed_stone);
		document.getElementById('poptab_needed_ore').innerHTML = addCommas (t.needed_ore);
		
		document.getElementById('poptab_needed_food').style.color = (t.needed_food  > t.cur_food?'red':'green');
		document.getElementById('poptab_cur_food').style.color = (t.needed_food  > t.cur_food?'red':'green');
		document.getElementById('poptab_needed_wood').style.color  = (t.needed_wood  > t.cur_wood?'red':'green');
		document.getElementById('poptab_cur_wood').style.color = (t.needed_wood  > t.cur_wood?'red':'green');
		//document.getElementById('poptab_needed_stone').style.color = (t.needed_stone > t.cur_stone?'red':'green');
		//document.getElementById('poptab_cur_stone').style.color = (t.needed_stone > t.cur_stone?'red':'green');
		document.getElementById('poptab_needed_ore').style.color = (t.needed_ore  > t.cur_ore?'red':'green');
		document.getElementById('poptab_cur_ore').style.color = (t.needed_ore  > t.cur_ore?'red':'green');

		t.needed_mm = t.cycle_pop;
		t.cur_mm = parseInt(Seed.units['city'+cityId]['unt2']);
		document.getElementById('poptab_needed_mm').innerHTML = addCommas(t.needed_mm);
		document.getElementById('poptab_cur_mm').innerHTML = addCommas(t.cur_mm);
		
		document.getElementById('poptab_needed_mm').style.color = (t.needed_mm  > t.cur_mm?'red':'green')
		document.getElementById('poptab_cur_mm').style.color = (t.needed_mm  > t.cur_mm?'red':'green')
		
		dismissBtn_help1 = "This button is used to quickly get your city to its maximum idle population allowed by dismissing just the right amount of militiamen.";
		dismissBtn_help2 = "This button will only light up when when your city is not at its maximum population, and then only if you have enough MM in your city to dismiss.";
		need_to_dismiss = parseInt(t.max_idle_pop - t.cur_idle_pop);
		dismissBtn = document.getElementById('poptab_dismiss_mm');
		if(parseInt(need_to_dismiss) > 0 && parseInt(need_to_dismiss) <= parseInt(t.cur_mm) && !t.busy && !t.cycle_running)
			{
			dismissBtn.disabled = false;
			dismissBtn.value = "Dismiss " + addCommas(need_to_dismiss) + " MM";
			}
		else
			{
			dismissBtn.disabled = true;
			dismissBtn.value = "Dismiss MM";
			}

		queueBtn_help1 = "This button is used to train all the idle population into Supply Troops.";
		queueBtn_help2 = "This button will only light up when your city is at full idle population, and then only if you have enough resources to train all those Supply Troops and at least 1 free training slot.";
		unitId = 1;	
		var res_ok = 0;
		for (var i = 1; i < 5; i++)
			{
			var res_need = parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(t.cur_idle_pop);
			var res_have = parseInt(unsafeWindow.seed.resources["city" + cityId]["rec" + i][0]);
			if(parseInt(res_need) > parseInt(res_have))	{	res_ok++;	}
			}
		queueBtn = document.getElementById('poptab_queue_st');
		if(parseInt(t.slots_free) > 0 && parseInt(t.cur_idle_pop) >= parseInt(t.max_idle_pop) && parseInt(res_ok)==0 && !t.busy && !t.cycle_running)
			{
			queueBtn.disabled = false;
			queueBtn.value = "Queue " + addCommas(t.cur_idle_pop) + " Supply Troops";
			}
		else
			{
			queueBtn.disabled = true;
			queueBtn.value = "Queue Supply Troops";
			}

		deleteBtn_help1 = "This button is used to quickly delete all those queued up Supply Troops, returning 1/2 the used population (and resources?).";
		deleteBtn_help2 = "This button will only light up when there is at least 1 training queue slot used.";
		//deleteBtn_help3 = "** Due to a bug, you should refresh your game before using this button! **";
		deleteBtn_help3 = "If you have any problems with this button, refresh and try again.";
		deletebtn = document.getElementById('poptab_del_queues'	);
		if(Seed.queue_unt['city'+cityId].length > 0 && !t.busy && !t.cycle_running)
			{
			deletebtn.disabled = false;
			deletebtn.value = " Delete " + Seed.queue_unt['city'+cityId].length + " Queues";
			}
		else
			{
			deletebtn.disabled = true;
			deletebtn.value = "Delete All Queues";
			}

		runcycleBtn_help1 = "This button is used to automate the entire process of repeatedly dismissing Militiamen then queueing Supply Troops, and then finally delete all of those queues.";
		runcycleBtn_help2 = "This button will only light up when your city has the required amount of resources and Militiamen";
		//runcycleBtn_help3 = "------ This button is disabled for now. -----";
		runcycleBtn_help3 = "If the queue slots wont delete, refresh and hit the 'Delete All Queues' button.";
		res_ok = 0;
		t.cycle_pop_continue = (parseInt(t.slots_free) * parseInt(t.max_idle_pop)) + (parseInt(t.max_idle_pop) * 2);
		for (var i = 1; i < 5; i++)
			{
			var res_need = parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(t.cycle_pop_continue);
			var res_have = parseInt(unsafeWindow.seed.resources["city" + cityId]["rec" + i][0]);
			if(parseInt(res_need) > parseInt(res_have))	{	res_ok++;	}
			}
		runcycleBtn = document.getElementById('poptab_run_cycle');
		//if(parseInt(t.cur_idle_pop) >= parseInt(t.max_idle_pop) && parseInt(res_ok)==0 && !t.busy && !t.cycle_running)
		t.needed_mm_continue = t.cycle_pop_continue;
		if(parseInt(t.needed_mm) <= parseInt(t.cur_mm) && parseInt(res_ok)==0 && !t.busy && !t.cycle_running)
			{
			runcycleBtn.disabled = false;
			}
		else
			{
			runcycleBtn.disabled = true; 
			}
		
		},

	run_cycle : function (cityId)
		{
		// Temp disable auto train for this city & auto reassign & auto transport & auto refresh
		// log all that
		
		var t = Tabs.popcontrol;
		clearTimeout (t.timer);
		clearTimeout (t.timer_cycle);
		t.disable_btns();
		if(!t.cycle_running)
			{
			t.log("Starting population build cycle. Population at start: " + t.cur_idle_pop);
			t.cycle_running = true;
			t.cycle_step = 1;
			}
		
		//t.actionlog("1");
		t.max_idle_pop = (parseInt(Seed.citystats['city'+cityId].pop[1])).toFixed(0);
		t.cur_idle_pop = (parseInt(Seed.citystats['city'+cityId].pop[0])).toFixed(0);
		//num = parseInt(t.max_idle_pop) - parseInt(t.cur_idle_pop);
		if(parseInt(t.cur_idle_pop) < parseInt(t.max_idle_pop))	// Need to Dismiss MM
			{
			if (t.cycle_running)	t.dismiss_mm(cityId);
			
			//t.actionlog("2");
			}
		else if(parseInt(t.slots_free) > 0 && parseInt(t.cur_idle_pop) >= parseInt(t.max_idle_pop)) // Need to queue supply troops
			{
			if (t.cycle_running)	t.queue_st(cityId);
			//t.actionlog("3");
			}
		else if(parseInt(t.slots_free) == 0)	// Delete all the queues
			{
			//t.actionlog("4");
			t.cycle_running = false;
			setTimeout(unsafeWindow.update_seed_ajax, 250);
			t.del_queues_start(t.tcp.city.id);
			t.timer = setTimeout (t.show, 1000);
			return;
			}
		else
			{
			t.log("Waiting...");	// Wait
			}
		//t.actionlog("5");
		setTimeout(unsafeWindow.update_seed_ajax, 250);
		t.timer_cycle = setTimeout (function() {t.run_cycle(cityId)}, 3000);
		},

	dismiss_mm : function (cityId)
		{
		var t = Tabs.popcontrol;
		t.disable_btns();
		
		unitId = 2;

		t.max_idle_pop = (parseInt(Seed.citystats['city'+cityId].pop[1])).toFixed(0);
		t.cur_idle_pop = (parseInt(Seed.citystats['city'+cityId].pop[0])).toFixed(0);
		num = parseInt(t.max_idle_pop) - parseInt(t.cur_idle_pop);
		//t.log(num);
		
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = cityId;
		params.type = unitId;
		params.quant = num;

		RPM++;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/dismissUnits.php" + unsafeWindow.g_ajaxsuffix,
			{
			method: "post",
			parameters: params,
			onSuccess: function(rslt)
				{
				if (rslt.ok) 
					{
 					//t.log("Dismissed "+ addCommas(num) +" "+ troops[unitId]);
					t.log("Dismissed "+ addCommas(num) +" Militiamen");
					Seed.units['city'+cityId]['unt'+unitId] -= num;
					if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
					//setTimeout(unsafeWindow.update_seed_ajax, 250);
					t.busy = false;
					t.show_city(cityId);
					
					// Dismiss gets back 1/2 res ?
					//for (var i = 1; i < 5; i++)
					//	{
					//	var resourceGain = parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(num) / 2;
					//	unsafeWindow.seed.resources["city" + cityId]["rec" + i][0] = parseInt(unsafeWindow.seed.resources["city" + cityId]["rec" + i][0]) + resourceGain;
					//	}
					}
				else
					{
					//t.log("FAILED to dismiss "+ addCommas(num) +" "+ troops[unitId] + " :(");
					t.log("FAILED to dismiss "+ addCommas(num) +" Militiamen :(");
					t.busy = false;
					}
				},
			});		
		setTimeout(unsafeWindow.update_seed_ajax, 250);
		},

	queue_st : function (cityId)
		{
		var t = Tabs.popcontrol;
		t.disable_btns();

		unitId = 1;
		num = t.cur_idle_pop;
		//num = 15;
		
		var time = unsafeWindow.modal_barracks_traintime(unitId, num);
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = cityId;
		params.type = unitId;
		params.quant = num;
		params.gambleId = 0;

		RPM++;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/train.php" + unsafeWindow.g_ajaxsuffix,
			{
			method: "post",
			parameters: params,
			onSuccess: function(rslt)
				{
				if (rslt.ok) 
					{
					//t.log("Trained "+ addCommas(num) +" "+ troops[unitId]);
					t.log("Trained "+ addCommas(num) +" Supply Troops");
					if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
					for (var i = 1; i < 5; i++)
						{
						var resourceLost = parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(num);
						if(rslt.gamble) resourceLost = resourceLost*rslt.gamble[i];
						unsafeWindow.seed.resources["city" + cityId]["rec" + i][0] = parseInt(unsafeWindow.seed.resources["city" + cityId]["rec" + i][0]) - resourceLost;
						}
					unsafeWindow.seed.citystats["city" + cityId].gold[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].gold[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][5]) * parseInt(num);
					unsafeWindow.seed.citystats["city" + cityId].pop[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].pop[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][6]) * parseInt(num);
					//unsafeWindow.seed.queue_unt["city" + cityId].push([unitId, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null]);
					unsafeWindow.seed.queue_unt["city" + cityId].push([unitId, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, rslt.ticksNeeded, null]);
					t.busy = false;
					t.show_city(cityId);
					}
				else
					{
					//t.log("FAILED to train "+ addCommas(num) +" "+ troops[unitId] + " :(");
					t.log("FAILED to train "+ addCommas(num) +" Supply Troops :(");
					t.busy = false;
					}
				},
			});
		setTimeout(unsafeWindow.update_seed_ajax, 250);
		},


	del_queues_start : function (cityId)
		{
		var t = Tabs.popcontrol;
		t.disable_btns();

		t.del_count = Seed.queue_unt['city'+cityId].length;
		t.log("Attempting to delete " + t.del_count + " Queue slots...");
		t.del_queues(cityId);
		},

 	del_queues : function (cityId)
		{
		var t = Tabs.popcontrol;
		clearTimeout (t.timer_del);

		var q = Seed.queue_unt['city'+cityId];
		var qs = q.toString();

		if(q.length > 0 || t.del_count > 0)
			{
			t.del_count -= 1;
			typetrn =		q[0][0];
			numtrptrn =	q[0][1];
			trnTmp =		q[0][2];
			trnETA = 		q[0][3];
			trnNeeded =	q[0][5];
			trainingId = 0;

			t.delete_queue_slot(typetrn, numtrptrn, trnTmp, trnETA, trnNeeded, cityId, trainingId)
			t.delete_queue_slot(typetrn, numtrptrn, trnTmp, parseInt(trnETA)-1, trnNeeded, cityId, trainingId)	//?!
						}
		else
			{
			t.log("No more queue slots to delete.");
			t.del_count = 0;
			t.busy = false;
			return;
			}
		setTimeout(unsafeWindow.update_seed_ajax, 250);
		t.timer_del = setTimeout (function() {t.del_queues(cityId)}, 1500);
		},

	delete_queue_slot : function (typetrn, numtrptrn, trnTmp, trnETA, trnNeeded, cityId, trainingId)
		{
		var t = Tabs.popcontrol;
		var uW = unsafeWindow;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.pf =0;
		params.requestType = "CANCEL_TRAINING";
		params.cityId = cityId;
		params.typetrn = typetrn;
		params.numtrptrn = numtrptrn;
		params.trnETA = trnETA;
		params.trnTmp = trnTmp;
		params.trnNeeded = trnNeeded;

		RPM++;
		new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/cancelTraining.php" + unsafeWindow.g_ajaxsuffix,
			{
			method: "post",
			parameters: params,
			onSuccess: function (message)
				{
				var rslt=eval("("+message.responseText+")");
				if (rslt.ok)
					{
					t.log("Deleted queue of "+ addCommas(numtrptrn) +" "+ troops[typetrn]);
					if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
					var k=0;
					for(var j=0;j<Seed.queue_unt["city"+cityId].length;j++)
						{
						if(j>trainingId)
							{
							Seed.queue_unt["city"+cityId][j][2]=parseInt(rslt.dateTraining[k]["start"]);
							Seed.queue_unt["city"+cityId][j][3]=parseInt(rslt.dateTraining[k]["end"]);
							k++;
							}
						}
					Seed.queue_unt["city"+cityId].splice(trainingId,1);
					for(var i=1;i<5;i++)
						{
						var totalReturn=parseInt(unsafeWindow.unitcost["unt"+typetrn][i])*parseInt(numtrptrn)*3600/2;
						Seed.resources["city"+cityId]["rec"+i][0]=parseInt(Seed.resources["city"+cityId]["rec"+i][0])+totalReturn;
						}
					}
				else
					{
					}
				},
			onFailure: function ()
				{
				},
			});
		},


}

/***** Ascension Tab ******/
Tabs.ascension = {
    tabLabel: 'Ascension',
    tabOrder: 300,
    myDiv: null,
    init: function (div) {
        var t = Tabs.ascension;
        t.myDiv = div;
        var m = '<DIV id=pbAscensionMain></div><TABLE id=pbAscension><TR>';
        m += '<TD></td><TD>Percent</td><TD><CENTER>Menu</center></td><TD>Current Level</td><TD>Current Cost</td><TD>'+strButton20(translate('Building Values'), 'id=pbBuildingValues') +'</td><TR>';
        for (i = 0; i < Cities.cities.length; i++) {
            var cityPrestige = Seed.cityData.city[Cities.cities[i].id].cityValue;
            var cityPrestigeLevel = Seed.cityData.city[Cities.cities[i].id].prestigeInfo.prestigeLevel;
            var isPrestigeCity = Seed.cityData.city[Cities.cities[i].id].isPrestigeCity;
            //alert('city - ' + Cities.cities[i].id + ' prestige= ' + isPrestigeCity )
            var currentGemPrice = null;
            var fullPrestige = 1200;
            var progressWidth = parseInt(((cityPrestige / fullPrestige) * 100));
            if (progressWidth > 100) progressWidth = 100;
            var fullBarWidth = 378;
            var gemFullPrice = 1250;
            m += '<TR><TD>City ' + Cities.cities[i].name + ' - </td>';
            m += '<TR><TD background="https://koc-power-bot.googlecode.com/svn/trunk/progress_brown_bar.png" width=' + fullBarWidth + ' height=25">';
            m += '<DIV id=pbGreenBar_' + i + '></div></td><TD align=center><DIV id=pbProgPerc_' + i + '></div></td><TD><INPUT id=pbAscendBtn_' + Cities.cities[i].id + ' type=submit value="Ascend"></td><TD align=center><DIV id=pbCityPrestigeLevel_' + i + '></div></td><TD align=center><DIV id=pbGemCost_' + Cities.cities[i].id + '></div></td><TD align=center><CENTER><DIV id=pbAscCurMight_'+i+'></div></center></td>';
        }
        div.innerHTML = m;
        document.getElementById('pbBuildingValues').addEventListener('click', function(){t.paintHelp();});
    },
    paintHelp: function() {
    	var t = Tabs.ascension;
    	var helpText = translate("Ascension Building Values");
       	helpText += '<TABLE><TR><TD align=center>Building</td><TD align=center width=50>Lvl 1</td><TD align=center width=50>+1 Lvl</td></tr>';

       	helpText += '<TR><TD>Castle</td><TD><CENTER>10</center></td><TD><CENTER>+8</center></td></tr>';       	
       	helpText += '<TR><TD>Tavern</td><TD><CENTER>7</center></td><TD><CENTER>+6</center></td></tr>';
       	helpText += '<TR><TD>Knights Hall</td><TD><CENTER>7</center></td><TD><CENTER>+6</center></td></tr>';
       	helpText += '<TR><TD>Alchemy Lab</td><TD><CENTER>7</center></td><TD><CENTER>+6</center></td></tr>';
       	helpText += '<TR><TD>Rally Point</td><TD><CENTER>7</center></td><TD><CENTER>+6</center></td></tr>';
       	helpText += '<TR><TD>Wall</td><TD><CENTER>7</center></td><TD><CENTER>+6</center></td></tr>';
       	helpText += '<TR><TD>DRUID Barracks (field)</td><TD><CENTER>7</center></td><TD><CENTER>+6</center></td></tr>';
       	helpText += '<TR><TD>DRUID Apothecary (field)</td><TD><CENTER>6</center></td><TD><CENTER>+5</center></td></tr>';
       	helpText += '<TR><TD>Embassy</td><TD><CENTER>6</center></td><TD><CENTER>+5</center></td></tr>';
       	helpText += '<TR><TD>Market</td><TD><CENTER>6</center></td><TD><CENTER>+5</center></td></tr>';
       	helpText += '<TR><TD>Watch Tower</td><TD><CENTER>6</center></td><TD><CENTER>+5</center></td></tr>';
       	helpText += '<TR><TD>Spire</td><TD><CENTER>6</center></td><TD><CENTER>+5</center></td></tr>';
       	helpText += '<TR><TD>Apothecary</td><TD><CENTER>6</center></td><TD><CENTER>+5</center></td></tr>';
       	helpText += '<TR><TD>NORMAL Barracks</td><TD><CENTER>2</center></td><TD><CENTER>+2</center></td></tr>';
       	helpText += '<TR><TD>Cottage</td><TD><CENTER>2</center></td><TD><CENTER>+2</center></td></tr>';
       	helpText += '</table><TABLE>';
       	helpText += '<TR><TR><TD>These numbers are for every added level of a building. Whether you are building it to level 2 or level 10, it will only add this amount to the total, shown under this help button. Every buildings "might" value combines to give the total. Once it reaches 1200, you are at 100% and can level up again.</td></tr></tr>';
       	helpText += '</table>';

       	var pop = new pbPopup ('ascensionHelp', 0, 0, 400, 400, true);
       	pop.centerMe (mainPop.getMainDiv());  
       	pop.getMainDiv().innerHTML = helpText;
       	pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot '+translate("Help")+': '+translate("Ascension")+'</b></center>';
       	pop.show (true);
    },
    paintTab: function () {
        for (i = 0; i < Cities.cities.length; i++) {
            var cityPrestige = Seed.cityData.city[Cities.cities[i].id].cityValue;
            var cityPrestigeLevel = Seed.cityData.city[Cities.cities[i].id].prestigeInfo.prestigeLevel;
            var isPrestigeCity = Seed.cityData.city[Cities.cities[i].id].isPrestigeCity;
            var currentGemPrice = null;
            var fullPrestige = 1200;
            var progressWidth = parseInt(((cityPrestige / fullPrestige) * 100));
            if (progressWidth > 100) progressWidth = 100;
            var fullBarWidth = 378;
            var gemFullPrice = 1250;
            m += '<TR><TD>City ' + Cities.cities[i].name + ' - </td>';
            m += '<TR><TD style="background:https://koc-power-bot.googlecode.com/svn/trunk/progress_brown_bar.png" width=100% height=25">';
            if (isPrestigeCity) {
                if (cityPrestigeLevel < 3) {
                    document.getElementById('pbGreenBar_' + i).innerHTML = '<img src="https://koc-power-bot.googlecode.com/svn/trunk/progress_green_bar.png" width=' + progressWidth + '% height=25>'
                    document.getElementById('pbProgPerc_' + i).innerHTML = progressWidth + '%';
                    document.getElementById('pbCityPrestigeLevel_' + i).innerHTML = cityPrestigeLevel + '/3';
                    document.getElementById('pbAscCurMight_'+i).innerHTML = cityPrestige + '/1200';
                } else {
                    document.getElementById('pbGreenBar_' + i).innerHTML = '<CENTER><B>C O M P L E T E &nbsp;&nbsp;&nbsp; (for now)</center>'
                    document.getElementById('pbProgPerc_' + i).innerHTML = 'N/A';
                    document.getElementById('pbCityPrestigeLevel_' + i).innerHTML = 'N/A';
                    document.getElementById('pbAscCurMight_' + i).innerHTML = 'N/A';
                }
                m += '<TR>';
            } else {
                document.getElementById('pbGreenBar_' + i).innerHTML = '<CENTER><B>C I T Y &nbsp;&nbsp;&nbsp; N O T  &nbsp;&nbsp;&nbsp; A S C E N D E D &nbsp;&nbsp;&nbsp; Y E T</center>'
                document.getElementById('pbProgPerc_' + i).innerHTML = '<CENTER>N/A</center>';
                document.getElementById('pbCityPrestigeLevel_' + i).innerHTML = '<CENTER>0/3</center>';
                document.getElementById('pbAscCurMight_' + i).innerHTML = 'N/A';
            }
        }
    },
    clickCitySelect: function (city) {
        var t = Tabs.ascension;
        t.selectedCity = city;
        t.JumpCity(city);
        unsafeWindow.cm.PrestigeManagerController.open()
    },
    JumpCity: function (city) {
        var t = Tabs.ascension;
        for (i = 0; i < Seed.cities.length; i++) {
            if (Seed.cities[i][0] == city) var cityNum = i;
        }
        cityNum++;
        var obj = document.getElementById('citysel_' + cityNum);
        return t.ClickWin(window, obj, 'click');
    },
    ClickWin: function (win, obj, evtName) {
        var evt = win.document.createEvent("MouseEvents");
        evt.initMouseEvent(evtName, true, true, win, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        return !obj.dispatchEvent(evt);
    },
    getGemCost: function (cityId, callback) {
        var t = Tabs.ascension;
        var isPrestigeCity = Seed.cityData.city[cityId].isPrestigeCity;
        var cityPrestigeLevel = Seed.cityData.city[Cities.cities[i].id].prestigeInfo.prestigeLevel;
        if (isPrestigeCity && cityPrestigeLevel < 3) {
            var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
            params.cid = cityId;
            params.prestigeType = 1;
            new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getPrestigeCost.php" + unsafeWindow.g_ajaxsuffix, {
                method: "post",
                parameters: params,
                onSuccess: function (rslt) {
                    if (rslt.ok) {
                        callback(cityId, rslt.cost, rslt.original_cost)
                    }
                }
            });
        } else {
            callback(cityId, null, null)
        }
    },
    show: function () {
        var t = Tabs.ascension;
        t.Timer = setInterval(t.paintTab, 1000)
        for (i = 0; i < Cities.cities.length; i++) {
            document.getElementById('pbAscendBtn_' + Cities.cities[i].id).addEventListener('click', function () {
                var t = Tabs.ascension
                var what = this.id.substr(12); // strip first 12 char's -> pbAscendBtn_
                t.clickCitySelect(what);
            });
            var isPrestigeCity = Seed.cityData.city[Cities.cities[i].id].isPrestigeCity;
            if (isPrestigeCity) {
                t.getGemCost(Cities.cities[i].id, function (cid, cost, origCost) {
                    if (cost < 0 || cost == null || origCost == null) {
                        document.getElementById('pbGemCost_' + cid).innerHTML = '<CENTER>Max</center>';
                    } else {
                        document.getElementById('pbGemCost_' + cid).innerHTML = '<CENTER>' + cost + '/' + origCost + '</center>';
                    }
                })
            } else {
                document.getElementById('pbGemCost_' + Cities.cities[i].id).innerHTML = '<CENTER>Not Ascended</center>';
            }
        }
    },
    hide: function () {
        var t = Tabs.ascension;
        clearInterval(t.Timer)
    },
}

/**************************** Inventory Tab ****************************************/
Tabs.Inventory = {
myDiv: null,
general: [],
combat: [],
resources: [],
chest: [],
court: [],
type: null,
queue:[],
isBusy:false,
counter:0,
max:0,

	init: function(div){
		var t = Tabs.Inventory;
		t.myDiv = div;
		var m = "<DIV class=pbStat>Inventory Tab</div>\
		<CENTER><span class=boldRed>***Use at own risk***</span></center>\
		<TABLE width=100% ><TR>\
		<TD width=50%><input type=submit id=pbinventory_general value='General' />\
		<input type=submit id=pbinventory_combat value='Combat' />\
		<input type=submit id=pbinventory_resources value='Resources' />\
		<input type=submit id=pbinventory_chest value='Chest' />\
		<input type=submit id=pbinventory_court value='Court' /></td>\
		<TD width=50% align=center ><input type=submit id=pbinventory_start value='Start' /></td>\
		</tr></table>\
		<DIV class=pbStat>Items</div>\
		<DIV id=pbinventory></div>\
		<DIV id=pbinventory_info></div>";
		t.myDiv.innerHTML = m;
		t.sort_Items();
		$("pbinventory_general").addEventListener('click', t.display_general, false);
		$("pbinventory_combat").addEventListener('click', t.display_combat, false);
		$("pbinventory_resources").addEventListener('click', t.display_resources, false);
		$("pbinventory_chest").addEventListener('click', t.display_chest, false);
		$("pbinventory_court").addEventListener('click', t.display_court, false);
		$("pbinventory_start").addEventListener('click', t.start, false);

		$("pbinventory_general").click();
	},
	sort_Items : function (){
		var t = Tabs.Inventory;
		for(var k in unsafeWindow.ksoItems){
			var item = unsafeWindow.ksoItems[k];
			if(item.count > 0 && item.usable){
				if(item.category == 1)t.general.push(item);
				if(item.category == 3) t.combat.push(item);	
				if(item.category == 4)t.resources.push(item);
				if(item.category == 5)t.chest.push(item);	
				if(item.category == 6)t.court.push(item);
			}
		}
	},
	display_general : function (){
		var t = Tabs.Inventory;
		t.type = "general";
		var div = document.getElementById("pbinventory");
		var count = 0;
		var m = "<TABLE>";
		m += "<TR><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='10px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='20px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td></tr><TR>";
		for (var k in t.general){
			var item = t.general[k];
			if(!item.name) continue;
			m += (count%3 == 0)?"<TR>":"<TD width='10px'>&nbsp;</td>";
			m += "<TD><input type=checkbox class='pbinv_general' data-ft='"+JSON.stringify(item)+"' /></td>";
			m += "<TD><img width='20px' height='20px' src='https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/"+item.id+".jpg' /> "+item.name+"</td>";
			m += "<TD><input type=text size=3 id='pb_inv_general_"+item.id+"' /></td>";
			m += "<TD>"+item.count+"</td>";
			m += (count%3 == 2)?"</tr>":"";
			count++;
		}
		m += "</table>";
		div.innerHTML = (count!=0)?m:"<CENTER>No useable items in this category</CENTER>";
	},
	display_combat : function (){
		var t = Tabs.Inventory;
		t.type = "combat";
		var div = document.getElementById("pbinventory");
		var count = 0;
		var m = "<TABLE>";
		m += "<TR><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='10px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='20px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td></tr><TR>";
		for (var k in t.combat){
			var item = t.combat[k];
			if(!item.name) continue;
			m += (count%3 == 0)?"<TR>":"<TD width='10px'>&nbsp;</td>";
			m += "<TD><input type=checkbox class='pbinv_combat' data-ft='"+JSON.stringify(item)+"' /></td>";
			m += "<TD><img width='20px' height='20px' src='https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/"+item.id+".jpg' /> "+item.name+"</td>";
			m += "<TD><input type=text size=3 id='pb_inv_combat_"+item.id+"' /></td>";
			m += "<TD>"+item.count+"</td>";
			m += (count%3 == 2)?"</tr>":"";
			count++;
		}
		m += "</table>";
		div.innerHTML = (count!=0)?m:"<CENTER>No useable items in this category</CENTER>";
	},
	display_resources : function (){
		var t = Tabs.Inventory;
		t.type = "resources";
		var div = document.getElementById("pbinventory");
		var count = 0;
		var m = "<TABLE>";
		m += "<TR><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='10px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='20px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td></tr><TR>";
		for (var k in t.resources){
			var item = t.resources[k];
			if(!item.name) continue;
			m += (count%3 == 0)?"<TR>":"<TD width='10px'>&nbsp;</td>";
			m += "<TD><input type=checkbox class='pbinv_resources' data-ft='"+JSON.stringify(item)+"' /></td>";
			m += "<TD><img width='20px' height='20px' src='https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/"+item.id+".jpg' /> "+item.name+"</td>";
			m += "<TD><input type=text size=3 id='pb_inv_resources_"+item.id+"' /></td>";
			m += "<TD>"+item.count+"</td>";
			m += (count%3 == 2)?"</tr>":"";
			count++;
		}
		m += "</table>";
		div.innerHTML = (count!=0)?m:"<CENTER>No useable items in this category</CENTER>";
	},
	display_chest : function (){
		var t = Tabs.Inventory;
		t.type = "chest";
		var div = document.getElementById("pbinventory");
		var count = 0;
		var m = "<TABLE>";
		m += "<TR><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='10px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='20px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td></tr><TR>";
		for (var k in t.chest){
			var item = t.chest[k];
			if(!item.name) continue;
			m += (count%3 == 0)?"<TR>":"<TD width='10px'>&nbsp;</td>";
			m += "<TD><input type=checkbox class='pbinv_chest' data-ft='"+JSON.stringify(item)+"' /></td>";
			m += "<TD><img width='20px' height='20px' src='https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/"+item.id+".jpg' /> "+item.name+"</td>";
			m += "<TD><input type=text size=3 id='pb_inv_chest_"+item.id+"' /></td>";
			m += "<TD>"+item.count+"</td>";
			m += (count%3 == 2)?"</tr>":"";
			count++;
		}
		m += "</table>";
		div.innerHTML = (count!=0)?m:"<CENTER>No useable items in this category</CENTER>";
	},
	display_court : function (){
		var t = Tabs.Inventory;
		t.type = "court";
		var div = document.getElementById("pbinventory");
		var count = 0;
		var m = "<TABLE>";
		m += "<TR><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='10px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='20px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td></tr><TR>";
		for (var k in t.court){
			var item = t.court[k];
			if(!item.name) continue;
			m += (count%3 == 0)?"<TR>":"<TD width='10px'>&nbsp;</td>";
			m += "<TD><input type=checkbox class='pbinv_court' data-ft='"+JSON.stringify(item)+"' /></td>";
			m += "<TD><img width='20px' height='20px' src='https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/"+item.id+".jpg' /> "+item.name+"</td>";
			m += "<TD><input type=text size=3 id='pb_inv_court_"+item.id+"' /></td>";
			m += "<TD>"+item.count+"</td>";
			m += (count%3 == 2)?"</tr>":"";
			count++;
		}
		m += "</table>";
		div.innerHTML = (count!=0)?m:"<CENTER>No useable items in this category</CENTER>";
	},
	start : function (){
		var t = Tabs.Inventory;
		if(t.isBusy){
			t.isBusy = false;
			$("pbinventory_start").value = "Start";
		} else {
			t.isBusy = true;
			$("pbinventory_start").value = "Stop";
			t.queue = [];
			$("pbinventory_info").innerHTML = "";
			var nodes = document.getElementsByClassName("pbinv_"+t.type);
			for(var i = 0; i < nodes.length; i++){
				if(nodes[i].checked){
					try{
						t.queue.push(JSON.parse(nodes[i].getAttribute("data-ft")));
					} catch (e){
						logit(inspect(e,7,1));
					}
				}
			}
			if(t.queue.length > 0) t.nextqueue();
		}
	},
	nextqueue : function (){
		var t = Tabs.Inventory;
		if(!t.isBusy)
		return;
		var div = $("pbinventory_info");
		var m = document.createElement('span');
		if(t.queue.length > 0){
			var item = t.queue[0];
			t.counter = 0;
			t.max = parseIntNan($("pb_inv_"+t.type+"_"+item.id).value);
			m.innerHTML = "<span id='pb_inv_info_"+item.id+"'>Using item "+item.name+" <span id='pb_inv_info_count_"+item.id+"'>1</span> of <span id='pb_inv_info_max_"+item.id+"'>"+t.max+"</span>. Left <span id='pb_inv_info_left_"+item.id+"'>"+(t.max-t.counter)+"</span> <span id='pb_inv_info_extra_"+item.id+"'> </span></span><br />";
		} else {
			m.innerHTML = "Completed! \n";
			t.isBusy = false;
			$("pbinventory_start").value = "Start";
		}
		if(div.firstChild){
			div.insertBefore(m, div.firstChild);
		} else {
			div.appendChild(m);
		}
		t.useitem();
	},
	useitem : function (){
		var t = Tabs.Inventory;
		if(!t.isBusy) return;
		var item = t.queue[0];
		unsafeWindow.cm.ItemController.use(item.id);
		setTimeout(t.wait, 250, 0);
	},
	wait : function (retries){
		var t = Tabs.Inventory;
		if(!t.isBusy) return;
		var item = t.queue[0];
		item = unsafeWindow.ksoItems[item.id];
		t.queue[0] = item;
		t.counter++;
		$("pb_inv_info_count_"+item.id).innerHTML = t.counter;
		$("pb_inv_info_left_"+item.id).innerHTML = (t.max-t.counter);
		if(t.counter >= t.max){
			$("pb_inv_info_extra_"+item.id).innerHTML = "All done";
			t.queue.shift();
			t.nextqueue();
			return;
		}
		$("pb_inv_info_extra_"+item.id).innerHTML = "Done. Wait for 1 second..";
		setTimeout(t.useitem, 150);
	},
show: function (){},
hide: function (){}
}

/**************************** TurboSearch Tab ****************************************/
Tabs.TurboSearch = {
myDiv: null,
tileTypes:{0:"Bog",10:"Grassland",11:"Lake",20:"Woods",30:"Hills",40:"Mountain",50:"Plain",51:"City",52:"Ruin",53:"Misted City",54:"Dark Forest"},
rankings:{},

	init: function(div){
		var t = Tabs.TurboSearch;
		t.myDiv = div;
		unsafeWindow.pbExportToRaid = t.ExportToRaid;

		var m = '<DIV class=pbStat>Turbo Search</div>';
		m+= '<BR><B>Search from: </b><SPAN id=TScityPick></span>&nbsp&nbsp&nbspX:&nbsp<INPUT id=TSfromX maxlength=3 type=text>&nbsp&nbsp&nbspY:&nbsp<INPUT id=TSfromY maxlength=3 type=text>';
		m+= '&nbsp&nbsp&nbsp&nbsp&nbsp&nbspRadius (Blocks):&nbsp<select id=TSselectRadius>';
		for (var i=5;i<=45;i+=5) m+='<option value='+i+'>'+i+'</option>';
		m+= '</select>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<INPUT id=TSsearchButton type=submit value="Start Search">';
		m+= '<BR><BR><DIV class=pbStat>Search Results&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<INPUT id=TSscoutButton type=submit value="Scout"></div>';
		m+= '<TABLE id=TSleftMain width=100% class=pbTab><TD style="vertical-align:top;"><DIV style="width:150px;max-width:150px;overflow:auto;" id=TSleft></div></td><TD style="text-align:left;vertical-align:top;"><DIV style="max-width:700px;height:450px;max-height:450px;overflow:auto"id=TSright></div></td></table>';

		t.myDiv.innerHTML = m;
		
		t.from = new CdispCityPicker ('pbSearchPicker', document.getElementById ('TScityPick'), true, t.citySelNotify,0);
		t.from.bindToXYboxes(document.getElementById ('TSfromX'), document.getElementById ('TSfromY'));
		document.getElementById('TSselectRadius').value = 10;
		document.getElementById('TSsearchButton').addEventListener ('click', function (){
			if (document.getElementById('TSfromX').value==""  && document.getElementById('TSfromY').value== "") {alert("Please select a city or enter coords.");return;}
			document.getElementById('TSsearchButton').disabled = true;
			document.getElementById('TSsearchButton').value = "Searching";
      		var blocks = MakeBlocks(parseInt(document.getElementById('TSfromX').value), parseInt(document.getElementById('TSfromY').value), parseInt(document.getElementById('TSselectRadius').value));	
      		t.doSearch(blocks, parseInt(document.getElementById('TSfromX').value), parseInt(document.getElementById('TSfromY').value), t.searchDone);
      	}, false);
      	document.getElementById('TSscoutButton').addEventListener ('click', function (){
      		var list =[];
      		var element_class = document.getElementsByClassName('TSscout');
    		for (k=0;k<element_class.length;k++) if (element_class[k].checked) list.push(element_class[k].id);
    		t.doAddScout(list);
      	}, false);
	},

	CheckCityMarches:function(cityID){
		var Counter=0;
		if (Seed.queue_atkp['city'+ cityID] != undefined) {
			for (atkp in Seed.queue_atkp['city'+ cityID]) if (Seed.queue_atkp['city'+ cityID][atkp]["marchUnixTime"]) Counter++;
		} else Counter=0;
		return Counter;
	},

	doAddScout : function (list){
	  	var t = Tabs.TurboSearch;
	  	var count = -1;
	  	var city="";
	  	slots = t.CheckCityMarches(t.from.city.id);
		rallypointlevel = getRallypoint(t.from.city.id);
	  	for (var k=0;k<list.length;k++){		
	  		var coords = list[k].substr(14);
	  		var array = coords.split(',');
	  		if (array[0] != undefined && array[1] != undefined){
	  			var x = array[0];
	  			var y = array[1];
		  		count++;
	  			setTimeout(t.doScout,1500*count, x,y,list[k]);
	  		}
	  	}
  	},

  	doScout : function (x,y,box) {
  	var t = Tabs.TurboSearch;
	  	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid= t.from.city.id;
	    params.type = 3
	    params.kid = 0
	    params.xcoord = x;
	    params.ycoord = y;
	  	params.u3 = 1;
	  	params.gold = 0;
	  	params.r1 = 0;
	  	params.r2 = 0;
	  	params.r3 = 0;
	  	params.r4 = 0;
	  	params.r5 = 0;

		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
			    method: "post",
			    parameters: params,
			    loading: true,
			    onSuccess: function (rslt) {
			        var t = Tabs.AllianceList;  
			        if (rslt.ok) {
			        	var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
				        var ut = unsafeWindow.unixtime();
				        var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
				        for(i = 0; i <= unitsarr.length; i++){
				           	if(params["u"+i]){
				             	unitsarr[i] = params["u"+i];
				           	}
				        }
				        var resources=new Array();
				        resources[0] = params.gold;
				        for(i=1; i<=4; i++){
				           	resources[i] = params["r"+i];
				        }
				        var currentcityid =  params.cid;
				        unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
				        unsafeWindow.update_seed(rslt.updateSeed)
				        if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
				        document.getElementById(box).checked = false;        
			        }
			    }, 
			    onFailure: function () {},
		});
  	},


	searchDone: function(data, userInfo, allianceNames, fromX, fromY){
		var t = Tabs.TurboSearch;
		var dist = 0;
		mapDat = [];
		for (var i in data) {
			dist_i = distance(fromX, fromY, data[i].xCoord, data[i].yCoord)
			mapDat.push({
				xCoord: 		data[i].xCoord,
				yCoord: 		data[i].yCoord,
				dist: 			dist_i,
				tileType: 		data[i].tileType,
				tileLevel: 		data[i].tileLevel,
				tileUserId: 	data[i].tileUserId,
				cityName: 		data[i].cityName,
				tileCityId: 	data[i].tileCityId,
				cityNum:  		data[i].cityNum,
			});
		}
    	mapDat = mapDat.sort(function sort(a,b) {a = a['dist'];b = b['dist'];return a == b ? 0 : (a < b ? -1 : 1);});			
		var left = '<input id=RadioALL type="radio" name="TStypes" value="ALL">ALL';
		left += '<BR><input id=RadioCities type="radio" name="TStypes" value="Cities">Cities';
		left += '<BR><input id=RadioBarb type="radio" name="TStypes" value="Barb Camps">Barb Camps';
		left += '<BR><input id=RadioWild type="radio" name="TStypes" value="Wilderness">Wilderness:';
		left += '<BR>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<select id=TSwildType>';
		left += '<option value=ALL>ALL</option><option value=99>Grass./Lake</option><option value=20>Woodland</option><option value=30>Hills</option><option value=40>Mountain</option><option value=50>Plain</option><option value=54>Dark Forest</option></select>';
		left += '<BR>___________________<BR>';
		left += '<INPUT type=checkbox id=TSunowned checked=true><SPAN id=DIVunowned></span>';
		left += '<BR><SPAN id=DIVminLevel></span><select id=TSminLevel>';
		for (var i=1;i<=10;i++) left+='<option value='+i+'>'+i+'</option>';
        left += '</select><BR><SPAN id=DIVmaxLevel></span><select id=TSmaxLevel>';
		for (var i=1;i<=10;i++) left+='<option value='+i+'>'+i+'</option>';
		left += '</select>';	
		left += '<BR>___________________<BR>';
		left += '<INPUT type=checkbox id=TSallied checked=true><SPAN id=DIVallied></span>';		
		left += '<BR>&nbsp&nbsp&nbsp&nbsp<INPUT type=checkbox id=TSmisted checked=true><SPAN id=DIVmisted></span>';
		left += '<BR>&nbsp&nbsp&nbsp&nbsp<INPUT type=checkbox id=TShostile checked=true><SPAN id=DIVhostile></span>';
		left += '<BR>&nbsp&nbsp&nbsp&nbsp<INPUT type=checkbox id=TSfriendly checked=true><SPAN id=DIVfriendly></span>';
		left += '<BR>&nbsp&nbsp&nbsp&nbsp<INPUT type=checkbox id=TSfriendlyToUs checked=true><SPAN id=DIVfriendlyToUs></span>';
		left += '<BR>&nbsp&nbsp&nbsp&nbsp<INPUT type=checkbox id=TSneutral checked=true><SPAN id=DIVneutral></span>';
		left += '<BR><INPUT type=checkbox id=TSunAllied checked=true><SPAN id=DIVunAllied></span>';
		left += '<BR><BR><SPAN id=DIVmight></span>';
		left += '<BR><SPAN id=DIVmightMin></span><INPUT id=TSmightMin size=4 maxlength=4 type=text value='+parseInt(Options.SearchMightMin)+'>';
		left += '<BR><SPAN id=DIVmightMax></span><INPUT id=TSmightMax size=4 maxlength=4 type=text value='+parseInt(Options.SearchMightMax)+'>';
		
		left += '<BR><BR><INPUT type=checkbox id=TSfilerTop disabled=true unchecked=true><SPAN id=DIVfilterTop></span>';
		left += '<BR>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<select id=TStopMin>';
		for (var i=1;i<=19;i++) left+='<option value='+i+'>'+i+'</option><';
		left += '</select>&nbsp&nbsp<SPAN id=DIVtop></span>&nbsp&nbsp<select id=TStopMax>';
		for (var i=2;i<=20;i++) left+='<option value='+i+'>'+i+'</option>';
		left += '</select>';	

		document.getElementById('TSleft').innerHTML = left;
      	document.getElementById('TSsearchButton').value = "Start Search";
      	document.getElementById('TSsearchButton').disabled = false;
      	document.getElementById('TSminLevel').addEventListener ('change', function (){
      		Options.srcMinLevel = document.getElementById('TSminLevel').value;
      		saveOptions();
      		t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);
      	}, false);
      	document.getElementById('TSmaxLevel').addEventListener ('change', function (){
      		Options.srcMaxLevel = document.getElementById('TSmaxLevel').value;
      		saveOptions();
      		t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);
      	}, false);
      	document.getElementById('TSmightMin').addEventListener ('change', function (){
      		Options.SearchMightMin = document.getElementById('TSmightMin').value;
      		saveOptions();
      		t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);
      	}, false);
      	document.getElementById('TSmightMax').addEventListener ('change', function (){
      		Options.SearchMightMax = document.getElementById('TSmightMax').value;
      		saveOptions();
      		t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);
      	}, false);
      	document.getElementById('TSfilerTop').addEventListener ('change', function (){
      		if (document.getElementById('TSfilerTop').disabled) {
      			document.getElementById('TStopMin').disabled = true;
				document.getElementById('TStopMax').disabled = true;
				document.getElementById('DIVfilterTop').innerHTML = '<FONT color=grey>Filter alliances Rank:</font>';
				document.getElementById('DIVtop').innerHTML = '<FONT color=grey>to</font>';
      		} else {
      			document.getElementById('TStopMin').disabled = false;
				document.getElementById('TStopMax').disabled = false;
				document.getElementById('DIVfilterTop').innerHTML = '<FONT color=black>Filter alliances Rank:</font>';
				document.getElementById('DIVtop').innerHTML = '<FONT color=black>to</font>';
      		}
      		t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);
      	}, false);

      	document.getElementById('RadioALL').addEventListener ('click', function (){t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);}, false);
      	document.getElementById('RadioCities').addEventListener ('click', function (){t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);}, false);
      	document.getElementById('RadioBarb').addEventListener ('click', function (){t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);}, false);
      	document.getElementById('RadioWild').addEventListener ('click', function (){t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);}, false);
      	document.getElementById('TSwildType').addEventListener ('change', function (){t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);}, false);
      	document.getElementById('TSunowned').addEventListener ('click', function (){t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);}, false);
      	document.getElementById('TSmisted').addEventListener ('click', function (){t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);}, false);
      	document.getElementById('TShostile').addEventListener ('click', function (){t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);}, false);
      	document.getElementById('TSfriendly').addEventListener ('click', function (){t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);}, false);
      	document.getElementById('TSfriendlyToUs').addEventListener ('click', function (){t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);}, false);
      	document.getElementById('TSneutral').addEventListener ('click', function (){t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);}, false);
      	document.getElementById('TSallied').addEventListener ('click', function (){t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);}, false);
      	document.getElementById('TSunAllied').addEventListener ('click', function (){t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);}, false);
      	document.getElementById('TStopMin').addEventListener ('change', function (){t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);}, false);
      	document.getElementById('TStopMax').addEventListener ('change', function (){t.checkData(mapDat, userInfo, allianceNames, fromX, fromY);}, false);
      	document.getElementById('RadioALL').checked = true;
      	document.getElementById('TSminLevel').value = Options.srcMinLevel;
      	document.getElementById('TSmaxLevel').value = Options.srcMaxLevel;
      	document.getElementById('TStopMin').value = 1;
      	document.getElementById('TStopMax').value = 10;
      	t.checkData(mapDat, userInfo, allianceNames, fromX, fromY)      	
	},

	checkData: function(mapDat, userInfo, allianceNames, fromX, fromY){
		var t = Tabs.TurboSearch;
		t.checkOptions();
		var Dip = Seed.allianceDiplomacies;
		var data = "<TABLE id=dbMain width=100% class=pbTab>";
		data += '<TR><TD>&nbsp</td><TD><B>Coords</b></td><TD><B>Dist</b></td><TD><B>Type (#)</b></td><TD><B>Lvl</b></td><TD><B>Might</b></td><TD>&nbsp</td><TD><B>Player</b></td><TD><B>Name</b></td><TD><B>Alliance</b></td></tr>';
      	for (var i in mapDat) {
      		if (mapDat[i].xCoord != undefined) {
      			var tileType = parseInt(mapDat[i].tileType);
      			if (document.getElementById('RadioALL').checked) {
      				data += t.paintData(mapDat[i], userInfo, allianceNames, fromX, fromY);
      			} 
      			if (document.getElementById('RadioCities').checked) {
      				if ((tileType == 51 || tileType== 53) && mapDat[i].tileCityId != null ) {
	      				var allianceID = 0;
	      				if (userInfo['u'+mapDat[i].tileUserId]) allianceID = parseInt(userInfo['u'+mapDat[i].tileUserId]["a"]);
	      				var diplomacy = 0;
	      				var Might = 0;
	      				if (userInfo['u'+mapDat[i].tileUserId]) Might = Math.round(userInfo['u'+mapDat[i].tileUserId]["m"]);
	      				var misted, hostile, friendly, friendlyToUs,neutral, allied, mightCheck, A_check;
	      				misted = hostile =  friendly = friendlyToUs = neutral = allied = mightCheck = A_check = false;
	      				var top = true;
	      				if (Dip.friendly && Dip.friendly['a'+allianceID]) diplomacy = 1;
		  				if (Dip.hostile && Dip.hostile['a'+allianceID]) diplomacy = 2;
		  				if (Dip.friendlyToYou && Dip.friendlyToYou['a'+allianceID]) diplomacy = 3;
		  				if (Dip.allianceId == allianceID) diplomacy = 1;
		  				if (allianceID > 0 || tileType== 53) allied =true;
		  				if (Might >= (Options.SearchMightMin*1000000) && Might <= (Options.SearchMightMax* 1000000)) mightCheck =true;
						if (document.getElementById('TSallied').checked && allied) A_check = true;
	      				 else if (document.getElementById('TSallied').checked && allied) A_check = false;
	      				if (document.getElementById('TSunAllied').checked && !allied) A_check = true;
	      				 else if (document.getElementById('TSunAllied').checked && !allied) A_check = false;
		  				if (document.getElementById('TSmisted').checked && tileType== 53) misted = true;
	      				 else if (document.getElementById('TSmisted').checked && tileType==51) misted = false;
	      				if (document.getElementById('TShostile').checked && diplomacy==2) hostile = true;
	      				 else if (document.getElementById('TShostile').checked && tileType==2) hostile = false;
	      				if (document.getElementById('TSfriendly').checked && diplomacy==1) friendly = true;
	      				 else if (document.getElementById('TSfriendly').checked && tileType==1) friendly = false;
	      				if (document.getElementById('TSfriendlyToUs').checked && diplomacy==3) friendlyToUs = true;
	      				 else if (document.getElementById('TSfriendlyToUs').checked && tileType==3) friendlyToUs = false;
	      				if (document.getElementById('TSneutral').checked && diplomacy==0) neutral = true;
	      				 else if (document.getElementById('TSneutral').checked && tileType==0) neutral = false;
	      				if (!allied) neutral = true;
	      				if (misted) mightCheck = true;
	      				if (document.getElementById('TSfilerTop').checked && t.rankings[allianceID] >= document.getElementById('TStopMin').value && t.rankings[allianceID] <= document.getElementById('TStopMax').value) top = false;
	      				if ((misted || hostile || friendly || friendlyToUs ||  neutral) && A_check && mightCheck && top) data += t.paintData(mapDat[i], userInfo, allianceNames, fromX, fromY);	
	      			}
      			}
      			if (document.getElementById('RadioBarb').checked) {
      				if (tileType == 51 && mapDat[i].tileCityId == null && parseInt(mapDat[i].tileLevel)>=Options.srcMinLevel && parseInt(mapDat[i].tileLevel)<=Options.srcMaxLevel) data += t.paintData(mapDat[i], userInfo, allianceNames, fromX, fromY);
      			}
      			if (document.getElementById('RadioWild').checked && tileType != 51 && tileType != 53) {
      				if (document.getElementById('TSunowned').checked && mapDat[i].tileCityId == null) var unownedOnly = true;
      				 else if (document.getElementById('TSunowned').checked) var unownedOnly = false;
      				  else var unownedOnly = true;
      				var filter = document.getElementById('TSwildType').value;
      				if ((tileType==10 || tileType==11) && filter==99) if (unownedOnly && parseInt(mapDat[i].tileLevel)>=Options.srcMinLevel && parseInt(mapDat[i].tileLevel)<=Options.srcMaxLevel)	data += t.paintData(mapDat[i], userInfo, allianceNames, fromX, fromY);
      				if (tileType == filter && unownedOnly && parseInt(mapDat[i].tileLevel)>=Options.srcMinLevel && parseInt(mapDat[i].tileLevel)<=Options.srcMaxLevel)	data += t.paintData(mapDat[i], userInfo, allianceNames, fromX, fromY);
					if (filter == "ALL" && unownedOnly && parseInt(mapDat[i].tileLevel)>=Options.srcMinLevel && parseInt(mapDat[i].tileLevel)<=Options.srcMaxLevel)	data += t.paintData(mapDat[i], userInfo, allianceNames, fromX, fromY);
      			}  

   	      	}
      	}
      	document.getElementById('TSright').innerHTML = data;
      	var uList = [];
	    for(k in mapDat) if(mapDat[k].tileUserId != null) uList.push(mapDat[k].tileUserId);
	    t.fetchPlayerStatus(uList);
	},

	paintData: function(mapDat, userInfo, allianceNames, fromX, fromY){
  		var t = Tabs.TurboSearch;
   		var Dip = Seed.allianceDiplomacies;
   		//Checkbox
   		data = '<TR><TD><INPUT class=TSscout id=ScoutCheckbox_'+mapDat.xCoord+","+mapDat.yCoord+' type=checkbox unchecked=true></td>'; 
   		//Coords
   		data+= '<TD>'+coordLink(mapDat.xCoord,mapDat.yCoord)+'</td>';
  		//Distance
  		data+= '<TD>'+mapDat.dist+'</td>';
  		//Tile Type
  		var tileType = parseInt(mapDat.tileType);
  		if (tileType == 51 && mapDat.tileCityId == null) tileType = 'Barb Camp';
  		 else tileType = t.tileTypes[parseInt(mapDat.tileType)];
  		data+= '<TD>'+tileType;
  		if (parseInt(mapDat.tileType) == 51 && mapDat.tileCityId != null) data += ' (' + mapDat.cityNum+ ')'; 
  		data+= '</td>';
  		//Tile Level
  		if (mapDat.tileLevel > 0) data+= '<TD>'+mapDat.tileLevel+'</td>';
  		else data+= '<TD>??</td>';	
  		//Might
  		if (mapDat.tileUserId != null && mapDat.tileUserId != 0) data+= '<TD align=right>'+addCommas(Math.round(userInfo['u'+mapDat.tileUserId]["m"]))+'</td>';
  		  else data+= '<TD></td>';
  		//Space
  		data+='<TD>&nbsp</td>';
  		//Player
  		if (mapDat.tileUserId != null && mapDat.tileUserId != 0) data+= '<TD><SPAN class="DIVonline_'+mapDat.tileUserId+'"></span>'+userInfo['u'+mapDat.tileUserId]["n"]+'</td>';
  		 else if (mapDat.tileUserId == 0) data+= '<TD>???</td>';
  		  else data+= '<TD>---</td>';
  		//City Name
  		if (mapDat.cityName != null) data+= '<TD>'+mapDat.cityName+'</td>';
  		else if (mapDat.tileUserId == 0) data+= '<TD>???</td>';
  		 else data+= '<TD>---</td>';
  		//Alliance Name
  		if (mapDat.tileUserId != null && mapDat.tileUserId != 0) {
  			var allianceID = userInfo['u'+mapDat.tileUserId]["a"];
  			if (allianceID != 0) {
  				var color = "black";
  				if (Dip.friendly && Dip.friendly['a'+allianceID]) color = "green";
  				if (Dip.hostile && Dip.hostile['a'+allianceID]) color = "red";
  				if (Dip.friendlyToYou && Dip.friendlyToYou['a'+allianceID]) color = "orange";
  				if (Dip.allianceId == allianceID) color = "blue";
  				data+= '<TD><FONT color='+color+'>'+allianceNames['a'+allianceID]+'</font></td>'; 
  			} else data+= '<TD>---</td>'; 
  		} else if (mapDat.tileUserId == 0) data+= '<TD>???</td>';
  		   else if (parseInt(mapDat.tileType) == 51 && mapDat.tileCityId == null) data+='<TD><A onclick="pbExportToRaid('+ mapDat.xCoord +','+ mapDat.yCoord +')">Export</td>';
  		  	else data+= '<TD>---</td>';	
      	return data;
	},

	ExportToRaid : function (X,Y){
		var t = Tabs.TurboSearch;
		var cityId = t.from.city.id;
	    var pop = new pbPopup ('pbExportRaid', 0,0, 750,255, true);
	    if (t.popFirst){pop.centerMe (mainPop.getMainDiv());  t.popFirst = false;}
	    pop.getTopDiv().innerHTML = '<CENTER><B>Export to Raid</b></center>';   
	    var m = '<TABLE id=pbRaidAdd width=100% height=0% class=pbTab><TR>';      
	    for (i=1;i<=5;i++)		m+='<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_30_s34.jpg"><TD align=left>'+ addCommas(Seed.units['city'+cityId]['unt'+i]) +'</td>';
		m+='</tr><TR>';
		for (i=1;i<=5;i++)		m+='<TD><INPUT id="Unit'+i+'" type=text size=6 maxlength=6 value="0"></td>';
	    m+='</tr><TR>';
		for (i=6;i<=10;i++)		m+='<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_30_s34.jpg"><TD align=left>'+ addCommas(Seed.units['city'+cityId]['unt'+i]) +'</td>';
		m+='</tr><TR>';
		for (i=6;i<=10;i++)		m+='<TD><INPUT id="Unit'+i+'" type=text size=6 maxlength=6 value="0"></td>';
	    m+='</tr><TR>';
		for (i=11;i<=15;i++)	m+='<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_30_s34.jpg"><TD align=left>'+ addCommas(Seed.units['city'+cityId]['unt'+i]) +'</td>';
		m+='</tr><TR>';
		for (i=11;i<=15;i++)	m+='<TD><INPUT id="Unit'+i+'" type=text size=6 maxlength=6 value="0"></td>';
	    m+='</tr></table>';
	    m+= '<BR><CENTER>' +strButton20(translate('Help'), 'id=pbHelp')+'<SELECT id=RaidKnights type=list></select></center>';
	    m+= '<BR><CENTER>'+ strButton20(translate('Raid and save'), 'id=pbRaidSave') +'</center>';        
	    pop.getMainDiv().innerHTML = m;
	    t.getKnights(); 
	    document.getElementById ('pbHelp').addEventListener ('click', t.helpPop, false);
	    document.getElementById ('pbRaidSave').addEventListener ('click', function(){
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);                       
        params.pf = 0;
        params.ctrl = 'BotManager';
        params.action = 'saveMarch';
        params.settings = {};
        params.settings.cityId = cityId;
        params.queue = {0:{botMarches:{botMarchStatus:1,botState:1},cityMarches:{}}};        
        params.queue[0].cityMarches.knightId = parseInt(document.getElementById ('RaidKnights').value);
        params.queue[0].cityMarches.toXCoord = X;
        params.queue[0].cityMarches.toYCoord = Y;
        params.queue[0].cityMarches.unit0Count = 0;
        for (var i=1;i<=15;i++) params.queue[0].cityMarches['unit'+i+'Count'] = parseInt(document.getElementById ('Unit'+i).value);	
		new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
                      method: "post",
                     parameters: params,
                     loading: true,
                     onSuccess: function(transport){
                        var rslt = eval("(" + transport.responseText + ")");
                        if (rslt.ok) {
                            pop.show (false);
                            unsafeWindow.cityinfo_army();
                          	setTimeout(unsafeWindow.update_seed_ajax, 250);
                        } else ('Error :' + rslt.msg);
                     },
             });
        }, false); 
    	pop.show (true);
	},

	getKnights : function(){
        var t = Tabs.TurboSearch;
        var knt = new Array();
        cityId = t.from.city.id;
	    for (k in Seed.knights['city' + cityId]){
            if (Seed.knights['city' + cityId][k]["knightStatus"] == 1 && Seed.leaders['city' + cityId]["resourcefulnessKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["politicsKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["combatKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["intelligenceKnightId"] != Seed.knights['city' + cityId][k]["knightId"]){
                knt.push ({Name:   Seed.knights['city' + cityId][k]["knightName"],Combat:    parseInt(Seed.knights['city' + cityId][k]["combat"]),ID:        Seed.knights['city' + cityId][k]["knightId"],});
            }
	    }
        knt = knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
        document.getElementById('RaidKnights').options.length=0;
        var o = document.createElement("option");
        o.text = '--Choose a Knight--';
        o.value = 0;
        document.getElementById("RaidKnights").options.add(o);
        for (k in knt){
            if (knt[k]["Name"] !=undefined){
                var o = document.createElement("option");
                o.text = (knt[k]["Name"] + ' (' + knt[k]["Combat"] +')')
                o.value = knt[k]["ID"];
                document.getElementById("RaidKnights").options.add(o);
            }
        }
    },

    helpPop : function (){
       var helpText = '<A target="_tab" href="http://koc.wikia.com/wiki/Barbarian_Camps">A lot more can be found on Koc Wikia</a>';
       helpText += '<TABLE><TR><TD>Lvl</td><TD>Troops</td></tr>';
       helpText += '<TR><TD>1</td><TD>500 Supply Troops + 500 Archers</td></tr>';
       helpText += '<TR><TD>2</td><TD>500 Supply Troops + 2500 Archers</td></tr>';
       helpText += '<TR><TD>3</td><TD>500 Supply Troops + 5000 Archers</td></tr>';
       helpText += '<TR><TD>4</td><TD>500 Supply Troops + 7500 Archers</td></tr>';
       helpText += '<TR><TD>5</td><TD>15000 Archers</td></tr>';
       helpText += '<TR><TD>5</td><TD>12000 Archers IF Level 10 fletching and Level 9 Featherweight</td></tr>';
       helpText += '<TR><TD>6</td><TD>25000 Archers IF Level 9 fletching</td></tr>';
       helpText += '<TR><TD>6</td><TD>22000 Archers IF Level 10 fletching</td></tr>';
       helpText += '<TR><TD>7</td><TD>45000 Archers IF Level 10 fletching</td></tr>';
       helpText += '<TR><TD>7</td><TD>44000 Archers IF Level 10 fletching and knight 69+</td></tr>';
       helpText += '<TR><TD>7</td><TD>40000 Archers IF Level 10 fletching and knight 94+</td></tr>';
       helpText += '<TR><TD>8</td><TD>28000 Ballista WITH Level 10 fletching and Knight 91+</td></tr>';
       helpText += '<TR><TD>9</td><TD>56000 Ballista WITH Level 10 fletching and Knight 98+</td></tr>';
       helpText += '<TR><TD>10</td><TD>125000 Catapults (500 Catapults loss!)</td></tr></tr></table>';
       var pop = new pbPopup ('giftHelp', 0, 0, 400, 350, true);
       pop.centerMe (mainPop.getMainDiv());  
       pop.getMainDiv().innerHTML = helpText;
       pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot '+translate("Help")+': '+translate("Raids")+'</b></center>';
       pop.show (true);
    },

	doSearch: function(blocks,fromX,fromY,callback){
		var t = Tabs.TurboSearch;
		var mapDat = [];
	    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.blocks = blocks;
	    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
	  		method: "post",
	  		parameters: params,
	  		onSuccess: function (transport) {
	  			var rslt = eval("(" + transport.responseText + ")");
	    		if (rslt.ok) {
	    			if (rslt.data == []) alert("MAP ERROR");
	    			 else callback(rslt.data, rslt.userInfo, rslt.allianceNames, fromX,fromY);
	    		}
	  		},
	  		onFailure: function () {
	  			alert('Seach Failed');
	  			document.getElementById('TSsearchButton').value = "Start Search";
      			document.getElementById('TSsearchButton').disabled = false;
	  		},	
		});
	},

	fetchPlayerStatus : function (uidArray){
	    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	    params.checkArr = uidArray.join(',');
	    RPM++;
	    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getOnline.php" + unsafeWindow.g_ajaxsuffix, {
	      method: "post",
	      parameters: params,
	      onSuccess: function (rslt) {
	      		if (rslt.ok) for (var y in rslt.data) {
	      			if (rslt.data[y]) var status = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVNJREFUeNrUk09OwkAUh9+gUKpAFIuIfxJilLIlMd6gaw+Ax/AY7r2AnMFFb2DcC5gYYlBotYKttEwp83zjQtFIN6x8yZfJ9PfypZM3wxARFqkELFgLC5ZnN+yyQF9YjrR12hpEiegRJghoQIQunj7PF1DlQOB5dadi6Nt6cSWlKiPu8+ZTq9bu3tUoPyPc+UcQWK9sHRh6oVIOXF91XpzE2AtUXTss72tlQ+axR4AQjb313aJlWSCEAM75J3JS2dVMUebUdREjECWcojLwBiCZRJOvKB2mFZnH/wEXvb7b5zbaKmR+No6jMZd5/Bg5mt3HByupJQE24Js8gD/0LJnHC0zecNuO6d06HcGmAWRBTCEK/NZbh9+PTJn/FrDZq8wYS0GeVeE4cQIldkT6TZq/DT28gWtxBa/YpP73OMESLWuE8seli4gh9YdzBf/zMX0IMACs96WetcYlTQAAAABJRU5ErkJggg=="/>';      
	      			 else var status = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWJJREFUeNrUU79PwkAUvv5IG6iAg8HEMIlxNLBCNxkkYah/gP6NmAChiYQUupjA4uCicbKJBQ0E24OWtvjdgCHGdmHyJV/efffuvrx37x232WzIPsaTPW1vAXGXaJpGRFGUOY67AD0FMsAX8IpSH4Mg8JrNZrwATI6i6KrRaGjVarWWTqePXde1TdO873Q67GYX8GIFwjAs1ev160qlckMp5QG2XQC/Xa1WnK7r7+APsQLr9fq8XC7XbNvmWXd832d7BFnxxWKxhnUvUQAXcqg/7zgOcRyKjIKfmCRJeRZPfETP89zJ5HO6XIYngiAThq1R6k5ZPLGNOPBsGMYglcpEsqyQLSRJicbj8YDFEzOwLGvUat21KfVFVb1Us9nc0WIx/xgOe2a/323PZrPRbwFud5RRvyQIwpmiKCX4AvgB4g6684Z2PsG/MJ4kIMAdsnn4Y+jYi85x3o8V+J+f6VuAAQDR57f+eJX9fgAAAABJRU5ErkJggg=="/>';    
	        		var element = document.getElementsByClassName('DIVonline_'+y);
				    for (var k=0;k<element.length;k++) element[k].innerHTML = status;	      
	        	}	
	      },
	      onFailure: function () {},
	    });
  	},

	checkOptions: function(){
		var t = Tabs.TurboSearch;
		if (document.getElementById('RadioALL').checked){
			document.getElementById('DIVminLevel').innerHTML = '<FONT color=grey>Min. Level: </font>';
			document.getElementById('DIVmaxLevel').innerHTML = '<FONT color=grey>Max. Level: </font>';
			document.getElementById('DIVunowned').innerHTML = '<FONT color=grey>Unowned</font>';
			document.getElementById('TSunowned').disabled = true;
			document.getElementById('TSminLevel').disabled = true;
			document.getElementById('TSmaxLevel').disabled = true;
			t.disableCityOptions();
		} 
		if (document.getElementById('RadioCities').checked){
			document.getElementById('DIVminLevel').innerHTML = '<FONT color=grey>Min. Level: </font>';
			document.getElementById('DIVmaxLevel').innerHTML = '<FONT color=grey>Max. Level: </font>';
			document.getElementById('DIVunowned').innerHTML = '<FONT color=grey>Unowned</font>';
			document.getElementById('TSunowned').disabled = true;
			document.getElementById('TSminLevel').disabled = true;
			document.getElementById('TSmaxLevel').disabled = true;
			t.enableCityOptions();
		} 
		if (document.getElementById('RadioBarb').checked || document.getElementById('RadioWild').checked) {
			document.getElementById('DIVminLevel').innerHTML = '<FONT color=black>Min. Level: </font>';
			document.getElementById('DIVmaxLevel').innerHTML = '<FONT color=black>Max. Level: </font>';
			if (document.getElementById('RadioBarb').checked) {
				document.getElementById('DIVunowned').innerHTML = '<FONT color=grey>Unowned</font>';
				document.getElementById('TSunowned').disabled = true;
			} else {
				document.getElementById('DIVunowned').innerHTML = '<FONT color=black>Unowned</font>';
				document.getElementById('TSunowned').disabled = false;
			}
			document.getElementById('TSminLevel').disabled = false;
			document.getElementById('TSmaxLevel').disabled = false;
			t.disableCityOptions();
		}
	},

	disableCityOptions: function(){
		document.getElementById('DIVmisted').innerHTML = '<FONT color=grey>Misted</font>';
		document.getElementById('DIVhostile').innerHTML = '<FONT color=grey>Hostile</font>';
		document.getElementById('DIVfriendly').innerHTML = '<FONT color=grey>Friendly / Us</font>';
		document.getElementById('DIVfriendlyToUs').innerHTML = '<FONT color=grey>Friendly To Us</font>';
		document.getElementById('DIVneutral').innerHTML = '<FONT color=grey>Neutral</font>';
		document.getElementById('DIVallied').innerHTML = '<FONT color=grey>Allied</font>';
		document.getElementById('DIVunAllied').innerHTML = '<FONT color=grey>Unallied</font>';
		document.getElementById('DIVmight').innerHTML = '<FONT color=grey>Might (in Million):</font>';
		document.getElementById('DIVmightMin').innerHTML = '<FONT color=grey>Min.:</font>';
		document.getElementById('DIVmightMax').innerHTML = '<FONT color=grey>Max.:</font>';
		document.getElementById('DIVfilterTop').innerHTML = '<FONT color=grey>Filter alliances Rank:</font>';
		document.getElementById('DIVtop').innerHTML = '<FONT color=grey>to</font>';
		document.getElementById('TSmisted').disabled = true;
		document.getElementById('TShostile').disabled = true;
		document.getElementById('TSfriendly').disabled = true;
		document.getElementById('TSfriendlyToUs').disabled = true;
		document.getElementById('TSneutral').disabled = true;
		document.getElementById('TSallied').disabled = true;
		document.getElementById('TSunAllied').disabled = true;
		document.getElementById('TSmightMin').disabled = true;
		document.getElementById('TSmightMax').disabled = true;
		document.getElementById('TSfilerTop').disabled = true;
		document.getElementById('TStopMin').disabled = true;
		document.getElementById('TStopMax').disabled = true;
	},
	enableCityOptions: function(){
		if (document.getElementById('TSallied').checked){
			document.getElementById('TSmisted').disabled = false;
			document.getElementById('TShostile').disabled = false;
			document.getElementById('TSfriendly').disabled = false;
			document.getElementById('TSfriendlyToUs').disabled = false;
			document.getElementById('TSneutral').disabled = false;
			document.getElementById('DIVmisted').innerHTML = '<FONT color=black>Misted</font>';
			document.getElementById('DIVhostile').innerHTML = '<FONT color=red>Hostile</font>';
			document.getElementById('DIVfriendly').innerHTML = '<FONT color=green>Friendly</font>&nbsp/&nbsp<FONT color=blue>Us</font>';
			document.getElementById('DIVfriendlyToUs').innerHTML = '<FONT color=orange>Friendly To Us</font>';
			document.getElementById('DIVneutral').innerHTML = '<FONT color=black>Neutral</font>';
		} else {
			document.getElementById('TSmisted').disabled = true;
			document.getElementById('TShostile').disabled = true;
			document.getElementById('TSfriendly').disabled = true;
			document.getElementById('TSfriendlyToUs').disabled = true;
			document.getElementById('TSneutral').disabled = true;
			document.getElementById('DIVmisted').innerHTML = '<FONT color=grey>Misted</font>';
			document.getElementById('DIVhostile').innerHTML = '<FONT color=grey>Hostile</font>';
			document.getElementById('DIVfriendly').innerHTML = '<FONT color=grey>Friendly</font>';
			document.getElementById('DIVfriendlyToUs').innerHTML = '<FONT color=grey>Friendly To Us</font>';
			document.getElementById('DIVneutral').innerHTML = '<FONT color=grey>Neutral</font>';
		}
		document.getElementById('DIVallied').innerHTML = '<FONT color=black>Allied</font>';
		document.getElementById('DIVunAllied').innerHTML = '<FONT color=black>Unallied</font>';
		document.getElementById('DIVmight').innerHTML = '<FONT color=black>Might (in Million):</font>';
		document.getElementById('DIVmightMin').innerHTML = '<FONT color=black>Min.:</font>';
		document.getElementById('DIVmightMax').innerHTML = '<FONT color=black>Max.:</font>';
		document.getElementById('DIVfilterTop').innerHTML = '<FONT color=black>Filter alliances Rank:</font>';
		document.getElementById('DIVtop').innerHTML = '<FONT color=black>to</font>';
		document.getElementById('TSallied').disabled = false;
		document.getElementById('TSunAllied').disabled = false;
		document.getElementById('TSmightMin').disabled = false;
		document.getElementById('TSmightMax').disabled = false;
		document.getElementById('TSfilerTop').disabled = false;
		document.getElementById('TStopMin').disabled = false;
		document.getElementById('TStopMax').disabled = false;
	},

	show: function (){
		var t = Tabs.TurboSearch;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	    params.pageNo = 1;
	    params.cityId = unsafeWindow.currentcityid;
	    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetOtherInfo.php" + unsafeWindow.g_ajaxsuffix, {
		    method: "post",
		    parameters: params,
		    onSuccess: function (rslt) {
				var data = rslt.otherAlliances;
				for (y=0;y<data.length;y++) t.rankings[data[y].allianceId] = data[y].ranking; 
					var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				    params.pageNo = 2;
				    params.cityId = unsafeWindow.currentcityid;
				    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetOtherInfo.php" + unsafeWindow.g_ajaxsuffix, {
				      	method: "post",
				      	parameters: params,
				      	onSuccess: function (rslt) {
						  	var data = rslt.otherAlliances;
						  	for (y=0;y<data.length;y++) t.rankings[data[y].allianceId] = data[y].ranking; 
				      	},
				    });
		    },
	    });
	},
	hide: function (){}
}

//******************** Auto Update ***************************//

var AutoUpdater_155469 = {
    id: 155469,
    name: "KOC Power Bot",
    version: Version,
    call: function(secure) {
        GM_xmlhttpRequest({
            method: 'GET',
        url: 'http'+(secure ? 's' : '')+'://userscripts.org/scripts/source/'+this.id+'.meta.js',
        onload: function(xpr) {AutoUpdater_155469.compare(xpr);},
            onerror: function(xpr) {if (secure) AutoUpdater_155469.call(false);}
        });
    },
    compareVersion: function(r_version, l_version) {
    	r_version = r_version.substr(5);
    	l_version = l_version.substr(5);
    	r_version = r_version.slice(0,-1);
    	l_version = l_version.slice(0,-1);
        return (r_version !== l_version) ? r_version > l_version : false;
    },
    compare: function(xpr) {
        this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
        this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);
        if ( (this.xversion) && (this.xname[1] == this.name) ) {
            this.xversion = this.xversion[1];
            this.xname = this.xname[1];
        } else {
            if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) {
               alert("BOT: Can't find script page :(");
            }
            return false;
        }
        var updated = this.compareVersion(this.xversion, this.version);   
        if (updated) {                  
 			var body = '<BR><DIV align=center><FONT size=3><B>New version ' + this.xversion + ' is available!</b></font></div><BR>';
 			body+='<BR><iframe style=";border:0;width:475px;max-width:475px;height:150px;max-height:150px;overflow:auto" src="http://nicodebelder.eu/koc/BOT_changelog.html"></iframe><BR>';
 			body+='<BR><DIV align=center><a class="gemButtonv2 green" id="doBotUpdate">Update</a></div>';
 			ShowUpdate(body);
        } 
    },
    check: function() {
    	var now = unixTime();
    	var lastCheck = 0;
    	if (localStorage.updated_155469) lastCheck = parseInt(localStorage.updated_155469);
		if (now > (lastCheck + 60*60*6)) this.call(true);
    }
};
//if (typeof(GM_xmlhttpRequest) !== 'undefined' && typeof(GM_updatingEnabled) === 'undefined')  
setTimeout(function(){AutoUpdater_155469.check();},15000); 

function doBOTUpdate(){
	unsafeWindow.cm.ModalManager.closeAll();
	unsafeWindow.cm.ModalManager.close();
	var now = unixTime();
	localStorage.setItem ("updated_155469", now);
	location.href = 'http://userscripts.org/scripts/source/155469.user.js';
}

function ShowUpdate(body){
	var now = unixTime();	 
	unsafeWindow.cm.ModalManager.addMedium({
	    title: "Koc Power BOT - Official fork",
	   	body: body,
	   	closeNow: false,
	    close: function () {
	    	localStorage.setItem ("updated_155469", now);
	    	unsafeWindow.cm.ModalManager.closeAll();
	    },
	    "class": "Warning",
		curtain: false,
        width: 500,
		height: 600,
		left: 140,
		top: 140
	});
	document.getElementById('doBotUpdate').addEventListener ('click', doBOTUpdate, false);   
}

//********************* GLOBAL FUNCTIONS **********************//


var kboxtime = 1;
function killbox () {
   kboxtime += 1;
   if(!Options.KMagicBox) return;
   if (kboxtime > 50) return;
   if (Number(unsafeWindow.seed.items.i599) == 0) return;
   if(!document.getElementById('modal_mmb')) setTimeout(killbox,100);
    else unsafeWindow.Modal.hideModal();  
};

function MakeBlocks(getX,getY,radius){
	var blocks = [];
	var xx=0;
	var yy=0;
	for (x=(getX-radius);x<=(getX+radius);x+=5) {
	   for (y=(getY-radius);y<=(getY+radius);y+=5) {
			xx=x;
			yy=y;
			if (x>750) xx-=750;
			if (y>750) yy-=750;
			if (x<0) xx+=750;
			if (y<0) yy+=750;
			blocks.push ("bl_" + xx + "_bt_" + yy);
		}
	}
	return blocks;
}

function marchTimeCalculator(troops, is_round_trip, items_applied, cityID, action,dist) {
    if(dist=="NaN" || dist==0) return "N/A";
    var speed = 99999;
    var total_troops = 0;
    items_applied = items_applied || {};
    for(var troop_type in troops) {
        if(!troops[troop_type].toString().match(/^\d+$/)) continue;
        var troop_number = parseInt(troops[troop_type]);
        if(troop_number <= 0) continue;
        total_troops += troop_number;
        var troop_speed = parseInt(unsafeWindow.unitstats["unt" + troop_type][3]);
        troop_speed *= (1 + 0.1 * parseInt(Seed.tech.tch11));
        if(unsafeWindow.cm.unitHorsedBenefit[troop_type]) troop_speed = troop_speed * (1 + 0.05 * parseInt(Seed.tech.tch12))
         else {
            troop_speed *= (1 + 0.05 * (parseInt(Seed.tech2.tch1) || 0));
            troop_speed *= unsafeWindow.cm.BlessingSystemModel.applyBlessing(unsafeWindow.cm.BlessingSystemModel.getBlessing().BLOOD_LUST, cityID, {speed: true});
        }
        if(troop_speed < speed) speed = troop_speed;
    }
    speed *= unsafeWindow.cm.BlessingSystemModel.applyBlessing(unsafeWindow.cm.BlessingSystemModel.getBlessing().FILL_THE_RANKS, cityID, {marchspeed: true});
    speed *= unsafeWindow.cm.BlessingSystemModel.applyBlessing(unsafeWindow.cm.BlessingSystemModel.getBlessing().REDUCE_FATIGUE, cityID, {}); 
    var throne67 = unsafeWindow.cm.ThroneController.effectBonus(67);  //March Speed
    var throne68, throne69, throne70, throne71, throne72;
    throne68 = throne69 = throne70 = throne71 = throne72 = 0;
    switch (action){
    	case 1: throne70 = unsafeWindow.cm.ThroneController.effectBonus(70);break; //Transport March Speed
    	case 2: throne69 = unsafeWindow.cm.ThroneController.effectBonus(69);break; //Reinforcement March Speed 
    	case 3: throne72 = unsafeWindow.cm.ThroneController.effectBonus(72);break; //Scout March Speed
    	case 4: throne68 = unsafeWindow.cm.ThroneController.effectBonus(68);break; //Attack March Speed
    	case 5: throne71 = unsafeWindow.cm.ThroneController.effectBonus(71);break; //Reassign March Speed
    }
    var throneBoost = throne67 + throne68 + throne69 + throne70 + throne71 + throne72;
    speed = speed * (1 + (throneBoost * 0.01));
    var gi = unsafeWindow.cm.guardianModalModel.getMarchBonus();
    var multiplier = 1 + (gi * 0.01);
    if(unsafeWindow.cm.WorldSettings.isOn("GUARDIAN_MARCH_EFFECT")) speed = speed * multiplier;
    var time = 0;
    if(0 == speed || 0 == total_troops) return "N/A"; 
    time = Math.ceil(dist * 6000 / speed);
    if(items_applied["57"] && Seed.items.i57 > 0) time = parseInt(time * 0.5);
     else if(items_applied["55"] && Seed.items.i55 > 0) time = parseInt(time * 0.75);  
    if(unsafeWindow.g_env !== "dev") time += 30;
    now = unixTime();        
    if(Seed.playerEffects.returnExpire >now) time = parseInt(time * 0.75);
    if(is_round_trip) time *= 2;    
    return timestr(time);
}

var messageNav = {
	init : function (){
		t = messageNav;
		t.MapFunc = new CalterUwFunc ('modal_maptile', [[/}\s*$/, ';setTimeout(function() { MapAddon_hook(l, o, p, k, m, n, f, s, v, i, c, a, e, r, b, h, q, j, d, g); },0); }']]);
		unsafeWindow.MapAddon_hook = t.AddExtra;
		t.MapFunc.setEnable (true);
		t.Test = new CalterUwFunc ('modal_messages', [[/}\s*$/, ';setTimeout(function() { AddMsgButtons(); },0); }']]);
		unsafeWindow.AddMsgButtons = t.AddMsgButtons;
		t.Test.setEnable (true);

	},
	setEnable : function (tf){
	},
	isAvailable : function (){
		t = messageNav;
		return t.mmFunc.isAvailable();
	},
	AddMsgButtons :function() {
		t = messageNav;
		msgBody = document.getElementsByClassName('messageDeletes')[0];
		var a = document.createElement('a');
			a.className='buttonDown20 GiftReport';
			a.innerHTML='<span>Delete Gift Report</span>';
			a.addEventListener('click', function(){t.checkinbox(1);}, false);
		var div = document.createElement('span');
		msgBody = document.getElementsByClassName('messageDeletes')[0];
		var b = document.createElement('a');
			b.className='buttonDown20';
			b.innerHTML='<span>Send to Mail</span>';
			b.addEventListener('click', function(){t.checkinbox(2);}, false);
		var div = document.createElement('span');
		div.appendChild(a);
		div.appendChild(b);
		msgBody.appendChild(div);
	},
	checkinbox : function(what){
		var t = messageNav;
    	var body = document.getElementById('tbl_messages');
    	var trs=body.getElementsByTagName('tr');
    	var reports = [];
		for(var i=0; i<trs.length; i++){
			var tds = trs[i].getElementsByTagName('td');
			for(var j=0; j<tds.length; j++){
				if(tds[j].className == 'chkcol') var checkbox = tds[j];
				if(tds[j].className == 'dtcol') var date = tds[j];	
				if(tds[j].className == 'nmcol') var sender = tds[j];	
				if(tds[j].className == 'subjcol') var subject = tds[j];	
			}
			reports.push({checkbox:checkbox,date:date,sender:sender,subject:subject});
		}
		if (what==1) t.parseGiftReport(reports);
		if (what==2) t.parseMailReport(reports);
	},
	parseGiftReport : function(rpts){
    	var t = messageNav;
    	for(var i=0; i<rpts.length; i++) if(rpts[i].subject.innerHTML.indexOf('New Gift Received!') >= 0 && rpts[i].sender.innerHTML.indexOf('Kingdoms Of Camelot') >= 0) rpts[i].checkbox.firstChild.checked = true;	
		unsafeWindow.messages_action("delete","tbl_messages"); 
  	},
  	parseMailReport : function(rpts){
    	var t = messageNav;
    	var send = [];
		var help = unsafeWindow.getSelectedMessages("tbl_messages");
		var array = help.split(',');
		for (var a=0;a<array.length;a++) 
	    	for(var i=0;i<rpts.length; i++) {
	    		var sender = rpts[i].sender.textContent || rpts[i].sender.innerText;
				var subject = rpts[i].subject.textContent || rpts[i].subject.innerText;
				var date = rpts[i].date.textContent || rpts[i].date.innerText;
	    		if (rpts[i].checkbox.innerHTML.indexOf(array[a]) >=0) send.push({id:array[a],date:date,sender:sender,subject:subject}); 
	    	}
	    logit(send.toSource());
	    for (var i=0;i<send.length;i++) setTimeout(t.messageBody,(i*5000),send[i]);
  	},
  	messageBody: function(send){
  		var t= messageNav;
  		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.pf=0;
		params.requestType="GET_MESSAGE_FOR_ID";
		params.messageId = send.id;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getEmail.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt) t.sendToMail(send,rslt.messageBody);
			},
			onFailure: function () {
			},
		}, false);
  	},
  	sendToMail: function(send,messageBody){
  		var t = messageNav;
  		messageBody = messageBody.replace(/custom-line-break/g,"<BR>");
  		var msg = '<BR>Date: ' + send.date;
  		msg += '<BR>From: ' + send.sender,
  		msg += '<BR>Subject: ' + send.subject;
  		msg += '<BR><BR>' + messageBody; 
  		var content = '<BODY><HTML>' + msg + '</html></body>';
  		var data = {};
    	data.Subject ='Forwarded Message ('+getServerId()+')';
    	data.Message = content; 
    	GM_xmlhttpRequest({
        	method: 'POST',
        	url: 'http://nicodebelder.eu/koc/mail.php',
        	headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',},
        	data: implodeUrlArgs(data),
        	onload: function (response) {alert(response.responseText);},
    	});
    	document.getElementById('inbox_chk_'+send.id).checked = false;
  	},
	AddExtra :function(l, o, p, k, m, n, f, s, v, i, c, a, e, r, b, h, q, j, d, g) {
		t = messageNav;
		//modal_maptile(i, h.tileid, h.tilename, h.xcoord, h.ycoord, h.pic, h.username, h.might, h.title, h.alliance, h.cities, h.province, h.type, h.status, h.level, h.allianceId, h.cityid, h.tileuserid, h.typename, h.mistedflag)
		//alert(l +'/'+ o+'/'+ p+'/'+ k+'/'+ m+'/'+ n+'/'+ f+'/'+ s+'/'+ v+'/'+ i+'/'+ c+'/'+ a+'/'+ e+'/'+ r+'/'+ b+'/'+ h+'/'+ q+'/'+ j+'/'+ d+'/'+ g)
		if (j!=null && j > 0) {
			var div = document.getElementById('contextMenu');
			var scr = document.createElement('div');
			scr.innerHTML= "<a class='buttonv2 red h20' id=addToMarchTab>Add To March Tab</a><a class='buttonv2 green h20' id=AutoScout>Auto Scout</a>";
			div.appendChild(scr);
			document.getElementById('addToMarchTab').addEventListener('click', function(){t.GoToMarchTab(k,m,unsafeWindow.currentcityid);}, false);
			document.getElementById('AutoScout').addEventListener('click', function(){t.AutoScout(k,m);}, false);
		}
	},
	AutoScout :function(x,y) {
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.kid = 0;
		params.u3=1;
		params.cid=unsafeWindow.currentcityid;
    	params.type=3;
	    params.xcoord=x;
	    params.ycoord=y;
	    params.gold=0;
	    params.items = "";
	    for (var i=1;i<=5;i++) params['r'+i]=0;
    	new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
              method: "post",
              parameters: params,
              loading: true,
              onSuccess: function (transport) {
                  var rslt = eval("(" + transport.responseText + ")");
                  if (rslt.ok) {
	                  var now = unixTime();
	                  var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
	                  var ut = unixTime();
	                  var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
	                  for(i = 0; i <= unitsarr.length; i++)if(params["u"+i])unitsarr[i] = params["u"+i];
	                  var resources=new Array();
	                  resources[0] = params.gold;
	                  for(i=1; i<=4; i++) resources[i] = params["r"+i];
	                  var currentcityid = params.cid;
	                  unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
	                  if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
                  } else if (rslt.error_code ==8 || rslt.error_code ==3) t.AutoScout(x,y); 
              },
              onFailure: function () {}
      });     
	},
	GoToMarchTab :function(x,y,cityID) {
		mainPop.show (true);
		tabManager.e_clickedTab(null,"March");
		document.getElementById('MtargetX').value = x;
		document.getElementById('MtargetY').value = y;
		for (var t=0;t<Seed.cities.length;t++) if (parseInt(Seed.cities[t][0]) == cityID) var cityNum = t;
		document.getElementById('pbMfrom_'+cityNum).click(); 
	},
}

function getMaxLoad(unitType,unitCount) {
    var load = 0;
    var techLoadBoost = parseInt(Seed.tech.tch10) * 0.1;
    var unit_number = unitCount;
    var loadEffectBoost = 0;
    if (Seed.playerEffects.loadExpire > unixTime()) loadEffectBoost = 0.25
    var TRload = unsafeWindow.cm.ThroneController.effectBonus(6);
    if (TRload > 500) TRload = 500;
    var loadBoostBase = (TRload * 0.01) + loadEffectBoost + techLoadBoost;
    var loadBoost = loadBoostBase;
    if (unitType == 10 || unitType == 11 || unitType == 12) loadBoost += (unsafeWindow.cm.ThroneController.effectBonus(59) * 0.01);
     else if (unitType == 7 || unitType == 8) loadBoost += (unsafeWindow.cm.ThroneController.effectBonus(48) * 0.01);
    load += unit_number * parseInt(unsafeWindow.unitstats['unt'+unitType][5]) * (1 + loadBoost);
    return (parseInt(load));
};

function distance (d, f, c, e) {
  	var a = 750;
  	var g = a / 2;
  	var b = Math.abs(c - d);
  	if (b > g) b = a - b;
  	var h = Math.abs(e - f);
  	if (h > g) h = a - h;
  	return Math.round(100 * Math.sqrt(b * b + h * h)) / 100;
};

var myServerId = null;
function getServerId() {
  if (myServerId == null) myServerId = parseInt(unsafeWindow.g_server);
  return myServerId;
}



function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null) return [0, 'None'];
  else return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}

function RefreshSeed(){
	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	RPM++;
	new AjaxRequest(unsafeWindow.g_ajaxpath + "/fb/e2/src/main_src.php?g=&y=0&n=nan001&l=nl_NL&messagebox=&standalone=0&res=1&iframe=1&lang=en&ts=1304248288.7067&s=250&appBar=" + unsafeWindow.g_ajaxsuffix, {
	    method: "POST",
	    parameters: params,
	    onSuccess: function (rslt) {
	        var mainSrcHTMLCode = rslt.responseText;
	    	var myregexp = /var seed=\{.*?\};/;
	    	var match = myregexp.exec(mainSrcHTMLCode);
	    	if (match != null) {
	    		result = match[0];
	    		result = result.substr(4);
	    		var seed = eval(result);
	    		unsafeWindow.document.seed = seed;
	    		Seed = seed;
	    		unsafeWindow.seed = seed;
	    		updatebotbutton("Update OK :)", "pbSeedRefresh");
	    		setTimeout(function(){updatebotbutton('Refresh Seed', 'pbSeedRefresh')}, 5000);
	    	}
	    },
	    onFailure: function () {
	      if (notify != null)
	        notify(rslt.errorMsg);
	    },
	});
}

function RecallWatchdog(){
	var now = unixTime();
	if (Recall.length == 0) return;
	for (var i=0;i<Recall.length;i++) {
		var marchId = Recall[i].marchId;
		var arrivalTime = Recall[i].arrivalTime;
		if (Seed.queue_atkinc[marchId] == undefined && arrivalTime > now) {
			Recall.splice(i,1);
			if (SEND_ALERT_AS_WHISPER) sendChat ("/"+ Seed.player.name +' '+ "..:.| RECALLED ||  March with ID: " + marchId.substr(1)); // Whisper to myself
			else sendChat ("/a ..:.| RECALLED ||  March with ID: " + marchId.substr(1));   
		} else if (arrivalTime < now) Recall.splice(i,1);
	}
}

function FullDateTime(str){
 	var time = new Date(str*1000);
	D = addZero(time.getDate());
	M = addZero(time.getMonth()+1);
	Y = addZero(time.getFullYear());
	h = addZero(time.getHours());
	m = addZero(time.getMinutes());
	s = addZero(time.getUTCSeconds());
	var fullDate =  D +"/"+ M +"/"+ Y +"  "+ h + ":" + m + ":" + s;
	return fullDate;
}

function addZero(i){
	if (i<10) i="0" + i;	 
	return i;
}

function distance (d, f, c, e) {
  var a = 750;
  var g = a / 2;
  var b = Math.abs(c - d);
  if (b > g) b = a - b;
  var h = Math.abs(e - f);
  if (h > g) h = a - h;
  return Math.round(100 * Math.sqrt(b * b + h * h)) / 100;
}

function getKnights(cityId){
    var knt = new Array();
    for (k in Seed.knights['city' + cityId]){
           if (Seed.knights['city' + cityId][k]["knightStatus"] == 1 && Seed.leaders['city' + cityId]["resourcefulnessKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["politicsKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["combatKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' +cityId]["intelligenceKnightId"] != Seed.knights['city' + cityId][k]["knightId"]){
               knt.push ({
                   Name:  	  Seed.knights['city' + cityId][k]["knightName"],
                   Combat:    parseInt(Seed.knights['city' + cityId][k]["combat"]),
                   ID:        Seed.knights['city' + cityId][k]["knightId"],
               });
           }
    }
    knt = knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a < b ? -1 : 1);});
    return knt; 
}

function getRallypoint(cityId){
	var rallypointlevel=0;
	for (var o in Seed.buildings["city" + cityId]){
	    var buildingType = parseInt(Seed.buildings["city" + cityId][o][0]);
	    var buildingLevel = parseInt(Seed.buildings["city" + cityId][o][1]);
	    if (buildingType == 12) rallypointlevel=parseInt(buildingLevel);
	}
	if (rallypointlevel == 12) rallypointlevel=11;
	if (Seed.cityData.city[cityId].isPrestigeCity && rallypointlevel>0) rallypointlevel += 3;
	return rallypointlevel;
}

function doMarch(action,WhatCity){
    var knight = getKnights(action.city);
	if (knight.toSource() == "[]") return;
	var kid = knight[0].ID;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    var TroopsOK = true;
    params.cid=action.city;
    params.type=action.action;
    if (action.action == 4 || action.action == 5) params.kid=kid;
    else params.kid=0;
    params.xcoord = action.targetX;
    params.ycoord = action.targetY;
    for (var i=1;i<=15;i++){
    	TroopsInCity = Seed.units['city'+action.city]['unt'+i];
    	if (action[i]) {
    		if (parseInt(TroopsInCity) < parseInt(action[i])) TroopsOK = false;
    		else if (parseInt(action[i]) > 0) params['u'+i]=action[i];
    	}

    }
    if (!TroopsOK) {
    	MarchOffset = MarchDelay;
    	return;
    }
    if (action.gold) params.gold = action.gold;
  	if (action.r1) params.r1= action.r1;
  	if (action.r2) params.r2= action.r2;
  	if (action.r3) params.r3= action.r3;
  	if (action.r4) params.r4= action.r4;
  	if (action.r5) params.r5= action.r5;
    RPM++;
    var total=0;
	var maxsend = 0;
    var rallypointlevel = 0;	
    for (var o in Seed.buildings["city" + action.city]){
	    var buildingType = parseInt(Seed.buildings["city" + action.city][o][0]);
	    var buildingLevel = parseInt(Seed.buildings["city" + action.city][o][1]);
	    if (buildingType == 12) rallypointlevel=parseInt(buildingLevel);
	}
  	if(rallypointlevel == 11) rallypointlevel = 15;
	if(rallypointlevel == 12) rallypointlevel = 20;
  	maxsend = (rallypointlevel * 10000);
  	if (Seed.cityData.city[action.city].isPrestigeCity) {
  		switch(parseInt(Seed.cityData.city[action.city].prestigeInfo.prestigeLevel)){
  			case 1: maxsend = Math.round(maxsend * 1.50);break;
  			case 2: maxsend = Math.round(maxsend * 1.60);break;
  			case 3: maxsend = Math.round(maxsend * 1.65);break;
  		}
  	}
  	var TR = unsafeWindow.cm.ThroneController.effectBonus(66);
    if (TR > 150) TR=150;
  	maxsend = maxsend + ((maxsend / 100) * TR);
  	for (var i=1;i<=15;i++) total += parseInt(action[i]); 
  	if (total == 'Nan')	actionlog('City: ' + WhatCity + ' - Troops: ' + total);	
  	if (total == 0){
  		MarchQueue[WhatCity].splice(0,1);
  		MarchOffset = MarchDelay;
  		return;
  	}
  	if (total > maxsend) MarchQueue[WhatCity].splice(0,1);	

      new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
              method: "post",
              parameters: params,
              loading: true,
              onSuccess: function (transport) {
                  var rslt = eval("(" + transport.responseText + ")");
                  if (rslt.ok) {
	                  MarchesSend++;
	                  var now = unixTime();
					  MarchQueue[WhatCity].splice(0,1);
					  MarchOffset = MarchDelay;
	                  var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
	                  var ut = unixTime();
	                  var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	                  for(i=0;i<=unitsarr.length;i++)if(params["u"+i]) unitsarr[i] = params["u"+i];	                      
	                  var resources=new Array();
	                  resources[0] = params.gold;
	                  for(i=1; i<=4; i++) resources[i] = params["r"+i];
	                  var currentcityid = params.cid;
	                  unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
	                  if(rslt.updateSeed) unsafeWindow.update_seed(rslt.updateSeed);
	                  if (params.type == 1) MakeTransportLog(params);
                  }
                  else {
                  	if (rslt.error_code !=8 && rslt.error_code !=3 && rslt.error_code != 104) actionLog("City: " + WhatCity + ' - ' + rslt.toSource());
                  	MarchesError++;        	
                  	switch (rslt.error_code){
                  		case 206: 
                  				//Cannot perform this action on target. Please try again later
                  				for (var k in Seed.wilderness['city'+action.city]) if (Seed.wilderness['city'+action.city][k]['xCoord']==CrestOptions.X && Seed.wilderness['city'+action.city][k]['yCoord']==CrestOptions.Y) Tabs.Crest.abandonWilderness(Seed.wilderness['city'+action.city][k]['tileId'],Seed.wilderness['city'+action.city][k]['xCoord'],Seed.wilderness['city'+action.city][k]['yCoord'],CrestOptions.CrestCity);
						      	MarchOffset = MarchDelay;
                  				break;
                  		case 213:
                  				//Unable to use target Knight. Knight must be in the City to be used. If you receive this message in error, please refresh the game
                  				MarchOffset = MarchDelay;
                  				break;
                  		case 104: 
                  				//Cannot perform this action on target location
                  				MarchQueue[WhatCity].splice(0,1);
                  				MarchOffset = MarchDelay;
                  				break;
             			case 0:
             					//Need to send at least one soldier", feedback:"Need to send at least one soldier
                  				MarchQueue[WhatCity].splice(0,1);
                  				MarchOffset = MarchDelay;
                  				break;
                  	}
                  	if (rslt.user_action == "marchCaptcha") {
                  		MarchOffset = 5*60; // 5 Minutes
                  		actionLog("CAPTCHA");
                  		document.getElementById('MarchesSendInfo').innerHTML += '&nbsp<FONT color=red><B>CAPTCHA</b></font>';
                  		//Captcha(params);
                  	}
                  	else MarchOffset = MarchDelay*2;
                  }
                  if (rslt.user_action != "marchCaptcha") {
                  	var m = '<TABLE class=pbTab><TR align=center><TD>Marches: <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmJJREFUeNqkk0toE0Ech3+T3aRJX7RpPNgSgzQljYXiC1FbUcFrL9WTqAe96NGce+hF8KA5eVHsSaQni1CR4kHEFwoVxNrW0iJtA9lqk1TJbnZ2d3bGnbWPDT124Fvm9f32v+wMEUJgL02VD/IkASjEQw5IJwiGvd6AR3JzX8HjAwQmIEQRrjdyBcTV0v+AQBuKqpFcpiuTTiWS8eaG5qisz7D0I8vrK4MLxcWLlmPlvanJugq25NaGltFzfWezKpQYsxl0W99aa0x3dDcm25Mdb+fejVZNf94PCW1u6GwIRXJnegeyds2K6boOSmkdz3oeg5lO7GT6RDZCwjnp7AQwMdyzvztNdRozDAOmadZxt3vE3zZ1eNwLYbFUPJmWTjDgdKIpEa9Wq7Asy0dWsfZ7DTejV9BWbkKhUMC1l7cwOzcLTnlcOsGAAwqUqOu6+Hx+ClpZw8qvFaRIF061H4eqqhhbfooXpVdwQg6oTaPSCQaAuQw3Dl7GzMwMpg6N42iiHw/77/ny69J7PCiOATH4MJX5zk6AI1ZLxjod+XYHiqIgHA7jUe99hNUwFms/cXt5BLyZe/8CPjaxqHSCFXxcW9cqSlzB4I8h/61bXFq8DrRhW5bQaq0inWDAxJ/V8lIIxCRdBMe+X/DlvulBYF+9zLlrWpq5JJ2dAC6KrsHy5U/avGDcJCmCvq+enML2d0u4w0x9ujLPa25eOvUnkYtJpln4+1zLRbJN6UimMa6oalQuuRuM2gu1ij1vLHFH5NGqeKeQ7DrKfggvsS/0zcawx+7LpJAJtCjFoEL2ep3/CTAAj+gy+4Yc2yMAAAAASUVORK5CYII="/>';
                  	m += "&nbsp" + MarchesSend + "&nbsp";
                  	m += '&nbsp - &nbsp<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxtJREFUeNpUVF1Ik2EUfr59myudluZP09Sauk38I5o/hSZqVgbqhVgSrqvoJu+iLpXszm5FELoRQVH8G0ZqEphFJGoxDdTpNi01RUXdcm5jm53zZWQvPHzf9p7neZ9z3nM+obKyEoIgQCaTSU9CFCEVwHlCKP4sJ2Hj6OhojrBFQCAQAD/l+LeUhNzExMRr1dXV9zUaTYbP55M25HI5lpaWZnt6ejpWVlY+0V8TBA/viXq9nk9lcml5eXmt0Wh84jObYza7u7HR0oLtvj44rVaoVKqY4nt3b5BT0WKxuCl+heAXdTodW8mvqKgwFhUVPbA3NCDo40ck0KmJajViIyOhcjiwPz6OjalpZBhrs0RR9JPIFovIKJfohISEgpKSYqO1oR7q/X1kDQ3h4OAA29vbElwuFy6PjCBqZwfLjY0oLCw0xsXFFTBXRnmmV1VV1ayOjiJsbR0pvb1S3pe6urC7uyuB33mlmkxQ2uzYej+GsrKyGubK/H5/bHz8hTTHxARCQkLQk5wsBbvdbsS1tyO8tZULCCvV4VVEBBzk0Dk5idhYdRpzWeCs0/kLhzOz8FPVQ0mkjfKem5vD5uamJMTX+yE7W7omD9WDYw8P3WCunGywCHwE194eXOvrUNEdU6GgUCgQFBQk4W9DiF4v3BQrcYjLNXCKohyKtDR4SCCYNlLGxv4jcx9cX1iAinuCxDlWEEQWcPLp64uLS/MqQy52ya76BPkb2f6SlSUJMHKoDi5yFnwlBzabfZ65LDDT2dnRH5lfCE96JsylpRLZQuSLdCJjinqF12utFgFDDsLz8mEy9fczl1P4abNZxwcG+nr1L15CICfDBgPOsN1j8HuHRgMh5yq0z5swOGjqtdtt48wVo6OjeTDWzOavQiBwJLv9tF5/KlmH71SX6bVVWOQK+ItvQfPwMbSP6tDZ2TZAI9FHLT1Muj4hMzNTmiyHw3Ha4/HcTErSltTVPbtjMOQlnRg0TE19tjY3N72xWi3vlErl27CwsENpgk8ISO3r9Xrj6Xfucfrnjvk7hGUiTFB9fnDDkYD0CfgtwAC3SIkI+86QvQAAAABJRU5ErkJggg=="/>';
                  	m += "&nbsp" + MarchesError + '</td></tr></table>';
                  	document.getElementById('MarchesSendInfo').innerHTML =  m;
       			  }
              },
              onFailure: function () {}
      });             
}

function MakeTransportLog(what){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	params.blocks = "bl_" + what.xcoord + "_bt_" + what.ycoord;
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
  		method: "post",
  		parameters: params,
  		onSuccess: function (transport) {
  			var rslt = eval("(" + transport.responseText + ")");
    		if (rslt.ok) {
    			var userId = rslt.data["l_"+what.xcoord+"_t_"+what.ycoord].tileUserId;
				var targetCityName = rslt.data["l_"+what.xcoord+"_t_"+what.ycoord].cityName;
				var targetName = rslt.userInfo["u" + userId]["n"];
	    		for (var t=0;t<Seed.cities.length;t++) if (parseInt(Seed.cities[t][0]) == what.cid) var cityname = Seed.cities[t][1];
				var resources = 0;
			    if (what.gold) resources += parseInt(what.gold);
			   	if (what.r1) resources += parseInt(what.r1);
				if (what.r2) resources += parseInt(what.r2);
				if (what.r3) resources += parseInt(what.r3);
				if (what.r4) resources += parseInt(what.r4);
				if (what.r5) resources += parseInt(what.r5);
				var msg = "Transport: " + addCommas(resources) + " resources from " + cityname + " to: " + targetName + " (" + targetCityName + ')';
				actionLog(msg);
			}
  		},
	});	
}

function FillMarchQueue(){
	for (var ii=0;ii<Seed.cities.length;ii++){
		cityID = Seed.cities[ii][0];	
		var rallypointlevel = getRallypoint(cityID);
		var now = unixTime();
		if (Tabs.transport.traderState.running && (Options.lastCityTransport[ii+1]+(Options.transportinterval * 60)) < now) Tabs.transport.doMarch(cityID,ii);
		if (MarchQueue[ii+1].length < rallypointlevel) {
			if (DFOptions.Running) Tabs.DF.doMarch(cityID,ii);
			if (AtkOptions.Running) Tabs.Attack.doMarch(cityID,ii);
			if (FarmOptions.Running) Tabs.farm.barbing(cityID,ii);
			if (CrestOptions.Running) {				
				for (var k in Seed.wilderness['city'+cityID]) if (Seed.wilderness['city'+cityID][k]['xCoord']==CrestOptions.X && Seed.wilderness['city'+cityID][k]['yCoord']==CrestOptions.Y) Tabs.Crest.abandonWilderness(Seed.wilderness['city'+cityID][k]['tileId'],Seed.wilderness['city'+cityID][k]['xCoord'],Seed.wilderness['city'+cityID][k]['yCoord'],CrestOptions.CrestCity);
				Tabs.Crest.FirstRound();
			}
		}
	}
}

function CheckMarchQueue(){
	var RP = getRallypoint(Seed.cities[WhatCity-1][0]);
	var MarchesRunning = CheckCityMarches(WhatCity-1);
	var total = 0;
	for (var i=1;i<=Seed.cities.length;i++) total += MarchQueue[i].length;
	if (total == 0) return;
	if (MarchQueue[WhatCity].length > 0) {
		if (MarchesRunning < (RP-Options.RPClip)) doMarch(MarchQueue[WhatCity][0],WhatCity);
		WhatCity++;
		if (WhatCity >= (Seed.cities.length+1)) WhatCity = 1;
	}
	else {
		WhatCity++;
		if (WhatCity >= (Seed.cities.length+1)) WhatCity = 1;
		CheckMarchQueue();
	}
}

function CheckCityMarches(City){
	var Counter=0;
	var cityID = Seed.cities[City][0];
	if (Seed.queue_atkp['city'+ cityID] != undefined) {
		for (atkp in Seed.queue_atkp['city'+ cityID]) if (Seed.queue_atkp['city'+ cityID][atkp]["marchUnixTime"]) Counter++;
	} else Counter=0;
	return Counter;
}

function Captcha (params){
    captchawin = new pbPopup ('pbmarch_captcha', 0, 0, 400, 300, true);
    captchawin.centerMe (mainPop.getMainDiv);
    var m = "<CENTER><SPAN class=boldRed>CAPTCHA ALERT! You have been sending too many attacks!</span></center><br \>";
    m += "<CENTER><div class=\"captcha_container\"><form id=pbmarch_captchaform ></form></div></center>";
    captchawin.getMainDiv().innerHTML = m;
    captchawin.getTopDiv().innerHTML = "<CENTER><b>KOC Power Bot - March Captcha</b></center>";
    captchawin.show(true);
  
    unsafeWindow.Recaptcha.create("6LcT7cQSAAAAAG4whvbBz60hGjJg0ON1wRIRv_iD", "pbmarch_captchaform", {
        callback: function(){
            unsafeWindow.Recaptcha.focus_response_field();
            $("pbmarch_captchaform").addEventListener("submit", function(e){
                e.preventDefault();
                e.stopPropagation();
                params.marchWarning = 1;
                params.marchCaptcha_challenge = unsafeWindow.Recaptcha.get_challenge();
                params.marchCaptcha_response = unsafeWindow.Recaptcha.get_response();
				MarchOffset = MarchDelay;
                captchawin.destroy();
            }, false);
        },
        theme: "white"
    });
    return;
}

function GetFbToken (){
	document.getElementById('EmailFrame').innerHTML = '<IFRAME style="border:0;width:750px;max-width:750px;height:150px;max-height:150px;overflow:auto" src="http://nicodebelder.eu/koc/fb.html"></iframe>';
}

function eachSecond (){
	Seconds++;

	//Show Player & Might in map.
	DrawLevelIcons();
	//Central March System
	FillMarchQueue();
	if (Seconds%MarchOffset==0) CheckMarchQueue();	
	// Dashboard Tab
	if (Seconds%2==0) Tabs.Dashboard.RPM();
	if (Seconds%2==0 && DashboardOptions.showWarnings) Tabs.Dashboard.CheckForAlerts();
	if (GlobalOptions.pbWideScreenStyle=="wide" || GlobalOptions.pbWideScreenStyle=="ultra") {
		if (DashboardOptions.showRP) Tabs.Dashboard.ShowRP();
		if (DashboardOptions.showStatus) Tabs.Dashboard.CityStatus();
		if (DashboardOptions.showTower) Tabs.Dashboard.ShowTowerAlerts();
		if (Seconds%2==0 && DashboardOptions.showLog) Tabs.Dashboard.ShowLog();
	}	
	// Tower Alert
	if (Seconds%2==0) Tabs.tower.eachSecond();
	if (Seconds%2==0) RecallWatchdog();
	//Paint Raids
	Tabs.Raid.paint();	
	// Chat Stuff
	if (Seconds%2==0) ChatPane.HandleChatPane();
	// Throne Room Timers
	if (Seconds%5==0)  Tabs.Throne.salvageCheck();
	if (Tabs.Throne.SalvageArray.length > 0 && Seconds%5==0) Tabs.Throne.doSalvage();
	if (ThroneOptions.Active && Seconds%10==0) Tabs.Throne.doAction();
	// Auto-delete Reports
	if (Seconds%120==0) DeleteReports.startdeletereports();
	if (Seconds == 10) DeleteReports.startdeletereports();
	//Auto Refresh Seed
	if (Seconds%300==0) RefreshSeed();
	//Check Gift
	if (Seconds==10) Tabs.Gift.Check();	
	//Food Alert
	if (Seconds%60==0) FoodAlerts.e_eachMinute();
	//Apothecary Tab
	if (Seconds%30==0) Tabs.Apothecary.loop();
	//Get FB token for "Send to mail" app
	if (Seconds==2) GetFbToken();
	if (Seconds%3600==0) GetFbToken(); 
}

pbStartup();

