// ==UserScript==
// @id VortexMobile
// @name Vortex Mobile
// @version 1.0
// @namespace
// @author
// @description
// @include http://*.pokemonvortex.org/mobile/map.php?map=*
// @include http://*.pokemonvortex.org/mobile/wildbattle.php
// @run-at document-end
// ==/UserScript==


Bài 4: Cây Nhị Phân Tìm Kiếm (Binary Search Tree)
#include <iostream>
using namespace std;

struct NODE
{
	int key;
	NODE *left;
	NODE *right;
	NODE *p;
};
struct TREE
{
	NODE *root;
};
void initiation(TREE &T)
{
	T.root=NULL;
}

void insert(TREE &T,NODE *z)
{
	NODE *y=NULL;
	NODE *x=T.root;
	while(x!=NULL)
	{
		y=x;
		if(z->key<x->key)
			x=x->left;
		else
			x=x->right;
	}
	z->p=y;
	if(y==NULL)
		T.root=z;
	else if(z->key<y->key)
		y->left=z;
	else
		y->right=z;
}

void inorder_tree_walk(NODE *x)
{
	if(x!=NULL)
	{
		inorder_tree_walk(x->left);
		cout<<"\t"<<x->key;
		inorder_tree_walk(x->right);
	}
}

NODE *search(NODE *x,int k)
{
	if(x==NULL || k==x->key)
		return x;
	if(k<x->key)
		return search(x->left,k);
	else return search(x->right,k);
}

NODE *MAX(NODE *x)
{
	while(x->right!=NULL)
		x=x->right;
	return x;
}

NODE *MIN(NODE *x)
{
	while(x->left!=NULL)
		x=x->left;
	return x;
}
NODE *TREE_SUCCESSOR(NODE *x)
{
	if(x->right!=NULL)
		return MIN(x->right);
	NODE *y=x->p;
	while(y!=NULL && x==y->right)
	{
		x=y;
		y=y->p;
		
	}
	return y;
	

}

void Transplant(TREE &T,NODE * x,NODE *y)
{
	if (x->p==NULL)
		T.root=y;
	else if(x=x->p->left)
		x->p->left=y;
	else x->p->right=y;
	if( y!=NULL)
		y->p=x->p;
}
void TREE_Delete(TREE &T,NODE *z)
{
	NODE *y;
	if(z->left==NULL)
		Transplant(T,z,z->right);
	else if(z->right==NULL)
		Transplant(T,z,z->left);
	else 
	{
		y=MIN(z->right);
		if(y->p !=z)
		{
			Transplant(T,y,y->right);
			y->right=z->right;
			y->right->p=y;

		}
		Transplant(T,z,y);
		y->left=z->left;
		y->left->p=y;
	}
}
void main()
{
	TREE T;
	NODE *x;
	int n;
	int a[100];
	initiation(T);
	
	cout<<"nhap n=";
	cin>>n;
	for(int i=0;i<n;i++)
	{
		cin>>a[i];
		x=new NODE;
		x->key=a[i];
		x->left=NULL;
		x->right=NULL;
		insert(T,x);
	}

	

	cout<<"\n xuat ra:";
	inorder_tree_walk(T.root);

	cout<<endl;

	int TimKiem;
	cout<<"\n Nhap so can tim: ";
	cin>>TimKiem;
	NODE *q=search(T.root,TimKiem);
	if(q!=NULL)
		cout<<"Tim Thay ket qua:"<<q->key;
	else
		cout<<"khong tim thay";


	cout<<"\nso max:"<<MAX(T.root)->key;
	cout<<"\nso min:"<<MIN(T.root)->key;

	cout<<"\n So sau x la:"<<TREE_SUCCESSOR(q)->key;


	TREE_Delete(T,q);
	cout<<"\nsau khi xoa:";
	inorder_tree_walk(T.root);
	cout<<endl;
}

Bài 5: Heap Sort
#include <iostream>
#define MAX 100
using namespace std;

struct HEAP
{
	int items[MAX];
	int size;
	int length;
};

void Initiation(HEAP &A,int arr[],int n)
{
	A.length=n;
	for(int i=0;i<n;i++)
		A.items[i]=arr[i];
}

