// ==UserScript==
// @name           Tatoeba User Stats
// @copyright      Jakob V. <jakov@gmx.at>
// @license        Creative Commons Attribution 3.0 Unported (CC BY 3.0) http://creativecommons.org/licenses/by/3.0/
// @namespace      tatoeba_user_stats
// @description    Shows sentence statistics in the users profile
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABJCAIAAAD+EZyLAAAACXBIWXMAAAsSAAALEgHS3X78AAAUBUlEQVR42u2bfUxUZ77H9//NJg3JhMSkadI0MU2MiXGvWaRLrdRb12p13Xqb62XXurJsaVn3UlrEjugopYxURdGKrHYpiggCIzgyjCJKUUQRRHkb3l9mhpk583LmzBzmlXm53+ccXgaY4c2619vck58nh2fmnDmf8/39fs/vec7jL3Jux/xc7Rf45/85bv/P9n9zWyKbw8v02upaGMlTq/SZVapxtvv83nnPcvtsOpdixNk66jW8pGwWj+aJpeSxubjJUvLUWg57YpF0jdbg1kOdAnIFW52v2pXRuxr23dCmh+Y8u5d5udi8fnebVfrIXPDYUgzdWlnZM6sM6oFz2N4U6qwhewOQMvsjM/ujOIvEn7cMmS8Xm86peEDnjbNZJtgshO2ppdzpZWefAtHk+nTwZA1EnxraBDs5uOFYXxRkZD0v0DkXzTZob6inLzyk8xuZwmYL4q0c8QaffMwUA9jqoWafAqmLNXu/7V93anDTWeX2s8odp4e2nBiMvqD8iHYPv0RsQ45GsDVAOqagiSlutpRAMYABFcBB2Tx+t0SXdJxjy1Hu+G6C7XvlTvOY6iViM7oHHtAXgAfPBAwIYY1MAf58apU4fWzQs2pN2Rl9a04NbgRV9tCWU0Mbj/VHFY7Eh/r+/w4bti5bTf04HhGQt3pTrsrZEuoUi5vKU+4+2hdxYiAaBrCTA9HtrOzFgS2RbdRjaGaKebz75jP3zTk46BqtdoXuA7w+v8mlKdEmfDe4JWdw20Xl7t7R2hcKtkQ2bC4fq3d194zWtNE1faMN9NjAmN8Z6stOtw9s5MDHGlx9sKBhic08plE72rUOxU/S9T1vzcXafG7PXBWJ0+2FzX0Ro3u4gS74YTg2e2DLyb6Np/o3nRveUUWJe2x1c9QDL5zN6Sbm5zqxpYE9YcqP9qw7rFid1r3mm96Io72RvIl7I7/pjihUJywwl86+gedh85rdql5rYxtd22wtfswUtrEypaPR7qX5j91jfpvLM8f56BvuGHIOKVYD7HDX6m96IsQ9kZl9Ucd718G+7Ys6yuGdG/pI5WgNdZExn1Pv6uu3N/TZ6tWOFtvErz8XW7+9/oZeJNWnSPXCm3rxLb0Y+yp9eh19RuduH/O6bY55rtBikQo7VhzsXHm4axVEy+iOIGD96072R8OAhz8zeiK+7l5zsn+LMUQvj5IdXesTVO2sFIVEByuf7FeWwgb1O1m5VJdaSYlkVJrcALDMakNmNZUJPLSAsN+s8Prm8kbc68n+bWA7pFh1hHfIGWwoO8HWHZHWtRpfKFQlzvY6Zkz12FyI6u8ZGY7InrEyVEiTZe1S2NCPSbTJFZTwBsd2kxLfNh6/a8y+Y8y6bTjO48kN6QZ33xxPR6oV72t/U9i54qBiFQm2rtWQCE6ISvpE/zoYfJKEXE8EsEVdq8Q90SPO9hnXUTqaGuh8lEfPLOUcnrSZKWmzyuCoS2FDkNw1ZV+bYINEEK3GmAU2GM9WSaVJKeFjS0Goi9g89OmBHWD7qnPFgc6VuPUjXLwRt+wlIcdbRm9Ees8afHSocxXCsoEunHGdEWdLA1e4A69pvPor7ACbf0lsGFmWaRKn6WYQ39YfB16NIQvDFjmVLtOnXadSa43Zobop9GPpPev2tS/f3/Em2MbdksfrnbDuiAxONKiKLwg7V5ZpUmdch/VQgOHHJbzhGGIu0Sc7WFmpNhG6XaeEUioVGFVUOsklhkzOiENW6kQVOmEVlRYqfZvcqjRF5JftywleJ0knIt4zu9ek9axJnzAcoxGqpnauhPcWqpNmX0qF2p3JvUeT2qjBlNfFVk92iYtme2aRgK1Um1SuTYbj8ekEnskbDwbmCioFeKYQyY2eYCN4HSTqePX4zuAIZzg43E0UO8CBpbS/WaBKDHo1FKs91ga4osrRwkfaEtkw6ObY4JZJFboUqY7gwTkn92gBlUSXfINKpceCs1nGUHRE82zJbRxexwp4HfLKoQDj5FqJjwCGr0lGRKHuyu3xzW5cNBu8mWcr4aIODNd1Qp4Hdp3sU8p0ySCvNmbaA3rSwA1xeHZwJ882rh7yCvA6ICCB5JGIXB0r8BG+8FXHykZzSWi2II1LyZNIGzwejMsrSQg/CWfcQRKw8RHCeo7JrxpDTiAbLyCvYQpnOOBb+E+/7o7SOYN3KijEg1Z2S+nf+ux1k2yTGiICJ6mwByRG6HNcxOzWnOjbMgNvDruoTAj1pDDO+MnYIF0TU1imSZxBOM6piy+jEnrsNfNep4Ot/rLj9c/bXvuybR6wc4MxCNEpGC9Lu4e1TgXl7EaFxTisqF1/GjZsbr+tnZVWaFNKphOWaROrddn9o40LvE4zLTvcGZnU+npIsNbl54d2TxaTDh/TzdbWGXJkurTr2lSpVnTPmPNQLzHYgwwIn2uMw3hUT0clyBlIiegPak1ZGH2rzIuYlrO5fGrbwLmhXV+0vzGb6kDHqtuGnMm0jgHxPVOORJ0MqkotqfXklBi9KzLZTX3a7BmN5x2/IQbgFazHAHNxBThr9zGjnoWci+TGj/0cXvYBXXBxOAG+d6p/+5mBHbmDu65pRAO2xskY8/rdj0wFJSOJFVqhjANDfYd6CCbXAS9VrhOjlPsp2YJuNOsO2uFMB/MxtmlRAgxEMlSCzU4blKv7ijJBMkJEg1ZAqjWeqTPloIhFQVupS7umSWm1SF84m9frd7rGHzZKPsrdrXW1w9CVTw6uGNaD/LbACwIVPUpQttoJtnKt8BaVGSjdi3pHxTq8jMvQY69+YMq5T+dgwFpLZ981HW9gLgCScYzOO9cQuEHJihFhkSqhdCSJ+KSO+CRK8zuGrBr9cRxLdSLoVqER6pyKRbD5fN5hXV9Td93TnnqjhZr/Rrht2N7aYMpvMOfWm3MfMXkPzRfum3N+NGcj39TQmY/MxTbPImaykPRBdVkZX6JOlGiSpdpUHo+kE116pVYEqrKRJKiqtk/NPszDdr9V/sXZnR8KV72/b/mWfcv/60jE6bJUnWmeyRn4Xj0DobIq9KJSfYpEL6wxZYEQAkK9GtNxuVHUzObDYxcENuZhHLREnXJJGQu3JNJpUuCZN7QiUOEASgK4dCSxTJ2sXYhullE683LS+oRlkZ+GvZUQ9tu/hUX9XQDD8U7RmpuPQpZ2CLCHTB46hiIq8ZIu4Yo+kRiVWGUQQ8N79Jk7puPVRgwaRN2j1bNP5wso1oFo9Lq9PuQWL0ksvhZLSYEy9rIyrojgJUKiMs24gfaqem+RKr5Klx44CR+SLbs4de1fwiLjwyI/C/vt3rCozwVvJwmw5/He+lRQcT8/KFsHK4U4JVTyJSrhoibhbN+u8wOxl7QJwIN69eYcsN02isGGcReKZq/Ph87A6yV1E2NzI8fanB40znzWHk2pOvESh3dFlXBFnVCs3gsrUu+FmAXDcWjvsMgDTwnO1thRu/6zV9fGhfGigeftLwTr9pF9VKIAGqL9L0c36mnN7MBAXMHrSgzJl6m9wnvrdha+uqvk9aPPthUbk26ZMgPZ5KbUIfMAbfXbnGQa0+3xeudMnB1WOdg4vNjLqrgCVdxlIKni+MYqSjxj0j4Im8vtFJ2Ph2hTbP9NRFv35RTbW5+Frf1r2J2m8tlP90dT9m1jZok+GaLFli/f+v0rW//5yv57USWmZLlRjJAD201jeqVeJDMI+9km/2K2Z5byAo5khqEfZ8ZmPuggbEpd36a/LY/4c9iUT/6d88nPiU/CP0ELZpAfzU/0TZ+os3hUyIS4+1IquYDae6xte1zFmwlVq77riSkyJFabMuvobOyr9GkyQypM5Vwc25ifzLQ2M8U39eLrGiESJvq9IXtj0Kn1IGz9asX6T15du5tj+yRsKpfs5RQjwUbaf7PnV8mnY2irBXWTzTmGDg1+RdmHa2hxDe7emF5MJSHG8lRxF0fikU6u60V3OexbXCKZYGtZKNb0DTCIVYTAHEPE4GzvfvpaxMdha/cQx4v8K8GDem9xFsmBRcaFRex5RfjdLqfbSfIYEpoHCc3HeujbtFiuTwPeLaO4XC+UGFKuGYRyfTrA0FgdAAbPDDXp8JNsQdiMDPWng1Fgi+Cl4/DWfsIhfcIdIw4RjX8OyylNm33FRiZfhjxhSKs2iKESeLBHRVJtEt80paO9kgODPbDkuP71700vybJ5NoK3J4zPK2TP2x7Sjphs7Q0yTkM6QeWBW5frRVWGNIgDHmLGtCrDuGKVBiH2T03zj19/ejadUbUnbQPB4w2Qf56w3eONoty4UDP+lEsBGI5hXKKZx0ZhM1tAO8wMS8ZE/1I2bD8+kSGj/NuffrXm41emICds16F1w9q+Oa475GiEULIAngBIYbO1AAnIzw3hDFbXjMHOC2fD1tbT+GnGNuD9OuaXv+GQfv3HX74dG36mWGS2zj+4Rn/QxpYjzGRGYaUhpdKYgjKygclV0E20fapQRipChUWPuhcyMoCn9GpaKx5dyL8jzq8VX7mf9XSwzuEO/m51nlpZY7I+aKs/czUt8cSOxOMf5UiyhrWLy2x2H61zKbroxk5DO/+aG/dHmTwzShAISJmdrGMuARXKJlHhrvfTlv0uLfz9r4ltxj49/JNzkXfbJbMJ52LDz9PstGeJsohZ0vtn1u6mLVN/YlTK2oNgoJK0OcZmT6RSjCq3SvT7jDc2HgnflBa++ZvwLbAMzrhjtKSX7u6npr3EmosNXdZsPzFYXEFvaz42D826AlsYe/BxNx4o+Whs6iPWwSR9v21DquC9Q4LfHSFafQAecfgHR8O3ZoZvPRr+gZj8uRkC5kR1qacKnbnZ/LOLV/LbtgWNu6YLMjbjLDLv4PbbPTaje8A0fQkHGeaQd+Xjv55eFLdBKPh3sIkExA/TCQyoth9b9ocTy/5wbNm2Y4SQaJge/lluNEQOyebxOymnYsDeMMwqnF5bsBv1LGpGgJzi8sxWW+8cuGfOfcDkPeLWAcxYMAp495i/qlmyLvmVd8F2ULDxsABgcD+QgOfDk8t2nCL2Ydaybd8SGfER4M/fFAVnQ5GmYGueMJJnVmmLRdJulQaOZCefK2tbXKdE2KbniRFXO4Z5D8x5TdaSFm755WOmmPFMq+UZG52SF0PYDhC29zg26APRfn8sHFT/cXrZjmzCtpVjQ14B29b019qGGoKw9bC1T7iVuq2s/JlV1mIpf2aRzl4VaXOTnObwsqhCHAtYwwOdA9djwAObLMV3TdkP6PxmK56j7IlVUk/nwVkCz+pUNn349Yro/YKZbN9O6JY9TTeeDWF5+kZKELZWC3kdPv7anyz6JEt2ze5pEySjHsM9U26BKvYHVcxldew1bXLXaM3c65W5tSZTXxjzORvMedww/MJDhiwzxb7OlIsnG3jWtfoLGDSuTxHwPgm29zmfBMa2zHBE2ocnSMgh8KAkSSffhG/i2D7OigjChsFfM00WtIKqhVuI/JSRBL7aHXG2XtUknBqKPj20IWdoC2/nhrb9aDozxyIst9fjDkglCKVmSwnGYJAOj4kYnYvjPntd4FnnZKJ3kgXr9wmQS4h0XJ58Hxk/YzxJghD7D/hUmUFEwxfeSxV8cPj1IGxdbPVjc2ETU/yEKYGATWayKHnyFSHcr2gkATBnOcuZbq1W6QwkiKlytaC9kS5uY2rQiU/Ka3D1VRsz5QZu6pszDNgt08fOPNs7+wTRXxHpNpB0QpQhnskRgodwcl0cJN10hIi24YBg8+HXgrChdIB0ZDmyuZCDLBy2TfUYg/aG88odObOoeCvXpQTGHpI7pCjRJBZrE0q1e7G/pk2qM56ZXHcy7GiqNZ0BIewhkw/aGY/mgjydsCVzbrlfMNnFofvmnXPcuDBDI8jhungKm0XBdPNz8zlDtgY8bETRjLXSjeaCUGCwfwxvn5zWVdqbitQJELlEm3hNlwxs/qUxgrNMm9Rjq510TjgFnkjQcK1qKuTZCN5+wXgvd4h0dCi7NvGVF3eAegWNACPe+5UgLjvav9g583r6whxsucPbNNzSHZuXluiSL6vjwFaqTbquG1/OIKVS0X6VvFVNMS1gxN2naY/JXDOFlyKIFhKXg4AktYg4zkPc8UHSDsXgvfja9/L0RbM9ZgrPzqkb5erG19pZWf7wLp6tjCxnIGxVVFqlXlShI68j0d5sKZ7358a87v15O9dPsI07Jx97IEkdN3J8gLSjt0Di2Xp4+aBOsWi2YXvTheGQ8SbTifjXSxVa4Q+qcTaoVK5Nvq5LvUGJKiihRJtM2NTxlTqRawHrPu93yjcffOOdQLx9hIF0el9NGPcnsMlHKeGl93L5cxfHRu5bJwzF1jNK5ggQrqDKV+5CB1g0En9Vs3d8IYOOX8uQVKzZiy/gePaMYtCtqPbM+pTwQLxx2yeY3fjF+R2orZfC5udiqdqQOYMKnXibtZx/d8Gzfa/cmQ/pRuIgEWBKNdxaBs4bAXxZFSvRJC1wQSs881yl6N39y4LgTbf0onjKPHXNpbx/4/9LDlJfkSbh6kjCLb0Y6X7qVnxOaAK2vOGYAtXuy5x6V9TxoMIe2ChlgF2hTQn6H1xCbTceFezMXPOe8NVp/jlxsOPrFZlliTbntAs+17tFYHiCvWdCDwk2gqeMAcZF5e4CdewldexFVSyO4a5oRxe62J+jWUPl48L9P8T88dsI1Jnbj7z5nxmrE/+xPa86c0CnmP39F/LeFAVAoTqexxsnVO76gTMco+WyKk7rUizt4nDRIar7aX89TKFuCTVZ8qLYsPXa6y6qdk/iBdo/h2NaR6XP/xPzbi/w/2T2OsjSKF6oSQGRUboWsGToZWfzk2U8LEp7lPkohVE6QkyH78X+X8UgbD9X+x9Zec5mOQRYmgAAAABJRU5ErkJggg==
// @include        http://tatoeba.org/*
// @match          http://tatoeba.org/*
// @include        http://tatoeba.fsffrance.org/*
// @match          http://tatoeba.fsffrance.org/*
// @exlude         http://tatoeba.org/*/wall/*
// @include        http://*.tato.sysko.fr/*
// @match          http://*.tato.sysko.fr/*
// @match          http://anonymouse.org/cgi-bin/anon-www_de.cgi/http://tatoeba.org/*
// @include        http://anonymouse.org/cgi-bin/anon-www_de.cgi/http://tatoeba.org/*
// @require        http://code.jquery.com/jquery-1.6.js

