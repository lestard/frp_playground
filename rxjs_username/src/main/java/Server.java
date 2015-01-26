import java.util.ArrayList;
import java.util.List;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.SparkBase.staticFileLocation;


public class Server {
	
	
	
	public static void main(String... args) {
		
		final List<String> usernames = generateUsernames();

		port(8080);
		staticFileLocation("/static");

        get("/username", (request, response) -> {

            String name = request.queryParams("name");

            if (name == null || name.trim().isEmpty()) {
                response.status(400);
                return "Missing query param `name`";
            }

            return usernames.contains(name.trim().toLowerCase());
        });
	}

	private static List<String> generateUsernames() {
		List<String> usernames = new ArrayList<>();
		usernames.add("tester");
		usernames.add("testuser");
		usernames.add("testuser");
		
		usernames.add("sophie");
		usernames.add("sofie");
		usernames.add("marie");
		usernames.add("sophia");
		usernames.add("sofia");
		usernames.add("maria");
		usernames.add("mia");
		usernames.add("emma");
		usernames.add("hannah");
		usernames.add("hanna");
		usernames.add("anna");
		usernames.add("emilia");
		usernames.add("johanna");
		
		usernames.add("maximilian");
		usernames.add("alexander");
		usernames.add("paul");
		usernames.add("luca");
		usernames.add("luka");
		usernames.add("ben");
		usernames.add("luis");
		usernames.add("louis");
		usernames.add("elias");
		usernames.add("leon");
		usernames.add("lukas");
		usernames.add("lucas");
		usernames.add("noah");

		return usernames;
	}
	
	
}
