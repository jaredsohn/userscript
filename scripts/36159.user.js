// ==UserScript==
// @name           {Katbox: Forums} "Unread Topics" Forum Icons
// @namespace      http://wolfey.sillydog.org/
// @description    Adds relevant icons between the user's avatar and the title of the topic (below the "unread posts" icon, if present) on the "New Threads" and "Recent Threads" pages.
// @include        http://forums.katbox.net/find-new/*/threads
// @include        http://forums.katbox.net/find-new/*/threads?page=*
// @grant          none
// @version        2.4.20130220

// For more information about this script, visit the following address:
// http://forums.katbox.net/threads/greasemonkey-script-unread-topics-forum-icons.302/

// ==/UserScript==

// Set variables

var forum, image, topic, x;

forum =
	["location", "icon", "title"];

image =
	["element", "container", "spacer"];

topic =
	["current", "total", "element", "prefix", "title"];

forum.location =
	document.getElementsByClassName("discussionListItems")[0];

// Forum Numbers:
//   [The Katbox]: 2, 5, 9, 25
//   [Katbox Community]: 6, 7, 26, 30, 31
//   [Katbox Comics]: 12, 13, 14, 15, 27, 28, 29
//   [Las Lindas]: 16
//   [The Eye of Ramalach]: 17
//   [Caribbean Blue]: 18
//   [Anthronauts]: 19
//   [Yosh! Saga]: 21

forum.number =
	["2", "5", "6", "7", "9", "12", "13", "14", "15", "16", "17", "18", "19", "21", "25", "26", "27", "28", "29", "30", "31"];

topic.total =
	forum.location.getElementsByClassName("discussionListItem").length;

// Set image sources

forum.icon =
	["Blank", "Katbox", "LasLindas", "TheEyeOfRamalach",
		"TinaOfTheSouth", "TheEyeOfRamalachAndTinaOfTheSouth", "CaribbeanBlue", "Anthronauts",
		"FungusFarm", "AnthronautsAndFungusFarm", "TheDraconiaChronicles", "YoshSaga",
		"Rascals"];

forum.icon.Blank =
	["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAABRJREFUeF6VwIEAAAAAgKD9qWeo0AAwAAEnvySkAAAAAElFTkSuQmCC",
""];

forum.icon.Katbox =
	["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEX/////iwAAAAD/sQD/lABRNFjVAAAAAXRSTlMAQObYZgAAAFVJREFUeF5FycENwDAIQ1HEBiYZAFiBLJAq+89Ukx7qi7/0hEtR71d4WEcsG9sJsW3CCYkkNbAoBBSFFFVFkmSch6FjnX1tHqBDgm/8P/RKL5Hyrf8FFAUKE+wnC7UAAAAASUVORK5CYII=",
		"[The Katbox]", "[Katbox Community]", "[Katbox Comics]"];

forum.icon.LasLindas =
	["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAGFBMVEUAAAAAAACYulJklBRahRJUexFPdRBvoxY+SMyLAAAAAXRSTlMAQObYZgAAAGlJREFUeF41zsENhDAMBEC7g2Q7cI4Lf/KgAFwBggZ4uIB80v4tnPDDGllraUU0J3kG/Q+djTu/QCI6QzDRzyiWeUZrbSmD2Ki2Ej65bwtjO47J+YnzSxJaTzLdiIgbghqXCaEoloi3xw8NcA+s+J/wxAAAAABJRU5ErkJggg==",
		"[Las Lindas]"];

