 scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name           GMail Compactor
// @description    This maximized the vertical real estate in GMail by colapsing the links on the left to an image box, and moving the search to left side
// @namespace      http://www.pavelgutin.com
// @include        http*://mail.google.com/*
// @version        09.11.06
// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below


//this works, but i should not have it here
//i think it will add it to every frame, and that doesn't seem like a very clean approach
GM_addStyle(".icon{display:inline-block;float:left;height:32px;width:32px;text-decoration:none;cursor:pointer;margin-bottom:2px;}");
GM_addStyle(".clearfix:after {content: '.';display: block;height: 0;clear: both;visibility: hidden;}");
GM_addStyle(".inbox{ background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABUlJREFUWIXll91vU2Ucx7/P6Xpa+sbY2rW0ZTNdt46tjuA2Mt2lxgwI4iCAFwQu/Ae8I96ROBNAER1xcRdqYjTxynjhXyA2CIthCWwwWMG5jVVk3dqe9pzTc57n8WLr8fRlrBMSL/wlv5zzvP2+n+flPM9zgP/YyHYqj46OhlxO25eaph7gnHNGGSjj4JyBUgbBIszlcpkzly59NvvCSS9fGH1t/PNP/8xkMpxSyimlXNf1Ms/lsvzK5Yvpc+feO1hvXEtd4pc/fN0XCP545uy7XkIIJElCoVAwXJIkSJIEq1XE4KtDO5YW/jjSs7fr3i+J6/eeG+DKlQuHg4HQ9ydPnd6lqipkWQalFIyxMqeUGmUDBwZti4vzh7r2dswlEr/O/GuA8asfvx0Kt34zcuxUY6FQgKIoVcKVrigKdF3HwIFB29Li0sGOzujD69dvTG8bYHzsozdagsHvjh490ZjP5+sSL7mqqtB1HX39A7b53x+92dH+0uSNyd8e1Q1w9eonLzd7vT+NjLzTtF3xksuyDMYY+vsHbLP3Zw/HuiI/TE7eSm8JMDZ2Mdy4c+fPJ06eblEUBYVCoSo457yuPFmWYbFY8Epfv2P69u1j7dHOb6empgpmvbJ9YGJiwiE28FsnT53upIwhm82WBS69b5VHKUUmk4GqqvB4PGhtbYWmaXxiYvy2w+HuO3/+vF7SFMwANpGMDR96K0oEAZlMBpTSulzXdUiShIWFBciyDL/fj6GhIQwPD6NYLOLx48dwOp3k+PET3bnc6gdmzQZzglH9mM/XIiwvLxuf2ma9lWUZ6XQaoigiFAohGo3C4XCU1dc0Db29vZiensbS0hIikfYGRtlZAO/XBODghBACznkVgK7rSKfTUFUVu3fvRiQSwf79+0EIKVv9nPP1WJyDcw632w1N00AphcViASHl014GAACEEOhMB+ccmUwGa2traGpqQjAYRCwWQ0NDgzHPxWLREDILmwEYY4jH41hZWYEgCJVy1QAA4Pf5MT07je6ubjidTmNEzKJmkVrC5vdUKoVgMLieZnxrAMYYYu0x3L1/F7FoDIIg1C1mLmeMIZlMYs+ePUa60srGxByAEIK2cBsSNxNQVbXmyt/q63jw4AG8Xi+sVmsZ4KYA5p4wxiCKInpiPbh24xpkWUaxWISqqtA0DZqmGRC1YObm5uB2u+F2u414tWzTKSjBuJwuxKIxJG4msK97H4D1hVrZG3NeKpWCxWKBz+fbtOfPBKicS1+TD+FQGFMzU2hpbkFyPlnegAAEBBwcVosV/l1+xOPxmuuiboDKhpHWCFJPUlhZW8HI4RG4nC5jKsxTs7i8iOW/llFQCrCL9qpObQlQ2lTMjRhjuDN7B+FgGPGuOHK5HJ4+fVpWhxACURQRaYvA2+zFzP0ZdEY64dzhfOYo1AQwN1CLKpLzSfT29MIu2rG6ulozoDnP5XAhHovj4cJDBLwBuJ1uox5lumjWq96aNoIwxpCTckhn0hjsGwQYIEmSAWj2WqeiRbCgo60DeTmPrJQ1dZCXaVaNQClAXsnD6XLC3+Kv2evNnpUW8AYgFSTk5TwcDkdVeU2AolaE3+eHIivGnWA7opXmcrig6RoYr94LzAAexrggCAJ8Xh8YY7Db7bDZbFXb7WYH0FYmCAIIEQQAQQASgGwJwAOgiVLd8/VXX0iUUcKZ6Yq1cYj8cy9gYIyDMQpm/BltlHMGzkrlvCLNoCiyB0AAQBoAL53NIoBmAI0A3ACsG/4irYj1O6gKIAfgCYDVyn9Dq8lrfiHPYQwABaBteO3D4X9nfwNezNnriR/SdQAAAABJRU5ErkJggg==)}");
GM_addStyle(".compose{ background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABapJREFUWIXll11sHFcVx3935s7sbLNrO+uPxCklLQltQlKgpC+AQfgjq7QKomoqWvpUNQ8BKVXEt/wWCaT0BSGigoyS8qGWFtJKJYCS2LENyQMiosFOaYyVD7uJ7dppnMT12t7Z3Zl7eKhnu469tmPgib90R0dn7tzzP/9755wZ+H+HKnfjJ63OC/l8+Izr2r8CWKm970Bh77IIHDx4sMJ13Z7QhB9DhMzF5/j63jRtL3QArNiO3/djBIi5sXcsy/r0nj173i8loEvsx9bf+9F7qqurAaH7gpBIeiACsGJ76ye3ggjj4+MfuTZ2fRfwiwUJiEhdIpGw33tvjPEb4yilmMr4KPWBSEVblrApmY/i7Nk3qa+vp7KiylZK1d2+BUUCWutay7at0IQAJOubOdx2msTaZkA43HaaVWsaATjcdoq76r6EiHCo7RRezRcBONR2ilj1F5BZ20k1EABhEGBZttJar12MwLrU6hTbHtqGiEHkKaQoT1Gl258v8UnxKiJQMlUpxcjIMMNDw+UVUErVVVZUorVeIlB5X7k5SikSiSS2ba8pSwCocRwHYwzt7e3zFrpTMqVIp9O4rouIpMoSEJGqKPt0On1HgZZSQkQiZVeXJWCMqXQcBxGho6Nj0YzuhAxAS0sLWmsmbwyldqeTfzBiNduKd/2C2Vm6BUmtNcYYWlpaVhSonBJXLp3j2CsHuNz3ZnJn4+M7W7Y9qc50/3rj73qO/1YD7N+/37Usy1ZKISKcPHlyyUDbt29fcs6lvjMce+V5xq7+i+07nuaZb/+cZO8/lff6GzT0j/CSNls0QG1tbcp13YKI2CJSVGCxvY3shYL3957m2KvPc/PaIA0PP8BTj3yVcGqEwtBVhv0c+sRRfnN/PnAsdVQD5PP51TU1NQUR8URkRZKLCOfPdnP81QNMvz9Gw8Ob+NSXn6CQGWZysIsgP8OVy69xpqfDDGyczqOsF6czme9qAMuyqj3PExHBGENnZ+eSwUvuMjrwDy78/XVsydL42a1s+cTnyN16h8nBTvK5LH1DPhfH4PrES+Imal6edqxvvtY+eRM+fAuqPc+zjDGICM3NzcvK+tzfjvPHl3+IIzPs+PyDPLDxPvyJy0xc6iDn53jrSpZL1xS5wKVl13PYFRumBwav/n7fvn03ozUiBVLxeNyK5O/q6loy+MBb7Qz0HGXXow1suPdu/BsXmRg4wVS2wLmBLBdGDWKvYsNnvsLTu79H/K5V9Pb22pY1PKcYaYAgCFbHYjE3ItDY2LjoFvzlT4cYOX+Mvd9vJVWzhrHOHzCR8ekZ9Bm8JqTWrOeJb3yLzQ81FrupMQbP8xxjzJxiFB3CGq21NsZgjKGrq2uBvf4w86G3T/Dss19DS46hi2/z554MA6M5KmvXs6XxMVL1H2f0ljDa3Q1AU1NTVA21iMxpSHqW3bqoD4gITU1NczIPggDf9zlx5Eec/+sRPC/Oz376S5RSrKpIkap/kB3pJ1l7z/3EYjFc18XzPOLxONG6YRiitSYIgnULKVAX9YHoDJQiDENujb9L3EvS9Ph3SKbuxolXYbApFArYtk0sFmNmZqZIOirrxphiMo7jkM/na+cR8H2/2AmNMWXPgDGGIAgoFAoEQVBUzLIslFJorXEcB8uysCyL0ppijEFrje/7NfMIZLPZlOu6hGG4YLWLEAXRWs/xL1Qxo8wjGGNwHAff96sWUqAikmyxErvcD5ByPsdxmJ6enk8gk8kkq6qqsCxr3sPlsJx2fTuMMUxNTSWBWmASyGkgPjU15fX399PX13fHiy4XSik2b97MzMyMM0tAA9c14ORyuTAMQ3vTpk3/MwIAvu+Ty+UMEAemAa2BHPBia2vrbmOMvdLFo4q3mM+2bWOMOQLMzI5cNEMDlUACcGbHfxsBH3ysZ4FbswQW/Dm1yvj/U0jJKOLf5/VYdm6zmwYAAAAASUVORK5CYII%3D)}");
GM_addStyle(".starred{ background:url(data:image/png;base64,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)}");
GM_addStyle(".chats{ background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAsZJREFUWIXtlsFr01Acx7/vvWKwWVdmi8KoTBmI9T7wNnAMj4LHHnYXxmCXbnONCGPLDmOHIcSDeJA58D/YoLCBJ68KO4kg4sFCbdKQVG3ynoc1JUuTLOn0tH3hkfDy3vt+8n6/30uAS110kTSDFUWZc133Jef86jBmjDGbUvpkbW3tzTDzoSiKaVmWGFbtdlvUajXTv2YmDUC32x3JZrOwbXvgmRBioAX7x8bG4DjOiH8eTb8Pg0piLoQAIYMRPzdAmHEc1D8FOI+xp4EcUBRlTgihOY6TDZuwsrISu6AkSZidnUW5XB4IRSIAIcSL5eXlrCzLsUZRsiwL29vbKJfLp8wTAziOk5NlOTTTA6CnDLz70dFR2LadOBSpytBvHgUQHJM6B84yTgsQ7B8KIM4syogQ0q99r/59zykAnggg7m3jsrxYLKLZbKJQKIBzDgBotVpgjNnwfYMiAdKYhgEcHh4609PTGQBYXV09eW1KO4ZhVAG4iQDO2u44gP39/Q+c86mZmZkr4+PjjYWFhfsA9F7rK/IkDJYQ5zz0PqrUNE17VK/XX6mq2rFt+/ri4uIUAKvn2Q9BYoCoFoTxZJpmZnNz8/nx8fFDwzB+SpL0rlKpTPR2nXkQwRD0gbws9ocgTiGZzgB0d3d3PwG4XalUbhQKhbsAvuKkAkQYgMQYs3Rdl/P5fH9hwzCQz+dDQYJ9rVYLmUzG7pn86l3dvb29LwA+e8aeggBC1/WnW1tbquu6WQBQVRW5XA5HR0fOwcHBmWVLKe00Go1nANoA4s/zEBEA1wDcBDC5s7PzQwgh6vX676WlpfeSJN0BMBnTJgDcAlBEwv/NsEEEgDQ/P/+4VCq95Zx3TNN8rWlaTdd1N2S8XxyAA+APAludBgDVarVEKf1GCGkSQh5sbGx8TLLYMAqNKaX0HmOstL6+/v1/GV/qUp7+AvGMoWAgfcX2AAAAAElFTkSuQmCC)}");
GM_addStyle(".sent{ background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABZNJREFUWIXtlm1sW9UZx3/nXvvGN3aTOElTx6napiXBjbK2G+VF5cNAqBVDSAipQLUWTZso0j5s6jokPhQJpElTESzqNgnEa8c2NhhVtX4YKgWppRVjFZ0ql0qwpi9A0uCkCXFiX99r+55z+ODYtYnTpK32CR7pkX3uc+/z/53nPueeA9/Zt91E9eDZgadlZ2dcG8KQC3lYa33FWL3o2NiotXPHYxXdQHWwpTmqf7xlmwmYUs5m0FrXiM43VkrVgAoheGvfmzU5jepBOBL2k8kkSimklPi+X/FisYjv+0gpKzEpJUqpyv1KqQpEWbwsLIQgmUwSiUTmBgBIJBIkk0kCgUBNsvL/axkDnD17lv7+/llVnQVgmiZLly7lzJkzBIPB6xYXQpBKpbBtm1AohDDElQEAbNvGtm1GRkYIBoPXJZ7NZpmamqKlpQWlFFbQmh9Aa000GiWTyTA9PX1NlQAoFosMDg7S1dU154qZBVCdLB6PMzQ0hOM4WJZ1VTNXSnHy5El6enpmgS2oAuWkq1atYnh4mFwuhxUAJeW84gAnTpygr6+vEq9eFQsCKLvv+/T29iIA6U5iZgbRvldX3DAMhBAc2f/HGvGrqkB14vL6zmQy2KEARkMz2mhAjxym0W4gHA5XGta2bRzH4dixY3x17Lecf3c3uirPXD0QqHexfHP5VynJxfOf0rWij3C0k/TkOT468Axe2+2VD5PWmkgkQrwrjrOohXD6v3yy7xf03j+AMALX3gP5Qp4Lw5/R3tpGQOXQvktzVz/LIjm6Ii6JRIJEIkFvby+xWIxoS5RAIMi6Ox9iRdTj1J+3Usxn685+3lfg5Bzyfp71a9dT1Bbe5Bcg81DMEF+zifEPBnDHz2JZFrZt09jYiGmapURCsGrtXdyUiHPq1QcoZMcXBlCGcFyHxe2LiXfEGR8fJ+9rvPQIKB8K0xgyzy0bH+KzA7/k/Hu7yV46j1Lycpm1gvEkse7v8cPb1/Pxa1vIjA7O0prVA1prCsUCsY4Ynufhuu4MqkVucojmWA+imAXvElbQYtPWxxn731EuHH6CcxNjSOnjOhkQBrroQOo4LW39bNy4iSMvPYi/+pE5AQyttQiFQnTGOgEIBoM1u9fF02kM5SJkDgppkC4CgyXd61jSswHQoIqAKFVA5cF30EPvEo6uZuPdd3Po4Evs2dK4fccbuZcBXb0zRAf2PPNVa7S17rsCaHI+ZsONLbQvX4Mx9Sn4Lkiv1BfSA1kEVQA/h/Zz4HvgjpUcoOMWVNsPOPz236e/uJja88je3JPVABbQAbQCTTPjmh5Z1t5g//7h1j0/2rpzpdW8DKYvQO7LyxC+CzKPlnmQLjgj4E3UTEJ034duXcvrzz2F8r3NZlVMAtPABJACvgQuVvtUTn6+skP8O33u6D3RsNkQ6VxtikXLIWCDYc70kA+FqRJcYaq2hO3rYMlt/Ofg3mlnavyVrS+7v6vdnK9sBqWeCdxzM02b1zTuCjcEN8eX3xBavrJvUVNrzGywGwkaGsMMgNWEPvGbyzPvuhPZfjPvH3ghnRodfXrbi85u+MahdB4L1POf3xHqX9omvr9kkbjVCohuU9BaUKz4ya+eRR9/AoSB6L6PYribQ/94bjJ1Kb1j+2vOG0AR0HU/xXOY+oZLQDx/xDsNfAK8WZ7Q3x4Nf4QZWowRRNz4MJ6y+ddfBiaGUtltO9/KHwF8KB2arxagUAVgziQyKb0eUQbAEBrTQqz7NdnJlD647w+pwVTh3l3786dmwCubwtUAlM2f8bKgUeVQuqgxQ0yMDqv3/vnKhWxG3rFrvztcL9m1AJRNz/isk4YQ6KHjfy18+P47p728ddf217PpuZLU3Quu19y8in149NDhMSu34ad/Ss8p/n+zvT+zd+oFrrCvAVGm4X1CVFKVAAAAAElFTkSuQmCC)}");
GM_addStyle(".drafts{ background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAi5JREFUWIXFl89u00AQh7/QKqRSqRDKLZQKESWB/HHuFATPUClvgpB4ACSoqr4Ir8CFvEBTwsFCitQStxd6aIUQrVUPh2Qdr702tuOIueSXTOzfN7OzKxv+c5SCXw4O923XvWms0nBtbf1sZ/vxo8FgcAuwHky67k3j7Zt3q/Tn4PBjdTKZbAKXEQAV19d/CjcWESqVDUC03+8U7hRjLiJzreeMHQD4PP5ZgLGveP3sgfE/sQDFmIsPIeHS0wAcHY1ic/2+lZhX0ev15iA5AP4V/b7l62C7da3WfgUAunl4yMwghQLEm+n61dP7xQOIwGiUPAOdTgcAzxPC+39pAJD5gM10Ugdm1ecACA4ZmNY6zlgfutwAunGSoVm/bG4t14E0+9wU7XbbP35zA4iAZVlkrTq89xVApl2giPO2Xt3ji33l6+f1zWwAWQyjA5esUwGAcHz81XhRlmi1WtlnQHWg2+2yTKX6c4AZwPhAspgBZR4comS9t1sH8D9VLlMHPC9/1Z+G39nbrXN+fhbaDTlmYDz+ZrwoLprNZuQe0Q6mBBBZHCj6TZP14qgWo04NkHXLRQ3iZiUlwIvG4hw3rWW4xUrXag9xnB/UattMpydaPhNAnKmpqmCLp9NTRGRuvsQSZKk6vNZxeRW2bZfDABuA/+BerVaNtAVFaTgcPgHKwIUCKAMVgZMP++93VukuwpXjOCWgAvrb8V1gC7jHrCNFv7S4wC3wm9mL6S/A+wt4XC3V/kjVrQAAAABJRU5ErkJggg==)}");
GM_addStyle(".all{ background:url(data:image/png;base64,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)}");
GM_addStyle(".spam{ background:url(data:image/png;base64,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)}");
GM_addStyle(".trash{ background:url(data:image/png;base64,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)}");
GM_addStyle(".contacts{ background:url(data:image/png;base64,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)}");
GM_addStyle(".tasks{ background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAKJSURBVHjaxJfNaxNRFMV/0yYxwQ9qmCw1iNB/wJWIFDdSFwmkYBZm4aq4ELoTqUIWCoKWUtwZXGhEpGLRf6AQNWDRhR/oJtpGxEYkkkrT0qQJnecifXEyk0zyhkQvDDxm5s0995xz7/A0IQT/MzwAmqYBMDs3k6vXa6ODTDg87PkRPnTkcDwe32kCkFGv10YvX7oy0Ipn527p+Xx+H7BuAyBje7va98RCCPz+ANAq+dC/0FkIgfSa1XKeQSe2ArBGzwys/F5hMnOeu+9TSlUbhnAE4MhAQ7NGnEofYz34k42lLXwfAkpMJBLn1AFMZS5wffEqY8Ez3F+7zbvyEqvpKq8ePumBbgDRXLuSYHXoM88qd0h+neLNxktOGBF+LZQc6e52KQF4OpbhbaTEF+MTifBFksevuU7s2gMAhbM1pkkyTRKAdPqBkv5er5dYLGbr/54AVKuVnlrLvpbvta5dMdB5oIi2hrMm7QZgqNfEy2vLTD5vzAFzbw/UA+3mwObrCv6Pe5U8EIlE1CXoNAde3HvUgXZnCZTaUAjBd639HFCh3CqVEoCFk4tt50C3RE7+6FkC8wbrHJiff6z8V4xGo2oekADK5bJtpju12d+1VXeXDKgltQOQ9xrVKwAwDDdJWwGYq1aehHLDyMhB27NUKqWkv8fjYXz8tLoEEnGpVGpWp+s6ExMxW2/b6W79hmsG7B+X8jiZrHU4uTahGYB5s5PJ2jHgyoTmpKFQqO3vuJPJ+mZCIQTFYrGL1t2rNj+XkcvlfFYAASAob+q6PsjjgpbNZo8CPqAkAfgAv4BvN2duhAd7WKFcKBQ0wA+gCSHk6XgPcADYv8tIv09NdWAH2No9mG4Cxp8BAMgbP4mUfZRAAAAAAElFTkSuQmCC)}");
GM_addStyle(".moreDropdown{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAq9JREFUeNrEV82L00AUn6RpE7dQ6dmboAf/BNejCCKCdxG8SJtSaJe6il568mN3qVKkpoj3vQoqy0pVBPXix3rz5s1/oLRuk24S32vzyiS7aTqz3e2DRzMzb977vY95M1V832eLJCX41YBPAOvAajA+CtoDHgLvAtvAPgI4CZwDXgLOcICOgtC4EwDoIY88X9t49N73vTPHGXpVVf/euX3vLAKw0XjhVmmcE0WZLXcJcknrL15apzAlCKBLG/r9/rF4n8vl6NPBgnNFPJ9L5YMt5MbTdaY9Xn8wmsxkxvXXaDSElNVqNZbP56Ud0DLpNHOGw9FApifQnuazJ2KGNe3PvuPmui7zPE9IEe5B76GqB7AXewm7u3o/Vn5t42EYSNSbarUqFQEgA0BEjT2HHzMYWgCshDK8k+pKdTWkTIan5N+8cf0mQ+aAMB5oKAKIrNlsCkWgUqkQgEFChFjU1oEpkD1WcZRUU/siMCsIMpqQgkR9Gq8QhcvlspCnCHouESAA804BHtOZASDaVqslZBwjNscIeFKdkAAowfuGP/88AJjHEFspNVUKAQAFe3A2NTrXIsQbUOh8e6559cq1UApo/PrtKxPk4gAAbNOU7YSs1/03bolL6amhJzk+Bf5h+gBRvV6f9PtpAEiOB6BQONvttpDRYrF40LS1tf3GvHTxcmjyXWdrtBZ6mtFFwjciEeY8NegDLx3SxzO/FgVwqMsohqzOh+2JDH5HvedTMCAPCoWCbAmELiP0FGrB5Gsh6n2oD1A4RQsxoYNaHz91Ju+B2EYEDUR3HIcZhiH8Ms5mswz3gg47uhZ4XErshNAYfn/5+vnc8vkLTNd1IQC2bTPY64COTalHadAYlnd+/fj+c+fbadf1hJ63qZQKaVA3e93dFamLbNH/jlW2YPovwABCObtKzPs5HAAAAABJRU5ErkJggg%3D%3D);}");

