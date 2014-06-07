// ==UserScript==
// @name           sueditor
// @namespace      onyxstone
// @description    sueditor
// @dversion       0.0.4
// @include        http://user.adme.in/blog/*

// ==/UserScript==


/******
 *GreaseMonkey Script developed by Onyxstone
 *http://onyxstone.stumbleupon.com/
 *Creative Commons Version 3.0 License
 ******/   

$ =   window.wrappedJSObject.$;
$( '<li id="sueditor_onoff" style="cursor:pointer;">SUEditor is On</li>')
.appendTo('.pagecommands.xfloatr');

if( document.getElementById('sueditor_onoff') )
  document.getElementById('sueditor_onoff')
  .addEventListener('click',switcher,false);

function switcher(){
    if( !GM_getValue( 'sueditor_on' , true ) ){
      GM_setValue( 'sueditor_on' , true );
        $( '#sueditor_onoff').text('SUEditor is On');
      }
      else {
        GM_setValue( 'sueditor_on' , false );
        $( '#sueditor_onoff').text('SUEditor is Off');
        }
}

if( !GM_getValue( 'sueditor_on' , true ) ){
      
        $( '#sueditor_onoff').text('SUEditor is Off');
        return;
}





GM_addStyle('span.icon[icon="source"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFJSURBVHja1FMxboNAEJwjLixhyRVF3mC5oqCNqFO44wfJM8BtfpC0VDwiVgq34MaW5cItSCAKRINtBLk5kQjbSkWVk5bbnZ1Z5tAh2rbFkKVh4Bo8YPT6Ed5iPNNShneDs3ZliCsHdV3DNE0VMm+73ZXh9XCPWJ/T5dAul4uatF6vW8uyVM5d4u7PW5j3e+R2OITz9qls27aNqqpQFAV2ux1kfWV1tVq1s9kM0+kU4/GYNWGhnU4nJc7zHEmSIIqiOzEXMfbIIZcaakfyge12i8lkAl3XCf75xdkjpyxLNYg1HQhaTtMUWZZhsVggCIK720WMPXLIpYZa7Xw+w3EccTgclLUwDFnD9/3fIcyJsUcOudRQ+/BoPqNpGhiGsdzv9x6Pwg8ksaWML1qN41hsNpsn9o7HI+bzuehwCPPlfdBFEv//Z/oWYABTaOVlXmmFMQAAAABJRU5ErkJggg==)}span.icon[icon="visualmode"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAedJREFUeNrUk89LImEYx59xFn+0pKtFULsaxrIdDLsoCElEu7myhz1KkNBpPXfrP/Cf2FPiScKoSyYZgZIhHRZR2F8oedjJZdkNwzFdnLfvM4znDp564DPvzDzP95n3fZ5nJCEEjWMmGtPGTiDB9BvjKHawBiJgAbiMuL+gAfLgHHRGulECCQk+WiyWT5FI5HU8Hp+p1+vPS6WSmZ3hcHjg8/m66XT6dz6f/9nv9z9Dd8Tf5SNYwU4wGNwtFovhbDa7OBwOnW6329ztqsRAZOZ37OMYjmWNrpVlOYqvnrXb7b6qqoIpFAqC7TaVEtV3G2J744PArsTIz7GsYS3vYDMUCrmwffNgMCAmmUzSl/1D0lIpekWCVuwuUhSFRn6OZQ1rn+GyV6lUnJ1OZ9EK4zN7vV46Or2grQm7Xihleo68TqsuZruHQXPNWtlkMinNZlMrl8vDQCAw7XA4JnFeuvr2lW6W31Lt5Rv6cfOd1tdX9cSNRkNJJBLHqMUBd0VvAZJwN0I2m+19NBpdisViS61Wa7ZarU6y3+/333k8HiWTydRyuVyt1+udoESXmqYJTiCDF2AKSVxINod13pgJmzEHPe49RNcQ/cL6D89/wK1kTKPVCOa+S48MH0/cf6ByOaSn/zM9CDAAvQnobTjgVwoAAAAASUVORK5CYII=)}span.icon[icon="bold"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPJJREFUeNpi/P//PwMlgImBQkCxASzInJ6eHl0gNRmI7aFCC4DYAIj/AvHckpKS6XhdAFRw+c+fPz5AzADCQH4ikDYH4u9APK2joyOKoBcqKiq+/Pr1iwGEoXwg89dZqJgWXi/AwM+fP+Hs6upqCSDlDcQfgXglSQYAvbAISIUAMcg5ucAwukxULPz48QOMgRrigLQwEO8A4kU5OTl7gZiZoAEgF8BcMWXKlO9AdhZUzAmIbUgKAyifmah0AAIRERE8SGxRIPUFiFdAha4B8SmcBoSEhIAS0kwkoXtAzAbVOAWIO9asWfMdWQ/j0M9MAAEGAM8kh8+gTLZTAAAAAElFTkSuQmCC)}span.icon[icon="italic"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJdJREFUeNpi/P//PwMlgImBQkCxASz4JHt6et4BKUEkoc6SkpIKZDWMhMKgo6MDZohrRUXFHpJc0Nzc7ALVfK+2tnYPyV74/fu3C5S5mqww+PnzZyiUuQeXGpxhUFBQoASk7gLx+wkTJgiR7AJibCdkgAvZBsTGxoKcb0yMARhhEBERUQ6KfjR1QitWrHhPUiAOncwEEGAAts859Zdic3IAAAAASUVORK5CYII=)}span.icon[icon="insertimage"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANkE3LLaAgAAAkJJREFUeJzFk09Ik3EYxz+/989mc3NthnNGQeYOmTuM7FKIkBHUSZI6d6wuQXnt1LEuSSApVJ4iCDNvEnUTIrp4SMjBIqiWzs2c23x79/5+TwdLCwK79YWHB57v8+X5wvM88L+hAPL5vPyrIJPJqD8KU1NTz7TWntZ++e/RLGvdLDe9WqX6rbQ+MjJ8+Xe9E41GUkqp8It3XtigUAKCgAAiCFt5/VuZzWqF+5OPxrW+pGdmZiYBHFuJlH2YWHRoShgRAQ1GQIwgBkQbvEYbdqPO2YEQ09NPJ4aHzzM7OzvpmABsB3JHLCJJRU0rGjUImlsWRYGIzXqhjc3id56/WSGzP8zY2NhEqVTacASIWJCMgn45R1/dJz5wCrs9hFd1+bACH/MQVGB5bZMHCyXS8Q3Gr/UyODh42tGytYCuh/cI3RplLnKXxAnDhau3KcRH2RuEcA5BoscmXUlQWfZod21S6TQiGseI4GifM1cuspTJkS0eR0sUt6NEf24J3/ShBBq+hRckMSQJ26AUgIVjsBBvFcpPyJw7RooCn2sJvgR3MF9tFopQXAcxEAnBagM6onBzCIzROGIErX2s6iIuDWxjE1ShZ99hYqkeoibNq40WwmGXt/k6+U91ulMuDB1Ea4NjRKPsPUhbL74TA7uFrmQcnBiYJv2da/QfiIOKU+iN8fq9wfcD4KcD17aU25qCozd2PePuTujubN35A2Uplcvlrmez2ZO+73u/CGPMdpPIzpsYY7Y513Vb5ufnH+86dTf8ANmvHl3HZIusAAAAAElFTkSuQmCC)}span.icon[icon="justifyfull"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGhJREFUeNqskyEOwDAIRcuyc1ah6xCIKkRFHRrVi7JMbJ7AN6BeHiQf3L1lcrVk0oD7W845oVt67/BOyP7gNzCzEAkRiw1UNUQaYxQbrLVCJGYuNphzhkgiUmxARCHS3rvGIF2mR4ABAGv4LRFYjzmbAAAAAElFTkSuQmCC)}span.icon[icon="justifyleft"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHBJREFUeNpi/P//PwMlgImBQkCxASwwxqJFi4j2S1xcHCOMzUhpGMBdMGfOHIImpaSkMKKLUc8FkyZNItqkvLw8GoRBe3s7XpMqKysZsYlTzwW1tbUkmdTc3MxIXReUlpYSZVJ3dzcjVcOA4swEEGAAp3wtETUrNdEAAAAASUVORK5CYII=)}span.icon[icon="justifyright"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGtJREFUeNpi/P//PwMlgImBQkCxASzInEWLFhHtn7i4OEYQzUhpGLBgE5wzZw5BU1NSUmjggkmTJhFtWl5eHg3DAATa29vxmlxZWUllF9TW1pJkUnNzM43CoLS0lCgTu7u7qeMCijMTQIABAPdtLRGJ1m+2AAAAAElFTkSuQmCC)}span.icon[icon="justifycenter"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHBJREFUeNpi/P//PwMlgImBQkCxASwwxqJFi0jyS1xcHCOIZqQ0DFiQOXPmzCHKtJSUFEYYm3oumDRpEkkm5eXl0SAMYKC9vR2rqZWVlYzoYtRzQW1tLUkmNTc30yAMSktLiTKtu7ubeumA4swEEGAAVJAtETmH0P0AAAAASUVORK5CYII=)}span.icon[icon="strikethrough"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACfSURBVCjPY/jPgB8yUFNBiWDBzOy01PKEmZG7sSrIe5dVDqIjygP/Y1GQm5b2P7kDwvbAZkK6S8L/6P8hM32N/zPYu2C1InJ36P/A/x7/bc+YoSooLy3/D4Px/23+SyC5G8kEf0EIbZSmfdfov9wZDCvc0uzLYWyZ/2J3MRTYppn/14eaIvKOvxxDgUma7ju1M/LlkmnC5bwdNIoL7BAAWzr8P9A5d4gAAAAASUVORK5CYII=)}span.icon[icon="underline"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACjSURBVCjPY/jPgB8yEKmgPKH8ffn/0n4IL3F99P+QAjQTyveX/IexIwWCz2NYUbw/7z/CYK/9GApy92cgKXDEVJC+PxFJgQWmgoT9kUgK9DEVROwPRFKghqnAv9/7v2MAhK3iINePocBNwf69xXlDhf8Myg4y58UUsISkmYL+fI39ivul+0UMSA/q/wza/1X+y/0X/y/0n+c/+3/m/6SbgAsCAM8i/W7eee6fAAAAAElFTkSuQmCC)}span.icon[icon="createlink"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwZJREFUeNp0U39IU1EU/vZckhJZQolhg0SWWqbgqEEF1d+NJDMESc0KN8hS26aSmSSas2Z/lNPIWoZm6WZh/oiIkERo/gg1JajQENLEuaGtua29d7v3mWFCDw7n3ffO+e75vnOOxDYwiP89EokEUqkUk5OTpuHhEQ0RBPh5HjHR0XUjo6MajuMgXQkmhIgJawE4TtJssw2k6nWXMD09A4fTgbZnz9UUhP3X/AVgaAEBAaJfBVDb1PQ49WpJMcorDCC8r9K56CpUqVTo6uhQ0/hlAHYTS7ZYrGLJEgZCK+J5Xl2g16GisgrXy68paOiU0Wjc7PN6sxkVMIr/8l3HSgargdCzQP3MzHf88vmgOX9h8KfLJXk/PJodIYsE7/eLl3CrAZY5c6DYolg8Fc3c0IDSK5dhn50VpUpKOo7urk5sCgm1yrbvWAZYEY8JyYwhCzSZUkBZaQnSM85Qy4LqaBK62rsQH6d8aTRW5uNXEKSM+x8QkyDwGkIEEcTv5+nNxcjMzIZ92onu9h54l7yIikyoy8s/W5XRiKkvyAFarW0Y+TDWrNMXEvu8g4yPfyS6giLidrvJyZRTtBwkMjtmQG3aQ5DU+yBp1DLMMJ1uAKSBgYEW2qpknS4fd2pMoIk4cviQWPbct3lktWBI8OBW6Eaod0cBe8P16J+pwtgnaBwLtGG2/oFkvU6LGtNdlJYUKxYXf8D8wIyMzEzE7VGAULF5P3LlEcCCC9gVahC9XEa/C1BzAhWKTZjH7TI0NTYO1ZluK7ZFRGDJ7YHH4wWVBAIloggvQO4+IurFPDszvTkf7bHdYadc1hfQHmhzLuYNxsTGorPjBeQ75S0smY4Gej4bUPZ6uVvMszObNy4xMdH6pPkplEolgjeE3Nh/4CD6ensRn5DwSl+UrQUFWHLCOjFNBaPvfV8LRc/OSw5YGaTsXr252mZ7l8zQ/XTCtoaFvamqrDhXX2eZeBt8Ao/SIUu5ieqgUCSzstnYsORWLfJX1o9Kgi2rFtFJbWLNdq+NmWO78VuAAQCvqWY4vpJZwQAAAABJRU5ErkJggg==)}span.icon[icon="unlink"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsZJREFUeNpsU1tI02EUP/8hKWWtHkyQ5ZM2L0jG9iCp+NBD0JOliJSXMMptOWOlc050pWWlzB4Mt9RU8LK8rLQtpyGRjSLBeZktkaKHCK/LRmrO3U7/75+by/zg+//Pdy6/c77zOx8Feyx8n2KkTo0me8/a5/0NU1PTQvR4wOV2Q3RUlDo3J0uIiLDnwjaOzzJptmiksjK0/lhF84wF37w1YqHkJqoeN6n+AUDTGd8JxcDIppm5R8Ulclzf2MDSsgqUyWT38kUFqDcMo+iaGHdXwMOOCK+GRz6lFZVMZnm5Ard1IUqlUv2s/wVeFYgYAJYfgInK+sLHG0HE2UQUFHpgYWERnA4HCAsKx2nVysSUOd/pdIPb5WKCWDh71ogjJxCrA5lAqs7O9yK6nE5oaW0DRbkcrEtLkHMpD1NTz8HgoB4OsY9ovX7c7fJ4u5vZ3tmlsdlsmHo+HQf0BuzuG8Ds3MtY81A1TJvDyRUCaGGOOE+YP9X39vaOsygAt9sFXC63K/viBWnjkzaYX1zO7B8cgS37FkTG8nqkEmEpHfLNl2l6xqIplsqYhn20zGIRLa+t/UJVY3MnbT7mVyHZ4T62CAsDOn2fVCbH5ZVlvFV5B4lsGBrCtPQMTExK2qG2KvA0869lI6rDELVxRgaAUEQyK25XMVQJRGLMyMhE3UsDCgokOwB3D/pTTDaXodFDj+b8/ALYf68/ICyoG+r5YRwObG5uwYbd4bsmVbbGRzXHS7HJ2zuWg+bYumqFgH1BJR0d7UXi65Lx6JgY0Ot0EHE8tofJrmT/pVjwnY/GlH/Gj8Xj8bRPNd2QkJAA+4PZtYlJyfDOaIS4+PhXCqmomPEKPrAzbMmjfH8AinS1qbm1bmzsQxozPPSEHQ0NfV1zv/oKffxKdLaWyMnDeZ9P/vfo6B5Q2zKhJsTP9tMb7Ddsc3sB/BFgABdNb6HFHga9AAAAAElFTkSuQmCC)}span.icon[icon="inserthtml"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmFJREFUeNqUU01IVFEU/u57b8YZx5l5jhrWlBT9YFQUiYzRok3bgiijoohCiDYV5cKUXGQFghO0C4pqEYHIKAUtAqEgZqTCpDZthlGiZEKcUmkm37x3b+fe9xQpg7xw+bjnve873zn3XFZ/+ul32+YmFwIrWRpjMAzthyHJ3Web4HAO9p9kmUrXNFx/MGoaMrNlc9x/9QU6Y94PC26YEmVLlKVRTt/b9q2F5BoyULIFdENTAg4FyIxKI4maRlZpSyUNkuzKWtxTNI+lxNWhrJCrsSsj/lxzpL65My2sMhfbukeEoLTNN96KnufjInZiUEhRzDuuWNlzvrFrxMMMqgI6XrY3wWcwJDZElRNqHmzh1qUEHO+QvblHYaTSrzAcdDFeXaHQ5/OjTMmCFQGqX1NlKgGmKUBL75hLDBge+hRmciUUikBVsA4+XcZriRSWkq6AprsCtRE3UzTkEk0Pb72YxaN0Gya+RXHkLkPIqMdM8SJsxwSLHU+J8ycTyM/8Wrwm2X0XNbIagm1dQCzcjx1bgMSaK3iXT+JTDnjz/hDdENkPhvxYpTNVk1DXBG8SdLrSKPL5fmxdD8xRGdtr+jCcTWJTHJiaHqKG6nz2zr10xOF8mZHTachMtB4Aminz7tV9KnwpITA62YHXY70q2c5oy7ldwik7y8wst4pW6VTn48HGdcBPC7i2X6BnmKGS2vORyjDiZ559+PrwYHbR9d+LFwsYyOlojdcA6YkOGl8gN0kTXECKkcC/Hw2VMG+ZmH6yt+FoErcD1Ti80GRJHmjHZbaCF9xAu27JeYr2598CDABr2/w1HCL59gAAAABJRU5ErkJggg==)}span.icon[icon="forecolor"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABuwAAAbsBOuzj4gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALJSURBVDiNlZNdaFMHFMd/J7mxZrZJGjO/2sy6sspsV2qLnwy0sNAxKoiOFdxeHLa0Dx2Uvcgmlg6GIn5tsGEqKMwiig9uDDZkIC2bgWqdrHQM+jCydaVLek2ytckt9yb3+GKlBB+2A38OnP85/3MOnEMsFtvl8/m+BbpVlf8LAoHAWGNjoz00NJRtb28/qKrQNhFk+/ge2iZ8qkorXzbv4Er0eQKe6urq8319fc7c3Jx/dHT0pIjUIjKAx/sRcGynXG4RPJ8q9sUmubWKMjOSyeQ3TU1NZ61S6Z3a+vqXM48ff513MtcwqkE06+DmveCA5F4l6++V+Lsunt+HtXsMQFQVgFBr66+VjvOSY1n5zeHw+APjs6Oa2JMB2CsXwoDVTNXrUPoAKClyJK49Bc/yKAtdXQN1W7YU1oj40ul0NFY5OLjMJXQgk9ABS3GnFEkqcjeuPQUAYYIw8D7waG3H2t/6+/vHR0ZGIrZtTweDwXOTk5Nfle/9UIbrgE7gjgG8AewDdpim2RWJRA43NDRcnZ+f3wacqKmpmZqdnf25TOM9YBew0QPcA34BbgCYpnl/enr6lKpO5fP5dcFg8HpVVdWLZQJ3gSRwR1SVYWQr8HcP+s9yRiQSORMKhd4sFotB13VnZmZm9qtqEQARA4gCSc8w0gGcBU6XdTmey+X+FBHXsqzwtoZNN1Zw3cDnQK8HKD4N2iurTdN0gSOWVbA6Y9vrhvo2HjrQsfuVp3TFM6+qxJXNcWXN80717UNvNd689oWZuN2jx3t3/qiqKBgKzQqr/9vDgPeTj3t/+PBYm7u1fkPLSk6up46+lk2t92ZT63mG9DoCi0tEnRS1doqonaLWSXNp9qcTyULa+O7RHweXVzW+v5TY92+mor6w8ILXWvAb1qLfu7To91qFCmOV7XgrSwWpdC03oEvFgFvKRUur/xKREGABzhNTsJLOJ92XmgAAAABJRU5ErkJggg==)}span.icon[icon="hilitecolor"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAADLklEQVQ4y6XTS0wUBxwG8G/es7vsc1jWRa0oqOUhSIUI2kow8VnjhfZQPZiYpkl76aFNrY9D2wv2IHjQoKYHQ2KMiSVpWiwSbQ8aUGHZVLABFgV2l9l1l53dmR3cxzAzPZQYE02Txu/2XX75Dv8/8JYhXi0HTn6LYztakFCXtkjpxUaLwzXwV3Ak0d3ZDR/LvBEgXy2HGrchpubXu0ucl2dCk1fv/Tl4c0NF5Q4fy+Di4OB/A2d6LuFJeJ6j8/kTXo/Q2t66izAK+Q+KSuba1V/6Dn+xZw96f7v7GkABwJc9PeioqITBsUcJ3ThVJghMQ3UNElIKdr/DVbAZbf0TQ1NBfiT0+cFv0P/zjZcAXfVRB1qqNuFvTdsiuD1neIq2ltqs6L89gCdTT+FkfMjyqXLA6OaT7vi4Yy5ANLpgBjP/Ljh7rhtyPu9YK5SeLxM8729+Zy2mpyZxf2gY2awKSqOxfmM1FJ4SrI6SrSlzKZbbaAtXHmnTY30jIAAQt0bGvvI5nZ1rBDcdnX2GW78PICKK8Pn92N3WhqqaavwUvIM4K6PKu0qdlsPX7omB70p4e5z6dXRse0VZWddqj8sliSIeDg1Dzsioqa3B3t3tMAgKobkweJNWBtJjhkVgbQZrNKWN7Hy53/+IdtqsEGwWKhOL4fFoAAVVRVPTNrzX3Ay5UER8cdbMyPLwZDrcNeOaP724JDWWcnatwOQW4poIMqBro5Fo9MrjYFDPSCnU1dejubUFGk0jlcurBMdfyJnExz8u3fijaMmRKq9AYqQXCSoRntPCoFdFRX2KJLrM5eXSTXV1n9VubWA0mkUyk5lUisXvJ2ILfdeJviLnIby6JcfYS+xw0hzHweEmGBL0J/v3wTRN5Vxv76lqvz+iGubx58nk+MTMzA+ffnhgHAD4wC6Y04VCgTUUJ7cG62xenmTN9uvlnXeJlX9wA/AwHMc17dzpFyMRdT4UUgAYAFQACgCSvPnu195634mO1ftoHzzPp5NPj1IrB6UByBm6no3Ozi7IkrQIIAtAXgE0AAZkbUJtWF6I0KJKvjAeqKH0MIH/k1oAVgB20HgGHXMw/wHFy2IvhoXb5AAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMi0yOFQwOToyMzoyMC0wNTowMA3KwlkAAAAldEVYdG1vZGlmeS1kYXRlADIwMDktMDctMTBUMTI6NDI6NDAtMDQ6MDAqfVcQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==)}span.icon[icon="spellcheck"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABL2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY69SsNQHEfPbUXBIYgEN+HiIC7ix9YxaUsRHGoUSbI1yaWKNrncXD86+RI+hIOLo6BvUHEQnHwEN0EcHBwiZHAQwTOd/xn+/KCx4nX8bmMORrk1Qc+XYRTLmUemaQLAIC211+9vA+RFrvjB+zMC4GnV6/hd/sZsqo0FPoHNTJUpiHUgO7PagrgE3ORIWxBXgGv2gjaIO8AZVj4BnKTyF8AxYRSDeAXcYRjF0ABwk8pdwLXq3AK0Cz02h8MDKzdarZb0siJRcndcWjUq5VaeFkYXZmBVBlT7qt2e1sdKBj2f/yWMYlnZ2w4CEAuTutWkJ+b0W4V4+P2uf4zvwQtg6rZu+x9wvQaLzbotL8H8BdzoL/HAUD36i+bmAAAABGdBTUEAANjr9RwUqgAAACBjSFJNAAB6JQAAgIMAAPQlAACE0QAAbV8AAOhsAAA8iwAAG1iD5wd4AAACV0lEQVR42pySW0jTYRjGfzuo25o6tbTlzBy2TIeHeYhCSvLQRWQKdRFRRkkERQcwvUkKCgoiUohgklB4EQUpIXoRVATR+SJJETOiUiozt1B3aPv/v68bBy46WL+79/0eHt73ex+IRutyudxOpzONBaIFyM7OTp+rBbBVr9fn2+12U0TkdDoNvzPVlJSUNEopm4EYv9+/0WQyPQW0UspYVVX36nS6eI1G0y6EmBJC1AwMDIzON9AZjUYFWK0oSgHgUxSlMBwONwEjqqoeUxSlCrgYCAT2B4NBr9frDf88xRBwCxgB2oBxwAE0AB+Az8CGiNgM5a3JMW8Aa6R3GxidE7YCg8Ar4AvQBJwDJoGHJqjpyDD73u/cJE+nGb4Ckb9jPZABxOohf3eq6SVQPG/KnERo7MlJCU2cOiw9j+7L6QsnZV1Kwr2oXeIg0+20TYnmPfJgesLjSD8eHL3FGbMzZ49LT99NOXm9Q4ruLtlUlDummW9wZpX1bcuO+qzphGSSQkEa2t393Z9mWu5UF7xYU1sf50tKRfXNYAEudXYFjj4b3BZl0F+RP1uT51jkDYcxLM9EFYKPw0NKztpyvU9qkaEgZqFyrafv+74nw9sF9EYZFOhpu1tqO5JoXUrQaMawzIbOtoLQ+DvwThHrmaDj+WvfgbHZzcCDX0azVE+nf2WMFC6LVIuSpChbIkWhRYpcg7xhIaCF6r/m22XUXf5WkSVFlV2KSrsUtXnS7UiZmbvWwihbbL7iP1QnxYldsquywA+U86+sy7RePb+lwjM/if9D+p8efwwAZN7mkQCRO+sAAAAASUVORK5CYII=)}span.icon[icon="createbox"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABuwAAAbsBOuzj4gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHfSURBVDiNY/j//z8Dqbg/l0Haxkhkxv///xkY161b9//Zs2cM2dnZjAxoYP369Rhys8sZBSR1co+u33FGS0LOmoEFJjHr8N3/6AaIosv9/c6gYJbAsGXXBQZXZ0eGh6/5GBj////PMOvw3f9ptsoN6AYggz+/vzHf3hPhN33FI/GmyuhDq14HhaXZKjOyICs6ceJE1JcvX9Qwtf9n4Hw/m2HZ1lcMqbHeLwU0Sq8xvL7LwMDAwIBiwJcvX9RcXFwwtD88UcHQv/IFQ0tVAsPZRyriyHJM+JzNwMDAcHF/C0PvzIMMtUVhDIJqGRjyLOvXr///+9kzBgbbbAzJ8wenMkyfvZqhsSSUQVgTVf79sTUMnccY/uN0wY0zyxhmzZzBUJbhwCBhWMnAwIARyxAXBAYGMqJH4bmzJxkWTO1nSI82ZFCy7GBgZGTG0ChoFcKQZqvMiOGCf//+Mbx4fJPByMiUQc2+j4GJlROXIyEuQObw8PDcykhLVlOU5WUwsQpkOHbiAlzuz58/DIyMjAx8fHy3cBpgYWGx7MWLp7I+Pv5P3r59y8rCwvKfk5PzHxcX119cLoDnBVY9DwxJ0TeXGHDJvT+2BtUFabbKWDLTpf+45DqPMfxnYGCA5AVKAADQntnY2VQQQQAAAABJRU5ErkJggg==)}span.icon[icon="indent"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKZJREFUeNpi/P//PwMlgImBQkCxASzInNpFQf+b49YxgtiLFi3C67e4uDhGFAOKprmjaPj79y9RLmAEBWJah+V/cVFRsMDL168ZZlUcZyTWC4ywWIio0AYzVnRcBWuePn06Xi9kZmYyogQiSOOXT5/gCn7//o0XY7iA4lhob28nyaTKykpG6rqgtraWJJOam5up7ILS0lKCJnV3dzPiTAcDlpkAAgwASWRZumQ+xFAAAAAASUVORK5CYII=)}span.icon[icon="outdent"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKxJREFUeNpi/P//PwMlgImBQkCxASwwRu2ioP/NcesYYfxFixbh9VtcXBwjigu+fvnKUDTNHa7p79+/eDEMMIICMa3D8r+4qChY4OXr1wyzKo4zEusFRlgsRFRogxkrOq6CNU+fPh2vFzIzMxlRwuDLp08MW6Y9htv8+/dv0lxAcSy0t7eTZFJlZSUjdV1QW1tLkknNzc1UdkFpaSlBk7q7uxmpHgsUZyaAAAMAdHBc6vgB3M8AAAAASUVORK5CYII=)}span.icon[icon="smileys"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAt1JREFUeNp8U11IU2EYfrbj3KZuzjM33Q+2dP7kRVrmEiSpQKSEQCgi6K4ILYMiFC8LisggiKB1URfRTVfmRcMkGlFBaSzSyozU4Wz+zTl1051t7pzeb/5gvy88fJzv/Z7ne877vp9MkiRshPuygi084QzBQagicATPOpyEALZEGn6N6wq1rsO06yS05kpkmXZCBjnC04OWyNTAEf+HR1cSK/M36Vz7BkG24YBuv8MX7m8tb3KCU6RBjM9AFLyQRAFyZQHBDCkJDLvaERjuYU7Objog8tXc4vpWveM8sOpFLDIGmYyDxBjJKJJxPxCKgMuwg991mq6VtwS+uiLMCVeHaxay3V1x4iGCk33of9mF6IoA3mABJ6cjJJJMCBj+MoLPnj5osmKw1zRjZshVm4wv32dHWqyOU+C4VZjyYiguK4JvzAv30+41BwR37xtMeP2w23Nh4qmG0gLMlceZ+Rb2C405tj1ILPUDYgLWAiOs26xkk0vZhxRH/aEa0lmm7zCtESRCz6Ev3AvvazQxgfJMnRHx+XdYDIaxtLCyRqb6EzvlgAkzIUmMQaOVIztHgCr/IHNgZwLxZCKSDmkV0+M+7D7Wg/+F53EtsnUG0o1tzsFINPSjUqnkSSOO3gobtCotNCoN1Ap16lA0EUVYIHfCEnI78iFPN1CnZlnKx4roCo2/R5q2Gvo8JTRlpf+8PdNmA89zUPCHEfINsK1nTMA5NeiiXkdh3O6Aupqjfmf8QZYrFJTLhLGwimqRxISni207U5NIg9RpKKlrK224iNXFtxgf+gRt0TlYdjSkyHM+D6Y+3oCt1AClvh7f3fdoDl7cptSFraN811Cyr8V+oJlGWYVYoBtB/zeISRF6sw3qvCaIIjD66gGR3ZujLPvtNXamZ+jazBWNyLXXQJWdn9oXlmYRHOvH5IALsfDcrRCKLuVgFH8TYEsBmzDCUdbn9ZSX8GT9OY9src1PAQYA6agqvWxjwVUAAAAASUVORK5CYII=)}span.icon[icon="textshadow"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAA0hJREFUOI19U11MW2UAPd+9vbf/P7RQYLQwCrShnXSVssbMSAjrdMkSQ7Iluoy5ZGbzUR/mwx4kGn3w/68mxvjzTDIxYRMEYyYkG8MUtgmbWihisg0ovW2/2/WWtrf9fDKZzHjezsk5yXk4B9gFjydgMZvrdA9rQz12NJh4624vAHC7hdOn3/jovXdnE2fPfvma1dpsdJm1pmN+5yeT5/yJqNfautuveZj4vP3Q69sP2WwB94E+/+s60f3scelC5aDXFoGoYrhHPfNjgo78dwMCIcMWg4oi7JEyKigt4JluPH5QX4sQWgWhAjpF48AjDbqCndbj549eqA+SM6KH2oVplWz9KqFS3kFv4w2QrU2wQgHw7UNzlIWunuMnZMWzfftO48w3XydHNbygEX2R9hd1noJdUvNwRxLIJWygqQ3oF75FOZWCcMILRPegTZ0w7XWQI0w0oTfceWLi+41rfPp+WrHtFQrOkHBEqVDy14NltGEA99byCK5dRsW3AX4oBT59DZxWBbQMEMqIx7OzIyMrH/AAcHM6Ee+2cL3tgR6fUinhTm0cpaIF3NI6NK77uOLvwLZnCAbjMMRqFdLm7XLs8+zJ+AK7qwGA5wNN+15ZYdGGdxaR3x9G0qziT+l9dJAMaK4Psd+74VXm4HKswlXvQWplMHFx+pdlQAZ/MlyPU6Gmz/a31PVwSgm6+ByaJufhyutgj1aw8pQJVxNvYjDkYBV9kujMGrT4PM7mFpdz7uLSJW4mSe1tzdxhaFVAJwImI8jwMVheEmB4MoM67yDmN3lUpeeqFm19SSvqYCAOPDHQ/0LkcJ+fl3dqO+lCZSpfZMl1qbTacGo7bDy0RojzLohowFQuhkv3HLieErg2/eIOKaU02dXyzeWp9bduXfnt50emvXxLfMBUA2NFjinpdhb4aotxsRIzfKEyzdOvxkBg+L8v1Da2u35ifBhF5mZvjxq/+2OzqHTUCTjgAHNUMzfAoPxrifl8HrVaDYQQWCwW/DCp+9hqdT82O8M+7PWeH40ufNqlqP0vN9qsoaW1+csA8E+G4zhAlmVCKUUul4MsywgGgyQcDovj4+OQJAmSJIFSitbWVu3Y2Bgopchms6CUQpZl8jcD32LkKBkUAgAAAABJRU5ErkJggg==)}span.icon[icon="_fontsize"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAALVWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4yLjItYzA2MyA1My4zNTI2MjQsIDIwMDgvMDcvMzAtMTg6MTI6MTggICAgICAgICI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczpJcHRjNHhtcENvcmU9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBDb3JlLzEuMC94bWxucy8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczp4bXBSaWdodHM9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvIgogICBwaG90b3Nob3A6QXV0aG9yc1Bvc2l0aW9uPSJBcnQgRGlyZWN0b3IiCiAgIHBob3Rvc2hvcDpDcmVkaXQ9Ind3dy5nZW50bGVmYWNlLmNvbSIKICAgcGhvdG9zaG9wOkRhdGVDcmVhdGVkPSIyMDEwLTAxLTAxIgogICBJcHRjNHhtcENvcmU6SW50ZWxsZWN0dWFsR2VucmU9InBpY3RvZ3JhbSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxMC0wMS0wM1QyMTozMzoxMyswMTowMCIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjBCNENFQzNDODFGN0RFMTE5RUFCOTBENzA3OEFGOTRBIgogICB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBCNENFQzNDODFGN0RFMTE5RUFCOTBENzA3OEFGOTRBIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBEODQyRjM3QTdGOERFMTE4MjFDRTRCMkM3RTM2RDcwIj4KICAgPElwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8KICAgIElwdGM0eG1wQ29yZTpDaUFkckNpdHk9IlByYWd1ZSIKICAgIElwdGM0eG1wQ29yZTpDaUFkclBjb2RlPSIxNjAwMCIKICAgIElwdGM0eG1wQ29yZTpDaUFkckN0cnk9IkN6ZWNoIFJlcHVibGljIgogICAgSXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPSJrYUBnZW50bGVmYWNlLmNvbSIKICAgIElwdGM0eG1wQ29yZTpDaVVybFdvcms9Ind3dy5nZW50bGVmYWNlLmNvbSIvPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowQjRDRUMzQzgxRjdERTExOUVBQjkwRDcwNzhBRjk0QSIKICAgICAgc3RFdnQ6d2hlbj0iMjAxMC0wMS0wMlQxMDoyODo1MSswMTowMCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iL21ldGFkYXRhIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQyRUQzODAyREJGN0RFMTFBOTAwODNFMEExMjUzQkZEIgogICAgICBzdEV2dDp3aGVuPSIyMDEwLTAxLTAyVDIxOjExOjI3KzAxOjAwIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvbWV0YWRhdGEiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MEQ4NDJGMzdBN0Y4REUxMTgyMUNFNEIyQzdFMzZENzAiCiAgICAgIHN0RXZ0OndoZW49IjIwMTAtMDEtMDNUMjE6MzM6MTMrMDE6MDAiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii9tZXRhZGF0YSIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Z2VudGxlZmFjZS5jb20gZnJlZSBpY29uIHNldDwvcmRmOmxpPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8ZGM6c3ViamVjdD4KICAgIDxyZGY6QmFnPgogICAgIDxyZGY6bGk+aWNvbjwvcmRmOmxpPgogICAgIDxyZGY6bGk+cGljdG9ncmFtPC9yZGY6bGk+CiAgICA8L3JkZjpCYWc+CiAgIDwvZGM6c3ViamVjdD4KICAgPGRjOmRlc2NyaXB0aW9uPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5UaGlzIGlzIHRoZSBpY29uIGZyb20gR2VudGxlZmFjZS5jb20gZnJlZSBpY29ucyBzZXQuIDwvcmRmOmxpPgogICAgPC9yZGY6QWx0PgogICA8L2RjOmRlc2NyaXB0aW9uPgogICA8ZGM6Y3JlYXRvcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGk+QWxleGFuZGVyIEtpc2VsZXY8L3JkZjpsaT4KICAgIDwvcmRmOlNlcT4KICAgPC9kYzpjcmVhdG9yPgogICA8ZGM6cmlnaHRzPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5DcmVhdGl2ZSBDb21tb25zIEF0dHJpYnV0aW9uIE5vbi1Db21tZXJjaWFsIE5vIERlcml2YXRpdmVzPC9yZGY6bGk+CiAgICA8L3JkZjpBbHQ+CiAgIDwvZGM6cmlnaHRzPgogICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPkNyZWF0aXZlIENvbW1vbnMgQXR0cmlidXRpb24gTm9uLUNvbW1lcmNpYWwgTm8gRGVyaXZhdGl2ZXM8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz56f+asAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWBJREFUeNqMUTFug0AQPJBpoAgUiAIJQ0XhAvyC+AdOfuAfRHlBnBfkC/mByQ+cF9i8AIPkxhS5FHQYsmst6HIxxCet7phlZ2dnFSad+Xw+hesgQOvdbvfKBo4qA+fz+QGCCbFiI+cawUoi8GezWXQTQRiGUyiIqTC5RcVElq8oSj87hA8Rj40gE3SdeJZlaRAECb2f/yXwPC9C+fSJhaxpGry3lM9I0aEoiuAPgTTnhSDP8xRv13WXaCblfPiOjsdj+stEcX11XceO47xA3Eu5vWzqxTHbtnFN+ysjLsqy/IT8F7xNMDhu2xb/44BbvQLoKO4eu2xxjVhsWRbKNxE/nU4p5U3Eew9ESaqqLjjn3+Jo9HynZgmtFvEPxTCMZWca3lVVPXbFuq7fgWw+sEEO4/gToQMTiBitsctxIOo9gkJUYJKK4aNp2gaihXiS8DfCN6ME4EdLMZXwqMv9CDAA8QTsTH1QNoMAAAAASUVORK5CYII=)}span.icon[icon="_fontname"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAGaSURBVHjalJO/ahtBEMZ/e2cjEAQJN0KKUoh0QQ/g1g/gxoZzovJeQKVb1cYvIJBa6RAGgZ9D5ZUCO4UtYbARFzk535+dFM4td8rZIQMLOzvM9818s6NEhOl0esc7ppQq3DPfcZyPewAiQq/Xa/EfNpvN7gH28o9RFKGUwrIsw5JnTNMU27bJSA1A5oxGI3zfp1qtstlsaDQarFYrxuMxSimTnDcr7yyXS1zXpd1us16v6ff7fKjV0FobkncBBoMB3W4XgMcgoF6vc3lxgYiYo8OwAFBowbbtVzagGkU8nJ8T396y3+kQ39xgHxyQPj3Rmc9NTqECw5KmbOOYh8NDWp5H1GwShCGt4ZBfrvt3BfnkTO0fLy98OjpCREiShPT5GRHhy/FxuQYZwMTzWCwWWMD8+hqtNYnWSBiWCmkqyJT+6jh8OzszsxcREq35GccFgCxe2sKuhUHANklK41aGlh9V/txdXVHxfQC+e97bLbxVQfPkBHV6yuc/X7wUQClFpVJBa232IL8Lu2+lGkwmk/t/rfHucgH8HgAoHO50MNq3KAAAAABJRU5ErkJggg==)}span.icon[icon="blockstyle"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAtFJREFUeJx9k09oUwccxz/vT/PSJHZNk9SmtFPbRjuLItjqPCidsFEUFQ8ieJhjiB5U2GXIYJN58OBBPYiHzYN/DhvzoiCIwtrOKaNKVLQepOu0MbXL2iS+9CUveb7k/TwI0knr9/jl8/t+L98fLKSB68aKHycO7/41+8To2Lh5QW4eKZEfMjt2Xcs9+MkUuSwi+27P5H1dA9vmg7X3jeiRwTObvlp1anFnfXyqAv8UwGgL1PvXbt/58l4q7WWfPPpgfcPJ4cGWjEj0tkh4SKRpSCQ6LLLumcjKn59mgNa5vPp+QLVMLQc4jeBYIBVIxGBpBPK6aoBhLBhwvIVYU7Uac/NguRBrh1gbZFUYnIYZ0/NAqc290QHGujBi/c1fNm7d853faF327XPwQlBQoeSBK2+rgj69Sd0b/tq6+O8xQAC0+9uMge49A78EdhzYT1tPeEPdM5rTrxi02lF0FdcGb1ronE5zYE2K/kPx/sfaWIs9PHsT8LSDO3suxDf0rSf9Al6Ow0yKvuIdEuNPGan1ohQyfBa5zpb+W4Q602jVAPFNLb2pYKbb/r1wQ5eSrTD5ENJZSE+BW4NonN2rQripb/h+exKzyceNfAjV1BEEVVdJ7O/a5YyVJvWq7UKuBKoG4WYIRGHpShBhif0nlprlr0qZhnyYYv41wY8MuuMdLNM/ZjT0sFkvmGWXvAW2A8EwVFwYTYJTpFZz4VUAqSvx2ufQGWtHD+r4PIORyQcUiyXR7r4oTXwa4ItWX20RpSr8l4NZEydb4dJYMXVnhR9XEz+WCgJT5gyTZgbTtVCTtVEt5zJx5bn9R4+hbV4eUCJetszVcTu7N2md/m2iss9LVm6FEuHPxdAXMatQLjtIRUEZcfLetfK5d4MIQffRRGBoa6N2Dvjkf/OM6L3Rox1/R873iHokOqus850FEvO9gn++eQPQWLe6vq/hBDq9c+034TMu4GjDGL0AAAAASUVORK5CYII=)}span.icon[icon="settings"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC6klEQVQ4jX2SX2ibVRjGf+d8pySNjf2WriSMmdbMTmXOtQq6zgsFkU0GXqwwBf9sxT8XE3EDBavDTXDtcKhR/AcTvbBTcMp2oft3ZemkQ2XMblWcw9iKLNRaky5N8n3f+c7xoknIvPC5ep/znPNw3ud9oQk3d8GzAw63rxa8/1x7JJzoPRtO9P707QfJVDoJ2zZK+nq4CqJebFgDp97u2tgac4c9Ex/yyrO0OxdPCkC3ZJ78p9p5LhEPstorjjz0Uu7ro6cNAKpukFkhiKnCiChP90VV4lgklsiJ6pImhd69PDKdFIv5qFTuR+tWOcm6gZQS7rpFUKoorH/lC2PA+vMO5Us3GAPGAJWZLuvlo0ta8UhxEW7NCFoUiAf6BYdHVu8msrJXBH91sDh5T+1TBjgHWKAPkAC09nxvI+lp/Nmpp/dP7RX7H1etOweic4SlWFM2VxbKbH7lEONVH15+mP6kyzHAbdxw2rzDY36n+j2vq8YrvWXh+aZM3ty6j/FvJpfImZ+ZOPMGB6RkX0236NInl+eoyoPHsce/40UT8I7RYDQUg9SFsfONATE1Dbm/l1+o60Zz5JcZnnr1UwL5wgDq3rV8FobsDDWEGuJtHRsGB3obBvff3cP1Xen+uh5qtmQ6OXVgkJiSAmE0m5qXwxRzO7K7tpy9Y21q1AsMj21KPRj88eUugqt2aL3WGHFnD3w1xHYhWGMtaWArgJAKGe+eRwhrFnId1mhq5yew+jxwcfBdPmw0euMKGNvDsBAM8T9wru0+tONj9cjnJy9BU+qsS4MJ2VyjZWASWF/jPwIrgQ6zkL8v3dp4hkokEriuSyUaYQ77aMzM7qk4yb2EXrsb/jYOUHFSr5Vk8nTc/Dns62Wv531FJuNRKBQQo6Oj3cBtQCfWtgmCaywtQuK337Tw3jPCavlr/ImDvnQvC0JrcUoIUQJmgR9ENpt1Xde9Tim1DIgDLUAUiPynfQ+oAj5Q0lrPFwqFmX8BXgsv8iomuLkAAAAASUVORK5CYII=)}span.icon[icon="removeformat"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAkpJREFUeNp0kk+IElEcx39vFBc9+OfQRTAwzFt4CaYOKStj6MoeculStzoIQSB4kCVckmDx4iGCXWYJIqjoVOzO1l4qT1F7WfBWHvxzDPyTB3XUmXn93suRybUffHmP997n9/cRsFgwGARJkiAcDsPlwgEIeEZQAhCRAkgAlOD6SQP4rgMFDWVnYCAQgFgsBqFQCBwOByzZNQOotPHx1RNCCCipu6bfb+zSnslkeOQVILPrBkAirbws9btdTEWAzZPXpfepOzaeGMBXwe/3w3+MwTc3Dl+UeghTiskbBvR6Pbh18mZHB0jjmxvCKhIfR37s3r+Sevf8ca/T4TBF2HTSODuDxP7uNjrZFFbBk8lEzOVyspa4ykGYw2zfbTb/7ilvok1YhlVVFfP5vDydTkHXdXDdlhZOOnPY4/HA0YPtp3h6LFjh8XgsFgoFGTPgsKm1zDr8ajTQh8Fh5eGjZzjGI8yjKlgjF4tFGdd/YKYmRja24hw+zu3sYe2HiH3hYzQjl8tleTQanWtou93G6Qngdrth6+1+9h6hTULJZ/PeziJXKhV5OByeg1ut1gJOp9NZTdNOcQ419ot+ggp1qoLdBFmqVmNpm3A8Huewy+Wq1RH8QH9zmBlJJpMRdCIqiiIPBgN+2MCGsW/r8/kgGo1m0fmpzWarseayHlmNeL1eFiWC0cRqtSr3+/3FpSiKHMZtjU1glbFyfKgLTqfzEka9OJvNeDnzz1JnCaFmqOl8ZdJY1SiDOXCiXKg1NtG5DIt0y6ov3dE/AgwAENFWYYLj4mYAAAAASUVORK5CYII=)}span.icon[icon="restore"]{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAnxJREFUeNqMU01IVUEYPXPv3Pee96nPFpL9G9ai2tvGFi0qaRe0CYsIomjjtiIl8onYopV/ixaGJLZQdBMWvoIQwowWLYJa9EdkEQYlmfrenTudb+6NWoR0uXNn7sw53/m+MzOqoWu6I7IoVkyMKAb4rvt4bJqfwPegFTpRf23aPlu0dvZTZP/3EaxwhKuNtdDUPTD8BvbybrxaWKKGguXXxjGIh+d57p8T2LO1zmGfn2uCcCUjLBsFzAy5FEf6ezEy0Iv50hSelCZRFWZxq68HTx9McW4yqWNmMOFIOYr9z3IM3bgXZfrQ3tFNVYU4Ni4TyqL9Sjdip2axWjEOKxzheoq5/ViL0LD/EIkx+oodmBm/jYAO9fd04uHkHZQmRpHx4eatNcQedhzhakljhfbnOcqyXSoW3W5I7Re7ii5NUZfgx06eQi4A8n7CcSVIlmv8KQQK996uoHVnSEutMy2x8s8GimGCKWSU4whXS5VlHoQC5a/PfcfV2W9YM6lqShWMx4KzVA4pJFjhKKQl0A9UM2rZeDjbpNDWvOkvZZs2hdH5zxj7YJHxlOMku5AGqJLjRWBbcz1evv8KXwdOulKJEBvj3Ja1iY+LxCYBVHoyUaFBOaaWYT4R89+ycQOGbw7i/OkT2MZxwAWtNaJVQ4xyWOHgdwmx9ZAPNPV5H4xFTehh7vEsjrQeRU1OCL5si1sLOc4HnuO4AGKO9n3UhQF0hQfKSxayvCxh1sVnn3E74nNNcNUMIBzHjb68G7pxFxei2GKpbHCmdhdWeBK372g83j72CC0tB8eX6YMEqCVx4P5r1PJUURnCFR/E8s3/uLkv0n7fOrd74ZcAAwDJQkCuN7CqgQAAAABJRU5ErkJggg==)}');


