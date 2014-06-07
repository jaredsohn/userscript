
// ==UserScript==
// @name IMDB Links
// @namespace http://adamv.com/greases/
// @description This is the adjusted script from Adam Vandenberg (http://userscripts.org/scripts/show/565). All credit goes to him.
// @include	http*://*.imdb.com/title/*
// ==/UserScript==

var icons = {
	settings: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAHUwAAB1MAHdM3LNAAADxElEQVQ4jQXBW0xbZRwA8P/3nUvb09Zz2lPoYFwmFHqZhtKWDZg6lrBIagx7XBZ5XEx88d0HXxZNDC+azUwdiYkm7k0jL8t0C8wtZsFw63BuA6GtQGk5vXDanvZ85/L5+6GlR4/ABgBN05hWq2VhhmFNwzABoK9vYPC71zxu99bm5ofEMJ4nR0fZWCRiUkoZhJAFAMAq5TIAxlCtVqx6oxlCCB04eN7knM4pjyi+6/e4Qa3X07n9/ecIgPO43b2apu05nU4ghABrWRY2DcPGLP+B4HP+KPD8YnfXqYOentNzYBi0Xq/D5enpG7l8PlRX1e66pr2/vr5+vVKrLSjFIkbf3LkDR6WSGOzpeykHTwW7g0FbU2t4b/df+6hQsCml4PP58FgqhSPhMGVZFmUymcq9+/eHEaVljBDiCSEn5WJhofd0NxTyWfPPJ4+NocFB9F46zY4lk6xPktDq6qqxtbVlEEJgaXl5geW4smVZPEYANs9zMDAYMsEgsJ/PoZGREU6W5YO9bPbmi1evbuVzuUJnRwdXrlSQqqoQHh5GDMZACLGZa3Nz6Z4zA18nRkau5rN7LGYYZnNjc01rt8blQOAX27bvFQqFHwqFQjoWjXYhhGgkEjnX0dk522w2NRyORq8l4/FpBijP8bytt9tQLB59prfbtUaj4bAsyyHLsoIwmieEAM9xNgDFXX1nkv0Dg1dZ5egIW4RAIBBAgsuFPF4vuAShVq1UgFIKAABE1wEjfCKKIjAsCydtAtncDuzu7FAmkUo9/f3Bw4wsy+dEURRlvx8MQtg2IT+LkkQN07SqtRqcjcXm34zFwpVGE2cyz5SVJ398rByXbjGzV65oJeV43dB1ORGPv6NpmpFKJuNOp3PUtu26WxBiZ6PRL9+amEgfFkvGoVJh/t5Yuy1K0hemaTbYS1MXLb/Px8qBwKRLEMBrmlRVVSMWicxyPD8rer2gtVt0ezdrZA8L9EStA+Idb7ze24umL1602chwmDYbzaFsPj8lCAIoisLpuo44jrNoowE2AByUFHi5u8fVGw1qWDaUy+VpfyIeSiYS2ywAYFVV//np7t3rDqfr28XFX2/wPK/OzMx8MhyNyfniMVr7a6X0+OGD+bauu8YmL3z6IrPx0eULE9sAgFkAsFmGAUmSvs/9l1+UfL4qIcR8urJiuCT/zXqjCUa79fnY+PhXDKXM5Pnzt98eS1WHQiEAAJsFABAEATxuN/JL0nHZ7eaalIKh68vbW89+6wx2sgP9/UterxdcDgceTSQUSilGCAEAwP9hNtoxKfo0ZAAAAABJRU5ErkJggg==',
	noFavicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGHSURBVHjaYvz%2F%2Fz8DIyOjDAMDgzgQMzPgB6%2BA%2BBFQzz%2BYAEAAMYAMAALjHz9%2BfPj9%2B%2FffP3%2F%2B%2FMeGgfL%2Fp0yZMhGoVgGImUD6QBgggGAGmIE0f%2Fny5f%2FXr1%2Fh%2BOPHj%2F%2Ffv3%2F%2F%2F%2BXLl2BDnj9%2F%2Fn%2Fq1KkohgAE4GiOUQCAQhCA8u9%2Fgq7YFASGkx8dwkVfHj8DLtydSCZ9u6uZUXcHACA%2FqaogBr4AYoQaYApUcPLv379wr%2F379w%2FsOqA4A9BQBkFBQZTAYGFhMQdSpwECiAVZkImJCRSgcDbIQGZmZgY2NjYGoEvAhoIMFBMTg%2BsBCCAUA2CaYWyQZmQ%2BzEBkABBALPjiDNkQEBuEYQEHAwABxEIg3sGakL2GDgACiImBCADTDHINyDBkABBAOF2A7FRoagUHIjoACCCCXkA2CN12EAAIIBZ8zobZjA8ABBCyAf%2BhiQprtKKBf1DX%2FQcIIFB6Bmn8B4zj7zAJAgCk9huQBidbgABihDpTFpqdiYoVqOZXQL2PAQIMAIeX65Ph3kulAAAAAElFTkSuQmCC',
	separator: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGklEQVQoz2P8//8/AymAiYFEMKphVMPQ0QAAVW0DHZ8uFaIAAAAASUVORK5CYII=',
	youtube: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABTElEQVQ4jZ2SMUjDUBCGvxeLIDhI4+JsQGc3B9GhpdBRcHLPWJzEzdU6dunk4lSl1KGL2sVF1EEURaklTgUnYycFoe05vCQmNq3Rf7n/7r377967Q0TkoVaQ7fykiIhk7Krsn7clKQgISOdA278guP14VBAgqH5aygkgdvEqKBC2AwLvL4cCSLPblw+P+wnNbn+ogEFC7G2YPPVkIJ7yiVJKExEmZtY4KeVQSmEXL5kbU/SW15lPGWTsakRAeW39GylaLcgv+npAQj0Bji9QMpsWHPf7wDLDDYLz+iMWhf5Eazom2S8zGkbk4sISOK52HVf7eLxc0bxcgetnqJ0BoSlE4E/Eh2Vqkc0dyGa9YHuEwG+tB09VMQKNBpFPvbnVfr0Ou1tgKO3f3cPqip5C5/Mt6HzYVoT2DKWLMzWeRokIWGYobdguxMQdV30Bqesirt4ZsWUAAAAASUVORK5CYII=',
	google: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAADCklEQVQ4jSXSy2ucVRjA4d97zvdNJpPJbTJJE9rYaCINShZtRCFIA1bbLryBUlyoLQjqVl12W7UbN4qb1gtuYhFRRBCDBITaesFbbI3RFBLSptEY05l0ZjLfnMvrov/Bs3gAcF71x6VVHTk+o8nDH+hrH89rUK9Z9Yaen57S3wVtGaMBNGC0IegWKIDxTtVaOHVugZVmH3HX3Zz+4l+W1xvkOjuZfPsspY4CNkZELEgEIJKwYlBjEwjec/mfCMVuorVs76R8+P0KYMmP30U2dT8eIZqAR2ipRcWjEYxGSCRhV08e04oYMoxYLi97EI9YCJ0FHBYbIVGDlUBLwRlLIuYW6chEmQt/rJO09RJjhjEJEYvJYGNhkbUhw43OXtIWDFRq9G87nAaSK6sVRm8r8fzRMWbOX2Xx7ypd7ZET03sQhDOz73DqSJOrd+7HSo4QIu0Nx/4rOzx+cRXZ9+z7+uqJ+3hiepxK3fHZT2tMjXYzOtzL6dmznPzhLexgN0QlxAAYxAlqUqRmkf5j59RlNQ6MFHhgcpCTTx8EUb5e+plD7x4jjg1ANCAgrRQAdR7xKXjBlGyLYi7PxaUmb8z8xcpGHVXLHaXdjI0egKyJiQYTEhSPREVIEUBNC+Mqm+xpz3j0njLPHB2nsh1QgeG+IS48dYbD5YNoo0ZUAbVEuTUoKuBSZOarX/WhyQn6eg2+usDWf0s0tq8zNPYk+WI/Lnge++hlvlyfQ3NdECzGRWKwEEA0qNY251n69kV6+Y0kbaCZoebG2X3oU7pKoyxuXOPe945zs9DCeosGIXoBDyaLdf6ce4Hbk+/Y299ksKtAuaeNsiyw8c1LKIZ95b0MdgxA5giixACpTxEPSau6QdFfI5/2cLPmEW+JAQrtJUJzDXF1dkwHzVodJMX4HFEcQQMaFdPeM0Jb/4PUtzzaLKAhRyJFwo6lbegRNFfk819muV5dR4JBQoQdQ2xFiDmSNDHiaptamR9Gq5cQ18AledrGDpOfeI5Lq8u88smbhMRisoSAgAYghdfn5H/JkHuRZ1owLAAAAABJRU5ErkJggg==',
	rotten: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAADK0lEQVQ4jW2TzWtcZRjFz/O+986dmZsPnZlkMOmMSajT0rRo+hFSqV0YChWpFrSKYJdudSmIO/8DN+JOF0WoXZTSVi1SKFhRKlQLxbamMSLpdDIzaXNn7vf7Po+LuKjg2f0W5yzO4QBPiBQp5SgXAOozo80DHxz6BkorAojw/1JPgrAIG84nZsfGazNje+dgdx88OfOKU3RECFopcojwn6xtFGCkUiyPTpUnaxOlfQuvzX2ijOzsXV33x1+s3xt2o6+vfHrr45igCAARgVkYADQAKIKTxiY9fLTx9q635s5EQvWVe7GbtVOharH2dGvs0OKe2pGxgiP9h+HdJGejCEoAIUWkWcQu7aweXTr+7Gc+1J7OlGfSWkFv5KDJiubZGwHm/s6oN1OiFdf++v2l1XdXfuvdJoLSAsiJyvixD/c1rhxfS+tv3omkUNL6VqtEb3zXR88jMs949N5XfV78MeBW20ztb1Xf6bXDy38mWUfPu4WJ87Xp87tyW+00XXNxcVTfaBaxsBrj9M0Q8z8Nce15H/WQ1Y6NXPmZ5HvXMn/JKy2cDQdf6o/Gqu+/VPFPBbOO8aZKTqNSxhGjcXhoEZYJExsG/oMc1lVormdIPKUjDdvQTrPL/LvzQsE7ZoqA42vlP+XBa1SAcgHxahc6zBBWNFoPcgSeQe5uN0dCiCA4WCguO7nICBiAFVjDSNN8e+icAQswgHLC8IeA0QQRIBWhCAJFVHGKpLoSM3jLgvspCJuAVuAghWzlwIBBDIgGjACxMAIRSQW4b7K2cy2NLiwlxVfDdi4KgAQ5SBE4tJCOgWwxLICEBUMRBMLYZEuBNbgcDS5STeni9Xrzhx2Oe2BY4NwtKxeKICmDI0FmBREEgQges0XXmizI08LNOLrweRq/TgBwojQyf7Y2dRWCyYEwAxALoQRQA2F5LCx9a6VrMmymsV5L4jvnrHm5B7S1AtRdk218m4Tn9nve7mnHec4Q6JGI6jGjw5YemozWk1D9FQ3xSxKfuSR86hHQJWx/AwpQDIhHhJOlkeXlkn962nEXQ7aTG3nK95Oo/UeWXr/N/MUa8LP8axSA/wE15KOtkha5TAAAAABJRU5ErkJggg==',
	wikipedia: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAB5klEQVQ4ja2Tv2saYRjHP0lBSqCYhECzNNNZhCJ2CMVB9I6TRIKQk6RdbhMzpOAeOpz5E/w/inJTMvSOZnApoZhrKKTlhdMhNFSveg7SwWCHkLexdSnpA+/wPjzfz/PrfefG1+MJ97D5+4j/D8B1XUzTpLBVwHVdAOpv6xS2CliWhRACAMuyME0TIQRCCCqVCqZpMq/rOolnCdqdtqTuvNwBoFFvABB0AxYeLqCpGoqisBRdAkBTtZsWdl/tEg5CbNsm6AYAGEWDcBDitTx83+fy2yXlvfJU+eW98g1AURQyaga7YeP7PgCqppJMJqkeVnEcBzWjSuHZpzN5l0MslUoAOI7DLdQoGoivgvPP57KtoBtw+uGUxeXFaYCu6ySTSZrNphycqqmkUinCfiiz98M+o58jdF2fBgCk02mcdw5ey5vqtd1pyw2dvD9h7cna7zXeDTx4c4DyVKFhNwi6AV7LI/E8wcryCrZtA9Dr9igaRal5YFWtw7uQYTik9bHF1fcrVh+vsm1sMxgOOD46JhKJMBqN2MhvzK4AIBaL0fvRk29AURSy2SwAtVqNXC43LRhfjyd/nvxmfpLfzE8uvlxI3/7r/Uk8Hv8rdm7Wb3Rdl+ijKOsv1qVPCEGn05HTv7WZgH+xX3yx7irlByjQAAAAAElFTkSuQmCC',
	torrentz: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAT0lEQVQ4y+2SMQ7AIAwDzxE/4k/8qa9NJxgQDMWM9e7TxYpqewCSsyiMMkAGZkpXWdFn3Z2BDAHZJ/yAC4Dy9fNcgCbY8R9kh4VTdjYYW7yYjgxYTlcK+QAAAABJRU5ErkJggg==',
	demonoid: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACSElEQVQ4jaWSS0hUcRSHv/tqHnp1dJxRJ6HAB2g0ZbSQGoiISBeBQosQol20cdOmB1S7olXbgtbhokWZORRuijI00YzINjNoqdkwzh3zztx53ftvMRJOZAZ9y8PvfJxzOAB0UUZlZ/TfC94/hNzSzqJ6nywqCheGGkXkeI3YJl/BmfN+8XC0VcCWqd1emdt32xh/lRYvnxr0nm7hyLEgqirx8UOKkUfLJH+Y9J8LcrhD58G9ZSoES6t5jPUSkZ56XMLFyd4mFEVDAPvCPto6Pbx5/Z1waw3GRo6pSRMA2bMpWPlWYCVhkc3ahFrcOLaDI2w+f0pjOw6WVULXNVLpPPMLJvH5fFlgbQoSX4toGlj5Ek27FaxiBoccspahZGewnSJ1DTKrSYvFeO7XPSSAcxfrxaFINaqikDPzGKshgnU9TE8t0neqHyGVmJh8QiozTfsBcLtcZJJFbl1blVRAtIc1ZqYTxN83s7/jLNdvXkbXq3AK9xkYGERVVRr8e9G9tYxFo0ws3OFEnx/NJQlJUcC2EVev3KCzq53u7oPEYjF8Ph/hcJh4PEZzc4hUao3l5RWylsW6YTF0aRAzjSTbdnmVubl3GCkDXdexSyUKxQKyLGFmMszOzhAIBEmuJamtqeX5ixHMdHl9VQIEMBaNkislCDYGiMUWiUSOglD4sriEJMkkEmlGnz1mlzfN8PB45RG3IDrCENojIUs16FV+MlmTlJHAUw2moTD31q7o2+7rRaBJxlMtARIbaYGRtP+W/3c07b8VlfwE2AfrHatocvMAAAAASUVORK5CYII=',
	tpb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAEzlAABM5QF1zvCVAAAB+klEQVQokX2STcsxYRTHr3khk9fxmigllAVSXrIjK3vFRsmCDZv5CBZ8CfIBLIiVhRQWZqEsKBsbq1FSk5cmzeU8i/H0uNX9/DbXOXX6n/M/1yEAAP3lM/6CIAgloJVnv99zHCdJEkmSX6WKSrVaLRQK7xwA+v3+b9oK+XxeqXx3oOl3oFKpMMYsy2KMr9crQuj1egGAWq1WCn4MEAqF1ut1qVTq9Xo8z1cqlcFg0G63P+3Rn4MyDGOxWJ7PZ6PR0Gg0sizX6/Xtdqv0+ecJADqdjpIajcbPnnq9nqIohFAikXg+nwDwvRNRFD0ej1arRQgFAgFJkjDGCKH7/f72sNvtOI6TZVlRSiaT8XjcZDIhhFKpVDKZZFkWIWS322maxhgTs9ksk8k0m02dTudwOFiWvd1usiwrozIMQ5IkSZKxWGw0Gi2XS8rlci0WC+XvLpcLRVHxeDydTkcikXA47HQ6H4/H8Xicz+etVothGGIymYzH4+12W6vVNptNt9s9n89Wq9Xv9wuCIEmSz+dzu92n00kQBIwxAQCCIASDQZPJ5PV6bTabwWAIBAKv14vn+f1+b7FYotHocDjMZrPlchkBwPV6NZvNHMeJogg/EUVxPp8Xi0WE0Gq1AgAEALIsT6fT8/kMv3A8HnO53OFwAADiPyf9CQAoF/4HStItR7mjWFIAAAAASUVORK5CYII=',
	kat: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACj0lEQVQ4jW2RW0hUURiFvzlzHGccsdFBx7wg4QUVtAgzynqYHjKaXsRIMqEwekmQqKheujx2eTKiCKykl/BFkFLMKEOLEilKKtMyRwcveRnHy1ycfY7Tg55pvCzYsP+11r/+n71hFdXHS2wPbp+Yq6m212rcpZrSZ0/qTvkjuYtnDzbcuXZ0SKt12uXqece7fcVZJQBO14zXZIwy2BLjojR9fHIuaDIaZEucSQJ43t575d7jjlsyQFV5cUJB7ta9qqoAkJ6yxQyg1QBJVrMhkstIi68FVgJizYYzxmi9TlH+NwDsKDlJeuYePNNOulpvrtEyM6wplWVFCSsBMYZSdbVZkmTiE7ehqkFsaYUAjDk/oa4L1wHRBv1hGUCWdUlCEQDExiWw33F5jTm/qJz8onI+vr6Pa7A7zMuyLlcCCC2rkiIEihAE/Iv0vK1ncqwvbHT2d+GeGsI9OYTmU4RgeVmVZYBFX2BCKCIPQMxP0ff1JdbkHJJS8vAuTNPZdpfN4PMHv8kAc/P+TkUIe6RoirEAMDU+gCLEhuagUPH5llolgIXFwCOfL4AQInxkQwwASwEfQggs1ow1+uDwzERz+0+3DNDc3u9KtZkH8rOsOdqE2ekREpOzyCk4QEb2bkTQz9O6qvAGrlHPQwBJI0bGPJVefyAkFIFQBB/eNCCCfnQ6Cb/XQ0vjdTTtj8s92/ii74b2nWFUOLLrdxXaTmu1xZqGxZqKa/AzqrryDos+sdzT+9fe0uHs3BAAUHEkq2l7nrVM0m2QWPAK9cuP6WMtHcNNGqdfb/o+4G40GvQjJqP+kDFakkOhEKFQiF/Oud99g7M72zpd3ZH+jWMi4LCnX4iNkR1uT/Dcq/ejvZt5/gHI7C0FIQ1BBgAAAABJRU5ErkJggg==',
	orlydb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAC7klEQVQ4jS2RTWhcdRRHz73v/97LvJnMTGamSWxN/cjCry5aaTfGgMVszEpwJQQXdSFtkSBUUFR0IUVqQS0VRat0oW5EsCqoFARXIoJuxK5c25QkTeIkM+/rXhfxB2d3OJufAC6quBpCi+CTiJegBe22ArCzM8SsSW0OgEaCuwNGEAE3BwMYcvb0MidOHKE/aNPp3gnAxvoGf/x+g9fefJcsO8B4nOPuiDiC4pgAztdXz9NoKZNT0yQTGWnaxWojhMCtjT0OHlA+vPIjH3/6BcPRCJEIFRcGkzGX3jrL3Pxh5h9YIMk6uCaURY67EYIi5Ta31q6xeuppLr33OqrJfkAJXLl8nsWTSzSTlA9eXeGh3hrX3n+brJXiUiKRkU11eGblE77/7iL33t3l6LF7EBH00CCl284ISWB94zbnXlkhu+8My8uLaFGQALe31kml5vr1z5l/cIGskfDS6nPEcUDPrZ6i1Z/CraY/M4s2Frl54xu6Rx6lqnL2Rv+iGEuPP8XNzZJ27zB5XtGfbtPvdQlzh2bwoESyf822g1dKveeYF7g6ZZ5z+Z0L1PkQz4ROq89wbxeoCP3ZGTBBRAkhJnKhqIFil2Is+PaYXz77Cp/pcP/cEtbs0Wg0sSji2NG7UBxGoxEhJERRk0hS4rTJ7GBA+fdfXH35RRbSwLcffUk8cwe9bg8hMN4rOX3mWYJqBXXK/owQEkKckFvF9MnHeP7h4zzxyJNcvPACmrbIRyVRiEhCQMUJ6+s7DPopw+EO3U6CqaBe40CQBjoZ8dNvPzAaD5kIMXleYibEUUQUCdFwc/ONhYXjxBMJqgruiATca9wF1UDcSkmaU1hluNv/XkVZ7aI///onjdQxM4RACClFVVBVFVYXiACVYkVOXRfUdY0LaJzSyiYJ+bhg7Z8t4nQbOShkjQZWlSRpAwesNlycCEUmEqrdnEiUEALS7KDmzsbmFmmzhZkxzseIOLVVuNeYFfsAmKIaIQBuiMb8B1HBQLeAdu+lAAAAAElFTkSuQmCC',
	opensubtitles: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAv0lEQVQ4jdWTQY3EMAxFn4dBCqEUSiEUWiqhUAqhYCylEAouhD+HUS1157SaOexaimL/Lz3bUmKA+CAeAJKQXpzf5o9PugMY31jha4Dee+7n7qnP80xEpBcR74DWGgBmhpndNHdn2zbMjGmaOM/zNoUAjTE0z7OuupSiMUZ6tdb0fpxXEhEqpdwAESFAtVZdMcbQsizvgNaaeu9p9N6177uAvC/YNdkNAMjds5O7p34chyIivXVd0/sj7+B//4Un16jY585nYTIAAAAASUVORK5CYII=',
	podnapisi: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAYklEQVQ4jWNkgID/DMQBRlwCcAPevXuHVaeQkBBWQ5gIaUQGUDUoroUbgGQDToCkBm4I0S6AyaOrwwgDEgAjAwMDAwuyDUJCQnhdApNH9i5JYYBNHUmxgE3dwLtgNBaoEAYAkKI8fGQutwEAAAAASUVORK5CYII=',
	amazon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABy0lEQVQ4jY2TP2hTURjFf09zM1UbcGmID9xEFEyyCTo1b6uLxuCS1e4Fg4tuIlhczMMti0NwadOho9DNf7wpCCYdDEL7njWgiU87NOBxeGmavryKB+5wv8t3vnPuuRdJaUnPJO3o/7Ez7klbkp4AD5jC9vY2jUaDz70elmVxc2mJarVKAlaRFExTe56n08YoFVu1Wi1JSYCkwXTl3vKyUsao5DjqdDqT/XnbTiIYWJIGwPyhpiAI8H2f4XDIzzCk2WzSarUAGB0cxC0MZxR0u13li8UZCyljEhXMENypVJQyRvliUb7vq+66/yQ4Fdd0KLdcLpPNZmm325OzMAxnc4gryBcKk4klxzmWSN11T7Dw259UPM9TzraVMkY521bddVWuVLToOAq/B/rTeSl9WInWJIXNy/NcX4fMxaTHcoSt2zB3AdIZ+PQI7mqcwu5r6RXS+xUp9OMyj/BrV+qtST860tq52Dv40oJ3t6JJmRuw4IA5CwIsC/a2YG8Drq1H9f4buPpwaEkKgAUA+h58fAzfNqJGxv0Ac5eg8BxyJRiN0zBnvlqSngL3j3kddKH/FkbDiCFzBXKLSbeyiqLv/ELS/snmZ7A/7kn/BXFbL8ajtAhKAAAAAElFTkSuQmCC',
	boxofficemojo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACcklEQVQ4jY2TT0jTcRjGP785tzmFsbZpeNAG80+CQSKo4UVtMsGLiHjPk5iCiAfTm4KXYpcO4iE8JIzEQPAgJEIgxkApFTUIR8qPpi2Zm+u3qV9/3w7+XUn1wnt5H3he3ud5H0UXQvKPOhECk9F4K2YE6Ovvx+fz4W1oSANf+P0UFRWxs7NDLBajtbWV+yUlfxIAhMNhng0N4XA4MJlMdHd14XK5UFWVWCxGNBplY2OD6elpFEXBYrHQ19uLAcBut7O6usrT5mZsNlvahpycHAoKCqipqUHTNJ7U1yOlxOVyAZwTAPh8Pl4tLJBMJiksLAQgkUgQjUYJhUI8ys8H4OXsLIqi8Njj4VTTQBdCrk9MyK/z81IXQn4aH5fq4qLUhbhqdXFRvq6tlcfxeNr8OB6XBoCNyUk+jo2hC8F8Tw97KytpZ+RXV1NQV0eGyZQ2z7Rar08IB4PsLS8jUikA9lZWeNPUxIfRUU41jcPtbQDeDwwQ8HqJq+q1BroQJMJhvszMYLjw+113N86yMpZGRoisrbEVCBCam+Pz1BRWp5Nlvz9dRLvHw1YgwJ3iYgAOQyFK29rIzs3lx+YmGSYTkfV1bG4397xevq+tXRMYjEbyKirQIpErAgBDZib62Rk/9/eRUpJhNmM0mwE4OzlJf6T8qiq0SASj1QqA1enkSFVJHhzgKi9HURSyc3M5PjpCi0SwXVhtAMgwm7Hm5fGgowP99BRjVhYPOzuZaW/nbmUljtJSdCFw+3wc7e6yNDyMu7HxfPNNX3/vS9+/BYPyucUidSGkSKXS/uH2iN3wGeBtSws1g4Nc6mW4kUzlf+L8t/oFnf0/n745T5YAAAAASUVORK5CYII=',
	metacritic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABKUlEQVQ4jaWTrW4CQRDH/xRRDMlq1Clql9wLcKYOD3WY8hi39U1OH2Yx6EuuCrVB1dAclhowTTHNkusDTA3d7N7tgWCSEZuZ+c3XTgsICTfI3S3BVwGMdZFlryDaQGsFIZ59biE1qZQ5VUWpDTE2tPwuAOwgW4piZyDeFjjvg/M+AECIOaJohsHgCdvtp7ErlYKxbr2FarYkWRobY0Mqip1TiQOI47TWMxER5xMvxAEEwchkT5KlU4nWZQ0iZX6ew3naWpekdUlZprxbqEKMBsGItC6N437/1bhKPwQhcT5xIFLmXoi9vto/uAaJ49QTHFLLPqbKfrFYvGE6fbl4C22gJ/4fx+MPVqt3jMeP6HTuwfkDAGC9/mgEOBVUKzkcvhFFM5xOv42AP7RWg+n6nROaAAAAAElFTkSuQmCC',
};

