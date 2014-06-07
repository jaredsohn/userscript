// ==UserScript==
// @name        gcimgreplace
// @namespace   http://ferrarigirlnr1.blogspot.com
// @description Replaces ugly new icons by icons from the old theme
// @description Created by FerrariGirlNr1 and Durvir
// @description Contact: theferrarigirl@web.de
// @include     http*://www.geocaching.com/seek/cache_details.aspx*
// @include		http*://www.geocaching.com/*
// @include		http*://www.geocaching.com/seek/log.aspx*
// @version     1.1
// @grant 		none
// ==/UserScript==

function replaceIcons()
{
	// Get all images from the listing
	var images = document.getElementsByTagName ("img");
	var index=0;

	while(index<images.length)
	{
		//DNF
		if(images[index].src == "http://www.geocaching.com/images/logtypes/3.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhFAAUAPcAAOzt8t/m8OXq8OPq8QBNkZu61gBOkABLjQFNjwpamw5enxFttyV2uTF/vjiBv9rm8Obs8QhuuQlvug1enRJ4xBJ2wBFutBltqxtztR14vB14uxtwryR3uSd7uih8uyh6uTeEvleXyFqYxrXO4tfj7Ap8yAl1vwp0vg5utBB2wA9wtRF2vhJ7wRF2vBJ2vBR7xBlztBpuqx12th54uSF4tSF2siV7uSV7tyZ7tyyBvzGDvlOWxVWYxVaVwVmXwXyu0t7p8eLp7gx9xhKJ0RiR2iyFvy2FvziUzTuW0TuVzT2Y00Sj3k+r43eszI682d7p8BKL0xKM0RaQ1hmY4RiS1hmS1xqY3Sim7Cij5yym6TiWzkKu6TuZ0U6v5la07Fa06lq78Vu78Vq78Fy78Vu67l288WO/9WbG+2XA9WXB9WrJ/mrI+4y714681rLP39/q8Cel5ymo6TGu7UC38kC28UC18EKw6lG+9FO78Uuo2lW78lW78VW78Fe88Ve78Fm77li77V3E91q88F7B9F2+8V+/8mHB9GPD92TF92PD9GLA8mHA8WbG+WXF+GfI+2fG+WTB8mjI+2jK+2fI+GbD9WnI+2nK+2jI+GzM/mrJ+2zK/GzM/GvK+2jD9G3K/GzM+2vI+Cuu6Sup4y+w7i+v7S+u7DOw6T228EC58T+58EO58kO68ES68US68Ea68Uq88k2+9Uy+8U7B9FHE+VHE+FG+8lO/8VnI+1nG+Va+8FzE9V3E9V7E9V/D8WXE8mjJ+GvM+Cmv6dfm7N/p7eLq7ezw8eLs7f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMcALAAAAAAUABQAAAj/AI8JHEiwoMGDCBMOfPOAmEKCA3xkWPGiwgwRQRQWUAGF1BxWdEoNWdAGoZMIwWbp6jVmUCBaoSSwMQgExZVbTIp8MsPJSBdccSw8Kdgjyis1OAwUokQIQQdgsaDsKKhhlB5MNwiE8SXmgI1NueTIIAghRao+mZLEiLTI0QUkoAShaiFg4BMKqv6kecSokqFKjy4lCrOKRYCBxVzUAYRGkiZEZQ55WqMIzKkWAAh6gIPnTJ4NExIo2LBkki0sHwo2KQFLCw0lXsh84VLjiCwhPwxymGKH169GkDpZ2rXFCoODwmBIaXWHzx4/tVwRwUACoTEQJ6iIMpWligkHwx66DQnRIIcOHiMeql//MCAAOw==";
		}

		//Write Note
		if(images[index].src == "http://www.geocaching.com/images/logtypes/4.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQALMLAAAAAP///+fn5/8AAMfHx9fX1wgICJeXl7IAAPf39/+ysv///wAAAAAAAAAAAAAAACH5BAEAAAsALAAAAAAQABAAAARacMk5x6B4HhtuPkAIDIjiSSIgrAKJnAtACEFtmXA823USABgZrSZIAH5BQqEoKiApwlBhWgNCZ9Sa4TkRag0Gp7U7A0+dXBQWHaCN1awVQZQkzEWHTAyvp0QAADs=";
		}

		//Update Coordinates
		if(images[index].src == "http://www.geocaching.com/images/logtypes/47.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAPcAACm9KWNj53t754SE54TWGIyMpbXnEL2998bvCM7vCN7eMe/vGPf/AP8AAP8A//8IAP8hAP8hIf85AP+1tf+9AP/e3v//AP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAA4ALAAAAAAQABAAAAiZAB04ODAggMGDAQQMOCBwYAEFFiJKtLBAQQGGBwpMtEBBAgQIEigwuDgAokQKDyZUqDDhAQUFAgQsmChBZYQILCUsEBBgI4QKERo0wAnBgsGNNYHinCDBaM+JKFWydOl0I0ePIClEPIoAgFcAVrf2ZEDga9iqEbuCDRugpEQDazcqWKhRYgKrIzE+DFvxYsMDPBEajMnQQUAAADs=";
		}

		//Needs Maintenance
		if(images[index].src == "http://www.geocaching.com/images/logtypes/45.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAJEAAAAAACA/tP///wAAACH5BAAAAAAALAAAAAAQABAAAAIuhI9pwu2+XJjhxUYrBC9bLlGfkJXiYpoCmnpsO60gJm5d3VyMZ4dx/wjKFERDAQA7";
		}

		//Owner Maintenance
		if(images[index].src == "http://www.geocaching.com/images/logtypes/46.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAJEAAAAAACKUH////wAAACH5BAAAAAAALAAAAAAQABAAAAIuhI9pwu2+XJjhxUYrBC9bLlGfkJXiYpoCmnpsO60gJm5d3VyMZ4dx/wjKFERDAQA7";
		}

		//Post Reviewer Note
		if(images[index].src == "http://www.geocaching.com/images/logtypes/18.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEwATAPfNAEuLSf///zMzZ9opEtLS3QEBAerIn7SneP7+/ubo5+m/l/7dA/3+/Yqej9jBlau2rdK+kSJ2Lxx4LjSSNkeOVvb698DYxuXGnOHEmlGqQSGCMY65l9Xl2UmHIt3q4KXGqh56M6LFqnuwfIWzj4+6lJzCpYKyjXbATjaaOCt+PGasTbqZbtvBlkqjPih8O4HBatfAlX7AVlynTtfm2kWZRG+laRhwKxR4K36yfXOscuvy7afYdDOEQszf0HSqdNfuuldXgfv9/GenT7zVwV6oWPr8+l+mUGi6SZDOYRV3LHu3YZvCoHm9XOm9lRJwJ3uUgTaCPIO+dRt5LxpxJoCsiTKNN2C2RzOKNo7NX1+xRlqrRPH28jOMQMbnn02sQdfAlHOofyN2NWu4W/7kNXGnfM/rrJbQYBlvK3qthhx0LBxxLDWEQonKVjaYOC6AOJi+oN/Dmd3CmGi6T1CuQWaqVvn7+ufHnXK/TITBb3qUgCN8N0OhPSV4N9O+kmWuSC1+P3a7atXttrbfiOjw6XevdRl0K4LHUt/r4TCCQYC4cFayRJ/EpFmZZmGebeXv5+rHnk+kVh10LavLsiV6OOXEm02GR16aazaFQ0mIRv/++Nzp3rnTvrvVwS2LNB1yLDmVOv7dAWerVFGZSDSWN3a/TkWNU+nInobHWnXBTjSCRW2pb0uQWiGAMHm2a1WWY5/AkVyrTWW3SDCUPh+AMjuVOG6qcDQ0Z5/Dp1ijST2ENCV9NX/FWkuhRieCMlCGVXm0cD+IQSl+M4jJVxx7LqDEplynW8LYx2q0SnG1UOPFm162RySMOVanT////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAM0ALAAAAAATABMAAAj/AJsJHNgsQIGDmQgqHBjA4BhQCwo0XDhw0AgyHwpEfAUGzYwACx3x+MSrSq4CHTTIWgbCAsiBdUox+yUiCo0pnQARqgUJ0RaCnK60CkCACh5aYnwQIJCDy62XARrBwkFAgIBEcl5YJUCsGAUEAoOsYUKCQAABNXYpEUC0BxE9RQpqChZjEQFbAnwJE7LVg4xhxgLouNSClKoAQASIQuXHaoAlx/boOrRhwhxlWXDRUXEKCRZkoYxoOaJoFKNUKLxYuWPIjKAyPwJ12cHmRKwMbQql6AWgt+/fwN04ccUKQLI4Dr70gQDDAQs4F+yYAjDLBQcpwAAYMPCoyYDvAxRsR+99QxKCNxKgAMCgADx4SgAwJTHBoBmCIX/SVOp9oP+K3hFMUkJ9AgVQwSaW8GGDGpF4ckYYq4RA0UAJPNDAE3k08EACCgUEADs=";
		}
		
		//Also Reviewer Note
		if(images[index].src == "http://www.geocaching.com/images/logtypes/68.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEwATAPfNAEuLSf///zMzZ9opEtLS3QEBAerIn7SneP7+/ubo5+m/l/7dA/3+/Yqej9jBlau2rdK+kSJ2Lxx4LjSSNkeOVvb698DYxuXGnOHEmlGqQSGCMY65l9Xl2UmHIt3q4KXGqh56M6LFqnuwfIWzj4+6lJzCpYKyjXbATjaaOCt+PGasTbqZbtvBlkqjPih8O4HBatfAlX7AVlynTtfm2kWZRG+laRhwKxR4K36yfXOscuvy7afYdDOEQszf0HSqdNfuuldXgfv9/GenT7zVwV6oWPr8+l+mUGi6SZDOYRV3LHu3YZvCoHm9XOm9lRJwJ3uUgTaCPIO+dRt5LxpxJoCsiTKNN2C2RzOKNo7NX1+xRlqrRPH28jOMQMbnn02sQdfAlHOofyN2NWu4W/7kNXGnfM/rrJbQYBlvK3qthhx0LBxxLDWEQonKVjaYOC6AOJi+oN/Dmd3CmGi6T1CuQWaqVvn7+ufHnXK/TITBb3qUgCN8N0OhPSV4N9O+kmWuSC1+P3a7atXttrbfiOjw6XevdRl0K4LHUt/r4TCCQYC4cFayRJ/EpFmZZmGebeXv5+rHnk+kVh10LavLsiV6OOXEm02GR16aazaFQ0mIRv/++Nzp3rnTvrvVwS2LNB1yLDmVOv7dAWerVFGZSDSWN3a/TkWNU+nInobHWnXBTjSCRW2pb0uQWiGAMHm2a1WWY5/AkVyrTWW3SDCUPh+AMjuVOG6qcDQ0Z5/Dp1ijST2ENCV9NX/FWkuhRieCMlCGVXm0cD+IQSl+M4jJVxx7LqDEplynW8LYx2q0SnG1UOPFm162RySMOVanT////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAM0ALAAAAAATABMAAAj/AJsJHNgsQIGDmQgqHBjA4BhQCwo0XDhw0AgyHwpEfAUGzYwACx3x+MSrSq4CHTTIWgbCAsiBdUox+yUiCo0pnQARqgUJ0RaCnK60CkCACh5aYnwQIJCDy62XARrBwkFAgIBEcl5YJUCsGAUEAoOsYUKCQAABNXYpEUC0BxE9RQpqChZjEQFbAnwJE7LVg4xhxgLouNSClKoAQASIQuXHaoAlx/boOrRhwhxlWXDRUXEKCRZkoYxoOaJoFKNUKLxYuWPIjKAyPwJ12cHmRKwMbQql6AWgt+/fwN04ccUKQLI4Dr70gQDDAQs4F+yYAjDLBQcpwAAYMPCoyYDvAxRsR+99QxKCNxKgAMCgADx4SgAwJTHBoBmCIX/SVOp9oP+K3hFMUkJ9AgVQwSaW8GGDGpF4ckYYq4RA0UAJPNDAE3k08EACCgUEADs=";
		}

		//Photo
		if(images[index].src == "http://www.geocaching.com/images/icons/16/photo.png")
		{
			images[index].src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHfSURBVDjLpZO9a5NhFMV/bxowYvNRjf1IoCDo0KFJBVHEVbeCi5N/gM6KruLi6KiDKA6KIC6CQwdtBxfRrUGHFlTQIlikjTFpkua55zo8r7aDipALd3keOOdwzrmJuzPMZF/cOPFXBMmRHJMTTJiJYCIEESy+ZQGqczPIDNxxd/AMDriBu+MSCkJmSA4CJ8Pym+UIIAs0177S3Wz9F3O+WGCiMrmjwM3pbrZ4fvo17kR237XAtcolRvdOA+L+9TscHB/HTGQAlLqwuHWbxa1b9JMVTBDSHRi82qijbgPXNsGEpx5kouYo+2jpI/3kCUudiwzUJBgMAoQAjf4ZFtZP0mq/x0xIYPJUQQoQLHAsX8fMeNk7y4DVCGKw0q7ytHmByx/u/lYgOVnJUbBomAa8azWYr5b50unRGZln48ccYzrH5/VTtHuTKIxQk8dUdgMEE/XyN2YPTFHJHaZWFPIan/KriEccqT5ExJi15FiwWCSTo+CYiYk9h5CL4NvIhSOmctOxCwgh3J3vauAWnc8GEzInt2+U3s1nuEWwmPlOByzthuSUSyV+XUDWTOAJxbEyhcJ+pPgxc/4KnbUFQOTKx3n74B5uQhI4JEkMMHl8ddZ3d/tfzH+aZNhrzDDk/ARfG6G/LNZPQgAAAABJRU5ErkJggg==";
		}

		//Publish
		if(images[index].src == "http://www.geocaching.com/images/logtypes/24.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQALMKAAbMn/f39wAAAACZmQgICABmZpn/zACyjOfn5wCysv///wAAAAAAAAAAAAAAAAAAACH5BAEAAAoALAAAAAAQABAAAARSUElJqp1YisC7yIpAIIYBnEBAfNNmomehTkTwwvHs4vCgCjtezAcMCFED4uY4DBSZh4HseZQ6P0ueNOFsBQqAaEFKxBTHyfEVtOlwWKAQcJ6JAAA7";
		}

		//Retracted
		if(images[index].src == "http://www.geocaching.com/images/logtypes/25.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQALMIALIAJgAAAP9CQvf39/////5yTAgICMwAM////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAQABAAAARREElpQq0zyzC6NxoScIIAnMAwZiTqDuA2mC4qqCJB12cBjzqezQcUogq3ohFQIiiFB6QqQFiWpjmooOCcUF2HUpJF3ZqJgRCVwGanQ5uRXBMBADs=";
		}

		//Will Attend
		if(images[index].src == "http://www.geocaching.com/images/logtypes/9.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQALMIAP7lTMfHx6enp/f397ImAOfn5////wAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAQABAAAARVEMlJEbk1WwLw+WDIAd0XGEWqXtxlomrBssFXCLB8pbs94DpCytA7FAY/lLBgEBRTSCBToCvYjoIArql93pA/AZhqNYrB6Gg5G2i739qQfP7R2O/2CAA7";
		}

		//Attended
		if(images[index].src == "http://www.geocaching.com/images/logtypes/10.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAPcAAJm/apjCYLfhf67Ii5Kld4q2Q7Lea3iiJoqxPpS7SKfRVavVWbzmaqG/Z7bUfLDNe2qZC2uaDG2aDG+cDmKJEninGX+uIICnMJvIOoWpO6/cTpzAUpSwWb/bhJ+0cZ6zcJ2xcqS4e5zNJIKrJ423LZS/MrjpQK3XTbPeUYyjVZ+3aZ+2aKG5a5yyZ6m/dKK3crHGgZyudL3PlbrHm2aOAGOLAH2rA26UC3ykEICsEXymFIGrGZC4I3CRHpzKKpnFKneYJafVNZrEMoGjKrXjO5zGNKLMOI6xMabOOqbQPLTiQrXjQ7DcQZ3DOp7EPbbiR7TcSJy/P4KfNa7USazSSbLYTaDERpy+RbnfVLfdVLTaU46rQY2pQq7SVJ/ATarMU8ftYrfaWpm1T7bYX7LTYJGqTpCpTq3KXpOsUa3KYLTQacHecomeUb7bcbrWcKfAZJCnV5muX6C1ZrvUea7DdrrRgaq+d7rOh5KfcXedCnqgDXqgD36kEYSpHaDGM7LYRbPYTLvhUIiiP5u4SrDPV6jFV5q0UcHgaLbSY8DcbcPgcsnmeKi+aZ6ub////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAI4ALAAAAAAQABAAAAjDAB0J9GBIECOBCBM6giEmjaJFb+C4UIjwhRsphQaVqdOCoiM6hPzocdKlh5cwRyiyOfQnjxYrQMhESakwRSJAgaAgKaIjx48tdxKuQNRnD44aO4QwedLGzocZCGOw4HKDhg8lEzQY4TMGDUIZKtRQ4RFkiQQMSfR8mdMoIR4zV8CUOLBAhI0qZ+RQHIIFBQMFJohMWROHYogOGSiMqAABgQMQHjlsuDDCQoQEDTw6IvAgywkDAgAM0CywCYkCAUirdhQQADs=";
		}
		
		//Announcement
		if(images[index].src == "http://www.geocaching.com/images/logtypes/74.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAKIGANMgKqISGs3NzWVlZZSUlAAAAP///wAAACH5BAEAAAYALAAAAAAQABAAAANIaFas/q6IWSCUgpBRrZLa1nigxglM2pQpMb0AwGRYEYbxrKVD7wcB3YbDUa0yvlGh11kkHzYOdPQxNT0L0dViE2Ej1u9H5UgAADs=";
		}

		//Webcam Photo taken
		if(images[index].src == "http://www.geocaching.com/images/logtypes/11.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAOAKIAAGZmAJmZZszMmf//zP///wAAAAAAAAAAACwAAAAAEAAOAAADP0i6DA4sBNckJC/rN8UQYCgKE+CFkiSWJ5kFqHNOgUKD7DfZGOyauksN4Mu5aoTbr1Vy+JYfXGoli46om6wzAQA7";
		}
		
		//Disable
		if(images[index].src == "http://www.geocaching.com/images/logtypes/22.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAPcAAO/v7/d7e/e1tf8AAP8ICP8YGP8pKf9SUv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAAALAAAAAAQABAAQAhyAAEIHEiwoMACAwQgWMhwoYABBgQKIDCgosWLBAQMDHCx44AABQNQ7EgA5EADCQWoXLkSosADHj0eKCjggIECBgwc0GgQQM2bOHca5BizokkAMItanAkAocKGDB8WEIiSpdWHEX2OLJqRoEiPJXuKJRgQADs=";
		}
		
		//Enable
		if(images[index].src == "http://www.geocaching.com/images/logtypes/23.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAPcAACF7ISl7KTmMOUKMQkqMSmula5S9lKXGpb3Wvc7ezu/v7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAoALAAAAAAQABAAQAiHABUIHEiwoMABARYkGAAgwIEFCw4ECCBAIIKJARpqnGggAIKBHTlKnNjQQMGQGDGaHEhg48aHCwIMEFggQAGIOA80zFigIIICBAYILfDRoIKfQocWJYjSJceBNTECmJrxoc2DAUJqhNlxpgKGOAsYgKhzKgGLEwckgNhx41IFWqVmNUqXYEAAADs=";
		}

		//Archived
		if(images[index].src == "http://www.geocaching.com/images/logtypes/5.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQALMJAP7u5/6yeP5zTv5PLuNQL8EkGP6ZTP///wAAAP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAARKMMkpEb0XHYsxKlxHfaGYaMVmVsYBrqcxvKYmp2XWHm4+IQjZYAj0AA1IAgFYQgAARyVQ+gsAkExlgVYJWJGCLfcXBAuKIiZ6EgEAOw==";
		}

		//Needs Archived
		if(images[index].src == "http://www.geocaching.com/images/logtypes/7.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhDwAPAMQAAP////8AAMz//5mZzP8zM8xmmZnMzGaZzMzM/8yZmf9mmczMzJnM///MzP+ZmcxmZmZmmf9mZgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAPAA8AAAVlIMCMRlkOA6CqyOoih/G6K3ykLK0KKA4sgEYgohIqED4gwBFwCAgEAW8lU0WGgYUASV09A4ktV1UVLAKBAmLtS0mhhSx75b4uENC5aiBIgNdnD2MAfFJrayODA4eMiW09kD0QKiEAOw==";
		}

		//Log Visit
		if(images[index].src == "http://www.geocaching.com/images/icons/16/write_log.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAPcAAP/6+//8/f/3///7///8///9///+//78//z6/f36//79//v5/66u0PX1//b2//39//7+/9zf7vT2/6Wv0qOw0/v8/5+szqCw0qayzNTh/+zw+YKayKCuyeDm8uvx/env++Hn852239Hc7tfi9N7p+9zn+dHa6eTt/N7n9uTs+Z2qvdvo++ny/+vy/Onw+uXs9rbK5dvo+drn+OLu/uz0/+Pr9nKXxJiqwNfm+d3q+ubx/+Dq9u31/+/2/4Cq2szk/tDm/srW5Ozz++vy+urx+ebt9eTr8/L4/32ev4iqzYqsz5CvzoulwKO0xtrs/9zt/9fo+uPv++Dq9PX6/4GkxICjw4Omxoiry6/J4s7o/9Dj9MnZ6Njp+eLx/9nn9PD4/3KUrfH5/9vo8bXL2e/5//T7//P7//j9/7vS2u/3+vn+/+D09eXz9Oj//+7+/vT///j///n///v///z///7//+D//eX49Pv//vL29fj//fn//fH/+en48fv//f3//vv9/Or38HKZfGGNafr/+2yPb523ms3oyfT58/v/+meIW/X/8Zq2jr3Ptfn/9oOwa6PQiz9lKIKqa09wOa7HndHsv9vxzfj+9EBoImaWQnKiTp7Kf5Wlioy4aXOkSHWaVbjhk7zhm7zQq/n/9I2zaLvKrXalRYCvT/j/8f7//YWtVXeZTYWlXIalX53AbHqUTez03/T94vz/9P3/9/3/9fX28f3++Pr79fn69P//7///9v//+P//+////f38+Pr59f/+/P79+/v6+Pv48/////39/fz8/Pv7+/j4+P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMgALAAAAAAQABAAAAj/AP8MG0bAAK9dvXwFA2bAFi0DBvzMmeLBxQsjRYgIGZIizp0HB1CVCaLkipUqVE4iaTJCDrABqKTcAPHhiJkwX76EGcOhhS4CqLww6cGDBosZJWTEaGOhxqwCqLgsUaOhAwoSK3BAWUNhxykIqLQkIRMlxxMnQH5ksTNhhygJck6oiJBmj5suGXSwgYEBjwFcc+CY8GFjwwUxikhtCkTIEJwCFeacuVXLAQMRhSI9AmUK06IGCIbRITBoSwgwgjR9etWq06U+Bn7t6sMHDZY6iSYBSkDJESQ9BnkJABDAACxXqThVGpVJEqKBw97AOTRsDiNPpVipWhUqFh0DCnIJGoO4AMIcS3nkyJrTyNiwYtCJDSN2DPrAYgEBADs=";
		}

		//Watch Listing
		if(images[index].src == "http://www.geocaching.com/images/icons/16/watch.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAPcAAFtVV//3+7Ggqntud//z///3///4///5///8/xIEEwoIE3d3j15fcT0/S6Slqvb3+/r7/QAGDgYOGbrEzgEPHK/F2ld+m0NfagAGCPv+/3TU6gALDYWipsr7/xvx82T8/5jS0ySQkO7///T///X///f///n///P5+fv///7//yXx6B28uITMyQ2pnDXy3g2mklL55Tn/3YeTkQoaF1xsaYaWk/X//O7/95yuovL/9fr/+/f/8/b+8fX77xQXEPz++b3Atf7/+zg5M///9v//+vb29HZ0Z3l4c//++f/99v/++//37H50av/7+BgQDn52dDYwMP/7+/////7+/v39/fz8/Pv7+/r6+vn5+fj4+Pf39/b29vX19fPz8+7u7uzs7Ofn5+bm5tfX19HR0c/Pz8TExLm5ubKysq6urqampqSkpKOjo6KioqGhoZqampmZmZiYmJOTk5KSkpGRkY+Pj4yMjIqKiomJiYiIiIeHh4aGhnV1dXNzc3Jycm9vb21tbVJSUhEREQICAgAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIQALAAAAAAQABAAAAjjAK1IqSKlIBUpVLIUXEhQi5QpWQ5OKWiFIJaDBSdauTJwy8KFBwl6yWOny0QpXKp0CSPFo5Qvb+LwWUPQI5Y2f8oMBOOGjpQ+aaQ4rOIGDxtBWKrImSPlipkxUwTqudPlzCApaALtUVPmDxk4e/wAKiimzhQoAjiEOIJjgAwHLYR8lDKjAwwLTHowAPKBhYK5GGJoePFkB4AVIDz4mLuhgosFRgJcqKFiQoS5DxJIoFHERIoGTigomVsiSBIkCFAUILLkh465VKI0uWHjhBQeJIYcmGsAwogCCIjkyEBABIq5AQEAOw==";
		}

		//Ignore Listing
		if(images[index].src == "http://www.geocaching.com/images/icons/16/ignore.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAPcAAPc/QfZISetLTelYW/9oaftmaPJqbP5yc/92d/uam/+ys/BDSd9GS+9OU/hUW/pZX/FWWv9eY/9jaO5fY/Zjaf9ob/9pbf9pbu9scvRvdPNwdfN4ff+BhPWfovNHU95RWfRha/Zqc+ppceJ/heqnq//d3/pATv1CU+1BT+dVYvddaf5oc/hsefV8hf+9wuavtPPY2v9UZvNUZuZSYu5XZv92g/e+xP/29/9lefji5e5VbfWyvP/4+f/6+/Pu7//O2v/7/P/e6f/k7f/j7f/4+/r2+Pv5+vf19vrt9P/z+//4///6///7///8///9///+//Xz9vb1+vv7/Pf3+PT4+/f8//b8//n9/vn+//b9/vb+//L///X///b///f///n///v///z///7///n6+u329fX5+Pj//fP8+fn//fL/+vX/+/X/+v3//vn7+vj6+fb49/H/9/f/+vz//fD/9Pv//Pr/+/H/8/f/+PX89f7//vv8+/r/+fv/+vf69v7//f3+/P3++fb27P//+P//+v///fz8+vv7+v/55//++//56v368/v48f79+/z7+f779v/9+v/27v/q3fzz7v/l2Pn08uK+svXs6f/59//18v729P/7+v/29P/6+fK0qfLDu//08v/At/bX0vKspP/HwfVrXuewq/vZ1vpWTf+/u/zQzfrY1v/i4PTg3/9qZuNiXfdsZ/NuafZxbP94dO1zbvV6dfCYlP/Bv//PzfrY1//h4Pzg3/pEQ/NLSv9paP9wbvVua/xwb/9ycvdxbt9tbOFxb+x6efSSkfiamPWdm/vBwP/R0P/09PTp6f/7+/79/f////7+/v39/fz8/Pv7+/f39/b29v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANYALAAAAAAQABAAAAj/AJ89czaFCKJBjvCAUYLpEhgwQPKMYQYjx5EqYrgU+qHg1qYwz6L52DELma4nTSSNAoGhw6o6YKBZGtGC1rEgb1BR2ECghqo2Yp5RImGAg4ZaonAcaEWjkp1nS54ZYpWgGDAEsH4Ja2BDEQ8xa55JcTPEmIUMK2SZsIWEiRNqzaAVqUam0wUVMXoxiPQsykNO0vosAhWigK9XwRy4ynWHjpc0egIlgyAh1gkUHiIESDFpjhsmzkzpqEBKgKdDA3g9WCCjhJMmf1KJODXhhRIukD4A2DUM15crbD65YFFK0BMmcBLNIKash5Y2WbwsEyLnBiJAj9RkCqWJyhcxVrZ0IWny5QmiOISgcEHzBUuYPYz8MHpmZBrKM2aSlIn2pBGfgAA7";
		}

		//Bookmark Listing
		if(images[index].src == "http://www.geocaching.com/images/icons/16/bookmark_list.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAPcAAOpMTeN2e+rDxNSTl7iBh+zi4/3u8f/0983Ex9XMz+3N3P/3+//9/u7s7d7T2fTr8Ork6P/2///7///8///9///+/7q4u/v5/Pjy/uzr8O3r9s3I5tLR393d5/39/9DQ0vn6//v8/7a3ufn6/PT4/1VpilFifrTK79LV2hk1XVJ2qo6mytHd7cPL1j1llkVfgJaqwgs6bhY5XylMcitOdFF9rFd1l2+Nrws9bhlFchhDbTFjlCpVfzNfjDJdiFiDrVZ8o3SfyXOaw0xmgU5phHulz3uiy3OOqX6ZtH2TqsLS4rnF0bzI1L3H0cXP2QU4ZxE7YxU/Zx9MdiZWhDNxrCxZgzBgji9chjRkkjBcg0d3pU+Ds0Frk018qEh0m1B/q1SDr1eHtVJ+pVuKtkxvj2eWwFd6mp/H67rP4h5RfiBRfCpdijJlkjVqllCGtFiOvFuRvWGWwmCTvmCRvGWYw2SVvmqbxmGJrG6Rr6rZ/3+YrpCpv9HY3laLtZOmtZGks8fa6QU8Y5CvxHKJmdfp9dnq9KzI1r7V3dHc4MbZ38/e49Xk6fv+//L8/8fLzOfr7OPn6ImutvT9//L9/+39/7Xi5Zu5u+/9/vD///H//9Xh4fX///f///j///n///v///z///7//9Lc29Df3On59sfQzdXb2cTKyO/18+Hn5eHy7Mna0vj6+ers69PV1O/69O758+v07/z/+/v9+u/x7tbc0v7/+97f2ru8tvf48v//+P///f/++MrJxf/++v79+dnY1P/++//9+LKxr//+/P79+/38+vz7+fr599zb2fz38ePc1v759f/7+Pv39OXTydrV0v349ffy7/Ts6f35+OTg3+VUN+jV0eLQzO3e2//18/BgRr2opfhmWdSrp998dv96dPZycOCcm/////z8/Nvb28/Pz////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAOcALAAAAAAQABAAAAj/AGV5mLAA1idQmC5VmMAoxLgKF0gtYoFCgaYMETpwqHQoESIQEvII4WYNAAFDJ1YIivQnyY8zwuwYubYN3ABLMDYQ0lAIjQ8u0eYUwdYtnLhVijCMgsZHyZUq5OgEyfYtgDdcrlDdqmVuCQ8rjOKU0fZMwLJhCBoUSAbMiY40n+DUmWaqVAIRHx6IctSrhQ41oNzIkQYBkgMLp1qpSlWuSRQpI970cYaMWqxqtF4dMPCICRQdDGpQabOjBw0bN2bkwBEj0BMZmYBsufNlTBgsU7R0AaNCjIsUm5DgGXTEjBc2a7KQIVJiyAsTJChlOsgJ0B49fhqBkjRpUydbnkAxI2u2qxixY7t2BdO1y1auX7N2+QIVKpgyXsFYgTJGocIxCgEBADs=";
		}



		//Favoriten Schleife
		if(images[index].src == "http://www.geocaching.com/images/icons/icon_fav.png")
		{
			images[index].src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFNENDRDZENjQzRkVERjExQjQxOUUyNjc3NUIxNEI2QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRDA2ODM4RUZGMjcxMURGOUU3RkQ0QjQzNzhFRENEQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyRDA2ODM4REZGMjcxMURGOUU3RkQ0QjQzNzhFRENEQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFN0NDRDZENjQzRkVERjExQjQxOUUyNjc3NUIxNEI2QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNENDRDZENjQzRkVERjExQjQxOUUyNjc3NUIxNEI2QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnpD8McAAAKpSURBVHjabFNLTxNRFP5mOq+29IUtCqELxSAIYUFYEBLjewPGtRh3Pv6BiUYjcWVg4c64kZULdy5cEBJj3Bg0CpqYEBqpwdKAvCRQOtPO3HvnetoKscDNJDNn7jnfd77v3KtIKbF/dT4WsSwr3+ZQrsUs098uuSMdhjlFW9tzI4G6XO3/QHngBHVdH2eMDfckg7AcgVBSweclbWJFw3fbsdeA6OX/a9R95KNd8cDw9bSGi20E6AqcbVXQzjnOtyg9UdO6ZN1bvVNHuitBf2iPNWnW3c64ArXoYWmLw2MuAsRhJEyc6zbxdZ5j2nY9V8gB+SQ2swdAmtML0l+4368FPuUFcnNl+LQZjJpwFUD6Eu4OQ+qIDltTsbKzsZHSU73kR35PgstY8c1HjjUCcIUHNWZCKCokdSAVQgkr6DulIxnkYKWCe8DEuKVhsFeDzYDJGQZNKmAVduqwkq0T0OSHMkqGD8cPfDkA4Hgs8mNVw2zWg6EFUKbCWrFCYLWcKxcsfMuVIJcxsH8KecMvT0zlbAz2GwiECVcKegTgMwjJEbGA1+/+IJf/hZVC6Wmlpm6MrUb8RoHZ79/Oe3DWOYb6yIMy0Bw30BRScabLIB9smNbJafmse/TAGGkSyBTXT6ub67PpdAohswGtSQuL2RJExMVmdhGaxURjc99Vcn/iUIDKyghfqJllFVEPCbGJLZKh+An4aoTUhHz5qjFw6EGqBo/YTXLuBQ2eTr1b1Q89DOxw4Chq/8LylhxLjR/WQSzDxRo5Z8DnVRPx0ymgPVGkuKUaFzygKHjHiabk7sXaMzHD+RAxG9XEylqhd1voOcUv/3HRPSIjG3Qt42wN1XVQZWdsoXYupINKw78ZxzE12qKZ0WXBF0kaVfurtBeib95hho5TB9t/BRgAXVlUniZtW6sAAAAASUVORK5CYII=";
		}

		//Favoriten Schleife Remove
		if(images[index].src == "http://www.geocaching.com/images/icons/icon_favRDelete.png")
		{
			images[index].src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFNENDRDZENjQzRkVERjExQjQxOUUyNjc3NUIxNEI2QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRDA2ODM4RUZGMjcxMURGOUU3RkQ0QjQzNzhFRENEQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyRDA2ODM4REZGMjcxMURGOUU3RkQ0QjQzNzhFRENEQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFN0NDRDZENjQzRkVERjExQjQxOUUyNjc3NUIxNEI2QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNENDRDZENjQzRkVERjExQjQxOUUyNjc3NUIxNEI2QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnpD8McAAAKpSURBVHjabFNLTxNRFP5mOq+29IUtCqELxSAIYUFYEBLjewPGtRh3Pv6BiUYjcWVg4c64kZULdy5cEBJj3Bg0CpqYEBqpwdKAvCRQOtPO3HvnetoKscDNJDNn7jnfd77v3KtIKbF/dT4WsSwr3+ZQrsUs098uuSMdhjlFW9tzI4G6XO3/QHngBHVdH2eMDfckg7AcgVBSweclbWJFw3fbsdeA6OX/a9R95KNd8cDw9bSGi20E6AqcbVXQzjnOtyg9UdO6ZN1bvVNHuitBf2iPNWnW3c64ArXoYWmLw2MuAsRhJEyc6zbxdZ5j2nY9V8gB+SQ2swdAmtML0l+4368FPuUFcnNl+LQZjJpwFUD6Eu4OQ+qIDltTsbKzsZHSU73kR35PgstY8c1HjjUCcIUHNWZCKCokdSAVQgkr6DulIxnkYKWCe8DEuKVhsFeDzYDJGQZNKmAVduqwkq0T0OSHMkqGD8cPfDkA4Hgs8mNVw2zWg6EFUKbCWrFCYLWcKxcsfMuVIJcxsH8KecMvT0zlbAz2GwiECVcKegTgMwjJEbGA1+/+IJf/hZVC6Wmlpm6MrUb8RoHZ79/Oe3DWOYb6yIMy0Bw30BRScabLIB9smNbJafmse/TAGGkSyBTXT6ub67PpdAohswGtSQuL2RJExMVmdhGaxURjc99Vcn/iUIDKyghfqJllFVEPCbGJLZKh+An4aoTUhHz5qjFw6EGqBo/YTXLuBQ2eTr1b1Q89DOxw4Chq/8LylhxLjR/WQSzDxRo5Z8DnVRPx0ymgPVGkuKUaFzygKHjHiabk7sXaMzHD+RAxG9XEylqhd1voOcUv/3HRPSIjG3Qt42wN1XVQZWdsoXYupINKw78ZxzE12qKZ0WXBF0kaVfurtBeib95hho5TB9t/BRgAXVlUniZtW6sAAAAASUVORK5CYII=";
		}

		//Favoriten Schleife Add
		if(images[index].src == "http://www.geocaching.com/images/icons/icon_favAdd.png")
		{
			images[index].src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFNENDRDZENjQzRkVERjExQjQxOUUyNjc3NUIxNEI2QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRDA2ODM4RUZGMjcxMURGOUU3RkQ0QjQzNzhFRENEQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyRDA2ODM4REZGMjcxMURGOUU3RkQ0QjQzNzhFRENEQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFN0NDRDZENjQzRkVERjExQjQxOUUyNjc3NUIxNEI2QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNENDRDZENjQzRkVERjExQjQxOUUyNjc3NUIxNEI2QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnpD8McAAAKpSURBVHjabFNLTxNRFP5mOq+29IUtCqELxSAIYUFYEBLjewPGtRh3Pv6BiUYjcWVg4c64kZULdy5cEBJj3Bg0CpqYEBqpwdKAvCRQOtPO3HvnetoKscDNJDNn7jnfd77v3KtIKbF/dT4WsSwr3+ZQrsUs098uuSMdhjlFW9tzI4G6XO3/QHngBHVdH2eMDfckg7AcgVBSweclbWJFw3fbsdeA6OX/a9R95KNd8cDw9bSGi20E6AqcbVXQzjnOtyg9UdO6ZN1bvVNHuitBf2iPNWnW3c64ArXoYWmLw2MuAsRhJEyc6zbxdZ5j2nY9V8gB+SQ2swdAmtML0l+4368FPuUFcnNl+LQZjJpwFUD6Eu4OQ+qIDltTsbKzsZHSU73kR35PgstY8c1HjjUCcIUHNWZCKCokdSAVQgkr6DulIxnkYKWCe8DEuKVhsFeDzYDJGQZNKmAVduqwkq0T0OSHMkqGD8cPfDkA4Hgs8mNVw2zWg6EFUKbCWrFCYLWcKxcsfMuVIJcxsH8KecMvT0zlbAz2GwiECVcKegTgMwjJEbGA1+/+IJf/hZVC6Wmlpm6MrUb8RoHZ79/Oe3DWOYb6yIMy0Bw30BRScabLIB9smNbJafmse/TAGGkSyBTXT6ub67PpdAohswGtSQuL2RJExMVmdhGaxURjc99Vcn/iUIDKyghfqJllFVEPCbGJLZKh+An4aoTUhHz5qjFw6EGqBo/YTXLuBQ2eTr1b1Q89DOxw4Chq/8LylhxLjR/WQSzDxRo5Z8DnVRPx0ymgPVGkuKUaFzygKHjHiabk7sXaMzHD+RAxG9XEylqhd1voOcUv/3HRPSIjG3Qt42wN1XVQZWdsoXYupINKw78ZxzE12qKZ0WXBF0kaVfurtBeib95hho5TB9t/BRgAXVlUniZtW6sAAAAASUVORK5CYII=";
		}

		//Premium Member Icon
		if(images[index].src == "http://www.geocaching.com/images/icons/prem_user.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhDgAKAPQAAAsAAAAHAA8AAAkAAQ4AAAQAAAYAAAAHB//FFgEACQALAQYAAgoAAP++FP+4Kv+4Efy7Cf++GPq/G/X19QAAAP+8AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABYALAAAAAAOAAoAAAVDoGVVZAUAZSWuZDFNBbmKpES9VDmPlfIqshmkRCA4dLMSAoFcPUoGQyUSXDUOjBfj0NhVAq/wJLCzLAaCREIwWKgsIQA7";
		}
		
		//Lackey Member
		if(images[index].src == "http://www.geocaching.com/images/icons/ch_user.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhDgAKAPYAAAsAALAAFwcAAAADDAgAAwcBBQoABaMBALAADwAKCQAIAP+8C6kDA6kJALMEAAAADqcDARQADAQEEAoFAAoAAPq+Evy7AP+7HP+8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABkALAAAAAAOAAoAAAdTgBkZGBcYGBQUhoaCjIYTCAgTi4yDhgMQEAOKlJUCDQ0Ck42KAACKGJwYFRgLC5uUhhYYCQmnqQoEDg4ECqiwBQwBBwcBDAWcGQYSDxERDxIGvoEAOw==";
		}

		//Basic Member Icon
		if(images[index].src == "http://www.geocaching.com/images/icons/prem_user.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhDgAKAPYAAAADAgEAALKysrK3ugABBAUBALe3twMDAwEBAfX19QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAsALAAAAAAOAAoAAAc7gAuCggMEBAODiYMBCQkBiooFjQWQiQCNAJWDAggIApqglQZ/fwagfweNB3+Vf42vCayKCKQHq38Ig4EAOw==";
		}

		//Archive Listing
		if(images[index].src == "http://www.geocaching.com/images/icons/16/archive.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQALMJAP7u5/6yeP5zTv5PLuNQL8EkGP6ZTP///wAAAP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAARKMMkpEb0XHYsxKlxHfaGYaMVmVsYBrqcxvKYmp2XWHm4+IQjZYAj0AA1IAgFYQgAARyVQ+gsAkExlgVYJWJGCLfcXBAuKIiZ6EgEAOw==";
		}
		
		//Waypoints
		if(images[index].src == "http://www.geocaching.com/images/icons/16/waypoints.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAPcAAMrAwcW8ve/l5v/4+f/09v/7/P76+//2+e3k58bAwv/8/e/k6P/6/P/7/f/9/snAxb+5vcW/w+zn6//2///5///6///7///8///9///+/+vm7f79/+Da6Ly5wMfEy8TCx/j2+/Tx+v38/8LBxsnH1MLBx+fl88TDy7u7x/z8/sLE0cTFyfX2+nuDmsXI0aqyxb3E1L/CyeXo78DBw1pxm7a/0HODnK24yufq7+Tn7ENdgGB3lzVYgklpj2h8lXCFoNTb4+Tr84CJkv3+/0JyoE9wj2WDn1ZrfoKYrcDK09ng5kJriVdwhHSQpmFzgXN4fMbKzejs74umuZ+xvdfu/J+stHuMlubr7vj9/87W2bnBw8rS1Pr+//n+/6q8vPf//7/Fxfn///v///z///7//8DJyPL8+/T9/Ov08+n//PD//fj//cHKx/j+/Pv//fT29d/q5La/uuTt6NXb1/f9+e/18fT+9sHGwr3Jv73Hvvj/+PT79Njp1+jt5/T88fj99ry+u/7//fj/7/z/9P7/++bo3fDy5/v89v7/8/7/9f//7///+v//+////eXiz//++vr59Z6Rbv/++56Qa4qCbf/67rSQRP/89v/+/MfGxL6PN9esXbihd8qUPObj3tSIGtKSMefDj//79duCCtV0ANNzANFzAtp7B7xtCN2DFdmYRsnEvsnCuvbv58iCOtimcf/+/dRnAOnbzsR5QreklcOxo/Lk2eXc1cvGwvz38/jz78bCv8nFwv/7+Pz49fv39NN1NdpUAMx5Q9WSaMFHAMhJBM9iIcvCvfjv6szHxPv2881QDsdzR9O9ssI+AOfHuO7h27k2ALs6A68vAsuaibNVObeGeOTCuKo7IMvHxv76+erm5cyYjcm/vdu4svLn5ejLx+XJxf/m4v/49/nn5caWksW7uv/7+//9/f////v7++fn58HBwf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAO0ALAAAAAAQABAAAAj/AAeIEXGpgQJYFjCIUZOQgbZGALS4WEECSh5AD7KxKTGCXSZJEKrUcGQLGZ0wBwgwIhNGzp1GHZzY2KRqmLdWukJ8yUUIThx1KJjs6FSKWLVXoZ7JEieqT5khKproiPQpmDRTo4AJKxfOExgy5l7woAQqVrRlqVAZs3YNGi9M3WD0eKKJlLNpszjVAkdu24wUx4AYOWLpVDFs1OZQMbBBRox0rKIgWTLJFTNut+pcONNFxokMrN5MIWKFVjM0afZQ+NNIQgQHqyAlofFji6E1dhZhSfRIQABMuHwpaeEjS6Vf4y6ZOXQOQYJAyZThkFLkBoguGwro4YJBwwc3u9blI/AiBA+fKwu+mQhSiIOHNo3Siem1iAWFCYMEjamgyA8idAEBADs=";
		}
		
		//Edit Attributes
		if(images[index].src == "http://www.geocaching.com/images/icons/16/edit_attributes.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAPcAAAcDBAgEBSMUGQwABhMDDQoABxAADREBDh4OGxYPFwQABQ4LEhQRGAADBwAIDAUQFAcLCgEKBwQNCjtEQQAGAxMeGKizrQAFAAAEAAABAAUBAAYCAQgEAwkFBAsHBgwIBxAMCxENDBIODRYSERgUExkVFBoWFRwYFx4aGSIeHSgkIzMvLjo2NUlFRHBsa4uHhraysbi0swoAAAQAAAMAAP////7+/v39/fz8/Pv7+/r6+vn5+fj4+Pf39/X19fPz8/Hx8eXl5eTk5N/f397e3t3d3dra2tHR0cnJycXFxcLCwrq6urKysrGxsaurq6enp6Ojo5+fn5mZmZaWlpWVlZGRkYuLi4CAgHh4eHJycm1tbWxsbGdnZ1ZWVlJSUk9PT0xMTEpKSklJST09PTo6OjIyMigoKB4eHhwcHBsbGxoaGhkZGRYWFhQUFBMTExISEhERERAQEA8PDw4ODg0NDQsLCwoKCgkJCQgICAcHBwYGBgUFBQMDAwICAgEBAQAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIAALAAAAAAQABAAAAj/AGGcePAAQgABBA4gSLCAQoQKFjjQaOAgAwAZAwwUUMBggoQLGEDM+GPnj8k/eP7MMbLEpJsPLM6c5PPHjx0hNYCEoUNnhIsvJPfQ/GNmCo8cNcTM8ZDCCRMpVbRwURLECxkwW9C8CaHBhw4dNWrsuBG2TB+Ta0yo+FFDR4+wOcBi+SPnT54ONJYgxRJlB46wWs76kUOCBhUfQ86OgaJjB5o/evjcCUEjSQ0rdv/wqUHkz9k/cVC0eFvmpBodSPRo/sNmw4sjUrKU9OOnhg0/e+jeEbGCSpcrevyYfFLkS56zeSSqzq0nd508J/+8iVGizZs6cvTIiXPnDhs4adA0AgkIADs=";
		}

		//Edit Listing
		if(images[index].src == "http://www.geocaching.com/images/icons/16/edit.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAPcAAP/5+vPv8Pv5+vr4+ero6fjz9+vm6v/2///3///4///8///9///+//r0/vz5//b0+fn3/8bFyvr5/vn4/fn4//z8/v7+/8zN0fHy9uXm6vj5+/P09vLz9eTn7P3+/+Xu8+Lr8Ovw8/n9/9jg4+Hp7Pn+//b+//T///v///z///7///v//vf9+/f/+/b49/Dy8dze3cjKyeTu5fv/+ufs5ff59vb/8fz/+v7//dDSzcnLxv3/+vf59MfIw/j59PHy7d3e2e7x3tjZ0/n69P//8v//8/f37f//+////f7+/Pv7+fr6+Pj35dHNqvfkZPjphPXoiv/97/XhZPfdZunbkNbMmcnGt/79+ObPb/vjg/zlhfDdkPHin/XmpebeutfRue/p0d7d2f/dZ+LJb9rIiu3frvfTY+vdru7NbM/BmtzRsfHnzPnSdf/34v/9+NmxXK2UXNS4ed/IltvFlO3XptG+k/336ezo39/b0vv37vr38Oa/ctG2f865jubPo+vcv/Dv7cyqatnCmMaOMb+VTcWkbv/47d/c135iOqh4Nua9hfHHje3Eju3IlOLaz/S+fs+kb/Hiz76DP96wf+jLq/bZudWxjf/69f/799+eZNHDuPTw7f/gy7GFav/ZwvPd0P3s4v759v3Kr//9/P/s5P/18f/59+TCufvt6vvp5//29e7o6P////7+/v39/fz8/Pv7+/r6+vn5+fj4+Pf39/b29vPz8+7u7u3t7d3d3dnZ2dPT09LS0tHR0dDQ0M/Pz87OzsnJyf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMIALAAAAAAQABAAAAj/AFkJtIDExxJWDDTgWOBABAtWrXr96pFDR4wLEXoJsVHkRotLrHTN2sGjhgcPA/RYwZMKlYIEroLRsvWCAwYCd9qo4TMnjhwArICxmiBhQ608a86QEeVJUSFMroDJelBBiREwZbZk2cOokSAirnbJWiDgChMvXbRMwQLp1IEFr3jBOtGAFB0uUJyYmUTJkYpWruTaKVWFyhMpaN5UigSkRKtXvWKBStNnjBg2gTgZ+jHCRKtYvmB9qbNI0iBCnwK4CDECBZJYvVo1gfMoUyI/oWbUwpULyZFXu1xpQtTJ0h8GQwqM2nTIzZFWvGqZQhBFFYUVEBbMAhQmiQpWvm7JGADxgYaBVUFIdMgAIwWKVwLjy4clEH6sgAA7";
		}



		//1 Stern
		if(images[index].src == "http://www.geocaching.com/images/stars/stars1.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhPQANANQfAIo1GKGhoc1jOtO3rdvb275qRu9qL6lUO+7h2/6uhP6DOPj3979cOpxGJr29vf10KMqWiurGttLS0uaWfr+Nfd5nM/7Ms5JONrCwsObl5cnJyeC0ouTPyP7fz7h+bv///yH5BAEAAB8ALAAAAAA9AA0AAAX/4CeO3DaeYpahqMqe7puu8pg09YflOr/nv5yigahhFkCkUSk75jqPg6Wm4VVzVyprwelYLAkFo/DtRIojSfZDQKlP7dN7FE+vMxyG4cFXCCp8BgwUMDQLGg5MHzGHiYUijYqMGhIfCx4MFQZ7DwINAAMSEkwLBBgBBAuipKaoqqMjpaepq7GtdR8WB5pRABdoH47BAQE0IsIOxMbBSsnFJ8jKLApiDwwAiiJVGQHZ2ovdL9vhLOPeCw8VAJkHAy2uDrgp8PLgqfEs3Pf1Fg8AFBAYMPBwYkEACQQQrrF0MCGBhQYRKkQR0eHCDxMaUECy4UADJQswaECSQYMTSCJJJZoklXLRylgtS56EJMDdCAQHOIgggGuBA2M8C/6k03PozqI0QgAAOw==";
		}

		//1.5 Sterne
		if(images[index].src == "http://www.geocaching.com/images/stars/stars1_5.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhPQANAMQSAIo1GKGhodvb2+9qL6lUO/6DOPj3979cOpxGJr29vf10KNLS0t5nM/7Ms7CwsObl5cnJyeTPyAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAA9AA0AAAX/oCSOUTKeYvSg6LOyowvH7yw2iN04tsj3P1vQpkDUUAqHAbgUNmfK3kNBaMCmkJ4k2+PavCODqkEuHA5k8YPcKCzAAtT7FD/NR/XRXfSIHAYKgWYMgX6AgjISBhAJTxKJi40nkIyOlAsiZwwDhwc5EpqcigIOAQIGCwtPBqSmqKphraepq7InDQSbVACfEribEgkBAUeSwcPFTcLEJ8bLRyIFZgoHAI7SB48BjiNZD9sw3uAs4tyKCgwABwwEJiIG6ACnCXkxrvQs3/P1fPf8vgoADDuT7UZAUwsEgFEUIGHChQYaCniIIqJDhSwKIACHq5dGcA8gRHnnAMKSkCMVIpU8KXLVykctTxg44I4PgXc0ZSaoIaCegZ14fAIV0VPnixAAOw==";
		}

		//2 Sterne
		if(images[index].src == "http://www.geocaching.com/images/stars/stars2.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhPQANANQfAIo1GKGhoc1jOtS5rdvb27p3YalUO+9qL/bg1f6uhP6DOL5QHPj39ry8vJxGJtLS0sqWiurGtuaWfr+Le8jIyN5nM/7NtP10KJJONrCwsObl5eC0os6uouTPyL5dPv///yH5BAEAAB8ALAAAAAA9AA0AAAX/4CeO3TaepImOmrae7cu68pg49XfnWf71PN9H4aC9iMZVhsFj1pY5xMVgkUmpNYpPm+OeGB2ExZJQeDxjMUdMNqMtiEjy4f0QUPTT/ZRndTwHF4IKAhWCBwuAgheEhheIEDA0DBQNTiIxH5SWkiKUD5oFHhUHgRcCDgADDKKkpqiqDw+XDAQZAQQMsrS2uLqzI7W3eyIWBqRTABgII8bIBsrMIpwfDQEBSdTW2Cfa10kiCmYXHgCX4ePl5yJaGgHr7B/u8B/t7ysMFxUAowYDX/r4VfCHwl2uBsRY+EK4wiADhigsXAAwAcKZAickUrToAWOwAA8IhKyjCaRIAiQZPZgcuUKCgwlMNhhwcMklzA8yaXrKQIGJBgpQdvaUB5QWT59Fvwj4NwKBgQ6elp5wCtVOwodGCFxtkHUrjRAAOw==";
		}

		//2.5 Sterne
		if(images[index].src == "http://www.geocaching.com/images/stars/stars2_5.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhPQANAMQYAIo1GKGhoc1jOtS5rdvb27p3YalUO+9qL/bg1f6uhP6DOPj39ry8vJxGJtLS0r+Le8jIyN5nM/7NtP10KLCwsObl5eTPyL5dPgAAAP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABgALAAAAAA9AA0AAAX/ICaO1jCepImS1XpWrSvC8pk0NXbXCZVjvlwwp2jEXMUjSkFZCJ21Zg4xMUhkVKuLCvl1c9/TwoKQSBKKy8VcHpTP6bVk/EY7whgC6n7Sn/gjFRYXBxOGCgIRhgdqhYeJhoOOEwo0GAsQDFAzMZiaL50QDpcFFxEHjgINAAMLpaepOK6mqJcEFAEECw4Omwu3ubu9I7+4fiISBqdVAA0II8nLBs3QygcYDAEBSp/Y2txQ2dsrCmkTFwCbIuUX5+kn7BgVAeojXfP1Ivf0KwsTEQBMGVAhwh9AgQQNAtDF4FigYA1XzGPoENkEAA8eqClwQsLFjBuhfSTggACeSwFKQJY8uSAlSZMrbjxwMsBAg00yadockVMeBCkFKUBwUuGnL6FEjYoRQBADAgMWCjI98VRq0wUMjhBwiFUr16wiQgAAOw==";
		}

		//3 Sterne
		if(images[index].src == "http://www.geocaching.com/images/stars/stars3.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhPQANANQfAIo1GKGhoc1jOtS5rtvb27p3YalUO+9qL/bg1f6uhP6DOL1PHfn39ry8vJxGJtLS0sqWiurGtuaWfr+KesjIyN5nM/7NtP10KJJONrCwsObl5eC0os6uouTQyL5cPv///yH5BAEAAB8ALAAAAAA9AA0AAAX/4CeO3TaepIme5TpqmvvG8pg49Xfne53lnx9Q4aC5iMYV0sfIZZo1xMVgkUmp1mlVRgF2UYwOwmJJKDwe8pgzLp/TlnXbjFZHko+viIDKnzQdHgcXhAoCFYQHC4KEF4aIF4qMhYeJCxB/NAwUDVAiMCKbDx8MBR4VB4MXAg4AA6WnqYSsrrCoqrQDDw+eDAQZAQQMu72/wScWBqhTABgII8nLBs3PItGD084jnSINAQFJ3B/e4EpnqwCeIgrnAuko7B7o6iJdGgH09R/3+QwXFQBOGRhwwh9AgQRHGAxYYSCKe8Ia8HkYjIHEFRYuAJgAAU0BZBo5egS5saOHjwoDTDwgsFJPKJUsCbgUIcHBhCYbDDjwVPPmh5w7R/TEqRMKgwwUmmig8EQhUqVM1TEQkFAEAgMdQlE9cTUrqa0juu6ZGKqBEQJkSZkVEQIAOw==";
		}

		//3.5 Sterne
		if(images[index].src == "http://www.geocaching.com/images/stars/stars3_5.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhPQANAMQZAIo1GKGhoc1jOtS5rtvb27p3YalUO+9qL/bg1f6uhP6DOPn39ry8vJxGJtLS0r+KesjIyN5nM/7NtP10KLCwsObl5eC0ouTQyL5cPgAAAP///wAAAAAAAAAAAAAAAAAAACH5BAEAABkALAAAAAA9AA0AAAX/YCaOlzWepIme5UpW7ljB8Zg0dXbne5xQuQwwqGjQXMXjKhlTUBa5Zw4xMUhiVCu2el1RIUEwanFBSCQJBQZzNg/MaDVb4oan1+33Oe0QiwgofScVFxgHE4gKAhGIBwaGiBOKjBOOkImLjZeSMyILEAxQMjSfDhkLBRgRB4cTAg0AA6iqrIivsbOrrbe5rKcEFAEECw4Oor/BgCMSBqtVAA0Iy82HBtDSIszO1tHZ1BkMAQFKoSLh40tqrgDHIgrqAuwo7xjr7fQZFQHtI2D6/KcmRACgysCAEwsEEoxgEKHCggc9KRzGQNkgYQsqrpAwAcCDB2sKnODoESQGkcs6TX4MmdIjAQcE/HgKABOmTBE3HkCxYKDBsZw7e/5soDMDT584iUKpAEGKJwoQljZtt0BARBEIDFzwZPVE1q2nuo74GvbqKQZHCFg8SyMEADs=";
		}

		//4 Sterne
		if(images[index].src == "http://www.geocaching.com/images/stars/stars4.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhPQANANQfAIo1GKGhoc1jOtS5rtvb27p3YalUO+9qL/bg1f6uhP6DOLxPHfn39L29vZxGJtLS0sqWiurGtuaWfr6KesjIyN5nM/7NtP10KJJONrCwsObk5OC0os6uouTQyL5cPv///yH5BAEAAB8ALAAAAAA9AA0AAAX/4CeO3TaepIme5cqqrqa5aOLQoo1/Ot7TmZ1I4ZjRiEYXErcEMnaIi8FCi06rUqrLqnVRVowOwmJJKDwe8pgzLp/TlnXbjFZb2GQ6HBFJfh5fIxodHgcXhwoCFYcHC4WHF4mLF42PiIqMjoaXk40QJzIiDBQPHwwFHhUHmwIOAAOnqauHra+xqqyusKi4tLoPD0+iBBkBBCcWBqpSABgII8nLBs3PItGG087QytjUIw3CDQEBfkNnFwIAwiMK5+nr5h7o6ijt8u8rXxoB8KIXFQBSGRhwgsG/gBUGFjwokOAIgwAbothHgEGDYygsXAAwAQKaAsg2dvwYkqNHDyChS4k8mVJUgAcEYAY6IcHBhCcbDDhYV/Pmh5w7R/TEqZOnTaJBTWWg8EQDhQzwGAhwKAKBgQ6ipp6witWU1hFcs1L9EPYDAYyiGhgJAQA7";
		}

		//4.5 Sterne
		if(images[index].src == "http://www.geocaching.com/images/stars/stars4_5.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhPQANAMQWAIo1GM1jOtS5rtvb27p3YalUO+9qL/bg1f6uhP6DOPn39JxGJuaWfr6KesjIyN5nM/7NtP10KObk5OC0ouTQyL5cPgAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABYALAAAAAA9AA0AAAX/oCWO1DSepIme5cqqLiW5KLLQoo1bOt67CMFOlFjMaMWjK4ljLgWK3SFSgNCm1SvV6sJyUVPHSkE5QCCIRKVyNgvMaDUb4oan123I+3yfH/ZxA2IjEhQVBhGJCQEPiQYFh4kRi40Rj5GKjI6QiJmVBpiTEkcKDgMWCgQVDwadAQsAUKqsrrCyq62Jr7GpuLUAvbSogg2nIxAFrFQACwfHyYgFzM4iyMrSzc/X09XQFg4NDUojCWoRAcAo5RXn6Sfr7VHv5ujyRGoWA1BjEQ8AqwWEjFDQ79+DgCcI+gMoUIRCgwgdFhxQytgJCBEAhFtD4GLGjRU6HvvYgKNHjSVDQY7UKEjQCgYLGkSZUGCBPZgyLdC0OQLnzJo3Y/7kacGnBQkO9g0M0NDCgQIUHDI98TQqqqkjqkptqlUBVocOjoQAADs=";
		}

		//5 Sterne
		if(images[index].src == "http://www.geocaching.com/images/stars/stars5.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhPQANANQfAIo1GNO3q81jOr5qRu7h26lUO+9qL/6uhP5/KrxPHZlDJvTu6vpoLuTQyMqWir5cPuaWfv7CormDc9ZqMuKqjpJONv7fz6BKJt6+tv12J/779/7RusKCcuBmM/6ITP///yH5BAEAAB8ALAAAAAA9AA0AAAX/4CeODTWepIme5cqq7tfG4nHRn43rNB/7MY+CQBMSg8NiEnl0WTKFSOwZnUKlzqu1OtI0LJvNAfEYhMEBsJhs3qDV4/J5kw7H2287+2xpPAwZgQgCHYEGCX+BGYOFGYeJgoSGiICRjY+Vi5KOCR8LEg8dDAYMGRMKAAGfoaOlp6mroqSmqKqgsq61sa20qSMRBR2ABQAVTcDCUMXHwcPLv83KxtDJxNMnHmQZAgALKNkP293f2tze2OXj6OHmKBqmAKEFASfvE/Ed8/Xw8vRd/Pn8ibCHT9+JCBkAcHDw4IGEgwkXNnz4KyJDhxAVXqQoAqHGiSggXJCg4QOGAgpKMooQSdIkSpUfWJY8mXKETJc1V46c+bLLBIEfCBRoMPDnCaFEP2gwOgJpUaBOlTIV4TQEADs=";
		}

		//Kompass N
		if(images[index].src == "http://www.geocaching.com/images/icons/compass/N.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAPMAALUJCcM/P////759fbceHrtZWcPIyLpNTb1ra8Cfn7+NjcTQ0LUEBAAfk8Xf3////yH5BAEAAA8ALAAAAAAQABAAAARM8MlJq5Uh3Jt3bQzTeE/THCFiXo2zACHhOOPnKGGY0LYT5IzDrCZpGWA5wII3aQ2AoQGz6CgwCAJBbEqdeYeW1tdLpJi+K48pTSJFAAA7";
		}
		
		//Kompass NE
		if(images[index].src == "http://www.geocaching.com/images/icons/compass/NE.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQALMJAM9dXcBGRjoXZv77+7wuLrYLC7UEBAAfk8Xf3////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAARFMMlJq70458OPHABQcUiJCEJhENRhEkYsj0igyrE4uXVxx6eWKTAY5BCenamkKpSSEt6wAHjSlgHrdakdSZHQSyeswUQAADs=";
		}
		
		//Kompass E
		if(images[index].src == "http://www.geocaching.com/images/icons/compass/E.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAPMAAAsdi7YLC7cZGcI/P76Cgv///7tSUsTLy7UHB8Cfn2wPPrgoKAAfk7UEBMXf3////yH5BAEAAA8ALAAAAAAQABAAAARD8MlJq704Z8aZ5k7ocBcjGsQRepUZNg0yEEArOgIMBwrlhgWdcCD5OYJCGPFhTAp6PhEMYUiwoqFFalUykjYdjfgRAQA7";
		}
		
		//Kompass SE
		if(images[index].src == "http://www.geocaching.com/images/icons/compass/SE.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQALMJAM9dXcBGRjoXZv77+7wuLrYLC7UEBAAfk8Xf3////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAARFMMlJq70458OP5kiIcNchnqNlnkHoUasYFIALo4VR2FMcDAODofaSrGY5oQEhqJhmSiXAKSJEhaoYU5AjlDqSAWCqsUQAADs=";
		}
		
		//Kompass S
		if(images[index].src == "http://www.geocaching.com/images/icons/compass/S.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAPMAALUJCf///7ceHr59fcY/P7tZWbk/P7pNTb1ra8Cfn7+NjcTNzbUEBAAfk8Xf3////yH5BAEAAA8ALAAAAAAQABAAAARG8MlJq70458ab5k7ocFcjnqNloqFHmQLDBEFcpJM5yDwz4BLTAtADLICP1aFnaFVMiZ4CGQzFGEZqsIGQHUgbmUvzIBAuEQA7";
		}
		
		//Kompass SW
		if(images[index].src == "http://www.geocaching.com/images/icons/compass/SW.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQALMJAM9dXcBGRjoXZv77+7wuLrYLC7UEBAAfk8Xf3////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAARFMMlJq70468PPPkiIcBconl5lBueohkDBopRZGEWbSiBgGIPBzDURIH6/giy0S/iQSVYzAf0RRE0CTmDETgGAAa+jKUcAADs=";
		}
		
		//Kompass W
		if(images[index].src == "http://www.geocaching.com/images/icons/compass/W.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAPMAAAsdi7YLC7cZGcI/P76Cgv///7tSUsTLy7UHB8Cfn2wPPrgoKAAfk7UEBMXf3////yH5BAEAAA8ALAAAAAAQABAAAARD8MlJq704Z8aZ5k7ocBcTHoQhehVADEjTrJUSyLIgjtKA/4Udy/eTBWkThaAorDAShtgsxKKYHKgF0nmlVksdjfgRAQA7";
		}
		
		//Kompass NW
		if(images[index].src == "http://www.geocaching.com/images/icons/compass/NW.gif")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQALMJAM9dXcBGRjoXZv77+7wuLrYLC7UEBAAfk8Xf3////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAARFMMlJq704VwCGPOBxEUYhCEiKgJbhvoQqUsD7FsFaoXaBp7MPomYYDHJAyiFVKKmSk+Xw9wwKEUiZRfqEVkBV6zakKUcAADs=";
		}
		
		//TB Move to Inventory
		if(images[index].src == "http://www.geocaching.com/images/logtypes/70.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAOYAAJsJFmIrMYN6e+zj5KYTJWonMG4vN8wAIMkAHaMPJasXLYkeLpB3e/HY3NQAKNsCL3EeLpJ9guXQ1Y96gZJ9hOHY2+fe4YZ7g+Xa4ol/h4d9hQ8HEt3V4NjQ2wwEEeXd6uri7wQABwQACQIBBuTj6A4DhQ8EhgoDUQsEUhAJVxMNSxcRTwkAgAsEYxAJaAUAfAMAPA0KTwsJLhAONgMDSwgICuDg4tfX2QoLOQABBNLV2ubp7gACBQACBAEFCNHa4dvk69bf5oCFidPX2tzg49nd4H2Chdne4djd4N/k5+Do6t3h4tba2wACAuTq6r/u6L3s5sb1732BgHyAfwAPCXOCe9vq42+AeGeGdHCPfdvh3dje2mt7cHh/eICHgH6DfN7j3HuBc4KIenp8d4iKhQgFANzZ1NvX1Obi33IiGeTa2ePZ2HYnI3orJwkAAAcAAIWFhYODg39/f3l5ef///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHQALAAAAAAQABAAAAesgHSCg4SCODGFiYM0JiUuiXJwcXODLywthV9maBV0F4IpKIVXYGVnFm8YRnQndDCEUjc1REU5R0KDK4RTNjc5OUlIuIIqdAaCGUBAHyA6S12DMgWDGkE/HiI7TF6CM3RtgxRPUR0cTltihGyDE1BUGyFNWmGEaXQEdFg9RT4jam9jCgHAl0UJjyEk3KwhQyjBgwOCuFgZIKEBg0IKEDhYIKiKgAgXFQWAoKhQIAA7";
		}
		
		//TB Visited
		if(images[index].src == "http://www.geocaching.com/images/logtypes/75.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAKIEAICAgC6uEAAAAODg4P///wAAAAAAAAAAACH5BAEAAAQALAAAAAAQABAAAANJSATcSuEpMKoFKsQ5RPcepm0UCA7iuJgCmI6l1aHQtlRtW6UPJV+1Hi63C3J+RY0wR+RNWK4azPPBvSIxS0gq/GGMvQbjYSMkAAA7";
		}
		
		//TB Dropped Off
		if(images[index].src == "http://www.geocaching.com/images/logtypes/14.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAKIFAP///wAAAICAgAAAoODg4P///wAAAAAAACH5BAEAAAUALAAAAAAQABAAAANMWCXc+lCQSQV8MoANArGXoHVjAEZaoKYnRqzrdy0Ex8nD4JIqgOsKiW3z28F8lhymY9MkgYvUqvPMDTKkzk+J7XmquxtIGWkwHtBCAgA7";
		}
		
		//TB Retrieved
		if(images[index].src == "http://www.geocaching.com/images/logtypes/13.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQAKIFAAAAAICAgP///+Dg4M4AAP///wAAAAAAACH5BAEAAAUALAAAAAAQABAAAANQWBXcWuSpMIYQNSgS5wACAAKDxnXUOJbQuahiaJ5Eel3k/FChCLKcneV2AXYWFt9P5yEWmYueUqCRvKSjqiQA6uG0QlIxZ/VUzmBrw1EuJAAAOw==";
		}
		
		//TB Discovered
		if(images[index].src == "http://www.geocaching.com/images/logtypes/48.png")
		{
			images[index].src = "data:image/gif;base64,R0lGODlhEAAQALMLAJo3N7wLC612dqBgYKssLK8TE/UAAMzMzJmZmf///wAAAP///wAAAAAAAAAAAAAAACH5BAEAAAsALAAAAAAQABAAAARZcC1Eq7wYnZPSRtilKYlCKgcYjuWZhtNpnuplsF352jc3k7uFwSDQ5DqG3ZAwMP4SQ6EhAJhwjtDhsDppPbXcmPcEMBQypFZHgQhLRtcDqpbZ2IOwigW2iAAAOw==";
		}
		
		//Printer
		if(images[index].src == "http://www.geocaching.com/images/icons/16/print.png")
		{
			images[index].src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJtSURBVDjLjZPfS1NhGMfPXfh3OG/E/yBImNkqrYGCzAthh+WNgXihwQYb2CoYukGwsdRLoYUWQbRAhqzc2Q91IrrVhlhLqznL5Tyb23m3s317z1szBzM68Lk47/N9Pud5XjgcAK7OVfM7/a2piE87HalRoLVHStrp1VKvLVi7fE9wns/WaXi58UgoH4kl/CxIyOZ/cyRKSKRFmF/tw/B4p3jl7utLFwp6baHiySnBxheZUkHkM8HKrgSpUsVGWsaDN/tQG/1PLxT02EIlRbBJBZtfZaztlSF8JEgdFqBMdnh8im7LSqWpYHJysqXHFiS5AkGMfi12UP0zRRm+D6fwxvPI0dWu3Q8QvV7f0iCgzQZKnl4WjqkgcVDDeyrYpqLoXoWtsbxTpLUyrlsFDA4O5vv7+w1MQBu7Z2dnEY1GcXsqjCwVJDM1JCixb1Vs0VXCdIoAXSVLBTcfhhEIBDA+Pg6NRtOtCLbpg0wmA7PZ/F8oWUEQMDAwsKsIiCzLUFhfX4coiv8kFAqhnh8bG6txFosFhBDG4uIiUqkUEzVDqc3Pz5/leZ4HZzKZkEgkGG63G8lkEn6/vylKxuFwnOU7OzvBTUxMwOfzMex2O+LxOJaWlpoSi8VgtVrP8u3t7eDoHvB6vQyXywV6Jwyj0YjR0VE2Zl9fH7q6uqBWq9lZPd/W1gZuZGSk6vF42IHSuPD8JZbfBpvybOEFOjo6WHZubg6tra3gDAbDzNDQ0LZOpwPvCqNYIjg6IfhBOcxJSGdL2PtewKeMiKJUBu8MQ6VSKc1bFFPDv8C7ItXhJ2sYdv/lDmOVodR4Z6R6vucXuxIEyKz+W40AAAAASUVORK5CYII=";
		}
		
		//Driving Directions
		if(images[index].src == "http://www.geocaching.com/images/icons/16/directions.png")
		{
			images[index].src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH0SURBVDjLxZPPS1RxFMU/7800vglR0hkNRDKHUAwpgyxSiSgwsiFqEbRIWkW47l+IYNa1aOGqoFYJYRiBkeAwYQjmj5GBHJOyVAYZR6b3Zt73e78tZMDKnQsPXDjcczlwL+daxhj2A5t94uANghUST6SiwHMR6RQtIa00O6UcpZSvfbWgfP3o89Nb7/Y0AFK97ZHY6ZYj2FhoEZSABZSVJru61fti7MtbIPCfQTyRqg7axJzNBV5OLHIxfo/ZqQl8bVhd+Ur31btkUyNszGVsuP33CvFE6qiIjHa11vNtNklNQwsFV1H0FGvfsygxbBUVoqGpoYbmSw9NVaQto5W+sTzyIGNdezz5uq8tevNCe5SldY980aeshLIylHyh5O/w2sMBYo1hlIZPM0u8n5ibWnkzdC4oWgbOnoiQ+elScBUlJZR9oayEkm92zHyh8Ntnec1FDPSebOFjarG7+fqTuqBWOmQMFH/MMPbqGaEqhzN9A5w6348Sg9KCFlian2JydJhgKMyv8H1ChwJ4HtVW15U7Rm2vo7Y3iEbqsG2b9Vweq7YV4+aoRN0qbRKN1CMi5PJFtNOE29h/zKoMdHR0ZHt6eo47jsP4+Ph8Op3u3H3tiu55HtPT0x/S6fTlf3MwmEwmE4ALDO8Rut36UKVpHfg3/gGTgwnlYQ1oPAAAAABJRU5ErkJggg==";
		}
	
		//View Google Earth
		// if(images[index].src == "http://www.geocaching.com/images/icons/16/view_map.png")
		// {
			// images[index].src = "";
		// }

	
		
		
		
		//Blank
		if(images[index].src == "")
		{
			images[index].src = "";
		}
		
		
		
		
		
		index=index+1;
	}
}

window.setTimeout(replaceIcons, 10);