var html_editor = '<div class="EditorBox"> <div class="visual"> <div class="SUEditorToolbar"> <div class="btngroup"> <button command="source" title="Switch source view"><span>Source</span></button> <button command="restore" title="Restore saved text "><span>Restore</span></button> </div> <div class="btngroup"> <button command="bold" title="Make this text *b o l d* " /> <button command="italic" icon="20" title="Make this text *i t a l i c* " /> <button command="strikethrough" icon="22" title="Line-through text" /> <button command="underline" icon="21" title="Underline text" /> </div> <div class="btngroup"> <button command="justifycenter" icon="30" title="Center" /> <button command="justifyleft" icon="29" title="Align text to the left" /> <button command="justifyright" icon="31" title="Align text to the right" /> <button command="justifyfull" icon="32" title="Justify text alignment" /> </div> <div class="btngroup"> <button command="insertimage" icon="35" title="Insert an image" /> <button command="createlink" icon="33" title="Insert web link" /> <button command="unlink" icon="34" title="Remove link" /> <button command="inserthtml" title="Insert HTML" /> <button command="removeformat" icon="18" title="Remove formatting" /> </div> <div class="clear" /> </div> <div class="SUEditorToolbar"> <div class="btngroup"> <button command="_fontname" title="Font" /> <select command="fontname"> fontfamily <option value="" style="color:lightgray;" >font name</option> <optgroup> <option value="sans-serif">sans serif</option> <option value="serif">serif</option> <option value="cursive">cursive</option> <option value="monospace">monospace</option> </optgroup> <optgroup> <option value="Arial">Arial</option> <option value="Helvetica"></option> <option value="Arial Black"></option> <option value="Gadget"></option> <option value="Comic Sans MS"></option> <option value="Helvetica"></option> <option value="Tahoma"></option> <option value="MS Serif"></option> <option value="Symbol"></option> <option value="Impact"></option> </optgroup> </select> <button command="_fontsize" title="Font size" /> <select command="fontsize"> <option value="1" style="">Size 1</option> <option value="2" style="">Size 2</option> <option value="3" style="">Size 3</option> <option value="4" style="">Size 4</option> <option value="5" style="">Size 5</option> </select> </div> <div class="btngroup"> <colormenu command="forecolor" title="Text color" /> <colormenu command="hilitecolor" title="Hiliter color" /> <colormenu command="textshadow" title ="Text shadow" /> </div> <div class="btngroup"> <button command="spellcheck" title ="Spell check on" /> </div> <div class="btngroup"> <button command="indent" title ="Indent" /> <button command="outdent" title ="Outdent" /> </div> <div class="btngroup"> <button command="createbox" title ="Create box around a post" /> <button command="smileys" title ="Smileys" /> <button command="blockstyle" title ="Toggle block view" /> <button command="settings" title ="Settings" /> </div> </div> </div> <div class="source" style="display:none;"> <div class="SUEditorToolbar"> <div class="btngroup"> <button command="visualmode" title="Show HTML"><span>Visual</span></button> </div> </div> </div> <iframe class="editor-iframe" style="display:none;" /> </div>';



