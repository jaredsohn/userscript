// ==UserScript==
// @name           Flazx Download Helper
// @namespace      http://www.shashikant.in
// @author         http://twitter.com/sKant
// @description    Redirects straight to download site
// @include        http://www.flazx.com*
// @include        http://*flazx.com*
// ==/UserScript==

	(function(){
		/******************  START MAIN *************************/
	var DEBUG = false;
	var $$ = DEBUG ? console.log : function(){};
	var IMAGE = {
		"progress" : 1,
		"download" : 2,
		"error"    : 3
	};	
	
	
	var PROGRESS_IMAGE = 'data:image/gif;base64,R0lGODlhGAAYAPQAANXc%2FwAAAKyyztHY%2BrvC4JOYsMLI6Hd6jqetyIKHnLW72IyRqKGmwMrR8mJmdnB0hpqfuFdaaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJBwAAACwAAAAAGAAYAAAFriAgjiQAQWVaDgr5POSgkoTDjFE0NoQ8iw8HQZQTDQjDn4jhSABhAAOhoTqSDg7qSUQwxEaEwwFhXHhHgzOA1xshxAnfTzotGRaHglJqkJcaVEqCgyoCBQkJBQKDDXQGDYaIioyOgYSXA36XIgYMBWRzXZoKBQUMmil0lgalLSIClgBpO0g%2Bs26nUWddXyoEDIsACq5SsTMMDIECwUdJPw0Mzsu0qHYkw72bBmozIQAh%2BQQJBwAAACwAAAAAGAAYAAAFsCAgjiTAMGVaDgR5HKQwqKNxIKPjjFCk0KNXC6ATKSI7oAhxWIhezwhENTCQEoeGCdWIPEgzESGxEIgGBWstEW4QCGGAIJEoxGmGt5ZkgCRQQHkGd2CESoeIIwoMBQUMP4cNeQQGDYuNj4iSb5WJnmeGng0CDGaBlIQEJziHk3sABidDAHBgagButSKvAAoyuHuUYHgCkAZqebw0AgLBQyyzNKO3byNuoSS8x8OfwIchACH5BAkHAAAALAAAAAAYABgAAAW4ICCOJIAgZVoOBJkkpDKoo5EI43GMjNPSokXCINKJCI4HcCRIQEQvqIOhGhBHhUTDhGo4diOZyFAoKEQDxra2mAEgjghOpCgz3LTBIxJ5kgwMBShACREHZ1V4Kg1rS44pBAgMDAg%2FSw0GBAQGDZGTlY%2BYmpyPpSQDiqYiDQoCliqZBqkGAgKIS5kEjQ21VwCyp76dBHiNvz%2BMR74AqSOdVwbQuo%2Babppo10ssjdkAnc0rf8vgl8YqIQAh%2BQQJBwAAACwAAAAAGAAYAAAFrCAgjiQgCGVaDgZZFCQxqKNRKGOSjMjR0qLXTyciHA7AkaLACMIAiwOC1iAxCrMToHHYjWQiA4NBEA0Q1RpWxHg4cMXxNDk4OBxNUkPAQAEXDgllKgMzQA1pSYopBgonCj9JEA8REQ8QjY%2BRQJOVl4ugoYssBJuMpYYjDQSliwasiQOwNakALKqsqbWvIohFm7V6rQAGP6%2BJQLlFg7KDQLKJrLjBKbvAor3IKiEAIfkECQcAAAAsAAAAABgAGAAABbUgII4koChlmhokw5DEoI4NQ4xFMQoJO4uuhignMiQWvxGBIQC%2BAJBEUyUcIRiyE6CR0CllW4HABxBURTUw4nC4FcWo5CDBRpQaCoF7VjgsyCUDYDMNZ0mHdwYEBAaGMwwHDg4HDA2KjI4qkJKUiJ6faJkiA4qAKQkRB3E0i6YpAw8RERAjA4tnBoMApCMQDhFTuySKoSKMJAq6rD4GzASiJYtgi6PUcs9Kew0xh7rNJMqIhYchACH5BAkHAAAALAAAAAAYABgAAAW0ICCOJEAQZZo2JIKQxqCOjWCMDDMqxT2LAgELkBMZCoXfyCBQiFwiRsGpku0EshNgUNAtrYPT0GQVNRBWwSKBMp98P24iISgNDAS4ipGA6JUpA2WAhDR4eWM%2FCAkHBwkIDYcGiTOLjY%2BFmZkNlCN3eUoLDmwlDW%2BAAwcODl5bYl8wCVYMDw5UWzBtnAANEQ8kBIM0oAAGPgcREIQnVloAChEOqARjzgAQEbczg8YkWJq8nSUhACH5BAkHAAAALAAAAAAYABgAAAWtICCOJGAYZZoOpKKQqDoORDMKwkgwtiwSBBYAJ2owGL5RgxBziQQMgkwoMkhNqAEDARPSaiMDFdDIiRSFQowMXE8Z6RdpYHWnEAWGPVkajPmARVZMPUkCBQkJBQINgwaFPoeJi4GVlQ2Qc3VJBQcLV0ptfAMJBwdcIl%2BFYjALQgimoGNWIhAQZA4HXSpLMQ8PIgkOSHxAQhERPw7ASTSFyCMMDqBTJL8tf3y2fCEAIfkECQcAAAAsAAAAABgAGAAABa8gII4k0DRlmg6kYZCoOg5EDBDEaAi2jLO3nEkgkMEIL4BLpBAkVy3hCTAQKGAznM0AFNFGBAbj2cA9jQixcGZAGgECBu%2F9HnTp%2BFGjjezJFAwFBQwKe2Z%2BKoCChHmNjVMqA21nKQwJEJRlbnUFCQlFXlpeCWcGBUACCwlrdw8RKGImBwktdyMQEQciB7oACwcIeA4RVwAODiIGvHQKERAjxyMIB5QlVSTLYLZ0sW8hACH5BAkHAAAALAAAAAAYABgAAAW0ICCOJNA0ZZoOpGGQrDoOBCoSxNgQsQzgMZyIlvOJdi%2BAS2SoyXrK4umWPM5wNiV0UDUIBNkdoepTfMkA7thIECiyRtUAGq8fm2O4jIBgMBA1eAZ6Knx%2BgHaJR4QwdCMKBxEJRggFDGgQEREPjjAMBQUKIwIRDhBDC2QNDDEKoEkDoiMHDigICGkJBS2dDA6TAAnAEAkCdQ8ORQcHTAkLcQQODLPMIgIJaCWxJMIkPIoAt3EhACH5BAkHAAAALAAAAAAYABgAAAWtICCOJNA0ZZoOpGGQrDoOBCoSxNgQsQzgMZyIlvOJdi%2BAS2SoyXrK4umWHM5wNiV0UN3xdLiqr%2BmENcWpM9TIbrsBkEck8oC0DQqBQGGIz%2Bt3eXtob0ZTPgNrIwQJDgtGAgwCWSIMDg4HiiUIDAxFAAoODwxDBWINCEGdSTQkCQcoegADBaQ6MggHjwAFBZUFCm0HB0kJCUy9bAYHCCPGIwqmRq0jySMGmj6yRiEAIfkECQcAAAAsAAAAABgAGAAABbIgII4k0DRlmg6kYZCsOg4EKhLE2BCxDOAxnIiW84l2L4BLZKipBopW8XRLDkeCiAMyMvQAA%2BuON4JEIo%2BvqukkKQ6RhLHplVGN%2BLyKcXA4Dgx5DWwGDXx%2BgIKENnqNdzIDaiMECwcFRgQCCowiCAcHCZIlCgICVgSfCEMMnA0CXaU2YSQFoQAKUQMMqjoyAglcAAyBAAIMRUYLCUkFlybDeAYJryLNk6xGNCTQXY0juHghACH5BAkHAAAALAAAAAAYABgAAAWzICCOJNA0ZVoOAmkY5KCSSgSNBDE2hDyLjohClBMNij8RJHIQvZwEVOpIekRQJyJs5AMoHA%2BGMbE1lnm9EcPhOHRnhpwUl3AsknHDm5RN%2Bv8qCAkHBwkIfw1xBAYNgoSGiIqMgJQifZUjBhAJYj95ewIJCQV7KYpzBAkLLQADCHOtOpY5PgNlAAykAEUsQ1wzCgWdCIdeArczBQVbDJ0NAqyeBb64nQAGArBTt8R8mLuyPyEAOwAAAAAAAAAAAA%3D%3D';
	
	var DOWNLOAD_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAPV2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarVd5NJVf276f5zznHOMxhIQ4hBARIpTMmTITGsSZzI7jGEtJRJQxQ5EopZKhORqI0KRkKikypEmSoUic9w%2Fq9673Xd%2F3%2FfPdf%2Bx17Wtf976vfa%2B91l4bQEjKm8kMRAEgKJjNctpiQnb38CQTewADfuAHPiB6U8KYxg4OtvA%2Fxo9uQAAAOtS8mczAoWhdGezqxGvvhTUr%2BvO8Q%2BF%2FDxLL3cMTAFEFABHGIjYCABGfRewCACKRbCYbAPEFABGKrzcVANkLAKosFydTAOQ8AJAYi%2FgWAJB8FvFDACBFUBhsAOQVAEE4mOoXDEAcBSAYUmlhFACSKgBQqWGUIABSBgBqGBQUQgUQbAMAJQqTxQYQnAEAeXcPT%2FKiZVoogP46AO7cfzh%2FT4AqFoDE7D%2Fcal4AsUiAyn%2FTTToBAgCI2PMwupYmAAAgfCYA%2BD4OZ1IRgJgFMJ%2FJ4cyd5nDmzwDg3gDUB1LCWRFL%2FUKQVoD%2Fa7545qXAIQAoAMgCC0aReHQ9DsHN4%2BUJ%2FsRn3F68eL5u0gPBBuE3IhPLtVZQJctWfiavkWPJlykOKAus0Vfboq6zbqUWUXtMp33DFf0jGz0MZTePGBeZOpnNW5y01LV6bONh22nnat%2FgqOl03HnO1cOt1p3k4eVZvX1qp%2FYulte53X0%2BQhQLahjtJL2BMeLH468cYBG4Kygi%2BGhIMbMqtI7VFjbA%2Fh4BkaQo6WiNGJ09K%2FaM7W2Izd0Xut8yTi5u%2FsDr%2BNsHixLiEv0OOSdtTlY%2FLJsilsp%2FBH%2BEc3Q%2BbSGdk4lk4bIJxwjH5nIGc5vzyvOzjkee8ClwLDQ8qVYkfUqwGCueKRk9%2Fe5MV2nL2dpz1WUnzx%2B9sPdiYPm2S0YVSpUClQvVcJl4hfcq6Rr%2Fdb4bvDeJNzm3pmo%2B1fbdbrtz%2F271vVN1KfWR9%2BkNro1mD9Y3KTSLt%2FA%2FRB%2FOPPr0uP5J8lPbVlLr82cZz%2B3bSG2PXiS0b26f7ajqpHet7OroTn1p8nLmVUWPz2vx1897D73Z9GbqbXUfrZ%2Bv%2F%2Fg7%2BXcVA3oDzYMug0ND4cPE4fz3qu%2FrR5xHRj5Ef%2BT7eOqT5qcHn50%2FD31hj%2BJHs7%2FKfq0aMxhr%2Bub07d24%2F%2Fjk95gJdOLIpNhk8ZTSVOW05vT1H%2Bo%2FTv%2Fk%2F0n%2FeW%2BGd8Z8Zt%2FMrZnvs9TZvl%2Bdv2MXUjkcAJCHvQiKZKBGOBHcAn4VYQexhtuAp50vlUQRtBbWFzER8xSPlSiRapEek5VeZaNAXZ2gfGxNmJr82ocaoZoSWg3r%2FXRJGy7qmxi83hRk%2BNso2YTfNNUcb7F3ywcrN%2BvrtiJbg%2B0aHcQc%2FZ2uOP903eQWsa3Kfchz2XazHUE7C3Y1eo14E3zkKaZUL1oUPY1x1veO33P%2FgYDJIK5g6RBNpnXoDlZEWAa7JDw5gha5MWp51HR0R8zlPZl7mbFu%2B%2FT3S8dhcaMHuuPrD5Yn5CbGHwpO8ky2PKybopAqnMo58uVoV1pd%2BpmMpMzALKds3WMyOTw5k7l9eY%2FzbxwvPZFZsL8w8KRHkfkpzWKZEp6SqdPvzrSWXjtbcC6hzPe85wX6xT3lyZdOVJRWVlTdrW66%2FPTKs6svrnVff3Wj52bPrd6aV7U9t%2FvuDNwdufetbvo%2BNPA3Sj5QaVJvXtk82%2FL8YemjmMeOT5SfwtPu1kvPDj73bFN%2FgXvxsr28Y3%2Bnc5dC11R33cujrzx7FHvGX9%2FqjX9j%2BZb49kYftV%2Bov%2F5dyIDMQOtgzJDy0Mvhg%2B%2FXvu8eif0g%2F%2BHRx%2BBPQp%2BqPzt%2B%2Fv4lbVRltPmr99e5scxvSt8axt3HR7%2FvnxCeOD9pONk%2B5TP1ffrAD8EfRT%2FlfxbOiM8Uz66b7fyVOcf4TZlPWCjgkDnunHROC4cDAKJgDccRBAlFptE03EYMsF58B6GXC7hVeSJ5W%2FgVSCkCv4RChd%2BLeIg%2BWb5BvFSCR5IhdU%2BaV8aBnC%2Fbv2q1vL%2FCBcUhJUlle5V9a8pV29V%2BqItpaK6z0XTTYmgz10fq7NXduyFGL1qfZeC7kbaJakjfTDfyMvY0cTK1NTM217KQ3SJoCZZjVj3WjTaVtvlb4%2Bzo9vYOGxzlnUhOs87DLm2u99xKt8W4W3uIegx6Xt4et8N%2Bp9TOz7tqvQ7vdvNW8J7yaaBkUnfTVGmz9GZGpq%2BXn6rfjH9jwNFAtyDJoK7gQyEaIT3M%2BFDF0FZWeJhEWB2bFs4dXhXhGvErsiTKKmoiuiDGMmZ6z5m9zrGE2Np9Qfvl9%2FfG5RxwjheIf3owJcEsERLvHdqTpJs0mVx1OChFJeVDaukRn6PSR3vTCtI9MyQzejMLsnZly2YPHzufE5CrnYfmvcg%2FdTzkhFHBsoL3hTdPphb5nNIrFir%2BXNJ0uuRMfCn1rPm51WXcZV%2FPd1yovVhSnnyJXbGr0qpKt3rVZYErcGXi6tC1nuutNxpv3rx1raa89uzt4jsFd%2FPv5dVl1x%2B9n9KQ1HjoQVxTdHN4C%2FMh%2FRH9ccyT7KdlrTee1T6%2F33b%2FRX37o46uzrddky8lXln3HHz98I3W28p%2B6wH84Mjwrw8%2BnwW%2Bqo9%2FmM6aO8vhACy%2BfQAABB2AHAsAt%2BcAThcAMu0AlAQBRHcDOPADuOgB%2BkYJ0PPTgIRp%2FX0%2FxEETtgId9kEuVEIzvIUphA%2BRQ%2FQRB8QX2Y%2FkIZVIM9KPzKCCqBJqgu5AI9AMtBxtRgdRDk4StwHnimPjsnFXcR24SUwU08U8sVjsDPYIm8BL4bfgw%2FCn8E%2FxswQlwjZCEuEW4RNRiuhAPES8S5ziUuWic53m6uOW4t7OXcjdz7OKx4%2BnmmeW15Q3i3eAT4Mvke81vwb%2FYf5hkjGpmLQgsFugWVBN8JgQCDGFBoRdhFuXmS2rE9koUiNqIFontkWsffnO5V%2FEY1cIrbggYSrRJxkrJSvVtDJQWlj6jgyDLEpukmXLKcgNrmqWv6JQopiyOlqJobxNxWyNhipZjVftx9oB9ccaV9cVah7UCtJ2XW%2BgI6fLozu1oU%2Fvif49g5aNvZvGNiNGK4yVTfRMt5p5mbMsErfkW1ZaNVm%2FtZnbusJuvf0uh0THaqfXLkKulm6J2x64j3hwtpN3GO%2F03ZXjVb973EeRQqWW0t4z1vhG%2BDUFiAWGBDWFSDDZoU%2FCFNlx4S8jNaIORw%2FtYcWu2jcYdzY%2BOMHgkGjS9OGu1Oajt9KrMs9ll%2BSU5VUcv1xw62TjqcaS%2FtKssu0XxS91VMVd0b7Wf%2FN4rctdkbr%2BhjtNGQ%2F3PWE%2B2%2FMivDPz5e3Xb%2FtwA1bDZR8Pfc2dDp%2FV%2FvVy7uvvnvlzCyUcDgCIwTqwATrsgzyohofwDmYQIUQZMUY8kFAkBTmD3EW6kXGUB5VHDVEPlI1moJfQR%2BgIDsPJ4YxwXrj9uCJcPW4Qw7DVmDUWguVi9dg3vAzeEZ%2BAv4n%2FQiAT3AhHCA8Iv4k6xFBiJXGUS4XLn6uca4x7HXcE910ePI89TwHPR14d3mTeXr61fIf4%2Bvn1%2BHP5p0mupFsCEgIHBL4Iugk2CGkLlQlLCecsE1yWKsInkipKEs0RkxYrX663%2FKH4dvHxFYclVknck9whuSBVstJ85SfpNBldmT5yqqy2bL9c6qpd8psVlBRJilOr%2B5RalK%2BpFK5JVo1Qo6x1VDfSUF8npymixa2NaP9c%2F03ns%2B7HDZ%2F0xvSnNuI3iRuu2Wxk5G4cYHLA9ITZZfOnFu8tESsZ68023rbJWy%2FZdTtgjlpOu53zXNrdeLdtdY%2FySPDM3l6%2B497ON7t%2B7xbz1vfZTUmj3qV9Zkj5Ovml%2BDcEIkGGwZEhV5njLKUwBrskvCdSOMomOjGmf69P7M%2F96QdWx9cluCfOJhUcNkgZOJKWtjH9a2Zx9racFbnv8ytP7Ct0LdIsJpUslCqd8zqfdbGpAqkyuXzwatsN9VtZt9G70fXEhmNNOi19j7Navdqk2393jbx60FvRVzPQPNz%2FMf1Lz1jh%2BIeJzqmw6Zmf1zgcAFAAe4iCYmiBUUQY0UF2IHHIWeQJ8h0VRzejDDQdrUGHcYI4Q1wg7iTuGYZiulgwdh4bwsvhKfiz%2BI8ENUIY4TYRT3QilhAnuMy5Crgmubdyl%2FPw8gTzdPJu5L3EJ8mXzk%2Fgj%2BNfIMUJoAIpgssFTwupCdUIbxF%2BsyxUhFfkrKi56EexzOUGy0fE81bYSCAStZIRUrpSMytvS8fKmJF5yd2yp%2BQCVtnJb1LQVlRZLae0UllKZeUaadXVamvX6qtbaXisY2oma53Tblw%2FrMuzQVuPol9g8HOTn%2BE7I6rxe1OWOWKRa6lq1WzjZfvLLt1ByfGOs43LO7eQbQseiduFdxTv2uD1xJviw6GW0I0YQ34pAVqBg8GpTL3Q92H54eYR01HnY3buxWJL91vHjcVnJWgnvkk6eFg%2BpflIQBp%2FekWmZdbAsX250nm3j7ue%2BF6YVrTmVEOJ9%2Bm50pxzOmXtFxjl%2BEvHK7Wqnlz2uzJzLeeG6s0HNTtrp%2B6k3lOqe3Sf0Uh8UNps3zL7qOiJbSv67GSb5IuiDpXOum7GK66emt6At6S%2BynfbBkaHgoaHR5w%2F1HwS%2Bezw5eBoxdfmsRffOsebv1%2BfyJgMnFKd%2BjJd9MPyx8TP5BmpmapZ9dmLv%2BR%2FFc2hc%2FS5x7%2FX%2Fk76%2FWJecp42XzX%2Fa2HrQg1HkZPF4QAs%2FpcAAIDHNCQwhEW2NTWD%2F98ICgz%2FU0MYAPiCfezsl%2FBHJtvBBQDEAOBXWISzOQAIAiCCdD8LqyVMpnqb2QCAFACiEeNragcAfACILZ1l4bS4D%2BLu723tAAAkAMSfFuzqvMRHMQMdbJdwCpNt4gQA4gBIIS3M%2FI%2FmWoyvy7al3GZWuJMrAMgDIJ0BITZOS7VmqDSzJW8oFhxoZ7voGRXxY1u5AIAIAKoCFuANLGAADdTAFkzBbGkkgzeQwRRCgAU0CAMLGAYWMP6q3GAYWOD3H1lqQAdvYEEE0CAMAmAEWBDk5RfPAvKS4hFQgAXeEPyH0SjX%2BKTx%2B%2B%2B6KYRAIITAPxk2%2F8X8cfiP1g%2BoEPKXp%2FzhvfziWUFX6BH5IdH6br6YIqaJrcdMsE2YIaYHZEwMkwA1TBvbgBljmzEDbD2m92z05ujfOou98fl7RhsIBBqEAwtoEPxf%2FaL8mxtY%2FLsDABAEAQoTAAAac0ZL%2FvOesWlRbAAA0xBmNMuP4csmGzOZgTRVslUwZa0qWVNDQw%2F%2BBXRDd%2FggFIVXAAAAIGNIUk0AAG2YAABzjgAA3NEAAIKTAAB4tgAA1pgAADO2AAAa43cL7BAAAAYcSURBVHja7JdPaBvZHce%2F78%2FMShpHcpSsPUpLcZSNItuynUK3hdQ1TsCQUJrL9lxIbqGU0N5CyCUQcnR76PrUhmVhKYWlhzaHSnTrdmO19L%2F%2FTRYr0SZ4o5XklWXZ1jgz8%2F70IEtrBzuxT7nsg99h4L3f%2B8zv%2FyNaa7zORfGa12sH4Ds%2FCCEHPhiNRo9alhUlhMB13c21tbXaQc%2FudDs%2FLPHp06dH0un0d23bHgqHw8cIIcT3%2FdWVlZUFx3HyjuP8%2BzD6yE6aPSxAAGgAxujo6PdHR0d%2FIqX83vLyslGpVOC6LgDAsiwkEgkkk0kZiUTy09PT7%2BZyud8ppbwdOva0wL4AV69e%2FVV%2Ff%2F8IIUQACD958mR4ZmYG5XIZlFIYhgFKWyGklEIQBJBS4sSJE5iYmEAqlVoA0CSE8MePHy%2FduXPnRwDEgV3Q39%2F%2FrQsXLgwXi0VMTU3BcRxEIhHEYjFQSkEp7QBrraGUglIK9Xod9%2B7dw8jISObmzZtIpVLI5%2FPd%2BwX8vgCEELdYLOL27duo1WqIxWLgnIMxBsYoCAjaBtNaQ2tAKgXGGEzTxMLCAq5fv47JyUkopbZedMOr0pBqrSNTU1Oo1WqIRqMwTbMlhgFuvAEessBCXWChLvBQF7gZgmkYnX2xWAzVahV3796FECJMKeUHtsC5c%2Bd%2B8PTp08HFxUV0d3eDcw7DMMAYA5RE9Bv9sM9ObMdXa1Xnp7H26F%2FgnHdcE4vFMDs7i7m5ueSlS5d%2BeP%2F%2B%2FfdfaQFKKR0bG%2FtZPp9nlmXturzt9zdibyLeN4x4XwbxvgyOJYcROtoLQggopWCMddzV1dWFbDZLzp8%2F%2F1POuflKgJMnTw5JKc%2BVy2WYprnrYkopKKNgzADjrVhgjIIyBsYNUPZlcLZipRUPpVIJzWbzm4ODg2%2B%2FFIAQQgYGBkaXl5f5zr9pRz0lBJRQMM5hcAOccRiMweBGC4BSUEp2QbR1FAoFDA0NjTPGjH0Bjhw50m3bdqZSqcAwDBBC9hCAMg7GKThjYIyD85YV9trfrhmlUgm2bQ%2FE4%2FGefQEsy4qGw%2BFjruvuzvVtZVorCBFAa90xf1s0ACECKKX2hGg2mzBN85hlWbGXNiPSWi92Dygp0DM4hvipYYSOngCkauUAAbRQ6Dn9NrriNupPH6Iy9xHwwpzRqhWavDQGXNfd8H1%2FNRKJQCnVPtRSAGCz9gyW%2FRa6v5ZqlV6lIGWrDEftJKJf78fmF88ArTtVp63Dsix4nrfquu76vgCNRmOtWq0uJhIJBEGwC4IQCvfzR3j4h19i44tn0IRBSAkhJTShaDaqcH7%2FLpqfPQQI7ZRnrTWCIIBt26hUKg9XV1er%2BwJorZXjOA9OnTol27VdStmp84RxuKUlFHK%2FxvNmA1IDUmn4z5so5N5Dc3kRhPEOdPu8lBLJZBILCwt%2FFUL4L60DS0tLc6FQ6J%2BJRAKe53UA2goJZVj%2F9H8o%2FOl9BM%2B3IAIfj%2F78AdYK%2FwAI7cAqpSCEgO%2F76O3thWVZi47j%2FP2VhUhKKaanp38%2BMTGhms0mhBAQQnRApFQAKFY%2FyaP48W%2FxZOZDrMz%2FpXVWffnX7fbcbDYxPj6OBw8e%2FCIIgucHaka5XO7DVCrlnD17Fuvr6wiCAEEQQAjRukApQAMrcx%2Bh%2FJ8%2FAlptXy4hhOjs3djYwMDAAM6cOfNpNpv94MDdUGstAGzeuHEDPT09aDQa8H2%2FI0KIVgYIASla2dC%2BuC2NRgPxeBzXrl0DgE0hhHfYqTicTqcxOTmJTCaDer2Ora0t%2BL4Pz%2FPged42UND59jwPruuiXq8jlUrh1q1b6Ovrg1IqfOiBpFgsOjMzM4ZSSl25ciU0Ozv7Vi6XQ6lUAmNs10jWTjUpJXp7e3H58mWk0%2BlirVZzV1ZWaLFYXAKgDjuUcgAMgDIMw7x48eI74%2BPjP97c3Px2oVBodzgAQCQSgW3bSCaTsCzrv%2Fl8fiqbzf7G9%2F2tbR2yPQ8eeCjd01%2BU8uHh4e9kMpkx27YHTdN8U2sNz%2FNq5XLZcRzn4%2Fn5%2Bb9JKf2DvgsOBbAT5Pjx4z2RSKR7u4Sv12q1ipQyOOzDhHz1OH3dAP8fAMx%2BUuVioQ9rAAAAAElFTkSuQmCCNTYyNQ%3D%3D';

	var ERROR_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAACDhJREFUeNqUV21vVNcRfubce3e9631jr22wa8xLCyGAUxYXCgWKSiNkibKgJmBFCaVtVPVb8ilSfkD7G0qlKCAqIhUoFWCbRKpUEWqc0A9pi2OLokYRBhubfbnel7t73870w91dr9frqL3S6OzuPTPPMzPnzMwSM%2BNPiQQG338f33nnHbjFIuYuX8aTjz7C0tzcGdsw%2FgXbfiQBcE0kABdAqLcXe957D9bXXyOxezcig4MIbdgALpdRnJnB4wsXXnrxxRev2LncNdT06jY8AG8yQ6D1IQITgcvl89%2BOxa4mY7E%2FOkAv%2Fo%2BHNA12odAXmp29ujkevyqFOMdr7G1LgDKZXw647ofbz5%2FH90ZGvpuMRMbc%2F5WEqsLJ5%2Furly%2Ff2bx16ys733gDO7ZsuSiJ3mpHQm1VFoHAr9e57oXAyAjEuXOIFAr4fqmU%2BuzGjbFMsXhCBebX9BwAmDfZY2NjSaJdnefPA93d2OG6Cl%2B9emn6yRMiKf%2FQNgIUCMCamvqVc%2F36BS0SgXb2LLznz%2BFWKoi%2B%2FTb2p9MpPRYbd4C%2BNQlEIlvw7NnHYnp6V3BkBB4Ad3YWPDiI7SdOKDsGBi56tXRQMwHq6EBufPzn2Xff%2Fb07NQX12DF4%2BTykYUBmMnBME5GzZ7FveHhPMh4fc1tJCAFS1c3K06d3Kh98sEMZGgILAW9hAV4%2BD3dhAbxtG7YfParsGBi45AnxM9mcAs%2By3gw9fvxhbHiYtOPHIXM5sOsCUgKeB3gePCHQOTyMfZa158Hdu6OLhnECwDxUFWxZG%2BW9e6OVFy9eUgcHwaoKb2EBXNeXEpAS1N%2BPbUNDgokuTT954gG4ogLA5kTi1Y3795M2PAwvkwEcx1duMsCuC08IhI8cwV7bTj24d2%2B0IsRxr1wWzt27t5XOzl3KoUOAosBbXFwBznUSngfq6cGWTZuImV8FcIWYGTOpVFfIcW7F0%2BmDysAA2DRXKcLz%2FO9EELaNwuQkHj579iCeTNJGy9oXOXAAHAiALauhwy0rAHCxCHNmZrIaDqdfnprKEDNjamgI%2FNVXeriz82YsnT6k9PaCq9WVynVCNUPkOCh9%2BSVkuYzIrl1gVQVse%2BX%2BWhRZygZ45dGjiUqlcooGBrK7Hz5suoZE2VI2m3Zv374ZO3z4sOjp8b35BhKB9evBrgvHNMGOAzAve%2B95YMdpCCwL1Wx2wiqV0kJRcqvrABEgRK5oWaed%2B%2FdvxXbu%2FIFIJsG2vZyK5rRICTCDpfQBHAeyWgVXq2DLAlsWpOv6ZF0XTiBwv6oopwJC5GitQkQAoCjZpWDwlDs9fSva33%2BQolEfoB5KZt9D2%2FYBKxV%2Fte3laNUdAkBSwg6HJ81Y7FSgWMyCufFudSWsP4qSyScSaXd29lZnInEQHR0rQGWl0kgPmFcAct04M4gZdij0WamnJ61ZVobWKsWaqvoNqCZSCLjBYKag62nMz9%2FQgsEjnm030kFNgKh1twaR2krMYEX5W3H9%2Bp8qmpbRHAcqETQiKESAotT3Ma739YEMA3BdyGAQsqMDnqaBmUGGsa83GJzoBDQmagA0GguvbjHEDJPIeV6tHpKJxN9JUSAcB4plQViWTz4ex2sLC34EHs7Pg2p1WXUciFKp3iT6dF3%2FnaKqmmOajfByK3ALCZISIhzWTE27kF1cPAlgTjbNERIALy7itXov0JpEXT4YvXp39%2BjWQGBIlkqwmWFLCVtKOFLCYfbX1s9SwgYgi0VsFWKv3tU1BqCvbrcZq%2F084E8rveu6u8c2KkrKMQxYAOwWkFXCvIKkRQTbMLAR2LOuq2vUW2OeEG3AN8S7ukb7hEjZhuEbqhm1W0BsZljMsKSE1WaPRQTLMNDLnEroelsSKwhIoDeu62MbiPba%2BTxsYNm7OkALSCMFrRGq7bGIYOXz6JFyb1zXR2ULCbUZPKHrY91EKcswwEKAW64WvuHk13%2FndvuIQPk89ERir5dMjhm53AmqTVZqDbwvruujOnOqurQEFsJXbgdUv4bMEEL8lQB4Uv5orX0rhhbDwLp4PCWTybGlXO4nAOZUAIjp%2Bm8SUqbMQgEQwq%2Fzq%2BytvHakqhNhVT1NUqIKjMN1DzXXibYBIgKWlhCLxVKcTP4WwC8EANix2PVyoWC69TzWctqca5fZFylhqeqkGw6fUoGCBhRkKHSqqqqTjpRwgJW6TeIwwwVQLhRMOxq91jiEVSHGs4nEmSqR6TQdsnZXrKKqk240mg4Jkc0xI8eMkBBZNxpNVzVt0mb2D28bcQFYRGY%2BkThTVZTxxhkQAGxVHc9HIq9HisXrQsowE4FrZbX%2Br0ao6iRFo2mTOfPANPG5ZQHMOECEXaFQpiMaTTuFwi123YPUZmSXRGYpGj0DVR3XanYFAKhECACQmnan1Nl5xiMy6yGvs48STYRU9eQ%2FbTtz0TDwcbWKMjPKAO5Uq7i0tIR%2F2HYmGAicjBJNuDWP3drfMCmEaUYiZ1hVx7UaZqMZ7Q%2BHwZ4HKSU0IbCVaPhl274mmCO1w%2FPpAtHpT5nzL2pXTVldwEAAuonwQ6J165n%2FLJiPsu95%2BT%2FB4OuzzB8veR4EEUhR8Hml4hPoqbPxRTiA3C3EuR9LedkAZj4hOjnH%2FISAYAdA3NwNm0JMACz%2FnbUBGDgO3FxHtPMTorf%2BLeUVDRDSzyYAYMGfGRjfaurtUaCDgF4X0DcQHSsxP80BMw5QqQCWXMZqe9M0ACEgJIFwJ7AtQtQzz%2FyXTsBg4IUJWHXluTqB%2FiYCni9k%2Bmy9ECAUvzqAap6LFePI8lAiAablygoH4CrgqYASBqRoeg8Az5jx3wEA5zdlDZHoY7oAAAAASUVORK5CYII0ODc3';	
	
	addGlobalStyle(unescape(escape('a.tip {position: relative;} a.tip span {display: none; position: absolute; text-align:center; top: 20px; left: -10px; padding: 2px; z-index: 100; background: #000;color: #fff; -moz-border-radius: 5px; -webkit-border-radius: 5px;outline: none; } a:hover.tip span{display: block;outline: none;} a:hover.tip span, a:active.tip span , a:focus.tip span{outline: none;}')));
	

		
		var MAIN_DOWNLOAD_PAGE_LINK_XPATH = '//div[@id="download"]//a/@href[position()=1]';
		var FLAZX_DOWNLOAD_PAGES_LINK_XPATH = '//a[contains(@href,"http://www.flazx.com/download")]/@href';
		var FLAZX_EBOOK_PAGES_LINK_XPATH = '//a[contains(@href,"http://www.flazx.com/ebook")]/@href';
		
		var link, i, downloadLink, anchor, progressImg;
		var allLinks = document.getElementsByTagName('A');
		var currentPageLink = window.location.href;
		
		for(i=0; i<allLinks.length; i++) {

		   if(typeof allLinks[i].href !== 'string')
			 continue;
		   anchor = allLinks[i];
		   link = anchor.href;

			if((link === currentPageLink) || (link === currentPageLink+'#')) {
				continue;
				
			} else if(link.match(/http:\/\/www\.flazx\.com\/download*/i)) {
				progressImg = createImage(IMAGE.progress, 25, 25);
				anchor.parentNode.insertBefore(progressImg, anchor.nextSibling);
				processDownloadLink(progressImg, link);
					
		   } else if(link.match(/http:\/\/www\.flazx\.com\/ebook*/i)) {
				processEbookLink(anchor, link);
		   }
		}
			  
		/*******************	END MAIN *************************/
		
		function processEbookLink(anchor, link) {
		
			GM_xmlhttpRequest({
				method: 'GET',
				url: link, 
					   
				onload:	function(responseDetails) { 
					var failed = false, i, progressImg, newSpot;
					var allDloadLinks, dloadLink;
					var tempDiv = document.createElement("div");
					tempDiv.innerHTML = responseDetails.responseText;
					try {
						allDloadLinks = document.evaluate(FLAZX_DOWNLOAD_PAGES_LINK_XPATH, tempDiv, null,
													XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null);
					} catch(e) {
						failed = true;
					}
					newSpot = anchor.nextSibling;
					
					for (i = 0; i < allDloadLinks.snapshotLength; i++) {
						progressImg = createImage(IMAGE.progress, 25, 25);
						dloadLink = allDloadLinks.snapshotItem(i).nodeValue;
						newSpot.parentNode.insertBefore(progressImg, newSpot);
						processDownloadLink(progressImg, dloadLink)
						newSpot = progressImg;
						
					}
					
				}
			});
		}
		
		function processDownloadLink(progressImg, link) {
		
			GM_xmlhttpRequest({
				method: 'GET',
				url: link, 
					   
				onload: function(responseDetails) {
					var downloadLink, downloadLinkIter, i, html;
					var failed = false;
					var tempDiv = document.createElement("div");
					tempDiv.innerHTML = responseDetails.responseText;
					
					try {
						downloadLinkIter = document.evaluate(MAIN_DOWNLOAD_PAGE_LINK_XPATH, tempDiv, null,
													XPathResult.FIRST_ORDERED_NODE_TYPE, null);
					} catch(e) {
						failed = true;
					}
										
					if(!failed && downloadLinkIter.singleNodeValue === null) {
						failed = true; 
					} else {
						downloadLink = downloadLinkIter.singleNodeValue.textContent;
					}
					
				
					if(!failed && typeof downloadLink === 'string') {
						downloadLink = downloadLink.replace(/^http:\/\/redirector.urlshield.net\/\?/i, '');
						
						if( downloadLink !== null ) {
							html = createSuccessHTML(downloadLink);
						} else { failed = true; }
								
					} else { failed = true; }
							
					if (failed) {
						html = createImage(IMAGE.error, 10, 10);
					}
					
					progressImg.parentNode.replaceChild(html, progressImg);

				}//onload func ends. comma here if more functions		

				}
		
			);
		} 	

		function createSuccessHTML (link) {
			var  ahref, img, span;
			var linkTip = "Download from <b>" + fnGetDomain(link);
			
			ahref = document.createElement('A');
			ahref.href = link;
			ahref.setAttribute('class', 'tip');
			
			img = createImage(IMAGE.download, 25, 25);
			ahref.appendChild(img);
			
			span = document.createElement('span');
			span.innerHTML = linkTip
			span.style.width = (linkTip.length-3) * 7;
			ahref.appendChild(span);
			
			return ahref;
		}
		
		function createImage(typeOfImage, width, height) {
			var img;
			img = document.createElement('img');
			img.width = width;
			img.height = height;
		
			if(typeOfImage ===  IMAGE.progress) {
				img.src = PROGRESS_IMAGE;
			} else if(typeOfImage ===  IMAGE.download) {
				img.src = DOWNLOAD_IMAGE;
			} else if(typeOfImage ===  IMAGE.error) {
				img.src = ERROR_IMAGE;
				img.title = "Error";
			}
			
			img.style.border = 'none';
			
			return img;
			
			
	}
	
	function fnGetDomain(url) {
		return url.match(/:\/\/(.[^/]+)/)[1];
	}

	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}


	
	})();
	
	

