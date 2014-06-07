// ==UserScript==
// @name           BrowserBot
// @namespace      http://www.kylepaulsen.com/
// @description    A bot that performs web tasks based on rules you give to it
// @include        *
// @version        1.32
// @license        http://www.gnu.org/licenses/gpl-2.0.html
// @copyright      Kyle Paulsen
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js
// ==/UserScript==

// Don't Run in frames
try { if(self != window.top) return; }
catch(e) { return; }

var step_count = 0;
var current_step = 0;
var last_step = undefined;
var running = false;
var timeout;
var alarm_count = 0;
var sound_data = "data:audio/wav;base64,UklGRmRRAABXQVZFZm10IBAAAAABAAEAgD4AAIA+AAABAAgAZGF0YUBRAACDgX9/fX+AgX9+fX19fX18fX98ent+ho+WmJOLgXhxb3B1fHx9f4B/gICAfXl2dnmAipafpqSVgWteXmhze4GBhISEhIB+end2dnyCi5SgqqSUe2BUWmt8hYmHh4SCgH57eXRzdXqBiJKcqaqhhWNSUmV7h42Mi4Z/ent7eHVwcHR7hY+bpL3Lkl05QV92g4iNjYmAfXt8fXp0c3V9hI6VmaTUsGs+L1ZwgoaOiYuFgH6Bg4B5dnV5fYSKkY+v0pBZMj5keoyVlYuJfnp6goR+dnVwdX6IjpKSs8uIVTdMb4aTkYZ+e3N4foiHgHd3dHl+iIuSlrvNiVc5UW+CkYt7cHR1fYSNioR6d3F5houMkpfLtm1IPmtvg4eFc3R5eICIkZCJf3dud4OHkY+z1ohXNVh1coCDfnJ+fIKEkJSPhX1yb32Dh4yT1K9nQz9yeneAhHN1eX2Cjp2ejX9xa2yChIqFqtySXT5TeXx1fHhueX6EipiimIJ0aWhziYeLhrjQhFc/XX15eXpuanh/g46go5Z/cWptfIWBhIu+yYJaQWZ0c3t2aWuCg42XpaGReW1jbHuCgomRx757Vkhta3p8eW55hICIlJ6cinhrYXB4fYOLotmmck9ZdG14dXVvfnyCiJieloJzY2FzgYSPk8fRhmBFZ29sdHt2dH58goqZm419cmhrgoaLiqLYp29NTG9ucHh7b3V8gIeTop2MfWxib4SFi4i20Y5hRlRxcnZ/dXB7goaNl56WhndnZneFhoyQv798Vz9deXyEfm5sfIKJkpyekoJwYmd6gYSNms22dlJBanR7gXVpcIGCjJWgm4x8bmFufYSMkqvRmGlET29xf3pxaHt+gouZoJyLfmphcH6CjpbIxXtaQGJvdX16bG59gYqUoKGXh3NeYXd+iIyt15pmRkxuc3qCem12foSLl5+ej4JqW2p+g4qPxsN9Wkdgd3p/gW9sd4CFj5uhmox4Xltwf4aNo9Snbk1JaX5/g3pmbXeCiZacoJOHb15leoGJkLzLh1xEVnV9gIRvZnB6g4+coJ+SgGhbbH6FjaDOsG5QRWV3eYJ7Z2x7hIqWn6GainhdXHJ9iJG40I5eR1Nyd4CFd2ZyfIWNmJ6bkYFvWWZ3goye1LdyUUppenqEhG5pcnuDj5mblYx9ZltzgI6TvNCMWEVcdnl7h3lmaHN/h5WenZWHdmBnfoiPo9asZ0VHanh5goZuZ2x4hpKdoJuPgW5gc3+Kkr/JfU0+WnZ8fo5+a2pxfImZoZ6XiXtkY3aBjaLRqGJDSmx9fIeKc2hteICPnaCWi35xX3F+jZXBzYJPPVl4fH+NgGtlcHaElJ+akoV/bWt7ho+k16lhPUhygHmDhXJoanN7ipqfl5GGfGl0gIuUxst5RDVbgH97iXxvanF3hJGfnJWLg3VvfIaJptSXUTJHdYiBhYd0bWxzeo2aoZmPhH5tdX6GjsS9az46aIeLg419bWhtc3yQnZ+Uh4J3cHuEiavSk042Un2OhYaCbWdlbnSGmaObjYaDeHyFipHAt2o/QGuKh31/b2VlbXaBlqWkmIqFend8hIiix5dSOk96iYCBemhpcHh+j6CknouAe3d4fYSLwLhtPz9qjIiCgW9pcXV6g5OdnpGBfXh4eoiMrcSLUTxXgY6BgHZqbXN2eoaZn5mHf3t6fYSOnsmnZDpBb4yGf3tqa29zdoCQnJ2SgoGAgoSQlru4ckExXIaTgn5wbHJxdHuKl5yZioKCgISMlae8i1AwR3iWjIJ3a3BvdHmDkpuZkoKBf4KDjpq6pWc8NmWQmIaAbGxxdHd/ipSTkoWAgIWHi5Wyt3lLL1CFnI+DdGlrb3R8hZCUlI6EhIOHipSkvpJbOTpsl5eIe2Vka3R6ho2TlJaHg4GFipKcsKRtRzVNf52XjXJfZG92g4ySmJ+dkIZ+fYGFh4p+bV5cb4uMi4FvaXN7goiMkJWblpKKg3hvaG11gIB7fI2PhoFvY2dyeYOIjpKcmZKOioJ4b2xze4SBfYOOfXlyZmRweH6DjJeepJqSjIN3bmtzfYSCfnuEfG5taGp0gYSGh5OcpaCTi4N4bmtwdHh9fn+Dh3pzbWlueoKJjJOdoqKRhHtzbWttcHaBiYuIh4F4c29rcXyDi5CXmpyShH93cG5wcnZ/jI+MhYF3c3BsaXF8h5GYmpuZiYB7cW5xdnuAi46IgXtzcnV1cXF6hI6VmpmZkYeBdGdma3eCi5KMhHtzbXR6eXd8hIuRk5GSlIyFempiZG98ho+QjIV6cnB6e3h6g4qQlJKOjoiDfXBjY2t3goyVkouDd3B2fHt5fYaNkZGMiYiEgnpsZWpyfoiRk46HfXBweHp3eoKKk5WQioWEgX9zaWhve4aLkIyIfnNudn9+fICIkJaVioGAgYF9cWtrdICHi4uJgnlwdH6BfHyDjJOWkIV/fX99dGtobHqGjY+MiYB2c3t+fnuFjJKSjoR8ent9enNtbniDio+OiYR8dXh8fHl/h4yRj4eAfXx9fXhvbXN8hoyNioR/d3d8fHx9hY2PjouCfnt8fXl1cHB3goiMioV/fHh8f3+AhIuMjImCf318f355c21ueYWLi4qFgXt8f4B/gIWLjIqIgH15enp5dnNyeISLi4qFgHt5foKCgYSIjIqFgH57enp8e3h1dn2FiIeGg398fYCAf4CEiouJg4B/e3l4dnd3eH2DiYmFgHx8foGCgYCDiYyMhoB9e3d3eHl9enuAhYeGgXt6foKEhYKBhImKh4OBfnp3dHZ6eXh8g4iIhoF9fH+CgIGChYqMiIN9fHp3dHd7fXx9goeJhoF8en+Dg4OCgYWIhoN+fX97eHh6fXx7foOJiIV/fX2BgX9+f4OKioaBfX18d3Z3e4B+gIOIiIV+e3x+goKBgIKHi4mEfXt7enh4en5+fYCDh4eCf3x+goKBgYGDiIqIgnp5eXd3eH2Af4KEh4aFf319gIGBgIGDhIiHg3x4eXh3eX2BhIKChYSCfn19gIKBgIOCgoSFhH99fXp3d3t+g4OEg4SCf3t8f4KCgoGCg4KEhYJ+fHt3dnp/hIWDgYKBf3x7gISFg4KChIKDhIF/fH17eHp9gYSFg4CCgoB9foKDgoCAgoSEhIOBfHp5eXp7gIKGhIKCgH17fH+EgoOChIWDgoKAfnt7e31+foKEgoCAgH57e36EhIKCgoWEg4KAf319e3p9fYCDg4KCg4F9enyBhoKBgYSHhYF/fXx7fHt9gIGEg4F+gH99e36Fiod/e3t/gYCBgX58eXV4f4qRkoyEfXl3fH+DhIJ6d3d8gYWEgn13c3eBjJWZlIp8eXt6dW5sdoCEgHx9goJ/fX2CjJWal4+GgXhvZWNqc3p/hImFfXRzfoyZo6qnmo15YlVaaHJ1c3V9g4J9dnqFj5ihrbm8lWhGQlptc3R1eoCAfnx9gomPmqjEw45fQUhkeH56eHZ6enp2fYWRlpydwcqMXzZGZXd3eHh9gYCCf4CBhpGYl57SsnhJM1RpdnZ6fIF+fX2CiI6SlpKMlc6sdEk8XGt1dHt5f4CEhoWHh4SGiI2V1Lh9UTlSY3R4hIGEhIaCgoeLg4J+gX7Fw45iOlNidnuLg32Bg4aFioyAfH5+gMS/g1I6VGp8jJWIfoCBhH+Gh4eChHqUxZdtTlFobneGjoSFhIWCfICIkYKAebSwhl9OYWxyeIiIgH99fX2DiJOTh4GLw5V4S1Nufnt6gXt5gYN6e4KIjIuGiaLOj3ZJV296cXB6fIGLiXh0foaFhIOGpNCVflBhcXdsbHR1fo2OgX6Jh315gIKmzZZ1SGJweHB4dXeBjoqEfYmBgYGKhK3BiGFKZ3NzbnRyc4mWkYmDiISEf4aAu7iBWVFpcW1vdm9wh42NiIuOk4qFhIzFnGxHVXF9d3p5bG2DhoiEjoyUhoyHrMKEXzpfcn1wfHpzeoyIhoGNi5CBhYXEsHhVP2x3fm57cnJ6kYqIi5aSjn56ic+WcENCcXx+dn1wdIGZiYOHk5KOgnub1IxoMEpufHZ0dm93kZ2MiI+Tj4Z7drHLg2QvW3F9bnZta3KTloyLmpWUi3+Bx6pySTVmd4F4gHFqcY6JhYuXkZOOgZzRjms3SWp5eXyBcm1+joaEkZWTj4d8u7hxWDNkd4R2hntraISMhouamZeOgovMlGQ8NG17hHiLeW5xkI2DjZiVk5B+rM57XShDbX55eYJwbH2bkouZnZGPh33Ds2xQJ1VyhHmAeGhphZmOjZ6fkZSDlNSTZDswX3aDfIh2aXKQkIaMnZaKkIG5xXdeL05qfXiAhnBqe5aPiZWdjIiGkM2aZkcwYnWDfI+Gc2qEjYaIm5yOj4WyxHJYLj9pfX5+kIVzc4+MiI2gk4uFjMuqZE4sU2+Ad3+JfW9+jomJlaWQkIKpzYFaOzhjeYB3hoR2bYWMi4ucm4qKh8m8blQvSGp9eYCJf29zjIyKjJ2Qi4Og1I9eQDdfeoV4hYZ5a36MjomTm46Kgr68b1M0S22BfXyLhHZxhouPipyTkIGX0ZZdQThbc4N7gol/b3yKjZCVnpCKfLjGd1Q1R2d9gHeChHhwhIiOj5qXkYaQ0aRkRTNYcYSAfIF8cHaCiJCVnpSPfKzPglo2QWV7h3x9fXpwfoKJkZ2bk4qKz7FoRC1RboiIg4B9dHV/gY2UnpKUgqnRh1szOWB1h39/fn12gIOIkp6alI6JyLBrSCpNaoCFgX58dHaDgpCcpZaZh6bPiVoyMVhxiYOBe3Zwf4SIkaKdlZOQy7NuSipDZX6Hgn51cXWDg4yWpZiYi7LHhVg3Nll1iomFfHFufYGEjZ+fmZOUyqxtSC5DYXuMjIl9b3SDgYaOopeaia3Ih1w5M1FuhIuKg3dwg4iIi5qdlJKQyaxvSTA/XnuKi4h+cHSHg4iNoZiajK/Kh143MUxrgoqLhXlugYWGjJiflZGNybJ0UDBCXXiHiol/cW+CgIqRopeYiK7Ni2A5OFNrhIqMhn1seX2CipqclpCTz6luSTZKX3iIi4uFdHCAfYeNnJKXirrJf1c6Q1hsgYyOh31ueYCGjZiWkZCY1KJoRTlMYHaJjYyCcnB/g4yRmo6Vi7zLglU2QVZrgY6Nhnhsd4GHj5iUjpSZ1a1uSTZJXnWFjYqAcXJ+foeQnY6Vi7LSjGI8PVZof4mNhXlteX2Ci5qYj5CS0rByTDJMYXmFjYmAcXF9e4eQn4+VirfPh140O1hsgoqQiH1ufHmAiJyZkpCY1qtwSDFLYXaEi4uDc3N9eYaSpJKUh7zMhl05P1ZqfYiLhXluenl/jKGdkI6Y2KxuRzZLYXiHiomAb3F+eYaTo46QiLjTjF89QFhsf4aJhntuenyBipyZiYyV1K5wTDZOYnmHiYqDcm9+fYmUpY2OhrXPhlw7PVhsgoeLiH1tfX2Di52ZjY6a16psRjJKX3aFi4uEdHSAfIaSpZKTiMHFfVM5RFttgIeHg3pxf32CiKCdk4+e1aBpQTlNYXWIjImDdHd/eoSRpZSUir/IgFY5Q1ptg4qHgnlyfn+Eip2ZjYqV06psRTlPZHaHioaCd3iAeYWRpJOUh73IflI1Ql1whIqJgnl0gX6Ci6CajoiW1ahqQzRPYneFioqBdnqCfYaSpJCTicDNgVMtO1xwhIqKgXdugn+FjKCbkoub16NmPjJRZ3qHiYV9cnqFfYSPopOWisPLglIyPlxyhIuJhXlvf3x/iKCckYuY1aRpQjJPaH+KhoZ9cXqHgIeQn42Phr7OglMyPFlyioyHhHhwhIGAh52ak42b1aNjPDJLZ3+MiISAcXmIgoeTopGQhbjLg1c1O1dthouIhHhuf4KEjqOckIqV1KdmQTBMZn+Oi4R8bXOCgYuWpI+Qhr3PhFUzPFlvh4yFgnlygoGDh5uXjouX1q1rQTBOZoCPjoR8bXSEgYiWpI+Pg7XOiVgxO1duiI6LgHdtg4WGi5qWjIuV1rFtQS1IYXyNjYZ9bnOFhIyUo4+RhbTNh1c0O1puhIqGf3RtfoKHj6GbkIyU1bFtRC1HX3iKi4iAcHCBgIuVpZGSh7XRilg1OllviYqGfXNpfoSKkZ+bjIqR0LNuRi5IYnuMi4h+cHKAgIqVo5GTiLHRjVozMlJphYqMhHltf4SIkqGbiYmNzbd0TC1DWneIiIZ/cHKEhI6Zp5STiK3QjVs0MFFpiIyLg3VreoGEjqCgkY+QzbhySi1GX3mHh4Z+c3ODgIiVpZKQhKzUlF44M1Vth4qJgnhrd3+CkKSkkYuMzLVtRStEYn2PioiAc3KCgIaUo5WRh6/YkFsyL1FphoqJhXxvfYOEjp6iko+LyLhvSS5FYnuJhYV9cW+DhIyWpZaRh6PXmF43LlBqhImJh3tud3+Bj5+hkZCKxcV3Tik/X3qKhYd8cW+EhYqXopOMhZfVo2U9K1Jrh4aIgntveIKCj52hk5OIvcZ5UCc6Xn2NiIl/dG6AgYqVpJmViZjSoGQ7Kk5oh4aGgXlteYaEjpmfkpSLv8p8USo5XXqOhYV7cm6EgomSoJmTjZjTp2dAK01riIiCfnVueYeDjJmhkZKItdCEVi4zWXmQh4V8cW2AgoaSoJmQjpPRs2tGJkZoiYuFgXZsdoeFjpigj5KHrNOMWzAwWXaRh4d7cGmBhYiSoZuPj4/LuG1JJURlhoqGhHZqc4eDj5mhkpOJq9WRXDQuU3GMh4h+cml/hoiQm5mQkZDMvXBKKEJjhI6Fg3Zqb4eFjpWfk5OMqdiWXjUrUG+MiYd/dGt9hoeOmpqPk4/HxXhMJjpdgI2Gg3dsboaIkZagk4+Kn9igZDomS2yNiYd/cmh5homSm5yRlI3DyntPJDVaf5CHhHltbIOEjJWglZSOndelZT0nTGqJhoN+dWp4hIeSmp2Pk4q+zX9TKTdcfI6HhHpuaoCCjZSglpOOm9anZzwmS2qJioaCd2p3hYaRmJyMk4q60oZWKTNYd4uIhntwa4KFjJWglpGRltKwakEiR2iGiYaCdml2hYaRmZ6OlIuz145bLSxTcouFh31wan6Di5SdlpCSktC9cksjP2SEi4aCdmlwg4aSl6CQlIup2JZiMSdSdI6IiX1xan6EiZCamJGVkMzCdkwgOmGDi4aDeGxziIiPlJuPlIul151kNiRPcIyHhn1xa4CGipKam5GVi8PJe08hM1x/joeEeG5zhoWNkpuQk4+g2qlnOyJLa4iGgn10bn2HiZCYmo6SirzRg1gnM159jYODeG5tgoWOk5yTj4+X1LNtRCBFaIiIiIN3a3eFiY+VlouTi7PXjl4tLll5jIKEem9ug4iQlJqSjpCRzbhwSSRFaYeIhIN2aXGFipCVl42Wj7DXkl8yKlV0i4WGfnFrfoeMkpeQjZSTz8R3TSRCZYOIgoF1aXKGiZKTl46UjqnYmmA2KVZ1jIWDe3BqeoWLkZaVjZWRycl7UCU6Yn+Kg4J4b3KEh4+TmI6QkKLapWU6JlBxioOCfHFqeomNlJiWi5OLwNKBVCU2YX+KgoF3cG6Ah42TmZKUlJ3armY6IEtuiYaEgXdsdYWKkJWWjZSMutmLWCUvXHyJgIN7cm6Ah4yQl5GSkpjWvG5BH0htiYeBfnZvdYSIjpOYj5SOsdmTXCwrXHqMf4B8cm5+hIqOl5SPlJLPxHVIIEFphoiAgHZucoSJkJKWjpSNrd2cYC8mWHeLgYB6c21/iYuPlJSRlpTPxHRHID5ohYiAf3hyc4WHi4+Vj5aSqN2iYTQjUXKIgYB9dnB9iYqOk5SNk4/I0IBQJDZjgYp/fnVxc4WKjZCVj5GSoNquZzkhTXKKhYF7cm98ioqKj5OOlpG81YhXKTJhfop/fnhzc4WJioyTj5CRmdO6cEUjSm2IhIB9dm93iIqOkpSNlI+v15RaLCtce4uAgHdxcIOMjI6Tj4+UlszFdUkiQmuEhH1+dXF3i4qLj5WPlJKn159gNChXd4yAf3lxbX+Ki4+Sko6VlMrPfEsjPGiEiH59dG5ziIuMjpKOlJOm3KhgNCRXd46CfXdvbHyMi46Rk5GXksTRfkskOGWBi319dnFziImKi5ORlZOi3K5iOSROcYmEfnpxbHmMjJGTlo6Uj73Wh08pNWJ+in17cm9xhIyLkJWSlJef2bZnOiNJb4iGfnpyb3aIiYyRl5CXkbbYj1cuMF15iH59d3Nyg4qKjpSSkJWY1L5vQiNFbIWIf3xzb3WIiYuQl5GWk7PYklYtLFp5ioF/eXVyg4uIi5KSkJeY0cNxQyNBZ4OHf312c3WJiIqOmJOWlK3cnVoxKVZ1ioJ/d3JvfoqJjZKVkZaWysx5SiM8ZoGIgH11cXWIh4mOlpGUlKfbpmA1KFN1iYN+eHRwfYmHjJCUjpWRxdJ/TSY6Y3+If352dHKHiIiNlZKVlKPZrGM5JVBxh4R/eXRweoqIi5GWkZeTvNSIUSo1X3qIf393dHKFiYaMlZKVl5/XtWg9J0pthIR/eXJweYqIipGWkZeUudaMVS4zXnmHf312dXOFiIWLlJWTl5zSvW1BJEdshIV9eXN0eYuIiY+WkpaTsNeVWjIuW3aIfnx1dXSDjIiMkpSSl5fJxnZHJj9ogod+fHRyd4iIiY6VkZaWqdmgXjYoVHKIgX13dHSCjIiKkJOQl5fHzHxNJjxjgIZ9enZ1d4iHh42WlJaVpdeoYDonUnGIgnt4dnJ/iYaLkZWRmZa+0YVSKzVfeoh8fHh1dYeIh42Uk5SYntKzZ0EnTG6Hg314cnF7jYeLkZWQmJWy05BYMjFbd4d9fXdzc4SJhYqSlJSanMu8cEkpRWiDg3x8dXF5ioeJjZOQl5Wu1ZheNy9XdIl+fnd0coGKh4mRlZWamcfAc0sqQGWAh35+dnN2h4eHi5OUmpes1ZteOC5VcYR/fXp3c3+IhYqQlJOZl8XHeE0sPmR+h358eHZ1hYaHjJOUl5mj06ZiPCxQb4aCfnx4dX2HhYmNkpOal7jOhFUxOmB6hHp8eHZ1g4eHjpOUkpmaybNrSS1LbIKAfH14dHqFhYiPlJGXlavRkVw4Mlx1hHyBfHlzgYaGjJCSlJqZxb1xTStHaIGAen96d3iHhYmNlJSZl6fRlVw5MVtzhXx+e3lzf4WFi5CWl52XvsJ4Ty1AZX2Ce356d3aEhIiOlZSZl6HNo2JBL1ZyhH56enhzfYaEio+WlZuUssmCVzM7Y3yGen16eHSDg4aNlJWWmZnIsGpKLUxsg4B8fnp2eoWFio6Vk5eVqM6SXzg0X3WEen58eXOBhYeMk5iWmZW9vHNQLUZqgIF7fXp1eIOCh4+Xl5qXoMqcYkAuWHGDe35+enV+hIKIkZmYm5W4w3tTL0FmfIJ6f3t3dIOEiIyVmJuXncilY0QtVHCDfn1+e3R8g4KIjpmZnJWux4VYNThjeYR4f355c4CDhoyUmpialcOzbUwtS2l/fHqAfXV4hIWJjpmZm5WjyJJfPDNcdIN5fX16cn6FhoyTmpibkri/d1UwRGl8fXeAfXh3g4KHjZiam5icyZ5lQi9XcIJ6fIB8c3qDgoqRm5udlLPEfFYzP2R5gHh/fXp1gIGEipebnJqYxqtpSC1RbIF6fIB9dHiCg4iRnZuflKnIiFs4OGB1gXiAf3t0fYCFipaempuTwrVuTi1KaXx8eYB+dXOAgomPnZ6elaHJkmA/NV1xgXd9gHxxeoGFipSfnJ6RtL54VjFFZXp9eoOAd3J9f4eMm52emJjHoGZFMVdugHh+gX1zeoKEiZOem52QrcOAWzQ9YnaAeYGAeXN+gIWKl6Cem5LBrmxNLlJrfXp7g351d4GBiJCenZ+Ro8iNYDo3X3J+d4CAfXN8gYaKl6Cdm463unVTMElnfH15g350c3+CiY6enp+TmMabZUMwW2+AeH+DfXB3f4KJlaGdnY2vwXtaMkFlen55g4J4cX2Ah4ybn52Wk8amaUkuVWyAeH6Df3F3gIOJkqGfn5ClxYZeODlgdYF5g4F4cX6AhoqboJ6akLyzb1IuTGh8fHyDf3JzgIKHkKCgnpKbx5ZlQDJbb4F3goN7b3p/hYuYop2cjbS8eFgyRmR4fnqCf3VwfYCIj5+hn5SUxaBoSC9YbH95gYN7bXR/hIiTop+djqjDhF01PGB0gHqGgXZtfYGIjJ2gn5eRwqxtTS5PZnx7f4V+b3J+goqVo6CejqLHjGA7NVpwgHyDg3puen6FipuloJuOurl2VS1FYnh+foV/cm99gIqRoaCgkpvImWZEM1dsfnuBhHtsdX2DjJikoJ2MsL98WzRAYXaAfIWBdGx5gImQoqKdlJHEp21LLU9mfn2Ch35ucXyCi5Wknp2Mp8aHXjY4XnKAe4aCd2x6gIeOnqOdmI68sXFTLUlken2AiH9wcHuAi5SjoKCQnMaSZT4yWGuAfIaDeGx1foWPnKWemYqyvXtcL0JgdHx9h4Bzbnp/ipGhoZ6SksSjbUovVGh+fIKEe21ze4OMmqSdm4qnxIdjNztec358hoJ2bnl+iI+foZyVi7ywc1MtS2V8fYCFfW5xe4KLlqSenIubxZNnPTNaboF6hIJ3bXZ+h42do52Yi7G8elotQ2B4gH6Hf3JseoKLlKOem4+TxaJtSS1TaX95goN5bHOAh46cop6YiqjEh2I1Ol1zgHyIgHRpeH+LkaKgnJKNv7B0UCxMZX19gYZ8bm98hY2Xo56bip3JlGg8MllugHuGgnZpdoGKkJ+inZaHsLt7Wy1CYnqAf4d8bm17hY6Xo56cjpLGpG5HLFJogX2Dg3hqcoCKkZyjnpmIqMSHYDI7XHaDfoZ/cGd4hI+VoaGbkYq9snZSK0tmfn6Cg3lqb3+IjpmjnJqKnMiXaDsxWG+DfIWBdGd2g42Tn5+alIazvn5cLUNie4B/hXxrbH2HkJahnpqMkcWkb0YsUmuCfoWDd2ZygYuSnKKbloekx4tkMTlddoR+h31vaHyHj5Sfn5qQi8C0dlEoSWOBgYGEeGhugYuRmaKcmYmbyphoOi9XcIZ9hX9wZ3aEj5Odn5qSh7HDgVsqP199g4CFe2pqfYuRlqCdmIyOxKtxRyhQaYWAg4J0ZnOEjpOdn5qThaDLkmcyM1t1hX2GfG5pfIiQlZ6fmZGHubt8VCZHZICBgoN3Z22DjpOZn5yWiZLLom49KlVuh32EfnBldoeQlJyfmZGFq8uKXyo6YH2GfoV3aGiAjJOXn5yXjIrFtXVJIktohoGDgXJlc4eQlJufmZOGnM2cajQuWHaIfIR6a2V8jJOVnJ2WkIWzwoNZJj9jgYR/gnVnb4SQlJiemZKHisKwdkYlT22KfoF8bmZ5jZWUm5yXjoKcy5lpMjJceYd6gnZpa4KQlZWcm5OKhbnAgVQjRWaGgoCAcmZyipGTlZuXkYWRyqpxPSZXdIt8gXpsZnyNlZKXmpWNg6XPlGIpNGB/h3yAdGhrhZKTk5qak4mJv8F8TR9Ga4qCf3xsZnaNlpOXnJaOg5fQpWs3KVd1i3t/d2tof5KWk5mclIyEscyIWyQ3YoSGfYBwZ2+JlJSVnJqTiI/Ks3JDIkxui359em1nepCXlJaclY+EotKYYy4tW3yKeoB0amyGlJWRmZqTjIa9xX1QID5miIR8fnJpc42XlZSbl4+HksytbT0iUXSLfYB4bWuAlJeTmJuSjIGm0JFdKDBggIh6f3Jpb4uXlpKcmZGIhsC/eUodRWyKgH18b2h4k5eUk5qVkYSb0aBlMCZYe4x6gHVsaoSVlpKYm5OOhLTLg1QgOGiHhXx+cmlyjZWUkpqWkoaNy7RvQCBOdY5/fHlta32TmJKVmpSMg6TSlV0qK16Ai3t+dW1vipaUkJmYkImIvcZ7TSA/bImCentxbHeQl5OSmpSOhpLOrWw7IlR4jHx8dm5tg5WWkJaako2EqtGPWiYyZIOHeX1zbXGMl5SPlpWQio3Hu3JEHUlxin96enJufJGUkJCalpKHodSbYC0mXX2Me3x0cG6GlZWRlZmTjoe4yH5OITprh4R5e3Rvdo+WkZCZlZCJlM6vaTwfUHaLfHl3cnCClZWSk5eRjoen0JFaKSxigYh3e3VwcouWko+Vl5GMi8G/dUgcQm6KgXh8cnB8lJaRkJmUkImb0aFiMSNYeot6fHhzcIeWlI6TmJKQibTMglIgN2mEhnh+dHF3j5OPjpiYlI2Uza5nPB1OdIt/fHtzcX+Uko6RmpSSiKrRjVcmLGCAiXl9dnJzi5STjpealJCMwr1yRx5CboiCeXp1cnuRlY+PmZWTipzQoGAzIld4inx7eHJwhZWTjpSalJGKuMh9TyE1aISFeX13cnePlpGNl5eSjJXOrWc6HE10in97fHVxf5SSjpKblpWKqs6KViYrYX+Ke315c3SJlJKNlpmTkI7Eu3FFG0JshoR8fHdyfJCTjo+Zl5SNn8+bXS8jWHiLfH15dnOGlJGNkpqWk4u6x3pNHjZmhIh7fnlyeY2TkY6YmZaOls6pZTgeTnGKf3x9d3GBkpGNkZuWl42wzIJRJC1ffoh8fXpzdIuSkY6YmpaQkcm0akAcRW2Hgnx9eHJ8j5KPj5uYlo2kzo9aLCdYeIl9fXx1c4eTkY6VmZaTj8C/ckgdO2aDhn19eXJ6jpKQj5mYlpCbzZ9fNSFRdImAf3x3c4OQkI6Rm5aWjbXIfU8jMmB+iH2Be3V3i5GPjpiZlpOWyqxlPRxJbYiCfn95dICPkY6Qm5eVjavNilUpKVt6iX6AfHd2iI+QjpWbl5OPwLlvSB1AaISEfoF6c3uNkJCPmZiXkJ/Lm100IlN1iX9/fXhzhJCSj5SalpaPs8N7USQ1ZH+HfYB9dHqMkJCOlpeWkpbCp2VBI0xwiIF9fnpzgo+QjZCYlZWNq8qGViktXnqIe4B8eXaHj46Nk5iXlZPBtWpEH0RrhYR+fnp1fY2Qjo2XlpaQo82WWjAkV3iKfXx8eXeEjo+NkpqXlZC2xnpMITdlgId7gXx0eIqQkY6YmJiSmsqnYjogTG6HgH9/enSAjo+RkZuYlo6wyYFSKDBde4d7gX54dYePko+WmZiUlMawZ0EgRmyFgX6AfXR9i46PkZmam5CpzIpUKitZd4d8gIB6dYaOkI+Tm5iWksG6bUYhPWV/hHyCf3Z6io6PkJmbmZObyJxdNyNQcIh+foB6c4GPk5GTmpeWjbDHf1IlM197hHqDgHd1io+Rj5WWlpOUxKxnQSBJa4d/f4F+dX6OkJKQl5eYjqbJh1YqLFx4h3yEgXp0hY2Rj5WZmJWOvrltRx9CZ4KCfYJ/dnmJjZCQmpmaj53Kl1syJ1Vyhn2AgHt0hI2QkJSal5WMs8R5TiU3Yn6FfIN/d3eJjZCOl5iXkpXGqmU/I01thn58gX11gY2PkJGWlZWNpcmJWCwwX3iHeoF/eXeIjZCPlZeWko66uG5IIURpgoB8hH51eouPkJKYl5eOnMmWXDMnVnKIfIKCfHWDjY+QlpiWlIuyw3hOJTtmfoR7gX92eYqOkpCZl5aPksOoZD8jTm6FfX2BfnWCjpGPkpmVlYyhyIpZLy9eeYd5gYF6dYmPkJCWl5WSibe4cE0lRGiCgXyEf3V7jJCPkJmVlIyWx5lfOChWc4h7goN8dISPkI6UmZaUi6zDe1ImOWR/g3qDgXd2i5GQkJaWlZCPwKpmQCNPb4h+foJ8dIGOkI+TmpmXiqDFiVcuMF95hnqCgHp1h4+Rj5aYlpGKtrlwSyVEaYOCe4N/d3yNkZCQmZWUi5HFnGE6KFZzh3p/gXt2hZGRj5OYlZOJpcOCVio3Y32GeYWAd3eKkZGQl5eVkIm6sWlGIkxshX59g310f4+TkJGYlZSIl8eSXjIqXXeJeoOAeHWGkpKPlZeWkYWvvndQIz9og4N7g351eY2SkZKXl5SMjcGlZUAkVXKIe3+De3OBkZOOk5eWkoegxoVYLDRhfId7g4B3doqSkpCXmJaPiLa0bEkjSGyGf36EfXR8kJORkZiXlYiSxJdgNyladol7goJ5dYaTlI+Vl5aShKjAe1QoO2R/g3mEfnV4j5WSkJeXlIyKvapnQiNQcIh9gIN7c4CSlJCTmZaUhpnGilsvL196iHuFgHh1iJOTkJaYlI6EsLp0TiJCaoWCfoV9dHqOlJKRmJWTiI7AoGI7JlR0in2Cg3pzg5OVj5SZlZKEoMKCVyo0Yn+HfIZ/d3aKlZOQmZiVjYW3sG1II0pth4CAg3tzfZCUkpSalpOGlMKTYDQqW3qKfYOAd3SIk5SOlJmWj4KpvntTJj1og4V9hH10eY+Vko+Yl5SIjL6kZz8nUXSKgIGCeXKCkpWPk5qWkYKcwodbLjJgfot9hH54domUkY2Ul5SMg7K2dEskQ2yIhX+De3R7kZSQkZiWk4SQwptiOChWd4t/hIB5c4aTko6UmpWQg6XAgFUoN2WCiH6EfXV3jZaSjpeXk4qHu6prQyNMcIiBgYN5c3+SlJCRmpaSg5rEjV0vLl19in+Ef3Z0iJWTj5aalo6CsrZzTCVCaYaFgIV8c3qPlJCQmZmTh4/Dm2I4JlR1ioCEgnpyg5OTjpKbl5GApr99Uyo4Y4CIfoR+dHaNlZOOmJmUi4e+qWlBI0pviYKBhHtzf5KUj4+ZlpKEmcWNXDAtXXuLgIWAdXOIlpSQlpiUjYOxuXRPJEBohIaChHx0e4+VkZCXlpGHjsSeYzomU3WMgoaCeHKDlZSPk5mVkIGlwH9VKTdigomBhXxzdoyVko6WmJWLh76qaEIiSnCLhYSCeHF/kpWQkJmWkYKbw4xbLi5cfI2ChX51dImUko2VmpaNhLW1cEojQWiGiIKEe3F5jpSPkJmYk4WRw5hgOChVdo2DhIB4coOUk4+RmZOQg6m/fVInOGSCi4KEfHN2i5SUjpiZlYqLv6VmQCJMb4uHg4N5cn+Sk5CSmpeThqHEhlYrL118jIOEfnRyh5WUkJeblY+IuK9tRiJDaYeIg4R5cHmQlJGQmpiVh5fFk14zKVd3jYSGfnZyhZOUkJSalpCGr7t2TSU6Y4OLgoV6cXeLlJOQmJeUio7CoWQ+I01wjYeFgnZvf5GUkZKal5SGp8B/UyoxXX6Ng4V/dHSJlJOPlpeVjoy+q2hBIkdrioeFhHlve46TkZGamJWJn8OJVzAsWXqNhYV/dHCFk5OPlZmVkIi3tXBJI0Boh4uEg3pwd46Uko6Xl5WKl8eXXjcnUXSMh4WAd3GBkJOQkpmVkoitvndOJTdigYyFhn1xdIqSlJCWl5WNkcOjYj0iS26KiIaDeXB9j5WRkZqUlIikw4RWLC9cfI2Ehn1zcoeRlZGWl5WQjLuwa0UjRWqHioWEenB5jZOTkZeWlYudxZBaMylXd42Ehn93b4SPkpKUmJeTi7W4cUojPWWFi4OEfXF1i5OUkZaXlo2Ww5teOSZRcY6FhYB4cX+Pk5KUmZaUiKrAflEpNGB/jYOFfXNyiJGUkZeXlpCRw6ZkPiNJbouIhIF4b3uPkpKTmJaUiqLDiVYvLVp7joOEf3RxhJGVkJWXlZKMuLVvSSNCaYeKgoN5cnmNlJSSlpWTipTDml84J1V1jYSEfndxgpGUkpSWk5KJq798USc2Y4KMgYN8c3WJkZSQlZWTj5HAp2Y/I01vjIaCgXlwfI+Uk5KXlpeLpsWDUikxX36PgoN8c3GHkZORlpaVkY68sWlDIkVriYiCgXlweY2UlJKYlZWLn8WPWDIqWHeOg4N/dXGDkZWRk5aUkoyxu3RLJztmhIqAg3pzdoySlZGWlpKOksGjZD0kTnKLg4F/eXB/kZaTk5aSkoqfw4dXLjBhf4x/g3x0coeUlZOVlJORi7e0bkkiRWyJhn6AenJ6jZWTkZaUk42XwZReNSlaeY6Bg393coKQlZKUlZORiKy8eE4mPWmGin+BenN3i5WUkZSUlI2PvKZkPyVSdI6Efn53c4CQlpGSlJGTiZ/CiFgwMWGAjn+BfXZ0iJKVkJOTko+LtLZwSiVGbouHfYB5cnqPlpKQlZKRi5XBm184Klp5j39/fXVyhZOWkpKTko+Gpb+AVCk5aYSKfYF5cnWNlJSQlJKTjYy8rGhCJE9yi4N+f3hyf5GTkZGVk5SJoMeJVi4xYn6NfYB9dnOGk5OQlJeUkYq2tW5JJUZtiIR7f3t0e46Vko+XlJSNlsaYXTQpWXiMfn5+eHKDkpWQk5WQk4iqwn1RKDpog4p7gHtzdouWlJCUk5KNjb6rZ0EkT3KKgn6BenN/kpSSkpWRkomaxo9bMC5ffYt9gn93dIeTlY+Sk5KQiLG4ckskRW2Ihn6BfHN5jpWSkJWSkoqRw51gOSdYdox/gIB5c4KSk46QlZOSh6bDflMoO2iCin2AfHZ3jJOTjpSVko2Lvq5nQSVQc4uCfoF6c4CRlI+OlpKSh53GjlkxL2B+jX1/fXd1iZOTjpOVkpCHs7l0TCVEbYiHe4F6c3mNlZGOlJGRi5HEoGM6J1h2jX9/gHpzgJGTj5KUkZGGqcSAVCk6ZoKKfIB8dnaJk5KPlZSQjI3ArWhBI05yioN9gHtzfpCUkJGWkpGGm8ePWjEvYH2KfIB+d3WIkpGNkpaSkYizunRLJUJsiId9gXx3fI6Sjo6VlJKKksOfYTsnV3WMf4CBeXWCkJGPkpWRkYaown9UKjllgop+gn11eIyVkY2TlJGOi7+takIjTXGKg3+Be3R/j5KPkZaTkoeeyI1ZLi9efI1+gn94dIaSko6Tl5OQibi2cUkkRGqGiH+DfXR6jZKQjpaUkoqWxppfNilXd42BgYB5dISQkY2SmJWRiKzAe1EmOWWCin+EfnZ4ipKRj5WUkYyPwqpoPyVNcYqDgIJ6dH2OkpCPl5SSiKHGiFctMF58jH+EgHh1hpGTj5SWk5GKurVuRyNFbIeGgYR9c3qNkJCPmJOUi5vHlF40K1l3jYGDgXpxg5CRjpOXk5KJsr53TCU8ZoSKgYR/dHWKkJGNl5aVjZTFoGE7JVBxjIWBgntyfo6SkJKXlJOIp8KEVCozYX6MgYR/dnWGkJGOlZaTj42/r2tEIkdrh4eBhH10fIySkI+WlJSLociPWzArWnmMgYSBeXODkJOPk5aSkYy4uXRKIz9mhYiChH10doqPkY+XlJSOmcacXzYmU3OLhISCenF+jZCQkpaTkomww31PJjhhf4uChn92dYaOkY+XlpWPksOmZT0jS26KhoSEfHJ8jJGQkZmTk4qlx4lVKy5be42ChIF4c4OOko6WmJOSjb22b0cjQ2iGiIKEf3R4iY6RkJeUlI2gyJJZMSpVc4uEhIN5cYCLkZCTl5WUi7a9dUojOmSBi4KHfnR1h4+SkJiXlY+Yxp1fNiRRcYuGhIN6cH2LkJGSmZWUjK7DflAmNF99jYOFf3VyhI6TkZeWlJKTwatmPyJIa4mIhIR8cXmLkJGSmZSTi6LJjlctK1h3jIOFgndxgY2RkJWYlJWRvbZuRCJAZ4SIhIV/c3WGj5GSmpWWjZ7Il1ozJ1NyjIaFhHpwfYqSkZOXlZSNs753TSU6Yn+Kg4d/dXKFjZOTmJWVj5jEo2E5JU5vioaEg3tvfIqQkpSZk5SMq8WEUioyXnqNg4WAd3KDjZKSl5aTkpG/sGtDIURphoeDhn1yeImQkpKXk5WPocmTWS8qWHaMgoWCeXB/ipGSlpeUk463u3RIIz5kgYqBhn5zdYaPlJOXlZSPl8agYDglUG+KhYSEeXB7iZKTlZmUlIuqxIFRJzNffoqBhX91cIOOlJOYlZORkb+uaUEiSGuHh4KDfHJ4ipGTlJaUlo6gxJBaMCxZd42ChIB3coGOk5GVlZKUjbK9d0siPWaDioGGfHJ1iJCTk5eTko2WxaViOyRQcouEg4N4b32LkpKTlpKTjKjFhlUpMWB+jICFfnRyg5CSkZaUkpCQvLJsRCJHbYmGgoN8cXeJkZKTmJSUjp/Hk1suKVt3jYGEgHhvgIySkpaXk5SPub1zSCI9aIWJgYV9cXSGkJKSmZWWkZvGnl82JVN0i4ODgnlvfIqTkpWZk5SNrMODUSczYH+LfoJ/c3GFj5SSl5WSkZO+sGtBIkdth4WBg3pxd4qTlJSXkZOOnseTWi8qWnmLgIOBd3B/jpWSlZaRko2yvndLIjxmgod/hH1zc4iTlZOXlJOPk8OmZTkjU3OLg4KCeHB7jJSUlJaSk4ukxYhUKDFhfot/hH91coWQlJCWlpKQjrm1b0UgSG2HhoCDenB3jJSUkpeUk4yXxZtfMydaeYx/gX93cX+PlZGVl5KRirDCfE4jO2iFiH6DfHN1iJSTkJaUko6SwKlmPSJQdIyCgIF5cHuPlpGSl5GTjKLGjVgsMGF/jHyAfXVzhZKUkJWVk5CLtrlzRyJCbImFfoJ7cnaLk5KSl5STjJbFnV82J1Z3jICBgHZwf5GUkZSWk5GLqcOBUyU3ZoOJfoR8c3OHlJSSlpSSjo28sWtAIktxi4R/gnhve46WlJOXk5KKmsaWXC4qXHyMfYF+dXCDk5aRlZaTkYqvvnpNIj1qhYh9gnpxdYuWlJGVlJOMkcGoZjskUneMf4F/d29+kpaRlJaSkYmkx4tWKDBkgIp7gnxzcYeTk4+VlpSQjbi0b0QgRnCLhH6CeHF5j5SRkpiVkoyYxJpdMiZZe45+gH11cIGSlY+UmZSRiq3Cf04lOGeEiH2BenN0ipWSkZiWk46SwqtmOyFNdIyDgIB4b3uRl5GSmJWTjKDFkFkrLF9/jH2BfXNxhJOVkJeYlJGKs712SCE+bIiGfoF6cHWNlpKRmJaTi5bEomI1I1N3i4GBf3Zwf5KVkZSYlpGKpcKIUycwY4GJfIJ7cnOJlZKQlpmUjo25tG9DIEZwiYR+gHdweY+WkpOZl5GKm8ScXzInWHmLf4F+dXCDk5SQlZmVkYuwvntKIjhqhol9gXpydYyWk5CWlpOOl8GnZTkiTnaLg39/d3B+kZSRkZiWkoupxIhRJy9igIt/gXtycoiUlI+Vl5ORkLuzb0EiQ2+Ihn6AeHJ6kJaRkZiVkouYxZ1fMyZVeoyAgHx1cYKTlJKVl5KQiarDglAmNWaEin+CeHJ0ipWSkpeVko+Rwa1pPCBKc4uEgIB2cn2RlZKTmZWSi6PGjlYpLF5+i3+CfXVyhJGSkZaalZGPt7dxQyFAbImHgIF3cXiOk5KRmpmTjJjEnV0yJVN4jIOBfXZwgZOTkZSblZONrMB/TSYyZoWLgIF6c3SJlZORl5eTkJG9r2s/IEZzi4aAfnVwfZCWkZKXlZGMnsWVWy4pXH6MgYF7c3KFlJSPk5iSkY6zu3lIITpqh4mBgnlxd42UkpCWlZKNlsOjYjUiUneNhYF+dXB/kpKQkpiVko2rwoJOJTBjg42CgXlyc4mTkpCWmZWQk7yvaj0gRXKLh4B/d3F7j5SQkJmXlY2hw5RWLCVZfo6CgXtyc4SSk5CWmJWTkbO8d0cgN2iHin+AeXB2jJWTkZeXlJGbwaJgNiFNdo6GgH1zcH6SlZKTl5WUkarAhE8nLWGBjoKBe3JziZaVkJSWlZOUu7FrPh5Db4mJgYB1cHqPlJGSmZaUkKLBk1YtJVd9joSAfHNxhJSVkZWYlJSTsrp4RyE2ZoWLgYB4cXaLlZKPlpeVlJzBo2A0HUt2jYaBfHVwfpKWkZKYlpWTqsGFTSQsX4GOgoB6cnOIlJWSlpiWlJa5sGo9H0FwiYp/f3dweI+Xk5SYl5WTor+SVS0jVXyPhIF7dHKDk5WRlJiXlpS0uHdEHzRoh46BgHdwdouVk5KWmZiWnr+iXjMdSnaMh4F9dXF/kZSTkpiYmJWrvYNMJCpfgY+DgXlxdIeVlJKVmJiXm7mtZzseQG6Li4F/dnB5j5aTk5eYmJejvZJUKiNTfI+GgXxzcYKTlpSVmJiZmbO0c0IeNWeFjoKBd3J1ipaVk5eXmZihvZ1bLx5KdY2JgX51cH+SlpOUmZmZmay6fkcjKl+CjoR/eXJzhZOWk5eZmpmduadkNhxAb4qMgn51cHqOl5STmJqamqi6ik4nJFZ8joeBfHNygZKXlJWYmZuetbFtPBw2Z4aOgn53cXiNlpaTlpqam6S7l1YsHUt3j4mBfHVyfpCWlpSZmpycsLV5QiAsYYOOhIB5cXWHlJiVl5ucnaG4oV4xHEFxi4uCfnVxe4+XlpWanJ2cqbiGSyUkVn+QhoB6cnODlJiXlpqam6G1rGo4GzVoiI2Df3ZweoyXlpWXm5yfpriSUiogTHiPiYF8dHN/k5eWlZicnaGwsHU/IC9ig5CFf3lxdoiUl5aYnJ+fpLWaWi8eQ3KOjYF8dXF8j5mWlpibnp+qtIFGJCdZgJCGf3lydISTl5aXmZ6gpbCiYjYfO2yJjoJ8dnF6jJeZlpibn6KosopNKSRReZCJf3pzdIGRl5WXmZ2hoqulbz4kNGOEj4V+d3J5ipWYlZaanqOmr5NWMCRIc4yMgXx1dH6PlpWVmZyfoaioeUQnLlx/joZ/enN3hZSYl5aanqGkq5lfNiRBbomNgn13cnyNlpeWl52go6eogUstLFV8jomAenR0gpGXl5WZnqGjp51oPik6Z4aOhH14dXqKlJeUl5qgoqSmiVIzK011jIyCfHV0gJCYmJWXnKGipJ5yRC43YIGPh395dHiHlZmVlZifo6OlkFo4LUhxio2DfHZ0fo6Xl5SWm6GjoZ56SjE0WX2NiYB6dHeEk5iWlpidoqGhkmM9L0Jqho2DfXh1e4qWmZaVmqCioJ1/TzY0VHiMioB7dXiDkZeWlJedo6Gek2pEMz5mgo2Gf3d0e4mVmJeWmZ6ioJyGVzs1T3OJjIJ9d3d/j5eZlZaboqGck3BJOD5gfoyHf3p3eYWUmZeVmJ6in5mIXkA4S2+GjIN+eHV9jJaYl5aboKGbk3ZOPD5aeYyJgHl3eISSmZiWmJ2inpiIZEM7SWmDjYV+eHd7ipWZl5eaoKKbkHlSPz5YdoqLgXx3d4KPl5mXmJ2inZWHaEk/SGaAjYiAend7iJSZl5eanqCZj3pYQkFTc4iMhHt3eH+Nl5mWmJqgnpWIbE5CSGJ9i4mAe3h8hJOZl5eYnp+ZjnxeR0NTb4SNhn54eH+LlZmXlpuenpSGcFNGSV94iYqBfXl6g5CYl5eYm5+ZjX1hTEdRa4GKhn96eX2JlJiXlpqenZOFcVVHS192h4qDfHl6go+XmZeYnJ6Yi3tlTkpTaX+Kh4B7eH2Hk5mYmJmdnJCEclpMT151hIqEfnp7gY2WmJiZmp6XiXtmU05VZ3yJiIF9enyGkZiYmJmbmo+BcVxRUl9ygYiFf3t7gIuWmZiZmpuWiHpnVVFXaHqHh4N9en2EkJiZmJqamo+AcF1SVF9wgYiFgHt6gImUmZmamZuWh3loWVNaaHmEiIN+fHyDj5eZmpqZl41/b2FVVmFxf4aGgX18f4mUmJmYmJiShnhoWlVbaXeDhoOAfX2CjZaZmZmYlY1+b2JZWWJwfYaGgn59f4iRmJmampeQhXVpXVleaXiBhYSBfX6Di5Wam5qXlIx8b2JaW2VyfIOEg399gIaRmJuZmZaPg3RnXltgbHeAhYSBfn+Ci5SZmpqXkoh7b2NcX2ZyfIGDgX9+gYeQmJqal5OMgXNpYV9kbHd/goKAgYCEjJSampiVjod6bmRfYWl0eoGCgoGAgYaPl5yamJGKgHRnYl9lbnh+goKCgIGEipOam5qUjYV4bmRiY2p0e4CCgoKBgoeOl5qbl5CIfnNpY2NocHl9gIOCgoKEiZGam5iTiYJ3bGZkZm51e3+CgoGCgoaOlpyblI2EfHJpZWVrc3l+gIKCg4KFi5KanJaPh392bGZmaHB2fH6AgYKDhIaNlZqZlIqBeXJqZ2htdXt9f4CBgoOGiZGXmpaOhH12bWhpa3F4e39/gYKEhoiOlZqYkoh/d3FraGtvdnp9f4CCg4WHi5CXmpSLgnx0b2prbnR5fX1+gIKFhoiOlJmYjoV9d3Jra25xd3t9fn+ChIeIiY6Vl5KJgnlzbmtucHV6fH19f4OEh4mMkZeUjYV8dnNvbXB0eHt9fX6ChIaJi4+TlZGIgHh0cW1wc3d6fX5+gIKFiImLkJOSjIN6dXNvcHN2enx+fn6Bg4iJio6RkpCIf3h1cW9ydHh7fn19f4KGiIqLj5CSi4J6dXRxcXR3enx9fX2BhImKiouNkY6Hfnd0c3Jzd3h7fX59gIOHiIuLjI2Oi4F7dnNzdHV4e3x9fn6Bg4iKioqMjI2Hfnl1dHN1d3p6fH5/foOGiYmJiYqNioF8dnV1dXZ5enx9f36AhIiJiYmIi4yFgHl1dXZ1eXt8fH5/gIKGioqIiIiKiYF8d3Z2dXh5e31+f3+AhIiJiYaHioqGf3l3dXZ4eXx9fn5+gIOHiIqHhoeJiIR9eHZ4d3l6fX19foCBhIeIiYWGhoiGgHt3d3d5enx9fX5/gIKFiIiHhIWIh4R+enZ4eHl8fXx9fn+AhIeHiISEhIaHgXx4d3h6e3x8fn1/f4GEhoiGg4OGh4V/e3h4enp9fX19foCAg4WGhoSChIeFgn15eHl6fH5+fX9/gIKDhIaFgoKEhoaBfHh5ent9fX19foCBgoWFhYSCg4WHhH97eHp8fX5+fn9+f4KChYWFgoGChYWAfnl4en1+fn99fn+Bg4SGhYOCgYSHhYF7eXl8fYCAfn1+f4CEhYaDgYGChYaDfnt5e31/f358fH+AgoSFhYOBgIKFhIB9enl8fX+AfX19f4CEhISEgX+BhIWDfnt5e39+gH5+fX1/gYOFhIOAf4KFh4J+e3t8f4CBfn18foCChISDgn+AhIaEgH16fH6BgX99e3x/gYSFhIOAfoKEhYN/e3t9gIGAfXt8foCDhYSCgn+Ag4aGg358e36BgH98e3x/goODhIGAfoCDhoSAe3t+f4KAfnx7fn+DhISCgH9/goWHhH58e36BgYB9ent+goSDg4KAf3+EhoSCf3x8gICBf3p7fH+CgoSCgH5+gYWHhH98e3+BgYB8e3p+gYKEg4F/foCChoWCf3x+f4KCfXp6fH+Bg4SBgH5/gYSIhYJ/fX+AgYF8eXt9gISEg4F+fX+ChoaEgXx8gIGBf3t6e3+Cg4OBgX1+f4SGh4N+fH1/goB8enp9gYSFg4F/fX6BhYeGgn58f4KAgHx5e3+Cg4KCgH59gIOHiIR/fX2AgYB8eXl8gYOEgoF+fn6AhIiGgX18fYKBf3x5eX6Cg4OBf31+f4SGh4WBfn1/gYJ+eXh7f4KEgoB+fX6BhYeIgn98fYCCf3t5eXyBhIOCfnx+f4OGiYeBfXyAgYB/e3p8f4ODg39/fHyAhIiIg4B9foGCgHx5en2BhIOCf319foKFh4eDf3x/gYJ/e3h6f4KDgn9+fH5/g4eJhYF9fYCBgX15enyBg4OAfnx8foGFiYiDf3x+gYJ/fHl7foKFg399fH1+goeIh4F+fH+CgX56eXuBgoSCfn18fYGFiImFgH1+gIKAfHp5fYGDgn9+e3x+hIaKiIJ/fH+Cgn57eHp/goSCfn18foCFh4qFgX5+gIKCfXp6foCEg4B9fH1+g4eJiIN+fX+BgYB8eHp/goSBfnx8foCEh4mFgX59gIKBfXl5fIGDgn9+e3t/gYeIiIN/fn6CgoB8eXl9gYOCfnt7fX+DiIiGgX58f4KBfnp5e3+Dg4B+e3x+goaJiIWBfX6AgoF9eXl+gYSBgH18fH+Dh4mHg4B9f4GCf3p4e3+CgoF+e31+gYWJiYaBfX6AgoB8enl9gYSCgHx6fYCEiIqHhIB+foGCf3x4eX+Bg4F+fH19goWIiIWBfn1+goF+enh7f4KDf317fYCChomIhIB9f4GCf3x5eX2Bg4F+fHx9gIWIiYWDf36AgYJ+e3l6f4KBgHx8fYCDh4iIhYF/foGBgXx6eX6Bg4J+fHx+goSHiYaEgH5/gIJ/enh7foKDgX16fH6ChYiIhYF/fn+BgH56eHuBg4J+fHt+gYWHiIeDf35+gIKAfHl6foGDgH17fICChoeIhIJ+fX+Bgn56eXt/g4N+fXx+gIOHh4eEgH99gIKAfHp5fYGDgn18fICBhIiHhoKAfX+CgX97eXt/gYF/fXx9f4OHh4iFgn9+gIGAfHp5fYGCgX18fX+BhYaIhYN/f3+AgYB7eHp9goKAfXx9gIOGiIeEgX9+gIKBfHp4fYCCgX97e3+BhIaIh4KBf36Bgn57eHl9gIJ/fX19f4OGiIaFgoB+f4CBfnl6fH+Cgn98fX6ChYaHhYSCf39/gH57enl8gYGAf318gIOFh4aEgoB+fn+Bfnp4e36CgoB9fX6AhYeHhoOCf36AgYB9enp9gIKBfnx8f4OFh4aFg4F/foCAf3x5en2BgX99fH+AhIaHh4SBf39/gYB9e3l7gIKBfn19f4KFhoaGg4KAfn+Af315en2AgoB+fX+BhIeHhoSDgH9/f4B+e3l8gIKAfnx8f4KFhoeFg4KAf3+Af3x7e3yAgoB9fX6Ag4WGhYWCgH5/f4B/fHt7f4GCf358f4OEhYeFhIGBf3+Af358en2AgoB9fn2AhIWFh4WCgH9+f4B/fHt8fX+Af318f4KEhYWGg4F/fn9/fn97e31+gH9/fX5/goSHhoWEgX59fn9/fHx8foCBf359f4KDhoWGg4GAf35/f398e31/gH9+fn6AhIWGhoSEgIB+foB+fnx7fn+Bfn19f4KEhYWFhYKBf36Af358e3x/gIB/fX6Ag4SEhoSEgYB/fn9/fnx8fX+Af31+f4KEhIWEhYOCf35+gH9+fHx/f39/fn+BgoWGhYOEgYB+fn9/fX58fX2Af35+f4KEhIaFhYOBf39+fn5+fHx9fn9+fX2Bg4SEhYSCgoB/f39/fXx8fX6Af359f4GDhYWEhIKBgH5/fn5+fH19fn5/fX6AgoSEhoWEgoF/fn+Af319e35+fn1+foKDhISFhYOCgH99fn5+fX19fn5+f39/g4OEhYSEgoCAfn1+fn58fX1/gH9/foGEhYWDhIKBgX9+fX5/fnx8fn5/fn6BgoWFhIODgoF/f359f35+fX1+f35/f4GDhIaEg4OCgIB/fn9/fX19fX9/f36AgoSGhYSDgoJ/f35/fn59fHx+f39/foCDhYWEg4OCgH99f35+fn19fn5/f35/goWFhIWDg4F/f31+fn5+fHx/f35/f4CDhISEg4OBgH9/fX5+f359fX5/fn6Bg4WFhIODgoGBfn9+fX9+fX19fn9+gIGEhoSFhIODgH9+fn9/fn59fn9+fn5/goSEhYODgoKAf359fn99fX19fn99foGDhIWEg4ODgX9/fn59fn59fX5+fX5/goSGhISDgoB/fn99fn9+fn59fn1+f4CChIaEgoKBgYB+f35/f35+fn1+fn+AgYSFhIOCgoKAf35+fX5/fX1+f39+gICDhYSDhIOBgYB/fn1/f359fn1+fn6AgYSFhYSDg4KBf399fn5+fX5+fX9/f4KDhYWDg4OBgYF/fX5/f35+fX1/fn6BgYOGhIOBgYGAf35+fn5/f31+fn9+f4CChYSFgoGBgH9/fn1/f39+fn5/fn9/gYOEhISDgYGAf399fn9+fn9+fn9/gIGChIWEgoGAgH9/f319f399fn1+foCAgYOEhYOBgYGAf35/fn9/fn99f35/foCCg4SDg4GCgoGAf31/f35/fn1+fn9/goOEhYOCgIKAf399fn9/f31/f39+gIGDhIWDgoKAgYGAfn5/fX59fX1/fn9/gIOEhYOCgYCBf39/fn9/f359fn5+gIGChISDgoGBgYGAf31/f35+fn5+fn6AgIKEhYOBgYGBgYB/fX1+fn9/fn9/f4CBhIOEg4KCgIKAfn5/fn9+fX99f35/gYGFhIKCgIKCgYB+f31+fn5+fn9/f4CCg4SEgoGAgYGBfn5+fn5+f35+f36AgYODg4OBgYGBgIB/fX5+fn9+fX6Afn+Bg4SEg4GCgYGBf39/f35/fn9+f35+gIKEhYSCgIGCgYB/fX5/f35+f31+f4CBg4OEgoGBgoGAf39/fn5/f31/f39/gIKEhIODgYGBgoF+f359fn9/fn5+fn+AgYOEgoGBgIKAgH59fn9+f359f35+gIKDg4OBgoGBgYCAf31+fn9+fn1/f4CAg4OEg4GCgoGBf39+fn1/fn9+f3+AgYKChIOBgoCCgoB/fn5/f35+fn9+gH6BgoKDg4KBgYKCgYB/fX9/fn9/f35/f4CChIOCgoCBgYKAfn5+f39/fn5/f4CAgoODg4GBgYGAgYB/fX5+f39+fn9/f4CBg4OEgYGAgYKAfn59fn9/f35+gICAgoOEg4OAgYGBgYB/fn1/f359fn9/f4GDgoKCgYGBgoGAf399f35+f35+f4GBgYKDg4OBgoKAgIB+fn1/f35/fX9/gIGBg4SCgYKBgYGAfn5+fn9/fn5/f3+BgoGDhIKBgoCBgYB+fX1+f35+fX+AgIGBg4KCgoGBgoGAf359fn59fn5/f3+BgoOCg4KCgIGBgYB/fn5+f39/f36AgICBgYODgYGAgYGCgH5+fX5+f35/fn+BgYKCgoOBgYKBgX9/fn1/fn5/f36AgYGAgoKCgoGBgYGAf39+fn5/f39/gICAgoGCgYKBgYGCgoF/fX5+fn5+fn+AgICBgYKDgYGBgYKAgH99fn99fn5+f4GBgYGCgoGCgYKCgYGAfn5+fn5/foB/gYCAgIKCgoKCgIGCf399fn1/fn5+f4CBgYCBgYKBgYKCgoGAfn19f35+fn+AgIGCgYKCgYGBgYKAgX9+fX19fn9/f4GBgIGAgoKBgoKBgYF/fn1+fn9+fn+AgYGBgIGBgYKCgYKBgH99fX19f39+f3+BgYKBgYKBgYGBgIGBf359fn5+foB/f4GAgYGBgYOCgYKCgYB+fn1+fn9/f4CAgYGCgICCgoGCgoKBgH59fn9+fn+AgYKBgIKBgYGCgoGBgH9+fX19foB/gH+AgYGBgYGBgoGCgoGAfn59fn5+f39/gIGBgIGBgYKCgoKBgX9+fX5/fX5/f4CAgoKAgICCgYGBgYGAgH9+fX5/gH9/gIGAgIGBgYGBgYKBgIB/fX1+fX9/gICAgIGAgYCAgYOBgYF/f35+fH1+f39/gIGAgYGAgIGCgoGBgYF+fn1+fn5+f4CBgoGAgIGBgYGCgYKAf35/fX1+foCAgIGBgYCBf4GCgoOCgYB/fn1+f35/f4B/gYCCgIGBgIGBg4GBgX59fn5+f39/gIGAgoGAgYGCgoGBgn9/f319fn9/gIGAgIGBgYCBgIGCgoCBgH99fX9/fn9/gICCgYGAgYCBgYKBgYB/fn19f36Af3+AgYGBf4F/gYGBgoKCgH9+f359f4CAgICCgYCAf3+BgoKCgoB/fn5+fn5/f4GBgIGCgH9/gIKCgoOBgIB+fX19f39/gYGBgoCBgIGBgYKCgYF/fn5+f35+gICAgYGCgICBgYGBgoKBgX99fn1+gH+AgYGBgYCAgYCBgYKCgYCAf35+fn6AgH+BgYKCgICAgIGBgYGCgH9+fX5/foCAgIGCgoJ/gH+AgYKCgYF/f35+fX5/f4GAgIGAgIF/f4CCgoOBgX9+fn5+fn+AgICBgoCAgH+AgoGBgoGAf39+fX5+gH+AgYCBgICAgICBgoGCgYB+fX1+fYB/gICCgYGBgX+BgoKCgoGAfn99fX5/f4CBgYKCgYCAf4CBgoKCgH9/fn5+f4CAgICB";
var step_width = 150;
var ran_unsaved_steps = false;