var html_widgets = ' <div id="dialogWindow" draggable="true" style="top:40%;left:40%;display:none;"> <div id="dialogWindow_topbar"> <input type="button" title="Close" class="closebtn" id="dialogWindow_close" value="x" /> </div> <div id="dialogWindow_container"> [IMAGEFORM] [LINKFORM] <div id="StyleForm_container" style="display:none;"> <h3>Edit Style</h3> <textarea cmd="css" spellcheck="false" style="min-width: 195px; min-height: 165px;"> </textarea> </div> <div id="SettingsForm_container" style="display:none;"> <h3>Settings</h3> Turn [stumblername]s into profile links&nbsp; <input type="checkbox" checked="true" cmd="sunames" /> <br /><br />Image Style: <br /> <textarea cmd="imagestyle" spellcheck="false" style="font-size:10px;width:80%;"></textarea> <br /><br />Box Style: <br /> <textarea cmd="boxstyle" spellcheck="false" style="font-size:10px;width:80%;"></textarea> </div> <div id="SmileysForm" style="display:none;"> <h3>Smileys</h3> <img src="http://www.stumbleupon.com/images/smilies/smile.gif" style="width:20px;height:20px" cmd="preview" /><br /> <div class="smileycontainer"> <img src="http://www.stumbleupon.com/images/smilies/flower.gif"> <img src="http://www.stumbleupon.com/images/smilies/bear.gif"> <img src="http://www.stumbleupon.com/images/smilies/smile.gif"> <img src="http://www.stumbleupon.com/images/smilies/blush.gif"> <img src="http://www.stumbleupon.com/images/smilies/bigsmile.gif"> <img src="http://www.stumbleupon.com/images/smilies/wink.gif"> <img src="http://www.stumbleupon.com/images/smilies/inlove.gif"> <img src="http://www.stumbleupon.com/images/smilies/thinking.gif"> <img src="http://www.stumbleupon.com/images/smilies/smoke.gif"> <img src="http://www.stumbleupon.com/images/smilies/angel.gif"> <img src="http://www.stumbleupon.com/images/smilies/giggle.gif"> <img src="http://www.stumbleupon.com/images/smilies/clapping.gif"> <img src="http://www.stumbleupon.com/images/smilies/bow.gif"> <img src="http://www.stumbleupon.com/images/smilies/nod.gif"> <img src="http://www.stumbleupon.com/images/smilies/emo.gif"> <img src="http://www.stumbleupon.com/images/smilies/yes.gif"> <img src="http://www.stumbleupon.com/images/smilies/no.gif"> <img src="http://www.stumbleupon.com/images/smilies/sun.gif"> <img src="http://www.stumbleupon.com/images/smilies/skype.gif"> <img src="http://www.stumbleupon.com/images/smilies/dance.gif"> <img src="http://www.stumbleupon.com/images/smilies/beer.gif"> <img src="http://www.stumbleupon.com/images/smilies/drink.gif"> <img src="http://www.stumbleupon.com/images/smilies/ninja.gif"> <img src="http://www.stumbleupon.com/images/smilies/star.gif"> <img src="http://www.stumbleupon.com/images/smilies/sadsmile.gif"> <img src="http://www.stumbleupon.com/images/smilies/crying.gif"> <img src="http://www.stumbleupon.com/images/smilies/tongueout.gif"> <img src="http://www.stumbleupon.com/images/smilies/mmm.gif"> <img src="http://www.stumbleupon.com/images/smilies/nerd.gif"> <img src="http://www.stumbleupon.com/images/smilies/brokenheart.gif"> <img src="http://www.stumbleupon.com/images/smilies/heart.gif"> <div class="clear"></div> </div> </div> </div> <div id="dialogWindow_bottombar"> <input id="dialogWindow_ok" type="button" value="Save" /> <input id="dialogWindow_cancel" type="button" value="Cancel" /> <div class="clear" /> </div> </div>';