forum.icon.TheEyeOfRamalach =
	["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABiVBMVEX///9aHoL///+NHRfe2ajNrZ708OLm5auvjXmQQFuZT12me2rIx46ue1+ti3TGw5C/s4etgmfJo2nS0KXl5sTt7dbl4r/X057S0JnTz5rP0JjHwZTw787JyJHJx5Lr8bbi4qvd2KLY1KGldGz//v/86+7Qg33SooLw8rnn5aji3KXHxYz+////7uicblBbFADCBQDoooz5/97r57Ps5bD49+L9/+jw4ciqDQY9MAAMDgCgBwDks8P49+X6/uTj1Kfu76Xy8Kz59MGWMSx+AAKJCAmwknrjy6L7/snr5ajw8LC8sYPt77Pu67P297///9X//9f6/sLr5qro46/19avez6Lm4q/s57Xy8bz6+8r3+cPv7bXp5a/l4qvr6q7Ms4rTyqDe3qbi36rm4bDk4Kzh3aje3KTZ1p/Nv5W0iGrArpHOypfPzZjT0JrU0JvQz5jNype+sI6xhGqFQIe4imm5r47EwpLFwpPBuY6+tpC0moOyfGZ9N32wcVSohHOpgm+jfHSdamuNOEuk46NGAAAAAXRSTlMAQObYZgAAAMhJREFUeF5lj0O7BFEQQ6du99i2bVvPtm3b9i+f/uq+Xk1WlZNFJQIUoPCkVuaXDKnkPAKpcjyucLrUGi3QXKc3GE1mi9VmB0DgIJxabo/XxwHOi0iAkGAoHInGxAAIEiSZSmeyuTwFhWKpXKnW6g3S3ELQ7unt6x8YZIZHRscQCCcmp6YZZmZ2bn6BgsWl5ZXVtfWNTZalb7Z3dvf2Dw6Pjk/+e5yenV9cXl3f3N7R8nD/8Pj0/PL69v7Bj4HPr++f3z/Mu+Z3AE/IIbGKv0z7AAAAAElFTkSuQmCC",
		"[The Eye of Ramalach]"];

forum.icon.TinaOfTheSouth =
	["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAt1BMVEVdUCsoIhPTtmJUSCcpIxMrJRWNeUE7MhwwKRdGPCGwmFI1LhnEqVuBbzyEcj2Fcj6Gcz6HdD+IdT8pIxQtJhU5MRstJxWhi0tgUi1hUy1nWTBqWzFIPiI2Lho4MBqRfUSzm1O1nFS9o1i+o1iNekJeUSyxmVOWgUajjEyjjUynkE6pkk+qk0+rk0+tlVGvl1I/Nh5COR8qJBQrJBRwYDR2ZTd6aTnFqlvHrFzIrV3MsF/OsWB9bDpqeV9QAAAAAXRSTlMAQObYZgAAAIVJREFUeF5dz0USgwAQRNHuxiHu7u7u9z9XFgRI8XfzFl01COP1RvzH8T0F21kE5skEWJUODI+CbDrljbS3HJaUQ2PxUtx7OQXZTuBCAuAugkE4zHoEKwIgm4prkTDsRwLPiYGi5q7X9aVhz3P7yqMSWACPUofAOaghjGs/9csok4JP9gdflBEIQ+IteGcAAAAASUVORK5CYII=",
		"[Tina of the South]"];

forum.icon.TheEyeOfRamalachAndTinaOfTheSouth =
	["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABa1BMVEUAAABdUCurlFBUSCdZTClSRyZfUiw9NBx+bDpuXzNEOh8oIhMoIhNDOR8lIBEoIhMoIhMoIhMoIhMoIhMoIhMoIhMoIhPTtmL///8pIxNaHoItJxUwKRc1LhkqJBReUSxnWTBwYDR6aTl+AAKBbzyEcj2FQIeFcj6IdT+NHReNekKQQFuRfUSWMSyZT12cblCjjUyldGynkE6ohHOpgm8rJBTTyqDT0Jrez6Le3qbi36rj1Kfl4r/l5sTm4bDm4q/s5bDs57Xt7dbt77Pu67Pu76Xw4cjw787y8Kzy8bz08OL297/49+IrJRXHxYzIrV3Ix47Jo2nMs4rNrZ7OsWDOypfPzZjS0KU9MAA/Nh5GPCFIPiJUSCc4MBo7MhyqDQaue1+vjXmvl1KwcVSwmFKxmVOzm1O0iGq1nFS4imm5r468sYPArpHEqVvEwpLFqlv59MH6+8r86+79/+j+////7uj//v///9XFwpNTHbm+AAAAFnRSTlMAAQIDAwQPEhMZGyAxOEJaepKhtND5cz66/QAAAMdJREFUeF5Fz9OaBDEQBeAer72VdA9t2zbWtm0//nZldK5y/uBLcSyCIJiWcTGovuD5K4y6++xxZe0aVJxEppDj/vputpQh+wuTs7yOR6hTMeSiewIOYhV7i/5Q+kEwWwE9gy/67WdghEURCp3P2ukewg1M4xPpauPNa0YIwRTCZrnS/nUSjAHmERL5YvOdwarrCI9sxJKpHLk7PtB4iB3h9ml7J04Ol2bmolo1jmK7f3j5u4JxTqqcGOsNdxmOPI+GYyRY+vAPFlQktrml2b4AAAAASUVORK5CYII=",
		"[The Eye of Ramalach / Tina of the South]"];

