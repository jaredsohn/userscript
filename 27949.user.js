// ==UserScript==
// @name           Google Skin - Modified Black Theme
// @namespace      credit to Bloody_Angel - www.myspace.com/bloodyangel88 for original script
// @description    Black Skin for Google search (modified version)
// @include        http://www.google.com/*
// @include        http://www.google.com/ig*
// @include        http://images.google.com/*
// @exclude        http://www.google.com/reader/*
// @exclude        http://www.google.com/firefox*
// ==/UserScript==


// Change Google default Logo (Taken from Google i&Search Dark + Enhancements - http://userscripts.org/scripts/show/12917 )
var BlackLogo; function enhanceGoogle() {BlackLogo =
 "IMG[width='276']   {height:0px; padding-top:160px; background:transparent url('" + googleLogoBLACK + "') no-repeat scroll bottom center !important;}" ;
if (typeof GM_addStyle != "undefined") {GM_addStyle(BlackLogo);}
else if (typeof addStyle != "undefined") {addStyle(BlackLogo);}
else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = BlackLogo;
		heads[0].appendChild(node); 
	};
};

}; var googleLogoBLACK = "data:image/gif;base64," + 
"R0lGODlhFAFuAPcAAAAAAAgAABAAABgAACEAAAAACAAAEAAIAAgIABAIABgIACEIAAAICAgICBAICBgICCEICAAIEAgIEAAIGAgIGAAQABAQABgQAAgQCAgQEAgQGAAYABgYACEYAAAYCAgYCAAhAAApAAAxAAAxCAgpCAg1CBghACEhAAA5CABCAABCCAhCCBBCEABKAABKCABSAABaAABaCABjAABjCAhjCABrAABrCABzAABzCAB7CAh7CACEBAiEDACUCAiMEA2REAAIIQAQJQgQIQAUNRAQIQoUKwgUNRQcMQAYQgAYSggYOQgYQggYShAfPAgeTxAhTgghWggmYBYrThIpXQgpawgpcxgpYxApbxcxXhAxcxgxcwgxexs2YhgxexVvMxalHggxhAg5hBAxhBA1iBY7ihA5lBg5lBhClBA5nBBCnBhCnBA5pRBCpRhCpRhKpRBCrRBCtRBKrRBKtRhErxhKtRBKvRhKvRhStRhSvRBSxhhKxhhSxhhSzhhS1hha1hha3ikAAC4FADkAADkIAEIIAEoIAC8lAEQ6AFQKAFoQAGMMAHMIAGsQAFs7AFxQAGtSACsKCEcNCF4QCGsfCHsQAIgQAJQQAJQYAEwdFH4bDlE6SStJiSVMoiJOsCVSuSNSxZQYCJQhCJwQAKIVAK0QALEUALUYAL0QAJgcDKMbC7AdCbUhEKYnFbUpEKwvG6xDNb0YAL0YCL0hDL0pEMoYAMYgCdIdBtAmDcExHc8vGtguGeE2HsdFM9pDLedBLedPOzZ7OWtaACmZLSuzMXNjAH1pAIltAJB3AJl%2BAKWEAK2EAKWYBK2MBLWQALGgCL2UAL2cAMacAMqcBMapBM6pANalANatAN6tAM61CN61AOe1BOnAAN3KCPnSBf%2FXBP%2FvDDyJVUFjn0K9QkbCTSZavSdczDFdwUJqwCVa1iRf3i1n2jRn1jpu2UV21kF05Ep761XEW1JztWPBY6OaX%2B9iTvliTvdwXf1%2FaVuCw1%2BJ21SG62OS6WWR72yc8HWi8X%2Bp8ywAAAAAFAFuAAAI%2FgABCBxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJ8yQJFl5YCGWBosQIERt6ZmRQoMCBpg2USmXJApy8q1fFffGxAweKqRELKFGSJYsZOnPQzolDh00XMVmWKCkAtm7HEsLgwcN6ddgXHjhK2F1YoMgUMnjs0EHbpnEbNm3mpKWzZw8fdHs6hWliYLDniAcwMGjQIAAwrPCG%2BbAxo8Jng0KwmDNXDq2bMV2yOFmyxEkTJ1nGnHmz%2BNNlP%2BnSfUoDRcLr5w0LnM7qAwcNF1GhC9l0bp25Tmeu%2FjSZkB3AAfMCGQCIUMQJGeJ4yl1G9wcdHTFB6ELfb%2FB06q0zuPDVcxps0g475nAixhMRhFXEFWnQgccnfZTThx98fFKGEvx1CIB08mj1hQ0xxEDCeZ4VwEU87yRIRhP6TXSAEFe0QYcdlfHBxx52zEEFBR7uBww84qiGQwwuCOaZBuHsg%2BAZWACZkRJp2LjHJ3b0qMYZYXAY5GunjWPkdUraJQU%2B%2BrDDCRlFdCTBGJPR4cYZY2RxxRIxfmmXf8P8cKQLJNil4j75JNiFEChyVMATdMTRRhliXAGFEonqaZdVqfmJJAh1MdBkoZxoIURIBUzBBqRTQNGmpZ%2Fx%2BcUM%2Fkh%2BUNcm%2FeRTDidZjDrSFHVCcQSrYMqTmg80XBfoVFjks886uBZRKUhPiBGFEeoB6xmfq8U6lRT77NMOrk88%2BxEDWRxq7WtWiUksksf2RISy7ZBDxhQNkmTEFEGcG%2BywJLoga08FhNOPPuecYcUQJuWp72BhqkYDu0px4Y%2B3bnQRRbULZ0xRwzzA6m9PGuDjjz7kQGmExihPlO4wPPT7706b%2FOMtrlE4l%2FLNDnEM6wqu7aTBP%2F7kU7IVToiL89EFgQPPOH897AICPMXsz7djTIEwfwE8AAkEkECtEgInGBJ2AAzLI2bHSBo9kdaQOAAA2Ro1gM8%2FoGYRRQbPLSDJ%2FiSsuJJLL770wssrmUzyANwgdeAIMc08o40222wzjTTIBNOBVAGkK8y6T1eUACSS9N3LL7%2FwMrjhiFfExT90e0KGbhjX9UDouMyCyyqqsNIKLrv0MvovvbgiiUcXPJKMNdVI40zj0mDzuDbdbKNNM414vRF7WGgRzjnhxOP99%2BF4wgknW5JRZxZQxD5QwzmQuILaC0EyCS654EI%2F%2FYCT%2FssurAxyUThAO0cnyECFJwzmAfPLRSsyQQhIvI1sg5AEKv7Wu17oQhWI0AgHikENajzDGIcwRGkaYAFDPOIZzoPe46BxCOtVhAFPIIMnyrGOdbTDHfngRz%2F8MbF8vIMd%2Fuv4hCfmoIY0ZGEuB8mc2ZqWtogIYBK9wEUqJjGIQUAiEpDIhN96sYtd6OIWlUgARTLAunwwawtW8BJYMOG7VkxiAAr70HkIoYpc6OKLt7DFKBZgEQQUQxvYeMYjHtCApgykAAEogANO%2BDxuaMMax7hARQrQBXN4Qg1PaMIRmjCFTayDHe3Ihz700Y4gnkELWZhCFJ4QR4I0TAfug99BMMGLXLBCEomki1MEkoBMyOKOt7hFLUrhP4kcAWiFOkMXqKBGpTzgFb7gRSoGYUiFJKAStQimLWpBC1UQgiIcmIbkkiFCwhgiGdi4xuOsYY1nHGIiUpjNGYqgPgAU4Qzm%2FqjhOtDxCTo8wYULSRcTXSBLgjggE7%2FABSsesJBExEKbtYDFKIoJEam1wxNnsNOqnMmL0qFCAa1MYiVkYYtt0gIWpWCERA6BjW5I4xiQqOdBCnCCZFTDeeyURjMOkbqFSCAc7TBHF%2Bp1kAZowQ6fSCpazmDAnC2RBw9rQXkU4oBX0AMXqGAoQwiRzZLGQhWi4ONDAhAPul2UDMu0WU8gwAt68AIVkOjpQgRwiVhwM6KmUEUhIOKIb2yDcoYI6UxP8IxqXCOd0pAGM97ZkJ%2B24xxkmOpMs3CjxbgBDWRggkMECtUYqKCgAKhqPXrBCgiAViCZCOYtUDoKRsg1IQiY%2Fls%2FBGiGLFBBA86khz144YpIALQhkCAFLe5qClKAgqILOQE3uoGNZByiMxApgCGkYY1rWAMb0ngGORny05mdjLtksENi6NAGM4whXwwJExNbINOCWPUXvT2tQBRgR1vIYhSgqMQ3HUIEf9BtHQMUwxQm0BMEvGK3r6CEGCeCiLvSIhalGEUlFMCQE2DjG9pgRjHcJpECGIMah00eNJiBDEkqhFZB1cJDikAHPWBpDmmobXsHokStdPazC8GEPejxilAMICKs%2BCJYK8EIXDrkCEEzY3m3cAUp7UQTO%2BZFKCLhOUtw86SqGMUoFLEQBDjjG9yg3HMp4oDmXeMaiWUG%2FjMeoRCJ5aMdZ2gCRMZQmT3ISQ1l0OxC1NvZziXEAVG%2B5WsVkgld3JcSjGCEIhzYECL0w1vlmANab8sTSNzDHvDNhFgpgohtbtMUpQDFJZBrkL5%2BAxsa1ipFHKGNEE%2BjGcw4hiEQ0oB89COoXWgmQ4pghwzpIQ54zoJaD3IAq9jYabKEsltDQeqGZCIXqSCyJBKBiEA4hAv5yIc7PtEJSOVqJwa%2BtJQVMWiHJEAVthAmLMB6CZUiBAEXDjMyHjFsiVxAGtrIhjWyS%2BJgvHZ1sw2Vrh5CBh31sw1jGMNGEcLnncHvAfbANCsyYW2IKIAVqpB2ISAhgIdw4R3uCOIc%2Fswbl51g4h73yLQkfhsRSUA0wpeoRMVL%2FQ0Mx%2FoR0K2IMR6HjeSR%2BBgnUJjc6HYONWQBtxBRAjp0RF4yiMEJAQ3RX2CVghlPQtyhUPBDIDCJVKii3ZFYAIcdEgAurEMd6UDHHMrwuiXs5BUo58XEM3gR%2Bn6xFqZIhSVAQfeCNODCzNVwIwTrEEM8b9%2FMSMYxBl8QIgAtqK8jMEQY4Al0%2BMETp7KtLE9jY4fTGu5XzfrYFTKITOBCFqmQxCBGD5EioCM5%2FaTTggj%2FEgeg3K2goMReMRLkL8qiFDGnhFwNUfMwJ4MYh6A9QxoADellYxqJPwYxegrws2bByQ85gzow%2FtMGp1Oh3kmTOtpwfBAIoDyhoGAE6wsiAExMsBWokERcLSKE16eDD3TAsxioIN%2BVnPwe9OAKuUdlGIEJvrALuVALpBB8jEYQxfAN3aANlFMMmCBZE0EM0qMN06BdyFAMHRAjCABAM9N2EiEF7qAOnyBptgV%2BriR%2BnjdLlxY86Udh5TcJq3A7meBbGVEEfZB2%2BPcor4N9NMEAcHcPvIALoLAIBHgRkBA4QiYKubdfA3EAXxaBztCByYcRhrANEehBsQZCMUJWdMMOnWAGW%2BB2EVEEIFcOt2E3LDgQxjZ1TXQQUGYPvdAKucd6AQABmTALs5AKibAA5SYRDEAHPogH%2Fm2gBmMgBgNnE7wgbgJICUtoEQ7QUQhoCvkliQXhAN0AgRnWgYx3ER0AOfn2DLFWDKEoEPFQK%2BVQhgtiTNoWaWNwBfSiEJz3BTrwggURAI9ID3dYCZWgagEwCKjgh8e1fhhRAG3gg5%2FwBo%2FSBVB3Ew2Acna4CrmXCIP4EK%2FwC76QC6sgYZRgZANhAd1QjtXQDKBIVJP0DBEogYqHirETDvwQckRUJ2%2BYEBLQDi1SMVGAhgmhNJ3nWUbTAL3YC9ZYCZHAAANQCKKWCYwAASIxBemAIZ%2FgKHSyBf2HEg1gDwDIC6tQCYhmgRORCfTwC7kwC%2BAojgJxCOUYeMhgDMFw%2Fo8Q0QztOA3vGAxTtQk%2FZB%2F614gOwSLmYHRToGv9IXW5iCQs1wC65VaqkF%2BSAAEJEAAi%2BRFK5wfooAdokQbms3AzsZFR1pRElo0NcQA6BjyzgArSljqO4A3m%2BAwvSQwy%2BRDGED0SyAzGUAw4RxBYoA4oaAdtkAZj0FQPUQDx4A7ycgVOgHQIkTlEIofvgxAF%2BXWVMAkqQQF7gCF8cAdz8JdVExJSsAmgGZqbEA6iqQVaoEpOgDEIEHEJtQrBp2qThAn04IsoKW0utJbtqF3HUAywSREF4Ajl6I7S9wh5QgHlQJEwZgZhMJUIoQHt8C0CpgQzJhC3eJTkVxAM8Iil%2FhMLqGAJrqV8HWEGVqkHe7CZ%2BqeOGlEEm8AOQHQO7bAP%2FsU6ZrUOiEgGkicQSolpvBALwTdzFrGRvoiEiIYIU8WS7egMimcMgYURjxCc0pAMMNkIw1YABYcl5BVjenZkQaUGiCmEBmEaRukxLEeEs1k74AiRKeEEmJkYRASY0ZieZOAd3%2BEJ5GAO5zA3ZWRGnoBwXBkAs2mS33gJmogRAbBjUSSkkiCFAsGJ7ahYx2AMmJCRCAGcEUg5xvAIWUgQRaAH47WZaSAG6NlmF9UFU8CVCAGQuKiLBVGWvRALelcJzUYSlmlwiuEGbGAGYLoUSqAFUlAEQ1AEgFoEuPUu%2Fsh0UW1wBi96SG3FC7oQC6MQc4mQERDniwK4CIvmd9WQgYoFoY4AngvRoFW6m4%2BwoAVBWYsRBy16BQ7RAJ5gDgZzNekVonPod5hAOidZCt3JZSqRBRmyB1jppWaQqCGhAdmWD%2BzAbWWQBYJJEKzAC75gaENGCcgYEZAQcb9YZDRIEMlQk2q2m8zpEAUQDMHZDMcQDI5ABHIVAWUgGW7gGGkgrAgRT6GyBKfFmFpxlI9ZfsCzC7eQZfm1aSchBHqQIePVroDpkx9BAewQcujgCXgqHrPERcJkCvhFCf5JEUrpVquQCYpQCBb4CM%2BDXSSmoJ6aELh5DXb5CI3QXhFw%2FgaQ8RhqgGfwWhDx1Am51n%2FV6TFqEwCu0I21AGGPqqspkQW%2ByiOLAbNXMJ0ZoQHu4A7sEGlmeAVECQB292mPagl9ZxGzmQuoQAmI0IAEcQKHt6mLV7IIIa4uxQzE4AikehAUsAV4FmNpoAZtEAVhCgAMYHaeoAVmumeyqgLMWWhf1E34VQkAaxJC0AZ7kBiKQV5soAYzyxEZ4EPuALXLJGcHMQl5FFH%2BSgk%2FZhGTgGm4EAqSgAi9KRAFwAz5hl2m2IHTCq7iGmbHoLKKiRASAAVkQAZlMAZmkAZz4AZW0AQawAAS0AQrwg57izcQgQBoepQElRAPAFGgpmXulhJQ%2FiBe42Ubj%2FJdIREP%2B1C53RYGVuCPBREIJjVMWoaQFlEABxY8mYAIkRBSh0AN2VANk5N4yMBYFeEMEWiXbPutAyEEUZAFYiAGZMAGnVAO75APIhM0F7UJ6BURt5gDarqLqWBS61YKeqekJsEAY5AllaUWjxLBH%2BG9%2BYAO3Xa5CXEJ3AQLEKZ3wlcRCNBWWMUIhXC62oo8rJt4xQDACoEA0%2BBSyEAMjVC73FUES4AFW2AGm8AFOPpmQbmsEIGmaOMC0zkIdwULsDC9lwAIKpG4i9G4lvUoCLsR8eAP77AOkgYXmHsQgGAKsaDFqhBhoLB7EyGb7isJXqwQ0zUNyaNY%2FiRmCGKJECdghcbQCG0bXeaBSABUKwmicBsjq362mNh0UrGQVxFWCR2XEksQJ4txqpIGBB9BVqxYhkxGvgaBCHFsCnmVvgsmESSJVZPAwTNFDIk1Oc7ADMqADK%2B7EMjgUrN7CEY8Ee8iSuvgsJAsETUmh1a8EIFgCi4MC7LAyqpACmGkEk%2BAqp6sFmlQxhixiifsilTQxgeBAJTwVdSsZUILEbXKW5lQCJu8EA5wDNIADdCgU7DGZhKhXNdwfI2gvBfxBE3rHSM3BtwrwS54HRjAEJKwxdO8xXCccRdbEk7QBtq8zWwwtRdxxi1CB2agwgoRAJSQV6SgwaQwCrQs%2Fs%2BvcIfvKwCeegHM8AzP4AzP0AywlqUOgQCq679x%2BRBNwJ4iF2NZsDGN2TIzQAOgJdKqwMpw3NRbXAiDzBFL8BhusBaT0bi1qBFk5UPl0H22Rc4IQVdalmVZNk0QkQnBE3%2Fx7BA1FdM23Qy5LMhk90fOcAyO8ABmqxBNcEN92aJTkNcHAAxi8gPtAysLzRAKUAnVPMesHMd2JXMOIQDZahFLMLeNgaphnCVngMoWEQ76cMy1RQVTcNAJIQCMkAqioGWqbcdUlQm8cJaRsNbgegLHoGa2bYotxBAIQAzX8AyL5wB5rRAFcA76sH14QF6PEQU%2BTBAHIAx9sho0MAMz%2FlAmC5HYqr3Y0AwL3HQJiHC4AhEAC0AIjBCnFCEEYzC3VWIjc5AYeKAHXZAfGBEOx6wGkTIFTqDRH4oIoCAKopAKo1DNjPC5SRQJroCDhBDVBlEACeAIyJAMuswMjUMMODwQJ8AM1eAMINTTEvFx7IAOICwZdJAF98kQJPAFP9AyDwMrNBACHtAQD6AI%2FZ3aYw3NdlULsrCxlDAJjDAJlZAKxuXdF6EBVKC7vdsGbkAcEuKrarAESpsQheEJ4tMrTuArELEAlFAJl2AJ%2FQ18ikAICxYAe0g7fygJQB4WhlAMyNDgamaKoypGZBMAFnAI9PygjgABwd1YnBBEnxwn%2FmnQtwdBAydeLCXiAiUyAzUQA9cBAjMWAISA5VkOCtddCrFQ47Ng427aWmV%2BEWKRBWXAdmXwGDYiIeTZBlSwBHfbnE3ACeTQCYooKU9w38O8EMOYCMB4CamdCqAmaqiQCrUwC6sQf5neYQ9wCI9gDGmuy8%2FwoMiQeMnwDJOTDI7wgVIKEUewGCDOFo3bBvg9ECUAS4O%2BAi4A7i5A6C8QAyPg4ohw5cCYX6JwCaOACqPg36kQc%2BO93JNkBFeQcLmL3iA%2BIXaGWU7wBEEQARJA8AagAVPwBFrACeVQDuJTW0%2BgBILKcg%2FxAJGQCFduCe7u3%2B8ejoHwyhvRFAXQAcRe%2FgzHoOa2zamGANwf4iYFXwRP8ASN8bJpoRiKMQeRO4VQYUgYICsBcABgDvRk9wARhGiUcPRIf%2FSMEHaJVBIzAgVdAAZiMAZkgN6RcdV4wCPs%2FQl4MCFQ3gkVgwVGIAS7pCgIAAloHwhxheDrWwAGIAENYAhyL%2FcSkEt3nhAMIAQKfwYz1E%2F5h2dmcAZpwAY1%2F8lukPMj4QAQsACR0PiRsPgOwPYc0QAwfwUE%2FBZjwHZzqwZokIieP7evk0ZKYO%2BvIfIi7xEF0ASbMENQ3q5l8QRG8Kd%2BSgVloAZVHcKbifgdPIQNMAFInPBRkCqqZAWrZARGIAHEizQdkQFc0B3f%2FsGhSoD8CMEAS1D7bxAnv%2Fuuyg8a2%2F8RBSAFLCJAZPAEAL0QQiAGRh4nj0EGQCD53f%2F%2BGUEETfJYnDAFTV4QERAFFj0ZyUkF8A8QAAQOJFjQ4EGECRUuZNjQ4UOIA4nE25fP3JkmBSIKZPCEzRw6dOa0KUNGyEaUKVWuZNnS5UuYDIXE66eP3CYmLJW4sRMyzRkxTmIOJVrU6FGkKDXQ1HfuzBUGLZfQ6TmnjJgpUZNu5drV69eEm%2F7ta9epS5GXXfbYmQOUCli4ceXOTXnEnz%2BLm6hkeDkBzx46V69ooFvY8GG5Yv21I0cmK0wyn%2ByowXoS8WXMmV8iiPcvXztO%2Flkev3xSzk6aLFG0ambd2nXCBvk8m%2BMkhkoDmE3SeVKT5cnq18GFZ27iryI5N2Ku4H7ZZJ2nM1mUDKdevXCAJhXdfWpDJkuE3M%2FJRLFs3fx5rg3auVv3yU3J6aTXuekiFP19%2FEQLeFqH7lOcNtKA6qVNyHmKsPwSVHAlK%2FzDQ6Q01LCPJQ3MMSu%2BBTPUsCEN5LDjwzlGSmMJlgogwxPHgNtwRRYHciIkOtwI0Q02JtyIgS4umgK8FntssYAs2njDjSFBmuOKCW7swsAnePTxyQ0ZoKINNdRgo404QpojiwlUREiCJtToBCMoy1yxASfIQOMMNNrAkqo91KDiiQkkoNAgAg0okGACCqYgoxNP3JgiSTML1VCIKMgoCQ01QrRjj0%2F8%2BASdPcrh45NyPvnEk07kRMtQUA%2BFYgwyInyDjjv0%2BGQPPCS7oyc33NiiyQNCtVVDBopY4goyQqRKpDbY6EI0JRjQ6FZkV5RAggiYddbJZKOVdlpqq7X2Wmyz1XZbbrv19ltwwxV3XHLLNfdcdNNVd11223X3XXjjlRfbgAAAOw%3D%3D"


