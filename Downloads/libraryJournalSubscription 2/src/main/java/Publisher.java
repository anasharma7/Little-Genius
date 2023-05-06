public class Publisher {
    private int publisherId;
    private String publisherName;
    private String publisherEmail;
    private String publisherAddr;

    public Publisher(int publisherid, String publishername, String publisheraddr, String publisheremail) {
        this.publisherId = publisherid;
        this.publisherName = publishername;
        this.publisherAddr = publisheraddr;
        this.publisherEmail = publisheremail;
        }

    public String getPublisherEmail() {
        return publisherEmail;
        }
    }
