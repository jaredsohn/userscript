// ==UserScript==
// @name	SSC
// @namespace 	http://userscripts.org/users/104935
// @description	Working on it
// @include 	http://*.neopets.com/*
// @exclude	http://images.neopets.com/*
// ==/UserScript==

 * Helps to solve the shapeshifter game on neopets.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or (at
 * your option) any later version.  
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
 * USA.
 *
 * $Id: ss.c,v 1.1 2003/06/29 13:54:43 divvy Exp $
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>
#include <unistd.h>

#include <signal.h>

#ifdef HAVE_CONFIG_H
#       include "config.h"
#endif

struct shape1 {
  unsigned int  nr;
  unsigned int  npoints; /* will be incremented by 1 
                            to store separating 0 pointer */
  unsigned int  *points;
  unsigned int  x;
  unsigned int  y;
  unsigned int  total;
};
struct shape {
  struct shape1 a;
  int           **cache;
  struct shape  *equal;
  int           incs;
  int           seq;
};

static unsigned int nshapes;
static unsigned int *max_incs_left;
static unsigned int x, y;
static unsigned int ntokens;
static int          max_print_cols;
static struct shape *shapes;
static struct shape1 *shapes1;
static char   invers[]="\033[7m";
static char noinvers[]="\033[m";
static unsigned int max_token;
static unsigned int last_token;
static int *matrix;
static int *start_matrix;
static int  **result_matrices;
static int  **shape_graphs;
static unsigned int goal_token;



static void print_sequence(int sig);
static void print_totals(int sig);
static void initialise(void);
static void find_sequence(void);
static void print_result(int print_matrix);
static void read_matrix_layout(void);
static void read_matrix(void);
static void read_goal_token(void);
static void set_toggle(void);
static void read_shapes(void);
static void prepare_shapes(void);
static void print_result_matrix(int from, int to);
static void print_matrix(int *matrix,
                         struct shape *shape,
                         int i);
static void copy_shape_to_result(int          *shape_graph,
                                 struct shape *shape,
                                 int          **cache);
static unsigned int read_int(char *what_to_read);
static void *xmalloc(size_t size);
#define alloc_arr(arr,nr) arr=xmalloc(sizeof(arr[0])*(nr))
static void read_shape(struct shape1 *shape);

/* #define DEBUG */
#ifdef DEBUG
#define D(x) x
#else
#define D(x)
#endif

int
main(void)
{
  signal(SIGUSR1, print_sequence);
  signal(SIGUSR2, print_totals);

  initialise();
  printf("Pid : %d\n",getpid());
  print_totals(0);
  find_sequence();
  print_result(1);

  return 0;
}

static
void print_sequence(int sig)
{
  unsigned int i;

  for (i = 0; i < nshapes; ++i) {
    printf("%2u ", shapes[i].seq);
  }
  printf("\n");

  signal(sig, print_sequence);
}

static
void print_totals(int sig)
{
  unsigned int i;
  for (i = 0; i < nshapes; ++i) {
    printf("%2u ", shapes[i].a.total);
  }
  printf("\n");

  signal(sig, print_totals);
}

static void
initialise(void)
{
  read_matrix_layout();
  read_matrix();
  read_goal_token();
  set_toggle();
  read_shapes();
  prepare_shapes();
}

static void
read_matrix_layout(void)
{
  x = read_int("matrix X coordinate");
  y = read_int("matrix Y coordinate");

  ntokens = x * y;
  
  max_print_cols=40/(x+2);
}

static unsigned int
read_int(char *what_to_read)
{
  unsigned int i;

  if (scanf("%u", &i) != 1) {
    fprintf(stderr, "Error while reading %s.\n", what_to_read);
    exit(EXIT_FAILURE);
  }

  return i;
}

