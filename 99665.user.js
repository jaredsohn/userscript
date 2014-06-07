// ==UserScript==
// @name            Moswar
// @author          Rds (new version) Original by PixoiD parted Romzik
// @description     Moswar GUI+
// @namespace       *
// @version         3.0.0.0 (02.10.2012)
// @include         http://*moswar.ru*
// @run-at          document-end
// @grant       none
// ==/UserScript==

$(document).ready(function(){
		
	$("#servertime").css('color', 'black');
	if ($("#timeout").attr('timer') > 3) {
	setTimeout(function() {
	myfunc();}, $("#timeout").attr('timer')*1000);}
	
	var url_1 = encodeURIComponent(window.location);
	var url_2 = 'http%3A%2F%2Fwww.moswar.ru%2Fplayer%2F';
	if (url_1 === url_2){
		$("#statistics-accordion > dd").css('height', '236px');
		
	keyURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOnAAADnUBiCgbeAAAAi9JREFUOI1jYBhy4PWJ3f47akt33p9fz8HAwMDATJLm8/sDPr++verx4T0fX3/8c8dYVe8l0Qa8Pr8/4OPrOytXR1ez/pKX/OyR7VQgL8ztykiU5nP7/N8+v7Hq4tSFD14wsqhmLi1lvLH7TOyXOy++EjTg9aldfs8fXF59f/PWixp+gXtF1Zgy7p27c+jNvfdTPJoX7GZgYGBg2F8/n+PM4vkWE0MTRWEaD1dUCM7xDl56uCXnx+YElxP/368XOD+jvXy5pfarJ7sXCsPUMZ6fP19AyoD/6LWNW7X+fHj34+bZJ5PsE1P3fX7xWPXTx6cT2F59/mXWEa/EI+7z4v9/BsbPR/ts+GyKDsMMYJFQ5w2+uXOblqQIb+tP5r8/jj87Wyms8Lns6oW7DN+u374R1JaWxy3m/ZKBgYGBkZHhPwMDQjMDAwMD053jp98x/fv3/ycb2wz92gUtobUxx3hEBRlYf3xj+MDMsU3ANHU3IyPjf1xhxPxl19F7n7/9i9q9/pTe+S+fVtvLSRzcvWiX/8+L9wU0fv99suTF6zUEo+nGht6bvW5mB2H8/+/3C9zrLwo/GOn2/3J5sAM+vUwMDAwMAooaDxjuvTY7GhPXuCUppUlb0PHb7T+SW/h9XX6/ffnZnqABv99/zzFM83q8Yc26un27tpV76GtcVdFhO3582z5WGWuDy/gMgCek/fvrWdT5BFT5/rC+XztzW97XV18MDZx0N1oVTZ2BzwAAS7/7eaC8+ZIAAAAASUVORK5CYII=";

                rudsert = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAAOYSURBVHjabJNdTFsFFMf/94t729Ivelu+Opi1dkNtpotMtwzncJNkshk2MVl8mU7f9VmfjFMfNDEmPrnHucAMkWVjikgZxX2AQwbBMVLHUgr9gBZa+n259x4fYISg/+S8nIffyf+c/2E8AgfV4QJva0AplzFKkmY+9dbpoiSKTDQaMfX/2r/vjROnDkmGymjkcSg0OHAjIIqSTkR4IsYjcChZ7DDV+DztHe2fnGhreSUZjUdyuRxrNZv3yLLc8Jz/RWjrBFUrlN8+0/Hq8vLyGMdxWxA0cAzsDic++vSrnqlomnbq0T8h+iM4Tj9fGaJIJKlduPDFN5vzt4q3cczJD53SB8/IjtY1BSgpZQgVIjQAHADP015wfAK6zgAM2GPHXj9+8eJTsiw7k08scQbgeGch/7FQXV+BAy1w20QIPA8WQF4roagV4LRWoabWAYvFBKvVYpt5OPtgZubBFMMwUFUVXAmIsIre5ue0aqW5BdW7alEpcGB1Qngtgn5lFE7WDqMmQpQEiKLIJ5aWyle6u3sAoFgsglOBXJ5npeZypg01jbC+sB+ykUdfYgB3848QETh0Tf+CbDSJWpsLFskEi9ls6bveNzw/H47n8wVwHIAsmFgdT+315VIVmg9jd70L19aH0GO7j3qjF41uL/42xHFp+BJoPovWl1+zhUKh9P3JqUFdUzcgKlGmyAu2I7x6dK12N/Y078ezrAfymgGFfAZz8VkIljJmJu9hZXoBnUfPwOvb2zR0M3gnEVuc5/TNU6dUfelQk+dNt2y3V+57CXUWO/wmLw4Le/E8Uwcf1cJv8KHzYAeq7U44quxGRefcgd8HerFdR9w1X984e5L+HLlNOhEpRKRvy4yuEkVjK7SUXCUiovn4Kvma/K3sdkhwIf7j8NBINHX31kaDAJWAdQAqgJKmIhJdxnK6AACoLqdx0MrX8dshBEwMptZ+842PnlsHwDGAvhk6BoBewaPR7UIpEcO9q6Mrt4KB28VicRY7xQMH3m/clUkkU1s2skSUDIVoqbebxr/9MvX9uXcuv+v3tAkAWj1u8DshKjA2GF7oG+q9erb1/HtYnYuBAtcQvt6dnno899OEiq6HK7mA1ShBNklgGea/EABYBH0X+Pyz047JCbGcjOWC43d+aGSVyyMw/xUuKbrLbAIDwtbv/B9EB+JKOi2Hx8am06uL5+OC0OWQxIUUI1BWI1QwGztKZPNwmU34dwAiWb6/4ISmmAAAAABJRU5ErkJggg==";
        
                litsa = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAANaSURBVHjadJJdTFsFGIafc9qetkAHFKhVC6wDZaCDacbcjNI5iVlwQ6KAXqo3Lpp4Y4wuhmlUjDfo4oUbXigSnYkBkjGXTdnmlUqEbCAbuk2MrKM/MP4KofT0nPN5AWKj80ne5Lt68v0prOPK20KWZrizXDa7qmpLsWgEPbVUWFwS3BGqf2yPy5UdvjE5ceW70yfPW5ZlkYH97yLbrRU/98LBdw801j+yFJ+ZTCaTjgKvNyiG6bu/dhfLiWUcGkbdww/VXr16ZURV7f9YHMAmbyGH2j86PfRnXFKWJZmMjY7ITz+MSt/X30sstiBtbW3vAWiaayNqQLM3vFaonajOzgqtrFogFgaQXs+91TUESvwUFOWSTKZ4svmpZofDka3rOoZhYBgGqoKU3x2JNHL5ojut2NBTOkrGvGng9oCPqpog/mIv26tr7gqF9tSDhdPpxOl0Yps35Ve30FqpL3vTdQ34vB48bidWxtLShsHbb71Jbm4+JYEAelpXT/b396AoWJaFCiTOiu3YamyShfNnmEtZG53YgZSu093VxdbKSmp37gRg//4D+/x+f7mR1pF1CRHD7B4Se8Q+0MdUdGZDMD03T0dHB8NDQzy6dy+aqpAW8N/m29TS+vRLAKZprEmA6VNLqU89i1H+ODdAClCASxcu0N/bS3hqCt0wM1+DV159/cU7izfvAjYkTCRTn1wvKJjdnAgTvbm4ttR4nLzxcZqbmgiWlWECNgVMoDTg1w4dfud9wKZmyMOfjf3+uev6NSKXxwC4Z/dufE4n+tQUmgKmKYTDcebnEgA0NTWFyiqqQpkSRuYWj5759lwiMTwIgD8YZFtrKy6PZ60zI00sMsv0zCIW4DOXqcvVivk31SqdXc80S0pEDBFZ0XUxTFMsETFFJBxfkIlfxmXkRJ9x5OWD3zRUbKn+j0SF7c+XBFLTs3Mbr58Wkej0jEz2HpexI+36sWdbep7YGnzABlQU5HFLSuGrnu4vJCEiv4VvynBnp/z4+IOrR3eUf9lYGbyvND+X2pI7cDvsVBXlY7+VJAwfDhx+o0UbHLQ55yPJ0UvDx08tGR9ETGU8BwvNbsORcROF/2Gbwse1Clk/O9T2qM15zZOTTZ7bhQNhYSVJUU4WF2/ECOZ5+GsAwtiOZlNtGnkAAAAASUVORK5CYII=";
        
                kup = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAAN5SURBVHjadJLfT1t1HIafc07Pj7YUaAuUkhZWYDjMxiZC0GWDmZBlmw4vZLsxMeqN/gfGGLwSL9V44bYbL6abibAlQJRN54yJOnBLBs5NN5EMqaWD0UJLf52ec77esI2Y+SRv8rl68uaTV2ITo7oZj2a5PYbikmUtm1xKYJayNdHGWFdf/8EDhuFdjC/8dfubyYnLjuM4bMH14PC6tehrb7z53tGB/uey91YWCoWCGgwEYsKy6zq7n2Ejs4GqYfXu39d9587tGVl2PbKoQGWghreHP568eveeKDmO2MqN2Rlx5adZcf7L70UyuSaGhobeB9A042HkiOY68laNNtbh9fTliw4IBwsob2Znx26iTWH8QR/5fIGXBgcHVVX1mqaJZVlYloUsIVrbEokBbl53lyUFs2QibbaUARsIhgL07OugKVbP7o6O7X19B/rBQdd1dF1HSdvid7fgeLu5ESj3HqEu4MPn1rEch4X5BPNzce7OJ4gvJKmtD6KpLkzTlCcmxkeRJBzHQQYyl4RysphcYO3yBVIlBwnIredI/rOCYWhEoyFa2qKsp7IsJdMcOnz4UDgcbrXKJsJxUACyjpiLet0vR9ZWfWL/QbaFg2xsFAiFg9TU+kGCfK6IEAIkiEbq9b8X48709NRFITYlQO6+g/+oh954VZj2ni7Syyky2RzFfAmrbKHrKkKALEkgSXR2dXeOjJy7lM2sxR9ISFv23N72llda6ms8nj3daICwHQxDQ5ZlLMsGCWzbwbZsopGQYlTWbv96/PxnypbhZZLZfOiF+upnC5FWmne0USoUAYly2cLt0dENnUwmh8fnwed109DYvG1sfOwHeet8Z1LrJy5c/C6TuXoFXZWpqPRSFaikoTFEXX0Qn89NLlcgvZ7DBursDXqrtOjWJgCpbL4Y2+WvfHrn4HE8hoZLcyHLMgqguBRwaUjrq8Snf7RHTn86+evNW2f4LzLseb0xUlpeTT2cvimEWFpeEQvnzoobHw2bJ189NvrijliPAjwRrOaxNMEXo6c/FxkhxB+L98W1U6fEz8/vLZ7oaj0z0B57qslfRXdjA27VxZO1flyPkyzCh9+++84xbWpK0dOJwuxv185+lbU+SNjSrQocNJeCqjx6p8T/sEvik24Jzy+qPLyk6H/6KrxUuw1UBGv5ArUVHq7Hk8Sqffw7AHU0he2VB01wAAAAAElFTkSuQmCC";
        
                mon9 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAAOfSURBVHjabJJdbFN1GIefc057Tk8LY1071o5ua+fmB2KZ6FCWwdAQonPDD5ZpMkyUxOiF94aLeaMYExNNzEwIF0ZM/AhsGEbG1CAoIZiCkSn7EARc16VrGR1bu7br6en5ezNwok/yJu/V8/6S9yexjKO8Hqdq6k6HYpNlNZOYiWMUMt6a2tCjbTt2bnc4XLHp6LXL3w8fP2VZlsUKbLcXl67WvPr6G+927trxRCY5G83n83ZPRUVImKW1m5ofZzG9iF3F3La1tfnKlcsjsmz7x2IHyiq87Nv/8fCFyaQoWJZYyfjYqIj8PCqOHj4tEol50dvb+x6AqjrujBxQbe1vedVjYZezLbdkgbAwlw8s5HL4a+uorHJTVe0ll1tid1dXl91udxmGgWmamKaJLCEa7o3HdzF2US9KCkbBwAZEIhfo2bWbN/fs5bO+PvK5WUKhKjaGw41tbdt3gIWmaWiahnKrJCZ0QfcDxmJFcVs7/spyZBkOfXKQUr6Au8zN6NgEkbNnePqFZ9E1B0bRkI8PDvYjSViWhQykTwrlwFIiyvypb7mZN9HtKhse3ojb4yVxM0k2cZX2tSWy1ycA6OjofMrn8zWYRQNhWSgAGUtcrXHpPYH51Gpr607u8Xuo9PuJRadodKbpeLKFza1N2PUynIEGyla5tKnYtHU+EvlOiGUJkL1p4e50si1W5iPc0oxDd6AUFniwcR0BvcSvE0kmi1UEG2tQVZX1DzVtOtI/cDKTnp+Wb7/6Wr5wcMrjSQXTMWZSaWRJonFDmPGEk8MXC5g5F1f/kJlLLABQF/Cp+95+531AUVYUL53I5Ko6fOVbsutCBIO16K7VZItQW+1n84vdbNpST2apgBACp66xrrY+eGzw2E8rJSTyheu+5Mwr1cF6raGlhaIAn99DIBRAVWUk2WLyrzhmSeDxrsGZmePSN1+f/pcEmMvklkJh95pH1nd1I0sgJAkLkAHFpiDZVaR0iljkbOnI558O/z42/gV3I0PT3tpA4UZq7k71DSHEzI1ZER34Slz6aL/Rt+f5/ufuDz5mA+7zlGO7W2LByA9T00fPDJ14aefLPcSnUyyeGMAYPFQYSSYHhjOlD6KGOWJHICsyiiwh8T/IsPm1YN25Z9o7Fe1WPP/b6C9fDmXMD+OWPO5e46KrvbViYOjHQmT0WnaVZv9vkuU0589FoweLB/qc5+3y/hlF+3OVU6fS68Zd6QbQJCgBGKUSfw8AbxWXjEnNmHgAAAAASUVORK5CYII=";
        
                photo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAK8SURBVDhPtZNdSNNhFMb/VoIRQVBs+7sPm/swdS5xNedXI2XqRa1JddGW4YolTcn5kSKCNskuQsVAyEDSpXbTPtTEdFPcKFNHGlrWdiOm4oWikJQXwXx6t6ukwrrohefuOb/ncM55Kep/PQDhRBFE+/bMeP3m1b7m5qYTubk5+4NmUnSAKGd5acn9rLv7wfu5udI/Qt5OT4eb6+o8TucwHre1+S0WS9nAwMDl9fX19u3tbXi9Uygpuf1Vry+49FsISeF9XlzE7OwsBgcHMTIyApfLhYWFBayurmJlZQUNDfdQVGT85na7J7xeb//U1FTL2tpaWSAQOEYtLy+JR0nR5OQEhoeH4PN9wruZGYwODcFFgGNOJ17098Pj8WBubjYUFIRvbW1hY2NDQnV1dYmLi4uRkZ6OZLkclZWVeNjSgsKbBtypKIfDbofDZsP8/AeQWcDv98HvI/L74XaP0VRra6sgnRSz2WwwGAwkJCSAzz+O5ORkVFdXw2Qy4W5tLaqqKhHF40GhUCBbpYLReAsknKba29v5iYknQdM0OBwOREIhMlJSUWgwoKPjCWQyGaRSKXQ6XShAIBBAIomHUqkEGThN1dTURInFYrBYLLAjI8E+chRpirPEkIbU0zJkZWaCy+UgJkYcAghJQBAQhI6Pj9NUU1NjRH29+aNWq91hM1lIYgtwIesi9AVXcSVPDWVqGgFwIRIJQwCRSIS4uNhQJyqVihFarcNhCyPtMmOEwi8q6SmY8m7guiYfpYYiqM4owePxdioqyr/rdFpoNBqo1Wro9foVAgzbdRuWzs5HKYlJuJZ9DvdNVTDm68Fl0YiXxDf29TkO22zWaLvdmtHba9dYrc/FvxzW5ubmIVNJyVNpbFyAy2CCw2Qims9/aTabD+75H3429PT0SNTq8wVkM0q5XL67zX8i/YX5BzzmetmmeRD3AAAAAElFTkSuQmCC";
        
                m21 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAIKSURBVDhPY2BAA3dqAvJ3NDS1IQtX8ssynlq1ZNnpCXFe6Oox+Dd6kuccyw371yirrQqT7FSyD3i2Y/r/+fE2uQQNOBIeXPR8nsf/NYFuvTDF+2Mit93ZUvh/dmaOHUED9ljb2d2aF/X/3uq8H4tTMyN31tekv9zT9n/v5LQ/O1smChA0AKTgfHPIoTc7PP5fmZf6/8jCuv/fTkX9nxNpOZEozeeWTldfUde26fXJuP8/Tof9//e86f/+6bb/lnUtmTw9PJOPoCHzWmrnTGgo/H9weeb/k6vD313fGvVpcVvw/xMrF/4/MX9+BkEDQjU4+icUhf9f2pH5wV6CVSZQhdNx0aSav/UZAf/zjYTj8RrQZqWadSU18//+ugkPqkvqdGCKqwKcfI7GZX46Vlj4qy8r1QmrIXOqG9QuTZ3343py7ZUpHtFS6Io2cCkb3slrfH20ue1JrbUeD4YhZ1dsWne3Y97nbYz6SricuV7QwO3ppJn/NviY1qKo2e3koHSvc9q/dQa+DYQC6ap3/LrtSYFvDhdUscHVnjQ2y9pgHfQ/399Pl5ABGzQtok8lRv7vT0tGpMobDlFHSkxtL05Iz2UkZEAXh5jASe/gj9FmqjPBavf6uXjvMgv+FxsQ5kxIM0z+XlByUbiB+u+YuCwFhjNuvnp1PrHFxGoGqZvHIccyRVmjPdHWThwAtZ/aUrU9jNYAAAAASUVORK5CYII=";
        
                bp = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAIESURBVDhPY2BAAxkdZ+Lmz11cii6+c9u+aQVtR+3QxTH4pZNPTsxsXvtL18ZLGibpHhnptHjlnf/O2ZMSCBqQMGl9Ynz9pf+ZRf0VMMWFdYuX1fRd/Z/W2W9I0ACvpsU6Gf2n/rfPuvS2r6/bbvH85UGTF9z9m92+8cvE1Rs4CRoAUpDed3B1dN3N/1XdR/73Td31P6fz6X/btK56ojTv2ntRdvayxRMK2u/+z2x/+r93zpf/vikbv6/fMqe2pqGcnaAhzRNn9RTXdf8vadvxP7P68JPMurOvY/Nm/1++ad//FbsOxRA0QEDOuzU2r/N/YeuCl0zChmLcCk5mjd3zfoYmVv1X0I8LwWuAvldFUnbf3v+dCzfdq6wtU4MpdgrMcs7q2PCxZOLWH5mVnTZYDWmaMltx7uZjX6tm7b8cltsiia5IzH+2fv38E6/aFu68b+qVjxkbGw4eXzZz05nP8hHTlXA5UyFituuszVf/WafNRU2pDsWLZadsOPvHK3tKA6FAim3buya8fNnz0hmbWeBqzfPWpgTmz/wfEpGhS8gAq/iZkXFNW/4nFbWYwdUGt+/Z6+iXfjGvop2RkAE8lnX8wVWbPqgZB0wEq/UrWefiWzr/X3BEtDMhzTD5pJ6jhZomAT+SU6NkGPxrtumEZpQUEqsZpI7dZTqLum9Ts513qAgAv2XanxrD6GAAAAAASUVORK5CYII=";
        
                expr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAKNSURBVDhPbZNdSFNhGMcVEgq6kL4g6C6CoJsuugu66cKbbroQivCiCCNKCcqgq8IiAstuRMUaXSTTQtmHLtvc3HRra5uenR3bcZu6sx1tm7qzc/a9mfHvPYuJY+fAH87znPf/O8/7PO/b1FT3NLccbT5x/OK5K+efPnp9eXxMf82gNXUY9OaHVovzhZ9mB8fGZ+7Ve0jUevh0K0Oxm783tyqFfBl7f/5it7KHfL4EQchAFPOIxpKI8knML9DzDQA5wUV4zjjngWHWBaPVC/WEGd/MbqhGDbA5fDBZF+GmgqD8a+uKgMByWLfOxbGTksCGeVDMKhJbaYhSHikhC0kqkG8ZMEykfLtX1dIAYeiVN7lsEblsiZReRiFfwWZcQFrMVeOakok0bjx4e7YBYNBbOuX9ywtzRFkiuycAH8tBzJX2lSH5rscDbQ0A9ajuaqG4C+nAYquLQc+rD5BNNYj8/lVrv9MAuNXedSFfrNT9rW9oAm03n2HWQe/nhUwBepO3twFw7MiZUwJp1H65pBdyHN+WkExlsUH2HksI4EljZ+3+jwqTaD4UjSVKMiBTKGPOycBNhzFjXYJxgYbOvIhAJI4YAfygQhrFUQZD0ZTcgzSZxg4ZX5yMj9+RiEkEvy1WzbJcvrBbEeDxBWNO/xqmbD5MGj1QTdigtSxBY14CFeLhCXDwslHY3KzyYfLSwTUHvYqfy5GqwbW8jhVyhCOJVF0VLt/qlmIFXn8wpJujoJ524ruDgcXNgqua/5dek/dXJKMMoIMRlksgJF+cZBpcUsAG6cFBRckkzHamqAj4/MX0acq8OKIxel6qNQs9g6rp7vdDk/f7h7V33w1rO573qa93Phm41N7df7IG+AfiYFhM17QGAQAAAABJRU5ErkJggg=="; 
        
                podk = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAJ6SURBVDhPY2BAAvJyPjz52W0zs9ObZihoRnHDpMzskmVq6mcsS0msb5eSDWBC1oPCzs5oz5g/b21fY9Wk2pT4+myYZFx03aTa0p6EWTNWLE+Or3fCaUBtxRTzWbNW721unHk0NLDUH6bQyTalpDivfVtf99yDdeUTpXAaEOpXojRv7tof9VWTLyArkpULYcpLa/w0bcqiJ/o6AXCvYRjU3z1v4YL5a/7npDZPRJeMCS7ZuWjhmv+9XbMqsLrA3ylXftHCVb8n9s7+7+mQa4WuyN0+N37B/NX/F8xf+dLUIJwTw5DKos7G2TOWLMhPq7uMzQYNxViu4tyOZ9t2HOjLTCiLwlCTGV92tba0Y1JMQFELrkDydUhbVl/evjohJGsDihpOIXvx7NiSp7UlnQ887XMjcRngbJZSl5tQdjQuMPsOihpNjVCT5qqe3ZN6563wsMmJwWWAt31hY2v9pCmlWU03UdSoq4cYNZS1/581ffnb1Oi6+dgMiA/vYsxO6Tw6Y9qKpw1VE3+hqOEVdROqr+j4VZZX7VKWWf0n0a8+N8GnCZ5ky3JnseemTuhpqZv6urdzdlxlcfcTDEsy4gt2dDR2/F8wd/mO3vapL9pqJt9rrpi8rKV62urWuukv+rrmnZs1Y+XVlvpJ/1PjKvowDPB2ydSb0D3126yZ8zbPnbP4/rLl6/7PmbX4/6wZS/7Pm7vqf3vjhN3FGVXnk0Kzn6qpeYphDadIvyL7zqaJD2fPmvd/5oy5/+fPXfq/v2vK/4q8qv95ifn/YwLTLpgbh6jjzAsgCWFpf86k8PKYvNSyRbkJebvSo7N3RgekzXSwjPBhF7BgRtcMADEaBGpH3X22AAAAAElFTkSuQmCC";

           
            var tw_count = 0;
            var tg_count = 0;
            var badge_count = 0;
            var star_count = 0;
            var mob_count = 0;
            var rudsert_count = 0;
            var litsa_count = 0;
            var expr_count = 0;
            var kup_count = 0;
            var mon9_count = 0;
            var m21_count = 0;
            var bp_count = 0;
            var podk_count = 0; 
            var photo_count = $('img[src="/@/images/obj/photocamera.png"]').size();
            var key_count = $('img[src="/@/images/obj/key1.png"]').size();
            var pelm_count = $('img[src="/@/images/obj/drugs89.png"]').size();
            
                if ($('img[src="/@/images/obj/tooth-white.png"]').size() > 0) {
                  tw_count =  $('img[src="/@/images/obj/tooth-white.png"]').next().text();
                  tw_count = tw_count.replace(/\#+/g,'');}
        
                if ($('img[src="/@/images/obj/tooth-gold.png"]').size() > 0) {
                  tg_count = $('img[src="/@/images/obj/tooth-gold.png"]').next().text();
                  tg_count = tg_count.replace(/\#+/g,'');}
         
                if ($('img[src="/@/images/obj/badge.png"]').size() > 0) {
                  badge_count = $('img[src="/@/images/obj/badge.png"]').next().text();
                  badge_count = badge_count.replace(/\#+/g,'');}
        
                if ($('img[src="/@/images/obj/star.png"]').size() > 0) {
                  star_count = $('img[src="/@/images/obj/star.png"]').next().text();
                  star_count = star_count.replace(/\#+/g,'');}
        
                if ($('img[src="/@/images/obj/mobile.png"]').size() > 0) {
                  mob_count = $('img[src="/@/images/obj/mobile.png"]').next().text();
                  mob_count = mob_count.replace(/\#+/g,'');}
              
                if ($('img[src="/@/images/obj/item3-1.png"]').size() > 0) {
                  rudsert_count = $('img[src="/@/images/obj/item3-1.png"]').next().text();
                  rudsert_count = rudsert_count.replace(/\#+/g,'');}
        
                if ($('img[src="/@/images/obj/item3-3.png"]').size() > 0) {
                  litsa_count = $('img[src="/@/images/obj/item3-3.png"]').next().text();
                  litsa_count = litsa_count.replace(/\#+/g,'');}
        
                if ($('img[src="/@/images/obj/item3.png"]').size() > 0) {
                  kup_count = $('img[src="/@/images/obj/item3.png"]').next().text();
                  kup_count = kup_count.replace(/\#+/g,'');}
        
                if ($('img[src="/@/images/obj/item3-2.png"]').size() > 0) {
                  mon9_count = $('img[src="/@/images/obj/item3-2.png"]').next().text();
                  mon9_count = mon9_count.replace(/\#+/g,'');}
                    
                if ($('img[src="/@/images/obj/item19.png"]').size() > 0) {
                  m21_count = $('img[src="/@/images/obj/item19.png"]').next().text();
                  m21_count = m21_count.replace(/\#+/g,'');}
            
               if ($('img[src="/@/images/obj/item9.png"]').size() > 0) {
                  bp_count = $('img[src="/@/images/obj/item9.png"]').next().text();
                  bp_count = bp_count.replace(/\#+/g,'');}
        
                if ($('img[src="/@/images/obj/item13.png"]').size() > 0) {
                  expr_count = $('img[src="/@/images/obj/item13.png"]').next().text();
                  expr_count = expr_count.replace(/\#+/g,'');}
        
                if ($('img[src="/@/images/obj/item11.png"]').size() > 0) {
                  podk_count = $('img[src="/@/images/obj/item11.png"]').next().text();
                  podk_count = podk_count.replace(/\#+/g,'');}
				
            
		$('ul.stats').css('cursor', 'pointer').attr('title', 'Жми и качайся!').click(function(){
			document.location.href = '/trainer/';
		});
		$('#stats-accordion dd div.button[onclick]').parent().remove();
		
		$("#stats-accordion > dd").css('height', '210px');
		$('<dt><div><div>В наличии</div></div></dt>').appendTo("#stats-accordion");
            $('<dd><ul class="stats"><li class="stat odd"><span class="tooth-golden"><i></i></span>'+tg_count+' и <span class="tooth-white"><i></i></span>'+tw_count+'</li><li class="stat"><span class="badge"><i></i></span>'+badge_count+'</li><li class="stat odd"><span class="star"><i></i></span>'+star_count+' и <span class="mobila"><i></i></span>'+mob_count+'</li><li class="stat"><img src="'+rudsert+'" tooltip="1" title="Рудный сертификат "> '+rudsert_count+'</li><li class="stat odd" style="height: 16px"><img src="'+m21+'" tooltip="1" title="Пассатижи м21"> '+m21_count+' и <img src="'+bp+'" tooltip="1" title="Модификация +3 к статам "> '+bp_count+'</li></li><li class="stat" style="height: 16px"><img src="'+photo+'" tooltip="1" title="Фото у Лелика"> '+photo_count+'</li><li class="stat odd" style="height: 16px"><img src="'+podk+'" tooltip="1" title="Верблюжья подкова"> '+podk_count+'</li><li class="stat" style="height: 16px"><img src="'+keyURL+'" tooltip="1" title="Ключи для сундуков"> '+key_count+'</li><li class="stat odd" style="height: 16px"><img src="'+mon9+'" tooltip="1" title="Билеты к Моне"> '+mon9_count+' и <img src="'+litsa+'" tooltip="1" title="Лицензия наёмника"> '+litsa_count+'</li> </ul></dd>').css('height', '200px').css('display', 'none').appendTo("#stats-accordion");

		$("#stats-accordion > dd").css('height', '220px')
		$('<dt><div><div>Навыки</div></div></dt>').appendTo("#stats-accordion").click(function(){
			document.location.href = '/player/skills/';
		});
		
        $('img[src="/@/images/obj/key1.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/item1.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/item5.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/item7.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/photo.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/star.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/mobile.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/tooth-white.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/tooth-gold.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/badge.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/photocamera.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/item19.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/item11.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/item9.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/item3-1.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/item3-3.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/item3-2.png"]').parent().parent().css('display', 'none');
	}
	
	function setButton(name, href){
		return '<div onclick="document.location.href = \''+href+'\'" class="button"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">'+name+'</div></span></div>';
	}
	
	function setButtonAjax(name, id){
		return '<div id="'+id+'" class="button"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">'+name+'</div></span></div>';
	}
	
	var stat = 0;
	$(".stats-cell").find("dd:first").find("div.label").each(function(key, el){
		stat = stat + parseInt($(el).find("span").text());
	});

	$(".stats-cell").find("dt:first div div").text("Все статы: "+stat);
	$(".counters").remove();
	$(".footer").remove();
	$(".loading-top").remove();
        
	var stat = new Array;
	stat[0] = 0;
	stat[1] = 0;
	$("ul.stats").each(function(key, el){
	    $(el).find("div.label span.num").each(function(key2, el2){
	         stat[key] = parseInt(stat[key]) + parseInt($(el2).text());
	    });
	});
	
	var name = $(".fighter2 span.user a").text();
	var tugriki = $(".result span.tugriki").text();
	
	var form = '<br/><br/><br/><br/><form class="contacts-add" id="contactForm" name="contactForm" action="/phone/contacts/add/" method="post"><div class="block-bordered">';
	form = form + '<input class="name" type="hidden" name="name" value="'+name+'">';
	form = form + '<input class="comment" type="hidden" name="info" value="Выбито '+tugriki+' тугриков!"></td>';
	form = form + '<input class="comment" type="hidden" value="victim" name="type"></td>';
	form = form + '<button class="button" onclick="$(\'#contactForm\').trigger(\'submit\');"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">В жертвы</div></span></button></td>';
	form = form + '</form>';
	$(".viewanimation").after(form);

	var rupor = '<form style="padding-left:15px;padding-right:15px;" action="/clan/profile/" name="massForm" id="massForm" class="clan-rupor" method="post">';
	rupor = rupor +'<input type="hidden" value="clan_message" name="action">';
	rupor = rupor +'<textarea name="text"></textarea><br/>'+setButtonAjax('Написать всем', 'button_szhertva')+'</form><br/>';
	$("#tutorial-pers").before(rupor);
	$("#button_szhertva").click(function(){$('#massForm').submit();});
	
	var raznica =  parseInt(stat[0]) -  parseInt(stat[1]) - 10;
	if(raznica < 0){
		$(".button-fight div.c").text("Осторожно!!!");
	}
	
	var lvl1 =$(".fighter1 span.level").text();
	var lvl2 =$(".fighter2 span.level").text();
	$(".fighter1 span.level").text(lvl1+" - "+stat[0]);
	$(".fighter2 span.level").text(lvl2+" - "+stat[1]);
	});
	

if($("div[rel='block_step1']:visible"))
$("tr[rel='clan2'] td:nth-child(2) a:last-child").each(function(){
$(this).after("<u id='tim"+$(this).attr('href').substr(-6,5)+"'>...</u>");
$.get($(this).attr('href'),function(data){
var t=data.match(/\/([0-9a-f]+)\/animation/m);
var m=data.match(/<br>(\d\d:\d\d:\d\d) \(/m);
$('#tim'+t[1]).text(m[1]);
})
});

	if(typeof(player)!='undefined') {
	var q0uid=$("input[value*='moswar.ru']").val().match(/\d+/);
	var q0_lvl=player['level'];
	}
	$('#servertime').before("<br><span style='position:absolute;right:20px'> <a href='/shop//'>Магазин</a> <a href='/berezka/'>Березка</a> <a href='/nightclub/shakes/'>Коктейли</a> <a href='/huntclub/wanted/'>ОК</a> <a href='/bunker/'>Бункер</a> <a href='/casino/'>Казино</a> <a href='/nightclub/'>Клуб</a>  <a href='/shaurburgers/'>Шау</a><a href='/metro/'>Метро</a> <a href='/neft/'>Нефть</a>  <a href='/clan/profile/warstats/'>Война</a>  <a href='/factory/'>Завод</a> <a href='/sovet/'>Совет</a> <a href='/player/"+q0uid+"/'>Я</a> <a href='/automobile/'>АЗ</a> <a href='/bank/'>Банк</a> <a href='/pyramid/'>MMM</a> <a href='/nightclub/shakes/market/'>Торговля</a> <a href='/nightclub/jobs/'>Задания</a> <a href='/automobile/ride/'>Вжжж</a></span>");
	$("b:contains('"+player['nickname']+"')").each(function(){if($(this).parent().get(0).tagName=='SPAN') {$(this).css('background','#ff0');}})
