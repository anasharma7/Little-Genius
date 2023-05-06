import java.util.ArrayList;

public class Faculty {
    private int facultyID;
    private String facultyName;
    private Domain facultyDomain;
    private String PSUid;
    public Faculty(int facultyid, String facultyname, Domain d, String psuid){
        this.facultyID = facultyid;
        this.facultyName = facultyname;
        this.facultyDomain = d;
        this.PSUid = psuid;
        }
    public Faculty(String psuid){
        this.PSUid = psuid;
        }
    public Domain getFacultyDomain(){
        return facultyDomain;
        }

    public void setFacultyDomain(Domain facultyDomain) {
        this.facultyDomain = facultyDomain;
    }

    public void viewJournals(){
        ArrayList<Journal> journals = new ArrayList<>();
        Domain d1 = new Domain(1, "Domain 1");
        Domain d2 = new Domain(2, "Domain 2", 1);
        Publisher p1 = new Publisher(1, "Publisher1", "UP, PA-16801", "pub@pub.com");
        Journal j1 = new Journal(1, "Journal 1", d2, p1 );
        Journal j2 = new Journal(2, "Journal 2", d1, p1 );
        journals.add(j1);
        journals.add(j2);
        for (int i = 0; i < journals.size(); i++) {
            String jDomain = journals.get(i).getJournalDomain().getDomainName();
            if (facultyDomain.getDomainName().equals(jDomain)) {
                System.out.println("Journal" + journals.get(i).getJournalName() + "of domain " + jDomain + "viewed");
                }
            }
        System.out.println("Journals under the domain " + this.facultyDomain.getDomainName() + " are viewed");
        }
    public void accessIssueJournal(){
        System.out.println("Accessing Journals");
        }
    public void emailJournalReco(){
        System.out.println("eMailed the Journal Recommendations");
        }
    }
