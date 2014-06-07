// ==UserScript==
// @name           Gamekyo Blog+
// @namespace      http://
// @version        2.11
// @description	   Améliorer la navigation du site et de la partie blog de Gamekyo.com
// @include        http://www.gamekyo.com/*
// @include        http://gamekyo.com/*
// @updateURL      http://userscripts.org/scripts/source/81321.user.js
// @icon           http://uppix.net/d/5/f/2ad2b2d6176e66661e4ab9fabb470.png
// @author         bosam
// ==/UserScript==

/*
 * Script Greasemonkey pour les blogs de gamekyo
 * Compatible Firefox et Chrome pure avec ou sans Tampermonkey & Cie
 * 
 * Features : + L'ancre pour les liens des commentaires (effectif sur tout le site)
 *            + Possibilité d'afficher/cacher les blogs de membre/groupe
 *            + Agrandissement de la liste en largeur pour les écran < à 1024 (pour les netbooks)
 *            + Possibilité de muter/unmuter un membre dans les commentaires
 *            + Filtrer les articles de blog, soit par membre, soit par groupe
 *            + Prévisualisation des commentaires et des articles (avec smileys & tags)
 *            + Active le plein écran sur les vidéos youtube, dailymotion (flash)
 *            + Défilement doux vers le contenu des articles/blogs
 *            + Possibilité de mettre en "favoris" des articles pour y revenir plus tard 
 *              et être prévenu lorsqu'un nouveau commentaire est posté
 * Features communautaire :
 *            + Modifications poussées sur la personnalisation des blogs avec CSS étendu
 */

var location = new String(document.location);

var bBlog = location.match(/blog_article/);
var bGroup = location.match(/group_article/);
var bNews = location.match(/news/);
var number = (bBlog || bGroup || bNews) ? getNumber() : null;
var nbArticle = 0;

/* Settings */
var set_bSmoothScroll = GM_getValue_('set_bSmoothScroll', 1);
var set_timeBeforeScroll = GM_getValue_('set_timeBeforeScroll', 1000);
var set_bEnlargeColumn = GM_getValue_('set_bEnlargeColumn', 0);
var set_bEnableWatchdog = GM_getValue_('set_bEnableWatchdog', 0);
var set_timeBeforeWatchdog = GM_getValue_('set_timeBeforeWatchdog', 30000);