static void
read_matrix(void)
{
  unsigned int i, token;

  alloc_arr(matrix , ntokens);
  alloc_arr(start_matrix , ntokens);
  alloc_arr(result_matrices ,max_print_cols+1);
  alloc_arr(shape_graphs,max_print_cols+1);
  for (i=0;i<=max_print_cols;i++)
  {
    alloc_arr(result_matrices[i] , ntokens);
    alloc_arr(shape_graphs[i] , ntokens);
  }

  last_token = 0;
  for (i = 0; i < ntokens; ++i) {
    token = read_int("matrix element");

    if (token > last_token) {
      last_token = token;
    }

    matrix[i] = token;
  }

  if (last_token >= ntokens) {
    fputs("Token value too large.\n", stderr);
    exit(EXIT_FAILURE);
  }

  max_token=last_token+1;    /* 0 <= token < max_token */
}

static void *
xmalloc(size_t size)
{
  void *p;

  p = malloc(size);
  if (p == NULL) {
    fputs("Out of memory.\n", stderr);
    exit(EXIT_FAILURE);
  }

  return p;
}

static void
read_goal_token(void)
{
  goal_token = read_int("goal token");
  if (goal_token >= max_token) {
    fputs("Goal token out of range.\n", stderr);
    exit(EXIT_FAILURE);
  }
}

static void
set_toggle(void)
{
  unsigned int new_order[10];
  int      i;

  for (i=0;i<max_token;i++)
  {
    if (i<=goal_token)
      new_order[i]=goal_token-i;
    else
      new_order[i]=goal_token+max_token-i;
  }
  for (i=0;i<ntokens;i++)
    matrix[i]=new_order[matrix[i]];
  memcpy(start_matrix,matrix,sizeof(matrix[0])*ntokens);
}

static void
read_shapes(void)
{
  unsigned int i;

  nshapes = read_int("number of shapes");
  if (nshapes == 0) {
    fputs("Invalid number of shapes.\n", stderr);
    exit(EXIT_FAILURE);
  }

  alloc_arr(shapes1 , nshapes);

  for (i = 0; i < nshapes; ++i) {
    read_shape(&shapes1[i]);
    shapes1[i].nr=i;
  }
}

static void read_shape(struct shape1 *shape)
{
  unsigned int i, shape_point, shape_x, shape_y;

  shape->npoints = read_int("number of shape points");
  if (shape->npoints == 0 || shape->npoints >= ntokens) {
    fputs("Too many shape points.\n", stderr);
    exit(EXIT_FAILURE);
  }

  alloc_arr(shape->points , shape->npoints);
  shape->x = shape->y = 0;
  for (i = 0; i < shape->npoints; ++i) {
    shape_point = read_int("shape point");
    if (shape_point >= ntokens) {
      fputs("Shape point out of range.\n", stderr);
      exit(EXIT_FAILURE);
    }
    shape->points[i] = shape_point;

    shape_x = shape_point % x;
    shape_y = shape_point / x;
    if (shape_x > shape->x) {
      shape->x = shape_x;
    }
    if (shape_y > shape->y) {
      shape->y = shape_y;
    }
  }

  /* 
   * Convert width (and height) to the number of times this shape fit
   * into the matrix.
   */
  shape->x = x - shape->x;
  shape->y = y - shape->y;
  shape->total = shape->x * shape->y;

}