var operation_selects = "\
<option value='0'>Check Content</option> \
<option value='1'>Goto Step</option> \
<option value='2'>Set Content</option> \
<option value='3'>Set URL</option> \
<option value='4'>Wait</option> \
<option value='5'>Trigger Event</option> \
<option value='6'>Notify</option> \
<option value='9'>GV SMS</option> \
<option value='7'>Run Code</option> \
<option value='8'>Stop</option> \
";

var overlay = "\
<div id='browserbot_overlay' style='width: 100%; height: 200px; position: fixed; bottom: 0; left: 0; background-color: #CCCCCC; z-index: 999; color: #000000 !important; text-align: left !important; font-size: 0.9em !important;'> \
	<div id='browserbot_leftside_div' style='float: left; width: 15%; height: 100%'> \
		<input id='browserbot_remove_steps_btn' type='button' value='New Step Set' /> <input id='browserbot_addstep_btn' type='button' value='Add Step' /> \
		<br/><b>Save step set:</b><br/><input id='browserbot_save_name' type='text' /><input id='browserbot_save_btn' type='button' value='Save Steps' /> \
		<br/><b>Load step set:</b><br/><select id='browserbot_saved_steps' style='min-width: 58%;'></select><input id='browserbot_load_btn' type='button' value='Load Steps' /> \
		<br/><div style='text-align: right !important;'><input type='button' id='browserbot_del_steps_btn' value='Delete Steps' /></div> \
	</div> \
	<div id='browserbot_step_div_section' style='width: 70%; height: 100%; float: left; overflow-x: auto; white-space: nowrap;'> \
		<div id='browserbot_step_div' style='width: 200px; height: 100%; float: left;'> \
		</div> \
	</div> \
	<div id='browserbot_rightside_div' style='float: left; width: 15%; height: 100%'> \
		<!--<input id='test' type='text' /> \
		<input id='testbtn' type='button' value='SAVE!' />--> \
		<input id='browserbot_run_btn' type='button' value='Run!' /> \
		<input id='browserbot_stop_btn' type='button' value='STOP' /> \
		<input id='browserbot_minimize_btn' type='button' value='-' /> \
		<audio autoplay='autoplay' id='browserbot_alarm_sound' src=''></audio> \
	</div> \
</div> \
<div id='browserbot_mini_overlay' style='display: none; width: 40px; height: 25px; position: fixed; margin-left: 80%; bottom: 0; background-color: #CCCCCC; z-index: 999; color: #000000 !important; text-align: center !important; font-size: 1.2em !important;'> \
	<input id='browserbot_maximize_btn' type='button' value='+' /> \
</div> \
<style>#browserbot_step_div > div { float: left; }</style> \
";