int LEFT(int i)
{
	return 2*i+1;
}
int RIGHT(int i)
{
	return 2*i+2;
}
int PARENT(int i)
{
	return (i-1)/2;
}
void HoanVi(int &a,int &b)
{
	int t=a;a=b;b=t;
}
void MaxHeapify(HEAP &A,int i)
{
	int l=LEFT(i);
	int r=RIGHT(i);
	int largest;
	if(l < A.size && A.items[l] > A.items[i])
		larg=l;
	else larg=i;
	if(r < A.size && A.items[r] > A.items[largest])
		larg=r;
	if(largest!=i)
	{
		HoanVi(A.items[i],A.items[largest]);
		MaxHeapify(A,largest);
	}
}
void Build_Max_Heap(HEAP &A)
{
	A.size=A.length;
	for(int i=A.size/2;i>=0;i--)
		MaxHeapify(A,i);
}
void PrintHeap(HEAP &A)
{
	for(int i=0;i<A.length;i++)
		cout<<A.items[i]<<"\t";
}
void PrintHeap1(HEAP &A)
{
	for(int i=0;i<A.size;i++)
		cout<<A.items[i]<<"\t";
}
void HeapSort(HEAP &A)
{
	Build_Max_Heap(A);
	for(int i=A.length-1;i>0;i--)
	{
		HoanVi(A.items[0],A.items[i]);
		A.size--;
		MaxHeapify(A,0);
	}
}
int Heap_Max(HEAP &A)
{
	return A.items[0];
}
int Heap_Extract_Max(HEAP &A)
{
	if(A.size <0)
		cout<<"Heap underflow";
	else
	{
		int max=A.items[0];
		A.items[0]=A.items[A.size];
		MaxHeapify(A,0);
		A.size--;		
		return max;
	}
}

void Heap_Increase_Key(HEAP &A,int i,int key)
{
	if(key<A.items[i])
	{
		cout<<"New key is smaller than curent key";
		return;		
	}
	A.items[i]=key;
	while(i>1 && A.items[PARENT(i)]<A.items[i])
	{
		HoanVi(A.items[PARENT(i)],A.items[i]);
		i=PARENT(i);
	}
	
}

void Max_Heap_Insert(HEAP &A,int key)
{
	
	A.items[A.size]=-2117483647;
	Heap_Increase_Key(A,A.size,key);
	A.size=A.size+1;
	A.length++;
}
void main()
{
	HEAP A;
	int arr[]={5,6,2,4,9,8};
	int n=sizeof(arr)/sizeof(arr[0]);
	
	Initiation(A,arr,n);

	cout<<"Xuat MaxHeap :";
	Build_Max_Heap(A);
	PrintHeap(A);

	/*cout<<endl;
	cout<<"So Max:"<<Heap_Max(A);*/
	
	/*cout<<endl;
	cout<<"Xuat HeapSort:";
	HeapSort(A);
	PrintHeap(A);*/

	/*cout<<endl;
	cout<<endl;
	cout<<"Loai Max ra:"<<Heap_Extract_Max(A);
	
	cout<<endl;
	cout<<endl;

	cout<<"Sau khi bo Max:";
	PrintHeap1(A);*/ 

	cout<<endl;
	cout<<endl;

	cout<<"Sau khi them khoa key 1: ";
	Max_Heap_Insert(A,1);
	//Heap_Increase_Key(A,7);
	PrintHeap1(A);

	cout<<endl;
	cout<<endl;

	cout<<"Sau khi them khoa key 20: ";
	Max_Heap_Insert(A,20);
	//Heap_Increase_Key(A,23);
	Build_Max_Heap(A);
	PrintHeap1(A);

	
	cout<<endl;
	cout<<endl;

	cout<<"Sau khi them khoa key -41: ";
	Max_Heap_Insert(A,-41);
	//Heap_Increase_Key(A,4);
	Build_Max_Heap(A);
	PrintHeap1(A);


	system("pause");


}

Bài Tập: Danh Sách Nhân Viên
#include <iostream>
using namespace std;