GM_addStyle(".searchButton{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAANPSURBVHjabJNbTBRnFMfP9818Mzuzt4FdLgJbJMTuaoJKYYkshTSl2sYIAm7TGCravmliGxPrQx/70pg0TZ98UNuQ9qlN+4CYFG1jjLFYlJtEVlxKCsteZnBd2N2Zlbn3pVDa9Jec5Dz98j85+SP4D719vd8H6mqOEUI4y7aQpmnK8p+J78Z+vnUW/ge0tQQCdV09x3tunzl9hhEEH1I1w7YAIYZCUMjn7OFvh9XRkdHuZDI1vlNAAQDU1NaEo+/2//bR+Qv03bk1fWQmp8SymJpNG9Sd2dUCti08FD3GbhRyH6yuJkfloiz+SzB46uTix+cvMD9NZPS0JpCelspS5FVhs2NfNbtZKorxorM8mX6unx44Qmdza4NTk9OfbwvaI4cuRU9EDy9mkZl46SZ9B9xStcAjF88QimIYtVRcX1mKxwqkpoHS8nqV4ECiJMqpZGoCAAAfbN5/uS3cRiZTwLQ1Crrf5/OzvEtAmOEBIcrjFfwqclUo+ReZhReE6Yi87nit5eBXWwloQohtAUZOjxcyK/E5fZ3FyDZUy9S1QH3jnk8+/ewyxXIulveUOd85dZHjeCCE2NsCwzAMltCEIMuej6+IgUon5gk2RTGTGZ+OJ+XiepazLIsmrMPQVFNVVUrXDX2HwJxKJBKtbsKixRKUx+9Pj5eKubVSISdxLsFvqC8Vk+WcnsqGzloBI1EUVU3Tf98S4OmpmWs3bo5kesO7qIamtgjNcm6EMMaYolnO6cU0YRjeU7n3UPcbR5ur8PWvrxZi87E7219IpzMzwdCeS5RtqC1NIV5xNbZubuoVqpxdEqrqQ+W1of7w2ycHTzTR8ODemM05OMQwpP3p04VhwzBkCgBAEqVfvGXucxvisvjhwJseylVR7WsMv+V7JXQg0hzc1dfih+tXvrA62juwtCYRG2yye3f9UDqd+ZUCAJBlWUolU6Pl/rL3H09NPDc3lpXOkA8fba1jb/147dnNGz+U7t8bv2iD1dvV2QWyoqCBvigHYJ2ltm6RZVl6PDv3pWmaRYeDqfhjKd4w8fAByefzjxZiz648eTL/DUYUq5Tkzv7j/eDxeNGjyYf/lGkH+O9BO8qGAMAGAAgGg0OHj3RfBQA0Nnb7vb8GAD+nbWSrewERAAAAAElFTkSuQmCC);"+
                          "background-repeat:no-repeat;"+
                          "background-position:3px 3px;"+
                          "border:1px solid black;"+
                          "margin:0px;"+
                          "height:23px;"+
                          "width:23px;"+
                          "float:left;}");
