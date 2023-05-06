import java.time.LocalDate;

public class JournalSubscription {
    private int journalID;
    private LocalDate subscriptionStartDate;
    private LocalDate subscriptionEndDate;
    private Double subscriptionFee;

    public JournalSubscription(int jid, LocalDate startDate, LocalDate enddate){
        this.journalID = jid;
        this.subscriptionStartDate = startDate;
        this.subscriptionEndDate = enddate;
        }
    public LocalDate getSubscriptionStartDate(){
        return this.subscriptionStartDate;
        }
    public LocalDate getSubscriptionEndDate(){
        return this.subscriptionEndDate;
        }
    public void renewSubscription(LocalDate renewDate, LocalDate enddate){
        this.subscriptionStartDate = renewDate;
        this.subscriptionEndDate = enddate;
        }
    }