struct NHANVIEN
{
	char MaNV[11];
	char HoTen[31];
	int ThamNien;
	double Luong;
};
struct NODE
{
	NHANVIEN nv;
	NODE *prev;
	NODE *next;
};
struct LIST
{
	NODE *Head;
	NODE *Tail;
};

void Initiation(LIST &L)
{
	L.Head=L.Tail=NULL;
}

NODE *TaoNode(NHANVIEN &nv)
{
	NODE* p;
	p=new NODE;
	if(p==NULL)
	{
		cout<<"\n khong du bo nho";
		exit(0);
	}
	p->nv=nv;
	p->next=NULL;
	p->prev=NULL;
	return p;
}

void ChenDau(LIST &L,NODE* p)
{
	if(L.Head==NULL)
		L.Head=L.Tail=p;
	else
	{
		p->next=L.Head;
		L.Head->prev=p;
		L.Head=p;
	}
	
}

void ChenCuoi(LIST &L,NODE *p)
{
	if(L.Head==NULL)
	{
		L.Head=p;
		L.Tail=L.Head;
	}
	else
	{
		L.Tail->next=p;
		p->prev=L.Tail;
		L.Tail=p;
	}
}

void DS(NODE* p)
{
	cout<<"\n Ma Nhan Vien: ";
	cin>>p->nv.MaNV;
	//cin.getline(nv.MaNV,11);
	cin.ignore();

	cout<<"\n Ho Ten: ";
	cin>>p->nv.HoTen;
	//cin.getline(nv.HoTen,31);
	cin.ignore();

	cout<<"\n Tham Nien: ";
	cin>>p->nv.ThamNien;

	cout<<"\n Luong: ";
	cin>>p->nv.Luong;
}

void NhapDS(LIST &L)
{
	int n;
	cout<<"\n So luong Nhan Vien: ";
	cin>>n;
	NHANVIEN nv;
	for(int i=0;i<n;i++)
	{
		NODE *newNode=TaoNode(nv);
		DS(newNode);
		//ChenDau(L,newNode);
		ChenCuoi(L,newNode);
		cout<<endl;
	}
}

void XuatDS(NODE* p)
{
	cout<<"\n Ma Nhan Vien: "<<p->nv.MaNV;

	cout<<"\n Ho Ten: "<<p->nv.HoTen;

	cout<<"\n Tham Nien: "<<p->nv.ThamNien;

	cout<<"\n Luong: "<<p->nv.Luong;
}
void Xuat1DS(LIST L)
{
	int i=0;
	NODE* p=L.Head;
	while(p!=NULL)
	{
		i++;
		cout<<"\n Nhan Vien thu: "<<i;
		XuatDS(p);
		p=p->next;
		cout<<endl;
	}
}

NODE* TimNV(LIST L,int x)
{
	NODE* p=L.Head;
	while(p!=NULL && p->nv.ThamNien!=x)
		p=p->next;
	return p;
}

void XoaDau(LIST &L)
{
	NODE* p;
	if(L.Head!=NULL)
	{
		p=L.Head;
		L.Head=L.Head->next;
		L.Head->prev=NULL;
		delete p;
		if(L.Head==NULL)
			L.Tail=NULL;
		else
			L.Head->prev=NULL;
	}
}

void XoaCuoi(LIST &L)
{
	NODE *p,*q;
	if(L.Head==NULL)
		return;
	p=L.Tail;
	if(p->prev==NULL)
	{
		XoaDau(L);
		return;
	}
	q=p->prev;
	q->next=NULL;
	L.Tail=q;
	delete p;
}

void Xoa_Gia_Tri_X(LIST &L,int x)
{
	NODE* p=TimNV(L,x);
	NODE* q;
	if(p==NULL)
	{
		cout<<"\n Khong Tim Thay Gia Tri Can Xoa:";
		exit(0);
	}
	if(p->prev==NULL)
	{
		XoaDau(L);
	}
	else if(p->next==NULL)
	{
		XoaCuoi(L);
	}
	else
	{
		q=p->prev;
		q->next=p->next;
		p->next->prev=q;
		delete p;
	}
}