/* BASE-64 IMAGES */
B64_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuND6NzHYAAAHlSURBVDhPjZM7SCNRGIW1cBqbRZtUQeyXRVCC22axEQUfIBbBIoqoaLHFii4WUXHiI4jig1VH4wu1WBAXkd1gdI2FEoMKBsmIzyqdWlke/3N9u7PGgUNu7v3PN+feuX9ykjyuruX5D7aMMo7f+1zFzyqnv+UbNNfXGhE0zh+ifdGEd+noTbGGtfSItzepfiqqJoy1UwR2L/Bn5wQr4WNLcY01rKWHXgUgVS38+gvv5DA6/D5LcY01rKXnEcDYpLMgGHIgFrVbimusUbXieQFg7I4JH2IHdtzENZzFbDBl/CDOBzcSAPRxH8x9O86jNnjHXPAMu9Xvg9p+NKBn5ifW9y+sE+iGACLyVpFn0I3A7xzEwvL/XsGAJJh4Ywv6mAC2xCDyDAhgRQDbkihiw42pqXnWcLuWZ6CPCmBTDFuyhUHZQr8bnUMu+KfzEd9Jx8JQGpyFeegemfsPYEQA63KIexrOQ3KIa5JGxDHnmqo1XIdTUVHz9V+A+jSGfMZFB8xVMQaftNCXhqYqDblZKQrwKTsXX8obUNzsf3mRxpfkIglElyTP5SzIU8bXchTV3QESXWXumbH5ZkIyPzrwuaTuLoE0ROi9zcTYBNB830zLqnsF0sYkiVTaMgunuxUl3yfZiZf03gIgf6f0RsFLrQAAAABJRU5ErkJggg%3D%3D";
B64_MAGNIFIER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGMSURBVHjaYkxNTmQAg7///jJgAGYmZjQRgABiAar78weq9O9fEIOZGaHoDwOKKexsbAABxAKkfv/+DVH0798/IMnIyMiAGwAEEAvEYCAA6gGSK1etgcuFh4VAHYZkJ0AAscBdAgRA1XBFEG5IcCBEAcS4v5wcAAHEBHLoH5A3gNIB/n5/wJYASSAKDg5cs3Y9RPbnz19AEhgGAAEEsgEoAvXi3z8bNm4K8PdFdjRclgXsMIAAAmv4A9MAZsADDVkQBP6DCIAAAvsBHqx//rq6OIN8yQIR/wOXBYr8AXsVIIAgfgABRwf73Xv2Qtg/f/wAIiAXKPgHCQAVAwQQxA9QG4DS+w8chDvG1tbm8OEjEPG/MIcBBBALmistLS1YmFnQIgtoiq2NDYQNEEBMwJD6CwnFP3/BVjH+/PkTJvDX0tISou7wkSMQhwAEEBPESRAEAcC0AdQD4/01MzOD6AEJ/vsLEEAoMQ1ksLBAReApCuhgfX19uPMAAggkbWJsgJaYgSZB2GhpHigIEGAAK2MFr3e0QeQAAAAASUVORK5CYII%3D";
B64_HIDE = "data:image/gif;base64,R0lGODlhDgAOAPeDAOskALMaFP82AO4mALIZEeolAP3+/v81AP87APv6+rMZErIZEv7///39/dkxErMaE+slAO8mAOvV1O/5+fv6+9mvrPQoANGimf708vz+/u/r7OK8t8gpDO/t7M+goaocGPUpAOWPfefb3dk0E+Xb2+Otp9Kfl6cXEdOLhd2zrsIWBfz9/fX7+/b5+vX09MEnFvpfAPtgAPv9/fuEAPEoAP38/Pn5+dGnqf93ANSBePEnAOrU1P9FCf9KBcopFMEnGMMoFvBVKdakoa4iILIZE/IvAMyeoP85AP/t68srC+C8uN/T0963s8ooEvj8/LIaE9SusccmC/EtAMgmDPf6+/+jAP/bANCgl/n29vJiAcUxIL8SCfNNAP7+/fb7/PmEANWkoMEZEcyeoe/4+O3m5vf7/MopE9o1FPr39/z7++nOzfL6+vr7+fPv8MooE+9XKfn8/fj8/fxXANOhmeojANmxrv339sARAPr19fz8+6YJBPjy8/IoAOokAP84AMibnf7+/v86AP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIMALAAAAAAOAA4AAAjNAAXZQYKBwaCDgwClSQBoEIUQPIJIEHQwQwotYUoA2tPDyhcHaqi0UOKGjx8VCdC8mVElxog5F8zoCATgBRYDdRzAwCEnSRQ+gfooqNBFUBkhZ7hkKWLBT4EAN2Qg9GKCg5QDAgYs+OME4SA4V6aAwKr1zxiDg1Yw8WEyQoQjT41MENRgQxMagSAQIAABgVAPbMgAAdrnwZ8/D/ogAPBBw5I7fugQEbOGBZQnAALpadMhx5YfYOIAEmRgx5ATKBoAciGCRB6vg/DYqDEoIAA7";
B64_ADD = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJvSURBVDjLpZPrS5NhGIf9W7YvBYOkhlkoqCklWChv2WyKik7blnNris72bi6dus0DLZ0TDxW1odtopDs4D8MDZuLU0kXq61CijSIIasOvv94VTUfLiB74fXngup7nvrnvJABJ/5PfLnTTdcwOj4RsdYmo5glBWP6iOtzwvIKSWstI0Wgx80SBblpKtE9KQs/We7EaWoT/8wbWP61gMmCH0lMDvokT4j25TiQU/ITFkek9Ow6+7WH2gwsmahCPdwyw75uw9HEO2gUZSkfyI9zBPCJOoJ2SMmg46N61YO/rNoa39Xi41oFuXysMfh36/Fp0b7bAfWAH6RGi0HglWNCbzYgJaFjRv6zGuy+b9It96N3SQvNKiV9HvSaDfFEIxXItnPs23BzJQd6DDEVM0OKsoVwBG/1VMzpXVWhbkUM2K4oJBDYuGmbKIJ0qxsAbHfRLzbjcnUbFBIpx/qH3vQv9b3U03IQ/HfFkERTzfFj8w8jSpR7GBE123uFEYAzaDRIqX/2JAtJbDat/COkd7CNBva2cMvq0MGxp0PRSCPF8BXjWG3FgNHc9XPT71Ojy3sMFdfJRCeKxEsVtKwFHwALZfCUk3tIfNR8XiJwc1LmL4dg141JPKtj3WUdNFJqLGFVPC4OkR4BxajTWsChY64wmCnMxsWPCHcutKBxMVp5mxA1S+aMComToaqTRUQknLTH62kHOVEE+VQnjahscNCy0cMBWsSI0TCQcZc5ALkEYckL5A5noWSBhfm2AecMAjbcRWV0pUTh0HE64TNf0mczcnnQyu/MilaFJCae1nw2fbz1DnVOxyGTlKeZft/Ff8x1BRssfACjTwQAAAABJRU5ErkJggg%3D%3D";
B64_STATS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGvSURBVDjLpZO7alZREEbXiSdqJJDKYJNCkPBXYq12prHwBezSCpaidnY+graCYO0DpLRTQcR3EFLl8p+9525xgkRIJJApB2bN+gZmqCouU+NZzVef9isyUYeIRD0RTz482xouBBBNHi5u4JlkgUfx+evhxQ2aJRrJ/oFjUWysXeG45cUBy+aoJ90Sj0LGFY6anw2o1y/mK2ZS5pQ50+2XiBbdCvPk+mpw2OM/Bo92IJMhgiGCox+JeNEksIC11eLwvAhlzuAO37+BG9y9x3FTuiWTzhH61QFvdg5AdAZIB3Mw50AKsaRJYlGsX0tymTzf2y1TR9WwbogYY3ZhxR26gBmocrxMuhZNE435FtmSx1tP8QgiHEvj45d3jNlONouAKrjjzWaDv4CkmmNu/Pz9CzVh++Yd2rIz5tTnwdZmAzNymXT9F5AtMFeaTogJYkJfdsaaGpyO4E62pJ0yUCtKQFxo0hAT1JU2CWNOJ5vvP4AIcKeao17c2ljFE8SKEkVdWWxu42GYK9KE4c3O20pzSpyyoCx4v/6ECkCTCqccKorNxR5uSXgQnmQkw2Xf+Q+0iqQ9Ap64TwAAAABJRU5ErkJggg==";
B64_MUTE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1AseDDIhKm5YbwAAAdRJREFUeNrtkz1II2EQhp9s1otR9PyB3Cm6YPAaCytRm+ChxZlod83VFnqliJ0o1sL1ioi9gjaCCKIpBA/FP4SciImwhDvRc0kENSabxOZb2aw/cbXNC8MwszPz8u58AwUUIFAGBN7SKL1yuM9GvS2CMsC3MD9rxE67BLIlNv+GENC0MD9Lc3OLkfsi8px2KpPAwBMzpxrW1J9PKZAApicnGB8bwhje0urDU1Nv1NSY6gfqFw9QVk4AUJZC1M6sYiU1CByG/O7Ad1rbOwD42tlDsbuEw71NAPx+v8vc7CgpRZKLqJvbRnKXIn+qfXEHEsDO1jonR/sAnIb/sLsVJJlMABAMBnOa1W+NpK9iyNUe9Mtz1N6m/Eu++K+hxeIAHOxvk0jcEI9fAuD1enNqlaUQzvIK9Isz5GoPyvJxfoJIRCUa/fcQa1oMTYsBEA6Hc2qzqRSZ5B3RH21kbq/R/6qPCBwm/wHoMn2LAnW/JkaprPhIX/8wgAb8tvOKzEQuoAr4bLIGIDA2MhgQT7jK7h2YFciAW/isMKc4NmN7G8CVHQLrZaYBHUgCKUGSBuKAB4iIvG0Fz8VOsRuXILsF7t6jwIqsxXQg8x4Fz9VIwmfsEhSQF/eV645TJAQaagAAAABJRU5ErkJggg%3D%3D";
B64_UNMUTE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIGNIUk0AAHpEAACAhQAA/UUAAIIHAAB9RQAA7p0AADkvAAAeRRCZ7RQAAAEpSURBVHjarJSxjoJAEIY/0YTOigewM7EgxoKEymhhYngI7KCxoDfBgtoaShKfgaBGGzsq3oCS3pqwV1xi4ol3cPCXM/9+O7uzsz0hhLBtmy7k+z5YliVut5toq+v1KizLEhLAYrFoXd1yuQRAomP9CoyiCE3TugGez2f2+/3HXCPg8Xhkt9u9xcMwBCDPc4IgqAfcbDY4jlNpzrKMOI4xTZM0TesBy7JkOBxWmnVdfx63LMvmTfmpfr+PJH0vKYqiHlCWZR6PR6X5fr8/3+xgMKgH3G63HA6HSvN4PMYwDMIwZDabVXretlFVFVVVURQF13VfctPpFIDRaMR8Pm92h+v1Gs/zXmKTyQTgI+zPpqxWK5Ik6W70/j3Lp9OpNehyuQDQ6/qD/RoAZbyfyDXa+CkAAAAASUVORK5CYII=";
B64_CLOSE = "data:image/gif;base64,R0lGODlhKQAPAPcAAKw6JNSelMR+dNTW1MyOhOSmlMyGfNSWjNSinPz6/NymnNyCbNyKfOTi5NyShOSajOyqnOSelNSKfNyajOSinOSqnNR+dNyelMx+dNze3NSOhOymlNSGfNyWjNyinPz+/OSmnOSKfOzq7OSShNx+dAAIvgFIFQAAAFYgAAAAAAAAAAAAAJA0AOEKABIuAAAAAHMBRQAACQAAkQACfLAATuIACRIAkQAAfBierO4C55AAEnwAAHABJAUAAJEAAnwAAP/YmP/x5f8SEv8AAG0QfAX3AJFFAHwAAIUgkOcAQYEAkXwAfAAYAADksBUS/QAAf2AoBQPkEAASkAAAfAgAQDAA5CAAEgAAADgEAGMAABUAAAAAAACYEAC/5QAVEgAAAH6wGAC+7gAVkMAAfABYcADkCQASkQAAfP+wwP++5P8Vl/8AfP+Qb//jPv8Skf8AfACYYgDVPgDUkQB3fAAwCAAIAgBIAAAAAAAgZAAA6BUAEgAAAH00YLUKngAugAAAfMABMOIAAhIAFgACAJ8BAOsAAIEAAHwAAErZB+OLAIHUAHx3AMCIAHYAAFDaAAB3ADgkAGPjAAESFgAAAGzYAADjAAASAAAAAPx9AOG1ABIAAAAAADTYAADjAAASAMAAAPiFAPcrABKDAAB8ABgAaO4AnpAAgHwAfHAA/wUA/5EA/3wA//8AYP8Anv8AgP8AfG0ATgUBAJEAAHwAAErpTvQrAICDAHx8AAD8SADj6xUSEgAAAADE/wAr/wCD/wB8/zgAAGMAABUAAAAAAAAwBAEC5QAWEgAAAAA0vgBkOwCDTAB8AFf/5PT/5ID/Enz/AOgAd+PlEBISTwAAADhtGGNk5RWDEgB8AAAMNAAUZBVPgwAAfCDU1nsy5RVPEgAAANgAsOIB/xIA/wAAf1j8iOXj5RISEgAAABwAMOUBAhIAFgAAABiINO5kZJCDg3x8fDgBMAcAApEAFnwAAP8Aff8Atf8wAP8AADJhAAdTAJEgAHxJAKtt6QZhzpFnR3xlACH5BAAAAAAALAAAAAApAA8ABwjmABUIHKigQgUQByEoXMiwIYiHEA0WJIigooeLCi5QKEBhw4aOG0CE3ADBo0iQHzcUKADiwsWXCALERHChZoSbOHFuyBlhJ8+fNS8EGHqgaNEOSJM+QLr0g9OlD5wmeEC1atKkRg8Q2Kqhq9cRGkaIHZvgQ4IRCcqOHdsBrNeuBDQQMECXLoe7HEJoCMG3b4i0gP0KHhwiLwYMHCwk5kCCMQkSIR5LJiGi8uTIkh0zXmwBA4DPoEOLDi2igYjRqFOrRt2gdevVsGN/zpChAYAGA2zL3i2a9gDQvnkLH068uPHjyJOrDggAOw%3D%3D";
B64_COG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAADF0lEQVR42nRSa2xTBRg993Zjqdzu4e1KhTlgg2yORcgkE2PBwCAQMEJMYMZMSIyLOKOEKMEARlB/GQGNIRIiiw4IEHWTwR5qaMAZGGEZI84xxjrXYreOtvRx19e9vffwq3OJ7EtO8v0438k5X45IEo+D9cX3N27f2xresbc1JFZsrpmJJ5DE9Hl9T4u15+9+dbZ59ne/N+7eKpkFrKr75kxCTb5dZLNLHSfemJjOnxKo/7h9l5xvOerzhyfycs3Se3UOiSQsUg7ssoiPDncpwbASKy95ak737eGGH7/aehwAQBKQS8Sdn3Tc7x+K0hfU6QvqdI9r7LsT4T13gqPeFJU4mdRIknz309/+yUQQAYABl3G280JzWidGPCH861Pwx81RXLvlQe/AGMYeKFA1IBYHdAJNF8+fy0QQM8uqKsfKtEEkUhrargzimdJCFNnzjIpFNqN6qYwfmvugxFQkkoBj2Utrpp6waMOhjS/vPO13dvvS1/oCbLowxAFXjG8daHMjv2gLbGV1n397w+8L6jzVeo9Do3F29fjTrzSc9Wcvra0RvRPDlccP1loBmgLBGOJxFWElgZ8vt51k6P4vnBg8fbKlvWXY/RApVUMsrsFszjad+GybVYBYKapaLBGKJpHWibROEMCCefmoXvK8I+Ny5bKq5+bIEtzeEHwBBSZRgGcsAjWlJLL0/uamTe+Ub9iyZnVV/bYVdpLImWVCRenT6xoO/RoxZZmEgjzJAgCLFxRCLjDj6++vep093bcxeOn89OYd03RywBXjl429dI9rbHV62NHl5a07Ee4/8ic7u7zsHQgzt7r+cOYuK2OzonTJq1kiUCg/geWVRXBeHwFpAADGH0RRttCG4rn5MAwD5QuffQ3ABwD+E4hOTo4AsOu6wbISGXNtFsHlCUIQBNitEgySqpqmxZIjhpXI8P+qLAhCntWxqzHgcl6CmG250tL5Ra40K8cgkEylJx2bVn8IMZty8Qvrg9ePvUkyMlXlx6F29093/xpS2Hc3yvlrD1ydiTejAIAni2v2tRfX7GsHUDAT79EAm0IHQHifLQEAAAAASUVORK5CYII=";
B64_STAR = "data:image/gif;base64,R0lGODlhEwATAPeUANfm8NTk77XR5Mzf7N/p8djn8d3q8sre69/r83enyom00tnk7+Hs9OLt9M3g7bHR5V2aw0yEszl+sjVxpZm911ygyrjQ4l+aw2qly5i+2LHO4t7q83Ow073a69Di7nGixnex04+51sva6Mfc6luhykmMutfj7rLP40KDs0eCsq/Q5XKbwMHU5LTM38jY573Y6bXL34231Nno8svc6erx9nmx0l6iy1Kbx6rK4IOz04etzWudw0uQvmWjypzB21eNuGSnzkKDtKfI32Cjy5m51Dl2qYSqypGz0Nnl70qaxi5pn6/N4b/X58LZ6LPP44q007vV5pi/2WaWvjJqn77X502FsWinzVGMuYi62N7r887h7o641WaTu9Pj7rnT5b7X6LjN4Ju81lqOuXutz1CJtrLJ3Waky93p8ubv9YGtzaTG3tHf67vP4pu50h5claLD3Mre7Nfl8KrG3MLZ6TFxpVSHtEqPvJK71lWeyWeVvX6pykyNu0iBsIu41eHr9LrR45681Xmv0Yiwzmuqz5Cyz7rU5qvE202TwIquzWmr0aXA2GOlzMXW5sHZ6Mjd64y41a7N4aDE3IiszDx5qgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJQALAAAAAATABMAAAjdACkJHEiwoMGDMg4qFBgARKMGCwtmcZKkxoGIBAcESoQHEkaBAHAM6cAhxxwGBxEMoCIg0iMgaFSYCSFEAxQHBLEMWlThhpUXNLr0OcTDTok9bwZ+IWHjgZY4BAgsmPFHThoJCgoMPCMAQw8mSEysEcGohR4UTxwVNHBiDAQLLliwgaHjypaLBgH4uBAGTBlDiqQkEKAQgZogRAAhkkQoz49CCgHESGEkAplJdbhMWKLQw44idD5EuSNGiRsKBg4GqMInQxMAAbwImrJiw0E/R+BoHRhgRJuPwIMPDAgAOw==";
B64_STOP = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHpEAACAhQAA/UUAAIIHAAB9RQAA7p0AADkvAAAeRRCZ7RQAAAKeSURBVHjabNI9TBNxHIfx7+9/V3q9QnsHYkvLFbjGVzpITXiJoy8Txvi2GIIhrkYTY6KLcWTCxEQGQ4JKYgJOvkVxIQ64qWlF4cDIm4cFivTaoin36mRi1M/+bA9lP3yE53lwXReKokjblcqFubnZ00bR2OO5HifJ8udEIvE8GKy+u76+vgoARATKZKfAOA4JRTn+/t3b4dHRsR3z81/geoDgr0IkGkVSTaK9o/1nKpW6uLlp3LNtC7zremhqUo6Ov3zxtL+/H4IgIt4YRzAoorq6BvX19SiVyng09kgsl0vDXV2HzHw+/5A2Ng0x8/5dsa+vj29pUSHLMvL5PAKCgJpwGLFYDJFIFFVVfiwsfMHZM6exvzUV463t7YsjD0Z4juNh2TaCQRGdnd0gIvj9fkiyhFKxjIJRhCTXYnLyDZRE4iavaVrv9PQ04vE4dF3HsaOHcf36NfxpfPwVHj95hubmFnxb+YoVfaWblcullkqlAp7jwHgepmnhb5Zlg+MYCIBpWTCMgsSIiAGAB4Dwf57ngYiBcQxEBBARC4el5UAgANu2YZomRFH8J/T5eGxt/YDtOGBEkMJSkd+7b99YKtV6Y2LiNRpjccxqsxi8MwhiDIIgIBQKQdd11NXVYmlxEQGhCkpCmaCN7wVpZvpT4XzveUQiUfh8PL7lcvALAmRJRkOsAZHITvC8D7OahsuXL6EtfTDJlpaWjANt6Z6BWwPY2MhjbW0NqqoiqaqIRiMIh0LQl3VkMxn09JxDe0fnlVxudZ4y2SkQEVRV7Z36kL0/NDREMzMazG0TjuugIRrF7l27cOLUSaTT6au53OqAZZqg35M7joPm5qakbTuXNG3miFEoxBzHpbq62lVVTU4KYuC2/nVlighgjOHXALQJD/DK/XcVAAAAAElFTkSuQmCC";

