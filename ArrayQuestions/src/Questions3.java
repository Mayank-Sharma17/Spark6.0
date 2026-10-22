public class Questions3 {

    //Liner Search
    public static void main(String[] args) {
        int arr[]={4,2,7,6};
        int i = find(arr, 7);
        System.out.println(i);
    }

    public static int find(int arr[],int target)
    {
        for(int i=0;i<arr.length;i++)
        {
            if(arr[i]==target) return i;
        }

        return -1;
    }
}
