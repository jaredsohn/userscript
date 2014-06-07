/*//////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            Link Alert
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @homepage        http://userscripts.org/users/31497
// @description     Recognizes links by showing different icons beside it.
// @description     Link Alert v2.6 Beta
// @copyright       2007 - 2008 Jerone
// @version         v2.6 Beta
// @versiontext     Updated framework.
// @browser         FF3
// @include         *
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////
// ToC:
// - Rights
// - History
// - Todo
// - Note
// - Framework Check
// - Usage Instructions
// - Default Settings
// - User Script
// - Statistics
////////////////////////////////////////////////////////////////////////////
THIS  SCRIPT  IS  PROVIDED BY THE AUTHOR `AS IS' AND ANY EXPRESS OR IMPLIED
WARRANTIES,  INCLUDING, BUT  NOT  LIMITED  TO, THE  IMPLIED  WARRANTIES  OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO
EVENT  SHALL  THE  AUTHOR  BE  LIABLE  FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;  LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER  CAUSED  AND  ON  ANY THEORY OF LIABILITY,
WHETHER  IN  CONTRACT, STRICT  LIABILITY, OR  TORT  (INCLUDING NEGLIGENCE OR
OTHERWISE)  ARISING  IN  ANY  WAY  OUT  OF  THE  USE OF THIS SCRIPT, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
////////////////////////////////////////////////////////////////////////////
// History:
// - 05-05-2008: initial release [v1 Alpha];
// - 06-05-2008: added image beside mouse cursor [v1.1 Alpha];
// - 07-05-2008: recognize and hide FF extension LinkAlert, TargetAlert and Link Alert from Userjs.org [v1.2 Beta];
// - 08-05-2008: added neutral css [v1.3 Beta];
// - 09-05-2008: updated protocols, extension and conditions [v1.3.1 Beta];
// - 11-05-2008: added option for exclusion to small included images [v1.4 Beta];
// - 18-05-2008: added settings window GUI [v2 Alpha];
// - 19-05-2008: added translation en & nl [v2.1 Beta];
// - 20-05-2008: added conditions patterns [v2.2 Beta];
// - 21-05-2008: updated link types [v2.3 Beta];
// - 30-05-2008: fixed framework check [v2.4 Beta];
// - 28-07-2008: updated to latest US_functions [v2.4.1 Beta];
// - 29-08-2008: added US_options settings window and cleaned up code [v2.5 Beta];
// - 30-08-2008: fixed bug with no href [v2.5.1 Beta];
// - 02-09-2008: temporary fix for Firefox 3 [v2.5.2 Beta];
// -      -2008: added title to buttons [];
// - ##-11-2008 ##:00 []:
//   [/] fixed small bug in framework check;
// - 10-01-2009 18:00 [v2.6 Beta]:
//   [*] updated framework;
////////////////////////////////////////////////////////////////////////////
// Todo:
// - option to show inline only when hovered over;
// - fix background with some icons;
// - add icon limit, and specify link type priority;
// - add live settings;
// - ability to use arrow up and down in settings window;
// - alert when Firefox LinkAlert is used;
// - update missing protocols, extensions, conditions;
//   - moz-icon://.pdf?size=16  -> http://gnuzilla.gnu.org/fulltree/icecat-2.0.0.13-g1/modules/libpr0n/decoders/icon/nsIIconURI.idl
//   - recognize href root as home; "sitemap" in link; onmouseover/-out/ondblclick/...;
//   - link with url arguments;
//   - data, https, finger, rlogin, webster, whois, cvs, jar, nntp, bibp
//   - Yahoo => ymsgr:sendIM?jerone
//   - AIM => aim:goim?screenname=JERONE
////////////////////////////////////////////////////////////////////////////
// Note:
// - This script does NOT work with it's framework:
//   - US Framework => http://userscripts.org/scripts/show/39678
//   - US Functions => http://userscripts.org/scripts/show/16142
//   - US Language => http://userscripts.org/scripts/show/16143
//   - US Options => http://userscripts.org/scripts/show/31458
//   - US Update => http://userscripts.org/scripts/show/16144
/*//////////////////////////////////////////////////////////////////////////



//*** FRAMEWORK CHECK ***//
if(!window.US||!window.US.Framework){if(window.US!==null&&confirm("Something went wrong with the US Framework. \nMake sure it is installed correctly or reinstall the script. \n\nDo you want to go to the scripts homepage?"))GM_openInTab("http://userscripts.org/scripts/show/39678");window.US=null;return;}else if(!window.US.Framework())return;

var language=new US.Language({langMod:"browser",locals:{
	'en' : {
		'LA' : {
			'options'		: 'Options',
			'display'		: 'Display',
			'showinlineimg'	: 'Show icon inline text.',
			'showmouseimg'	: 'Show icon beside mouse cursor.',
			'showtextonly'	: 'Show text instead of an icon.',
			'showonhover'	: 'Show icons only when the link is hovered.',
			'showonhovertooltip' : 'This option is recommended, as it helps to avoid conflicts with sites.',
			'exclusion'		: 'Exclusion',
			'notwithouttext': 'Don\'t add an icon if the link doesn\'t contain any text.',
			'notifexisting'	: 'Don\'t add an icon if the link already contains an image.',
			'notifexistingnumber' : 'Minimal image size <small>(width or height)</small>',
			'notifexistingnumbertooltip' : 'Filling in 0 (zero) will use all width and heights.',
			'pixels'		: 'pixels',
			'position'		: 'Position beside cursor',
			'xas'			: 'X-as',
			'yas'			: 'Y-as',
			'misc'			: 'Miscellaneous',
			'numberimg'		: 'Number images',
			'style'			: 'Style',
			'bgColor'		: 'Background color',
			'bdColor'		: 'Border color',
			'bdSize'		: 'Border size (px)',
			'opaCity'		: 'Opacity (%)',
			
			'extensions'	: 'Extensions',
			'protocols'		: 'Protocols',
			'conditions'	: 'Conditions',
			'title'			: 'Title',
			'reference'		: 'Reference',
			'icon'			: 'Icon',
			'alt'			: 'Alternative text (alt)',
			'image'			: 'Image',
			
			'resetConfirm'	: "This will reset all settings you\'ve made on all tabs!\n\nAre you sure you want to reset all settings?",
			'pagerefresh'	: 'Changes take only place after a page <a href="javascript:top.window.location.reload(true)">refresh</a>!'}},
	'nl':{'LA':{'options':'Instellingen','display':'Weergave','showinlineimg':'Icoon in tekst weergeven.','showmouseimg':'Icoon naast muispijl weergeven.','showtextonly':'Tekst i.p.v. een icoon weergeven.','showonhover':'Icoon alleen laten zien zodra er over de link is bewogen.','showonhovertooltip' :'Dit is geadviseerd, aangezien dit conflicten met de site helpt te voorkomen.','exclusion':'Uitsluiting','notwithouttext':'Icoon niet toevoegen als de link geen enkele tekst bevat.','notifexisting':'Icoon niet toevoegen als de link al een afbeelding bevat.','notifexistingnumber' :'Minimale afbeeldinggrootte <small>(breedte of hoogte)</small>','notifexistingnumbertooltip' :'Het invullen van 0 (nul) zal er gebruik worden gemaakt van alle breedtes en hoogtes.','pixels':'pixels','position':'Positie naast muisaanwijzer','xas':'X-as','yas':'Y-as','misc':'Overige','numberimg':'Aantal iconen','style':'Stijl','bgColor':'Achtergrondkleur','bdColor':'Randkleur','bdSize':'Randdikte (px)','opaCity':'Opacity (%)',
				'extensions':'Extensies','protocols':'Protocollen','conditions':'Condities','title':'Titel','reference':'Referentie','icon':'Icoon','alt':'Alternatieve tekst (alt)','image':'Afbeelding','resetConfirm':"Dit zal alle instellingen op alle tabbladen herstellen!\n\nWeet u zeker dat u alle instellingen wilt herstellen?",'pagerefresh':'Veranderingen zullen alleen plaats vinden na het <a href="javascript:top.window.location.reload(true)">vernieuwen</a> van de pagina!'
}}}});

new US.Update({check4Update:true,updateTime:1*60*60*1000,language:"browser",title:"Link Alert",thisVersion:'v2.6 Beta',versionUrl:26356,updateUrl:26356});

eval(US.Functions.prototype({Number:[],String:[],Array:['clone'],Object:['clone']}));



//*** DEFAULT SETTINGS ***//
// DISPLAY:
const showInlineImgDefault		= true;		// [Boolean] show an image beside link;
const showMouseImgDefault		= true;		// [Boolean] show an image beside mouse cursor;
 const mouseOffsetDefault		= [10,5];	// [Array [Integer,Integer]] ([x-as,y-as]) x-as and y-as image offset from cursor;
const showTextOnlyDefault		= false;	// [Boolean] show text instead of images;
const showOnHoverDefault		= false;	// [Boolean] show icons only when the link is hovered. This option is recommended, as it helps to avoid conflicts with sites;
const numberImgDefault			= false;	// [false or Integer] maximal number of images used;

// EXCLUSION:
const notWithoutTextDefault		= false;	// [Boolean] do not add the icon if the link does not contain any text;
const notIfExistingImgDefault	= 16;		// [Boolean or Integer] don't add icon if the link already contains an image or when image is smaller then ## pixels (width or height);

// STYLE:
const imageStyleDefault = {
					bgColor:	false,		// [false or String COLOR] background color;
					bdColor:	false,		// [false or String COLOR] border color;
					bdSize:		0,			// [false or Integer] border size;
					opacity:	false,		// [false or Integer] opactiy in procent (from 0 to 100%);
					misc:		false,		// [false or String CSS] other styles (not recommended);
};