function addStepShell(a){
	var append_str = "\
	<div id='browserbot_step_"+a+"' class='browserbot_steps' style='height: 100%; width: "+step_width+"px; border-left: 1px solid #000000; padding-left: 10px; cursor: move; background-color: #AAAAAA;'> \
		<table border='0' width='100%'><tr><td><span id='browserbot_step_"+a+"_title' style='font-weight: bold;'>Step "+a+"</span></td><td text-align='right'><input id='browserbot_del_step_btn_"+a+"' type='button' value='X' /></td></tr></table> \
		<select id='browserbot_operation_"+a+"'>"+operation_selects+"</select> \
		<div id='browserbot_operation_div_"+a+"'></div> \
	</div> \
	";

	$('#browserbot_step_div').append(append_str);
	
	var how_many = $(".browserbot_steps").length;
	$("#browserbot_step_div").css("width", ((step_width+20)*how_many)+"px");
	
	$('#browserbot_operation_'+a).change(function(){
		//must use an anonymous function here.. otherwise event fires immediately and then doesnt work.
		var this_id = $(this).attr('id');
		changeStepType(this_id.substr(21), $(this).val());
	});
	
	$('#browserbot_del_step_btn_'+a).click(function(){
		//must use an anonymous function here.. otherwise event fires immediately and then doesnt work.
		var this_step_id = $(this).attr('id').substr(24);
		$('#browserbot_step_'+this_step_id).remove();
		var how_many = $(".browserbot_steps").length;
		$("#browserbot_step_div").css("width", ((step_width+20)*how_many)+"px");
		reorderSteps();
	});
	
	$('#browserbot_step_div_section').scrollLeft($('#browserbot_step_div').width());
}

