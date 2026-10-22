package Class2;

import java.util.Arrays;

public class MoveZero {

    public static void main(String[] args) {
        int arr[]={0,3,0,1,12};
        move(arr);
        System.out.println(Arrays.toString(arr));

    }

    public static void move(int arr[])
    {
        int w=0;
        for(int x:arr)
        {
            if(x!=0) arr[w++]=x;
        }

        while (w<arr.length) arr[w++]=0;
    }
}