// LINK TYPES:
const protocolsDefault = [  // ['title text','alt text','href pattern','image src'],
//	['Hypertext Transfer Protocol','http','http:*',''],
	['JavaScript','Script','javascript:*','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAeklEQVR4nL1T0QoAIQjbp+/T/LPdg2RHZ2UEF4wI2XSOAAFXmBVIakRZgKQkyI/fZubVnYCTJRKBRib5FcnIWWeS+RS77p8ZVxaOvK93gHQH/6UQuaNPMRXJljjG1iZZCvQIEeS3jZKFlrWZRff2ri9x9juqMR7jVuABYkyWCOZN25gAAAAASUVORK5CYIIA'],
	['Email','Mail','mailto:*','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAB3RJTUUH1AsREw0ajKJvbAAAAAlwSFlzAAAnEAAAJxABlGlRGQAAAARnQU1BAACxjwv8YQUAAAK7SURBVHjajVNLTxNRFP7m0ZaWMm2lLS2P2pQgEBQDRCDGKGB8LFy6c2HY6cadaxbGpb+AxASNYeOCldHEhRAskKISFNGEgNA2WCrQlr7mced6ZxqwZeVNzsy5j++737nnHA6nBp2Y4OMD4kNdJw90okeIRpKaQqYW3y88G5+aLZ8+zx07L1Zo/djuk1aq4bkgNV2ua+6GYHdCK2SQ31lHdmdzLXWQG7/xeDJWTSAYn1fRzKBNLSzx8tEjXygcMcCU40E0BZTtW1xe2Bokv1DM3r830mttk4ofZ7+niUmQfPu064hIkyOXIueou93yLe1BMq2hLBNQooGjKqCr4CwW2HxBQc6r14Lupjt3hzoWp+dWUyK7IibU+52SXYBkt6M9aEex7EMiVULyj4x9ZvmiBpkRKoQiV+xEt7Tc16TPR5mAIVEjcIaxATXvgsV5xoyrziagtdkJj98Jhv1nTMz28hr6XUBygTrY0X4jUJzt6UQ6NoPyfgI6C7pcDaoC00wcV6wf4A06wDJkJoE3HIvDAf/gKPaWZnD4a90EFE6DUz/Q8nMavkjAQB0TQCSEPSbLnWizomXkNrbfzYCEMlCogPLWChR/J6hoRyD+BoGBXnAce1yWHV2rEPAVhy0yEp4HQmM3IX96DVd2HT3XryIsJuD+8hItAxdOwJQoMC82FBhSDDCICqKUsBudRXD4FhrP97MEKQgMDrMasGNvdQ3erjCrPK2i4DgE02FgrZRHKhaFu3sIDaGICQYpQZfzaGgOgOcUHGxswd3qZkq0WgK1kMP+18/w9o2irtFXA9blgvm31lvhavMh//sQDg9/8gai4RTim/B0XWQPSaHlEqC6zIqvDMpC0tUSqFoy5zxkE6wUUaVAI9mt+TnJWCCkkh7TWIXpNfPa/ZKsaEbzGt3YwWy4ujP/cxh9tvgXxcWeXrvQam0AAAAASUVORK5CYIIA'],
	['Streaming','Stream','mms:*,rtsp:*,pnm:*','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAvElEQVR4nJ2TwbHEIAxDXYpLUSkuRaXkRB06Uw0d6B%2FIJiF7%2BewwGtDYfoAZIiK8K8c9IiJs21vzEwBwa3eAK6BKzoQBukqukgE6E4v%2FFFdpBZA3gJTJWfD28cj5AgDw7lUutT6uo%2F3S0LWJJ%2BTfmvk3DZQj4QBnsDTXiW9PzfyFeOgKxnGKZ9HTJ27%2FHJCcgPOQoamgnMXFfwDQC9D6cAKm5NaHWx8TVlx8YgJaHyvgpya%2BPsb%2BM74Bu%2FoDfC636egQFQ8AAAAASUVORK5CYII%3D'],
	['Internet Relay Chat','IRC','irc:*,ircs*','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABmJLR0QA%2FwD%2FAP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QoIEAkqF3zGnQAAAzdJREFUeNpNkltoXGUUhb%2F%2FXOfMmU7mormYNE2a9JJEeiHFh9BAiQ9FGosKFppQUypFiCJNoShY1BdRAkEfDGqtUi8PbSkSFYSW2EaS0rRWkfSSqKE1oSZNrZNMZjIzmTP%2F+X2IU7pgPe2911osNkoplFLsixjBfRFj2+eHDw7kMmlfKaUufPVm4ccTdenJkeqfpwYivRffqdhc3C9S43%2FUbq532g7WvtLQ2tBuO64AGL3j6F+evuVaIbkt3hI90tShjUydrX7vVE%2FUKd4ZAF%2F0tNvth8w+013umpu8WZzR399PLmVwNJvFMP9BaDIUrgm85qRLdOAIsJJg7RNzr6%2Fdmu8qXb0Fy%2FqL2T%2FHAHi5u5u9z7YgCwso4WHGfM70xrh%2Fv76jaKLXy2%2FWb2pJnIhUbLcDVh26Pc%2FExZO40U3s3L2HSvsHVsXHWZwXvN9ZRljVEI+WHG14puMygPFYTbIzXGasssL%2FonImpVUSXU8xM9HO32MJQnGfs18LRk9HaFpXQTxSctu2jP4HHYSjqSeNQBWaGkQEWnG0NOXOItHyNNcu+XzULUjO2qxbEyUei2Db5oFdxwbkAwFT5BoVAvw8aIMYZj1LyRTH38hx%2FiQIoXBdgROwsE3jxtOffjvEQ9DIK2Teo1AAfEDd5lRviuEzOpZlEAvoVLsGpYaHm7gzOtQkrIcFxNWPA8Ord0a3O+497IBE0wRSwu9X4Ps+k%2FKJPKaAuANBQMBvwAs7bqhrAFpySpwvzC+SzQRYWoR0ErJLGlXrFd3HPNa8KxiOwa9LkFCQhy15uDrUJBoB9K3R4MzGSGa%2FqPRsX4DvCaSvkAXwfSithB27YDYIl4chLcFT6PgsN7769jnt0HfJP8Yv2H1qTKGWwfdXftwvgC9B5gAPnmqDng8Edx+N8ZMXGpzM8xmAUErxUnNJ4LmypQ8bO+WLZjMgQQnwcqALEGngLqhbIGc1JrMtI22fDLey0gkGEIzZ2iOHN7D%2F+Vq%2FJ7SbELVQyIAQIKZBjIN3T8jriyWXuoZSbyUy8iaQEEAccAEH0OrC+uMHNqrmDbbf1mjRYElEymB6NC2uH58WE7%2FM+FeABWAOWPgPZo5Lm3GH7XwAAAAASUVORK5CYII%3D'],
	['News','News','nntp:*,news:*,snews:*,newspost:*,newsreply:*,snewspost:*,snewsreply:*','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEX6+vrs7OyFhYjCwsPPyYrLy8yFQ0f19fXn5cRpaWrb29t2dna7u7y1tbX69ofX1MagoJ3k49/Fztfe24/S0dFbW1t3ck1KSUnRzrvW1taQkJHMyrp5e3/Bvrvg4N/o6Ofmj5W/t5fw6oaYmJpiX0rv7/HPgH/Y0XzciIfl5u5+rN7Y2NjY0drGxsastLuxr62xwdawsLDf4eHTz6XR0aHoxcnw0NDu7Ye/tWiAgIDQ2uPR0dft5OBUQET9/f3///8RAAAABAAAACBtjwBoG3YAOPkSACaLOX5oG3YA7P///0UJkXxOCZF8oL8VACQAAgBE+hIABAAAAJBBkXxY+RIAAAAAAMgFkXxk+RIAAAAAAMgFkXzYRhkAMPoSAFEFkXzYBxQAbQWRfPRGGQDgRhkAAAAAAAAAFAAAAAAAOIZIAJi9FQAAAAAAqJqDfFQAAQAFAAAA/PgSAJi3FQDk+RIAGO6QfHAFkXz/////bQWRfGIZkXyTGZF8gMCXfHAZkXxYIxkAOAAAAPRGGQAA4P1/zPkSABgCAAAo+hIAGO6QfHgZkXz/////cBmRfAAAFAACGZF89EYZAOBGGQAAAAAA+CIZAMjAAQAHAAAAdPkSAAAAAAB0+hIAGO6QfHAFkXz/////bQWRfFvugHwAABQAAAAAAGfugHyk2Dl+AABAAAEAAAAA4P1/AQAAAAAAAABAAQAA4EYZAJi9FQAAAAAARPoSAAAAAACw/xIAqJqDfHDugHz/////Z+6AfFxXQwDgRhkApNg5fiQAAAAgCAAAiMGXcLGvyAEcW3NJwK/IAYjBl3Cxr8gBAAAAAJ8BAADohRlbCA+HAAAAAACIfRQAAPsSAAAAAAAgAQAALPsAAAAAFADY+BIAAAAAADT7EgAY7pB88AaRfP/////rBpF835mAfAAAFAAIABQA8JmAfKTYOX4AAAAAAAAAAAAAAAAAAAAARNpEANl9FACsfRcA3X0UAI2GSAD/////iH0UAJ7aRADZfRQAc9BEAIh9FABOK9x5AAABAHRSTlP///////////////////////////////////////////////////////////////////////////////////8A////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////iVzbAQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAANZJREFUGJVNz9tSwyAQBuAliJGUYtOQ5tA0sSKeEDWesbq8/1uVtOOMe7Gz+93svxCOhZj2PcYBpgUAsoZYkR0AU6KsVY7SfDNMQJix1NG5ArFs0gi2dSDonWFPy/tvghAY9zrNtydroZ4fhwiGtb6tb2Sxcz+9g3gFLeddXci3h9uPzgASNh912a0vP+uL69IAa5tcuUWlX2XxfpogCF/ORJPpclPI7e/LlMMlFRf9zJ/JVYKH6MB0pSk//7oix19iz3jiF6td+IMQzMj5iP8gwDBMe9gDLFkjvDMDeI8AAAAASUVORK5CYIIA'],
	['RSS','RSS','feed:*','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABNUlEQVR4nKWTLZCEMAyFEfF49Pn1q/H1aHw8uh6PxuPR+Prq+PiYd6K0LAt7N3Mn3jSdtF9e+lNVqKp/KQfiawgT4i8SJoivcQKIryG+hiwOsnno5mHbAF1a2NzAlrPy+gPABJsbxLmDmZ0l2wF6kTAdgMgEm2rI2CCMLbaxRZgZGkMB6drDproo3gFsqou9HOvCMFWYGWTpPwAclQ2H9QBdOpgnxPFRIDo9E8C9AzzBBoLGFXKy7mGeIDOneVwT9BawQ4QJ6/B8qeogTOVM1H/dAIZjc4634blXDSmXXSx8BQgTTELp3/r90exVhQkyJqDMwxUQuTndvzDBeoKGFWaG4Aj2CSCOoN3RY3ZQXPgHtEtxnD1kdGeAdjugI4Q2jRlwJ+3ebqGcg0uJn5TXXH7jX7/zNxtNVbpvO/HYAAAAAElFTkSuQmCCAA=='],
	['Opera','Opera','opera:*','data:image\/gif;base64,R0lGODdhEAAQAPf%2FAPjBvvGyrOyhmfycm%2FCWlO6dmueDgvZ7evF2ce1uZ+liYuVaWt52dddvYNdlYdlrX91MSs1PT8NPR8dDRNg+P9U7PM46O8wyM4tAPL4vML8lJrcoKa4nKbMZG7IXGa8YGpoiI4I5N4kfIZ0bHZMdH3t7e2MnKQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAQABAABwiEAE8IHEiwoEGBJkBo8OChwkGEHByeMDFCYkGKFgia6EDBIIkICzQ2vEigwAGRIweaYADgpEqGFidKMOASIcwTJXKa2DCBQomXGRTkRPjBg8+hJiQ4QJDzpwmGHZuaaCAgQdOfIlLmDBFggMCrFC8MLIHhgYKxUkeIlQnBYFqGHtY+nBsQADs%3D'],
	['eDonkey','eD2k','ed2k:*','data:image\/gif;base64,R0lGODdhEAAQAPcAAP%2F%2F%2F2QpCdOLS9yjbNGISc6CQK5iJ8d2MbdpKuvJmeS4htOOUppVInc4D+GvfNeZWoZGGo5KGtSNTq5jJ5VPHbhrLHk5EJtXJKZdJMZ1MF0tDt6qfe3PtbVvNsBxL9ifbtzW0QAAAI5NHkUxKjI3PnAyDs+HSvbn2pyWkUFAQadgKtS1leXc0vLy8b29tpVOHdyiXNeUU8p7ONSSWcJ3OcaDOM2ugGtsbxcWFLOzsKtgJtSOT+%2FVp+GxfrRoLK1iKL59P7a2sKqqp6Cgn+Pj4M2BP9maYduga71vLrZxOdTNwunp5vf39vn5+e7u7G4xDLVoKticR8d3MbpsLKFYIbaLZ8nCudzc2unp5+%2Fv7ufn5aVcJaZdJZxUIHxNLaCgnsrKxmRna8zMx9%2Ff24eIiZdRHoM%2FFGgrCWUpCVctFj8zMG1wcpeXl7Ozsk5SV5FMG8N6MeScP9SMOKxjKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHQALAAAAAAQABAABwjhAOkIDEBwIMGDAQTSCSAgIcEBBAoUMJBw4AEEBBMoWFCAQUGFARA0KODgAQEIH0EGiFBAQoEJFRXKDEChwoQJFi7EnBkAQ4UMGjZw6LATZAUPGT4AABFCRIARJEgMLHGgwAETJ1CkULGCRQsXUgO8kAAjhgwTM2jUsHEDR4scJALo2MGjhwQZPn4ACSJkSAsicSkUMXLkLpIfSZQsYdLESdwnUIoUiSJlCpUqVq5gyaIlroUAW7Zw2dLFyxcwYcSMIUPiSYQyZs6gSaOGxBo2bdxEpfPkDZw4cuagERh1t8CAADs%3D'],
	['DCHub','dchub','dchub:*','data:image\/gif;base64,R0lGODdhEAAQAPf%2FAAAAADc3Nzk5OTw8PE5PR01NTVJSUlVVVXN4SmlpaXt7e3x8fICNHaSwQ7C6Xay3Z73HabvDc8TbEcrfGsngE8vhFszjFs7kGs7kHNDlIdHmJtToK9bpNtfoPtjqOsDMWcDNXs%2FeT83YZtjoR9ztS9nmVd%2FuVuLvcuPwb+TwauXxdoCAgIuLi42NjbK5jKWlpampqaysrLGxsbW1tbm5ub6+vs%2FTstLZqNbZtdvfud3ljtjhk+DqjePtmujwoe%2F2pu72qPH3scHBwcbGxsjIyM3NzdPT09TU1NnZ2d%2Ff3+DjxODh0ufo2OLi4ubm5unp6ezs7PHx8fb29vj4+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAABwi0AAEIHEiwoEEAMxLOODiQhhMoEKEgWWhQCBMdPJQgQeLESZGCM5aE+BEEBQ4hM4QcoSjwSIQKGGI2MLBiRQIaA2EcgTBBg08GAQQIXUHxRREbHVKUGIFA6FAYAl8IKZJDBJAfIAgUKGCABlQAMIoUcaHBA4cNDlq0oHHkK4AiRx5IqED3g9gjHwfOcHKDgwkTJHYc4chSoBApPVCo8NERipCDNKBImSJFChScDBHSoFE4c+aAADs%3D'],
	['Magnet','Magnet','magnet:*','data:image\/gif;base64,R0lGODdhEAAQAPf%2FAAAAABgYGCYmJi0tLTIyMjg4OD09PUFBQUZGRkhISFRUVFxcXGZWV3FbXHJcXWFhYWtra3hlZqQQD7USFLgSFb0TFr4UF6goJqotK6A4NqI9OqwzMbc6O4lbW415eq1UUrdmablnZ7FxcLh9fMEUF8YUGdQvNt8vN+EZIeUZIukaI+obJOImLuMoMOAvNeQuNe4nMO8qMvAuN%2FAyO%2FM1Pd5ES+BfZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAABwiSAAEIHEiwoEEACgwcNOghQYEBCwfOeOGggAEIEWOsWOHCQQAECzVuXMEBIoAFBWeMXDFhg8AHBgoMtDEyxYQMAmtEMCBAJgCRKyxoEOhCxQkGBkzC2JjCJQAWI00gUAjAxUgQT2tO6DAwRAqmX0dauFCQxEqmE8gWFGEh7Aqbag2KkGChhAUJGCIK%2FHBhw4iFAQEAOw%3D%3D'],
	['ICQ','icq','icq:*','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABjklEQVR4nH1TO47CMBCdIEeuLC2KEopUSCnwEaiR0nGANFSk4CykBGmVO7BXwUcg7VIsCCkSKOFtYY0h/IqRbGvmzZs3zwSAHmO//8X9vSiWCIMIRbHEY+5T8WQyIakEiAjGGOiRRpwKTLc+4lRAjzQ+AhARZpceZpceiAhSCWSth6z13NsLgOsTQNZ66CcCUgl3Z4CmaW/516stzvM5wiCCHmn0E1ukF36HgV74ICKEQYQwiFBVO4silcC49DHd+i6pn9i5mdG4tOdx6XdGpM3PBnF665K1nivkYNDp1u/khEEEMsa4OTkYoK491LXVQi8suzi1uoRBBCdiUSw7HTkYYLXuuTepLAARoSiWVoOmaUkqge+vCMfBEMfBEESE1bqHuvYgldWDt3G/EcfgsZiIEKfirQZZa4EJAB0Of0/0uQvrw1vQC7+jkzMEm4Pp3tO875jnc+eF0+nUtXJV7V5ad1xawDgVMMa8/wvn89kZh0HCIIJUAv3E6sHO/fgbWUCpBKpqh6Zp6bEz/51/Y2Me0ObHgqQAAAAASUVORK5CYIIA'],
	['Gopher','gopher','gopher:*,cso:*','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAADzklEQVR42mJgAAJxIbZLab6S/7XkuVcw4AG6Stwrkjwl/3lbivwHcrMAAogRJMjMxBBel6i9QpL/2//aBU/vachz/f316x/jP5ASIGZmZvzPxMTA7GwgqGStKsrYsuH2g0NnP2gBBBAj1FAHFRGu/T7mvAyWBnwMrJ//MChrizBwMwClWRgZnrz+xvDqySeGlwxsDFsvvGU4df7d9XdfGbQAAogJ5qT8eCmGZDdJhusftRlWffJh2HToKcOfv4wM37/8Zmjb8pPhHH8qAys7O8PMGFUGRVk+sB6AAAJr5uVmttfk5WJYfO4Pw18JR4YVC2YwcPFyMNz98pXhBxsDw+uXLxh27NjKcJctlOHMoxcM5ho8kkBtGgABBNasrcgdrqrAxeCpwcawb0MfUOQ3gzgrB8Ov138Y/v35zyAjxspw4exJBu536xjUpUQYvPWEBYCKnAECiAWk+c+n/wzfPv9j4ONiZqgP5GV4bq/BYK3Px3Dk5ieGP0Bv1/kpMHgZCTFYKjIz/PjFxPDj9z+wswECCGzzX/b/v35xMDB8+fWbQYyPnUFfhofh3JUvDNNXP2BYtucFw88//xjsNQQZfrL9Z/jJ+5/hFzMoGhh+AwQQM4h88e7XPV05nlhLhf8Mr34zMbz5+I9hwaGHDLvPfwGG9HcGQU5mBmUZXoYff78wyLOwMhQtfHD96eufSQABxAIN7NPrTr68w8gursL1/wfDvXdfGJrzfBi8HF8wqCpKMfz7eJ+Bi+M7w8uH7AzTnr5luP3420qQJoAAAtnMbqrBu6o1Vsn83qPvDKfvf2Y4fuEZg0lwP8PTT/wMpu7ZDFMW7WA4d+0aw5VXPxmsVfgYbHT4HXade/cAIIBANmc2xCp4inCyMngZCjN4WQoxdK/4zPDq7VeGz19/Mrx5/4Xh6avvDDHAADRWFmX4DbROiImZIdhQdCpAALEE2ojUqfBzMnxh+8fw6dt/BuFfjAzRTkoMc+dkMbACFd48Mo3BWJgFGGASDF9+/2X4DEyv3Iz/Gf5w/GcACCAWVhZGNhZuRoYHl34yyKh8Y3j5lYdBkpuDoTVIhuH/3/8MnMJMDIdPfGRYfOolME7/M0jyfmWQNVVhYAImW4AAAD0Awv8CBgUCABcLBgCv0eoACgcTACEMCgACEPkA+wf1APsNBQDAz/AAz+r1ABYNBgAOCwUADhQXAAX6AADw8vzsAohRRYbzpbUqH+/RS5/+6elwMzAzMjJ8AgYEKPWyMDMy3H76nUGAlYVBXpSD4S/Q5v8sDCwvPv98t/P0eyeAAAMAQVY/iW4xBQcAAAAASUVORK5CYIIAAA=='],
	['AIM','aim','aim:*','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABe0lEQVR4nJWS2yvDcRjGv3cWLqSYFT+GJMY0bWyJiWFyKBEXLuyCUA7JoZREuRStkKKUcggpaiGHiOLGISGnSPkP3CzyccFq8tNvu3jrqff7fOp9vo8QCKE4HiW788G8M12Oa7xEHqJkvlmphvtWeGxne0IGogS4Xa2Buxa4b2N3ssxPwA/keL6So9kK/09IStQihCA8NBCVSuVfiGn6FNZH7PDUzlS/lZSEMMyGb2B0lAZFgDlVDecNfB474LoRzurhvAGumsnPjFQGCCHgtI73w1pGOy04u804eyxU2uJI0yf7CDiowr1bxWBTOsFBAUiS5FuI8bESl7PFuF12PrdLYa+Mi5kirKYYZUCMNpaxrgw+XDaeFwoZ7TDxsmSHrQJel+0YdWr5Huh0SWQbNCwOWHCv5fK2bvuFXhnKgo08TiZy0EoRfzNQh4XwMFcIm1Ze5nJlGieY7jXCfunvnfeDPoeO4TYD+kTNP6X5VsZ0/T+/4FFK9fbyfAGrQGpdwvUMagAAAABJRU5ErkJgggA='],
	['About','about','about:*','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAhklEQVQ4jaWTgQrAIAhE/Xi/ra8K2o6QLpvNtsHBbOfrHCi1Vvmj8SLSsloAOJyffc0QB8iB4FfVFiYopdwmnYQzThAA7IbehJph6QQww8B1ByQT8MwwDmAygRmtmec/SuBHOU4Q1UcJ+Od9SBCBHeBtF7iRmycAhA9P6pC1eQFs19ZtoekCN/LNMQUwNGMAAAAASUVORK5CYIIA'],
	['SMS','SMS','sms:*,smsto:*','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEU1MzXsxfDdueHmwup1Y3e+ocF2ZHjIq8tIPkmgjqJzaXTtxvLOrNLtx/LrxfDTsdfLrc/Jq82qkK1lVmfeveLQstS2nLl8aH+vlLOVgZiijqWplayrl65mXGhtaG4aGhs6Ojv+XQD+YQb+dyn+hkH+ikb+klT+pHD+qnr+tYr+u5T+w6Dxupzxwqj+z7T+4M/+8uvdTADPRADedD7hjmLqvae+rKPSv7XGPwCZTSjNl37kuqetMwClMAB5MxWRTjHdrpujioDQy8mfRSJdGAJxJAuYORilSCiOgX3++/pPEQCZRCqiWkWeWkqgXk5zFQKceHK1r66VZFyPcW2KUky3n5z+/v7R0dHKysrCwsK9vb27u7uysrKtra2pqammpqajo6OhoaGfn5+enp6cnJyZmZmXl5eUlJSTk5OLi4uGhoaBgYF7e3t3d3dzc3Nvb29ra2tpaWlkZGRcXFxbW1tZWVlYWFhVVVVLS0suLi4pKSkmJiYVFRUNDQ0CAgL///9wIxkAOAAAAMxHGQAA8P1/zPkSABgCAAAo+hIAGO6QfHgZkXz/////cBmRfAAAFAACGZF8zEcZALhHGQAAAAAAECMZAMjAAQAHAAAAdPkSAAAAAAB0+hIAGO6QfHAFkXz/////bQWRfFvugHwAABQAAAAAAGfugHyk2Dl+AABAAAEAAAAA8P1/AQAAAAAAAABIAQAAuEcZALC9FQAAAAAARPoSAAAAAACw/xIAqJqDfHDugHz/////Z+6AfFxXQwC4RxkApNg5fiQAAAAgCAAAqEkoBbKvyAEsLDK0ta/IAahJKAWyr8gBAAAAAHYCAADohRlbrg8OAAAAAACYfRQALmdpZgAAAAAgAQAALPsAAAAAFADY+BIAAAAAADT7EgAY7pB88AaRfP/////rBpF835mAfAAAFAAIABQA8JmAfKTYOX4AAAAAAAAAAAAAAAAAAAAARNpEAO19FAAUfRcA8X0UAJGGSAD/////mH0UAJ7aRADtfRQAc9BEAJh9FAAQgZFtAAABAHRSTlP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BQHOGAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAANNJREFUGJVjqAcCdk4uWVlJ1nquAql6BiBfuijKzNGjrIohplgQLCBnbmJp5+rjVBZWzQ8SYC7S0bWyd/HyjYyvqQcJsGebhnkamDr7xxVygAXEkxz09bQ1VNzz5NkgAnHWWprqqkp+JbUSEIF4YzVVZUXDgHx5RohAgpEiENgEKgjXQwQSg2wtFBW9M+qYIAJiOWnRoSFuwRUgBSABgdKknNzU6ORaJqiAYEFWQUpaOEQBWKA0Nj09E2ICWIBXoTwtMqKSpR4mUM8txFEjz8EIEQAAmEFUzWfjulMAAAAASUVORK5CYIIA'],
	['File Transfer Protocol','ftp','ftp:*','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAAACAAIAAAICAgAAAgACAgIAAwMDAwNzA8MqmBAQECAgIDAwMERERFhYWHBwcIiIiKSkpVVVVTU1NQkJCOTk5gHz/UFD/kwDW/+zMxtbv1ufnkKmtAAAzAABmAACZAADMADMAADMzADNmADOZADPMADP/AGYAAGYzAGZmAGaZAGbMAGb/AJkAAJkzAJlmAJmZAJnMAJn/AMwAAMwzAMxmAMyZAMzMAMz/AP9mAP+ZAP/MMwAAMwAzMwBmMwCZMwDMMwD/MzMAMzMzMzNmMzOZMzPMMzP/M2YAM2YzM2ZmM2aZM2bMM2b/M5kAM5kzM5lmM5mZM5nMM5n/M8wAM8wzM8xmM8yZM8zMM8z/M/8zM/9mM/+ZM//MM///ZgAAZgAzZgBmZgCZZgDMZgD/ZjMAZjMzZjNmZjOZZjPMZjP/ZmYAZmYzZmZmZmaZZmbMZpkAZpkzZplmZpmZZpnMZpn/ZswAZswzZsyZZszMZsz/Zv8AZv8zZv+ZZv/MzAD//wDMmZkAmTOZmQCZmQDMmQAAmTMzmQBmmTPMmQD/mWYAmWYzmTNmmWaZmWbMmTP/mZkzmZlmmZmZmZnMmZn/mcwAmcwzZsxmmcyZmczMmcz/mf8Amf8zmcxmmf+Zmf/Mmf//zAAAmQAzzABmzACZzADMmTMAzDMzzDNmzDOZzDPMzDP/zGYAzGYzmWZmzGaZzGbMmWb/zJkAzJkzzJlmzJmZzJnMzJn/zMwAzMwzzMxmzMyZzMzMzMz/zP8AzP8zmf9mzP+ZzP/MzP//zAAz/wBm/wCZzDMA/zMz/zNm/zOZ/zPM/zP//2YA/2YzzGZm/2aZ/2bMzGb//5kA/5kz/5lm/5mZ/5nM/5n//8wA/8wz/8xm/8yZ/8zM/8z///8zzP9m//+Z///MZmb/Zv9mZv///2Zm/2b///9mIQClX19fd3d3hoaGlpaWy8vLsrKy19fX3d3d4+Pj6urq8fHx+Pj48Pv/pKCggICAAAD/AP8AAP///wAA/wD///8A////Bl8jrgAAAMNJREFUOE+Vk4EVgzAIRHWmdCbnYA13ijMhR4IlmDQpfbw+a+7fQXXfQqWc2H66Ptce7w+vIUSjNnyodDrkelaN0IkVcvIcorFx2ItF6MTjFGfW1Izw5gihNUYggVu/pvEAhYg4CIpDrRcMgGdhcggHooBZqJ2WNDKazS7zqzhL5tDe1YMKAFUhX/e+I8QQGaQF1EWV+P8CaorVBNVZ0zT/yioAO+o+nKMl+qUG9y7Iov36nr0d5T6ciWj+MjncinsDvAEyEbGZjEKV4wAAAABJRU5ErkJgggA='],
	['Prospero Directory Service','prospero','prospero:*',''],
	['Wide Area Information Servers','wais','wais:*',''],
	['Telnet','Telnet','telnet:*,tn3270:*,rlogin:*',''],
null];