// Special bloglist
if (location.match(/bloglist/)){
	var logo = document.createElement('img');
	logo.src = B64_LOGO;
	logo.alt = "Gamekyo Blog+";

	// Create the new menu on the left
	List();
	
	// Starred-menu
	StarList();

	// Fix width if viewport is too small
	if (screen.width <= 1024)
		document.getElementById('column-1').style.width = '70%';
	
	// We don't want column 3 and we want to enlarge the width's list	
	if (set_bEnlargeColumn == 1){
		document.getElementById('main-container').removeChild(document.getElementById('column-2'));
		document.getElementById('column-1').style.width = '70%';
	}

	// Add the "option" label0
	var ref = document.getElementById('column-1');
	var header = ref.getElementsByClassName('element-detail white-font')[0];
	header.appendChild(document.createTextNode(" - options | "));

	// Filtering bar
	var magnifier = document.createElement('img');
	magnifier.src = B64_MAGNIFIER;
	magnifier.alt = "Filtrer";
	var A = document.createElement('a');
	A.setAttribute('title', 'filtrer');
	A.setAttribute('style', 'cursor: pointer');
	A.addEventListener("click", function () {
		Reverse('filter_open');
		Show('filter', 'display');
	}, false);
	A.appendChild(magnifier);
	header.appendChild(A);

	// Create the filtering area
	var filter_values = document.createElement('input');
	filter_values.setAttribute('type', 'hidden');
	filter_values.setAttribute('id', 'f_values');
	var filter = document.createElement('div');
	filter.setAttribute('class', 'element-container brown-background');
	filter.setAttribute('id', 'filter');
	display = (GM_getValue_('filter_open', 0) == 0) ? 'none' : 'block';
	filter.setAttribute('style', 'text-align: center; display: ' + display);
	ob = document.createElement('input');
	ob.setAttribute('id', 'ob');
	ob.setAttribute('type', 'checkbox');
	ob.checked = GM_getValue_('filter_ob', 1);
	ob.addEventListener("click", Filter, false);
	lbl_ob = document.createElement('label');
	lbl_ob.setAttribute('for', 'ob');
	lbl_ob.setAttribute('style', 'color: white; cursor: pointer;');
	lbl_ob.appendChild(document.createTextNode(' Voir les articles de membres '));
	og = document.createElement('input');
	og.setAttribute('id', 'og');
	og.setAttribute('type', 'checkbox');
	og.checked = GM_getValue_('filter_og', 1);
	og.addEventListener("click", Filter, false);
	lbl_og = document.createElement('label');
	lbl_og.setAttribute('for', 'og');
	lbl_og.setAttribute('style', 'color: white; cursor: pointer;');
	lbl_og.appendChild(document.createTextNode(' Voir les articles de groupe'));

	filter.appendChild(ob);
	filter.appendChild(lbl_ob);
	filter.appendChild(og);
	filter.appendChild(lbl_og);
	filter.appendChild(filter_values);
	header.parentNode.appendChild(filter);

	// Add the #com anchor to the "commentaires" href links
	var comlist = document.getElementsByClassName("details");
	for (var i = 0; i < comlist.length; i++)
	{
		var a = comlist[i].getElementsByTagName('a')[0];
		a.href = a.href + "#com";
	}

	// We only filters based on user's choices
	// (It needs to be done before we cache articles otherwise it can make an hidden users visible again)
	Filter();

	// Add cache articles settings
	// Hide articles based on gorups or filtered users
	var namelist = document.getElementsByClassName("element-detail");
	for (var i = 1; i < namelist.length; i++)
	{
		var name = namelist[i].getElementsByTagName("a")[0].innerHTML;
		name = name.replace(/\s+/g, '_');

		if (namelist[i].getElementsByTagName("a")[0].getAttribute('class') == 'group'){
			document.getElementById('f_values').value += '-' + i;
		}

		var hide = document.createElement('img');
		hide.src = B64_HIDE;
		hide.alt = "Cacher";
		hide.title = "Cacher";
		hide.setAttribute('style', 'margin-left: 5px;');

		var a = document.createElement('a');
		a.setAttribute('style', 'cursor: pointer');
		a.appendChild(hide);

		var closureMaker = function (name){
			return function (event) {
				Hide(name);
			};
		};
		var closure = closureMaker(name);

		a.addEventListener("click", closure, false);

		namelist[i].appendChild(a);

		if (GM_getValue_(name, 0) == 1){
			document.getElementById('element-' + (i - 1)).style.display = 'none';
			document.getElementById('counter_'+name).innerHTML = parseInt(document.getElementById('counter_'+name).innerHTML, 10) + 1;
		}
		
		// Add Star icon
		var detail_node = namelist[i].parentNode.getElementsByClassName('element-title')[0];
		var art_number = new RegExp("_article([0-9]{4,}).html").exec(detail_node.getElementsByTagName('div')[0].getElementsByTagName('a')[0].href)[1];
		var art_com = new RegExp("\(([0-9]{1,})\)").exec(detail_node.getElementsByClassName('details')[0].getElementsByTagName('a')[0].innerHTML)[1];

		var isGroup = detail_node.getElementsByTagName('div')[0].getElementsByTagName('a')[0].href.match(/group_article/);
		var lbl_ = (isGroup) ? "star_g_" : "star_";
		
		var star = document.createElement('img');
		star.src = B64_STAR;
		star.setAttribute('style', 'opacity: 0.7; margin-left: 5px; margin-right: 5px;');
		var a_star = document.createElement('a');
		a_star.setAttribute('style', 'cursor: pointer');
		
		var closureMaker2 = function (art_number, art_com, isGroup, a_star){
			return function (event) {
				manageStars(art_number, art_com, isGroup, a_star);
			};
		};
		var clickS = closureMaker2(art_number, art_com, isGroup, a_star);
		if (GM_getValue_(lbl_ + art_number, -1) == -1){
			star_lbl = "Suivre cet article";
		}else{
			star_lbl = "Arrêter de suivre cet article";
		}
		a_star.addEventListener('click', clickS, false);
		a_star.appendChild(document.createTextNode(star_lbl));

		detail_node.getElementsByClassName('details')[0].appendChild(star);
		detail_node.getElementsByClassName('details')[0].appendChild(a_star);
		
		nbArticle++;
	}
	
	// Start watch-dog
	if (set_bEnableWatchdog == 1){
		var watchdog = setInterval(function(){
			var listV = GM_listValues_();
			for (var i = 0; i < listV.length; i++)
			{
				var art_lbl = listV[i];
				if (!art_lbl.match(/star_/)) continue;
				if (GM_getValue_(art_lbl, -1) == -1) continue;

				var isGroup = art_lbl.match(/_g_/);
				var num_art = (isGroup) ? art_lbl.replace(/star_g_+/g, '') : art_lbl.replace(/star_+/g, '');

				// Run Recognition
				checkStar(num_art, isGroup, true);
			}
		}, set_timeBeforeWatchdog);
	}

// This is homepage
} else if (location.match(/index.html/)){
	// Add #com anchor at the end of "commentaires"'s links (Blogs Area)
	var comlist = document.getElementById('blog-frame').getElementsByTagName('div')[0];
	var foo = comlist.getElementsByClassName('date');
	for (var i = 0; i < foo.length; i++)
	{
		var a = foo[i].parentNode.getElementsByTagName('a')[0];
		a.href = a.href + "#com";
	}
	// Same thing but for news
	var artlist = document.getElementById('news-frame').getElementsByTagName('div')[0];
	var foo = artlist.getElementsByClassName('date');
	for (var i = 0; i < foo.length; i++)
	{
		var a = foo[i].parentNode.getElementsByTagName('a');
		var link = (a.length > 1) ? a[1] : a[0];
		link.href = link.href + "#com";
	}

// This is either blog's article or group's article or news page
} else if (bGroup || bBlog || bNews){
	// Add #com anchor to commentaries
	var tag = (bBlog) ? 'comment-number-article-blogging-' : 'comment-number-article-';
	var com = document.getElementById(tag + number);
	var A = document.createElement('a');
	A.name = 'com';
	A.id = 'com';
	com.parentNode.appendChild(A);
	// Force anchor
	if (location.match(/#com/)){
		if (set_bSmoothScroll)
			setTimeout(function(){smoothScroll('com');}, set_timeBeforeScroll);
		else
			document.location = document.location;
	}else{
		if (set_bSmoothScroll)	// Smooth scroll to content !
			setTimeout(function(){smoothScroll('column-4');}, set_timeBeforeScroll);
	}
	
	// Add Star-link
	var lbl_ = (bGroup) ? "star_g_" : "star_";

	var art_com = (bGroup) ? document.getElementById('comment-number-article-'+number).innerHTML : document.getElementById('comment-number-article-blogging-'+number).innerHTML;

	var star = document.createElement('img');
	star.src = B64_STAR;
	star.setAttribute('style', 'opacity: 0.7; margin-left: 5px; margin-right: 5px;');
	var a_star = document.createElement('a');
	a_star.setAttribute('style', 'cursor: pointer');
	
	var closureMaker2 = function (art_number, art_com, isGroup, a_star){
		return function (event) {
			manageStars(art_number, art_com, isGroup, a_star);
		};
	};
	var clickS = closureMaker2(number, art_com, bGroup, a_star);
	
	if (GM_getValue_(lbl_ + number, -1) == -1){
		star_lbl = "Suivre cet article";
	}else{
		star_lbl = "Ne pas suivre cet article";
	}
	a_star.addEventListener("click", clickS, false);
	a_star.appendChild(document.createTextNode(star_lbl));

	document.getElementsByClassName('comment-number')[0].appendChild(star);
	document.getElementsByClassName('comment-number')[0].appendChild(a_star);

	// Star-menu
	StarList();

	// Filters coms
	Coms();

	if (bBlog){
		var bJustLoad = true;
		Server('load');
	}
	
// This is add an article page
} else if (location.match(/blog_add.html/)){
	Preview('article');
// This is an article's blog / group's blog / or user profile
}else if (location.match(/blog[0-9]{5}.html/) || location.match(/blog[0-9]{5}_[0-9]{1}_(all|[0-9]{1,}).html/) || location.match(/member[0-9]{5}/)){
	if (document.getElementById('administration-container')){
		var logo = document.createElement('img');
		logo.src = B64_LOGO;
		logo.alt = "Gamekyo Blog+";
		// We create the menu that will handle everything custom wise
		var label = document.createElement('div');
		label.setAttribute('class', 'administration-menu-category');
		label.appendChild(logo);
		label.appendChild(document.createTextNode(' Personnalisation avancée'));

		document.getElementById('administration-container').insertBefore(label, document.getElementsByClassName('administration-menu-category')[0]);
		document.getElementsByClassName('administration-menu-category')[1].setAttribute('id', 'here');

		createField('bg', ' changer la couleur de fond du cadre :');
		createField('fg', ' changer la couleur du texte du cadre :');

		var extended_css = document.createElement('div');
		extended_css.setAttribute('class', 'administration-menu-text');
		var input = document.createElement('textarea');
		input.setAttribute('class', 'textarea');
		input.setAttribute('name', 'ext');
		input.setAttribute('id', 'ext');
		var img = document.createElement('img');
		img.src = '/images/icons/action_refresh.gif';
		var submit = document.createElement('input');
		submit.setAttribute('type', 'button');
		submit.setAttribute('class', 'submit');
		submit.setAttribute('value', 'ok');
		submit.addEventListener("click", function () {
			TestCSS('ext', 1);
		}, false);

		extended_css.appendChild(img);
		extended_css.appendChild(document.createTextNode('CSS étendu :'));
		extended_css.appendChild(document.createElement('br'));
		extended_css.appendChild(input);
		extended_css.appendChild(submit);

		var debug = document.createElement('div');
		debug.setAttribute('id', 'debug');
		debug.setAttribute('class', 'administration-menu-category');
		debug.setAttribute('style', 'text-align: center; display: none;');

		document.getElementById('administration-container').insertBefore(extended_css, document.getElementById('here'));
		document.getElementById('administration-container').insertBefore(debug, document.getElementById('here'));
	}
	var bJustLoad = false;
	Server('load');
	
	// Smooth scroll to content !
	if (set_bSmoothScroll)
		setTimeout(function(){smoothScroll('column-4');}, set_timeBeforeScroll);
}

// Add a preview button for coms
Preview('com');

// Enable youtube's video to be put fullscreen
EnableFullScreen();

// End of script



function TestCSS(field, save)
{
	var css = document.getElementById(field).value;
	if (css == "") return;

	if (field == 'ext'){
		css = css.replace(/;/g, " !important;");
		GM_addStyle(css);
	} else if (field == 'bg'){
		GM_addStyle(".article-container { background-color: " + css + " !important; }");
	} else if (field == 'fg'){
		GM_addStyle(".medium-text { color: " + css + " !important; }");
	}

	if (save == 1)
		Server('save', field, css);
}

function Server(action, field, css)
{
	if (action == 'load'){
		// Different syntax if we display css on profile page
		var nameToGet = (location.match(/member[0-9]{5,}/)) ? document.getElementById('profile-post-name').innerHTML : document.getElementById('column-4').getElementsByClassName('member')[0].innerHTML;
		if (nameToGet == "") return;

		NewTags();

		GM_xmlhttpRequest({
			method: "POST",
			url: "http://www.dotbosam.info/gk.php",
			data: "name=" + escape(nameToGet) + "&action=" + escape(action),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function (response) {
				if (response.responseText != "") {
					var json = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
						response.responseText.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + response.responseText + ')');
					var bg = json['bg'];
					var fg = json['fg'];
					var ext = json['ext'];

					if (!bJustLoad) {
						if (document.getElementById('bg')) {
							document.getElementById('bg').value = bg;
						}else{
							var bg_ = document.createElement('input');
							bg_.setAttribute('type', 'hidden');
							bg_.setAttribute('id', 'bg');
							bg_.setAttribute('value', bg);
							document.body.appendChild(bg_);
						}
						if (document.getElementById('fg')){
							document.getElementById('fg').value = fg;
						}else{
							var fg_ = document.createElement('input');
							fg_.setAttribute('type', 'hidden');
							fg_.setAttribute('id', 'fg');
							fg_.setAttribute('value', fg);
							document.body.appendChild(fg_);
						}
						ext = ext.replace(/!important/gi, "");
						if (document.getElementById('ext')){
							document.getElementById('ext').value = ext;
						}else{
							var ext_ = document.createElement('input');
							ext_.setAttribute('type', 'hidden');
							ext_.setAttribute('id', 'ext');
							ext_.setAttribute('value', ext);
							document.body.appendChild(ext_);
						}
						TestCSS('bg', 0);
						TestCSS('fg', 0);
						TestCSS('ext', 0);
					}else{
						if (bg != "") GM_addStyle(".article-container { background-color: " + bg + " !important; }");
						if (fg != "") GM_addStyle(".medium-text { color: " + fg + " !important; }");
						if (ext != "") GM_addStyle(ext);
					}
				}
			}
		});
	}else if (action == 'save'){
		if (field == "") return;

		// verif just in case
		var nameToGet = document.getElementById('column-4').getElementsByClassName('member')[0].innerHTML;
		var ourName = document.getElementById('account-name').getElementsByTagName('a')[0].innerHTML;
		if (nameToGet != ourName) return;

		css = css.replace(/\n/g, "");
		var data_url = "name=" + escape(ourName) + "&" + "field=" + field + "&" + field + "=" + escape(css) + "&action=" + escape(action);
		
		// Chrome doesn't want headers to be sent
		var hdears = {
			"Content-Type": "application/x-www-form-urlencoded",
			"Content-Length": css.length + 50
		};
		if (GM_setValue.toString && GM_setValue.toString().indexOf("not supported") > -1)
			hdears = {};

		GM_xmlhttpRequest({
			method: "POST",
			url: "http://www.dotbosam.info/gk.php",
			data: data_url,
			headers: hdears,
			onload: function (response) {
				if (response.responseText.indexOf("ok") > -1){
					Show('debug', 'display');
					document.getElementById('debug').innerHTML = "Sauvegardé !";
					setTimeout(function () {
						Show('debug', 'display');
					}, 5000);
				}
			}
		});
	}
}

