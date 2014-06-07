// ==UserScript==
// @name           BSG Buddy
// @namespace      http://www.backshegoes.com/bsg/viewtopic.php?t=9827
// @description    Small tweaks for backshegoes.com
// @include        http://www.backshegoes.com/bsg/*
// ==/UserScript==




//######################## remove 3 second delay after posting ################
var goto = "";	
var links = document.getElementsByTagName("meta");
for (var i = 0; i < links.length; i++)
{
	if (links[i].content[0] == "3")
	{ 
		goto = links[i].content.substr(6);
		window.location = goto;

	}
}      
        






//####################### add topic icons  ###################




	if (document.URL.match(/\?f=1/) != null) 
	{
	    var qmark_pic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAAB3RJTUUH2gkSERk1WCbM8AAAAAlwSFlzAAAewgAAHsIBbtB1PgAAAARnQU1BAACxjwv8YQUAAACEUExURS4SAzIhDTEeCw4JBOdaEOhcEvegQLl3MP+oQ/+lQrV1L7h3L/GdPumXPAAAANOJN/ybOzsXBPafQOhZD+uKMudgFPuXOCMNAwoFAp1mKbx6McJ9MhQNBSIWCe5wH9lWEdVTD+xrG+BXENuOOdqLNuNnGu9yIDQUBLpIDepiFedZD/mSNf5Mam8AAAC8SURBVHjaVZCLEoJACEXRRQXLTdssK3toD8v+//8CtdQ7s+zO4cKwgC2cw5kAChMMyuWgRAAXcMITJaEHiImlEZGNPPUJereuxfYjLyJhOTE9sW6a5lVVapXaQK4Ka3O7P7D26cdIWKkZNH/G58u1pFTdwvye8cmWpPOasZ8KMbOSmbJU2P5wlCEmvu2uWPEwS/77grU98/++tcMNM/O8X5Cpjzo27IC6WrKxsjDq9xIvlhoTDwC8Ub4G8wXafA7Mj3A1/wAAAABJRU5ErkJggg%3D%3D"
	    var mets_pic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAAB3RJTUUH2gkSDwMfJQhxhwAAAAlwSFlzAAAewgAAHsIBbtB1PgAAAARnQU1BAACxjwv8YQUAAAI3UExURf////D2/9He7sHO4by/x5WZqB8kPRcZLUpIT2hoalZTWkhGWEZAVY6Sl5ais5mkvNLZ5e7w84uNl62ssJeYl8C+v8bHxMfIw8XFvbK0t6SqrLKopJycnOHj46CEh4WJgaWmrM3Ly8zNy8vLxrC2t7G2sKmVlLGgnf/9/6ONkKucmMDBwbq5tzYzMhsZGTAvL3FwbJ6AfNvc245wdLi5tNHU1KurqVhaWkFBRIiIibm+w/f6+8S6v5B6gMjO1MDHzry+t8PEt73FyLKkpJ1+gdHBwJiNlLG6xLbBzMTK1LCyqre6s5iAg62wtuze2qSYorG2xrzI1fDw8q23vaiyuLO3w////3aAisHP3+bv+rrK31VfaRYZGKasr5WZpZ+Sn////9vExdHU2UtRWjg/SpSisbTF2rPA04WSoHOAj42VnpyImNHX3vPc3////8PV4qO0x6CtvrrH25+ruXqFlJGeqv/6+19qe4iUqr3M4LfK3oGNmbCywJ+XqcfP3tPR1VpicW16kYiYsa2/2JCdsFtnbMTG1b62w+Ho9nuEnCszRgIDCQIDBwsQF3qLq5621FtqfkFLUbfAv/z///n29////5aw3hcqfmN5s3qRsmBziDdBWkBNZ2d5maC42fX9/6XB7gIXcAUSahISWFIyR2J0qWyItnaQs7PM5d/5/0dzxDoxaGUcHDIeWQUfih8+mP///////8Pp/9fNy8yXfaBaSzs4dRg9oLzK7v///975/7bV//X//0kLlPkAAAABdFJOUwBA5thmAAABO0lEQVR42mNgAIKduwR372FABhs3bd6yddv2HchiK1etXrNm7br1G5DEFixctHjJ0mXLVyCJTZs+Y+as2XPmzpuPEOvo7Oru6e3rnzBx0uQpUyFiCfUNjU0VzVUFLdGtbe3WYLGyBPfyirSoysqoquqa2jqwWG4eb35BYVRRcUl0aUB2lCBIa2KSe3JKalp6RmZgVmh2eg5QLMzGzoo3PCIyKjomNs493j0AKObnH+BuFRgUHBwiaRUa6u8bChRzdWNx9/A08fJ2svJ0kvSR9AWK2dhK2tlbOTgqO1mZaju7WNkBxRSNTbRNzcwtLMVMTUXVtKxADtTQ1NLW0dXT1TeQUNYx1DECu09WTlReQVFJWUVEVU1dFOI3QSFhEVExcXEJSSlpGbAIIxMzCysbOwcnFzcPLx+/AFAIAM5IVz12MsfVAAAAAElFTkSuQmCC";
        var hockey_pic = "data:image/gif;base64,R0lGODlhJgAmAOZ/AIaDgkhGRjk5SXVzcoeHluPi5KWnt2JldAQDAikqMunp8j89Vf7+/vn5+iUkIiIiHiMkLPb19h0aGRUSEiwpKtXS1BwbEWNhYfLx8yAeHD06PPz+/FRSarm6yk1KY/X1/ZSWowsJCTQxM5yam/f6/pSRklNRUvn5/oGEkOXm7kE9PjAsLfv9/m1rgSIiPvz8/9zc6BgWFkVFXOPi6zQzQSoqJJuary4uOP78/AcFBK2qqykmLEA+Refn8ejl5SkmJlFOaXt5gRoZIQgIBjk2NxoXGBIQECEgJxALCxgZEwkHB319idbU6dfY6cbH2GFgcfXz9Le1yaimpg0NDQUEBSAfFkRBQT9CVfz8/O3q6f39/zEwK7GtrnFubR0iJjg4ME5RY4B+k15bdrCyv3d5kNDQ4HJxcdXY4/z5+u3u+cPC0cO/v8rK2L6/0JKSmpKOp87R2GBgamhlZWhnaW9sbLK0w3Z2gHRxjMTBwOPm6ufn6/Py/QICAgAAAP///////yH5BAEAAH8ALAAAAAAmACYAAAf/gH+Cg4SFhoeIiYqLjI2Oj5CRkpOUlZaXf36amgwMm5+bkpo4WWslXXIXdGYDrUEAUng+OAyQfj5SJkZ9CDm+SsC/wUYBIwW1i34FZhkhfbw5CH18CNXWCEjWfEUAPooNJRJK03x80zlDCObTvdF86M9DD1LIhVAmOX1U5egh6e/V0A2Jpu4Zn4F9lJSAUijChRxUpjybNpHaxHbRzqV7Jm2CDjSD/OiIoc9cvngDEaQsR02aP5TnTFTwIwiLHAQT+uRY50tay2vWTlaLR2WCCC4M/0TgEYJKnxA+qexjx7KqOT77yqnLMSEBAQU0MWiYQqWgVKlas1q1eE4JRCRF/3YEmSFIrBE+ztYZZFltLbUhTXmFkGDkyJIegqBYkRBiykGIUiGak9o3LUJ9MRxM4CNkiQJBDUw8iDFhyJCyHM+q86uOSpEVKxzsPBIkRc05RXLHiIEkREZq7qpGNlLkh4YAK3zxgYDi8x8GIyTEyJChBmwKDngD82ca8JQpEhysEKFChYNqVGiASEPzTwUR02NQIKLCioYVEiYY2c9/wu7wFIiggQY/GIHAEXGM8UF7DbghxBQP1FBfAFaI8IMDElig4YZVVOHADz+sUN8KE7ggAwh51POHHnYkEB59FG7hwANVSGCjBLlJkIGHAfLAAw00yEAAHCwUogwKPOwgYK4AAXxRQxUWUEedjhk8YIF4QNKwAAcgwMBCe4QwoIABTwhww5kr1OBAFUm06WYSEngBQQI3CAAGGQbQlYgfH7DxRgsemJnADkdAAMERiM55Aw1XgHEACgacQYImi2ixBxNR2BBGC09wAAQQHnjAgRgt3EGADXWwkcKklDJC0wsf9ABDGWp0YGsHbThRRhM97HGCFqFEQpMmL2ywAQPGJtsemJg06+yz0EYr7bSPBAIAOw%3D%3D"
        var football_pic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAB3RJTUUH2gkSCh80aQgXcQAAAAlwSFlzAAAewgAAHsIBbtB1PgAAAARnQU1BAACxjwv8YQUAAAOMSURBVHjafZRdaBxVFMf/92tmZzcbtttu0piPmjalNIrV9qGJVaH1ozVREYKEvilY1FdFEVQQfPKxIvhiffUDUxAsIn60RCGUBiRNo6RWXVYbuqnJht0ku3Nn5l7PHU2oWp3hMpeZc3/3f/7n3GH4n2tgAP5Of+vdOeUfy0g5JBjr50BgGGvqKPrheq1x6my5/pGLlTcDHABUz51dTxSC7EttvjeoOFfuvTUWxhg3g+aiN9/h3xfDXPumvDr5L9DIYGl7R7H97XY/eJxZCPeOMRq0mEkOZjmarRC+ksgwltmWzx8HVif5jZDRfcXuHV2lT/N+MBbFRlgCKCUgFMet+4cRZDPQSYy2XAaeJx2d5tlht3YTdGyg2N5X6vwACTugI5MGBhlFT4HOHbvgEXD8lZPovKULQgooGoI7hUnP30B9faXXWSIOJeRBJkOyfZUG5wpbsLWnHw8+9QIq87PY//A4uOAQNDhnSKz1NkFjB7sPKqZO6ChhvkcqKH9JfghS1XvHEPYdfhS/V67QBj7Onz6FDKljnKXmWcZam6CcDF5uhUmbooUuBQdKTILdw0fRvXMP2rcUsV6rEuRdZCmGuduCXLBIElxNQQ/s3bZbcvWQM06RCqckjDQG7x0hj3zsHTqCysUpzHwxAY/b1GBLN3UCtDWIEzudggLfeyyOTSCFSHOOaYtddx1CtLaCe8aextzXEyjPXoBu1CgTTgoIQqNJ1XPTWiP8PAV5XB7hjEIIYmibjv490Ot1jDz7Kma/+hjLi1UsluehhIMkNAxacZyCwlZydebKtT9BVMLb3cQFZQtFUiXxyHOvYW7yM4RhhMsXzkFSOlGcIKK2CKMYda0pNWbqoX1rCWikIAZestamgYXOXhw+/gx+u3wJXpDD+TPvp60d0zetY6yHGsutFqVvsNYIp76d/vGdjfaRcRJxKyWIhV9mpzFJhg6NjuP0yTfSCmnqKwdaI0gzjtK4uBn9VFm4/mQVWNsAsdHBUtWXqsNTisxkKOSzkJ4HbpO0Os78mGAO4Hol1nbu54WlsbPlpfkbj5cUSn1nEnN0tdlCQN28XG9QC1D7/1VFKkR6aAUd+FDbDyuL9RcJUv3nYZe00XuMifsFN27uRKY9wkgFd8sZWpE2Uytavzkx8+uXFGBu9uthzvCR27Y/n/W8Exnl9ToBZH5NSjVHqZ1bWWmc+eT7hYv/Bdi4/gA8iH2WqSinuAAAAABJRU5ErkJggg%3D%3D"
        var goldstar_pic = "data:image/gif;base64,R0lGODlhFAAUAOZWAPCbIvCdJ55lEvbFf/CeKLt3FZReEfW9bfCgLPGmOfKpQeWRGvOvT3pNDtqLGYJTD/GkNvKsRvS1XPGnPO2XG/KuSvKoP/KuTPOyVX5QDsR9Fu+aH/bEfXRKDYhWD/W8avbLjvCfK/GjNPGiMch/GNWHGIRUD/ChL/W+cPGmOt2NGbx4Fp14Q+iTGo9vQ6BpGvS6Z/bJifbGgbZ0FZBcEJ5mFeSaMcF7FvChMO+aIN2PIJdiFsF9G7BzHKhrE61uFPXEfrBwFPS+b/KxU4NVEppiEdKGGIRcJMqBF++2Y45kKO+YHMeAGvGiMvXCd/S4YqJnEvfSnfTBd/O4YopYEO+YG0pKSgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFYALAAAAAAUABQAAAfMgFaCg4SFhodWUkCIjFYHB42HIAMfU5GFMhxCEZeDkwcSEQqdUQMoEhcKExeIMQMDHE6nFRYJKRaqIxNJggwYBx8wTxgRKSIjOCcEVTpIPIMJFQwMFQoQygEAFCpMPQKFIU0JECII2RstJSs1Hoc5BAgh5xQONwIPLojwBABLFAtGZhg4wggCAgALVDgooeGHgUYJAiwgUWBFgSBQaDSSqMHHDgECihigwmiIgwIvPHRo8MCEiQcsENkoYKABoZUZlCAi8e1QBiKdIgUCADs%3D"
	    var school_pic = "data:image/gif;base64,R0lGODlhEwASAIcAALCytvLz9fv7/FFnc+rq69LT1fHOjePj5Nvb3Mmzjc3O0M/CqOe7cDVMV8rKydKvbMHCxuSvWkddaYiSmePVuNKeR/X298SQO9OnW93d39TV12R4g9jTyejm5pSco8XGyO/y9naFjby9wN/h4+zt7s7P0ltve+Xl5+zEgL7Aw+fo6urp6d3Z0Nja2eHh4KKqr8OeYc/P0efo6PDw8eDf4O7v7+nn59/f3vDw8NfV1NfX2MGYVtHR0be6u//+/////xNSmJDpIKEAAP///5EB28LDyaEAAAAAAAAAAAAAAxNR3AAAABNS0JDpIJEAYP///5EAXcLC3hu50AAAAMLC4wCEaAAAAhksDMLELgAADOYeHxmAYBxuCBmAYBNhqBYBeMEgcBxuEBmAYBu5yAAADhYBeAAAABNhtBYBeOHnyxxr6AAAAPvNWAAEdOHqZwCHgJEENZEEPhNWjAIAJBNUeAAAApFDiP1AAJAQABNTIAAAABNT8JDpIJEEYJgGAJFASZFAPAACCBNXMBNXCAAAfuWeTfDzPAAAExu50BNUggAADgAAPwAAAoAAfv38AAAAABZ08P38AAAAAAgAfgAARRNTzAAAfgAAAAAAAxNVAgAAABxr4BNUhAAAAAAAAAAAAP38fpEENZEEPgCD5hNTXBNXCBNWnJDpIBNXMAAACBNWrJFCIhxr8BNUhJEEYJgGAJFC55FCrwAAAP38AAAAAQAAAgAAQwAAAAAAAAAAAAoACJFAfAACGgAAAAAAAAAAAAAAAAAAfgAAAAAAAAAAAIAAfv38ABNUhAAAAhxr6JDcaoEM0AADXBNUwBNUyAAACAAADhNcGP/P2AAAChNU3KEAAJECIgAAA6EHGKEAAAAAAAAAAAABAAAAABNcGOYcpwADXAAAAAAAAAAAAeNC1QADXAAAAAAAAeNDThNcGAAAAAAAAZpzBhNcGBNcGP/P2AABAAAAChHP0BqxoWFnAM7BVABThfmhAAAAAAAAAAAAAAABAAAAAAAAAAAA+H7kwCH5BAMAAD8ALAAAAAATABIAAAj/AH8IHOjjhwULNQT8KFhwIMGCAQIIBKGwocOBOCwIWHABBgEBCR0ylDGDRIIKEVJigMHCggyJPgQgGKEjwQMUOHPifOBgRAsSGlIsoEC0qNGiC1L0+EHgA4SnKVI8hSCC6tQUAwuMOKDDRAgeBzJkaKABwYECFhb6wKFAgwIJEjS04DFBwoQYCBBYxJFBhocBA1KQsCHBhAQXJFo4nIFAhQcTgQcP2CCBRuLFCPwCFkzYsGXFAn0wPuEBrggSHSQMqHx54Im+Hxo0UNDhQIjCCAi0aDgjB42wAACYddHiBY8Mrz/+UKCgRIkYJRTEgA7duXUSAZg3Z+68eXTtzAvUEihQwoFTET3Spxch1YGCAhoCAgA7";
	    var ncaa_pic = "data:image/gif;base64,R0lGODlhEwASAIcAAAlbpQpbpQlcpQpcpQtcpQtdpQpdpgtcpgxdpQ1dpg1epg5epQ5epxBgpxFgpxFhpxJgphJhpxNhpxFgqBFhqBJhqBNhqBNiqBViqRdlqhpmqxpnqxxnqhtoqxxoqx1oqx5pqx9pqx5prCJrriZurydusCtyryxysDN3sjN3tDV3szR4tUGAt0aDuUiEukiEu0mEu02IvE2IvU6IvE+JvFCJvFCKvluRwV2TwWGVw2WXxWSYxGWYxG+eyHGgyXOgynOhynqmzX+qzYGqz4ivz4au0Yev0oiv0Yyz1JG11ZO315a515q715u82KLA26LB26PC3KnF3ajF36zH3rTM4bjQ5L3S5L3S5b3T5b/T5b7T5sPW58PX58fZ6Mja6crb6cvc6szc6tDf69Lg7NPh7dXj7tfk7dvn8Nvn8dzn8d3o8N3o8d3p8d7o8d/p8ODp8OHq8uHr8+Xt8+Tt9OXt9Ojv9Ojv9e/09/D19/D0+PD1+PT3+fT3+vb5+fb5+/n7/Pv8/Pv8/fv9/P3+/f3+/v7+/v7//v7////+/v/+/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAIYAIf4lRmlsZSB3cml0dGVuIGJ5IEFkb2JlIFBob3Rvc2hvcKggNC4wAAAsAAAAABMAEgAACP8AFQlUVMhLDxURDoSQsSRPoYEDC8WxESDAgIsXA2xoQsgQxDAiBGAcmZEHIIGF2HggyXIAACAPC7kA0JIlgSuFsFisSTIAi0I6eLYMcOaEUJYCnCwYUAACAgUSDCTA8KDBhQkCLFhQYITBgBuEhBThQ0SPHyhgCnEpAaiQjyMmBsAoNCfIHkEtaLigk4XMjDpihjzZMQCJlT943qwRECCKGil23FApkwQNFgFjcEwZlKOPly1ylFQppEVJGjOFCr1IQaFDCgEfVqwYESBDigoASIw5pKgNh6MDBPwohIjglw87h+oIlOghQTg1kmMMoIHJIIgRu/RA4QABiBhL7jgDFxgQADs%3D";
	    var soccer_pic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAASCAYAAAC5DOVpAAAAB3RJTUUH2gkVARQcLsuxGAAAAAlwSFlzAAAMtAAADLQBJS2/awAAAARnQU1BAACxjwv8YQUAAAQrSURBVHjabVRZTFxlFD53hbkMDHvLDNJh30lLrdEUQ7Wx1oTGqQk8SRopbdrYNFEMtPGhvhifqpFGmuiDxKWNNVFMgAZMLciIJNUoUqhWNqHAsAwww3D3xfP/aRNM/ZOT/HfunO985zvfuQz8z1mfmvJEHedJh+FecBz72fl/HlR/2vlZ/MzsTGRXRuqtysqCT4rLq39oaGjQd+bxOx8uX77hykhVm8KG0SwIQiXPc3gE6O7tgeDPI2DbjmdhceWVqZn5ute9/p6B/v62Q0eO/P0on310uXT6ktR38/rH77df/VCWlb2CKHK8IADH89B8qglKSwuBYQAYsCEc3hRlzQq4k5L7B74f2PcYs18X/3p7enby1WN1L0JGZgYmMsCyJFhIT0+Hi20tEAwOgyiKoMgqVJSXMC5J8iuq3NnV1VUTCAS2KNiZM+crfgoOn8M8OB6ow3ZsYDkOHAfAdmwAy4b8/HwoLCqm7yzLAlWWQVU14DmhgrWsRoTp4AiYW0p6Jz0t7eBbb55jCouwHUQlzBALHNuhAHgDG0Gth2A2VjJ0A3TDYLaikaya2tpr/IULZ1PSPHueP1hTw3g8HvyjCazF0hYNTYfFpSUwTR3ycguAUCUg9g5A27ZQSLZMEpwivqxgvy87JyeHQzYkCVgRZu7/CbduD8LEvXuwFAqB250AHVeugCveRfUlYKZpwnp4DdrbOyAlOTm+qqKkile0bS9WiTd0HXViwcGJjY9PwHfdPWAaBp1gZDMCX3x5DU40NlI2pHUTO/hxaAhGx8ZhezsGsdhqIrGGpuu6o+kauYCOOqyF1xHIJDIB0Z9cunt7YXklhO91Gutra3B7YAhIHqnIMqzN787OmlNkeRMzUomLSPZWbItWp2gPj8/rxRwWNJwg1YxMnOWIkXGirBPnck2zguBevH7j27FQaAUUVcFQIc+fC2WlJSAIImruoGZuaD55kggNqqaiJVRazO/PoQPwZWWueNN332VI1cPPHT29Gg5fPXvqBOv1+UAQBeTkQGh5Ge7c+QXKy0uhpKSMMiIgZJIaAt4dG4OFhUUna1fa5w4vvkZ9Fjh+bGJ6cuYlRZG9uf49KK5FDetOSITioiK6AZqmUR2JXoqiQHQzSm3Ec8zGE77MppbWi6sUbGRkxHz6mQOjc3MLgcL8PMk0LbBIIKhpYOCdgBC95G0ZopEobGysQySyaSQlJraeb2m9SXCYnV+Nl+uOHj5Q/VQnLni2IMbhHsYBL/CokQKraxt0T5E9CBzhYG8jw3d7+vo+mpycVPEH8z9g5LS1vVHpikt4j3HgEJouYXb+Afz2+x9olw3aFrrA2L+valSSxA+++vqbYQKCQb5rymNg9fX1nCRJiRkpKeU22LWDg8N7F5ZC8RzH2miF+5alBWOx2Hg0GiVscJfAIF4l8S+Yfyk/5jhwlQAAAABJRU5ErkJggg%3D%3D";
	    var dollar_pic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAATCAYAAAB2pebxAAAAB3RJTUUH2gkVDCsb4Kmd1AAAAAlwSFlzAAAewgAAHsIBbtB1PgAAAARnQU1BAACxjwv8YQUAAARqSURBVHjaNVRrbBRVFD73zp3Z2elu31v6ouyWPi19WNBqW9AFlUhKotEo8YcSNEYTY8IPxURjqkYDGjUmhkSjiT/4hQSJRIj0R41UbLd0kbYpdluh0Jbusn1sd3Z3dud1PbPGmZyZ3HvP+c53z4tc5Vz0A7gVgBIAqEHBpRXIQNo/vHax8eydUzWvNBydfcC7JyIAu8kBbokAizpALAmgVgNk2TYAuQCgHI0DWdC6/0wO94XnxxrXVle3XFsLFf41HWZ6l13TVj3UURuoW+yv3DdZR7eHKAhTRQBLaGeTNOfVBKABFz3HF985dO70j633slFXNqsRToAQAYCbAIwxXqQUW9u3NiU+OPDZcFfhw2fxaEpCIJLjvN0AeOi7+KcvHf/yox6NpRlQhOTAqU2dD+EWrll+D8AAXlu9NXnqtfMnm1nHBTyao/gpSsFG/aVLF+uzLC04ngE3m9qbrGDbE7pLcnF/Q8CkQDggI5CAxNZXCr5Xv2jEGzAUylDftQrR4pSqynn65D+Qgz3P5JrSHUY4Nia++fix9IX4GYxdIfjFBr2Uli+0KO1TNgYVxWTI0CiB0pTscuvoy3kJYPh/OPete1sgIBqWCVJG4Z+0f7NZIpTaEshRAYQQZmoeSacxq5bw7uBgsRvc3pi85L86HaoywaQE759Ja2Rl8a5g2gYZj4+I86kZMZlKUOohlk+qjDJgi0g6jkBJ4a3BQYUClVp87UJaStTNLt/w6qpOAE8JMnKe9GaGRv6ZZX/c/E0amxvxRguWPb2+YIwAjRsOyPt5EJAVUMRd1b10T+dexdvkkbJahmTUDDG4kQ+TA2pxi6ylVoXpmclirS6hPFgSXEJvq8Lbg4M+VHGkykXlslrZ7wmWHZAOdR7J0S02jM+OSjsDPYYKCZLTdELQo8F1molqcl/3I7ESUnGbiWCUrsDSjtsw33/XWmxeVe/5skZOeaH0Va3ebrVkWeZvBI+lrydD0uenPy7I1wo+KlflBSNS2uxqk5kBVvnXQycePR/+aT9SlwxTJza1SP2LzcTklsXRSCDMLlC8Tt7gfxAR9xRBMZyCYAxku7W1feOXqZ+tzY244NDlmPyjF172NFQ1moaeIycjJ7zhyZDolL9TjNSivL6uca2L9d1C1U2KNupA7fORgf6nFpgp2nlF3Ezf0cj10UlRy2TJyNDvUuZeNh9fWwPA+tGOBF+fKADPLKqvO4HFMaCQ+6o69cIaT/lc7O+i3HqOArrI9xDWO1iEU1MAF3Xx7t071feCxy/vKXryVzydQVkhnPMinAsV2I1+tNsRh+Vdl7WhjtnotG80fKU4PDku7d29P3N/W3eip2L37W6hf0wC9zXUn8EyWkaQhNObmUIcMMgS5wxsVkDN0tPuwzPmNqPlq9iHveErE/6Bymcjz1UdHsOY3kCJOEMph9WKfxVtdIYdZyAb243pR0Yp9LCGt4gKlC6UV1du7jv4WIvXVxjCdpjAfrmDgVlBy2QZNp8zGNCe/wu8zOoA+gUP+QAAAABJRU5ErkJggg%3D%3D";
        var bball_pic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAB3RJTUUH2gkXEQkUaVM+zQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAG2UExURf///3JMMVxCKUYeE0YaCYllQTIOBjcWB1siEGYmEFAXCCYUB2E/KFgjC0okCVsdClIbCZJrR3YqE2clC2EdDL+bb7BKJZs6GIQqDuK8pqg9FLlRJZM6EqdIHZs9EpA4D3UrDIc3FbmKXeJdLcdYJLZKF61LG6tDFXgzDYY1DhYUA7+MbLc6FtRhG+VcGuFkJMdWGdZZGKxEHGgxC3k2FcVJGORjGwsWBblWGOhlIJpFFRELAuNzNOFqKuNxI+lzNNxhHNdbJdxqHOh5IuR2PqtlMtV3LgcGAiQMBItBD+dWGel7Nep0OeN7K4dIKN2FOuZ6POhoJOZrNqZTFqtLFKNCEopEF+R7M+x8Stt7QuhyI9x8KItRJup6O8lsKms7GNdjF1hAFoUmEfXRvNt6NuqCO9yEUOuVWbd3Rt+ASep7Q91yHDEVGHVGFtCwlthpJrduO+yjauaPYeqRSMt8QXVBDORrI8tjIeZ7ROGGQqp3R+qDRYBQHOdyGdhdNPPHpumBNOKENINBIJRUKuhzKeF8JFUuHLtiI5I8GdiuluOKVeuLVMpxM+uMZdxzLN59Se3YxePOvK/2bbQAAAABdFJOUwBA5thmAAABW0lEQVR42mNggIEJyRMZUEGXXUt3T2+fXj9CqN6mtS29utQ7Nra9oxMm1lBd3djU7NbiyhseVV4EEfSuqEypKqyu0apNCKrTlQaL5cfGFxQWFZfElToE2ZaVS0sAxZI5U1LT0tMzMrOyTdw9rXJyxfIYGNTDIyKjomNi4+zjrRIMQkwtEpMYGLy8fXx9/PwDAoOCHdlVQkLDZNkYGAxtnF1c3ZwMdd0dDBw9POUVFYVBgrZ2VvYOjk7cBqpSmkYyMgpAQVNdM3NDCxUVSxZTKzl1a3kNExEGBh1dRT19VQNVQ14jTU0FIWMhE04GBiVlPikVVTV1VQ1NTQlhCS0NBW2gQ6WkZWTl5OTlFBQUhBR42RW5QD4SFRMXlwACIWFeEWFeTk5JsD/ZhYSFhTn5hTj5ePlF+BmhwcTDzMvFyc7HzyfAxSKICFE2dhYWDk4uFm7UsGdkYmZhhbIB2INDZkuhtFsAAAAASUVORK5CYII%3D";

	    var itds = document.getElementsByTagName("td"); 
	    var ispans = document.getElementsByTagName("a"); 
	    var iimg;
	    
	    for (var i = 0; i < ispans.length; i++) 
	    {
		    if (ispans[i].className == "topictitle")
		    {
			    if (ispans[i].innerHTML.match(/gdt/i) || 
				    ispans[i].innerHTML.match(/ gt /i) || 
				    ispans[i].innerHTML.match(/game threa/i) || 
				    ispans[i].innerHTML.match(/gamethrea/i) || 
				    ispans[i].innerHTML.match(/gameday/i) )
			    {
				    iimg = document.createElement("img");
				    iimg.src = goldstar_pic;
				    iimg.width = 16;
				    iimg.height = 16;
				    iimg.title = "Game Day Thread";
				    ispans[i].parentNode.insertBefore(iimg,ispans[i]);
			    }
			    else if (ispans[i].innerHTML.match(/money league/i) || 
				    ispans[i].innerHTML.match(/fantasy/i) || 
				    ispans[i].innerHTML.match(/aces up/i) || 
				    ispans[i].innerHTML.match(/survivor/i) )
			    {
				    iimg = document.createElement("img");
				    iimg.src = dollar_pic; 
				    iimg.width = 13;
				    iimg.height = 13;
				    iimg.title = "Fantasy/Gambling";
				    ispans[i].parentNode.insertBefore(iimg,ispans[i]);
			    }		
			    else if (ispans[i].innerHTML.match(/college/i) || 
				    ispans[i].innerHTML.match(/tu football/i) || 
				    ispans[i].innerHTML.match(/penn state/i) || 
				    ispans[i].innerHTML.match(/ncaa/i) )
			    {
				    iimg = document.createElement("img");
				    iimg.src = ncaa_pic; 
				    iimg.width = 12;
				    iimg.height = 12;
				    iimg.title = "College Sports";
				    ispans[i].parentNode.insertBefore(iimg,ispans[i]);
			    }		
			    else if (ispans[i].innerHTML.match(/high school/i) )
			    {
				    iimg = document.createElement("img");
				    iimg.src = school_pic;
				    iimg.width = 14;
				    iimg.height = 14;
				    iimg.title = "High School Sports";
				    ispans[i].parentNode.insertBefore(iimg,ispans[i]);
			    }
			    else if (ispans[i].innerHTML.match(/soccer/i) ||
				    ispans[i].innerHTML.match(/fifa/i) ||
				    ispans[i].innerHTML.match(/phil*.*union/i) ||
				    ispans[i].innerHTML.match(/world cup/i) )
			    {	
				    iimg = document.createElement("img");
				    iimg.src = soccer_pic;
				    iimg.width = 12;
				    iimg.height = 12;
				    iimg.title = "Soccer";
				    ispans[i].parentNode.insertBefore(iimg,ispans[i]);
			    }
			    else if (ispans[i].innerHTML.match(/eagles/i) || 
				    ispans[i].innerHTML.match(/football/i) || 
				    ispans[i].innerHTML.match(/philadelphia soul/i) || 
				    ispans[i].innerHTML.match(/super bowl/i) || 
				    ispans[i].innerHTML.match(/nfl/i) )
			    {
				    iimg = document.createElement("img");
				    iimg.src = football_pic;
				    iimg.width = 11;
				    iimg.height = 11;
				    iimg.title = "Football";
				    ispans[i].parentNode.insertBefore(iimg,ispans[i]);   	
			    }
			    else if (ispans[i].innerHTML.match(/sixers/i) ||
				    ispans[i].innerHTML.match(/basketball/i) ||
				    ispans[i].innerHTML.match(/nba/i) ||
				    ispans[i].innerHTML.match(/76er/i))
			    {	
				    iimg = document.createElement("img");
				    iimg.src = bball_pic;
				    iimg.width = 12;
				    iimg.height = 12;
				    iimg.title = "Basketball";
				    ispans[i].parentNode.insertBefore(iimg,ispans[i]);
		    }
			    else if (ispans[i].innerHTML.match(/flyers/i) ||
				    ispans[i].innerHTML.match(/nhl/i) ||
				    ispans[i].innerHTML.match(/stanley cup/i) ||
				    ispans[i].innerHTML.match(/hockey/i))
			    {
				    iimg = document.createElement("img");
				    iimg.src = hockey_pic;
				    iimg.width = 14;
				    iimg.height = 14;
				    iimg.title = "Hockey";
				    ispans[i].parentNode.insertBefore(iimg,ispans[i]);
			    }
			    else if (ispans[i].innerHTML.match(/mets/i))
			    {
				    iimg = document.createElement("img");
				    iimg.src = mets_pic;
				    iimg.width = 15;
				    iimg.height = 15;
				    iimg.title = "A Mets Thread :(";
				    ispans[i].parentNode.insertBefore(iimg,ispans[i]);
			    }

			    else if (ispans[i].innerHTML.match(/soccer/i) || 
				    ispans[i].innerHTML.match(/\(ot\)/i) || 
				    ispans[i].innerHTML.match(/off*.*topic/i) || 
				    ispans[i].innerHTML.match(/ ot /i) || 
				    ispans[i].innerHTML.match(/ ot-/i) || 
				    ispans[i].parentNode.innerHTML.match(/moved/i) )
			    {
				    iimg = document.createElement("img");
				    iimg.src = qmark_pic;
				    iimg.width = 12;
				    iimg.height = 12;
				    iimg.title = "Non-baseball";
				    ispans[i].parentNode.insertBefore(iimg,ispans[i]);
			    }
			    else if (ispans[i].parentNode.innerHTML.match(/sticky/i) || 
				    ispans[i].parentNode.innerHTML.match(/announcement/i) )
			    {}
			    else if (document.title.match(/Back She Goes!/))
			    {
				    //iimg = document.createElement("img");
				    //iimg.src = "http://img695.imageshack.us/img695/3227/mlbp.png";
				    //iimg.width = 12;
				    //iimg.height = 12;
				    //iimg.title = "Baseball";
				    //ispans[i].parentNode.insertBefore(iimg,ispans[i]); 
			    }
		    }
	    }
	}