const extensionsDefault = [  // ['title text','alt text','href pattern','image src'],
	['','','data:text*,*.htm,*.html,*.php,*.asp,*.jsp,*.esp,*.pl,*.cgi,*.php3,*.xhtml,*.cfm,*.cfml,*.shtml,*.xht,*.xhtm,*.dml,*.stm,*\/',''],
	['Image','Image','*.jpg,*.jpe,*.jpeg,*.gif,*.png,*.bmp,*.ico,*.svg,*.svgz,*.xbm,*.drw,*.psp,*.tif,*.tiff,data:image*','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACIUlEQVR4nJ3MzUvTARzH8d+KDkLgPyH0cF7dOiV4DbpEXYQGdSgyyiDNxIpmjopIXSsTelLnfCCXDynDfOjXRnMjt/10bLpc6pqNPbq5rW3vDtFw/XaIvvC+fT8vQUAQBARBrfdSrlbDKndeSaj1Xv78lrQb+PsKBcjmIfUT1HovTVNxVPX3+Sdg9ziahuqeHap7djjeucFNtZayQDabLTveSoLV9bt+Y5Lme+/QdvcjA9LpNCgVxcTGRuY2YTUC/hh4wyD9gEnLNpcb2uRAKpUqjjPKfRy7aEKhA4UO2mzgCMLCGpgWEtSevy4HEontIlBb3U5VnasIKHTw3lvA8hUmrQlOn70qB8LROCgVRI5UUlMzIAPuigXmV2DcEpcDt1+6CIaiOD45kaxu9mtiVLTHqez1FwHd5xwfPDBqLgO0dNlZD4ZZj4MvAmp7hlPRE1zIHGXvswwnDSmMy3mm3PD2Y0wONHWY8W2G8EXAHYLwkorswh42nBV4LVV0iUkmPDAmwfBcVA40PJzF49/CHYKVbyJR62EC4gEC4kGC5kNMz7UwJMGIEwwzZYBrrVO4fN9xBMEWANNKnnF3DuNSjmFXngFXAb0ThhahbzoiB67cGuWLZxNbAMzrMLsGplWY8MDIMgxK0OuAPju8MYU5o6ovBS7dGOL5oJunfRJPehxoXy+ie2FF222hs0ukQzfP484ZNI/G0DyY4Fxdcynwv/0Cz2qWU3AwRJYAAAAASUVORK5CYIIA'],
	['Flash','Flash','*.swf,*.aam,*.fla','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEW7u7vj4+Pt7e3p6enq6urn5+fHx8fHztWRkZH7+/uWo7G5ubn///+vusfs7OxccYS1tbXV1dXl5eXu7u7ExMTFxcXDw8O4uLjCwsLi5uuJmamDkqL29vZgdYfv7+9xg5VMYnfAwMCap7X19fXg5urO1d23t7ewucG8vLySkpKsrKyJk53Y2Nja4OQJPWCouccUOVdohZqAkJ/T09OMm6l/l6mVlZWVoa2tra2hoaHo6Oja3+S/x8+ysrKzwMr5+flZboHV2+PZ2dnm5uYEMFIEMVJ3hpZaboLBydDr6+t/jJhwiJskVXT6+vrf39/p7PDr7vCKorT39/fu8PN2hpXJ0dve4uYwXn22v8nb29uvuMFfc4WGlaWttr6Pj49afpZkgZWampqrq6u5wsoELk7v8vQQRGbP1d3Nzc309PTU2+Hy8vIbPVp9jJu9vb0tXny/yNB4goytuMRfc4fV2+IFNli7xc4EM1XW1tbg4ODk5OSKmafa2tr4+PrJ0NpmhZuvr6/Dy9IiVXXLy8u2v8jh4eG+vr7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADw8ol6AAABAHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8A////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VaHmrwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAONJREFUGJVjaG9n0GDgVmNoq2wHA4b29jxGRj9jMQHxDJhAm5BQVaugiJYMG0yAlZXVmbGigQcsAhRQ9GRhYbZyEjeLS6wBC0gICzMx8bEItiVZWkAEotwUFEJi+XSa2QTAAl78Ury8UvzmTMyR3CCBZNmi0LrA/HBZdTnmNpCAkZJjiX6TT71SbracIkjAPV1SMj7NMEvVQTlTDCRQrBusolfqamcdHaQsAhIwiag1Lfcu82+p9rUXBQk0Sie4GKTyhEl7cHKCBdq1U3IKAmxiCjk0OWzBAu3sXPLyXOwQ37cDAF5VTv8iZduQAAAAAElFTkSuQmCCAA=='],
	['Video Movie','Video','*.asf,*.avi,*.mov,*.mp4,*.mpe,*.mpeg,*.mpg,*.qt,*.ram,*.rm,*.wmv','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAvElEQVR4nJ2TwbHEIAxDXYpLUSkuRaXkRB06Uw0d6B%2FIJiF7%2BewwGtDYfoAZIiK8K8c9IiJs21vzEwBwa3eAK6BKzoQBukqukgE6E4v%2FFFdpBZA3gJTJWfD28cj5AgDw7lUutT6uo%2F3S0LWJJ%2BTfmvk3DZQj4QBnsDTXiW9PzfyFeOgKxnGKZ9HTJ27%2FHJCcgPOQoamgnMXFfwDQC9D6cAKm5NaHWx8TVlx8YgJaHyvgpya%2BPsb%2BM74Bu%2FoDfC636egQFQ8AAAAASUVORK5CYII%3D'],
	['Audio','Audio','*.aac,*.aiff,*.asx,*.au,*.m3u,*.mid,*.midi,*.mp3,*.ogg,*.ra,*.snd,*.wav,*.wma','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABl0lEQVR4nJ3P3UuTARTH8fMv9R94Uwp2kaBpWIjDUiRiuBRCDLcnX2JQos6y6cTW3HyZbo0tQbbmhs6XBT3OTWurYKgrvXDeeLELv114YyGPmxfn5vz4fQ5HBJFipqp7iubX88R2c/yTFQvce+mlyrzEM+9PllMXkGKBZtsGTc4MLa4ftNk3SgceO5Ion7JUvwpR9vRd6YDeGiS2m6PGZOeGTrnGC4N+BBGTzUfFE3PpQOuQD0FkcVXFG46XDtT3THNp9v9CzRzijx/giWWJqlm20nsIIg96Z64GllN5rKEjFN8RBuceylyCfleEhUiChr5ZbSCazmMKHLO5X2DzD0yoZ+hnMlQaXdzpHKdjaF4baPfksKfg1ykkT8CdAcP0DuWd76k1TmG0eLSBupGvKKE8k8kCk9sFepYOqTMHuP3cwcM3K1iCv7WBxpEw9weCtE58ocUW526fl8quDzwai9Hh3Lq8fBFwRNLUvnBxyzDKTcPb88vWNdpnv+Fez14NCCLule/ohj/TYImiG11j4GOCsKpRRuQvG2SsxuXIJ3AAAAAASUVORK5CYIIA'],
	['Compressed','Zip','*.zip,*.rar,*.tar,*.tgz,*.gz,*.bz2,*.tbz2,*.gzip,*.z,*.sit,*.cab,*.7z,*.lzh,*.pkg','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAAxUlEQVQ4jc2TsQ2DMBRELxGDZAdTIKo%2FTdjEO3xGoaKk4A%2FDBJciItjGKDiiyDWWz9bzs2QDF%2BeWFqpg2nXdft%2BpqILLspBUeu9JKkll7pCvhqqgc08AwDA80LYtRATz%2FO7M%2Biwgta%2FCyQYc0DRN1K3jFoOZAegZilXYxQAA0zRF84Ntu9xz5XrdcRzzEAPgCoAiAu89RCRecAGsxHA1%2BximZr8YhuPO7BLDE7A80BLDAhhw8LBLUtd9xEn%2F6OkvdiT2%2F3kBn8BaKKL8%2BTkAAAAASUVORK5CYII%3D'],
	['Text','Text','*.txt,*.rtf,*.log,*.readme,*read.me','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAByElEQVQ4jaWTv2tTURTHP%2B%2B%2B5JH3wnuStEhtEESjvElcLTaYIG7i4Og%2FEHAJFO3qkkkcHd0cBV0bxAylg0RaUtEpaa2KBkLqC7Fp8%2BseB82jpSFE%2FMIZzuHcz%2F1w4RpMSbu5I1prtNZ0Wp9JLl7FducwTROllAFgjJe11lJ%2Bfpezl0a8efmd%2BUWXa0su5bcLZHMNXr%2B6yLn5gJv3H5NKpbBt2wBQY8DmZoNSbYUXa48AWLh8j7VSmivXC3ysplm6fQeASqVCEASndVdXy7K%2BsSfFfFYanbYU81lpHnSkmM9Kt9%2BTYj4rWmspFApSr9dlIqD0fksanXZYzYOOBIdd6fZ7MhgOQ0CtVgsB6jjEUta0N52YyPFGyx%2FwsydPw9lyJsONzPJsAP6KPXi4AoCpFFFlzm4g5vCUwdjiVi43g8HInGhgmSYjrTGVmg4wRpH%2FM1AR458NTkwGehAabL%2BrTLxxqkFf90MDZRgg8KFa5eiox49vX%2FnZ2sf3faLRaHgm%2FExBEMjWdp2dvU982d1lv9VCD4c4joPneXieRzKZJJ1O4%2Fs%2BiUTCOGEQj8e5cD7J4a85ztg2ruvieR6O42DbNpZlEYvFwn6c350SyCzTnE%2F5AAAAAElFTkSuQmCC'],
	['Torrent','Torrent','*.torrent','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAnBJREFUOE+NU11Ik2EUfocodNEP2jTcTLe5rOiioMALC5OE/qMuJKLroDCCoj/NKCrNrE3362yuqXPFLP8ozfzZXFMxdc5MQmltNQbeTAeD5qx8+r7XJtYUfeHw8p3vO895nnOej0P+nngZDzFRMSQ6Kpr4gj6aBUA4HM7CzV3DJbO/Z8kc5og3180J15JERTIS5Hysk8atKkTlaeApUkAB+EoBkpRCWrhWErvqm6dMAZ8Jslkliui6XrqRMhJXbAcrbTlmovKtICJN2j+dUzXbcKHtImSDCuhG9EivzliWmUC9BSSubNNCh72G/ZAPKvG4X4KS/ieocGihHdEhr7sAGYbMCCbxch5IWPuOyl1QDKlQ1FeM119aYPneDd1HPapGa1A79hySD6VLMqEAG0q5yO++jQe9RWhztdOCFudbzPycQSAUgO+Hj75nv/t/HhRAzOh+6qhkaEvwxtkKq8cG57QTp+pzsLsqnZFwC1PBKeQ0nonYEgXIfnEIxX0leDXeQGlPB/00t7jbzmd7wG5ncY59JlxZIo69PIm7tvtod3Wg5lMtvAEvktWpK/oiSSUEEajFyDJmM5OXwvS5DvrRavhn/BR0JWfuq80COd10FkLGmlqHjtnAI3S4u2Dz9ODrtAuHTcfBMlzKobFlCcg0HgA513qemuVy51UK0DDRRKOTAQr9CmF40gHDmBGlAzJIB8qgsmtQP96Ia+YbOFJ3Yv5/yH13CQdNR6mMwt6HdJhWz3tGTg0aJ5ph/mbB0KQd9slhdLnNdGM3LfnzxeFz3ZyHAusdXGGYsHGvp5ACscHORWlXU5OxhpIybMJ1fwAb2yXfFl+F6gAAAABJRU5ErkJgggA='],
	['PDF','PDF','*.pdf','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABp1BMVEX%2F%2FwC8vLweHh4lJSVAQEDCwsLFxcXs7Oz29vb%2B%2Fv7S0tK%2Fv7%2FQ0NDb29vkcHDgb3DMzMzq6urkjI7hXV%2Fu4eTSZGjXtbjj7O%2Fv%2Fv7u7%2FHu2dvpu73iWlry8vLx8fHw8PDag4XsUlLmR0fmSEnoqanoS0zq0tXp6eno6Oj19fXpqarljo%2Fo7PDpfHv09PSxsbHm5ubt7e3nmZzcOzrn2trZ2dnj4%2BO2trbg4ODNzc3k5OTi4eLeTk3z8%2FPc3NzU1NS7u7vR0dHX19ff39%2Fb2trSUVLd3d3Pz8%2FLy8vT09PGxsbBwcHHx8e6urrExMTKysrl5eWABAbWGRzY2NiLi41%2BfoBycnR0dHeJiYyKAALaAAPtAAP5AAP%2BBAj%2BCw%2F%2BEhf%2BGh7%2BJyr%2BYWPr6%2Buurq5xcXOqAQToAAT0AAP%2BAAT%2BBgr%2BDBH%2BFRn%2BIST%2BNjn%2BdHarq6v6%2BvqAgITaGR36LjL%2BMTT%2BNzr%2BPT%2F%2BQUT%2BSEz%2BU1b%2Bamz9fH%2Fh4eHe3t6Hh4ynp6uxsbe5ub%2B7u8G9vcXCwsrDw8Pn5%2BeysrKvr6%2BwsLC0tLTa2tqQTo13AAAAAXRSTlMAQObYZgAAAOVJREFUGJVjYGBg6Onu6uzq7OzsaGeAgLbWluamxob6us5aIK%2BmuqqyorystKS4qLCuACiSn5ebk52VmZGellpYWJeSzJCUmBAfFxsTHRUZER4WGhLMEBQJBYEB%2Fn6%2BPt4gQ708PdzdXF2cnRy9gh3AAs72drY21slWPZYW5mABM9NkE2MjW0MrTwN9sICBhZ6ujraWZrupBkQgWV1NVUVFWUlRQR4iICcrIy0lKSEuJqoOERARFpIVNLByNhWwgwjw88mbWfA68bhzc4EF%2FDg52NUDanmdHNm4OkECrCzMUMDEwggA5uo65lIWsBgAAAAASUVORK5CYII%3D'],
/*(needs before .xml)*/['RSS','RSS','*.rss,*.rdf,*rss.xml,*feed.xml,*atom.xml,*\/rss\/feed*','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABNUlEQVR4nKWTLZCEMAyFEfF49Pn1q/H1aHw8uh6PxuPR+Prq+PiYd6K0LAt7N3Mn3jSdtF9e+lNVqKp/KQfiawgT4i8SJoivcQKIryG+hiwOsnno5mHbAF1a2NzAlrPy+gPABJsbxLmDmZ0l2wF6kTAdgMgEm2rI2CCMLbaxRZgZGkMB6drDproo3gFsqou9HOvCMFWYGWTpPwAclQ2H9QBdOpgnxPFRIDo9E8C9AzzBBoLGFXKy7mGeIDOneVwT9BawQ4QJ6/B8qeogTOVM1H/dAIZjc4634blXDSmXXSx8BQgTTELp3/r90exVhQkyJqDMwxUQuTndvzDBeoKGFWaG4Aj2CSCOoN3RY3ZQXPgHtEtxnD1kdGeAdjugI4Q2jRlwJ+3ebqGcg0uJn5TXXH7jX7/zNxtNVbpvO/HYAAAAAElFTkSuQmCCAA=='],
	['XML','XML','*.xml','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEUAhITGxsYxY/8xnAAxnP8x//8xzv8AAP8AAJwAAISlzvcxY5yEhIT39/cAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAiH0UAKT4EgBXBDx+6PoSABjukHw4B5F8/////zIHkXyrBpF86waRfAAAAAAAAEAAOIZIAMgFkXwAIxkAuPkSAFEFkXx4BxQAbQWRfCgjGQAIIxkAbD4ZABsAAACoAxQABAAAACBtjwDQG4QAOPkSACaLOX7QG4QACAAAAEUJkXxOCZF8oL8VACQAAgBE+hIAAgAAAJBBkXxY+RIAAAAAAMgFkXxk+RIAAAAAAMgFkXxQPhkAMPoSAFEFkXzYBxQAbQWRfGw+GQBYPhkAAAAAAAAAFAAAAAAAOIZIAJi9FQAAAAAAqJqDfFMAAQAFAAAA/PgSAKg9GQDk+RIAGO6QfHAFkXz/////bQWRfGIZkXyTGZF8gMCXfHAZkXwoIxkAOAAAAGw+GQAA8P1/zPkSABgCAAAo+hIAGO6QfHgZkXz/////cBmRfAAAFAACGZF8bD4ZAFg+GQAAAAAA2CIZAMjAAQAHAAAAdPkSAAAAAAB0+hIAGO6QfHAFkXz/////bQWRfFvugHwAABQAAAAAAGfugHyk2Dl+AABAAAEAAAAA8P1/AQAAAAAAAABIAQAAWD4ZAJi9FQAAAAAARPoSAAAAAACw/xIAqJqDfHDugHz/////Z+6AfFxXQwBYPhkApNg5fiQAAAAgCAAAHlXkkOSuyAHOQirz5K7IAR5V5JDkrsgBAAAAAOcAAADohRlblBO9AAAAAACIfRQAePsSAAAAAAAgAQAALPsAAAAAFADY+BIAAAAAADT7EgAY7pB88AaRfP/////rBpF835mAfAAAFAAIABQA8JmAfKTYOX4AAAAAAAAAAAAAAAAAAAAARNpEANh9FADMfBcA3H0UAIyGSAD/////iH0UAJ7aRADYfRQAc9BEAIh9FADpIGI4AAABAHRSTlP/////////////////////AP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////U4i8UwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAFxJREFUGJWljUkSgCAMBMOmBBnC/19rAEE823NI0TUJlDeqQlkWJu8CAiN5CDwpShNIECLbZxcpCknwLDGhCX2DwuEYambDeneuRt9l5vfG+kUzGtfkR2OLivKl3qbIDLxNDvZlAAAAAElFTkSuQmCCAA=='],
	['Word Document','Word','*.doc,*.docx,*.dot,*.psw','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAClklEQVR4nJXS30tTUQDA8fsw0T+jt+gl8GGGSIT4kquXQAgjsqgkwZ4KBS2UVeCPIEVWmiZkm0rLmT/YnJbYLypT8+e0ufnjtl0307b0lnP3Xr89XFo/fJAOfN/O+ZzDOUcQEIRfdb+co+vFLE+HPDgGp+l4Pom9f4LH7o+0O0dpdX7A1jvMn2uEOrtEnV2i0hamrFmi9N4c+VUznLw+wYmiYTIvv+bAORebWzusyxpN9iHSTBf4C9hrpJi6kbd2iMgaFqub/jfTv5FKW5jHg9+40eQlr3wUj2+VvPJRfKJMTqGVaqtfB2Iake8adS0u0kwXEgllzRI+UeZGk5cz117hE2WyCtz4RJnjBW0UVTWRYuqmxuGhxuEh/E3D9syHdcCvA0W1MwAU1c6QVeCm89ki+47dp9rqJz23nveTIkmZjWzGdnQgqrK8pvKw348x+zxCfpUO5F/vIavAzemrdgxGM6mnnOw/XAhAUmYjGz90QPqqsriq8KBvQQdySsYAyCm0kp5bj+udjMFoxmA009E/DkByRgURWaPG4SGwruIPKzQ4l3Tg6JURfdLBag6ddRDdiGMwmjlysTfxCgajOXEHy6sKXknB0iPqQPqlvj2fUUgtJhRREddUfCEFTyDOna7POnDgnIsUU3eipMzGRMkZFRiMZoTU4sQJZoMKk8txqhwBHfjzWza0DxKKaoSjGqGoxkpEJbiusvxFwRdSmA3GmRLjjC1sc+uJtBu42zqAuKYgrqmJHf9tbCHG8HyM8raV3YDF6sYrKXhXFD5JCnPBOJ6AwpSoML60zYg/xvv5bd56Y5Raw7uBuhYXk2Kc5r5FGpxLWHpFartEbncGqOgIctMuUda2QoktRPGjL7sBY/Z5/refo6LOLVBS96sAAAAASUVORK5CYIIA'],
	['OpenOffice','OOo','*.odc,*.odf,*.odm,*.odp,*ods,*.odt,*.otc,*.otf,*.otg,*.oth,*.oti,*.otp,*.ots,*.ott,*.sda,*.sdb,*.sdc,*.sdd,*.sds,*.sdw,*.sor,*.stc,*.std,*.sti,*.stw,*.sxc,*.sxd,*.sxi,*.sxg,*.sxm,*.sxw,*.vor','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAC5ElEQVR42m3SX2hbZRjH8e%2FJOT057TFdkqVJTBra2JbpbBV0oGSZM5Nhwd0NBRVkxWvplRREEDv1YjjQmyIFQYdYr7x3tmvdisw1Di%2B6MrVMTtN2Nctp0ibxnOX8eb3o1lLr7%2FL98%2BF9nveRAOZ%2BKYoLX3%2FPyvoGlfIGrS2T8XfeRvJdqltbCNfFsiyCwSC6rvN8Lkc%2Bl5MAFIAXnzsmvffZpKhVNym37nM0240sB%2BjvG2BoaIhIJIKqqhSLRZLJJDduLDA7OysKhYKk8CDRkM4jwTZmvvmCwSP9eJ6HLMtMTk5Sq9WIRqOsra0xMjLCmTOv8OH5j%2Fh2akoEHgKy5BHWNT7%2F8hKhzACPHX2KsbExDMNAVVXy%2BTypVOrhcT4%2BP87i4uJOCT9euSIuX7vOH7dvs7K6iu86IBRGR0dJpVK0Wi0ajQbLy8sUi0Vcz%2BelUwWq1SrSzNycMAwDX5I59%2BbryIHdRwEwMTFBJpMhkUgQi8WwbRvTNJmenibd3Y3SbDY5cfw4%2FX19%2FPTzdUqr6%2Fx68yYXPxnn3fELJFNpKn47Vl2w4dQ59cwR0uk08%2FPz9GazKD2ZDNv1OoVX32K9bFKpVGjVqyzds0hlB7Btlbv3bAKmA8Czj2eJd3YQDod5%2BfRpSaltb7N0x6DjUAyp6aI0Lbo6O%2Fju0%2FfRNI22tjYURdlXlmmaIEkAKCfzeeniV1NC0tpxdnrKE4NPs%2FBXZd%2BlE4NZ2tWdfcMwiHV1sTtI1bpFy%2FVwHAffdWkIlcu%2FLe8DnuxJkD7cCUCpVELX9T2gad%2FHcVyE7yF8j3PDOd44O8x%2FI4QAoNFokE0m9wDX9RDCByFACG6tlPmh%2BPsBICDLnBzs3Z3SXaA9qOz8vwRIEgtLf%2FKPnjgAhLQgx%2FqSxONxNk1zDzgcPoSsKCAgoCj0dsp88NoL%2FG98l0gkwkqptAd0x6OU765hb%2F6NazeZmbvKpZ5HCYVCaJp2wLAsi%2BCD9X8BU0om2NCyDrIAAAAASUVORK5CYII%3D'],
	['Excel Spreadsheet','Excel','*.xls,*.xlsx,*.xlt','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACrElEQVR4nJXS20uTcRzH8f0BGR2kLDAKoi7qpj0aamR0kR2QQAtGxspUzGC0IDAowy6SDnZYDc1TlkvTNJemWFoLCyuyg2nyaNN5eHIHazGjRXPP1ruLh8qxC+kHn4vfxffF9/v9/VQqVKo/uf9skOanAzR1ipif9NNo6aOho5f69h7q2t5yu+01Na3dzKxR6ZqyyWk8QFZtGvuqUtlTto1U4yaSL8SSVLCWzfkr2Xg8mu8/f/HVG6SioZP1O7IIAWY7av0cvD9/4fEGKapup+N5/z9E15SN8dklMuv2k3JtKwBvrK/RluxGW7KbiqZy1LoIvL4gnh9BjKYHrN+R9Teq7Pp92N12jF0XOXQ3i83nYjhaoyf9poakswmIkog6Zy4Gs/g3NY+HqX5kU4B00y4Aemw9lL0oJs2kIT5vFesOrqaztxMAIWMe333KCAazyLg7QFWHjdjtmag0JUkAGCyFaCpTKO66QppJQ8KRFejLdYxOjiJoF4Z0MPpZ5vrDEQXYeSkOg6WQDbnLiD8cTWzGUgyWQrZeTSThYDRVLTcQNJF4vEE+f1M6sE3KlLaNKcCW02vCtn7mTgFx+mhitEvYf3IvQsqikA6sDpmiFkkBEvOWz/qMMcmLcXkCSO4Awy4ZccLP5eZPChCfG4VaPwdBF4E6Zy5C5nwE7QIETSRC6iKE5Chiti1BcgewuWQMZpG+cT/nzRMKMPNbltY9wTUVZHIqiGsqiNMTwP41wPgXpXDA7sdgFnk3Mk3BXUc4UHz7EZJbDpnXYBaxOv0h9+4hH6dqneFAUXU7VoeM1Snz0SEzaPcjTsh8kGTej03zxubj1dA0L60+TlRPhgNG0wP6JD+VD0cpbRujqFXiSrPEhXsTnG20c7rBQX6tk+M1Lo7d+hIOxG7P5H/zG3Xusz1YFu8XAAAAAElFTkSuQmCCAA=='],
	['Powerpoint Presentation','ppt','*.ppt,*.pptx,*.pps','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACyElEQVR4nJXS20vTYRzH8f0BgTddREQUFAVmBzyV1UUxSTQwKMKyXEVW6EUIUkEGmhXSgdpCY5RRNk20dFbMQ8406Wwnq5XO46+5zVN7wpVzv99v7y5+tBSvuvhcPq/n8/0+j06HTvc3D55+o67tK9ZWBzUtn7lv76S66SNVje+ptL2lwvaG8kevmX5G5yw8gLPwAF0F+/iSt4cPx9PoyNnBi+xU2jNTeLI/CXtGIhOTIcb9KjeqW4lPyWQGABDyOLEa9BgTojEmRFO6N4nfjucA2DMS8U+G8PlVii2NND37/A/pyjcQ8jip3bIOxe8DeZKdcyIwJkRzLjKK347n1Kdtwh9Q8f1SuVpWT3xKZji6L6f2YDXoUSbGQQmCKrNzTgRduyIR1w9jNeip3baeKzWOcMqbe7A87tWAj8fTMMVG8evkZn6c3oH3chbNqasQ17IQFbmYYqOwbIlhIqCNMCwUBscUbjf1Epd8EF1HznaM62MQr64h3t5G2C8gjIe13DqKKTYK84YVMxr0j8iUNvRpwMvsVKwGPeJGBuKZCWErQJhzECXZCKM23qU1S/H5VUZ+qrjGFXqHZcy2AQ1oP5QSXqIo3Ysoz0KUHEGY0rGuW0XI46Rw+cIZDbrdMsUPJQ1o3Z8Ufsa23HSM8asxxa2kLTedkMcJQN6ieXh9CtKYQo9XxuEKcrnuuwbYMxJp2L2ZB9s3UrV1LWX6aG3mmGUUrVhM/pIFHJs/d0aDzsEg52tcGjD9W5orW/AKlWGh4hUqHp/C0LjC4KhMj1fm61CQT1KQd31TnL3nng2UVDxGGpORxpTwtqff/DevnQEK7npmA8WWRrrdMt0emS63zLehIA6XzCdJ5sPAFB29AV45p3jRHSDPMjwbuFpWT6cU5GZDP2bbAMWPJIx1EhdrXRTdH+JMtZv8ux5Olns5cWd0NhCXfJD/zR+k1be5/9ZmqAAAAABJRU5ErkJgggA='],
/*(needs before .js)*/['Userscript','UserJS','*.user.js','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKwSURBVHjabJNJTBNRGID/mc5MQYVWVNCGTbEtNZGDBj1ogolEMR5UJA2LBmMoIokxERIj8ehJjx6MYIQoJgq4JIa6gEARkKJFTa2iFFtKWwp2oeDCzNQ+31DQCc5L/nmT/P/3749ACAFBECBxiEPFFds0Ws399DRVhtX2udc97ig0PmgOLBkIbOwjAR8uMRRdvXF7pqv/NfrqnEAOlxsdLas6j3Wk2AEpCRcbKvLydrdu1WUr0lXrITEhAZKUSkhQKvKwXiY2ppbDRzCcv29P/ZZsDaSqUkCJYVJGwKMnHTDlmWgTZ/CvjkW4sKTScP1WC+oZsKAxpwv5gyEUnAkj2xc70p88Y8Y2a8VBxT0gispOGa413UVDb23IMe6OwaEw+jTqQKMOF3pptqBSw7k74hLEPaDUOu0VmpFDV58ZCJIAkiDB5fUBz0eApmjQqbOgrqa69HhVbZO4jKUfmiBJBctysHJFPPiDYbA7J4DjeJDLaWAYGVAyErIy0uDs6RPH9OXVtULWYgfEmN3emJK8BlYrEsHl8cEvloX4ODnEyRlgKGZhV1iOhcz0VNixM7dOCCp2EBkeMF3u6DaNqDasg1U4CzlFxxSRKMyz8xjmsPAQwNmRsc2jxGPkR0esHp7n9RBFrYbyUi1DUzh1GujFG0UBQrNz8P7DR3j+9NklqTEK3VVkbNLkVNZc9AwNW5Hb60PT/gCamg6gEbsT3XvYjvIP6i9gu2ShhOWb+BvLD13O9o3azWrVdy4K3wKhv5HfWW1Q39BY19nechPbzQrVwX9bhU+iIqnyQMF+mPvJQr/FCsHwDJgG30ADhl8Y2wQ4jIUVkpdaZRnPcd6AfxomJ32AIhEwdvaC8XG7JLwwvmXPmVFn52Tu2lvQjN9Crn3M6bWY+6otr3oGpWCB/SPAAJaJRguGUxB0AAAAAElFTkSuQmCCAA=='],
	['JavaScript','js','*.js','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAIhJREFUOE%2BtUlsOwCAIczf3aNxsA%2BoQGSF8jOgytbxarjnnaJuAed%2Bn8Y03eyQiiRwc9DgUJF%2BA4JM4wFnTygICNScOLtV%2B5ktLEjOE8J6IvKSi%2BrqH1YD18DdLUEDJkeWZzZsOVLIaOUsvpybl0q4SDpSzoST8m8y50t8h9FO2e0CwjrXH2gEf6kuuBl00BtIAAAAASUVORK5CYII%3D'],
	['Executables','exe','*.exe,*.scr,*.msi,*.ref,*.app,*.paf','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACoUlEQVR4nKWTSUhUARjHv25do4K6GZkHoSyidYwuLUzaZkW0GBF06mJEK2qFEQoWBUFEji2HOhQtUEGLY9liSDHjmMbsvVHHdHzLzLw3b2ac/HXQolMXD3++H9/yu30iiEwpy+osyi5AyVkorod59VByboKLz0JRHcw9A7OOw/ImWNgIW04PsP0kiCKIbH6IrHIh5a2IoxVZM8nlLmR1C+JwIWtakfKbiPM+su4e4mhG9rZxYn8N0tKpwNggGetPBrCtQQpjQwDkx4b/9s30AKbZj20P8jUNm7buQVo+hMDsJ63HMPUYVkajYKu8/x5nQfF8oj+GyedsLGOQtDGxk08p9CRhk3MX0vL2O/l0DGM0StpSCT6/S8G7lnw2wZIlG3j/tBL12XSGNEhpCsZohIwewacXqHTuRFrbexlLK+hqDMvoI/7mAjnvNsYLOuuch/jyaBXq61I+dVzilx1HH1WwtSg+NT8pcPeST0UxjATp6A0YqiPjqSardbNsfQ0PqmcSeViM4RY6PZ3YSQVLi/BNy1Lh3InccvvIGRGyv3SeH9nHy4NFkGxkPHiA8Z7dkKjG7NuIa4bwpN1PwYxiaWG+jdoTgttvusmnoiQTATRA6WsifHMF3oYyMGt4vHoafJ7NtQ8e/CMGphrAVEP0JswJwd1XX8klw+gjAezcMF0Xj1JbXcuVy1eJnRb23cniKpnDtRcKZIJoIwFMNUDfcJIK5w7kgbsL7DC2EcDW/cAIETsH8c80HLvOx34DsPmpxSgk/dhGgEIqSFTTqXBWIfXXu/nUG6bNE8LtCeL2hHjn9dPui9AVivOxJ0C7J8hbb5C2yXmHL8jtjiRbKquQxacO4yg9z8qyWlaW1f1T/8OLanEsbaD5SCNT+0RkiseI/Ab8s6d14JaTNQAAAABJRU5ErkJgggA='],
	['PostScript','PS','*.ps,*.eps','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAACuElEQVR42o2S0UtTcRTHj7%2F9brt3u8zLNi%2B7G8PrRYPy4kIcjPQhig0pCPVhPUQv1rPg04SInoTwD1CQvShRQSAEGRi96MIGGQwsw4cxiKVz66LbvNc5d%2B%2FppcTVjA6cl8M53%2FM5X44N%2FjMWFhaey7KsptPp1bN1W6vmUCjUeXx8PIqINxDxajAYfCDL8jVRFG9rmvZyd3e31HJLJBJxut3uRUrpCcuyODIygvPz85jNZq1cLoeqqqIkSffPxfR6vYuEEHQ4HLi2toamaWGxVMFUKoVerxcJIcgwzJGiKFd%2Bz9CzArqujwIAhMNhGBiIwOr7bWhrI1A%2FMqBarQIAgGmabKFQiAJA5i8CjuM%2BEUJQFEX8oWmo6zX8vrOPpmni8vIychyHNpsNFUW52fIEu91%2BmWXZb4QQDIVCuLm5iR8%2B5jC9kcNGo4F9fX2mIAgzExMTbS0F%2Bvv7L0iSdI%2Fn%2BTLLsjg5OYmWZeHh4WFtdnZ2QZblyLkGdnZ2SjzPfyGE4Pj4OBaLRbQsC39F8ry5UxS%2F358oFApPAABsNht0d3eD3%2B8Hl8sF1Wr18%2Fr6%2BhtBEHKiKL6LxWLZmZkZ%2FJMgzDCMQQjBfyWlFNvb218riuJp%2BsRyubyjquqLSqWSHx4e7g0EAg5JkojL5Tra39%2FPU0odpmlSRIR6vX6RENJrGMazU4KOjo5HlNL09PR0utFonFQqFdza2ioj4h0AgMHBQa6rq%2Bs6pVQnhGAgENhoOoFSihzH4cHBASIiTk1Noc%2FnexiNRofi8fhQT0%2F3kCAIjxmGMYPBIC4tLW03mejz%2BZ6WSqW7sVgMEokEqKoKKysrkMlkYG9vDyzLArfbDU6nE3ie387n86Nzc3Nfmx5CkqRbuq7Ha7Va2OPxXOJ5HjiOA7vdDoZhZDVNS9Xr9bdjY2OvksmkAQDwE2UbPIlSQKJoAAAAAElFTkSuQmCC'],
	['TeX','TeX','*.tex,*.dvi,*.latex','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAC%2BklEQVR42n3ST2jbdRjH8Xe%2Bv39Jm1%2FSJnVJFrOssdjNdXNd0apjYxUnyg7bwUPHjgrCwApjethJL3oY6EDUk%2BDByxAUKziZ4J%2FYKaXQUWlt1zZNl63t2pnmX5vkl98vv68nG%2BbQ5%2FTw8DwvPofHw%2F%2FUxBfvydzcNKl4iNVCjVOXPvP8e%2BehwcxXH0h7q8jyzCxObonUIwbxkM707RL3fXsZ%2FuRrz38C195%2FQ7p%2F%2FMTBbhPLsWk2Bfl7ZYJ%2BhYYtWKsp6AMnOXnx8s6d%2BKeZvHpZZtNjtBsuPq9DxHSJBBtEoiZFW6HWbFKs25Qq1QcS7wDpa7%2FRdMo0HY2pmSolqw0bg0LdRghJIhGgL%2BXFuznLj59ekg8Aox9ekJvzN%2Blsh3hAomowNbdGvqowOZcnGdHpDMJitkH21n2W0z%2Fw3ZW35Q5QKuTZ5dOxtpsYisZGuYrjUfl%2BcgURNdlouKz%2F5ZCMSWxrCweBL6C3EmTmboGikW%2FA6MwagUAb%2B8IuQ4%2BF6X%2F5df7sPI48cZ7fFxskehOsV%2BssZhZawL07GwQVi6dTBvvjYaKmhw5h0KlYBHx1ar4uunr70cJ%2BcmqC8x99ie7raAF7YhGCfg3FVjCEC1IgtxoYZRvtxigv9XipZ37m7PAQ%2BwMFZseu03%2FwAAAqQM%2BRIyyN%2FUrlbpFUzKTDryJciaprGMkY7T0JlPiTSMXLsfgNirks295drQT7%2Bh5HNdrwt2tYqo9cQ8c4dADtuQHK0V6c0BNII4nUHuWOtZvx%2BRoNYbaAQ2fe9CQGn6GgxhifKjK%2FaDFrmbjPnqXe%2FSIVuw0pBLZtE03s5flzr7GeLz78ylffHZG%2FfP4tSV1gBlXCx4cYfHWESqWIqnoor6wzPTHB4aMD1AtLHB2%2B6FEArl95Sx6Lh99Jf5PGkC6mUBGWZDWzTD6zwOALJ4j19hHa083a7QW6vCWeeuWCB0D5%2BNxpuT02zu7NbUKqhu1YmLqGT5EIReNuNstKZgHpVRE0MZxVDp8e2Un%2BN0JPK9Xs8gPRAAAAAElFTkSuQmCC'],
	['C/C++ Source','C Source','*.cpp,*.c,*.cc,*.cxx','data:image\/gif;base64,R0lGODdhEAAQALMPAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD%2FAP%2F%2FAAAA%2F%2F8A%2FwD%2F%2F%2F%2F%2F%2FyH5BAEAAAEALAAAAAAQABAAAwRFMKBJa7gYvc33QdilddwhhSP5ACyQqd3hihthc8Qjv3dv7zRfTTeTPG4qoFF4JPJyPoJyZMsNp7BSMQWbHr7gsLJFLs8iADs%3D'],
	['C/C++ or Java Header','C Header','*.h,*.hpp,*.hh,*.hxx','data:image\/gif;base64,R0lGODdhEAAQALMPAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD%2FAP%2F%2FAAAA%2F%2F8A%2FwD%2F%2F%2F%2F%2F%2FyH5BAEAAAEALAAAAAAQABAAAwREMKBJa7gYvc33QdilddzxgBnJASyQPgShHq64xXMt3THu6SOfj%2FYSyh5EG+w4BPKeSOcSmtypStJrNHPoer%2FVlnhciwAAOw%3D%3D'],
	['Java','Java','*.java,*.jar,*.jad','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAD/AP/9PNzxAAACAklEQVR42o1SXUhTARQ+d/+ysenVcjmth+glH8KXEvqxSb3kghAVNoqe2o1CqJCMoNcgInrIF+3nodKHCIqkB5kyQaKIohFi5c/mXNe53d21eb13uTv9ejC4u5Ogw3k63/nO+fjOIQK2JyR+0H8G375ASi3OfCqHDLQtIMwPXOaC3AVyuUaHHmaTqQpcN7s0PjpwtgORCcxHnnafzr0bh5xdF0WtR6ckNvcieA6/FhD/PMEFsPQdUrpiok7Ss3v3LVYbSbL8dTor5slqJzJWCNYIspDydXZtMlZyOGUVjjo3FVRiTP8k2HfUs17vb5ON1tSdh9tVU9Xw7TtkNFcS0jGdCf6r/U8ePydHTevJDoWx0qa24WdGISKGgGgsCbZ6XVL2N9ZuYavRRG421rRnL+3z5DYosZIZGwvtbqj3Hm8jAjp7znf19s3mNsrdKP5Iv34w3Hft1qvJD1uVYz7/0MgbhgAiejsdXYrzytxyMh5nHOZqu625xn2w9VDtgQZBpUYzEVEPd/3SxaB2Bx93QwYUFUIJawCKmApFJj/O5IE8cCrA3R0cIeDvBiJ69DK8wmdC4XDJQB6P21gqtrcdcTosJ7xHBT5RkAstLc2615h6v7iqIg8IQBoQAV4BLxYrLq255qxiA939KhkNNktiOVHHupp2sTev9BLrKvddk/Sf8QfyEEb1nQXuNQAAAABJRU5ErkJgggA='],
	['Python','Python','*.py','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAnElEQVR42pVTSxaEMAgjfd67ePLMYvqJKK2yAZ9NGlKA3YNSwzYRD9B9frR6SxJuJ3t2t1ZfVKUKaPaHAzN3RZmaotLdJ0jBQsCMIB6cua57PgawLpr0nKBENwjpFO9UDBPbE6jzNJq+hhrORw8Qjvh5v0jNVQIgzGIHrwbqyAY5gMcf9x3BQ0SQKiqfwXW9TNac360fduvKtxv8A4B/RYuP1o1JAAAAAElFTkSuQmCCAA=='],
	['Temporary','Temp','*.temp,*.tmp','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ6SURBVHjaYvz//z8DIyMjAwyEhIT0m5ubG3BzczPgA1lZWaVAvWcAAogR2YD6+vqE3Nzc+ZcuXWJQU1PDa4CMjEwIUO9agABigQkANceDNIPYrKysDCwsLAzEAIAAAqtKTU31B2peAGK/fPmSgYuLi4GZmZkoAwACCGwAPz+/wdu3bxn+/PkDFpSQkGC4du0Dw9atj8B8b285Bl1dYawGAAQQE9gUoHNBmoD+Ynj3jpOhf/ZThpcsogxaTjpgDGJXtV5luHr1A9hlyK4DCCCwC5iYmMCCHz78ZNh49CuDnY8mgxzHTwYh2V9gRe8+MTNwRBowbNzzgEFRkZ9BQIAdbgBAAIFdAIoFkCGzF95h0LJUYnDUYmfQ1xZmkJWVAeP7tw+DxUByqzc8AquFAYAAYkE24PVvLgbN318Z2FkEGf7+/QcUY2RYuHAhMGz+Mvz99YuB8eN7httvWFAMAAggFBfcvPOZ4f71+8CYeMXw798/hqlTZwAD8wZDdHQMMGzeMjy99wSsBtkAgACCs0CGSEjzMnCISADZ7Aw/fvxmSEtLASYoVYb79x8w8PDwM/BJyYDVIKdcgACCewGEFXl+Mrz4J8Lw5et7BnZ2FgZQKg0LiwR74eOnbwxP/wgxGMp8QDEAIIBYkF1QmKXFEFBwnYGZQZXBVf4jg5zkX7D44xfMDLvu8zEc23GDYcMETRQDAAIIxQWCghwMEwtlGKr6rzBcVNdi+PntJ1gROxc7A+/L22A5kBpkABBAKC4AAUNDMYbti8QYLlx4xbBhw12wWIC3MoOBgRHWlAgQQGADrl279mD27NmX0SWlpSH06dNXgBhD7xcQARBgABPMxB0I7LHAAAAAAElFTkSuQmCCAA=='],
	['RegEdit','Reg','*.reg','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAiklEQVR4nJWTSQ7AIAwD83T/3D0ArbMBPUQIkYxtpJjR7FQA2L7fDJMct78AADSARo5zQpyjK/th2DmKzVU55egoKU0FapOAoiP5ZYq1DHCnfqgb1kZVWqXKCiAZcn1VOokAp7aAb3MBTgCN0MW5jbCLc44QKsFaQBchxqn2YRchOSiX6bgNjfIEPCnNty2tI1+FAAAAAElFTkSuQmCCAA=='],
	['Shortcut','Link','*.lnk','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEUEAgSEgoT8/vwAAAD+Af0cAAAAAAAAAAC4QAIeNQAAUAAAAAAAbwAAgwAVRQAAAAAJs0AACLYA/30A/wAAIgICCAAALgAAAAAAvgQBlAAA1AAAdwAcLSrmtAAS1AAAdwB59owICAKCcgB8AAAAIGgAAAABAAAAAABWzAQACAAAfwAAAAAkEirlAAASAAAAAgBzAIwAAAIAAAAAAABEnmjmAgASAAAAAAAYARbuAACQAAB8AABwzBcFCACRfwB8AAD/gIz/2QL/RQD/AABt9mgFCACRcgB8AAAVAP0KAACCAAB8AAAAABYAAAAVAAAAAABg8CgDf+gARRIAAAC4z9sgdr8ZANQAAHfQz0BidrYVAH0AAAAAJP0A5wAAEhYAAAB+NAAAhwAA1ADAdwAADoAACtkAXUUAAAD/IPb/5wj/EnL/AAD/mHj/1X7/1EX/dwAA9gAACAAAcgAAAAAAIAsAAAAAAAAAAAAAzCkACLYVf9QAAHf6EnG4AIIAAEgAAgBUAczmAAgSAH8AAAAvaAAO5wCCEgB8AADbRQcF1QCC1AB8dwCg9gA6CABQcgAAAADQIABiAAABABUAAABszAAACAAAfwAAAACQ+gDluAASAAAAAAA0bAAA5wAAEgDAAAD4gwD3KgASggAAfAAYACDuAACQAKF8AABwAAAFAACRAAB8AAD/AAD/AAD/AAD/AABtADMFAQCRAAB8AABK5zP2KgCAggB8fAAAkNQA5+0VEhIAAAAAwv8AKv8Agv8AfP/QAABiAAAVAAAAAAAA/5gB/+gA/xIA/wAAvk4APiEAgkwAfABXAHj2AOiAABJ8AAB8lHvn6OASEk4AAADQ96xiPugVghIAfACzEL4C5D4AToIAAHwBIEsAAukATxIAAAB0AMvnAf8SAP8AAH8MkBgA5+kAEhIAAACkAADmAQASAAAAAABOFr5vPz50goIgfHxhAQAgAABmAABpAABsAPplALgAAAAAAAAM7CQA5wAAEqEAAAAAgvAAz6oA1UcAdwAkEWWBAAABAHRSTlP//wD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Zg+QzwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAADRJREFUGJVjYEIDDMQIMMIBA1QARTlUgAEIUASY0AXQVYC4aAJohjJg2oIugKKCAQGI8hwA4RYBnswG6dMAAAAASUVORK5CYIIA'],
	['Stylesheet','CSS','*.css','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAADRUlEQVQ4jW2Sf1DTdRjHv//2R/2bdVdaiCTqpuSvGKmlXD8Au4M55gJcwERwClJrTDE6WQMiBkPdARIpXOYybl5nRj+MeWJqdRAYpEghHGAgMChGUeSrBzzluvrjuXv+eD6vz/t53m8FRVFmKslo4UVDLptM5YTvdKPOLGe5Rfr9VYS/6mLZFhverwe4O3+37jUpu+2cuTxEz9/Q9gc0jsK536BpAr7ogyhzKRu0VurqL/G/gHWGLBpa/Az9CT3yuGtwmoFfoW/sNsIgUmvh+Gc9WF2nqWho5b+AxL2c75xmcBKGxmDYP8nIiJ+JwBTd/ePo0xz03xZVssXztlrKvh3kX4DIxHyaOqa54YdrNydo7+umrbed6yM9tNwcRKPbw7HzY9RfhfdEwEKjm0NXhHEPEL+Psy0B+qegQyDNt/x0TAX4WeQ3DU9iOPA+KkMx+rd8bM77nHnRb7DQUDgHSDDn4/6olaONt7BUXyQmr5bI/TVEOU6QfbKD1zzdeG+A5wdZ4xf4sneKjemv3wFcGx3nhZRcntr6JqsMTpZsLWFRQjGhJhdPmA7xcFwh4bs/RJ1YieNUL12i6qrcY2O6GeWCWKYy2liV6mTFNhct4sJ1GVgUa5sdbJNaJuDWv6BT+qW6QrYVf8zFAKxOs6A8V/opjya7CDJWcmYY1EluFkTlzEJUcSY27chBYsDK+DzC9EWExhUQorPj/saPypSP8ojZy33aCoJMXpplMEj7DiuN+axP20PvjIKAX9KZwY9y3O/GQZNazdrtxwjPrCPa/gnKOoePB7RlzE+qY77+CO3yyCcuXBKJM/2VaWZB3/8O3TMfRNsJji0i52QnYWkulLOStogsB4sTCrh/g5W1GR7CttcSmnwY9Y7DhBhLCH75bdTGKkK2lPHsrlp0Bzz4RuCZrJw7LpwbGGVpXDZPp1ehSqpm3kulBKfU8FDCQR5PrWGB8V1xxMNjugr0BY2z97ksitabM+dysHlnCUX1P7H3RBe64kZinA2syfsAjb2eqIMXyD49Tp3kwCdR94nqZrHxyeTcOUBshpM18Q5irB4iso+yOL2E5bZKllgr0ThO8aBkIGLfV6zI8KJKrkH1ihPNrnL+ATmslkYNP+fXAAAAAElFTkSuQmCCAA=='],
	['Widget','Widget','*.widget','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADb0lEQVQ4jX2TT0ibZwDGn/d9vy9/9EvyRQcxrBgIiUKjJuiCsKU7iG3tYVQZozgYtFDvG14sY+ww8LLThI6d9bCDbQ9jYcODI/MPYf43RkhIsCam4ppoEskXTfK+7y5tt9N+p+e5PKfnB/wHSilVFEXF/6CqqgqAvO3/hjcIIcTQ0FBwcHDwM4vFMnB9fd1mMpkuKpXK+urq6uLR0dEJY4xxzvm7AUIIkVJKp9Npm5qa+p5z/rhQKDBCCHRdx+XlpRRCEJ/PV8nlct/Oz8//IKWkUkrBCCFUSil1XbfNzMz8urm5+WmhUJBut1t0dXXJSCQiOeeiWq2KjY0Ni8vlujcyMuJcX1//jRBCGWOMSSnF9PT007W1tQlVVRuhYFDJZrPMZrPRcrlMU6kUbTQaNBKJyJWVlVZHR8eHPT09+UQisU05563h4eHhq6urR5lMRoyPj6s+v58QKbG9tYXl5WVks1k4HA4oikJHR0dZNBpFX1/fE13X7QwAJiYmvkokEh+dn59zu93OShcXyCaT6FAUnNVq4M0mGs0mFEXB4eEhOTk5ES6Xq1PTtA0FADRNC+ZyOSiKQhYWFmA2m8EYw02XC7ulEoSU+Pv1a+zv76O3txc2m02k02nq9/tDFABarZbmdrsxOzuLcDgM0WyiIgREoQBvrYbzqys0r68RCATQ3d2NUCgEi8UCSqmdvjlQuVKpYG5uDqlUCm2aBrMQeO/+fTx98QJDAwNgioJyuYxisYjj42NYrVbU6/ULCgClUmnb4/EgHo9Ls9mMdrsddqsVjt5eeCMReG/cQJumwajXkU6lsLOzQ71eLzKZzBYFgKWlpcWPb92q652dik6plMUiiKril+fP8cWDBzhIJtHkHLZaDVbGeF9/P+1yufbj8fgfVFVVNZ/P7x4kkz9+PjmJl69etR5PTgqHw4F6vY5cPg/DMNAfCOCT27f5ydkZHj18iMVnz74DYDAhBAghcnd3N/bB4ODNkbt3+94PBORGPC5qtZpwOp3y9PRU+H0+DN25Q4PBIP0zFvsmFov9RCmlb2UilFIphDCPjY09CYfDX1arVYdhGJJzTkwmk9Q0jZhMpqNoNPr13t7ez4wxyjkX72wEQBhjhHMu2tvbvaFQ6J7H4+lXVbXdMIxSOp3+6+Dg4HfO+TmllAohBAD8AzsAlhFyWmTRAAAAAElFTkSuQmCCAA=='],
	['dll','dll','*.dll,*.manifest','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACgUlEQVQ4jX2SW0jTYRjGdxMRXnmREEEIQXTRVTd5IV1I2E2nKwu9ESqrKwtT8ZDDEtSMlXicJyyPaZnSpra12lwzpZm5Tc205ix16prz2FytX/v/o8na8IMHPnjf5/e9PN8rQSKR5D+eIpQK2r+Q1zAm3pdWthB6/5fkH2CnI9TTlYtcTpXR1qlm+us87i0POwI8Xtjw9Wz8hBPNP0TFlNjIya9AZ3iPw7kSCPB4PKJx0TNLRV0T9+qrUdhUfN8E4+hftT3fQFqo8NXbGJ+wBgLcbjfLvxdImTuNyWTiZOFxIjsiKDbqmfE9NuWEsSVQDa5zI/Muff1DgYDNzU1yHedJt5+l5UMth6QHCavcze7qXehtXtE8YgfN0BqJVzPoUesDAWtr6+Ro8kmdP0P8aDQxhiMc7jpAdFYc3R+3RPO7Wd8ExjXiL95E0asNBDhdq1idC0QWRBHVcIrE/H2MaROQy+X0Vkahqz6KYQZ6BleDAXcejbLgcImB2VxgtihZ0cex+jaJxsZGnmRHMFS5B522FOVACEBuzTDfFpzY1xED03V3MV4XzfLLWCY7YzHX7MfwIIzCvGy6DCvBgFtlA1jnHP60LYugLTlHy7Vw7IpjqLL20p4WgeyVi2d6VzAg834fkzOL/q8S0zbZkSqWqL0QTkLVJBl1g7SavbTrQgDSCtSMWu1+s5C2EJh22rc85l+0W7x0jvvuFmh9vRwMSLmtZGRyLsis/gzKT/jNTSafNE4SLqWifKHbBiRnd1D7dIKq1jEqm81UNJqQPzT6VnaQ8pp+yuRvKCnXUVTcTZGslyvXpag0hm2AcdiCrLSepOQckS6MGEpCTegRegWP4P0D3oTQjkxZwR8AAAAASUVORK5CYIIA'],
	['Firefox Extensie','xpi','*.xpi','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACvklEQVR4nI2STUgTcBjG/1BQ1CUII/IQtvJrOvMjMzd1am5u6oqV2cylZk2nWahRREFWIEkpQkEQGmWJJ8tcm7mZTjed5syP+VVGB/s4FHjo1O3XIaiWUR2ew8v7vj8eHh4hBOJXqXpT0fapUferUPVnkGyXo3Kk8vvdT/0ynPZUcmqmnIfLLdQv1XLl7Tluf2giwhb8fwAhEDenmyjxFlK/VMutjw0k2GL+8vwHgBAIpT2Jpvd13P90h4iOkH8AHggSnycQa48hpmcn8t5E7n2+w/nXpzkzX86lxQtIraFE2MIRLQJ9n94fqHNn4/hqofNLO23LzTR+qOPCm2qqF8owzxZR6jNS5ivg1Nxx9jjiKXYV+wMyB1RUzZwkuUdO5ZSZ+neXqVkop3LuOCafEeOEntyxTPJf6ojujsLkNiEEIvBxACnd8QhxV/wglg4WcXauiqpXZkw+I8VTeRi8Oex/kYFuJI1jXgMZz5WEP5FgmjxC6BPJylBkNinVC2UUTeRyxKtDP6Ym25PCXlcC6e54Do1pMHj3oRiQEW2LWgkItQZTMVvIYW82+hdqskaUqIfkKF2xyJ2RKF0xJA9EI3dKkVkjEOk9KX6hpDsVHJ3QYxjPIW88C91oGmnuOBROGQdGM0nvlxP7LBzdSCohXRLEdksQSfbdqJ9lsNsWh9lnpHD8ELLucDZ2bGBnt5SDoxrSXHFIurZS4DTQOF1PrD2MoI7NiEiblJp5ExcXa6iYKaJ46jBrWgUNE7UIgahwGljbtpo8r5bAR5soGzZ/d9wsuDZ5FSG1hnHQq0HrSUYzrGCXI2pF825M15HSF8eWzgBK3CX+e6k1hNyxTLSeJDQeBVlDqeQPHvDPxaFAO5xEYGcAx34HrG9fR9jTHQRbtrGjS0KIRYJo/dmNBt91VrUJgi1BiAeCE0Mn/Bx+Awon6+g7VUBOAAAAAElFTkSuQmCCAA=='],
	['Command','cmd','*.sh,*.bat,*.cmd,*.pif,*.vb,*.vbs,*.vba,*.wsh','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABKElEQVQ4jWP4//8/AyWYQTJo3n/dzO3/DbN2/zfI2oUTm+bt/W+Su/e/Wf6+/1bZG//LB834rxW/4T+DSMn1/+I9H/6Ld73FicU63/6P3vzrv//a3//jN//4P61v8X/LmIX/RR1q/zM4FS/6bxhV8N84tgwvtowv+28RD6Ed43L+awW0/Be1Kf3PYOedCvQIA8lYRDPwv6Rj9X8Ga680sICHh8d/WMCA2MiKwYGFZoCwBtAAB6ABFu5JcEUgjTCDkDViMxSrAbici2wohgEwL+BzATZXYBiALwywuQLDAFIx3AB7nwyyDBDVDAJGY9V/BqPAlv8KpqH/lS2iiMYqFhH/5e1K/ovblf9nUA6Z+1/eswuIe4jHHt1A3P5fNXQ+ZTkRHKiUGgAApfD0rWeQRBgAAAAASUVORK5CYIIA'],
	['Disk Image','iso','*.iso,*.dmg','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABkElEQVQ4jZ2TIU8DQRCF+wMQ/COQCJLiwN2himiyi2jAkG0CCRhymyAqIFkMKairq7y6yq2rXFl58uRjZpa79toSEsTkNjfzvpk3d9upqqqzHYcHHeyLfbV7hdmTRVEECsDPIecsy/aCWmLVUyKgWmgFmJt4do4gUyAsS3qvW5AdsRsBQ0MAvQvgfAhoQRoA0/M8FrOohvA5HyPa8RFQrso1QDxTVfQKgbCAQVpbAtlGXK4oSgAVmp38dA8UsagG8SLj+7hAEVNnT8mpNfJsAJyIBXHEnNqzsF6UQG41Zq8ai0+D8GVQLn0bwGNx1B23Ae7BYPERxRKLDYD3QcZ6HyrMRhqhcGQhW1ugM+fyuxTFM9W88BfbsCAdp+RzngndvykBml4KO+ijeFQYnh7BXnbhdILCqvUS68/Inmrx5D6F652JaHLdhX9KkF0cw5wQJOk2C2z/SCqOxSPmg0QKWcCAYBN5MpAXzD9dC1BD9FUqdPaanceOeT8CeGzObYp/v0zkrxg7CRZx/HmZ/nudvwF3z6tuXZQLxQAAAABJRU5ErkJgggA='],
	['Initialization','ini','*.ini','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAADFElEQVQ4jU2TXUxTdxiHuZ0XeqWJWXbhndHFeLGLbVmMXDBNNGqIizrN7FzUMYIanQ7FOBQWhxKNTAQZGiujkipVoZSiVnQBylfXqi1SmwIHCoVSEUs/bAs8e2nE40mec/We5//LeX//NNLS0ubosVcSHHPS8SQfX38TT+u30WO7SItJg/XhPsyGHczPfkzq5XT6OH/8F2qKvuDyH2dpKFvBrzlVGEqz0V6pxqw7hblyI4Vnyml+2sZ4cILp6Rk+CBobXdh7gnTXZ2N3BOjtqMVs/I9Q0IPX8YDpRIyJ0QG01Qb+Kq9CGRwhHk+oAmPDC3yTMfomE3hfxxkQFCExPcv8Ewi+4UhuPgVFpThdbqbCYWZnZkkJ6o3PGRRBSAajwngkSWAqSVIG4kP3UGw3yC8sImu/Bnt1BjZLBYqiEItGVEG/CHolQY+c/EroE+KSQKlJZ7L1J/R6Pft/WIdb9ynm8nUY6wwM+4ZUgVcEQTn9jRAW3s0kSDqOEvk3k7fWvSnBnu0ZdF5ayLPrC3DVrsVqtaqCVyKwKBEaPVM094VFmECfs5jQ481MPMzAfnsr+tOraTu/kJYLn6DNXUFBQaEq6BVBeftrzlnGMLlD1Lne8tKiFcEWfPfWMNrwJZ5by3FXf0ZX5Sp2pn/Db8fyVIFTBE2SoF4SNHnDdPtjtDlcaDWLuJWzljHT1+gOLKNi+1L+Pvg5Gzd/T1nJFVXwXAT2UAK7RLcF39HQG8ImkvvNjtRqSzctYdualXz7VTq71m/g6OHjdLV3qQKHCKzysVWGX4jILWsMyBon5YdGhLhQUnaTHzVZXL1cgbnOyIhvWBXYRNAqghYReGV9w3PlESaE+X6UXdNx8nQxHe3d+IdHiEY+6kGnCFwy5Ba8wqAwMleq96udSiWoorjkGh5PP9FoDGbfN9FicaKMBqWBYQZGA1haO9EZTFy6+g+H8v5k98+5rM/cy57sPGpqTfj94ySTSfUuDA75uaG7jybrBJm7cvhu9yH2HfydY6eKOXuhgsqbd7hrfESX3cmQz084Ev1wtf8HALP8WucyA3kAAAAASUVORK5CYIIA'],
	['Unknown','Unknown','*.dat,*.bak,*.bin','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABKElEQVQ4jc3Tz0vCYBgH8Pc/syCIkI67dg47VFDsotdRrqIpiIvIwk72gynFohoqs8B4dzEwIU2zaNHIYkKHYH1rgZAw692tL3xvz/vh4YGXgBAiCAJMs/pnOY6DO/+zpAewxAvxBXghvgFZlsHz/Pd7TyAa30dMXIC0KCK2lMD62gluGo2+DVxkICDutaB33rHVfkSy2UW40sVu9rBvC0rpYCClVrBae8YMbWGq/ILxUxOzKZ0dUEsUE8VXBLU2gkdPCOzcYq7wAcdx2IBskSKUf8BI5hJj21UEkgZCG3WoxxoboBQMpJtXGJY0jC6fYyh6genNa0xGVtiAA91A+e0M0n0e6bs6wrkabNtmv8F8JPHVOBQlB8uy4JVfAZb8Q8D9HH7bAz4BjiPzMn1B1XEAAAAASUVORK5CYIIA'],
null];