function addStep(){
	var a = step_count;

	addStepShell(a);
	
	changeStepType(a, 0);
	++step_count;
}

function addExistingStep(a){
	addStepShell(a);
}

function getIdFromIdString(str){
	var id_parts = str.split("_");
	return id_parts[id_parts.length-1];
}

function setIdInIdString(str, id){
	var id_parts = str.split("_");
	id_parts[id_parts.length-1] = id;
	return id_parts.join("_");
}

function addAntiCollisionId(str, id){
	var id_parts = str.split("_");
	id_parts.splice(1,0,id);
	return id_parts.join("_");
}

function removeAntiCollisionId(str){
	var id_parts = str.split("_");
	id_parts.splice(1,1);
	return id_parts.join("_");
}

function reorderSteps(){
	var num_steps = $(".browserbot_steps").length;
	var the_step_divs = $(".browserbot_steps");
	var t = 0;
	//first we need to rename all the id's before re-ordering them so we can avoid id collisions
	for(t = 0; t < num_steps; ++t){
		var looking_at_div = the_step_divs.eq(t).attr("id");
		var looking_at_id = getIdFromIdString(looking_at_div);
		//get all the elements with ids
		var elem_arr = $('#'+looking_at_div+' [id^="b"]');
		for(i = 0; i < elem_arr.length; ++i){
			elem_arr.eq(i).attr("id", addAntiCollisionId(elem_arr.eq(i).attr("id"), looking_at_id));
		}
		var new_step_id = addAntiCollisionId(looking_at_div, looking_at_id);
		//re-id the main step div
		the_step_divs.eq(t).attr("id", new_step_id);
	}
	
	for(t = 0; t < num_steps; ++t){
		var looking_at_div = the_step_divs.eq(t).attr("id");
		var looking_at_id = getIdFromIdString(looking_at_div);
		//rename the step:
		$('#'+looking_at_div+'_title').html("Step "+t);
		//get all the elements with ids
		var elem_arr = $('#'+looking_at_div+' [id^="b"]');
		for(i = 1; i < elem_arr.length; ++i){
			var curr_elem_id = elem_arr.eq(i).attr("id");
			curr_elem_id = setIdInIdString(curr_elem_id, t);
			elem_arr.eq(i).attr("id", removeAntiCollisionId(curr_elem_id));
		}
		var new_step_id = removeAntiCollisionId(setIdInIdString(looking_at_div, t));
		//re-id the step title
		$('#'+looking_at_div+'_title').attr("id", new_step_id+'_title');
		//re-id the main step div
		the_step_divs.eq(t).attr("id", new_step_id);
	}
	step_count = t;
}