forum.icon.CaribbeanBlue =
	["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAVFBMVEUAAABpaWlubm5VVVVkZGRbW1sAAAB1dXUhISEnJycICAgXFxcNDQ0cHBwSEhJ9fX0xMTFAQEBFRUWFhYUDAwMtLS0oKCg7OztPT09KSko2NjY0NDRbEWmxAAAAAXRSTlMAQObYZgAAAIFJREFUeF49zVcSwzAIRVFAvbs7Zf/7DAHb+rtnRg+Ql2svLcL9tvwyziKmePVbmwjj3aUhHntQydw2Iu1jCpSuxkRhWte/CDSFr8AzGcaQEb88wo0N/LzkqjNHQlvAnzP/6o4PYbSug0o1rmkzfFjklnWmwiWyLC3iVbq2kt+y5g9MTgh0FSM59QAAAABJRU5ErkJggg==",
		"[Caribbean Blue]", "[iMew]"];

forum.icon.Anthronauts =
	["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9oFFRcVH3OC4yAAAAM9SURBVDjLZZLJTxtnGIef+Twz2OMFY7PYYwMGYzazxIQQKgIkUIWE3JpDF6lJFamtVKn9P8qhaqOmB6reKuXY9tD22EqEqkmDKqFIWaqWgNlizObBgAcPXw8oVFWe46tH+ul93x8A09NfSWGapiwWipyiTH06JatrQigAN268J+ONUYSiIwA28nlWl/Oc7R848X/86Wc5c29GAii3br0jk4l2/lla5kymG7G2ts1WYY/+vj6OjwXq4uIyra0pLk9cZseyTlLe/+BDaXjdjI2NcVi0iJhNfPf9D3z+2ZSiRGOm7El309reRk9vF7/P3EcPBIhHwsTj9ahOWWJZB5QdyC6tUxHw0hSrJdnaiSOdkwiAO3e+lB7dQ7i2johZg9fjJZ1OK6fC3W/vSs3QUYDrb1w/nSsAN2++K1MtLZSdMuMTk1hWAVmWXJu8oqiDg+fl7u42uu4hu7DIN19PY1l71FTXAqAGgn7Aw8LzRXw+N12JNh48/JPzg/309kxLoQkPPr/B0NAQqktF03W6uzvI5TYYGnkN8eTZU4LBII8fP8JvGBi6RqIpiaa52MrlUUPhII/m58lkenCki5poPYbHTVWwitGLFxXxx/0HSmWlh+GREZoTjdhHNtFohNcvXVJO13zJF7dvyxfrWfatfTTDTXuqjWisAa/fg3BVsLO9QXNTC+mOjv/f6a2335QH1i6DF4ZZza7R2ZWmuraO32ZmEaqg0uejLMukUs3UReOUbAejQmN8bFxRG+obpH1ok9u2+PWXe9TXxziySxQ2cwhVsrW5RXZlFU0IFrMrZHq7mJubJ9GcYGZ2VqoShZXVNcxoHbovgFBcaJrO0+dZ4vE43V0Z1AqFwtYuzrHNYclBHts4jk1xr4QSNWMyFK4hEonQlzmDfeTQ2daCVdwnkTDZWF+ndFRGEzplIXEJgYqC5jEQigt1bXVF8fsrpVXYZG7uIYbPT7jKz7O//mY9l8O2S1SFggxfOEthZ5d8Lo/bqxGqruXaxMR/bZy8clWajQlcOBT2LI6PBOcGeglUhhkYOEfMjLBXLLKwtIQQOqNDg6++8SWffPyRTCZT6G4XB/s2iaYWQuEQo8PDr/j/Ak56Kr3SaZM0AAAAAElFTkSuQmCC",
		"[Anthronauts]"];

