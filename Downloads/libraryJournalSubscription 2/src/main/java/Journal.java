public class Journal {
    private int journalID;
    private String journalName;
    private Domain journalDomain;
    private Publisher jPublisher;
    public Journal(int journalid, String journalname, Domain d, Publisher p){
        this.journalID = journalid;
        this.journalName = journalname;
        this.journalDomain = d;
        this.jPublisher = p;
    }
    public Domain getJournalDomain(){
        return journalDomain;
        }

    public String getJournalName() {
        return journalName;
    }
}
