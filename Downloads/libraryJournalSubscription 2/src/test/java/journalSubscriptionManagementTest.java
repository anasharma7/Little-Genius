import static org.junit.jupiter.api.Assertions.*;

class journalSubscriptionManagementTest {

    @org.junit.jupiter.api.Test
    void testFacultyLogin() {
        journalSubscriptionManagement app = new journalSubscriptionManagement();
        String result = app.loginAuth("FACULTY", "FacPSU123");
        assertEquals("FACULTY", result);
    }
}