forum.icon.FungusFarm =
	["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABhlBMVEUAAAABAQEOBAEVDgoPBwMQBwMQCAUPBwMQCAQQCAQPBwMQCAQQCAQRCQUWCwcQCAQQCAQWDgkQCAQwJB4gFhEWCwcnHBYgGBUYDAgYDQkyJyErFREkEQwpHxksFhImHBZENi44GRRaUUw9KyRANCxKOzNQRD1LMChLKiRENzBoZGFXSEBDHhlYSD9ZS0JfLytTJSBeTkNkVEpbLSaAdGx4ZFiRjo1yPDeWjYeklYy1qaKNe3Cbh3p2ZVt4a2OAPzuLPTWNRz6UgXWaTEiaTUSfRj6iUEykS0SoeWyuUkyvh3mvlISvlYSvm46xnI6yem6yjX+zgHW0V1G0WFS0YVu0g3i1dWy1no61npC2WVW2Wla2mIu3ZF+4lYm5ZmK5pJa6pJa7pZi7p5q+q56+q5+/raC/raG/rqLBr6PBr6TCsaXDs6jEs6nEtKnFs6fFtarFtavGt67HubDIubDJu7LKvbTLuq/LvLPLv7bMwLjNwbnOw7zPw7zQxb7V1NLf2dXh3t3j4uDC5yKaAAAAPXRSTlMAAAEICg8QERQYISQpM0FCSFBSY2Zna3Fzdn2FhomMkpujq66wtLm8vb+/0NXf3+Hl5/D19vr6/P39/f7+mQKxlgAAALxJREFUGFdjYAADLiFJaWkJAXYIj1NO394tLioy2Nlcgw/I5zbwjIyMCQv1ivb28VFmYGDRcQ0KCUwsyI4o8Uky5WVgkHFw98/MzS4uyo4vtBZhYGA3doktyCmoSklO8zUUBJog6hiQXxreWJ2VbiLLCrJC0SOvIru8IcNJkwdip3pCZU1qvYUKPyOEzyBmZGvnVyfOgABMbPJlZhwMyEC1VguFz6BtpcTAyIAE9CzVUAV0baRQtQgrMCM4AMwkJFG9J855AAAAAElFTkSuQmCC",
		"[Fungus Farm]"];

forum.icon.AnthronautsAndFungusFarm =
	["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABxVBMVEUAAAAQBwMPBwMQCAQRCQUWCwcQCAQQCAQWDgkgFhEYDAgYDQkrFREpHxk9KyRLKiRENzBeTkOAdGx4ZFhyPDeNe3CvlYRcXV9eXmBfX11iYlpkZGSKiYqMjIqMjY+PkI7Ds6jFtavGt67HubDIubA5Ozs6OT5AP0FCQ0RDRUhGSERHRkdta2xtbm5ubWpvb25vcW9vcXVwbWtxcG9xcHNzdHJzdHNzdHZ0d3l1dnh1d3N2ent3d3d4en16enV7e3p+f4KAgH2CgoKEgYGEg4Fpa25sbW8jJCYmJyoZGhsZGxqRkI+RkpKSkZCUgXWVlZSXlpaXl5cWFxmvm46xs7G0WFS0g3i1dWwaGhodHR8eHR5kZ2llZmdmZWdnZ2ZnaGtpaWuFgoKHiIVHR0lJSUlJSkxKSElLSk1MT1FPTEhPTkpQUExQUFVRUE+XmJKZmJmaTEiampybnZqdmpidnJqem52kpKanpKerra6sramsrq2urq2vh3mvlIRSUVFXVltXXF1YWVdZW1kqKi21npC1tre2WVW2Wla2mIu5ZmK5pJa7p5q+q56+q5+/raG/rqLCsaUrLTA1NzY2NzU3Nzg4ODfJu7KHQFNvAAAAFnRSTlMADxEpM0FCSFBmc3aFia69v+f2+vz+j0/VUQAAAM1JREFUeF5jAIPy1ipuHh4udiYI18fOyKqks70ttECEn5WBgSFG0sAlxDE8rKajVkyMj4GhMTNJJ7DCRFGhZZpYtzALA8NUqWwJmcR4FWWFLiVRTgaGqDrVZGnfYtPenr5gQQ4GBgYvLe0c3YQiswn9QryMDEAQOSW3ITbAWt5PgJkBDCLSU8Rlysxt2BigwHOipqVhvlwlAwwEuau5udo7ODPAgcdkjQwncQsGOJjUrJ5qrG/LgABp0XFN9bIMSCDLv7q0kAEF6HnnwTgAb0csyRZeN5EAAAAASUVORK5CYII=",
		"[Anthronauts / Fungus Farm]"];

