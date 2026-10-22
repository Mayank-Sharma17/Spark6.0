import java.util.Map;

public class Question7 {

    public static void main(String[] args) {
        int arr[]={7,1,5,3,6,4};
        int maxProfit = findMaxProfit(arr);
        System.out.println(maxProfit);

    }

    static int findMaxProfit(int arr[])
    {
        if(arr.length<2) return 0;
        int minPrice=arr[0],maxProfit=0;

        for(int i=1;i< arr.length;i++)
        {
            int sell=arr[i]-minPrice;
            maxProfit= Math.max(maxProfit,sell);
            minPrice=Math.min(minPrice,arr[i]);
        }
        return maxProfit;
    }
}
