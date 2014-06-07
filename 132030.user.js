/*
    Randomize 'Contribute' button on Mozilla Add-ons
    Copyright (C) 2012 LouCypher

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>
*/

// ==UserScript==
// @name          AMO: Randomize Contribute Button
// @namespace     http://userstyles.org/users/12
// @description   Randomize 'Contribute' button on Mozilla Add-ons
// @version       1.0
// @author        LouCypher
// @license       GPL
// @updateURL     https://userscripts.org/scripts/source/132030.meta.js
// @include       https://addons.mozilla.org/*
// ==/UserScript==

var contributt = document.getElementById("contribute-button");
if (!contributt) return;

var things = [
  { name: "drink",
    icon: "data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0\
U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGUSURBVDiNnZM/a8JAGIffpEeTNDFylVYh\
CZKhuLh1KFLoV3Bwahc/QYcODkIXtw5S3Do4qEvBSejQtV3bqYtgq0sVBFMQjJ7xT5Lr5KLXVPzB\
LcdzD7/3uOMopbCeYrF443meiTEeUkrpZDI59H2/lcvlHtZZtHEaAHRdT5qmmbBtGyRJAowxtFot\
FsoWIITkUCi01DQNFEUB27YBISRuJcjn85FEr3c2bjT2Zd+njixT2/P4KcfFIJ3+X9Dv9ye9dvv4\
o9k8OJVlPwbA9QjhOqkUumQ04Nc3arXaXAyHRzIhELUs/sSyuCNCQFBVizXChgAAQNX1d8TzIACA\
BgA0EvH3DKOytSAcj1+hTOZzGI3St0TC/U6nn25LpXsWC5TSP1elXH6uVat3QQyzwSqionz5lHaC\
GOY7WIUQQhzHCRQENlgsFuA4znBngaqqCGOc3ElQKBQQQigqiqIZJOBYv7Fer18bhnE+GAwuBEEg\
kiS9dLvdx2w2+7rOMi/Rdd3uaDTSlsvl1HXd+Xg87s9msx8W+wtNAsYdXG2+UAAAAABJRU5ErkJg\
gg=="
  },
  { name: "coffee",
    icon: "data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0\
U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANZSURBVHjaYvj//z/D379/Gf79+8fw48cP\
htOnLzMcPnyRuaioWpmBgYGRAQ8A6QUIICZUIUYGSUkxBiEhftNfv37qMhABAAIIzQCwjV6vXr2M\
3rx57QOQJdzcvAyWlh4MoqIyWA0ACCAWZA4zM7Pnnz+/Uh8+vHvz7dvX9ywtHRmcnYMYPn36yXD3\
7lWsBgAEENgARkaIV79///bt7t27r4WERMX6+mbF/f/Pce3RoyfPfv789ggo/Q2bAQABBDbgwoUb\
QEOYGL58+Xigrq7m7O/ff6V4ePjFFRXVDQQEJBJ///71HqhsOhBfRzcAIIDABpw5c5Xhz5+/QPyP\
wd09/NuVKxeeionJfhEWFlR8+/YTx+vXz/9/+fIBEXBMrEAM8T1AAIFJFhZmBlZWViMhIYF0HT0N\
O2c3J+l3796zfvvyg+3zp/ff3717tl9UVFbg27fPYEvExfUYnj69DDYAIIDABvDyciepqMlPe/ns\
PvvLW2cY/v78xvDuy18GBjYOBl1DM247uyKf7dstPFas2FD08uWLyaysnMA08BdsAEAAgQ1Q01Cp\
v3hkPfvldX0M4gwfGJ59Z2W49OInw9XnPxje/WJmsHd0ZsjPz2FRUpJqevXq7X1gYB8EavsM0gsQ\
QGAD2DjYeZ5cP8Vw4+ozhq/izAzvfv5i+Pj1L8PPPwwMP3//Zdi1axeDqqoqQ2ZmtEBs7J/NBw6c\
fzN16sV0oNZ1AAEETki/vn9nSK3sZjDyDWB48peP4f4nRoY3P5gYfvxnYhAWFmYICAhgkJOTY9i7\
9zgwpr4yJCX5izAzsziA9AIEENgF9+4+uqer4yhU0r+c4dXzpwz3bl1nePfhIwMjMLTZ2NmB6eM7\
w4MH94EB9xqYIkUYenpOMnz+/OE2SC9AAEGj8cp6dXVZEyFhXgYpKWmGv//+M/x78IDh88ePDC9e\
PGf4+PEDw5s3XxnY2DgZlizZ9PTUqf3T/v79vBikFyCAwAa8fPl62sKFG91dXS3stLQUGb4Do+vj\
+7fAJPwJaNMXhtu3XwPD4ejJJ0+uTPz37+tJoBZQPvkH0gsQQJBAZGP/cO7cBf8dOzbnGRtbRgoK\
8kl9+vSR4f37j/8ePnz++ObN81s/fXoyB5i37qKnRIAAAwDdZWeKqj9F5wAAAABJRU5ErkJggg=="
  },
  { name: "beer",
    icon: "data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBI\
WXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAADO0lEQVQ4y2WTz2sjZQCG32/m\
m8k30yTdzaZNKouKTaVWKruHXsTNFnr14mHBgnjx7EGvetNCkWXtRf8B2S2KoiKywi4UWXtbL1o0\
NQnVzaZJJ8lkMsnMZL4f+TxUkNX3D3h44X0fAgC1Wg3FYhFKqSsA3lFKVZRSMef8N6XUD8vLy3cP\
Dw9RrVbx35Bms4lsNmuMRqPXtNbv2rb9smmaIIRASok4ju/3er3XLcsaCCGwubn5BIAOBgP4vr8O\
4CPG2HNaawghQAhBJpOBlHLTtu1bruu+DSD8X4OTkxP4vv+h4zjvua6LKIowHo/BGEM+n4fWGsPh\
MP36m29vx1F0s7iw8Pv+nds4OjoCAJiUUrKxseEUCoXrhmHk0zSF4zhgjCFNU4RhiMlkQovFS1dL\
pZJ92m4frK+vi62tLRwcHIDU63VUKhX89ODBB+WlpfcBII5jWJaFs7MzNBoNSClRKpVAKQ1yudwf\
Usovjo+PP3UcJzFWVlZw7959tE/bHaUUoiiC53ngnCObzcJ1XVBKwRgD51xyzp+2bXunUCjcWFtb\
AwWAIAgQR5EQQqDVeox+vw/HmYOUAr1eH74/gEkppsn08+Fw+N3i4uJXWutXt7e371AA6Pc9TJOE\
h8EAcdhBBj5s7SJjKjxVmKKcJZhzR6j3gknDS37lnA8syypXq1VGASAMfHCRCjOp6etXGaGUwXY6\
MAwLq8+UIZMpuh5HrT7mYZiao9GIuq4rhBCKAoAGQIgpkDzSltTEcgPQjAFCLMjEBg+HmI7mIMWM\
U1O/oLUuJkny5/7+/pQCAPkHIJKzmUoCI3NxBJp5HiA2ZmkLKupATMp4dGreUGTuDcMwZlEU3d3Z\
2dH0/E4ExIBQQmk5kZhFCYz5ADAYZvEUciwgUoHCpaXV3IWSxxjb9Tzveynl+QrnECPtRUyVxnnL\
aBPoaABi2EgnC5hEAv0kBxDz4yhKPul2ux1Kqdzd3T0HaK1hmWbt2Lv4sDuef6Vy+QKetRahZjPU\
T9potmwEid2IU/0lScetvb29f2UCAJ7GePHKtcde96+3GHPflLmFa3z+8pKQ0ogzmR7JZh9SHX7W\
/OXHn1dWX3pCpr8BQw+yP2VtRpwAAAAldEVYdGNyZWF0ZS1kYXRlADIwMDktMDktMjhUMTE6Mjc6\
NTUtMDQ6MDDs/LGJAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA5LTA3LTAzVDEyOjQ1OjE4LTA0OjAw\
HcBz2wAAAABJRU5ErkJggg=="
  },
  { name: "donut",
    icon: "data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMklEQVR4nG2TX2hbVQCHv3POzbm5\
N03SpGmStq7OtaNr98fOIkZ9qQ+i4FCfRhFEBR/0RWETGaigIliLjD2oWDYoQ7cVxxz+xTmwm0xW\
BVmnMsvY2Fpc27TWtkmbe5P03uOTINu+tx98/N4+wW14qWvg3Z2t3YW2tg0b/aDuX/PnJn+a+fW7\
z37+cvhmV/x/vN7/wshj6u4B7SSiyXSceEpjrDqh8alOOUzrpeVP574/cHDsk7duOTj01HsX+nJe\
rww6mFfN7KgWUWkXIR1MaAi8CJ4oEqo0P85fPvPsyN6HABTA0PN7xvrdbYVsY0iDF8O2fWLNVVS2\
ARP6GAWiRaO0jRaa9mhm447OnsIXEz8cUV3Nd9739oP3vpMJ81ihIIgGJDpSRLpyQB3PW8YzBjn/\
D3OBhzSKqZYEval85+XSzKR6pf+ZD7abrVuidoDctIhMNBHpbsbKx6lfnYbSCmJmieDGIiYBTtbH\
iUWwVEB7blOntc3O9dreOiQd8DYgHJ96xaO+OsWf81/5s5cWlreu3ZFfbmwnZVfRToZoIo78O6Sn\
Kb9F5mvkZb0MMsCEJURGY1YqTPzytf/c8OlHd4+ebTm/fmlSTi0gaxmUlSQsB4SRJaKJKlKEdaAE\
rEPNwSymYFZx7mLtzJUbK2cB/li0JpVySZQ9pKMQbWsEWrNGiKy6li+kS6BqhNLFrKwi1iweqRUK\
T7Y98DJAQd/Tm+3Zie4oY8pFZNmgmzLMrpavi8+ffu1Ch0r3NsYbcVuTCD+ESJywElIqTlMLYySq\
EnuDi8gZgrRFGNHYCZvBE8cGlUq4PL65ZVctEidiBML4VByNdi3cbJJYs4uVtpBJCbkkbLaxIppS\
6C3vfnXvw/LouVPDF0V5XKfAWBVo0LjuKjIWIKIhmDLVtEa2Oui7UiQ7ulHxJG8eGtkHIAF2vT90\
/2/FqXGhDVgBUtoIHWJkHZW1iLUb9PY8IuOwcq3ofzh65MDhk8eHb4npoxf3HHuiu2/AiTugFMJS\
GFXFaotj3Ay/X7k68cb+/fvGxs+fum2N/3F0aPBkX3dXwY7Y0Yqp+38tLF4/OHri4+PffnP4Zvdf\
ODY4wwDjrcYAAAAASUVORK5CYII="
  },
  { name: "hamburger",
    icon: "data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAZiS0dE\
AAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAA0hJ\
REFUOMtdk8trXFUAh797z9x7JzPpTDPTxCaZNMFqa7GNJdXGoiBYsJZGQURwoehCRHAjgiiC6B/g\
yoUFwQoiuKvURyE+FkqrBELVJmlsTZpJ85xXOjOZ+77nHBcipH6r3+Ljt/sM/se798PGFsZzz5Lt\
HSSTSCgv0nnvM/wDRfTFxp2+8d+Y+9hhcyNMHxwbe7S77+gZK9M3aohUQcW+Dt1mtVlZni4vLn39\
7feLV4YGMsmbX3j/HuzZAwuf9nJzrTW4/8iT72f7H3/e7B7ZZZgCpIeWETL28dtVquXZ2o25+U8u\
Ta1/2FdMN984t4I4/04PP15u5B88dvyjwt0TL4lMn2PIJiRboDropIMKK6ioAabKKikf0Ulsnfuu\
9vPT470ydep0ntuf61Om6nnGTCJwb4GsoA0DMNBRHRU0UJGBEZtks5bI55yXTx7LfXXiYP5X03io\
bAS+MxY1a47amoXtBQjqEGyCfxPCGoS3kd4mcWeDsLWCTtxi2hKjEy+USAHUO8JrVFYp7vbIFAqY\
6SyYEq1cVBKgEhMdK+JOG7+5TeDZqu3pgL05Ulq/pl9/7MvWUMGhuLuCIZvYGQdDKFAuUkqkShMH\
grAdEPqwUZFyZsntnH3xEmLy/LT9ymn16uzf9lEhUtiGC9E2OuggPY/EDwk7IW47YqspWFh1WK35\
YvgpS70lBn9IDXeTPXJADwVRwNRMnmorR6kY0dMVk04ptAY3FNQ7Nst1m7VazMmHA6J7usbtW95Q\
6uoceupsd1w6YREecllaybLSyJK2wBaggSiBMNZoHbNv0KPeb/H7dkZ0JUkqNd8mLF9R1Yx3F+o+\
l/2lOsr08DyLMBAoBVprolDjS8UvqourrR55XTnX5HqjJQDZJ5Oo5Ibjw1Wr0Foyqd1OiK0YlZV4\
UrIeGyzvMrh2xGHfQJoH5qOL0xcqbye/VZdECbiMXk3CYCYrYnsox4iTM+0Lh/NMHUijBgSjg4pS\
KUXGdCJ7Xk7+can1wfUbrT8BaewIyyz02HsnDnc/ce+Ic6Y8kjlkZPTu4y3fzLVlp9o0F/5ak5M/\
zXa+ud7wlwF5R407sBzD3HOwx+7vzVvFWBii4qpmuR6shXFSA4Kd8j9rhLeN1CHvhgAAACJ6VFh0\
U29mdHdhcmUAAHjac0zJT0pV8MxNTE8NSk1MqQQAL5wF1K4MqU0AAAAASUVORK5CYII=",
    pos: "center center"
  },
  { name: "car",
    icon: "data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADyUlEQVR4nO2UXWhbdRjGn///fCSx\
bdJ8rWtSugxX00YG4o2b64ZgEdGBsKETB+rsJuKF3nglggrqxbAb4q4EEcSKrGxOKQxRL3QzXfel\
taPtuqZt2ibNR3OSk4+Tk/PxHq+82BhzIOLNftfv877wwu8B7nGPe/znsLsZGh8fvy+Tybwjy7K/\
UqmUCqVyplrXE+Vi5o2vR0edV1593dNhtryffPF5/tas+E/Lfzny2oFlpfReKBLud8suEABXhw8c\
DiQW33761ClvONL7wLXJc21vR6La3i2xdPDBxFnZ5xvZOvJx9o4Hjg8feupCd/gbdeG6A4eRWmtA\
cLcz2eVxMukV9lCib8+OPY9DFGWUG5rzmW15rpU2+o+J4oAQCh2Ze/nQ7ptelD05Jnpk+QnHtp8x\
8vmnl6b/jI5OT1M1FuNShxeVeh3edh+ZLZ27JYk2hQKcbdSgSRIpi/N8sFrB7lCIKmqJG1oDrpr+\
EQOAP44dd8cSiQ+YKA7bqtrZmJ937JLCrPV16MUCKeUyv1ypYNGyURYF0lwyj27ro+xqmh+u1mCH\
g5SI9XHDMtFcXqIz9Qb/7sYM3vT5X2QAcPLo0R93uT1DAuewSgpaxQI11ta4kctB0FvkEHHLMGCb\
BpgkkqvDy22Ph5xOP2ecQTIM0op5rqsq1r1+Or9zB19cWMDK+V8jYvKxoYOlVGqolMs7jkt2GNmw\
yyoz8nkya1UQOYxxTr7NEQiMo2w3WXt4EzUrChM2CqSXFeiNGtONFhmmyWZ6IuzZ/fvpzLen+UTy\
N6/oX1zpC7ncsMMBR0+n+UK5DOngCxTY0sspm4P7xAmKPPIoP7u2irHfr2Ib0+ilrgqv6RoZjsV1\
04BmW44J4mmL1i/VtQB+/sk1MTGRUlW1yK7G4gMjrdpMP5EzGO1mlmUi26iR1dS4rNWwtT1Mk/EB\
Pg6CptWxPHnR+TIcYkWr6RhksVXbyV82rdlLLXs6R05GkuVWwO9niqJ8b5rmsvjw8vXZsfv73pq0\
zA8Pp1LykzCx082Z2dtL6mwRRdJYss1Nw88dQF1rsE9n5+xks5q72LLmrpj2TIGcAgAVwBKAOdMw\
svl8vnmTaM+nbnzl54K6z9uxb7vU1h8Eeng6J7XcXszqhhOMRHkwGISiKFixrMn36/oPADQAawDm\
AKQBVAHQrS797YEMYDOAHgBRAF1dnEfCnAcqotTdP7hrbzwe51NTU2oymXyXiK4AWACwAcC6k6y3\
6yIBgAeAD0AQQFAQhC6v19tZrVbP2ba9CKB5m9y/4q5K8X/hL0DF8v+cqeYsAAAAAElFTkSuQmCC",
    pos: "bottom center",
    margin: "6px"
  }
]

var num = parseInt(Math.random() * things.length);
contributt.innerHTML = "<b></b>Buy me a " + things[num].name;
GM_addStyle(".button.contribute.prominent b {\n"
          + "  background-image: url('" + things[num].icon + "');\n"
          + "  background-position: "
          + (things[num].pos ? things[num].pos : "center 2px") + ";\n"
          + "  margin-right: "
          + (things[num].margin ? things[num].margin : "0") + ";\n"
          + "}")