forum.icon.TheDraconiaChronicles =
	["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABR1BMVEU/aI7///9Ui75Nc5ZCapCNprz6/P1WjL/V3ubo8Pbc5OuIrtLq8feousxWepvT4e5Xjb9eksKmucu7ytdgk8ORqb5Bao/M3Oxujanu8vXv8/f3+fuTqr+tyOCcvNrp8PeoxN5YhK9/mrTS2+T+//+Qs9Xb5e/4+vuAqc/+/v6Ps9RGdJ+WuNe6yda1xdRSd5lEbJHZ5vHv9PlAaY5BbJNbfp7i6O7E0dxafZ5yn8nb5/Fejro/aI9wl7tGbZLx9PdLcZV/qM71+PvA1OdOfqqWrcH+/v/09vhykKyJr9L8/f6fvttGdJ6mw912ocr5+vtFbZKStdb5+/2Dqs5PdpvE1+na4un6+/yrxt/09/u5zeB2k66HoLhHbpKCqtDn7/aZrsNZfJ1Td5ru8/jQ2+axyuFhlMOKr9FOdZpZjsCzy+Jll8VOgrFDaJIKAAAAwUlEQVR4XkXMQ3OFQRgF4bc/XNu2Ytu2bTv/f53M1K2kd+dZHDEMI5Z3F5OFmVlRKag7ADLRVKIN3TV06Xi/htAO4Gs0IZuzFIRPgFK5UoW5q6FfcLbcdHR2yWMP9Papj9cBBneHRUZGGRtXMOFjcmpaxHQRmVewsMjSsoi1srq2Lgo2NtnaloB/j8i+hgMOj47tU878pmg45+LSBZ7rG1HgvL0D8Nw/iC7kfQLHsx2QduEXCL69y18f3uDn1/f//gHBexgTPsrAPgAAAABJRU5ErkJggg==",
		"[The Draconia Chronicles]"];

forum.icon.YoshSaga =
	["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEUAAAAAAAEGBxISFCkAAQUBAgMCAgQDAwYDAwcEBAcEBAwEBQsDBQ8FBQoGBwwAAAIHCBMHCRMJChEJChQJChUJChgMDA0MDRUMDh0NDx0MDykOEB8OECAQEiQBAAITFSoTFjEVFzIVFzMVGDQZGzYaHDkaHTgaH00eIUIgJEciJlEmK2AsMWAzNDg0NDgvM1QvNGcvNWgxNmAxNmkzOG4+P0c4P4RERlxFR1dFR1g/RoRHSWBGSWhISllHSmBBSI5JS1tBSJFFS3xGTH1DS5dDS5pOT1hGTp5RWrJYYKNVX7lVYMRhasVgbehudK5odN1vdrxteONreOtxf/qAj/+NksKRlruUmtuPnf+WnuiWov+Zpf+apv+grf+lrvurs/kREyWvtviyu//FyOHByP/f5f/o7P/v8//e2BhOAAAAoUlEQVR4Xo3NwxYDURBF0erYtm3btm3z//8g76V7ntzJqbUnBX+slUkzUJLFgiCYLdEAIo+bD4D73vph9BoQAJCalZmwOuuEkFvQOQj0nV5U9UzQAWo7KwvQAtPhfW1HR50Conm6urUI4nMH+cjbt7hww0cbCaJN1Ygba3hIkO3bF1wxT0LBgYRQJU/7gnrsNONOll3TF/gKgxxXqtSw4ec+HIgWLY137jMAAAAASUVORK5CYII=",
		"[Yosh! Saga]"];