function changeStepType(step_id, type){
	var operation_html = "";
	if(type == 0){
		//check content form
		operation_html = "\
		<div style='float: left;'> \
		Jquery Selector: \
		<br/><input type='text' id='browserbot_cc_selector_"+step_id+"' style='width: 90%' /> \
		<br/><select id='browserbot_cc_compare_method_"+step_id+"'> \
			<option value='0'>Contains:</option> \
			<option value='1'>Equals:</option> \
			<option value='2'>Doesn't Contain:</option> \
			<option value='3'>Greater Than:</option> \
			<option value='4'>Less Than:</option> \
		</select> \
		<br/><input type='text' id='browserbot_cc_value_"+step_id+"' style='width: 90%' /><br/> \
		If yes goto: <input type='text' id='browserbot_cc_goto_step_"+step_id+"' size='2' /> \
		</div> \
		";
	}else if(type == 1){
		//goto step form
		operation_html = "\
		<div style='float: left;'> \
		Step: <input type='text' id='browserbot_goto_step_field_"+step_id+"' size='2' /> \
		</div> \
		";
	}else if(type == 2){
		//set content
		operation_html = "\
		<div style='float: left;'> \
		Jquery Selector: \
		<br/><input type='text' id='browserbot_sc_selector_"+step_id+"' style='width: 90%' /> \
		<br/>Set to: <br/> \
		<input type='text' id='browserbot_sc_value_"+step_id+"' style='width: 90%' /> \
		</div> \
		";
	}else if(type == 3){
		//set url
		operation_html = "\
		<div style='float: left;'> \
		URL:<br/> <input type='text' id='browserbot_set_url_field_"+step_id+"' style='width: 90%' /> \
		</div> \
		";	
	}else if(type == 4){
		//wait
		operation_html = "\
		<div style='float: left;'> \
		Millisec to wait:<br/> <input type='text' id='browserbot_wait_field_"+step_id+"' style='width: 90%' /> \
		</div> \
		";	
	}else if(type == 5){
		//trigger event
		operation_html = "\
		<div style='float: left;'> \
		Jquery Selector: \
		<br/><input type='text' id='browserbot_te_selector_"+step_id+"' style='width: 90%' /> \
		<br/>JS Event: \
		<br/><input type='text' id='browserbot_te_event_"+step_id+"' style='width: 90%' /> \
		</div> \
		";
	}else if(type == 6){
		//notify
		operation_html = "\
		<div style='float: left;'> \
		<select id='browserbot_notify_method_"+step_id+"'> \
			<option value='0'>Just Alert</option> \
			<option value='1'>Loud Sound</option> \
		</select> \
		<br/>Alert Message:<br/><input type='text' id='browserbot_notify_msg_"+step_id+"' style='width: 90%' /> \
		</div> \
		";
	}else if(type == 7){
		//run code
		operation_html = "<div style='float: left;'><textarea id='browserbot_rc_code_"+step_id+"' style='width: 100%; height: 120px;'></textarea></div>";
	
	}else if(type == 8){
		//stop
		operation_html = "<div style='float: left;'>&nbsp;</div>";
	}else if(type == 9){
		//google voice text
		var help_msg = "You can send an SMS using Google Voice with this step.\\n In order for it to work, your browser must be signed into google voice and you have to have looked at your inbox page (you dont have to be on the page though).\\nYou also need your _rnr_se number. This can be found by doing a view source on the google voice webpage and then doing a search for _rnr_se.";
		
		operation_html = "\
		<div style='float: left;'> \
		_rnr_se: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='help' onclick='alert(\""+help_msg+"\")' /> \
		<br/><input type='text' id='browserbot_gvt_rnrse_"+step_id+"' style='width: 90%' /> \
		<br/>Phone Num: <br/> \
		<input type='text' id='browserbot_gvt_phone_"+step_id+"' style='width: 90%' /> \
		<br/>Text:<br/> \
		<input type='text' id='browserbot_gvt_text_"+step_id+"' style='width: 90%;' /> \
		</div> \
		";
	}else{
		operation_html = "<div style='float: left;'>&nbsp;</div>";
	}
	$('#browserbot_operation_div_'+step_id).html(operation_html);
}