// RUN!!!
enhanceGoogle();

x = 'body {background-color: black !important; background-position:center; font-family:segoe ui !important; font-style: normal !important;}';
x += 'a{color:#B00000 !important;text-decoration:none;background-image:url(http://i104.photobucket.com/albums/m184/myspaceeditpic/cooltext90825103.gif);background-repeat:repeat-x;background-position:center center;}';
x += 'a:hover{color:silver !important; background-image:url(http://i104.photobucket.com/albums/m184/myspaceeditpic/cooltext90825103.gif);background-repeat:repeat-x;background-position:center center;}';
x += 'span.a{color:silver !important; bottom-border:1px solid blue;}';
x += 'table{background-color:black !important; bottom-border: 1px;}';
x += 'div{color:#fff;}';
x += 'td,.n a,.n a:visited{color:#FFF !important;}';
x += '#logo span{background:url(http://i104.photobucket.com/albums/m184/myspaceeditpic/googlelogored.gif) no-repeat}';
x += '#modules .yui-b, #modules,.yui-gb, #gbar, #guser, span { background-color:black !important;}';
x += '.w_ind, .tld{ color:black !important;}';
x += '#regular_logo {background:url(http://i104.photobucket.com/albums/m184/myspaceeditpic/googlelogored.gif) no-repeat}';
x += '#footer_promos {display: none !important;}';
x += 'th {color: B00000 !important;}';
x += '.bb{border-bottom:1px solid #cc0000}';
x += '.bt{border-top:1px solid #cc0000}';

GM_addStyle(x);