function createField(name, label)
{
	var field = document.createElement('div');
	field.setAttribute('class', 'administration-menu-text');
	var img = document.createElement('img');
	img.src = '/images/icons/action_refresh.gif';
	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('class', 'textarea');
	input.setAttribute('name', name);
	input.setAttribute('id', name);
	var img_pal = document.createElement('img');
	img_pal.setAttribute('onclick', 'fctShow(document.getElementById("' + name + '"));');
	img_pal.setAttribute('src', '/images/icons/color.gif');
	var submit = document.createElement('input');
	submit.setAttribute('type', 'button');
	submit.setAttribute('class', 'submit');
	submit.setAttribute('value', 'ok');
	submit.addEventListener("click", function () {
		TestCSS(name, 1);
	}, false);

	field.appendChild(img);
	field.appendChild(document.createTextNode(label));
	field.appendChild(input);
	field.appendChild(img_pal);
	field.appendChild(submit);

	document.getElementById('administration-container').insertBefore(field, document.getElementById('here'));
}

function Reverse(name)
{
	if (name == "") return;

	GM_setValue_(name, (GM_getValue_(name, 0) == 0) ? 1 : 0);
	return true;
}

function Hide(name)
{
	if (GM_getValue_(name, 0) == 1 || name == "") return;

	GM_setValue_(name, 1);

	List();
	Update();
	return true;
}