const conditionsDefault = [  // ['title text','alt text','href pattern','image src'],  
	// Note: the following rules apply to the href pattern:
		//	condition may only return a boolean;
		//	linkA refers to the link that is momently scanned for conditions;
		//	multiple conditions needs to be splitted with the , character;
		//	, character inside a conditions needs to be written as \\,
		//	\ character inside a conditions needs to be written as \\
		//	try to avoid ' characters (use " instead), but if needed use \\\'
	//Fake links that point to one site but claim to point to another (often used in phishing scams):
	['phishing','Fake','linkA.innerHTML.match(/\\b((https?|ftp):\\/\\/[^\\s\\/]+)/),linkA.href.indexOf(RegExp.$1)!=0','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABmJLR0QA%2FwAAAAAzJ3zzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAUklEQVQ4y2P8z4ABsAjBASOGwH%2FiNOI0iIkMzSjqmRgoBExk2I7iCopdwIIwjwSHMDIyUDUMqOQFRsaBcQETtuRJSmqkWiAykmM7emaiODeSBQC6GQ0fAcvT0AAAAABJRU5ErkJggg%3D%3D'],
	//Links to other websites:
	['external','Ext','linkA.hostname,linkA.hostname!=location.hostname','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgUlEQVQ4jdWSwQ2AIAxFf42jOBtO0CXoBDqbu%2BDBQKQUKUf%2FqSG8l9ICOHMAyTpfvIKehJjZNOtsIqXeAcr16oV0J1lSBDHG6tJJhK9kiTmDEfyWNAIvDDyzmNqChgHHGkNKCKlelGsLGrLgbgc9%2BGJuztwzsGBg4ifmiMj4Cf%2FKDXtEJE9FLbd2AAAAAElFTkSuQmCC'],
	//Internal links within the same page:
	['internal','#','linkA.hash,linkA.href.replace(/#.*$/\\,"")==location.href.replace(/#.*$/\\,"")','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAEJJREFUOE9jbGhoYCAJADWQBBggqv8TASAqERpmMjDgQUADqaQB02kQa3HaMCI14IoKasQDwcSBEtPEpz9oWiJeAwCT6abhEwvS8AAAAABJRU5ErkJggg%3D%3D'],
	//Links with JavaScript onclick attributes:
	['onclick','Script','linkA.getAttribute("onclick")','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAeklEQVR4nL1T0QoAIQjbp+/T/LPdg2RHZ2UEF4wI2XSOAAFXmBVIakRZgKQkyI/fZubVnYCTJRKBRib5FcnIWWeS+RS77p8ZVxaOvK93gHQH/6UQuaNPMRXJljjG1iZZCvQIEeS3jZKFlrWZRff2ri9x9juqMR7jVuABYkyWCOZN25gAAAAASUVORK5CYIIA'],
	//Links that open in new windows (note; if you disable this, they will show as links that open in other frames or windows):
	['blank','Blank','linkA.getAttribute("target"),linkA.getAttribute("target").match(/^_blank$/i)','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAALHRFWHRDcmVhdGlvbiBUaW1lAFdlZCAyNSBBdWcgMjAwNCAxMzoxMzo1MyAtMDYwMAxWF1cAAAAHdElNRQfUCBkSDxTa%2BhjhAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC%2FxhBQAAAFxJREFUeNpjYKAQMGITnMnA8J8YzelA%2FUyUuoCFkA2EXEgdFzQ0NKD6uaGBAZs4kI%2FhIuqGAcwGmB9hfAwX0swF6AAe2tAwwZY%2BaOMC9PiHhQFdYoGoPEBVF1AMABE5HddSGZY7AAAAAElFTkSuQmCC'],
	//Links that open in other frames or windows:
	['target','Target','linkA.getAttribute("target"),!linkA.getAttribute("target").match(/^_self$/i)','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAcElEQVR42rVSUQqAIBR7K8%2FaNdRrBB411oegoo4Saj%2BCb%2FONOYQQbAWbLcLlw3v%2FSI0xVkGHE%2BhuDlJaAlDG0tKoIXkZzCxhJsDgodW8TQnAblwQTDe4MmsfVmy5geSYrEypsBM%2BrIb6VynIPfmlrTemWipmyQuMfwAAAABJRU5ErkJggg%3D%3D'],
	//Links that search engines are not allowed to index:
	['nofollow','Nofollow','linkA.getAttribute("rel"),linkA.getAttribute("rel").match(/\\bnofollow\\b/i)','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAlklEQVQ4ja1TUQ7FIAhrzQ603f8Q7ka8j6kPm0aXl0dCMiktDJEwVoHQ2AXQ5U5BR9wJjYOSNTHjGeOqsmk7qmBlQ3Cik5VV666ziMCVsEOU3a9YEfKpU3Kw%2BxlfThUs5wOIIUBy8mwu3r45BNp02V1mMVUn2fNRVpPP2N2qd7K9xjebWOVsr2y1hYr%2F7y3shN5s6U%2F2AfYvRe9W5oCvAAAAAElFTkSuQmCC'],
	//Links on insecure sites that point to secure sites:
	['secure','Secure','linkA.protocol=="https:",location.protocol!="https:"','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABy0lEQVQokZ2RvWuTURTGf%2FfNm4SaNw5JcRMdFAQnwSEiFBdB6CCIq7g4113q1P4Duro4uIkggkOgiwU%2F%2BkGtDlELxmrExHyUJLRJ3tz3nuPQJE1aXTzLOffhPPc5Dw%2F8Z5nDwNLyqvZsRO13nXjCJ0inMapcvzZzZHdUL%2FLLWixVtFJv6V6np9ulitZ22vr1R0UfPXmuf1VcerWiqSCg2Wyxtv4BL2ZQUax15HIXODGdZfNjgTu3bhgAf0gsfCly%2FtwZ3rxdZ2F%2BbuKs%2BYUHemXmEvWd1gjzhoO1jpW1zSMkgMX7d8271ff43mj9QLFWbdALe%2F%2F0%2F227RDaTmfT48uFxdbaNCIiADrq4%2Fe7GMLyA24u7xgdwts3sXB7Pvzj4SwEB3NgsiPvM43tXD04VAVwZ%2FArSfw1RGRVBESDAP5YDLwvRL8QxSRRbxEueBfmJShmJLBJ2UYmIJQMMp%2Bm3N1AZI6qAC7fwU5fRfp2oU8KFIeIcmDiJ%2FhZMxQibn3BySLFT%2FU4iI3hTp4gnU8Q1ArWgEWgIUsP1Gvu2RkQHzrZA9zD%2BSYxOA12gi2oHtAtaJQobkx5NLE3%2BWQF9enMUyTAOHcQxfBMLgF3%2BAPKIBLDNSR1EAAAAAElFTkSuQmCC'],
	//Links on secure sites that point to insecure sites:
	['insecure','Insecure','linkA.protocol!="https:",location.protocol=="https:"','data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAPCAYAAAALWoRrAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB2ElEQVQ4jbWSvWtTURjGf%2FfmJqHmxiEpbqKDguAkOESE4iIIHQRxFRfnukud2n9AVxcHNxFEcAh0sWC1H9jqELVgrEZMzEdJQpvk5tzzvg651YrY3gye5T0fnN%2F7nOc88B%2BGM%2B6FhcUVHZiQxo8myZSHn83iqHL1ytTYLACeFRe1XKlprdnR3d5Atyo1bWx39dPXmj549FTHVrrwYlkzvk%2B73WF17S1uwkFFMcZSKJzj2GSejXclbt245nhxoaWPZc6eOcXSqzXmZmf%2BEDM7d08vTV2gud0BwI0LNcayvLrxFxBg%2Fu5t5%2FXKOp47wsVW2qi3GASDf55%2F3qqQz%2BWAyNPn94%2BqNV1EQAQ0qmJH1e7bw%2FW5Ob9z4F94ANZ0mZ4p4nrnoz4KCGD3zQWxH3h45%2FKhr%2FIgUmCr4NWQ4UsIq6gIigA%2B3pECuHkIvyP2UOZvqJgybvo0yDdUqkhokKCPSkgi7eNwkmH3DSoxoSpgg028zEV02CTsVbBBgFgLTpLUcBMmEgTt99i4UBHo1b%2BQygnuxAmS6QxJDUENaAgagDSwg9bIqlhQC9Z0QHdxvOM4Ogn0gT6qPdA%2BaJ0waMX31ElkKT4poY%2Bv%2F4rVXqQ0itTemoQP7BwI%2FQlgKQSw6bxnzwAAAABJRU5ErkJggg%3D%3D'],
null];



