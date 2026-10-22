import java.util.Arrays;

public class Questions5 {

    public static void main(String[] args) {
        int arr[]={8,2,6,4,6};

        int[] arr1 = find(arr);
        System.out.println(Arrays.toString(arr1));
    }

    static int[] find(int arr[])
    {
        Integer max=Integer.MIN_VALUE;
        Integer min=Integer.MIN_VALUE;
        for(int data:arr)
        {
            if(max<data)
            {
                min=max;
                max=data;
            }
            else if(data<max && min<data)
            {
                min=data;
            }
        }

        return new int[]{max,min};
    }
}
