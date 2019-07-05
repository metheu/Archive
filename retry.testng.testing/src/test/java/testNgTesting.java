import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;

public class testNgTesting {


    @BeforeClass
    public void setup(){

    }

    @Test()
    public void Test1(){
        System.out.println("Test 1");
        int[] intArray = new int[]{1,2};

        try {
            Thread.sleep(5000);
        } catch (Exception e){
            e.printStackTrace();
        }

        for(int i = 0; i < intArray.length; i ++){
            System.out.println("2 : " + intArray[i]);
           Assert.assertEquals(2, intArray[i]);
        }


    }

    @Test(retryAnalyzer = Retry.class)
    public void Test2(){
        System.out.println("Test 2");
        Assert.assertEquals(1,2);
    }

    @Test
    public void Test3(){
        System.out.println("Test 3");
    }
}