function Show_m(name)
{
	if (GM_getValue_(name, 0) == 0 || name == "") return;

	GM_setValue_(name, 0);

	List();
	Update();
	return true;
}

function Mute(name)
{
	if (GM_getValue_('com_' + name, 0) == 1 || name == "") return;

	GM_setValue_('com_' + name, 1);
	Coms();
	return true;
}

function unMute(name)
{
	if (GM_getValue_('com_' + name, 0) == 0 || name == "") return;

	GM_setValue_('com_' + name, 0);
	Coms();
	return true;
}

function manageStars(idart, nbcom, isGroup, a_)
{
	if (a_ == null) return;
	if (a_.innerHTML == "Suivre cet article"){
		addStar(idart, nbcom, isGroup);
		a_.innerHTML = "Arrêter de suivre cet article";
	}else{
		delStar(idart, isGroup);
		a_.innerHTML = "Suivre cet article";
	}
}
function addStar(idart, nbcom, isGroup)
{
	var str_ = (isGroup) ? 'g_'+ idart : idart;
	if (GM_getValue_('star_' + str_, -1) != -1 || idart == "" || nbcom == "") return;

	GM_setValue_('star_' + str_, nbcom);
	StarList();
	return true;
}
function delStar(idart, isGroup)
{
	var str_ = (isGroup) ? 'g_'+ idart : idart;
	if (GM_getValue_('star_' + str_, -1) == -1 || idart == "") return;

	GM_setValue_('star_' + str_, -1);
	StarList();
	return true;
}

// Create the upper left menu GK+
// where members or groups are filtered
function List()
{
	var menu = document.getElementById('column-0');

	// Menu needs to be rebuild
	if (document.getElementById('gkplus'))
		menu.removeChild(document.getElementById('gkplus'));

	var block = document.createElement('div');
	block.setAttribute('class', 'box-frame');
	block.setAttribute('id', 'gkplus');
	var title = document.createElement('div');
	title.setAttribute('class', 'box-title-external-blue');
	title.appendChild(logo);
	title.appendChild(document.createTextNode(' Gamekyo Blog+ '));
	block.appendChild(title);
	
	var div_right = document.createElement('div');
	div_right.setAttribute('style', 'float: right; margin-right: 5px;');
	var a_info = document.createElement('a');
	a_info.setAttribute('href', 'http://userscripts.org/scripts/show/81321');
	a_info.setAttribute('target', '_blank');
	a_info.setAttribute('title', 'Qu\'est-ce c\'est ?');
	a_info.appendChild(document.createTextNode('?'));
	var a_cog = document.createElement('a');
	var cog = document.createElement('img');
	cog.src = B64_COG;
	a_cog.appendChild(cog);
	a_cog.setAttribute('style', 'padding-right: 5px; cursor: pointer;');
	a_cog.addEventListener('click', showSettings, false);
	div_right.appendChild(a_cog);
	div_right.appendChild(a_info);
	
	title.appendChild(div_right);
	var div = document.createElement('div');
	div.setAttribute('class', 'box-container gray-background');
	var ul = document.createElement('ul');
	ul.setAttribute('style', 'list-style-type: square');

	var nb = 0;
	var listV = GM_listValues_();
	for (var i = 0; i < listV.length; i++)
	{
		var member = listV[i];
		member = member.replace(/\s+/g, '_');

		// Skip any other values different than members
		if (member.match(/com_/) || member.match(/filter_/) || member.match(/set_/) || member.match(/star_/)) continue;
		if (GM_getValue_(member, 0) == 0) continue;

		var img = document.createElement('img');
		img.src = B64_ADD;
		img.setAttribute('style', 'margin-right: 5px');
		img.alt = "Afficher";

		var a = document.createElement('a');
		a.setAttribute('title', 'Afficher');
		a.setAttribute('style', 'float: right; cursor: pointer;');
		a.appendChild(img);
		
		// Counter (images + text)
		var imgC = document.createElement('img');
		imgC.src = B64_STATS;
		imgC.setAttribute('style', 'margin-left: 12px; margin-right: 12px');
		imgC.title = 'Nombre de fois affiché sur la page';
		imgC.alt = 'Infos';
		
		var span = document.createElement('span');
		span.setAttribute('id', 'counter_'+member);
		span.appendChild(document.createTextNode('0'));

		var li = document.createElement('li');
		clear_member = member.replace(/_+/g, ' ');
		li.appendChild(document.createTextNode(clear_member));
		li.appendChild(imgC);
		li.appendChild(span);

		var closureMaker = function (member) {
			return function (event) {
				Show_m(member);
			};
		};
		var closure = closureMaker(member);

		a.addEventListener("click", closure, false);
		li.appendChild(a);
		ul.appendChild(li);
		nb++;
	}

	// Display the whole mickmak
	div.appendChild((nb > 0) ? ul : document.createTextNode('Aucun membre caché'));

	block.appendChild(div);
	insertAfter(menu.getElementsByClassName('box-frame')[0], block);
}

// Create the star-list menu below GK+ menu
function StarList()
{
	var menu = document.getElementById('column-0');

	// Menu needs to be rebuild
	if (document.getElementById('gkplus_star'))
		menu.removeChild(document.getElementById('gkplus_star'));
	
	var logo_star = document.createElement('img');
	logo_star.src = B64_STAR;
	
	var block = document.createElement('div');
	block.setAttribute('class', 'box-frame');
	block.setAttribute('id', 'gkplus_star');
	var title = document.createElement('div');
	title.setAttribute('class', (bGroup || bBlog) ? 'box-title' : 'box-title-external-blue');
	title.appendChild(logo_star);
	title.appendChild(document.createTextNode(' Articles à suivre '));
	block.appendChild(title);

	var div = document.createElement('div');
	div.setAttribute('class', (bGroup || bBlog) ? 'box-container' : 'box-container gray-background');
	var ul = document.createElement('ul');
	ul.setAttribute('style', 'list-style-type: square');

	var nb = 0;
	var listV = GM_listValues_();
	for (var i = 0; i < listV.length; i++)
	{
		var art_lbl = listV[i];
		if (!art_lbl.match(/star_/)) continue;
		if (GM_getValue_(art_lbl, -1) == -1) continue;
		
		var isGroup = art_lbl.match(/_g_/);
		var num_art = (isGroup) ? art_lbl.replace(/star_g_+/g, '') : art_lbl.replace(/star_+/g, '');
		
		var img = document.createElement('img');
		img.src = B64_STOP;
		img.setAttribute('style', 'margin-right: 5px');
		img.alt = "Arrêter de suivre";

		var a = document.createElement('a');
		a.setAttribute('title', 'Arrêter de suivre');
		a.setAttribute('style', 'float: right; cursor: pointer;');
		a.appendChild(img);
		
		var li = document.createElement('li');
		
		var span_title = document.createElement('span');
		span_title.setAttribute('style', 'display: block;');
		var a_title = document.createElement('a');
		a_title.href = ((isGroup) ? "group_article" : "blog_article") + num_art +".html";
		a_title.setAttribute('target', '_blank');
		a_title.setAttribute('id', art_lbl + '_title');
		var img_com = document.createElement('img');
		img_com.src = '/images/icons/comment.gif';
		img_com.setAttribute('style', 'padding-left: 5px; padding-right: 5px');
		var span_com = document.createElement('span');
		span_com.appendChild(document.createTextNode(GM_getValue_(art_lbl, -1)));
		var span_newcom = document.createElement('span');
		span_newcom.setAttribute('id', art_lbl +'_newcoms');
		span_newcom.setAttribute('style', 'margin-left: 5px; color: red; font-size: 1.2em;');

		span_title.appendChild(a_title);
		li.appendChild(span_title);
		li.appendChild(img_com);
		li.appendChild(span_com);
		li.appendChild(span_newcom);

		var closureMaker = function (num_art, isGroup) {
			return function (event) {
				delStar(num_art, isGroup);
			};
		};
		var closure = closureMaker(num_art, isGroup);

		a.addEventListener("click", closure, false);
		li.appendChild(a);
		ul.appendChild(li);
		
		// Run recognition
		checkStar(num_art, isGroup, false);
		
		nb++;
	}

	// Display the whole mickmak
	div.appendChild((nb > 0) ? ul : document.createTextNode('Vous ne suivez aucun article.'));

	block.appendChild(div);
	menu.insertBefore(block, menu.getElementsByClassName('box-frame-external')[0]);
}

