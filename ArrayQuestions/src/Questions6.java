public class Questions6 {

    public static void main(String[] args) {
        int arr[]={1,1,0,1,1,1};

        int count = find(arr);
        System.out.println(count);

    }

    static int find(int arr[])
    {
        int c=0,m=0;
        for(int i=0;i<arr.length;i++)
        {
            if(arr[i]==1)
            {
                c++;
                m=Math.max(m,c);
            }
            else {
                c=0;
            }
        }
        return m;
    }
}