var html_imageform = '<div id="ImageForm_container" style="display:none;"> <form id="imageForm" action="javascript:void(0);"> <div> <img class="preview" src="http://img265.imageshack.us/img265/6496/imagepm.png" name="preview" style="border:1px solid black;width:100px;height:100px;display:block;float:left;"/> <div style="float:left"> &nbsp;&nbsp;W:&nbsp;&nbsp;<input class="width" type="text" value="200px" style="width:40px;font-family:monospace;" /><br /> &nbsp;&nbsp;H:&nbsp;&nbsp;<input class="height" type="text" value="150px" style="width:40px;font-family:monospace;" /> </div> <div class="clear"></div> </div> <br /> Image source:&nbsp;&nbsp; <input class="src" name="src" type="text" value="" /><br /><br /> Position:&nbsp;&nbsp; <select class="position" name="position" value="normal"> <option value="none">Normal</option> <option value="left">Left</option> <option value="right">Right</option> </select> <br /><br /> Tooltip:&nbsp;&nbsp; <input name="title" class="title" type="text" value="" /> <br /><br /> Alt text:&nbsp;&nbsp; <input name="alt" class="alt" type="text" value="" /> <br /><br /> Frame style: <select class="frame" name="frame"> <option value="none" defaultselected="true">...</option> <option value="classic" >classic</option> <option value="shadow">shadow</option> <option value="cute">cute</option> <option value="custom" style="color:red">custom</option> </select> <br /> </form> </div> ';



var html_linkform = '<div id="LinkForm_container" style="display:none;"> <form id="LinkForm"> <b> <label> Link Settings </label> </b> <br /><br /> <label> URL Address </label> <br /><br /> <input cmd="URL" size="40" type="text" value="http://www.stumbleupon.com/" /> <br /> <br / > <label> This link will open in a new tab </label> <input cmd="newTab" type="checkbox" /> <br /> <br /> </form> </div> ';



var colors = ["White","Ivory","LightYellow","Yellow","Snow","FloralWhite","LemonChiffon","Cornsilk","Seashell","LavenderBlush","PapayaWhip","BlanchedAlmond","MistyRose","Bisque","Moccasin","NavajoWhite","PeachPuff","Gold","Pink","LightPink","Orange","LightSalmon","DarkOrange","Coral","HotPink","Tomato","OrangeRed","DeepPink","Fuchsia","Magenta","Red","OldLace","LightGoldenrodYellow","Linen","AntiqueWhite","Salmon","GhostWhite","MintCream","WhiteSmoke","Beige","Wheat","SandyBrown","Azure","Honeydew","AliceBlue","Khaki","LightCoral","PaleGoldenrod","Violet","DarkSalmon","Lavender","LightCyan","BurlyWood","Plum","Gainsboro","Crimson","PaleVioletRed","Goldenrod","Orchid","Thistle","LightGrey","Tan","Chocolate","Peru","IndianRed","MediumVioletRed","Silver","DarkKhaki","RosyBrown","MediumOrchid","DarkGoldenrod","FireBrick","PowderBlue","LightSteelBlue","PaleTurquoise","GreenYellow","LightBlue","DarkGray","Brown","Sienna","YellowGreen","DarkOrchid","PaleGreen","DarkViolet","MediumPurple","LightGreen","DarkSeaGreen","SaddleBrown","DarkMagenta","DarkRed","BlueViolet","LightSkyBlue","SkyBlue","Gray","Olive","Purple","Maroon","Aquamarine","Chartreuse","LawnGreen","MediumSlateBlue","LightSlateGray","SlateGray","OliveDrab","SlateBlue","DimGray","MediumAquamarine","CornflowerBlue","CadetBlue","DarkOliveGreen","Indigo","MediumTurquoise","DarkSlateBlue","SteelBlue","RoyalBlue","Turquoise","MediumSeaGreen","LimeGreen","DarkSlateGray","SeaGreen","ForestGreen","LightSeaGreen","DodgerBlue","MidnightBlue","Aqua","Cyan","SpringGreen","Lime","MediumSpringGreen","DarkTurquoise","DeepSkyBlue","DarkCyan","Teal","Green","DarkGreen","Blue","MediumBlue","DarkBlue","Navy","Black"];



var css_file = " .SUEditorToolbar { border-bottom: 1px solid #C2E2E2; border-right: 1px solid #C2E2E2; border-top: 1px solid #D7ECF6; border-left: 1px solid #D7ECF6; -moz-border-radius: 5px; min-height: 8px; margin: 0px; } .SUEditorToolbar button { cursor: hand; } .SUEditorToolbar { background: url(http://media.tumblr.com/tumblr_lj1c2zPaV71qa2ko5.png); -moz-background-size: contain; text-align: justify; min-height: 32px; min-width: 300px; width: 99%; display: inline-block; } .SUEditorToolbar optgroup { border: 1px solid black; } .btngroup > * { margin: 0px 3px; } .btngroup { margin: 0px 7px; } #dialogWindow { position: absolute; border-bottom: 1px solid #C2E2E2; border-top: 1px solid #D7ECF6; background: url(http://cdn.stumble-upon.com/i/bg/bgNav.png) repeat-x scroll 0 0 #E0F4F7; /* background:url(http://media.tumblr.com/tumblr_lj1c2zPaV71qa2ko5.png) no-repeat;*/ -moz-background-size: cover; color: rgb(50, 50, 50); } #dialogWindow input[type = text] { background-color: #FFFFFF; border: 1px solid #E1E1E1; border-radius: 10px 10px 10px 10px; padding: 0 5px 0 10px; } #dialogWindow_container { padding: 20px; min-width: 200px; min-height: 200px; } .closebtn { float: right; } #dialogWindow_bottombar > input, #dialogWindow_topbar > input { background: transparent; border: 1px solid black; margin: 2px; } #dialogWindow_bottombar > input { float: right; } #SmileysForm .smileycontainer { width: 200px; } #SmileysForm .smileycontainer > img { float: left; margin: 2px; padding: 2px; border: 1px solid gray; } colormenu { display: inline-block; } .color_menu_handle { width: 10px; height: 10px; border: 1px solid black; display: inline-block; } .color_menu_handle > .color_menu { position: absolute; background: rgba(255, 255, 255, 0.8); width: 50px; margin-left: -50px; } .color_menu_handle:hover > .color_menu { } colormenu > button { vertical-align: middle; background: transparent; -moz-appearance: none; border: 1px solid black; } colormenu > button.sample { } .editor_menu { display: none; } .editor_menu[open = true] { display: block; } .colormenu_menu { position: absolute; } div.btngroup { float: left; border-right: 1px solid rgba(100, 100, 100, 0.5); margin: 5px 0; } .btnGroup { padding-right: 10px; margin: 4px 2px; } .style0b { background-color: rgba(30, 30, 30, 0.4); -moz-box-shadow: 0pt 0pt 2px 1px rgba(30, 30, 30, 0.4); } .style1b { max-width: 100px; background: rgb(30, 30, 30); padding: 10px; text-align: justify; -moz-box-shadow: 0pt 0pt 5px 2px black; border: none; line-height: 0.5em; z-index: +5000; } .ToolbarContainer { display: block; padding: 2px; -moz-box-shadow: 0px 8px 5px black; } iframe.editor-iframe:hover { outline: gray dotted 1px; } div.editor-toolbars { background: gray; border: 1px outset gray; -moz-border-radius: 5px; -moz-box-shadow: 0px 0px 5px 3px gray; } div.visual-toolbars { background: gray; } div.editor-toolbar { border-bottom: 1px double gray; } colormenu:hover .colormenu_menu { display: block; } .colorItem { width: 7px; height: 7px; border: 1px solid transparent; padding: 0px; margin: 1px; } .colorItem:hover { border: 1px solid white; } .charItem { width: 20px; height: 20px; border: 1px solid; color: white; background: transparent; } .ToolbarButton { border: 0px none; padding: 0px; background-color: transparent; } .ToolbarButton:hover, .ToolbarButton:focus { -moz-transition-property: background-color; -moz-transition-duration: 0.2s; -moz-transition-timing-function: ease-out; -webkit-transition-property: background-color; -webkit-transition-duration: 5s; -o-transition-property: background-color; -o-transition-duration: 5s; background-color: yellow; } .ToolbarButton:active { -moz-box-shadow: 0pt 0pt 7px 4px #FFFF99; } .ToolbarButton span.icon, colormenu span.icon { width: 16px; height: 16px; background-repeat: no-repeat; background-position: center center; display: inline-block !important; } .ToolbarButton span.text { display: inline-block !important; vertical-align: top; margin-left: 2px; } colormenu:hover .Menu { display: block; } ";



var css_iframe_file = "body img {max-width:715px;} ol, ul { list-style-image:none; list-style-position:outside; list-style-type:none; } body *[target='true'] { outline: orange dashed 2px; } body { font-size: 12px; line-height: 1.25; } *|*:-moz-any-link img, img[usemap], object[usemap] { border:0px none; } center{ margin: 5px; border:1px solid grey; background:rgba(40,40,40,0.1); } ";



var blockStyle = " body * { outline: gray dotted 1px; padding: 4px; } font , span { margin:2px; border:1px solid white; background: rgba( 255, 180 , 0 , 0.4); display: inline-block; } a { margin:2px; border:1px solid cyan; background: rgba( 0, 0 , 255 , 0.4); display: inline-block; } center, div { padding :5px; margin:5px; border:2px dashed red; background: rgba( 0, 255 , 0 , 0.4); } ul , ol { padding :5px; margin:5px; border:1px dashed green; background: rgba( 0, 200 , 150 , 0.4); } b , u { padding :3px; margin:3px; border:1px dotted blue; background: rgba( 0, 255 , 0 , 0.4); display: inline-block; } ";



var contextmenu = ' <style id="ContextMenuStyle" type="text/css"> div.SUEditor_ContextMenu { background: white; border: 1px solid black; display: inline-block; padding: 6px; color: black; position: absolute; z-index:+1000; } div.SUEditor_ContextMenu li { font-size: 11px; line-height: 14px; cursor: pointer; } div.SUEditor_ContextMenu li:hover { background-color: gray; } div.SUEditor_ContextMenu li._title { color: blue; } </style> <div class="SUEditor_ContextMenu" style="display:none;"> <div class="container"> <ul> <li class="_title"> &lt;tag&gt; </li> <li action="rem"> Remove this... </li> <li action="link"> Add link... </li> <li action="editlink"> Edit this link... </li> <li action="style"> Edit style... </li> <li action="imageSettings"> Image settings... </li> <li action="remshadow"> Remove shadow </li> </div> </div>';





var console = {
    log : function( a ) {
        
        if( window.wrappedJSObject.console )
            window.wrappedJSObject.console.log( arguments );
        else 
             GM_log( '\n' + arguments[0] );        
    }

}



