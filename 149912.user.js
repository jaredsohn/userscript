// ==UserScript==
// @name        Nico TagList
// @namespace   http://userscripts.org/scripts/show/149912
// @include     http://www.nicovideo.jp/*
// @version     1.1.2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfcCRIIHzcl3HG4AAAgAElEQVR42u29eXhU13k//p5zt7kzoxktM9qFEGIRYAEGzOZNGNJ4wTbYDnZt4jiJs9htvk3TxmnjNl+c1G3S9vukqdvkG/fX3699/JTEJaY4tmMnELBlHGHAgFgFCC2M9nVmNHPv3PX8/tA9w9FlJI1sgVGS+zznmZFm5s6d+37e/T3vi+DjO5CzCEIIEUII8xp9jp330OfsYTvvIxk+AxnOReD3R0YiXPPvdAju/m4OAPDGjRvR3LlzuVmzZomGYfgVRfHoui5alsUDAP0cEQTBEATB8Hq9mtfrTUaj0dTJkyetY8eO2ZFIxGKITsZ5/vvjGgEAOTeccjNm/mc7yxsOh3Nvv/322RUVFTU5OTlVy5cvL5w7d265JEm5GOMAQkgGAB4hxNm2bQCAZtt20rKsoe7u7t6jR492X7p0KTIyMnLhwIED58+fPz/I83zCNE0LAHjmO0kG6fF7AFxFEY8ctucdMa87r+csXLhw/rZt226+4447lhcXFy/Kzc0t9/l8Ptu2OcuysGmaHAMY5LreNDExxhbHcRbP86ZpmsbAwEDv4ODghaNHjx7/yU9+0rB3797jANDnfI7HGHO2bRMAsBhAoN9FQFxNAHAIIeyIbMtZYm1t7cKvfvWrt6xdu3ZtOBxejBAKYYyDCCEfxhhzHAcAAJZlgW3bMNY0yKhPACEEHMcBQggIIfSzKgDETdMcjMfjrc3NzYf/9V//9d3XXnvtCADEAQBEUZQMwyCEEMsBwe+cergaAEAIIY7neWwYhg0AJgAE/vRP//TGT33qU3WFhYWrJEmaL8tyhSzLEkIIDMMA27bTRAcAIISkCToeCBBCYx7pc47jgOM4EAQBAAA0TQNFUbpVVW1JJpNH33vvvbeffvrp9wGg07lekRBiMxKB/B4AH5LrBUHgDMOgYtX313/91zV1dXV1wWBwfXl5+drc3NwgAEAqlQLDMMYQ2P2cfZxIArilgRscgiCAKIogCAKMjIxYvb29xwYGBva3tLTsf+KJJ4456oFDo4dtj6LwdwIIaJrOgQAA8aNKGACAe/zxx4s2bty4tqys7OEVK1bc5ff7hVQqBaqqpgmdaU2F+G4AsCCg/8cYjwGDKIrg8/kglUpBe3v7scOHD/90aGjorT/7sz9rB4AUAADP88QxHu3fdhBw00B87FjZvG3bOBwO8w888EDtli1bvrR+/fq/XLhw4VJd17lkMgm6rgMhZIy4p3/T51MhvltquMGTCVyWZaVBWFxcXFJbW7tREIT54XC427btgUgkotu2jdFlZJGPyV2+7gGAnM8LDgAAAPhnnnnmkaeffvp/r1u37n7LsjyJRAJM00wTmRI+E9Gn65hIwrAA0XUdbNtG5eXls1etWnWnJEmou7u7tauraxhjLBBC8O8lwPhcjxFCgnMOEwDCe/bsefa+++77YkFBQU0ymUSmaYJlWWmis1zvJrpblH9UAGQDCAAA27bBNE3E87x3xYoVq2tra2dZltV7/PjxZkEQBNu28W+zd8BNkfB0YY7jRNu2EQCQkpKS6vr6+m/V1NRsFkWxzDAM5HDXGI6fbk7/KNIhEzAAgC8sLKxetGhRRWlpaerXv/51kwN2LkNo+XcWABzHcYJlWQQAhK1bty7753/+5z+dM2fOFlEU8zRNA5b47A2eKpdnC5gPe172/I4kAEmS+JycnMqKiorSG2+8UX/ttdcuAADBGOPfxmDRVABAxT7lfP6P//iPlz/xxBNPL168+FGO40RVVdOu3VRFPfs+jDFwHAc8z4MoiiBJEgiCcMXieX5MAIg9z1RAwQLUMAwQRRHn5uZW5ufnz77hhhuGXn/99QghxOR5HtM4xe8aAKgY5KnB99BDDy377Gc/+9SKFSv+0LZtUBRljLE3FSueJTolqG3bxDAMS9d1M5VKGYqi6KqqGnRpmmaapmlblkUIIQhjjDDGMMqoMCV147YLDMMAhBAUFBSUFBQULCopKWk+ePBgr6ZpBsdxmMlcznhpgLLlfAcAIgCQwsLC6t27d3994cKFjwIAUhTlCpE/hbAhG72zLcuyo9Go2dPTM3Lp0qV4e3t7orOzUxkZGdEAwHbCy0SSJKG0tFQuLy/3V1ZWBsrKygK5ubmSLMvYtm1kWRb6MHYHBRHGGERRBL/fD2fOnDn++uuvP7t9+/aDjsFrwWhOw5zpQEBZvE45n7p7vnffffe5+fPnPyRJUiCZTKYtfTfxJxPDGGPwer1gWRZ0dHQkjh492tvQ0NB54sSJvtbW1piqqrpt2wYhxHS4bkwyCCHEIYRESZLE4uJi3+LFi/NXrlxZtnbt2vJ58+YFZFnGmqaBpmmTXgtro1BAYoyB53nIzc2F+vr6t3bv3v1/fvjDHzZgjAXbtjUAMGCGZxZRFkYfjzGWbNsWAQB+/OMf/69NmzZ91ufzVbDEz1Y3EkJAEASQZRk0TYNDhw71vP322y2HDh3qjEQiwyMjI2oymTSdlC/N2FnjBGWQA0oMAJwsy0IgEJAKCgoCS5cuLdqwYcOcNWvWlJeWloqKooCmaVOSTBQAoiiCx+OBhoaG//ja1772r6dPnz7j5A9SLhD8VgCAzd9zzg/leZ4Xt27devvf/u3fficnJ6dG13XQNC3N9ZMBgBACHMeB1+sFwzDgzJkzA3v27Llw8ODB9lOnTg1Go1EFADRGxNIbS0OytgsAiFFNHCOpOAAQRVGU582bF1y1alX5+vXrq9esWVOZm5uLKWizVU1UHQQCAUgkEoNHjhx5cfPmzT8EgIRLFcxIEHATuXuO2BcAQFizZs2sb3zjG1+fPXv2TYZh4FQqdUU0byILn3JRX1+fun///uYdO3Yc37FjR1Nra2t3KpWKA4DixOIVABhxVsJZ7HO6FABQnZVyCEGJYVqWlerv708cP358uLOzM6rresrn83lDoZDMcdykIGC9CoQQmKYJOTk5Xo/HE8zNzR2sr68/C6MFKjCT1QA3UXwfYywSQnB1dXXo8ccf33znnXc+oes6n0qlstb5lPgIIYhEIsOvvfba6X/6p386evjw4WbLskYcrqdEjzsr5jyyQKDPk85Snc8pDAhSzvkMRm3onZ2d0f379/fbtm2Gw2E5Ly/PK0kSpuB1X3cmw5EQAhhjkCQpVFRU5Nm9e/cxRVHijGr6rQAAYvSqQAgRAED64he/eOOmTZu+lp+fX0R9/Wx1vuPekZaWlqEf/vCHh/7lX/7lSDwe70UIGQ7xYq4VZ4jv5nqVWSzh3QDQHRBQNYIAwGhsbOxqampKVlVV+YuKigKCIOBs1AEFhGma4PV6sc/nC3o8nvj+/fuPu4g/40DAjWP1cwAgAQDMnTu38v777//U+vXr74rFYlfk8Cc8+WhRhn327NnBb3/72/veeOONMw5hNYfYUWbFM3C5wnA7FfMsoSdabhAAAODu7u6Bw4cPD5WUlMjV1dUhjuNQtiCgASeO4+Tq6urQu+++29DT0zPiqJ0ZWXTKjaP7RQcA/F/+5V/edvPNN3/O7/fnqaqa1vuT3SxRFIHjONLc3Bz95je/+dbhw4ebbdumxI1lIHyCIT6r33WGoFS868yjluFvkyG+yRiWNgDwsVgscfbs2WGfzyfU1tYW01BwNodt2yAIAvL7/b5UKjXS0dFxYnBwUHfunT3TjEEug+4XHOIjAKj40pe+dP/SpUs3JpNJoNm9ydKtNETb1dU1/Pzzz/+6oaHhgmmalMAxABhmQDDiMuwoB6cYImZalKimi9Ds6wZjD9BFAAAPDw8rAwMDSZ/P5126dGmY5i+ySSM7HgJfVlYWOnny5MFz584Nw9gCU5ipAOABQEQIeQAAvv71r9etXr16S2FhYXEikUgTf7JDlmXo6+tLvPTSS4d++tOfHnU4P+ES+bEMHO/mcMu1bGZZzCO7DAYYZobXqYsLPT09qZGREbWqqqq4rKzMT6XbZEEj5z0oHA4HW1paWs+dO9eSTCYTM1EKcBm4X3Qe877xjW9snTNnzkZCCEc5ZKKbQwgBWZYhHo8b9fX1Z//+7//+gGmagw6BWcLHGeKrLjHOEnsyw8ptfLkBkon4xIkiYgAgXV1dKcuyrBUrVpR7PB4xm8wlfd3j8XCmaUIikTh+6tSpfuec1kxyC3EG408AAFi+fHlNcXHxDTk5OSKN9bsTJ+5FAydnz55t37Fjx9FUKtXtiPKoI/ZZvZ9kfH/dJcazIb4bCLZLClB7QHW+i7qZUQAYJoREASBhmmZs165djfX19c2GYeg8z0/4G6masCwLFEUhCxcuXL5w4cIFAJDjVBDRIhkEM6CUDLuep2P+991330pZlssA4IpKnvGWJEnQ3d2tHDx4sOn9998/7xCB5Xy32NcYwk+X2GTBYDAgUBw1FGfsjxgAJAzDGP7xj398qLe3N0rjGZPZAZZlgaZpUFBQECgpKVlSXl5e5Hw/DU3PiDpC7OJ+CoC8devW1fp8vsJkMpm12yeKIhw6dOj8L37xiybnBidc/n3SpevNqyguKRBMBggKE3RKA5IQop4+ffrCO++8cy4WiyVlWZ7099JSMgCAwsLCG9avX1/BMBE3U0CA3cEfAODmzJlTWVRUNEcQBEnTtCuqd92LWv7d3d36sWPHzjc1NXU73M9a+JlE/tU2mMYDQZJxOykwE7t27TrR09MzxNYLTrQcNQBVVVVzly9fXgUAXvY+ziQAsEkVvHTp0kWiKObRmHk23O/xeODYsWMtJ0+ebHe4n43pu638a11zT1y2AasS6DWmjh8/3trU1NQejUYNURSzCg5pmgbBYDBcUFAwGwDymXuJZ4IdgBlvgBqA0qpVq6oxxl5a4TOZbwwAoOs6HDt27ML58+d7XVyWZAI6LNdf64OMYxewuYWhw4cPt/b09AxKkjSpzUMIAcMwwOPxgN/vr6iuri5m7IAZoQYws3gAEHiez6mpqakCAJlu5BhPAjD1d6S/vz9x7ty5tlgsFnXEfIIR+dTN+7h9ZJuJEWhMHoGCIHXw4MH2rq6unmzCw1QNYIzB4/EULl68uIRRpxxc2aziujt4cOXT/X5/MBwOlwOARCUAW3SZyR/mOM6+cOFCZ0dHRw+9kUz8nkb2WF8cPiYJMBkIPK2trT09PT29iUQCOI4DZ6vbhCDQdR28Xm/evHnzipw4ijmTJABiLpYvKSnJ93q9eQghlE3Y1wmLklOnTnU63K+4iG9cZ8ER4lIHKdeK9vT09A0PD49wHJeVGtA0DXJycoJz5swJO4Yg9ahmhA2QlgCyLPPV1dVFXq/Xw4Q8x/0wfc00Tbujo6MzmUwqTACGin3zOgyPWq5wMZt/SLa1tfX19PQMSJKUlSFoWRYIguD3er35Th6Fy2AMXrcqIC0BRFHkg8FgPke7NExyUNWgaZrR0dHRo6qqxhhZOnOTLbj+wqLstbHXrHV2dkb7+/uj2dwGp4QdOI6TRFEMMADgXAAg1zMAMIzu+OFFUQwCAM4m7UsBkEwmtY6OjiHTNK8ozbrO4+JsjCC94vF4QlXVEWoITuYGW5YFHMeBLMteRwUMMcb1da0GWC8AcxzHCYLgJYSgbHQf3cChqqqWSCQUF/Gtj8Hf/7C2AJUGOgBYqqqqpmkm2RjIeCFhqgKcRhSi1+v1uoh/3XsB7MVyGGOJ/XGT6T9CCNF1XSOEsFxvXgdW/1RdwzQQUqmUZhiGNtFGF3d9gCMRhZycHElRlBnB/eCyVFm9lQ79TlTp69wEYtu2BePn3q9nAJAMksCyLMuybdtiM6BZnWx0i5qbqa5rSTCmBRsr+qdwII7jMELI3WRpJhRKumsJLAAwnZZz6X2G2XgC1GZy+iMhmCHpYNrZIw0Ay7JMd7euiX44QgiJoihgjNlqGBtmRpWsu3GkDQCWLMtIEASBjQNkExU0DMNMJBI0CDTjAIAty0K6rmvOjtusUqIcxyFJkjwejwfDzO7CSa/X8vl8vCiKEnXxsgGAaZqQSqWsVCplwpXb165rFZC+UMuyIJVKKdlEANntYF6v11NZWRl0RObVaqp0tePq9JrtYDAoiaLoxxhDtt6QaZqgKAotZJ0xTaXG3FTDMCAajY4YhmFlUwJG3yPLslBaWlro9/upGpjWY8mSJRzHcXchhIquAQBQdXV1TjgczjNNMysAAADouq4riqLA2I2scL1LwzENkDRNIx0dHcOqquqTtWtj6+N4nsezZs0qz8vLE1zG5bQcQ0ND8wDg216vd+tVJj4AAF9VVVVQWFhYSDe/TmYAYoxB0zQ1Fosl4HLPgBkjAdIIJYSQSCQSj8ViCdu2YSIRyNoBtm3jmpqaqnA47HcZQB9Z/xFCOI7jPm1ZVoVpmo8+//zzc6aZ8Ihx1wgAyCUlJcXBYDDE7oKabB9EIpFIdHZ2Rl0AIDMFAGnrXdM0dWBgYMA0TX0yFUCjYIZhoPnz51eXl5eHGMNyWoIhd91116rOzs4HMMYxwzBKfvCDH3xhmgHARkPtOXPmFIfD4Vk+nw+yBQDGGIaGhkbOnz8/BFcmv8j1DoAxtfS6ritNTU1dlmVp2aRDLcsC0zRxOBwOV1dXz/f7/T7Gw/hIRRGEEPHIkSNP2bbtxxibGGMjHo/fffPNN98+zRIgHQDbsGHD3Nzc3AoYjQhlpf8dA3A4EokMweXNIe6+BjMCADYAGE1NTV26rmvZSABaFcNxHCxYsGD52rVrQzC68cIdEZvysWbNms3Dw8O3CoKgcByHOI6zDMPIPXv27Kc7OzuD0/Db3Slb/+23314bDocr6T7IyX4/x3GgKAr09fX1Xbx4cYC6kjNFCmAmDEpj+KSxsbF9ZGREMU1zwhp5FgSKosDSpUtX3nTTTTUA4HW440MXR7755puFp0+f/hzHcQhjTJxHEARBTyaTNy9btuwT0/T7aRWvuXTp0pqysrIFfr9fmqypNav/BwcH4x0dHb0wWlVEYAbtDnLbABYA2G1tbT3d3d29mqZZk+2UoWoglUpBKBQKzp0796alS5dWAICJEBI/rBrYtm3bNl3XFwiCoNGGTVQKEEK8pmk+fM8998z+iOKfbX3n+fznP397Tk7ObHfTq4mWIAgQiUS6mpube2G0psC9bxFmigpgM3kjp06dah0ZGYkJgjBpONixA8A0TZg7d+7ahx9+eCUAyM60EIERt1kd99xzz42maW7hOI5wHEfYHoIcx4EoiilFUZa3tLR84r333uM/5O/mHDXFAQBatWrVDStXrlzn8XgK6Fa4bOohbNuG1tbW9tOnT/fBlZtSP64K6CndCHd5lAkAen19fcvQ0NBANnYAVQPxeBxKS0vLli5dun7FihWLnB8vTMUgfO6557yHDh16UNO0WaIoGgznUwAgjuMIz/N8Z2fn1meffXbehwUAIYSH0f7A/m3btt2fm5s7x4mHTNh2ntH/ZGhoyGhtbW3r7e0ddjg90x7H614FuDdVQmNjY1tnZ2dXIpGAbNQA7bVrGAYUFxff9Cd/8if3A0AOXN5vkJVB+Prrr69SFOUuURRNRwIgnufTPQfo4nleMwxjQUtLy/2vvPKKMIXfzO6BwJIkSbfeeuvqDRs2bLJt28dy/2ThX0EQ4OzZsy3nz5/vdPR/pq5h17UdwIFrXwBc7g5iBwKBYGlpaXFJSUkglUpl47aBaZqQm5vrycnJyZdlOfH+++8fc8QtmYwjbrvttmBra+tXdV1fJoqihjFGbPtY+ui0hbVt2+Z1XZ/V1dV1uKWlpTtLn39M97P777+/5ktf+tKz+fn5s1KpVLr72WQRQCqZ/ud//mdfQ0PDaU3ThuHybihaFc02q7puAcByBQWBBABib28v1NTUFFZVVVXSuPhExGejg36/P2/RokUVkUjkUnNzczMAICeymJErbrrpJjw8PPzJgYGBJx2Ot6nop7l5dvwLjNYhWKqqFhuGgTds2LD/7Nmz1iT+PobRHoKiZVnWhg0bFjz44IN/tGLFirpkMjlu97MrbprT1jYSifT95Cc/2ROJRLrg8hZ0ui+C7oS67lUAwJXFkSkAsIaGhvpOnTp1IRKJROmO2WxiArRlvN/vn//Nb37zqxs3blwNAMi2beB5ntoEbG8CqKurKxweHn6MEJIjCILBiHpwG4HUK0AI2bIsj3R2dj7A8/zaLLhfEEWR13U9tXz58gWPPfbYZ9asWXNPKpXiNU0DwzCy2grvVAvb77zzTmMkEumFsX0K2fY1170byLmiYZgx2jwAgBVF4QoLC4MLFiyYNZkUcBtNCCGUn59fPm/evLAkSd3Hjx/vtm1bkySJtywrXSp9yy23oJMnTz7Q09PzhCRJikN4xLh/ae5nB0LRmYSWZXn7+vqq4vH4zueee86eQOxjy7KsdevW1X7lK1/57JIlS7b6fL4g7X6WDffzPA8AQLq7u/t+9KMfvdXb29sNY/sZsuLfngkAcEfGqF8sAoAUjUaJKIpo/vz5c4PBoJxNhzAWCBhjKCkpqS4oKMivqqqKHTx4sE/XdYUNEN1www3lLS0tf6NpWp7H40lxHIepyKcSwE189rt4nk/19/cvaGho6L148eJxlvgYY96x9gkAiE888UTt1q1bv7B48eKtubm5+UNDQ2AYBrAbYSc6RFGERCKh7Nmz58gvf/nL92HsDuMEIw0smAENozhXOhS77AEJAHA8HrckSZKXLFlSCQB4KlKAvreysnJuIBCorq6uVlOpVE9HRwe1KpHH4/lye3v75kAgMOhMD82o+90zAZ3zI6d1m9HU1LT0v//7v1/buXNnEiHEOa4eBwB4wYIFga1bt664++67/3zZsmVbPB6Pf3h4eAzxKbjHK4Sl2+VbW1svff/73/+VqqoDcLnHwMhM4363BECu+HhaEjix7uTChQurQqFQAGOMsumr595GXVZWVlJVVbW6rKys4Ny5c22BQGC4rq6u9tChQ9/xeDwGxtimop+6fW7uZws1GWmDAMC0bTv3wIED/ng8/jYbe1i7dm1xXV3dg5/5zGe+U11dfZNhGMLIyAgYhgG6rmfVA4EQAl6vF7q6ugbfeOON948cOfKBw+lsf0MVxu6LmFEAyJQkoV6BoCiK3dnZmVy9evVcj8fjmahePkO9AAAA3Usvz549u/buu+++w+PxSD/72c8e0TRtjtfrHUEIcY6Lh6gLyLp/mcS/Y3wi27YRxtiORqOVS5YsOdPT09MMAOEvf/nLm5588slv3nvvvZ/jeb4gmUziVCoFuq6niT+VwRIIId62baW+vv6cbdu0F0KCsf5po8oZ1SbO7S6xAyE5ABBs2+b6+vqSHo9Hmj9/frHP5xN1Xc9aDTALEUJ4SZIK+vv7V7333nsLvF6v5RSgEJ7nbRf3o9H7jsYUmDjnQQzhaFGLHI/HZ//FX/zF7G9961tPb9iwYVt+fv5CXdc9mqYhOkAiW85nD9u2QZZlrqKiInf16tV5e/bsOW5ZVi/D+SmYYa3juUncpjHqgBCCW1pa4hUVFbmFhYUhn8/HTQYCNl/A1s9rmoZeeOEFSdd13ufziT6fT5ZlWeJ5XkAIYWeOL2CMCd2Czup+GC1jB0IIRwgROI7z8Dwv+/3+QDAYnHvrrbfeVFtbu5jn+TzTNHlVVYHOOGAt/infMI4Dv98vlpWVhVavXp1z7Nix07FYrBcANISQ9dsAALcUYL0DSdM0rb+/Xy8pKQmEQqGwJEmIpo3HIz4jqtOPP/vZz+CDDz6gg52xKIq8x+PxiKIoSqN15pIkSR5BECSe50We5yWO40Se5yWe5z2CIHgEQZA9Ho/X4/H4ZFn2ybLs83q9XtM0JV3XfYsWLeIQQulB1bquT0j8bJpD0iig1+sVS0pKKhYuXMgNDg5evHTpUp+TAYWZkAWcSAW4vYIxIEAIif39/SOKolihUChQWFiYhzFG2RpShBBob2+Hn//856CqKvWr0y4fz/OcLMuCx+ORRFGUJUmSPR6PTJ9LkuSVJMkriiIlvFcURcnZyMFRr6C/vx+Ki4uhpKRkjL53X2e24+Xc4+icrqhCcXHxwtLSUj2RSFxqaWnpd96DYIbsjRgPADCOe5gOqkQikVgsFlOLiooKioqKclz6eNyUsW3b8Pbbb8OJEyfGRPWYOP8YTnMMQsxxHMfzPEcPjDFGCCF3FJLGHmKxGMTjcaiqqgKA0bKtqQ61msi4pXkPr9fLFRYWLisvL7ebm5tbent7h1xZTzITVQAZRx2MMQ47OjpG2traBgsLC0OVlZUByn2maYKu66AoCvT390MkEoHm5mY4efIkNDQ0wAcffJAupmCJ7vb1Xf7+uClad+iWVjQPDAxAZ2cnRCIR6Ovrg1gsBoqifKS5xez3AYx2R5NlmQuHwzcsWbIk5+WXXz4Jo23yhJkgAdBkOXMnIugBAB8ABAAgCKP98PIAIBcAcsrLy2dt3rz5juXLl8+JxWK4s7MTBgYG0isajUIymUyPbQ8EAiDLcjrIw0oCCoYMyZ+MHMk2bWQnmDl79SAWi9Ee/yDLMgQCAcjPz4dwOAyhUAgKCgogHA6D3+8HWZZBlmUYrzMIqwYQQmMmm/r9fiCEjEQikTfvueeebwFAp3MPx6sNuC42jkw2Ng4zYWEKgiAAzAKAWQihSgAoQwgVezye4oKCglJZlgOmaWKaWWNDunSxRGbn87HBnkyRv/HCze4Onu4JpvRvGvWjn6eg8Pv9kJ+fD4FAAIqKiqCwsBByc3MhLy8PcnNz03ZKJqORHSs32hsCYpcuXfrVli1b/sY0zWaG+O4NI7wTUPtYk0aTyT4q9qsQQvMBYAFCqBoAZgNAGCGUB6MtUSSEEMYY85IkCbIsi7Isc7SsnEbv2KmcLPHd+p/l/MkkgFsFuKUA6366AZNp9xMlqCzLkJOTk5YQJSUlUFxcDEVFRekhWG4QUAkCACMXLlz4+dDQ0FGPx4NkWUa2bSe7u7uH3nzzze5f/epXFwCA1i9wgiBgwzDco/HIxwIAZzbuAtGnGmwAABp8SURBVAC4AQBqEUJzCSGlAJDnFHmKjjeQtgmo306zipIkibIsi16vl+d5HlMAuMbEjpECLEAmI34mNTCeNHADgA1hO3+TVCplWZZlezweAWOMMrTBA57nQZIkCAaDEA6HYdasWTBr1iyoqKiAQCAAPM+DIAjg8XjA5/OBZVm6oihdjv2KbdtOpVKpkXg83svz/IVoNPr+zp07D7366qvtAGDIsiyoqnrNq4kRAEAwGOQVRdlgmuajCKE5CKECAPA5TR9MpzScXJZ8aYJT4mNCCMcEcDBCiPd6vaLP5xMFQcAcxyEWACzx3XH+TJm/iYJMmfL3bIjX3evHAQcxTdNWVdVSFEU3TdP2+/2S1+sVHIJd8V0wmntORwURQuDz+SA3NxeWLl0Kd955J+Tl5YEkSSDLMkiSlC6rp79bFEWwLAt6enoiHR0db7S0tLy6Y8eOI6dPn44hhDhCCFtVfNVBwAEAaJpmb968OdDW1vawaZrVGGMDIaQjhGyHIwkNy1LXzC2y3QYcQsi2LMsyDMPCGCOe57EgCMBO+XYTPVviZ3LNMuUJ3JKEnpcQQjRNM0dGRjRVVTVCiI0QIrquW06/A47jOJTpetzqS1EUiMfjcMstt0BlZeUYoBiGkQ5A6boOqVQKFEUBwzAgEAgEq6qqVgaDweU+n0/t6Oi4ODQ0ZMI1bitH+wGhRx55pPvOO+9s6u7uXm4YRp5Tjo1YAjs/GjGAcOt19jOIAsEwDEPXddOpCEKORMjo9k3FJZskaZMO3dLrtCyLqKpqxOPxlEN40+WC2oZhWAAAkiTxmUDALsMwQJIk+PSnPw2rV68ek/yi6ocWylIDlEomwzBA0zTIz88Pz5kzZ0VJSUngzTffPOxwv7t49qqBgXNSqfz27dv9jz766PDQ0FC8qalpqaZpORzHmQihMVk5twSgEmIcg46w77Esy9R13TQMwyKj234R3fFDCcHqXbf4zZbw7LIsi6RSKSuZTGqJRCKlaZpm27aFELIp0TmOIwyoiWmaFiGEiKLIU9VFJRU1amn4+4EHHoD169end1K7ZyvQ/RJ0UVBQY9U0TfB4PP7Kysp5y5YtC/3yl788bNu2xnEccmhzVWcRctu3b6flYF4AKPiDP/iDWDKZTJ06dapGVVVZFEWTEf2sDkduq54mbzJIBZrUIYQQYtu2ZVmWpWmaaRiGbZomsW2bwGjhKGKlwERSIdNrlmURwzDsVCplJpNJQ1EUTVVV3bIsgyE8cZaNMU7/zSaeRi/TJlQSsJKKEvbee++FLVu2APV2MgWk3BKBSgBql9C/BUHwlZaWzlmyZElOa2vrmb6+vhFRFDmndA7gKnVeoalVzvHxQ87y/9Vf/VXdj370o4cURZE8Ho9BQ9yuzlnUsENs2pYQghwvATtExdR4dF4bk97FGGOe57ET4cVO1zHkhHvh8tszRuUoqGzbtollWTZdpmnajlFFaDUyW5XM/A+YFDN2Mo0YIcTJsuzxer0ehyPBsixIJpNw9913w7Zt29J1DpqmpeMN2agmykjUe6DxCFVVBxobG/+/l1566T8PHDhwUZIkQdM0ut9g2ncacQAA27dvZyNSGACEO+64o7e3t9dsbGxcaNs2FgTBolzvDuKw6VpX9c4YrnKMKOIiJhlVnbZtmqZlGIZlGIZJH3Vdt5xlOn+buq6bmqaZmqYZuq4buq4bmqaZuq4bhmGYlmWZDuFZbk9zvfN/GwBsjLFNpVOG30CoESsIAsfzPIrFYnDHHXfAZz7zmbQqYAtLppJXcLuvpmlCIBDw+v3+BWVlZWY0Gu1saWkZcpJccDXUAe+gkRBCDKe0KR0F/O53v7svFot5d+7ceRchhON53ma4nkX0mOAFHanOcDn7OkII2Q6HUT2HXEUdiBBiuW5oJvFHJvibOKBjOT4NCJcUSBeeEOdwVBIHAJaiKCpCCBmGIa1btw49/vjjgDFOcz5NMU/1cNsLhBAYHByEUCgUWrBgwZOPPfYYF4/H/9/GxsYOJ7eAYLTeEKZLEmBGNBGEEB30NAQAQ6IoJr73ve/94q677tpvGAbviG8yjlVMuZ2wHEafOyvdjRMhZDqP7N5EixBiE0Loo00uH3aGdcVrCCGLLnB1LkUIWRjjMa+7r435m56LIISswcFBrby8fOSxxx7TfT4fmKaZJn62zaQmGkFHwaRpGgwMDEB+fn6otrb2s1/4wheeys3NDcHY3VvTNpAKZ9BRLAiioVBo5B//8R9/ftttt72fSqU8FASZLG6XiM80zZO90e4Nqen/T3GZ7COMMzbWeQ+1CVj1QMGafo4xtjiOs5znpq7rOBQKxVeuXPnB8PBwh1PRlC4w+TDEzxS4ohVLqVQKBgYGwOv1hm666abHvvOd7/wFXN5nycM0jqTJmPbavn27xRQ2csFgENauXdt+7NixcHt7e4UoiiYVm27jbBx//oosmKuWLy2OGc62M3A+ycD1V3wGxnbnmKh7KXHXFLpdT6dkLbVp06b3eZ6PFRQUFAaDwZCqqpDNRpmpHJnyGpIkecvLy6tqa2tD77777hFd19XpdBHxOJYqgdHq1hgA9ANArKqqauCFF17YWVtbe1pVVSmbaBWjbwGubMnqXtlyu8lwvXtRCeMeMO3+Xjo/mFBDlQUjVWO6rmNJklKbN2+uD4VC5wkhKcMwLOq/TyfxWbuAqgNFUSCZTAIAFKxevfqh7373u1+rra0ttSzLkiSJg2kYUzvuSIznnnuOSgJ644RQKKTX1NR0NjQ0zBoYGCjged5iDbQskjdonHz4ePlxMsHfJANX267HjJYzA8or3DNqbeu6zguCYGzdunV/TU3NmUQiYVy6dAkVFxdXFBYWlmqadlUic24bgUoEWZa9BQUFcysrK/HIyEikpaVlQBRFwTE+P7QkmHAmynPPPUccEFAg8BUVFcnCwsLB999/v2pkZCRIPYNsAOBSD2iS4ojxOo6PR/zx3sdKownTy/R9hmFwHMfZmzdv3rdp06ZDg4ODenNzc+LMmTPW7NmzK0tKSqoMw8iqidSHNQzd6sA0TQgGg16/3z+/tLTUGh4e7mxraxvkOI7/KC7ipO1VEEIWIUR1ypwQAKAtW7acGRwc3PV3f/d3j0Sj0TxJkkzHOJwS2DMRYJwfgSb4cWQiFTTO+a8AppPdI5ZlYUII2bhx4ztf/epX325ubtYHBgbsixcvkvb2dmN4eHhA0zSaW7hqSZpMWcyBgQEIh8OhBQsWfO7RRx/lhoeH/+3MmTNdjioApujE/kg2QCYQwOgOmCgADAKA8uSTT37w9NNP7/b5fMlUKsU7FvZHSd6Q8dYEnE4m+VzWehcAiGVZ2DRNfOuttzZ873vfe8uyrKF4PD7U1tbW39raOhKNRqN9fX09sVhsQBAEuBYHnUvIuojBYDBUW1v7xJe//OU/lmU5Hy7vfp7y5HIu2zc+99xz9vbt29lQpLRu3bo+TdOShw4dWqxpmigIgmnbNsqkzz6qWMxGZ36Y81HxiRAiiqJIa9as+eDf//3fd3m93oHBwcH4kSNHYvX19VpzczOyLAthjP2FhYWllZWVpdl0TZlO74A+NwwD/H6/t7S0tHrhwoWht95666ATIJpyFhFPkUsNGN0HN0QlwZ//+Z+/90d/9Ec7CSFYVVUBIUSmstfu4zgyAILEYjHfjTfeePo///M/dxYVFfUKghAdGRkZOH78ePzUqVOKaZoGAMDJkyd7Lly4cCaRSNjZtpOf7jiBqqoQi8WAEFKwZs2aB37wgx88GwqFCgCAOCP/WEmApkUCZJAEFowOmRJvueWW7mQyqTY0NCwDAJvjOBtmQM98J7Vrx+NxX01NzcXdu3f/P8XFxb0AMDIwMDD09ttvJ/7rv/7LjEajVMTKMDpSj8vLywvPnj276Gq5g5OBlkoEURS9paWlVTU1Nb6+vr7znZ2dUSaLSKZNBbgCRayfjTHGYl1dXVckEkGNjY01TIr1ugYBQshOJBKeWbNmdf3iF7/4UVlZWY8j4fp7enpi3/72t7Wmpia2MloEAHFoaAjpum7Mnj27KhgMeimHXmOplc4h+Hw+b25u7tyKigqcTCY7Ll68OCAIAs+o43FrDD8UAJwYgRsE/C233NJx8uTJnJaWlkoaXr2cZ7l+Dmr0pVIpsbi4OPof//Ef/3fx4sURGN3iPQAA0ZMnT6rPP/88TQilt8ojhDyEEL6rq0vFGPMVFRVh2SkFvtogGC9iSF1En8+3oKSkxIrFYh1tbW3Driwi+cg2gNtqV1VVh9HuGAMAMJybmzt0ww03nJZlOWUYBp5OQ3CafW0CAERRFHnFihVNNTU17Y6XMwgAwwCgrF+/nsY+aPMsHQBShJAUAGi2bSdfe+219/bv3380Go1GaWr8WgGAJpBSqRSoqgoDAwOQm5tbMH/+/M/94R/+4WdnzZpV4gCSzRugaQMAAIDX67WZkPGArusjFy9elHVdF9xNpq9H448QQgYGBoKdnZ2aE/IeAgDVcXvZgBMFgeZICdoMQvnpT3+6f+/evUcHBwdjkiRdUyDTekOaQOrv74dgMFiwePHix77yla980bFZ+IlCxnga9Gg6b5BIJGJ9fX2CZVk8Qshm892ZSqQ+rsX0FbJ7enr8Z86coTGOpOPpABNQoQCg08VpRxDaEUzZuXPnu3v27DnU3d0d9/l8VyVCmI13oGkaDA4OgizLhatXr374qaee+jQt8HH2dAhumuPpMqYAQGtubtaGhoY8lmUJxB3au47cQtqphOM4OxqN+tva2gAAFKdG4QqTAS630aUASDqqL+b8PfLmm28e2bt3728ikUg8JyfnmtozFAS07DwWiwHHcRVbt279wsqVK1cAgOCUulEpgLMOBU8BBNaLL76I4/F4wDAMYKeNsNW+HzfhXWA0dV3PNU1ThMzDnsZMFHWkAO8AgO2ohlOpFOzbt6+REAIbNmxYV1paGqBtZ6+VUWgYl4UXx3Hg9XqrHnrooQdN02w9fvy44dCBqjcEAARP40WgwcFBD0Io4MSwyfVoALpm/VjxeNzb09OTOxmjMXZAirED4o7qiAGAkkgk+vfu3du4b9++93t7e+N0I+xVNmjHSAJqGCaTSVAUhV+0aNEnZ8+eXQ2j7ft5GNuldfokAACAoiiyIAj5DMKu2ziAI5FsTdNQMpksOXDgwGSJK7phQ3dF2cYMiFZVdeD1118/zPM8v2HDhuXBYDDIjpi/WlKNTR0TQkBRFMAY47y8vMr8/PxlkiS1a6M5bAGYOonp9FtQe3u7nEwmc65H92+C3cEYY1yUTCaRq14BMgRRWG9AcUmBIWpI2rYd3bVr14F9+/Y1RqPR2FQGUU+Xi0htAgCAUCh0w4IFC/JgbOc3PN0SAPf09OTGYjEZY2yyrWKv0zwAcoxXlEwmC1taWlAWagAxBiFyQDDuho1XXnnlbUKIXVdXd2M4HA6qqnpNA0WGYYCiKBAOh8uLioryYLTzq8nGBaYVAIIg5FqW5XP86OvK+nf3BmJ0qNXU1FRYWlrKw+TdPck478mk7hAAwK5du35jmqZZV1e3qry8PBCPx6+JMUztAVVVIScnJ8/r9QYdAMC0A8ARndgwjKBhGB6EUIK1/q83ALDPMcZmf39/aN68eV6EUDYsygaHwCUB2N5KafWxZ8+eD2zbturq6taWl5cHnDq/ayIFnGSVYFmWxEiAtA0zLQBACJGzZ89yiqKENE3Dsixf912yL1860nVdD+fl5UlsyfsUQQAwwSYVVVXJ22+/3QgAcMcdd6wtKioKaJp21V1EKuWSyaThgI5jFpo2G4AQgl555RUOYxyihtT1WA+QqcsYx3FWNBoNlJSU5CCEuqYSg2EMw4l+LAIASCQSfXv37j2OEOI2bNhwU15eXpCK6qslKakN1t/fHx8aGjIYIxBNuxs4ODjIS5IUgrF7DK/rg07+UlVVampqKgKAc1M9BVzuCmpM5vamUqnB11577X2MMb9+/fplubm5uVfLRWTjBF1dXX19fX2aKyE0fSoAANC5c+f4oaGhAje3TccPI4QQy7J4ZyPnRyo2cXcVsUflMJdIJIo/zOkYaWCMx/1ulfDqq6++ixBCdXV1y/Ly8oJXI2FGK6AVRTF7enra+/v7dbhcPIqmVQUAANI0LRCJRIIYY90d9v0wP466apZlYY7jzIKCggFFUbyJRMLL87zNNo/+CIYgdQX5oaGhwo8SknduqJnBHnAbhggA0O7du+sty7Lr6uqWFxUVBZPJ5LRKASc9bUUikciFCxcuOdPgr9hNNF0AIDk5OX5d1/MckYim2pLVAQ0hhCDTNDkAQDzP69XV1ZG6uroTd9555/mzZ88WvPXWW0tPnDgxN5FIBAghiOd5k/rz2XQVG08a/OY3vyn6qPcAJh8RNwYYb7zxRoNlWWZdXd3q8vLywMjIyHRJTLpt3zpw4MDh/v7+Ybjcr9BiIoFk2iQAAORomhbEGGuZbjLGeFyrl1remqbxhBAuJydnpLq6uvWee+458alPferCokWLhgHA3rRpU+Spp546t3v37vKdO3cuaWxsrOnt7Q1bliUKgqBhjMk40bxxDUFqyEUikaIpeAHZgGCy8xDbtsn+/fuPEUKsurq6dWVlZYFMrWynSnynLsE6d+5cS0NDw9FkMplivJYxHcimTQIMDw+HVFUVRVFUM2X+xvtRCCGiaZpgmiZfVFQ0tGTJkjP33nvvyUcffbQ1Pz8/wVy4DQDI7/cb27Zta9q2bVvb3r17D7300kuLPvjgg9rz589XmKbJeTweneM4ezIguA4jlUoVw2jNnzYNksCGyVu60NwB1NfXNwIAWr9+/ZqSkpIg7TbyYVScKIoAANDb29u7Z8+ed4aHh/vh8jhA9zibjy4BCCHo0KFDyDCMYkcMZ+tHI03TeNM0ubKysoHbbrvt+D333NP44IMPdnk8nhRcHsNKY+7UjZFhtJ2NtXHjxraNGzd2NTQ0fLBr164F77zzzorjx49XaZrmkSRJz9JgRI4rmA+jfZKmY9Of2yaAiSKHyWSS/PrXvz6KMcZ1dXUrQ6FQHu0+4paa49lWCCGQJAls24aurq6uhoaGhsOHD5+CyxlMdphlOhk0LRKgq6sLcxxXDKONI4lTfHDFhTvWPLYsi7dtG82aNatny5YtRzZu3Ni4fv36IVmW6bg1d+WNwkSwJAcAOQDgBwB57dq1xtq1awdPnDjR+M4778x9+eWXVx09enRuKpWSOY6zOI4znbQsyqQCMMZEVVW5t7c3H0ZrAqdFKrrUAXIBYAyj6LqO3njjjQZd10ldXd2ScDgc4jiOp6ozU1tbd4NNwzCMjo6OngMHDhzat2/fQee+pZhH3aUGpkUFoN/85jeoq6srzBhzV8pYw0CmaYqSJOmzZ89ufeihhz54+OGHT9bU1ESdbVZsrj3uPNILpxeNnGumk7p8Dgj8AOBdsmSJvWTJkuOPPvro2T179lS9+OKLNzU2Ni6IxWIBAABRFHUmAjhmQygAyBcvXgwDwMXpdMdh/P6/GTex7tmz5922trb+T37ykysXLFhQ4fP5RADgaIm3u7iGbolXFMU8duxY8759+w62tbVdgMszDEeY+6gxEmDabAAiiqJw9uzZQrjcVjZt2BmGwZmmKeTk5CRvvPHGs5s2bTr65JNPnisuLo4zkTSW293TN937/CynnxEFy4gjunMcQPgKCgrsRx555PQjjzxy4ec//3nlv/3bvy07ceLE4kuXLhVijEEURY3ZoYyc8jVPS0tL6CrEmzKpg0z7HNPW+YULF85cunSpZ+7cuZWLFy+urq6uLi0qKspz+hZiAADTNImqqlpfX9/ghQsXuhobG5sjkUi7rutR5/5RRmInmk6/BEAIkRdffNGbTCbDAGBSrjJNk7dtm8/JyYnfeuutR+66666jn//851slSUrC5XJrleFmepEGAOiOazfed9oAYBNCTAcI9DxeRiL4AIDcd9995++77762+vr691566aUl9fX1K5qbm0ud5pbpG0EI4V599dXw1Qo6ZnAR0TiSwgQAv6ZppKmpKdne3t7u9XpzgsFgIBAIeH0+n0wIsZPJZCoWiyVjsdiIqqpxVVVV27aTzP2MQuaBlmPa00+LEfjqq6/KmqYVjNLdFDiOg/z8/OGNGzeeePzxxz/45Cc/2Qlj+wFRTqelVRSdFptKzgZ8DuiScLlIIxMQ7Ntuu63rtttu6zl79uyRHTt2LHrllVduam1tLTcMQ3DAZF+8eLEQrt6RCQTu5hY2a7FbliUnEgk1kUiM9PX19WOMeUEQeEIIcbqtmnB5XJ3GMAItWHUPtBwj/gGmqWRr165dyx544IE3BEFQS0tLu2+99dYTzzzzzNHa2tpeGFtW7TbsUgzh7ekAI1wegC05QKAGo9dZgqOa/N///vcX7dixY0V7e/vsaDSaW1VV9T+tra3/6yqnINgpbILjenod78bPXK+PuWYRrtz6TQFlMlY+ZaoEIwlUZ2lu8T9tcYDu7u5QVVXV2Ztvvvnws88+e6ampmaA6mvnyzMR3nAIP21BcOdclmMn6IwupAZjGgyCIMSfeeaZhmeeeebkP/zDP8x5+eWXl6ZSKUQIEZ1OaVfrsMcxACkx6Rh61QGF7IBZhLHt4Wzm/eyeBYXhehWuHGZNxtNDH5brhPr6+vmappV+4hOf0OFy1YkCV87VTU/WnE7CT3J9tHxbgstjb1j1IDpgNF944QXrK1/5ysmTJ0/GlyxZcrWvjx3Jw24+lRyie5zndPEwdncPW6nMgiDFcLyRwfCbdgDIMDo8ig6SslzcrjgXMyX9fhWAgBix63FJBI9z4+j2sOQ1ulZ2OKfgUgvscnf/QK64PktsndH3Y4I+mcLT/DSJNJMxNHSG4w3HNfzYK4QciWM4hpPm8kC8NFwBV6Ehc5ZxAuJSAyzh6e5kthSddR1NRhq4m2ROOIJmOiQA53CQwLgxumuP3XV5ONdOuQyx3HStVJSLDlfMZoSxAzvdfZXd/RAtF8dbMEk/RzSNN5J+kX2Nb95v0/Ujl2pwz28GFwCIy720YYpDp/5/XbZTdofDgjYAAAAASUVORK5CYII=
// ==/UserScript==
(function () {
	var DeleteButtonIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAAxJJREFUOI2Fk11MWwUUx/+38qTltt0KtL0tHVqgjNnWzPqwL31yCYmQbHM1Zo8zY0DiolliprhHtqr9gGK3jGQxZPGLFQfUNx5an3QjZk1axuSJ3ntL2UyvK4GX3v19kBJsYjzJSc5Jzu/kf87JAUmQBADx6ujnvfX8v/zqZ6O9AIy7HEmkF9Kvr6ys3H+wtLS2uroaAyA0ggAMjx//MfHb/QdrheVHv6ZSs6+RBC59eMlSKCw/HBwc4okTb3F6+g7L5fLdvU0AGFS19NPt29/w+PE3OTQ8wny+8PsH58+bm6wtLW2bm5u2XC4Ho/ElJBIT0J/rpzY2nswAOA0ApdJ6aiGdHpi6NQWTKCL3MIft7W2pxdrS9sLi4uLTra0tt9VqfSOTycIkmpDJZGGxmHscDkdXtVo9Oz+/cPrmjZsQRRFapYKLQxfR0XHgRui90LcCSQiC0KSq6sz8/MJAMpmE2WzBs2d/4cKFQeh6DVO3piCaTNA0DSMjwzh58u0Zl8sVIvlc2JkRgiAYVEVN3ZubG0gmk7CYLahuViFAgNFohKZpGB4ZRl9f34zTKZ1lHWzctqqq38Xj4wz4Ajx65BiPHjnGgD/AycmvKcvydGN9ExqMAHRdR61Wg16rAcA/sa6DjcV7FQAwKIo6G4+N0/Oyh8HDQXq7uunt8jJ4OMjOVzxMJCZZLMo//ovbgZtkRZmNRqJ0O9sZ8Pl5oN3NSCTK8PUw3S43Az4/3a52jo9PcK0o/wDAsNtg+dFKPB6LU7LZeainl442G2PRGBVFvSPLyvfh8Bd0tNl46GAvJZudiYkE8/lCmCQQjca9mUy2LNns7PZ0snW/lZGvIpRl5W5dZlFW7l0bu8bW/VZ2ezrpckjMZn8pjX462mFQFaXcLIrlV30+aJqGT65cwbuhUMrplM7U9+RySqfeP3du7uPLl6FVKvD5/WgWm9c3nj75UyCJdPrnoEOSJrVKpdVmt88e7PF+tHvnHRMEwZAvLMdLpVL/vn2W9eJacai//52lvVcwjo1d9/7fO4fDX/YAeLGe/w2hQgFE4yqgdQAAAABJRU5ErkJggg=="
	var keysearchicon = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAA'+
	'AAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wMGQIbK0fHZVQAAAAdaVRYdENv'+
	'bW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAdRJREFUOMulkkGrElEUx38zznszExqU'+
	'ghY40kLIDJmdQdEH8BPYNuFB6KY2rWQWgqBgi2gz8b5CW2khiAuLNooIiQgqUgtBEpqe5cjTNjMP'+
	'm+y1eAcu995z7/nd+z/nwBVNuMR/BIjOegtsnPkPk/4BOK5UKoPlchkEEARhZ9v2k1qt9h7Y/Q8g'+
	'FAqFh81m845t2xfOTCZTBRrOTy5MPACQYrHYq/1ggNFoFAeOvbIPAY7H4/FdAEmS0HX9zAHIhmG8'+
	'9MZ4AaJhGM+Hw6EMkEqlfoTD4U/uoaIoT72yvYAjVVVP3E0kEvncarUKfr9/B9Dtdm/pun59X8Y+'+
	'QNA07Vqv17sNIMsy/X7/Rb1e/6Lr+hJgsViI2Wz2FPAdAvjy+fzb+XzuA4hGo3YymTSq1eo7VVV/'+
	'upcsy3rs9MhfjaQUi8Wv7Xb75mWdJ8symqY9Mk3zA7BzEyLkcrlUp9O54WY/GAye7weuVivRsixh'+
	'vV4Tj8dfAw+AjQuQEonEm8lkIgCk0+lvpVIpDqxdeeVy2Ww0GlmA6XR6z5GxcXMgzmaz++5rgUDg'+
	'I/AdOHOGZZrms1AotAUYDAaKYRgngCDs5UJ2arxzXj739L0IKE4FtsAv587V7Des6ZXPfD1begAA'+
	'AABJRU5ErkJggg==';
	var tagicon = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAA'+
	'AAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wMGQMKEz3elO0AAAAdaVRYdENv'+
	'bW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAATVJREFUOMtjZMAEjAy4wX+8iouLizml'+
	'pKQkfvz4wYJNNxsb29fbt2+/njVr1m+YGLJCJgMDg8g/f/4kff/+nROLbYx8fHxv+fj4mhgYGI7C'+
	'5JENYGRiYtLbunWr7rt37/iwuUBfX/+Rjo6OEgMDwzGYAUwoHvz//y8HB8dvXAHAzs7+5////ygu'+
	'Y2KgEIwaQMAAGRmZt6Kioh9JMoCJCSKkoKDwyt3dfa2vr+9BERGRj0Qb8OXLF3Y5ObnXjo6Oi6Oj'+
	'o/Nv375d7O/vf0BISOjzz58/mfEawMLCwqGpqfnC1dV1WWxsbBUDA8PPxsbGe7du3SoLDAw8KCkp'+
	'+ZmNjY0TlwH/f/36dUBdXb03Ojq6lIGB4Tc0uf5rbGy88/LlywppaemlP3/+PIstVyLnTkY8ckzo'+
	'8gCoXGdsroTl6wAAAABJRU5ErkJggg==';
	var HeaderMenuNode = document.getElementById("siteHeaderRightMenu");
	var newSpanNode = document.createElement('span');
	//データチェック
	var taglistdate = JSON.parse(localStorage.getItem("script_taglist"));
	if (taglistdate == null){
	taglistdate = [];
	}
	function listdatacheck(){
	var taglistdatecheck =  JSON.parse(localStorage.getItem("script_taglist"));
	if (taglistdatecheck != null && taglistdate.join() != taglistdatecheck.join()){
	while(taglistID.childNodes.item(1)){
    taglistID.removeChild(taglistID.childNodes.item(1));
	}
	taglistdate = taglistdatecheck;
	createtaglist();
	}
	}
	//ヘッダーにTagListの項目を作成
	var newliNode = document.createElement('li');
	newliNode.id = "fav_tag"
	var HMNP = HeaderMenuNode.parentNode;
	HMNP.insertBefore(newliNode,HeaderMenuNode).innerHTML = "<a href=\"javascript:void(0);\"><span id =taglistspan>TagList</span></a><ul id=\"TagListContainer\" class=\"TagListContainerclass\" style=\"visibility:hidden; height:auto;\"><li id=\"settei\"><a id=\"設定\">設定</a></li></ul>";
	var  setteiNode = document.getElementById('settei');
	//設定画面作成
	function setteigamenhyouzi(){
	var  bodyNode = document.getElementsByTagName('body');
	var setteidiv1 = document.createElement('div');
	var setteidiv1_5 = document.createElement('div');
	var setteidiv2 = document.createElement('div');
	setteidiv1.id = "TagListSettingsmenu";
	setteidiv1.style.width = "100%";
	setteidiv1.style.height = "100%";
	setteidiv1.style.position = "fixed";
	setteidiv1.style.top = "0px";
	setteidiv1.style.zIndex = "300";
	setteidiv1.style.display= "table";
	setteidiv1.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
	setteidiv1_5.style.display= "table-cell";
	setteidiv1_5.style.verticalAlign = "middle";
	setteidiv2.style.width = "402px";
	setteidiv2.style.height = "auto";
	setteidiv2.style.maxHeight = "90%";
	setteidiv2.style.margin = "0 auto";
	setteidiv2.style.border = "1px solid black";
	setteidiv2.style.boxShadow = "0px 0px 19px #000000";
	setteidiv1_5.appendChild(setteidiv2);
	setteidiv1.appendChild(setteidiv1_5);
	var setteitaglistulnode = document.createElement('ul');
	setteitaglistulnode.id = "setteitaglistulnode";
	setteitaglistulnode.style.width = "400px";
	setteitaglistulnode.style.padding = "10px 0";
	setteitaglistulnode.style.margin = "0 ";
	setteitaglistulnode.style.border ="1px solid black";
	setteitaglistulnode.style.backgroundColor ="#EAE8EB";
	setteitaglistulnode.style.listStyleType = "none";
	setteidiv2.appendChild(setteitaglistulnode);
	//ボタン作成
	var buttondiv = document.createElement('div');
	buttondiv.style.width = "400px";
	buttondiv.style.height = "21px";
	buttondiv.style.border ="1px solid black";
	buttondiv.style.backgroundColor ="#EAE8EB";
	var hozonbutton = document.createElement('input');
	var returnbutton　= document.createElement('input');
	var endbutton　= document.createElement('input');
	hozonbutton.type = returnbutton.type = endbutton.type = "button";
	hozonbutton.style.fontSize = returnbutton.style.fontSize = endbutton.style.fontSize = "12px";
	hozonbutton.style.fontFamily= returnbutton.style.fontFamily= endbutton.style.fontFamily= "MS UI Gothic";
	hozonbutton.style.height = returnbutton.style.height = endbutton.style.height = "21px";
	hozonbutton.value = "保存";
	hozonbutton.style.cssFloat = "right";
	returnbutton.value = "変更を戻す";
	returnbutton.style.cssFloat = "right";
	endbutton.value = "終了";
	endbutton.style.cssFloat = "right";
	buttondiv.appendChild(endbutton);
	buttondiv.appendChild(returnbutton);
	buttondiv.appendChild(hozonbutton);
	setteidiv2.appendChild(buttondiv);
	hozonbutton.addEventListener('click', function (event){ setteilistSave();},false);
	returnbutton.addEventListener('click', function (event){ setteilistReturn();},false);
	endbutton.addEventListener('click', function (event){ setteilistEnd();},false);
	//リスト作成
	var taglistdatesettei =  JSON.parse(localStorage.getItem("script_taglist"));
	var SavebottonActivation ="no";
	function CreateList(){
	if(taglistdatesettei == null || taglistdatesettei ==""){
	taglistdatesettei = [];
	var naitext = document.createTextNode('何も登録されていません');
	setteitaglistulnode.appendChild(naitext);
	}
	SavebottonActivation ="no";
	for ( var i = 0; i < taglistdatesettei.length; ++i ) {
	if(taglistdatesettei[i] instanceof  Array == false){
	taglistdatesettei[i] = ["tag",taglistdatesettei[i]];
	}
	var tagtextNode = document.createTextNode(taglistdatesettei[i][1]);
	var setteitaglistilnode = document.createElement('li');
	setteitaglistilnode.style.padding ="0 10px";
	setteitaglistilnode.addEventListener("mouseenter",function(event){this.style.backgroundColor ="#898989";this.childNodes[3].style.color ="#FFFFFF";},true);
	setteitaglistilnode.addEventListener("mouseleave",function(event){this.style.background ="none";this.childNodes[3].style.color ="#393F3F";},true);
	var setteitaglistFormnode = document.createElement('form');
	setteitaglistFormnode.name="sortform";
	setteitaglistFormnode.style.cssFloat = "right";
	setteitaglistFormnode.style.marginTop = "4px";
	var setteitaglistSelectnode = document.createElement('select');
	setteitaglistSelectnode.style.verticalAlign = "top";
	setteitaglistSelectnode.name = "Sort";
	setteitaglistSelectnode.style.fontSize = "12px";
	setteitaglistSelectnode.style. padding="1px";
	setteitaglistSelectnode.style.fontFamily="MS UI Gothic";
	setteitaglistSelectnode.style.width = "135px";
	setteitaglistSelectnode.style.height = "17px";
	setteitaglistSelectnode.innerHTML = "<OPTION value='default'>コメントが新しい順</OPTION>"+
													"<OPTION value='order=a'>コメントが古い順</OPTION>"+
													"<OPTION value='sort=v'>再生数が多い順</OPTION>"+
													"<OPTION value='sort=v&order=a'>再生数が少ない順</OPTION>"+
													"<OPTION value='sort=r'>コメント数が多い順</OPTION>"+
													"<OPTION value='sort=r&order=a'>コメント数が少ない順</OPTION>"+
													"<OPTION value='sort=m'>マイリスト数が多い順</OPTION>"+
													"<OPTION value='sort=m&order=a'>マイリスト数が少ない順</OPTION>"+
													"<OPTION value='sort=f'>投稿日時が新しい順</OPTION>"+
													"<OPTION value='sort=f&order=a'>投稿日時が古い順</OPTION>"+
													"<OPTION value='sort=l'>再生時間が長い順</OPTION>"+
													"<OPTION value='sort=l&order=a'>再生時間が短い順</OPTION>";
	setteitaglistFormnode.appendChild(setteitaglistSelectnode);
	if(taglistdatesettei[i][2] != undefined){
		switch (taglistdatesettei[i][2]){
			case "order=a":
				setteitaglistSelectnode.childNodes[1].selected = "selected";
				break;
			case "sort=v":
				setteitaglistSelectnode.childNodes[2].selected = "selected";
				break;
			case "sort=v&order=a":
				setteitaglistSelectnode.childNodes[3].selected = "selected";
				break;
			case "sort=r":
				setteitaglistSelectnode.childNodes[4].selected = "selected";
				break;
			case "sort=r&order=a":
				setteitaglistSelectnode.childNodes[5].selected = "selected";
				break;
			case "sort=m":
				setteitaglistSelectnode.childNodes[6].selected = "selected";
				break;
			case "sort=m&order=a":
				setteitaglistSelectnode.childNodes[7].selected = "selected";
				break;
			case "sort=f":
				setteitaglistSelectnode.childNodes[8].selected = "selected";
				break;
			case "sort=f&order=a":
				setteitaglistSelectnode.childNodes[9].selected = "selected";
				break;
			case "sort=l":
				setteitaglistSelectnode.childNodes[10].selected = "selected";
				break;
			case "sort=l&order=a":
				setteitaglistSelectnode.childNodes[11].selected = "selected";
				break;
		}
	}
	var anode = document.createElement('a');
	anode.className = "setteitext"
	anode.style.width = "240px";
	anode.style.display = "block";
	anode.style.cursor = "default";
	anode.style.fontSize = "16px";
	anode.style.textDecoration = "none";
	anode.style.color ="#393F3F";
	var deletebuttonnode = document.createElement('img');
	deletebuttonnode.src = DeleteButtonIcon;
	deletebuttonnode.id = i+"deletebutton";
	deletebuttonnode.style.cssFloat = "left";
	deletebuttonnode.style.position = "relative";
	deletebuttonnode.style.top = "3px";
	var syuruibuttonnode = document.createElement('img');
	syuruibuttonnode.style.cssFloat = "left";
	syuruibuttonnode.style.position = "relative";
	syuruibuttonnode.style.top = "3px";
	var syurui = taglistdatesettei[i][0];
	switch (syurui){
		case "tag":
			syuruibuttonnode.src = tagicon;
			setteitaglistilnode.className = "tag";
			break;
		case "word":
			syuruibuttonnode.src = keysearchicon;
			setteitaglistilnode.className = "word";
			break;
	}
	setteitaglistilnode.appendChild(deletebuttonnode);
	setteitaglistilnode.appendChild(syuruibuttonnode);
	anode.appendChild(tagtextNode);
	setteitaglistilnode.appendChild(setteitaglistFormnode);
	setteitaglistilnode.appendChild(anode);
	setteitaglistulnode.appendChild(setteitaglistilnode);
	//デリートボタンクリック処理
	deletebuttonnode.addEventListener('click', function (event){
	var item = this;
	var itemnumber = parseFloat(this.id)
	var deleteILnode = item.parentNode;
	if(window.confirm(deleteILnode.childNodes[3].textContent + " を削除しますか？")){
	deleteILnode.parentNode.removeChild(deleteILnode);
	try{if(deleteILnode.childNodes[3].textContent.toLowerCase().toHalfWidth() == tag.toLowerCase().toHalfWidth() && deleteILnode.className == "tag"){
	SavebottonActivation ="ok";
	}} catch (e) {
	if(deleteILnode.childNodes[3].textContent.toLowerCase().toHalfWidth() == word.toLowerCase().toHalfWidth() && deleteILnode.className == "word"){
	SavebottonActivation ="ok";
	}}
	}
	},false);
	}　　　　}   //CreateList
	CreateList();
	//保存処理
	function setteilistSave(){
		taglistdatesettei = [] ;
		if(setteitaglistulnode.childNodes[0] != "[object Text]"){
		for ( var i = 0; i < setteitaglistulnode.childNodes.length; ++i ) {
				var suln = setteitaglistulnode.childNodes[i]
				var selectElements = suln.childNodes[2].childNodes[0];
				if(selectElements.options[selectElements.selectedIndex].value != "default"){
				taglistdatesettei.push([suln.className , suln.childNodes[3].textContent, selectElements.options[selectElements.selectedIndex].value]);
				}else{
				taglistdatesettei.push([suln.className , suln.childNodes[3].textContent]);
				}
			}
			}
		var str = JSON.stringify(taglistdatesettei);
		localStorage.setItem("script_taglist", str );
		//--ここで閉じる--//
		Close_config_plane();
		};//
	//Return処理
	function setteilistReturn(){
			while(setteitaglistulnode.firstChild){
				setteitaglistulnode.removeChild(setteitaglistulnode.firstChild);
			}
			CreateList();
		}
	//終了処理
	function setteilistEnd(){
		var taglistdatesettei_now = [];
		if(setteitaglistulnode.childNodes[0] != "[object Text]"){
		for ( var i = 0; i < setteitaglistulnode.childNodes.length; ++i ) {
				var suln = setteitaglistulnode.childNodes[i];
				var selectElements = suln.childNodes[2].childNodes[0];
				if(selectElements.options[selectElements.selectedIndex].value != "default"){
				taglistdatesettei_now.push([suln.className , suln.childNodes[3].textContent, selectElements.options[selectElements.selectedIndex].value]);
				}else{
				taglistdatesettei_now.push([suln.className , suln.childNodes[3].textContent])
				}
			}
			}
		if(taglistdatesettei.join() == taglistdatesettei_now.join()){
			Close_config_plane();
		}else{
			if(window.confirm("変更が保存されていません。\n保存せず終了しますか？")){
			Close_config_plane();
			}
		}
	}
	//設定面を閉じる
	function Close_config_plane(){
	bodyNode.item(0).removeChild(setteidiv1);
	if (SavebottonActivation == "ok"){
	savebuttonNode.value = "登録";
	savebuttonNode.disabled=false;
	}
	}
	bodyNode.item(0).appendChild(setteidiv1);
	var basyo = "soto";
	setteidiv1.addEventListener("click",function(){if(basyo != "naka"){setteilistEnd();}  basyo="soto";},false);
	setteidiv2.addEventListener("click",function(){basyo="naka";},false);
	}
	var setteiclick;
	setteiNode.addEventListener("click",function(){var TLSMsonzai=document.getElementById('TagListSettingsmenu'); if(TLSMsonzai==null){setteigamenhyouzi(); radjQuery();}else{document.getElementsByTagName('body').item(0).removeChild(TLSMsonzai); }},true);
	setteiNode.addEventListener("mouseenter",function(){setteiclick="true"; },true);
	setteiNode.addEventListener("mouseleave",function(){setteiclick="false"; },true);
	
	
	var  taglistID = document.getElementById('TagListContainer');
	var taglistspanID = document.getElementById('taglistspan');
	//taglistの開閉
	var open_or_closed = 0;
	function Opening_and_closing(){
	if (open_or_closed == 0){
	taglistID.style.visibility = "visible";
	open_or_closed = 1;
	}else{
	newliNode.blur();
	open_or_closed = 0;
	}
	}
	var mouseover_or_mouseout = 0
	newliNode.addEventListener("click",function(event){if(setteiclick != "true"){Opening_and_closing();}},false);
	document.addEventListener("click",function(){if (mouseover_or_mouseout == 0) {taglistID.style.visibility = "hidden";open_or_closed = 0;}},false);
	function mouseover_Opening_and_closing(){
	if (open_or_closed == 0 ){
	listdatacheck();
	taglistID.style.visibility="visible";
	}
	}
	function mouseout_Opening_and_closing(){
	if (open_or_closed == 0) {
	taglistID.style.visibility="hidden";
	}
	}
	newliNode.addEventListener("mouseenter",function(){mouseover_Opening_and_closing(); mouseover_or_mouseout=1;},false);
	newliNode.addEventListener("mouseleave",function(){mouseout_Opening_and_closing() ;mouseover_or_mouseout=0;},false);
	//タグのリストを作成
	function createtaglist(){
	for ( var i = 0; i < taglistdate.length; ++i ) {
	if(taglistdate[i] instanceof  Array == false){
	//alert("昔のデータ");
	taglistdate[i] = ["tag",taglistdate[i]];
	}
	var tagtextNode = document.createTextNode(taglistdate[i][1]);
	var tglistilnode = document.createElement('li');
	var tagaAnode = document.createElement('a');
	var DBimgNode = document.createElement('img');
	var ULnodeWidth = taglistID.clientWidth;
	tglistilnode.style.zIndex = "0";
	tglistilnode.className = "tagli";
	tagaAnode.style.wordWrap = "break-word";
	DBimgNode.id = i + "taglistdeletebuttonimage";
	var Urltext = taglistdate[i][1];
	Urltext = Urltext.replace(/\?/g, "%3F");
	if(taglistdate[i][2] != undefined){
		Urltext = Urltext+"?"+taglistdate[i][2];
	}
	var syurui = taglistdate[i][0];
	switch (syurui){
		case "tag":
			tagaAnode.href="/tag/" + Urltext;
			DBimgNode.src = tagicon;
			break;
		case "word":
			tagaAnode.href="/search/" + Urltext;
			DBimgNode.src = keysearchicon;
			break;
	}
	tagaAnode.style.margin = "0px";
	tagaAnode.style.borderStyle = "none";
	tagaAnode.appendChild(DBimgNode);
	tagaAnode.appendChild(tagtextNode);
	tglistilnode.appendChild(tagaAnode);
	taglistID.appendChild(tglistilnode);
	var tglistilnodeheight =  tagaAnode.clientHeight ;
	taglistID.style.paddingBottom = "0px";
	tagaAnode.style.paddingLeft = "6px";
	var tagaAnodestyle = window.getComputedStyle(tagaAnode, null);
	var tagaAnodepaddingLeft = tagaAnodestyle.paddingLeft; 
	tagaAnode.style.width = parseFloat(ULnodeWidth)-parseFloat(tagaAnodepaddingLeft)*2+"px";
	tglistilnode.style.height = tglistilnodeheight+"px";
	tagaAnode.style.height = "auto";
	tglistilnode.style.minHeight = "auto";
	tglistilnode.style.maxHeight = "auto";
	}
	}
	//taglistdateがあれば作る
	if (taglistdate != null){
	createtaglist();
	}

	var pageURL = location.href
	String.prototype.toHalfWidth = function() { return this.replace(/[！-～]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }); }
	//----------tag検索ページ----------//
	if (pageURL.indexOf( "http://www.nicovideo.jp/tag/" ) != -1){
	var tag = document.getElementById("search_words").textContent;
	var fav_tag_head = document.getElementById("fav_tag_head");
	var h1Node = fav_tag_head.getElementsByTagName('h1');
	//保存処理
	function savetag(){
	var n=localStorage.getItem("script_taglist");
	var c=JSON.parse(localStorage.getItem("script_taglist"));
	savebuttonNode.value = "登録されました";
	savebuttonNode.disabled = true;
	if (n == null){
	var newtaglistdate = [["tag",tag]];
	var str = JSON.stringify(newtaglistdate);
	localStorage.setItem("script_taglist", str );
	}else{
	for(var i = 0; i < c.length; i++){
	if(c[i][0] == "tag" && c[i][1].toLowerCase().toHalfWidth() == tag.toLowerCase().toHalfWidth()){
	var datacheck = "exist"
	savebuttonNode.value ="すでに登録されています";
	}
	}
	if(datacheck !="exist"){
	c.push(["tag",tag]);
	var str = JSON.stringify(c);
	localStorage.setItem("script_taglist", str );
	}
	}
	}
	//読み込み
	function Readtag(){
	var d = localStorage.getItem("script_taglist");
	alert(d);
	}
	function claer(){
	localStorage.removeItem("script_taglist");
	var d = JSON.parse(localStorage.getItem("script_taglist"));
	alert(d);
	}
	//ボタン作成
	var savebuttonNode = document.createElement('input');
	//var testbuttonNode = document.createElement('input');
	savebuttonNode.type = "button";
	savebuttonNode.value = "登録";
	//testbuttonNode.type = "button";
	//testbuttonNode.value = "test";
	//testbuttonNode.addEventListener("click",function(){localStorage.removeItem("script_taglist");},false);
	newSpanNode.appendChild(savebuttonNode);
	//newSpanNode.appendChild(testbuttonNode);
	fav_tag_head.appendChild(newSpanNode);
	for(var i = 0; i < taglistdate.length; i++){
	//alert(small.toLowerCase()+"\n"+stag.toLowerCase())
	if(taglistdate[i][0] == "tag" && taglistdate[i][1].toLowerCase().toHalfWidth() == tag.toLowerCase().toHalfWidth()){
	savebuttonNode.value = "登録されています";
	savebuttonNode.disabled = true;
	}
	}
	savebuttonNode.addEventListener("click",function(){savetag()},false);
	}
	//----------word検索ページ----------//
	if (pageURL.indexOf( "http://www.nicovideo.jp/search/" ) != -1){
	var search_frm_b = document.getElementById("search_frm_b");
	var word = document.getElementById("b_message").textContent;
	word = word.match(/(.*?) を含む動画が /)[1];
	//保存処理
	function saveword(){
	var n=localStorage.getItem("script_taglist");
	var c=JSON.parse(localStorage.getItem("script_taglist"));
	savebuttonNode.value = "登録されました";
	savebuttonNode.disabled = true;
	if (n == null){
	var newtaglistdate = [["word",word]];
	var str = JSON.stringify(newtaglistdate);
	localStorage.setItem("script_taglist", str );
	}else{
	for(var i = 0; i < c.length; i++){
	if(c[i][0] == "word" && c[i][1].toLowerCase().toHalfWidth() == word.toLowerCase().toHalfWidth()){
	var datacheck = "exist"
	savebuttonNode.value ="すでに登録されています";
	}
	}
	if(datacheck !="exist"){
	c.push(["word",word]);
	var str = JSON.stringify(c);
	localStorage.setItem("script_taglist", str );
	}
	}
	}
	//ボタン作成
	var savebuttonNode = document.createElement('input');
	savebuttonNode.type = "button";
	savebuttonNode.value = "登録";
	newSpanNode.appendChild(savebuttonNode);
	search_frm_b.appendChild(newSpanNode);
	for(var i = 0; i < taglistdate.length; i++){
	if(taglistdate[i][0] == "word" && taglistdate[i][1].toLowerCase().toHalfWidth() == word.toLowerCase().toHalfWidth()){
	savebuttonNode.value = "登録されています";
	savebuttonNode.disabled = true;
	}
	}
	savebuttonNode.addEventListener("click",function(){saveword()},false);
	}
	var testword = "ＡA";
	//testword.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);})
	//----------jQueryの読み込み----------//
	function radjQuery(){
	(function (d, func) {
    var h = d.getElementById('TagListSettingsmenu');
    var s1 = d.createElement("script");
	var s3 = d.createElement("script");
    s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
	s3.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/jquery-ui.min.js");
    s3.addEventListener('load', function() {
        var s2 = d.createElement("script");
        s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
        h.appendChild(s2);
    }, false);
    h.appendChild(s1);
	h.appendChild(s3);
	})(document, function($) {
    // ここにメインの処理を書く
	 $("#setteitaglistulnode").sortable({distance: 10}).disableSelection().delegate('input,textarea,form','click',function(ev){ev.target.focus();});
	});
	}
	//----------jQueryの読み込み終了----------//
	
	
	
	
	
	
	
	//すべて終了
	})();
 

 