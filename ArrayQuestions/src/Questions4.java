public class Questions4 {

    public static void main(String[] args) {
        int arr[]={3,6,8,14,9,13};

        int max = find(arr);
        System.out.println(max);
    }

    static int find(int arr[])
    {
        int max=arr[0];
        for(int i=1;i<arr.length;i++)
        {
            if(arr[i]>max) max=arr[i];
        }
        return max;
    }
}