void Chen_Truoc_X(LIST &L,NODE* q,int x)
{
	NODE *p;
	
	p=TimNV(L,x);
	if(p->prev==NULL)
	{
		q->next=p;
		p->prev=q;
		L.Head=q;
	}
	else
	{
		p->prev->next=q;
		q->prev=p->prev;
		p->prev=q;
		q->next=p;
	}
}
void HoanVi(NODE* &a,NODE* &b)
{
	NHANVIEN t=a->nv;
	a->nv=b->nv;
	b->nv=t;
}
void SapXep(LIST L)
{
	NODE *p,*q;
	p=L.Head;
	while(p->next!=NULL)
	{
		q=p->next;
		while(q!=NULL)
		{
			if(p->nv.ThamNien > q->nv.ThamNien)
				HoanVi(p,q);
			q=q->next;
		}
		p=p->next;
	}
}

void main()
{
	LIST L;
	Initiation(L);

	NhapDS(L);

	/*Xuat1DS(L);*/

/*	int x;
	cout<<"\n So Tham Nien Can Tim: ";
	cin>>x;
	NODE* kq=TimNV(L,x);
	if(kq==NULL)
		cout<<"\n khong tim thay ";
	else
	{
		cout<<"\n Ket Qua Tim Thay: \n";
		XuatDS(kq);
	}
*/


/*	cout<<"\n Danh Sach Nhan Vien Sau Khi Xoa: \n";
	//XoaDau(L);
	//XoaCuoi(L);
	Xoa_Gia_Tri_X(L,3);
	Xuat1DS(L);
*/

	
/*	cout<<"\n Nhap Danh Sach: ";
	NHANVIEN nv;
	NODE *
		q=TaoNode(nv);
	DS(q);
	Chen_Truoc_X(L,q,2);
	cout<<"\n Danh Sach Sau khi Chen: \n";
	Xuat1DS(L);
*/

	cout<<"\n Danh Sach Sau Khi Sap Xep: \n";
	SapXep(L);
	Xuat1DS(L);

	cout<<endl;
	system("pause");


}


Bài Tập: Các Dạng Sắp Xếp

#include <iostream>
using namespace std;

void HoanVi(int &a, int &b)
{
	int t=a;a=b;b=t;

}

void Xuat(int a[],int n)
{
	for(int i=0;i<n;i++)
		cout<<a[i]<<"\t";
	cout<<endl;

}
void InsertionSort(int a[],int n)
{
	for(int j=1;j<n;j++)
	{
		int t=a[j];
		int i=j-1;
		while(i>=0)
		{
			if(a[i]<a[j])
				a[i+1]=a[i];		
			i--;
		}
		a[i+1]=t;
	}
}
void SelectionSort(int a[],int n)
{
	for(int i=0;i<n-1;i++)
	{
		int smallest=i;
		for(int j=i+1;j<n;j++)
			if(a[i]<a[j])
				smallest=j;
		HoanVi(a[smallest],a[i]);
	}
}
void BubbleSort(int a[],int n)
{
	for(int i=0;i<n-1;i++)
		for(int j=i+1;j<n;j++)
			if(a[i]<a[j])
				HoanVi(a[i],a[j]);
}
void CountingSort(int a[],int b[],int k,int n)
{
	int *c=new int [k];
	for(int i=0;i<=k;i++)
		c[i]=0;
	//Xuat(c,k+1);

	for(int j=0;j<n;j++)
		c[a[j]]=c[a[j]]+1;
	//Xuat(c,k+1);

	for(int i=1;i<=k;i++)
		c[i]=c[i]+c[i-1];
	//Xuat(c,k+1);

	for(int j=n-1;j>=0;j--)
	{
		b[c[a[j]]-1]=a[j];
		c[a[j]]=c[a[j]]-1;
	}
	Xuat(b,n);	
}

//Bucket Sort [0,1)
void bucketSort(double a[], int n) 
{
	double c[10];
	for(int i=0; i < n; i++) 
		c[i] = 0;
	for(int i=0; i < n; i++)
	{
		int x=n*a[i];
		c[x]++;

	}
	for(int i=0,j=0; i < n; i++) 
		for(; c[i]>0; c[i]--) 
			a[j++] = i; 
}
int Partition(int a[],int p,int r)
{
	int x=a[r];
	int i=p-1;
	for(int j=p;j<r;j++)
	{
		if(a[j]<=x)
		{
			i++;
			HoanVi(a[i],a[j]);
		}
	}
	HoanVi(a[i+1],a[r]);
	return i+1;
}