forum.icon.Rascals =
	["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADV0lEQVQYGQWADWhUdQDAf//33t3u3qbizu3O865dt6/Y5NYWYBLkUG1QyhBmSSRNqEllECoIwcoIlosRg1yoEFXOAlBBwMCSlgS6JmpzMt2HjW2379vHu93Xu7v3/iGSyTE/iKCqirCUIiSl8EqJLoS0hLANy7JngUlgApgF4kC2qKgKAO2j4+0vG2vGPl0WVLjyWtBMmptj8VWXN+zPhyOhlcNvHRgJBrYO2rbtADJAGsgBEkCbjs6V/X37Tmt9LuR6T2skIraRJcfyowQj16eKz5xvD5UfiYQ/OfW+7XIVLAAxIA1IAHVo8I+5QDAw3j/9uPry4l+eZ/Y8DSKAX2ykGh+NqWolc3e5pLv/im9v8657TqdjBkh2dHwrAUQiMeoXQlStr6d2d3d/3/Zdz49eVwI+V18njomLAnarEW7YjyjofOGrY21v/wBMA3nAVoCslDJdVOTOtLd/nPzizAmWWOec1cdN+zE7RBgpbSqEl/haogzwAh5gE+BWAAuwAYdpZt2XLl+lBh9VopTN6GQwQdpcLxxk/4E9OhACgsAWoEgDBOASQvGcPduzYelhlHNqC5NyhYgIMCAneOCLsfNkk6ypKfdJSRgwAQ3IakAh4BsaelJ5vuenwk51P7rQmJar7BDPY8gUSyUZzJwp/uz75zndXVDndDq0aHSuOBqdd4tEYrQWaDp06NhJcXPR/5naRJ89wi05xtdqMxpODExu2U8Z0KYwNli26nRYC0ZMxnXzgQZs7O29Vnv79ztbL6nvYJNnnBj35BRJMugIdKHRrEY4KOuYMJaUa/a/wgjo44ePtHyj5fN5d1fXhcY9VIgtwsUzO8asEmdbZYAbY8O8qbxISprclzP8pgzbK5ViqfGNV/u+/LD1SmmpZ1i7eOGXsqnJmdAr1PFu7ldmRRwp4NTBD/I/d/VqI3KRJ4Wrsnxn1fLR1uMPX9u3a0DXXSOWZS1IaSe1u/33S33ekhmjwZM7sbc5WVy8KZtMpnL19bVpY2U9mMmYjotHWyYbXto+qijKf1LKKcuyZoAYkBSG8XT76dMdbZ2dn86rqlIIpIUQKQBFUXRAsywrBSwA80AMWAUMICkSidEyRVH9tm15AAXIACYA4AJUIA2sAmtAAkgDJmD9D/xugTTFAvfkAAAAAElFTkSuQmCC",
		"[Rascals]"];

// Set up and add images for links