static void
prepare_shapes(void)
{
  struct shape *shape;
  int   i,j,k;
  int   max,n;
  unsigned int toggles;
  int          **cache;

  alloc_arr(shapes , nshapes);
  toggles=0;
  for (i=nshapes-1;i>=0;i--)
  {
    shape=shapes+i;
    max=0;
    for (j=i;j>=0;j--)
    {
      if (shapes1[j].npoints>max)
      {
        n=j;
        max=shapes1[j].npoints;
      }
    }
    shape->a=shapes1[n];
    shapes1[n]=shapes1[i];
    toggles+=shape->a.npoints;
    shape->equal=0;
    for (j=i-1;j>=0;j--)
    {
      if (shapes[j].a.npoints!=shape->a.npoints)
        continue;
      for (k=shape->a.npoints-1;k>=0;k--)
        if (shapes[j].a.points[k]!=shape->a.points[k])
          break;
      if (k<0)
      {
        shapes[j].equal=shape;
        break;
      }
    }
    shape->a.npoints++;  /* to store extra null pointer */
    n=shape->a.total*shape->a.npoints;
    alloc_arr(cache , n+1);
    *cache=0;
    cache++;
    shape->cache=cache;
    for (k=0; k < shape->a.total; ++k)
    {
      for (j=shape->a.npoints-2;j>=0;--j)
      {
        *cache=&matrix[(k / shape->a.x)*x +
                       (k % shape->a.x) +
                       shape->a.points[j]];
        cache++;
      }
      *cache=0;
      cache++;
    }
  }
  /* how many toggles did already happen */
  for (i=0;i<ntokens;i++)
    toggles-=matrix[i];
  alloc_arr(max_incs_left,nshapes);
  shapes[nshapes-1].incs=toggles/max_token;
}

#ifdef DEBUG
static void stop_here()
{
}
#endif
#ifdef METRICS
#define M(x) x
static unsigned long *level_tests;
static unsigned long *level_adds;
#else
#define M(x)
#endif


static void
find_sequence(void)
{
  int i;
  struct shape *shape;
  register int **cache;
  unsigned int seq;
  int          incs;
#ifdef DEBUG
  int          j;
#endif

  M(alloc_arr(level_tests,nshapes));
  M(alloc_arr(level_adds,nshapes));
  i=nshapes-1;
  shape=shapes+i;
  incs=shape->incs;
  cache=shape->cache;
  seq=0;
#ifdef DEBUG
  printf("Starting matrix, incs_left = %d\n",incs);
  memcpy(result_matrices[0],matrix,sizeof(matrix[0])*ntokens);
  memset(shape_graphs[0],0,sizeof(matrix[0])*ntokens);
  print_result_matrix(0,1);
  stop_here();
#endif
  for (;;)
  {
    /* add shapes */
    for (;;)
    {
      /* test to see if shape i can be added */
      D(j=shape->a.npoints-2);
      M(level_tests[i]++);
      do
      {
        if ((**cache==0) &&
            (--incs<0))
          break;
        cache++;
        D(j--);
      } while (*cache!=0);
      if (*cache)
        /* level i cannot successfully be added */
        break;
      /* add the shape at level i */
      M(level_adds[i]++);
      cache-=shape->a.npoints;
      D(j=shape->a.npoints-2);
      for (;;)
      {
        cache++;
        if (*cache==0)
          break;
        if (--**cache<0)
          **cache=last_token;
        D(j--);
      }
      /* level i successfully added */
#ifdef DEBUG
      printf("Level %d : add shape %d, incs_left = %d\n",shape-shapes,shape->a.nr,incs);
      copy_shape_to_result(shape_graphs[0],shape,0);
      memcpy(result_matrices[1],matrix,sizeof(matrix[0])*ntokens);
      print_result_matrix(0,2);
      memcpy(result_matrices[0],matrix,sizeof(matrix[0])*ntokens);
      stop_here();
#endif
      shape->seq=seq;
      if (i==0)
        return;
      /* next level */
      --i;
      shape=shapes+i;
      if (shape->equal==0)
        seq=0;
      else
        seq=shape->equal->seq;
      cache=shape->cache+(seq*shape->a.npoints);
      shape->incs=incs;
    }
    /* next shapes */
    for (;;)
    {
      /* next */
      ++seq;
      if (seq < shape->a.total)
      {
        cache=shape->cache+(seq*shape->a.npoints);
        incs=shape->incs;
        break;
      }
      ++i;
      if (i>=nshapes)
      {
        fputs("No result found.\n", stderr);
        exit(-1);
      }
      shape=shapes+i;
      seq=shape->seq;
      cache=shape->cache+((seq+1)*shape->a.npoints)-2;
      incs=shape->incs;
      /* remove */
      do
      {
        **cache=(**cache+1)%max_token;
      } while (*--cache!=0);
      cache++;
#ifdef DEBUG
      printf("Level %d : Remove shape %d\n",shape-shapes,shape->a.nr);
      copy_shape_to_result(shape_graphs[0],shape,0);
      memcpy(result_matrices[1],matrix,sizeof(matrix[0])*ntokens);
      print_result_matrix(0,2);
      memcpy(result_matrices[0],matrix,sizeof(matrix[0])*ntokens);
      stop_here();
#endif
    }
  }
}