function checkStar(idart, isGroup, bSkip)
{
	if (idart == "") return;
	
	var star_lbl = (isGroup) ? 'star_g_' + idart : 'star_'+ idart;
	var nbcoms_db = parseInt(GM_getValue_(star_lbl), 10);
	
	var reg_title = (isGroup) ? 'group_article': 'blog_article';
	var reg_coms = (isGroup) ? 'comment-number-article-' : 'comment-number-article-blogging-';
	
	GM_xmlhttpRequest({
		method: "GET",
		url: (isGroup) ? "http://gamekyo.com/group_article" + idart + ".html" : "http://gamekyo.com/blog_article" + idart + ".html",
		data: null,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function (response) {
			if (response.responseText == "") return;

			var html = response.responseText;
			var nbcoms = parseInt(new RegExp('<span id="'+ reg_coms + idart +'">(.*)</span>').exec(html)[1], 10);
			var titleart_ = new RegExp('<a href="/'+ reg_title + idart +'.html">(.*)</a>').exec(html);
			var titleart = (titleart_ != null) ? titleart_[1] : new RegExp('<span id="article-blogging-title-text">(.*)</span>').exec(html)[1];
			
			if (document.getElementById(star_lbl +'_title').innerHTML != titleart)
				document.getElementById(star_lbl +'_title').innerHTML = titleart;
			
			// New coms !
			if (nbcoms > nbcoms_db){
				if (bSkip)
					GM_setValue_(star_lbl, nbcoms);
				
				document.getElementById(star_lbl +'_newcoms').innerHTML = "+"+ (nbcoms - nbcoms_db);
			}
		}
	});
}

function showSettings()
{
	GRAYCSS = "position: fixed; top: 0px; bottom: 0px; left: 0px; right: 0px; overflow: hidden; padding: 0; margin: 0; background-color: #000; opacity: 0.5; z-index: 0;";
	// If popup is already built, just add the grayBG and recover the form
	if (document.getElementById('popup_settings')){
		var div_bg = document.createElement('div');
		div_bg.setAttribute('id', 'grayBG');
		div_bg.setAttribute('style', GRAYCSS);
		
		document.getElementsByTagName('body')[0].appendChild(div_bg);
		document.getElementById('popup_settings').style.display = 'block';
		return;
	}
	
	var div_bg = document.createElement('div');
	div_bg.setAttribute('id', 'grayBG');
	div_bg.setAttribute('style', GRAYCSS);
	
	var popup = document.createElement('div');
	popup.setAttribute('id', 'popup_settings');
	popup.setAttribute('class', 'box-frame');
	popup.setAttribute('style', 'padding: 5px; position: absolute; left: 23%; top: 15em; width: 60%; height: 30em; z-index: 1;');
	
	var box_title = document.createElement('div');
	box_title.setAttribute('class', 'box-container');
	box_title.setAttribute('style', 'height: auto; font-weight: bold; padding: 5px;');
	var cog = document.createElement('img');
	cog.src = B64_COG;
	cog.setAttribute('style', 'padding-left: 5px; padding-right: 5px;');
	box_title.appendChild(cog);
	box_title.appendChild(document.createTextNode('Configuration de Gamekyo Blog+'));
	var close = document.createElement('span');
	close.setAttribute('style', 'float: right; font-weight: bold;');
	var close_img = document.createElement('img');
	close_img.src = B64_CLOSE;
	close_img.alt = 'Fermer';
	var a = document.createElement('a');
	a.setAttribute('style', 'cursor: pointer');
	a.setAttribute('title', 'Fermer');
	a.setAttribute('onclick', "document.getElementById('popup_settings').style.display = 'none'; document.body.removeChild(document.getElementById('grayBG'));");
	a.appendChild(document.createTextNode('[ Fermer ] '));
	a.appendChild(close_img);
	close.appendChild(a);
	box_title.appendChild(close);

	popup.appendChild(box_title);
	
	// Settings now
	var ul = document.createElement('ul');
	// Enabling smooth scrolling
	var li_ensec = document.createElement('li');
	li_ensec.appendChild(document.createTextNode('Activer le défilement doux automatique'));
	var chk_ensec = document.createElement('input');
	chk_ensec.setAttribute('type', 'checkbox');
	chk_ensec.setAttribute('style', 'margin-left: 5px;');
	chk_ensec.checked = (set_bSmoothScroll == 1) ? true : false;
	li_ensec.appendChild(chk_ensec);
	ul.appendChild(li_ensec);
	// Number of seconds for smooth scrolling
	var li_nbseconds = document.createElement('li');
	li_nbseconds.appendChild(document.createTextNode('Nombre de secondes avant de scroller vers le contenu'));
	var txtbox_nbseconds = document.createElement('input');
	txtbox_nbseconds.setAttribute('type', 'text');
	txtbox_nbseconds.setAttribute('style', 'margin-left: 5px;');
	txtbox_nbseconds.value = set_timeBeforeScroll * 0.001;
	li_nbseconds.appendChild(txtbox_nbseconds);
	ul.appendChild(li_nbseconds);
	
	// -- Starred section
	var h2_star = document.createElement('h2');
	h2_star.appendChild(document.createTextNode('Articles à suivre'));
	ul.appendChild(h2_star);
	// Enable timer watchdog
	var li_timer = document.createElement('li');
	li_timer.appendChild(document.createTextNode('Activer la surveillance des articles'));
	var chk_timer = document.createElement('input');
	chk_timer.setAttribute('type', 'checkbox');
	chk_timer.checked = (set_bEnableWatchdog == 1) ? true : false;
	chk_timer.setAttribute('style', 'margin-left: 5px;');
	li_timer.appendChild(chk_timer);
	ul.appendChild(li_timer);
	// Interval for timer
	var li_int = document.createElement('li');
	li_int.appendChild(document.createTextNode('Interval en secondes'));
	var txtbox_int = document.createElement('input');
	txtbox_int.setAttribute('type', 'text');
	txtbox_int.setAttribute('style', 'margin-left: 5px;');
	txtbox_int.value = set_timeBeforeWatchdog * 0.001;
	li_int.appendChild(txtbox_int);
	ul.appendChild(li_int);
	
	// -- Blog Section only
	var h2_blog = document.createElement('h2');
	h2_blog.appendChild(document.createTextNode('Seulement pour la liste des blogs'));
	ul.appendChild(h2_blog);
	// Disable column 3 aka Ads & Enlarge width's list
	var li_adblock = document.createElement('li');
	li_adblock.appendChild(document.createTextNode('Augmenter la largeur de la liste'));
	var chk_adb = document.createElement('input');
	chk_adb.setAttribute('type', 'checkbox');
	chk_adb.setAttribute('style', 'margin-left: 5px; margin-right: 5px;');
	chk_adb.checked = set_bEnlargeColumn == 1 ? true : false;
	li_adblock.appendChild(chk_adb);
	var li_notice = document.createElement('li');
	li_notice.appendChild(document.createTextNode('Attention: Ceci supprime la 3ème colonne, celle-ci est utilisée pour la publicité. C\'est un mal nécessaire pour avoir une plus grande liste.'));
	ul.appendChild(li_adblock);
	ul.appendChild(li_notice);

	
	popup.appendChild(ul);

	// Save button
	var div_end = document.createElement('div');
	div_end.setAttribute('align', 'center');
	var btn_save = document.createElement('input');
	btn_save.setAttribute('class', 'submit');
	btn_save.setAttribute('type', 'button');
	btn_save.setAttribute('value', 'Sauvegarder');
	btn_save.addEventListener('click', function(){
		GM_setValue_('set_bSmoothScroll', (chk_ensec.checked ? 1 : 0));
		GM_setValue_('set_timeBeforeScroll', parseFloat(txtbox_nbseconds.value) * 1000);
		GM_setValue_('set_bEnableWatchdog', (chk_timer.checked ? 1 : 0));
		GM_setValue_('set_bEnlargeColumn', (chk_adb.checked ? 1 : 0));
		GM_setValue_('set_timeBeforeWatchdog', parseFloat(txtbox_int.value) * 1000);
		
		document.location = document.location;
	}, false);
	
	div_end.appendChild(btn_save);
	popup.appendChild(div_end);
	
	document.getElementsByTagName('body')[0].appendChild(div_bg);
	document.getElementsByTagName('body')[0].appendChild(popup);
}

