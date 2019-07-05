import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.HashMap;
import java.util.Map;

@Path("course")
@Produces("text/xml")
public class CourseRepository {
   private Map<Integer, Course> courses = new HashMap<>();

   private Course findById(int id) {
       for (Map.Entry<Integer, Course> course : courses.entrySet()) {
           if (course.getKey() == id) {
               return course.getValue();
           }
       }
       return null;
   }
}