//##################### ADD GRAEMLINS UNDER SMILIES LIST ##################



if (document.URL.match(/\?newtopic/) || document.URL.match(/mode=post/) || document.URL.match(/mode=edit/) || document.URL.match(/mode=quote/) || document.URL.match(/\?mode=reply/)) 
{


//BBCode</a> is <em>ON</em><br />
//(/BBCode\<\/a\> is \<em\>ON\<\/em\>/g,

//list graemlins
document.body.innerHTML= document.body.innerHTML.replace
(/\<div id=\"tabs\"\>/g,
"<\span class=\"author\"><b>Graemlins</b>: <a href=\"#\" onclick=\"insert_text('[img]http://i7.photobucket.com/albums/y293/karnoval/50graem.gif[/img]', true); return false;\">50 pager</a>, <a href=\"#\" onclick=\"insert_text('[img]http://img204.imageshack.us/img204/8021/rubezzz.gif[/img]', true); return false;\">amaro zzzs</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i49.photobucket.com/albums/f296/jayboal/th_BABIPgraemlin-1.png[/img]', true); return false;\">babip</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i7.photobucket.com/albums/y293/karnoval/krgraem-1.gif[/img]', true); return false;\">baller</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i33.tinypic.com/2yl7bcz.gif[/img]', true); return false;\">bandbox</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i38.tinypic.com/rtht87.gif[/img]', true); return false;\">base hit</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i50.photobucket.com/albums/f304/TonyRona/Misc/BlantonP.gif[/img]', true); return false;\">blanton</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i10.photobucket.com/albums/a103/Woody977/wheels_boring.gif[/img]', true); return false;\">boring</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i10.photobucket.com/albums/a103/Woody977/broxtowned.png[/img]', true); return false;\">broxton</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i527.photobucket.com/albums/cc357/xenocide72/tmac1.gif[/img]', true); return false;\">cantu</a>, <a href=\"#\" onclick=\"insert_text('[img]http://assets.sbnation.com/assets/149731/morganlgraemlin.gif[/img]', true); return false;\">computer #s</a>, <a href=\"#\" onclick=\"insert_text('[img]http://img141.imageshack.us/img141/8586/peeweegraemnw6.gif[/img]', true); return false;\">connect dots</a>, <a href=\"#\" onclick=\"insert_text('[img]http://a.imageshack.us/img197/755/hueylewis.jpg[/img]', true); return false;\">density</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i527.photobucket.com/albums/cc357/xenocide72/foreman1.gif[/img]', true); return false;\">dip balls</a>, <a href=\"#\" onclick=\"insert_text('[img]http://img697.imageshack.us/img697/7387/dobbs.png[/img]', true); return false;\">dobbs</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i6.photobucket.com/albums/y246/Motion_Blur/DOM-O-NIC.gif[/img]', true); return false;\">domonic</a>, <a href=\"#\" onclick=\"insert_text('[img]http://images.thegoodphight.com/images/admin/vaderdonotwant.gif[/img]', true); return false;\">do not want</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i6.photobucket.com/albums/y246/Motion_Blur/durbinated.gif[/img]', true); return false;\">durbinated</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i6.photobucket.com/albums/y246/Motion_Blur/EatShift.gif[/img]', true); return false;\">eat shift</a>,  <a href=\"#\" onclick=\"insert_text('[img]http://i6.photobucket.com/albums/y246/Motion_Blur/EpicPoem.gif[/img]', true); return false;\">epic</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i39.tinypic.com/2e0l1ft.gif[/img]', true); return false;\">frod</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i10.photobucket.com/albums/a103/Woody977/dd-naked.png[/img]', true); return false;\">get naked</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i6.photobucket.com/albums/y246/Motion_Blur/GETUM.png[/img]', true); return false;\">get um</a>, <a href=\"#\" onclick=\"insert_text('[img]http://assets.sbnation.com/assets/100535/cbrowngraem.gif[/img]', true); return false;\">good grief</a>, <a href=\"#\" onclick=\"insert_text('[img]http://img291.imageshack.us/img291/8052/goofyz.gif[/img]', true); return false;\">goofy</a>, <a href=\"#\" onclick=\"insert_text('[img]http://img571.imageshack.us/img571/5935/era.gif[/img]', true); return false;\">gotta look @ era</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i7.photobucket.com/albums/y293/karnoval/iraqigraem.gif[/img]', true); return false;\">great news</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i36.tinypic.com/2hhdipv.gif[/img]', true); return false;\">haaffeee!</a>, <a href=\"#\" onclick=\"insert_text('[img]http://img51.imageshack.us/img51/6030/win.gif[/img]', true); return false;\">hope we win</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i10.photobucket.com/albums/a103/Woody977/cadillac.png[/img]', true); return false;\">hop on in</a>, <a href=\"#\" onclick=\"insert_text('[img]http://img210.imageshack.us/img210/6980/howaboutthat.gif[/img]', true); return false;\">how about that</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i6.photobucket.com/albums/y246/Motion_Blur/ChoocHappy.gif[/img]', true); return false;\">i so happy</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i43.tinypic.com/2l8u8gw.gif[/img]', true); return false;\">ibanez territory</a>, <a href=\"#\" onclick=\"insert_text('[img]http://img381.imageshack.us/img381/8466/opieantgraemhe3.gif[/img]', true); return false;\">inappropriate</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i7.photobucket.com/albums/y293/karnoval/troutgraem.gif[/img]', true); return false;\">joboggi</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i128.photobucket.com/albums/p191/Finkelnuts/KeepCryingSmall-1.gif[/img]', true); return false;\">keep crying</a>, <a href=\"#\" onclick=\"insert_text('[img]http://img34.imageshack.us/img34/6861/keyboardcatb.gif[/img]', true); return false;\">keyboard cat</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i39.tinypic.com/2e0l1ft.gif[/img]', true); return false;\">krod</a>,  <a href=\"#\" onclick=\"insert_text('[img]http://img2.imageshack.us/img2/2550/fatmac.gif[/img]', true); return false;\">long gone</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i7.photobucket.com/albums/y293/karnoval/kfedgraem.gif[/img]', true); return false;\">major popo</a>, <a href=\"#\" onclick=\"insert_text('[img]http://img801.imageshack.us/img801/2030/martinot.jpg[/img]', true); return false;\">martino</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i50.photobucket.com/albums/f304/TonyRona/Misc/Mayberry.gif[/img]', true); return false;\">mayberry</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i50.photobucket.com/albums/f304/TonyRona/Misc/DrMet.gif[/img]', true); return false;\">mets doctor</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i41.tinypic.com/xpvxap.gif[/img]', true); return false;\">mri</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i50.photobucket.com/albums/f304/TonyRona/Misc/MetsNoes.gif[/img]', true); return false;\">oh noes</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i10.photobucket.com/albums/a103/Woody977/harrydoyle.png[/img]', true); return false;\">one gd hit?</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i50.photobucket.com/albums/f304/TonyRona/Misc/RoyDozer.gif[/img]', true); return false;\">osdozer</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i50.photobucket.com/albums/f304/TonyRona/Misc/Orr.gif[/img]', true); return false;\">orr</a>, <a href=\"#\" onclick=\"insert_text('[img]http://assets.sbnation.com/assets/100457/harryk.gif[/img]', true); return false;\">outta here</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i29.tinypic.com/2dc7keu.gif[/img]', true); return false;\">panda</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i7.photobucket.com/albums/y293/karnoval/dallasgraem.gif[/img]', true); return false;\">pansy ass</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i6.photobucket.com/albums/y246/Motion_Blur/RoyPerfect.gif[/img]', true); return false;\">perfect</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i37.tinypic.com/ddj2ae.gif[/img]', true); return false;\">playoffs?</a>, <a href=\"#\" onclick=\"insert_text('[img]http://img262.imageshack.us/img262/8393/raul.gif[/img]', true); return false;\">raul</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i7.photobucket.com/albums/y293/karnoval/la.gif[/img]', true); return false;\">really</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i6.photobucket.com/albums/y246/Motion_Blur/data-2.gif[/img]', true); return false;\">regression</a>, <a href=\"#\" onclick=\"insert_text('[img]http://img14.imageshack.us/img14/3197/results.gif[/img]', true); return false;\">results</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i50.photobucket.com/albums/f304/TonyRona/Misc/WheelsReyes.gif[/img]', true); return false;\">reyes</a>, <a href=\"#\" onclick=\"insert_text('[img]http://img14.imageshack.us/img14/8474/romeroshort011.gif[/img]', true); return false;\">romero</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i40.tinypic.com/mbi9g1.gif[/img]', true); return false;\">roster zzzs</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i40.tinypic.com/35ir88k.gif[/img]', true); return false;\">roowies</a>, <a href=\"#\" onclick=\"insert_text('[img]http://img405.imageshack.us/img405/2577/rowgrit.gif[/img]', true); return false;\">rowand</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i43.tinypic.com/4lq9lf.gif[/img]', true); return false;\">sit on it</a>, <a href=\"#\" onclick=\"insert_text('[img]http://www.crunchgear.com/wp-content/uploads/2007/12/siren.gif[/img]', true); return false;\">siren</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i10.photobucket.com/albums/a103/Woody977/smallball.png[/img]', true); return false;\">small ball</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i50.photobucket.com/albums/f304/TonyRona/Misc/SmallSize.gif[/img]', true); return false;\">small sample</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i10.photobucket.com/albums/a103/Woody977/timallen.png[/img]', true); return false;\">still alive</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i50.photobucket.com/albums/f304/TonyRona/Misc/SpaceCadet.gif[/img]', true); return false;\">space cadet</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i6.photobucket.com/albums/y246/Motion_Blur/TomSegway-1.gif[/img]', true); return false;\">speaking of</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i10.photobucket.com/albums/a103/Woody977/fact.png[/img]', true); return false;\">that a fact?</a>, <a href=\"#\" onclick=\"insert_text('[img]http://assets.sbnation.com/assets/146008/tonyclifton.gif[/img]', true); return false;\">thats humor</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i10.photobucket.com/albums/a103/Woody977/saltine.png[/img]', true); return false;\">thats racist</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i6.photobucket.com/albums/y246/Motion_Blur/THIS.png[/img]', true); return false;\">this</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i7.photobucket.com/albums/y293/karnoval/philagraem.gif[/img]', true); return false;\">tit philaphans</a>,  <a href=\"#\" onclick=\"insert_text('[img]http://i6.photobucket.com/albums/y246/Motion_Blur/TrustURStuff.gif[/img]', true); return false;\">trust your stuff</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i7.photobucket.com/albums/y277/dmmmmkennedy/vorp.gif[/img]', true); return false;\">vorp?</a>, <a href=\"#\" onclick=\"insert_text('[img]http://allthingsordinary.se/images/original/763__tumblr_l3xtc8tb1O1qzt85go1_400.gif[/img]', true); return false;\">vuvuzuela</a>, <a href=\"#\" onclick=\"insert_text('[img]http://img18.imageshack.us/img18/5429/tmac2b.gif[/img]', true); return false;\">we lose</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i169.photobucket.com/albums/u215/dibsontop/werthless.gif[/img]', true); return false;\">werthless</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i38.tinypic.com/1zq39f4.gif[/img]', true); return false;\">wertz</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i10.photobucket.com/albums/a103/Woody977/westcoastgame2.png[/img]', true); return false;\">west coast trip</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i50.photobucket.com/albums/f304/TonyRona/Misc/Wheelie.gif[/img]', true); return false;\">wheelie</a>,  <a href=\"#\" onclick=\"insert_text('[img]http://i10.photobucket.com/albums/a103/Woody977/rooney1.png[/img]', true); return false;\">who what?</a>, <a href=\"#\" onclick=\"insert_text('[img]http://assets.sbnation.com/assets/69500/WilyCoyotegraemlin.gif[/img]', true); return false;\">wily coyote</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i50.photobucket.com/albums/f304/TonyRona/Misc/Winning.gif[/img]', true); return false;\">winning</a>, <a href=\"#\" onclick=\"insert_text('[img]http://assets.sbnation.com/assets/69518/fozziegraem.gif[/img]', true); return false;\">wocka wocka</a>, <a href=\"#\" onclick=\"insert_text('[img]http://images.thegoodphight.com/images/admin/frenchie.gif[/img]', true); return false;\">yay guys</a>, <a href=\"#\" onclick=\"insert_text('[img]http://i7.photobucket.com/albums/y293/karnoval/colegraem.gif[/img]', true); return false;\">you know</a></p></td><div id=\"tabs\">"); 
}

