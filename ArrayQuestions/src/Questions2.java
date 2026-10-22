public class Questions2 {

    public static void main(String[] args) {
        int arr[]={2,4,5,6};
        int sum = sum(arr);
        System.out.println(sum);
    }

    public static int sum(int arr[])
    {
        int sum=0;
        //logic
        for(int i=0;i<arr.length;i++)
        {
            //sum+=arr[i];
            sum=sum+arr[i];
        }

        return sum;
    }
}