// Parse the blog list and hide filtered members or groups UPDATE
function Update()
{
	var namelist = document.getElementsByClassName("element-detail");
	for (var i = 1; i < namelist.length; i++)
	{
		var name = namelist[i].getElementsByTagName("a")[0].innerHTML;
		name = name.replace(/\s+/g, '_');
		var ID = 'element-' + (i - 1);
		
		var status = (GM_getValue_(name, 0) == 0) ? 'block' : 'none';
		
		document.getElementById(ID).style.display = status;
		
		// We need to increase the counter
		if (status == 'none'){
			document.getElementById('counter_'+name).innerHTML = parseInt(document.getElementById('counter_'+name).innerHTML, 10) + 1;
		}else if (status == 'block'){
			if (document.getElementById('counter_'+name))
				document.getElementById('counter_'+name).innerHTML = 0;
		}
	}
}

function Coms()
{
	var section = (bBlog) ? 'comment-list-article-blogging-' : 'comment-list-article-';
	var comlist = document.getElementById(section + number);
	var coms = comlist.getElementsByClassName('member');

	for (var i = 0; i < coms.length; i++)
	{
		var name = coms[i].innerHTML;

		if (GM_getValue_('com_' + name, 0) == 0){
			if (document.getElementById('unmute' + i))
				coms[i].parentNode.removeChild(document.getElementById('unmute' + i));

			if (document.getElementById('mute' + i)) continue;

			var mute = document.createElement('img');
			mute.src = B64_MUTE;
			mute.alt = "Mute";
			mute.setAttribute('style', 'margin-left: 5px');
			var a = document.createElement('a');
			a.setAttribute('title', 'Mute');
			a.setAttribute('id', 'mute' + i);
			a.setAttribute('style', 'cursor: pointer;');
			a.appendChild(mute);

			var closureMaker = function (name) {
				return function (event) {
					Mute(name);
				};
			};
			var closure = closureMaker(name);

			a.addEventListener("click", closure, false);

			coms[i].parentNode.appendChild(a);
		}else{
			if (document.getElementById('mute' + i))
				coms[i].parentNode.removeChild(document.getElementById('mute' + i));

			if (document.getElementById('unmute' + i)) continue;

			var unmute = document.createElement('img');
			unmute.src = B64_UNMUTE;
			unmute.alt = "Mute";
			unmute.setAttribute('style', 'margin-left: 5px');
			var a = document.createElement('a');
			a.setAttribute('title', 'unMute');
			a.setAttribute('id', 'unmute' + i);
			a.setAttribute('style', 'cursor: pointer;');
			a.appendChild(unmute);

			var closureMaker = function (name) {
				return function (event) {
					unMute(name);
				};
			};
			var closure = closureMaker(name);

			a.addEventListener("click", closure, false);

			coms[i].parentNode.appendChild(a);
		}

		coms[i].parentNode.parentNode.getElementsByClassName('comment-text')[0].style.display = (GM_getValue_('com_' + name, 0) == 0) ? 'block' : 'none';
		coms[i].parentNode.parentNode.parentNode.getElementsByClassName('comment-avatar small-avatar')[0].style.display = (GM_getValue_('com_' + name, 0) == 0) ? 'block' : 'none';
	}
}

function getNumber()
{
	exp = (location.match(/newsfr/)) ? new RegExp("newsfr([0-9]{1,})") : new RegExp("_article([0-9]{1,})");
	number = exp.exec(location);

	return number[1];
}

// Filter specific to USER BAR on top
// Filters groups and users from general purpose
function Filter()
{
	var ob = document.getElementById('ob').checked;
	var og = document.getElementById('og').checked;
	GM_setValue_('filter_ob', (ob) ? 1 : 0);
	GM_setValue_('filter_og', (og) ? 1 : 0);

	var list = document.getElementById('f_values').value;
	var array = list.split('-');
	for (var i = 1; i <= nbArticle; i++)
	{
		if ((ob && og) || (!ob && !og)){
			document.getElementById('element-' + (i - 1)).style.display = 'block';
			continue;
		} else if (ob && !og){
			if (in_array(array, i)){
				document.getElementById('element-' + (i - 1)).style.display = 'none';
				continue;
			}
			document.getElementById('element-' + (i - 1)).style.display = 'block';
		} else if (!ob && og){
			if (in_array(array, i)){
				document.getElementById('element-' + (i - 1)).style.display = 'block';
				continue;
			}
			document.getElementById('element-' + (i - 1)).style.display = 'none';
		}
	}
}

function in_array(array, p_val)
{
	for (var i = 0, l = array.length; i < l; i++)
	{
		if (array[i] == p_val){
			rowid = i;
			return true;
		}
	}

	return false;
}

// Show/Close layout
function Show(id, method)
{
	var d = document.getElementById(id);

	if (method == 'display'){
		var hid = d.style.display;
		if (d){
			if (hid == 'block' || hid == 'inline' || hid == null){
				d.style.display = 'none';
			}else{
				d.style.display = 'block';
			}
		}
		return d.style.display;
	} else if (method == 'visibility'){
		var hid = d.style.visibility;
		if (d){
			if (hid == 'visible' || hid == null){
				d.style.visibility = 'hidden';
			}else{
				d.style.visibility = 'visible';
			}
		}
		return d.style.visibility;
	}
}

function Smileys(msg)
{
	var smileys = new Array("", ":info:", ":)", ":D", "]:(", ";)", ":p", ":o", ":(", ":8)", ":?", ":idee", ":lol:", ":hihi:", ":love:", ":8o:", ":bad:", ":good:", ":crazy:", ":|", ":[]", ":fleche:", ":exclamation:", ":?", ":cry:", ":evil:");
	for (var i = 1; i <= smileys.length; i++)
		msg = msg.replace(smileys[i], '<img src="images/icons/forum/icon_forum_' + i + '.gif" alt="' + smileys[i] + '" />');

	return msg;
}

function DecodeTags(msg, mode)
{
	msg = msg.replace(/\[g\](.+?)\[\/g\]/gi, '<b>$1</b>');
	msg = msg.replace(/\[i\](.+?)\[\/i\]/gi, '<i>$1</i>');
	msg = msg.replace(/\[s\](.+?)\[\/s\]/gi, '<u>$1</u>');
	msg = msg.replace(/\[url=(.+?)\](.+?)\[\/url\]/gi, '<a href="$1">$2</a>');
	msg = msg.replace(/\[url\](.+?)\[\/url\]/gi, '<a href="$1">$1</a>');
	if (mode == 'article'){
		msg = msg.replace(/\[img=(.+?)\](.+?)\[\/img\]/gi, '<img src="$2" width="$1" alt="" />');
		msg = msg.replace(/\[img\](.+?)\[\/img\]/gi, '<img src="$1" alt="" />');
		msg = msg.replace(/\[quote=(.+?)\](.+?)\[\/quote\]/gi, '<div style="font-style: italic; margin: 0pt 0pt 0pt 20px; padding: 0pt 0pt 0pt 5px; border: 1px solid rgb(102, 102, 102); background-color: rgb(255, 255, 255);">$2</div>');
		msg = msg.replace(/\[quote\](.+?)\[\/quote\]/gi, '<div style="font-style: italic; margin: 0pt 0pt 0pt 20px; padding: 0pt 0pt 0pt 5px; border: 1px solid rgb(102, 102, 102); background-color: rgb(255, 255, 255);">$1</div>');
		msg = msg.replace(/\[spoil\](.+?)\[\/spoil\]/gi, '<font size="1" face="Verdana">Spoiler :</font><br /><div style="background-color: rgb(0, 0, 0); border: 1px none rgb(0, 0, 0);"><font size="2" face="Verdana" color="#000000">$1</font></div>');
		msg = msg.replace(/\[taille=(.+?)\](.+?)\[\/taille\]/gi, '<font size="$1">$2</font>');
		msg = msg.replace(/\[couleur=(.+?)\](.+?)\[\/couleur\]/gi, '<font color="#$1">$2</font>');
		msg = msg.replace(/\[flash\](.+?)\[\/flash\]/gi, '<object width="560" height="460" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param value="$1" name="movie"><param name="allowFullScreen" value="true"><param value="high" name="quality"><embed width="560" height="460" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" quality="high" src="$1"></object>');
		msg = msg.replace(/\[pos=centre\](.+?)\[\/pos\]/gi, '<div align="center">$1</div>');
		msg = msg.replace(/\[pos=gauche\](.+?)\[\/pos\]/gi, '<div align="left">$1</div>');
		msg = msg.replace(/\[pos=droite\](.+?)\[\/pos\]/gi, '<div align="right">$1</div>');
	}

	return msg;
}

function EnableFullScreen()
{
	var flashvidz = document.getElementsByTagName('object');

	for (var i = 0; i < flashvidz.length; i++)
	{
		var embed = flashvidz[i].getElementsByTagName('embed')[0];
		if (!embed) continue;

		if (embed.getAttribute('src').match(/break.com/)) continue;

		embed.setAttribute('allowscriptaccess', 'true');
		embed.setAttribute('allowfullscreen', 'true');
		embed.src = embed.src + "&fs=1";
		var full = document.createElement('param');
		full.setAttribute('name', 'allowFullScreen');
		full.setAttribute('value', 'true');
		var scriptaccess = document.createElement('param');
		scriptaccess.setAttribute('name', 'allowScriptAccess');
		scriptaccess.setAttribute('value', 'true');

		flashvidz[i].appendChild(full);
		flashvidz[i].appendChild(scriptaccess);
	}
}