void QuickSort(int a[],int p,int r)
{
	if(p<r)
	{
		int q=Partition(a,p,r);
		QuickSort(a,q+1,r);
		QuickSort(a,p,q-1);
	}
}

void Merge(int a[],int left,int mid,int right)
{
	int i,j,k,l,b[20];
	l=i=left;
	j=mid+1;
	while(l<=mid && j<=right)
	{
		if(a[l]<=a[j])
		{
			b[i]=a[l];
			l++;
		}
		else
		{
			b[i]=a[j];
			j++;
		}
		i++;
	}
	if(l>mid)
	{
		for(k=j;k<=right;k++)
		{
			b[i]=a[k];
			i++;
		}
	}
	else
	{
		for(k=l;k<=mid;k++)
		{
			b[i]=a[k];
			i++;
		}
	}
	for(k=left;k<=right;k++)
		a[k]=b[k];
	
}
void MergeSort(int a[],int left,int right)
{
	if(left<right)
	{
		int mid=(left+right)/2;
		MergeSort(a,left,mid);
		MergeSort(a,mid+1,right);
		Merge(a,left,mid,right);
	}
}
int Iterative_Binary_Search(int a[],int left,int right,int v)
{
	while(left<=right)
	{
		int mid=(left+right)/2;
		if(v==a[mid])
			return mid;
		else if(v>a[mid])
			left=mid+1;
		else
			right=mid-1;
	}
	return NULL;
}
int Recursive_binary_search(int a[],int left,int right,int v)
{
	if(left>right)
		return NULL;
	int mid=(left+right)/2;
	if(v==a[mid])
		return mid;
	else if(v>a[mid])
		return Recursive_binary_search(a,mid+1,right,v);
	else return Recursive_binary_search(a,left,mid-1,v);
}

void main()
{
	int a[]={5,13,9,34,37,97,31,26,7,1};
	
	int n=10;

	//int a[100];
	/*for(int i=0;i<n;i++)
	{
		cin>>a[i];
		cout<<endl;
	}*/
	
	/*
	InsertionSort(a,n);
	Xuat(a,n);
	*/
/*
	SelectionSort(a,n);
	Xuat(a,n);
*/
	/*
	BubbleSort(a,n);
	Xuat(a,n);
	*/
	
/*
	int k=6;
	int b[100];
	CountingSort(a,b,k,n);
*/

	/*QuickSort(a,0,n-1);
	Xuat(a,n);*/
	
	/*
int b[] = {.1,.3,.4,.6,.4,.2,.9,.1,.2,.9};
	int n = 10;
	Xuat(b,n);
	bucketSort(b, n);
*/
/*	
	MergeSort(a,0,n-1);
	Xuat(a,n);
	
	int kq=Recursive_binary_search(a,0,n-1,1);
	//int kq=Iterative_Binary_Search(a,0,n-1,1);
	if(kq==NULL)
		cout<<"\n ko tim thay!!";
	else
		cout<<"\n Tim thay tai vi tri: "<<kq;
*/

	system("pause");
}

Bài 3: Stack & Queue
#include <iostream>
#define MAX 100
using namespace std;

struct STACK
{
	int top,n;
	int a[MAX];
};
void Initiation(STACK &S)
{
	S.top=-1;
	S.n=30;
}
bool StackEmpty(STACK S)
{
	if(S.top==-1)
		return true;
	return false;
}
bool StackFull(STACK S)
{
	if(S.top==S.n)
		return true;
	return false;
}
void Push(STACK &S,int x)
{
	if(StackFull(S)==true)
		cout<<"Overflows";
	else
	{
		S.top++;
		S.a[S.top]=x;
	}
}
int Pop(STACK &S)
{
	if(StackEmpty(S)==true)
	{
		cout<<"underflows";
		return -1;
	}
	else
	{
		S.top--;
		return S.a[S.top+1];
	}
}
void Print(STACK S)
{
	for(int i=0;i<=S.top;i++)
		cout<<S.a[i]<<"\t";
	cout<<endl;
}