Obj = {

    split : function( ch ) {

          clone1=''
          p = $$( ch ).prevText();
         n = $$( ch ).nextText();

          clone0 = this[0].cloneNode(false);
          clone1 = this[0].cloneNode(false);
          
          $( p ).wrapAll( clone0 );
          $( n ).wrapAll( clone1 );
          
          $( this[0] ).replaceWith( this[0].childNodes );
          
          $( ch ).remove();
          return clone1;
    },
    
    prevText : function() {
             var prev = this[0].previousSibling;
             var array = [];
             
             while( prev ) {
                array.push( prev );
                prev = prev.previousSibling;    
             }
             
             return array.reverse();
    
    },
    nextText : function() {
             var next = this[0].nextSibling;
             var array = [];
             
             while( next ) {
                array.push( next );
                next = next.nextSibling;    
             }
             
             return array;
    
    },
    
    dissolve : function( prop ) {
             this[0].style.removeProperty( prop );
             ( this[0].style.length < 1 ) ? 
             this[0].removeAttribute( 'style' )
             : void(0);
             
             ( this[0].attributes.length < 1 ) ?
             $( this[0] ).replaceWith( this[0].childNodes ) 
             : void(0)
    },
    
    
    prevElement : function( cssprop ) {
       prevSibl = this[0].previousSibling;
       newPrev = false;
       if( prevSibl && prevSibl.nodeType == 3 ) {
           if( trim( prevSibl.textContent ).length < 1 )
               newPrev = $$( $( this[0] ).prev() );
       }
       else if( prevSibl && this[0].previousSibling.style ) {

               newPrev = $$( this[0].previousSibling );
       }
       
       if( newPrev && newPrev.prop( cssprop ).length > 0  )
           return newPrev;
       
       else return false;
                    
    },
    
    nextElement : function( cssprop ) {
       nextSibl = this[0].nextSibling;
       newNext = false;
       if( nextSibl && nextSibl.nodeType == 3 ) {
           if( trim( nextSibl.textContent ).length < 1 )
               newNext= $$( $( this[0] ).next() );
       }
       else if( nextSibl && this[0].nextSibling.style ) {

               newNext = $$( this[0].nextSibling );
       }
       
       if( newNext && newNext.prop( cssprop ).length > 0  )
           return newNext;
       
       else return false;
                    
    },
    
    
    prop : function( name ) {
         return this[0].style.getPropertyValue( name );
    },
    
    shadow : function() {
           return this.prop( 'text-shadow' );
    },
    
    getData : function( name ) {
            var nameList = {};
            var els = this[0].elements;
            
            for( var i=0; i<els.length; i++ ) 
            {
                  var n    = els[i].name;
                  var type = els[i].type;
                  ( n.length < 1 ) ? n = i : false;
                  
                 if( !nameList[ n ] ) 
                 { 
                     if( type == "radio" || 
                         type == "checkbox" ) 
                         {
                         if( els[i].checked )
                            nameList[ n ] = els[i].value;
                         }
                     else nameList[ n ] = els[i].value;   
                 }
            }            
            
            return nameList;           
    },
    
    setData : function( data ) {
            for( var prop in data ) {
                 
            
            }
    
    },
    
    settings : function( data ) {
             if( this[0] && this[0].tagName == 'IMG' ) {
                 $t = $( this[0] );
                 src = data.src || "";
                 $t.attr( 'src' , src );
                 
                 if( data.thumbnail )
                     $t.css( { width: '80px' , height: '80px' });
                 else $t.css( { width: '' , height: '' });
                 
                 if( data.link.length > 0 ) {
                     $p = $t.parent();
                     if( $p.attr( 'tagName' ) == 'A' ) {
                         $p.attr( 'href' , data.link );
                         }
                     else {
                          $a = $( '<a>' );
                          $a.wrap( $t ).attr( 'href' , data.link );
                     }
                 }
                 else {
                      
                 
                 }
                     
         
             
             }
    
    }

}






function $$( str , context ) {
         var obj = $( str, context );
         
         for( var m in Obj )
              ( !obj[m] ) ? obj[m] = Obj[m] : false;
         
         return obj;
         
}







DialogWindow = {
    active : null,
    
    init : function() {
        var tempDiv = document.createElement('div');
        html_widgets=html_widgets.replace( /\[IMAGEFORM\]/ , html_imageform );
        html_widgets=html_widgets.replace( /\[LINKFORM\]/ , html_linkform );
        tempDiv.innerHTML = html_widgets;
        document.body.appendChild( tempDiv );
        $( '#dialogWindow_close' ).bind( 'click' , DialogWindow.cancel);
        
        $( '#dialogWindow_ok' ).bind( 'click' , function(){
             DialogWindow.active.save();
             DialogWindow.close();
        });
        
        $( '#dialogWindow_cancel' ).bind( 'click' , DialogWindow.cancel );
                
        ImageForm.init();
        LinkForm.init();
        StyleForm.init();
        SettingsForm.init();
        SmileysForm.init();

    },
    
    open : function( editor , type , posX , posY , data )  {
    
        if( $('#dialogWindow').length < 1 ) this.init();
    
        $('#dialogWindow').css( { left : posX + 'px' , top: posY + 'px' }).show();
        $('#dialogWindow_container > div').hide();
        
        if( type == 'link' ) {
            LinkForm.open( data , editor );
            this.active  = LinkForm;
            $('#LinkForm_container').show();
        }
        else if( type == 'image' ) {
            ImageForm.open( data , editor );
            this.active  = ImageForm;
            $('#ImageForm_container').show();
        }
        else if( type == 'style' ) {
            StyleForm.open(  editor , data );
            this.active  = StyleForm;
            $('#StyleForm_container').show();
        }
        else if( type == 'settings' ) {
            SettingsForm.open();
            this.active  = SettingsForm;
            $('#SettingsForm_container').show();
        }
        else if( type == 'smileys' ) {
            SmileysForm.open( editor );
            this.active  = SmileysForm;
            $('#SmileysForm').show();
        }
    },
    close : function() {
         $( '#dialogWindow' ).hide();
    },
    cancel : function() {
         DialogWindow.active.cancel()
         DialogWindow.close();
         //$( '#dialogWindow' ).hide();
    }
}





/*******************************/



var ImageForm =
{
   editor : null,
   defaultSRC : 'http://img265.imageshack.us/img265/6496/imagepm.png',

   fcss:{
       'classic' : 'padding:5px;margin:10px;border:1px dotted',
       'shadow'  : 'box-shadow:5px 5px 5px black',
       'cute'    : 'box-shadow:inset 0 0 4px gold',
       'custom'  : function() {
              return storage.getItem('sueditor.imagestyle','');
       }
                  
   },
   pos:{
       'normal' : 'auto',
       'left'  : 'left',
       'right'  : 'right'
                  
   },
   
   //cssBackupStr : 'width,height',
   cssBackup : {},
   
   init : function() {
      this.form =  $('#imageForm');
      $( '#imageForm .src' ).bind( 'change' , this , ImageForm_srcChange );
      this.preview = $( '#imageForm .preview'  );
      this.src =     $( '#imageForm .src'  );
      this.frame =     $( '#imageForm .frame'  );
      this.position =     $( '#imageForm .position'  );
      this.title =     $( '#imageForm .title'  );
      this.alt =     $( '#imageForm .alt'  );
      this.width =     $( '#imageForm .width'  );
      this.height =     $( '#imageForm .height'  );
   },
   
   open : function( image, editor ) {
      this.clear();
      if(!editor) return false;
      this.editor = editor;
		  this.image =  image;
		  
		  //set data
		   if( image ) {
       
          //position 
            //GM_log( image.css( 'float' ) );
            fl = image.css( 'float' );
            this.position.val( this.pos[fl] );
            
          //src
            this.preview.attr('src',image.attr('src') );
            this.src.val( image.attr('src') );
            
          //title,alt
            this.title.val( image.attr('title') );
            this.alt.val( image.attr('alt') );
            
          //backup height width
            GM_log( 'width' + image.css( 'width' ) );
            this.width.val( image.css( 'width' ) );
            this.height.val( image.css( 'height' ) );
            
            this.cssBackup['width'] = image.css( 'width' ) ;
            this.cssBackup['height'] = image.css( 'height' ) ;
            

            $( this.editor.Doc.body )
               .bind('DOMAttrModified.ImageFormEvent',IF_resize);

       }
		  
   },
   
   getDimensions : function( ) {
            var w = this.image.css( 'width' );
            var h  = this.image.css( 'height' );
            this.width.val( w );
            this.height.val( h );
   },
   
   save : function( ) {
      if (!this.image) {
      
		    this.image = this.createImage();
		    this.editor.insertImage( this.image[0] );
	   }
	    //if( this.editor ) {
          $( this.editor.Doc.body )
              .unbind('DOMAttrModified.ImageFormEvent',IF_resize);
      //}
      
      //***props
      //src
      var src = this.src.val();
		   if( src.length < 1 ) src = this.defaultSRC;
		  
		  this.image.attr( 'src' , src );
		  
		  //frame
		  
		  frame = this.frame.val();
        if( this.fcss[frame] )
          this.image.attr( 'style',this.fcss[frame] );
          
      //position
       p = this.position.val();
        if( this.pos[p] )
          this.image.css( 'float' , this.pos[p] );

      //title
        t = this.title.val();
         this.image.attr( 'title' , t );
         
      //alt
        a = this.alt.val();
         this.image.attr( 'alt' , a );
      
      //restore css
          this.image.css( 'width' , this.width.val() );
          this.image.css( 'height' , this.height.val() );
      
      //cleanup 

 
      try {
         l = this.image[0].attributes.length;
         
          var empty = {};
            
       for( var i=0;i<l;i++) {
              attr = this.image[0].attributes[i];
              //GM_log( attr.nodeName );
              if( attr.nodeValue.length < 1 ) 
                    empty[attr.nodeName]='';                      
        }
        for( var y in empty ) {
            //GM_log( 'rem '+ y );
            this.image[0]
                    .attributes
                      .removeNamedItem( y );
            
        }

       }catch(e){GM_log('Cleanup Error \n'+e)}   
         
		   this.clear();
      
   },
   cancel : function() {
       this.clear();
   },
   clear : function(){
       //clear form
      this.form[0].reset();
      this.preview.attr('src',this.defaultSRC);
      this.image = null;
      if( this.editor ) {
          $( this.editor.Doc.body )
              .unbind('DOMAttrModified.ImageFormEvent',IF_resize);
          this.editor = null;
      }
      
   },
    createImage : function() {
       this.image = $( '<img>' );
			return this.image;
    }
   


}


function IF_resize(e){
       
        ImageForm.getDimensions();
} 


function ImageForm_srcChange( e ) 
{
  e.data.preview.attr( 'src', e.target.value );
}










LinkForm =
 
{
   init : function( ) {
        this.form = $( '#LinkForm' );
        
        $.makeArray( $('#LinkForm *[cmd]') ).forEach(
          function(el,inx,array) {              
              this[ el.getAttribute('cmd')] = $( el );
          },this );
       
   },

	open : function( link , editor ) 
	{
	    this.clear();
	    this.editor = editor;
		  this.link = link;
	
	    if( link ) {
	       this.link = $( link );
		     this.URL.val( $( link ).attr('href') );
		     
		     if( $( link ).attr( 'target' ) == "_tab" ) 
                this.newTab.attr('checked',true);
		}

		return this;
		
	},	
	save : function() {
	      if( !this.link ) {
          this.editor.Doc.execCommand('createlink', false, this.URL.val() );
         }
	      if( this.newTab.attr('checked')  )
            $( this.link ).attr( 'target' , '_tab' );
        else
            $( this.link ).removeAttr( 'target' );
	
         this.clear();
  },
  cancel : function() {
     this.clear();
  },
		clear : function() 
	{

		this.form[0].reset();
		this.editor = null;
		this.link = null;

	}
}


SettingsForm  = {

    init: function() {
       this.form = $( '#SettingsForm_container' );
        
        $.makeArray( $('#SettingsForm_container *[cmd]') ).forEach(
          function(el,inx,array) {
                      
              this[ el.getAttribute('cmd')] = $( el );
          },this );
    },
    
    open: function() {
           names = eval( storage.getItem('sueditor.stumblernames',true) );
          if( names ) 
             this.sunames.attr('checked',true);
          else
             this.sunames.attr('checked',false);
             
           //image style
            this.imagestyle.val( storage.getItem('sueditor.imagestyle','') );
            
          //box style
            this.boxstyle.val( storage.getItem('sueditor.boxstyle',
            'border: 1px solid gray; -moz-border-radius: 8px; -moz-box-shadow: 0px 0px 3px 1px gray; padding: 10px; margin: 4px; text-align: justify') );
           
    },
    
    save : function() {
           if( this.sunames.attr('checked',false) ){
              storage.setItem('sueditor.stumblernames',false);
           }
           else {
              storage.setItem('sueditor.stumblernames',true);
           }
           
           //image style
            storage.setItem('sueditor.imagestyle',this.imagestyle.val() );
            
          //box style
            storage.setItem('sueditor.boxstyle',this.boxstyle.val() );
    },
    cancel: function(){
    
    }

}





SmileysForm  = {
    smileysrc: '',
    init: function() {

         
      this.preview = 
      $( '#SmileysForm img[cmd="preview"]' );
      $( '#SmileysForm .smileycontainer > img' )
              .bind('mousedown',this,this.selectSmiley);
          
    },
    
    open: function(editor) {
    
    
    this.editor = editor;

           
    },
    
    save : function() {
  
        img = $('<img>').attr('src',this.smileysrc);
        this.editor.insertImage( img[0] );   
    },
    selectSmiley : function( e ){

      e.data.smileysrc = $( e.target ).attr('src');
      e.data.preview.attr('src' ,  $( e.target ).attr('src') );

    },
    cancel: function(){
        this.editor = null;
    }

}












/*******************************/



StyleForm = {

text : $( '#StyleForm_csstext'),


editor : null,
element : null,
styleBackup : '',

init: function() {
    this.css = $( '#StyleForm_container *[cmd="css"]')
      .bind('change',this,this.handleEvt);
},

open : function( editor , elem ) {
  this.editor = editor;
  this.element = $( elem );
  this.element.attr('target',true);
      
      this.css.val( this.element.attr('style') );
  var style = this.element.attr('style') || '';
  var css = this.cleanCSS(  style );
  this.styleBackup = css;
  this.css.val( css );  
},

cleanCSS : function( css ) {
      css = css.replace('-moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;','');
      css = css.replace(' none repeat scroll 0% 0%','');
    return css;
},

close : function() {
    this.element.removeAttr('target');

},
cancel : function() {
    this.close();

},

handleEvt : function( e ) {
  _this = e.data;
  _this.element.attr( 'style' , _this.text.val() );
},

save : function(  ) {
    
    this.element.attr( 'style' , this.css.val() );
    if( this.element[0].style.length < 1 )  
          this.element.removeAttr( 'style' );
    this.close();

    },
handleCanc : function( e ) {
    _this = e.data;
    _this.element.attr( 'style' , _this.styleBackup );
    _this.close();

}


}



/*******************************/


function ColorMenuButton(elem){
    this.button = $('<button type="button"><span class="icon" icon="' +
    $(elem).attr('command') +
    '" /></span></button>').attr('command', $(elem).attr('command'));
    
    
    this.base = $(elem);
    this.base.append(this.button);
    this.button.bind('contextmenu', this, this.handleBtnMenu);
    
    this.menu = $('<div class="colormenu_menu editor_menu" />').appendTo(this.base);
    
    this.itemContainer = $('<div class="container style1b" />').appendTo(this.menu).bind('click', this, this.handleClick);
    
    this.hidden = $('<input type="hidden" value="" />').appendTo(this.itemContainer).attr('command', 'test');
    
    for (var i = 0; i < web_named_colors.length; i++) {
        this.add(web_named_colors[i]);
    }
    
    this.itemContainer.append('<div style="clear:both;margin-top: 10px;" />');
    
    var gray = 0;
    while (gray < 255) {
        this.add('rgb(' + gray + ',' + gray + ',' + gray + ')');
        gray += 10;
    }
    
    
    this.itemContainer.append('<div style="clear:both;margin-top: 10px;" />');
    
}

