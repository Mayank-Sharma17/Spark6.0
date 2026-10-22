package Class2;

import java.util.Arrays;

public class ReverseArray {
    public static void main(String[] args) {
        int arr[]={1,2,3,4,5};
        System.out.println(arr.length);
       /* reverse(arr);
        System.out.println(Arrays.toString(arr));*/
        helper(arr);
        System.out.println(Arrays.toString(arr));
    }

    public static void reverse(int arr[])
    {
        int tmp[]=new int[arr.length]; //O(n)
        for(int i=0;i< arr.length;i++)
        {
            tmp[i]=arr[arr.length-1-i];
        } //O(n)
        for(int i=0;i< arr.length;i++)
        {
            arr[i]=tmp[i];
        }
        //O(n)
        //T.C = //O(n) +//O(n) => n
    }

    public static void helper(int arr[])
    {
        int left=0,right=arr.length-1;
        while(left<right)
        {
            swap(left,right,arr);
            left++;
            right--;
        }

    }
    public static void swap(int i,int j,int arr[])
    {
        int temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }
}
