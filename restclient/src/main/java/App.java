import java.util.ArrayList;
import java.util.List;

public class App {

    public static void main(String[] args) {
        Student student1 = new Student();
        Student student2 = new Student();
        student1.setId(1);
        student1.setName("Student A");
        student2.setId(2);
        student2.setName("Student B");

        List<Student> course1Students = new ArrayList<>();
        course1Students.add(student1);
        course1Students.add(student2);

        Course course1 = new Course();
        Course course2 = new Course();
        course1.setId(1);
        course1.setName("REST with Spring");
        course1.setStudents(course1Students);
        course2.setId(2);
        course2.setName("Learn Spring Security");

        courses.put(1, course1);
        courses.put(2, course2);

    }
}
