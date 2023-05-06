import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;

public class Librarian {
    private String loginID;
    private String password;
    public Librarian(String login, String pwd){
        this.loginID = login;
        this.password = pwd;
        }
    public void viewJournalSubscriptions(){
        LocalDate date1 = LocalDate.parse("2022-01-01");
        LocalDate date2 = LocalDate.parse("2022-09-30");
        JournalSubscription js1 = new JournalSubscription(1,date1,date2);
        JournalSubscription js2 = new JournalSubscription(2,date1,date2);
        System.out.println("Journal Subscriptions due for renewal are:");
        System.out.println("JS1 and JS2");
        }
    public void createUsageReport(){
        System.out.println("Usage Report is prepared");
        }

    public void emailUsageReport() {
        System.out.println("Usage Report is mailed");
        }
    public void createRecommendationReport(){
        System.out.println("Recommendation Report based on Faculty Inputs is prepared");
        }
    public void renewJournalSubscriptions(){
        System.out.println("Recommended Journals' Subscriptions are Renewed");
        }
    public void closeJournalSubscriptions() {
        System.out.println("Unrecommended Journals' Subscriptions are Closed");
        }
    }
