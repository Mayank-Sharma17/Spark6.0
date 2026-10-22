public class Question1 {

    public static void main(String[] args) {
        int arr[]=new int[5];
        int[] arr1={1,1,2,3};
        int arr2[]={23,4,5};

        int a1=10;
        System.out.println(arr1.length);
        //how access element from Array
        for(int i=0;i<arr1.length;i++)
        {
            System.out.println(arr1[i]);
        }

        arr1[2]=100;
        System.out.println(arr1[2]);

        for(int data:arr1)
        {
            System.out.println(data);
        }
    }
}