char peek(STACK &S)
{
	if(!StackEmpty(S))
		return S.a[S.top];
	else
		return '\0';
}
bool isOperator(char c)
{
	if(c=='+' ||c=='-' ||c=='*' ||c=='/' ||c=='^' ||c=='%')
		return true;
	return false;
}
int Precedence(char c)
{
	if(c=='+' || c=='-')
		return 1;
	if(c=='*' ||c=='/')
		return 2;
	if(c=='^' ||c=='%')
		return 2;
	return 0;
}
void ConvertInfixToPostfix(char infix[],char postfix[])
{
	STACK S;
	Initiation(S);
	Push(S,'(');
	strcat(infix,")");
	int i=0;
	int j=-1;
	while(!StackEmpty(S))
	{
		
		if(infix[i]>='0' && infix[i]<='9')
			postfix[++j]=infix[i];
		if(infix[i]=='(')
			Push(S,infix[i]);
		if(isOperator(infix[i]))
		{
			if(Precedence(peek(S))>=Precedence(infix[i]))
				postfix[++j]=Pop(S);
			Push(S,infix[i]);
		}
		if(infix[i]==')')
		{
			char c=Pop(S);
			while(c!='(')
			{
				postfix[++j]=c;
				c=Pop(S);
			}
		}	
		i++;
	}
		postfix[++j]='\0';
}
void main()
{
	/*STACK S;
	Initiation(S);
	Push(S,5);
	Push(S,2);
	Push(S,3);
	Push(S,4);
	Push(S,6);
	Print(S);
	cout<<"\n Pop ra: "<<Pop(S);
*/

char infix[100],postfix[100];
	cout<<"input infix expression:";
	cin>>infix;
	ConvertInfixToPostfix(infix,postfix);
	cout<<"The postfix is: "<<postfix<<endl;

	system("pause");
}


QUEUE
#include <iostream>
#define MAX 100
using namespace std;

struct QUEUE
{
	int Head,Tail,n;
	int a[MAX];
};
void Initiation(QUEUE &Q)
{
	Q.Head=0;
	Q.Tail=-1;
	Q.n=30;
}
bool QueueEmpty(QUEUE Q)
{
	if(Q.Tail==-1)
		return true;
	return false;
}
bool QueueFull(QUEUE Q)
{
	if(Q.Tail==Q.n)return true;
	return false;
}
void Enqueue(QUEUE &Q,int x)
{
	if(QueueFull(Q)==true)cout<<"overflow";
	else
	{
		Q.Tail=Q.Tail+1;
		Q.a[Q.Tail]=x;
	}
}
int Dequeue(QUEUE &Q)
{
	int x=Q.a[Q.Head];
	if(Q.Head==Q.n)
	{
		Q.Head=1;
		Q.Tail=0;
	}
	else
		Q.Head=Q.Head+1;
	return x;
}
void Print(QUEUE Q)
{
	for(int i=Q.Head;i<=Q.Tail;i++)
		cout<<Q.a[i]<<"\t";
	cout<<endl;
}
void main()
{
	QUEUE Q;
	Initiation(Q);
	Enqueue(Q,4);
	Enqueue(Q,3);
	Enqueue(Q,2);
	Enqueue(Q,1);
	Enqueue(Q,5);
	Print(Q);
	cout<<"\n Dequeue:"<<Dequeue(Q)<<endl;
	Print(Q);
	system("pause");
}

---------------------------------------------------------------------------------------------------------STACK & QUEUE bằng DSLK-------------------------------------------------------------------------------------------------------
#include <iostream>
using namespace std;

typedef struct CELL*STACK;
struct CELL
{
	int key;
	STACK next;
};
void Initiation(STACK &S)
{
	S=NULL;
}
bool StackEmpty(STACK S)
{
	if(S==NULL)return true;
	return false;
}
void Push(STACK &S,int x)
{
	STACK p;
	p=new CELL;
	p->key=x;
	p->next=S;
	S=p;
}
int Pop(STACK &S)
{
	STACK p;
	int x;
	if(StackEmpty(S))
	{
		cout<<"underflow";
		return -1;
	}
	else
	{
		p=S;
		S=p->next;
		x=p->key;
		delete p;
		return x;
	}
}
void Print(STACK S)
{
	while(S!=NULL)
	{
		cout<<S->key<<"\t";
		S=S->next;
	}
}
void main()
{
	STACK S;
	Initiation(S);
	Push(S,5);
	Push(S,6);
	Push(S,2);
	Print(S);
	cout<<"\nPop ra: "<<Pop(S)<<endl;
	Print(S);
	system("pause");
}