GM_addStyle(".searchExtras{cursor:pointer;font-size:.7em;color:#0033FF;text-decoration:underline;}");
GM_addStyle(".icon span{width:14px;"+
                       "height:14px;"+
                       "display:inline-block;"+
                       "font-size:8px;"+
                       "background-color:#000000;"+
                       "color:#ffffff;"+
                       "background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPlJREFUeNqckrEKglAUhu+1uIM2JBJNLUIELq1N0gM4+QRtrT1Kay/h5ANEk6uLYJBLY4hLttr540gNoRd/ONzL9f+413N+2TSNaCWlXNGyoVpTuXxcUKVUCXnz1jv+gQJaQi/wtvbCtk3HtHD+Kl91da+qLM7O5IkIjj9+3MjQ3j/4W8uxJuKP6rJ+Xo6XM21PgA1+XtgFQfgGD7xgRrQJ6Hm72XI2Fz1SplLKUtPH9XEz0Aj8k9AUe9cA3bYROmKva4iBAlig5boAewuAKeakC7I3BZhguJhTHwQPvGAMjlGE4XbBPwFAenLZZlUncgx9Izck5G8BBgCuZYv7nBU3oAAAAABJRU5ErkJggg==);"+
                       "background-repeat:no-repeat;"+
                       "text-align:center;padding-top:2px;}");