function run(){
	var current_stepset_state_json = saveSteps(false);
	var job_name = $('#browserbot_save_name').val();
	if(current_stepset_state_json != GM_getValue(("steps."+job_name), "{\"err\":\"err\"}") && !ran_unsaved_steps){
		var answer = confirm("You have an unsaved stepset. If for any reason the page URL changes, your changes will be lost. Do you still want to run?");
		if(!answer){
			stop();
			return;
		}else{
			ran_unsaved_steps = true;
		}
	}
	

	if(!running){
		running = true;
		GM_setValue("steps_running", 1);
	}
	$('#browserbot_run_btn').attr('disabled', 'disabled');
	$('#browserbot_stop_btn').removeAttr("disabled");
	
	//GM_log("current_step "+current_step);
	
	if(current_step < step_count){
		//get current step type
		var type;
		while((type = $('#browserbot_operation_'+current_step).val()) == undefined){
			++current_step;
			if(current_step >= step_count){
				stop();
				return;
			}
		}
		
		if(last_step != undefined){
			$("#browserbot_step_"+last_step).css("background-color", "#AAAAAA");
		}
		$("#browserbot_step_"+current_step).css("background-color", "#FF0000");
		last_step = current_step;
		
		$('#browserbot_step_div_section').scrollLeft(((step_width+20)*(current_step-2)));
		
		if(type == 0){
			//check content
			//get specified element content
			var ele = $($('#browserbot_cc_selector_'+current_step).val());
			if(ele.get(0) == undefined){
				alertError("Can't find element: "+$('#browserbot_cc_selector_'+current_step).val()+" . Stopping.");
				stop();
				return;
			}
			var tag = ele.get(0).tagName;
			if(tag == "INPUT" || tag == "SELECT" || tag == "TEXTAREA"){
				var ele_content = ele.val();
			}else{
				var ele_content = ele.html();
			}
			
			var method = $('#browserbot_cc_compare_method_'+current_step).val();
			var yes = false;
			if(method == 0){
				if(ele_content.indexOf($('#browserbot_cc_value_'+current_step).val()) != -1){
					yes = true;
				}
			}else if(method == 1){
				if(ele_content == $('#browserbot_cc_value_'+current_step).val()){
					yes = true;
				}
			}else if(method == 2){
				if(ele_content.indexOf($('#browserbot_cc_value_'+current_step).val()) == -1){
					yes = true;
				}
			}else if(method == 3){
				if(ele_content > $('#browserbot_cc_value_'+current_step).val()){
					yes = true;
				}
			}else if(method == 4){
				if(ele_content < $('#browserbot_cc_value_'+current_step).val()){
					yes = true;
				}
			}
			
			if(yes){
				var set_step_to = $('#browserbot_cc_goto_step_'+current_step).val();
				if(isNaN(set_step_to)){
					alertError("Setting step to something non-numeric: "+set_step_to+" . Stopping.");
					stop();
					return;
				}else{
					current_step = set_step_to;
				}
			}else{
				++current_step;
			}
			
			GM_setValue("current_step", current_step);
			return run();
		}else if(type == 1){
			//goto step
			var set_step_to = $('#browserbot_goto_step_field_'+current_step).val();
			if(isNaN(set_step_to)){
				alertError("Setting step to something non-numeric: "+set_step_to+" . Stopping.");
				stop();
				return;
			}else{
				current_step = set_step_to;
				GM_setValue("current_step", current_step);
				return run();
			}
		}else if(type == 2){
			//set content
			//get specified element
			var ele = $($('#browserbot_sc_selector_'+current_step).val());
			if(ele.get(0) == undefined){
				alertError("Can't find element: "+$('#browserbot_sc_selector_'+current_step).val()+" . Stopping.");
				stop();
				return;
			}
			var tag = ele.get(0).tagName;
			
			var newContent = $('#browserbot_sc_value_'+current_step).val();
			
			if(tag == "INPUT" || tag == "SELECT" || tag == "TEXTAREA"){
				ele.val(newContent);
			}else{
				ele.html(newContent);
			}
			
			++current_step;
			
			GM_setValue("current_step", current_step);
			
			return run();
		}else if(type == 3){
			//Set URL
			var loc = $('#browserbot_set_url_field_'+current_step).val();
			++current_step;
			
			if(loc.indexOf("http://") == -1 && loc.indexOf("https://") == -1){
				loc = "http://"+loc;
			}
			
			GM_setValue("current_step", current_step);
			
			//go here
			window.location.href = loc;
		}else if(type == 4){
			//Wait
			var msec = $('#browserbot_wait_field_'+current_step).val();
			if(isNaN(msec)){
				alertError("Setting timeout to something non-numeric: "+msec+" . Stopping.");
				stop();
				return;
			}else{
				++current_step;
				GM_setValue("current_step", current_step);
				timeout = window.setTimeout(run, msec);
			}
		}else if(type == 5){
			//trigger event
			//get specified element
			var selector = $('#browserbot_te_selector_'+current_step).val();
			var event = $('#browserbot_te_event_'+current_step).val();
			try{
				eval("$('"+selector+"').get(0)."+event+"()");
				++current_step;
				GM_setValue("current_step", current_step);
				return run();
			}catch(err){
				alertError("Either couldn't find element with supplied selector or event doesnt exist: "+selector+" , "+event+" . Stopping.");
				stop();
				return;
			}
			
			
		}else if(type == 6){
			//notify
			var notify_method = $("#browserbot_notify_method_"+current_step).val();
			var alert_msg = $("#browserbot_notify_msg_"+current_step).val();
			if(notify_method == 0){
				alert("BrowserBot: "+alert_msg);
			}else if(notify_method == 1){
				playAlarm();
				if(alert_msg != "")
					alert("BrowserBot: "+alert_msg);
			}
			
			++current_step;
			
			GM_setValue("current_step", current_step);
			
			return run();
		}else if(type == 7){
			//run code
			eval($('#browserbot_rc_code_'+current_step).val());
			++current_step;
			
			GM_setValue("current_step", current_step);
			
			return run();
		}else if(type == 8){
			//stop
			stop();
		}else if(type == 9){
			//google voice text
			var rnr = encodeURIComponent($('#browserbot_gvt_rnrse_'+current_step).val());
			var phone_num = encodeURIComponent($('#browserbot_gvt_phone_'+current_step).val());
			var text = encodeURIComponent($('#browserbot_gvt_text_'+current_step).val());
			
			//followed this page to figure out how to do this:
			//http://posttopic.com/topic/google-voice-add-on-development
			GM_xmlhttpRequest({
				method: "POST",
				url: "https://www.google.com/voice/sms/send/",
				data: "phoneNumber="+phone_num+"&text="+text+"&_rnr_se="+rnr,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}	
			});
			
			++current_step;
			
			GM_setValue("current_step", current_step);
			
			return run();
		}
		
		if(type == 3){
			//back button fix after using step that sets url
			running = false;
			current_step = 0;
			clearTimeout(timeout);
			$('#browserbot_stop_btn').attr('disabled', 'disabled');
			$('#browserbot_run_btn').removeAttr("disabled");
		}
	}else{
		stop();
	}
}