var site_columns = 5;

// -- Site definitions
var Sites = {
	
	separator1: {
		name: "Separator",
		icon: icons.separator,
		link: "#",
	},
	
	youtube: {
		name: "YouTube",
		link: "http://www.youtube.com/results?search_query={search} Trailer",
		icon: icons.youtube,
		scanURL: "youtube.com",
		},
	
	google: {
		name: "Google",
		link: "https://www.google.com/search?q={search}",
		icon: icons.google,
	},
	
	google_im: {
		name: "Google Images",
		link: "https://www.google.com/images?q={search}",
		icon: icons.google,
	},
	
	rotten: {
		name: "Rotten Tomatoes",
		xpath: "//h1[@class='movie_title']",
		link: "http://www.rottentomatoes.com/search/full_search.php?search={search}",
		icon: icons.rotten,
		scanURL:"rottentomatoes.com",
	},
	
	wikipedia: {
		name: "Wikipedia",
		link: "https://en.wikipedia.org/wiki/Special:Search?go=Go&search={search}",
		icon: icons.wikipedia,
		xpath: "//*[@class='title']",
	},
	
	separator2: {
		name: "Separator",
		icon: icons.separator,
		link: "#",
	},
	
	torrentz: {
		name: "Torrentz",
		icon: icons.torrentz,
		link: "https://torrentz.eu/search?q={search}",
	},
	
	demonoid: {
		name: "Demonoid",
		icon: icons.demonoid,
		link: "https://www.demonoid.me/files/?category=1&subcategory=All&language=0&quality=All&seeded=0&external=0&query={search}&uid=0&sort=S",
	},
	
	tpb: {
		name: "ThePirateBay",
		icon: icons.tpb,
		link: "https://thepiratebay.org/search/{search}/0/7/200",
	},
	
	kickasstorrents: {
		name: "KickAssTorrents",
		icon: icons.kat,
		link: "https://kat.ph/new/?q={search}&categories[0]=movies&field=seeders&sorder=desc",
	},
	
	orlydb: {
		name: "OrlyDB",
		icon: icons.orlydb,
		link: "http://orlydb.com/?q={search} xvid -internal -french -german -polish -swesub -spanish -flemish -dutch -medius -hungarian -italian",
	},
	
	separator3: {
		name: "Separator",
		icon: icons.separator,
		link: "#",
	},
		
	opensubs: {
		name: "OpenSubtitles",
		icon: icons.opensubtitles,
		link: "http://www.opensubtitles.org/en/search2/sublanguageid-eng/moviename-{search}",
	},
	
	podnapisi: {
		name: "Podnapisi",
		icon: icons.podnapisi,
		link: "http://www.podnapisi.net/ppodnapisi/search?tbsl=1&asdp=0&sK={search}&sJ=36&sY=&sAKA=1",
	},
		
	separator4: {
		name: "Separator",
		icon: icons.separator,
		link: "#",
	},
	
	am_us: {
		name: "Amazon (US)",
		xpath: "//b[@class='sans']",
		icon: icons.amazon,
		link: "http://www.amazon.com/s/?url=search-alias%3Ddvd&field-keywords={search}",
		scanURL:"amazon.com",

		validPage: function(pageTitle){return (pageTitle.indexOfAny(["DVD:", "movie info:"]) > -1);}
	},

	boxoffice: {
		name: "BoxOfficeMojo",
		icon: icons.boxofficemojo,
		link: "http://www.boxofficemojo.com/search/?q={search}",
	},
	
	imdb: {
		name: "IMDb",
		link: "http://imdb.com/find?q={search};tt=on;nm=on;mx=20",
		icon: "http://imdb.com/favicon.ico",
		scanURL:"imdb.com",
		xpath: "//*[@class='header']",

		validPage: function(pageTitle){return (pageTitle.indexOfAny(["(VG)"]) == -1);},

		getTitleFromTitleNode: function(titleNode){
			var smallNode = selectNode('.//small', titleNode);
			if (smallNode != null)
			{
				var a = selectNode(".//a", titleNode);
				if (a != null)
					return $T(a);
			}

			return $T(titleNode);
		}
	},

	metacritic: {
		name: "Metacritic",
		xpath: "//td[@id='rightcolumn']/h1",
		icon: icons.metacritic,
		link: "http://www.metacritic.com/search/all/{search}/results",
		scanURL:"metacritic.com",

		processTitleNode: function(titleNode){
			var node = document.createElement("span");
			node.innerHTML = titleNode.firstChild.nodeValue;
			titleNode.replaceChild(node, titleNode.firstChild);
			return node;
		},
	},
};