static void print_result_matrix(int from, int to)
{
  int      i,j,k;
  int      *result_matrix;
  int      *shape_graph;
  int      v;     /* inverted */
  
  v=0;
  for (i=0;i<ntokens;i+=x)
  {
    for (j=from;j<to;j++)
    {
      result_matrix=result_matrices[j];
      shape_graph=shape_graphs[j];
      for (k=0;k<x;k++)
      {
        if (shape_graph[i+k]!=v)
        {
          v^=1;
          printf("%s",v?invers:noinvers);
        }
        printf("%d%c",result_matrix[i+k],v?'+':'|');
      }
      if (v)
      {
        v=0;
        printf("%s",noinvers);
      }
      printf("%s","  ");
    }
    putchar('\n');
  }
}

static void copy_shape_to_result(int          *shape_graph,
                                 struct shape *shape,
                                 int          **cache)
{
  if (cache==0)
    cache=shape->cache+(shape->seq*shape->a.npoints);
  memset(shape_graph,0,sizeof(int)*ntokens);
  do
  {
    shape_graph[*cache-matrix]=1;
    cache++;
  }
  while (*cache!=0);
}

static void print_matrix(int *matrix,
                         struct shape *shape,
                         int i)
{
  int    matrix_size=sizeof(matrix[0])*ntokens;
  putchar('\n');
  memset(result_matrices[0],0,matrix_size);
  memset(shape_graphs[0],0,matrix_size);
  if (matrix)
    memcpy(result_matrices[0],matrix,matrix_size);
  if (shape)
    copy_shape_to_result(shape_graphs[0],shape,shape->cache+i*shape->a.npoints);
  print_result_matrix(0,1);
}


void print_result(int print_matrix)
{
  int  i,j;
  int  m,n;
  int  col;
  struct shape *shape;
  int          **cache;
  int          *result_matrix;
  
#ifdef METRICS
  printf("Tests\n"
         "Seq  nr      ok        nok      total\n");
  for (i=0;i<nshapes;i++)
    printf("%2d  %2d %10ul %10ul %10ul\n",i,
           shapes[i].a.nr,
           level_adds[i],
           level_tests[i]-level_adds[i],
           level_tests[i]);
#endif 
  result_matrix=result_matrices[0];
  if (print_matrix)
    memcpy(result_matrix,start_matrix,sizeof(int) * ntokens);
  else
    memset(result_matrix,0,sizeof(int) * ntokens);
  for (m = 0; m < nshapes; )
  {
    for (col=0;col<max_print_cols && m < nshapes;col++,m++)
    {
      for (i=nshapes-1;i>=0;i--)
      {
        shape=shapes+i;
        if (shape->a.nr==m)
          break;
      }
      n=shape->seq;
      printf("%2dx%2d=%3d",n%shape->a.x,n/shape->a.x,n);
      for (j=9;j<x*2+2;j++)
        putchar(' ');
      copy_shape_to_result(shape_graphs[col],shape,0);
      result_matrix=result_matrices[col+1];
      memcpy(result_matrix,result_matrices[col],sizeof(int)*ntokens);
      if (print_matrix)
      {
        cache=shape->cache+shape->seq*shape->a.npoints;
        do
        {
          n=*cache-matrix;
          result_matrix[n]=((result_matrix[n]+max_token-1)%max_token);
          cache++;
        }
        while (*cache!=0);
      }
    }
    printf("\n");
    print_result_matrix(0,col);
    memcpy(result_matrices[0],result_matrices[max_print_cols],sizeof(int) * ntokens);
    printf("\n");
  }
}