ColorMenuButton.prototype = {

    appendTo: function(parent){
        this.base.appendTo(parent);
    },
    replace: function(elem){
        this.base.replace(elem);
    },
    
    
    add: function(color){
        var i = $('<button class="colorItem" />');
        i[0].type = 'button';
        i[0].title = color;
        i[0].value = color;
        i[0].style.backgroundColor = color;
        this.itemContainer.append(i);
        if (this.value == "") 
            this.value = color;
    },
    
    
    
    handleClick: function(e){
        _this = e.data;
        if (e.target.className == "colorItem") {
            var val = $(e.target).val();
            _this.button.css('border-color', val);
            
            _this.button.val(val);
            _this.button.click();
            
            
            
        }
    },
    
    handleBtnClick: function(e){
    
        e.data.menu.hide();
    },
    
    handleBtnMenu: function(e){
        e.originalEvent.preventDefault();
        
    },
    
    
    
    bind: function(type, data, fn){
    
        this.button.bind(type, data, fn);
        return this;
    }
}




/*******************************/





var styleWindow;
var style1 = '.style1{-moz-border-radius:5px;background:rgba(255,255,255,0.7);}';
var style2 = '.style2{padding:5px;font-family:Tahoma,sans-serif;font-size:9px;margin:5px;background:white;min-width:80px;min-height:80px;-moz-border-radius:5px;border:1px outset;}';
GM_addStyle(style1 + style2);

GM_addStyle('div.abs{position:absolute;z-index:+1000;}div.context-menu h3{font-style:italic;border-bottom: 1px dotted;}div.context-menu li{margin: 4px 0px;padding:2px 6px;cursor:pointer;}div.context-menu li:hover{background:gray;color:white;}div.abs textarea{background:#1A1A1A;font-family:Courier New, monospace; text-shadow: 0px 0px 5px lime;color:lime;min-width:150px;min-height:200px;border:2px inset white;}')


$(document.body).bind('mousedown', function(e){
    t = $(e.target)
    if (t.parents('.SUEditor_ContextMenu').length < 1) 
        $('.SUEditor_ContextMenu').hide();
    
});











function ContextMenu(){

    this.editor = null;
    this.element = null;
    this.x = 0;
    this.y = 0;
    
    this.base = $('div.SUEditor_ContextMenu');
    this.labelTag = this.base.find('li._title');
    this.base.find('ul').bind('click', this, this.handleClick);
    
    
    this.li = new Object();
    lis = this.base.find('li');
    
    for (var i = 0; i < lis.length; i++) {
        c = $(lis[i]).attr('action');
        this.li[c] = $(lis[i]);
    }
    
}




ContextMenu.prototype = {

    tags: {
        'null': [],
        'A': ['editlink'],
        'IMG': ['imageSettings']
    },
    
    show: function(editor, elem, x, y){
    
        this.editor = editor;
        this.element = $(elem);
        
        
        xy = findPos(this.editor.Iframe[0]);
        this.x = x + xy[0];
        this.y = y + xy[1];
        this.base.find('li').show();
        this.base.css({
            left: this.x + 'px',
            top: this.y + 'px'
        }).show();
        
        
        
        this.labelTag.html('&lt;' + this.element[0].tagName + '&gt;').show();
        
        
        
        
        
        
        
        this.showItems();
        
    },
    
    
    showItems: function(){
        tag = this.element.attr('tagName');
        this.isBody = (tag == 'BODY' || tag == 'HTML');
        if (tag != 'IMG') 
            this.li.imageSettings.hide();
        
        this.li.editlink.hide();
        this.li.remshadow.hide();
        
        if (this.isBody) {
            this.li.rem.hide();
            this.li.style.hide();
        }
        
        if (tag == 'A') {
            this.link = this.element;
            this.li.editlink.show();
            this.li.link.hide();
        }
        else 
            if (this.element.parent().attr('tagName') == 'A') {
                this.link = this.element.parent();
                this.li.editlink.show();
                this.li.link.hide();
            }
        
        if (this.editor.getRange().collapsed) {
            this.li.link.hide();
        }
        
        if (this.element[0].style.getPropertyValue('text-shadow').length > 0) 
            this.li.remshadow.show();
        
        
        
    },
    
    
    handleClick: function(e){
        _this = e.data;
        t = $(e.target).attr('action');
        
        if (_this.actions[t]) 
            _this.actions[t].apply(_this, []);
        
        
    },
    
    actions: {
        style: function(){
        
            DialogWindow.open(this, 'style', this.x, this.y, this.element);
            this.base.hide();
        },
        link: function(){
            xy = findPos(this.li.link[0]);
            
            
            DialogWindow.open(this.editor, 'link', xy[0] - 50, xy[1], null);
            
            this.base.hide();
        },
        editlink: function(){
            xy = findPos(this.li.editlink[0]);
            link = (this.link) ? this.link : this.element;
            
            DialogWindow.open(this.editor, 'link', xy[0] - 50, xy[1], link);
            this.base.hide();
        },
        rem: function(){
            if (!this.isBody) {
                this.element.replaceWith(this.element.html());
                this.element = null;
            }
            this.base.hide();
        },
        remshadow: function(){
        
            this.element[0].style.removeProperty('text-shadow');
            if (this.element[0].style.length < 1) 
                this.element.removeAttr('style');
            if (this.element[0].attributes.length < 1) 
                this.element.replaceWith(this.element[0].childNodes);
            this.element = null;
            this.base.hide();
        },
        imageSettings: function(){
        
            DialogWindow.open(this.editor, 'image', this.x, this.y, this.element);
            
            this.base.hide();
            
        }
        
    }
}


ContextMenu.prototype.editlink = {};

ContextMenu.prototype.editlink.check = function(){
    if (this.element.attr('tagName') == 'A') {
        this.link = this.element;
        return true;
    }
    else 
        if (this.element.parent().attr('tagName') == 'A') {
            this.link = this.element.parent();
            return true;
        }
        else 
            return false;
    
}

ContextMenu.prototype.editlink.action = function(){

    xy = findPos(this.base);
    link = (this.link) ? this.link : this.element;
    LinkForm.setPosition(xy[0] - 50, xy[1]).open(link, this.editor);
    this.base.hide();
    
}

ContextMenu.prototype.link = {};

ContextMenu.prototype.link.check = function(){

    return (!this.editlink.check.apply(this) && !this.editor.getRange().collapsed)
    
}
ContextMenu.prototype.link.action = function(){


    xy = findPos(this.li['link'][0]);
    LinkForm.setPosition(xy[0] - 50, xy[1]).open(null, this.editor);
    
    this.base.hide();
    
}




function findPos(el){
    var x = 0, y = 0;
    while (el) {
        x += el.offsetLeft;
        y += el.offsetTop;
        el = el.offsetParent;
    }
    return [x, y];
}


/*******************************/





function trim( str ) {
        return str.replace(/^\s+|\s+$/g,"");
}

function startDistance( range ) {
         anc= range.commonAncestorContainer;
         Start = range.startContainer;
         var c =0;
         
         while( Start != anc ) {
                c++;
                Start = Start.parentNode;
         }
         
         return c;
}
function endDistance( range ) {
         anc= range.commonAncestorContainer;
         end = range.endContainer;
         var c =0;
         
         while( end != anc ) {
                c++;
                end = end.parentNode;
         }
         
         return c;
}

function extRange( range ) {
         for( var i in Range )
              range[i] = Range[i];
         return range;
}

Range = {
       bookmarks :{},
      bookmark : function() {
               bm = {};
               bm.sc = this.startContainer;
               bm.so = this.startOffset;
               bm.ec = this.endContainer;
               bm.eo = this.endOffset;
               bm.anc = this.commonAncestorContainer;
               this.bm = bm;
               return bm;
      },
      namedBookmark : function( name ) {
              bm={};
              bm.sc = this.startContainer;
               bm.so = this.startOffset;
               bm.ec = this.endContainer;
               bm.eo = this.endOffset;
               bm.anc = this.commonAncestorContainer;
               this.bookmarks[name] =bm;
               return bm;
      },
      getBookmark :function(name) {
          return this.bookmarks[name];
      },
      restore : function( bm ) {
              this.setStart( bm.sc , bm.so );
              this.setEnd( bm.ec , bm.eo );
      },
      anchorStart : function() {
      
      },
      se : function() {
         if( this.startContainer.nodeType == 3)
             return this.startContainer.parentNode;
         else return this.startContainer;
      },
      ee : function() {
         if( this.endContainer.nodeType == 3)
             return this.endContainer.parentNode;
         else return this.endContainer;
      },
      ae : function( bool ) {
         _ae = null;
         
         if( this.commonAncestorContainer.nodeType == 3)
             _ae = this.commonAncestorContainer.parentNode;
         else _ae = this.commonAncestorContainer;
         
         
         return _ae;
         
      },
      isEmpty : function() {
              if( this.toString().length < 1 )
                  return true;
              else 
                   return false;
       },
       isFlat : function() {
              return ( this.startContainer == this.commonAncestorContainer 
                  && this.endContainer == this.commonAncestorContainer )
       },
       
       surround : function( html ) {
                if( this.startContainer.nodeName == 'BODY' ||
                 this.startContainer.nodeName == 'HTML' ) {
                 return null;
                 }
                else {
                var node = $( html )[0];
                this.surroundContents( node );
                return node;
                }
       }

}

function DOMApplyCommand( style ) {
      var style = style;

      var range = this.Iframe[0].contentWindow.getSelection().getRangeAt( 0 );

      if( range.collapsed ) return false;
      
      //GM_log( style )
      
      
      sd = startDistance( range );
      ////console.log( sd );
      range = extRange( range );
      bm = range.bookmark();
      
      startNodes = [];
      
      for( var i=0; i<sd; i++) {
           
           b = range.bookmark();
           //logRange( range , 'before' );
           range.selectNodeContents( b.sc );
           range.setStart( b.sc , b.so );

           startNodes.push( [range.startContainer , range.startOffset] );
           //logRange( range , 'after' );
           range.setEnd( bm.ec , bm.eo );
           if( range.startContainer == bm.ac ) break;

           range.setStartAfter( b.sc );                  
      }	
      
      ed = endDistance( range );
      endNodes = [];
      
      for( var i=0; i<ed; i++) {
           
           b = range.bookmark();

           range.selectNodeContents( b.ec );
           range.setEnd( b.ec , b.eo );

           endNodes.push( [range.endContainer , range.endOffset] );

           range.setStart( bm.sc , bm.so );
           if( range.endContainer == bm.ac ) break;
 
           range.setEndBefore( b.ec );                  
      }	
      
      stylenodes = [];
      
      if( range.isFlat() && !range.isEmpty() ) {
 
           stylenodes.push( range.surround( style ) );     
      }
      
      startNodes.reverse();
      
      for( var i=0; i<startNodes.length; i++) {
           s = startNodes[i];
           range.selectNodeContents( s[0] );
           range.setStart( s[0] , s[1] );
           if( !range.isEmpty() ) 
               stylenodes.push( range.surround( style ) );

      }
      
      endNodes.reverse();
      
      for( var i=0; i<endNodes.length; i++) {
           e = endNodes[i];
           range.selectNodeContents( e[0] );
           range.setEnd( e[0] , e[1] );
           if( !range.isEmpty() )
               stylenodes.push( range.surround( style ) );

      }
      
      this.Doc.body.normalize();

      for( var i=0; i<stylenodes.length; i++) {
           cleanup( stylenodes[i] );
      }
      
      
}


function cleanup( node ) {
 
         var shadow = node.style.getPropertyValue( 'text-shadow' );
         body = node.ownerDocument.body;

         
         //child check
         ch = node.children;
         
         destroy = [];
         
         for( var i=0; i<ch.length; i++ ) {
              child = $$( ch[i] );
              if( child.shadow().length > 0 ) destroy.push( child );       
         }
         
         destroy.forEach( function( el, i, a) {
                          el.dissolve( 'text-shadow' );
         });
         
         
          //parent check
         parent = $$( node.parentNode );
         parent_shadow = parent.shadow();
        if( parent_shadow.length > 0 ) {
            
            if( parent_shadow != shadow ) 
                parent.split( node );
            
            else $$( node ).dissolve( 'text-shadow' );
        }
         
         //sibling
         
         dissolve =[];
         
         prev = node.previousSibling;
         if( prev && prev.nodeType != 3 ) {

             prev = $$( prev );
             if( prev.shadow() == shadow ) {
                 $( [prev[0] , node ] ).wrapAll( node.cloneNode( false ) );
                 prev.dissolve( 'text-shadow' ); 
                 //$$( node ).dissolve( 'text-shadow' );
                 dissolve.push( node );
             }
         
         }
         

         
         next = node.nextSibling;
         if( next && next.nodeType != 3 ) {

             next = $$( next );
             if( next.shadow() == shadow ) {
                 $( [ node , next[0] ] ).wrapAll( node.cloneNode( false ) );
                 next.dissolve( 'text-shadow' ); 
                 //$$( node ).dissolve( 'text-shadow' );
                 dissolve.push( node );
             }
         
         }
             body.normalize();  
          dissolve.forEach( function( el , i ,a ) {
                            $$( el ).dissolve('text-shadow');
          });    
               body.normalize();     
           
}



function insertImage( newImage ) {

         r = this.range();
         r.collapse( false );
   
         r.insertNode( newImage );      
         return newImage;
         
}






/*******************************/



function split( node , offset ) {
//GM_log( node)

       doc  = node.ownerDocument;
     range = node.ownerDocument.createRange();
     //GM_log( 'eee')
      
      
    
     
      //GM_log( node)
      clone = null;
      clone2 =null;
      
      parent  =   node.parentNode;
       //logRange( range )
      if( parent.tagName!='BODY' &&  node.tagName!='BODY' ) {
              range.setStart( node,offset);
     range.setEnd( node,offset);
     span = node.ownerDocument.createElement('span');
     range.collapse( true );
     range.insertNode( span );
     

     range.selectNodeContents( node  );
     range.setEndBefore( span );
    
            if( !range.collapsed ) {
            
           
             clone = parent.cloneNode( false );
             range.surroundContents( clone );
           } 
           
            
           
           
           
           
           range2 = node.ownerDocument.createRange();
           range2.selectNodeContents( parent );
           range2.setStartAfter( span );
           
          
           if( !range2.collapsed ) {
            clone2 = parent.cloneNode( false );
            range2.surroundContents( clone2 );
           }  
           

           $( span ).unwrap().remove();
           doc.normalize();
           
     }
     else {
        clone2 = node;
     }
     
    return  clone2;  
     
}

/*******************************/

                  
                  
                  
                  var Editor = function( params ) {
                  
this.InstanceName = 'noname';
this.controls = new Array();
if(params) {
  this.params = params;
  this.Textarea = params.textarea;
  this.Button   = params.button;
  
  this.InstanceName = this.Textarea[0].id;
  }
this.Buttons = {};
this.visual = true;
this.currentToolbar = 0;

/*this.openWindows = 
{
   imageForm : null,
   linkForm : null,
   contextMenu : null,
   styleWindow : null
}*/
  
}


Editor.prototype.$ = 

function Editor_$( str ) {
         return $( str , this.EditorBox );
}



Editor.prototype.find = function( className ){
    return this.EditorBox.find('.' + className );
}




Editor.prototype.basicCommand = function( com , val ) {
   try {
       this.Doc.execCommand( com , false , val );
   }
   catch( e ) {
          GM_log( e );
   }
}


Editor.prototype.getRange = 
function Editor_getRange() {
         var sel = this.Iframe[0].contentWindow.getSelection();
         var range = sel.getRangeAt( 0 );
         range = extRange( range );
         return range;
}

Editor.prototype.getSelection = 
function Editor_getSelection() {
         var sel = this.Iframe[0].contentWindow.getSelection();
         //var range = sel.getRangeAt( 0 );
         //range = extRange( range );
         return sel;
}

//Editor.prototype.cmd_testCommand = Editor_cmd_testCommand;



Editor.prototype.handleEvt = 
function Editor_handleEvt( e ) {

         var fn = $( e.target ).attr('fn');
         var _this = e.data;
         
         if( HandleEvt[fn] ) 
             HandleEvt[fn].apply( _this , [] );
         
}


var HandleEvt = {

    'Preview' : function( ) {
              this.submitToTextarea();
	      
              this.preview( this.Textarea.val().br() );
    
    }

}











Editor.prototype.DOMApplyCommand = DOMApplyCommand;
//Editor.prototype.DOMApplyCommandTest = DOMApplyCommandTest;

Editor.prototype.Command = function( name , value ){
                       
                         if( !this.busy && value.length > 0 ) {
                             this.busy = true;
                             try {
                                 editorCommands[name].apply( this , [value] );
                             } catch( e ) { 
                               GM_log( '\nERROR ' + name + '  ' + value 
                               + '\n' + e.toString() );
                               };
                             this.busy = false;
                         }
}

var editorCommands = {
    'textshadow' : function( value ) {
       this.DOMApplyCommand( '<font style="text-shadow: 1px 2px 2px '+ value +';" />' );
    },
    'center'  : function() {
      //alert( 'editorCommands')
       this.DOMApplyCommandTest( '<center />');
    }

}

