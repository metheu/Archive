import org.testng.Assert;
import org.testng.annotations.Test;

public class LoginTests extends BaseRunner {

    @Test
    public void Test1(){
        System.out.println("Test 1");
        Assert.assertEquals(1,1);
    }

    @Test
    public void Test2(){
        System.out.println("Test 2");
        Assert.assertEquals(2,1);
    }
}