GM_addStyle(".dismissAlert{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFRSURBVHjapJO9SgNREIW/mWwKRdvtgmChnT9LUBQLfQRbm7zC5kl2XyGNqcRHMJBUi1yCpYggdlto4V+x5I6FySVqiEJOeZjzcRhmxMxYRBHAuciaQnekeoD3cwMCI4Ebg9Mzs4dobF6uJ8l2nCSI6lyAeV8rndu+d64LHEYAprobJwlPnQ5WVfMb1OvErZbeObcHoGMqoopVFRJFrBwd/QquHh8jUfQ1o4pBLQCmtZwkbPb7NLIseI0sY+PqiqWdndlLnNZbUVDmOXGaBi9OU8o85/36+m8AwGO7HYIAZZ4H76eUBTWzQSPLQu3pJrNa/AIsN5shPB2I05Snbpe3opgP+BgOuT054aXX+7aT54sL3p2b3UBgZN7XpF7HqupbeKLXwSAcknmPwCgAFIrSuf241dJ/nDKlc16hABAz41xkTeDSYGtyYf99Jln0nT8HAIfmkVxb8xKFAAAAAElFTkSuQmCC);"+
                          "background-repeat:no-repeat;"+
                          "position:absolute;" +
                          "left:-10px;top:10px;" +
                          "cursor:pointer;"+
                          "width:16px;height:16px;}");