function stop(){
	running = false;
	ran_unsaved_steps = false;
	current_step = 0;
	clearTimeout(timeout);
	GM_setValue("steps_running", 0);
	$('#browserbot_stop_btn').attr('disabled', 'disabled');
	$('#browserbot_run_btn').removeAttr("disabled");
	$('#browserbot_step_'+last_step).css("background-color", "#AAAAAA");
}

function alertError(err){
	alert("BrowserBot (step "+current_step+"): "+err);
}

function playAlarm(){
	if(alarm_count < 3){
		$("#browserbot_alarm_sound").attr("src", sound_data);
		++alarm_count;
		window.setTimeout(playAlarm, 1500);
	}else{
		alarm_count = 0;
	}
}

function saveSteps(saving){
	if(saving == undefined){
		saving = true;
	}
	
	var job_name = $('#browserbot_save_name').val();
	if(job_name == "") job_name = "unnamed_stepset";
	if(step_count == 0)	return;	
	
	var step_arr = new Array();
	var step_id = 0;
	var first = true;
	while(step_id < step_count){
		var type;
		var do_break = false;
		
		while((type = $('#browserbot_operation_'+step_id).val()) == undefined){
			++step_id;
			if(step_id >= step_count){
				do_break = true;
				break;
			}
		}
		
		if(do_break) break;
		
		var a_step = new Object();
		
		if(first){
			a_step.step_cnt = step_count;
			first = false;
		}
		
		if(type == 0){
			//check content
			a_step.type = type;
			a_step.selector = $('#browserbot_cc_selector_'+step_id).val();
			a_step.compare_method = $("#browserbot_cc_compare_method_"+step_id).val();
			a_step.compare_val = $("#browserbot_cc_value_"+step_id).val();
			a_step.goto_step = $("#browserbot_cc_goto_step_"+step_id).val();
		}else if(type == 1){
			//goto step
			a_step.type = type;
			a_step.goto_step = $("#browserbot_goto_step_field_"+step_id).val();
		}else if(type == 2){
			//set content
			a_step.type = type;
			a_step.selector = $('#browserbot_sc_selector_'+step_id).val();
			a_step.set_val = $("#browserbot_sc_value_"+step_id).val();
		}else if(type == 3){
			//set url
			a_step.type = type;
			a_step.url_val = $("#browserbot_set_url_field_"+step_id).val();
		}else if(type == 4){
			//wait
			a_step.type = type;
			a_step.wait_val = $("#browserbot_wait_field_"+step_id).val();
		}else if(type == 5){
			//trigger event
			a_step.type = type;
			a_step.selector = $('#browserbot_te_selector_'+step_id).val();
			a_step.event = $('#browserbot_te_event_'+step_id).val();
		}else if(type == 6){
			//notify
			a_step.type = type;
			a_step.notify_method = $("#browserbot_notify_method_"+step_id).val();
			a_step.alert_val = $("#browserbot_notify_msg_"+step_id).val();
		}else if(type == 7){
			//run code
			a_step.type = type;
			a_step.code = $("#browserbot_rc_code_"+step_id).val();
		}else if(type == 8){
			//stop
			a_step.type = type;
		}else if(type == 9){
			//google voice text
			a_step.type = type;
			a_step.rnr = $('#browserbot_gvt_rnrse_'+step_id).val();
			a_step.phone = $('#browserbot_gvt_phone_'+step_id).val();
			a_step.text = $('#browserbot_gvt_text_'+step_id).val();
		}
		
		step_arr[step_id] = a_step;
		++step_id;
	}
	
	var saved_steps = JSON.parse(GM_getValue("saved_steps_list", "[]"));
	
	if(saving){
		if(jQuery.inArray(job_name, saved_steps) == -1){
			saved_steps.push(job_name);
			GM_setValue("saved_steps_list", JSON.stringify(saved_steps));
			$('#browserbot_saved_steps').append("<option value='"+job_name+"'>"+job_name+"</option>");
			$('#browserbot_saved_steps').val(job_name);
			GM_setValue("current_loaded_step_set", job_name);
		}else{
			$('#browserbot_saved_steps').val(job_name);
			GM_setValue("current_loaded_step_set", job_name);
		}
	
		GM_setValue("steps."+job_name, JSON.stringify(step_arr));
	
		alert("BrowserBot: Saved Step Set!");
	}else{
		return JSON.stringify(step_arr);
	}
}