function Preview(mode)
{
	var textarea = (mode == 'article') ? document.getElementById('text') : document.getElementById('comment');
	if (!textarea) return;

	if (!document.getElementById('preview')){
		var button = document.createElement('input');
		button.setAttribute('type', 'button');
		button.setAttribute('class', 'submit');
		button.setAttribute('id', 'preview');
		button.setAttribute('value', 'Prévisualiser');
		button.addEventListener("click", function () {
			Preview(mode);
		}, false);

		if (mode == 'article'){
			button.setAttribute('style', 'margin-right: 10px');
			document.getElementById('form-submit').insertBefore(button, document.getElementById('form-submit').getElementsByClassName('submit')[0]);
		}else{
			textarea.parentNode.appendChild(button);
		}

		// Modifie le comportement d'Ajouter un commentaire
		if (mode == 'com'){
			var section = (bBlog) ? 'comment-list-article-blogging-' : 'comment-list-article-';
			var func = function () {
				if (document.getElementById('preview_com')) document.getElementById(section + number).removeChild(document.getElementById('preview_com'));
			};

			textarea.parentNode.parentNode.getElementsByClassName('submit')[1].addEventListener("click", func, false);
		}
		return;
	}

	// Process the message
	var msg = new String(textarea.value);
	if (msg == "") return;

	msg = msg.replace(/\n/g, '<br />');
	msg = Smileys(msg);
	msg = DecodeTags(msg, mode);

	// On crée le "faux" post
	if (mode == 'article'){
		var c_title = document.getElementById('title').value;
		var c_category = document.getElementById('category_id')[document.getElementById('category_id').selectedIndex].innerHTML;

		if (document.getElementById('preview_article')){
			document.getElementById('preview_article').style.display = 'block';
			document.getElementById('preview_msg').innerHTML = msg;
			document.getElementById('preview_title').innerHTML = c_title;
			document.getElementById('preview_category').innerHTML = c_category;
			return;
		}
		var frame = document.createElement('div');
		frame.setAttribute('id', 'preview_article');
		frame.setAttribute('class', 'box-frame');
		frame.setAttribute('style', 'padding: 5px; position: absolute; left: 23%; top: 15em; width: 60%; height: 30em;');

		var box_title = document.createElement('div');
		box_title.setAttribute('class', 'box-container');
		box_title.setAttribute('style', 'height: auto; font-weight: bold; padding: 5px;');
		box_title.appendChild(document.createTextNode('Prévisualisation d\'un article'));
		var close = document.createElement('span');
		close.setAttribute('style', 'float: right; font-weight: bold;');
		var close_img = document.createElement('img');
		close_img.src = B64_CLOSE;
		close_img.alt = 'Fermer';
		var a = document.createElement('a');
		a.setAttribute('style', 'cursor: pointer');
		a.setAttribute('title', 'Fermer');
		a.setAttribute('onclick', "document.getElementById('preview_article').style.display = 'none';");
		a.appendChild(document.createTextNode('[ Fermer ] '));
		a.appendChild(close_img);
		close.appendChild(a);

		box_title.appendChild(close);

		var container = document.createElement('div');
		container.setAttribute('class', 'article-information');
		container.setAttribute('style', 'overflow: -moz-scrollbars-vertical; width: 100%; height: 28em;');
		var title = document.createElement('div');
		title.setAttribute('class', 'big-title');
		title.setAttribute('id', 'preview_title');
		title.setAttribute('style', 'height: auto;');
		var category = document.createElement('div');
		category.setAttribute('class', 'article-category');
		category.setAttribute('id', 'preview_category');
		var article = document.createElement('div');
		article.setAttribute('class', 'medium-text');
		article.setAttribute('style', 'height: auto; padding-right: 5px;');
		article.setAttribute('id', 'preview_msg');

		// Values
		title.appendChild(document.createTextNode(c_title));
		category.appendChild(document.createTextNode(c_category));
		article.innerHTML = msg;

		// Attach
		frame.appendChild(box_title);
		container.appendChild(title);
		container.appendChild(category);
		container.appendChild(article);

		frame.appendChild(container);

		document.body.appendChild(frame);

	}else{
		if (document.getElementById('preview_com')){
			document.getElementById('preview_msg').innerHTML = msg;
			return;
		}

		var prev_com = document.createElement('div');
		var nb_comY = document.getElementsByClassName('comment-box yellow-background top-border dashed-top-border');
		var nb_comW = document.getElementsByClassName('comment-box white-background top-border dashed-top-border');
		var style = (nb_comY.length > nb_comW.length) ? 'comment-box white-background top-border dashed-top-border' : 'comment-box yellow-background top-border dashed-top-border';

		prev_com.setAttribute('class', style);
		prev_com.setAttribute('id', 'preview_com');
		var avatar = document.createElement('div');
		avatar.setAttribute('class', 'comment-avatar small-avatar');
		var img = document.createElement('img');
		img.src = document.getElementById('account-avatar').getElementsByTagName('img')[0].getAttribute('src').replace('medium', 'small');
		avatar.appendChild(img);

		var com_info = document.createElement('div');
		com_info.setAttribute('class', 'comment-information');
		var com_name = document.createElement('div');
		com_name.setAttribute('class', 'comment-name');
		var name = document.createElement('a');
		name.setAttribute('class', 'member');
		name.setAttribute('href', document.getElementById('account-name').getElementsByTagName('a')[0].getAttribute('href'));
		name.appendChild(document.createTextNode(document.getElementById('account-name').getElementsByTagName('a')[0].innerHTML));

		com_name.appendChild(name);
		com_name.appendChild(document.createTextNode(' !!! Ceci est une PREVISUALISATION !!! '));

		var com_text = document.createElement('div');
		com_text.setAttribute('class', 'comment-text');
		com_text.setAttribute('id', 'preview_msg');

		com_text.innerHTML = msg;

		com_info.appendChild(com_name);
		com_info.appendChild(com_text);

		prev_com.appendChild(avatar);
		prev_com.appendChild(com_info);

		var section = (bBlog) ? 'comment-list-article-blogging-' : 'comment-list-article-';
		document.getElementById(section + number).appendChild(prev_com);
	}
}

// Add id tags to main elements
// ie: profil - profilte-titre - profile-content
function NewTags()
{
	var i = (document.getElementById('column-0').getElementsByClassName('box-frame')[0].getAttribute('class') == 'box-frame yellow-background yellow-border') ? 1 : 0;
	document.getElementById('column-0').getElementsByClassName('box-frame')[i].setAttribute('id', 'profil');
	document.getElementById('column-0').getElementsByClassName('box-title')[i].setAttribute('id', 'profil-titre');
	document.getElementById('column-0').getElementsByClassName('box-container')[i].setAttribute('id', 'profil-content');
}

/*
 *  Chrome GreaseMonkey simulated methods
 */
 function GM_listValuesChrome()
 {
 	var arraylist = new Array();
 	for (var i = 0; i < localStorage.length; i++)
 	{
 		var key = localStorage.key(i);
 		if (key.substr(0, 3) == "GK_")
 			arraylist[i] = unescape(key.substr(3, key.length - 3));
 	}
 	return arraylist;
 }
 function GM_setValueChrome(key, value)
 {
 	localStorage["GK_" + key] = value;
 }

 function GM_getValueChrome(key, def)
 {
 	return localStorage["GK_" + key] || def;
 }
 /* Redefine GM_* by GM_*_ */
 function GM_getValue_(name, defValue)
 {
 	return (GM_getValue.toString && GM_getValue.toString().indexOf("not supported") >- 1) ? GM_getValueChrome(name, defValue) : GM_getValue(name, defValue);
 }
 function GM_setValue_(name, value)
 {
 	return (GM_setValue.toString && GM_setValue.toString().indexOf("not supported") >- 1) ? GM_setValueChrome(name, value) : GM_setValue(name, value);
 }
 function GM_listValues_()
 {
 	return (typeof GM_listValues == 'function') ? GM_listValues() : GM_listValuesChrome();
 }
/* END CHROME COMPATIBILITY */

// Smooth scrolling methods
// ref: http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
function currentYPosition()
{
	if (self.pageYOffset)
		return self.pageYOffset;
	if (document.documentElement && document.documentElement.scrollTop)
		return document.documentElement.scrollTop;
	if (document.body.scrollTop)
		return document.body.scrollTop;
	return 0;
}
function elmYPosition(eID)
{
	var elm = document.getElementById(eID);
	var y = elm.offsetTop;
	var node = elm;
	while (node.offsetParent && node.offsetParent != document.body)
	{
		node = node.offsetParent;
		y += node.offsetTop;
	}
	return y;
}
function smoothScroll(eID)
{
	var startY = currentYPosition();
	var stopY = elmYPosition(eID);
	var distance = stopY > startY ? stopY - startY : startY - stopY;
	if (distance < 100){
		scrollTo(0, stopY); return;
	}
	var speed = Math.round(distance / 100);
	if (speed >= 20) speed = 20;
	var step  = Math.round(distance / 25);
	var leapY = stopY > startY ? startY + step : startY - step;
	var timer = 0;
	if (stopY > startY){
		for (var i=startY; i<stopY; i+=step)
		{
			setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
			leapY += step; if (leapY > stopY) leapY = stopY; timer++;
		}
		return;
	}
	for (var i=startY; i>stopY; i-=step)
	{
		setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
		leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
	}
}
function insertAfter(referenceNode, newNode)
{
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}