Editor.prototype.toggleBlockStyle = function(){

   ( this.blockStyle.attr('disabled') ) ? this.blockStyle.attr('disabled', false )
   :this.blockStyle.attr('disabled', true );
   
}


Editor.prototype.toggleView = function(){
	if (this.visual === true) {
		this.Iframe.hide();
		//imageForm.close();
		DialogWindow.close();
		this.setSource();

		this.EditorBox.find('div.visual').hide();
		this.EditorBox.find('div.source').show();
		//this.find('source-toolbars').show();

		this.Textarea.show();
		this.visual = false;
	}
	else {
		this.Iframe.show();
		this.setHTML();

    this.EditorBox.find('div.visual').show();
    this.EditorBox.find('div.source').hide();
		//this.find('source-toolbars').hide();
		
		this.Textarea.hide();
		this.visual = true;
	}
}







Editor.prototype.setSource =

function Editor_setSource(){

  var html = this.Doc.body.innerHTML;
  if( html == '<br>' ) html = ''; 
  html = html.replace( /\<br\>/g , '\n' );
  this.Textarea.attr('value', html); 

  adjustSrc( this.Textarea );
}

Editor.prototype.setHTML =

function Editor_setHTML() {
  //source = this.Textarea.attr('value').br() ;

  //_source = source.replace( /\n/g , '<br />');

  this.Doc.body.innerHTML = this.Textarea.attr('value').br();

}

//***********


String.prototype.br = function() {
                    var newstr = this.replace( /\n/g , '<br />' );
                    return newstr;
}
String.prototype.unbr = function() {
                    var newstr = this.replace( /\<br\>/g , '\n' );
                    return newstr;
}

//*****************


Editor.prototype.preview =

function Editor_preview( source ) {
    var mode = this.checkMode();

    switch( mode ) {
    case 'add_new_blog' :

         if( !$( '#addContent-preview' )[0] ) {
             $('#addContent').after('<li class="listLi blog"><div class="text"><h4><a href="">Preview</a></h4><p class="showReview">Created <span class="timestamp"><a href="">00:00am</a></span><span class="separator">.</span></p><div id="addContent-preview" class="review">[REVIEW]</div></div></li>');     
         }
         $( '#addContent-preview' ).html( source );
   break;
   
   case 'edit_blog' : 
        this.EditorBox.parents('div.text').find('div.review').html( source );
        //var xy = findPos( this.EditorBox.parents('div.text')[0] );
        //window.scroll( xy[0] , xy[1] );
        break;
        
   case 'contact' :
        if( !$( '#contact-preview' )[0] ) {
             $('ul#msgListContainer').prepend('<li class="listLi" id="contact-preview" ><div class="text"><p><a href="#" class="username">Preview</a>: <span class="message" >[PREVIEW]</span></p><ul class=""><li class="right last"><p class="date">00:00am</p></li></ul></div><span class="img"><a href=""><img  width="64" title="Preview" alt="preview" src="http://cdn.stumble-upon.net/images/nopic2_60x60.jpg"/></a></span></li>');     
         }
         $( '#contact-preview' ).find('span.message').html( source );

         $( '#contact-preview' ).find('a.username').text( usrname() );
         $( '#contact-preview' ).find('span.img img').attr('src' , usrpic());
   break;
   case 'forum':
        ch = $('form[action="#end"]').prev('table').children('tbody')[0].lastChild.previousSibling;

        if( !$( '#forum-preview' )[0] ) {
        $( ch )
        .after('<tr><td colspan="3"><hr style="margin-bottom: 0px;" class="bg"/></td></tr><tr id="forum-preview"><td valign="top" align="center" class="lightbg pdgTopSm pdgBottomSm"><img class="usrid" hspace="8" border="0" src=""/><br/><span class="mini"></span></td><td width="100%" valign="top" style="vertical-align: top;" class="lightbg pdgBottomSm"><table width="100%" cellspacing="0" cellpadding="2"><tbody><tr><td><a name="end"/><a class="usrname" href="#" target="_top">[USERNAME]</a></td><td align="right" style="text-align: right;"><span class="date"><b>00:00</b></span></td></tr><tr><td colspan="2" class="post-content">[POSTEXT]</td></tr></tbody></table><br/><br style="font-size: 4px;"/></td></tr>');
 }
 $( '#forum-preview' ).find('.post-content').html( source );
 $( '#forum-preview' ).find('.usrname').text( usrname() );
 $( '#forum-preview' ).find('.usrid').attr( 'src' , usrpic() );
   break;
   }
         return source;
}

function usrname(){
return $('a[href="/favorites/"]')[0].textContent.match( /Hi\s(.+)/ )[1];
}
function usrid(){
var id =  $('input[name="auth_user"]').val();
if( !id ) id = document.body.innerHTML.match(/\&uid\=(\d+)/)[1];
return id;
}
function usrpic(){
var id = usrid();
var str = '';
( id ) ? str = 'http://cdn.stumble-upon.com/superminipics/' + id + '.jpg'
: str = 'http://cdn.stumble-upon.net/images/nopic2_60x60.jpg';
return str;
}



Editor.prototype.checkMode =

function Editor_checkMode() {
         if( this.EditorBox.parents( '#addContent' ).length > 0 )
             return 'add_new_blog';
         else if( this.EditorBox.parents( 'div.editReview' ).length > 0 )
              return 'edit_blog';
         if( $('#msgContent')[0] )
             return 'contact';
         if( $('#posttext')[0] )
             return 'forum';
}

Editor.prototype.cmd_createbox = 

function Editor_cmd_createbox ( value ) {
    css = 
    
    /*"border: 1px solid gray; -moz-border-radius: 8px; -moz-box-shadow: 0px 0px 3px 1px gray; padding: 10px; margin: 4px; text-align: justify;" */
    storage.getItem('sueditor.boxstyle',
            'border: 1px solid gray; -moz-border-radius: 8px; -moz-box-shadow: 0px 0px 3px 1px gray; padding: 10px; margin: 4px; text-align: justify');
    
    var ul = this.Doc.createElement( 'div' );
    ul.className = "_box"
    ul.setAttribute('style' , css );

    if(  this.Doc.body.firstChild.className != '_box' ) 
      $( this.Doc.body ).wrapInner(ul);
  
}


Editor.prototype.normalize = function() {
	this.Doc.body.normalize();
	return this;
}

Editor.prototype.range = function() {
var range = this.Iframe[0].contentWindow.getSelection().getRangeAt( 0 );
return extRange( range );

}

Editor.prototype.insertImage = insertImage;

/*******************************/


Editor.prototype.submitToTextarea = function() {
	
	    
    if( this.visual == true )
        this.setSource();
     
     pr = processHTML( this.Textarea.attr('value') ); 

     pr = pr.replace( /\<br\>/ , '\n' );

      
     this.Textarea.attr('value',pr);
     storage.setItem('SUE_emergencySave',pr)  ;
	
}

Editor.prototype.prepareSend = function( processor , nosubmit ) {

    
    if( this.visual == true )
        this.setSource();
     
     pr = processHTML( this.Textarea.attr('value') ); 

     pr = pr.replace( /\<br\>/ , '\n' );

	if( processor ) pr = processor( pr );
      
     this.Textarea.attr('value',pr);
	 ////console.log( 'prepareSend')
     storage.setItem('SUE_emergencySave',pr)  ;
	 
	 if( !nosubmit )
	 this.send();
	    
}

Editor.prototype.send = function(){

		this.Button.click();

}


unsafeWindow.Editor_ButtonSend = function( editor ) {

	editor.prepareSend( null ,false );
}


Editor.prototype.createEditorBase = 

function Editor_createEditorBase() {

if( !contextMenu ) contextMenu = new ContextMenu();



    textarea = this.Textarea;
    button   = this.Button;
    before = textarea;
	this.form = this.Textarea[0].form;
    
    if( mode === "blog") {
        $('#submit_buttom')[0].type = "button";
        window.wrappedJSObject._post_blog_entry 
          = window.wrappedJSObject.post_blog_entry;
          oThis = this;
        window.wrappedJSObject.post_blog_entry = 
        function() {

		  unsafeWindow.Editor_ButtonSend( oThis );
        }
       }
    
    else {

  
  this.FalseButton = 
 
  $( '<input  type="button" />'  )
      .val( button.val() + button.text() )

      .addClass( 'btnGreen' )

      .bind('click',this,function(e) {

	  	  unsafeWindow.Editor_ButtonSend( e.data );

		  

      })
      .insertBefore( button );
      
      button.hide();
 

      
    
    }




        html_editor = html_editor
           .replace( /\<button/g , '<button type="button"');


        this.EditorBox = $( html_editor ).insertBefore( textarea.hide() );
                  
        

       this.bottomBox = $( '<div class="editor-bottom-buttons" />')
                      .insertAfter( textarea );
                      
       this.previewBtn = $('<input type="button" fn="Preview" class="btnWhite" value="Preview > " />').appendTo( this.bottomBox ).bind( 'click' , this , this.handleEvt );



    this.Iframe    = this.find('editor-iframe' );
    
    
    

    var d = storage.getItem( 'SUE_secondToolbar'  );
    
    //this.find( 'v1').css( 'display' , d )

    

    
    this.Iframe.bind( 'load', this, Editor_handleIframeLoad )
          //.attr('src','about:blank')
          .attr('src','about:blank')
          .css({width:'100%'}).show()
          .adjust = function () {
            this[0].style.width = this[0].parentNode.clientWidth - 5 + 'px';

            if( this[0].contentDocument.body.scrollHeight > 150 ) {
              this[0].style.height = 
                this[0].contentDocument.body.offsetHeight+'px';
                this[0].style.height = 
                this[0].contentDocument.body.scrollHeight+'px';
              }
            else 
              this[0].style.height = '150px';
      } 
      
  this.populate();

}




/*******************************/

 
 Editor.prototype.handleToolbar = 
function Editor_handleToolbar( e ) {
  


	var t = $( e.target );
	var className = t.attr( 'className' );
	var command = t.attr( 'command' );
	var value = t.val();
	var type = e.type;
	var _this = e.data;

	
	var noCSS = ['bold','italic','underline'];
	
	
	if( type == 'click' ) {
		
		if( handleToolbar[command] ) {
			handleToolbar[command].apply( _this , [value , e.target ] );
		}
		else {
			( noCSS.indexOf( command ) > -1 ) ? _this.Doc.execCommand( 'styleWithCSS' , false , false ) :
																		_this.Doc.execCommand( 'styleWithCSS' , false , true );
    			_this.Doc.execCommand( command , false , value );
		}


	}
	
	else if( type == "change" ) {
    if( handleToolbar[command] ) 
			handleToolbar[command].apply( _this , [ value, e.target ] );
		
		else 
		_this.Doc.execCommand( command , false , value );	
	}
	
}



var handleToolbar = {
   'forecolor' : function( value ) {
      this.Doc.execCommand( 'forecolor' , false , value );
   },
   'fontsize' : function( value ) {
                 
      this.Doc.execCommand( 'fontsize' , false , value );
   },
   'justifycenter' : function( ){
        
         //this.Command( 'center' , 'test' );
		 this.Doc.execCommand( 'justifycenter' , false , null );
   },
 	'createlink' : function( value , target ) {

				xy = findPos( target );
				
	
        DialogWindow.open( this , 'link' , xy[0]-150 , xy[1] , null );
	   },
	   
	   'insertimage' : function( value, target ) {

				xy = findPos( target );
				DialogWindow.open( this , 'image' , xy[0]-150 , xy[1] , null );

				
		},
		
		'inserthtml'  : function() {
		data = prompt('Enter HTML code \n' +
				'( e.g. "<font color="red">Some text</font>" ) ');
				if (data && data != "") 
					this.Doc.execCommand('inserthtml', false, data);
		},
		
	   'morebuttons' : function() {

			this.find('v1').toggle();
			var display = this.find('v1')[0].style.display;
			storage.setItem( 'SUE_secondToolbar' , display );
		},
		
		'source'  : function() {
			this.toggleView();
		},
		
		'visualmode' : function() {
			this.toggleView();
		},
		
		'spellcheck'  : function() {
			sp = this.Doc.body.spellcheck;
			( sp ) ? sp = false : sp = true;
			this.Doc.body.spellcheck =  sp ;
			storage.setItem('SUE_spellcheck', sp);
		},
		
		'createbox' : function() {
			this.cmd_createbox();
		},
		
		 'restore' :function() {
		  var conf = confirm('Do you really want to restore last text ?\n This one will be replaced !');
		  if( conf )
			    $( this.Doc.body ).html( storage.getItem('SUE_emergencySave') );
		},
		
		'textshadow' : function( value ) {
		     //this.cmd_testCommand();
		     this.Command( 'textshadow' , value );
		},
		
		'blockstyle' : function() {
		     this.toggleBlockStyle();
		},
		'settings' : function(value,target) {
		     
		     xy = findPos( target );
		    DialogWindow.open( this , 'settings' , xy[0]-150 , xy[1] , null );
		},
		'smileys' : function(value,target) {
		    
		     xy = findPos( target );
		    DialogWindow.open( this , 'smileys' , xy[0]-150 , xy[1] , null );
		}
	
	
}

/*******************************/

 
 
 
Editor_handleIframeLoad = function( e ) {
  e.data.iframeReady();
}

Editor.prototype.iframeReady = function Editor_iframeReady() {

    this.Textarea.hide();


    this.Doc = this.Iframe[0].contentDocument;

    var spellcheck = storage.getItem( 'SUE_spellcheck' );
    eval( 'spellcheck=' + spellcheck );

	this.Doc.body.spellcheck = spellcheck;

    //comp_style = getStyle( document.body );
    
    var comp_style;
    var wrapper = $( '#wrapperContent' )[0];
    ( wrapper ) ? comp_style = getStyle( wrapper )
    : comp_style = getStyle( document.body );
    
    //var font_size = comp_style.fontSize;
    var text_color = comp_style.color;

    var background = comp_style.backgroundColor;
    var font_family = comp_style.fontFamily;

    
    this.DocStylesheet  
    = $("<style class='IframeStylesheet' type='text/css' />" )
    .appendTo( $( 'head' , this.Doc  )  );
    
    

      
    
    
    doc_style_css = 
    "body{background:transparent" + 
    "; color:"           + text_color  +
    "; font-family: "    + font_family +
   // "; font-size:"       + font_size   + ";}";
    //"; font-size: 12px;}";
	"; }"

    var textlinks = document.getElementsByClassName('textlink');
    var a;
    for( var i=0;i<textlinks.length; i++) {
      ch = textlinks[i].firstChild
      if( ch && ch.nodeName == 'A' ) {
        a = ch;
        break
        }
      
    }
    
    /*if( a ) {
      var link_color = getStyle( a ).color;
      doc_style_css+="a{color:" + link_color + " !important;}"; 
      doc_style_css+="a{text-decoration: none!important;}";
    }
    else {
      var link_color = getStyle( document.getElementsByTagName('a')[0] ).color;
      doc_style_css+="a{color:" + link_color + " !important;}"; 
      doc_style_css+="a{text-decoration: none!important;}";
    }  */

    
    this.DocStylesheet.html( css_iframe_file + '' + doc_style_css );
	
    
	
	this.blockStyle = $( '<style id="blockStyle" type="text/css" />')
		.appendTo( $( this.Doc ).find('head') )
		.text( blockStyle ).attr('disabled',true);

    this.setHTML();
    
    
    this.Doc.designMode = 'on';
    $( this.Doc ).bind('mousedown',this,function( e ) {
      e.data.Iframe.adjust();
      $('div.SUEditor_ContextMenu').hide();
      
      for( var i=0;i<e.data.controls.length; i++ ) {
        e.data.controls[i].setNode( e.target );
      }
      
      
    });
    $( this.Doc ).bind('keyup',this,function( e ) {
      e.data.Iframe.adjust();
    });  

    $( this.Doc ).bind('contextmenu',this,function( e ) {
         ////console.log( e.ctrlKey )
      var t = e.target;
      //if( t.tagName != "BODY" && t.tagName != "HTML" ) {
      if( t.tagName != "HTML" && !e.ctrlKey ) {
          e.originalEvent.preventDefault();
          
          contextMenu.show( e.data , t , e.clientX , e.clientY );
      }
    }); 
}

/*******************************/

 
 Editor.prototype.handleToolbar = 
