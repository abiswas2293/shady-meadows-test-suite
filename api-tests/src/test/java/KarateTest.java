import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class KarateTest {
    @Test
    void testAll() {
        Results results = Runner.path("classpath:Features")
                .outputHtmlReport(true)
                .parallel(5);          
        
        
        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }
}