for (x = 0; x < topic.total; x = x + 1) {

	// Set code for <img> and <span> tags

	image.container =
		document.createElement("span");

	image.container.setAttribute("style", "height: 100%; left: 54px; position: absolute; z-index: 1;");

	image.element =
		document.createElement('img');

	image.element.setAttribute("class", "topic_icon");

	image.element.setAttribute("style", "bottom: 0; margin: auto; position: absolute; top: 18px;");

	image.spacer =
		document.createTextNode(" ");

	topic.current =
		x;

	topic.element =
		forum.location.getElementsByClassName("discussionListItem")[topic.current];

	// Determine prefix

	topic.element =
		forum.location.getElementsByClassName("discussionListItem")[topic.current];

	if (topic.element.getElementsByClassName("prefix").length > 0) {

		topic.prefix =
			topic.element.getElementsByClassName("prefix")[0].firstChild.nodeValue;

	} else {

		topic.prefix =
			"";

	}

	if (topic.element.id !== "") {

		if (document.location.href.split("/")[3] === "find-new") {

			forum.title =
				topic.element.getElementsByClassName("forumLink")[0].getAttribute("href").split(".")[1].split("/")[0];

		} else {

			forum.title =
				document.location.pathname.split(".")[1].split("/")[0];

		}

		// Set <img> "alt" and "src" attributes based on forum number and (if present) prefix

		if (forum.number.indexOf(forum.title) > -1) {

			if ((topic.prefix === "Las Lindas") || (forum.title === "16")) {

				image.element.setAttribute("alt", forum.icon.LasLindas[1]);

				image.element.setAttribute("src", forum.icon.LasLindas[0]);

			} else if ((topic.prefix === "Eye of Ramalach") || (forum.title === "17")) {

				image.element.setAttribute("alt", forum.icon.TheEyeOfRamalach[1]);

				image.element.setAttribute("src", forum.icon.TheEyeOfRamalach[0]);

			} else if (topic.prefix === "Tina of the South") {

				image.element.setAttribute("alt", forum.icon.TinaOfTheSouth[1]);

				image.element.setAttribute("src", forum.icon.TinaOfTheSouth[0]);

			} else if (topic.prefix === "Avencri") {

				image.element.setAttribute("alt", forum.icon.TheEyeOfRamalachAndTinaOfTheSouth[1]);

				image.element.setAttribute("src", forum.icon.TheEyeOfRamalachAndTinaOfTheSouth[0]);

			} else if ((topic.prefix === "Caribbean Blue") || (forum.title === "18")) {

				image.element.setAttribute("alt", forum.icon.CaribbeanBlue[1]);

				image.element.setAttribute("src", forum.icon.CaribbeanBlue[0]);

			} else if (topic.prefix === "iMew") {

				image.element.setAttribute("alt", forum.icon.CaribbeanBlue[2]);

				image.element.setAttribute("src", forum.icon.CaribbeanBlue[0]);

			} else if ((topic.prefix === "Anthronauts") || (forum.title === "19")) {

				image.element.setAttribute("alt", forum.icon.Anthronauts[1]);

				image.element.setAttribute("src", forum.icon.Anthronauts[0]);

			} else if (topic.prefix === "Fungus Farm") {

				image.element.setAttribute("alt", forum.icon.FungusFarm[1]);

				image.element.setAttribute("src", forum.icon.FungusFarm[0]);

			} else if (topic.prefix === "Nixie") {

				image.element.setAttribute("alt", forum.icon.AnthronautsAndFungusFarm[1]);

				image.element.setAttribute("src", forum.icon.AnthronautsAndFungusFarm[0]);

			} else if ((topic.prefix === "Draconia Chronicles")) {

				image.element.setAttribute("alt", forum.icon.TheDraconiaChronicles[1]);

				image.element.setAttribute("src", forum.icon.TheDraconiaChronicles[0]);

			} else if ((topic.prefix === "Yosh! Saga") || (forum.title === "21")) {

				image.element.setAttribute("alt", forum.icon.YoshSaga[1]);

				image.element.setAttribute("src", forum.icon.YoshSaga[0]);

			} else if ((topic.prefix === "Rascals")) {

				image.element.setAttribute("alt", forum.icon.Rascals[1]);

				image.element.setAttribute("src", forum.icon.Rascals[0]);

			} else {

				if ((forum.title === "6") || (forum.title === "7") || (forum.title === "26") ||
					(forum.title === "30") || (forum.title === "31")) {

					image.element.setAttribute("alt", forum.icon.Katbox[2]);

				} else if ((forum.title === "12") || (forum.title === "13") || (forum.title === "14") ||
					(forum.title === "15") || (forum.title === "27") || (forum.title === "28") ||
					(forum.title === "29")) {

					image.element.setAttribute("alt", forum.icon.Katbox[3]);

				} else {

					image.element.setAttribute("alt", forum.icon.Katbox[1]);

				}

				image.element.setAttribute("src", forum.icon.Katbox[0]);

			}

		} else {

			image.element.setAttribute("alt", forum.icon.Blank[1]);

			image.element.setAttribute("src", forum.icon.Blank[0]);

		}

		// Add <img> tag between avatar and topic title

		image.container.appendChild(image.element);

		image.container.appendChild(image.spacer);

		topic.element.getElementsByClassName("avatar")[0].parentNode.insertBefore(image.container, topic.element.getElementsByClassName("avatar")[0]);

	}

}