function loadSteps(){
	var job_name = $('#browserbot_saved_steps').val();
	var step_arr = JSON.parse(GM_getValue(("steps."+job_name), "{\"err\":\"err\"}"));
	if(step_arr.err == "err"){
		step_arr = JSON.parse(GM_getValue(job_name));
	}
	
	var step_id = 0;
	var first = true;
	
	$('#browserbot_save_name').val(job_name);
	$('#browserbot_step_div').html("");
	
	do{
		var type;
		var do_break = false;
		
		while((a_step = step_arr[step_id]) == undefined){
			++step_id;
			if(step_id >= step_count && !first){
				do_break = true;
				break;
			}
			
			if(first && step_id > 100){
				alertError("cant load job: "+job_name);
				do_break = true;
				break;
			}
		}
		
		if(do_break) break;
		
		if(first){
			first = false;
			step_count = a_step.step_cnt;
		}
		
		var type =  a_step.type;
		//make content and fill it in here.
		
		addExistingStep(step_id);
		
		$('#browserbot_operation_'+step_id).val(type);
		
		changeStepType(step_id, type);
		
		if(type == 0){
			//check content
			$("#browserbot_cc_selector_"+step_id).val(a_step.selector);
			$("#browserbot_cc_compare_method_"+step_id).val(a_step.compare_method);
			$("#browserbot_cc_value_"+step_id).val(a_step.compare_val);
			$("#browserbot_cc_goto_step_"+step_id).val(a_step.goto_step);
		}else if(type == 1){
			//goto step
			$("#browserbot_goto_step_field_"+step_id).val(a_step.goto_step);
		}else if(type == 2){
			//set content
			$("#browserbot_sc_selector_"+step_id).val(a_step.selector);
			$("#browserbot_sc_value_"+step_id).val(a_step.set_val);
		}else if(type == 3){
			//set url
			$("#browserbot_set_url_field_"+step_id).val(a_step.url_val);
		}else if(type == 4){
			//wait
			$("#browserbot_wait_field_"+step_id).val(a_step.wait_val);
		}else if(type == 5){
			//trigger event
			$("#browserbot_te_selector_"+step_id).val(a_step.selector);
			$("#browserbot_te_event_"+step_id).val(a_step.event);
		}else if(type == 6){
			//notify
			$("#browserbot_notify_method_"+step_id).val(a_step.notify_method);
			$("#browserbot_notify_msg_"+step_id).val(a_step.alert_val);
		}else if(type == 7){
			//run code
			$("#browserbot_rc_code_"+step_id).val(a_step.code);
		}else if(type == 8){
			//stop
		}else if(type == 9){
			$('#browserbot_gvt_rnrse_'+step_id).val(a_step.rnr);
			$('#browserbot_gvt_phone_'+step_id).val(a_step.phone);
			$('#browserbot_gvt_text_'+step_id).val(a_step.text);
		}
		
		++step_id;
	}while(step_id < step_count);
	
	GM_setValue("current_loaded_step_set", job_name);
}

function removeSteps(){
	var answer = confirm("Are you sure you want to start a new step set? All unsaved steps will be lost!");
	if(answer){
		$('#browserbot_step_div').html("");
		$('#browserbot_save_name').val("unnamed_stepset");
		current_step = 0;
		step_count = 0;
		$("#browserbot_step_div").css("width", "300px");
	}
}

function deleteSavedSteps(){
	var job_name = $('#browserbot_saved_steps').val();
	var answer = confirm("Are you sure you want to delete the saved steps named "+job_name+"?");
	
	if(answer){
		var saved_steps = JSON.parse(GM_getValue("saved_steps_list", "[]"));
		var pos;
		if((pos = jQuery.inArray(job_name, saved_steps)) > -1){
			saved_steps.splice(pos, 1);
			GM_setValue("saved_steps_list", JSON.stringify(saved_steps));
			GM_deleteValue("steps."+job_name);
			$("#browserbot_saved_steps option[value='"+job_name+"']").remove();
		
			var current_job = GM_getValue("current_loaded_step_set", "");
			if(current_job == job_name){
				$('#browserbot_step_div').html("");
				$('#browserbot_save_name').val("unnamed_stepset");
				current_step = 0;
				step_count = 0;
			}
		}
	}
}

function minimize(){
	$('#browserbot_overlay').css("display", "none");
	$('#browserbot_mini_overlay').css("display", "block");
	GM_setValue("minimized", 1);
}

function maximize(){
	$('#browserbot_overlay').css("display", "block");
	$('#browserbot_mini_overlay').css("display", "none");
	GM_setValue("minimized", 0);
}

function initForm(){
	
	$('#browserbot_addstep_btn').click(addStep);
	$('#browserbot_run_btn').click(run);
	$('#browserbot_stop_btn').click(stop);
	$('#browserbot_stop_btn').attr('disabled', 'disabled');
	$('#browserbot_minimize_btn').click(minimize);
	$('#browserbot_maximize_btn').click(maximize);
	$('#browserbot_save_btn').click(saveSteps);
	$('#browserbot_load_btn').click(loadSteps);
	$('#browserbot_remove_steps_btn').click(removeSteps);
	$('#browserbot_del_steps_btn').click(deleteSavedSteps);
	
	$('#browserbot_save_name').val("unnamed_stepset");
	$('#browserbot_save_name').click(function(){
		if($('#browserbot_save_name').val() == "unnamed_stepset")
			$('#browserbot_save_name').val("");
	});
	
	var saved_steps = JSON.parse(GM_getValue("saved_steps_list", "[]"));
	for(var i=0; i<saved_steps.length; ++i){
		$('#browserbot_saved_steps').append("<option value='"+saved_steps[i]+"'>"+saved_steps[i]+"</option>");
	}
	
	if(saved_steps.length > 0){
		var current_loaded_step_set = GM_getValue("current_loaded_step_set", "");
		$('#browserbot_saved_steps').val(current_loaded_step_set);
		loadSteps();
	}
	
	$("#browserbot_step_div").sortable({
		axis: "x",
		stop: (function(event, ui) {
			reorderSteps();
		})
	});
	
	var is_running = GM_getValue("steps_running", false);
	if(is_running){
		current_step = GM_getValue("current_step");
		run();
	}
}

startBrowserbot = (function(){
	$("body").append(overlay);

	if(GM_getValue("minimized", 0) == 1){
		minimize();
	}

	initForm();
});

window.addEventListener ("load", startBrowserbot, false);