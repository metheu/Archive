import org.testng.Assert;
import org.testng.IRetryAnalyzer;
import org.testng.ITestResult;
import org.testng.Reporter;
import org.testng.annotations.Test;

public class Rerun implements IRetryAnalyzer {

        private int retryCount = 0;
        private int maxRetryCount = 1;
        public int ctr1 = 0;
        public int ctr2 = 0;

        @Override
        public boolean retry(ITestResult result) {
            if (!result.isSuccess()) {
                if (retryCount < maxRetryCount) {
                    retryCount++;
                    result.setStatus(ITestResult.SUCCESS);
                    String message = Thread.currentThread().getName() + ": Error in " + result.getName() + " Retrying "
                            + (maxRetryCount + 1 - retryCount) + " more times";
                    System.out.println(message);
                    Reporter.log("message");
                    return true;
                } else {
                    result.setStatus(ITestResult.FAILURE);
                }
            }
            return false;
        }

        @Test(retryAnalyzer = Rerun.class)
        public void test1() {
            ctr1++;
            System.out.println("Running the test1");
            if(ctr1 == 1){
                System.out.println("Failed");
                Assert.assertEquals("james", "James");
            }else{
                Assert.assertEquals("james", "james");
                System.out.println("Passed");
            }
        }

        @Test(retryAnalyzer = Rerun.class)
        public void test2() {
            ctr2++;
            System.out.println("Running the test2");
            if(ctr2 == 1){
                System.out.println("Failed");
                Assert.assertEquals("hello", "World");
            }else{
                Assert.assertEquals("hello", "hello");
                System.out.println("Passed");
            }
        }

        @org.testng.annotations.BeforeMethod
        public void beforeMethod(){
            System.out.println("In Before Method");
        }
}