QUEUE
#include <iostream>
using namespace std;

typedef struct CELL *LIST;
struct CELL
{
	int key;
	LIST next;
};
struct QUEUE
{
	LIST Head,Tail;
};
void Initiation(QUEUE &Q)
{
	Q.Head=Q.Tail=NULL;
}
bool QueueEmpty(QUEUE Q)
{
	if(Q.Head==NULL)return true;
	return false;
}
void Enqueue(QUEUE &Q,int x)
{
	LIST p;
	p=new(CELL);
	p->key=x;
	p->next=NULL;
	if(Q.Head==NULL)
		Q.Head=p;
	else
		Q.Tail->next=p;
	Q.Tail=p;
}
int Dequeue(QUEUE &Q)
{
	int x;
	LIST p;
	if(QueueEmpty(Q))
	{
		cout<<"underflow";
		return -1;
	}
	else
	{
		p=Q.Head;
		x=p->key;
		if(Q.Head==Q.Tail)
		{
			Q.Head=Q.Tail=NULL;
		}
		else
			Q.Head=p->next;
		delete p;
		return x;
	}
}
void Print(QUEUE Q)
{
	LIST p=Q.Head;
	while(p!=NULL)
	{
		cout<<p->key<<"\t";
		p=p->next;
	}
	
}
void main()
{
	QUEUE Q;
	Initiation(Q);
	Enqueue(Q,4);
	Enqueue(Q,2);
	Enqueue(Q,1);
	Enqueue(Q,5);

	Print(Q);
	cout<<"\nxuat ra"<<Dequeue(Q)<<endl;;
	Print(Q);
	system("pause");
}

---------------------------------------------------------------------------------------------------------Danh Sách Liên Kết Đơn--------------------------------------------------------------------------------------------------------



#include <iostream>
using namespace std;

typedef struct CELL *LIST;
struct CELL
{
	int key;
	LIST next;
};

void Initiation(LIST &L)
{
	L=NULL;
}
void InsertHead(LIST &L,int x)
{
	LIST p;
	p=new(CELL);
	p->key=x;
	p->next=L;
	L=p;
}
void InsertTail(LIST &L,int x)
{
	if(L==NULL)
	{
		InsertHead(L,x);
	}
	else
	{
		LIST q=L;
		LIST p=new CELL;
		p->key=x;
		p->next=NULL;
		while(q->next!=NULL)
			q=q->next;
		q->next=p;
	}
}
void Insert_After_k(LIST &L,int k,int x)
{
	LIST p=L;
	LIST t;
	while(p!=NULL && p->key!=k)
		p=p->next;
	if(p!=NULL)
	{
		t=new CELL;
		t->key=x;
		t->next=p->next;
		p->next=t;
	}
}
void Insert_Befor_k(LIST &L,int k,int x)
{
	LIST p=L;
	LIST t,q;
	while(p!=NULL && p->key!=k)
	{
		q=p;
		p=p->next;
	}
	if(p!=NULLk)
	{
		t=new CELL;
		t->key=x;
		t->next=p;
		q->next=t;
	}
}
void Print(LIST L)
{
	while(L!=NULL)
	{
		cout<<L->key<<"\t";
		L=L->next;
	}
	
}
LIST Search(LIST L,int k)
{
	LIST p=L;
	while(p!=NULL && p->key!=k)
		p=p->next;
	return p;
}
void ListDelete(LIST &L,int k)
{
	LIST x,y;
	while(L!=NULL)
	{
		y=NULL;	x=L;
		while(x!=NULL && x->key!=k)
		{
			y=x; x=x->next;
		}
		if(x!=NULL)
		{ 
			if(y==NULL)L=x->next;
			else y->next=x->next;
			delete(x);
		}
	}
}
void main()
{
	LIST L;
	Initiation(L);
	
	InsertHead(L,4);
	InsertHead(L,2);
	InsertHead(L,6);
	InsertTail(L,25);
	InsertTail(L,12);
	Print(L);
	
	//ListDelete(L,6);
	//Print(L);
	
	/*cout<<endl;
	LIST kq=Search(L,4);
	if(kq==NULL)
		cout<<"\n Tim ko thay";
	else
	{
		Insert_After_k(L,kq->key,5);
		Insert_Befor_k(L,kq->key,3);
		Print(L);
	}
	*/
	system("pause");
}

