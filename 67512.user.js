// ==UserScript==
// @name           momo
// @namespace      m
// @include        http://onlinegames.com/*
// ==/UserScript==


from pydroid import mouse, bitmap, screen
from math import floor, sqrt
from numpy import dot
from numpy.linalg import inv
from time import sleep
 
rim_color = 15474
ball_color = 10440243;
basket_pos = (143,365)
status_pos = (382, 60)
 
def average(coords):
    """average of a set of coordinates"""
    if len(coords) == 0:
      return ()
    xs = [coord[0] for coord in coords]
    ys = [coord[1] for coord in coords]
    return (int(sum(xs, 0.0) / len(xs)), int(sum(ys, 0.0) / len(ys)))
 
def basket_on_screen():
    while bitmap.capture_screen().get_color(*basket_pos) != rim_color:
       sleep(1)
    return True
 
def ball_pos():
    def ball_coords():
        return average(bitmap.capture_screen().find_every_color(ball_color))
    while True:
        coords = ball_coords()
        sleep(.05)
        coords2 = ball_coords()
        if len(coords) > 0 and len(coords2) > 0 and abs(coords[0] - coords2[0]) < 2 and abs(coords[1] - coords2[1]) < 2 and screen.point_visible(*coords):
            return coords
 
def parabola_vertex(p1, p2, p3):
    """calculate the vertex of a parablola given three points"""
    x1, y1, x2, y2, x3, y3 = p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]
    matrix = [[x1*x1, x1, 1],
              [x2*x2, x2, 1],
              [x3*x3, x3, 1]]
    ys = [[y1],
          [y2],
          [y3]]
    prd = dot(inv(matrix), ys)
    a,b,c = prd[0,0], prd[1,0], prd[2,0]
    x = -b / (2*a)
    y = c - b*b / (4*a)
    return (int(x), int(y))
 
def to_cartesian(screen_coord):
    return (screen.get_size()[0] - screen_coord[0], screen_coord[1])
 
def to_screen_coord(cartesian_coord):
    return to_cartesian(cartesian_coord)
 
def shot_pos(basket, ball):
    """calculate the position to click on the screen to take the shot"""
    p1 = to_cartesian(basket)
    p2 = (p1[0] + 10, p1[1] + 10)
    p3 = to_cartesian(ball)
    vertex = parabola_vertex(p1, p2, p3)
    return to_screen_coord(vertex)
 
def take_shot():
    mouse.move(*shot_pos(basket_pos, ball_pos()))
    sleep(.01)
    mouse.click()
 
while True:
    if basket_on_screen():
        take_shot()