//*** USER SCRIPT ***//
$addEvent(window,'load',function(){var LinkAlert={
	init: function(){
		this.loadSettings();
		this.loadSettingsWindow();
		this.addCSS();
		this.replaceLinkTypes();

		var tagA=$gt("A");
		if(this.showInlineImg===true){
			for(var i=0;i<tagA.length;i++){
				var linkA=tagA[i];
				this.checkLink(linkA,1);
		}	}
		
		if(this.showMouseImg===true){
			$addEvent(window,"mousemove",LinkAlert.mouseEvent);
	}	},
	
	addCSS: function(){
		$addCSS(''+
				// hide LinkAlert Firefox extension;
				'#linkalert-box{'+
					'visibility:hidden;'+
					'display:none;'+
				'}'+
				
				// hide TargetAlert Firefox extension;
				'img.targetalert{'+
					'visibility:hidden;'+
					'display:none;'+
				'}'+
				
				// hide Userjs.org Link alert by TarquinWJ;
				'fakespanltyp, fakespanltyp img {'+
					'visibility:hidden;'+
					'display:none;'+
				'}'+
				'fakespanltyp.span-for-type-icons {'+
					'visibility:hidden;'+
					'display:none;'+
				'}'+
				'fakespanltyp.span-should-hide-type-until {'+
					'visibility:hidden;'+
					'display:none;'+
				'}'+
				'fakespanltyp.span-should-fix-type {'+
					'visibility:hidden;'+
					'display:none;'+
				'}'+
				
				// this scripts CSS;
				'img.LAimage{'+
					'position:static !important;'+
					'float:none !important;'+
					'width:auto !important;'+
					'height:auto !important;'+
					'padding:0px !important;'+
					'margin:0px !important;'+
					'background:'+(this.imageStyle.bgColor?this.imageStyle.bgColor:"transparent").toString()+' !important;'+
					'border:'+(this.imageStyle.bdColor?this.imageStyle.bdColor:"transparent").toString()+' '+(this.imageStyle.bdSize?this.imageStyle.bdSize:0).toString()+'px '+(this.imageStyle.bdSize>0?"solid":"none").toString()+' !important;'+
					'opacity:'+(this.imageStyle.opacity?this.imageStyle.opacity/100:"1").toString()+' !important;'+
					'vertical-align:baseline !important;'+
					'text-decoration:none !important;'+
					'z-index:inherit !important;'+
					(this.imageStyle.misc?this.imageStyle.misc:"").toString()+
				'}'+
				'div#LAmouse{'+
					'position:absolute !important;'+
					'float:none !important;'+
					'width:auto !important;'+
					'height:auto !important;'+
					'padding:0px !important;'+
					'margin:0px !important;'+
					'background:transparent !important;'+
					'border:0px !important;'+
					'vertical-align:baseline !important;'+
					'text-decoration:none !important;'+
					'z-index:1000000000 !important;'+
				'}'+
				'div#LAmouse img{'+
					'position:static !important;'+
					'float:none !important;'+
					'width:auto !important;'+
					'height:auto !important;'+
					'padding:0px !important;'+
					'margin:0px !important;'+
					'background:'+(this.imageStyle.bgColor?this.imageStyle.bgColor:"transparent").toString()+' !important;'+
					'border:'+(this.imageStyle.bdColor?this.imageStyle.bdColor:"transparent").toString()+' '+(this.imageStyle.bdSize?this.imageStyle.bdSize:0).toString()+'px '+(this.imageStyle.bdSize>0?"solid":"none").toString()+' !important;'+
					'opacity:'+(this.imageStyle.opacity?this.imageStyle.opacity/100:"1").toString()+' !important;'+
					'vertical-align:baseline !important;'+
					'text-decoration:none !important;'+
					'z-index:1000000000 !important;'+
					(this.imageStyle.misc?this.imageStyle.misc:"").toString()+
				'}');
	},
	
	replaceLinkTypes: function(){
		this.protocolsRegExp = LinkAlert.protocols.clone();
		for(var i=0,j; j=this.protocolsRegExp[i]; i++){
			j[2]=new RegExp('^('
				+j[2].replace(/,/g,'|')	// ,		=> |
				.replace(/\//g,'\\\/')	// /		=> \/
				.replace(/\./g,'\\.')	// .		=> \.
				.replace(/\*/g,'.*')	// *		=> .*
				.replace(/\s+/g,'')		// space	=> nothing
			+')$','i');
		}
	
		this.extensionsRegExp = LinkAlert.extensions.clone();
		for(var i=0,j; j=this.extensionsRegExp[i]; i++){
			j[2]=new RegExp('^('
				+j[2].replace(/,/g,'|')	// ,		=> |
				.replace(/\//g,'\\\/')	// /		=> \/
				.replace(/\./g,'\\.')	// .		=> \.
				.replace(/\*/g,'.*')	// *		=> .*
				.replace(/\s+/g,'')		// space	=> nothing
			+')$','i');
		}

		this.conditionsRegExp = LinkAlert.conditions.clone();
		for(var i=0,j; j=this.conditionsRegExp[i]; i++){
			j[2]=j[2].replace(/([^\\]),/g,('$1 && '))	// ,	=> &&
				.replace(/\\,/g,',');					// \,	=> ,
	}	},
	
	mouseEvent: function(e){
		var moveTarget = e.target;
		while(moveTarget.nodeName.toLowerCase()!="#document" && moveTarget.nodeName.toUpperCase()!="A"){
			moveTarget = moveTarget.parentNode;
		}
		if(moveTarget.nodeName.toUpperCase()=="A" && moveTarget.href){
			if(!$gi("LAmouse")){
				LinkAlert.checkLink(moveTarget,2);
	}	}	},
	
	checkLink: function(linkA,situ){
		if(this.notWithoutText && !linkA.innerHTML.match(/\s+/)){return};
		if(this.notIfExistingImage && $gt(linkA,"IMG").length){
			var linkImgs = $gt(linkA,"IMG");
			for(var i=0; i<linkImgs.length; i++){
				if(linkImgs[i].className!="LAimage" && $ga(linkImgs[i],"src")){
					if($isInt(this.notIfExistingImage) && (Math.min(Number(linkImgs[i].height),Number(linkImgs[i].width))>=this.notIfExistingImage)){
						continue;
					}
					else{
						return;
				}	}
				else{
					continue;
		}	}	}
		
		var attrHref = (linkA.hasAttribute("href")?$ga(linkA,"href"):false);
		if(attrHref){
			for(var n=0,m; m=this.protocolsRegExp[n]; n++){  // check protocols
				if(attrHref.match(m[2])){
					if(m[0]){
						this.addToLink(linkA,m[0],m[1],m[3],situ);
					}
					break;
			}	}
	
			for(var n=0,m; m=this.extensionsRegExp[n]; n++){  // check extensions
				if(attrHref.match(m[2])){
					if(m[0]){
						this.addToLink(linkA,m[0],m[1],m[3],situ);
					}
					break;
		}	}	}
		else{
			$sa(linkA,"href","");  // fix when there is no href availible, which breaks this script;
		}
		
		if(/firefox/i.test(Navigator.$browser().toString()) && Number(Navigator.$version()[0].split(".")[0])>2){  // bug in Firefox 3
			for(var o=0,p; p=this.conditionsRegExp[o]; o++){  //check special conditions
				if(p[0]){
					try{
						if(p[0]=="phishing" && linkA.innerHTML.match(/\b((https?|ftp):\/\/[^\s\/]+)/) && linkA.href.indexOf(RegExp.$1)!=0){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						}
						if(p[0]=="external" && linkA.hostname && linkA.hostname!=location.hostname){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						} 
						else if(p[0]=="internal" && linkA.hash && linkA.href.replace(/#.*$/,"")==location.href.replace(/#.*$/,"")){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						}
						if(p[0]=="onclick" && linkA.getAttribute("onclick")){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						}
						if(p[0]=="blank" && linkA.getAttribute("target") && linkA.getAttribute("target").match(/^_blank$/i)){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						} 
						else if(p[0]=="target" && linkA.getAttribute("target") && !linkA.getAttribute("target").match(/^_self$/i)){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						}
						if(p[0]=="nofollow" && linkA.getAttribute("rel") && linkA.getAttribute("rel").match(/\bnofollow\b/i)){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						}
						if(p[0]=="secure" && linkA.protocol=="https:" && location.protocol!="https:"){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						} 
						else if(p[0]=="insecure" && linkA.protocol!="https:" && location.protocol=="https:"){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
					}	}
					catch(e){unsafeWindow.console.log('LinkAlert: '+e);}
		}	}	}
		else{
			for(var o=0,p; p=this.conditionsRegExp[o]; o++){  //check special conditions
				if(p[0]){
					try{
						if(p[0]=="phishing" && eval(p[2])){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						}
						if(p[0]=="external" && eval(p[2])){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						} 
						else if(p[0]=="internal" && eval(p[2])){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						}
						if(p[0]=="onclick" && eval(p[2])){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						}
						if(p[0]=="blank" && eval(p[2])){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						} 
						else if(p[0]=="target" && eval(p[2])){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						}
						if(p[0]=="nofollow" && eval(p[2])){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						}
						if(p[0]=="secure" && eval(p[2])){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
						} 
						else if(p[0]=="insecure" && eval(p[2])){
							this.addToLink(linkA,p[0],p[1],p[3],situ);
					}	}
					catch(e){unsafeWindow.console.log('LinkAlert: '+e);}
	}	}	}	},
	
	addToLink: function(LAlink,LAtitle,LAalt,LAsrc,situ){
		if(this.showTextOnly){
			var LA = $ce("SPAN");
			var LAtext = $ct(" ["+LAalt.toString()+"]");
			$ac(LA,LAtext);
			$sa(LA,"class","LAtxt");
		}
		else{
			var LA = $ce("IMG");
			$sa(LA,"title",LAtitle);
			$sa(LA,"alt",LAalt);
			$sa(LA,"src",LAsrc);
			$sa(LA,"class","LAimage");
		}
		
		switch(situ){
			case 1:
			default:
				LAlink.appendChild(LA);
			break;
			case 2:
				if(!$gi("LAmouse")){
					var mouse = $ce("DIV");
					$sa(mouse,"id","LAmouse");
					$ac($d.body,mouse);
					$hs($gi("LAmouse"),2);
				}
				$gi("LAmouse").appendChild(LA);
				$addEvent(LAlink,"mouseover",LinkAlert.showInRightPlace);
				$addEvent(LAlink,"mousemove",LinkAlert.showInRightPlace);
				$addEvent(LAlink,"focus",LinkAlert.showInRightPlace);
				$addEvent(LAlink,"mouseout",LinkAlert.hideInRightPlace);
				$addEvent(LAlink,"blur",LinkAlert.hideInRightPlace);
			break;
	}	},

	showInRightPlace: function(e){
		if($gi("LAmouse")){
			x=(e)?e.pageX:event.x;
			y=(e)?e.pageY:event.y;
			$gi("LAmouse").style.left=(x+Number(LinkAlert.mouseOffset[0]))+"px";
			$gi("LAmouse").style.top=(y+Number(LinkAlert.mouseOffset[1]))+"px";
			$hs($gi("LAmouse"),1);
	}	},
	
	hideInRightPlace: function(){
		if($gi("LAmouse")){
			$re($gi("LAmouse"));
	}	},

	/* SETTINGS */
	settingsWindowName: "LinkAlert",
	settingsWindowNode: function(){return $gi("USOwindow_"+this.settingsWindowName,top.document).contentDocument},
	loadSettingsWindow: function(){
		const settingsContent =	'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /><title>Link Alert Settings Window</title>'+
								'<style type="text/css">'+
									'/* common */ body{color:CaptionText;font-family:Tahoma,Verdana,Arial;font-size:10pt;}input[type=checkbox]{margin-bottom:1px;}fieldset{border:1px solid ThreeDShadow;padding:5px 8px 10px 8px;}select option{height:16px;}a{color:#0088FF;}input[type=text],input[type=number]{border:1px solid ThreeDShadow; padding:2px 1px;}.USOinp{}.USObtn{}.required{background:Menu top right no-repeat url("data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAHklEQVQImWP4z8DwHx0DSSDGKogmgRBEkkAVhEoAAKhbO8Uz7uXSAAAAAElFTkSuQmCCAA==")}'+
									'/*   tabs */ #USOtabs{display:table;width:100%;min-width:444px;height:24px;}.USOtab{display:inline;background:none;padding:5px 15px;border:1px solid ThreeDShadow;border-bottom:1px solid ThreeDShadow;margin-right:-1px;margin-bottom:-1px;float:left;font-size:8pt;font-weight:normal;font-style:normal;text-decoration:none;color:CaptionText;cursor:pointer;}.USOtab:hover{background:Highlight;color:HighlightText;}.USOtabActive{background:ActiveCaption;color:CaptionText;border-bottom:1px solid transparent;float:left;font-weight:bold;}'+
									'/* fields */ #USOfields{padding:15px 10px 12px 10px;border:1px solid ThreeDShadow;border-bottom:0px none;min-width:422px;}'+
									'/*   note */ #USOnote{border-left:1px solid ThreeDShadow;border-right:1px solid ThreeDShadow;background:none;padding:0px 11px 11px 11px;}'+
									'/* submit */ #USOsubmit{border:1px solid ThreeDShadow;border-top:0px none;background:none;text-align:right;padding:0px 11px 11px 11px;min-width:420px;}#USOsubmit input{width:67px;font-size:11px;padding:2px;}'+
								'</style>'+
								'</head><body>'+
									'<div id="USOtabs"></div>'+
									'<div id="USOfields">'+
										'<fieldset id="USOfield1"><legend>'+language.localise(['LA','options'])+'</legend>'+
											'<table width="400px" border="0" cellspacing="0" cellpadding="2"><tr><td colspan="2">'+
												'<fieldset><legend>'+language.localise(['LA','display'])+'</legend><table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td width="20px" valign="middle">'+
													'<input name="showInlineImg" type="checkbox" id="showInlineImg" value="showInlineImg" /></td><td valign="middle"><label for="showInlineImg">'+language.localise(['LA','showinlineimg'])+'</label></td></tr><tr><td valign="middle">'+
													'<input name="showMouseImg" type="checkbox" id="showMouseImg" value="showMouseImg" /></td><td valign="middle"><label for="showMouseImg">'+language.localise(['LA','showmouseimg'])+'</label></td></tr><tr><td colspan="2" valign="middle"><hr /></td></tr><tr>'+
													'<td valign="middle">'+
													'<input name="showTextOnly" type="checkbox" id="showTextOnly" value="showTextOnly" /></td><td valign="middle"><label for="showTextOnly">'+language.localise(['LA','showtextonly'])+'</label></td></tr><tr><td valign="middle">'+
													'<input name="showOnHover" type="checkbox" id="showOnHover" value="showOnHover" /></td><td valign="middle"><label for="showOnHover">'+language.localise(['LA','showonhover'])+'&nbsp;<img src="data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKkSURBVDjLpZPdT5JhGMb9W+BPaK3matVqndXWOOigA6fmJ9DUcrUMlrN0mNMsKTUznQpq6pyKAm8CIogmypcg8GIiX8rHRHjhVbPt6o01nMvZWge/k3vP9duuZ/edAyDnf/hjoCMP2Vr3gUDj3CdV6zT1xZ6iFDaKnLEkBFOmPfaZArWT5sw60iFP+BAbOzTcQSqDZzsNRyCNkcVoaGghzDlVQKylOHJrMrUZ2Yf52y6kc36IxpyoH1lHF7EBgyMKV4jCJ5U/1UVscU4IZOYEa3I1HtwI01hwxlDLhDoJD/wxGr5YGmOLAdRIrVCuhmD3JdA6SQabx12srGB0KSpc86ew4olDOGjH4x4z0gdHDD9+c4TaQQtq+k2Yt0egXYugTmoVZgV9cyHSxXTtJjZR3WNCVfcK/NE0ppYDUNu2QTMCtS0IbrsOrVMOWL27eNJtJLOCDoWXdgeTEEosqPxoBK/TwDzWY9rowy51gJ1dGr2zLpS2aVH5QQ+Hbw88sZ7OClrGXbQrkMTTAQu4HXqUv9eh7J0OSfo7tiIU+GItilpUuM/AF2tg98eR36Q+FryQ2kjbVhximQu8dgPKxPMoeTuH4tfqDIWvCBQ2KlDQKEe9dBlGTwR36+THFZg+QoUxAL0jgsoOQzYYS+wjskcjTzSToVAkA7Hqg4Spc6tm4vgT+eIFVvmb+eCSMwLlih/cNg0KmpRoGzdl+BXOb5jAsMYNjSWAm9VjwesPR1knFilPNMu510CkdPZtqK1BvJQsoaRZjqLGaTzv1UNp9EJl9uNqxefU5QdDnFNX+Y5Qxrn9bDLUR6zjqzsMizeWYdG5gy6ZDbk8aehiuYRz5jHdeDTKvlY1IrhSMUxe4g9SuVwpdaFsgDxf2i84V9zH/us1/is/AdevBaK9Tb3EAAAAAElFTkSuQmCCAA==" alt="help" name="helpImg" width="16" height="16" title="'+language.localise(['LA','showonhovertooltip'])+'" /></label></td></tr></table></fieldset></td></tr><tr><td colspan="2">'+
												'<fieldset><legend>'+language.localise(['LA','exclusion'])+'</legend><table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td valign="middle">'+
													'<input name="notWithoutText" type="checkbox" id="notWithoutText" value="notWithoutText" /></td><td valign="middle"><label for="notWithoutText">'+language.localise(['LA','notwithouttext'])+'</label></td></tr><tr><td valign="middle">'+
													'<input name="notIfExisting" type="checkbox" id="notIfExisting" value="notIfExisting" /></td><td valign="middle"><label for="notIfExisting">'+language.localise(['LA','notifexisting'])+'</label><br/>'+
														'<label for="notIfExistingNumber">'+language.localise(['LA','notifexistingnumber'])+': <input name="notIfExistingNumber" title="'+language.localise(["LA","pixels"])+'" type="text" class="optionsInput" id="notIfExistingNumber" style="vertical-align:middle; width:25px; text-align:center;" /> '+language.localise(['LA','pixels'])+'.&nbsp;<img src="data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKkSURBVDjLpZPdT5JhGMb9W+BPaK3matVqndXWOOigA6fmJ9DUcrUMlrN0mNMsKTUznQpq6pyKAm8CIogmypcg8GIiX8rHRHjhVbPt6o01nMvZWge/k3vP9duuZ/edAyDnf/hjoCMP2Vr3gUDj3CdV6zT1xZ6iFDaKnLEkBFOmPfaZArWT5sw60iFP+BAbOzTcQSqDZzsNRyCNkcVoaGghzDlVQKylOHJrMrUZ2Yf52y6kc36IxpyoH1lHF7EBgyMKV4jCJ5U/1UVscU4IZOYEa3I1HtwI01hwxlDLhDoJD/wxGr5YGmOLAdRIrVCuhmD3JdA6SQabx12srGB0KSpc86ew4olDOGjH4x4z0gdHDD9+c4TaQQtq+k2Yt0egXYugTmoVZgV9cyHSxXTtJjZR3WNCVfcK/NE0ppYDUNu2QTMCtS0IbrsOrVMOWL27eNJtJLOCDoWXdgeTEEosqPxoBK/TwDzWY9rowy51gJ1dGr2zLpS2aVH5QQ+Hbw88sZ7OClrGXbQrkMTTAQu4HXqUv9eh7J0OSfo7tiIU+GItilpUuM/AF2tg98eR36Q+FryQ2kjbVhximQu8dgPKxPMoeTuH4tfqDIWvCBQ2KlDQKEe9dBlGTwR36+THFZg+QoUxAL0jgsoOQzYYS+wjskcjTzSToVAkA7Hqg4Spc6tm4vgT+eIFVvmb+eCSMwLlih/cNg0KmpRoGzdl+BXOb5jAsMYNjSWAm9VjwesPR1knFilPNMu510CkdPZtqK1BvJQsoaRZjqLGaTzv1UNp9EJl9uNqxefU5QdDnFNX+Y5Qxrn9bDLUR6zjqzsMizeWYdG5gy6ZDbk8aehiuYRz5jHdeDTKvlY1IrhSMUxe4g9SuVwpdaFsgDxf2i84V9zH/us1/is/AdevBaK9Tb3EAAAAAElFTkSuQmCCAA==" alt="help" name="helpImg2" width="16" height="16" title="'+language.localise(['LA','notifexistingnumbertooltip'])+'" /></label></td></tr></table></fieldset></td></tr><tr><td width="50%" valign="top">'+
												'<fieldset><legend>'+language.localise(['LA','position'])+'</legend><table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td width="75%">'+
													'<label for="xas">'+language.localise(['LA','xas'])+':</label></td><td width="25%"><input name="xas" title="'+language.localise(["LA","xas"])+'" type="number" class="optionsInput required" id="xas" style="width:50px; text-align:right;" /></td></tr><tr><td>'+
													'<label for="yas">'+language.localise(['LA','yas'])+':</label></td><td><input name="yas" title="'+language.localise(["LA","yas"])+'" type="number" class="optionsInput required" id="yas" style="width:50px; text-align:right;" /></td></tr></table></fieldset></td><td width="50%" rowspan="2" valign="top">'+
												'<fieldset><legend>'+language.localise(['LA','style'])+'</legend><table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td width="75%">'+
													'<label for="backGroundColor">'+language.localise(['LA','bgColor'])+':</label></td><td width="25%"><input name="backGroundColor" title="'+language.localise(["LA","bgColor"])+'" type="text" class="optionsInput" id="backGroundColor" style="width:50px; text-align:right;" /></td></tr><tr><td>'+
													'<label for="borderColor">'+language.localise(['LA','bdColor'])+':</label></td><td><input name="borderColor" title="'+language.localise(["LA","bdColor"])+'" type="text" class="optionsInput" id="borderColor" style="width:50px; text-align:right;" /></td></tr><tr><td>'+
													'<label for="borderSize">'+language.localise(['LA','bdSize'])+':</label></td><td><input name="borderSize" title="'+language.localise(["LA","bdSize"])+'" type="number" min="0" class="optionsInput" id="borderSize" style="width:50px; text-align:right;" /></td></tr><tr><td>'+
													'<label for="opaCity">'+language.localise(['LA','opaCity'])+':</label></td><td><input name="opaCity" title="'+language.localise(["LA","opaCity"])+'" type="number" min="0" max="100" class="optionsInput" id="opaCity" style="width:50px; text-align:right;" /></td></tr></table></fieldset></td></tr><tr><td valign="top">'+
												'<fieldset><legend>'+language.localise(['LA','misc'])+'</legend><table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td width="75%">'+
													'<label for="numbericons">'+language.localise(['LA','numberimg'])+':</label></td><td width="25%"><input name="numbericons" title="'+language.localise(["LA","numberimg"])+'" type="text" class="optionsInput" id="numbericons" style="width:50px; text-align:right;" /></td></tr></table></fieldset></td></tr></table></fieldset>'+
										'<fieldset id="USOfield2"><legend>'+language.localise(['LA','protocols'])+'</legend><div id="USOfield2div"></div></fieldset>'+
										'<fieldset id="USOfield3"><legend>'+language.localise(['LA','extensions'])+'</legend><div id="USOfield3div"></div></fieldset>'+
										'<fieldset id="USOfield4"><legend>'+language.localise(['LA','conditions'])+'</legend><div id="USOfield4div"></div></fieldset>'+
									'</div>'+
									'<div id="USOnote"><small>'+language.localise(["LA","pagerefresh"])+'</small></div>'+
									'<div id="USOsubmit"><input name="LAreset" type="submit" class="USObtn" id="LAreset" value="'+language.localise(["common","reset"])+'" title="'+language.localise(["common","reset"])+'" style="float:left;" /><input name="LAok" type="submit" class="USObtn" id="LAok" value="'+language.localise(["common","ok"])+'" title="'+language.localise(["common","ok"])+'" />&nbsp;&nbsp;&nbsp;<input name="LAcancel" type="submit" class="USObtn" id="LAcancel" value="'+language.localise(["common","cancel"])+'" title="'+language.localise(["common","cancel"])+' "/>&nbsp;&nbsp;&nbsp;<input name="LAapply" type="submit" class="USObtn" id="LAapply" value="'+language.localise(["common","apply"])+'"title="'+language.localise(["common","apply"])+'"  /></div>'+
								'</body></html>';
		const linkTypeContent = '<table width="400px" border="0" cellpadding="2" cellspacing="0"><tr><td width="50%">'+
									'<fieldset><legend>'+language.localise(['LA','title'])+'</legend><table width="" border="0" cellspacing="0" cellpadding="0"><tr><td>'+
										'<select name="LAtitleList" size="5" id="LAtitleList" style="width:174px;"><option selected="selected">&nbsp;</option></select></td></tr><tr><td align="center">'+
										'<input name="LAtitleAdd" title="'+language.localise(["common","add"])+'" type="submit" class="btn" id="LAtitleAdd" style="width:33%;" value="+" />'+
										'<input name="LAtitleRemove" title="'+language.localise(["common","remove"])+'" type="submit" class="btn" id="LAtitleRemove" style="width:34%;" value="-" />'+
										'<input name="LAtitleEdit" title="'+language.localise(["common","edit"])+'" type="submit" class="btn" id="LAtitleEdit" style="width:33%;" value="*" /></td></tr><tr><td>'+
										'<input name="LAtitleInput" title="'+language.localise(["LA","title"])+'" type="text" id="LAtitleInput" style="width:170px;" value="&nbsp;" /></td></tr></table></fieldset></td><td width="50%" colspan="3">'+
									'<fieldset><legend>'+language.localise(['LA','reference'])+'</legend><table width="" border="0" cellspacing="0" cellpadding="0"><tr><td>'+
										'<select name="LAreferenceList" size="5" id="LAreferenceList" style="width:174px;"><option selected="selected">&nbsp;</option></select></td></tr><tr><td align="center">'+
										'<input name="LAreferenceAdd" title="'+language.localise(["common","add"])+'" type="submit" class="btn" id="LAreferenceAdd" style="width:33%;" value="+" />'+
										'<input name="LAreferenceRemove" title="'+language.localise(["common","remove"])+'" type="submit" class="btn" id="LAreferenceRemove" style="width:34%;" value="-" />'+
										'<input name="LAreferenceEdit" title="'+language.localise(["common","edit"])+'" type="submit" class="btn" id="LAreferenceEdit" style="width:33%;" value="*" /></td></tr><tr><td>'+
										'<input name="LAreferenceInput" title="'+language.localise(["LA","reference"])+'" type="text" id="LAreferenceInput" style="width:170px;" value="&nbsp;" /></td></tr></table></fieldset></td></tr><tr style="height:0px; font-size:0px; padding:0px; margin:0px;"><td colspan="2">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td colspan="3">'+
									'<fieldset><legend>'+language.localise(['LA','icon'])+'</legend>'+
										'<textarea name="LAiconInput" title="'+language.localise(["LA","icon"])+'" cols="" rows="1" wrap="off" id="LAiconInput" style="width:209px; overflow:scroll;">&nbsp;</textarea>'+
										'<input name="LAiconEdit" title="'+language.localise(["common","edit"])+'" type="submit" class="btn" id="LAiconEdit" style="width:25px; height:38px; vertical-align:top;" value="*" /></fieldset></td><td width="130px" rowspan="2" align="center" valign="middle">'+
									'<fieldset><legend>'+language.localise(['LA','image'])+'</legend>'+
										'<table border="0" cellspacing="0" cellpadding="0" style="height:98px;"><tr><td align="center" valign="middle" id="LAiconImage">&nbsp;</td></tr></table></fieldset></td></tr><tr><td colspan="3">'+
									'<fieldset><legend>'+language.localise(['LA','alt'])+'</legend>'+
										'<input name="LAaltInput" title="'+language.localise(["LA","alt"])+'" type="text" id="LAaltInput" style="margin-top:1px; width:209px;" value="&nbsp;" />'+
										'<input name="LAaltEdit" title="'+language.localise(["common","edit"])+'" type="submit" class="btn" id="LAaltEdit" style="width:25px; height:24px; vertical-align:top;" value="*" /></fieldset>'+
								'</td></tr></table>';

		 US_options = new US.Options({
			   name : this.settingsWindowName,
			content : settingsContent,
			addFade : true,
			addTabs : true,
		activeTabNr : 0,
		showAtStart : false,
		endFunction : function(){
						LinkAlert.loadSettingsWindowButtons();
						LinkAlert.loadSettingsFieldButtons();
						LinkAlert.loadSettingsFieldTitle();
						LinkAlert.loadSettingsWindowValues();
						
						// not yet implented;
						$sa($gi("showOnHover",LinkAlert.settingsWindowNode()),"disabled","true");
						$sa($gi("numbericons",LinkAlert.settingsWindowNode()),"disabled","true");
						var labels=$gt("LABEL",LinkAlert.settingsWindowNode());
						for(var i=0; i<labels.length; i++){
							if($ga(labels[i],"for").match("showOnHover") || $ga(labels[i],"for").match("numbericons")){
								labels[i].style.textDecoration="line-through";
					  }	}	},
		tabFunction : {0:function(){
							$gi("USOfield2div",LinkAlert.settingsWindowNode()).innerHTML=linkTypeContent;
							$gi("USOfield3div",LinkAlert.settingsWindowNode()).innerHTML="";
							$gi("USOfield4div",LinkAlert.settingsWindowNode()).innerHTML="";
						},1:function(){
							$gi("USOfield2div",LinkAlert.settingsWindowNode()).innerHTML=linkTypeContent;
							$gi("USOfield3div",LinkAlert.settingsWindowNode()).innerHTML="";
							$gi("USOfield4div",LinkAlert.settingsWindowNode()).innerHTML="";
							LinkAlert.loadSettingsFieldButtons();
							LinkAlert.loadSettingsFieldTitle();
						},2:function(){
							$gi("USOfield2div",LinkAlert.settingsWindowNode()).innerHTML="";
							$gi("USOfield3div",LinkAlert.settingsWindowNode()).innerHTML=linkTypeContent;
							$gi("USOfield4div",LinkAlert.settingsWindowNode()).innerHTML="";
							LinkAlert.loadSettingsFieldButtons();
							LinkAlert.loadSettingsFieldTitle();
						},3:function(){
							$gi("USOfield2div",LinkAlert.settingsWindowNode()).innerHTML="";
							$gi("USOfield3div",LinkAlert.settingsWindowNode()).innerHTML="";
							$gi("USOfield4div",LinkAlert.settingsWindowNode()).innerHTML=linkTypeContent;
							LinkAlert.loadSettingsFieldButtons();
							LinkAlert.loadSettingsFieldTitle();
							
							if(/firefox/i.test(Navigator.$browser().toString()) && Number(Navigator.$version()[0].split(".")[0])>2){  // bug in Firefox 3
								$sa($gi("LAreferenceAdd",LinkAlert.settingsWindowNode()),"disabled","true");
								$sa($gi("LAreferenceRemove",LinkAlert.settingsWindowNode()),"disabled","true");
								$sa($gi("LAreferenceEdit",LinkAlert.settingsWindowNode()),"disabled","true");
					  }	}	}
		});
	},
	closeSettingsWindow: function(){
		US_options.close();
	},

	// FIELDS > LOADS
	loadSettingsFieldButtons: function(){
		$gi("LAtitleAdd",this.settingsWindowNode())?		$addEvent($gi("LAtitleAdd",this.settingsWindowNode()),"click",			function(){LinkAlert.addSettingsFieldTitle();}):null;
		$gi("LAtitleRemove",this.settingsWindowNode())?		$addEvent($gi("LAtitleRemove",this.settingsWindowNode()),"click",		function(){LinkAlert.removeSettingsFieldTitle();}):null;
		$gi("LAtitleEdit",this.settingsWindowNode())?		$addEvent($gi("LAtitleEdit",this.settingsWindowNode()),"click",			function(){LinkAlert.editSettingsFieldTitle();}):null;
		$gi("LAreferenceAdd",this.settingsWindowNode())?	$addEvent($gi("LAreferenceAdd",this.settingsWindowNode()),"click",		function(){LinkAlert.addSettingsFieldReference();}):null;
		$gi("LAreferenceRemove",this.settingsWindowNode())?	$addEvent($gi("LAreferenceRemove",this.settingsWindowNode()),"click",	function(){LinkAlert.removeSettingsFieldReference();}):null;
		$gi("LAreferenceEdit",this.settingsWindowNode())?	$addEvent($gi("LAreferenceEdit",this.settingsWindowNode()),"click",		function(){LinkAlert.editSettingsFieldReference();}):null;
		$gi("LAiconEdit",this.settingsWindowNode())?		$addEvent($gi("LAiconEdit",this.settingsWindowNode()),"click",			function(){LinkAlert.editSettingsFieldIcon();}):null;
		$gi("LAaltEdit",this.settingsWindowNode())?			$addEvent($gi("LAaltEdit",this.settingsWindowNode()),"click",			function(){LinkAlert.editSetttingsFieldAlt();}):null;
	},
	loadSettingsFieldTitle: function(){
		this.cleanSettingsFields(true);
		
		for(var i=0; i<this.linkTypes().length; i++){
			$gi("LAtitleList",this.settingsWindowNode()).options[i] = new Option(this.linkTypes()[i][0],this.linkTypes()[i][0]);
			$addEvent($gi("LAtitleList",this.settingsWindowNode()).options[i],"mouseup",function(){
				LinkAlert.loadSettingsFieldReference(this.index);
				LinkAlert.fillSettingsInputTitle();
			});
	}	},
	loadSettingsFieldReference: function(x){
		this.cleanSettingsFields();
	
		if(this.linkTypes()[x][2]){
			var orginalRef= this.linkTypes()[x][2].replace(/\\,/g,"doetUmijMaarEenKomma");
			var reference = orginalRef.split(/,/)?orginalRef.split(/,/):orginalRef;
			for(var i=0; i<reference.length; i++){
				reference[i]=reference[i].replace(/doetUmijMaarEenKomma/gi,",")
				$gi("LAreferenceList",this.settingsWindowNode()).options[i] = new Option(reference[i],reference[i]);
				$addEvent($gi("LAreferenceList",this.settingsWindowNode()).options[i],"mouseup",function(){LinkAlert.fillSettingsInputReference()});
		}	}
	
		if(this.linkTypes()[x][3]){
			$gi("LAiconInput",this.settingsWindowNode()).value=this.linkTypes()[x][3];
		}
		
		if(this.linkTypes()[x][1]){
			$gi("LAaltInput",this.settingsWindowNode()).value=this.linkTypes()[x][1];
		}
		
		if(this.linkTypes()[x][0] && this.linkTypes()[x][1] && this.linkTypes()[x][3]){
			if(!$gi("LAiconImageImg",this.settingsWindowNode())){
				var LAiconImageImg = $ce("IMG");
				$sa(LAiconImageImg,"id","LAiconImageImg");
				LAiconImageImg.style.background=(this.imageStyle.bgColor?this.imageStyle.bgColor:"transparent")+" !important;";
				LAiconImageImg.style.border=(this.imageStyle.bdColor?this.imageStyle.bdColor:"transparent")+" "+(this.imageStyle.bdSize?this.imageStyle.bdSize:0)+"px "+(this.imageStyle.bdSize>0?"solid":"none")+" !important;";
				LAiconImageImg.style.opacity=(this.imageStyle.opacity?this.imageStyle.opacity/100:"1")+" !important;";
	
				$gi("LAiconImage",this.settingsWindowNode()).appendChild(LAiconImageImg);
			}
			$sa($gi("LAiconImageImg",this.settingsWindowNode()),"src",this.linkTypes()[x][3]);
			$sa($gi("LAiconImageImg",this.settingsWindowNode()),"title",this.linkTypes()[x][0]);
			$sa($gi("LAiconImageImg",this.settingsWindowNode()),"alt",this.linkTypes()[x][1]);
	}	},
	
	// FIELDS > FILL
	fillSettingsInputTitle: function(){
		$gi("LAtitleInput",this.settingsWindowNode()).value = $gi("LAtitleList",this.settingsWindowNode()).options[$gi("LAtitleList",this.settingsWindowNode()).selectedIndex].innerHTML;
	},
	
	fillSettingsInputReference: function(){
		$gi("LAreferenceInput",this.settingsWindowNode()).value = $gi("LAreferenceList",this.settingsWindowNode()).options[$gi("LAreferenceList",this.settingsWindowNode()).selectedIndex].innerHTML;
	},
	
	// FIELDS > CLEAN
	cleanSettingsFields: function(titleToo){
		if(titleToo){
			$rc($gi("LAtitleList",this.settingsWindowNode()));
		}
		$rc($gi("LAreferenceList",this.settingsWindowNode()));
		$gi("LAiconInput",this.settingsWindowNode()).value="";
		$gi("LAaltInput",this.settingsWindowNode()).value="";
		$gi("LAtitleInput",this.settingsWindowNode()).value="";
		$gi("LAreferenceInput",this.settingsWindowNode()).value="";
		
		if($gi("LAiconImageImg",this.settingsWindowNode())){
			$gi("LAiconImageImg",this.settingsWindowNode()).src="";
			$gi("LAiconImageImg",this.settingsWindowNode()).title="";
			$gi("LAiconImageImg",this.settingsWindowNode()).alt="";
	}	},
	
	// FIELDS > EDIT
	editSettingsFieldTitle: function(){
		var x=$gi("LAtitleList",this.settingsWindowNode()).selectedIndex;
		if(x>=0){
			this.linkTypes()[x][0]=$gi("LAtitleInput",this.settingsWindowNode()).value;
			$gi("LAtitleList",this.settingsWindowNode()).options[$gi("LAtitleList",this.settingsWindowNode()).selectedIndex].innerHTML=this.linkTypes()[x][0];
			$gi("LAtitleList",this.settingsWindowNode()).options[$gi("LAtitleList",this.settingsWindowNode()).selectedIndex].selected=true;  // doesnt work :(
			$gi("LAiconImageImg",this.settingsWindowNode()).title=this.linkTypes()[x][0];
	}	},
	
	editSetttingsFieldAlt: function(){
		var x=$gi("LAtitleList",this.settingsWindowNode()).selectedIndex;
		if(x>=0){
			this.linkTypes()[x][1]=$gi("LAaltInput",this.settingsWindowNode()).value;
			$gi("LAiconImageImg",this.settingsWindowNode()).alt=this.linkTypes()[x][1];
	}	},
	
	editSettingsFieldReference: function(){
		if($gi("LAreferenceInput",this.settingsWindowNode()).value!=""){
			var x=$gi("LAtitleList",this.settingsWindowNode()).selectedIndex;
			if(x>=0){
				$gi("LAreferenceList",this.settingsWindowNode()).options[$gi("LAreferenceList",this.settingsWindowNode()).selectedIndex].innerHTML=$gi("LAreferenceInput",this.settingsWindowNode()).value;
			
				var reference="";
				for(var i=0; i<$gi("LAreferenceList",this.settingsWindowNode()).options.length; i++){
					reference+=$gi("LAreferenceList",this.settingsWindowNode()).options[i].innerHTML+((i<=($gi("LAreferenceList",this.settingsWindowNode()).options.length-2))?",":"");
				}
				this.linkTypes()[x][2]=reference;
	}	}	},
	
	editSettingsFieldIcon: function(){
		var x=$gi("LAtitleList",this.settingsWindowNode()).selectedIndex;
		if(x>=0){
			this.linkTypes()[x][3]=$gi("LAiconInput",this.settingsWindowNode()).value;
			$gi("LAiconImageImg",this.settingsWindowNode()).src=this.linkTypes()[x][3];
	}	},
	
	// FIELDS > ADD
	addSettingsFieldTitle: function(){
		if($gi("LAtitleInput",this.settingsWindowNode()).value!=""){
			var x=$gi("LAtitleList",this.settingsWindowNode()).options.length;
			if(x>=0){
				$gi("LAtitleList",this.settingsWindowNode()).options[x] = new Option($gi("LAtitleInput",this.settingsWindowNode()).value,$gi("LAtitleInput",this.settingsWindowNode()).value);
				$addEvent($gi("LAtitleList",this.settingsWindowNode()).options[x],"mouseup",function(){
					LinkAlert.loadSettingsFieldReference(this.index);
					LinkAlert.fillSettingsInputTitle();
				});
				if(typeof(this.linkTypes()[x])==="undefined"){
					this.linkTypes().push(new Array(4));
				}
				this.linkTypes()[x][0]=$gi("LAtitleInput",this.settingsWindowNode()).value;
				this.linkTypes()[x][1]="";
				this.linkTypes()[x][2]="";
				this.linkTypes()[x][3]="";
				$gi("LAtitleList",LinkAlert.settingsWindowNode()).options[x].selected=true;
		
				this.cleanSettingsFields();
				this.fillSettingsInputTitle();
	}	}	},
	
	addSettingsFieldReference: function(){
		if($gi("LAreferenceInput",LinkAlert.settingsWindowNode()).value!=""){
			var x=$gi("LAtitleList",LinkAlert.settingsWindowNode()).selectedIndex;
			var xx=$gi("LAreferenceList",LinkAlert.settingsWindowNode()).options.length;
			if(x>=0 && xx>=0){
				$gi("LAreferenceList",LinkAlert.settingsWindowNode()).options[xx] = new Option($gi("LAreferenceInput",LinkAlert.settingsWindowNode()).value,$gi("LAreferenceInput",LinkAlert.settingsWindowNode()).value);
				$gi("LAreferenceList",LinkAlert.settingsWindowNode()).options[xx].selected=true;
				$addEvent($gi("LAreferenceList",LinkAlert.settingsWindowNode()).options[xx],"mouseup",function(){LinkAlert.fillSettingsInputReference()});
		
				var reference="";
				for(var i=0; i<$gi("LAreferenceList",LinkAlert.settingsWindowNode()).options.length; i++){
					reference+=$gi("LAreferenceList",LinkAlert.settingsWindowNode()).options[i].innerHTML+((i<=($gi("LAreferenceList",LinkAlert.settingsWindowNode()).options.length-2))?",":"");
				}
				this.linkTypes()[x][2]=reference;
				
				this.fillSettingsInputReference();
	}	}	},
	
	// FIELDS > REMOVE
	removeSettingsFieldTitle: function(){
		var x=$gi("LAtitleList",LinkAlert.settingsWindowNode()).selectedIndex;
		if(x>=0){
			$re($gi("LAtitleList",LinkAlert.settingsWindowNode()).options[x]);
			
			this.linkTypes().splice(x,1);
			
			this.cleanSettingsFields();
	}	},
	
	removeSettingsFieldReference: function(){
		var x=$gi("LAtitleList",LinkAlert.settingsWindowNode()).selectedIndex;
		var xx=$gi("LAreferenceList",LinkAlert.settingsWindowNode()).selectedIndex;
		if(x>=0 && xx>=0){
			$re($gi("LAreferenceList",LinkAlert.settingsWindowNode()).options[xx]);
			
			var reference="";
			for(var i=0; i<$gi("LAreferenceList",LinkAlert.settingsWindowNode()).options.length; i++){
				reference+=$gi("LAreferenceList",LinkAlert.settingsWindowNode()).options[i].innerHTML+((i<=($gi("LAreferenceList",LinkAlert.settingsWindowNode()).options.length-2))?",":"");
			}
			this.linkTypes()[x][2]=reference;
			
			$gi("LAreferenceInput",LinkAlert.settingsWindowNode()).value="";
	}	},
	
	// SETTINGS
	loadSettingsWindowButtons: function(){
		$addEvent($gi("LAok",    this.settingsWindowNode()),"mouseup",function(){LinkAlert.applySettings();LinkAlert.closeSettingsWindow();});
		$addEvent($gi("LAapply", this.settingsWindowNode()),"mouseup",function(){LinkAlert.applySettings();});
		$addEvent($gi("LAcancel",this.settingsWindowNode()),"mouseup",function(){LinkAlert.closeSettingsWindow();LinkAlert.loadSettings();LinkAlert.loadSettingsWindowValues();});
		$addEvent($gi("LAreset", this.settingsWindowNode()),"mouseup",function(){LinkAlert.resetSettings();});
	
		$addEvent($gi("notIfExisting",this.settingsWindowNode()),"change",function(){$gi("notIfExistingNumber",LinkAlert.settingsWindowNode()).disabled=$gi("notIfExisting",LinkAlert.settingsWindowNode()).checked===true?false:true});
	},
	loadSettingsWindowValues: function(){
		$gi("showInlineImg",LinkAlert.settingsWindowNode()).checked=this.showInlineImg;
		$gi("showMouseImg",LinkAlert.settingsWindowNode()).checked=this.showMouseImg;
		$gi("showTextOnly",LinkAlert.settingsWindowNode()).checked=this.showTextOnly;
		$gi("showOnHover",LinkAlert.settingsWindowNode()).checked=this.showOnHover;
		
		$gi("notWithoutText",LinkAlert.settingsWindowNode()).checked=this.notWithoutText;
		$gi("notIfExisting",LinkAlert.settingsWindowNode()).checked=(typeof(this.notIfExistingImg)=="boolean")?this.notIfExistingImg:true;
		$gi("notIfExistingNumber",LinkAlert.settingsWindowNode()).value=$isInt(this.notIfExistingImg)?this.notIfExistingImg:0;
		
		$gi("xas",LinkAlert.settingsWindowNode()).value=this.mouseOffset[0];
		$gi("yas",LinkAlert.settingsWindowNode()).value=this.mouseOffset[1];
	
		$gi("numbericons",LinkAlert.settingsWindowNode()).value=this.numberImg===false?"":this.numberImg;
	
		$gi("backGroundColor",LinkAlert.settingsWindowNode()).value=this.imageStyle.bgColor===false?"":this.imageStyle.bgColor;
		$gi("borderColor",LinkAlert.settingsWindowNode()).value=this.imageStyle.bdColor===false?"":this.imageStyle.bdColor;
		$gi("borderSize",LinkAlert.settingsWindowNode()).value=this.imageStyle.bdSize===false?"":this.imageStyle.bdSize;
		$gi("opaCity",LinkAlert.settingsWindowNode()).value=this.imageStyle.opacity===false?"":this.imageStyle.opacity;
	},
	loadSettings: function(){
		// important to get rite of the last index "null";
		if(conditionsDefault[conditionsDefault.length]==null)conditionsDefault.pop();
		if(extensionsDefault[extensionsDefault.length]==null)extensionsDefault.pop();
		if(protocolsDefault[protocolsDefault.length]==null)protocolsDefault.pop();

		this.showInlineImg=(typeof(showInlineImgOverRide)=="boolean"?showInlineImgOverRide:US_getValue("LinkAlert.showInlineImg",showInlineImgDefault));
		this.showMouseImg=(typeof(showMouseImgOverRide)=="boolean"?showMouseImgOverRide:US_getValue("LinkAlert.showMouseImg",showMouseImgDefault));
		this.mouseOffset=(typeof(mouseOffsetOverRide)!="undefined" && what.type.of(mouseOffsetOverRide)=="array"?mouseOffsetOverRide:eval(US_getValue("LinkAlert.mouseOffset",mouseOffsetDefault.toSource())));
		this.showTextOnly=(typeof(showTextOnlyOverRide)=="boolean"?showTextOnlyOverRide:US_getValue("LinkAlert.showTextOnly",showTextOnlyDefault));
		this.showOnHover=(typeof(showOnHoverOverRide)=="boolean"?showOnHoverOverRide:US_getValue("LinkAlert.showOnHover",showOnHoverDefault));
		this.numberImg=(typeof(numberImgOverRide)=="boolean"?numberImgOverRide:US_getValue("LinkAlert.numberImg",numberImgDefault));
		this.notWithoutText=(typeof(notWithoutTextOverRide)=="boolean"?notWithoutTextOverRide:US_getValue("LinkAlert.notWithoutText",notWithoutTextDefault));
		this.notIfExistingImg=(typeof(notIfExistingImgOverRide)=="boolean"||typeof(notIfExistingImgOverRide)=="integer"?notIfExistingImgOverRide:US_getValue("LinkAlert.notIfExistingImg",notIfExistingImgDefault));
		this.imageStyle=(typeof(imageStyleOverRide)=="object"?imageStyleOverRide:eval(US_getValue("LinkAlert.imageStyle",imageStyleDefault.toSource())));
		
		this.protocols=(typeof(protocolsOverRide)=="object"?protocolsOverRide:eval(US_getValue("LinkAlert.protocols",protocolsDefault.toSource())));
		this.extensions=(typeof(extensionsOverRide)=="object"?extensionsOverRide:eval(US_getValue("LinkAlert.extensions",extensionsDefault.toSource())));
		this.conditions=(typeof(conditionsOverRide)=="object"?conditionsOverRide:eval(US_getValue("LinkAlert.conditions",conditionsDefault.toSource())));
	},
	applySettings: function(){
		this.showInlineImg=$gi("showInlineImg",LinkAlert.settingsWindowNode()).checked;
		this.showMouseImg=$gi("showMouseImg",LinkAlert.settingsWindowNode()).checked;
		this.showTextOnly=$gi("showTextOnly",LinkAlert.settingsWindowNode()).checked;
		this.showOnHover=$gi("showOnHover",LinkAlert.settingsWindowNode()).checked;
		
		this.notWithoutText=$gi("notWithoutText",LinkAlert.settingsWindowNode()).checked;
		if($gi("notIfExisting",LinkAlert.settingsWindowNode()).checked===true){
			if($gi("notIfExistingNumber",LinkAlert.settingsWindowNode()).value>0){
				this.notIfExistingImg=$gi("notIfExistingNumber",LinkAlert.settingsWindowNode()).value;
			}
			else{
				this.notIfExistingImg=true;
		}	}
		else{
			this.notIfExistingImg=false;
		}
		
		this.mouseOffset=[];
		this.mouseOffset[0]=$gi("xas",LinkAlert.settingsWindowNode()).value;
		this.mouseOffset[1]=$gi("yas",LinkAlert.settingsWindowNode()).value;
	
		this.numberImg=$gi("numbericons",LinkAlert.settingsWindowNode()).value!=""?$gi("numbericons",LinkAlert.settingsWindowNode()).value:false;
	
		this.imageStyle={};
		this.imageStyle.bgColor=$gi("backGroundColor",LinkAlert.settingsWindowNode()).value!=""?$gi("backGroundColor",LinkAlert.settingsWindowNode()).value:false;
		this.imageStyle.bdColor=$gi("borderColor",LinkAlert.settingsWindowNode()).value!=""?$gi("borderColor",LinkAlert.settingsWindowNode()).value:false;
		this.imageStyle.bdSize=$gi("borderSize",LinkAlert.settingsWindowNode()).value!=""?$gi("borderSize",LinkAlert.settingsWindowNode()).value:false;
		this.imageStyle.opacity=$gi("opaCity",LinkAlert.settingsWindowNode()).value!=""?$gi("opaCity",LinkAlert.settingsWindowNode()).value:false;
			
		this.saveSettings();
	},
	resetSettings: function(){
		if(confirm(language.localise(["LA","resetConfirm"]))===true){
			this.showInlineImg=showInlineImgDefault;
			this.showMouseImg=showMouseImgDefault;
			this.showTextOnly=showTextOnlyDefault;
			this.showOnHover=showOnHoverDefault;
			
			this.notWithoutText=notWithoutTextDefault;
			this.notIfExistingImg=notIfExistingImgDefault;
			
			this.mouseOffset=mouseOffsetDefault;
		
			this.numberImg=numberImgDefault;
		
			this.imageStyle=imageStyleDefault;
			
			this.protocols=protocolsDefault;
			this.extensions=extensionsDefault;
			this.conditions=conditionsDefault;
			 this.protocolsNormal=protocolsDefault;
			 this.extensionsNormal=extensionsDefault;
			 this.conditionsNormal=conditionsDefault;
			  this.protocolsRegExp=protocolsDefault;
			  this.extensionsRegExp=extensionsDefault;
			  this.conditionsRegExp=conditionsDefault;
			this.replaceLinkTypes();
			
			this.saveSettings();
			this.closeSettingsWindow();
	}	},
	saveSettings: function(){
		US_setValue("LinkAlert.showInlineImg",this.showInlineImg);
		US_setValue("LinkAlert.showMouseImg",this.showMouseImg);
		US_setValue("LinkAlert.mouseOffset",this.mouseOffset.toSource());
		US_setValue("LinkAlert.showTextOnly",this.showTextOnly);
		US_setValue("LinkAlert.showOnHover",this.showOnHover);
		US_setValue("LinkAlert.numberImg",this.numberImg);
		US_setValue("LinkAlert.notWithoutText",this.notWithoutText);
		US_setValue("LinkAlert.notIfExistingImg",this.notIfExistingImg);
		US_setValue("LinkAlert.imageStyle",this.imageStyle.toSource());
		
		US_setValue("LinkAlert.protocolsNormal",this.protocolsNormal.toSource());
		US_setValue("LinkAlert.extensionsNormal",this.extensionsNormal.toSource());
		US_setValue("LinkAlert.conditionsNormal",this.conditionsNormal.toSource());
	},
	
	// MISC
	activeLinkType: function(){return US_options.currentTab();},
	linkTypes: function(){
		this.protocolsNormal?this.protocolsNormal:this.protocolsNormal=LinkAlert.protocols.clone();
		this.extensionsNormal?this.extensionsNormal:this.extensionsNormal=LinkAlert.extensions.clone();
		this.conditionsNormal?this.conditionsNormal:this.conditionsNormal=LinkAlert.conditions.clone();
		switch(this.activeLinkType()){
			case 0: case 1: default: return this.protocolsNormal;
			break;
			case 2: return this.extensionsNormal;
			break;
			case 3: return this.conditionsNormal;
			break;
	}	}

}  // End LinkAlert object

LinkAlert.init();

},true);



//*** STATISTICS ***//
// Chars (exclude spaces): 105.125
// Chars (include spaces): 110.589
// Chars (Chinese): 0
// Words: 3.053
// Lines: 1.004