----------------------------------------------------------------------------------------------------------Danh Sách Liên Kết Kép-------------------------------------------------------------------------------------------------------
#include <iostream>
using namespace std;

struct NODE
{
	int key;
	NODE *next,*prev;
};
struct LIST
{
	NODE *Head,*Tail;
};
LIST L;
NODE *InitNODE(int x)
{
	NODE *t=new NODE;
	if(t==NULL)return NULL;
	t->key=x;
	t->prev=t->next=NULL;
	return t;
}

void InitLIST(LIST &L)
{
	L.Head=L.Tail=NULL;
}

void AddHead(LIST &L,NODE *p)
{
    if(p==NULL) return;
    if(L.Head==NULL)
    {
        p->next=p->prev=NULL;
        L.Head=p;
        L.Tail=L.Head;
        
    }
    else
    {
        p->prev=NULL;
        p->next=L.Head;
        L.Head=p;
    }
}
void AddTail(LIST &L,NODE *p)
{
    if(p==NULL) return;
    if(L.Head==NULL)
    {
        p->next=p->prev=NULL;
        L.Head=p;
        L.Tail=L.Head;
        
    }
    else
    {
        p->prev=L.Tail;
        p->next=NULL;
        L.Tail->next=p;
        L.Tail=p;
    }
}
int AddAt(LIST &L,int x,int pos) //them x vao sau Node co gia tri ==pos  dau tien
{
    if(L.Head==NULL) return 0;
    NODE *p=L.Head;
    while(p!=NULL)
    {
        if(p->key==pos) break;
        p=p->next;
    }
    if(p!=NULL)
    {
        NODE *temp=InitNODE(x);
        temp->next=p->next;
        temp->prev=p;
        p->next=temp;
        if(p==L.Tail) L.Tail=temp;
        return 1;
    }
    return 0;
}
void RemoveHead(LIST &L)
{
    NODE *x;
    if(L.Head==NULL) return;
    x=L.Head;
    L.Head=L.Head->next;
    if(L.Head!=NULL) L.Head->prev=NULL;
    delete x;
}
void RemoveTail(LIST &L)
{
    NODE *p,*q;
    if(L.Head==NULL) return;
    p=L.Tail;
    if(p->prev==NULL){ RemoveHead(L);return;}
    q=p->prev;
    q->next=NULL;
    L.Tail=q;
    delete p;    
}

void RemoveAt(LIST &L,NODE *p)
{
	if(p!=NULL)
	{
		if(p->prev!=NULL)
			p->prev->next=p->next;
		else
			L.Head=p->next;
		if(p->next!=NULL)
			p->next->prev=p->prev;
	}
	else
		cout<<"\n khong tim thay";
}

NODE *Search(LIST L,int x)
{
	NODE *p=L.Head;
	while(p!=NULL && p->key!=x)
		p=p->next;
	return p;
}
void Print(LIST L)
{
	NODE *p=L.Head;
	while(p!=NULL)
	{
		cout<<p->key<<"\t";
		p=p->next;
	}
	cout<<endl;
	
}
void main()
{
	LIST L;
	InitLIST(L);
	
	int a;
	int n=5;
	for(int i=0;i<n;i++)
	{
		cin>>a;
		NODE *p=InitNODE(a);
		AddHead(L,p);
	}
	Print(L);
	//AddAt(L,23,5);

	RemoveHead(L);
	Print(L);

	NODE *p=Search(L,5);
	RemoveAt(L,p);
	Print(L);

	system("pause");
}


