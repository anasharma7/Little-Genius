public class Domain {
    private int domainID;
    private String domainName;
    private int parentDomainID;

    public Domain(int domainid, String domainname, int parentdomain){
        this.domainID = domainid;
        this.domainName = domainname;
        this.parentDomainID = parentdomain;
        }
    public Domain(int domainid, String domainname){
        this.domainID = domainid;
        this.domainName = domainname;
        }
    public void setParentDomainID(int parentDomainID) {
        this.parentDomainID = parentDomainID;
        }
    public String getDomainName(){
        return this.domainName;
        }
}