function Editor_handleToolbar( e ) {
  


	var t = $( e.target );
	var className = t.attr( 'className' );
	var command = t.attr( 'command' );
	var value = t.val();
	var type = e.type;
	var _this = e.data;

	
	var noCSS = ['bold','italic','underline'];
	
	
	if( type == 'click' ) {
		
		if( handleToolbar[command] ) {
			handleToolbar[command].apply( _this , [value , e.target ] );
		}
		else {
			( noCSS.indexOf( command ) > -1 ) ? _this.Doc.execCommand( 'styleWithCSS' , false , false ) :
																		_this.Doc.execCommand( 'styleWithCSS' , false , true );
    			_this.Doc.execCommand( command , false , value );
		}


	}
	
	else if( type == "change" ) {
    if( handleToolbar[command] ) 
			handleToolbar[command].apply( _this , [ value, e.target ] );
		
		else 
		_this.Doc.execCommand( command , false , value );	
	}
	
}



var handleToolbar = {
   'forecolor' : function( value ) {
      this.Doc.execCommand( 'forecolor' , false , value );
   },
   'fontsize' : function( value ) {
                 
      this.Doc.execCommand( 'fontsize' , false , value );
   },
   'justifycenter' : function( ){
        
         //this.Command( 'center' , 'test' );
		 this.Doc.execCommand( 'justifycenter' , false , null );
   },
 	'createlink' : function( value , target ) {

				xy = findPos( target );
				
	
        DialogWindow.open( this , 'link' , xy[0]-150 , xy[1] , null );
	   },
	   
	   'insertimage' : function( value, target ) {

				xy = findPos( target );
				DialogWindow.open( this , 'image' , xy[0]-150 , xy[1] , null );

				
		},
		
		'inserthtml'  : function() {
		data = prompt('Enter HTML code \n' +
				'( e.g. "<font color="red">Some text</font>" ) ');
				if (data && data != "") 
					this.Doc.execCommand('inserthtml', false, data);
		},
		
	   'morebuttons' : function() {

			this.find('v1').toggle();
			var display = this.find('v1')[0].style.display;
			storage.setItem( 'SUE_secondToolbar' , display );
		},
		
		'source'  : function() {
			this.toggleView();
		},
		
		'visualmode' : function() {
			this.toggleView();
		},
		
		'spellcheck'  : function() {
			sp = this.Doc.body.spellcheck;
			( sp ) ? sp = false : sp = true;
			this.Doc.body.spellcheck =  sp ;
			storage.setItem('SUE_spellcheck', sp);
		},
		
		'createbox' : function() {
			this.cmd_createbox();
		},
		
		 'restore' :function() {
		  var conf = confirm('Do you really want to restore last text ?\n This one will be replaced !');
		  if( conf )
			    $( this.Doc.body ).html( storage.getItem('SUE_emergencySave') );
		},
		
		'textshadow' : function( value ) {
		     //this.cmd_testCommand();
		     this.Command( 'textshadow' , value );
		},
		
		'blockstyle' : function() {
		     this.toggleBlockStyle();
		},
		'settings' : function(value,target) {
		     
		     xy = findPos( target );
		    DialogWindow.open( this , 'settings' , xy[0]-150 , xy[1] , null );
		},
		'smileys' : function(value,target) {
		    
		     xy = findPos( target );
		    DialogWindow.open( this , 'smileys' , xy[0]-150 , xy[1] , null );
		}
	
	
}

/*******************************/

 
 
 
Editor_handleIframeLoad = function( e ) {
  e.data.iframeReady();
}

Editor.prototype.iframeReady = function Editor_iframeReady() {

    this.Textarea.hide();


    this.Doc = this.Iframe[0].contentDocument;

    var spellcheck = storage.getItem( 'SUE_spellcheck' );
    eval( 'spellcheck=' + spellcheck );

	this.Doc.body.spellcheck = spellcheck;

    //comp_style = getStyle( document.body );
    
    var comp_style;
    var wrapper = $( '#wrapperContent' )[0];
    ( wrapper ) ? comp_style = getStyle( wrapper )
    : comp_style = getStyle( document.body );
    
    //var font_size = comp_style.fontSize;
    var text_color = comp_style.color;

    var background = comp_style.backgroundColor;
    var font_family = comp_style.fontFamily;

    
    this.DocStylesheet  
    = $("<style class='IframeStylesheet' type='text/css' />" )
    .appendTo( $( 'head' , this.Doc  )  );
    
    

      
    
    
    doc_style_css = 
    "body{background:transparent" + 
    "; color:"           + text_color  +
    "; font-family: "    + font_family +
   // "; font-size:"       + font_size   + ";}";
    //"; font-size: 12px;}";
	"; }"

    var textlinks = document.getElementsByClassName('textlink');
    var a;
    for( var i=0;i<textlinks.length; i++) {
      ch = textlinks[i].firstChild
      if( ch && ch.nodeName == 'A' ) {
        a = ch;
        break
        }
      
    }
    
    /*if( a ) {
      var link_color = getStyle( a ).color;
      doc_style_css+="a{color:" + link_color + " !important;}"; 
      doc_style_css+="a{text-decoration: none!important;}";
    }
    else {
      var link_color = getStyle( document.getElementsByTagName('a')[0] ).color;
      doc_style_css+="a{color:" + link_color + " !important;}"; 
      doc_style_css+="a{text-decoration: none!important;}";
    }  */

    
    this.DocStylesheet.html( css_iframe_file + '' + doc_style_css );
	
    
	
	this.blockStyle = $( '<style id="blockStyle" type="text/css" />')
		.appendTo( $( this.Doc ).find('head') )
		.text( blockStyle ).attr('disabled',true);

    this.setHTML();
    
    
    this.Doc.designMode = 'on';
    $( this.Doc ).bind('mousedown',this,function( e ) {
      e.data.Iframe.adjust();
      $('div.SUEditor_ContextMenu').hide();
      
      for( var i=0;i<e.data.controls.length; i++ ) {
        e.data.controls[i].setNode( e.target );
      }
      
      
    });
    $( this.Doc ).bind('keyup',this,function( e ) {
      e.data.Iframe.adjust();
    });  

    $( this.Doc ).bind('contextmenu',this,function( e ) {
         ////console.log( e.ctrlKey )
      var t = e.target;
      //if( t.tagName != "BODY" && t.tagName != "HTML" ) {
      if( t.tagName != "HTML" && !e.ctrlKey ) {
          e.originalEvent.preventDefault();
          
          contextMenu.show( e.data , t , e.clientX , e.clientY );
      }
    }); 
}

/*******************************/



Editor.prototype.populate = function(){
      this.toolbars = new Object();
      this.controls = new Object();
      
      
     $('.SUEditorToolbar button').addClass('ToolbarButton').prepend('<span class="icon" style="display:block;width:16px;height:16px" />');
     
     
   $.each( $('.ToolbarButton'),
    function( index , elem ) {
        
        icn = $( elem ).attr( 'command' );
        $(elem ).find( 'span.icon' ).attr( 'icon' , icn );

      
    });

    $('.ToolbarButton').bind( 'click' , this , this.handleToolbar );


    opts= this.EditorBox.find('select[command="fontname"] option');
    opts= $.makeArray( opts );
    opts.forEach( function( el ) {
            $(el).css('font-family',$( el ).val() );
            $(el).text($( el ).val() );
    
    },this );
    
    this.EditorBox.find('select[command]')
      .bind( 'change' , this , this.handleToolbar );


    
    
   $.makeArray( $('.SUEditorToolbar colormenu') ).forEach(
        function(el,inx,array) {
            
            c = new ColorMenuButton( el );
            c.bind( 'click' , this , this.handleToolbar );
        },this);       
}

/*******************************/


function processHTML( string ) {

  var temorary_container = document.createElement('div');
  temorary_container.innerHTML = string;
  var spans = temorary_container.getElementsByTagName('span');

  
  
  for(var i=0;i<spans.length;i++) {
    if( spans[i].nodeName == "SPAN" ) 
  
      retagNode( spans[i] , 'font' );
  }
  
 /*var sups = temorary_container.getElementsByTagName('sup');
  for( var i=0;i<sups.length;i++) {
    var newsup = retagNode( sups[i] , 'font' );
    $$( newsup ).style('vertical-align: super; font-size: smaller;');
  }
  
  var subs = temorary_container.getElementsByTagName('sub');
  for( var i=0;i<subs.length;i++) {
    var newsub = retagNode( subs[i] , 'font' );
    $$( newsub ).style('vertical-align: sub; font-size: smaller;');
  }*/
  
  //centering
  var divs = temorary_container.getElementsByTagName('div');
  for( var i=0;i<divs.length;i++) {
  	 if( $(divs[i]).css('text-align') == "center"  ) {
	 	divs[i].style.removeProperty('text-align');
		if( divs[i].style.length < 1 )
		  divs[i].removeAttribute( 'style' );
	 	//var _newnode = retagNode( divs[i] , 'center' );
	 }
	 //else {
	 	 var newnode = retagNode( divs[i] , 'center' );
	 //}
   
  }
  
  
  

  
  bgMatch = /url\(\s*([^\'\(\)]+)\s*\)/;
  
  result = temorary_container.innerHTML;
  var c = 0;
  for( var i=0; i<result.length; i++  ){
         var match = result.match( bgMatch );
         if( !match ) break;
         else {
              var url = match[1];
              var bg = match[0];
              result = result.replace( bg , "url(\'" + url + "\')" );
         }
  }       

  //replace [Stumblername] with stumbler blog links

  var sn = storage.getItem('sueditor.stumblernames',true)
  
  if( eval(sn) )
    result =  result.replace( /\[([\w-]+)\]/g, "<a href=\"http://www.stumbleupon.com/stumbler/$1/\" title=\"visit $1\'s blog\" target=\"_tab\" >$1</a>" );




  return result;
  
}

function retagNode( node , tag ) {
    var newnode = node.ownerDocument.createElement(tag);
    
    //copy children
    for(var j=0;j< node.childNodes.length;j++ ) {
      newnode.appendChild( node.childNodes[j].cloneNode( true ) );
    }
    
    //copy attributes
    for( var k=0; k<node.attributes.length; k++ ) {
      a = node.attributes[k];
      $( newnode ).attr( a.nodeName , a.nodeValue );    
    }
    
    
    style_attr = $( node ).attr('style');
    $( newnode ).attr('style', style_attr );
    node.parentNode.replaceChild( newnode , node );
    
    return newnode;
    
  }

/*******************************/





//***************************Storage***********************************


var storage = {
    setItem : function( key , value ) {
            if( unsafeWindow.localStorage )
                unsafeWindow.localStorage.setItem( key , value );
    },
    getItem : function( key , value ) {
            if( unsafeWindow.localStorage ) {
                item  = unsafeWindow.localStorage.getItem( key  );
                 if( value && !item )
                    unsafeWindow.localStorage.setItem( key , value );
               return unsafeWindow.localStorage.getItem( key  );
            }
                
    }

}


//*****************************Disable Styles*******************************

var link = $('link[href^="/css/global_su.css"]')[0];
if( link ) {
//link.sheet.cssRules.item( 264 ).style.paddingLeft = '0px';
//link.sheet.cssRules.item( 283 ).style.cssText = 'padding-left:0px;';
link.sheet.cssRules.item( 268 ).style.paddingLeft = '0px';
link.sheet.cssRules.item( 287 ).style.cssText = 'padding-left:0px;';
  /* for ( var i=0; i<link.sheet.cssRules.length; i++ ) {
          if( link.sheet.cssRules.item( i ).selectorText.match( 'wrapperInput' ) ) {
             alert( i + '  ' + link.sheet.cssRules.item( i ).style.paddingLeft );
            // break;
       }      
   }*/

}

$('#addContent').css({ height: 'auto' })






var web_named_colors = colors ;







var contextmenu_html = contextmenu;

$( document.body ).prepend( contextmenu_html );

GM_addStyle( css_file );


var font_families =  
['Arial',
'Courier New',
'Georgia',
'Times New Roman',
'Verdana',
'Trebuchet MS',
'Lucida Sans',
'sans-serif',
'serif',
'monospace',
'cursive',
'fantasy'];









var mode;

var contextMenu;



function initialize() {

        


//SU
 var tareas = $('textarea');

 
  var test = $( '#test' );
 if( test.length > 0 ) createEditorInstance( $('#form')[0] );
 
 var msgContent = $( '#msgContent' );
 if( msgContent.length > 0 ) createEditorInstance( msgContent[0].form );
 
 var posttext = $( '#posttext' );
 if( posttext.length > 0 ) createEditorInstance( posttext[0].form );
 
 
       var edits = $('a.edit');
       edits.bind( 'click' , function(e) {
               createEditorInstance( $( e.target )
               .parents( 'div.text' ).find( 'form' ) );
               
               createEditorInstance( $( e.target )
               .parents( 'ul.listUrlReviews' ).find( 'form' ) );   
       });
       
       $('a.addSite').bind('click', function( e ) {

            //createEditorInstance_Timeout( $('#addContent').find( 'form' ) );
            createEditorInstance( $('#addContent').find( 'form' ) );
       }); 
}






function createEditorInstance( form ) {

var button = $( form ).find( 'input[type="submit"]' );
if( !button[0] ) button = $( form ).find( 'a.submit' );
if( !button[0] ) button = $( form ).find( 'input[name="submit"]' );
var textarea = $( form ).find( 'textarea' ); 
 

if( textarea[0] && !textarea.attr('haseditor') && button[0] ) {

    var oEditor = new Editor();

          oEditor.Textarea = textarea;
          oEditor.Button   = button;
          var t = setTimeout( function(){oEditor.createEditorBase();} , 600 );
          //oEditor.createEditorBase();
          textarea.attr('haseditor',true);
 }
}






var Commands = {
  'bold' : [0,"Make this text *b o l d* " ],
  'italic': [1,"Make this text *i t a l i c* " ],
 'strikethrough': [2,"Line-through text" ],
 'underline': [3,"Underline text" ],
 'insertimage': [8,'Create new image from URL' ],
 'createlink': [9,'Create new link' ],
 'unlink': [10,'Remove link'],
 'inserthtml': [11,'Insert HTML'],
 'removeformat': [12,'Remove text formatting'],
 'spellcheck': [15,"Toggle Spell Check"],
 'forecolor': [13,'Text color'],
 'hilitecolor': [14,'Hiliter'],
 'subscript': [23,"Subscript text"] , 
 'superscript': [24,"Superscript text"],
 'insertorderedlist': [22,"Insert numbered list"],
 'insertunorderedlist': [21,"Insert bulleted list"],
 'indent': [16,"Indent"],
 'outdent': [17,"Outdent"],
 'justifycenter': [4,'Center'],
 'justifyleft': [5,'Align text to left'],
 'justifyright': [6,'Align text to right'],
 'justifyfull': [7,'Align - justify'],
 'createbox': [17,'Create box around a post'],
 'visualmode' :[20,'Switch to Visual Mode'],
 'restore' : [23,"Restore Saved Post"],
 'morebuttons' : [2, 'Show more buttons'],
 'source' : [19, "Show source"],
 //
 'textshadow' : [18, "Text Shadow"],
 'blockstyle' : [24, "Toggle block view"],
 'cleancode' : [25, "Clean code"],
 'settings' : [26, "Settings"]
};













  


function adjustEditor( iframe ) {

  iframe.style.width = iframe.parentNode.clientWidth - 5 + 'px';

  if( doc.body.scrollHeight > 150 )
    iframe.style.height = doc.body.scrollHeight+'px';
  else 
    iframe.style.height = '150px';
}

function adjustSrc( textarea ) {
  textarea[0].style.width = '100%';
  if( textarea[0].scrollHeight > 100 )
    textarea[0].style.height = textarea[0].scrollHeight+'px';
  else 
    textarea[0].style.height = '100px';
}

function getStyle( el , node ) {
  style = window.getComputedStyle( el ,'');
  if( node ) style = style[node];
  return style;
}

function bodyDOMAttrModified(e){

  lastEditLocation = 'editor'; 
  $(iframe).attr('modified',true);


}

function bodyDOMCharacterDataModified(e){

  lastEditLocation = 'editor'; 
  $(iframe).attr('modified',true);

  iframe.adjust();

}

function sourceDOMCharacterDataModified(e){

  lastEditLocation = 'source'; 

  adjustSrc();
  setHTML();
}

function clear( parent ) {
createDiv( parent , 'os_clear' );
}





function addStyle( id , html ) {
  var st = document.getElementById( id );
  if( !st ) {
    var st = document.createElement('style');
    st.type = 'text/css';
    st.id = id;
    $('head')[0].appendChild( st );
  }
  
  st.innerHTML = html;
  
}



function createListener( fn , scope ) {
  var newf = function( e ) {
    fn.call( scope, e );
  }
  return newf;
}


    
    initialize();