var UserSites = {};

/*
	IMDB Links

	1.7.10
	6 March 2011, 4:35pm

	Developed 2005-8 by Adam Vandenberg
	Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
*/
// #region Class support
// Adds items from props to obj.
function _extend(obj, props){
	for(var key in props){obj[key]=props[key];}
}
// #endregion

// #region String support
_extend(String.prototype,{
	important: function(){ return this.replace(";", " !important;");},
	trim: function() { return this.replace(/^\s+|\s+$/g, ""); },
	template: function(vars){
		return this.replace(
			/\{(\w*)\}/g,
			function(match,submatch,index){return vars[submatch];});
	 },
	endsWith: function(suffix){
		var lastIndex = this.lastIndexOf(suffix);
		return (-1 < lastIndex) && (lastIndex == (this.length-suffix.length));
	},
	removeSuffix: function(suffix){
		return (this.endsWith(suffix))? this.substring(0, this.length-suffix.length) : this;
	},
	after: function(s){
		var index = this.indexOf(s);
		var length = s.length || 1;
		return (-1<index) ? this.substring(index+length) : this;
	},
	indexOfAny: function(charsOrStringList){
		var index=-1;
		var s = this;
		foreach(charsOrStringList, function(token){
			index = s.indexOf(token);
			if (-1 < index) return true;
		});
		return index;
	},
	escapeHTML: function(){
		return this
			.replace(/&/g, "&amp;")
			.replace(/\"/g, "&quot;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");
	}
});
// #endregion

// #region Collection support
function foreach(stuff, f){ for(var i=0; i < stuff.length; i++) if (f(stuff[i])) return; }
function foreach_dict(stuff, f){ for(var name in stuff) if ( f(name, stuff[name]) ) return; }
function collect(f, stuff) {
	var list = [];
	foreach(stuff, function(item){list.push(f(item))});
	return list;
}
//#endregion

// #region DOM & Events support
function $(o) {
	if (typeof(o) == "string") return document.getElementById(o)
	else return o;
}

function hide(id){
	var e = $(id);
	if (e) e.style.display = "none";
}

function addEvent(elementID, eventName, handler, capture){
	var e = $(elementID);
	if (e) e.addEventListener(eventName, handler, capture);
}

// Extract the text from the given DOM node.
function $T(node) {
	var aNode = $(node);
	if (aNode == null) return "";

	function extract(n){
		var s = "";
		if (n.nodeType == 3){
			s+= n.nodeValue;
		}

		foreach(n.childNodes, function(child){
			s += extract(child);
		});
		return s;
	}

	return extract(aNode).trim();
}
// #endregion

//#region Xpath Support
function selectNode(selector, rootElement){ return xpath(selector, rootElement, null, true); }
function xpath(selector, rootElement, f_each, firstOnly){
	var results = document.evaluate(
		selector, rootElement || document, null,
		XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

	// If we have a callback function, run it on the results
	if (f_each != null){
		while(result = results.iterateNext()) { f_each(result); }
		return;
	}

	// If we're only getting the first result, do that
	if (firstOnly){ return results.iterateNext(); }
}
//#endregion

function stringify(){
	var q = [], output = [];
	foreach(arguments, function(item){q.unshift(item);});

	var item = null;
	while (q.length > 0){
		item = q.pop();

		if (typeof(item) == "function")
			q.unshift(item());
		else if ((typeof(item) != "string") && (item.length != null))
			foreach(item, function(item){q.unshift(item);});
		else if (item != null)
			output.push(item.toString());
	}
	return output.join("");
}
function Maker(label){
	return function(){
		var s =  "<"+label+">"+stringify(arguments)+"</"+label+">";
		return s; } }

var Html = {};
foreach(['table','tr','td'], function(item){Html[item]=Maker(item);})

function rowify(row /* array of cells */){
	return Html.tr(collect(Html.td, row));  }

function Table(rows){ return Html.table(collect(rowify,rows)); }

Html.Select = function (name, selectedValue, options){
	var s = '<select id="{name}">'.template({name: name});
	foreach(options, function(option){
		var selected = (option[0] == selectedValue)?' selected="selected"':"";
		s += '<option value="{value}"{selected}>{caption}</option>'.template({value: option[0], caption: option[1], selected: selected});
	});
	s += "</select>";
	return s;
}

function addCSS(){
	for(var i=0;i<arguments.length;i++) GM_addStyle(arguments[i]);
}

function addImportantCSS(){
	for(var i=0;i<arguments.length;i++) GM_addStyle(arguments[i].important);
}

function NameValue(n,v){ return ' {n}="{v}"'.template({n:n,v:v}); }
function FormValue(n,v){ return '<input type="hidden" name="{n}" value="{v}" />'.template({n:n,v:v}); }

/// Creates new Site objects.
function Site(definition, key){
	_extend(this, definition);
	this.id = key;
}

_extend(Site.prototype, {
	icon: icons.noFavicon,
	insertBreak: true,
	validPage: function(pageTitle){return true;},

	canLinkTo: function(){
		return (this.form != null || this.link != null);
	},

	GetForm: function(movieTitle){
		if (this.form == null)
			return '';

		var s = '<form method="post" style="display:none;" action="{action}" id="_md_{id}_search">'.
			template ({
				action: this.form[0],
				id: this.id
			});

		foreach_dict(this.form[1], function(k,v){s += FormValue(k, v=="*" ? movieTitle : v);} );
		s += "</form>";
		return s;
	},

	GetLink: function(movieTitle){
		var link = this.link.template( {
				search: encodeURIComponent(movieTitle),
				form: "javascript:document.forms['_md_"+this.id+"_search'].submit()"
			} );

		var html = this.LinkTemplate.template( {
			href: link,
			name: this.name.replace(/\s/, "&nbsp;"),
			icon: this.icon
		});

		return html;
	},

	GetHTML: function(movieTitle){
		var html = '';
		if (this.form != null && this.link==null)
			this.link = "{form}";

		if (this.link!=null)
			html += this.GetLink(movieTitle);

		if (this.form != null)
			html += this.GetForm(movieTitle);

		return html;
	},

	processTitleNode: function(titleNode){return titleNode;},

	prepareToInsert: function(titleNode){},

	getWhereToInsert: function(titleNode){return titleNode;},

	getTitleFromTitleNode: function(titleNode){return $T(titleNode);},
});

function setPreference(event){GM_setValue(this.value, this.checked);}

function removeBrackets(movieName){
	do {
		var bracketIndex = movieName.indexOfAny("([");
		if (-1 < bracketIndex) movieName = movieName.substring(0,bracketIndex).trim();
	} while (bracketIndex != -1)

	return movieName;
}

function removeSuffix(movieName){
	foreach([" - Criterion Collection", " - Used", " - The Complete Collections"], function(suffix){
		if (movieName.endsWith(suffix)){
			movieName = movieName.removeSuffix(suffix).trim();
			return true;
		}
	});

	return movieName;
}

function GetSitePref(siteID){
	var siteName = Sites[siteID].name;
	var checked = (GM_getValue(siteID, true)) ? " checked='checked'" : "";

	return ( "&nbsp;<input type='checkbox' name='_md_pref' id='_md_pref_{siteID}' value='{siteID}'{checked} /> <label for='_md_pref_{siteID}'><img src='{icon}' width='16' height='16' border='0' /> {siteName}</label>".template({siteID: siteID, checked: checked, siteName: siteName, icon: Sites[siteID].icon}));
}

function GetNewPreferenceRow(totalRows, rowNumber){
	var row = [];

	for(var col=0; col < 4; col++){
		var realIndex = col*totalRows+rowNumber;

		if (realIndex < site_names.length){
			row.push(GetSitePref(site_names[realIndex]))
		} else {
			row.push("");
		}
	}

	return row;
}

function CreatePreferencesPanel(prefs_div){
	prefs_div.innerHTML="";

	var s = "<div class='_md_centered'><div id='_md_wrapper'><div id='_md_title'><b>IMDB Links</b> <a href='http://adamv.com/dev/grease/moviedude'>Home Page</a> &bull; <a href='mailto:Movie.Dude.Script@gmail.com'>Contact</a> &bull; <a href='https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=paypal@adamv.com&amount=&return=&item_name=Buy+Me+a+Beer'>Buy Me a Beer</a></div></div></div>";

	s += "<hr id='header-shadow'><div id='_md_wrapper2'>";

	s += "<b>Display as:</b> ";
	s += Html.Select("_md_display_type", GM_getValue("linkStyle", "0"),
		[["0", "Icon &amp; Text"],["1", "Text &amp; Icon"],["2", "Icons only"],["3","Text only"]]);

	s += '<br />';

	var linkStyle = GM_getValue("linkStyle", "0");


	var table = [];
	var number_of_rows = Math.ceil(site_names.length / 4);
	for(var row=0; row < number_of_rows; row++){
		table.push(GetNewPreferenceRow(number_of_rows, row));
	}

	table_html = Table(table);
	table_html = table_html.replace("<table>", "<table id='_md_link_table'><caption>Show links to these sites:</caption>");

	s += table_html;
	s += "<br /><div id='_md_version'>Version 1.7.10</div><button id='_md_close'>Close &amp; Refresh</button></div>"
	s += "<hr id='footer-break'></div>"
	prefs_div.innerHTML = s;
	document.body.appendChild(prefs_div);

	AddPreferencePanelEvents(prefs_div);
}

function AddPreferencePanelEvents(prefs_div){
	addEvent("_md_close", "click", function (e){
		hide("_md_prefs");

		var md_links = $('_md_links');
		md_links.parentNode.removeChild(md_links);
		LinkEmUp();
	});

	addEvent("_md_display_type", "change", function(e){
		var select = $("_md_display_type");
		GM_setValue("linkStyle", select.options[select.selectedIndex].value);
	});

	xpath("//input[@name='_md_pref']", prefs_div, function(box){
		addEvent(box, "click", setPreference);
	});
}

function ShowPreferences(){
	var prefs = $("_md_prefs");
	if(!prefs){
		prefs = document.createElement("div")
		prefs.id = "_md_prefs";

		CreatePreferencesPanel(prefs);
	}

	prefs.style.display="";
}

function getSiteBeingViewed(){
	var whichSite = null;
	foreach_dict(Sites, function(key, site){
		if ( -1 < location.host.indexOf(site.scanURL)){
			whichSite = site;
			return true;
		}
	});

	return (whichSite && whichSite.validPage(document.title)) ? whichSite : null;
}

// -- Main code
function LinkEmUp(){
	// Convert site definitions to site objects.
	foreach_dict(Sites, function(key, def){
		Sites[key] = new Site(def, key);
	});

	// Add any user supplied sites.
	foreach_dict(UserSites, function(key, def){
		Sites[key] = new Site(def, key);
	});

	var whichSite = getSiteBeingViewed();
	if (whichSite == null) return;

	var LinkTemplates = [
	'&nbsp;&nbsp;&nbsp;&nbsp;<a href="{href}" title="{name}"><img src="{icon}" width="16" height="16" border="0" />{name}</a>',
	'&bull;&nbsp;<a href="{href}" title="{name}">{name}</a>&nbsp;<a href="{href}" title="{name}"><img src="{icon}" width="16" height="16" border="0" /></a> ',
	'<a href="{href}" title="{name}"><img src="{icon}" width="16" height="16" border="0" /></a> ',
	'&bull;&nbsp;<a href="{href}" title="{name}">{name}</a> ',
	];
/*
 	LinkTemplates = [
	'&bull;&nbsp;<a href="{href}" title="{name}">{name}</a>&nbsp;<a href="{href}" title="{name}"><img src="{icon}" width="16" height="16" border="0" /></a> ',
	'<a href="{href}" title="{name}"><img src="{icon}" width="16" height="16" border="0" /></a> ',
	'&bull;&nbsp;<a href="{href}" title="{name}">{name}</a> ',
	];
*/
	Site.prototype.LinkTemplate = LinkTemplates[parseInt(GM_getValue("linkStyle", "0"))];

	var movieName = "";
	var titleNode = null;

	if (whichSite.xpath)
	{
		titleNode = selectNode(whichSite.xpath);
		if (titleNode != null) {
			titleNode = whichSite.processTitleNode(titleNode);

			movieName = whichSite.getTitleFromTitleNode(titleNode);
		}
		else return; // abort if the xpath gave us nothing
	}
	else
	{
		movieName = document.title;
		titleNode = document.createElement("div");
		document.body.insertBefore(titleNode, document.body.firstChild);
	}

	if (whichSite.getTitle)
		movieName = whichSite.getTitle(movieName);

	movieName = removeBrackets(movieName);
	movieName = removeSuffix(movieName);
	movieName = movieName.trim();

	var s = "<a id='_md_config' class='_md_config' title='Configure IMDB Links'><img src='http://i.imgur.com/fVc2s.png'></a>";

	foreach_dict(Sites, function(key, site){
		if ((site == whichSite) || !GM_getValue(site.id, true))
			return false;

		s += site.GetHTML(movieName);
	});

	whichSite.prepareToInsert(titleNode);

	var insertBreak = (!whichSite.insertBreak) ? "" : "<br />";

	var whereToInsert = whichSite.getWhereToInsert(titleNode);

	whereToInsert.innerHTML += ( "<span id='_md_links'>" + insertBreak + s + "</span>");
	addEvent("_md_prefs_link", "click", ShowPreferences);
	addEvent("_md_config", "click", ShowPreferences);
}

function runHomepageCode(){
	if ( -1 == location.pathname.indexOf('/dev/grease/moviedude/'))
			return false;

	var your_version = $('your-version');
	if (your_version != null){
		your_version.innerHTML = "(You have version 1.7.10.)"
	}

	return true;
}

addCSS("#_md_prefs { 	z-index: 1000; 	color: #444; 	background-color: #f8f4e8;  	position: fixed; 	bottom: auto; 	left: 0; 	right: 0; 	top: 0; 	color: black; 	font: normal 11px sans-serif;  	border-bottom: 2px #055458 solid; }  #_md_version { 	background-color: transparent; 	float: right; 	color: black; 	font-size: 10px; }  hr#footer-break { 	clear: both; 	padding: 24px 0 0 0; 	margin: 0; 	border: none; 	background: #f7e6ab url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn%2FAACA6QAAdTAAAOpgAAA6mAAAF2%2BSX8VGAAAAPUlEQVR42izGsQHDAAzDMJr%2FH9oDMnSwpQ7pBPB9PkKE2MZphJOe5IS1jbDSc7q25%2FBK1iG2K%2BT%2FSCvDbwBfPCu3pfivSQAAAABJRU5ErkJggg%3D%3D) repeat-x left top; }  #_md_title { 	color: white; 	margin: 0; 	padding: 5px 0; }  ._md_centered { 	background-color: #055458; }  #_md_title .version { padding-right: 1em;}  #_md_title a { 	color: #8DC5C7; 	text-decoration: none; 	font-style: italic; }  #_md_title b { margin-right: 3em; }  #_md_links, #_md_prefs, #_md_links a {font-size:10pt;font-weight:normal;text-transform: none;}  #_md_prefs_link {cursor: pointer;}  a._md_config { 	font-size: 10pt; 	font-weight: normal; 	text-transform: none; 	text-decoration: none; 	cursor: pointer; 	color: black; }  a._md_config:hover { background: #336699; color: white; cursor: pointer;}  #_md_prefs, #_md_prefs caption { 	font-family: Georgia, serif; 	font-size: 14px; }  #_md_prefs td { 	font-family: Helvetica, Arial; 	font-size: 12px; }  div#_md_wrapper { 	padding-bottom: 0.4em; 	margin: 0px auto; 	width: 700px; }  div#_md_wrapper2 { 	padding-bottom: 0.4em; 	margin: 0px auto; 	width: 700px; 	background-color: #f8f4e8; }  #_md_prefs button { 	border: 1px solid #0080cc; 	color: #333; 	cursor: pointer; 	background: #FFF; }  #_md_link_table td { 	padding-left: 1em; }  #_md_prefs caption { 	padding: 1em 0 0.5em 0; 	text-align: left; 	font-weight: bold; }  hr#header-shadow { 	padding: 24px 0 0 0; 	margin: 0; 	border: none; 	background: #f8f4e8 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn%2FAACA6QAAdTAAAOpgAAA6mAAAF2%2BSX8VGAAAAOklEQVR42izIsRHEQAyAQEDqvxH35RYc3gd%2FEcz2vU8cQtM6FJTu%2F9t0Oty64QSbFmw016Zj1wv6DQBlzgkFTlSeZgAAAABJRU5ErkJggg%3D%3D) repeat-x left top; }");

GM_registerMenuCommand("IMDB Links Settings...", ShowPreferences);

var site_names = [];

if(!runHomepageCode())
{
	LinkEmUp();
	foreach_dict(Sites, function(key,value){if (value.canLinkTo()) site_names.push(key);});
}