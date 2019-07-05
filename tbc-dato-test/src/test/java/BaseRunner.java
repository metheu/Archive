import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

public class BaseRunner {



    @BeforeMethod
    public void BaseRunner(){
        System.out.println("BaseRunner ran!");
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e){
            e.printStackTrace();
        }
    }

    @AfterMethod
    public void tearDown(){
        System.out.println("teardown ran!");
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e){
            e.printStackTrace();
        }

    }
}
