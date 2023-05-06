import java.util.ArrayList;
import java.util.Scanner;

public class journalSubscriptionManagement {
    public static String loginAuth(String login, String pwd){
        if(((login.toUpperCase()).equals("LIBRARIAN")) && pwd.equals("LibPSU123")){
            return "LIBRARIAN";
            }
        if (((login.toUpperCase()).equals("FACULTY")) && pwd.equals("FacPSU123")) {
            return "FACULTY";
            }
        else return "INVALID INPUT";
        }
    public static void main(String[] args){
        Scanner mScan = new Scanner(System.in);
        System.out.println("Welcome to PSU Library's Journal Subscription Management Module!!!");
        System.out.println("Enter LoginID: ");
        String loginid = mScan.nextLine();
        System.out.println("Enter Password: ");
        String pwd = mScan.nextLine();
        String auth = loginAuth(loginid, pwd);
        if(auth.equals("LIBRARIAN")) {
            Librarian librarian = new Librarian(loginid,pwd);
            System.out.println("Librarian logged in!!!");
            int endInput = 1;
            while(endInput !=0){
                System.out.println("Select Activity:");
                System.out.println("1. View Journal Subscriptions:");
                System.out.println("2. Create Usage Report:");
                System.out.println("3. Email Usage Report to Faculties");
                System.out.println("4. Create Recommendation Report");
                System.out.println("5. Renew Journal Subscription");
                System.out.println("6. Close Journal Subscription");
                System.out.println("0. Exit Application");
                endInput = mScan.nextInt();
                switch (endInput){
                    case 0: return;
                    case 1: librarian.viewJournalSubscriptions();
                            break;
                    case 2: librarian.createUsageReport();
                            break;
                    case 3: librarian.emailUsageReport();
                            break;
                    case 4: librarian.createRecommendationReport();
                        break;
                    case 5: librarian.renewJournalSubscriptions();
                        break;
                    case 6: librarian.closeJournalSubscriptions();
                        break;
                    }
                }
            } else if (auth.equals("FACULTY"))  {
            Faculty faculty = new Faculty(loginid);
            System.out.println("Faculty logged in!!!");
            Domain d1 = new Domain(1, "Domain 1");
            faculty.setFacultyDomain(d1);
            int endInput = 1;
            while(endInput !=0){
                System.out.println("Select Activity:");
                System.out.println("1. View Journals:");
                System.out.println("2. Access/Issue a Journal");
                System.out.println("3. Email Journal Recommendations:");
                System.out.println("0. Exit Application");
                endInput = mScan.nextInt();
                switch (endInput){
                    case 0: return;
                    case 1: faculty.viewJournals();
                        break;
                    case 2: faculty.accessIssueJournal();
                        break;
                    case 3: faculty.emailJournalReco();
                        break;
                    default:break;
                    }
                }
            }
        else System.out.println(auth);
        }
    }
