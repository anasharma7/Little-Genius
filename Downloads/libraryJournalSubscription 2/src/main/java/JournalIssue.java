import java.time.LocalDate;

public class JournalIssue {
    private Journal journal;
    private LocalDate issueDate;
    private LocalDate returnDate;
    private Faculty faculty;

    public JournalIssue(Journal jid, LocalDate issued, Faculty fid){
        this.journal = jid;
        this.issueDate = issued;
        this.faculty = fid;
        this.returnDate = issueDate.plusDays(10);
         }
    public Faculty getFaculty(){
        return this.faculty;
        }
    public void returnJournal(LocalDate returned){
        this.returnDate = returned;
        }
    }