// @require        https://jquery-json.googlecode.com/files/jquery.json-2.2.js

// ==/UserScript==

$(document).ready(main);
function main(){
	facelang = window.location.href.split('/')[3];
	GM_log('facelang: '+facelang);
	
	user = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ3SURBVDjLpZNtSNNRFIcNKunF1rZWBMJqKaSiX9RP1dClsjldA42slW0q5oxZiuHrlqllLayoaJa2jbm1Lc3QUZpKFmmaTMsaRp+kMgjBheSmTL2//kqMBJlFHx44XM7vOfdyuH4A/P6HFQ9zo7cpa/mM6RvCrVDzaVDy6C5JJKv6rwSnIhlFd0R0Up/GwF2KWyl01CTSkM/dQoQRzAurCjRCGnRUUE2FaoSL0HExiYVzsQwcj6RNrSqo4W5Gh6Yc4+1qDDTkIy+GhYK4nTgdz0H2PrrHUJzs71NQn86enPn+CVN9GnzruoYR63mMPbkC59gQzDl7pt7rc9f7FNyUhPY6Bx9gwt4E9zszhWWpdg6ZcS8j3O7zCTuEpnXB+3MNZkUUZu0NmHE8XsL91oSWwiiEc3MeseLrN6woYCWa/Zl8ozyQ3w3Hl2lYy0SwlCUvsVi/Gv2JwITnYPDun2Hy6jYuEzAF1jUBCVYpO6kXo+NuGMeBAgcgfwNkvgBOPgUqXgKvP7rBFvRhE1crp8Vq1noFYSlacVyqGk0D86gbART9BDk9BFnPCNJbCY5aCFL1Cyhtp0RWAp74MsKSrkq9guHyvfMTtmLc1togpZoyqYmyNoITzVTYRJCiXYBIQ3CwFqi83o3JDhX6C0M8XsGIMoQ4OyuRlq1DdZcLkmbgGDX1iIEKNxAcbgTEOqC4ZRaJ6Ub86K7CYFEo8Qo+GBQlQyXBczLZpbloaQ9k1NUz/kD2myBBKxRZpa5hVcQslalatoUxizxAVVrN3CW21bFj9F858Q9dnIRmDyeuybM71uxmH9BNBB1q6zybV7H9s1Ue4PM3/gu/AEbfqfWy2twsAAAAAElFTkSuQmCC';
	user_comment = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ5SURBVDjLfZJtSFNRGMenRkgY1BKiL30yEkqJrCjrgxBB5Qtmyy3NcGoUuqD5skEm+ZZizpTUmZEw33ML06lzGoQKtRRETXM2Z1LOTBs6LNNw9/w7d+IiuevAj3vO4fx/z+E5lweAtxVRvp5Pqaf8psAF3RQfngtBa1OvCet2Bq5Ge/80K5nkCntR7AwhsP0imF8msCwRfF4k+GQlmFxgYF7YEKerDJzV90vKexwHZm0EX2hw6juBaZ6B8RuDsa8MRiwbggL1IP57A7b6NK36kYbH5xiM0vCwhRXYHYKMmnd/gwlH+dvunPTOehy623ZLlrfO9oCVbA72JsMzjEPK2QP5Gb5UGewJxcXtKBLsQ2JKBkR5OkfHq/QfnKKlH2uONd0f/ecVioM8OzXyC+hRRKFAeBC3A3dAfHwn7ob71tCD5rnFlc3gKiVjM+cUlEbsqZ4xqLE81IT3Lx6gXyXDUMsjpGQqRip1Y2zwJ0W6tWfOyZUQQepEYxpZHW8FTFqsGdvRX5dORLlaKw0mcP0vTsHekAYPXkDFE3VxNplU3cREXQrMdRKoCnOI+5Gycu9zlR4uBbvON7l5nNbkykunGL0VkGvfQqo2QFJtwLNhIDHfZHc/UZvpFVThxik4FfEwNS2nDc+NBMkDwI0+4LoeiNQAV+sJcrsIxMnNJDD0noxTMFt4CAPqUiSp5xHbAcRoCIQ1BBFVBGFPAYFiAYPNSkxl+4JTYFYGv6mVxyBU2oe4LiC+GxDrKPR7rQU4G9eBl/ejMVEW1sspMDUk8V+VxPsHRDZkHbjcZvGL7lrxj+pe8xN2rviEa63HLlUVvS6JPWxqlPC5BH8A3ojcdBpMJSoAAAAASUVORK5CYII=';
	comment = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEvSURBVDjLY/j//z8DJZiBagZEtO8QAuKlQPwTiP/jwbuAWAWbARtXHrz1//efv//xgS0n74MMuQ3EbHADgBweIP7z99+//x++/fv/8tO//88+/vv/5P2//w/f/ft/782//7df/f1/5xXE8OoFx0GGmCEbIJcz9QBY8gVQ47MP//4/Bmp+8Pbf/7tQzddf/P1/9RnEgM5VZ0EGeGM14ClQ86N3UM2v//2/9RKi+QpQ88UnuA2AewHk/PtAW++8/vv/JlDzted//18Gar7wBGTAH7ABtYtOgAywxBqIIEOQAcg1Fx7/BRuMFoicuKLxDyzK5u64Cjfo/ecfYD5Q/DLWaMSGgQrvPH/3FabxOxDXEp0SgYp7Z267AtL4BYgLSUrKQA1KQHwPiFPolxcGzAAA94sPIr7iagsAAAAASUVORK5CYII=';
	status_offline = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE4SURBVCjPZdBLSwIBGIXh/lHQb4guyza1CEIqpNoIQdHKXEQQrkS6IUSLFhYFtpCIwUAG07IstTTnqjNTjnSRZmPg4m3lpYZvd84DB74BBjq36zkXk07CORB9nl7aVydtkwZ1NKL2tMcFYqLJOxYGb1QIiC5w5dhYGOgo6EQcFxCcOjV0VCRUdtxgX1R4RaZClTzz7okF/2FLo0SRChvtkdA/sDl1Wk6RQuASAYHg54S/D6wPnjzrNLAwqVJBJsfax/BoFwQjZWw0LEx0SmQocsGk2AVHko6MhoGByhMZEqSZ++qCs5bBLSo1qkgUSBMny1K7C45/qtwho6NQ4oFr4mRZ7IGwmqWAjMILee65IUWMmd6Ed3xlL4qEjkqZR9KE8X2PDf151Kq9ZW03Q+1Ae7np1WZznfwXGfNkzblrzUIAAAAASUVORK5CYII=';
	

	nativeusers = {"saeb":"ara","Samer":"ara","motaamel":"ara","hasenj":"ara","socom":"ara","theegyptian":"ara","LOBD":"ara","Demetrius":"bel","wizardist":"bel","ednorog":"bul","ziggsmith":"cat","Martha":"cmn","fucongcong":"cmn","Tajfun":"cmn","tsayng":"cmn","kooler":"cmn","dericteng":"cmn","kanaorange":"cmn","sarah":"cmn","moonoops":"cmn","leoyzy":"cmn","humihiro":"cmn","danepo":"dan","christianandersen":"dan","Jon":"dan","medlem":"dan","Roedgroed":"dan","tbrams":"dan","MUIRIEL":"deu","Esperantostern":"deu","xtofu80":"deu","arcticmonkey":"deu","Sudajaengi":"deu","Manfredo":"deu","Espi":"deu","samueldora":"deu","Wolf":"deu","BraveSentry":"deu","Hans_Adler":"deu","Fingerhut":"deu","cost":"deu","jakov":"deu","kolonjano":"deu","lilygilder":"deu","Haehnchenpaella":"deu","sigfrido":"deu","al_ex_an_der":"deu","Vortarulo":"deu","Hans07":"deu","xeklat":"deu","Chris":"deu","kroko":"deu","stefz":"deu","Miyako":"deu","ELPHONY":"deu","uschi":"deu","laylai":"deu","Alois":"deu","jxan":"deu","konny":"deu","Kiwisplit":"deu","ysmalan":"deu","esocom":"deu","Kleinchen42":"deu","joha2":"deu","yunyo":"deu","kaz71":"deu","Bernardo":"deu","nitrox26":"deu","popeofdiscordia":"deu","dubst3pp4":"deu","CK":"eng","Source_VOA":"eng","papabear":"eng","Zifre":"eng","Nero":"eng","darinmex":"eng","blay_paul":"eng","fcbond":"eng","CM":"eng","eastasiastudent":"eng","cntrational":"eng","ulyssemc1":"eng","nadsat":"eng","kebukebu":"eng","piksea":"eng","saasmath":"eng","AOCinJAPAN":"eng","Shiawase":"eng","spockofvulcan":"eng","Source_Benedict_1921":"eng","jamessilver":"eng","LittleBoy":"eng","Jane_Austen":"eng","emilykamalei":"eng","Chrikaru":"eng","Cindrogriza":"eng","Ignoto":"eng","soj4l":"eng","American":"eng","beaushiny":"eng","Dunbab":"eng","driada":"eng","Pun_intended":"eng","drahcir":"eng","Kat":"eng","Nevado":"eng","Ronin1134":"eng","Plodder":"eng","djinni74":"eng","JimBreen":"eng","yifen238":"eng","NekoKanjya":"eng","Silja":"fin","ondo":"fin","talvipuutarha":"fin","Hautis":"fin","oeblink":"fin","Tipi":"fin","viljami":"fin","inkku":"fin","sulkami":"fin","sae":"fin","sacredceltic":"fra","sysko":"fra","U2FS":"fra","qdii":"fra","hortusdei":"fra","TRANG":"fra","rene1596":"fra","dominiko":"fra","mamat":"fra","Cocorico":"fra","zmoo":"fra","Archibald":"fra","Goofy":"fra","Bruno":"fra","Quazel":"fra","Barbiche0":"fra","jerom":"fra","Wittydev":"fra","NomadSoul":"fra","Snout":"fra","GeeZ":"fra","SUZIE":"fra","bourdu":"fra","gall":"fra","Corvus":"fra","slist":"fra","rtroisgr":"fra","pjer":"fra","hirymnak":"fra","mayliu":"fra","Freyja":"fra","Tcha":"fra","pasquet_fernando":"fra","Anthony":"fra","Ellis":"fra","tabiste":"fra","Biptaste":"fra","Nucleos":"fra","Ppjet6":"fra","stomate":"fra","Alico":"fra","parquette":"fra","Hel":"fra","chkube":"fra","Shyrion":"fra","gleOsp":"glg","Eldad":"heb","Dardasavta":"heb","Geek_God":"heb","gkh":"heb","mihxal":"heb","artyom":"heb","oyd11":"heb","mimiamir":"heb","minshirui":"hin","billy_boomo_2":"hrv","Muelisto":"hun","szaby78":"hun","Aleksandro40":"hun","Farkas":"hun","debian2007":"hun","Barbulo":"hun","foolzizz":"hun","simbal":"hun","pryo":"ind","ajid":"ind","medduki":"ind","asambul":"ind","Swift":"isl","andrioid":"isl","Kristofer":"isl","Guybrush88":"ita","Pharamp":"ita","riccioberto":"ita","rado":"ita","martin":"ita","Heracleum":"ita","leonardo":"ita","bruno_b":"ita","shoras":"ita","Cero":"ita","zhou24":"ita","Tradukero":"ita","antilope":"ita","hwarang":"ita","anais":"ita","giok":"ita","zhou24":"ita","marcospinello":"ita","bunbuku":"jpn","mookeee":"jpn","thyc244":"jpn","arihato":"jpn","qahwa":"jpn","Namikaze":"jpn","hambird":"jpn","Rie1023":"jpn","slomox":"nds","martinod":"nld","Dorenda":"nld","Vulgaris":"nld","simonbr":"nld","LaraCroft":"nld","phiz":"nld","megamanenm":"nld","koosscharroo":"nld","GrizaLeono":"nld","slavneui":"nld","rabbel":"nld","ReneeMona":"nld","McDutchie":"nld","Insania":"nld","contour":"nob","Tokkyun":"nob","maja":"nob","pliiganto":"pes","Esperantodan":"pes","EsperantoFarsi_Robot":"pes","mahdiye":"pes","ghasemkiani":"pes","AsliAbbasi":"pes","behi":"pes","armandaneshjoo":"pes","pedrampc68":"pes","reto":"pes","Mahmud":"pes","hamid":"pes","yas_dj":"pes","zipangu":"pol","Bilberry":"pol","simaqian":"pol","hebrajska":"pol","orzechowski":"pol","buari":"pol","lukaszpp":"pol","Pacio":"pol","Janka":"pol","Ptr":"pol","gregloby":"pol","kertoip":"pol","esperanto":"pol","Flieg":"pol","damc":"pol","customic":"pol","sapper":"pol","pavpi":"pol","marines":"pol","fialastelo":"pol","aseeon":"pol","esperanta":"pol","SilvX":"pol","k4lafior":"pol","emmedi":"pol","kosapehape":"pol","damienix":"pol","nectarine_queen":"pol","Deasmond":"pol","fanty":"pol","alexmarcelo":"por","brauliobezerra":"por","une_monica":"por","paula_guisard":"por","Gyuri":"por","lazymoose":"por","vekiano":"por","marloncori":"por","carlo":"por","KenBr":"por","Celio":"por","lucas":"por","FernandoMaiaJr":"por","oleckramo":"por","martins":"por","Luiz":"por","cyntia":"por","alexmaur":"por","ijikure":"ron","koosy":"ron","poxa":"ron","dmf":"ron","Hellerick":"rus","shanghainese":"rus","ae5s":"rus","afyodor":"rus","Arkadeko":"rus","salikh":"rus","Tonari":"rus","Maksimo":"rus","kobylkin":"rus","joulin":"rus","elsteris":"rus","Aleksej":"rus","saiko":"rus","corvard":"rus","Keiden":"rus","souris_qui_rit":"rus","GranD":"rus","OlgaElwen":"rus","Lili691":"rus","stariy":"rus","katjka":"rus","Mira":"rus","Vokabre":"rus","aleph":"rus","drewhka":"rus","tony":"rus","Shishir":"spa","tatoerique":"spa","marcelostockle":"spa","hayastan":"spa","hundo":"spa","Leono":"spa","chinopinyin":"spa","arashi_29":"spa","ventana":"spa","ildefonk":"spa","opor":"spa","japegon":"spa","Rafp":"spa","inmachan":"spa","quarzoliquido":"spa","washisnein":"spa","leoruilova":"spa","sarostegui":"spa","krash":"spa","lorcon":"spa","azulmarino":"spa","sharin":"spa","migueltoledo86":"spa","Ephraim":"spa","pilotcdmark":"spa","rafmen":"spa","ajmy11":"spa","ryuzaki":"spa","P_Scipio":"spa","dexiee":"spa","Angel_VV":"spa","javc_86":"spa","colonqn":"spa","mrc3306":"spa","Nersis":"spa","ltsiros":"spa","Ignatius881":"spa","Apaxito":"spa","aliamondano":"spa","naikodemus":"spa","abu3":"spa","kokorosama":"spa","zorder":"spa","javo":"spa","dabth":"spa","MiGatoSeneca":"spa","Andranik":"spa","Dimitrije":"srp","mrdax":"srp","Tximist":"swe","Don":"swe","arahlen":"swe","HannesP":"swe","sanda":"swe","Tobberoth":"swe","Hanna":"swe","selimcan":"tat","gracefully":"tgl","duran":"tur","boracasli":"tur","AKINCI81":"tur","mmanyak":"tur","aandrusiak":"ukr","deniko":"ukr","ChickenKiev":"ukr","ascolto":"ukr","uaspeaker":"ukr","brambury":"ukr","Qermit":"ukr","zinova":"ukr","autuno":"vie","nthkmf":"vie","ngocdaothanh":"vie","nickyeow":"yue"};

// @require        http://home.pages.at/k8ag/languageof.js
//cross-userscript interaction
//$('#header a').attr('href','');
//$('#header').click(function(){
//	alert('Show User Profile Inline header click');
//});
//$('#header').click();

//idea: count word length and make stats
//idea: contributions per day graph
//check: not logged in => throw error

	//This may save you a lot of time
	default_cache = {"admor1":{"bel":"1","ukr":"1","pes":"1","pol":"1","ara":"1","bul":"1","heb":"1","eng":"1","rus":"1","slk":"1","deu":"1"},"ajissai":{"deu":"1"},"aliene":{"cmn":"1","jpn":"1","eng":"1"},"Alois":{"epo":"1","deu":"1","eng":"1","fra":"1","swh":"1","ces":"1"},"Alta":{"vie":"1","epo":"1","fra":"1"},"anonym":{"por":"1","epo":"1"},"arashi_1":{"spa":"1"},"arihato":{"jpn":"1","jbo":"1","eng":"1","epo":"1","eus":"1"},"aye1":{"spa":"1","eus":"1","cmn":"1","eng":"1"},"bannedagain":{"eng":"1"},"behi":{"pes":"1","epo":"1"},"behnam":{"pes":"1"},"blay_paul":{"eng":"1609","jpn":"664","fra":"5","deu":"2","epo":"1","ita":"1"},"brauliobezerra":{"eng":"132","fra":"4","spa":"2","por":"7430"},"Bruno":{"fra":"1","epo":"1"},"calmanani":{"pol":"1","eng":"1","epo":"1","nob":"1"},"ChickenKiev":{"ukr":"1","eng":"1","rus":"1"},"Chris":{"deu":"1","eng":"1"},"CK":{"eng":"73604","jpn":"2","ita":"1"},"corani":{"nld":"1"},"cpascal":{"ron":"1"},"danepo":{"dan":"1","epo":"1","swe":"1","eng":"1","deu":"1","unknown":"1"},"David":{"eng":"1"},"Demetrius":{"eng":"258","deu":"16","jpn":"1","tur":"10","cmn":"5","rus":"1827","nld":"1","spa":"10","ukr":"1500","bul":"1","fin":"3","srp":"3","lat":"69","bel":"2171","yue":"20","tat":"227","lzh":"54","ces":"2","uzb":"7","slv":"9","san":"1"},"DeSha":{"jpn":"1","ukr":"1","eng":"1","rus":"1","ita":"1","hun":"1","oss":"1","epo":"1","deu":"1","cmn":"1","srp":"1","vie":"1"},"dominiko":{"epo":"1","bre":"1","fra":"1","eng":"1","ita":"1"},"Dorenda":{"nld":"1","rus":"1","fra":"1","eng":"1","pol":"1","ukr":"1","deu":"1","nob":"1","bel":"1","fry":"1","afr":"1","ron":"1","hun":"1","epo":"1","jpn":"1"},"duran":{"tur":"1","eng":"1","zsm":"1","ind":"1"},"Eldad":{"eng":"1904","jpn":"1","epo":"3286","deu":"157","spa":"63","fra":"370","por":"7","ita":"11","pol":"5","rus":"31","nld":"4","hun":"4","tur":"12","pes":"18","ara":"187","heb":"9346","lat":"1","ell":"1","arz":"5","sqi":"1","hye":"1"},"Esperantodan":{"pes":"1","epo":"1","urd":"1","eng":"1","ara":"1"},"friguron":{"spa":"1"},"fucongcong":{"eng":"33","fra":"240","wuu":"1759","yue":"1","cmn":"9027"},"gall":{"fra":"1","eng":"1"},"gasche":{"fra":"1","eng":"1"},"gracefully":{"tgl":"1","jpn":"1","eng":"1"},"gracehero":{"mon":"1","jpn":"1","eng":"1"},"Grayster":{"jpn":"1","eng":"1"},"gregloby":{"pol":"1"},"GrizaLeono":{"epo":"1","nld":"1","vie":"1","fra":"1","eng":"1","spa":"1","rus":"1"},"gurobu":{"nob":"1"},"Guybrush88":{"eng":"10474","fra":"2069","por":"2","ita":"26059","cmn":"191","lat":"5","zsm":"1"},"Hans1":{"epo":"1","deu":"1","lat":"1","nds":"1","afr":"1","jpn":"1","eng":"1","spa":"1","ita":"1","cat":"1","por":"1","nld":"1","dan":"1","pol":"1","est":"1","ces":"1","srp":"1","cmn":"1","vie":"1","kor":"1","tur":"1","lvs":"1","fin":"1","fra":"1","nob":"1","ron":"1"},"Hector1":{"eng":"1"},"helmfer":{"por":"1","eng":"1","spa":"1","deu":"1","nld":"1","glg":"1"},"Heracleum":{"ita":"1","eng":"1"},"hundo":{"spa":"1"},"iceman":{"ukr":"1","rus":"1"},"ivanov":{"rus":"1","oss":"1","epo":"1","bul":"1"},"jakov":{"eng":"441","epo":"582","fra":"76","deu":"1097","lat":"2"},"japegon":{"spa":"1","glg":"1","eng":"1","fra":"1","por":"1"},"JimBreen":{"eng":"11","jpn":"6"},"jmli":{"eus":"1","spa":"1"},"jorgearestrepo":{"spa":"1","eng":"1","por":"1"},"kertoip":{"pol":"1"},"kobylkin":{"rus":"1","bul":"1"},"Kokoo":{"eng":"1","spa":"1","cat":"1"},"koosy":{"ron":"1","eng":"1"},"kriskelvin":{"deu":"1"},"landano":{"deu":"1","epo":"1","eng":"1","fra":"1"},"lenon_perez":{"por":"1","deu":"1","ita":"1","fra":"1","eng":"1"},"Leynaf":{"spa":"1","eus":"1","eng":"1"},"ludoviko":{"fra":"10","deu":"105","epo":"664","eng":"24","spa":"1","ita":"1","lat":"1"},"LugoIlmer":{"spa":"1","jpn":"1","eng":"1"},"lukaszpp":{"eng":"1","spa":"1","pol":"1"},"mahdiye":{"pes":"1","eng":"1"},"Maksimo":{"rus":"1","epo":"1"},"marco1":{"eng":"1","ita":"1","swe":"1"},"McDutchie":{"ina":"1","nld":"1","eng":"1","ita":"1","glg":"1"},"minshirui":{"hin":"1","cmn":"1","yue":"1","eng":"1","spa":"1","jpn":"1","urd":"1"},"Miyako":{"deu":"1"},"mohammadjordan1":{"pes":"1"},"Mouseneb":{"eng":"1","cmn":"1"},"Muelisto":{"hun":"1","epo":"1","nld":"1","eng":"1","lat":"1"},"MUIRIEL":{"ita":"19","por":"205","lat":"33","swe":"1","spa":"17","deu":"16046","eng":"194","epo":"3","fra":"643"},"muzikanta_hipopotamo":{"epo":"1","deu":"1"},"nadya":{"rus":"1","bul":"1","ukr":"1"},"Najeebullahhanfiy":{"pes":"1"},"oksigeno":{"epo":"1"},"OlgaElwen":{"rus":"1"},"ondo":{"epo":"1","fin":"1","eng":"1","deu":"1","swe":"1"},"opti":{"deu":"1","epo":"1"},"papabear":{"eng":"2911","lat":"1"},"peipei":{"cmn":"1","fra":"1","eng":"1"},"PeterR":{"eng":"66","deu":"1048","fra":"4","por":"1","swe":"116"},"phiz":{"nld":"1","fra":"1","deu":"1","jpn":"1","eng":"1","ita":"1","swe":"1","fin":"1"},"pierrephi":{"fra":"1","jpn":"1","eng":"1","spa":"1"},"qahwa":{"jpn":"1","ara":"1"},"quarzoliquido":{"spa":"1"},"Quazel":{"fra":"1","eng":"1","jpn":"1"},"Quonpi":{"fra":"1","spa":"1","bre":"1","eng":"1","pol":"1","fin":"1","kor":"1","rus":"1","ita":"1","jpn":"1","epo":"1","deu":"1","ces":"1"},"rado":{"epo":"1","lat":"1","ita":"1","eng":"1","fra":"1"},"riccioberto":{"ita":"1","eng":"1","epo":"1","jpn":"1","por":"1","lat":"1","ell":"1","ces":"1","fra":"1","spa":"1","rus":"1","swh":"1","cmn":"1","ron":"1","deu":"1"},"Romira":{"fra":"1"},"Ronaldonl":{"epo":"1","nld":"1","eng":"1","deu":"1","fra":"1"},"rosa":{"glg":"1"},"rtroisgr":{"fra":"1","por":"1","epo":"1"},"sacredceltic":{"fra":"1","eng":"1","epo":"1","nld":"1","deu":"1","scn":"1","spa":"1","ita":"1"},"saeb":{"ara":"1","eng":"1","jpn":"1","fra":"1","arz":"1","pes":"1"},"scornfulpen":{"eng":"1","jpn":"1"},"Scott":{"eng":"3471","jpn":"930","fra":"6872","deu":"14","ita":"2","spa":"14","lat":"16"},"SeeVogel":{"deu":"1","jpn":"1","kor":"1","eng":"1"},"sencay":{"epo":"1","tur":"1","deu":"1","eng":"1","fra":"1"},"shanghainese":{"rus":"1","lzh":"1","ukr":"1","cmn":"1","eng":"1","heb":"1","deu":"1","san":"1","jpn":"1"},"Shishir":{"eng":"196","spa":"19895","por":"207","tur":"3","deu":"50","fra":"154","nld":"1","cmn":"47","rus":"15","ita":"12","hrv":"8","cat":"1"},"shoras":{"ita":"1"},"Silja":{"fin":"1","eng":"1","jpn":"1"},"simonbr":{"nld":"1","afr":"1","ces":"1"},"Sprachprofi":{"deu":"1","epo":"1","ell":"1","eng":"1","fra":"1","cmn":"1","ita":"1","spa":"1","swh":"1"},"subbeena":{"hun":"1","slk":"1","eng":"1"},"Swift":{"isl":"1","deu":"1","eng":"1","jpn":"1","fra":"1","swe":"1","dan":"1","lat":"1"},"sysko":{"fra":"1","cmn":"1","eng":"1","deu":"1","ces":"1","epo":"1","jpn":"1","tur":"1","wuu":"1","est":"1","zsm":"1","nob":"1","swh":"1","hun":"1","sqi":"1","nld":"1","bre":"1","yue":"1","vie":"1","lat":"1","pes":"1"},"szaby1":{"hun":"1","eng":"1","jpn":"1","por":"1","nld":"1"},"temcat":{"nob":"1"},"thana":{"eng":"1"},"tijlan":{"jbo":"1"},"Tita":{"tur":"1"},"Tonari":{"rus":"1"},"TRANG":{"fra":"1","deu":"1","eng":"1","jpn":"1","spa":"1","ita":"1","rus":"1","vie":"1","nld":"1","kor":"1","hye":"1"},"tranglich":{"eng":"1"},"Trank":{"jpn":"1","bul":"1","eng":"1"},"trotter":{"fra":"1","eng":"1","jpn":"1"},"umarsaid":{"ind":"1"},"V_Zmoova":{"rus":"1","ces":"1","srp":"1","ita":"1","eng":"1","fra":"1"},"Valodnieks":{"ido":"1","eng":"1","deu":"1","ile":"1"},"Vortarulo":{"epo":"1","deu":"1","eng":"1","tlh":"1","cmn":"1","toki":"1","tha":"1","afr":"1","fra":"1","non":"1","vol":"1","vie":"1","urd":"1","ukr":"1","tur":"1","tgl":"1","swe":"1","swh":"1","spa":"1","slv":"1","slk":"1","srp":"1","ron":"1","pol":"1","nob":"1","lit":"1","lvs":"1","kor":"1","jpn":"1","gle":"1","ina":"1","isl":"1","hun":"1","heb":"1","ell":"1","kat":"1","glg":"1","fin":"1","est":"1","nld":"1","dan":"1","ces":"1","cat":"1","bul":"1","bos":"1","eus":"1","hye":"1","sqi":"1","rus":"1","lat":"1","ara":"1","lzh":"1","por":"1","jbo":"1","hrv":"1"},"Wadimiy":{"rus":"1","deu":"1","epo":"1","lat":"1","bul":"1"},"Warnerbroder":{"spa":"1","eng":"1"},"witbrock":{"eng":"1","fra":"1","lat":"1","cycl":"1"},"xtofu1":{"deu":"1","jpn":"1","eng":"1","cmn":"1","lat":"1"},"yessoos":{"eng":"1","pol":"1"},"ynnck":{"cat":"1"},"zipangu":{"pol":"1","rus":"1","jpn":"1","eng":"1","ita":"1","fra":"1","lat":"1","yid":"1","spa":"1","afr":"1","eus":"1"},"zvaigzne":{"eng":"1","rus":"1","lvs":"1","por":"1","deu":"1","swh":"1"},"selimcan":{"tat":"845"},"Nero":{"eng":"2695","fra":"39","deu":"1885","epo":"680","nld":"1","heb":"1","rus":"3","lat":"15","ina":"21","ido":"8","vol":"306"}};
	default_cache = $.toJSON(default_cache);
	
	from_default_cache = {};
	from_default_cache = $.toJSON(from_default_cache);
	
	//BEGIN USER STATS
	cache = GM_getValue('cache');
	GM_deleteValue('chache');
	cache = cache || default_cache;
	cache = $.evalJSON(cache);
	GM_log('cache: '+$.toJSON(cache));
	
	from_cache = GM_getValue('from_cache');
	from_cache = from_cache || from_default_cache;
	from_cache = $.evalJSON(from_cache);
	GM_log('from_cache: '+$.toJSON(from_cache));

	auto_load = GM_getValue('auto_load');
	auto_load = auto_load || false;
	
	onlyoneatatime = GM_getValue('onlyoneatatime');
	onlyoneatatime = onlyoneatatime || true;

	//Thanks to http://davidwalsh.name/detecting-google-chrome-javascript
	is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	if(is_chrome){
		//chrome debug
		$('.sentences_set .menu li.translateLink a').click(function(){$('.sentences_set .menu li.translateLink a').parent().parent().siblings('div').show();});
	}

	/* // LANGUAGE STATISCTICS
	function parse(){
		GM_log('parse');
		var total = cache[username]['sum']['all'];
		var show = [];
		i=0;
		for(lang in cache[username]['sum']){
			if(lang!='all'){
				langnum = cache[username]['sum'][lang];
				var name = langnameselect.find('option[value="'+lang+'"]').text();
				show[i] = langnum/1000000+'_'+lang+'§§§<a href="'+ sentences_url+ '/'+ lang+ '" title="'+ name+ ' ('+ Math.round(langnum*10000/total)/100+'%)"><img class="profilestatsimg" width="30" height="20" alt="'+ lang+ '" src="http://flags.tatoeba.org/img/flags/'+ lang+ '.png"><span class="total" style="margin-left:5px;">'+ langnum+ (langnum*100/total>=1 ? ' ('+ Math.round(langnum*100/total)+'%)' : '')+ '</span></a><br/>';
			}
			else{
				show[i] = '0.000000_aaa§§§<a href="'+ sentences_url+ '/" title="100%">'+total_text[facelang]+ ': '+ total+ ' (/'+total_number_of_sentences+')</a><br/>';
			}
			i++;
		}
		show.sort();
		show = show.reverse();
		show = $.map(show, function(value){
			return value.split('§§§')[1]; //the '§§§' was added for sorting only
		}).join('');
		contributionstats.html(show);
		
		if(total_number_of_sentences!=total){
			$('div h2 + dl dd:nth(1)').css({'color':'red'});
		}
		else{
			$('div h2 + dl dd:nth(1)').css({'color':'green'});
		}
		
		
		var from_total = from_cache[username]['sum']['all'];
		var from_show = [];
		i=0;
		for(lang in from_cache[username]['sum']){
			if(lang!='all'){
				langnum = from_cache[username]['sum'][lang];
				var name = langnameselect.find('option[value="'+lang+'"]').text();
				if(lang=="_t_"){ //translation
					from_show[i] = langnum/1000000+'_'+lang+'§§§<a href="'+ from_sentences_url+ '/" title="'+ t_text[facelang]+ ' ('+ Math.round(langnum*10000/from_total)/100+'%)"><img class="profilestatsimg" width="33" height="16" alt="'+ lang+ '" src="http://flags.tatoeba.org/img/translate.png"><span class="total" style="margin-left:5px;">'+ langnum+ (langnum*100/from_total>=1 ? ' ('+ Math.round(langnum*100/from_total)+'%)' : '')+ '</span></a><br/>';
				}
				else if(lang=="_l_"){ //link
					from_show[i] = langnum/1000000+'_'+lang+'§§§<a href="'+ from_sentences_url+ '/" title="'+ l_text[facelang]+ ' ('+ Math.round(langnum*10000/from_total)/100+'%)"><img class="profilestatsimg" width="16" height="16" alt="'+ lang+ '" style="margin: 0 8px;" src="http://flags.tatoeba.org/img/link.png"><span class="total" style="margin-left:5px;">'+ langnum+ (langnum*100/from_total>=1 ? ' ('+ Math.round(langnum*100/from_total)+'%)' : '')+ '</span></a><br/>';
				}
				else if(lang=="_m_"){ //modified
					from_show[i] = langnum/1000000+'_'+lang+'§§§<a href="'+ from_sentences_url+ '/" title="'+ m_text[facelang]+ ' ('+ Math.round(langnum*10000/from_total)/100+'%)"><img class="profilestatsimg" width="33" height="16" alt="'+ lang+ '" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAQCAIAAAAXoIEwAAAACXBIWXMAAAsSAAALEgHS3X78AAADA0lEQVR42rWU7UuTURjG+wv8FhEEmohRGGoEynybURDYB9GSEpFJiiMFEdeKqduUNnRYrDULNiKdc9Y0J9ucQ1atHBpzLNt8QRujDZsubBM3bE2cXXhg2VxSQhcP47nPee77d+6XsyM7/19H9hrr6+sKhSI7O5vJZJpMpgPctiPbh2QQQFRWq3W/QyAcKBorSupP4n3gHYZBQm9ubiIhks1+B/Gc+NZkjSNku6grbJ1uja4Hg0EckcViMRiMrq4uh8NxUB4SiQSYPx2Ka+EKZttd2/bFH9PU0VyYWPR4PMXFxR0dHSDhvaKigkqlOp3OOIzl5eW4hUL1zV/NRo8RT5WximdvWdyaWtgyWb6P52iygOl+3A0XoVBIvjcYDDDFYnEsA9lhQ70rgkFCZAsNyBw5U6DLKtRRLozlSp33rSG9JTT6PqR6HVBkqTPqtHW19FqLxUK+n5mZgTubzY5lICJpBt7n5+fRDJioHjJIfnFCvSHUbojHA0/fBOXvggNvgwPGYL8h8Ey38WTYJ8xUne5d6oVjJBIxm81oSXwGOXvUJG2HwDg1lChf4yjW2oZ8nSN+ocb/SOMXq/2iYd8D5Td+3xqbs1BTqi5Fq6urq+VyOalVHIZAIMAGfslIEAZMMJKeH5euMKQrTT2rLLmX2+9tl3vb+rycntVm6cptyRdmuio1pSoFQcPhcLRWfD4/loGgpD4kNHNXWMRWAjchcyQ1T5eRrztXoDvfYr/Z7a4Xu+oeuuiiz/UZqtRkRnJObg75GMK8xGcQ4XpHRwtdia4P2gc1Lg2e8lflFROXeEs37i1d7/xESx9OaZhoAADDSpKA9Ho93FG6+AwIbScXBdnEvR/XjHl3Zy9z5q6efXmyaaoJk02j0UhQm82mVCq5XC6FQikrK4OJaLH9IGfHRswIRCWaFVF1aXc+XkkbSmycbCSLuHcobElJCZ1O12q1WJHJZJWVlRgwt9v9i0GKuFe4KPsZvpAvX51/THa02dy883f6rVbAkGxwKMzfAW7/9L/7E0nXwY32il7sAAAAAElFTkSuQmCC"><span class="total" style="margin-left:5px;">'+ langnum+ (langnum*100/from_total>=1 ? ' ('+ Math.round(langnum*100/from_total)+'%)' : '')+ '</span></a><br/>';
				}
				else if(lang=="_x_"){ //automatic links of translation
					from_show[i] = langnum/1000000+'_'+lang+'§§§<a href="'+ from_sentences_url+ '/" title="'+ x_text[facelang]+ ' ('+ Math.round(langnum*10000/from_total)/100+'%)"><img class="profilestatsimg" width="33" height="16" alt="'+ lang+ '" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAQCAIAAAAXoIEwAAAACXBIWXMAAAsSAAALEgHS3X78AAADRklEQVR42rVU/UtaYRT2L+jPiAhiP8wQCZJoIWathRls1xApkMAWZS1dhQhFheuLvKxWIBFRIXFbxaQao7qR2Z1Z6+MGFi6kD2atSTgXZe7J224UgzXWDpfL+/k85zznnFdw8cvOzs7cbvfOzs7FfZuAH/l8PpFI1NTU9B85VldXwTE0NMSvBIPB4+Pje+AAUG9vr81mM5vN4NBoNKWlpfjLZLKUlBSSJO8IdHJy0t/fbzQa9Xq9xWLxer3XHOFwGFhAF4vF+Kenp2dnZ6vV6pKSErBOTEzchWB3dzcnJ6ehoQFMGBMEIZFItre3r7UCp9/vt9vt4GAYBisDAwPw5ejoiEfZ2PjscDgJQpuf32yxDGq1bTrdIEm+i4t7yLJehIu7ra2t3OGpqSlMOzo6bueD46ivr6+trYVQCAuHkKTz83OG2ZBItJubF07n0dJSxO3+wrIne3uh0VGmudn64IGIoj6Ul5dz/sE8Hg+ggHODA3FAH2xAN4VCIY6ZKGYtLa8TE5/qdHqVqqasrMZgeBkfn7uw8DEt7VlyckljY19Pz1xb23uKuiSIRCIulwspuc3BsqxUKoWC2ECY0JELYn9/Hzlsb6dtNs/w8Hxn59usrEcQNhw+xa3p6U9FRV9pOupyRbe2InNzUchbWFjY19fHaXXNgZwjXbm5uTMzM9hAbXR3d4MDxBexxnQ6o/gY5kdd3bRK9XxhYfng4DJPXV1dSUm6vLwpudwWH/9CqbQA9PT0lNcKsl9xUBSFOQIEGUJBOcnlcq1Wy+dJoRhNSDBLJJrMTGtqqk4me6JWv5qdXTOZSKNx0G5nhUKiqqrRYDDwzYT34gaHyWSCUNykuLiYS8nKygrPYbVaNZpioTCTpgM+35nfH9rcPPR4DoLB7273WkXFm5GRaVyBf1wQMIfDARxId8UBxSEURoFAoKCgAHuVlZU8ATziqoCml6TSx+Pjc5OT8wShIklqcXF5fX398PAbCo+rF4DCObwU8BtqK5VKTEOhkIArWYiD7svIyMAGeh6XcRRkKTFDqv7YgzgMX4EzNjaGFbwd8BgFhkdWgGpD72C7uroaFYys8E0EdNxBAv/+ibphgt+ugpiG/IHAP6Jz9hMacqOyBVo9zgAAAABJRU5ErkJggg=="><span class="total" style="margin-left:5px;">'+ langnum+ (langnum*100/from_total>=1 ? ' ('+ Math.round(langnum*100/from_total)+'%)' : '')+ '</span></a><br/>';
				}
				else if(lang=="_u_"){ //unlink
					from_show[i] = langnum/1000000+'_'+lang+'§§§<a href="'+ from_sentences_url+ '/" title="'+ u_text[facelang]+ ' ('+ Math.round(langnum*10000/from_total)/100+'%)"><img class="profilestatsimg" width="16" height="16" alt="'+ lang+ '" style="margin: 0 8px;" src="http://flags.tatoeba.org/img/unlink.png"><span class="total" style="margin-left:5px;">'+ langnum+ (langnum*100/from_total>=1 ? ' ('+ Math.round(langnum*100/from_total)+'%)' : '')+ '</span></a><br/>';
				}
				else if(lang=="_d_"){ //deleted
					from_show[i] = langnum/1000000+'_'+lang+'§§§<a href="'+ from_sentences_url+ '/" title="'+ d_text[facelang]+ ' ('+ Math.round(langnum*10000/from_total)/100+'%)"><img class="profilestatsimg" width="16" height="16" alt="'+ lang+ '" style="margin: 0 8px;" src="http://flags.tatoeba.org/img/unlink.png"><span class="total" style="margin-left:5px;">'+ langnum+ (langnum*100/from_total>=1 ? ' ('+ Math.round(langnum*100/from_total)+'%)' : '')+ '</span></a><br/>';
				}
				else{
					from_show[i] = langnum/1000000+'_'+lang+'§§§<a href="'+ from_sentences_url+ '/'+ lang+ '" title="'+ name+ ' ('+ Math.round(langnum*10000/from_total)/100+'%)"><img class="profilestatsimg" width="30" height="20" alt="'+ lang+ '" src="http://flags.tatoeba.org/img/flags/'+ lang+ '.png"><span class="total" style="margin-left:5px;">'+ langnum+ (langnum*100/from_total>=1 ? ' ('+ Math.round(langnum*100/from_total)+'%)' : '')+ '</span></a><br/>';
				}
			}
			else{
				from_show[i] = '0.000000_aaa§§§<a href="'+ from_sentences_url+ '/" title="100%">'+total_text[facelang]+ ': '+ from_total+ '</a><br/>';
				
				if(from_total_number_of_sentences==from_total){
					i++;
					
					langnum = total_number_of_sentences - ( from_total_number_of_sentences - ( (from_cache[username]['sum']['_x_']||0) + (from_cache[username]['sum']['_l_']||0)+ (from_cache[username]['sum']['_m_']||0)+ (from_cache[username]['sum']['_u_']||0)+ (from_cache[username]['sum']['_d_']||0) ) ); // remove all non sentences from activities results in all added sentences; then subtract them from total_number_of_sentences to get number of adopted sentences
					lang = '_a_';
					from_show[i] = '0.000000_000§§§<a href="'+ from_sentences_url+ '/" title="'+ a_text[facelang]+ '"><img class="profilestatsimg" width="27" height="16" alt="'+ lang+ '" style="margin: 0 8px;" src="'+(langnum>=0 ? 'http://flags.tatoeba.org/img/adopt.png' : 'http://flags.tatoeba.org/img/let_go.png')+'"><span class="total" style="margin-left:5px;">'+ langnum+ '</span></a><br/>';
				}
			}
			i++;
		}
		from_show.sort();
		from_show = from_show.reverse();
		from_show = $.map(from_show, function(value){
			return value.split('§§§')[1]; //the '§§§' was added for sorting only
		}).join('');
		from_contributionstats.html(from_show);
		
		if(from_total_number_of_sentences!=from_total){
			$('div h2 + dl dd:nth(3)').css({'color':'red'});
		}
		else{
			$('div h2 + dl dd:nth(3)').css({'color':'green'});
		}
	}
	*/
	
	text = {'epo':'Frazoj laŭ lingvo', 'eng':'Sentences by language', 'deu':'Sätze nach Sprache', 'fre':'Phrases par langue'};
	load_text = {'epo':'eku', 'eng':'load', 'deu':'laden', 'fre':'afficher', 'jpn':'表示する', };
	total_text = {'epo':'total', 'eng':'total', 'deu':'Gesamt', 'fre':'total'};
	stop_text = {'epo':'haltu', 'eng':'stop', 'deu':'abbrechen', 'fre':'arrêter'};

	text[facelang] = text[facelang] || text['eng'];
	load_text[facelang] = load_text[facelang] || load_text['eng'];
	total_text[facelang] = total_text[facelang] || total_text['eng'];
	stop_text[facelang] = stop_text[facelang] || stop_text['eng'];

	langnameselect = $('#SentenceFrom');

	// on any user profile page or on all user page
	if(window.location.href.split('/')[4] == 'user' && window.location.href.split('/')[5] == 'profile'
	|| window.location.href.split('/')[4] == 'users' && window.location.href.split('/')[5] == 'all'){

		facelang = window.location.href.split('/')[3];
		GM_log('facelang: '+facelang);
		
		setup = false;
		//in your own profile
		if(window.location.href.split('/')[6] == $('.menuSection').attr('href').split('/')[4]){
			setup = true;
			
			if($('.userscriptSettings').is('*')){
				settings = $('.userscriptSettings');
			}
			else{
				settings = $('<div class="module profileSummary userscriptSettings"><h2>userscripts</h2></div>');
				$('.profileSummary').after(settings);
			}
			
			settings.append('<h3>Tatoeba User Stats</h3>');
			contentdiv = $('<div id="userprofileinline"></div>');
			settings.append(contentdiv);
			
			if($('.userscriptSettings #userflags').length){
				contentdiv.append('<em>If you make sure that the <q>Tatoeba Use Custom Flags And Other Langs Transparent</q>-script gets executed before the <q>Tatoeba Show User Profile Inline</q>-script, the flags in the userstats will get customized too.</em>');
			}
			
			contentdiv.append('<table>');
			contentdiv.append('<tr><td><label for="cache" class="field">reset cache</label></td><td><input type="button" id="cache" value="reset cache" '+( cache==default_cache ? 'diabled="disabled"' : '' )+'"></td></tr>');
			contentdiv.append('<tr><td><label for="from_cache" class="field">reset from_cache</label></td><td><input type="button" id="from_cache" value="reset from_cache" '+( from_cache==from_default_cache ? 'diabled="disabled"' : '' )+'"></td></tr>');
			contentdiv.append('<tr><td><label for="auto_load" class="field">auto_load</label></td><td><input type="checkbox" id="auto_load"></td></tr>');
			contentdiv.append('<tr><td><label for="onlyoneatatime" class="field">onlyoneatatime</label></td><td><input type="checkbox" id="onlyoneatatime"></td></tr>');
			contentdiv.append('</table>');
			
			$('#auto_load')[0].checked = auto_load;
			$('#onlyoneatatime')[0].checked = onlyoneatatime;
			
			$('#cache').click(function(){
				if(confirm("Really reset? \n\nAfter this some users language stats might take longer. (But deleted sentences will be counted too. Note that this only resets to a default chache, that i have done once.)")){
					cache = $.evalJSON(default_cache);
					GM_setValue('cache',$.toJSON(cache));
					GM_log('cache: '+$.toJSON(cache));
				}
			});
			
			$('#from_cache').click(function(){
				if(confirm("Really reset? \n\nAfter this some users language stats might take longer. (But deleted sentences will be counted too. Note that this only resets to a default chache, that i have done once.)")){
					from_cache = $.evalJSON(from_default_cache);
					GM_setValue('from_cache',$.toJSON(from_cache));
					GM_log('from_cache: '+$.toJSON(from_cache));
				}
			});
			
			$('#auto_load').change(function(){
				auto_load = this.checked;
				GM_setValue('auto_load',auto_load);
				GM_log('auto_load: '+auto_load);
			});
			
			$('#onlyoneatatime').change(function(){
				onlyoneatatime = this.checked;
				GM_setValue('onlyoneatatime',onlyoneatatime);
				GM_log('onlyoneatatime: '+onlyoneatatime);
			});
		}
		
		
		//GM_log(facelang);
		//GM_log(username);
		
		
		// On any profile page
		if(window.location.href.split('/')[4] == 'user' && window.location.href.split('/')[5] == 'profile' ){
			username = window.location.href.split('/')[6].split('#')[0];
			GM_log('cache['+username+']: '+$.toJSON(cache[username]));
			
			contributionname = $('<dt>'+ (typeof(text[facelang])=='string' ? text[facelang] : text['eng'])+ ' </dt>');
			loading = $('<span></span>');
			contributionname.append(loading);
			contributionstats = $('<dd id="SentencesByLanguage" class="userstatsuserscript"></dd>').css({'width': '100%'});
			loadbutton = $('<a>'+ load_text[facelang]+ '</a>').data({'username':username});
			stopbutton = $('<a>'+ stop_text[facelang]+ '</a>').data({'username':username});

			$('div h2 + dl').append($('<hr/>').css({  'border': '1px solid #CCCCCC', 'border-radius': '5px', 'height': '5px'})).append(contributionname).append(contributionstats);
			button = $('<dd class="editOption"></dd>').css({'float': 'none'});
			contributionstats.before(button);
			button.append(loadbutton);
			button.append(stopbutton);
			stopbutton.hide();
			
			total_number_of_sentences = $('div h2 + dl dd:nth(1)').text()*1;
			total_number_of_pages = Math.ceil(total_number_of_sentences/100);
			
			cache[username] = cache[username] || {};
			//cache[username]['sum'] = cache[username]['sum'] || {};
			//cache[username]['sum']['all'] = cache[username]['sum']['all'] || 0;
			
			//load_sentences = total_number_of_sentences - cache[username]['sum']['all'];
			//load_pages = Math.ceil(load_sentences/100);

			//translated from
			
			from_sentences_url = 'http://tatoeba.org/'+ facelang+ '/contributions/of_user/'+ username;
			GM_log('test');
			from_text = {'epo':'Kontribuoj per lingvo', 'eng':'Contributions by language', 'deu':'Beiträge nach Sprache', 'fre':'Contributions par langue'};
			from_text[facelang] = from_text[facelang] || from_text['eng'];
			GM_log('from_text:'+from_text);
			
			from_contributionname = $('<dt>'+ (typeof(from_text[facelang])=='string' ? from_text[facelang] : from_text['eng'])+ ' </dt>');
			from_loading = $('<span></span>');
			from_contributionname.append(from_loading);
			from_contributionstats = $('<dd id="Translatedfromlanguages" class="userstatsuserscript"></dd>').css({'width': '100%'});
			from_loadbutton = $('<a>'+ load_text[facelang]+ '</a>');
			from_stopbutton = $('<a>'+ stop_text[facelang]+ '</a>');

			$('div h2 + dl').append(from_contributionname).append(from_contributionstats);
			from_button = $('<dd class="editOption"></dd>').css({'float': 'none'});
			from_contributionstats.before(from_button);
			from_button.append(from_loadbutton);
			from_button.append(from_stopbutton);
			from_stopbutton.hide();
			
			from_total_number_of_sentences = $('div h2 + dl dd:nth(3)').text()*1;
			GM_log('from_total_number_of_sentences:'+from_total_number_of_sentences);
			from_total_number_of_pages = Math.ceil(from_total_number_of_sentences/200);
			GM_log('from_total_number_of_pages:'+from_total_number_of_pages);

			from_cache = from_cache || {};
			from_cache[username] = from_cache[username] || {};
			from_cache[username]['sum'] = from_cache[username]['sum'] || {};
			from_cache[username]['sum']['all'] = from_cache[username]['sum']['all'] || 0;
			
			from_load_sentences = from_total_number_of_sentences - from_cache[username]['sum']['all'];
			GM_log('from_load_sentences:'+from_load_sentences);
			from_load_pages = Math.ceil(from_load_sentences/200);
			GM_log('from_load_pages:'+from_load_pages);
		}
		else if(window.location.href.split('/')[4] == 'users' && window.location.href.split('/')[5] == 'all'){
			$('.user').each(function(){
				username = $(this).find('.username').text().trim();
				loadbutton = $('<a>'+ load_text[facelang]+ '</a>').data('username',username);
				stopbutton = $('<a>'+ stop_text[facelang]+ '</a>').data('username',username);
				loading = $('<span></span>');
				contributionstats = $('<div></div>');
				
				$(this).find('.username').after(loading).append(loadbutton).append(stopbutton.hide()).after(contributionstats);
			});
			//$('.user .username:first').data('username')
		}
		
		t_text = {'deu':'Übersetzungen', 'eng':'translations', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'',};
		l_text = {'deu':'Verknüpfungen', 'eng':'links', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'',};
		x_text = {'deu':'Automatische Verknüpfungen', 'eng':'automatic links', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'',};
		u_text = {'deu':'Entfernte verknüpfungen', 'eng':'deleted links', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'',};
		m_text = {'deu':'Änderungen', 'eng':'modifications', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'',};
		d_text = {'deu':'gelöschte Sätze', 'eng':'deleted sentences', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'',};
		a_text = {'deu':'Adoptierte Sätze', 'eng':'adopted sentences', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'', '':'',};
		
		GM_log('deu:::'+t_text[facelang]);
		
		t_text[facelang] = t_text[facelang] || t_text['eng'];
		l_text[facelang] = l_text[facelang] || l_text['eng'];
		x_text[facelang] = x_text[facelang] || x_text['eng'];
		u_text[facelang] = u_text[facelang] || u_text['eng'];
		m_text[facelang] = m_text[facelang] || m_text['eng'];
		d_text[facelang] = d_text[facelang] || d_text['eng'];
		a_text[facelang] = a_text[facelang] || a_text['eng'];
		
		//if( (load_pages==0 && total_number_of_sentences!=0) || (from_load_pages==0 && from_total_number_of_sentences!=0) ){
		//	parse();
		//}
		
		languageranks_time = GM_getValue('languageranks_time')*1 || 0;
		GM_log('languageranks_time: '+languageranks_time);
		refresh_cycle = 24*60*60*1000;
		//refresh_cycle = 0;
		
		if((new Date).getTime()-languageranks_time>refresh_cycle){
			//response = $.ajax({
			//	type: "GET",
			//	url: 'http://tatoeba.org/eng/stats/sentences_by_language',
			//	async: false
			//}).responseText;
			//languageranks = {};
			//$(response).find('#sentencesStats tr').filter(function(){return $(this).children().length>0;}).each(function(index, domElement){
			//	languageranks[$(domElement).find('td.languageName a').attr('href').split('/')[4]] = $(domElement).find('td.numberOfSentences').text().trim()*1;
			//});
			//languageranks_time = (new Date).getTime();
			//GM_setValue('languageranks',$.toJSON(languageranks));
			//GM_log('languageranks: '+$.toJSON(languageranks));
			//GM_setValue('languageranks_time',languageranks_time+'');
			//GM_log('languageranks_time: '+languageranks_time+'');
			
			$.get(
				'http://tatoeba.org/eng/stats/sentences_by_language',
				function(data){
					languageranks = {};
					$(data).find('#sentencesStats tr').filter(function(){return $(this).children().length>0;}).each(function(index, domElement){
						languageranks[$(domElement).find('td.languageName a').attr('href').split('/')[4]] = $(domElement).find('td.numberOfSentences').text().trim()*1;
					});
					
					languageranks_time = (new Date).getTime();
					GM_setValue('languageranks',$.toJSON(languageranks));
					GM_log('languageranks: '+$.toJSON(languageranks));
					GM_setValue('languageranks_time',languageranks_time);
					GM_log('languageranks_time: '+languageranks_time);
				}
			);
			
			
			
			//languageranks = [];
			//rows = $(response).find('#sentencesStats tr').filter(function(){return $(this).children().length>0;});
			//rows.each(function(index, domElement){
			//	languageranks[index] = $(domElement).find('td.languageName a').attr('href').split('/')[4];
			//});
			//rows.find('.numberOfSentences').map(function(){
			//	return $(this).text().trim();
			//});

			
			/////////
			//$(response).find('#sentencesStats tr').filter(function(){return $(this).children().length>0;}).each(function(index, domElement){
			//	languageranks[$(domElement).find('td.languageName a').attr('href').split('/')[4]] = $(domElement).find('td.numberOfSentences').text().trim()*1;
			//});
			
			//response = $.ajax({
			//	type: "GET",
			//	url: 'http://a4esl.com/temporary/tatoeba/native.html',
			//	async: false
			//}).responseText;
			//GM_log(response);
			//nativeusers = {};
			
			//$(response).find('#sentencesStats tr').each(function(index, domElement){
			//	href = $(domElement).find('a:contains("Show Sentences")').attr('href').split('/');
			//	user = href.pop();
			//	lang = href.pop();
			//	languageranks[user] = lang;
			//});
			

			
			
		}
		
		default_languageranks = {"eng":213163,"jpn":162195,"epo":121812,"fra":109403,"deu":90312,"spa":78271,"por":53034,"tur":50440,"ita":44672,"pol":41637,"rus":33923,"cmn":33893,"nld":22886,"hun":19131,"ukr":18022,"nds":16227,"heb":12445,"pes":11569,"isl":8811,"ara":8422,"dan":5857,"fin":5329,"bul":4757,"srp":4535,"uig":3953,"wuu":3940,"tlh":3798,"lat":3584,"hin":3528,"vie":3374,"swe":2916,"ron":2778,"oci":2670,"bel":2655,"jbo":2601,"ido":2468,"ina":2389,"yue":2275,"hrv":2264,"nob":1933,"cat":1890,"tat":1779,"ind":1763,"eus":1369,"glg":1323,"lit":1014,"orv":883,"ell":780,"ces":740,"kor":727,"tgl":723,"zsm":699,"lzh":635,"xal":482,"toki":473,"gle":472,"arz":457,"mal":448,"slk":425,"bre":333,"mon":332,"est":331,"vol":322,"lvs":266,"que":206,"uzb":182,"kat":176,"afr":166,"ile":151,"oss":138,"swh":114,"unknown":112,"tha":106,"fry":98,"bos":83,"gla":78,"yid":60,"slv":53,"sqi":48,"non":46,"kaz":37,"acm":36,"cycl":35,"ast":33,"ben":30,"urd":26,"cha":26,"hye":20,"san":10,"ain":10,"scn":10,"fao":9,"nan":6,"roh":5};
		languageranks = GM_getValue('languageranks') || default_languageranks;
		languageranks = $.evalJSON(languageranks);
		
		
			//$.get(
			//	'http://a4esl.com/temporary/tatoeba/native.html',
			//	function(data){
			//		nativeusers = {};
			//		$(data).find('#sentencesStats tr').each(function(index, domElement){
			//			href = $(domElement).find('a:contains("Show Sentences")').attr('href').split('/');
			//			user = href.pop();
			//			lang = href.pop();
			//			languageranks[user] = lang;
			//		});
			//	}
			//);
		
		
		function getnext(username){
			//GM_log('getnext()');
			if(langarray.length>0){
				lang = langarray.shift();
				GM_log('lang:'+lang);
				GM_log(requests.length);
				requests[requests.length] = $.get(
					'http://tatoeba.org/'+ facelang+ '/sentences/of_user/'+ username+'/'+lang,
					function(data){
						GM_log('data');
						lang = $(data).find('#filterLanguageSelect option:selected').val();
						number = ($(data).find('.module h2').text().replace(/[^0-9()（）]/g,'x').match(/.*?[()（）].*?(\d+).*?[()（）].*?/m) || [0,0])[1]*1;
						if(number > 0){
							cache[username] = cache[username] || {};
							cache[username][lang] = number;
							GM_log(username+' '+lang+':'+cache[username][lang]);
						}
						else{
							delete cache[username][lang];
						}
						
						sum = 0;
						for(ind in cache[username]){
							sum += cache[username][ind]*1 || 0;
						}
						GM_log(username+' sum:'+sum);
						
						GM_setValue('cache', $.toJSON(cache));
						
						GM_log('sum<total_number_of_sentences:'+sum<total_number_of_sentences);
						if(sum<total_number_of_sentences){
							getnext(username);
							newparse(username);
						}
						else if(sum==total_number_of_sentences){
							newparse(username);
							loading.hide();
							stopbutton.click();
						}
						else{
							loading.hide();
							stopbutton.click();
						}
						loading.show().text('('+(total_number_of_languages-requests.length)+')');
					}
				);
			}
		}
		
		function newparse(username){
			
			sum = 0;
			for(ind in cache[username]){
				sum += cache[username][ind]*1 || 0;
			}
			GM_log(username+' sum:'+sum);
		
			//if(langarray.length==0){
			//					stopbutton.click();
			//					lang = 'unknown';
			//					sum = 0;
			//					for(ind in cache[username]){
			//						sum += cache[username][ind]*1 || 0;
			//					}
			//					cache[username] = cache[username] || {};
			//					cache[username][lang] = total_number_of_sentences - sum;
			//					GM_log(username+' unknown sentences:'+ cache[username][lang]);
			//					GM_setValue('cache', $.toJSON(cache));
			//					newparse(sum);
			//					loading.hide();
			//				}
		
		
			GM_log('newparse');
			total = sum;
			sentences_url = 'http://tatoeba.org/'+ facelang+ '/sentences/of_user/'+ username;
			var show = ['0.000000_aaa§§§<a href="'+ sentences_url+ '/" title="100%">'+total_text[facelang]+ ': '+ sum+ '<small>/'+total_number_of_sentences+'</small></a><br/>'];
			for(lang in cache[username]){
					langnum = cache[username][lang];
					var name = langnameselect.find('option[value="'+lang+'"]').text();
					show[show.length] = langnum/1000000+'_'+lang+'§§§<a href="'+ sentences_url+ '/'+ lang+ '" title="'+ name+ ' ('+ Math.round(langnum*10000/sum)/100+'%)"><img class="profilestatsimg" width="30" height="20" alt="'+ lang+ '" src="http://flags.tatoeba.org/img/flags/'+ lang+ '.png"><span class="sum" style="margin-left:5px;">'+ langnum+ (langnum*100/sum>=1 ? ' ('+ Math.round(langnum*100/sum)+'%)' : '')+ '</span></a><br/>';
			}
			show.sort();
			show = show.reverse();
			show = $.map(show, function(value){
				return value.split('§§§')[1]; //the '§§§' was added for sorting only
			}).join('');
			contributionstats.html(show);
			
			if(total_number_of_sentences!=total){
				$('div h2 + dl dd:nth(1)').css({'color':'red'});
			}
			else{
				$('div h2 + dl dd:nth(1)').css({'color':'green'});
			}
		}
		
		requests = [];
		loadbutton.click(function(){
			
			
//			requests = [];
//			$.each(languageranks, function(rank, lang){
//				requests[rank] = $.get(
//					sentences_url+'/'+lang,
//					function(data){
//						cache[username] = cache[username] || {};
//						cache[username][lang] = $(data).find('.module h2').text().replace(/[^0-9()（）]/g,'x').match(/.*?[()（）].*?(\d+).*?[()（）].*?/m)[1];
//						GM_log(username+' '+lang+':'+cache[username][lang]);
//						GM_setValue('cache', $.toJSON(cache));
//					}
//				);
//			});
			username = $(this).data('username');
			GM_log(username);
			
			if(typeof(total_number_of_sentences)=="undefined"){
				response = $.ajax({
					type: "GET",
					url: 'http://tatoeba.org/'+facelang+'/user/profile/'+username,
					async: false
				}).responseText;
				total_number_of_sentences = $(response).find('div h2 + dl dd:nth(1)').text()*1;
			}
			
			GM_log($.toJSON(cache));
			langarray = [];
			for(elem in languageranks){
				langarray[langarray.length] = elem;
			}
			if(cache[username]){
				langarray.sort(function(first, second){
					return (cache[username][second]*1 || 0) - (cache[username][first]*1 || 0);
				});
			}
			else{
				cache[username] = cache[username] || {};
			}
			GM_log(langarray);
			total_number_of_languages = langarray.length;
			loading.show().text('('+(total_number_of_languages-requests.length)+')');
			
			$.each(requests, function(){
				this.abort();
			});
			requests = [];
			loadbutton.hide();
			stopbutton.show();
			stopbutton.click(function(){
				$.each(requests, function(){
					this.abort();
				});
				loadbutton.show();
				stopbutton.hide();
				loading.hide()
			});
			
			sum = 0;
			for(ind in cache[username]){
				sum += cache[username][ind]*1 || 0;
			}
			GM_log(username+' sum:'+sum);
			
			GM_log('sum<total_number_of_sentences:'+sum<total_number_of_sentences);
			if(sum<total_number_of_sentences){
				getnext(username);
				getnext(username);
				getnext(username);
				getnext(username);
				getnext(username);
				
				newparse(username);
			}
			else if(sum==total_number_of_sentences){
				newparse(username);
				stopbutton.click();
			}
			else{
				stopbutton.click();
			}
			
			//$.each(languageranks, function(rank, lang){
			//	requests[rank] = $.ajax({
			//		type: "GET",
			//		url: sentences_url+'/'+lang,
			//		async: false
			//	});
			//	data = requests[rank].responseText;
			//	cache[username] = cache[username] || {};
			//	number = ($(data).find('.module h2').text().replace(/[^0-9()（）]/g,'x').match(/.*?[()（）].*?(\d+).*?[()（）].*?/m) || [])[1];
			//	if(number > 0){
			//		cache[username][lang] = number;
			//		GM_log(username+' '+lang+':'+cache[username][lang]);
			//		GM_setValue('cache', $.toJSON(cache));
			//	}
			//	else{
			//		GM_log(username+' '+lang+': no sentences yet');
			//	}
			//});
		});
		
		/*
		loadbutton.click(function(){
			cache[username] = cache[username] || {};
			cache[username]['sum'] = cache[username]['sum'] || {};
			cache[username]['sum']['all'] = cache[username]['sum']['all'] || 0;
			
			load_sentences = total_number_of_sentences - cache[username]['sum']['all'];
			load_pages = Math.ceil(load_sentences/100);
			
			now = load_pages;
			still_loading = load_pages;
			
			if(load_pages>0){
				requests = [];
				for (i=load_pages;i>=1;i--){
					requests[i] = $.get(
						sentences_url+'/page:'+i,
						function(obj) {
							//GM_log('request successful');
							//GM_log(total_number_of_pages);
							//GM_log(i);
							//add_user_contribution_langs(innerdata);
							page = $(obj).find('.current')[0];
							page = (page ? $(page).text()*1 : 1); // for users with only one page of contributions
							//page = $(page).text()*1;
							cache[username] = cache[username] || {};
							cache[username][page] = cache[username][page] || {};
							
							arr = $(obj).find('.module .mainSentence img.languageFlag').map(function(){
								return $(this).attr('alt');
							}).get();
							$(arr).each(function(ind, lang){
								cache[username][page][lang] = cache[username][page][lang] || 0;
								cache[username][page][lang]++;
							});
							
							cache[username]['sum'] = cache[username]['sum'] || {};
							cache[username]['sum']['all'] = cache[username]['sum']['all'] || 0;

							if(total_number_of_sentences!=load_sentences && now==load_pages){
								GM_log('partial_load');
								partial_load = load_sentences%100;
								for (i=0;i<partial_load;i++){
									lang = arr[i];
									cache[username]['sum'][lang] = cache[username]['sum'][lang] || 0;
									cache[username]['sum'][lang]++;
									cache[username]['sum']['all']++;
								}
								delete cache[username][now];
								now--;
							}
							else{
								GM_log(now);
								while(cache[username][now]){
									for(lang in cache[username][now]){
										cache[username]['sum'][lang] = cache[username]['sum'][lang] || 0;
										cache[username]['sum'][lang] += cache[username][now][lang];
										cache[username]['sum']['all'] += cache[username][now][lang];
									}
									delete cache[username][now];
									now--;
								}
							}
							GM_log(page +'=> cache['+username+']: '+$.toJSON(cache[username]));
							
							parse();
							
							still_loading--;
							loading.text('('+still_loading+')');
							if(still_loading==0){
								loading.hide();
								loadbutton.show();
								stopbutton.hide();
								GM_setValue('cache',$.toJSON(cache));
								GM_log('cache: '+$.toJSON(cache));
							}
						}
					);
				}
				loadbutton.hide();
				stopbutton.show();
				stopbutton.click(function(){
					for (i=load_pages;i>=1;i--){
						requests[i].abort();
					}
					loadbutton.show();
					stopbutton.hide();
				});
			}
			else{
				parse();
			}
		});
		//*/
		
		loadbutton.dblclick(function(){
			cache[username] = {};
			loadbutton.click();
		});
		
		//function add_user_contribution_langs(obj){

		//}
		
		
		
		///*
		if(false){
			from_loadbutton.click(function(){
				GM_log('test');
				from_cache[username] = from_cache[username] || {};
				from_cache[username]['sum'] = from_cache[username]['sum'] || {};
				from_cache[username]['sum']['all'] = from_cache[username]['sum']['all'] || 0;
				
				from_load_sentences = from_total_number_of_sentences - from_cache[username]['sum']['all'];
				from_load_pages = Math.ceil(from_load_sentences/200);
				GM_log('from_load_pages:'+from_load_pages);
				
				from_now = from_load_pages;
				from_still_loading = from_load_pages;
				
				if(from_load_pages>0){
					from_requests = [];
					for (i=from_load_pages;i>=1;i--){
						from_requests[i] = $.get(
							from_sentences_url+'/page:'+i,						//url 
							function(obj){									//[ data ] 
								//GM_log('request successful');
								//GM_log(total_number_of_pages);
								//GM_log(i);
								//add_user_contribution_langs(innerdata);
								page = $(obj).find('.current')[0];
								page = (page ? $(page).text()*1 : 1); // for users with only one page of contributions
								//page = $(page).text()*1;
								from_cache[username] = from_cache[username] || {};
								from_cache[username][page] = from_cache[username][page] || {};
								
								//obj = $(document);
								//sentenceAdded = $(obj).find('.sentenceAdded').map(function(){
								//	return $(this).find('.text a').attr('href').split('/').pop();
								//});
								//linkAdded = $(obj).find('.linkAdded ').map(function(){
								//	return $(this).find('.linkInfo a:nth(0)').attr('href').split('/').pop();
								//});
								//links = $(obj).find('.linkAdded ').map(function(){
								//	return $(this).find('.linkInfo a:nth(0)').attr('href').split('/').pop()+'-'+$(this).find('.linkInfo a:nth(1)').attr('href').split('/').pop();
								//});
								//originallyadded = $.grep(sentenceAdded, function(value,index){
								//	return $.inArray(value, linkAdded)==-1;
								//});
								
								//originalobj = $.grep($(obj).find('.sentenceAdded'), function(value,index){
								//	return $.inArray($(value).find('.text a').attr('href').split('/').pop(), linkAdded)==-1;
								//});
								
								//$(originalobj).each(function(){
								//	lang = $(this).find('.lang img').attr('alt');
								//	from_cache[username][page][lang] = from_cache[username][page][lang] || 0;
								//	from_cache[username][page][lang]++;
									
								//});
								
								//arr = $(originalobj).map(function(){
								//	return $(this).find('.lang img').attr('alt');
								//}).get();
								//arr = $(obj).find('tr').map(function(){
								//	lang = $(this).find('.lang img').attr('alt');
								//	return (lang ? ($.inArray($(this).find('.text a').attr('href').split('/').pop(), linkAdded)==-1 ? ( $(this).is('.sentenceAdded') ? lang : '_x_') : '_+_') : '_-_');
								//});

								//obj = $(document);
								linkAdded = $(obj).find('.linkAdded ').map(function(){
									return $(this).find('.linkInfo a:nth(0)').attr('href').split('/').pop();
								});
								arr = $(obj).find('tr:not([class^=logs])').map(function(){
									lang = $(this).find('.lang img').attr('alt');
									tolist = "___";

									if(lang){ //sentence
										if($(this).is('.sentenceAdded')){
											tolist = "_t_"; //translation added (cant find out source language easily)
											if($.inArray($(this).find('.text a').attr('href').split('/').pop(), linkAdded)==-1){ //This will not be 100% correct, as it only checks if there are links on the current page (sentences at the end and at the beginning of a page could be interpreted wrongly).
												tolist = lang; //original sentence added
											}
										}
										else if($(this).is('.sentenceModified')){
											tolist = "_m_"; //translation modified
										}
										else if($(this).is('.sentenceDeleted')){
											tolist = "_d_"; //sentence deleted
										}
									}
									else{ //link
										if($(this).is('.linkAdded')){
											tolist = "_l_"; //link added
										}
										else if($(this).is('.linkDeleted')){
											tolist = "_u_"; //unlinked = link deleted
										}
									}
									return tolist; //return $(this).addClass(tolist).get();
								});
								
								$(arr).each(function(ind, lang){
									from_cache[username][page][lang] = from_cache[username][page][lang] || 0;
									from_cache[username][page][lang]++;
								});
								
								//$(obj).find('.sentenceAdded .text a[href$=/947872]');
								
								//onlylinked = $.grep($(obj).find('.linkAdded '), function(obj,index){
								//	return !($.inArray($(obj).find('.linkInfo a:nth(0)').attr('href').split('/').pop(), sentenceAdded )!=-1 || $.inArray($(obj).find('.linkInfo a:nth(1)').attr('href').split('/').pop(), sentenceAdded )!=-1);
								//});
								//onlylinked = onlylinked.map(function(value,index){
								//	return $(value).find('.linkInfo a:nth(0)').attr('href').split('/').pop();
								//});
								//onlylinked = $.unique(onlylinked);

								//notonlylinked = $.grep($(obj).find('.linkAdded '), function(obj,index){
								//	return $.inArray($(obj).find('.linkInfo a:nth(0)').attr('href').split('/').pop(), sentenceAdded )!=-1;
								//});
								//translatedfrom = notonlylinked.map(function(value,index){
								//	return $(value).find('.linkInfo a:nth(1)').attr('href').split('/').pop();
								//});
								//translatedfrom.each(function(phraseid,index){
								//	$.get(
								//		'http://tatoeba.org/'+facelang+'/sentences/show/'+phraseid,
								//		function(obj){
											
								//		}
								//	);
								//});
								//GM_log(translatedfrom);
								//translatedfrom.map(function(value,index){
								//	return languageof[value];
								//});
								
								//arr = $(obj).find('.module .mainSentence img.languageFlag').map(function(){
								//	return $(this).attr('alt');
								//}).get();
								
								//arr = $(obj).find('.sentenceAdded').filter(function(index){
								//	var keep = true;

								//	if( !$(this).next().hasClass('linkAdded') ){
								//		keep = false;
								//	}
								//	else{
								//		splitted = $(this).find('.text a').attr('href').split('/');
								//		if( $(this).next().find('.linkInfo a:nth-child(2)').text() != splitted[splitted.length-1] ){
								//			 keep = false;
								//		}
								//	}
								//	return keep;
								//});
								
								//arr = arr.map(function(){
								//	return $(this).attr('alt');
								//}).get();
								//GM_log(arr);
								//return;
								//$(arr).each(function(ind, lang){
								//	from_cache[username][page][lang] = from_cache[username][page][lang] || 0;
								//	from_cache[username][page][lang]++;
								//});
								//GM_log(from_cache[username]);
								
								from_cache[username]['sum'] = from_cache[username]['sum'] || {};
								from_cache[username]['sum']['all'] = from_cache[username]['sum']['all'] || 0;

								if(from_total_number_of_pages!=from_load_pages && from_now==from_load_pages){
									GM_log('from_partial_load');
									from_partial_load = from_load_sentences%200;
									for (i=0;i<from_partial_load;i++){
										lang = arr[i];
										from_cache[username]['sum'][lang] = from_cache[username]['sum'][lang] || 0;
										from_cache[username]['sum'][lang]++;
										from_cache[username]['sum']['all']++;
									}
									delete from_cache[username][from_now];
									from_now--;
								}
								else{
									GM_log(from_now);
									while(from_cache[username][from_now]){
										for(lang in from_cache[username][from_now]){
											if(lang == "_t_"){
												from_cache[username]['sum']["_t_"] = from_cache[username]['sum']["_t_"] || 0;
												from_cache[username]['sum']["_t_"] += from_cache[username][from_now]["_t_"];
												from_cache[username]['sum']['all'] += from_cache[username][from_now]["_t_"];
												
												from_cache[username]['sum']["_x_"] = from_cache[username]['sum']["_x_"] || 0;
												from_cache[username]['sum']["_x_"] += 2*from_cache[username][from_now]["_t_"];
												
												from_cache[username]['sum']["_l_"] = from_cache[username]['sum']["_l_"] || 0;
												from_cache[username]['sum']["_l_"] -= 2*from_cache[username][from_now]["_t_"];
											}
											else{
												from_cache[username]['sum'][lang] = from_cache[username]['sum'][lang] || 0;
												from_cache[username]['sum'][lang] += from_cache[username][from_now][lang];
												from_cache[username]['sum']['all'] += from_cache[username][from_now][lang];
											}
										}
										delete from_cache[username][from_now];
										from_now--;
									}
								}
								GM_log(page +'=> from_cache['+username+']: '+$.toJSON(from_cache[username]));
								
								parse();
								
								from_still_loading--;
								from_loading.text('('+from_still_loading+')');
								if(from_still_loading==0){
									from_loading.hide();
									from_loadbutton.show();
									from_stopbutton.hide();
									GM_setValue('from_cache',$.toJSON(from_cache));
									GM_log('from_cache: '+$.toJSON(from_cache));
								}
							}
						);
					}
					from_loadbutton.hide();
					from_stopbutton.show();
					from_stopbutton.click(function(){
						for (i=from_load_pages;i>=1;i--){
							from_requests[i].abort();
						}
						from_loadbutton.show();
						from_stopbutton.hide();
					});
				}
				else{
					parse();
				}
			});
			
			from_loadbutton.dblclick(function(){
				if(from_total_number_of_sentences < 500 || confirm("Really reload? \n\nThis can take long. \n\nThe User has "+from_total_number_of_sentences+" contributions.")){
					from_cache[username] = {};
					from_cache[username]['sum'] = {};
					from_cache[username]['sum']['all'] = 0;
					from_contributionstats.html('');
					from_loadbutton.click();
				}
			});
		}
		
		if(auto_load){
			loadbutton.click();
		}
	}
	
	// on any list page
	is_list = (window.location.href.split('/')[4] == 'sentences_lists' && window.location.href.split('/')[5] == 'show');
	is_tags = (window.location.href.split('/')[4] == 'tags' && window.location.href.split('/')[5] == 'show_sentences_with_tag');
	if(is_list || is_tags){
		GM_log( (is_list ? 'list page': 'tag page') );
		list_contributionname = $('<dt>'+ (typeof(text[facelang])=='string' ? text[facelang] : text['eng'])+ ' </dt>');
		list_loading = $('<span></span>');
		list_contributionname.append(list_loading);
		contributionstats = $('<dd id="ListByLanguage" class="userstatsuserscript"></dd>').css({'width': '100%'});
		list_loadbutton = $('<a>'+ load_text[facelang]+ '</a>').css({'background': 'url("http://css.tatoeba.org/img/search_bar_body.png") repeat scroll 0 0 transparent', 'border': '1px solid #6E994E', 'border-radius': '4px 4px 4px 4px', 'color': '#FFFFFF', 'font-weight': 'bold', 'padding': '3px 10px',});
		list_stopbutton = $('<a>'+ stop_text[facelang]+ '</a>').css({'background': 'url("http://css.tatoeba.org/img/search_bar_body.png") repeat scroll 0 0 transparent', 'border': '1px solid #6E994E', 'border-radius': '4px 4px 4px 4px', 'color': '#FFFFFF', 'font-weight': 'bold', 'padding': '3px 10px',});

		list_module = $('<div class="module"><h2>Stats</h2></div>');
		$('#annexe_content').append($('<hr/>').css({  'border': '1px solid #CCCCCC', 'border-radius': '5px', 'height': '5px'})).append(list_module);
		
		list_module.append(list_contributionname).append(contributionstats);
		button = $('<dd class="editOption"></dd>').css({'float': 'none'});
		contributionstats.before(button);
		button.append(list_loadbutton);
		button.append(list_stopbutton);
		list_stopbutton.hide();
	
		username = window.location.href.split('/')[6];
		list_sentences_per_page = 10;
		
		cache[username] = cache[username] || {};
		cache[username]['sum'] = cache[username]['sum'] || {};
		cache[username]['sum']['all'] = cache[username]['sum']['all'] || 0;
		GM_log('cache['+username+']: '+$.toJSON(cache[username]));
		
		sentences_on_last_page = false;
		
		///*
		list_loadbutton.click(function(){
			list_loadbutton.hide();
			list_stopbutton.show();
			
			cache[username] = cache[username] || {};
			cache[username]['sum'] = cache[username]['sum'] || {};
			cache[username]['sum']['all'] = cache[username]['sum']['all'] || 0;
			
			if($('.paging span:contains(>>) a')[0]){
				list_number_of_pages = $($('.paging span:contains(>>) a')[0]).attr('href').split('/').pop().split(':')[1]*1;
			}
			else if($('.paging span.numbers span:last-child')[0]){
				list_number_of_pages = $($('.paging span.numbers span:last-child')[0]).text()*1;
			}
			else{
				list_number_of_pages = 1;
			}
			GM_log('list_number_of_pages:'+list_number_of_pages);
			list_current = $($('.paging span.current')[0]).text()*1;
			
			
			
			sentences_url = 'http://tatoeba.org/'+ facelang+ (is_list ? '/sentences_lists/show/' : '/tags/show_sentences_with_tag/')+ username;
			
			$.get(
				sentences_url+'/page:'+list_number_of_pages,
				function(data){
					sentences_on_last_page = $(data).find('.module .mainSentence img.languageFlag').map(function(){
						return $(this).attr('alt');
					}).get().length;
					GM_log('sentences_on_last_page:'+sentences_on_last_page);
					total_number_of_sentences = (list_number_of_pages-1)*list_sentences_per_page + sentences_on_last_page;
					GM_log('total_number_of_sentences:'+total_number_of_sentences);
					list_load_sentences = total_number_of_sentences - cache[username]['sum']['all'];
					GM_log('list_load_sentences:'+list_load_sentences);
					list_load_pages = Math.ceil(list_load_sentences/list_sentences_per_page);
				
					list_now = list_load_pages;
					list_still_loading = list_load_pages;
					GM_log('list_still_loading:'+list_still_loading);
				
					if(list_load_pages>0){
						requests = [];
						for (i=list_load_pages;i>=1;i--){
							requests[i] = $.get(
								sentences_url+'/page:'+i,
								function(obj) {
									GM_log('request successful');
									//GM_log(total_number_of_pages);
									//GM_log(i);
									//add_user_contribution_langs(innerdata);
									page = $(obj).find('.current')[0];
									page = (page ? $(page).text()*1 : 1); // for users with only one page of contributions
									//page = $(page).text()*1;
									GM_log('page:'+page);
									cache[username] = cache[username] || {};
									cache[username][page] = cache[username][page] || {};
									
									arr = $(obj).find('.module .mainSentence img.languageFlag').map(function(){
										return $(this).attr('alt');
									}).get();
									GM_log('test');
									GM_log('arr:'+arr);
									GM_log('test');
									$(arr).each(function(ind, lang){
										cache[username][page][lang] = cache[username][page][lang] || 0;
										cache[username][page][lang]++;
									});
									GM_log(page +'=> cache['+username+']: '+$.toJSON(cache[username]));
									cache[username]['sum'] = cache[username]['sum'] || {};
									cache[username]['sum']['all'] = cache[username]['sum']['all'] || 0;
									
									
									GM_log('sentences_on_last_page:'+sentences_on_last_page);
									if(sentences_on_last_page>0 && sentences_on_last_page<list_sentences_per_page && list_now==list_load_pages){
										GM_log('partial_load');
										
										load_sentences = (list_load_pages-1)*list_sentences_per_page + sentences_on_last_page;
										partial_load = load_sentences%list_sentences_per_page;
										GM_log('partial_load:'+partial_load);
										for (i=0;i<partial_load;i++){
											lang = arr[i];
											cache[username]['sum'][lang] = cache[username]['sum'][lang] || 0;
											cache[username]['sum'][lang]++;
											cache[username]['sum']['all']++;
										}
										delete cache[username][list_now];
										list_now--;
									}
									else{
										GM_log('list_now:'+list_now);
										while(cache[username][list_now]){
											for(lang in cache[username][list_now]){
												cache[username]['sum'][lang] = cache[username]['sum'][lang] || 0;
												cache[username]['sum'][lang] += cache[username][list_now][lang];
												cache[username]['sum']['all'] += cache[username][list_now][lang];
											}
											//if(!sentences_on_last_page && list_now==list_number_of_pages){
											//	sentences_on_last_page = arr.length;
											//	GM_log('sentences_on_last_page:'+sentences_on_last_page);
											//}
											delete cache[username][list_now];
											list_now--;
										}
									}
									GM_log(page +'=> cache['+username+']: '+$.toJSON(cache[username]));
									
									
									
									list_still_loading--;
									list_loading.text('('+list_still_loading+')');
									GM_log('list_still_loading:'+list_still_loading);
									if(list_still_loading==0){
										list_loading.hide();
										list_loadbutton.show();
										list_stopbutton.hide();
										GM_setValue('cache',$.toJSON(cache));
										GM_log('cache: '+$.toJSON(cache));
									}
									
									parse();
								}
							);
							
						}
						list_loadbutton.hide();
						list_stopbutton.show();
						list_stopbutton.click(function(){
							for (i=list_load_pages;i>=1;i--){
								requests[i].abort();
							}
							list_loadbutton.show();
							list_stopbutton.hide();
						});
					}
					else{
						parse();
					}
				}
			);
		});
		
		list_loadbutton.dblclick(function(){
			if(total_number_of_sentences < 500 || confirm("Really reload? \n\nThis can take long. \n\nThe User has "+total_number_of_sentences+" sentences.")){
				cache[username] = {};
				cache[username]['sum'] = {};
				cache[username]['sum']['all'] = 0;
				contributionstats.html('');
				list_loadbutton.click();
			}
		});
	}
}