GM_addStyle(".moreText{position:relative;" +
                       "height:auto;" +
                       "width:auto;" +
                       "left:0px;display:block;" +
                       "width:32px ! important;"+
                       "height:32px ! important;"+
                       "background:none ! important;}");
GM_addStyle(".moreText span.CJ{opacity:0;background:none;}");
GM_addStyle(".moreText span.n5{opacity:0;background:none;}");

         
window.addEventListener('load', function()
{
   if (unsafeWindow.gmonkey)
   {
      unsafeWindow.gmonkey.load('1.0', function(gmail)
      {
	     var func = function()
		 {
		    compactGmail(gmail);
		 }
		 setTimeout(func, 10000);
		 
		 function compactGmail(gmail)
		 {
			 function updateCounts()
			 {
				for (var i in icons)
				{
				   if(icons[i].newElement)
				   {
					  var str = icons[i].originalElement.textContent.match(/\((\d+)\)/);
					  var count = (str != null) ? str[1] : null;
					  if (count != icons[i].oldCount)
					  {
						 icons[i].oldCount = count;
						 icons[i].newElement.innerHTML = (count != null) ? "<span>" + count + "</span>" : "&nbsp;";
					  }
				   }
				}
			 }

			 
			 function evalXPath(expression, rootNode)
			 {

				//this is being used in a whole bunch of scripts, but i don't know the source
				//i should figure out who the autor is, and credit him/her properly         
				try
				{
				   var xpathIterator = rootNode.ownerDocument.evaluate(expression, rootNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
				}
				catch (err)
				{
				   GM_log("Error when evaluating XPath expression '" + expression + "'" + ": " + err);
				   return null;
				}
				var results = [];
				// Convert result to JS array
				for (var xpathNode = xpathIterator.iterateNext();
					 xpathNode;
					 xpathNode = xpathIterator.iterateNext())
					 {
						results.push(xpathNode);
					 }
				GM_log("found " + results.length + " elements");
				return results;
			 }

			 function fireEvent(xPath,event)//https://developer.mozilla.org/en/DOM/element.dispatchEvent
			 {
				//this is a not a good approach but i can't seem to store the reference properly
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent(event, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				var cb = evalXPath(xPath, navPane)[0];
				var canceled = !cb.dispatchEvent(evt);
			 }

			 this.iLink = function(_xPath, _name, _mouseEventToFire)
			 {
				if (evalXPath(_xPath, navPane).length > 0)
				{
				   this.originalElement = evalXPath(_xPath, navPane)[0];
				   if (this.originalElement.offsetHeight != 0)
				   { 
				   this.newElement = this.originalElement.cloneNode(true);
				   this.newElement.id = _name + 'Icon';
				   this.newElement.className = "icon " + _name;
				   this.newElement.innerHTML = "&nbsp;";
				   this.newElement.addEventListener('click',function(){fireEvent(_xPath, _mouseEventToFire);},false);
				   iconsDiv.appendChild(this.newElement);
				   }
				}
				else
				{
				   GM_log(_xPath + " element was not found");
				}
			 }

			 var navPane = gmail.getNavPaneElement();
			 
			 var mastHead = gmail.getMastheadElement();

			 var searchModule = gmail.addNavModule('Search');

			 var searchBox = evalXPath("//*[@id=':ra']", mastHead)[0];
			 searchBox.style.width = "125px";
			 searchBox.style.cssFloat = "left";

			 var searchMailBtn = evalXPath("//*[@id=':r9']", mastHead)[0];
			 searchMailBtn.innerHTML = "";
			 searchMailBtn.className = "searchButton";

			 var searchExtras = document.createElement('div');
			 searchExtras.backgroundColor = "transparent";
			 searchExtras.className = "gadget-footer";
			 searchExtras.style.margin = "-3px 0 3px 0";
			 searchExtras.style.clear = "both;";
			 
			 var searchOptions = evalXPath("//*[@id=':r7']", mastHead)[0];
			 searchOptions.innerHTML = "Search Options";
			 searchOptions.className = "searchExtras";
			 searchOptions.style.padding = "0 0 0 .5em";
			 
			 var createFilter = evalXPath("//*[@id=':r6']", mastHead)[0];
			 createFilter.innerHTML = "Create filter";
			 createFilter.className = "searchExtras";

			 var searchOptionsSeparator = document.createElement('span');
			 searchOptionsSeparator.textContent = "|";
			 searchOptionsSeparator.style.padding = "0pt 3px";
			 searchOptionsSeparator.style.color = "#cccccc";
			 
			 searchExtras.appendChild(searchOptions);
			 searchExtras.appendChild(searchOptionsSeparator);
			 searchExtras.appendChild(createFilter);
			 
			 searchModule.appendChild(searchBox);
			 searchModule.appendChild(searchMailBtn);
			 searchModule.appendChild(searchExtras);

			 
			 var iconsDiv = document.createElement("div");
			 iconsDiv.className = "clearfix";
			 
			 var icons = new Array(new iLink("//span[@id=':qx']", "compose", "click"), 
								   new iLink("//a[contains(@href,'#inbox')]", "inbox", "click"),
								   new iLink("//a[contains(@href,'#starred')]", "starred", "click"),
								   new iLink("//a[contains(@href,'#chats')]", "chats", "click"),
								   new iLink("//a[contains(@href,'#sent')]", "sent", "click"),
								   new iLink("//a[contains(@href,'#drafts')]", "drafts", "click"),
								   new iLink("//a[contains(@href,'#all') and (@class='n0')]", "all", "click"),
								   new iLink("//a[contains(@href,'#spam')]", "spam", "click"),
								   new iLink("//a[contains(@href,'#trash') and (@class='n0')]", "trash", "click"), 
								   new iLink("//span[@id=':qv']", "contacts", "click"), 
								   new iLink("//span[@id=':qt']", "tasks", "click"));

			 var moreButton = document.createElement('span');
			 moreButton.className = "icon moreDropdown";
			 moreButton.style.width = "32px";
			 GM_log("more button created");
			 
			 var moreLink = evalXPath("//span[@id=':qz']", navPane)[0];
			 GM_log("moreLink" + moreLink);
			 moreLink.className = "moreText";
			 
			 moreButton.appendChild(moreLink);                          
			 
			 iconsDiv.appendChild(moreButton);
			 GM_log("all icons created");
			 //move the alert with "message sent" and "undo" buttons out of the hidden header
			 var alertBox = evalXPath("//table[@class='cf ve']", mastHead)[0].parentNode;
			 alertBox.style.position = "absolute";
			 alertBox.style.left = "360px";
			 alertBox.style.zIndex = "100"; //the version next to offline tends to sit on top of this othewise in a narrow window
			 mastHead.insertBefore(alertBox, mastHead.childNodes[0]); 
			 
			 var dismissAlert = document.createElement('a');
			 dismissAlert.className = "dismissAlert";
			 dismissAlert.id = "hideAlertBox";
			 dismissAlert.addEventListener("click", function(event) {this.parentNode.style.visibility = "hidden";}, false);
			 alertBox.appendChild(dismissAlert);
			 

			 //slightly reduce the margin around the top links, so it fits into a 1024px width without wrapping
			 var gbar = evalXPath("//*[@id='gbar']", mastHead)[0].getElementsByTagName('a');
			 for (var i = 0; i < gbar.length; i++)
			 {
				gbar[i].style.margin = "0px 1px 0px 0px";
			 }
			 //GMail text for consistency
			 evalXPath("//*[@id='gbar']", mastHead)[0].getElementsByTagName('b')[0].style.margin = "0px 1px 0px 0px";

			 
			 var timer = setInterval(updateCounts, 2000);  //2 seconds should be quick enough for most people
					  
			 //delay everything to ensure that the order doesn't get messed up
			 
			 navPane.childNodes[0].childNodes[0].style.display = "none";
			 navPane.childNodes[0].childNodes[2].style.display = "none";
			 evalXPath("//div[@class='no']", navPane)[0].style.display = 'none'; 
			 evalXPath("//div[@class='qj pk']", navPane)[0].style.display = "none"; //the hightlight of the current folder
			 evalXPath("//div[@class='pz pA pp pX']", navPane)[0].style.display = "none"; //the compose link
			 evalXPath("//div[@class='n8']", navPane)[0].style.display = "none"; //extra space below the icons
			 evalXPath("//table[@class='cf nX']", navPane)[0].style.display = "none"; //the compose link

			 var firstLeftModule = evalXPath("//div[@class='nH pp ps']", navPane)[0];
			 firstLeftModule.parentNode.insertBefore(searchModule.getElement(), firstLeftModule);
			 var folderLinks = evalXPath("//table[@class='cf nX']", navPane)[0];
			 folderLinks.parentNode.insertBefore(iconsDiv, folderLinks.nextSibling);
		}
    });
  }
}, true);


//thanks to sizzlemctwizzle for this
//http://userscripts.org/scripts/show/38017
CheckScriptForUpdate = {
            // Config values, change these to match your script
           id: '46938', // Script id on Userscripts.org
           days: 1, // Days to wait between update checks
          name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
           version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
           time: new Date().getTime() | 0,
           call: function(response) {
              GM_xmlhttpRequest({
                method: 'GET',
          	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
          	  headers: {
          	  'User-agent': window.navigator.userAgent,
          	    'Accept': 'application/atom+xml,application/xml,text/xml',
          	    },
          	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
                });
            },
           compare: function(xpr,response) {
           GM_log(xpr.responseText);
              this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
              this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
              GM_log('this.xversion ' + this.xversion);
              if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
                GM_setValue('updated', this.time);
                GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
              } else if ( (this.xversion) && (this.xversion != this.version) ) {
                if(confirm('Do you want to turn off auto updating for this script?')) {
          	GM_setValue('updated', 'off');
          	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
          	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
                } else {
          	GM_setValue('updated', this.time);
                }
              } else {
                if(response) alert('No updates available for '+this.name);
                GM_setValue('updated', this.time);
              }
            },
           check: function() {
          if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
          if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
                this.call();
              } else if (GM_getValue('updated', 0) == 'off') {
                GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
              } else {
                GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
              }
              }
          };
          if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();